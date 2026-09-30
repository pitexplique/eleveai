// ─── Fiche de cours : le calcul posé (6e) ──────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/6e/maths/calcul-pose.bank.ts (notionId entier_calcul_pose).
//
// ⭐ RÉÉCRITE LE 30/09/2026 POUR DES 6e QUI LISENT DIFFICILEMENT : phrases
// courtes, une idée par phrase, un dessin sur CHAQUE bloc (ce sont les diapos
// du mode classe), et Ti Margo dans le champ `tiMargo`.
//
// Micro-compétences 6/6 :
// - entier_addition_posee       → figure (475 + 286), propriétés « J'aligne »
//                                 et « La retenue » (168 + 47), méthode 1
//                                 (347 + 25), usage 1 (126 + 248), exemple 1
//                                 (128 + 247), entraînement 1 (348 + 275)
// - entier_soustraction_posee   → méthode 2 (425 − 78), usage 2 (450 − 175),
//                                 exemple 2 (632 − 458)
// - entier_multiplication_posee → usage 3 (24 × 6), exemple 3 (126 × 4),
//                                 entraînement 2 (267 × 4)
// - entier_division_posee       → propriété « Le reste est plus petit »
//                                 (37 ÷ 5), exemple 4 (58 ÷ 7), entraînement 3
//                                 (47 ÷ 5 = 8 reste 7, faux)
// - entier_calcul_verifier      → propriété « Je vérifie » (174 + 458),
//                                 méthode 3 (ordre de grandeur), entraînement 4
// - entier_calcul_pose_defi     → usages (choisir l'opération), entraînement 5
//                                 (96 feuilles ÷ 8), dessiné
// Nombres de la banque, sauf les dessins de juin gardés (475 + 286, 168 + 47,
// 347 + 25, 425 − 78, 632 − 458, 58 ÷ 7, 267 × 4, 348 + 275) et 500 − 136.
// ⛔ La feuille `maths-6e-entier-calcul-pose.tsx` n'en reprend aucun.
//
// ⭐ ICI LE CANVAS EST IMPOSÉ : une fiche sur le calcul POSÉ montre des calculs
// posés. Chaque dessin met autre chose en avant (une colonne, une retenue,
// l'opération inverse, un alignement faux), et la barre, le tableau et la
// droite coupent les suites de calculs posés.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

/** Une opération posée par le moteur du coach, retenues en option. */
function pose(
  operation: "addition" | "soustraction" | "multiplication",
  numbers: string[],
  result: string,
  retenues?: string[],
  title?: string
) {
  return (
    <CanvasRenderer
      figure={{
        kind: "calcul_pose",
        operation,
        numbers,
        result,
        ...(retenues ? { retenues } : {}),
        ...(title ? { title } : {}),
        display: { showResult: true },
      }}
    />
  );
}

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

// ─── Les dessins ──────────────────────────────────────────────────────────────

// LA FIGURE : 475 + 286, chaque chiffre sous celui de même rang.
const figure475 = pose("addition", ["475", "286"], "761", ["1", "1", ""]);

// ⭐ L'ALIGNEMENT FAUX, LE SEUL CONTRE-EXEMPLE : aucun canvas de calcul ne
// sait poser DE TRAVERS, d'où le tableau.
const alignementFaux = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "347 + 25, mal posé",
      headers: ["Centaines", "Dizaines", "Unités", "?"],
      rows: [
        { label: "347", values: ["3", "4", "7", ""] },
        { label: "25 décalé", values: ["", "", "2", "5"] },
      ],
      highlight: { cell: { row: 1, col: 3 } },
      caption: "Le 5 sort des unités : c'est faux.",
    }}
  />
);

// ⭐ LA RETENUE ÉCRITE, PAS RACONTÉE.
const laRetenueEcrite = legende(
  pose("addition", ["168", "47"], "215", ["1", "1", ""], "168 + 47"),
  "8 + 7 = 15 : j'écris 5, je retiens 1"
);

// LE RESTE, VU : 37 en paquets de 5 (banque). 7 paquets, et 2 qui restent.
const barreReste = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: "37 en paquets de 5",
      total: "37",
      parts: [
        ...Array.from({ length: 7 }, (_, i) => ({
          label: "",
          value: "5",
          color: i % 2 ? "#bbf7d0" : "#bfdbfe",
        })),
        { label: "", value: "2", color: "#fecaca" },
      ],
      questionLabel: "7 paquets, reste 2",
      display: { showTotal: true, showPartLabels: false, showValues: true, showQuestion: true },
      size: { width: 240, height: 170 },
    }}
  />
);

