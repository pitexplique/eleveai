// lib/tutor-v4/questionBank/premiere-spe/maths/algorithmique.bank.ts
//
// Chapitre : Algorithmique et programmation (notion "algorithmique")
// microSkills :
//   algo_listes    — générer et parcourir une liste
//   algo_boucles   — lire et comprendre une boucle
//   algo_seuil     — recherche de seuil sur une suite
//   algo_fonctions — lire et comprendre une fonction Python
//
// PÉRIMÈTRE BO 2019 Première spé (Python). Conventions : code en `...`, LaTeX pour les maths, règle QCM.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

export const algorithmiqueBank: TutorBankItemV4[] = [
  /* ===================== ALGO_LISTES ===================== */
  {
    kind: "fixed",
    id: "premiere_algo_lst_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_listes",
    difficulty: 2,
    theme: "neutral",
    text: "En Python, quel est le premier indice d'une liste `L` ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Les indices commencent à...",
    explanation: exp(
      "En Python, les listes sont indexées à partir de $0$.",
      "Le premier élément est `L[0]`.",
      "Donc le premier indice est $0$.",
      "Le premier indice est $0$."
    ),
    tags: ["premiere", "maths", "algorithmique", "listes", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_lst_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_listes",
    difficulty: 2,
    theme: "neutral",
    text: "Soit `L = [4, 7, 2, 9]`. Que vaut `L[2]` ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "On compte à partir de l'indice 0.",
    explanation: exp(
      "On compte les indices à partir de $0$.",
      "`L[0]=4`, `L[1]=7`, `L[2]=2`.",
      "Donc `L[2]` vaut $2$.",
      "`L[2]` vaut $2$."
    ),
    tags: ["premiere", "maths", "algorithmique", "listes", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_lst_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_listes",
    difficulty: 3,
    theme: "neutral",
    text: "Que renvoie `len(L)` pour `L = [3, 5, 8, 1, 6]` ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "`len` = nombre d'éléments.",
    explanation: exp(
      "`len(L)` renvoie le nombre d'éléments de la liste.",
      "La liste contient $5$ valeurs.",
      "Donc `len(L)` vaut $5$.",
      "`len(L)` vaut $5$."
    ),
    tags: ["premiere", "maths", "algorithmique", "listes", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_lst_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_listes",
    difficulty: 3,
    theme: "neutral",
    text: "Que contient la liste générée par `[2*k for k in range(4)]` ?",
    format: "qcm",
    choices: ["`[0, 2, 4, 6]`", "`[2, 4, 6, 8]`", "`[0, 2, 4, 6, 8]`", "`[1, 2, 3, 4]`"],
    expected: ["`[0, 2, 4, 6]`"],
    comparator: "mcq_exact",
    hint: "`range(4)` donne 0, 1, 2, 3.",
    explanation: exp(
      "C'est une liste définie en compréhension.",
      "`range(4)` parcourt $0, 1, 2, 3$, et on calcule $2k$.",
      "On obtient $0, 2, 4, 6$.",
      "`[0, 2, 4, 6]`."
    ),
    tags: ["premiere", "maths", "algorithmique", "listes", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_lst_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_listes",
    difficulty: 3,
    theme: "neutral",
    text: "Soit `L = [10, 20, 30]`. Que vaut `L[-1]` (dernier élément) ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "L'indice $-1$ désigne le dernier élément.",
    explanation: exp(
      "En Python, l'indice $-1$ désigne le dernier élément.",
      "Le dernier élément de `L` est $30$.",
      "Donc `L[-1]` vaut $30$.",
      "`L[-1]` vaut $30$."
    ),
    tags: ["premiere", "maths", "algorithmique", "listes", "short"],
  },
  {
    kind: "template",
    id: "premiere_algo_lst_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_listes",
    difficulty: 3,
    theme: "neutral",
    hint: "On compte à partir de l'indice 0.",
    tags: ["premiere", "maths", "algorithmique", "listes", "template"],
    generate: () => {
      const L = [randomInt(1, 9), randomInt(1, 9), randomInt(1, 9), randomInt(1, 9)];
      const i = randomInt(0, 3);
      return {
        text: `Soit \`L = [${L.join(", ")}]\`. Que vaut \`L[${i}]\` ?`,
        format: "short",
        expected: [String(L[i])],
        comparator: "number_equal",
        explanation: exp(
          "On compte les indices à partir de $0$.",
          `\`L[${i}]\` désigne l'élément en position ${i}.`,
          `Cet élément vaut $${L[i]}$.`,
          `\`L[${i}]\` vaut $${L[i]}$.`
        ),
      };
    },
  },

  /* ===================== ALGO_BOUCLES ===================== */
  {
    kind: "fixed",
    id: "premiere_algo_bcl_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_boucles",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de fois s'exécute le corps de la boucle `for i in range(5):` ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "`range(5)` parcourt 0 à 4.",
    explanation: exp(
      "`range(5)` produit les entiers $0, 1, 2, 3, 4$.",
      "Cela fait $5$ valeurs.",
      "Le corps s'exécute donc $5$ fois.",
      "$5$ fois."
    ),
    tags: ["premiere", "maths", "algorithmique", "boucles", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_bcl_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_boucles",
    difficulty: 3,
    theme: "neutral",
    text: "Que vaut `s` après : `s = 0` puis `for k in range(1, 5): s = s + k` ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "On additionne $1 + 2 + 3 + 4$.",
    explanation: exp(
      "La boucle parcourt $k = 1, 2, 3, 4$ (range(1, 5) exclut 5).",
      "On accumule : $s = 1 + 2 + 3 + 4$.",
      "$= 10$.",
      "`s` vaut $10$."
    ),
    tags: ["premiere", "maths", "algorithmique", "boucles", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_bcl_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_boucles",
    difficulty: 3,
    theme: "neutral",
    text: "Que vaut `p` après : `p = 1` puis `for k in range(1, 4): p = p * k` ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Produit $1 \\times 2 \\times 3$.",
    explanation: exp(
      "La boucle parcourt $k = 1, 2, 3$.",
      "On accumule un produit : $p = 1 \\times 1 \\times 2 \\times 3$.",
      "$= 6$ (c'est $3!$).",
      "`p` vaut $6$."
    ),
    tags: ["premiere", "maths", "algorithmique", "boucles", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_bcl_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_boucles",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle boucle utiliser quand on ne connaît pas à l'avance le nombre de répétitions ?",
    format: "qcm",
    choices: ["la boucle `while`", "la boucle `for`", "le test `if`", "la fonction `print`"],
    expected: ["la boucle `while`"],
    comparator: "mcq_exact",
    hint: "Boucle « tant que ».",
    explanation: exp(
      "La boucle `for` répète un nombre connu de fois.",
      "La boucle `while` répète tant qu'une condition est vraie.",
      "On l'utilise quand le nombre d'itérations est inconnu (ex. recherche de seuil).",
      "La boucle `while`."
    ),
    tags: ["premiere", "maths", "algorithmique", "boucles", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_algo_bcl_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_boucles",
    difficulty: 3,
    theme: "neutral",
    hint: "Somme des entiers de 1 à n.",
    tags: ["premiere", "maths", "algorithmique", "boucles", "template"],
    generate: () => {
      const n = randomInt(3, 8);
      const s = (n * (n + 1)) / 2;
      return {
        text: `Que vaut \`s\` après : \`s = 0\` puis \`for k in range(1, ${n + 1}): s = s + k\` ?`,
        format: "short",
        expected: [String(s)],
        comparator: "number_equal",
        explanation: exp(
          `La boucle parcourt $k = 1$ à $${n}$ (range(1, ${n + 1})).`,
          `On accumule $1 + 2 + \\dots + ${n}$.`,
          `$= \\dfrac{${n} \\times ${n + 1}}{2} = ${s}$.`,
          `\`s\` vaut $${s}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_algo_bcl_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_boucles",
    difficulty: 2,
    theme: "neutral",
    hint: "`range(a, b)` compte de a à b-1.",
    tags: ["premiere", "maths", "algorithmique", "boucles", "template"],
    generate: () => {
      const a = randomInt(0, 3);
      const b = randomInt(6, 12);
      const n = b - a;
      return {
        text: `Combien de fois s'exécute le corps de la boucle \`for i in range(${a}, ${b}):\` ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "`range(a, b)` produit les entiers de $a$ à $b-1$.",
          `Ici de $${a}$ à $${b - 1}$, soit $${b} - ${a}$ valeurs.`,
          `$= ${n}$.`,
          `Le corps s'exécute $${n}$ fois.`
        ),
      };
    },
  },

  /* ===================== ALGO_SEUIL ===================== */
  {
    kind: "fixed",
    id: "premiere_algo_seuil_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_seuil",
    difficulty: 3,
    theme: "neutral",
    text: "Pour trouver le plus petit $n$ tel qu'une suite dépasse un seuil, on utilise plutôt :",
    format: "qcm",
    choices: ["une boucle `while`", "une boucle `for` fixe", "un simple `if`", "la fonction `len`"],
    expected: ["une boucle `while`"],
    comparator: "mcq_exact",
    hint: "On ne connaît pas $n$ à l'avance.",
    explanation: exp(
      "On cherche le premier rang dépassant un seuil, sans le connaître à l'avance.",
      "On répète « tant que la valeur est inférieure au seuil ».",
      "C'est une boucle `while`.",
      "Une boucle `while`."
    ),
    tags: ["premiere", "maths", "algorithmique", "seuil", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_seuil_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_seuil",
    difficulty: 4,
    theme: "neutral",
    text: "Suite : `u = 1` ; on répète `u = u * 2` en comptant les étapes. Après combien d'étapes a-t-on `u > 10` ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Liste les puissances de 2 : 2, 4, 8, 16.",
    explanation: exp(
      "On double à chaque étape : $1 \\to 2 \\to 4 \\to 8 \\to 16$.",
      "Les valeurs après chaque étape sont $2, 4, 8, 16$.",
      "La première qui dépasse $10$ est $16$, à la $4^e$ étape.",
      "Après $4$ étapes."
    ),
    tags: ["premiere", "maths", "algorithmique", "seuil", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_seuil_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_seuil",
    difficulty: 4,
    theme: "neutral",
    text: "Dans `n = 0` ; `u = 5` ; `while u < 100: u = u * 2 ; n = n + 1`, que compte la variable `n` ?",
    format: "qcm",
    choices: [
      "le nombre d'étapes pour dépasser 100",
      "la valeur finale de u",
      "le seuil 100",
      "la somme des termes",
    ],
    expected: ["le nombre d'étapes pour dépasser 100"],
    comparator: "mcq_exact",
    hint: "`n` augmente de 1 à chaque tour.",
    explanation: exp(
      "À chaque passage dans la boucle, `n` augmente de $1$.",
      "La boucle s'arrête quand `u` atteint ou dépasse $100$.",
      "`n` compte donc le nombre d'étapes (le rang seuil).",
      "Le nombre d'étapes pour dépasser 100."
    ),
    tags: ["premiere", "maths", "algorithmique", "seuil", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_seuil_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_seuil",
    difficulty: 3,
    theme: "neutral",
    text: "Suite arithmétique : `u = 2` ; on répète `u = u + 3`. Après combien d'étapes a-t-on `u > 10` ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Valeurs : 5, 8, 11.",
    explanation: exp(
      "On ajoute $3$ à chaque étape : $2 \\to 5 \\to 8 \\to 11$.",
      "Les valeurs après chaque étape sont $5, 8, 11$.",
      "La première qui dépasse $10$ est $11$, à la $3^e$ étape.",
      "Après $3$ étapes."
    ),
    tags: ["premiere", "maths", "algorithmique", "seuil", "short"],
  },
  {
    kind: "template",
    id: "premiere_algo_seuil_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_seuil",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte les étapes en doublant.",
    tags: ["premiere", "maths", "algorithmique", "seuil", "template"],
    generate: () => {
      const seuil = [10, 20, 50, 100][randomInt(0, 3)];
      let u = 1;
      let n = 0;
      while (u <= seuil) {
        u = u * 2;
        n += 1;
      }
      return {
        text: `Suite : \`u = 1\` ; on répète \`u = u * 2\`. Après combien d'étapes a-t-on \`u > ${seuil}\` ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "On double $u$ à chaque étape (puissances de $2$).",
          `On s'arrête à la première valeur strictement supérieure à $${seuil}$.`,
          `Cela arrive après $${n}$ étapes (u = ${u}).`,
          `Après $${n}$ étapes.`
        ),
      };
    },
  },

  /* ===================== ALGO_FONCTIONS ===================== */
  {
    kind: "fixed",
    id: "premiere_algo_fct_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_fonctions",
    difficulty: 2,
    theme: "neutral",
    text: "En Python, quel mot-clé définit une fonction ?",
    format: "qcm",
    choices: ["`def`", "`function`", "`func`", "`return`"],
    expected: ["`def`"],
    comparator: "mcq_exact",
    hint: "Trois lettres.",
    explanation: exp(
      "On définit une fonction avec le mot-clé `def`.",
      "Ex. : `def f(x): return 2*x`.",
      "`return` sert à renvoyer un résultat, pas à définir la fonction.",
      "Le mot-clé est `def`."
    ),
    tags: ["premiere", "maths", "algorithmique", "fonctions", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_fct_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_fonctions",
    difficulty: 3,
    theme: "neutral",
    text: "Soit `def f(x): return 2*x + 1`. Que renvoie `f(3)` ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Remplace x par 3.",
    explanation: exp(
      "On remplace l'argument `x` par $3$.",
      "`f(3)` $= 2 \\times 3 + 1$.",
      "$= 7$.",
      "`f(3)` renvoie $7$."
    ),
    tags: ["premiere", "maths", "algorithmique", "fonctions", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_fct_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_fonctions",
    difficulty: 3,
    theme: "neutral",
    text: "Soit `def carre(x): return x*x`. Que renvoie `carre(5)` ?",
    format: "short",
    expected: ["25"],
    comparator: "number_equal",
    hint: "$5 \\times 5$.",
    explanation: exp(
      "La fonction renvoie le carré de son argument.",
      "`carre(5)` $= 5 \\times 5$.",
      "$= 25$.",
      "`carre(5)` renvoie $25$."
    ),
    tags: ["premiere", "maths", "algorithmique", "fonctions", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_fct_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_fonctions",
    difficulty: 3,
    theme: "neutral",
    text: "À quoi sert l'instruction `return` dans une fonction ?",
    format: "qcm",
    choices: [
      "à renvoyer un résultat",
      "à afficher du texte",
      "à créer une boucle",
      "à définir une variable globale",
    ],
    expected: ["à renvoyer un résultat"],
    comparator: "mcq_exact",
    hint: "Valeur de sortie.",
    explanation: exp(
      "`return` indique la valeur renvoyée par la fonction.",
      "C'est le résultat utilisable ensuite dans le programme.",
      "(Pour seulement afficher, on utilise `print`.)",
      "À renvoyer un résultat."
    ),
    tags: ["premiere", "maths", "algorithmique", "fonctions", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_algo_fct_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_fonctions",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace x par la valeur donnée.",
    tags: ["premiere", "maths", "algorithmique", "fonctions", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const b = randomInt(1, 6);
      const k = randomInt(2, 6);
      const val = a * k + b;
      return {
        text: `Soit \`def f(x): return ${a}*x + ${b}\`. Que renvoie \`f(${k})\` ?`,
        format: "short",
        expected: [String(val)],
        comparator: "number_equal",
        explanation: exp(
          "On remplace l'argument `x` par la valeur donnée.",
          `\`f(${k})\` $= ${a} \\times ${k} + ${b}$.`,
          `$= ${val}$.`,
          `\`f(${k})\` renvoie $${val}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_algo_fct_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_fonctions",
    difficulty: 3,
    theme: "neutral",
    hint: "La fonction renvoie le carré.",
    tags: ["premiere", "maths", "algorithmique", "fonctions", "template"],
    generate: () => {
      const k = randomInt(2, 9);
      return {
        text: `Soit \`def carre(x): return x*x\`. Que renvoie \`carre(${k})\` ?`,
        format: "short",
        expected: [String(k * k)],
        comparator: "number_equal",
        explanation: exp(
          "La fonction renvoie le carré de son argument.",
          `\`carre(${k})\` $= ${k} \\times ${k}$.`,
          `$= ${k * k}$.`,
          `\`carre(${k})\` renvoie $${k * k}$.`
        ),
      };
    },
  },
];
