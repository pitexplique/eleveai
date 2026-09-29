// ─── Fiche de cours : calculer avec les fractions (6e) ────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/6e/maths/fractions-calcul.bank.ts (notionId fraction_calcul).
//
// ⭐ ÉCRITE POUR DES 6e QUI LISENT DIFFICILEMENT (consignes du 30/09/2026) :
// phrases courtes, un dessin sur CHAQUE bloc, Ti Margo en mode classe.
// ⛔ La fiche voisine `maths-6e-fractions.tsx` (lire, représenter, comparer) a
// déjà pris 2/3 de 15, 3/4 de 12 et les Égyptiens : on n'y revient pas.
//
// Micro-compétences 4/4 :
// - fraction_quantite          → définition + figure (2/5 de 60), propriété 1
//                                (3/4 de 20), méthode 1 (2/5 de 60 sur la droite),
//                                exemple 1 (2/3 de 18), entraînement 6 (3/5 de 40)
// - fraction_additionner       → propriétés 2 (1/5 + 2/5) et 3 (1/2 + 1/4),
//                                méthode 2 (2/3 + 1/6), usage « la bouteille »
//                                (3/4 − 1/4), exemple 2 (5/4 + 2/3, le cas du BO),
//                                entraînement 1, 2 et 5 (7/2 − 3/5, le BO)
// - fraction_multiplier_entier → propriété 4 (3 × 2/5, et l'ordre ne compte pas),
//                                méthode 3 (4 × 1/3), usage « les verres »
//                                (5 × 3/10), exemple 3 (10 × 1/5), entraînement 3
// - fraction_calcul_defi       → usage « la classe de 30 » (2/5 et 1/3), exemple 4
//                                (le gâteau de Mia, le problème type du BO),
//                                entraînement 4 (la tablette)
// Tous les nombres sortent de la banque.
//
// ⚠️ Le canvas `fraction` ne dessine pas plus que le tout : une barre « 6/5 »
// se remplit à 5/5 et ment. Une fraction plus grande que 1 se montre donc en
// DEUX barres (« 3/3 = 1 » et « 1/3 »), ou en schéma en barres.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";
import { avecMargo } from "@/components/fiches/TiMargoBulle";

const BLEU = "#3b82f6";
const VERT = "#10b981";
const PRIS = "#bfdbfe";
const VIDE = "#f8fafc";

type F = { n: number; d: number; label: string; color?: string };

/** Deux barres l'une sous l'autre : les parts se voient avant de se calculer. */
const deuxBarres = (a: F, b: F) => (
  <CanvasRenderer
    figure={{
      kind: "fraction",
      model: "compare",
      fractions: [
        { numerator: a.n, denominator: a.d, label: a.label, color: a.color ?? BLEU },
        { numerator: b.n, denominator: b.d, label: b.label, color: b.color ?? VERT },
      ],
      display: { showLabel: true, showFraction: true, showParts: true },
      size: { width: 260, height: 200 },
    }}
  />
);

/** Le schéma en barres de la fiche : 240 de large → étiquettes à 11,3 px. */
const barre = (
  total: string,
  parts: { label: string; value?: string; color?: string; unknown?: boolean }[],
  question?: string
) => (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      size: { width: 240, height: question ? 190 : 160 },
      total,
      parts,
      questionLabel: question,
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: Boolean(question) },
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

// LA FIGURE : 60 coupé en 5 parts de 12, on en garde 2.
const deuxCinquiemesDe60 = barre(
  "60",
  [
    { label: "1/5", value: "12", color: PRIS },
    { label: "1/5", value: "12", color: PRIS },
    { label: "1/5", value: "12", color: VIDE },
    { label: "1/5", value: "12", color: VIDE },
    { label: "1/5", value: "12", color: VIDE },
  ],
  "2/5 de 60 = 2 × 12 = 24"
);

// PROPRIÉTÉ 1 : les deux étapes, écrites l'une sous l'autre.
const deuxEtapes = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "3/4 de 20",
      headers: ["étape", "calcul"],
      rows: [
        { values: ["un quart", "20 ÷ 4 = 5"] },
        { values: ["trois quarts", "3 × 5 = 15"] },
      ],
      highlight: { row: 1 },
    }}
  />
);

const unPlusDeuxCinquiemes = deuxBarres({ n: 1, d: 5, label: "1/5" }, { n: 2, d: 5, label: "2/5" });
const demiPlusQuart = deuxBarres({ n: 2, d: 4, label: "1/2 = 2/4" }, { n: 1, d: 4, label: "1/4" });

