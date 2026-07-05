import type { Dico, FamilleDico, GesteDico, MotDicoClasse } from "./types";
import { motsMaths6e } from "./maths/6e";
import { motsFrancais6e } from "./francais/6e";
import { motsMaths6eCollege } from "./maths/6e-college";
import { motsFrancais6eCollege } from "./francais/6e-college";
import { motsAnglais6e } from "./anglais/6e";
import { motsSciences6e } from "./sciences/6e";
import { motsHistGeo6e } from "./histoire-geo/6e";
import { motsMaths5e } from "./maths/5e";
import { motsFrancais5e } from "./francais/5e";
import { motsAnglais5e } from "./anglais/5e";
import { motsSciences5e } from "./sciences/5e";
import { motsHistGeo5e } from "./histoire-geo/5e";
import { motsMaths4e } from "./maths/4e";
import { motsFrancais4e } from "./francais/4e";
import { motsAnglais4e } from "./anglais/4e";
import { motsSciences4e } from "./sciences/4e";
import { motsHistGeo4e } from "./histoire-geo/4e";
import { motsMaths3e } from "./maths/3e";
import { motsFrancais3e } from "./francais/3e";
import { motsAnglais3e } from "./anglais/3e";
import { motsSciences3e } from "./sciences/3e";
import { motsHistGeo3e } from "./histoire-geo/3e";
import { motsMaths2nde } from "./maths/2nde";
import { motsFrancais2nde } from "./francais/2nde";
import { motsAnglais2nde } from "./anglais/2nde";
import { motsSciences2nde } from "./sciences/2nde";
import { motsHistGeo2nde } from "./histoire-geo/2nde";
import { motsMathsCM2 } from "./maths/cm2";
import { motsFrancaisCM2 } from "./francais/cm2";
import { motsSciencesCM2 } from "./sciences/cm2";
import { motsHistGeoCM2 } from "./histoire-geo/cm2";
import { motsMathsCM1 } from "./maths/cm1";
import { motsFrancaisCM1 } from "./francais/cm1";
import { motsSciencesCM1 } from "./sciences/cm1";
import { motsHistGeoCM1 } from "./histoire-geo/cm1";
import { motsAnimauxCP } from "./animaux/cp";
import { motsCouleursCP } from "./couleurs/cp";
import { motsNombresCP } from "./nombres/cp";
import { motsMathsCE1 } from "./maths/ce1";
import { motsFrancaisCE1 } from "./francais/ce1";
import { motsSciencesCE1 } from "./sciences/ce1";
import { motsHistGeoCE1 } from "./histoire-geo/ce1";
import { motsMathsCE2 } from "./maths/ce2";
import { motsFrancaisCE2 } from "./francais/ce2";
import { motsSciencesCE2 } from "./sciences/ce2";
import { motsHistGeoCE2 } from "./histoire-geo/ce2";

export type { Dico, MotDico, MotDicoClasse, FamilleDico, GesteDico, DefiDico } from "./types";
export { NIVEAUX, CYCLES, getNiveau } from "./niveaux";
export type { NiveauDico, CycleDico } from "./niveaux";

// 🔹 Métadonnées d'affichage des familles de mots
export const FAMILLES_DICO: Record<FamilleDico, { label: string; emoji: string }> = {
  // Maths
  "nombres-calcul": { label: "Nombres & calcul", emoji: "🔢" },
  geometrie: { label: "Géométrie", emoji: "📐" },
  "grandeurs-mesures": { label: "Grandeurs & mesures", emoji: "📏" },
  "donnees-proba": { label: "Données & probabilités", emoji: "📊" },
  // Français
  "gram-nature": { label: "Nature des mots", emoji: "🔤" },
  "gram-fonction": { label: "Fonctions", emoji: "🧩" },
  conjugaison: { label: "Conjugaison", emoji: "⏳" },
  "ortho-lexique": { label: "Orthographe & lexique", emoji: "✍️" },
  texte: { label: "Texte & compréhension", emoji: "📖" },
  // Sciences
  "sciences-vivant": { label: "Le vivant", emoji: "🌱" },
  "sciences-matiere": { label: "Matière & énergie", emoji: "⚡" },
  // Histoire-Géographie
  histoire: { label: "Histoire", emoji: "📜" },
  geographie: { label: "Géographie", emoji: "🗺️" },
  // Anglais (collège)
  anglais: { label: "Anglais", emoji: "🇬🇧" },
  // Tout-petits (GS-CP)
  "images-mots": { label: "Images & mots", emoji: "🖼️" },
  // Partagé
  consignes: { label: "Mots-consignes", emoji: "🧭" },
};

