// ─── Fiche de cours : le calcul mental (6e) ────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/6e/maths/calcul-mental.bank.ts
// (notionId entier_calcul_mental).
//
// ⭐ RÉÉCRITE LE 30/09/2026 POUR DES 6e QUI LISENT DIFFICILEMENT : phrases
// courtes, une idée par phrase, un dessin sur CHAQUE bloc (ce sont les diapos
// du mode classe), et Ti Margo dans le champ `tiMargo`. Avant : 4 diapos
// débordaient (exemples +107 px, usages, pièges).
//
// Micro-compétences 6/6 :
// - entier_addition_mentale       → figure (47 + 8), propriété « Je coupe un
//                                   nombre » (134 + 28), exemple 1 (56 + 8),
//                                   entraînement 1 (68 + 7)
// - entier_soustraction_mentale   → propriété « Les compléments » (100 − 36),
//                                   méthode 3 (96 − 27), usage 1 (la monnaie),
//                                   exemple 4 (121 − 38), entraînement 2 (183 − 6)
// - entier_multiplication_mentale → propriété « Une table, deux calculs »
//                                   (9 × 7), méthode 2, exemple 2 (18 × 5),
//                                   entraînement 3 (11 × 9)
// - entier_division_mentale       → propriété « Une table, deux calculs »
//                                   (63 ÷ 7), usage 3 (63 mangues ÷ 9),
//                                   exemple 3 (56 ÷ 8), entraînement 4 (645 ÷ 10)
// - entier_strategie_mentale      → propriété « Arrondir puis corriger »
//                                   (99 + 47), méthodes 1 et 2, usage 2
//                                   (4,23 × 10), entraînement 5 (le quart de 28)
// - entier_calcul_mental_defi     → usage 1 (la monnaie), entraînement 6
//                                   (5 + 3 + 26), dessiné
// Nombres de la banque, sauf 47 + 8, 99 + 47, 100 − 36, 9 € sur 10 € (dessins
// de juin gardés). ⛔ La feuille `maths-6e-entier-calcul-mental.tsx` n'en
// reprend aucun (elle les exclut en tête).
//
// ⛔ PAS UN SEUL `calcul_pose` : le catalogue le réserve au calcul posé. Poser
// l'opération, c'est montrer ce qu'on demande de NE PAS faire.
// ⚠️ `number_line` écrit en 14 : cadre de 240 (11,8 px dans le bloc de 226
// d'un téléphone). `schema_barre` écrit en 12 : cadre de 240 au plus, et la
// phrase du bas se compte en caractères (vingt environ).

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

const BLEU = "#38BDF8";
const ORANGE = "#F97316";
const VERT = "#16a34a";
const ROUGE = "#F87171";

type Pt = { value: number; label: string; color?: string };

/** La droite de la fiche : cadre plat, réglages fixés une fois. */
const droite = (min: number, max: number, pas: number, points: Pt[]) => (
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min,
      max,
      step: pas,
      points,
      display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true },
      size: { width: 240, height: 95 },
    }}
  />
);

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

// ─── Les dessins ──────────────────────────────────────────────────────────────
// Trois familles qui alternent : la DROITE (un nombre rond tout près), la
// BARRE (un tout qu'on coupe) et le TABLEAU (ce qu'on sait par cœur). Deux
// blocs voisins ne portent jamais la même famille.

// LA FIGURE : 47 + 8 en deux sauts, par 50.
// ⚠️ `step: 3` : à `step: 1`, treize graduations se touchaient (mesuré le 24/08).
const droiteDizaine = legende(
  droite(45, 57, 3, [
    { value: 47, label: "47", color: BLEU },
    { value: 50, label: "50", color: ORANGE },
    { value: 55, label: "55", color: VERT },
  ]),
  "47 → 50 → 55"
);

// ON COUPE LE 28, PAS LE TOUT : deux parts comparables, lisibles.
// ⚠️ Couper 162 en 134 + 20 + 8 donnait des parts de 29 et 12 px (mesuré).
const barreDecomposition = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: "On coupe le 28",
      total: "28",
      parts: [
        { label: "d'abord", value: "20", color: ORANGE },
        { label: "ensuite", value: "8", color: "#00FF7F" },
      ],
      questionLabel: "134 → 154 → 162",
      size: { width: 240, height: 190 },
    }}
  />
);

