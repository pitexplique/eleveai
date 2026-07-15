// ─── Fiche de cours : les fractions (CM2) ───────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm2/maths/fractions.bank.ts (notionId fraction).
// CM2 = texte brut, langage d'un enfant de ~10 ans. On DESSINE tout : le canvas
// fraction du coach (barre, disque, grille) + la droite graduée. Fiche découverte :
// lire, représenter, placer sur la droite — PAS d'addition (ça vient en 5e).
//
// Micro-compétences couvertes (les 3 de la banque) :
// - fraction_lire         → definition (barre 3/4), propriété numérateur/dénominateur,
//                           exemple « Lire 2/5 », propriété « = 1 et > 1 », entraînement 1
// - fraction_representer  → propriété « Parts égales », exemple « Le disque » (2/6),
//                           exemple « La grille » (7/10), piège parts inégales, entraînement 2
// - fraction_droite       → figure (droite 1/2), exemple « Sur la droite » (3/4),
//                           exemple « Plus grand que 1 » (5/4), défi dessiné (7/3), entraînement 3

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// Les fractions DESSINÉES par le moteur du coach (le même dessin que dans les
// exercices) : barre, disque, grille.
const barre34 = (
  <CanvasRenderer
    figure={{ kind: "fraction", model: "bar", fraction: { numerator: 3, denominator: 4, label: "3/4" } }}
  />
);
const disque25 = (
  <CanvasRenderer
    figure={{ kind: "fraction", model: "circle", fraction: { numerator: 2, denominator: 5, label: "2/5" } }}
  />
);
const disque26 = (
  <CanvasRenderer
    figure={{ kind: "fraction", model: "circle", fraction: { numerator: 2, denominator: 6, label: "2/6" } }}
  />
);
const grille710 = (
  <CanvasRenderer
    figure={{ kind: "fraction", model: "grid", grid: { rows: 2, cols: 5, shaded: 7 } }}
  />
);

// Une droite graduée : la fraction est aussi un NOMBRE, elle se place.
function droite(
  points: { value: number; label: string; color?: string }[],
  min = 0,
  max = 1,
  step = 0.25
) {
  return (
    <CanvasRenderer
      figure={{
        kind: "number_line",
        min,
        max,
        step,
        points,
        display: {
          showTicks: true,
          showValues: true,
          showPoints: true,
          showPointLabels: true,
          showZero: true,
        },
      }}
    />
  );
}

const VERT = "#16a34a";
const BLEU = "#2563eb";

const pieges = [
  "Confondre le numérateur (en haut) et le dénominateur (en bas) : 3/4 n'est pas 4/3.",
  "Écrire une fraction alors que les parts ne sont pas égales : sans parts égales, pas de fraction.",
  "Croire qu'une fraction est toujours plus petite que 1 : 5/4 est plus grand que 1.",
];

const aRetenir = [
  "Une fraction, c'est des parts d'un tout partagé en parts ÉGALES.",
  "Le numérateur (haut) compte les parts prises ; le dénominateur (bas) compte les parts du partage.",
  "Une fraction est aussi un nombre : elle se place sur la droite graduée.",
];

