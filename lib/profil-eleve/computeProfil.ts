// lib/profil-eleve/computeProfil.ts
//
// Calcule le profil d'un élève (Niveau + Comportement + recommandations) et
// l'upsert dans la table `profil_eleve` (snapshot par élève, comme bulletins).
// Recalculé à chaque sauvegarde de résultat (app/api/resultats) et lisible via
// /api/profil-eleve.
//
// Choix d'architecture (cf. réflexion « matrice profil élève ») :
//   - La maîtrise vivante du coach est ÉPHÉMÈRE (en mémoire de session). On la
//     RECONSTRUIT ici depuis l'historique PERSISTÉ `resultats_tutor` (seule table
//     avec notion_id + score_sur_20), pondérée par la récence → durable.
//   - Recommandations RULE-BASED : pas d'appel IA externe (données de mineurs →
//     souveraineté RGPD), déterministe, explicable, coût nul.
//
// Ne doit être importé que côté serveur (clé service role).

import "server-only";
import { createClient } from "@supabase/supabase-js";
import { prenomCourt } from "@/lib/prenom";
import { niveauPublic } from "@/lib/classe";
import type {
  ProfilEleve,
  NotionMastery,
  MatiereMastery,
  Recommandation,
  StatutEngagement,
} from "./types";

const JOUR = 24 * 60 * 60 * 1000;

// Demi-vie de la pondération par récence : un passage vieux de 30 jours pèse
// moitié moins qu'un passage d'aujourd'hui (la maîtrise récente prime).
const DEMI_VIE_JOURS = 30;

// Seuils de maîtrise (0–100).
const SEUIL_FAIBLE = 55; // en dessous → à renforcer
const SEUIL_FORT = 80; // au dessus → point fort

// Tables scannées pour l'ENGAGEMENT (created_at seulement). resultats_tutor y est
// aussi mais on le charge à part (pour la maîtrise), on ne le redouble donc pas.
const TABLES_ACTIVITE = [
  "resultats_parcours_maths",
  "resultats_parcours_english",
  "resultats_parcours_espagnol",
  "resultats_parcours_francais",
  "resultats_parcours_ia",
  "resultats_calcul_rapide",
  "resultats_defis_jour",
  "resultats_english_maths",
  "resultats_dictee",
];

type TutorRow = {
  matiere: string;
  notion_id: string;
  score_sur_20: number;
  t: number; // epoch ms
};

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}
function jourCle(t: number): string {
  return new Date(t).toISOString().slice(0, 10);
}

// notion_id « proportionnalite_tableau » → « Proportionnalite tableau ».
// Libellé lisible faute de dictionnaire de notions côté serveur (rule-based v1).
function libelleNotion(notionId: string): string {
  const s = notionId.replace(/_/g, " ").trim();
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : notionId;
}

// Lit tout l'historique coach (resultats_tutor) d'un élève : la SEULE source
// avec une granularité par notion (notion_id + score_sur_20).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchTutor(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  codeEtablissement: string,
  codeUtilisateur: string
): Promise<TutorRow[]> {
  const { data, error } = await supabase
    .from("resultats_tutor")
    .select("matiere, notion_id, score_sur_20, created_at")
    .eq("code_etablissement", codeEtablissement)
    .eq("code_utilisateur", codeUtilisateur)
    .order("created_at", { ascending: false })
    .limit(5000);
  if (error || !data) return [];

  const out: TutorRow[] = [];
  for (const r of data as Record<string, unknown>[]) {
    const matiere = String(r.matiere ?? "").trim();
    const notion_id = String(r.notion_id ?? "").trim();
    const score = Number(r.score_sur_20);
    const t = new Date(r.created_at as string).getTime();
    if (!matiere || !notion_id) continue;
    if (!Number.isFinite(score) || !Number.isFinite(t)) continue;
    out.push({ matiere, notion_id, score_sur_20: clamp(score, 0, 20), t });
  }
  return out;
}