export const ORDRE_FAMILLES: FamilleDico[] = [
  // Maths
  "nombres-calcul",
  "geometrie",
  "grandeurs-mesures",
  "donnees-proba",
  // Français
  "gram-nature",
  "gram-fonction",
  "conjugaison",
  "ortho-lexique",
  "texte",
  // Sciences
  "sciences-vivant",
  "sciences-matiere",
  // Histoire-Géographie
  "histoire",
  "geographie",
  // Anglais
  "anglais",
  // Tout-petits (GS-CP)
  "images-mots",
  // Partagé
  "consignes",
];

// 🔹 Métadonnées des gestes numériques entraînés (clavier, souris, menu, association)
export const GESTES_DICO: Record<GesteDico, { label: string; emoji: string; consigne: string }> = {
  saisie: { label: "Clavier", emoji: "⌨️", consigne: "Tape ta réponse" },
  clic: { label: "Souris", emoji: "🖱️", consigne: "Clique sur la bonne réponse" },
  menu: { label: "Menu déroulant", emoji: "▾", consigne: "Choisis dans le menu" },
  association: { label: "Associer", emoji: "🔗", consigne: "Relie le mot à sa définition" },
};

// 🔹 Dicos « ÉVAL nationale » (page /dico interactive, liée dans le header).
// Usage RÉVISION (recouvre volontairement le programme testé à l'examen).
const DICOS_EVAL: Record<string, Dico> = {
  "maths/6e": {
    matiere: "maths",
    matiereLabel: "Maths",
    niveau: "6e",
    titre: "Dico Maths 6e",
    sousTitre: "50 mots & gestes pour l'éval nationale",
    mots: motsMaths6e,
  },
  "francais/6e": {
    matiere: "francais",
    matiereLabel: "Français",
    niveau: "6e",
    titre: "Dico Français 6e",
    sousTitre: "50 mots & gestes pour l'éval nationale",
    mots: motsFrancais6e,
  },
};