// CE QU'ON SAIT PAR CŒUR : les paires qui font 10 et 100.
const memoDesComplements = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Les compléments",
      headers: ["à 10", "à 100"],
      rows: [
        { values: ["7 + 3", "70 + 30"] },
        { values: ["6 + 4", "64 + 36"] },
        { values: ["5 + 5", "55 + 45"] },
      ],
      highlight: { cell: { row: 1, col: 1 } },
      questionLabel: "36 + 64 = 100",
    }}
  />
);

// ⭐ LA TABLE SE LIT DANS LES DEUX SENS : en descendant × 7, en remontant ÷ 7.
const tableDansLesDeuxSens = legende(
  <CanvasRenderer
    figure={{
      kind: "tableau_proportionnalite",
      rows: 2,
      cols: 4,
      rowLabels: ["le nombre", "× 7"],
      values: [
        ["1", "5", "9", "10"],
        ["7", "35", "63", "70"],
      ],
      missing: [],
      highlightedCells: [{ row: 1, col: 2 }],
      display: { showRowLabels: true, showColLabels: false, showGrid: true },
      size: { width: 240, height: 150 },
    }}
  />,
  "9 × 7 = 63, donc 63 ÷ 7 = 9"
);

// LE 1 DE TROP, DEVENU UNE LONGUEUR : 147, c'est 146 plus un petit bout.
const barreDuTropPlein = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: "99 + 47 par 100 + 47",
      total: "147",
      parts: [
        { label: "la réponse", value: "146", color: "#00FF7F" },
        { label: "en trop", value: "1", color: ORANGE },
      ],
      questionLabel: "j'enlève le 1 de trop",
      size: { width: 240, height: 190 },
    }}
  />
);

// MÉTHODE 1 : OBSERVER. 99 est collé à 100.
const droiteDuNombreRond = legende(
  droite(95, 105, 5, [
    { value: 99, label: "99", color: BLEU },
    { value: 100, label: "100", color: ORANGE },
  ]),
  "99 est collé à 100"
);

// MÉTHODE 2 : CHOISIR L'ASTUCE. Ce que je vois → ce que je fais.
const tableauAstuces = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Je vois… je fais…",
      headers: ["Je vois", "Je fais"],
      rows: [
        { values: ["99, 98…", "je pars de 100"] },
        { values: ["× 5", "× 10, puis la moitié"] },
        { values: ["÷ 8", "je récite la table de 8"] },
      ],
      highlight: { row: 1 },
      display: { compact: true },
    }}
  />
);

// MÉTHODE 3 : VÉRIFIER DE LOIN. 96 − 27 : un peu moins de 70, pas 129.
const droiteDeLOrdreDeGrandeur = legende(
  droite(0, 140, 35, [
    { value: 69, label: "69", color: VERT },
    { value: 129, label: "129 ?", color: ROUGE },
  ]),
  "96 − 27 : autour de 70, pas 129"
);

// USAGE 1 : RENDRE LA MONNAIE. De 9 € à 10 €, il manque combien ?
const barreMonnaie = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      total: "10 €",
      parts: [
        { label: "les achats", value: "9 €", color: BLEU },
        { label: "rendu", unknown: true, color: ORANGE },
      ],
      questionLabel: "il manque combien ?",
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: true },
      size: { width: 210, height: 190 },
    }}
  />
);

// USAGE 2 : × 10, LES CHIFFRES GLISSENT D'UN RANG (4,23, banque).
const foisDix = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "4,23 × 10",
      headers: ["Dizaines", "Unités", ",", "Dixièmes", "Centièmes"],
      rows: [
        { label: "4,23", values: ["", "4", ",", "2", "3"] },
        { label: "× 10", values: ["4", "2", ",", "3", ""] },
      ],
      highlight: { row: 1 },
      caption: "Chaque chiffre avance d'un rang : 42,3",
    }}
  />
);

