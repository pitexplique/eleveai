// lib/tutor-v4/question-banks/maths/6e/algorithmique.bank.ts

import type { TutorBankItemV4, ScratchCanvasData } from "@/lib/tutor-v4/types";

/* =========================
   HELPERS
========================= */

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: string[]) {
  return shuffle([correct, ...wrongs]).slice(0, 4);
}

function scratchCanvas(title: string, blocks: ScratchCanvasData["blocks"]): ScratchCanvasData {
  return {
    kind: "scratch",
    title,
    blocks,
  };
}

export const algorithmiqueBank: TutorBankItemV4[] = [
  /* =========================
     ALGO_SEQUENCE
  ========================= */

  {
    kind: "fixed",
    id: "6e_algo_sequence_fixed_1_definition",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 1,
    theme: "neutral",
    text: "En algorithmique, une suite d’instructions sert à...",
    format: "qcm",
    choices: [
      "donner des actions dans un ordre précis",
      "faire un calcul au hasard",
      "dessiner sans règle",
      "choisir toujours la réponse la plus longue",
    ],
    expected: ["donner des actions dans un ordre précis"],
    comparator: "mcq_exact",
    hint: "Un programme suit des étapes.",
    explanation:
      "Définition : un algorithme est une suite d’instructions à exécuter dans un ordre précis.\n\n" +
      "Méthode : on lit les instructions de haut en bas.\n\n" +
      "Exécution : chaque instruction est réalisée après la précédente.\n\n" +
      "Conclusion : une suite d’instructions sert à organiser des actions dans un ordre précis.",
    tags: ["algo_programmation", "sequence", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "6e_algo_sequence_fixed_2_ordre",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un programme, l’ordre des instructions est-il important ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Changer l’ordre peut changer le résultat.",
    explanation:
      "Définition : un programme est une suite ordonnée d’instructions.\n\n" +
      "Méthode : on exécute les blocs dans l’ordre où ils apparaissent.\n\n" +
      "Exécution : si on tourne avant d’avancer, le déplacement final peut changer.\n\n" +
      "Conclusion : oui, l’ordre des instructions est important.",
    tags: ["algo_programmation", "sequence", "ordre", "qcm"],
  },

  {
    kind: "fixed",
    id: "6e_algo_sequence_fixed_3_lire_programme_simple",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 2,
    theme: "neutral",
    text: "Combien d’instructions sont exécutées après le drapeau vert ?",
    format: "qcm",
    choices: ["1", "2", "3", "4"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Ne compte pas seulement le drapeau vert.",
    explanation:
      "Définition : une instruction est une action que le programme exécute.\n\n" +
      "Méthode : on compte les blocs d’action après l’événement de départ.\n\n" +
      "Exécution : le programme avance, tourne, puis dit bonjour : cela fait 3 instructions.\n\n" +
      "Conclusion : 3 instructions sont exécutées.",
    tags: ["algo_programmation", "scratch", "sequence", "canvas", "qcm"],
    canvas: scratchCanvas("Programme Scratch", [
      { type: "event" },
      { type: "move", value: 10 },
      { type: "turn", value: 90 },
      { type: "say", text: "Bonjour !" },
    ]),
  },

  {
    kind: "template",
    id: "6e_algo_sequence_tpl_1_compter_instructions",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les blocs d’action après le départ.",
    tags: ["algo_programmation", "sequence", "scratch", "template", "canvas"],
    generate: () => {
      const n = randomChoice([2, 3, 4]);
      const blocks = [
        { type: "event" as const },
        { type: "move" as const, value: 10 },
        { type: "turn" as const, value: 90 },
        { type: "say" as const, text: "Coucou !" },
        { type: "move" as const, value: 20 },
      ].slice(0, n + 1);

      return {
        text: "Combien d’instructions d’action sont exécutées dans ce programme ?",
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation:
          "Définition : une instruction d’action est un bloc qui demande au lutin de faire quelque chose.\n\n" +
          "Méthode : on ne compte pas le bloc événement comme une action.\n\n" +
          `Exécution : après le drapeau vert, il y a ${n} instruction(s) d’action.\n\n` +
          `Conclusion : la réponse est ${n}.`,
        canvas: scratchCanvas("Programme Scratch", blocks),
      };
    },
  },

  {
    kind: "template",
    id: "6e_algo_sequence_tpl_2_premiere_action",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis le premier bloc placé sous le drapeau vert.",
    tags: ["algo_programmation", "sequence", "ordre", "template", "canvas"],
    generate: () => {
      const first = randomChoice([
        { label: "avancer", block: { type: "move" as const, value: 10 } },
        { label: "tourner", block: { type: "turn" as const, value: 90 } },
        { label: "dire Bonjour", block: { type: "say" as const, text: "Bonjour" } },
      ]);

      return {
        text: "Quelle est la première action exécutée par le programme ?",
        format: "qcm",
        choices: makeChoices(first.label, [
          "répéter",
          "demander une réponse",
          "mettre une variable à 0",
        ]),
        expected: [first.label],
        comparator: "mcq_exact",
        explanation:
          "Définition : un programme se lit de haut en bas.\n\n" +
          "Méthode : on regarde le premier bloc placé sous le bloc de départ.\n\n" +
          `Exécution : la première action est : ${first.label}.\n\n` +
          `Conclusion : la bonne réponse est ${first.label}.`,
        canvas: scratchCanvas("Programme Scratch", [
          { type: "event" },
          first.block,
          { type: "move", value: 20 },
        ]),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_algo_sequence_open_1_expliquer_ordre",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi l’ordre des instructions est important dans un programme.",
    format: "open",
    expected: ["ordre", "instructions", "résultat"],
    comparator: "contains_keyword",
    hint: "Changer l’ordre peut changer ce que fait le programme.",
    explanation:
      "Définition : un programme est une suite d’instructions ordonnées.\n\n" +
      "Méthode : on exécute les blocs dans l’ordre où ils sont écrits.\n\n" +
      "Exécution : si on inverse deux actions, le résultat peut être différent.\n\n" +
      "Conclusion : l’ordre est important car il peut changer le résultat du programme.",
    tags: ["algo_programmation", "sequence", "open", "raisonnement"],
  },

  {
    kind: "fixed",
    id: "6e_algo_sequence_fixed_4_erreur_ordre",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “Dans Scratch, on peut lire les blocs dans n’importe quel ordre.” A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Les blocs s’exécutent dans l’ordre.",
    explanation:
      "Définition : dans un programme Scratch, les blocs sont exécutés dans un ordre précis.\n\n" +
      "Méthode : on lit la pile de blocs de haut en bas.\n\n" +
      "Exécution : changer l’ordre des blocs peut changer le déplacement ou le dessin.\n\n" +
      "Conclusion : l’élève a tort.",
    tags: ["algo_programmation", "sequence", "erreur", "qcm"],
  },
    /* =========================
     ALGO_DEPLACEMENT
  ========================= */

  {
    kind: "fixed",
    id: "6e_algo_deplacement_fixed_1_avancer",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_deplacement",
    difficulty: 1,
    theme: "neutral",
    text: "Dans Scratch, le bloc “avancer de 10” signifie que le lutin...",
    format: "qcm",
    choices: [
      "se déplace tout droit",
      "tourne à droite",
      "change de couleur",
      "efface le programme",
    ],
    expected: ["se déplace tout droit"],
    comparator: "mcq_exact",
    hint: "Avancer correspond à un déplacement.",
    explanation:
      "Définition : un déplacement permet au lutin de changer de position.\n\n" +
      "Méthode : on distingue les blocs qui déplacent et les blocs qui tournent.\n\n" +
      "Exécution : “avancer de 10” fait avancer le lutin tout droit.\n\n" +
      "Conclusion : le lutin se déplace tout droit.",
    tags: ["algo_programmation", "deplacement", "scratch", "qcm"],
    canvas: scratchCanvas("Déplacement Scratch", [
      { type: "event" },
      { type: "move", value: 10 },
    ]),
  },

  {
    kind: "fixed",
    id: "6e_algo_deplacement_fixed_2_tourner",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_deplacement",
    difficulty: 1,
    theme: "neutral",
    text: "Dans Scratch, le bloc “tourner de 90°” sert à...",
    format: "qcm",
    choices: [
      "changer de direction",
      "avancer de 90 pas",
      "répéter 90 fois",
      "écrire le nombre 90",
    ],
    expected: ["changer de direction"],
    comparator: "mcq_exact",
    hint: "90° est une mesure d’angle.",
    explanation:
      "Définition : tourner signifie changer de direction.\n\n" +
      "Méthode : on repère si le bloc contient un angle.\n\n" +
      "Exécution : tourner de 90° change l’orientation du lutin.\n\n" +
      "Conclusion : ce bloc sert à changer de direction.",
    tags: ["algo_programmation", "deplacement", "angle", "scratch", "qcm"],
    canvas: scratchCanvas("Tourner dans Scratch", [
      { type: "event" },
      { type: "turn", value: 90 },
    ]),
  },

  {
    kind: "template",
    id: "6e_algo_deplacement_tpl_1_distance_totale",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_deplacement",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne uniquement les blocs “avancer”.",
    tags: ["algo_programmation", "deplacement", "distance", "template", "canvas"],
    generate: () => {
      const a = randomChoice([10, 20, 30, 40]);
      const b = randomChoice([10, 20, 30]);
      const total = a + b;

      return {
        text: "Quelle distance totale le lutin avance-t-il ?",
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "Définition : la distance totale avancée se calcule en additionnant les blocs “avancer”.\n\n" +
          "Méthode : on ne compte pas les blocs “tourner” comme une distance.\n\n" +
          `Exécution : le lutin avance de ${a}, puis de ${b}. Donc ${a} + ${b} = ${total}.\n\n` +
          `Conclusion : le lutin avance au total de ${total} pas.`,
        canvas: scratchCanvas("Déplacement Scratch", [
          { type: "event" },
          { type: "move", value: a },
          { type: "turn", value: 90 },
          { type: "move", value: b },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "6e_algo_deplacement_tpl_2_angle_total",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_deplacement",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne les angles des blocs “tourner”.",
    tags: ["algo_programmation", "deplacement", "angle", "template", "canvas"],
    generate: () => {
      const a = randomChoice([45, 60, 90]);
      const b = randomChoice([45, 90]);
      const total = a + b;

      return {
        text: "De combien de degrés le lutin tourne-t-il au total ?",
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "Définition : un bloc “tourner” modifie la direction du lutin.\n\n" +
          "Méthode : on additionne les angles de rotation.\n\n" +
          `Exécution : le lutin tourne de ${a}°, puis de ${b}°. Donc ${a} + ${b} = ${total}.\n\n` +
          `Conclusion : le lutin tourne au total de ${total}°.`,
        canvas: scratchCanvas("Rotations Scratch", [
          { type: "event" },
          { type: "turn", value: a },
          { type: "move", value: 20 },
          { type: "turn", value: b },
        ]),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_algo_deplacement_fixed_3_piege_avancer_tourner",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_deplacement",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “tourner de 90° fait avancer le lutin de 90 pas.” A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Tourner change la direction, avancer change la position.",
    explanation:
      "Définition : avancer et tourner sont deux actions différentes.\n\n" +
      "Méthode : on identifie si le bloc modifie la position ou l’orientation.\n\n" +
      "Exécution : tourner de 90° change seulement la direction du lutin.\n\n" +
      "Conclusion : l’élève a tort.",
    tags: ["algo_programmation", "deplacement", "erreur", "angle", "qcm"],
  },

  {
    kind: "template",
    id: "6e_algo_deplacement_tpl_3_completer_bloc",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_deplacement",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour parcourir une distance, on utilise un bloc avancer.",
    tags: ["algo_programmation", "deplacement", "completer", "template", "canvas"],
    generate: () => {
      const distance = randomChoice([20, 30, 40, 50]);

      return {
        text: `Quel nombre doit-on mettre dans le bloc “avancer de …” pour avancer de ${distance} pas ?`,
        format: "short",
        expected: [String(distance)],
        comparator: "number_equal",
        explanation:
          "Définition : le nombre dans le bloc “avancer” indique la distance parcourue.\n\n" +
          "Méthode : on place la distance demandée dans le bloc.\n\n" +
          `Exécution : pour avancer de ${distance} pas, on écrit “avancer de ${distance}”.\n\n` +
          `Conclusion : il faut écrire ${distance}.`,
        canvas: scratchCanvas("Bloc à compléter", [
          { type: "event" },
          { type: "move", value: "?" },
        ]),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_algo_deplacement_open_1_expliquer_difference",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_deplacement",
    difficulty: 4,
    theme: "neutral",
    text: "Explique la différence entre “avancer” et “tourner” dans un programme Scratch.",
    format: "open",
    expected: ["avancer", "déplace", "tourner", "direction"],
    comparator: "contains_keyword",
    hint: "L’un change la position, l’autre change la direction.",
    explanation:
      "Définition : avancer modifie la position du lutin, tourner modifie son orientation.\n\n" +
      "Méthode : on regarde si le bloc parle d’une distance ou d’un angle.\n\n" +
      "Exécution : avancer fait bouger le lutin ; tourner le fait changer de direction.\n\n" +
      "Conclusion : ce sont deux instructions différentes.",
    tags: ["algo_programmation", "deplacement", "open", "raisonnement"],
  },
    /* =========================
     ALGO_REPETITION
  ========================= */

  {
    kind: "fixed",
    id: "6e_algo_repetition_fixed_1_definition",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_repetition",
    difficulty: 1,
    theme: "neutral",
    text: "Dans Scratch, le bloc “répéter 4 fois” sert à...",
    format: "qcm",
    choices: [
      "exécuter plusieurs fois les mêmes instructions",
      "effacer les instructions",
      "changer la couleur du lutin",
      "arrêter le programme",
    ],
    expected: ["exécuter plusieurs fois les mêmes instructions"],
    comparator: "mcq_exact",
    hint: "Répéter signifie refaire.",
    explanation:
      "Définition : une répétition permet d’exécuter plusieurs fois les mêmes instructions.\n\n" +
      "Méthode : on repère les blocs placés à l’intérieur de la répétition.\n\n" +
      "Exécution : si un bloc est dans “répéter 4 fois”, il est exécuté 4 fois.\n\n" +
      "Conclusion : ce bloc sert à répéter des instructions.",
    tags: ["algo_programmation", "repetition", "scratch", "qcm"],
    canvas: scratchCanvas("Boucle Scratch", [
      { type: "event" },
      {
        type: "repeat",
        times: 4,
        children: [{ type: "move", value: 10 }],
      },
    ]),
  },

  {
    kind: "template",
    id: "6e_algo_repetition_tpl_1_distance",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_repetition",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie le nombre de répétitions par la distance avancée.",
    tags: ["algo_programmation", "repetition", "distance", "template", "canvas"],
    generate: () => {
      const times = randomChoice([2, 3, 4, 5, 6]);
      const pas = randomChoice([10, 20, 30]);
      const total = times * pas;

      return {
        text: "Quelle distance totale le lutin avance-t-il ?",
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "Définition : une boucle répète les instructions placées à l’intérieur.\n\n" +
          "Méthode : on multiplie le nombre de répétitions par la distance avancée à chaque fois.\n\n" +
          `Exécution : ${times} répétitions de ${pas} pas donnent ${times} × ${pas} = ${total} pas.\n\n` +
          `Conclusion : le lutin avance au total de ${total} pas.`,
        canvas: scratchCanvas("Boucle de déplacement", [
          { type: "event" },
          {
            type: "repeat",
            times,
            children: [{ type: "move", value: pas }],
          },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "6e_algo_repetition_tpl_2_nombre_actions",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_repetition",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque instruction dans la boucle est répétée le même nombre de fois.",
    tags: ["algo_programmation", "repetition", "actions", "template", "canvas"],
    generate: () => {
      const times = randomChoice([2, 3, 4]);
      const actionsParTour = 2;
      const total = times * actionsParTour;

      return {
        text: "Combien d’actions sont exécutées au total dans la boucle ?",
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "Définition : dans une répétition, toutes les instructions à l’intérieur sont répétées.\n\n" +
          "Méthode : on compte les actions dans la boucle, puis on multiplie par le nombre de répétitions.\n\n" +
          `Exécution : il y a ${actionsParTour} actions répétées ${times} fois, donc ${actionsParTour} × ${times} = ${total}.\n\n` +
          `Conclusion : ${total} actions sont exécutées.`,
        canvas: scratchCanvas("Compter les actions", [
          { type: "event" },
          {
            type: "repeat",
            times,
            children: [
              { type: "move", value: 10 },
              { type: "turn", value: 90 },
            ],
          },
        ]),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_algo_repetition_fixed_2_piege_une_fois",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_repetition",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “Dans répéter 5 fois, le bloc avancer n’est exécuté qu’une seule fois.” A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le bloc est dans une répétition.",
    explanation:
      "Définition : une boucle répète les instructions qu’elle contient.\n\n" +
      "Méthode : on regarde le nombre écrit dans le bloc “répéter”.\n\n" +
      "Exécution : dans “répéter 5 fois”, le bloc placé dedans est exécuté 5 fois.\n\n" +
      "Conclusion : l’élève a tort.",
    tags: ["algo_programmation", "repetition", "erreur", "qcm"],
    canvas: scratchCanvas("Piège de boucle", [
      { type: "event" },
      {
        type: "repeat",
        times: 5,
        children: [{ type: "move", value: 10 }],
      },
    ]),
  },

{
  kind: "template",
  id: "6e_algo_repetition_tpl_3_completer_repetition",
  niveau: "6e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_repetition",
  difficulty: 3,
  theme: "neutral",
  hint: "Cherche combien de fois il faut répéter le même déplacement.",
  tags: [
    "algo_programmation",
    "repetition",
    "completer",
    "template",
    "canvas",
  ],
  generate: () => {
    const pas = randomChoice([10, 20, 25]);
    const times = randomChoice([3, 4, 5, 6]);
    const total = pas * times;

    return {
      text:
        `On veut avancer au total de ${total} pas ` +
        `en avançant de ${pas} pas à chaque répétition.\n` +
        `Combien de fois faut-il répéter ?`,
      format: "short",
      expected: [String(times)],
      comparator: "number_equal",
      explanation:
        "Définition : une répétition permet de refaire plusieurs fois la même action.\n\n" +
        "Méthode : on divise la distance totale par la distance effectuée à chaque répétition.\n\n" +
        `Exécution : ${total} ÷ ${pas} = ${times}.\n\n` +
        `Conclusion : il faut répéter ${times} fois.`,
      canvas: scratchCanvas("Répétition à compléter", [
        { type: "event" },
        {
          type: "repeat",
          times,
          children: [{ type: "move", value: pas }],
        },
      ]),
    };
  },
},

  {
    kind: "template",
    id: "6e_algo_repetition_tpl_4_angle_total",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_repetition",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie le nombre de répétitions par l’angle tourné à chaque fois.",
    tags: ["algo_programmation", "repetition", "angle", "template", "canvas"],
    generate: () => {
      const times = randomChoice([3, 4, 5, 6]);
      const angle = randomChoice([30, 45, 60, 90]);
      const total = times * angle;

      return {
        text: "De combien de degrés le lutin tourne-t-il au total dans la boucle ?",
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "Définition : une boucle répète toutes les instructions placées à l’intérieur.\n\n" +
          "Méthode : on multiplie le nombre de répétitions par l’angle tourné à chaque répétition.\n\n" +
          `Exécution : ${times} × ${angle}° = ${total}°.\n\n` +
          `Conclusion : le lutin tourne au total de ${total}°.`,
        canvas: scratchCanvas("Répétition avec rotation", [
          { type: "event" },
          {
            type: "repeat",
            times,
            children: [
              { type: "move", value: 20 },
              { type: "turn", value: angle },
            ],
          },
        ]),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_algo_repetition_open_1_expliquer",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_repetition",
    difficulty: 4,
    theme: "neutral",
    text: "Explique à quoi sert une boucle “répéter” dans un programme Scratch.",
    format: "open",
    expected: ["répéter", "plusieurs", "instructions"],
    comparator: "contains_keyword",
    hint: "Une boucle évite de réécrire plusieurs fois les mêmes blocs.",
    explanation:
      "Définition : une boucle “répéter” sert à exécuter plusieurs fois les mêmes instructions.\n\n" +
      "Méthode : on place à l’intérieur de la boucle les blocs à refaire.\n\n" +
      "Exécution : le programme répète ces blocs le nombre de fois indiqué.\n\n" +
      "Conclusion : une boucle rend le programme plus court et plus clair.",
    tags: ["algo_programmation", "repetition", "open", "raisonnement"],
  },
    /* =========================
     ALGO_LIRE_PROGRAMME
  ========================= */

  {
    kind: "fixed",
    id: "6e_algo_lire_programme_fixed_1_ordre_execution",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_lire_programme",
    difficulty: 2,
    theme: "neutral",
    text: "Dans ce programme, que fait le lutin juste après avoir avancé de 20 pas ?",
    format: "qcm",
    choices: ["il tourne de 90°", "il dit bonjour", "il répète 4 fois", "il s’arrête"],
    expected: ["il tourne de 90°"],
    comparator: "mcq_exact",
    hint: "Lis les blocs de haut en bas.",
    explanation:
      "Définition : lire un programme, c’est prévoir les actions dans l’ordre.\n\n" +
      "Méthode : on suit les blocs de haut en bas.\n\n" +
      "Exécution : après “avancer de 20”, le bloc suivant est “tourner de 90°”.\n\n" +
      "Conclusion : le lutin tourne de 90°.",
    tags: ["algo_programmation", "lire_programme", "scratch", "canvas", "qcm"],
    canvas: scratchCanvas("Lire un programme", [
      { type: "event" },
      { type: "move", value: 20 },
      { type: "turn", value: 90 },
      { type: "say", text: "Bonjour" },
    ]),
  },

  {
    kind: "template",
    id: "6e_algo_lire_programme_tpl_1_distance_totale",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_lire_programme",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne les blocs avancer, en tenant compte de la boucle.",
    tags: ["algo_programmation", "lire_programme", "distance", "boucle", "template", "canvas"],
    generate: () => {
      const debut = randomChoice([10, 20, 30]);
      const times = randomChoice([2, 3, 4]);
      const pas = randomChoice([10, 20]);
      const total = debut + times * pas;

      return {
        text: "Quelle distance totale le lutin avance-t-il dans ce programme ?",
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "Définition : lire un programme permet de prévoir le résultat obtenu.\n\n" +
          "Méthode : on additionne les déplacements, sans oublier les répétitions.\n\n" +
          `Exécution : le lutin avance d’abord de ${debut}, puis ${times} fois de ${pas}. Donc ${debut} + ${times} × ${pas} = ${total}.\n\n` +
          `Conclusion : il avance au total de ${total} pas.`,
        canvas: scratchCanvas("Distance totale", [
          { type: "event" },
          { type: "move", value: debut },
          {
            type: "repeat",
            times,
            children: [{ type: "move", value: pas }],
          },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "6e_algo_lire_programme_tpl_2_nombre_blocs_executés",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_lire_programme",
    difficulty: 3,
    theme: "neutral",
    hint: "Les blocs dans la boucle comptent plusieurs fois.",
    tags: ["algo_programmation", "lire_programme", "repetition", "template", "canvas"],
    generate: () => {
      const times = randomChoice([2, 3, 4, 5]);
      const total = 1 + times * 2 + 1;

      return {
        text: "Combien d’actions sont exécutées au total après le drapeau vert ?",
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "Définition : une action exécutée est un bloc réalisé par le programme.\n\n" +
          "Méthode : on compte les actions hors boucle et les actions répétées.\n\n" +
          `Exécution : 1 action avant la boucle, puis 2 actions répétées ${times} fois, puis 1 action après. Donc 1 + 2 × ${times} + 1 = ${total}.\n\n` +
          `Conclusion : ${total} actions sont exécutées.`,
        canvas: scratchCanvas("Compter les actions exécutées", [
          { type: "event" },
          { type: "move", value: 10 },
          {
            type: "repeat",
            times,
            children: [
              { type: "move", value: 20 },
              { type: "turn", value: 90 },
            ],
          },
          { type: "say", text: "Fini !" },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "6e_algo_lire_programme_tpl_3_qcm_resultat",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_lire_programme",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d’abord la distance dans la boucle.",
    tags: ["algo_programmation", "lire_programme", "qcm", "template", "canvas"],
    generate: () => {
      const times = randomChoice([3, 4, 5]);
      const pas = randomChoice([10, 20]);
      const total = times * pas;

      return {
        text: "Choisis la distance totale parcourue par le lutin.",
        format: "qcm",
        choices: shuffle([
          `${total} pas`,
          `${pas} pas`,
          `${times + pas} pas`,
          `${total + 10} pas`,
        ]),
        expected: [`${total} pas`],
        comparator: "mcq_exact",
        explanation:
          "Définition : lire un programme, c’est prévoir ce que fait le lutin.\n\n" +
          "Méthode : dans une boucle, on multiplie l’action par le nombre de répétitions.\n\n" +
          `Exécution : avancer de ${pas} pas est répété ${times} fois, donc ${times} × ${pas} = ${total}.\n\n` +
          `Conclusion : la distance totale est ${total} pas.`,
        canvas: scratchCanvas("Prévoir le résultat", [
          { type: "event" },
          {
            type: "repeat",
            times,
            children: [{ type: "move", value: pas }],
          },
        ]),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_algo_lire_programme_fixed_2_piege_boucle",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_lire_programme",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève répond que ce programme fait avancer le lutin de 10 pas au total. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le bloc avancer est dans une boucle.",
    explanation:
      "Définition : une boucle répète les instructions placées à l’intérieur.\n\n" +
      "Méthode : on multiplie la distance par le nombre de répétitions.\n\n" +
      "Exécution : avancer de 10 est répété 4 fois, donc 4 × 10 = 40.\n\n" +
      "Conclusion : l’élève a tort, le lutin avance de 40 pas.",
    tags: ["algo_programmation", "lire_programme", "erreur", "boucle", "qcm"],
    canvas: scratchCanvas("Attention à la boucle", [
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
    id: "6e_algo_lire_programme_open_1_methode",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_lire_programme",
    difficulty: 4,
    theme: "neutral",
    text: "Explique une méthode pour lire correctement un programme Scratch avec une boucle.",
    format: "open",
    expected: ["haut", "bas", "répéter", "boucle"],
    comparator: "contains_keyword",
    hint: "Lis de haut en bas et développe mentalement la répétition.",
    explanation:
      "Définition : lire un programme consiste à prévoir les actions exécutées.\n\n" +
      "Méthode : on lit les blocs de haut en bas, puis on répète mentalement les blocs dans la boucle.\n\n" +
      "Exécution : si une boucle répète 4 fois deux blocs, ces deux blocs sont exécutés 4 fois chacun.\n\n" +
      "Conclusion : il faut tenir compte de l’ordre et des répétitions.",
    tags: ["algo_programmation", "lire_programme", "open", "methode"],
  },
    /* =========================
     ALGO_FIGURES
  ========================= */

  {
    kind: "fixed",
    id: "6e_algo_figure_fixed_1_carre",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_figure",
    difficulty: 2,
    theme: "neutral",
    text: "Ce programme permet de tracer quelle figure ?",
    format: "qcm",
    choices: ["un carré", "un triangle", "un cercle", "une droite"],
    expected: ["un carré"],
    comparator: "mcq_exact",
    hint: "On répète 4 fois : avancer puis tourner de 90°.",
    explanation:
      "Définition : un carré possède 4 côtés et 4 angles droits.\n\n" +
      "Méthode : on observe le nombre de répétitions et l’angle de rotation.\n\n" +
      "Exécution : le lutin avance puis tourne de 90°, et cela est répété 4 fois.\n\n" +
      "Conclusion : le programme trace un carré.",
    tags: ["algo_programmation", "figures", "carre", "scratch", "canvas"],
    canvas: scratchCanvas("Tracer un carré", [
      { type: "event" },
      { type: "pen", text: "stylo en position d’écriture" },
      {
        type: "repeat",
        times: 4,
        children: [
          { type: "move", value: 50 },
          { type: "turn", value: 90 },
        ],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "6e_algo_figure_fixed_2_rectangle",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_figure",
    difficulty: 2,
    theme: "neutral",
    text: "Ce programme alterne avancer de 80 puis avancer de 40, avec des rotations de 90°. Quelle figure peut-il tracer ?",
    format: "qcm",
    choices: ["un rectangle", "un triangle équilatéral", "un cercle", "un segment"],
    expected: ["un rectangle"],
    comparator: "mcq_exact",
    hint: "Un rectangle a 4 angles droits et des côtés opposés de même longueur.",
    explanation:
      "Définition : un rectangle possède 4 angles droits et deux longueurs différentes possibles.\n\n" +
      "Méthode : on lit les déplacements et les rotations.\n\n" +
      "Exécution : le programme alterne deux longueurs et tourne toujours de 90°.\n\n" +
      "Conclusion : il peut tracer un rectangle.",
    tags: ["algo_programmation", "figures", "rectangle", "scratch", "canvas"],
    canvas: scratchCanvas("Tracer un rectangle", [
      { type: "event" },
      { type: "pen", text: "stylo en position d’écriture" },
      { type: "move", value: 80 },
      { type: "turn", value: 90 },
      { type: "move", value: 40 },
      { type: "turn", value: 90 },
      { type: "move", value: 80 },
      { type: "turn", value: 90 },
      { type: "move", value: 40 },
      { type: "turn", value: 90 },
    ]),
  },

  {
    kind: "template",
    id: "6e_algo_figure_tpl_1_carre_cote",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_figure",
    difficulty: 3,
    theme: "neutral",
    hint: "Dans un carré, les 4 côtés ont la même longueur.",
    tags: ["algo_programmation", "figures", "carre", "template", "canvas"],
    generate: () => {
      const cote = randomChoice([20, 30, 40, 50, 60]);

      return {
        text: "Quelle est la longueur d’un côté du carré tracé par ce programme ?",
        format: "short",
        expected: [String(cote)],
        comparator: "number_equal",
        explanation:
          "Définition : un carré a 4 côtés de même longueur.\n\n" +
          "Méthode : on regarde la distance dans le bloc “avancer”.\n\n" +
          `Exécution : à chaque côté, le lutin avance de ${cote} pas.\n\n` +
          `Conclusion : un côté du carré mesure ${cote} pas.`,
        canvas: scratchCanvas("Carré Scratch", [
          { type: "event" },
          { type: "pen", text: "stylo en position d’écriture" },
          {
            type: "repeat",
            times: 4,
            children: [
              { type: "move", value: cote },
              { type: "turn", value: 90 },
            ],
          },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "6e_algo_figure_tpl_2_perimetre_carre",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_figure",
    difficulty: 3,
    theme: "neutral",
    hint: "Le périmètre d’un carré vaut 4 × côté.",
    tags: ["algo_programmation", "figures", "carre", "perimetre", "template", "canvas"],
    generate: () => {
      const cote = randomChoice([10, 20, 25, 30, 40]);
      const perimetre = 4 * cote;

      return {
        text: "Ce programme trace un carré. Quel est le périmètre de ce carré en pas ?",
        format: "short",
        expected: [String(perimetre)],
        comparator: "number_equal",
        explanation:
          "Définition : le périmètre d’un carré est la somme de ses 4 côtés.\n\n" +
          "Méthode : on multiplie la longueur d’un côté par 4.\n\n" +
          `Exécution : le côté mesure ${cote} pas, donc 4 × ${cote} = ${perimetre}.\n\n` +
          `Conclusion : le périmètre du carré est ${perimetre} pas.`,
        canvas: scratchCanvas("Carré et périmètre", [
          { type: "event" },
          { type: "pen", text: "stylo en position d’écriture" },
          {
            type: "repeat",
            times: 4,
            children: [
              { type: "move", value: cote },
              { type: "turn", value: 90 },
            ],
          },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "6e_algo_figure_tpl_3_triangle_equilateral",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_figure",
    difficulty: 4,
    theme: "neutral",
    hint: "Un triangle équilatéral a 3 côtés. Dans ce programme, on répète 3 fois.",
    tags: ["algo_programmation", "figures", "triangle", "template", "canvas"],
    generate: () => {
      const cote = randomChoice([30, 40, 50, 60]);

      return {
        text: "Ce programme répète 3 fois : avancer puis tourner. Quelle figure peut-il tracer ?",
        format: "qcm",
        choices: shuffle(["un triangle équilatéral", "un carré", "un rectangle", "un pentagone"]),
        expected: ["un triangle équilatéral"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un triangle équilatéral possède 3 côtés égaux.\n\n" +
          "Méthode : on observe le nombre de répétitions.\n\n" +
          `Exécution : le programme répète 3 fois un déplacement de ${cote} pas puis une rotation.\n\n` +
          "Conclusion : il peut tracer un triangle équilatéral.",
        canvas: scratchCanvas("Triangle Scratch", [
          { type: "event" },
          { type: "pen", text: "stylo en position d’écriture" },
          {
            type: "repeat",
            times: 3,
            children: [
              { type: "move", value: cote },
              { type: "turn", value: 120 },
            ],
          },
        ]),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_algo_figure_fixed_3_piege_carre_angle",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_figure",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève veut tracer un carré. Il répète 4 fois : avancer de 50 puis tourner de 60°. Son programme est-il correct ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Pour un carré, il faut tourner de 90°.",
    explanation:
      "Définition : un carré possède 4 angles droits.\n\n" +
      "Méthode : pour tracer un carré avec Scratch, on répète 4 côtés et on tourne de 90°.\n\n" +
      "Exécution : tourner de 60° ne correspond pas à l’angle nécessaire pour fermer un carré.\n\n" +
      "Conclusion : le programme n’est pas correct.",
    tags: ["algo_programmation", "figures", "carre", "erreur", "qcm"],
    canvas: scratchCanvas("Erreur de carré", [
      { type: "event" },
      { type: "pen", text: "stylo en position d’écriture" },
      {
        type: "repeat",
        times: 4,
        children: [
          { type: "move", value: 50 },
          { type: "turn", value: 60 },
        ],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "6e_algo_figure_open_1_methode_carre",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_figure",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment programmer le tracé d’un carré dans Scratch.",
    format: "open",
    expected: ["répéter", "4", "avancer", "90"],
    comparator: "contains_keyword",
    hint: "Un carré a 4 côtés et des angles droits.",
    explanation:
      "Définition : un carré possède 4 côtés égaux et 4 angles droits.\n\n" +
      "Méthode : on utilise une boucle pour répéter les mêmes actions.\n\n" +
      "Exécution : on répète 4 fois : avancer, puis tourner de 90°.\n\n" +
      "Conclusion : une bonne méthode est : répéter 4 fois avancer puis tourner de 90°.",
    tags: ["algo_programmation", "figures", "carre", "open", "methode"],
  },
    /* =========================
     ALGO_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "6e_algo_defi_fixed_1_carre_erreur_repetition",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève veut tracer un carré, mais il répète seulement 3 fois : avancer puis tourner de 90°. Son programme est-il correct ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Un carré a 4 côtés.",
    explanation:
      "Définition : un carré possède 4 côtés et 4 angles droits.\n\n" +
      "Méthode : pour tracer un carré, on doit répéter 4 fois le déplacement et la rotation.\n\n" +
      "Exécution : ici, le programme ne répète que 3 fois, donc il trace seulement 3 côtés.\n\n" +
      "Conclusion : le programme n’est pas correct.",
    tags: ["algo_programmation", "defi", "carre", "erreur", "qcm"],
    canvas: scratchCanvas("Défi : carré incomplet", [
      { type: "event" },
      { type: "pen", text: "stylo en position d’écriture" },
      {
        type: "repeat",
        times: 3,
        children: [
          { type: "move", value: 50 },
          { type: "turn", value: 90 },
        ],
      },
    ]),
  },

  {
    kind: "template",
    id: "6e_algo_defi_tpl_1_perimetre_rectangle",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne les 4 déplacements.",
    tags: ["algo_programmation", "defi", "rectangle", "perimetre", "template", "canvas"],
    generate: () => {
      const longueur = randomChoice([60, 80, 100]);
      const largeur = randomChoice([20, 30, 40]);
      const perimetre = 2 * (longueur + largeur);

      return {
        text: "Ce programme trace un rectangle. Quelle distance totale le lutin parcourt-il ?",
        format: "short",
        expected: [String(perimetre)],
        comparator: "number_equal",
        explanation:
          "Définition : la distance totale parcourue correspond ici au périmètre du rectangle.\n\n" +
          "Méthode : on additionne les quatre côtés.\n\n" +
          `Exécution : ${longueur} + ${largeur} + ${longueur} + ${largeur} = ${perimetre}.\n\n` +
          `Conclusion : le lutin parcourt ${perimetre} pas.`,
        canvas: scratchCanvas("Défi rectangle", [
          { type: "event" },
          { type: "pen", text: "stylo en position d’écriture" },
          { type: "move", value: longueur },
          { type: "turn", value: 90 },
          { type: "move", value: largeur },
          { type: "turn", value: 90 },
          { type: "move", value: longueur },
          { type: "turn", value: 90 },
          { type: "move", value: largeur },
          { type: "turn", value: 90 },
        ]),
      };
    },
  },

{
  kind: "template",
  id: "6e_algo_defi_tpl_2_boucle_optimisee",
  niveau: "6e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_defi",
  difficulty: 4,
  theme: "neutral",
  hint: "Cherche le nombre de côtés identiques à tracer.",
  tags: [
    "algo_programmation",
    "defi",
    "boucle",
    "optimisation",
    "template",
    "canvas",
  ],
  generate: () => {
    const cote = randomChoice([30, 40, 50, 60]);

    return {
      text:
        "Pour tracer ce carré, combien de fois faut-il répéter le bloc avancer puis tourner ?",
      format: "short",
      expected: ["4"],
      comparator: "number_equal",
      explanation:
        "Définition : une boucle permet de répéter plusieurs fois les mêmes instructions.\n\n" +
        "Méthode : on utilise le nombre de côtés du carré.\n\n" +
        "Exécution : un carré possède 4 côtés identiques. Il faut donc répéter 4 fois les instructions avancer puis tourner.\n\n" +
        "Conclusion : il faut répéter 4 fois.",
      canvas: scratchCanvas("Carré à optimiser", [
        { type: "event" },
        { type: "pen", text: "stylo en position d’écriture" },
        {
          type: "repeat",
          times: 4,
          children: [
            { type: "move", value: cote },
            { type: "turn", value: 90 },
          ],
        },
      ]),
    };
  },
},

  {
    kind: "template",
    id: "6e_algo_defi_tpl_3_reunion_margouillat",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Le margouillat répète plusieurs déplacements identiques.",
    tags: ["algo_programmation", "defi", "reunion", "margouillat", "template", "canvas"],
    generate: () => {
      const times = randomChoice([4, 5, 6]);
      const pas = randomChoice([10, 15, 20]);
      const total = times * pas;

      return {
        text:
          `Un margouillat avance de ${pas} pas à chaque répétition.\n` +
          `Le programme répète ce déplacement ${times} fois. Quelle distance totale parcourt-il ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "Définition : une répétition exécute plusieurs fois la même instruction.\n\n" +
          "Méthode : on multiplie le nombre de répétitions par la distance à chaque répétition.\n\n" +
          `Exécution : ${times} × ${pas} = ${total}.\n\n` +
          `Conclusion : le margouillat parcourt ${total} pas.`,
        canvas: scratchCanvas("Margouillat Scratch", [
          { type: "event", text: "quand le margouillat démarre" },
          {
            type: "repeat",
            times,
            children: [{ type: "move", value: pas }],
          },
          { type: "say", text: "Nou la fé !" },
        ]),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_algo_defi_fixed_2_triangle_piege_angle",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un programme répète 3 fois : avancer de 50 puis tourner de 90°. Trace-t-il un triangle équilatéral ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Pour un triangle équilatéral avec Scratch, on utilise une rotation de 120°.",
    explanation:
      "Définition : un triangle équilatéral possède 3 côtés égaux.\n\n" +
      "Méthode : pour le tracer avec Scratch, on répète 3 fois et on tourne de 120°.\n\n" +
      "Exécution : ici, la rotation est de 90°, donc ce n’est pas le bon programme.\n\n" +
      "Conclusion : il ne trace pas un triangle équilatéral.",
    tags: ["algo_programmation", "defi", "triangle", "erreur", "angle", "qcm"],
    canvas: scratchCanvas("Défi triangle", [
      { type: "event" },
      { type: "pen", text: "stylo en position d’écriture" },
      {
        type: "repeat",
        times: 3,
        children: [
          { type: "move", value: 50 },
          { type: "turn", value: 90 },
        ],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "6e_algo_defi_open_1_corriger_programme",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 5,
    theme: "neutral",
    text:
      "Explique comment corriger un programme qui veut tracer un carré mais qui utilise “répéter 3 fois”.",
    format: "open",
    expected: ["répéter", "4", "carré", "côtés"],
    comparator: "contains_keyword",
    hint: "Un carré a 4 côtés.",
    explanation:
      "Définition : un carré possède 4 côtés.\n\n" +
      "Méthode : on vérifie que la boucle correspond au nombre de côtés.\n\n" +
      "Exécution : si le programme répète seulement 3 fois, il manque un côté.\n\n" +
      "Conclusion : il faut remplacer “répéter 3 fois” par “répéter 4 fois”.",
    tags: ["algo_programmation", "defi", "open", "correction", "carre"],
  },
];
