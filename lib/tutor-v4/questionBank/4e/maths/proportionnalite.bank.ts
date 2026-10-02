// lib/tutor-v4/question-banks/maths/4e/proportionnalite.bank.ts

/**
 * =========================================================
 * PROPORTIONNALITE.BANK.TS
 * =========================================================
 *
 * Banque de questions Tutor V4 - Mathématiques 4e
 * Notion : Proportionnalité
 *
 * Progression :
 * - reconnaître une situation proportionnelle ;
 * - utiliser un tableau ;
 * - calculer une quatrième proportionnelle ;
 * - utiliser un coefficient ou le passage à l’unité ;
 * - calculer/interpréter un pourcentage ;
 * - utiliser un coefficient multiplicateur ;
 * - interpréter une évolution ;
 * - résoudre des problèmes contextualisés ;
 * - éviter les pièges classiques.
 *
 * ⛔ 30/09/2026 — LES DÉFIS DE POURCENTAGE ONT CHANGÉ DE MICRO. Sept items
 * `prop_defi_*` (« + 20 % puis − 20 % », « augmenter de 30 %, c'est × 0,3 ? »…)
 * étaient restés dans `prop_defi` (notion prop_proportionnalite) après la
 * scission du 28/08, qui a envoyé les pourcentages dans prop_ratio_pourcentage.
 * Un élève du chapitre « Proportionnalité » tombait donc sur des pourcentages
 * au défi. Ils portent maintenant `microId: "prop_pourcentage_defi"` (« Défis sur
 * les ratios et les pourcentages ») : leurs `id` n'ont pas changé, rien n'est
 * supprimé.
 * ⭐ 02/10/2026 — la notion est coupée en deux : ces sept défis et les micros
 * de pourcentage vont dans `prop_pourcentages`, micro `prop_pourcentage_defi`
 * (« Défis sur les pourcentages »).
 * ⭐ 30/09/2026 — les gabarits tirent une SITUATION × une TOURNURE : les élèves
 * de 4e de Frédéric voyaient revenir la même phrase (mesure :
 * scripts/mesurer-squelettes-coach.ts).
 */