// USAGE 3 : PARTAGER. 63 mangues pour 9 enfants, 7 chacun (banque).
const barrePartage = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: "63 mangues, 9 enfants",
      total: "63",
      parts: Array.from({ length: 9 }, (_, i) => ({
        label: "",
        value: "7",
        color: i % 2 ? "#bbf7d0" : "#bfdbfe",
      })),
      questionLabel: "9 × 7 = 63",
      display: { showTotal: true, showPartLabels: false, showValues: true, showQuestion: true },
      size: { width: 240, height: 170 },
    }}
  />
);

// EXEMPLE 1 : 56 + 8 par 60 (banque).
const droite56 = legende(
  droite(54, 66, 3, [
    { value: 56, label: "56", color: BLEU },
    { value: 60, label: "60", color: ORANGE },
    { value: 64, label: "64", color: VERT },
  ]),
  "56 → 60 → 64"
);

// EXEMPLE 2 : × 5 = moitié de × 10, en barre : 180 coupé en deux 90.
// ⚠️ 210 : un bloc d'EXEMPLE ne fait que 199 px sur un téléphone (mesuré).
const barreFois5 = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      total: "180",
      parts: [
        { label: "18 × 5", value: "90", color: "#00FF7F" },
        { label: "18 × 5", value: "90", color: BLEU },
      ],
      questionLabel: "18 × 10 = 180, moitié : 90",
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: true },
      size: { width: 210, height: 190 },
    }}
  />
);

// EXEMPLE 3 : 56 ÷ 8 dans la table de 8 (banque).
const table8 = legende(
  <CanvasRenderer
    figure={{
      kind: "tableau_proportionnalite",
      rows: 2,
      cols: 4,
      rowLabels: ["le nombre", "× 8"],
      values: [
        ["5", "6", "7", "8"],
        ["40", "48", "56", "64"],
      ],
      missing: [],
      highlightedCells: [{ row: 1, col: 2 }],
      display: { showRowLabels: true, showColLabels: false, showGrid: true },
      size: { width: 240, height: 150 },
    }}
  />,
  "8 × 7 = 56, donc 56 ÷ 8 = 7"
);

// EXEMPLE 4 : 121 − 38. La barre montre que 83 et 38 refont 121.
const barre121 = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      total: "121",
      parts: [
        { label: "il reste", value: "83", color: "#00FF7F" },
        { label: "on enlève", value: "38", color: ORANGE },
      ],
      questionLabel: "121 − 40 = 81, + 2",
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: true },
      size: { width: 210, height: 190 },
    }}
  />
);

// LE DÉFI a son dessin : le ticket de caisse (banque).
// ⛔ Pas en barre : les parts sont proportionnelles, et « tarte » et « jus »
// (5 € et 3 € sur 34 €) se chevauchaient à 21 px d'écart (mesuré).
const barreAchats = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Le ticket de Léa",
      headers: ["Achat", "Prix (€)"],
      rows: [
        { values: ["tarte", 5] },
        { values: ["jus", 3] },
        { values: ["gâteau", 26] },
        { values: ["Total", "?"] },
      ],
      highlight: { row: 3 },
      questionLabel: "5 + 3 = 8, puis 8 + 26",
    }}
  />
);

// ─── Les textes courts ────────────────────────────────────────────────────────

const pieges = [
  "Oublier de corriger après avoir arrondi. 121 − 40 = 81, et il faut encore ajouter 2.",
  "Ajouter un zéro à un nombre à virgule. 4,23 × 10 = 42,3, pas 4,230.",
  "Poser l'opération dans sa tête. Je coupe plutôt en morceaux faciles.",
];

const aRetenir = [
  "Je passe par un nombre rond : 10, 50, 100.",
  "Une table sert deux fois : 9 × 7 = 63 et 63 ÷ 7 = 9.",
  "× 5, c'est × 10, puis la moitié.",
];

