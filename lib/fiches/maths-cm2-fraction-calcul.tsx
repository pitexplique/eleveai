// ─── Fiche de cours : calculer avec les fractions (CM2) ─────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm2/maths/fractions-calcul.bank.ts, notionId
// `fraction_calcul`. CM2 = 10-11 ans : peu de mots, un dessin du coach par bloc.
//
// ⭐ UN SEUL PRINCIPE, comme dans la banque : une fraction COMPTE DES PARTS, et le
// bas dit lesquelles. 3 huitièmes + 2 huitièmes = 5 huitièmes, comme 3 pommes
// + 2 pommes = 5 pommes. Le bas ne s'additionne jamais.
// ⭐ LES BORNES DU BO : même bas, ou un bas dans la table de l'autre (3/2 + 7/8,
// 5/6 − 1/12). ⛔ Jamais 1/3 + 1/4 : c'est la 6e.
// ⭐ PRÉPARE LA SUITE sans la dépasser : un résultat qui se SIMPLIFIE (9/12 = 3/4,
// 6/3 = 2) et le lien moitié / quart / dixième → 50 %, 25 %, 10 % (fiche
// `pourcentage` du CM2).
//
// Micro-compétences 3/3 (le champ `micros` de chaque bloc fait foi) :
// - fraction_additionner    → définition + figure (3/8 + 2/8), propriétés 1-3,
//                             réflexe 1 (3/2 + 7/8), usage 1, exemples 1-2,
//                             entraînements 1, 2
// - fraction_produit_entier → propriétés 4-5 (3 × 5/4, 6 × 1/3), réflexe 2
//                             (4 × 2/5), usage 2, exemple 3, entraînements 3, 4
// - fraction_quantite       → propriété 6 (2/3 de 12 œufs), réflexe 3 (2/5 de
//                             60 kg), usage 3 (moitié, quart, dixième), exemple 4
//                             (3/10 de 500 g), défi 974 (les letchis),
//                             entraînements 5, 6
// Tous les nombres sortent de la banque (items fixes et gabarits).
//
// ⛔ AUCUN LATEX : « 3/8 » partout ; une division s'écrit « ÷ ».

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { avecMargo } from "@/components/fiches/TiMargoBulle";

const BLEU = "#3b82f6";
const VERT = "#10b981";
const ORANGE = "#f59e0b";
const GRIS = "#e2e8f0";
const ROUGE = "#dc2626";

type Frac = { numerator: number; denominator: number; label?: string; color?: string };
type Point = { value: number; label: string; color: string };
type Part = { label: string; value?: string; color?: string };

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

/** Deux barres l'une sous l'autre, même longueur. */
const comparer = (a: Frac, b: Frac) => (
  <CanvasRenderer
    figure={{ kind: "fraction", model: "compare", fractions: [a, b], size: { width: 250, height: 210 } }}
  />
);

/** Un disque partagé : la pizza. */
const disque = (f: Frac) => (
  <CanvasRenderer figure={{ kind: "fraction", model: "circle", fraction: f, size: { width: 250, height: 200 } }} />
);

/** Une grille de cases égales. */
const grille = (rows: number, cols: number, colories: number) => (
  <CanvasRenderer
    figure={{ kind: "fraction", model: "grid", grid: { rows, cols, shaded: colories }, size: { width: 250, height: 200 } }}
  />
);

/** La droite. Graduée à l'entier (`valeurs`), ou en parts sans valeurs écrites. */
const droite = (min: number, max: number, pas: number, points: Point[], valeurs = true) => (
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

/** Le schéma en barres du BO : la quantité partagée en parts égales. */
const barres = (total: string, parts: Part[], question: string, title?: string) => (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title,
      total,
      parts,
      questionLabel: question,
      // Des parts sans nom (« enParts ») : pas de ligne d'étiquettes vides.
      display: { showPartLabels: parts.some((p) => p.label) },
      size: { width: 230, height: title ? 210 : 200 },
    }}
  />
);

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

/** n parts égales, les `prises` premières en couleur. */
const enParts = (n: number, prises: number, valeur?: string, couleur = ORANGE): Part[] =>
  Array.from({ length: n }, (_, i) => ({
    label: "",
    value: valeur,
    color: i < prises ? couleur : GRIS,
  }));

