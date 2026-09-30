// ─── Fiche de cours : les nombres décimaux (6e) ────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/6e/maths/decimaux.bank.ts (notionId decimal_nombre).
//
// ⭐ RÉÉCRITE LE 30/09/2026 POUR DES 6e QUI LISENT DIFFICILEMENT : phrases
// courtes, une idée par phrase, un dessin sur CHAQUE bloc (ce sont les diapos
// du mode classe), et Ti Margo dans le champ `tiMargo`.
//
// ⛔ LE CALCUL EST PARTI. La fiche de juin posait 3,45 + 1,7 et parlait de
// × et ÷ : ce sont les micros de la notion `decimal_calcul`, qui a sa propre
// fiche (`maths-6e-decimal-calcul.tsx`). Ici, les SIX micros de
// `decimal_nombre`, dont arrondir et encadrer, que juin ne couvrait pas.
//
// Micro-compétences 6/6 :
// - decimal_lire_ecrire → définition + figure (3,45), propriété « Un décimal a
//                         sa place », usage 1 (25/10), exemple 1 (15/10),
//                         entraînement 1 (7/10)
// - decimal_rang        → propriété « Les rangs continuent » (grille), méthode 1
//                         (3,264), exemple 2 (12,764), entraînement 2 (4,58)
// - decimal_comparer    → propriété « Comparer » (0,7 et 0,65), méthode 2
//                         (0,5 = 0,50), usage 2 (2,5 € et 2,45 €), exemple 3
//                         (0,305 et 0,35), entraînement 3 (0,52 et 0,507)
// - decimal_arrondir    → propriété « Arrondir » (12,7), méthode 3 (4,382),
//                         usage 3 (19,99 €), exemple 4 (3,96), entraînement 4
//                         (9,146)
// - decimal_encadrer    → propriété « Encadrer » (7,38), exemple 5 (entre 2,5
//                         et 2,6), entraînement 5 (5,206)
// - decimal_defi        → réel (le requin à 2,75 m/s), entraînement 6
//                         (3,5 et 3,45), dessiné
// Tous les nombres sortent de la banque (sauf 3,45 et la grille de 45, dessins
// gardés de juin). ⛔ La feuille `maths-6e-decimal-nombre.tsx` n'en reprend
// aucun (elle les exclut en tête).
//
// ⚠️ `number_line` écrit en 14 : cadre de 240 (11,8 px dans le bloc de 226
// d'un téléphone, mesuré). Au-delà de six graduations, les nombres se touchent.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

const BLEU = "#2563eb";
const VERT = "#16a34a";
const ROUGE = "#dc2626";

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
      size: { width: 240, height: 90 },
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

/** Le tableau de numération prolongé après la virgule, une case allumée. */
const rangs = (
  title: string,
  headers: string[],
  chiffres: string[],
  col: number,
  caption: string
) => (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title,
      headers,
      rows: [{ label: "Chiffre", values: chiffres }],
      highlight: { cell: { row: 0, col } },
      caption,
    }}
  />
);

// ─── Les dessins ──────────────────────────────────────────────────────────────
// Trois familles qui alternent : le TABLEAU (les rangs après la virgule), la
// DROITE (un décimal a sa place, entre deux voisins) et la GRILLE de cent
// carreaux (pourquoi les rangs continuent). Deux blocs voisins ne portent
// jamais la même famille.

// LA FIGURE : 3,45 dans le tableau, chaque chiffre avec sa valeur.
const tableauDecimal345 = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Le nombre 3,45",
      headers: ["Unités", ",", "Dixièmes", "Centièmes"],
      rows: [
        { label: "Chiffre", values: ["3", ",", "4", "5"] },
        { label: "Vaut", values: ["3", "", "0,4", "0,05"] },
      ],
      caption: "3,45 = 3 + 0,4 + 0,05",
    }}
  />
);

// UN DÉCIMAL A SA PLACE : 3,45 entre 3 et 4, plus près de 3.
const entreTroisEtQuatre = legende(
  droite(3, 4, 0.25, [{ value: 3.45, label: "3,45", color: VERT }]),
  "3,45 est entre 3 et 4"
);

// POURQUOI LES RANGS CONTINUENT : une colonne = un dixième, un carreau = un
// centième.
const grilleDesCentiemes = legende(
  <CanvasRenderer
    figure={{
      kind: "fraction",
      model: "grid",
      grid: { rows: 10, cols: 10, shaded: 45 },
      size: { width: 240, height: 210 },
    }}
  />,
  "4 colonnes et 5 carreaux : 0,45"
);