export const ficheCalculMental6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "entier-calcul-mental",
  titre: "Le calcul mental",
  accroche:
    "Calculer de tête, sans papier ni calculatrice. Le secret, ce sont quelques astuces.",
  identite: [
    { label: "Mots clés", valeur: "Nombre rond, complément, double, moitié" },
    { label: "Le secret", valeur: "Passer par un nombre rond" },
    { label: "Outil", valeur: "Ta tête, et les tables" },
  ],
  definition: {
    texte:
      "Calculer de tête, c'est calculer sans poser l'opération. On coupe le calcul en petites étapes faciles. On passe par des nombres ronds : 10, 50, 100.",
  },
  figure: {
    schema: droiteDizaine,
    legende: "47 + 8 : d'abord + 3 pour aller à 50, puis + 5.",
  },
  proprietes: [
    {
      titre: "Je coupe un nombre",
      micros: ["entier_addition_mentale", "entier_strategie_mentale"],
      texte: "Pour 134 + 28, j'ajoute 20, puis 8. Chaque étape est facile.",
      schema: barreDecomposition,
    },
    {
      titre: "Les compléments",
      micros: ["entier_soustraction_mentale"],
      texte: "Je connais les paires qui font 100. 100 − 36 = 64, car 36 + 64 = 100.",
      schema: memoDesComplements,
    },
    {
      titre: "Une table, deux calculs",
      micros: ["entier_multiplication_mentale", "entier_division_mentale"],
      texte: "Une table sert à multiplier et à diviser. 9 × 7 = 63, donc 63 ÷ 7 = 9.",
      schema: tableDansLesDeuxSens,
    },
    {
      titre: "Arrondir puis corriger",
      micros: ["entier_strategie_mentale"],
      texte: "Je remplace 99 par 100, puis je corrige. 100 + 47 = 147, donc 99 + 47 = 146.",
      schema: barreDuTropPlein,
    },
  ],
  reel: {
    texte:
      "À la boulangerie, on vérifie la monnaie rendue. Au goûter, on partage les gâteaux entre amis. Dans un jeu, on ajoute vite ses points. Pas besoin de calculatrice.",
  },
  historique: {
    texte:
      "Il y a plus de 2 000 ans, en Asie, on comptait avec un boulier. C'est un cadre avec des boules qui glissent. La calculatrice de poche arrive vers 1970. Avant, tout le monde calculait de tête.",
  },
  methode: [
    {
      titre: "J'observe",
      micros: ["entier_strategie_mentale"],
      texte: "Avant de calculer, je regarde les nombres. Un nombre rond est-il tout près ?",
      schema: droiteDuNombreRond,
    },
    {
      titre: "Je choisis l'astuce",
      micros: ["entier_strategie_mentale", "entier_multiplication_mentale"],
      texte: "Chaque calcul a son raccourci. Pour × 5, je fais × 10, puis la moitié.",
      schema: tableauAstuces,
    },
    {
      titre: "Je vérifie",
      micros: ["entier_soustraction_mentale"],
      texte: "Mon résultat est-il raisonnable ? 96 − 27 donne un peu moins de 70.",
      schema: droiteDeLOrdreDeGrandeur,
    },
  ],
  usages: [
    {
      titre: "Rendre la monnaie",
      micros: ["entier_soustraction_mentale", "entier_calcul_mental_defi"],
      detail: "J'achète pour 9 €, je paie avec 10 €. De 9 à 10, il manque 1 € : on me rend 1 €.",
      schema: barreMonnaie,
    },
    {
      titre: "Multiplier par 10",
      micros: ["entier_strategie_mentale"],
      detail: "Chaque chiffre avance d'un rang. 4,23 × 10 = 42,3.",
      schema: foisDix,
    },
    {
      titre: "Partager",
      micros: ["entier_division_mentale"],
      detail: "63 mangues pour 9 enfants. 9 × 7 = 63 : chacun en reçoit 7.",
      schema: barrePartage,
    },
  ],
  exemples: [
    {
      titre: "Passer par la dizaine",
      micros: ["entier_addition_mentale"],
      donnees: "On veut calculer 56 + 8 de tête.",
      question: "Combien font 56 + 8 ?",
      schema: droite56,
      solution: "56 + 4 = 60. Il reste 4 à ajouter. 60 + 4 = 64. Donc 56 + 8 = 64.",
    },
    {
      titre: "Multiplier par 5",
      micros: ["entier_multiplication_mentale"],
      donnees: "On veut calculer 18 × 5 de tête.",
      question: "Combien font 18 × 5 ?",
      schema: barreFois5,
      solution: "× 5, c'est × 10, puis la moitié. 18 × 10 = 180. La moitié de 180 est 90.",
    },
    {
      titre: "Diviser avec une table",
      micros: ["entier_division_mentale"],
      donnees: "On veut calculer 56 ÷ 8 de tête.",
      question: "Combien font 56 ÷ 8 ?",
      schema: table8,
      solution: "Je récite la table de 8. 8 × 7 = 56. Donc 56 ÷ 8 = 7.",
    },
    {
      titre: "Arrondir pour soustraire",
      micros: ["entier_soustraction_mentale", "entier_strategie_mentale"],
      donnees: "On veut calculer 121 − 38 de tête.",
      question: "Combien font 121 − 38 ?",
      schema: barre121,
      solution:
        "38 est presque 40. 121 − 40 = 81. J'ai enlevé 2 de trop. Je les rajoute : 81 + 2 = 83.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Calcule de tête : 68 + 7.",
      correction: "68 + 2 = 70, puis 70 + 5 = 75.",
      micros: ["entier_addition_mentale"],
    },
    {
      question: "Calcule de tête : 183 − 6.",
      correction: "183 − 3 = 180, puis 180 − 3 = 177.",
      micros: ["entier_soustraction_mentale"],
    },
    {
      question: "Calcule de tête : 11 × 9.",
      correction: "10 × 9 = 90. J'ajoute encore une fois 9 : 90 + 9 = 99.",
      micros: ["entier_multiplication_mentale"],
    },
    {
      question: "Calcule de tête : 645 ÷ 10.",
      correction: "Chaque chiffre recule d'un rang. 645 ÷ 10 = 64,5.",
      micros: ["entier_division_mentale"],
    },
    {
      question: "Donne le quart de 28.",
      correction: "Le quart, c'est la moitié de la moitié. 28 → 14 → 7.",
      micros: ["entier_strategie_mentale"],
    },
    {
      question: "Défi : Léa achète une tarte à 5 €, un jus à 3 € et un gâteau à 26 €. Combien paie-t-elle ?",
      correction: "5 + 3 = 8. Puis 8 + 26 = 34. Léa paie 34 €.",
      micros: ["entier_calcul_mental_defi"],
      schema: barreAchats,
    },
  ],
  tiMargo: {
    objectif: "Pas de papier : juste ta tête !",
    definition: "Un nombre rond, c'est un raccourci !",
    methode: "J'observe avant de calculer !",
    pieges: "J'ai arrondi ? Je corrige !",
    retenir: "Une table, deux calculs !",
    exercice: "À toi ! Cherche la dizaine.",
  },
  coachHref: "/coach-ia/maths?classe=6e",
};

// Le mode classe est ENGENDRÉ depuis la fiche (`slidesDepuisFiche`) : ce
// tableau reste exporté pour la page, mais il n'est pas projeté.
// ⛔ AUCUN LATEX DANS LES DIAPOS.
export const slidesCalculMental6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Calcul mental - 6e",
    schema: droiteDizaine,
    section: {
      type: "objectif",
      phrase: "Calculer de tête, sans poser l'opération",
      sousPhrase: "47 + 8 : d'abord 50, puis 55.",
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Multiplier par 5",
    teinte: "exemple",
    schema: barreFois5,
    section: {
      type: "exemple",
      enonce: "On veut calculer 18 × 5 de tête.",
      question: "Combien font 18 × 5 ?",
      correction: "18 × 10 = 180, et la moitié de 180 est 90.",
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    schema: barreAchats,
    section: {
      type: "exercice",
      enonce: "Une tarte à 5 €, un jus à 3 €, un gâteau à 26 €.",
      question: "Combien paie-t-on en tout ?",
      indice: "Commence par 5 + 3.",
      correction: "5 + 3 = 8, puis 8 + 26 = 34 €.",
    },
  },
];
