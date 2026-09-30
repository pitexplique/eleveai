// ─── Fiche de cours : les nombres entiers (6e) ─────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/6e/maths/entiers.bank.ts (notionId entier_nombre).
//
// ⭐ RÉÉCRITE LE 30/09/2026 POUR DES 6e QUI LISENT DIFFICILEMENT : phrases
// courtes, une idée par phrase, un dessin sur CHAQUE bloc (ce sont les diapos
// du mode classe), et Ti Margo dans le champ `tiMargo`.
//
// Micro-compétences 6/6 :
// - entier_lire_ecrire → définition, propriété « Le zéro garde la place »
//                        (1 042), méthode 3 (304), usage 3 (2 035), exemple 1
//                        (1 042), entraînement 1 (90)
// - entier_rang        → figure (4 273), propriété « La place donne la valeur »,
//                        méthode 1 (352), exemple 1, entraînement 2 (7 306)
// - entier_comparer    → propriété « Le plus long gagne » (98 et 1 042),
//                        méthode 2 (890 et 908), usage 1 (3 045 < 3 405 < 3 450),
//                        exemple 3 (345 et 354), entraînement 3 (1 480 et 1 408)
// - entier_decomposer  → propriété « La place donne la valeur » (4 273 posé),
//                        exemple 2 (2 845), entraînement 4 (706)
// - entier_encadrer    → propriété « Encadrer » (47), usage 2 (5 280),
//                        exemple 4 (380), entraînement 5 (326)
// - entier_defi        → entraînement 6 (3, 0, 5, 1 → 1 035), dessiné
// Tous les nombres sortent de la banque, sauf 98 (dessin gardé de juin).
// ⛔ La feuille d'exercices `maths-6e-entier-nombre.tsx` n'en reprend aucun.
//
// ⚠️ `number_line` écrit en 14 : cadre de 260 dans une carte, jamais le défaut
// (320). Au-delà de six graduations, les nombres se touchent.

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

/** Le tableau de numération du coach, avec la ligne « Vaut ». */
function tableauNumeration(title: string, chiffres: string[], valeurs: string[], caption: string) {
  return (
    <CanvasRenderer
      figure={{
        kind: "tableau_donnees",
        title,
        headers: ["Milliers", "Centaines", "Dizaines", "Unités"],
        rows: [
          { label: "Chiffre", values: chiffres },
          { label: "Vaut", values: valeurs },
        ],
        caption,
      }}
    />
  );
}

// ─── Les dessins ──────────────────────────────────────────────────────────────
// Trois familles qui alternent : le TABLEAU (une colonne = un rang), la
// DROITE (plus grand = plus à droite) et le CALCUL POSÉ (les rangs s'alignent).
// Deux blocs voisins ne portent jamais la même famille.

// LA FIGURE : chaque chiffre lu selon sa colonne.
const figure4273 = tableauNumeration(
  "Le nombre 4 273",
  ["4", "2", "7", "3"],
  ["4 000", "200", "70", "3"],
  "Le 2 est aux centaines : il vaut 200."
);

// ⭐ LA DÉCOMPOSITION POSÉE EN COLONNES : les zéros de 4000 poussent le 4
// quatre crans à gauche. ⛔ Pas de `schema_barre` : les parts sont
// proportionnelles, et 4000 mangeait 93 % de la barre (mesuré en juin).
const additionDesRangs = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "addition",
      title: "4 273 en morceaux",
      numbers: ["4000", "200", "70", "3"],
      result: "4273",
    }}
  />
);

// LE PLUS LONG GAGNE, avant même de lire les chiffres.
const lePlusLongGagne = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "98 ou 1 042 ?",
      headers: ["Milliers", "Centaines", "Dizaines", "Unités"],
      rows: [
        { label: "98", values: ["", "", "9", "8"] },
        { label: "1 042", values: ["1", "0", "4", "2"] },
      ],
      highlight: { row: 1 },
      caption: "4 chiffres contre 2 : 1 042 gagne.",
    }}
  />
);

// ENCADRER : 47 coincé entre deux dizaines.
const encadrer47 = legende(
  droite(40, 50, 2, [{ value: 47, label: "47", color: VERT }]),
  "47 est entre 40 et 50"
);