// PROPRIÉTÉ 4 : trois fois 2/5, bout à bout. Les parts gardent leur taille.
const troisFoisDeuxCinquiemes = barre(
  "6/5",
  [
    { label: "1 fois", value: "2/5" },
    { label: "2 fois", value: "2/5" },
    { label: "3 fois", value: "2/5" },
  ],
  "3 × 2/5 = 6/5"
);

// MÉTHODE 1 : 60 gradué de 12 en 12. 2/5 de 60 tombe sur 24.
const soixanteEnCinq = (
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 0,
      max: 60,
      step: 12,
      points: [{ value: 24, label: "2/5", color: BLEU }],
      display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true, showZero: true },
      size: { width: 260, height: 90 },
    }}
  />
);

const deuxTiersPlusUnSixieme = deuxBarres({ n: 4, d: 6, label: "2/3 = 4/6" }, { n: 1, d: 6, label: "1/6" });
const quatreTiers = deuxBarres({ n: 3, d: 3, label: "3/3 = 1" }, { n: 1, d: 3, label: "1/3" });

const langues = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Une classe de 30",
      headers: ["langue", "élèves"],
      rows: [
        { values: ["espagnol : 2/5", "12"] },
        { values: ["allemand : 1/3", "10"] },
        { values: ["chinois : le reste", "8"] },
      ],
      highlight: { row: 2 },
    }}
  />
);

const resteBouteille = (
  <CanvasRenderer
    figure={{
      kind: "fraction",
      model: "bar",
      fraction: { numerator: 2, denominator: 4, label: "reste : 2/4 = 1/2", color: BLEU },
      display: { showLabel: true, showFraction: true, showParts: true },
      size: { width: 260, height: 130 },
    }}
  />
);

const cinqVerres = (
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 0,
      max: 2,
      step: 0.5,
      points: [{ value: 1.5, label: "5 × 3/10", color: BLEU }],
      display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true, showZero: true },
      size: { width: 260, height: 90 },
    }}
  />
);

const crayons = barre(
  "18",
  [
    { label: "1/3", value: "6", color: PRIS },
    { label: "1/3", value: "6", color: PRIS },
    { label: "1/3", value: "6", color: VIDE },
  ],
  "2/3 de 18 = 2 × 6 = 12"
);

const enDouziemes = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["fraction", "en douzièmes"],
      rows: [
        { values: ["5/4", "15/12"] },
        { values: ["2/3", "8/12"] },
        { values: ["somme", "23/12"] },
      ],
      highlight: { row: 2 },
    }}
  />
);

const dixCinquiemes = deuxBarres(
  { n: 5, d: 5, label: "5/5 = 1" },
  { n: 5, d: 5, label: "5/5 = 1", color: BLEU }
);

const gateauMia = (
  <CanvasRenderer
    figure={{
      kind: "fraction",
      model: "grid",
      grid: { rows: 3, cols: 4, shaded: 5 },
      size: { width: 260, height: 170 },
    }}
  />
);

const tablette = (
  <CanvasRenderer
    figure={{
      kind: "fraction",
      model: "bar",
      fraction: { numerator: 5, denominator: 8, label: "il reste 5/8", color: VERT },
      display: { showLabel: true, showFraction: true, showParts: true },
      size: { width: 260, height: 130 },
    }}
  />
);

// DIAPO DES PIÈGES : 1/2 + 1/3 fait 5/6, pas 2/5.
const demiPlusTiers = deuxBarres({ n: 3, d: 6, label: "1/2 = 3/6" }, { n: 2, d: 6, label: "1/3 = 2/6" });

// EXERCICE FLASH : 20 en 4 parts, rien n'est donné.
const vingtEnQuatre = barre("20", [
  { label: "1/4", unknown: true },
  { label: "1/4", unknown: true },
  { label: "1/4", unknown: true },
  { label: "1/4", unknown: true },
]);

const pieges = [
  "Ajouter les dénominateurs : $\\frac{1}{2} + \\frac{1}{3}$ n'est pas $\\frac{2}{5}$. C'est $\\frac{5}{6}$.",
  "Multiplier aussi le dénominateur : $3 \\times \\frac{2}{5} = \\frac{6}{5}$, pas $\\frac{6}{15}$.",
  "Pour $\\frac{2}{5}$ de 60, diviser par 2. On divise par 5, le nombre du bas.",
];

const aRetenir = [
  "$\\frac{2}{5}$ de 60 : 60 ÷ 5 = 12, puis 2 × 12 = 24.",
  "Pour + et − : même dénominateur, puis j'ajoute les numérateurs.",
  "Pour multiplier par un entier : je multiplie seulement le numérateur.",
];

