import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function formatComma(n: number | string) {
  return String(n).replace(".", ",");
}

function explDecimal(calcul: string) {
  return (
    "Définition : un nombre décimal peut s’écrire avec une partie entière et une partie décimale.\n\n" +
    "Méthode : on lit bien les chiffres et leur position, puis on compare ou on calcule.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

function entierAleatoire(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Le ZOOM entre deux voisins — la figure des micros « arrondir » et « encadrer ».
 *
 * ⚠️ `DroiteGradueeCanvas` enferme son SVG dans un `max-w-[320px]` : au-delà de
 * cinq ou six graduations, les étiquettes se chevauchent quelle que soit la
 * largeur du viewBox. On grade donc TRÈS peu — souvent les deux voisins et leur
 * milieu, qui est exactement ce qui décide de l'arrondi.
 */
function droiteZoom(
  bas: number,
  haut: number,
  pas: number,
  points: { value: number; label?: string }[]
) {
  return {
    kind: "number_line" as const,
    min: bas,
    max: haut,
    step: pas,
    points,
    display: {
      showTicks: true,
      showValues: true,
      showPoints: points.length > 0,
      showPointLabels: points.length > 0,
      showZero: true,
    },
    size: { width: 340, height: 120 },
  };
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
    notionId: "decimal_nombre",
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
    tags: ["decimal_nombre", "ecriture"],
  },
  {
    kind: "fixed",
    id: "decimal_lire_ecrire_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
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
    tags: ["decimal_nombre", "ecriture"],
  },
  {
    kind: "fixed",
    id: "decimal_lire_ecrire_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
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
    tags: ["decimal_nombre", "ecriture"],
  },
  {
    kind: "fixed",
    id: "decimal_lire_ecrire_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
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
    tags: ["decimal_nombre", "ecriture"],
  },
  {
    kind: "fixed",
    id: "decimal_lire_ecrire_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
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
    tags: ["decimal_nombre", "ecriture", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_lire_ecrire_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
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
    tags: ["decimal_nombre", "ecriture", "qcm"],
  },

  // =========================
  // DECIMAL_RANG
  // =========================
  {
    kind: "fixed",
    id: "decimal_rang_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
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
    tags: ["decimal_nombre", "rang"],
  },
  {
    kind: "fixed",
    id: "decimal_rang_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
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
    tags: ["decimal_nombre", "rang"],
  },
  {
    kind: "fixed",
    id: "decimal_rang_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
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
    tags: ["decimal_nombre", "rang"],
  },
  {
    kind: "fixed",
    id: "decimal_rang_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
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
    tags: ["decimal_nombre", "rang"],
  },
  {
    kind: "fixed",
    id: "decimal_rang_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
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
    tags: ["decimal_nombre", "rang", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_rang_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
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
    tags: ["decimal_nombre", "rang", "qcm"],
  },

  // =========================
  // DECIMAL_COMPARER
  // =========================
  {
    kind: "fixed",
    id: "decimal_compare_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
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
    tags: ["decimal_nombre", "comparaison"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
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
    tags: ["decimal_nombre", "comparaison"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
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
    tags: ["decimal_nombre", "comparaison"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
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
    tags: ["decimal_nombre", "comparaison"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_trap_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
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
    tags: ["decimal_nombre", "comparaison", "piege"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_trap_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
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
    tags: ["decimal_nombre", "comparaison", "piege"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
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
    tags: ["decimal_nombre", "comparaison", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
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
    tags: ["decimal_nombre", "comparaison", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_compare_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
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
    tags: ["decimal_nombre", "comparaison", "reunion"],
  },

  // =========================
  // DECIMAL_ADDITIONNER
  // =========================
  {
    kind: "fixed",
    id: "decimal_add_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
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
    tags: ["decimal_nombre", "addition"],
  },
  {
    kind: "fixed",
    id: "decimal_add_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
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
    tags: ["decimal_nombre", "addition"],
  },
  {
    kind: "fixed",
    id: "decimal_add_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
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
    tags: ["decimal_nombre", "addition"],
  },
  {
    kind: "fixed",
    id: "decimal_add_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
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
    tags: ["decimal_nombre", "addition"],
  },
  {
    kind: "fixed",
    id: "decimal_add_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
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
    tags: ["decimal_nombre", "addition"],
  },
  {
    kind: "fixed",
    id: "decimal_add_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
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
    tags: ["decimal_nombre", "addition"],
  },
  {
    kind: "fixed",
    id: "decimal_add_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
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
    tags: ["decimal_nombre", "addition", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_add_challenge_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
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
    tags: ["decimal_nombre", "addition", "defi"],
  },

  // =========================
  // DECIMAL_MULTIPLIER
  // =========================
  {
    kind: "fixed",
    id: "decimal_multiply_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
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
    tags: ["decimal_nombre", "multiplication"],
  },
  {
    kind: "fixed",
    id: "decimal_multiply_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
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
    tags: ["decimal_nombre", "multiplication"],
  },
  {
    kind: "fixed",
    id: "decimal_multiply_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
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
    tags: ["decimal_nombre", "multiplication"],
  },
  {
    kind: "fixed",
    id: "decimal_multiply_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
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
    tags: ["decimal_nombre", "multiplication"],
  },
  {
    kind: "fixed",
    id: "decimal_multiply_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
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
    tags: ["decimal_nombre", "multiplication", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_multiply_challenge_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
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
    tags: ["decimal_nombre", "multiplication", "defi"],
  },

  // =========================
  // DECIMAL_DIVISER_PAR_ENTIER
  // =========================
  {
    kind: "fixed",
    id: "decimal_divide_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
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
    tags: ["decimal_nombre", "division"],
  },
  {
    kind: "fixed",
    id: "decimal_divide_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
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
    tags: ["decimal_nombre", "division"],
  },
  {
    kind: "fixed",
    id: "decimal_divide_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
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
    tags: ["decimal_nombre", "division"],
  },
  {
    kind: "fixed",
    id: "decimal_divide_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
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
    tags: ["decimal_nombre", "division"],
  },
  {
    kind: "fixed",
    id: "decimal_divide_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
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
    tags: ["decimal_nombre", "division", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_divide_challenge_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
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
    tags: ["decimal_nombre", "division", "defi"],
  },

  // =========================
  // DECIMAL_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "decimal_calcul_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_calcul_defi",
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
    tags: ["decimal_nombre", "defi", "pourcentage", "calcul"],
  },
  {
    kind: "fixed",
    id: "decimal_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_defi",
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
    tags: ["decimal_nombre", "defi", "culture", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_defi_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_defi",
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
    tags: ["decimal_nombre", "defi", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_calcul_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_calcul_defi",
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
    tags: ["decimal_nombre", "defi", "geometrie", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_defi_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_defi",
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
    tags: ["decimal_nombre", "defi", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_defi_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_defi",
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
    tags: ["decimal_nombre", "defi", "sens", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_calcul_defi_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_calcul_defi",
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
    tags: ["decimal_nombre", "defi", "pourcentage", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_calcul_defi_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_calcul_defi",
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
    tags: ["decimal_nombre", "defi", "geometrie", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_defi_fixed_9",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_defi",
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
    tags: ["decimal_nombre", "defi", "raisonnement", "qcm"],
  },

  // =========================
  // TEMPLATES - DECIMAL_LIRE_ECRIRE
  // =========================
  {
    kind: "template",
    id: "decimal_lire_ecrire_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_lire_ecrire",
    difficulty: 1,
    theme: "neutral",
    hint: "n/10 = n dixièmes.",
    tags: ["decimal_nombre", "ecriture", "template"],
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
    notionId: "decimal_nombre",
    microId: "decimal_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    hint: "Le numérateur peut être plus grand que 10.",
    tags: ["decimal_nombre", "ecriture", "template"],
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
    notionId: "decimal_nombre",
    microId: "decimal_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    hint: "Attention aux zéros inutiles.",
    tags: ["decimal_nombre", "ecriture", "qcm", "template"],
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
    notionId: "decimal_nombre",
    microId: "decimal_rang",
    difficulty: 1,
    theme: "neutral",
    hint: "Le chiffre des dixièmes est le premier après la virgule.",
    tags: ["decimal_nombre", "rang", "template"],
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
    notionId: "decimal_nombre",
    microId: "decimal_rang",
    difficulty: 2,
    theme: "neutral",
    hint: "Le chiffre des centièmes est le deuxième après la virgule.",
    tags: ["decimal_nombre", "rang", "template"],
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
    notionId: "decimal_nombre",
    microId: "decimal_comparer",
    difficulty: 1,
    theme: "neutral",
    hint: "Compare d’abord les dixièmes, puis les centièmes.",
    tags: ["decimal_nombre", "comparaison", "template"],
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
    notionId: "decimal_nombre",
    microId: "decimal_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Le plus petit n’est pas toujours celui qui a le plus de chiffres.",
    tags: ["decimal_nombre", "comparaison", "template"],
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
    notionId: "decimal_nombre",
    microId: "decimal_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Si les dixièmes sont identiques, compare les centièmes.",
    tags: ["decimal_nombre", "comparaison", "qcm", "template"],
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
    notionId: "decimal_calcul",
    microId: "decimal_additionner",
    difficulty: 2,
    theme: "neutral",
    hint: "Aligne les virgules.",
    tags: ["decimal_nombre", "addition", "template"],
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
    notionId: "decimal_calcul",
    microId: "decimal_additionner",
    difficulty: 3,
    theme: "neutral",
    hint: "Tu peux ajouter des zéros pour aligner.",
    tags: ["decimal_nombre", "addition", "template"],
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
    notionId: "decimal_calcul",
    microId: "decimal_additionner",
    difficulty: 4,
    theme: "reunion",
    hint: "Additionne les deux prix.",
    tags: ["decimal_nombre", "addition", "template", "reunion"],
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
    notionId: "decimal_calcul",
    microId: "decimal_multiplier",
    difficulty: 3,
    theme: "neutral",
    hint: "Vois cela comme une addition répétée.",
    tags: ["decimal_nombre", "multiplication", "template"],
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
    notionId: "decimal_calcul",
    microId: "decimal_multiplier",
    difficulty: 4,
    theme: "neutral",
    hint: "Tu peux décomposer le calcul.",
    tags: ["decimal_nombre", "multiplication", "template"],
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
    notionId: "decimal_calcul",
    microId: "decimal_multiplier",
    difficulty: 5,
    theme: "reunion",
    hint: "Multiplie le prix d’un objet par le nombre d’objets.",
    tags: ["decimal_nombre", "multiplication", "template", "reunion"],
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
    notionId: "decimal_calcul",
    microId: "decimal_diviser_par_entier",
    difficulty: 3,
    theme: "neutral",
    hint: "On partage en parts égales.",
    tags: ["decimal_nombre", "division", "template"],
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
    notionId: "decimal_calcul",
    microId: "decimal_diviser_par_entier",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche combien vaut une part.",
    tags: ["decimal_nombre", "division", "template"],
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
    notionId: "decimal_calcul",
    microId: "decimal_diviser_par_entier",
    difficulty: 5,
    theme: "reunion",
    hint: "On partage la quantité totale entre plusieurs personnes.",
    tags: ["decimal_nombre", "division", "template", "reunion"],
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
  // =========================
  // DEFIS — LES GENERATEURS MANQUANTS
  //
  // ⛔ AJOUTES LE 22/08/2026. `decimal_defi` et `decimal_calcul_defi` n'avaient
  // que des items figes : cinq et quatre. La regle d'or de Frederic est qu'un
  // eleve ne doit pas retomber sur la meme question en dix minutes — soit dix
  // variantes minimum par micro, donc un generateur, jamais un item seul.
  //
  // Les deux micros sont CONCEPTUELLES : on parametre la situation et les
  // nombres, le raisonnement ne bouge pas, et la question cesse d'etre
  // reconnaissable.
  // =========================
  {
    kind: "template",
    id: "decimal_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Plus de chiffres apres la virgule ne veut pas dire plus grand.",
    tags: ["decimal_nombre", "defi", "template"],
    generate: () => {
      const e = entierAleatoire(2, 9);
      const d = entierAleatoire(4, 8);
      const petit = entierAleatoire(1, d - 1);
      // Le piege du programme : 2,5 est PLUS GRAND que 2,45 alors que 45 > 5.
      const a = `${e},${d}`;
      const b = `${e},${petit}${entierAleatoire(1, 9)}`;
      return {
        text: `Quel est le plus grand : ${a} ou ${b} ?`,
        format: "qcm",
        choices: shuffle([a, b]),
        expected: [a],
        comparator: "mcq_exact",
        explanation: explDecimal(
          `Les parties entieres sont egales (${e}). On compare alors les dixiemes : ${d} contre ${petit}. Comme ${d} est plus grand que ${petit}, ${a} est plus grand que ${b} — meme si ${b} a plus de chiffres apres la virgule.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "decimal_defi_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Dis ce que tu compares en premier, et pourquoi.",
    tags: ["decimal_nombre", "defi", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique pourquoi 3,5 est plus grand que 3,45, alors que 45 est plus grand que 5.",
          mots: ["dixieme", "dixiemes", "dixième", "dixièmes", "position", "rang"],
          r: "On ne compare pas les chiffres apres la virgule comme des entiers. On compare rang par rang : les parties entieres sont egales (3), puis les dixiemes — 5 dixiemes contre 4 dixiemes. 3,5 est donc plus grand. On peut aussi ecrire 3,5 = 3,50 et comparer 3,50 a 3,45.",
        },
        {
          q: "Explique pourquoi 2 est un nombre decimal.",
          mots: ["virgule", "partie decimale", "partie décimale", "2,0", "zero", "zéro"],
          r: "Un nombre decimal s'ecrit avec une partie entiere et une partie decimale. Celle de 2 est nulle : 2 = 2,0. Tout nombre entier est donc un nombre decimal — l'inverse est faux.",
        },
        {
          q: "Explique pourquoi on peut ajouter des zeros a la fin d'un nombre decimal sans le changer.",
          mots: ["zero", "zéro", "valeur", "rang", "rien"],
          r: "Les chiffres ajoutes occupent les rangs des centiemes, des milliemes... et valent zero a ces rangs : ils n'ajoutent rien. 3,5 = 3,50 = 3,500. C'est ce qui permet de comparer deux decimaux en leur donnant le meme nombre de chiffres apres la virgule.",
        },
      ];
      const c = cas[Math.floor(Math.random() * cas.length)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: explDecimal(c.r),
      };
    },
  },
  {
    kind: "template",
    id: "decimal_calcul_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_calcul_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "10 % d'un nombre, c'est ce nombre divise par 10.",
    tags: ["decimal_calcul", "defi", "template"],
    generate: () => {
      const pourcent = [10, 20, 25, 50][Math.floor(Math.random() * 4)];
      const base = entierAleatoire(2, 20) * 20;
      const resultat = (base * pourcent) / 100;
      return {
        text: `Une addition est de ${base} euros. Tu laisses ${pourcent} % de pourboire. Combien vaut le pourboire ?`,
        format: "short",
        expected: [formatComma(resultat), String(resultat)],
        comparator: "number_equal",
        explanation: explDecimal(
          `${pourcent} % de ${base}, c'est ${pourcent}/100 de ${base}, soit ${base} x ${formatComma(pourcent / 100)} = ${formatComma(resultat)} euros.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "decimal_calcul_defi_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_calcul_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Multiplier ne veut pas toujours dire rendre plus grand.",
    tags: ["decimal_calcul", "defi", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique pourquoi multiplier un nombre par 0,1 le rend plus petit.",
          mots: ["dixieme", "dixième", "diviser", "division", "10"],
          r: "Multiplier par 0,1, c'est prendre le dixieme du nombre — donc le diviser par 10. 45 x 0,1 = 4,5. « Multiplier » ne veut donc pas toujours dire « rendre plus grand » : cela ne vaut que pour les nombres plus grands que 1.",
        },
        {
          q: "Explique pourquoi il faut aligner les virgules pour poser une addition de nombres decimaux.",
          mots: ["rang", "virgule", "dixieme", "dixième", "unite", "unité", "colonne"],
          r: "On additionne des unites avec des unites, des dixiemes avec des dixiemes. Aligner les virgules, c'est aligner les rangs les uns sous les autres. Si on aligne les nombres a droite au lieu des virgules, on additionne des centiemes avec des dixiemes, et le resultat est faux.",
        },
        {
          q: "Explique comment verifier rapidement que 3,7 x 2,9 vaut environ 11 et non 110.",
          mots: ["ordre de grandeur", "environ", "arrondi", "4", "3"],
          r: "On remplace chaque nombre par un ordre de grandeur : 3,7 est proche de 4, et 2,9 de 3. Le produit est donc proche de 4 x 3 = 12. Un resultat de 110 serait dix fois trop grand : la virgule serait mal placee.",
        },
      ];
      const c = cas[Math.floor(Math.random() * cas.length)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: explDecimal(c.r),
      };
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DECIMAL_ARRONDIR — la valeur arrondie à l'unité, au dixième, au centième
  //
  // ⛔ OUVERTE LE 23/08/2026 — TROU DU PROGRAMME (6e-N-entiers-9). Le BO
  // demande « donner la valeur arrondie à l'unité, au dixième, ou au centième
  // d'un nombre décimal » ET « déterminer ou connaître la valeur arrondie de
  // certains nombres non décimaux » : aucune micro de 6e ne le travaillait.
  //
  // ⭐ ARRONDIR N'EST PAS TRONQUER. Couper après le chiffre voulu donne la
  // troncature (12,78 → 12,7) ; arrondir demande de regarder le chiffre SUIVANT
  // et de choisir le plus proche des deux voisins (12,78 → 12,8). C'est la
  // confusion n°1 du chapitre, et elle a son item.
  //
  // ⭐ π EST DANS LE BO, nommément : « il sait que π n'est pas un nombre
  // décimal, et que 3,14 en est la valeur arrondie au centième ». C'est le seul
  // endroit de la 6e où l'élève rencontre un nombre dont l'écriture décimale ne
  // s'arrête jamais.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    kind: "fixed",
    id: "decimal_arrondir_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_arrondir",
    difficulty: 2,
    theme: "neutral",
    text: "Donne la valeur arrondie de 12,7 à l'unité.",
    format: "short",
    expected: ["13"],
    comparator: "number_equal",
    hint: "Entre quels deux entiers se trouve 12,7 ? Duquel est-il le plus proche ?",
    explanation: explDecimal(
      "12,7 est compris entre les deux entiers 12 et 13. Il est à 0,7 de 12 et à seulement 0,3 de 13 : le plus proche est 13. La valeur arrondie de 12,7 à l'unité est donc 13."
    ),
    tags: ["decimal_nombre", "arrondir", "canvas", "short"],
    canvas: droiteZoom(12, 13, 0.5, [{ value: 12.7, label: "A" }]),
  },
  {
    kind: "fixed",
    id: "decimal_arrondir_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_arrondir",
    difficulty: 3,
    theme: "neutral",
    text: "Donne la valeur arrondie de 4,382 au dixième.",
    format: "short",
    expected: ["4,4", "4.4", "4,40", "4.40"],
    comparator: "number_equal",
    hint: "Les deux dixièmes voisins sont 4,3 et 4,4.",
    explanation: explDecimal(
      "4,382 est compris entre les dixièmes 4,3 et 4,4. Pour choisir, on regarde le chiffre des centièmes : c'est 8, donc 8 ou plus, et on monte au dixième supérieur. La valeur arrondie au dixième est 4,4."
    ),
    tags: ["decimal_nombre", "arrondir", "canvas", "short"],
    canvas: droiteZoom(4.3, 4.4, 0.05, [{ value: 4.38, label: "A" }]),
  },
  {
    kind: "fixed",
    id: "decimal_arrondir_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_arrondir",
    difficulty: 3,
    theme: "neutral",
    text: "Donne la valeur arrondie de 9,146 au centième.",
    format: "short",
    expected: ["9,15", "9.15"],
    comparator: "number_equal",
    hint: "Les deux centièmes voisins sont 9,14 et 9,15.",
    explanation: explDecimal(
      "9,146 est compris entre les centièmes 9,14 et 9,15. Le chiffre des millièmes est 6, donc 5 ou plus : on monte au centième supérieur. La valeur arrondie au centième est 9,15."
    ),
    tags: ["decimal_nombre", "arrondir", "short"],
  },
  {
    kind: "fixed",
    id: "decimal_arrondir_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_arrondir",
    difficulty: 4,
    theme: "neutral",
    text: "Le nombre π vaut 3,141592… et son écriture décimale ne s'arrête jamais. Quelle est sa valeur arrondie au centième ?",
    format: "qcm",
    choices: ["3,14", "3,15", "3,1", "3,142"],
    expected: ["3,14"],
    comparator: "mcq_exact",
    hint: "Regarde le chiffre des millièmes de 3,141592…",
    explanation: explDecimal(
      "Arrondir au centième, c'est garder deux chiffres après la virgule. Les centièmes voisins sont 3,14 et 3,15 ; le chiffre des millièmes est 1, donc inférieur à 5, et on reste à 3,14. Attention : 3,1 est l'arrondi au DIXIÈME et 3,142 l'arrondi au MILLIÈME — ils répondent à une autre question. Et π n'est pas un nombre décimal : aucune écriture à virgule ne le donne exactement, 3,14 n'en est qu'une valeur approchée."
    ),
    tags: ["decimal_nombre", "arrondir", "pi", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_arrondir_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_arrondir",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la valeur arrondie de 3,96 au dixième ?",
    format: "qcm",
    choices: ["4", "3,9", "3,10", "3,96"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Le dixième juste au-dessus de 3,9 n'est pas 3,10.",
    explanation: explDecimal(
      "Les deux dixièmes voisins de 3,96 sont 3,9 et 4,0. Le chiffre des centièmes est 6, donc 5 ou plus : on monte, et 4,0 s'écrit 4. Le piège est d'écrire « 3,10 » en croyant qu'après 3,9 vient 3,10 : dans la partie décimale on ne compte pas comme avec des entiers, 3,10 vaut 3,1 et se trouve en dessous de 3,9."
    ),
    tags: ["decimal_nombre", "arrondir", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_arrondir_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_arrondir",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi 12,78 arrondi au dixième donne-t-il 12,8, et non 12,7 ?",
    format: "qcm",
    choices: [
      "parce que 12,78 est plus proche de 12,8 que de 12,7",
      "parce qu'on enlève simplement les chiffres après le dixième",
      "parce qu'on arrondit toujours vers le haut",
      "parce que 8 est le dernier chiffre écrit",
    ],
    expected: ["parce que 12,78 est plus proche de 12,8 que de 12,7"],
    comparator: "mcq_exact",
    hint: "Compare les deux écarts : 12,78 − 12,7 et 12,8 − 12,78.",
    explanation: explDecimal(
      "12,78 − 12,7 = 0,08 alors que 12,8 − 12,78 = 0,02 : 12,8 est bien le plus proche. Couper après le dixième donnerait 12,7 — c'est la TRONCATURE, pas l'arrondi. Et on n'arrondit pas toujours vers le haut : 12,73 s'arrondit en 12,7."
    ),
    tags: ["decimal_nombre", "arrondir", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "decimal_arrondir_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_arrondir",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère les deux voisins, puis regarde le chiffre juste après le rang demandé.",
    tags: ["decimal_nombre", "arrondir", "template"],
    generate: () => {
      const rangs = [
        { nom: "à l'unité", decimales: 0, pas: 1 },
        { nom: "au dixième", decimales: 1, pas: 0.1 },
        { nom: "au centième", decimales: 2, pas: 0.01 },
      ];
      const r = rangs[entierAleatoire(0, rangs.length - 1)];

      // Le nombre porte toujours au moins un chiffre APRÈS le rang demandé,
      // sinon il n'y a rien à arrondir.
      const entier = entierAleatoire(1, 40);
      const millimes = entierAleatoire(1, 999);
      const nombre = Number((entier + millimes / 1000).toFixed(3));

      const facteur = Math.pow(10, r.decimales);
      const arrondi = Number((Math.round(nombre * facteur) / facteur).toFixed(r.decimales));
      const bas = Number((Math.floor(nombre * facteur) / facteur).toFixed(r.decimales));
      const haut = Number((bas + r.pas).toFixed(r.decimales));
      const suivant = Math.floor(nombre * facteur * 10) % 10;

      return {
        text: `Donne la valeur arrondie de ${formatComma(nombre)} ${r.nom}.`,
        format: "short",
        expected: [formatComma(arrondi), String(arrondi)],
        comparator: "number_equal",
        explanation: explDecimal(
          `${formatComma(nombre)} est compris entre ${formatComma(bas)} et ${formatComma(haut)}. Le chiffre juste après le rang demandé est ${suivant} : ${
            suivant >= 5
              ? `il vaut 5 ou plus, donc on monte à ${formatComma(haut)}`
              : `il vaut moins de 5, donc on reste à ${formatComma(bas)}`
          }. La valeur arrondie est ${formatComma(arrondi)}.`
        ),
        canvas: droiteZoom(bas, haut, Number((r.pas / 2).toFixed(4)), [
          { value: nombre, label: "A" },
        ]),
      };
    },
  },
  {
    kind: "template",
    id: "decimal_arrondir_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_arrondir",
    difficulty: 4,
    theme: "neutral",
    hint: "Parle des deux voisins et du chiffre qui permet de choisir entre eux.",
    tags: ["decimal_nombre", "arrondir", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique la règle qui permet d'arrondir un nombre décimal à un rang donné.",
          mots: ["voisins", "proche", "chiffre", "5", "suivant", "rang"],
          r: "On repère d'abord les deux voisins du nombre à ce rang : pour arrondir 4,382 au dixième, ce sont 4,3 et 4,4. On regarde ensuite le chiffre juste APRÈS le rang demandé — ici le 8 des centièmes. S'il vaut 5 ou plus, le nombre est plus proche du voisin du haut et on monte ; s'il vaut moins de 5, on reste au voisin du bas. Arrondir, c'est choisir le plus proche des deux.",
        },
        {
          q: "Quelle est la différence entre tronquer un nombre au dixième et l'arrondir au dixième ?",
          mots: ["coupe", "tronque", "supprime", "proche", "arrondi", "12,8", "12,7"],
          r: "Tronquer, c'est couper : on supprime tout ce qui suit le rang, et 12,78 devient 12,7. Arrondir, c'est choisir le plus proche des deux voisins, et 12,78 devient 12,8 parce qu'il n'est qu'à 0,02 de 12,8 contre 0,08 de 12,7. La troncature descend toujours ; l'arrondi peut monter ou descendre.",
        },
        {
          q: "Explique pourquoi on dit que 3,14 est une valeur arrondie de π, et pas la valeur de π.",
          mots: ["jamais", "infini", "approché", "approchee", "décimal", "decimal", "pas exact"],
          r: "L'écriture décimale de π ne s'arrête jamais : 3,141592… continue sans fin et sans se répéter. Aucune écriture à virgule ne peut donc donner π exactement — π n'est pas un nombre décimal. 3,14 est le nombre décimal à deux chiffres après la virgule le plus proche de π : c'est une valeur approchée, utile pour calculer, mais différente de π.",
        },
        {
          q: "Un magasin annonce un article à 19,99 €. Explique ce que donne l'arrondi à l'unité, et pourquoi ce prix est écrit ainsi.",
          mots: ["20", "proche", "unité", "unite", "0,01", "centime"],
          r: "19,99 est compris entre 19 et 20, et il n'est qu'à 0,01 de 20 : arrondi à l'unité, il vaut 20 €. Le magasin écrit 19,99 parce que le premier chiffre lu est un 1 et non un 2, ce qui donne l'impression d'un prix bien plus bas — alors que la différence réelle est d'un centime.",
        },
      ];
      const c = cas[entierAleatoire(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: explDecimal(c.r),
      };
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DECIMAL_ENCADRER — encadrer et intercaler des nombres décimaux
  //
  // ⛔ OUVERTE LE 23/08/2026 — TROU DU PROGRAMME (6e-N-entiers-10). Le coach
  // avait `entier_encadrer`, qui ne traite que les ENTIERS ; l'encadrement au
  // programme de 6e porte sur les décimaux, et personne ne le couvrait.
  //
  // ⭐ INTERCALER EST LA VRAIE NOUVEAUTÉ. Entre deux entiers consécutifs il n'y
  // a rien ; entre deux décimaux il y en a toujours une infinité. C'est ce qui
  // sépare définitivement les décimaux des entiers dans la tête de l'élève, et
  // c'est ce que le BO vise en demandant d'intercaler. L'erreur « il n'y a rien
  // entre 2,5 et 2,6 » a donc son item.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    kind: "fixed",
    id: "decimal_encadrer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_encadrer",
    difficulty: 2,
    theme: "neutral",
    text: "Complète l'encadrement à l'unité : … < 7,38 < 8. Quel nombre manque ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "C'est la partie entière de 7,38.",
    explanation: explDecimal(
      "La partie entière de 7,38 est 7, et l'entier suivant est 8 : on écrit 7 < 7,38 < 8. Encadrer à l'unité, c'est trouver les deux entiers consécutifs entre lesquels le nombre se place."
    ),
    tags: ["decimal_nombre", "encadrer", "canvas", "short"],
    canvas: droiteZoom(7, 8, 0.5, [{ value: 7.38, label: "A" }]),
  },
  {
    kind: "fixed",
    id: "decimal_encadrer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_encadrer",
    difficulty: 3,
    theme: "neutral",
    text: "Complète l'encadrement au dixième : 7,3 < 7,38 < … . Quel nombre manque ?",
    format: "short",
    expected: ["7,4", "7.4", "7,40", "7.40"],
    comparator: "number_equal",
    hint: "Après 7,3 vient le dixième suivant, pas le centième suivant.",
    explanation: explDecimal(
      "Encadrer au dixième, c'est trouver les deux dixièmes consécutifs qui entourent le nombre. Après 7,3 vient 7,4 : on écrit 7,3 < 7,38 < 7,4. L'encadrement au dixième est plus serré que celui à l'unité — il donne une meilleure idée de la position du nombre."
    ),
    tags: ["decimal_nombre", "encadrer", "short"],
  },
  {
    kind: "fixed",
    id: "decimal_encadrer_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_encadrer",
    difficulty: 3,
    theme: "neutral",
    text: "Intercale un nombre décimal entre 4,7 et 4,8.",
    format: "short",
    expected: [
      "4,75",
      "4.75",
      "4,71",
      "4,72",
      "4,73",
      "4,74",
      "4,76",
      "4,77",
      "4,78",
      "4,79",
      "4,705",
      "4,725",
      "4,755",
    ],
    comparator: "number_equal",
    hint: "Ajoute un chiffre de plus après la virgule.",
    explanation: explDecimal(
      "4,7 s'écrit aussi 4,70 et 4,8 s'écrit 4,80. Entre 70 centièmes et 80 centièmes, il y a 4,71 ; 4,72 ; … ; 4,79 : neuf réponses possibles rien qu'au centième, et bien d'autres au millième. Le plus simple est de prendre le milieu, 4,75."
    ),
    tags: ["decimal_nombre", "intercaler", "canvas", "short"],
    canvas: droiteZoom(4.7, 4.8, 0.01, []),
  },
  {
    kind: "fixed",
    id: "decimal_encadrer_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_encadrer",
    difficulty: 4,
    theme: "neutral",
    text: "Combien de nombres décimaux peut-on intercaler entre 2,5 et 2,6 ?",
    format: "qcm",
    choices: ["une infinité", "aucun, ils se suivent", "un seul : 2,55", "exactement neuf"],
    expected: ["une infinité"],
    comparator: "mcq_exact",
    hint: "Après les centièmes viennent les millièmes, puis les dix-millièmes…",
    explanation: explDecimal(
      "Au centième, on en trouve déjà neuf : 2,51 à 2,59. Mais on peut continuer au millième — 2,551 ; 2,552 ; … — puis au dix-millième, sans jamais s'arrêter : il y en a une INFINITÉ. C'est la grande différence avec les entiers, où 2 et 3 n'ont rien entre eux."
    ),
    tags: ["decimal_nombre", "intercaler", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_encadrer_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_encadrer",
    difficulty: 4,
    theme: "neutral",
    text: "Lequel de ces encadrements de 5,206 est CORRECT ?",
    format: "qcm",
    choices: [
      "5,20 < 5,206 < 5,21",
      "5,20 < 5,206 < 5,26",
      "5,2 < 5,206 < 5,3",
      "5,206 < 5,21 < 5,22",
    ],
    expected: ["5,20 < 5,206 < 5,21"],
    comparator: "mcq_exact",
    hint: "Un encadrement au centième utilise deux centièmes qui se suivent.",
    explanation: explDecimal(
      "5,206 se place entre les centièmes 5,20 et 5,21 : c'est l'encadrement au centième, le plus serré des quatre. « 5,20 < 5,206 < 5,26 » est vrai mais bien plus large, ce n'est pas un encadrement au centième. « 5,2 < 5,206 < 5,3 » est l'encadrement au dixième. La dernière ligne n'encadre rien : 5,206 y est en dehors."
    ),
    tags: ["decimal_nombre", "encadrer", "qcm"],
  },
  {
    kind: "template",
    id: "decimal_encadrer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_encadrer",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche les deux voisins consécutifs au rang demandé.",
    tags: ["decimal_nombre", "encadrer", "template"],
    generate: () => {
      const rangs = [
        { nom: "à l'unité", decimales: 0, pas: 1 },
        { nom: "au dixième", decimales: 1, pas: 0.1 },
      ];
      const r = rangs[entierAleatoire(0, rangs.length - 1)];

      const entier = entierAleatoire(1, 40);
      const centiemes = entierAleatoire(1, 99);
      const nombre = Number((entier + centiemes / 100).toFixed(2));

      const facteur = Math.pow(10, r.decimales);
      const bas = Number((Math.floor(nombre * facteur) / facteur).toFixed(r.decimales));
      const haut = Number((bas + r.pas).toFixed(r.decimales));

      return {
        text: `Complète l'encadrement ${r.nom} : ${formatComma(bas)} < ${formatComma(nombre)} < … . Quel nombre manque ?`,
        format: "short",
        expected: [formatComma(haut), String(haut)],
        comparator: "number_equal",
        explanation: explDecimal(
          `Encadrer ${r.nom}, c'est trouver les deux voisins consécutifs à ce rang. Après ${formatComma(bas)} vient ${formatComma(haut)} : on écrit ${formatComma(bas)} < ${formatComma(nombre)} < ${formatComma(haut)}.`
        ),
        canvas: droiteZoom(bas, haut, Number((r.pas / 2).toFixed(4)), [
          { value: nombre, label: "A" },
        ]),
      };
    },
  },
  {
    kind: "template",
    id: "decimal_encadrer_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_nombre",
    microId: "decimal_encadrer",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare ce qui se passe entre deux entiers et entre deux décimaux.",
    tags: ["decimal_nombre", "encadrer", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique pourquoi on peut toujours intercaler un nombre décimal entre deux nombres décimaux, alors qu'on ne peut rien intercaler entre 6 et 7 chez les entiers.",
          mots: ["infinité", "infinite", "chiffre", "virgule", "milieu", "centième", "centieme"],
          r: "Entre 6 et 7 il n'y a aucun ENTIER : les entiers se suivent un par un. Avec les décimaux, il suffit d'ajouter un chiffre après la virgule pour se glisser entre deux nombres : entre 2,5 et 2,6 il y a 2,55, et entre 2,55 et 2,56 il y a 2,555. On peut recommencer indéfiniment : il y en a une infinité.",
        },
        {
          q: "Explique la différence entre encadrer un nombre à l'unité et l'encadrer au centième.",
          mots: ["serré", "serre", "précis", "precis", "large", "voisins", "rang"],
          r: "Les deux donnent deux voisins entre lesquels le nombre se place, mais pas au même rang. À l'unité, 5,206 est entre 5 et 6 : l'écart est de 1, l'encadrement est large. Au centième, il est entre 5,20 et 5,21 : l'écart n'est plus que de 0,01, l'encadrement est cent fois plus serré et situe bien mieux le nombre.",
        },
        {
          q: "Un élève écrit « 3,9 < 3,10 » parce que 10 est plus grand que 9. Explique son erreur.",
          mots: ["dixième", "dixieme", "centième", "centieme", "3,1", "rang", "partie décimale"],
          r: "Il lit la partie décimale comme un nombre entier, alors que chaque chiffre y a un rang. 3,10 signifie 3 unités, 1 dixième et 0 centième : c'est 3,1, qui est plus PETIT que 3,9. Pour comparer, on compare d'abord les parties entières, puis les dixièmes, puis les centièmes — 1 dixième contre 9 dixièmes, donc 3,10 < 3,9.",
        },
      ];
      const c = cas[entierAleatoire(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: explDecimal(c.r),
      };
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DECIMAL_MULTIPLIER_PAR_01 — multiplier par 0,1 · 0,01 · 0,001
  //
  // ⛔ OUVERTE LE 23/08/2026 — TROU DU PROGRAMME (6e-N-entiers-12) : « multiplier
  // un nombre entier ou un nombre décimal par 0,1, par 0,01, et par 0,001 »,
  // « connaître le lien avec la division par 10, 100 et par 1 000 ».
  //
  // ⭐ RANGÉE DANS `decimal_calcul`, PAS DANS `decimal_nombre` : c'est un
  // calcul, pas une façon de lire un nombre. Elle vient juste après
  // `decimal_multiplier`, dont elle est le cas particulier le plus utile.
  //
  // ⭐ LES AUTOMATISMES DU BO SONT ICI, mot pour mot : « l'élève restitue de
  // manière automatique les équivalences 1/10 = 0,1 ; 1/100 = 0,01 ;
  // 1/1000 = 0,001 ». Multiplier par 0,1, c'est donc prendre UN DIXIÈME —
  // exactement diviser par 10.
  //
  // ⚠️ L'OBSTACLE EST UNE CROYANCE, pas une technique : « multiplier rend plus
  // grand » est vrai depuis le CP et devient faux ici. Deux items l'attaquent
  // de face.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    kind: "fixed",
    id: "decimal_mult01_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_multiplier_par_01",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 37 × 0,1",
    format: "short",
    expected: ["3,7", "3.7", "3,70", "3.70"],
    comparator: "number_equal",
    hint: "0,1 c'est un dixième : prendre 0,1 fois un nombre, c'est en prendre le dixième.",
    explanation: explDecimal(
      "0,1 est l'écriture décimale de 1/10. Multiplier par 0,1, c'est donc prendre le dixième du nombre, autrement dit le diviser par 10 : 37 ÷ 10 = 3,7. Les chiffres ne changent pas, ils reculent d'un rang."
    ),
    tags: ["decimal_calcul", "multiplier_01", "short"],
  },
  {
    kind: "fixed",
    id: "decimal_mult01_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_multiplier_par_01",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 5,2 × 0,01",
    format: "short",
    expected: ["0,052", "0.052"],
    comparator: "number_equal",
    hint: "0,01 c'est un centième : on divise par 100.",
    explanation: explDecimal(
      "0,01 vaut 1/100. Multiplier par 0,01, c'est diviser par 100 : 5,2 ÷ 100 = 0,052. Les chiffres 5 et 2 reculent de deux rangs — le 5 passe des unités aux centièmes."
    ),
    tags: ["decimal_calcul", "multiplier_01", "short"],
  },
  {
    kind: "fixed",
    id: "decimal_mult01_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_multiplier_par_01",
    difficulty: 3,
    theme: "neutral",
    text: "Multiplier un nombre par 0,001 revient à…",
    format: "qcm",
    choices: [
      "le diviser par 1 000",
      "le diviser par 100",
      "le multiplier par 1 000",
      "lui ajouter trois zéros",
    ],
    expected: ["le diviser par 1 000"],
    comparator: "mcq_exact",
    hint: "Combien vaut 0,001 sous forme de fraction ?",
    explanation: explDecimal(
      "0,001 est l'écriture décimale de 1/1000. Prendre 0,001 fois un nombre, c'est en prendre un millième, donc le diviser par 1 000 : 4 × 0,001 = 0,004. Multiplier par 0,001 REND PLUS PETIT — c'est l'inverse de multiplier par 1 000."
    ),
    tags: ["decimal_calcul", "multiplier_01", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_mult01_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_multiplier_par_01",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule : 0,1 × 0,1",
    format: "qcm",
    choices: ["0,01", "0,2", "0,1", "1"],
    expected: ["0,01"],
    comparator: "mcq_exact",
    hint: "Un dixième d'un dixième, c'est quoi ?",
    explanation: explDecimal(
      "0,1 × 0,1, c'est prendre le dixième de 0,1, soit 0,1 ÷ 10 = 0,01. Autrement dit, un dixième d'un dixième est un centième : 1/10 × 1/10 = 1/100. Le piège est de répondre 0,2 en ADDITIONNANT les deux nombres au lieu de les multiplier."
    ),
    tags: ["decimal_calcul", "multiplier_01", "automatisme", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "decimal_mult01_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_multiplier_par_01",
    difficulty: 4,
    theme: "neutral",
    text: "Sans poser le calcul : le résultat de 250 × 0,1 est-il plus grand ou plus petit que 250 ?",
    format: "qcm",
    choices: [
      "plus petit, car on prend seulement un dixième de 250",
      "plus grand, car une multiplication agrandit toujours",
      "égal à 250, car multiplier par 0,1 ne change rien",
      "plus grand, car 250 est un grand nombre",
    ],
    expected: ["plus petit, car on prend seulement un dixième de 250"],
    comparator: "mcq_exact",
    hint: "0,1 est plus petit que 1.",
    explanation: explDecimal(
      "250 × 0,1 = 25, dix fois moins que 250. Multiplier par un nombre PLUS PETIT QUE 1 rend le résultat plus petit : c'est vrai pour 0,1 comme pour 0,5, qui donne la moitié. La règle « multiplier agrandit » n'était valable que tant qu'on multipliait par des entiers supérieurs à 1."
    ),
    tags: ["decimal_calcul", "multiplier_01", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "decimal_mult01_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_multiplier_par_01",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace la multiplication par la division correspondante.",
    tags: ["decimal_calcul", "multiplier_01", "template"],
    generate: () => {
      const facteurs = [
        { texte: "0,1", diviseur: 10, nom: "un dixième", fraction: "1/10" },
        { texte: "0,01", diviseur: 100, nom: "un centième", fraction: "1/100" },
        { texte: "0,001", diviseur: 1000, nom: "un millième", fraction: "1/1000" },
      ];
      const f = facteurs[entierAleatoire(0, facteurs.length - 1)];

      // Une fois sur deux un entier, une fois sur deux un décimal : le BO
      // demande explicitement les deux.
      const avecVirgule = Math.random() < 0.5;
      const nombre = avecVirgule
        ? Number((entierAleatoire(11, 999) / 10).toFixed(1))
        : entierAleatoire(2, 9999);

      const resultat = Number((nombre / f.diviseur).toFixed(6));

      return {
        text: `Calcule : ${formatComma(nombre)} × ${f.texte}`,
        format: "short",
        expected: [formatComma(resultat), String(resultat)],
        comparator: "number_equal",
        explanation: explDecimal(
          `${f.texte} est l'écriture décimale de ${f.fraction}. Multiplier par ${f.texte}, c'est prendre ${f.nom} du nombre, donc le diviser par ${f.diviseur} : ${formatComma(nombre)} ÷ ${f.diviseur} = ${formatComma(resultat)}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "decimal_mult01_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "decimal_calcul",
    microId: "decimal_multiplier_par_01",
    difficulty: 4,
    theme: "neutral",
    hint: "Passe par la fraction : 0,1 c'est 1/10.",
    tags: ["decimal_calcul", "multiplier_01", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique pourquoi multiplier par 0,01 revient exactement à diviser par 100.",
          mots: ["centième", "centieme", "1/100", "fraction", "divise", "100"],
          r: "0,01 est l'écriture décimale de la fraction 1/100. Multiplier un nombre par 1/100, c'est en prendre un centième — c'est-à-dire le partager en 100 parts égales et en garder une, ce qui est exactement une division par 100. Ainsi 5,2 × 0,01 = 5,2 ÷ 100 = 0,052.",
        },
        {
          q: "« Quand on multiplie, le résultat est toujours plus grand. » Explique pourquoi cette phrase devient fausse en 6e.",
          mots: ["plus petit", "1", "0,1", "inférieur", "inferieur", "dixième", "dixieme"],
          r: "Elle n'était vraie que parce qu'on ne multipliait que par des entiers supérieurs à 1. Dès qu'on multiplie par un nombre plus petit que 1, le résultat devient plus petit : 250 × 0,1 = 25, et 8 × 0,5 = 4. Multiplier par 1 ne change rien : 1 est la frontière entre les facteurs qui agrandissent et ceux qui rapetissent.",
        },
        {
          q: "Explique ce qui arrive aux chiffres d'un nombre quand on le multiplie par 0,1, en parlant des rangs.",
          mots: ["rang", "recule", "dixième", "dixieme", "droite", "virgule", "unité", "unite"],
          r: "Chaque chiffre recule d'un rang : ce qui valait des unités ne vaut plus que des dixièmes, ce qui valait des dixièmes ne vaut plus que des centièmes. Les chiffres eux-mêmes ne changent pas, c'est leur position qui change — 37 × 0,1 donne 3,7, avec les mêmes 3 et 7. On dit souvent « la virgule se déplace », mais ce sont les chiffres qui changent de rang.",
        },
        {
          q: "Un élève écrit « 4 × 0,001 = 4 000 ». Explique son erreur et donne le bon résultat.",
          mots: ["millième", "millieme", "0,004", "divise", "1 000", "plus petit"],
          r: "Il a vu les trois zéros de 0,001 et a cru qu'il fallait les ajouter au nombre, comme pour une multiplication par 1 000. Mais 0,001 vaut 1/1000, il est bien plus PETIT que 1 : multiplier par lui divise par 1 000. Le bon résultat est 4 ÷ 1 000 = 0,004, soit quatre millièmes.",
        },
      ];
      const c = cas[entierAleatoire(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: explDecimal(c.r),
      };
    },
  },
];
