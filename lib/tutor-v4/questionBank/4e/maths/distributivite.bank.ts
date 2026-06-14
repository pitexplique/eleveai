/**
 * =========================================================
 * DISTRIBUTIVITE.BANK.TS
 * =========================================================
 *
 * Banque de questions pour la notion de DISTRIBUTIVITÉ (4e).
 *
 * 🎯 OBJECTIF PÉDAGOGIQUE
 * Construire une maîtrise progressive de la distributivité :
 * - comprendre le principe (multiplier chaque terme)
 * - savoir développer
 * - savoir réduire
 * - reconnaître les situations
 * - éviter les erreurs fréquentes
 * - expliquer et justifier (niveau rédaction)
 *
 * ---------------------------------------------------------
 * 🧠 STRUCTURE PAR MICRO-COMPÉTENCES
 * ---------------------------------------------------------
 *
 * 1. distrib_simple
 *    → distributivité simple (a(x + b))
 *    → formes positives, négatives
 *    → contextes concrets (jardin, maison, achats)
 *
 * 2. distrib_double
 *    → double distributivité ( (x + a)(x + b) )
 *    → compréhension des 4 produits
 *
 * 3. distrib_reduire
 *    → développer puis regrouper les termes semblables
 *    → simplification d’expressions
 *
 * 4. distrib_reconnaitre
 *    → identifier une expression à développer
 *    → distinguer forme développée / non développée
 *
 * 5. distrib_defis
 *    → erreurs fréquentes
 *    → justification
 *    → problèmes complexes et modélisation
 *
 * ---------------------------------------------------------
 * 🧩 TYPES DE QUESTIONS UTILISÉS
 * ---------------------------------------------------------
 *
 * ✔ TEMPLATE (majoritaire)
 *   → génération infinie de variations
 *   → évite le bachotage
 *   → permet progression adaptative
 *
 * ✔ FIXED (QCM)
 *   → stabilisation des bases
 *   → correction immédiate
 *   → ancrage des notions clés
 *
 * ✔ OPEN (réponses ouvertes)
 *   → explication / justification
 *   → développement du raisonnement
 *   → aligné avec les attentes du collège
 *
 * ---------------------------------------------------------
 * ⚙️ CHOIX TECHNIQUES
 * ---------------------------------------------------------
 *
 * - comparator "contains_keyword" :
 *   → tolérance aux écritures (espaces, formats)
 *   → permet validation partielle en open
 *
 * - génération contrôlée :
 *   → valeurs simples pour favoriser calcul mental
 *   → expressions lisibles (pas de surcharge cognitive)
 *
 * - thèmes contextualisés :
 *   → situations concrètes (maison, nature, achats)
 *   → engagement des élèves
 *
 * ---------------------------------------------------------
 * ⚠️ POINTS DE VIGILANCE PÉDAGOGIQUES
 * ---------------------------------------------------------
 *
 * - éviter la confusion :
 *   ❌ a(x + b) = ax + b
 *   ✔ a(x + b) = ax + ab
 *
 * - bien distinguer :
 *   → développer vs réduire
 *
 * - insister sur :
 *   → "le coefficient multiplie chaque terme"
 *
 * ---------------------------------------------------------
 * 🚀 OBJECTIF FINAL
 * ---------------------------------------------------------
 *
 * Amener l’élève à :
 * - automatiser la distributivité
 * - comprendre ce qu’il fait (et pas juste appliquer)
 * - expliquer ses calculs
 * - éviter les erreurs classiques
 *
 * Cette banque est conçue pour être :
 * ✔ robuste (beaucoup de cas)
 * ✔ progressive (difficulté 1 → 5)
 * ✔ intelligente (templates + open)
 * ✔ adaptée au Tutor V4 (pilotage IA)
 *
 * =========================================================
 */
import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function formatLinearExpression(coeff: number, constante: number, spaced = false) {
  const xPart = coeff === 0 ? "" : coeff === 1 ? "x" : coeff === -1 ? "-x" : `${coeff}x`;

  if (constante === 0) return xPart || "0";
  if (!xPart) return `${constante}`;

  const sign = constante > 0 ? "+" : "-";
  const separator = spaced ? ` ${sign} ` : sign;
  return `${xPart}${separator}${Math.abs(constante)}`;
}

function formatQuadraticExpression(linear: number, constante: number, power: "²" | "^2", spaced = false) {
  let expression = `x${power}`;

  if (linear !== 0) {
    const sign = linear > 0 ? "+" : "-";
    const coeff = Math.abs(linear) === 1 ? "" : `${Math.abs(linear)}`;
    expression += spaced ? ` ${sign} ${coeff}x` : `${sign}${coeff}x`;
  }

  if (constante !== 0) {
    const sign = constante > 0 ? "+" : "-";
    expression += spaced ? ` ${sign} ${Math.abs(constante)}` : `${sign}${Math.abs(constante)}`;
  }

  return expression;
}

