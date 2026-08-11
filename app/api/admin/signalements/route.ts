// Les signalements, côté administration.
//
// Ils arrivaient depuis /signaler-une-erreur et personne ne les voyait : la
// table n'était lue par aucun écran, et `points_attribues` par aucun calcul.
// Un élève qui trouvait une vraie erreur ne gagnait donc rien, et Frédéric ne
// savait même pas qu'elle avait été trouvée.
//
// GET                                   -> les signalements + le compte par statut
// PATCH { id, statut }                  -> nouveau / vu / traite / rejete
// PATCH { id, points }                  -> attribuer les points (retenu)
// PATCH { id, note }                    -> note interne
//
// ⛔ RÈGLE DE LA TABLE : jamais de points à un signalement anonyme. Il compte
// autant qu'un autre, mais il n'y a personne à qui les donner.

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";
import { estProbablementIA } from "@/lib/detection-ia";

export const dynamic = "force-dynamic";

const COLONNES =
  "id, created_at, connecte, profil, code_etablissement, code_utilisateur, type_utilisateur, type, message, page, question, notion_lue, intention_lue, ressource_visee, statut, note_interne, points_attribues";

const STATUTS = new Set(["nouveau", "vu", "traite", "rejete"]);
const MAX_POINTS = 200;
const PAGE_SIZE = 200;

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

export async function GET(request: Request) {
  if (!(await isAdmin())) return refus();

  const url = new URL(request.url);
  const statut = url.searchParams.get("statut");

  let requete = serviceClient()
    .from("signalements")
    .select(COLONNES, { count: "exact" })
    .order("created_at", { ascending: false })
    .limit(PAGE_SIZE);

  if (statut && STATUTS.has(statut)) requete = requete.eq("statut", statut);

  const { data, error, count } = await requete;

  if (error) {
    // 42703 = colonne absente. C'est presque toujours la même : `code_utilisateur`,
    // ajoutée le 11/08. Autant le dire plutôt que rendre un 500 muet.
    if (error.code === "42703") {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Il manque une colonne : passe supabase/signalements_code_utilisateur.sql dans l'éditeur SQL de Supabase.",
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { ok: false, error: "Impossible de charger les signalements." },
      { status: 500 }
    );
  }

  // Le badge « IA probable » est calculé À LA LECTURE, comme pour les avis :
  // aucune colonne à ajouter, et les anciens signalements sont couverts.
  const signalements = (data ?? []).map((s) => ({
    ...s,
    ia_probable: estProbablementIA(s.message as string),
  }));

  return NextResponse.json({ ok: true, signalements, total: count ?? 0 });
}

export async function PATCH(request: Request) {
  if (!(await isAdmin())) return refus();

  const body = await request.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id : null;
  const statut = typeof body?.statut === "string" ? body.statut : null;
  const aPoints = body?.points !== undefined;
  const aNote = body?.note !== undefined;

  if (!id || (!statut && !aPoints && !aNote)) {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }
  if (statut && !STATUTS.has(statut)) {
    return NextResponse.json({ ok: false, error: "Statut inconnu." }, { status: 400 });
  }

  const supabase = serviceClient();
  const update: Record<string, unknown> = {};
  if (statut) update.statut = statut;
  if (aNote) update.note_interne = String(body.note).trim().slice(0, 500) || null;

  if (aPoints) {
    const points = Math.max(0, Math.min(MAX_POINTS, Math.round(Number(body.points) || 0)));

    // Les points supposent quelqu'un à qui les donner : la table l'exige, on le
    // vérifie ici plutôt que de laisser passer une ligne incohérente.
    if (points > 0) {
      const { data: ligne } = await supabase
        .from("signalements")
        .select("connecte")
        .eq("id", id)
        .maybeSingle();

      if (!ligne?.connecte) {
        return NextResponse.json(
          {
            ok: false,
            erreur: "anonyme",
            error:
              "Ce signalement est anonyme : il n'y a pas de compte à créditer. Il compte quand même.",
          },
          { status: 409 }
        );
      }
    }

    update.points_attribues = points;
    // Donner des points, c'est retenir. On ne laisse pas les deux se contredire.
    if (points > 0 && !statut) update.statut = "traite";
  }

  const { error } = await supabase.from("signalements").update(update).eq("id", id);
  if (error) {
    return NextResponse.json({ ok: false, error: "Mise à jour impossible." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
