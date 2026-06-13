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
    id: "3e_algo_condition_fixed_1_si_sinon",
    niveau: "3e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_condition_complexe",
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
    tags: ["algo_programmation", "condition", "if_else", "scratch"],
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
    id: "3e_algo_condition_tpl_2_message",
    niveau: "3e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_condition_complexe",
    difficulty: 3,
    theme: "neutral",
    hint: "Teste la condition avant de choisir le message.",
    tags: ["algo_programmation", "condition", "template", "canvas"],
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
    id: "3e_algo_variable_tpl_1_boucle",
    niveau: "3e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_variable_boucle",
    difficulty: 3,
    theme: "neutral",
    hint: "La variable augmente à chaque répétition.",
    tags: ["algo_programmation", "variable", "boucle", "template", "canvas"],
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
    notionId: "algo_programmation",
    microId: "algo_programme_calcul",
    difficulty: 4,
    theme: "neutral",
    hint: "Suis les blocs dans l’ordre.",
    tags: ["algo_programmation", "programme_calcul", "template", "canvas"],
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
    id: "3e_algo_corriger_fixed_1_erreur_condition",
    niveau: "3e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_corriger",
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
    tags: ["algo_programmation", "correction", "condition", "scratch"],
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
    notionId: "algo_programmation",
    microId: "algo_generaliser",
    difficulty: 5,
    theme: "neutral",
    hint: "Traduis les blocs sous forme littérale.",
    tags: ["algo_programmation", "generaliser", "expression", "template", "canvas"],
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
    id: "3e_algo_defi_open_1_methode",
    niveau: "3e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
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
    tags: ["algo_programmation", "defi", "open", "scratch"],
  },
    {
    kind: "template",
    id: "3e_algo_condition_tpl_3_double_test",
    niveau: "3e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_condition_complexe",
    difficulty: 3,
    theme: "neutral",
    hint: "Il faut suivre le premier test, puis éventuellement le second.",
    tags: ["algo_programmation", "condition", "if_else", "double_test", "template", "canvas"],
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
    id: "3e_algo_condition_tpl_4_intervalle",
    niveau: "3e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_condition_complexe",
    difficulty: 4,
    theme: "neutral",
    hint: "Le nombre doit vérifier les deux conditions de l’intervalle.",
    tags: ["algo_programmation", "condition", "intervalle", "template", "canvas"],
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
    id: "3e_algo_condition_fixed_2_piege_strict_large",
    niveau: "3e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_condition_complexe",
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
    tags: ["algo_programmation", "condition", "intervalle", "piege", "qcm"],
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
    id: "3e_algo_variable_tpl_2_boucle_condition",
    niveau: "3e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_variable_boucle",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule d’abord la valeur finale de score, puis teste la condition.",
    tags: ["algo_programmation", "variable", "boucle", "condition", "template", "canvas"],
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
    id: "3e_algo_variable_tpl_3_compteur",
    niveau: "3e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_variable_boucle",
    difficulty: 3,
    theme: "neutral",
    hint: "Le compteur augmente de 1 à chaque répétition.",
    tags: ["algo_programmation", "variable", "compteur", "boucle", "template", "canvas"],
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
    id: "3e_algo_variable_tpl_4_suite_arithmetique",
    niveau: "3e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_variable_boucle",
    difficulty: 4,
    theme: "neutral",
    hint: "La variable augmente toujours de la même quantité.",
    tags: ["algo_programmation", "variable", "boucle", "suite", "template", "canvas"],
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
    id: "3e_algo_variable_fixed_1_piege_mettre_ajouter",
    niveau: "3e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_variable_boucle",
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
    tags: ["algo_programmation", "variable", "piege", "mettre", "ajouter"],
    canvas: scratchCanvas("Mettre ou ajouter ?", [
      { type: "event" },
      { type: "set_variable", variable: "score", value: 12 },
      { type: "set_variable", variable: "score", value: 5 },
      { type: "say", text: "score" },
    ]),
  },

  {
    kind: "fixed",
    id: "3e_algo_variable_open_1_expliquer",
    niveau: "3e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_variable_boucle",
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
    tags: ["algo_programmation", "variable", "boucle", "open", "methode"],
  },

  /* =========================
     PROGRAMMES DE CALCUL - SUITE
  ========================= */

  {
    kind: "template",
    id: "3e_algo_programme_tpl_2_expression_litterale",
    niveau: "3e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_programme_calcul",
    difficulty: 4,
    theme: "neutral",
    hint: "Traduis chaque étape avec x.",
    tags: ["algo_programmation", "programme_calcul", "expression_litterale", "template", "canvas"],
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
    notionId: "algo_programmation",
    microId: "algo_programme_calcul",
    difficulty: 5,
    theme: "neutral",
    hint: "Tu peux résoudre l’équation associée.",
    tags: ["algo_programmation", "programme_calcul", "equation", "template", "canvas"],
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
    notionId: "algo_programmation",
    microId: "algo_programme_calcul",
    difficulty: 4,
    theme: "neutral",
    hint: "Si on ajoute d’abord puis on multiplie, il faut des parenthèses.",
    tags: ["algo_programmation", "programme_calcul", "parentheses", "template", "canvas"],
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
    notionId: "algo_programmation",
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
    tags: ["algo_programmation", "programme_calcul", "piege", "parentheses", "qcm"],
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
    id: "3e_algo_corriger_tpl_2_erreur_expression",
    niveau: "3e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_corriger",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare l’objectif et l’expression utilisée.",
    tags: ["algo_programmation", "correction", "expression", "template", "canvas"],
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
    id: "3e_algo_corriger_tpl_3_erreur_boucle",
    niveau: "3e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_corriger",
    difficulty: 5,
    theme: "neutral",
    hint: "Vérifie combien de fois la modification est répétée.",
    tags: ["algo_programmation", "correction", "boucle", "variable", "template", "canvas"],
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
  id: "3e_algo_defi_tpl_1_prediction_complete",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_defi",
  difficulty: 5,
  theme: "neutral",
  hint: "Suis le programme ligne par ligne.",
  tags: ["algo_programmation", "defi", "synthese", "variable", "condition", "boucle", "canvas"],
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
  id: "3e_algo_defi_open_1_expliquer_bug",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_defi",
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
  tags: ["algo_programmation", "correction", "open", "defi", "methode"],
},