import type {
  TutorBankItemV4,
  TableauProportionnaliteCanvasData,
} from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function formatNumber(n: number) {
  return Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  // ⚠️ 04/08/2026 — la bonne réponse était jetée dans le même chapeau que les
  // pièges : à cinq pièges écrits, le mélange pouvait la laisser au fond et
  // le découpage à quatre l'emportait. L'élève voyait alors quatre pièges et
  // rien d'autre. On la met de côté, on tire trois distracteurs, on mélange.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}
function tableauProportionnaliteCanvas(params: {
  rowLabels: string[];
  values: string[][];
  missing: Array<{ row: number; col: number }>;
  colLabels?: string[];
  highlightedCells?: Array<{ row: number; col: number }>;
}): TableauProportionnaliteCanvasData {
  return {
    kind: "tableau_proportionnalite",
    rows: params.values.length,
    cols: params.values[0]?.length ?? 0,
    rowLabels: params.rowLabels,
    colLabels: params.colLabels,
    values: params.values,
    missing: params.missing,
    highlightedCells: params.highlightedCells,
    display: {
      showRowLabels: true,
      showColLabels: true,
      showMissing: true,
      showGrid: true,
    },
  };
}

/* =========================================================
   SITUATIONS × TOURNURES — 30/09/2026
   ---------------------------------------------------------
   ⛔ POURQUOI. Les élèves de 4e de Frédéric : « des questions reviennent
   souvent ». Les gabarits changeaient les NOMBRES mais gardaient la même
   PHRASE, et l'élève reconnaît la phrase (mesuré : 8 à 10 squelettes par
   micro, 13 à 18 répétitions sur 20 questions).
   Chaque gabarit compose désormais une SITUATION (18 contextes, un seul
   réunionnais par table) et une TOURNURE (3 à 6 façons de poser la même
   question). Instrument : scripts/mesurer-squelettes-coach.ts 4e <notion>.
   ⚠️ Un contexte ajouté doit rester plausible (un prix de baguette n'est pas
   à 40 €) et ses phrases doivent se lire à la suite : `lien` est une
   proposition sans majuscule ni point final, `demandeB` une question entière.
   ========================================================= */

/** Nombre écrit à la française (virgule décimale), pour le TEXTE. */
function fr(n: number) {
  return formatNumber(n).replace(".", ",");
}

/** Réponse attendue : un décimal est accepté avec point OU virgule. */
function attendu(n: number) {
  return Number.isInteger(n) ? [String(n)] : [formatNumber(n), fr(n)];
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Première lettre seulement : « Peinture (L) » → « peinture (L) », pas « (l) ». */
function minuscule(s: string) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

/** « que » + proposition, avec l'élision : « qu’en 3 h », « qu’un robinet ». */
function que(s: string) {
  return /^[aeiouyàâéèêîô]/i.test(s) ? `qu’${s}` : `que ${s}`;
}

/** « de » + groupe nominal : « du prix », « de la population », « de ce tarif ». */
function deArt(g: string) {
  return g.startsWith("le ") ? `du ${g.slice(3)}` : `de ${g}`;
}

/** « à » + groupe nominal : « au loyer », « à la facture ». */
function aArt(g: string) {
  return g.startsWith("le ") ? `au ${g.slice(3)}` : `à ${g}`;
}

function expl(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

const DEF_PROP =
  "deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.";

/** Une situation de proportionnalité : grandeur A (n) → grandeur B (m = n × k). */
type SituationProp = {
  /** Groupe nominal qui nomme la situation : « un robinet qui fuit ». */
  titre: string;
  /** Phrase d'introduction SANS hypothèse de proportionnalité (pour « reconnaître »). */
  intro: string;
  /** Un relevé court, après l'intro : « en 2 h, il parcourt 40 km ». */
  couple: (n: number, m: number) => string;
  /** La situation, proportionnelle par hypothèse. */
  lien: (n: number, m: number) => string;
  /** La même, données dans l'autre ordre. */
  lien2: (n: number, m: number) => string;
  /** Question qui demande la grandeur B pour n. */
  demandeB: (n: number) => string;
  /** Groupe nominal de la grandeur B pour n : « le prix de 7 kg de pommes ». */
  valeurB: (n: number) => string;
  /** Question qui demande la grandeur A pour m. */
  demandeA: (m: number) => string;
  /** La valeur pour une unité : « le prix d’un kilogramme de pommes ». */
  unite: string;
  uniteFem: boolean;
  uB: string;
  uA: string;
  labelA: string;
  labelB: string;
  /** « de la masse (en kg) au prix (en €) ». */
  passage: string;
  qProp: string;
  n: [number, number];
  k: number[];
  /** Écarts plausibles pour fabriquer une situation NON proportionnelle. */
  ecart: number[];
};

const SITUATIONS: SituationProp[] = [
  {
    titre: "un achat de pommes au marché",
    intro: "Au marché, on relève le prix des pommes",
    couple: (n, m) => `${n} kg coûtent ${m} €`,
    lien: (n, m) => `${n} kg de pommes coûtent ${m} €`,
    lien2: (n, m) => `on paie ${m} € pour ${n} kg de pommes`,
    demandeB: (n) => `Combien coûtent ${n} kg de pommes ?`,
    valeurB: (n) => `le prix de ${n} kg de pommes`,
    demandeA: (m) => `Quelle masse de pommes, en kg, peut-on acheter avec ${m} € ?`,
    unite: "le prix d’un kilogramme de pommes",
    uniteFem: false,
    uB: "€",
    uA: "kg",
    labelA: "Masse de pommes (kg)",
    labelB: "Prix (€)",
    passage: "de la masse (en kg) au prix (en €)",
    qProp: "Le prix payé est-il proportionnel à la masse de pommes ?",
    n: [2, 9],
    k: [2, 3, 4],
    ecart: [1, 2, 3],
  },
  {
    titre: "un cycliste sur une route de campagne",
    intro: "On chronomètre un cycliste sur une longue route",
    couple: (n, m) => `en ${n} h, il parcourt ${m} km`,
    lien: (n, m) => `en ${n} h, un cycliste roulant à vitesse constante parcourt ${m} km`,
    lien2: (n, m) => `un cycliste roulant à vitesse constante parcourt ${m} km en ${n} h`,
    demandeB: (n) => `Quelle distance parcourt-il en ${n} h ?`,
    valeurB: (n) => `la distance parcourue en ${n} h`,
    demandeA: (m) => `Combien d’heures lui faut-il pour parcourir ${m} km ?`,
    unite: "la distance parcourue en une heure",
    uniteFem: true,
    uB: "km",
    uA: "h",
    labelA: "Durée (h)",
    labelB: "Distance (km)",
    passage: "de la durée (en h) à la distance (en km)",
    qProp: "La distance parcourue est-elle proportionnelle à la durée ?",
    n: [2, 6],
    k: [15, 18, 20, 24, 25],
    ecart: [3, 5, 7],
  },
  {
    titre: "une coureuse à l’entraînement",
    intro: "Une coureuse note ses temps pendant un entraînement",
    couple: (n, m) => `en ${n} min, elle parcourt ${m} m`,
    lien: (n, m) => `à allure régulière, une coureuse parcourt ${m} m en ${n} min`,
    lien2: (n, m) => `une coureuse, à allure régulière, met ${n} min pour parcourir ${m} m`,
    demandeB: (n) => `Quelle distance, en mètres, parcourt-elle en ${n} min ?`,
    valeurB: (n) => `la distance parcourue en ${n} min`,
    demandeA: (m) => `Combien de minutes lui faut-il pour parcourir ${m} m ?`,
    unite: "la distance parcourue en une minute",
    uniteFem: true,
    uB: "m",
    uA: "min",
    labelA: "Durée (min)",
    labelB: "Distance (m)",
    passage: "de la durée (en min) à la distance (en m)",
    qProp: "La distance parcourue est-elle proportionnelle à la durée de course ?",
    n: [3, 12],
    k: [150, 180, 200, 220, 250],
    ecart: [20, 30, 50],
  },
  {
    titre: "une recette de crêpes",
    intro: "Une famille note la farine utilisée pour ses crêpes",
    couple: (n, m) => `pour ${n} personnes, il faut ${m} g de farine`,
    lien: (n, m) => `pour ${n} personnes, une recette de crêpes demande ${m} g de farine`,
    lien2: (n, m) => `une recette de crêpes utilise ${m} g de farine pour ${n} personnes`,
    demandeB: (n) => `Quelle masse de farine faut-il pour ${n} personnes ?`,
    valeurB: (n) => `la masse de farine nécessaire pour ${n} personnes`,
    demandeA: (m) => `Pour combien de personnes suffisent ${m} g de farine ?`,
    unite: "la masse de farine par personne",
    uniteFem: true,
    uB: "g",
    uA: "personnes",
    labelA: "Nombre de personnes",
    labelB: "Farine (g)",
    passage: "du nombre de personnes à la masse de farine (en g)",
    qProp: "La masse de farine est-elle proportionnelle au nombre de personnes ?",
    n: [2, 12],
    k: [40, 50, 60, 75],
    ecart: [10, 20, 30],
  },
  {
    titre: "un train à grande vitesse",
    intro: "Un voyageur note la distance parcourue par son train",
    couple: (n, m) => `en ${n} h, le train a parcouru ${m} km`,
    lien: (n, m) => `un train roulant à vitesse constante parcourt ${m} km en ${n} h`,
    lien2: (n, m) => `en ${n} h, un train roulant à vitesse constante parcourt ${m} km`,
    demandeB: (n) => `Quelle distance ce train parcourt-il en ${n} h ?`,
    valeurB: (n) => `la distance parcourue par le train en ${n} h`,
    demandeA: (m) => `Combien d’heures faut-il à ce train pour parcourir ${m} km ?`,
    unite: "la distance parcourue par le train en une heure",
    uniteFem: true,
    uB: "km",
    uA: "h",
    labelA: "Durée du trajet (h)",
    labelB: "Distance (km)",
    passage: "de la durée du trajet (en h) à la distance (en km)",
    qProp: "La distance parcourue par le train est-elle proportionnelle à la durée du trajet ?",
    n: [2, 5],
    k: [150, 200, 250, 300],
    ecart: [20, 30, 40],
  },
  {
    titre: "un robinet qui fuit",
    intro: "On mesure l’eau perdue par un robinet qui fuit",
    couple: (n, m) => `en ${n} jours, il perd ${m} L`,
    lien: (n, m) => `un robinet qui fuit perd ${m} L d’eau en ${n} jours`,
    lien2: (n, m) => `en ${n} jours, un robinet qui fuit perd ${m} L d’eau`,
    demandeB: (n) => `Combien de litres d’eau perd-il en ${n} jours ?`,
    valeurB: (n) => `le volume d’eau perdu en ${n} jours`,
    demandeA: (m) => `En combien de jours perd-il ${m} L d’eau ?`,
    unite: "le volume d’eau perdu en un jour",
    uniteFem: false,
    uB: "L",
    uA: "jours",
    labelA: "Durée (jours)",
    labelB: "Eau perdue (L)",
    passage: "de la durée (en jours) au volume d’eau perdu (en L)",
    qProp: "Le volume d’eau perdu est-il proportionnel au nombre de jours ?",
    n: [2, 10],
    k: [8, 10, 12, 15, 20],
    ecart: [2, 3, 5],
  },
  {
    titre: "un radiateur électrique",
    intro: "On relève la consommation d’un radiateur électrique",
    couple: (n, m) => `en ${n} h, il consomme ${m} kWh`,
    lien: (n, m) => `un radiateur électrique consomme ${m} kWh en ${n} h de fonctionnement`,
    lien2: (n, m) => `en ${n} h de fonctionnement, un radiateur électrique consomme ${m} kWh`,
    demandeB: (n) => `Combien de kWh consomme-t-il en ${n} h ?`,
    valeurB: (n) => `l’énergie consommée en ${n} h`,
    demandeA: (m) => `Pendant combien d’heures fonctionne-t-il avec ${m} kWh ?`,
    unite: "l’énergie consommée en une heure",
    uniteFem: true,
    uB: "kWh",
    uA: "h",
    labelA: "Durée (h)",
    labelB: "Énergie (kWh)",
    passage: "de la durée (en h) à l’énergie consommée (en kWh)",
    qProp: "L’énergie consommée est-elle proportionnelle à la durée de fonctionnement ?",
    n: [2, 12],
    k: [2, 3],
    ecart: [1, 2],
  },
  {
    titre: "un jardinier qui sème une pelouse",
    intro: "Un jardinier note les graines utilisées pour semer du gazon",
    couple: (n, m) => `pour ${n} m², il utilise ${m} g de graines`,
    lien: (n, m) => `pour semer ${n} m² de pelouse, il faut ${m} g de graines`,
    lien2: (n, m) => `un jardinier utilise ${m} g de graines pour semer ${n} m² de pelouse`,
    demandeB: (n) => `Quelle masse de graines faut-il pour semer ${n} m² ?`,
    valeurB: (n) => `la masse de graines pour ${n} m²`,
    demandeA: (m) => `Quelle surface, en m², peut-on semer avec ${m} g de graines ?`,
    unite: "la masse de graines pour un mètre carré",
    uniteFem: true,
    uB: "g",
    uA: "m²",
    labelA: "Surface (m²)",
    labelB: "Graines (g)",
    passage: "de la surface (en m²) à la masse de graines (en g)",
    qProp: "La masse de graines est-elle proportionnelle à la surface semée ?",
    n: [4, 20],
    k: [25, 30, 35, 40],
    ecart: [5, 10, 15],
  },
  {
    titre: "des travaux de peinture",
    intro: "Un bricoleur note la surface peinte avec ses pots de peinture",
    couple: (n, m) => `avec ${n} L, il peint ${m} m²`,
    lien: (n, m) => `${n} L de peinture permettent de couvrir ${m} m² de mur`,
    lien2: (n, m) => `pour couvrir ${m} m² de mur, il faut ${n} L de peinture`,
    demandeB: (n) => `Quelle surface de mur peut-on couvrir avec ${n} L de peinture ?`,
    valeurB: (n) => `la surface couverte avec ${n} L de peinture`,
    demandeA: (m) => `Combien de litres de peinture faut-il pour couvrir ${m} m² ?`,
    unite: "la surface couverte par un litre de peinture",
    uniteFem: true,
    uB: "m²",
    uA: "L",
    labelA: "Peinture (L)",
    labelB: "Surface (m²)",
    passage: "du volume de peinture (en L) à la surface couverte (en m²)",
    qProp: "La surface peinte est-elle proportionnelle au volume de peinture ?",
    n: [2, 8],
    k: [8, 10, 12],
    ecart: [2, 3, 4],
  },
  {
    titre: "un job d’été payé à l’heure",
    intro: "Une étudiante note ce qu’elle gagne à son job d’été",
    couple: (n, m) => `pour ${n} h, elle gagne ${m} €`,
    lien: (n, m) => `pour ${n} h de travail, une étudiante gagne ${m} €`,
    lien2: (n, m) => `une étudiante gagne ${m} € en travaillant ${n} h`,
    demandeB: (n) => `Combien gagne-t-elle pour ${n} h de travail ?`,
    valeurB: (n) => `le salaire pour ${n} h de travail`,
    demandeA: (m) => `Combien d’heures doit-elle travailler pour gagner ${m} € ?`,
    unite: "le salaire pour une heure de travail",
    uniteFem: false,
    uB: "€",
    uA: "h",
    labelA: "Durée de travail (h)",
    labelB: "Salaire (€)",
    passage: "de la durée de travail (en h) au salaire (en €)",
    qProp: "Le salaire est-il proportionnel à la durée de travail ?",
    n: [3, 20],
    k: [12, 13, 14, 15],
    ecart: [3, 5, 8],
  },
  {
    titre: "un métronome",
    intro: "Une musicienne compte les battements de son métronome",
    couple: (n, m) => `en ${n} minutes, il bat ${m} fois`,
    lien: (n, m) => `un métronome bat ${m} fois en ${n} minutes`,
    lien2: (n, m) => `en ${n} minutes, un métronome bat ${m} fois`,
    demandeB: (n) => `Combien de fois bat-il en ${n} minutes ?`,
    valeurB: (n) => `le nombre de battements en ${n} minutes`,
    demandeA: (m) => `En combien de minutes bat-il ${m} fois ?`,
    unite: "le nombre de battements par minute",
    uniteFem: false,
    uB: "battements",
    uA: "minutes",
    labelA: "Durée (min)",
    labelB: "Battements",
    passage: "de la durée (en min) au nombre de battements",
    qProp: "Le nombre de battements est-il proportionnel à la durée ?",
    n: [2, 8],
    k: [60, 80, 90, 100, 120],
    ecart: [5, 10, 15],
  },
  {
    titre: "une imprimante du CDI",
    intro: "Au CDI, on chronomètre une imprimante",
    couple: (n, m) => `en ${n} minutes, elle imprime ${m} pages`,
    lien: (n, m) => `une imprimante imprime ${m} pages en ${n} minutes`,
    lien2: (n, m) => `en ${n} minutes, une imprimante imprime ${m} pages`,
    demandeB: (n) => `Combien de pages imprime-t-elle en ${n} minutes ?`,
    valeurB: (n) => `le nombre de pages imprimées en ${n} minutes`,
    demandeA: (m) => `Combien de minutes lui faut-il pour imprimer ${m} pages ?`,
    unite: "le nombre de pages imprimées en une minute",
    uniteFem: false,
    uB: "pages",
    uA: "minutes",
    labelA: "Durée (min)",
    labelB: "Pages imprimées",
    passage: "de la durée (en min) au nombre de pages",
    qProp: "Le nombre de pages imprimées est-il proportionnel à la durée ?",
    n: [2, 10],
    k: [12, 15, 20, 25],
    ecart: [2, 3, 5],
  },
  {
    titre: "un club de basket qui achète des ballons",
    intro: "Un club de basket compare ses factures de ballons",
    couple: (n, m) => `${n} ballons coûtent ${m} €`,
    lien: (n, m) => `un club de basket paie ${m} € pour ${n} ballons identiques`,
    lien2: (n, m) => `${n} ballons de basket identiques coûtent ${m} €`,
    demandeB: (n) => `Combien coûtent ${n} de ces ballons ?`,
    valeurB: (n) => `le prix de ${n} ballons`,
    demandeA: (m) => `Combien de ballons peut-on acheter avec ${m} € ?`,
    unite: "le prix d’un ballon",
    uniteFem: false,
    uB: "€",
    uA: "ballons",
    labelA: "Nombre de ballons",
    labelB: "Prix (€)",
    passage: "du nombre de ballons au prix (en €)",
    qProp: "Le prix payé est-il proportionnel au nombre de ballons ?",
    n: [2, 12],
    k: [15, 18, 20, 25],
    ecart: [2, 5, 8],
  },
  {
    titre: "un séjour en auberge de jeunesse",
    intro: "Des randonneurs comparent le prix de leurs nuits en auberge de jeunesse",
    couple: (n, m) => `${n} nuits coûtent ${m} €`,
    lien: (n, m) => `dans une auberge de jeunesse, ${n} nuits coûtent ${m} €`,
    lien2: (n, m) => `un séjour de ${n} nuits dans une auberge de jeunesse coûte ${m} €`,
    demandeB: (n) => `Combien coûtent ${n} nuits ?`,
    valeurB: (n) => `le prix de ${n} nuits`,
    demandeA: (m) => `Combien de nuits peut-on payer avec ${m} € ?`,
    unite: "le prix d’une nuit",
    uniteFem: false,
    uB: "€",
    uA: "nuits",
    labelA: "Nombre de nuits",
    labelB: "Prix (€)",
    passage: "du nombre de nuits au prix (en €)",
    qProp: "Le prix payé est-il proportionnel au nombre de nuits ?",
    n: [2, 10],
    k: [22, 25, 28, 30],
    ecart: [3, 5, 10],
  },
  {
    titre: "des letchis au marché de Saint-Pierre",
    intro: "Au marché de Saint-Pierre, on relève le prix des letchis",
    couple: (n, m) => `${n} kg coûtent ${m} €`,
    lien: (n, m) => `au marché de Saint-Pierre, ${n} kg de letchis coûtent ${m} €`,
    lien2: (n, m) => `un marchand de Saint-Pierre vend ${n} kg de letchis pour ${m} €`,
    demandeB: (n) => `Combien coûtent ${n} kg de letchis ?`,
    valeurB: (n) => `le prix de ${n} kg de letchis`,
    demandeA: (m) => `Quelle masse de letchis, en kg, peut-on acheter avec ${m} € ?`,
    unite: "le prix d’un kilogramme de letchis",
    uniteFem: false,
    uB: "€",
    uA: "kg",
    labelA: "Masse de letchis (kg)",
    labelB: "Prix (€)",
    passage: "de la masse (en kg) au prix (en €)",
    qProp: "Le prix payé est-il proportionnel à la masse de letchis ?",
    n: [2, 8],
    k: [4, 5, 6, 8],
    ecart: [1, 2, 3],
  },
  {
    titre: "la préparation d’un jus d’orange",
    intro: "Au self, on note le nombre d’oranges pressées pour faire du jus",
    couple: (n, m) => `pour ${n} L de jus, il faut ${m} oranges`,
    lien: (n, m) => `pour préparer ${n} L de jus, il faut presser ${m} oranges`,
    lien2: (n, m) => `avec ${m} oranges pressées, on obtient ${n} L de jus`,
    demandeB: (n) => `Combien d’oranges faut-il presser pour obtenir ${n} L de jus ?`,
    valeurB: (n) => `le nombre d’oranges nécessaires pour ${n} L de jus`,
    demandeA: (m) => `Combien de litres de jus obtient-on avec ${m} oranges ?`,
    unite: "le nombre d’oranges pour un litre de jus",
    uniteFem: false,
    uB: "oranges",
    uA: "L",
    labelA: "Jus (L)",
    labelB: "Oranges",
    passage: "du volume de jus (en L) au nombre d’oranges",
    qProp: "Le nombre d’oranges est-il proportionnel au volume de jus ?",
    n: [2, 8],
    k: [8, 10, 12],
    ecart: [2, 3, 4],
  },
  {
    titre: "un maçon sur un chantier",
    intro: "Sur un chantier, on compte les briques posées par un maçon",
    couple: (n, m) => `en ${n} heures, il pose ${m} briques`,
    lien: (n, m) => `un maçon pose ${m} briques en ${n} heures`,
    lien2: (n, m) => `en ${n} heures, un maçon pose ${m} briques`,
    demandeB: (n) => `Combien de briques pose-t-il en ${n} heures ?`,
    valeurB: (n) => `le nombre de briques posées en ${n} heures`,
    demandeA: (m) => `Combien d’heures lui faut-il pour poser ${m} briques ?`,
    unite: "le nombre de briques posées en une heure",
    uniteFem: false,
    uB: "briques",
    uA: "heures",
    labelA: "Durée (h)",
    labelB: "Briques posées",
    passage: "de la durée (en h) au nombre de briques",
    qProp: "Le nombre de briques posées est-il proportionnel à la durée de travail ?",
    n: [2, 8],
    k: [40, 50, 60],
    ecart: [5, 10, 15],
  },
  {
    titre: "un escargot observé en SVT",
    intro: "En SVT, on observe un escargot qui avance sur une vitre",
    couple: (n, m) => `en ${n} minutes, il avance de ${m} cm`,
    lien: (n, m) => `un escargot avançant à vitesse constante parcourt ${m} cm en ${n} minutes`,
    lien2: (n, m) => `en ${n} minutes, un escargot avançant à vitesse constante parcourt ${m} cm`,
    demandeB: (n) => `Quelle distance parcourt-il en ${n} minutes ?`,
    valeurB: (n) => `la distance parcourue en ${n} minutes`,
    demandeA: (m) => `Combien de minutes lui faut-il pour parcourir ${m} cm ?`,
    unite: "la distance parcourue en une minute",
    uniteFem: true,
    uB: "cm",
    uA: "minutes",
    labelA: "Durée (min)",
    labelB: "Distance (cm)",
    passage: "de la durée (en min) à la distance (en cm)",
    qProp: "La distance parcourue est-elle proportionnelle à la durée ?",
    n: [2, 10],
    k: [5, 6, 8],
    ecart: [1, 2, 3],
  },
];

/**
 * Deux valeurs de la grandeur A et le coefficient.
 * niveau 1 : n2 = 2 × n1 ou 3 × n1 ; niveau 2 : quelconques ;
 * niveau 3 : rapport NON entier entre les colonnes (2j → 3j ou 5j).
 */
function tirerPaire(s: SituationProp, niveau: 1 | 2 | 3) {
  const [lo, hi] = s.n;
  const k = randomChoice(s.k);
  let n1: number;
  let n2: number;
  if (niveau === 1) {
    const f = randomChoice([2, 3]);
    n1 = randomInt(lo, Math.max(lo, Math.floor(hi / f)));
    n2 = n1 * f;
  } else if (niveau === 3) {
    const r = randomChoice([3, 5]);
    const jMin = Math.max(1, Math.ceil(lo / 2));
    const j = randomInt(jMin, Math.max(jMin, Math.floor(hi / r)));
    n1 = 2 * j;
    n2 = r * j;
  } else {
    n1 = randomInt(lo, hi);
    do {
      n2 = randomInt(lo, hi);
    } while (n2 === n1);
  }
  return { k, n1, n2, m1: n1 * k, m2: n2 * k };
}

const ENONCES_TABLEAU = [
  "complète ce tableau de proportionnalité.",
  "quelle valeur manque dans ce tableau de proportionnalité ?",
  "calcule la case vide de ce tableau de proportionnalité.",
];

/** Quatrième proportionnelle : on donne un couple, on demande B (ou A). */
function genQuatrieme(niveau: 1 | 2 | 3) {
  const s = randomChoice(SITUATIONS);
  const { k, n1, n2, m1, m2 } = tirerPaire(s, niveau);
  const t = randomInt(1, 6);
  const inverse = t >= 5;
  let text: string;
  let canvas: TableauProportionnaliteCanvasData | undefined;
  if (t === 1) text = `${cap(s.lien(n1, m1))}. ${s.demandeB(n2)}`;
  else if (t === 2) text = `${cap(s.lien2(n1, m1))}. ${s.demandeB(n2)}`;
  else if (t === 3) text = `Sachant ${que(s.lien(n1, m1))}, calcule ${s.valeurB(n2)}.`;
  else if (t === 4) {
    text = `${cap(s.titre)} : les deux grandeurs sont proportionnelles. ${cap(randomChoice(ENONCES_TABLEAU))}`;
    canvas = tableauProportionnaliteCanvas({
      rowLabels: [s.labelA, s.labelB],
      values: [
        [String(n1), String(n2)],
        [String(m1), "?"],
      ],
      missing: [{ row: 1, col: 1 }],
      highlightedCells: [{ row: 1, col: 1 }],
    });
  } else if (t === 5) text = `${cap(s.lien(n1, m1))}. ${s.demandeA(m2)}`;
  else text = `${cap(s.lien2(n1, m1))}. ${s.demandeA(m2)}`;

  const rep = inverse ? n2 : m2;
  return {
    text,
    format: "short" as const,
    expected: attendu(rep),
    comparator: "number_equal" as const,
    explanation: inverse
      ? expl(
          DEF_PROP,
          `on passe par l’unité : ${s.unite} vaut ${m1} ÷ ${n1} = ${k} ${s.uB}.`,
          `${m2} ÷ ${k} = ${n2}.`,
          `la réponse est ${n2} ${s.uA}.`,
        )
      : expl(
          DEF_PROP,
          `on passe par l’unité : ${s.unite} vaut ${m1} ÷ ${n1} = ${k} ${s.uB} (ou produit en croix : ${m1} × ${n2} ÷ ${n1}).`,
          `${n2} × ${k} = ${m2}.`,
          `${s.valeurB(n2)} est de ${m2} ${s.uB}.`,
        ),
    ...(canvas ? { canvas } : {}),
  };
}

/** Compléter un tableau de proportionnalité (canvas ou tableau décrit). */
function genTableau(niveau: 1 | 2 | 3) {
  const s = randomChoice(SITUATIONS);
  const { k, n1, n2, m1, m2 } = tirerPaire(s, niveau);
  // niveau 1 : la case vide est toujours en bas ; ensuite, une fois sur deux en haut.
  const enHaut = niveau > 1 && Math.random() < 0.5;
  const avecCanvas = Math.random() < 0.5;
  let text: string;
  let canvas: TableauProportionnaliteCanvasData | undefined;
  if (avecCanvas) {
    text = `${cap(s.titre)} : ${randomChoice(ENONCES_TABLEAU)}`;
    canvas = tableauProportionnaliteCanvas({
      rowLabels: [s.labelA, s.labelB],
      values: enHaut
        ? [
            [String(n1), "?"],
            [String(m1), String(m2)],
          ]
        : [
            [String(n1), String(n2)],
            [String(m1), "?"],
          ],
      missing: [enHaut ? { row: 0, col: 1 } : { row: 1, col: 1 }],
      highlightedCells: [enHaut ? { row: 0, col: 1 } : { row: 1, col: 1 }],
    });
  } else {
    text = enHaut
      ? `Tableau de proportionnalité (${s.titre}) — ${s.labelA} : ${n1} et ? ; ${s.labelB} : ${m1} et ${m2}. Quelle est la valeur manquante ?`
      : `Tableau de proportionnalité (${s.titre}) — ${s.labelA} : ${n1} et ${n2} ; ${s.labelB} : ${m1} et ?. Quelle est la valeur manquante ?`;
  }
  const rep = enHaut ? n2 : m2;
  return {
    text,
    format: "short" as const,
    expected: attendu(rep),
    comparator: "number_equal" as const,
    explanation: expl(
      "dans un tableau de proportionnalité, on passe de la 1re ligne à la 2e en multipliant toujours par le même coefficient.",
      `coefficient = ${m1} ÷ ${n1} = ${k}.`,
      enHaut ? `on remonte en divisant : ${m2} ÷ ${k} = ${n2}.` : `${n2} × ${k} = ${m2}.`,
      `la valeur manquante est ${rep}.`,
    ),
    ...(canvas ? { canvas } : {}),
  };
}

/** Coefficient de proportionnalité (valeur pour une unité), ou son usage. */
function genCoeff(niveau: 1 | 2 | 3) {
  const s = randomChoice(SITUATIONS);
  const k = randomChoice(s.k);
  const [lo, hi] = s.n;
  const n = niveau === 1 ? randomInt(lo, Math.min(hi, lo + 4)) : randomInt(lo, hi);
  const m = n * k;
  const t = randomInt(1, niveau === 3 ? 5 : 4);
  let text: string;
  if (t === 1) text = `${cap(s.lien(n, m))}. ${s.uniteFem ? "Quelle" : "Quel"} est ${s.unite} ?`;
  else if (t === 2) text = `${cap(s.lien2(n, m))}. Calcule ${s.unite}.`;
  else if (t === 3)
    text = `${cap(s.titre)} — dans un tableau de proportionnalité, ${s.labelA} : ${n} ; ${s.labelB} : ${m}. Par quel nombre multiplie-t-on la première ligne pour obtenir la seconde ?`;
  else if (t === 4)
    text = `${cap(s.lien(n, m))}. Quel coefficient de proportionnalité permet de passer ${s.passage} ?`;
  else text = `${cap(s.titre)} : ${s.unite} est de ${k} ${s.uB}. Calcule ${s.valeurB(n)}.`;

  if (t === 5) {
    return {
      text,
      format: "short" as const,
      expected: attendu(m),
      comparator: "number_equal" as const,
      explanation: expl(
        DEF_PROP,
        `le coefficient est ${k} : on multiplie la première grandeur par ${k}.`,
        `${n} × ${k} = ${m}.`,
        `${s.valeurB(n)} est de ${m} ${s.uB}.`,
      ),
    };
  }
  return {
    text,
    format: "short" as const,
    expected: attendu(k),
    comparator: "number_equal" as const,
    explanation: expl(
      DEF_PROP,
      "le coefficient s’obtient en divisant la seconde grandeur par la première.",
      `${m} ÷ ${n} = ${k}.`,
      `le coefficient de proportionnalité est ${k} : ${s.unite} est de ${k} ${s.uB}.`,
    ),
  };
}

function rapportTexte(m: number, n: number) {
  const r = m / n;
  const exact = Number.isInteger(Math.round(r * 100 * 1e6) / 1e6);
  return `${m} ÷ ${n} ${exact ? "=" : "≈"} ${fr(Math.round(r * 100) / 100)}`;
}

/** Reconnaître une situation de proportionnalité (oui / non). */
function genReconnaitre(niveau: 1 | 2 | 3) {
  const s = randomChoice(SITUATIONS);
  const prop = Math.random() < 0.5;
  const { k, n1, n2 } = tirerPaire(s, niveau === 1 ? 1 : 2);
  const ns = [n1, n2];
  if (niveau === 3) {
    let n3: number;
    do {
      n3 = randomInt(s.n[0], s.n[1]);
    } while (ns.includes(n3));
    ns.push(n3);
  }
  const ms = ns.map((n) => n * k);
  if (!prop) {
    // on fausse la 2e (ou la 3e) valeur d'un écart plausible
    const i = randomInt(1, ns.length - 1);
    const e = randomChoice(s.ecart) * (Math.random() < 0.5 && ms[i] > 2 * s.ecart[s.ecart.length - 1] ? -1 : 1);
    ms[i] += e;
  }
  const couples = ns.map((n, i) => s.couple(n, ms[i]));
  const liste = couples.length === 2 ? `${couples[0]} et ${couples[1]}` : `${couples[0]}, ${couples[1]} et ${couples[2]}`;
  const t = randomInt(1, 4);
  let text: string;
  if (t === 1) text = `${s.intro} : ${liste}. Est-ce une situation de proportionnalité ?`;
  else if (t === 2) text = `${s.intro} : ${couples.join(" ; ")}. ${s.qProp}`;
  else if (t === 3)
    text = `${cap(s.titre)} — tableau : ${s.labelA} : ${ns.join(" ; ")} — ${s.labelB} : ${ms.join(" ; ")}. Ce tableau est-il un tableau de proportionnalité ?`;
  else
    text = `${s.intro}. Relevés : ${couples.join(" ; ")}. Ces relevés traduisent-ils une situation de proportionnalité ?`;

  const calculs = ns.map((n, i) => rapportTexte(ms[i], n)).join(" ; ");
  return {
    text,
    format: "qcm" as const,
    choices: ["oui", "non"],
    expected: [prop ? "oui" : "non"],
    comparator: "mcq_exact" as const,
    explanation: expl(
      DEF_PROP,
      `on calcule le quotient ${minuscule(s.labelB)} ÷ ${minuscule(s.labelA)} pour chaque relevé.`,
      `${calculs}.`,
      prop
        ? `le quotient vaut toujours ${k} : la situation est proportionnelle.`
        : "les quotients ne sont pas tous égaux : la situation n’est pas proportionnelle.",
    ),
  };
}

/** Problèmes : produit en croix, retour à la grandeur A, différence, somme. */
function genProbleme(niveau: 3 | 4) {
  const s = randomChoice(SITUATIONS);
  const t = randomInt(1, 4);
  if (niveau === 3 || t <= 2) {
    const { k, n1, n2, m1, m2 } = tirerPaire(s, niveau === 3 ? (t % 2 ? 2 : 3) : 3);
    const inverse = niveau === 4 ? t === 2 : t === 4;
    let text: string;
    if (niveau === 3) {
      if (t === 1) text = `${cap(s.lien(n1, m1))}. ${s.demandeB(n2)}`;
      else if (t === 2) text = `${cap(s.lien2(n1, m1))}. ${s.demandeB(n2)}`;
      else if (t === 3) text = `Sachant ${que(s.lien2(n1, m1))}, calcule ${s.valeurB(n2)}.`;
      else text = `${cap(s.lien(n1, m1))}. ${s.demandeA(m2)}`;
    } else {
      text = t === 1 ? `Sachant ${que(s.lien(n1, m1))}, calcule ${s.valeurB(n2)}.` : `${cap(s.lien2(n1, m1))}. ${s.demandeA(m2)}`;
    }
    const rep = inverse ? n2 : m2;
    return {
      text,
      format: "short" as const,
      expected: attendu(rep),
      comparator: "number_equal" as const,
      explanation: expl(
        DEF_PROP,
        `${s.unite} vaut ${m1} ÷ ${n1} = ${k} ${s.uB}.`,
        inverse ? `${m2} ÷ ${k} = ${n2}.` : `${n2} × ${k} = ${m2} (produit en croix : ${m1} × ${n2} ÷ ${n1} = ${m2}).`,
        inverse ? `la réponse est ${n2} ${s.uA}.` : `${s.valeurB(n2)} est de ${m2} ${s.uB}.`,
      ),
    };
  }
  // niveau 4 : deux calculs enchaînés
  const k = randomChoice(s.k);
  const [lo, hi] = s.n;
  const n1 = randomInt(lo, hi);
  let n2: number;
  let n3: number;
  do {
    n2 = randomInt(lo, hi);
    n3 = randomInt(lo, hi);
  } while (n2 === n3 || n2 === n1 || n3 === n1);
  if (n2 > n3) [n2, n3] = [n3, n2];
  const m1 = n1 * k;
  const m2 = n2 * k;
  const m3 = n3 * k;
  if (t === 3) {
    return {
      text: `${cap(s.lien(n1, m1))}. Calcule la différence entre ${s.valeurB(n3)} et ${s.valeurB(n2)}.`,
      format: "short" as const,
      expected: attendu(m3 - m2),
      comparator: "number_equal" as const,
      explanation: expl(
        DEF_PROP,
        `${s.unite} vaut ${m1} ÷ ${n1} = ${k} ${s.uB}.`,
        `${n3} × ${k} = ${m3} et ${n2} × ${k} = ${m2}, donc ${m3} − ${m2} = ${m3 - m2}.`,
        `la différence est de ${m3 - m2} ${s.uB}.`,
      ),
    };
  }
  return {
    text: `${cap(s.lien2(n1, m1))}. Calcule ${s.valeurB(n2)}, puis ${s.valeurB(n3)}, et donne la somme des deux résultats.`,
    format: "short" as const,
    expected: attendu(m2 + m3),
    comparator: "number_equal" as const,
    explanation: expl(
      DEF_PROP,
      `${s.unite} vaut ${m1} ÷ ${n1} = ${k} ${s.uB}.`,
      `${n2} × ${k} = ${m2} et ${n3} × ${k} = ${m3}, donc ${m2} + ${m3} = ${m2 + m3}.`,
      `la somme est de ${m2 + m3} ${s.uB}.`,
    ),
  };
}

const ELEVES: Array<[string, "il" | "elle"]> = [
  ["Léo", "il"],
  ["Inès", "elle"],
  ["Sami", "il"],
  ["Chloé", "elle"],
  ["Noah", "il"],
  ["Maëlle", "elle"],
];

/** Défi : un élève affirme un résultat ; a-t-il raison ? */
function genAffirmation(niveau: 2 | 3) {
  const s = randomChoice(SITUATIONS);
  let { k, n1, n2, m1, m2 } = tirerPaire(s, niveau);
  if (n2 < n1) {
    [n1, n2] = [n2, n1];
    [m1, m2] = [m2, m1];
  }
  const [nom, pron] = randomChoice(ELEVES);
  const r = randomInt(1, 4);
  let valeur: number;
  let raison: string;
  if (r === 1) {
    valeur = m1 + (n2 - n1);
    raison = `on passe de ${n1} à ${n2} en ajoutant ${n2 - n1}, donc ${pron} ajoute aussi ${n2 - n1} à ${m1}`;
  } else if (r === 2) {
    valeur = m1 * n2;
    raison = `${pron} multiplie ${m1} par ${n2}`;
  } else if (r === 3) {
    valeur = m2;
    raison = `${pron} calcule d’abord ${s.unite}, puis multiplie par ${n2}`;
  } else {
    valeur = m2;
    raison = `${pron} fait un produit en croix : ${m1} × ${n2} ÷ ${n1}`;
  }
  const juste = valeur === m2;
  return {
    text: `${cap(s.lien(n1, m1))}. ${nom} affirme que ${s.valeurB(n2)} est de ${valeur} ${s.uB}, car ${raison}. ${pron === "il" ? "A-t-il" : "A-t-elle"} raison ?`,
    format: "qcm" as const,
    choices: ["oui", "non"],
    expected: [juste ? "oui" : "non"],
    comparator: "mcq_exact" as const,
    explanation: expl(
      DEF_PROP,
      r === 1
        ? `en proportionnalité, on multiplie, on n’ajoute pas : ${s.unite} vaut ${m1} ÷ ${n1} = ${k} ${s.uB}.`
        : r === 2
          ? `${m1} ${s.uB} correspondent à ${n1} ${s.uA}, pas à 1 : il faut d’abord diviser par ${n1}. ${cap(s.unite)} vaut ${m1} ÷ ${n1} = ${k} ${s.uB}.`
          : `on passe par l’unité : ${s.unite} vaut ${m1} ÷ ${n1} = ${k} ${s.uB}.`,
      `${n2} × ${k} = ${m2}.`,
      juste
        ? `${nom} a raison : ${s.valeurB(n2)} est bien de ${m2} ${s.uB}.`
        : `${nom} a tort : ${s.valeurB(n2)} est de ${m2} ${s.uB}, pas ${valeur} ${s.uB}.`,
    ),
  };
}

/** Défi : comparer deux situations par leur valeur pour une unité. */
function genComparer(niveau: 2 | 3) {
  const s = randomChoice(SITUATIONS);
  const kA = randomChoice(s.k);
  const pareil = Math.random() < 0.2;
  const kB = pareil ? kA : randomChoice(s.k.filter((x) => x !== kA));
  const [lo, hi] = s.n;
  const nA = randomInt(lo, hi);
  let nB: number;
  do {
    nB = niveau === 3 ? randomInt(lo, hi) : randomInt(lo, Math.min(hi, lo + 5));
  } while (nB === nA);
  const mA = nA * kA;
  const mB = nB * kB;
  const plusGrand = Math.random() < 0.5;
  const adj = s.uniteFem ? (plusGrand ? "la plus grande" : "la plus petite") : plusGrand ? "le plus grand" : "le plus petit";
  const correct = kA === kB
    ? "c’est pareil dans les deux"
    : (plusGrand ? kA > kB : kA < kB)
      ? "situation A"
      : "situation B";
  return {
    text: `Situation A : ${s.lien(nA, mA)}. Situation B : ${s.lien(nB, mB)}. Dans quelle situation ${s.unite} est-${s.uniteFem ? "elle" : "il"} ${adj} ?`,
    format: "qcm" as const,
    choices: ["situation A", "situation B", "c’est pareil dans les deux"],
    expected: [correct],
    comparator: "mcq_exact" as const,
    explanation: expl(
      "pour comparer deux situations, on ramène chacune à une unité (on calcule le coefficient de chacune).",
      `on divise la seconde grandeur par la première dans chaque situation.`,
      `situation A : ${mA} ÷ ${nA} = ${kA} ${s.uB} ; situation B : ${mB} ÷ ${nB} = ${kB} ${s.uB}.`,
      kA === kB ? "les deux valeurs sont égales : c’est pareil dans les deux." : `la réponse est : ${correct}.`,
    ),
  };
}

/* ---------- Pourcentages et évolutions ---------- */

type SituationEvol = {
  /** Phrase d'état (avec majuscule, sans point) : « Un village compte 1200 habitants ». */
  etat: (v: number) => string;
  /** Reprise : « sa population », « ce prix ». */
  ce: string;
  /** Groupe nominal autonome : « la population d’un village ». */
  nom: string;
  genre: "m" | "f";
  u: string;
  /** Valeurs de départ plausibles. Les résultats sont toujours ENTIERS (pas de 67,2 €). */
  valeurs: number[];
};

const EVOLUTIONS: SituationEvol[] = [
  { etat: (v) => `Le prix d’un vélo est de ${v} €`, ce: "ce prix", nom: "le prix d’un vélo", genre: "m", u: "€", valeurs: [200, 250, 300, 400, 500, 600] },
  { etat: (v) => `Le loyer d’un appartement est de ${v} € par mois`, ce: "ce loyer", nom: "le loyer d’un appartement", genre: "m", u: "€", valeurs: [400, 500, 600, 700, 800] },
  { etat: (v) => `Un village compte ${v} habitants`, ce: "sa population", nom: "la population d’un village", genre: "f", u: "habitants", valeurs: [800, 1000, 1200, 1500, 2000, 2500] },
  { etat: (v) => `Une chaîne de vulgarisation scientifique compte ${v} abonnés`, ce: "son nombre d’abonnés", nom: "le nombre d’abonnés d’une chaîne de sciences", genre: "m", u: "abonnés", valeurs: [1000, 2000, 4000, 5000, 6000] },
  { etat: (v) => `La facture d’électricité mensuelle d’une famille est de ${v} €`, ce: "cette facture", nom: "la facture d’électricité d’une famille", genre: "f", u: "€", valeurs: [60, 80, 100, 120, 150] },
  { etat: (v) => `Un billet d’avion entre Paris et La Réunion coûte ${v} €`, ce: "ce prix", nom: "le prix d’un billet d’avion entre Paris et La Réunion", genre: "m", u: "€", valeurs: [600, 700, 800, 900] },
  { etat: (v) => `Une ferme récolte ${v} kg de fraises par semaine`, ce: "cette récolte", nom: "la récolte de fraises d’une ferme", genre: "f", u: "kg", valeurs: [200, 300, 400, 500] },
  { etat: (v) => `Un musée accueille ${v} visiteurs par mois`, ce: "le nombre de visiteurs", nom: "le nombre de visiteurs d’un musée", genre: "m", u: "visiteurs", valeurs: [2000, 3000, 4000, 5000] },
  { etat: (v) => `Une console de jeux coûte ${v} €`, ce: "son prix", nom: "le prix d’une console de jeux", genre: "m", u: "€", valeurs: [300, 400, 500] },
  { etat: (v) => `Un cinéma accueille ${v} spectateurs par semaine`, ce: "sa fréquentation", nom: "la fréquentation d’un cinéma", genre: "f", u: "spectateurs", valeurs: [800, 1000, 1200, 1500, 2000] },
  { etat: (v) => `Un foyer consomme ${v} L d’eau par jour`, ce: "sa consommation", nom: "la consommation d’eau d’un foyer", genre: "f", u: "L", valeurs: [200, 300, 400, 500] },
  { etat: (v) => `Un apprenti gagne ${v} € par mois`, ce: "son salaire", nom: "le salaire d’un apprenti", genre: "m", u: "€", valeurs: [800, 900, 1000, 1200] },
  { etat: (v) => `Dans un parc, on a compté ${v} hérissons l’an dernier`, ce: "ce nombre", nom: "le nombre de hérissons d’un parc", genre: "m", u: "hérissons", valeurs: [40, 50, 60, 80, 100] },
  { etat: (v) => `Une forêt couvre ${v} hectares`, ce: "sa surface", nom: "la surface d’une forêt", genre: "f", u: "hectares", valeurs: [200, 500, 800, 1000, 1500] },
  { etat: (v) => `Un abonnement de musique en ligne coûte ${v} € par an`, ce: "ce tarif", nom: "le prix d’un abonnement de musique", genre: "m", u: "€", valeurs: [100, 120, 150, 200] },
  { etat: (v) => `Une usine recycle ${v} tonnes de plastique par an`, ce: "cette quantité", nom: "la quantité de plastique recyclée par une usine", genre: "f", u: "tonnes", valeurs: [200, 400, 500, 800, 1000] },
  { etat: (v) => `Une ligne de bus transporte ${v} passagers par jour`, ce: "ce nombre", nom: "le nombre de passagers d’une ligne de bus", genre: "m", u: "passagers", valeurs: [500, 800, 1000, 1200, 1500] },
];

/** Une valeur, un taux et un sens tels que le résultat « tombe juste ». */
function tirerEvolution(taux: number[]) {
  for (let essai = 0; essai < 200; essai++) {
    const s = randomChoice(EVOLUTIONS);
    const v = randomChoice(s.valeurs);
    const p = randomChoice(taux);
    const hausse = Math.random() < 0.5;
    const brut = v * (hausse ? 100 + p : 100 - p); // = 100 × résultat
    if (brut % 100 === 0) {
      return { s, v, p, hausse, res: brut / 100, c: (hausse ? 100 + p : 100 - p) / 100 };
    }
  }
  const s = EVOLUTIONS[0];
  return { s, v: 200, p: 10, hausse: true, res: 220, c: 1.1 };
}

const mots = (hausse: boolean) =>
  hausse
    ? { verbe: "augmente", nomEvol: "hausse", participe: "augmenté", taux: "d’augmentation" }
    : { verbe: "diminue", nomEvol: "baisse", participe: "diminué", taux: "de diminution" };

/** Nouvelle valeur après une évolution. */
function genNouvelleValeur(taux: number[]) {
  const { s, v, p, hausse, res, c } = tirerEvolution(taux);
  const w = mots(hausse);
  const t = randomInt(1, 3);
  let text: string;
  if (t === 1) text = `${s.etat(v)}. ${cap(s.ce)} ${w.verbe} de ${p} %. Que devient ${s.ce} ?`;
  else if (t === 2) text = `${s.etat(v)}. Calcule ce que devient ${s.ce} après une ${w.nomEvol} de ${p} %.`;
  else text = `${s.etat(v)}. On prévoit une ${w.nomEvol} de ${p} %. Que devient ${s.ce} ?`;
  return {
    text,
    format: "short" as const,
    expected: attendu(res),
    comparator: "number_equal" as const,
    explanation: expl(
      `une ${w.nomEvol} de p % revient à multiplier par ${hausse ? "1 + p ÷ 100" : "1 − p ÷ 100"}.`,
      `une ${w.nomEvol} de ${p} % revient à multiplier par ${fr(c)} (${w.nomEvol === "hausse" ? `100 % + ${p} %` : `100 % − ${p} %`} = ${hausse ? 100 + p : 100 - p} %).`,
      `${v} × ${fr(c)} = ${fr(res)}.`,
      `${s.ce} devient ${fr(res)} ${s.u}.`,
    ),
  };
}

/** Pourcentage d'évolution entre deux valeurs. */
function genTauxEvolution(taux: number[]) {
  const { s, v, p, hausse, res } = tirerEvolution(taux);
  const w = mots(hausse);
  const pron = s.genre === "m" ? "il" : "elle";
  const text =
    Math.random() < 0.5
      ? `${s.etat(v)}. Un an plus tard, ${s.ce} passe à ${fr(res)} ${s.u}. De quel pourcentage ${s.ce} a-t-${pron} ${w.participe} ?`
      : `${s.etat(v)}. Quelques mois plus tard, ${s.ce} passe à ${fr(res)} ${s.u}. Calcule le pourcentage ${w.taux}.`;
  const variation = Math.round(Math.abs(res - v) * 100) / 100;
  return {
    text,
    format: "short" as const,
    expected: [String(p)],
    comparator: "number_equal" as const,
    explanation: expl(
      "le pourcentage d’évolution est égal à (variation ÷ valeur de départ) × 100.",
      `variation = ${hausse ? `${fr(res)} − ${v}` : `${v} − ${fr(res)}`} = ${fr(variation)}.`,
      `(${fr(variation)} ÷ ${v}) × 100 = ${p}.`,
      `c’est une ${w.nomEvol} de ${p} %.`,
    ),
  };
}

/** Coefficient multiplicateur d'une évolution. mode : "short" ou "qcm". */
function genCoeffMult(mode: "short" | "qcm", sens: "hausse" | "baisse" | "mixte", taux: number[]) {
  const s = randomChoice(EVOLUTIONS);
  const p = randomChoice(taux);
  const hausse = sens === "mixte" ? Math.random() < 0.5 : sens === "hausse";
  const w = mots(hausse);
  const c = (hausse ? 100 + p : 100 - p) / 100;
  const t = randomInt(1, 3);
  let text: string;
  if (t === 1) text = `${cap(s.nom)} ${w.verbe} de ${p} %. Par quel nombre multiplie-t-on l’ancienne valeur pour obtenir la nouvelle ?`;
  else if (t === 2) text = `Une ${w.nomEvol} de ${p} % s’applique ${aArt(s.nom)}. Quel est le coefficient multiplicateur associé ?`;
  else text = `Pour calculer ${s.nom} après une ${w.nomEvol} de ${p} %, par quel nombre faut-il multiplier sa valeur de départ ?`;
  const explanation = expl(
    `${hausse ? "augmenter" : "diminuer"} de p %, c’est multiplier par ${hausse ? "1 + p ÷ 100" : "1 − p ÷ 100"}.`,
    hausse ? `on garde 100 % et on ajoute ${p} % : 100 % + ${p} % = ${100 + p} %.` : `il reste 100 % − ${p} % = ${100 - p} %.`,
    `${hausse ? 100 + p : 100 - p} % = ${hausse ? 100 + p : 100 - p} ÷ 100 = ${fr(c)}.`,
    `le coefficient multiplicateur est ${fr(c)}.`,
  );
  if (mode === "qcm") {
    const correct = fr(c);
    return {
      text,
      format: "qcm" as const,
      choices: makeChoices(correct, [
        fr(p / 100),
        String(p),
        fr((hausse ? 100 - p : 100 + p) / 100),
        fr((hausse ? 1000 + p : 1000 - p) / 1000),
      ]),
      expected: [correct],
      comparator: "mcq_exact" as const,
      explanation,
    };
  }
  return {
    text,
    format: "short" as const,
    expected: attendu(c),
    comparator: "number_equal" as const,
    explanation,
  };
}

/** Du coefficient multiplicateur au pourcentage d'évolution. */
function genCoeffVersTaux(taux: number[]) {
  const s = randomChoice(EVOLUTIONS);
  const p = randomChoice(taux);
  const hausse = Math.random() < 0.5;
  const w = mots(hausse);
  const c = (hausse ? 100 + p : 100 - p) / 100;
  const multiplie = s.genre === "m" ? "multiplié" : "multipliée";
  const text =
    Math.random() < 0.5
      ? `${cap(s.nom)} est ${multiplie} par ${fr(c)}. De combien de pour cent cette valeur ${w.verbe}-t-elle ?`
      : `On multiplie ${s.nom} par ${fr(c)}. Quel pourcentage ${w.taux} cela représente-t-il ?`;
  return {
    text,
    format: "short" as const,
    expected: [String(p)],
    comparator: "number_equal" as const,
    explanation: expl(
      "multiplier par 1 + p ÷ 100, c’est augmenter de p % ; multiplier par 1 − p ÷ 100, c’est diminuer de p %.",
      `${fr(c)} = ${hausse ? 100 + p : 100 - p} ÷ 100, soit ${hausse ? 100 + p : 100 - p} % de la valeur de départ.`,
      hausse ? `${100 + p} % − 100 % = ${p} %.` : `100 % − ${100 - p} % = ${p} %.`,
      `c’est une ${w.nomEvol} de ${p} %.`,
    ),
  };
}

/** Appliquer un coefficient multiplicateur. */
function genAppliquerCoeff(taux: number[]) {
  const { s, v, p, hausse, res, c } = tirerEvolution(taux);
  const w = mots(hausse);
  const text =
    Math.random() < 0.5
      ? `${s.etat(v)}. ${cap(s.ce)} ${w.verbe} de ${p} %. En utilisant le coefficient multiplicateur, calcule la nouvelle valeur.`
      : `${s.etat(v)}. Multiplie par le bon coefficient pour trouver ${s.ce} après une ${w.nomEvol} de ${p} %.`;
  return {
    text,
    format: "short" as const,
    expected: attendu(res),
    comparator: "number_equal" as const,
    explanation: expl(
      `une ${w.nomEvol} de p % revient à multiplier par ${hausse ? "1 + p ÷ 100" : "1 − p ÷ 100"}.`,
      `coefficient multiplicateur = ${fr(c)}.`,
      `${v} × ${fr(c)} = ${fr(res)}.`,
      `${s.ce} devient ${fr(res)} ${s.u}.`,
    ),
  };
}

/** Deux évolutions successives. memeTaux : +p puis −p (ou l'inverse). */
function genSuccessives(memeTaux: boolean) {
  const taux = [10, 20, 25, 30, 50];
  for (let essai = 0; essai < 300; essai++) {
    const s = randomChoice(EVOLUTIONS);
    const v = randomChoice(s.valeurs);
    const a = randomChoice(taux);
    const b = memeTaux ? a : randomChoice(taux);
    const hausseDabord = Math.random() < 0.6;
    const c1 = hausseDabord ? 100 + a : 100 - a;
    const c2 = hausseDabord ? 100 - b : 100 + b;
    const brut = v * c1 * c2; // = 10 000 × résultat
    const inter = v * c1; // = 100 × valeur intermédiaire
    if (brut % 10000 !== 0 || inter % 100 !== 0) continue;
    const res = brut / 10000;
    const mid = inter / 100;
    const w1 = mots(hausseDabord);
    const w2 = mots(!hausseDabord);
    const text =
      Math.random() < 0.5
        ? `${s.etat(v)}. ${cap(s.ce)} ${w1.verbe} de ${a} %, puis ${w2.verbe} de ${b} %. Quelle est la valeur finale ?`
        : `${s.etat(v)}. Après une ${w1.nomEvol} de ${a} % suivie d’une ${w2.nomEvol} de ${b} %, calcule la valeur finale ${deArt(s.ce)}.`;
    return {
      text,
      format: "short" as const,
      expected: attendu(res),
      comparator: "number_equal" as const,
      explanation: expl(
        "des évolutions successives se traduisent par des coefficients multiplicateurs qui se multiplient ; les pourcentages ne s’ajoutent pas.",
        `${w1.nomEvol} de ${a} % : × ${fr(c1 / 100)} ; ${w2.nomEvol} de ${b} % : × ${fr(c2 / 100)}.`,
        `${v} × ${fr(c1 / 100)} = ${fr(mid)}, puis ${fr(mid)} × ${fr(c2 / 100)} = ${fr(res)}.`,
        `la valeur finale est ${fr(res)} ${s.u}${memeTaux ? ` : on ne retrouve pas ${v} ${s.u}, car la ${w2.nomEvol} s’applique à ${fr(mid)} et non à ${v}` : ""}.`,
      ),
    };
  }
  return genNouvelleValeur([10, 20]);
}

/** Pourcentage d'une quantité : situation « partie d'un tout ». */
type SituationPct = {
  cadre: (N: number) => string;
  part: (p: number) => string;
  partNb: (x: number) => string;
  qPart: string;
  nomPart: string;
  qPct: string;
  totalInconnu: (x: number, p: number) => string;
  qTotal: string;
  desTotal: string;
  u: string;
  N: number[];
};

const POURCENTAGES: SituationPct[] = [
  {
    cadre: (N) => `Un collège compte ${N} élèves.`,
    part: (p) => `${p} % d’entre eux viennent à vélo.`,
    partNb: (x) => `${x} d’entre eux viennent à vélo.`,
    qPart: "Combien d’élèves viennent à vélo ?",
    nomPart: "le nombre d’élèves qui viennent à vélo",
    qPct: "Quel pourcentage des élèves vient à vélo ?",
    totalInconnu: (x, p) => `Dans un collège, ${x} élèves viennent à vélo, ce qui représente ${p} % des élèves.`,
    qTotal: "Combien d’élèves compte ce collège ?",
    desTotal: "des élèves",
    u: "élèves",
    N: [200, 300, 400, 500, 600, 800],
  },
  {
    cadre: (N) => `Un sac de mélange pour oiseaux pèse ${N} g.`,
    part: (p) => `${p} % de sa masse est formée de graines de tournesol.`,
    partNb: (x) => `Il contient ${x} g de graines de tournesol.`,
    qPart: "Quelle masse de graines de tournesol contient-il ?",
    nomPart: "la masse de graines de tournesol",
    qPct: "Quel pourcentage de la masse du sac représentent les graines de tournesol ?",
    totalInconnu: (x, p) => `Un sac de mélange pour oiseaux contient ${x} g de graines de tournesol, soit ${p} % de sa masse.`,
    qTotal: "Quelle est la masse du sac, en g ?",
    desTotal: "de la masse du sac",
    u: "g",
    N: [500, 800, 1000, 1200, 2000],
  },
  {
    cadre: (N) => `Une facture s’élève à ${N} €.`,
    part: (p) => `Les taxes représentent ${p} % de ce montant.`,
    partNb: (x) => `Les taxes représentent ${x} € de ce montant.`,
    qPart: "Quel est le montant des taxes ?",
    nomPart: "le montant des taxes",
    qPct: "Quel pourcentage du montant représentent les taxes ?",
    totalInconnu: (x, p) => `Sur une facture, les taxes s’élèvent à ${x} €, soit ${p} % du montant total.`,
    qTotal: "Quel est le montant total de la facture ?",
    desTotal: "du montant",
    u: "€",
    N: [40, 60, 80, 120, 200, 400],
  },
  {
    cadre: (N) => `Un jardin partagé a une surface de ${N} m².`,
    part: (p) => `Des légumes sont plantés sur ${p} % de cette surface.`,
    partNb: (x) => `Des légumes sont plantés sur ${x} m² de cette surface.`,
    qPart: "Quelle surface est plantée de légumes ?",
    nomPart: "la surface plantée de légumes",
    qPct: "Quel pourcentage de la surface est planté de légumes ?",
    totalInconnu: (x, p) => `Dans un jardin partagé, ${x} m² sont plantés de légumes, soit ${p} % de la surface totale.`,
    qTotal: "Quelle est la surface totale du jardin, en m² ?",
    desTotal: "de la surface",
    u: "m²",
    N: [100, 200, 300, 400, 500],
  },
  {
    cadre: (N) => `Une chorale compte ${N} choristes.`,
    part: (p) => `${p} % d’entre eux sont des ténors.`,
    partNb: (x) => `${x} d’entre eux sont des ténors.`,
    qPart: "Combien y a-t-il de ténors ?",
    nomPart: "le nombre de ténors",
    qPct: "Quel pourcentage des choristes sont des ténors ?",
    totalInconnu: (x, p) => `Une chorale compte ${x} ténors, ce qui représente ${p} % des choristes.`,
    qTotal: "Combien de choristes compte cette chorale ?",
    desTotal: "des choristes",
    u: "ténors",
    N: [20, 40, 60, 80, 100],
  },
  {
    cadre: (N) => `Pendant la saison, une basketteuse a tenté ${N} tirs.`,
    part: (p) => `Elle en a réussi ${p} %.`,
    partNb: (x) => `Elle en a réussi ${x}.`,
    qPart: "Combien de tirs a-t-elle réussis ?",
    nomPart: "le nombre de tirs réussis",
    qPct: "Quel est son pourcentage de réussite ?",
    totalInconnu: (x, p) => `Une basketteuse a réussi ${x} tirs, soit ${p} % de ses tentatives.`,
    qTotal: "Combien de tirs a-t-elle tentés ?",
    desTotal: "des tirs",
    u: "tirs",
    N: [40, 80, 100, 120, 200],
  },
  {
    cadre: (N) => `Une bouteille de boisson contient ${N} mL.`,
    part: (p) => `Le jus de fruits représente ${p} % de son volume.`,
    partNb: (x) => `Elle contient ${x} mL de jus de fruits.`,
    qPart: "Quel volume de jus de fruits contient-elle ?",
    nomPart: "le volume de jus de fruits",
    qPct: "Quel pourcentage du volume représente le jus de fruits ?",
    totalInconnu: (x, p) => `Une bouteille de boisson contient ${x} mL de jus de fruits, soit ${p} % de son volume.`,
    qTotal: "Quel est le volume de la bouteille, en mL ?",
    desTotal: "du volume",
    u: "mL",
    N: [200, 250, 500, 1000, 1500],
  },
  {
    cadre: (N) => `Une forêt compte ${N} arbres.`,
    part: (p) => `${p} % de ces arbres sont des pins.`,
    partNb: (x) => `${x} de ces arbres sont des pins.`,
    qPart: "Combien y a-t-il de pins ?",
    nomPart: "le nombre de pins",
    qPct: "Quel pourcentage des arbres sont des pins ?",
    totalInconnu: (x, p) => `Dans une forêt, on a compté ${x} pins, soit ${p} % des arbres.`,
    qTotal: "Combien d’arbres compte cette forêt ?",
    desTotal: "des arbres",
    u: "pins",
    N: [400, 600, 800, 1000, 2000],
  },
  {
    cadre: (N) => `La playlist de Yanis contient ${N} morceaux.`,
    part: (p) => `${p} % de ces morceaux sont du jazz.`,
    partNb: (x) => `${x} de ces morceaux sont du jazz.`,
    qPart: "Combien de morceaux de jazz contient-elle ?",
    nomPart: "le nombre de morceaux de jazz",
    qPct: "Quel pourcentage des morceaux sont du jazz ?",
    totalInconnu: (x, p) => `La playlist de Yanis contient ${x} morceaux de jazz, soit ${p} % de ses morceaux.`,
    qTotal: "Combien de morceaux contient la playlist ?",
    desTotal: "des morceaux",
    u: "morceaux",
    N: [40, 60, 80, 100, 120, 200],
  },
  {
    cadre: (N) => `Une enquête interroge ${N} habitants d’une commune.`,
    part: (p) => `${p} % d’entre eux trient leurs déchets.`,
    partNb: (x) => `${x} d’entre eux trient leurs déchets.`,
    qPart: "Combien de personnes interrogées trient leurs déchets ?",
    nomPart: "le nombre de personnes interrogées qui trient leurs déchets",
    qPct: "Quel pourcentage des personnes interrogées trient leurs déchets ?",
    totalInconnu: (x, p) => `Dans une enquête, ${x} habitants déclarent trier leurs déchets, soit ${p} % des personnes interrogées.`,
    qTotal: "Combien de personnes ont été interrogées ?",
    desTotal: "des personnes interrogées",
    u: "personnes",
    N: [200, 400, 500, 800, 1000],
  },
  {
    cadre: (N) => `Un maraîcher récolte ${N} kg de tomates.`,
    part: (p) => `${p} % de la récolte est abîmée.`,
    partNb: (x) => `${x} kg de la récolte sont abîmés.`,
    qPart: "Quelle masse de tomates est abîmée ?",
    nomPart: "la masse de tomates abîmées",
    qPct: "Quel pourcentage de la récolte est abîmé ?",
    totalInconnu: (x, p) => `Un maraîcher jette ${x} kg de tomates abîmées, soit ${p} % de sa récolte.`,
    qTotal: "Quelle est la masse de sa récolte, en kg ?",
    desTotal: "de la récolte",
    u: "kg",
    N: [200, 300, 400, 500, 800],
  },
  {
    cadre: (N) => `Le réservoir d’une moto contient ${N} L quand il est plein.`,
    part: (p) => `Il est rempli à ${p} %.`,
    partNb: (x) => `Il contient ${x} L d’essence.`,
    qPart: "Combien de litres d’essence contient-il ?",
    nomPart: "le volume d’essence dans le réservoir",
    qPct: "À quel pourcentage le réservoir est-il rempli ?",
    totalInconnu: (x, p) => `Le réservoir d’une moto contient ${x} L d’essence ; il est rempli à ${p} %.`,
    qTotal: "Quelle est la contenance du réservoir, en L ?",
    desTotal: "du réservoir",
    u: "L",
    N: [12, 16, 20, 24],
  },
  {
    cadre: (N) => `Un voyage scolaire coûte ${N} € par élève.`,
    part: (p) => `Les familles versent un acompte de ${p} % à l’inscription.`,
    partNb: (x) => `Les familles versent un acompte de ${x} € à l’inscription.`,
    qPart: "Quel est le montant de l’acompte ?",
    nomPart: "le montant de l’acompte",
    qPct: "Quel pourcentage du prix représente l’acompte ?",
    totalInconnu: (x, p) => `Pour un voyage scolaire, l’acompte versé est de ${x} €, soit ${p} % du prix.`,
    qTotal: "Quel est le prix du voyage ?",
    desTotal: "du prix",
    u: "€",
    N: [200, 300, 400, 500],
  },
  {
    cadre: (N) => `Un téléphone a une mémoire de ${N} Go.`,
    part: (p) => `Les photos occupent ${p} % de cette mémoire.`,
    partNb: (x) => `Les photos occupent ${x} Go de cette mémoire.`,
    qPart: "Quelle place, en Go, occupent les photos ?",
    nomPart: "la place occupée par les photos",
    qPct: "Quel pourcentage de la mémoire occupent les photos ?",
    totalInconnu: (x, p) => `Sur un téléphone, les photos occupent ${x} Go, soit ${p} % de la mémoire.`,
    qTotal: "Quelle est la mémoire totale du téléphone, en Go ?",
    desTotal: "de la mémoire",
    u: "Go",
    N: [64, 128, 256],
  },
  {
    cadre: (N) => `Lors d’un nettoyage de plage à Saint-Gilles, ${N} déchets ont été ramassés.`,
    part: (p) => `${p} % de ces déchets sont en plastique.`,
    partNb: (x) => `${x} de ces déchets sont en plastique.`,
    qPart: "Combien de déchets en plastique ont été ramassés ?",
    nomPart: "le nombre de déchets en plastique",
    qPct: "Quel pourcentage des déchets sont en plastique ?",
    totalInconnu: (x, p) => `Lors d’un nettoyage de plage à Saint-Gilles, ${x} déchets en plastique ont été ramassés, soit ${p} % des déchets.`,
    qTotal: "Combien de déchets ont été ramassés en tout ?",
    desTotal: "des déchets",
    u: "déchets",
    N: [200, 300, 400, 500, 600],
  },
  {
    cadre: (N) => `Le CDI possède ${N} livres.`,
    part: (p) => `${p} % de ces livres sont des bandes dessinées.`,
    partNb: (x) => `${x} de ces livres sont des bandes dessinées.`,
    qPart: "Combien de bandes dessinées possède le CDI ?",
    nomPart: "le nombre de bandes dessinées",
    qPct: "Quel pourcentage des livres sont des bandes dessinées ?",
    totalInconnu: (x, p) => `Le CDI possède ${x} bandes dessinées, soit ${p} % de ses livres.`,
    qTotal: "Combien de livres possède le CDI ?",
    desTotal: "des livres",
    u: "bandes dessinées",
    N: [400, 600, 800, 1000, 1200],
  },
  {
    cadre: (N) => `Un sentier de randonnée mesure ${N} km.`,
    part: (p) => `${p} % du parcours est en forêt.`,
    partNb: (x) => `${x} km du parcours sont en forêt.`,
    qPart: "Combien de kilomètres du parcours sont en forêt ?",
    nomPart: "la longueur du parcours en forêt",
    qPct: "Quel pourcentage du parcours est en forêt ?",
    totalInconnu: (x, p) => `Sur un sentier de randonnée, ${x} km sont en forêt, soit ${p} % du parcours.`,
    qTotal: "Quelle est la longueur du sentier, en km ?",
    desTotal: "du parcours",
    u: "km",
    N: [10, 12, 16, 20, 24, 40],
  },
  {
    cadre: (N) => `Un club de football compte ${N} licenciés.`,
    part: (p) => `${p} % des licenciés sont des filles.`,
    partNb: (x) => `${x} des licenciés sont des filles.`,
    qPart: "Combien de filles compte le club ?",
    nomPart: "le nombre de filles licenciées",
    qPct: "Quel pourcentage des licenciés sont des filles ?",
    totalInconnu: (x, p) => `Un club de football compte ${x} filles, soit ${p} % de ses licenciés.`,
    qTotal: "Combien de licenciés compte le club ?",
    desTotal: "des licenciés",
    u: "filles",
    N: [80, 100, 120, 150, 200, 300],
  },
];

const FRACTIONS_POURCENT: Record<number, string> = { 5: "1/20", 10: "1/10", 20: "1/5", 25: "1/4", 50: "1/2", 75: "3/4" };

function tirerPourcentage(taux: number[]) {
  for (let essai = 0; essai < 300; essai++) {
    const s = randomChoice(POURCENTAGES);
    const N = randomChoice(s.N);
    const p = randomChoice(taux);
    if ((N * p) % 100 === 0) return { s, N, p, x: (N * p) / 100 };
  }
  return { s: POURCENTAGES[0], N: 400, p: 25, x: 100 };
}

/**
 * Pourcentages. types : "partie" (p % de N), "aide" (avec la fraction),
 * "taux" (quel pourcentage ?), "total" (retrouver le tout), "fraction" (QCM).
 */
function genPourcentage(types: Array<"partie" | "aide" | "taux" | "total" | "fraction">, taux: number[]) {
  const type = randomChoice(types);
  const tauxUtiles = type === "aide" || type === "fraction" ? taux.filter((p) => FRACTIONS_POURCENT[p]) : taux;
  const { s, N, p, x } = tirerPourcentage(tauxUtiles.length ? tauxUtiles : [10, 25, 50]);
  const defPct = "un pourcentage est une proportion rapportée à 100 : p % d’une quantité N, c’est N × p ÷ 100.";
  if (type === "fraction") {
    const correct = FRACTIONS_POURCENT[p];
    const autres = Object.values(FRACTIONS_POURCENT).filter((f) => f !== correct);
    return {
      text: `${s.cadre(N)} ${s.part(p)} Quelle fraction ${s.desTotal} cela représente-t-il ?`,
      format: "qcm" as const,
      choices: makeChoices(correct, [`1/${p}`, ...shuffle(autres).slice(0, 3)]),
      expected: [correct],
      comparator: "mcq_exact" as const,
      explanation: expl(defPct, `${p} % = ${p}/100, que l’on simplifie.`, `${p}/100 = ${correct}.`, `${p} % ${s.desTotal}, c’est ${correct} ${s.desTotal}.`),
    };
  }
  if (type === "taux") {
    const text = Math.random() < 0.5 ? `${s.cadre(N)} ${s.partNb(x)} ${s.qPct}` : `${s.cadre(N)} ${s.partNb(x)} Exprime cette part en pourcentage.`;
    return {
      text,
      format: "short" as const,
      expected: [String(p)],
      comparator: "number_equal" as const,
      explanation: expl(defPct, "pourcentage = partie ÷ total × 100.", `${x} ÷ ${N} × 100 = ${p}.`, `cela représente ${p} %.`),
    };
  }
  if (type === "total") {
    return {
      text: `${s.totalInconnu(x, p)} ${s.qTotal}`,
      format: "short" as const,
      expected: [String(N)],
      comparator: "number_equal" as const,
      explanation: expl(
        defPct,
        `${p} % du total valent ${x} : on passe par 1 % (ou par la proportionnalité).`,
        `1 % du total vaut ${x} ÷ ${p} = ${fr(x / p)}, donc 100 % valent ${fr(x / p)} × 100 = ${N}.`,
        `le total est ${N}.`,
      ),
    };
  }
  let text: string;
  if (type === "aide") text = `${s.cadre(N)} ${s.part(p)} Sachant que ${p} % = ${FRACTIONS_POURCENT[p]}, calcule ${s.nomPart}.`;
  else text = Math.random() < 0.5 ? `${s.cadre(N)} ${s.part(p)} ${s.qPart}` : `${s.cadre(N)} ${s.part(p)} Calcule ${s.nomPart}.`;
  return {
    text,
    format: "short" as const,
    expected: [String(x)],
    comparator: "number_equal" as const,
    explanation: expl(defPct, `${p} % de ${N} = ${N} × ${p} ÷ 100.`, `${N} × ${p} ÷ 100 = ${x}.`, `la réponse est ${x} ${s.u}.`),
  };
}

/* ---------- Calcul mental : 10 %, 20 %, 30 %, 5 %, 100 %, 200 % ----------
 * ⭐ 02/10/2026, demandé par Frédéric avec la scission de la notion. Six
 * pourcentages qui se calculent DE TÊTE, tous à partir de 10 % : diviser par
 * 10, puis doubler (20 %), tripler (30 %), prendre la moitié (5 %) ; 100 %,
 * c'est la quantité entière, 200 %, son double. L'explication donne TOUJOURS
 * ce chemin, jamais « N × p ÷ 100 » : c'est le geste mental qu'on enseigne.
 * Les situations « partie d'un tout » reprennent POURCENTAGES (on n'y met ni
 * 100 % ni 200 % : « 200 % des élèves viennent à vélo » n'a pas de sens) ;
 * celles de COMPARAISON (« cette année vaut 200 % de l'an dernier ») acceptent
 * les six. */

type MentalP = 5 | 10 | 20 | 30 | 100 | 200;

/** Le chemin mental, en une phrase, et le calcul qui va avec. */
function cheminMental(p: number, N: number): { methode: string; calcul: string } {
  const d = N / 10;
  switch (p) {
    case 10:
      return { methode: "10 %, c’est un dixième : on divise par 10.", calcul: `${N} ÷ 10 = ${fr(d)}.` };
    case 20:
      return { methode: "20 %, c’est le double de 10 %.", calcul: `10 % de ${N} = ${fr(d)}, donc 20 % = 2 × ${fr(d)} = ${fr(2 * d)}.` };
    case 30:
      return { methode: "30 %, c’est le triple de 10 %.", calcul: `10 % de ${N} = ${fr(d)}, donc 30 % = 3 × ${fr(d)} = ${fr(3 * d)}.` };
    case 5:
      return { methode: "5 %, c’est la moitié de 10 %.", calcul: `10 % de ${N} = ${fr(d)}, donc 5 % = ${fr(d)} ÷ 2 = ${fr(d / 2)}.` };
    case 100:
      return { methode: "100 %, c’est la quantité tout entière : on ne change rien.", calcul: `100 % de ${N} = ${N}.` };
    default:
      return { methode: "200 %, c’est deux fois la quantité : on la double.", calcul: `200 % de ${N} = 2 × ${N} = ${2 * N}.` };
  }
}

const DEF_MENTAL = "p % d’une quantité, c’est p parts sur 100 de cette quantité ; 10 % en est le dixième.";

/** Des comparaisons « ceci vaut p % de cela » : elles acceptent 100 % et 200 %. */
type SituationComparaison = {
  avant: (N: number) => string;
  apres: (p: number) => string;
  q: string;
  nom: string;
  u: string;
  N: number[];
};

const COMPARAISONS: SituationComparaison[] = [
  { avant: (N) => `L’an dernier, un club de judo comptait ${N} adhérents.`, apres: (p) => `Cette année, le nombre d’adhérents représente ${p} % de celui de l’an dernier.`, q: "Combien d’adhérents le club compte-t-il cette année ?", nom: "le nombre d’adhérents de cette année", u: "adhérents", N: [40, 60, 80, 120, 140, 160, 200] },
  { avant: (N) => `Au printemps, un plant de tomate mesurait ${N} cm.`, apres: (p) => `En été, sa hauteur atteint ${p} % de sa hauteur du printemps.`, q: "Combien mesure-t-il en été, en cm ?", nom: "sa hauteur en été", u: "cm", N: [40, 60, 80, 100, 120] },
  { avant: (N) => `En semaine, un plombier facture une intervention ${N} €.`, apres: (p) => `Le dimanche, il facture ${p} % de ce tarif.`, q: "Combien coûte une intervention le dimanche, en € ?", nom: "le tarif du dimanche", u: "€", N: [60, 80, 120, 140, 160, 180] },
  { avant: (N) => `Mardi, Malik a parcouru ${N} km à vélo.`, apres: (p) => `Samedi, il parcourt ${p} % de cette distance.`, q: "Combien de kilomètres parcourt-il samedi ?", nom: "la distance du samedi", u: "km", N: [20, 40, 60, 80] },
  { avant: (N) => `Une vidéo de vulgarisation a fait ${N} vues le premier jour.`, apres: (p) => `Le deuxième jour, son nombre de vues atteint ${p} % de celui du premier jour.`, q: "Combien de vues a-t-elle faites le deuxième jour ?", nom: "le nombre de vues du deuxième jour", u: "vues", N: [200, 400, 600, 800, 1000, 1200] },
  { avant: (N) => `L’an dernier, un verger a produit ${N} kg de pommes.`, apres: (p) => `Cette année, la récolte vaut ${p} % de celle de l’an dernier.`, q: "Combien de kilogrammes de pommes a-t-il produits cette année ?", nom: "la récolte de cette année", u: "kg", N: [200, 300, 400, 600, 800] },
  { avant: (N) => `En janvier, Chloé a économisé ${N} €.`, apres: (p) => `En février, elle économise ${p} % de la somme de janvier.`, q: "Combien économise-t-elle en février ?", nom: "la somme économisée en février", u: "€", N: [20, 40, 60, 80, 100, 120] },
  { avant: (N) => `Il y a dix ans, un marais abritait ${N} hérons.`, apres: (p) => `Aujourd’hui, leur nombre représente ${p} % de celui d’il y a dix ans.`, q: "Combien de hérons le marais abrite-t-il aujourd’hui ?", nom: "le nombre de hérons aujourd’hui", u: "hérons", N: [40, 60, 80, 120, 200] },
  { avant: (N) => `Avec un tuyau d’arrosage, on remplit une piscine de ${N} L en une heure.`, apres: (p) => `Avec une pompe, on remplit en une heure ${p} % de cette quantité.`, q: "Combien de litres la pompe remplit-elle en une heure ?", nom: "le volume rempli par la pompe", u: "L", N: [400, 600, 800, 1000, 1200] },
  { avant: (N) => `En janvier, une chaîne de cuisine comptait ${N} abonnés.`, apres: (p) => `En juin, son nombre d’abonnés vaut ${p} % de celui de janvier.`, q: "Combien a-t-elle d’abonnés en juin ?", nom: "le nombre d’abonnés en juin", u: "abonnés", N: [200, 400, 600, 1000, 2000] },
  { avant: (N) => `Il y a vingt ans, un tableau a été acheté ${N} €.`, apres: (p) => `Aujourd’hui, il vaut ${p} % de son prix d’achat.`, q: "Combien vaut-il aujourd’hui, en € ?", nom: "sa valeur aujourd’hui", u: "€", N: [200, 400, 600, 800, 1000] },
  { avant: (N) => `L’an dernier, une cantine a servi ${N} repas végétariens par mois.`, apres: (p) => `Cette année, elle en sert ${p} % de ce nombre.`, q: "Combien de repas végétariens sert-elle par mois cette année ?", nom: "le nombre de repas végétariens de cette année", u: "repas", N: [120, 160, 200, 240, 300] },
  { avant: (N) => `Lundi, une boulangerie a vendu ${N} baguettes.`, apres: (p) => `Dimanche, elle en vend ${p} % du nombre de lundi.`, q: "Combien de baguettes vend-elle dimanche ?", nom: "le nombre de baguettes vendues dimanche", u: "baguettes", N: [100, 140, 160, 200, 240] },
  { avant: (N) => `En 2015, une commune comptait ${N} panneaux solaires sur ses toits.`, apres: (p) => `Aujourd’hui, leur nombre atteint ${p} % de celui de 2015.`, q: "Combien de panneaux solaires compte-t-elle aujourd’hui ?", nom: "le nombre de panneaux aujourd’hui", u: "panneaux", N: [40, 80, 120, 160, 200] },
];

function tirerComparaison(taux: number[]) {
  for (let essai = 0; essai < 300; essai++) {
    const s = randomChoice(COMPARAISONS);
    const N = randomChoice(s.N);
    const p = randomChoice(taux);
    if ((N * p) % 100 === 0) return { s, N, p, x: (N * p) / 100 };
  }
  return { s: COMPARAISONS[0], N: 80, p: 200, x: 160 };
}

/** p % de N, de tête : sans contexte, dans une partie d'un tout, ou dans une comparaison. */
function genMental(taux: MentalP[], sources: Array<"nu" | "partie" | "comparaison">) {
  const source = randomChoice(sources);
  const tauxPartie = taux.filter((p) => p <= 30);
  let text: string;
  let x: number;
  let N: number;
  let p: number;
  let conclusion: string;
  if (source === "partie" && tauxPartie.length) {
    const t = tirerPourcentage(tauxPartie);
    ({ N, p, x } = t);
    const s = t.s;
    const k = randomInt(0, 5);
    if (k === 0) text = `${s.cadre(N)} ${s.part(p)} ${s.qPart} Calcule-le de tête.`;
    else if (k === 1) text = `Sans calculatrice : ${minuscule(s.cadre(N))} ${s.part(p)} ${s.qPart}`;
    else if (k === 2) text = `${s.cadre(N)} ${s.part(p)} Trouve de tête ${s.nomPart}.`;
    else if (k === 3) text = `${s.cadre(N)} ${s.part(p)} En partant de 10 %, calcule mentalement ${s.nomPart}.`;
    else if (k === 4) text = `Calcul mental. ${s.cadre(N)} ${s.part(p)} ${s.qPart}`;
    else text = `De tête, calcule ${s.nomPart} : ${minuscule(s.cadre(N))} ${s.part(p)}`;
    conclusion = `${s.nomPart} : ${fr(x)} ${s.u}.`;
  } else if (source === "comparaison" || source === "partie") {
    const t = tirerComparaison(taux);
    ({ N, p, x } = t);
    const s = t.s;
    const k = randomInt(0, 4);
    if (k === 0) text = `${s.avant(N)} ${s.apres(p)} ${s.q}`;
    else if (k === 1) text = `${s.avant(N)} ${s.apres(p)} Calcule de tête ${s.nom}.`;
    else if (k === 2) text = `De tête : ${minuscule(s.avant(N))} ${s.apres(p)} ${s.q}`;
    else if (k === 3) text = `${s.avant(N)} ${s.apres(p)} Sans poser d’opération, trouve ${s.nom}.`;
    else text = `Calcul mental. ${s.avant(N)} ${s.apres(p)} ${s.q}`;
    conclusion = `${s.nom} : ${fr(x)} ${s.u}.`;
  } else {
    p = randomChoice(taux);
    N = randomChoice(p === 5 ? [20, 40, 60, 80, 120, 140, 160, 180, 240, 300] : [30, 40, 50, 60, 70, 80, 90, 120, 150, 250, 300, 450]);
    x = (N * p) / 100;
    const k = randomInt(0, 5);
    if (k === 0) text = `Calcule de tête ${p} % de ${N}.`;
    else if (k === 1) text = `Combien vaut ${p} % de ${N} ? Réponds sans poser d’opération.`;
    else if (k === 2) text = `Sans calculatrice, donne ${p} % de ${N}.`;
    else if (k === 3) text = `Complète de tête : ${p} % de ${N} = …`;
    else if (k === 4) text = `Trouve mentalement ${p} % de ${N}.`;
    else text = `Quel nombre représente ${p} % de ${N} ? Calcule-le de tête.`;
    conclusion = `${p} % de ${N} = ${fr(x)}.`;
  }
  const c = cheminMental(p, N);
  return {
    text,
    format: "short" as const,
    expected: attendu(x),
    comparator: "number_equal" as const,
    explanation: expl(DEF_MENTAL, c.methode, c.calcul, conclusion),
  };
}

/** On connaît 10 % (ou 5 %) du tout ; on en déduit de tête un autre pourcentage. */
function genMentalDeduire() {
  for (let essai = 0; essai < 300; essai++) {
    const s = randomChoice(POURCENTAGES);
    const N = randomChoice(s.N);
    const connu = Math.random() < 0.7 ? 10 : 5;
    const cible = connu === 10 ? randomChoice([20, 30, 5, 100]) : randomChoice([10, 20, 100]);
    if ((N * connu) % 100 !== 0 || (N * cible) % 100 !== 0) continue;
    const xc = (N * connu) / 100;
    const xq = (N * cible) / 100;
    const k = randomInt(0, 3);
    const question =
      cible === 100 && k === 0
        ? s.qTotal
        : k === 1
          ? `Sans calculatrice, trouve ${cible} % ${s.desTotal}.`
          : k === 2
            ? `À partir de ce renseignement, calcule de tête ${cible} % ${s.desTotal}.`
            : `Combien font ${cible} % ${s.desTotal} ?`;
    const lien =
      connu === 10
        ? cible === 20 ? "20 %, c’est 2 fois 10 %." : cible === 30 ? "30 %, c’est 3 fois 10 %." : cible === 5 ? "5 %, c’est la moitié de 10 %." : "100 %, c’est 10 fois 10 %."
        : cible === 10 ? "10 %, c’est 2 fois 5 %." : cible === 20 ? "20 %, c’est 4 fois 5 %." : "100 %, c’est 20 fois 5 %.";
    const facteur = cible / connu;
    return {
      text: `${s.totalInconnu(xc, connu)} ${question}`,
      format: "short" as const,
      expected: attendu(xq),
      comparator: "number_equal" as const,
      explanation: expl(
        DEF_MENTAL,
        `on n’a pas besoin du total : on part de ${connu} % et on s’en sert comme d’une brique. ${lien}`,
        `${connu} % valent ${fr(xc)}, donc ${cible} % valent ${facteur < 1 ? `${fr(xc)} ÷ 2` : `${fr(facteur)} × ${fr(xc)}`} = ${fr(xq)}.`,
        `${cible} % ${s.desTotal}, c’est ${fr(xq)} ${s.u}.`,
      ),
    };
  }
  return genMental([10], ["nu"]);
}

const PRENOMS_MENTAL: Array<[string, "il" | "elle"]> = [
  ["Léa", "elle"], ["Malik", "il"], ["Inès", "elle"], ["Hugo", "il"], ["Nour", "elle"],
  ["Sacha", "il"], ["Emma", "elle"], ["Yanis", "il"], ["Chloé", "elle"], ["Kenzo", "il"],
  ["Jade", "elle"], ["Noah", "il"], ["Lina", "elle"], ["Tom", "il"],
];

const METHODES_MENTAL: Record<MentalP, string> = {
  10: "diviser le nombre par 10",
  20: "diviser par 10, puis doubler",
  30: "diviser par 10, puis multiplier par 3",
  5: "diviser par 10, puis prendre la moitié",
  100: "garder le nombre tel quel",
  200: "doubler le nombre",
};
/** Les fausses méthodes qu'on entend vraiment. */
const PIEGES_METHODE: Record<MentalP, string[]> = {
  10: ["diviser le nombre par 100", "enlever 10 au nombre"],
  20: ["diviser le nombre par 20", "diviser par 10, puis ajouter 2"],
  30: ["diviser le nombre par 30", "diviser par 10, puis ajouter 3"],
  5: ["diviser le nombre par 5", "diviser par 10, puis doubler"],
  100: ["diviser le nombre par 100", "multiplier le nombre par 100"],
  200: ["ajouter 200 au nombre", "diviser le nombre par 2"],
};

/** QCM : quelle méthode pour calculer p % de N de tête ? */
function genMentalMethode() {
  const p = randomChoice<MentalP>([10, 20, 30, 5, 100, 200]);
  const N = randomChoice([40, 60, 80, 120, 140, 160, 240, 300]);
  const [P, pron] = randomChoice(PRENOMS_MENTAL);
  const k = randomInt(0, 4);
  const text =
    k === 0
      ? `Pour calculer de tête ${p} % de ${N}, quelle méthode est la bonne ?`
      : k === 1
        ? `${P} veut calculer ${p} % de ${N} sans calculatrice. Que doit-${pron} faire ?`
        : k === 2
          ? `Quelle méthode permet de trouver mentalement ${p} % d’un nombre, par exemple de ${N} ?`
          : k === 3
            ? `${P} doit trouver ${p} % de ${N} de tête. Quelle est la bonne façon de s’y prendre ?`
            : `Calcul mental : comment obtenir ${p} % de ${N} sans poser d’opération ?`;
  const correct = METHODES_MENTAL[p];
  const autres = ([10, 20, 30, 5, 100, 200] as MentalP[]).filter((q) => q !== p).map((q) => METHODES_MENTAL[q]);
  const c = cheminMental(p, N);
  return {
    text,
    format: "qcm" as const,
    // Deux méthodes voisines en réserve : pour 5 %, « diviser par 10, puis
    // doubler » est à la fois un piège et la méthode de 20 % — le doublon
    // tomberait au tri et le QCM n'aurait plus que trois lignes.
    choices: makeChoices(correct, [...PIEGES_METHODE[p], ...shuffle(autres).slice(0, 2)]),
    expected: [correct],
    comparator: "mcq_exact" as const,
    explanation: expl(DEF_MENTAL, c.methode, c.calcul, `la bonne méthode : ${correct}.`),
  };
}

/** Vrai ou faux : une affirmation d'élève, juste une fois sur deux. */
function genMentalVraiFaux() {
  const p = randomChoice<MentalP>([10, 20, 30, 5, 100, 200]);
  const N = randomChoice([40, 60, 80, 120, 140, 160, 240, 300]);
  const x = (N * p) / 100;
  // Les erreurs qu'on entend : 5 % pris pour un cinquième, 200 % pour « + 200 »…
  const faux: Record<MentalP, number[]> = {
    10: [N - 10, N / 100],
    20: [N / 20, N / 10 + 2],
    30: [N - 30, N / 10 + 3],
    5: [N / 5, N / 10 * 2],
    100: [1, N / 100],
    200: [N + 200, N / 2],
  };
  const juste = Math.random() < 0.5;
  const annonce = juste ? x : randomChoice(faux[p].filter((v) => v !== x));
  const [P, pron] = randomChoice(PRENOMS_MENTAL);
  const k = randomInt(0, 4);
  const text =
    k === 0
      ? `${P} affirme : « ${p} % de ${N}, c’est ${fr(annonce)}. » A-t-${pron} raison ?`
      : k === 1
        ? `Calcul mental — ${P} trouve que ${p} % de ${N} font ${fr(annonce)}. A-t-${pron} raison ?`
        : k === 2
          ? `Vrai ou faux ? D’après ${P}, ${p} % de ${N} = ${fr(annonce)}.`
          : k === 3
            ? `Au tableau, ${P} écrit : ${p} % de ${N} = ${fr(annonce)}. Est-ce juste ?`
            : `Vrai ou faux ? ${p} % de ${N}, c’est ${fr(annonce)}.`;
  const vf = k === 2 || k === 4;
  const oui = vf ? "vrai" : "oui";
  const non = vf ? "faux" : "non";
  const c = cheminMental(p, N);
  return {
    text,
    format: "qcm" as const,
    choices: [oui, non],
    expected: [juste ? oui : non],
    comparator: "mcq_exact" as const,
    explanation: expl(
      DEF_MENTAL,
      c.methode,
      c.calcul,
      juste ? `${fr(annonce)} est juste.` : `${fr(annonce)} est faux : ${p} % de ${N} = ${fr(x)}.`,
    ),
  };
}

export const proportionnaliteBank: TutorBankItemV4[] = [
  // =========================
  // PROP_RECONNAITRE
  // =========================
  {
    kind: "fixed",
    id: "prop_reconnaitre_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle situation est proportionnelle ?",
    format: "qcm",
    choices: [
      "2 kg coûtent 6 € et 4 kg coûtent 12 €",
      "2 kg coûtent 6 € et 4 kg coûtent 13 €",
      "1 heure donne 10 km et 2 heures donnent 25 km",
      "3 stylos coûtent 4 € et 6 stylos coûtent 9 €",
    ],
    expected: ["2 kg coûtent 6 € et 4 kg coûtent 12 €"],
    comparator: "mcq_exact",
    hint: "Le coefficient doit rester le même.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("6 ÷ 2 = 3 et 12 ÷ 4 = 3. Le coefficient est le même : c’est proportionnel.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_reconnaitre_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Une situation proportionnelle est une situation où...",
    format: "qcm",
    choices: [
      "on ajoute toujours le même nombre",
      "on multiplie toujours par le même coefficient",
      "les nombres augmentent toujours",
      "les nombres sont toujours entiers",
    ],
    expected: ["on multiplie toujours par le même coefficient"],
    comparator: "mcq_exact",
    hint: "La proportionnalité repose sur une multiplication.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("Dans une situation proportionnelle, on passe d’une grandeur à l’autre par un même coefficient multiplicatif.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "definition"],
  },
  {
    kind: "template",
    id: "prop_reconnaitre_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare les deux coefficients.",
    tags: ["prop_proportionnalite", "reconnaitre", "template"],
    generate: () => genReconnaitre(2),
  },
  {
    kind: "template",
    id: "prop_reconnaitre_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "reunion",
    hint: "Vérifie si le prix par kg reste le même.",
    tags: ["prop_proportionnalite", "reunion", "prix", "template"],
    generate: () => genReconnaitre(2),
  },
  {
    kind: "fixed",
    id: "prop_reconnaitre_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi la situation suivante est proportionnelle : 3 kg coûtent 12 € et 5 kg coûtent 20 €.",
    format: "open",
    expected: ["12", "3", "20", "5", "coefficient"],
    comparator: "contains_keyword",
    hint: "Calcule le prix pour 1 kg ou compare les coefficients.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("12 ÷ 3 = 4 et 20 ÷ 5 = 4. Le prix au kg est constant : la situation est proportionnelle.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "open", "justification"],
  },

  // =========================
  // PROP_TABLE
  // =========================
  {
    kind: "fixed",
    id: "prop_table_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un tableau de proportionnalité, si 2 → 10, alors 4 → ?",
    format: "qcm",
    choices: ["12", "14", "20", "40"],
    expected: ["20"],
    comparator: "mcq_exact",
    hint: "4 est le double de 2.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("Comme 4 est le double de 2, l’image est aussi doublée : 10 × 2 = 20.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "tableau", "qcm"],
  },
  {
    kind: "template",
    id: "prop_table_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Utilise le coefficient multiplicatif.",
    tags: ["prop_proportionnalite", "tableau", "template", "canvas"],
    generate: () => genTableau(2),
  },
  {
    kind: "template",
    id: "prop_table_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le passage d’une colonne à l’autre.",
    tags: ["prop_proportionnalite", "tableau", "template"],
    generate: () => genTableau(2),
  },
  {
    kind: "template",
    id: "prop_table_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 3,
    theme: "neutral",
    hint: "Passe par l’unité ou calcule le coefficient.",
    tags: ["prop_proportionnalite", "tableau", "template"],
    generate: () => genTableau(3),
  },

  // =========================
  // PROP_COEFF
  // =========================
  {
    kind: "fixed",
    id: "prop_coeff_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 1,
    theme: "neutral",
    text: "Si 4 → 20, quel est le coefficient de proportionnalité ?",
    format: "qcm",
    choices: ["4", "5", "16", "24"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Coefficient = 20 ÷ 4.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("20 ÷ 4 = 5. Le coefficient de proportionnalité est 5.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "coefficient"],
  },
  {
    kind: "template",
    id: "prop_coeff_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    hint: "Coefficient = deuxième grandeur ÷ première grandeur.",
    tags: ["prop_proportionnalite", "coefficient", "template"],
    generate: () => genCoeff(2),
  },
  {
    kind: "template",
    id: "prop_coeff_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "reunion",
    hint: "Calcule le prix pour 1 kg.",
    tags: ["prop_proportionnalite", "coefficient", "reunion", "template"],
    generate: () => genCoeff(2),
  },
  {
    kind: "template",
    id: "prop_coeff_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 3,
    theme: "neutral",
    hint: "Le coefficient permet de passer de la première ligne à la deuxième.",
    tags: ["prop_proportionnalite", "coefficient", "template"],
    generate: () => genCoeff(3),
  },
  {
    kind: "fixed",
    id: "prop_coeff_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment trouver le coefficient de proportionnalité quand 6 → 42.",
    format: "open",
    expected: ["42", "6", "divise", "7"],
    comparator: "contains_keyword",
    hint: "On divise l’image par le nombre de départ.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("On calcule 42 ÷ 6 = 7. Le coefficient est donc 7.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "coefficient", "open"],
  },

  // =========================
  // PROP_QUATRIEME
  // =========================
  {
    kind: "fixed",
    id: "prop_quatrieme_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 2,
    theme: "neutral",
    text: "Si 3 kg coûtent 12 €, combien coûtent 5 kg ?",
    format: "qcm",
    choices: ["15 €", "18 €", "20 €", "24 €"],
    expected: ["20 €"],
    comparator: "mcq_exact",
    hint: "Trouve d’abord le prix de 1 kg.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("3 kg coûtent 12 €, donc 1 kg coûte 4 €. Alors 5 kg coûtent 5 × 4 = 20 €.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "quatrieme_proportionnelle"],
  },
  {
    kind: "template",
    id: "prop_quatrieme_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 2,
    theme: "neutral",
    hint: "Passe par le prix d’une unité.",
    tags: ["prop_proportionnalite", "quatrieme_proportionnelle", "template"],
    generate: () => genQuatrieme(1),
  },
  {
    kind: "template",
    id: "prop_quatrieme_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise le coefficient de proportionnalité.",
    tags: ["prop_proportionnalite", "quatrieme_proportionnelle", "template"],
    generate: () => genQuatrieme(2),
  },
  {
    kind: "template",
    id: "prop_quatrieme_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 3,
    theme: "reunion",
    hint: "Même prix au kg.",
    tags: ["prop_proportionnalite", "reunion", "quatrieme_proportionnelle", "template", "canvas"],
    generate: () => genQuatrieme(2),
  },

  // =========================
  // PROP_POURCENTAGE
  // =========================
  {
    kind: "fixed",
    id: "prop_pourcentage_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_pourcentage",
    difficulty: 1,
    theme: "neutral",
    text: "25 % d’une quantité correspond à...",
    format: "qcm",
    choices: ["1/2", "1/4", "1/5", "3/4"],
    expected: ["1/4"],
    comparator: "mcq_exact",
    hint: "25 % = 25 sur 100.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("25 % = 25/100 = 1/4.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "pourcentage"],
  },
  {
    kind: "fixed",
    id: "prop_pourcentage_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_pourcentage",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer 10 % de 80.",
    format: "qcm",
    choices: ["4", "8", "10", "18"],
    expected: ["8"],
    comparator: "mcq_exact",
    hint: "10 % signifie diviser par 10.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("10 % de 80 = 80 ÷ 10 = 8.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "pourcentage", "qcm"],
  },
  {
    kind: "template",
    id: "prop_pourcentage_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_pourcentage",
    difficulty: 2,
    theme: "neutral",
    hint: "p % de N = N × p / 100.",
    tags: ["prop_proportionnalite", "pourcentage", "template"],
    generate: () => genPourcentage(["partie", "taux"], [5, 10, 20, 25, 30, 40, 50, 75]),
  },
  {
    kind: "template",
    id: "prop_pourcentage_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_pourcentage",
    difficulty: 3,
    theme: "neutral",
    hint: "Pourcentage = partie ÷ total × 100.",
    tags: ["prop_proportionnalite", "pourcentage", "template"],
    generate: () => genPourcentage(["taux"], [5, 12, 15, 30, 35, 40, 45, 60]),
  },
  {
    kind: "template",
    id: "prop_pourcentage_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_pourcentage",
    difficulty: 3,
    theme: "reunion",
    hint: "Calcule la partie correspondant au pourcentage.",
    tags: ["prop_proportionnalite", "pourcentage", "reunion", "template"],
    generate: () => genPourcentage(["partie"], [5, 12, 15, 30, 35, 40, 45, 60]),
  },
  {
    kind: "template",
    id: "prop_pourcentage_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_pourcentage",
    difficulty: 3,
    theme: "neutral",
    hint: "Transforme le pourcentage en fraction sur 100.",
    tags: ["prop_proportionnalite", "pourcentage", "qcm", "template"],
    // Le piège « 1/p » reste parmi les distracteurs : « 5 %, c'est 1/5 » est
    // l'erreur qu'on entend vraiment en classe.
    generate: () => genPourcentage(["fraction"], [5, 10, 20, 25, 50, 75]),
  },

  // =========================
  // PROP_POURCENTAGE_MENTAL (02/10/2026)
  // ★1 : 10 %, 100 %, 200 % · ★2 : 20 %, 30 %, 5 % · ★3 : déduire, méthode, vrai/faux
  // =========================
  {
    kind: "template",
    id: "prop_pourcentage_mental_tpl_1_dix",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_pourcentage_mental",
    difficulty: 1,
    theme: "neutral",
    hint: "10 %, c’est diviser par 10.",
    tags: ["pourcentage", "calcul_mental", "template"],
    generate: () => genMental([10], ["nu", "partie", "partie", "comparaison"]),
  },
  {
    kind: "template",
    id: "prop_pourcentage_mental_tpl_2_cent_deux_cents",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_pourcentage_mental",
    difficulty: 1,
    theme: "neutral",
    hint: "100 %, c’est tout ; 200 %, c’est le double.",
    tags: ["pourcentage", "calcul_mental", "template"],
    generate: () => genMental([100, 200], ["nu", "comparaison", "comparaison"]),
  },
  {
    kind: "template",
    id: "prop_pourcentage_mental_tpl_3_vingt_trente_cinq",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_pourcentage_mental",
    difficulty: 2,
    theme: "neutral",
    hint: "Commence par 10 % : double-le, triple-le ou prends sa moitié.",
    tags: ["pourcentage", "calcul_mental", "template"],
    generate: () => genMental([20, 30, 5], ["nu", "partie", "partie", "comparaison"]),
  },
  {
    kind: "template",
    id: "prop_pourcentage_mental_tpl_4_six_taux",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_pourcentage_mental",
    difficulty: 2,
    theme: "neutral",
    hint: "Tout part de 10 %.",
    tags: ["pourcentage", "calcul_mental", "template"],
    generate: () => genMental([10, 20, 30, 5, 100, 200], ["comparaison", "comparaison", "nu"]),
  },
  {
    kind: "template",
    id: "prop_pourcentage_mental_tpl_5_deduire",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_pourcentage_mental",
    difficulty: 3,
    theme: "neutral",
    hint: "Pas besoin du total : pars du pourcentage que tu connais.",
    tags: ["pourcentage", "calcul_mental", "template"],
    generate: () => genMentalDeduire(),
  },
  {
    kind: "template",
    id: "prop_pourcentage_mental_tpl_6_methode",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_pourcentage_mental",
    difficulty: 3,
    theme: "neutral",
    hint: "Quel lien avec 10 % ?",
    tags: ["pourcentage", "calcul_mental", "qcm", "template"],
    generate: () => genMentalMethode(),
  },
  {
    kind: "template",
    id: "prop_pourcentage_mental_tpl_7_vrai_faux",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_pourcentage_mental",
    difficulty: 3,
    theme: "neutral",
    hint: "Refais le calcul en partant de 10 %.",
    tags: ["pourcentage", "calcul_mental", "qcm", "piege", "template"],
    generate: () => genMentalVraiFaux(),
  },

  // =========================
  // PROP_COEFF_MULT
  // =========================
  {
    kind: "fixed",
    id: "prop_coeff_multiplicateur_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_coeff_multiplicateur",
    difficulty: 2,
    theme: "neutral",
    text: "Une augmentation de 20 % correspond à multiplier par...",
    format: "qcm",
    choices: ["0,2", "1,2", "20", "2"],
    expected: ["1,2"],
    comparator: "mcq_exact",
    hint: "On garde 100 % puis on ajoute 20 %.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("Augmenter de 20 %, c’est passer à 120 %, donc multiplier par 1,2.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "coefficient_multiplicateur"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_multiplicateur_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_coeff_multiplicateur",
    difficulty: 2,
    theme: "neutral",
    text: "Une réduction de 30 % correspond à multiplier par...",
    format: "qcm",
    choices: ["0,3", "0,7", "1,3", "30"],
    expected: ["0,7"],
    comparator: "mcq_exact",
    hint: "Après une baisse de 30 %, il reste 70 %.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("Réduire de 30 %, c’est garder 70 %, donc multiplier par 0,7.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "coefficient_multiplicateur", "reduction"],
  },
  {
    kind: "template",
    id: "prop_coeff_multiplicateur_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_coeff_multiplicateur",
    difficulty: 3,
    theme: "neutral",
    hint: "Augmenter de p %, c’est multiplier par 1 + p/100.",
    tags: ["prop_proportionnalite", "coefficient_multiplicateur", "augmentation", "template"],
    generate: () => genCoeffMult("short", "hausse", [5, 10, 15, 20, 25, 30, 40, 50]),
  },
  {
    kind: "template",
    id: "prop_coeff_multiplicateur_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_coeff_multiplicateur",
    difficulty: 3,
    theme: "neutral",
    hint: "Diminuer de p %, c’est multiplier par 1 - p/100.",
    tags: ["prop_proportionnalite", "coefficient_multiplicateur", "reduction", "template"],
    generate: () => genCoeffMult("short", "baisse", [5, 10, 15, 20, 25, 30, 40, 50]),
  },
  {
    kind: "template",
    id: "prop_coeff_multiplicateur_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_coeff_multiplicateur",
    difficulty: 4,
    theme: "neutral",
    hint: "Lis le coefficient : 1,15 signifie 115 %.",
    tags: ["prop_proportionnalite", "coefficient_multiplicateur", "template"],
    generate: () => genCoeffVersTaux([5, 10, 15, 20, 25, 30, 40, 50]),
  },

  // =========================
  // PROP_EVOLUTION
  // =========================
  {
    kind: "fixed",
    id: "prop_evolution_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_evolution",
    difficulty: 2,
    theme: "neutral",
    text: "Un prix de 100 € augmente de 15 %. Quel est le nouveau prix ?",
    format: "qcm",
    choices: ["85 €", "115 €", "150 €", "15 €"],
    expected: ["115 €"],
    comparator: "mcq_exact",
    hint: "100 € + 15 % de 100 €.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("15 % de 100 € vaut 15 €. Le nouveau prix est 100 + 15 = 115 €.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "evolution", "augmentation"],
  },
  {
    kind: "fixed",
    id: "prop_evolution_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_evolution",
    difficulty: 2,
    theme: "neutral",
    text: "Un prix de 80 € diminue de 25 %. Quel est le nouveau prix ?",
    format: "qcm",
    choices: ["20 €", "55 €", "60 €", "100 €"],
    expected: ["60 €"],
    comparator: "mcq_exact",
    hint: "25 % de 80 vaut 20.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("25 % de 80 € vaut 20 €. Le nouveau prix est 80 - 20 = 60 €.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "evolution", "reduction"],
  },
  {
    kind: "template",
    id: "prop_evolution_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_evolution",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise le coefficient multiplicateur.",
    tags: ["prop_proportionnalite", "evolution", "augmentation", "template"],
    generate: () => genNouvelleValeur([5, 10, 15, 20, 25, 30, 40, 50]),
  },
  {
    kind: "template",
    id: "prop_evolution_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_evolution",
    difficulty: 3,
    theme: "neutral",
    hint: "Après une baisse, on multiplie par 1 - p/100.",
    tags: ["prop_proportionnalite", "evolution", "reduction", "template"],
    generate: () => genNouvelleValeur([5, 10, 15, 20, 25, 30, 40, 50]),
  },
  {
    kind: "template",
    id: "prop_evolution_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_evolution",
    difficulty: 4,
    theme: "reunion",
    hint: "Calcule d’abord la hausse.",
    tags: ["prop_proportionnalite", "evolution", "reunion", "template"],
    generate: () => genNouvelleValeur([6, 8, 12, 15, 35, 45]),
  },
  {
    kind: "template",
    id: "prop_evolution_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_evolution",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare le nouveau prix à l’ancien.",
    tags: ["prop_proportionnalite", "evolution", "template"],
    generate: () => genTauxEvolution([5, 10, 15, 20, 25, 30, 40, 50]),
  },
  {
    kind: "fixed",
    id: "prop_evolution_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_evolution",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi une baisse de 20 % correspond à multiplier par 0,8.",
    format: "open",
    expected: ["100", "20", "80", "0,8"],
    comparator: "contains_keyword",
    hint: "Après une baisse de 20 %, il reste 80 %.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("Une baisse de 20 % signifie qu’il reste 80 % de la valeur initiale. Or 80 % = 80/100 = 0,8.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "evolution", "open"],
  },

  // =========================
  // PROP_PROBLEME
  // =========================
  {
    kind: "template",
    id: "prop_probleme_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "reunion",
    hint: "Cherche le prix pour 1 kg.",
    tags: ["prop_proportionnalite", "probleme", "reunion", "template"],
    generate: () => genProbleme(3),
  },
  {
    kind: "template",
    id: "prop_probleme_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 4,
    theme: "sport",
    hint: "Si la vitesse est constante, distance et durée sont proportionnelles.",
    tags: ["prop_proportionnalite", "probleme", "sport", "template"],
    generate: () => genProbleme(4),
  },
  {
    kind: "template",
    id: "prop_probleme_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 4,
    theme: "cuisine",
    hint: "Les quantités d’une recette sont proportionnelles au nombre de personnes.",
    tags: ["prop_proportionnalite", "probleme", "cuisine", "template"],
    generate: () => genProbleme(4),
  },
  {
    kind: "template",
    id: "prop_probleme_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 4,
    theme: "reunion",
    hint: "Utilise le pourcentage.",
    tags: ["prop_proportionnalite", "probleme", "pourcentage", "reunion", "template"],
    generate: () => genProbleme(4),
  },
  {
    kind: "fixed",
    id: "prop_probleme_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment résoudre : 4 cahiers coûtent 12 €. Combien coûtent 7 cahiers ?",
    format: "open",
    expected: ["12", "4", "3", "7", "21"],
    comparator: "contains_keyword",
    hint: "Passe par le prix d’un cahier.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("Un cahier coûte 12 ÷ 4 = 3 €. Donc 7 cahiers coûtent 7 × 3 = 21 €.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "probleme", "open"],
  },
  {
    kind: "fixed",
    id: "prop_probleme_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi ajouter toujours le même nombre ne suffit pas à prouver une proportionnalité.",
    format: "open",
    expected: ["coefficient", "multiplier", "ajouter"],
    comparator: "contains_keyword",
    hint: "La proportionnalité repose sur une multiplication, pas une addition.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("Une situation proportionnelle utilise un coefficient multiplicatif constant. Ajouter toujours le même nombre décrit une relation additive, pas proportionnelle.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "probleme", "open", "piege"],
  },

  // =========================
  // PROP_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "prop_defi_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « Si 2 → 6, alors 5 → 9 car j’ajoute 3. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "On ne doit pas ajouter, on doit multiplier par un même coefficient.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("Non. Si 2 → 6, le coefficient est 3. Donc 5 → 15, pas 9.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "defi", "erreur"],
  },
  {
    kind: "fixed",
    id: "prop_defi_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_pourcentage_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un prix augmente de 20 %, puis baisse de 20 %. Revient-il au prix initial ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La baisse de 20 % ne s’applique pas au prix initial, mais au prix augmenté.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("Non. Par exemple, 100 € augmente de 20 % : 120 €. Puis 120 € baisse de 20 % : 96 €.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "defi", "evolution", "piege"],
  },
  {
    kind: "template",
    id: "prop_defi_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Teste les coefficients.",
    tags: ["prop_proportionnalite", "defi", "template"],
    generate: () => genAffirmation(3),
  },
  {
    kind: "template",
    id: "prop_defi_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_pourcentage_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Une évolution successive se traite avec des coefficients multiplicateurs.",
    tags: ["prop_proportionnalite", "defi", "evolution", "template"],
    generate: () => genSuccessives(false),
  },
  {
    kind: "template",
    id: "prop_defi_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Compare les prix au kg.",
    tags: ["prop_proportionnalite", "defi", "reunion", "comparaison", "template"],
    generate: () => genComparer(3),
  },
  {
    kind: "fixed",
    id: "prop_defi_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_pourcentage_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique l’erreur : « augmenter de 30 %, c’est multiplier par 0,3 ».",
    format: "open",
    expected: ["1,3", "100", "30"],
    comparator: "contains_keyword",
    hint: "Quand on augmente, on garde 100 % et on ajoute 30 %.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("Augmenter de 30 %, c’est passer à 130 % de la valeur initiale, donc multiplier par 1,3.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "defi", "open", "erreur"],
  },
  {
    kind: "fixed",
    id: "prop_defi_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_pourcentage_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi une réduction de 25 % ne correspond pas à multiplier par 25.",
    format: "open",
    expected: ["75", "0,75", "reste"],
    comparator: "contains_keyword",
    hint: "Après une baisse de 25 %, il reste 75 %.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("Une réduction de 25 % signifie qu’il reste 75 % de la valeur initiale. On multiplie donc par 0,75, pas par 25.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "defi", "open", "erreur"],
  },

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  // ---------- PROP_RECONNAITRE ----------
  {
    kind: "fixed",
    id: "prop_reconnaitre_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Deux grandeurs sont proportionnelles lorsque…",
    format: "qcm",
    choices: [
      "on passe de l’une à l’autre en multipliant toujours par le même nombre",
      "on passe de l’une à l’autre en ajoutant toujours le même nombre",
      "on passe de l’une à l’autre en multipliant par un nombre différent",
      "on range les deux grandeurs dans le même ordre croissant de valeurs",
    ],
    expected: ["on passe de l’une à l’autre en multipliant toujours par le même nombre"],
    comparator: "mcq_exact",
    hint: "Pense au coefficient de proportionnalité.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles si un même coefficient relie l’une à l’autre.\n\n" +
      "Méthode : on cherche un multiplicateur unique.\n\n" +
      "Calcul : si ce coefficient existe, c’est proportionnel.\n\n" +
      "Conclusion : on multiplie toujours par le même nombre.",
    tags: ["prop_proportionnalite", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_reconnaitre_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle situation est proportionnelle ?",
    format: "qcm",
    choices: [
      "le prix payé en fonction du nombre de croissants identiques",
      "l’âge d’une personne en fonction de l’année",
      "la taille d’un enfant en fonction de son âge",
      "la pointure en fonction du prénom",
    ],
    expected: ["le prix payé en fonction du nombre de croissants identiques"],
    comparator: "mcq_exact",
    hint: "Cherche un prix unitaire fixe.",
    explanation:
      "Définition : une situation est proportionnelle si un coefficient constant relie les grandeurs.\n\n" +
      "Méthode : on cherche un prix unitaire fixe.\n\n" +
      "Calcul : chaque croissant coûte le même prix, donc le prix total est proportionnel au nombre.\n\n" +
      "Conclusion : le prix des croissants est proportionnel au nombre.",
    tags: ["prop_proportionnalite", "reconnaitre", "qcm"],
  },
  {
    kind: "template",
    id: "prop_reconnaitre_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Vérifie si le rapport y/x est le même partout.",
    tags: ["prop_proportionnalite", "reconnaitre", "template"],
    generate: () => genReconnaitre(2),
  },
  {
    kind: "fixed",
    id: "prop_reconnaitre_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Comment vérifier qu’un tableau est proportionnel ?",
    format: "qcm",
    choices: [
      "en vérifiant que le rapport entre les lignes est constant",
      "en vérifiant que la différence entre les lignes est constante",
      "en vérifiant que la somme des deux lignes est toujours la même",
      "en vérifiant que les valeurs des deux lignes sont rangées de même",
    ],
    expected: ["en vérifiant que le rapport entre les lignes est constant"],
    comparator: "mcq_exact",
    hint: "On calcule le coefficient.",
    explanation:
      "Définition : un tableau est proportionnel si un coefficient constant relie les deux lignes.\n\n" +
      "Méthode : on calcule le rapport de chaque colonne.\n\n" +
      "Calcul : si tous les rapports sont égaux, c’est proportionnel.\n\n" +
      "Conclusion : on vérifie que le rapport est constant.",
    tags: ["prop_proportionnalite", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_reconnaitre_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Explique comment reconnaître une situation de proportionnalité.",
    format: "open",
    expected: ["coefficient", "multiplie", "constant"],
    comparator: "contains_keyword",
    hint: "Pense au coefficient de proportionnalité.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles si un même coefficient les relie.\n\n" +
      "Méthode : on vérifie qu’on multiplie toujours par le même nombre.\n\n" +
      "Calcul : on calcule le rapport y/x pour chaque couple.\n\n" +
      "Conclusion : si ce coefficient est constant, la situation est proportionnelle.",
    tags: ["prop_proportionnalite", "reconnaitre", "open"],
  },

  // ---------- PROP_TABLE ----------
  {
    kind: "fixed",
    id: "prop_table_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un tableau de proportionnalité, 2 correspond à 6. À quoi correspond 5 ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Le coefficient est 6 ÷ 2 = 3.",
    explanation:
      "Définition : dans un tableau de proportionnalité, un coefficient relie les deux lignes.\n\n" +
      "Méthode : on calcule le coefficient, puis on l’applique.\n\n" +
      "Calcul : coefficient = 6 ÷ 2 = 3, donc 5 × 3 = 15.\n\n" +
      "Conclusion : 5 correspond à 15.",
    tags: ["prop_proportionnalite", "table"],
  },
  {
    kind: "template",
    id: "prop_table_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Trouve le coefficient, puis complète.",
    tags: ["prop_proportionnalite", "table", "template", "canvas"],
    generate: () => genTableau(2),
  },
  {
    kind: "template",
    id: "prop_table_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 3,
    theme: "neutral",
    hint: "Le coefficient s’applique dans les deux sens.",
    tags: ["prop_proportionnalite", "table", "template", "canvas"],
    generate: () => genTableau(3),
  },
  {
    kind: "fixed",
    id: "prop_table_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    text: "Lequel de ces tableaux est un tableau de proportionnalité ?",
    format: "qcm",
    choices: [
      "2→6 ; 4→12 ; 5→15",
      "2→6 ; 4→10 ; 5→15",
      "2→5 ; 4→8 ; 5→11",
      "1→2 ; 2→5 ; 3→7",
    ],
    expected: ["2→6 ; 4→12 ; 5→15"],
    comparator: "mcq_exact",
    hint: "Le rapport y/x doit être constant.",
    explanation:
      "Définition : un tableau est proportionnel si le rapport est constant.\n\n" +
      "Méthode : on calcule y ÷ x pour chaque colonne.\n\n" +
      "Calcul : 6÷2 = 12÷4 = 15÷5 = 3.\n\n" +
      "Conclusion : le tableau « 2→6 ; 4→12 ; 5→15 » est proportionnel.",
    tags: ["prop_proportionnalite", "table", "qcm"],
  },
  {
    kind: "template",
    id: "prop_table_tpl_4_coeff",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 3,
    theme: "neutral",
    hint: "Coefficient = valeur de la 2e ligne ÷ valeur de la 1re ligne.",
    tags: ["prop_proportionnalite", "table", "coefficient", "template"],
    generate: () => genTableau(3),
  },
  {
    kind: "fixed",
    id: "prop_table_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    text: "Explique comment compléter un tableau de proportionnalité.",
    format: "open",
    expected: ["coefficient", "multiplie", "ligne"],
    comparator: "contains_keyword",
    hint: "On trouve d’abord le coefficient.",
    explanation:
      "Définition : un coefficient constant relie les deux lignes.\n\n" +
      "Méthode : on calcule le coefficient à partir d’une colonne connue.\n\n" +
      "Calcul : on multiplie (ou divise) par ce coefficient pour compléter.\n\n" +
      "Conclusion : on applique le coefficient à chaque colonne.",
    tags: ["prop_proportionnalite", "table", "open"],
  },

  // ---------- PROP_COEFF ----------
  {
    kind: "fixed",
    id: "prop_coeff_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    text: "3 kg de fruits coûtent 12 €. Quel est le prix d’un kg (coefficient) ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "12 ÷ 3.",
    explanation:
      "Définition : le coefficient est le prix d’une unité.\n\n" +
      "Méthode : on divise le prix total par la quantité.\n\n" +
      "Calcul : 12 ÷ 3 = 4.\n\n" +
      "Conclusion : un kg coûte 4 € (coefficient = 4).",
    tags: ["prop_proportionnalite", "coeff"],
  },
  {
    kind: "template",
    id: "prop_coeff_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    hint: "Coefficient = total ÷ quantité.",
    tags: ["prop_proportionnalite", "coeff", "template"],
    generate: () => genCoeff(2),
  },
  {
    kind: "template",
    id: "prop_coeff_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 3,
    theme: "neutral",
    hint: "On multiplie la quantité par le coefficient.",
    tags: ["prop_proportionnalite", "coeff", "template"],
    generate: () => genCoeff(3),
  },
  {
    kind: "fixed",
    id: "prop_coeff_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    text: "Le coefficient de proportionnalité, c’est…",
    format: "qcm",
    choices: [
      "le nombre par lequel on multiplie pour passer d’une grandeur à l’autre",
      "le nombre que l’on ajoute pour passer d’une grandeur à l’autre",
      "le quotient de la plus grande valeur par la plus petite du tableau",
      "la différence constante entre les deux lignes du tableau de valeurs",
    ],
    expected: ["le nombre par lequel on multiplie pour passer d’une grandeur à l’autre"],
    comparator: "mcq_exact",
    hint: "C’est un multiplicateur.",
    explanation:
      "Définition : le coefficient est le multiplicateur reliant les deux grandeurs.\n\n" +
      "Méthode : on l’obtient en divisant une valeur par l’autre.\n\n" +
      "Calcul : coefficient = y ÷ x.\n\n" +
      "Conclusion : c’est le nombre par lequel on multiplie.",
    tags: ["prop_proportionnalite", "coeff", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment trouver le coefficient de proportionnalité d’un tableau.",
    format: "open",
    expected: ["divise", "coefficient", "ligne"],
    comparator: "contains_keyword",
    hint: "On divise une valeur de la 2e ligne par celle de la 1re.",
    explanation:
      "Définition : le coefficient relie la 1re ligne à la 2e.\n\n" +
      "Méthode : on divise une valeur de la 2e ligne par la valeur correspondante de la 1re.\n\n" +
      "Calcul : coefficient = y ÷ x.\n\n" +
      "Conclusion : ce quotient donne le coefficient de proportionnalité.",
    tags: ["prop_proportionnalite", "coeff", "open"],
  },

  // ---------- PROP_QUATRIEME ----------
  {
    kind: "fixed",
    id: "prop_quatrieme_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 2,
    theme: "neutral",
    text: "4 stylos coûtent 6 €. Combien coûtent 6 stylos ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Produit en croix : 6 × 6 ÷ 4.",
    explanation:
      "Définition : la quatrième proportionnelle se trouve par produit en croix.\n\n" +
      "Méthode : prix = 6 × 6 ÷ 4.\n\n" +
      "Calcul : 36 ÷ 4 = 9.\n\n" +
      "Conclusion : 6 stylos coûtent 9 €.",
    tags: ["prop_proportionnalite", "quatrieme"],
  },
  {
    kind: "template",
    id: "prop_quatrieme_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 3,
    theme: "neutral",
    hint: "Produit en croix.",
    tags: ["prop_proportionnalite", "quatrieme", "template"],
    generate: () => genQuatrieme(2),
  },
  {
    kind: "template",
    id: "prop_quatrieme_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 3,
    theme: "neutral",
    hint: "Passe d’abord à l’unité.",
    tags: ["prop_proportionnalite", "quatrieme", "unite", "template"],
    generate: () => genQuatrieme(2),
  },
  {
    kind: "fixed",
    id: "prop_quatrieme_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle méthode permet de calculer une quatrième proportionnelle ?",
    format: "qcm",
    choices: [
      "le produit en croix",
      "l’addition des valeurs",
      "le calcul de la moyenne",
      "le rangement des valeurs",
    ],
    expected: ["le produit en croix"],
    comparator: "mcq_exact",
    hint: "On multiplie en diagonale puis on divise.",
    explanation:
      "Définition : la quatrième proportionnelle complète un tableau de proportionnalité.\n\n" +
      "Méthode : on utilise le produit en croix.\n\n" +
      "Calcul : valeur = (produit des diagonales connues) ÷ (valeur restante).\n\n" +
      "Conclusion : on utilise le produit en croix.",
    tags: ["prop_proportionnalite", "quatrieme", "qcm"],
  },
  {
    kind: "template",
    id: "prop_quatrieme_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 4,
    theme: "neutral",
    hint: "Produit en croix avec une recette.",
    tags: ["prop_proportionnalite", "quatrieme", "contexte", "template"],
    generate: () => genQuatrieme(3),
  },
  {
    kind: "fixed",
    id: "prop_quatrieme_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 3,
    theme: "neutral",
    text: "Explique la méthode du produit en croix.",
    format: "open",
    expected: ["croix", "multiplie", "divise"],
    comparator: "contains_keyword",
    hint: "On multiplie en diagonale, puis on divise.",
    explanation:
      "Définition : le produit en croix sert à trouver une valeur manquante d’un tableau de proportionnalité.\n\n" +
      "Méthode : on multiplie les deux valeurs en diagonale, puis on divise par la troisième.\n\n" +
      "Calcul : valeur manquante = (a × d) ÷ b.\n\n" +
      "Conclusion : on multiplie en diagonale puis on divise.",
    tags: ["prop_proportionnalite", "quatrieme", "open"],
  },

  // ---------- PROP_POURCENTAGE ----------
  {
    kind: "fixed",
    id: "prop_pourcentage_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_pourcentage",
    difficulty: 2,
    theme: "neutral",
    text: "Combien font 25 % de 80 ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "25 % = 25 ÷ 100.",
    explanation:
      "Définition : prendre un pourcentage, c’est multiplier par ce pourcentage divisé par 100.\n\n" +
      "Méthode : 25 % de 80 = 80 × 25 ÷ 100.\n\n" +
      "Calcul : 80 × 0,25 = 20.\n\n" +
      "Conclusion : 25 % de 80 = 20.",
    tags: ["prop_proportionnalite", "pourcentage"],
  },
  {
    kind: "template",
    id: "prop_pourcentage_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_pourcentage",
    difficulty: 2,
    theme: "neutral",
    hint: "Pourcentage de N = N × p ÷ 100.",
    tags: ["prop_proportionnalite", "pourcentage", "template"],
    generate: () => genPourcentage(["partie", "taux"], [5, 10, 20, 25, 30, 40, 50, 75]),
  },
  {
    kind: "template",
    id: "prop_pourcentage_tpl_4_reduction",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_pourcentage",
    difficulty: 3,
    theme: "neutral",
    hint: "On calcule la réduction puis on la retire du prix.",
    tags: ["prop_proportionnalite", "pourcentage", "reduction", "template"],
    // Retrouver le TOUT à partir d'une partie et de son pourcentage.
    generate: () => genPourcentage(["total"], [5, 10, 20, 25, 40, 50, 75]),
  },
  {
    kind: "fixed",
    id: "prop_pourcentage_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_pourcentage",
    difficulty: 2,
    theme: "neutral",
    text: "Explique comment calculer un pourcentage d’un nombre.",
    format: "open",
    expected: ["100", "multiplie", "divise"],
    comparator: "contains_keyword",
    hint: "p % de N = N × p ÷ 100.",
    explanation:
      "Définition : un pourcentage est une proportion sur 100.\n\n" +
      "Méthode : on multiplie le nombre par le pourcentage, puis on divise par 100.\n\n" +
      "Calcul : p % de N = N × p ÷ 100.\n\n" +
      "Conclusion : on multiplie par p et on divise par 100.",
    tags: ["prop_proportionnalite", "pourcentage", "open"],
  },

  // ---------- PROP_COEFF_MULTIPLICATEUR ----------
  {
    kind: "fixed",
    id: "prop_coeff_multiplicateur_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_coeff_multiplicateur",
    difficulty: 2,
    theme: "neutral",
    text: "Augmenter une quantité de 20 % revient à multiplier par…",
    format: "qcm",
    choices: ["1,2", "0,2", "20", "0,8"],
    expected: ["1,2"],
    comparator: "mcq_exact",
    hint: "100 % + 20 % = 120 %.",
    explanation:
      "Définition : augmenter de p % revient à multiplier par (1 + p ÷ 100).\n\n" +
      "Méthode : 100 % + 20 % = 120 % = 1,2.\n\n" +
      "Calcul : le coefficient est 1,2.\n\n" +
      "Conclusion : on multiplie par 1,2.",
    tags: ["prop_proportionnalite", "coeff_multiplicateur", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_multiplicateur_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_coeff_multiplicateur",
    difficulty: 2,
    theme: "neutral",
    text: "Diminuer une quantité de 10 % revient à multiplier par…",
    format: "qcm",
    choices: ["0,9", "1,1", "0,1", "10"],
    expected: ["0,9"],
    comparator: "mcq_exact",
    hint: "100 % - 10 % = 90 %.",
    explanation:
      "Définition : diminuer de p % revient à multiplier par (1 - p ÷ 100).\n\n" +
      "Méthode : 100 % - 10 % = 90 % = 0,9.\n\n" +
      "Calcul : le coefficient est 0,9.\n\n" +
      "Conclusion : on multiplie par 0,9.",
    tags: ["prop_proportionnalite", "coeff_multiplicateur", "qcm"],
  },
  {
    kind: "template",
    id: "prop_coeff_multiplicateur_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_coeff_multiplicateur",
    difficulty: 3,
    theme: "neutral",
    hint: "Augmentation : 1 + p/100.",
    tags: ["prop_proportionnalite", "coeff_multiplicateur", "template"],
    generate: () => genCoeffMult("short", "mixte", [5, 12, 15, 25, 35, 45]),
  },
  {
    kind: "template",
    id: "prop_coeff_multiplicateur_tpl_3_appliquer",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_coeff_multiplicateur",
    difficulty: 3,
    theme: "neutral",
    hint: "On multiplie la valeur par le coefficient.",
    tags: ["prop_proportionnalite", "coeff_multiplicateur", "template"],
    generate: () => genAppliquerCoeff([10, 20, 25, 30, 40, 50]),
  },
  {
    kind: "fixed",
    id: "prop_coeff_multiplicateur_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_coeff_multiplicateur",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi augmenter de 50 % revient à multiplier par 1,5.",
    format: "open",
    expected: ["100", "50", "1,5"],
    comparator: "contains_keyword",
    hint: "On garde 100 % et on ajoute 50 %.",
    explanation:
      "Définition : augmenter de p %, c’est ajouter p % à 100 %.\n\n" +
      "Méthode : 100 % + 50 % = 150 %.\n\n" +
      "Calcul : 150 % = 1,5.\n\n" +
      "Conclusion : on multiplie par 1,5.",
    tags: ["prop_proportionnalite", "coeff_multiplicateur", "open"],
  },

  // ---------- PROP_EVOLUTION ----------
  {
    kind: "fixed",
    id: "prop_evolution_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_evolution",
    difficulty: 3,
    theme: "neutral",
    text: "Un prix passe de 50 € à 60 €. De quel pourcentage a-t-il augmenté ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "Augmentation ÷ valeur de départ × 100.",
    explanation:
      "Définition : le pourcentage d’évolution = (variation ÷ valeur de départ) × 100.\n\n" +
      "Méthode : variation = 60 - 50 = 10.\n\n" +
      "Calcul : (10 ÷ 50) × 100 = 20 %.\n\n" +
      "Conclusion : le prix a augmenté de 20 %.",
    tags: ["prop_proportionnalite", "evolution"],
  },
  {
    kind: "template",
    id: "prop_evolution_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_evolution",
    difficulty: 3,
    theme: "neutral",
    hint: "On applique le coefficient multiplicateur.",
    tags: ["prop_proportionnalite", "evolution", "template"],
    generate: () => genNouvelleValeur([5, 10, 15, 20, 25, 30, 40, 50]),
  },
  {
    kind: "fixed",
    id: "prop_evolution_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_evolution",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment calculer le pourcentage d’évolution entre deux valeurs.",
    format: "open",
    expected: ["variation", "départ", "100"],
    comparator: "contains_keyword",
    hint: "On compare la variation à la valeur de départ.",
    explanation:
      "Définition : le pourcentage d’évolution compare la variation à la valeur de départ.\n\n" +
      "Méthode : on calcule la variation (arrivée - départ), puis on divise par la valeur de départ et on multiplie par 100.\n\n" +
      "Calcul : pourcentage = (variation ÷ départ) × 100.\n\n" +
      "Conclusion : on rapporte la variation à la valeur de départ.",
    tags: ["prop_proportionnalite", "evolution", "open"],
  },

  // ---------- PROP_PROBLEME ----------
  {
    kind: "template",
    id: "prop_probleme_tpl_3_vitesse",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "La distance est proportionnelle au temps à vitesse constante.",
    tags: ["prop_proportionnalite", "probleme", "vitesse", "template"],
    generate: () => genProbleme(4),
  },
  {
    kind: "template",
    id: "prop_probleme_tpl_4_recette",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Produit en croix.",
    tags: ["prop_proportionnalite", "probleme", "recette", "template"],
    generate: () => genProbleme(3),
  },
  {
    kind: "fixed",
    id: "prop_probleme_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "5 L d’essence coûtent 10 €. Combien coûtent 8 L ?",
    format: "short",
    expected: ["16"],
    comparator: "number_equal",
    hint: "Prix d’un litre = 10 ÷ 5.",
    explanation:
      "Définition : le prix est proportionnel au volume.\n\n" +
      "Méthode : prix d’un litre = 10 ÷ 5 = 2 €.\n\n" +
      "Calcul : 8 × 2 = 16.\n\n" +
      "Conclusion : 8 L coûtent 16 €.",
    tags: ["prop_proportionnalite", "probleme"],
  },
  {
    kind: "fixed",
    id: "prop_probleme_open_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Explique deux méthodes pour résoudre un problème de proportionnalité.",
    format: "open",
    expected: ["coefficient", "produit en croix", "unité"],
    comparator: "contains_keyword",
    hint: "Coefficient, passage à l’unité, produit en croix.",
    explanation:
      "Définition : plusieurs méthodes résolvent un problème de proportionnalité.\n\n" +
      "Méthode : on peut utiliser le coefficient de proportionnalité, le passage à l’unité ou le produit en croix.\n\n" +
      "Calcul : chaque méthode mène au même résultat.\n\n" +
      "Conclusion : par exemple le produit en croix ou le passage à l’unité.",
    tags: ["prop_proportionnalite", "probleme", "open"],
  },

  // ---------- PROP_DEFIS ----------
  {
    kind: "fixed",
    id: "prop_defi_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_pourcentage_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un prix augmente de 10 % puis baisse de 10 %. Retrouve-t-on le prix de départ ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "On multiplie par 1,1 puis par 0,9.",
    explanation:
      "Définition : des évolutions successives se multiplient.\n\n" +
      "Méthode : coefficient global = 1,1 × 0,9.\n\n" +
      "Calcul : 1,1 × 0,9 = 0,99, donc le prix final est plus petit.\n\n" +
      "Conclusion : non, on ne retrouve pas le prix de départ.",
    tags: ["prop_proportionnalite", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "prop_defi_tpl_1_successif",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_pourcentage_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "On applique d’abord la première évolution, puis la seconde.",
    tags: ["prop_proportionnalite", "defi", "successif", "template"],
    generate: () => genSuccessives(true),
  },
  {
    kind: "fixed",
    id: "prop_defi_open_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_pourcentage_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi deux évolutions en pourcentage ne s’additionnent pas toujours simplement.",
    format: "open",
    expected: ["multiplie", "coefficient", "successif"],
    comparator: "contains_keyword",
    hint: "Les coefficients multiplicateurs se multiplient.",
    explanation:
      "Définition : des évolutions successives correspondent à des coefficients multiplicateurs.\n\n" +
      "Méthode : on multiplie les coefficients au lieu d’additionner les pourcentages.\n\n" +
      "Calcul : par exemple +10 % puis +10 % donne ×1,1×1,1 = ×1,21, soit +21 % (pas +20 %).\n\n" +
      "Conclusion : on multiplie les coefficients, donc les pourcentages ne s’additionnent pas simplement.",
    tags: ["prop_proportionnalite", "defi", "open"],
  },

  /* =========================================================
     GÉNÉRATEURS DES ÉTOILES QUI N'AVAIENT QUE DU FIGÉ — 30/09/2026
     À ces étoiles, le coach tournait sur 2 à 4 items figés ;
     dès qu'ils étaient épuisés, il les resservait (17 à 18 répétitions sur 20).
  ========================================================= */
  {
    kind: "template",
    id: "prop_reconnaitre_tpl_etoile1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Si une grandeur double, l’autre doit doubler aussi.",
    tags: ["prop_proportionnalite", "reconnaitre", "template"],
    generate: () => genReconnaitre(1),
  },
  {
    kind: "template",
    id: "prop_reconnaitre_tpl_etoile3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule le quotient pour CHAQUE relevé : il doit être toujours le même.",
    tags: ["prop_proportionnalite", "reconnaitre", "template"],
    generate: () => genReconnaitre(3),
  },
  {
    kind: "template",
    id: "prop_table_tpl_etoile1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 1,
    theme: "neutral",
    hint: "Regarde par combien on multiplie dans la première ligne.",
    tags: ["prop_proportionnalite", "tableau", "template", "canvas"],
    generate: () => genTableau(1),
  },
  {
    kind: "template",
    id: "prop_coeff_tpl_etoile1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 1,
    theme: "neutral",
    hint: "Coefficient = deuxième grandeur ÷ première grandeur.",
    tags: ["prop_proportionnalite", "coefficient", "template"],
    generate: () => genCoeff(1),
  },
  {
    kind: "template",
    id: "prop_defi_tpl_etoile4_affirmation",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Refais le calcul toi-même : en proportionnalité, on multiplie, on n’ajoute pas.",
    tags: ["prop_proportionnalite", "defi", "erreur", "template"],
    generate: () => genAffirmation(2),
  },
  {
    kind: "template",
    id: "prop_defi_tpl_etoile4_comparer",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Ramène chaque situation à une unité avant de comparer.",
    tags: ["prop_proportionnalite", "defi", "comparaison", "template"],
    generate: () => genComparer(2),
  },
  {
    kind: "template",
    id: "prop_pourcentage_tpl_etoile1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_pourcentage",
    difficulty: 1,
    theme: "neutral",
    hint: "10 %, c’est diviser par 10 ; 50 %, c’est la moitié ; 25 %, c’est le quart.",
    tags: ["prop_proportionnalite", "pourcentage", "template"],
    generate: () => genPourcentage(["partie", "aide"], [10, 20, 25, 50]),
  },
  {
    kind: "template",
    id: "prop_pourcentage_tpl_etoile1_fraction",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_pourcentage",
    difficulty: 1,
    theme: "neutral",
    hint: "p % = p/100, puis on simplifie la fraction.",
    tags: ["prop_proportionnalite", "pourcentage", "qcm", "template"],
    generate: () => genPourcentage(["fraction"], [10, 20, 25, 50, 75]),
  },
  {
    kind: "template",
    id: "prop_coeff_multiplicateur_tpl_etoile2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_coeff_multiplicateur",
    difficulty: 2,
    theme: "neutral",
    hint: "Hausse : 100 % + p % ; baisse : 100 % − p %. Puis divise par 100.",
    tags: ["prop_proportionnalite", "coefficient_multiplicateur", "qcm", "template"],
    generate: () => genCoeffMult("qcm", "mixte", [10, 20, 25, 30, 40, 50]),
  },
  {
    kind: "template",
    id: "prop_evolution_tpl_etoile2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_pourcentages",
    microId: "prop_evolution",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule d’abord p % de la valeur, puis ajoute-le ou retire-le.",
    tags: ["prop_proportionnalite", "evolution", "template"],
    generate: () => genNouvelleValeur([10, 20, 25, 50]),
  },
];