// ─── Les dessins ──────────────────────────────────────────────────────────────

// LA FIGURE : 3 huitièmes + 2 huitièmes, sur la même barre de 8 (banque).
const somme38et28 = barres(
  "1 = 8/8",
  [
    { label: "3/8", value: "3", color: BLEU },
    { label: "2/8", value: "2", color: VERT },
    { label: "reste", value: "3", color: GRIS },
  ],
  "3/8 + 2/8 = 5/8"
);

// PROPRIÉTÉ 1 : même bas, j'ajoute les hauts.
const deuxBarres38 = legende(
  comparer({ numerator: 3, denominator: 8, color: BLEU }, { numerator: 5, denominator: 8, label: "3/8 + 2/8 = 5/8", color: VERT }),
  "On ajoute 2 parts : le bas reste 8"
);

// PROPRIÉTÉ 2 : 5/16 serait PLUS PETIT que 3/8 — impossible (banque).
const pasCinqSeiziemes = legende(
  comparer({ numerator: 3, denominator: 8, label: "3/8", color: BLEU }, { numerator: 5, denominator: 16, label: "5/16", color: ROUGE }),
  "5/16 est plus petit que 3/8 : faux !"
);

// PROPRIÉTÉ 3 : 5/6 = 10/12, la même longueur (banque : 5/6 − 1/12).
const cinqSixiemes = legende(
  comparer({ numerator: 5, denominator: 6, color: BLEU }, { numerator: 10, denominator: 12, color: VERT }),
  "La même longueur : 5/6 = 10/12"
);

// PROPRIÉTÉ 4 : 3 fois 5 quarts = 15 quarts (banque).
const troisFoisCinqQuarts = barres(
  "15/4",
  [
    { label: "1 fois", value: "5/4", color: BLEU },
    { label: "2 fois", value: "5/4", color: BLEU },
    { label: "3 fois", value: "5/4", color: BLEU },
  ],
  "3 × 5/4 = 15/4"
);

// PROPRIÉTÉ 5 : 6 × 1/3 = 6/3 = 2 (banque).
const sixTiers = legende(
  droite(0, 2, 1 / 3, [
    { value: 0, label: "0", color: "#475569" },
    { value: 1, label: "3/3 = 1", color: BLEU },
    { value: 2, label: "6/3 = 2", color: VERT },
  ], false),
  "6 sauts de 1/3 : on arrive à 2"
);

// PROPRIÉTÉ 6 : 2/3 de 12 œufs (banque).
const oeufs = barres(
  "12 œufs",
  [
    { label: "pris", value: "4", color: ORANGE },
    { label: "pris", value: "4", color: ORANGE },
    { label: "pas pris", value: "4", color: GRIS },
  ],
  "12 ÷ 3 = 4, puis 2 × 4 = 8"
);

// RÉFLEXE 1 : 3/2 + 7/8, on change 3/2 en huitièmes (banque).
const changerLeBas = tableau("3/2 + 7/8", ["Le calcul", "Ce que je fais"], [
  ["3/2 = 12/8", "× 4 en haut et en bas"],
  ["12/8 + 7/8", "même bas : j'ajoute"],
  ["19/8", "le résultat"],
]);

// RÉFLEXE 2 : 4 × 2/5, quatre sauts de 2/5 (banque).
const quatreFoisDeuxCinquiemes = legende(
  droite(0, 2, 0.2, [
    { value: 0.4, label: "2/5", color: BLEU },
    { value: 0.8, label: "4/5", color: BLEU },
    { value: 1.2, label: "6/5", color: BLEU },
    { value: 1.6, label: "8/5", color: VERT },
  ], false),
  "4 fois 2/5 = 8/5 : le bas reste 5"
);

// RÉFLEXE 3 : 2/5 de 60 kg de sable (banque).
const sable = barres("60 kg", enParts(5, 2, "12"), "60 ÷ 5 = 12, puis 2 × 12 = 24");

// USAGE 1 : la pizza du goûter puis du dîner (gabarit de la banque).
const pizza58 = legende(disque({ numerator: 5, denominator: 8, color: ORANGE }), "3/8 + 2/8 = 5/8 de la pizza");

