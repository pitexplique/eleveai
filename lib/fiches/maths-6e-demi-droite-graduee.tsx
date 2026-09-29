// ─── Fiche de cours : la demi-droite graduée (6e) ─────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/6e/maths/demi-droite.bank.ts (notionId demi_droite_graduee).
//
// ⭐ ÉCRITE POUR DES 6e QUI LISENT DIFFICILEMENT (consignes du 30/09/2026) :
// phrases courtes, une idée par phrase, un dessin sur CHAQUE bloc, et un mode
// classe où Ti Margo dit la phrase clé.
//
// Micro-compétences 4/4 :
// - abscisse_lire     → définition + figure (D = 2,5), propriété « Lire le pas »
//                       (C = 0,3), méthode 1 (le pas = 0,2), usage « la règle »
//                       (3,7), exemple 1 (A = 0,5), entraînement 1
// - abscisse_placer   → propriété « Chaque nombre a sa place » (0,1 · 0,5 · 0,9),
//                       méthode 2 (2,3), usage « comparer » (0,4 et 0,04),
//                       exemple 2 (4,2), entraînement 2
// - abscisse_fraction → propriété « Une fraction a sa place » (3/4), méthode 3
//                       (7/4), exemple 3 (3/2), entraînement 3
// - abscisse_graduer  → propriété « Graduer, c'est partager » (12 cm en quarts),
//                       usage « la bande de 10 cm » (2,5 cm), exemple 4 (3/5 de
//                       10 cm), entraînement 4 et 5
// Tous les nombres sortent de la banque.
//
// ⚠️ `number_line` ne sait pas tracer de petits traits sans valeur : au-delà de
// six graduations, les nombres se chevauchent. On gradue donc par pas larges
// (0,2 · 0,25 · 0,5), comme la banque, et les points tombent ENTRE deux traits.
// ⚠️ Sa police est fixe (14) : cadre de 260 → 14 × 226/260 = 12,2 px dans une
// carte de 250. Jamais le cadre par défaut (320) dans une carte.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";
import { avecMargo } from "@/components/fiches/TiMargoBulle";

const BLEU = "#2563eb";
const VERT = "#16a34a";
const ROUGE = "#dc2626";

type Pt = { value: number; label: string; color?: string };

/** La demi-droite de la fiche : cadre plat, tous les réglages fixés une fois. */
const droite = (min: number, max: number, pas: number, points: Pt[] = []) => (
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min,
      max,
      step: pas,
      points,
      display: {
        showTicks: true,
        showValues: true,
        showPoints: points.length > 0,
        showPointLabels: points.length > 0,
        showZero: true,
      },
      size: { width: 260, height: 90 },
    }}
  />
);

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

// ─── Les dessins ──────────────────────────────────────────────────────────────

// LA FIGURE : graduée d'unité en unité, un point au milieu de 2 et 3.
const figureD = droite(0, 5, 1, [{ value: 2.5, label: "D", color: BLEU }]);

// LIRE : le piège du 3e trait. C n'est pas à 3, il est à 0,3.
const lirePas = droite(0, 1, 0.2, [{ value: 0.3, label: "C", color: BLEU }]);

// PLACER : trois nombres, trois places. Le milieu, et les deux bouts.
const troisPlaces = droite(0, 1, 0.2, [
  { value: 0.1, label: "0,1", color: VERT },
  { value: 0.5, label: "0,5", color: BLEU },
  { value: 0.9, label: "0,9", color: VERT },
]);

// FRACTION : l'unité coupée en quatre. 3/4 sur le 3e trait.
const troisQuarts = droite(0, 1, 0.25, [{ value: 0.75, label: "3/4", color: BLEU }]);

// GRADUER : un segment de 12 cm en 4 parts ÉGALES. La barre montre les parts,
// pas les traits : c'est le partage qui fait la graduation.
const douzeEnQuarts = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      size: { width: 240, height: 190 },
      total: "12 cm",
      parts: [
        { label: "1/4", value: "3 cm" },
        { label: "1/4", value: "3 cm" },
        { label: "1/4", value: "3 cm" },
        { label: "1/4", value: "3 cm" },
      ],
      questionLabel: "12 ÷ 4 = 3 cm par part",
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: true },
    }}
  />
);

// MÉTHODE 1 : le pas, dessiné comme un morceau de droite entre 0,4 et 0,6.
const lePas = (
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 0,
      max: 1,
      step: 0.2,
      intervalles: [{ de: 0.4, a: 0.6, deInclus: true, aInclus: true, color: "#f59e0b", label: "pas = 0,2" }],
      display: { showTicks: true, showValues: true, showPoints: false, showZero: true },
      size: { width: 260, height: 90 },
    }}
  />
);

