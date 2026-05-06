import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function formatComma(n: number | string) {
  return String(n).replace(".", ",");
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const longueursBank: TutorBankItemV4[] = [
  // =========================
  // LONGUEUR_MESURER
  // =========================
  {
    kind: "fixed",
    id: "longueur_mesurer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_mesurer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité est la plus adaptée pour mesurer la longueur d’un crayon ?",
    format: "qcm",
    choices: ["km", "m", "cm", "hm"],
    expected: ["cm"],
    comparator: "mcq_exact",
    hint: "Un crayon mesure environ quelques dizaines de centimètres.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Un crayon est un objet de petite taille. L’unité la plus adaptée est donc le centimètre.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "mesure", "unite"],
  },
  {
    kind: "fixed",
    id: "longueur_mesurer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_mesurer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité est la plus adaptée pour mesurer la distance entre deux villes ?",
    format: "qcm",
    choices: ["cm", "mm", "km", "dm"],
    expected: ["km"],
    comparator: "mcq_exact",
    hint: "Pour une grande distance, on utilise une grande unité.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("La distance entre deux villes est très grande. L’unité adaptée est donc le kilomètre.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "mesure", "unite"],
  },
  {
    kind: "fixed",
    id: "longueur_mesurer_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_mesurer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité est la plus adaptée pour mesurer l’épaisseur d’une pièce ?",
    format: "qcm",
    choices: ["km", "m", "cm", "mm"],
    expected: ["mm"],
    comparator: "mcq_exact",
    hint: "L’épaisseur d’un petit objet se mesure avec une petite unité.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("L’épaisseur d’une pièce est très petite. On la mesure donc en millimètres.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "mesure", "unite"],
  },
  {
    kind: "fixed",
    id: "longueur_mesurer_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle unité est la plus adaptée pour mesurer la longueur d’une salle de classe ?",
    format: "qcm",
    choices: ["mm", "cm", "m", "km"],
    expected: ["m"],
    comparator: "mcq_exact",
    hint: "Une salle de classe mesure plusieurs mètres.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Une salle de classe a une longueur de quelques mètres. L’unité la plus adaptée est donc le mètre.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "mesure", "unite"],
  },
  {
    kind: "fixed",
    id: "longueur_mesurer_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle unité est la plus adaptée pour mesurer la taille d’un élève ?",
    format: "qcm",
    choices: ["mm", "cm", "km", "hm"],
    expected: ["cm"],
    comparator: "mcq_exact",
    hint: "La taille d’un élève est souvent exprimée en centimètres.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("La taille d’un élève est généralement comprise entre 100 cm et 200 cm. L’unité adaptée est donc le centimètre.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "mesure", "unite"],
  },
  {
    kind: "fixed",
    id: "longueur_mesurer_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_mesurer",
    difficulty: 2,
    theme: "reunion",
    text: "Quelle unité est la plus adaptée pour mesurer la longueur d’un sentier de randonnée à La Réunion ?",
    format: "qcm",
    choices: ["mm", "cm", "m", "km"],
    expected: ["km"],
    comparator: "mcq_exact",
    hint: "Un sentier se mesure sur une grande distance.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Un sentier de randonnée mesure souvent plusieurs milliers de mètres. L’unité adaptée est donc le kilomètre.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "mesure", "reunion"],
  },

  // =========================
  // LONGUEUR_UNITES
  // =========================
  {
    kind: "fixed",
    id: "longueur_unites_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_unites",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de centimètres dans 1 mètre ?",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "1 m = 100 cm.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Dans le système métrique, 1 mètre correspond à 100 centimètres.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "unites"],
  },
  {
    kind: "fixed",
    id: "longueur_unites_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_unites",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de mètres dans 1 kilomètre ?",
    format: "short",
    expected: ["1000"],
    comparator: "number_equal",
    hint: "1 km = 1000 m.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Un kilomètre correspond à 1000 mètres.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "unites"],
  },
  {
    kind: "fixed",
    id: "longueur_unites_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_unites",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de millimètres dans 1 centimètre ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "1 cm = 10 mm.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Un centimètre correspond à 10 millimètres.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "unites"],
  },
  {
    kind: "fixed",
    id: "longueur_unites_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_unites",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de décimètres dans 1 mètre ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "1 m = 10 dm.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Un mètre contient 10 décimètres.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "unites"],
  },
  {
    kind: "fixed",
    id: "longueur_unites_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_unites",
    difficulty: 1,
    theme: "neutral",
    text: "1 m correspond à…",
    format: "qcm",
    choices: ["10 cm", "100 cm", "1000 cm", "1 cm"],
    expected: ["100 cm"],
    comparator: "mcq_exact",
    hint: "Le mètre est 100 fois plus grand que le centimètre.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Un mètre correspond à 100 centimètres. Le bon choix est donc 100 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "unites", "qcm"],
  },
  {
    kind: "fixed",
    id: "longueur_unites_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_unites",
    difficulty: 2,
    theme: "neutral",
    text: "1 km correspond à…",
    format: "qcm",
    choices: ["10 m", "100 m", "1000 m", "10000 m"],
    expected: ["1000 m"],
    comparator: "mcq_exact",
    hint: "Le kilomètre contient mille mètres.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Un kilomètre correspond à 1000 mètres. Le bon choix est donc 1000 m.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "unites", "qcm"],
  },

  // =========================
  // LONGUEUR_CONVERTIR
  // =========================
  {
    kind: "fixed",
    id: "longueur_convertir_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Convertis 2 m en cm.",
    format: "short",
    expected: ["200"],
    comparator: "number_equal",
    hint: "1 m = 100 cm.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Comme 1 m = 100 cm, 2 m = 2 × 100 = 200 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "conversion"],
  },
  {
    kind: "fixed",
    id: "longueur_convertir_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Convertis 300 cm en m.",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "On divise par 100.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Comme 100 cm = 1 m, 300 cm = 300 ÷ 100 = 3 m.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "conversion"],
  },
  {
    kind: "fixed",
    id: "longueur_convertir_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Convertis 4 km en m.",
    format: "short",
    expected: ["4000"],
    comparator: "number_equal",
    hint: "1 km = 1000 m.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Comme 1 km = 1000 m, 4 km = 4 × 1000 = 4000 m.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "conversion"],
  },
  {
    kind: "fixed",
    id: "longueur_convertir_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Convertis 70 mm en cm.",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "10 mm = 1 cm.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Comme 10 mm = 1 cm, 70 mm = 70 ÷ 10 = 7 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "conversion"],
  },
  {
    kind: "fixed",
    id: "longueur_convertir_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Convertis 2,5 m en cm.",
    format: "short",
    expected: ["250"],
    comparator: "number_equal",
    hint: "Multiplie par 100.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Comme 1 m = 100 cm, 2,5 m = 2,5 × 100 = 250 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "conversion"],
  },
  {
    kind: "fixed",
    id: "longueur_convertir_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Convertis 150 cm en m.",
    format: "short",
    expected: ["1,5", "1.5"],
    comparator: "number_equal",
    hint: "On divise par 100.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Comme 100 cm = 1 m, 150 cm = 150 ÷ 100 = 1,5 m.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "conversion"],
  },
  {
    kind: "fixed",
    id: "longueur_convertir_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Combien font 500 cm en mètres ?",
    format: "qcm",
    choices: ["5", "50", "0,5", "5000"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "On divise par 100.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("500 cm = 500 ÷ 100 = 5 m. Le bon choix est 5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "conversion", "qcm"],
  },
  {
    kind: "fixed",
    id: "longueur_convertir_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Combien font 3 km en mètres ?",
    format: "qcm",
    choices: ["30", "300", "3000", "30000"],
    expected: ["3000"],
    comparator: "mcq_exact",
    hint: "1 km = 1000 m.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("3 km = 3 × 1000 = 3000 m. Le bon choix est 3000.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "conversion", "qcm"],
  },
  {
    kind: "fixed",
    id: "longueur_convertir_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_convertir",
    difficulty: 3,
    theme: "reunion",
    text: "Un sentier de randonnée à La Réunion mesure 5 km. Combien cela fait-il en mètres ?",
    format: "short",
    expected: ["5000"],
    comparator: "number_equal",
    hint: "Chaque kilomètre vaut 1000 mètres.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Comme 1 km = 1000 m, 5 km = 5 × 1000 = 5000 m.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "conversion", "reunion"],
  },

  // =========================
  // LONGUEUR_COMPARER
  // =========================
  {
    kind: "fixed",
    id: "longueur_comparer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la plus grande longueur ?",
    format: "qcm",
    choices: ["2 m", "150 cm", "180 cm", "1 m"],
    expected: ["2 m"],
    comparator: "mcq_exact",
    hint: "Convertis tout en cm.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("2 m = 200 cm, 150 cm = 150 cm, 180 cm = 180 cm et 1 m = 100 cm. La plus grande longueur est donc 2 m.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "comparaison"],
  },
  {
    kind: "fixed",
    id: "longueur_comparer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la plus petite longueur ?",
    format: "qcm",
    choices: ["3 m", "250 cm", "280 cm", "320 cm"],
    expected: ["250 cm"],
    comparator: "mcq_exact",
    hint: "3 m = 300 cm.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("3 m = 300 cm. En comparant 300 cm, 250 cm, 280 cm et 320 cm, la plus petite longueur est 250 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "comparaison"],
  },
  {
    kind: "fixed",
    id: "longueur_comparer_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le plus grand : 1,5 m ou 140 cm ?",
    format: "short",
    expected: ["1,5 m", "1.5 m", "150 cm"],
    comparator: "contains_keyword",
    hint: "1,5 m = 150 cm.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("1,5 m = 150 cm. Comme 150 cm est plus grand que 140 cm, la plus grande longueur est 1,5 m.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "comparaison"],
  },
  {
    kind: "fixed",
    id: "longueur_comparer_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le plus petit : 2 m ou 190 cm ?",
    format: "short",
    expected: ["190 cm", "1,9 m", "1.9 m"],
    comparator: "contains_keyword",
    hint: "2 m = 200 cm.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("2 m = 200 cm. Comme 190 cm est plus petit que 200 cm, la plus petite longueur est 190 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "comparaison"],
  },
  {
    kind: "fixed",
    id: "longueur_comparer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la plus grande longueur ?",
    format: "qcm",
    choices: ["90 cm", "1 m", "95 cm", "99 cm"],
    expected: ["1 m"],
    comparator: "mcq_exact",
    hint: "1 m = 100 cm.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("1 m = 100 cm. Comme 100 cm est plus grand que 99 cm, 95 cm et 90 cm, la plus grande longueur est 1 m.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "comparaison", "qcm"],
  },
  {
    kind: "fixed",
    id: "longueur_comparer_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_comparer",
    difficulty: 3,
    theme: "reunion",
    text: "Quel sentier est le plus long : 3 km ou 2800 m ?",
    format: "short",
    expected: ["3 km", "3000 m"],
    comparator: "contains_keyword",
    hint: "3 km = 3000 m.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("3 km = 3000 m. Comme 3000 m est plus grand que 2800 m, le sentier de 3 km est le plus long.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "comparaison", "reunion"],
  },

  // =========================
  // LONGUEUR_PROBLEME
  // =========================
  {
    kind: "fixed",
    id: "longueur_probleme_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Un terrain mesure 10 m de long. On ajoute 5 m. Quelle est la nouvelle longueur ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Addition simple.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("On ajoute 5 m à 10 m, donc 10 + 5 = 15. La nouvelle longueur est 15 m.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "probleme"],
  },
  {
    kind: "fixed",
    id: "longueur_probleme_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Une corde mesure 2 m. On coupe 50 cm. Quelle longueur reste-t-il en cm ?",
    format: "short",
    expected: ["150"],
    comparator: "number_equal",
    hint: "2 m = 200 cm.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("2 m = 200 cm. Si on coupe 50 cm, il reste 200 - 50 = 150 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "probleme"],
  },
  {
    kind: "fixed",
    id: "longueur_probleme_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Une planche de 3 m est partagée en 3 parts égales. Quelle est la longueur d’une part en m ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Partage 3 m en 3 parts égales.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("3 m partagés en 3 parts égales donnent 3 ÷ 3 = 1. Une part mesure donc 1 m.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "probleme"],
  },
  {
    kind: "fixed",
    id: "longueur_probleme_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Un ruban mesure 250 cm. On utilise 100 cm. Quelle longueur reste-t-il ?",
    format: "short",
    expected: ["150"],
    comparator: "number_equal",
    hint: "Soustraction simple.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("On enlève 100 cm à 250 cm, donc 250 - 100 = 150 cm. Il reste 150 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "probleme"],
  },
  {
    kind: "fixed",
    id: "longueur_probleme_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Un ruban de 4 m est coupé en 2 morceaux égaux. Quelle est la longueur d’un morceau ?",
    format: "qcm",
    choices: ["1 m", "2 m", "3 m", "8 m"],
    expected: ["2 m"],
    comparator: "mcq_exact",
    hint: "4 ÷ 2 = 2.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Si 4 m sont partagés en 2 morceaux égaux, chaque morceau mesure 4 ÷ 2 = 2 m.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "probleme", "qcm"],
  },
  {
    kind: "fixed",
    id: "longueur_probleme_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_probleme",
    difficulty: 4,
    theme: "reunion",
    text: "Un sentier à La Réunion mesure 6 km. Une première partie fait 2 km. Quelle longueur reste-t-il à parcourir en km ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "On enlève 2 km à 6 km.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Il reste à parcourir 6 - 2 = 4 km.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "probleme", "reunion"],
  },

  // =========================
  // LONGUEUR_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "longueur_defis_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi ne peut-on pas mesurer une ville en centimètres ?",
    format: "short",
    expected: ["unité adaptée", "trop petit", "pas adapté", "grande distance"],
    comparator: "contains_keyword",
    hint: "On choisit une unité adaptée à la taille de ce qu’on mesure.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Une ville est très grande. Le centimètre est une unité trop petite et pas adaptée pour mesurer une si grande distance. On utilise plutôt les kilomètres.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "longueur_defis_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi 2 m est plus grand que 150 cm.",
    format: "short",
    expected: ["200", "150", "cm", "m"],
    comparator: "contains_keyword",
    hint: "Convertis tout dans la même unité.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("2 m = 200 cm. Comme 200 cm est plus grand que 150 cm, 2 m est plus grand que 150 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "longueur_defis_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Un objet mesure plus de 1 m et moins de 150 cm. Donne un exemple possible de longueur en cm.",
    format: "short",
    expected: ["101", "110", "120", "130", "140", "149"],
    comparator: "exact_text",
    hint: "1 m = 100 cm.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("1 m = 100 cm. On cherche donc une longueur plus grande que 100 cm et plus petite que 150 cm. Par exemple : 120 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "longueur_defis_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_defis",
    difficulty: 5,
    theme: "reunion",
    text: "À La Réunion, un trajet fait 2 km le matin et 1500 m l’après-midi. Quelle distance totale a-t-on parcourue en mètres ?",
    format: "short",
    expected: ["3500"],
    comparator: "number_equal",
    hint: "2 km = 2000 m.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("2 km = 2000 m. Ensuite 2000 m + 1500 m = 3500 m. La distance totale est donc 3500 m.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["longueurs", "defi", "reunion"],
  },

  // =========================
  // TEMPLATES - MESURER
  // =========================
  {
    kind: "template",
    id: "longueur_mesurer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_mesurer",
    difficulty: 1,
    theme: "neutral",
    hint: "Choisis une unité adaptée à la taille de l’objet.",
    tags: ["longueurs", "mesure", "template"],
    generate: () => {
      const items = [
        {
          obj: "une gomme",
          good: "cm",
          bad: ["km", "m", "hm"],
          explanation:
            "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
            "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
            "Calcul : " +
            ("Une gomme est un petit objet. Le centimètre est donc l’unité adaptée.") +
            "\n\nConclusion : on garde la réponse obtenue.",
        },
        {
          obj: "une route entre deux villes",
          good: "km",
          bad: ["cm", "mm", "dm"],
          explanation:
            "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
            "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
            "Calcul : " +
            ("La distance entre deux villes est grande. On la mesure donc en kilomètres.") +
            "\n\nConclusion : on garde la réponse obtenue.",
        },
        {
          obj: "un cahier",
          good: "cm",
          bad: ["km", "m", "hm"],
          explanation:
            "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
            "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
            "Calcul : " +
            ("Un cahier mesure quelques dizaines de centimètres. L’unité adaptée est le centimètre.") +
            "\n\nConclusion : on garde la réponse obtenue.",
        },
        {
          obj: "l’épaisseur d’un ongle",
          good: "mm",
          bad: ["m", "km", "cm"],
          explanation:
            "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
            "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
            "Calcul : " +
            ("L’épaisseur d’un ongle est très petite. On la mesure en millimètres.") +
            "\n\nConclusion : on garde la réponse obtenue.",
        },
      ];
      const item = items[Math.floor(Math.random() * items.length)];

      return {
        text: `Quelle unité est la plus adaptée pour mesurer ${item.obj} ?`,
        format: "qcm",
        choices: shuffle([item.good, ...item.bad]),
        expected: [item.good],
        comparator: "mcq_exact",
        explanation: item.explanation,
      };
    },
  },

  // =========================
  // TEMPLATES - UNITES
  // =========================
  {
    kind: "template",
    id: "longueur_unites_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_unites",
    difficulty: 1,
    theme: "neutral",
    hint: "Retiens les relations entre les unités.",
    tags: ["longueurs", "unites", "template"],
    generate: () => {
      const items = [
        {
          q: "Combien y a-t-il de centimètres dans 1 mètre ?",
          a: "100",
          explanation: "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
            "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
            "Calcul : " +
            ("1 mètre correspond à 100 centimètres.") +
            "\n\nConclusion : on garde la réponse obtenue.",
        },
        {
          q: "Combien y a-t-il de millimètres dans 1 centimètre ?",
          a: "10",
          explanation: "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
            "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
            "Calcul : " +
            ("1 centimètre correspond à 10 millimètres.") +
            "\n\nConclusion : on garde la réponse obtenue.",
        },
        {
          q: "Combien y a-t-il de mètres dans 1 kilomètre ?",
          a: "1000",
          explanation: "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
            "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
            "Calcul : " +
            ("1 kilomètre correspond à 1000 mètres.") +
            "\n\nConclusion : on garde la réponse obtenue.",
        },
      ];
      const item = items[Math.floor(Math.random() * items.length)];

      return {
        text: item.q,
        format: "short",
        expected: [item.a],
        comparator: "number_equal",
        explanation: item.explanation,
      };
    },
  },

  // =========================
  // TEMPLATES - CONVERTIR
  // =========================
  {
    kind: "template",
    id: "longueur_convertir_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "1 m = 100 cm.",
    tags: ["longueurs", "conversion", "template"],
    generate: () => {
      const m = [1, 2, 3, 4, 5][Math.floor(Math.random() * 5)];
      return {
        text: `Convertis ${m} m en cm.`,
        format: "short",
        expected: [String(m * 100)],
        comparator: "number_equal",
        explanation: "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
          "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
          "Calcul : " +
          (`${m} m = ${m} × 100 = ${m * 100} cm.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "longueur_convertir_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "1 km = 1000 m.",
    tags: ["longueurs", "conversion", "template"],
    generate: () => {
      const km = [1, 2, 3, 4, 6][Math.floor(Math.random() * 5)];
      return {
        text: `Convertis ${km} km en m.`,
        format: "short",
        expected: [String(km * 1000)],
        comparator: "number_equal",
        explanation: "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
          "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
          "Calcul : " +
          (`${km} km = ${km} × 1000 = ${km * 1000} m.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "longueur_convertir_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "Convertis avec l’unité juste.",
    tags: ["longueurs", "conversion", "qcm", "template"],
    generate: () => {
      const cm = [100, 200, 300, 400, 500][Math.floor(Math.random() * 5)];
      const good = String(cm / 100);

      return {
        text: `Combien font ${cm} cm en m ?`,
        format: "qcm",
        choices: shuffle([
          good,
          String(cm),
          formatComma(cm / 10),
          formatComma(cm / 1000),
        ]),
        expected: [good],
        comparator: "mcq_exact",
        explanation: "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
          "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
          "Calcul : " +
          (`${cm} cm = ${cm} ÷ 100 = ${good} m.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - COMPARER
  // =========================
  {
    kind: "template",
    id: "longueur_comparer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare dans la même unité.",
    tags: ["longueurs", "comparaison", "template"],
    generate: () => {
      let a = 100 + Math.floor(Math.random() * 200);
      let b = 100 + Math.floor(Math.random() * 200);
      while (a === b) {
        b = 100 + Math.floor(Math.random() * 200);
      }
      const good = Math.max(a, b);

      return {
        text: `Quelle est la plus grande longueur : ${a} cm ou ${b} cm ?`,
        format: "short",
        expected: [String(good)],
        comparator: "number_equal",
        explanation: "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
          "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
          "Calcul : " +
          (`En comparant ${a} cm et ${b} cm, la plus grande longueur est ${good} cm.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "longueur_comparer_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Convertis d’abord les mètres en centimètres.",
    tags: ["longueurs", "comparaison", "template"],
    generate: () => {
      const meters = [1, 2, 3][Math.floor(Math.random() * 3)];
      const centimeters = randomInt(80, 290);
      const metersInCm = meters * 100;
      const good = metersInCm > centimeters ? `${meters} m` : `${centimeters} cm`;

      return {
        text: `Quelle est la plus grande longueur : ${meters} m ou ${centimeters} cm ?`,
        format: "short",
        expected: [good, String(Math.max(metersInCm, centimeters))],
        comparator: "contains_keyword",
        explanation: "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
          "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
          "Calcul : " +
          (`${meters} m = ${metersInCm} cm. En comparant ${metersInCm} cm et ${centimeters} cm, la plus grande longueur est ${good}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - PROBLEME
  // =========================
  {
    kind: "template",
    id: "longueur_probleme_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne ou soustrais les longueurs.",
    tags: ["longueurs", "probleme", "template"],
    generate: () => {
      const a = randomInt(5, 20);
      const b = randomInt(2, 10);

      return {
        text: `Une corde mesure ${a} m. On ajoute ${b} m. Quelle est la nouvelle longueur ?`,
        format: "short",
        expected: [String(a + b)],
        comparator: "number_equal",
        explanation: "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
          "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
          "Calcul : " +
          (`On ajoute ${b} m à ${a} m, donc ${a} + ${b} = ${a + b}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "longueur_probleme_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Pense à convertir si nécessaire.",
    tags: ["longueurs", "probleme", "template"],
    generate: () => {
      const a = randomInt(2, 6) * 100;
      const b = randomInt(10, 90);

      return {
        text: `Une ficelle mesure ${a} cm. On coupe ${b} cm. Quelle longueur reste-t-il en cm ?`,
        format: "short",
        expected: [String(a - b)],
        comparator: "number_equal",
        explanation: "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
          "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
          "Calcul : " +
          (`On enlève ${b} cm à ${a} cm, donc ${a} - ${b} = ${a - b} cm.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - DEFIS
  // =========================
  {
    kind: "template",
    id: "longueur_defis_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_defis",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche une longueur qui respecte l’encadrement.",
    tags: ["longueurs", "defi", "template"],
    generate: () => {
      const low = randomInt(1, 4) * 100;
      const high = low + 50;

      return {
        text: `Donne une longueur en cm plus grande que ${low} cm et plus petite que ${high} cm.`,
        format: "short",
        expected: [String(low + 1), String(low + 10), String(high - 1)],
        comparator: "exact_text",
        explanation: "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
          "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
          "Calcul : " +
          (`On cherche une longueur strictement comprise entre ${low} cm et ${high} cm. Par exemple ${low + 10} cm convient.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "longueur_defis_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "longueurs",
    microId: "longueur_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Utilise la bonne unité et explique ton choix.",
    tags: ["longueurs", "defi", "template"],
    generate: () => {
      const items = [
        {
          item: "un stade",
          explanation:
            "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
            "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
            "Calcul : " +
            ("Un stade est grand. Une unité comme le mètre est adaptée, voire le kilomètre pour de très grandes distances.") +
            "\n\nConclusion : on garde la réponse obtenue.",
        },
        {
          item: "une aiguille",
          explanation:
            "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
            "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
            "Calcul : " +
            ("Une aiguille est très petite. Une unité comme le millimètre est adaptée.") +
            "\n\nConclusion : on garde la réponse obtenue.",
        },
        {
          item: "une route",
          explanation:
            "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
            "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
            "Calcul : " +
            ("Une route peut être très longue. Le kilomètre est souvent l’unité la plus adaptée.") +
            "\n\nConclusion : on garde la réponse obtenue.",
        },
        {
          item: "une table",
          explanation:
            "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
            "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
            "Calcul : " +
            ("Une table mesure généralement quelques mètres ou moins. Le mètre ou le centimètre sont adaptés.") +
            "\n\nConclusion : on garde la réponse obtenue.",
        },
      ];
      const item = items[Math.floor(Math.random() * items.length)];

      return {
        text: `Quelle unité choisirais-tu pour mesurer ${item.item} ? Explique pourquoi.`,
        format: "short",
        expected: ["unité", "adaptée", "mesurer"],
        comparator: "contains_keyword",
        explanation: item.explanation,
      };
    },
  },
];