{
  kind: "fixed",
  id: "3e_algo_defi_fixed_1_brevet_style",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_defi",
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
  tags: ["algo_programmation", "brevet", "boucle", "defi", "qcm"],
},

/* =========================
   GÉNÉRALISER - COMPLÉMENTS
========================= */

{
  kind: "fixed",
  id: "3e_algo_generaliser_fixed_1_mult_ajout",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_generaliser",
  difficulty: 3,
  theme: "neutral",
  text: "On choisit un nombre $x$, on le multiplie par $4$, puis on ajoute $1$. Quelle expression généralise ce programme ?",
  format: "qcm",
  choices: shuffle(["$4x + 1$", "$4(x + 1)$", "$x + 4 + 1$", "$x + 5$"]),
  expected: ["$4x + 1$"],
  comparator: "mcq_exact",
  hint: "On multiplie d’abord, donc pas de parenthèses.",
  explanation:
    "Définition : généraliser, c’est écrire le calcul avec la variable $x$.\n\n" +
    "Méthode : on traduit chaque étape dans l’ordre.\n\n" +
    "Calcul : multiplier $x$ par $4$ donne $4x$, puis ajouter $1$ donne $4x + 1$.\n\n" +
    "Conclusion : l’expression est $4x + 1$.",
  tags: ["algo_programmation", "generaliser", "expression", "qcm"],
},

{
  kind: "fixed",
  id: "3e_algo_generaliser_fixed_2_ajout_mult",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_generaliser",
  difficulty: 3,
  theme: "neutral",
  text: "On choisit un nombre $x$, on ajoute $3$, puis on multiplie le résultat par $2$. Quelle expression généralise ce programme ?",
  format: "qcm",
  choices: shuffle(["$2(x + 3)$", "$2x + 3$", "$x + 6$", "$2x + 6x$"]),
  expected: ["$2(x + 3)$"],
  comparator: "mcq_exact",
  hint: "On ajoute avant de multiplier : il faut des parenthèses.",
  explanation:
    "Définition : généraliser, c’est écrire le calcul avec une variable en respectant l’ordre.\n\n" +
    "Méthode : on ajoute d’abord $3$, ce qui donne $x + 3$, puis on multiplie tout par $2$.\n\n" +
    "Calcul : on obtient $2(x + 3)$.\n\n" +
    "Conclusion : l’expression est $2(x + 3)$.",
  tags: ["algo_programmation", "generaliser", "parentheses", "qcm"],
},

