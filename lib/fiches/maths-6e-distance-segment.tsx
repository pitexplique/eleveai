// ─── Fiche de cours : distances et milieu d'un segment (6e) ───────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (6e/maths/distances.bank.ts, notionId distance_segment).
//
// Micro-compétences 4/4 — le mapping micro → blocs :
//   distance_definition → définition + figure (les trois écritures), réflexe 1,
//                         exemple 1, piège 1
//   distance_milieu     → propriété 1, réflexe 2, usage 2, piège 2
//   distance_inegalite  → propriétés 2 et 3, réflexe 3, usage 1, exemple 3
//   distance_defi       → usage 3 (trois villages), exemple 2 (milieux emboîtés)
//
// ⭐ ÉCRITE POUR DES ÉLÈVES DE 6e QUI LISENT MAL (Frédéric, 30/09) : phrases
// courtes, un dessin par bloc, et le mode classe porte un dessin sur chaque
// diapo. Les nombres sortent tous de la banque : AB = 12 → AM = 6 ; AM = 4,5 →
// AB = 9 ; AC = 5, CB = 7, AB = 12 (alignés) ou 10 (pas alignés) ; milieux
// emboîtés AB = 20 → AN = 15 ; trois villages 12 + 25 = 37 > 33 (les noms de
// La Réunion de la banque sont retirés : on ne met pas La Réunion par défaut).
//
// ⭐ LES FIGURES SONT À L'ÉCHELLE. Le triangle du détour (5, 7, 10), celui de
// l'exemple (4, 6, 8) et celui des villages (12, 25, 33) sont CALCULÉS : la
// position de C vient des deux distances, pas d'un point posé à l'œil.
//
// ⚠️ `droites` écrit ses lettres en 15, et son cadre de 260 les ramène à
// 15 × 226 / 260 = 13 px dans une carte de téléphone. Ne pas l'élargir.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import type { DroitesCanvasData } from "@/lib/tutor-v4/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";
import { avecMargo } from "@/components/fiches/TiMargoBulle";

const L = 260;
const BLEU = "#2563eb";
const VERT = "#16a34a";
const ORANGE = "#ea580c";
const ROUGE = "#ef4444";

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

const droites = (
  hauteur: number,
  lines: DroitesCanvasData["lines"],
  points: NonNullable<DroitesCanvasData["points"]>
) => (
  <CanvasRenderer
    figure={{
      kind: "droites",
      size: { width: L, height: hauteur },
      lines,
      points,
      display: { showGrid: false, showLabels: true, showPoints: true },
    }}
  />
);

/**
 * ⭐ UNE ÉTIQUETTE POSÉE OÙ L'ON VEUT. `droites` écrit le nom d'un trait à son
 * milieu, 10 au-dessus : sur un trait penché, le texte chevauchait le trait, et
 * sur un segment horizontal, « A » puis « 6 cm » se lisaient « A 6 cm » (vu au
 * rendu, 30/09). Un trait de longueur nulle et d'épaisseur 0 ne dessine rien :
 * il ne porte que son étiquette, centrée en x et posée sur la ligne `y`.
 */
const etiquette = (id: string, x: number, y: number, texte: string, color: string): DroitesCanvasData["lines"][number] => ({
  id,
  type: "segment",
  from: { x, y: y + 10 },
  to: { x, y: y + 10 },
  color,
  strokeWidth: 0,
  label: texte,
});

// LES TROIS ÉCRITURES, UNE PAR LIGNE. La droite (qui ne s'arrête pas), le
// segment (qui s'arrête en A et en B), et la longueur (un nombre).
// ⛔ Le canvas prend l'étiquette d'un point comme CLÉ React : trois « A » sur
// la même figure donnaient trois clés identiques, donc une erreur console. Les
// A et B des lignes 2 et 3 portent une espace de largeur nulle (U+200B) : même
// lettre à l'écran, clé différente.
const Z = "​";
const figureNotation = droites(
  200,
  [
    { id: "droite", type: "droite", from: { x: 50, y: 45 }, to: { x: 210, y: 45 }, color: BLEU, label: "(AB)" },
    { id: "segment", type: "segment", from: { x: 50, y: 110 }, to: { x: 210, y: 110 }, color: VERT, label: "[AB]" },
    { id: "longueur", type: "segment", from: { x: 50, y: 175 }, to: { x: 210, y: 175 }, color: ORANGE, label: "AB = 5 cm" },
  ],
  [
    { x: 50, y: 45, label: "A" },
    { x: 210, y: 45, label: "B" },
    { x: 50, y: 110, label: `A${Z}` },
    { x: 210, y: 110, label: `B${Z}` },
    { x: 50, y: 175, label: `A${Z}${Z}` },
    { x: 210, y: 175, label: `B${Z}${Z}` },
  ]
);

