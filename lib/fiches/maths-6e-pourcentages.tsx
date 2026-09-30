// ─── Fiche de cours : les pourcentages (6e) ────────────────────────────────────
// Fiche DÉCOUVERTE alignée sur la banque du coach
// lib/tutor-v4/questionBank/6e/maths/pourcentages.bank.ts
// (notionId pourcentage_nombre). La 5e reprend ensuite les calculs généraux.
//
// ⭐ RÉÉCRITE LE 30/09/2026 AU STANDARD DES 6e QUI LISENT DIFFICILEMENT :
// phrases courtes, une idée par phrase, un dessin sur CHAQUE bloc, Ti Margo en
// mode classe (champ `tiMargo`). Les dessins justes de juin sont gardés.
// ⛔ Les trois barres empilées des « repères » (juin) faisaient déborder leur
// diapo de 290 px : un seul diagramme en barres les remplace.
//
// Micro-compétences 6/6 (le champ `micros` de chaque bloc fait foi) :
// - pourcentage_comprendre    → définition + figure (grille 25), propriété 1
//                               (25 et 75 font 100), entraînement 1
// - pourcentage_fraction      → propriété 2, réflexe 2, exemple 1 (75 %),
//                               entraînement 2
// - pourcentage_decimal       → propriété 2, réflexe 2 (0,25 sur la droite),
//                               usage 3 (5 % = 0,05), exemple 1, entraînement 2
// - pourcentage_lire          → réflexe 1 (grille 20), usage 1 (−50 %),
//                               exemple 2 (60 bonbons), entraînement 3
// - pourcentage_calcul_simple → propriété 3 (les repères), formule (10 % de 60),
//                               réflexe 3 (25 % de 20), exemple 3 (50 % de 18),
//                               entraînement 4
// - pourcentage_defi          → usage 2 (basket 25 %, foot 50 %), entraînement 3
//                               (8 cartes brillantes)
// Tous les nombres sortent de la banque. ⛔ Aucun exemple commun avec la feuille
// `lib/fiches-exercices/maths-6e-pourcentage-nombre.tsx` (elle évite les nôtres).
//
// ⛔ AUCUN LATEX : « 25 % », « 25/100 » s'écrivent en clair, le mode classe les
// projette sans KaTeX.
// ⚠️ TOUTES LES `size` SONT MESURÉES : `fraction` à 250 (police 13 → 11,7 px en
// carte), `number_line` à 260, `schema_barre` sous 245, `stat_graph` à 210.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { avecMargo } from "@/components/fiches/TiMargoBulle";

const BLEU = "#2563eb";
const GRIS = "#94a3b8";

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

/** La grille de 100 carreaux du coach (10 × 10) : p carreaux coloriés = p %. */
const grille = (colories: number) => (
  <CanvasRenderer
    figure={{ kind: "fraction", model: "grid", grid: { rows: 10, cols: 10, shaded: colories }, size: { width: 250, height: 200 } }}
  />
);

// ─── Les dessins ──────────────────────────────────────────────────────────────

// LA FIGURE : 25 carreaux sur 100.
const grille25 = grille(25);

// PROPRIÉTÉ 1 : le tout fait 100. 25 d'un côté, 75 de l'autre.
const barreSurCent = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: "Le tout = 100 %",
      total: "100 %",
      parts: [
        { label: "25 %", value: "25", color: BLEU },
        { label: "le reste", value: "75", color: GRIS },
      ],
      questionLabel: "25 + 75 = 100",
      size: { width: 240, height: 190 },
    }}
  />
);

// PROPRIÉTÉ 2 : trois écritures, trois colonnes courtes.
const lesTroisEcritures = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Le même nombre, 3 façons",
      headers: ["En %", "Fraction", "Décimal"],
      rows: [
        { values: ["25 %", "25/100", "0,25"] },
        { values: ["50 %", "50/100", "0,5"] },
        { values: ["10 %", "10/100", "0,1"] },
      ],
      highlight: { row: 0 },
    }}
  />
);

