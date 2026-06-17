// lib/tutor-v4/questionBank/terminale-spe/maths/algorithmique-python.bank.ts
//
// Notion : Algorithmique et Python (algorithmique_python)
//
// microSkills couverts (~10 items chacun, difficultés étalées 1→5) :
//   python_lire_algorithme   — Lire et comprendre un algorithme Python
//   python_variable_boucle   — Variables, conditions et boucles
//   python_suite             — Programmer les termes d'une suite
//   python_seuil             — Déterminer un seuil
//   python_simulation_proba  — Simuler une expérience aléatoire
//   python_defi              — Exercice type bac
//
// Conventions :
// - Le code Python est affiché en blocs ```python``` (rendus par ReactMarkdown
//   via MarkdownMath).
// - Sorties numériques (valeurs de variables, compteurs) → "short" ; concepts
//   et instructions → QCM.

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

// Bloc de code Python prêt à insérer dans un énoncé.
function code(lines: string[]): string {
  return "```python\n" + lines.join("\n") + "\n```";
}

export const algorithmiquePythonBank: TutorBankItemV4[] = [
  /* =========================================================
     PYTHON_LIRE_ALGORITHME
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_py_lire_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_lire_algorithme",
    difficulty: 1,
    theme: "neutral",
    text: "Que vaut $x$ après l'exécution de ce programme ?\n\n" + code(["x = 3", "x = x + 2"]),
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "On exécute les lignes dans l'ordre.",
    explanation: exp(
      "On suit l'exécution ligne par ligne.",
      "$x$ vaut d'abord $3$, puis on lui ajoute $2$.",
      "$x = 3 + 2 = 5$.",
      "$x = 5$."
    ),
    tags: ["terminale-spe", "python", "lire", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_lire_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_lire_algorithme",
    difficulty: 1,
    theme: "neutral",
    text: "Qu'affiche ce programme ?\n\n" + code(["a = 5", "b = 2", "print(a * b)"]),
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "$a \\times b$.",
    explanation: exp(
      "`print` affiche la valeur de l'expression.",
      "On calcule $a \\times b = 5 \\times 2$.",
      "$5 \\times 2 = 10$.",
      "Le programme affiche $10$."
    ),
    tags: ["terminale-spe", "python", "lire", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_lire_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_lire_algorithme",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi sert l'instruction `print(...)` en Python ?",
    format: "qcm",
    choices: [
      "à afficher une valeur",
      "à imprimer sur papier",
      "à créer une boucle",
      "à effacer une variable",
    ],
    expected: ["à afficher une valeur"],
    comparator: "mcq_exact",
    hint: "« print » = afficher à l'écran.",
    explanation: exp(
      "`print` est l'instruction d'affichage.",
      "Elle affiche à l'écran la valeur passée en argument.",
      "Elle n'imprime pas sur papier.",
      "`print(...)` sert à afficher une valeur."
    ),
    tags: ["terminale-spe", "python", "lire", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_lire_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_lire_algorithme",
    difficulty: 2,
    theme: "neutral",
    text: "Que vaut $y$ après l'exécution ?\n\n" + code(["x = 4", "y = 2 * x - 3"]),
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "On remplace $x$ par $4$.",
    explanation: exp(
      "On évalue l'expression avec la valeur de $x$.",
      "$y = 2 \\times 4 - 3$.",
      "$8 - 3 = 5$.",
      "$y = 5$."
    ),
    tags: ["terminale-spe", "python", "lire", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_lire_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_lire_algorithme",
    difficulty: 3,
    theme: "neutral",
    text: "Que vaut $x$ à la fin ?\n\n" + code(["x = 10", "x = x - 3", "x = x - 3"]),
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "On enlève $3$ deux fois.",
    explanation: exp(
      "On suit les affectations successives.",
      "$x = 10$, puis $10 - 3 = 7$, puis $7 - 3 = 4$.",
      "$x = 4$.",
      "$x = 4$."
    ),
    tags: ["terminale-spe", "python", "lire", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_lire_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_lire_algorithme",
    difficulty: 2,
    theme: "neutral",
    text: "En Python, que fait le symbole `=` (par exemple `x = 5`) ?",
    format: "qcm",
    choices: [
      "il affecte une valeur à une variable",
      "il teste une égalité",
      "il affiche une valeur",
      "il crée une boucle",
    ],
    expected: ["il affecte une valeur à une variable"],
    comparator: "mcq_exact",
    hint: "Pour tester l'égalité, on utilise `==`.",
    explanation: exp(
      "En Python, `=` est l'opérateur d'affectation.",
      "`x = 5` range la valeur $5$ dans la variable $x$.",
      "Le test d'égalité utilise `==`.",
      "`=` affecte une valeur à une variable."
    ),
    tags: ["terminale-spe", "python", "lire", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_lire_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_lire_algorithme",
    difficulty: 3,
    theme: "neutral",
    text: "Que vaut $b$ à la fin ?\n\n" + code(["a = 2", "b = a", "a = 7"]),
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "$b$ a copié la valeur de $a$ AVANT que $a$ change.",
    explanation: exp(
      "L'affectation copie la valeur au moment de l'exécution.",
      "$b$ reçoit la valeur de $a$ (soit $2$) avant que $a$ devienne $7$.",
      "Changer $a$ ensuite ne modifie pas $b$.",
      "$b = 2$."
    ),
    tags: ["terminale-spe", "python", "lire", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_lire_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_lire_algorithme",
    difficulty: 3,
    theme: "neutral",
    text: "Qu'affiche ce programme ?\n\n" + code(["x = 7", "if x > 5:", "    print(\"grand\")", "else:", "    print(\"petit\")"]),
    format: "qcm",
    choices: ["grand", "petit", "7", "rien"],
    expected: ["grand"],
    comparator: "mcq_exact",
    hint: "On teste la condition $x > 5$.",
    explanation: exp(
      "Un test `if/else` choisit selon la condition.",
      "Ici $x = 7$, et $7 > 5$ est vrai.",
      "On exécute donc le bloc du `if`.",
      "Le programme affiche « grand »."
    ),
    tags: ["terminale-spe", "python", "lire", "condition", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_lire_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_lire_algorithme",
    difficulty: 4,
    theme: "neutral",
    text: "Qu'affiche ce programme ?\n\n" + code(["x = 3", "if x > 5:", "    print(\"grand\")", "else:", "    print(\"petit\")"]),
    format: "qcm",
    choices: ["petit", "grand", "3", "rien"],
    expected: ["petit"],
    comparator: "mcq_exact",
    hint: "$3 > 5$ est faux.",
    explanation: exp(
      "On évalue la condition du `if`.",
      "$x = 3$, et $3 > 5$ est faux.",
      "On exécute donc le bloc `else`.",
      "Le programme affiche « petit »."
    ),
    tags: ["terminale-spe", "python", "lire", "condition", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_lire_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_lire_algorithme",
    difficulty: 4,
    theme: "neutral",
    text: "Que vaut $x$ à la fin ?\n\n" + code(["x = 1", "x = x * 3", "x = x + 1"]),
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "On exécute dans l'ordre : $\\times 3$ puis $+1$.",
    explanation: exp(
      "On suit les affectations successives.",
      "$x = 1$, puis $1 \\times 3 = 3$, puis $3 + 1 = 4$.",
      "$x = 4$.",
      "$x = 4$."
    ),
    tags: ["terminale-spe", "python", "lire", "short"],
  },

  /* =========================================================
     PYTHON_VARIABLE_BOUCLE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_py_boucle_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_variable_boucle",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de fois la boucle `for i in range(5):` répète-t-elle son bloc ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "`range(5)` produit 0, 1, 2, 3, 4.",
    explanation: exp(
      "`range(n)` parcourt les entiers de $0$ à $n-1$.",
      "`range(5)` donne $0, 1, 2, 3, 4$.",
      "Cela fait $5$ valeurs, donc $5$ répétitions.",
      "La boucle répète $5$ fois."
    ),
    tags: ["terminale-spe", "python", "boucle", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_boucle_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_variable_boucle",
    difficulty: 3,
    theme: "neutral",
    text: "Quelles valeurs prend $i$ avec `for i in range(2, 6):` ?",
    format: "qcm",
    choices: [
      "$2, 3, 4, 5$",
      "$2, 3, 4, 5, 6$",
      "$0, 1, 2, 3, 4, 5$",
      "$2, 6$",
    ],
    expected: ["$2, 3, 4, 5$"],
    comparator: "mcq_exact",
    hint: "`range(a, b)` va de $a$ à $b-1$.",
    explanation: exp(
      "`range(a, b)` parcourt les entiers de $a$ à $b-1$ inclus.",
      "Ici $a = 2$ et $b = 6$.",
      "On obtient $2, 3, 4, 5$ (la borne $6$ est exclue).",
      "$i$ prend les valeurs $2, 3, 4, 5$."
    ),
    tags: ["terminale-spe", "python", "boucle", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_boucle_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_variable_boucle",
    difficulty: 3,
    theme: "neutral",
    text: "Que vaut $s$ à la fin ?\n\n" + code(["s = 0", "for i in range(4):", "    s = s + i"]),
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "On additionne $0 + 1 + 2 + 3$.",
    explanation: exp(
      "La boucle ajoute successivement les valeurs de $i$.",
      "$i$ prend $0, 1, 2, 3$ et on les cumule dans $s$.",
      "$s = 0 + 1 + 2 + 3 = 6$.",
      "$s = 6$."
    ),
    tags: ["terminale-spe", "python", "boucle", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_boucle_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_variable_boucle",
    difficulty: 3,
    theme: "neutral",
    text: "Que vaut $p$ à la fin ?\n\n" + code(["p = 1", "for i in range(3):", "    p = p * 2"]),
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "On multiplie par $2$, trois fois.",
    explanation: exp(
      "La boucle multiplie $p$ par $2$ à chaque tour.",
      "Trois tours : $1 \\to 2 \\to 4 \\to 8$.",
      "$p = 2^3 = 8$.",
      "$p = 8$."
    ),
    tags: ["terminale-spe", "python", "boucle", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_boucle_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_variable_boucle",
    difficulty: 4,
    theme: "neutral",
    text: "Que vaut $c$ à la fin ?\n\n" + code(["c = 0", "for i in range(10):", "    if i % 2 == 0:", "        c = c + 1"]),
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "On compte les nombres pairs de 0 à 9.",
    explanation: exp(
      "`i % 2 == 0` teste si $i$ est pair.",
      "Les pairs de $0$ à $9$ sont $0, 2, 4, 6, 8$.",
      "Il y en a $5$, donc $c = 5$.",
      "$c = 5$."
    ),
    tags: ["terminale-spe", "python", "boucle", "condition", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_boucle_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_variable_boucle",
    difficulty: 4,
    theme: "neutral",
    text: "Que vaut $n$ à la fin ?\n\n" + code(["n = 0", "u = 1", "while u < 100:", "    u = u * 2", "    n = n + 1"]),
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "$u$ : 1, 2, 4, 8, 16, 32, 64, 128 ; on compte les doublements.",
    explanation: exp(
      "La boucle `while` double $u$ tant qu'il est inférieur à $100$.",
      "$u$ : $1 \\to 2 \\to 4 \\to 8 \\to 16 \\to 32 \\to 64 \\to 128$.",
      "Il faut $7$ doublements pour dépasser $100$, donc $n = 7$.",
      "$n = 7$."
    ),
    tags: ["terminale-spe", "python", "boucle", "while", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_boucle_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_variable_boucle",
    difficulty: 3,
    theme: "neutral",
    text: "À quoi sert une boucle `while` ?",
    format: "qcm",
    choices: [
      "répéter tant qu'une condition est vraie",
      "répéter un nombre fixé de fois uniquement",
      "afficher une valeur",
      "définir une fonction",
    ],
    expected: ["répéter tant qu'une condition est vraie"],
    comparator: "mcq_exact",
    hint: "« while » = tant que.",
    explanation: exp(
      "La boucle `while` répète selon une condition.",
      "Elle continue tant que la condition reste vraie.",
      "Le nombre de répétitions n'est pas forcément connu à l'avance.",
      "`while` répète tant qu'une condition est vraie."
    ),
    tags: ["terminale-spe", "python", "boucle", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_boucle_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_variable_boucle",
    difficulty: 4,
    theme: "neutral",
    text: "Que vaut $s$ à la fin ?\n\n" + code(["s = 0", "for i in range(1, 5):", "    s = s + i"]),
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "$1 + 2 + 3 + 4$.",
    explanation: exp(
      "`range(1, 5)` parcourt $1, 2, 3, 4$.",
      "On les additionne dans $s$.",
      "$s = 1 + 2 + 3 + 4 = 10$.",
      "$s = 10$."
    ),
    tags: ["terminale-spe", "python", "boucle", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_boucle_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_variable_boucle",
    difficulty: 3,
    theme: "neutral",
    text: "Que teste l'expression `i % 2 == 0` ?",
    format: "qcm",
    choices: [
      "si $i$ est pair",
      "si $i$ est impair",
      "si $i$ est positif",
      "si $i$ vaut 2",
    ],
    expected: ["si $i$ est pair"],
    comparator: "mcq_exact",
    hint: "`%` est le reste de la division ; un reste nul par 2 signifie pair.",
    explanation: exp(
      "`%` donne le reste de la division euclidienne.",
      "`i % 2` est le reste de la division de $i$ par $2$.",
      "Ce reste vaut $0$ si et seulement si $i$ est pair.",
      "`i % 2 == 0` teste si $i$ est pair."
    ),
    tags: ["terminale-spe", "python", "boucle", "condition", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_py_boucle_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_variable_boucle",
    difficulty: 3,
    theme: "neutral",
    hint: "On cumule $0 + 1 + \\dots + (n-1)$.",
    tags: ["terminale-spe", "python", "boucle", "template"],
    generate: () => {
      const n = randomInt(3, 6);
      const somme = (n * (n - 1)) / 2; // 0+1+...+(n-1)
      return {
        text:
          `Que vaut $s$ à la fin ?\n\n` +
          code(["s = 0", `for i in range(${n}):`, "    s = s + i"]),
        format: "short",
        expected: [String(somme)],
        comparator: "number_equal",
        explanation: exp(
          "La boucle cumule les valeurs de $i$.",
          `$i$ prend les valeurs de $0$ à $${n - 1}$.`,
          `$s = 0 + 1 + \\dots + ${n - 1} = ${somme}$.`,
          `$s = ${somme}$.`
        ),
      };
    },
  },

  /* =========================================================
     PYTHON_SUITE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_py_suite_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_suite",
    difficulty: 3,
    theme: "neutral",
    text: "La suite $u_0 = 2$, $u_{n+1} = 2u_n + 1$. Que vaut $u$ après ce programme ?\n\n" + code(["u = 2", "for i in range(3):", "    u = 2 * u + 1"]),
    format: "short",
    expected: ["23"],
    comparator: "number_equal",
    hint: "On calcule $u_1$, $u_2$, $u_3$.",
    explanation: exp(
      "La boucle applique la relation de récurrence 3 fois.",
      "$u_1 = 2\\times2+1 = 5$, $u_2 = 2\\times5+1 = 11$, $u_3 = 2\\times11+1 = 23$.",
      "Après 3 tours, $u = 23$.",
      "$u = 23$ (c'est $u_3$)."
    ),
    tags: ["terminale-spe", "python", "suite", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_suite_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_suite",
    difficulty: 3,
    theme: "neutral",
    text: "Suite arithmétique $u_0 = 5$, $u_{n+1} = u_n + 3$. Que vaut $u$ après ce programme ?\n\n" + code(["u = 5", "for i in range(4):", "    u = u + 3"]),
    format: "short",
    expected: ["17"],
    comparator: "number_equal",
    hint: "On ajoute $3$ quatre fois.",
    explanation: exp(
      "La boucle ajoute la raison $3$ à chaque tour.",
      "Après 4 tours : $u = 5 + 4\\times3$.",
      "$5 + 12 = 17$.",
      "$u = 17$ (c'est $u_4$)."
    ),
    tags: ["terminale-spe", "python", "suite", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_suite_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_suite",
    difficulty: 4,
    theme: "neutral",
    text: "Suite géométrique $u_0 = 3$, $u_{n+1} = 2u_n$. Que vaut $u$ après ce programme ?\n\n" + code(["u = 3", "for i in range(3):", "    u = 2 * u"]),
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "On multiplie par $2$, trois fois.",
    explanation: exp(
      "La boucle multiplie $u$ par la raison $2$ à chaque tour.",
      "$3 \\to 6 \\to 12 \\to 24$.",
      "$u = 3 \\times 2^3 = 24$.",
      "$u = 24$ (c'est $u_3$)."
    ),
    tags: ["terminale-spe", "python", "suite", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_suite_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_suite",
    difficulty: 4,
    theme: "neutral",
    text: "Dans une boucle qui calcule les termes d'une suite récurrente, l'instruction `u = 2*u + 1` sert à :",
    format: "qcm",
    choices: [
      "passer de $u_n$ à $u_{n+1}$",
      "afficher $u$",
      "réinitialiser $u$",
      "compter les tours",
    ],
    expected: ["passer de $u_n$ à $u_{n+1}$"],
    comparator: "mcq_exact",
    hint: "C'est la relation de récurrence.",
    explanation: exp(
      "L'affectation applique la relation de récurrence.",
      "On remplace la valeur courante $u_n$ par $u_{n+1}$.",
      "`u = 2*u + 1` calcule le terme suivant.",
      "Elle fait passer de $u_n$ à $u_{n+1}$."
    ),
    tags: ["terminale-spe", "python", "suite", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_suite_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_suite",
    difficulty: 4,
    theme: "neutral",
    text: "Suite $u_0 = 1$, $u_{n+1} = u_n + 2$. Que vaut $u$ après ce programme ?\n\n" + code(["u = 1", "for i in range(5):", "    u = u + 2"]),
    format: "short",
    expected: ["11"],
    comparator: "number_equal",
    hint: "On ajoute $2$ cinq fois.",
    explanation: exp(
      "La boucle ajoute $2$ à chaque tour, 5 fois.",
      "$u = 1 + 5\\times2$.",
      "$1 + 10 = 11$.",
      "$u = 11$ (c'est $u_5$)."
    ),
    tags: ["terminale-spe", "python", "suite", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_suite_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_suite",
    difficulty: 5,
    theme: "neutral",
    text: "Suite $u_0 = 0$, $u_{n+1} = 3u_n + 2$. Que vaut $u$ après ce programme ?\n\n" + code(["u = 0", "for i in range(2):", "    u = 3 * u + 2"]),
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Calcule $u_1$ puis $u_2$.",
    explanation: exp(
      "On applique la relation de récurrence deux fois.",
      "$u_1 = 3\\times0+2 = 2$, $u_2 = 3\\times2+2 = 8$.",
      "Après 2 tours, $u = 8$.",
      "$u = 8$ (c'est $u_2$)."
    ),
    tags: ["terminale-spe", "python", "suite", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_suite_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_suite",
    difficulty: 4,
    theme: "neutral",
    text: "Pour calculer $u_n$ avec une boucle `for i in range(n)`, combien de fois applique-t-on la relation de récurrence en partant de $u_0$ ?",
    format: "qcm",
    choices: ["$n$ fois", "$n-1$ fois", "$n+1$ fois", "une seule fois"],
    expected: ["$n$ fois"],
    comparator: "mcq_exact",
    hint: "`range(n)` fait $n$ tours.",
    explanation: exp(
      "On part de $u_0$ et on veut atteindre $u_n$.",
      "Il faut passer de $u_0$ à $u_1$, …, jusqu'à $u_n$ : c'est $n$ étapes.",
      "`range(n)` réalise exactement $n$ tours.",
      "On applique la relation $n$ fois."
    ),
    tags: ["terminale-spe", "python", "suite", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_suite_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_suite",
    difficulty: 5,
    theme: "neutral",
    text: "Suite $u_0 = 10$, $u_{n+1} = 0.5 u_n$. Après ce programme, $u$ vaut :\n\n" + code(["u = 10", "for i in range(2):", "    u = 0.5 * u"]),
    format: "qcm",
    choices: ["$2{,}5$", "$5$", "$10$", "$1{,}25$"],
    expected: ["$2{,}5$"],
    comparator: "mcq_exact",
    hint: "On divise par 2 deux fois : $10 \\to 5 \\to 2{,}5$.",
    explanation: exp(
      "La boucle multiplie $u$ par $0{,}5$ à chaque tour.",
      "$10 \\to 5 \\to 2{,}5$.",
      "Après 2 tours, $u = 2{,}5$.",
      "$u = 2{,}5$ (c'est $u_2$)."
    ),
    tags: ["terminale-spe", "python", "suite", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_suite_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_suite",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le programme suivant, que représente la variable `u` à la fin ?\n\n" + code(["u = 2", "for i in range(5):", "    u = u + 3"]),
    format: "qcm",
    choices: ["$u_5$", "$u_0$", "la raison", "le nombre de tours"],
    expected: ["$u_5$"],
    comparator: "mcq_exact",
    hint: "On part de $u_0$ et on fait 5 tours.",
    explanation: exp(
      "Chaque tour calcule le terme suivant de la suite.",
      "On part de $u_0 = 2$ et on applique 5 fois la relation.",
      "On obtient donc $u_5$.",
      "À la fin, `u` représente $u_5$."
    ),
    tags: ["terminale-spe", "python", "suite", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_py_suite_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_suite",
    difficulty: 4,
    theme: "neutral",
    hint: "Suite arithmétique : on ajoute la raison à chaque tour.",
    tags: ["terminale-spe", "python", "suite", "template"],
    generate: () => {
      const u0 = randomInt(1, 6);
      const r = randomInt(2, 5);
      const n = randomInt(3, 5);
      const res = u0 + n * r;
      return {
        text:
          `Suite $u_0 = ${u0}$, $u_{n+1} = u_n + ${r}$. Que vaut $u$ après ce programme ?\n\n` +
          code([`u = ${u0}`, `for i in range(${n}):`, `    u = u + ${r}`]),
        format: "short",
        expected: [String(res)],
        comparator: "number_equal",
        explanation: exp(
          "La boucle ajoute la raison à chaque tour.",
          `Après ${n} tours : $u = ${u0} + ${n}\\times${r}$.`,
          `$${u0} + ${n * r} = ${res}$.`,
          `$u = ${res}$ (c'est $u_{${n}}$).`
        ),
      };
    },
  },

  /* =========================================================
     PYTHON_SEUIL
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_py_seuil_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_seuil",
    difficulty: 3,
    theme: "neutral",
    text: "Pour déterminer le plus petit $n$ tel qu'une suite dépasse un seuil, on utilise plutôt :",
    format: "qcm",
    choices: [
      "une boucle `while`",
      "une boucle `for` à nombre de tours fixé",
      "une simple affectation",
      "un `print`",
    ],
    expected: ["une boucle `while`"],
    comparator: "mcq_exact",
    hint: "On ne connaît pas le nombre de tours à l'avance.",
    explanation: exp(
      "La recherche de seuil dépend d'une condition, pas d'un nombre fixé de tours.",
      "On répète tant que le seuil n'est pas atteint.",
      "C'est exactement le rôle d'une boucle `while`.",
      "On utilise une boucle `while`."
    ),
    tags: ["terminale-spe", "python", "seuil", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_seuil_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_seuil",
    difficulty: 4,
    theme: "neutral",
    text: "Que vaut $n$ après ce programme (recherche de seuil) ?\n\n" + code(["u = 1", "n = 0", "while u < 50:", "    u = 3 * u", "    n = n + 1"]),
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "$u$ : 1, 3, 9, 27, 81 ; on s'arrête quand $u \\ge 50$.",
    explanation: exp(
      "La boucle triple $u$ tant qu'il est inférieur à $50$.",
      "$u$ : $1 \\to 3 \\to 9 \\to 27 \\to 81$, soit 4 tours pour atteindre $81 \\ge 50$.",
      "$n$ compte ces tours : $n = 4$.",
      "$n = 4$."
    ),
    tags: ["terminale-spe", "python", "seuil", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_seuil_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_seuil",
    difficulty: 4,
    theme: "neutral",
    text: "Que vaut $n$ après ce programme ?\n\n" + code(["u = 100", "n = 0", "while u > 10:", "    u = 0.5 * u", "    n = n + 1"]),
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "$u$ : 100, 50, 25, 12.5, 6.25 ; on s'arrête sous 10.",
    explanation: exp(
      "La boucle divise $u$ par 2 tant qu'il dépasse $10$.",
      "$u$ : $100 \\to 50 \\to 25 \\to 12{,}5 \\to 6{,}25$.",
      "Il faut 4 tours pour passer sous $10$, donc $n = 4$.",
      "$n = 4$."
    ),
    tags: ["terminale-spe", "python", "seuil", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_seuil_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_seuil",
    difficulty: 5,
    theme: "neutral",
    text: "Dans une recherche de seuil avec `while u < S`, que représente la variable `n` (incrémentée dans la boucle) ?",
    format: "qcm",
    choices: [
      "le rang à partir duquel le seuil est atteint",
      "la valeur du seuil",
      "la valeur de la suite",
      "la raison de la suite",
    ],
    expected: ["le rang à partir duquel le seuil est atteint"],
    comparator: "mcq_exact",
    hint: "`n` compte les étapes jusqu'au dépassement.",
    explanation: exp(
      "La boucle s'arrête dès que la suite franchit le seuil.",
      "`n` compte le nombre d'étapes effectuées.",
      "C'est le rang à partir duquel la condition de seuil est vérifiée.",
      "`n` est le rang à partir duquel le seuil est atteint."
    ),
    tags: ["terminale-spe", "python", "seuil", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_seuil_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_seuil",
    difficulty: 5,
    theme: "neutral",
    text: "Que vaut $n$ après ce programme ?\n\n" + code(["u = 1", "n = 0", "while u < 100:", "    u = 2 * u", "    n = n + 1"]),
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "$u$ : 1, 2, 4, 8, 16, 32, 64, 128.",
    explanation: exp(
      "La boucle double $u$ tant qu'il est inférieur à $100$.",
      "$u$ : $1 \\to 2 \\to 4 \\to 8 \\to 16 \\to 32 \\to 64 \\to 128$.",
      "Il faut 7 doublements pour dépasser $100$, donc $n = 7$.",
      "$n = 7$."
    ),
    tags: ["terminale-spe", "python", "seuil", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_seuil_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_seuil",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi une boucle `while` est-elle adaptée à un problème de seuil, contrairement à une boucle `for` ?",
    format: "qcm",
    choices: [
      "car le nombre de tours n'est pas connu à l'avance",
      "car elle est plus rapide",
      "car elle affiche automatiquement le résultat",
      "car elle ne s'arrête jamais",
    ],
    expected: ["car le nombre de tours n'est pas connu à l'avance"],
    comparator: "mcq_exact",
    hint: "On s'arrête sur une condition, pas après un nombre fixé de tours.",
    explanation: exp(
      "Le seuil est atteint après un nombre de tours inconnu au départ.",
      "Une boucle `for` exige de connaître ce nombre à l'avance.",
      "La boucle `while` s'arrête dès que la condition change.",
      "Car le nombre de tours n'est pas connu à l'avance."
    ),
    tags: ["terminale-spe", "python", "seuil", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_seuil_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_seuil",
    difficulty: 5,
    theme: "neutral",
    text: "Que vaut $n$ après ce programme ?\n\n" + code(["u = 2", "n = 0", "while u < 30:", "    u = u + 5", "    n = n + 1"]),
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "$u$ : 2, 7, 12, 17, 22, 27, 32.",
    explanation: exp(
      "La boucle ajoute $5$ tant que $u < 30$.",
      "$u$ : $2 \\to 7 \\to 12 \\to 17 \\to 22 \\to 27 \\to 32$.",
      "Il faut 6 tours pour atteindre $32 \\ge 30$, donc $n = 6$.",
      "$n = 6$."
    ),
    tags: ["terminale-spe", "python", "seuil", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_seuil_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_seuil",
    difficulty: 4,
    theme: "neutral",
    text: "Une suite croissante vers $+\\infty$ : que garantit l'existence d'un seuil quel qu'il soit ?",
    format: "qcm",
    choices: [
      "la boucle `while` finit toujours par s'arrêter",
      "la boucle `while` est infinie",
      "le seuil n'est jamais atteint",
      "il faut une boucle `for`",
    ],
    expected: ["la boucle `while` finit toujours par s'arrêter"],
    comparator: "mcq_exact",
    hint: "Si la suite tend vers $+\\infty$, elle dépasse tout seuil.",
    explanation: exp(
      "Une suite tendant vers $+\\infty$ dépasse n'importe quel seuil.",
      "La condition de la boucle finira donc par devenir fausse.",
      "La boucle `while` s'arrête après un nombre fini de tours.",
      "La boucle `while` finit toujours par s'arrêter."
    ),
    tags: ["terminale-spe", "python", "seuil", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_seuil_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_seuil",
    difficulty: 5,
    theme: "neutral",
    text: "Que vaut $u$ (et non $n$) à la sortie de ce programme ?\n\n" + code(["u = 1", "while u < 20:", "    u = 2 * u"]),
    format: "short",
    expected: ["32"],
    comparator: "number_equal",
    hint: "$u$ : 1, 2, 4, 8, 16, 32 ; on s'arrête au premier $\\ge 20$.",
    explanation: exp(
      "La boucle double $u$ tant qu'il est inférieur à $20$.",
      "$u$ : $1 \\to 2 \\to 4 \\to 8 \\to 16 \\to 32$.",
      "Dès que $u = 32 \\ge 20$, la boucle s'arrête.",
      "$u = 32$."
    ),
    tags: ["terminale-spe", "python", "seuil", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_seuil_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_seuil",
    difficulty: 4,
    theme: "neutral",
    text: "Que vaut $n$ après ce programme ?\n\n" + code(["u = 0", "n = 0", "while u < 12:", "    u = u + 4", "    n = n + 1"]),
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "$u$ : 0, 4, 8, 12.",
    explanation: exp(
      "La boucle ajoute $4$ tant que $u < 12$.",
      "$u$ : $0 \\to 4 \\to 8 \\to 12$.",
      "Il faut 3 tours pour atteindre $12$, donc $n = 3$.",
      "$n = 3$."
    ),
    tags: ["terminale-spe", "python", "seuil", "short"],
  },

  /* =========================================================
     PYTHON_SIMULATION_PROBA
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_py_simu_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_simulation_proba",
    difficulty: 3,
    theme: "neutral",
    text: "Que simule l'instruction `random.randint(1, 6)` ?",
    format: "qcm",
    choices: [
      "le lancer d'un dé à 6 faces",
      "un tirage entre 0 et 1",
      "le lancer d'une pièce",
      "une boucle",
    ],
    expected: ["le lancer d'un dé à 6 faces"],
    comparator: "mcq_exact",
    hint: "Un entier aléatoire entre 1 et 6.",
    explanation: exp(
      "`random.randint(a, b)` renvoie un entier aléatoire entre $a$ et $b$ inclus.",
      "Ici, on tire un entier entre $1$ et $6$.",
      "Cela correspond aux faces d'un dé.",
      "`random.randint(1, 6)` simule le lancer d'un dé à 6 faces."
    ),
    tags: ["terminale-spe", "python", "simulation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_simu_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_simulation_proba",
    difficulty: 3,
    theme: "neutral",
    text: "Que renvoie `random.random()` en Python ?",
    format: "qcm",
    choices: [
      "un nombre aléatoire dans $[0\\,;1[$",
      "un entier entre 1 et 6",
      "toujours 0",
      "un entier aléatoire quelconque",
    ],
    expected: ["un nombre aléatoire dans $[0\\,;1[$"],
    comparator: "mcq_exact",
    hint: "Un flottant entre 0 (inclus) et 1 (exclu).",
    explanation: exp(
      "`random.random()` renvoie un flottant aléatoire.",
      "Sa valeur est comprise entre $0$ inclus et $1$ exclu.",
      "On l'utilise pour modéliser une probabilité.",
      "`random.random()` renvoie un nombre dans $[0\\,;1[$."
    ),
    tags: ["terminale-spe", "python", "simulation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_simu_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_simulation_proba",
    difficulty: 4,
    theme: "neutral",
    text: "Pour simuler un événement de probabilité $0{,}3$, quelle condition utilise-t-on avec `x = random.random()` ?",
    format: "qcm",
    choices: [
      "`if x < 0.3:`",
      "`if x == 0.3:`",
      "`if x > 0.7:` puis échec",
      "`if x < 3:`",
    ],
    expected: ["`if x < 0.3:`"],
    comparator: "mcq_exact",
    hint: "La probabilité que `random()` soit inférieur à $0{,}3$ vaut $0{,}3$.",
    explanation: exp(
      "`random.random()` est uniforme sur $[0\\,;1[$.",
      "La probabilité d'obtenir une valeur inférieure à $0{,}3$ est exactement $0{,}3$.",
      "On teste donc `if x < 0.3:` pour modéliser le succès.",
      "On utilise `if x < 0.3:`."
    ),
    tags: ["terminale-spe", "python", "simulation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_simu_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_simulation_proba",
    difficulty: 4,
    theme: "neutral",
    text: "On lance un grand nombre de fois un dé simulé et on compte les « 6 ». Vers quelle fréquence tend la proportion de « 6 » ?",
    format: "qcm",
    choices: [
      "vers $\\dfrac{1}{6}$",
      "vers $\\dfrac{1}{2}$",
      "vers $1$",
      "vers $0$",
    ],
    expected: ["vers $\\dfrac{1}{6}$"],
    comparator: "mcq_exact",
    hint: "Loi des grands nombres : fréquence → probabilité.",
    explanation: exp(
      "La fréquence observée se rapproche de la probabilité théorique.",
      "Pour un dé équilibré, $P(\\text{6}) = \\dfrac{1}{6}$.",
      "Sur un grand nombre de lancers, la proportion tend vers $\\dfrac{1}{6}$.",
      "La proportion tend vers $\\dfrac{1}{6}$."
    ),
    tags: ["terminale-spe", "python", "simulation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_simu_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_simulation_proba",
    difficulty: 5,
    theme: "neutral",
    text: "Dans une simulation, `freq = succes / N` (avec $N$ grand) est une estimation de :",
    format: "qcm",
    choices: [
      "la probabilité de l'événement",
      "l'espérance",
      "le nombre de tirages",
      "l'écart-type",
    ],
    expected: ["la probabilité de l'événement"],
    comparator: "mcq_exact",
    hint: "Fréquence observée ≈ probabilité.",
    explanation: exp(
      "Une fréquence calculée sur un grand échantillon estime une probabilité.",
      "$\\dfrac{\\text{succès}}{N}$ est la fréquence observée de l'événement.",
      "Par la loi des grands nombres, elle approche la probabilité.",
      "C'est une estimation de la probabilité de l'événement."
    ),
    tags: ["terminale-spe", "python", "simulation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_simu_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_simulation_proba",
    difficulty: 3,
    theme: "neutral",
    text: "Quel module Python faut-il importer pour utiliser `randint` et `random` ?",
    format: "qcm",
    choices: ["`random`", "`math`", "`numpy` uniquement", "`print`"],
    expected: ["`random`"],
    comparator: "mcq_exact",
    hint: "Le nom du module est explicite.",
    explanation: exp(
      "Les fonctions d'aléatoire sont regroupées dans un module.",
      "On écrit `import random` en début de programme.",
      "Cela donne accès à `random.randint`, `random.random`, etc.",
      "Il faut importer le module `random`."
    ),
    tags: ["terminale-spe", "python", "simulation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_simu_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_simulation_proba",
    difficulty: 4,
    theme: "neutral",
    text: "Pour simuler une pièce équilibrée (pile/face), quelle instruction convient ?",
    format: "qcm",
    choices: [
      "`random.randint(0, 1)`",
      "`random.randint(1, 6)`",
      "`random.random() * 6`",
      "`print(0.5)`",
    ],
    expected: ["`random.randint(0, 1)`"],
    comparator: "mcq_exact",
    hint: "Deux issues équiprobables : 0 ou 1.",
    explanation: exp(
      "Une pièce a deux issues équiprobables.",
      "`random.randint(0, 1)` renvoie $0$ ou $1$ avec la même probabilité.",
      "On associe par exemple $0$ à face et $1$ à pile.",
      "On utilise `random.randint(0, 1)`."
    ),
    tags: ["terminale-spe", "python", "simulation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_simu_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_simulation_proba",
    difficulty: 5,
    theme: "neutral",
    text: "Plus le nombre $N$ de simulations est grand, plus la fréquence observée :",
    format: "qcm",
    choices: [
      "se rapproche de la probabilité théorique",
      "s'éloigne de la probabilité",
      "devient égale à 1",
      "devient nulle",
    ],
    expected: ["se rapproche de la probabilité théorique"],
    comparator: "mcq_exact",
    hint: "C'est la loi des grands nombres.",
    explanation: exp(
      "La loi des grands nombres relie fréquence et probabilité.",
      "Plus $N$ est grand, plus la fréquence se stabilise.",
      "Elle se rapproche de la probabilité théorique.",
      "La fréquence se rapproche de la probabilité théorique."
    ),
    tags: ["terminale-spe", "python", "simulation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_simu_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_simulation_proba",
    difficulty: 4,
    theme: "neutral",
    text: "Dans la simulation suivante, que compte la variable `s` ?\n\n" + code(["import random", "s = 0", "for i in range(1000):", "    if random.randint(1, 6) == 6:", "        s = s + 1"]),
    format: "qcm",
    choices: [
      "le nombre de « 6 » obtenus sur 1000 lancers",
      "la somme des faces",
      "le nombre de lancers",
      "la moyenne des faces",
    ],
    expected: ["le nombre de « 6 » obtenus sur 1000 lancers"],
    comparator: "mcq_exact",
    hint: "On incrémente `s` quand le dé donne 6.",
    explanation: exp(
      "La boucle simule 1000 lancers de dé.",
      "On ajoute $1$ à `s` chaque fois que le résultat est $6$.",
      "`s` compte donc les « 6 » obtenus.",
      "`s` est le nombre de « 6 » sur 1000 lancers."
    ),
    tags: ["terminale-spe", "python", "simulation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_simu_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_simulation_proba",
    difficulty: 5,
    theme: "neutral",
    text: "Suite de la simulation précédente : pour estimer la probabilité d'obtenir « 6 », notée $P(6)$, on calcule :",
    format: "qcm",
    choices: [
      "`s / 1000`",
      "`s * 1000`",
      "`1000 / s`",
      "`s + 1000`",
    ],
    expected: ["`s / 1000`"],
    comparator: "mcq_exact",
    hint: "Fréquence = nombre de succès / nombre d'essais.",
    explanation: exp(
      "La fréquence estimée est le rapport succès sur essais.",
      "Ici, `s` succès sur $1000$ essais.",
      "On calcule `s / 1000`.",
      "On calcule `s / 1000` (qui doit approcher $\\tfrac{1}{6}$)."
    ),
    tags: ["terminale-spe", "python", "simulation", "qcm"],
  },

  /* =========================================================
     PYTHON_DEFI — Type bac
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_py_defi_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Ce programme calcule une somme. Que vaut `s` à la fin ?\n\n" + code(["s = 0", "for k in range(1, 6):", "    s = s + k * k"]),
    format: "short",
    expected: ["55"],
    comparator: "number_equal",
    hint: "$1^2 + 2^2 + 3^2 + 4^2 + 5^2$.",
    explanation: exp(
      "La boucle cumule les carrés de $k$.",
      "$k$ va de $1$ à $5$ : $1 + 4 + 9 + 16 + 25$.",
      "$= 55$.",
      "$s = 55$."
    ),
    tags: ["terminale-spe", "python", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_defi_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Ce programme calcule une factorielle. Que vaut `f` à la fin ?\n\n" + code(["f = 1", "for k in range(1, 5):", "    f = f * k"]),
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "$1 \\times 2 \\times 3 \\times 4 = 4!$.",
    explanation: exp(
      "La boucle multiplie `f` par chaque entier de $1$ à $4$.",
      "$f = 1\\times2\\times3\\times4$.",
      "$= 24$ (c'est $4!$).",
      "$f = 24$."
    ),
    tags: ["terminale-spe", "python", "type_bac", "factorielle", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_defi_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Recherche de seuil pour une suite géométrique. Que vaut `n` à la fin ?\n\n" + code(["u = 5", "n = 0", "while u < 200:", "    u = 3 * u", "    n = n + 1"]),
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "$u$ : 5, 15, 45, 135, 405.",
    explanation: exp(
      "La boucle triple $u$ tant qu'il est inférieur à $200$.",
      "$u$ : $5 \\to 15 \\to 45 \\to 135 \\to 405$.",
      "Il faut 4 tours pour dépasser $200$, donc $n = 4$.",
      "$n = 4$."
    ),
    tags: ["terminale-spe", "python", "type_bac", "seuil", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_defi_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Ce programme renvoie le nombre de termes. Que vaut `s` à la fin ?\n\n" + code(["s = 0", "for k in range(1, 101):", "    s = s + k"]),
    format: "short",
    expected: ["5050"],
    comparator: "number_equal",
    hint: "Somme $1 + 2 + \\dots + 100 = \\dfrac{100 \\times 101}{2}$.",
    explanation: exp(
      "La boucle cumule les entiers de $1$ à $100$.",
      "On utilise $1 + 2 + \\dots + 100 = \\dfrac{100\\times101}{2}$.",
      "$= 5050$.",
      "$s = 5050$."
    ),
    tags: ["terminale-spe", "python", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_defi_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Simulation d'une loi binomiale. Que compte la variable `succes` ?\n\n" + code(["import random", "succes = 0", "for i in range(10):", "    if random.random() < 0.5:", "        succes = succes + 1"]),
    format: "qcm",
    choices: [
      "le nombre de succès sur 10 épreuves (de probabilité 0,5)",
      "la probabilité de succès",
      "le nombre total d'épreuves",
      "l'espérance",
    ],
    expected: ["le nombre de succès sur 10 épreuves (de probabilité 0,5)"],
    comparator: "mcq_exact",
    hint: "10 répétitions, succès si `random() < 0.5`.",
    explanation: exp(
      "On répète 10 épreuves de Bernoulli de probabilité $0{,}5$.",
      "On incrémente `succes` à chaque succès.",
      "`succes` suit donc une loi $\\mathcal{B}(10\\,;0{,}5)$.",
      "`succes` compte le nombre de succès sur 10 épreuves."
    ),
    tags: ["terminale-spe", "python", "type_bac", "binomiale", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_defi_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Ce programme calcule un terme de suite. Que vaut `u` à la fin ?\n\n" + code(["u = 1", "for i in range(4):", "    u = u + 2 * i"]),
    format: "short",
    expected: ["13"],
    comparator: "number_equal",
    hint: "On ajoute $2i$ pour $i = 0, 1, 2, 3$.",
    explanation: exp(
      "La boucle ajoute $2i$ à chaque tour.",
      "$u = 1 + (0 + 2 + 4 + 6)$.",
      "$1 + 12 = 13$.",
      "$u = 13$."
    ),
    tags: ["terminale-spe", "python", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_defi_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Que vaut `n` à la fin de ce programme (seuil) ?\n\n" + code(["u = 1000", "n = 0", "while u > 1:", "    u = u / 2", "    n = n + 1"]),
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "$2^{10} = 1024 > 1000$ : on divise 10 fois.",
    explanation: exp(
      "La boucle divise $u$ par 2 tant que $u > 1$.",
      "$1000 \\to 500 \\to \\dots$ ; il faut atteindre une valeur $\\le 1$.",
      "Comme $2^{10} = 1024 > 1000 > 2^9$, il faut $10$ divisions.",
      "$n = 10$."
    ),
    tags: ["terminale-spe", "python", "type_bac", "seuil", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_defi_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Ce programme parcourt une liste de notes. Que vaut `m` à la fin ?\n\n" + code(["notes = [10, 12, 8, 14]", "m = 0", "for x in notes:", "    m = m + x", "m = m / 4"]),
    format: "short",
    expected: ["11"],
    comparator: "number_equal",
    hint: "Somme des notes divisée par 4 (la moyenne).",
    explanation: exp(
      "La boucle additionne toutes les notes, puis on divise par leur nombre.",
      "Somme : $10 + 12 + 8 + 14 = 44$.",
      "$m = 44 / 4 = 11$.",
      "$m = 11$ (la moyenne)."
    ),
    tags: ["terminale-spe", "python", "type_bac", "liste", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_defi_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Que renvoie ce programme pour la suite $u_0 = 2$, $u_{n+1} = 0.5 u_n + 1$ après 2 tours ?\n\n" + code(["u = 2", "for i in range(2):", "    u = 0.5 * u + 1"]),
    format: "qcm",
    choices: ["$2$", "$1{,}5$", "$3$", "$2{,}5$"],
    expected: ["$2$"],
    comparator: "mcq_exact",
    hint: "$u_1 = 0{,}5\\times2+1 = 2$, puis $u_2 = 0{,}5\\times2+1 = 2$.",
    explanation: exp(
      "On applique la relation deux fois.",
      "$u_1 = 0{,}5\\times2 + 1 = 2$, puis $u_2 = 0{,}5\\times2 + 1 = 2$.",
      "La suite est constante égale à $2$ (point fixe).",
      "$u = 2$."
    ),
    tags: ["terminale-spe", "python", "type_bac", "suite", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_py_defi_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans une simulation de $N$ expériences, pourquoi la fréquence obtenue varie-t-elle d'une exécution à l'autre ?",
    format: "qcm",
    choices: [
      "car les tirages sont aléatoires",
      "car le programme contient une erreur",
      "car $N$ change tout seul",
      "car la probabilité change",
    ],
    expected: ["car les tirages sont aléatoires"],
    comparator: "mcq_exact",
    hint: "Chaque exécution génère de nouveaux tirages.",
    explanation: exp(
      "Une simulation repose sur des tirages aléatoires.",
      "Chaque exécution produit des résultats différents.",
      "La fréquence observée fluctue donc autour de la probabilité théorique.",
      "Car les tirages sont aléatoires."
    ),
    tags: ["terminale-spe", "python", "type_bac", "simulation", "qcm"],
  },
];
