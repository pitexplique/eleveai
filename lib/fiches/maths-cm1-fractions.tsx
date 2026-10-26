// ─── Fiche de cours : les fractions (CM1) ───────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm1/maths/fractions.bank.ts (+ fractions-gabarits-*.ts),
// notionId `fraction`. CM1 = 9-10 ans : peu de mots, une idée par phrase, un
// dessin du coach sur CHAQUE bloc. Fiche de découverte : lire, dessiner, placer,
// comparer, les fractions égales (prépare SIMPLIFIER en 6e) et les fractions
// décimales (prépare le NOMBRE À VIRGULE). ⛔ Pas d'addition de fractions
// différentes ni de pourcentage : ce n'est pas au programme de CM1.
//
// Micro-compétences 9/9 (le champ `micros` de chaque bloc fait foi) :
// - fraction_lire         → définition + figure (barre 3/4), propriété 1 (le nom des
//                           parts), réflexe 1 (lire 5/8), exemple 1 (5/8), entraînement 1
// - fraction_representer  → propriété 2 (parts inégales), usage 1 (disque 2/6),
//                           exemple 2 (grille 7/10)
// - fraction_unite        → propriété 3 (pizza 8/8 = 1), réflexe 2, entraînement 2 (5/5)
// - fraction_superieure_1 → propriété 4 (7/5 après 1), réflexe 2, exemple 4 (9 parts
//                           d'une pizza de 8 = 9/8)
// - fraction_droite       → propriété 5 (2/5 au 2e trait), exemple 3 (3/8),
//                           entraînement 3 (5/6)
// - fraction_comparer     → propriété 6 (2/5 et 4/5), exemple 5 (1/4 et 1/8),
//                           entraînement 4 (6/10 et 4/10)
// - fraction_equivalente  → propriété 7 (3/6 = 1/2), réflexe 3 (2/3 = 4/6),
//                           usage 3 (5 cases sur 10 = 1/2), entraînement 5
// - fraction_decimale     → propriété 8 (23/100 = 0,23), usage 2 (le tableau des
//                           décimales), entraînement 6 (8/10 = 0,8)
// - fraction_defi         → exemple 6 « Le défi 974 » (l'ananas en 10 morceaux),
//                           entraînement 7 (le gâteau de Lina et Noé)
// Tous les nombres sortent de la banque.
//
// ⛔ AUCUN LATEX : les fractions s'écrivent « 3/4 » partout (le mode classe les
// projette telles quelles). ⚠️ Les `size` suivent la fiche de 6e (mesurées) :
// cadre de 250 pour `fraction`, 260 × 90 pour `number_line`. Sur une droite
// partagée en tiers ou en huitièmes, les VALEURS des graduations sont cachées
// (elles écriraient « 0,333 ») : 0 et 1 sont posés en points gris.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { avecMargo } from "@/components/fiches/TiMargoBulle";

const BLEU = "#2563eb";
const VERT = "#16a34a";
const ORANGE = "#f59e0b";
const GRIS = "#475569";

type Frac = { numerator: number; denominator: number; label?: string; color?: string };
type Point = { value: number; label: string; color: string };

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

/** Une barre partagée (cadre de 250, plat : une barre n'a rien à montrer en hauteur). */
const barre = (f: Frac, montrer = true) => (
  <CanvasRenderer
    figure={{
      kind: "fraction",
      model: "bar",
      fraction: f,
      display: { showFraction: montrer },
      size: { width: 250, height: montrer ? 150 : 130 },
    }}
  />
);

/** Un disque partagé : la pizza, le gâteau. */
const disque = (f: Frac, montrer = true) => (
  <CanvasRenderer
    figure={{
      kind: "fraction",
      model: "circle",
      fraction: f,
      display: { showFraction: montrer },
      size: { width: 250, height: montrer ? 200 : 180 },
    }}
  />
);

/** Deux barres l'une sous l'autre, même longueur : l'œil compare. */
const comparer = (a: Frac, b: Frac) => (
  <CanvasRenderer
    figure={{ kind: "fraction", model: "compare", fractions: [a, b], size: { width: 250, height: 210 } }}
  />
);

