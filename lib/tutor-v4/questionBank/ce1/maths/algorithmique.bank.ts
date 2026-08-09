// lib/tutor-v4/questionBank/ce1/maths/algorithmique.bank.ts
//
// Les instructions et les déplacements codés du CE1, écrits à la main.
//
// PÉRIMÈTRE BO (Annexe 4, programme de mathématiques du cycle 2) : « comprendre,
// utiliser et produire une suite d'instructions qui codent un déplacement en
// utilisant un vocabulaire spatial précis ». Le texte donne le vocabulaire du
// robot sur son tapis quadrillé : « avancer de deux cases », « pivoter d'un
// quart de tour à droite », « pivoter d'un quart de tour à gauche ». Au CE1,
// les déplacements à programmer comportent au maximum QUINZE instructions,
// dont quatre virages — au CP, c'était dix instructions et deux virages.
//
// LE PIÈGE DE LA NOTION : « pivoter » ne fait pas avancer. Un quart de tour
// change la direction, pas la position. L'élève qui compte les instructions
// croit avoir avancé de cinq cases alors qu'il n'en a fait que trois.
//
// Second piège, celui de la répétition : répéter trois fois « avancer de 2 »
// fait avancer de 6 cases, pas de 5 ni de 3.
//
// ⚠️ On privilégie les GÉNÉRATEURS : un programme dont on change les nombres
// pose une question neuve à chaque tirage.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CE1 clique, il ne tape pas.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