// LE MILIEU : deux moitiés de 6 cm (AB = 12 cm, banque).
// Les longueurs passent SOUS le segment : au-dessus, elles collaient aux lettres.
const figureMilieu = (gauche: string, droite: string) =>
  droites(
    105,
    [
      { id: "AM", type: "segment", from: { x: 22, y: 55 }, to: { x: 130, y: 55 }, color: BLEU },
      { id: "MB", type: "segment", from: { x: 130, y: 55 }, to: { x: 238, y: 55 }, color: BLEU },
      etiquette("lAM", 76, 88, gauche, BLEU),
      etiquette("lMB", 184, 88, droite, BLEU),
    ],
    [
      { x: 22, y: 55, label: "A" },
      { x: 130, y: 55, label: "M", color: ROUGE, highlight: true },
      { x: 238, y: 55, label: "B" },
    ]
  );

// LE DÉTOUR, À L'ÉCHELLE : 20 px pour 1 cm. AB = 10 cm (200 px), AC = 5 cm
// (100 px), CB = 7 cm (140 px). C se CALCULE : x = (100² − 140² + 200²) ÷ 400
// = 76 depuis A, puis y = √(100² − 76²) ≈ 65 au-dessus. D'où C (106 ; 60).
const figureDetour = droites(
  150,
  [
    { id: "AB", type: "segment", from: { x: 30, y: 125 }, to: { x: 230, y: 125 }, color: BLEU, label: "10 cm" },
    { id: "AC", type: "segment", from: { x: 30, y: 125 }, to: { x: 106, y: 60 }, color: ROUGE, dashed: true },
    { id: "CB", type: "segment", from: { x: 106, y: 60 }, to: { x: 230, y: 125 }, color: ROUGE, dashed: true },
    // Posées à l'EXTÉRIEUR du triangle : au milieu, le texte coupait le trait.
    etiquette("lAC", 50, 82, "5 cm", ROUGE),
    etiquette("lCB", 182, 80, "7 cm", ROUGE),
  ],
  [
    { x: 30, y: 125, label: "A" },
    { x: 230, y: 125, label: "B" },
    { x: 106, y: 60, label: "C", color: ROUGE, highlight: true },
  ]
);

// L'ÉGALITÉ : C posé SUR [AB]. 18 px pour 1 cm : AC = 90, CB = 126.
const figureAligne = droites(
  105,
  [
    { id: "AC", type: "segment", from: { x: 22, y: 55 }, to: { x: 112, y: 55 }, color: VERT },
    { id: "CB", type: "segment", from: { x: 112, y: 55 }, to: { x: 238, y: 55 }, color: BLEU },
    etiquette("lAC", 67, 88, "5 cm", VERT),
    etiquette("lCB", 175, 88, "7 cm", BLEU),
  ],
  [
    { x: 22, y: 55, label: "A" },
    { x: 112, y: 55, label: "C", color: ROUGE, highlight: true },
    { x: 238, y: 55, label: "B" },
  ]
);

// RÉFLEXE 1 — le tableau des écritures, deux colonnes.
const tableauEcritures = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["on écrit", "c'est"],
      rows: [
        { values: ["(AB)", "une droite"] },
        { values: ["[AB]", "un segment"] },
        { values: ["AB", "un nombre : la longueur"] },
      ],
      highlight: { row: 2 },
      display: { striped: true },
    }}
  />
);

// RÉFLEXE 2 — le milieu partage en deux parts égales (AM = 4,5 → AB = 9).
const barreMilieu = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      // ⚠️ 200 de haut : à 170, les noms des parts (AM, MB) chevauchaient la
      // phrase du bas — vu au rendu.
      size: { width: 240, height: 200 },
      total: "AB = 9 cm",
      parts: [
        { label: "AM", value: "4,5", color: "#dbeafe" },
        { label: "MB", value: "4,5", color: "#dbeafe" },
      ],
      questionLabel: "2 × 4,5 = 9",
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: true },
    }}
  />
);

