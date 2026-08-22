// ─── Calculer avec les fractions (6e) ──────────────────────────────────────────
//
// ⛔ POURQUOI CETTE BANQUE EXISTE (22/08/2026). Le programme de 6e porte un
// objectif d'apprentissage « Effectuer des opérations sur les fractions », et le
// coach n'en avait RIEN : `fraction_nombre` s'arrêtait à lire, représenter,
// relier au décimal et comparer. Un élève de 6e ne rencontrait aucun calcul sur
// les fractions.
//
// Ce que le BO demande, mot pour mot (Exemples pour la mise en œuvre des
// programmes, 6e, 2025) :
//   · « additionner et soustraire des fractions de même dénominateur ou de
//     dénominateurs multiples l'un de l'autre » ;
//   · « additionner et soustraire des fractions de dénominateurs quelconques
//     dans des cas simples. Par exemple, il sait calculer 5/4 + 2/3 ; 7/2 − 3/5 » ;
//   · « calculer le produit d'une fraction par un nombre entier, et connaît sa
//     propriété de commutativité » ;
//   · la fraction comme OPÉRATEUR : « 2/5 de 60, c'est 2 cinquièmes de 60 […]
//     2/5 × 60 = 2 × 60/5 = 2 × 12 = 24 » — et l'élève est « fortement
//     encouragé, avant d'effectuer la multiplication, à simplifier » ;
//   · un problème type : « Mia a découpé son gâteau. Leïla choisit une part
//     égale au quart, Léo une part égale au sixième. Quelle fraction reste-t-il ? »
//
// Les items de `fraction_quantite` (« la moitié de 10 ») vivent encore dans
// `fractions.bank.ts` : ils ont seulement changé de notionId. Ici on ajoute le
// NIVEAU du BO (2/5 de 60), plus les trois micros neuves.
//
// ⭐ Notation en texte simple (1/5, 2/3), comme le reste de la banque de 6e —
// pas de LaTeX : un `$` avalé disparaît sans laisser de trace
// (scripts/verifier-latex.ts).

import type { TutorBankItemV4, FractionCanvasData } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function expl(calcul: string) {
  return (
    "Définition : une fraction a/b se lit « a parts de b », et b × a/b = a.\n\n" +
    "Méthode : pour additionner ou soustraire, on met les fractions sur le même dénominateur ; pour multiplier par un entier, on multiplie le numérateur.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la fraction obtenue, simplifiée si c'est possible."
  );
}

/** Deux fractions côte à côte : les parts se voient avant de se calculer. */
function deuxBarres(
  a: [number, number],
  b: [number, number],
  legende: string
): FractionCanvasData {
  return {
    kind: "fraction",
    model: "compare",
    fractions: [
      { numerator: a[0], denominator: a[1], label: `${a[0]}/${a[1]}`, color: "#3b82f6" },
      { numerator: b[0], denominator: b[1], label: `${b[0]}/${b[1]}`, color: "#10b981" },
    ],
    display: { showLabel: true, showFraction: true, showParts: true },
    // ⚠️ Le composant plafonne à 340 px : au-delà, le dessin ne grandit plus
    // mais ses lettres, elles, rapetissent dans un bloc étroit.
    size: { width: 320, height: 200 },
  };
}

/** Une seule fraction en barre — pour montrer un résultat. */
function barre(n: number, d: number): FractionCanvasData {
  return {
    kind: "fraction",
    model: "bar",
    fraction: { numerator: n, denominator: d, label: `${n}/${d}`, color: "#6366f1" },
    display: { showLabel: true, showFraction: true, showParts: true },
    size: { width: 320, height: 130 },
  };
}