// USAGE 2 : la recette faite 2 fois (gabarit de la banque).
const recette = legende(
  comparer(
    { numerator: 3, denominator: 4, label: "1re fois : 3/4 kg", color: BLEU },
    { numerator: 3, denominator: 4, label: "2e fois : 3/4 kg", color: BLEU }
  ),
  "2 × 3/4 = 6/4 kg"
);

// USAGE 3 : la moitié, le quart, le dixième — et leur pourcentage (fiche
// `pourcentage` du CM2).
const moitieQuartDixieme = tableau("Prendre une part de 100", ["La fraction", "Sur 100"], [
  ["1/2 : 100 ÷ 2", "50 sur 100 = 50 %"],
  ["1/4 : 100 ÷ 4", "25 sur 100 = 25 %"],
  ["1/10 : 100 ÷ 10", "10 sur 100 = 10 %"],
]);

// EXEMPLES
// 9/12 en 4 rangées de 3 : 3 rangées sur 4 sont pleines, donc 9/12 = 3/4.
const neufDouziemes = grille(4, 3, 9);
const dixNeufHuitiemes = droite(0, 3, 1, [
  { value: 1.5, label: "3/2", color: BLEU },
  { value: 19 / 8, label: "19/8", color: VERT },
]);
const quinzeQuarts = droite(0, 4, 1, [
  { value: 1.25, label: "5/4", color: BLEU },
  { value: 2.5, label: "10/4", color: BLEU },
  { value: 3.75, label: "15/4", color: VERT },
]);
const farine = barres("500 g", enParts(10, 3), "500 ÷ 10 = 50, puis 3 × 50");
// LE DÉFI : 24 letchis en 8 parts de 3, on en donne 3 parts.
const letchis = barres("24", enParts(8, 3, "3", VERT), "24 ÷ 8 = 3, puis 3 × 3 = 9", "24 letchis en 8 parts");

const pieges = [
  "Additionner les bas. 3/8 + 2/8 n'est pas 5/16 : c'est 5/8.",
  "Multiplier aussi le bas. 4 × 2/5 n'est pas 8/20 : c'est 8/5.",
  "Diviser par le haut. Pour 2/3 de 12, je divise par 3 (le bas), pas par 2.",
];

const aRetenir = [
  "Même bas : j'ajoute les hauts. Le bas ne bouge pas.",
  "Entier × fraction : je multiplie le haut seulement.",
  "Une fraction d'une quantité : je divise par le bas, puis je multiplie par le haut.",
];