// RÉFLEXE 3 — additionner, puis comparer à AB.
const tableauComparer = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "AC + CB = 5 + 7 = 12",
      headers: ["si AB =", "alors C…"],
      rows: [
        { values: ["12", "est sur [AB]"] },
        { values: ["10", "n'est pas sur [AB]"] },
      ],
      highlight: { row: 0 },
      display: { striped: true },
    }}
  />
);

// USAGE 1 — tout droit, ou par un détour.
const figureTrajet = droites(
  145,
  [
    { id: "direct", type: "segment", from: { x: 30, y: 120 }, to: { x: 230, y: 120 }, color: VERT, label: "tout droit" },
    { id: "d1", type: "segment", from: { x: 30, y: 120 }, to: { x: 95, y: 40 }, color: ORANGE, dashed: true },
    { id: "d2", type: "segment", from: { x: 95, y: 40 }, to: { x: 230, y: 120 }, color: ORANGE, dashed: true },
  ],
  [
    { x: 30, y: 120, label: "A" },
    { x: 230, y: 120, label: "B" },
  ]
);

// USAGE 2 — le milieu sur une règle : 12 cm, le milieu à 6.
const regleMilieu = (
  <CanvasRenderer
    figure={{
      kind: "number_line",
      size: { width: 240, height: 80 },
      min: 0,
      max: 12,
      step: 2,
      points: [
        { value: 0, label: "A", color: BLEU },
        { value: 6, label: "M", color: ROUGE },
        { value: 12, label: "B", color: BLEU },
      ],
      display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true },
    }}
  />
);

// USAGE 3 — trois villages, à l'échelle : 6,5 px pour 1 km. AB = 33 km
// (214,5 px), AC = 12 km (78 px), CB = 25 km (162,5 px). C se calcule :
// x = (78² − 162,5² + 214,5²) ÷ 429 ≈ 59,9 depuis A, y ≈ 50 au-dessus.
const figureVillages = droites(
  125,
  [
    { id: "AB", type: "segment", from: { x: 20, y: 110 }, to: { x: 234.5, y: 110 }, color: BLEU, label: "33 km" },
    { id: "AC", type: "segment", from: { x: 20, y: 110 }, to: { x: 79.9, y: 60 }, color: ORANGE },
    etiquette("lAC", 30, 72, "12 km", ORANGE),
    { id: "CB", type: "segment", from: { x: 79.9, y: 60 }, to: { x: 234.5, y: 110 }, color: ORANGE, label: "25 km" },
  ],
  [
    { x: 20, y: 110, label: "A" },
    { x: 234.5, y: 110, label: "B" },
    { x: 79.9, y: 60, label: "C", color: ORANGE, highlight: true },
  ]
);

// EXEMPLE 1 — un segment de 5 cm, et la bonne écriture.
const segmentSeul = (a: string, b: string, texte: string) =>
  droites(
    80,
    [{ id: "seg", type: "segment", from: { x: 40, y: 50 }, to: { x: 220, y: 50 }, color: VERT, label: texte }],
    [
      { x: 40, y: 50, label: a },
      { x: 220, y: 50, label: b },
    ]
  );
const figureCinqCm = segmentSeul("A", "B", "AB = 5 cm");

// EXEMPLE 2 — deux milieux emboîtés : AB = 20, M milieu de [AB], N milieu de [MB].
const barreEmboites = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      size: { width: 240, height: 200 },
      total: "AB = 20 cm",
      parts: [
        { label: "AM", value: "10", color: "#dbeafe" },
        { label: "MN", value: "5", color: "#dcfce7" },
        { label: "NB", value: "5", color: "#fef3c7" },
      ],
      questionLabel: "AN = 10 + 5 = 15 cm",
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: true },
    }}
  />
);

