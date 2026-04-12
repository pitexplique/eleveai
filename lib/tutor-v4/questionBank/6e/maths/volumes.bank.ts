import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function expectedExplanation(expected: string[]) {
  const answer = expected[0] ?? "";
  return answer
    ? `La bonne réponse attendue est : ${answer}. Relis les données puis compare ton raisonnement.`
    : "Relis les données de l’énoncé et vérifie chaque étape du calcul.";
}


function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const volumesBank: TutorBankItemV4[] = [
  // =========================
  // VOLUME_UNITE
  // =========================
  {
    kind: "fixed",
    id: "volume_unite_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_unite",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité est adaptée pour mesurer le volume d’un aquarium ?",
    format: "qcm",
    choices: ["cm", "cm²", "cm³", "kg"],
    expected: ["cm³"],
    explanation: expectedExplanation(["cm³"]),
    comparator: "mcq_exact",
    hint: "Un volume se mesure en unités “cubes”.",
    tags: ["volumes", "unite", "qcm"],
  },
  {
    kind: "fixed",
    id: "volume_unite_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_unite",
    difficulty: 1,
    theme: "neutral",
    text: "Quel symbole correspond à une unité de volume ?",
    format: "qcm",
    choices: ["m", "m²", "m³", "m/s"],
    expected: ["m³"],
    explanation: expectedExplanation(["m³"]),
    comparator: "mcq_exact",
    hint: "Le petit 3 indique un volume.",
    tags: ["volumes", "unite", "qcm"],
  },
  {
    kind: "fixed",
    id: "volume_unite_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_unite",
    difficulty: 1,
    theme: "neutral",
    text: "Un volume se mesure plutôt en…",
    format: "qcm",
    choices: ["unités simples", "unités carrées", "unités cubes", "degrés"],
    expected: ["unités cubes"],
    explanation: expectedExplanation(["unités cubes"]),
    comparator: "mcq_exact",
    hint: "On empile des petits cubes.",
    tags: ["volumes", "unite", "qcm"],
  },
  {
    kind: "fixed",
    id: "volume_unite_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_unite",
    difficulty: 2,
    theme: "neutral",
    text: "Laquelle de ces écritures désigne un volume ?",
    format: "qcm",
    choices: ["12 cm", "12 cm²", "12 cm³", "12 g"],
    expected: ["12 cm³"],
    explanation: expectedExplanation(["12 cm³"]),
    comparator: "mcq_exact",
    hint: "Regarde l’exposant.",
    tags: ["volumes", "unite", "qcm"],
  },
  {
    kind: "fixed",
    id: "volume_unite_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_unite",
    difficulty: 2,
    theme: "reunion",
    text: "Pour mesurer le volume d’un grand bac à poissons à La Réunion, quelle unité peut-on utiliser ?",
    format: "qcm",
    choices: ["m", "m²", "m³", "cm"],
    expected: ["m³"],
    explanation: expectedExplanation(["m³"]),
    comparator: "mcq_exact",
    hint: "Un grand bac occupe un espace en trois dimensions.",
    tags: ["volumes", "unite", "reunion", "qcm"],
  },

  // =========================
  // VOLUME_COMPTER
  // =========================
  {
    kind: "fixed",
    id: "volume_compter_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_compter",
    difficulty: 2,
    theme: "neutral",
    text: "Un solide est formé de 6 petits cubes identiques. Quel est son volume en cubes unités ?",
    format: "short",
    expected: ["6"],
    explanation: expectedExplanation(["6"]),
    comparator: "number_equal",
    hint: "On compte simplement les cubes.",
    tags: ["volumes", "compter"],
  },
  {
    kind: "fixed",
    id: "volume_compter_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_compter",
    difficulty: 2,
    theme: "neutral",
    text: "Un empilement contient 10 cubes unités. Quel est son volume ?",
    format: "short",
    expected: ["10"],
    explanation: expectedExplanation(["10"]),
    comparator: "number_equal",
    hint: "Le volume correspond ici au nombre de cubes.",
    tags: ["volumes", "compter"],
  },
  {
    kind: "fixed",
    id: "volume_compter_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_compter",
    difficulty: 3,
    theme: "neutral",
    text: "Un pavé est formé de 2 rangées de 4 cubes. Quel est son volume en cubes unités ?",
    format: "short",
    expected: ["8"],
    explanation: expectedExplanation(["8"]),
    comparator: "number_equal",
    hint: "2 × 4 cubes.",
    tags: ["volumes", "compter"],
  },
  {
    kind: "fixed",
    id: "volume_compter_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_compter",
    difficulty: 2,
    theme: "neutral",
    text: "Un solide contient 12 cubes unités. Son volume vaut…",
    format: "qcm",
    choices: ["12", "6", "24", "3"],
    expected: ["12"],
    explanation: expectedExplanation(["12"]),
    comparator: "mcq_exact",
    hint: "On compte les cubes unités.",
    tags: ["volumes", "compter", "qcm"],
  },
  {
    kind: "fixed",
    id: "volume_compter_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_compter",
    difficulty: 3,
    theme: "neutral",
    text: "Un pavé est formé de 3 couches de 5 cubes chacune. Quel est son volume ?",
    format: "qcm",
    choices: ["8", "10", "15", "20"],
    expected: ["15"],
    explanation: expectedExplanation(["15"]),
    comparator: "mcq_exact",
    hint: "3 × 5 cubes.",
    tags: ["volumes", "compter", "qcm"],
  },

  // =========================
  // VOLUME_COMPARER
  // =========================
  {
    kind: "fixed",
    id: "volume_comparer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel volume est le plus grand : 8 cm³ ou 12 cm³ ?",
    format: "short",
    expected: ["12", "12 cm3", "12 cm³"],
    explanation: expectedExplanation(["12", "12 cm3", "12 cm³"]),
    comparator: "contains_keyword",
    hint: "Compare les nombres 8 et 12.",
    tags: ["volumes", "comparer"],
  },
  {
    kind: "fixed",
    id: "volume_comparer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel volume est le plus petit : 15 cm³ ou 9 cm³ ?",
    format: "short",
    expected: ["9", "9 cm3", "9 cm³"],
    explanation: expectedExplanation(["9", "9 cm3", "9 cm³"]),
    comparator: "contains_keyword",
    hint: "Compare les nombres 15 et 9.",
    tags: ["volumes", "comparer"],
  },
  {
    kind: "fixed",
    id: "volume_comparer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel volume est le plus grand ?",
    format: "qcm",
    choices: ["7 cm³", "11 cm³", "9 cm³", "10 cm³"],
    expected: ["11 cm³"],
    explanation: expectedExplanation(["11 cm³"]),
    comparator: "mcq_exact",
    hint: "Choisis le plus grand nombre.",
    tags: ["volumes", "comparer", "qcm"],
  },
  {
    kind: "fixed",
    id: "volume_comparer_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Un solide A contient 14 cubes. Un solide B contient 12 cubes. Lequel a le plus grand volume ?",
    format: "qcm",
    choices: ["A", "B", "Ils sont égaux", "On ne peut pas savoir"],
    expected: ["A"],
    explanation: expectedExplanation(["A"]),
    comparator: "mcq_exact",
    hint: "Le plus de cubes donne le plus grand volume.",
    tags: ["volumes", "comparer", "qcm"],
  },
  {
    kind: "fixed",
    id: "volume_comparer_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_comparer",
    difficulty: 3,
    theme: "reunion",
    text: "Quel bac contient le plus : 18 cm³ ou 25 cm³ ?",
    format: "short",
    expected: ["25", "25 cm3", "25 cm³"],
    explanation: expectedExplanation(["25", "25 cm3", "25 cm³"]),
    comparator: "contains_keyword",
    hint: "Le plus grand nombre donne le plus grand volume.",
    tags: ["volumes", "comparer", "reunion"],
  },

  // =========================
  // VOLUME_ASSEMBLAGE
  // =========================
  {
    kind: "fixed",
    id: "volume_assemblage_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_assemblage",
    difficulty: 3,
    theme: "neutral",
    text: "On assemble deux solides de 4 cubes et 3 cubes. Quel est le volume total ?",
    format: "short",
    expected: ["7"],
    explanation: expectedExplanation(["7"]),
    comparator: "number_equal",
    hint: "On additionne les cubes.",
    tags: ["volumes", "assemblage"],
  },
  {
    kind: "fixed",
    id: "volume_assemblage_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_assemblage",
    difficulty: 3,
    theme: "neutral",
    text: "Un solide de 6 cubes est collé à un solide de 5 cubes. Quel est le volume total ?",
    format: "short",
    expected: ["11"],
    explanation: expectedExplanation(["11"]),
    comparator: "number_equal",
    hint: "6 + 5.",
    tags: ["volumes", "assemblage"],
  },
  {
    kind: "fixed",
    id: "volume_assemblage_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_assemblage",
    difficulty: 3,
    theme: "neutral",
    text: "On assemble 8 cubes et 4 cubes. Le volume total est…",
    format: "qcm",
    choices: ["4", "8", "12", "16"],
    expected: ["12"],
    explanation: expectedExplanation(["12"]),
    comparator: "mcq_exact",
    hint: "Additionne 8 et 4.",
    tags: ["volumes", "assemblage", "qcm"],
  },
  {
    kind: "fixed",
    id: "volume_assemblage_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_assemblage",
    difficulty: 4,
    theme: "neutral",
    text: "Un solide A de 10 cubes est coupé en deux morceaux de 4 cubes et 6 cubes. Si on réassemble les deux morceaux, quel volume retrouve-t-on ?",
    format: "qcm",
    choices: ["4", "6", "10", "14"],
    expected: ["10"],
    explanation: expectedExplanation(["10"]),
    comparator: "mcq_exact",
    hint: "Le volume total reste le même.",
    tags: ["volumes", "assemblage", "qcm"],
  },

  // =========================
  // VOLUME_LIRE
  // =========================
  {
    kind: "fixed",
    id: "volume_lire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans l’écriture 18 cm³, quel est le volume ?",
    format: "short",
    expected: ["18"],
    explanation: expectedExplanation(["18"]),
    comparator: "number_equal",
    hint: "Lis le nombre avant l’unité.",
    tags: ["volumes", "lire"],
  },
  {
    kind: "fixed",
    id: "volume_lire_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Le solide a un volume de 24 cm³. Combien cela représente-t-il de cubes unités de 1 cm³ ?",
    format: "short",
    expected: ["24"],
    explanation: expectedExplanation(["24"]),
    comparator: "number_equal",
    hint: "24 cm³ = 24 cubes de 1 cm³.",
    tags: ["volumes", "lire"],
  },
  {
    kind: "fixed",
    id: "volume_lire_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans “9 m³”, le volume vaut…",
    format: "qcm",
    choices: ["3", "9", "27", "90"],
    expected: ["9"],
    explanation: expectedExplanation(["9"]),
    comparator: "mcq_exact",
    hint: "On lit directement le nombre.",
    tags: ["volumes", "lire", "qcm"],
  },
  {
    kind: "fixed",
    id: "volume_lire_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_lire",
    difficulty: 3,
    theme: "neutral",
    text: "Quel solide a le plus grand volume ?",
    format: "qcm",
    choices: ["6 cm³", "14 cm³", "9 cm³", "12 cm³"],
    expected: ["14 cm³"],
    explanation: expectedExplanation(["14 cm³"]),
    comparator: "mcq_exact",
    hint: "Lis le nombre avant l’unité.",
    tags: ["volumes", "lire", "qcm"],
  },
  {
    kind: "fixed",
    id: "volume_lire_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_lire",
    difficulty: 3,
    theme: "reunion",
    text: "Un bac de culture a un volume de 30 cm³. Combien de cubes unités cela représente-t-il ?",
    format: "short",
    expected: ["30"],
    explanation: expectedExplanation(["30"]),
    comparator: "number_equal",
    hint: "Le nombre donne directement le volume en cubes unités de 1 cm³.",
    tags: ["volumes", "lire", "reunion"],
  },

  // =========================
  // VOLUME_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "volume_defis_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi une aire ne peut-elle pas s’exprimer en cm³ ?",
    format: "short",
    expected: ["aire", "cm²", "volume", "cm³"],
    explanation: expectedExplanation(["aire", "cm²", "volume", "cm³"]),
    comparator: "contains_keyword",
    hint: "Une aire est en 2 dimensions, un volume en 3 dimensions.",
    tags: ["volumes", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "volume_defis_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi un solide de 12 cubes a un volume plus grand qu’un solide de 9 cubes.",
    format: "short",
    expected: ["12", "9", "plus grand", "cubes"],
    explanation: expectedExplanation(["12", "9", "plus grand", "cubes"]),
    comparator: "contains_keyword",
    hint: "Plus il y a de cubes, plus le volume est grand.",
    tags: ["volumes", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "volume_defis_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Donne un exemple de volume compris entre 10 cm³ et 15 cm³.",
    format: "short",
    expected: ["11", "12", "13", "14"],
    explanation: expectedExplanation(["11", "12", "13", "14"]),
    comparator: "exact_text",
    hint: "Choisis un nombre strictement entre 10 et 15.",
    tags: ["volumes", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "volume_defis_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_defis",
    difficulty: 5,
    theme: "reunion",
    text: "À La Réunion, deux bacs de 18 cm³ et 12 cm³ sont réunis. Quel volume total obtient-on ?",
    format: "short",
    expected: ["30"],
    explanation: expectedExplanation(["30"]),
    comparator: "number_equal",
    hint: "Additionne les deux volumes.",
    tags: ["volumes", "defi", "reunion"],
  },

  // =========================
  // TEMPLATES - UNITE
  // =========================
  {
    kind: "template",
    id: "volume_unite_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_unite",
    difficulty: 1,
    theme: "neutral",
    hint: "Un volume se mesure en unités cubes.",
    tags: ["volumes", "unite", "template"],
    generate: () => {
      const choices = shuffle(["cm³", "cm²", "cm", "kg"]);
      return {
        text: "Quelle unité est adaptée pour mesurer un volume ?",
        format: "qcm",
        choices,
        expected: ["cm³"],
        explanation: expectedExplanation(["cm³"]),
        comparator: "mcq_exact",
      };
    },
  },
  {
    kind: "template",
    id: "volume_unite_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_unite",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche l’écriture avec l’exposant 3.",
    tags: ["volumes", "unite", "template"],
    generate: () => {
      const good = ["m³", "cm³"][Math.floor(Math.random() * 2)];
      const badBase = good.startsWith("m") ? ["m", "m²", "m/s"] : ["cm", "cm²", "cm/s"];
      return {
        text: "Laquelle de ces écritures désigne un volume ?",
        format: "qcm",
        choices: shuffle([good, ...badBase]),
        expected: [good],
        explanation: expectedExplanation([good]),
        comparator: "mcq_exact",
      };
    },
  },

  // =========================
  // TEMPLATES - COMPTER
  // =========================
  {
    kind: "template",
    id: "volume_compter_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_compter",
    difficulty: 2,
    theme: "neutral",
    hint: "Le volume correspond au nombre de cubes unités.",
    tags: ["volumes", "compter", "template"],
    generate: () => {
      const n = randomInt(4, 15);
      return {
        text: `Un solide est formé de ${n} cubes unités. Quel est son volume ?`,
        format: "short",
        expected: [String(n)],
        explanation: expectedExplanation([String(n)]),
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "volume_compter_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_compter",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie le nombre de couches par le nombre de cubes par couche.",
    tags: ["volumes", "compter", "template"],
    generate: () => {
      const a = randomInt(2, 4);
      const b = randomInt(3, 6);
      return {
        text: `Un solide a ${a} couches de ${b} cubes chacune. Quel est son volume ?`,
        format: "short",
        expected: [String(a * b)],
        explanation: expectedExplanation([String(a * b)]),
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "volume_compter_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_compter",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte ou multiplie les cubes.",
    tags: ["volumes", "compter", "qcm", "template"],
    generate: () => {
      const a = randomInt(2, 4);
      const b = randomInt(2, 5);
      const good = a * b;
      return {
        text: `Un pavé a ${a} rangées de ${b} cubes. Quel est son volume ?`,
        format: "qcm",
        choices: shuffle([
          String(good),
          String(good - 1),
          String(good + 1),
          String(a + b),
        ]),
        expected: [String(good)],
        explanation: expectedExplanation([String(good)]),
        comparator: "mcq_exact",
      };
    },
  },

  // =========================
  // TEMPLATES - COMPARER
  // =========================
  {
    kind: "template",
    id: "volume_comparer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare les deux nombres.",
    tags: ["volumes", "comparer", "template"],
    generate: () => {
      const a = randomInt(5, 20);
      let b = randomInt(5, 20);
      while (b === a) b = randomInt(5, 20);
      const good = Math.max(a, b);

      return {
        text: `Quel volume est le plus grand : ${a} cm³ ou ${b} cm³ ?`,
        format: "short",
        expected: [String(good), `${good} cm³`, `${good} cm3`],
        explanation: expectedExplanation([String(good), `${good} cm³`, `${good} cm3`]),
        comparator: "contains_keyword",
      };
    },
  },
  {
    kind: "template",
    id: "volume_comparer_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Le plus grand nombre correspond au plus grand volume.",
    tags: ["volumes", "comparer", "qcm", "template"],
    generate: () => {
      const values = shuffle([
        randomInt(6, 10),
        randomInt(11, 15),
        randomInt(16, 20),
        randomInt(21, 25),
      ]);
      const good = Math.max(...values);

      return {
        text: "Quel est le plus grand volume ?",
        format: "qcm",
        choices: values.map((v) => `${v} cm³`),
        expected: [`${good} cm³`],
        explanation: expectedExplanation([`${good} cm³`]),
        comparator: "mcq_exact",
      };
    },
  },

  // =========================
  // TEMPLATES - ASSEMBLAGE
  // =========================
  {
    kind: "template",
    id: "volume_assemblage_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_assemblage",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les deux volumes.",
    tags: ["volumes", "assemblage", "template"],
    generate: () => {
      const a = randomInt(3, 10);
      const b = randomInt(2, 8);
      return {
        text: `On assemble un solide de ${a} cubes et un solide de ${b} cubes. Quel est le volume total ?`,
        format: "short",
        expected: [String(a + b)],
        explanation: expectedExplanation([String(a + b)]),
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "volume_assemblage_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_assemblage",
    difficulty: 3,
    theme: "neutral",
    hint: "Le volume total est la somme des deux volumes.",
    tags: ["volumes", "assemblage", "qcm", "template"],
    generate: () => {
      const a = randomInt(4, 9);
      const b = randomInt(3, 7);
      const good = a + b;
      return {
        text: `On réunit un solide de ${a} cubes et un solide de ${b} cubes. Quel est le volume total ?`,
        format: "qcm",
        choices: shuffle([
          String(good),
          String(a),
          String(b),
          String(good + 2),
        ]),
        expected: [String(good)],
        explanation: expectedExplanation([String(good)]),
        comparator: "mcq_exact",
      };
    },
  },

  // =========================
  // TEMPLATES - LIRE
  // =========================
  {
    kind: "template",
    id: "volume_lire_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis le nombre avant l’unité.",
    tags: ["volumes", "lire", "template"],
    generate: () => {
      const n = randomInt(5, 30);
      return {
        text: `Dans l’écriture ${n} cm³, quel est le volume ?`,
        format: "short",
        expected: [String(n)],
        explanation: expectedExplanation([String(n)]),
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "volume_lire_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_lire",
    difficulty: 3,
    theme: "neutral",
    hint: "Choisis le plus grand nombre si on demande le plus grand volume.",
    tags: ["volumes", "lire", "qcm", "template"],
    generate: () => {
      const values = shuffle([
        randomInt(6, 10),
        randomInt(11, 15),
        randomInt(16, 20),
        randomInt(21, 25),
      ]);
      const good = Math.max(...values);

      return {
        text: "Quel solide a le plus grand volume ?",
        format: "qcm",
        choices: values.map((v) => `${v} cm³`),
        expected: [`${good} cm³`],
        explanation: expectedExplanation([`${good} cm³`]),
        comparator: "mcq_exact",
      };
    },
  },

  // =========================
  // TEMPLATES - DEFIS
  // =========================
  {
    kind: "template",
    id: "volume_defis_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_defis",
    difficulty: 4,
    theme: "neutral",
    hint: "Relie le volume au nombre de cubes.",
    tags: ["volumes", "defi", "template"],
    generate: () => {
      const a = randomInt(8, 15);
      const b = randomInt(5, 12);
      const bigger = a > b ? a : b;

      return {
        text: `Deux solides contiennent ${a} cubes et ${b} cubes. Quel solide a le plus grand volume ?`,
        format: "short",
        expected: [String(bigger)],
        explanation: expectedExplanation([String(bigger)]),
        comparator: "contains_keyword",
      };
    },
  },
  {
    kind: "template",
    id: "volume_defis_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Choisis un nombre strictement entre les deux bornes.",
    tags: ["volumes", "defi", "template"],
    generate: () => {
      const low = randomInt(8, 12);
      const high = low + randomInt(3, 6);
      const possible = String(low + 1);

      return {
        text: `Donne un volume en cm³ plus grand que ${low} cm³ et plus petit que ${high} cm³.`,
        format: "short",
        expected: [possible, String(low + 2), String(high - 1)],
        explanation: expectedExplanation([possible, String(low + 2), String(high - 1)]),
        comparator: "exact_text",
      };
    },
  },
];