export const fractionsCalculBank: TutorBankItemV4[] = [
  // =========================
  // FRACTION_QUANTITE — le niveau du BO (2/5 de 60)
  // =========================
  {
    kind: "fixed",
    id: "fraction_quantite_bo_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    text: "Combien font les 2/5 de 60 ?",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "Un cinquième de 60, puis deux fois ce résultat.",
    explanation: expl(
      "2/5 de 60, c'est 2 cinquièmes de 60. Un cinquième de 60 vaut 60 ÷ 5 = 12, donc 2/5 de 60 = 2 × 12 = 24."
    ),
    tags: ["fraction_calcul", "operateur", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_bo_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    text: "Combien font les 3/4 de 20 ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Un quart de 20, puis trois fois ce résultat.",
    explanation: expl("Un quart de 20 vaut 20 ÷ 4 = 5, donc 3/4 de 20 = 3 × 5 = 15."),
    tags: ["fraction_calcul", "operateur", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_bo_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    text: "Un collège de 400 élèves compte 120 demi-pensionnaires. Combien font les 2/3 de 400 ?",
    format: "short",
    expected: ["266,67", "266.67", "800/3"],
    comparator: "fraction_decimal_equivalent",
    hint: "400 ÷ 3 ne tombe pas juste : garde la fraction.",
    explanation: expl(
      "2/3 de 400 = 2 × 400/3 = 800/3. Ce nombre n'est pas décimal : 800/3 vaut environ 266,67. Toutes les fractions d'un nombre entier ne donnent pas un entier."
    ),
    tags: ["fraction_calcul", "operateur", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_bo_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    text: "Combien font les 5/4 de 3 ?",
    format: "short",
    expected: ["15/4", "3,75", "3.75"],
    comparator: "fraction_decimal_equivalent",
    hint: "5/4 de 3, c'est 5 quarts de 3, donc 5 fois 3/4.",
    explanation: expl(
      "5/4 de 3, c'est 5 fois un quart de 3, soit 5 × 3/4 = 15/4. Comme 5/4 est plus grand que 1, le résultat est plus grand que 3."
    ),
    tags: ["fraction_calcul", "operateur", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_bo_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    text: "Pour calculer les 2/5 de 60, que fait-on ?",
    format: "qcm",
    choices: [
      "on multiplie 2/5 par 60",
      "on additionne 2/5 et 60",
      "on divise 60 par 2/5",
      "on soustrait 5 à 60 puis on multiplie par 2",
    ],
    expected: ["on multiplie 2/5 par 60"],
    comparator: "mcq_exact",
    hint: "Prendre une fraction d'un nombre, c'est une multiplication.",
    explanation: expl(
      "Pour calculer une fraction d'un nombre entier, on multiplie la fraction par le nombre : 2/5 × 60 = 2 × 60/5 = 2 × 12 = 24."
    ),
    tags: ["fraction_calcul", "operateur", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_quantite_tpl_bo",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    hint: "Divise d'abord par le dénominateur, multiplie ensuite par le numérateur.",
    tags: ["fraction_calcul", "operateur", "template"],
    generate: () => {
      // Le dénominateur divise le nombre : on veut un résultat entier, pour que
      // la MÉTHODE reste au premier plan.
      const d = [3, 4, 5, 6][randomInt(0, 3)];
      const n = randomInt(2, d - 1);
      const part = randomInt(3, 12);
      const nombre = d * part;
      return {
        text: `Combien font les ${n}/${d} de ${nombre} ?`,
        format: "short",
        expected: [String(n * part)],
        comparator: "number_equal",
        explanation: expl(
          `Un ${d}e de ${nombre} vaut ${nombre} ÷ ${d} = ${part}, donc ${n}/${d} de ${nombre} = ${n} × ${part} = ${n * part}.`
        ),
      };
    },
  },

  // =========================
  // FRACTION_ADDITIONNER
  // =========================
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule 1/5 + 2/5.",
    format: "short",
    expected: ["3/5", "3 / 5", "0,6", "0.6"],
    comparator: "fraction_decimal_equivalent",
    hint: "Même dénominateur : on ajoute seulement les numérateurs.",
    explanation: expl(
      "Les deux fractions ont le même dénominateur : 1 cinquième plus 2 cinquièmes font 3 cinquièmes. 1/5 + 2/5 = 3/5."
    ),
    tags: ["fraction_calcul", "addition", "canvas"],
    canvas: deuxBarres([1, 5], [2, 5], "1/5 et 2/5"),
  },
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule 3/7 + 2/7.",
    format: "short",
    expected: ["5/7", "5 / 7"],
    comparator: "fraction_decimal_equivalent",
    hint: "Le dénominateur ne change pas.",
    explanation: expl("3/7 + 2/7 = (3 + 2)/7 = 5/7. Le dénominateur, lui, ne bouge pas."),
    tags: ["fraction_calcul", "addition", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule 5/8 − 2/8.",
    format: "short",
    expected: ["3/8", "3 / 8", "0,375", "0.375"],
    comparator: "fraction_decimal_equivalent",
    hint: "Même dénominateur : on soustrait les numérateurs.",
    explanation: expl("5/8 − 2/8 = (5 − 2)/8 = 3/8."),
    tags: ["fraction_calcul", "soustraction", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule 1/2 + 1/4.",
    format: "short",
    expected: ["3/4", "3 / 4", "0,75", "0.75"],
    comparator: "fraction_decimal_equivalent",
    hint: "4 est un multiple de 2 : écris 1/2 en quarts.",
    explanation: expl(
      "1/2 = 2/4, car on multiplie numérateur et dénominateur par 2. Donc 1/2 + 1/4 = 2/4 + 1/4 = 3/4."
    ),
    tags: ["fraction_calcul", "addition", "canvas"],
    canvas: deuxBarres([1, 2], [1, 4], "1/2 et 1/4"),
  },
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule 2/3 + 1/6.",
    format: "short",
    expected: ["5/6", "5 / 6"],
    comparator: "fraction_decimal_equivalent",
    hint: "6 est un multiple de 3 : écris 2/3 en sixièmes.",
    explanation: expl("2/3 = 4/6, donc 2/3 + 1/6 = 4/6 + 1/6 = 5/6."),
    tags: ["fraction_calcul", "addition", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule 3/4 − 1/8.",
    format: "short",
    expected: ["5/8", "5 / 8", "0,625", "0.625"],
    comparator: "fraction_decimal_equivalent",
    hint: "8 est un multiple de 4 : écris 3/4 en huitièmes.",
    explanation: expl("3/4 = 6/8, donc 3/4 − 1/8 = 6/8 − 1/8 = 5/8."),
    tags: ["fraction_calcul", "soustraction", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_7",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule 5/4 + 2/3.",
    format: "short",
    expected: ["23/12", "23 / 12"],
    comparator: "fraction_decimal_equivalent",
    hint: "12 est à la fois un multiple de 4 et de 3.",
    explanation: expl(
      "On met les deux fractions sur 12 : 5/4 = 15/12 et 2/3 = 8/12. Donc 5/4 + 2/3 = 15/12 + 8/12 = 23/12."
    ),
    tags: ["fraction_calcul", "addition", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_8",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule 7/2 − 3/5.",
    format: "short",
    expected: ["29/10", "29 / 10", "2,9", "2.9"],
    comparator: "fraction_decimal_equivalent",
    hint: "10 est à la fois un multiple de 2 et de 5.",
    explanation: expl(
      "On met les deux fractions sur 10 : 7/2 = 35/10 et 3/5 = 6/10. Donc 7/2 − 3/5 = 35/10 − 6/10 = 29/10."
    ),
    tags: ["fraction_calcul", "soustraction", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_9",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule 7/10 − 3/10.",
    format: "short",
    expected: ["4/10", "2/5", "0,4", "0.4"],
    comparator: "fraction_decimal_equivalent",
    hint: "Même dénominateur, puis simplifie si tu peux.",
    explanation: expl(
      "7/10 − 3/10 = 4/10. On peut simplifier en divisant par 2 : 4/10 = 2/5, c'est-à-dire 0,4."
    ),
    tags: ["fraction_calcul", "soustraction", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_10",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit 1/2 + 1/3 = 2/5. A-t-il raison ?",
    format: "qcm",
    choices: [
      "non : on ne peut pas additionner les dénominateurs, le résultat est 5/6",
      "oui : on additionne les numérateurs entre eux et les dénominateurs entre eux",
      "non : le résultat est 2/6",
      "oui, mais seulement parce que 2 et 3 sont des nombres premiers",
    ],
    expected: ["non : on ne peut pas additionner les dénominateurs, le résultat est 5/6"],
    comparator: "mcq_exact",
    hint: "2/5 est plus petit que 1/2 : additionner ne peut pas faire diminuer.",
    explanation: expl(
      "On met sur le même dénominateur : 1/2 = 3/6 et 1/3 = 2/6, donc 1/2 + 1/3 = 5/6. Le résultat 2/5 est même plus petit que 1/2, ce qui est impossible pour une addition de nombres positifs."
    ),
    tags: ["fraction_calcul", "addition", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_additionner_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 1,
    theme: "neutral",
    hint: "Même dénominateur : seuls les numérateurs s'additionnent.",
    tags: ["fraction_calcul", "addition", "template"],
    generate: () => {
      const d = randomInt(4, 12);
      const a = randomInt(1, d - 2);
      const b = randomInt(1, d - a - 1);
      return {
        text: `Calcule ${a}/${d} + ${b}/${d}.`,
        format: "short",
        expected: [`${a + b}/${d}`, `${a + b} / ${d}`],
        comparator: "fraction_decimal_equivalent",
        explanation: expl(`${a}/${d} + ${b}/${d} = (${a} + ${b})/${d} = ${a + b}/${d}.`),
        canvas: deuxBarres([a, d], [b, d], `${a}/${d} et ${b}/${d}`),
      };
    },
  },
  {
    kind: "template",
    id: "fraction_additionner_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 3,
    theme: "neutral",
    hint: "Un dénominateur est un multiple de l'autre : convertis-en un.",
    tags: ["fraction_calcul", "addition", "template"],
    generate: () => {
      const d = randomInt(2, 5);
      const k = randomInt(2, 4);
      const grand = d * k; // le grand dénominateur est un multiple du petit
      const a = randomInt(1, d - 1 || 1);
      const b = randomInt(1, grand - a * k - 1 || 1);
      return {
        text: `Calcule ${a}/${d} + ${b}/${grand}.`,
        format: "short",
        expected: [`${a * k + b}/${grand}`, `${a * k + b} / ${grand}`],
        comparator: "fraction_decimal_equivalent",
        explanation: expl(
          `${grand} est un multiple de ${d} : ${a}/${d} = ${a * k}/${grand}. Donc ${a}/${d} + ${b}/${grand} = ${a * k}/${grand} + ${b}/${grand} = ${a * k + b}/${grand}.`
        ),
      };
    },
  },

  // =========================
  // FRACTION_MULTIPLIER_ENTIER
  // =========================
  {
    kind: "fixed",
    id: "fraction_multiplier_entier_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier_entier",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule 3 × 2/5.",
    format: "short",
    expected: ["6/5", "6 / 5", "1,2", "1.2"],
    comparator: "fraction_decimal_equivalent",
    hint: "3 × 2/5, c'est 2/5 + 2/5 + 2/5.",
    explanation: expl(
      "3 × 2/5 = 2/5 + 2/5 + 2/5 = 6/5. On multiplie le numérateur par 3 ; le dénominateur ne change pas."
    ),
    tags: ["fraction_calcul", "multiplication", "canvas"],
    canvas: barre(6, 5),
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_entier_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier_entier",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule 4 × 1/3.",
    format: "short",
    expected: ["4/3", "4 / 3"],
    comparator: "fraction_decimal_equivalent",
    hint: "Quatre tiers.",
    explanation: expl("4 × 1/3 = 4/3. Quatre fois un tiers, ce sont quatre tiers."),
    tags: ["fraction_calcul", "multiplication", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_entier_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier_entier",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule 2/7 × 5.",
    format: "short",
    expected: ["10/7", "10 / 7"],
    comparator: "fraction_decimal_equivalent",
    hint: "L'ordre n'a pas d'importance : 2/7 × 5 = 5 × 2/7.",
    explanation: expl(
      "2/7 × 5 = 5 × 2/7 = 10/7. Le produit d'une fraction par un entier est commutatif : l'ordre ne change rien."
    ),
    tags: ["fraction_calcul", "multiplication", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_entier_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier_entier",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule 6 × 1/6.",
    format: "short",
    expected: ["1", "6/6"],
    comparator: "fraction_decimal_equivalent",
    hint: "Six sixièmes font un entier.",
    explanation: expl(
      "6 × 1/6 = 6/6 = 1. C'est la propriété qui définit la fraction : b × a/b = a, donc 6 × 1/6 = 1."
    ),
    tags: ["fraction_calcul", "multiplication", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_entier_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier_entier",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule 5 × 3/10, puis simplifie le résultat.",
    format: "short",
    expected: ["15/10", "3/2", "1,5", "1.5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Multiplie le numérateur, puis divise numérateur et dénominateur par 5.",
    explanation: expl(
      "5 × 3/10 = 15/10. On simplifie en divisant par 5 : 15/10 = 3/2, c'est-à-dire 1,5."
    ),
    tags: ["fraction_calcul", "multiplication", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_entier_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier_entier",
    difficulty: 2,
    theme: "neutral",
    text: "Pour multiplier une fraction par un nombre entier, que fait-on ?",
    format: "qcm",
    choices: [
      "on multiplie le numérateur par l'entier, le dénominateur ne change pas",
      "on multiplie le dénominateur par l'entier, le numérateur ne change pas",
      "on multiplie le numérateur et le dénominateur par l'entier",
      "on ajoute l'entier au numérateur",
    ],
    expected: ["on multiplie le numérateur par l'entier, le dénominateur ne change pas"],
    comparator: "mcq_exact",
    hint: "3 × 2/5, c'est 2/5 + 2/5 + 2/5 : le nombre de parts change, pas leur taille.",
    explanation: expl(
      "3 × 2/5 = 2/5 + 2/5 + 2/5 = 6/5 : on prend trois fois plus de parts, mais les parts gardent la même taille. Le dénominateur ne bouge donc pas."
    ),
    tags: ["fraction_calcul", "multiplication", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_entier_fixed_7",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier_entier",
    difficulty: 3,
    theme: "neutral",
    text: "Les produits 4 × 3/7 et 3/7 × 4 sont-ils égaux ?",
    format: "qcm",
    choices: [
      "oui, la multiplication est commutative : les deux valent 12/7",
      "non, le premier vaut 12/7 et le second 4/7",
      "non, on ne peut pas écrire une fraction avant un entier",
      "oui, mais seulement parce que 4 et 7 n'ont aucun diviseur commun",
    ],
    expected: ["oui, la multiplication est commutative : les deux valent 12/7"],
    comparator: "mcq_exact",
    hint: "Change l'ordre et recalcule.",
    explanation: expl(
      "4 × 3/7 = 12/7 et 3/7 × 4 = 12/7 : le produit d'une fraction par un entier est commutatif, comme pour deux entiers."
    ),
    tags: ["fraction_calcul", "multiplication", "commutativite", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_entier_fixed_8",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier_entier",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule 10 × 1/5.",
    format: "short",
    expected: ["2", "10/5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Dix cinquièmes, c'est combien d'unités ?",
    explanation: expl("10 × 1/5 = 10/5 = 2. Dix cinquièmes valent deux unités entières."),
    tags: ["fraction_calcul", "multiplication", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_entier_fixed_9",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier_entier",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule 4 × 5/8, puis simplifie.",
    format: "short",
    expected: ["20/8", "5/2", "2,5", "2.5"],
    comparator: "fraction_decimal_equivalent",
    hint: "On peut aussi simplifier AVANT : 4/8 = 1/2.",
    explanation: expl(
      "4 × 5/8 = 20/8 = 5/2 = 2,5. On pouvait simplifier avant de multiplier : 4 × 5/8 = 5 × 4/8 = 5 × 1/2 = 5/2."
    ),
    tags: ["fraction_calcul", "multiplication", "short"],
  },
  {
    kind: "template",
    id: "fraction_multiplier_entier_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier_entier",
    difficulty: 2,
    theme: "neutral",
    hint: "Seul le numérateur est multiplié.",
    tags: ["fraction_calcul", "multiplication", "template"],
    generate: () => {
      const d = randomInt(3, 9);
      const n = randomInt(1, d - 1);
      const k = randomInt(2, 6);
      return {
        text: `Calcule ${k} × ${n}/${d}.`,
        format: "short",
        expected: [`${k * n}/${d}`, `${k * n} / ${d}`],
        comparator: "fraction_decimal_equivalent",
        explanation: expl(
          `${k} × ${n}/${d} = ${k} × ${n} sur ${d} = ${k * n}/${d}. Le dénominateur ne change pas.`
        ),
        canvas: barre(k * n, d),
      };
    },
  },

  // =========================
  // FRACTION_CALCUL_DEFI
  // =========================
  {
    kind: "fixed",
    id: "fraction_calcul_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Mia découpe son gâteau d'anniversaire en parts de tailles différentes. Leïla choisit une part égale au quart du gâteau et Léo une part égale au sixième. Quelle fraction du gâteau reste-t-il pour les autres invités ?",
    format: "short",
    expected: ["7/12", "7 / 12"],
    comparator: "fraction_decimal_equivalent",
    hint: "Additionne d'abord les deux parts, puis retranche du gâteau entier.",
    explanation: expl(
      "1/4 + 1/6 : on met sur 12, soit 3/12 + 2/12 = 5/12. Le gâteau entier vaut 12/12, donc il reste 12/12 − 5/12 = 7/12."
    ),
    tags: ["fraction_calcul", "defi", "probleme"],
  },
  {
    kind: "fixed",
    id: "fraction_calcul_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule 2/5 + 3/10.",
    format: "short",
    expected: ["7/10", "7 / 10", "0,7", "0.7"],
    comparator: "fraction_decimal_equivalent",
    hint: "10 est un multiple de 5.",
    explanation: expl("2/5 = 4/10, donc 2/5 + 3/10 = 4/10 + 3/10 = 7/10, c'est-à-dire 0,7."),
    tags: ["fraction_calcul", "defi", "short"],
  },
  {
    kind: "fixed",
    id: "fraction_calcul_defi_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 4,
    theme: "neutral",
    text: "À La Réunion, un cageot contient 24 letchis. Malo en mange les 3/8 et Anaïs en mange 1/4. Combien de letchis restent-ils ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Calcule d'abord chaque part en nombre de letchis.",
    explanation: expl(
      "3/8 de 24 = 3 × 3 = 9 letchis pour Malo. 1/4 de 24 = 6 letchis pour Anaïs. Ils en ont mangé 9 + 6 = 15, il en reste 24 − 15 = 9."
    ),
    tags: ["fraction_calcul", "defi", "probleme", "974"],
  },
  {
    kind: "fixed",
    id: "fraction_calcul_defi_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Le résultat de 3 × 5/4 est-il plus grand ou plus petit que 3 ?",
    format: "qcm",
    choices: [
      "plus grand, car 5/4 est plus grand que 1",
      "plus petit, car on multiplie par une fraction",
      "égal à 3, car le dénominateur ne change pas",
      "on ne peut pas le savoir sans calculer",
    ],
    expected: ["plus grand, car 5/4 est plus grand que 1"],
    comparator: "mcq_exact",
    hint: "Compare 5/4 à 1 avant de calculer.",
    explanation: expl(
      "3 × 5/4 = 15/4 = 3,75, donc plus grand que 3. Multiplier par une fraction plus grande que 1 augmente ; multiplier ne veut pas toujours dire « rendre plus grand », mais ici si."
    ),
    tags: ["fraction_calcul", "defi", "raisonnement", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_calcul_defi_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une classe de 30 élèves : 2/5 font de l'espagnol, 1/3 font de l'allemand, les autres font du chinois. Combien d'élèves font du chinois ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Compte les élèves de chaque langue, puis retire du total.",
    explanation: expl(
      "2/5 de 30 = 12 élèves en espagnol. 1/3 de 30 = 10 élèves en allemand. Il reste 30 − 12 − 10 = 8 élèves en chinois."
    ),
    tags: ["fraction_calcul", "defi", "probleme"],
  },
  {
    kind: "fixed",
    id: "fraction_calcul_defi_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi on ne peut pas additionner 1/2 et 1/3 en additionnant les numérateurs entre eux et les dénominateurs entre eux.",
    format: "short",
    expected: ["même dénominateur", "meme denominateur", "parts", "taille"],
    comparator: "contains_keyword",
    hint: "Deux fractions ne s'additionnent que si leurs parts ont la même taille.",
    explanation: expl(
      "Un demi et un tiers ne sont pas des parts de la même taille : on ne peut pas les compter ensemble tant qu'on ne les a pas exprimées avec le même dénominateur. 1/2 = 3/6 et 1/3 = 2/6, donc la somme vaut 5/6 — et pas 2/5, qui serait même plus petit que 1/2."
    ),
    tags: ["fraction_calcul", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "fraction_calcul_defi_fixed_7",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Une bouteille contient 3/4 de litre de jus. On en verse 1/4 de litre dans un verre. Quelle fraction de litre reste-t-il dans la bouteille ?",
    format: "short",
    expected: ["2/4", "1/2", "0,5", "0.5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Même dénominateur : la soustraction est directe.",
    explanation: expl(
      "3/4 − 1/4 = 2/4, qu'on simplifie en 1/2. Il reste un demi-litre dans la bouteille."
    ),
    tags: ["fraction_calcul", "defi", "probleme"],
  },
  {
    kind: "template",
    id: "fraction_calcul_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule la part mangée, puis retire-la du total.",
    tags: ["fraction_calcul", "defi", "template"],
    generate: () => {
      const d = [3, 4, 5, 6][randomInt(0, 3)];
      const part = randomInt(3, 8);
      const total = d * part;
      const n = randomInt(1, d - 1);
      const mange = n * part;
      const fruits = ["letchis", "mangues", "ananas", "goyaviers"];
      const fruit = fruits[randomInt(0, fruits.length - 1)];
      return {
        text: `Un panier contient ${total} ${fruit}. On en prend les ${n}/${d}. Combien en reste-t-il ?`,
        format: "short",
        expected: [String(total - mange)],
        comparator: "number_equal",
        explanation: expl(
          `${n}/${d} de ${total} = ${n} × ${total} ÷ ${d} = ${mange}. Il reste ${total} − ${mange} = ${total - mange} ${fruit}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "fraction_calcul_defi_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Le tout vaut d/d : retire la part connue.",
    tags: ["fraction_calcul", "defi", "template"],
    generate: () => {
      const d = randomInt(5, 12);
      const n = randomInt(1, d - 2);
      return {
        text: `Une tablette de chocolat est partagée en ${d} carrés égaux. On en mange ${n}/${d}. Quelle fraction de la tablette reste-t-il ?`,
        format: "short",
        expected: [`${d - n}/${d}`, `${d - n} / ${d}`],
        comparator: "fraction_decimal_equivalent",
        explanation: expl(
          `La tablette entière vaut ${d}/${d}. On enlève ${n}/${d} : il reste ${d}/${d} − ${n}/${d} = ${d - n}/${d}.`
        ),
        canvas: barre(d - n, d),
      };
    },
  },
];

// `shuffle` reste exporté implicitement inutilisé par les items fixes : les QCM
// sont mélangés par le moteur (le mélange fait dans la banque était biaisé, voir
// le correctif du 12/08 sur l'ordre des choix).
void shuffle;
