// ─── Fiche de cours : les fractions (6e) ────────────────────────────────────────
// Fiche « découverte » : lire, représenter, comparer une fraction, calculer la
// fraction d'une quantité — PAS d'addition de fractions (fiche 5e). Alignée sur
// la banque du coach lib/tutor-v4/questionBank/6e/maths/fractions.bank.ts
// (notionId fraction_nombre).
// Refaite au standard « montrer, pas raconter » (retour Frédéric 13/07) : les
// fractions DESSINÉES par le canvas du coach (disque, barre, grille, comparaison)
// plutôt que racontées. Propriétés = une ligne chacune.
//
// Micro-compétences couvertes :
// - fraction_lire_ecrire  → definition, figure (disque 3/4), exemple « Lire »
//                           (5/6, disque), usages 1, entraînement 1
// - fraction_representer  → propriété « Parts égales », exemple « Représenter »
//                           (3/4, grille), usages 2, piège 3, entraînement 2
// - fraction_comparer     → propriété « Comparer », exemple « Comparer » (1/3 vs
//                           1/5, barres), piège 2, entraînement 4
// - fraction_quantite     → formule + schéma (barre 3/4), exemple « Une quantité »
//                           (2/3 de 15), usages 3, entraînement 3
// - fraction_decimal      → propriété « Écriture décimale », entraînement 4
// - fraction_defi         → propriété « Fractions égales » (2/4 = 1/2), aRetenir 3,
//                           entraînement 2 + slide « exercice flash »

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// Les fractions DESSINÉES par le moteur du coach (le même dessin que dans les
// exercices) : disque, grille, barre, comparaison.
const disque34 = (
  <CanvasRenderer
    figure={{ kind: "fraction", model: "circle", fraction: { numerator: 3, denominator: 4 } }}
  />
);
const disque56 = (
  <CanvasRenderer
    figure={{ kind: "fraction", model: "circle", fraction: { numerator: 5, denominator: 6 } }}
  />
);
const grille34 = (
  <CanvasRenderer
    figure={{ kind: "fraction", model: "grid", grid: { rows: 2, cols: 2, shaded: 3 } }}
  />
);
const barre34 = (
  <CanvasRenderer
    figure={{ kind: "fraction", model: "bar", fraction: { numerator: 3, denominator: 4 } }}
  />
);
const compare1315 = (
  <CanvasRenderer
    figure={{
      kind: "fraction",
      model: "compare",
      fractions: [
        { numerator: 1, denominator: 3 },
        { numerator: 1, denominator: 5 },
      ],
    }}
  />
);

// ─── Les sept dessins des blocs ───────────────────────────────────────────────
// ⭐ LE CANVAS `fraction` A QUATRE MODÈLES, ET LES QUATRE ÉTAIENT DÉJÀ PRIS
// (disque, grille, barre, comparaison). Les répéter tels quels aurait donné sept
// fois la même image (REGLES.md § 2 bis). Trois blocs sortent donc du canvas des
// fractions — et c'est le catalogue qui l'impose : « `fraction` montre l'objet,
// PAS l'opération ». D'où la droite graduée pour l'écriture décimale (une
// fraction est un NOMBRE, il se place), le tableau pour décoder l'écriture, et
// le schéma en barre pour « les 3/4 de 12 », qui est un calcul.
//
// ⚠️ TOUTES LES `size` SONT MESURÉES. `FractionCanvas` écrit ses étiquettes de
// comparaison en 13 px dans un viewBox fixe : à 320 (son défaut), elles tombent
// à 9,1 px dans une carte de 225. À 250, elles rendent 11,7.

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

// LE HAUT ET LE BAS, SUR UNE BARRE. La formule montre déjà 3/4 en barre : ici
// c'est 2/5, et la légende nomme ce que le dessin ne sait pas écrire.
const barre25 = legende(
  <CanvasRenderer
    figure={{
      kind: "fraction",
      model: "bar",
      fraction: { numerator: 2, denominator: 5 },
      size: { width: 250, height: 200 },
    }}
  />,
  "2 parts prises (en haut) sur 5 parts égales (en bas)"
);