{
  kind: "template",
  id: "3e_algo_generaliser_tpl_2_ax_b",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_generaliser",
  difficulty: 4,
  theme: "neutral",
  hint: "On multiplie d’abord, puis on ajoute.",
  tags: ["algo_programmation", "generaliser", "expression", "qcm", "template"],
  generate: () => {
    const a = randomChoice([2, 3, 5]);
    const b = randomChoice([4, 6, 7]);
    const correct = `$${a}x + ${b}$`;

    return {
      text: `On choisit un nombre $x$, on le multiplie par $${a}$, puis on ajoute $${b}$. Quelle expression généralise ce programme ?`,
      format: "qcm",
      choices: shuffle([correct, `$${a}(x + ${b})$`, `$x + ${a + b}$`, `$${b}x + ${a}$`]),
      expected: [correct],
      comparator: "mcq_exact",
      explanation:
        `Définition : généraliser, c’est traduire le programme avec la variable $x$.\n\n` +
        `Méthode : on respecte l’ordre des opérations.\n\n` +
        `Calcul : $x$ multiplié par $${a}$ donne $${a}x$, puis $+ ${b}$ donne $${a}x + ${b}$.\n\n` +
        `Conclusion : l’expression est $${a}x + ${b}$.`,
      canvas: scratchCanvas("Généraliser un programme", [
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
  id: "3e_algo_generaliser_tpl_3_a_xb",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_generaliser",
  difficulty: 4,
  theme: "neutral",
  hint: "On ajoute avant de multiplier : des parenthèses sont nécessaires.",
  tags: ["algo_programmation", "generaliser", "parentheses", "qcm", "template"],
  generate: () => {
    const a = randomChoice([2, 3, 4]);
    const b = randomChoice([3, 5, 6]);
    const correct = `$${a}(x + ${b})$`;

    return {
      text: `On choisit un nombre $x$, on ajoute $${b}$, puis on multiplie le résultat par $${a}$. Quelle expression généralise ce programme ?`,
      format: "qcm",
      choices: shuffle([correct, `$${a}x + ${b}$`, `$x + ${a * b}$`, `$${a}x - ${b}$`]),
      expected: [correct],
      comparator: "mcq_exact",
      explanation:
        `Définition : généraliser, c’est écrire le calcul avec $x$ en respectant l’ordre.\n\n` +
        `Méthode : on ajoute d’abord $${b}$ ($x + ${b}$), puis on multiplie par $${a}$.\n\n` +
        `Calcul : on obtient $${a}(x + ${b})$.\n\n` +
        `Conclusion : l’expression est $${a}(x + ${b})$.`,
      canvas: scratchCanvas("Généraliser avec parenthèses", [
        { type: "event" },
        { type: "ask", text: "Choisis un nombre" },
        { type: "set_variable", variable: "x", value: "réponse" },
        { type: "change_variable", variable: "x", value: b },
        { type: "operator", left: a, operator: "×", right: "x" },
      ]),
    };
  },
},

{
  kind: "template",
  id: "3e_algo_generaliser_tpl_4_motif",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_generaliser",
  difficulty: 4,
  theme: "neutral",
  hint: "Regarde de combien augmente le motif à chaque étape.",
  tags: ["algo_programmation", "generaliser", "motif", "suite", "qcm", "template"],
  generate: () => {
    const r = randomChoice([2, 3, 4]);
    const b = randomChoice([1, 2, 3]);
    const correct = `$${r}n + ${b}$`;

    return {
      text: `Une suite de motifs utilise des allumettes : le motif $1$ en utilise $${r + b}$, le motif $2$ en utilise $${2 * r + b}$, le motif $3$ en utilise $${3 * r + b}$. Combien d’allumettes pour le motif $n$ ?`,
      format: "qcm",
      choices: shuffle([correct, `$${b}n + ${r}$`, `$${r}n$`, `$n + ${r + b}$`]),
      expected: [correct],
      comparator: "mcq_exact",
      explanation:
        `Définition : généraliser un motif, c’est trouver une formule valable pour tout $n$.\n\n` +
        `Méthode : on cherche l’augmentation constante (le coefficient de $n$) et la valeur de départ.\n\n` +
        `Calcul : chaque motif ajoute $${r}$ allumettes, et il faut ajouter $${b}$ : la formule est $${r}n + ${b}$.\n\n` +
        `Conclusion : le motif $n$ utilise $${r}n + ${b}$ allumettes.`,
    };
  },
},

{
  kind: "template",
  id: "3e_algo_generaliser_tpl_5_evaluer",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_generaliser",
  difficulty: 5,
  theme: "neutral",
  hint: "Remplace $n$ par sa valeur dans la formule générale.",
  tags: ["algo_programmation", "generaliser", "evaluer", "template"],
  generate: () => {
    const r = randomChoice([2, 3, 4]);
    const b = randomChoice([1, 2, 5]);
    const n = randomChoice([6, 8, 10]);
    const total = r * n + b;

    return {
      text: `Un motif $n$ utilise $${r}n + ${b}$ allumettes. Combien en faut-il pour le motif ${n} ?`,
      format: "short",
      expected: [String(total)],
      comparator: "number_equal",
      explanation:
        `Définition : une formule générale permet de calculer n’importe quel terme.\n\n` +
        `Méthode : on remplace $n$ par ${n} dans $${r}n + ${b}$.\n\n` +
        `Calcul : $${r} \\times ${n} + ${b} = ${r * n} + ${b} = ${total}$.\n\n` +
        `Conclusion : il faut ${total} allumettes pour le motif ${n}.`,
    };
  },
},

{
  kind: "fixed",
  id: "3e_algo_generaliser_fixed_3_pourquoi_variable",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_generaliser",
  difficulty: 4,
  theme: "neutral",
  text: "Pourquoi utiliser une variable $x$ plutôt qu’un nombre précis pour décrire un programme de calcul ?",
  format: "qcm",
  choices: shuffle([
    "pour que la formule soit valable pour n’importe quel nombre",
    "pour rendre le calcul plus difficile",
    "pour supprimer les opérations",
    "pour que le résultat soit toujours $0$",
  ]),
  expected: ["pour que la formule soit valable pour n’importe quel nombre"],
  comparator: "mcq_exact",
  hint: "La variable représente tous les nombres possibles à la fois.",
  explanation:
    "Définition : une variable représente un nombre quelconque.\n\n" +
    "Méthode : on remplace le nombre choisi par $x$ pour décrire le programme en général.\n\n" +
    "Calcul : la formule obtenue fonctionne ensuite pour toutes les valeurs de $x$.\n\n" +
    "Conclusion : on utilise une variable pour généraliser à n’importe quel nombre.",
  tags: ["algo_programmation", "generaliser", "variable", "qcm"],
},

{
  kind: "fixed",
  id: "3e_algo_generaliser_fixed_4_double_moins",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_generaliser",
  difficulty: 5,
  theme: "neutral",
  text: "On choisit un nombre $x$, on le multiplie par $2$, puis on enlève $3$. Quelle expression généralise ce programme ?",
  format: "qcm",
  choices: shuffle(["$2x - 3$", "$2(x - 3)$", "$x - 6$", "$3 - 2x$"]),
  expected: ["$2x - 3$"],
  comparator: "mcq_exact",
  hint: "On multiplie d’abord, puis on soustrait.",
  explanation:
    "Définition : généraliser, c’est traduire le programme avec $x$.\n\n" +
    "Méthode : on respecte l’ordre : multiplier par $2$ puis enlever $3$.\n\n" +
    "Calcul : $x$ devient $2x$, puis $2x - 3$.\n\n" +
    "Conclusion : l’expression est $2x - 3$.",
  tags: ["algo_programmation", "generaliser", "expression", "qcm"],
},

{
  kind: "template",
  id: "3e_algo_generaliser_tpl_6_perimetre",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_generaliser",
  difficulty: 5,
  theme: "neutral",
  hint: "Le périmètre d’un carré de côté $c$ est $4c$ ; généralise la situation.",
  tags: ["algo_programmation", "generaliser", "geometrie", "qcm", "template"],
  generate: () => {
    const k = randomChoice([2, 3, 5]);
    const correct = `$4x + ${4 * k}$`;

    return {
      text: `Un carré a un côté de longueur $x$. On agrandit chaque côté de $${k}$. Quelle expression donne le périmètre du nouveau carré ?`,
      format: "qcm",
      choices: shuffle([correct, `$4x + ${k}$`, `$x + ${k}$`, `$4(x \\times ${k})$`]),
      expected: [correct],
      comparator: "mcq_exact",
      explanation:
        `Définition : généraliser, c’est exprimer le périmètre en fonction de $x$.\n\n` +
        `Méthode : le nouveau côté mesure $x + ${k}$ et le périmètre d’un carré est $4 \\times \\text{côté}$.\n\n` +
        `Calcul : $4(x + ${k}) = 4x + ${4 * k}$.\n\n` +
        `Conclusion : le périmètre est $4x + ${4 * k}$.`,
    };
  },
},

/* =========================
   CONDITION_COMPLEXE (compléments)
========================= */
{
  kind: "fixed",
  id: "3e_algo_condition_fixed_3_et",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_condition_complexe",
  difficulty: 3,
  theme: "neutral",
  text: "Une condition « $x > 0$ ET $x < 10$ » est vraie lorsque…",
  format: "qcm",
  choices: [
    "$x$ est strictement entre $0$ et $10$",
    "$x$ est négatif",
    "$x$ vaut $0$ ou $10$",
    "$x$ est supérieur à $10$",
  ],
  expected: ["$x$ est strictement entre $0$ et $10$"],
  comparator: "mcq_exact",
  hint: "« ET » exige que les deux conditions soient vraies.",
  explanation:
    "Définition : une condition « ET » est vraie si les deux conditions sont vraies en même temps.\n\n" +
    "Méthode : on vérifie $x > 0$ et $x < 10$.\n\n" +
    "Calcul : cela impose $0 < x < 10$.\n\n" +
    "Conclusion : $x$ est strictement entre $0$ et $10$.",
  tags: ["algo_programmation", "condition", "et", "qcm"],
},
{
  kind: "fixed",
  id: "3e_algo_condition_fixed_4_ou",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_condition_complexe",
  difficulty: 3,
  theme: "neutral",
  text: "Une condition « $x < 0$ OU $x > 10$ » est vraie lorsque…",
  format: "qcm",
  choices: [
    "$x$ est en dehors de l’intervalle $[0\\,;\\,10]$",
    "$x$ est entre $0$ et $10$",
    "$x$ vaut exactement $5$",
    "$x$ est toujours vraie",
  ],
  expected: ["$x$ est en dehors de l’intervalle $[0\\,;\\,10]$"],
  comparator: "mcq_exact",
  hint: "« OU » est vraie si au moins une des conditions est vraie.",
  explanation:
    "Définition : une condition « OU » est vraie dès qu’une des deux conditions est vraie.\n\n" +
    "Méthode : on regarde si $x < 0$ ou si $x > 10$.\n\n" +
    "Calcul : ces deux cas correspondent à l’extérieur de $[0\\,;\\,10]$.\n\n" +
    "Conclusion : $x$ est en dehors de l’intervalle $[0\\,;\\,10]$.",
  tags: ["algo_programmation", "condition", "ou", "qcm"],
},
{
  kind: "template",
  id: "3e_algo_condition_tpl_5_et_evaluation",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_condition_complexe",
  difficulty: 4,
  theme: "neutral",
  hint: "Pour « ET », les deux conditions doivent être vraies.",
  tags: ["algo_programmation", "condition", "et", "template"],
  generate: () => {
    const x = randomChoice([-2, 3, 6, 9, 12]);
    const ok = x > 0 && x < 10;
    return {
      text: `La variable x vaut ${x}. La condition « x > 0 ET x < 10 » est-elle vraie ?`,
      format: "qcm",
      choices: shuffle(["vrai", "faux"]),
      expected: [ok ? "vrai" : "faux"],
      comparator: "mcq_exact",
      explanation:
        `Définition : une condition « ET » exige les deux parties vraies.\n\n` +
        `Méthode : on teste $x > 0$ et $x < 10$.\n\n` +
        `Calcul : pour $x = ${x}$, $x > 0$ est ${x > 0 ? "vrai" : "faux"} et $x < 10$ est ${x < 10 ? "vrai" : "faux"}.\n\n` +
        `Conclusion : la condition est ${ok ? "vraie" : "fausse"}.`,
      canvas: scratchCanvas("Condition ET", [
        { type: "event" },
        { type: "set_variable", variable: "x", value: x },
        {
          type: "if_else",
          condition: "x > 0 et x < 10",
          children: [{ type: "say", text: "dans la zone" }],
          elseChildren: [{ type: "say", text: "hors zone" }],
        },
      ]),
    };
  },
},
{
  kind: "fixed",
  id: "3e_algo_condition_fixed_5_negation",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_condition_complexe",
  difficulty: 4,
  theme: "neutral",
  text: "Quel est le contraire de la condition « $x \\geq 5$ » ?",
  format: "qcm",
  choices: ["$x < 5$", "$x > 5$", "$x \\leq 5$", "$x = 5$"],
  expected: ["$x < 5$"],
  comparator: "mcq_exact",
  hint: "Le contraire de « supérieur ou égal » est « strictement inférieur ».",
  explanation:
    "Définition : la négation inverse la condition.\n\n" +
    "Méthode : le contraire de $\\geq 5$ est $< 5$.\n\n" +
    "Calcul : si « $x \\geq 5$ » est faux, alors $x < 5$.\n\n" +
    "Conclusion : le contraire est $x < 5$.",
  tags: ["algo_programmation", "condition", "negation", "qcm"],
},
{
  kind: "template",
  id: "3e_algo_condition_tpl_6_ou_evaluation",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_condition_complexe",
  difficulty: 4,
  theme: "neutral",
  hint: "Pour « OU », il suffit qu’une condition soit vraie.",
  tags: ["algo_programmation", "condition", "ou", "template"],
  generate: () => {
    const x = randomChoice([-3, 2, 7, 11, 15]);
    const ok = x < 0 || x > 10;
    return {
      text: `La variable x vaut ${x}. La condition « x < 0 OU x > 10 » est-elle vraie ?`,
      format: "qcm",
      choices: shuffle(["vrai", "faux"]),
      expected: [ok ? "vrai" : "faux"],
      comparator: "mcq_exact",
      explanation:
        `Définition : une condition « OU » est vraie dès qu’une partie est vraie.\n\n` +
        `Méthode : on teste $x < 0$ puis $x > 10$.\n\n` +
        `Calcul : pour $x = ${x}$, $x < 0$ est ${x < 0 ? "vrai" : "faux"} et $x > 10$ est ${x > 10 ? "vrai" : "faux"}.\n\n` +
        `Conclusion : la condition est ${ok ? "vraie" : "fausse"}.`,
    };
  },
},

/* =========================
   VARIABLE_BOUCLE (compléments)
========================= */
{
  kind: "template",
  id: "3e_algo_variable_tpl_5_produit",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_variable_boucle",
  difficulty: 4,
  theme: "neutral",
  hint: "À chaque tour, on multiplie la variable.",
  tags: ["algo_programmation", "variable", "boucle", "produit", "template"],
  generate: () => {
    const start = randomChoice([1, 2]);
    const facteur = randomChoice([2, 3]);
    const fois = randomChoice([2, 3]);
    let v = start;
    for (let i = 0; i < fois; i++) v *= facteur;
    return {
      text: `p vaut ${start}. On répète ${fois} fois : multiplier p par ${facteur}. Quelle est la valeur finale de p ?`,
      format: "short",
      expected: [String(v)],
      comparator: "number_equal",
      explanation:
        `Définition : une boucle peut aussi multiplier une variable.\n\n` +
        `Méthode : on multiplie par ${facteur} à chaque tour.\n\n` +
        `Calcul : ${start} × ${facteur}${fois > 1 ? ` (×${facteur})`.repeat(fois - 1) : ""} = ${v}.\n\n` +
        `Conclusion : la valeur finale est ${v}.`,
      canvas: scratchCanvas("Boucle multiplicative", [
        { type: "event" },
        { type: "set_variable", variable: "p", value: start },
        {
          type: "repeat",
          times: fois,
          children: [{ type: "operator", text: `multiplier p par ${facteur}` }],
        },
        { type: "say", text: "p" },
      ]),
    };
  },
},
{
  kind: "fixed",
  id: "3e_algo_variable_fixed_2_echange",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_variable_boucle",
  difficulty: 4,
  theme: "neutral",
  text: "a vaut 3 et b vaut 7. On exécute « mettre a à b ». Que valent a et b ensuite ?",
  format: "qcm",
  choices: ["a = 7 et b = 7", "a = 3 et b = 3", "a = 7 et b = 3", "a = 3 et b = 7"],
  expected: ["a = 7 et b = 7"],
  comparator: "mcq_exact",
  hint: "« mettre a à b » recopie la valeur de b dans a.",
  explanation:
    "Définition : « mettre a à b » remplace la valeur de a par celle de b.\n\n" +
    "Méthode : on recopie b dans a, b ne change pas.\n\n" +
    "Calcul : a devient 7, b reste 7.\n\n" +
    "Conclusion : a = 7 et b = 7.",
  tags: ["algo_programmation", "variable", "affectation", "qcm"],
},
{
  kind: "template",
  id: "3e_algo_variable_tpl_6_double_compteur",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_variable_boucle",
  difficulty: 3,
  theme: "neutral",
  hint: "On ajoute la même valeur à chaque tour.",
  tags: ["algo_programmation", "variable", "boucle", "template"],
  generate: () => {
    const start = randomChoice([0, 1, 2]);
    const pas = randomChoice([2, 5, 10]);
    const fois = randomChoice([3, 4, 6]);
    const final = start + pas * fois;
    return {
      text: `total vaut ${start}. On répète ${fois} fois : ajouter ${pas} à total. Quelle est la valeur finale de total ?`,
      format: "short",
      expected: [String(final)],
      comparator: "number_equal",
      explanation:
        `Définition : une boucle additionne ${pas} à chaque tour.\n\n` +
        `Méthode : valeur finale = départ + pas × nombre de tours.\n\n` +
        `Calcul : ${start} + ${pas} × ${fois} = ${final}.\n\n` +
        `Conclusion : la valeur finale est ${final}.`,
      canvas: scratchCanvas("Accumulateur", [
        { type: "event" },
        { type: "set_variable", variable: "total", value: start },
        {
          type: "repeat",
          times: fois,
          children: [{ type: "change_variable", variable: "total", value: pas }],
        },
        { type: "say", text: "total" },
      ]),
    };
  },
},
{
  kind: "fixed",
  id: "3e_algo_variable_fixed_3_init",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_variable_boucle",
  difficulty: 3,
  theme: "neutral",
  text: "Pourquoi faut-il initialiser une variable avant une boucle qui l’augmente ?",
  format: "qcm",
  choices: [
    "pour fixer sa valeur de départ",
    "pour la supprimer",
    "pour arrêter la boucle",
    "ce n’est jamais nécessaire",
  ],
  expected: ["pour fixer sa valeur de départ"],
  comparator: "mcq_exact",
  hint: "Sans valeur de départ, on ne sait pas d’où part le calcul.",
  explanation:
    "Définition : initialiser, c’est donner une première valeur à la variable.\n\n" +
    "Méthode : on fixe le point de départ avant d’ajouter dans la boucle.\n\n" +
    "Calcul : sans initialisation, le résultat final serait imprévisible.\n\n" +
    "Conclusion : on initialise pour fixer la valeur de départ.",
  tags: ["algo_programmation", "variable", "initialisation", "qcm"],
},

/* =========================
   PROGRAMME_CALCUL (compléments)
========================= */
{
  kind: "template",
  id: "3e_algo_programme_tpl_5_trace",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_programme_calcul",
  difficulty: 3,
  theme: "neutral",
  hint: "Suis les étapes dans l’ordre.",
  tags: ["algo_programmation", "programme_calcul", "trace", "template"],
  generate: () => {
    const x = randomChoice([2, 3, 4, 5]);
    const a = randomChoice([2, 3]);
    const b = randomChoice([1, 4, 5]);
    const res = a * x + b;
    return {
      text: `On choisit ${x}, on multiplie par ${a}, puis on ajoute ${b}. Quel résultat obtient-on ?`,
      format: "short",
      expected: [String(res)],
      comparator: "number_equal",
      explanation:
        `Définition : un programme de calcul applique des opérations dans l’ordre.\n\n` +
        `Méthode : on suit les étapes l’une après l’autre.\n\n` +
        `Calcul : ${x} × ${a} = ${a * x}, puis + ${b} = ${res}.\n\n` +
        `Conclusion : le résultat est ${res}.`,
    };
  },
},
{
  kind: "template",
  id: "3e_algo_programme_tpl_6_retrouver",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_programme_calcul",
  difficulty: 5,
  theme: "neutral",
  hint: "Résous l’équation associée au programme.",
  tags: ["algo_programmation", "programme_calcul", "equation", "template"],
  generate: () => {
    const a = randomChoice([2, 3, 4]);
    const b = randomChoice([3, 5, 6]);
    const x = randomChoice([2, 3, 4, 5]);
    const res = a * x + b;
    return {
      text: `Un programme calcule ${a}x + ${b}. Le résultat affiché est ${res}. Quel nombre x avait-on choisi ?`,
      format: "short",
      expected: [String(x)],
      comparator: "number_equal",
      explanation:
        `Définition : retrouver le nombre de départ revient à résoudre une équation.\n\n` +
        `Méthode : on résout ${a}x + ${b} = ${res}.\n\n` +
        `Calcul : ${a}x = ${res - b}, donc x = ${x}.\n\n` +
        `Conclusion : on avait choisi ${x}.`,
    };
  },
},
{
  kind: "fixed",
  id: "3e_algo_programme_qcm_1_expression",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_programme_calcul",
  difficulty: 4,
  theme: "neutral",
  text: "On choisit un nombre, on le multiplie par $5$, puis on enlève $2$. Quelle expression correspond ?",
  format: "qcm",
  choices: ["$5x - 2$", "$5(x - 2)$", "$x - 10$", "$2 - 5x$"],
  expected: ["$5x - 2$"],
  comparator: "mcq_exact",
  hint: "On multiplie d’abord, puis on soustrait.",
  explanation:
    "Définition : on traduit le programme avec la variable $x$.\n\n" +
    "Méthode : multiplier par $5$ donne $5x$, puis enlever $2$ donne $5x - 2$.\n\n" +
    "Calcul : l’expression est $5x - 2$.\n\n" +
    "Conclusion : c’est $5x - 2$.",
  tags: ["algo_programmation", "programme_calcul", "expression", "qcm"],
},
{
  kind: "template",
  id: "3e_algo_programme_tpl_7_parentheses",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_programme_calcul",
  difficulty: 4,
  theme: "neutral",
  hint: "Calcule la valeur finale en respectant l’ordre.",
  tags: ["algo_programmation", "programme_calcul", "parentheses", "template"],
  generate: () => {
    const x = randomChoice([2, 3, 4]);
    const b = randomChoice([1, 2, 5]);
    const a = randomChoice([2, 3]);
    const res = a * (x + b);
    return {
      text: `On choisit ${x}, on ajoute ${b}, puis on multiplie par ${a}. Quel résultat obtient-on ?`,
      format: "short",
      expected: [String(res)],
      comparator: "number_equal",
      explanation:
        `Définition : l’ordre des opérations doit être respecté.\n\n` +
        `Méthode : on ajoute d’abord, puis on multiplie.\n\n` +
        `Calcul : ${x} + ${b} = ${x + b}, puis × ${a} = ${res}.\n\n` +
        `Conclusion : le résultat est ${res}.`,
    };
  },
},
{
  kind: "fixed",
  id: "3e_algo_programme_qcm_2_egal",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_programme_calcul",
  difficulty: 3,
  theme: "neutral",
  text: "Deux programmes de calcul donnent le même résultat pour toutes les valeurs de $x$. On dit qu’ils sont…",
  format: "qcm",
  choices: ["équivalents", "opposés", "inverses", "aléatoires"],
  expected: ["équivalents"],
  comparator: "mcq_exact",
  hint: "Ils produisent toujours le même résultat.",
  explanation:
    "Définition : deux expressions qui donnent toujours le même résultat sont équivalentes.\n\n" +
    "Méthode : on vérifie qu’elles coïncident pour toute valeur de $x$.\n\n" +
    "Calcul : par exemple $2(x + 3)$ et $2x + 6$ sont équivalentes.\n\n" +
    "Conclusion : on dit qu’ils sont équivalents.",
  tags: ["algo_programmation", "programme_calcul", "equivalent", "qcm"],
},

/* =========================
   CORRIGER (compléments)
========================= */
{
  kind: "fixed",
  id: "3e_algo_corriger_fixed_2_init",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_corriger",
  difficulty: 4,
  theme: "neutral",
  text: "Un programme doit additionner des nombres mais oublie d’initialiser le total. Quel est le problème ?",
  format: "qcm",
  choices: [
    "le total part d’une valeur inconnue",
    "la boucle ne s’exécute jamais",
    "les nombres sont supprimés",
    "il n’y a aucun problème",
  ],
  expected: ["le total part d’une valeur inconnue"],
  comparator: "mcq_exact",
  hint: "Sans initialisation, on ne sait pas d’où part le total.",
  explanation:
    "Définition : une variable d’accumulation doit être initialisée (souvent à 0).\n\n" +
    "Méthode : on vérifie que le total démarre à une valeur connue.\n\n" +
    "Calcul : sans initialisation, le résultat est imprévisible.\n\n" +
    "Conclusion : le total part d’une valeur inconnue.",
  tags: ["algo_programmation", "correction", "initialisation", "qcm"],
},
{
  kind: "fixed",
  id: "3e_algo_corriger_fixed_3_operateur",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_corriger",
  difficulty: 4,
  theme: "neutral",
  text: "Le programme doit calculer le double de $x$ mais utilise « ajouter 2 à x ». Quelle correction faut-il ?",
  format: "qcm",
  choices: [
    "remplacer par « multiplier x par 2 »",
    "remplacer par « ajouter 1 à x »",
    "supprimer la variable x",
    "ne rien changer",
  ],
  expected: ["remplacer par « multiplier x par 2 »"],
  comparator: "mcq_exact",
  hint: "Le double, c’est multiplier par $2$, pas ajouter $2$.",
  explanation:
    "Définition : le double de $x$ est $2x$, pas $x + 2$.\n\n" +
    "Méthode : on compare l’objectif et l’instruction utilisée.\n\n" +
    "Calcul : « ajouter 2 » donne $x + 2$, alors qu’on veut $2x$.\n\n" +
    "Conclusion : il faut « multiplier x par 2 ».",
  tags: ["algo_programmation", "correction", "operateur", "qcm"],
},
{
  kind: "template",
  id: "3e_algo_corriger_tpl_4_repetitions",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_corriger",
  difficulty: 5,
  theme: "neutral",
  hint: "Nombre de répétitions = objectif ÷ pas.",
  tags: ["algo_programmation", "correction", "boucle", "template"],
  generate: () => {
    const pas = randomChoice([2, 3, 5]);
    const fois = randomChoice([3, 4, 5]);
    const objectif = pas * fois;
    return {
      text: `On veut obtenir total = ${objectif} en partant de 0 et en ajoutant ${pas} à chaque répétition. Combien de répétitions faut-il programmer ?`,
      format: "short",
      expected: [String(fois)],
      comparator: "number_equal",
      explanation:
        `Définition : corriger une boucle, c’est ajuster le nombre de répétitions.\n\n` +
        `Méthode : on divise l’objectif par le pas.\n\n` +
        `Calcul : ${objectif} ÷ ${pas} = ${fois}.\n\n` +
        `Conclusion : il faut ${fois} répétitions.`,
      canvas: scratchCanvas("Corriger la boucle", [
        { type: "event" },
        { type: "set_variable", variable: "total", value: 0 },
        { type: "repeat", times: "?", children: [{ type: "change_variable", variable: "total", value: pas }] },
        { type: "say", text: "total" },
      ]),
    };
  },
},
{
  kind: "fixed",
  id: "3e_algo_corriger_fixed_4_strict",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_corriger",
  difficulty: 4,
  theme: "neutral",
  text: "Le programme doit accepter les notes supérieures ou égales à $10$, mais teste « note > 10 ». Comment corriger ?",
  format: "qcm",
  choices: [
    "utiliser « note $\\geq$ 10 »",
    "utiliser « note < 10 »",
    "utiliser « note = 10 »",
    "supprimer la condition",
  ],
  expected: ["utiliser « note $\\geq$ 10 »"],
  comparator: "mcq_exact",
  hint: "« supérieur ou égal » s’écrit $\\geq$.",
  explanation:
    "Définition : « supérieur ou égal » inclut la valeur $10$.\n\n" +
    "Méthode : on remplace $>$ par $\\geq$.\n\n" +
    "Calcul : avec $\\geq 10$, la note $10$ est acceptée.\n\n" +
    "Conclusion : il faut utiliser « note $\\geq$ 10 ».",
  tags: ["algo_programmation", "correction", "comparaison", "qcm"],
},
{
  kind: "fixed",
  id: "3e_algo_corriger_fixed_5_parentheses",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_corriger",
  difficulty: 5,
  theme: "neutral",
  text: "Objectif : ajouter $3$ à $x$ puis multiplier par $4$. Le programme calcule $4x + 3$. Quelle est l’erreur ?",
  format: "qcm",
  choices: [
    "il manque des parenthèses : il faut $4(x + 3)$",
    "il faut remplacer $4$ par $3$",
    "il faut enlever le $x$",
    "il n’y a pas d’erreur",
  ],
  expected: ["il manque des parenthèses : il faut $4(x + 3)$"],
  comparator: "mcq_exact",
  hint: "On ajoute avant de multiplier.",
  explanation:
    "Définition : l’ordre des opérations impose des parenthèses ici.\n\n" +
    "Méthode : on ajoute $3$ d’abord ($x + 3$), puis on multiplie par $4$.\n\n" +
    "Calcul : cela donne $4(x + 3)$, pas $4x + 3$.\n\n" +
    "Conclusion : il manque des parenthèses : $4(x + 3)$.",
  tags: ["algo_programmation", "correction", "parentheses", "qcm"],
},
{
  kind: "fixed",
  id: "3e_algo_corriger_fixed_6_ordre",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_corriger",
  difficulty: 4,
  theme: "neutral",
  text: "Un programme affiche le résultat AVANT d’avoir fait le calcul. Comment corriger ?",
  format: "qcm",
  choices: [
    "déplacer l’affichage après le calcul",
    "supprimer le calcul",
    "ajouter une boucle",
    "changer le nom de la variable",
  ],
  expected: ["déplacer l’affichage après le calcul"],
  comparator: "mcq_exact",
  hint: "L’ordre des instructions compte.",
  explanation:
    "Définition : un programme exécute les instructions dans l’ordre.\n\n" +
    "Méthode : on place l’affichage après le calcul.\n\n" +
    "Calcul : sinon, on affiche une valeur non encore calculée.\n\n" +
    "Conclusion : il faut déplacer l’affichage après le calcul.",
  tags: ["algo_programmation", "correction", "ordre", "qcm"],
},
{
  kind: "template",
  id: "3e_algo_corriger_tpl_5_seuil",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_corriger",
  difficulty: 5,
  theme: "neutral",
  hint: "Calcule la valeur finale, puis vérifie si elle dépasse le seuil.",
  tags: ["algo_programmation", "correction", "seuil", "template"],
  generate: () => {
    const pas = randomChoice([3, 4, 5]);
    const fois = randomChoice([3, 4]);
    const seuil = randomChoice([10, 12]);
    const final = pas * fois;
    const ok = final > seuil;
    return {
      text: `Un programme part de 0 et ajoute ${pas}, ${fois} fois, puis teste « total > ${seuil} ». Le message « atteint » s’affiche-t-il ?`,
      format: "qcm",
      choices: shuffle(["oui", "non"]),
      expected: [ok ? "oui" : "non"],
      comparator: "mcq_exact",
      explanation:
        `Définition : on calcule la variable finale avant de tester la condition.\n\n` +
        `Méthode : total = ${pas} × ${fois} = ${final}, puis on compare à ${seuil}.\n\n` +
        `Calcul : ${final} > ${seuil} est ${ok ? "vrai" : "faux"}.\n\n` +
        `Conclusion : le message « atteint » ${ok ? "s’affiche" : "ne s’affiche pas"}.`,
    };
  },
},

/* =========================
   DÉFIS (compléments)
========================= */
{
  kind: "template",
  id: "3e_algo_defi_tpl_2_synthese",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_defi",
  difficulty: 5,
  theme: "neutral",
  hint: "Calcule la variable, puis teste la condition.",
  tags: ["algo_programmation", "defi", "synthese", "template"],
  generate: () => {
    const start = randomChoice([1, 2, 3]);
    const pas = randomChoice([2, 3]);
    const fois = randomChoice([3, 4]);
    const seuil = randomChoice([10, 12, 14]);
    const final = start + pas * fois;
    const msg = final >= seuil ? "réussi" : "raté";
    return {
      text: `score vaut ${start}. On répète ${fois} fois : ajouter ${pas}. Puis si score ≥ ${seuil}, afficher « réussi », sinon « raté ». Quel message s’affiche ?`,
      format: "qcm",
      choices: shuffle(["réussi", "raté"]),
      expected: [msg],
      comparator: "mcq_exact",
      explanation:
        `Définition : un algorithme combine variable, boucle et condition.\n\n` +
        `Méthode : on calcule d’abord score, puis on teste.\n\n` +
        `Calcul : score = ${start} + ${pas} × ${fois} = ${final}. ${final} ≥ ${seuil} est ${final >= seuil ? "vrai" : "faux"}.\n\n` +
        `Conclusion : le programme affiche « ${msg} ».`,
      canvas: scratchCanvas("Défi synthèse", [
        { type: "event" },
        { type: "set_variable", variable: "score", value: start },
        { type: "repeat", times: fois, children: [{ type: "change_variable", variable: "score", value: pas }] },
        {
          type: "if_else",
          condition: `score >= ${seuil}`,
          children: [{ type: "say", text: "réussi" }],
          elseChildren: [{ type: "say", text: "raté" }],
        },
      ]),
    };
  },
},
{
  kind: "fixed",
  id: "3e_algo_defi_qcm_1_boucle_utile",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_defi",
  difficulty: 4,
  theme: "neutral",
  text: "Dans quel cas une boucle est-elle la plus utile ?",
  format: "qcm",
  choices: [
    "répéter plusieurs fois la même action",
    "afficher un seul message",
    "déclarer une seule variable",
    "écrire une seule condition",
  ],
  expected: ["répéter plusieurs fois la même action"],
  comparator: "mcq_exact",
  hint: "Une boucle sert à la répétition.",
  explanation:
    "Définition : une boucle répète automatiquement des instructions.\n\n" +
    "Méthode : on l’utilise quand une même action revient plusieurs fois.\n\n" +
    "Calcul : cela évite de recopier les blocs.\n\n" +
    "Conclusion : une boucle est utile pour répéter plusieurs fois la même action.",
  tags: ["algo_programmation", "defi", "boucle", "qcm"],
},
{
  kind: "template",
  id: "3e_algo_defi_tpl_3_compteur_condition",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_defi",
  difficulty: 5,
  theme: "neutral",
  hint: "Compte les répétitions nécessaires pour dépasser le seuil.",
  tags: ["algo_programmation", "defi", "seuil", "template"],
  generate: () => {
    const pas = randomChoice([3, 4, 5]);
    const seuil = randomChoice([10, 12, 20]);
    let total = 0;
    let n = 0;
    while (total <= seuil) {
      total += pas;
      n++;
    }
    return {
      text: `On part de 0 et on ajoute ${pas} à chaque étape. Combien d’étapes faut-il pour dépasser strictement ${seuil} ?`,
      format: "short",
      expected: [String(n)],
      comparator: "number_equal",
      explanation:
        `Définition : on cherche le nombre d’étapes pour dépasser un seuil.\n\n` +
        `Méthode : on ajoute ${pas} jusqu’à dépasser ${seuil}.\n\n` +
        `Calcul : après ${n} étapes, le total vaut ${total} > ${seuil}.\n\n` +
        `Conclusion : il faut ${n} étapes.`,
    };
  },
},
{
  kind: "fixed",
  id: "3e_algo_defi_qcm_2_variable",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_defi",
  difficulty: 4,
  theme: "neutral",
  text: "À quoi sert une variable dans un programme ?",
  format: "qcm",
  choices: [
    "à stocker une valeur qui peut changer",
    "à dessiner une figure",
    "à arrêter le programme",
    "à ralentir le programme",
  ],
  expected: ["à stocker une valeur qui peut changer"],
  comparator: "mcq_exact",
  hint: "Une variable mémorise une valeur.",
  explanation:
    "Définition : une variable est un emplacement qui mémorise une valeur.\n\n" +
    "Méthode : on l’utilise pour conserver et modifier une valeur.\n\n" +
    "Calcul : la valeur peut évoluer pendant l’exécution.\n\n" +
    "Conclusion : une variable sert à stocker une valeur qui peut changer.",
  tags: ["algo_programmation", "defi", "variable", "qcm"],
},
{
  kind: "fixed",
  id: "3e_algo_defi_fixed_2_brevet_trace",
  niveau: "3e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_defi",
  difficulty: 5,
  theme: "neutral",
  text: "On part de score = 5, on répète 3 fois « ajouter 4 ». Quelle est la valeur finale de score ?",
  format: "short",
  expected: ["17"],
  comparator: "number_equal",
  hint: "$5 + 4 \\times 3$.",
  explanation:
    "Définition : la boucle ajoute $4$ trois fois.\n\n" +
    "Méthode : valeur finale = départ + pas × nombre de tours.\n\n" +
    "Calcul : $5 + 4 \\times 3 = 5 + 12 = 17$.\n\n" +
    "Conclusion : la valeur finale est $17$.",
  tags: ["algo_programmation", "defi", "brevet", "short"],
},
];