// 🔹 Dicos « CARTES » (jeu « Qui suis-je ? » par classe, en ESCALIER : chaque
// notion écrite une seule fois, à l'année où elle arrive → zéro doublon).
const DICOS_CARTES: Record<string, Dico> = {
  // ── 6e (collège) — notions NEUVES, distinctes du CM2 ──────────
  "maths/6e": { matiere: "maths", matiereLabel: "Maths", niveau: "6e", titre: "Dico Maths 6e", sousTitre: "Les notions neuves de 6e", mots: motsMaths6eCollege },
  "francais/6e": { matiere: "francais", matiereLabel: "Français", niveau: "6e", titre: "Dico Français 6e", sousTitre: "Les notions neuves de 6e", mots: motsFrancais6eCollege },
  "anglais/6e": { matiere: "anglais", matiereLabel: "Anglais", niveau: "6e", titre: "Dico Anglais 6e", sousTitre: "L'anglais au collège", mots: motsAnglais6e },
  "sciences/6e": { matiere: "sciences", matiereLabel: "Sciences", niveau: "6e", titre: "Dico Sciences 6e", sousTitre: "SVT : le vivant et son milieu", mots: motsSciences6e },
  "histoire-geo/6e": { matiere: "histoire-geo", matiereLabel: "Histoire-Géo", niveau: "6e", titre: "Dico Histoire-Géo 6e", sousTitre: "L'Antiquité et le monde", mots: motsHistGeo6e },
  // ── 5e (collège) — notions NEUVES, distinctes de la 6e ────────
  "maths/5e": { matiere: "maths", matiereLabel: "Maths", niveau: "5e", titre: "Dico Maths 5e", sousTitre: "Les notions neuves de 5e", mots: motsMaths5e },
  "francais/5e": { matiere: "francais", matiereLabel: "Français", niveau: "5e", titre: "Dico Français 5e", sousTitre: "Les notions neuves de 5e", mots: motsFrancais5e },
  "anglais/5e": { matiere: "anglais", matiereLabel: "Anglais", niveau: "5e", titre: "Dico Anglais 5e", sousTitre: "L'anglais en 5e", mots: motsAnglais5e },
  "sciences/5e": { matiere: "sciences", matiereLabel: "Sciences", niveau: "5e", titre: "Dico Sciences 5e", sousTitre: "SVT et physique-chimie", mots: motsSciences5e },
  "histoire-geo/5e": { matiere: "histoire-geo", matiereLabel: "Histoire-Géo", niveau: "5e", titre: "Dico Histoire-Géo 5e", sousTitre: "Moyen Âge, Renaissance, monde", mots: motsHistGeo5e },
  // ── 4e (collège) — notions NEUVES, distinctes de la 5e ────────
  "maths/4e": { matiere: "maths", matiereLabel: "Maths", niveau: "4e", titre: "Dico Maths 4e", sousTitre: "Les notions neuves de 4e", mots: motsMaths4e },
  "francais/4e": { matiere: "francais", matiereLabel: "Français", niveau: "4e", titre: "Dico Français 4e", sousTitre: "Les notions neuves de 4e", mots: motsFrancais4e },
  "anglais/4e": { matiere: "anglais", matiereLabel: "Anglais", niveau: "4e", titre: "Dico Anglais 4e", sousTitre: "L'anglais en 4e", mots: motsAnglais4e },
  "sciences/4e": { matiere: "sciences", matiereLabel: "Sciences", niveau: "4e", titre: "Dico Sciences 4e", sousTitre: "SVT et physique-chimie", mots: motsSciences4e },
  "histoire-geo/4e": { matiere: "histoire-geo", matiereLabel: "Histoire-Géo", niveau: "4e", titre: "Dico Histoire-Géo 4e", sousTitre: "XVIIIᵉ-XIXᵉ siècles et le monde", mots: motsHistGeo4e },
  // ── 3e (collège) — notions NEUVES, distinctes de la 4e ────────
  "maths/3e": { matiere: "maths", matiereLabel: "Maths", niveau: "3e", titre: "Dico Maths 3e", sousTitre: "Les notions neuves de 3e", mots: motsMaths3e },
  "francais/3e": { matiere: "francais", matiereLabel: "Français", niveau: "3e", titre: "Dico Français 3e", sousTitre: "Les notions neuves de 3e", mots: motsFrancais3e },
  "anglais/3e": { matiere: "anglais", matiereLabel: "Anglais", niveau: "3e", titre: "Dico Anglais 3e", sousTitre: "L'anglais en 3e (brevet)", mots: motsAnglais3e },
  "sciences/3e": { matiere: "sciences", matiereLabel: "Sciences", niveau: "3e", titre: "Dico Sciences 3e", sousTitre: "Génétique, gravitation, chimie", mots: motsSciences3e },
  "histoire-geo/3e": { matiere: "histoire-geo", matiereLabel: "Histoire-Géo", niveau: "3e", titre: "Dico Histoire-Géo 3e", sousTitre: "Le XXᵉ siècle et le monde", mots: motsHistGeo3e },
  // ── 2nde (lycée, tronc commun) — notions NEUVES, distinctes de la 3e ──
  "maths/2nde": { matiere: "maths", matiereLabel: "Maths", niveau: "2nde", titre: "Dico Maths 2nde", sousTitre: "Les notions neuves de Seconde", mots: motsMaths2nde },
  "francais/2nde": { matiere: "francais", matiereLabel: "Français", niveau: "2nde", titre: "Dico Français 2nde", sousTitre: "Les notions neuves de Seconde", mots: motsFrancais2nde },
  "anglais/2nde": { matiere: "anglais", matiereLabel: "Anglais", niveau: "2nde", titre: "Dico Anglais 2nde", sousTitre: "L'anglais en Seconde", mots: motsAnglais2nde },
  "sciences/2nde": { matiere: "sciences", matiereLabel: "Sciences", niveau: "2nde", titre: "Dico Sciences 2nde", sousTitre: "Chimie, physique, SVT", mots: motsSciences2nde },
  "histoire-geo/2nde": { matiere: "histoire-geo", matiereLabel: "Histoire-Géo", niveau: "2nde", titre: "Dico Histoire-Géo 2nde", sousTitre: "Renaissance à Révolution, environnement", mots: motsHistGeo2nde },
  "maths/cm2": {
    matiere: "maths",
    matiereLabel: "Maths",
    niveau: "cm2",
    titre: "Dico Maths CM2",
    sousTitre: "Le vocabulaire de fin de primaire (vers la 6e)",
    mots: motsMathsCM2,
  },
  "francais/cm2": {
    matiere: "francais",
    matiereLabel: "Français",
    niveau: "cm2",
    titre: "Dico Français CM2",
    sousTitre: "Le vocabulaire de fin de primaire (vers la 6e)",
    mots: motsFrancaisCM2,
  },
  "sciences/cm2": {
    matiere: "sciences",
    matiereLabel: "Sciences",
    niveau: "cm2",
    titre: "Dico Sciences CM2",
    sousTitre: "Le vocabulaire de fin de primaire (vers la 6e)",
    mots: motsSciencesCM2,
  },
  "histoire-geo/cm2": {
    matiere: "histoire-geo",
    matiereLabel: "Histoire-Géo",
    niveau: "cm2",
    titre: "Dico Histoire-Géo CM2",
    sousTitre: "Le vocabulaire de fin de primaire (vers la 6e)",
    mots: motsHistGeoCM2,
  },
  "maths/cm1": {
    matiere: "maths",
    matiereLabel: "Maths",
    niveau: "cm1",
    titre: "Dico Maths CM1",
    sousTitre: "Les fondations du CM1",
    mots: motsMathsCM1,
  },
  "francais/cm1": {
    matiere: "francais",
    matiereLabel: "Français",
    niveau: "cm1",
    titre: "Dico Français CM1",
    sousTitre: "Les fondations du CM1",
    mots: motsFrancaisCM1,
  },
  "sciences/cm1": {
    matiere: "sciences",
    matiereLabel: "Sciences",
    niveau: "cm1",
    titre: "Dico Sciences CM1",
    sousTitre: "Les fondations du CM1",
    mots: motsSciencesCM1,
  },
  "histoire-geo/cm1": {
    matiere: "histoire-geo",
    matiereLabel: "Histoire-Géo",
    niveau: "cm1",
    titre: "Dico Histoire-Géo CM1",
    sousTitre: "Les fondations du CM1",
    mots: motsHistGeoCM1,
  },
  // 🐾 Mes premières cartes (GS-CP) — en images (thèmes = matières)
  "animaux/cp": {
    matiere: "animaux",
    matiereLabel: "Animaux",
    niveau: "cp",
    titre: "Dico Animaux GS-CP",
    sousTitre: "Mes premières cartes en images",
    mots: motsAnimauxCP,
  },
  "couleurs/cp": {
    matiere: "couleurs",
    matiereLabel: "Couleurs",
    niveau: "cp",
    titre: "Dico Couleurs GS-CP",
    sousTitre: "Mes premières cartes en images",
    mots: motsCouleursCP,
  },
  "nombres/cp": {
    matiere: "nombres",
    matiereLabel: "Nombres",
    niveau: "cp",
    titre: "Dico Nombres GS-CP",
    sousTitre: "Mes premières cartes en images",
    mots: motsNombresCP,
  },
  // ── CE1 ──────────────────────────────────────────────────────
  "maths/ce1": { matiere: "maths", matiereLabel: "Maths", niveau: "ce1", titre: "Dico Maths CE1", sousTitre: "Le vocabulaire du CE1", mots: motsMathsCE1 },
  "francais/ce1": { matiere: "francais", matiereLabel: "Français", niveau: "ce1", titre: "Dico Français CE1", sousTitre: "Le vocabulaire du CE1", mots: motsFrancaisCE1 },
  "sciences/ce1": { matiere: "sciences", matiereLabel: "Sciences", niveau: "ce1", titre: "Dico Sciences CE1", sousTitre: "Le vocabulaire du CE1", mots: motsSciencesCE1 },
  "histoire-geo/ce1": { matiere: "histoire-geo", matiereLabel: "Histoire-Géo", niveau: "ce1", titre: "Dico Histoire-Géo CE1", sousTitre: "Le vocabulaire du CE1", mots: motsHistGeoCE1 },
  // ── CE2 ──────────────────────────────────────────────────────
  "maths/ce2": { matiere: "maths", matiereLabel: "Maths", niveau: "ce2", titre: "Dico Maths CE2", sousTitre: "Le vocabulaire du CE2", mots: motsMathsCE2 },
  "francais/ce2": { matiere: "francais", matiereLabel: "Français", niveau: "ce2", titre: "Dico Français CE2", sousTitre: "Le vocabulaire du CE2", mots: motsFrancaisCE2 },
  "sciences/ce2": { matiere: "sciences", matiereLabel: "Sciences", niveau: "ce2", titre: "Dico Sciences CE2", sousTitre: "Le vocabulaire du CE2", mots: motsSciencesCE2 },
  "histoire-geo/ce2": { matiere: "histoire-geo", matiereLabel: "Histoire-Géo", niveau: "ce2", titre: "Dico Histoire-Géo CE2", sousTitre: "Le vocabulaire du CE2", mots: motsHistGeoCE2 },
};