/** Une grille de cases égales, `colories` en couleur. */
const grille = (rows: number, cols: number, colories: number, montrer = true) => (
  <CanvasRenderer
    figure={{
      kind: "fraction",
      model: "grid",
      grid: { rows, cols, shaded: colories },
      display: { showFraction: montrer },
      size: { width: 250, height: 200 },
    }}
  />
);

/** La droite de la fiche. `valeurs` : écrire les nombres des graduations (seulement
 *  quand le pas est un entier ou un dixième « propre »). */
const droite = (min: number, max: number, pas: number, points: Point[], valeurs = false) => (
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min,
      max,
      step: pas,
      points,
      display: { showTicks: true, showValues: valeurs, showPoints: true, showPointLabels: true, showZero: true },
      size: { width: 260, height: 90 },
    }}
  />
);
const zero: Point = { value: 0, label: "0", color: GRIS };
const un: Point = { value: 1, label: "1", color: GRIS };

/** Un tableau à deux colonnes (jamais trois : il doit tenir sur un téléphone). */
const tableau = (title: string, headers: [string, string], rows: [string, string][]) => (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title,
      headers,
      rows: rows.map((values) => ({ values })),
      highlight: { col: 1 },
    }}
  />
);

// ─── Les dessins ──────────────────────────────────────────────────────────────

// LA FIGURE : l'unité en 4 parts égales, 3 coloriées (banque : « trois quarts »).
const barre34 = barre({ numerator: 3, denominator: 4 });

// PROPRIÉTÉ 1 : le bas donne le NOM des parts.
const nomsDesParts = tableau("Le nom des parts", ["Le bas", "On dit"], [
  ["2", "un demi, deux demis"],
  ["3", "des tiers"],
  ["4", "des quarts"],
  ["5", "des cinquièmes"],
  ["8", "des huitièmes"],
  ["10", "des dixièmes"],
]);

// PROPRIÉTÉ 2 : LE CONTRE-EXEMPLE. Le canvas écrit déjà « les parts ne sont pas
// égales » au-dessus : pas de légende en plus.
const partsInegales = (
  <CanvasRenderer
    figure={{
      kind: "fraction",
      model: "bar",
      fraction: { numerator: 2, denominator: 5, label: "pas une fraction" },
      display: { unequalParts: true },
      size: { width: 250, height: 150 },
    }}
  />
);

// PROPRIÉTÉ 3 : toute la pizza (banque : 8 parts égales, toutes prises).
const pizza88 = legende(disque({ numerator: 8, denominator: 8, label: "8/8 = 1", color: ORANGE }), "Toutes les parts : la pizza entière");

// PROPRIÉTÉ 4 : 7/5 passe après 1 (banque).
const septCinquiemes = legende(
  droite(0, 2, 0.2, [zero, un, { value: 1.4, label: "7/5", color: VERT }]),
  "7/5 est après 1"
);

// PROPRIÉTÉ 5 : 2/5 au 2e trait après 0 (banque).
const deuxCinquiemes = legende(
  droite(0, 1, 0.2, [zero, un, { value: 0.4, label: "2/5", color: BLEU }]),
  "5 parts égales : 2/5 est au 2e trait"
);

// PROPRIÉTÉ 6 : même bas, c'est le haut qui décide (banque : 2/5 … 4/5).
const compare2545 = legende(
  comparer({ numerator: 2, denominator: 5 }, { numerator: 4, denominator: 5 }),
  "Même bas : 4/5 est plus grand que 2/5"
);

// PROPRIÉTÉ 7 : deux écritures, la même moitié (banque : 3/6 et 1/2).
const compare1236 = legende(
  comparer({ numerator: 1, denominator: 2 }, { numerator: 3, denominator: 6 }),
  "La même longueur : 3/6 = 1/2"
);

// PROPRIÉTÉ 8 : une fraction décimale (banque : 23/100), 23 cases sur 100.
const grille23 = legende(grille(10, 10, 23), "23/100 = 0,23");

// RÉFLEXE 1 : décoder 5/8, ligne par ligne (banque).
const lire58 = tableau("Lire 5/8", ["Le nombre", "Ce qu'il dit"], [
  ["8 en bas", "8 parts égales"],
  ["5 en haut", "5 parts prises"],
]);

// RÉFLEXE 2 : comparer le haut et le bas (banque : 3/8, 4/4, 7/5).
const compareAUn = tableau("Avant 1, égal à 1, après 1", ["Le haut est…", "La fraction…"], [
  ["plus petit que le bas", "est avant 1 : 3/8"],
  ["égal au bas", "vaut 1 : 4/4"],
  ["plus grand que le bas", "dépasse 1 : 7/5"],
]);

