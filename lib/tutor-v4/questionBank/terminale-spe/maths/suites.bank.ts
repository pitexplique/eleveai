// lib/tutor-v4/question-banks/maths/terminale-spe/suites.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
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
  /* =========================
     SUITE_RECONNAITRE
  ========================= */

  {
    kind: "fixed",
    id: "terminale_spe_suite_reconnaitre_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "La suite définie par uₙ = 4n + 1 est-elle définie explicitement ou par récurrence ?",
    format: "qcm",
    choices: ["explicitement", "par récurrence"],
    expected: ["explicitement"],
    comparator: "mcq_exact",
    hint: "Une formule explicite donne directement uₙ en fonction de n.",
    explanation: exp(
      "Une suite peut être définie par une formule explicite ou par une relation de récurrence.",
      "On regarde si la formule donne directement uₙ ou si elle utilise un terme précédent.",
      "Ici, uₙ = 4n + 1 dépend directement de n.",
      "La suite est définie explicitement."
    ),
    tags: ["terminale-spe", "suite", "explicite", "diagnostic", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_suite_reconnaitre_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "La suite définie par u₀ = 5 et uₙ₊₁ = 2uₙ - 3 est-elle définie explicitement ou par récurrence ?",
    format: "qcm",
    choices: ["explicitement", "par récurrence"],
    expected: ["par récurrence"],
    comparator: "mcq_exact",
    hint: "Une relation de récurrence utilise le terme précédent.",
    explanation: exp(
      "Une suite récurrente est définie à partir d’un premier terme et d’une relation entre deux termes consécutifs.",
      "On repère si uₙ₊₁ dépend de uₙ.",
      "Ici, uₙ₊₁ = 2uₙ - 3 dépend de uₙ.",
      "La suite est définie par récurrence."
    ),
    tags: ["terminale-spe", "suite", "recurrence", "diagnostic", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_suite_reconnaitre_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Une suite vérifie uₙ₊₁ = uₙ + 7. Quel type de suite reconnaît-on ?",
    format: "qcm",
    choices: ["arithmétique", "géométrique", "constante", "factorielle"],
    expected: ["arithmétique"],
    comparator: "mcq_exact",
    hint: "Une suite arithmétique ajoute toujours le même nombre.",
    explanation: exp(
      "Une suite arithmétique vérifie uₙ₊₁ = uₙ + r, où r est la raison.",
      "On regarde si on ajoute toujours la même quantité.",
      "Ici, uₙ₊₁ = uₙ + 7. On ajoute toujours 7.",
      "La suite est arithmétique de raison 7."
    ),
    tags: ["terminale-spe", "suite", "arithmetique", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_suite_reconnaitre_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Une suite vérifie uₙ₊₁ = 0,8uₙ. Quel type de suite reconnaît-on ?",
    format: "qcm",
    choices: ["arithmétique", "géométrique", "affine", "quadratique"],
    expected: ["géométrique"],
    comparator: "mcq_exact",
    hint: "Une suite géométrique multiplie toujours par le même nombre.",
    explanation: exp(
      "Une suite géométrique vérifie uₙ₊₁ = q × uₙ, où q est la raison.",
      "On regarde si on multiplie toujours par le même nombre.",
      "Ici, uₙ₊₁ = 0,8uₙ. On multiplie toujours par 0,8.",
      "La suite est géométrique de raison 0,8."
    ),
    tags: ["terminale-spe", "suite", "geometrique", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_suite_reconnaitre_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Observe si on ajoute ou si on multiplie par une constante.",
    tags: ["terminale-spe", "suite", "reconnaitre", "template"],
    generate: () => {
      const r = randomChoice([2, 3, 4, 5, 6, 10]);
      const type = randomChoice(["arithmetique", "geometrique"] as const);

      if (type === "arithmetique") {
        return {
          text: `Une suite vérifie uₙ₊₁ = uₙ + ${r}. Quel type de suite reconnaît-on ?`,
          format: "qcm",
          choices: shuffle(["arithmétique", "géométrique", "constante", "exponentielle"]),
          expected: ["arithmétique"],
          comparator: "mcq_exact",
          explanation: exp(
            "Une suite arithmétique ajoute toujours la même raison.",
            "On compare uₙ₊₁ et uₙ.",
            `Ici, on ajoute toujours ${r}.`,
            `La suite est arithmétique de raison ${r}.`
          ),
        };
      }

      return {
        text: `Une suite vérifie uₙ₊₁ = ${r}uₙ. Quel type de suite reconnaît-on ?`,
        format: "qcm",
        choices: shuffle(["arithmétique", "géométrique", "constante", "affine"]),
        expected: ["géométrique"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une suite géométrique multiplie toujours par la même raison.",
          "On compare uₙ₊₁ et uₙ.",
          `Ici, on multiplie toujours par ${r}.`,
          `La suite est géométrique de raison ${r}.`
        ),
      };
    },
  },

  /* =========================
     SUITE_CALCULER_TERMES
  ========================= */

  {
    kind: "fixed",
    id: "terminale_spe_suite_calculer_termes_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_calculer_termes",
    difficulty: 1,
    theme: "neutral",
    text: "Soit uₙ = 3n + 2. Calculer u₄.",
    format: "short",
    expected: ["14"],
    comparator: "number_equal",
    hint: "Remplace n par 4.",
    explanation: exp(
      "Pour calculer un terme d’une suite explicite, on remplace n par le rang demandé.",
      "On utilise directement la formule de uₙ.",
      "u₄ = 3 × 4 + 2 = 12 + 2 = 14.",
      "Donc u₄ = 14."
    ),
    tags: ["terminale-spe", "suite", "calcul", "explicite"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_suite_calculer_termes_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_calculer_termes",
    difficulty: 2,
    theme: "neutral",
    text: "Soit u₀ = 2 et uₙ₊₁ = 3uₙ + 1. Calculer u₁.",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Pour calculer u₁, utilise u₀.",
    explanation: exp(
      "Pour une suite récurrente, on calcule chaque terme à partir du terme précédent.",
      "On remplace u₀ par sa valeur dans la relation de récurrence.",
      "u₁ = 3u₀ + 1 = 3 × 2 + 1 = 7.",
      "Donc u₁ = 7."
    ),
    tags: ["terminale-spe", "suite", "calcul", "recurrence"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_suite_calculer_termes_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_calculer_termes",
    difficulty: 2,
    theme: "neutral",
    text: "Soit u₀ = 2 et uₙ₊₁ = 3uₙ + 1. Calculer u₂.",
    format: "short",
    expected: ["22"],
    comparator: "number_equal",
    hint: "Calcule d’abord u₁, puis u₂.",
    explanation: exp(
      "Une suite récurrente se calcule terme après terme.",
      "On calcule d’abord u₁, puis on réutilise le résultat pour calculer u₂.",
      "u₁ = 3 × 2 + 1 = 7. Puis u₂ = 3 × 7 + 1 = 22.",
      "Donc u₂ = 22."
    ),
    tags: ["terminale-spe", "suite", "calcul", "recurrence"],
  },

  {
    kind: "template",
    id: "terminale_spe_suite_calculer_termes_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_calculer_termes",
    difficulty: 1,
    theme: "neutral",
    hint: "Remplace n par le rang demandé.",
    tags: ["terminale-spe", "suite", "calcul", "explicite", "template"],
    generate: () => {
      const a = randomInt(2, 8);
      const b = randomInt(1, 10);
      const n = randomInt(2, 9);
      const result = a * n + b;

      return {
        text: `Soit uₙ = ${a}n + ${b}. Calculer u_${n}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Pour calculer un terme d’une suite explicite, on remplace n par le rang demandé.",
          `On remplace n par ${n}.`,
          `u_${n} = ${a} × ${n} + ${b} = ${result}.`,
          `Donc u_${n} = ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "terminale_spe_suite_calculer_termes_tpl_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_calculer_termes",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule u₁ à partir de u₀.",
    tags: ["terminale-spe", "suite", "calcul", "recurrence", "template"],
    generate: () => {
      const u0 = randomInt(1, 6);
      const a = randomInt(2, 5);
      const b = randomInt(1, 8);
      const u1 = a * u0 + b;

      return {
        text: `Soit u₀ = ${u0} et uₙ₊₁ = ${a}uₙ + ${b}. Calculer u₁.`,
        format: "short",
        expected: [String(u1)],
        comparator: "number_equal",
        explanation: exp(
          "Pour une suite récurrente, chaque terme se calcule à partir du précédent.",
          "On utilise la relation de récurrence avec u₀.",
          `u₁ = ${a} × ${u0} + ${b} = ${u1}.`,
          `Donc u₁ = ${u1}.`
        ),
      };
    },
  },

  /* =========================
     SUITE_EXPLICITE_RECURRENCE
  ========================= */

  {
    kind: "fixed",
    id: "terminale_spe_suite_explicite_recurrence_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_explicite_recurrence",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle formule permet de calculer directement u₁₀ sans calculer u₀, u₁, ..., u₉ ?",
    format: "qcm",
    choices: [
      "uₙ = 5n - 2",
      "u₀ = 1 et uₙ₊₁ = uₙ + 3",
      "u₀ = 4 et uₙ₊₁ = 2uₙ",
      "u₀ = 7",
    ],
    expected: ["uₙ = 5n - 2"],
    comparator: "mcq_exact",
    hint: "Une formule explicite donne uₙ directement.",
    explanation: exp(
      "Une formule explicite donne directement uₙ en fonction de n.",
      "On cherche la formule qui contient n et qui ne dépend pas du terme précédent.",
      "uₙ = 5n - 2 permet de calculer directement u₁₀.",
      "C’est la formule explicite."
    ),
    tags: ["terminale-spe", "suite", "explicite", "recurrence", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_suite_explicite_recurrence_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_explicite_recurrence",
    difficulty: 2,
    theme: "neutral",
    text: "Une suite est définie par u₀ = 4 et uₙ₊₁ = uₙ + 6. Pour calculer u₅, faut-il passer par les termes précédents ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "La formule donne uₙ₊₁ en fonction de uₙ.",
    explanation: exp(
      "Une relation de récurrence permet de calculer un terme à partir du précédent.",
      "On regarde si la formule donne directement u₅ ou s’il faut calculer les étapes.",
      "Ici, uₙ₊₁ dépend de uₙ. Il faut donc calculer u₁, u₂, u₃ et u₄ avant u₅.",
      "Oui, il faut passer par les termes précédents."
    ),
    tags: ["terminale-spe", "suite", "recurrence", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_suite_explicite_recurrence_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_explicite_recurrence",
    difficulty: 3,
    theme: "neutral",
    text: "Une suite arithmétique vérifie u₀ = 3 et uₙ₊₁ = uₙ + 5. Quelle est son expression explicite ?",
    format: "qcm",
    choices: ["uₙ = 3 + 5n", "uₙ = 5 + 3n", "uₙ = 3 × 5ⁿ", "uₙ = 5ⁿ + 3"],
    expected: ["uₙ = 3 + 5n"],
    comparator: "mcq_exact",
    hint: "Pour une suite arithmétique, uₙ = u₀ + nr.",
    explanation: exp(
      "Une suite arithmétique vérifie uₙ = u₀ + nr.",
      "On identifie le premier terme u₀ et la raison r.",
      "Ici, u₀ = 3 et r = 5, donc uₙ = 3 + 5n.",
      "L’expression explicite est uₙ = 3 + 5n."
    ),
    tags: ["terminale-spe", "suite", "arithmetique", "explicite", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_suite_explicite_recurrence_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_explicite_recurrence",
    difficulty: 3,
    theme: "neutral",
    text: "Une suite géométrique vérifie u₀ = 2 et uₙ₊₁ = 3uₙ. Quelle est son expression explicite ?",
    format: "qcm",
    choices: ["uₙ = 2 × 3ⁿ", "uₙ = 3 × 2ⁿ", "uₙ = 2 + 3n", "uₙ = 3 + 2n"],
    expected: ["uₙ = 2 × 3ⁿ"],
    comparator: "mcq_exact",
    hint: "Pour une suite géométrique, uₙ = u₀ × qⁿ.",
    explanation: exp(
      "Une suite géométrique vérifie uₙ = u₀ × qⁿ.",
      "On identifie le premier terme u₀ et la raison q.",
      "Ici, u₀ = 2 et q = 3, donc uₙ = 2 × 3ⁿ.",
      "L’expression explicite est uₙ = 2 × 3ⁿ."
    ),
    tags: ["terminale-spe", "suite", "geometrique", "explicite", "qcm"],
  },

  /* =========================
     SUITE_RECURRENCE_PREUVE
  ========================= */

  {
    kind: "fixed",
    id: "terminale_spe_suite_recurrence_preuve_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_recurrence_preuve",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une démonstration par récurrence, quelle est la première étape ?",
    format: "qcm",
    choices: [
      "Initialisation",
      "Hérédité",
      "Conclusion",
      "Tableau de variations",
    ],
    expected: ["Initialisation"],
    comparator: "mcq_exact",
    hint: "On vérifie d’abord que la propriété est vraie au premier rang.",
    explanation: exp(
      "La récurrence permet de démontrer qu’une propriété est vraie pour tous les entiers à partir d’un certain rang.",
      "On suit trois étapes : initialisation, hérédité, conclusion.",
      "La première étape consiste à vérifier la propriété au rang de départ.",
      "La première étape est l’initialisation."
    ),
    tags: ["terminale-spe", "suite", "recurrence", "preuve", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_suite_recurrence_preuve_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_recurrence_preuve",
    difficulty: 3,
    theme: "neutral",
    text: "On veut démontrer par récurrence que uₙ ≥ 0 pour tout n. Que doit-on faire dans l’étape d’hérédité ?",
    format: "qcm",
    choices: [
      "Supposer uₙ ≥ 0 et montrer uₙ₊₁ ≥ 0",
      "Montrer seulement que u₀ ≥ 0",
      "Calculer une limite",
      "Remplacer n par 100",
    ],
    expected: ["Supposer uₙ ≥ 0 et montrer uₙ₊₁ ≥ 0"],
    comparator: "mcq_exact",
    hint: "L’hérédité fait passer du rang n au rang n + 1.",
    explanation: exp(
      "L’hérédité prouve que si la propriété est vraie à un rang n, alors elle est vraie au rang suivant.",
      "On suppose la propriété vraie au rang n, puis on démontre la propriété au rang n + 1.",
      "Ici, on suppose uₙ ≥ 0 et on cherche à montrer uₙ₊₁ ≥ 0.",
      "C’est exactement l’étape d’hérédité."
    ),
    tags: ["terminale-spe", "suite", "recurrence", "preuve", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_suite_recurrence_preuve_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_recurrence_preuve",
    difficulty: 4,
    theme: "neutral",
    text: "On définit u₀ = 2 et uₙ₊₁ = 0,5uₙ + 1. On veut montrer que uₙ ≤ 2 pour tout n. Quelle hypothèse de récurrence est correcte ?",
    format: "qcm",
    choices: [
      "On suppose que uₙ ≤ 2",
      "On suppose que uₙ₊₁ ≤ 2",
      "On suppose que u₀ ≤ 2",
      "On suppose que la suite est croissante",
    ],
    expected: ["On suppose que uₙ ≤ 2"],
    comparator: "mcq_exact",
    hint: "Dans l’hérédité, on suppose la propriété vraie au rang n.",
    explanation: exp(
      "L’hypothèse de récurrence est la propriété supposée vraie au rang n.",
      "On reprend exactement la propriété à démontrer, mais au rang n.",
      "La propriété est uₙ ≤ 2. L’hypothèse de récurrence est donc : on suppose uₙ ≤ 2.",
      "L’hypothèse correcte est : on suppose que uₙ ≤ 2."
    ),
    tags: ["terminale-spe", "suite", "recurrence", "preuve", "bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_suite_recurrence_preuve_open_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_recurrence_preuve",
    difficulty: 4,
    theme: "neutral",
    text: "Cite les trois étapes d’une démonstration par récurrence.",
    format: "open",
    expected: ["initialisation", "hérédité", "conclusion"],
    comparator: "contains_keyword",
    hint: "Il y a une étape de départ, une étape de passage au rang suivant, puis une phrase finale.",
    explanation: exp(
      "La récurrence est une méthode de démonstration utilisée sur les entiers.",
      "On suit toujours les trois mêmes étapes dans l’ordre.",
      "On vérifie le rang initial, on démontre le passage de n à n + 1, puis on conclut.",
      "Les trois étapes sont : initialisation, hérédité, conclusion."
    ),
    tags: ["terminale-spe", "suite", "recurrence", "preuve", "open"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_suite_recurrence_preuve_open_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_recurrence_preuve",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi l’étape d’hérédité seule ne suffit pas pour conclure une démonstration par récurrence.",
    format: "open",
    expected: ["initialisation", "départ", "rang", "hérédité", "conclusion"],
    comparator: "contains_keyword",
    hint: "Il faut aussi vérifier que la propriété démarre vraiment.",
    explanation: exp(
      "Une récurrence fonctionne comme une chaîne : il faut un premier maillon et une règle de passage au maillon suivant.",
      "L’hérédité montre seulement que si la propriété est vraie à un rang, elle est vraie au suivant.",
      "Sans initialisation, on ne sait pas si la propriété est vraie au premier rang.",
      "L’hérédité seule ne suffit pas : il faut aussi l’initialisation."
    ),
    tags: ["terminale-spe", "suite", "recurrence", "preuve", "raisonnement", "bac", "open"],
  },

  /* =========================
     SUITE_VARIATION
  ========================= */

  {
    kind: "fixed",
    id: "terminale_spe_suite_variation_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_variation",
    difficulty: 2,
    theme: "neutral",
    text: "Si uₙ₊₁ - uₙ ≥ 0 pour tout n, que peut-on dire de la suite ?",
    format: "qcm",
    choices: ["elle est croissante", "elle est décroissante", "elle est non bornée", "elle est géométrique"],
    expected: ["elle est croissante"],
    comparator: "mcq_exact",
    hint: "Compare uₙ₊₁ et uₙ.",
    explanation: exp(
      "Une suite est croissante si uₙ₊₁ ≥ uₙ pour tout n.",
      "On étudie le signe de uₙ₊₁ - uₙ.",
      "Si uₙ₊₁ - uₙ ≥ 0, alors uₙ₊₁ ≥ uₙ.",
      "La suite est croissante."
    ),
    tags: ["terminale-spe", "suite", "variation", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_suite_variation_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_variation",
    difficulty: 2,
    theme: "neutral",
    text: "Si uₙ₊₁ - uₙ ≤ 0 pour tout n, que peut-on dire de la suite ?",
    format: "qcm",
    choices: ["elle est décroissante", "elle est croissante", "elle est positive", "elle est géométrique"],
    expected: ["elle est décroissante"],
    comparator: "mcq_exact",
    hint: "Un écart négatif signifie que le terme suivant est plus petit.",
    explanation: exp(
      "Une suite est décroissante si uₙ₊₁ ≤ uₙ pour tout n.",
      "On étudie le signe de uₙ₊₁ - uₙ.",
      "Si uₙ₊₁ - uₙ ≤ 0, alors uₙ₊₁ ≤ uₙ.",
      "La suite est décroissante."
    ),
    tags: ["terminale-spe", "suite", "variation", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_suite_variation_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_variation",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule uₙ₊₁ - uₙ.",
    tags: ["terminale-spe", "suite", "variation", "template"],
    generate: () => {
      const a = randomChoice([1, 2, 3, 4, 5]);
      const b = randomInt(0, 10);

      return {
        text: `Soit uₙ = ${a}n + ${b}. Quel est le sens de variation de la suite ?`,
        format: "qcm",
        choices: shuffle(["croissante", "décroissante", "constante", "impossible à déterminer"]),
        expected: ["croissante"],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour étudier les variations d’une suite, on peut calculer uₙ₊₁ - uₙ.",
          "Si cette différence est positive, la suite est croissante.",
          `Ici, uₙ₊₁ - uₙ = ${a}. Comme ${a} > 0, uₙ₊₁ ≥ uₙ.`,
          "La suite est croissante."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "terminale_spe_suite_variation_tpl_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_variation",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour une suite géométrique positive, regarde la raison q.",
    tags: ["terminale-spe", "suite", "variation", "geometrique", "template"],
    generate: () => {
      const u0 = randomChoice([2, 3, 4, 5]);
      const q = randomChoice([0.2, 0.25, 0.5, 0.8]);
      const qText = String(q).replace(".", ",");

      return {
        text: `Soit u₀ = ${u0} et uₙ₊₁ = ${qText}uₙ. On admet que tous les termes sont positifs. Quel est le sens de variation de la suite ?`,
        format: "qcm",
        choices: shuffle(["croissante", "décroissante", "constante", "impossible à déterminer"]),
        expected: ["décroissante"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une suite géométrique positive de raison q comprise entre 0 et 1 est décroissante.",
          "On compare uₙ₊₁ = q uₙ avec uₙ.",
          `Ici, q = ${qText} et 0 < q < 1. Donc uₙ₊₁ est plus petit que uₙ.`,
          "La suite est décroissante."
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "terminale_spe_suite_variation_open_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_variation",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment on peut étudier les variations d’une suite à l’aide de uₙ₊₁ - uₙ.",
    format: "open",
    expected: ["uₙ₊₁", "uₙ", "positif", "négatif", "croissante", "décroissante"],
    comparator: "contains_keyword",
    hint: "Le signe de la différence indique si le terme suivant est plus grand ou plus petit.",
    explanation: exp(
      "Les variations d’une suite décrivent si ses termes augmentent ou diminuent.",
      "On calcule uₙ₊₁ - uₙ et on étudie son signe.",
      "Si uₙ₊₁ - uₙ ≥ 0, alors la suite est croissante. Si uₙ₊₁ - uₙ ≤ 0, alors elle est décroissante.",
      "Le signe de uₙ₊₁ - uₙ permet donc de conclure sur le sens de variation."
    ),
    tags: ["terminale-spe", "suite", "variation", "raisonnement", "open"],
  },

  /* =========================
     SUITE_BORNEE
  ========================= */

  {
    kind: "fixed",
    id: "terminale_spe_suite_bornee_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_bornee",
    difficulty: 2,
    theme: "neutral",
    text: "Si pour tout n, 0 ≤ uₙ ≤ 10, que peut-on dire de la suite ?",
    format: "qcm",
    choices: ["elle est bornée", "elle diverge vers +∞", "elle est strictement décroissante", "elle est négative"],
    expected: ["elle est bornée"],
    comparator: "mcq_exact",
    hint: "Une suite bornée est à la fois minorée et majorée.",
    explanation: exp(
      "Une suite est bornée si elle est à la fois minorée et majorée.",
      "On cherche un encadrement valable pour tout n.",
      "Ici, 0 ≤ uₙ ≤ 10 pour tout n. La suite est minorée par 0 et majorée par 10.",
      "La suite est donc bornée."
    ),
    tags: ["terminale-spe", "suite", "bornee", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_suite_bornee_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_bornee",
    difficulty: 3,
    theme: "neutral",
    text: "Une suite croissante et majorée est-elle convergente ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "C’est le théorème de convergence monotone.",
    explanation: exp(
      "Une suite monotone et bornée est convergente.",
      "On vérifie le sens de variation et l’existence d’une borne.",
      "La suite est croissante et majorée.",
      "Elle est donc convergente."
    ),
    tags: ["terminale-spe", "suite", "bornee", "convergence", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_suite_bornee_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_bornee",
    difficulty: 3,
    theme: "neutral",
    text: "Une suite décroissante et minorée est-elle convergente ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Une suite monotone et bornée converge.",
    explanation: exp(
      "Le théorème de convergence monotone dit qu’une suite monotone et bornée converge.",
      "On vérifie que la suite est monotone et qu’elle possède une borne dans le bon sens.",
      "Elle est décroissante et minorée.",
      "Elle est donc convergente."
    ),
    tags: ["terminale-spe", "suite", "bornee", "convergence", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_suite_bornee_open_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_bornee",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi une suite majorée ne peut pas tendre vers +∞.",
    format: "open",
    expected: ["majorée", "borne", "+∞", "dépasser", "impossible"],
    comparator: "contains_keyword",
    hint: "Une suite majorée reste toujours sous une certaine valeur.",
    explanation: exp(
      "Une suite majorée possède une borne supérieure.",
      "Pour tendre vers +∞, une suite devrait finir par dépasser n’importe quel réel.",
      "Si elle est majorée, elle reste toujours inférieure ou égale à une certaine borne.",
      "Elle ne peut donc pas tendre vers +∞."
    ),
    tags: ["terminale-spe", "suite", "bornee", "raisonnement", "open"],
  },

  /* =========================
     SUITE_DEFIS - TYPE BAC
  ========================= */

  {
    kind: "fixed",
    id: "terminale_spe_suite_defi_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "On définit u₀ = 1 et uₙ₊₁ = uₙ + 3. Quelle est l’expression de uₙ ?",
    format: "qcm",
    choices: ["uₙ = 1 + 3n", "uₙ = 3 + n", "uₙ = 3ⁿ", "uₙ = 1 × 3ⁿ"],
    expected: ["uₙ = 1 + 3n"],
    comparator: "mcq_exact",
    hint: "C’est une suite arithmétique de raison 3.",
    explanation: exp(
      "Une suite arithmétique vérifie uₙ = u₀ + nr.",
      "On identifie u₀ et la raison r.",
      "Ici, u₀ = 1 et r = 3. Donc uₙ = 1 + 3n.",
      "L’expression explicite est uₙ = 1 + 3n."
    ),
    tags: ["terminale-spe", "suite", "arithmetique", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_suite_defi_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "On définit u₀ = 4 et uₙ₊₁ = 0,5uₙ. Quelle est l’expression de uₙ ?",
    format: "qcm",
    choices: ["uₙ = 4 × 0,5ⁿ", "uₙ = 0,5 × 4ⁿ", "uₙ = 4 + 0,5n", "uₙ = 0,5n + 4"],
    expected: ["uₙ = 4 × 0,5ⁿ"],
    comparator: "mcq_exact",
    hint: "C’est une suite géométrique de raison 0,5.",
    explanation: exp(
      "Une suite géométrique vérifie uₙ = u₀ × qⁿ.",
      "On identifie le premier terme u₀ et la raison q.",
      "Ici, u₀ = 4 et q = 0,5. Donc uₙ = 4 × 0,5ⁿ.",
      "L’expression explicite est uₙ = 4 × 0,5ⁿ."
    ),
    tags: ["terminale-spe", "suite", "geometrique", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_suite_defi_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "On définit u₀ = 2 et uₙ₊₁ = 0,5uₙ + 1. Quelle équation doit vérifier une limite éventuelle ℓ ?",
    format: "qcm",
    choices: ["ℓ = 0,5ℓ + 1", "ℓ = 0,5 + 1", "ℓ = 2", "ℓ = 0,5ℓ"],
    expected: ["ℓ = 0,5ℓ + 1"],
    comparator: "mcq_exact",
    hint: "Si uₙ converge vers ℓ, alors uₙ₊₁ converge aussi vers ℓ.",
    explanation: exp(
      "Lorsqu’une suite définie par récurrence converge, sa limite éventuelle vérifie l’équation obtenue en remplaçant uₙ et uₙ₊₁ par ℓ.",
      "On passe formellement à la limite dans la relation de récurrence.",
      "La relation est uₙ₊₁ = 0,5uₙ + 1. Donc ℓ = 0,5ℓ + 1.",
      "La limite éventuelle vérifie ℓ = 0,5ℓ + 1."
    ),
    tags: ["terminale-spe", "suite", "limite", "recurrence", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_suite_defi_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "On définit u₀ = 2 et uₙ₊₁ = 0,5uₙ + 1. Résoudre l’équation ℓ = 0,5ℓ + 1.",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Regroupe les termes en ℓ du même côté.",
    explanation: exp(
      "La limite éventuelle d’une suite récurrente peut être trouvée en résolvant une équation.",
      "On résout ℓ = 0,5ℓ + 1.",
      "ℓ - 0,5ℓ = 1, donc 0,5ℓ = 1, donc ℓ = 2.",
      "La limite éventuelle est 2."
    ),
    tags: ["terminale-spe", "suite", "limite", "recurrence", "type_bac"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_suite_defi_open_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans un exercice de bac, on montre qu’une suite est croissante et majorée. Quelle conclusion peut-on donner ? Justifie.",
    format: "open",
    expected: ["convergente", "croissante", "majorée", "théorème", "monotone"],
    comparator: "contains_keyword",
    hint: "Utilise le théorème de convergence monotone.",
    explanation: exp(
      "Une suite monotone et bornée est convergente.",
      "On identifie que la suite est croissante et majorée.",
      "Comme elle est croissante et majorée, elle est monotone et bornée.",
      "On peut conclure qu’elle est convergente."
    ),
    tags: ["terminale-spe", "suite", "convergence", "type_bac", "open"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_suite_defi_open_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi, dans un exercice de bac, il ne suffit pas de trouver une limite candidate : il faut aussi justifier que la suite converge.",
    format: "open",
    expected: ["converge", "limite", "candidate", "justifier", "théorème"],
    comparator: "contains_keyword",
    hint: "Une équation peut donner une limite possible, mais pas prouver la convergence.",
    explanation: exp(
      "Une limite candidate est une valeur possible si la suite converge.",
      "Résoudre une équation de limite ne prouve pas automatiquement que la suite converge.",
      "Il faut d’abord démontrer la convergence, par exemple avec le théorème de convergence monotone.",
      "Au bac, il faut donc justifier la convergence avant d’affirmer la limite."
    ),
    tags: ["terminale-spe", "suite", "limite", "convergence", "raisonnement", "bac", "open"],
  },

  {
    kind: "template",
    id: "terminale_spe_suite_defi_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Reconnais une suite arithmétique.",
    tags: ["terminale-spe", "suite", "arithmetique", "type_bac", "template"],
    generate: () => {
      const u0 = randomInt(1, 8);
      const r = randomInt(2, 10);
      const n = randomInt(4, 12);
      const result = u0 + n * r;

      return {
        text: `On définit u₀ = ${u0} et uₙ₊₁ = uₙ + ${r}. Calculer u_${n}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Une suite arithmétique vérifie uₙ = u₀ + nr.",
          "On identifie le premier terme et la raison.",
          `Ici, u₀ = ${u0}, r = ${r}, donc u_${n} = ${u0} + ${n} × ${r} = ${result}.`,
          `Donc u_${n} = ${result}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "terminale_spe_suite_defi_tpl_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "suite_numerique",
    microId: "suite_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Reconnais une suite géométrique.",
    tags: ["terminale-spe", "suite", "geometrique", "type_bac", "template"],
    generate: () => {
      const u0 = randomChoice([1, 2, 3, 4, 5]);
      const q = randomChoice([2, 3, 4]);
      const n = randomChoice([3, 4, 5]);
      const result = u0 * Math.pow(q, n);

      return {
        text: `On définit u₀ = ${u0} et uₙ₊₁ = ${q}uₙ. Calculer u_${n}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Une suite géométrique vérifie uₙ = u₀ × qⁿ.",
          "On identifie le premier terme et la raison.",
          `Ici, u₀ = ${u0}, q = ${q}, donc u_${n} = ${u0} × ${q}^${n} = ${result}.`,
          `Donc u_${n} = ${result}.`
        ),
      };
    },
  },

  /* =========================
     HARMONISATION → 10 / microSkill
  ========================= */

  // --- suite_reconnaitre ---
  {
    kind: "fixed", id: "terminale_spe_suite_reconnaitre_h1", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_reconnaitre", difficulty: 2, theme: "neutral",
    text: "Une suite vérifie uₙ₊₁ = uₙ - 4. Quel est son type ?",
    format: "qcm", choices: ["arithmétique", "géométrique", "constante", "quadratique"], expected: ["arithmétique"], comparator: "mcq_exact",
    hint: "On ajoute toujours la même quantité (ici -4).",
    explanation: exp("Une suite arithmétique a une raison constante ajoutée.", "On compare uₙ₊₁ et uₙ.", "uₙ₊₁ - uₙ = -4 : constante.", "La suite est arithmétique de raison -4."),
    tags: ["terminale-spe", "suite", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_suite_reconnaitre_h2", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_reconnaitre", difficulty: 2, theme: "neutral",
    text: "Une suite vérifie uₙ₊₁ = 3uₙ. Quel est son type ?",
    format: "qcm", choices: ["géométrique", "arithmétique", "constante", "affine"], expected: ["géométrique"], comparator: "mcq_exact",
    hint: "On multiplie toujours par la même quantité.",
    explanation: exp("Une suite géométrique a une raison constante multipliée.", "On compare uₙ₊₁ et uₙ.", "uₙ₊₁ = 3uₙ : on multiplie par 3.", "La suite est géométrique de raison 3."),
    tags: ["terminale-spe", "suite", "geometrique", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_suite_reconnaitre_h3", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_reconnaitre", difficulty: 3, theme: "neutral",
    text: "La suite uₙ = 2ⁿ est :",
    format: "qcm", choices: ["géométrique de raison 2", "arithmétique de raison 2", "constante", "décroissante"], expected: ["géométrique de raison 2"], comparator: "mcq_exact",
    hint: "uₙ₊₁ / uₙ = 2.",
    explanation: exp("On regarde le quotient de deux termes consécutifs.", "uₙ₊₁/uₙ = 2ⁿ⁺¹/2ⁿ = 2.", "Le quotient est constant égal à 2.", "Suite géométrique de raison 2."),
    tags: ["terminale-spe", "suite", "geometrique", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_suite_reconnaitre_h4", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_reconnaitre", difficulty: 2, theme: "neutral",
    text: "La suite uₙ = 5n - 1 est :",
    format: "qcm", choices: ["arithmétique de raison 5", "géométrique de raison 5", "constante", "quadratique"], expected: ["arithmétique de raison 5"], comparator: "mcq_exact",
    hint: "uₙ₊₁ - uₙ = 5.",
    explanation: exp("Une suite uₙ = an + b est arithmétique de raison a.", "Ici a = 5.", "uₙ₊₁ - uₙ = 5.", "Suite arithmétique de raison 5."),
    tags: ["terminale-spe", "suite", "arithmetique", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_suite_reconnaitre_h5", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_reconnaitre", difficulty: 4, theme: "neutral",
    text: "Une suite vérifie uₙ₊₁ = uₙ + n. Est-elle arithmétique ?",
    format: "qcm", choices: ["Non, la quantité ajoutée change", "Oui, de raison 1", "Oui, de raison n", "Oui, géométrique"], expected: ["Non, la quantité ajoutée change"], comparator: "mcq_exact",
    hint: "On ajoute n, qui dépend du rang.",
    explanation: exp("Une suite arithmétique ajoute une CONSTANTE.", "Ici on ajoute n, qui varie.", "uₙ₊₁ - uₙ = n n'est pas constant.", "La suite n'est pas arithmétique."),
    tags: ["terminale-spe", "suite", "reconnaitre", "qcm"],
  },

  // --- suite_calculer_termes ---
  {
    kind: "fixed", id: "terminale_spe_suite_calculer_termes_h1", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_calculer_termes", difficulty: 1, theme: "neutral",
    text: "Soit uₙ = 2n - 1. Calculer u₅.",
    format: "short", expected: ["9"], comparator: "number_equal",
    hint: "Remplace n par 5.",
    explanation: exp("Suite explicite : on remplace n.", "u₅ = 2×5 - 1.", "10 - 1 = 9.", "u₅ = 9."),
    tags: ["terminale-spe", "suite", "calcul", "short"],
  },
  {
    kind: "fixed", id: "terminale_spe_suite_calculer_termes_h2", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_calculer_termes", difficulty: 2, theme: "neutral",
    text: "Soit u₀ = 3 et uₙ₊₁ = uₙ + 4. Calculer u₂.",
    format: "short", expected: ["11"], comparator: "number_equal",
    hint: "Calcule u₁ puis u₂.",
    explanation: exp("Suite récurrente : terme après terme.", "u₁ = 3 + 4 = 7, u₂ = 7 + 4.", "u₂ = 11.", "u₂ = 11."),
    tags: ["terminale-spe", "suite", "calcul", "recurrence", "short"],
  },
  {
    kind: "fixed", id: "terminale_spe_suite_calculer_termes_h3", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_calculer_termes", difficulty: 2, theme: "neutral",
    text: "Soit uₙ = n² + 1. Calculer u₃.",
    format: "short", expected: ["10"], comparator: "number_equal",
    hint: "Remplace n par 3.",
    explanation: exp("Suite explicite : on remplace n.", "u₃ = 3² + 1.", "9 + 1 = 10.", "u₃ = 10."),
    tags: ["terminale-spe", "suite", "calcul", "short"],
  },
  {
    kind: "fixed", id: "terminale_spe_suite_calculer_termes_h4", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_calculer_termes", difficulty: 2, theme: "neutral",
    text: "Soit u₀ = 1 et uₙ₊₁ = 2uₙ. Calculer u₃.",
    format: "short", expected: ["8"], comparator: "number_equal",
    hint: "On double trois fois.",
    explanation: exp("Suite géométrique de raison 2.", "u₁ = 2, u₂ = 4, u₃ = 8.", "u₃ = 1 × 2³ = 8.", "u₃ = 8."),
    tags: ["terminale-spe", "suite", "calcul", "geometrique", "short"],
  },
  {
    kind: "fixed", id: "terminale_spe_suite_calculer_termes_h5", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_calculer_termes", difficulty: 3, theme: "neutral",
    text: "Soit uₙ = 3 × 2ⁿ. Calculer u₂.",
    format: "short", expected: ["12"], comparator: "number_equal",
    hint: "Remplace n par 2.",
    explanation: exp("Suite géométrique explicite.", "u₂ = 3 × 2².", "3 × 4 = 12.", "u₂ = 12."),
    tags: ["terminale-spe", "suite", "calcul", "geometrique", "short"],
  },

  // --- suite_explicite_recurrence ---
  {
    kind: "fixed", id: "terminale_spe_suite_explicite_recurrence_h1", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_explicite_recurrence", difficulty: 2, theme: "neutral",
    text: "La suite uₙ = 4n + 1 est définie :",
    format: "qcm", choices: ["explicitement", "par récurrence", "par un arbre", "par une intégrale"], expected: ["explicitement"], comparator: "mcq_exact",
    hint: "uₙ dépend directement de n.",
    explanation: exp("Une définition explicite donne uₙ en fonction de n.", "uₙ = 4n + 1 utilise directement n.", "Pas besoin du terme précédent.", "Définie explicitement."),
    tags: ["terminale-spe", "suite", "explicite", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_suite_explicite_recurrence_h2", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_explicite_recurrence", difficulty: 2, theme: "neutral",
    text: "La suite u₀ = 2, uₙ₊₁ = uₙ + 5 est définie :",
    format: "qcm", choices: ["par récurrence", "explicitement", "par une dérivée", "par une limite"], expected: ["par récurrence"], comparator: "mcq_exact",
    hint: "uₙ₊₁ dépend de uₙ.",
    explanation: exp("Une définition récurrente relie un terme au précédent.", "uₙ₊₁ = uₙ + 5 utilise uₙ.", "Il faut un premier terme.", "Définie par récurrence."),
    tags: ["terminale-spe", "suite", "recurrence", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_suite_explicite_recurrence_h3", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_explicite_recurrence", difficulty: 3, theme: "neutral",
    text: "Une suite arithmétique vérifie u₀ = 2 et r = 3. Quelle est son expression explicite ?",
    format: "qcm", choices: ["uₙ = 2 + 3n", "uₙ = 3 + 2n", "uₙ = 2 × 3ⁿ", "uₙ = 6n"], expected: ["uₙ = 2 + 3n"], comparator: "mcq_exact",
    hint: "uₙ = u₀ + nr.",
    explanation: exp("Suite arithmétique : uₙ = u₀ + nr.", "u₀ = 2, r = 3.", "uₙ = 2 + 3n.", "uₙ = 2 + 3n."),
    tags: ["terminale-spe", "suite", "arithmetique", "explicite", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_suite_explicite_recurrence_h4", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_explicite_recurrence", difficulty: 3, theme: "neutral",
    text: "Une suite géométrique vérifie u₀ = 3 et q = 2. Quelle est son expression explicite ?",
    format: "qcm", choices: ["uₙ = 3 × 2ⁿ", "uₙ = 2 × 3ⁿ", "uₙ = 3 + 2n", "uₙ = 6ⁿ"], expected: ["uₙ = 3 × 2ⁿ"], comparator: "mcq_exact",
    hint: "uₙ = u₀ × qⁿ.",
    explanation: exp("Suite géométrique : uₙ = u₀ × qⁿ.", "u₀ = 3, q = 2.", "uₙ = 3 × 2ⁿ.", "uₙ = 3 × 2ⁿ."),
    tags: ["terminale-spe", "suite", "geometrique", "explicite", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_suite_explicite_recurrence_h5", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_explicite_recurrence", difficulty: 3, theme: "neutral",
    text: "Avec quelle forme peut-on calculer u₁₀₀ sans calculer les termes précédents ?",
    format: "qcm", choices: ["une forme explicite", "une forme récurrente", "un arbre pondéré", "une primitive"], expected: ["une forme explicite"], comparator: "mcq_exact",
    hint: "Explicite = directement en fonction de n.",
    explanation: exp("La forme explicite donne uₙ directement.", "On remplace n par 100.", "Pas besoin des termes précédents.", "La forme explicite."),
    tags: ["terminale-spe", "suite", "explicite", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_suite_explicite_recurrence_h6", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_explicite_recurrence", difficulty: 4, theme: "neutral",
    text: "Une suite géométrique u₀ = 5, uₙ₊₁ = 3uₙ. Son expression explicite est :",
    format: "qcm", choices: ["uₙ = 5 × 3ⁿ", "uₙ = 3 × 5ⁿ", "uₙ = 5 + 3n", "uₙ = 15ⁿ"], expected: ["uₙ = 5 × 3ⁿ"], comparator: "mcq_exact",
    hint: "uₙ = u₀ × qⁿ avec q = 3.",
    explanation: exp("On identifie u₀ et la raison q.", "u₀ = 5, q = 3.", "uₙ = 5 × 3ⁿ.", "uₙ = 5 × 3ⁿ."),
    tags: ["terminale-spe", "suite", "geometrique", "explicite", "qcm"],
  },

  // --- suite_recurrence_preuve ---
  {
    kind: "fixed", id: "terminale_spe_suite_recurrence_preuve_h1", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_recurrence_preuve", difficulty: 2, theme: "neutral",
    text: "Quelles sont, dans l'ordre, les étapes d'une démonstration par récurrence ?",
    format: "qcm", choices: ["initialisation, hérédité, conclusion", "hérédité, initialisation, conclusion", "conclusion, calcul, limite", "calcul, dérivée, conclusion"], expected: ["initialisation, hérédité, conclusion"], comparator: "mcq_exact",
    hint: "On commence par vérifier au premier rang.",
    explanation: exp("La récurrence suit trois étapes.", "On vérifie, on transmet, on conclut.", "Initialisation, puis hérédité, puis conclusion.", "initialisation, hérédité, conclusion."),
    tags: ["terminale-spe", "suite", "recurrence", "preuve", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_suite_recurrence_preuve_h2", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_recurrence_preuve", difficulty: 3, theme: "neutral",
    text: "Dans l'hérédité, que suppose-t-on ?",
    format: "qcm", choices: ["que la propriété est vraie au rang n", "que la propriété est fausse", "que n = 0", "rien"], expected: ["que la propriété est vraie au rang n"], comparator: "mcq_exact",
    hint: "C'est l'hypothèse de récurrence.",
    explanation: exp("L'hérédité part d'une hypothèse.", "On suppose Pₙ vraie (hypothèse de récurrence).", "On démontre alors Pₙ₊₁.", "On suppose la propriété vraie au rang n."),
    tags: ["terminale-spe", "suite", "recurrence", "preuve", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_suite_recurrence_preuve_h3", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_recurrence_preuve", difficulty: 2, theme: "neutral",
    text: "L'initialisation consiste à :",
    format: "qcm", choices: ["vérifier la propriété au premier rang", "supposer la propriété vraie", "calculer une limite", "conclure"], expected: ["vérifier la propriété au premier rang"], comparator: "mcq_exact",
    hint: "C'est le point de départ.",
    explanation: exp("L'initialisation amorce la récurrence.", "On vérifie Pₙ au rang de départ (souvent n = 0).", "C'est le premier maillon.", "Vérifier la propriété au premier rang."),
    tags: ["terminale-spe", "suite", "recurrence", "preuve", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_suite_recurrence_preuve_h4", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_recurrence_preuve", difficulty: 3, theme: "neutral",
    text: "L'hérédité consiste à démontrer :",
    format: "qcm", choices: ["Pₙ ⟹ Pₙ₊₁", "Pₙ₊₁ ⟹ Pₙ", "P₀ seulement", "la limite de la suite"], expected: ["Pₙ ⟹ Pₙ₊₁"], comparator: "mcq_exact",
    hint: "On passe du rang n au rang n+1.",
    explanation: exp("L'hérédité transmet la propriété au rang suivant.", "On suppose Pₙ et on démontre Pₙ₊₁.", "C'est l'implication Pₙ ⟹ Pₙ₊₁.", "On démontre Pₙ ⟹ Pₙ₊₁."),
    tags: ["terminale-spe", "suite", "recurrence", "preuve", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_suite_recurrence_preuve_h5", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_recurrence_preuve", difficulty: 4, theme: "neutral",
    text: "Pourquoi l'initialisation est-elle indispensable ?",
    format: "qcm", choices: ["sans premier maillon, la chaîne ne démarre pas", "pour calculer la limite", "pour dériver", "elle est facultative"], expected: ["sans premier maillon, la chaîne ne démarre pas"], comparator: "mcq_exact",
    hint: "Image de la chaîne de dominos.",
    explanation: exp("La récurrence est une chaîne d'implications.", "L'hérédité transmet, mais il faut un point de départ vrai.", "Sans initialisation, rien ne garantit que Pₙ démarre.", "Sans premier maillon, la chaîne ne démarre pas."),
    tags: ["terminale-spe", "suite", "recurrence", "preuve", "qcm"],
  },

  // --- suite_variation ---
  {
    kind: "fixed", id: "terminale_spe_suite_variation_h1", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_variation", difficulty: 2, theme: "neutral",
    text: "La suite uₙ = 2n + 1 est :",
    format: "qcm", choices: ["croissante", "décroissante", "constante", "ni l'un ni l'autre"], expected: ["croissante"], comparator: "mcq_exact",
    hint: "uₙ₊₁ - uₙ = 2 > 0.",
    explanation: exp("On étudie le signe de uₙ₊₁ - uₙ.", "uₙ₊₁ - uₙ = 2.", "2 > 0 donc croissante.", "La suite est croissante."),
    tags: ["terminale-spe", "suite", "variation", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_suite_variation_h2", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_variation", difficulty: 2, theme: "neutral",
    text: "Une suite vérifie uₙ₊₁ - uₙ = -3 pour tout n. Elle est :",
    format: "qcm", choices: ["décroissante", "croissante", "constante", "bornée"], expected: ["décroissante"], comparator: "mcq_exact",
    hint: "L'écart est négatif.",
    explanation: exp("Le signe de uₙ₊₁ - uₙ donne le sens.", "Ici l'écart vaut -3 < 0.", "Donc uₙ₊₁ < uₙ.", "La suite est décroissante."),
    tags: ["terminale-spe", "suite", "variation", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_suite_variation_h3", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_variation", difficulty: 3, theme: "neutral",
    text: "La suite uₙ = n² (pour n ≥ 0) est :",
    format: "qcm", choices: ["croissante", "décroissante", "constante", "alternée"], expected: ["croissante"], comparator: "mcq_exact",
    hint: "uₙ₊₁ - uₙ = 2n + 1 > 0.",
    explanation: exp("On calcule uₙ₊₁ - uₙ.", "(n+1)² - n² = 2n + 1.", "2n + 1 > 0 pour n ≥ 0.", "La suite est croissante."),
    tags: ["terminale-spe", "suite", "variation", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_suite_variation_h4", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_variation", difficulty: 2, theme: "neutral",
    text: "La suite définie par uₙ = 5 (pour tout n) est :",
    format: "qcm", choices: ["constante", "croissante", "décroissante", "géométrique de raison 5"], expected: ["constante"], comparator: "mcq_exact",
    hint: "Tous les termes sont égaux.",
    explanation: exp("Une suite constante ne varie pas.", "uₙ₊₁ - uₙ = 5 - 5 = 0.", "L'écart est nul.", "La suite est constante."),
    tags: ["terminale-spe", "suite", "variation", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_suite_variation_h5", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_variation", difficulty: 4, theme: "neutral",
    text: "Une suite géométrique u₀ = 2 (positif) et q = 3. Elle est :",
    format: "qcm", choices: ["croissante", "décroissante", "constante", "alternée"], expected: ["croissante"], comparator: "mcq_exact",
    hint: "Termes positifs, raison > 1.",
    explanation: exp("Pour une suite géométrique positive, le sens dépend de q.", "Ici q = 3 > 1 et u₀ > 0.", "On multiplie par 3 : les termes augmentent.", "La suite est croissante."),
    tags: ["terminale-spe", "suite", "variation", "geometrique", "qcm"],
  },

  // --- suite_bornee ---
  {
    kind: "fixed", id: "terminale_spe_suite_bornee_h1", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_bornee", difficulty: 2, theme: "neutral",
    text: "Si pour tout n, 0 ≤ uₙ ≤ 5, la suite est :",
    format: "qcm", choices: ["bornée", "non majorée", "croissante", "divergente"], expected: ["bornée"], comparator: "mcq_exact",
    hint: "Minorée ET majorée.",
    explanation: exp("Bornée = minorée et majorée.", "0 ≤ uₙ : minorée ; uₙ ≤ 5 : majorée.", "Les deux à la fois.", "La suite est bornée."),
    tags: ["terminale-spe", "suite", "bornee", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_suite_bornee_h2", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_bornee", difficulty: 3, theme: "neutral",
    text: "La suite uₙ = 1/n (n ≥ 1) vérifie 0 < uₙ ≤ 1. Elle est :",
    format: "qcm", choices: ["bornée", "non majorée", "non minorée", "croissante"], expected: ["bornée"], comparator: "mcq_exact",
    hint: "Encadrée entre 0 et 1.",
    explanation: exp("On cherche un encadrement.", "0 < 1/n ≤ 1 pour n ≥ 1.", "Minorée par 0, majorée par 1.", "La suite est bornée."),
    tags: ["terminale-spe", "suite", "bornee", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_suite_bornee_h3", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_bornee", difficulty: 3, theme: "neutral",
    text: "Une suite croissante et majorée est :",
    format: "qcm", choices: ["convergente", "divergente vers +∞", "décroissante", "non bornée"], expected: ["convergente"], comparator: "mcq_exact",
    hint: "Théorème de convergence monotone.",
    explanation: exp("Une suite monotone et bornée converge.", "Croissante + majorée vérifie les hypothèses.", "Elle admet donc une limite finie.", "La suite est convergente."),
    tags: ["terminale-spe", "suite", "bornee", "convergence", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_suite_bornee_h4", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_bornee", difficulty: 2, theme: "neutral",
    text: "Si pour tout n, uₙ ≥ 2, on dit que la suite est :",
    format: "qcm", choices: ["minorée par 2", "majorée par 2", "bornée", "constante"], expected: ["minorée par 2"], comparator: "mcq_exact",
    hint: "Une borne inférieure.",
    explanation: exp("Une minoration donne une borne inférieure.", "uₙ ≥ 2 pour tout n.", "2 est un minorant.", "La suite est minorée par 2."),
    tags: ["terminale-spe", "suite", "bornee", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_suite_bornee_h5", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_bornee", difficulty: 3, theme: "neutral",
    text: "Une suite décroissante et minorée est :",
    format: "qcm", choices: ["convergente", "divergente", "croissante", "non bornée"], expected: ["convergente"], comparator: "mcq_exact",
    hint: "Théorème de convergence monotone.",
    explanation: exp("Une suite monotone et bornée converge.", "Décroissante + minorée vérifie les hypothèses.", "Elle admet une limite finie.", "La suite est convergente."),
    tags: ["terminale-spe", "suite", "bornee", "convergence", "qcm"],
  },
  {
    kind: "fixed", id: "terminale_spe_suite_bornee_h6", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_bornee", difficulty: 4, theme: "neutral",
    text: "La suite uₙ = (-1)ⁿ prend les valeurs -1 et 1. Elle est :",
    format: "qcm", choices: ["bornée (entre -1 et 1)", "non majorée", "croissante", "convergente"], expected: ["bornée (entre -1 et 1)"], comparator: "mcq_exact",
    hint: "Toutes les valeurs sont dans [-1 ; 1].",
    explanation: exp("On encadre les valeurs prises.", "uₙ vaut -1 ou 1 selon la parité de n.", "Donc -1 ≤ uₙ ≤ 1.", "La suite est bornée (mais non convergente)."),
    tags: ["terminale-spe", "suite", "bornee", "qcm"],
  },

  // --- suite_defi ---
  {
    kind: "fixed", id: "terminale_spe_suite_defi_h1", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_defi", difficulty: 5, theme: "neutral",
    text: "Soit u₀ = 1 et uₙ₊₁ = 0,5uₙ + 2. La limite éventuelle ℓ vérifie ℓ = 0,5ℓ + 2. Que vaut ℓ ?",
    format: "short", expected: ["4"], comparator: "number_equal",
    hint: "Résous ℓ - 0,5ℓ = 2.",
    explanation: exp("La limite éventuelle vérifie l'équation de point fixe.", "ℓ = 0,5ℓ + 2 donne 0,5ℓ = 2.", "ℓ = 4.", "ℓ = 4."),
    tags: ["terminale-spe", "suite", "limite", "type_bac", "short"],
  },
  {
    kind: "fixed", id: "terminale_spe_suite_defi_h2", niveau: "terminale-spe", matiere: "maths",
    notionId: "suite_numerique", microId: "suite_defi", difficulty: 5, theme: "neutral",
    text: "Dans un exercice de bac, on a montré qu'une suite est décroissante et minorée. On peut conclure qu'elle est :",
    format: "qcm", choices: ["convergente", "divergente vers -∞", "croissante", "non bornée"], expected: ["convergente"], comparator: "mcq_exact",
    hint: "Théorème de convergence monotone.",
    explanation: exp("On applique le théorème de convergence monotone.", "Décroissante et minorée ⟹ bornée et monotone.", "Donc convergente.", "La suite est convergente."),
    tags: ["terminale-spe", "suite", "convergence", "type_bac", "qcm"],
  },
];