export const ficheFractionCalcul6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "fraction-calcul",
  titre: "Calculer avec les fractions",
  accroche:
    "La moitié d'une pizza, les trois quarts d'un match… On calcule avec des fractions tous les jours !",
  identite: [
    { label: "Le mot clé", valeur: "Des parts de même taille" },
    { label: "Le secret", valeur: "Même dénominateur avant d'ajouter" },
    { label: "Outil", valeur: "La barre partagée" },
  ],
  definition: {
    texte:
      "Prendre $\\frac{2}{5}$ de 60, c'est couper 60 en 5 parts égales et en garder 2. Pour ajouter deux fractions, les parts doivent avoir la même taille. Pour multiplier par un entier, on multiplie seulement le numérateur.",
  },
  figure: {
    schema: legende(deuxCinquiemesDe60, "Une part vaut 12. Deux parts valent 24."),
    legende: "Je divise par le nombre du bas, puis je multiplie par le nombre du haut.",
  },
  proprietes: [
    {
      titre: "Une fraction d'un nombre",
      micros: ["fraction_quantite"],
      texte: "$\\frac{3}{4}$ de 20 : je divise 20 par 4, ça fait 5. Puis 3 × 5 = 15.",
      schema: deuxEtapes,
    },
    {
      titre: "Même dénominateur : j'ajoute le haut",
      micros: ["fraction_additionner"],
      texte: "$\\frac{1}{5} + \\frac{2}{5} = \\frac{3}{5}$. Le dénominateur ne change pas.",
      schema: legende(unPlusDeuxCinquiemes, "1 cinquième + 2 cinquièmes = 3 cinquièmes"),
    },
    {
      titre: "Sinon, je change une fraction",
      micros: ["fraction_additionner"],
      texte: "$\\frac{1}{2} = \\frac{2}{4}$. Donc $\\frac{1}{2} + \\frac{1}{4} = \\frac{2}{4} + \\frac{1}{4} = \\frac{3}{4}$.",
      schema: legende(demiPlusQuart, "Deux quarts et un quart : trois quarts."),
    },
    {
      titre: "Multiplier par un entier",
      micros: ["fraction_multiplier_entier"],
      texte: "$3 \\times \\frac{2}{5} = \\frac{6}{5}$ : je multiplie le numérateur. L'ordre ne compte pas : $\\frac{2}{5} \\times 3$ donne pareil.",
      schema: troisFoisDeuxCinquiemes,
    },
  ],
  reel: {
    texte:
      "Une recette demande trois quarts de verre de lait. Un match se joue en deux mi-temps. Au goûter, on partage une pizza en parts égales. Et « un tiers de réduction » se calcule avec une fraction.",
  },
  historique: {
    texte:
      "La barre de fraction vient des savants arabes, au 12e siècle. En 1202, l'Italien Fibonacci écrit un livre de calcul pour les marchands. Il y utilise cette barre. Grâce à lui, toute l'Europe l'adopte.",
  },
  methode: [
    {
      titre: "Je divise, puis je multiplie",
      micros: ["fraction_quantite"],
      texte: "$\\frac{2}{5}$ de 60 : 60 ÷ 5 = 12. Puis 2 × 12 = 24.",
      schema: soixanteEnCinq,
    },
    {
      titre: "Je mets au même dénominateur",
      micros: ["fraction_additionner"],
      texte: "$\\frac{2}{3} = \\frac{4}{6}$. Puis $\\frac{4}{6} + \\frac{1}{6} = \\frac{5}{6}$.",
      schema: legende(deuxTiersPlusUnSixieme, "4 sixièmes + 1 sixième = 5 sixièmes"),
    },
    {
      titre: "Je multiplie le haut",
      micros: ["fraction_multiplier_entier"],
      texte: "$4 \\times \\frac{1}{3} = \\frac{4}{3}$. Les parts gardent leur taille : il y en a juste plus.",
      schema: legende(quatreTiers, "4 tiers = 1 unité et 1 tiers"),
    },
  ],
  usages: [
    {
      titre: "Une part d'une classe",
      micros: ["fraction_calcul_defi", "fraction_quantite"],
      detail: "Classe de 30 : $\\frac{2}{5}$ font espagnol (12), $\\frac{1}{3}$ allemand (10). Les 8 autres font chinois.",
      schema: langues,
    },
    {
      titre: "Ce qu'il reste",
      micros: ["fraction_additionner"],
      detail: "Une bouteille contient $\\frac{3}{4}$ L. On verse $\\frac{1}{4}$ L : il reste $\\frac{2}{4} = \\frac{1}{2}$ L.",
      schema: resteBouteille,
    },
    {
      titre: "Répéter une quantité",
      micros: ["fraction_multiplier_entier"],
      detail: "5 verres de $\\frac{3}{10}$ L : $5 \\times \\frac{3}{10} = \\frac{15}{10} = 1{,}5$ L.",
      schema: cinqVerres,
    },
  ],
  exemples: [
    {
      titre: "Une fraction d'un nombre",
      micros: ["fraction_quantite"],
      donnees: "Une boîte contient 18 crayons. Tu en prends les $\\frac{2}{3}$.",
      question: "Combien de crayons prends-tu ?",
      schema: crayons,
      solution: "Un tiers de 18 : 18 ÷ 3 = 6. Deux tiers : 2 × 6 = 12. Tu prends 12 crayons.",
    },
    {
      titre: "Deux dénominateurs différents",
      micros: ["fraction_additionner"],
      donnees: "Les dénominateurs 4 et 3 sont différents.",
      question: "Calcule $\\frac{5}{4} + \\frac{2}{3}$.",
      schema: enDouziemes,
      solution:
        "12 est dans la table de 4 et dans celle de 3. $\\frac{5}{4} = \\frac{15}{12}$ et $\\frac{2}{3} = \\frac{8}{12}$. J'ajoute les numérateurs : $\\frac{23}{12}$.",
    },
    {
      titre: "Multiplier par un entier",
      micros: ["fraction_multiplier_entier"],
      donnees: "On multiplie une fraction par un nombre entier.",
      question: "Calcule $10 \\times \\frac{1}{5}$.",
      schema: legende(dixCinquiemes, "10 cinquièmes = 2 unités"),
      solution:
        "$10 \\times \\frac{1}{5} = \\frac{10}{5}$. Cinq cinquièmes font 1. Dix cinquièmes font 2.",
    },
    {
      titre: "Le gâteau de Mia",
      micros: ["fraction_calcul_defi", "fraction_additionner"],
      donnees: "Mia coupe son gâteau. Leïla prend $\\frac{1}{4}$ du gâteau. Léo en prend $\\frac{1}{6}$.",
      question: "Quelle fraction du gâteau reste-t-il ?",
      schema: legende(gateauMia, "Mangé : 3/12 + 2/12 = 5/12. Il reste 7/12."),
      solution:
        "Je mets tout en douzièmes : $\\frac{1}{4} = \\frac{3}{12}$ et $\\frac{1}{6} = \\frac{2}{12}$. Ils ont pris $\\frac{5}{12}$. Le gâteau entier fait $\\frac{12}{12}$. Il reste $\\frac{7}{12}$.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Calcule $\\frac{3}{7} + \\frac{2}{7}$.",
      correction: "Même dénominateur : 3 + 2 = 5. Le résultat est $\\frac{5}{7}$.",
      micros: ["fraction_additionner"],
    },
    {
      question: "Calcule $\\frac{3}{4} - \\frac{1}{8}$.",
      correction: "$\\frac{3}{4} = \\frac{6}{8}$. Puis $\\frac{6}{8} - \\frac{1}{8} = \\frac{5}{8}$.",
      micros: ["fraction_additionner"],
    },
    {
      question: "Calcule $6 \\times \\frac{1}{6}$.",
      correction: "$6 \\times \\frac{1}{6} = \\frac{6}{6} = 1$. Six sixièmes font un entier.",
      micros: ["fraction_multiplier_entier"],
    },
    {
      question: "Une tablette de chocolat a 8 carrés égaux. On en mange $\\frac{3}{8}$. Quelle fraction reste-t-il ?",
      correction: "La tablette entière fait $\\frac{8}{8}$. Il reste $\\frac{8}{8} - \\frac{3}{8} = \\frac{5}{8}$.",
      micros: ["fraction_calcul_defi"],
      schema: tablette,
    },
    {
      question: "Calcule $\\frac{7}{2} - \\frac{3}{5}$.",
      correction:
        "10 est dans la table de 2 et de 5. $\\frac{7}{2} = \\frac{35}{10}$ et $\\frac{3}{5} = \\frac{6}{10}$. Donc $\\frac{29}{10}$.",
      micros: ["fraction_additionner"],
    },
    {
      question: "Combien font les $\\frac{3}{5}$ de 40 ?",
      correction: "Un cinquième de 40 : 40 ÷ 5 = 8. Trois cinquièmes : 3 × 8 = 24.",
      micros: ["fraction_quantite"],
    },
  ],
  tiMargo: {
    objectif: "Je divise d'abord, je multiplie ensuite !",
    definition: "Des parts de même taille !",
    pieges: "1/2 + 1/3, ce n'est pas 2/5 !",
    retenir: "Je multiplie seulement le haut.",
    exercice: "À toi ! Un quart d'abord.",
  },
  coachHref: "/coach-ia/maths?classe=6e",
};