export const algorithmiqueBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_ALGO_INSTRUCTION — suivre un programme
     LE piège : « pivoter » ne fait pas avancer.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_algo_instruction_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce1_algo_instruction",
    difficulty: 4,
    theme: "neutral",
    text: "Un robot reçoit ce programme : avancer de 2 cases, pivoter d'un quart de tour à droite, avancer de 1 case. De combien de cases s'est-il déplacé en tout ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Pivoter change la direction, pas la position.",
    explanation: exp(
      "Dans un programme de déplacement, seules les instructions « avancer » font changer de case.",
      "On additionne uniquement les cases parcourues, sans compter les virages.",
      "Le robot avance de 2, puis pivote sur place — il ne bouge pas de case —, puis avance de 1 : 2 + 1 = 3 cases.",
      "Il s'est déplacé de 3 cases.",
    ),
    tags: ["ce1", "algorithmique", "instruction", "piege"],
  },
  {
    kind: "template",
    id: "ce1_algo_instruction_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce1_algo_instruction",
    difficulty: 4,
    theme: "neutral",
    hint: "Ne compte que les « avancer ».",
    tags: ["ce1", "algorithmique", "instruction", "piege", "template"],
    generate: () => {
      const a = randomInt(1, 5);
      const b = randomInt(1, 5);
      const c = randomInt(1, 4);
      const total = a + b + c;
      const virages = randomInt(1, 3);
      return {
        text: `Un robot reçoit ce programme : avancer de ${a}, pivoter d'un quart de tour, avancer de ${b}, pivoter d'un quart de tour, avancer de ${c}. De combien de cases s'est-il déplacé en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Seules les instructions « avancer » déplacent le robot d'une case à l'autre.",
          "On additionne les cases des instructions « avancer », et on ignore les pivots.",
          `${a} + ${b} + ${c} = ${total}. Les ${virages > 1 ? "deux pivots" : "pivots"} changent la direction, pas la position.`,
          `Il s'est déplacé de ${total} cases.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_algo_instruction_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce1_algo_instruction",
    difficulty: 3,
    theme: "neutral",
    hint: "Suis les instructions dans l'ordre, une par une.",
    tags: ["ce1", "algorithmique", "instruction", "template"],
    generate: () => {
      const depart = randomInt(1, 3);
      const avance = randomInt(2, 5);
      const recule = randomInt(1, avance);
      const arrivee = depart + avance - recule;
      return {
        text: `Un robot est sur la case ${depart}. Il reçoit : avancer de ${avance} cases, puis reculer de ${recule} case${recule > 1 ? "s" : ""}. Sur quelle case arrive-t-il ?`,
        format: "short",
        expected: [String(arrivee)],
        comparator: "number_equal",
        explanation: exp(
          "Un programme s'exécute dans l'ordre : une instruction après l'autre.",
          "On part de la case de départ et on applique chaque instruction à la suite.",
          `${depart} + ${avance} = ${depart + avance}, puis ${depart + avance} - ${recule} = ${arrivee}.`,
          `Il arrive sur la case ${arrivee}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ALGO_DEPLACEMENT — écrire le programme
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_algo_deplacement_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce1_algo_deplacement",
    difficulty: 3,
    theme: "neutral",
    text: "Pour qu'un autre élève retrouve le même chemin, que doit contenir le programme qu'on lui écrit ?",
    format: "qcm",
    choices: [
      "les instructions dans l'ordre exact du déplacement",
      "seulement le point d'arrivée",
      "le nombre de cases, sans les virages",
      "une description de la salle",
    ],
    expected: ["les instructions dans l'ordre exact du déplacement"],
    comparator: "mcq_exact",
    hint: "Le robot ne devine rien : il exécute ce qui est écrit, dans l'ordre écrit.",
    explanation: exp(
      "Coder un déplacement, c'est écrire toutes les instructions, dans l'ordre où il faut les faire.",
      "On suit le chemin en écrivant chaque avancée et chaque virage au moment où ils arrivent.",
      "Si une instruction manque ou si l'ordre change, le chemin n'est plus le même. Le point d'arrivée seul ne dit pas par où passer.",
      "Il doit contenir les instructions dans l'ordre exact du déplacement.",
    ),
    tags: ["ce1", "algorithmique", "deplacement", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_algo_deplacement_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce1_algo_deplacement",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte les avancées et les virages séparément.",
    tags: ["ce1", "algorithmique", "deplacement", "template"],
    generate: () => {
      const avancees = randomInt(2, 5);
      const virages = randomInt(1, 4);
      const total = avancees + virages;
      const quoi = randomChoice(["instructions en tout", "virages", "instructions « avancer »"] as const);
      const bonne = quoi === "instructions en tout" ? total : quoi === "virages" ? virages : avancees;
      return {
        text: `Un programme contient ${avancees} instructions « avancer » et ${virages} instruction${virages > 1 ? "s" : ""} « pivoter ». Combien y a-t-il de ${quoi} ?`,
        format: "short",
        expected: [String(bonne)],
        comparator: "number_equal",
        explanation: exp(
          "Un programme de déplacement mélange deux sortes d'instructions : avancer, et pivoter.",
          "On compte séparément chaque sorte, puis on répond à ce qui est demandé.",
          `Il y a ${avancees} « avancer » et ${virages} « pivoter », soit ${total} instructions en tout. Au CE1, un programme peut aller jusqu'à quinze instructions, dont quatre virages.`,
          `Il y en a ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ALGO_REPETITION — répéter un bloc
     LE piège : répéter 3 fois « avancer de 2 » fait 6, pas 5.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_algo_repetition_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce1_algo_repetition",
    difficulty: 4,
    theme: "neutral",
    text: "Un robot répète 3 fois l'instruction « avancer de 2 cases ». De combien de cases avance-t-il en tout ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Trois fois deux cases, l'une après l'autre.",
    explanation: exp(
      "Répéter une instruction, c'est la refaire entièrement à chaque tour.",
      "On additionne autant de fois que le programme le demande.",
      "2 + 2 + 2 = 6, ou 3 × 2 = 6. Le robot avance de 6 cases, pas de 5 : le premier « avancer de 2 » compte lui aussi.",
      "Il avance de 6 cases.",
    ),
    tags: ["ce1", "algorithmique", "repetition", "piege"],
  },
  {
    kind: "template",
    id: "ce1_algo_repetition_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce1_algo_repetition",
    difficulty: 4,
    theme: "neutral",
    hint: "Multiplie ce qui est répété par le nombre de tours.",
    tags: ["ce1", "algorithmique", "repetition", "template"],
    generate: () => {
      const fois = randomInt(2, 6);
      const cases = randomInt(2, 5);
      const total = fois * cases;
      return {
        text: `Un robot répète ${fois} fois l'instruction « avancer de ${cases} cases ». De combien de cases avance-t-il en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Répéter une instruction, c'est la refaire en entier à chaque tour.",
          "On multiplie ce qui est répété par le nombre de tours.",
          `${fois} × ${cases} = ${total}. Chaque tour ajoute ${cases} cases, et il y a ${fois} tours.`,
          `Il avance de ${total} cases.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_algo_repetition_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce1_algo_repetition",
    difficulty: 5,
    theme: "neutral",
    hint: "Une répétition remplace plusieurs instructions écrites à la suite.",
    tags: ["ce1", "algorithmique", "repetition", "template"],
    generate: () => {
      const fois = randomInt(3, 6);
      const cases = randomInt(1, 4);
      return {
        text: `Un programme écrit « avancer de ${cases} » ${fois} fois de suite. Combien d'instructions économise-t-on en écrivant « répéter ${fois} fois : avancer de ${cases} » ?`,
        format: "short",
        expected: [String(fois - 1)],
        comparator: "number_equal",
        explanation: exp(
          "Une répétition sert à écrire une seule fois ce qu'on veut faire plusieurs fois.",
          "On compare le nombre de lignes des deux écritures.",
          `Sans répétition, il faut ${fois} lignes. Avec la répétition, il n'en reste qu'une : on en économise ${fois} - 1 = ${fois - 1}.`,
          `On économise ${fois - 1} instructions.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ALGO_DEFI — les défis
  ========================================================= */
  {
    kind: "template",
    id: "ce1_algo_defi_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce1_algo_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Quatre quarts de tour font un tour complet.",
    tags: ["ce1", "algorithmique", "defi", "template"],
    generate: () => {
      const quarts = randomChoice([2, 3, 4] as const);
      const bonne =
        quarts === 4
          ? "il regarde de nouveau dans la même direction qu'au départ"
          : quarts === 2
            ? "il regarde dans la direction opposée"
            : "il regarde vers la gauche du départ";
      return {
        text: `Un robot pivote ${quarts} fois d'un quart de tour vers la droite, sans avancer. Où regarde-t-il à la fin ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          "il regarde de nouveau dans la même direction qu'au départ",
          "il regarde dans la direction opposée",
          "il regarde vers la gauche du départ",
          "il a avancé de plusieurs cases",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un quart de tour change la direction du robot, mais pas sa case.",
          "On tourne pas à pas : quatre quarts de tour font un tour complet.",
          quarts === 4
            ? "Après quatre quarts de tour, le robot a fait un tour entier : il regarde exactement là où il regardait au départ."
            : quarts === 2
              ? "Deux quarts de tour font un demi-tour : le robot regarde dans la direction opposée."
              : "Trois quarts de tour vers la droite, c'est la même chose qu'un quart de tour vers la gauche.",
          `${bonne.charAt(0).toUpperCase()}${bonne.slice(1)}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_algo_defi_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce1_algo_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Fais le tour du carré en comptant les côtés.",
    tags: ["ce1", "algorithmique", "defi", "template"],
    generate: () => {
      const cote = randomInt(2, 5);
      const total = cote * 4;
      const quoi = randomChoice(["cases", "virages"] as const);
      const bonne = quoi === "cases" ? total : 4;
      return {
        text: `Un robot fait le tour complet d'un carré de ${cote} cases de côté, en revenant à son point de départ. Combien de ${quoi} au total ?`,
        format: "short",
        expected: [String(bonne)],
        comparator: "number_equal",
        explanation: exp(
          "Faire le tour d'un carré, c'est parcourir ses quatre côtés et tourner à chaque coin.",
          "On compte séparément les cases parcourues et les virages.",
          `Le carré a 4 côtés de ${cote} cases : ${cote} × 4 = ${total} cases. Et il y a 4 coins, donc 4 virages.`,
          `Il y en a ${bonne}.`,
        ),
      };
    },
  },
];
