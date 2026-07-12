// app/api/retours/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  POINTS_PAR_RETOUR,
  calculerPointsAvis,
} from "@/lib/points/feedbackPoints";
import { estProbablementIA } from "@/lib/detection-ia";

const TYPES = new Set(["bug", "idee", "avis"]);

const PAGES = new Set([
  "Accueil",
  "Coach Maths",
  "Coach Français",
  "Coach English",
  "Coach Espagnol",
  "Coach Économie",
  "Coach Brevet",
  "Parcours Maths",
  "Parcours Français",
  "Parcours English",
  "Parcours Espagnol",
  "Calcul rapide",
  "Défis du jour",
  "Tableau de bord élève",
  "Tout le site",
  "Autre",
]);

function asString(v: any) {
  return String(v ?? "").trim();
}

// Anti-spam : un avis honnête tient en 200 mots largement. Au-delà, c'est un
// pavé copié-collé depuis une IA (ChatGPT/Gemini). Voir scripts/purge-avis-ia.mjs.
const MAX_MOTS = 200;
// Délai minimum entre deux retours d'un même élève (anti-farming de points).
const DELAI_MIN_MS = 20_000;
// Plafond de retours par élève sur 24 h glissantes : un élève honnête en envoie
// quelques-uns, jamais des dizaines. Ferme la porte au spam varié (que la
// détection IA et l'anti-doublon ne captent pas toujours). Ajustable.
const MAX_PAR_JOUR = 10;
const FENETRE_24H_MS = 24 * 60 * 60 * 1000;

function compterMots(s: string) {
  const t = s.trim();
  return t ? t.split(/\s+/).length : 0;
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function validateEmailLoose(v: string) {
  if (!v) return true;
  if (v.length > 200) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const hp = asString(body.hp);
    if (hp) {
      return NextResponse.json({ ok: false, error: "Spam" }, { status: 400 });
    }

    const type = asString(body.type);
    const page = asString(body.page);
    const message = asString(body.message);
    const note = Number(body.note);

    const codeEtablissement = asString(body.code_etablissement);
    const codeEleve = asString(body.code_eleve);
    const authUserId = asString(body.auth_user_id);
    const email = asString(body.email);
    const prenom = asString(body.prenom);
    const classe = asString(body.classe);

    if (!TYPES.has(type)) {
      return NextResponse.json({ ok: false, error: "Type invalide" }, { status: 400 });
    }
    if (page && !PAGES.has(page)) {
      return NextResponse.json({ ok: false, error: "Page invalide" }, { status: 400 });
    }
    if (!message || message.length < 10) {
      return NextResponse.json(
        { ok: false, error: "Décris ton retour en quelques mots (10 caractères minimum)." },
        { status: 400 }
      );
    }
    if (message.length > 3000) {
      return NextResponse.json({ ok: false, error: "Message trop long" }, { status: 400 });
    }
    if (compterMots(message) > MAX_MOTS) {
      return NextResponse.json(
        {
          ok: false,
          error: `Ton retour fait plus de ${MAX_MOTS} mots. Va à l'essentiel, avec tes propres mots (les pavés copiés-collés d'une IA ne sont pas acceptés).`,
        },
        { status: 400 }
      );
    }
    if (type === "avis" && !(note >= 1 && note <= 5)) {
      return NextResponse.json(
        { ok: false, error: "Choisis une note entre 1 et 5 étoiles." },
        { status: 400 }
      );
    }
    if (authUserId && !UUID_RE.test(authUserId)) {
      return NextResponse.json({ ok: false, error: "Identifiant invalide" }, { status: 400 });
    }
    if (!validateEmailLoose(email)) {
      return NextResponse.json({ ok: false, error: "Email invalide" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Anti-farming : pour un élève identifié (codes), on bloque les doublons et
    // les envois en rafale. Un élève anonyme (sans codes) ne gagne pas de points,
    // l'abus est donc sans intérêt → on ne filtre pas.
    if (codeEtablissement && codeEleve) {
      const { data: recents } = await supabase
        .from("retours_eleves")
        .select("message, created_at")
        .eq("code_etablissement", codeEtablissement)
        .eq("code_eleve", codeEleve)
        .order("created_at", { ascending: false })
        .limit(MAX_PAR_JOUR + 5);

      if (recents && recents.length) {
        const dernier = new Date(recents[0].created_at).getTime();
        if (Date.now() - dernier < DELAI_MIN_MS) {
          return NextResponse.json(
            { ok: false, error: "Tu envoies trop vite. Attends quelques secondes avant ton prochain retour." },
            { status: 429 }
          );
        }
        // Plafond journalier : nb de retours sur les 24 dernières heures.
        const nb24h = recents.filter(
          (r) => Date.now() - new Date(r.created_at).getTime() < FENETRE_24H_MS
        ).length;
        if (nb24h >= MAX_PAR_JOUR) {
          return NextResponse.json(
            { ok: false, error: `Tu as déjà envoyé ${MAX_PAR_JOUR} retours aujourd'hui. Reviens demain — merci pour ta participation 🙌` },
            { status: 429 }
          );
        }
        if (recents.some((r) => (r.message ?? "").trim() === message)) {
          return NextResponse.json(
            { ok: false, error: "Tu as déjà envoyé ce retour. Propose quelque chose de nouveau 😉" },
            { status: 409 }
          );
        }
      }
    }

    const { error } = await supabase.from("retours_eleves").insert({
      type,
      page: page || null,
      message,
      note: type === "avis" ? note : null,
      code_etablissement: codeEtablissement.slice(0, 50) || null,
      code_eleve: codeEleve.slice(0, 50) || null,
      auth_user_id: authUserId || null,
      email: email || null,
      prenom: prenom.slice(0, 100) || null,
      classe: classe.slice(0, 20) || null,
      source: "votre-avis",
    });

    if (error) throw error;

    // Points : on recompte les retours de l'eleve (identifie par ses codes) pour
    // renvoyer son total a jour et les points gagnes a l'instant. Eleve anonyme
    // (sans codes) : pas de points, mais le retour est bien enregistre.
    let pointsGagnes = 0;
    let pointsTotal = 0;
    if (codeEtablissement && codeEleve) {
      const { data: retours } = await supabase
        .from("retours_eleves")
        .select("message, traite, a_lhonneur")
        .eq("code_etablissement", codeEtablissement)
        .eq("code_eleve", codeEleve);

      // Les retours « IA probable » ne rapportent aucun point (anti-farming) :
      // on les exclut du total, et l'envoi en cours ne gagne 0 s'il est détecté.
      const valides = (retours ?? []).filter((r) => !estProbablementIA(r.message));
      const nbTraites = valides.filter((r) => r.traite).length;
      const nbALHonneur = valides.filter((r) => r.a_lhonneur).length;
      pointsTotal = calculerPointsAvis(valides.length, nbTraites, nbALHonneur);
      pointsGagnes = estProbablementIA(message) ? 0 : POINTS_PAR_RETOUR;
    }

    return NextResponse.json({ ok: true, pointsGagnes, pointsTotal });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
