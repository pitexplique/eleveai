// ─── Fiche de cours : les fractions (5e) ───────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/5e/maths/fractions.bank.ts (notionId fraction_nombre).
// Remplace l'ancienne fiche « addition » (maths-5e-fractions-addition.tsx) : ici
// la notion `fraction_nombre` : égalité, simplification, comparaison, rationnel,
// opposé — dessinée par les canvas « fraction » du coach. Les CALCULS sont dans
// la fiche voisine, maths-5e-fraction-calcul.tsx.
//
// Micro-compétences couvertes :
// - fraction_egale        → définition + figure (1/2 = 2/4), exemple « Fractions égales », propriété
// - fraction_simplifier   → propriété « Simplifier », exemple « Simplifier » (6/8 = 3/4), entraînement 1
// - fraction_rationnel    → identité + définition (quotient de deux entiers, -2/3)
// - fraction_comparer     → exemple « Comparer » (1/2 vs 3/4), méthode, entraînement 2
// - fraction_oppose       → propriété « L'opposé », exemple « L'opposé »
// - fraction_defi         → pièges + défi
//
// ⛔ CE QUI N'EST PAS ICI, ET POURQUOI (20/08/2026).
// · Les CALCULS (additionner, multiplier, fraction d'une quantité) appartiennent
//   à la notion voisine `fraction_calcul` et vivent dans
//   `maths-5e-fraction-calcul.tsx`. La banque a été coupée en deux — reconnaître
//   une fraction d'un côté, calculer avec de l'autre — et la fiche ne l'avait
//   pas suivi. Frédéric l'a vu : « le calcul n'apparaît pas sur la fiche ».
// · L'INVERSE et la DIVISION ont quitté la 5e le 04/08/2026 : les repères
//   annuels les placent en 4e, où ils existent déjà. Ils étaient encore ici en
//   propriété et en exemple — hors programme. Retirés.

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

// La droite graduee, pour la propriete qui ne parle PAS de partage : l'oppose
// n'est pas une part coloriee, c'est une POSITION — de l'autre cote de 0, a la
// meme distance.
const droite = (
  min: number,
  max: number,
  step: number,
  points: { value: number; label: string; color?: string }[]
) => (
  <CanvasRenderer
    figure={{ kind: "number_line", size: { width: 340, height: 90 }, min, max, step, points }}
  />
);

const pieges = [
  "Comparer les numérateurs sans regarder les dénominateurs : 2/3 n'est pas plus petit que 3/5 parce que 2 < 3.",
  "Croire que 1/5 est plus grand que 1/3 : plus on partage, plus les parts sont petites (1/3 > 1/5).",
  "Laisser une fraction non simplifiée : 6/12 s'écrit 1/2.",
];

