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

export const distributiviteBank: TutorBankItemV4[] = [
  // =========================
  // DISTRIB_SIMPLE
  // =========================
    {
    kind: "fixed",
    id: "distrib_simple_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "distributivite",
    microId: "distrib_simple",
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
    tags: ["distributivite", "simple", "qcm"],
  },
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
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`${a}(${letter} + ${b}) = ${a}×${letter} + ${a}×${b} = ${a}${letter} + ${a * b}.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
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
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`${a}(${letter} - ${b}) = ${a}×${letter} - ${a}×${b} = ${a}${letter} - ${a * b}.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
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
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`-${a}(x + ${b}) = -${a}x - ${a * b}.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
      };
    },
  },
    {
    kind: "fixed",
    id: "distrib_simple_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "distributivite",
    microId: "distrib_simple",
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
    tags: ["distributivite", "simple", "open"],
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
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`${rows} rangées de x + ${extra} fleurs donnent ${rows}(x + ${extra}) = ${rows}x + ${rows * extra}.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
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
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`${pieces}(x + ${extra}) = ${pieces}x + ${pieces * extra}.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
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
    id: "distrib_double_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "distributivite",
    microId: "distrib_double",
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
    tags: ["distributivite", "double", "qcm"],
  },
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
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`(x + ${b})(x + ${c}) = x² + ${c}x + ${b}x + ${prod} = x² + ${sum}x + ${prod}.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
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
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`(x - ${b})(x + ${c}) = x² + ${c}x - ${b}x - ${b * c}.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
      };
    },
  },
    {
    kind: "fixed",
    id: "distrib_double_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "distributivite",
    microId: "distrib_double",
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
    tags: ["distributivite", "double", "open"],
  },

  // =========================
  // DISTRIB_REDUIRE
  // =========================
    {
    kind: "fixed",
    id: "distrib_reduire_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "distributivite",
    microId: "distrib_reduire",
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
    tags: ["distributivite", "reduire", "qcm"],
  },
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
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`${a}(x + ${b}) + ${c}x = ${a}x + ${constante} + ${c}x = ${coeff}x + ${constante}.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
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
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`${a}(x + ${b}) + ${c}x + ${d} = ${a}x + ${a * b} + ${c}x + ${d} = ${coeff}x + ${constante}.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
      };
    },
  },
    {
    kind: "fixed",
    id: "distrib_reduire_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "distributivite",
    microId: "distrib_reduire",
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
    tags: ["distributivite", "reduire", "open"],
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
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`${sections}(x + ${extra}) + ${fixed} = ${coeff}x + ${sections * extra} + ${fixed} = ${coeff}x + ${constante}.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
      };
    },
  },

  // =========================
  // DISTRIB_RECONNAITRE
  // =========================
    {
    kind: "fixed",
    id: "distrib_reconnaitre_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "distributivite",
    microId: "distrib_reconnaitre",
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
    tags: ["distributivite", "reconnaitre", "qcm"],
  },
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
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`${correct} doit être développée car il y a un produit devant une parenthèse.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
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
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`${correct} est déjà développée car il n’y a plus de parenthèses.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
      };
    },
  },
    {
    kind: "fixed",
    id: "distrib_reconnaitre_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "distributivite",
    microId: "distrib_reconnaitre",
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
    tags: ["distributivite", "reconnaitre", "open"],
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
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`Le coefficient ${a} multiplie les deux termes de la parenthèse : ${a}×x et ${a}×${b}.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
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
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`Non. ${a} doit multiplier x et aussi ${b}. On obtient ${a}x + ${a * b}.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
      };
    },
  },
    {
    kind: "template",
    id: "distrib_defis_open_erreur_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "distributivite",
    microId: "distrib_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Cherche quel terme n’a pas été multiplié.",
    tags: ["distributivite", "defi", "erreur", "open", "template"],
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
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`${a}(x + ${b}) + ${c}(x + ${d}) = ${a}x + ${a * b} + ${c}x + ${c * d} = ${coeff}x + ${constante}.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
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
        explanation: "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
          "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
          (`${groupes}(x + ${arbres}) = ${groupes}x + ${groupes * arbres}.`) +
          "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
      };
    },
  },
];