// COMPARER : 0,7 contre 0,65 (banque). On compare les dixièmes.
const comparer07 = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "0,7 ou 0,65 ?",
      headers: ["Unités", ",", "Dixièmes", "Centièmes"],
      rows: [
        { label: "0,70", values: ["0", ",", "7", "0"] },
        { label: "0,65", values: ["0", ",", "6", "5"] },
      ],
      highlight: { col: 2 },
      caption: "7 dixièmes battent 6 dixièmes.",
    }}
  />
);

// ARRONDIR : 12,7 est plus près de 13 que de 12.
const arrondir127 = legende(
  droite(12, 13, 0.2, [{ value: 12.7, label: "12,7", color: BLEU }]),
  "12,7 est plus près de 13 : arrondi 13"
);

// ENCADRER : deux encadrements de 7,38, le second plus serré.
const encadrer738 = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Encadrer 7,38",
      headers: ["Au rang de…", "Encadrement"],
      rows: [
        { values: ["l'unité", "7 < 7,38 < 8"] },
        { values: ["du dixième", "7,3 < 7,38 < 7,4"] },
      ],
      highlight: { row: 1 },
      caption: "Au dixième, c'est plus serré.",
    }}
  />
);

// MÉTHODE 1 : le 6 de 3,264 est aux centièmes.
const rang3264 = rangs(
  "Le nombre 3,264",
  ["Unités", ",", "Dixièmes", "Centièmes", "Millièmes"],
  ["3", ",", "2", "6", "4"],
  3,
  "Le 6 est le 2e après la virgule : centièmes."
);

// MÉTHODE 2 : 0,5 et 0,50, un seul point.
const cinqDixiemes = legende(
  droite(0, 1, 0.25, [{ value: 0.5, label: "0,5 = 0,50", color: BLEU }]),
  "Un seul point, deux écritures"
);

// MÉTHODE 3 : arrondir 4,382 au dixième. Le chiffre d'après est 8.
const arrondir4382 = rangs(
  "4,382 au dixième",
  ["Unités", ",", "Dixièmes", "Centièmes", "Millièmes"],
  ["4", ",", "3", "8", "2"],
  3,
  "Le chiffre d'après est 8 : on monte à 4,4."
);

// USAGE 1 : 25/10 = 2,5 sur la droite.
const droite25 = legende(
  droite(0, 3, 0.5, [{ value: 2.5, label: "2,5", color: VERT }]),
  "25 dixièmes = 2,5"
);

// USAGE 2 : deux prix de fruits (banque, sans le lieu).
const tableauPrix = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "2,5 € ou 2,45 € ?",
      headers: ["Unités", ",", "Dixièmes", "Centièmes"],
      rows: [
        { label: "2,50", values: ["2", ",", "5", "0"] },
        { label: "2,45", values: ["2", ",", "4", "5"] },
      ],
      highlight: { col: 2 },
      caption: "5 dixièmes battent 4 dixièmes.",
    }}
  />
);

// USAGE 3 : 19,99 € collé à 20 €.
const prix1999 = legende(
  droite(19, 20, 0.2, [{ value: 19.99, label: "19,99", color: ROUGE }]),
  "19,99 € : presque 20 €"
);

// EXEMPLES
const exemple15 = legende(
  droite(0, 2, 0.5, [{ value: 1.5, label: "1,5", color: VERT }]),
  "15 dixièmes = 1 unité et 5 dixièmes"
);

const tableauRang = rangs(
  "Le nombre 12,764",
  ["Dizaines", "Unités", ",", "Dixièmes", "Centièmes", "Millièmes"],
  ["1", "2", ",", "7", "6", "4"],
  3,
  "Juste après la virgule : les dixièmes."
);

const exemple0305 = legende(
  droite(0.3, 0.36, 0.02, [
    { value: 0.305, label: "0,305", color: ROUGE },
    { value: 0.35, label: "0,35", color: VERT },
  ]),
  "0,305 est à gauche : il est plus petit"
);

const exemple396 = rangs(
  "3,96 au dixième",
  ["Unités", ",", "Dixièmes", "Centièmes"],
  ["3", ",", "9", "6"],
  3,
  "6 : on monte. 3,9 devient 4,0."
);

const exemple255 = legende(
  droite(2.5, 2.6, 0.02, [{ value: 2.55, label: "2,55", color: BLEU }]),
  "2,55 est entre 2,5 et 2,6"
);

// LE DÉFI a son dessin : 3,5 contre 3,45 sur la droite.
const defi35 = legende(
  droite(3, 4, 0.25, [
    { value: 3.45, label: "3,45", color: ROUGE },
    { value: 3.5, label: "3,5", color: VERT },
  ]),
  "3,5 est un peu plus à droite"
);

// ─── Les textes courts ────────────────────────────────────────────────────────

const pieges = [
  "Croire que 0,45 dépasse 0,5, parce que 45 dépasse 5. Or 0,5 = 0,50.",
  "Lire 0,09 comme 9 dixièmes. Le 9 est au 2e rang : c'est 9 centièmes.",
  "Couper au lieu d'arrondir. 12,78 arrondi au dixième donne 12,8, pas 12,7.",
];