// MÉTHODE 2 : 2,3 n'est pas collé à 2 (ça, c'est 2,03).
const deuxVirguleTrois = droite(2, 3, 0.2, [{ value: 2.3, label: "2,3", color: BLEU }]);

// MÉTHODE 3 : 7/4 entre 1 et 2, tout près de 2.
const septQuarts = droite(0, 2, 0.5, [{ value: 1.75, label: "7/4", color: BLEU }]);

// USAGE : une règle entre 3 et 4 cm.
const regle = droite(3, 4, 0.2, [{ value: 3.7, label: "3,7", color: BLEU }]);

// USAGE : 0,4 loin de 0, 0,04 collé à 0.
const quatreDixiemes = droite(0, 1, 0.2, [
  { value: 0.04, label: "0,04", color: ROUGE },
  { value: 0.4, label: "0,4", color: VERT },
]);

// USAGE : 10 cm en quarts → des traits tous les 2,5 cm.
const dixEnQuarts = (
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 0,
      max: 10,
      step: 2.5,
      display: { showTicks: true, showValues: true, showPoints: false, showZero: true },
      size: { width: 260, height: 90 },
    }}
  />
);

// EXEMPLES
const exempleA = droite(0, 1, 0.2, [{ value: 0.5, label: "A", color: BLEU }]);
const exemple42 = droite(3.5, 5, 0.5, [{ value: 4.2, label: "4,2", color: BLEU }]);
const exempleB = droite(0, 2, 0.5, [{ value: 1.5, label: "B", color: BLEU }]);
const exempleTroisCinquiemes = droite(0, 10, 2, [{ value: 6, label: "3/5", color: BLEU }]);

// ENTRAÎNEMENT : la bande de 15 cm en tiers.
const quinzeEnTiers = droite(0, 15, 5);

const pieges = [
  "Compter les traits au lieu de lire leur valeur. Le 3e trait n'est pas forcément 3 : avec un pas de 0,2, il vaut 0,6.",
  "Chercher 2,3 tout près de 2. C'est 2,03 qui est collé à 2.",
  "Tracer 4 traits pour 4 parts. Il en faut 3 : les deux bouts sont déjà là.",
];

const aRetenir = [
  "Chaque point a un seul nombre : son abscisse.",
  "D'abord je lis le pas entre deux traits. Ensuite je compte depuis 0.",
  "Graduer en 4 parts : je divise la longueur par 4.",
];

