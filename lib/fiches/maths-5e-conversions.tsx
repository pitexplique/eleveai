// ─── Fiche de cours : convertir les grandeurs (5e) ─────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/5e/maths/conversions.bank.ts (notionId grandeur_conversion).
//
// ⚠️ La banque écrit en LaTeX ; la fiche, comme toutes celles de 5e, est en
// TEXTE BRUT. Les nombres, eux, sont ceux de la banque, sans exception :
// 0,75 L = 75 cL, la route du littoral et ses 3,5 km, le sac de riz de 2400 g,
// le spectacle de 135 min, 2 h 45 = 165 min, 1 h 20 = 80 min, la comparaison
// 0,5 L / 75 cL / 400 mL, le ruban de 1,2 m dont on coupe 45 cm.
//
// Micro-compétences couvertes (les 4 de la notion) :
// - conversion_decimal      → définition + figure (2400 g = 2,4 kg), propriété
//                             « Changer d'unité », exemples 1 et 2, entraînements 1-2
// - conversion_duree        → propriété « Les durées comptent en 60 »,
//                             exemples 3 et 4, entraînement 3
// - conversion_avant_calcul → propriété « Même unité avant de comparer »,
//                             exemple 5 (0,5 L / 75 cL / 400 mL), entraînement 4
// - conversion_coherence    → propriété « Le sens du changement », pièges
//                             (1 h 70 min) + défi (le ruban)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// Une conversion de MASSE, montrée telle qu'elle se dit : la valeur de départ,
// l'égalité, la valeur d'arrivée, et la relation d'unités en dessous.
const masse = (from: string, to: string, question: string) => (
  <CanvasRenderer
    figure={{ kind: "masse", variant: "conversion", from, to, questionLabel: question }}
  />
);

const contenance = (from: string, to: string, question: string) => (
  <CanvasRenderer
    figure={{ kind: "contenance", variant: "conversion", from, to, questionLabel: question }}
  />
);

// ⛔ PAS DE CANVAS `contenance` POUR UNE LONGUEUR. Il imprime « 1 L = 1000 mL »
// EN DUR sous la conversion : sur « 3,5 km = 3500 m », la fiche affichait donc
// une relation de contenances sous une longueur. Faux, et invisible au
// typecheck. Une longueur se montre autrement : 3,5 km, ce sont trois
// kilomètres pleins et un demi, mis bout à bout — donc le schéma en barres,
// dont les parts sont à l'échelle.
const longueur = (
  titre: string,
  total: string,
  parts: { label: string; value: string }[],
  question: string
) => (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: titre,
      total,
      parts,
      questionLabel: question,
      size: { width: 340, height: 175 },
    }}
  />
);

// Deux récipients côte à côte, et le canvas dit lui-même lequel contient le
// plus : c'est le dessin de « convertir AVANT de comparer ».
const comparer = (
  g: { label: string; millilitres: number },
  d: { label: string; millilitres: number }
) => (
  <CanvasRenderer
    figure={{
      kind: "contenance",
      variant: "comparaison",
      gauche: g,
      droite: d,
      display: { showContenances: true, showLabels: true, showComparison: true },
    }}
  />
);

// ⭐ LE CANVAS QUI SAUVE CETTE NOTION : l'affichage digital montre la MÊME durée
// écrite deux fois. C'est là qu'un élève de 5e se trompe — il croit qu'une
// durée est un nombre décimal comme un autre.
const duree = (texte: string, label: string) => (
  <CanvasRenderer
    figure={{ kind: "duree", variant: "digital", digital: { text: texte, label } }}
  />
);

// La frise : une durée qui s'additionne par morceaux, en heures et minutes.
const frise = (debut: string, fin: string, etapes: { label: string; minutes: number }[]) => (
  <CanvasRenderer
    figure={{
      kind: "duree",
      variant: "frise",
      frise: { startLabel: debut, endLabel: fin, steps: etapes },
    }}
  />
);

const pieges = [
  "Écrire « 1 h 50 min + 20 min = 1 h 70 min » : une heure ne contient que 60 minutes, donc c'est 2 h 10 min.",
  "Additionner des grandeurs d'unités différentes : 1,2 m − 45 cm ne se calcule qu'après avoir tout mis en cm.",
  "Se tromper de sens : vers une PLUS PETITE unité, le nombre devient plus GRAND (2,4 kg = 2400 g).",
];

const aRetenir = [
  "Longueurs, masses, contenances : on change d'unité en multipliant ou divisant par 10, 100, 1000.",
  "Les durées, non : 1 h = 60 min et 1 min = 60 s. Jamais 100.",
  "Avant de comparer ou de calculer, tout mettre dans la MÊME unité.",
];

