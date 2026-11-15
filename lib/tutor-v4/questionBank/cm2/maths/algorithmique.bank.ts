import type {
  TutorBankItemV4,
  ScratchCanvasData,
} from "@/lib/tutor-v4/types";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";
import {
  GAB_DEFI,
  GAB_DEFI_CM2,
  GAB_DEPLACEMENT,
  GAB_DEPLACEMENT_CM2,
  GAB_INSTRUCTION,
  GAB_INSTRUCTION_CM2,
  GAB_LOGIQUE,
  GAB_LOGIQUE_CM2,
  GAB_PROGRAMME,
  GAB_PROGRAMME_CM2,
  GAB_REPETITION,
  GAB_REPETITION_CM2,
} from "./algorithmique-outils";

/* =========================
   HELPERS
========================= */

function shuffle<T>(arr: T[]): T[] {
  return melangeEnPlace([...arr]);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  // ⚠️ 04/08/2026 — la bonne réponse était jetée dans le même chapeau que les
  // pièges : à cinq pièges écrits, le mélange pouvait la laisser au fond et
  // le découpage à quatre l'emportait. L'élève voyait alors quatre pièges et
  // rien d'autre. On la met de côté, on tire trois distracteurs, on mélange.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

function scratchCanvas(
  title: string,
  blocks: ScratchCanvasData["blocks"]
): ScratchCanvasData {
  return {
    kind: "scratch",
    title,
    blocks,
  };
}

export const algorithmiqueBank: TutorBankItemV4[] = [
  /* ============================================================
     ALGO_INSTRUCTION
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_algo_instruction_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_instruction",
    difficulty: 1,
    theme: "neutral",
    text: "En algorithmique, une instruction est...",
    format: "qcm",
    choices: [
      "une action précise à exécuter",
      "un nombre choisi au hasard",
      "un dessin sans règle",
      "une réponse toujours fausse",
    ],
    expected: ["une action précise à exécuter"],
    comparator: "mcq_exact",
    hint: "Une instruction dit ce qu’il faut faire.",
    explanation: exp(
      "Une instruction est une action précise que l’on demande à un programme d’exécuter.",
      "On lit les instructions dans l’ordre.",
      "Par exemple : avancer, tourner, dire Bonjour sont des instructions.",
      "Une instruction sert à faire exécuter une action précise."
    ),
    tags: ["cm2", "algorithmique", "instruction", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_algo_instruction_fixed_2_ordre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_instruction",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un programme, faut-il lire les instructions dans l’ordre ?",
    format: "qcm",
    choices: makeChoices("Oui, de haut en bas : changer l’ordre peut changer le résultat.", [
      "Non, l’ordre ne change jamais le résultat.",
      "Oui, mais de bas en haut, en partant de la fin.",
      "Non, l’ordinateur choisit l’instruction la plus facile d’abord.",
    ]),
    expected: ["Oui, de haut en bas : changer l’ordre peut changer le résultat."],
    comparator: "mcq_exact",
    hint: "Un programme se lit comme une recette : étape après étape.",
    explanation: exp(
      "Un programme est une suite d’instructions ordonnées.",
      "On commence par la première instruction, puis on continue dans l’ordre.",
      "Si on change l’ordre, le résultat peut changer.",
      "Oui, il faut lire les instructions dans l’ordre."
    ),
    tags: ["cm2", "algorithmique", "instruction", "ordre", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_algo_instruction_fixed_3_compter_actions",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_instruction",
    difficulty: 2,
    theme: "neutral",
    text: "Combien d’instructions d’action sont exécutées après le départ ?",
    format: "qcm",
    choices: ["1", "2", "3", "4"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Ne compte pas le bloc de départ comme une action.",
    explanation: exp(
      "Une instruction d’action demande au personnage de faire quelque chose.",
      "On compte les blocs placés après le départ.",
      "Après le départ, il y a : avancer, tourner, dire Bonjour. Cela fait 3 actions.",
      "Il y a donc 3 instructions d’action."
    ),
    tags: ["cm2", "algorithmique", "instruction", "scratch", "canvas", "qcm"],
    canvas: scratchCanvas("Programme simple", [
      { type: "event" },
      { type: "move", value: 10 },
      { type: "turn", value: 90, text: "tourner d’un quart de tour" },
      { type: "say", text: "Bonjour !" },
    ]),
  },

  /* ============================================================
     ALGO_LOGIQUE
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_algo_logique_fixed_1_suite_blocs",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_logique",
    difficulty: 1,
    theme: "neutral",
    text: "Dans la suite : avancer, tourner, avancer, tourner, que vient ensuite ?",
    format: "qcm",
    choices: ["avancer", "tourner", "dire Bonjour", "répéter"],
    expected: ["avancer"],
    comparator: "mcq_exact",
    hint: "La suite alterne avancer et tourner.",
    explanation: exp(
      "Une suite logique suit une règle.",
      "On cherche ce qui se répète.",
      "La règle est : avancer, tourner, avancer, tourner. Après tourner, on retrouve avancer.",
      "La réponse est avancer."
    ),
    tags: ["cm2", "algorithmique", "logique", "suite", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_algo_logique_fixed_2_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_logique",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “Dans une suite logique, on n’a pas besoin de chercher la règle.” A-t-il raison ?",
    format: "qcm",
    choices: makeChoices("Non : c’est la règle qui permet de prévoir la suite.", [
      "Oui : il suffit de recopier le dernier élément.",
      "Oui : on peut choisir l’élément suivant au hasard.",
      "Non : il faut seulement compter les éléments.",
    ]),
    expected: ["Non : c’est la règle qui permet de prévoir la suite."],
    comparator: "mcq_exact",
    hint: "La règle permet de prévoir la suite.",
    explanation: exp(
      "Une suite logique fonctionne grâce à une règle.",
      "On cherche le motif ou l’opération qui se répète.",
      "Sans la règle, on ne peut pas prévoir correctement la suite.",
      "L’élève a tort."
    ),
    tags: ["cm2", "algorithmique", "logique", "erreur", "qcm"],
  },

  /* ============================================================
     ALGO_DEPLACEMENT
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_algo_deplacement_fixed_1_avancer",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_deplacement",
    difficulty: 1,
    theme: "neutral",
    text: "Dans Scratch, le bloc “avancer de 10” signifie que le personnage...",
    format: "qcm",
    choices: [
      "se déplace tout droit",
      "tourne à droite",
      "parle",
      "s’arrête",
    ],
    expected: ["se déplace tout droit"],
    comparator: "mcq_exact",
    hint: "Avancer signifie se déplacer.",
    explanation: exp(
      "Un déplacement change la position du personnage.",
      "On repère les blocs qui font bouger le personnage.",
      "Le bloc “avancer de 10” fait avancer le personnage tout droit.",
      "Le personnage se déplace tout droit."
    ),
    tags: ["cm2", "algorithmique", "deplacement", "scratch", "qcm", "canvas"],
    canvas: scratchCanvas("Avancer", [
      { type: "event" },
      { type: "move", value: 10 },
    ]),
  },

  {
    kind: "fixed",
    id: "cm2_algo_deplacement_fixed_2_tourner",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_deplacement",
    difficulty: 1,
    theme: "neutral",
    text: "Dans Scratch, le bloc “tourner d’un quart de tour” sert à...",
    format: "qcm",
    choices: [
      "changer de direction",
      "avancer de 4 pas",
      "répéter 4 fois",
      "écrire 4",
    ],
    expected: ["changer de direction"],
    comparator: "mcq_exact",
    hint: "Un quart de tour, c’est un angle droit.",
    explanation: exp(
      "Tourner signifie changer de direction.",
      "On distingue une distance et un angle.",
      "Le bloc “tourner d’un quart de tour” change l’orientation du personnage.",
      "Ce bloc sert à changer de direction."
    ),
    tags: ["cm2", "algorithmique", "deplacement", "angle", "qcm", "canvas"],
    canvas: scratchCanvas("Tourner", [
      { type: "event" },
      { type: "turn", value: 90, text: "tourner d’un quart de tour" },
    ]),
  },

  {
    kind: "fixed",
    id: "cm2_algo_deplacement_fixed_3_piege_tourner",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_deplacement",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “tourner d’un quart de tour fait avancer d’un pas.” A-t-il raison ?",
    format: "qcm",
    choices: makeChoices("Non : tourner change la direction, sans déplacer le personnage.", [
      "Oui : chaque quart de tour fait avancer d’un pas.",
      "Oui : tourner fait toujours avancer de 90 pas.",
      "Non : tourner fait reculer d’un pas.",
    ]),
    expected: ["Non : tourner change la direction, sans déplacer le personnage."],
    comparator: "mcq_exact",
    hint: "Tourner change la direction, avancer change la position.",
    explanation: exp(
      "Avancer et tourner sont deux actions différentes.",
      "On regarde si le bloc contient une distance ou un angle.",
      "Tourner d’un quart de tour change la direction, mais ne fait pas avancer.",
      "L’élève a tort."
    ),
    tags: ["cm2", "algorithmique", "deplacement", "erreur", "angle", "qcm"],
  },

  /* ============================================================
     ALGO_PROGRAMME
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_algo_programme_fixed_1_lire",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_programme",
    difficulty: 2,
    theme: "neutral",
    text: "Dans ce programme, que fait le personnage après avoir avancé de 20 pas ?",
    format: "qcm",
    choices: ["il tourne d’un quart de tour", "il dit Bonjour", "il répète 4 fois", "il s’arrête"],
    expected: ["il tourne d’un quart de tour"],
    comparator: "mcq_exact",
    hint: "Lis les blocs de haut en bas.",
    explanation: exp(
      "Lire un programme, c’est prévoir les actions dans l’ordre.",
      "On suit les blocs de haut en bas.",
      "Après “avancer de 20”, le bloc suivant est “tourner d’un quart de tour”.",
      "Le personnage tourne d’un quart de tour."
    ),
    tags: ["cm2", "algorithmique", "programme", "lire", "scratch", "canvas", "qcm"],
    canvas: scratchCanvas("Lire un programme", [
      { type: "event" },
      { type: "move", value: 20 },
      { type: "turn", value: 90, text: "tourner d’un quart de tour" },
      { type: "say", text: "Bonjour" },
    ]),
  },

  {
    kind: "fixed",
    id: "cm2_algo_programme_fixed_2_erreur_lecture",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_programme",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève lit le programme de bas en haut. Est-ce une bonne méthode ?",
    format: "qcm",
    choices: makeChoices("Non : on lit de haut en bas, sinon les actions sont dans le mauvais ordre.", [
      "Oui : le dernier bloc est toujours le plus important.",
      "Oui : de haut en bas ou de bas en haut, c’est pareil.",
      "Non : il faut lire les blocs au hasard.",
    ]),
    expected: ["Non : on lit de haut en bas, sinon les actions sont dans le mauvais ordre."],
    comparator: "mcq_exact",
    hint: "Un programme se lit normalement de haut en bas.",
    explanation: exp(
      "Un programme est une suite ordonnée d’instructions.",
      "On lit les blocs de haut en bas.",
      "Lire de bas en haut peut changer l’ordre des actions et donner une mauvaise réponse.",
      "Ce n’est pas une bonne méthode."
    ),
    tags: ["cm2", "algorithmique", "programme", "erreur", "qcm"],
  },

  /* ============================================================
     ALGO_REPETITION
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_algo_repetition_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_repetition",
    difficulty: 1,
    theme: "neutral",
    text: "Dans Scratch, le bloc “répéter 4 fois” sert à...",
    format: "qcm",
    choices: [
      "exécuter plusieurs fois les mêmes instructions",
      "effacer le programme",
      "changer la couleur du personnage",
      "arrêter l’ordinateur",
    ],
    expected: ["exécuter plusieurs fois les mêmes instructions"],
    comparator: "mcq_exact",
    hint: "Répéter signifie refaire.",
    explanation: exp(
      "Une répétition permet d’exécuter plusieurs fois les mêmes instructions.",
      "On repère les blocs placés à l’intérieur de la répétition.",
      "Si un bloc est dans “répéter 4 fois”, il est exécuté 4 fois.",
      "Ce bloc sert à répéter des instructions."
    ),
    tags: ["cm2", "algorithmique", "repetition", "scratch", "qcm", "canvas"],
    canvas: scratchCanvas("Boucle simple", [
      { type: "event" },
      {
        type: "repeat",
        times: 4,
        children: [{ type: "move", value: 10 }],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "cm2_algo_repetition_fixed_2_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_repetition",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “Dans répéter 5 fois, le bloc avancer n’est exécuté qu’une seule fois.” A-t-il raison ?",
    format: "qcm",
    choices: makeChoices("Non : le bloc placé dans la boucle est exécuté 5 fois.", [
      "Oui : la boucle ne fait le bloc qu’une fois.",
      "Non : le bloc est exécuté 6 fois.",
      "Oui : le nombre 5 sert seulement à décorer.",
    ]),
    expected: ["Non : le bloc placé dans la boucle est exécuté 5 fois."],
    comparator: "mcq_exact",
    hint: "Le bloc est dans une répétition.",
    explanation: exp(
      "Une boucle répète les instructions qu’elle contient.",
      "On regarde le nombre écrit dans le bloc “répéter”.",
      "Dans “répéter 5 fois”, le bloc placé dedans est exécuté 5 fois.",
      "L’élève a tort."
    ),
    tags: ["cm2", "algorithmique", "repetition", "erreur", "qcm", "canvas"],
    canvas: scratchCanvas("Attention à la boucle", [
      { type: "event" },
      {
        type: "repeat",
        times: 5,
        children: [{ type: "move", value: 10 }],
      },
    ]),
  },

  /* ============================================================
     ALGO_DEFI
  ============================================================ */

  {
    kind: "fixed",
    id: "cm2_algo_defi_fixed_1_carre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Ce programme permet-il de tracer un carré ?",
    format: "qcm",
    choices: makeChoices("Oui : 4 côtés de 50 et 4 quarts de tour.", [
      "Non : il faudrait répéter 3 fois.",
      "Non : il faudrait tourner d’un demi-tour.",
      "Non : il trace un triangle.",
    ]),
    expected: ["Oui : 4 côtés de 50 et 4 quarts de tour."],
    comparator: "mcq_exact",
    hint: "Un carré a 4 côtés et on tourne d’un quart de tour.",
    explanation: exp(
      "Un carré possède 4 côtés et 4 angles droits.",
      "Pour tracer un carré, on répète 4 fois : avancer puis tourner d’un quart de tour.",
      "Le programme répète bien 4 fois avancer puis tourner d’un quart de tour.",
      "Oui, ce programme permet de tracer un carré."
    ),
    tags: ["cm2", "algorithmique", "defi", "carre", "scratch", "canvas", "qcm"],
    canvas: scratchCanvas("Tracer un carré", [
      { type: "event" },
      { type: "pen", text: "stylo en position d’écriture" },
      {
        type: "repeat",
        times: 4,
        children: [
          { type: "move", value: 50 },
          { type: "turn", value: 90, text: "tourner d’un quart de tour" },
        ],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "cm2_algo_defi_fixed_2_carre_erreur_repetition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève veut tracer un carré, mais il répète seulement 3 fois : avancer puis tourner d’un quart de tour. Son programme est-il correct ?",
    format: "qcm",
    choices: makeChoices("Non : il ne trace que 3 côtés, il faut répéter 4 fois.", [
      "Oui : 3 côtés suffisent pour un carré.",
      "Non : il faut tourner d’un demi-tour.",
      "Oui : il trace un carré plus petit.",
    ]),
    expected: ["Non : il ne trace que 3 côtés, il faut répéter 4 fois."],
    comparator: "mcq_exact",
    hint: "Un carré a 4 côtés.",
    explanation: exp(
      "Un carré possède 4 côtés.",
      "Pour tracer un carré, on doit répéter 4 fois le déplacement et la rotation.",
      "Ici, le programme ne répète que 3 fois, donc il manque un côté.",
      "Le programme n’est pas correct."
    ),
    tags: ["cm2", "algorithmique", "defi", "carre", "erreur", "qcm", "canvas"],
    canvas: scratchCanvas("Carré incomplet", [
      { type: "event" },
      { type: "pen", text: "stylo en position d’écriture" },
      {
        type: "repeat",
        times: 3,
        children: [
          { type: "move", value: 50 },
          { type: "turn", value: 90, text: "tourner d’un quart de tour" },
        ],
      },
    ]),
  },

  /* ============================================================
     GABARITS (15/11/2026) — algorithmique-outils.ts : repris du CM1
     robuste et montés au CM2 (erreur à trouver, boucles imbriquées,
     polygones réguliers, variables, « et » / « ou », si … sinon si).
  ============================================================ */
  ...GAB_INSTRUCTION,
  ...GAB_INSTRUCTION_CM2,
  ...GAB_DEPLACEMENT,
  ...GAB_DEPLACEMENT_CM2,
  ...GAB_PROGRAMME,
  ...GAB_PROGRAMME_CM2,
  ...GAB_REPETITION,
  ...GAB_REPETITION_CM2,
  ...GAB_LOGIQUE,
  ...GAB_LOGIQUE_CM2,
  ...GAB_DEFI,
  ...GAB_DEFI_CM2,
];