// VÉRIFIER UNE SOUSTRACTION, C'EST FAIRE UNE ADDITION : 174 + 458 = 632.
const verifierParLInverse = legende(
  pose("addition", ["174", "458"], "632", ["1", "1", ""], "La vérification"),
  "174 + 458 = 632 : 632 − 458 = 174 est juste"
);

// MÉTHODE 1 : la colonne des unités, allumée.
const colonneDesUnites = legende(
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "addition",
      title: "347 + 25",
      numbers: ["347", "25"],
      result: "372",
      highlight: { col: 0 },
      display: { showResult: true },
    }}
  />,
  "le 5 sous le 7, pas sous le 4"
);

// MÉTHODE 2 : la soustraction qui fait peur, avec son emprunt.
const soustractionAvecRetenue = legende(
  pose("soustraction", ["425", "78"], "347", ["", "1", "1"], "425 − 78"),
  "5 − 8, impossible : je fais 15 − 8"
);

// MÉTHODE 3 : VÉRIFIER SANS CALCULER. 425 − 78, c'est autour de 350.
const ordreDeGrandeur = legende(
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 0,
      max: 500,
      step: 100,
      points: [
        { value: 347, label: "347", color: "#16a34a" },
        { value: 480, label: "480 ?", color: "#dc2626" },
      ],
      display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true },
      size: { width: 240, height: 95 },
    }}
  />,
  "425 − 78 : autour de 350, pas 480"
);

// USAGE 1 : regrouper les mangues du matin et du soir (banque).
const usageAddition = pose("addition", ["126", "248"], "374", ["", "1", ""], "126 + 248");

// USAGE 2 : 450 cahiers, on en donne 175. La barre montre ce qui reste.
const usageSoustraction = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: "450 cahiers",
      total: "450",
      parts: [
        { label: "donnés", value: "175", color: "#fecaca" },
        { label: "restent", unknown: true, color: "#bbf7d0" },
      ],
      questionLabel: "450 − 175 = ?",
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: true },
      size: { width: 240, height: 190 },
    }}
  />
);

// USAGE 3 : 24 sacs de 6 stylos (banque).
const usageMultiplication = pose("multiplication", ["24", "6"], "144", ["2", ""], "24 × 6");

// EXEMPLES
const exemple128 = pose("addition", ["128", "247"], "375", ["", "1", ""]);
const exemple632 = pose("soustraction", ["632", "458"], "174", ["", "1", "1"]);
const exemple126 = pose("multiplication", ["126", "4"], "504", ["1", "2", ""]);
const poseDivision = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "division",
      numbers: ["58", "7"],
      division: { dividende: "58", diviseur: "7", quotient: "8", reste: "2" },
      display: { showResult: true },
    }}
  />
);

// LE DÉFI a son dessin : 96 feuilles pour 8 groupes, qui a combien ?
const defiPartage = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: "96 feuilles, 8 groupes",
      total: "96",
      parts: Array.from({ length: 8 }, (_, i) => ({
        label: "",
        unknown: true,
        color: i % 2 ? "#bbf7d0" : "#bfdbfe",
      })),
      questionLabel: "8 parts égales",
      display: { showTotal: true, showPartLabels: false, showValues: true, showQuestion: true },
      size: { width: 240, height: 170 },
    }}
  />
);

// ─── Les textes courts ────────────────────────────────────────────────────────

const pieges = [
  "Oublier une retenue. Tout le calcul devient faux.",
  "Mal aligner les chiffres. On ajoute alors des unités à des dizaines.",
  "Garder un reste plus grand que le diviseur. On peut encore faire un paquet.",
];

const aRetenir = [
  "J'aligne les chiffres de même rang : unités sous unités.",
  "Je calcule de droite à gauche, sans oublier les retenues.",
  "Je vérifie avec l'opération inverse ou un ordre de grandeur.",
];