// Récupère les timestamps d'activité (created_at) de toutes les autres tables
// de résultats + les connexions → sert au calcul d'engagement (jours actifs).
async function fetchActiviteTimestamps(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  codeEtablissement: string,
  codeUtilisateur: string
): Promise<number[]> {
  const lots = await Promise.all(
    [...TABLES_ACTIVITE, "connexions"].map(async (table) => {
      const { data, error } = await supabase
        .from(table)
        .select("created_at")
        .eq("code_etablissement", codeEtablissement)
        .eq("code_utilisateur", codeUtilisateur)
        .order("created_at", { ascending: false })
        .limit(2000);
      if (error || !data) return [] as number[];
      return (data as Record<string, unknown>[])
        .map((r) => new Date(r.created_at as string).getTime())
        .filter((t) => Number.isFinite(t));
    })
  );
  return lots.flat();
}

// Maîtrise par notion = moyenne des score_sur_20 (ramenés /100) pondérée par la
// récence (demi-vie DEMI_VIE_JOURS). Regroupe par matiere::notion_id.
function calculerMaitrise(rows: TutorRow[], now: number): NotionMastery[] {
  const groupes = new Map<string, TutorRow[]>();
  for (const r of rows) {
    const cle = `${r.matiere}::${r.notion_id}`;
    const arr = groupes.get(cle) ?? [];
    arr.push(r);
    groupes.set(cle, arr);
  }

  const notions: NotionMastery[] = [];
  for (const [cle, list] of groupes) {
    const [matiere, notionId] = cle.split("::");
    let sommeP = 0;
    let sommeW = 0;
    let dernier = 0;
    for (const r of list) {
      const ageJours = Math.max(0, (now - r.t) / JOUR);
      const w = Math.pow(0.5, ageJours / DEMI_VIE_JOURS);
      sommeP += w * (r.score_sur_20 * 5); // /20 → /100
      sommeW += w;
      if (r.t > dernier) dernier = r.t;
    }
    if (sommeW <= 0) continue;
    notions.push({
      matiere,
      notionId,
      libelle: libelleNotion(notionId),
      mastery: Math.round(clamp(sommeP / sommeW, 0, 100)),
      nb: list.length,
      dernier: dernier ? new Date(dernier).toISOString() : null,
    });
  }
  return notions;
}

function agregerParMatiere(notions: NotionMastery[]): MatiereMastery[] {
  const parMat = new Map<string, NotionMastery[]>();
  for (const n of notions) {
    const arr = parMat.get(n.matiere) ?? [];
    arr.push(n);
    parMat.set(n.matiere, arr);
  }
  return [...parMat.entries()]
    .map(([matiere, list]) => ({
      matiere,
      mastery: Math.round(
        list.reduce((s, n) => s + n.mastery, 0) / list.length
      ),
      nb: list.reduce((s, n) => s + n.nb, 0),
    }))
    .sort((a, b) => (b.mastery ?? -1) - (a.mastery ?? -1));
}

function statutEngagement(joursDepuis: number | null): StatutEngagement {
  if (joursDepuis === null) return "nouveau";
  if (joursDepuis <= 7) return "actif";
  if (joursDepuis <= 21) return "ralenti";
  return "inactif";
}

// Lien vers le coach pour retravailler une notion. Le coach IA (/coach-ia/<matiere>)
// est l'entrée générique ; on lui passe la classe (niveau) comme ailleurs.
function lienCoach(matiere: string, classe: string | null): string {
  const q = classe ? `?classe=${encodeURIComponent(classe)}` : "";
  return `/coach-ia/${encodeURIComponent(matiere)}${q}`;
}

// Recommandations RULE-BASED, par ordre de priorité :
//   1. Assiduité si l'élève décroche (ralenti/inactif).
//   2. Renforcer les 3 notions les plus faibles.
//   3. Explorer le catalogue s'il n'y a pas (encore) de faiblesse nette.
function recommander(args: {
  faibles: NotionMastery[];
  statut: StatutEngagement;
  totalNotions: number;
  classe: string | null;
}): Recommandation[] {
  const recos: Recommandation[] = [];

  if (args.statut === "ralenti" || args.statut === "inactif") {
    recos.push({
      type: "assiduite",
      titre: "Reprends le rythme",
      message:
        "Ça fait un moment — même 5 minutes par jour font la différence. La dictée du jour est un bon point de départ.",
      lien: "/dictee-du-jour",
    });
  }

  for (const n of args.faibles.slice(0, 3)) {
    recos.push({
      type: "renforcer",
      titre: `À renforcer : ${n.libelle}`,
      message: `Ta maîtrise en ${n.libelle} (${n.matiere}) est autour de ${n.mastery}/100. Un tour avec le coach et tu remontes vite.`,
      matiere: n.matiere,
      notionId: n.notionId,
      lien: lienCoach(n.matiere, args.classe),
    });
  }

  // Peu de faiblesses détectées (élève solide ou peu de données) → on l'oriente
  // vers le catalogue pour élargir.
  if (recos.length < 2 || args.totalNotions < 3) {
    recos.push({
      type: "explorer",
      titre: "Explore de nouvelles activités",
      message:
        "Tu tournes bien ! Découvre tout ce que tu peux faire dans le catalogue.",
      lien: "/explorer",
    });
  }

  return recos;
}

