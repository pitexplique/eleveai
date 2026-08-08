// lib/tutor-v4/questionBank/premiere-spe/maths/suites.bank.ts
//
// Chapitre : Suites numériques (notion "suites")
// microSkills :
//   suite_termes        — calculer des termes (explicite / récurrence)
//   suite_arithmetique  — raison et terme général d'une suite arithmétique
//   suite_geometrique   — raison et terme général d'une suite géométrique
//   suite_variation     — sens de variation d'une suite
//   suite_sommes        — sommes 1+2+...+n et 1+q+...+q^n
//
// PÉRIMÈTRE BO Première spé. Conventions : LaTeX, règle QCM (bonne réponse en 1re position, mélangée par le moteur).

import type { TutorBankItemV4, CanvasFigure } from "@/lib/tutor-v4/types";

// Les premiers termes affichés en ligne, avec les flèches de passage d'un
// terme au suivant : c'est le canvas qui rend visible le MÉCANISME d'une
// suite, là où l'écriture $u_{n+1} = f(u_n)$ reste abstraite.
function suiteCanvas(
  terms: Array<number | string>,
  arrows?: string[],
  rule?: string,
  missingIndex?: number
): CanvasFigure {
  return {
    kind: "suite",
    terms,
    arrows,
    rule,
    missingIndex,
    display: {
      showArrows: Boolean(arrows),
      showRule: Boolean(rule),
      showLabels: true,
    },
  };
}

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

