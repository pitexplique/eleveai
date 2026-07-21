// ─── Fiche de cours : l'algorithmique (CM2) ─────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm2/maths/algorithmique.bank.ts (notionId algorithmique).
// CM2 = texte brut, langage d'un enfant de ~10 ans. On MONTRE avec le canvas
// scratch du coach (blocs colorés event/move/turn/say/repeat) — comme dans Scratch.
//
// Micro-compétences couvertes (les 6 de la banque) :
// - algo_instruction  → definition, figure (event/move/turn/say), exemple « compter »
// - algo_logique      → propriété « la suite logique » (motif qui se répète)
// - algo_deplacement  → propriété « avancer ≠ tourner », exemple distance totale
// - algo_repetition   → propriété « la boucle répéter », exemple répéter 4 × avancer
// - algo_programme    → propriété « lire dans l'ordre »
// - algo_defi         → défi dessiné 974 (le margouillat trace un carré : répéter 4 fois)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

type Bloc =
  | { type: "event"; text?: string }
  | { type: "move"; value: number | string }
  | { type: "turn"; value: number | string }
  | { type: "say"; text?: string }
  | { type: "pen"; text?: string }
  | { type: "repeat"; times: number; children: Bloc[] };

function scratch(title: string, blocks: Bloc[]) {
  return <CanvasRenderer figure={{ kind: "scratch", title, blocks }} />;
}

const pieges = [
  "Changer l'ordre des blocs : un programme se lit de haut en bas ; si on inverse deux instructions, le résultat change.",
  "Confondre « avancer » (change la position) et « tourner » (change la direction) : tourner de 90° ne fait pas avancer de 90 pas.",
  "Oublier que le bloc dans « répéter 4 fois » est exécuté 4 fois, pas une seule.",
];

const aRetenir = [
  "Un programme est une suite d'instructions, exécutées dans l'ordre, de haut en bas.",
  "« Avancer » change la position ; « tourner » change la direction.",
  "Une boucle « répéter n fois » exécute n fois les blocs qu'elle contient.",
];

