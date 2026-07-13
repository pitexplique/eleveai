// ─── Fiche de cours : algorithmique et programmation (6e) ──────────────────────
// Fiche « en blocs » créée pour coller EXACTEMENT à la banque du coach
// (lib/tutor-v4/questionBank/6e/maths/algorithmique.bank.ts).
//
// Couverture des micro-compétences de la banque (pour la relecture du prof) :
// - algo_sequence        → definition, proprietes (L'ordre compte),
//                          methode (Lire dans l'ordre), usages (carte 3),
//                          entrainement (Q1), pieges (1)
// - algo_deplacement     → identite (Idée clé), methode (Exécuter pas à pas),
//                          usages (carte 1), exemples (ex. 1),
//                          entrainement (Q2), slides (déplacement guidé)
// - algo_repetition      → proprietes (La répétition raccourcit),
//                          methode (Chercher les répétitions), usages (carte 2),
//                          exemples (ex. 2), entrainement (Q3), pieges (2)
// - algo_lire_programme  → usages (carte 3), methode (Exécuter pas à pas),
//                          exemples (ex. 2), entrainement (Q3), slide « prévoir »
// - algo_figure          → proprietes (La répétition raccourcit),
//                          entrainement (Q4), slide « figure », pieges (3)
// - algo_defi            → entrainement (Q4), slide « exercice flash »

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// Un programme Scratch dessiné par le moteur du coach : les mêmes blocs colorés
// que l'élève assemble dans ses exercices.
const progSequence = (
  <CanvasRenderer
    figure={{
      kind: "scratch",
      title: "Un programme = une suite d'instructions",
      blocks: [
        { type: "event" },
        { type: "move", value: 10 },
        { type: "turn", value: 90 },
        { type: "say", text: "Bonjour !" },
      ],
    }}
  />
);

// Exemple 1 : un déplacement (avancer 3, tourner, avancer 2).
const progDeplacement = (
  <CanvasRenderer
    figure={{
      kind: "scratch",
      title: "Un déplacement",
      blocks: [
        { type: "event" },
        { type: "move", value: 3 },
        { type: "turn", value: 90 },
        { type: "move", value: 2 },
      ],
    }}
  />
);

// Exemple 2 : une répétition (répéter 4 fois : avancer de 10).
const progRepetition = (
  <CanvasRenderer
    figure={{
      kind: "scratch",
      title: "Une répétition",
      blocks: [
        { type: "event" },
        { type: "repeat", times: 4, children: [{ type: "move", value: 10 }] },
      ],
    }}
  />
);

const pieges = [
  "Changer l'ordre des instructions sans y penser : si on tourne avant d'avancer, le lutin ne va pas au même endroit. L'ordre fait partie du programme.",
  "Oublier que la boucle répète : dans « répéter 4 fois : avancer de 10 », le lutin avance 4 × 10 = 40 pas, pas seulement 10.",
  "Utiliser le mauvais angle ou le mauvais nombre de côtés : pour un carré, il faut répéter 4 fois et tourner de 90°, pas 3 fois ou 60°.",
];

const aRetenir = [
  "Un algorithme est une suite d'instructions précises, exécutées dans l'ordre, de haut en bas.",
  "Une répétition (boucle) refait plusieurs fois les mêmes instructions : c'est plus court à écrire.",
  "Pour prévoir le résultat, on exécute le programme pas à pas, sans oublier de compter les tours de boucle.",
];