// Calcule le profil complet d'un élève.
export async function computeProfil(args: {
  codeEtablissement: string;
  codeUtilisateur: string;
  nom?: string | null;
  classe?: string | null;
}): Promise<ProfilEleve | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);
  const now = Date.now();

  const [tutor, timestamps] = await Promise.all([
    fetchTutor(supabase, args.codeEtablissement, args.codeUtilisateur),
    fetchActiviteTimestamps(supabase, args.codeEtablissement, args.codeUtilisateur),
  ]);

  // --- Niveau ---
  const notions = calculerMaitrise(tutor, now);
  const parMatiere = agregerParMatiere(notions);
  const global =
    notions.length > 0
      ? Math.round(notions.reduce((s, n) => s + n.mastery, 0) / notions.length)
      : null;
  const pointsForts = notions
    .filter((n) => n.mastery >= SEUIL_FORT)
    .sort((a, b) => b.mastery - a.mastery)
    .slice(0, 5);
  const pointsFaibles = notions
    .filter((n) => n.mastery < SEUIL_FAIBLE)
    .sort((a, b) => a.mastery - b.mastery)
    .slice(0, 5);

  // --- Comportement ---
  // Toute activité compte : passages coach (tutor) + autres tables + connexions.
  const tousTs = [...timestamps, ...tutor.map((r) => r.t)];
  // reduce plutôt que Math.max(...spread) : un élève très actif peut avoir des
  // milliers de timestamps → le spread risquerait un dépassement d'arguments.
  const derniereActivite = tousTs.length
    ? tousTs.reduce((m, t) => (t > m ? t : m), tousTs[0])
    : null;
  const joursDepuis =
    derniereActivite === null
      ? null
      : Math.floor((now - derniereActivite) / JOUR);
  const joursActifs30 = new Set(
    tousTs.filter((t) => t >= now - 30 * JOUR).map(jourCle)
  ).size;
  const statut = statutEngagement(joursDepuis);

  // --- Prénom (repli e-mail → « Élève », comme le bulletin) ---
  const prenomBrut = prenomCourt(args.nom);
  const prenom = prenomBrut.includes("@") ? "Élève" : prenomBrut;

  const recommandations = recommander({
    faibles: pointsFaibles,
    statut,
    totalNotions: notions.length,
    classe: args.classe ?? null,
  });

  return {
    prenom,
    classe: args.classe ?? null,
    niveau_public: niveauPublic(args.classe),
    computed_at: new Date(now).toISOString(),
    niveau: {
      global,
      points_forts: pointsForts,
      points_faibles: pointsFaibles,
      par_matiere: parMatiere,
    },
    comportement: {
      statut,
      jours_depuis_activite: joursDepuis,
      jours_actifs_30: joursActifs30,
      total_activites: tousTs.length,
      derniere_activite:
        derniereActivite === null
          ? null
          : new Date(derniereActivite).toISOString(),
    },
    recommandations,
  };
}

// Recalcule le profil et l'upsert dans `profil_eleve`. Tolérant : ne lève jamais
// (l'appelant — /api/resultats — ne doit pas voir sa sauvegarde échouer si le
// profil ne se met pas à jour, ex. table absente). Renvoie true si écrit.
export async function mettreAJourProfil(args: {
  codeEtablissement: string;
  codeUtilisateur: string;
  nom?: string | null;
  classe?: string | null;
}): Promise<boolean> {
  try {
    const profil = await computeProfil(args);
    if (!profil) return false;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return false;
    const supabase = createClient(url, key);
    const { error } = await supabase.from("profil_eleve").upsert(
      {
        code_etablissement: args.codeEtablissement,
        code_utilisateur: args.codeUtilisateur,
        data: profil,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "code_etablissement,code_utilisateur" }
    );
    return !error;
  } catch {
    return false;
  }
}
