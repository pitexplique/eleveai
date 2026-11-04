// lib/tutor-v4/questionBank/puissances-canvas-commun.ts
//
// ⭐ 04/11/2026 — LES CANVAS DES PUISSANCES (lib/canvas), 4e → 2de.
// ⛔ Le canvas se pose À CÔTÉ de la question, pas dans le corrigé : sur un
// « Calcule 4² », une grille de 16 cases donnerait la réponse. On ne dessine
// donc que là où l'image aide à RAISONNER sans répondre à la place de l'élève :
//   - un carré quadrillé, un cube, un arbre → « quelle PUISSANCE écrit ce
//     nombre ? » : le piège b × 2, b × 3, k × n se voit sur le dessin ;
//   - la table des puissances de 10 → la régularité ×10 / ÷10 fait trouver la
//     case manquante, et se prolonge sous 10⁰ vers 10⁻ⁿ.
// Aucune règle sur les exposants : utilisable dès la 4e (BO : la définition).

import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

// ⚠️ Autonome exprès : la banque 4e importe ce fichier ; passer par
// puissances-regles-commun (qui importe la banque 4e) ferait un import circulaire.
const HAUT = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"] as const;
const exposant = (n: number) =>
  (n < 0 ? "⁻" : "") + String(Math.abs(n)).split("").map((c) => HAUT[Number(c)]).join("");

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function shuffle<T>(arr: readonly T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}
function makeChoices(correct: string, wrongs: readonly string[]) {
  const d = shuffle(Array.from(new Set(wrongs)).filter((w) => w !== correct)).slice(0, 3);
  return shuffle([correct, ...d]);
}
const expl = (definition: string, methode: string, calcul: string, conclusion: string) =>
  `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
const P = (b: string | number, n: number) => `${b}${exposant(n)}`;
const fr = (n: number) => n.toLocaleString("fr-FR").replace(/[  ]/g, " ");

const PRENOMS = ["Inès", "Lucas", "Maëlys", "Yanis", "Chloé", "Noah", "Léa", "Sacha", "Aya", "Hugo", "Nina", "Adam"] as const;
const DEF = "aⁿ, c’est le nombre a écrit n fois en facteur : a × a × … × a. L’exposant n COMPTE les facteurs.";

/* -------------------------------------- 1. Le carré quadrillé : b², pas b × 2 */

export function genCarreQuadrillage(): TutorGeneratedQuestionV4 {
  const b = randomInt(3, 6);
  const cells: [number, number][] = [];
  for (let r = 0; r < b; r++) for (let c = 0; c < b; c++) cells.push([r, c]);
  const p = randomChoice(PRENOMS);
  const [unite, quoi] = randomChoice([
    ["carreaux", "un carrelage"],
    ["dalles", "une terrasse"],
    ["cases", "une grille de jeu"],
    ["carrés de chocolat", "une tablette"],
    ["pixels", "une petite icône"],
    ["places", "un parking"],
  ] as const);
  const correct = P(b, 2);
  return {
    text: randomChoice([
      `Ce carré représente ${quoi} : ${b} rangées de ${b} ${unite}. Quelle puissance donne le nombre de ${unite} ?`,
      `Le dessin montre ${quoi} carré, avec ${b} ${unite} sur chaque côté. Quelle écriture donne le nombre total de ${unite} ?`,
      `${p} dessine ${quoi} : ${b} ${unite} sur chaque côté. Comment écrire le nombre de ${unite} avec une puissance ?`,
      `Observe le quadrillage de ${quoi}. Quelle puissance est égale au nombre de ${unite} ?`,
      `Le carré du dessin a ${b} ${unite} par ligne et ${b} lignes. Laquelle de ces écritures compte tous les ${unite} ?`,
      `Pour compter les ${unite} de ce carré sans les compter un à un, quelle puissance faut-il écrire ?`,
    ]),
    format: "qcm",
    choices: makeChoices(correct, [`${b} × 2`, P(2, b), P(b, 3), `${b} + ${b}`, String(2 * b)]),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: {
      kind: "figure_libre",
      grid: { rows: b, cols: b, filledCells: cells },
      display: { showGrid: true, showFilled: true },
      size: { cellSize: b <= 4 ? 30 : 24, padding: 14 },
    } as any,
    explanation: expl(
      DEF,
      `On a ${b} lignes de ${b} ${unite} : on multiplie ${b} par lui-même.`,
      `${b} × ${b} = ${correct} = ${b * b} ${unite}. ⚠️ ${b} × 2 = ${2 * b} ne compterait que deux lignes.`,
      `Le nombre de ${unite} est ${correct}, « ${b} au carré ».`
    ),
  };
}

/* ------------------------------------------- 2. Le cube : b³, pas b × 3 */

export function genCubeVolume(): TutorGeneratedQuestionV4 {
  const b = randomInt(2, 7);
  const unite = randomChoice(["cm", "dm", "m"] as const);
  const p = randomChoice(PRENOMS);
  const quoi = randomChoice(["Ce cube", "Ce dé géant", "Cette boîte cubique", "Ce bloc de glace", "Cet aquarium cubique", "Ce colis cubique"]);
  const correct = `${P(b, 3)} ${unite}³`;
  return {
    text: randomChoice([
      `${quoi} a une arête de ${b} ${unite}. Quelle écriture donne son volume ?`,
      `${quoi} a des arêtes de ${b} ${unite}. Comment écrire son volume avec une puissance ?`,
      `${p} veut calculer le volume de ce cube d’arête ${b} ${unite}. Quelle écriture doit-on trouver ?`,
      `Le volume d’un cube, c’est arête × arête × arête. Pour le cube du dessin, quelle puissance l’écrit ?`,
      `Quelle puissance donne le volume du cube dessiné, d’arête ${b} ${unite} ?`,
    ]),
    format: "qcm",
    choices: makeChoices(correct, [`${b} × 3 ${unite}³`, `${P(3, b)} ${unite}³`, `${P(b, 2)} ${unite}³`, `${b} + ${b} + ${b} ${unite}³`]),
    expected: [correct],
    comparator: "mcq_exact",
    // Sans base surlignée : l'étiquette « base carrée » détournait l'œil des trois arêtes.
    canvas: { kind: "solide_3d", solide: "cube", dimensions: { cote: b }, labels: { cote: `${b} ${unite}` }, highlight: { base: false } } as any,
    explanation: expl(
      DEF,
      `Volume d’un cube = arête × arête × arête : trois facteurs égaux à ${b}.`,
      `${b} × ${b} × ${b} = ${P(b, 3)} = ${b ** 3}. ⚠️ ${b} × 3 = ${3 * b} n’est pas ce volume.`,
      `Le volume est ${P(b, 3)} ${unite}³, soit ${b ** 3} ${unite}³ (« ${b} au cube »).`
    ),
  };
}

/* -------------------------------- 3. L'arbre : kⁿ chemins, pas k × n */

export function genArbreChemins(): TutorGeneratedQuestionV4 {
  const ctx = randomChoice([
    { k: 2, e: ["P", "F"], dire: (n: number) => `On lance ${n} fois une pièce (P = pile, F = face). L’arbre montre tous les résultats possibles.`, quoi: "résultats" },
    { k: 2, e: ["0", "1"], dire: (n: number) => `Un code informatique s’écrit avec ${n} chiffres, chacun 0 ou 1. L’arbre montre tous les codes possibles.`, quoi: "codes" },
    { k: 2, e: ["G", "D"], dire: (n: number) => `Dans un labyrinthe, à chacun des ${n} carrefours, on tourne à gauche (G) ou à droite (D).`, quoi: "chemins" },
    { k: 2, e: ["V", "R"], dire: (n: number) => `Un livreur passe ${n} feux ; chacun est vert (V) ou rouge (R) quand il arrive.`, quoi: "situations" },
    { k: 3, e: ["R", "V", "B"], dire: () => `On peint 2 cases, chacune en rouge (R), vert (V) ou bleu (B).`, quoi: "coloriages" },
    { k: 3, e: ["A", "B", "C"], dire: () => `Un QCM a 2 questions, avec 3 réponses possibles (A, B ou C) pour chacune.`, quoi: "façons de répondre" },
  ] as const);
  const n = ctx.k === 3 ? 2 : randomChoice([2, 3, 3]);
  const branche = (niv: number): any[] =>
    ctx.e.map((l) => (niv < n ? { label: l, enfants: branche(niv + 1) } : { label: l }));
  const correct = P(ctx.k, n);
  const total = ctx.k ** n;
  return {
    text: `${ctx.dire(n)} ${randomChoice([
      `Quelle puissance donne le nombre de ${ctx.quoi} ?`,
      `Comment écrire le nombre de ${ctx.quoi} avec une puissance ?`,
      `Laquelle de ces écritures compte tous les ${ctx.quoi} ?`,
      `Sans compter les branches une à une, quelle puissance faut-il écrire ?`,
    ])}`,
    format: "qcm",
    choices: makeChoices(correct, [`${ctx.k} × ${n}`, P(n, ctx.k), `${ctx.k} + ${n}`, P(ctx.k, n + 1), String(ctx.k * n)]),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: { kind: "arbre_proba", racineEnfants: branche(1) } as any,
    explanation: expl(
      DEF,
      `À chaque étape, chaque branche se divise en ${ctx.k} : on multiplie par ${ctx.k}, ${n} fois.`,
      `${Array(n).fill(ctx.k).join(" × ")} = ${correct} = ${total}. ⚠️ ${ctx.k} × ${n} = ${ctx.k * n} ne compte pas les chemins.`,
      `Il y a ${correct} = ${total} ${ctx.quoi}.`
    ),
  };
}

/* ------------------- 4. La table des puissances de 10, une case effacée */

const dixAffiche = (k: number) => P(10, k);
const dixValeur = (k: number) => (k >= 0 ? fr(10 ** k) : "0," + "0".repeat(-k - 1) + "1");

/** `negatifs` : la table descend sous 10⁰ (10⁻⁴ … 10³). */
export function genTableDix(o: { negatifs?: boolean } = {}): TutorGeneratedQuestionV4 {
  const debut = o.negatifs ? randomInt(-4, -1) : randomInt(1, 3);
  const ks = [0, 1, 2, 3, 4].map((i) => debut + i);
  // Le trou : jamais la première ligne ; côté négatif, jamais 10⁰ (trop connu).
  const i = randomChoice([1, 2, 3, 4].filter((j) => !o.negatifs || ks[j] !== 0));
  const k = ks[i];
  const trouValeur = Math.random() < 0.6;
  const rows = ks.map((kk, j) => ({
    values: [j === i && !trouValeur ? "?" : dixAffiche(kk), j === i && trouValeur ? "?" : dixValeur(kk)],
  }));
  const p = randomChoice(PRENOMS);
  const text = trouValeur
    ? randomChoice([
        `Complète le tableau : quel nombre remplace « ? » ?`,
        `Dans ce tableau des puissances de 10, quelle valeur manque ?`,
        `${p} a effacé une case du tableau. Quel nombre y était écrit ?`,
        `Observe comment les valeurs changent d’une ligne à l’autre. Que vaut la case « ? » ?`,
      ])
    : randomChoice([
        `Complète le tableau : quelle puissance de 10 remplace « ? » ?`,
        `Dans ce tableau, quelle écriture manque dans la colonne des puissances ?`,
        `${p} a effacé une puissance de 10 du tableau. Laquelle ?`,
      ]);
  const explanation = expl(
    `10ⁿ (n positif) s’écrit 1 suivi de n zéros ; 10⁰ = 1 ; 10⁻ⁿ = 1/10ⁿ s’écrit avec le chiffre 1 au n-ième rang après la virgule.`,
    o.negatifs
      ? `D’une ligne à la suivante, l’exposant augmente de 1 et la valeur est multipliée par 10 ; en remontant, on divise par 10. Sous 10⁰ = 1 viennent 0,1 ; 0,01 ; 0,001…`
      : `D’une ligne à la suivante, l’exposant augmente de 1 et on ajoute un zéro : on multiplie par 10.`,
    `${dixAffiche(k)} = ${dixValeur(k)}.`,
    `La case manquante est ${trouValeur ? dixValeur(k) : dixAffiche(k)}.`
  );
  const canvas = {
    kind: "tableau_donnees",
    headers: ["Puissance de 10", "Écriture décimale"],
    rows,
    highlight: { cell: { row: i, col: trouValeur ? 1 : 0 } },
  } as any;
  if (trouValeur && k >= 0)
    return { text, format: "short", expected: [String(10 ** k), dixValeur(k)], comparator: "number_equal", canvas, explanation };
  if (trouValeur) {
    const v = dixValeur(k);
    return {
      text,
      format: "qcm",
      choices: makeChoices(v, [dixValeur(k - 1), dixValeur(k + 1), `−${fr(10 ** -k)}`, fr(10 ** -k)]),
      expected: [v],
      comparator: "mcq_exact",
      canvas,
      explanation,
    };
  }
  const correct = dixAffiche(k);
  return {
    text,
    format: "qcm",
    choices: makeChoices(correct, [dixAffiche(k + 1), dixAffiche(k - 1), k !== 0 ? dixAffiche(-k) : dixAffiche(5), `10 × ${Math.abs(k) || 1}`]),
    expected: [correct],
    comparator: "mcq_exact",
    canvas,
    explanation,
  };
}
