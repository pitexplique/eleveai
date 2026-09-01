// lib/tutor-v4/question-banks/maths/3e/arithmetique.bank.ts

/**
 * Banque robuste 3e — Arithmétique
 * Progression : diviseurs/multiples → critères → nombres premiers → décomposition → problèmes.
 * Conforme EleveAI : templates majoritaires, progression par étoiles, défis courts. 
 */

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

const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];
const composites = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 27];

function isPrime(n: number) {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) {
    if (n % d === 0) return false;
  }
  return true;
}

export const arithmetiqueBank: TutorBankItemV4[] = [
  /* =========================
     ARITH_MULTIPLE_DIVISEUR
  ========================= */

  {
    kind: "fixed",
    id: "3e_entier_multiple_diviseur_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_multiple_diviseur",
    difficulty: 1,
    theme: "neutral",
    text: "12 est-il un multiple de 3 ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Cherche si 12 est dans la table de 3.",
    explanation: `Définition : l’arithmétique étudie les diviseurs, les multiples, les critères de divisibilité, les nombres premiers et les diviseurs communs.\n\n` +
      `Méthode : on repère la propriété utile, puis on vérifie avec une égalité, un critère ou une décomposition.\n\n` +
      `Calcul : on utilise les données de la question pour justifier la réponse. ` +
      ("Oui, car 12 = 3 × 4.") +
      `\n\nConclusion : la réponse est donc celle indiquée, avec une justification arithmétique.`,
    tags: ["entier_arithmetique", "multiple", "diviseur"],
  },

  {
    kind: "fixed",
    id: "3e_entier_multiple_diviseur_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_multiple_diviseur",
    difficulty: 1,
    theme: "neutral",
    text: "5 est-il un diviseur de 35 ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "On cherche si 35 se divise exactement par 5.",
    explanation: `Définition : l’arithmétique étudie les diviseurs, les multiples, les critères de divisibilité, les nombres premiers et les diviseurs communs.\n\n` +
      `Méthode : on repère la propriété utile, puis on vérifie avec une égalité, un critère ou une décomposition.\n\n` +
      `Calcul : on utilise les données de la question pour justifier la réponse. ` +
      ("Oui, car 35 = 5 × 7.") +
      `\n\nConclusion : la réponse est donc celle indiquée, avec une justification arithmétique.`,
    tags: ["entier_arithmetique", "diviseur", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_entier_multiple_diviseur_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_multiple_diviseur",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre est un diviseur de 42 ?",
    format: "qcm",
    choices: ["5", "6", "8", "10"],
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "42 doit être divisible sans reste.",
    explanation: `Définition : l’arithmétique étudie les diviseurs, les multiples, les critères de divisibilité, les nombres premiers et les diviseurs communs.\n\n` +
      `Méthode : on repère la propriété utile, puis on vérifie avec une égalité, un critère ou une décomposition.\n\n` +
      `Calcul : on utilise les données de la question pour justifier la réponse. ` +
      ("6 est un diviseur de 42 car 42 = 6 × 7.") +
      `\n\nConclusion : la réponse est donc celle indiquée, avec une justification arithmétique.`,
    tags: ["entier_arithmetique", "diviseur", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_entier_multiple_diviseur_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_multiple_diviseur",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 8 est un diviseur de 56.",
    format: "open",
    expected: ["56", "8", "7"],
    comparator: "contains_keyword",
    hint: "Écris 56 comme un produit contenant 8.",
    explanation: `Définition : l’arithmétique étudie les diviseurs, les multiples, les critères de divisibilité, les nombres premiers et les diviseurs communs.\n\n` +
      `Méthode : on repère la propriété utile, puis on vérifie avec une égalité, un critère ou une décomposition.\n\n` +
      `Calcul : on utilise les données de la question pour justifier la réponse. ` +
      ("8 est un diviseur de 56 car 56 = 8 × 7.") +
      `\n\nConclusion : la réponse est donc celle indiquée, avec une justification arithmétique.`,
    tags: ["entier_arithmetique", "diviseur", "open"],
  },

  {
    kind: "template",
    id: "3e_entier_multiple_diviseur_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_multiple_diviseur",
    difficulty: 2,
    theme: "neutral",
    hint: "Un multiple s’obtient en multipliant par un entier.",
    tags: ["entier_arithmetique", "multiple", "template"],
    generate: () => {
      const d = randomInt(2, 12);
      const k = randomInt(3, 12);
      const n = d * k;

      return {
        text: `${n} est-il un multiple de ${d} ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation: `Définition : l’arithmétique étudie les diviseurs, les multiples, les critères de divisibilité, les nombres premiers et les diviseurs communs.\n\n` +
          `Méthode : on repère la propriété utile, puis on vérifie avec une égalité, un critère ou une décomposition.\n\n` +
          `Calcul : on utilise les données de la question pour justifier la réponse. ` +
          (`Oui, car ${n} = ${d} × ${k}.`) +
          `\n\nConclusion : la réponse est donc celle indiquée, avec une justification arithmétique.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_entier_multiple_diviseur_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_multiple_diviseur",
    difficulty: 2,
    theme: "neutral",
    hint: "On vérifie si la division tombe juste.",
    tags: ["entier_arithmetique", "diviseur", "template"],
    generate: () => {
      const d = randomInt(2, 12);
      const k = randomInt(3, 10);
      const yes = randomChoice([true, false]);
      const n = yes ? d * k : d * k + randomChoice([1, 2, 3]);

      return {
        text: `${d} est-il un diviseur de ${n} ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [yes ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: `Définition : l’arithmétique étudie les diviseurs, les multiples, les critères de divisibilité, les nombres premiers et les diviseurs communs.\n\n` +
          `Méthode : on repère la propriété utile, puis on vérifie avec une égalité, un critère ou une décomposition.\n\n` +
          `Calcul : on utilise les données de la question pour justifier la réponse. ` +
          (yes
          ? `Oui, car ${n} = ${d} × ${k}.`
          : `Non, ${n} n’est pas divisible exactement par ${d}.`) +
          `\n\nConclusion : la réponse est donc celle indiquée, avec une justification arithmétique.`,
      };
    },
  },

  /* =========================
     ARITH_CRITERES
  ========================= */

  {
    kind: "fixed",
    id: "3e_entier_critere_divisibilite_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_critere_divisibilite",
    difficulty: 1,
    theme: "neutral",
    text: "Un nombre divisible par 2 est…",
    format: "qcm",
    choices: [
      "un nombre pair",
      "un nombre impair",
      "un nombre qui finit par 5",
      "un nombre premier",
    ],
    expected: ["un nombre pair"],
    comparator: "mcq_exact",
    hint: "Regarde le chiffre des unités.",
    explanation: `Définition : l’arithmétique étudie les diviseurs, les multiples, les critères de divisibilité, les nombres premiers et les diviseurs communs.\n\n` +
      `Méthode : on repère la propriété utile, puis on vérifie avec une égalité, un critère ou une décomposition.\n\n` +
      `Calcul : on utilise les données de la question pour justifier la réponse. ` +
      ("Un nombre divisible par 2 est un nombre pair.") +
      `\n\nConclusion : la réponse est donc celle indiquée, avec une justification arithmétique.`,
    tags: ["entier_arithmetique", "criteres", "divisibilite"],
  },

  {
    kind: "fixed",
    id: "3e_entier_critere_divisibilite_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_critere_divisibilite",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre 135 est divisible par…",
    format: "qcm",
    choices: ["2", "3", "4", "8"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Additionne les chiffres de 135.",
    explanation: `Définition : l’arithmétique étudie les diviseurs, les multiples, les critères de divisibilité, les nombres premiers et les diviseurs communs.\n\n` +
      `Méthode : on repère la propriété utile, puis on vérifie avec une égalité, un critère ou une décomposition.\n\n` +
      `Calcul : on utilise les données de la question pour justifier la réponse. ` +
      ("1 + 3 + 5 = 9, et 9 est divisible par 3. Donc 135 est divisible par 3.") +
      `\n\nConclusion : la réponse est donc celle indiquée, avec une justification arithmétique.`,
    tags: ["entier_arithmetique", "criteres", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_entier_critere_divisibilite_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_critere_divisibilite",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre 250 est divisible par…",
    format: "qcm",
    choices: ["3", "4", "5", "9"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Un nombre divisible par 5 finit par 0 ou 5.",
    explanation: `Définition : l’arithmétique étudie les diviseurs, les multiples, les critères de divisibilité, les nombres premiers et les diviseurs communs.\n\n` +
      `Méthode : on repère la propriété utile, puis on vérifie avec une égalité, un critère ou une décomposition.\n\n` +
      `Calcul : on utilise les données de la question pour justifier la réponse. ` +
      ("250 finit par 0, donc il est divisible par 5.") +
      `\n\nConclusion : la réponse est donc celle indiquée, avec une justification arithmétique.`,
    tags: ["entier_arithmetique", "criteres", "qcm"],
  },

  {
    kind: "template",
    id: "3e_entier_critere_divisibilite_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_critere_divisibilite",
    difficulty: 2,
    theme: "neutral",
    hint: "Un nombre divisible par 5 finit par 0 ou 5.",
    tags: ["entier_arithmetique", "criteres", "template"],
    generate: () => {
      const n = randomChoice([45, 60, 75, 100, 125, 230, 345, 500]);

      return {
        text: `${n} est-il divisible par 5 ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation: `Définition : l’arithmétique étudie les diviseurs, les multiples, les critères de divisibilité, les nombres premiers et les diviseurs communs.\n\n` +
          `Méthode : on repère la propriété utile, puis on vérifie avec une égalité, un critère ou une décomposition.\n\n` +
          `Calcul : on utilise les données de la question pour justifier la réponse. ` +
          (`${n} finit par 0 ou 5, donc il est divisible par 5.`) +
          `\n\nConclusion : la réponse est donc celle indiquée, avec une justification arithmétique.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_entier_critere_divisibilite_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_critere_divisibilite",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour 3 ou 9, additionne les chiffres.",
    tags: ["entier_arithmetique", "criteres", "template"],
    generate: () => {
      const n = randomChoice([123, 126, 135, 144, 207, 234, 315, 702]);
      const sum = String(n)
        .split("")
        .reduce((s, c) => s + Number(c), 0);
      const divisible = sum % 3 === 0;

      return {
        text: `${n} est-il divisible par 3 ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [divisible ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: `Définition : l’arithmétique étudie les diviseurs, les multiples, les critères de divisibilité, les nombres premiers et les diviseurs communs.\n\n` +
          `Méthode : on repère la propriété utile, puis on vérifie avec une égalité, un critère ou une décomposition.\n\n` +
          `Calcul : on utilise les données de la question pour justifier la réponse. ` +
          (`La somme des chiffres vaut ${sum}. ${
          divisible
            ? `${sum} est divisible par 3, donc ${n} est divisible par 3.`
            : `${sum} n’est pas divisible par 3, donc ${n} n’est pas divisible par 3.`
        }`) +
          `\n\nConclusion : la réponse est donc celle indiquée, avec une justification arithmétique.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_entier_critere_divisibilite_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_critere_divisibilite",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 738 est divisible par 3.",
    format: "open",
    expected: ["7", "3", "8", "18", "3"],
    comparator: "contains_keyword",
    hint: "Additionne les chiffres.",
    explanation: `Définition : l’arithmétique étudie les diviseurs, les multiples, les critères de divisibilité, les nombres premiers et les diviseurs communs.\n\n` +
      `Méthode : on repère la propriété utile, puis on vérifie avec une égalité, un critère ou une décomposition.\n\n` +
      `Calcul : on utilise les données de la question pour justifier la réponse. ` +
      ("7 + 3 + 8 = 18, et 18 est divisible par 3. Donc 738 est divisible par 3.") +
      `\n\nConclusion : la réponse est donc celle indiquée, avec une justification arithmétique.`,
    tags: ["entier_arithmetique", "criteres", "open"],
  },

  /* =========================
     ARITH_NOMBRE_PREMIER
  ========================= */

  {
    kind: "fixed",
    id: "3e_entier_nombre_premier_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_nombre_premier",
    difficulty: 1,
    theme: "neutral",
    text: "Un nombre premier possède exactement…",
    format: "qcm",
    choices: [
      "un seul diviseur",
      "deux diviseurs : 1 et lui-même",
      "trois diviseurs",
      "aucun diviseur",
    ],
    expected: ["deux diviseurs : 1 et lui-même"],
    comparator: "mcq_exact",
    hint: "Exemple : 7 a pour diviseurs 1 et 7.",
    explanation: `Définition : l’arithmétique étudie les diviseurs, les multiples, les critères de divisibilité, les nombres premiers et les diviseurs communs.\n\n` +
      `Méthode : on repère la propriété utile, puis on vérifie avec une égalité, un critère ou une décomposition.\n\n` +
      `Calcul : on utilise les données de la question pour justifier la réponse. ` +
      ("Un nombre premier possède exactement deux diviseurs : 1 et lui-même.") +
      `\n\nConclusion : la réponse est donc celle indiquée, avec une justification arithmétique.`,
    tags: ["entier_arithmetique", "nombre_premier", "definition"],
  },

  {
    kind: "fixed",
    id: "3e_entier_nombre_premier_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_nombre_premier",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre est premier ?",
    format: "qcm",
    choices: ["9", "15", "17", "21"],
    expected: ["17"],
    comparator: "mcq_exact",
    hint: "Un nombre premier n’a que deux diviseurs.",
    explanation: `Définition : l’arithmétique étudie les diviseurs, les multiples, les critères de divisibilité, les nombres premiers et les diviseurs communs.\n\n` +
      `Méthode : on repère la propriété utile, puis on vérifie avec une égalité, un critère ou une décomposition.\n\n` +
      `Calcul : on utilise les données de la question pour justifier la réponse. ` +
      ("17 est premier car ses seuls diviseurs sont 1 et 17.") +
      `\n\nConclusion : la réponse est donc celle indiquée, avec une justification arithmétique.`,
    tags: ["entier_arithmetique", "nombre_premier", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_entier_nombre_premier_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_nombre_premier",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : « 1 est un nombre premier. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Un nombre premier doit avoir exactement deux diviseurs.",
    explanation: `Définition : l’arithmétique étudie les diviseurs, les multiples, les critères de divisibilité, les nombres premiers et les diviseurs communs.\n\n` +
      `Méthode : on repère la propriété utile, puis on vérifie avec une égalité, un critère ou une décomposition.\n\n` +
      `Calcul : on utilise les données de la question pour justifier la réponse. ` +
      ("Non. 1 n’a qu’un seul diviseur : lui-même. Donc 1 n’est pas un nombre premier.") +
      `\n\nConclusion : la réponse est donc celle indiquée, avec une justification arithmétique.`,
    tags: ["entier_arithmetique", "nombre_premier", "erreur"],
  },

  {
    kind: "template",
    id: "3e_entier_nombre_premier_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_nombre_premier",
    difficulty: 2,
    theme: "neutral",
    hint: "Teste les petits diviseurs possibles.",
    tags: ["entier_arithmetique", "nombre_premier", "template"],
    generate: () => {
      const n = randomChoice([...primes, ...composites]);
      const prime = isPrime(n);

      return {
        text: `${n} est-il un nombre premier ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [prime ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: `Définition : l’arithmétique étudie les diviseurs, les multiples, les critères de divisibilité, les nombres premiers et les diviseurs communs.\n\n` +
          `Méthode : on repère la propriété utile, puis on vérifie avec une égalité, un critère ou une décomposition.\n\n` +
          `Calcul : on utilise les données de la question pour justifier la réponse. ` +
          (prime
          ? `${n} est premier : ses seuls diviseurs sont 1 et ${n}.`
          : `${n} n’est pas premier : il possède d’autres diviseurs que 1 et lui-même.`) +
          `\n\nConclusion : la réponse est donc celle indiquée, avec une justification arithmétique.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_entier_nombre_premier_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_nombre_premier",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche le seul nombre qui n’a que deux diviseurs.",
    tags: ["entier_arithmetique", "nombre_premier", "template", "qcm"],
    generate: () => {
      const good = randomChoice(primes.filter((n) => n >= 11));
      const wrongs = shuffle(composites).slice(0, 3).map(String);

      return {
        text: "Quel nombre est premier ?",
        format: "qcm",
        choices: shuffle([String(good), ...wrongs]),
        expected: [String(good)],
        comparator: "mcq_exact",
        explanation: `Définition : l’arithmétique étudie les diviseurs, les multiples, les critères de divisibilité, les nombres premiers et les diviseurs communs.\n\n` +
          `Méthode : on repère la propriété utile, puis on vérifie avec une égalité, un critère ou une décomposition.\n\n` +
          `Calcul : on utilise les données de la question pour justifier la réponse. ` +
          (`${good} est premier car il n’a que deux diviseurs : 1 et ${good}.`) +
          `\n\nConclusion : la réponse est donc celle indiquée, avec une justification arithmétique.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_entier_nombre_premier_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_nombre_premier",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi 21 n’est pas un nombre premier.",
    format: "open",
    expected: ["21", "3", "7"],
    comparator: "contains_keyword",
    hint: "Écris 21 comme un produit.",
    explanation: `Définition : l’arithmétique étudie les diviseurs, les multiples, les critères de divisibilité, les nombres premiers et les diviseurs communs.\n\n` +
      `Méthode : on repère la propriété utile, puis on vérifie avec une égalité, un critère ou une décomposition.\n\n` +
      `Calcul : on utilise les données de la question pour justifier la réponse. ` +
      ("21 n’est pas premier car 21 = 3 × 7. Il a donc d’autres diviseurs que 1 et 21.") +
      `\n\nConclusion : la réponse est donc celle indiquée, avec une justification arithmétique.`,
    tags: ["entier_arithmetique", "nombre_premier", "open"],
  },
    /* =========================
     ARITH_DECOMPOSER
  ========================= */

  {
    kind: "fixed",
    id: "3e_entier_decomposer_facteur_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_decomposer_facteur",
    difficulty: 2,
    theme: "neutral",
    text: "Décomposer 12 en produit de facteurs premiers.",
    format: "qcm",
    choices: ["2 × 6", "3 × 4", "2² × 3", "12 × 1"],
    expected: ["2² × 3"],
    comparator: "mcq_exact",
    hint: "Tous les facteurs doivent être premiers.",
    explanation: `Définition : l’arithmétique étudie les diviseurs, les multiples, les critères de divisibilité, les nombres premiers et les diviseurs communs.\n\n` +
      `Méthode : on repère la propriété utile, puis on vérifie avec une égalité, un critère ou une décomposition.\n\n` +
      `Calcul : on utilise les données de la question pour justifier la réponse. ` +
      ("12 = 2 × 2 × 3 = 2² × 3.") +
      `\n\nConclusion : la réponse est donc celle indiquée, avec une justification arithmétique.`,
    tags: ["entier_arithmetique", "decomposition", "facteurs_premiers"],
  },

  {
    kind: "fixed",
    id: "3e_entier_decomposer_facteur_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_decomposer_facteur",
    difficulty: 3,
    theme: "neutral",
    text: "Décomposer 45 en produit de facteurs premiers.",
    format: "short",
    expected: ["3^2×5", "3²×5", "3^2 × 5", "3² × 5"],
    comparator: "exact_text",
    hint: "45 = 9 × 5.",
    explanation: `Définition : l’arithmétique étudie les diviseurs, les multiples, les critères de divisibilité, les nombres premiers et les diviseurs communs.\n\n` +
      `Méthode : on repère la propriété utile, puis on vérifie avec une égalité, un critère ou une décomposition.\n\n` +
      `Calcul : on utilise les données de la question pour justifier la réponse. ` +
      ("45 = 9 × 5 = 3² × 5.") +
      `\n\nConclusion : la réponse est donc celle indiquée, avec une justification arithmétique.`,
    tags: ["entier_arithmetique", "decomposition"],
  },

  {
    kind: "template",
    id: "3e_entier_decomposer_facteur_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_decomposer_facteur",
    difficulty: 3,
    theme: "neutral",
    hint: "Décompose progressivement avec des facteurs premiers.",
    tags: ["entier_arithmetique", "decomposition", "template"],
    generate: () => {
      // ⛔ RÉPARÉ LE 01/09/2026, ET LE CORRIGÉ ÉTAIT PIRE QUE LA TABLE. Cinq cas
      // seulement — mais surtout un corrigé passe-partout : « on repère la
      // propriété utile, puis on vérifie avec une égalité, un critère ou une
      // décomposition » vaut pour n'importe quelle question d'arithmétique, et
      // n'apprend donc rien sur celle-ci.
      // ⭐ Quinze nombres, et le corrigé DÉROULE les divisions successives.
      // Le contrôle final est nommé : refaire le produit.
      const items = [
        { n: 12, expected: ["2^2×3", "2²×3", "2^2 × 3", "2² × 3"], etapes: "12 ÷ 2 = 6, puis 6 ÷ 2 = 3, puis 3 ÷ 3 = 1", res: "2² × 3" },
        { n: 18, expected: ["2×3^2", "2 × 3^2", "2×3²", "2 × 3²"], etapes: "18 ÷ 2 = 9, puis 9 ÷ 3 = 3, puis 3 ÷ 3 = 1", res: "2 × 3²" },
        { n: 20, expected: ["2^2×5", "2²×5", "2^2 × 5", "2² × 5"], etapes: "20 ÷ 2 = 10, puis 10 ÷ 2 = 5, puis 5 ÷ 5 = 1", res: "2² × 5" },
        { n: 24, expected: ["2^3×3", "2³×3", "2^3 × 3", "2³ × 3"], etapes: "24 ÷ 2 = 12, puis 12 ÷ 2 = 6, puis 6 ÷ 2 = 3, puis 3 ÷ 3 = 1", res: "2³ × 3" },
        { n: 28, expected: ["2^2×7", "2²×7", "2^2 × 7", "2² × 7"], etapes: "28 ÷ 2 = 14, puis 14 ÷ 2 = 7, puis 7 ÷ 7 = 1", res: "2² × 7" },
        { n: 30, expected: ["2×3×5", "2 × 3 × 5"], etapes: "30 ÷ 2 = 15, puis 15 ÷ 3 = 5, puis 5 ÷ 5 = 1", res: "2 × 3 × 5" },
        { n: 36, expected: ["2^2×3^2", "2²×3²", "2^2 × 3^2", "2² × 3²"], etapes: "36 ÷ 2 = 18, puis 18 ÷ 2 = 9, puis 9 ÷ 3 = 3, puis 3 ÷ 3 = 1", res: "2² × 3²" },
        { n: 40, expected: ["2^3×5", "2³×5", "2^3 × 5", "2³ × 5"], etapes: "40 ÷ 2 = 20, puis 20 ÷ 2 = 10, puis 10 ÷ 2 = 5, puis 5 ÷ 5 = 1", res: "2³ × 5" },
        { n: 42, expected: ["2×3×7", "2 × 3 × 7"], etapes: "42 ÷ 2 = 21, puis 21 ÷ 3 = 7, puis 7 ÷ 7 = 1", res: "2 × 3 × 7" },
        { n: 45, expected: ["3^2×5", "3²×5", "3^2 × 5", "3² × 5"], etapes: "45 n'est pas pair : on essaie 3. 45 ÷ 3 = 15, puis 15 ÷ 3 = 5, puis 5 ÷ 5 = 1", res: "3² × 5" },
        { n: 50, expected: ["2×5^2", "2×5²", "2 × 5^2", "2 × 5²"], etapes: "50 ÷ 2 = 25, puis 25 ÷ 5 = 5, puis 5 ÷ 5 = 1", res: "2 × 5²" },
        { n: 60, expected: ["2^2×3×5", "2²×3×5", "2^2 × 3 × 5", "2² × 3 × 5"], etapes: "60 ÷ 2 = 30, puis 30 ÷ 2 = 15, puis 15 ÷ 3 = 5, puis 5 ÷ 5 = 1", res: "2² × 3 × 5" },
        { n: 63, expected: ["3^2×7", "3²×7", "3^2 × 7", "3² × 7"], etapes: "63 n'est pas pair : on essaie 3. 63 ÷ 3 = 21, puis 21 ÷ 3 = 7, puis 7 ÷ 7 = 1", res: "3² × 7" },
        { n: 84, expected: ["2^2×3×7", "2²×3×7", "2^2 × 3 × 7", "2² × 3 × 7"], etapes: "84 ÷ 2 = 42, puis 42 ÷ 2 = 21, puis 21 ÷ 3 = 7, puis 7 ÷ 7 = 1", res: "2² × 3 × 7" },
        { n: 90, expected: ["2×3^2×5", "2×3²×5", "2 × 3^2 × 5", "2 × 3² × 5"], etapes: "90 ÷ 2 = 45, puis 45 ÷ 3 = 15, puis 15 ÷ 3 = 5, puis 5 ÷ 5 = 1", res: "2 × 3² × 5" },
      ];
      const item = randomChoice(items);

      return {
        text: `Décomposer ${item.n} en produit de facteurs premiers.`,
        format: "short",
        expected: item.expected,
        comparator: "exact_text",
        explanation:
          "Définition : décomposer un entier, c'est l'écrire comme un produit de nombres PREMIERS — et cette écriture est unique, à l'ordre près.\n\n" +
          "Méthode : on divise par le plus petit nombre premier possible, on recommence sur le quotient obtenu, et on s'arrête quand on tombe sur 1.\n\n" +
          `Calcul : ${item.etapes}. On rassemble les diviseurs utilisés : ${item.res}.\n\n` +
          `Conclusion : $${item.n} = ${item.res}$. ⚠️ Deux contrôles avant de conclure — chaque facteur doit être PREMIER, et leur produit doit redonner ${item.n}. Refaire le produit prend cinq secondes et attrape toutes les erreurs.`,
      };
    },
  },

  /* =========================
     ARITH_PGCD_PPCM
  ========================= */

  {
    kind: "fixed",
    id: "3e_entier_pgcd_ppcm_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_pgcd_ppcm",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le plus grand diviseur commun de 12 et 18 ?",
    format: "qcm",
    choices: ["2", "3", "6", "12"],
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "Liste les diviseurs communs.",
    explanation: `Définition : l’arithmétique étudie les diviseurs, les multiples, les critères de divisibilité, les nombres premiers et les diviseurs communs.\n\n` +
      `Méthode : on repère la propriété utile, puis on vérifie avec une égalité, un critère ou une décomposition.\n\n` +
      `Calcul : on utilise les données de la question pour justifier la réponse. ` +
      ("Les diviseurs communs de 12 et 18 sont 1, 2, 3 et 6. Le plus grand est 6.") +
      `\n\nConclusion : la réponse est donc celle indiquée, avec une justification arithmétique.`,
    tags: ["entier_arithmetique", "pgcd", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_entier_pgcd_ppcm_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_pgcd_ppcm",
    difficulty: 3,
    theme: "neutral",
    text: "On veut faire des sachets identiques avec 24 bonbons et 36 biscuits, sans reste. Quel est le plus grand nombre de sachets possible ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Cherche le plus grand diviseur commun de 24 et 36.",
    explanation: `Définition : l’arithmétique étudie les diviseurs, les multiples, les critères de divisibilité, les nombres premiers et les diviseurs communs.\n\n` +
      `Méthode : on repère la propriété utile, puis on vérifie avec une égalité, un critère ou une décomposition.\n\n` +
      `Calcul : on utilise les données de la question pour justifier la réponse. ` +
      ("Le plus grand diviseur commun de 24 et 36 est 12. On peut donc faire 12 sachets identiques.") +
      `\n\nConclusion : la réponse est donc celle indiquée, avec une justification arithmétique.`,
    tags: ["entier_arithmetique", "pgcd", "probleme"],
  },

  {
    kind: "template",
    id: "3e_entier_pgcd_ppcm_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_pgcd_ppcm",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche le plus grand diviseur commun.",
    tags: ["entier_arithmetique", "pgcd", "template"],
    generate: () => {
      const d = randomChoice([3, 4, 5, 6, 8, 10, 12]);
      const a = d * randomInt(2, 5);
      const b = d * randomInt(6, 9);

      return {
        text: `Quel est le plus grand diviseur commun de ${a} et ${b} ?`,
        format: "short",
        expected: [String(d)],
        comparator: "number_equal",
        explanation: `Définition : l’arithmétique étudie les diviseurs, les multiples, les critères de divisibilité, les nombres premiers et les diviseurs communs.\n\n` +
          `Méthode : on repère la propriété utile, puis on vérifie avec une égalité, un critère ou une décomposition.\n\n` +
          `Calcul : on utilise les données de la question pour justifier la réponse. ` +
          (`${d} divise ${a} et ${b}. Dans cet exercice, c’est le plus grand diviseur commun.`) +
          `\n\nConclusion : la réponse est donc celle indiquée, avec une justification arithmétique.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_entier_pgcd_ppcm_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_pgcd_ppcm",
    difficulty: 4,
    theme: "reunion",
    hint: "Le nombre de lots doit diviser les deux quantités.",
    tags: ["entier_arithmetique", "pgcd", "reunion", "probleme", "template"],
    generate: () => {
      const d = randomChoice([6, 8, 10, 12]);
      const mangues = d * randomChoice([3, 4, 5]);
      const letchis = d * randomChoice([6, 7, 8]);

      return {
        text: `Au marché de Saint-Paul, on veut faire le plus grand nombre de paniers identiques avec ${mangues} mangues et ${letchis} letchis, sans reste. Combien de paniers peut-on faire ?`,
        format: "short",
        expected: [String(d)],
        comparator: "number_equal",
        explanation: `Définition : l’arithmétique étudie les diviseurs, les multiples, les critères de divisibilité, les nombres premiers et les diviseurs communs.\n\n` +
          `Méthode : on repère la propriété utile, puis on vérifie avec une égalité, un critère ou une décomposition.\n\n` +
          `Calcul : on utilise les données de la question pour justifier la réponse. ` +
          (`Le nombre de paniers doit diviser ${mangues} et ${letchis}. Le plus grand diviseur commun est ${d}.`) +
          `\n\nConclusion : la réponse est donc celle indiquée, avec une justification arithmétique.`,
      };
    },
  },

  /* =========================
     ARITH_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "3e_entier_arithmetique_defi_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_arithmetique_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « 2 × 15 est une décomposition en facteurs premiers de 30. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Tous les facteurs doivent être premiers.",
    explanation: `Définition : l’arithmétique étudie les diviseurs, les multiples, les critères de divisibilité, les nombres premiers et les diviseurs communs.\n\n` +
      `Méthode : on repère la propriété utile, puis on vérifie avec une égalité, un critère ou une décomposition.\n\n` +
      `Calcul : on utilise les données de la question pour justifier la réponse. ` +
      ("Non. 15 n’est pas premier. La décomposition en facteurs premiers est 30 = 2 × 3 × 5.") +
      `\n\nConclusion : la réponse est donc celle indiquée, avec une justification arithmétique.`,
    tags: ["entier_arithmetique", "defi", "erreur"],
  },

  {
    kind: "fixed",
    id: "3e_entier_arithmetique_defi_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_arithmetique_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi un nombre pair supérieur à 2 n’est pas premier.",
    format: "open",
    expected: ["pair", "2", "divisible"],
    comparator: "contains_keyword",
    hint: "Un nombre pair est divisible par 2.",
    explanation: `Définition : l’arithmétique étudie les diviseurs, les multiples, les critères de divisibilité, les nombres premiers et les diviseurs communs.\n\n` +
      `Méthode : on repère la propriété utile, puis on vérifie avec une égalité, un critère ou une décomposition.\n\n` +
      `Calcul : on utilise les données de la question pour justifier la réponse. ` +
      ("Un nombre pair supérieur à 2 est divisible par 2 et par lui-même. Il a donc plus de deux diviseurs, donc il n’est pas premier.") +
      `\n\nConclusion : la réponse est donc celle indiquée, avec une justification arithmétique.`,
    tags: ["entier_arithmetique", "defi", "open"],
  },

  {
    kind: "template",
    id: "3e_entier_arithmetique_defi_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_arithmetique_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Il faut que chaque groupe soit identique et qu’il ne reste rien.",
    tags: ["entier_arithmetique", "defi", "pgcd", "template"],
    generate: () => {
      const d = randomChoice([4, 6, 8, 9, 12]);
      const a = d * randomChoice([5, 6, 7]);
      const b = d * randomChoice([8, 9, 10]);

      return {
        text: `On veut répartir ${a} cartes rouges et ${b} cartes bleues en paquets identiques, sans reste. Quel est le plus grand nombre de paquets possibles ?`,
        format: "short",
        expected: [String(d)],
        comparator: "number_equal",
        explanation: `Définition : l’arithmétique étudie les diviseurs, les multiples, les critères de divisibilité, les nombres premiers et les diviseurs communs.\n\n` +
          `Méthode : on repère la propriété utile, puis on vérifie avec une égalité, un critère ou une décomposition.\n\n` +
          `Calcul : on utilise les données de la question pour justifier la réponse. ` +
          (`On cherche le plus grand diviseur commun de ${a} et ${b}. Il vaut ${d}.`) +
          `\n\nConclusion : la réponse est donc celle indiquée, avec une justification arithmétique.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_entier_arithmetique_defi_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_arithmetique_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Un nombre premier n’a que deux diviseurs.",
    tags: ["entier_arithmetique", "defi", "nombre_premier", "template"],
    generate: () => {
      const n = randomChoice([31, 37, 41, 43, 47]);
      return {
        text: `Explique pourquoi ${n} est un nombre premier.`,
        format: "open",
        expected: [String(n), "1"],
        comparator: "contains_keyword",
        explanation: `Définition : l’arithmétique étudie les diviseurs, les multiples, les critères de divisibilité, les nombres premiers et les diviseurs communs.\n\n` +
          `Méthode : on repère la propriété utile, puis on vérifie avec une égalité, un critère ou une décomposition.\n\n` +
          `Calcul : on utilise les données de la question pour justifier la réponse. ` +
          (`${n} n’est divisible par aucun entier autre que 1 et lui-même. Il est donc premier.`) +
          `\n\nConclusion : la réponse est donc celle indiquée, avec une justification arithmétique.`,
      };
    },
  },

  /* =========================
     ARITH_MULTIPLE_DIVISEUR (compléments)
  ========================= */
  {
    kind: "fixed",
    id: "3e_entier_multiple_diviseur_fixed_4",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_multiple_diviseur",
    difficulty: 1,
    theme: "neutral",
    text: "$8$ est-il un diviseur de $56$ ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "$56 \\div 8 = 7$, sans reste.",
    explanation:
      "Définition : $d$ est un diviseur de $n$ si la division de $n$ par $d$ tombe juste.\n\n" +
      "Méthode : on effectue $56 \\div 8$.\n\n" +
      "Calcul : $56 \\div 8 = 7$, reste $0$.\n\n" +
      "Conclusion : oui, $8$ est un diviseur de $56$.",
    tags: ["entier_arithmetique", "diviseur", "qcm"],
  },
  {
    kind: "template",
    id: "3e_entier_multiple_diviseur_tpl_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_multiple_diviseur",
    difficulty: 2,
    theme: "neutral",
    hint: "Vérifie si la division tombe juste.",
    tags: ["entier_arithmetique", "multiple", "template"],
    generate: () => {
      const d = randomChoice([3, 4, 6, 7]);
      const estMultiple = randomChoice([true, false]);
      const n = estMultiple ? d * randomChoice([4, 5, 6, 7]) : d * randomChoice([4, 5, 6]) + randomChoice([1, 2]);
      return {
        text: `$${n}$ est-il un multiple de $${d}$ ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [n % d === 0 ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          `Définition : $${n}$ est un multiple de $${d}$ si $${n} \\div ${d}$ tombe juste.\n\n` +
          `Méthode : on effectue la division.\n\n` +
          `Calcul : $${n} \\div ${d}$ ${n % d === 0 ? `$= ${n / d}$, reste $0$` : `ne tombe pas juste (reste $${n % d}$)`}.\n\n` +
          `Conclusion : ${n % d === 0 ? `oui, $${n}$ est un multiple de $${d}$.` : `non, $${n}$ n’est pas un multiple de $${d}$.`}`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_entier_multiple_diviseur_qcm_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_multiple_diviseur",
    difficulty: 2,
    theme: "neutral",
    text: "Lequel de ces nombres est un diviseur de $24$ ?",
    format: "qcm",
    choices: ["$6$", "$5$", "$7$", "$9$"],
    expected: ["$6$"],
    comparator: "mcq_exact",
    hint: "$24 \\div 6 = 4$.",
    explanation:
      "Définition : un diviseur de $24$ divise $24$ sans reste.\n\n" +
      "Méthode : on teste chaque nombre.\n\n" +
      "Calcul : $24 \\div 6 = 4$ (juste), alors que $5$, $7$, $9$ ne divisent pas $24$.\n\n" +
      "Conclusion : $6$ est un diviseur de $24$.",
    tags: ["entier_arithmetique", "diviseur", "qcm"],
  },
  {
    kind: "template",
    id: "3e_entier_multiple_diviseur_tpl_2_quotient",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_multiple_diviseur",
    difficulty: 2,
    theme: "neutral",
    hint: "Effectue la division exacte.",
    tags: ["entier_arithmetique", "diviseur", "quotient", "template"],
    generate: () => {
      const d = randomChoice([4, 6, 7, 8]);
      const q = randomChoice([4, 5, 6, 7]);
      const n = d * q;
      return {
        text: `$${d}$ est un diviseur de $${n}$. Combien vaut $${n} \\div ${d}$ ?`,
        format: "short",
        expected: [String(q)],
        comparator: "number_equal",
        explanation:
          `Définition : si $${d}$ divise $${n}$, le quotient est un entier.\n\n` +
          `Méthode : on effectue $${n} \\div ${d}$.\n\n` +
          `Calcul : $${n} \\div ${d} = ${q}$.\n\n` +
          `Conclusion : le quotient est $${q}$.`,
      };
    },
  },

  /* =========================
     ARITH_CRITERE_DIVISIBILITE (compléments)
  ========================= */
  {
    kind: "fixed",
    id: "3e_entier_critere_divisibilite_fixed_4",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_critere_divisibilite",
    difficulty: 2,
    theme: "neutral",
    text: "Un nombre est divisible par $3$ lorsque…",
    format: "qcm",
    choices: [
      "la somme de ses chiffres est divisible par $3$",
      "il se termine par $3$",
      "il est impair",
      "il se termine par $0$",
    ],
    expected: ["la somme de ses chiffres est divisible par $3$"],
    comparator: "mcq_exact",
    hint: "On regarde la somme des chiffres.",
    explanation:
      "Définition : critère de divisibilité par $3$ : la somme des chiffres est divisible par $3$.\n\n" +
      "Méthode : on additionne les chiffres.\n\n" +
      "Calcul : par exemple $123 \\to 1+2+3 = 6$, divisible par $3$.\n\n" +
      "Conclusion : c’est la somme des chiffres qui doit être divisible par $3$.",
    tags: ["entier_arithmetique", "critere", "trois", "qcm"],
  },
  {
    kind: "template",
    id: "3e_entier_critere_divisibilite_tpl_1_deux_cinq",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_critere_divisibilite",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde le chiffre des unités.",
    tags: ["entier_arithmetique", "critere", "template"],
    generate: () => {
      const d = randomChoice([2, 5, 10]);
      const n = randomInt(20, 199);
      const div = n % d === 0;
      return {
        text: `$${n}$ est-il divisible par $${d}$ ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [div ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          `Définition : critère par $${d}$ : on regarde le chiffre des unités.\n\n` +
          `Méthode : un nombre est divisible par $2$ s’il finit par un chiffre pair, par $5$ s’il finit par $0$ ou $5$, par $10$ s’il finit par $0$.\n\n` +
          `Calcul : $${n}$ se termine par $${n % 10}$.\n\n` +
          `Conclusion : ${div ? `oui, $${n}$ est divisible par $${d}$.` : `non, $${n}$ n’est pas divisible par $${d}$.`}`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_entier_critere_divisibilite_fixed_2_neuf",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_critere_divisibilite",
    difficulty: 3,
    theme: "neutral",
    text: "$123$ est-il divisible par $9$ ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Somme des chiffres : $1 + 2 + 3$.",
    explanation:
      "Définition : un nombre est divisible par $9$ si la somme de ses chiffres l’est.\n\n" +
      "Méthode : on additionne les chiffres.\n\n" +
      "Calcul : $1 + 2 + 3 = 6$, qui n’est pas divisible par $9$.\n\n" +
      "Conclusion : non, $123$ n’est pas divisible par $9$.",
    tags: ["entier_arithmetique", "critere", "neuf", "qcm"],
  },
  {
    kind: "template",
    id: "3e_entier_critere_divisibilite_tpl_2_trois",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_critere_divisibilite",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les chiffres et teste la divisibilité par $3$.",
    tags: ["entier_arithmetique", "critere", "trois", "template"],
    generate: () => {
      const n = randomInt(100, 299);
      const somme = String(n).split("").reduce((s, c) => s + Number(c), 0);
      const div = somme % 3 === 0;
      return {
        text: `$${n}$ est-il divisible par $3$ ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [div ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          `Définition : un nombre est divisible par $3$ si la somme de ses chiffres l’est.\n\n` +
          `Méthode : on additionne les chiffres de $${n}$.\n\n` +
          `Calcul : somme des chiffres $= ${somme}$, ${div ? "divisible" : "non divisible"} par $3$.\n\n` +
          `Conclusion : ${div ? `oui, $${n}$ est divisible par $3$.` : `non, $${n}$ n’est pas divisible par $3$.`}`,
      };
    },
  },

  /* =========================
     ARITH_NOMBRE_PREMIER (compléments)
  ========================= */
  {
    kind: "fixed",
    id: "3e_entier_nombre_premier_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_nombre_premier",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre $1$ est-il un nombre premier ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Un nombre premier a exactement deux diviseurs.",
    explanation:
      "Définition : un nombre premier a exactement deux diviseurs distincts : $1$ et lui-même.\n\n" +
      "Méthode : on compte les diviseurs de $1$.\n\n" +
      "Calcul : $1$ n’a qu’un seul diviseur, lui-même.\n\n" +
      "Conclusion : non, $1$ n’est pas premier.",
    tags: ["entier_arithmetique", "premier", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_entier_nombre_premier_fixed_2_plus_petit",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_nombre_premier",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le plus petit nombre premier ?",
    format: "qcm",
    choices: ["$2$", "$1$", "$3$", "$0$"],
    expected: ["$2$"],
    comparator: "mcq_exact",
    hint: "C’est aussi le seul nombre premier pair.",
    explanation:
      "Définition : un nombre premier a exactement deux diviseurs.\n\n" +
      "Méthode : on cherche le plus petit entier avec deux diviseurs.\n\n" +
      "Calcul : $2$ a pour diviseurs $1$ et $2$.\n\n" +
      "Conclusion : le plus petit nombre premier est $2$.",
    tags: ["entier_arithmetique", "premier", "qcm"],
  },
  {
    kind: "template",
    id: "3e_entier_nombre_premier_tpl_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_nombre_premier",
    difficulty: 3,
    theme: "neutral",
    hint: "On cherche s’il a un diviseur autre que $1$ et lui-même.",
    tags: ["entier_arithmetique", "premier", "template"],
    generate: () => {
      const premier = randomChoice([true, false]);
      const n = premier ? randomChoice(primes.filter((p) => p > 3)) : randomChoice(composites);
      return {
        text: `$${n}$ est-il un nombre premier ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [isPrime(n) ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          `Définition : un nombre premier n’a que deux diviseurs : $1$ et lui-même.\n\n` +
          `Méthode : on cherche un diviseur autre que $1$ et $${n}$.\n\n` +
          `Calcul : ${isPrime(n) ? `$${n}$ n’a aucun autre diviseur.` : `$${n}$ a un diviseur autre que $1$ et lui-même.`}\n\n` +
          `Conclusion : ${isPrime(n) ? `oui, $${n}$ est premier.` : `non, $${n}$ n’est pas premier.`}`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_entier_nombre_premier_qcm_1_liste",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_nombre_premier",
    difficulty: 3,
    theme: "neutral",
    text: "Lequel de ces nombres est premier ?",
    format: "qcm",
    choices: ["$13$", "$15$", "$21$", "$9$"],
    expected: ["$13$"],
    comparator: "mcq_exact",
    hint: "$15 = 3 \\times 5$, $21 = 3 \\times 7$, $9 = 3^2$.",
    explanation:
      "Définition : un nombre premier n’a que deux diviseurs.\n\n" +
      "Méthode : on teste chaque nombre.\n\n" +
      "Calcul : $15 = 3 \\times 5$, $21 = 3 \\times 7$, $9 = 3^2$, mais $13$ n’a que $1$ et $13$ comme diviseurs.\n\n" +
      "Conclusion : $13$ est premier.",
    tags: ["entier_arithmetique", "premier", "qcm"],
  },

  /* =========================
     ARITH_DECOMPOSER_FACTEUR (compléments) — QCM (expressions)
  ========================= */
  {
    kind: "fixed",
    id: "3e_entier_decomposer_facteur_qcm_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_decomposer_facteur",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la décomposition de $12$ en produit de facteurs premiers ?",
    format: "qcm",
    choices: ["$2^2 \\times 3$", "$2 \\times 6$", "$3 \\times 4$", "$2 \\times 3^2$"],
    expected: ["$2^2 \\times 3$"],
    comparator: "mcq_exact",
    hint: "$12 = 4 \\times 3$ et $4 = 2^2$.",
    explanation:
      "Définition : décomposer, c’est écrire le nombre comme produit de nombres premiers.\n\n" +
      "Méthode : on divise successivement par les nombres premiers.\n\n" +
      "Calcul : $12 = 4 \\times 3 = 2^2 \\times 3$.\n\n" +
      "Conclusion : $12 = 2^2 \\times 3$.",
    tags: ["entier_arithmetique", "decomposition", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_entier_decomposer_facteur_qcm_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_decomposer_facteur",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la décomposition de $60$ en produit de facteurs premiers ?",
    format: "qcm",
    choices: ["$2^2 \\times 3 \\times 5$", "$2 \\times 30$", "$6 \\times 10$", "$2^3 \\times 5$"],
    expected: ["$2^2 \\times 3 \\times 5$"],
    comparator: "mcq_exact",
    hint: "$60 = 4 \\times 15 = 4 \\times 3 \\times 5$.",
    explanation:
      "Définition : on écrit $60$ comme produit de nombres premiers.\n\n" +
      "Méthode : $60 = 4 \\times 15$, puis $4 = 2^2$ et $15 = 3 \\times 5$.\n\n" +
      "Calcul : $60 = 2^2 \\times 3 \\times 5$.\n\n" +
      "Conclusion : $60 = 2^2 \\times 3 \\times 5$.",
    tags: ["entier_arithmetique", "decomposition", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_entier_decomposer_facteur_qcm_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_decomposer_facteur",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la décomposition de $72$ en produit de facteurs premiers ?",
    format: "qcm",
    choices: ["$2^3 \\times 3^2$", "$2^2 \\times 3^3$", "$8 \\times 9$", "$2 \\times 36$"],
    expected: ["$2^3 \\times 3^2$"],
    comparator: "mcq_exact",
    hint: "$72 = 8 \\times 9 = 2^3 \\times 3^2$.",
    explanation:
      "Définition : on décompose $72$ en nombres premiers.\n\n" +
      "Méthode : $72 = 8 \\times 9$, avec $8 = 2^3$ et $9 = 3^2$.\n\n" +
      "Calcul : $72 = 2^3 \\times 3^2$.\n\n" +
      "Conclusion : $72 = 2^3 \\times 3^2$.",
    tags: ["entier_arithmetique", "decomposition", "qcm"],
  },
  {
    kind: "template",
    id: "3e_entier_decomposer_facteur_tpl_2_qcm",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_decomposer_facteur",
    difficulty: 4,
    theme: "neutral",
    hint: "Décompose progressivement jusqu’aux facteurs premiers.",
    tags: ["entier_arithmetique", "decomposition", "qcm", "template"],
    generate: () => {
      const item = randomChoice([
        { n: 18, correct: "$2 \\times 3^2$", w: ["$2^2 \\times 3$", "$3 \\times 6$", "$2 \\times 9$"] },
        { n: 20, correct: "$2^2 \\times 5$", w: ["$2 \\times 10$", "$4 \\times 5$", "$2^3 \\times 5$"] },
        { n: 45, correct: "$3^2 \\times 5$", w: ["$5 \\times 9$", "$3 \\times 15$", "$3^3 \\times 5$"] },
        { n: 50, correct: "$2 \\times 5^2$", w: ["$5 \\times 10$", "$2^2 \\times 5$", "$2 \\times 25$"] },
      ]);
      return {
        text: `Quelle est la décomposition de $${item.n}$ en produit de facteurs premiers ?`,
        format: "qcm",
        choices: shuffle([item.correct, ...item.w]),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : décomposer $${item.n}$, c’est l’écrire comme produit de nombres premiers.\n\n` +
          `Méthode : on divise successivement par $2$, $3$, $5$…\n\n` +
          `Calcul : la décomposition correcte est ${item.correct}.\n\n` +
          `Conclusion : $${item.n} = $ ${item.correct}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_entier_decomposer_facteur_qcm_4_role",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_decomposer_facteur",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une décomposition en facteurs premiers, tous les facteurs doivent être…",
    format: "qcm",
    choices: ["des nombres premiers", "des nombres pairs", "des multiples de $10$", "des carrés"],
    expected: ["des nombres premiers"],
    comparator: "mcq_exact",
    hint: "C’est dans le nom : facteurs premiers.",
    explanation:
      "Définition : la décomposition n’utilise que des nombres premiers.\n\n" +
      "Méthode : on continue à décomposer tant qu’un facteur n’est pas premier.\n\n" +
      "Calcul : par exemple $4$ doit devenir $2^2$.\n\n" +
      "Conclusion : tous les facteurs sont des nombres premiers.",
    tags: ["entier_arithmetique", "decomposition", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_entier_decomposer_facteur_qcm_5",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_decomposer_facteur",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la décomposition de $100$ en produit de facteurs premiers ?",
    format: "qcm",
    choices: ["$2^2 \\times 5^2$", "$10^2$", "$2 \\times 50$", "$4 \\times 25$"],
    expected: ["$2^2 \\times 5^2$"],
    comparator: "mcq_exact",
    hint: "$100 = 4 \\times 25$.",
    explanation:
      "Définition : on décompose $100$ en nombres premiers.\n\n" +
      "Méthode : $100 = 4 \\times 25 = 2^2 \\times 5^2$.\n\n" +
      "Calcul : $100 = 2^2 \\times 5^2$.\n\n" +
      "Conclusion : $100 = 2^2 \\times 5^2$.",
    tags: ["entier_arithmetique", "decomposition", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_entier_decomposer_facteur_qcm_6",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_decomposer_facteur",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la décomposition de $84$ en produit de facteurs premiers ?",
    format: "qcm",
    choices: ["$2^2 \\times 3 \\times 7$", "$2 \\times 42$", "$4 \\times 21$", "$2^3 \\times 3 \\times 7$"],
    expected: ["$2^2 \\times 3 \\times 7$"],
    comparator: "mcq_exact",
    hint: "$84 = 4 \\times 21 = 4 \\times 3 \\times 7$.",
    explanation:
      "Définition : on décompose $84$ en nombres premiers.\n\n" +
      "Méthode : $84 = 4 \\times 21$, avec $4 = 2^2$ et $21 = 3 \\times 7$.\n\n" +
      "Calcul : $84 = 2^2 \\times 3 \\times 7$.\n\n" +
      "Conclusion : $84 = 2^2 \\times 3 \\times 7$.",
    tags: ["entier_arithmetique", "decomposition", "qcm"],
  },

  /* =========================
     ARITH_PGCD_PPCM (compléments)
  ========================= */
  {
    kind: "template",
    id: "3e_entier_pgcd_ppcm_tpl_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_pgcd_ppcm",
    difficulty: 3,
    theme: "neutral",
    hint: "Liste les diviseurs communs et prends le plus grand.",
    tags: ["entier_arithmetique", "pgcd", "template"],
    generate: () => {
      const item = randomChoice([
        { a: 12, b: 8, pgcd: 4 },
        { a: 18, b: 24, pgcd: 6 },
        { a: 20, b: 30, pgcd: 10 },
        { a: 15, b: 25, pgcd: 5 },
        { a: 16, b: 24, pgcd: 8 },
      ]);
      return {
        text: `Quel est le PGCD de $${item.a}$ et $${item.b}$ ?`,
        format: "short",
        expected: [String(item.pgcd)],
        comparator: "number_equal",
        explanation:
          `Définition : le PGCD est le plus grand diviseur commun.\n\n` +
          `Méthode : on cherche le plus grand nombre qui divise $${item.a}$ et $${item.b}$.\n\n` +
          `Calcul : le PGCD de $${item.a}$ et $${item.b}$ est $${item.pgcd}$.\n\n` +
          `Conclusion : PGCD$(${item.a}, ${item.b}) = ${item.pgcd}$.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_entier_pgcd_ppcm_qcm_1_def",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_pgcd_ppcm",
    difficulty: 2,
    theme: "neutral",
    text: "Que signifie « PGCD de deux nombres » ?",
    format: "qcm",
    choices: [
      "le plus grand diviseur commun",
      "le plus grand multiple commun",
      "le plus petit diviseur commun",
      "la somme des deux nombres",
    ],
    expected: ["le plus grand diviseur commun"],
    comparator: "mcq_exact",
    hint: "PGCD = Plus Grand Commun Diviseur.",
    explanation:
      "Définition : le PGCD est le plus grand diviseur commun à deux nombres.\n\n" +
      "Méthode : on cherche les diviseurs communs et on prend le plus grand.\n\n" +
      "Calcul : par exemple PGCD$(12, 18) = 6$.\n\n" +
      "Conclusion : le PGCD est le plus grand diviseur commun.",
    tags: ["entier_arithmetique", "pgcd", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "3e_entier_pgcd_ppcm_tpl_2_ppcm",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_pgcd_ppcm",
    difficulty: 4,
    theme: "neutral",
    hint: "Le PPCM est le plus petit multiple commun.",
    tags: ["entier_arithmetique", "ppcm", "template"],
    generate: () => {
      const item = randomChoice([
        { a: 4, b: 6, ppcm: 12 },
        { a: 6, b: 8, ppcm: 24 },
        { a: 3, b: 5, ppcm: 15 },
        { a: 4, b: 10, ppcm: 20 },
      ]);
      return {
        text: `Quel est le PPCM (plus petit multiple commun) de $${item.a}$ et $${item.b}$ ?`,
        format: "short",
        expected: [String(item.ppcm)],
        comparator: "number_equal",
        explanation:
          `Définition : le PPCM est le plus petit multiple commun à deux nombres.\n\n` +
          `Méthode : on liste les multiples et on prend le plus petit commun.\n\n` +
          `Calcul : le PPCM de $${item.a}$ et $${item.b}$ est $${item.ppcm}$.\n\n` +
          `Conclusion : PPCM$(${item.a}, ${item.b}) = ${item.ppcm}$.`,
      };
    },
  },
  {
    kind: "template",
    id: "3e_entier_pgcd_ppcm_tpl_3_probleme",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_pgcd_ppcm",
    difficulty: 5,
    theme: "reunion",
    hint: "On cherche le plus grand nombre de paquets identiques : c’est le PGCD.",
    tags: ["entier_arithmetique", "pgcd", "probleme", "reunion", "template"],
    generate: () => {
      const item = randomChoice([
        { a: 12, b: 18, pgcd: 6 },
        { a: 24, b: 36, pgcd: 12 },
        { a: 20, b: 30, pgcd: 10 },
      ]);
      return {
        text: `On veut répartir $${item.a}$ mangues et $${item.b}$ letchis dans des paniers identiques, sans reste. Quel est le plus grand nombre de paniers possible ?`,
        format: "short",
        expected: [String(item.pgcd)],
        comparator: "number_equal",
        explanation:
          `Définition : le plus grand nombre de paniers identiques est le PGCD.\n\n` +
          `Méthode : on cherche PGCD$(${item.a}, ${item.b})$.\n\n` +
          `Calcul : PGCD$(${item.a}, ${item.b}) = ${item.pgcd}$.\n\n` +
          `Conclusion : on peut faire $${item.pgcd}$ paniers.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_entier_pgcd_ppcm_qcm_2_premier_entre_eux",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_pgcd_ppcm",
    difficulty: 4,
    theme: "neutral",
    text: "Deux nombres dont le PGCD vaut $1$ sont dits…",
    format: "qcm",
    choices: ["premiers entre eux", "tous les deux premiers", "égaux", "opposés"],
    expected: ["premiers entre eux"],
    comparator: "mcq_exact",
    hint: "Ils n’ont aucun diviseur commun autre que $1$.",
    explanation:
      "Définition : deux nombres dont le seul diviseur commun est $1$ sont premiers entre eux.\n\n" +
      "Méthode : on regarde leur PGCD.\n\n" +
      "Calcul : si PGCD $= 1$, ils n’ont pas d’autre diviseur commun.\n\n" +
      "Conclusion : ils sont premiers entre eux.",
    tags: ["entier_arithmetique", "pgcd", "premiers_entre_eux", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_entier_pgcd_ppcm_fixed_3_fraction",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_pgcd_ppcm",
    difficulty: 5,
    theme: "neutral",
    text: "Pour rendre la fraction $\\dfrac{18}{24}$ irréductible, par quel nombre faut-il diviser le numérateur et le dénominateur ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "On divise par le PGCD de $18$ et $24$.",
    explanation:
      "Définition : pour simplifier au maximum, on divise par le PGCD.\n\n" +
      "Méthode : on calcule PGCD$(18, 24)$.\n\n" +
      "Calcul : PGCD$(18, 24) = 6$.\n\n" +
      "Conclusion : on divise par $6$ (et $\\dfrac{18}{24} = \\dfrac{3}{4}$).",
    tags: ["entier_arithmetique", "pgcd", "fraction", "short"],
  },

  /* =========================
     ARITH_DEFI (compléments)
  ========================= */
  {
    kind: "template",
    id: "3e_entier_arithmetique_defi_tpl_1_paquets",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_arithmetique_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le plus grand nombre de paquets identiques est le PGCD.",
    tags: ["entier_arithmetique", "defi", "pgcd", "template"],
    generate: () => {
      const item = randomChoice([
        { a: 16, b: 24, pgcd: 8 },
        { a: 30, b: 45, pgcd: 15 },
        { a: 14, b: 21, pgcd: 7 },
      ]);
      return {
        text: `Un fleuriste a $${item.a}$ roses et $${item.b}$ tulipes. Il veut faire le plus grand nombre de bouquets identiques sans reste. Combien de bouquets peut-il faire ?`,
        format: "short",
        expected: [String(item.pgcd)],
        comparator: "number_equal",
        explanation:
          `Définition : le plus grand nombre de bouquets identiques est le PGCD.\n\n` +
          `Méthode : on calcule PGCD$(${item.a}, ${item.b})$.\n\n` +
          `Calcul : PGCD$(${item.a}, ${item.b}) = ${item.pgcd}$.\n\n` +
          `Conclusion : il peut faire $${item.pgcd}$ bouquets.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_entier_arithmetique_defi_qcm_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_arithmetique_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Deux feux clignotent : l’un toutes les $4$ s, l’autre toutes les $6$ s. Ils clignotent ensemble. Dans combien de secondes clignoteront-ils de nouveau ensemble ?",
    format: "qcm",
    choices: ["$12$ s", "$10$ s", "$24$ s", "$2$ s"],
    expected: ["$12$ s"],
    comparator: "mcq_exact",
    hint: "On cherche le PPCM de $4$ et $6$.",
    explanation:
      "Définition : ils coïncident à un multiple commun, le plus petit est le PPCM.\n\n" +
      "Méthode : on cherche PPCM$(4, 6)$.\n\n" +
      "Calcul : PPCM$(4, 6) = 12$.\n\n" +
      "Conclusion : ils clignoteront ensemble dans $12$ s.",
    tags: ["entier_arithmetique", "defi", "ppcm", "qcm"],
  },
  {
    kind: "template",
    id: "3e_entier_arithmetique_defi_tpl_2_premier",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_arithmetique_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Teste les diviseurs jusqu’à la racine du nombre.",
    tags: ["entier_arithmetique", "defi", "premier", "template"],
    generate: () => {
      const n = randomChoice([2, 3, 5, 7, 11, 13, 17, 19, 23]);
      return {
        text: `Le nombre $${n}$ est-il premier ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation:
          `Définition : un nombre premier n’a que deux diviseurs.\n\n` +
          `Méthode : on teste les diviseurs possibles.\n\n` +
          `Calcul : $${n}$ n’a que $1$ et $${n}$ comme diviseurs.\n\n` +
          `Conclusion : oui, $${n}$ est premier.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_entier_arithmetique_defi_fixed_1_irreductible",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_arithmetique_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Pour simplifier $\\dfrac{36}{48}$ en une seule étape, par quel nombre faut-il diviser ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "On divise par le PGCD de $36$ et $48$.",
    explanation:
      "Définition : on simplifie au maximum en divisant par le PGCD.\n\n" +
      "Méthode : on calcule PGCD$(36, 48)$.\n\n" +
      "Calcul : PGCD$(36, 48) = 12$ (et $\\dfrac{36}{48} = \\dfrac{3}{4}$).\n\n" +
      "Conclusion : on divise par $12$.",
    tags: ["entier_arithmetique", "defi", "fraction", "short"],
  },
  {
    kind: "fixed",
    id: "3e_entier_arithmetique_defi_qcm_2_pair_premier",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_arithmetique_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Quel est le seul nombre premier pair ?",
    format: "qcm",
    choices: ["$2$", "$4$", "$0$", "il n’y en a pas"],
    expected: ["$2$"],
    comparator: "mcq_exact",
    hint: "Tous les autres nombres pairs sont divisibles par $2$.",
    explanation:
      "Définition : un nombre premier n’a que deux diviseurs.\n\n" +
      "Méthode : tout nombre pair est divisible par $2$ ; pour rester premier, il ne doit pas avoir d’autre diviseur.\n\n" +
      "Calcul : seul $2$ est pair et premier.\n\n" +
      "Conclusion : c’est $2$.",
    tags: ["entier_arithmetique", "defi", "premier", "qcm"],
  },
  {
    kind: "template",
    id: "3e_entier_arithmetique_defi_tpl_3_ppcm_probleme",
    niveau: "3e",
    matiere: "maths",
    notionId: "entier_arithmetique",
    microId: "entier_arithmetique_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "On cherche le plus petit multiple commun (PPCM).",
    tags: ["entier_arithmetique", "defi", "ppcm", "template"],
    generate: () => {
      const item = randomChoice([
        { a: 6, b: 8, ppcm: 24 },
        { a: 4, b: 10, ppcm: 20 },
        { a: 6, b: 9, ppcm: 18 },
      ]);
      return {
        text: `Deux bus passent à un arrêt : l’un toutes les $${item.a}$ min, l’autre toutes les $${item.b}$ min. Ils partent ensemble. Dans combien de minutes repartiront-ils ensemble ?`,
        format: "short",
        expected: [String(item.ppcm)],
        comparator: "number_equal",
        explanation:
          `Définition : ils coïncident au plus petit multiple commun (PPCM).\n\n` +
          `Méthode : on cherche PPCM$(${item.a}, ${item.b})$.\n\n` +
          `Calcul : PPCM$(${item.a}, ${item.b}) = ${item.ppcm}$.\n\n` +
          `Conclusion : ils repartiront ensemble dans $${item.ppcm}$ min.`,
      };
    },
  },
];