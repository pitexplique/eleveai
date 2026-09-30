// ─── Fiche de cours : les fractions (6e) ────────────────────────────────────────
// Fiche « découverte » alignée sur la banque du coach
// lib/tutor-v4/questionBank/6e/maths/fractions.bank.ts (notionId fraction_nombre).
// Lire, dessiner, comparer une fraction, la placer, la voir dépasser 1.
// ⛔ PAS de calcul de fractions : c'est la fiche `maths-6e-fraction-calcul.tsx`
// (la micro fraction_quantite y est passée le 22/08). La part d'une quantité ne
// revient ici que par le DÉFI (fraction_defi : les 12 biscuits, les billes).
//
// ⭐ RÉÉCRITE LE 30/09/2026 AU STANDARD DES 6e QUI LISENT DIFFICILEMENT :
// phrases courtes, une idée par phrase, un dessin sur CHAQUE bloc, Ti Margo en
// mode classe (champ `tiMargo`). Les dessins justes de juin sont gardés.
//
// Micro-compétences 6/6 (le champ `micros` de chaque bloc fait foi) :
// - fraction_lire_ecrire → définition + figure (disque 3/4), propriété 1 (2/5),
//                          réflexe 1, usage 1 (gâteau 2/8), exemple 1 (5/6),
//                          entraînement 1
// - fraction_representer → propriété 2 (parts inégales), réflexe 2 (grille 4/6),
//                          exemple 2 (grille 3/4), entraînement 2
// - fraction_comparer    → propriété 3 (3/5 et 4/5), exemple 3 (1/3 et 1/5),
//                          entraînement 4
// - fraction_decimal     → propriété 4 (1/4 · 1/2 · 3/4 sur la droite), usage 3
//                          (le tableau des quatre à connaître), entraînement 4
// - fraction_defi        → propriété 5 (2/4 = 1/2), exemple 4 (2/3 de 15 billes),
//                          entraînements 2 et 5 (1/3 de 12 biscuits)
// - fraction_mixte       → propriété 6 (7/4), réflexe 3 (3/4 et 5/4 autour de 1),
//                          usage 2 (5/4 · 3/2 · 7/4), entraînement 3 (8/5)
// Tous les nombres sortent de la banque. ⛔ Aucun exemple commun avec la feuille
// `lib/fiches-exercices/maths-6e-fraction-nombre.tsx` (elle évite les nôtres).
//
// ⛔ AUCUN LATEX : les fractions s'écrivent « 3/4 » partout. Le mode classe les
// projette telles quelles, sans KaTeX.
// ⚠️ TOUTES LES `size` SONT MESURÉES. `FractionCanvas` écrit en 13 px dans un
// viewBox fixe : à 320 (son défaut), 9,1 px dans une carte ; à 250, 11,7 px.
// `number_line` écrit en 14 : cadre de 260, jamais le défaut (320).

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { avecMargo } from "@/components/fiches/TiMargoBulle";

const BLEU = "#2563eb";
const VERT = "#16a34a";
const ROUGE = "#dc2626";

type Frac = { numerator: number; denominator: number; label?: string };

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

/** Une fraction du coach (disque, barre), cadre de 250. */
const fraction = (model: "bar" | "circle", f: Frac, hauteur = 200) => (
  <CanvasRenderer figure={{ kind: "fraction", model, fraction: f, size: { width: 250, height: hauteur } }} />
);

/** Deux barres l'une sous l'autre, même longueur : l'œil compare. */
const comparer = (a: Frac, b: Frac) => (
  <CanvasRenderer
    figure={{ kind: "fraction", model: "compare", fractions: [a, b], size: { width: 250, height: 210 } }}
  />
);

/** Une grille de carreaux égaux, `colories` en couleur. */
const grille = (rows: number, cols: number, colories: number) => (
  <CanvasRenderer
    figure={{ kind: "fraction", model: "grid", grid: { rows, cols, shaded: colories }, size: { width: 250, height: 200 } }}
  />
);

/** La droite graduée de la fiche : cadre plat, réglages fixés une fois. */
const droite = (min: number, max: number, pas: number, points: { value: number; label: string; color: string }[]) => (
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min,
      max,
      step: pas,
      points,
      display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true, showZero: true },
      size: { width: 260, height: 90 },
    }}
  />
);

// ─── Les dessins ──────────────────────────────────────────────────────────────

// LA FIGURE : le disque coupé en 4, 3 parts prises.
const disque34 = fraction("circle", { numerator: 3, denominator: 4 });

// PROPRIÉTÉ 1 : le haut et le bas, sur une barre (2/5 de la banque).
const barre25 = legende(
  fraction("bar", { numerator: 2, denominator: 5 }),
  "2 parts prises sur 5 parts égales"
);