export const ficheDemiDroiteGraduee6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "demi-droite-graduee",
  titre: "La demi-droite graduée",
  accroche:
    "Une règle, une barre de chargement : ce sont des droites graduées. Chaque nombre y a sa place, même 3/4 !",
  identite: [
    { label: "Le mot clé", valeur: "L'abscisse : le nombre d'un point" },
    { label: "Le secret", valeur: "Lire le pas avant de compter" },
    { label: "Outil", valeur: "La règle graduée" },
  ],
  definition: {
    texte:
      "Une demi-droite graduée part d'un point, l'origine, qui vaut 0. On y reporte toujours la même longueur. Chaque point porte un nombre : son abscisse.",
  },
  figure: {
    schema: legende(figureD, "D est au milieu de 2 et 3 : D a pour abscisse 2,5."),
    legende: "On écrit D(2,5). Un point a une seule abscisse.",
  },
  proprietes: [
    {
      titre: "Je lis le pas",
      micros: ["abscisse_lire"],
      texte: "Un pas ne vaut pas toujours 1. Ici, de 0,2 en 0,2 : C est à 0,3, pas à 3.",
      schema: lirePas,
    },
    {
      titre: "Chaque nombre a sa place",
      micros: ["abscisse_placer"],
      texte: "0,5 est au milieu de 0 et 1. 0,1 est près de 0, 0,9 près de 1.",
      schema: troisPlaces,
    },
    {
      titre: "Une fraction a sa place",
      micros: ["abscisse_fraction"],
      texte: "L'unité est coupée en 4 : chaque trait vaut un quart. $\\frac{3}{4}$ est sur le 3e trait.",
      schema: troisQuarts,
    },
    {
      titre: "Graduer, c'est partager",
      micros: ["abscisse_graduer"],
      texte: "Pour 4 parts égales, je divise la longueur par 4 : 12 cm ÷ 4 = 3 cm.",
      schema: douzeEnQuarts,
    },
  ],
  reel: {
    texte:
      "Une règle est une demi-droite graduée. Le thermomètre et la jauge d'essence aussi. La barre de chargement d'un jeu va de 0 à 100 %. Partout, on lit le pas avant de lire le nombre.",
  },
  historique: {
    texte:
      "En 1637, René Descartes repère des points avec des nombres. Son idée a changé les maths. Le mot « abscisse » vient du latin. Il veut dire « coupée ».",
  },
  methode: [
    {
      titre: "Je trouve le pas",
      micros: ["abscisse_lire"],
      texte: "Je prends deux nombres écrits, côte à côte. De 0,4 à 0,6, le pas vaut 0,2.",
      schema: lePas,
    },
    {
      titre: "Je compte depuis 0",
      micros: ["abscisse_placer"],
      texte: "Pour 2,3 : je vais à 2, puis j'avance de 3 dixièmes. Il est entre 2,2 et 2,4.",
      schema: deuxVirguleTrois,
    },
    {
      titre: "Je vérifie avec les entiers",
      micros: ["abscisse_fraction"],
      texte: "4 quarts font 1, 8 quarts font 2. Donc $\\frac{7}{4}$ est entre 1 et 2, tout près de 2.",
      schema: septQuarts,
    },
  ],
  usages: [
    {
      titre: "Lire une règle",
      micros: ["abscisse_lire"],
      detail: "Entre 3 et 4 cm, il y a des petits traits. Le crayon s'arrête à 3,7 cm.",
      schema: regle,
    },
    {
      titre: "Comparer deux nombres",
      micros: ["abscisse_placer"],
      detail: "Le plus grand est le plus à droite. 0,4 est bien plus loin de 0 que 0,04.",
      schema: quatreDixiemes,
    },
    {
      titre: "Partager une bande",
      micros: ["abscisse_graduer"],
      detail: "Une bande de 10 cm en 4 parts : 10 ÷ 4 = 2,5 cm. Un trait tous les 2,5 cm.",
      schema: dixEnQuarts,
    },
  ],
  exemples: [
    {
      titre: "Lire une abscisse",
      micros: ["abscisse_lire"],
      donnees: "Les graduations vont de 0,2 en 0,2. A est au milieu de 0,4 et 0,6.",
      question: "Quelle est l'abscisse de A ?",
      schema: exempleA,
      solution:
        "Un pas vaut 0,2. A est entre 0,4 et 0,6. Il est pile au milieu. Son abscisse est 0,5. On écrit A(0,5).",
    },
    {
      titre: "Placer un nombre",
      micros: ["abscisse_placer"],
      donnees: "Les graduations vont de 0,5 en 0,5.",
      question: "Entre quelles graduations va 4,2 ?",
      schema: exemple42,
      solution:
        "4,2 est plus grand que 4. 2 dixièmes, c'est moins que 5 dixièmes : 4,2 est plus petit que 4,5. Il va entre 4 et 4,5, un peu avant le milieu.",
    },
    {
      titre: "Une fraction plus grande que 1",
      micros: ["abscisse_fraction"],
      donnees: "L'unité est coupée en 2 parts égales.",
      question: "Quelle fraction est l'abscisse de B ?",
      schema: exempleB,
      solution:
        "Chaque trait vaut un demi. De 0 à B, je compte 3 demis. L'abscisse de B est $\\frac{3}{2}$. C'est plus que 1 : la droite continue après 1.",
    },
    {
      titre: "Graduer un segment",
      micros: ["abscisse_graduer"],
      donnees: "Un segment de 10 cm est gradué en cinquièmes.",
      question: "À combien de cm de 0 est la graduation $\\frac{3}{5}$ ?",
      schema: exempleTroisCinquiemes,
      solution:
        "Un cinquième de 10 cm : 10 ÷ 5 = 2 cm. La graduation $\\frac{3}{5}$ est la 3e. Elle est à 3 × 2 = 6 cm de 0.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Les graduations vont de 0,2 en 0,2. Un point est au milieu de 0,2 et 0,4. Quelle est son abscisse ?",
      correction: "0,3. Attention : ce n'est pas 3, même s'il est près du 2e trait.",
      micros: ["abscisse_lire"],
    },
    {
      question: "Entre quels entiers se place 2,7 ? Est-il plus près de 2 ou de 3 ?",
      correction: "Entre 2 et 3. Il est à 7 dixièmes de 2 : il est plus près de 3.",
      micros: ["abscisse_placer"],
    },
    {
      question: "L'unité est coupée en 4. Où se place $\\frac{5}{4}$ ?",
      correction: "4 quarts m'amènent sur 1. Le 5e quart dépasse : $\\frac{5}{4}$ est un quart après 1.",
      micros: ["abscisse_fraction"],
    },
    {
      question: "Tu gradues un segment de 15 cm en tiers. Où places-tu les traits ?",
      correction: "15 ÷ 3 = 5 cm. Un trait à 5 cm, un autre à 10 cm. Deux traits suffisent.",
      micros: ["abscisse_graduer"],
      schema: quinzeEnTiers,
    },
    {
      question: "Combien de traits faut-il À L'INTÉRIEUR d'un segment pour faire 4 parts égales ?",
      correction: "3 traits. Les deux bouts du segment sont déjà là.",
      micros: ["abscisse_graduer"],
    },
  ],
  tiMargo: {
    objectif: "Chaque point a son nombre !",
    definition: "3/4, c'est un nombre, pas un morceau !",
    methode: "D'abord le pas, ensuite je compte !",
    pieges: "Le 3e trait n'est pas 3 !",
    exercice: "À toi ! Compte les demis.",
  },
  coachHref: "/coach-ia/maths?classe=6e",
};

