import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function formatComma(n: number | string) {
  return String(n).replace(".", ",");
}

export const decimauxBank: TutorBankItemV4[] = [
  // =========================
  // DECIMAL_LIRE_ECRIRE
  // =========================
  {
    kind: "fixed",
    id: "decimal_lire_ecrire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_lire_ecrire",
    difficulty: 1,
    theme: "neutral",
    text: "Écris en décimal : 7/10",
    format: "short",
    expected: ["0,7", "0.7", "0,70", "0.70"],
    comparator: "fraction_decimal_equivalent",
    hint: "7 dixièmes = 0,7.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("7/10 signifie 7 dixièmes. Un dixième s’écrit 0,1, donc 7 dixièmes s’écrivent 0,7.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "ecriture"],
  },
  {
    kind: "fixed",
    id: "decimal_lire_ecrire_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_lire_ecrire",
    difficulty: 1,
    theme: "neutral",
    text: "Écris en décimal : 3/10",
    format: "short",
    expected: ["0,3", "0.3", "0,30", "0.30"],
    comparator: "fraction_decimal_equivalent",
    hint: "3 dixièmes = 0,3.",
    explanation: "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("3/10 signifie 3 dixièmes. Cela s’écrit 0,3.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "ecriture"],
  },
  {
    kind: "fixed",
    id: "decimal_lire_ecrire_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_lire_ecrire",
    difficulty: 1,
    theme: "neutral",
    text: "Écris en décimal : 9/10",
    format: "short",
    expected: ["0,9", "0.9", "0,90", "0.90"],
    comparator: "fraction_decimal_equivalent",
    hint: "9 dixièmes = 0,9.",
    explanation: "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("9/10 signifie 9 dixièmes. Cela s’écrit 0,9.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "ecriture"],
  },
  {
    kind: "fixed",
    id: "decimal_lire_ecrire_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    text: "Écris en décimal : 25/10",
    format: "short",
    expected: ["2,5", "2.5", "2,50", "2.50"],
    comparator: "fraction_decimal_equivalent",
    hint: "25 dixièmes = 2 unités et 5 dixièmes.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("25/10 signifie 25 dixièmes. 20 dixièmes font 2 unités et il reste 5 dixièmes. Donc cela s’écrit 2,5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "ecriture"],
  },
  {
    kind: "fixed",
    id: "decimal_lire_ecrire_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture décimale correspond à 9/10 ?",
    format: "qcm",
    choices: ["0,09", "0,9", "9,0", "0,900"],
    expected: ["0,9"],
    comparator: "mcq_exact",
    hint: "9/10 signifie 9 dixièmes.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("9/10 signifie 9 dixièmes. L’écriture correcte est 0,9. 0,09 correspondrait à 9 centièmes.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "ecriture", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_lire_ecrire_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture décimale correspond à 15/10 ?",
    format: "qcm",
    choices: ["1,5", "0,15", "15,0", "1,05"],
    expected: ["1,5"],
    comparator: "mcq_exact",
    hint: "15 dixièmes = 1,5.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("15/10 signifie 15 dixièmes. Cela fait 1 unité et 5 dixièmes, donc 1,5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "ecriture", "qcm"],
  },

  // =========================
  // DECIMAL_RANG
  // =========================
  {
    kind: "fixed",
    id: "decimal_rang_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_rang",
    difficulty: 1,
    theme: "neutral",
    text: "Dans 3,4, quel chiffre est au rang des dixièmes ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Le chiffre des dixièmes est juste après la virgule.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Dans 3,4, le chiffre placé juste après la virgule est 4. Il est donc au rang des dixièmes.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "rang"],
  },
  {
    kind: "fixed",
    id: "decimal_rang_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_rang",
    difficulty: 1,
    theme: "neutral",
    text: "Dans 5,83, quel chiffre est au rang des centièmes ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Le chiffre des centièmes est le deuxième après la virgule.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Dans 5,83, le premier chiffre après la virgule est 8 pour les dixièmes, et le deuxième est 3 pour les centièmes.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "rang"],
  },
  {
    kind: "fixed",
    id: "decimal_rang_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_rang",
    difficulty: 2,
    theme: "neutral",
    text: "Dans 12,764, quel chiffre est au rang des dixièmes ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Le chiffre des dixièmes est le premier après la virgule.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Dans 12,764, le chiffre 7 est juste après la virgule. C’est donc le chiffre des dixièmes.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "rang"],
  },
  {
    kind: "fixed",
    id: "decimal_rang_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_rang",
    difficulty: 2,
    theme: "neutral",
    text: "Dans 12,764, quel chiffre est au rang des millièmes ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Le chiffre des millièmes est le troisième après la virgule.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Dans 12,764, les chiffres après la virgule sont 7, 6 et 4. Le troisième, 4, est au rang des millièmes.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "rang"],
  },
  {
    kind: "fixed",
    id: "decimal_rang_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_rang",
    difficulty: 2,
    theme: "neutral",
    text: "Dans 4,58, quel chiffre est au rang des dixièmes ?",
    format: "qcm",
    choices: ["4", "5", "8", "0"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Regarde le premier chiffre après la virgule.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Dans 4,58, le premier chiffre après la virgule est 5. Il est donc au rang des dixièmes.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "rang", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_rang_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_rang",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le rang du chiffre 6 dans 3,264 ?",
    format: "qcm",
    choices: ["dixièmes", "centièmes", "millièmes", "unités"],
    expected: ["centièmes"],
    comparator: "mcq_exact",
    hint: "Après la virgule : 2 = dixièmes, 6 = centièmes, 4 = millièmes.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Dans 3,264, le 2 est au rang des dixièmes, le 6 au rang des centièmes et le 4 au rang des millièmes. Le 6 est donc au rang des centièmes.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "rang", "qcm"],
  },

  // =========================
  // DECIMAL_COMPARER
  // =========================
  {
    kind: "fixed",
    id: "decimal_compare_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel nombre est le plus grand : 0,7 ou 0,65 ?",
    format: "short",
    expected: ["0,7", "0.7", "0,70", "0.70"],
    comparator: "number_equal",
    hint: "Compare d’abord les dixièmes.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("0,7 = 0,70. On compare donc 0,70 et 0,65. Comme 70 centièmes est plus grand que 65 centièmes, la bonne réponse est 0,7.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "comparaison"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel nombre est le plus petit : 0,4 ou 0,09 ?",
    format: "short",
    expected: ["0,09", "0.09", "0,090", "0.090"],
    comparator: "number_equal",
    hint: "0,09 a 0 dixième et 9 centièmes.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("0,4 = 0,40. On compare donc 0,40 et 0,09. Comme 9 centièmes est plus petit que 40 centièmes, la bonne réponse est 0,09.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "comparaison"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel nombre est le plus grand : 0,3 ou 0,27 ?",
    format: "short",
    expected: ["0,3", "0.3", "0,30", "0.30"],
    comparator: "number_equal",
    hint: "Compare 0,30 et 0,27.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("0,3 = 0,30. On compare 30 centièmes à 27 centièmes. Comme 30 est plus grand que 27, la bonne réponse est 0,3.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "comparaison"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre est le plus petit : 0,52 ou 0,507 ?",
    format: "short",
    expected: ["0,507", "0.507"],
    comparator: "number_equal",
    hint: "Compare 0,520 et 0,507.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("0,52 = 0,520. On compare donc 520 millièmes et 507 millièmes. Comme 507 est plus petit que 520, la bonne réponse est 0,507.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "comparaison"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_trap_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le plus grand : 0,5 ou 0,45 ?",
    format: "short",
    expected: ["0,5", "0.5", "0,50", "0.50"],
    comparator: "number_equal",
    hint: "0,50 vs 0,45.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("0,5 = 0,50. On compare 50 centièmes à 45 centièmes. Comme 50 est plus grand que 45, la bonne réponse est 0,5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "comparaison", "piege"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_trap_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le plus petit : 0,305 ou 0,35 ?",
    format: "short",
    expected: ["0,305", "0.305"],
    comparator: "number_equal",
    hint: "Écris 0,35 sous la forme 0,350.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("0,35 = 0,350. On compare donc 305 millièmes à 350 millièmes. Comme 305 est plus petit que 350, la bonne réponse est 0,305.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "comparaison", "piege"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le plus grand nombre ?",
    format: "qcm",
    choices: ["0,54", "0,45", "0,5", "0,49"],
    expected: ["0,54"],
    comparator: "mcq_exact",
    hint: "Compare chiffre par chiffre après la virgule.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("0,54 = 54 centièmes. Les autres valent 45 centièmes, 50 centièmes et 49 centièmes. Le plus grand est donc 0,54.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "comparaison", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le plus grand nombre ?",
    format: "qcm",
    choices: ["0,41", "0,401", "0,39", "0,4"],
    expected: ["0,41"],
    comparator: "mcq_exact",
    hint: "0,41 = 0,410.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("0,41 = 0,410, 0,401 = 0,401, 0,39 = 0,390 et 0,4 = 0,400. Le plus grand est donc 0,41.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "comparaison", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_comparer",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, un fruit coûte 2,5 € et un autre 2,45 €. Lequel coûte le plus cher ?",
    format: "short",
    expected: ["2,5", "2.5", "2,50", "2.50"],
    comparator: "number_equal",
    hint: "Compare 2,50 et 2,45.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("2,5 € = 2,50 €. En comparant 2,50 € et 2,45 €, on voit que 2,50 € est plus grand. Le fruit à 2,5 € coûte donc le plus cher.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "comparaison", "reunion"],
  },

  // =========================
  // DECIMAL_ADDITIONNER
  // =========================
  {
    kind: "fixed",
    id: "decimal_add_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 1,2 + 0,5",
    format: "short",
    expected: ["1,7", "1.7", "1,70", "1.70"],
    comparator: "number_equal",
    hint: "Aligne bien les virgules.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("1,2 + 0,5 = 12 dixièmes + 5 dixièmes = 17 dixièmes, donc 1,7.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "addition"],
  },
  {
    kind: "fixed",
    id: "decimal_add_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 2,4 + 1,3",
    format: "short",
    expected: ["3,7", "3.7", "3,70", "3.70"],
    comparator: "number_equal",
    hint: "Additionne les unités puis les dixièmes.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("2,4 + 1,3 = 24 dixièmes + 13 dixièmes = 37 dixièmes, donc 3,7.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "addition"],
  },
  {
    kind: "fixed",
    id: "decimal_add_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_additionner",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule : 3,45 + 1,7",
    format: "short",
    expected: ["5,15", "5.15"],
    comparator: "number_equal",
    hint: "Ajoute un zéro : 1,70.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("On écrit 1,7 sous la forme 1,70. Puis 3,45 + 1,70 = 5,15.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "addition"],
  },
  {
    kind: "fixed",
    id: "decimal_add_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_additionner",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule : 0,75 + 2,8",
    format: "short",
    expected: ["3,55", "3.55"],
    comparator: "number_equal",
    hint: "Écris 2,8 sous la forme 2,80.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("On écrit 2,8 sous la forme 2,80. Puis 0,75 + 2,80 = 3,55.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "addition"],
  },
  {
    kind: "fixed",
    id: "decimal_add_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 0,6 + 0,9",
    format: "short",
    expected: ["1,5", "1.5", "1,50", "1.50"],
    comparator: "number_equal",
    hint: "6 dixièmes + 9 dixièmes = 15 dixièmes.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("0,6 + 0,9 = 6 dixièmes + 9 dixièmes = 15 dixièmes, donc 1,5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "addition"],
  },
  {
    kind: "fixed",
    id: "decimal_add_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_additionner",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 2,35 + 1,4",
    format: "short",
    expected: ["3,75", "3.75"],
    comparator: "number_equal",
    hint: "Écris 1,4 sous la forme 1,40.",
    explanation: "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("On écrit 1,4 = 1,40. Puis 2,35 + 1,40 = 3,75.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "addition"],
  },
  {
    kind: "fixed",
    id: "decimal_add_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le résultat de 0,8 + 0,7 ?",
    format: "qcm",
    choices: ["1,5", "0,15", "1,4", "1,6"],
    expected: ["1,5"],
    comparator: "mcq_exact",
    hint: "8 dixièmes + 7 dixièmes = 15 dixièmes.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("0,8 + 0,7 = 8 dixièmes + 7 dixièmes = 15 dixièmes, donc 1,5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "addition", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_add_challenge_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_additionner",
    difficulty: 5,
    theme: "neutral",
    text: "Je pense à un nombre. Si j’ajoute 1,5, j’obtiens 3,2. Quel est ce nombre ?",
    format: "short",
    expected: ["1,7", "1.7"],
    comparator: "number_equal",
    hint: "On peut faire l’opération inverse.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Si x + 1,5 = 3,2, alors x = 3,2 - 1,5 = 1,7.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "addition", "defi"],
  },

  // =========================
  // DECIMAL_MULTIPLIER
  // =========================
  {
    kind: "fixed",
    id: "decimal_multiply_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_multiplier",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 0,5 × 4",
    format: "short",
    expected: ["2", "2,0", "2.0"],
    comparator: "number_equal",
    hint: "0,5 c’est la moitié.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("0,5 est la moitié de 1. Quatre moitiés font 2. Donc 0,5 × 4 = 2.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "multiplication"],
  },
  {
    kind: "fixed",
    id: "decimal_multiply_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_multiplier",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 1,5 × 2",
    format: "short",
    expected: ["3", "3,0", "3.0"],
    comparator: "number_equal",
    hint: "1,5 + 1,5 = 3.",
    explanation: "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Multiplier par 2 revient à doubler. Le double de 1,5 est 3.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "multiplication"],
  },
  {
    kind: "fixed",
    id: "decimal_multiply_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_multiplier",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule : 2,4 × 3",
    format: "short",
    expected: ["7,2", "7.2"],
    comparator: "number_equal",
    hint: "2,4 + 2,4 + 2,4.",
    explanation: "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("2,4 × 3 = 2,4 + 2,4 + 2,4 = 7,2.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "multiplication"],
  },
  {
    kind: "fixed",
    id: "decimal_multiply_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_multiplier",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule : 0,25 × 4",
    format: "short",
    expected: ["1", "1,0", "1.0"],
    comparator: "number_equal",
    hint: "Un quart multiplié par 4 donne 1.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("0,25 représente un quart. Quatre quarts font 1. Donc 0,25 × 4 = 1.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "multiplication"],
  },
  {
    kind: "fixed",
    id: "decimal_multiply_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_multiplier",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le résultat de 2,5 × 2 ?",
    format: "qcm",
    choices: ["4,5", "5", "0,5", "25"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Doubler 2,5 donne 5.",
    explanation: "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Multiplier par 2 revient à doubler. Le double de 2,5 est 5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "multiplication", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_multiply_challenge_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_multiplier",
    difficulty: 5,
    theme: "neutral",
    text: "Un objet coûte 2,5 €. Combien coûtent 6 objets ?",
    format: "short",
    expected: ["15", "15,0", "15.0"],
    comparator: "number_equal",
    hint: "Multiplie 2,5 par 6.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Chaque objet coûte 2,5 €. Pour 6 objets, on calcule 2,5 × 6 = 15. Le total est donc 15 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "multiplication", "defi"],
  },

  // =========================
  // DECIMAL_DIVISER_PAR_ENTIER
  // =========================
  {
    kind: "fixed",
    id: "decimal_divide_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_diviser_par_entier",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 3,6 ÷ 2",
    format: "short",
    expected: ["1,8", "1.8", "1,80", "1.80"],
    comparator: "number_equal",
    hint: "Partager 3,6 en 2 parts égales.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("3,6 partagé en 2 parts égales donne 1,8 dans chaque part. Donc 3,6 ÷ 2 = 1,8.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "division"],
  },
  {
    kind: "fixed",
    id: "decimal_divide_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_diviser_par_entier",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 4,8 ÷ 4",
    format: "short",
    expected: ["1,2", "1.2", "1,20", "1.20"],
    comparator: "number_equal",
    hint: "48 dixièmes ÷ 4 = 12 dixièmes.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("4,8 = 48 dixièmes. 48 dixièmes divisés par 4 donnent 12 dixièmes, soit 1,2.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "division"],
  },
  {
    kind: "fixed",
    id: "decimal_divide_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_diviser_par_entier",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule : 5,6 ÷ 4",
    format: "short",
    expected: ["1,4", "1.4"],
    comparator: "number_equal",
    hint: "56 dixièmes ÷ 4 = 14 dixièmes.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("56 dixièmes divisés par 4 donnent 14 dixièmes, soit 1,4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "division"],
  },
  {
    kind: "fixed",
    id: "decimal_divide_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_diviser_par_entier",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule : 9,6 ÷ 3",
    format: "short",
    expected: ["3,2", "3.2"],
    comparator: "number_equal",
    hint: "96 dixièmes ÷ 3 = 32 dixièmes.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("96 dixièmes divisés par 3 donnent 32 dixièmes, soit 3,2.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "division"],
  },
  {
    kind: "fixed",
    id: "decimal_divide_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_diviser_par_entier",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le résultat de 2,4 ÷ 2 ?",
    format: "qcm",
    choices: ["1,2", "0,12", "2,2", "1,4"],
    expected: ["1,2"],
    comparator: "mcq_exact",
    hint: "2,4 partagé en 2 fait 1,2.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Partager 2,4 en 2 parts égales donne 1,2 dans chaque part.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "division", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_divide_challenge_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_diviser_par_entier",
    difficulty: 5,
    theme: "neutral",
    text: "On partage 7,5 litres d’eau en 5 bouteilles. Combien dans chaque bouteille ?",
    format: "short",
    expected: ["1,5", "1.5"],
    comparator: "number_equal",
    hint: "Calcule 7,5 ÷ 5.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Si 7,5 litres sont partagés dans 5 bouteilles, on calcule 7,5 ÷ 5 = 1,5. Chaque bouteille contient donc 1,5 litre.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "division", "defi"],
  },

  // =========================
  // DECIMAL_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "decimal_defis_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_defis",
    difficulty: 1,
    theme: "neutral",
    text: "10 % de 60 = ?",
    format: "qcm",
    choices: ["3", "6", "10", "60"],
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "10 % = 0,1.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("10 % signifie 10 sur 100, donc 0,1. Ainsi 0,1 × 60 = 6.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "defi", "pourcentage", "calcul"],
  },
  {
    kind: "fixed",
    id: "decimal_defis_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_defis",
    difficulty: 1,
    theme: "neutral",
    text: "D’où vient le mot « décimal » ?",
    format: "qcm",
    choices: ["du nombre 2", "du nombre 5", "du nombre 10", "du nombre 100"],
    expected: ["du nombre 10"],
    comparator: "mcq_exact",
    hint: "Décimal vient de « dix ».",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Le mot « décimal » vient du latin lié au nombre dix. Notre système d’écriture usuel est un système en base 10.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "defi", "culture", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_defis_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_defis",
    difficulty: 2,
    theme: "neutral",
    text: "La soustraction de deux nombres entiers peut-elle donner un nombre décimal ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Entier - entier = entier.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Quand on soustrait deux nombres entiers, le résultat reste un entier. On n’obtient donc pas de nombre décimal dans ce cas.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "defi", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_defis_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_defis",
    difficulty: 2,
    theme: "neutral",
    text: "Comment partager un gâteau en 6 parts parfaitement égales ?",
    format: "qcm",
    choices: [
      "couper au hasard",
      "faire 3 parts",
      "faire des angles de 60°",
      "faire 2 parts",
    ],
    expected: ["faire des angles de 60°"],
    comparator: "mcq_exact",
    hint: "360 ÷ 6 = 60°.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Un cercle mesure 360°. Pour faire 6 parts égales, on partage 360 par 6, ce qui donne 60°. Il faut donc faire des secteurs de 60°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "defi", "geometrie", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_defis_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_defis",
    difficulty: 3,
    theme: "reunion",
    text: "À La Réunion, un sentier fait 2,5 km. Que représente le 0,5 ?",
    format: "qcm",
    choices: ["5 m", "50 m", "500 m", "5 km"],
    expected: ["500 m"],
    comparator: "mcq_exact",
    hint: "1 km = 1000 m.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("0,5 km signifie la moitié d’un kilomètre. Or 1 km = 1000 m, donc 0,5 km = 500 m.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "defi", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_defis_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_defis",
    difficulty: 3,
    theme: "neutral",
    text: "Un requin nage à 2,75 m/s. Pourquoi utilise-t-on 2,75 et pas 2 ou 3 ?",
    format: "qcm",
    choices: [
      "pour faire joli",
      "pour aller plus vite",
      "pour être plus précis",
      "pour simplifier",
    ],
    expected: ["pour être plus précis"],
    comparator: "mcq_exact",
    hint: "Les décimaux permettent une mesure plus fine.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("2,75 est plus précis que 2 ou 3. Les nombres décimaux servent justement à donner une valeur plus exacte.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "defi", "sens", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_defis_fixed_7",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_defis",
    difficulty: 4,
    theme: "neutral",
    text: "L’addition est de 20 €. Tu laisses 5 % de pourboire. Combien vaut le pourboire ?",
    format: "qcm",
    choices: ["0,5 €", "1 €", "5 €", "10 €"],
    expected: ["1 €"],
    comparator: "mcq_exact",
    hint: "5 % = 5/100 = 0,05.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("5 % de 20 €, c’est 0,05 × 20 = 1 €. Le pourboire est donc de 1 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "defi", "pourcentage", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_defis_fixed_8",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un cercle, combien mesure chaque part si on le coupe en 6 parts égales ?",
    format: "qcm",
    choices: ["30°", "45°", "60°", "90°"],
    expected: ["60°"],
    comparator: "mcq_exact",
    hint: "360 ÷ 6.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Un cercle complet mesure 360°. En le partageant en 6 parts égales, on obtient 360 ÷ 6 = 60°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "defi", "geometrie", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_defis_fixed_9",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi le système décimal (base 10) est-il utilisé ?",
    format: "qcm",
    choices: [
      "pour compliquer",
      "pour écrire plus",
      "pour simplifier les calculs",
      "pour faire joli",
    ],
    expected: ["pour simplifier les calculs"],
    comparator: "mcq_exact",
    hint: "Le regroupement par 10 est pratique.",
    explanation:
      "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
      "Calcul : " +
      ("Le système décimal est pratique car il permet d’écrire les nombres et de faire les calculs simplement avec des regroupements par 10, 100, 1000, etc.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["decimaux", "defi", "raisonnement", "qcm"],
  },

  // =========================
  // TEMPLATES - DECIMAL_LIRE_ECRIRE
  // =========================
  {
    kind: "template",
    id: "decimal_lire_ecrire_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_lire_ecrire",
    difficulty: 1,
    theme: "neutral",
    hint: "n/10 = n dixièmes.",
    tags: ["decimaux", "ecriture", "template"],
    generate: () => {
      const numerators = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const n = numerators[Math.floor(Math.random() * numerators.length)];
      const decimal = (n / 10).toFixed(1);
      const decimalComma = decimal.replace(".", ",");

      return {
        text: `Écris en décimal : ${n}/10`,
        format: "short",
        expected: [decimal, decimalComma],
        comparator: "fraction_decimal_equivalent",
        explanation: "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
          "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
          "Calcul : " +
          (`${n}/10 signifie ${n} dixièmes. Cela s’écrit ${decimalComma}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "decimal_lire_ecrire_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    hint: "Le numérateur peut être plus grand que 10.",
    tags: ["decimaux", "ecriture", "template"],
    generate: () => {
      const numerators = [12, 15, 18, 24, 27, 35];
      const n = numerators[Math.floor(Math.random() * numerators.length)];
      const decimal = (n / 10).toFixed(1);
      const decimalComma = decimal.replace(".", ",");

      return {
        text: `Écris en décimal : ${n}/10`,
        format: "short",
        expected: [decimal, decimalComma],
        comparator: "fraction_decimal_equivalent",
        explanation: "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
          "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
          "Calcul : " +
          (`${n}/10 signifie ${n} dixièmes. Cela correspond à ${decimalComma}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "decimal_lire_ecrire_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    hint: "Attention aux zéros inutiles.",
    tags: ["decimaux", "ecriture", "qcm", "template"],
    generate: () => {
      const numerators = [2, 3, 4, 5, 6, 7, 8, 9];
      const n = numerators[Math.floor(Math.random() * numerators.length)];
      const good = (n / 10).toFixed(1).replace(".", ",");

      const distractors = Array.from(
        new Set([`0,0${n}`, `${n},0`, `0,${n}0`])
      )
        .filter((x) => x !== good)
        .slice(0, 3);

      const choices = shuffle([good, ...distractors]);

      return {
        text: `Quelle écriture décimale correspond à ${n}/10 ?`,
        format: "qcm",
        choices,
        expected: [good],
        comparator: "mcq_exact",
        explanation: "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
          "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
          "Calcul : " +
          (`${n}/10 signifie ${n} dixièmes. L’écriture décimale correcte est ${good}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - DECIMAL_RANG
  // =========================
  {
    kind: "template",
    id: "decimal_rang_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_rang",
    difficulty: 1,
    theme: "neutral",
    hint: "Le chiffre des dixièmes est le premier après la virgule.",
    tags: ["decimaux", "rang", "template"],
    generate: () => {
      const unit = Math.floor(Math.random() * 9) + 1;
      const tenth = Math.floor(Math.random() * 9);
      const number = `${unit},${tenth}`;

      return {
        text: `Dans ${number}, quel chiffre est au rang des dixièmes ?`,
        format: "short",
        expected: [String(tenth)],
        comparator: "number_equal",
        explanation: "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
          "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
          "Calcul : " +
          (`Dans ${number}, le chiffre placé juste après la virgule est ${tenth}. C’est donc le chiffre des dixièmes.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "decimal_rang_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_rang",
    difficulty: 2,
    theme: "neutral",
    hint: "Le chiffre des centièmes est le deuxième après la virgule.",
    tags: ["decimaux", "rang", "template"],
    generate: () => {
      const unit = Math.floor(Math.random() * 9) + 1;
      const tenth = Math.floor(Math.random() * 9);
      const hundredth = Math.floor(Math.random() * 9);
      const number = `${unit},${tenth}${hundredth}`;

      return {
        text: `Dans ${number}, quel chiffre est au rang des centièmes ?`,
        format: "short",
        expected: [String(hundredth)],
        comparator: "number_equal",
        explanation: "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
          "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
          "Calcul : " +
          (`Dans ${number}, le premier chiffre après la virgule est ${tenth} pour les dixièmes et le deuxième est ${hundredth} pour les centièmes.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - DECIMAL_COMPARER
  // =========================
  {
    kind: "template",
    id: "decimal_compare_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_comparer",
    difficulty: 1,
    theme: "neutral",
    hint: "Compare d’abord les dixièmes, puis les centièmes.",
    tags: ["decimaux", "comparaison", "template"],
    generate: () => {
      let a = Number((Math.random() * 0.8 + 0.1).toFixed(2));
      let b = Number((Math.random() * 0.8 + 0.1).toFixed(2));

      while (a === b) {
        b = Number((Math.random() * 0.8 + 0.1).toFixed(2));
      }

      const max = Math.max(a, b);
      const min = Math.min(a, b);

      return {
        text: `Quel nombre est le plus grand : ${formatComma(a)} ou ${formatComma(b)} ?`,
        format: "short",
        expected: [String(max), formatComma(max)],
        comparator: "number_equal",
        explanation: "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
          "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
          "Calcul : " +
          (`On compare ${formatComma(a)} et ${formatComma(b)}. Le plus grand est ${formatComma(
          max
        )} et le plus petit est ${formatComma(min)}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "decimal_compare_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Le plus petit n’est pas toujours celui qui a le plus de chiffres.",
    tags: ["decimaux", "comparaison", "template"],
    generate: () => {
      let a = Number((Math.random() * 0.9 + 0.05).toFixed(3));
      let b = Number((Math.random() * 0.9 + 0.05).toFixed(3));

      while (a === b) {
        b = Number((Math.random() * 0.9 + 0.05).toFixed(3));
      }

      const min = Math.min(a, b);
      const max = Math.max(a, b);

      return {
        text: `Quel nombre est le plus petit : ${formatComma(a)} ou ${formatComma(b)} ?`,
        format: "short",
        expected: [String(min), formatComma(min)],
        comparator: "number_equal",
        explanation: "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
          "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
          "Calcul : " +
          (`On compare ${formatComma(a)} et ${formatComma(b)}. Le plus petit est ${formatComma(
          min
        )} et le plus grand est ${formatComma(max)}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "decimal_compare_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Si les dixièmes sont identiques, compare les centièmes.",
    tags: ["decimaux", "comparaison", "qcm", "template"],
    generate: () => {
      const base = [0.2, 0.3, 0.4, 0.5, 0.6][
        Math.floor(Math.random() * 5)
      ];
      const good = Number((base + 0.04).toFixed(2));
      const d1 = Number((base + 0.01).toFixed(2));
      const d2 = Number((base + 0.02).toFixed(2));
      const d3 = Number((base + 0.03).toFixed(2));

      const choices = shuffle([
        formatComma(good),
        formatComma(d1),
        formatComma(d2),
        formatComma(d3),
      ]);

      return {
        text: "Quel est le plus grand nombre ?",
        format: "qcm",
        choices,
        expected: [formatComma(good)],
        comparator: "mcq_exact",
        explanation: "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
          "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
          "Calcul : " +
          (`${formatComma(good)} est le plus grand nombre proposé.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - DECIMAL_ADDITIONNER
  // =========================
  {
    kind: "template",
    id: "decimal_add_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_additionner",
    difficulty: 2,
    theme: "neutral",
    hint: "Aligne les virgules.",
    tags: ["decimaux", "addition", "template"],
    generate: () => {
      const a = Number((Math.floor(Math.random() * 20) / 10).toFixed(1));
      const b = Number((Math.floor(Math.random() * 20) / 10).toFixed(1));
      const sum = Number((a + b).toFixed(1));

      return {
        text: `Calcule : ${formatComma(a)} + ${formatComma(b)}`,
        format: "short",
        expected: [String(sum), formatComma(sum)],
        comparator: "number_equal",
        explanation: "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
          "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
          "Calcul : " +
          (`${formatComma(a)} + ${formatComma(b)} = ${formatComma(
          sum
        )}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "decimal_add_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_additionner",
    difficulty: 3,
    theme: "neutral",
    hint: "Tu peux ajouter des zéros pour aligner.",
    tags: ["decimaux", "addition", "template"],
    generate: () => {
      const a = Number((Math.random() * 5).toFixed(2));
      const b = Number((Math.random() * 5).toFixed(2));
      const sum = Number((a + b).toFixed(2));

      return {
        text: `Calcule : ${formatComma(a)} + ${formatComma(b)}`,
        format: "short",
        expected: [String(sum), formatComma(sum)],
        comparator: "number_equal",
        explanation: "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
          "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
          "Calcul : " +
          (`En alignant les virgules, on trouve ${formatComma(a)} + ${formatComma(
          b
        )} = ${formatComma(sum)}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "decimal_add_reunion_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_additionner",
    difficulty: 4,
    theme: "reunion",
    hint: "Additionne les deux prix.",
    tags: ["decimaux", "addition", "template", "reunion"],
    generate: () => {
      const a = Number((Math.random() * 4 + 1).toFixed(2));
      const b = Number((Math.random() * 4 + 1).toFixed(2));
      const sum = Number((a + b).toFixed(2));

      return {
        text: `Au snack, un jus coûte ${formatComma(
          a
        )} € et un samoussa coûte ${formatComma(b)} €. Quel est le prix total ?`,
        format: "short",
        expected: [String(sum), formatComma(sum)],
        comparator: "number_equal",
        explanation: "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
          "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
          "Calcul : " +
          (`On additionne ${formatComma(a)} € et ${formatComma(
          b
        )} €. Le total est ${formatComma(sum)} €.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - DECIMAL_MULTIPLIER
  // =========================
  {
    kind: "template",
    id: "decimal_multiply_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_multiplier",
    difficulty: 3,
    theme: "neutral",
    hint: "Vois cela comme une addition répétée.",
    tags: ["decimaux", "multiplication", "template"],
    generate: () => {
      const decimals = [0.5, 1.5, 2.5, 3.5];
      const integers = [2, 3, 4];
      const a = decimals[Math.floor(Math.random() * decimals.length)];
      const b = integers[Math.floor(Math.random() * integers.length)];
      const product = Number((a * b).toFixed(1));

      return {
        text: `Calcule : ${formatComma(a)} × ${b}`,
        format: "short",
        expected: [String(product), formatComma(product)],
        comparator: "number_equal",
        explanation: "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
          "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
          "Calcul : " +
          (`Multiplier ${formatComma(
          a
        )} par ${b}, c’est ajouter ${formatComma(a)} ${b} fois. On obtient ${formatComma(
          product
        )}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "decimal_multiply_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_multiplier",
    difficulty: 4,
    theme: "neutral",
    hint: "Tu peux décomposer le calcul.",
    tags: ["decimaux", "multiplication", "template"],
    generate: () => {
      const a = [0.25, 0.5, 1.2, 1.5, 2.4][
        Math.floor(Math.random() * 5)
      ];
      const b = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
      const product = Number((a * b).toFixed(2));

      return {
        text: `Calcule : ${formatComma(a)} × ${b}`,
        format: "short",
        expected: [String(product), formatComma(product)],
        comparator: "number_equal",
        explanation: "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
          "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
          "Calcul : " +
          (`${formatComma(a)} × ${b} = ${formatComma(product)}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "decimal_multiply_reunion_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_multiplier",
    difficulty: 5,
    theme: "reunion",
    hint: "Multiplie le prix d’un objet par le nombre d’objets.",
    tags: ["decimaux", "multiplication", "template", "reunion"],
    generate: () => {
      const price = [1.5, 2.5, 3.5, 4.5][Math.floor(Math.random() * 4)];
      const qty = [3, 4, 5, 6][Math.floor(Math.random() * 4)];
      const total = Number((price * qty).toFixed(1));

      return {
        text: `Au marché forain, un ananas coûte ${formatComma(
          price
        )} €. Combien coûtent ${qty} ananas ?`,
        format: "short",
        expected: [String(total), formatComma(total)],
        comparator: "number_equal",
        explanation: "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
          "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
          "Calcul : " +
          (`Chaque ananas coûte ${formatComma(
          price
        )} €. Pour ${qty} ananas, on calcule ${formatComma(
          price
        )} × ${qty} = ${formatComma(total)} €.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - DECIMAL_DIVISER_PAR_ENTIER
  // =========================
  {
    kind: "template",
    id: "decimal_divide_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_diviser_par_entier",
    difficulty: 3,
    theme: "neutral",
    hint: "On partage en parts égales.",
    tags: ["decimaux", "division", "template"],
    generate: () => {
      const divisors = [2, 4, 5];
      const divisor = divisors[Math.floor(Math.random() * divisors.length)];
      const quotient = [0.6, 0.8, 1.2, 1.4, 1.6][
        Math.floor(Math.random() * 5)
      ];
      const dividend = Number((quotient * divisor).toFixed(1));

      return {
        text: `Calcule : ${formatComma(dividend)} ÷ ${divisor}`,
        format: "short",
        expected: [String(quotient), formatComma(quotient)],
        comparator: "number_equal",
        explanation: "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
          "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
          "Calcul : " +
          (`${formatComma(dividend)} partagé en ${divisor} parts égales donne ${formatComma(
          quotient
        )}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "decimal_divide_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_diviser_par_entier",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche combien vaut une part.",
    tags: ["decimaux", "division", "template"],
    generate: () => {
      const divisor = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
      const quotient = [1.2, 1.5, 1.8, 2.4, 2.5, 3.2][
        Math.floor(Math.random() * 6)
      ];
      const dividend = Number((quotient * divisor).toFixed(1));

      return {
        text: `Calcule : ${formatComma(dividend)} ÷ ${divisor}`,
        format: "short",
        expected: [String(quotient), formatComma(quotient)],
        comparator: "number_equal",
        explanation: "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
          "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
          "Calcul : " +
          (`On partage ${formatComma(
          dividend
        )} en ${divisor} parts égales. Chaque part vaut ${formatComma(
          quotient
        )}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "decimal_divide_reunion_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimaux",
    microId: "decimal_diviser_par_entier",
    difficulty: 5,
    theme: "reunion",
    hint: "On partage la quantité totale entre plusieurs personnes.",
    tags: ["decimaux", "division", "template", "reunion"],
    generate: () => {
      const divisor = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
      const quotient = [0.8, 1.2, 1.5, 2.4][Math.floor(Math.random() * 4)];
      const dividend = Number((quotient * divisor).toFixed(1));

      return {
        text: `On partage ${formatComma(
          dividend
        )} litres de jus entre ${divisor} personnes. Quelle quantité pour une personne ?`,
        format: "short",
        expected: [String(quotient), formatComma(quotient)],
        comparator: "number_equal",
        explanation: "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
          "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
          "Calcul : " +
          (`On calcule ${formatComma(dividend)} ÷ ${divisor} = ${formatComma(
          quotient
        )}. Chaque personne reçoit donc ${formatComma(quotient)} litre(s).`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
];