// PROPRIÉTÉ 2 : LE CONTRE-EXEMPLE. Le canvas écrit déjà « Attention : les parts
// ne sont pas égales » sous la barre : pas de légende en plus.
const partsInegalesDessin = (
  <CanvasRenderer
    figure={{
      kind: "fraction",
      model: "bar",
      fraction: { numerator: 2, denominator: 5, label: "pas une fraction" },
      display: { unequalParts: true },
      size: { width: 250, height: 200 },
    }}
  />
);

// PROPRIÉTÉ 3 : même bas, c'est le haut qui décide.
const compare3545 = legende(
  comparer({ numerator: 3, denominator: 5 }, { numerator: 4, denominator: 5 }),
  "Même bas : 4/5 est plus grand que 3/5"
);

// PROPRIÉTÉ 4 : une fraction est un nombre, elle a sa place sur la droite.
const fractionsSurLaDroite = legende(
  droite(0, 1, 0.25, [
    { value: 0.25, label: "1/4", color: BLEU },
    { value: 0.5, label: "1/2", color: VERT },
    { value: 0.75, label: "3/4", color: ROUGE },
  ]),
  "1/4 = 0,25 · 1/2 = 0,5 · 3/4 = 0,75"
);

// PROPRIÉTÉ 5 : deux écritures, la même moitié (défi de la banque : 2/4 = 1/2).
const compare1224 = legende(
  comparer({ numerator: 1, denominator: 2 }, { numerator: 2, denominator: 4 }),
  "La même longueur : 2/4 = 1/2"
);

// PROPRIÉTÉ 6 : 7/4 dépasse 1, coincé entre 1 et 2.
const septQuartsEncadre = legende(
  droite(0, 3, 1, [
    { value: 1, label: "1", color: BLEU },
    { value: 1.75, label: "7/4", color: VERT },
    { value: 2, label: "2", color: BLEU },
  ]),
  "7/4 est entre 1 et 2 : 1 entier et 3/4"
);

// RÉFLEXE 1 : décoder l'écriture, ligne par ligne. Deux colonnes, pas trois.
const anatomieDeLEcriture = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Lire 3/4",
      headers: ["Le nombre", "Ce qu'il dit"],
      rows: [
        { values: ["4 en bas", "4 parts égales"] },
        { values: ["3 en haut", "3 parts prises"] },
      ],
      highlight: { col: 1 },
    }}
  />
);

// RÉFLEXE 2 : couper puis colorier. 6 carreaux, 4 coloriés (4/6 de la banque).
const grille46 = legende(grille(2, 3, 4), "6 parts égales, j'en colorie 4");

// RÉFLEXE 3 : comparer à 1. 3/4 reste avant 1, 5/4 passe après.
const autourDeUn = legende(
  droite(0, 2, 0.5, [
    { value: 0.75, label: "3/4", color: BLEU },
    { value: 1.25, label: "5/4", color: ROUGE },
  ]),
  "3 < 4 : avant 1 · 5 > 4 : après 1"
);

// USAGE 1 : un gâteau en 8, 2 parts mangées (banque).
const gateau28 = fraction("circle", { numerator: 2, denominator: 8 });

// USAGE 2 : ranger 5/4, 3/2 et 1 + 3/4 (banque) : tous entre 1 et 2.
const rangerEntreUnEtDeux = droite(1, 2, 0.25, [
  { value: 1.25, label: "5/4", color: BLEU },
  { value: 1.5, label: "3/2", color: VERT },
  { value: 1.75, label: "7/4", color: ROUGE },
]);

// USAGE 3 : les quatre écritures décimales à connaître (banque).
const tableDecimales = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "À connaître par cœur",
      headers: ["Fraction", "Décimal"],
      rows: [
        { values: ["1/2", "0,5"] },
        { values: ["1/4", "0,25"] },
        { values: ["3/4", "0,75"] },
        { values: ["1/5", "0,2"] },
      ],
      highlight: { col: 1 },
    }}
  />
);

// EXEMPLES
const disque56 = fraction("circle", { numerator: 5, denominator: 6 });
const grille34 = grille(2, 2, 3);
const compare1315 = comparer({ numerator: 1, denominator: 3 }, { numerator: 1, denominator: 5 });
// Les 2/3 de 15 billes : le tout en 3 parts de 5, on en donne 2.
const billes = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: "15 billes en 3 parts",
      total: "15",
      parts: [
        { label: "donnée", value: "5" },
        { label: "donnée", value: "5" },
        { label: "gardée", value: "5" },
      ],
      questionLabel: "15 ÷ 3 = 5, puis 2 × 5 = 10",
      size: { width: 240, height: 190 },
    }}
  />
);