const aRetenir = [
  "On multiplie/divise en haut ET en bas par le même nombre → fraction égale (ou simplifiée).",
  "Pour comparer, on redécoupe en parts de même taille : à dénominateurs égaux, le plus grand numérateur gagne.",
  "L'opposé change seulement le signe : 3/5 et −3/5 sont de part et d'autre de 0, à la même distance.",
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
    { label: "Mots clés", valeur: "Numérateur, dénominateur, simplifier, comparer, opposé" },
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
  // Un dessin sous chaque propriete (REGLES.md § 2 bis). Les deux premieres
  // parlent de PARTAGE : deux fractions coloriees cote a cote, meme surface,
  // pas le meme nombre de parts. Les deux dernieres ne parlent pas de partage
  // du tout : l'oppose est une POSITION, pas une part coloriee — de l'autre cote
  // de 0, a la meme distance. C'est la droite graduee.
  proprietes: [
    {
      titre: "Fractions égales",
      texte: "On multiplie (ou divise) le haut ET le bas par le même nombre : 1/2 = 2/4 = 3/6.",
      schema: compare([1, 2], [3, 6]),
    },
    {
      titre: "Simplifier",
      texte: "On divise le haut et le bas par un diviseur commun : 6/8 = 3/4.",
      schema: compare([6, 8], [3, 4]),
    },
    {
      titre: "Comparer",
      texte: "À dénominateurs égaux, le plus grand numérateur gagne ; sinon on redécoupe d'abord.",
      schema: compare([1, 2], [3, 4]),
    },
    {
      titre: "L'opposé",
      texte: "On change seulement le signe : l'opposé de 3/5 est -3/5 (leur somme fait 0).",
      schema: droite(-1, 1, 0.5, [
        { value: -0.6, label: "−3/5", color: "#dc2626" },
        { value: 0.6, label: "3/5" },
      ]),
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
    {
      titre: "Je simplifie",
      texte: "Un diviseur commun en haut et en bas rend la fraction plus simple.",
      schema: compare([4, 12], [1, 3]),
    },
    {
      titre: "Je mets au même dénominateur",
      texte: "Pour comparer, additionner ou soustraire.",
      // 1/2 et 1/3 redecoupes en sixiemes : c'est le REDECOUPAGE qu'on montre,
      // pas le resultat.
      schema: compare([3, 6], [2, 6]),
    },
    {
      titre: "Je calcule puis simplifie",
      texte: "Et je vérifie que le résultat est sous sa forme la plus simple.",
      schema: compare([6, 12], [1, 2]),
    },
  ],
  // Les trois GESTES de cette notion — reconnaître, simplifier, comparer.
  // Additionner, multiplier et diviser n'y sont plus : ce sont ceux de la fiche
  // voisine, « Calculer avec les fractions ».
  usages: [
    {
      titre: "Reconnaître des fractions égales",
      detail: "Deux écritures différentes peuvent colorier exactement la même part.",
      schema: compare([2, 6], [1, 3]),
    },
    {
      titre: "Simplifier",
      detail: "On divise haut et bas par un diviseur commun, la part ne change pas.",
      schema: compare([8, 12], [2, 3]),
    },
    {
      titre: "Comparer",
      detail: "On redécoupe en parts de même taille, puis on compare les numérateurs.",
      schema: compare([2, 3], [3, 5]),
    },
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
      titre: "L'opposé",
      donnees: "La fraction 3/5.",
      question: "Quel est son opposé, et où se place-t-il ?",
      // L'oppose est une POSITION : de l'autre cote de 0, a la meme distance.
      schema: droite(-1, 1, 0.5, [
        { value: -0.6, label: "−3/5", color: "#dc2626" },
        { value: 0.6, label: "3/5" },
      ]),
      solution:
        "On change seulement le signe : l'opposé de 3/5 est −3/5. Sur la droite graduée, il est de l'autre côté de 0, à la même distance — et leur somme fait 0.",
    },
    {
      titre: "Un nombre rationnel",
      donnees: "Les écritures 0,75 · 3/4 · 6/8.",
      question: "Désignent-elles le même nombre ?",
      schema: compare([3, 4], [6, 8]),
      solution:
        "Oui : 6/8 se simplifie en 3/4, et 3/4 vaut 0,75. Un même nombre rationnel a plusieurs écritures — c'est la fraction la plus simple qu'on donne en réponse.",
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
      question: "Quel est l'opposé de 4/9 ? Où se place-t-il par rapport à 0 ?",
      correction: "Son opposé est −4/9 : on change seulement le signe. Sur la droite graduée, il est de l'autre côté de 0, à la même distance — leur somme fait 0.",
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
    titre: "Comparer & opposé",
    badge: "Deux réflexes",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Comparer",
        contenu: "On redécoupe en parts de même taille : 1/2 = 2/4, et 3/4 > 2/4 donc 3/4 > 1/2.",
      },
      droite: {
        variante: "ok",
        titre: "L'opposé",
        contenu: "On change seulement le signe : 3/5 et −3/5 encadrent 0, à la même distance.",
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