// EXEMPLE 3 — AC = 4, CB = 6, AB = 8, à l'échelle (25 px pour 1 cm).
// x = (100² − 150² + 200²) ÷ 400 = 68,75 depuis A ; y = √(100² − 68,75²) ≈ 72,6.
const figureExemple3 = droites(
  150,
  [
    { id: "AB", type: "segment", from: { x: 30, y: 130 }, to: { x: 230, y: 130 }, color: BLEU, label: "8 cm" },
    { id: "AC", type: "segment", from: { x: 30, y: 130 }, to: { x: 98.75, y: 57.4 }, color: ROUGE, dashed: true },
    { id: "CB", type: "segment", from: { x: 98.75, y: 57.4 }, to: { x: 230, y: 130 }, color: ROUGE, dashed: true },
    etiquette("lAC", 45, 88, "4 cm", ROUGE),
    etiquette("lCB", 182, 84, "6 cm", ROUGE),
  ],
  [
    { x: 30, y: 130, label: "A" },
    { x: 230, y: 130, label: "B" },
    { x: 98.75, y: 57.4, label: "C", color: ROUGE, highlight: true },
  ]
);

const pieges = [
  "Écrire [AB] = 5 cm : un segment est un dessin, pas un nombre. On écrit AB = 5 cm.",
  "Croire que PA = PB suffit pour être le milieu. Le milieu doit aussi être SUR le segment.",
  "Croire que AC + CB est toujours égal à AB. C'est vrai seulement si C est sur [AB].",
];

const aRetenir = [
  "(AB) est une droite, [AB] un segment, AB un nombre : sa longueur.",
  "Le milieu M de [AB] est sur [AB], et MA = MB.",
  "AC + CB est plus grand que AB, ou égal si C est sur [AB].",
];

