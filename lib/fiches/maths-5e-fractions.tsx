// ─── Fiche de cours : les fractions (5e) ───────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/5e/maths/fractions.bank.ts (notionId fraction_nombre).
// Remplace l'ancienne fiche « addition » (maths-5e-fractions-addition.tsx) : ici
// TOUTE la notion 5e (égalité, simplification, comparaison, 4 opérations, inverse,
// opposé), dessinée par les canvas « fraction » du coach.
//
// Micro-compétences couvertes :
// - fraction_egale        → définition + figure (1/2 = 2/4), exemple « Fractions égales », propriété
// - fraction_simplifier   → propriété « Simplifier », exemple « Simplifier » (6/8 = 3/4), entraînement 1
// - fraction_rationnel    → identité + définition (quotient de deux entiers, -2/3)
// - fraction_comparer     → exemple « Comparer » (1/2 vs 3/4), méthode, entraînement 2
// - fraction_additionner  → exemple « Additionner » (1/2 + 1/3 = 5/6), usages, entraînement 3
// - fraction_multiplier   → exemple « Multiplier » (2/3 × 3/4 = 1/2)
// - fraction_quantite     → exemple « Fraction d'une quantité » (3/4 de 20 = 15)
// - fraction_diviser      → exemple « Diviser » (2/3 ÷ 4/5), propriété inverse
// - fraction_inverse      → propriété « L'inverse », entraînement 4
// - fraction_oppose       → propriété « L'opposé »
// - fraction_defi         → pièges + défi dessiné (3/4 + 1/6 = 11/12)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// Les fractions DESSINÉES par le moteur du coach (le même dessin que dans les
// exercices) : disque, barre, comparaison.
const disque = (n: number, d: number) => (
  <CanvasRenderer
    figure={{ kind: "fraction", model: "circle", fraction: { numerator: n, denominator: d } }}
  />
);
const barre = (n: number, d: number) => (
  <CanvasRenderer
    figure={{ kind: "fraction", model: "bar", fraction: { numerator: n, denominator: d } }}
  />
);
const compare = (a: [number, number], b: [number, number]) => (
  <CanvasRenderer
    figure={{
      kind: "fraction",
      model: "compare",
      fractions: [
        { numerator: a[0], denominator: a[1] },
        { numerator: b[0], denominator: b[1] },
      ],
    }}
  />
);

const pieges = [
  "Additionner les dénominateurs : 1/2 + 1/3 ne fait pas 2/5. On met au même dénominateur d'abord.",
  "Croire que 1/5 est plus grand que 1/3 : plus on partage, plus les parts sont petites (1/3 > 1/5).",
  "Oublier de simplifier le résultat à la fin (6/12 s'écrit 1/2).",
];

const aRetenir = [
  "On multiplie/divise en haut ET en bas par le même nombre → fraction égale (ou simplifiée).",
  "Additionner/soustraire : même dénominateur d'abord, puis on ne touche qu'aux numérateurs.",
  "Multiplier : haut × haut, bas × bas. Diviser : on multiplie par l'inverse.",
];

