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
    id: "4e_algo_condition_fixed_1_definition",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_condition",
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
    tags: ["algo_programmation", "condition", "definition", "qcm"],
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
    id: "4e_algo_condition_tpl_1_comparaison_superieur",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_condition",
    difficulty: 1,
    theme: "neutral",
    hint: "Compare la valeur de score avec le nombre donné.",
    tags: ["algo_programmation", "condition", "comparaison", "template", "canvas"],
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
    id: "4e_algo_condition_tpl_2_comparaison_inferieur",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_condition",
    difficulty: 2,
    theme: "neutral",
    hint: "Vérifie si la valeur est strictement plus petite que la limite.",
    tags: ["algo_programmation", "condition", "inferieur", "template", "canvas"],
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
    id: "4e_algo_condition_tpl_3_egalite",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_condition",
    difficulty: 2,
    theme: "neutral",
    hint: "Une égalité est vraie seulement si les deux valeurs sont identiques.",
    tags: ["algo_programmation", "condition", "egalite", "template", "canvas"],
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
    id: "4e_algo_condition_tpl_4_relatif",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_condition",
    difficulty: 3,
    theme: "neutral",
    hint: "Attention aux nombres négatifs.",
    tags: ["algo_programmation", "condition", "relatif", "template", "canvas"],
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
    id: "4e_algo_condition_fixed_2_piege_strict",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_condition",
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
    tags: ["algo_programmation", "condition", "strict", "piege", "qcm"],
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
    id: "4e_algo_condition_fixed_3_piege_egalite",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_condition",
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
    tags: ["algo_programmation", "condition", "egalite", "qcm"],
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
    id: "4e_algo_condition_tpl_5_expression",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_condition",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule d’abord l’expression, puis teste la condition.",
    tags: ["algo_programmation", "condition", "expression", "template", "canvas"],
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
    id: "4e_algo_condition_open_1_expliquer",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_condition",
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
    tags: ["algo_programmation", "condition", "open", "vocabulaire"],
  },

  /* =========================
     ALGO_INSTRUCTIONS_CONDITIONNELLES
  ========================= */

  {
    kind: "fixed",
    id: "4e_algo_instruction_conditionnelle_fixed_1_definition",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_instruction_conditionnelle",
    difficulty: 2,
    theme: "neutral",
    text: "Un bloc “si ... alors” permet...",
    format: "qcm",
    choices: [
      "d’exécuter des instructions seulement si une condition est vraie",
      "d’exécuter des instructions seulement si une condition est fausse",
      "d’exécuter des instructions tant qu’une condition reste vraie",
      "de vérifier une condition à la fin de chaque instruction",
    ],
    expected: ["d’exécuter des instructions seulement si une condition est vraie"],
    comparator: "mcq_exact",
    hint: "Le mot important est “si”.",
    explanation:
      "Définition : une instruction conditionnelle dépend d’une condition.\n\n" +
      "Méthode : on teste la condition avant d’exécuter les blocs à l’intérieur.\n\n" +
      "Exécution : si la condition est vraie, les blocs sont exécutés ; sinon, ils sont ignorés.\n\n" +
      "Conclusion : un bloc “si” exécute des instructions seulement si la condition est vraie.",
    tags: ["algo_programmation", "conditionnelle", "si", "qcm"],
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
    id: "4e_algo_instruction_conditionnelle_tpl_1_si_simple",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_instruction_conditionnelle",
    difficulty: 2,
    theme: "neutral",
    hint: "Le bloc intérieur s’exécute seulement si la condition est vraie.",
    tags: ["algo_programmation", "conditionnelle", "si", "template", "canvas"],
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
    id: "4e_algo_instruction_conditionnelle_tpl_2_si_sinon",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_instruction_conditionnelle",
    difficulty: 3,
    theme: "neutral",
    hint: "Avec si/sinon, une des deux branches est exécutée.",
    tags: ["algo_programmation", "conditionnelle", "si_sinon", "template", "canvas"],
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
    id: "4e_algo_condition_fixed_3_piege_egalite_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_condition",
    difficulty: 3,
    theme: "neutral",
    text: "La variable x vaut 12. La condition “x > 12” est-elle vraie ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "« Strictement plus grand » exclut la valeur elle-même.",
    explanation:
      "Définition : une condition compare deux valeurs et vaut vrai ou faux.\n\n" +
      "Méthode : on compare la valeur de x avec 12.\n\n" +
      "Exécution : x vaut exactement 12. Or « x > 12 » demande STRICTEMENT plus grand : 12 n’est pas plus grand que 12, donc la condition est fausse. Écrite « x ≥ 12 », elle aurait été vraie.\n\n" +
      "Conclusion : la condition est fausse.",
    tags: ["algo_programmation", "condition", "comparaison", "piege", "qcm"],
    canvas: scratchCanvas("Condition de comparaison", [
      { type: "event" },
      { type: "set_variable", variable: "x", value: 12 },
      {
        type: "if",
        condition: "x > 12",
        children: [{ type: "say", text: "Plus grand" }],
      },
    ]),
  },

  {
    kind: "template",
    id: "4e_algo_condition_tpl_5_expression_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_condition",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule d’abord l’expression, puis teste la condition.",
    tags: ["algo_programmation", "condition", "expression", "template", "canvas"],
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
    id: "4e_algo_condition_open_1_expliquer_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_condition",
    difficulty: 4,
    theme: "neutral",
    text: "Explique la différence entre les conditions “score > 10” et “score ≥ 10”.",
    format: "open",
    expected: ["10", "égal", "egal", "strictement", "compte pas", "inclut"],
    comparator: "contains_keyword",
    hint: "Que se passe-t-il si score vaut exactement 10 ?",
    explanation:
      "Définition : une condition est un test logique qui peut être vrai ou faux.\n\n" +
      "Méthode : on regarde ce qui arrive à la valeur limite, celle qui sépare les deux cas.\n\n" +
      "Exécution : si score vaut 12, les deux conditions sont vraies. Si score vaut 9, les deux sont fausses. Tout se joue sur 10 : « score > 10 » est FAUSSE, car 10 n’est pas strictement plus grand que 10, alors que « score ≥ 10 » est VRAIE.\n\n" +
      "Conclusion : les deux conditions ne diffèrent que sur une seule valeur — mais c’est souvent celle-là qui décide.",
    tags: ["algo_programmation", "condition", "open", "vocabulaire"],
  },

  /* =========================
     ALGO_INSTRUCTIONS_CONDITIONNELLES
  ========================= */

  {
    kind: "fixed",
    id: "4e_algo_instruction_conditionnelle_fixed_1_definition_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_instruction_conditionnelle",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un bloc “si ... alors ... sinon”, que se passe-t-il quand la condition est fausse ?",
    format: "qcm",
    choices: [
      "seules les instructions du “sinon” sont exécutées",
      "aucune instruction n’est exécutée",
      "les deux parties sont exécutées l’une après l’autre",
      "le programme s’arrête",
    ],
    expected: ["seules les instructions du “sinon” sont exécutées"],
    comparator: "mcq_exact",
    hint: "Le “sinon” est là précisément pour ce cas.",
    explanation:
      "Définition : une instruction conditionnelle choisit entre deux chemins.\n\n" +
      "Méthode : on teste la condition, puis on suit UN SEUL des deux chemins.\n\n" +
      "Exécution : condition vraie, le programme exécute la partie “alors” et saute le “sinon”. Condition fausse, il saute le “alors” et exécute le “sinon”. Jamais les deux.\n\n" +
      "Conclusion : le “sinon” sert exactement à ça — dire quoi faire quand la condition n’est pas remplie.",
    tags: ["algo_programmation", "conditionnelle", "si", "qcm"],
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
    id: "4e_algo_instruction_conditionnelle_tpl_1_si_simple_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_instruction_conditionnelle",
    difficulty: 2,
    theme: "neutral",
    hint: "Le bloc intérieur s’exécute seulement si la condition est vraie.",
    tags: ["algo_programmation", "conditionnelle", "si", "template", "canvas"],
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
    id: "4e_algo_instruction_conditionnelle_tpl_2_si_sinon_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_instruction_conditionnelle",
    difficulty: 3,
    theme: "neutral",
    hint: "Avec si/sinon, une des deux branches est exécutée.",
    tags: ["algo_programmation", "conditionnelle", "si_sinon", "template", "canvas"],
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
    id: "4e_algo_instruction_conditionnelle_tpl_3_variable_modifiee",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_instruction_conditionnelle",
    difficulty: 3,
    theme: "neutral",
    hint: "La variable change seulement dans la branche exécutée.",
    tags: ["algo_programmation", "conditionnelle", "variable", "template", "canvas"],
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
    id: "4e_algo_instruction_conditionnelle_tpl_4_si_sinon_variable",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_instruction_conditionnelle",
    difficulty: 4,
    theme: "neutral",
    hint: "Avec si/sinon, une seule branche est exécutée.",
    tags: ["algo_programmation", "conditionnelle", "si_sinon", "variable", "template", "canvas"],
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
    id: "4e_algo_instruction_conditionnelle_fixed_2_piege_deux_branches",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_instruction_conditionnelle",
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
    tags: ["algo_programmation", "conditionnelle", "si_sinon", "piege", "qcm"],
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
    id: "4e_algo_instruction_conditionnelle_open_1_expliquer",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_instruction_conditionnelle",
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
    tags: ["algo_programmation", "conditionnelle", "open", "methode"],
  },

  /* =========================
     ALGO_VARIABLE
  ========================= */

  {
    kind: "fixed",
    id: "4e_algo_variable_fixed_1_definition",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
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
    tags: ["algo_programmation", "variable", "definition", "qcm"],
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
    notionId: "algo_programmation",
    microId: "algo_variable",
    difficulty: 2,
    theme: "neutral",
    hint: "Le bloc “mettre score à ...” fixe la valeur de départ.",
    tags: ["algo_programmation", "variable", "initialisation", "template", "canvas"],
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
    notionId: "algo_programmation",
    microId: "algo_variable",
    difficulty: 2,
    theme: "neutral",
    hint: "Le bloc “ajouter à” modifie la valeur actuelle.",
    tags: ["algo_programmation", "variable", "increment", "template", "canvas"],
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
    notionId: "algo_programmation",
    microId: "algo_variable",
    difficulty: 3,
    theme: "neutral",
    hint: "La variable change plusieurs fois.",
    tags: ["algo_programmation", "variable", "suite", "template", "canvas"],
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
    notionId: "algo_programmation",
    microId: "algo_variable",
    difficulty: 3,
    theme: "neutral",
    hint: "Ajouter un nombre négatif revient à soustraire.",
    tags: ["algo_programmation", "variable", "relatif", "template", "canvas"],
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
    notionId: "algo_programmation",
    microId: "algo_variable",
    difficulty: 4,
    theme: "neutral",
    hint: "La modification est répétée plusieurs fois.",
    tags: ["algo_programmation", "variable", "boucle", "template", "canvas"],
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
    notionId: "algo_programmation",
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
    tags: ["algo_programmation", "variable", "piege", "qcm"],
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
    notionId: "algo_programmation",
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
    tags: ["algo_programmation", "variable", "open", "vocabulaire"],
  },
    /* =========================
     ALGO_PROGRAMME_OBJECTIF
  ========================= */

  {
    kind: "fixed",
    id: "4e_algo_programme_objectif_fixed_1_definition",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_programme_objectif",
    difficulty: 2,
    theme: "neutral",
    text: "Écrire un programme pour répondre à un problème, c’est...",
    format: "qcm",
    choices: [
      "choisir les blocs qui permettent d’atteindre un objectif",
      "choisir les blocs qui utilisent le plus de variables possible",
      "écrire le plus grand nombre de blocs pour être complet",
      "recopier les blocs d’un programme qui ressemble au sien",
    ],
    expected: ["choisir les blocs qui permettent d’atteindre un objectif"],
    comparator: "mcq_exact",
    hint: "Un programme doit avoir un but clair.",
    explanation:
      "Définition : un programme répond à un objectif précis.\n\n" +
      "Méthode : on choisit les blocs utiles et on les place dans le bon ordre.\n\n" +
      "Exécution : si l’objectif est de tester un score, on utilise une condition.\n\n" +
      "Conclusion : programmer, c’est organiser les blocs pour atteindre un objectif.",
    tags: ["algo_programmation", "objectif", "programme", "qcm"],
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
    notionId: "algo_programmation",
    microId: "algo_programme_objectif",
    difficulty: 3,
    theme: "neutral",
    hint: "L’objectif est de dire Bravo seulement si le score dépasse le seuil.",
    tags: ["algo_programmation", "objectif", "condition", "template", "canvas"],
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
    notionId: "algo_programmation",
    microId: "algo_programme_objectif",
    difficulty: 3,
    theme: "neutral",
    hint: "Le programme doit multiplier puis ajouter.",
    tags: ["algo_programmation", "objectif", "programme_calcul", "template", "canvas"],
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
    notionId: "algo_programmation",
    microId: "algo_programme_objectif",
    difficulty: 4,
    theme: "neutral",
    hint: "Le programme doit modifier score seulement si la condition est vraie.",
    tags: ["algo_programmation", "objectif", "score", "condition", "template", "canvas"],
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
    notionId: "algo_programmation",
    microId: "algo_programme_objectif",
    difficulty: 4,
    theme: "neutral",
    hint: "Avec si/sinon, le programme choisit un message selon la condition.",
    tags: ["algo_programmation", "objectif", "si_sinon", "template", "canvas"],
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
    notionId: "algo_programmation",
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
    tags: ["algo_programmation", "objectif", "erreur", "condition", "qcm"],
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
    notionId: "algo_programmation",
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
    tags: ["algo_programmation", "objectif", "open", "methode"],
  },

  /* =========================
     ALGO_MODIFIER_PROGRAMME
  ========================= */

  {
    kind: "template",
    id: "4e_algo_modifier_tpl_1_modifier_seuil",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_modifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Modifier un seuil change la condition.",
    tags: ["algo_programmation", "modifier", "seuil", "condition", "template", "canvas"],
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
    id: "4e_algo_modifier_tpl_2_modifier_bonus",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_modifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise le nouveau bonus.",
    tags: ["algo_programmation", "modifier", "bonus", "variable", "template", "canvas"],
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
    id: "4e_algo_modifier_tpl_3_corriger_condition",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_modifier",
    difficulty: 4,
    theme: "neutral",
    hint: "L’objectif demande une égalité, pas une comparaison stricte.",
    tags: ["algo_programmation", "modifier", "condition", "debug", "template", "canvas"],
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
    id: "4e_algo_modifier_tpl_4_changer_objectif",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_modifier",
    difficulty: 4,
    theme: "neutral",
    hint: "Le nouvel objectif demande de diminuer la variable.",
    tags: ["algo_programmation", "modifier", "objectif", "variable", "template", "canvas"],
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
    id: "4e_algo_modifier_fixed_1_piege_ancien_parametre",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_modifier",
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
    tags: ["algo_programmation", "modifier", "condition", "piege", "qcm"],
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
    id: "4e_algo_modifier_open_1_methode",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_modifier",
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
    tags: ["algo_programmation", "modifier", "open", "methode", "debug"],
  },
    /* =========================
     ALGO_DEFIS
  ========================= */

  {
    kind: "template",
    id: "4e_algo_defi_tpl_1_condition_variable_boucle",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Commence par calculer la valeur de score après la boucle.",
    tags: ["algo_programmation", "defi", "variable", "boucle", "condition", "template", "canvas"],
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
    id: "4e_algo_defi_tpl_2_debug_condition",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare l’objectif avec la condition utilisée.",
    tags: ["algo_programmation", "defi", "debug", "condition", "template", "canvas"],
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
    id: "4e_algo_defi_open_1_synthese",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
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
    tags: ["algo_programmation", "defi", "open", "synthese"],
  },

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  // ---------- ALGO_VARIABLE ----------
  {
    kind: "fixed",
    id: "4e_algo_variable_fixed_3_initialisation",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_variable",
    difficulty: 2,
    theme: "neutral",
    text: "Que fait le bloc « mettre score à 0 » ?",
    format: "qcm",
    choices: [
      "il donne la valeur 0 à la variable score",
      "il ajoute 0 au score actuel",
      "il supprime la variable score",
      "il affiche 0 à l’écran",
    ],
    expected: ["il donne la valeur 0 à la variable score"],
    comparator: "mcq_exact",
    hint: "« mettre à » fixe la valeur de départ.",
    explanation:
      "Définition : « mettre à » initialise une variable avec une valeur.\n\n" +
      "Méthode : on remplace l’ancienne valeur par la nouvelle.\n\n" +
      "Exécution : score vaut désormais 0.\n\n" +
      "Conclusion : le bloc fixe la valeur de score à 0.",
    tags: ["algo_programmation", "variable", "qcm"],
    canvas: scratchCanvas("Initialisation", [
      { type: "event" },
      { type: "set_variable", variable: "score", value: 0 },
    ]),
  },
  {
    kind: "template",
    id: "4e_algo_variable_tpl_6_set_then_change",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_variable",
    difficulty: 2,
    theme: "neutral",
    hint: "On part de la valeur initiale, puis on ajoute.",
    tags: ["algo_programmation", "variable", "template", "canvas"],
    generate: () => {
      const depart = randomChoice([0, 3, 5, 8]);
      const ajout = randomChoice([2, 4, 6, 7]);
      const final = depart + ajout;
      return {
        text: `score vaut ${depart}. On exécute « ajouter ${ajout} à score ». Quelle est la nouvelle valeur de score ?`,
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation:
          "Définition : « ajouter » modifie la variable en lui ajoutant une valeur.\n\n" +
          "Méthode : on additionne l’ajout à la valeur de départ.\n\n" +
          `Exécution : ${depart} + ${ajout} = ${final}.\n\n` +
          `Conclusion : score vaut ${final}.`,
        canvas: scratchCanvas("Modifier une variable", [
          { type: "event" },
          { type: "set_variable", variable: "score", value: depart },
          { type: "change_variable", variable: "score", value: ajout },
        ]),
      };
    },
  },

  // ---------- ALGO_PROGRAMME_OBJECTIF ----------
  {
    kind: "fixed",
    id: "4e_algo_programme_objectif_fixed_3_condition_au_moins",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_programme_objectif",
    difficulty: 2,
    theme: "neutral",
    text: "Pour afficher « Gagné » si score est au moins 10, quelle condition choisir ?",
    format: "qcm",
    choices: ["score ≥ 10", "score > 10", "score < 10", "score = 0"],
    expected: ["score ≥ 10"],
    comparator: "mcq_exact",
    hint: "« au moins 10 » inclut 10.",
    explanation:
      "Définition : « au moins 10 » signifie supérieur ou égal à 10.\n\n" +
      "Méthode : on choisit le symbole ≥.\n\n" +
      "Exécution : score = 10 doit afficher « Gagné ».\n\n" +
      "Conclusion : la condition est score ≥ 10.",
    tags: ["algo_programmation", "programme_objectif", "qcm"],
  },
  {
    kind: "template",
    id: "4e_algo_programme_objectif_tpl_5_choisir_condition",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_programme_objectif",
    difficulty: 3,
    theme: "neutral",
    hint: "Traduis l’objectif en symbole de comparaison.",
    tags: ["algo_programmation", "programme_objectif", "template"],
    generate: () => {
      const seuil = randomChoice([8, 10, 12, 15]);
      const cas = randomChoice([
        { texte: `strictement plus de ${seuil}`, cond: `score > ${seuil}` },
        { texte: `au moins ${seuil}`, cond: `score ≥ ${seuil}` },
        { texte: `moins de ${seuil}`, cond: `score < ${seuil}` },
      ]);
      return {
        text: `Objectif : réagir quand le score est ${cas.texte}. Quelle condition utiliser ?`,
        format: "qcm",
        choices: shuffle([cas.cond, `score = ${seuil}`, `score > ${seuil + 2}`, `score < ${seuil - 2}`]),
        expected: [cas.cond],
        comparator: "mcq_exact",
        explanation:
          "Définition : on traduit l’objectif en condition.\n\n" +
          "Méthode : on choisit le bon symbole (>, ≥, <).\n\n" +
          `Exécution : « ${cas.texte} » se traduit par « ${cas.cond} ».\n\n` +
          `Conclusion : la condition est « ${cas.cond} ».`,
      };
    },
  },
  {
    kind: "fixed",
    id: "4e_algo_programme_objectif_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_programme_objectif",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment choisir la condition d’un programme à partir d’un objectif.",
    format: "open",
    expected: ["objectif", "condition", "comparaison"],
    comparator: "contains_keyword",
    hint: "On traduit l’objectif en comparaison.",
    explanation:
      "Définition : un objectif décrit ce que doit faire le programme.\n\n" +
      "Méthode : on traduit l’objectif en une comparaison (>, ≥, <, =).\n\n" +
      "Exécution : on teste quelques valeurs pour vérifier.\n\n" +
      "Conclusion : on choisit la condition qui réalise exactement l’objectif.",
    tags: ["algo_programmation", "programme_objectif", "open"],
  },

  // ---------- ALGO_MODIFIER ----------
  {
    kind: "template",
    id: "4e_algo_modifier_tpl_5_seuil",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_modifier",
    difficulty: 3,
    theme: "neutral",
    hint: "On remplace l’ancien seuil par le nouveau dans la condition.",
    tags: ["algo_programmation", "modifier", "template"],
    generate: () => {
      const ancien = randomChoice([10, 12, 15]);
      const nouveau = randomChoice([18, 20, 25]);
      return {
        text: `Un programme teste « score > ${ancien} ». On veut maintenant réagir seulement si score dépasse ${nouveau}. Quelle est la nouvelle condition ?`,
        format: "qcm",
        choices: shuffle([`score > ${nouveau}`, `score > ${ancien}`, `score < ${nouveau}`, `score = ${nouveau}`]),
        expected: [`score > ${nouveau}`],
        comparator: "mcq_exact",
        explanation:
          "Définition : modifier un programme, c’est changer un paramètre.\n\n" +
          "Méthode : on remplace l’ancien seuil par le nouveau.\n\n" +
          `Exécution : la condition devient « score > ${nouveau} ».\n\n` +
          `Conclusion : la nouvelle condition est « score > ${nouveau} ».`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_algo_modifier_tpl_6_increment",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_modifier",
    difficulty: 3,
    theme: "neutral",
    hint: "On change la valeur ajoutée à chaque tour.",
    tags: ["algo_programmation", "modifier", "template", "canvas"],
    generate: () => {
      const ancien = randomChoice([1, 2, 3]);
      const nouveau = randomChoice([4, 5, 6]);
      const fois = randomChoice([3, 4, 5]);
      const final = nouveau * fois;
      return {
        text: `Un programme part de score = 0 et répète ${fois} fois « ajouter ${ancien} à score ». On remplace ${ancien} par ${nouveau}. Quel sera le score final ?`,
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation:
          "Définition : modifier l’incrément change le résultat de la boucle.\n\n" +
          `Méthode : on ajoute ${nouveau} à chaque tour, ${fois} fois.\n\n` +
          `Exécution : ${nouveau} × ${fois} = ${final}.\n\n` +
          `Conclusion : le score final est ${final}.`,
        canvas: scratchCanvas("Modifier l’incrément", [
          { type: "event" },
          { type: "set_variable", variable: "score", value: 0 },
          {
            type: "repeat",
            times: fois,
            children: [{ type: "change_variable", variable: "score", value: nouveau }],
          },
        ]),
      };
    },
  },
  {
    kind: "fixed",
    id: "4e_algo_modifier_fixed_2_corriger_egalite",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_modifier",
    difficulty: 3,
    theme: "neutral",
    text: "Un programme doit réagir si score est « au moins 10 », mais il utilise « score > 10 ». Quelle correction faut-il faire ?",
    format: "qcm",
    choices: [
      "remplacer par « score ≥ 10 »",
      "remplacer par « score < 10 »",
      "supprimer la condition",
      "remplacer par « score = 10 »",
    ],
    expected: ["remplacer par « score ≥ 10 »"],
    comparator: "mcq_exact",
    hint: "« au moins 10 » inclut 10.",
    explanation:
      "Définition : « au moins 10 » signifie supérieur ou égal à 10.\n\n" +
      "Méthode : on inclut le cas d’égalité.\n\n" +
      "Exécution : « score > 10 » exclut 10, ce qui est faux.\n\n" +
      "Conclusion : on corrige en « score ≥ 10 ».",
    tags: ["algo_programmation", "modifier", "correction", "qcm"],
  },
  {
    kind: "fixed",
    id: "4e_algo_modifier_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_modifier",
    difficulty: 3,
    theme: "neutral",
    text: "Explique la méthode pour modifier un programme afin de changer son seuil de réussite.",
    format: "open",
    expected: ["condition", "seuil", "remplacer"],
    comparator: "contains_keyword",
    hint: "On repère le paramètre à changer.",
    explanation:
      "Définition : modifier un programme, c’est ajuster un paramètre sans tout réécrire.\n\n" +
      "Méthode : on repère la condition contenant le seuil et on remplace la valeur.\n\n" +
      "Exécution : on vérifie ensuite avec quelques scores.\n\n" +
      "Conclusion : on remplace le seuil dans la condition.",
    tags: ["algo_programmation", "modifier", "open"],
  },

  // ---------- ALGO_DEFIS ----------
  {
    kind: "fixed",
    id: "4e_algo_defi_fixed_1_trace",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 4,
    theme: "neutral",
    text: "score vaut 0. On répète 3 fois « ajouter 4 à score ». Quelle est la valeur finale de score ?",
    format: "qcm",
    choices: ["12", "7", "4", "3"],
    expected: ["12"],
    comparator: "mcq_exact",
    hint: "4 ajouté 3 fois.",
    explanation:
      "Définition : une boucle répète une instruction plusieurs fois.\n\n" +
      "Méthode : on ajoute 4 à chaque tour, 3 fois.\n\n" +
      "Exécution : 0 + 4 + 4 + 4 = 12.\n\n" +
      "Conclusion : score vaut 12.",
    tags: ["algo_programmation", "defi", "boucle", "qcm"],
    canvas: scratchCanvas("Boucle simple", [
      { type: "event" },
      { type: "set_variable", variable: "score", value: 0 },
      {
        type: "repeat",
        times: 3,
        children: [{ type: "change_variable", variable: "score", value: 4 }],
      },
    ]),
  },
  {
    kind: "fixed",
    id: "4e_algo_defi_fixed_2_role_variable",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un programme, à quoi sert une variable comme « score » ?",
    format: "qcm",
    choices: [
      "à mémoriser une valeur qui peut changer",
      "à dessiner une figure",
      "à effacer l’écran",
      "à arrêter le programme",
    ],
    expected: ["à mémoriser une valeur qui peut changer"],
    comparator: "mcq_exact",
    hint: "Une variable garde une valeur en mémoire.",
    explanation:
      "Définition : une variable mémorise une valeur qui peut évoluer.\n\n" +
      "Méthode : on l’initialise puis on la modifie.\n\n" +
      "Exécution : score change au fil du programme.\n\n" +
      "Conclusion : une variable sert à mémoriser une valeur qui peut changer.",
    tags: ["algo_programmation", "defi", "variable", "qcm"],
  },
  {
    kind: "template",
    id: "4e_algo_defi_tpl_3_score_final",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule la valeur de départ plus les ajouts de la boucle.",
    tags: ["algo_programmation", "defi", "variable", "boucle", "template", "canvas"],
    generate: () => {
      const depart = randomChoice([1, 2, 5]);
      const ajout = randomChoice([2, 3, 4]);
      const fois = randomChoice([3, 4, 5]);
      const final = depart + ajout * fois;
      return {
        text: `score vaut ${depart}. On répète ${fois} fois « ajouter ${ajout} à score ». Quelle est la valeur finale de score ?`,
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation:
          "Définition : la boucle ajoute plusieurs fois la même valeur.\n\n" +
          `Méthode : score = départ + ajout × nombre de tours.\n\n` +
          `Exécution : ${depart} + ${ajout} × ${fois} = ${final}.\n\n` +
          `Conclusion : score vaut ${final}.`,
        canvas: scratchCanvas("Variable + boucle", [
          { type: "event" },
          { type: "set_variable", variable: "score", value: depart },
          {
            type: "repeat",
            times: fois,
            children: [{ type: "change_variable", variable: "score", value: ajout }],
          },
        ]),
      };
    },
  },
  {
    kind: "template",
    id: "4e_algo_defi_tpl_4_message",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule score, puis teste la condition.",
    tags: ["algo_programmation", "defi", "condition", "template", "canvas"],
    generate: () => {
      const depart = randomChoice([0, 2, 4]);
      const ajout = randomChoice([2, 3]);
      const fois = randomChoice([2, 3, 4]);
      const seuil = randomChoice([8, 10, 12]);
      const final = depart + ajout * fois;
      const message = final >= seuil ? "Gagné" : "Perdu";
      return {
        text:
          `score vaut ${depart}. On répète ${fois} fois « ajouter ${ajout} à score », ` +
          `puis on teste « score ≥ ${seuil} ». Quel message s’affiche ?`,
        format: "qcm",
        choices: shuffle(["Gagné", "Perdu"]),
        expected: [message],
        comparator: "mcq_exact",
        explanation:
          "Définition : on combine boucle, variable et condition.\n\n" +
          "Méthode : on calcule la valeur finale, puis on teste la condition.\n\n" +
          `Exécution : score = ${depart} + ${ajout} × ${fois} = ${final}. ${final} ≥ ${seuil} est ${final >= seuil ? "vrai" : "faux"}.\n\n` +
          `Conclusion : le message affiché est « ${message} ».`,
        canvas: scratchCanvas("Boucle + condition", [
          { type: "event" },
          { type: "set_variable", variable: "score", value: depart },
          {
            type: "repeat",
            times: fois,
            children: [{ type: "change_variable", variable: "score", value: ajout }],
          },
          {
            type: "if_else",
            condition: `score >= ${seuil}`,
            children: [{ type: "say", text: "Gagné" }],
            elseChildren: [{ type: "say", text: "Perdu" }],
          },
        ]),
      };
    },
  },
  {
    kind: "template",
    id: "4e_algo_defi_tpl_5_debug",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare l’objectif à la condition écrite.",
    tags: ["algo_programmation", "defi", "debug", "template"],
    generate: () => {
      const seuil = randomChoice([10, 12, 15]);
      return {
        text:
          `Objectif : afficher « Trop bas » si score est strictement inférieur à ${seuil}. ` +
          `Le programme utilise « score ≤ ${seuil} ». Quelle est l’erreur ?`,
        format: "qcm",
        choices: shuffle([
          `il inclut à tort le cas où score vaut ${seuil}`,
          "il n’affiche jamais le message",
          "il ajoute des points en trop",
          "il ne contient pas de condition",
        ]),
        expected: [`il inclut à tort le cas où score vaut ${seuil}`],
        comparator: "mcq_exact",
        explanation:
          "Définition : « strictement inférieur » exclut l’égalité.\n\n" +
          "Méthode : on compare l’objectif et la condition.\n\n" +
          `Exécution : « score ≤ ${seuil} » accepte score = ${seuil}, ce qui ne doit pas arriver.\n\n` +
          "Conclusion : l’erreur est l’inclusion du cas d’égalité (il fallait « < »).",
      };
    },
  },
  {
    kind: "template",
    id: "4e_algo_defi_tpl_6_double_boucle",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Additionne les ajouts des deux boucles.",
    tags: ["algo_programmation", "defi", "variable", "boucle", "template", "canvas"],
    generate: () => {
      const a1 = randomChoice([2, 3]);
      const f1 = randomChoice([2, 3]);
      const a2 = randomChoice([1, 4]);
      const f2 = randomChoice([2, 3]);
      const final = a1 * f1 + a2 * f2;
      return {
        text:
          `score vaut 0. On répète ${f1} fois « ajouter ${a1} », ` +
          `puis on répète ${f2} fois « ajouter ${a2} ». Quelle est la valeur finale de score ?`,
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation:
          "Définition : deux boucles successives ajoutent chacune leur part.\n\n" +
          "Méthode : on calcule chaque boucle puis on additionne.\n\n" +
          `Exécution : ${a1} × ${f1} + ${a2} × ${f2} = ${a1 * f1} + ${a2 * f2} = ${final}.\n\n` +
          `Conclusion : score vaut ${final}.`,
        canvas: scratchCanvas("Deux boucles", [
          { type: "event" },
          { type: "set_variable", variable: "score", value: 0 },
          { type: "repeat", times: f1, children: [{ type: "change_variable", variable: "score", value: a1 }] },
          { type: "repeat", times: f2, children: [{ type: "change_variable", variable: "score", value: a2 }] },
        ]),
      };
    },
  },
  {
    kind: "fixed",
    id: "4e_algo_defi_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi il est important de tester un programme avec plusieurs valeurs.",
    format: "open",
    expected: ["tester", "valeurs", "erreur"],
    comparator: "contains_keyword",
    hint: "Une seule valeur ne montre pas toutes les erreurs.",
    explanation:
      "Définition : tester, c’est exécuter le programme sur des cas variés.\n\n" +
      "Méthode : on essaie plusieurs valeurs, y compris les cas limites (égalité).\n\n" +
      "Exécution : certaines erreurs n’apparaissent qu’à la limite.\n\n" +
      "Conclusion : tester plusieurs valeurs permet de repérer les erreurs cachées.",
    tags: ["algo_programmation", "defi", "open"],
  },
];
