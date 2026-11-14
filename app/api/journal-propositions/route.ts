// Articles proposés par les élèves pour le Journal (14/11/2026).
// Voir supabase/journal_propositions.sql.
//   GET   : l'élève voit SES propositions ; le prof (vrai établissement) voit
//           celles de SON établissement, à relire en premier.
//   POST  : l'élève connecté envoie un article (4 cases + défi QCM).
//   PATCH : le prof accepte, demande une correction ou refuse.
// L'identité vient TOUJOURS du jeton signé, jamais du corps de la requête.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifySessionToken, voitToutSonEtablissement } from "@/lib/server/session";
import { prenomFromNom } from "@/lib/prenom";
import { CENTRES_INTERET } from "@/lib/videos/centres-interet";

const CENTRES = new Set([...CENTRES_INTERET.map((c) => c.id), "autre"]);
const STATUTS = new Set(["a_relire", "acceptee", "a_corriger", "refusee"]);
const MAX_PAR_JOUR = 3;
const COLONNES =
  "id, prenom, classe, centre, sujet, question, trouve, qcm_question, qcm_choix, qcm_bonne, statut, commentaire_prof, created_at";

const texte = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

function admin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
}

function session(req: Request) {
  const auth = req.headers.get("authorization") ?? "";
  return verifySessionToken(auth.startsWith("Bearer ") ? auth.slice(7) : "");
}

const nonConnecte = () =>
  NextResponse.json({ ok: false, error: "Connecte-toi pour écrire pour le Journal." }, { status: 401 });

// Table pas encore créée dans Supabase : on le dit clairement.
function erreur(e: { code?: string; message?: string } | null) {
  const absente = e?.code === "42P01" || e?.code === "PGRST205";
  return NextResponse.json(
    {
      ok: false,
      absente,
      error: absente
        ? "Le Journal des élèves n'est pas encore ouvert. Réessaie bientôt !"
        : "Erreur serveur, réessaie dans un moment.",
    },
    { status: absente ? 503 : 500 }
  );
}

export async function GET(req: Request) {
  const s = session(req);
  if (!s) return nonConnecte();
  const prof = voitToutSonEtablissement(s);
  let q = admin()
    .from("journal_propositions")
    .select(COLONNES)
    .eq("code_etablissement", s.code_etablissement)
    .order("created_at", { ascending: false })
    .limit(prof ? 100 : 20);
  if (!prof) q = q.eq("code_utilisateur", s.code_utilisateur);
  const { data, error } = await q;
  if (error) return erreur(error);
  return NextResponse.json({ ok: true, prof, propositions: data ?? [] });
}

export async function POST(req: Request) {
  const s = session(req);
  if (!s) return nonConnecte();
  const b = await req.json().catch(() => ({}));

  const centre = texte(b.centre, 40);
  const sujet = texte(b.sujet, 80);
  const question = texte(b.question, 300);
  const trouve = texte(b.trouve, 1500);
  const qcmQuestion = texte(b.qcm_question, 200);
  const choix = Array.isArray(b.qcm_choix) ? b.qcm_choix.map((c: unknown) => texte(c, 100)) : [];
  const bonne = Number(b.qcm_bonne);

  const refus = (error: string) => NextResponse.json({ ok: false, error }, { status: 400 });
  if (!CENTRES.has(centre)) return refus("Choisis ton centre d'intérêt.");
  if (centre === "autre" && sujet.length < 2) return refus("Écris ton sujet en quelques mots.");
  if (question.length < 8) return refus("Écris ta question (une phrase).");
  if (trouve.length < 15) return refus("Raconte ce que tu as mesuré ou trouvé, avec des nombres.");
  if (qcmQuestion.length < 5) return refus("Écris la question de ton défi.");
  if (choix.length !== 3 || choix.some((c: string) => !c)) return refus("Écris les 3 réponses de ton défi.");
  if (new Set(choix.map((c: string) => c.toLowerCase())).size !== 3) return refus("Les 3 réponses doivent être différentes.");
  if (![0, 1, 2].includes(bonne)) return refus("Coche la bonne réponse de ton défi.");

  const db = admin();
  const depuis = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
  const { count, error: e1 } = await db
    .from("journal_propositions")
    .select("id", { count: "exact", head: true })
    .eq("code_etablissement", s.code_etablissement)
    .eq("code_utilisateur", s.code_utilisateur)
    .gte("created_at", depuis);
  if (e1) return erreur(e1);
  if ((count ?? 0) >= MAX_PAR_JOUR)
    return NextResponse.json(
      { ok: false, error: `Tu as déjà envoyé ${MAX_PAR_JOUR} articles aujourd'hui. Reviens demain !` },
      { status: 429 }
    );

  const { error } = await db.from("journal_propositions").insert({
    code_etablissement: s.code_etablissement,
    code_utilisateur: s.code_utilisateur,
    prenom: prenomFromNom(s.nom),
    classe: s.classe,
    centre,
    sujet: sujet || null,
    question,
    trouve,
    qcm_question: qcmQuestion,
    qcm_choix: choix,
    qcm_bonne: bonne,
  });
  if (error) return erreur(error);
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: Request) {
  const s = session(req);
  if (!s) return nonConnecte();
  if (!voitToutSonEtablissement(s))
    return NextResponse.json({ ok: false, error: "Réservé aux profs." }, { status: 403 });
  const b = await req.json().catch(() => ({}));
  const id = texte(b.id, 40);
  const statut = texte(b.statut, 20);
  if (!/^[0-9a-f-]{36}$/i.test(id) || !STATUTS.has(statut))
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  const { error } = await admin()
    .from("journal_propositions")
    .update({ statut, commentaire_prof: texte(b.commentaire, 500) || null, updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("code_etablissement", s.code_etablissement);
  if (error) return erreur(error);
  return NextResponse.json({ ok: true });
}
