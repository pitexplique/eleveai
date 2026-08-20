// lib/matrice/coach.ts
//
// Le pont entre la matrice d'entrée et le coach qui existe déjà.
//
// Le coach (app/tutor-v4) sait s'ouvrir sur une notion précise :
//   /tutor-v4?classe=6e&matiere=maths&notion=fraction_nombre
// Sans ce pont, on dirait « voilà le coach, débrouille-toi » — avec, on ouvre
// la bonne porte du premier coup. C'est toute la différence entre un lien et
// une recommandation.
//
// ⚠️ DEUX PIÈGES, vérifiés dans le code du coach :
//   1. normalizeClasse() a une WHITELIST (TutorV4Client.tsx:344). Une valeur
//      inconnue ne lève pas d'erreur : elle retombe silencieusement sur « 6e ».
//      D'où « premiere » → « premiere-spe » et « terminale » → « terminale-spe ».
//   2. Les identifiants de notions ne se devinent pas : « fraction » en CM2,
//      « fraction_nombre » en 6e, « fraction_rationnel » en 3e. Ils sont lus
//      dans lib/tutor-v4/knowledge/<matiere>/<classe>/notions.ts — ne pas les
//      inventer, les vérifier.
//
// ⚠️ Piège de VÉRIFICATION, pas du code : la page du tutor contient DEUX
//    <select>. Le premier est celui du tutor, le second appartient au coach
//    flottant et reste sur la 6e. Un test qui lit « le » select tombe sur le
//    mauvais et fait croire que ?classe= est ignoré. Vérifier le fil d'ariane
//    (« PREMIERE-SPE > Maths > Dérivation »), pas le premier select venu.

import type { ProfilId } from "./types";
import { displayParamForClasse } from "@/lib/tutor-v4/displayMode";

/** Le nom de la classe côté coach. null = le coach ne couvre pas ce profil. */
export const CLASSE_COACH: Record<ProfilId, string | null> = {
  cp: "cp",
  ce1: "ce1",
  ce2: "ce2",
  cm1: "cm1",
  cm2: "cm2",
  "6e": "6e",
  "5e": "5e",
  "4e": "4e",
  "3e": "3e",
  seconde: "seconde",
  // ⚠️ 15/08/2026 — bascule de « premiere-spe » vers « premiere ». La matrice
  // n'a qu'un rang « première », alors qu'il y a deux classes : la spécialité
  // (4 h) et le module spécifique (1 h 30). La majorité des élèves de première
  // générale ne prend PAS la spécialité, et c'est eux qui passent l'épreuve
  // anticipée — le défaut va donc au module spécifique. Un élève de spé change
  // de classe en deux clics dans le coach.
  premiere: "premiere",
  terminale: "terminale-spe",
  parent: null,
  prof: null,
  direction: null,
};

/**
 * notion du lexique → identifiant du coach, classe par classe.
 * Une case vide n'est pas un oubli : c'est que la notion n'est pas au
 * programme de cette classe-là (les fractions n'existent pas au CP).
 */
type TableNotions = Record<string, Record<string, string>>;

export const NOTION_COACH_MATHS: TableNotions = {
  fractions: {
    ce1: "fraction", ce2: "fraction", cm1: "fraction", cm2: "fraction",
    "6e": "fraction_nombre", "5e": "fraction_nombre", "4e": "fraction_nombre",
    "3e": "fraction_rationnel",
  },
  "nombres-decimaux": {
    cm1: "nombre_decimal", cm2: "nombre_decimal", "6e": "decimal_nombre",
  },
  calcul: {
    cp: "calcul_mental", ce1: "calcul_mental", ce2: "calcul_mental",
    cm1: "calcul", cm2: "calcul", "6e": "entier_calcul_mental",
  },
  relatifs: { "5e": "relatif_nombre", "4e": "relatif_operation" },
  proportionnalite: {
    cm1: "proportionnalite", cm2: "proportionnalite",
    "6e": "prop_proportionnalite", "5e": "prop_proportionnalite",
    "4e": "prop_proportionnalite", "3e": "prop_proportionnalite",
    seconde: "information_chiffree_evolutions",
    premiere: "auto_taux_evolution",
  },
  equations: {
    "5e": "litteral_calcul", "4e": "equation_resolution", "3e": "equation_resolution",
    seconde: "equations_inequations_1er_degre",
    premiere: "auto_equations",
  },
  fonctions: {
    "3e": "fonction_generalite", seconde: "fonction_vocabulaire_2de",
    premiere: "lin_affine",
    "premiere-spe": "variations_fonctions", "terminale-spe": "limite_fonction",
  },
  derivees: {
    premiere: "der_nombre_derive",
    "premiere-spe": "derivation", "terminale-spe": "derivation_fonction",
  },
  suites: {
    premiere: "lin_suite_arithmetique",
    "premiere-spe": "suites", "terminale-spe": "suite_numerique",
  },
  exponentielle: {
    premiere: "expo_fonction",
    "premiere-spe": "exponentielle", "terminale-spe": "fonction_exponentielle",
  },
  probabilites: {
    cm1: "probabilite", cm2: "probabilite", "6e": "proba_experience",
    "5e": "proba_experience", "4e": "proba_experience", "3e": "proba_experience",
    seconde: "probabilites_ensemble_fini",
    premiere: "alea_conditionnelle",
    "premiere-spe": "probabilites_conditionnelles",
    "terminale-spe": "probabilite_conditionnelle",
  },
  statistiques: {
    cm1: "tableau", cm2: "tableau", "6e": "stat_donnee", "5e": "stat_statistique",
    "4e": "stat_statistique", "3e": "stat_statistique",
    seconde: "statistiques_descriptives",
    premiere: "info_tableau_croise",
  },
  geometrie: {
    cp: "figures_solides", ce1: "figures_planes", ce2: "figures_planes",
    cm1: "figure_plane", cm2: "figure_plane", "6e": "triangle_figure",
    "5e": "triangle_figure", "4e": "pythagore_theoreme", "3e": "thales_theoreme",
    seconde: "geometrie_problemes_plan", "premiere-spe": "geometrie_reperee",
    "terminale-spe": "geometrie_espace",
  },
  grandeurs: {
    cp: "longueur", ce1: "longueur", ce2: "longueur", cm1: "longueur",
    cm2: "longueur", "6e": "aire_longueur", "5e": "aire_surface",
    "4e": "aire_perimetre", "3e": "aire_perimetre",
  },
  problemes: {
    cp: "probleme", ce1: "probleme", ce2: "probleme", cm1: "probleme", cm2: "probleme",
  },
};

