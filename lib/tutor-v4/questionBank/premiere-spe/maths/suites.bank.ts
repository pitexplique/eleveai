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
// PÉRIMÈTRE BO 2019 Première spé. Conventions : LaTeX, règle QCM (bonne réponse en 1re position, mélangée par le moteur).

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
    microId: "suite_termes",
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
    tags: ["premiere", "maths", "suites", "termes", "recurrence", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_suites_termes_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId: "suite_termes",
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
    microId: "suite_termes",
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
    microId: "suite_termes",
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
    microId: "suite_sommes",
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
];