export const ficheFractionCalculCM2: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "fraction-calcul",
  titre: "Calculer avec les fractions",
  accroche:
    "Une part de pizza au goûter, une autre au dîner : combien en tout ? On apprend à ajouter des fractions, à les multiplier et à prendre une fraction d'une quantité.",
  identite: [
    { label: "Mots clés", valeur: "Ajouter, multiplier, une fraction de…" },
    { label: "Le secret", valeur: "On compte des parts du même nom" },
    { label: "Outil", valeur: "La barre partagée en parts égales" },
  ],
  definition: {
    texte:
      "Une fraction compte des parts. 3/8, ce sont 3 huitièmes. On ajoute des parts du même nom, comme on ajoute des pommes : 3 huitièmes + 2 huitièmes = 5 huitièmes.",
  },
  figure: {
    schema: somme38et28,
    legende: "3/8 + 2/8 = 5/8 : le bas reste 8.",
  },
  proprietes: [
    {
      titre: "Même bas : j'ajoute les hauts",
      micros: ["fraction_additionner"],
      texte: "3/8 + 2/8 = 5/8. Le bas ne change pas.",
      schema: deuxBarres38,
    },
    {
      titre: "Le bas ne s'ajoute pas",
      micros: ["fraction_additionner"],
      texte: "Des huitièmes plus des huitièmes, ce sont des huitièmes. Jamais 5/16.",
      schema: pasCinqSeiziemes,
    },
    {
      titre: "Changer un bas",
      micros: ["fraction_additionner"],
      texte: "Un bas est dans la table de l'autre ? Je change l'écriture. 5/6 = 10/12, donc 5/6 − 1/12 = 9/12.",
      schema: cinqSixiemes,
    },
    {
      titre: "Fois un entier",
      micros: ["fraction_produit_entier"],
      texte: "3 × 5/4, c'est 5/4 + 5/4 + 5/4 = 15/4. Je multiplie le haut, le bas ne bouge pas.",
      schema: troisFoisCinqQuarts,
    },
    {
      titre: "Un résultat entier",
      micros: ["fraction_produit_entier"],
      texte: "6 × 1/3 = 6/3. Trois tiers font 1, donc 6/3 = 2.",
      schema: sixTiers,
    },
    {
      titre: "Une fraction d'une quantité",
      micros: ["fraction_quantite"],
      texte: "Je partage d'abord, je prends ensuite. 2/3 de 12 œufs : 12 ÷ 3 = 4, puis 2 × 4 = 8.",
      schema: oeufs,
    },
  ],
  reel: {
    texte:
      "Au goûter, on mange 3/8 de la pizza, puis 2/8 au dîner. Une recette demande 3/4 kg de farine : on la fait 2 fois. En soldes, « la moitié du prix », c'est 50 %.",
  },
  historique: {
    texte:
      "Il y a 4 000 ans, les scribes égyptiens partageaient déjà les pains entre les ouvriers. Ils calculaient « deux tiers de… » comme toi : ils coupaient d'abord, puis ils prenaient.",
  },
  methode: [
    {
      titre: "Je regarde les bas",
      micros: ["fraction_additionner"],
      texte: "Même bas : j'ajoute les hauts. Un bas dans la table de l'autre : je change d'abord.",
      schema: changerLeBas,
    },
    {
      titre: "Je multiplie le haut",
      micros: ["fraction_produit_entier"],
      texte: "4 × 2/5 : 4 × 2 = 8. Le bas reste 5. Donc 8/5.",
      schema: quatreFoisDeuxCinquiemes,
    },
    {
      titre: "Je partage, puis je prends",
      micros: ["fraction_quantite"],
      texte: "2/5 de 60 kg : 60 ÷ 5 = 12, puis 2 × 12 = 24 kg.",
      schema: sable,
    },
  ],
  usages: [
    {
      titre: "Ajouter des parts",
      micros: ["fraction_additionner"],
      detail: "Tom mange 3/8 de la pizza au goûter, puis 2/8 au dîner. Il a mangé 5/8 de la pizza.",
      schema: pizza58,
    },
    {
      titre: "Refaire une recette",
      micros: ["fraction_produit_entier"],
      detail: "La recette demande 3/4 kg de farine. Je la fais 2 fois : 2 × 3/4 = 6/4 kg.",
      schema: recette,
    },
    {
      titre: "La moitié, le quart, le dixième",
      micros: ["fraction_quantite"],
      detail: "La moitié, je divise par 2. Le quart, par 4. Le dixième, par 10. Sur 100, ça donne 50 %, 25 % et 10 %.",
      schema: moitieQuartDixieme,
    },
  ],
  exemples: [
    {
      titre: "Enlever des parts",
      micros: ["fraction_additionner"],
      donnees: "On calcule 5/6 − 1/12.",
      question: "Combien ça fait, en douzièmes ?",
      schema: neufDouziemes,
      solution: "5/6 = 10/12 (× 2 en haut et en bas). 10/12 − 1/12 = 9/12. Sur la grille, 3 rangées sur 4 : 9/12 = 3/4.",
    },
    {
      titre: "Deux bas différents",
      micros: ["fraction_additionner"],
      donnees: "On calcule 3/2 + 7/8.",
      question: "Combien vaut 3/2 en huitièmes ? Et la somme ?",
      schema: dixNeufHuitiemes,
      solution: "2 × 4 = 8, donc 3/2 = 12/8. 12/8 + 7/8 = 19/8. C'est entre 2 et 3.",
    },
    {
      titre: "Chaque matin",
      micros: ["fraction_produit_entier"],
      donnees: "Lou court 5/4 km chaque matin, 3 matins de suite.",
      question: "Combien de kilomètres court-elle en tout ?",
      schema: quinzeQuarts,
      solution: "3 × 5/4 : 3 × 5 = 15, le bas reste 4. Elle court 15/4 km, soit 3 km et 3/4.",
    },
    {
      titre: "La farine",
      micros: ["fraction_quantite"],
      donnees: "La recette demande 3/10 de 500 g de farine.",
      question: "Combien de grammes faut-il ?",
      schema: farine,
      solution: "Je partage 500 g en 10 : 500 ÷ 10 = 50. J'en prends 3 : 3 × 50 = 150. Il faut 150 g.",
    },
    {
      titre: "Le défi 974",
      micros: ["fraction_quantite"],
      donnees: "Nina a 24 letchis. Elle en donne les 3/8 à son frère.",
      question: "Combien de letchis lui reste-t-il ?",
      schema: letchis,
      solution: "24 ÷ 8 = 3. Elle donne 3 × 3 = 9 letchis. Il lui reste 24 − 9 = 15 letchis.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Calcule : 3/8 + 2/8.",
      correction: "Même bas : 3 + 2 = 5. Le bas reste 8. Donc 5/8.",
      micros: ["fraction_additionner"],
    },
    {
      question: "Calcule : 5/6 − 1/12.",
      correction: "5/6 = 10/12. 10/12 − 1/12 = 9/12.",
      micros: ["fraction_additionner"],
    },
    {
      question: "Dans 4 × 2/5, que devient le bas 5 ?",
      correction: "Il ne change pas. 4 × 2 = 8 en haut. Donc 4 × 2/5 = 8/5.",
      micros: ["fraction_produit_entier"],
    },
    {
      question: "Calcule : 6 × 1/3.",
      correction: "6 × 1 = 6, donc 6/3. Trois tiers font 1 : 6/3 = 2.",
      micros: ["fraction_produit_entier"],
    },
    {
      question: "Combien font deux tiers de douze œufs ?",
      correction: "12 ÷ 3 = 4. Puis 2 × 4 = 8. Ça fait 8 œufs.",
      micros: ["fraction_quantite"],
    },
    {
      question: "Combien font deux cinquièmes de 60 kg de sable ?",
      correction: "60 ÷ 5 = 12. Puis 2 × 12 = 24. Ça fait 24 kg.",
      micros: ["fraction_quantite"],
    },
  ],
  tiMargo: {
    objectif: "On compte des parts, comme des pommes !",
    definition: "3 huitièmes + 2 huitièmes = 5 huitièmes !",
    methode: "Le bas dit le nom des parts : il ne bouge pas !",
    pieges: "Jamais on n'ajoute les bas !",
    retenir: "Je partage d'abord, je prends ensuite !",
    exercice: "À toi ! Partage les letchis en 8.",
  },
  coachHref: "/coach-ia/maths?classe=cm2",
};