// ⭐ LE ZÉRO NE VAUT RIEN, MAIS IL TIENT LA PLACE. Sans lui, 1 042 devient 142.
const leZeroQuiTientLaPlace = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Pourquoi ce 0 ?",
      headers: ["Milliers", "Centaines", "Dizaines", "Unités"],
      rows: [
        { label: "1 042", values: ["1", "0", "4", "2"] },
        { label: "sans le 0", values: ["", "1", "4", "2"] },
      ],
      highlight: { cell: { row: 0, col: 1 } },
      caption: "Sans le 0, tout glisse : on lit 142.",
    }}
  />
);

// MÉTHODE 1 : le rang des dizaines, allumé (352, banque).
const rang352 = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Le nombre 352",
      headers: ["Centaines", "Dizaines", "Unités"],
      rows: [
        { label: "Chiffre", values: ["3", "5", "2"] },
        { label: "Vaut", values: ["300", "50", "2"] },
      ],
      highlight: { col: 1 },
      caption: "Le 5 est aux dizaines : il vaut 50.",
    }}
  />
);

// MÉTHODE 2 : 908 et 890, trois chiffres chacun. Le plus à droite gagne.
const compare908 = legende(
  droite(880, 920, 10, [
    { value: 890, label: "890", color: ROUGE },
    { value: 908, label: "908", color: VERT },
  ]),
  "908 est à droite de 890 : il est plus grand"
);

// MÉTHODE 3 : trois cent quatre, sans dizaine.
const zero304 = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "« trois cent quatre »",
      headers: ["Centaines", "Dizaines", "Unités"],
      rows: [{ label: "Chiffre", values: ["3", "0", "4"] }],
      highlight: { cell: { row: 0, col: 1 } },
      caption: "Pas de dizaine : j'écris 0. C'est 304.",
    }}
  />
);

// USAGE 1 : ranger trois nombres qui se ressemblent.
const ranger3045 = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Du plus petit au plus grand",
      headers: ["Milliers", "Centaines", "Dizaines", "Unités"],
      rows: [
        { label: "3 045", values: ["3", "0", "4", "5"] },
        { label: "3 405", values: ["3", "4", "0", "5"] },
        { label: "3 450", values: ["3", "4", "5", "0"] },
      ],
      highlight: { col: 1 },
      caption: "0 centaine : 3 045 est le plus petit.",
    }}
  />
);

// USAGE 2 : 5 280 entre deux milliers.
const encadrer5280 = legende(
  droite(5000, 6000, 200, [{ value: 5280, label: "5 280", color: BLEU }]),
  "5 000 < 5 280 < 6 000"
);

// USAGE 3 : des mots aux chiffres, 2 000 + 35.
const ecrire2035 = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "addition",
      title: "deux mille trente-cinq",
      numbers: ["2000", "35"],
      result: "2035",
    }}
  />
);

// EXEMPLES
const exemple1042 = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "1 042",
      headers: ["Milliers", "Centaines", "Dizaines", "Unités"],
      rows: [{ label: "Chiffre", values: ["1", "0", "4", "2"] }],
      highlight: { cell: { row: 0, col: 2 } },
      caption: "Le chiffre des dizaines est 4.",
    }}
  />
);

const exemple2845 = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "addition",
      title: "2 845 décomposé",
      numbers: ["2000", "800", "40", "5"],
      result: "2845",
    }}
  />
);

const tableauComparaison = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "345 ou 354 ?",
      headers: ["Centaines", "Dizaines", "Unités"],
      rows: [
        { label: "345", values: ["3", "4", "5"] },
        { label: "354", values: ["3", "5", "4"] },
      ],
      highlight: { col: 1 },
      caption: "5 dizaines battent 4 dizaines.",
    }}
  />
);

const exemple380 = legende(
  droite(300, 400, 20, [{ value: 380, label: "380", color: VERT }]),
  "380 est entre 300 et 400"
);

// LE DÉFI a son dessin : quatre cases, et le 0 interdit en tête.
const defi1035 = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Avec 3, 0, 5 et 1",
      headers: ["Milliers", "Centaines", "Dizaines", "Unités"],
      rows: [{ label: "Chiffre", values: ["?", "?", "?", "?"] }],
      highlight: { cell: { row: 0, col: 0 } },
      caption: "Pas de 0 dans la première case !",
    }}
  />
);

// ─── Les textes courts ────────────────────────────────────────────────────────

const pieges = [
  "Confondre chiffre et nombre. Dans 352, le chiffre des dizaines est 5. Le nombre de dizaines est 35.",
  "Croire que 908 dépasse 1 205. Il a moins de chiffres : il est plus petit.",
  "Oublier le zéro d'un rang vide. Trois cent quatre s'écrit 304, pas 34.",
];

