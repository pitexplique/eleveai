import type {
  TutorBankItemV4,
  ScratchCanvasData,
} from "@/lib/tutor-v4/types";

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
    choices: ["oui", "non"],
    expected: ["oui"],
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
      { type: "turn", value: 90 },
      { type: "say", text: "Bonjour !" },
    ]),
  },

  {
    kind: "template",
    id: "cm2_algo_instruction_tpl_1_compter_instructions",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_instruction",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les blocs d’action après le bloc de départ.",
    tags: ["cm2", "algorithmique", "instruction", "template", "scratch", "canvas"],
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
        text: "Combien d’instructions d’action sont exécutées après le départ ?",
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "Une instruction d’action demande au personnage de faire quelque chose.",
          "On ne compte pas le bloc de départ. On compte seulement les actions placées après.",
          `Après le départ, il y a ${n} instruction(s) d’action.`,
          `La réponse est ${n}.`
        ),
        canvas: scratchCanvas("Compter les instructions", blocks),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_algo_instruction_tpl_2_premiere_action",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_instruction",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis le premier bloc placé sous le départ.",
    tags: ["cm2", "algorithmique", "instruction", "ordre", "template", "canvas"],
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
          "effacer",
          "changer de costume",
        ]),
        expected: [first.label],
        comparator: "mcq_exact",
        explanation: exp(
          "Un programme se lit dans l’ordre.",
          "On regarde le premier bloc placé sous le bloc de départ.",
          `La première action est : ${first.label}.`,
          `La bonne réponse est ${first.label}.`
        ),
        canvas: scratchCanvas("Première action", [
          { type: "event" },
          first.block,
          { type: "move", value: 20 },
        ]),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_algo_instruction_open_1_expliquer",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_instruction",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi il faut suivre les instructions dans l’ordre.",
    format: "open",
    expected: ["ordre", "instructions", "résultat"],
    comparator: "contains_keyword",
    hint: "Changer l’ordre peut changer ce que fait le programme.",
    explanation: exp(
      "Les instructions d’un programme sont ordonnées.",
      "On les lit de haut en bas.",
      "Si on change l’ordre des instructions, le résultat peut changer.",
      "Il faut donc suivre les instructions dans l’ordre."
    ),
    tags: ["cm2", "algorithmique", "instruction", "open", "raisonnement"],
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
    kind: "template",
    id: "cm2_algo_logique_tpl_1_alternance",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_logique",
    difficulty: 2,
    theme: "neutral",
    hint: "Repère le motif qui se répète.",
    tags: ["cm2", "algorithmique", "logique", "motif", "template"],
    generate: () => {
      const a = randomChoice(["avancer", "tourner"]);
      const b = a === "avancer" ? "tourner" : "avancer";
      const correct = a;

      return {
        text: `Complète la suite logique : ${a}, ${b}, ${a}, ${b}, ...`,
        format: "qcm",
        choices: makeChoices(correct, ["dire Bonjour", "effacer", b]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une suite logique suit une règle régulière.",
          "On observe les éléments qui se répètent.",
          `Ici, le motif est : ${a}, ${b}. Après ${b}, on recommence avec ${a}.`,
          `La réponse est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_algo_logique_tpl_2_nombre_repetitions",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_logique",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte combien de fois le même motif apparaît.",
    tags: ["cm2", "algorithmique", "logique", "repetition", "template", "canvas"],
    generate: () => {
      const times = randomChoice([2, 3, 4]);
      const totalActions = times * 2;

      return {
        text: "Dans ce programme, combien d’actions sont répétées au total dans la boucle ?",
        format: "short",
        expected: [String(totalActions)],
        comparator: "number_equal",
        explanation: exp(
          "Dans une répétition, toutes les actions à l’intérieur sont recommencées.",
          "On compte les actions dans la boucle puis on multiplie par le nombre de répétitions.",
          `Il y a 2 actions dans la boucle, répétées ${times} fois. Donc 2 × ${times} = ${totalActions}.`,
          `Il y a ${totalActions} actions exécutées dans la boucle.`
        ),
        canvas: scratchCanvas("Motif répété", [
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
    id: "cm2_algo_logique_fixed_2_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_logique",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “Dans une suite logique, on n’a pas besoin de chercher la règle.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
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
    text: "Dans Scratch, le bloc “tourner de 90°” sert à...",
    format: "qcm",
    choices: [
      "changer de direction",
      "avancer de 90 pas",
      "répéter 90 fois",
      "écrire 90",
    ],
    expected: ["changer de direction"],
    comparator: "mcq_exact",
    hint: "90° est une mesure d’angle.",
    explanation: exp(
      "Tourner signifie changer de direction.",
      "On distingue une distance et un angle.",
      "Le bloc “tourner de 90°” change l’orientation du personnage.",
      "Ce bloc sert à changer de direction."
    ),
    tags: ["cm2", "algorithmique", "deplacement", "angle", "qcm", "canvas"],
    canvas: scratchCanvas("Tourner", [
      { type: "event" },
      { type: "turn", value: 90 },
    ]),
  },

  {
    kind: "template",
    id: "cm2_algo_deplacement_tpl_1_distance_totale",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_deplacement",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne seulement les blocs “avancer”.",
    tags: ["cm2", "algorithmique", "deplacement", "distance", "template", "canvas"],
    generate: () => {
      const a = randomChoice([10, 20, 30, 40]);
      const b = randomChoice([10, 20, 30]);
      const total = a + b;

      return {
        text: "Quelle distance totale le personnage avance-t-il ?",
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "La distance totale avancée se calcule avec les blocs “avancer”.",
          "On additionne les distances. On ne compte pas les blocs “tourner” comme une distance.",
          `Le personnage avance de ${a}, puis de ${b}. Donc ${a} + ${b} = ${total}.`,
          `Il avance au total de ${total} pas.`
        ),
        canvas: scratchCanvas("Distance totale", [
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
    id: "cm2_algo_deplacement_tpl_2_completer_avancer",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_deplacement",
    difficulty: 2,
    theme: "neutral",
    hint: "Le nombre du bloc avancer donne la distance.",
    tags: ["cm2", "algorithmique", "deplacement", "completer", "template", "canvas"],
    generate: () => {
      const distance = randomChoice([20, 30, 40, 50]);

      return {
        text: `Quel nombre faut-il écrire dans le bloc “avancer de …” pour avancer de ${distance} pas ?`,
        format: "short",
        expected: [String(distance)],
        comparator: "number_equal",
        explanation: exp(
          "Le bloc “avancer” contient la distance à parcourir.",
          "On écrit dans le bloc le nombre de pas demandés.",
          `Pour avancer de ${distance} pas, il faut écrire ${distance}.`,
          `La réponse est ${distance}.`
        ),
        canvas: scratchCanvas("Bloc à compléter", [
          { type: "event" },
          { type: "move", value: "?" },
        ]),
      };
    },
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
    text: "Un élève dit : “tourner de 90° fait avancer de 90 pas.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Tourner change la direction, avancer change la position.",
    explanation: exp(
      "Avancer et tourner sont deux actions différentes.",
      "On regarde si le bloc contient une distance ou un angle.",
      "Tourner de 90° change la direction, mais ne fait pas avancer de 90 pas.",
      "L’élève a tort."
    ),
    tags: ["cm2", "algorithmique", "deplacement", "erreur", "angle", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_algo_deplacement_open_1_difference",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_deplacement",
    difficulty: 4,
    theme: "neutral",
    text: "Explique la différence entre “avancer” et “tourner”.",
    format: "open",
    expected: ["avancer", "déplace", "tourner", "direction"],
    comparator: "contains_keyword",
    hint: "L’un change la position, l’autre change la direction.",
    explanation: exp(
      "Avancer change la position ; tourner change la direction.",
      "On distingue les blocs de déplacement et les blocs de rotation.",
      "Avancer fait bouger le personnage. Tourner le fait changer d’orientation.",
      "Ce sont deux instructions différentes."
    ),
    tags: ["cm2", "algorithmique", "deplacement", "open", "raisonnement"],
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
    choices: ["il tourne de 90°", "il dit Bonjour", "il répète 4 fois", "il s’arrête"],
    expected: ["il tourne de 90°"],
    comparator: "mcq_exact",
    hint: "Lis les blocs de haut en bas.",
    explanation: exp(
      "Lire un programme, c’est prévoir les actions dans l’ordre.",
      "On suit les blocs de haut en bas.",
      "Après “avancer de 20”, le bloc suivant est “tourner de 90°”.",
      "Le personnage tourne de 90°."
    ),
    tags: ["cm2", "algorithmique", "programme", "lire", "scratch", "canvas", "qcm"],
    canvas: scratchCanvas("Lire un programme", [
      { type: "event" },
      { type: "move", value: 20 },
      { type: "turn", value: 90 },
      { type: "say", text: "Bonjour" },
    ]),
  },

  {
    kind: "template",
    id: "cm2_algo_programme_tpl_1_distance_totale",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_programme",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les distances avancées.",
    tags: ["cm2", "algorithmique", "programme", "distance", "template", "canvas"],
    generate: () => {
      const a = randomChoice([10, 20, 30]);
      const b = randomChoice([10, 20, 30]);
      const c = randomChoice([10, 20]);
      const total = a + b + c;

      return {
        text: "Quelle distance totale le personnage avance-t-il dans ce programme ?",
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Lire un programme permet de prévoir le résultat obtenu.",
          "On additionne tous les blocs “avancer”.",
          `Le personnage avance de ${a}, puis de ${b}, puis de ${c}. Donc ${a} + ${b} + ${c} = ${total}.`,
          `Il avance au total de ${total} pas.`
        ),
        canvas: scratchCanvas("Distance du programme", [
          { type: "event" },
          { type: "move", value: a },
          { type: "turn", value: 90 },
          { type: "move", value: b },
          { type: "say", text: "Encore !" },
          { type: "move", value: c },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_algo_programme_tpl_2_choisir_bloc",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_programme",
    difficulty: 3,
    theme: "neutral",
    hint: "Choisis le bloc qui correspond à l’action demandée.",
    tags: ["cm2", "algorithmique", "programme", "completer", "template", "qcm"],
    generate: () => {
      const action = randomChoice([
        {
          text: "faire avancer le personnage",
          correct: "avancer de 20",
          wrongs: ["tourner de 20°", "dire 20", "répéter 20 fois"],
        },
        {
          text: "faire changer de direction le personnage",
          correct: "tourner de 90°",
          wrongs: ["avancer de 90", "dire 90", "effacer tout"],
        },
      ]);

      return {
        text: `Quel bloc faut-il utiliser pour ${action.text} ?`,
        format: "qcm",
        choices: makeChoices(action.correct, action.wrongs),
        expected: [action.correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Chaque bloc correspond à une action précise.",
          "On associe l’action demandée au bon bloc.",
          `Pour ${action.text}, on choisit : ${action.correct}.`,
          `La bonne réponse est ${action.correct}.`
        ),
      };
    },
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
    choices: ["non", "oui"],
    expected: ["non"],
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

  {
    kind: "fixed",
    id: "cm2_algo_programme_open_1_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_programme",
    difficulty: 4,
    theme: "neutral",
    text: "Explique une méthode pour lire correctement un programme Scratch.",
    format: "open",
    expected: ["haut", "bas", "ordre", "instructions"],
    comparator: "contains_keyword",
    hint: "Pense à l’ordre des blocs.",
    explanation: exp(
      "Lire un programme consiste à prévoir les actions exécutées.",
      "On commence au bloc de départ, puis on lit les blocs de haut en bas.",
      "On note chaque action dans l’ordre.",
      "Pour lire correctement un programme, il faut respecter l’ordre des instructions."
    ),
    tags: ["cm2", "algorithmique", "programme", "open", "methode"],
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
    kind: "template",
    id: "cm2_algo_repetition_tpl_1_distance",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_repetition",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie le nombre de répétitions par la distance avancée à chaque fois.",
    tags: ["cm2", "algorithmique", "repetition", "distance", "template", "canvas"],
    generate: () => {
      const times = randomChoice([2, 3, 4, 5]);
      const pas = randomChoice([10, 20, 30]);
      const total = times * pas;

      return {
        text: "Quelle distance totale le personnage avance-t-il ?",
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Une boucle répète les instructions placées à l’intérieur.",
          "On multiplie le nombre de répétitions par la distance avancée à chaque fois.",
          `${times} répétitions de ${pas} pas donnent ${times} × ${pas} = ${total} pas.`,
          `Le personnage avance au total de ${total} pas.`
        ),
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
  id: "cm2_algo_repetition_tpl_2_completer",
  niveau: "cm2",
  matiere: "maths",
  notionId: "algorithmique",
  microId: "algo_repetition",
  difficulty: 3,
  theme: "neutral",
  hint: "Cherche combien de fois on répète le même déplacement.",
  tags: ["cm2", "algorithmique", "repetition", "completer", "template", "canvas"],
  generate: () => {
    const pas = randomChoice([10, 20, 25]);
    const times = randomChoice([3, 4, 5, 6]);
    const total = pas * times;

    return {
      text:
        `On veut avancer au total de ${total} pas en avançant de ${pas} pas à chaque répétition. ` +
        `Combien de fois faut-il répéter ?`,
      format: "short",
      expected: [String(times)],
      comparator: "number_equal",
      explanation: exp(
        "Une répétition permet de refaire plusieurs fois la même action.",
        "On divise la distance totale par la distance effectuée à chaque répétition.",
        `${total} ÷ ${pas} = ${times}.`,
        `Il faut répéter ${times} fois.`
      ),
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
    choices: ["non", "oui"],
    expected: ["non"],
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

  {
    kind: "fixed",
    id: "cm2_algo_repetition_open_1_expliquer",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_repetition",
    difficulty: 4,
    theme: "neutral",
    text: "Explique à quoi sert une boucle “répéter”.",
    format: "open",
    expected: ["répéter", "plusieurs", "instructions"],
    comparator: "contains_keyword",
    hint: "Une boucle évite de réécrire plusieurs fois les mêmes blocs.",
    explanation: exp(
      "Une boucle “répéter” sert à exécuter plusieurs fois les mêmes instructions.",
      "On place dans la boucle les blocs à refaire.",
      "Le programme répète ces blocs le nombre de fois indiqué.",
      "Une boucle rend le programme plus court et plus clair."
    ),
    tags: ["cm2", "algorithmique", "repetition", "open", "raisonnement"],
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
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Un carré a 4 côtés et on tourne de 90°.",
    explanation: exp(
      "Un carré possède 4 côtés et 4 angles droits.",
      "Pour tracer un carré, on répète 4 fois : avancer puis tourner de 90°.",
      "Le programme répète bien 4 fois avancer puis tourner de 90°.",
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
          { type: "turn", value: 90 },
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
    text: "Un élève veut tracer un carré, mais il répète seulement 3 fois : avancer puis tourner de 90°. Son programme est-il correct ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
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
          { type: "turn", value: 90 },
        ],
      },
    ]),
  },

  {
    kind: "template",
    id: "cm2_algo_defi_tpl_1_distance_reunion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Le margouillat répète plusieurs déplacements identiques.",
    tags: ["cm2", "algorithmique", "defi", "reunion", "margouillat", "template", "canvas"],
    generate: () => {
      const times = randomChoice([4, 5, 6]);
      const pas = randomChoice([10, 15, 20]);
      const total = times * pas;

      return {
        text:
          `Un margouillat avance de ${pas} pas à chaque répétition. ` +
          `Le programme répète ce déplacement ${times} fois. Quelle distance totale parcourt-il ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Une répétition exécute plusieurs fois la même instruction.",
          "On multiplie le nombre de répétitions par la distance parcourue à chaque répétition.",
          `${times} × ${pas} = ${total}.`,
          `Le margouillat parcourt ${total} pas.`
        ),
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
    kind: "template",
    id: "cm2_algo_defi_tpl_2_perimetre_carre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le périmètre d’un carré vaut 4 × côté.",
    tags: ["cm2", "algorithmique", "defi", "carre", "perimetre", "template", "canvas"],
    generate: () => {
      const cote = randomChoice([20, 30, 40, 50]);
      const perimetre = 4 * cote;

      return {
        text: "Ce programme trace un carré. Quelle distance totale le personnage parcourt-il ?",
        format: "short",
        expected: [String(perimetre)],
        comparator: "number_equal",
        explanation: exp(
          "La distance totale parcourue correspond ici au périmètre du carré.",
          "On multiplie la longueur d’un côté par 4.",
          `Le côté mesure ${cote} pas. Donc 4 × ${cote} = ${perimetre}.`,
          `Le personnage parcourt ${perimetre} pas.`
        ),
        canvas: scratchCanvas("Carré et distance totale", [
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
    kind: "fixed",
    id: "cm2_algo_defi_open_1_corriger",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment corriger un programme qui veut tracer un carré mais qui utilise “répéter 3 fois”.",
    format: "open",
    expected: ["répéter", "4", "carré", "côtés"],
    comparator: "contains_keyword",
    hint: "Un carré a 4 côtés.",
    explanation: exp(
      "Un carré possède 4 côtés.",
      "On vérifie que la boucle correspond au nombre de côtés.",
      "Si le programme répète seulement 3 fois, il manque un côté.",
      "Il faut remplacer “répéter 3 fois” par “répéter 4 fois”."
    ),
    tags: ["cm2", "algorithmique", "defi", "open", "correction", "carre"],
  },
];