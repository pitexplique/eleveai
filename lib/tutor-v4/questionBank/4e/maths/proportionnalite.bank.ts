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

import type {
  TutorBankItemV4,
  TableauProportionnaliteCanvasData,
} from "@/lib/tutor-v4/types";

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

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  // ⚠️ 04/08/2026 — la bonne réponse était jetée dans le même chapeau que les
  // pièges : à cinq pièges écrits, le mélange pouvait la laisser au fond et
  // le découpage à quatre l'emportait. L'élève voyait alors quatre pièges et
  // rien d'autre. On la met de côté, on tire trois distracteurs, on mélange.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}
function tableauProportionnaliteCanvas(params: {
  rowLabels: string[];
  values: string[][];
  missing: Array<{ row: number; col: number }>;
  colLabels?: string[];
  highlightedCells?: Array<{ row: number; col: number }>;
}): TableauProportionnaliteCanvasData {
  return {
    kind: "tableau_proportionnalite",
    rows: params.values.length,
    cols: params.values[0]?.length ?? 0,
    rowLabels: params.rowLabels,
    colLabels: params.colLabels,
    values: params.values,
    missing: params.missing,
    highlightedCells: params.highlightedCells,
    display: {
      showRowLabels: true,
      showColLabels: true,
      showMissing: true,
      showGrid: true,
    },
  };
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
    notionId: "prop_proportionnalite",
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
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("6 ÷ 2 = 3 et 12 ÷ 4 = 3. Le coefficient est le même : c’est proportionnel.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_reconnaitre_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
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
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("Dans une situation proportionnelle, on passe d’une grandeur à l’autre par un même coefficient multiplicatif.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "definition"],
  },
  {
    kind: "template",
    id: "prop_reconnaitre_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare les deux coefficients.",
    tags: ["prop_proportionnalite", "reconnaitre", "template"],
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
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          (yes
          ? `${y1} ÷ ${a} = ${k} et ${y2} ÷ ${b} = ${k}. Le coefficient est le même.`
          : `${y1} ÷ ${a} = ${k}, mais ${y2} ÷ ${b} n’est pas égal à ${k}. Ce n’est pas proportionnel.`) +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
      };
    },
  },
  {
    kind: "template",
    id: "prop_reconnaitre_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "reunion",
    hint: "Vérifie si le prix par kg reste le même.",
    tags: ["prop_proportionnalite", "reunion", "prix", "template"],
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
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          (yes
          ? `Le prix au kg est le même : ${p1} ÷ ${kg1} = ${pricePerKg} et ${p2} ÷ ${kg2} = ${pricePerKg}.`
          : `Le prix au kg n’est pas le même. Ce n’est donc pas une situation proportionnelle.`) +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
      };
    },
  },
  {
    kind: "fixed",
    id: "prop_reconnaitre_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi la situation suivante est proportionnelle : 3 kg coûtent 12 € et 5 kg coûtent 20 €.",
    format: "open",
    expected: ["12", "3", "20", "5", "coefficient"],
    comparator: "contains_keyword",
    hint: "Calcule le prix pour 1 kg ou compare les coefficients.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("12 ÷ 3 = 4 et 20 ÷ 5 = 4. Le prix au kg est constant : la situation est proportionnelle.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "open", "justification"],
  },

  // =========================
  // PROP_TABLE
  // =========================
  {
    kind: "fixed",
    id: "prop_table_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un tableau de proportionnalité, si 2 → 10, alors 4 → ?",
    format: "qcm",
    choices: ["12", "14", "20", "40"],
    expected: ["20"],
    comparator: "mcq_exact",
    hint: "4 est le double de 2.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("Comme 4 est le double de 2, l’image est aussi doublée : 10 × 2 = 20.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "tableau", "qcm"],
  },
  {
    kind: "template",
    id: "prop_table_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Utilise le coefficient multiplicatif.",
    tags: ["prop_proportionnalite", "tableau", "template", "canvas"],
    generate: () => {
      const x1 = randomInt(2, 6);
      const k = randomInt(2, 8);
      const x2 = randomInt(7, 15);
      const y1 = x1 * k;
      const y2 = x2 * k;

      return {
        text: "Compléter le tableau de proportionnalité.",
        format: "short",
        expected: [String(y2)],
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          (`Le coefficient est ${y1} ÷ ${x1} = ${k}. Donc ${x2} → ${x2} × ${k} = ${y2}.`) +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
        canvas: tableauProportionnaliteCanvas({
          rowLabels: ["Quantité", "Prix (€)"],
          colLabels: ["A", "B"],
          values: [
            [String(x1), String(x2)],
            [String(y1), ""],
          ],
          missing: [{ row: 1, col: 1 }],
          highlightedCells: [{ row: 1, col: 1 }],
        }),
      };
    },
  },
  {
    kind: "template",
    id: "prop_table_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le passage d’une colonne à l’autre.",
    tags: ["prop_proportionnalite", "tableau", "template"],
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
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          (`On multiplie aussi ${y1} par ${factor}. Donc ${y1} × ${factor} = ${y2}.`) +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
      };
    },
  },
  {
    kind: "template",
    id: "prop_table_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 3,
    theme: "neutral",
    hint: "Passe par l’unité ou calcule le coefficient.",
    tags: ["prop_proportionnalite", "tableau", "template"],
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
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          (`Une unité coûte ${k} €. Donc ${x2} unités coûtent ${x2} × ${k} = ${y2} €.`) +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
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
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 1,
    theme: "neutral",
    text: "Si 4 → 20, quel est le coefficient de proportionnalité ?",
    format: "qcm",
    choices: ["4", "5", "16", "24"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Coefficient = 20 ÷ 4.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("20 ÷ 4 = 5. Le coefficient de proportionnalité est 5.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "coefficient"],
  },
  {
    kind: "template",
    id: "prop_coeff_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    hint: "Coefficient = deuxième grandeur ÷ première grandeur.",
    tags: ["prop_proportionnalite", "coefficient", "template"],
    generate: () => {
      const x = randomInt(2, 9);
      const k = randomInt(2, 9);
      const y = x * k;

      return {
        text: `On a ${x} → ${y}. Quel est le coefficient de proportionnalité ?`,
        format: "short",
        expected: [String(k)],
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          (`${y} ÷ ${x} = ${k}.`) +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
      };
    },
  },
  {
    kind: "template",
    id: "prop_coeff_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "reunion",
    hint: "Calcule le prix pour 1 kg.",
    tags: ["prop_proportionnalite", "coefficient", "reunion", "template"],
    generate: () => {
      const kg = randomInt(2, 6);
      const pricePerKg = randomInt(3, 9);
      const price = kg * pricePerKg;

      return {
        text: `Au marché, ${kg} kg de letchis coûtent ${price} €. Quel est le prix d’un kg ?`,
        format: "short",
        expected: [String(pricePerKg)],
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          (`${price} ÷ ${kg} = ${pricePerKg}. Un kg coûte ${pricePerKg} €.`) +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
      };
    },
  },
  {
    kind: "template",
    id: "prop_coeff_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 3,
    theme: "neutral",
    hint: "Le coefficient permet de passer de la première ligne à la deuxième.",
    tags: ["prop_proportionnalite", "coefficient", "template"],
    generate: () => {
      const distance = randomInt(3, 12);
      const speed = randomInt(4, 10);
      const time = distance * speed;

      return {
        text: `Un marcheur parcourt ${distance} km en ${time} dizaines de minutes. Quel coefficient permet de passer des km aux dizaines de minutes ?`,
        format: "short",
        expected: [String(speed)],
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          (`${time} ÷ ${distance} = ${speed}.`) +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
      };
    },
  },
  {
    kind: "fixed",
    id: "prop_coeff_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment trouver le coefficient de proportionnalité quand 6 → 42.",
    format: "open",
    expected: ["42", "6", "divise", "7"],
    comparator: "contains_keyword",
    hint: "On divise l’image par le nombre de départ.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("On calcule 42 ÷ 6 = 7. Le coefficient est donc 7.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "coefficient", "open"],
  },

  // =========================
  // PROP_QUATRIEME
  // =========================
  {
    kind: "fixed",
    id: "prop_quatrieme_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 2,
    theme: "neutral",
    text: "Si 3 kg coûtent 12 €, combien coûtent 5 kg ?",
    format: "qcm",
    choices: ["15 €", "18 €", "20 €", "24 €"],
    expected: ["20 €"],
    comparator: "mcq_exact",
    hint: "Trouve d’abord le prix de 1 kg.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("3 kg coûtent 12 €, donc 1 kg coûte 4 €. Alors 5 kg coûtent 5 × 4 = 20 €.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "quatrieme_proportionnelle"],
  },
  {
    kind: "template",
    id: "prop_quatrieme_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 2,
    theme: "neutral",
    hint: "Passe par le prix d’une unité.",
    tags: ["prop_proportionnalite", "quatrieme_proportionnelle", "template"],
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
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          (`Un objet coûte ${p1} ÷ ${q1} = ${unit} €. Donc ${q2} objets coûtent ${q2} × ${unit} = ${p2} €.`) +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
      };
    },
  },
  {
    kind: "template",
    id: "prop_quatrieme_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise le coefficient de proportionnalité.",
    tags: ["prop_proportionnalite", "quatrieme_proportionnelle", "template"],
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
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          (`On calcule ${b} × ${c} ÷ ${a} = ${formatNumber(result)}.`) +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
      };
    },
  },
  {
    kind: "template",
    id: "prop_quatrieme_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 3,
    theme: "reunion",
    hint: "Même prix au kg.",
    tags: ["prop_proportionnalite", "reunion", "quatrieme_proportionnelle", "template", "canvas"],
    generate: () => {
      const kg1 = randomInt(2, 5);
      const pricePerKg = randomInt(4, 9);
      const kg2 = randomInt(6, 12);
      const p1 = kg1 * pricePerKg;
      const p2 = kg2 * pricePerKg;

      return {
        text: "À Saint-Leu, complète le tableau de proportionnalité.",
        format: "short",
        expected: [String(p2)],
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          (`Le prix au kg est ${p1} ÷ ${kg1} = ${pricePerKg} €. Donc ${kg2} kg coûtent ${p2} €.`) +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
        canvas: tableauProportionnaliteCanvas({
          rowLabels: ["Masse (kg)", "Prix (€)"],
          colLabels: ["Situation 1", "Situation 2"],
          values: [
            [String(kg1), String(kg2)],
            [String(p1), ""],
          ],
          missing: [{ row: 1, col: 1 }],
          highlightedCells: [{ row: 1, col: 1 }],
        }),
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
    notionId: "prop_proportionnalite",
    microId: "prop_pourcentage",
    difficulty: 1,
    theme: "neutral",
    text: "25 % d’une quantité correspond à...",
    format: "qcm",
    choices: ["1/2", "1/4", "1/5", "3/4"],
    expected: ["1/4"],
    comparator: "mcq_exact",
    hint: "25 % = 25 sur 100.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("25 % = 25/100 = 1/4.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "pourcentage"],
  },
  {
    kind: "fixed",
    id: "prop_pourcentage_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_pourcentage",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer 10 % de 80.",
    format: "qcm",
    choices: ["4", "8", "10", "18"],
    expected: ["8"],
    comparator: "mcq_exact",
    hint: "10 % signifie diviser par 10.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("10 % de 80 = 80 ÷ 10 = 8.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "pourcentage", "qcm"],
  },
  {
    kind: "template",
    id: "prop_pourcentage_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_pourcentage",
    difficulty: 2,
    theme: "neutral",
    hint: "p % de N = N × p / 100.",
    tags: ["prop_proportionnalite", "pourcentage", "template"],
    generate: () => {
      const p = randomChoice([10, 20, 25, 50, 75]);
      const n = randomChoice([40, 60, 80, 100, 120, 200]);
      const result = (n * p) / 100;

      return {
        text: `Calculer ${p} % de ${n}.`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          (`${p} % de ${n} = ${n} × ${p} ÷ 100 = ${result}.`) +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
      };
    },
  },
  {
    kind: "template",
    id: "prop_pourcentage_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_pourcentage",
    difficulty: 3,
    theme: "neutral",
    hint: "Pourcentage = partie ÷ total × 100.",
    tags: ["prop_proportionnalite", "pourcentage", "template"],
    generate: () => {
      const total = randomChoice([50, 80, 100, 120, 200]);
      const p = randomChoice([10, 20, 25, 40, 50]);
      const part = (total * p) / 100;

      return {
        text: `Dans une classe de ${total} élèves, ${part} élèves pratiquent un sport. Quel pourcentage cela représente-t-il ?`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          (`${part} ÷ ${total} × 100 = ${p} %.`) +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
      };
    },
  },
  {
    kind: "template",
    id: "prop_pourcentage_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_pourcentage",
    difficulty: 3,
    theme: "reunion",
    hint: "Calcule la partie correspondant au pourcentage.",
    tags: ["prop_proportionnalite", "pourcentage", "reunion", "template"],
    generate: () => {
      const total = randomChoice([100, 200, 300, 400]);
      const p = randomChoice([15, 20, 25, 30]);
      const result = (total * p) / 100;

      return {
        text: `Dans une opération de nettoyage à La Réunion, ${p} % des ${total} déchets ramassés sont des bouteilles. Combien cela fait-il de bouteilles ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          (`${p} % de ${total} = ${total} × ${p} ÷ 100 = ${result}.`) +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
      };
    },
  },
  {
    kind: "template",
    id: "prop_pourcentage_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_pourcentage",
    difficulty: 3,
    theme: "neutral",
    hint: "Transforme le pourcentage en fraction sur 100.",
    tags: ["prop_proportionnalite", "pourcentage", "qcm", "template"],
    generate: () => {
      const p = randomChoice([5, 10, 20, 25, 50, 75]);
      const correct = `${p}/100`;

      return {
        text: `${p} % correspond à quelle fraction ?`,
        format: "qcm",
        choices: makeChoices(correct, [`100/${p}`, `${p}/10`, `${100 - p}/100`]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          (`${p} % signifie ${p} sur 100, donc ${correct}.`) +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
      };
    },
  },

  // =========================
  // PROP_COEFF_MULT
  // =========================
  {
    kind: "fixed",
    id: "prop_coeff_multiplicateur_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff_multiplicateur",
    difficulty: 2,
    theme: "neutral",
    text: "Une augmentation de 20 % correspond à multiplier par...",
    format: "qcm",
    choices: ["0,2", "1,2", "20", "2"],
    expected: ["1,2"],
    comparator: "mcq_exact",
    hint: "On garde 100 % puis on ajoute 20 %.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("Augmenter de 20 %, c’est passer à 120 %, donc multiplier par 1,2.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "coefficient_multiplicateur"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_multiplicateur_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff_multiplicateur",
    difficulty: 2,
    theme: "neutral",
    text: "Une réduction de 30 % correspond à multiplier par...",
    format: "qcm",
    choices: ["0,3", "0,7", "1,3", "30"],
    expected: ["0,7"],
    comparator: "mcq_exact",
    hint: "Après une baisse de 30 %, il reste 70 %.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("Réduire de 30 %, c’est garder 70 %, donc multiplier par 0,7.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "coefficient_multiplicateur", "reduction"],
  },
  {
    kind: "template",
    id: "prop_coeff_multiplicateur_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff_multiplicateur",
    difficulty: 3,
    theme: "neutral",
    hint: "Augmenter de p %, c’est multiplier par 1 + p/100.",
    tags: ["prop_proportionnalite", "coefficient_multiplicateur", "augmentation", "template"],
    generate: () => {
      const p = randomChoice([5, 10, 15, 20, 25, 30, 40, 50]);
      const coeff = 1 + p / 100;

      return {
        text: `Quel est le coefficient multiplicateur correspondant à une augmentation de ${p} % ?`,
        format: "short",
        expected: [String(coeff)],
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          (`1 + ${p}/100 = ${coeff}.`) +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
      };
    },
  },
  {
    kind: "template",
    id: "prop_coeff_multiplicateur_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff_multiplicateur",
    difficulty: 3,
    theme: "neutral",
    hint: "Diminuer de p %, c’est multiplier par 1 - p/100.",
    tags: ["prop_proportionnalite", "coefficient_multiplicateur", "reduction", "template"],
    generate: () => {
      const p = randomChoice([5, 10, 20, 25, 30, 40, 50]);
      const coeff = 1 - p / 100;

      return {
        text: `Quel est le coefficient multiplicateur correspondant à une diminution de ${p} % ?`,
        format: "short",
        expected: [String(coeff)],
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          (`1 - ${p}/100 = ${coeff}.`) +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
      };
    },
  },
  {
    kind: "template",
    id: "prop_coeff_multiplicateur_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff_multiplicateur",
    difficulty: 4,
    theme: "neutral",
    hint: "Lis le coefficient : 1,15 signifie 115 %.",
    tags: ["prop_proportionnalite", "coefficient_multiplicateur", "template"],
    generate: () => {
      const p = randomChoice([5, 10, 15, 20, 25, 30]);
      const coeff = 1 + p / 100;

      return {
        text: `Multiplier par ${coeff} correspond à quelle évolution en pourcentage ?`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          (`${coeff} = 1 + ${p}/100. Cela correspond à une augmentation de ${p} %.`) +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
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
    notionId: "prop_proportionnalite",
    microId: "prop_evolution",
    difficulty: 2,
    theme: "neutral",
    text: "Un prix de 100 € augmente de 15 %. Quel est le nouveau prix ?",
    format: "qcm",
    choices: ["85 €", "115 €", "150 €", "15 €"],
    expected: ["115 €"],
    comparator: "mcq_exact",
    hint: "100 € + 15 % de 100 €.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("15 % de 100 € vaut 15 €. Le nouveau prix est 100 + 15 = 115 €.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "evolution", "augmentation"],
  },
  {
    kind: "fixed",
    id: "prop_evolution_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_evolution",
    difficulty: 2,
    theme: "neutral",
    text: "Un prix de 80 € diminue de 25 %. Quel est le nouveau prix ?",
    format: "qcm",
    choices: ["20 €", "55 €", "60 €", "100 €"],
    expected: ["60 €"],
    comparator: "mcq_exact",
    hint: "25 % de 80 vaut 20.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("25 % de 80 € vaut 20 €. Le nouveau prix est 80 - 20 = 60 €.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "evolution", "reduction"],
  },
  {
    kind: "template",
    id: "prop_evolution_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_evolution",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise le coefficient multiplicateur.",
    tags: ["prop_proportionnalite", "evolution", "augmentation", "template"],
    generate: () => {
      const initial = randomChoice([50, 80, 100, 120, 200]);
      const p = randomChoice([10, 20, 25, 30, 50]);
      const result = initial * (1 + p / 100);

      return {
        text: `Un prix de ${initial} € augmente de ${p} %. Quel est le nouveau prix ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          (`Coefficient multiplicateur : ${1 + p / 100}. Nouveau prix : ${initial} × ${1 + p / 100} = ${result} €.`) +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
      };
    },
  },
  {
    kind: "template",
    id: "prop_evolution_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_evolution",
    difficulty: 3,
    theme: "neutral",
    hint: "Après une baisse, on multiplie par 1 - p/100.",
    tags: ["prop_proportionnalite", "evolution", "reduction", "template"],
    generate: () => {
      const initial = randomChoice([60, 80, 100, 120, 200]);
      const p = randomChoice([10, 20, 25, 30, 50]);
      const result = initial * (1 - p / 100);

      return {
        text: `Un prix de ${initial} € diminue de ${p} %. Quel est le nouveau prix ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          (`Coefficient multiplicateur : ${1 - p / 100}. Nouveau prix : ${initial} × ${1 - p / 100} = ${result} €.`) +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
      };
    },
  },
  {
    kind: "template",
    id: "prop_evolution_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_evolution",
    difficulty: 4,
    theme: "reunion",
    hint: "Calcule d’abord la hausse.",
    tags: ["prop_proportionnalite", "evolution", "reunion", "template"],
    generate: () => {
      const initial = randomChoice([100, 150, 200, 250]);
      const p = randomChoice([10, 20, 30]);
      const result = initial * (1 + p / 100);

      return {
        text: `À La Réunion, une facture d’électricité de ${initial} € augmente de ${p} %. Quel est le nouveau montant ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          (`${initial} × ${1 + p / 100} = ${result} €.`) +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
      };
    },
  },
  {
    kind: "template",
    id: "prop_evolution_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_evolution",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare le nouveau prix à l’ancien.",
    tags: ["prop_proportionnalite", "evolution", "template"],
    generate: () => {
      const oldPrice = randomChoice([50, 80, 100, 120, 200]);
      const p = randomChoice([10, 20, 25, 50]);
      const newPrice = oldPrice * (1 + p / 100);

      return {
        text: `Un prix passe de ${oldPrice} € à ${newPrice} €. Quel est le pourcentage d’augmentation ?`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          (`L’augmentation est ${newPrice - oldPrice} €. Le taux vaut (${newPrice - oldPrice} ÷ ${oldPrice}) × 100 = ${p} %.`) +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
      };
    },
  },
  {
    kind: "fixed",
    id: "prop_evolution_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_evolution",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi une baisse de 20 % correspond à multiplier par 0,8.",
    format: "open",
    expected: ["100", "20", "80", "0,8"],
    comparator: "contains_keyword",
    hint: "Après une baisse de 20 %, il reste 80 %.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("Une baisse de 20 % signifie qu’il reste 80 % de la valeur initiale. Or 80 % = 80/100 = 0,8.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "evolution", "open"],
  },

  // =========================
  // PROP_PROBLEME
  // =========================
  {
    kind: "template",
    id: "prop_probleme_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "reunion",
    hint: "Cherche le prix pour 1 kg.",
    tags: ["prop_proportionnalite", "probleme", "reunion", "template"],
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
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          (`Le prix au kg est ${p1} ÷ ${kg1} = ${unit} €. Donc ${kg2} kg coûtent ${p2} €.`) +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
      };
    },
  },
  {
    kind: "template",
    id: "prop_probleme_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 4,
    theme: "sport",
    hint: "Si la vitesse est constante, distance et durée sont proportionnelles.",
    tags: ["prop_proportionnalite", "probleme", "sport", "template"],
    generate: () => {
      const speed = randomInt(6, 12);
      const time = randomInt(2, 5);
      const distance = speed * time;

      return {
        text: `Un cycliste roule à vitesse constante et parcourt ${speed} km en 1 h. Quelle distance parcourt-il en ${time} h ?`,
        format: "short",
        expected: [String(distance)],
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          (`À vitesse constante, la distance est proportionnelle au temps : ${speed} × ${time} = ${distance} km.`) +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
      };
    },
  },
  {
    kind: "template",
    id: "prop_probleme_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 4,
    theme: "cuisine",
    hint: "Les quantités d’une recette sont proportionnelles au nombre de personnes.",
    tags: ["prop_proportionnalite", "probleme", "cuisine", "template"],
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
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          (`Par personne, il faut ${q1} ÷ ${people1} = ${gramsPerPerson} g. Donc pour ${people2} personnes : ${q2} g.`) +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
      };
    },
  },
  {
    kind: "template",
    id: "prop_probleme_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 4,
    theme: "reunion",
    hint: "Utilise le pourcentage.",
    tags: ["prop_proportionnalite", "probleme", "pourcentage", "reunion", "template"],
    generate: () => {
      const total = randomChoice([100, 200, 300, 500]);
      const p = randomChoice([10, 20, 25, 30, 40]);
      const result = (total * p) / 100;

      return {
        text: `Dans une réserve d’eau de ${total} L, on utilise ${p} % pour arroser un jardin. Combien de litres sont utilisés ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          (`${p} % de ${total} L = ${result} L.`) +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
      };
    },
  },
  {
    kind: "fixed",
    id: "prop_probleme_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment résoudre : 4 cahiers coûtent 12 €. Combien coûtent 7 cahiers ?",
    format: "open",
    expected: ["12", "4", "3", "7", "21"],
    comparator: "contains_keyword",
    hint: "Passe par le prix d’un cahier.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("Un cahier coûte 12 ÷ 4 = 3 €. Donc 7 cahiers coûtent 7 × 3 = 21 €.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "probleme", "open"],
  },
  {
    kind: "fixed",
    id: "prop_probleme_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi ajouter toujours le même nombre ne suffit pas à prouver une proportionnalité.",
    format: "open",
    expected: ["coefficient", "multiplier", "ajouter"],
    comparator: "contains_keyword",
    hint: "La proportionnalité repose sur une multiplication, pas une addition.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("Une situation proportionnelle utilise un coefficient multiplicatif constant. Ajouter toujours le même nombre décrit une relation additive, pas proportionnelle.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "probleme", "open", "piege"],
  },

  // =========================
  // PROP_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "prop_defi_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « Si 2 → 6, alors 5 → 9 car j’ajoute 3. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "On ne doit pas ajouter, on doit multiplier par un même coefficient.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("Non. Si 2 → 6, le coefficient est 3. Donc 5 → 15, pas 9.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "defi", "erreur"],
  },
  {
    kind: "fixed",
    id: "prop_defi_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un prix augmente de 20 %, puis baisse de 20 %. Revient-il au prix initial ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La baisse de 20 % ne s’applique pas au prix initial, mais au prix augmenté.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("Non. Par exemple, 100 € augmente de 20 % : 120 €. Puis 120 € baisse de 20 % : 96 €.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "defi", "evolution", "piege"],
  },
  {
    kind: "template",
    id: "prop_defi_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Teste les coefficients.",
    tags: ["prop_proportionnalite", "defi", "template"],
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
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          (`Non. Le coefficient est ${k}, donc ${x2} devrait donner ${x2 * k}.`) +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
      };
    },
  },
  {
    kind: "template",
    id: "prop_defi_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Une évolution successive se traite avec des coefficients multiplicateurs.",
    tags: ["prop_proportionnalite", "defi", "evolution", "template"],
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
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          (`Prix final = ${initial} × ${1 + up / 100} × ${1 - down / 100} = ${formatNumber(result)} €.`) +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
      };
    },
  },
  {
    kind: "template",
    id: "prop_defi_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Compare les prix au kg.",
    tags: ["prop_proportionnalite", "defi", "reunion", "comparaison", "template"],
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
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          (`Offre A : ${priceA} ÷ ${kgA} = ${unitA} €/kg. Offre B : ${priceB} ÷ ${kgB} = ${unitB} €/kg.`) +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
      };
    },
  },
  {
    kind: "fixed",
    id: "prop_defi_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique l’erreur : « augmenter de 30 %, c’est multiplier par 0,3 ».",
    format: "open",
    expected: ["1,3", "100", "30"],
    comparator: "contains_keyword",
    hint: "Quand on augmente, on garde 100 % et on ajoute 30 %.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("Augmenter de 30 %, c’est passer à 130 % de la valeur initiale, donc multiplier par 1,3.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "defi", "open", "erreur"],
  },
  {
    kind: "fixed",
    id: "prop_defi_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi une réduction de 25 % ne correspond pas à multiplier par 25.",
    format: "open",
    expected: ["75", "0,75", "reste"],
    comparator: "contains_keyword",
    hint: "Après une baisse de 25 %, il reste 75 %.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
          "Méthode : on vérifie si le même coefficient multiplicateur relie les deux grandeurs.\n\nCalcul : " +
          ("Une réduction de 25 % signifie qu’il reste 75 % de la valeur initiale. On multiplie donc par 0,75, pas par 25.") +
          "\n\nConclusion : la valeur trouvée respecte la situation de proportionnalité.",
    tags: ["prop_proportionnalite", "defi", "open", "erreur"],
  },

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  // ---------- PROP_RECONNAITRE ----------
  {
    kind: "fixed",
    id: "prop_reconnaitre_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Deux grandeurs sont proportionnelles lorsque…",
    format: "qcm",
    choices: [
      "on passe de l’une à l’autre en multipliant toujours par le même nombre",
      "on ajoute toujours le même nombre",
      "les valeurs sont rangées dans l’ordre",
      "les valeurs sont toutes égales",
    ],
    expected: ["on passe de l’une à l’autre en multipliant toujours par le même nombre"],
    comparator: "mcq_exact",
    hint: "Pense au coefficient de proportionnalité.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles si un même coefficient relie l’une à l’autre.\n\n" +
      "Méthode : on cherche un multiplicateur unique.\n\n" +
      "Calcul : si ce coefficient existe, c’est proportionnel.\n\n" +
      "Conclusion : on multiplie toujours par le même nombre.",
    tags: ["prop_proportionnalite", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_reconnaitre_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle situation est proportionnelle ?",
    format: "qcm",
    choices: [
      "le prix payé en fonction du nombre de croissants identiques",
      "l’âge d’une personne en fonction de l’année",
      "la taille d’un enfant en fonction de son âge",
      "la pointure en fonction du prénom",
    ],
    expected: ["le prix payé en fonction du nombre de croissants identiques"],
    comparator: "mcq_exact",
    hint: "Cherche un prix unitaire fixe.",
    explanation:
      "Définition : une situation est proportionnelle si un coefficient constant relie les grandeurs.\n\n" +
      "Méthode : on cherche un prix unitaire fixe.\n\n" +
      "Calcul : chaque croissant coûte le même prix, donc le prix total est proportionnel au nombre.\n\n" +
      "Conclusion : le prix des croissants est proportionnel au nombre.",
    tags: ["prop_proportionnalite", "reconnaitre", "qcm"],
  },
  {
    kind: "template",
    id: "prop_reconnaitre_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Vérifie si le rapport y/x est le même partout.",
    tags: ["prop_proportionnalite", "reconnaitre", "template"],
    generate: () => {
      const prop = randomChoice([true, false]);
      const k = randomChoice([2, 3, 4]);
      const x1 = randomInt(2, 4);
      const x2 = x1 + randomInt(1, 3);
      const y1 = x1 * k;
      const y2 = prop ? x2 * k : x2 * k + randomChoice([1, 2]);
      return {
        text: `Un tableau donne : pour ${x1} on a ${y1}, pour ${x2} on a ${y2}. Ce tableau est-il proportionnel ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [prop ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un tableau est proportionnel si le rapport y/x est constant.\n\n" +
          "Méthode : on compare les rapports.\n\n" +
          `Calcul : ${y1}÷${x1} = ${formatNumber(y1 / x1)} et ${y2}÷${x2} = ${formatNumber(y2 / x2)}.\n\n` +
          `Conclusion : ${prop ? "les rapports sont égaux, c’est proportionnel" : "les rapports diffèrent, ce n’est pas proportionnel"}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "prop_reconnaitre_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Comment vérifier qu’un tableau est proportionnel ?",
    format: "qcm",
    choices: [
      "en vérifiant que le rapport entre les lignes est constant",
      "en additionnant toutes les valeurs",
      "en rangeant les valeurs",
      "en comparant les plus grandes valeurs",
    ],
    expected: ["en vérifiant que le rapport entre les lignes est constant"],
    comparator: "mcq_exact",
    hint: "On calcule le coefficient.",
    explanation:
      "Définition : un tableau est proportionnel si un coefficient constant relie les deux lignes.\n\n" +
      "Méthode : on calcule le rapport de chaque colonne.\n\n" +
      "Calcul : si tous les rapports sont égaux, c’est proportionnel.\n\n" +
      "Conclusion : on vérifie que le rapport est constant.",
    tags: ["prop_proportionnalite", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_reconnaitre_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Explique comment reconnaître une situation de proportionnalité.",
    format: "open",
    expected: ["coefficient", "multiplie", "constant"],
    comparator: "contains_keyword",
    hint: "Pense au coefficient de proportionnalité.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles si un même coefficient les relie.\n\n" +
      "Méthode : on vérifie qu’on multiplie toujours par le même nombre.\n\n" +
      "Calcul : on calcule le rapport y/x pour chaque couple.\n\n" +
      "Conclusion : si ce coefficient est constant, la situation est proportionnelle.",
    tags: ["prop_proportionnalite", "reconnaitre", "open"],
  },

  // ---------- PROP_TABLE ----------
  {
    kind: "fixed",
    id: "prop_table_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un tableau de proportionnalité, 2 correspond à 6. À quoi correspond 5 ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Le coefficient est 6 ÷ 2 = 3.",
    explanation:
      "Définition : dans un tableau de proportionnalité, un coefficient relie les deux lignes.\n\n" +
      "Méthode : on calcule le coefficient, puis on l’applique.\n\n" +
      "Calcul : coefficient = 6 ÷ 2 = 3, donc 5 × 3 = 15.\n\n" +
      "Conclusion : 5 correspond à 15.",
    tags: ["prop_proportionnalite", "table"],
  },
  {
    kind: "template",
    id: "prop_table_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Trouve le coefficient, puis complète.",
    tags: ["prop_proportionnalite", "table", "template", "canvas"],
    generate: () => {
      const k = randomChoice([2, 3, 4, 5]);
      const x1 = randomInt(2, 5);
      const x2 = x1 + randomInt(2, 5);
      const y1 = x1 * k;
      const y2 = x2 * k;
      return {
        text: `Complète ce tableau de proportionnalité : ${x1} → ${y1}, ${x2} → ?`,
        format: "short",
        expected: [String(y2)],
        comparator: "number_equal",
        explanation:
          "Définition : un coefficient relie les deux lignes du tableau.\n\n" +
          `Méthode : coefficient = ${y1} ÷ ${x1} = ${k}.\n\n` +
          `Calcul : ${x2} × ${k} = ${y2}.\n\n` +
          `Conclusion : la valeur manquante est ${y2}.`,
        canvas: tableauProportionnaliteCanvas({
          rowLabels: ["x", "y"],
          values: [
            [String(x1), String(x2)],
            [String(y1), "?"],
          ],
          missing: [{ row: 1, col: 1 }],
        }),
      };
    },
  },
  {
    kind: "template",
    id: "prop_table_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 3,
    theme: "neutral",
    hint: "Le coefficient s’applique dans les deux sens.",
    tags: ["prop_proportionnalite", "table", "template", "canvas"],
    generate: () => {
      const k = randomChoice([2, 3, 4]);
      const x1 = randomInt(2, 4);
      const y2 = randomChoice([k * 4, k * 5, k * 6]);
      const y1 = x1 * k;
      const x2 = y2 / k;
      return {
        text: `Dans un tableau de proportionnalité : ${x1} → ${y1} et ? → ${y2}. Quelle est la valeur manquante de la première ligne ?`,
        format: "short",
        expected: [String(x2)],
        comparator: "number_equal",
        explanation:
          "Définition : on utilise le coefficient pour remonter dans le tableau.\n\n" +
          `Méthode : coefficient = ${y1} ÷ ${x1} = ${k}.\n\n` +
          `Calcul : ${y2} ÷ ${k} = ${x2}.\n\n` +
          `Conclusion : la valeur manquante est ${x2}.`,
        canvas: tableauProportionnaliteCanvas({
          rowLabels: ["x", "y"],
          values: [
            [String(x1), "?"],
            [String(y1), String(y2)],
          ],
          missing: [{ row: 0, col: 1 }],
        }),
      };
    },
  },
  {
    kind: "fixed",
    id: "prop_table_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    text: "Lequel de ces tableaux est un tableau de proportionnalité ?",
    format: "qcm",
    choices: [
      "2→6 ; 4→12 ; 5→15",
      "2→6 ; 4→10 ; 5→15",
      "2→5 ; 4→8 ; 5→11",
      "1→2 ; 2→5 ; 3→7",
    ],
    expected: ["2→6 ; 4→12 ; 5→15"],
    comparator: "mcq_exact",
    hint: "Le rapport y/x doit être constant.",
    explanation:
      "Définition : un tableau est proportionnel si le rapport est constant.\n\n" +
      "Méthode : on calcule y ÷ x pour chaque colonne.\n\n" +
      "Calcul : 6÷2 = 12÷4 = 15÷5 = 3.\n\n" +
      "Conclusion : le tableau « 2→6 ; 4→12 ; 5→15 » est proportionnel.",
    tags: ["prop_proportionnalite", "table", "qcm"],
  },
  {
    kind: "template",
    id: "prop_table_tpl_4_coeff",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 3,
    theme: "neutral",
    hint: "Coefficient = valeur de la 2e ligne ÷ valeur de la 1re ligne.",
    tags: ["prop_proportionnalite", "table", "coefficient", "template"],
    generate: () => {
      const k = randomChoice([2, 3, 4, 5]);
      const x = randomInt(2, 6);
      const y = x * k;
      return {
        text: `Dans un tableau de proportionnalité, ${x} correspond à ${y}. Quel est le coefficient de proportionnalité (de la 1re vers la 2e ligne) ?`,
        format: "short",
        expected: [String(k)],
        comparator: "number_equal",
        explanation:
          "Définition : le coefficient relie la 1re ligne à la 2e.\n\n" +
          "Méthode : on divise la valeur de la 2e ligne par celle de la 1re.\n\n" +
          `Calcul : ${y} ÷ ${x} = ${k}.\n\n` +
          `Conclusion : le coefficient est ${k}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "prop_table_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    text: "Explique comment compléter un tableau de proportionnalité.",
    format: "open",
    expected: ["coefficient", "multiplie", "ligne"],
    comparator: "contains_keyword",
    hint: "On trouve d’abord le coefficient.",
    explanation:
      "Définition : un coefficient constant relie les deux lignes.\n\n" +
      "Méthode : on calcule le coefficient à partir d’une colonne connue.\n\n" +
      "Calcul : on multiplie (ou divise) par ce coefficient pour compléter.\n\n" +
      "Conclusion : on applique le coefficient à chaque colonne.",
    tags: ["prop_proportionnalite", "table", "open"],
  },

  // ---------- PROP_COEFF ----------
  {
    kind: "fixed",
    id: "prop_coeff_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    text: "3 kg de fruits coûtent 12 €. Quel est le prix d’un kg (coefficient) ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "12 ÷ 3.",
    explanation:
      "Définition : le coefficient est le prix d’une unité.\n\n" +
      "Méthode : on divise le prix total par la quantité.\n\n" +
      "Calcul : 12 ÷ 3 = 4.\n\n" +
      "Conclusion : un kg coûte 4 € (coefficient = 4).",
    tags: ["prop_proportionnalite", "coeff"],
  },
  {
    kind: "template",
    id: "prop_coeff_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    hint: "Coefficient = total ÷ quantité.",
    tags: ["prop_proportionnalite", "coeff", "template"],
    generate: () => {
      const k = randomChoice([2, 3, 5, 6]);
      const q = randomInt(2, 6);
      const total = k * q;
      return {
        text: `${q} objets identiques coûtent ${total} €. Quel est le prix d’un objet ?`,
        format: "short",
        expected: [String(k)],
        comparator: "number_equal",
        explanation:
          "Définition : le coefficient est le prix unitaire.\n\n" +
          "Méthode : on divise le total par la quantité.\n\n" +
          `Calcul : ${total} ÷ ${q} = ${k}.\n\n` +
          `Conclusion : un objet coûte ${k} €.`,
      };
    },
  },
  {
    kind: "template",
    id: "prop_coeff_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 3,
    theme: "neutral",
    hint: "On multiplie la quantité par le coefficient.",
    tags: ["prop_proportionnalite", "coeff", "template"],
    generate: () => {
      const k = randomChoice([2, 3, 4, 5]);
      const q = randomInt(4, 9);
      const total = k * q;
      return {
        text: `Un objet coûte ${k} €. Combien coûtent ${q} objets identiques ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "Définition : on utilise le prix unitaire comme coefficient.\n\n" +
          "Méthode : on multiplie la quantité par le prix unitaire.\n\n" +
          `Calcul : ${q} × ${k} = ${total}.\n\n` +
          `Conclusion : ${q} objets coûtent ${total} €.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "prop_coeff_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    text: "Le coefficient de proportionnalité, c’est…",
    format: "qcm",
    choices: [
      "le nombre par lequel on multiplie pour passer d’une grandeur à l’autre",
      "la somme des deux grandeurs",
      "la différence des deux grandeurs",
      "la plus grande valeur du tableau",
    ],
    expected: ["le nombre par lequel on multiplie pour passer d’une grandeur à l’autre"],
    comparator: "mcq_exact",
    hint: "C’est un multiplicateur.",
    explanation:
      "Définition : le coefficient est le multiplicateur reliant les deux grandeurs.\n\n" +
      "Méthode : on l’obtient en divisant une valeur par l’autre.\n\n" +
      "Calcul : coefficient = y ÷ x.\n\n" +
      "Conclusion : c’est le nombre par lequel on multiplie.",
    tags: ["prop_proportionnalite", "coeff", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment trouver le coefficient de proportionnalité d’un tableau.",
    format: "open",
    expected: ["divise", "coefficient", "ligne"],
    comparator: "contains_keyword",
    hint: "On divise une valeur de la 2e ligne par celle de la 1re.",
    explanation:
      "Définition : le coefficient relie la 1re ligne à la 2e.\n\n" +
      "Méthode : on divise une valeur de la 2e ligne par la valeur correspondante de la 1re.\n\n" +
      "Calcul : coefficient = y ÷ x.\n\n" +
      "Conclusion : ce quotient donne le coefficient de proportionnalité.",
    tags: ["prop_proportionnalite", "coeff", "open"],
  },

  // ---------- PROP_QUATRIEME ----------
  {
    kind: "fixed",
    id: "prop_quatrieme_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 2,
    theme: "neutral",
    text: "4 stylos coûtent 6 €. Combien coûtent 6 stylos ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Produit en croix : 6 × 6 ÷ 4.",
    explanation:
      "Définition : la quatrième proportionnelle se trouve par produit en croix.\n\n" +
      "Méthode : prix = 6 × 6 ÷ 4.\n\n" +
      "Calcul : 36 ÷ 4 = 9.\n\n" +
      "Conclusion : 6 stylos coûtent 9 €.",
    tags: ["prop_proportionnalite", "quatrieme"],
  },
  {
    kind: "template",
    id: "prop_quatrieme_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 3,
    theme: "neutral",
    hint: "Produit en croix.",
    tags: ["prop_proportionnalite", "quatrieme", "template"],
    generate: () => {
      const k = randomChoice([2, 3, 4]);
      const a = randomInt(2, 5);
      const b = a * k;
      const c = a + randomInt(1, 4);
      const d = c * k;
      return {
        text: `${a} objets coûtent ${b} €. Combien coûtent ${c} objets ?`,
        format: "short",
        expected: [String(d)],
        comparator: "number_equal",
        explanation:
          "Définition : on cherche la quatrième proportionnelle.\n\n" +
          `Méthode : produit en croix, prix = ${b} × ${c} ÷ ${a}.\n\n` +
          `Calcul : ${b * c} ÷ ${a} = ${d}.\n\n` +
          `Conclusion : ${c} objets coûtent ${d} €.`,
      };
    },
  },
  {
    kind: "template",
    id: "prop_quatrieme_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 3,
    theme: "neutral",
    hint: "Passe d’abord à l’unité.",
    tags: ["prop_proportionnalite", "quatrieme", "unite", "template"],
    generate: () => {
      const unite = randomChoice([2, 3, 4, 5]);
      const q1 = randomInt(2, 5);
      const q2 = randomInt(6, 10);
      const total1 = unite * q1;
      const total2 = unite * q2;
      return {
        text: `${q1} kg de farine coûtent ${total1} €. Combien coûtent ${q2} kg ?`,
        format: "short",
        expected: [String(total2)],
        comparator: "number_equal",
        explanation:
          "Définition : on peut passer par le prix d’un kg.\n\n" +
          `Méthode : prix d’un kg = ${total1} ÷ ${q1} = ${unite} €.\n\n` +
          `Calcul : ${q2} × ${unite} = ${total2}.\n\n` +
          `Conclusion : ${q2} kg coûtent ${total2} €.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "prop_quatrieme_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle méthode permet de calculer une quatrième proportionnelle ?",
    format: "qcm",
    choices: [
      "le produit en croix",
      "l’addition des valeurs",
      "le calcul de la moyenne",
      "le rangement des valeurs",
    ],
    expected: ["le produit en croix"],
    comparator: "mcq_exact",
    hint: "On multiplie en diagonale puis on divise.",
    explanation:
      "Définition : la quatrième proportionnelle complète un tableau de proportionnalité.\n\n" +
      "Méthode : on utilise le produit en croix.\n\n" +
      "Calcul : valeur = (produit des diagonales connues) ÷ (valeur restante).\n\n" +
      "Conclusion : on utilise le produit en croix.",
    tags: ["prop_proportionnalite", "quatrieme", "qcm"],
  },
  {
    kind: "template",
    id: "prop_quatrieme_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 4,
    theme: "neutral",
    hint: "Produit en croix avec une recette.",
    tags: ["prop_proportionnalite", "quatrieme", "contexte", "template"],
    generate: () => {
      const k = randomChoice([2, 3, 4]);
      const pers1 = randomInt(2, 4);
      const oeufs1 = pers1 * k;
      const pers2 = pers1 + randomInt(2, 5);
      const oeufs2 = pers2 * k;
      return {
        text: `Une recette pour ${pers1} personnes utilise ${oeufs1} œufs. Combien d’œufs faut-il pour ${pers2} personnes ?`,
        format: "short",
        expected: [String(oeufs2)],
        comparator: "number_equal",
        explanation:
          "Définition : on cherche la quatrième proportionnelle.\n\n" +
          `Méthode : produit en croix, œufs = ${oeufs1} × ${pers2} ÷ ${pers1}.\n\n` +
          `Calcul : ${oeufs1 * pers2} ÷ ${pers1} = ${oeufs2}.\n\n` +
          `Conclusion : il faut ${oeufs2} œufs.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "prop_quatrieme_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 3,
    theme: "neutral",
    text: "Explique la méthode du produit en croix.",
    format: "open",
    expected: ["croix", "multiplie", "divise"],
    comparator: "contains_keyword",
    hint: "On multiplie en diagonale, puis on divise.",
    explanation:
      "Définition : le produit en croix sert à trouver une valeur manquante d’un tableau de proportionnalité.\n\n" +
      "Méthode : on multiplie les deux valeurs en diagonale, puis on divise par la troisième.\n\n" +
      "Calcul : valeur manquante = (a × d) ÷ b.\n\n" +
      "Conclusion : on multiplie en diagonale puis on divise.",
    tags: ["prop_proportionnalite", "quatrieme", "open"],
  },

  // ---------- PROP_POURCENTAGE ----------
  {
    kind: "fixed",
    id: "prop_pourcentage_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_pourcentage",
    difficulty: 2,
    theme: "neutral",
    text: "Combien font 25 % de 80 ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "25 % = 25 ÷ 100.",
    explanation:
      "Définition : prendre un pourcentage, c’est multiplier par ce pourcentage divisé par 100.\n\n" +
      "Méthode : 25 % de 80 = 80 × 25 ÷ 100.\n\n" +
      "Calcul : 80 × 0,25 = 20.\n\n" +
      "Conclusion : 25 % de 80 = 20.",
    tags: ["prop_proportionnalite", "pourcentage"],
  },
  {
    kind: "template",
    id: "prop_pourcentage_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_pourcentage",
    difficulty: 2,
    theme: "neutral",
    hint: "Pourcentage de N = N × p ÷ 100.",
    tags: ["prop_proportionnalite", "pourcentage", "template"],
    generate: () => {
      const p = randomChoice([10, 20, 25, 50]);
      const n = randomChoice([40, 60, 80, 100, 200]);
      const r = (n * p) / 100;
      return {
        text: `Combien font ${p} % de ${n} ?`,
        format: "short",
        expected: [String(r)],
        comparator: "number_equal",
        explanation:
          "Définition : prendre un pourcentage, c’est multiplier par p ÷ 100.\n\n" +
          `Méthode : ${p} % de ${n} = ${n} × ${p} ÷ 100.\n\n` +
          `Calcul : = ${r}.\n\n` +
          `Conclusion : ${p} % de ${n} = ${r}.`,
      };
    },
  },
  {
    kind: "template",
    id: "prop_pourcentage_tpl_4_reduction",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_pourcentage",
    difficulty: 3,
    theme: "neutral",
    hint: "On calcule la réduction puis on la retire du prix.",
    tags: ["prop_proportionnalite", "pourcentage", "reduction", "template"],
    generate: () => {
      const p = randomChoice([10, 20, 25, 50]);
      const prix = randomChoice([40, 60, 80, 100]);
      const reduction = (prix * p) / 100;
      const finalPrix = prix - reduction;
      return {
        text: `Un article coûte ${prix} €. Il bénéficie d’une réduction de ${p} %. Quel est le nouveau prix ?`,
        format: "short",
        expected: [String(finalPrix)],
        comparator: "number_equal",
        explanation:
          "Définition : une réduction se soustrait au prix initial.\n\n" +
          `Méthode : réduction = ${prix} × ${p} ÷ 100 = ${reduction} €.\n\n` +
          `Calcul : ${prix} - ${reduction} = ${finalPrix}.\n\n` +
          `Conclusion : le nouveau prix est ${finalPrix} €.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "prop_pourcentage_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_pourcentage",
    difficulty: 2,
    theme: "neutral",
    text: "Explique comment calculer un pourcentage d’un nombre.",
    format: "open",
    expected: ["100", "multiplie", "divise"],
    comparator: "contains_keyword",
    hint: "p % de N = N × p ÷ 100.",
    explanation:
      "Définition : un pourcentage est une proportion sur 100.\n\n" +
      "Méthode : on multiplie le nombre par le pourcentage, puis on divise par 100.\n\n" +
      "Calcul : p % de N = N × p ÷ 100.\n\n" +
      "Conclusion : on multiplie par p et on divise par 100.",
    tags: ["prop_proportionnalite", "pourcentage", "open"],
  },

  // ---------- PROP_COEFF_MULTIPLICATEUR ----------
  {
    kind: "fixed",
    id: "prop_coeff_multiplicateur_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff_multiplicateur",
    difficulty: 2,
    theme: "neutral",
    text: "Augmenter une quantité de 20 % revient à multiplier par…",
    format: "qcm",
    choices: ["1,2", "0,2", "20", "0,8"],
    expected: ["1,2"],
    comparator: "mcq_exact",
    hint: "100 % + 20 % = 120 %.",
    explanation:
      "Définition : augmenter de p % revient à multiplier par (1 + p ÷ 100).\n\n" +
      "Méthode : 100 % + 20 % = 120 % = 1,2.\n\n" +
      "Calcul : le coefficient est 1,2.\n\n" +
      "Conclusion : on multiplie par 1,2.",
    tags: ["prop_proportionnalite", "coeff_multiplicateur", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_multiplicateur_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff_multiplicateur",
    difficulty: 2,
    theme: "neutral",
    text: "Diminuer une quantité de 10 % revient à multiplier par…",
    format: "qcm",
    choices: ["0,9", "1,1", "0,1", "10"],
    expected: ["0,9"],
    comparator: "mcq_exact",
    hint: "100 % - 10 % = 90 %.",
    explanation:
      "Définition : diminuer de p % revient à multiplier par (1 - p ÷ 100).\n\n" +
      "Méthode : 100 % - 10 % = 90 % = 0,9.\n\n" +
      "Calcul : le coefficient est 0,9.\n\n" +
      "Conclusion : on multiplie par 0,9.",
    tags: ["prop_proportionnalite", "coeff_multiplicateur", "qcm"],
  },
  {
    kind: "template",
    id: "prop_coeff_multiplicateur_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff_multiplicateur",
    difficulty: 3,
    theme: "neutral",
    hint: "Augmentation : 1 + p/100.",
    tags: ["prop_proportionnalite", "coeff_multiplicateur", "template"],
    generate: () => {
      const p = randomChoice([5, 15, 25, 40]);
      const coeff = 1 + p / 100;
      const cPoint = String(coeff);
      const cComma = cPoint.replace(".", ",");
      return {
        text: `Par quel nombre faut-il multiplier pour augmenter une valeur de ${p} % ?`,
        format: "short",
        expected: [cPoint, cComma],
        comparator: "number_equal",
        explanation:
          "Définition : augmenter de p % revient à multiplier par 1 + p ÷ 100.\n\n" +
          `Méthode : 1 + ${p} ÷ 100.\n\n` +
          `Calcul : = ${cComma}.\n\n` +
          `Conclusion : on multiplie par ${cComma}.`,
      };
    },
  },
  {
    kind: "template",
    id: "prop_coeff_multiplicateur_tpl_3_appliquer",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff_multiplicateur",
    difficulty: 3,
    theme: "neutral",
    hint: "On multiplie la valeur par le coefficient.",
    tags: ["prop_proportionnalite", "coeff_multiplicateur", "template"],
    generate: () => {
      const p = randomChoice([10, 20, 50]);
      const prix = randomChoice([40, 60, 80, 200]);
      const coeff = 1 + p / 100;
      const result = prix * coeff;
      return {
        text: `Un prix de ${prix} € augmente de ${p} %. Quel est le nouveau prix ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : augmenter de p %, c’est multiplier par 1 + p ÷ 100.\n\n" +
          `Méthode : coefficient = ${formatNumber(coeff)}.\n\n` +
          `Calcul : ${prix} × ${formatNumber(coeff)} = ${result}.\n\n` +
          `Conclusion : le nouveau prix est ${result} €.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "prop_coeff_multiplicateur_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff_multiplicateur",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi augmenter de 50 % revient à multiplier par 1,5.",
    format: "open",
    expected: ["100", "50", "1,5"],
    comparator: "contains_keyword",
    hint: "On garde 100 % et on ajoute 50 %.",
    explanation:
      "Définition : augmenter de p %, c’est ajouter p % à 100 %.\n\n" +
      "Méthode : 100 % + 50 % = 150 %.\n\n" +
      "Calcul : 150 % = 1,5.\n\n" +
      "Conclusion : on multiplie par 1,5.",
    tags: ["prop_proportionnalite", "coeff_multiplicateur", "open"],
  },

  // ---------- PROP_EVOLUTION ----------
  {
    kind: "fixed",
    id: "prop_evolution_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_evolution",
    difficulty: 3,
    theme: "neutral",
    text: "Un prix passe de 50 € à 60 €. De quel pourcentage a-t-il augmenté ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "Augmentation ÷ valeur de départ × 100.",
    explanation:
      "Définition : le pourcentage d’évolution = (variation ÷ valeur de départ) × 100.\n\n" +
      "Méthode : variation = 60 - 50 = 10.\n\n" +
      "Calcul : (10 ÷ 50) × 100 = 20 %.\n\n" +
      "Conclusion : le prix a augmenté de 20 %.",
    tags: ["prop_proportionnalite", "evolution"],
  },
  {
    kind: "template",
    id: "prop_evolution_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_evolution",
    difficulty: 3,
    theme: "neutral",
    hint: "On applique le coefficient multiplicateur.",
    tags: ["prop_proportionnalite", "evolution", "template"],
    generate: () => {
      const p = randomChoice([10, 20, 25, 50]);
      const valeur = randomChoice([40, 60, 80, 200]);
      const result = valeur * (1 + p / 100);
      return {
        text: `Une population de ${valeur} habitants augmente de ${p} %. Quelle est la nouvelle population ?`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation:
          "Définition : une augmentation de p % multiplie par 1 + p ÷ 100.\n\n" +
          `Méthode : coefficient = ${formatNumber(1 + p / 100)}.\n\n` +
          `Calcul : ${valeur} × ${formatNumber(1 + p / 100)} = ${result}.\n\n` +
          `Conclusion : la nouvelle population est ${result}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "prop_evolution_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_evolution",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment calculer le pourcentage d’évolution entre deux valeurs.",
    format: "open",
    expected: ["variation", "départ", "100"],
    comparator: "contains_keyword",
    hint: "On compare la variation à la valeur de départ.",
    explanation:
      "Définition : le pourcentage d’évolution compare la variation à la valeur de départ.\n\n" +
      "Méthode : on calcule la variation (arrivée - départ), puis on divise par la valeur de départ et on multiplie par 100.\n\n" +
      "Calcul : pourcentage = (variation ÷ départ) × 100.\n\n" +
      "Conclusion : on rapporte la variation à la valeur de départ.",
    tags: ["prop_proportionnalite", "evolution", "open"],
  },

  // ---------- PROP_PROBLEME ----------
  {
    kind: "template",
    id: "prop_probleme_tpl_3_vitesse",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "La distance est proportionnelle au temps à vitesse constante.",
    tags: ["prop_proportionnalite", "probleme", "vitesse", "template"],
    generate: () => {
      const vitesse = randomChoice([4, 5, 6]);
      const t1 = randomInt(2, 4);
      const t2 = t1 + randomInt(2, 5);
      const d1 = vitesse * t1;
      const d2 = vitesse * t2;
      return {
        text: `Un marcheur parcourt ${d1} km en ${t1} h à allure constante. Quelle distance parcourt-il en ${t2} h ?`,
        format: "short",
        expected: [String(d2)],
        comparator: "number_equal",
        explanation:
          "Définition : à allure constante, la distance est proportionnelle au temps.\n\n" +
          `Méthode : vitesse = ${d1} ÷ ${t1} = ${vitesse} km/h.\n\n` +
          `Calcul : ${t2} × ${vitesse} = ${d2}.\n\n` +
          `Conclusion : il parcourt ${d2} km.`,
      };
    },
  },
  {
    kind: "template",
    id: "prop_probleme_tpl_4_recette",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Produit en croix.",
    tags: ["prop_proportionnalite", "probleme", "recette", "template"],
    generate: () => {
      const k = randomChoice([2, 3, 4]);
      const p1 = randomInt(2, 4);
      const g1 = p1 * k * 50;
      const p2 = p1 + randomInt(2, 4);
      const g2 = p2 * k * 50;
      return {
        text: `Une recette pour ${p1} personnes nécessite ${g1} g de farine. Combien de farine pour ${p2} personnes ?`,
        format: "short",
        expected: [String(g2)],
        comparator: "number_equal",
        explanation:
          "Définition : la quantité de farine est proportionnelle au nombre de personnes.\n\n" +
          `Méthode : produit en croix, farine = ${g1} × ${p2} ÷ ${p1}.\n\n` +
          `Calcul : ${g1 * p2} ÷ ${p1} = ${g2}.\n\n` +
          `Conclusion : il faut ${g2} g de farine.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "prop_probleme_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "5 L d’essence coûtent 10 €. Combien coûtent 8 L ?",
    format: "short",
    expected: ["16"],
    comparator: "number_equal",
    hint: "Prix d’un litre = 10 ÷ 5.",
    explanation:
      "Définition : le prix est proportionnel au volume.\n\n" +
      "Méthode : prix d’un litre = 10 ÷ 5 = 2 €.\n\n" +
      "Calcul : 8 × 2 = 16.\n\n" +
      "Conclusion : 8 L coûtent 16 €.",
    tags: ["prop_proportionnalite", "probleme"],
  },
  {
    kind: "fixed",
    id: "prop_probleme_open_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Explique deux méthodes pour résoudre un problème de proportionnalité.",
    format: "open",
    expected: ["coefficient", "produit en croix", "unité"],
    comparator: "contains_keyword",
    hint: "Coefficient, passage à l’unité, produit en croix.",
    explanation:
      "Définition : plusieurs méthodes résolvent un problème de proportionnalité.\n\n" +
      "Méthode : on peut utiliser le coefficient de proportionnalité, le passage à l’unité ou le produit en croix.\n\n" +
      "Calcul : chaque méthode mène au même résultat.\n\n" +
      "Conclusion : par exemple le produit en croix ou le passage à l’unité.",
    tags: ["prop_proportionnalite", "probleme", "open"],
  },

  // ---------- PROP_DEFIS ----------
  {
    kind: "fixed",
    id: "prop_defi_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un prix augmente de 10 % puis baisse de 10 %. Retrouve-t-on le prix de départ ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "On multiplie par 1,1 puis par 0,9.",
    explanation:
      "Définition : des évolutions successives se multiplient.\n\n" +
      "Méthode : coefficient global = 1,1 × 0,9.\n\n" +
      "Calcul : 1,1 × 0,9 = 0,99, donc le prix final est plus petit.\n\n" +
      "Conclusion : non, on ne retrouve pas le prix de départ.",
    tags: ["prop_proportionnalite", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "prop_defi_tpl_1_successif",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "On applique d’abord la première évolution, puis la seconde.",
    tags: ["prop_proportionnalite", "defi", "successif", "template"],
    generate: () => {
      const prix = randomChoice([100, 200]);
      const p = randomChoice([10, 20, 50]);
      const apres1 = prix * (1 + p / 100);
      const apres2 = apres1 * (1 - p / 100);
      return {
        text: `Un prix de ${prix} € augmente de ${p} %, puis baisse de ${p} %. Quel est le prix final ?`,
        format: "short",
        expected: [String(apres2)],
        comparator: "number_equal",
        explanation:
          "Définition : les coefficients d’évolution se multiplient.\n\n" +
          `Méthode : ${prix} × ${formatNumber(1 + p / 100)} = ${apres1}, puis × ${formatNumber(1 - p / 100)}.\n\n` +
          `Calcul : ${apres1} × ${formatNumber(1 - p / 100)} = ${apres2}.\n\n` +
          `Conclusion : le prix final est ${apres2} €.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "prop_defi_open_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi deux évolutions en pourcentage ne s’additionnent pas toujours simplement.",
    format: "open",
    expected: ["multiplie", "coefficient", "successif"],
    comparator: "contains_keyword",
    hint: "Les coefficients multiplicateurs se multiplient.",
    explanation:
      "Définition : des évolutions successives correspondent à des coefficients multiplicateurs.\n\n" +
      "Méthode : on multiplie les coefficients au lieu d’additionner les pourcentages.\n\n" +
      "Calcul : par exemple +10 % puis +10 % donne ×1,1×1,1 = ×1,21, soit +21 % (pas +20 %).\n\n" +
      "Conclusion : on multiplie les coefficients, donc les pourcentages ne s’additionnent pas simplement.",
    tags: ["prop_proportionnalite", "defi", "open"],
  },
];