// ⛔ AUCUN LATEX DANS LES DIAPOS : le mode classe n'a pas de rendu KaTeX.
export const slidesFractionCalcul6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Calculer avec les fractions - 6e",
    schema: avecMargo(deuxCinquiemesDe60, "Je divise d'abord, je multiplie ensuite !"),
    section: {
      type: "objectif",
      phrase: "Calculer avec des fractions",
      sousPhrase: "Prendre une fraction d'un nombre, ajouter deux fractions, multiplier par un entier.",
      encadre: { titre: "L'idée", texte: "2/5 de 60 : 60 en 5 parts de 12, j'en garde 2. Ça fait 24." },
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    teinte: "reel",
    schema: langues,
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu: "Une recette, une pizza, un match en deux mi-temps. Dans une classe de 30, 2/5 font espagnol : 12 élèves.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu: "La barre de fraction vient des savants arabes. En 1202, Fibonacci la fait connaître en Europe.",
      },
    },
  },
  {
    titre: "La règle d'or",
    badge: "À connaître par cœur",
    teinte: "essentiel",
    schema: avecMargo(unPlusDeuxCinquiemes, "Des parts de même taille !", "joie"),
    section: {
      type: "objectif",
      phrase: "Même dénominateur avant d'ajouter",
      sousPhrase: "1/5 + 2/5 = 3/5. On ajoute les numérateurs. Le dénominateur ne bouge pas.",
    },
  },
  {
    titre: "Les 3 règles",
    badge: "Ce qu'on sait faire",
    teinte: "propriete",
    schema: troisFoisDeuxCinquiemes,
    section: {
      type: "cartes",
      cartes: [
        { titre: "Une fraction d'un nombre", texte: "3/4 de 20 : 20 ÷ 4 = 5, puis 3 × 5 = 15." },
        { titre: "Ajouter", texte: "Même dénominateur d'abord. 1/2 + 1/4 = 2/4 + 1/4 = 3/4." },
        { titre: "Multiplier", texte: "3 × 2/5 = 6/5. Seul le numérateur est multiplié." },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    teinte: "methode",
    schema: soixanteEnCinq,
    section: {
      type: "cartes",
      cartes: [
        { titre: "Je divise, puis je multiplie", texte: "2/5 de 60 : 60 ÷ 5 = 12, puis 2 × 12 = 24." },
        { titre: "Je change une fraction", texte: "2/3 = 4/6. Puis 4/6 + 1/6 = 5/6." },
        { titre: "Je multiplie le haut", texte: "4 × 1/3 = 4/3. Les parts gardent leur taille." },
      ],
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Une fraction d'un nombre",
    teinte: "exemple",
    schema: crayons,
    section: {
      type: "exemple",
      enonce: "Une boîte contient 18 crayons. Tu en prends les 2/3.",
      question: "Combien de crayons prends-tu ?",
      correction: "18 ÷ 3 = 6. Puis 2 × 6 = 12. Tu prends 12 crayons.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Le gâteau de Mia",
    teinte: "exemple",
    schema: gateauMia,
    section: {
      type: "exemple",
      enonce: "Leïla prend 1/4 du gâteau. Léo en prend 1/6.",
      question: "Quelle fraction du gâteau reste-t-il ?",
      correction: "1/4 = 3/12 et 1/6 = 2/12. Ils ont pris 5/12. Il reste 7/12.",
    },
  },
  {
    titre: "Attention aux pièges",
    badge: "Vigilance",
    teinte: "piege",
    schema: avecMargo(demiPlusTiers, "1/2 + 1/3, ce n'est pas 2/5 !", "attention"),
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Pièges",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            <li>• Ajouter les dénominateurs.</li>
            <li>• 3 × 2/5 n'est pas 6/15 : c'est 6/5.</li>
          </ul>
        ),
      },
      droite: {
        variante: "ok",
        titre: "À retenir",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            <li>• 1/2 + 1/3 = 3/6 + 2/6 = 5/6.</li>
            <li>• Je multiplie seulement le haut.</li>
          </ul>
        ),
      },
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    schema: avecMargo(vingtEnQuatre, "À toi ! Un quart d'abord.", "joie"),
    section: {
      type: "exercice",
      enonce: "On coupe 20 en 4 parts égales.",
      question: "Combien font les 3/4 de 20 ?",
      indice: "Un quart de 20, c'est 20 ÷ 4.",
      correction: "20 ÷ 4 = 5. Puis 3 × 5 = 15.",
    },
  },
];