// ⭐ LE CONTRE-EXEMPLE, ET C'EST LE SEUL DE LA FICHE. `unequalParts` découpe la
// barre en morceaux inégaux : on voit tout de suite qu'aucune fraction ne peut
// s'écrire là-dessus. Une propriété qui dit « toujours » se montre en dessinant
// le cas où c'est FAUX — aucune barre correcte ne fait ça.
//
// ⚠️ PAS DE LÉGENDE ICI, ET C'EST MESURÉ : le canvas écrit DÉJÀ « Attention :
// les parts ne sont pas égales » sous la barre quand `unequalParts` est posé.
// Une phrase de plus aurait fait trois avertissements pour une seule idée.
// (Vu au rendu — la lecture du type ne le disait pas.)
const partsInegales = (
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

// COMPARER À MÊME DÉNOMINATEUR. L'exemple 3 traite l'autre cas (même numérateur,
// 1/3 contre 1/5) : celui-ci prend 3/5 contre 4/5, où c'est le HAUT qui décide.
const compare3545 = legende(
  <CanvasRenderer
    figure={{
      kind: "fraction",
      model: "compare",
      fractions: [
        { numerator: 3, denominator: 5 },
        { numerator: 4, denominator: 5 },
      ],
      size: { width: 250, height: 210 },
    }}
  />,
  "même bas : c'est le haut qui décide — 4/5 > 3/5"
);

// UNE FRACTION EST UN NOMBRE, DONC ELLE SE PLACE. Le seul dessin de la fiche qui
// ne découpe rien : 1/4, 1/2 et 3/4 posés entre 0 et 1, à l'endroit exact où on
// lit 0,25 · 0,5 · 0,75.
const fractionsSurLaDroite = legende(
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 0,
      max: 1,
      step: 0.25,
      points: [
        { value: 0.25, label: "1/4", color: "#2563eb" },
        { value: 0.5, label: "1/2", color: "#16a34a" },
        { value: 0.75, label: "3/4", color: "#dc2626" },
      ],
      display: {
        showTicks: true,
        showValues: true,
        showPoints: true,
        showPointLabels: true,
        showZero: true,
      },
      size: { width: 260, height: 95 },
    }}
  />,
  "1/4 = 0,25 · 1/2 = 0,5 · 3/4 = 0,75"
);

// DÉCODER L'ÉCRITURE, PAS LE GÂTEAU. Toutes les autres images de la fiche
// découpent quelque chose ; celle-ci lit les deux nombres, l'un après l'autre.
const anatomieDeLEcriture = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Lire 3/4",
      headers: ["Où", "Le nombre", "Ce que ça dit"],
      rows: [
        { values: ["en haut", "3", "parts prises"] },
        { values: ["en bas", "4", "parts du partage"] },
      ],
      highlight: { col: 2 },
    }}
  />
);

// DESSINER, C'EST PARTAGER PUIS COLORIER. La grille de l'exemple 2 fait 2 × 2 ;
// celle-ci fait 2 × 3, et ce sont les nombres de l'usage « Pour 4/6 ».
const grille46 = legende(
  <CanvasRenderer
    figure={{
      kind: "fraction",
      model: "grid",
      grid: { rows: 2, cols: 3, shaded: 4 },
      size: { width: 250, height: 200 },
    }}
  />,
  "6 parts égales, on en colorie 4"
);

// ⛔ CALCULER N'EST PAS DÉCOUPER (CATALOGUE.md : « `fraction` montre l'objet, pas
// l'opération »). Les 3/4 de 12 : le tout vaut 12, une part vaut 3, on en prend
// trois. Ce sont les nombres de la formule et de l'usage.
const troisQuartsDeDouze = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      // ⚠️ Au-delà de ~28 caractères, le titre déborde du cadre, en silence.
      title: "Les 3/4 de 12",
      total: "12",
      parts: [
        { label: "prise", value: "3" },
        { label: "prise", value: "3" },
        { label: "prise", value: "3" },
        { label: "reste", value: "3" },
      ],
      questionLabel: "12 ÷ 4 = 3, puis 3 × 3 = 9",
      // ⚠️ La HAUTEUR à 190 décolle les étiquettes de la phrase du bas ; la
      // LARGEUR doit rester sous 245, sinon ces étiquettes tombent sous 11 px
      // dans une carte de 225 (`SchemaBarreCanvas` écrit en 12 px).
      size: { width: 240, height: 190 },
    }}
  />
);

const pieges = [
  "Confondre numérateur (en haut) et dénominateur (en bas) : 3/4 n'est pas 4/3.",
  "Croire que 1/5 dépasse 1/3 : plus on partage, plus les parts sont petites (1/3 > 1/5).",
  "Écrire une fraction sans parts égales : sans parts égales, pas de fraction.",
];