// Le français n'a de notions déclarées qu'au primaire : au collège il passe
// par une autre structure. On ne cible donc que CP→CM2, et on laisse le coach
// s'ouvrir normalement ailleurs.
export const NOTION_COACH_FRANCAIS: TableNotions = {
  /* ⚠️ LE CM2 A REDÉCOUPÉ SES NOTIONS LE 20/08/2026 (dix devenues dix-neuf).
     Chaque entrée de la matrice ouvre donc sur la PREMIÈRE notion de la suite
     — celle par où l'on commence : la grammaire par la phrase, l'orthographe
     par les accords, la conjugaison par les temps simples, le vocabulaire par
     le sens des mots. Un id qui n'existe plus n'aurait rien cassé de visible :
     le coach se serait simplement ouvert au mauvais endroit. */
  conjugaison: {
    ce1: "conjugaison", ce2: "conjugaison", cm1: "conjugaison",
    cm2: "conjugaison_temps_simples",
  },
  grammaire: {
    cp: "grammaire_phrase", ce1: "grammaire_phrase", ce2: "grammaire_phrase",
    cm1: "grammaire_orthographe", cm2: "grammaire_phrase",
  },
  orthographe: {
    cp: "orthographe", ce1: "orthographe", ce2: "orthographe",
    cm1: "grammaire_orthographe", cm2: "grammaire_accords",
  },
  lecture: {
    cp: "comprehension_lecture", ce1: "comprehension_lecture",
    ce2: "comprehension_lecture", cm1: "comprehension_textes_documents",
    cm2: "comprehension_textes",
  },
  vocabulaire: {
    cp: "vocabulaire", ce1: "vocabulaire", ce2: "vocabulaire",
    cm1: "vocabulaire", cm2: "vocabulaire_sens",
  },
};

/**
 * L'URL du coach, ouverte aussi précisément qu'on peut.
 *
 * — Notion connue → le tutor s'ouvre DESSUS :
 *     /tutor-v4?classe=premiere-spe&matiere=maths&notion=derivation&display=simple
 *   (vérifié : le fil d'ariane affiche « PREMIERE-SPE > Maths > Dérivation »).
 *   Pas de microId : sans lui la session ne démarre pas toute seule, l'élève
 *   voit sa notion déjà choisie et clique « Commencer ». C'est voulu — on ne
 *   lance pas une question dans la figure de quelqu'un qui vient d'arriver.
 * — Sinon → le sommaire de sa classe : /coach-ia/<matiere>?classe=…
 *
 * Renvoie null si le coach ne couvre pas ce profil (parent, prof, direction).
 */
export function urlCoachCiblee(
  profil: ProfilId,
  notionId: string | null,
  matiere: "maths" | "francais",
): string | null {
  const classe = CLASSE_COACH[profil];
  if (!classe) return null;
  // Le français n'a de notions déclarées qu'au primaire.
  if (matiere === "francais" && !NOTION_COACH_FRANCAIS.lecture[classe]) return null;

  const notion = notionId
    ? (matiere === "maths" ? NOTION_COACH_MATHS : NOTION_COACH_FRANCAIS)[notionId]?.[classe]
    : null;

  return notion
    ? `/tutor-v4?classe=${classe}&matiere=${matiere}&notion=${notion}&${displayParamForClasse(classe)}`
    : `/coach-ia/${matiere}?classe=${classe}`;
}

/** La notion du coach visée par une notion du lexique, si elle existe. */
export function notionCoach(
  profil: ProfilId,
  notionId: string | null,
  matiere: "maths" | "francais",
): string | null {
  const classe = CLASSE_COACH[profil];
  if (!classe || !notionId) return null;
  const table = matiere === "maths" ? NOTION_COACH_MATHS : NOTION_COACH_FRANCAIS;
  return table[notionId]?.[classe] ?? null;
}