export const ficheDistanceSegment6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "distance-segment",
  titre: "Distances et milieu d'un segment",
  accroche:
    "Pour aller de A à B, le chemin le plus court est tout droit. Sa longueur, c'est la distance AB.",
  identite: [
    { label: "Le mot clé", valeur: "La distance AB est un nombre" },
    { label: "Le milieu", valeur: "Sur le segment, à égale distance des deux bouts" },
    { label: "La règle d'or", valeur: "Un détour rallonge toujours le trajet" },
  ],
  definition: {
    texte:
      "La distance entre A et B est la longueur du segment [AB]. On la note AB, sans crochets. C'est un nombre, avec une unité.",
  },
  figure: {
    schema: legende(figureNotation, "Une droite, un segment, un nombre."),
    legende: "La droite (AB) ne s'arrête pas. Le segment [AB] s'arrête en A et en B.",
  },
  proprietes: [
    {
      titre: "Le milieu coupe en deux",
      micros: ["distance_milieu"],
      texte:
        "Le milieu M de [AB] est sur le segment, et MA = MB. Si AB = 12 cm, alors AM = 6 cm.",
      schema: legende(figureMilieu("6 cm", "6 cm"), "AB = 12 cm, donc AM = MB = 6 cm."),
    },
    {
      titre: "Le plus court chemin",
      micros: ["distance_inegalite"],
      texte:
        "Le plus court chemin de A à B est le segment [AB]. Passer par C fait un détour : AC + CB est plus grand que AB.",
      schema: legende(figureDetour, "5 + 7 = 12 : plus que 10."),
    },
    {
      titre: "Sur le segment, pas de détour",
      micros: ["distance_inegalite"],
      texte:
        "Si C est sur [AB], alors AC + CB = AB. Et si AC + CB = AB, alors C est sur [AB].",
      schema: legende(figureAligne, "5 + 7 = 12 = AB."),
    },
  ],
  reel: {
    texte:
      "Une carte donne souvent la distance « à vol d'oiseau ». C'est la longueur du segment, tout droit. La route fait des virages, elle est donc plus longue. Et pour couper une barre de chocolat en deux parts égales, on cherche son milieu.",
  },
  historique: {
    texte:
      "Il y a plus de 2 000 ans, le savant grec Archimède l'a écrit. Parmi toutes les lignes qui joignent deux points, la ligne droite est la plus courte. Il ne l'a pas démontré : il l'a posé comme une vérité de départ. En 6e, on fait comme lui, on l'admet.",
  },
  methode: [
    {
      titre: "Crochets ou pas ?",
      micros: ["distance_definition"],
      texte:
        "Des crochets, c'est un segment, donc un dessin. Pas de crochets, c'est une longueur, donc un nombre.",
      schema: tableauEcritures,
    },
    {
      titre: "Le milieu : diviser ou doubler",
      micros: ["distance_milieu"],
      texte:
        "Pour une moitié, on divise AB par 2. Pour le segment entier, on double : AM = 4,5 cm donne AB = 9 cm.",
      schema: barreMilieu,
    },
    {
      titre: "Additionner, puis comparer",
      micros: ["distance_inegalite"],
      texte:
        "On calcule AC + CB, puis on compare à AB. Égal, C est sur [AB] ; plus grand, C n'y est pas.",
      schema: tableauComparer,
    },
  ],
  usages: [
    {
      titre: "Le trajet le plus court",
      micros: ["distance_inegalite"],
      detail:
        "De la maison A à l'école B, tout droit est le plus court. Tout autre chemin fait un détour.",
      schema: legende(figureTrajet, "Le trajet orange est plus long que le vert."),
    },
    {
      titre: "Couper en deux parts égales",
      micros: ["distance_milieu"],
      detail:
        "Une barre de 12 cm se coupe à 6 cm du bord. Le milieu est à la moitié de la longueur.",
      schema: legende(regleMilieu, "12 ÷ 2 = 6 : le milieu M est à 6."),
    },
    {
      titre: "Trois villages sur une ligne ?",
      micros: ["distance_defi"],
      detail:
        "AC = 12 km, CB = 25 km et AB = 33 km. Or 12 + 25 = 37, c'est plus que 33 : les villages ne sont pas alignés.",
      schema: legende(figureVillages, "Passer par C fait un détour de 4 km."),
    },
  ],
  exemples: [
    {
      titre: "La bonne écriture",
      micros: ["distance_definition"],
      donnees: "Un élève écrit : « [AB] = 5 cm ».",
      question: "Est-ce correct ?",
      schema: figureCinqCm,
      solution:
        "Non. [AB] est le segment, c'est un dessin. C'est sa longueur qui vaut 5 cm. On écrit AB = 5 cm, sans crochets.",
    },
    {
      titre: "Deux milieux l'un dans l'autre",
      micros: ["distance_defi", "distance_milieu"],
      donnees: "M est le milieu de [AB], et N le milieu de [MB]. AB = 20 cm.",
      question: "Combien mesure AN ?",
      schema: barreEmboites,
      solution:
        "M est le milieu de [AB] : AM = 20 ÷ 2 = 10 cm. N est le milieu de [MB] : MN = 10 ÷ 2 = 5 cm. On ajoute : AN = 10 + 5 = 15 cm.",
    },
    {
      titre: "C est-il sur le segment ?",
      micros: ["distance_inegalite"],
      donnees: "AC = 4 cm, CB = 6 cm et AB = 8 cm.",
      question: "Le point C est-il sur le segment [AB] ?",
      schema: figureExemple3,
      solution:
        "On additionne : AC + CB = 4 + 6 = 10 cm. On compare : 10 est plus grand que 8. Il y a un détour. Donc C n'est pas sur [AB].",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Le segment [MN] mesure 7 cm. Écris-le correctement.",
      correction: "MN = 7 cm. Pas de crochets : la longueur est un nombre.",
      micros: ["distance_definition"],
      schema: segmentSeul("M", "N", "7 cm"),
    },
    {
      question: "M est le milieu de [AB] et AB = 12 cm. Combien mesure AM ?",
      correction: "AM = 12 ÷ 2 = 6 cm.",
      micros: ["distance_milieu"],
    },
    {
      question: "M est le milieu de [AB] et AM = 4,5 cm. Combien mesure AB ?",
      correction: "AB = 2 × 4,5 = 9 cm.",
      micros: ["distance_milieu"],
    },
    {
      question: "AC = 5 cm, CB = 7 cm et AB = 12 cm. C est-il sur [AB] ?",
      correction: "Oui. 5 + 7 = 12 = AB : il n'y a pas de détour, C est sur [AB].",
      micros: ["distance_inegalite"],
    },
    {
      question: "AC = 5 cm, CB = 7 cm et AB = 10 cm. C est-il sur [AB] ?",
      correction: "Non. 5 + 7 = 12, c'est plus que 10 : C fait un détour.",
      micros: ["distance_inegalite"],
    },
    {
      question: "M est le milieu de [AB] et N le milieu de [AM]. AB = 16 cm. Combien mesure NB ?",
      correction: "AM = 8 cm, donc AN = 4 cm. Alors NB = 16 − 4 = 12 cm.",
      micros: ["distance_defi"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
  tiMargo: {
    objectif: "Des crochets : un dessin. Sans rien : un nombre !",
    reel: "À vol d'oiseau, c'est tout droit : le plus court !",
    methode: "Pour savoir si C est sur [AB], on additionne !",
    pieges: "On écrit AB = 5 cm, jamais [AB] = 5 cm !",
    retenir: "Un détour rallonge toujours le trajet !",
    exercice: "À toi ! Pas de crochets pour une longueur.",
  },
};

// ⛔ AUCUN LATEX DANS LES DIAPOS : le mode classe n'a pas de rendu KaTeX.
export const slidesDistanceSegment6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Distances - 6e",
    teinte: "objectif",
    schema: avecMargo(figureNotation, "Des crochets : un dessin. Sans rien : un nombre !"),
    section: {
      type: "objectif",
      phrase: "(AB), [AB] et AB : trois choses différentes",
      sousPhrase: "Une droite, un segment, et une longueur.",
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    teinte: "reel",
    schema: figureTrajet,
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu: "À vol d'oiseau, c'est tout droit. La route fait des virages : elle est plus longue.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu: "Il y a 2 000 ans, Archimède l'a écrit : la ligne droite est le plus court chemin.",
      },
    },
  },
  {
    titre: "Le milieu",
    badge: "Définition",
    teinte: "definition",
    schema: avecMargo(figureMilieu("6 cm", "6 cm"), "Le milieu est SUR le segment, pile au centre."),
    section: {
      type: "objectif",
      phrase: "Le milieu coupe le segment en deux moitiés égales",
      sousPhrase: "AB = 12 cm, donc AM = MB = 6 cm.",
    },
  },
  {
    titre: "Le plus court chemin",
    badge: "Propriété",
    teinte: "propriete",
    schema: avecMargo(figureDetour, "Un détour rallonge toujours le trajet !", "joie"),
    section: {
      type: "objectif",
      phrase: "AC + CB est plus grand que AB",
      sousPhrase: "5 + 7 = 12 : c'est plus que 10. Passer par C fait un détour.",
    },
  },
  {
    titre: "Alignés ou pas ?",
    badge: "Propriété",
    teinte: "propriete",
    schema: figureAligne,
    section: {
      type: "objectif",
      phrase: "AC + CB = AB : C est sur le segment",
      sousPhrase: "5 + 7 = 12 = AB. Pas de détour : A, C et B sont alignés.",
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    teinte: "methode",
    schema: tableauEcritures,
    section: {
      type: "cartes",
      cartes: [
        { titre: "Crochets ou pas ?", texte: "[AB] est un dessin. AB est un nombre." },
        { titre: "Le milieu", texte: "On divise AB par 2. Ou on double AM pour trouver AB." },
        { titre: "Alignés ?", texte: "On calcule AC + CB, puis on compare à AB." },
      ],
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Deux milieux",
    teinte: "exemple",
    schema: barreEmboites,
    section: {
      type: "exemple",
      enonce: "M est le milieu de [AB], N le milieu de [MB]. AB = 20 cm.",
      question: "Combien mesure AN ?",
      correction: "AM = 10 cm. MN = 5 cm. Donc AN = 10 + 5 = 15 cm.",
    },
  },
  {
    titre: "Pièges à éviter",
    badge: "Vigilance",
    teinte: "piege",
    schema: avecMargo(figureCinqCm, "On écrit AB = 5 cm, jamais [AB] = 5 cm !", "attention"),
    section: {
      type: "cartes",
      cartes: [
        { titre: "Les crochets", texte: "[AB] est un dessin : il ne vaut pas 5 cm. On écrit AB = 5 cm." },
        { titre: "Le milieu", texte: "PA = PB ne suffit pas. Le milieu doit aussi être SUR le segment." },
        { titre: "Le détour", texte: "AC + CB = AB seulement si C est sur [AB]." },
      ],
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    schema: avecMargo(figureMilieu("7 cm", "?"), "À toi ! Le milieu coupe en deux.", "joie"),
    section: {
      type: "exercice",
      enonce: "M est le milieu de [AB] et AM = 7 cm.",
      question: "Combien mesure AB ?",
      indice: "Le segment entier, c'est deux moitiés.",
      correction: "AB = 2 × 7 = 14 cm.",
    },
  },
];