// La page /dico interactive sert d'abord le Dico ÉVAL ; sinon, on retombe sur le
// Dico CARTES (une classe/matière peut ainsi être jouée aussi en saisie).
export function getDico(matiere: string, niveau: string): Dico | null {
  const key = `${matiere}/${niveau}`;
  return DICOS_EVAL[key] ?? DICOS_CARTES[key] ?? null;
}

// Le hub /dico ne liste que les dicos ÉVAL (prépa éval nationale).
export function listDicos(): Dico[] {
  return Object.values(DICOS_EVAL);
}

// 🔹 Tous les mots-CARTES d'une CLASSE, toutes matières confondues (le jeu
// « Qui suis-je ? » par classe puise UNIQUEMENT dans le Dico CARTES = escalier).
export function motsDeLaClasse(niveau: string): MotDicoClasse[] {
  return Object.values(DICOS_CARTES)
    .filter((d) => d.niveau === niveau)
    .flatMap((d) =>
      d.mots.map((m) => ({ ...m, matiere: d.matiere, matiereLabel: d.matiereLabel }))
    );
}

// 🔹 Comparaison souple des réponses tapées (insensible à la casse et aux accents)
// On entraîne le geste de saisie sans pénaliser un accent oublié ; la bonne
// orthographe (avec accents) reste affichée dans le retour.
export function normaliseReponse(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .replace(/[?.!,;:]/g, "");
}

export function reponseCorrecte(saisie: string, attendu: string): boolean {
  return normaliseReponse(saisie) === normaliseReponse(attendu) && saisie.trim().length > 0;
}
