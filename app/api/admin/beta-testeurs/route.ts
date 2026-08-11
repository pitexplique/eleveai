// Les candidatures à la bêta, côté administration.
//
// Protégée par le cookie admin signé (lib/server/adminAuth), comme /api/admin/retours :
// réservée au propriétaire du site. La table beta_testeurs est sous RLS sans
// policy, la lecture passe par la clé service role.
//
// GET                                  -> toutes les candidatures de l'année + l'état des quotas
// PATCH { id, statut }                 -> accepter / refuser / terminer / remettre en attente
// PATCH { id, statut:'accepte', forcer } -> accepter malgré un groupe complet
// PATCH { id, note }                   -> note interne
//
// ⭐ ACCEPTER, C'EST DONNER UN NUMÉRO. Le numéro de place est attribué ici, au
// serveur, jamais côté navigateur : c'est lui qui matérialise la place, et deux
// personnes ne doivent jamais porter le même. L'index unique de la table est le
// garde-fou ; en cas de collision on reprend le numéro suivant.

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";
import { ANNEE_BETA, PLACES, TOTAL_PLACES, placeDe } from "@/lib/beta/places";

export const dynamic = "force-dynamic";

const COLONNES =
  "id, created_at, email, code_etablissement, code_utilisateur, prenom, groupe, niveau, motivation, annee, statut, numero_place, note_interne";

const STATUTS = new Set(["candidat", "accepte", "refuse", "termine"]);

async function isAdmin() {
  const cookieStore = await cookies();
  return verifyAdminCookieValue(cookieStore.get("admin-auth")?.value);
}

function serviceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function refus() {
  return NextResponse.json(
    { ok: false, error: "Accès réservé à l'administration." },
    { status: 401 }
  );
}

export async function GET() {
  if (!(await isAdmin())) return refus();

  const { data, error } = await serviceClient()
    .from("beta_testeurs")
    .select(COLONNES)
    .eq("annee", ANNEE_BETA)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Impossible de charger les candidatures." },
      { status: 500 }
    );
  }

  const lignes = data ?? [];
  const acceptes = lignes.filter((l) => l.statut === "accepte");

  // L'état des quotas, groupe par groupe : c'est ce qui décide qui accepter.
  const quotas = PLACES.map((p) => {
    const prises = acceptes.filter((l) => l.groupe === p.groupe).length;
    return {
      groupe: p.groupe,
      label: p.label,
      places: p.places,
      prises,
      restantes: Math.max(0, p.places - prises),
      enAttente: lignes.filter((l) => l.groupe === p.groupe && l.statut === "candidat").length,
    };
  });

  return NextResponse.json({
    ok: true,
    annee: ANNEE_BETA,
    total: TOTAL_PLACES,
    candidatures: lignes,
    quotas,
  });
}

export async function PATCH(request: Request) {
  if (!(await isAdmin())) return refus();

  const body = await request.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id : null;
  const statut = typeof body?.statut === "string" ? body.statut : null;
  const aNote = body?.note !== undefined;
  const forcer = body?.forcer === true;

  if (!id || (!statut && !aNote)) {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }
  if (statut && !STATUTS.has(statut)) {
    return NextResponse.json({ ok: false, error: "Statut inconnu." }, { status: 400 });
  }

  const supabase = serviceClient();

  // La note interne se change seule, sans toucher au statut.
  if (aNote && !statut) {
    const note = String(body.note).trim().slice(0, 500) || null;
    const { error } = await supabase
      .from("beta_testeurs")
      .update({ note_interne: note })
      .eq("id", id);
    if (error) {
      return NextResponse.json({ ok: false, error: "Note non enregistrée." }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  }

  const { data: ligne, error: erreurLecture } = await supabase
    .from("beta_testeurs")
    .select("id, groupe, statut, numero_place, annee")
    .eq("id", id)
    .maybeSingle();

  if (erreurLecture || !ligne) {
    return NextResponse.json({ ok: false, error: "Candidature introuvable." }, { status: 404 });
  }

  const update: Record<string, unknown> = { statut };
  if (aNote) update.note_interne = String(body.note).trim().slice(0, 500) || null;

  if (statut === "accepte") {
    // Le quota. On ne le contourne qu'à la demande explicite : la répartition
    // est le seul intérêt d'avoir 50 places plutôt qu'une file d'attente.
    if (ligne.statut !== "accepte") {
      const place = placeDe(ligne.groupe as string);
      const { count } = await supabase
        .from("beta_testeurs")
        .select("id", { count: "exact", head: true })
        .eq("annee", ligne.annee)
        .eq("statut", "accepte")
        .eq("groupe", ligne.groupe);

      if (place && (count ?? 0) >= place.places && !forcer) {
        return NextResponse.json(
          {
            ok: false,
            erreur: "groupe-complet",
            error: `« ${place.label} » est complet (${place.places} places).`,
          },
          { status: 409 }
        );
      }
    }

    // Le numéro ne se réattribue jamais : une place reprise garde le sien.
    if (ligne.numero_place == null) {
      const { data: dernier } = await supabase
        .from("beta_testeurs")
        .select("numero_place")
        .eq("annee", ligne.annee)
        .not("numero_place", "is", null)
        .order("numero_place", { ascending: false })
        .limit(1);

      let suivant = ((dernier?.[0]?.numero_place as number) ?? 0) + 1;

      // Trois tentatives : si deux acceptations se croisent, l'index unique
      // renvoie 23505 et on prend le numéro d'après plutôt que d'échouer.
      for (let essai = 0; essai < 3; essai++) {
        const { error } = await supabase
          .from("beta_testeurs")
          .update({ ...update, numero_place: suivant })
          .eq("id", id);

        if (!error) return NextResponse.json({ ok: true, numero_place: suivant });
        if (error.code !== "23505") {
          return NextResponse.json(
            { ok: false, error: "Acceptation impossible." },
            { status: 500 }
          );
        }
        suivant += 1;
      }
      return NextResponse.json(
        { ok: false, error: "Numéro de place indisponible, réessaie." },
        { status: 409 }
      );
    }
  }

  const { error } = await supabase.from("beta_testeurs").update(update).eq("id", id);
  if (error) {
    return NextResponse.json({ ok: false, error: "Mise à jour impossible." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, numero_place: ligne.numero_place ?? null });
}