const pieges = [
  "Mettre en haut les parts du partage. 3/4 n'est pas 4/3.",
  "Croire que 1/5 est plus grand que 1/3. Plus on coupe, plus les parts sont petites.",
  "Chercher 7/4 près de 7. Il est entre 1 et 2.",
];

const aRetenir = [
  "En bas : les parts du partage. En haut : les parts prises.",
  "Pas de parts égales, pas de fraction.",
  "Le haut dépasse le bas : la fraction dépasse 1.",
];

export const ficheFractions6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "fraction-nombre",
  titre: "Les fractions",
  accroche:
    "On partage un gâteau, une pizza ou une heure avec des fractions. On apprend à les lire, les dessiner et les comparer.",
  identite: [
    { label: "Mots clés", valeur: "Numérateur (en haut), dénominateur (en bas)" },
    { label: "Le secret", valeur: "Des parts égales, toujours" },
    { label: "Outil", valeur: "Un dessin : disque, barre ou grille" },
  ],
  definition: {
    texte:
      "Une fraction dit combien de parts on prend dans un tout. Le tout est coupé en parts égales. Le nombre du bas compte les parts, celui du haut les parts prises.",
  },
  figure: {
    schema: disque34,
    legende: "3/4 : 4 parts égales, 3 sont prises.",
  },
  proprietes: [
    {
      titre: "En haut, en bas",
      micros: ["fraction_lire_ecrire"],
      texte: "Le dénominateur, en bas, compte les parts du partage. Le numérateur, en haut, compte les parts prises.",
      schema: barre25,
    },
    {
      titre: "Toujours des parts égales",
      micros: ["fraction_representer"],
      texte: "Sans parts égales, pas de fraction. Je vérifie les parts avant d'écrire.",
      schema: partsInegalesDessin,
    },
    {
      titre: "Comparer",
      micros: ["fraction_comparer"],
      texte: "Même nombre en bas : le plus grand en haut gagne. 4/5 est plus grand que 3/5.",
      schema: compare3545,
    },
    {
      titre: "Une fraction est un nombre",
      micros: ["fraction_decimal"],
      texte: "Une fraction a sa place sur la droite. 1/2 = 0,5 et 1/4 = 0,25.",
      schema: fractionsSurLaDroite,
    },
    {
      titre: "Deux fractions égales",
      micros: ["fraction_defi"],
      texte: "Deux fractions peuvent dire la même quantité. 2/4 et 1/2, c'est la même moitié.",
      schema: compare1224,
    },
    {
      titre: "Plus grand que 1",
      micros: ["fraction_mixte"],
      texte: "Quand le haut dépasse le bas, la fraction dépasse 1. 7/4, c'est 1 entier et 3/4.",
      schema: septQuartsEncadre,
    },
  ],
  reel: {
    texte:
      "Au goûter, on partage un gâteau en parts égales. Une recette demande 1/2 litre de lait. Trois quarts d'heure, c'est 3/4 d'une heure. Au basket, un quart-temps dure 1/4 du match.",
  },
  historique: {
    texte:
      "Il y a près de 4 000 ans, les Égyptiens utilisaient déjà des fractions. Ils écrivaient surtout des fractions avec 1 en haut, comme 1/2 ou 1/3. Le mot « fraction » vient du latin. Il veut dire « casser ».",
  },
  methode: [
    {
      titre: "Je lis le bas d'abord",
      micros: ["fraction_lire_ecrire"],
      texte: "Je compte toutes les parts : c'est le nombre du bas. Puis je compte les parts prises : c'est le haut.",
      schema: anatomieDeLEcriture,
    },
    {
      titre: "Je dessine",
      micros: ["fraction_representer"],
      texte: "Je coupe en autant de parts égales que le nombre du bas. Je colorie le nombre du haut.",
      schema: grille46,
    },
    {
      titre: "Je compare à 1",
      micros: ["fraction_mixte"],
      texte: "Le haut est plus petit que le bas : la fraction est avant 1. Le haut est plus grand : elle dépasse 1.",
      schema: autourDeUn,
    },
  ],
  usages: [
    {
      titre: "Dire une part",
      micros: ["fraction_lire_ecrire"],
      detail: "Un gâteau est coupé en 8 parts égales. On en mange 2 : c'est 2/8 du gâteau.",
      schema: gateau28,
    },
    {
      titre: "Ranger des fractions",
      micros: ["fraction_mixte"],
      detail: "5/4, 3/2 et 7/4 sont entre 1 et 2. Je range ce qui dépasse 1 : 1/4, puis 1/2, puis 3/4.",
      schema: rangerEntreUnEtDeux,
    },
    {
      titre: "Écrire en décimal",
      micros: ["fraction_decimal"],
      detail: "Quatre fractions se connaissent par cœur. 1/5, c'est 0,2.",
      schema: tableDecimales,
    },
  ],
  exemples: [
    {
      titre: "Lire et écrire",
      micros: ["fraction_lire_ecrire"],
      donnees: "Un gâteau est coupé en 6 parts égales. On en prend 5.",
      question: "Quelle fraction du gâteau a-t-on prise ?",
      schema: disque56,
      solution: "Le gâteau a 6 parts égales : 6 en bas. On en prend 5 : 5 en haut. On a pris 5/6 du gâteau.",
    },
    {
      titre: "Dessiner une fraction",
      micros: ["fraction_representer"],
      donnees: "On veut colorier 3/4 d'un carré.",
      question: "En combien de parts couper ? Combien colorier ?",
      schema: grille34,
      solution: "Le bas vaut 4 : je coupe le carré en 4 parts égales. Le haut vaut 3 : j'en colorie 3.",
    },
    {
      titre: "Comparer",
      micros: ["fraction_comparer"],
      donnees: "On compare 1/3 et 1/5.",
      question: "Laquelle est la plus grande ?",
      schema: compare1315,
      solution: "En haut, c'est 1 des deux côtés. Un tiers est plus gros qu'un cinquième. Donc 1/3 est plus grand que 1/5.",
    },
    {
      titre: "Une part de billes",
      micros: ["fraction_defi"],
      donnees: "Une boîte contient 15 billes. On en donne les 2/3.",
      question: "Combien de billes donne-t-on ?",
      schema: billes,
      solution: "Je coupe 15 en 3 parts égales : 15 ÷ 3 = 5. J'en prends 2 : 2 × 5 = 10. On donne 10 billes.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Une pizza est coupée en 8 parts égales. Tu en manges 3. Quelle fraction as-tu mangée ?",
      correction: "8 parts égales : 8 en bas. 3 parts mangées : 3 en haut. Tu as mangé 3/8.",
      micros: ["fraction_lire_ecrire"],
    },
    {
      question: "Une figure a 4 parts égales. Combien en colorier pour 2/4 ? Quelle fraction plus simple dit la même chose ?",
      correction: "J'en colorie 2 sur 4. C'est la moitié : 2/4 = 1/2.",
      micros: ["fraction_representer", "fraction_defi"],
    },
    {
      question: "Complète : 8/5 = 1 + …/5.",
      correction: "5 cinquièmes font 1. Il reste 8 − 5 = 3 cinquièmes. Donc 8/5 = 1 + 3/5.",
      micros: ["fraction_mixte"],
    },
    {
      question: "Compare 2/3 et 3/4.",
      correction: "3/4 = 0,75. 2/3 fait environ 0,67. Donc 3/4 est la plus grande.",
      micros: ["fraction_comparer", "fraction_decimal"],
    },
    {
      question: "Dans une boîte de 12 biscuits, Léa mange 1/3 de la boîte. Combien de biscuits mange-t-elle ?",
      correction: "Je coupe 12 en 3 parts égales : 12 ÷ 3 = 4. Léa mange 4 biscuits.",
      micros: ["fraction_defi"],
    },
  ],
  tiMargo: {
    objectif: "Une fraction, ce sont des parts égales !",
    definition: "En bas, on coupe. En haut, on prend !",
    methode: "Je lis toujours le nombre du bas d'abord !",
    pieges: "Plus on coupe, plus les parts sont petites !",
    retenir: "Pas de parts égales, pas de fraction !",
    exercice: "À toi ! Compte les parts de la pizza.",
  },
  coachHref: "/coach-ia/maths?classe=6e",
};

// ⛔ Ce tableau n'est plus projeté (le mode classe est engendré par la fiche,
// `slidesDepuisFiche`) : la page le passe encore, il reste court.
export const slidesFractions6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Fractions - 6e",
    teinte: "objectif",
    schema: avecMargo(disque34, "Une fraction, ce sont des parts égales !", "joie"),
    section: {
      type: "objectif",
      phrase: "Lire, dessiner et comparer une fraction",
      sousPhrase: "3/4, c'est 3 parts prises sur 4 parts égales.",
    },
  },
  {
    titre: "Pièges à éviter",
    badge: "Vigilance",
    teinte: "piege",
    schema: avecMargo(compare1315, "Plus on coupe, plus les parts sont petites !", "attention"),
    section: { type: "etapes", etapes: pieges },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    schema: avecMargo(billes, "À toi ! Coupe d'abord en parts égales.", "joie"),
    section: {
      type: "exercice",
      enonce: "Une boîte contient 12 biscuits. Léa en mange 1/3.",
      question: "Combien de biscuits mange-t-elle ?",
      indice: "Coupe 12 en 3 parts égales.",
      correction: "12 ÷ 3 = 4. Léa mange 4 biscuits.",
    },
  },
];