// PROPRIÉTÉ 3 : les trois repères, en barres. La hauteur dit la taille de la part.
const lesReperes = (
  <CanvasRenderer
    figure={{
      kind: "stat_graph",
      graphType: "barres",
      title: "Les repères (en %)",
      data: [
        { label: "moitié", value: 50, color: "#bfdbfe" },
        { label: "quart", value: 25, color: "#bbf7d0" },
        { label: "dixième", value: 10, color: "#fde68a" },
      ],
      display: { showValues: true, showLabels: true },
      size: { width: 210, height: 180 },
    }}
  />
);

// LA FORMULE : 10 % de 60, d'une ligne à l'autre du tableau.
const dixPourCentDeSoixante = (
  <CanvasRenderer
    figure={{
      kind: "tableau_proportionnalite",
      rows: 2,
      cols: 2,
      rowLabels: ["le tout", "10 % du tout"],
      values: [
        ["100", "60"],
        ["10", "6"],
      ],
      missing: [],
      highlightedCells: [{ row: 1, col: 1 }],
      display: { showRowLabels: true, showColLabels: false, showGrid: true },
      size: { width: 240, height: 150 },
    }}
  />
);

// RÉFLEXE 1 : lire, c'est compter les carreaux. 20 sur 100.
const grille20 = legende(grille(20), "20 carreaux sur 100 : 20 %");

// RÉFLEXE 2 : le même nombre sur la droite des décimaux.
const surLaDroiteDesDecimaux = legende(
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 0,
      max: 1,
      step: 0.25,
      points: [{ value: 0.25, label: "25 %", color: BLEU }],
      display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true, showZero: true },
      size: { width: 260, height: 90 },
    }}
  />,
  "25 % tombe sur 0,25"
);

// RÉFLEXE 3 : 25 %, c'est le quart. 20 en 4 parts de 5.
const quartDeVingt = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: "25 % de 20",
      total: "20",
      parts: [
        { label: "25 %", value: "5", color: BLEU },
        { label: "", value: "5" },
        { label: "", value: "5" },
        { label: "", value: "5" },
      ],
      questionLabel: "Le quart : 20 ÷ 4 = 5",
      size: { width: 240, height: 190 },
    }}
  />
);

// USAGE 1 : « −50 % » sur une étiquette.
const soldes = (
  <CanvasRenderer
    figure={{
      kind: "fraction",
      model: "bar",
      fraction: { numerator: 1, denominator: 2, label: "−50 % = la moitié" },
      size: { width: 250, height: 200 },
    }}
  />
);

// USAGE 2 : sur 100 élèves, basket 25 %, foot 50 %.
const sports = (
  <CanvasRenderer
    figure={{
      kind: "stat_graph",
      graphType: "camembert",
      title: "100 élèves",
      data: [
        { label: "foot", value: 50, color: "#bfdbfe" },
        { label: "basket", value: 25, color: "#fde68a" },
        { label: "autre", value: 25, color: "#e2e8f0" },
      ],
      display: { showValues: true, showLabels: true },
      size: { width: 210, height: 180 },
    }}
  />
);

// USAGE 3 : 5 % n'est pas 0,5.
const cinqPourCent = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["Pourcentage", "Décimal"],
      rows: [
        { values: ["5 %", "0,05"] },
        { values: ["50 %", "0,5"] },
      ],
      highlight: { cell: { row: 0, col: 1 } },
      questionLabel: "5 sur 100 : deux chiffres après la virgule",
    }}
  />
);

// EXEMPLES
const grille75 = grille(75);
const bonbons = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: "100 bonbons",
      total: "100",
      parts: [
        { label: "rouges", value: "60", color: "#fecaca" },
        { label: "autres", value: "40", color: "#e2e8f0" },
      ],
      questionLabel: "60 % de 100 = 60",
      size: { width: 240, height: 190 },
    }}
  />
);
const moitieDeDixHuit = (
  <CanvasRenderer
    figure={{
      kind: "fraction",
      model: "circle",
      fraction: { numerator: 1, denominator: 2, label: "50 %" },
      size: { width: 250, height: 200 },
    }}
  />
);

