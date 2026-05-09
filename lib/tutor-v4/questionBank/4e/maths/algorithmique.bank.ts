// lib/tutor-v4/question-banks/maths/4e/algorithmique.bank.ts

import type { TutorBankItemV4, ScratchBlockData } from "@/lib/tutor-v4/types";

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function scratchCanvas(
  title: string,
  blocks: ScratchBlockData[],
  description?: string
) {
  return {
    kind: "scratch" as const,
    title,
    description,
    blocks,
  };
}

export const algorithmiqueBank: TutorBankItemV4[] = [
  /* =========================
     ALGO_CONDITIONS
  ========================= */

  {
    kind: "fixed",
    id: "4e_algo_conditions_fixed_1_definition",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_conditions",
    difficulty: 1,
    theme: "neutral",
    text: "En algorithmique, une condition sert à...",
    format: "qcm",
    choices: [
      "tester si une affirmation est vraie ou fausse",
      "dessiner automatiquement un carré",
      "effacer toutes les variables",
      "remplacer tous les calculs",
    ],
    expected: ["tester si une affirmation est vraie ou fausse"],
    comparator: "mcq_exact",
    hint: "Une condition répond souvent par vrai ou faux.",
    explanation:
      "Définition : une condition est un test qui peut être vrai ou faux.\n\n" +
      "Méthode : on lit la comparaison puis on vérifie si elle est vraie.\n\n" +
      "Exécution : par exemple, score > 10 est vrai si score est supérieur à 10.\n\n" +
      "Conclusion : une condition sert à tester une affirmation.",
    tags: ["algorithmique", "condition", "definition", "qcm"],
    canvas: scratchCanvas("Condition simple", [
      { type: "event" },
      {
        type: "if",
        condition: "score > 10",
        children: [{ type: "say", text: "Bravo !" }],
      },
    ]),
  },

  {
    kind: "template",
    id: "4e_algo_conditions_tpl_1_comparaison_superieur",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_conditions",
    difficulty: 1,
    theme: "neutral",
    hint: "Compare la valeur de score avec le nombre donné.",
    tags: ["algorithmique", "condition", "comparaison", "template", "canvas"],
    generate: () => {
      const score = randomChoice([8, 10, 12, 15, 18]);
      const seuil = randomChoice([9, 10, 14]);

      const answer = score > seuil ? "oui" : "non";

      return {
        text: `La variable score vaut ${score}. La condition “score > ${seuil}” est-elle vraie ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [answer],
        comparator: "mcq_exact",
        explanation:
          "Définition : une condition peut être vraie ou fausse.\n\n" +
          "Méthode : on compare les deux valeurs.\n\n" +
          `Exécution : ${score} > ${seuil} est ${score > seuil ? "vrai" : "faux"}.\n\n` +
          `Conclusion : la bonne réponse est ${answer}.`,
        canvas: scratchCanvas("Tester score", [
          { type: "event" },
          { type: "set_variable", variable: "score", value: score },
          {
            type: "if",
            condition: `score > ${seuil}`,
            children: [{ type: "say", text: "Réussi" }],
          },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "4e_algo_conditions_tpl_2_comparaison_inferieur",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_conditions",
    difficulty: 2,
    theme: "neutral",
    hint: "Vérifie si la valeur est strictement plus petite que la limite.",
    tags: ["algorithmique", "condition", "inferieur", "template", "canvas"],
    generate: () => {
      const temperature = randomChoice([18, 22, 25, 29, 31]);
      const limite = randomChoice([20, 25, 30]);

      const answer = temperature < limite ? "oui" : "non";

      return {
        text: `La variable température vaut ${temperature}. La condition “température < ${limite}” est-elle vraie ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [answer],
        comparator: "mcq_exact",
        explanation:
          "Définition : une condition peut comparer deux nombres.\n\n" +
          "Méthode : on regarde si la première valeur est plus petite que la seconde.\n\n" +
          `Exécution : ${temperature} < ${limite} est ${temperature < limite ? "vrai" : "faux"}.\n\n` +
          `Conclusion : la bonne réponse est ${answer}.`,
        canvas: scratchCanvas("Condition avec température", [
          { type: "event" },
          { type: "set_variable", variable: "température", value: temperature },
          {
            type: "if",
            condition: `température < ${limite}`,
            children: [{ type: "say", text: "Il fait frais" }],
          },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "4e_algo_conditions_tpl_3_egalite",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_conditions",
    difficulty: 2,
    theme: "neutral",
    hint: "Une égalité est vraie seulement si les deux valeurs sont identiques.",
    tags: ["algorithmique", "condition", "egalite", "template", "canvas"],
    generate: () => {
      const secret = randomChoice([3, 4, 5, 6]);
      const reponse = randomChoice([3, 4, 5, 6]);

      const answer = reponse === secret ? "oui" : "non";

      return {
        text: `Le nombre secret est ${secret}. L’utilisateur répond ${reponse}. La condition “réponse = ${secret}” est-elle vraie ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [answer],
        comparator: "mcq_exact",
        explanation:
          "Définition : une condition d’égalité teste si deux valeurs sont identiques.\n\n" +
          "Méthode : on compare la réponse avec le nombre secret.\n\n" +
          `Exécution : ${reponse} = ${secret} est ${reponse === secret ? "vrai" : "faux"}.\n\n` +
          `Conclusion : la bonne réponse est ${answer}.`,
        canvas: scratchCanvas("Tester une réponse", [
          { type: "event" },
          { type: "ask", text: "Devine le nombre secret" },
          { type: "set_variable", variable: "réponse", value: reponse },
          {
            type: "if",
            condition: `réponse = ${secret}`,
            children: [{ type: "say", text: "Gagné !" }],
          },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "4e_algo_conditions_tpl_4_relatifs",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_conditions",
    difficulty: 3,
    theme: "neutral",
    hint: "Attention aux nombres négatifs.",
    tags: ["algorithmique", "condition", "relatifs", "template", "canvas"],
    generate: () => {
      const x = randomChoice([-5, -2, -1, 0, 3, 6]);
      const seuil = randomChoice([-3, 0, 2]);

      const answer = x > seuil ? "oui" : "non";

      return {
        text: `La variable x vaut ${x}. La condition “x > ${seuil}” est-elle vraie ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [answer],
        comparator: "mcq_exact",
        explanation:
          "Définition : une condition peut aussi comparer des nombres relatifs.\n\n" +
          "Méthode : on place mentalement les nombres sur une droite graduée.\n\n" +
          `Exécution : ${x} > ${seuil} est ${x > seuil ? "vrai" : "faux"}.\n\n` +
          `Conclusion : la bonne réponse est ${answer}.`,
        canvas: scratchCanvas("Condition avec relatifs", [
          { type: "event" },
          { type: "set_variable", variable: "x", value: x },
          {
            type: "if",
            condition: `x > ${seuil}`,
            children: [{ type: "say", text: "Condition vraie" }],
          },
        ]),
      };
    },
  },

  {
    kind: "fixed",
    id: "4e_algo_conditions_fixed_2_piege_strict",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_conditions",
    difficulty: 3,
    theme: "neutral",
    text: "La variable score vaut 10. La condition “score > 10” est-elle vraie ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le symbole > signifie strictement supérieur.",
    explanation:
      "Définition : le symbole > signifie strictement supérieur.\n\n" +
      "Méthode : on vérifie si 10 est plus grand que 10.\n\n" +
      "Exécution : 10 > 10 est faux, car les deux valeurs sont égales.\n\n" +
      "Conclusion : la condition n’est pas vraie.",
    tags: ["algorithmique", "condition", "strict", "piege", "qcm"],
    canvas: scratchCanvas("Piège du strictement supérieur", [
      { type: "event" },
      { type: "set_variable", variable: "score", value: 10 },
      {
        type: "if",
        condition: "score > 10",
        children: [{ type: "say", text: "Bravo" }],
      },
    ]),
  },
    {
    kind: "fixed",
    id: "4e_algo_conditions_fixed_3_piege_egalite",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_conditions",
    difficulty: 3,
    theme: "neutral",
    text: "La variable x vaut 7. La condition “x = 7” est-elle vraie ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Le signe = teste si les deux valeurs sont identiques.",
    explanation:
      "Définition : une condition d’égalité vérifie si deux valeurs sont identiques.\n\n" +
      "Méthode : on compare la valeur de x avec 7.\n\n" +
      "Exécution : x vaut 7, donc x = 7 est vrai.\n\n" +
      "Conclusion : la condition est vraie.",
    tags: ["algorithmique", "condition", "egalite", "qcm"],
    canvas: scratchCanvas("Condition d’égalité", [
      { type: "event" },
      { type: "set_variable", variable: "x", value: 7 },
      {
        type: "if",
        condition: "x = 7",
        children: [{ type: "say", text: "Exact" }],
      },
    ]),
  },

  {
    kind: "template",
    id: "4e_algo_conditions_tpl_5_expression",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_conditions",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule d’abord l’expression, puis teste la condition.",
    tags: ["algorithmique", "condition", "expression", "template", "canvas"],
    generate: () => {
      const x = randomChoice([2, 3, 4, 5]);
      const a = randomChoice([2, 3, 4]);
      const b = randomChoice([5, 8, 10]);
      const seuil = randomChoice([12, 15, 20]);
      const valeur = a * x + b;
      const answer = valeur > seuil ? "oui" : "non";

      return {
        text: `On a x = ${x}. La condition “${a} × x + ${b} > ${seuil}” est-elle vraie ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [answer],
        comparator: "mcq_exact",
        explanation:
          "Définition : une condition peut contenir une expression à calculer.\n\n" +
          "Méthode : on calcule d’abord l’expression, puis on compare.\n\n" +
          `Exécution : ${a} × ${x} + ${b} = ${valeur}. Or ${valeur} > ${seuil} est ${valeur > seuil ? "vrai" : "faux"}.\n\n` +
          `Conclusion : la bonne réponse est ${answer}.`,
        canvas: scratchCanvas("Condition avec expression", [
          { type: "event" },
          { type: "set_variable", variable: "x", value: x },
          {
            type: "if",
            condition: `${a} × x + ${b} > ${seuil}`,
            children: [{ type: "say", text: "Condition vraie" }],
          },
        ]),
      };
    },
  },

  {
    kind: "fixed",
    id: "4e_algo_conditions_open_1_expliquer",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_conditions",
    difficulty: 4,
    theme: "neutral",
    text: "Explique ce qu’est une condition dans un programme.",
    format: "open",
    expected: ["vrai", "faux", "test", "si"],
    comparator: "contains_keyword",
    hint: "Utilise les mots vrai, faux et si.",
    explanation:
      "Définition : une condition est un test logique qui peut être vrai ou faux.\n\n" +
      "Méthode : le programme vérifie la condition avant d’exécuter certains blocs.\n\n" +
      "Exécution : dans “si score > 10”, le programme teste si score est supérieur à 10.\n\n" +
      "Conclusion : une condition permet au programme de prendre une décision.",
    tags: ["algorithmique", "condition", "open", "vocabulaire"],
  },

  /* =========================
     ALGO_INSTRUCTIONS_CONDITIONNELLES
  ========================= */

  {
    kind: "fixed",
    id: "4e_algo_instructions_conditionnelles_fixed_1_definition",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_instructions_conditionnelles",
    difficulty: 2,
    theme: "neutral",
    text: "Un bloc “si ... alors” permet...",
    format: "qcm",
    choices: [
      "d’exécuter des instructions seulement si une condition est vraie",
      "de toujours exécuter toutes les instructions",
      "de supprimer une variable",
      "de répéter un bloc exactement 10 fois",
    ],
    expected: ["d’exécuter des instructions seulement si une condition est vraie"],
    comparator: "mcq_exact",
    hint: "Le mot important est “si”.",
    explanation:
      "Définition : une instruction conditionnelle dépend d’une condition.\n\n" +
      "Méthode : on teste la condition avant d’exécuter les blocs à l’intérieur.\n\n" +
      "Exécution : si la condition est vraie, les blocs sont exécutés ; sinon, ils sont ignorés.\n\n" +
      "Conclusion : un bloc “si” exécute des instructions seulement si la condition est vraie.",
    tags: ["algorithmique", "conditionnelle", "si", "qcm"],
    canvas: scratchCanvas("Instruction conditionnelle", [
      { type: "event" },
      {
        type: "if",
        condition: "score > 10",
        children: [{ type: "say", text: "Bravo !" }],
      },
    ]),
  },

  {
    kind: "template",
    id: "4e_algo_instructions_conditionnelles_tpl_1_si_simple",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_instructions_conditionnelles",
    difficulty: 2,
    theme: "neutral",
    hint: "Le bloc intérieur s’exécute seulement si la condition est vraie.",
    tags: ["algorithmique", "conditionnelle", "si", "template", "canvas"],
    generate: () => {
      const score = randomChoice([6, 9, 11, 15]);
      const seuil = 10;
      const message = score > seuil ? "Bravo !" : "rien";

      return {
        text: `score vaut ${score}. Que dit le lutin ?`,
        format: "qcm",
        choices: shuffle(["Bravo !", "rien"]),
        expected: [message],
        comparator: "mcq_exact",
        explanation:
          "Définition : une instruction conditionnelle exécute un bloc seulement si le test est vrai.\n\n" +
          "Méthode : on vérifie la condition score > 10.\n\n" +
          `Exécution : ${score} > 10 est ${score > seuil ? "vrai" : "faux"}.\n\n` +
          `Conclusion : le lutin dit “${message}”.`,
        canvas: scratchCanvas("Si simple", [
          { type: "event" },
          { type: "set_variable", variable: "score", value: score },
          {
            type: "if",
            condition: "score > 10",
            children: [{ type: "say", text: "Bravo !" }],
          },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "4e_algo_instructions_conditionnelles_tpl_2_si_sinon",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_instructions_conditionnelles",
    difficulty: 3,
    theme: "neutral",
    hint: "Avec si/sinon, une des deux branches est exécutée.",
    tags: ["algorithmique", "conditionnelle", "si_sinon", "template", "canvas"],
    generate: () => {
      const score = randomChoice([7, 8, 10, 12, 16]);
      const seuil = 10;
      const message = score >= seuil ? "Validé" : "À revoir";

      return {
        text: `score vaut ${score}. Quel message est affiché ?`,
        format: "qcm",
        choices: shuffle(["Validé", "À revoir"]),
        expected: [message],
        comparator: "mcq_exact",
        explanation:
          "Définition : un bloc si/sinon choisit entre deux actions.\n\n" +
          "Méthode : on teste la condition, puis on choisit la bonne branche.\n\n" +
          `Exécution : score vaut ${score}. La condition score > 9 est ${score > 9 ? "vraie" : "fausse"}.\n\n` +
          `Conclusion : le message affiché est “${message}”.`,
        canvas: scratchCanvas("Si / sinon", [
          { type: "event" },
          { type: "set_variable", variable: "score", value: score },
          {
            type: "if_else",
            condition: "score > 9",
            children: [{ type: "say", text: "Validé" }],
            elseChildren: [{ type: "say", text: "À revoir" }],
          },
        ]),
      };
    },
  },
    {
    kind: "fixed",
    id: "4e_algo_conditions_fixed_3_piege_egalite",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_conditions",
    difficulty: 3,
    theme: "neutral",
    text: "La variable x vaut 7. La condition “x = 7” est-elle vraie ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Le signe = teste si les deux valeurs sont identiques.",
    explanation:
      "Définition : une condition d’égalité vérifie si deux valeurs sont identiques.\n\n" +
      "Méthode : on compare la valeur de x avec 7.\n\n" +
      "Exécution : x vaut 7, donc x = 7 est vrai.\n\n" +
      "Conclusion : la condition est vraie.",
    tags: ["algorithmique", "condition", "egalite", "qcm"],
    canvas: scratchCanvas("Condition d’égalité", [
      { type: "event" },
      { type: "set_variable", variable: "x", value: 7 },
      {
        type: "if",
        condition: "x = 7",
        children: [{ type: "say", text: "Exact" }],
      },
    ]),
  },

  {
    kind: "template",
    id: "4e_algo_conditions_tpl_5_expression",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_conditions",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule d’abord l’expression, puis teste la condition.",
    tags: ["algorithmique", "condition", "expression", "template", "canvas"],
    generate: () => {
      const x = randomChoice([2, 3, 4, 5]);
      const a = randomChoice([2, 3, 4]);
      const b = randomChoice([5, 8, 10]);
      const seuil = randomChoice([12, 15, 20]);
      const valeur = a * x + b;
      const answer = valeur > seuil ? "oui" : "non";

      return {
        text: `On a x = ${x}. La condition “${a} × x + ${b} > ${seuil}” est-elle vraie ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [answer],
        comparator: "mcq_exact",
        explanation:
          "Définition : une condition peut contenir une expression à calculer.\n\n" +
          "Méthode : on calcule d’abord l’expression, puis on compare.\n\n" +
          `Exécution : ${a} × ${x} + ${b} = ${valeur}. Or ${valeur} > ${seuil} est ${valeur > seuil ? "vrai" : "faux"}.\n\n` +
          `Conclusion : la bonne réponse est ${answer}.`,
        canvas: scratchCanvas("Condition avec expression", [
          { type: "event" },
          { type: "set_variable", variable: "x", value: x },
          {
            type: "if",
            condition: `${a} × x + ${b} > ${seuil}`,
            children: [{ type: "say", text: "Condition vraie" }],
          },
        ]),
      };
    },
  },

  {
    kind: "fixed",
    id: "4e_algo_conditions_open_1_expliquer",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_conditions",
    difficulty: 4,
    theme: "neutral",
    text: "Explique ce qu’est une condition dans un programme.",
    format: "open",
    expected: ["vrai", "faux", "test", "si"],
    comparator: "contains_keyword",
    hint: "Utilise les mots vrai, faux et si.",
    explanation:
      "Définition : une condition est un test logique qui peut être vrai ou faux.\n\n" +
      "Méthode : le programme vérifie la condition avant d’exécuter certains blocs.\n\n" +
      "Exécution : dans “si score > 10”, le programme teste si score est supérieur à 10.\n\n" +
      "Conclusion : une condition permet au programme de prendre une décision.",
    tags: ["algorithmique", "condition", "open", "vocabulaire"],
  },

  /* =========================
     ALGO_INSTRUCTIONS_CONDITIONNELLES
  ========================= */

  {
    kind: "fixed",
    id: "4e_algo_instructions_conditionnelles_fixed_1_definition",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_instructions_conditionnelles",
    difficulty: 2,
    theme: "neutral",
    text: "Un bloc “si ... alors” permet...",
    format: "qcm",
    choices: [
      "d’exécuter des instructions seulement si une condition est vraie",
      "de toujours exécuter toutes les instructions",
      "de supprimer une variable",
      "de répéter un bloc exactement 10 fois",
    ],
    expected: ["d’exécuter des instructions seulement si une condition est vraie"],
    comparator: "mcq_exact",
    hint: "Le mot important est “si”.",
    explanation:
      "Définition : une instruction conditionnelle dépend d’une condition.\n\n" +
      "Méthode : on teste la condition avant d’exécuter les blocs à l’intérieur.\n\n" +
      "Exécution : si la condition est vraie, les blocs sont exécutés ; sinon, ils sont ignorés.\n\n" +
      "Conclusion : un bloc “si” exécute des instructions seulement si la condition est vraie.",
    tags: ["algorithmique", "conditionnelle", "si", "qcm"],
    canvas: scratchCanvas("Instruction conditionnelle", [
      { type: "event" },
      {
        type: "if",
        condition: "score > 10",
        children: [{ type: "say", text: "Bravo !" }],
      },
    ]),
  },

  {
    kind: "template",
    id: "4e_algo_instructions_conditionnelles_tpl_1_si_simple",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_instructions_conditionnelles",
    difficulty: 2,
    theme: "neutral",
    hint: "Le bloc intérieur s’exécute seulement si la condition est vraie.",
    tags: ["algorithmique", "conditionnelle", "si", "template", "canvas"],
    generate: () => {
      const score = randomChoice([6, 9, 11, 15]);
      const seuil = 10;
      const message = score > seuil ? "Bravo !" : "rien";

      return {
        text: `score vaut ${score}. Que dit le lutin ?`,
        format: "qcm",
        choices: shuffle(["Bravo !", "rien"]),
        expected: [message],
        comparator: "mcq_exact",
        explanation:
          "Définition : une instruction conditionnelle exécute un bloc seulement si le test est vrai.\n\n" +
          "Méthode : on vérifie la condition score > 10.\n\n" +
          `Exécution : ${score} > 10 est ${score > seuil ? "vrai" : "faux"}.\n\n` +
          `Conclusion : le lutin dit “${message}”.`,
        canvas: scratchCanvas("Si simple", [
          { type: "event" },
          { type: "set_variable", variable: "score", value: score },
          {
            type: "if",
            condition: "score > 10",
            children: [{ type: "say", text: "Bravo !" }],
          },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "4e_algo_instructions_conditionnelles_tpl_2_si_sinon",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_instructions_conditionnelles",
    difficulty: 3,
    theme: "neutral",
    hint: "Avec si/sinon, une des deux branches est exécutée.",
    tags: ["algorithmique", "conditionnelle", "si_sinon", "template", "canvas"],
    generate: () => {
      const score = randomChoice([7, 8, 10, 12, 16]);
      const seuil = 10;
      const message = score >= seuil ? "Validé" : "À revoir";

      return {
        text: `score vaut ${score}. Quel message est affiché ?`,
        format: "qcm",
        choices: shuffle(["Validé", "À revoir"]),
        expected: [message],
        comparator: "mcq_exact",
        explanation:
          "Définition : un bloc si/sinon choisit entre deux actions.\n\n" +
          "Méthode : on teste la condition, puis on choisit la bonne branche.\n\n" +
          `Exécution : score vaut ${score}. La condition score > 9 est ${score > 9 ? "vraie" : "fausse"}.\n\n` +
          `Conclusion : le message affiché est “${message}”.`,
        canvas: scratchCanvas("Si / sinon", [
          { type: "event" },
          { type: "set_variable", variable: "score", value: score },
          {
            type: "if_else",
            condition: "score > 9",
            children: [{ type: "say", text: "Validé" }],
            elseChildren: [{ type: "say", text: "À revoir" }],
          },
        ]),
      };
    },
  },
    {
    kind: "template",
    id: "4e_algo_instructions_conditionnelles_tpl_3_variable_modifiee",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_instructions_conditionnelles",
    difficulty: 3,
    theme: "neutral",
    hint: "La variable change seulement dans la branche exécutée.",
    tags: ["algorithmique", "conditionnelle", "variable", "template", "canvas"],
    generate: () => {
      const score = randomChoice([6, 8, 11, 14]);
      const bonus = randomChoice([2, 5, 10]);
      const final = score > 10 ? score + bonus : score;

      return {
        text: `score vaut ${score}. Si score > 10, on ajoute ${bonus}. Quelle est la valeur finale de score ?`,
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation:
          "Définition : une instruction conditionnelle peut modifier une variable seulement si la condition est vraie.\n\n" +
          "Méthode : on teste d’abord la condition, puis on applique ou non l’ajout.\n\n" +
          `Exécution : ${score} > 10 est ${score > 10 ? "vrai" : "faux"}. ` +
          `${score > 10 ? `On ajoute ${bonus}.` : "On n’ajoute rien."}\n\n` +
          `Conclusion : la valeur finale de score est ${final}.`,
        canvas: scratchCanvas("Variable modifiée sous condition", [
          { type: "event" },
          { type: "set_variable", variable: "score", value: score },
          {
            type: "if",
            condition: "score > 10",
            children: [
              { type: "change_variable", variable: "score", value: bonus },
            ],
          },
          { type: "say", text: "score" },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "4e_algo_instructions_conditionnelles_tpl_4_si_sinon_variable",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_instructions_conditionnelles",
    difficulty: 4,
    theme: "neutral",
    hint: "Avec si/sinon, une seule branche est exécutée.",
    tags: ["algorithmique", "conditionnelle", "si_sinon", "variable", "template", "canvas"],
    generate: () => {
      const energie = randomChoice([3, 5, 8, 12]);
      const gain = randomChoice([4, 6]);
      const perte = randomChoice([2, 3]);
      const final = energie > 6 ? energie + gain : energie - perte;

      return {
        text:
          `énergie vaut ${energie}. Si énergie > 6, on ajoute ${gain}. Sinon, on enlève ${perte}. ` +
          "Quelle est la valeur finale de énergie ?",
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation:
          "Définition : une instruction si/sinon choisit entre deux branches.\n\n" +
          "Méthode : on vérifie la condition, puis on exécute seulement la bonne branche.\n\n" +
          `Exécution : ${energie} > 6 est ${energie > 6 ? "vrai" : "faux"}. ` +
          `${energie > 6 ? `On ajoute ${gain}.` : `On enlève ${perte}.`}\n\n` +
          `Conclusion : la valeur finale est ${final}.`,
        canvas: scratchCanvas("Si / sinon avec variable", [
          { type: "event" },
          { type: "set_variable", variable: "énergie", value: energie },
          {
            type: "if_else",
            condition: "énergie > 6",
            children: [
              { type: "change_variable", variable: "énergie", value: gain },
            ],
            elseChildren: [
              { type: "change_variable", variable: "énergie", value: -perte },
            ],
          },
          { type: "say", text: "énergie" },
        ]),
      };
    },
  },

  {
    kind: "fixed",
    id: "4e_algo_instructions_conditionnelles_fixed_2_piege_deux_branches",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_instructions_conditionnelles",
    difficulty: 4,
    theme: "neutral",
    text:
      "Dans un bloc si/sinon, les deux branches sont-elles exécutées l’une après l’autre ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le programme choisit une seule branche.",
    explanation:
      "Définition : un bloc si/sinon permet de choisir entre deux actions.\n\n" +
      "Méthode : si la condition est vraie, on exécute la première branche ; sinon, on exécute l’autre.\n\n" +
      "Exécution : les deux branches ne sont pas exécutées ensemble.\n\n" +
      "Conclusion : non, une seule branche est exécutée.",
    tags: ["algorithmique", "conditionnelle", "si_sinon", "piege", "qcm"],
    canvas: scratchCanvas("Une seule branche", [
      { type: "event" },
      {
        type: "if_else",
        condition: "score > 10",
        children: [{ type: "say", text: "Réussi" }],
        elseChildren: [{ type: "say", text: "Essaie encore" }],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "4e_algo_instructions_conditionnelles_open_1_expliquer",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_instructions_conditionnelles",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la différence entre un bloc “si” et un bloc “si/sinon”.",
    format: "open",
    expected: ["condition", "si", "sinon", "branche"],
    comparator: "contains_keyword",
    hint: "Dans si/sinon, il y a une action prévue quand la condition est fausse.",
    explanation:
      "Définition : un bloc “si” exécute une action seulement si la condition est vraie. Un bloc “si/sinon” choisit entre deux actions.\n\n" +
      "Méthode : on regarde ce qui se passe quand la condition est vraie, puis quand elle est fausse.\n\n" +
      "Exécution : avec “si”, il peut ne rien se passer si la condition est fausse. Avec “si/sinon”, une autre branche est exécutée.\n\n" +
      "Conclusion : le bloc si/sinon permet une décision plus complète.",
    tags: ["algorithmique", "conditionnelle", "open", "methode"],
  },

  /* =========================
     ALGO_VARIABLE
  ========================= */

  {
    kind: "fixed",
    id: "4e_algo_variable_fixed_1_definition",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_variable",
    difficulty: 1,
    theme: "neutral",
    text: "En programmation, une variable sert à...",
    format: "qcm",
    choices: [
      "stocker une valeur qui peut changer",
      "dessiner uniquement un cercle",
      "supprimer un programme",
      "remplacer le drapeau vert",
    ],
    expected: ["stocker une valeur qui peut changer"],
    comparator: "mcq_exact",
    hint: "Une variable peut contenir un nombre, un score, une réponse...",
    explanation:
      "Définition : une variable est une mémoire qui stocke une valeur.\n\n" +
      "Méthode : on repère les blocs “mettre à” et “ajouter à”.\n\n" +
      "Exécution : une variable peut être initialisée puis modifiée.\n\n" +
      "Conclusion : une variable sert à stocker une valeur qui peut changer.",
    tags: ["algorithmique", "variable", "definition", "qcm"],
    canvas: scratchCanvas("Variable score", [
      { type: "event" },
      { type: "set_variable", variable: "score", value: 0 },
      { type: "change_variable", variable: "score", value: 1 },
    ]),
  },

  {
    kind: "template",
    id: "4e_algo_variable_tpl_1_initialisation",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_variable",
    difficulty: 2,
    theme: "neutral",
    hint: "Le bloc “mettre score à ...” fixe la valeur de départ.",
    tags: ["algorithmique", "variable", "initialisation", "template", "canvas"],
    generate: () => {
      const valeur = randomChoice([0, 5, 10, 20]);

      return {
        text: `Après le bloc “mettre score à ${valeur}”, combien vaut score ?`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        explanation:
          "Définition : initialiser une variable, c’est lui donner une valeur de départ.\n\n" +
          "Méthode : on lit le bloc “mettre score à ...”.\n\n" +
          `Exécution : le bloc met score à ${valeur}.\n\n` +
          `Conclusion : score vaut ${valeur}.`,
        canvas: scratchCanvas("Initialiser une variable", [
          { type: "event" },
          { type: "set_variable", variable: "score", value: valeur },
        ]),
      };
    },
  },
    {
    kind: "template",
    id: "4e_algo_variable_tpl_2_increment",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_variable",
    difficulty: 2,
    theme: "neutral",
    hint: "Le bloc “ajouter à” modifie la valeur actuelle.",
    tags: ["algorithmique", "variable", "increment", "template", "canvas"],
    generate: () => {
      const depart = randomChoice([0, 2, 5, 10]);
      const ajout = randomChoice([1, 3, 4, 7]);
      const final = depart + ajout;

      return {
        text:
          `score vaut d’abord ${depart}. ` +
          `On exécute ensuite “ajouter ${ajout} à score”. ` +
          "Quelle est la nouvelle valeur de score ?",
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation:
          "Définition : un bloc “ajouter à” modifie la valeur d’une variable.\n\n" +
          "Méthode : on additionne la valeur de départ et l’ajout.\n\n" +
          `Exécution : ${depart} + ${ajout} = ${final}.\n\n` +
          `Conclusion : la nouvelle valeur de score est ${final}.`,
        canvas: scratchCanvas("Modifier une variable", [
          { type: "event" },
          { type: "set_variable", variable: "score", value: depart },
          { type: "change_variable", variable: "score", value: ajout },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "4e_algo_variable_tpl_3_plusieurs_modifications",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_variable",
    difficulty: 3,
    theme: "neutral",
    hint: "La variable change plusieurs fois.",
    tags: ["algorithmique", "variable", "suite", "template", "canvas"],
    generate: () => {
      const depart = randomChoice([1, 3, 5]);
      const ajout1 = randomChoice([2, 4, 6]);
      const ajout2 = randomChoice([1, 5, 8]);

      const final = depart + ajout1 + ajout2;

      return {
        text:
          `score vaut ${depart}. ` +
          `On ajoute ${ajout1}, puis ${ajout2}. ` +
          "Quelle est la valeur finale de score ?",
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation:
          "Définition : une variable peut être modifiée plusieurs fois.\n\n" +
          "Méthode : on suit toutes les modifications dans l’ordre.\n\n" +
          `Exécution : ${depart} + ${ajout1} + ${ajout2} = ${final}.\n\n` +
          `Conclusion : la valeur finale est ${final}.`,
        canvas: scratchCanvas("Plusieurs modifications", [
          { type: "event" },
          { type: "set_variable", variable: "score", value: depart },
          { type: "change_variable", variable: "score", value: ajout1 },
          { type: "change_variable", variable: "score", value: ajout2 },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "4e_algo_variable_tpl_4_variable_negative",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_variable",
    difficulty: 3,
    theme: "neutral",
    hint: "Ajouter un nombre négatif revient à soustraire.",
    tags: ["algorithmique", "variable", "relatifs", "template", "canvas"],
    generate: () => {
      const depart = randomChoice([8, 10, 15]);
      const perte = randomChoice([2, 4, 6]);

      const final = depart - perte;

      return {
        text:
          `énergie vaut ${depart}. ` +
          `On exécute “ajouter ${-perte} à énergie”. ` +
          "Quelle est la valeur finale de énergie ?",
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation:
          "Définition : ajouter un nombre négatif revient à diminuer une valeur.\n\n" +
          "Méthode : on effectue une soustraction.\n\n" +
          `Exécution : ${depart} + (${ -perte }) = ${final}.\n\n` +
          `Conclusion : énergie vaut ${final}.`,
        canvas: scratchCanvas("Variable avec négatif", [
          { type: "event" },
          { type: "set_variable", variable: "énergie", value: depart },
          { type: "change_variable", variable: "énergie", value: -perte },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "4e_algo_variable_tpl_5_boucle_variable",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_variable",
    difficulty: 4,
    theme: "neutral",
    hint: "La modification est répétée plusieurs fois.",
    tags: ["algorithmique", "variable", "boucle", "template", "canvas"],
    generate: () => {
      const depart = randomChoice([0, 2, 5]);
      const ajout = randomChoice([1, 2, 3]);
      const fois = randomChoice([3, 4, 5]);

      const final = depart + ajout * fois;

      return {
        text:
          `score vaut ${depart}. ` +
          `On répète ${fois} fois : ajouter ${ajout} à score. ` +
          "Quelle est la valeur finale de score ?",
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation:
          "Définition : une boucle répète plusieurs fois la même modification.\n\n" +
          "Méthode : on calcule l’ajout total produit par la répétition.\n\n" +
          `Exécution : ${ajout} × ${fois} = ${ajout * fois}. Puis ${depart} + ${ajout * fois} = ${final}.\n\n` +
          `Conclusion : score vaut ${final}.`,
        canvas: scratchCanvas("Boucle et variable", [
          { type: "event" },
          { type: "set_variable", variable: "score", value: depart },
          {
            type: "repeat",
            times: fois,
            children: [
              {
                type: "change_variable",
                variable: "score",
                value: ajout,
              },
            ],
          },
        ]),
      };
    },
  },

  {
    kind: "fixed",
    id: "4e_algo_variable_fixed_2_piege_remplacement",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_variable",
    difficulty: 4,
    theme: "neutral",
    text:
      "score vaut 5. On exécute “mettre score à 2”. Quelle est la nouvelle valeur de score ?",
    format: "qcm",
    choices: ["2", "5", "7", "10"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "Le bloc “mettre à” remplace complètement l’ancienne valeur.",
    explanation:
      "Définition : le bloc “mettre variable à ...” remplace l’ancienne valeur.\n\n" +
      "Méthode : on oublie l’ancienne valeur et on lit la nouvelle.\n\n" +
      "Exécution : score devient 2.\n\n" +
      "Conclusion : la nouvelle valeur de score est 2.",
    tags: ["algorithmique", "variable", "piege", "qcm"],
    canvas: scratchCanvas("Remplacement de valeur", [
      { type: "event" },
      { type: "set_variable", variable: "score", value: 5 },
      { type: "set_variable", variable: "score", value: 2 },
    ]),
  },

  {
    kind: "fixed",
    id: "4e_algo_variable_open_1_expliquer_difference",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_variable",
    difficulty: 5,
    theme: "neutral",
    text:
      "Explique la différence entre “mettre score à 5” et “ajouter 5 à score”.",
    format: "open",
    expected: ["remplace", "ancienne", "ajoute", "valeur"],
    comparator: "contains_keyword",
    hint: "Un bloc remplace la valeur, l’autre la modifie.",
    explanation:
      "Définition : “mettre à” fixe une nouvelle valeur, alors que “ajouter à” modifie la valeur actuelle.\n\n" +
      "Méthode : on regarde si l’ancienne valeur est conservée ou non.\n\n" +
      "Exécution : “mettre score à 5” donne directement 5. “ajouter 5 à score” augmente la valeur actuelle de 5.\n\n" +
      "Conclusion : les deux blocs ont des rôles différents.",
    tags: ["algorithmique", "variable", "open", "vocabulaire"],
  },
    /* =========================
     ALGO_PROGRAMME_OBJECTIF
  ========================= */

  {
    kind: "fixed",
    id: "4e_algo_programme_objectif_fixed_1_definition",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_programme_objectif",
    difficulty: 2,
    theme: "neutral",
    text: "Écrire un programme pour répondre à un problème, c’est...",
    format: "qcm",
    choices: [
      "choisir les blocs qui permettent d’atteindre un objectif",
      "mettre des blocs au hasard",
      "utiliser seulement le bloc avancer",
      "ne jamais utiliser de variable",
    ],
    expected: ["choisir les blocs qui permettent d’atteindre un objectif"],
    comparator: "mcq_exact",
    hint: "Un programme doit avoir un but clair.",
    explanation:
      "Définition : un programme répond à un objectif précis.\n\n" +
      "Méthode : on choisit les blocs utiles et on les place dans le bon ordre.\n\n" +
      "Exécution : si l’objectif est de tester un score, on utilise une condition.\n\n" +
      "Conclusion : programmer, c’est organiser les blocs pour atteindre un objectif.",
    tags: ["algorithmique", "objectif", "programme", "qcm"],
    canvas: scratchCanvas("Programme avec objectif", [
      { type: "event" },
      { type: "ask", text: "Quel est ton score ?" },
      { type: "set_variable", variable: "score", value: "réponse" },
      {
        type: "if_else",
        condition: "score > 10",
        children: [{ type: "say", text: "Réussi" }],
        elseChildren: [{ type: "say", text: "À revoir" }],
      },
    ]),
  },

  {
    kind: "template",
    id: "4e_algo_programme_objectif_tpl_1_choisir_condition",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_programme_objectif",
    difficulty: 3,
    theme: "neutral",
    hint: "L’objectif est de dire Bravo seulement si le score dépasse le seuil.",
    tags: ["algorithmique", "objectif", "condition", "template", "canvas"],
    generate: () => {
      const seuil = randomChoice([10, 12, 15]);

      return {
        text: `On veut dire “Bravo” seulement si score est supérieur à ${seuil}. Quelle condition faut-il utiliser ?`,
        format: "qcm",
        choices: shuffle([
          `score > ${seuil}`,
          `score < ${seuil}`,
          `score = 0`,
          `score > 100`,
        ]),
        expected: [`score > ${seuil}`],
        comparator: "mcq_exact",
        explanation:
          "Définition : une condition permet de décider si une action doit être exécutée.\n\n" +
          "Méthode : on traduit l’objectif en comparaison.\n\n" +
          `Exécution : “supérieur à ${seuil}” se traduit par score > ${seuil}.\n\n` +
          `Conclusion : la bonne condition est score > ${seuil}.`,
        canvas: scratchCanvas("Choisir la condition", [
          { type: "event" },
          {
            type: "if",
            condition: `score > ${seuil}`,
            children: [{ type: "say", text: "Bravo" }],
          },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "4e_algo_programme_objectif_tpl_2_choisir_programme_calcul",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_programme_objectif",
    difficulty: 3,
    theme: "neutral",
    hint: "Le programme doit multiplier puis ajouter.",
    tags: ["algorithmique", "objectif", "programme_calcul", "template", "canvas"],
    generate: () => {
      const mult = randomChoice([2, 3, 4]);
      const ajout = randomChoice([5, 7, 10]);

      return {
        text: `On veut prendre un nombre x, le multiplier par ${mult}, puis ajouter ${ajout}. Quelle formule correspond à l’objectif ?`,
        format: "qcm",
        choices: shuffle([
          `${mult} × x + ${ajout}`,
          `x + ${mult} × ${ajout}`,
          `${mult} × (x + ${ajout})`,
          `x - ${mult} + ${ajout}`,
        ]),
        expected: [`${mult} × x + ${ajout}`],
        comparator: "mcq_exact",
        explanation:
          "Définition : un programme de calcul peut être représenté par une formule.\n\n" +
          "Méthode : on respecte l’ordre demandé par l’objectif.\n\n" +
          `Exécution : multiplier x par ${mult}, puis ajouter ${ajout}, donne ${mult} × x + ${ajout}.\n\n` +
          `Conclusion : la bonne formule est ${mult} × x + ${ajout}.`,
        canvas: scratchCanvas("Objectif : programme de calcul", [
          { type: "event" },
          { type: "ask", text: "Choisis un nombre" },
          { type: "set_variable", variable: "x", value: "réponse" },
          { type: "operator", left: mult, operator: "×", right: "x" },
          { type: "operator", left: `${mult} × x`, operator: "+", right: ajout },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "4e_algo_programme_objectif_tpl_3_objectif_score",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_programme_objectif",
    difficulty: 4,
    theme: "neutral",
    hint: "Le programme doit modifier score seulement si la condition est vraie.",
    tags: ["algorithmique", "objectif", "score", "condition", "template", "canvas"],
    generate: () => {
      const score = randomChoice([8, 10, 12, 15]);
      const seuil = 10;
      const bonus = randomChoice([2, 5, 10]);
      const final = score > seuil ? score + bonus : score;

      return {
        text:
          `Objectif : si score est supérieur à ${seuil}, ajouter ${bonus} points. ` +
          `Au départ, score vaut ${score}. Quelle est la valeur finale ?`,
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation:
          "Définition : un programme peut utiliser une condition pour répondre à un objectif.\n\n" +
          "Méthode : on vérifie la condition, puis on applique ou non le bonus.\n\n" +
          `Exécution : ${score} > ${seuil} est ${score > seuil ? "vrai" : "faux"}. ` +
          `${score > seuil ? `On ajoute ${bonus}.` : "On n’ajoute rien."}\n\n` +
          `Conclusion : score vaut ${final}.`,
        canvas: scratchCanvas("Objectif : bonus", [
          { type: "event" },
          { type: "set_variable", variable: "score", value: score },
          {
            type: "if",
            condition: `score > ${seuil}`,
            children: [
              { type: "change_variable", variable: "score", value: bonus },
            ],
          },
          { type: "say", text: "score" },
        ]),
      };
    },
  },
    {
    kind: "template",
    id: "4e_algo_programme_objectif_tpl_4_objectif_si_sinon",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_programme_objectif",
    difficulty: 4,
    theme: "neutral",
    hint: "Avec si/sinon, le programme choisit un message selon la condition.",
    tags: ["algorithmique", "objectif", "si_sinon", "template", "canvas"],
    generate: () => {
      const note = randomChoice([6, 9, 10, 13, 16]);
      const message = note >= 10 ? "Validé" : "À retravailler";

      return {
        text: `Objectif : afficher “Validé” si la note est au moins 10, sinon “À retravailler”. Pour note = ${note}, quel message s’affiche ?`,
        format: "qcm",
        choices: shuffle(["Validé", "À retravailler"]),
        expected: [message],
        comparator: "mcq_exact",
        explanation:
          "Définition : un bloc si/sinon permet de choisir entre deux actions.\n\n" +
          "Méthode : on teste si la note est au moins 10.\n\n" +
          `Exécution : ${note} est ${note >= 10 ? "au moins" : "inférieur à"} 10.\n\n` +
          `Conclusion : le message affiché est “${message}”.`,
        canvas: scratchCanvas("Objectif : validation", [
          { type: "event" },
          { type: "set_variable", variable: "note", value: note },
          {
            type: "if_else",
            condition: "note > 9",
            children: [{ type: "say", text: "Validé" }],
            elseChildren: [{ type: "say", text: "À retravailler" }],
          },
        ]),
      };
    },
  },

  {
    kind: "fixed",
    id: "4e_algo_programme_objectif_fixed_2_piege_objectif",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_programme_objectif",
    difficulty: 4,
    theme: "neutral",
    text:
      "On veut afficher “Gagné” seulement si réponse = 5. Le programme teste réponse > 5. Est-il correct ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "“Égal à 5” et “supérieur à 5” ne veulent pas dire la même chose.",
    explanation:
      "Définition : un programme doit traduire exactement l’objectif.\n\n" +
      "Méthode : on compare la condition utilisée avec l’objectif demandé.\n\n" +
      "Exécution : l’objectif demande réponse = 5, mais le programme teste réponse > 5.\n\n" +
      "Conclusion : le programme n’est pas correct.",
    tags: ["algorithmique", "objectif", "erreur", "condition", "qcm"],
    canvas: scratchCanvas("Objectif mal traduit", [
      { type: "event" },
      { type: "ask", text: "Devine le nombre" },
      { type: "set_variable", variable: "réponse", value: "réponse" },
      {
        type: "if",
        condition: "réponse > 5",
        children: [{ type: "say", text: "Gagné" }],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "4e_algo_programme_objectif_open_1_methode",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_programme_objectif",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment choisir les blocs pour répondre à un objectif donné.",
    format: "open",
    expected: ["objectif", "blocs", "ordre", "condition"],
    comparator: "contains_keyword",
    hint: "Commence par comprendre ce que le programme doit faire.",
    explanation:
      "Définition : programmer pour un objectif consiste à construire une suite de blocs adaptée au problème.\n\n" +
      "Méthode : on identifie les données, les calculs, les conditions et l’ordre des blocs.\n\n" +
      "Exécution : si l’objectif demande un choix, on utilise une condition ; si une valeur change, on utilise une variable.\n\n" +
      "Conclusion : les blocs doivent être choisis selon l’objectif.",
    tags: ["algorithmique", "objectif", "open", "methode"],
  },

  /* =========================
     ALGO_MODIFIER_PROGRAMME
  ========================= */

  {
    kind: "template",
    id: "4e_algo_modifier_programme_tpl_1_modifier_seuil",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_modifier_programme",
    difficulty: 3,
    theme: "neutral",
    hint: "Modifier un seuil change la condition.",
    tags: ["algorithmique", "modifier", "seuil", "condition", "template", "canvas"],
    generate: () => {
      const score = randomChoice([8, 10, 12, 15]);
      const ancienSeuil = 10;
      const nouveauSeuil = randomChoice([12, 14]);
      const answer = score > nouveauSeuil ? "Bravo" : "rien";

      return {
        text: `On remplace la condition “score > ${ancienSeuil}” par “score > ${nouveauSeuil}”. Si score vaut ${score}, que dit le lutin ?`,
        format: "qcm",
        choices: shuffle(["Bravo", "rien"]),
        expected: [answer],
        comparator: "mcq_exact",
        explanation:
          "Définition : modifier un programme peut changer son comportement.\n\n" +
          "Méthode : on utilise la nouvelle condition, pas l’ancienne.\n\n" +
          `Exécution : ${score} > ${nouveauSeuil} est ${score > nouveauSeuil ? "vrai" : "faux"}.\n\n` +
          `Conclusion : le lutin dit “${answer}”.`,
        canvas: scratchCanvas("Modifier le seuil", [
          { type: "event" },
          { type: "set_variable", variable: "score", value: score },
          {
            type: "if",
            condition: `score > ${nouveauSeuil}`,
            children: [{ type: "say", text: "Bravo" }],
          },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "4e_algo_modifier_programme_tpl_2_modifier_bonus",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_modifier_programme",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise le nouveau bonus.",
    tags: ["algorithmique", "modifier", "bonus", "variable", "template", "canvas"],
    generate: () => {
      const score = randomChoice([10, 12, 15]);
      const ancienBonus = randomChoice([2, 3]);
      const nouveauBonus = randomChoice([5, 8, 10]);
      const final = score + nouveauBonus;

      return {
        text: `Le programme ajoutait ${ancienBonus} à score. On modifie pour ajouter ${nouveauBonus}. Si score vaut ${score}, quelle est la nouvelle valeur finale ?`,
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation:
          "Définition : modifier un paramètre change le résultat obtenu.\n\n" +
          "Méthode : on applique la nouvelle valeur du bonus.\n\n" +
          `Exécution : ${score} + ${nouveauBonus} = ${final}.\n\n` +
          `Conclusion : la nouvelle valeur finale est ${final}.`,
        canvas: scratchCanvas("Modifier le bonus", [
          { type: "event" },
          { type: "set_variable", variable: "score", value: score },
          { type: "change_variable", variable: "score", value: nouveauBonus },
          { type: "say", text: "score" },
        ]),
      };
    },
  },
    {
    kind: "template",
    id: "4e_algo_modifier_programme_tpl_3_corriger_condition",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_modifier_programme",
    difficulty: 4,
    theme: "neutral",
    hint: "L’objectif demande une égalité, pas une comparaison stricte.",
    tags: ["algorithmique", "modifier", "condition", "debug", "template", "canvas"],
    generate: () => {
      const secret = randomChoice([4, 5, 6, 7]);

      return {
        text: `Objectif : dire “Gagné” seulement si réponse est égale à ${secret}. Quelle condition faut-il utiliser ?`,
        format: "qcm",
        choices: shuffle([
          `réponse = ${secret}`,
          `réponse > ${secret}`,
          `réponse < ${secret}`,
          `réponse = ${secret + 1}`,
        ]),
        expected: [`réponse = ${secret}`],
        comparator: "mcq_exact",
        explanation:
          "Définition : corriger un programme consiste à remplacer un bloc ou une condition incorrecte.\n\n" +
          "Méthode : on traduit exactement l’objectif demandé.\n\n" +
          `Exécution : “égale à ${secret}” se traduit par réponse = ${secret}.\n\n` +
          `Conclusion : la condition correcte est réponse = ${secret}.`,
        canvas: scratchCanvas("Corriger une condition", [
          { type: "event" },
          { type: "ask", text: "Devine le nombre" },
          { type: "set_variable", variable: "réponse", value: "réponse" },
          {
            type: "if",
            condition: `réponse = ${secret}`,
            children: [{ type: "say", text: "Gagné" }],
          },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "4e_algo_modifier_programme_tpl_4_changer_objectif",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_modifier_programme",
    difficulty: 4,
    theme: "neutral",
    hint: "Le nouvel objectif demande de diminuer la variable.",
    tags: ["algorithmique", "modifier", "objectif", "variable", "template", "canvas"],
    generate: () => {
      const energie = randomChoice([12, 15, 20]);
      const perte = randomChoice([3, 5, 7]);
      const final = energie - perte;

      return {
        text:
          `Nouveau comportement : retirer ${perte} points d’énergie. ` +
          `Si énergie vaut ${energie}, quelle doit être sa valeur finale ?`,
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation:
          "Définition : modifier un programme peut servir à changer son objectif.\n\n" +
          "Méthode : retirer une quantité revient à ajouter une valeur négative ou à soustraire.\n\n" +
          `Exécution : ${energie} - ${perte} = ${final}.\n\n` +
          `Conclusion : énergie doit valoir ${final}.`,
        canvas: scratchCanvas("Changer le comportement", [
          { type: "event" },
          { type: "set_variable", variable: "énergie", value: energie },
          { type: "change_variable", variable: "énergie", value: -perte },
          { type: "say", text: "énergie" },
        ]),
      };
    },
  },

  {
    kind: "fixed",
    id: "4e_algo_modifier_programme_fixed_1_piege_ancien_parametre",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_modifier_programme",
    difficulty: 4,
    theme: "neutral",
    text:
      "Un programme utilisait “score > 10”. On le modifie en “score > 15”. Pour score = 12, faut-il encore afficher “Bravo” ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il faut utiliser la nouvelle condition.",
    explanation:
      "Définition : après modification, c’est la nouvelle version du programme qui compte.\n\n" +
      "Méthode : on teste score > 15.\n\n" +
      "Exécution : 12 > 15 est faux.\n\n" +
      "Conclusion : il ne faut pas afficher “Bravo”.",
    tags: ["algorithmique", "modifier", "condition", "piege", "qcm"],
    canvas: scratchCanvas("Ancien ou nouveau seuil ?", [
      { type: "event" },
      { type: "set_variable", variable: "score", value: 12 },
      {
        type: "if",
        condition: "score > 15",
        children: [{ type: "say", text: "Bravo" }],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "4e_algo_modifier_programme_open_1_methode",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_modifier_programme",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment vérifier qu’un programme modifié respecte bien le nouvel objectif.",
    format: "open",
    expected: ["objectif", "tester", "valeur", "résultat"],
    comparator: "contains_keyword",
    hint: "Teste le programme avec une valeur simple.",
    explanation:
      "Définition : vérifier un programme modifié consiste à contrôler qu’il répond au nouvel objectif.\n\n" +
      "Méthode : on choisit une valeur test, on exécute les blocs dans l’ordre, puis on compare au résultat attendu.\n\n" +
      "Exécution : si l’objectif change, il faut utiliser les nouveaux paramètres ou les nouvelles conditions.\n\n" +
      "Conclusion : on valide la modification en testant le comportement obtenu.",
    tags: ["algorithmique", "modifier", "open", "methode", "debug"],
  },
    /* =========================
     ALGO_DEFIS
  ========================= */

  {
    kind: "template",
    id: "4e_algo_defis_tpl_1_condition_variable_boucle",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Commence par calculer la valeur de score après la boucle.",
    tags: ["algorithmique", "defi", "variable", "boucle", "condition", "template", "canvas"],
    generate: () => {
      const depart = randomChoice([0, 2, 5]);
      const ajout = randomChoice([2, 3, 4]);
      const fois = randomChoice([3, 4, 5]);
      const seuil = randomChoice([10, 12, 15]);

      const final = depart + ajout * fois;
      const message = final > seuil ? "Bravo" : "Continue";

      return {
        text:
          `score vaut ${depart}. On répète ${fois} fois : ajouter ${ajout} à score. ` +
          `Puis le programme teste “score > ${seuil}”. Quel message s’affiche ?`,
        format: "qcm",
        choices: shuffle(["Bravo", "Continue"]),
        expected: [message],
        comparator: "mcq_exact",
        explanation:
          "Définition : un défi algorithmique peut combiner boucle, variable et condition.\n\n" +
          "Méthode : on calcule d’abord la valeur finale de la variable, puis on teste la condition.\n\n" +
          `Exécution : score = ${depart} + ${ajout} × ${fois} = ${final}. ` +
          `${final} > ${seuil} est ${final > seuil ? "vrai" : "faux"}.\n\n` +
          `Conclusion : le message affiché est “${message}”.`,
        canvas: scratchCanvas("Boucle + condition", [
          { type: "event" },
          { type: "set_variable", variable: "score", value: depart },
          {
            type: "repeat",
            times: fois,
            children: [
              { type: "change_variable", variable: "score", value: ajout },
            ],
          },
          {
            type: "if_else",
            condition: `score > ${seuil}`,
            children: [{ type: "say", text: "Bravo" }],
            elseChildren: [{ type: "say", text: "Continue" }],
          },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "4e_algo_defis_tpl_2_debug_condition",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare l’objectif avec la condition utilisée.",
    tags: ["algorithmique", "defi", "debug", "condition", "template", "canvas"],
    generate: () => {
      const seuil = randomChoice([10, 12, 15]);

      return {
        text:
          `Objectif : afficher “Réussi” si score est au moins ${seuil}. ` +
          `Le programme utilise “score > ${seuil}”. Quelle est l’erreur ?`,
        format: "qcm",
        choices: shuffle([
          "Le programme exclut le cas où score est égal au seuil",
          "Le programme accepte tous les scores",
          "Le programme ne contient aucune condition",
          "Le programme ajoute trop de points",
        ]),
        expected: ["Le programme exclut le cas où score est égal au seuil"],
        comparator: "mcq_exact",
        explanation:
          "Définition : corriger un programme demande de comparer l’objectif et le code.\n\n" +
          "Méthode : “au moins” signifie supérieur ou égal, pas strictement supérieur.\n\n" +
          `Exécution : avec “score > ${seuil}”, un score égal à ${seuil} ne passe pas.\n\n` +
          "Conclusion : l’erreur est que le cas d’égalité est oublié.",
        canvas: scratchCanvas("Debug condition", [
          { type: "event" },
          {
            type: "if_else",
            condition: `score > ${seuil}`,
            children: [{ type: "say", text: "Réussi" }],
            elseChildren: [{ type: "say", text: "À revoir" }],
          },
        ]),
      };
    },
  },

  {
    kind: "fixed",
    id: "4e_algo_defis_open_1_synthese",
    niveau: "4e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_defis",
    difficulty: 5,
    theme: "neutral",
    text:
      "Explique une méthode pour analyser un programme qui contient une variable, une boucle et une condition.",
    format: "open",
    expected: ["variable", "boucle", "condition", "ordre"],
    comparator: "contains_keyword",
    hint: "Suis les blocs dans l’ordre : valeur de départ, répétitions, puis test.",
    explanation:
      "Définition : analyser un programme consiste à prévoir son comportement.\n\n" +
      "Méthode : on suit les blocs dans l’ordre : initialisation de la variable, effet de la boucle, puis condition finale.\n\n" +
      "Exécution : on met à jour la variable à chaque étape, puis on teste vrai ou faux.\n\n" +
      "Conclusion : cette méthode évite les erreurs de logique.",
    tags: ["algorithmique", "defi", "open", "synthese"],
  },
];