const aRetenir = [
  "Numérateur (haut) = parts prises ; dénominateur (bas) = parts du partage.",
  "Une fraction n'a de sens que si le tout est partagé en parts égales.",
  "Deux fractions peuvent valoir la même quantité : 2/4 = 1/2.",
];

export const ficheFractions6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "fraction-nombre",
  titre: "Les fractions",
  accroche:
    "Une fraction dit « une partie d'un tout » : 3/4 d'une pizza, la moitié d'un gâteau. On apprend à la lire, la dessiner, la comparer et calculer la fraction d'une quantité.",
  identite: [
    { label: "Mots clés", valeur: "Numérateur (haut), dénominateur (bas)" },
    { label: "Le secret", valeur: "Un tout partagé en parts égales" },
    { label: "Outil", valeur: "Un dessin : disque, barre ou grille" },
  ],
  definition: {
    texte:
      "Une fraction représente des parts d'un tout partagé en parts égales. Le numérateur (en haut) compte les parts prises ; le dénominateur (en bas) compte les parts du partage. 3/4 = 3 parts prises sur 4 parts égales.",
  },
  figure: {
    schema: disque34,
    legende: "3/4 : le tout partagé en 4 parts égales, 3 sont prises.",
  },
  proprietes: [
    {
      titre: "Numérateur et dénominateur",
      micros: ["fraction_lire_ecrire"],
      texte: "En haut, les parts prises ; en bas, le nombre total de parts égales.",
      schema: barre25,
    },
    {
      titre: "Toujours des parts égales",
      micros: ["fraction_representer"],
      texte: "Sans parts égales, on ne peut pas écrire de fraction.",
      schema: partsInegales,
    },
    {
      titre: "Comparer",
      micros: ["fraction_comparer"],
      texte: "Même dénominateur → plus grand numérateur ; même numérateur → plus petit dénominateur.",
      schema: compare3545,
    },
    {
      titre: "Écriture décimale",
      micros: ["fraction_decimal"],
      texte: "À connaître : 1/2 = 0,5 ; 1/4 = 0,25 ; 3/4 = 0,75.",
      schema: fractionsSurLaDroite,
    },
  ],
  reel: {
    texte:
      "Les fractions sont partout : une pizza en 8 parts dont on mange 3 (3/8), 1/2 litre de lait dans une recette, « trois quarts d'heure » = 3/4 d'une heure = 45 min.",
  },
  historique: {
    texte:
      "Vers 1550 av. J.-C., les Égyptiens partageaient déjà le pain avec des fractions comme 1/2 ou 1/3. Le mot « fraction » vient du latin fractio : « casser en morceaux ».",
  },
  formule: {
    contexte: "Prendre une fraction d'une quantité",
    expression: "3/4 de 12 = (12 ÷ 4) × 3 = 9",
    legende: "On divise par le dénominateur (une part), puis on multiplie par le numérateur.",
    schema: barre34,
  },
  methode: [
    { titre: "Je repère", texte: "Numérateur en haut (parts prises), dénominateur en bas (parts du partage)." , schema: anatomieDeLEcriture , micros: ["fraction_lire_ecrire"] },
    { titre: "Je dessine", texte: "Autant de parts égales que le dénominateur, je colorie le numérateur." , schema: grille46 , micros: ["fraction_representer"] },
    { titre: "Je calcule", texte: "Fraction d'une quantité : je divise par le bas, je multiplie par le haut." , schema: troisQuartsDeDouze },
  ],
  usages: [
    { titre: "Lire → écrire", detail: "3 parts prises sur 5 parts égales s'écrit 3/5." , micros: ["fraction_lire_ecrire"] },
    { titre: "Représenter", detail: "Pour 4/6 : 6 parts égales, on en colorie 4." , micros: ["fraction_representer"] },
    { titre: "Une quantité", detail: "Les 3/4 de 12 : (12 ÷ 4) × 3 = 9." },
  ],
  exemples: [
    {
      titre: "Lire et écrire",
      micros: ["fraction_lire_ecrire"],
      donnees: "Un gâteau est partagé en 6 parts égales, on en prend 5.",
      question: "Quelle fraction a-t-on prise ?",
      schema: disque56,
      solution: "6 parts égales → dénominateur 6. 5 parts prises → numérateur 5. On a pris 5/6.",
    },
    {
      titre: "Représenter",
      micros: ["fraction_representer"],
      donnees: "On veut représenter 3/4 d'une figure.",
      question: "Combien de parts colorier, et sur combien ?",
      schema: grille34,
      solution: "Dénominateur 4 : la figure a 4 parts égales. Numérateur 3 : on en colorie 3.",
    },
    {
      titre: "Comparer",
      micros: ["fraction_comparer"],
      donnees: "On compare 1/3 et 1/5.",
      question: "Laquelle est la plus grande ?",
      schema: compare1315,
      solution: "Même numérateur (1). Plus on partage, plus les parts sont petites : 1/3 > 1/5.",
    },
    {
      titre: "Fraction d'une quantité",
      donnees: "Une boîte contient 15 billes, on en donne les 2/3.",
      question: "Combien de billes donne-t-on ?",
      schema: (
        <CanvasRenderer
          figure={{ kind: "fraction", model: "bar", fraction: { numerator: 2, denominator: 3 } }}
        />
      ),
      solution: "Une part : 15 ÷ 3 = 5. Puis 2 × 5 = 10. On donne 10 billes.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Une pizza est partagée en 8 parts égales, tu en manges 3. Quelle fraction ?",
      correction: "8 parts égales → dénominateur 8. 3 parts mangées → numérateur 3. Tu as mangé 3/8.",
      micros: ["fraction_lire_ecrire"],
    },
    {
      question: "Combien de parts colorier pour 2/4 d'une figure en 4 parts ? Quelle fraction égale ?",
      correction: "Numérateur 2 : on colorie 2 parts sur 4. Or 2 sur 4, c'est la moitié : 2/4 = 1/2.",
    },
    {
      question: "Les 3/4 de 12, c'est combien ?",
      correction: "12 ÷ 4 = 3 (une part), puis 3 × 3 = 9. Les 3/4 de 12, c'est 9.",
      micros: ["fraction_decimal"],
    },
    {
      question: "Compare 2/3 et 3/4.",
      correction: "En décimal : 3/4 = 0,75 et 2/3 ≈ 0,67. Comme 0,75 > 0,67, la plus grande est 3/4.",
      micros: ["fraction_comparer", "fraction_defi"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
};

export const slidesFractions6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Fractions - 6e",
    section: {
      type: "objectif",
      phrase: "Dire « une partie d'un tout » avec un nombre",
      sousPhrase: "Une fraction, ce sont des parts prises dans un tout partagé en parts égales.",
      encadre: { titre: "L'idée", texte: "3/4, c'est 3 parts prises sur 4 parts égales." },
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu: "Une pizza en 8 dont on mange 3 (3/8), 1/2 litre de lait, trois quarts d'heure (45 min).",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu: "Vers 1550 av. J.-C., les Égyptiens partageaient le pain avec 1/2 ou 1/3. « Fraction » = « casser en morceaux ».",
      },
    },
  },
  {
    titre: "Les deux nombres",
    badge: "Vocabulaire",
    section: {
      type: "objectif",
      phrase: "3/5 = 3 parts prises sur 5 parts égales",
      sousPhrase: "Numérateur (haut) = parts prises. Dénominateur (bas) = parts du partage.",
      encadre: { titre: "Attention", texte: "Une fraction n'a de sens que si les parts sont égales." },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheFractions6e.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Selon ce que l'on cherche",
    badge: "3 situations",
    section: {
      type: "cartes",
      cartes: ficheFractions6e.usages.map((u) => ({ titre: u.titre, texte: u.detail })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Comparer",
    section: {
      type: "exemple",
      enonce: "On compare 1/3 et 1/5.",
      question: "Laquelle est la plus grande ?",
      correction: "Même numérateur : plus on partage, plus les parts sont petites. Donc 1/3 > 1/5.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Fraction d'une quantité",
    section: {
      type: "exemple",
      enonce: "Une boîte contient 15 billes, on en donne les 2/3.",
      question: "Combien de billes donne-t-on ?",
      correction: "Une part : 15 ÷ 3 = 5. Puis 2 × 5 = 10. On donne 10 billes.",
    },
  },
  {
    titre: "Pièges & à retenir",
    badge: "Vigilance",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Pièges à éviter",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {pieges.map((piege) => (
              <li key={piege}>• {piege}</li>
            ))}
          </ul>
        ),
      },
      droite: {
        variante: "ok",
        titre: "À retenir",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {aRetenir.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        ),
      },
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    section: {
      type: "exercice",
      enonce: "Une boîte contient 12 biscuits, Léa en mange 1/3.",
      question: "Combien de biscuits mange-t-elle ?",
      indice: "Divise 12 par le dénominateur.",
      correction: "Une part : 12 ÷ 3 = 4. Léa mange 4 biscuits.",
    },
  },
];