export const ficheConversions5e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "grandeur-conversion",
  titre: "Convertir les grandeurs",
  accroche:
    "Changer d'unité ne change pas la grandeur : 2,4 kg et 2400 g pèsent exactement pareil. Tout l'enjeu est de savoir dans quel sens va le nombre — et de se souvenir que les durées, elles, comptent en 60.",
  identite: [
    { label: "Mots clés", valeur: "Unité, conversion, multiple, sous-multiple" },
    { label: "Le secret", valeur: "Plus petite unité → plus grand nombre" },
    { label: "Outil", valeur: "Multiplier ou diviser par 10, 100, 1000 — sauf les durées" },
  ],
  definition: {
    texte:
      "Convertir, c'est écrire la même grandeur avec une autre unité. La quantité ne change pas : seul le nombre change. Pour les longueurs, les masses et les contenances, on passe d'une unité à l'autre en multipliant ou en divisant par 10, 100 ou 1000. Les durées font exception : elles se comptent en 60, car une heure vaut 60 minutes et une minute 60 secondes.",
  },
  figure: {
    schema: masse("2400 g", "2,4 kg", "1 kg = 1000 g, donc on divise par 1000."),
    legende:
      "Le sac de riz pèse 2400 g, c'est-à-dire 2,4 kg : c'est la même masse, écrite avec une autre unité.",
  },
  // Un dessin sous chaque propriété (REGLES.md § 2 bis), et quatre canvas
  // différents parce que ces quatre gestes n'ont rien en commun : une égalité
  // d'unités, une durée écrite deux fois, deux récipients qu'on compare, et le
  // sens du changement.
  proprietes: [
    {
      titre: "Changer d'unité",
      texte: "On multiplie ou on divise par 10, 100 ou 1000 : la grandeur reste la même.",
      schema: contenance("0,75 L", "75 cL", "1 L = 100 cL, donc on multiplie par 100."),
    },
    {
      titre: "Le sens du changement",
      texte: "Vers une plus petite unité, le nombre grandit. Vers une plus grande, il diminue.",
      schema: masse("2,4 kg", "2400 g", "Du kg au g : unité plus petite, nombre plus grand."),
    },
    {
      titre: "Les durées comptent en 60",
      texte: "1 h = 60 min et 1 min = 60 s. Une durée n'est pas un nombre décimal.",
      schema: duree("2 h 15 min", "135 minutes"),
    },
    {
      titre: "Même unité avant de comparer",
      texte: "Deux grandeurs ne se comparent — ni ne s'additionnent — qu'écrites dans la même unité.",
      schema: comparer({ label: "0,5 L", millilitres: 500 }, { label: "75 cL", millilitres: 750 }),
    },
  ],
  reel: {
    texte:
      "Convertir sert dès qu'on lit une étiquette ou un panneau : la route du littoral annoncée en kilomètres et le compteur qui compte en mètres, une recette en grammes et une balance en kilos, une bouteille en centilitres et un verre doseur en millilitres, un film annoncé en minutes et une séance qui commence à une heure précise.",
  },
  historique: {
    texte:
      "Le système métrique naît de la Révolution française, en 1795 : il fallait en finir avec les toises, les livres et les pintes, qui changeaient d'une ville à l'autre. Les durées, elles, ont résisté — elles comptent encore en 60, héritage des Babyloniens, il y a 4000 ans.",
  },
  formule: {
    contexte: "Les deux règles à connaître",
    expression: "1 km = 1000 m · 1 kg = 1000 g · 1 L = 100 cL · 1 h = 60 min",
    legende:
      "Les trois premières se lisent par 10, 100, 1000. La dernière fait exception, et c'est elle qui piège.",
    schema: duree("1 h 20 min", "80 minutes"),
  },
  methode: [
    {
      titre: "Je repère les deux unités",
      texte: "Celle de départ, celle d'arrivée — et la relation entre les deux.",
      schema: masse("2400 g", "2,4 kg", "1 kg = 1000 g"),
    },
    {
      titre: "Je regarde le sens",
      texte: "Vers plus petit, je multiplie ; vers plus grand, je divise.",
      schema: longueur(
        "3,5 km, mis bout à bout",
        "3500 m",
        [
          { label: "1 km", value: "1000" },
          { label: "1 km", value: "1000" },
          { label: "1 km", value: "1000" },
          { label: "0,5 km", value: "500" },
        ],
        "Du km au m : unité plus petite, donc on multiplie par 1000."
      ),
    },
    {
      titre: "Je vérifie que c'est cohérent",
      texte: "Un sac de riz de 2,4 kg ne peut pas peser 24 g : l'ordre de grandeur doit tenir.",
      schema: comparer({ label: "400 mL", millilitres: 400 }, { label: "0,5 L", millilitres: 500 }),
    },
  ],
  usages: [
    {
      titre: "Une longueur",
      detail: "3,5 km, c'est 3500 m : du km au m, on multiplie par 1000.",
      schema: longueur(
        "La route du littoral",
        "3500 m",
        [
          { label: "1 km", value: "1000" },
          { label: "1 km", value: "1000" },
          { label: "1 km", value: "1000" },
          { label: "0,5 km", value: "500" },
        ],
        "1 km = 1000 m"
      ),
    },
    {
      titre: "Une durée",
      detail: "1 h 20 min, c'est 80 minutes : 60 + 20, jamais 1,20.",
      schema: duree("1 h 20 min", "80 minutes"),
    },
    {
      titre: "Un calcul en deux unités",
      detail: "1,2 m moins 45 cm : on met tout en cm avant de soustraire.",
      schema: frise("0 cm", "120 cm", [
        { label: "on coupe 45 cm", minutes: 45 },
        { label: "il reste 75 cm", minutes: 75 },
      ]),
    },
  ],
  exemples: [
    {
      titre: "Une contenance",
      donnees: "Une bouteille contient 0,75 L.",
      question: "Combien cela fait-il de centilitres ?",
      schema: contenance("0,75 L", "75 cL", "1 L = 100 cL"),
      solution: "1 L = 100 cL, donc on multiplie par 100 : 0,75 × 100 = 75 cL.",
    },
    {
      titre: "La route du littoral",
      donnees: "La route du littoral fait environ 3,5 km.",
      question: "Combien cela fait-il de mètres ?",
      schema: longueur(
        "La route du littoral",
        "3500 m",
        [
          { label: "1 km", value: "1000" },
          { label: "1 km", value: "1000" },
          { label: "1 km", value: "1000" },
          { label: "0,5 km", value: "500" },
        ],
        "3,5 × 1000 = 3500 m"
      ),
      solution:
        "1 km = 1000 m. On va vers une unité plus petite, donc le nombre grandit : 3,5 × 1000 = 3500 m.",
    },
    {
      titre: "Un spectacle de 135 minutes",
      donnees: "Max assiste à un spectacle qui dure 135 minutes.",
      question: "Comment écrire cette durée en heures et minutes ?",
      schema: duree("2 h 15 min", "135 minutes"),
      solution:
        "135 = 60 + 60 + 15, soit 2 heures et 15 minutes. Attention : ce n'est pas 1,35 h — une durée ne se lit pas comme un décimal.",
    },
    {
      titre: "2 h 45 min en minutes",
      donnees: "Une durée de 2 h 45 min.",
      question: "Combien cela fait-il de minutes ?",
      schema: duree("2 h 45 min", "165 minutes"),
      solution: "2 × 60 = 120, puis 120 + 45 = 165 minutes.",
    },
    {
      titre: "Comparer trois contenances",
      donnees: "0,5 L, 75 cL et 400 mL.",
      question: "Laquelle est la plus grande ?",
      schema: comparer({ label: "0,5 L", millilitres: 500 }, { label: "75 cL", millilitres: 750 }),
      solution:
        "On met tout en millilitres : 0,5 L = 500 mL, 75 cL = 750 mL, et 400 mL restent 400 mL. La plus grande est donc 75 cL.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Un sac de riz pèse 2400 g. Quelle est sa masse en kilogrammes ?",
      correction: "1 kg = 1000 g, donc on divise par 1000 : 2400 ÷ 1000 = 2,4 kg.",
    },
    {
      question: "Complète : 75 L = … cL.",
      correction: "1 L = 100 cL, donc 75 × 100 = 7500 cL.",
    },
    {
      question: "Un entraînement dure 1 h 20 min. Combien de minutes cela fait-il ?",
      correction: "60 + 20 = 80 minutes. (Et surtout pas 1,20 : une durée ne s'écrit pas en décimal.)",
    },
    {
      question: "Un ruban mesure 1,2 m. On en coupe 45 cm. Quelle longueur reste-t-il ?",
      correction:
        "On met tout en cm : 1,2 m = 120 cm. Puis 120 − 45 = 75 cm (soit 0,75 m).",
    },
    {
      question: "Un élève écrit : « 1 h 50 min + 20 min = 1 h 70 min ». Où est l'erreur ?",
      correction:
        "Une heure ne contient que 60 minutes : 70 min = 1 h 10 min. La bonne écriture est donc 2 h 10 min.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=5e",
};

// ⚠️ Le mode classe est ENGENDRÉ depuis la fiche (lib/fiches/slidesDepuisFiche).
// Ce tableau n'est plus lu : il ne sert qu'à dire « cette fiche se projette ».
export const slidesConversions5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Convertir - 5e",
    section: {
      type: "objectif",
      phrase: "Changer d'unité sans changer la grandeur",
      sousPhrase: "Vers une plus petite unité, le nombre grandit — et les durées comptent en 60.",
    },
  },
];