// RÉFLEXE 3 : × 2 en haut ET en bas (banque : 2/3 = …/6).
const fois2 = tableau("2/3 = …/6", ["La fraction", "Ce que je fais"], [
  ["2/3", "× 2 en haut et en bas"],
  ["4/6", "la même part"],
]);

// USAGE 1 : le gâteau en 6 parts, 2 coloriées (banque).
const gateau26 = disque({ numerator: 2, denominator: 6, color: ORANGE });

// USAGE 2 : les fractions décimales s'écrivent avec une virgule (banque).
const tableDecimales = tableau("Avec une virgule", ["Fraction", "Nombre à virgule"], [
  ["7/10", "0,7"],
  ["8/10", "0,8"],
  ["23/100", "0,23"],
  ["37/100", "0,37"],
]);

// USAGE 3 : 5 cases sur 10 = la moitié (banque).
const grille510 = legende(grille(2, 5, 5), "5/10 = 1/2 : la moitié");

// EXEMPLES
const barre58 = barre({ numerator: 5, denominator: 8 }, false);
const grille710 = grille(2, 5, 7, false);
const troisHuitiemes = droite(0, 1, 0.125, [zero, un, { value: 0.375, label: "3/8", color: BLEU }]);
const neufHuitiemes = comparer(
  { numerator: 8, denominator: 8, label: "1 pizza = 8/8", color: ORANGE },
  { numerator: 1, denominator: 8, label: "1 part de plus", color: ORANGE }
);
const compare1418 = comparer({ numerator: 1, denominator: 4 }, { numerator: 1, denominator: 8 });
// LE DÉFI : l'ananas en 10 morceaux, 7 mangés. Il en reste 3.
const ananas = legende(
  barre({ numerator: 7, denominator: 10, label: "7 morceaux mangés", color: ORANGE }),
  "Il reste 3 morceaux sur 10"
);

const pieges = [
  "Lire « trois et quatre ». On dit « trois quarts ».",
  "Croire que 1/8 est plus grand que 1/4. Plus on coupe, plus les parts sont petites.",
  "Croire que 4/4 dépasse 1. 4/4 vaut 1, pile.",
  "Croire que 10/3 est décimale. Il faut 10, 100 ou 1 000 en BAS.",
];

const aRetenir = [
  "En bas : les parts égales. En haut : les parts prises.",
  "Le haut égal au bas : 1. Le haut plus grand : plus que 1.",
  "Une fraction est un nombre : elle a sa place sur la droite.",
];

