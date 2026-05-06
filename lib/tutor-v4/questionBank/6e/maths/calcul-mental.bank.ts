import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function formatComma(n: number | string) {
  return String(n).replace(".", ",");
}

export const calculMentalBank: TutorBankItemV4[] = [
  // =========================
  // MENTAL_ADDITION
  // =========================
  {
    kind: "fixed",
    id: "mental_addition_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_addition",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 68 + 7",
    format: "short",
    expected: ["75"],
    comparator: "number_equal",
    hint: "68 + 2 = 70, puis + 5.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("On peut passer par la dizaine : 68 + 2 = 70, puis il reste 5 à ajouter. Donc 68 + 7 = 75.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["calcul_mental", "addition"],
  },
  {
    kind: "fixed",
    id: "mental_addition_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_addition",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 134 + 28",
    format: "short",
    expected: ["162"],
    comparator: "number_equal",
    hint: "134 + 20 = 154, puis + 8.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("On ajoute d’abord 20 : 134 + 20 = 154. Puis on ajoute 8 : 154 + 8 = 162. Donc 134 + 28 = 162.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["calcul_mental", "addition"],
  },
  {
    kind: "fixed",
    id: "mental_addition_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_addition",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 56 + 8",
    format: "short",
    expected: ["64"],
    comparator: "number_equal",
    hint: "56 + 4 = 60, puis + 4.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("On peut compléter jusqu’à la dizaine : 56 + 4 = 60, puis on ajoute encore 4. Donc 56 + 8 = 64.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["calcul_mental", "addition"],
  },
  {
    kind: "fixed",
    id: "mental_addition_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_addition",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est le résultat de 45 + 8 ?",
    format: "qcm",
    choices: ["51", "52", "53", "54"],
    expected: ["53"],
    comparator: "mcq_exact",
    hint: "45 + 5 = 50, puis + 3.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("On peut passer par 50 : 45 + 5 = 50, puis il reste 3 à ajouter. Donc 45 + 8 = 53.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["calcul_mental", "addition", "qcm"],
  },

  // =========================
  // MENTAL_SUBTRACTION
  // =========================
  {
    kind: "fixed",
    id: "mental_subtraction_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_subtraction",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 183 - 6",
    format: "short",
    expected: ["177"],
    comparator: "number_equal",
    hint: "183 - 3 = 180, puis - 3.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("On enlève 3 pour arriver à 180, puis encore 3. Donc 183 - 6 = 177.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["calcul_mental", "soustraction"],
  },
  {
    kind: "fixed",
    id: "mental_subtraction_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_subtraction",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 96 - 27",
    format: "short",
    expected: ["69"],
    comparator: "number_equal",
    hint: "96 - 20 = 76, puis - 7.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("On enlève d’abord 20 : 96 - 20 = 76. Puis on enlève 7 : 76 - 7 = 69. Donc 96 - 27 = 69.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["calcul_mental", "soustraction"],
  },
  {
    kind: "fixed",
    id: "mental_subtraction_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_subtraction",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 121 - 38",
    format: "short",
    expected: ["83"],
    comparator: "number_equal",
    hint: "121 - 40 = 81, puis ajoute 2.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("On peut enlever 40 au lieu de 38 : 121 - 40 = 81. Comme on a enlevé 2 de trop, on ajoute 2. Donc 121 - 38 = 83.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["calcul_mental", "soustraction"],
  },
  {
    kind: "fixed",
    id: "mental_subtraction_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_subtraction",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est le résultat de 72 - 8 ?",
    format: "qcm",
    choices: ["62", "63", "64", "65"],
    expected: ["64"],
    comparator: "mcq_exact",
    hint: "72 - 2 = 70, puis - 6.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("On peut passer par la dizaine : 72 - 2 = 70, puis on enlève encore 6. Donc 72 - 8 = 64.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["calcul_mental", "soustraction", "qcm"],
  },

  // =========================
  // MENTAL_MULTIPLICATION
  // =========================
  {
    kind: "fixed",
    id: "mental_multiplication_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_multiplication",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 8 × 7",
    format: "short",
    expected: ["56"],
    comparator: "number_equal",
    hint: "Utilise la table de 8.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("Dans la table de 8, 8 × 7 = 56. Donc le résultat est 56.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["calcul_mental", "multiplication"],
  },
  {
    kind: "fixed",
    id: "mental_multiplication_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_multiplication",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 18 × 5",
    format: "short",
    expected: ["90"],
    comparator: "number_equal",
    hint: "Multiplier par 5, c’est prendre la moitié de ×10.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("Multiplier par 5 revient à multiplier par 10 puis à prendre la moitié. 18 × 10 = 180, et la moitié de 180 est 90. Donc 18 × 5 = 90.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["calcul_mental", "multiplication"],
  },
  {
    kind: "fixed",
    id: "mental_multiplication_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_multiplication",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 11 × 9",
    format: "short",
    expected: ["99"],
    comparator: "number_equal",
    hint: "Utilise la table de 9.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("11 × 9 = 99. On peut aussi voir que 10 × 9 = 90 puis ajouter encore 9, ce qui donne 99.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["calcul_mental", "multiplication"],
  },
  {
    kind: "fixed",
    id: "mental_multiplication_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_multiplication",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est le résultat de 6 × 8 ?",
    format: "qcm",
    choices: ["46", "48", "52", "54"],
    expected: ["48"],
    comparator: "mcq_exact",
    hint: "Table de 6 ou de 8.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("Dans les tables, 6 × 8 = 48. La bonne réponse est donc 48.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["calcul_mental", "multiplication", "qcm"],
  },

  // =========================
  // MENTAL_DIVISION
  // =========================
  {
    kind: "fixed",
    id: "mental_division_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_division",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 645 ÷ 10",
    format: "short",
    expected: ["64,5", "64.5"],
    comparator: "number_equal",
    hint: "Diviser par 10 décale la virgule d’un rang.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("Quand on divise par 10, chaque chiffre prend une place dix fois plus petite. Ainsi 645 ÷ 10 = 64,5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["calcul_mental", "division"],
  },
  {
    kind: "fixed",
    id: "mental_division_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_division",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 63 ÷ 9",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "9 × 7 = 63.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("On cherche combien de fois 9 est contenu dans 63. Comme 9 × 7 = 63, on a 63 ÷ 9 = 7.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["calcul_mental", "division"],
  },
  {
    kind: "fixed",
    id: "mental_division_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_division",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 56 ÷ 8",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "8 × 7 = 56.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("Comme 8 × 7 = 56, alors 56 ÷ 8 = 7.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["calcul_mental", "division"],
  },
  {
    kind: "fixed",
    id: "mental_division_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_division",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est le résultat de 45 ÷ 5 ?",
    format: "qcm",
    choices: ["8", "9", "10", "11"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "5 × 9 = 45.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("On cherche le nombre qui multiplié par 5 donne 45. Comme 5 × 9 = 45, alors 45 ÷ 5 = 9.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["calcul_mental", "division", "qcm"],
  },

  // =========================
  // MENTAL_STRATEGIES
  // =========================
  {
    kind: "fixed",
    id: "mental_strategies_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_strategies",
    difficulty: 1,
    theme: "neutral",
    text: "Donne le quart de 28.",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Partager en 4 parts égales.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("Prendre le quart d’un nombre, c’est le diviser par 4. Donc 28 ÷ 4 = 7. Le quart de 28 est 7.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["calcul_mental", "strategie"],
  },
  {
    kind: "fixed",
    id: "mental_strategies_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_strategies",
    difficulty: 1,
    theme: "neutral",
    text: "Donne le double de 70.",
    format: "short",
    expected: ["140"],
    comparator: "number_equal",
    hint: "70 + 70.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("Le double d’un nombre, c’est ce nombre ajouté à lui-même. Donc 70 + 70 = 140.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["calcul_mental", "strategie"],
  },
  {
    kind: "fixed",
    id: "mental_strategies_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_strategies",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 4,23 × 10",
    format: "short",
    expected: ["42,3", "42.3"],
    comparator: "number_equal",
    hint: "Multiplier par 10 décale la virgule d’un rang.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("Quand on multiplie par 10, chaque chiffre prend une place dix fois plus grande. Ainsi 4,23 × 10 = 42,3.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["calcul_mental", "strategie", "decimaux"],
  },
  {
    kind: "fixed",
    id: "mental_strategies_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_strategies",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la moitié de 26 ?",
    format: "qcm",
    choices: ["12", "13", "14", "15"],
    expected: ["13"],
    comparator: "mcq_exact",
    hint: "26 partagé en 2.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("La moitié d’un nombre, c’est ce nombre divisé par 2. Donc 26 ÷ 2 = 13.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["calcul_mental", "strategie", "qcm"],
  },

  // =========================
  // MENTAL_DEFIS / PROBLEMES
  // =========================
  {
    kind: "fixed",
    id: "mental_defis_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_defis",
    difficulty: 2,
    theme: "neutral",
    text: "À la boulangerie, Léa achète une tarte à 5 €, un jus à 3 € ainsi qu’un gâteau à 26 €. Combien Léa va-t-elle payer en tout ?",
    format: "short",
    expected: ["34", "34 €", "34€"],
    comparator: "contains_keyword",
    hint: "Additionne 5 + 3 + 26.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("On additionne les trois prix : 5 + 3 + 26 = 34. Léa paiera donc 34 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["calcul_mental", "probleme"],
  },
  {
    kind: "fixed",
    id: "mental_defis_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_defis",
    difficulty: 2,
    theme: "neutral",
    text: "Un album contient 87 pages. Tu en as déjà lu 39. Combien de pages te reste-t-il à lire ?",
    format: "short",
    expected: ["48"],
    comparator: "number_equal",
    hint: "Fais 87 - 39.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("Le nombre de pages restantes se calcule par une soustraction : 87 - 39 = 48. Il reste donc 48 pages à lire.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["calcul_mental", "probleme", "soustraction"],
  },
  {
    kind: "fixed",
    id: "mental_defis_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_defis",
    difficulty: 2,
    theme: "reunion",
    text: "63 mangues sont partagées entre 9 enfants. Combien chaque enfant reçoit-il de mangues ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Fais 63 ÷ 9.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("On partage 63 mangues en 9 parts égales. Comme 63 ÷ 9 = 7, chaque enfant reçoit 7 mangues.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["calcul_mental", "probleme", "reunion", "division"],
  },
  {
    kind: "fixed",
    id: "mental_defis_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_defis",
    difficulty: 3,
    theme: "neutral",
    text: "Un spectacle commence à 15 h 35 et dure 1 heure et 25 minutes. À quelle heure se termine-t-il ?",
    format: "short",
    expected: ["17 h 00", "17h00", "17:00", "17 h"],
    comparator: "contains_keyword",
    hint: "Ajoute 1 heure puis 25 minutes.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("À 15 h 35, on ajoute 1 heure : on obtient 16 h 35. Puis on ajoute 25 minutes : on arrive à 17 h 00. Le spectacle se termine donc à 17 h.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["calcul_mental", "probleme", "heure"],
  },
  {
    kind: "fixed",
    id: "mental_defis_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_defis",
    difficulty: 2,
    theme: "reunion",
    text: "Dans un jardin à Saint-Pierre, il y a 9 rangées de 7 fleurs. Combien de fleurs y a-t-il en tout ?",
    format: "short",
    expected: ["63"],
    comparator: "number_equal",
    hint: "Fais 9 × 7.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("Il y a 9 rangées de 7 fleurs, donc on calcule 9 × 7 = 63. Il y a 63 fleurs en tout.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["calcul_mental", "probleme", "reunion", "multiplication"],
  },

  // =========================
  // TEMPLATES - ADDITION
  // =========================
  {
    kind: "template",
    id: "mental_addition_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_addition",
    difficulty: 1,
    theme: "neutral",
    hint: "Passe par la dizaine suivante.",
    tags: ["calcul_mental", "addition", "template"],
    generate: () => {
      const a = [26, 37, 48, 59, 67][Math.floor(Math.random() * 5)];
      const b = [4, 5, 6, 7, 8, 9][Math.floor(Math.random() * 6)];
      const sum = a + b;

      return {
        text: `Calcule : ${a} + ${b}`,
        format: "short",
        expected: [String(sum)],
        comparator: "number_equal",
        explanation: "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
          "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
          "Calcul : " +
          (`On peut compléter jusqu’à la dizaine puis ajouter le reste. Ici, ${a} + ${b} = ${sum}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "mental_addition_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_addition",
    difficulty: 2,
    theme: "neutral",
    hint: "Tu peux ajouter 10 puis corriger.",
    tags: ["calcul_mental", "addition", "template"],
    generate: () => {
      const a = [104, 116, 127, 138][Math.floor(Math.random() * 4)];
      const b = [18, 24, 29][Math.floor(Math.random() * 3)];
      const sum = a + b;

      return {
        text: `Calcule : ${a} + ${b}`,
        format: "short",
        expected: [String(sum)],
        comparator: "number_equal",
        explanation: "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
          "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
          "Calcul : " +
          (`On peut décomposer le second nombre pour calculer mentalement. Ici, ${a} + ${b} = ${sum}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - SUBTRACTION
  // =========================
  {
    kind: "template",
    id: "mental_subtraction_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_subtraction",
    difficulty: 1,
    theme: "neutral",
    hint: "Retire d’abord jusqu’à la dizaine.",
    tags: ["calcul_mental", "soustraction", "template"],
    generate: () => {
      const a = [73, 84, 95, 106, 117][Math.floor(Math.random() * 5)];
      const b = [6, 7, 8, 9][Math.floor(Math.random() * 4)];
      const diff = a - b;

      return {
        text: `Calcule : ${a} - ${b}`,
        format: "short",
        expected: [String(diff)],
        comparator: "number_equal",
        explanation: "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
          "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
          "Calcul : " +
          (`On peut enlever une partie pour atteindre une dizaine, puis enlever le reste. Ici, ${a} - ${b} = ${diff}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "mental_subtraction_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_subtraction",
    difficulty: 2,
    theme: "neutral",
    hint: "Enlève les dizaines puis les unités.",
    tags: ["calcul_mental", "soustraction", "template"],
    generate: () => {
      const a = [92, 104, 115, 126][Math.floor(Math.random() * 4)];
      const b = [16, 24, 27][Math.floor(Math.random() * 3)];
      const diff = a - b;

      return {
        text: `Calcule : ${a} - ${b}`,
        format: "short",
        expected: [String(diff)],
        comparator: "number_equal",
        explanation: "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
          "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
          "Calcul : " +
          (`On peut décomposer ${b} en dizaines et unités. Ici, ${a} - ${b} = ${diff}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - MULTIPLICATION
  // =========================
  {
    kind: "template",
    id: "mental_multiplication_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_multiplication",
    difficulty: 1,
    theme: "neutral",
    hint: "Utilise les tables.",
    tags: ["calcul_mental", "multiplication", "template"],
    generate: () => {
      const a = [6, 7, 8, 9, 11][Math.floor(Math.random() * 5)];
      const b = [4, 5, 6, 7, 8][Math.floor(Math.random() * 5)];
      const product = a * b;

      return {
        text: `Calcule : ${a} × ${b}`,
        format: "short",
        expected: [String(product)],
        comparator: "number_equal",
        explanation: "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
          "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
          "Calcul : " +
          (`On utilise les tables de multiplication ou une décomposition simple. Ici, ${a} × ${b} = ${product}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "mental_multiplication_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_multiplication",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplier par 5, c’est parfois faire ×10 puis ÷2.",
    tags: ["calcul_mental", "multiplication", "template"],
    generate: () => {
      const a = [12, 16, 18, 22, 26][Math.floor(Math.random() * 5)];
      const b = 5;
      const product = a * b;

      return {
        text: `Calcule : ${a} × ${b}`,
        format: "short",
        expected: [String(product)],
        comparator: "number_equal",
        explanation: "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
          "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
          "Calcul : " +
          (`Multiplier par 5 revient à multiplier par 10 puis à prendre la moitié. Ici, ${a} × 5 = ${product}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - DIVISION
  // =========================
  {
    kind: "template",
    id: "mental_division_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_division",
    difficulty: 1,
    theme: "neutral",
    hint: "Cherche la table inverse.",
    tags: ["calcul_mental", "division", "template"],
    generate: () => {
      const divisor = [2, 3, 4, 5, 6, 7, 8, 9][Math.floor(Math.random() * 8)];
      const quotient = [5, 6, 7, 8, 9, 10][Math.floor(Math.random() * 6)];
      const dividend = divisor * quotient;

      return {
        text: `Calcule : ${dividend} ÷ ${divisor}`,
        format: "short",
        expected: [String(quotient)],
        comparator: "number_equal",
        explanation: "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
          "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
          "Calcul : " +
          (`On cherche le nombre qui multiplié par ${divisor} donne ${dividend}. C’est ${quotient}, donc ${dividend} ÷ ${divisor} = ${quotient}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "mental_division_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_division",
    difficulty: 1,
    theme: "neutral",
    hint: "Avec ÷10, la virgule se déplace.",
    tags: ["calcul_mental", "division", "template", "decimaux"],
    generate: () => {
      const values = [145, 236, 384, 645, 812];
      const dividend = values[Math.floor(Math.random() * values.length)];
      const quotient = dividend / 10;

      return {
        text: `Calcule : ${dividend} ÷ 10`,
        format: "short",
        expected: [String(quotient), formatComma(quotient)],
        comparator: "number_equal",
        explanation: "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
          "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
          "Calcul : " +
          (`Diviser par 10 décale la virgule d’un rang vers la gauche. Donc ${dividend} ÷ 10 = ${formatComma(
          quotient
        )}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - STRATEGIES
  // =========================
  {
    kind: "template",
    id: "mental_strategies_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_strategies",
    difficulty: 1,
    theme: "neutral",
    hint: "Double ou moitié.",
    tags: ["calcul_mental", "strategie", "template"],
    generate: () => {
      const type = Math.random() < 0.5 ? "double" : "moitie";

      if (type === "double") {
        const n = [30, 40, 50, 60, 70, 80, 90][
          Math.floor(Math.random() * 7)
        ];
        return {
          text: `Donne le double de ${n}.`,
          format: "short",
          expected: [String(n * 2)],
          comparator: "number_equal",
          explanation: "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
            "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
            "Calcul : " +
            (`Le double de ${n}, c’est ${n} + ${n}. Donc le résultat est ${n * 2}.`) +
            "\n\nConclusion : on garde la réponse obtenue.",
        };
      }

      const n = [14, 16, 18, 20, 24, 30, 40][
        Math.floor(Math.random() * 7)
      ];
      return {
        text: `Donne la moitié de ${n}.`,
        format: "short",
        expected: [String(n / 2)],
        comparator: "number_equal",
        explanation: "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
          "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
          "Calcul : " +
          (`La moitié de ${n}, c’est ${n} ÷ 2. Donc le résultat est ${n / 2}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "mental_strategies_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_strategies",
    difficulty: 1,
    theme: "neutral",
    hint: "Multiplier ou diviser par 10.",
    tags: ["calcul_mental", "strategie", "template", "decimaux"],
    generate: () => {
      const type = Math.random() < 0.5 ? "times10" : "divide10";

      if (type === "times10") {
        const n = [1.4, 2.7, 3.6, 4.23, 5.8][Math.floor(Math.random() * 5)];
        const answer = n * 10;
        return {
          text: `Calcule : ${formatComma(n)} × 10`,
          format: "short",
          expected: [String(answer), formatComma(answer)],
          comparator: "number_equal",
          explanation: "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
            "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
            "Calcul : " +
            (`Multiplier par 10 décale la virgule d’un rang vers la droite. Donc ${formatComma(
            n
          )} × 10 = ${formatComma(answer)}.`) +
            "\n\nConclusion : on garde la réponse obtenue.",
        };
      }

      const n = [140, 270, 360, 423, 580][Math.floor(Math.random() * 5)];
      const answer = n / 10;
      return {
        text: `Calcule : ${n} ÷ 10`,
        format: "short",
        expected: [String(answer), formatComma(answer)],
        comparator: "number_equal",
        explanation: "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
          "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
          "Calcul : " +
          (`Diviser par 10 décale la virgule d’un rang vers la gauche. Donc ${n} ÷ 10 = ${formatComma(
          answer
        )}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - PROBLEMES
  // =========================
  {
    kind: "template",
    id: "mental_defis_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_defis",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne les deux prix.",
    tags: ["calcul_mental", "probleme", "template"],
    generate: () => {
      const a = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
      const b = [11, 14, 17, 19][Math.floor(Math.random() * 4)];
      const total = a + b;

      return {
        text: `Dans un magasin, un cahier coûte ${a} € et une trousse coûte ${b} €. Combien paie-t-on en tout ?`,
        format: "short",
        expected: [String(total), `${total} €`, `${total}€`],
        comparator: "contains_keyword",
        explanation: "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
          "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
          "Calcul : " +
          (`On additionne les deux prix : ${a} + ${b} = ${total}. On paie donc ${total} €.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "mental_defis_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "mental_defis",
    difficulty: 2,
    theme: "reunion",
    hint: "Multiplie le nombre de rangées par le nombre d’arbres.",
    tags: ["calcul_mental", "probleme", "template", "reunion"],
    generate: () => {
      const rows = [5, 6, 7, 9][Math.floor(Math.random() * 4)];
      const perRow = [4, 5, 6, 7][Math.floor(Math.random() * 4)];
      const total = rows * perRow;

      return {
        text: `Dans un verger à La Réunion, il y a ${rows} rangées de ${perRow} arbres. Combien y a-t-il d’arbres en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
          "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
          "Calcul : " +
          (`Il y a ${rows} rangées de ${perRow} arbres. On calcule donc ${rows} × ${perRow} = ${total}. Il y a ${total} arbres en tout.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  // =========================
// TEMPLATES - DEFIS LONGUEURS
// =========================
{
  kind: "template",
  id: "mental_defis_longueurs_tpl_1",
  niveau: "6e",
  matiere: "maths",
  notionId: "calcul_mental",
  microId: "mental_defis",
  difficulty: 2,
  theme: "neutral",
  hint: "Additionne les longueurs.",
  tags: ["calcul_mental", "probleme", "template", "longueurs"],
  generate: () => {
    const a = [12, 15, 18, 20][Math.floor(Math.random() * 4)];
    const b = [5, 7, 9][Math.floor(Math.random() * 3)];
    const total = a + b;

    return {
      text: `Une corde mesure ${a} cm puis on ajoute ${b} cm. Quelle est la longueur totale ?`,
      format: "short",
      expected: [String(total), `${total} cm`, `${total}cm`],
      comparator: "contains_keyword",
      explanation: "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
        "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
        "Calcul : " +
        (`On additionne ${a} + ${b} = ${total}.`) +
        "\n\nConclusion : on garde la réponse obtenue.",
    };
  },
},
{
  kind: "template",
  id: "mental_defis_longueurs_tpl_2",
  niveau: "6e",
  matiere: "maths",
  notionId: "calcul_mental",
  microId: "mental_defis",
  difficulty: 2,
  theme: "cuisine",
  hint: "Soustrais la partie utilisée.",
  tags: ["calcul_mental", "probleme", "template", "longueurs"],
  generate: () => {
    const total = [40, 50, 60][Math.floor(Math.random() * 3)];
    const used = [12, 15, 20][Math.floor(Math.random() * 3)];
    const rest = total - used;

    return {
      text: `Un ruban de ${total} cm est utilisé pour un gâteau. On utilise ${used} cm. Combien reste-t-il ?`,
      format: "short",
      expected: [String(rest), `${rest} cm`, `${rest}cm`],
      comparator: "contains_keyword",
      explanation: "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
        "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
        "Calcul : " +
        (`${total} - ${used} = ${rest}.`) +
        "\n\nConclusion : on garde la réponse obtenue.",
    };
  },
},
{
  kind: "template",
  id: "mental_defis_longueurs_tpl_3",
  niveau: "6e",
  matiere: "maths",
  notionId: "calcul_mental",
  microId: "mental_defis",
  difficulty: 3,
  theme: "reunion",
  hint: "Multiplie.",
  tags: ["calcul_mental", "probleme", "template", "longueurs"],
  generate: () => {
    const rows = [4, 5, 6][Math.floor(Math.random() * 3)];
    const length = [7, 8, 9][Math.floor(Math.random() * 3)];
    const total = rows * length;

    return {
      text: `À La Réunion, un jardin a ${rows} rangées de ${length} m chacune. Quelle est la longueur totale ?`,
      format: "short",
      expected: [String(total), `${total} m`, `${total}m`],
      comparator: "contains_keyword",
      explanation: "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
        "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
        "Calcul : " +
        (`${rows} × ${length} = ${total}.`) +
        "\n\nConclusion : on garde la réponse obtenue.",
    };
  },
},
{
  kind: "template",
  id: "mental_defis_longueurs_tpl_4",
  niveau: "6e",
  matiere: "maths",
  notionId: "calcul_mental",
  microId: "mental_defis",
  difficulty: 3,
  theme: "sport",
  hint: "Partage.",
  tags: ["calcul_mental", "probleme", "template", "longueurs"],
  generate: () => {
    const total = [24, 30, 36][Math.floor(Math.random() * 3)];
    const parts = [4, 6][Math.floor(Math.random() * 2)];
    const each = total / parts;

    return {
      text: `Une piste de ${total} m est divisée en ${parts} parties égales. Quelle est la longueur d’une partie ?`,
      format: "short",
      expected: [String(each), `${each} m`, `${each}m`],
      comparator: "contains_keyword",
      explanation: "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
        "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
        "Calcul : " +
        (`${total} ÷ ${parts} = ${each}.`) +
        "\n\nConclusion : on garde la réponse obtenue.",
    };
  },
},
{
  kind: "template",
  id: "mental_defis_longueurs_tpl_5",
  niveau: "6e",
  matiere: "maths",
  notionId: "calcul_mental",
  microId: "mental_defis",
  difficulty: 4,
  theme: "jeux_video",
  hint: "Plusieurs étapes.",
  tags: ["calcul_mental", "probleme", "template", "longueurs"],
  generate: () => {
    const a = [15, 20][Math.floor(Math.random() * 2)];
    const b = [10, 12][Math.floor(Math.random() * 2)];
    const total = [40, 50][Math.floor(Math.random() * 2)];
    const rest = total - (a + b);

    return {
      text: `Dans un jeu, un personnage doit parcourir ${total} m. Il a déjà parcouru ${a} m puis ${b} m. Combien lui reste-t-il ?`,
      format: "short",
      expected: [String(rest), `${rest} m`, `${rest}m`],
      comparator: "contains_keyword",
      explanation: "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
        "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
        "Calcul : " +
        (`${a} + ${b} = ${a + b} puis ${total} - ${a + b} = ${rest}.`) +
        "\n\nConclusion : on garde la réponse obtenue.",
    };
  },
},
];