export const ficheFractions5e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "fraction-nombre",
  titre: "Les fractions",
  accroche:
    "Une fraction, c'est un partage : 3/4, c'est 3 parts sur 4. En 5e, on apprend à les simplifier, les comparer et calculer avec.",
  identite: [
    { label: "Mots clés", valeur: "Numérateur, dénominateur, simplifier, inverse, opposé" },
    { label: "Le secret", valeur: "En haut et en bas par le même nombre" },
    { label: "Outil", valeur: "Un tout partagé en parts égales (disque, barre)" },
  ],
  definition: {
    texte:
      "Une fraction a/b est le quotient de deux nombres entiers (b non nul) : le numérateur a (en haut) compte les parts prises, le dénominateur b (en bas) dit en combien de parts égales on a partagé le tout. C'est un nombre rationnel, qui peut être positif ou négatif (par exemple -2/3).",
  },
  figure: {
    schema: compare([1, 2], [2, 4]),
    legende: "1/2 et 2/4 colorient la même part du tout : ce sont deux fractions égales.",
  },
  proprietes: [
    {
      titre: "Fractions égales",
      texte: "On multiplie (ou divise) le haut ET le bas par le même nombre : 1/2 = 2/4 = 3/6.",
    },
    {
      titre: "Simplifier",
      texte: "On divise le haut et le bas par un diviseur commun : 6/8 = 3/4.",
    },
    {
      titre: "L'inverse",
      texte: "On échange numérateur et dénominateur : l'inverse de 2/3 est 3/2.",
    },
    {
      titre: "L'opposé",
      texte: "On change seulement le signe : l'opposé de 3/5 est -3/5 (leur somme fait 0).",
    },
  ],
  reel: {
    texte:
      "Les fractions servent à partager (parts de gâteau), à cuisiner (1/2 litre de lait, 3/4 d'un paquet), à mesurer le temps (un quart d'heure) et même en musique pour les rythmes (la noire, la croche).",
  },
  historique: {
    texte:
      "Il y a près de 4000 ans, les Égyptiens n'utilisaient presque que des fractions « unitaires » (1/2, 1/3, 1/4). La barre de fraction, elle, nous vient des mathématiciens arabes et indiens du Moyen Âge.",
  },
  methode: [
    { titre: "Je simplifie", texte: "Un diviseur commun en haut et en bas rend la fraction plus simple." },
    { titre: "Je mets au même dénominateur", texte: "Pour comparer, additionner ou soustraire." },
    { titre: "Je calcule puis simplifie", texte: "Et je vérifie que le résultat est sous sa forme la plus simple." },
  ],
  usages: [
    { titre: "Additionner / soustraire", detail: "Même dénominateur, puis on additionne (ou soustrait) les numérateurs." },
    { titre: "Multiplier", detail: "Numérateurs entre eux, dénominateurs entre eux, puis on simplifie." },
    { titre: "Diviser", detail: "Diviser par une fraction = multiplier par son inverse." },
  ],
  exemples: [
    {
      titre: "Fractions égales",
      donnees: "Les fractions 1/2 et 2/4.",
      question: "Représentent-elles la même quantité ?",
      schema: compare([1, 2], [2, 4]),
      solution:
        "Oui : on passe de 1/2 à 2/4 en multipliant le haut et le bas par 2. Elles colorient la même part.",
    },
    {
      titre: "Simplifier",
      donnees: "La fraction 6/8.",
      question: "Écris-la sous sa forme la plus simple.",
      schema: barre(6, 8),
      solution:
        "6 et 8 sont divisibles par 2. On divise en haut et en bas : 6/8 = 3/4.",
    },
    {
      titre: "Comparer",
      donnees: "Les fractions 1/2 et 3/4.",
      question: "Laquelle est la plus grande ?",
      schema: compare([1, 2], [3, 4]),
      solution:
        "On met au même dénominateur : 1/2 = 2/4. Comme 3/4 > 2/4, on a 3/4 > 1/2.",
    },
    {
      titre: "Additionner",
      donnees: "Le calcul 1/2 + 1/3.",
      question: "Quel est le résultat ?",
      schema: barre(5, 6),
      solution:
        "Même dénominateur (6) : 1/2 = 3/6 et 1/3 = 2/6. Donc 1/2 + 1/3 = 3/6 + 2/6 = 5/6.",
    },
    {
      titre: "Multiplier",
      donnees: "Le calcul 2/3 × 3/4.",
      question: "Quel est le résultat ?",
      solution:
        "Haut × haut, bas × bas : 2/3 × 3/4 = 6/12. On simplifie : 6/12 = 1/2.",
    },
    {
      titre: "Fraction d'une quantité",
      donnees: "On cherche 3/4 de 20.",
      question: "Combien cela fait-il ?",
      schema: barre(3, 4),
      solution:
        "Une part : 20 ÷ 4 = 5. Puis 3 parts : 3 × 5 = 15. Donc 3/4 de 20 = 15.",
    },
    {
      titre: "Diviser",
      donnees: "Le calcul 2/3 ÷ 4/5.",
      question: "Quel est le résultat ?",
      solution:
        "Diviser, c'est multiplier par l'inverse : 2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Simplifie 9/12.",
      correction: "9 et 12 sont divisibles par 3 : 9/12 = 3/4.",
    },
    {
      question: "Compare 2/3 et 3/5 (avec > ou <).",
      correction: "Produit en croix : 2 × 5 = 10 et 3 × 3 = 9. Comme 10 > 9, on a 2/3 > 3/5.",
    },
    {
      question: "Calcule 2/3 + 1/6.",
      correction: "2/3 = 4/6, donc 2/3 + 1/6 = 4/6 + 1/6 = 5/6.",
    },
    {
      question: "Quel est l'inverse de 4/9 ? Et son opposé ?",
      correction: "L'inverse de 4/9 est 9/4 (on retourne la fraction). Son opposé est -4/9 (on change le signe).",
    },
    {
      question: "À La Réunion, Enzo mange 3/4 d'un gâteau le midi puis 1/6 le soir. Combien en tout ?",
      correction: "Même dénominateur (12) : 3/4 = 9/12 et 1/6 = 2/12. Donc 9/12 + 2/12 = 11/12.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=5e",
};

export const slidesFractions5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Fractions - 5e",
    section: {
      type: "objectif",
      phrase: "Simplifier, comparer et calculer avec les fractions",
      sousPhrase:
        "Une fraction, c'est un partage. Tout part d'une règle : en haut et en bas par le même nombre.",
      encadre: {
        titre: "L'idée",
        texte: "On ne peut additionner que des parts de même taille (même dénominateur).",
      },
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
        contenu:
          "Partager un gâteau, cuisiner (1/2 litre, 3/4 d'un paquet), mesurer le temps (un quart d'heure), les rythmes en musique.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Il y a 4000 ans, les Égyptiens n'utilisaient presque que 1/2, 1/3, 1/4. La barre de fraction vient des savants arabes et indiens.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheFractions5e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Selon le calcul",
    badge: "3 situations",
    section: {
      type: "cartes",
      cartes: ficheFractions5e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Additionner",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "On calcule 1/2 + 1/3.",
      question: "Quel est le résultat ?",
      correction: "Au même dénominateur (6) : 3/6 + 2/6 = 5/6.",
    },
  },
  {
    titre: "Multiplier & diviser",
    badge: "Deux réflexes",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Multiplier",
        contenu: "Haut × haut, bas × bas : 2/3 × 3/4 = 6/12 = 1/2.",
      },
      droite: {
        variante: "ok",
        titre: "Diviser",
        contenu: "On multiplie par l'inverse : 2/3 ÷ 4/5 = 2/3 × 5/4 = 5/6.",
      },
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
      enonce: "À La Réunion, Enzo mange 3/4 d'un gâteau le midi puis 1/6 le soir.",
      question: "Quelle quantité a-t-il mangée en tout ?",
      indice: "Mets 3/4 et 1/6 au même dénominateur (12).",
      correction: "3/4 = 9/12 et 1/6 = 2/12, donc 9/12 + 2/12 = 11/12.",
    },
  },
];