export const ficheFractionsCM1: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm1",
  notion: "fraction",
  titre: "Les fractions",
  accroche:
    "On coupe un gâteau, une pizza, un ananas en parts égales. Une fraction dit combien de parts on prend.",
  identite: [
    { label: "Mots clés", valeur: "Numérateur (en haut), dénominateur (en bas)" },
    { label: "Le secret", valeur: "Des parts égales, toujours" },
    { label: "Outil", valeur: "Une barre, un disque, une grille, la droite" },
  ],
  definition: {
    texte:
      "Une fraction dit combien de parts on prend. Le tout est coupé en parts égales. Le nombre du bas compte les parts. Le nombre du haut compte les parts prises.",
  },
  figure: {
    schema: barre34,
    legende: "3/4 se lit « trois quarts » : 3 parts prises sur 4.",
  },
  proprietes: [
    {
      titre: "Lire une fraction",
      micros: ["fraction_lire"],
      texte: "Je dis le haut, puis le nom des parts. 3/4 : trois quarts.",
      schema: nomsDesParts,
    },
    {
      titre: "Toujours des parts égales",
      micros: ["fraction_representer"],
      texte: "Sans parts égales, pas de fraction.",
      schema: partsInegales,
    },
    {
      titre: "Une unité entière",
      micros: ["fraction_unite"],
      texte: "Toutes les parts sont prises : la fraction vaut 1. 8/8 = 1.",
      schema: pizza88,
    },
    {
      titre: "Plus grand que 1",
      micros: ["fraction_superieure_1"],
      texte: "Le haut est plus grand que le bas : la fraction dépasse 1. 7/5 > 1.",
      schema: septCinquiemes,
    },
    {
      titre: "Sur la droite",
      micros: ["fraction_droite"],
      texte: "Je coupe de 0 à 1 en parts égales. 2/5 est au 2e trait.",
      schema: deuxCinquiemes,
    },
    {
      titre: "Comparer",
      micros: ["fraction_comparer"],
      texte: "Même bas : le plus grand haut gagne. 4/5 > 2/5.",
      schema: compare2545,
    },
    {
      titre: "Deux fractions égales",
      micros: ["fraction_equivalente"],
      texte: "Deux fractions peuvent dire la même part. 3/6 = 1/2.",
      schema: compare1236,
    },
    {
      titre: "Les fractions décimales",
      micros: ["fraction_decimale"],
      texte: "En bas : 10, 100 ou 1 000. Elles s'écrivent avec une virgule.",
      schema: grille23,
    },
  ],
  reel: {
    texte:
      "Au goûter, on coupe le gâteau en parts égales. Au marché, on achète un demi-ananas. Une demi-heure, c'est 1/2 heure. Un dixième de seconde départage les coureurs.",
  },
  historique: {
    texte:
      "Il y a près de 4 000 ans, les Égyptiens partageaient déjà le pain avec des fractions. Ils écrivaient surtout 1/2, 1/3 ou 1/4. Le mot « fraction » veut dire « casser ».",
  },
  methode: [
    {
      titre: "Je lis le bas d'abord",
      micros: ["fraction_lire"],
      texte: "Le bas : les parts égales. Puis le haut : les parts prises.",
      schema: lire58,
    },
    {
      titre: "Je compare à 1",
      micros: ["fraction_unite", "fraction_superieure_1"],
      texte: "Je regarde le haut et le bas. Le plus grand des deux me dit où est la fraction.",
      schema: compareAUn,
    },
    {
      titre: "Je change l'écriture",
      micros: ["fraction_equivalente"],
      texte: "Je multiplie le haut ET le bas par le même nombre. La part ne change pas.",
      schema: fois2,
    },
  ],
  usages: [
    {
      titre: "Partager un gâteau",
      micros: ["fraction_representer"],
      detail: "Un gâteau coupé en 6 parts égales. On en prend 2 : c'est 2/6.",
      schema: gateau26,
    },
    {
      titre: "Écrire un nombre à virgule",
      micros: ["fraction_decimale"],
      detail: "7/10, c'est sept dixièmes. On l'écrit aussi 0,7.",
      schema: tableDecimales,
    },
    {
      titre: "Trouver la moitié",
      micros: ["fraction_equivalente"],
      detail: "5 cases coloriées sur 10 : c'est la moitié. 5/10 = 1/2.",
      schema: grille510,
    },
  ],
  exemples: [
    {
      titre: "Lire une fraction",
      micros: ["fraction_lire"],
      donnees: "Une barre de 8 parts égales. 5 sont coloriées.",
      question: "Quelle fraction est coloriée ? Comment se lit-elle ?",
      schema: barre58,
      solution: "8 parts égales : 8 en bas. 5 coloriées : 5 en haut. C'est 5/8, « cinq huitièmes ».",
    },
    {
      titre: "La grille",
      micros: ["fraction_representer"],
      donnees: "Une grille de 10 cases. 7 sont coloriées.",
      question: "Quelle fraction de la grille est coloriée ?",
      schema: grille710,
      solution: "10 cases en tout : 10 en bas. 7 coloriées : 7 en haut. C'est 7/10.",
    },
    {
      titre: "Sur la droite",
      micros: ["fraction_droite"],
      donnees: "La droite de 0 à 1 est coupée en 8 parts égales.",
      question: "À quel trait se place 3/8 ?",
      schema: troisHuitiemes,
      solution: "Chaque part vaut 1/8. Je compte 3 parts après 0 : 3/8 est au 3e trait.",
    },
    {
      titre: "Plus qu'une pizza",
      micros: ["fraction_superieure_1"],
      donnees: "Une pizza a 8 parts. On a mangé 9 parts.",
      question: "Quelle fraction de pizza a-t-on mangée ?",
      schema: neufHuitiemes,
      solution: "Une part, c'est 1/8. 9 parts, c'est 9/8. C'est une pizza entière et 1 part de plus : 9/8 dépasse 1.",
    },
    {
      titre: "Comparer",
      micros: ["fraction_comparer"],
      donnees: "On compare 1/4 et 1/8.",
      question: "Laquelle est la plus grande ?",
      schema: compare1418,
      solution: "En haut, c'est 1 des deux côtés. Coupé en 4, les parts sont plus grosses que coupé en 8. Donc 1/4 > 1/8.",
    },
    {
      titre: "Le défi 974",
      micros: ["fraction_defi"],
      donnees: "À La Réunion, un ananas est coupé en 10 morceaux égaux. On mange 7 morceaux.",
      question: "Quelle fraction de l'ananas reste-t-il ?",
      schema: ananas,
      solution: "10 morceaux en tout. 10 − 7 = 3 morceaux restent. Il reste 3/10 de l'ananas.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Comment lit-on la fraction 2/5 ?",
      correction: "On dit le haut, puis le nom des parts : « deux cinquièmes ».",
      micros: ["fraction_lire"],
    },
    {
      question: "Une unité est coupée en 5 parts égales. Que vaut 5/5 ?",
      correction: "Les 5 parts sont prises : c'est l'unité entière. 5/5 = 1.",
      micros: ["fraction_unite"],
    },
    {
      question: "La droite de 0 à 1 est coupée en 6 parts égales. Le point est au 5e trait. Quelle fraction ?",
      correction: "6 parts égales : 6 en bas. 5e trait : 5 en haut. C'est 5/6.",
      micros: ["fraction_droite"],
    },
    {
      question: "Complète avec <, > ou = : 6/10 … 4/10.",
      correction: "Même bas. 6 est plus grand que 4. Donc 6/10 > 4/10.",
      micros: ["fraction_comparer"],
    },
    {
      question: "Complète : 2/3 = …/6.",
      correction: "3 × 2 = 6 en bas. Je fais pareil en haut : 2 × 2 = 4. Donc 2/3 = 4/6.",
      micros: ["fraction_equivalente"],
    },
    {
      question: "Léo a fait 8/10 du trajet. Écris ce nombre avec une virgule.",
      correction: "8/10, c'est huit dixièmes. Il s'écrit 0,8.",
      micros: ["fraction_decimale"],
    },
    {
      question: "Un gâteau a 8 parts égales. Lina mange 3 parts, Noé 2 parts. Quelle fraction ont-ils mangée ensemble ?",
      correction: "3 parts + 2 parts = 5 parts. Le gâteau a 8 parts. Ils ont mangé 5/8 du gâteau.",
      micros: ["fraction_defi"],
    },
  ],
  tiMargo: {
    objectif: "Une fraction, ce sont des parts égales !",
    definition: "En bas, on coupe. En haut, on prend !",
    methode: "Je lis toujours le nombre du bas d'abord !",
    pieges: "Plus on coupe, plus les parts sont petites !",
    retenir: "4/4, c'est 1 tout pile !",
    exercice: "À toi ! Compte les morceaux d'ananas.",
  },
  coachHref: "/coach-ia/maths?classe=cm1",
};

// ⛔ Le mode classe est engendré par la fiche (`slidesDepuisFiche`) : la page
// passe encore ce tableau, il reste court (même patron que la fiche de 6e).
export const slidesFractionsCM1: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Fractions - CM1",
    teinte: "objectif",
    schema: avecMargo(barre34, "Une fraction, ce sont des parts égales !", "joie"),
    section: {
      type: "objectif",
      phrase: "Lire, dessiner et placer une fraction",
      sousPhrase: "3/4, c'est 3 parts prises sur 4 parts égales.",
    },
  },
  {
    titre: "Pièges à éviter",
    badge: "Vigilance",
    teinte: "piege",
    schema: avecMargo(compare1418, "Plus on coupe, plus les parts sont petites !", "attention"),
    section: { type: "etapes", etapes: pieges },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    schema: avecMargo(ananas, "À toi ! Compte les morceaux qui restent.", "joie"),
    section: {
      type: "exercice",
      enonce: "Un ananas est coupé en 10 morceaux égaux. On en mange 7.",
      question: "Quelle fraction de l'ananas reste-t-il ?",
      indice: "Compte les morceaux qui ne sont pas mangés.",
      correction: "10 − 7 = 3. Il reste 3/10 de l'ananas.",
    },
  },
];
