// lib/tutor-v4/question-banks/maths/3e/algorithmique.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function scratchCanvas(
  title: string,
  blocks: any[],
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
     CONDITIONS COMPLEXES
  ========================= */

  {
    kind: "fixed",
    id: "3e_algo_conditions_fixed_1_si_sinon",
    niveau: "3e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_conditions_complexes",
    difficulty: 2,
    theme: "neutral",
    text:
      "Que se passe-t-il si la condition d’un bloc “si / sinon” est fausse ?",
    format: "qcm",
    choices: shuffle([
      "Le bloc sinon est exécuté",
      "Le programme s’arrête",
      "La variable disparaît",
      "Le programme recommence",
    ]),
    expected: ["Le bloc sinon est exécuté"],
    comparator: "mcq_exact",
    hint: "Le bloc “sinon” sert précisément à traiter le cas faux.",
    explanation:
      "Définition : une condition permet au programme de choisir un comportement.\n\n" +
      "Méthode : si la condition est vraie, le premier bloc s’exécute ; sinon, le second.\n\n" +
      "Exécution : quand la condition est fausse, le programme utilise le bloc “sinon”.\n\n" +
      "Conclusion : le bloc sinon est exécuté.",
    tags: ["algorithmique", "condition", "if_else", "scratch"],
    canvas: scratchCanvas("Condition si / sinon", [
      { type: "event" },
      {
        type: "if_else",
        condition: "score > 10",
        children: [{ type: "say", text: "Bravo" }],
        elseChildren: [{ type: "say", text: "Continue" }],
      },
    ]),
  },

  {
    kind: "template",
    id: "3e_algo_conditions_tpl_2_message",
    niveau: "3e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_conditions_complexes",
    difficulty: 3,
    theme: "neutral",
    hint: "Teste la condition avant de choisir le message.",
    tags: ["algorithmique", "condition", "template", "canvas"],
    generate: () => {
      const seuil = randomChoice([10, 12, 15]);
      const score = randomChoice([8, 10, 12, 14, 16]);

      const message =
        score > seuil ? "Bravo" : "Continue";

      return {
        text:
          `Le score vaut ${score}. ` +
          `Le programme teste “score > ${seuil}”. ` +
          "Quel message est affiché ?",
        format: "qcm",
        choices: shuffle(["Bravo", "Continue"]),
        expected: [message],
        comparator: "mcq_exact",
        explanation:
          "Définition : une condition compare deux valeurs.\n\n" +
          "Méthode : on vérifie si score est strictement supérieur au seuil.\n\n" +
          `Exécution : ${score} ${
            score > seuil ? ">" : "≤"
          } ${seuil}.\n\n` +
          `Conclusion : le programme affiche “${message}”.`,
        canvas: scratchCanvas("Tester une condition", [
          { type: "event" },
          { type: "set_variable", variable: "score", value: score },
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

  /* =========================
     VARIABLES ET BOUCLES
  ========================= */

  {
    kind: "template",
    id: "3e_algo_variables_tpl_1_boucle",
    niveau: "3e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_variables_boucles",
    difficulty: 3,
    theme: "neutral",
    hint: "La variable augmente à chaque répétition.",
    tags: ["algorithmique", "variable", "boucle", "template", "canvas"],
    generate: () => {
      const depart = randomChoice([0, 2, 5]);
      const ajout = randomChoice([2, 3, 4]);
      const fois = randomChoice([3, 4, 5]);

      const final = depart + ajout * fois;

      return {
        text:
          `score vaut ${depart}. ` +
          `On ajoute ${ajout} à score ${fois} fois. ` +
          "Quelle est la valeur finale de score ?",
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation:
          "Définition : une boucle répète plusieurs fois la même action.\n\n" +
          "Méthode : on ajoute la même valeur à chaque répétition.\n\n" +
          `Exécution : ${depart} + ${ajout} × ${fois} = ${final}.\n\n` +
          `Conclusion : la valeur finale est ${final}.`,
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
          { type: "say", text: "score" },
        ]),
      };
    },
  },

  /* =========================
     PROGRAMMES DE CALCUL
  ========================= */

  {
    kind: "template",
    id: "3e_algo_programme_tpl_1_calcul",
    niveau: "3e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_programme_calcul",
    difficulty: 4,
    theme: "neutral",
    hint: "Suis les blocs dans l’ordre.",
    tags: ["algorithmique", "programme_calcul", "template", "canvas"],
    generate: () => {
      const x = randomChoice([2, 3, 4, 5]);

      const resultat = (x + 3) * 2;

      return {
        text:
          `Le joueur choisit ${x}. ` +
          "Quel résultat affiche le programme ?",
        format: "short",
        expected: [String(resultat)],
        comparator: "number_equal",
        explanation:
          "Définition : un programme de calcul applique des opérations dans un ordre précis.\n\n" +
          "Méthode : on suit chaque instruction l’une après l’autre.\n\n" +
          `Exécution : (${x} + 3) × 2 = ${resultat}.\n\n` +
          `Conclusion : le résultat affiché est ${resultat}.`,
        canvas: scratchCanvas("Programme de calcul", [
          { type: "event" },
          { type: "ask", text: "Choisis un nombre" },
          { type: "set_variable", variable: "x", value: x },
          {
            type: "change_variable",
            variable: "x",
            value: 3,
          },
          {
            type: "set_variable",
            variable: "x",
            value: `${x + 3} × 2`,
          },
          { type: "say", text: String(resultat) },
        ]),
      };
    },
  },

  /* =========================
     DEBUG
  ========================= */

  {
    kind: "fixed",
    id: "3e_algo_debug_fixed_1_erreur_condition",
    niveau: "3e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_debug",
    difficulty: 4,
    theme: "neutral",
    text:
      "Le programme doit accepter les scores supérieurs ou égaux à 10, mais utilise “score > 10”. Quel problème apparaît ?",
    format: "qcm",
    choices: shuffle([
      "Le score 10 est refusé",
      "Tous les scores sont acceptés",
      "Le programme boucle",
      "La variable disparaît",
    ]),
    expected: ["Le score 10 est refusé"],
    comparator: "mcq_exact",
    hint: "“Supérieur ou égal” est différent de “strictement supérieur”.",
    explanation:
      "Définition : un bug logique apparaît quand la condition ne correspond pas à l’objectif.\n\n" +
      "Méthode : on compare l’énoncé et le test utilisé.\n\n" +
      "Exécution : avec “score > 10”, le score 10 ne fonctionne pas.\n\n" +
      "Conclusion : le score 10 est refusé.",
    tags: ["algorithmique", "debug", "condition", "scratch"],
    canvas: scratchCanvas("Corriger une condition", [
      { type: "event" },
      {
        type: "if_else",
        condition: "score > 10",
        children: [{ type: "say", text: "Accepté" }],
        elseChildren: [{ type: "say", text: "Refusé" }],
      },
    ]),
  },

  /* =========================
     GÉNÉRALISER
  ========================= */

  {
    kind: "template",
    id: "3e_algo_generaliser_tpl_1_expression",
    niveau: "3e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_generaliser",
    difficulty: 5,
    theme: "neutral",
    hint: "Traduis les blocs sous forme littérale.",
    tags: ["algorithmique", "generaliser", "expression", "template", "canvas"],
    generate: () => {
      const ajout = randomChoice([2, 3, 5]);
      const mult = randomChoice([2, 4]);

      return {
        text:
          `On choisit un nombre x. ` +
          `Le programme ajoute ${ajout} puis multiplie par ${mult}. ` +
          "Quelle expression obtient-on ?",
        format: "qcm",
        choices: shuffle([
          `${mult}(x + ${ajout})`,
          `${mult}x + ${ajout}`,
          `x + ${ajout * mult}`,
          `${mult}x - ${ajout}`,
        ]),
        expected: [`${mult}(x + ${ajout})`],
        comparator: "mcq_exact",
        explanation:
          "Définition : généraliser consiste à écrire un calcul avec une variable.\n\n" +
          "Méthode : on respecte l’ordre des opérations du programme.\n\n" +
          `Exécution : on ajoute ${ajout} à x puis on multiplie le tout par ${mult}.\n\n` +
          `Conclusion : l’expression obtenue est ${mult}(x + ${ajout}).`,
        canvas: scratchCanvas("Généraliser un programme", [
          { type: "event" },
          { type: "ask", text: "Choisis un nombre" },
          { type: "set_variable", variable: "x", value: "réponse" },
          {
            type: "change_variable",
            variable: "x",
            value: ajout,
          },
          {
            type: "operator",
            text: `multiplier par ${mult}`,
          },
        ]),
      };
    },
  },

  /* =========================
     DÉFIS
  ========================= */

  {
    kind: "fixed",
    id: "3e_algo_defis_open_1_methode",
    niveau: "3e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_defis",
    difficulty: 5,
    theme: "neutral",
    text:
      "Explique une méthode pour analyser un programme Scratch contenant variables, boucle et condition.",
    format: "open",
    expected: ["variable", "boucle", "condition", "ordre"],
    comparator: "contains_keyword",
    hint: "Analyse le programme étape par étape.",
    explanation:
      "Définition : analyser un programme consiste à prévoir son comportement.\n\n" +
      "Méthode : on suit les blocs dans l’ordre : valeur initiale, effet des boucles, puis test des conditions.\n\n" +
      "Exécution : on met à jour les variables après chaque instruction.\n\n" +
      "Conclusion : cette méthode permet de comprendre le résultat du programme.",
    tags: ["algorithmique", "defi", "open", "scratch"],
  },
    {
    kind: "template",
    id: "3e_algo_conditions_tpl_3_double_test",
    niveau: "3e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_conditions_complexes",
    difficulty: 3,
    theme: "neutral",
    hint: "Il faut suivre le premier test, puis éventuellement le second.",
    tags: ["algorithmique", "condition", "if_else", "double_test", "template", "canvas"],
    generate: () => {
      const x = randomChoice([-4, -1, 0, 3, 7]);

      let message = "nul";
      if (x > 0) message = "positif";
      else if (x < 0) message = "négatif";

      return {
        text: `La variable x vaut ${x}. Quel message le programme affiche-t-il ?`,
        format: "qcm",
        choices: shuffle(["positif", "négatif", "nul"]),
        expected: [message],
        comparator: "mcq_exact",
        explanation:
          "Définition : des conditions imbriquées permettent de distinguer plusieurs cas.\n\n" +
          "Méthode : on teste d’abord si x est positif, sinon on teste s’il est négatif.\n\n" +
          `Exécution : x vaut ${x}, donc le message affiché est “${message}”.\n\n` +
          `Conclusion : le programme affiche “${message}”.`,
        canvas: scratchCanvas("Signe d’un nombre", [
          { type: "event" },
          { type: "set_variable", variable: "x", value: x },
          {
            type: "if_else",
            condition: "x > 0",
            children: [{ type: "say", text: "positif" }],
            elseChildren: [
              {
                type: "if_else",
                condition: "x < 0",
                children: [{ type: "say", text: "négatif" }],
                elseChildren: [{ type: "say", text: "nul" }],
              },
            ],
          },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "3e_algo_conditions_tpl_4_intervalle",
    niveau: "3e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_conditions_complexes",
    difficulty: 4,
    theme: "neutral",
    hint: "Le nombre doit vérifier les deux conditions de l’intervalle.",
    tags: ["algorithmique", "condition", "intervalle", "template", "canvas"],
    generate: () => {
      const x = randomChoice([3, 5, 8, 10, 13, 15]);
      const min = 5;
      const max = 12;
      const ok = x > min && x < max;
      const message = ok ? "dans la zone" : "hors zone";

      return {
        text: `On veut savoir si x est strictement entre ${min} et ${max}. Si x = ${x}, quel message est affiché ?`,
        format: "qcm",
        choices: shuffle(["dans la zone", "hors zone"]),
        expected: [message],
        comparator: "mcq_exact",
        explanation:
          "Définition : une condition d’intervalle vérifie deux comparaisons.\n\n" +
          "Méthode : x doit être plus grand que la borne basse et plus petit que la borne haute.\n\n" +
          `Exécution : ${x} > ${min} et ${x} < ${max} est ${ok ? "vrai" : "faux"}.\n\n` +
          `Conclusion : le programme affiche “${message}”.`,
        canvas: scratchCanvas("Condition d’intervalle", [
          { type: "event" },
          { type: "set_variable", variable: "x", value: x },
          {
            type: "if_else",
            condition: `${min} < x < ${max}`,
            children: [{ type: "say", text: "dans la zone" }],
            elseChildren: [{ type: "say", text: "hors zone" }],
          },
        ]),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_algo_conditions_fixed_2_piege_strict_large",
    niveau: "3e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_conditions_complexes",
    difficulty: 4,
    theme: "neutral",
    text:
      "Un programme doit accepter les valeurs comprises entre 0 et 10 inclus. Il utilise la condition “x > 0 et x < 10”. Est-ce correct ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le mot inclus signifie que 0 et 10 doivent être acceptés.",
    explanation:
      "Définition : une condition stricte exclut les bornes.\n\n" +
      "Méthode : on compare l’objectif avec la condition utilisée.\n\n" +
      "Exécution : avec x > 0 et x < 10, les valeurs 0 et 10 sont refusées.\n\n" +
      "Conclusion : ce n’est pas correct.",
    tags: ["algorithmique", "condition", "intervalle", "piege", "qcm"],
    canvas: scratchCanvas("Bornes exclues", [
      { type: "event" },
      {
        type: "if_else",
        condition: "x > 0 et x < 10",
        children: [{ type: "say", text: "accepté" }],
        elseChildren: [{ type: "say", text: "refusé" }],
      },
    ]),
  },
    {
    kind: "template",
    id: "3e_algo_variables_tpl_2_boucle_condition",
    niveau: "3e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_variables_boucles",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule d’abord la valeur finale de score, puis teste la condition.",
    tags: ["algorithmique", "variable", "boucle", "condition", "template", "canvas"],
    generate: () => {
      const depart = randomChoice([0, 3, 5]);
      const ajout = randomChoice([2, 4, 5]);
      const fois = randomChoice([3, 4, 5]);
      const seuil = randomChoice([12, 15, 20]);

      const final = depart + ajout * fois;
      const message = final > seuil ? "objectif atteint" : "objectif non atteint";

      return {
        text:
          `score vaut ${depart}. On répète ${fois} fois : ajouter ${ajout} à score. ` +
          `Puis on teste “score > ${seuil}”. Quel message est affiché ?`,
        format: "qcm",
        choices: shuffle(["objectif atteint", "objectif non atteint"]),
        expected: [message],
        comparator: "mcq_exact",
        explanation:
          "Définition : un programme peut combiner variable, boucle et condition.\n\n" +
          "Méthode : on calcule d’abord l’effet de la boucle, puis on teste la condition.\n\n" +
          `Exécution : score = ${depart} + ${ajout} × ${fois} = ${final}. ` +
          `${final} > ${seuil} est ${final > seuil ? "vrai" : "faux"}.\n\n` +
          `Conclusion : le message affiché est “${message}”.`,
        canvas: scratchCanvas("Boucle puis condition", [
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
            children: [{ type: "say", text: "objectif atteint" }],
            elseChildren: [{ type: "say", text: "objectif non atteint" }],
          },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "3e_algo_variables_tpl_3_compteur",
    niveau: "3e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_variables_boucles",
    difficulty: 3,
    theme: "neutral",
    hint: "Le compteur augmente de 1 à chaque répétition.",
    tags: ["algorithmique", "variable", "compteur", "boucle", "template", "canvas"],
    generate: () => {
      const fois = randomChoice([4, 5, 6, 8]);

      return {
        text:
          `Un compteur commence à 0. On répète ${fois} fois : ajouter 1 au compteur. ` +
          "Quelle est la valeur finale du compteur ?",
        format: "short",
        expected: [String(fois)],
        comparator: "number_equal",
        explanation:
          "Définition : un compteur est une variable qui augmente régulièrement.\n\n" +
          "Méthode : on ajoute 1 à chaque répétition.\n\n" +
          `Exécution : après ${fois} répétitions, le compteur vaut ${fois}.\n\n` +
          `Conclusion : la valeur finale du compteur est ${fois}.`,
        canvas: scratchCanvas("Compteur", [
          { type: "event" },
          { type: "set_variable", variable: "compteur", value: 0 },
          {
            type: "repeat",
            times: fois,
            children: [
              { type: "change_variable", variable: "compteur", value: 1 },
            ],
          },
          { type: "say", text: "compteur" },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "3e_algo_variables_tpl_4_suite_arithmetique",
    niveau: "3e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_variables_boucles",
    difficulty: 4,
    theme: "neutral",
    hint: "La variable augmente toujours de la même quantité.",
    tags: ["algorithmique", "variable", "boucle", "suite", "template", "canvas"],
    generate: () => {
      const u0 = randomChoice([2, 5, 10]);
      const r = randomChoice([3, 4, 6]);
      const n = randomChoice([3, 4, 5]);

      const final = u0 + n * r;

      return {
        text:
          `u vaut ${u0}. On répète ${n} fois : ajouter ${r} à u. ` +
          "Quelle est la valeur finale de u ?",
        format: "short",
        expected: [String(final)],
        comparator: "number_equal",
        explanation:
          "Définition : une variable modifiée régulièrement peut représenter une suite arithmétique.\n\n" +
          "Méthode : on ajoute la même quantité à chaque répétition.\n\n" +
          `Exécution : u = ${u0} + ${n} × ${r} = ${final}.\n\n` +
          `Conclusion : la valeur finale de u est ${final}.`,
        canvas: scratchCanvas("Variable répétée", [
          { type: "event" },
          { type: "set_variable", variable: "u", value: u0 },
          {
            type: "repeat",
            times: n,
            children: [{ type: "change_variable", variable: "u", value: r }],
          },
          { type: "say", text: "u" },
        ]),
      };
    },
  },
    {
    kind: "fixed",
    id: "3e_algo_variables_fixed_1_piege_mettre_ajouter",
    niveau: "3e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_variables_boucles",
    difficulty: 4,
    theme: "neutral",
    text:
      "score vaut 12. Le programme exécute “mettre score à 5”. Quelle est la valeur finale de score ?",
    format: "qcm",
    choices: shuffle(["5", "12", "17", "7"]),
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Le bloc “mettre à” remplace l’ancienne valeur.",
    explanation:
      "Définition : une variable peut être remplacée ou modifiée.\n\n" +
      "Méthode : “mettre score à 5” remplace complètement l’ancienne valeur.\n\n" +
      "Exécution : même si score valait 12, il devient 5.\n\n" +
      "Conclusion : la valeur finale est 5.",
    tags: ["algorithmique", "variable", "piege", "mettre", "ajouter"],
    canvas: scratchCanvas("Mettre ou ajouter ?", [
      { type: "event" },
      { type: "set_variable", variable: "score", value: 12 },
      { type: "set_variable", variable: "score", value: 5 },
      { type: "say", text: "score" },
    ]),
  },

  {
    kind: "fixed",
    id: "3e_algo_variables_open_1_expliquer",
    niveau: "3e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_variables_boucles",
    difficulty: 5,
    theme: "neutral",
    text:
      "Explique comment suivre une variable qui change dans une boucle.",
    format: "open",
    expected: ["valeur", "départ", "boucle", "répétition"],
    comparator: "contains_keyword",
    hint: "Commence par la valeur de départ, puis applique chaque répétition.",
    explanation:
      "Définition : une variable peut changer plusieurs fois pendant l’exécution d’un programme.\n\n" +
      "Méthode : on note la valeur de départ, puis on applique la modification à chaque répétition.\n\n" +
      "Exécution : si on ajoute 3 pendant 4 répétitions, la variable augmente de 12.\n\n" +
      "Conclusion : suivre une variable demande de respecter l’ordre des blocs.",
    tags: ["algorithmique", "variable", "boucle", "open", "methode"],
  },

  /* =========================
     PROGRAMMES DE CALCUL - SUITE
  ========================= */

  {
    kind: "template",
    id: "3e_algo_programme_tpl_2_expression_litterale",
    niveau: "3e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_programme_calcul",
    difficulty: 4,
    theme: "neutral",
    hint: "Traduis chaque étape avec x.",
    tags: ["algorithmique", "programme_calcul", "expression_litterale", "template", "canvas"],
    generate: () => {
      const a = randomChoice([2, 3, 4]);
      const b = randomChoice([5, 7, 10]);

      return {
        text:
          `On choisit un nombre x, on le multiplie par ${a}, puis on ajoute ${b}. ` +
          "Quelle expression littérale correspond au programme ?",
        format: "qcm",
        choices: shuffle([
          `${a}x + ${b}`,
          `${a}(x + ${b})`,
          `x + ${a} + ${b}`,
          `${b}x + ${a}`,
        ]),
        expected: [`${a}x + ${b}`],
        comparator: "mcq_exact",
        explanation:
          "Définition : un programme de calcul peut être traduit par une expression littérale.\n\n" +
          "Méthode : on remplace le nombre choisi par x et on suit les étapes.\n\n" +
          `Exécution : multiplier x par ${a} donne ${a}x, puis ajouter ${b} donne ${a}x + ${b}.\n\n` +
          `Conclusion : l’expression est ${a}x + ${b}.`,
        canvas: scratchCanvas("Programme vers expression", [
          { type: "event" },
          { type: "ask", text: "Choisis un nombre" },
          { type: "set_variable", variable: "x", value: "réponse" },
          { type: "operator", left: a, operator: "×", right: "x" },
          { type: "operator", left: `${a}x`, operator: "+", right: b },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "3e_algo_programme_tpl_3_retrouver_nombre",
    niveau: "3e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_programme_calcul",
    difficulty: 5,
    theme: "neutral",
    hint: "Tu peux résoudre l’équation associée.",
    tags: ["algorithmique", "programme_calcul", "equation", "template", "canvas"],
    generate: () => {
      const a = randomChoice([2, 3, 4]);
      const b = randomChoice([5, 7, 10]);
      const x = randomChoice([2, 3, 4, 5]);
      const result = a * x + b;

      return {
        text:
          `Un programme calcule ${a}x + ${b}. ` +
          `Le résultat affiché est ${result}. Quel était le nombre x choisi ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation:
          "Définition : retrouver le nombre de départ revient à résoudre une équation.\n\n" +
          "Méthode : on écrit l’équation associée au programme.\n\n" +
          `Exécution : ${a}x + ${b} = ${result}. Donc ${a}x = ${result - b}, puis x = ${x}.\n\n` +
          `Conclusion : le nombre choisi était ${x}.`,
        canvas: scratchCanvas("Retrouver le nombre choisi", [
          { type: "event" },
          { type: "ask", text: "Choisis un nombre" },
          { type: "set_variable", variable: "x", value: "réponse" },
          { type: "operator", left: a, operator: "×", right: "x" },
          { type: "operator", left: `${a}x`, operator: "+", right: b },
          { type: "say", text: String(result) },
        ]),
      };
    },
  },
    {
    kind: "template",
    id: "3e_algo_programme_tpl_4_parentheses",
    niveau: "3e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_programme_calcul",
    difficulty: 4,
    theme: "neutral",
    hint: "Si on ajoute d’abord puis on multiplie, il faut des parenthèses.",
    tags: ["algorithmique", "programme_calcul", "parentheses", "template", "canvas"],
    generate: () => {
      const a = randomChoice([2, 3, 4]);
      const b = randomChoice([3, 5, 6]);

      return {
        text:
          `On choisit un nombre x, on ajoute ${b}, puis on multiplie le résultat par ${a}. ` +
          "Quelle expression correspond au programme ?",
        format: "qcm",
        choices: shuffle([
          `${a}(x + ${b})`,
          `${a}x + ${b}`,
          `x + ${a} × ${b}`,
          `${a}x - ${b}`,
        ]),
        expected: [`${a}(x + ${b})`],
        comparator: "mcq_exact",
        explanation:
          "Définition : les parenthèses indiquent qu’une opération doit être faite avant une autre.\n\n" +
          "Méthode : on suit exactement l’ordre du programme.\n\n" +
          `Exécution : on calcule d’abord x + ${b}, puis on multiplie tout par ${a}.\n\n` +
          `Conclusion : l’expression est ${a}(x + ${b}).`,
        canvas: scratchCanvas("Programme avec parenthèses", [
          { type: "event" },
          { type: "ask", text: "Choisis un nombre" },
          { type: "set_variable", variable: "x", value: "réponse" },
          { type: "change_variable", variable: "x", value: b },
          { type: "operator", left: a, operator: "×", right: `x` },
        ]),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_algo_programme_fixed_1_piege_ordre",
    niveau: "3e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_programme_calcul",
    difficulty: 4,
    theme: "neutral",
    text:
      "Un programme dit : choisir x, ajouter 4, puis multiplier par 3. Un élève écrit 3x + 4. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le programme ajoute 4 avant de multiplier.",
    explanation:
      "Définition : un programme de calcul doit être traduit en respectant l’ordre des opérations.\n\n" +
      "Méthode : on regarde quelle opération est effectuée en premier.\n\n" +
      "Exécution : on ajoute d’abord 4, puis on multiplie par 3 : cela donne 3(x + 4).\n\n" +
      "Conclusion : l’élève a tort.",
    tags: ["algorithmique", "programme_calcul", "piege", "parentheses", "qcm"],
    canvas: scratchCanvas("Piège d’ordre", [
      { type: "event" },
      { type: "ask", text: "Choisis un nombre" },
      { type: "set_variable", variable: "x", value: "réponse" },
      { type: "change_variable", variable: "x", value: 4 },
      { type: "operator", left: 3, operator: "×", right: "x" },
    ]),
  },

  /* =========================
     DEBUG - SUITE
  ========================= */

  {
    kind: "template",
    id: "3e_algo_debug_tpl_2_erreur_expression",
    niveau: "3e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_debug",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare l’objectif et l’expression utilisée.",
    tags: ["algorithmique", "debug", "expression", "template", "canvas"],
    generate: () => {
      const a = randomChoice([2, 3, 4]);
      const b = randomChoice([5, 6, 8]);

      return {
        text:
          `Objectif : ajouter ${b} à x, puis multiplier le résultat par ${a}. ` +
          `Le programme utilise l’expression ${a}x + ${b}. Quelle est l’erreur ?`,
        format: "qcm",
        choices: shuffle([
          "Il manque des parenthèses",
          "Il faut supprimer x",
          "Il faut remplacer + par -",
          "Il n’y a aucune erreur",
        ]),
        expected: ["Il manque des parenthèses"],
        comparator: "mcq_exact",
        explanation:
          "Définition : déboguer, c’est repérer pourquoi un programme ne respecte pas l’objectif.\n\n" +
          "Méthode : on traduit précisément l’objectif.\n\n" +
          `Exécution : ajouter ${b} puis multiplier par ${a} donne ${a}(x + ${b}), pas ${a}x + ${b}.\n\n` +
          "Conclusion : l’erreur vient des parenthèses manquantes.",
        canvas: scratchCanvas("Debug expression", [
          { type: "event" },
          { type: "operator", text: `objectif : ${a}(x + ${b})` },
          { type: "operator", text: `programme : ${a}x + ${b}` },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "3e_algo_debug_tpl_3_erreur_boucle",
    niveau: "3e",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_debug",
    difficulty: 5,
    theme: "neutral",
    hint: "Vérifie combien de fois la modification est répétée.",
    tags: ["algorithmique", "debug", "boucle", "variable", "template", "canvas"],
    generate: () => {
      const objectif = randomChoice([12, 15, 20]);
      const ajout = randomChoice([3, 5]);
      const bonnesFois = objectif / ajout;

      return {
        text:
          `Objectif : obtenir score = ${objectif} en partant de 0 et en ajoutant ${ajout} à chaque répétition. ` +
          `Combien de répétitions faut-il ?`,
        format: "short",
        expected: [String(bonnesFois)],
        comparator: "number_equal",
        explanation:
          "Définition : corriger une boucle demande de choisir le bon nombre de répétitions.\n\n" +
          "Méthode : on divise l’objectif par l’ajout à chaque répétition.\n\n" +
          `Exécution : ${objectif} ÷ ${ajout} = ${bonnesFois}.\n\n` +
          `Conclusion : il faut ${bonnesFois} répétitions.`,
        canvas: scratchCanvas("Debug boucle", [
          { type: "event" },
          { type: "set_variable", variable: "score", value: 0 },
          {
            type: "repeat",
            times: "?",
            children: [
              { type: "change_variable", variable: "score", value: ajout },
            ],
          },
          { type: "say", text: "score" },
        ]),
      };
    },
  },
  /* =========================
   DÉFIS / SYNTHÈSE
========================= */

{
  kind: "template",
  id: "3e_algo_defis_tpl_1_prediction_complete",
  niveau: "3e",
  matiere: "maths",
  notionId: "algorithmique",
  microId: "algo_defis",
  difficulty: 5,
  theme: "neutral",
  hint: "Suis le programme ligne par ligne.",
  tags: ["algorithmique", "defi", "synthese", "variables", "conditions", "boucles", "canvas"],
  generate: () => {
    const start = randomChoice([2, 4, 5]);
    const add = randomChoice([2, 3, 4]);
    const times = randomChoice([3, 4]);
    const seuil = randomChoice([12, 15]);

    const final = start + add * times;
    const message = final > seuil ? "gagné" : "perdu";

    return {
      text:
        `On initialise score à ${start}. ` +
        `On répète ${times} fois : ajouter ${add} à score. ` +
        `Puis si score > ${seuil}, afficher “gagné”, sinon afficher “perdu”. ` +
        "Quel message est affiché ?",
      format: "qcm",
      choices: shuffle(["gagné", "perdu"]),
      expected: [message],
      comparator: "mcq_exact",
      explanation:
        "Définition : un algorithme peut combiner variables, boucles et conditions.\n\n" +
        "Méthode : on calcule d’abord la variable finale puis on teste la condition.\n\n" +
        `Exécution : score = ${start} + ${add} × ${times} = ${final}. ` +
        `${final} > ${seuil} est ${final > seuil ? "vrai" : "faux"}.\n\n` +
        `Conclusion : le programme affiche “${message}”.`,
      canvas: scratchCanvas("Défi complet", [
        { type: "event" },
        { type: "set_variable", variable: "score", value: start },
        {
          type: "repeat",
          times,
          children: [
            {
              type: "change_variable",
              variable: "score",
              value: add,
            },
          ],
        },
        {
          type: "if_else",
          condition: `score > ${seuil}`,
          children: [{ type: "say", text: "gagné" }],
          elseChildren: [{ type: "say", text: "perdu" }],
        },
      ]),
    };
  },
},

{
  kind: "fixed",
  id: "3e_algo_defis_open_1_expliquer_bug",
  niveau: "3e",
  matiere: "maths",
  notionId: "algorithmique",
  microId: "algo_defis",
  difficulty: 5,
  theme: "neutral",
  text:
    "Explique comment repérer une erreur dans un programme Scratch.",
  format: "open",
  expected: ["variable", "condition", "boucle", "ordre"],
  comparator: "contains_keyword",
  hint: "Parle de l’ordre des instructions et des valeurs calculées.",
  explanation:
    "Définition : déboguer signifie rechercher une erreur dans un programme.\n\n" +
    "Méthode : on vérifie les variables, les conditions, les répétitions et l’ordre des blocs.\n\n" +
    "Exécution : on peut suivre les valeurs étape par étape pour repérer l’erreur.\n\n" +
    "Conclusion : un bon débogage consiste à tester méthodiquement chaque partie du programme.",
  tags: ["algorithmique", "debug", "open", "defi", "methode"],
},

{
  kind: "fixed",
  id: "3e_algo_defis_fixed_1_brevet_style",
  niveau: "3e",
  matiere: "maths",
  notionId: "algorithmique",
  microId: "algo_defis",
  difficulty: 5,
  theme: "neutral",
  text:
    "Pourquoi les boucles sont-elles utiles dans un programme ?",
  format: "qcm",
  choices: shuffle([
    "Elles évitent de répéter les mêmes instructions",
    "Elles rendent les calculs faux",
    "Elles suppriment les variables",
    "Elles empêchent les conditions",
  ]),
  expected: ["Elles évitent de répéter les mêmes instructions"],
  comparator: "mcq_exact",
  hint: "Pense aux instructions répétitives.",
  explanation:
    "Définition : une boucle répète automatiquement des instructions.\n\n" +
    "Méthode : on l’utilise quand plusieurs actions identiques doivent être exécutées.\n\n" +
    "Exécution : cela rend les programmes plus courts et plus faciles à modifier.\n\n" +
    "Conclusion : les boucles évitent de recopier plusieurs fois les mêmes blocs.",
  tags: ["algorithmique", "brevet", "boucle", "defi", "qcm"],
},
];