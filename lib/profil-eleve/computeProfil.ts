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
  CarteReco,
  RecoDuJour,
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

// Matières « cœur » ayant un coach dédié, dans l'ordre où on les propose à
// l'exploration. (economie existe mais reste secondaire → hors liste explo.)
const MATIERES_COEUR = ["maths", "francais", "anglais", "espagnol", "ia"];
const LABEL_MATIERE: Record<string, string> = {
  maths: "Maths",
  francais: "Français",
  anglais: "Anglais",
  espagnol: "Espagnol",
  ia: "IA",
  economie: "Économie",
};
function labelMatiere(m: string): string {
  return LABEL_MATIERE[m] ?? m.charAt(0).toUpperCase() + m.slice(1);
}

// Lien vers le coach d'une matière. `niveau` est DÉJÀ normalisé (ex. « 6e »,
// « cm2 ») ; on le passe en ?classe= comme l'accueil, pour atterrir au bon niveau.
function lienCoach(matiere: string, niveau: string | null): string {
  const q = niveau ? `?classe=${encodeURIComponent(niveau)}` : "";
  return `/coach-ia/${encodeURIComponent(matiere)}${q}`;
}

// Construit le rendez-vous du matin : 2 cartes RULE-BASED.
//
// 🔥 PRINCIPALE — 1re règle qui matche (ébauche de l'échelle P0→P5 à venir) :
//   a. Reprendre  — l'élève décroche (ralenti/inactif) → action courte, sans lacune.
//   b. Renforcer  — une notion faible → coach ciblé.
//   c. Progresser — sinon, sa notion la plus solide → « continue sur ta lancée ».
//   d. Commencer  — cold-start (aucune donnée) → défi du jour.
// 🧭 ALTERNATIVE — explorer une matière cœur JAMAIS travaillée (catalogue − vécu),
//   sinon le catalogue complet.
function construireRecoDuJour(args: {
  faibles: NotionMastery[];
  fortes: NotionMastery[];
  statut: StatutEngagement;
  matieresTouchees: Set<string>;
  niveau: string | null;
}): RecoDuJour {
  const { faibles, fortes, statut, matieresTouchees, niveau } = args;

  // ── 🔥 principale ──────────────────────────────────────────────────────────
  let principale: CarteReco;

  if (statut === "ralenti" || statut === "inactif") {
    principale = {
      slot: "principale",
      emoji: "🔥",
      ton: "warn",
      categorie: "Reprendre le rythme",
      titre: "Reprends en douceur",
      message:
        "Ça fait un moment — un mot à écouter et écrire, deux minutes, et c'est reparti.",
      cta: "Faire la dictée →",
      lien: "/dictee-du-jour",
    };
  } else if (faibles.length > 0) {
    const n = faibles[0];
    principale = {
      slot: "principale",
      emoji: "🔥",
      ton: "warn",
      categorie: "À renforcer",
      titre: `Reprends « ${n.libelle} »`,
      message: `Ta maîtrise en ${n.libelle} (${labelMatiere(n.matiere)}) est autour de ${n.mastery}/100. Un tour avec le coach et tu remontes vite.`,
      cta: "Renforcer →",
      lien: lienCoach(n.matiere, niveau),
      matiere: n.matiere,
      notionId: n.notionId,
    };
  } else if (fortes.length > 0) {
    const n = fortes[0];
    principale = {
      slot: "principale",
      emoji: "🔥",
      ton: "fire",
      categorie: "Progresser",
      titre: `Continue en ${labelMatiere(n.matiere)}`,
      message: `Tu es bien lancé en ${labelMatiere(n.matiere)} (${n.mastery}/100) — on enchaîne et on vise plus haut ?`,
      cta: "Continuer →",
      lien: lienCoach(n.matiere, niveau),
      matiere: n.matiere,
      notionId: n.notionId,
    };
  } else {
    principale = {
      slot: "principale",
      emoji: "🔥",
      ton: "fire",
      categorie: "Commencer",
      titre: "Lance-toi aujourd'hui",
      message: "Un premier pas facile et fun : le défi du jour t'attend.",
      cta: "Voir le défi →",
      lien: "/defis-du-jour",
    };
  }

  // ── 🧭 alternative (explorer une voie neuve) ────────────────────────────────
  const matiereEvitee = MATIERES_COEUR.find(
    (m) => !matieresTouchees.has(m) && m !== principale.matiere
  );
  const alternative: CarteReco = matiereEvitee
    ? {
        slot: "alternative",
        emoji: "🧭",
        ton: "compass",
        categorie: "Explorer",
        titre: `Découvre ${labelMatiere(matiereEvitee)}`,
        message: `Tu n'as pas encore essayé le coach ${labelMatiere(matiereEvitee)} — et si tu tentais une nouvelle voie aujourd'hui ?`,
        cta: "Découvrir →",
        lien: lienCoach(matiereEvitee, niveau),
        matiere: matiereEvitee,
      }
    : {
        slot: "alternative",
        emoji: "🧭",
        ton: "compass",
        categorie: "Découvrir",
        titre: "Explore le catalogue",
        message:
          "Coachs, parcours, défis, concours, cahiers… trouve une activité que tu n'as pas encore faite.",
        cta: "Explorer →",
        lien: "/explorer",
      };

  return { principale, alternative };
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

  // Matières déjà travaillées (au coach) → sert à l'exploration « voie neuve ».
  const matieresTouchees = new Set(notions.map((n) => n.matiere));
  // Niveau normalisé pour les liens coach (?classe=…), ex. « 6°C » → « 6e ».
  const niveauNorm = niveauPublic(args.classe)?.toLowerCase() ?? null;

  const reco_du_jour = construireRecoDuJour({
    faibles: pointsFaibles,
    fortes: pointsForts,
    statut,
    matieresTouchees,
    niveau: niveauNorm,
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
    reco_du_jour,
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