export const distributiviteBank: TutorBankItemV4[] = [
  // =========================
  // DISTRIB_SIMPLE
  // =========================
    {
    kind: "fixed",
    id: "litteral_distributivite_simple_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_simple",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle égalité est correcte ?",
    format: "qcm",
    choices: ["3(x + 4) = 3x + 4", "3(x + 4) = 3x + 12", "3(x + 4) = x + 12", "3(x + 4) = 7x"],
    expected: ["3(x + 4) = 3x + 12"],
    comparator: "mcq_exact",
    hint: "Le 3 multiplie x et 4.",
    explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          ("3(x + 4) = 3×x + 3×4 = 3x + 12.") +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
    tags: ["litteral_distributivite", "simple", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_distributivite_simple_tpl_formel_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_simple",
    difficulty: 1,
    theme: "neutral",
    hint: "Le nombre devant la parenthèse multiplie chaque terme.",
    tags: ["litteral_distributivite", "simple", "formel", "template"],
    generate: () => {
      const a = randomInt(2, 8);
      const b = randomInt(1, 9);
      const letter = randomChoice(["x", "a", "y"]);

      return {
        text: `Développer : ${a}(${letter} + ${b})`,
        format: "short",
        expected: [`${a}${letter}+${a * b}`, `${a}${letter} + ${a * b}`],
        comparator: "contains_keyword",
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`${a}(${letter} + ${b}) = ${a}×${letter} + ${a}×${b} = ${a}${letter} + ${a * b}.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
      };
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_simple_tpl_formel_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_simple",
    difficulty: 1,
    theme: "neutral",
    hint: "Distribue le coefficient à chaque terme de la parenthèse.",
    tags: ["litteral_distributivite", "simple", "soustraction", "template"],
    generate: () => {
      const a = randomInt(2, 8);
      const b = randomInt(1, 9);
      const letter = randomChoice(["x", "a", "y"]);

      return {
        text: `Développer : ${a}(${letter} - ${b})`,
        format: "short",
        expected: [`${a}${letter}-${a * b}`, `${a}${letter} - ${a * b}`],
        comparator: "contains_keyword",
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`${a}(${letter} - ${b}) = ${a}×${letter} - ${a}×${b} = ${a}${letter} - ${a * b}.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
      };
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_simple_tpl_signe_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "Un signe négatif devant la parenthèse se distribue aussi.",
    tags: ["litteral_distributivite", "simple", "signe", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(1, 8);

      return {
        text: `Développer : -${a}(x + ${b})`,
        format: "short",
        expected: [`-${a}x-${a * b}`, `-${a}x - ${a * b}`],
        comparator: "contains_keyword",
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`-${a}(x + ${b}) = -${a}x - ${a * b}.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
      };
    },
  },
    {
    kind: "fixed",
    id: "litteral_distributivite_simple_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi 4(x + 3) donne 4x + 12.",
    format: "open",
    expected: ["4", "multiplie", "x", "3"],
    comparator: "contains_keyword",
    hint: "Le nombre devant la parenthèse multiplie chaque terme.",
    explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          ("4 multiplie les deux termes de la parenthèse : 4×x et 4×3. Donc 4(x + 3) = 4x + 12.") +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
    tags: ["litteral_distributivite", "simple", "open"],
  },
  {
    kind: "template",
    id: "litteral_distributivite_simple_tpl_nature_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "Le nombre de rangées multiplie ce qu’il y a dans chaque rangée.",
    tags: ["litteral_distributivite", "nature", "template"],
    generate: () => {
      const rows = randomInt(2, 6);
      const extra = randomInt(1, 5);

      return {
        text: `Dans un jardin, on plante ${rows} rangées contenant chacune x + ${extra} fleurs. Exprimer le nombre total de fleurs sous forme développée.`,
        format: "short",
        expected: [`${rows}x+${rows * extra}`, `${rows}x + ${rows * extra}`],
        comparator: "contains_keyword",
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`${rows} rangées de x + ${extra} fleurs donnent ${rows}(x + ${extra}) = ${rows}x + ${rows * extra}.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
      };
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_simple_tpl_maison_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque pièce a la même longueur.",
    tags: ["litteral_distributivite", "maison", "template"],
    generate: () => {
      const pieces = randomInt(2, 5);
      const extra = randomInt(1, 4);

      return {
        text: `Dans un plan de maison, ${pieces} pièces ont chacune une longueur de x + ${extra} mètres. Exprimer la longueur totale sous forme développée.`,
        format: "short",
        expected: [`${pieces}x+${pieces * extra}`, `${pieces}x + ${pieces * extra}`],
        comparator: "contains_keyword",
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`${pieces}(x + ${extra}) = ${pieces}x + ${pieces * extra}.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
      };
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_simple_tpl_achat_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "Il y a plusieurs lots identiques.",
    tags: ["litteral_distributivite", "achat", "template"],
    generate: () => {
      const lots = randomInt(2, 6);
      const bonus = randomInt(1, 5);

      return {
        text: `Un magasin vend ${lots} lots contenant chacun x stylos et ${bonus} gommes. Exprimer le nombre total d’objets sous forme développée.`,
        format: "short",
        expected: [`${lots}x+${lots * bonus}`, `${lots}x + ${lots * bonus}`],
        comparator: "contains_keyword",
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`${lots}(x + ${bonus}) = ${lots}x + ${lots * bonus}.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
      };
    },
  },

  // =========================
  // DISTRIB_DOUBLE
  // =========================
    {
    kind: "fixed",
    id: "litteral_distributivite_double_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_double",
    difficulty: 3,
    theme: "neutral",
    text: "Dans (x + 2)(x + 5), combien de produits doit-on effectuer avant de réduire ?",
    format: "qcm",
    choices: ["2", "3", "4", "5"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Chaque terme de la première parenthèse multiplie chaque terme de la seconde.",
    explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          ("On effectue 4 produits : x×x, x×5, 2×x et 2×5.") +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
    tags: ["litteral_distributivite", "double", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_distributivite_double_tpl_formel_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_double",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque terme de la première parenthèse multiplie chaque terme de la seconde.",
    tags: ["litteral_distributivite", "double", "template"],
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
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`(x + ${b})(x + ${c}) = x² + ${c}x + ${b}x + ${prod} = x² + ${sum}x + ${prod}.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
      };
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_double_tpl_formel_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_double",
    difficulty: 3,
    theme: "neutral",
    hint: "Fais les quatre produits.",
    tags: ["litteral_distributivite", "double", "template"],
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
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`(x - ${b})(x + ${c}) = x² + ${c}x - ${b}x - ${b * c}.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
      };
    },
  },
    {
    kind: "fixed",
    id: "litteral_distributivite_double_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_double",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi (x + 2)(x + 3) donne x² + 5x + 6.",
    format: "open",
    expected: ["x²", "2x", "3x", "6"],
    comparator: "contains_keyword",
    hint: "Écris les quatre produits.",
    explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          ("(x + 2)(x + 3) = x×x + x×3 + 2×x + 2×3 = x² + 3x + 2x + 6 = x² + 5x + 6.") +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
    tags: ["litteral_distributivite", "double", "open"],
  },

  // =========================
  // DISTRIB_REDUIRE
  // =========================
    {
    kind: "fixed",
    id: "litteral_litteral_distributivite_reduire_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reduire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la forme réduite de 2x + 5 + 3x ?",
    format: "qcm",
    choices: ["5x + 5", "5x", "6x + 5", "2x + 8"],
    expected: ["5x + 5"],
    comparator: "mcq_exact",
    hint: "Regroupe les termes en x.",
    explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          ("2x + 3x = 5x, donc 2x + 5 + 3x = 5x + 5.") +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
    tags: ["litteral_distributivite", "reduire", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_litteral_distributivite_reduire_tpl_formel_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reduire",
    difficulty: 2,
    theme: "neutral",
    hint: "Développe d’abord puis regroupe les termes semblables.",
    tags: ["litteral_distributivite", "reduire", "template"],
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
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`${a}(x + ${b}) + ${c}x = ${a}x + ${constante} + ${c}x = ${coeff}x + ${constante}.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
      };
    },
  },
  {
    kind: "template",
    id: "litteral_litteral_distributivite_reduire_tpl_formel_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reduire",
    difficulty: 3,
    theme: "neutral",
    hint: "Développe puis réduis les termes en x et les constantes.",
    tags: ["litteral_distributivite", "reduire", "template"],
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
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`${a}(x + ${b}) + ${c}x + ${d} = ${a}x + ${a * b} + ${c}x + ${d} = ${coeff}x + ${constante}.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
      };
    },
  },
    {
    kind: "fixed",
    id: "litteral_litteral_distributivite_reduire_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reduire",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment réduire 2x + 7 + 3x.",
    format: "open",
    expected: ["2x", "3x", "5x", "7"],
    comparator: "contains_keyword",
    hint: "Regroupe seulement les termes semblables.",
    explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          ("On regroupe les termes en x : 2x + 3x = 5x. Le 7 reste une constante. Donc 2x + 7 + 3x = 5x + 7.") +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
    tags: ["litteral_distributivite", "reduire", "open"],
  },
  {
    kind: "template",
    id: "litteral_litteral_distributivite_reduire_tpl_batiment_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reduire",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule la longueur répétée puis ajoute le reste.",
    tags: ["litteral_distributivite", "batiment", "template"],
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
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`${sections}(x + ${extra}) + ${fixed} = ${coeff}x + ${sections * extra} + ${fixed} = ${coeff}x + ${constante}.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
      };
    },
  },

  // =========================
  // DISTRIB_REDUIRE (exercices supplémentaires progressifs)
  // =========================
  {
    kind: "template",
    id: "litteral_distributivite_reduire_tpl_deux_parentheses_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reduire",
    difficulty: 2,
    theme: "neutral",
    hint: "Développe chaque parenthèse, puis regroupe les termes en x et les constantes.",
    tags: ["litteral_distributivite", "reduire", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const b = randomInt(1, 5);
      const c = randomInt(2, 5);
      const d = randomInt(1, 5);
      const coeff = a + c;
      const constante = a * b + c * d;

      return {
        text: `Développer puis réduire : ${a}(x + ${b}) + ${c}(x + ${d})`,
        format: "short",
        expected: [`${coeff}x+${constante}`, `${coeff}x + ${constante}`],
        comparator: "contains_keyword",
        explanation: "Définition : la distributivité permet de transformer un produit en somme.\n\n" +
          "Méthode : développe chaque parenthèse puis regroupe les termes semblables.\n\nCalcul : " +
          `${a}(x + ${b}) + ${c}(x + ${d}) = ${a}x + ${a * b} + ${c}x + ${c * d} = ${coeff}x + ${constante}.` +
          "\n\nConclusion : l'expression réduite est obtenue en regroupant les termes de même nature.",
      };
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_reduire_tpl_soustraction_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reduire",
    difficulty: 3,
    theme: "neutral",
    hint: "Attention au signe négatif devant la deuxième parenthèse : il se distribue à chaque terme.",
    tags: ["litteral_distributivite", "reduire", "soustraction", "template"],
    generate: () => {
      const a = randomInt(3, 6);
      const b = randomInt(1, 5);
      const c = randomInt(2, 5);
      const d = randomInt(1, 5);
      const coeff = a - c;
      const constante = a * b - c * d;
      const reduced = formatLinearExpression(coeff, constante);
      const reducedSpaced = formatLinearExpression(coeff, constante, true);

      return {
        text: `Développer puis réduire : ${a}(x + ${b}) - ${c}(x + ${d})`,
        format: "short",
        expected: [reduced, reducedSpaced],
        comparator: "contains_keyword",
        explanation: "Définition : la distributivité permet de transformer un produit en somme.\n\n" +
          "Méthode : distribue le signe négatif aussi.\n\nCalcul : " +
          `${a}(x + ${b}) - ${c}(x + ${d}) = ${a}x + ${a * b} - ${c}x - ${c * d} = ${reducedSpaced}.` +
          "\n\nConclusion : attention, le signe moins se distribue à tous les termes de la parenthèse.",
      };
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_reduire_tpl_negatif_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reduire",
    difficulty: 3,
    theme: "neutral",
    hint: "Le coefficient négatif multiplie chaque terme de la parenthèse.",
    tags: ["litteral_distributivite", "reduire", "negatif", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const b = randomInt(1, 5);
      const c = randomInt(1, 6);
      const coeff = -a + c;
      const constante = -(a * b);
      const reduced = formatLinearExpression(coeff, constante);
      const reducedSpaced = formatLinearExpression(coeff, constante, true);

      return {
        text: `Développer puis réduire : -${a}(x + ${b}) + ${c}x`,
        format: "short",
        expected: [reduced, reducedSpaced],
        comparator: "contains_keyword",
        explanation: "Définition : la distributivité permet de transformer un produit en somme.\n\n" +
          `Méthode : -${a} multiplie x et ${b}.\n\nCalcul : ` +
          `-${a}(x + ${b}) + ${c}x = -${a}x - ${a * b} + ${c}x = ${reducedSpaced}.` +
          "\n\nConclusion : regrouper les termes en x puis les constantes.",
      };
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_reduire_tpl_trois_termes_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reduire",
    difficulty: 4,
    theme: "neutral",
    hint: "Développe les deux parenthèses séparément, puis regroupe tout.",
    tags: ["litteral_distributivite", "reduire", "complexe", "template"],
    generate: () => {
      const a = randomInt(2, 4);
      const b = randomInt(1, 4);
      const c = randomInt(2, 4);
      const d = randomInt(1, 4);
      const e = randomInt(1, 6);
      const coeff = a + c;
      const constante = a * b + c * d + e;

      return {
        text: `Développer puis réduire : ${a}(x + ${b}) + ${c}(x + ${d}) + ${e}`,
        format: "short",
        expected: [`${coeff}x+${constante}`, `${coeff}x + ${constante}`],
        comparator: "contains_keyword",
        explanation: "Méthode : développe chaque parenthèse, puis regroupe les x et les constantes.\n\nCalcul : " +
          `${a}(x + ${b}) + ${c}(x + ${d}) + ${e} = ${a}x + ${a * b} + ${c}x + ${c * d} + ${e} = ${coeff}x + ${constante}.`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_reduire_tpl_mixte_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reduire",
    difficulty: 4,
    theme: "neutral",
    hint: "Développe, puis regroupe les x d'un côté et les nombres de l'autre.",
    tags: ["litteral_distributivite", "reduire", "mixte", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const b = randomInt(1, 5);
      const c = randomInt(2, 5);
      const d = randomInt(1, 5);
      const coeff = a - c;
      const constante = a * b - c * d;
      const reduced = formatLinearExpression(coeff, constante);
      const reducedSpaced = formatLinearExpression(coeff, constante, true);

      return {
        text: `Développer puis réduire : ${a}(x + ${b}) - ${c}(x + ${d})`,
        format: "short",
        expected: [reduced, reducedSpaced],
        comparator: "contains_keyword",
        explanation: "Méthode : distribue le signe moins à tous les termes de la deuxième parenthèse.\n\nCalcul : " +
          `${a}(x + ${b}) - ${c}(x + ${d}) = ${a}x + ${a * b} - ${c}x - ${c * d} = ${reducedSpaced}.`,
      };
    },
  },

  // =========================
  // DISTRIB_FACTORISATION (via distributivité inverse)
  // =========================
  {
    kind: "fixed",
    id: "litteral_distributivite_facto_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la forme factorisée de 4x + 12 ?",
    format: "qcm",
    choices: ["4(x + 3)", "4(x + 12)", "2(2x + 6)", "4x(1 + 3)"],
    expected: ["4(x + 3)"],
    comparator: "mcq_exact",
    hint: "Cherche le plus grand facteur commun à 4x et 12.",
    explanation: "Définition : factoriser, c'est écrire une somme sous la forme d'un produit.\n\n" +
      "Méthode : on repère le facteur commun (ici 4), puis on le met en facteur.\n\nCalcul : " +
      "4x + 12 = 4 × x + 4 × 3 = 4(x + 3)." +
      "\n\nConclusion : vérifier en développant 4(x + 3) = 4x + 12.",
    tags: ["litteral_distributivite", "factorisation", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_distributivite_facto_tpl_simple_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le facteur commun aux deux termes.",
    tags: ["litteral_distributivite", "factorisation", "template"],
    generate: () => {
      const a = randomInt(2, 7);
      const b = randomInt(2, 8);
      const ax = a;
      const ab = a * b;

      return {
        text: `Factoriser : ${ax}x + ${ab}`,
        format: "short",
        expected: [`${a}(x+${b})`, `${a}(x + ${b})`],
        comparator: "contains_keyword",
        explanation: `Méthode : le facteur commun à ${ax}x et ${ab} est ${a}.\n\nCalcul : ` +
          `${ax}x + ${ab} = ${a} × x + ${a} × ${b} = ${a}(x + ${b}).`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_facto_tpl_simple_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "Identifie le facteur commun, puis divise chaque terme par lui.",
    tags: ["litteral_distributivite", "factorisation", "soustraction", "template"],
    generate: () => {
      const a = randomInt(2, 7);
      const b = randomInt(2, 8);

      return {
        text: `Factoriser : ${a}x - ${a * b}`,
        format: "short",
        expected: [`${a}(x-${b})`, `${a}(x - ${b})`],
        comparator: "contains_keyword",
        explanation: `Méthode : le facteur commun à ${a}x et ${a * b} est ${a}.\n\nCalcul : ` +
          `${a}x - ${a * b} = ${a}(x - ${b}).`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_facto_tpl_coeff_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_facteur_commun",
    difficulty: 3,
    theme: "neutral",
    hint: "Le facteur commun peut être une lettre ou un nombre selon l'expression.",
    tags: ["litteral_distributivite", "factorisation", "coeff", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(2, 6);
      const c = randomInt(2, 5);

      return {
        text: `Factoriser : ${a * b}x + ${a * c}`,
        format: "short",
        expected: [`${a}(${b}x+${c})`, `${a}(${b}x + ${c})`],
        comparator: "contains_keyword",
        explanation: `Méthode : repère le facteur commun entre ${a * b}x et ${a * c}.\n\nCalcul : ` +
          `${a * b}x + ${a * c} = ${a}(${b}x + ${c}).`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_facto_tpl_verif_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Factorise puis vérifie en développant.",
    tags: ["litteral_distributivite", "factorisation", "verification", "template"],
    generate: () => {
      const a = randomInt(3, 7);
      const b = randomInt(1, 6);

      return {
        text: `Factoriser ${a}x + ${a * b}, puis vérifier en développant.`,
        format: "short",
        expected: [`${a}(x+${b})`, `${a}(x + ${b})`],
        comparator: "contains_keyword",
        explanation: "Calcul : " +
          `${a}x + ${a * b} = ${a}(x + ${b}). Vérification : ${a}(x + ${b}) = ${a}x + ${a * b}. ✓`,
      };
    },
  },

  // =========================
  // DISTRIB_DOUBLE (exercices supplémentaires progressifs)
  // =========================
  {
    kind: "template",
    id: "litteral_distributivite_double_tpl_formel_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_double",
    difficulty: 3,
    theme: "neutral",
    hint: "Fais les quatre produits, attention aux signes.",
    tags: ["litteral_distributivite", "double", "template"],
    generate: () => {
      const b = randomInt(1, 5);
      const c = randomInt(1, 5);
      const prod = b * c;

      return {
        text: `Développer : (x - ${b})(x - ${c})`,
        format: "short",
        expected: [
          `x²-${b + c}x+${prod}`,
          `x^2-${b + c}x+${prod}`,
          `x² - ${b + c}x + ${prod}`,
          `x^2 - ${b + c}x + ${prod}`,
        ],
        comparator: "contains_keyword",
        explanation: "Méthode : on distribue chaque terme de la première parenthèse à chaque terme de la seconde.\n\nCalcul : " +
          `(x - ${b})(x - ${c}) = x² - ${c}x - ${b}x + ${prod} = x² - ${b + c}x + ${prod}.`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_double_tpl_formel_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_double",
    difficulty: 3,
    theme: "neutral",
    hint: "Développe puis regroupe les termes semblables.",
    tags: ["litteral_distributivite", "double", "template"],
    generate: () => {
      const b = randomInt(2, 6);
      const c = randomInt(2, 6);
      const sum = b - c;
      const constant = -b * c;

      return {
        text: `Développer et réduire : (x + ${b})(x - ${c})`,
        format: "short",
        expected: [
          formatQuadraticExpression(sum, constant, "²"),
          formatQuadraticExpression(sum, constant, "^2"),
          formatQuadraticExpression(sum, constant, "²", true),
          formatQuadraticExpression(sum, constant, "^2", true),
        ],
        comparator: "contains_keyword",
        explanation: "Méthode : 4 produits.\n\nCalcul : " +
          `(x + ${b})(x - ${c}) = x² - ${c}x + ${b}x - ${b * c} = ${formatQuadraticExpression(sum, constant, "²", true)}.`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_double_tpl_coeff_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_double",
    difficulty: 4,
    theme: "neutral",
    hint: "Le premier terme n'est pas x mais un multiple de x.",
    tags: ["litteral_distributivite", "double", "coeff", "template"],
    generate: () => {
      const a = randomInt(2, 3);
      const b = randomInt(1, 4);
      const c = randomInt(1, 4);

      return {
        text: `Développer et réduire : (${a}x + ${b})(x + ${c})`,
        format: "short",
        expected: [
          `${a}x²+${a * c + b}x+${b * c}`,
          `${a}x^2+${a * c + b}x+${b * c}`,
          `${a}x² + ${a * c + b}x + ${b * c}`,
        ],
        comparator: "contains_keyword",
        explanation: "Méthode : développe les 4 produits.\n\nCalcul : " +
          `(${a}x + ${b})(x + ${c}) = ${a}x² + ${a * c}x + ${b}x + ${b * c} = ${a}x² + ${a * c + b}x + ${b * c}.`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_double_tpl_purecoeff_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_double",
    difficulty: 4,
    theme: "neutral",
    hint: "Développe puis regroupe le terme en x² et les termes en x.",
    tags: ["litteral_distributivite", "double", "template"],
    generate: () => {
      const a = randomInt(1, 3);
      const b = randomInt(1, 4);
      const c = randomInt(1, 3);
      const d = randomInt(1, 4);

      return {
        text: `Développer et réduire : (${a}x + ${b})(${c}x + ${d})`,
        format: "short",
        expected: [
          `${a * c}x²+${a * d + b * c}x+${b * d}`,
          `${a * c}x^2+${a * d + b * c}x+${b * d}`,
          `${a * c}x² + ${a * d + b * c}x + ${b * d}`,
        ],
        comparator: "contains_keyword",
        explanation: "Méthode : 4 produits.\n\nCalcul : " +
          `(${a}x + ${b})(${c}x + ${d}) = ${a * c}x² + ${a * d}x + ${b * c}x + ${b * d} = ${a * c}x² + ${a * d + b * c}x + ${b * d}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "litteral_distributivite_double_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_double",
    difficulty: 5,
    theme: "neutral",
    text: "Développer et réduire : (x + 3)² (Rappel : (x + 3)² = (x + 3)(x + 3))",
    format: "short",
    expected: ["x²+6x+9", "x^2+6x+9", "x² + 6x + 9"],
    comparator: "contains_keyword",
    hint: "Écris (x + 3)(x + 3) et applique la double distributivité.",
    explanation: "Méthode : (x + 3)(x + 3) = x² + 3x + 3x + 9 = x² + 6x + 9." +
      "\n\nConclusion : c'est une identité remarquable (a + b)² = a² + 2ab + b².",
    tags: ["litteral_distributivite", "double", "carre", "identite"],
  },

  // =========================
  // DISTRIB_RECONNAITRE
  // =========================
    {
    kind: "fixed",
    id: "litteral_litteral_distributivite_reconnaitre_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle expression contient une distributivité à effectuer ?",
    format: "qcm",
    choices: ["5x + 3", "2(x + 7)", "x + 4", "3x - 1"],
    expected: ["2(x + 7)"],
    comparator: "mcq_exact",
    hint: "Cherche un produit avec une parenthèse.",
    explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          ("2(x + 7) contient un nombre qui multiplie une parenthèse : il faut distribuer.") +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
    tags: ["litteral_distributivite", "reconnaitre", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_litteral_distributivite_reconnaitre_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Cherche l’écriture avec une parenthèse précédée d’un coefficient.",
    tags: ["litteral_distributivite", "reconnaitre", "template"],
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
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`${correct} doit être développée car il y a un produit devant une parenthèse.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
      };
    },
  },
  {
    kind: "template",
    id: "litteral_litteral_distributivite_reconnaitre_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Une expression développée ne contient plus de parenthèses à distribuer.",
    tags: ["litteral_distributivite", "reconnaitre", "template"],
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
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`${correct} est déjà développée car il n’y a plus de parenthèses.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
      };
    },
  },
    {
    kind: "fixed",
    id: "litteral_litteral_distributivite_reconnaitre_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi 3(x + 2) n’est pas encore une expression développée.",
    format: "open",
    expected: ["parenthèse", "développer", "3"],
    comparator: "contains_keyword",
    hint: "Regarde s’il reste une parenthèse avec un coefficient devant.",
    explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          ("3(x + 2) contient encore une parenthèse précédée d’un coefficient. Il faut développer : 3(x + 2) = 3x + 6.") +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
    tags: ["litteral_distributivite", "reconnaitre", "open"],
  },

  // =========================
  // DISTRIB_DEFIS
  // =========================
  {
    kind: "template",
    id: "litteral_distributivite_defi_tpl_justification_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique que le coefficient multiplie tous les termes de la parenthèse.",
    tags: ["litteral_distributivite", "defi", "justification", "template"],
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
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`Le coefficient ${a} multiplie les deux termes de la parenthèse : ${a}×x et ${a}×${b}.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
      };
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_defi_tpl_erreur_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Le coefficient devant la parenthèse ne multiplie pas seulement la lettre.",
    tags: ["litteral_distributivite", "defi", "erreur", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(1, 6);

      return {
        text: `Un élève affirme que ${a}(x + ${b}) = ${a}x + ${b}. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`Non. ${a} doit multiplier x et aussi ${b}. On obtient ${a}x + ${a * b}.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
      };
    },
  },
    {
    kind: "template",
    id: "litteral_distributivite_defi_open_erreur_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Cherche quel terme n’a pas été multiplié.",
    tags: ["litteral_distributivite", "defi", "erreur", "open", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(1, 6);

      return {
        text: `Explique l’erreur dans l’égalité : ${a}(x + ${b}) = ${a}x + ${b}.`,
        format: "open",
        expected: ["erreur", "multiplier", String(b)],
        comparator: "contains_keyword",
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`L’erreur est que ${b} n’a pas été multiplié par ${a}. La bonne égalité est ${a}(x + ${b}) = ${a}x + ${a * b}.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
      };
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_defi_tpl_maison_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Développe chaque partie du plan puis additionne.",
    tags: ["litteral_distributivite", "defi", "maison", "template"],
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
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`${a}(x + ${b}) + ${c}(x + ${d}) = ${a}x + ${a * b} + ${c}x + ${c * d} = ${coeff}x + ${constante}.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
      };
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_defi_tpl_nature_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Chaque groupe contient une même expression.",
    tags: ["litteral_distributivite", "defi", "nature", "template"],
    generate: () => {
      const groupes = randomInt(2, 5);
      const arbres = randomInt(1, 5);

      return {
        text: `Dans un parc, on a ${groupes} zones contenant chacune x arbustes et ${arbres} arbres. Exprimer le nombre total de végétaux sous forme développée.`,
        format: "short",
        expected: [`${groupes}x+${groupes * arbres}`, `${groupes}x + ${groupes * arbres}`],
        comparator: "contains_keyword",
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`${groupes}(x + ${arbres}) = ${groupes}x + ${groupes * arbres}.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
      };
    },
  },

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  // ---------- DISTRIB_SIMPLE ----------
  {
    kind: "fixed",
    id: "litteral_distributivite_simple_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le développement de $5(x + 2)$ ?",
    format: "qcm",
    choices: ["$5x + 10$", "$5x + 2$", "$x + 10$", "$7x$"],
    expected: ["$5x + 10$"],
    comparator: "mcq_exact",
    hint: "Le 5 multiplie x et 2.",
    explanation:
      "Définition : la distributivité transforme un produit en somme : $a(b + c) = ab + ac$.\n\n" +
      "Méthode : on multiplie 5 par chaque terme de la parenthèse.\n\n" +
      "Calcul : $5(x + 2) = 5x + 10$.\n\n" +
      "Conclusion : le développement est $5x + 10$.",
    tags: ["litteral_distributivite", "simple", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_distributivite_simple_tpl_qcm_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_simple",
    difficulty: 1,
    theme: "neutral",
    hint: "Le coefficient multiplie chaque terme.",
    tags: ["litteral_distributivite", "simple", "qcm", "template"],
    generate: () => {
      const a = randomInt(2, 8);
      const b = randomInt(1, 9);
      const correct = `$${a}x + ${a * b}$`;
      return {
        text: `Quel est le développement de $${a}(x + ${b})$ ?`,
        format: "qcm",
        choices: [
          correct,
          `$${a}x + ${b}$`,
          `$x + ${a * b}$`,
          `$${a + 1}x + ${a * b}$`,
        ],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : $a(b + c) = ab + ac$.\n\n" +
          `Méthode : on multiplie ${a} par x et par ${b}.\n\n` +
          `Calcul : $${a}(x + ${b}) = ${a}x + ${a * b}$.\n\n` +
          `Conclusion : le développement est ${correct}.`,
      };
    },
  },

  // ---------- DISTRIB_DOUBLE ----------
  {
    kind: "fixed",
    id: "litteral_distributivite_double_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_double",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le développement réduit de $(x + 1)(x + 4)$ ?",
    format: "qcm",
    choices: ["$x^2 + 5x + 4$", "$x^2 + 4x + 4$", "$x^2 + 5x + 5$", "$2x + 5$"],
    expected: ["$x^2 + 5x + 4$"],
    comparator: "mcq_exact",
    hint: "Fais les quatre produits puis regroupe.",
    explanation:
      "Définition : la double distributivité fait quatre produits.\n\n" +
      "Méthode : $(x+1)(x+4) = x \\times x + x \\times 4 + 1 \\times x + 1 \\times 4$.\n\n" +
      "Calcul : $= x^2 + 4x + x + 4 = x^2 + 5x + 4$.\n\n" +
      "Conclusion : le résultat est $x^2 + 5x + 4$.",
    tags: ["litteral_distributivite", "double", "qcm"],
  },

  // ---------- DISTRIB_RECONNAITRE ----------
  {
    kind: "fixed",
    id: "litteral_distributivite_reconnaitre_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle expression contient une double distributivité à effectuer ?",
    format: "qcm",
    choices: ["$(x + 2)(x + 5)$", "$3(x + 1)$", "$4x + 7$", "$x - 9$"],
    expected: ["$(x + 2)(x + 5)$"],
    comparator: "mcq_exact",
    hint: "Cherche un produit de deux parenthèses.",
    explanation:
      "Définition : une double distributivité est un produit de deux parenthèses.\n\n" +
      "Méthode : on cherche deux parenthèses multipliées.\n\n" +
      "Calcul : $(x + 2)(x + 5)$ est un produit de deux parenthèses.\n\n" +
      "Conclusion : c’est $(x + 2)(x + 5)$.",
    tags: ["litteral_distributivite", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_distributivite_reconnaitre_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "L’expression $2(x + 3)$ est sous quelle forme ?",
    format: "qcm",
    choices: ["forme factorisée (à développer)", "forme développée", "forme réduite", "forme numérique"],
    expected: ["forme factorisée (à développer)"],
    comparator: "mcq_exact",
    hint: "Il y a encore une parenthèse précédée d’un coefficient.",
    explanation:
      "Définition : une forme factorisée se présente comme un produit ; une forme développée est une somme.\n\n" +
      "Méthode : on regarde s’il reste une parenthèse à distribuer.\n\n" +
      "Calcul : $2(x + 3)$ est un produit, donc une forme factorisée à développer.\n\n" +
      "Conclusion : c’est une forme factorisée.",
    tags: ["litteral_distributivite", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_distributivite_reconnaitre_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle expression est déjà entièrement développée et réduite ?",
    format: "qcm",
    choices: ["$3x + 8$", "$3(x + 8)$", "$(x + 1)(x + 2)$", "$2(x + 4) + x$"],
    expected: ["$3x + 8$"],
    comparator: "mcq_exact",
    hint: "Une forme développée n’a plus de parenthèse à distribuer.",
    explanation:
      "Définition : une expression développée et réduite n’a plus de parenthèse et regroupe les termes semblables.\n\n" +
      "Méthode : on élimine celles qui contiennent encore une parenthèse.\n\n" +
      "Calcul : $3x + 8$ n’a plus rien à développer.\n\n" +
      "Conclusion : c’est $3x + 8$.",
    tags: ["litteral_distributivite", "reconnaitre", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_distributivite_reconnaitre_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Une forme développée ne contient plus de parenthèse à distribuer.",
    tags: ["litteral_distributivite", "reconnaitre", "template"],
    generate: () => {
      const a = randomInt(2, 7);
      const b = randomInt(1, 8);
      const developpee = randomChoice([true, false]);
      const expr = developpee ? `${a}x + ${a * b}` : `${a}(x + ${b})`;
      return {
        text: `L’expression $${expr}$ est-elle déjà développée ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [developpee ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : une forme développée n’a plus de parenthèse à distribuer.\n\n" +
          "Méthode : on regarde la présence d’une parenthèse précédée d’un coefficient.\n\n" +
          `Calcul : $${expr}$ ${developpee ? "n’a plus de parenthèse" : "contient encore une parenthèse à développer"}.\n\n` +
          `Conclusion : ${developpee ? "oui, elle est développée" : "non, il faut la développer"}.`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_reconnaitre_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le produit de deux parenthèses.",
    tags: ["litteral_distributivite", "reconnaitre", "double", "template"],
    generate: () => {
      const b = randomInt(1, 6);
      const c = randomInt(1, 6);
      const a = randomInt(2, 6);
      const correct = `$(x + ${b})(x + ${c})$`;
      return {
        text: "Quelle expression demande une double distributivité ?",
        format: "qcm",
        choices: [correct, `$${a}(x + ${b})$`, `$${a}x + ${c}$`, `$x + ${b}$`],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : la double distributivité concerne un produit de deux parenthèses.\n\n" +
          "Méthode : on cherche deux parenthèses multipliées.\n\n" +
          `Calcul : ${correct} est un produit de deux parenthèses.\n\n` +
          `Conclusion : c’est ${correct}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "litteral_distributivite_reconnaitre_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Explique la différence entre une forme factorisée et une forme développée.",
    format: "open",
    expected: ["produit", "somme", "parenthèse"],
    comparator: "contains_keyword",
    hint: "L’une est un produit, l’autre une somme.",
    explanation:
      "Définition : une forme factorisée est écrite comme un produit (avec parenthèses) ; une forme développée est écrite comme une somme.\n\n" +
      "Méthode : on regarde si l’expression est un produit ou une somme.\n\n" +
      "Calcul : par exemple $3(x + 2)$ est factorisée, $3x + 6$ est développée.\n\n" +
      "Conclusion : factorisée = produit, développée = somme.",
    tags: ["litteral_distributivite", "reconnaitre", "open"],
  },

  // ---------- DISTRIB_DEFIS ----------
  {
    kind: "template",
    id: "litteral_distributivite_defi_tpl_signe_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Le signe « − » devant la parenthèse change le signe de chaque terme.",
    tags: ["litteral_distributivite", "defi", "signe", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(1, 6);
      return {
        text: `Un élève écrit $-${a}(x + ${b}) = -${a}x + ${a * b}$. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : le signe « − » se distribue à tous les termes de la parenthèse.\n\n" +
          `Méthode : $-${a}$ multiplie x et ${b}.\n\n` +
          `Calcul : $-${a}(x + ${b}) = -${a}x - ${a * b}$.\n\n` +
          "Conclusion : non, le second terme doit être négatif.",
      };
    },
  },
  {
    kind: "fixed",
    id: "litteral_distributivite_defi_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quel est le développement de $5(2x + 3)$ ?",
    format: "qcm",
    choices: ["$10x + 15$", "$10x + 3$", "$7x + 8$", "$2x + 15$"],
    expected: ["$10x + 15$"],
    comparator: "mcq_exact",
    hint: "Le 5 multiplie 2x et 3.",
    explanation:
      "Définition : $a(b + c) = ab + ac$, même si b contient un coefficient.\n\n" +
      "Méthode : on multiplie 5 par 2x et par 3.\n\n" +
      "Calcul : $5(2x + 3) = 10x + 15$.\n\n" +
      "Conclusion : le développement est $10x + 15$.",
    tags: ["litteral_distributivite", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_distributivite_defi_tpl_aire_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "L’aire d’un rectangle est longueur × largeur ; développe le produit.",
    tags: ["litteral_distributivite", "defi", "aire", "double", "template"],
    generate: () => {
      const b = randomInt(1, 5);
      const c = randomInt(1, 5);
      const sum = b + c;
      const prod = b * c;
      return {
        text: `Un rectangle a pour longueur $x + ${b}$ et pour largeur $x + ${c}$. Donner son aire sous forme développée et réduite.`,
        format: "short",
        expected: [
          `x²+${sum}x+${prod}`,
          `x^2+${sum}x+${prod}`,
          `x² + ${sum}x + ${prod}`,
          `x^2 + ${sum}x + ${prod}`,
        ],
        comparator: "contains_keyword",
        explanation:
          "Définition : l’aire est longueur × largeur, ici un produit de deux parenthèses.\n\n" +
          "Méthode : on développe par double distributivité.\n\n" +
          `Calcul : $(x + ${b})(x + ${c}) = x² + ${sum}x + ${prod}$.\n\n` +
          `Conclusion : l’aire développée est $x² + ${sum}x + ${prod}$.`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_defi_tpl_perimetre_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Le périmètre est 2 × (longueur + largeur) ; développe.",
    tags: ["litteral_distributivite", "defi", "perimetre", "template"],
    generate: () => {
      const b = randomInt(1, 6);
      const c = randomInt(1, 6);
      const coeff = 2 * 2;
      const cst = 2 * (b + c);
      return {
        text: `Un rectangle a pour longueur $2x + ${b}$ et pour largeur ${c}. Donner son périmètre sous forme développée et réduite.`,
        format: "short",
        expected: [`${coeff}x+${cst}`, `${coeff}x + ${cst}`],
        comparator: "contains_keyword",
        explanation:
          "Définition : le périmètre est $2 \\times (\\text{longueur} + \\text{largeur})$.\n\n" +
          `Méthode : on calcule la somme puis on distribue le 2.\n\n` +
          `Calcul : $2(2x + ${b} + ${c}) = 2(2x + ${b + c}) = ${coeff}x + ${cst}$.\n\n` +
          `Conclusion : le périmètre est $${coeff}x + ${cst}$.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "litteral_distributivite_defi_open_double_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi la double distributivité demande quatre produits.",
    format: "open",
    expected: ["chaque terme", "quatre", "produits"],
    comparator: "contains_keyword",
    hint: "Chaque terme de la première parenthèse rencontre chaque terme de la seconde.",
    explanation:
      "Définition : dans un produit de deux parenthèses à deux termes, chaque terme de l’une multiplie chaque terme de l’autre.\n\n" +
      "Méthode : on associe chaque terme de la première parenthèse aux deux de la seconde.\n\n" +
      "Calcul : $2 \\times 2 = 4$ produits à effectuer.\n\n" +
      "Conclusion : la double distributivité demande quatre produits.",
    tags: ["litteral_distributivite", "defi", "open"],
  },
];