export const ficheAlgorithmiqueCM2: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "algorithmique",
  titre: "L'algorithmique",
  accroche:
    "Un programme, c'est une suite d'instructions qu'on exécute dans l'ordre, comme une recette de cuisine. Dans Scratch, chaque instruction est un bloc de couleur : avancer, tourner, dire, répéter.",
  identite: [
    { label: "Mots clés", valeur: "Instruction, programme, ordre, boucle (répéter), avancer, tourner" },
    { label: "Le secret", valeur: "Lire les blocs de haut en bas, dans l'ordre" },
    { label: "Outil", valeur: "Scratch et ses blocs colorés" },
  ],
  definition: {
    texte:
      "Une instruction est une action précise à exécuter (avancer, tourner, dire…). Un programme est une suite d'instructions rangées dans l'ordre. Un algorithme, c'est la méthode : la liste des étapes à suivre pour arriver au résultat.",
  },
  figure: {
    schema: scratch("Un petit programme", [
      { type: "event" },
      { type: "move", value: 20 },
      { type: "turn", value: 90 },
      { type: "say", text: "Bonjour !" },
    ]),
    legende: "On lit de haut en bas : le lutin avance de 20, tourne de 90°, puis dit « Bonjour ! ».",
  },
  proprietes: [
    {
      titre: "L'ordre compte",
      texte: "Un programme se lit de haut en bas. Changer l'ordre des blocs peut changer le résultat.",
    },
    {
      titre: "Avancer ≠ tourner",
      texte: "« Avancer de 10 » change la position. « Tourner de 90° » change la direction.",
    },
    {
      titre: "La boucle « répéter »",
      texte: "« Répéter 4 fois » exécute 4 fois les blocs à l'intérieur : le programme est plus court.",
    },
    {
      titre: "Suivre une suite logique",
      texte: "Un motif qui se répète (avancer, tourner, avancer, tourner…) se prolonge en trouvant la règle.",
    },
  ],
  reel: {
    texte:
      "L'algorithmique est partout : un margouillat-robot qu'on programme dans Scratch pour tracer une figure, les jeux vidéo, mais aussi les feux de circulation à Saint-Denis ou le GPS qui calcule ta route. Partout, une machine suit des instructions dans l'ordre.",
  },
  historique: {
    texte:
      "Le tout premier programme de l'histoire a été écrit par Ada Lovelace, une mathématicienne anglaise du 19e siècle — bien avant les ordinateurs ! Elle avait compris qu'une machine pouvait suivre une suite d'instructions. On la considère comme la première programmeuse du monde.",
  },
  methode: [
    { titre: "Je pars du départ", texte: "Le bloc jaune « quand… » lance le programme." },
    { titre: "Je lis dans l'ordre", texte: "Je suis les blocs de haut en bas, un par un." },
    { titre: "J'exécute chaque bloc", texte: "J'imagine ce que fait le lutin à chaque instruction." },
  ],
  usages: [
    { titre: "Lire un programme", detail: "Prévoir ce que fait le lutin, bloc après bloc." },
    { titre: "Compter les répétitions", detail: "Savoir combien de fois une action est faite dans une boucle." },
    { titre: "Tracer une figure", detail: "Programmer un carré, un triangle… avec « répéter »." },
  ],
  exemples: [
    {
      titre: "Compter les instructions",
      donnees: "Voici un programme.",
      question: "Combien d'instructions d'action y a-t-il après le départ ?",
      schema: scratch("Programme simple", [
        { type: "event" },
        { type: "move", value: 10 },
        { type: "turn", value: 90 },
        { type: "say", text: "Bonjour !" },
      ]),
      solution:
        "On ne compte pas le bloc de départ. Après lui : avancer, tourner, dire. Cela fait 3 instructions d'action.",
    },
    {
      titre: "La boucle « répéter »",
      donnees: "Le lutin répète 4 fois « avancer de 10 ».",
      question: "Quelle distance parcourt-il en tout ?",
      schema: scratch("Une boucle", [
        { type: "event" },
        { type: "repeat", times: 4, children: [{ type: "move", value: 10 }] },
      ]),
      solution: "La boucle répète 4 fois. Donc 4 × 10 = 40. Le lutin avance de 40 pas.",
    },
    {
      titre: "Avancer ou tourner ?",
      donnees: "Le lutin avance de 30, tourne de 90°, puis avance de 20.",
      question: "Quelle distance totale avance-t-il ?",
      schema: scratch("Distance totale", [
        { type: "event" },
        { type: "move", value: 30 },
        { type: "turn", value: 90 },
        { type: "move", value: 20 },
      ]),
      solution: "On additionne seulement les « avancer » (pas les « tourner ») : 30 + 20 = 50 pas.",
    },
    {
      titre: "Le défi 974",
      donnees: "On veut programmer le margouillat pour tracer un carré de côté 50.",
      question: "Combien de fois faut-il répéter « avancer, tourner » ? Quelle distance en tout ?",
      schema: scratch("Le margouillat trace un carré", [
        { type: "event" },
        { type: "pen", text: "stylo en position d'écriture" },
        {
          type: "repeat",
          times: 4,
          children: [
            { type: "move", value: 50 },
            { type: "turn", value: 90 },
          ],
        },
      ]),
      solution:
        "Un carré a 4 côtés : on répète 4 fois « avancer de 50, tourner de 90° ». Distance totale : 4 × 50 = 200 pas.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Dans un programme, faut-il lire les instructions dans l'ordre ?",
      correction: "Oui. Un programme se lit comme une recette, de haut en bas. Changer l'ordre peut changer le résultat.",
    },
    {
      question: "Complète la suite logique : avancer, tourner, avancer, tourner, …",
      correction: "Le motif « avancer, tourner » se répète. Après tourner, on retrouve avancer.",
    },
    {
      question: "Dans « répéter 5 fois : avancer de 10 », de combien avance le lutin ?",
      correction: "5 × 10 = 50. Le lutin avance de 50 pas.",
    },
    {
      question: "Un élève trace un carré mais répète seulement 3 fois « avancer, tourner ». Est-ce correct ?",
      correction: "Non : un carré a 4 côtés. Il faut répéter 4 fois, sinon il manque un côté.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=cm2",
};

export const slidesAlgorithmiqueCM2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Algorithmique - CM2",
    section: {
      type: "objectif",
      phrase: "Lire et comprendre un programme, bloc par bloc",
      sousPhrase:
        "Un programme est une suite d'instructions exécutées dans l'ordre. On les lit de haut en bas.",
      encadre: {
        titre: "L'idée",
        texte: "Départ → je lis chaque bloc dans l'ordre → j'imagine ce que fait le lutin.",
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
          "Programmer un margouillat dans Scratch, les jeux vidéo, les feux de circulation, le GPS qui calcule ta route.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Ada Lovelace a écrit le premier programme au 19e siècle, avant même les ordinateurs. C'est la première programmeuse du monde.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheAlgorithmiqueCM2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "La boucle",
    section: {
      type: "exemple",
      enonce: "Le lutin répète 4 fois « avancer de 10 ».",
      question: "Quelle distance parcourt-il ?",
      correction: "La boucle répète 4 fois : 4 × 10 = 40 pas.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Avancer ou tourner",
    section: {
      type: "exemple",
      enonce: "Le lutin avance de 30, tourne de 90°, puis avance de 20.",
      question: "Quelle distance totale ?",
      correction: "On additionne les « avancer » : 30 + 20 = 50 pas (le « tourner » ne compte pas).",
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
      enonce: "On programme le margouillat pour tracer un carré de côté 50.",
      question: "Combien de fois répéter « avancer, tourner » et quelle distance en tout ?",
      indice: "Un carré a 4 côtés.",
      correction: "On répète 4 fois « avancer de 50, tourner de 90° ». Distance : 4 × 50 = 200 pas.",
    },
  },
];