// ⛔ AUCUN LATEX DANS LES DIAPOS : le mode classe n'a pas de rendu KaTeX.
export const slidesDemiDroiteGraduee6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Demi-droite graduée - 6e",
    schema: avecMargo(figureD, "Chaque point a son nombre !"),
    section: {
      type: "objectif",
      phrase: "Chaque nombre a sa place sur la droite",
      sousPhrase: "Ce nombre s'appelle l'abscisse. D a pour abscisse 2,5.",
      encadre: { titre: "L'idée", texte: "On part de 0 et on reporte toujours la même longueur." },
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    teinte: "reel",
    schema: regle,
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu: "Une règle, un thermomètre, une barre de chargement : ce sont des droites graduées.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu: "En 1637, Descartes repère des points avec des nombres. « Abscisse » veut dire « coupée ».",
      },
    },
  },
  {
    titre: "La règle d'or",
    badge: "À connaître par cœur",
    teinte: "essentiel",
    schema: avecMargo(lePas, "D'abord le pas, ensuite je compte !", "joie"),
    section: {
      type: "objectif",
      phrase: "Je lis le pas avant de compter",
      sousPhrase: "Deux nombres écrits, côte à côte : de 0,4 à 0,6, le pas vaut 0,2.",
    },
  },
  {
    titre: "Ce qu'on sait faire",
    badge: "4 gestes",
    teinte: "propriete",
    schema: troisPlaces,
    section: {
      type: "cartes",
      cartes: [
        { titre: "Lire", texte: "Je trouve le nombre d'un point." },
        { titre: "Placer", texte: "Je mets un nombre à sa place : 0,5 au milieu de 0 et 1." },
        { titre: "Une fraction", texte: "L'unité en 4 : chaque trait vaut un quart." },
        { titre: "Graduer", texte: "12 cm en 4 parts : 12 ÷ 4 = 3 cm." },
      ],
    },
  },
  {
    titre: "Une fraction a sa place",
    badge: "Les quarts",
    teinte: "definition",
    schema: avecMargo(troisQuarts, "3/4, c'est un nombre, pas un morceau !"),
    section: {
      type: "objectif",
      phrase: "3/4 est sur le 3e trait",
      sousPhrase: "L'unité est coupée en 4 parts égales. Je compte 3 quarts depuis 0.",
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Lire une abscisse",
    teinte: "exemple",
    schema: exempleA,
    section: {
      type: "exemple",
      enonce: "Les graduations vont de 0,2 en 0,2.",
      question: "Quelle est l'abscisse de A ?",
      correction: "A est au milieu de 0,4 et 0,6. Son abscisse est 0,5.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Graduer",
    teinte: "exemple",
    schema: exempleTroisCinquiemes,
    section: {
      type: "exemple",
      enonce: "Un segment de 10 cm est coupé en 5 parts égales.",
      question: "Où est la graduation 3/5 ?",
      correction: "Une part : 10 ÷ 5 = 2 cm. Trois parts : 3 × 2 = 6 cm.",
    },
  },
  {
    titre: "Attention aux pièges",
    badge: "Vigilance",
    teinte: "piege",
    schema: avecMargo(lirePas, "Le 3e trait n'est pas 3 !", "attention"),
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Pièges",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            <li>• Compter les traits au lieu de lire le pas.</li>
            <li>• 4 parts, c'est 3 traits, pas 4.</li>
          </ul>
        ),
      },
      droite: {
        variante: "ok",
        titre: "À retenir",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            <li>• Le pas d'abord.</li>
            <li>• Je compte depuis 0.</li>
          </ul>
        ),
      },
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    schema: avecMargo(exempleB, "À toi ! Compte les demis.", "joie"),
    section: {
      type: "exercice",
      enonce: "L'unité est coupée en 2 parts égales.",
      question: "Quelle fraction est l'abscisse de B ?",
      indice: "Chaque trait vaut un demi.",
      correction: "3 demis : B a pour abscisse 3/2. C'est plus que 1.",
    },
  },
];
