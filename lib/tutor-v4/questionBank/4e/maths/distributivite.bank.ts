import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const distributiviteBank: TutorBankItemV4[] = [
  // =========================
  // DISTRIB_SIMPLE
  // =========================
  {
    kind: "template",
    id: "distrib_simple_tpl_formel_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "distributivite",
    microId: "distrib_simple",
    difficulty: 1,
    theme: "neutral",
    hint: "Le nombre devant la parenthèse multiplie chaque terme.",
    tags: ["distributivite", "simple", "formel", "template"],
    generate: () => {
      const a = randomInt(2, 8);
      const b = randomInt(1, 9);
      const letter = randomChoice(["x", "a", "y"]);

      return {
        text: `Développer : ${a}(${letter} + ${b})`,
        format: "short",
        expected: [`${a}${letter}+${a * b}`, `${a}${letter} + ${a * b}`],
        comparator: "contains_keyword",
        explanation: `${a}(${letter} + ${b}) = ${a}×${letter} + ${a}×${b} = ${a}${letter} + ${a * b}.`,
      };
    },
  },
  {
    kind: "template",
    id: "distrib_simple_tpl_formel_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "distributivite",
    microId: "distrib_simple",
    difficulty: 1,
    theme: "neutral",
    hint: "Distribue le coefficient à chaque terme de la parenthèse.",
    tags: ["distributivite", "simple", "soustraction", "template"],
    generate: () => {
      const a = randomInt(2, 8);
      const b = randomInt(1, 9);
      const letter = randomChoice(["x", "a", "y"]);

      return {
        text: `Développer : ${a}(${letter} - ${b})`,
        format: "short",
        expected: [`${a}${letter}-${a * b}`, `${a}${letter} - ${a * b}`],
        comparator: "contains_keyword",
        explanation: `${a}(${letter} - ${b}) = ${a}×${letter} - ${a}×${b} = ${a}${letter} - ${a * b}.`,
      };
    },
  },
  {
    kind: "template",
    id: "distrib_simple_tpl_signe_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "distributivite",
    microId: "distrib_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "Un signe négatif devant la parenthèse se distribue aussi.",
    tags: ["distributivite", "simple", "signe", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(1, 8);

      return {
        text: `Développer : -${a}(x + ${b})`,
        format: "short",
        expected: [`-${a}x-${a * b}`, `-${a}x - ${a * b}`],
        comparator: "contains_keyword",
        explanation: `-${a}(x + ${b}) = -${a}x - ${a * b}.`,
      };
    },
  },
  {
    kind: "template",
    id: "distrib_simple_tpl_nature_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "distributivite",
    microId: "distrib_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "Le nombre de rangées multiplie ce qu’il y a dans chaque rangée.",
    tags: ["distributivite", "nature", "template"],
    generate: () => {
      const rows = randomInt(2, 6);
      const extra = randomInt(1, 5);

      return {
        text: `Dans un jardin, on plante ${rows} rangées contenant chacune x + ${extra} fleurs. Exprimer le nombre total de fleurs sous forme développée.`,
        format: "short",
        expected: [`${rows}x+${rows * extra}`, `${rows}x + ${rows * extra}`],
        comparator: "contains_keyword",
        explanation: `${rows} rangées de x + ${extra} fleurs donnent ${rows}(x + ${extra}) = ${rows}x + ${rows * extra}.`,
      };
    },
  },
  {
    kind: "template",
    id: "distrib_simple_tpl_maison_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "distributivite",
    microId: "distrib_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque pièce a la même longueur.",
    tags: ["distributivite", "maison", "template"],
    generate: () => {
      const pieces = randomInt(2, 5);
      const extra = randomInt(1, 4);

      return {
        text: `Dans un plan de maison, ${pieces} pièces ont chacune une longueur de x + ${extra} mètres. Exprimer la longueur totale sous forme développée.`,
        format: "short",
        expected: [`${pieces}x+${pieces * extra}`, `${pieces}x + ${pieces * extra}`],
        comparator: "contains_keyword",
        explanation: `${pieces}(x + ${extra}) = ${pieces}x + ${pieces * extra}.`,
      };
    },
  },
  {
    kind: "template",
    id: "distrib_simple_tpl_achat_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "distributivite",
    microId: "distrib_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "Il y a plusieurs lots identiques.",
    tags: ["distributivite", "achat", "template"],
    generate: () => {
      const lots = randomInt(2, 6);
      const bonus = randomInt(1, 5);

      return {
        text: `Un magasin vend ${lots} lots contenant chacun x stylos et ${bonus} gommes. Exprimer le nombre total d’objets sous forme développée.`,
        format: "short",
        expected: [`${lots}x+${lots * bonus}`, `${lots}x + ${lots * bonus}`],
        comparator: "contains_keyword",
        explanation: `${lots}(x + ${bonus}) = ${lots}x + ${lots * bonus}.`,
      };
    },
  },

  // =========================
  // DISTRIB_DOUBLE
  // =========================
  {
    kind: "template",
    id: "distrib_double_tpl_formel_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "distributivite",
    microId: "distrib_double",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque terme de la première parenthèse multiplie chaque terme de la seconde.",
    tags: ["distributivite", "double", "template"],
    generate: () => {
      const b = randomInt(1, 5);
      const c = randomInt(1, 5);
      const sum = b + c;
      const prod = b * c;

      return {
        text: `Développer : (x + ${b})(x + ${c})`,
        format: "short",
        expected: [
          `x²+${sum}x+${prod}`,
          `x^2+${sum}x+${prod}`,
          `x² + ${sum}x + ${prod}`,
          `x^2 + ${sum}x + ${prod}`,
        ],
        comparator: "contains_keyword",
        explanation: `(x + ${b})(x + ${c}) = x² + ${c}x + ${b}x + ${prod} = x² + ${sum}x + ${prod}.`,
      };
    },
  },
  {
    kind: "template",
    id: "distrib_double_tpl_formel_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "distributivite",
    microId: "distrib_double",
    difficulty: 3,
    theme: "neutral",
    hint: "Fais les quatre produits.",
    tags: ["distributivite", "double", "template"],
    generate: () => {
      const b = randomInt(1, 4);
      const c = randomInt(1, 4);
      const sum = c - b;
      const prod = -b * c;

      return {
        text: `Développer : (x - ${b})(x + ${c})`,
        format: "short",
        expected: [
          `x²+${sum}x-${b * c}`,
          `x^2+${sum}x-${b * c}`,
          `x² + ${sum}x - ${b * c}`,
          `x^2 + ${sum}x - ${b * c}`,
          `x²-${Math.abs(sum)}x-${b * c}`,
          `x^2-${Math.abs(sum)}x-${b * c}`,
          `x² - ${Math.abs(sum)}x - ${b * c}`,
          `x^2 - ${Math.abs(sum)}x - ${b * c}`,
        ],
        comparator: "contains_keyword",
        explanation: `(x - ${b})(x + ${c}) = x² + ${c}x - ${b}x - ${b * c}.`,
      };
    },
  },

  // =========================
  // DISTRIB_REDUIRE
  // =========================
  {
    kind: "template",
    id: "distrib_reduire_tpl_formel_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "distributivite",
    microId: "distrib_reduire",
    difficulty: 2,
    theme: "neutral",
    hint: "Développe d’abord puis regroupe les termes semblables.",
    tags: ["distributivite", "reduire", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(1, 6);
      const c = randomInt(1, 5);
      const coeff = a + c;
      const constante = a * b;

      return {
        text: `Développer puis réduire : ${a}(x + ${b}) + ${c}x`,
        format: "short",
        expected: [`${coeff}x+${constante}`, `${coeff}x + ${constante}`],
        comparator: "contains_keyword",
        explanation: `${a}(x + ${b}) + ${c}x = ${a}x + ${constante} + ${c}x = ${coeff}x + ${constante}.`,
      };
    },
  },
  {
    kind: "template",
    id: "distrib_reduire_tpl_formel_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "distributivite",
    microId: "distrib_reduire",
    difficulty: 3,
    theme: "neutral",
    hint: "Développe puis réduis les termes en x et les constantes.",
    tags: ["distributivite", "reduire", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const b = randomInt(1, 5);
      const c = randomInt(1, 4);
      const d = randomInt(1, 8);
      const coeff = a + c;
      const constante = a * b + d;

      return {
        text: `Développer puis réduire : ${a}(x + ${b}) + ${c}x + ${d}`,
        format: "short",
        expected: [`${coeff}x+${constante}`, `${coeff}x + ${constante}`],
        comparator: "contains_keyword",
        explanation: `${a}(x + ${b}) + ${c}x + ${d} = ${a}x + ${a * b} + ${c}x + ${d} = ${coeff}x + ${constante}.`,
      };
    },
  },
  {
    kind: "template",
    id: "distrib_reduire_tpl_batiment_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "distributivite",
    microId: "distrib_reduire",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule la longueur répétée puis ajoute le reste.",
    tags: ["distributivite", "batiment", "template"],
    generate: () => {
      const sections = randomInt(2, 5);
      const extra = randomInt(1, 4);
      const fixed = randomInt(2, 8);
      const coeff = sections;
      const constante = sections * extra + fixed;

      return {
        text: `Un plan de couloir comporte ${sections} sections identiques de longueur x + ${extra} mètres, puis ${fixed} mètres supplémentaires. Exprimer la longueur totale développée et réduite.`,
        format: "short",
        expected: [`${coeff}x+${constante}`, `${coeff}x + ${constante}`],
        comparator: "contains_keyword",
        explanation: `${sections}(x + ${extra}) + ${fixed} = ${coeff}x + ${sections * extra} + ${fixed} = ${coeff}x + ${constante}.`,
      };
    },
  },

  // =========================
  // DISTRIB_RECONNAITRE
  // =========================
  {
    kind: "template",
    id: "distrib_reconnaitre_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "distributivite",
    microId: "distrib_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Cherche l’écriture avec une parenthèse précédée d’un coefficient.",
    tags: ["distributivite", "reconnaitre", "template"],
    generate: () => {
      const a = randomInt(2, 8);
      const b = randomInt(1, 9);
      const c = randomInt(1, 9);

      const correct = `${a}(x + ${b})`;
      const wrong1 = `${a}x + ${b}`;
      const wrong2 = `${c} + x`;
      const wrong3 = `${a}x - ${c}`;

      const choices = randomChoice([
        [correct, wrong1, wrong2, wrong3],
        [wrong1, correct, wrong2, wrong3],
        [wrong1, wrong2, correct, wrong3],
        [wrong1, wrong2, wrong3, correct],
      ]);

      return {
        text: "Quelle expression faut-il développer ?",
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: `${correct} doit être développée car il y a un produit devant une parenthèse.`,
      };
    },
  },
  {
    kind: "template",
    id: "distrib_reconnaitre_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "distributivite",
    microId: "distrib_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Une expression développée ne contient plus de parenthèses à distribuer.",
    tags: ["distributivite", "reconnaitre", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(1, 8);
      const correct = `${a}x + ${a * b}`;
      const wrong1 = `${a}(x + ${b})`;
      const wrong2 = `x + ${b}`;
      const wrong3 = `${a} + x`;

      const choices = randomChoice([
        [correct, wrong1, wrong2, wrong3],
        [wrong1, correct, wrong2, wrong3],
        [wrong1, wrong2, correct, wrong3],
        [wrong1, wrong2, wrong3, correct],
      ]);

      return {
        text: "Laquelle de ces expressions est déjà développée ?",
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: `${correct} est déjà développée car il n’y a plus de parenthèses.`,
      };
    },
  },

  // =========================
  // DISTRIB_DEFIS
  // =========================
  {
    kind: "template",
    id: "distrib_defis_tpl_justification_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "distributivite",
    microId: "distrib_defis",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique que le coefficient multiplie tous les termes de la parenthèse.",
    tags: ["distributivite", "defi", "justification", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(1, 6);

      return {
        text: `Explique pourquoi ${a}(x + ${b}) donne ${a}x + ${a * b}.`,
        format: "short",
        expected: [
          `${a}x+${a * b}`,
          `${a}x + ${a * b}`,
          "multiplie",
          "parenthèse",
          "chaque terme",
        ],
        comparator: "contains_keyword",
        explanation: `Le coefficient ${a} multiplie les deux termes de la parenthèse : ${a}×x et ${a}×${b}.`,
      };
    },
  },
  {
    kind: "template",
    id: "distrib_defis_tpl_erreur_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "distributivite",
    microId: "distrib_defis",
    difficulty: 4,
    theme: "neutral",
    hint: "Le coefficient devant la parenthèse ne multiplie pas seulement la lettre.",
    tags: ["distributivite", "defi", "erreur", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(1, 6);

      return {
        text: `Un élève affirme que ${a}(x + ${b}) = ${a}x + ${b}. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: `Non. ${a} doit multiplier x et aussi ${b}. On obtient ${a}x + ${a * b}.`,
      };
    },
  },
  {
    kind: "template",
    id: "distrib_defis_tpl_maison_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "distributivite",
    microId: "distrib_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Développe chaque partie du plan puis additionne.",
    tags: ["distributivite", "defi", "maison", "template"],
    generate: () => {
      const a = randomInt(2, 4);
      const b = randomInt(1, 4);
      const c = randomInt(2, 4);
      const d = randomInt(1, 4);
      const coeff = a + c;
      const constante = a * b + c * d;

      return {
        text: `Dans un plan de maison, ${a} pièces mesurent chacune x + ${b} mètres et ${c} autres pièces mesurent chacune x + ${d} mètres. Exprimer la longueur totale développée et réduite.`,
        format: "short",
        expected: [`${coeff}x+${constante}`, `${coeff}x + ${constante}`],
        comparator: "contains_keyword",
        explanation: `${a}(x + ${b}) + ${c}(x + ${d}) = ${a}x + ${a * b} + ${c}x + ${c * d} = ${coeff}x + ${constante}.`,
      };
    },
  },
  {
    kind: "template",
    id: "distrib_defis_tpl_nature_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "distributivite",
    microId: "distrib_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Chaque groupe contient une même expression.",
    tags: ["distributivite", "defi", "nature", "template"],
    generate: () => {
      const groupes = randomInt(2, 5);
      const arbres = randomInt(1, 5);

      return {
        text: `Dans un parc, on a ${groupes} zones contenant chacune x arbustes et ${arbres} arbres. Exprimer le nombre total de végétaux sous forme développée.`,
        format: "short",
        expected: [`${groupes}x+${groupes * arbres}`, `${groupes}x + ${groupes * arbres}`],
        comparator: "contains_keyword",
        explanation: `${groupes}(x + ${arbres}) = ${groupes}x + ${groupes * arbres}.`,
      };
    },
  },
];