export const suitesBank: TutorBankItemV4[] = [
  /* ===================== SUITE_TERMES ===================== */
  {
    kind: "fixed",
    id: "premiere_suites_termes_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_termes",
    difficulty: 2,
    theme: "neutral",
    text: "La suite est définie par $u_n = 2n + 1$. Combien vaut $u_3$ ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Remplace $n$ par $3$.",
    explanation: exp(
      "Une suite explicite se calcule en remplaçant $n$ par sa valeur.",
      "On remplace $n$ par $3$ dans $u_n = 2n + 1$.",
      "$u_3 = 2 \\times 3 + 1 = 7$.",
      "$u_3 = 7$."
    ),
    tags: ["premiere", "maths", "suites", "termes", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_termes_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_termes",
    difficulty: 3,
    theme: "neutral",
    text: "La suite est définie par $u_n = n^2 - 1$. Combien vaut $u_4$ ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "$u_4 = 4^2 - 1$.",
    explanation: exp(
      "On remplace $n$ par la valeur demandée dans l'expression de $u_n$.",
      "Ici $u_4 = 4^2 - 1$.",
      "$= 16 - 1 = 15$.",
      "$u_4 = 15$."
    ),
    tags: ["premiere", "maths", "suites", "termes", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_termes_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_recurrence",
    difficulty: 3,
    theme: "neutral",
    text: "La suite est définie par $u_0 = 5$ et $u_{n+1} = u_n + 4$. Combien vaut $u_2$ ?",
    format: "short",
    expected: ["13"],
    comparator: "number_equal",
    hint: "Calcule $u_1$ puis $u_2$.",
    explanation: exp(
      "Une suite par récurrence se calcule de proche en proche.",
      "$u_1 = u_0 + 4 = 9$, puis $u_2 = u_1 + 4$.",
      "$u_2 = 9 + 4 = 13$.",
      "$u_2 = 13$."
    ),
    canvas: suiteCanvas([5, "?", "?"], ["+4", "+4"], "u(n+1) = u(n) + 4", 1),
    tags: ["premiere", "maths", "suites", "recurrence", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_termes_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_recurrence",
    difficulty: 4,
    theme: "neutral",
    text: "La suite est définie par $u_0 = 2$ et $u_{n+1} = 3u_n - 1$. Combien vaut $u_2$ ?",
    format: "short",
    expected: ["14"],
    comparator: "number_equal",
    hint: "$u_1 = 3 \\times 2 - 1$, puis recommence.",
    explanation: exp(
      "On applique la relation de récurrence pas à pas.",
      "$u_1 = 3 \\times 2 - 1 = 5$, puis $u_2 = 3 \\times 5 - 1$.",
      "$u_2 = 15 - 1 = 14$.",
      "$u_2 = 14$."
    ),
    tags: ["premiere", "maths", "suites", "termes", "recurrence", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_termes_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_recurrence",
    difficulty: 3,
    theme: "neutral",
    text: "Pour la suite $u_{n+1} = f(u_n)$, que faut-il connaître pour calculer $u_5$ ?",
    format: "qcm",
    choices: [
      "Le terme précédent $u_4$",
      "Seulement la valeur de $5$",
      "Tous les termes après $u_5$",
      "Rien, $u_5 = 5$",
    ],
    expected: ["Le terme précédent $u_4$"],
    comparator: "mcq_exact",
    hint: "« Récurrence » = chaque terme dépend du précédent.",
    explanation: exp(
      "Dans une suite récurrente, chaque terme dépend du terme précédent.",
      "Pour obtenir $u_5$ avec $u_{n+1} = f(u_n)$, il faut $u_4$.",
      "On calcule donc de proche en proche depuis le premier terme.",
      "Il faut connaître le terme précédent $u_4$."
    ),
    tags: ["premiere", "maths", "suites", "termes", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_termes_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_termes",
    difficulty: 3,
    theme: "neutral",
    text: "La suite est définie par $u_n = \\dfrac{n + 3}{n + 1}$. Combien vaut $u_1$ ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Remplace $n$ par $1$ au numérateur ET au dénominateur.",
    explanation: exp(
      "Dans une suite explicite, on remplace $n$ par sa valeur partout où il apparaît.",
      "Ici $u_1 = \\dfrac{1 + 3}{1 + 1}$.",
      "$= \\dfrac{4}{2} = 2$.",
      "$u_1 = 2$."
    ),
    tags: ["premiere", "maths", "suites", "termes", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_termes_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_recurrence",
    difficulty: 4,
    theme: "neutral",
    text: "La suite est définie par $u_0 = 1$ et $u_{n+1} = u_n^2 + 1$. Combien vaut $u_2$ ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Calcule d'abord $u_1$, puis élève CE résultat au carré.",
    explanation: exp(
      "Chaque terme s'obtient en élevant le précédent au carré puis en ajoutant $1$.",
      "$u_1 = 1^2 + 1 = 2$, puis $u_2 = 2^2 + 1$.",
      "$u_2 = 4 + 1 = 5$.",
      "$u_2 = 5$."
    ),
    tags: ["premiere", "maths", "suites", "termes", "recurrence", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_termes_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_termes",
    difficulty: 3,
    theme: "reunion",
    text: "Un planteur de Bras-Panon récolte $u_n = 50 - 3n$ gousses de vanille sur un pied lors de la $n$-ième année. Combien en récolte-t-il la 4ᵉ année ?",
    format: "short",
    expected: ["38"],
    comparator: "number_equal",
    hint: "Remplace $n$ par $4$.",
    explanation: exp(
      "La formule donne directement la récolte de l'année $n$.",
      "On remplace $n$ par $4$ : $u_4 = 50 - 3 \\times 4$.",
      "$= 50 - 12 = 38$.",
      "Il récolte $38$ gousses la 4ᵉ année."
    ),
    tags: ["premiere", "maths", "suites", "termes", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_termes_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_termes",
    difficulty: 4,
    theme: "neutral",
    text: "La suite est définie par $u_n = n^2$. Quelle est l'expression de $u_{n+1}$ ?",
    format: "qcm",
    choices: ["$(n+1)^2$", "$n^2 + 1$", "$u_n + 1$", "$2n$"],
    expected: ["$(n+1)^2$"],
    comparator: "mcq_exact",
    hint: "On remplace $n$ par $n+1$ dans TOUTE l'expression.",
    explanation: exp(
      "Pour obtenir $u_{n+1}$, on remplace $n$ par $n+1$ dans l'expression de $u_n$.",
      "$u_n = n^2$ devient donc $u_{n+1} = (n+1)^2$.",
      "Attention : $(n+1)^2 = n^2 + 2n + 1$, ce n'est pas $n^2 + 1$.",
      "$u_{n+1} = (n+1)^2$."
    ),
    tags: ["premiere", "maths", "suites", "termes", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_termes_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_recurrence",
    difficulty: 5,
    theme: "neutral",
    text: "La suite est définie par $u_0 = 2$ et $u_{n+1} = 2u_n - 3$. Combien vaut $u_3$ ?",
    format: "short",
    expected: ["-5"],
    comparator: "number_equal",
    hint: "Trois calculs de suite : $u_1$, puis $u_2$, puis $u_3$. Les termes deviennent négatifs.",
    explanation: exp(
      "On applique la relation de récurrence trois fois de suite.",
      "$u_1 = 2 \\times 2 - 3 = 1$, puis $u_2 = 2 \\times 1 - 3 = -1$.",
      "$u_3 = 2 \\times (-1) - 3 = -2 - 3 = -5$.",
      "$u_3 = -5$."
    ),
    tags: ["premiere", "maths", "suites", "termes", "recurrence", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_termes_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_recurrence",
    difficulty: 3,
    theme: "neutral",
    text: "Parmi ces définitions, laquelle définit la suite PAR RÉCURRENCE ?",
    format: "qcm",
    choices: [
      "$u_0 = 1$ et $u_{n+1} = u_n + 3$",
      "$u_n = 3n + 1$",
      "$u_n = n^2 - 5$",
      "$u_n = \\dfrac{1}{n}$",
    ],
    expected: ["$u_0 = 1$ et $u_{n+1} = u_n + 3$"],
    comparator: "mcq_exact",
    hint: "Récurrence : le terme suivant se calcule à partir du précédent.",
    explanation: exp(
      "Une définition explicite donne $u_n$ directement en fonction de $n$ ; une définition par récurrence donne $u_{n+1}$ à partir de $u_n$.",
      "Les trois dernières propositions donnent $u_n$ en fonction de $n$ : elles sont explicites.",
      "Seule $u_{n+1} = u_n + 3$ utilise le terme précédent, avec un premier terme pour démarrer.",
      "C'est $u_0 = 1$ et $u_{n+1} = u_n + 3$."
    ),
    tags: ["premiere", "maths", "suites", "termes", "recurrence", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_suites_termes_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_termes",
    difficulty: 2,
    theme: "neutral",
    hint: "Remplace $n$ par la valeur demandée.",
    tags: ["premiere", "maths", "suites", "termes", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(1, 9);
      const k = randomInt(2, 6);
      const val = a * k + b;
      return {
        text: `La suite est définie par $u_n = ${a}n + ${b}$. Combien vaut $u_${k}$ ?`,
        format: "short",
        expected: [String(val)],
        comparator: "number_equal",
        explanation: exp(
          "On remplace $n$ par la valeur demandée.",
          `$u_${k} = ${a} \\times ${k} + ${b}$.`,
          `$= ${a * k} + ${b} = ${val}$.`,
          `$u_${k} = ${val}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_suites_termes_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_recurrence",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule de proche en proche depuis $u_0$.",
    tags: ["premiere", "maths", "suites", "termes", "recurrence", "template"],
    generate: () => {
      const u0 = randomInt(1, 4);
      const a = randomInt(2, 3);
      const b = randomInt(1, 5);
      const u1 = a * u0 + b;
      const u2 = a * u1 + b;
      return {
        text: `La suite est définie par $u_0 = ${u0}$ et $u_{n+1} = ${a}u_n + ${b}$. Combien vaut $u_2$ ?`,
        format: "short",
        expected: [String(u2)],
        comparator: "number_equal",
        explanation: exp(
          "On applique la relation de récurrence terme après terme.",
          `$u_1 = ${a} \\times ${u0} + ${b} = ${u1}$, puis $u_2 = ${a} \\times ${u1} + ${b}$.`,
          `$u_2 = ${u2}$.`,
          `$u_2 = ${u2}$.`
        ),
      };
    },
  },

  /* ===================== SUITE_ARITHMETIQUE ===================== */
  {
    kind: "fixed",
    id: "premiere_suites_arith_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_arithmetique",
    difficulty: 2,
    theme: "neutral",
    text: "Une suite arithmétique de premier terme $u_0$ et de raison $r$ a pour terme général :",
    format: "qcm",
    choices: ["$u_n = u_0 + nr$", "$u_n = u_0 \\times r^n$", "$u_n = u_0 + r^n$", "$u_n = n r$"],
    expected: ["$u_n = u_0 + nr$"],
    comparator: "mcq_exact",
    hint: "On ajoute $r$ à chaque étape.",
    explanation: exp(
      "Dans une suite arithmétique on ajoute la raison $r$ à chaque terme.",
      "Au bout de $n$ étapes depuis $u_0$, on a ajouté $n$ fois $r$.",
      "$u_n = u_0 + nr$.",
      "$u_n = u_0 + nr$."
    ),
    tags: ["premiere", "maths", "suites", "arithmetique", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_arith_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_arithmetique",
    difficulty: 3,
    theme: "sport",
    text: "Un coureur parcourt $3$ km le 1er jour puis $2$ km de plus chaque jour. La suite des distances est arithmétique : quelle est sa raison ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "La raison est ce qu'on ajoute à chaque étape.",
    explanation: exp(
      "La raison d'une suite arithmétique est l'écart constant entre deux termes.",
      "Ici on ajoute $2$ km chaque jour.",
      "Donc $r = 2$.",
      "La raison est $r = 2$."
    ),
    tags: ["premiere", "maths", "suites", "arithmetique", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_arith_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_arithmetique",
    difficulty: 3,
    theme: "neutral",
    text: "Une suite arithmétique vérifie $u_0 = 4$ et $r = 3$. Combien vaut $u_5$ ?",
    format: "short",
    expected: ["19"],
    comparator: "number_equal",
    hint: "$u_n = u_0 + nr$.",
    explanation: exp(
      "On utilise $u_n = u_0 + nr$.",
      "$u_5 = 4 + 5 \\times 3$.",
      "$= 4 + 15 = 19$.",
      "$u_5 = 19$."
    ),
    tags: ["premiere", "maths", "suites", "arithmetique", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_arith_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_arithmetique",
    difficulty: 4,
    theme: "neutral",
    text: "Une suite arithmétique vérifie $u_2 = 7$ et $u_5 = 19$. Quelle est sa raison ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "$u_5 - u_2 = (5 - 2)r$.",
    explanation: exp(
      "L'écart entre deux termes vaut le nombre d'étapes fois la raison.",
      "$u_5 - u_2 = (5 - 2) r$, soit $19 - 7 = 3r$.",
      "$12 = 3r$ donc $r = 4$.",
      "La raison est $r = 4$."
    ),
    tags: ["premiere", "maths", "suites", "arithmetique", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_arith_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_arithmetique",
    difficulty: 4,
    theme: "neutral",
    text: "Une suite arithmétique vérifie $u_1 = 5$ et $r = -3$. Combien vaut $u_7$ ?",
    format: "short",
    expected: ["-13"],
    comparator: "number_equal",
    hint: "Le premier terme est $u_1$, pas $u_0$ : de $u_1$ à $u_7$ il y a $6$ étapes.",
    explanation: exp(
      "Quand la suite démarre à $u_1$, la formule devient $u_n = u_1 + (n - 1)r$.",
      "De $u_1$ à $u_7$, on ajoute $6$ fois la raison : $u_7 = 5 + 6 \\times (-3)$.",
      "$= 5 - 18 = -13$.",
      "$u_7 = -13$."
    ),
    tags: ["premiere", "maths", "suites", "arithmetique", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_arith_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_arithmetique",
    difficulty: 3,
    theme: "neutral",
    text: "Parmi ces suites, laquelle est arithmétique ?",
    format: "qcm",
    choices: ["$u_n = 4n - 7$", "$u_n = 2^n$", "$u_n = n^2$", "$u_n = \\dfrac{3}{n}$"],
    expected: ["$u_n = 4n - 7$"],
    comparator: "mcq_exact",
    hint: "Arithmétique = on AJOUTE toujours le même nombre.",
    explanation: exp(
      "Une suite est arithmétique si la différence $u_{n+1} - u_n$ est constante.",
      "Pour $u_n = 4n - 7$ : $u_{n+1} - u_n = 4(n+1) - 7 - (4n - 7) = 4$.",
      "$2^n$ est géométrique, $n^2$ et $\\dfrac{3}{n}$ n'ont pas d'écart constant.",
      "$u_n = 4n - 7$ est arithmétique de raison $4$."
    ),
    tags: ["premiere", "maths", "suites", "arithmetique", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_arith_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_arithmetique",
    difficulty: 4,
    theme: "sport",
    text: "Un coureur prépare un trail : $12$ km la première semaine, puis $4$ km de plus chaque semaine. Combien de kilomètres court-il la 6ᵉ semaine ?",
    format: "short",
    expected: ["32"],
    comparator: "number_equal",
    hint: "De la 1ʳᵉ à la 6ᵉ semaine, il y a $5$ augmentations, pas $6$.",
    explanation: exp(
      "Les distances forment une suite arithmétique de premier terme $12$ et de raison $4$.",
      "De la semaine $1$ à la semaine $6$, la raison s'ajoute $5$ fois : $12 + 5 \\times 4$.",
      "$= 12 + 20 = 32$.",
      "Il court $32$ km la 6ᵉ semaine."
    ),
    tags: ["premiere", "maths", "suites", "arithmetique", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_arith_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_arithmetique",
    difficulty: 4,
    theme: "neutral",
    text: "Une suite arithmétique de raison $r = 3$ vérifie $u_4 = 20$. Combien vaut $u_0$ ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Pour remonter de $u_4$ à $u_0$, on RETIRE la raison.",
    explanation: exp(
      "On utilise $u_4 = u_0 + 4r$.",
      "Donc $20 = u_0 + 4 \\times 3$, soit $20 = u_0 + 12$.",
      "$u_0 = 20 - 12 = 8$.",
      "$u_0 = 8$."
    ),
    tags: ["premiere", "maths", "suites", "arithmetique", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_arith_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_arithmetique",
    difficulty: 5,
    theme: "neutral",
    text: "Une suite arithmétique vérifie $u_0 = 7$ et $r = 5$. Pour quel rang $n$ a-t-on $u_n = 52$ ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Écris $7 + 5n = 52$ et résous.",
    explanation: exp(
      "Le terme général est $u_n = u_0 + nr = 7 + 5n$.",
      "On cherche $n$ tel que $7 + 5n = 52$, soit $5n = 45$.",
      "$n = \\dfrac{45}{5} = 9$.",
      "C'est au rang $n = 9$."
    ),
    tags: ["premiere", "maths", "suites", "arithmetique", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_arith_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_arithmetique",
    difficulty: 2,
    theme: "neutral",
    text: "Une suite arithmétique est constante lorsque :",
    format: "qcm",
    choices: [
      "sa raison vaut $0$",
      "son premier terme vaut $0$",
      "sa raison vaut $1$",
      "son premier terme vaut $1$",
    ],
    expected: ["sa raison vaut $0$"],
    comparator: "mcq_exact",
    hint: "Que se passe-t-il si on n'ajoute rien à chaque étape ?",
    explanation: exp(
      "Dans une suite arithmétique, on ajoute la raison $r$ à chaque étape.",
      "Si $r = 0$, on n'ajoute rien : tous les termes sont égaux à $u_0$.",
      "Le premier terme, lui, ne change rien au fait que la suite bouge ou non.",
      "La suite est constante lorsque $r = 0$."
    ),
    tags: ["premiere", "maths", "suites", "arithmetique", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_arith_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_arithmetique",
    difficulty: 5,
    theme: "neutral",
    text: "On donne $u_n = 5n + 2$. Combien vaut la différence $u_{n+1} - u_n$ ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Calcule d'abord $u_{n+1} = 5(n+1) + 2$, puis soustrais.",
    explanation: exp(
      "Pour prouver qu'une suite est arithmétique, on calcule $u_{n+1} - u_n$.",
      "$u_{n+1} = 5(n+1) + 2 = 5n + 5 + 2 = 5n + 7$.",
      "$u_{n+1} - u_n = (5n + 7) - (5n + 2) = 5$.",
      "La différence vaut $5$ : la suite est arithmétique de raison $5$."
    ),
    tags: ["premiere", "maths", "suites", "arithmetique", "short"],
  },
  {
    kind: "template",
    id: "premiere_suites_arith_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_arithmetique",
    difficulty: 3,
    theme: "neutral",
    hint: "$u_n = u_0 + nr$.",
    tags: ["premiere", "maths", "suites", "arithmetique", "template"],
    generate: () => {
      const u0 = randomInt(1, 8);
      const r = randomInt(2, 7);
      const n = randomInt(4, 9);
      const un = u0 + n * r;
      return {
        text: `Une suite arithmétique vérifie $u_0 = ${u0}$ et $r = ${r}$. Combien vaut $u_${n}$ ?`,
        format: "short",
        expected: [String(un)],
        comparator: "number_equal",
        explanation: exp(
          "On applique $u_n = u_0 + nr$.",
          `$u_${n} = ${u0} + ${n} \\times ${r}$.`,
          `$= ${u0} + ${n * r} = ${un}$.`,
          `$u_${n} = ${un}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_suites_arith_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_arithmetique",
    difficulty: 4,
    theme: "neutral",
    hint: "La raison se déduit de l'écart entre deux termes connus.",
    tags: ["premiere", "maths", "suites", "arithmetique", "template"],
    generate: () => {
      const r = randomInt(2, 6);
      const u0 = randomInt(1, 5);
      const p = randomInt(2, 4);
      const q = p + randomInt(2, 4);
      const up = u0 + p * r;
      const uq = u0 + q * r;
      return {
        text: `Une suite arithmétique vérifie $u_${p} = ${up}$ et $u_${q} = ${uq}$. Quelle est sa raison ?`,
        format: "short",
        expected: [String(r)],
        comparator: "number_equal",
        explanation: exp(
          "L'écart entre deux termes vaut (nombre d'étapes) × raison.",
          `$u_${q} - u_${p} = (${q} - ${p}) r$, soit $${uq} - ${up} = ${q - p}r$.`,
          `$${uq - up} = ${q - p}r$ donc $r = ${r}$.`,
          `La raison est $r = ${r}$.`
        ),
      };
    },
  },

  /* ===================== SUITE_GEOMETRIQUE ===================== */
  {
    kind: "fixed",
    id: "premiere_suites_geo_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_geometrique",
    difficulty: 2,
    theme: "neutral",
    text: "Une suite géométrique de premier terme $u_0$ et de raison $q$ a pour terme général :",
    format: "qcm",
    choices: ["$u_n = u_0 \\times q^n$", "$u_n = u_0 + nq$", "$u_n = u_0 + q^n$", "$u_n = q^{u_0}$"],
    expected: ["$u_n = u_0 \\times q^n$"],
    comparator: "mcq_exact",
    hint: "On multiplie par $q$ à chaque étape.",
    explanation: exp(
      "Dans une suite géométrique on multiplie par la raison $q$ à chaque terme.",
      "Au bout de $n$ étapes depuis $u_0$, on a multiplié $n$ fois par $q$.",
      "$u_n = u_0 \\times q^n$.",
      "$u_n = u_0 \\times q^n$."
    ),
    tags: ["premiere", "maths", "suites", "geometrique", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_geo_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_geometrique",
    difficulty: 3,
    theme: "neutral",
    text: "Un capital de $1000$ € augmente de $5\\%$ par an. Quelle est la raison de la suite géométrique des capitaux ?",
    format: "qcm",
    choices: ["$1{,}05$", "$0{,}05$", "$5$", "$1{,}5$"],
    expected: ["$1{,}05$"],
    comparator: "mcq_exact",
    hint: "Augmenter de $5\\%$, c'est multiplier par $1 + \\dfrac{5}{100}$.",
    explanation: exp(
      "Augmenter de $t\\%$ revient à multiplier par le coefficient $1 + \\dfrac{t}{100}$.",
      "Ici $t = 5$, donc le coefficient est $1 + 0{,}05$.",
      "$= 1{,}05$.",
      "La raison est $q = 1{,}05$."
    ),
    tags: ["premiere", "maths", "suites", "geometrique", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_geo_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_geometrique",
    difficulty: 3,
    theme: "neutral",
    text: "Une suite géométrique vérifie $u_0 = 2$ et $q = 3$. Combien vaut $u_3$ ?",
    format: "short",
    expected: ["54"],
    comparator: "number_equal",
    hint: "$u_n = u_0 \\times q^n$.",
    explanation: exp(
      "On utilise $u_n = u_0 \\times q^n$.",
      "$u_3 = 2 \\times 3^3 = 2 \\times 27$.",
      "$= 54$.",
      "$u_3 = 54$."
    ),
    tags: ["premiere", "maths", "suites", "geometrique", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_geo_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_geometrique",
    difficulty: 3,
    theme: "neutral",
    text: "Une suite géométrique vérifie $u_0 = 5$ et $q = 2$. Combien vaut $u_4$ ?",
    format: "short",
    expected: ["80"],
    comparator: "number_equal",
    hint: "$u_4 = 5 \\times 2^4$.",
    explanation: exp(
      "On applique $u_n = u_0 \\times q^n$.",
      "$u_4 = 5 \\times 2^4 = 5 \\times 16$.",
      "$= 80$.",
      "$u_4 = 80$."
    ),
    tags: ["premiere", "maths", "suites", "geometrique", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_geo_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_geometrique",
    difficulty: 3,
    theme: "neutral",
    text: "Une population diminue de $20\\%$ chaque année. Quelle est la raison de la suite géométrique correspondante ?",
    format: "qcm",
    choices: ["$0{,}8$", "$-0{,}2$", "$0{,}2$", "$1{,}2$"],
    expected: ["$0{,}8$"],
    comparator: "mcq_exact",
    hint: "Diminuer de $20\\%$, c'est garder $80\\%$.",
    explanation: exp(
      "Diminuer de $t\\%$ revient à multiplier par $1 - \\dfrac{t}{100}$.",
      "Ici $t = 20$, donc le coefficient est $1 - 0{,}2$.",
      "$= 0{,}8$. Une raison négative ferait changer le signe des termes, ce qui n'a pas de sens pour une population.",
      "La raison est $q = 0{,}8$."
    ),
    tags: ["premiere", "maths", "suites", "geometrique", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_geo_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_geometrique",
    difficulty: 3,
    theme: "neutral",
    text: "Une suite géométrique vérifie $u_2 = 12$ et $u_3 = 36$. Quelle est sa raison $q$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "La raison est le QUOTIENT de deux termes consécutifs.",
    explanation: exp(
      "Dans une suite géométrique, $u_{n+1} = q \\times u_n$.",
      "Donc $q = \\dfrac{u_3}{u_2} = \\dfrac{36}{12}$.",
      "$= 3$.",
      "La raison est $q = 3$."
    ),
    tags: ["premiere", "maths", "suites", "geometrique", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_geo_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_geometrique",
    difficulty: 4,
    theme: "neutral",
    text: "Une suite géométrique vérifie $u_0 = 1000$ et $q = 0{,}5$. Combien vaut $u_3$ ?",
    format: "short",
    expected: ["125"],
    comparator: "number_equal",
    hint: "Multiplier par $0{,}5$, c'est diviser par $2$ : trois fois de suite.",
    explanation: exp(
      "On applique $u_n = u_0 \\times q^n$.",
      "$u_3 = 1000 \\times 0{,}5^3 = 1000 \\times 0{,}125$.",
      "$= 125$. Autrement dit, on divise $1000$ par $2$ trois fois : $500$, $250$, $125$.",
      "$u_3 = 125$."
    ),
    tags: ["premiere", "maths", "suites", "geometrique", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_geo_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_geometrique",
    difficulty: 3,
    theme: "neutral",
    text: "Parmi ces suites, laquelle est géométrique ?",
    format: "qcm",
    choices: ["$u_n = 3 \\times 2^n$", "$u_n = 2n + 3$", "$u_n = n^2$", "$u_n = \\dfrac{n}{2}$"],
    expected: ["$u_n = 3 \\times 2^n$"],
    comparator: "mcq_exact",
    hint: "Géométrique = on MULTIPLIE toujours par le même nombre.",
    explanation: exp(
      "Une suite est géométrique si le quotient $\\dfrac{u_{n+1}}{u_n}$ est constant.",
      "Pour $u_n = 3 \\times 2^n$ : $\\dfrac{u_{n+1}}{u_n} = \\dfrac{3 \\times 2^{n+1}}{3 \\times 2^n} = 2$.",
      "$2n + 3$ et $\\dfrac{n}{2}$ sont arithmétiques, $n^2$ n'est ni l'un ni l'autre.",
      "$u_n = 3 \\times 2^n$ est géométrique de raison $2$."
    ),
    tags: ["premiere", "maths", "suites", "geometrique", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_geo_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_geometrique",
    difficulty: 4,
    theme: "reunion",
    text: "Une colonie de $200$ tortues marines augmente de $10\\%$ par an. Combien d'individus dans $2$ ans ?",
    format: "short",
    expected: ["242"],
    comparator: "number_equal",
    hint: "Multiplie par $1{,}1$, puis encore par $1{,}1$.",
    explanation: exp(
      "Augmenter de $10\\%$ revient à multiplier par $1{,}1$ : la suite est géométrique.",
      "$u_2 = 200 \\times 1{,}1^2 = 200 \\times 1{,}21$.",
      "$= 242$. (Attention : ce n'est pas $200 + 20 + 20$, la 2ᵉ hausse porte sur $220$.)",
      "Il y aura $242$ tortues."
    ),
    tags: ["premiere", "maths", "suites", "geometrique", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_geo_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_geometrique",
    difficulty: 5,
    theme: "neutral",
    text: "Une suite géométrique de raison $q = 3$ vérifie $u_2 = 18$. Combien vaut $u_5$ ?",
    format: "short",
    expected: ["486"],
    comparator: "number_equal",
    hint: "De $u_2$ à $u_5$, on multiplie $3$ fois par la raison.",
    explanation: exp(
      "Entre deux rangs, on utilise $u_n = u_p \\times q^{n-p}$.",
      "De $u_2$ à $u_5$ il y a $3$ étapes : $u_5 = 18 \\times 3^3$.",
      "$= 18 \\times 27 = 486$.",
      "$u_5 = 486$."
    ),
    tags: ["premiere", "maths", "suites", "geometrique", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_geo_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_geometrique",
    difficulty: 5,
    theme: "neutral",
    text: "Une suite géométrique vérifie $u_0 = 1$ et $q = -2$. Combien vaut $u_3$ ?",
    format: "short",
    expected: ["-8"],
    comparator: "number_equal",
    hint: "$(-2)^3$ : un exposant impair garde le signe moins.",
    explanation: exp(
      "La raison peut être négative : les termes changent alors de signe à chaque étape.",
      "$u_3 = 1 \\times (-2)^3 = (-2) \\times (-2) \\times (-2)$.",
      "$= 4 \\times (-2) = -8$.",
      "$u_3 = -8$."
    ),
    tags: ["premiere", "maths", "suites", "geometrique", "short"],
  },
  {
    kind: "template",
    id: "premiere_suites_geo_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_geometrique",
    difficulty: 3,
    theme: "neutral",
    hint: "$u_n = u_0 \\times q^n$.",
    tags: ["premiere", "maths", "suites", "geometrique", "template"],
    generate: () => {
      const u0 = randomInt(2, 5);
      const q = randomInt(2, 4);
      const n = randomInt(2, 4);
      const un = u0 * q ** n;
      return {
        text: `Une suite géométrique vérifie $u_0 = ${u0}$ et $q = ${q}$. Combien vaut $u_${n}$ ?`,
        format: "short",
        expected: [String(un)],
        comparator: "number_equal",
        explanation: exp(
          "On applique $u_n = u_0 \\times q^n$.",
          `$u_${n} = ${u0} \\times ${q}^${n} = ${u0} \\times ${q ** n}$.`,
          `$= ${un}$.`,
          `$u_${n} = ${un}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_suites_geo_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_geometrique",
    difficulty: 4,
    theme: "neutral",
    hint: "Le rapport de deux termes consécutifs donne la raison.",
    tags: ["premiere", "maths", "suites", "geometrique", "template"],
    generate: () => {
      const u0 = randomInt(2, 4);
      const q = randomInt(2, 4);
      const u1 = u0 * q;
      const u2 = u1 * q;
      return {
        text: `Une suite géométrique vérifie $u_0 = ${u0}$, $u_1 = ${u1}$, $u_2 = ${u2}$. Quelle est sa raison $q$ ?`,
        format: "short",
        expected: [String(q)],
        comparator: "number_equal",
        explanation: exp(
          "La raison est le rapport de deux termes consécutifs.",
          `$q = \\dfrac{u_1}{u_0} = \\dfrac{${u1}}{${u0}}$.`,
          `$= ${q}$.`,
          `La raison est $q = ${q}$.`
        ),
      };
    },
  },

  /* ===================== SUITE_VARIATION ===================== */
  {
    kind: "fixed",
    id: "premiere_suites_var_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_variation",
    difficulty: 2,
    theme: "neutral",
    text: "Une suite arithmétique de raison $r = -2$ est :",
    format: "qcm",
    choices: ["décroissante", "croissante", "constante", "ni l'un ni l'autre"],
    expected: ["décroissante"],
    comparator: "mcq_exact",
    hint: "Signe de la raison.",
    explanation: exp(
      "Pour une suite arithmétique, le sens de variation dépend du signe de $r$.",
      "Ici $r = -2 < 0$.",
      "Quand $r < 0$, la suite est décroissante.",
      "La suite est décroissante."
    ),
    tags: ["premiere", "maths", "suites", "variation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_var_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_variation",
    difficulty: 3,
    theme: "neutral",
    text: "Une suite géométrique de premier terme positif et de raison $q = 1{,}2$ est :",
    format: "qcm",
    choices: ["croissante", "décroissante", "constante", "alternée"],
    expected: ["croissante"],
    comparator: "mcq_exact",
    hint: "$q > 1$ avec un terme initial positif.",
    explanation: exp(
      "Pour une suite géométrique à termes positifs, le sens dépend de $q$ par rapport à $1$.",
      "Ici $q = 1{,}2 > 1$.",
      "Quand $q > 1$ (termes positifs), la suite est croissante.",
      "La suite est croissante."
    ),
    tags: ["premiere", "maths", "suites", "variation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_var_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_variation",
    difficulty: 4,
    theme: "neutral",
    text: "Pour étudier le sens de variation d'une suite, on calcule en général :",
    format: "qcm",
    choices: [
      "le signe de $u_{n+1} - u_n$",
      "la valeur de $u_0$ seulement",
      "la somme des termes",
      "le produit $u_n \\times u_{n+1}$",
    ],
    expected: ["le signe de $u_{n+1} - u_n$"],
    comparator: "mcq_exact",
    hint: "On compare deux termes consécutifs.",
    explanation: exp(
      "Une suite est croissante si $u_{n+1} - u_n \\ge 0$ pour tout $n$, décroissante si $\\le 0$.",
      "On étudie donc le signe de la différence $u_{n+1} - u_n$.",
      "C'est la méthode générale, valable pour toute suite.",
      "On étudie le signe de $u_{n+1} - u_n$."
    ),
    tags: ["premiere", "maths", "suites", "variation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_var_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_variation",
    difficulty: 3,
    theme: "neutral",
    text: "La suite définie par $u_n = 3n + 1$ est :",
    format: "qcm",
    choices: ["croissante", "décroissante", "constante", "alternée"],
    expected: ["croissante"],
    comparator: "mcq_exact",
    hint: "Calcule $u_{n+1} - u_n$.",
    explanation: exp(
      "On compare deux termes consécutifs.",
      "$u_{n+1} - u_n = 3(n+1) + 1 - (3n + 1) = 3$.",
      "Cette différence est positive pour tout $n$.",
      "La suite est croissante."
    ),
    tags: ["premiere", "maths", "suites", "variation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_var_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_variation",
    difficulty: 3,
    theme: "neutral",
    text: "Une suite géométrique de premier terme $u_0 = 8$ et de raison $q = 0{,}5$ est :",
    format: "qcm",
    choices: ["décroissante", "croissante", "constante", "alternée"],
    expected: ["décroissante"],
    comparator: "mcq_exact",
    hint: "$0 < q < 1$ avec un premier terme positif.",
    explanation: exp(
      "Pour une suite géométrique à termes positifs, tout dépend de la position de $q$ par rapport à $1$.",
      "Ici $q = 0{,}5$, donc $0 < q < 1$ : chaque terme est la moitié du précédent.",
      "Les termes $8$, $4$, $2$, $1$… diminuent.",
      "La suite est décroissante."
    ),
    tags: ["premiere", "maths", "suites", "variation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_var_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_variation",
    difficulty: 5,
    theme: "neutral",
    text: "Une suite géométrique de premier terme $u_0 = 1$ et de raison $q = -2$ est :",
    format: "qcm",
    choices: [
      "ni croissante ni décroissante",
      "croissante",
      "décroissante",
      "constante",
    ],
    expected: ["ni croissante ni décroissante"],
    comparator: "mcq_exact",
    hint: "Écris les premiers termes : $1$, $-2$, $4$, $-8$…",
    explanation: exp(
      "Le sens de variation suppose que la suite aille toujours dans le même sens.",
      "Ici les termes valent $1$, $-2$, $4$, $-8$, $16$… : ils changent de signe à chaque étape.",
      "La suite monte, puis descend, puis remonte : elle n'est ni croissante ni décroissante.",
      "Une raison négative interdit tout sens de variation."
    ),
    tags: ["premiere", "maths", "suites", "variation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_var_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_variation",
    difficulty: 4,
    theme: "neutral",
    text: "La suite définie par $u_n = \\dfrac{1}{n}$ pour $n \\ge 1$ est :",
    format: "qcm",
    choices: ["décroissante", "croissante", "constante", "alternée"],
    expected: ["décroissante"],
    comparator: "mcq_exact",
    hint: "Compare $\\dfrac{1}{1}$, $\\dfrac{1}{2}$, $\\dfrac{1}{3}$…",
    explanation: exp(
      "Quand le dénominateur grandit et que le numérateur reste fixe, la fraction diminue.",
      "Les termes valent $1$, $\\dfrac{1}{2}$, $\\dfrac{1}{3}$, $\\dfrac{1}{4}$…",
      "Chaque terme est plus petit que le précédent.",
      "La suite est décroissante."
    ),
    tags: ["premiere", "maths", "suites", "variation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_var_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_variation",
    difficulty: 4,
    theme: "neutral",
    text: "Pour une suite à termes strictement POSITIFS, on peut aussi étudier les variations en comparant :",
    format: "qcm",
    choices: [
      "$\\dfrac{u_{n+1}}{u_n}$ à $1$",
      "$u_{n+1} \\times u_n$ à $1$",
      "$u_n$ à $0$",
      "$u_0$ à $u_1$ uniquement",
    ],
    expected: ["$\\dfrac{u_{n+1}}{u_n}$ à $1$"],
    comparator: "mcq_exact",
    hint: "C'est la méthode pratique pour les suites géométriques.",
    explanation: exp(
      "Si tous les termes sont strictement positifs, on peut diviser sans changer le sens de l'inégalité.",
      "Si $\\dfrac{u_{n+1}}{u_n} > 1$, alors $u_{n+1} > u_n$ : la suite croît. Si le quotient est $< 1$, elle décroît.",
      "Comparer $u_0$ à $u_1$ ne prouve rien : il faut que ce soit vrai pour TOUT $n$.",
      "On compare $\\dfrac{u_{n+1}}{u_n}$ à $1$."
    ),
    tags: ["premiere", "maths", "suites", "variation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_var_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_variation",
    difficulty: 3,
    theme: "neutral",
    text: "La suite définie par $u_n = n^2$ pour $n \\ge 0$ est :",
    format: "qcm",
    choices: ["croissante", "décroissante", "constante", "alternée"],
    expected: ["croissante"],
    comparator: "mcq_exact",
    hint: "Les termes valent $0$, $1$, $4$, $9$…",
    explanation: exp(
      "On compare deux termes consécutifs.",
      "$u_{n+1} - u_n = (n+1)^2 - n^2 = 2n + 1$.",
      "Pour $n \\ge 0$, $2n + 1$ est toujours positif.",
      "La suite est croissante."
    ),
    tags: ["premiere", "maths", "suites", "variation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_var_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_variation",
    difficulty: 5,
    theme: "neutral",
    text: "Une suite vérifie $u_{n+1} - u_n = 2n - 6$. À partir de quel rang $n$ la suite devient-elle croissante ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Cherche à partir de quand $2n - 6$ est positif ou nul.",
    explanation: exp(
      "La suite croît là où la différence $u_{n+1} - u_n$ est positive ou nulle.",
      "On résout $2n - 6 \\ge 0$, soit $2n \\ge 6$.",
      "$n \\ge 3$ : avant ce rang la différence est négative, la suite décroît.",
      "La suite est croissante à partir du rang $n = 3$."
    ),
    tags: ["premiere", "maths", "suites", "variation", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_var_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_variation",
    difficulty: 2,
    theme: "neutral",
    text: "Une suite géométrique de premier terme $5$ et de raison $q = 1$ est :",
    format: "qcm",
    choices: ["constante", "croissante", "décroissante", "alternée"],
    expected: ["constante"],
    comparator: "mcq_exact",
    hint: "Multiplier par $1$ ne change rien.",
    explanation: exp(
      "Dans une suite géométrique, chaque terme est le précédent multiplié par $q$.",
      "Ici $q = 1$ : $5 \\times 1 = 5$, puis encore $5$…",
      "Tous les termes valent $5$.",
      "La suite est constante."
    ),
    tags: ["premiere", "maths", "suites", "variation", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_suites_var_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_variation",
    difficulty: 3,
    theme: "neutral",
    hint: "Signe de la raison.",
    tags: ["premiere", "maths", "suites", "variation", "template"],
    generate: () => {
      const positif = randomInt(0, 1) === 1;
      const r = positif ? randomInt(1, 6) : -randomInt(1, 6);
      const correct = positif ? "croissante" : "décroissante";
      return {
        text: `Une suite arithmétique de raison $r = ${r}$ est :`,
        format: "qcm",
        choices: ["croissante", "décroissante", "constante", "ni l'un ni l'autre"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Le sens de variation d'une suite arithmétique dépend du signe de $r$.",
          `Ici $r = ${r}$, qui est ${positif ? "positif" : "négatif"}.`,
          `Donc la suite est ${correct}.`,
          `La suite est ${correct}.`
        ),
      };
    },
  },

  /* ===================== SUITE_SOMMES ===================== */
  {
    kind: "fixed",
    id: "premiere_suites_sommes_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_sommes",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la formule de $1 + 2 + 3 + \\dots + n$ ?",
    format: "qcm",
    choices: [
      "$\\dfrac{n(n+1)}{2}$",
      "$n^2$",
      "$\\dfrac{n(n-1)}{2}$",
      "$2n$",
    ],
    expected: ["$\\dfrac{n(n+1)}{2}$"],
    comparator: "mcq_exact",
    hint: "Somme des $n$ premiers entiers.",
    explanation: exp(
      "La somme des entiers de $1$ à $n$ est un résultat classique.",
      "On regroupe les termes par paires de somme $n+1$.",
      "$1 + 2 + \\dots + n = \\dfrac{n(n+1)}{2}$.",
      "$1 + 2 + \\dots + n = \\dfrac{n(n+1)}{2}$."
    ),
    tags: ["premiere", "maths", "suites", "sommes", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_sommes_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_sommes",
    difficulty: 3,
    theme: "neutral",
    text: "Combien vaut $1 + 2 + 3 + \\dots + 100$ ?",
    format: "short",
    expected: ["5050"],
    comparator: "number_equal",
    hint: "Utilise $\\dfrac{n(n+1)}{2}$ avec $n = 100$.",
    explanation: exp(
      "On applique $1 + 2 + \\dots + n = \\dfrac{n(n+1)}{2}$.",
      "Ici $n = 100$ : $\\dfrac{100 \\times 101}{2}$.",
      "$= \\dfrac{10100}{2} = 5050$.",
      "La somme vaut $5050$."
    ),
    tags: ["premiere", "maths", "suites", "sommes", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_sommes_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_somme_geo",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la formule de $1 + q + q^2 + \\dots + q^n$ pour $q \\neq 1$ ?",
    format: "qcm",
    choices: [
      "$\\dfrac{1 - q^{n+1}}{1 - q}$",
      "$\\dfrac{1 - q^{n}}{1 - q}$",
      "$\\dfrac{q^{n+1} - 1}{q}$",
      "$q^{n+1}$",
    ],
    expected: ["$\\dfrac{1 - q^{n+1}}{1 - q}$"],
    comparator: "mcq_exact",
    hint: "Somme géométrique : attention à l'exposant $n+1$.",
    explanation: exp(
      "C'est la somme des termes d'une suite géométrique de raison $q$.",
      "Il y a $n+1$ termes (de $q^0$ à $q^n$).",
      "$1 + q + \\dots + q^n = \\dfrac{1 - q^{n+1}}{1 - q}$.",
      "$\\dfrac{1 - q^{n+1}}{1 - q}$."
    ),
    tags: ["premiere", "maths", "suites", "sommes", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_sommes_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_sommes",
    difficulty: 5,
    theme: "neutral",
    text: "Une suite arithmétique vérifie $u_0 = 2$ et $r = 3$. Combien vaut $u_0 + u_1 + \\dots + u_9$ ?",
    format: "short",
    expected: ["155"],
    comparator: "number_equal",
    hint: "$10$ termes ; le dernier est $u_9 = 2 + 9 \\times 3$.",
    explanation: exp(
      "Pour une suite arithmétique : somme $=$ (nombre de termes) $\\times \\dfrac{\\text{premier} + \\text{dernier}}{2}$.",
      "Il y a $10$ termes (de $u_0$ à $u_9$) et $u_9 = 2 + 27 = 29$.",
      "$S = 10 \\times \\dfrac{2 + 29}{2} = 10 \\times 15{,}5 = 155$.",
      "La somme vaut $155$."
    ),
    tags: ["premiere", "maths", "suites", "sommes", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_sommes_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_somme_geo",
    difficulty: 4,
    theme: "neutral",
    text: "Combien y a-t-il de termes dans la somme $1 + q + q^2 + \\dots + q^n$ ?",
    format: "qcm",
    choices: ["$n + 1$", "$n$", "$n - 1$", "$2n$"],
    expected: ["$n + 1$"],
    comparator: "mcq_exact",
    hint: "N'oublie pas le premier terme $q^0 = 1$.",
    explanation: exp(
      "Les exposants vont de $0$ à $n$.",
      "Compter de $0$ à $n$ donne $n + 1$ valeurs, pas $n$.",
      "C'est l'oubli classique : le terme $q^0 = 1$ compte lui aussi.",
      "Il y a $n + 1$ termes."
    ),
    tags: ["premiere", "maths", "suites", "sommes", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_sommes_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_sommes",
    difficulty: 3,
    theme: "neutral",
    text: "Pour une suite ARITHMÉTIQUE, la somme de termes consécutifs vaut :",
    format: "qcm",
    choices: [
      "$(\\text{nombre de termes}) \\times \\dfrac{\\text{premier} + \\text{dernier}}{2}$",
      "$(\\text{nombre de termes}) \\times (\\text{premier} + \\text{dernier})$",
      "$\\dfrac{\\text{premier} \\times \\text{dernier}}{2}$",
      "$\\dfrac{1 - q^{n+1}}{1 - q}$",
    ],
    expected: [
      "$(\\text{nombre de termes}) \\times \\dfrac{\\text{premier} + \\text{dernier}}{2}$",
    ],
    comparator: "mcq_exact",
    hint: "On multiplie le nombre de termes par la MOYENNE des extrêmes.",
    explanation: exp(
      "En regroupant les termes deux par deux (le premier avec le dernier, etc.), chaque paire a la même somme.",
      "Cela revient à multiplier le nombre de termes par la moyenne du premier et du dernier.",
      "La dernière proposition est la formule de la somme GÉOMÉTRIQUE : elle ne s'applique pas ici.",
      "$S = (\\text{nombre de termes}) \\times \\dfrac{\\text{premier} + \\text{dernier}}{2}$."
    ),
    tags: ["premiere", "maths", "suites", "sommes", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_sommes_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_somme_geo",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève place $1$ € le premier jour, $2$ € le deuxième, $4$ € le troisième, et double chaque jour. Combien a-t-il placé en tout au bout de $10$ jours ?",
    format: "short",
    expected: ["1023"],
    comparator: "number_equal",
    hint: "Les mises vont de $2^0$ à $2^9$ : c'est une somme géométrique.",
    explanation: exp(
      "Les mises forment une suite géométrique de raison $2$ : $2^0$, $2^1$, …, $2^9$ pour $10$ jours.",
      "$S = \\dfrac{1 - 2^{10}}{1 - 2} = \\dfrac{1 - 1024}{-1}$.",
      "$= 1023$. Attention à l'exposant : $10$ jours s'arrêtent à $2^9$, pas à $2^{10}$.",
      "Il a placé $1023$ €."
    ),
    tags: ["premiere", "maths", "suites", "sommes", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_sommes_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_sommes",
    difficulty: 5,
    theme: "neutral",
    text: "Combien vaut $2 + 4 + 6 + \\dots + 100$ ?",
    format: "short",
    expected: ["2550"],
    comparator: "number_equal",
    hint: "Mets $2$ en facteur : $2(1 + 2 + \\dots + 50)$.",
    explanation: exp(
      "Ce sont les $50$ premiers nombres pairs.",
      "On factorise par $2$ : $2 + 4 + \\dots + 100 = 2(1 + 2 + \\dots + 50)$.",
      "$= 2 \\times \\dfrac{50 \\times 51}{2} = 2 \\times 1275 = 2550$.",
      "La somme vaut $2550$."
    ),
    tags: ["premiere", "maths", "suites", "sommes", "short"],
  },
  {
    kind: "template",
    id: "premiere_suites_sommes_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_sommes",
    difficulty: 3,
    theme: "neutral",
    hint: "$1 + 2 + \\dots + n = \\dfrac{n(n+1)}{2}$.",
    tags: ["premiere", "maths", "suites", "sommes", "template"],
    generate: () => {
      const n = randomInt(10, 50);
      const val = (n * (n + 1)) / 2;
      return {
        text: `Combien vaut $1 + 2 + 3 + \\dots + ${n}$ ?`,
        format: "short",
        expected: [String(val)],
        comparator: "number_equal",
        explanation: exp(
          "On applique la formule des $n$ premiers entiers.",
          `$\\dfrac{${n} \\times ${n + 1}}{2}$.`,
          `$= \\dfrac{${n * (n + 1)}}{2} = ${val}$.`,
          `La somme vaut $${val}$.`
        ),
      };
    },
  },

  /* ===================== SUITE_REGISTRES ===================== */
  {
    kind: "fixed",
    id: "premiere_suites_reg_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_registres",
    difficulty: 2,
    theme: "neutral",
    text: "Que désigne $u_5$ ?",
    format: "qcm",
    choices: [
      "le terme de rang $5$ de la suite",
      "le nombre $5$",
      "la somme des cinq premiers termes",
      "la raison de la suite",
    ],
    expected: ["le terme de rang $5$ de la suite"],
    comparator: "mcq_exact",
    hint: "Le petit $5$ est un rang, pas une valeur.",
    explanation: exp(
      "Dans l'écriture $u_n$, l'indice $n$ indique la POSITION du terme dans la suite.",
      "$u_5$ désigne donc le terme situé au rang $5$.",
      "Sa valeur, elle, dépend de la suite : pour $u_n = 2n$, on a $u_5 = 10$. Il ne faut pas confondre le rang et la valeur.",
      "$u_5$ est le terme de rang $5$."
    ),
    tags: ["premiere", "maths", "suites", "registres", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_reg_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_registres",
    difficulty: 3,
    theme: "neutral",
    text: "Que signifie l'égalité $u_3 = 10$ ?",
    format: "qcm",
    choices: [
      "le terme de rang $3$ vaut $10$",
      "le terme de rang $10$ vaut $3$",
      "la suite compte $3$ termes valant $10$",
      "la raison vaut $10$",
    ],
    expected: ["le terme de rang $3$ vaut $10$"],
    comparator: "mcq_exact",
    hint: "L'indice est en bas, la valeur est après le signe égal.",
    explanation: exp(
      "L'indice indique la position, le membre de droite donne la valeur.",
      "$u_3 = 10$ se lit : « le terme de rang $3$ vaut $10$ ».",
      "Confondre les deux est l'erreur la plus courante en début de chapitre : le rang se compte, la valeur se calcule.",
      "Le terme de rang $3$ vaut $10$."
    ),
    tags: ["premiere", "maths", "suites", "registres", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_reg_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_registres",
    difficulty: 3,
    theme: "neutral",
    text: "Les notations $u_n$ et $u(n)$ désignent-elles la même chose ?",
    format: "qcm",
    choices: [
      "oui : ce sont deux écritures du terme de rang $n$",
      "non : $u(n)$ n'existe pas pour les suites",
      "non : $u(n)$ désigne la somme des termes",
      "oui, mais seulement pour les suites arithmétiques",
    ],
    expected: ["oui : ce sont deux écritures du terme de rang $n$"],
    comparator: "mcq_exact",
    hint: "Une suite est une fonction définie sur les entiers.",
    explanation: exp(
      "Une suite peut se voir comme une fonction qui, à chaque entier $n$, associe un nombre.",
      "On peut donc écrire $u(n)$ comme pour une fonction, ou $u_n$ avec un indice — c'est la notation habituelle des suites.",
      "Le programme mentionne les deux, ainsi que $(u_n)$ pour désigner la suite entière, à distinguer de $u_n$, qui est UN terme.",
      "Oui, $u_n$ et $u(n)$ désignent le même terme."
    ),
    tags: ["premiere", "maths", "suites", "registres", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_reg_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_registres",
    difficulty: 4,
    theme: "neutral",
    text: "« Chaque année, la population double. » Comment traduire cette phrase ?",
    format: "qcm",
    choices: [
      "$u_{n+1} = 2u_n$",
      "$u_{n+1} = u_n + 2$",
      "$u_n = 2n$",
      "$u_{n+1} = u_n^2$",
    ],
    expected: ["$u_{n+1} = 2u_n$"],
    comparator: "mcq_exact",
    hint: "Doubler, c'est multiplier par $2$ le terme précédent.",
    explanation: exp(
      "On traduit le passage d'une année à la suivante, donc de $u_n$ à $u_{n+1}$.",
      "« Doubler » signifie multiplier par $2$ la valeur précédente.",
      "D'où $u_{n+1} = 2u_n$ : c'est une suite géométrique. Ajouter $2$ donnerait une suite arithmétique, ce qui décrirait une tout autre évolution.",
      "La traduction est $u_{n+1} = 2u_n$."
    ),
    tags: ["premiere", "maths", "suites", "registres", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_reg_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_registres",
    difficulty: 4,
    theme: "reunion",
    text: "Un planteur récolte $200$ kg de letchis la première année, puis $15$ kg de plus chaque année. Si $u_1 = 200$, comment traduire « $15$ kg de plus chaque année » ?",
    format: "qcm",
    choices: [
      "$u_{n+1} = u_n + 15$",
      "$u_{n+1} = 15u_n$",
      "$u_n = 15n$",
      "$u_{n+1} = u_n - 15$",
    ],
    expected: ["$u_{n+1} = u_n + 15$"],
    comparator: "mcq_exact",
    hint: "« De plus » : on ajoute au terme précédent.",
    explanation: exp(
      "On exprime la récolte d'une année en fonction de celle de l'année précédente.",
      "« $15$ kg de plus » signifie qu'on ajoute $15$ à la valeur précédente.",
      "D'où $u_{n+1} = u_n + 15$ : la suite est arithmétique de raison $15$.",
      "La traduction est $u_{n+1} = u_n + 15$."
    ),
    canvas: suiteCanvas([200, 215, 230, "…"], ["+15", "+15", "+15"], "u(n+1) = u(n) + 15"),
    tags: ["premiere", "maths", "suites", "registres", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_reg_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_registres",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la différence entre $(u_n)$ et $u_n$ ?",
    format: "qcm",
    choices: [
      "$(u_n)$ désigne la suite entière, $u_n$ un seul terme",
      "il n'y en a aucune",
      "$(u_n)$ désigne le premier terme",
      "$(u_n)$ désigne la somme des termes",
    ],
    expected: ["$(u_n)$ désigne la suite entière, $u_n$ un seul terme"],
    comparator: "mcq_exact",
    hint: "Les parenthèses englobent tous les termes à la fois.",
    explanation: exp(
      "Les parenthèses signalent qu'on parle de l'objet entier, et non d'une de ses valeurs.",
      "$(u_n)$ désigne la suite tout entière : la liste infinie $u_0$, $u_1$, $u_2$…",
      "$u_n$ désigne un seul terme, celui de rang $n$. On dit « la suite $(u_n)$ est croissante », mais « le terme $u_5$ vaut $12$ ».",
      "$(u_n)$ est la suite, $u_n$ est un terme."
    ),
    tags: ["premiere", "maths", "suites", "registres", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_reg_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_registres",
    difficulty: 4,
    theme: "neutral",
    text: "Explique la différence entre $n$ et $u_n$ dans l'étude d'une suite.",
    format: "open",
    expected: ["rang", "valeur", "terme", "position"],
    comparator: "contains_keyword",
    hint: "L'un compte les étapes, l'autre donne un résultat.",
    explanation: exp(
      "Dans une suite, deux nombres coexistent à chaque étape : la position et la valeur.",
      "$n$ est le RANG : il numérote les termes ($0$, $1$, $2$…), c'est en général un compteur d'étapes, d'années, de mois.",
      "$u_n$ est la VALEUR du terme situé à ce rang. Par exemple, pour une population, $n$ compte les années et $u_n$ donne le nombre d'habitants.",
      "$n$ dit où l'on est, $u_n$ dit combien on a."
    ),
    tags: ["premiere", "maths", "suites", "registres", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_reg_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_registres",
    difficulty: 5,
    theme: "neutral",
    text: "Un capital de $1000$ € augmente de $2\\%$ par an. Traduis cette situation par une relation de récurrence, en précisant ce que représente $u_n$.",
    format: "open",
    expected: ["1,02", "capital", "année", "géométrique"],
    comparator: "contains_keyword",
    hint: "Augmenter de $2\\%$, c'est multiplier par combien ?",
    explanation: exp(
      "On commence toujours par dire ce que désigne $u_n$ : ici, le capital au bout de $n$ années.",
      "Augmenter de $2\\%$ revient à multiplier par $1 + \\dfrac{2}{100} = 1{,}02$.",
      "D'où $u_0 = 1000$ et $u_{n+1} = 1{,}02 \\times u_n$ : la suite est géométrique de raison $1{,}02$.",
      "$u_n$ est le capital après $n$ années, avec $u_0 = 1000$ et $u_{n+1} = 1{,}02u_n$."
    ),
    tags: ["premiere", "maths", "suites", "registres", "open"],
  },
  {
    kind: "template",
    id: "premiere_suites_reg_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_registres",
    difficulty: 4,
    theme: "neutral",
    hint: "« De plus » ou « de moins » : on ajoute. « Double », « augmente de x % » : on multiplie.",
    tags: ["premiere", "maths", "suites", "registres", "template"],
    generate: () => {
      const cas = [
        {
          phrase: "chaque mois, on ajoute $12$ abonnés",
          bon: "$u_{n+1} = u_n + 12$",
          faux: ["$u_{n+1} = 12u_n$", "$u_n = 12n$", "$u_{n+1} = u_n - 12$"],
          type: "arithmétique de raison $12$",
        },
        {
          phrase: "chaque année, la quantité triple",
          bon: "$u_{n+1} = 3u_n$",
          faux: ["$u_{n+1} = u_n + 3$", "$u_n = 3n$", "$u_{n+1} = u_n^3$"],
          type: "géométrique de raison $3$",
        },
        {
          phrase: "chaque semaine, on perd $5$ euros",
          bon: "$u_{n+1} = u_n - 5$",
          faux: ["$u_{n+1} = 5u_n$", "$u_{n+1} = u_n + 5$", "$u_n = -5n$"],
          type: "arithmétique de raison $-5$",
        },
        {
          phrase: "chaque année, la population diminue de $10\\%$",
          bon: "$u_{n+1} = 0{,}9u_n$",
          faux: ["$u_{n+1} = u_n - 10$", "$u_{n+1} = 1{,}1u_n$", "$u_{n+1} = -0{,}1u_n$"],
          type: "géométrique de raison $0{,}9$",
        },
        {
          phrase: "chaque jour, la somme augmente de $4\\%$",
          bon: "$u_{n+1} = 1{,}04u_n$",
          faux: ["$u_{n+1} = u_n + 4$", "$u_{n+1} = 0{,}96u_n$", "$u_{n+1} = 4u_n$"],
          type: "géométrique de raison $1{,}04$",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Comment traduire « ${c.phrase} » par une relation de récurrence ?`,
        format: "qcm",
        choices: [c.bon, ...c.faux],
        expected: [c.bon],
        comparator: "mcq_exact",
        explanation: exp(
          "On exprime un terme en fonction du précédent : « ajouter » donne une suite arithmétique, « multiplier » une suite géométrique.",
          "Un pourcentage se traduit par un coefficient multiplicateur, jamais par une addition.",
          `Ici la traduction est ${c.bon}.`,
          `La suite est ${c.type}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_suites_reg_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_registres",
    difficulty: 5,
    theme: "neutral",
    hint: "Dis d'abord ce que représente $u_n$, puis décris ce que fait la relation.",
    tags: ["premiere", "maths", "suites", "registres", "open", "template"],
    generate: () => {
      const cas = [
        {
          rel: "$u_0 = 50$ et $u_{n+1} = u_n + 7$",
          mots: ["ajoute", "arithmétique", "départ", "raison"],
          desc: "On part de $50$ et on ajoute $7$ à chaque étape : la suite est arithmétique de raison $7$.",
        },
        {
          rel: "$u_0 = 800$ et $u_{n+1} = 0{,}75u_n$",
          mots: ["diminue", "géométrique", "multiplie", "25"],
          desc: "On part de $800$ et on multiplie par $0{,}75$ à chaque étape : la quantité diminue de $25\\%$, la suite est géométrique.",
        },
        {
          rel: "$u_1 = 3$ et $u_{n+1} = 2u_n + 1$",
          mots: ["double", "ajoute", "précédent", "ni"],
          desc: "On double le terme précédent puis on ajoute $1$ : cette suite n'est ni arithmétique ni géométrique.",
        },
        {
          rel: "$u_0 = 1200$ et $u_{n+1} = 1{,}05u_n$",
          mots: ["augmente", "géométrique", "multiplie", "5"],
          desc: "On part de $1200$ et on multiplie par $1{,}05$ : la quantité augmente de $5\\%$ à chaque étape.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Décris en français la situation modélisée par ${c.rel}. Que fait-on à chaque étape ?`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Passer de l'écriture symbolique au langage courant fait partie des capacités attendues.",
          "On lit le premier terme (le point de départ), puis l'opération qui fait passer d'un terme au suivant.",
          c.desc,
          "Ajouter donne une suite arithmétique, multiplier une suite géométrique ; combiner les deux ne donne ni l'une ni l'autre."
        ),
      };
    },
  },

  /* ===================== SUITE_RECURRENCE ===================== */
  {
    kind: "fixed",
    id: "premiere_suites_rec_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_recurrence",
    difficulty: 3,
    theme: "neutral",
    text: "Pour une suite définie par $u_{n+1} = f(u_n)$, que faut-il connaître pour calculer $u_5$ ?",
    format: "qcm",
    choices: [
      "le terme précédent $u_4$",
      "seulement la valeur de $5$",
      "tous les termes après $u_5$",
      "rien : $u_5 = 5$",
    ],
    expected: ["le terme précédent $u_4$"],
    comparator: "mcq_exact",
    hint: "« Récurrence » : chaque terme dépend du précédent.",
    explanation: exp(
      "Dans une définition par récurrence, chaque terme se déduit du terme qui le précède.",
      "Pour obtenir $u_5$, il faut donc disposer de $u_4$ — lui-même calculé à partir de $u_3$, et ainsi de suite.",
      "On remonte ainsi jusqu'au premier terme, qui est donné : c'est le point de départ obligatoire.",
      "Il faut connaître le terme précédent $u_4$."
    ),
    tags: ["premiere", "maths", "suites", "recurrence", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_rec_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_recurrence",
    difficulty: 5,
    theme: "neutral",
    text: "Avec $u_0 = 3$ et $u_{n+1} = 2u_n$, peut-on obtenir $u_{20}$ sans calculer tous les termes précédents ?",
    format: "qcm",
    choices: [
      "oui, en trouvant la formule explicite $u_n = 3 \\times 2^n$",
      "oui : il suffit de remplacer $n$ par $20$ dans la relation",
      "non, c'est impossible",
      "oui, car $u_{20} = 2 \\times 20$",
    ],
    expected: ["oui, en trouvant la formule explicite $u_n = 3 \\times 2^n$"],
    comparator: "mcq_exact",
    hint: "Une même suite peut avoir deux modes de génération.",
    explanation: exp(
      "Une définition par récurrence oblige à calculer tous les termes intermédiaires : c'est son principal inconvénient.",
      "Mais une même suite peut souvent s'écrire autrement. Ici on reconnaît une suite géométrique de raison $2$ et de premier terme $3$.",
      "Sa formule explicite est $u_n = 3 \\times 2^n$, qui donne $u_{20}$ en un seul calcul. Passer d'un mode de génération à l'autre est une capacité attendue du programme.",
      "Oui, via la formule explicite $u_n = 3 \\times 2^n$."
    ),
    tags: ["premiere", "maths", "suites", "recurrence", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_rec_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_recurrence",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi une suite définie par récurrence a-t-elle toujours besoin qu'on donne son premier terme ?",
    format: "open",
    expected: ["départ", "précédent", "démarrer", "premier terme"],
    comparator: "contains_keyword",
    hint: "Essaie de calculer $u_1$ sans connaître $u_0$.",
    explanation: exp(
      "Une relation de récurrence explique comment passer d'un terme au suivant, mais pas par où commencer.",
      "Sans premier terme, $u_1$ dépendrait de $u_0$, lui-même inconnu : le calcul ne peut pas démarrer.",
      "Le premier terme fixe le point de départ. Avec la même relation $u_{n+1} = 2u_n$, partir de $3$ ou de $10$ donne deux suites complètement différentes.",
      "Sans premier terme, aucun calcul ne peut commencer."
    ),
    tags: ["premiere", "maths", "suites", "recurrence", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_rec_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_recurrence",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la différence entre une suite définie explicitement et une suite définie par récurrence, et donne un avantage de chacune.",
    format: "open",
    expected: ["directement", "précédent", "rang", "proche en proche"],
    comparator: "contains_keyword",
    hint: "Dans un cas on saute directement au rang voulu, dans l'autre on avance pas à pas.",
    explanation: exp(
      "Ce sont deux modes de génération d'une même sorte d'objet.",
      "Explicite : $u_n = 3n + 2$ donne le terme directement à partir du rang. Avantage : on obtient $u_{100}$ en un calcul.",
      "Par récurrence : $u_{n+1} = u_n + 3$ décrit le passage d'un terme au suivant. Avantage : elle colle souvent mieux à la situation réelle — ce qu'on ajoute ou multiplie chaque mois — et se programme facilement.",
      "L'explicite va vite, la récurrence décrit le mécanisme."
    ),
    tags: ["premiere", "maths", "suites", "recurrence", "open"],
  },
  {
    kind: "template",
    id: "premiere_suites_rec_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_recurrence",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule les termes un par un, sans sauter d'étape.",
    tags: ["premiere", "maths", "suites", "recurrence", "template"],
    generate: () => {
      const u0 = randomInt(1, 5);
      const a = randomInt(2, 4);
      const b = randomInt(1, 5) * (randomInt(0, 1) === 1 ? 1 : -1);
      const u1 = a * u0 + b;
      const u2 = a * u1 + b;
      const signe = b < 0 ? `- ${-b}` : `+ ${b}`;
      return {
        text: `La suite est définie par $u_0 = ${u0}$ et $u_{n+1} = ${a}u_n ${signe}$. Combien vaut $u_2$ ?`,
        format: "short",
        expected: [String(u2)],
        comparator: "number_equal",
        explanation: exp(
          "On applique la relation de récurrence terme après terme.",
          `$u_1 = ${a} \\times ${u0} ${signe} = ${u1}$.`,
          `$u_2 = ${a} \\times ${u1} ${signe} = ${u2}$.`,
          `$u_2 = ${u2}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_suites_rec_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_recurrence",
    difficulty: 5,
    theme: "neutral",
    hint: "Détaille chaque étape, puis dis si la suite est arithmétique, géométrique, ou ni l'un ni l'autre.",
    tags: ["premiere", "maths", "suites", "recurrence", "open", "template"],
    generate: () => {
      const cas = [
        {
          rel: "$u_0 = 4$ et $u_{n+1} = u_n + 6$",
          mots: ["10", "16", "arithmétique", "ajoute"],
          calcul: "$u_1 = 4 + 6 = 10$, puis $u_2 = 10 + 6 = 16$.",
          nature: "arithmétique de raison $6$",
        },
        {
          rel: "$u_0 = 3$ et $u_{n+1} = 5u_n$",
          mots: ["15", "75", "géométrique", "multiplie"],
          calcul: "$u_1 = 5 \\times 3 = 15$, puis $u_2 = 5 \\times 15 = 75$.",
          nature: "géométrique de raison $5$",
        },
        {
          rel: "$u_0 = 1$ et $u_{n+1} = 3u_n + 2$",
          mots: ["5", "17", "ni", "précédent"],
          calcul: "$u_1 = 3 \\times 1 + 2 = 5$, puis $u_2 = 3 \\times 5 + 2 = 17$.",
          nature: "ni arithmétique ni géométrique",
        },
        {
          rel: "$u_0 = 10$ et $u_{n+1} = u_n - 4$",
          mots: ["6", "2", "arithmétique", "retire"],
          calcul: "$u_1 = 10 - 4 = 6$, puis $u_2 = 6 - 4 = 2$.",
          nature: "arithmétique de raison $-4$",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Pour la suite définie par ${c.rel}, calcule $u_1$ et $u_2$ en détaillant, puis dis si la suite est arithmétique, géométrique, ou ni l'un ni l'autre.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "On calcule de proche en proche, puis on regarde l'opération qui fait passer d'un terme au suivant.",
          "Ajouter toujours le même nombre donne une suite arithmétique ; multiplier toujours par le même nombre, une suite géométrique.",
          c.calcul,
          `La suite est ${c.nature}.`
        ),
      };
    },
  },

  /* ===================== SUITE_ALGORITHME ===================== */
  {
    kind: "fixed",
    id: "premiere_suites_algo_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_algorithme",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un algorithme calculant les termes d'une suite, à quoi sert la variable `u` ?",
    format: "qcm",
    choices: [
      "elle garde en mémoire le terme courant, écrasé à chaque tour",
      "elle compte le nombre de tours",
      "elle stocke tous les termes de la suite",
      "elle donne la raison de la suite",
    ],
    expected: ["elle garde en mémoire le terme courant, écrasé à chaque tour"],
    comparator: "mcq_exact",
    hint: "Que devient l'ancienne valeur après `u = u * 2` ?",
    explanation: exp(
      "L'instruction `u = u * 2` calcule la nouvelle valeur à partir de l'ancienne, puis la remplace.",
      "La variable ne conserve donc qu'un seul terme à la fois : celui qu'on vient de calculer.",
      "C'est exactement le principe de la récurrence. Pour garder tous les termes, il faudrait une LISTE.",
      "`u` garde le terme courant, écrasé à chaque tour."
    ),
    tags: ["premiere", "maths", "suites", "algorithme", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_algo_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_algorithme",
    difficulty: 4,
    theme: "neutral",
    text: "Combien de tours effectue la boucle `for i in range(6):` ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "$i$ part de $0$ et s'arrête avant $6$.",
    explanation: exp(
      "`range(n)` parcourt les entiers de $0$ à $n - 1$.",
      "Ici : $0$, $1$, $2$, $3$, $4$, $5$.",
      "Cela fait bien $6$ tours, même si la valeur $6$ n'est jamais prise par $i$.",
      "La boucle effectue $6$ tours."
    ),
    tags: ["premiere", "maths", "suites", "algorithme", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_algo_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_algorithme",
    difficulty: 4,
    theme: "neutral",
    text: "Pour calculer $u_{10}$ d'une suite définie par récurrence, quelle boucle utiliser ?",
    format: "qcm",
    choices: [
      "une boucle `for`, car le nombre de tours est connu à l'avance",
      "une boucle `while`, car on ne sait pas quand s'arrêter",
      "aucune boucle n'est nécessaire",
      "deux boucles imbriquées",
    ],
    expected: ["une boucle `for`, car le nombre de tours est connu à l'avance"],
    comparator: "mcq_exact",
    hint: "Sait-on d'avance combien d'étapes il faut faire ?",
    explanation: exp(
      "On choisit la boucle selon qu'on connaît ou non le nombre de répétitions.",
      "Ici le rang visé est fixé : il faut exactement $10$ étapes depuis $u_0$.",
      "La boucle `for` convient donc. La boucle `while` servirait pour une recherche de SEUIL, où l'on ignore combien d'étapes seront nécessaires.",
      "Une boucle `for`, car le nombre de tours est connu."
    ),
    tags: ["premiere", "maths", "suites", "algorithme", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_algo_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_algorithme",
    difficulty: 5,
    theme: "neutral",
    text: "Dans `u = 3` puis `for i in range(4): u = u + 5`, quel terme obtient-on à la fin ?",
    format: "qcm",
    choices: ["$u_4$", "$u_5$", "$u_3$", "$u_0$"],
    expected: ["$u_4$"],
    comparator: "mcq_exact",
    hint: "On part de $u_0 = 3$ et on avance de $4$ étapes.",
    explanation: exp(
      "La valeur initiale correspond au premier terme, ici $u_0 = 3$.",
      "Chaque tour fait avancer d'un rang : $4$ tours mènent donc de $u_0$ à $u_4$.",
      "La valeur finale est $3 + 4 \\times 5 = 23$, c'est-à-dire $u_4$. Confondre le nombre de tours et le rang atteint fait décaler tout le résultat.",
      "On obtient $u_4$."
    ),
    tags: ["premiere", "maths", "suites", "algorithme", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_algo_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_algorithme",
    difficulty: 5,
    theme: "neutral",
    text: "Explique ce que calcule ce script : `u = 100` puis `for i in range(5): u = u * 0.9`. Que représente le résultat ?",
    format: "open",
    expected: ["diminue", "10", "cinq", "géométrique"],
    comparator: "contains_keyword",
    hint: "Multiplier par $0{,}9$, cela correspond à quelle évolution ?",
    explanation: exp(
      "On lit la valeur de départ, puis l'opération répétée et le nombre de tours.",
      "On part de $100$ et on multiplie $5$ fois par $0{,}9$ : chaque étape correspond à une baisse de $10\\%$.",
      "Le script calcule donc $100 \\times 0{,}9^5 \\approx 59$ : c'est le terme de rang $5$ d'une suite géométrique de raison $0{,}9$.",
      "Il calcule la valeur après cinq baisses successives de $10\\%$."
    ),
    tags: ["premiere", "maths", "suites", "algorithme", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_algo_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_algorithme",
    difficulty: 5,
    theme: "neutral",
    text: "Écris en français les étapes d'un algorithme qui calcule $u_6$ pour la suite définie par $u_0 = 2$ et $u_{n+1} = 3u_n + 1$.",
    format: "open",
    expected: ["répète", "6", "u = 3", "départ"],
    comparator: "contains_keyword",
    hint: "Trois temps : une valeur de départ, une répétition, un affichage.",
    explanation: exp(
      "Un algorithme de calcul de termes comporte toujours trois temps.",
      "Initialisation : on donne à $u$ la valeur de départ, ici $2$.",
      "Répétition : on répète $6$ fois l'instruction $u$ prend la valeur $3u + 1$. Puis on affiche $u$.",
      "En Python : `u = 2` ; `for i in range(6): u = 3*u + 1` ; `print(u)`."
    ),
    tags: ["premiere", "maths", "suites", "algorithme", "open"],
  },
  {
    kind: "template",
    id: "premiere_suites_algo_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_algorithme",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte bien le nombre de tours, puis applique l'opération autant de fois.",
    tags: ["premiere", "maths", "suites", "algorithme", "template"],
    generate: () => {
      const u0 = randomInt(2, 6);
      const n = randomInt(2, 4);
      const mult = randomInt(0, 1) === 1;
      const k = mult ? randomInt(2, 3) : randomInt(3, 9);
      let u = u0;
      const termes: number[] = [u0];
      for (let i = 0; i < n; i += 1) {
        u = mult ? u * k : u + k;
        termes.push(u);
      }
      const op = mult ? `u * ${k}` : `u + ${k}`;
      return {
        text: `Que vaut \`u\` après : \`u = ${u0}\` puis \`for i in range(${n}): u = ${op}\` ?`,
        format: "short",
        expected: [String(u)],
        comparator: "number_equal",
        explanation: exp(
          "La boucle répète l'instruction autant de fois qu'indiqué dans `range`.",
          `Ici $${n}$ tours, en partant de $${u0}$ : ${termes.join(" → ")}.`,
          `La valeur finale est $${u}$.`,
          `\`u\` vaut $${u}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_suites_algo_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_algorithme",
    difficulty: 5,
    theme: "neutral",
    hint: "Dis d'où l'on part, ce qu'on répète, et combien de fois.",
    tags: ["premiere", "maths", "suites", "algorithme", "open", "template"],
    generate: () => {
      const cas = [
        {
          script: "`u = 1000` puis `for i in range(3): u = u * 1.05`",
          mots: ["augmente", "5", "trois", "géométrique"],
          desc: "On part de $1000$ et on multiplie trois fois par $1{,}05$ : trois hausses successives de $5\\%$. Le script calcule $u_3 \\approx 1158$.",
        },
        {
          script: "`u = 50` puis `for i in range(4): u = u - 7`",
          mots: ["retire", "7", "quatre", "arithmétique"],
          desc: "On part de $50$ et on retire $7$ quatre fois : le script calcule $u_4 = 50 - 28 = 22$, terme d'une suite arithmétique de raison $-7$.",
        },
        {
          script: "`u = 2` puis `for i in range(5): u = u * 3`",
          mots: ["multiplie", "3", "cinq", "géométrique"],
          desc: "On part de $2$ et on multiplie cinq fois par $3$ : le script calcule $u_5 = 2 \\times 3^5 = 486$.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Explique ce que calcule ce script : ${c.script}. Quelle situation peut-il modéliser ?`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Un script de calcul de termes se lit en trois temps : la valeur de départ, l'opération répétée, le nombre de tours.",
          "L'opération indique la nature de la suite : ajouter donne une suite arithmétique, multiplier une suite géométrique.",
          c.desc,
          "Le résultat affiché est le terme dont le rang est égal au nombre de tours."
        ),
      };
    },
  },

  /* ===================== SUITE_MODELISER ===================== */
  {
    kind: "fixed",
    id: "premiere_suites_mod_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_modeliser",
    difficulty: 4,
    theme: "neutral",
    text: "On construit des figures avec des allumettes : la figure $n$ en utilise $3n + 1$. Combien d'allumettes pour la figure $4$ ?",
    format: "short",
    expected: ["13"],
    comparator: "number_equal",
    hint: "Remplace $n$ par $4$.",
    explanation: exp(
      "Un motif géométrique se traduit par une formule explicite : le rang de la figure donne directement le nombre d'éléments.",
      "$u_4 = 3 \\times 4 + 1$.",
      "$= 12 + 1 = 13$.",
      "Il faut $13$ allumettes. La suite est arithmétique de raison $3$ : chaque figure ajoute $3$ allumettes."
    ),
    canvas: suiteCanvas([4, 7, 10, 13], ["+3", "+3", "+3"], "u(n) = 3n + 1"),
    tags: ["premiere", "maths", "suites", "modeliser", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_mod_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_modeliser",
    difficulty: 5,
    theme: "neutral",
    text: "Les nombres triangulaires sont $1$, $3$, $6$, $10$… (on ajoute un rang de plus à chaque fois). Quel est le cinquième ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Regarde ce qu'on ajoute : $+2$, $+3$, $+4$, puis ?",
    explanation: exp(
      "Un motif de dénombrement se lit en observant ce qu'on ajoute d'un terme au suivant.",
      "Ici : $1 \\to 3$ ($+2$), $3 \\to 6$ ($+3$), $6 \\to 10$ ($+4$). L'ajout augmente d'un à chaque fois.",
      "Le suivant s'obtient donc en ajoutant $5$ : $10 + 5 = 15$.",
      "Le cinquième nombre triangulaire est $15$ — c'est aussi $1+2+3+4+5$."
    ),
    canvas: suiteCanvas([1, 3, 6, 10, "?"], ["+2", "+3", "+4", "+5"], undefined, 4),
    tags: ["premiere", "maths", "suites", "modeliser", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_mod_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_modeliser",
    difficulty: 5,
    theme: "neutral",
    text: "Une population augmente de $3\\%$ par an. Par quel type de suite la modélise-t-on ?",
    format: "qcm",
    choices: [
      "une suite géométrique de raison $1{,}03$",
      "une suite arithmétique de raison $3$",
      "une suite arithmétique de raison $0{,}03$",
      "une suite géométrique de raison $3$",
    ],
    expected: ["une suite géométrique de raison $1{,}03$"],
    comparator: "mcq_exact",
    hint: "Un pourcentage porte sur la valeur de l'année précédente, qui change chaque année.",
    explanation: exp(
      "Une évolution en POURCENTAGE se traduit par une multiplication, donc par une suite géométrique.",
      "Augmenter de $3\\%$ revient à multiplier par $1 + \\dfrac{3}{100} = 1{,}03$.",
      "Une suite arithmétique correspondrait à un ajout FIXE (par exemple $+3$ habitants par an), ce qui est une tout autre situation : le pourcentage, lui, porte chaque année sur une population plus grande.",
      "C'est une suite géométrique de raison $1{,}03$."
    ),
    tags: ["premiere", "maths", "suites", "modeliser", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_mod_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_modeliser",
    difficulty: 4,
    theme: "reunion",
    text: "Un randonneur monte $300$ m de dénivelé la première heure, puis $40$ m de moins à chaque heure suivante. Quelle suite modélise le dénivelé horaire ?",
    format: "qcm",
    choices: [
      "arithmétique de raison $-40$",
      "géométrique de raison $0{,}4$",
      "arithmétique de raison $40$",
      "géométrique de raison $-40$",
    ],
    expected: ["arithmétique de raison $-40$"],
    comparator: "mcq_exact",
    hint: "« $40$ m de moins » : on retranche toujours la même quantité.",
    explanation: exp(
      "On regarde ce qui se répète : un ajout constant donne une suite arithmétique, un facteur constant une suite géométrique.",
      "Ici on retire $40$ m à chaque heure : c'est une quantité fixe.",
      "La suite est donc arithmétique de raison $-40$ : $300$, $260$, $220$… (« $40$ m de moins » ne signifie pas « $40\\%$ de moins ».)",
      "C'est une suite arithmétique de raison $-40$."
    ),
    canvas: suiteCanvas([300, 260, 220, 180], ["−40", "−40", "−40"], "u(n+1) = u(n) − 40"),
    tags: ["premiere", "maths", "suites", "modeliser", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_mod_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_modeliser",
    difficulty: 5,
    theme: "neutral",
    text: "Dans une salle, chaque personne serre la main de toutes les autres. Avec $n$ personnes, le nombre de poignées de main est $\\dfrac{n(n-1)}{2}$. Combien pour $5$ personnes ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "$\\dfrac{5 \\times 4}{2}$.",
    explanation: exp(
      "Une question de dénombrement peut se modéliser par une suite dont le rang est le nombre de personnes.",
      "$u_5 = \\dfrac{5 \\times 4}{2} = \\dfrac{20}{2}$.",
      "$= 10$ poignées de main.",
      "On divise par $2$ car chaque poignée serait sinon comptée deux fois — une fois par personne."
    ),
    tags: ["premiere", "maths", "suites", "modeliser", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_mod_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_modeliser",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle situation se modélise par une suite ARITHMÉTIQUE ?",
    format: "qcm",
    choices: [
      "un abonnement à $15$ € par mois qui s'ajoute au total payé",
      "un capital placé à $2\\%$ par an",
      "une population qui double tous les dix ans",
      "une substance qui perd la moitié de sa masse chaque heure",
    ],
    expected: ["un abonnement à $15$ € par mois qui s'ajoute au total payé"],
    comparator: "mcq_exact",
    hint: "Cherche celle où l'on AJOUTE toujours la même quantité.",
    explanation: exp(
      "Une suite arithmétique modélise une évolution à accroissement CONSTANT ; une suite géométrique, une évolution à taux constant.",
      "L'abonnement ajoute $15$ € chaque mois, quelle que soit la somme déjà payée : l'accroissement est constant.",
      "Les trois autres situations font intervenir un pourcentage ou un facteur (doubler, diviser par deux) : elles sont géométriques.",
      "L'abonnement mensuel se modélise par une suite arithmétique."
    ),
    tags: ["premiere", "maths", "suites", "modeliser", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_mod_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_modeliser",
    difficulty: 5,
    theme: "reunion",
    text: "Une association compte $80$ adhérents et en gagne $12$ chaque année. Modélise la situation par une suite : précise ce que représente $u_n$, sa nature et sa raison.",
    format: "open",
    expected: ["arithmétique", "12", "adhérents", "80"],
    comparator: "contains_keyword",
    hint: "Commence toujours par dire ce que désigne $u_n$.",
    explanation: exp(
      "Modéliser, c'est nommer la quantité étudiée, puis décrire son évolution.",
      "On pose : $u_n$ est le nombre d'adhérents après $n$ années, avec $u_0 = 80$.",
      "Chaque année on ajoute $12$ adhérents : $u_{n+1} = u_n + 12$. La suite est arithmétique de raison $12$, donc $u_n = 80 + 12n$.",
      "$u_n = 80 + 12n$, suite arithmétique de raison $12$."
    ),
    tags: ["premiere", "maths", "suites", "modeliser", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_mod_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_modeliser",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève modélise « une population qui augmente de $5\\%$ par an » par $u_{n+1} = u_n + 5$. Explique son erreur.",
    format: "open",
    expected: ["pourcentage", "1,05", "multiplie", "géométrique"],
    comparator: "contains_keyword",
    hint: "$5\\%$ de quoi ? Cette quantité change-t-elle chaque année ?",
    explanation: exp(
      "Un pourcentage ne s'ajoute pas : il porte sur la valeur de l'année précédente, qui change chaque année.",
      "L'élève a traduit « $5\\%$ » par « $+5$ », ce qui ajouterait $5$ habitants par an, quelle que soit la taille de la population.",
      "La bonne traduction est $u_{n+1} = 1{,}05 \\times u_n$ : la suite est géométrique. Pour $1000$ habitants, la hausse est de $50$ ; pour $10\\,000$, elle est de $500$.",
      "Une évolution en pourcentage se traduit par une multiplication, pas par une addition."
    ),
    tags: ["premiere", "maths", "suites", "modeliser", "open"],
  },
  {
    kind: "template",
    id: "premiere_suites_mod_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_modeliser",
    difficulty: 4,
    theme: "neutral",
    hint: "Une quantité fixe ajoutée : arithmétique. Un pourcentage ou un facteur : géométrique.",
    tags: ["premiere", "maths", "suites", "modeliser", "template"],
    generate: () => {
      const cas = [
        {
          situation: "un livret rapporte $2\\%$ d'intérêts chaque année",
          bon: "géométrique de raison $1{,}02$",
          faux: ["arithmétique de raison $2$", "arithmétique de raison $0{,}02$", "géométrique de raison $2$"],
        },
        {
          situation: "un réservoir perd $30$ litres par jour",
          bon: "arithmétique de raison $-30$",
          faux: ["géométrique de raison $0{,}7$", "arithmétique de raison $30$", "géométrique de raison $-30$"],
        },
        {
          situation: "une bactérie se divise en deux toutes les heures",
          bon: "géométrique de raison $2$",
          faux: ["arithmétique de raison $2$", "géométrique de raison $0{,}5$", "arithmétique de raison $1$"],
        },
        {
          situation: "un coureur ajoute $2$ km à sa sortie hebdomadaire chaque semaine",
          bon: "arithmétique de raison $2$",
          faux: ["géométrique de raison $2$", "arithmétique de raison $-2$", "géométrique de raison $1{,}02$"],
        },
        {
          situation: "une substance perd $20\\%$ de sa masse chaque heure",
          bon: "géométrique de raison $0{,}8$",
          faux: ["arithmétique de raison $-20$", "géométrique de raison $1{,}2$", "géométrique de raison $-0{,}2$"],
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Par quelle suite modélise-t-on la situation suivante : ${c.situation} ?`,
        format: "qcm",
        choices: [c.bon, ...c.faux],
        expected: [c.bon],
        comparator: "mcq_exact",
        explanation: exp(
          "Une quantité fixe ajoutée à chaque étape donne une suite arithmétique ; un pourcentage ou un facteur donne une suite géométrique.",
          "On repère donc si l'énoncé ajoute toujours la même quantité, ou s'il multiplie.",
          `Ici, la modélisation correcte est : ${c.bon}.`,
          "Un pourcentage se traduit toujours par un coefficient multiplicateur."
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_suites_mod_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_modeliser",
    difficulty: 5,
    theme: "neutral",
    hint: "Dis ce que représente $u_n$, donne $u_0$, puis la relation de récurrence.",
    tags: ["premiere", "maths", "suites", "modeliser", "open", "template"],
    generate: () => {
      const cas = [
        {
          situation:
            "une ville de $4000$ habitants gagne $150$ habitants par an",
          mots: ["arithmétique", "150", "habitants", "4000"],
          modele:
            "$u_n$ est le nombre d'habitants après $n$ années, $u_0 = 4000$ et $u_{n+1} = u_n + 150$ : suite arithmétique de raison $150$, donc $u_n = 4000 + 150n$.",
        },
        {
          situation:
            "un capital de $5000$ € placé à $3\\%$ par an",
          mots: ["géométrique", "1,03", "capital", "5000"],
          modele:
            "$u_n$ est le capital après $n$ années, $u_0 = 5000$ et $u_{n+1} = 1{,}03 \\times u_n$ : suite géométrique de raison $1{,}03$, donc $u_n = 5000 \\times 1{,}03^n$.",
        },
        {
          situation:
            "un stock de $600$ pièces dont on retire $45$ pièces par semaine",
          mots: ["arithmétique", "45", "stock", "600"],
          modele:
            "$u_n$ est le stock après $n$ semaines, $u_0 = 600$ et $u_{n+1} = u_n - 45$ : suite arithmétique de raison $-45$, donc $u_n = 600 - 45n$.",
        },
        {
          situation:
            "une population de $2000$ insectes qui diminue de $15\\%$ par mois",
          mots: ["géométrique", "0,85", "insectes", "2000"],
          modele:
            "$u_n$ est la population après $n$ mois, $u_0 = 2000$ et $u_{n+1} = 0{,}85 \\times u_n$ : suite géométrique de raison $0{,}85$, donc $u_n = 2000 \\times 0{,}85^n$.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Modélise par une suite : ${c.situation}. Précise ce que représente $u_n$, sa nature et sa raison.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Modéliser demande trois choses : dire ce que désigne $u_n$, donner le premier terme, écrire la relation de récurrence.",
          "On repère ensuite la nature de la suite : ajout constant (arithmétique) ou facteur constant (géométrique).",
          c.modele,
          "Sans la phrase « $u_n$ est… », le modèle ne veut rien dire : c'est elle qui relie les maths à la situation."
        ),
      };
    },
  },

  /* ===================== SUITE_EVOLUTION ===================== */
  {
    kind: "fixed",
    id: "premiere_suites_evo_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_evolution",
    difficulty: 4,
    theme: "neutral",
    text: "Un prix de $200$ € augmente de $10\\%$, puis encore de $10\\%$. Quel est le prix final, en euros ?",
    format: "short",
    expected: ["242"],
    comparator: "number_equal",
    hint: "La deuxième hausse porte sur $220$, pas sur $200$.",
    explanation: exp(
      "Des évolutions successives se traduisent par un PRODUIT de coefficients multiplicateurs.",
      "$200 \\times 1{,}1 = 220$, puis $220 \\times 1{,}1$.",
      "$= 242$. La deuxième hausse porte sur $220$ € : elle vaut $22$ €, et non $20$ €.",
      "Le prix final est de $242$ €."
    ),
    canvas: suiteCanvas([200, 220, 242], ["×1,1", "×1,1"], "u(n+1) = 1,1 × u(n)"),
    tags: ["premiere", "maths", "suites", "evolution", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_evo_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_evolution",
    difficulty: 5,
    theme: "neutral",
    text: "Un prix de $100$ € augmente de $10\\%$, puis baisse de $10\\%$. Quel est le prix final, en euros ?",
    format: "short",
    expected: ["99"],
    comparator: "number_equal",
    hint: "La baisse porte sur $110$ €, pas sur $100$ €.",
    explanation: exp(
      "On multiplie les coefficients : $1{,}1$ puis $0{,}9$.",
      "$100 \\times 1{,}1 = 110$, puis $110 \\times 0{,}9 = 99$.",
      "$1{,}1 \\times 0{,}9 = 0{,}99$ : la baisse de $11$ € l'emporte sur la hausse de $10$ €, car elle s'applique à un montant plus élevé.",
      "Le prix final est de $99$ € : on ne revient PAS au prix de départ."
    ),
    canvas: suiteCanvas([100, 110, 99], ["×1,1", "×0,9"], "hausse puis baisse de 10 %"),
    tags: ["premiere", "maths", "suites", "evolution", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_evo_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_evolution",
    difficulty: 5,
    theme: "neutral",
    text: "Deux hausses successives de $5\\%$ correspondent à une hausse globale de :",
    format: "qcm",
    choices: ["$10{,}25\\%$", "$10\\%$", "$5\\%$", "$25\\%$"],
    expected: ["$10{,}25\\%$"],
    comparator: "mcq_exact",
    hint: "Calcule $1{,}05 \\times 1{,}05$.",
    explanation: exp(
      "Les taux d'évolution ne s'additionnent pas : ce sont les coefficients multiplicateurs qui se multiplient.",
      "$1{,}05 \\times 1{,}05 = 1{,}1025$.",
      "Ce coefficient correspond à une hausse de $10{,}25\\%$, et non de $10\\%$ : la deuxième hausse porte sur un montant déjà augmenté.",
      "La hausse globale est de $10{,}25\\%$."
    ),
    tags: ["premiere", "maths", "suites", "evolution", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_evo_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_evolution",
    difficulty: 5,
    theme: "neutral",
    text: "Une quantité baisse de $50\\%$, puis augmente de $50\\%$. Que devient-elle ?",
    format: "qcm",
    choices: [
      "elle a perdu $25\\%$ par rapport au départ",
      "elle revient à sa valeur de départ",
      "elle a gagné $25\\%$",
      "elle a perdu $50\\%$",
    ],
    expected: ["elle a perdu $25\\%$ par rapport au départ"],
    comparator: "mcq_exact",
    hint: "$0{,}5 \\times 1{,}5$ vaut combien ?",
    explanation: exp(
      "On multiplie les coefficients successifs.",
      "$0{,}5 \\times 1{,}5 = 0{,}75$.",
      "Le coefficient global vaut $0{,}75$ : il reste $75\\%$ de la valeur initiale, soit une perte de $25\\%$. Partant de $100$ : $50$, puis $75$.",
      "Elle a perdu $25\\%$."
    ),
    tags: ["premiere", "maths", "suites", "evolution", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_evo_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_evolution",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi une hausse de $10\\%$ suivie d'une baisse de $10\\%$ ne ramène pas au prix de départ.",
    format: "open",
    expected: ["0,99", "porte sur", "plus grand", "multiplie"],
    comparator: "contains_keyword",
    hint: "Sur quelle somme porte chacune des deux évolutions ?",
    explanation: exp(
      "Un pourcentage porte toujours sur la valeur du moment, pas sur la valeur initiale.",
      "La hausse s'applique au prix de départ, mais la baisse s'applique au prix DÉJÀ AUGMENTÉ, donc plus grand : elle retire davantage.",
      "En coefficients : $1{,}1 \\times 0{,}9 = 0{,}99$, soit une perte finale de $1\\%$. Pour $100$ € : $+10$ €, puis $-11$ €.",
      "Les deux pourcentages ne portent pas sur la même somme."
    ),
    tags: ["premiere", "maths", "suites", "evolution", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_evo_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_evolution",
    difficulty: 5,
    theme: "neutral",
    text: "Un loyer de $700$ € augmente de $2\\%$ par an. Explique comment calculer le loyer au bout de $5$ ans, sans calculer chaque année.",
    format: "open",
    expected: ["1,02", "puissance", "5", "géométrique"],
    comparator: "contains_keyword",
    hint: "Multiplier $5$ fois par le même nombre, cela s'écrit comment ?",
    explanation: exp(
      "Une évolution à taux constant se modélise par une suite géométrique.",
      "Chaque année, le loyer est multiplié par $1{,}02$ ; sur $5$ ans, on multiplie donc $5$ fois de suite par $1{,}02$.",
      "Cela s'écrit $u_5 = 700 \\times 1{,}02^5 \\approx 773$ € : la formule explicite évite de calculer les années une par une.",
      "$u_n = 700 \\times 1{,}02^n$, donc $u_5 = 700 \\times 1{,}02^5$."
    ),
    tags: ["premiere", "maths", "suites", "evolution", "open"],
  },
  {
    kind: "template",
    id: "premiere_suites_evo_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_evolution",
    difficulty: 4,
    theme: "neutral",
    hint: "Hausse : $1 + \\dfrac{t}{100}$. Baisse : $1 - \\dfrac{t}{100}$.",
    tags: ["premiere", "maths", "suites", "evolution", "template"],
    generate: () => {
      const t = pickOne([4, 5, 8, 12, 15, 20, 25, 30]);
      const hausse = randomInt(0, 1) === 1;
      const coef = hausse ? 1 + t / 100 : 1 - t / 100;
      const fmt = (x: number) => String(Math.round(x * 100) / 100).replace(".", "{,}");
      const faux = hausse
        ? [`$${fmt(t / 100)}$`, `$${fmt(1 - t / 100)}$`, `$${t}$`]
        : [`$${fmt(1 + t / 100)}$`, `$-${fmt(t / 100)}$`, `$${t}$`];
      return {
        text: `Quel est le coefficient multiplicateur d'une ${hausse ? "hausse" : "baisse"} de $${t}\\%$ ?`,
        format: "qcm",
        choices: [`$${fmt(coef)}$`, ...faux],
        expected: [`$${fmt(coef)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          hausse
            ? "Augmenter de $t\\%$ revient à multiplier par $1 + \\dfrac{t}{100}$."
            : "Diminuer de $t\\%$ revient à multiplier par $1 - \\dfrac{t}{100}$.",
          `Ici $t = ${t}$.`,
          `Le coefficient vaut $${fmt(coef)}$.`,
          hausse
            ? `On garde le tout et on ajoute la hausse : $${fmt(coef)}$.`
            : `Il reste $${100 - t}\\%$ de la valeur : $${fmt(coef)}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_suites_evo_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_evolution",
    difficulty: 5,
    theme: "neutral",
    hint: "Multiplie les coefficients, puis interprète le résultat obtenu.",
    tags: ["premiere", "maths", "suites", "evolution", "open", "template"],
    generate: () => {
      const cas = [
        {
          enonce: "une hausse de $20\\%$ suivie d'une baisse de $20\\%$",
          mots: ["0,96", "4", "perte", "multiplie"],
          calcul:
            "$1{,}2 \\times 0{,}8 = 0{,}96$ : il reste $96\\%$ de la valeur, soit une PERTE de $4\\%$.",
        },
        {
          enonce: "deux baisses successives de $10\\%$",
          mots: ["0,81", "19", "perte", "multiplie"],
          calcul:
            "$0{,}9 \\times 0{,}9 = 0{,}81$ : il reste $81\\%$, soit une baisse globale de $19\\%$ — et non de $20\\%$.",
        },
        {
          enonce: "trois hausses successives de $10\\%$",
          mots: ["1,331", "33", "hausse", "multiplie"],
          calcul:
            "$1{,}1^3 = 1{,}331$ : la hausse globale est de $33{,}1\\%$, et non de $30\\%$.",
        },
        {
          enonce: "une baisse de $30\\%$ suivie d'une hausse de $30\\%$",
          mots: ["0,91", "9", "perte", "multiplie"],
          calcul:
            "$0{,}7 \\times 1{,}3 = 0{,}91$ : il reste $91\\%$, soit une perte de $9\\%$.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `À quelle évolution globale correspond ${c.enonce} ? Justifie par le calcul.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Des évolutions successives se combinent en MULTIPLIANT leurs coefficients : les pourcentages ne s'additionnent jamais.",
          "On calcule donc le produit des coefficients, puis on le retraduit en pourcentage.",
          c.calcul,
          "Un coefficient global inférieur à $1$ signale une perte, supérieur à $1$ une hausse."
        ),
      };
    },
  },

  /* ===================== SUITE_SOMME_GEO ===================== */
  {
    kind: "fixed",
    id: "premiere_suites_sgeo_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_somme_geo",
    difficulty: 5,
    theme: "neutral",
    text: "Peut-on utiliser la formule $\\dfrac{1 - q^{n+1}}{1 - q}$ lorsque $q = 1$ ?",
    format: "qcm",
    choices: [
      "non : le dénominateur serait nul ; la somme vaut alors $n + 1$",
      "oui, elle donne $0$",
      "oui, elle donne $1$",
      "non : la somme n'existe pas",
    ],
    expected: ["non : le dénominateur serait nul ; la somme vaut alors $n + 1$"],
    comparator: "mcq_exact",
    hint: "Que vaut $1 - q$ si $q = 1$ ?",
    explanation: exp(
      "La formule de la somme géométrique suppose $q \\neq 1$, ce qui est toujours précisé dans l'énoncé du cours.",
      "Si $q = 1$, le dénominateur $1 - q$ vaut $0$ : la division est impossible.",
      "Mais la somme existe bien : tous les termes valent $1$, et il y en a $n+1$. La somme vaut donc simplement $n + 1$.",
      "Non : pour $q = 1$, la somme vaut $n + 1$."
    ),
    tags: ["premiere", "maths", "suites", "somme_geo", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_sgeo_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_somme_geo",
    difficulty: 5,
    theme: "neutral",
    text: "Une suite géométrique vérifie $u_0 = 3$ et $q = 2$. Combien vaut $u_0 + u_1 + \\dots + u_9$ ?",
    format: "short",
    expected: ["3069"],
    comparator: "number_equal",
    hint: "Mets $3$ en facteur : $3 \\times (1 + 2 + \\dots + 2^9)$.",
    explanation: exp(
      "Pour une somme géométrique, on met le premier terme en facteur : $S = u_0 \\times \\dfrac{1 - q^{n}}{1 - q}$ avec $n$ termes.",
      "Il y a $10$ termes (de $u_0$ à $u_9$) : $S = 3 \\times \\dfrac{1 - 2^{10}}{1 - 2} = 3 \\times \\dfrac{-1023}{-1}$.",
      "$= 3 \\times 1023 = 3069$.",
      "La somme vaut $3069$."
    ),
    tags: ["premiere", "maths", "suites", "somme_geo", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_sgeo_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_somme_geo",
    difficulty: 5,
    theme: "neutral",
    text: "Combien vaut $1 + 0{,}5 + 0{,}25 + 0{,}125$ ?",
    format: "short",
    expected: ["1,875"],
    comparator: "number_equal",
    hint: "Somme géométrique de raison $0{,}5$, avec $4$ termes.",
    explanation: exp(
      "Chaque terme est la moitié du précédent : c'est une somme géométrique de raison $q = 0{,}5$.",
      "Avec $4$ termes : $S = \\dfrac{1 - 0{,}5^4}{1 - 0{,}5} = \\dfrac{1 - 0{,}0625}{0{,}5}$.",
      "$= \\dfrac{0{,}9375}{0{,}5} = 1{,}875$.",
      "La somme vaut $1{,}875$ — et elle s'approchera de $2$ si l'on continue, sans jamais l'atteindre."
    ),
    tags: ["premiere", "maths", "suites", "somme_geo", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_sgeo_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_somme_geo",
    difficulty: 5,
    theme: "neutral",
    text: "Un employeur propose : $1$ centime le premier jour, puis le double chaque jour, pendant $20$ jours. Explique comment calculer le total, et donne un ordre de grandeur.",
    format: "open",
    expected: ["géométrique", "2", "doubl", "10000"],
    comparator: "contains_keyword",
    hint: "Les sommes versées forment une suite géométrique de raison $2$.",
    explanation: exp(
      "Les versements forment une suite géométrique de premier terme $1$ centime et de raison $2$.",
      "Le total est la somme des $20$ premiers termes : $S = \\dfrac{1 - 2^{20}}{1 - 2} = 2^{20} - 1$ centimes.",
      "$2^{20} = 1\\,048\\,576$, donc environ $10\\,485$ € : plus de dix mille euros. Le doublement produit une croissance que l'intuition sous-estime toujours.",
      "Le total dépasse $10\\,000$ € — c'est une somme géométrique de raison $2$."
    ),
    tags: ["premiere", "maths", "suites", "somme_geo", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_sgeo_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_somme_geo",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la différence entre la somme $1 + 2 + \\dots + n$ et la somme $1 + q + \\dots + q^n$ : quand utilise-t-on chacune ?",
    format: "open",
    expected: ["arithmétique", "géométrique", "ajoute", "multiplie"],
    comparator: "contains_keyword",
    hint: "Dans un cas on ajoute toujours le même nombre, dans l'autre on multiplie.",
    explanation: exp(
      "Les deux formules ne s'appliquent pas au même type de suite.",
      "$1 + 2 + \\dots + n = \\dfrac{n(n+1)}{2}$ additionne des termes qui augmentent d'un pas CONSTANT : c'est une somme arithmétique.",
      "$1 + q + \\dots + q^n = \\dfrac{1 - q^{n+1}}{1 - q}$ additionne des termes obtenus en MULTIPLIANT par $q$ : c'est une somme géométrique.",
      "On choisit selon la nature de la suite : ajout constant ou facteur constant."
    ),
    tags: ["premiere", "maths", "suites", "somme_geo", "open"],
  },
  {
    kind: "template",
    id: "premiere_suites_sgeo_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_somme_geo",
    difficulty: 5,
    theme: "neutral",
    hint: "$1 + q + \\dots + q^n = \\dfrac{1 - q^{n+1}}{1 - q}$ : attention, il y a $n+1$ termes.",
    tags: ["premiere", "maths", "suites", "somme_geo", "template"],
    generate: () => {
      const q = pickOne([2, 3, 4, 5]);
      const n = randomInt(3, 6);
      const somme = (q ** (n + 1) - 1) / (q - 1);
      const termes: number[] = [];
      for (let i = 0; i <= n; i += 1) termes.push(q ** i);
      return {
        text: `Combien vaut $${termes.slice(0, 3).join(" + ")} + \\dots + ${q}^{${n}}$ ?`,
        format: "short",
        expected: [String(somme)],
        comparator: "number_equal",
        explanation: exp(
          "C'est une somme géométrique : on applique $1 + q + \\dots + q^n = \\dfrac{1 - q^{n+1}}{1 - q}$.",
          `Ici $q = ${q}$ et $n = ${n}$, donc il y a $${n + 1}$ termes.`,
          `$S = \\dfrac{1 - ${q}^{${n + 1}}}{1 - ${q}} = \\dfrac{${1 - q ** (n + 1)}}{${1 - q}} = ${somme}$.`,
          `La somme vaut $${somme}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_suites_sgeo_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_somme_geo",
    difficulty: 5,
    theme: "neutral",
    hint: "Identifie le premier terme, la raison, le nombre de termes — puis applique la formule.",
    tags: ["premiere", "maths", "suites", "somme_geo", "open", "template"],
    generate: () => {
      const cas = [
        {
          enonce:
            "un joueur mise $2$ € la première partie, puis double sa mise à chaque partie, sur $8$ parties",
          mots: ["géométrique", "2", "510", "doubl"],
          calcul:
            "Les mises forment une suite géométrique de premier terme $2$ et de raison $2$. Total $= 2 \\times \\dfrac{1 - 2^8}{1 - 2} = 2 \\times 255 = 510$ €.",
        },
        {
          enonce:
            "une épargne de $100$ € par an placée de sorte que chaque versement soit multiplié par $1{,}5$",
          mots: ["géométrique", "1,5", "somme", "facteur"],
          calcul:
            "Les termes forment une suite géométrique de raison $1{,}5$ : on applique $S = u_0 \\times \\dfrac{1 - q^n}{1 - q}$ avec $u_0 = 100$.",
        },
        {
          enonce:
            "une feuille pliée dont l'épaisseur double à chaque pliage, sur $10$ pliages",
          mots: ["géométrique", "2", "1023", "doubl"],
          calcul:
            "Les épaisseurs ajoutées forment une suite géométrique de raison $2$ : la somme des $10$ premiers termes vaut $2^{10} - 1 = 1023$ fois l'épaisseur initiale.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Explique comment calculer le total dans cette situation : ${c.enonce}.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Quand chaque terme s'obtient en multipliant le précédent, le total est une somme géométrique.",
          "On identifie le premier terme, la raison et le nombre de termes, puis on applique $S = u_0 \\times \\dfrac{1 - q^n}{1 - q}$.",
          c.calcul,
          "Compter les termes est le point délicat : de $u_0$ à $u_{n-1}$, il y en a $n$."
        ),
      };
    },
  },

  /* ===================== SUITE_LIMITE ===================== */
  {
    kind: "fixed",
    id: "premiere_suites_lim_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_limite",
    difficulty: 3,
    theme: "neutral",
    text: "Vers quoi semble tendre la suite $u_n = \\dfrac{1}{n}$ quand $n$ devient très grand ?",
    format: "qcm",
    choices: ["vers $0$", "vers $1$", "vers $+\\infty$", "vers $-\\infty$"],
    expected: ["vers $0$"],
    comparator: "mcq_exact",
    hint: "Calcule $\\dfrac{1}{10}$, $\\dfrac{1}{100}$, $\\dfrac{1}{1000}$…",
    explanation: exp(
      "Conjecturer une limite, c'est observer le comportement des termes pour de grandes valeurs de $n$.",
      "$u_{10} = 0{,}1$, $u_{100} = 0{,}01$, $u_{1000} = 0{,}001$…",
      "Les termes se rapprochent de $0$ autant qu'on veut, sans jamais l'atteindre : la suite tend vers $0$.",
      "Elle tend vers $0$."
    ),
    canvas: suiteCanvas([1, "0,5", "0,33", "0,25", "0,2", "…"], undefined, "u(n) = 1/n"),
    tags: ["premiere", "maths", "suites", "limite", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_lim_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_limite",
    difficulty: 3,
    theme: "neutral",
    text: "Vers quoi semble tendre la suite $u_n = 2^n$ ?",
    format: "qcm",
    choices: ["vers $+\\infty$", "vers $2$", "vers $0$", "elle reste constante"],
    expected: ["vers $+\\infty$"],
    comparator: "mcq_exact",
    hint: "$2^{10} = 1024$, $2^{20} \\approx 10^6$…",
    explanation: exp(
      "On observe les termes pour de grandes valeurs de $n$.",
      "$2^{10} = 1024$, $2^{20}$ dépasse le million, $2^{30}$ le milliard.",
      "Les termes dépassent n'importe quelle valeur fixée à l'avance : la suite tend vers $+\\infty$.",
      "Elle tend vers $+\\infty$."
    ),
    canvas: suiteCanvas([1, 2, 4, 8, 16, 32, "…"], ["×2", "×2", "×2", "×2", "×2"], "u(n) = 2^n"),
    tags: ["premiere", "maths", "suites", "limite", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_lim_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_limite",
    difficulty: 4,
    theme: "neutral",
    text: "Une suite géométrique de premier terme positif et de raison $q = 0{,}5$ tend vers :",
    format: "qcm",
    choices: ["$0$", "$0{,}5$", "$+\\infty$", "son premier terme"],
    expected: ["$0$"],
    comparator: "mcq_exact",
    hint: "Chaque terme est la moitié du précédent : que devient-il au bout de vingt étapes ?",
    explanation: exp(
      "Quand $0 < q < 1$, chaque terme est une fraction du précédent : les termes diminuent sans cesse.",
      "Avec $u_0 = 100$ : $50$, $25$, $12{,}5$, $6{,}25$… puis $0{,}0001$ au bout de vingt étapes.",
      "Les termes s'approchent de $0$ autant qu'on veut : la suite tend vers $0$.",
      "Elle tend vers $0$."
    ),
    tags: ["premiere", "maths", "suites", "limite", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_lim_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_limite",
    difficulty: 4,
    theme: "neutral",
    text: "Une suite géométrique de premier terme positif et de raison $q = 1{,}5$ tend vers :",
    format: "qcm",
    choices: ["$+\\infty$", "$1{,}5$", "$0$", "$1$"],
    expected: ["$+\\infty$"],
    comparator: "mcq_exact",
    hint: "$q > 1$ : chaque terme est plus grand que le précédent, et l'écart grandit.",
    explanation: exp(
      "Quand $q > 1$ et que le premier terme est positif, chaque terme dépasse le précédent d'une quantité croissante.",
      "Avec $u_0 = 100$ : $150$, $225$, $337{,}5$… et $u_{20}$ dépasse $300\\,000$.",
      "La croissance est de plus en plus rapide : la suite tend vers $+\\infty$.",
      "Elle tend vers $+\\infty$."
    ),
    tags: ["premiere", "maths", "suites", "limite", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_lim_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_limite",
    difficulty: 5,
    theme: "neutral",
    text: "Une suite décroissante tend-elle forcément vers $-\\infty$ ?",
    format: "qcm",
    choices: [
      "non : elle peut se stabiliser vers une valeur, comme $\\dfrac{1}{n}$ vers $0$",
      "oui, toujours",
      "oui, si elle est géométrique",
      "non : elle ne tend jamais vers rien",
    ],
    expected: [
      "non : elle peut se stabiliser vers une valeur, comme $\\dfrac{1}{n}$ vers $0$",
    ],
    comparator: "mcq_exact",
    hint: "$\\dfrac{1}{n}$ décroît toujours. Descend-elle pour autant sans fin ?",
    explanation: exp(
      "Décroître signifie que chaque terme est plus petit que le précédent, mais pas que la descente soit sans limite.",
      "$\\dfrac{1}{n}$ décroît à chaque étape, et pourtant elle reste toujours positive : elle s'approche de $0$ sans jamais descendre en dessous.",
      "Elle est dite MINORÉE par $0$. Une suite décroissante peut donc converger vers une valeur, ou bien filer vers $-\\infty$ comme $u_n = -n$.",
      "Non : une suite décroissante peut tendre vers une valeur finie."
    ),
    tags: ["premiere", "maths", "suites", "limite", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_lim_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_limite",
    difficulty: 5,
    theme: "neutral",
    text: "Les premiers termes d'une suite sont $2$ ; $2{,}5$ ; $2{,}75$ ; $2{,}875$ ; $2{,}9375$. Que peut-on conjecturer ?",
    format: "qcm",
    choices: [
      "elle semble tendre vers $3$",
      "elle semble tendre vers $+\\infty$",
      "elle semble tendre vers $2$",
      "elle est constante",
    ],
    expected: ["elle semble tendre vers $3$"],
    comparator: "mcq_exact",
    hint: "Regarde l'écart avec $3$ : $1$ ; $0{,}5$ ; $0{,}25$…",
    explanation: exp(
      "Pour conjecturer une limite, on observe si les termes s'accumulent près d'une valeur.",
      "Les écarts avec $3$ valent $1$ ; $0{,}5$ ; $0{,}25$ ; $0{,}125$ ; $0{,}0625$ : ils sont divisés par $2$ à chaque étape.",
      "Les termes se rapprochent de $3$ autant qu'on veut, sans le dépasser : on conjecture une limite égale à $3$.",
      "La suite semble tendre vers $3$."
    ),
    canvas: suiteCanvas([2, "2,5", "2,75", "2,875", "2,9375", "…"], undefined, "vers 3 ?"),
    tags: ["premiere", "maths", "suites", "limite", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_lim_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_limite",
    difficulty: 5,
    theme: "neutral",
    text: "Que veut dire, intuitivement, « la suite $(u_n)$ tend vers $0$ » ?",
    format: "open",
    expected: ["proche", "aussi petit", "grand", "jamais"],
    comparator: "contains_keyword",
    hint: "Peut-on rendre les termes aussi petits qu'on veut ?",
    explanation: exp(
      "En première, la limite s'aborde intuitivement, sans définition formelle.",
      "Dire que la suite tend vers $0$ signifie que ses termes deviennent aussi proches de $0$ que l'on veut, dès que $n$ est assez grand.",
      "Par exemple pour $\\dfrac{1}{n}$ : si l'on veut être à moins de $0{,}001$ de $0$, il suffit de prendre $n > 1000$. Et cela vaut pour n'importe quelle précision demandée.",
      "Les termes s'approchent de $0$ autant qu'on veut, sans nécessairement l'atteindre."
    ),
    tags: ["premiere", "maths", "suites", "limite", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_lim_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_limite",
    difficulty: 5,
    theme: "neutral",
    text: "Une substance perd $20\\%$ de sa masse chaque heure. Conjecture ce que devient sa masse au bout d'un temps très long, et justifie.",
    format: "open",
    expected: ["0", "géométrique", "0,8", "jamais"],
    comparator: "contains_keyword",
    hint: "La masse suit une suite géométrique de raison $0{,}8$.",
    explanation: exp(
      "La masse suit une suite géométrique de raison $0{,}8$, car on garde $80\\%$ de la masse à chaque heure.",
      "Comme $0 < 0{,}8 < 1$, les termes diminuent sans cesse : $100$, $80$, $64$, $51{,}2$…",
      "Au bout de $30$ heures, il reste moins de $0{,}13\\%$ de la masse initiale. La suite tend vers $0$ — sans jamais l'atteindre exactement.",
      "La masse tend vers $0$, sans jamais devenir nulle."
    ),
    tags: ["premiere", "maths", "suites", "limite", "open"],
  },
  {
    kind: "template",
    id: "premiere_suites_lim_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_limite",
    difficulty: 4,
    theme: "neutral",
    hint: "Pour une suite géométrique de terme positif : $q > 1$ fait exploser, $0 < q < 1$ fait tendre vers $0$.",
    tags: ["premiere", "maths", "suites", "limite", "template"],
    generate: () => {
      const cas = [
        { q: "$1{,}2$", vers: "$+\\infty$", pourquoi: "$q > 1$ : les termes grandissent de plus en plus vite" },
        { q: "$0{,}7$", vers: "$0$", pourquoi: "$0 < q < 1$ : chaque terme est plus petit que le précédent, et l'on s'approche de $0$" },
        { q: "$3$", vers: "$+\\infty$", pourquoi: "$q > 1$ : la croissance est explosive" },
        { q: "$0{,}25$", vers: "$0$", pourquoi: "$0 < q < 1$ : les termes sont divisés par $4$ à chaque étape" },
        { q: "$1$", vers: "son premier terme", pourquoi: "$q = 1$ : tous les termes sont égaux, la suite est constante" },
      ];
      const c = pickOne(cas);
      const autres = ["$+\\infty$", "$0$", "son premier terme", "$-\\infty$"].filter(
        (x) => x !== c.vers
      );
      return {
        text: `Une suite géométrique de premier terme positif a pour raison $q = ${c.q}$. Vers quoi tend-elle ?`,
        format: "qcm",
        choices: [c.vers, ...autres],
        expected: [c.vers],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour une suite géométrique à termes positifs, tout se joue sur la position de $q$ par rapport à $1$.",
          "On compare donc la raison à $1$.",
          `Ici ${c.pourquoi}.`,
          `La suite tend vers ${c.vers}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_suites_lim_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_limite",
    difficulty: 5,
    theme: "neutral",
    hint: "Observe l'écart entre les termes et la valeur soupçonnée : diminue-t-il ?",
    tags: ["premiere", "maths", "suites", "limite", "open", "template"],
    generate: () => {
      const cas = [
        {
          termes: "$5$ ; $4$ ; $3{,}5$ ; $3{,}25$ ; $3{,}125$",
          mots: ["3", "écart", "moitié", "tend"],
          verdict:
            "Les écarts avec $3$ valent $2$ ; $1$ ; $0{,}5$ ; $0{,}25$ ; $0{,}125$ : ils sont divisés par $2$. La suite semble tendre vers $3$.",
        },
        {
          termes: "$0{,}9$ ; $0{,}99$ ; $0{,}999$ ; $0{,}9999$",
          mots: ["1", "proche", "tend", "jamais"],
          verdict:
            "Les termes s'approchent de $1$ autant qu'on veut, sans l'atteindre : la suite semble tendre vers $1$.",
        },
        {
          termes: "$3$ ; $9$ ; $27$ ; $81$ ; $243$",
          mots: ["infini", "triple", "grand", "explose"],
          verdict:
            "Chaque terme est le triple du précédent : les valeurs dépassent n'importe quel seuil. La suite semble tendre vers $+\\infty$.",
        },
        {
          termes: "$10$ ; $5$ ; $2{,}5$ ; $1{,}25$ ; $0{,}625$",
          mots: ["0", "moitié", "tend", "positif"],
          verdict:
            "Chaque terme est la moitié du précédent, en restant positif : la suite semble tendre vers $0$.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Les premiers termes d'une suite sont ${c.termes}. Que peux-tu conjecturer sur sa limite ? Justifie ton observation.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Conjecturer une limite, c'est observer si les termes s'accumulent près d'une valeur ou s'ils dépassent tout seuil.",
          "On regarde l'écart entre les termes et la valeur soupçonnée : s'il diminue vers $0$, la conjecture tient.",
          c.verdict,
          "En première, on conjecture seulement : la démonstration des limites viendra en terminale."
        ),
      };
    },
  },

  /* =========================================================
     QUESTIONS OUVERTES — compléments du 02/08/2026.
     Les cinq micro-compétences ci-dessous avaient été écrites avant qu'on
     abandonne le compteur d'items fixes : elles n'avaient aucune question
     ouverte. Le BO demande de préparer l'oral « dès la classe de première ».
     Deux ouvertes fixes + un TEMPLATE ouvert par micro, pour que la question
     ouverte ne se répète pas elle non plus.
  ========================================================= */

  {
    kind: "fixed",
    id: "premiere_suite_ter_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_termes",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la différence entre une suite définie de façon EXPLICITE et une suite définie par RÉCURRENCE.",
    format: "open",
    expected: ["directement", "precedent", "précédent", "de proche en proche", "n'importe quel rang", "un par un"],
    comparator: "contains_keyword",
    hint: "Pour calculer $u_{100}$, faut-il connaître $u_{99}$ ?",
    explanation: exp(
      "Les deux écritures décrivent la même suite, mais elles ne se calculent pas de la même façon.",
      "Une définition EXPLICITE donne $u_n$ en fonction de $n$ : on calcule directement n'importe quel terme, sans les précédents. $u_{100}$ s'obtient en une ligne.",
      "Une définition par RÉCURRENCE donne $u_{n+1}$ en fonction de $u_n$ : il faut avancer de proche en proche depuis le premier terme. Pour $u_{100}$, il faut avoir calculé les cent précédents.",
      "L'explicite va droit au but ; la récurrence décrit le passage d'un terme au suivant, ce qui colle mieux à une situation concrète (« chaque mois, on ajoute… »)."
    ),
    tags: ["premiere", "maths", "suites", "termes", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_suite_ter_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_termes",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève affirme que le premier terme d'une suite est toujours $u_1$. Explique pourquoi il faut se méfier.",
    format: "open",
    expected: ["rang", "u_0", "commence", "enonce", "énoncé", "depend", "dépend"],
    comparator: "contains_keyword",
    hint: "Que devient $u_{10}$ selon que la suite commence à $u_0$ ou à $u_1$ ?",
    explanation: exp(
      "Le rang du premier terme n'est pas imposé : c'est l'énoncé qui le fixe, et il faut le lire.",
      "Beaucoup de suites commencent à $u_0$ — c'est même le cas le plus fréquent quand $n$ compte un nombre d'années écoulées, l'année de départ portant le rang $0$.",
      "L'enjeu est concret : pour une population qui double chaque année à partir de $1000$, le terme au bout de dix ans est $u_{10}$ si on part de $u_0$, mais $u_{11}$ si on part de $u_1$. Un rang d'écart, c'est un doublement d'écart.",
      "Il faut toujours vérifier à quel rang la suite commence avant de calculer quoi que ce soit."
    ),
    tags: ["premiere", "maths", "suites", "termes", "piege", "open"],
  },
  {
    kind: "template",
    id: "premiere_suite_ter_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_termes",
    difficulty: 5,
    theme: "neutral",
    hint: "Remplace $n$ par chaque rang demandé, sans avoir besoin des termes précédents.",
    tags: ["premiere", "maths", "suites", "termes", "open", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(-4, 6);
      const r = pickOne([20, 50, 100]);
      return {
        text: `La suite $(u_n)$ est définie pour tout entier $n$ par $u_n = ${a}n ${b >= 0 ? "+ " + b : "- " + -b}$. Calcule $u_0$ et $u_{${r}}$, puis explique pourquoi tu n'as pas eu besoin de calculer les termes intermédiaires.`,
        format: "open",
        expected: [String(b), String(a * r + b), "explicite", "directement", "remplace", "sans les precedents", "sans les précédents"],
        comparator: "contains_keyword",
        explanation: exp(
          "Une suite définie explicitement donne $u_n$ en fonction de $n$ : chaque terme se calcule seul, en remplaçant $n$ par le rang voulu.",
          `On remplace $n$ par $0$ : $u_0 = ${a} \\times 0 ${b >= 0 ? "+ " + b : "- " + -b} = ${b}$.`,
          `Puis $n$ par $${r}$ : $u_{${r}} = ${a} \\times ${r} ${b >= 0 ? "+ " + b : "- " + -b} = ${a * r + b}$.`,
          `Aucun terme intermédiaire n'est nécessaire — c'est tout l'intérêt de la forme explicite. Avec une définition par récurrence, il aurait fallu $${r}$ calculs successifs.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_suite_ari_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_arithmetique",
    difficulty: 5,
    theme: "neutral",
    text: "On te donne les premiers termes d'une suite. Comment reconnais-tu qu'elle est arithmétique ?",
    format: "open",
    expected: ["difference", "différence", "constante", "soustrait", "meme nombre", "même nombre"],
    comparator: "contains_keyword",
    hint: "Que fait-on entre deux termes consécutifs ?",
    explanation: exp(
      "Une suite est arithmétique lorsqu'on passe d'un terme au suivant en AJOUTANT toujours le même nombre, appelé la raison.",
      "Pour le vérifier sur une liste, on calcule les différences entre termes consécutifs : $u_1 - u_0$, puis $u_2 - u_1$, etc.",
      "Si toutes ces différences sont égales, la suite est arithmétique et cette valeur commune est la raison. Une seule différence qui s'écarte suffit à conclure que non.",
      "Différences constantes → arithmétique. Attention : quelques termes ne PROUVENT rien, ils suggèrent ; la démonstration se fait sur $u_{n+1} - u_n$ en général."
    ),
    tags: ["premiere", "maths", "suites", "arithmetique", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_suite_ari_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_arithmetique",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit que la suite $u_n = 3n + 2$ n'est pas arithmétique, « parce qu'on ne voit pas de $+r$ ». Explique-lui.",
    format: "open",
    expected: ["difference", "différence", "u_{n+1}", "raison 3", "3", "constante"],
    comparator: "contains_keyword",
    hint: "Calcule $u_{n+1} - u_n$.",
    explanation: exp(
      "Une suite arithmétique peut s'écrire de deux façons : par récurrence ($u_{n+1} = u_n + r$) ou explicitement ($u_n = u_0 + nr$). La seconde ne montre pas la raison à l'œil nu.",
      "Pour trancher, on calcule la différence : $u_{n+1} - u_n = \\left(3(n+1) + 2\\right) - (3n + 2)$.",
      "$= 3n + 3 + 2 - 3n - 2 = 3$. Cette différence est constante, donc la suite EST arithmétique, de raison $3$ et de premier terme $u_0 = 2$.",
      "La forme explicite d'une suite arithmétique est toujours affine en $n$ : le coefficient de $n$ est la raison, la constante est $u_0$."
    ),
    tags: ["premiere", "maths", "suites", "arithmetique", "piege", "open"],
  },
  {
    kind: "template",
    id: "premiere_suite_ari_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_arithmetique",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule $u_{n+1} - u_n$ : si le résultat ne dépend pas de $n$, la suite est arithmétique.",
    tags: ["premiere", "maths", "suites", "arithmetique", "open", "template"],
    generate: () => {
      const cas = [
        { f: "u_n = 5n - 3", ok: true, r: "5" },
        { f: "u_n = -2n + 7", ok: true, r: "-2" },
        { f: "u_n = n^2", ok: false, r: "2n + 1" },
        { f: "u_n = 3 \\times 2^n", ok: false, r: "3 \\times 2^n" },
        { f: "u_n = \\dfrac{n}{2} + 1", ok: true, r: "\\dfrac{1}{2}" },
      ];
      const c = pickOne(cas);
      return {
        text: `La suite définie par $${c.f}$ est-elle arithmétique ? Justifie en calculant $u_{n+1} - u_n$.`,
        format: "open",
        expected: c.ok
          ? ["constante", "ne depend pas de n", "ne dépend pas de n", "arithmetique", "arithmétique"]
          : ["depend de n", "dépend de n", "pas constante", "pas arithmetique", "pas arithmétique"],
        comparator: "contains_keyword",
        explanation: exp(
          "Une suite est arithmétique si et seulement si la différence $u_{n+1} - u_n$ ne dépend pas de $n$.",
          `On remplace : $u_{n+1}$ s'obtient en mettant $n+1$ à la place de $n$ dans $${c.f}$, puis on soustrait $u_n$.`,
          c.ok
            ? `On obtient $${c.r}$, un nombre fixe : la différence est bien constante.`
            : `On obtient $${c.r}$, qui dépend encore de $n$ : l'écart entre deux termes consécutifs change à chaque rang.`,
          c.ok
            ? `La suite est arithmétique, de raison $${c.r}$.`
            : "La suite n'est pas arithmétique."
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_suite_geo_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_geometrique",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la différence entre une suite arithmétique et une suite géométrique, avec un exemple concret de chacune.",
    format: "open",
    expected: ["ajoute", "multiplie", "raison", "difference", "différence", "quotient"],
    comparator: "contains_keyword",
    hint: "Dans un cas on ajoute, dans l'autre on multiplie.",
    explanation: exp(
      "Les deux suites décrivent une régularité, mais pas la même opération.",
      "Arithmétique : on AJOUTE toujours le même nombre. Un livret qui reçoit $50$ € chaque mois, ou une pile de briques dont on ajoute trois rangées par jour.",
      "Géométrique : on MULTIPLIE toujours par le même nombre. Un capital à $3\\,\\%$ par an (on multiplie par $1{,}03$), une population qui double, une quantité de médicament qui diminue de moitié.",
      "On les distingue par un test : différences constantes → arithmétique ; quotients constants → géométrique. La géométrique s'emballe (ou s'effondre) bien plus vite."
    ),
    tags: ["premiere", "maths", "suites", "geometrique", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_suite_geo_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_geometrique",
    difficulty: 5,
    theme: "neutral",
    text: "Une suite géométrique a un premier terme positif et une raison comprise entre $0$ et $1$. Explique pourquoi elle décroît sans jamais devenir négative.",
    format: "open",
    expected: ["multiplie", "fraction", "reste positif", "jamais negatif", "jamais négatif", "entre 0 et 1"],
    comparator: "contains_keyword",
    hint: "Que devient un nombre positif multiplié par $0{,}8$ ? Et si on recommence ?",
    explanation: exp(
      "Chaque terme s'obtient en multipliant le précédent par la raison : le signe et la taille se déduisent de cette seule opération.",
      "La raison est strictement comprise entre $0$ et $1$ : multiplier par elle DIMINUE un nombre positif, donc la suite décroît.",
      "Mais le produit de deux nombres strictement positifs reste strictement positif : aucun terme ne peut devenir nul ni négatif. Les termes se rapprochent de $0$ sans jamais l'atteindre.",
      "Elle décroît parce qu'on multiplie par un nombre plus petit que $1$, et reste positive parce qu'on multiplie par un nombre positif — les deux conditions viennent du même encadrement."
    ),
    tags: ["premiere", "maths", "suites", "geometrique", "open"],
  },
  {
    kind: "template",
    id: "premiere_suite_geo_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_geometrique",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare la raison à $1$, et regarde le signe du premier terme.",
    tags: ["premiere", "maths", "suites", "geometrique", "open", "template"],
    generate: () => {
      const cas = [
        { u0: 500, q: "1,05", sens: "croissante", pourcent: "+5 %" },
        { u0: 200, q: "0,9", sens: "décroissante", pourcent: "−10 %" },
        { u0: 1000, q: "0,75", sens: "décroissante", pourcent: "−25 %" },
        { u0: 50, q: "1,2", sens: "croissante", pourcent: "+20 %" },
        { u0: 800, q: "0,5", sens: "décroissante", pourcent: "−50 %" },
      ];
      const c = pickOne(cas);
      return {
        text: `Une suite géométrique a pour premier terme $u_0 = ${c.u0}$ et pour raison $${c.q}$. Est-elle croissante ou décroissante ? Que représente cette raison en pourcentage ? Justifie.`,
        format: "open",
        expected: [c.sens, c.pourcent, "raison", "1", "multiplie"],
        comparator: "contains_keyword",
        explanation: exp(
          "Pour une suite géométrique à termes positifs, tout se joue sur la position de la raison par rapport à $1$.",
          `Ici la raison vaut $${c.q}$, et le premier terme $${c.u0}$ est positif.`,
          c.sens === "croissante"
            ? `Comme $${c.q} > 1$, chaque terme est plus grand que le précédent : la suite croît.`
            : `Comme $0 < ${c.q} < 1$, chaque terme est une fraction du précédent : la suite décroît, tout en restant positive.`,
          `La suite est ${c.sens}, et multiplier par $${c.q}$ correspond à une évolution de $${c.pourcent}$ à chaque étape.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_suite_var_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_variation",
    difficulty: 5,
    theme: "neutral",
    text: "Quelles sont les deux méthodes pour étudier le sens de variation d'une suite, et quand choisit-on l'une plutôt que l'autre ?",
    format: "open",
    expected: ["difference", "différence", "quotient", "signe", "comparer a 1", "comparer à 1"],
    comparator: "contains_keyword",
    hint: "L'une soustrait, l'autre divise. Laquelle convient à une suite géométrique ?",
    explanation: exp(
      "Étudier le sens de variation d'une suite, c'est comparer $u_{n+1}$ et $u_n$ pour tout $n$.",
      "Première méthode — la DIFFÉRENCE : on calcule $u_{n+1} - u_n$ et on étudie son signe. Positive pour tout $n$ → croissante. C'est la méthode générale, celle qu'on essaie d'abord.",
      "Seconde méthode — le QUOTIENT : on calcule $\\dfrac{u_{n+1}}{u_n}$ et on le compare à $1$. Elle n'est valable que si tous les termes sont strictement positifs, mais elle est bien plus simple pour les suites géométriques, où les puissances se simplifient.",
      "Différence pour les suites définies par des sommes, quotient pour celles définies par des produits ou des puissances — à condition d'avoir vérifié que les termes sont positifs."
    ),
    tags: ["premiere", "maths", "suites", "variation", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_suite_var_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_variation",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève calcule $u_0$, $u_1$, $u_2$ et $u_3$, constate qu'ils augmentent, et conclut que la suite est croissante. Que lui manque-t-il ?",
    format: "open",
    expected: ["tout n", "pour tout", "demonstration", "démonstration", "quelques termes", "pas une preuve"],
    comparator: "contains_keyword",
    hint: "Une suite peut-elle monter au début puis redescendre ?",
    explanation: exp(
      "Une suite est croissante si $u_{n+1} \\geqslant u_n$ POUR TOUT entier $n$ — pas seulement pour les premiers.",
      "Quatre termes qui montent ne prouvent rien : la suite $u_n = -n^2 + 10n$ croît jusqu'au rang $5$ puis décroît définitivement.",
      "Il faut donc une démonstration valable pour tout $n$ : calculer $u_{n+1} - u_n$ en gardant $n$ comme lettre, et montrer que le signe obtenu ne dépend pas de la valeur de $n$.",
      "Quelques termes suggèrent, ils ne démontrent pas — c'est la même différence qu'entre un dessin et une preuve."
    ),
    tags: ["premiere", "maths", "suites", "variation", "piege", "open"],
  },
  {
    kind: "template",
    id: "premiere_suite_var_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_variation",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule $u_{n+1} - u_n$ en gardant $n$ comme lettre, puis étudie le signe obtenu.",
    tags: ["premiere", "maths", "suites", "variation", "open", "template"],
    generate: () => {
      const cas = [
        { f: "u_n = 4n + 1", sens: "croissante", diff: "4", raison: "un nombre strictement positif" },
        { f: "u_n = -3n + 10", sens: "décroissante", diff: "-3", raison: "un nombre strictement négatif" },
        { f: "u_n = n^2", sens: "croissante", diff: "2n + 1", raison: "strictement positif pour tout entier naturel $n$" },
        { f: "u_n = -n^2", sens: "décroissante", diff: "-2n - 1", raison: "strictement négatif pour tout entier naturel $n$" },
        { f: "u_n = 2^n", sens: "croissante", diff: "2^n", raison: "strictement positif" },
      ];
      const c = pickOne(cas);
      return {
        text: `Étudie le sens de variation de la suite définie par $${c.f}$, et rédige ta justification comme au tableau.`,
        format: "open",
        expected: [c.sens === "croissante" ? "croissante" : "decroissante", c.sens, "u_{n+1} - u_n", "pour tout", "signe"],
        comparator: "contains_keyword",
        explanation: exp(
          "Le sens de variation d'une suite se démontre en étudiant le signe de $u_{n+1} - u_n$, valable POUR TOUT $n$.",
          `On écrit $u_{n+1}$ en remplaçant $n$ par $n+1$ dans $${c.f}$, puis on soustrait $u_n$.`,
          `Après simplification, on obtient $${c.diff}$, qui est ${c.raison}.`,
          `La différence garde donc un signe constant : la suite est ${c.sens} sur $\\mathbb{N}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_suite_som_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_sommes",
    difficulty: 5,
    theme: "neutral",
    text: "Explique l'astuce qui permet de calculer $1 + 2 + \\ldots + n$ sans tout additionner.",
    format: "open",
    expected: ["paires", "deux a deux", "deux à deux", "n + 1", "double", "gauss"],
    comparator: "contains_keyword",
    hint: "Écris la somme à l'endroit, puis à l'envers, et additionne les deux lignes.",
    explanation: exp(
      "L'idée est de faire apparaître des paires qui donnent toutes le même total, au lieu d'additionner terme à terme.",
      "On écrit la somme deux fois, la seconde à l'envers : $1 + 2 + \\ldots + n$ et $n + (n-1) + \\ldots + 1$.",
      "En additionnant colonne par colonne, chaque paire vaut $n + 1$, et il y a $n$ colonnes : le total des deux lignes vaut $n(n+1)$. Comme on a compté la somme deux fois, on divise par $2$.",
      "$1 + 2 + \\ldots + n = \\dfrac{n(n+1)}{2}$ — l'astuce attribuée au jeune Gauss, qui aurait additionné $1$ à $100$ en quelques secondes."
    ),
    tags: ["premiere", "maths", "suites", "sommes", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_suite_som_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_sommes",
    difficulty: 5,
    theme: "neutral",
    text: "Dans la formule d'une somme de termes arithmétiques, on multiplie le nombre de termes par la moyenne du premier et du dernier. Explique pourquoi cela fonctionne.",
    format: "open",
    expected: ["moyenne", "regulier", "régulier", "premier et dernier", "paires", "compense"],
    comparator: "contains_keyword",
    hint: "Que vaut la somme du premier et du dernier terme ? Et celle du deuxième et de l'avant-dernier ?",
    explanation: exp(
      "Dans une suite arithmétique, les termes sont régulièrement espacés : ce qu'on gagne d'un côté, on le perd de l'autre.",
      "Le deuxième terme dépasse le premier de la raison, tandis que l'avant-dernier est en dessous du dernier de cette même raison : leur somme est donc la même que celle du premier et du dernier.",
      "Toutes les paires « symétriques » donnent le même total. La moyenne de tous les termes est donc exactement la moyenne du premier et du dernier.",
      "Somme $=$ nombre de termes $\\times$ moyenne des extrêmes. Cela ne marche QUE pour une suite arithmétique : sans régularité, les écarts ne se compensent plus."
    ),
    tags: ["premiere", "maths", "suites", "sommes", "open"],
  },
  {
    kind: "template",
    id: "premiere_suite_som_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_sommes",
    difficulty: 5,
    theme: "neutral",
    hint: "Nombre de termes $\\times$ moyenne du premier et du dernier.",
    tags: ["premiere", "maths", "suites", "sommes", "open", "template"],
    generate: () => {
      const n = pickOne([10, 20, 50, 100, 200]);
      const s = (n * (n + 1)) / 2;
      return {
        text: `Calcule $1 + 2 + 3 + \\ldots + ${n}$, et explique la méthode que tu utilises plutôt que d'additionner les ${n} termes un par un.`,
        format: "open",
        expected: [String(s), "n(n+1)/2", "paires", "moyenne", String(n + 1)],
        comparator: "contains_keyword",
        explanation: exp(
          "On regroupe les termes par paires de même total plutôt que de les additionner dans l'ordre.",
          `En écrivant la somme à l'endroit puis à l'envers, chaque paire vaut $${n} + 1 = ${n + 1}$, et il y a $${n}$ paires.`,
          `Le double de la somme vaut donc $${n} \\times ${n + 1} = ${n * (n + 1)}$, et la somme elle-même la moitié.`,
          `$1 + 2 + \\ldots + ${n} = \\dfrac{${n} \\times ${n + 1}}{2} = ${s}$.`
        ),
      };
    },
  },
];
