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
      texte: "En haut, les parts prises ; en bas, le nombre total de parts égales.",
    },
    {
      titre: "Toujours des parts égales",
      texte: "Sans parts égales, on ne peut pas écrire de fraction.",
    },
    {
      titre: "Comparer",
      texte: "Même dénominateur → plus grand numérateur ; même numérateur → plus petit dénominateur.",
    },
    {
      titre: "Écriture décimale",
      texte: "À connaître : 1/2 = 0,5 ; 1/4 = 0,25 ; 3/4 = 0,75.",
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
    { titre: "Je repère", texte: "Numérateur en haut (parts prises), dénominateur en bas (parts du partage)." },
    { titre: "Je dessine", texte: "Autant de parts égales que le dénominateur, je colorie le numérateur." },
    { titre: "Je calcule", texte: "Fraction d'une quantité : je divise par le bas, je multiplie par le haut." },
  ],
  usages: [
    { titre: "Lire → écrire", detail: "3 parts prises sur 5 parts égales s'écrit 3/5." },
    { titre: "Représenter", detail: "Pour 4/6 : 6 parts égales, on en colorie 4." },
    { titre: "Une quantité", detail: "Les 3/4 de 12 : (12 ÷ 4) × 3 = 9." },
  ],
  exemples: [
    {
      titre: "Lire et écrire",
      donnees: "Un gâteau est partagé en 6 parts égales, on en prend 5.",
      question: "Quelle fraction a-t-on prise ?",
      schema: disque56,
      solution: "6 parts égales → dénominateur 6. 5 parts prises → numérateur 5. On a pris 5/6.",
    },
    {
      titre: "Représenter",
      donnees: "On veut représenter 3/4 d'une figure.",
      question: "Combien de parts colorier, et sur combien ?",
      schema: grille34,
      solution: "Dénominateur 4 : la figure a 4 parts égales. Numérateur 3 : on en colorie 3.",
    },
    {
      titre: "Comparer",
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
    },
    {
      question: "Combien de parts colorier pour 2/4 d'une figure en 4 parts ? Quelle fraction égale ?",
      correction: "Numérateur 2 : on colorie 2 parts sur 4. Or 2 sur 4, c'est la moitié : 2/4 = 1/2.",
    },
    {
      question: "Les 3/4 de 12, c'est combien ?",
      correction: "12 ÷ 4 = 3 (une part), puis 3 × 3 = 9. Les 3/4 de 12, c'est 9.",
    },
    {
      question: "Compare 2/3 et 3/4.",
      correction: "En décimal : 3/4 = 0,75 et 2/3 ≈ 0,67. Comme 0,75 > 0,67, la plus grande est 3/4.",
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
