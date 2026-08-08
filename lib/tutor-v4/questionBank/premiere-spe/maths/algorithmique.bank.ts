// lib/tutor-v4/questionBank/premiere-spe/maths/algorithmique.bank.ts
//
// Chapitre : Algorithmique et programmation (notion "algorithmique")
// microSkills :
//   algo_variable         — variables et affectation
//   algo_listes           — générer une liste
//   algo_liste_manipuler  — éléments d'une liste et indices
//   algo_liste_parcourir  — parcourir une liste, itérer
//   algo_boucles          — lire et comprendre une boucle bornée
//   algo_condition        — instruction conditionnelle
//   algo_while            — boucle non bornée
//   algo_seuil            — recherche de seuil sur une suite
//   algo_fonctions        — lire et comprendre une fonction Python
//   algo_modulaire        — découper une tâche, réutiliser une fonction
//
// ⚠️ Douze items écrits avant le découpage en dix micro-compétences sont
// restés à leur place dans le fichier, mais leur `microId` a été réaffecté
// (leur `id` est inchangé). C'est le `microId` qui fait foi.
//
// PÉRIMÈTRE BO Première spé (Python). Conventions : code en `...`, LaTeX pour les maths, règle QCM.
//
// Règle d'écriture : un `fixed` pour une valeur exceptionnelle, un piège, une
// propriété ou un contexte 974 ; un `template` pour tout calcul dont on peut
// changer les nombres ; plusieurs ouvertes dont un template ouvert.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickOne<T>(arr: readonly T[]): T {
  return arr[randomInt(0, arr.length - 1)];
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
    microId: "algo_liste_manipuler",
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
    microId: "algo_liste_manipuler",
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
    microId: "algo_liste_manipuler",
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
    kind: "fixed",
    id: "premiere_algo_lst_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_liste_manipuler",
    difficulty: 2,
    theme: "neutral",
    text: "Soit `L = [4, 7, 2, 9]`. Que vaut `L[0]` ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "En Python, la numérotation commence à $0$.",
    explanation: exp(
      "Les indices d'une liste Python commencent à $0$.",
      "`L[0]` désigne donc le PREMIER élément de la liste.",
      "Ici, c'est $4$.",
      "`L[0]` vaut $4$."
    ),
    tags: ["premiere", "maths", "algorithmique", "listes", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_lst_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_listes",
    difficulty: 4,
    theme: "neutral",
    text: "Que contient la liste `[k**2 for k in range(5)]` ?",
    format: "qcm",
    choices: [
      "`[0, 1, 4, 9, 16]`",
      "`[1, 4, 9, 16, 25]`",
      "`[0, 1, 2, 3, 4]`",
      "`[0, 2, 4, 6, 8]`",
    ],
    expected: ["`[0, 1, 4, 9, 16]`"],
    comparator: "mcq_exact",
    hint: "`range(5)` donne $0, 1, 2, 3, 4$ : on élève chacun au carré.",
    explanation: exp(
      "Une liste en compréhension applique le calcul à chaque valeur parcourue.",
      "`range(5)` parcourt $0, 1, 2, 3, 4$ : la borne $5$ est EXCLUE.",
      "Les carrés sont donc $0, 1, 4, 9, 16$.",
      "La liste est `[0, 1, 4, 9, 16]`."
    ),
    tags: ["premiere", "maths", "algorithmique", "listes", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_lst_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_listes",
    difficulty: 3,
    theme: "neutral",
    text: "Soit `L = [1, 2]`. Que contient `L` après l'instruction `L.append(5)` ?",
    format: "qcm",
    choices: ["`[1, 2, 5]`", "`[5, 1, 2]`", "`[1, 2]`", "`[1, 7]`"],
    expected: ["`[1, 2, 5]`"],
    comparator: "mcq_exact",
    hint: "`append` ajoute À LA FIN de la liste.",
    explanation: exp(
      "La méthode `append` ajoute un élément à la fin de la liste et modifie celle-ci.",
      "`L` valait `[1, 2]` : on ajoute $5$ après le dernier élément.",
      "`L` vaut alors `[1, 2, 5]`, et `len(L)` passe de $2$ à $3$.",
      "`L` contient `[1, 2, 5]`."
    ),
    tags: ["premiere", "maths", "algorithmique", "listes", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_lst_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_liste_parcourir",
    difficulty: 4,
    theme: "neutral",
    text: "Que vaut `s` après : `s = 0` puis `for x in [2, 4, 6]: s = s + x` ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "On additionne tous les éléments de la liste.",
    explanation: exp(
      "Cette boucle parcourt directement les VALEURS de la liste (et non les indices).",
      "$s$ prend successivement les valeurs $0 + 2 = 2$, puis $2 + 4 = 6$, puis $6 + 6 = 12$.",
      "$s = 12$.",
      "`s` vaut $12$ : c'est la somme des éléments de la liste."
    ),
    tags: ["premiere", "maths", "algorithmique", "listes", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_lst_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_liste_manipuler",
    difficulty: 5,
    theme: "neutral",
    text: "Soit `L = [1, 2, 3]`. Que se passe-t-il si on écrit `L[3]` ?",
    format: "qcm",
    choices: [
      "une erreur : cet indice n'existe pas",
      "on obtient $3$",
      "on obtient $1$",
      "on ajoute un élément à la liste",
    ],
    expected: ["une erreur : cet indice n'existe pas"],
    comparator: "mcq_exact",
    hint: "Les indices vont de $0$ à `len(L) - 1`.",
    explanation: exp(
      "Pour une liste de $n$ éléments, les indices valides vont de $0$ à $n - 1$.",
      "Ici `len(L)` vaut $3$ : les indices vont de $0$ à $2$, et désignent respectivement $1$, $2$ et $3$.",
      "`L[3]` sort donc de la liste : Python renvoie une erreur d'indice.",
      "C'est une erreur : l'indice $3$ n'existe pas."
    ),
    tags: ["premiere", "maths", "algorithmique", "listes", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_lst_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_liste_parcourir",
    difficulty: 4,
    theme: "neutral",
    text: "Combien de valeurs parcourt `range(2, 6)` ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "La première borne est incluse, la seconde exclue.",
    explanation: exp(
      "`range(a, b)` parcourt les entiers de $a$ INCLUS à $b$ EXCLU.",
      "Ici : $2$, $3$, $4$, $5$.",
      "Cela fait $4$ valeurs, soit $6 - 2$.",
      "`range(2, 6)` parcourt $4$ valeurs."
    ),
    tags: ["premiere", "maths", "algorithmique", "listes", "short"],
  },
  {
    kind: "template",
    id: "premiere_algo_lst_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_liste_manipuler",
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
    microId: "algo_while",
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
    kind: "fixed",
    id: "premiere_algo_bcl_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_boucles",
    difficulty: 3,
    theme: "neutral",
    text: "Combien de fois s'exécute le corps de la boucle `for i in range(3, 7):` ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "$i$ prend les valeurs $3$, $4$, $5$, $6$.",
    explanation: exp(
      "`range(a, b)` parcourt les entiers de $a$ inclus à $b$ exclu.",
      "Ici $i$ vaut successivement $3$, $4$, $5$, $6$.",
      "Le corps s'exécute donc $4$ fois, soit $7 - 3$ (et non $7 - 3 + 1$ : la borne $7$ est exclue).",
      "Le corps s'exécute $4$ fois."
    ),
    tags: ["premiere", "maths", "algorithmique", "boucles", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_bcl_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_boucles",
    difficulty: 4,
    theme: "neutral",
    text: "Que vaut `x` après : `x = 1` puis `for i in range(4): x = x * 2` ?",
    format: "short",
    expected: ["16"],
    comparator: "number_equal",
    hint: "On double $4$ fois : $2$, $4$, $8$, $16$.",
    explanation: exp(
      "`range(4)` parcourt $0$, $1$, $2$, $3$ : le corps s'exécute $4$ fois.",
      "`x` est doublée à chaque passage : $1 \\to 2 \\to 4 \\to 8 \\to 16$.",
      "$x = 2^4 = 16$.",
      "`x` vaut $16$."
    ),
    tags: ["premiere", "maths", "algorithmique", "boucles", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_bcl_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_boucles",
    difficulty: 3,
    theme: "neutral",
    text: "En Python, à quoi sert l'indentation (le décalage vers la droite) après un `for` ?",
    format: "qcm",
    choices: [
      "à indiquer quelles instructions sont répétées",
      "à rendre le code plus joli, sans effet",
      "à compter le nombre de répétitions",
      "à déclarer une variable",
    ],
    expected: ["à indiquer quelles instructions sont répétées"],
    comparator: "mcq_exact",
    hint: "En Python, le décalage n'est pas décoratif.",
    explanation: exp(
      "En Python, l'indentation délimite les blocs : elle remplace les accolades d'autres langages.",
      "Les lignes décalées après le `for` forment le corps de la boucle : ce sont elles qui se répètent.",
      "Une ligne ramenée à gauche n'est exécutée qu'une fois, après la boucle : une erreur d'indentation change donc le résultat.",
      "Elle indique quelles instructions sont répétées."
    ),
    tags: ["premiere", "maths", "algorithmique", "boucles", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_bcl_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_boucles",
    difficulty: 3,
    theme: "neutral",
    text: "Que vaut `s` après : `s = 0` puis `for k in range(5): s = s + 2` ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "On ajoute $2$, cinq fois de suite.",
    explanation: exp(
      "Le corps s'exécute $5$ fois, car `range(5)` parcourt $0, 1, 2, 3, 4$.",
      "À chaque passage on ajoute $2$, quelle que soit la valeur de `k` (elle n'intervient pas dans le calcul).",
      "$s = 5 \\times 2 = 10$.",
      "`s` vaut $10$."
    ),
    tags: ["premiere", "maths", "algorithmique", "boucles", "short"],
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
    kind: "fixed",
    id: "premiere_algo_seuil_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_seuil",
    difficulty: 4,
    theme: "neutral",
    text: "Suite géométrique : `u = 1` ; on répète `u = u * 3`. Après combien d'étapes a-t-on `u > 50` ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Valeurs : $3$, $9$, $27$, $81$.",
    explanation: exp(
      "On triple à chaque étape et on compte les passages jusqu'à dépasser le seuil.",
      "$1 \\to 3 \\to 9 \\to 27 \\to 81$ : les valeurs après chaque étape sont $3$, $9$, $27$, $81$.",
      "La première qui dépasse $50$ est $81$, obtenue à la 4ᵉ étape.",
      "Après $4$ étapes."
    ),
    tags: ["premiere", "maths", "algorithmique", "seuil", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_seuil_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_seuil",
    difficulty: 5,
    theme: "neutral",
    text: "Suite décroissante : `u = 100` ; on répète `u = u - 25`. Après combien d'étapes a-t-on `u < 30` ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Valeurs : $75$, $50$, $25$.",
    explanation: exp(
      "Un seuil peut aussi être franchi vers le bas : on retranche $25$ à chaque étape.",
      "$100 \\to 75 \\to 50 \\to 25$ : les valeurs après chaque étape sont $75$, $50$, $25$.",
      "La première qui passe sous $30$ est $25$, à la 3ᵉ étape.",
      "Après $3$ étapes."
    ),
    tags: ["premiere", "maths", "algorithmique", "seuil", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_seuil_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_seuil",
    difficulty: 3,
    theme: "neutral",
    text: "Que renvoie un algorithme de recherche de seuil ?",
    format: "qcm",
    choices: [
      "le plus petit rang $n$ à partir duquel la condition est vérifiée",
      "la valeur du seuil",
      "la somme des termes de la suite",
      "la raison de la suite",
    ],
    expected: [
      "le plus petit rang $n$ à partir duquel la condition est vérifiée",
    ],
    comparator: "mcq_exact",
    hint: "On cherche À PARTIR DE QUAND, pas combien.",
    explanation: exp(
      "Une recherche de seuil répond à la question « à partir de quel rang la suite dépasse-t-elle telle valeur ? ».",
      "L'algorithme compte les étapes dans une variable `n` et s'arrête dès que la condition devient vraie.",
      "C'est donc ce compteur `n` qui est renvoyé, pas la valeur atteinte par la suite.",
      "Il renvoie le plus petit rang $n$ vérifiant la condition."
    ),
    tags: ["premiere", "maths", "algorithmique", "seuil", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_seuil_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_seuil",
    difficulty: 4,
    theme: "neutral",
    text: "Suite arithmétique : `u = 1` ; on répète `u = u + 4`. Après combien d'étapes a-t-on `u > 20` ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Valeurs : $5$, $9$, $13$, $17$, $21$.",
    explanation: exp(
      "On ajoute $4$ à chaque étape et on compte les passages.",
      "$1 \\to 5 \\to 9 \\to 13 \\to 17 \\to 21$.",
      "La première valeur qui dépasse $20$ est $21$, à la 5ᵉ étape. Attention : $17$ ne suffit pas.",
      "Après $5$ étapes."
    ),
    tags: ["premiere", "maths", "algorithmique", "seuil", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_seuil_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_while",
    difficulty: 4,
    theme: "neutral",
    text: "Dans une boucle `while u < 100:`, quand la boucle s'arrête-t-elle ?",
    format: "qcm",
    choices: [
      "dès que `u` atteint ou dépasse $100$",
      "dès que `u` dépasse strictement $100$",
      "après exactement $100$ tours",
      "elle ne s'arrête jamais",
    ],
    expected: ["dès que `u` atteint ou dépasse $100$"],
    comparator: "mcq_exact",
    hint: "La boucle tourne TANT QUE la condition est vraie.",
    explanation: exp(
      "Une boucle `while` continue tant que sa condition est vraie, et s'arrête dès qu'elle devient fausse.",
      "La condition `u < 100` devient fausse dès que $u \\ge 100$, c'est-à-dire $u = 100$ ou plus.",
      "Il faut donc que `u` évolue vers le seuil, sinon la boucle tournerait indéfiniment.",
      "Elle s'arrête dès que `u` atteint ou dépasse $100$."
    ),
    tags: ["premiere", "maths", "algorithmique", "seuil", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_seuil_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_seuil",
    difficulty: 5,
    theme: "neutral",
    text: "Où faut-il placer l'instruction `n = n + 1` dans un algorithme de seuil ?",
    format: "qcm",
    choices: [
      "dans la boucle, à chaque mise à jour de la suite",
      "avant la boucle, une seule fois",
      "après la boucle, une seule fois",
      "peu importe, le résultat est le même",
    ],
    expected: ["dans la boucle, à chaque mise à jour de la suite"],
    comparator: "mcq_exact",
    hint: "Le compteur doit avancer exactement au même rythme que la suite.",
    explanation: exp(
      "La variable `n` compte le nombre d'étapes effectuées : elle doit progresser en même temps que la suite.",
      "On la place donc DANS le corps de la boucle, à côté de la mise à jour de `u`.",
      "Hors de la boucle, elle ne serait incrémentée qu'une seule fois et le rang renvoyé serait faux.",
      "Dans la boucle, à chaque mise à jour de la suite."
    ),
    tags: ["premiere", "maths", "algorithmique", "seuil", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_seuil_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_seuil",
    difficulty: 5,
    theme: "neutral",
    text: "Que vaut `n` à la fin de : `n = 0` ; `u = 5` ; `while u < 100: u = u * 2 ; n = n + 1` ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Valeurs de `u` : $10$, $20$, $40$, $80$, $160$.",
    explanation: exp(
      "À chaque passage, `u` double et `n` augmente de $1$.",
      "$5 \\to 10 \\to 20 \\to 40 \\to 80 \\to 160$ : à $80$ le test `80 < 100` est encore vrai, donc on effectue un dernier tour.",
      "Cinq tours ont été effectués : $n = 5$.",
      "`n` vaut $5$."
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
    kind: "fixed",
    id: "premiere_algo_fct_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_fonctions",
    difficulty: 3,
    theme: "neutral",
    text: "Soit `def f(x): return x**2 - 1`. Que renvoie `f(4)` ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "`x**2` signifie « $x$ au carré ».",
    explanation: exp(
      "Appeler une fonction, c'est remplacer le paramètre par la valeur donnée.",
      "On remplace `x` par $4$ : $4^2 - 1$.",
      "$= 16 - 1 = 15$.",
      "`f(4)` renvoie $15$."
    ),
    tags: ["premiere", "maths", "algorithmique", "fonctions", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_fct_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_fonctions",
    difficulty: 3,
    theme: "neutral",
    text: "Soit `def somme(a, b): return a + b`. Que renvoie `somme(3, 5)` ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Deux paramètres : $a = 3$ et $b = 5$, dans cet ordre.",
    explanation: exp(
      "Une fonction peut recevoir plusieurs paramètres : ils sont associés dans l'ordre de l'appel.",
      "Ici $a = 3$ et $b = 5$, donc la fonction renvoie $3 + 5$.",
      "$= 8$.",
      "`somme(3, 5)` renvoie $8$."
    ),
    tags: ["premiere", "maths", "algorithmique", "fonctions", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_fct_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_fonctions",
    difficulty: 5,
    theme: "neutral",
    text: "Soit `def h(x): return 3*x`. Que renvoie `h(h(2))` ?",
    format: "short",
    expected: ["18"],
    comparator: "number_equal",
    hint: "Calcule d'abord `h(2)`, puis applique `h` au résultat.",
    explanation: exp(
      "On évalue toujours l'appel le plus intérieur en premier.",
      "`h(2)` renvoie $3 \\times 2 = 6$. L'expression devient `h(6)`.",
      "`h(6)` renvoie $3 \\times 6 = 18$.",
      "`h(h(2))` renvoie $18$."
    ),
    tags: ["premiere", "maths", "algorithmique", "fonctions", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_fct_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_fonctions",
    difficulty: 5,
    theme: "neutral",
    text: "Une fonction Python ne contient aucune instruction `return`. Que renvoie-t-elle ?",
    format: "qcm",
    choices: [
      "rien d'utilisable : la valeur spéciale `None`",
      "$0$",
      "la dernière valeur calculée",
      "une erreur",
    ],
    expected: ["rien d'utilisable : la valeur spéciale `None`"],
    comparator: "mcq_exact",
    hint: "Une fonction peut s'exécuter sans rien renvoyer.",
    explanation: exp(
      "Sans `return`, la fonction exécute bien ses instructions, mais ne transmet aucun résultat.",
      "Python renvoie alors `None`, qui signifie « aucune valeur ».",
      "C'est l'erreur classique : utiliser `print` à la place de `return`. L'affichage apparaît à l'écran, mais le résultat ne peut pas être réutilisé dans un calcul.",
      "Elle renvoie `None`."
    ),
    tags: ["premiere", "maths", "algorithmique", "fonctions", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_fct_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_fonctions",
    difficulty: 3,
    theme: "neutral",
    text: "Dans `def f(x): return 2*x + 1`, que représente `x` ?",
    format: "qcm",
    choices: [
      "le paramètre : la valeur donnée lors de l'appel",
      "le résultat renvoyé par la fonction",
      "le nom de la fonction",
      "une valeur fixée une fois pour toutes",
    ],
    expected: ["le paramètre : la valeur donnée lors de l'appel"],
    comparator: "mcq_exact",
    hint: "Il change à chaque appel : `f(3)`, `f(10)`…",
    explanation: exp(
      "Entre les parenthèses de la définition figure le paramètre : une variable d'attente.",
      "Elle prend la valeur fournie au moment de l'appel : `f(3)` donne $x = 3$, `f(10)` donne $x = 10$.",
      "Elle n'est donc pas fixée, et ne doit pas être confondue avec le résultat, qui est ce que produit `return`.",
      "`x` est le paramètre de la fonction."
    ),
    tags: ["premiere", "maths", "algorithmique", "fonctions", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_fct_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_fonctions",
    difficulty: 4,
    theme: "neutral",
    text: "Soit `def u(n): return 2*n + 1`, qui calcule le terme de rang $n$ d'une suite. Que renvoie `u(0)` ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Remplace `n` par $0$.",
    explanation: exp(
      "Une fonction Python traduit ici la formule explicite d'une suite : `u(n)` donne $u_n$.",
      "On remplace `n` par $0$ : $2 \\times 0 + 1$.",
      "$= 1$.",
      "`u(0)` renvoie $1$ : c'est le premier terme de la suite."
    ),
    tags: ["premiere", "maths", "algorithmique", "fonctions", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_fct_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_modulaire",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la différence entre DÉFINIR une fonction et l'APPELER ?",
    format: "qcm",
    choices: [
      "définir décrit le calcul ; appeler l'exécute sur une valeur",
      "il n'y a aucune différence",
      "définir exécute le calcul ; appeler l'affiche",
      "on ne peut appeler une fonction qu'une seule fois",
    ],
    expected: ["définir décrit le calcul ; appeler l'exécute sur une valeur"],
    comparator: "mcq_exact",
    hint: "Écrire une recette n'est pas la cuisiner.",
    explanation: exp(
      "La définition (`def f(x): ...`) écrit la marche à suivre, sans rien calculer.",
      "L'appel (`f(3)`) déclenche l'exécution en donnant une valeur au paramètre.",
      "Une fonction se définit une fois et s'appelle autant de fois qu'on veut, avec des valeurs différentes.",
      "Définir décrit le calcul ; appeler l'exécute sur une valeur."
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

  /* ===================== ALGO_VARIABLE ===================== */
  {
    kind: "fixed",
    id: "premiere_algo_var_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_variable",
    difficulty: 3,
    theme: "neutral",
    text: "Que fait l'instruction `a = a + 1` ?",
    format: "qcm",
    choices: [
      "elle remplace le contenu de `a` par son ancienne valeur augmentée de $1$",
      "elle affirme que $a$ est égal à $a + 1$, ce qui est impossible",
      "elle crée une nouvelle variable appelée `a + 1`",
      "elle ne fait rien",
    ],
    expected: ["elle remplace le contenu de `a` par son ancienne valeur augmentée de $1$"],
    comparator: "mcq_exact",
    hint: "En programmation, `=` n'est pas le signe égal des mathématiques.",
    explanation: exp(
      "En Python, `=` est le signe d'AFFECTATION : il range une valeur dans une variable. Ce n'est pas une égalité mathématique.",
      "On lit toujours de droite à gauche : la machine calcule d'abord la partie droite, avec les valeurs actuelles.",
      "Si `a` valait $7$, elle calcule $7 + 1 = 8$, puis range $8$ dans `a`. L'ancienne valeur est perdue.",
      "`a = a + 1` augmente `a` de $1$ — c'est l'instruction la plus courante des compteurs."
    ),
    tags: ["premiere", "maths", "algorithmique", "variable", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_var_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_variable",
    difficulty: 4,
    theme: "neutral",
    text: "Que valent `a` et `b` après : `a = 3` ; `b = 5` ; `a = b` ; `b = a` ?",
    format: "qcm",
    choices: [
      "`a` vaut $5$ et `b` vaut $5$",
      "`a` vaut $5$ et `b` vaut $3$",
      "`a` vaut $3$ et `b` vaut $5$",
      "`a` vaut $3$ et `b` vaut $3$",
    ],
    expected: ["`a` vaut $5$ et `b` vaut $5$"],
    comparator: "mcq_exact",
    hint: "Suis les instructions une par une, en notant les valeurs après chacune.",
    explanation: exp(
      "Les instructions s'exécutent dans l'ordre, l'une après l'autre : il faut suivre l'état des variables pas à pas.",
      "Après `a = 3` et `b = 5` : `a` vaut $3$, `b` vaut $5$. Puis `a = b` range $5$ dans `a` : la valeur $3$ est PERDUE.",
      "Enfin `b = a` range dans `b` la valeur actuelle de `a`, c'est-à-dire $5$ : cela ne change rien.",
      "Les deux valent $5$ — pour échanger deux variables, il faut une troisième variable temporaire."
    ),
    tags: ["premiere", "maths", "algorithmique", "variable", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_var_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_variable",
    difficulty: 4,
    theme: "neutral",
    text: "Comment échanger les contenus de deux variables `a` et `b` ?",
    format: "qcm",
    choices: [
      "utiliser une variable temporaire : `t = a` ; `a = b` ; `b = t`",
      "écrire `a = b` puis `b = a`",
      "écrire `a = b = a`",
      "c'est impossible en Python",
    ],
    expected: ["utiliser une variable temporaire : `t = a` ; `a = b` ; `b = t`"],
    comparator: "mcq_exact",
    hint: "Que devient l'ancienne valeur de `a` si on écrit `a = b` en premier ?",
    explanation: exp(
      "Une affectation écrase l'ancienne valeur : si on ne l'a pas mise à l'abri, elle est définitivement perdue.",
      "On sauvegarde donc d'abord `a` dans une variable temporaire : `t = a`.",
      "On peut alors écraser `a` avec `b` (`a = b`), puis récupérer l'ancienne valeur de `a` dans `b` (`b = t`).",
      "Trois instructions et une variable de plus — c'est le premier vrai réflexe de programmation."
    ),
    tags: ["premiere", "maths", "algorithmique", "variable", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_var_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_variable",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la différence entre le signe `=` en Python et le signe $=$ en mathématiques.",
    format: "open",
    expected: ["affectation", "range", "stocke", "egalite", "égalité", "droite a gauche", "droite à gauche"],
    comparator: "contains_keyword",
    hint: "L'un décrit un état, l'autre donne un ordre.",
    explanation: exp(
      "En mathématiques, $a = b$ est une AFFIRMATION : elle est vraie ou fausse, et elle est symétrique — $a = b$ équivaut à $b = a$.",
      "En Python, `a = b` est un ORDRE : range dans `a` la valeur de `b`. Ce n'est pas symétrique du tout.",
      "On lit de droite à gauche : la partie droite est calculée d'abord, puis rangée à gauche. C'est ce qui rend `a = a + 1` parfaitement sensé en Python, alors que $a = a + 1$ n'a aucune solution en mathématiques.",
      "L'un décrit, l'autre agit : le `=` de Python est une affectation, pas une égalité."
    ),
    tags: ["premiere", "maths", "algorithmique", "variable", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_var_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_variable",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi conseille-t-on de suivre l'exécution d'un algorithme dans un tableau, ligne par ligne ?",
    format: "open",
    expected: ["etat", "état", "chaque instruction", "valeurs", "suivre", "trace"],
    comparator: "contains_keyword",
    hint: "Que faut-il connaître pour prévoir ce que fait l'instruction suivante ?",
    explanation: exp(
      "Un algorithme n'est pas une formule : son résultat dépend de l'ORDRE des instructions et de l'état des variables à chaque étape.",
      "Le tableau d'exécution note, pour chaque instruction, la valeur de chaque variable juste après.",
      "Cela évite l'erreur la plus fréquente : utiliser l'ancienne valeur d'une variable qui vient d'être modifiée. Dans une boucle, on ajoute une ligne par tour.",
      "On rend visible ce que la machine fait vraiment, au lieu de le deviner — c'est la méthode qui fait gagner le plus de points."
    ),
    tags: ["premiere", "maths", "algorithmique", "variable", "open"],
  },
  {
    kind: "template",
    id: "premiere_algo_var_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_variable",
    difficulty: 4,
    theme: "neutral",
    hint: "Exécute les instructions une par une, dans l'ordre.",
    tags: ["premiere", "maths", "algorithmique", "variable", "template"],
    generate: () => {
      const a0 = randomInt(2, 9);
      const b0 = randomInt(2, 9);
      const k = randomInt(2, 5);
      const a1 = a0 + b0;
      const b1 = a1 * k;
      return {
        text: `Que vaut \`b\` après : \`a = ${a0}\` ; \`b = ${b0}\` ; \`a = a + b\` ; \`b = a * ${k}\` ?`,
        format: "short",
        expected: [String(b1)],
        comparator: "number_equal",
        explanation: exp(
          "Les instructions s'exécutent dans l'ordre, et chaque affectation utilise les valeurs ACTUELLES des variables.",
          `Après les deux premières : \`a\` vaut $${a0}$, \`b\` vaut $${b0}$.`,
          `\`a = a + b\` range $${a0} + ${b0} = ${a1}$ dans \`a\`. Puis \`b = a * ${k}\` utilise la NOUVELLE valeur de \`a\` : $${a1} \\times ${k} = ${b1}$.`,
          `\`b\` vaut $${b1}$ — utiliser l'ancienne valeur de \`a\` donnerait $${a0 * k}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_algo_var_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_variable",
    difficulty: 5,
    theme: "neutral",
    hint: "Fais un tableau : une colonne par variable, une ligne par instruction.",
    tags: ["premiere", "maths", "algorithmique", "variable", "open", "template"],
    generate: () => {
      const cas = [
        { code: "`x = 4` ; `y = x` ; `x = 10`", q: "que vaut `y` ?", r: "4", mots: ["4", "copie", "avant", "ancienne"] },
        { code: "`s = 0` ; `s = s + 3` ; `s = s * 2`", q: "que vaut `s` ?", r: "6", mots: ["6", "ordre", "puis"] },
        { code: "`a = 2` ; `b = 3` ; `t = a` ; `a = b` ; `b = t`", q: "que valent `a` et `b` ?", r: "3 et 2", mots: ["echange", "échange", "temporaire", "3", "2"] },
        { code: "`n = 7` ; `n = n - 2` ; `n = n - 2`", q: "que vaut `n` ?", r: "3", mots: ["3", "deux fois", "ordre"] },
      ];
      const c = pickOne(cas);
      return {
        text: `Exécute pas à pas : ${c.code}. ${c.q.charAt(0).toUpperCase() + c.q.slice(1)} Détaille l'état des variables après chaque instruction.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Suivre un algorithme, c'est noter l'état de chaque variable après chaque instruction : c'est le tableau d'exécution.",
          "On lit chaque affectation de droite à gauche, en utilisant les valeurs actuelles.",
          "Une variable qui a été copiée garde la valeur du MOMENT de la copie : modifier l'original ensuite ne la change pas.",
          `Résultat : ${c.r}.`
        ),
      };
    },
  },

  /* ===================== ALGO_LISTES (compléments) ===================== */
  {
    kind: "fixed",
    id: "premiere_algo_lst_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_listes",
    difficulty: 5,
    theme: "neutral",
    text: "Explique ce que construit `[2*k + 1 for k in range(5)]`, et pourquoi on appelle cela une liste « en compréhension ».",
    format: "open",
    expected: ["range", "chaque", "5 elements", "5 éléments", "1, 3, 5, 7, 9", "formule"],
    comparator: "contains_keyword",
    hint: "Quelles valeurs prend `k` ? Que devient chacune ?",
    explanation: exp(
      "Une liste en compréhension se lit comme une phrase : « la valeur $2k+1$, pour chaque $k$ pris dans `range(5)` ».",
      "`range(5)` fournit les entiers $0$, $1$, $2$, $3$, $4$ — cinq valeurs, en partant de $0$.",
      "Chacune est transformée par la formule : $1$, $3$, $5$, $7$, $9$. On obtient `[1, 3, 5, 7, 9]`.",
      "On décrit la liste par la RÈGLE qui produit ses éléments, au lieu de les écrire un par un : c'est pratique pour les termes d'une suite."
    ),
    tags: ["premiere", "maths", "algorithmique", "listes", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_lst_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_listes",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi `range(5)` ne contient-il pas le nombre $5$ ?",
    format: "open",
    expected: ["exclue", "borne", "5 valeurs", "0", "4", "convention"],
    comparator: "contains_keyword",
    hint: "Combien de valeurs veut-on, et à partir de quel nombre commence-t-on ?",
    explanation: exp(
      "`range(n)` produit les entiers de $0$ à $n - 1$ : la borne supérieure est EXCLUE.",
      "C'est une convention, mais elle est pratique : `range(5)` donne exactement CINQ valeurs, ce qui correspond à ce qu'on veut la plupart du temps.",
      "Elle s'accorde aussi avec les indices d'une liste, qui vont de $0$ à $n - 1$ : `range(len(L))` parcourt exactement les indices valides.",
      "La borne de droite est exclue — c'est la source d'erreur numéro un quand on débute, mais c'est ce qui rend le comptage juste."
    ),
    tags: ["premiere", "maths", "algorithmique", "listes", "piege", "open"],
  },
  {
    kind: "template",
    id: "premiere_algo_lst_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_listes",
    difficulty: 4,
    theme: "neutral",
    hint: "`range(n)` donne $0, 1, \\ldots, n-1$ : applique la formule à chacun.",
    tags: ["premiere", "maths", "algorithmique", "listes", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const b = randomInt(0, 4);
      const n = randomInt(3, 5);
      const vals = [];
      for (let k = 0; k < n; k += 1) vals.push(a * k + b);
      const correct = `\`[${vals.join(", ")}]\``;
      const decale = [];
      for (let k = 1; k <= n; k += 1) decale.push(a * k + b);
      return {
        text: `Que contient la liste \`[${a}*k + ${b} for k in range(${n})]\` ?`,
        format: "qcm",
        choices: [
          correct,
          `\`[${decale.join(", ")}]\``,
          `\`[${vals.slice(0, n - 1).join(", ")}]\``,
          `\`[${a}, ${b}, ${n}]\``,
        ],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une liste en compréhension applique une formule à chaque valeur fournie par `range`.",
          `\`range(${n})\` donne les entiers $0$ à $${n - 1}$ — la borne de droite est exclue.`,
          `On calcule $${a}k + ${b}$ pour chacun : ${vals.join(", ")}.`,
          `${correct} — commencer à $k = 1$ donnerait la liste décalée.`
        ),
      };
    },
  },

  /* ===================== ALGO_LISTE_MANIPULER (compléments) ===================== */
  {
    kind: "fixed",
    id: "premiere_algo_lman_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_liste_manipuler",
    difficulty: 5,
    theme: "neutral",
    text: "Une liste `L` contient $10$ éléments. Explique pourquoi `L[10]` provoque une erreur.",
    format: "open",
    expected: ["0", "9", "commence", "dernier indice", "len(L) - 1"],
    comparator: "contains_keyword",
    hint: "Quel est l'indice du premier élément ? Et du dernier ?",
    explanation: exp(
      "En Python, les indices d'une liste commencent à $0$, et non à $1$.",
      "Une liste de $10$ éléments a donc les indices $0$, $1$, …, $9$ : le dernier indice valide est $\\text{len}(L) - 1$.",
      "`L[10]` désigne un onzième élément, qui n'existe pas : Python lève une erreur `IndexError`.",
      "Le dernier élément est `L[9]`, ou plus simplement `L[-1]` — c'est le décalage de $1$ qui piège tout le monde."
    ),
    tags: ["premiere", "maths", "algorithmique", "liste_manipuler", "piege", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_lman_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_liste_manipuler",
    difficulty: 5,
    theme: "neutral",
    text: "Une liste `u` contient les termes d'une suite, avec `u[0]` pour $u_0$. Quel indice correspond à $u_{12}$, et pourquoi faut-il s'en méfier ?",
    format: "open",
    expected: ["12", "meme", "même", "commence a 0", "commence à 0", "decalage", "décalage"],
    comparator: "contains_keyword",
    hint: "Le décalage disparaît-il quand la suite commence elle aussi à l'indice $0$ ?",
    explanation: exp(
      "Le rang mathématique et l'indice Python coïncident SEULEMENT si la suite commence au rang $0$.",
      "Ici `u[0]` stocke $u_0$ : l'indice $12$ correspond donc bien à $u_{12}$, sans décalage.",
      "Mais si la suite commençait à $u_1$, alors `u[0]` contiendrait $u_1$ et $u_{12}$ se trouverait en `u[11]`. C'est là que les erreurs apparaissent.",
      "Ici c'est `u[12]` — mais il faut toujours vérifier d'abord à quel rang la suite commence."
    ),
    tags: ["premiere", "maths", "algorithmique", "liste_manipuler", "open"],
  },
  {
    kind: "template",
    id: "premiere_algo_lman_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_liste_manipuler",
    difficulty: 5,
    theme: "neutral",
    hint: "Compte les indices en partant de $0$, puis vérifie s'ils existent.",
    tags: ["premiere", "maths", "algorithmique", "liste_manipuler", "open", "template"],
    generate: () => {
      const n = randomInt(4, 8);
      const L = [];
      for (let i = 0; i < n; i += 1) L.push(randomInt(1, 30));
      const i = randomInt(0, n - 1);
      return {
        text: `Soit \`L = [${L.join(", ")}]\`. Que valent \`L[${i}]\`, \`L[-1]\` et \`L[${n}]\` ? Explique.`,
        format: "open",
        expected: [String(L[i]), String(L[n - 1]), "erreur", "n'existe pas", "indice"],
        comparator: "contains_keyword",
        explanation: exp(
          "Les indices d'une liste de $n$ éléments vont de $0$ à $n - 1$ ; les indices négatifs comptent depuis la fin.",
          `Ici la liste a $${n}$ éléments, donc les indices valides sont $0$ à $${n - 1}$.`,
          `\`L[${i}]\` vaut $${L[i]}$, et \`L[-1]\` désigne le dernier élément, soit $${L[n - 1]}$.`,
          `\`L[${n}]\` provoque une erreur : cet indice dépasse le dernier élément, qui est \`L[${n - 1}]\`.`
        ),
      };
    },
  },

  /* ===================== ALGO_LISTE_PARCOURIR (compléments) ===================== */
  {
    kind: "fixed",
    id: "premiere_algo_lpar_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_liste_parcourir",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle différence y a-t-il entre `for x in L:` et `for i in range(len(L)):` ?",
    format: "qcm",
    choices: [
      "la première parcourt les ÉLÉMENTS, la seconde les INDICES",
      "la première est plus rapide",
      "la seconde ne fonctionne pas en Python",
      "aucune : les deux font exactement la même chose",
    ],
    expected: ["la première parcourt les ÉLÉMENTS, la seconde les INDICES"],
    comparator: "mcq_exact",
    hint: "Dans chaque cas, que contient la variable de boucle au premier tour ?",
    explanation: exp(
      "Il y a deux façons de parcourir une liste, et la variable de boucle n'y contient pas la même chose.",
      "Avec `for x in L:`, la variable `x` prend successivement les VALEURS de la liste : au premier tour, `x` vaut `L[0]`.",
      "Avec `for i in range(len(L)):`, la variable `i` prend les INDICES $0$, $1$, … : il faut écrire `L[i]` pour accéder à la valeur.",
      "La première est plus lisible ; la seconde est nécessaire quand on a besoin de la position, par exemple pour comparer `L[i]` et `L[i+1]`."
    ),
    tags: ["premiere", "maths", "algorithmique", "liste_parcourir", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_lpar_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_liste_parcourir",
    difficulty: 5,
    theme: "neutral",
    text: "Que vaut `m` après : `L = [4, 9, 2, 7]` ; `m = L[0]` ; `for x in L: if x > m: m = x` ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "L'algorithme retient la plus grande valeur rencontrée jusque-là.",
    explanation: exp(
      "C'est l'algorithme classique de recherche du maximum : on garde en mémoire le meilleur candidat rencontré.",
      "On initialise `m` avec le premier élément, $4$ — surtout pas avec $0$, ce qui échouerait sur une liste de nombres négatifs.",
      "Puis on compare chaque élément : $9 > 4$ donc `m` devient $9$ ; $2$ et $7$ ne dépassent pas $9$ et ne changent rien.",
      "`m` vaut $9$ : le maximum de la liste."
    ),
    tags: ["premiere", "maths", "algorithmique", "liste_parcourir", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_lpar_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_liste_parcourir",
    difficulty: 5,
    theme: "neutral",
    text: "Décris l'algorithme qui calcule la moyenne des éléments d'une liste.",
    format: "open",
    expected: ["somme", "accumule", "len", "divise", "parcourt", "boucle"],
    comparator: "contains_keyword",
    hint: "Un accumulateur, une boucle, une division à la fin.",
    explanation: exp(
      "Calculer une moyenne demande deux informations : la somme des valeurs et leur nombre.",
      "On initialise une variable `s` à $0$, puis on parcourt la liste en ajoutant chaque élément à `s`.",
      "À la sortie de la boucle, `s` contient la somme totale. On divise alors par `len(L)`, qui donne le nombre d'éléments.",
      "Attention à placer la division APRÈS la boucle : à l'intérieur, on obtiendrait une valeur différente à chaque tour."
    ),
    tags: ["premiere", "maths", "algorithmique", "liste_parcourir", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_lpar_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_liste_parcourir",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi initialise-t-on la recherche du maximum avec `m = L[0]` plutôt qu'avec `m = 0` ?",
    format: "open",
    expected: ["negatif", "négatif", "faux", "premier element", "premier élément", "toujours"],
    comparator: "contains_keyword",
    hint: "Que donnerait `m = 0` sur une liste de températures négatives ?",
    explanation: exp(
      "L'algorithme ne remplace `m` que si un élément le DÉPASSE : la valeur de départ doit donc être atteignable.",
      "Avec `m = 0` et une liste comme `[-5, -12, -3]`, aucun élément ne dépasse $0$ : l'algorithme renverrait $0$, qui n'est même pas dans la liste.",
      "En partant de `m = L[0]`, on est sûr que la valeur de départ appartient à la liste, et le maximum trouvé aussi.",
      "`m = L[0]` fonctionne quels que soient les nombres — c'est le réflexe à garder, y compris pour le minimum."
    ),
    tags: ["premiere", "maths", "algorithmique", "liste_parcourir", "piege", "open"],
  },
  {
    kind: "template",
    id: "premiere_algo_lpar_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_liste_parcourir",
    difficulty: 4,
    theme: "neutral",
    hint: "Suis l'accumulateur tour par tour.",
    tags: ["premiere", "maths", "algorithmique", "liste_parcourir", "template"],
    generate: () => {
      const n = randomInt(3, 5);
      const L = [];
      for (let i = 0; i < n; i += 1) L.push(randomInt(1, 12));
      const somme = L.reduce((a, b) => a + b, 0);
      const maxi = Math.max(...L);
      const cherche = pickOne(["somme", "maximum"]);
      const rep = cherche === "somme" ? somme : maxi;
      return {
        text:
          cherche === "somme"
            ? `Que vaut \`s\` après : \`L = [${L.join(", ")}]\` ; \`s = 0\` ; \`for x in L: s = s + x\` ?`
            : `Que vaut \`m\` après : \`L = [${L.join(", ")}]\` ; \`m = L[0]\` ; \`for x in L: if x > m: m = x\` ?`,
        format: "short",
        expected: [String(rep)],
        comparator: "number_equal",
        explanation: exp(
          cherche === "somme"
            ? "L'accumulateur `s` garde la somme des éléments déjà rencontrés."
            : "La variable `m` garde le plus grand élément rencontré jusque-là.",
          `On parcourt la liste \`[${L.join(", ")}]\` élément par élément.`,
          cherche === "somme"
            ? `On ajoute chaque valeur : ${L.join(" + ")} = ${somme}.`
            : `On remplace \`m\` chaque fois qu'un élément le dépasse ; le plus grand est $${maxi}$.`,
          cherche === "somme" ? `\`s\` vaut $${somme}$.` : `\`m\` vaut $${maxi}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_algo_lpar_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_liste_parcourir",
    difficulty: 5,
    theme: "neutral",
    hint: "Dis ce que tu initialises, ce que fait chaque tour, et ce que tu renvoies.",
    tags: ["premiere", "maths", "algorithmique", "liste_parcourir", "open", "template"],
    generate: () => {
      const cas = [
        { but: "compter combien d'éléments d'une liste sont strictement positifs", init: "un compteur à 0", mots: ["compteur", "condition", "boucle"] },
        { but: "calculer la moyenne des éléments d'une liste", init: "une somme à 0", mots: ["somme", "len", "divise"] },
        { but: "trouver le plus petit élément d'une liste", init: "`m` avec le premier élément", mots: ["premier element", "premier élément", "compare", "plus petit"] },
        { but: "calculer la somme des carrés des éléments d'une liste", init: "une somme à 0", mots: ["somme", "carre", "carré", "boucle"] },
      ];
      const c = pickOne(cas);
      return {
        text: `Décris un algorithme qui permet de ${c.but}. Précise l'initialisation, ce que fait chaque tour de boucle, et ce que tu affiches à la fin.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Tout parcours de liste suit le même schéma : initialiser, répéter pour chaque élément, conclure après la boucle.",
          `Ici on initialise ${c.init}.`,
          "Dans la boucle, on traite l'élément courant et on met à jour la variable accumulée — sans jamais afficher à l'intérieur.",
          "Après la boucle seulement, on produit le résultat : c'est l'erreur la plus fréquente de placer cette étape trop tôt."
        ),
      };
    },
  },

  /* ===================== ALGO_CONDITION ===================== */
  {
    kind: "fixed",
    id: "premiere_algo_cond_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_condition",
    difficulty: 3,
    theme: "neutral",
    text: "En Python, quel symbole teste l'égalité de deux valeurs ?",
    format: "qcm",
    choices: ["`==`", "`=`", "`:=`", "`equals`"],
    expected: ["`==`"],
    comparator: "mcq_exact",
    hint: "Le simple `=` sert déjà à autre chose.",
    explanation: exp(
      "Python distingue deux opérations que les mathématiques écrivent avec le même signe.",
      "`=` est l'AFFECTATION : elle range une valeur dans une variable.",
      "`==` est le TEST d'égalité : il compare et renvoie `True` ou `False`. Écrire `if x = 3:` provoque une erreur de syntaxe — c'est un garde-fou utile du langage.",
      "On teste avec `==` et on affecte avec `=`."
    ),
    tags: ["premiere", "maths", "algorithmique", "condition", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_cond_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_condition",
    difficulty: 4,
    theme: "neutral",
    text: "Que vaut `p` après : `x = 4` ; `if x > 5: p = 1` ; `else: p = 2` ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "La condition est-elle vraie pour $x = 4$ ?",
    explanation: exp(
      "Une instruction `if ... else` exécute exactement UN des deux blocs, selon que la condition est vraie ou fausse.",
      "On évalue d'abord la condition avec la valeur actuelle : $4 > 5$ est faux.",
      "C'est donc le bloc `else` qui s'exécute : `p = 2`. Le bloc `if` est complètement ignoré.",
      "`p` vaut $2$ — les deux blocs ne s'exécutent jamais tous les deux."
    ),
    tags: ["premiere", "maths", "algorithmique", "condition", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_cond_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_condition",
    difficulty: 5,
    theme: "neutral",
    text: "Que vaut `n` après : `n = 0` ; `for x in [3, 8, 1, 9, 5]: if x > 4: n = n + 1` ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Le compteur augmente uniquement quand la condition est vraie.",
    explanation: exp(
      "Un compteur conditionnel n'augmente que pour les éléments qui vérifient le test : c'est le motif « compter combien ».",
      "On parcourt la liste et on teste chaque élément contre $4$.",
      "$3$ non, $8$ oui, $1$ non, $9$ oui, $5$ oui : trois éléments dépassent $4$.",
      "`n` vaut $3$ — l'algorithme compte les éléments, il ne les additionne pas."
    ),
    tags: ["premiere", "maths", "algorithmique", "condition", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_cond_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_condition",
    difficulty: 5,
    theme: "reunion",
    text: "Un programme calcule le prix d'entrée à la piscine de Saint-Paul : $2$ € pour les moins de $12$ ans, $4$ € sinon. Quelle écriture est correcte ?",
    format: "qcm",
    choices: [
      "`if age < 12: prix = 2` puis `else: prix = 4`",
      "`if age < 12: prix = 2` puis `if age < 12: prix = 4`",
      "`if age = 12: prix = 2` puis `else: prix = 4`",
      "`prix = 2 and 4`",
    ],
    expected: ["`if age < 12: prix = 2` puis `else: prix = 4`"],
    comparator: "mcq_exact",
    hint: "Deux cas qui s'excluent : quelle structure les traduit ?",
    explanation: exp(
      "Deux tarifs qui s'excluent se traduisent par une structure `if ... else` : un seul des deux blocs s'exécute.",
      "La condition `age < 12` sépare exactement les deux cas — attention à `<` et non `=`, qui ne testerait que l'âge de $12$ ans pile.",
      "La deuxième proposition écraserait toujours le prix par $4$ dans le second test : tout le monde paierait $4$ €.",
      "`if age < 12: prix = 2` / `else: prix = 4` — et `age = 12` serait de toute façon une affectation, donc une erreur."
    ),
    tags: ["premiere", "maths", "algorithmique", "condition", "reunion", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_cond_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_condition",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la différence entre écrire deux `if` à la suite et écrire `if ... else` ?",
    format: "open",
    expected: ["else", "un seul", "les deux", "exclusif", "independant", "indépendant"],
    comparator: "contains_keyword",
    hint: "Avec deux `if`, les deux blocs peuvent-ils s'exécuter ?",
    explanation: exp(
      "`if ... else` propose deux issues EXCLUSIVES : exactement un bloc s'exécute, jamais les deux.",
      "Deux `if` successifs sont deux tests INDÉPENDANTS : chacun est évalué, et les deux blocs peuvent s'exécuter si les deux conditions sont vraies.",
      "Cela change le résultat : avec `if x > 0: s = 1` puis `if x > 10: s = 2`, un $x$ valant $20$ passe dans les deux et `s` finit à $2$. Avec un `else`, il n'aurait pris que la première branche.",
      "L'un choisit, l'autre cumule : c'est une source d'erreur classique quand on traduit des tarifs ou des barèmes."
    ),
    tags: ["premiere", "maths", "algorithmique", "condition", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_cond_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_condition",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi Python refuse-t-il d'exécuter `if x = 3:` ? Explique en quoi c'est une protection utile.",
    format: "open",
    expected: ["affectation", "test", "==", "erreur", "confusion"],
    comparator: "contains_keyword",
    hint: "Que ferait cette ligne si le langage l'acceptait ?",
    explanation: exp(
      "`=` affecte, `==` teste : ce sont deux opérations différentes, malgré la ressemblance avec le signe égal des mathématiques.",
      "Dans `if x = 3:`, Python voit une affectation là où il attend une condition vraie ou fausse : il refuse et signale une erreur de syntaxe.",
      "C'est une protection : si le langage l'acceptait, la ligne rangerait $3$ dans `x` au lieu de le tester, et le programme donnerait un résultat faux SANS message d'erreur.",
      "Une erreur signalée vaut mieux qu'un programme qui tourne et se trompe en silence."
    ),
    tags: ["premiere", "maths", "algorithmique", "condition", "open"],
  },
  {
    kind: "template",
    id: "premiere_algo_cond_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_condition",
    difficulty: 4,
    theme: "neutral",
    hint: "Évalue la condition avec la valeur donnée, puis exécute le bloc correspondant.",
    tags: ["premiere", "maths", "algorithmique", "condition", "template"],
    generate: () => {
      const x = randomInt(1, 20);
      const seuil = randomInt(5, 15);
      const a = randomInt(1, 9);
      const b = randomInt(1, 9);
      const rep = x > seuil ? a : b;
      return {
        text: `Que vaut \`p\` après : \`x = ${x}\` ; \`if x > ${seuil}: p = ${a}\` ; \`else: p = ${b}\` ?`,
        format: "short",
        expected: [String(rep)],
        comparator: "number_equal",
        explanation: exp(
          "Une structure `if ... else` exécute exactement un des deux blocs, selon la valeur de la condition.",
          `On évalue la condition : $${x} > ${seuil}$ est ${x > seuil ? "vrai" : "faux"}.`,
          x > seuil
            ? `Le bloc \`if\` s'exécute : \`p\` reçoit $${a}$, et le bloc \`else\` est ignoré.`
            : `Le bloc \`if\` est ignoré : c'est le bloc \`else\` qui s'exécute, et \`p\` reçoit $${b}$.`,
          `\`p\` vaut $${rep}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_algo_cond_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_condition",
    difficulty: 5,
    theme: "neutral",
    hint: "Sépare bien les cas : s'excluent-ils, ou peuvent-ils se cumuler ?",
    tags: ["premiere", "maths", "algorithmique", "condition", "open", "template"],
    generate: () => {
      const cas = [
        { situation: "un tarif : $3$ € pour les moins de $10$ ans, $6$ € sinon", mots: ["else", "deux cas", "exclusif", "if"] },
        { situation: "une mention : « admis » si la moyenne atteint $10$, « refusé » sinon", mots: ["else", "deux cas", "exclusif", "if"] },
        { situation: "compter, dans une liste de notes, combien sont supérieures à $12$", mots: ["compteur", "boucle", "if", "condition"] },
        { situation: "un barème : $0$ € en dessous de $18$ ans, $5$ € entre $18$ et $60$ ans, $2$ € au-delà", mots: ["elif", "trois cas", "else", "ordre"] },
      ];
      const c = pickOne(cas);
      return {
        text: `Écris en Python, ou décris précisément, l'algorithme qui traite ${c.situation}. Justifie la structure conditionnelle que tu choisis.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Le choix de la structure dépend du nombre de cas et de leur exclusivité : `if` seul, `if ... else` pour deux cas exclusifs, `if ... elif ... else` pour davantage.",
          `Ici on repère les cas décrits dans : ${c.situation}.`,
          "On écrit ensuite les conditions dans un ordre tel qu'aucun cas n'est attrapé par une condition antérieure — l'ordre compte dès qu'il y a trois cas.",
          "Contrôle final : chaque valeur possible doit tomber dans un cas et un seul."
        ),
      };
    },
  },

  /* ===================== ALGO_WHILE (compléments) ===================== */
  {
    kind: "fixed",
    id: "premiere_algo_whl_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_while",
    difficulty: 5,
    theme: "neutral",
    text: "Que se passe-t-il si la condition d'une boucle `while` ne devient jamais fausse ?",
    format: "qcm",
    choices: [
      "le programme tourne indéfiniment : c'est une boucle infinie",
      "Python s'arrête après $1000$ tours",
      "la boucle ne s'exécute pas du tout",
      "Python signale une erreur avant de commencer",
    ],
    expected: ["le programme tourne indéfiniment : c'est une boucle infinie"],
    comparator: "mcq_exact",
    hint: "Qui décide de l'arrêt dans une boucle non bornée ?",
    explanation: exp(
      "Une boucle `while` ne s'arrête que lorsque sa condition devient fausse : rien d'autre ne la limite.",
      "Si aucune instruction du corps ne fait évoluer la condition vers le faux, elle reste vraie pour toujours.",
      "Le programme tourne alors indéfiniment. L'oubli classique est de ne pas mettre à jour la variable testée — par exemple écrire `while u < 100:` sans jamais modifier `u`.",
      "C'est une boucle infinie : le prix à payer pour la souplesse du `while`."
    ),
    tags: ["premiere", "maths", "algorithmique", "while", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_whl_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_while",
    difficulty: 4,
    theme: "neutral",
    text: "Combien de fois s'exécute le corps de `n = 10` ; `while n < 5: n = n + 1` ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "La condition est testée AVANT le premier tour.",
    explanation: exp(
      "Une boucle `while` teste sa condition avant chaque tour, y compris avant le tout premier.",
      "Ici la condition $10 < 5$ est fausse dès le départ.",
      "Le corps n'est donc jamais exécuté : la boucle est sautée entièrement. C'est une différence importante avec une boucle `for`, dont le nombre de tours est fixé d'avance.",
      "Zéro fois — une boucle `while` peut parfaitement ne jamais tourner."
    ),
    tags: ["premiere", "maths", "algorithmique", "while", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_whl_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_while",
    difficulty: 5,
    theme: "neutral",
    text: "Comment choisit-on entre une boucle `for` et une boucle `while` ?",
    format: "open",
    expected: ["connait", "connaît", "nombre de tours", "avance", "condition", "seuil"],
    comparator: "contains_keyword",
    hint: "Sait-on à l'avance combien de tours il faudra ?",
    explanation: exp(
      "Les deux boucles répètent des instructions, mais elles ne s'arrêtent pas pour la même raison.",
      "La boucle `for` est BORNÉE : le nombre de tours est connu avant de commencer — parcourir une liste, calculer les $20$ premiers termes d'une suite.",
      "La boucle `while` est NON BORNÉE : on répète tant qu'une condition reste vraie, sans savoir combien de tours cela prendra — c'est le cas d'une recherche de seuil.",
      "Nombre de tours connu d'avance → `for` ; condition d'arrêt → `while`."
    ),
    tags: ["premiere", "maths", "algorithmique", "while", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_whl_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_while",
    difficulty: 5,
    theme: "neutral",
    text: "Que faut-il vérifier dans le corps d'une boucle `while` pour être sûr qu'elle s'arrête ?",
    format: "open",
    expected: ["variable", "condition", "evolue", "évolue", "modifie", "infinie"],
    comparator: "contains_keyword",
    hint: "Quelle variable la condition teste-t-elle, et que devient-elle à chaque tour ?",
    explanation: exp(
      "Une boucle `while` s'arrête uniquement quand sa condition devient fausse : c'est le corps de la boucle qui doit l'y amener.",
      "On repère donc la variable testée dans la condition, et on vérifie qu'une instruction du corps la modifie.",
      "Il faut en plus que cette modification aille dans le BON SENS : `while u < 100: u = u - 1` modifie bien `u`, mais s'éloigne de l'arrêt.",
      "Variable testée modifiée à chaque tour, et modifiée vers la sortie : sans les deux, la boucle est infinie."
    ),
    tags: ["premiere", "maths", "algorithmique", "while", "open"],
  },
  {
    kind: "template",
    id: "premiere_algo_whl_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_while",
    difficulty: 4,
    theme: "neutral",
    hint: "Déroule les tours un par un jusqu'à ce que la condition devienne fausse.",
    tags: ["premiere", "maths", "algorithmique", "while", "template"],
    generate: () => {
      const pas = pickOne([2, 3, 4, 5]);
      const seuil = pickOne([10, 12, 15, 20, 25]);
      let n = 0;
      while (n < seuil) n += pas;
      return {
        text: `Que vaut \`n\` à la fin de : \`n = 0\` ; \`while n < ${seuil}: n = n + ${pas}\` ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "Une boucle `while` continue tant que sa condition est vraie, et s'arrête dès qu'elle devient fausse.",
          `On part de $0$ et on ajoute $${pas}$ à chaque tour, en testant à chaque fois si \`n\` est encore inférieur à $${seuil}$.`,
          `Le dernier tour fait passer \`n\` de $${n - pas}$ à $${n}$ ; la condition $${n} < ${seuil}$ devient alors fausse.`,
          `\`n\` vaut $${n}$ — la valeur finale DÉPASSE le seuil, elle ne s'arrête pas dessus.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_algo_whl_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_while",
    difficulty: 5,
    theme: "neutral",
    hint: "Regarde si le nombre de répétitions est connu avant de lancer le calcul.",
    tags: ["premiere", "maths", "algorithmique", "while", "open", "template"],
    generate: () => {
      const cas = [
        { tache: "calculer les $30$ premiers termes d'une suite", rep: "for", mots: ["for", "borne", "connu", "30"] },
        { tache: "chercher le plus petit rang à partir duquel une suite dépasse $1000$", rep: "while", mots: ["while", "seuil", "condition", "pas connu"] },
        { tache: "calculer la somme des éléments d'une liste", rep: "for", mots: ["for", "liste", "connu", "len"] },
        { tache: "diviser un nombre par $2$ jusqu'à passer sous $1$", rep: "while", mots: ["while", "condition", "pas connu", "tant que"] },
      ];
      const c = pickOne(cas);
      return {
        text: `Pour ${c.tache}, quelle boucle choisis-tu — \`for\` ou \`while\` ? Justifie, et précise ce qui provoque l'arrêt.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Une boucle `for` est bornée : le nombre de tours est connu avant de commencer. Une boucle `while` s'arrête sur une condition, sans qu'on sache combien de tours seront nécessaires.",
          `Ici la tâche est : ${c.tache}.`,
          c.rep === "for"
            ? "Le nombre de répétitions est connu d'avance : la boucle `for` convient, et l'arrêt est automatique une fois le compteur épuisé."
            : "Le nombre de répétitions dépend du résultat des calculs : il faut une boucle `while`, et l'arrêt vient de la condition qui devient fausse.",
          c.rep === "for"
            ? "On choisit `for` : nombre de tours connu."
            : "On choisit `while` : il faut penser à faire évoluer la variable testée, sinon la boucle est infinie."
        ),
      };
    },
  },

  /* ===================== ALGO_MODULAIRE (compléments) ===================== */
  {
    kind: "fixed",
    id: "premiere_algo_mod_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_modulaire",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi découper un programme en plusieurs fonctions ?",
    format: "qcm",
    choices: [
      "pour réutiliser un même calcul à plusieurs endroits sans le réécrire",
      "pour que le programme s'exécute plus vite",
      "parce que Python l'exige au-delà de dix lignes",
      "pour éviter d'utiliser des variables",
    ],
    expected: ["pour réutiliser un même calcul à plusieurs endroits sans le réécrire"],
    comparator: "mcq_exact",
    hint: "Que se passe-t-il si le même calcul est recopié cinq fois et qu'il contient une erreur ?",
    explanation: exp(
      "Une fonction met un calcul de côté sous un nom, et permet de le rappeler autant de fois qu'on veut.",
      "On évite ainsi de recopier les mêmes lignes : le code est plus court et plus lisible.",
      "Surtout, la correction se fait à UN SEUL endroit. Un calcul recopié cinq fois oblige à corriger cinq fois — et à en oublier une.",
      "Réutiliser sans réécrire : c'est le vrai gain, bien plus que la vitesse."
    ),
    tags: ["premiere", "maths", "algorithmique", "modulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_mod_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_modulaire",
    difficulty: 5,
    theme: "neutral",
    text: "Une fonction `moyenne(L)` existe déjà. Comment l'utiliser pour comparer deux listes `A` et `B` ?",
    format: "qcm",
    choices: [
      "en écrivant `if moyenne(A) > moyenne(B):`",
      "en recopiant le calcul de la moyenne deux fois",
      "en écrivant `if moyenne(A, B):`",
      "c'est impossible : une fonction ne s'appelle qu'une fois",
    ],
    expected: ["en écrivant `if moyenne(A) > moyenne(B):`"],
    comparator: "mcq_exact",
    hint: "Une fonction peut être appelée autant de fois qu'on le souhaite, avec des arguments différents.",
    explanation: exp(
      "Une fois définie, une fonction s'appelle autant de fois que nécessaire, avec des arguments différents à chaque appel.",
      "`moyenne(A)` renvoie un nombre, `moyenne(B)` en renvoie un autre : on peut les comparer directement.",
      "L'appel se fait à l'intérieur même du test, sans variable intermédiaire — même si en créer une (`mA = moyenne(A)`) rendrait le code plus lisible.",
      "`if moyenne(A) > moyenne(B):` — c'est exactement l'intérêt d'avoir écrit la fonction."
    ),
    tags: ["premiere", "maths", "algorithmique", "modulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_mod_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_modulaire",
    difficulty: 5,
    theme: "neutral",
    text: "Comment découperais-tu en fonctions un programme qui simule $10\\,000$ parties d'un jeu et affiche le gain moyen ?",
    format: "open",
    expected: ["une fonction", "partie", "moyenne", "appelle", "boucle", "reutilis"],
    comparator: "contains_keyword",
    hint: "Une tâche = une fonction. Combien de tâches distinctes vois-tu ?",
    explanation: exp(
      "Découper, c'est isoler chaque tâche qui a un sens à elle seule et qu'on pourrait tester séparément.",
      "Une première fonction simule UNE partie et renvoie son gain : c'est la brique de base.",
      "Une seconde fonction répète l'appel $n$ fois, accumule les gains et renvoie la moyenne. Le programme principal se réduit alors à un seul appel.",
      "Deux fonctions, deux responsabilités : on peut vérifier la première toute seule, et changer les règles du jeu sans toucher au calcul de la moyenne."
    ),
    tags: ["premiere", "maths", "algorithmique", "modulaire", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_mod_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_modulaire",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi vaut-il mieux qu'une fonction RENVOIE un résultat plutôt qu'elle l'affiche directement ?",
    format: "open",
    expected: ["return", "reutilis", "réutilis", "calcul", "afficher", "resultat"],
    comparator: "contains_keyword",
    hint: "Que peut-on faire d'une valeur renvoyée, qu'on ne peut pas faire d'un affichage ?",
    explanation: exp(
      "`return` rend une valeur au programme appelant ; `print` se contente de l'écrire à l'écran, sans rien rendre.",
      "Une valeur renvoyée peut être stockée, comparée, réutilisée dans un autre calcul.",
      "Une valeur affichée est perdue pour le programme : impossible d'écrire `if moyenne(A) > moyenne(B):` si `moyenne` se contente d'afficher. La fonction ne servirait qu'une fois.",
      "On sépare le calcul de l'affichage : la fonction calcule et renvoie, le programme principal décide quoi en faire."
    ),
    tags: ["premiere", "maths", "algorithmique", "modulaire", "open"],
  },
  {
    kind: "template",
    id: "premiere_algo_mod_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_modulaire",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule d'abord l'appel intérieur, puis le calcul extérieur.",
    tags: ["premiere", "maths", "algorithmique", "modulaire", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const b = randomInt(1, 6);
      const k = randomInt(1, 5);
      const inner = a * k + b;
      const rep = a * inner + b;
      return {
        text: `Soit \`def f(x): return ${a}*x + ${b}\`. Que renvoie \`f(f(${k}))\` ?`,
        format: "short",
        expected: [String(rep)],
        comparator: "number_equal",
        explanation: exp(
          "Un appel imbriqué se calcule de l'intérieur vers l'extérieur : la valeur renvoyée par le premier appel devient l'argument du second.",
          `On calcule d'abord \`f(${k})\` : $${a} \\times ${k} + ${b} = ${inner}$.`,
          `On calcule ensuite \`f(${inner})\` : $${a} \\times ${inner} + ${b} = ${rep}$.`,
          `\`f(f(${k}))\` renvoie $${rep}$ — c'est possible parce que la fonction RENVOIE une valeur au lieu de l'afficher.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_algo_mod_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_modulaire",
    difficulty: 5,
    theme: "neutral",
    hint: "Une tâche par fonction, et chacune renvoie son résultat.",
    tags: ["premiere", "maths", "algorithmique", "modulaire", "open", "template"],
    generate: () => {
      const cas = [
        { prog: "calculer les termes d'une suite, puis chercher le premier qui dépasse $1000$", mots: ["une fonction", "terme", "seuil", "appelle", "return"] },
        { prog: "simuler un lancer de dé, puis estimer la probabilité d'obtenir un $6$ sur $10\\,000$ lancers", mots: ["une fonction", "lancer", "boucle", "appelle", "return"] },
        { prog: "calculer la moyenne d'une classe, puis comparer deux classes", mots: ["une fonction", "moyenne", "appelle", "deux fois", "return"] },
        { prog: "calculer le prix d'un article avec remise, puis le total d'un panier", mots: ["une fonction", "prix", "boucle", "appelle", "return"] },
      ];
      const c = pickOne(cas);
      return {
        text: `Comment découperais-tu en fonctions un programme qui doit ${c.prog} ? Décris chaque fonction : ce qu'elle reçoit, ce qu'elle renvoie.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "On isole chaque tâche qui a un sens à elle seule : elle devient une fonction, avec des arguments en entrée et un `return` en sortie.",
          "La première fonction traite le cas élémentaire — un terme, un lancer, une moyenne.",
          "La seconde l'appelle en boucle pour traiter le cas général. Le programme principal se réduit alors à quelques lignes.",
          "Chaque fonction RENVOIE son résultat plutôt que de l'afficher : c'est ce qui permet à la seconde de réutiliser la première."
        ),
      };
    },
  },

  /* =========================================================
     QUESTIONS OUVERTES — compléments du 02/08/2026.
     Trois micro-compétences écrites avant le découpage n'avaient aucune
     question ouverte : deux ouvertes fixes + un TEMPLATE ouvert chacune.
  ========================================================= */

  {
    kind: "fixed",
    id: "premiere_algo_bcl_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_boucles",
    difficulty: 5,
    theme: "neutral",
    text: "En Python, à quoi sert l'indentation après un `for` ? Que se passe-t-il si on décale une ligne de trop, ou pas assez ?",
    format: "open",
    expected: ["corps", "bloc", "repete", "répète", "une seule fois", "dedans"],
    comparator: "contains_keyword",
    hint: "Comment Python sait-il où la boucle s'arrête ?",
    explanation: exp(
      "Beaucoup de langages délimitent les blocs par des accolades ; Python le fait par l'INDENTATION, le décalage vers la droite.",
      "Les lignes décalées après le `for` forment le corps de la boucle : ce sont elles qui se répètent à chaque tour.",
      "Une ligne qu'on oublie de décaler sort de la boucle : elle ne s'exécute qu'UNE fois, après tous les tours. C'est l'erreur classique de l'affichage placé au mauvais endroit — soit on voit tous les résultats intermédiaires, soit on ne voit que le dernier.",
      "L'indentation n'est pas de la mise en forme : elle change ce que fait le programme."
    ),
    tags: ["premiere", "maths", "algorithmique", "boucles", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_bcl_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_boucles",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève affirme que `for i in range(5)` fait cinq tours en partant de $1$. Corrige-le.",
    format: "open",
    expected: ["0", "4", "commence a 0", "commence à 0", "cinq tours", "exclue"],
    comparator: "contains_keyword",
    hint: "Il a raison sur le nombre de tours. Sur quoi se trompe-t-il ?",
    explanation: exp(
      "`range(n)` produit les entiers de $0$ à $n - 1$ : la borne de gauche est incluse, celle de droite exclue.",
      "L'élève a raison sur le compte : il y a bien CINQ tours.",
      "Mais la variable `i` prend les valeurs $0$, $1$, $2$, $3$, $4$ — et non $1$ à $5$. Cela n'a pas d'importance si `i` ne sert qu'à compter les tours, mais tout change si `i` intervient dans le calcul : une somme $\\sum i$ vaudrait $10$ et non $15$.",
      "Cinq tours, mais de $0$ à $4$. Pour parcourir $1$ à $5$, il faut écrire `range(1, 6)`."
    ),
    tags: ["premiere", "maths", "algorithmique", "boucles", "piege", "open"],
  },
  {
    kind: "template",
    id: "premiere_algo_bcl_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_boucles",
    difficulty: 5,
    theme: "neutral",
    hint: "Déroule les premiers tours en notant la valeur de l'accumulateur après chacun.",
    tags: ["premiere", "maths", "algorithmique", "boucles", "open", "template"],
    generate: () => {
      const n = randomInt(4, 7);
      const op = pickOne(["somme", "produit"]);
      let val = op === "somme" ? 0 : 1;
      for (let k = 1; k <= n; k += 1) val = op === "somme" ? val + k : val * k;
      return {
        text:
          op === "somme"
            ? `Que vaut \`s\` après : \`s = 0\` puis \`for k in range(1, ${n + 1}): s = s + k\` ? Explique ce que fait la boucle, tour par tour.`
            : `Que vaut \`p\` après : \`p = 1\` puis \`for k in range(1, ${n + 1}): p = p * k\` ? Explique ce que fait la boucle, tour par tour.`,
        format: "open",
        expected: [String(val), "accumulateur", "chaque tour", "range", op === "somme" ? "ajoute" : "multiplie"],
        comparator: "contains_keyword",
        explanation: exp(
          op === "somme"
            ? "La variable `s` est un ACCUMULATEUR : elle garde la somme des valeurs déjà rencontrées."
            : "La variable `p` est un ACCUMULATEUR : elle garde le produit des valeurs déjà rencontrées.",
          `\`range(1, ${n + 1})\` fait prendre à \`k\` les valeurs $1$ à $${n}$ — la borne de droite est exclue.`,
          op === "somme"
            ? `À chaque tour, on ajoute \`k\` : on calcule donc $1 + 2 + \\ldots + ${n}$.`
            : `À chaque tour, on multiplie par \`k\` : on calcule donc $1 \\times 2 \\times \\ldots \\times ${n}$, la factorielle de $${n}$.`,
          op === "somme" ? `\`s\` vaut $${val}$.` : `\`p\` vaut $${val}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_algo_seu_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_seuil",
    difficulty: 5,
    theme: "neutral",
    text: "Décris un algorithme de recherche de seuil, et explique pourquoi une boucle `for` ne conviendrait pas.",
    format: "open",
    expected: ["while", "tant que", "pas connu", "compteur", "depasse", "dépasse"],
    comparator: "contains_keyword",
    hint: "Sait-on à l'avance combien d'étapes il faudra ?",
    explanation: exp(
      "Une recherche de seuil cherche le premier rang à partir duquel une suite dépasse (ou passe sous) une valeur donnée.",
      "On initialise le terme et un compteur, puis on répète : calculer le terme suivant, augmenter le compteur — TANT QUE le seuil n'est pas franchi.",
      "Le nombre d'étapes n'est pas connu au départ : c'est justement ce qu'on cherche. Une boucle `for` exigerait de le fixer à l'avance, ce qui reviendrait à connaître la réponse avant de la chercher.",
      "D'où le `while` : la boucle s'arrête d'elle-même quand la condition devient fausse, et le compteur donne le rang cherché."
    ),
    tags: ["premiere", "maths", "algorithmique", "seuil", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_seu_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_seuil",
    difficulty: 5,
    theme: "neutral",
    text: "Dans un algorithme de seuil, pourquoi l'endroit où l'on place `n = n + 1` change-t-il le résultat ?",
    format: "open",
    expected: ["dans la boucle", "compte", "chaque etape", "chaque étape", "une fois", "decalage", "décalage"],
    comparator: "contains_keyword",
    hint: "Combien de fois s'exécute une ligne placée à l'intérieur de la boucle ? Et à l'extérieur ?",
    explanation: exp(
      "Le compteur doit enregistrer exactement le nombre d'étapes effectuées : sa place décide de ce qu'il compte.",
      "Placé DANS la boucle, il s'incrémente à chaque passage : il compte bien les étapes.",
      "Placé après la boucle, il ne s'incrémente qu'une fois, quel que soit le nombre de tours : le résultat vaut $1$, toujours. Et à l'intérieur mais avant la mise à jour du terme, il compte une étape qui n'a pas encore eu lieu — d'où un décalage de $1$.",
      "Le compteur va dans la boucle, à côté de la mise à jour du terme : on vérifie sur un petit cas connu à la main."
    ),
    tags: ["premiere", "maths", "algorithmique", "seuil", "piege", "open"],
  },
  {
    kind: "template",
    id: "premiere_algo_seu_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_seuil",
    difficulty: 5,
    theme: "neutral",
    hint: "Déroule les étapes en notant le terme et le compteur, jusqu'à franchir le seuil.",
    tags: ["premiere", "maths", "algorithmique", "seuil", "open", "template"],
    generate: () => {
      const cas = [
        { u0: 1, op: "u = u * 2", seuil: 50, croissant: true },
        { u0: 1, op: "u = u * 3", seuil: 100, croissant: true },
        { u0: 2, op: "u = u + 5", seuil: 30, croissant: true },
        { u0: 100, op: "u = u * 0.5", seuil: 10, croissant: false },
        { u0: 200, op: "u = u - 30", seuil: 50, croissant: false },
      ];
      const c = pickOne(cas);
      let u = c.u0;
      let n = 0;
      while (c.croissant ? u <= c.seuil : u >= c.seuil) {
        if (c.op.includes("* 2")) u *= 2;
        else if (c.op.includes("* 3")) u *= 3;
        else if (c.op.includes("+ 5")) u += 5;
        else if (c.op.includes("* 0.5")) u *= 0.5;
        else u -= 30;
        n += 1;
      }
      return {
        text: `On part de \`u = ${c.u0}\` et on répète \`${c.op}\`. Écris l'algorithme qui trouve le nombre d'étapes nécessaires pour que \`u\` ${c.croissant ? "dépasse" : "passe sous"} $${c.seuil}$, et donne ce nombre.`,
        format: "open",
        expected: [String(n), "while", "tant que", "compteur", "condition"],
        comparator: "contains_keyword",
        explanation: exp(
          "Un algorithme de seuil répète une opération TANT QUE le seuil n'est pas franchi, en comptant les étapes.",
          `On initialise \`u = ${c.u0}\` et \`n = 0\`, puis on écrit \`while u ${c.croissant ? "<=" : ">="} ${c.seuil}:\` avec, dans la boucle, l'opération \`${c.op}\` ET l'incrément \`n = n + 1\`.`,
          `En déroulant, le terme franchit le seuil au bout de $${n}$ étapes.`,
          `La réponse est $${n}$ — le compteur doit être dans la boucle, sinon il vaudrait $1$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_algo_fct_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_fonctions",
    difficulty: 5,
    theme: "neutral",
    text: "Dans `def f(x): return 2*x + 1`, à quoi sert le `x` ? Pourrait-on l'appeler autrement ?",
    format: "open",
    expected: ["parametre", "paramètre", "nom", "peu importe", "argument", "remplace"],
    comparator: "contains_keyword",
    hint: "Que devient ce `x` quand on écrit `f(3)` ?",
    explanation: exp(
      "Le `x` de la définition est un PARAMÈTRE : un nom provisoire donné à la valeur que la fonction recevra.",
      "Lors de l'appel `f(3)`, ce nom est remplacé partout par $3$ dans le corps de la fonction, qui renvoie alors $7$.",
      "Son nom n'a aucune importance : `def f(t): return 2*t + 1` définit exactement la même fonction. C'est comme la variable muette d'une somme en mathématiques.",
      "Le paramètre est un emplacement à remplir, pas une valeur : ce qui compte est sa PLACE dans la définition, pas la lettre choisie."
    ),
    tags: ["premiere", "maths", "algorithmique", "fonctions", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_algo_fct_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_fonctions",
    difficulty: 5,
    theme: "neutral",
    text: "En quoi une fonction Python ressemble-t-elle à une fonction mathématique, et en quoi diffère-t-elle ?",
    format: "open",
    expected: ["image", "renvoie", "plusieurs instructions", "instructions", "meme valeur", "même valeur"],
    comparator: "contains_keyword",
    hint: "Que reçoit-elle, que rend-elle, et que peut-elle faire en plus ?",
    explanation: exp(
      "Les deux objets partagent l'essentiel : ils reçoivent une valeur et en rendent une autre.",
      "Comme en mathématiques, `f(3)` renvoie toujours la même chose : la fonction associe une image à chaque argument, et $f(3)$ ne change pas d'un appel à l'autre.",
      "Mais une fonction Python peut contenir plusieurs instructions, des boucles, des tests — tout un algorithme, pas seulement une formule. Elle peut aussi ne rien renvoyer du tout si on oublie `return`, ce qui n'aurait aucun sens en mathématiques.",
      "Même idée d'association ; la version informatique est un mode d'emploi, la version mathématique une correspondance."
    ),
    tags: ["premiere", "maths", "algorithmique", "fonctions", "open"],
  },
  {
    kind: "template",
    id: "premiere_algo_fct_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "algo_fonctions",
    difficulty: 5,
    theme: "neutral",
    hint: "Remplace le paramètre par la valeur donnée, partout dans le corps de la fonction.",
    tags: ["premiere", "maths", "algorithmique", "fonctions", "open", "template"],
    generate: () => {
      const cas = [
        { d: "def u(n): return 3*n + 2", suite: "u_n = 3n + 2", k: 0, r: 2 },
        { d: "def u(n): return 2**n", suite: "u_n = 2^n", k: 5, r: 32 },
        { d: "def u(n): return n*n - 1", suite: "u_n = n^2 - 1", k: 4, r: 15 },
        { d: "def u(n): return 5 - 2*n", suite: "u_n = 5 - 2n", k: 3, r: -1 },
      ];
      const c = pickOne(cas);
      return {
        text: `La fonction \`${c.d}\` calcule le terme de rang $n$ d'une suite. Que renvoie \`u(${c.k})\` ? Explique le lien entre cette fonction et l'écriture mathématique $${c.suite}$.`,
        format: "open",
        expected: [String(c.r), "remplace", "rang", "parametre", "paramètre", "image"],
        comparator: "contains_keyword",
        explanation: exp(
          "Une fonction Python qui calcule un terme de suite fait exactement ce que fait l'écriture explicite : elle remplace $n$ par le rang demandé.",
          `L'appel \`u(${c.k})\` remplace le paramètre \`n\` par $${c.k}$ dans le corps de la fonction.`,
          `Le calcul donne $${c.r}$, c'est-à-dire $u_{${c.k}}$ pour la suite $${c.suite}$.`,
          `\`u(${c.k})\` renvoie $${c.r}$ — la fonction Python est la traduction directe de la forme explicite, ce qui permet de calculer n'importe quel rang sans les précédents.`
        ),
      };
    },
  },
];