export const ficheFractionsCM2: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "fraction",
  titre: "Les fractions",
  accroche:
    "Une fraction, c'est une partie d'un tout : 3/4 d'une tarte, la moitié d'un gâteau. On apprend à la lire, à la dessiner et à la placer sur la droite.",
  identite: [
    { label: "Mots clés", valeur: "Numérateur (haut), dénominateur (bas), parts égales" },
    { label: "Le secret", valeur: "Un tout partagé en parts égales" },
    { label: "Outil", valeur: "Un dessin (barre, disque, grille) et la droite graduée" },
  ],
  definition: {
    texte:
      "Une fraction représente des parts d'un tout partagé en parts égales. Le numérateur, en haut, compte les parts prises. Le dénominateur, en bas, dit en combien de parts égales on a partagé. 3/4 = 3 parts prises sur 4 parts égales.",
  },
  figure: {
    schema: barre34,
    legende: "3/4 : le tout est partagé en 4 parts égales, on en prend 3.",
  },
  proprietes: [
    {
      titre: "Numérateur et dénominateur",
      texte: "En haut : les parts prises. En bas : le nombre total de parts égales.",
    },
    {
      titre: "Toujours des parts égales",
      texte: "Sans parts égales, on ne peut pas parler de fraction.",
    },
    {
      titre: "Une fraction est un nombre",
      texte: "On peut la placer sur la droite graduée, comme les autres nombres.",
    },
    {
      titre: "Comparer à 1",
      texte: "Numérateur = dénominateur → la fraction vaut 1 (4/4 = 1). Numérateur plus grand → plus que 1 (5/4 > 1).",
    },
  ],
  reel: {
    texte:
      "Les fractions sont partout : une tarte coupée en 8 parts dont on mange 3 (3/8), un demi-litre d'eau dans une recette, « trois quarts d'heure » = 3/4 d'heure = 45 minutes.",
  },
  historique: {
    texte:
      "Il y a très longtemps, vers 1550 avant Jésus-Christ, les Égyptiens partageaient déjà le pain avec des fractions comme 1/2 ou 1/3. Le mot « fraction » vient du latin fractio : « casser en morceaux ».",
  },
  methode: [
    { titre: "Je lis le bas", texte: "Le dénominateur : en combien de parts égales le tout est partagé." },
    { titre: "Je lis le haut", texte: "Le numérateur : combien de parts on prend." },
    { titre: "Je dessine ou je place", texte: "Une barre, un disque, une grille… ou un point sur la droite." },
  ],
  usages: [
    { titre: "Partager", detail: "Une tarte en 4 parts égales, on en prend 3 : c'est 3/4." },
    { titre: "Mesurer", detail: "Un demi-litre (1/2 L), trois quarts d'heure (3/4 h = 45 min)." },
    { titre: "Se repérer", detail: "Sur la droite : 1/2 se place pile au milieu entre 0 et 1." },
  ],
  exemples: [
    {
      titre: "Lire une fraction",
      donnees: "On regarde le disque partagé en 5 parts égales, 2 sont coloriées.",
      question: "Quelle fraction est coloriée ?",
      schema: disque25,
      solution:
        "Le tout est partagé en 5 parts égales (dénominateur 5), on en prend 2 (numérateur 2). La fraction est 2/5.",
    },
    {
      titre: "Le disque",
      donnees: "Un disque partagé en 6 parts égales, 2 parts sont coloriées.",
      question: "Quelle fraction est coloriée ?",
      schema: disque26,
      solution:
        "On écrit les parts coloriées sur le nombre total de parts : 2 sur 6. La fraction coloriée est 2/6.",
    },
    {
      titre: "La grille",
      donnees: "Une grille de 10 cases, 7 cases sont coloriées.",
      question: "Quelle fraction des cases est coloriée ?",
      schema: grille710,
      solution:
        "Il y a 10 cases au total et 7 sont coloriées. La fraction représentée est 7/10.",
    },
    {
      titre: "Sur la droite graduée",
      donnees: "Une droite de 0 à 1 partagée en 4 parts égales.",
      question: "Où se place 3/4 ?",
      schema: droite([{ value: 0.75, label: "3/4", color: VERT }], 0, 1, 0.25),
      solution:
        "Chaque part vaut 1/4. On avance de 3 parts à partir de 0 : 3/4 se place au 3e trait, juste avant 1.",
    },
    {
      titre: "Plus grand que 1",
      donnees: "La fraction 5/4.",
      question: "Se place-t-elle avant ou après 1 ?",
      schema: droite([{ value: 1.25, label: "5/4", color: BLEU }], 0, 2, 0.25),
      solution:
        "4/4 vaut 1. Comme 5/4 a un numérateur plus grand que le dénominateur, il dépasse 1 : 5/4 se place après 1.",
    },
    {
      titre: "Le défi 974",
      donnees: "La fraction 7/3, comme 7 mangues partagées par 3.",
      question: "Entre quels nombres entiers se place 7/3 ?",
      schema: droite([{ value: 7 / 3, label: "7/3", color: VERT }], 0, 3, 1 / 3),
      solution:
        "6/3 = 2 et 9/3 = 3. Comme 7/3 est entre 6/3 et 9/3, la fraction 7/3 se place entre 2 et 3.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Dans la fraction 3/8, quel est le numérateur ? Que veut dire cette fraction ?",
      correction:
        "Le numérateur est le nombre du haut : 3. 3/8 veut dire 3 parts prises sur 8 parts égales.",
    },
    {
      question: "Une barre est partagée en 5 parts égales, les 5 sont coloriées. Quelle fraction ?",
      correction:
        "Toutes les parts sont prises : 5 sur 5, soit 5/5. Et 5/5 = 1 (l'unité entière).",
    },
    {
      question: "Où se place 1/2 sur une droite de 0 à 1 ?",
      correction:
        "1/2, c'est une part sur 2 : on partage en deux, donc 1/2 se place pile au milieu entre 0 et 1.",
    },
    {
      question: "La fraction 5/4 est-elle plus petite ou plus grande que 1 ?",
      correction:
        "4/4 vaut 1. Le numérateur 5 est plus grand que le dénominateur 4, donc 5/4 est plus grande que 1.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=cm2",
};

export const slidesFractionsCM2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Fractions - CM2",
    section: {
      type: "objectif",
      phrase: "Lire, dessiner et placer une fraction",
      sousPhrase:
        "Une fraction, c'est des parts d'un tout partagé en parts égales : le haut compte les parts prises, le bas le nombre de parts.",
      encadre: {
        titre: "L'idée",
        texte: "Une fraction est aussi un nombre : elle se place sur la droite graduée.",
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
          "Une tarte coupée en 8 dont on mange 3 (3/8), un demi-litre d'eau, trois quarts d'heure (3/4 h = 45 min).",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Il y a plus de 3500 ans, les Égyptiens partageaient déjà le pain avec des fractions comme 1/2 ou 1/3.",
      },
    },
  },
  {
    titre: "Numérateur et dénominateur",
    badge: "Le vocabulaire",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Numérateur (haut)", texte: "Le nombre de parts prises. Dans 3/4, c'est 3." },
        { titre: "Dénominateur (bas)", texte: "Le nombre total de parts égales. Dans 3/4, c'est 4." },
        { titre: "Parts égales", texte: "Sans parts égales, on ne peut pas parler de fraction." },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheFractionsCM2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Représenter",
    section: {
      type: "exemple",
      enonce: "Une grille de 10 cases, 7 sont coloriées.",
      question: "Quelle fraction est coloriée ?",
      correction: "7 cases coloriées sur 10 cases au total : la fraction est 7/10.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Sur la droite",
    section: {
      type: "exemple",
      enonce: "Une droite de 0 à 1 partagée en 4 parts égales.",
      question: "Où se place 3/4 ?",
      correction: "Chaque part vaut 1/4. On avance de 3 parts : 3/4 se place au 3e trait, juste avant 1.",
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
      enonce: "On partage 7 mangues entre 3 personnes : la fraction 7/3.",
      question: "Entre quels nombres entiers se place 7/3 ?",
      indice: "Cherche les fractions égales à des entiers : 6/3 = 2 et 9/3 = 3.",
      correction: "6/3 = 2 et 9/3 = 3. Comme 7/3 est entre les deux, 7/3 se place entre 2 et 3.",
    },
  },
];