const aRetenir = [
  "Après la virgule : dixièmes, centièmes, millièmes.",
  "Pour comparer, j'écris le même nombre de chiffres après la virgule.",
  "Pour arrondir, je regarde le chiffre d'après : 5 ou plus, je monte.",
];

export const ficheDecimaux6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "decimal-nombre",
  titre: "Les nombres décimaux",
  accroche:
    "Un prix, une taille, un temps de course : souvent, il y a une virgule. La virgule sert à être précis.",
  identite: [
    { label: "Mots clés", valeur: "Virgule, dixième, centième, arrondi" },
    { label: "Le secret", valeur: "Après la virgule, les rangs continuent" },
    { label: "Outil", valeur: "Le tableau de numération, prolongé" },
  ],
  definition: {
    texte:
      "Un nombre décimal s'écrit avec une virgule. À gauche, c'est la partie entière. À droite, c'est la partie décimale : dixièmes, centièmes, millièmes.",
  },
  figure: {
    schema: tableauDecimal345,
    legende: "3,45, c'est 3 unités, 4 dixièmes et 5 centièmes.",
  },
  proprietes: [
    {
      titre: "Un décimal a sa place",
      micros: ["decimal_lire_ecrire"],
      texte: "3,45 est entre 3 et 4. Sa partie entière est 3.",
      schema: entreTroisEtQuatre,
    },
    {
      titre: "Les rangs continuent",
      micros: ["decimal_rang"],
      texte: "Une colonne de la grille vaut un dixième. Un carreau vaut un centième.",
      schema: grilleDesCentiemes,
    },
    {
      titre: "Comparer",
      micros: ["decimal_comparer"],
      texte: "Je compare les parties entières, puis les dixièmes. 0,7 est plus grand que 0,65.",
      schema: comparer07,
    },
    {
      titre: "Arrondir",
      micros: ["decimal_arrondir"],
      texte: "Arrondir, c'est choisir le voisin le plus proche. 12,7 arrondi à l'unité donne 13.",
      schema: arrondir127,
    },
    {
      titre: "Encadrer",
      micros: ["decimal_encadrer"],
      texte: "Encadrer, c'est coincer un nombre entre deux voisins. 7,3 < 7,38 < 7,4.",
      schema: encadrer738,
    },
  ],
  reel: {
    texte:
      "Un fruit coûte 2,45 €. Une élève mesure 1,52 m. Un requin nage à 2,75 m par seconde. Dire 2,75 est plus précis que dire 3.",
  },
  historique: {
    texte:
      "« Décimal » vient du latin decem, qui veut dire dix. En 1585, Simon Stevin explique comment écrire les dixièmes. La virgule arrive un peu plus tard. Aux États-Unis, on écrit encore un point : 2.5.",
  },
  methode: [
    {
      titre: "Je lis le rang",
      micros: ["decimal_rang"],
      texte: "Je compte depuis la virgule. 1er chiffre : dixièmes. 2e : centièmes. 3e : millièmes.",
      schema: rang3264,
    },
    {
      titre: "J'ajoute des zéros",
      micros: ["decimal_comparer"],
      texte: "0,5 = 0,50 : c'est le même nombre. Je peux alors comparer 50 et 45 centièmes.",
      schema: cinqDixiemes,
    },
    {
      titre: "Je regarde le chiffre d'après",
      micros: ["decimal_arrondir"],
      texte: "Pour arrondir au dixième, je regarde les centièmes. 5 ou plus : je monte.",
      schema: arrondir4382,
    },
  ],
  usages: [
    {
      titre: "D'une fraction au décimal",
      micros: ["decimal_lire_ecrire"],
      detail: "25/10, c'est 25 dixièmes. 20 dixièmes font 2 unités : 25/10 = 2,5.",
      schema: droite25,
    },
    {
      titre: "Comparer deux prix",
      micros: ["decimal_comparer"],
      detail: "2,5 € ou 2,45 € ? J'écris 2,50. Le fruit à 2,5 € est le plus cher.",
      schema: tableauPrix,
    },
    {
      titre: "Arrondir un prix",
      micros: ["decimal_arrondir"],
      detail: "19,99 € est à 1 centime de 20 €. Arrondi à l'unité, il vaut 20 €.",
      schema: prix1999,
    },
  ],
  exemples: [
    {
      titre: "Écrire en décimal",
      micros: ["decimal_lire_ecrire"],
      donnees: "On a la fraction 15/10.",
      question: "Écris-la en nombre décimal.",
      schema: exemple15,
      solution:
        "15/10, c'est 15 dixièmes. 10 dixièmes font 1 unité. Il reste 5 dixièmes. Donc 15/10 = 1,5.",
    },
    {
      titre: "Le rang d'un chiffre",
      micros: ["decimal_rang"],
      donnees: "On donne le nombre 12,764.",
      question: "Quel est le chiffre des dixièmes ?",
      schema: tableauRang,
      solution:
        "Les dixièmes viennent juste après la virgule. C'est le 7. Ensuite, 6 centièmes et 4 millièmes.",
    },
    {
      titre: "Comparer deux décimaux",
      micros: ["decimal_comparer"],
      donnees: "On compare 0,305 et 0,35.",
      question: "Lequel est le plus petit ?",
      schema: exemple0305,
      solution:
        "J'écris 0,35 = 0,350. Je compare 305 et 350 millièmes. 305 est plus petit. Donc 0,305 est le plus petit.",
    },
    {
      titre: "Arrondir au dixième",
      micros: ["decimal_arrondir"],
      donnees: "On veut arrondir 3,96 au dixième.",
      question: "Quelle est sa valeur arrondie ?",
      schema: exemple396,
      solution:
        "3,96 est entre 3,9 et 4,0. Le chiffre des centièmes est 6. 6 ou plus : je monte. L'arrondi est 4,0.",
    },
    {
      titre: "Intercaler un nombre",
      micros: ["decimal_encadrer"],
      donnees: "On cherche un nombre entre 2,5 et 2,6.",
      question: "Donne un nombre décimal entre 2,5 et 2,6.",
      schema: exemple255,
      solution:
        "J'écris 2,50 et 2,60. Entre les deux, il y a 2,51, 2,52… jusqu'à 2,59. Par exemple, 2,55.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Écris 7/10 en nombre décimal.",
      correction: "7/10, c'est 7 dixièmes. On écrit 0,7.",
      micros: ["decimal_lire_ecrire"],
    },
    {
      question: "Dans 4,58, quel chiffre est au rang des dixièmes ?",
      correction: "Le 1er chiffre après la virgule est 5. C'est le chiffre des dixièmes.",
      micros: ["decimal_rang"],
    },
    {
      question: "Quel est le plus petit : 0,52 ou 0,507 ?",
      correction: "J'écris 0,520 et 0,507. 507 est plus petit que 520. Donc 0,507 est le plus petit.",
      micros: ["decimal_comparer"],
    },
    {
      question: "Arrondis 9,146 au centième.",
      correction: "9,146 est entre 9,14 et 9,15. Le chiffre des millièmes est 6 : je monte. L'arrondi est 9,15.",
      micros: ["decimal_arrondir"],
    },
    {
      question: "Encadre 5,206 à l'unité, puis au centième.",
      correction: "À l'unité : 5 < 5,206 < 6. Au centième : 5,20 < 5,206 < 5,21.",
      micros: ["decimal_encadrer"],
    },
    {
      question: "Défi : explique pourquoi 3,5 est plus grand que 3,45, alors que 45 dépasse 5.",
      correction:
        "Mêmes unités : 3. Je compare les dixièmes : 5 contre 4. Donc 3,5 est plus grand. On peut aussi écrire 3,50 et 3,45.",
      micros: ["decimal_defi"],
      schema: defi35,
    },
  ],
  tiMargo: {
    objectif: "La virgule sert à être précis !",
    definition: "Après la virgule, les rangs continuent !",
    methode: "Même nombre de chiffres, puis je compare !",
    pieges: "0,5 est plus grand que 0,45 !",
    retenir: "5 ou plus ? J'arrondis vers le haut !",
    exercice: "À toi ! Commence par la partie entière.",
  },
  coachHref: "/coach-ia/maths?classe=6e",
};

// Le mode classe est ENGENDRÉ depuis la fiche (`slidesDepuisFiche`) : ce
// tableau reste exporté pour la page, mais il n'est pas projeté.
// ⛔ AUCUN LATEX DANS LES DIAPOS.
export const slidesDecimaux6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Décimaux - 6e",
    schema: tableauDecimal345,
    section: {
      type: "objectif",
      phrase: "Lire, comparer et arrondir les nombres à virgule",
      sousPhrase: "Après la virgule : dixièmes, centièmes, millièmes.",
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Comparer",
    teinte: "exemple",
    schema: exemple0305,
    section: {
      type: "exemple",
      enonce: "On compare 0,305 et 0,35.",
      question: "Lequel est le plus petit ?",
      correction: "0,35 = 0,350. 305 millièmes contre 350 : 0,305 est le plus petit.",
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    schema: exemple255,
    section: {
      type: "exercice",
      enonce: "On cherche un nombre entre 2,5 et 2,6.",
      question: "Propose un nombre décimal entre les deux.",
      indice: "Écris 2,50 et 2,60.",
      correction: "Par exemple 2,55 : 2,50 < 2,55 < 2,60.",
    },
  },
];