export const ficheAlgorithmique6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "algo-programmation",
  titre: "Algorithmique et programmation",
  accroche:
    "Programmer, c'est donner à une machine une suite d'ordres clairs qu'elle exécute sans deviner. En 6e, on apprend à lire un programme, à faire déplacer un personnage, à utiliser une répétition et à prévoir ce qui va se passer.",
  identite: [
    { label: "Prérequis", valeur: "Suivre des consignes dans l'ordre, compter et calculer de petites additions et multiplications" },
    { label: "Idée clé", valeur: "L'ordinateur fait exactement ce qu'on lui dit, ni plus, ni moins" },
    { label: "Outil", valeur: "Scratch : on assemble des blocs pour déplacer un lutin et tracer des figures" },
  ],
  definition: {
    texte:
      "Un algorithme est une suite d'instructions précises et ordonnées qui permet d'obtenir un résultat. Un programme, c'est un algorithme écrit pour une machine. Les instructions s'exécutent une par une, de haut en bas, dans l'ordre où elles sont écrites.",
  },
  figure: {
    schema: progSequence,
    legende: "Un programme Scratch : les blocs s'exécutent dans l'ordre, de haut en bas.",
  },
  proprietes: [
    {
      titre: "L'ordre compte",
      texte:
        "Les instructions s'exécutent dans l'ordre, de haut en bas. Si on change l'ordre, le résultat peut changer : « avancer puis tourner » ne mène pas au même endroit que « tourner puis avancer ».",
    },
    {
      titre: "La répétition raccourcit",
      texte:
        "Quand une même action revient plusieurs fois, on utilise une boucle « répéter … fois » au lieu de tout réécrire. « Répéter 4 fois : avancer, tourner de 90° » trace un carré avec quelques blocs seulement.",
    },
    {
      titre: "L'ordinateur exécute sans deviner",
      texte:
        "La machine ne comprend pas ce qu'on voulait faire : elle applique les instructions telles quelles. Si un bloc est faux ou mal placé, elle exécute l'erreur sans la corriger. C'est à nous d'être précis.",
    },
  ],
  reel: {
    texte:
      "Les algorithmes sont partout, même sans ordinateur : une recette de cuisine est une suite d'étapes à suivre dans l'ordre. Un GPS calcule ton trajet en enchaînant des instructions (« tourne à droite, continue tout droit »). Dans un jeu vidéo, chaque personnage suit un programme qui décide de ses déplacements.",
  },
  historique: {
    texte:
      "Le mot « algorithme » vient du nom du savant Al-Khwarizmi, mathématicien qui vivait à Bagdad au 9e siècle et expliquait comment résoudre des problèmes étape par étape. Bien plus tard, le langage Scratch a été créé en 2007 pour apprendre à programmer en assemblant des blocs colorés, sans avoir à taper de code.",
  },
  methode: [
    {
      titre: "Lire dans l'ordre",
      texte:
        "On lit le programme de haut en bas, comme un texte. On repère d'abord le bloc de départ (« quand le drapeau vert est cliqué »), puis chaque instruction dans l'ordre.",
    },
    {
      titre: "Exécuter pas à pas",
      texte:
        "On fait comme si on était la machine : on suit chaque instruction une par une et on note ce qui se passe (position, direction). On ne saute aucune étape.",
    },
    {
      titre: "Chercher les répétitions",
      texte:
        "On repère les blocs à l'intérieur d'un « répéter … fois » : ils sont exécutés plusieurs fois. On multiplie l'action par le nombre de tours pour trouver le résultat total.",
    },
  ],
  usages: [
    {
      titre: "Suivre ou écrire un déplacement",
      detail:
        "Faire avancer un lutin (« avancer de 10 ») ou le faire tourner (« tourner de 90° »). Avancer change la position, tourner change la direction : ce sont deux actions différentes.",
    },
    {
      titre: "Utiliser une répétition",
      detail:
        "Regrouper une action qui se répète dans une boucle : « répéter 3 fois : avancer de 20 » fait avancer de 3 × 20 = 60 pas, en trois blocs au lieu de six.",
    },
    {
      titre: "Prévoir le résultat",
      detail:
        "Lire un programme pour dire à l'avance ce que fait le lutin : quelle distance il parcourt, quelle figure il trace, ce qu'il dit à la fin.",
    },
  ],
  exemples: [
    {
      titre: "Suivre un déplacement sur un quadrillage",
      donnees:
        "Un lutin part d'une case et suit ce programme : avance de 3 cases, tourne à droite (quart de tour), avance de 2 cases.",
      question: "Combien de cases le lutin a-t-il parcourues en tout, et a-t-il changé de direction ?",
      schema: progDeplacement,
      solution:
        "On exécute pas à pas. Le lutin avance d'abord de 3 cases, puis il tourne à droite : il regarde maintenant dans une nouvelle direction, mais il n'avance pas pendant qu'il tourne. Ensuite il avance de 2 cases. Pour la distance, on additionne seulement les blocs « avancer » : 3 + 2 = 5 cases. Le lutin a bien changé de direction une fois, au moment du quart de tour.",
    },
    {
      titre: "Comprendre une répétition",
      donnees:
        "Un lutin suit le programme : répéter 4 fois « avancer de 10 pas ».",
      question: "Quelle distance totale le lutin parcourt-il ?",
      schema: progRepetition,
      solution:
        "Le bloc « avancer de 10 » est placé à l'intérieur de la boucle : il est donc exécuté à chaque tour. La boucle fait 4 tours, et à chaque tour le lutin avance de 10 pas. On multiplie : 4 × 10 = 40. Le lutin parcourt 40 pas au total. C'est le piège classique : la boucle ne fait pas avancer une seule fois, mais 4 fois.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question:
        "Un programme contient, dans l'ordre : « avancer », « tourner », « avancer ». Quelle est la 2e instruction, et combien y a-t-il d'instructions en tout ?",
      correction:
        "On lit le programme de haut en bas et on compte les instructions dans l'ordre : 1re = avancer, 2e = tourner, 3e = avancer. La 2e instruction est donc « tourner ». En tout, le programme contient 3 instructions.",
    },
    {
      question:
        "Un robot regarde vers le Nord. Il fait un quart de tour à droite, puis encore un quart de tour à droite. Vers où regarde-t-il à la fin ?",
      correction:
        "On exécute pas à pas. Un quart de tour à droite depuis le Nord amène vers l'Est. Un deuxième quart de tour à droite depuis l'Est amène vers le Sud. À la fin, le robot regarde vers le Sud. (Deux quarts de tour font un demi-tour, donc la direction opposée au Nord.)",
    },
    {
      question:
        "Un lutin avance d'abord de 10 pas, puis répète 3 fois « avancer de 20 pas ». Quelle distance totale parcourt-il ?",
      correction:
        "On sépare ce qui est hors de la boucle et ce qui est dedans. Hors boucle : le lutin avance de 10 pas. Dans la boucle : « avancer de 20 » est répété 3 fois, soit 3 × 20 = 60 pas. On additionne le tout : 10 + 60 = 70. Le lutin parcourt 70 pas au total.",
    },
    {
      question:
        "Un élève veut tracer un carré. Il écrit : répéter 3 fois « avancer de 50, tourner de 90° ». Son programme est-il correct ? Sinon, comment le corriger ?",
      correction:
        "Un carré a 4 côtés et 4 angles droits. Le programme ne répète que 3 fois : il ne trace donc que 3 côtés, la figure reste ouverte. Le programme n'est pas correct. Pour le corriger, il faut remplacer « répéter 3 fois » par « répéter 4 fois » : ainsi le lutin trace les 4 côtés et referme le carré. L'angle de 90° est bien le bon.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
};

export const slidesAlgorithmique6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Algorithmique - 6e",
    section: {
      type: "objectif",
      phrase: "Lire un programme et prévoir ce qu'il fait",
      sousPhrase:
        "Programmer, c'est donner une suite d'ordres clairs à une machine. Tout repose sur une idée : l'ordinateur exécute exactement ce qu'on lui dit.",
      encadre: {
        titre: "L'idée",
        texte:
          "« Avancer puis tourner » ne donne pas le même résultat que « tourner puis avancer ». L'ordre fait partie du programme.",
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
          "Une recette de cuisine, un itinéraire de GPS, les personnages d'un jeu vidéo : tous suivent une suite d'instructions dans l'ordre.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Le mot « algorithme » vient d'Al-Khwarizmi, savant de Bagdad au 9e siècle. Le langage Scratch, lui, a été créé en 2007 pour programmer en assemblant des blocs.",
      },
    },
  },
  {
    titre: "La définition",
    badge: "À connaître",
    section: {
      type: "objectif",
      phrase: "Un algorithme est une suite d'instructions précises et ordonnées",
      sousPhrase:
        "Un programme, c'est un algorithme écrit pour une machine. Les instructions s'exécutent une par une, de haut en bas.",
      encadre: {
        titre: "Attention",
        texte:
          "L'ordinateur ne devine pas ce que tu voulais faire : il applique tes instructions telles quelles, même si elles sont fausses.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheAlgorithmique6e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Selon ce que l'on cherche",
    badge: "3 gestes",
    section: {
      type: "cartes",
      cartes: ficheAlgorithmique6e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Suivre un déplacement",
    section: {
      type: "exemple",
      enonce:
        "Un lutin suit ce programme : avance de 3 cases, tourne à droite (quart de tour), avance de 2 cases.",
      question: "Combien de cases parcourt-il en tout ?",
      correction:
        "On additionne seulement les blocs « avancer » : 3 + 2 = 5 cases. Tourner change la direction, mais ne fait pas avancer.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Prévoir avec une boucle",
    section: {
      type: "exemple",
      enonce: "Un lutin suit : répéter 4 fois « avancer de 10 pas ».",
      question: "Quelle distance totale parcourt-il ?",
      correction:
        "Le bloc « avancer de 10 » est dans la boucle : il est exécuté 4 fois. Donc 4 × 10 = 40 pas.",
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
      enonce:
        "Un élève veut tracer un carré. Il écrit : répéter 3 fois « avancer de 50, tourner de 90° ».",
      question: "Son programme est-il correct ? Sinon, comment le corriger ?",
      indice: "Un carré a 4 côtés.",
      correction:
        "Non : avec 3 répétitions, il ne trace que 3 côtés. Il faut remplacer « répéter 3 fois » par « répéter 4 fois » pour fermer le carré.",
    },
  },
];