export const ficheCalculPose6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "entier-calcul-pose",
  titre: "Le calcul posé",
  accroche:
    "Pas de calculatrice ? On pose le calcul en colonnes. Ainsi, on calcule de grands nombres sans se tromper.",
  identite: [
    { label: "Mots clés", valeur: "Colonne, retenue, quotient, reste" },
    { label: "Le secret", valeur: "Unités sous unités" },
    { label: "Outil", valeur: "Le papier à carreaux : un chiffre par carreau" },
  ],
  definition: {
    texte:
      "Poser une opération, c'est écrire les nombres en colonnes. Les unités vont sous les unités, les dizaines sous les dizaines. On calcule colonne par colonne, en partant de la droite.",
  },
  figure: {
    schema: figure475,
    legende: "475 + 286 = 761 : chaque chiffre sous celui de même rang.",
  },
  proprietes: [
    {
      titre: "J'aligne les rangs",
      micros: ["entier_addition_posee", "entier_soustraction_posee"],
      texte: "Unités sous unités, dizaines sous dizaines. Sinon, le résultat est faux.",
      schema: alignementFaux,
    },
    {
      titre: "Je gère la retenue",
      micros: ["entier_addition_posee"],
      texte: "Une colonne dépasse 9 ? J'écris les unités et je retiens 1 dans la colonne de gauche.",
      schema: laRetenueEcrite,
    },
    {
      titre: "Le reste est plus petit",
      micros: ["entier_division_posee"],
      texte: "Dans une division, le reste est plus petit que le diviseur. 37 ÷ 5 : 7 paquets, reste 2.",
      schema: barreReste,
    },
    {
      titre: "Je vérifie par l'inverse",
      micros: ["entier_calcul_verifier"],
      texte: "Une addition vérifie une soustraction. 632 − 458 = 174, car 174 + 458 = 632.",
      schema: verifierParLInverse,
    },
  ],
  reel: {
    texte:
      "On pose un calcul quand on n'a pas de calculatrice. Le club additionne les points de la saison. La cantine partage les fruits entre les tables. On multiplie le prix d'un cahier par le nombre de cahiers.",
  },
  historique: {
    texte:
      "Vers l'an 820, le savant Al-Khwarizmi vit à Bagdad. Il explique comment calculer étape par étape. Son nom a donné le mot « algorithme ». Un algorithme, c'est une suite d'étapes dans l'ordre.",
  },
  methode: [
    {
      titre: "J'aligne",
      micros: ["entier_addition_posee"],
      texte: "J'écris les unités sous les unités. Pour 347 + 25, le 5 va sous le 7.",
      schema: colonneDesUnites,
    },
    {
      titre: "Je calcule de droite à gauche",
      micros: ["entier_soustraction_posee"],
      texte: "Je commence par les unités. Je n'oublie aucune retenue.",
      schema: soustractionAvecRetenue,
    },
    {
      titre: "Je vérifie l'ordre de grandeur",
      micros: ["entier_calcul_verifier"],
      texte: "Avant, j'estime le résultat. 425 − 78, c'est autour de 350.",
      schema: ordreDeGrandeur,
    },
  ],
  usages: [
    {
      titre: "Regrouper : j'additionne",
      micros: ["entier_addition_posee", "entier_calcul_pose_defi"],
      detail: "126 mangues le matin, 248 le soir. En tout : 126 + 248 = 374.",
      schema: usageAddition,
    },
    {
      titre: "Enlever : je soustrais",
      micros: ["entier_soustraction_posee", "entier_calcul_pose_defi"],
      detail: "450 cahiers, on en donne 175. Il en reste 450 − 175 = 275.",
      schema: usageSoustraction,
    },
    {
      titre: "Répéter : je multiplie",
      micros: ["entier_multiplication_posee", "entier_calcul_pose_defi"],
      detail: "24 sacs de 6 stylos. En tout : 24 × 6 = 144 stylos.",
      schema: usageMultiplication,
    },
  ],
  exemples: [
    {
      titre: "Une addition avec retenue",
      micros: ["entier_addition_posee"],
      donnees: "Un collège reçoit 128 livres, puis 247 livres.",
      question: "Combien de livres en tout ?",
      schema: exemple128,
      solution:
        "Unités : 8 + 7 = 15. J'écris 5, je retiens 1. Dizaines : 2 + 4 + 1 = 7. Centaines : 1 + 2 = 3. Il y a 375 livres.",
    },
    {
      titre: "Une soustraction avec emprunt",
      micros: ["entier_soustraction_posee"],
      donnees: "On calcule 632 − 458.",
      question: "Combien font 632 − 458 ?",
      schema: exemple632,
      solution: "Unités : 12 − 8 = 4. Dizaines : 12 − 5 = 7. Centaines : 5 − 4 = 1. Résultat : 174.",
    },
    {
      titre: "Une multiplication",
      micros: ["entier_multiplication_posee"],
      donnees: "On calcule 126 × 4.",
      question: "Combien font 126 × 4 ?",
      schema: exemple126,
      solution:
        "6 × 4 = 24 : j'écris 4, je retiens 2. 2 × 4 + 2 = 10 : j'écris 0, je retiens 1. 1 × 4 + 1 = 5. Résultat : 504.",
    },
    {
      titre: "Une division",
      micros: ["entier_division_posee", "entier_calcul_verifier"],
      donnees: "On partage 58 en paquets de 7.",
      question: "Quel est le quotient ? Quel est le reste ?",
      schema: poseDivision,
      solution:
        "7 × 8 = 56, c'est le plus près de 58. Le quotient est 8. Le reste est 58 − 56 = 2. Vérification : 7 × 8 + 2 = 58.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Pose et calcule : 348 + 275.",
      correction: "8 + 5 = 13 : j'écris 3, je retiens 1. 4 + 7 + 1 = 12 : j'écris 2, je retiens 1. 3 + 2 + 1 = 6. Résultat : 623.",
      micros: ["entier_addition_posee"],
    },
    {
      question: "Pose et calcule : 267 × 4.",
      correction: "7 × 4 = 28 : j'écris 8, je retiens 2. 6 × 4 + 2 = 26 : j'écris 6, je retiens 2. 2 × 4 + 2 = 10. Résultat : 1 068.",
      micros: ["entier_multiplication_posee"],
    },
    {
      question: "Un élève écrit : 47 ÷ 5 = 8 reste 7. Pourquoi est-ce faux ?",
      correction: "Le reste 7 est plus grand que 5 : on peut faire un paquet de plus. 47 = 5 × 9 + 2. Le quotient est 9, le reste 2.",
      micros: ["entier_division_posee"],
    },
    {
      question: "On lit : 500 − 136 = 374. Vérifie avec une addition.",
      correction: "374 + 136 = 510, pas 500. C'est faux. Le bon résultat est 364, car 364 + 136 = 500.",
      micros: ["entier_calcul_verifier", "entier_soustraction_posee"],
    },
    {
      question: "Défi : on partage 96 feuilles entre 8 groupes. Quelle opération ? Combien par groupe ?",
      correction: "Partager en parts égales, c'est diviser : 96 ÷ 8. 8 × 12 = 96. Chaque groupe a 12 feuilles.",
      micros: ["entier_calcul_pose_defi", "entier_division_posee"],
      schema: defiPartage,
    },
  ],
  tiMargo: {
    objectif: "Un chiffre par case, et tout s'aligne !",
    definition: "Unités sous unités, toujours !",
    methode: "Je commence par la droite !",
    pieges: "Une retenue oubliée, et tout est faux !",
    retenir: "Je vérifie avec l'opération inverse !",
    exercice: "À toi ! Aligne d'abord les unités.",
  },
  coachHref: "/coach-ia/maths?classe=6e",
};

// Le mode classe est ENGENDRÉ depuis la fiche (`slidesDepuisFiche`) : ce
// tableau reste exporté pour la page, mais il n'est pas projeté.
// ⛔ AUCUN LATEX DANS LES DIAPOS.
export const slidesCalculPose6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Calcul posé - 6e",
    schema: figure475,
    section: {
      type: "objectif",
      phrase: "Calculer de grands nombres sans calculatrice",
      sousPhrase: "Unités sous unités, puis colonne par colonne.",
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Division",
    teinte: "exemple",
    schema: poseDivision,
    section: {
      type: "exemple",
      enonce: "On partage 58 en paquets de 7.",
      question: "Quotient et reste ?",
      correction: "7 × 8 = 56 : quotient 8, reste 2.",
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    schema: defiPartage,
    section: {
      type: "exercice",
      enonce: "96 feuilles pour 8 groupes.",
      question: "Combien par groupe ?",
      indice: "Partager, c'est diviser.",
      correction: "96 ÷ 8 = 12 feuilles.",
    },
  },
];
