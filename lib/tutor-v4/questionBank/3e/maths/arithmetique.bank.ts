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
    id: "3e_arith_multiple_diviseur_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "arithmetique",
    microId: "arith_multiple_diviseur",
    difficulty: 1,
    theme: "neutral",
    text: "12 est-il un multiple de 3 ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Cherche si 12 est dans la table de 3.",
    explanation: "Oui, car 12 = 3 × 4.",
    tags: ["arithmetique", "multiple", "diviseur"],
  },

  {
    kind: "fixed",
    id: "3e_arith_multiple_diviseur_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "arithmetique",
    microId: "arith_multiple_diviseur",
    difficulty: 1,
    theme: "neutral",
    text: "5 est-il un diviseur de 35 ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "On cherche si 35 se divise exactement par 5.",
    explanation: "Oui, car 35 = 5 × 7.",
    tags: ["arithmetique", "diviseur", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_arith_multiple_diviseur_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "arithmetique",
    microId: "arith_multiple_diviseur",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre est un diviseur de 42 ?",
    format: "qcm",
    choices: ["5", "6", "8", "10"],
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "42 doit être divisible sans reste.",
    explanation: "6 est un diviseur de 42 car 42 = 6 × 7.",
    tags: ["arithmetique", "diviseur", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_arith_multiple_diviseur_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "arithmetique",
    microId: "arith_multiple_diviseur",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 8 est un diviseur de 56.",
    format: "open",
    expected: ["56", "8", "7"],
    comparator: "contains_keyword",
    hint: "Écris 56 comme un produit contenant 8.",
    explanation: "8 est un diviseur de 56 car 56 = 8 × 7.",
    tags: ["arithmetique", "diviseur", "open"],
  },

  {
    kind: "template",
    id: "3e_arith_multiple_diviseur_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "arithmetique",
    microId: "arith_multiple_diviseur",
    difficulty: 2,
    theme: "neutral",
    hint: "Un multiple s’obtient en multipliant par un entier.",
    tags: ["arithmetique", "multiple", "template"],
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
        explanation: `Oui, car ${n} = ${d} × ${k}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_arith_multiple_diviseur_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "arithmetique",
    microId: "arith_multiple_diviseur",
    difficulty: 2,
    theme: "neutral",
    hint: "On vérifie si la division tombe juste.",
    tags: ["arithmetique", "diviseur", "template"],
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
        explanation: yes
          ? `Oui, car ${n} = ${d} × ${k}.`
          : `Non, ${n} n’est pas divisible exactement par ${d}.`,
      };
    },
  },

  /* =========================
     ARITH_CRITERES
  ========================= */

  {
    kind: "fixed",
    id: "3e_arith_criteres_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "arithmetique",
    microId: "arith_criteres",
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
    explanation: "Un nombre divisible par 2 est un nombre pair.",
    tags: ["arithmetique", "criteres", "divisibilite"],
  },

  {
    kind: "fixed",
    id: "3e_arith_criteres_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "arithmetique",
    microId: "arith_criteres",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre 135 est divisible par…",
    format: "qcm",
    choices: ["2", "3", "4", "8"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Additionne les chiffres de 135.",
    explanation: "1 + 3 + 5 = 9, et 9 est divisible par 3. Donc 135 est divisible par 3.",
    tags: ["arithmetique", "criteres", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_arith_criteres_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "arithmetique",
    microId: "arith_criteres",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre 250 est divisible par…",
    format: "qcm",
    choices: ["3", "4", "5", "9"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Un nombre divisible par 5 finit par 0 ou 5.",
    explanation: "250 finit par 0, donc il est divisible par 5.",
    tags: ["arithmetique", "criteres", "qcm"],
  },

  {
    kind: "template",
    id: "3e_arith_criteres_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "arithmetique",
    microId: "arith_criteres",
    difficulty: 2,
    theme: "neutral",
    hint: "Un nombre divisible par 5 finit par 0 ou 5.",
    tags: ["arithmetique", "criteres", "template"],
    generate: () => {
      const n = randomChoice([45, 60, 75, 100, 125, 230, 345, 500]);

      return {
        text: `${n} est-il divisible par 5 ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation: `${n} finit par 0 ou 5, donc il est divisible par 5.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_arith_criteres_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "arithmetique",
    microId: "arith_criteres",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour 3 ou 9, additionne les chiffres.",
    tags: ["arithmetique", "criteres", "template"],
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
        explanation: `La somme des chiffres vaut ${sum}. ${
          divisible
            ? `${sum} est divisible par 3, donc ${n} est divisible par 3.`
            : `${sum} n’est pas divisible par 3, donc ${n} n’est pas divisible par 3.`
        }`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_arith_criteres_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "arithmetique",
    microId: "arith_criteres",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 738 est divisible par 3.",
    format: "open",
    expected: ["7", "3", "8", "18", "3"],
    comparator: "contains_keyword",
    hint: "Additionne les chiffres.",
    explanation: "7 + 3 + 8 = 18, et 18 est divisible par 3. Donc 738 est divisible par 3.",
    tags: ["arithmetique", "criteres", "open"],
  },

  /* =========================
     ARITH_NOMBRE_PREMIER
  ========================= */

  {
    kind: "fixed",
    id: "3e_arith_nombre_premier_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "arithmetique",
    microId: "arith_nombre_premier",
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
    explanation: "Un nombre premier possède exactement deux diviseurs : 1 et lui-même.",
    tags: ["arithmetique", "nombre_premier", "definition"],
  },

  {
    kind: "fixed",
    id: "3e_arith_nombre_premier_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "arithmetique",
    microId: "arith_nombre_premier",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre est premier ?",
    format: "qcm",
    choices: ["9", "15", "17", "21"],
    expected: ["17"],
    comparator: "mcq_exact",
    hint: "Un nombre premier n’a que deux diviseurs.",
    explanation: "17 est premier car ses seuls diviseurs sont 1 et 17.",
    tags: ["arithmetique", "nombre_premier", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_arith_nombre_premier_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "arithmetique",
    microId: "arith_nombre_premier",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : « 1 est un nombre premier. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Un nombre premier doit avoir exactement deux diviseurs.",
    explanation: "Non. 1 n’a qu’un seul diviseur : lui-même. Donc 1 n’est pas un nombre premier.",
    tags: ["arithmetique", "nombre_premier", "erreur"],
  },

  {
    kind: "template",
    id: "3e_arith_nombre_premier_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "arithmetique",
    microId: "arith_nombre_premier",
    difficulty: 2,
    theme: "neutral",
    hint: "Teste les petits diviseurs possibles.",
    tags: ["arithmetique", "nombre_premier", "template"],
    generate: () => {
      const n = randomChoice([...primes, ...composites]);
      const prime = isPrime(n);

      return {
        text: `${n} est-il un nombre premier ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [prime ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: prime
          ? `${n} est premier : ses seuls diviseurs sont 1 et ${n}.`
          : `${n} n’est pas premier : il possède d’autres diviseurs que 1 et lui-même.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_arith_nombre_premier_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "arithmetique",
    microId: "arith_nombre_premier",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche le seul nombre qui n’a que deux diviseurs.",
    tags: ["arithmetique", "nombre_premier", "template", "qcm"],
    generate: () => {
      const good = randomChoice(primes.filter((n) => n >= 11));
      const wrongs = shuffle(composites).slice(0, 3).map(String);

      return {
        text: "Quel nombre est premier ?",
        format: "qcm",
        choices: shuffle([String(good), ...wrongs]),
        expected: [String(good)],
        comparator: "mcq_exact",
        explanation: `${good} est premier car il n’a que deux diviseurs : 1 et ${good}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_arith_nombre_premier_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "arithmetique",
    microId: "arith_nombre_premier",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi 21 n’est pas un nombre premier.",
    format: "open",
    expected: ["21", "3", "7"],
    comparator: "contains_keyword",
    hint: "Écris 21 comme un produit.",
    explanation: "21 n’est pas premier car 21 = 3 × 7. Il a donc d’autres diviseurs que 1 et 21.",
    tags: ["arithmetique", "nombre_premier", "open"],
  },
    /* =========================
     ARITH_DECOMPOSER
  ========================= */

  {
    kind: "fixed",
    id: "3e_arith_decomposer_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "arithmetique",
    microId: "arith_decomposer",
    difficulty: 2,
    theme: "neutral",
    text: "Décomposer 12 en produit de facteurs premiers.",
    format: "qcm",
    choices: ["2 × 6", "3 × 4", "2² × 3", "12 × 1"],
    expected: ["2² × 3"],
    comparator: "mcq_exact",
    hint: "Tous les facteurs doivent être premiers.",
    explanation: "12 = 2 × 2 × 3 = 2² × 3.",
    tags: ["arithmetique", "decomposition", "facteurs_premiers"],
  },

  {
    kind: "fixed",
    id: "3e_arith_decomposer_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "arithmetique",
    microId: "arith_decomposer",
    difficulty: 3,
    theme: "neutral",
    text: "Décomposer 45 en produit de facteurs premiers.",
    format: "short",
    expected: ["3^2×5", "3²×5", "3^2 × 5", "3² × 5"],
    comparator: "exact_text",
    hint: "45 = 9 × 5.",
    explanation: "45 = 9 × 5 = 3² × 5.",
    tags: ["arithmetique", "decomposition"],
  },

  {
    kind: "template",
    id: "3e_arith_decomposer_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "arithmetique",
    microId: "arith_decomposer",
    difficulty: 3,
    theme: "neutral",
    hint: "Décompose progressivement avec des facteurs premiers.",
    tags: ["arithmetique", "decomposition", "template"],
    generate: () => {
      const items = [
        { n: 18, expected: ["2×3^2", "2 × 3^2", "2×3²", "2 × 3²"], exp: "18 = 2 × 9 = 2 × 3²." },
        { n: 20, expected: ["2^2×5", "2²×5", "2^2 × 5", "2² × 5"], exp: "20 = 4 × 5 = 2² × 5." },
        { n: 28, expected: ["2^2×7", "2²×7", "2^2 × 7", "2² × 7"], exp: "28 = 4 × 7 = 2² × 7." },
        { n: 30, expected: ["2×3×5", "2 × 3 × 5"], exp: "30 = 2 × 3 × 5." },
        { n: 36, expected: ["2^2×3^2", "2²×3²", "2^2 × 3^2", "2² × 3²"], exp: "36 = 4 × 9 = 2² × 3²." },
      ];
      const item = randomChoice(items);

      return {
        text: `Décomposer ${item.n} en produit de facteurs premiers.`,
        format: "short",
        expected: item.expected,
        comparator: "exact_text",
        explanation: item.exp,
      };
    },
  },

  /* =========================
     ARITH_PGCD_PPCM
  ========================= */

  {
    kind: "fixed",
    id: "3e_arith_pgcd_ppcm_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "arithmetique",
    microId: "arith_pgcd_ppcm",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le plus grand diviseur commun de 12 et 18 ?",
    format: "qcm",
    choices: ["2", "3", "6", "12"],
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "Liste les diviseurs communs.",
    explanation: "Les diviseurs communs de 12 et 18 sont 1, 2, 3 et 6. Le plus grand est 6.",
    tags: ["arithmetique", "pgcd", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_arith_pgcd_ppcm_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "arithmetique",
    microId: "arith_pgcd_ppcm",
    difficulty: 3,
    theme: "neutral",
    text: "On veut faire des sachets identiques avec 24 bonbons et 36 biscuits, sans reste. Quel est le plus grand nombre de sachets possible ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Cherche le plus grand diviseur commun de 24 et 36.",
    explanation: "Le plus grand diviseur commun de 24 et 36 est 12. On peut donc faire 12 sachets identiques.",
    tags: ["arithmetique", "pgcd", "probleme"],
  },

  {
    kind: "template",
    id: "3e_arith_pgcd_ppcm_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "arithmetique",
    microId: "arith_pgcd_ppcm",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche le plus grand diviseur commun.",
    tags: ["arithmetique", "pgcd", "template"],
    generate: () => {
      const d = randomChoice([3, 4, 5, 6, 8, 10, 12]);
      const a = d * randomInt(2, 5);
      const b = d * randomInt(6, 9);

      return {
        text: `Quel est le plus grand diviseur commun de ${a} et ${b} ?`,
        format: "short",
        expected: [String(d)],
        comparator: "number_equal",
        explanation: `${d} divise ${a} et ${b}. Dans cet exercice, c’est le plus grand diviseur commun.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_arith_pgcd_ppcm_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "arithmetique",
    microId: "arith_pgcd_ppcm",
    difficulty: 4,
    theme: "reunion",
    hint: "Le nombre de lots doit diviser les deux quantités.",
    tags: ["arithmetique", "pgcd", "reunion", "probleme", "template"],
    generate: () => {
      const d = randomChoice([6, 8, 10, 12]);
      const mangues = d * randomChoice([3, 4, 5]);
      const letchis = d * randomChoice([6, 7, 8]);

      return {
        text: `Au marché de Saint-Paul, on veut faire le plus grand nombre de paniers identiques avec ${mangues} mangues et ${letchis} letchis, sans reste. Combien de paniers peut-on faire ?`,
        format: "short",
        expected: [String(d)],
        comparator: "number_equal",
        explanation: `Le nombre de paniers doit diviser ${mangues} et ${letchis}. Le plus grand diviseur commun est ${d}.`,
      };
    },
  },

  /* =========================
     ARITH_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "3e_arith_defis_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "arithmetique",
    microId: "arith_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « 2 × 15 est une décomposition en facteurs premiers de 30. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Tous les facteurs doivent être premiers.",
    explanation: "Non. 15 n’est pas premier. La décomposition en facteurs premiers est 30 = 2 × 3 × 5.",
    tags: ["arithmetique", "defi", "erreur"],
  },

  {
    kind: "fixed",
    id: "3e_arith_defis_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "arithmetique",
    microId: "arith_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi un nombre pair supérieur à 2 n’est pas premier.",
    format: "open",
    expected: ["pair", "2", "divisible"],
    comparator: "contains_keyword",
    hint: "Un nombre pair est divisible par 2.",
    explanation: "Un nombre pair supérieur à 2 est divisible par 2 et par lui-même. Il a donc plus de deux diviseurs, donc il n’est pas premier.",
    tags: ["arithmetique", "defi", "open"],
  },

  {
    kind: "template",
    id: "3e_arith_defis_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "arithmetique",
    microId: "arith_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Il faut que chaque groupe soit identique et qu’il ne reste rien.",
    tags: ["arithmetique", "defi", "pgcd", "template"],
    generate: () => {
      const d = randomChoice([4, 6, 8, 9, 12]);
      const a = d * randomChoice([5, 6, 7]);
      const b = d * randomChoice([8, 9, 10]);

      return {
        text: `On veut répartir ${a} cartes rouges et ${b} cartes bleues en paquets identiques, sans reste. Quel est le plus grand nombre de paquets possibles ?`,
        format: "short",
        expected: [String(d)],
        comparator: "number_equal",
        explanation: `On cherche le plus grand diviseur commun de ${a} et ${b}. Il vaut ${d}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_arith_defis_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "arithmetique",
    microId: "arith_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Un nombre premier n’a que deux diviseurs.",
    tags: ["arithmetique", "defi", "nombre_premier", "template"],
    generate: () => {
      const n = randomChoice([31, 37, 41, 43, 47]);
      return {
        text: `Explique pourquoi ${n} est un nombre premier.`,
        format: "open",
        expected: [String(n), "1"],
        comparator: "contains_keyword",
        explanation: `${n} n’est divisible par aucun entier autre que 1 et lui-même. Il est donc premier.`,
      };
    },
  },
];