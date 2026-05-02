// lib/tutor-v4/question-banks/maths/4e/proportionnalite.bank.ts

/**
 * =========================================================
 * PROPORTIONNALITE.BANK.TS
 * =========================================================
 *
 * Banque de questions Tutor V4 - Mathématiques 4e
 * Notion : Proportionnalité
 *
 * Progression :
 * - reconnaître une situation proportionnelle ;
 * - utiliser un tableau ;
 * - calculer une quatrième proportionnelle ;
 * - utiliser un coefficient ou le passage à l’unité ;
 * - calculer/interpréter un pourcentage ;
 * - utiliser un coefficient multiplicateur ;
 * - interpréter une évolution ;
 * - résoudre des problèmes contextualisés ;
 * - éviter les pièges classiques.
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

function formatNumber(n: number) {
  return Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100);
}

function makeChoices(correct: string, wrongs: string[]) {
  return shuffle([correct, ...wrongs]).slice(0, 4);
}

export const proportionnaliteBank: TutorBankItemV4[] = [
  // =========================
  // PROP_RECONNAITRE
  // =========================
  {
    kind: "fixed",
    id: "prop_reconnaitre_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle situation est proportionnelle ?",
    format: "qcm",
    choices: [
      "2 kg coûtent 6 € et 4 kg coûtent 12 €",
      "2 kg coûtent 6 € et 4 kg coûtent 13 €",
      "1 heure donne 10 km et 2 heures donnent 25 km",
      "3 stylos coûtent 4 € et 6 stylos coûtent 9 €",
    ],
    expected: ["2 kg coûtent 6 € et 4 kg coûtent 12 €"],
    comparator: "mcq_exact",
    hint: "Le coefficient doit rester le même.",
    explanation: "6 ÷ 2 = 3 et 12 ÷ 4 = 3. Le coefficient est le même : c’est proportionnel.",
    tags: ["proportionnalite", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_reconnaitre_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Une situation proportionnelle est une situation où...",
    format: "qcm",
    choices: [
      "on ajoute toujours le même nombre",
      "on multiplie toujours par le même coefficient",
      "les nombres augmentent toujours",
      "les nombres sont toujours entiers",
    ],
    expected: ["on multiplie toujours par le même coefficient"],
    comparator: "mcq_exact",
    hint: "La proportionnalité repose sur une multiplication.",
    explanation: "Dans une situation proportionnelle, on passe d’une grandeur à l’autre par un même coefficient multiplicatif.",
    tags: ["proportionnalite", "definition"],
  },
  {
    kind: "template",
    id: "prop_reconnaitre_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare les deux coefficients.",
    tags: ["proportionnalite", "reconnaitre", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const k = randomInt(2, 6);
      const b = a * 2;
      const yes = randomChoice([true, false]);
      const y1 = a * k;
      const y2 = yes ? b * k : b * k + randomChoice([1, 2, 3]);

      return {
        text: `${a} objets coûtent ${y1} €. ${b} objets coûtent ${y2} €. Est-ce une situation proportionnelle ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [yes ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: yes
          ? `${y1} ÷ ${a} = ${k} et ${y2} ÷ ${b} = ${k}. Le coefficient est le même.`
          : `${y1} ÷ ${a} = ${k}, mais ${y2} ÷ ${b} n’est pas égal à ${k}. Ce n’est pas proportionnel.`,
      };
    },
  },
  {
    kind: "template",
    id: "prop_reconnaitre_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "reunion",
    hint: "Vérifie si le prix par kg reste le même.",
    tags: ["proportionnalite", "reunion", "prix", "template"],
    generate: () => {
      const kg1 = randomInt(2, 4);
      const pricePerKg = randomInt(3, 8);
      const kg2 = kg1 * 2;
      const yes = randomChoice([true, false]);
      const p1 = kg1 * pricePerKg;
      const p2 = yes ? kg2 * pricePerKg : kg2 * pricePerKg + randomChoice([2, 3, 5]);

      return {
        text: `Au marché de Saint-Pierre, ${kg1} kg de mangues coûtent ${p1} € et ${kg2} kg coûtent ${p2} €. Est-ce proportionnel ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [yes ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: yes
          ? `Le prix au kg est le même : ${p1} ÷ ${kg1} = ${pricePerKg} et ${p2} ÷ ${kg2} = ${pricePerKg}.`
          : `Le prix au kg n’est pas le même. Ce n’est donc pas une situation proportionnelle.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "prop_reconnaitre_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi la situation suivante est proportionnelle : 3 kg coûtent 12 € et 5 kg coûtent 20 €.",
    format: "open",
    expected: ["12", "3", "20", "5", "coefficient"],
    comparator: "contains_keyword",
    hint: "Calcule le prix pour 1 kg ou compare les coefficients.",
    explanation: "12 ÷ 3 = 4 et 20 ÷ 5 = 4. Le prix au kg est constant : la situation est proportionnelle.",
    tags: ["proportionnalite", "open", "justification"],
  },

  // =========================
  // PROP_TABLE
  // =========================
  {
    kind: "fixed",
    id: "prop_table_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_table",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un tableau de proportionnalité, si 2 → 10, alors 4 → ?",
    format: "qcm",
    choices: ["12", "14", "20", "40"],
    expected: ["20"],
    comparator: "mcq_exact",
    hint: "4 est le double de 2.",
    explanation: "Comme 4 est le double de 2, l’image est aussi doublée : 10 × 2 = 20.",
    tags: ["proportionnalite", "tableau", "qcm"],
  },
  {
    kind: "template",
    id: "prop_table_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Utilise le coefficient multiplicatif.",
    tags: ["proportionnalite", "tableau", "template"],
    generate: () => {
      const x1 = randomInt(2, 6);
      const k = randomInt(2, 8);
      const x2 = randomInt(7, 15);
      const y1 = x1 * k;
      const y2 = x2 * k;

      return {
        text: `Compléter le tableau de proportionnalité : ${x1} → ${y1} ; ${x2} → ?`,
        format: "short",
        expected: [String(y2)],
        comparator: "number_equal",
        explanation: `Le coefficient est ${y1} ÷ ${x1} = ${k}. Donc ${x2} → ${x2} × ${k} = ${y2}.`,
      };
    },
  },
  {
    kind: "template",
    id: "prop_table_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le passage d’une colonne à l’autre.",
    tags: ["proportionnalite", "tableau", "template"],
    generate: () => {
      const x1 = randomInt(2, 8);
      const y1 = x1 * randomInt(2, 6);
      const factor = randomInt(2, 4);
      const x2 = x1 * factor;
      const y2 = y1 * factor;

      return {
        text: `Dans un tableau de proportionnalité, ${x1} → ${y1}. Comme ${x2} = ${factor} × ${x1}, combien vaut l’image de ${x2} ?`,
        format: "short",
        expected: [String(y2)],
        comparator: "number_equal",
        explanation: `On multiplie aussi ${y1} par ${factor}. Donc ${y1} × ${factor} = ${y2}.`,
      };
    },
  },
  {
    kind: "template",
    id: "prop_table_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_table",
    difficulty: 3,
    theme: "neutral",
    hint: "Passe par l’unité ou calcule le coefficient.",
    tags: ["proportionnalite", "tableau", "template"],
    generate: () => {
      const k = randomInt(2, 9);
      const x1 = randomInt(3, 8);
      const x2 = randomInt(9, 18);
      const y1 = x1 * k;
      const y2 = x2 * k;

      return {
        text: `Compléter : ${x1} unités coûtent ${y1} €. Combien coûtent ${x2} unités ?`,
        format: "short",
        expected: [String(y2)],
        comparator: "number_equal",
        explanation: `Une unité coûte ${k} €. Donc ${x2} unités coûtent ${x2} × ${k} = ${y2} €.`,
      };
    },
  },

  // =========================
  // PROP_COEFF
  // =========================
  {
    kind: "fixed",
    id: "prop_coeff_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_coeff",
    difficulty: 1,
    theme: "neutral",
    text: "Si 4 → 20, quel est le coefficient de proportionnalité ?",
    format: "qcm",
    choices: ["4", "5", "16", "24"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Coefficient = 20 ÷ 4.",
    explanation: "20 ÷ 4 = 5. Le coefficient de proportionnalité est 5.",
    tags: ["proportionnalite", "coefficient"],
  },
  {
    kind: "template",
    id: "prop_coeff_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    hint: "Coefficient = deuxième grandeur ÷ première grandeur.",
    tags: ["proportionnalite", "coefficient", "template"],
    generate: () => {
      const x = randomInt(2, 9);
      const k = randomInt(2, 9);
      const y = x * k;

      return {
        text: `On a ${x} → ${y}. Quel est le coefficient de proportionnalité ?`,
        format: "short",
        expected: [String(k)],
        comparator: "number_equal",
        explanation: `${y} ÷ ${x} = ${k}.`,
      };
    },
  },
  {
    kind: "template",
    id: "prop_coeff_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "reunion",
    hint: "Calcule le prix pour 1 kg.",
    tags: ["proportionnalite", "coefficient", "reunion", "template"],
    generate: () => {
      const kg = randomInt(2, 6);
      const pricePerKg = randomInt(3, 9);
      const price = kg * pricePerKg;

      return {
        text: `Au marché, ${kg} kg de letchis coûtent ${price} €. Quel est le prix d’un kg ?`,
        format: "short",
        expected: [String(pricePerKg)],
        comparator: "number_equal",
        explanation: `${price} ÷ ${kg} = ${pricePerKg}. Un kg coûte ${pricePerKg} €.`,
      };
    },
  },
  {
    kind: "template",
    id: "prop_coeff_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_coeff",
    difficulty: 3,
    theme: "neutral",
    hint: "Le coefficient permet de passer de la première ligne à la deuxième.",
    tags: ["proportionnalite", "coefficient", "template"],
    generate: () => {
      const distance = randomInt(3, 12);
      const speed = randomInt(4, 10);
      const time = distance * speed;

      return {
        text: `Un marcheur parcourt ${distance} km en ${time} dizaines de minutes. Quel coefficient permet de passer des km aux dizaines de minutes ?`,
        format: "short",
        expected: [String(speed)],
        comparator: "number_equal",
        explanation: `${time} ÷ ${distance} = ${speed}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "prop_coeff_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_coeff",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment trouver le coefficient de proportionnalité quand 6 → 42.",
    format: "open",
    expected: ["42", "6", "divise", "7"],
    comparator: "contains_keyword",
    hint: "On divise l’image par le nombre de départ.",
    explanation: "On calcule 42 ÷ 6 = 7. Le coefficient est donc 7.",
    tags: ["proportionnalite", "coefficient", "open"],
  },

  // =========================
  // PROP_QUATRIEME
  // =========================
  {
    kind: "fixed",
    id: "prop_quatrieme_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 2,
    theme: "neutral",
    text: "Si 3 kg coûtent 12 €, combien coûtent 5 kg ?",
    format: "qcm",
    choices: ["15 €", "18 €", "20 €", "24 €"],
    expected: ["20 €"],
    comparator: "mcq_exact",
    hint: "Trouve d’abord le prix de 1 kg.",
    explanation: "3 kg coûtent 12 €, donc 1 kg coûte 4 €. Alors 5 kg coûtent 5 × 4 = 20 €.",
    tags: ["proportionnalite", "quatrieme_proportionnelle"],
  },
  {
    kind: "template",
    id: "prop_quatrieme_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 2,
    theme: "neutral",
    hint: "Passe par le prix d’une unité.",
    tags: ["proportionnalite", "quatrieme_proportionnelle", "template"],
    generate: () => {
      const unit = randomInt(2, 8);
      const q1 = randomInt(2, 6);
      const q2 = randomInt(7, 15);
      const p1 = q1 * unit;
      const p2 = q2 * unit;

      return {
        text: `${q1} objets coûtent ${p1} €. Combien coûtent ${q2} objets ?`,
        format: "short",
        expected: [String(p2)],
        comparator: "number_equal",
        explanation: `Un objet coûte ${p1} ÷ ${q1} = ${unit} €. Donc ${q2} objets coûtent ${q2} × ${unit} = ${p2} €.`,
      };
    },
  },
  {
    kind: "template",
    id: "prop_quatrieme_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise le coefficient de proportionnalité.",
    tags: ["proportionnalite", "quatrieme_proportionnelle", "template"],
    generate: () => {
      const a = randomChoice([2, 3, 4, 5]);
      const b = randomInt(5, 12);
      const c = a * randomInt(2, 5);
      const result = (b * c) / a;

      return {
        text: `Dans un tableau proportionnel : ${a} → ${b} et ${c} → ?. Quelle est la valeur manquante ?`,
        format: "short",
        expected: [formatNumber(result)],
        comparator: "number_equal",
        explanation: `On calcule ${b} × ${c} ÷ ${a} = ${formatNumber(result)}.`,
      };
    },
  },
  {
    kind: "template",
    id: "prop_quatrieme_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 3,
    theme: "reunion",
    hint: "Même prix au kg.",
    tags: ["proportionnalite", "reunion", "quatrieme_proportionnelle", "template"],
    generate: () => {
      const kg1 = randomInt(2, 5);
      const pricePerKg = randomInt(4, 9);
      const kg2 = randomInt(6, 12);
      const p1 = kg1 * pricePerKg;
      const p2 = kg2 * pricePerKg;

      return {
        text: `À Saint-Leu, ${kg1} kg d’ananas coûtent ${p1} €. Combien coûtent ${kg2} kg ?`,
        format: "short",
        expected: [String(p2)],
        comparator: "number_equal",
        explanation: `Le prix au kg est ${p1} ÷ ${kg1} = ${pricePerKg} €. Donc ${kg2} kg coûtent ${p2} €.`,
      };
    },
  },

  // =========================
  // PROP_POURCENTAGE
  // =========================
  {
    kind: "fixed",
    id: "prop_pourcentage_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_pourcentage",
    difficulty: 1,
    theme: "neutral",
    text: "25 % d’une quantité correspond à...",
    format: "qcm",
    choices: ["1/2", "1/4", "1/5", "3/4"],
    expected: ["1/4"],
    comparator: "mcq_exact",
    hint: "25 % = 25 sur 100.",
    explanation: "25 % = 25/100 = 1/4.",
    tags: ["proportionnalite", "pourcentage"],
  },
  {
    kind: "fixed",
    id: "prop_pourcentage_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_pourcentage",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer 10 % de 80.",
    format: "qcm",
    choices: ["4", "8", "10", "18"],
    expected: ["8"],
    comparator: "mcq_exact",
    hint: "10 % signifie diviser par 10.",
    explanation: "10 % de 80 = 80 ÷ 10 = 8.",
    tags: ["proportionnalite", "pourcentage", "qcm"],
  },
  {
    kind: "template",
    id: "prop_pourcentage_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_pourcentage",
    difficulty: 2,
    theme: "neutral",
    hint: "p % de N = N × p / 100.",
    tags: ["proportionnalite", "pourcentage", "template"],
    generate: () => {
      const p = randomChoice([10, 20, 25, 50, 75]);
      const n = randomChoice([40, 60, 80, 100, 120, 200]);
      const result = (n * p) / 100;

      return {
        text: `Calculer ${p} % de ${n}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: `${p} % de ${n} = ${n} × ${p} ÷ 100 = ${result}.`,
      };
    },
  },
  {
    kind: "template",
    id: "prop_pourcentage_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_pourcentage",
    difficulty: 3,
    theme: "neutral",
    hint: "Pourcentage = partie ÷ total × 100.",
    tags: ["proportionnalite", "pourcentage", "template"],
    generate: () => {
      const total = randomChoice([50, 80, 100, 120, 200]);
      const p = randomChoice([10, 20, 25, 40, 50]);
      const part = (total * p) / 100;

      return {
        text: `Dans une classe de ${total} élèves, ${part} élèves pratiquent un sport. Quel pourcentage cela représente-t-il ?`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation: `${part} ÷ ${total} × 100 = ${p} %.`,
      };
    },
  },
  {
    kind: "template",
    id: "prop_pourcentage_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_pourcentage",
    difficulty: 3,
    theme: "reunion",
    hint: "Calcule la partie correspondant au pourcentage.",
    tags: ["proportionnalite", "pourcentage", "reunion", "template"],
    generate: () => {
      const total = randomChoice([100, 200, 300, 400]);
      const p = randomChoice([15, 20, 25, 30]);
      const result = (total * p) / 100;

      return {
        text: `Dans une opération de nettoyage à La Réunion, ${p} % des ${total} déchets ramassés sont des bouteilles. Combien cela fait-il de bouteilles ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: `${p} % de ${total} = ${total} × ${p} ÷ 100 = ${result}.`,
      };
    },
  },
  {
    kind: "template",
    id: "prop_pourcentage_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_pourcentage",
    difficulty: 3,
    theme: "neutral",
    hint: "Transforme le pourcentage en fraction sur 100.",
    tags: ["proportionnalite", "pourcentage", "qcm", "template"],
    generate: () => {
      const p = randomChoice([5, 10, 20, 25, 50, 75]);
      const correct = `${p}/100`;

      return {
        text: `${p} % correspond à quelle fraction ?`,
        format: "qcm",
        choices: makeChoices(correct, [`100/${p}`, `${p}/10`, `${100 - p}/100`]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: `${p} % signifie ${p} sur 100, donc ${correct}.`,
      };
    },
  },

  // =========================
  // PROP_COEFF_MULT
  // =========================
  {
    kind: "fixed",
    id: "prop_coeff_mult_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_coeff_mult",
    difficulty: 2,
    theme: "neutral",
    text: "Une augmentation de 20 % correspond à multiplier par...",
    format: "qcm",
    choices: ["0,2", "1,2", "20", "2"],
    expected: ["1,2"],
    comparator: "mcq_exact",
    hint: "On garde 100 % puis on ajoute 20 %.",
    explanation: "Augmenter de 20 %, c’est passer à 120 %, donc multiplier par 1,2.",
    tags: ["proportionnalite", "coefficient_multiplicateur"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_mult_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_coeff_mult",
    difficulty: 2,
    theme: "neutral",
    text: "Une réduction de 30 % correspond à multiplier par...",
    format: "qcm",
    choices: ["0,3", "0,7", "1,3", "30"],
    expected: ["0,7"],
    comparator: "mcq_exact",
    hint: "Après une baisse de 30 %, il reste 70 %.",
    explanation: "Réduire de 30 %, c’est garder 70 %, donc multiplier par 0,7.",
    tags: ["proportionnalite", "coefficient_multiplicateur", "reduction"],
  },
  {
    kind: "template",
    id: "prop_coeff_mult_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_coeff_mult",
    difficulty: 3,
    theme: "neutral",
    hint: "Augmenter de p %, c’est multiplier par 1 + p/100.",
    tags: ["proportionnalite", "coefficient_multiplicateur", "augmentation", "template"],
    generate: () => {
      const p = randomChoice([5, 10, 15, 20, 25, 30, 40, 50]);
      const coeff = 1 + p / 100;

      return {
        text: `Quel est le coefficient multiplicateur correspondant à une augmentation de ${p} % ?`,
        format: "short",
        expected: [String(coeff)],
        comparator: "number_equal",
        explanation: `1 + ${p}/100 = ${coeff}.`,
      };
    },
  },
  {
    kind: "template",
    id: "prop_coeff_mult_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_coeff_mult",
    difficulty: 3,
    theme: "neutral",
    hint: "Diminuer de p %, c’est multiplier par 1 - p/100.",
    tags: ["proportionnalite", "coefficient_multiplicateur", "reduction", "template"],
    generate: () => {
      const p = randomChoice([5, 10, 20, 25, 30, 40, 50]);
      const coeff = 1 - p / 100;

      return {
        text: `Quel est le coefficient multiplicateur correspondant à une diminution de ${p} % ?`,
        format: "short",
        expected: [String(coeff)],
        comparator: "number_equal",
        explanation: `1 - ${p}/100 = ${coeff}.`,
      };
    },
  },
  {
    kind: "template",
    id: "prop_coeff_mult_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_coeff_mult",
    difficulty: 4,
    theme: "neutral",
    hint: "Lis le coefficient : 1,15 signifie 115 %.",
    tags: ["proportionnalite", "coefficient_multiplicateur", "template"],
    generate: () => {
      const p = randomChoice([5, 10, 15, 20, 25, 30]);
      const coeff = 1 + p / 100;

      return {
        text: `Multiplier par ${coeff} correspond à quelle évolution en pourcentage ?`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation: `${coeff} = 1 + ${p}/100. Cela correspond à une augmentation de ${p} %.`,
      };
    },
  },

  // =========================
  // PROP_EVOLUTION
  // =========================
  {
    kind: "fixed",
    id: "prop_evolution_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_evolution",
    difficulty: 2,
    theme: "neutral",
    text: "Un prix de 100 € augmente de 15 %. Quel est le nouveau prix ?",
    format: "qcm",
    choices: ["85 €", "115 €", "150 €", "15 €"],
    expected: ["115 €"],
    comparator: "mcq_exact",
    hint: "100 € + 15 % de 100 €.",
    explanation: "15 % de 100 € vaut 15 €. Le nouveau prix est 100 + 15 = 115 €.",
    tags: ["proportionnalite", "evolution", "augmentation"],
  },
  {
    kind: "fixed",
    id: "prop_evolution_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_evolution",
    difficulty: 2,
    theme: "neutral",
    text: "Un prix de 80 € diminue de 25 %. Quel est le nouveau prix ?",
    format: "qcm",
    choices: ["20 €", "55 €", "60 €", "100 €"],
    expected: ["60 €"],
    comparator: "mcq_exact",
    hint: "25 % de 80 vaut 20.",
    explanation: "25 % de 80 € vaut 20 €. Le nouveau prix est 80 - 20 = 60 €.",
    tags: ["proportionnalite", "evolution", "reduction"],
  },
  {
    kind: "template",
    id: "prop_evolution_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_evolution",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise le coefficient multiplicateur.",
    tags: ["proportionnalite", "evolution", "augmentation", "template"],
    generate: () => {
      const initial = randomChoice([50, 80, 100, 120, 200]);
      const p = randomChoice([10, 20, 25, 30, 50]);
      const result = initial * (1 + p / 100);

      return {
        text: `Un prix de ${initial} € augmente de ${p} %. Quel est le nouveau prix ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: `Coefficient multiplicateur : ${1 + p / 100}. Nouveau prix : ${initial} × ${1 + p / 100} = ${result} €.`,
      };
    },
  },
  {
    kind: "template",
    id: "prop_evolution_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_evolution",
    difficulty: 3,
    theme: "neutral",
    hint: "Après une baisse, on multiplie par 1 - p/100.",
    tags: ["proportionnalite", "evolution", "reduction", "template"],
    generate: () => {
      const initial = randomChoice([60, 80, 100, 120, 200]);
      const p = randomChoice([10, 20, 25, 30, 50]);
      const result = initial * (1 - p / 100);

      return {
        text: `Un prix de ${initial} € diminue de ${p} %. Quel est le nouveau prix ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: `Coefficient multiplicateur : ${1 - p / 100}. Nouveau prix : ${initial} × ${1 - p / 100} = ${result} €.`,
      };
    },
  },
  {
    kind: "template",
    id: "prop_evolution_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_evolution",
    difficulty: 4,
    theme: "reunion",
    hint: "Calcule d’abord la hausse.",
    tags: ["proportionnalite", "evolution", "reunion", "template"],
    generate: () => {
      const initial = randomChoice([100, 150, 200, 250]);
      const p = randomChoice([10, 20, 30]);
      const result = initial * (1 + p / 100);

      return {
        text: `À La Réunion, une facture d’électricité de ${initial} € augmente de ${p} %. Quel est le nouveau montant ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: `${initial} × ${1 + p / 100} = ${result} €.`,
      };
    },
  },
  {
    kind: "template",
    id: "prop_evolution_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_evolution",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare le nouveau prix à l’ancien.",
    tags: ["proportionnalite", "evolution", "template"],
    generate: () => {
      const oldPrice = randomChoice([50, 80, 100, 120, 200]);
      const p = randomChoice([10, 20, 25, 50]);
      const newPrice = oldPrice * (1 + p / 100);

      return {
        text: `Un prix passe de ${oldPrice} € à ${newPrice} €. Quel est le pourcentage d’augmentation ?`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation: `L’augmentation est ${newPrice - oldPrice} €. Le taux vaut (${newPrice - oldPrice} ÷ ${oldPrice}) × 100 = ${p} %.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "prop_evolution_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_evolution",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi une baisse de 20 % correspond à multiplier par 0,8.",
    format: "open",
    expected: ["100", "20", "80", "0,8"],
    comparator: "contains_keyword",
    hint: "Après une baisse de 20 %, il reste 80 %.",
    explanation: "Une baisse de 20 % signifie qu’il reste 80 % de la valeur initiale. Or 80 % = 80/100 = 0,8.",
    tags: ["proportionnalite", "evolution", "open"],
  },

  // =========================
  // PROP_PROBLEME
  // =========================
  {
    kind: "template",
    id: "prop_probleme_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "reunion",
    hint: "Cherche le prix pour 1 kg.",
    tags: ["proportionnalite", "probleme", "reunion", "template"],
    generate: () => {
      const kg1 = randomInt(2, 5);
      const unit = randomInt(3, 8);
      const kg2 = randomInt(6, 12);
      const p1 = kg1 * unit;
      const p2 = kg2 * unit;

      return {
        text: `Au marché de Saint-Paul, ${kg1} kg de fruits coûtent ${p1} €. Combien coûtent ${kg2} kg ?`,
        format: "short",
        expected: [String(p2)],
        comparator: "number_equal",
        explanation: `Le prix au kg est ${p1} ÷ ${kg1} = ${unit} €. Donc ${kg2} kg coûtent ${p2} €.`,
      };
    },
  },
  {
    kind: "template",
    id: "prop_probleme_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_probleme",
    difficulty: 4,
    theme: "sport",
    hint: "Si la vitesse est constante, distance et durée sont proportionnelles.",
    tags: ["proportionnalite", "probleme", "sport", "template"],
    generate: () => {
      const speed = randomInt(6, 12);
      const time = randomInt(2, 5);
      const distance = speed * time;

      return {
        text: `Un cycliste roule à vitesse constante et parcourt ${speed} km en 1 h. Quelle distance parcourt-il en ${time} h ?`,
        format: "short",
        expected: [String(distance)],
        comparator: "number_equal",
        explanation: `À vitesse constante, la distance est proportionnelle au temps : ${speed} × ${time} = ${distance} km.`,
      };
    },
  },
  {
    kind: "template",
    id: "prop_probleme_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_probleme",
    difficulty: 4,
    theme: "cuisine",
    hint: "Les quantités d’une recette sont proportionnelles au nombre de personnes.",
    tags: ["proportionnalite", "probleme", "cuisine", "template"],
    generate: () => {
      const people1 = randomChoice([2, 3, 4]);
      const gramsPerPerson = randomChoice([50, 75, 100, 125]);
      const people2 = randomChoice([6, 8, 10, 12]);
      const q1 = people1 * gramsPerPerson;
      const q2 = people2 * gramsPerPerson;

      return {
        text: `Une recette prévoit ${q1} g de riz pour ${people1} personnes. Combien faut-il de riz pour ${people2} personnes ?`,
        format: "short",
        expected: [String(q2)],
        comparator: "number_equal",
        explanation: `Par personne, il faut ${q1} ÷ ${people1} = ${gramsPerPerson} g. Donc pour ${people2} personnes : ${q2} g.`,
      };
    },
  },
  {
    kind: "template",
    id: "prop_probleme_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_probleme",
    difficulty: 4,
    theme: "reunion",
    hint: "Utilise le pourcentage.",
    tags: ["proportionnalite", "probleme", "pourcentage", "reunion", "template"],
    generate: () => {
      const total = randomChoice([100, 200, 300, 500]);
      const p = randomChoice([10, 20, 25, 30, 40]);
      const result = (total * p) / 100;

      return {
        text: `Dans une réserve d’eau de ${total} L, on utilise ${p} % pour arroser un jardin. Combien de litres sont utilisés ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: `${p} % de ${total} L = ${result} L.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "prop_probleme_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment résoudre : 4 cahiers coûtent 12 €. Combien coûtent 7 cahiers ?",
    format: "open",
    expected: ["12", "4", "3", "7", "21"],
    comparator: "contains_keyword",
    hint: "Passe par le prix d’un cahier.",
    explanation: "Un cahier coûte 12 ÷ 4 = 3 €. Donc 7 cahiers coûtent 7 × 3 = 21 €.",
    tags: ["proportionnalite", "probleme", "open"],
  },
  {
    kind: "fixed",
    id: "prop_probleme_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_probleme",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi ajouter toujours le même nombre ne suffit pas à prouver une proportionnalité.",
    format: "open",
    expected: ["coefficient", "multiplier", "ajouter"],
    comparator: "contains_keyword",
    hint: "La proportionnalité repose sur une multiplication, pas une addition.",
    explanation: "Une situation proportionnelle utilise un coefficient multiplicatif constant. Ajouter toujours le même nombre décrit une relation additive, pas proportionnelle.",
    tags: ["proportionnalite", "probleme", "open", "piege"],
  },

  // =========================
  // PROP_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "prop_defis_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « Si 2 → 6, alors 5 → 9 car j’ajoute 3. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "On ne doit pas ajouter, on doit multiplier par un même coefficient.",
    explanation: "Non. Si 2 → 6, le coefficient est 3. Donc 5 → 15, pas 9.",
    tags: ["proportionnalite", "defi", "erreur"],
  },
  {
    kind: "fixed",
    id: "prop_defis_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Un prix augmente de 20 %, puis baisse de 20 %. Revient-il au prix initial ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La baisse de 20 % ne s’applique pas au prix initial, mais au prix augmenté.",
    explanation: "Non. Par exemple, 100 € augmente de 20 % : 120 €. Puis 120 € baisse de 20 % : 96 €.",
    tags: ["proportionnalite", "defi", "evolution", "piege"],
  },
  {
    kind: "template",
    id: "prop_defis_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Teste les coefficients.",
    tags: ["proportionnalite", "defi", "template"],
    generate: () => {
      const x1 = randomInt(2, 5);
      const k = randomInt(2, 6);
      const x2 = randomInt(6, 12);
      const y1 = x1 * k;
      const wrong = y1 + (x2 - x1);

      return {
        text: `Un élève affirme : ${x1} → ${y1}, donc ${x2} → ${wrong} car il ajoute ${x2 - x1}. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: `Non. Le coefficient est ${k}, donc ${x2} devrait donner ${x2 * k}.`,
      };
    },
  },
  {
    kind: "template",
    id: "prop_defis_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Une évolution successive se traite avec des coefficients multiplicateurs.",
    tags: ["proportionnalite", "defi", "evolution", "template"],
    generate: () => {
      const initial = randomChoice([100, 200, 300]);
      const up = randomChoice([10, 20, 25]);
      const down = randomChoice([10, 20, 25]);
      const result = initial * (1 + up / 100) * (1 - down / 100);

      return {
        text: `Un prix de ${initial} € augmente de ${up} %, puis baisse de ${down} %. Quel est le prix final ?`,
        format: "short",
        expected: [formatNumber(result)],
        comparator: "number_equal",
        explanation: `Prix final = ${initial} × ${1 + up / 100} × ${1 - down / 100} = ${formatNumber(result)} €.`,
      };
    },
  },
  {
    kind: "template",
    id: "prop_defis_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_defis",
    difficulty: 5,
    theme: "reunion",
    hint: "Compare les prix au kg.",
    tags: ["proportionnalite", "defi", "reunion", "comparaison", "template"],
    generate: () => {
      const kgA = randomInt(2, 5);
      const unitA = randomInt(4, 8);
      const kgB = randomInt(2, 5);
      const unitB = unitA + randomChoice([-1, 1, 2]);
      const priceA = kgA * unitA;
      const priceB = kgB * unitB;

      const correct = unitA < unitB ? "offre A" : "offre B";

      return {
        text: `Au marché, offre A : ${kgA} kg pour ${priceA} €. Offre B : ${kgB} kg pour ${priceB} €. Quelle offre est la moins chère au kg ?`,
        format: "qcm",
        choices: ["offre A", "offre B"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: `Offre A : ${priceA} ÷ ${kgA} = ${unitA} €/kg. Offre B : ${priceB} ÷ ${kgB} = ${unitB} €/kg.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "prop_defis_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Explique l’erreur : « augmenter de 30 %, c’est multiplier par 0,3 ».",
    format: "open",
    expected: ["1,3", "100", "30"],
    comparator: "contains_keyword",
    hint: "Quand on augmente, on garde 100 % et on ajoute 30 %.",
    explanation: "Augmenter de 30 %, c’est passer à 130 % de la valeur initiale, donc multiplier par 1,3.",
    tags: ["proportionnalite", "defi", "open", "erreur"],
  },
  {
    kind: "fixed",
    id: "prop_defis_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi une réduction de 25 % ne correspond pas à multiplier par 25.",
    format: "open",
    expected: ["75", "0,75", "reste"],
    comparator: "contains_keyword",
    hint: "Après une baisse de 25 %, il reste 75 %.",
    explanation: "Une réduction de 25 % signifie qu’il reste 75 % de la valeur initiale. On multiplie donc par 0,75, pas par 25.",
    tags: ["proportionnalite", "defi", "open", "erreur"],
  },
];