const pieges = [
  "Lire % comme « sur 10 ». % veut toujours dire « sur 100 ».",
  "Écrire 5 % = 0,5. C'est faux : 5 % = 0,05.",
  "Oublier le tout. 50 % de 18, c'est 9, pas 50.",
];

const aRetenir = [
  "% veut dire « sur 100 » : 25 % = 25/100.",
  "Trois écritures d'un même nombre : 25 % = 25/100 = 0,25.",
  "50 %, la moitié. 25 %, le quart. 10 %, le dixième.",
];

export const fichePourcentages6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "pourcentage-nombre",
  titre: "Les pourcentages",
  accroche:
    "Le signe % veut dire « sur 100 ». On apprend à le lire, à l'écrire autrement et à calculer 50 %, 25 % ou 10 %.",
  identite: [
    { label: "Mots clés", valeur: "Pour cent, sur 100" },
    { label: "Le secret", valeur: "25 % = 25 sur 100" },
    { label: "Repères", valeur: "50 % = moitié, 25 % = quart, 10 % = dixième" },
  ],
  definition: {
    texte:
      "Le signe % veut dire « sur 100 ». 25 %, c'est 25 parts sur 100 parts égales. C'est la fraction 25/100.",
  },
  figure: {
    schema: grille25,
    legende: "25 carreaux coloriés sur 100 : 25 %.",
  },
  proprietes: [
    {
      titre: "Le tout fait 100 %",
      micros: ["pourcentage_comprendre"],
      texte: "Un tout entier, c'est 100 %. Si 25 % sont pris, il reste 75 %.",
      schema: barreSurCent,
    },
    {
      titre: "Trois écritures",
      micros: ["pourcentage_fraction", "pourcentage_decimal"],
      texte: "Un même nombre s'écrit de trois façons. 25 % = 25/100 = 0,25.",
      schema: lesTroisEcritures,
    },
    {
      titre: "Les repères",
      micros: ["pourcentage_calcul_simple"],
      texte: "50 %, c'est la moitié. 25 %, le quart. 10 %, le dixième.",
      schema: lesReperes,
    },
  ],
  reel: {
    texte:
      "La batterie d'un téléphone s'affiche en %. Les soldes aussi : −50 %, c'est moitié prix. La barre de téléchargement d'un jeu va de 0 à 100 %. Les étiquettes des aliments en sont pleines.",
  },
  historique: {
    texte:
      "« Pour cent » vient du latin « per centum ». Cela veut dire « sur cent ». Les marchands italiens comptaient déjà ainsi il y a 500 ans. Le signe % vient de « cento », écrit très vite.",
  },
  formule: {
    contexte: "Calculer un pourcentage d'un nombre",
    expression: "p % de N = N × p ÷ 100",
    legende: "10 % de 60 = 60 × 10 ÷ 100 = 6. C'est aussi 60 ÷ 10.",
    schema: dixPourCentDeSoixante,
  },
  methode: [
    {
      titre: "Je lis « sur 100 »",
      micros: ["pourcentage_lire"],
      texte: "Je remplace % par « sur 100 ». 20 %, c'est 20 sur 100.",
      schema: grille20,
    },
    {
      titre: "Je traduis",
      micros: ["pourcentage_fraction", "pourcentage_decimal"],
      texte: "J'écris le nombre sur 100. Puis je divise par 100 : 25 % = 25/100 = 0,25.",
      schema: surLaDroiteDesDecimaux,
    },
    {
      titre: "Je cherche un repère",
      micros: ["pourcentage_calcul_simple"],
      texte: "Moitié, quart ou dixième ? 25 % de 20, c'est le quart de 20 : 5.",
      schema: quartDeVingt,
    },
  ],
  usages: [
    {
      titre: "Les soldes",
      micros: ["pourcentage_lire"],
      detail: "Une étiquette affiche −50 %. On enlève la moitié du prix.",
      schema: soldes,
    },
    {
      titre: "Comparer deux groupes",
      micros: ["pourcentage_defi"],
      detail: "Sur 100 élèves, 25 % font du basket et 50 % du foot. Le foot est le plus pratiqué.",
      schema: sports,
    },
    {
      titre: "Écrire en décimal",
      micros: ["pourcentage_decimal"],
      detail: "5 %, c'est 5 sur 100. En décimal : 0,05, et pas 0,5.",
      schema: cinqPourCent,
    },
  ],
  exemples: [
    {
      titre: "Trois écritures",
      micros: ["pourcentage_fraction", "pourcentage_decimal"],
      donnees: "On regarde 75 %.",
      question: "Écris 75 % en fraction, puis en décimal.",
      schema: grille75,
      solution: "75 %, c'est 75 sur 100 : 75/100. C'est aussi les trois quarts : 3/4. En décimal : 0,75.",
    },
    {
      titre: "Lire une situation",
      micros: ["pourcentage_lire"],
      donnees: "Sur 100 bonbons, 60 % sont rouges.",
      question: "Combien y a-t-il de bonbons rouges ?",
      schema: bonbons,
      solution: "60 %, c'est 60 sur 100. Il y a justement 100 bonbons. Donc 60 bonbons sont rouges.",
    },
    {
      titre: "Calculer avec un repère",
      micros: ["pourcentage_calcul_simple"],
      donnees: "On cherche 50 % de 18.",
      question: "Combien font 50 % de 18 ?",
      schema: moitieDeDixHuit,
      solution: "50 %, c'est la moitié. La moitié de 18, c'est 18 ÷ 2 = 9. Donc 50 % de 18 = 9.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Que veut dire 40 % ?",
      correction: "40 sur 100. Sur 100 élèves, cela ferait 40 élèves.",
      micros: ["pourcentage_comprendre"],
    },
    {
      question: "Écris 25 % en fraction, puis en décimal.",
      correction: "25 % = 25/100 = 0,25. C'est aussi 1/4 : le quart.",
      micros: ["pourcentage_fraction", "pourcentage_decimal"],
    },
    {
      question: "Dans une collection de 100 cartes, 8 % sont brillantes. Combien y en a-t-il ?",
      correction: "8 %, c'est 8 sur 100. Il y a 100 cartes. Donc 8 cartes sont brillantes.",
      micros: ["pourcentage_lire", "pourcentage_defi"],
    },
    {
      question: "Calcule 10 % de 40, puis 50 % de 24.",
      correction: "10 %, c'est le dixième : 40 ÷ 10 = 4. 50 %, c'est la moitié : 24 ÷ 2 = 12.",
      micros: ["pourcentage_calcul_simple"],
    },
  ],
  tiMargo: {
    objectif: "% veut dire « sur 100 » !",
    definition: "25 %, c'est 25 carreaux sur 100 !",
    formule: "10 %, c'est le dixième : je divise par 10 !",
    methode: "Je cherche d'abord un repère !",
    pieges: "5 %, c'est 0,05, pas 0,5 !",
    exercice: "À toi ! Pense « sur 100 ».",
  },
  coachHref: "/coach-ia/maths?classe=6e",
};

// ⛔ Ce tableau n'est plus projeté (le mode classe est engendré par la fiche,
// `slidesDepuisFiche`) : la page le passe encore, il reste court.
export const slidesPourcentages6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Pourcentages - 6e",
    teinte: "objectif",
    schema: avecMargo(grille25, "% veut dire « sur 100 » !", "joie"),
    section: {
      type: "objectif",
      phrase: "Comprendre ce que veut dire %",
      sousPhrase: "25 %, c'est 25 sur 100.",
    },
  },
  {
    titre: "Pièges à éviter",
    badge: "Vigilance",
    teinte: "piege",
    schema: avecMargo(cinqPourCent, "5 %, c'est 0,05, pas 0,5 !", "attention"),
    section: { type: "etapes", etapes: pieges },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    schema: avecMargo(quartDeVingt, "À toi ! Cherche le repère.", "joie"),
    section: {
      type: "exercice",
      enonce: "On cherche 10 % de 40.",
      question: "Combien font 10 % de 40 ?",
      indice: "10 %, c'est le dixième.",
      correction: "40 ÷ 10 = 4.",
    },
  },
];