const aRetenir = [
  "La place d'un chiffre donne sa valeur : unités, dizaines, centaines, milliers.",
  "Pour comparer : le plus de chiffres gagne. Sinon, je lis de gauche à droite.",
  "Un rang vide garde un 0 : 304, pas 34.",
];

export const ficheEntiers6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "entier-nombre",
  titre: "Les nombres entiers",
  accroche:
    "Un nombre entier sert à compter : des buts, des pages, des élèves. La place d'un chiffre donne sa valeur.",
  identite: [
    { label: "Mots clés", valeur: "Chiffre, nombre, rang, valeur" },
    { label: "Le secret", valeur: "La place d'un chiffre donne sa valeur" },
    { label: "Outil", valeur: "Le tableau de numération" },
  ],
  definition: {
    texte:
      "Un nombre entier n'a pas de virgule : 0, 1, 2, 3… On l'écrit avec dix chiffres, de 0 à 9. La place d'un chiffre s'appelle son rang.",
  },
  figure: {
    schema: figure4273,
    legende: "4 273 = 4 000 + 200 + 70 + 3.",
  },
  proprietes: [
    {
      titre: "La place donne la valeur",
      micros: ["entier_rang", "entier_decomposer"],
      texte: "Dans 4 273, le 2 vaut 200. C'est sa place qui compte.",
      schema: additionDesRangs,
    },
    {
      titre: "Le plus long gagne",
      micros: ["entier_comparer"],
      texte: "Le nombre qui a le plus de chiffres est le plus grand. 1 042 dépasse 98.",
      schema: lePlusLongGagne,
    },
    {
      titre: "Encadrer",
      micros: ["entier_encadrer"],
      texte: "Encadrer, c'est coincer un nombre entre deux nombres ronds. 40 < 47 < 50.",
      schema: encadrer47,
    },
    {
      titre: "Le zéro garde la place",
      micros: ["entier_lire_ecrire"],
      texte: "Un rang vide garde un 0. Sans lui, 1 042 deviendrait 142.",
      schema: leZeroQuiTientLaPlace,
    },
  ],
  reel: {
    texte:
      "Un score, un prix, un nombre de pages : ce sont des entiers. Pour trouver le moins cher, on compare deux entiers. Pour dire « environ 300 spectateurs », on encadre. Les entiers servent partout.",
  },
  historique: {
    texte:
      "Nos dix chiffres viennent d'Inde. En 628, le savant Brahmagupta explique le zéro. Grâce au zéro, la place d'un chiffre donne sa valeur. Les chiffres romains n'avaient pas de zéro.",
  },
  methode: [
    {
      titre: "Je range dans le tableau",
      micros: ["entier_rang"],
      texte: "J'écris un chiffre par case, en partant des unités. Dans 352, le 5 tombe aux dizaines.",
      schema: rang352,
    },
    {
      titre: "Je compare de gauche à droite",
      micros: ["entier_comparer"],
      texte: "Même nombre de chiffres ? Je compare d'abord les centaines. 9 centaines battent 8 centaines.",
      schema: compare908,
    },
    {
      titre: "Je vérifie le zéro",
      micros: ["entier_lire_ecrire"],
      texte: "Un rang sans rien reçoit un 0. Trois cent quatre s'écrit 304.",
      schema: zero304,
    },
  ],
  usages: [
    {
      titre: "Ranger des nombres",
      micros: ["entier_comparer"],
      detail: "Les trois ont 3 milliers. Je regarde les centaines : 3 045 < 3 405 < 3 450.",
      schema: ranger3045,
    },
    {
      titre: "Dire « environ »",
      micros: ["entier_encadrer"],
      detail: "5 280 est entre 5 000 et 6 000. Il y a un peu plus de 5 000.",
      schema: encadrer5280,
    },
    {
      titre: "Des mots aux chiffres",
      micros: ["entier_lire_ecrire"],
      detail: "Deux mille trente-cinq, c'est 2 000 + 35. J'écris 2 035.",
      schema: ecrire2035,
    },
  ],
  exemples: [
    {
      titre: "Écrire et trouver un rang",
      micros: ["entier_lire_ecrire", "entier_rang"],
      donnees: "On lit « mille quarante-deux ».",
      question: "Écris-le en chiffres. Quel est le chiffre des dizaines ?",
      schema: exemple1042,
      solution:
        "Mille quarante-deux, c'est 1 000 + 42. Il n'y a pas de centaine : j'écris un 0. Le nombre est 1 042. Le chiffre des dizaines est 4.",
    },
    {
      titre: "Décomposer un nombre",
      micros: ["entier_decomposer"],
      donnees: "On donne le nombre 2 845.",
      question: "Décompose 2 845.",
      schema: exemple2845,
      solution:
        "Il y a 2 milliers, 8 centaines, 4 dizaines et 5 unités. Chaque chiffre donne sa valeur. Donc 2 845 = 2 000 + 800 + 40 + 5.",
    },
    {
      titre: "Comparer deux nombres",
      micros: ["entier_comparer"],
      donnees: "On compare 345 et 354.",
      question: "Quel est le plus grand ?",
      schema: tableauComparaison,
      solution:
        "Les deux ont 3 chiffres. Les deux ont 3 centaines. Je compare les dizaines : 5 dépasse 4. Donc 354 est le plus grand.",
    },
    {
      titre: "Encadrer entre deux centaines",
      micros: ["entier_encadrer"],
      donnees: "On regarde le nombre 380.",
      question: "Entre quelles centaines qui se suivent se trouve 380 ?",
      schema: exemple380,
      solution:
        "380 a 3 centaines. Il est plus grand que 300. Il est plus petit que 400. On écrit 300 < 380 < 400.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Écris en chiffres : quatre-vingt-dix.",
      correction: "Quatre-vingt-dix, c'est 80 + 10. J'écris 90.",
      micros: ["entier_lire_ecrire"],
    },
    {
      question: "Dans 7 306, quel est le chiffre des centaines ?",
      correction: "Je pars de la droite : 6 unités, 0 dizaine, 3 centaines. Le chiffre des centaines est 3.",
      micros: ["entier_rang"],
    },
    {
      question: "Quel est le plus petit : 1 480 ou 1 408 ?",
      correction: "Même nombre de milliers et de centaines. 0 dizaine contre 8 dizaines : 1 408 est le plus petit.",
      micros: ["entier_comparer"],
    },
    {
      question: "Décompose 706.",
      correction: "7 centaines, 0 dizaine, 6 unités. Donc 706 = 700 + 6.",
      micros: ["entier_decomposer"],
    },
    {
      question: "Encadre 326 entre deux centaines qui se suivent.",
      correction: "326 a 3 centaines. On écrit 300 < 326 < 400.",
      micros: ["entier_encadrer"],
    },
    {
      question: "Défi : avec 3, 0, 5 et 1, une fois chacun, écris le plus petit nombre de 4 chiffres.",
      correction: "Le 0 ne peut pas être en premier. Je mets 1, puis 0, puis 3, puis 5. Réponse : 1 035.",
      micros: ["entier_defi"],
      schema: defi1035,
    },
  ],
  tiMargo: {
    objectif: "La place d'un chiffre donne sa valeur !",
    definition: "Dix chiffres suffisent pour écrire tous les nombres !",
    methode: "Un chiffre par case, en partant des unités !",
    pieges: "Un rang vide ? J'écris 0 !",
    retenir: "Plus de chiffres, plus grand !",
    exercice: "À toi ! Commence par la droite.",
  },
  coachHref: "/coach-ia/maths?classe=6e",
};

// Le mode classe est ENGENDRÉ depuis la fiche (`slidesDepuisFiche`) : ce
// tableau reste exporté pour la page, mais il n'est pas projeté.
// ⛔ AUCUN LATEX DANS LES DIAPOS.
export const slidesEntiers6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Entiers - 6e",
    schema: figure4273,
    section: {
      type: "objectif",
      phrase: "La place d'un chiffre donne sa valeur",
      sousPhrase: "Dans 4 273, le 2 vaut 200.",
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Comparer",
    teinte: "exemple",
    schema: tableauComparaison,
    section: {
      type: "exemple",
      enonce: "On compare 345 et 354.",
      question: "Quel est le plus grand ?",
      correction: "Mêmes centaines. 5 dizaines battent 4 dizaines : 354 est le plus grand.",
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    schema: defi1035,
    section: {
      type: "exercice",
      enonce: "Avec 3, 0, 5 et 1, une fois chacun.",
      question: "Quel est le plus petit nombre de 4 chiffres ?",
      indice: "Le 0 ne peut pas être en premier.",
      correction: "1, puis 0, 3, 5 : 1 035.",
    },
  },
];