// ⛔ Le mode classe est engendré par la fiche (`slidesDepuisFiche`) : la page
// passe encore ce tableau, il reste court (même patron que la fiche de 6e).
export const slidesFractionCalculCM2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Calculer avec les fractions - CM2",
    teinte: "objectif",
    schema: avecMargo(somme38et28, "On compte des parts, comme des pommes !", "joie"),
    section: {
      type: "objectif",
      phrase: "Ajouter, multiplier, prendre une fraction",
      sousPhrase: "3/8 + 2/8 = 5/8 : le bas ne bouge pas.",
    },
  },
  {
    titre: "Pièges à éviter",
    badge: "Vigilance",
    teinte: "piege",
    schema: avecMargo(pasCinqSeiziemes, "Jamais on n'ajoute les bas !", "attention"),
    section: { type: "etapes", etapes: pieges },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    schema: avecMargo(letchis, "À toi ! Partage d'abord en 8.", "joie"),
    section: {
      type: "exercice",
      enonce: "Nina a 24 letchis. Elle en donne les 3/8 à son frère.",
      question: "Combien de letchis donne-t-elle ?",
      indice: "Partage 24 en 8 parts égales.",
      correction: "24 ÷ 8 = 3, puis 3 × 3 = 9. Elle donne 9 letchis.",
    },
  },
];
