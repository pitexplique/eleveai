// ─── Fiche de cours : algorithmique et programmation (5e) ──────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/5e/maths/algorithmique.bank.ts (notionId algo_programmation).
// Dessinée par le canvas « scratch » du coach (blocs event/move/turn/say/set_variable/if/repeat).
//
// Micro-compétences couvertes :
// - algo_sequence          → définition + figure (une suite d'instructions dans l'ordre)
// - algo_entree_sortie     → propriété « Variable » (une case mémoire nommée)
// - algo_expression_valeur → exemple 1 (x = 5 → 3x + 2 = 17)
// - algo_prevoir_expression→ exemple 1 (prévoir la sortie)
// - algo_parametre         → propriété « Le paramètre »
// - algo_test_condition    → exemple 2 (si score > 10 → « Bravo ! »)
// - algo_boucle            → exemple 3 (répéter 4 fois : avancer de 10 → 40 pas)
// - algo_defi              → pièges + défi (dessiner un carré)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

type Bloc =
  | { type: "event" }
  | { type: "move"; value: number }
  | { type: "turn"; value: number }
  | { type: "say"; text: string }
  | { type: "set_variable"; variable: string; value: number }
  | { type: "if"; condition: string; children: Bloc[] }
  | { type: "repeat"; times: number; children: Bloc[] };

const scratch = (title: string, blocks: Bloc[]) => (
  <CanvasRenderer figure={{ kind: "scratch", title, blocks } as never} />
);

const progSequence = scratch("Une suite d'instructions", [
  { type: "event" },
  { type: "move", value: 3 },
  { type: "turn", value: 90 },
  { type: "move", value: 2 },
]);

const progVariable = scratch("Calculer une expression", [
  { type: "event" },
  { type: "set_variable", variable: "x", value: 5 },
  { type: "say", text: "3x + 2 = 17" },
]);

const progTest = scratch("Tester une condition", [
  { type: "event" },
  { type: "set_variable", variable: "score", value: 15 },
  { type: "if", condition: "score > 10", children: [{ type: "say", text: "Bravo !" }] },
]);

const progBoucle = scratch("Une répétition (boucle)", [
  { type: "event" },
  { type: "repeat", times: 4, children: [{ type: "move", value: 10 }] },
]);

const progCarre = scratch("Dessiner un carré", [
  { type: "event" },
  { type: "repeat", times: 4, children: [{ type: "move", value: 100 }, { type: "turn", value: 90 }] },
]);

// Un compteur : la variable CHANGE a chaque tour. C'est le seul programme ou
// suivre la valeur pas a pas est indispensable — d'ou sa place sous le
// deuxieme reflexe.
const progCompteur = scratch("Suivre une variable", [
  { type: "event" },
  { type: "set_variable", variable: "x", value: 0 },
  {
    type: "repeat",
    times: 3,
    children: [{ type: "set_variable", variable: "x", value: 2 }],
  },
  { type: "say", text: "x vaut 6" },
]);

const pieges = [
  "Changer l'ordre des instructions : tourner avant d'avancer ne mène pas au même endroit. L'ordre compte.",
  "Oublier que la boucle répète : « répéter 4 fois avancer de 10 » = 4 × 10 = 40 pas, pas 10.",
  "Mauvais nombre de côtés ou d'angle : un carré, c'est répéter 4 fois « avancer + tourner de 90° ».",
];

const aRetenir = [
  "Un algorithme est une suite d'instructions, exécutées dans l'ordre, de haut en bas.",
  "Une variable est une case mémoire nommée ; on peut y ranger et en lire une valeur.",
  "La boucle « répéter » refait les mêmes instructions ; le test « si » n'agit que si la condition est vraie.",
];

