// lib/tutor-v4/questionBank/terminale-spe/maths/suites-concours.bank.ts
//
// Notions : suites numériques (suite_numerique), limites de suites
// (limite_suite) et algorithmique (algorithmique_python).
// Calibrage : épreuve de mathématiques du Concours Avenir (sujet 2026),
// première section « Calculs numériques et suites » (questions 1 à 12).
//
// Les gestes qui reviennent :
//   - limite d'un quotient de polynômes : comparer les degrés, pas développer ;
//   - lever une forme « ∞ - ∞ » par la quantité conjuguée ;
//   - reconnaître une somme télescopique plutôt que sommer terme à terme ;
//   - trouver la limite d'une suite récurrente par le point fixe L = f(L) ;
//   - dérouler un court programme Python à la main.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

export const suitesConcoursBank: TutorBankItemV4[] = [
  /* =========================================================
     SUITE_EXPLICITE_RECURRENCE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_explicite_recurrence",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $(u_n)$ définie sur $\\mathbb{N}$ par $u_0 = 1$ et $u_{n+1} = u_n + 2n + 1$. Pour tout entier $n$ :",
    format: "qcm",
    choices: ["$u_n = n^2 + 1$", "$u_n = (n+1)^2$", "$u_n = 2n + 1$", "$u_n = (n+1)(n+2)$"],
    expected: ["$u_n = n^2 + 1$"],
    comparator: "mcq_exact",
    hint: "Calcule $u_1$, $u_2$, $u_3$ et compare avec chaque proposition.",
    explanation: exp(
      "On peut tester une formule explicite sur les premiers termes.",
      "On calcule quelques termes, puis on élimine.",
      "$u_0 = 1$, $u_1 = 1 + 1 = 2$, $u_2 = 2 + 3 = 5$, $u_3 = 5 + 5 = 10$. La suite $n^2 + 1$ donne $1, 2, 5, 10$ : elle convient. $(n+1)^2$ donnerait $1, 4, 9$ dès $u_1$.",
      "$u_n = n^2 + 1$."
    ),
    tags: ["terminale-spe", "suites", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_explicite_recurrence",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $(u_n)$ définie par $u_0 = 2$ et $u_{n+1} = 3u_n$. Pour tout entier $n$ :",
    format: "qcm",
    choices: ["$u_n = 2 \\times 3^{n}$", "$u_n = 3 \\times 2^{n}$", "$u_n = 2 + 3n$", "$u_n = 6^{n}$"],
    expected: ["$u_n = 2 \\times 3^{n}$"],
    comparator: "mcq_exact",
    hint: "C'est une suite géométrique : le premier terme reste devant, la raison prend l'exposant.",
    explanation: exp(
      "Une suite géométrique de premier terme $u_0$ et de raison $q$ vérifie $u_n = u_0 q^{n}$.",
      "On identifie le premier terme et la raison.",
      "$u_0 = 2$ et $q = 3$, donc $u_n = 2 \\times 3^{n}$. Échanger les rôles donnerait $3 \\times 2^n$, qui vaut $3$ pour $n = 0$ et non $2$.",
      "$u_n = 2 \\times 3^{n}$."
    ),
    tags: ["terminale-spe", "suites", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_explicite_recurrence",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $(u_n)$ la suite arithmétique de premier terme $u_0 = 5$ et de raison $3$. Pour tout entier $n$ :",
    format: "qcm",
    choices: ["$u_n = 5 + 3n$", "$u_n = 3 + 5n$", "$u_n = 5 \\times 3^{n}$", "$u_n = 5 + 3(n - 1)$"],
    expected: ["$u_n = 5 + 3n$"],
    comparator: "mcq_exact",
    hint: "Le terme initial est indexé par $0$, pas par $1$.",
    explanation: exp(
      "Une suite arithmétique de premier terme $u_0$ et de raison $r$ vérifie $u_n = u_0 + nr$.",
      "On applique la formule en surveillant l'indice de départ.",
      "$u_n = 5 + 3n$. La formule $5 + 3(n-1)$ vaudrait $2$ pour $n = 0$ : elle correspond à une suite qui démarre à l'indice $1$.",
      "$u_n = 5 + 3n$."
    ),
    tags: ["terminale-spe", "suites", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_explicite_recurrence",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $(u_n)$ définie sur $\\mathbb{N}$ par $u_n = \\displaystyle\\sum_{k=0}^{n} \\left(\\frac{1}{2}\\right)^{k}$. On peut affirmer que $(u_n)$ est :",
    format: "qcm",
    choices: [
      "croissante et majorée par $2$",
      "décroissante et minorée par $0$",
      "non bornée",
      "constante",
    ],
    expected: ["croissante et majorée par $2$"],
    comparator: "mcq_exact",
    hint: "Somme des termes d'une suite géométrique de raison $\\frac{1}{2}$.",
    explanation: exp(
      "$\\displaystyle\\sum_{k=0}^{n} q^{k} = \\dfrac{1 - q^{n+1}}{1 - q}$ pour $q \\neq 1$.",
      "On calcule la somme sous forme close, puis on lit les propriétés.",
      "$u_n = \\dfrac{1 - \\left(\\frac{1}{2}\\right)^{n+1}}{1 - \\frac{1}{2}} = 2 - \\left(\\frac{1}{2}\\right)^{n}$. On ajoute à chaque étape un terme positif : la suite croît, et elle reste strictement inférieure à $2$.",
      "$(u_n)$ est croissante et majorée par $2$."
    ),
    tags: ["terminale-spe", "suites", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_explicite_recurrence",
    difficulty: 5,
    theme: "neutral",
    text: "Pour tout entier $n \\geq 1$, on pose $s_n = \\displaystyle\\sum_{k=1}^{n} \\frac{1}{k(k+1)}$. Alors :",
    format: "qcm",
    choices: [
      "$s_n = \\dfrac{n}{n+1}$",
      "$s_n = 1 - \\dfrac{1}{n}$",
      "$s_n = \\ln(n+1)$",
      "$s_n = \\dfrac{1}{n+1}$",
    ],
    expected: ["$s_n = \\dfrac{n}{n+1}$"],
    comparator: "mcq_exact",
    hint: "Décompose : $\\dfrac{1}{k(k+1)} = \\dfrac{1}{k} - \\dfrac{1}{k+1}$.",
    explanation: exp(
      "Dans une somme télescopique, les termes intermédiaires se simplifient deux à deux.",
      "On décompose le terme général, puis on écrit la somme.",
      "$s_n = \\displaystyle\\sum_{k=1}^{n}\\left(\\dfrac{1}{k} - \\dfrac{1}{k+1}\\right) = 1 - \\dfrac{1}{n+1} = \\dfrac{n}{n+1}$.",
      "$s_n = \\dfrac{n}{n+1}$."
    ),
    tags: ["terminale-spe", "suites", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_explicite_recurrence",
    difficulty: 5,
    theme: "neutral",
    text: "Pour tout entier $n \\geq 1$, on pose $s_n = \\displaystyle\\sum_{k=1}^{n} \\ln\\left(\\frac{k+1}{k}\\right)$. Alors :",
    format: "qcm",
    choices: ["$s_n = \\ln(n+1)$", "$s_n = \\ln n$", "$s_n = n\\ln 2$", "$s_n = \\dfrac{\\ln n}{\\ln 2}$"],
    expected: ["$s_n = \\ln(n+1)$"],
    comparator: "mcq_exact",
    hint: "$\\ln a - \\ln b = \\ln\\dfrac{a}{b}$ : la somme se télescope.",
    explanation: exp(
      "Le logarithme transforme un produit en somme : $\\displaystyle\\sum \\ln a_k = \\ln\\left(\\prod a_k\\right)$.",
      "On écrit la somme comme le logarithme d'un produit qui se simplifie.",
      "$s_n = \\ln\\left(\\dfrac{2}{1} \\times \\dfrac{3}{2} \\times \\cdots \\times \\dfrac{n+1}{n}\\right) = \\ln(n+1)$ : tous les facteurs intermédiaires se simplifient.",
      "$s_n = \\ln(n+1)$."
    ),
    tags: ["terminale-spe", "suites", "concours-avenir", "qcm"],
  },

  /* =========================================================
     SUITE_VARIATION
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_variation",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $(u_n)$ définie sur $\\mathbb{N}^{*}$ par $u_n = \\dfrac{n+1}{n}$. La suite $(u_n)$ est :",
    format: "qcm",
    choices: [
      "strictement décroissante",
      "strictement croissante",
      "constante",
      "ni croissante ni décroissante",
    ],
    expected: ["strictement décroissante"],
    comparator: "mcq_exact",
    hint: "Écris $u_n$ sous la forme $1 + \\dfrac{1}{n}$.",
    explanation: exp(
      "On étudie le sens de variation en simplifiant l'expression.",
      "On sépare la partie constante de la partie qui varie.",
      "$u_n = \\dfrac{n}{n} + \\dfrac{1}{n} = 1 + \\dfrac{1}{n}$. Comme $\\dfrac{1}{n}$ décroît, $(u_n)$ décroît (de $2$ vers $1$).",
      "$(u_n)$ est strictement décroissante."
    ),
    tags: ["terminale-spe", "suites", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_variation",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $(u_n)$ définie par $u_0 = 1$ et $u_{n+1} = \\dfrac{1}{2}u_n + 3$. On peut affirmer que $(u_n)$ :",
    format: "qcm",
    choices: [
      "converge vers $6$",
      "converge vers $3$",
      "diverge vers $+\\infty$",
      "converge vers $2$",
    ],
    expected: ["converge vers $6$"],
    comparator: "mcq_exact",
    hint: "Si la suite converge vers $L$, alors $L = \\dfrac{1}{2}L + 3$.",
    explanation: exp(
      "Si $u_{n+1} = f(u_n)$ avec $f$ continue et $u_n \\to L$, alors $L = f(L)$.",
      "On résout l'équation du point fixe.",
      "$L = \\dfrac{1}{2}L + 3 \\iff \\dfrac{1}{2}L = 3 \\iff L = 6$. Les premiers termes $1$ ; $3{,}5$ ; $4{,}75$ montent bien vers $6$.",
      "$(u_n)$ converge vers $6$."
    ),
    tags: ["terminale-spe", "suites", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_variation",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $(u_n)$ définie sur $\\mathbb{N}$ par $u_n = (-1)^{n} \\times n$. La suite $(u_n)$ est :",
    format: "qcm",
    choices: [
      "ni monotone ni bornée",
      "strictement croissante",
      "bornée",
      "convergente",
    ],
    expected: ["ni monotone ni bornée"],
    comparator: "mcq_exact",
    hint: "Calcule $u_0$, $u_1$, $u_2$, $u_3$ : le signe alterne et l'amplitude grandit.",
    explanation: exp(
      "Une suite est bornée si tous ses termes restent dans un intervalle fixe.",
      "On calcule les premiers termes.",
      "$u_0 = 0$, $u_1 = -1$, $u_2 = 2$, $u_3 = -3$ : la suite monte et descend alternativement (donc non monotone) et s'éloigne indéfiniment de $0$ (donc non bornée).",
      "$(u_n)$ n'est ni monotone ni bornée."
    ),
    tags: ["terminale-spe", "suites", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_variation",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $(u_n)$ définie sur $\\mathbb{N}$ par $u_n = \\dfrac{n}{n+1}$. La suite $(u_n)$ est :",
    format: "qcm",
    choices: [
      "croissante et majorée par $1$",
      "décroissante et minorée par $0$",
      "croissante et non majorée",
      "constante",
    ],
    expected: ["croissante et majorée par $1$"],
    comparator: "mcq_exact",
    hint: "Écris $u_n = 1 - \\dfrac{1}{n+1}$.",
    explanation: exp(
      "On simplifie l'écriture pour lire à la fois la variation et un majorant.",
      "On isole la partie qui varie.",
      "$u_n = \\dfrac{n+1-1}{n+1} = 1 - \\dfrac{1}{n+1}$. Quand $n$ grandit, $\\dfrac{1}{n+1}$ diminue, donc $u_n$ croît ; et $u_n < 1$ toujours.",
      "$(u_n)$ est croissante et majorée par $1$."
    ),
    tags: ["terminale-spe", "suites", "concours-avenir", "qcm"],
  },

  /* =========================================================
     SUITE_BORNEE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_11",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_bornee",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $(u_n)$ définie sur $\\mathbb{N}$ par $u_n = \\sin(n)$. On peut affirmer que $(u_n)$ est :",
    format: "qcm",
    choices: [
      "bornée mais sans limite",
      "convergente vers $0$",
      "strictement croissante",
      "non bornée",
    ],
    expected: ["bornée mais sans limite"],
    comparator: "mcq_exact",
    hint: "Le sinus reste entre $-1$ et $1$, mais ne se stabilise jamais.",
    explanation: exp(
      "Une suite bornée n'est pas nécessairement convergente.",
      "On encadre la suite, puis on cherche si elle se stabilise.",
      "$-1 \\leq \\sin(n) \\leq 1$ : la suite est bornée. Mais ses termes oscillent sans jamais s'approcher durablement d'une valeur.",
      "$(u_n)$ est bornée mais sans limite."
    ),
    tags: ["terminale-spe", "suites", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_12",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_bornee",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $(u_n)$ définie sur $\\mathbb{N}^{*}$ par $u_n = \\dfrac{\\cos(n\\pi)}{n}$. On peut affirmer que :",
    format: "qcm",
    choices: [
      "$\\displaystyle\\lim_{n \\to +\\infty} u_n = 0$",
      "$(u_n)$ diverge vers $+\\infty$",
      "$\\displaystyle\\lim_{n \\to +\\infty} u_n = 1$",
      "$(u_n)$ est bornée mais sans limite",
    ],
    expected: ["$\\displaystyle\\lim_{n \\to +\\infty} u_n = 0$"],
    comparator: "mcq_exact",
    hint: "$\\cos(n\\pi) = (-1)^{n}$ : le numérateur reste borné, le dénominateur explose.",
    explanation: exp(
      "Théorème d'encadrement : si $|u_n| \\leq v_n$ et $v_n \\to 0$, alors $u_n \\to 0$.",
      "On majore la valeur absolue.",
      "$\\cos(n\\pi) = (-1)^{n}$, donc $|u_n| = \\dfrac{1}{n} \\to 0$. Le signe alterne, mais l'amplitude s'écrase.",
      "La limite vaut $0$."
    ),
    tags: ["terminale-spe", "suites", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_13",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_bornee",
    difficulty: 4,
    theme: "neutral",
    text: "Toute suite convergente est nécessairement :",
    format: "qcm",
    choices: ["bornée", "monotone", "positive", "croissante"],
    expected: ["bornée"],
    comparator: "mcq_exact",
    hint: "À partir d'un certain rang, les termes sont tous proches de la limite.",
    explanation: exp(
      "Toute suite convergente est bornée ; la réciproque est fausse.",
      "On raisonne sur ce qui se passe à partir d'un certain rang.",
      "Au-delà d'un rang, les termes sont dans un intervalle autour de la limite ; avant ce rang, ils sont en nombre fini. La suite $\\left((-1)^n\\right)$ montre que la réciproque est fausse : bornée, mais non convergente.",
      "Une suite convergente est bornée."
    ),
    tags: ["terminale-spe", "suites", "concours-avenir", "qcm"],
  },

  /* =========================================================
     SUITE_RECURRENCE_PREUVE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_14",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_recurrence_preuve",
    difficulty: 3,
    theme: "neutral",
    text: "Pour démontrer par récurrence qu'une propriété $P(n)$ est vraie pour tout entier $n \\geq 0$, il faut établir :",
    format: "qcm",
    choices: [
      "$P(0)$, puis que $P(n)$ entraîne $P(n+1)$",
      "$P(0)$ uniquement",
      "que $P(n)$ entraîne $P(n+1)$ uniquement",
      "$P(0)$, $P(1)$ et $P(2)$",
    ],
    expected: ["$P(0)$, puis que $P(n)$ entraîne $P(n+1)$"],
    comparator: "mcq_exact",
    hint: "Deux étapes : le premier domino, puis la chute en chaîne.",
    explanation: exp(
      "Une récurrence comporte une initialisation et une hérédité.",
      "On vérifie que les deux étapes sont bien présentes.",
      "L'hérédité seule ne suffit pas : sans initialisation, la chaîne ne démarre jamais. Vérifier quelques cas particuliers ne démontre rien pour tout $n$.",
      "Il faut $P(0)$, puis l'implication $P(n) \\Rightarrow P(n+1)$."
    ),
    tags: ["terminale-spe", "suites", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_15",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_recurrence_preuve",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $(u_n)$ définie par $u_0 = 0$ et $u_{n+1} = \\dfrac{2u_n + 3}{u_n + 4}$. On admet que $0 \\leq u_n \\leq 1$ pour tout $n$. On peut affirmer que $(u_n)$ est :",
    format: "qcm",
    choices: [
      "croissante et converge vers $1$",
      "décroissante et converge vers $1$",
      "croissante et diverge vers $+\\infty$",
      "décroissante et converge vers $0$",
    ],
    expected: ["croissante et converge vers $1$"],
    comparator: "mcq_exact",
    hint: "Cherche le point fixe $L = \\dfrac{2L+3}{L+4}$, puis calcule $u_1$.",
    explanation: exp(
      "Si $u_{n+1} = f(u_n)$ avec $f$ continue et $u_n \\to L$, alors $L = f(L)$.",
      "On résout l'équation du point fixe, puis on regarde le sens de variation.",
      "$L(L+4) = 2L + 3 \\iff L^2 + 2L - 3 = 0 \\iff (L-1)(L+3) = 0$. Comme $u_n \\geq 0$, on retient $L = 1$. Et $u_1 = \\dfrac{3}{4} > u_0 = 0$ : la suite monte.",
      "$(u_n)$ est croissante et converge vers $1$."
    ),
    tags: ["terminale-spe", "suites", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_16",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_recurrence_preuve",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $(u_n)$ définie par $u_0 = 1$ et $u_{n+1} = \\dfrac{u_n}{2} + \\dfrac{1}{u_n}$. Si cette suite converge vers un réel strictement positif, sa limite vaut :",
    format: "qcm",
    choices: ["$\\sqrt{2}$", "$0$", "$2$", "$\\dfrac{1}{2}$"],
    expected: ["$\\sqrt{2}$"],
    comparator: "mcq_exact",
    hint: "Résous $L = \\dfrac{L}{2} + \\dfrac{1}{L}$.",
    explanation: exp(
      "Si $u_{n+1} = f(u_n)$ avec $f$ continue et $u_n \\to L$, alors $L = f(L)$.",
      "On résout l'équation du point fixe.",
      "$L = \\dfrac{L}{2} + \\dfrac{1}{L} \\iff \\dfrac{L}{2} = \\dfrac{1}{L} \\iff L^2 = 2$. Comme $L > 0$, on obtient $L = \\sqrt{2}$.",
      "La limite vaut $\\sqrt{2}$."
    ),
    tags: ["terminale-spe", "suites", "concours-avenir", "qcm"],
  },

  /* =========================================================
     SUITE_RECONNAITRE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_17",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    text: "La suite définie par $u_0 = 2$ et $u_{n+1} = 3u_n - 2$ est :",
    format: "qcm",
    choices: [
      "ni arithmétique ni géométrique",
      "géométrique de raison $3$",
      "arithmétique de raison $-2$",
      "géométrique de raison $-2$",
    ],
    expected: ["ni arithmétique ni géométrique"],
    comparator: "mcq_exact",
    hint: "Calcule les premiers termes, puis teste séparément les différences et les quotients.",
    explanation: exp(
      "Arithmétique : la différence $u_{n+1} - u_n$ est constante. Géométrique : le quotient $\\dfrac{u_{n+1}}{u_n}$ est constant.",
      "On calcule quelques termes, puis on teste les deux propriétés.",
      "$u_0 = 2$, $u_1 = 4$, $u_2 = 10$, $u_3 = 28$. Les différences valent $2$, $6$, $18$ : non constantes. Les quotients valent $2$ ; $2{,}5$ ; $2{,}8$ : non constants non plus.",
      "Elle n'est ni arithmétique ni géométrique."
    ),
    tags: ["terminale-spe", "suites", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_18",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "La suite définie sur $\\mathbb{N}$ par $u_n = 5 \\times 2^{n}$ est :",
    format: "qcm",
    choices: [
      "géométrique de raison $2$",
      "géométrique de raison $5$",
      "arithmétique de raison $2$",
      "arithmétique de raison $10$",
    ],
    expected: ["géométrique de raison $2$"],
    comparator: "mcq_exact",
    hint: "Calcule $\\dfrac{u_{n+1}}{u_n}$.",
    explanation: exp(
      "Une suite est géométrique si le quotient $\\dfrac{u_{n+1}}{u_n}$ est constant.",
      "On calcule ce quotient.",
      "$\\dfrac{u_{n+1}}{u_n} = \\dfrac{5 \\times 2^{n+1}}{5 \\times 2^{n}} = 2$. Le $5$ est le premier terme, pas la raison.",
      "La suite est géométrique de raison $2$."
    ),
    tags: ["terminale-spe", "suites", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_19",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $(u_n)$ géométrique de raison $q$ avec $|q| < 1$ et de premier terme non nul. Alors $(u_n)$ :",
    format: "qcm",
    choices: [
      "converge vers $0$",
      "converge vers $u_0$",
      "diverge vers $+\\infty$",
      "n'a pas de limite",
    ],
    expected: ["converge vers $0$"],
    comparator: "mcq_exact",
    hint: "Multiplier sans cesse par un nombre de valeur absolue inférieure à $1$ écrase les termes.",
    explanation: exp(
      "Si $|q| < 1$, alors $q^{n} \\to 0$.",
      "On écrit le terme général sous forme explicite.",
      "$u_n = u_0 q^{n}$ et $q^{n} \\to 0$, donc $u_n \\to 0$, quel que soit $u_0$.",
      "La suite converge vers $0$."
    ),
    tags: ["terminale-spe", "suites", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_20",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "La somme de tous les multiples de $4$ compris entre $4$ et $400$ inclus vaut :",
    format: "qcm",
    choices: ["$20\\,200$", "$40\\,400$", "$10\\,100$", "$80\\,800$"],
    expected: ["$20\\,200$"],
    comparator: "mcq_exact",
    hint: "Ce sont les $4k$ pour $k$ allant de $1$ à $100$ : factorise par $4$.",
    explanation: exp(
      "$\\displaystyle\\sum_{k=1}^{n} k = \\dfrac{n(n+1)}{2}$.",
      "On factorise pour se ramener à la somme des premiers entiers.",
      "La somme vaut $4 \\times (1 + 2 + \\cdots + 100) = 4 \\times \\dfrac{100 \\times 101}{2} = 4 \\times 5\\,050 = 20\\,200$.",
      "La somme vaut $20\\,200$."
    ),
    tags: ["terminale-spe", "suites", "concours-avenir", "qcm"],
  },

  /* =========================================================
     LIMITE_SUITE_CALCULER
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_21",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_calculer",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $(u_n)$ définie sur $\\mathbb{N}$ par $u_n = \\dfrac{n^{3} + 1}{2n^{3} + 5}$. On peut affirmer que :",
    format: "qcm",
    choices: [
      "$\\displaystyle\\lim_{n \\to +\\infty} u_n = \\dfrac{1}{2}$",
      "$\\displaystyle\\lim_{n \\to +\\infty} u_n = 0$",
      "$\\displaystyle\\lim_{n \\to +\\infty} u_n = +\\infty$",
      "$(u_n)$ est bornée par $1$ mais n'a pas de limite",
    ],
    expected: ["$\\displaystyle\\lim_{n \\to +\\infty} u_n = \\dfrac{1}{2}$"],
    comparator: "mcq_exact",
    hint: "Même degré en haut et en bas : la limite est le quotient des coefficients dominants.",
    explanation: exp(
      "Pour un quotient de polynômes, la limite en $+\\infty$ est celle du quotient des termes de plus haut degré.",
      "On compare les degrés du numérateur et du dénominateur.",
      "$\\dfrac{n^3 + 1}{2n^3 + 5} \\sim \\dfrac{n^3}{2n^3} = \\dfrac{1}{2}$.",
      "La limite vaut $\\dfrac{1}{2}$."
    ),
    tags: ["terminale-spe", "limites", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_22",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_calculer",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $(u_n)$ définie sur $\\mathbb{N}$ par $u_n = \\sqrt{n^{2} + 4n} - n$. On peut affirmer que :",
    format: "qcm",
    choices: [
      "$\\displaystyle\\lim_{n \\to +\\infty} u_n = 2$",
      "$\\displaystyle\\lim_{n \\to +\\infty} u_n = 0$",
      "$\\displaystyle\\lim_{n \\to +\\infty} u_n = +\\infty$",
      "$(u_n)$ n'a pas de limite",
    ],
    expected: ["$\\displaystyle\\lim_{n \\to +\\infty} u_n = 2$"],
    comparator: "mcq_exact",
    hint: "Forme « $\\infty - \\infty$ » : multiplie par la quantité conjuguée.",
    explanation: exp(
      "On lève une forme indéterminée « $\\infty - \\infty$ » avec la quantité conjuguée.",
      "On multiplie et divise par $\\sqrt{n^2+4n} + n$.",
      "$u_n = \\dfrac{n^2 + 4n - n^2}{\\sqrt{n^2+4n} + n} = \\dfrac{4n}{\\sqrt{n^2+4n} + n} = \\dfrac{4}{\\sqrt{1 + \\frac{4}{n}} + 1} \\to \\dfrac{4}{2} = 2$.",
      "La limite vaut $2$."
    ),
    tags: ["terminale-spe", "limites", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_23",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_calculer",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $(u_n)$ définie sur $\\mathbb{N}$ par $u_n = \\sqrt{n^{2} + 10n} - n$. On peut affirmer que :",
    format: "qcm",
    choices: [
      "$\\displaystyle\\lim_{n \\to +\\infty} u_n = 5$",
      "$\\displaystyle\\lim_{n \\to +\\infty} u_n = 10$",
      "$\\displaystyle\\lim_{n \\to +\\infty} u_n = 0$",
      "$\\displaystyle\\lim_{n \\to +\\infty} u_n = +\\infty$",
    ],
    expected: ["$\\displaystyle\\lim_{n \\to +\\infty} u_n = 5$"],
    comparator: "mcq_exact",
    hint: "Quantité conjuguée : la limite est la moitié du coefficient de $n$ sous la racine.",
    explanation: exp(
      "On lève une forme indéterminée « $\\infty - \\infty$ » avec la quantité conjuguée.",
      "On multiplie et divise par $\\sqrt{n^2+10n} + n$.",
      "$u_n = \\dfrac{10n}{\\sqrt{n^2+10n} + n} = \\dfrac{10}{\\sqrt{1 + \\frac{10}{n}} + 1} \\to \\dfrac{10}{2} = 5$.",
      "La limite vaut $5$."
    ),
    tags: ["terminale-spe", "limites", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_24",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_calculer",
    difficulty: 4,
    theme: "neutral",
    text: "La limite en $+\\infty$ de $u_n = \\dfrac{2n^{2} - 3}{n + 1}$ vaut :",
    format: "qcm",
    choices: ["$+\\infty$", "$2$", "$0$", "$-\\infty$"],
    expected: ["$+\\infty$"],
    comparator: "mcq_exact",
    hint: "Le degré du numérateur dépasse celui du dénominateur.",
    explanation: exp(
      "Pour un quotient de polynômes, on compare les degrés.",
      "On regarde le quotient des termes dominants.",
      "$\\dfrac{2n^2 - 3}{n+1} \\sim \\dfrac{2n^2}{n} = 2n \\to +\\infty$.",
      "La limite vaut $+\\infty$."
    ),
    tags: ["terminale-spe", "limites", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_25",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_calculer",
    difficulty: 4,
    theme: "neutral",
    text: "La limite en $+\\infty$ de $u_n = \\dfrac{3n + 1}{n^{2} + 2}$ vaut :",
    format: "qcm",
    choices: ["$0$", "$3$", "$\\dfrac{1}{2}$", "$+\\infty$"],
    expected: ["$0$"],
    comparator: "mcq_exact",
    hint: "Le dénominateur croît beaucoup plus vite que le numérateur.",
    explanation: exp(
      "Pour un quotient de polynômes, on compare les degrés.",
      "On regarde le quotient des termes dominants.",
      "$\\dfrac{3n+1}{n^2+2} \\sim \\dfrac{3n}{n^2} = \\dfrac{3}{n} \\to 0$.",
      "La limite vaut $0$."
    ),
    tags: ["terminale-spe", "limites", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_26",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_calculer",
    difficulty: 4,
    theme: "neutral",
    text: "La limite en $+\\infty$ de $u_n = n - \\sqrt{n}$ vaut :",
    format: "qcm",
    choices: ["$+\\infty$", "$0$", "$1$", "$-\\infty$"],
    expected: ["$+\\infty$"],
    comparator: "mcq_exact",
    hint: "Factorise par $\\sqrt{n}$.",
    explanation: exp(
      "Face à « $\\infty - \\infty$ », on factorise par le terme dominant.",
      "On met $\\sqrt{n}$ en facteur.",
      "$n - \\sqrt{n} = \\sqrt{n}\\left(\\sqrt{n} - 1\\right)$ : les deux facteurs tendent vers $+\\infty$.",
      "La limite vaut $+\\infty$."
    ),
    tags: ["terminale-spe", "limites", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_27",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_calculer",
    difficulty: 4,
    theme: "neutral",
    text: "La limite en $+\\infty$ de $u_n = \\dfrac{2^{n}}{3^{n}}$ vaut :",
    format: "qcm",
    choices: ["$0$", "$1$", "$+\\infty$", "$\\dfrac{2}{3}$"],
    expected: ["$0$"],
    comparator: "mcq_exact",
    hint: "Regroupe en une seule puissance : $\\left(\\dfrac{2}{3}\\right)^{n}$.",
    explanation: exp(
      "Si $|q| < 1$, alors $q^{n} \\to 0$.",
      "On regroupe les deux puissances.",
      "$\\dfrac{2^n}{3^n} = \\left(\\dfrac{2}{3}\\right)^{n}$ avec $0 < \\dfrac{2}{3} < 1$. La valeur $\\dfrac{2}{3}$ est la raison, pas la limite.",
      "La limite vaut $0$."
    ),
    tags: ["terminale-spe", "limites", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_28",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_calculer",
    difficulty: 5,
    theme: "neutral",
    text: "La limite en $+\\infty$ de $u_n = \\left(\\dfrac{\\pi}{3}\\right)^{n}$ vaut :",
    format: "qcm",
    choices: ["$+\\infty$", "$0$", "$1$", "$\\dfrac{\\pi}{3}$"],
    expected: ["$+\\infty$"],
    comparator: "mcq_exact",
    hint: "Compare $\\pi$ et $3$ : la raison est-elle plus grande ou plus petite que $1$ ?",
    explanation: exp(
      "Si $q > 1$, alors $q^{n} \\to +\\infty$ ; si $|q| < 1$, alors $q^{n} \\to 0$.",
      "Tout se joue sur la position de la raison par rapport à $1$.",
      "$\\pi \\approx 3{,}14 > 3$, donc $\\dfrac{\\pi}{3} > 1$ : la suite géométrique diverge vers $+\\infty$. C'est le seul point à trancher.",
      "La limite vaut $+\\infty$."
    ),
    tags: ["terminale-spe", "limites", "concours-avenir", "qcm"],
  },

  /* =========================================================
     LIMITE_SUITE_OPERATIONS
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_29",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_operations",
    difficulty: 3,
    theme: "neutral",
    text: "L'écriture « $+\\infty - \\infty$ » désigne :",
    format: "qcm",
    choices: [
      "une forme indéterminée",
      "une limite égale à $0$",
      "une limite égale à $+\\infty$",
      "une situation impossible",
    ],
    expected: ["une forme indéterminée"],
    comparator: "mcq_exact",
    hint: "Compare $n - n$, $n^2 - n$ et $n - n^2$ : trois résultats différents.",
    explanation: exp(
      "Une forme indéterminée est une écriture qui ne permet pas de conclure directement.",
      "On exhibe des exemples menant à des limites différentes.",
      "$n - n \\to 0$, $n^2 - n \\to +\\infty$, $n - n^2 \\to -\\infty$ : chacune est de la forme « $\\infty - \\infty$ », et les résultats diffèrent.",
      "C'est une forme indéterminée."
    ),
    tags: ["terminale-spe", "limites", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_30",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_operations",
    difficulty: 4,
    theme: "neutral",
    text: "Si $u_n \\to 2$ et $v_n \\to +\\infty$, alors $u_n \\times v_n$ tend vers :",
    format: "qcm",
    choices: ["$+\\infty$", "$2$", "$0$", "c'est une forme indéterminée"],
    expected: ["$+\\infty$"],
    comparator: "mcq_exact",
    hint: "La limite du premier facteur n'est pas nulle : il n'y a pas d'indétermination.",
    explanation: exp(
      "Le produit d'une suite de limite finie non nulle par une suite divergeant vers $+\\infty$ diverge.",
      "On vérifie qu'aucune forme indéterminée n'apparaît.",
      "L'indétermination « $0 \\times \\infty$ » ne se présente que si la première limite est nulle. Ici elle vaut $2 > 0$, donc le produit tend vers $+\\infty$.",
      "Le produit tend vers $+\\infty$."
    ),
    tags: ["terminale-spe", "limites", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_31",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_operations",
    difficulty: 4,
    theme: "neutral",
    text: "Si $u_n \\to 0$ et $v_n \\to +\\infty$, alors $u_n \\times v_n$ :",
    format: "qcm",
    choices: [
      "relève d'une forme indéterminée",
      "tend vers $0$",
      "tend vers $+\\infty$",
      "tend vers $1$",
    ],
    expected: ["relève d'une forme indéterminée"],
    comparator: "mcq_exact",
    hint: "Essaie $u_n = \\dfrac{1}{n}$ avec $v_n = n$, puis avec $v_n = n^2$.",
    explanation: exp(
      "« $0 \\times \\infty$ » est une forme indéterminée.",
      "On exhibe des exemples menant à des limites différentes.",
      "Avec $u_n = \\dfrac{1}{n}$ : si $v_n = n$, le produit vaut $1$ ; si $v_n = n^2$, il tend vers $+\\infty$ ; si $v_n = \\sqrt{n}$, il tend vers $0$.",
      "C'est une forme indéterminée."
    ),
    tags: ["terminale-spe", "limites", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_32",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_operations",
    difficulty: 5,
    theme: "neutral",
    text: "La limite en $+\\infty$ de $u_n = \\dfrac{n^{2}}{2^{n}}$ vaut :",
    format: "qcm",
    choices: ["$0$", "$+\\infty$", "$1$", "$\\dfrac{1}{2}$"],
    expected: ["$0$"],
    comparator: "mcq_exact",
    hint: "Croissances comparées : l'exponentielle l'emporte sur toute puissance de $n$.",
    explanation: exp(
      "Croissances comparées : pour $q > 1$, $\\dfrac{n^{k}}{q^{n}} \\to 0$ quel que soit $k$.",
      "On identifie laquelle des deux quantités croît le plus vite.",
      "$2^{n}$ croît plus vite que $n^2$ : le dénominateur écrase le numérateur.",
      "La limite vaut $0$."
    ),
    tags: ["terminale-spe", "limites", "concours-avenir", "qcm"],
  },

  /* =========================================================
     LIMITE_SUITE_COMPARAISON
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_33",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_comparaison",
    difficulty: 4,
    theme: "neutral",
    text: "Si $u_n \\geq n^{2}$ pour tout entier $n$, alors $(u_n)$ :",
    format: "qcm",
    choices: [
      "diverge vers $+\\infty$",
      "converge vers $0$",
      "n'a pas de limite",
      "est bornée",
    ],
    expected: ["diverge vers $+\\infty$"],
    comparator: "mcq_exact",
    hint: "Théorème de comparaison : si l'on est au-dessus d'une suite qui explose, on explose aussi.",
    explanation: exp(
      "Théorème de comparaison : si $u_n \\geq v_n$ et $v_n \\to +\\infty$, alors $u_n \\to +\\infty$.",
      "On applique le théorème avec la minoration donnée.",
      "$n^2 \\to +\\infty$, donc $(u_n)$, qui lui est supérieure, tend aussi vers $+\\infty$.",
      "$(u_n)$ diverge vers $+\\infty$."
    ),
    tags: ["terminale-spe", "limites", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_34",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_comparaison",
    difficulty: 4,
    theme: "neutral",
    text: "Si $|u_n| \\leq \\dfrac{1}{n}$ pour tout entier $n \\geq 1$, alors $(u_n)$ :",
    format: "qcm",
    choices: ["converge vers $0$", "converge vers $1$", "diverge vers $+\\infty$", "n'a pas de limite"],
    expected: ["converge vers $0$"],
    comparator: "mcq_exact",
    hint: "Théorème des gendarmes appliqué à $-\\dfrac{1}{n} \\leq u_n \\leq \\dfrac{1}{n}$.",
    explanation: exp(
      "Théorème d'encadrement : si $|u_n| \\leq v_n$ et $v_n \\to 0$, alors $u_n \\to 0$.",
      "On traduit la valeur absolue en un encadrement.",
      "$-\\dfrac{1}{n} \\leq u_n \\leq \\dfrac{1}{n}$, et les deux bornes tendent vers $0$.",
      "$(u_n)$ converge vers $0$."
    ),
    tags: ["terminale-spe", "limites", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_35",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_comparaison",
    difficulty: 4,
    theme: "neutral",
    text: "Si $u_n \\leq v_n$ pour tout entier $n$ et si $v_n \\to -\\infty$, alors $(u_n)$ :",
    format: "qcm",
    choices: [
      "diverge vers $-\\infty$",
      "diverge vers $+\\infty$",
      "converge vers $0$",
      "peut avoir n'importe quel comportement",
    ],
    expected: ["diverge vers $-\\infty$"],
    comparator: "mcq_exact",
    hint: "Être en dessous d'une suite qui plonge vers $-\\infty$ ne laisse aucune échappatoire.",
    explanation: exp(
      "Théorème de comparaison : si $u_n \\leq v_n$ et $v_n \\to -\\infty$, alors $u_n \\to -\\infty$.",
      "On applique le théorème avec la majoration donnée.",
      "$(u_n)$ reste sous une suite qui descend indéfiniment : elle descend aussi.",
      "$(u_n)$ diverge vers $-\\infty$."
    ),
    tags: ["terminale-spe", "limites", "concours-avenir", "qcm"],
  },

  /* =========================================================
     LIMITE_SUITE_MONOTONE_BORNEE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_36",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_monotone_bornee",
    difficulty: 4,
    theme: "neutral",
    text: "D'après le théorème de convergence monotone, toute suite croissante et majorée :",
    format: "qcm",
    choices: [
      "converge",
      "diverge vers $+\\infty$",
      "est constante",
      "converge vers n'importe lequel de ses majorants",
    ],
    expected: ["converge"],
    comparator: "mcq_exact",
    hint: "Le théorème garantit l'existence de la limite, sans la donner.",
    explanation: exp(
      "Théorème de convergence monotone : une suite croissante et majorée converge.",
      "On distingue l'existence de la limite et sa valeur.",
      "Le théorème affirme la convergence mais ne fournit pas la limite : elle n'est pas égale à un majorant quelconque. La suite $\\left(1 - \\frac{1}{n}\\right)$ est majorée par $10$ mais converge vers $1$.",
      "Une telle suite converge."
    ),
    tags: ["terminale-spe", "limites", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_37",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_monotone_bornee",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $(u_n)$ décroissante et minorée par $0$. On peut affirmer que $(u_n)$ :",
    format: "qcm",
    choices: [
      "converge vers une limite positive ou nulle",
      "converge nécessairement vers $0$",
      "diverge vers $-\\infty$",
      "n'a pas de limite",
    ],
    expected: ["converge vers une limite positive ou nulle"],
    comparator: "mcq_exact",
    hint: "La suite constante égale à $1$ est décroissante au sens large et minorée par $0$.",
    explanation: exp(
      "Une suite décroissante et minorée converge, et sa limite respecte le minorant.",
      "On applique le théorème, puis on teste si la limite doit valoir $0$.",
      "La limite $L$ vérifie $L \\geq 0$, mais rien n'impose $L = 0$ : la suite $\\left(1 + \\frac{1}{n}\\right)$ décroît, est minorée par $0$, et converge vers $1$.",
      "Elle converge vers une limite positive ou nulle."
    ),
    tags: ["terminale-spe", "limites", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_38",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_monotone_bornee",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $(u_n)$ croissante telle que $u_n \\leq 5$ pour tout entier $n$. Sa limite $L$ vérifie :",
    format: "qcm",
    choices: ["$L \\leq 5$", "$L = 5$", "$L \\geq 5$", "$L < 5$"],
    expected: ["$L \\leq 5$"],
    comparator: "mcq_exact",
    hint: "Le passage à la limite conserve les inégalités au sens large — mais seulement au sens large.",
    explanation: exp(
      "Le passage à la limite conserve les inégalités au sens large.",
      "On applique le théorème de convergence monotone, puis on compare aux propositions.",
      "La suite est croissante et majorée : elle converge, et $u_n \\leq 5$ donne $L \\leq 5$. On ne peut pas affirmer $L = 5$ : la suite constante égale à $0$ convient et donne $L = 0$. On ne peut pas non plus affirmer $L < 5$ : la suite constante égale à $5$ donne $L = 5$.",
      "On a seulement $L \\leq 5$."
    ),
    tags: ["terminale-spe", "limites", "concours-avenir", "qcm"],
  },

  /* =========================================================
     LIMITE_SUITE_INTERPRETER
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_39",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "Dire que $(u_n)$ converge vers $3$ signifie que :",
    format: "qcm",
    choices: [
      "tout intervalle ouvert contenant $3$ contient tous les termes à partir d'un certain rang",
      "$u_n = 3$ à partir d'un certain rang",
      "$u_n < 3$ pour tout entier $n$",
      "la suite est croissante et atteint $3$",
    ],
    expected: [
      "tout intervalle ouvert contenant $3$ contient tous les termes à partir d'un certain rang",
    ],
    comparator: "mcq_exact",
    hint: "Converger, c'est s'approcher aussi près qu'on veut — pas forcément atteindre.",
    explanation: exp(
      "Définition de la convergence : tout intervalle ouvert autour de la limite contient tous les termes à partir d'un certain rang.",
      "On distingue « s'approcher » et « atteindre ».",
      "La suite $\\left(3 + \\frac{1}{n}\\right)$ converge vers $3$ sans jamais valoir $3$, et sans être toujours inférieure à $3$.",
      "C'est la première proposition."
    ),
    tags: ["terminale-spe", "limites", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_40",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "limite_suite",
    microId: "limite_suite_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "Une suite non bornée :",
    format: "qcm",
    choices: [
      "ne peut pas converger",
      "diverge nécessairement vers $+\\infty$",
      "est nécessairement croissante",
      "converge toujours",
    ],
    expected: ["ne peut pas converger"],
    comparator: "mcq_exact",
    hint: "C'est la contraposée de « toute suite convergente est bornée ».",
    explanation: exp(
      "Toute suite convergente est bornée : par contraposée, une suite non bornée ne converge pas.",
      "On applique la contraposée, puis on teste les autres propositions.",
      "La suite $\\left((-1)^n n\\right)$ n'est pas bornée et ne tend pas vers $+\\infty$ : elle oscille. Elle n'est pas non plus croissante.",
      "Une suite non bornée ne peut pas converger."
    ),
    tags: ["terminale-spe", "limites", "concours-avenir", "qcm"],
  },

  /* =========================================================
     ALGORITHMIQUE_PYTHON
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_41",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_lire_algorithme",
    difficulty: 5,
    theme: "neutral",
    text: "On considère la fonction Python suivante : `def mystere(N): u = 2 ; for k in range(1, N+1): u = 3*u - 1 ; return u`. La valeur renvoyée par `mystere(3)` est :",
    format: "qcm",
    choices: ["$41$", "$20$", "$17$", "$53$"],
    expected: ["$41$"],
    comparator: "mcq_exact",
    hint: "Déroule les trois tours de boucle en notant la valeur de $u$ à chaque étape.",
    explanation: exp(
      "Pour lire un algorithme, on déroule la boucle à la main.",
      "On note la valeur de $u$ après chaque itération.",
      "Départ $u = 2$. Tour 1 : $3 \\times 2 - 1 = 5$. Tour 2 : $3 \\times 5 - 1 = 14$. Tour 3 : $3 \\times 14 - 1 = 41$.",
      "La fonction renvoie $41$."
    ),
    tags: ["terminale-spe", "python", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_42",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_lire_algorithme",
    difficulty: 4,
    theme: "neutral",
    text: "On considère : `from math import factorial` puis `def C(n, k): return factorial(n)//(factorial(k)*factorial(n-k))`. La valeur renvoyée par `C(10, 3)` est :",
    format: "qcm",
    choices: ["$120$", "$210$", "$720$", "$45$"],
    expected: ["$120$"],
    comparator: "mcq_exact",
    hint: "Cette fonction calcule $\\binom{10}{3}$.",
    explanation: exp(
      "$\\dbinom{n}{k} = \\dfrac{n!}{k!\\,(n-k)!}$.",
      "On reconnaît le coefficient binomial, puis on simplifie.",
      "$\\dbinom{10}{3} = \\dfrac{10 \\times 9 \\times 8}{3 \\times 2 \\times 1} = \\dfrac{720}{6} = 120$. La valeur $720$ est le numérateur non simplifié, $45$ correspond à $\\dbinom{10}{2}$.",
      "La fonction renvoie $120$."
    ),
    tags: ["terminale-spe", "python", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_43",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_variable_boucle",
    difficulty: 3,
    theme: "neutral",
    text: "En Python, l'instruction `range(1, 5)` parcourt les entiers :",
    format: "qcm",
    choices: ["$1, 2, 3, 4$", "$1, 2, 3, 4, 5$", "$0, 1, 2, 3, 4$", "$1$ et $5$ seulement"],
    expected: ["$1, 2, 3, 4$"],
    comparator: "mcq_exact",
    hint: "La borne de gauche est incluse, celle de droite est exclue.",
    explanation: exp(
      "`range(a, b)` parcourt les entiers de $a$ inclus à $b$ exclu.",
      "On applique la convention Python.",
      "`range(1, 5)` donne $1, 2, 3, 4$ : le $5$ n'est pas atteint. C'est une source d'erreur classique dans les boucles de seuil.",
      "Les entiers parcourus sont $1, 2, 3, 4$."
    ),
    tags: ["terminale-spe", "python", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_44",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_variable_boucle",
    difficulty: 4,
    theme: "neutral",
    text: "Combien d'entiers l'instruction `range(0, 10, 2)` parcourt-elle ?",
    format: "qcm",
    choices: ["$5$", "$10$", "$4$", "$6$"],
    expected: ["$5$"],
    comparator: "mcq_exact",
    hint: "Le troisième argument est le pas : écris la liste en entier.",
    explanation: exp(
      "`range(a, b, p)` parcourt $a$, $a+p$, $a+2p$… tant que l'on reste strictement inférieur à $b$.",
      "On énumère les valeurs.",
      "$0, 2, 4, 6, 8$ : cela fait $5$ entiers. Le $10$ est exclu.",
      "L'instruction parcourt $5$ entiers."
    ),
    tags: ["terminale-spe", "python", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_45",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_variable_boucle",
    difficulty: 3,
    theme: "neutral",
    text: "Après l'exécution de `s = 0` puis `for k in range(1, 4): s = s + k`, la variable `s` vaut :",
    format: "qcm",
    choices: ["$6$", "$10$", "$3$", "$4$"],
    expected: ["$6$"],
    comparator: "mcq_exact",
    hint: "La boucle porte sur $k = 1$, $2$, $3$.",
    explanation: exp(
      "`range(1, 4)` parcourt $1$, $2$, $3$.",
      "On accumule les valeurs successives.",
      "$s = 1 + 2 + 3 = 6$. Répondre $10$ reviendrait à inclure $k = 4$, exclu par `range`.",
      "`s` vaut $6$."
    ),
    tags: ["terminale-spe", "python", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_46",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_suite",
    difficulty: 3,
    theme: "neutral",
    text: "Après l'exécution de `u = 1` puis `for k in range(3): u = 2*u`, la variable `u` vaut :",
    format: "qcm",
    choices: ["$8$", "$6$", "$16$", "$2$"],
    expected: ["$8$"],
    comparator: "mcq_exact",
    hint: "`range(3)` fait exactement trois tours.",
    explanation: exp(
      "`range(3)` parcourt $0$, $1$, $2$ : trois itérations.",
      "On déroule la boucle.",
      "$u$ est doublée trois fois : $1 \\to 2 \\to 4 \\to 8$. Répondre $16$ reviendrait à faire quatre tours.",
      "`u` vaut $8$."
    ),
    tags: ["terminale-spe", "python", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_47",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_seuil",
    difficulty: 5,
    theme: "neutral",
    text: "On considère : `n = 0` ; `u = 100` ; `while u >= 1: u = 0.8*u ; n = n + 1` ; `return n`. Ce programme renvoie :",
    format: "qcm",
    choices: [
      "le plus petit rang $n$ tel que $u_n < 1$",
      "la valeur finale de $u$",
      "le plus grand rang $n$ tel que $u_n \\geq 1$",
      "le nombre $100$",
    ],
    expected: ["le plus petit rang $n$ tel que $u_n < 1$"],
    comparator: "mcq_exact",
    hint: "La boucle s'arrête dès que la condition devient fausse : à ce moment, combien de tours ont été comptés ?",
    explanation: exp(
      "Une boucle `while` s'arrête dès que sa condition n'est plus vérifiée.",
      "On regarde ce que valent $u$ et $n$ à la sortie de la boucle.",
      "À la sortie, $u < 1$ et $n$ compte le nombre de multiplications effectuées : c'est le premier rang pour lequel le seuil est franchi. Le plus grand rang tel que $u_n \\geq 1$ vaudrait $n - 1$.",
      "Le programme renvoie le plus petit rang $n$ tel que $u_n < 1$."
    ),
    tags: ["terminale-spe", "python", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_48",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_seuil",
    difficulty: 4,
    theme: "neutral",
    text: "Dans une recherche de seuil écrite `while u > 0.001: u = 0.5*u ; n = n + 1`, la variable `n` représente :",
    format: "qcm",
    choices: [
      "le nombre d'étapes nécessaires pour passer sous le seuil",
      "la valeur du seuil",
      "la valeur courante de la suite",
      "la raison de la suite",
    ],
    expected: ["le nombre d'étapes nécessaires pour passer sous le seuil"],
    comparator: "mcq_exact",
    hint: "`n` est incrémentée une fois par tour de boucle.",
    explanation: exp(
      "Dans une boucle de seuil, un compteur incrémenté à chaque tour mesure le nombre d'itérations.",
      "On identifie le rôle de chaque variable.",
      "`u` porte la valeur de la suite, `0.001` est le seuil, `0.5` la raison ; `n` ne fait que compter les tours.",
      "`n` est le nombre d'étapes nécessaires pour passer sous le seuil."
    ),
    tags: ["terminale-spe", "python", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_49",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_lire_algorithme",
    difficulty: 3,
    theme: "neutral",
    text: "En Python, `7 // 2` vaut :",
    format: "qcm",
    choices: ["$3$", "$3{,}5$", "$4$", "$1$"],
    expected: ["$3$"],
    comparator: "mcq_exact",
    hint: "Le double slash est la division entière, pas la division décimale.",
    explanation: exp(
      "`//` est le quotient de la division euclidienne ; `/` donne le résultat décimal.",
      "On effectue la division euclidienne.",
      "$7 = 2 \\times 3 + 1$, donc `7 // 2` vaut $3$ (et `7 / 2` vaudrait $3{,}5$, tandis que `7 % 2` vaudrait $1$).",
      "`7 // 2` vaut $3$."
    ),
    tags: ["terminale-spe", "python", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_50",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_lire_algorithme",
    difficulty: 3,
    theme: "neutral",
    text: "En Python, `7 % 3` vaut :",
    format: "qcm",
    choices: ["$1$", "$2$", "$3$", "$2{,}33$"],
    expected: ["$1$"],
    comparator: "mcq_exact",
    hint: "Le symbole `%` donne le reste de la division euclidienne.",
    explanation: exp(
      "`%` est le reste de la division euclidienne.",
      "On pose la division euclidienne.",
      "$7 = 3 \\times 2 + 1$ : le quotient est $2$ et le reste est $1$. C'est le reste que `%` renvoie.",
      "`7 % 3` vaut $1$."
    ),
    tags: ["terminale-spe", "python", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_51",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_lire_algorithme",
    difficulty: 3,
    theme: "neutral",
    text: "On pose `liste = [3, 1, 4]`. En Python, `liste[1]` vaut :",
    format: "qcm",
    choices: ["$1$", "$3$", "$4$", "cela provoque une erreur"],
    expected: ["$1$"],
    comparator: "mcq_exact",
    hint: "L'indexation commence à $0$.",
    explanation: exp(
      "En Python, le premier élément d'une liste porte l'indice $0$.",
      "On numérote les éléments à partir de $0$.",
      "`liste[0]` vaut $3$, `liste[1]` vaut $1$, `liste[2]` vaut $4$.",
      "`liste[1]` vaut $1$."
    ),
    tags: ["terminale-spe", "python", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_sui_concours_52",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "algorithmique_python",
    microId: "python_simulation_proba",
    difficulty: 4,
    theme: "neutral",
    text: "La fonction `random()` renvoie un nombre réel choisi au hasard dans $[0\\,;\\,1[$. L'instruction `if random() < 0.3:` simule un événement de probabilité :",
    format: "qcm",
    choices: ["$0{,}3$", "$0{,}7$", "$0{,}5$", "$3$"],
    expected: ["$0{,}3$"],
    comparator: "mcq_exact",
    hint: "La probabilité de tomber dans $[0\\,;\\,0{,}3[$ est la longueur de cet intervalle.",
    explanation: exp(
      "Pour un tirage uniforme sur $[0\\,;\\,1[$, la probabilité d'un intervalle est sa longueur.",
      "On mesure l'intervalle correspondant à la condition.",
      "La condition est vérifiée lorsque le tirage tombe dans $[0\\,;\\,0{,}3[$, de longueur $0{,}3$. La valeur $0{,}7$ correspondrait à l'événement contraire.",
      "L'événement simulé a pour probabilité $0{,}3$."
    ),
    tags: ["terminale-spe", "python", "concours-avenir", "qcm"],
  },
];