export const ficheAlgorithmique5e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "algo-programmation",
  titre: "Algorithmique et programmation",
  accroche:
    "Un programme, c'est une suite d'ordres exécutés dans l'ordre par la machine. En 5e : les variables, les tests (si...) et les boucles (répéter...).",
  identite: [
    { label: "Mots clés", valeur: "Instruction, variable, boucle, test, condition" },
    { label: "Le secret", valeur: "Tout s'exécute dans l'ordre, de haut en bas" },
    { label: "Outil", valeur: "Scratch (des blocs qui s'emboîtent)" },
  ],
  definition: {
    texte:
      "Un algorithme est une suite d'instructions précises, exécutées dans l'ordre, de haut en bas. En programmation (Scratch), chaque instruction est un bloc. Le résultat dépend de l'ordre des blocs : ce sont les mêmes instructions, mais rangées différemment donnent un autre résultat.",
  },
  figure: {
    schema: progSequence,
    legende: "Un programme = une suite de blocs, exécutés du haut vers le bas.",
  },
  proprietes: [
    {
      titre: "La variable",
      texte: "Une case mémoire nommée (ex. x) où l'on range une valeur, qu'on peut lire et modifier.",
      schema: progVariable,
    },
    {
      titre: "Le test (si...)",
      texte: "On n'exécute des blocs QUE si une condition est vraie : « si score > 10 alors... ».",
      schema: progTest,
    },
    {
      titre: "La boucle (répéter...)",
      texte: "On refait plusieurs fois les mêmes blocs : « répéter 4 fois : avancer de 10 ».",
      schema: progBoucle,
    },
    {
      titre: "Le paramètre",
      texte: "Une valeur que l'on donne à un bloc (avancer de combien ? tourner de quel angle ?).",
      // Le carre : deux parametres a lire dans le meme programme, la longueur
      // du cote et l'angle du virage. Un bloc sans nombre ne montrerait rien.
      schema: progCarre,
    },
  ],
  reel: {
    texte:
      "Les algorithmes sont partout : un jeu vidéo, un GPS qui calcule un trajet, un feu tricolore, une recette de cuisine, un robot, et bien sûr toutes les applications de ton téléphone.",
  },
  historique: {
    texte:
      "Le mot « algorithme » vient du savant Al-Khwarizmi (Bagdad, vers 820). Scratch, lui, a été créé en 2007 au MIT pour apprendre à programmer avec des blocs colorés, sans faute de syntaxe.",
  },
  methode: [
    {
      titre: "Je lis dans l'ordre",
      texte: "J'exécute les blocs de haut en bas, un par un.",
      schema: progSequence,
    },
    {
      titre: "Je suis les variables",
      texte: "Je note la valeur de chaque variable au fil du programme.",
      schema: progCompteur,
    },
    {
      titre: "Je déplie les boucles",
      texte: "« Répéter n fois » = je refais le contenu n fois.",
      schema: progCarre,
    },
  ],
  usages: [
    {
      titre: "Variable & expression",
      detail: "Ranger une valeur (x = 5), puis calculer (3x + 2).",
      schema: progVariable,
    },
    {
      titre: "Test (si...)",
      detail: "Agir seulement si une condition est vraie.",
      schema: progTest,
    },
    {
      titre: "Boucle (répéter...)",
      detail: "Refaire plusieurs fois, pour un programme plus court.",
      schema: progBoucle,
    },
  ],
  exemples: [
    {
      titre: "La valeur d'une expression",
      donnees: "Le programme range x = 5, puis calcule 3x + 2.",
      question: "Que va afficher le lutin ?",
      schema: progVariable,
      solution:
        "On remplace x par 5 : 3 × 5 + 2 = 15 + 2 = 17. Le lutin affiche 17.",
    },
    {
      titre: "Un test (condition)",
      donnees: "score = 15 ; le programme teste « si score > 10 ».",
      question: "Le lutin dit-il « Bravo ! » ?",
      schema: progTest,
      solution:
        "La condition « 15 > 10 » est vraie : le bloc du « si » s'exécute. Oui, le lutin dit « Bravo ! ».",
    },
    {
      titre: "Une boucle",
      donnees: "Le programme répète 4 fois « avancer de 10 ».",
      question: "Quelle distance totale le lutin parcourt-il ?",
      schema: progBoucle,
      solution:
        "La boucle répète 4 fois : 4 × 10 = 40. Le lutin parcourt 40 pas.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Le programme range x = 4 puis calcule 2x + 3. Que vaut le résultat ?",
      correction: "2 × 4 + 3 = 8 + 3 = 11.",
    },
    {
      question: "score = 8. La condition « si score > 10 » est-elle vraie ?",
      correction: "Non : 8 n'est pas plus grand que 10. Le bloc du « si » ne s'exécute pas.",
    },
    {
      question: "Le programme répète 5 fois « avancer de 20 ». Distance totale ?",
      correction: "5 × 20 = 100 pas.",
    },
    {
      question: "Comment dessiner un carré de côté 100 avec une boucle ?",
      correction: "Répéter 4 fois : « avancer de 100, tourner de 90° ».",
    },
  ],
  coachHref: "/coach-ia/maths?classe=5e",
};

export const slidesAlgorithmique5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Algo & Scratch - 5e",
    section: {
      type: "objectif",
      phrase: "Lire et écrire un programme (variables, tests, boucles)",
      sousPhrase:
        "Un algorithme est une suite d'instructions exécutées dans l'ordre, de haut en bas.",
      encadre: {
        titre: "L'idée",
        texte: "Variable = case mémoire. Test = si... Boucle = répéter...",
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
          "Jeux vidéo, GPS, feu tricolore, robot, recette de cuisine, toutes les applis de ton téléphone.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Algorithme » vient d'Al-Khwarizmi (vers 820). Scratch a été créé en 2007 au MIT.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheAlgorithmique5e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Variable, test, boucle",
    badge: "3 outils",
    section: {
      type: "cartes",
      cartes: ficheAlgorithmique5e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Une boucle",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "Répéter 4 fois « avancer de 10 ».",
      question: "Distance totale ?",
      correction: "4 × 10 = 40 pas.",
    },
  },
  {
    titre: "Un test (condition)",
    badge: "Si... alors",
    section: {
      type: "duo",
      gauche: {
        variante: "ok",
        titre: "Condition vraie",
        contenu: "score = 15, « si score > 10 » → le bloc s'exécute (« Bravo ! »).",
      },
      droite: {
        variante: "piege",
        titre: "Condition fausse",
        contenu: "score = 8, « si score > 10 » → le bloc est ignoré.",
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
      enonce: "On veut dessiner un carré de côté 100.",
      question: "Quel programme (avec une boucle) écrire ?",
      indice: "Un carré a 4 côtés égaux et 4 angles de 90°.",
      correction: "Répéter 4 fois : « avancer de 100, tourner de 90° ».",
    },
  },
];
