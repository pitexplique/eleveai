// Puissance d'un produit et d'un quotient : (ab)ⁿ = aⁿbⁿ, (a/b)ⁿ = aⁿ/bⁿ (07/11/2026).
//
// Frédéric, en lisant que le coach ne proposait pas (2/3)³ : « dommage ». Le coach
// n'avait que des bases entières, et aⁿ × bⁿ seulement en vrai ou faux. Le programme
// de seconde demande les « règles de calcul sur les puissances entières relatives »
// et des calculs avec écritures fractionnaires ; le Maroc écrit (a/b)ⁿ en toutes
// lettres, la Belgique et la Suisse demandent des bases fractionnaires ou décimales.
//
// Pas de `lib/canvas` ici : un dessin donnerait la réponse d'un « calcule ».

import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { exposant, type OptsPuissances } from "@/lib/tutor-v4/questionBank/puissances-regles-commun";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
const shuffle = <T,>(arr: readonly T[]): T[] => melangeEnPlace([...arr]);

/** Un choix de QCM : ce qu'on lit, et la valeur qu'il vaut. */
type Choix = { t: string; v: number };
const proche = (x: number, y: number) => Math.abs(x - y) < 1e-9;

/** ⛔ Jamais deux choix de même valeur : ni entre pièges, ni avec la bonne réponse. */
function qcm(text: string, bon: Choix, pieges: Choix[], explanation: string): TutorGeneratedQuestionV4 {
  const gardes: Choix[] = [];
  for (const p of shuffle(pieges)) {
    if (proche(p.v, bon.v) || p.t === bon.t) continue;
    if (gardes.some((g) => proche(g.v, p.v) || g.t === p.t)) continue;
    gardes.push(p);
    if (gardes.length === 3) break;
  }
  return {
    text,
    format: "qcm",
    choices: shuffle([bon.t, ...gardes.map((g) => g.t)]),
    expected: [bon.t],
    comparator: "mcq_exact",
    explanation,
  };
}

const expl = (definition: string, methode: string, calcul: string, conclusion: string) =>
  `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;

const P = (b: string | number, n: number) => `${b}${exposant(n)}`;
const F = (a: number, b: number) => `$\\dfrac{${a}}{${b}}$`;
const PF = (a: number, b: number, n: number) => `$\\left(\\dfrac{${a}}{${b}}\\right)^{${n}}$`;
const QP = (a: number, b: number, n: number) => `$\\dfrac{${a}^{${n}}}{${b}^{${n}}}$`;
const fr = (x: number) => String(Math.round(x * 1e9) / 1e9).replace(".", ",");
const ch = (a: number, b: number): Choix => ({ t: F(a, b), v: a / b });

const PRENOMS = ["Inès", "Lucas", "Maëlys", "Yanis", "Chloé", "Noah", "Léa", "Sacha", "Emma", "Rayan", "Jade", "Aya"] as const;
const LETTRES = ["A", "B", "C", "D", "E", "G", "K", "M", "N", "P"] as const;
const VARIABLES = ["x", "a", "t", "y", "z"] as const;

/** Fractions irréductibles, différentes de 1 et d'un entier. */
const FRACTIONS: readonly [number, number][] = [
  [1, 2], [1, 3], [2, 3], [3, 2], [3, 4], [4, 3], [1, 4], [2, 5], [5, 2], [3, 5],
  [5, 3], [4, 5], [5, 4], [1, 5], [5, 6], [6, 5], [2, 7], [3, 7], [7, 2], [1, 10], [3, 10], [7, 10],
];

const DEF_PRODUIT = `(a × b)ⁿ = aⁿ × bⁿ : la puissance d’un PRODUIT est le produit des puissances. L’exposant s’applique à CHAQUE facteur.`;
const DEF_QUOTIENT = `(a/b)ⁿ = aⁿ/bⁿ (b ≠ 0) : la puissance d’un QUOTIENT est le quotient des puissances. L’exposant s’applique au numérateur ET au dénominateur.`;

/* ---------------------------------------------------------------- produit */

/** aⁿ × bⁿ et (ab)ⁿ, dans les deux sens, avec nombres ou lettre. */
export function genPuissanceProduit(_o: OptsPuissances): TutorGeneratedQuestionV4 {
  const mode = randomChoice(["regrouper", "astuce", "litteral", "developper"] as const);
  const p = randomChoice(PRENOMS);
  const L = randomChoice(LETTRES);

  if (mode === "regrouper") {
    const a = randomInt(2, 6);
    let b = randomInt(2, 7);
    if (b === a) b += 1;
    const n = randomInt(2, 5);
    const e = `${P(a, n)} × ${P(b, n)}`;
    const bon = P(a * b, n);
    return qcm(
      randomChoice([
        `Écris ${e} sous la forme d’une seule puissance.`,
        `${e} est égal à :`,
        `Quelle puissance est égale à ${e} ?`,
        `On pose ${L} = ${e}. Écris ${L} avec un seul exposant.`,
        `${p} veut regrouper ${e} en une seule puissance. Quelle réponse est juste ?`,
        `Les exposants sont égaux dans ${e}. Quelle écriture peut-on en déduire ?`,
        `Parmi ces écritures, laquelle est égale à ${e} ?`,
        `Réécris ${e} avec une seule base.`,
      ]),
      { t: bon, v: (a * b) ** n },
      [
        { t: P(a * b, 2 * n), v: (a * b) ** (2 * n) },
        { t: P(a + b, n), v: (a + b) ** n },
        { t: P(a * b, n + 1), v: (a * b) ** (n + 1) },
        { t: P(a + b, 2 * n), v: (a + b) ** (2 * n) },
        { t: P(a, b * n), v: a ** (b * n) },
      ],
      expl(DEF_PRODUIT, `Les exposants sont les mêmes : on garde l’exposant et on multiplie les bases. ⚠️ Rien ne s’additionne.`, `${e} = (${a} × ${b})${exposant(n)} = ${bon}.`, `${e} = ${bon}.`),
    );
  }

  if (mode === "astuce") {
    const [a, b] = randomChoice([[2, 5], [5, 2], [4, 5], [5, 4], [2, 50], [4, 25], [25, 4], [5, 20], [20, 5], [8, 5]] as const);
    const n = a * b >= 100 ? 2 : randomInt(2, 4);
    const e = `${P(a, n)} × ${P(b, n)}`;
    const val = (a * b) ** n;
    return {
      text: randomChoice([
        `Sans calculatrice, calcule ${e}.`,
        `Regroupe les facteurs pour calculer ${e}.`,
        `Combien vaut ${e} ? Cherche d’abord le produit des bases.`,
        `${p} remarque que ${a} × ${b} = ${a * b}. Que vaut alors ${e} ?`,
        `On pose ${L} = ${e}. Donne la valeur de ${L}.`,
        `Trouve la valeur de ${e} en une seule étape.`,
      ]),
      format: "short",
      expected: [String(val)],
      comparator: "number_equal",
      explanation: expl(DEF_PRODUIT, `Même exposant : on multiplie d’abord les bases, le calcul devient simple.`, `${e} = (${a} × ${b})${exposant(n)} = ${P(a * b, n)} = ${val}.`, `${e} = ${val}.`),
    };
  }

  if (mode === "litteral") {
    const k = randomInt(2, 7);
    const n = k > 4 ? 2 : randomInt(2, 3);
    const x = randomChoice(VARIABLES);
    const e = `(${k}${x})${exposant(n)}`;
    const bon = `${k ** n}${P(x, n)}`;
    // La valeur sert à écarter les doublons : on l'évalue en x = 3.
    const val = (c: number, m: number) => c * 3 ** m;
    return qcm(
      randomChoice([
        `Développe ${e}.`,
        `${e} est égal à :`,
        `Quelle expression est égale à ${e} ?`,
        `Écris ${e} sans parenthèses.`,
        `Sur sa copie, ${p} doit enlever les parenthèses de ${e}. Quelle réponse est juste ?`,
        `On pose ${L} = ${e}. Quelle écriture de ${L} convient ?`,
        `Parmi ces expressions, laquelle est égale à ${e} ?`,
        `Simplifie ${e}.`,
      ]),
      { t: bon, v: val(k ** n, n) },
      [
        { t: `${k}${P(x, n)}`, v: val(k, n) },
        { t: `${k * n}${P(x, n)}`, v: val(k * n, n) },
        { t: `${k ** n}${x}`, v: val(k ** n, 1) },
        { t: `${k * n}${x}`, v: val(k * n, 1) },
        { t: `${k ** n}${P(x, n + 1)}`, v: val(k ** n, n + 1) },
      ],
      expl(DEF_PRODUIT, `${k}${x} est un produit : l’exposant porte sur ${k} ET sur ${x}. ⚠️ Oublier le ${k} est l’erreur la plus fréquente.`, `${e} = ${P(k, n)} × ${P(x, n)} = ${bon}.`, `${e} = ${bon}.`),
    );
  }

  const a = randomInt(2, 7);
  let b = randomInt(2, 9);
  if (b === a) b += 1;
  const n = randomInt(2, 3);
  const e = `(${a} × ${b})${exposant(n)}`;
  const bon = `${P(a, n)} × ${P(b, n)}`;
  return qcm(
    randomChoice([
      `Quelle écriture est égale à ${e} ?`,
      `${e} est égal à :`,
      `Répartis l’exposant dans ${e}.`,
      `${p} veut distribuer l’exposant de ${e}. Quelle écriture est juste ?`,
      `On pose ${L} = ${e}. Écris ${L} comme un produit de deux puissances.`,
      `Transforme ${e} en un produit de deux puissances.`,
    ]),
    { t: bon, v: (a * b) ** n },
    [
      { t: `${a} × ${P(b, n)}`, v: a * b ** n },
      { t: `${P(a, n)} × ${b}`, v: a ** n * b },
      { t: `${P(a, n)} + ${P(b, n)}`, v: a ** n + b ** n },
      { t: `${a * n} × ${b * n}`, v: a * n * b * n },
      { t: `${P(a, n + 1)} × ${P(b, n + 1)}`, v: (a * b) ** (n + 1) },
    ],
    expl(DEF_PRODUIT, `L’exposant s’applique à chaque facteur de la parenthèse.`, `${e} = ${bon}.`, `${e} = ${bon}.`),
  );
}

/* --------------------------------------------------------------- quotient */

/** (a/b)ⁿ : valeur, regroupement, astuce, lettre ; exposant négatif si `negatifs`. */
export function genPuissanceQuotient(o: OptsPuissances): TutorGeneratedQuestionV4 {
  const modes = ["valeur", "valeur", "tapee", "regrouper", "astuce", "litteral"] as const;
  const tirage = Math.random();
  const mode = o.negatifs && tirage < 0.25 ? "negatif" : o.negatifs && tirage < 0.5 ? "base_negative" : randomChoice(modes);
  const p = randomChoice(PRENOMS);
  const L = randomChoice(LETTRES);
  const [a, b] = randomChoice(FRACTIONS);
  const n = b === 10 || a === 10 || a > 5 || b > 5 ? 2 : randomInt(2, 3);
  const e = PF(a, b, n);
  const an = a ** n;
  const bn = b ** n;

  if (mode === "valeur") {
    return qcm(
      randomChoice([
        `Calcule ${e}.`,
        `${e} est égal à :`,
        `Que vaut ${e} ?`,
        `Parmi ces fractions, laquelle est égale à ${e} ?`,
        `On pose ${L} = ${e}. Quelle est la valeur de ${L} ?`,
        `${p} calcule ${e}. Quelle réponse doit-on trouver ?`,
        `Donne ${e} sous forme d’une seule fraction.`,
        `Sans calculatrice, que vaut ${e} ?`,
      ]),
      ch(an, bn),
      [ch(an, b), ch(a, bn), ch(a * n, b * n), ch(a * n, b), ch(an, b * n), ch(bn, an)],
      expl(DEF_QUOTIENT, `On élève le numérateur et le dénominateur à la puissance ${n}. ⚠️ On ne multiplie pas par ${n}.`, `${e} = ${QP(a, b, n)} = ${F(an, bn)}.`, `${e} = ${F(an, bn)}.`),
    );
  }

  if (mode === "tapee") {
    return {
      text: randomChoice([
        `Écris ${e} sous la forme d’une fraction a/b.`,
        `Calcule ${e} et donne le résultat sous forme de fraction, par exemple 5/9.`,
        `Tape la valeur de ${e} sous forme de fraction.`,
        `On pose ${L} = ${e}. Tape ${L} sous forme de fraction.`,
        `${p} doit écrire ${e} avec une seule barre de fraction. Quelle fraction obtient-on ?`,
      ]),
      format: "short",
      expected: [`${an}/${bn}`],
      comparator: "fraction_decimal_equivalent",
      explanation: expl(DEF_QUOTIENT, `Numérateur et dénominateur à la puissance ${n}.`, `${e} = ${QP(a, b, n)} = ${F(an, bn)}.`, `${e} = ${F(an, bn)}.`),
    };
  }

  if (mode === "regrouper") {
    const q = QP(a, b, n);
    return qcm(
      randomChoice([
        `Écris ${q} sous la forme d’une seule puissance.`,
        `${q} est égal à :`,
        `Quelle écriture est égale à ${q} ?`,
        `Réécris ${q} avec un seul exposant.`,
        `${p} veut regrouper ${q}. Quelle écriture convient ?`,
        `Parmi ces écritures, laquelle est égale à ${q} ?`,
      ]),
      { t: PF(a, b, n), v: (a / b) ** n },
      [
        { t: PF(b, a, n), v: (b / a) ** n },
        { t: PF(a, b, 2 * n), v: (a / b) ** (2 * n) },
        { t: PF(a, b, n + 1), v: (a / b) ** (n + 1) },
        { t: F(a, b), v: a / b },
        { t: PF(b, a, 2 * n), v: (b / a) ** (2 * n) },
      ],
      expl(DEF_QUOTIENT, `Même exposant en haut et en bas : on le garde, et on écrit le quotient des bases.`, `${q} = ${e}.`, `${q} = ${e}.`),
    );
  }

  if (mode === "astuce") {
    const c = randomInt(2, 5);
    const d = randomInt(2, 7);
    const m = randomInt(2, 3);
    const q = QP(c * d, d, m);
    const val = c ** m;
    return {
      text: randomChoice([
        `Sans calculatrice, calcule ${q}.`,
        `Combien vaut ${q} ? Commence par diviser les bases.`,
        `${p} remarque que ${c * d} ÷ ${d} = ${c}. Que vaut alors ${q} ?`,
        `On pose ${L} = ${q}. Donne la valeur de ${L}.`,
        `Trouve la valeur de ${q} sans calculer ${c * d}${exposant(m)}.`,
      ]),
      format: "short",
      expected: [String(val)],
      comparator: "number_equal",
      explanation: expl(DEF_QUOTIENT, `Même exposant : on divise d’abord les bases, le calcul devient simple.`, `${q} = ${PF(c * d, d, m)} = ${P(c, m)} = ${val}.`, `${q} = ${val}.`),
    };
  }

  if (mode === "litteral") {
    const x = randomChoice(VARIABLES);
    const k = randomInt(2, 7);
    const m = k > 4 ? 2 : randomInt(2, 3);
    const lit = `$\\left(\\dfrac{${x}}{${k}}\\right)^{${m}}$`;
    const f = (haut: string, bas: number) => `$\\dfrac{${haut}}{${bas}}$`;
    const val = (c: number, q: number) => c ** q; // c = la puissance de x évaluée en 3
    const bon = f(`${x}^{${m}}`, k ** m);
    return qcm(
      randomChoice([
        `Écris ${lit} sans parenthèses.`,
        `${lit} est égal à :`,
        `Quelle expression est égale à ${lit} ?`,
        `${p} doit enlever les parenthèses de ${lit}. Quelle réponse est juste ?`,
        `On pose ${L} = ${lit}. Quelle écriture de ${L} convient ?`,
        `Simplifie l’écriture de ${lit}.`,
      ]),
      { t: bon, v: val(3, m) / k ** m },
      [
        { t: f(`${x}^{${m}}`, k), v: val(3, m) / k },
        { t: f(`${x}`, k ** m), v: 3 / k ** m },
        { t: f(`${x}^{${m}}`, k * m), v: val(3, m) / (k * m) },
        { t: f(`${m}${x}`, k * m), v: (3 * m) / (k * m) },
        { t: f(`${m}${x}`, k ** m), v: (3 * m) / k ** m },
      ],
      expl(DEF_QUOTIENT, `L’exposant porte sur ${x} ET sur ${k}.`, `${lit} = ${f(`${x}^{${m}}`, k ** m)}.`, `${lit} = ${bon}.`),
    );
  }

  if (mode === "base_negative") {
    // Base négative : le signe dépend de la parité de l'exposant.
    const m = a > 5 || b > 5 ? 2 : randomInt(2, 3);
    const signe = m % 2 === 0 ? 1 : -1;
    const base = `$\\left(-\\dfrac{${a}}{${b}}\\right)^{${m}}$`;
    const pos = (h: number, d: number): Choix => ch(h, d);
    const neg = (h: number, d: number): Choix => ({ t: `$-\\dfrac{${h}}{${d}}$`, v: -h / d });
    const av = (h: number, d: number) => (signe > 0 ? pos(h, d) : neg(h, d));
    const contraire = (h: number, d: number) => (signe > 0 ? neg(h, d) : pos(h, d));
    const r = av(a ** m, b ** m);
    return qcm(
      randomChoice([
        `Calcule ${base}.`,
        `${base} est égal à :`,
        `Que vaut ${base} ?`,
        `On pose ${L} = ${base}. Quelle est la valeur de ${L} ?`,
        `${p} calcule ${base}. Quelle réponse est juste ?`,
        `Attention au signe : que vaut ${base} ?`,
        `Parmi ces fractions, laquelle est égale à ${base} ?`,
      ]),
      r,
      [contraire(a ** m, b ** m), av(a ** m, b), av(a * m, b * m), contraire(a ** m, b), av(a, b ** m), contraire(a * m, b * m)],
      expl(
        `${DEF_QUOTIENT} Le signe − fait partie de la base : il est multiplié ${m} fois.`,
        `Un nombre PAIR de facteurs négatifs donne un résultat positif, un nombre IMPAIR un résultat négatif. Ici, l’exposant ${m} est ${m % 2 === 0 ? "pair" : "impair"}.`,
        `${base} = ${r.t}.`,
        `${base} = ${r.t}.`,
      ),
    );
  }

  // Exposant négatif : (a/b)⁻ⁿ = (b/a)ⁿ.
  const m = randomInt(1, a > 5 || b > 5 ? 2 : 3);
  const neg = `$\\left(\\dfrac{${a}}{${b}}\\right)^{-${m}}$`;
  return qcm(
    randomChoice([
      `Calcule ${neg}.`,
      `${neg} est égal à :`,
      `Que vaut ${neg} ?`,
      `On pose ${L} = ${neg}. Quelle est la valeur de ${L} ?`,
      `${p} calcule ${neg}. Quelle réponse est juste ?`,
      `Écris ${neg} sous forme d’une seule fraction, sans exposant négatif.`,
      `Parmi ces fractions, laquelle est égale à ${neg} ?`,
    ]),
    ch(b ** m, a ** m),
    [
      ch(a ** m, b ** m),
      { t: `$-\\dfrac{${a ** m}}{${b ** m}}$`, v: -((a / b) ** m) },
      { t: `$-\\dfrac{${b ** m}}{${a ** m}}$`, v: -((b / a) ** m) },
      ch(b * m, a * m + 1),
      ch(b ** (m + 1), a ** (m + 1)),
    ],
    expl(
      `a⁻ⁿ = 1/aⁿ : un exposant négatif donne l’INVERSE. Pour une fraction : (a/b)⁻ⁿ = (b/a)ⁿ.`,
      `On retourne la fraction, et l’exposant devient positif. Le résultat reste positif.`,
      `${neg} = ${PF(b, a, m)} = ${F(b ** m, a ** m)}.`,
      `${neg} = ${F(b ** m, a ** m)}.`,
    ),
  );
}

/* ---------------------------------------------------------------- décimal */

/** Une base décimale : (0,5)², (1,5)², (0,2)³. */
export function genPuissanceDecimal(_o: OptsPuissances): TutorGeneratedQuestionV4 {
  const [d, n] = randomChoice([
    [0.5, 2], [0.5, 3], [0.2, 2], [0.2, 3], [0.3, 2], [0.1, 3], [0.4, 2], [0.6, 2], [0.7, 2], [0.8, 2], [0.9, 2], [1.5, 2], [1.2, 2], [2.5, 2], [1.1, 2],
  ] as const);
  const p = randomChoice(PRENOMS);
  const L = randomChoice(LETTRES);
  const e = `${fr(d)}${exposant(n)}`;
  const val = Math.round(d ** n * 1e9) / 1e9;
  const facteurs = Array(n).fill(fr(d)).join(" × ");
  const explanation = expl(
    `${fr(d)}${exposant(n)}, c’est ${fr(d)} écrit ${n} fois en facteur.`,
    `On multiplie, sans multiplier ${fr(d)} par ${n}. ⚠️ Un nombre entre 0 et 1 élevé à une puissance devient plus PETIT.`,
    `${e} = ${facteurs} = ${fr(val)}.`,
    `${e} = ${fr(val)}.`,
  );
  if (Math.random() < 0.3)
    return {
      text: randomChoice([
        `Calcule ${e} sans calculatrice.`,
        `Donne l’écriture décimale de ${e}.`,
        `On pose ${L} = ${e}. Tape la valeur de ${L}.`,
        `${p} pose le calcul de ${e}. Quel résultat doit-on trouver ?`,
      ]),
      format: "short",
      expected: [fr(val), String(val)],
      comparator: "number_equal",
      explanation,
    };
  return qcm(
    randomChoice([
      `Que vaut ${e} ?`,
      `${e} est égal à :`,
      `Quelle est l’écriture décimale de ${e} ?`,
      `On pose ${L} = ${e}. Quelle est la valeur de ${L} ?`,
      `${p} calcule ${e}. Quelle réponse est juste ?`,
      `Parmi ces nombres, lequel est égal à ${e} ?`,
      `Sans calculatrice, combien fait ${e} ?`,
    ]),
    { t: fr(val), v: val },
    [d * n, val * 10, val / 10, d + n, d * 10, d].map((x) => ({ t: fr(x), v: x })),
    explanation,
  );
}

/* ------------------------------------------------------------ vrai ou faux */

type Affirmation = { eg: string; vrai: boolean; pourquoi: string };

function affirmation(): Affirmation {
  const a = randomInt(2, 5);
  const b = a + randomInt(1, 3);
  const n = randomInt(2, 3);
  const [c, d] = randomChoice(FRACTIONS.filter(([x, y]) => x < 10 && y < 10));
  const k = randomInt(2, 5);
  const x = randomChoice(VARIABLES);
  return randomChoice<Affirmation>([
    { eg: `(${a} × ${b})${exposant(n)} = ${P(a, n)} × ${P(b, n)}`, vrai: true, pourquoi: `l’exposant s’applique à chaque facteur d’un produit.` },
    { eg: `${PF(c, d, n)} = ${QP(c, d, n)}`, vrai: true, pourquoi: `l’exposant s’applique au numérateur et au dénominateur.` },
    { eg: `${PF(c, d, n)} = $\\dfrac{${c}^{${n}}}{${d}}$`, vrai: false, pourquoi: `le dénominateur aussi prend l’exposant : ${PF(c, d, n)} = ${QP(c, d, n)}.` },
    { eg: `${PF(c, d, n)} = ${F(c * n, d * n)}`, vrai: false, pourquoi: `une puissance n’est pas une multiplication par l’exposant : ${PF(c, d, n)} = ${F(c ** n, d ** n)}.` },
    { eg: `(${a} + ${b})² = ${P(a, 2)} + ${P(b, 2)}`, vrai: false, pourquoi: `la règle vaut pour les produits, jamais pour une somme : ${a + b}² = ${(a + b) ** 2}, alors que ${P(a, 2)} + ${P(b, 2)} = ${a * a + b * b}.` },
    { eg: `${P(a, n)} + ${P(b, n)} = ${P(a + b, n)}`, vrai: false, pourquoi: `une somme de puissances ne se regroupe pas : ${a ** n} + ${b ** n} = ${a ** n + b ** n}, alors que ${P(a + b, n)} = ${(a + b) ** n}.` },
    { eg: `${P(a, n)} × ${P(b, n)} = ${P(a * b, 2 * n)}`, vrai: false, pourquoi: `on garde l’exposant : ${P(a, n)} × ${P(b, n)} = ${P(a * b, n)}.` },
    { eg: `${P(a, n)} × ${P(b, n)} = ${P(a * b, n)}`, vrai: true, pourquoi: `même exposant : on multiplie les bases et on garde l’exposant.` },
    { eg: `(${k}${x})² = ${k}${P(x, 2)}`, vrai: false, pourquoi: `le ${k} prend aussi l’exposant : (${k}${x})² = ${k * k}${P(x, 2)}.` },
    { eg: `(${k}${x})² = ${k * k}${P(x, 2)}`, vrai: true, pourquoi: `l’exposant porte sur ${k} et sur ${x}.` },
  ]);
}

export function genVraiFauxMemeExposant(_o: OptsPuissances): TutorGeneratedQuestionV4 {
  const af = affirmation();
  const p = randomChoice(PRENOMS);
  const text = randomChoice([
    `Vrai ou faux : ${af.eg}.`,
    `${p} affirme que ${af.eg}. Est-ce vrai ?`,
    `Sur sa copie, ${p} a écrit : ${af.eg}. Cette égalité est-elle juste ?`,
    `L’égalité ${af.eg} est-elle vraie ?`,
    `Au tableau, on lit : ${af.eg}. Est-ce exact ?`,
    `Dans un exercice corrigé, on trouve : ${af.eg}. Est-ce correct ?`,
    `Sans calculatrice, dis si l’égalité ${af.eg} est vraie.`,
  ]);
  return {
    text,
    format: "qcm",
    choices: ["Vrai", "Faux"],
    expected: [af.vrai ? "Vrai" : "Faux"],
    comparator: "mcq_exact",
    explanation: expl(
      `(a × b)ⁿ = aⁿ × bⁿ et (a/b)ⁿ = aⁿ/bⁿ. Ces règles valent pour les produits et les quotients, jamais pour les sommes.`,
      `On regarde l’opération dans la parenthèse, puis on applique la règle qui lui correspond.`,
      `${af.vrai ? "C’est juste" : "C’est faux"} : ${af.pourquoi}`,
      `L’égalité ${af.eg} est ${af.vrai ? "vraie" : "fausse"}.`,
    ),
  };
}

/* --------------------------------------------------------------- situations */

/** Des situations où l'on élève vraiment une fraction à une puissance. */
export function genPuissanceFractionContexte(_o: OptsPuissances): TutorGeneratedQuestionV4 {
  const situation = randomChoice(["carre", "cube", "photo", "maquette", "pieces", "de", "reste"] as const);
  const expliquer = (e: string, r: string, intro: string) =>
    expl(DEF_QUOTIENT, intro, `${e} = ${r}.`, `La réponse est ${r}.`);
  const pieges = (a: number, b: number, n: number) => [
    ch(a ** n, b),
    ch(a, b ** n),
    ch(a * n, b * n),
    ch(a * n, b),
    ch(a ** n, b * n),
    ch(b ** n, a ** n),
  ];

  if (situation === "carre") {
    const [a, b] = randomChoice([[2, 3], [3, 4], [1, 2], [3, 2], [2, 5], [5, 4]] as const);
    const e = PF(a, b, 2);
    return qcm(
      randomChoice([
        `Une carreleuse pose une dalle carrée de côté ${F(a, b)} m. Quelle est son aire, en m² ?`,
        `Un jardinier délimite un massif carré de côté ${F(a, b)} m. Quelle surface doit-il planter, en m² ?`,
        `Une designer découpe un panneau carré de ${F(a, b)} m de côté. Quelle est l’aire du panneau, en m² ?`,
      ]),
      ch(a * a, b * b),
      pieges(a, b, 2),
      expliquer(e, F(a * a, b * b), `L’aire d’un carré est côté², donc ${e}.`),
    );
  }
  if (situation === "cube") {
    const [a, b] = randomChoice([[1, 2], [2, 3], [3, 2], [3, 4], [2, 5]] as const);
    const e = PF(a, b, 3);
    return qcm(
      randomChoice([
        `Une bijoutière coule un petit cube d’arête ${F(a, b)} cm. Quel est son volume, en cm³ ?`,
        `Un emballeur prévoit une boîte cubique d’arête ${F(a, b)} m. Quel est son volume, en m³ ?`,
        `Un ingénieur teste une pièce cubique de ${F(a, b)} dm d’arête. Quel est son volume, en dm³ ?`,
      ]),
      ch(a ** 3, b ** 3),
      pieges(a, b, 3),
      expliquer(e, F(a ** 3, b ** 3), `Le volume d’un cube est arête³, donc ${e}.`),
    );
  }
  if (situation === "photo") {
    const [a, b] = randomChoice([[3, 4], [2, 3], [1, 2], [4, 5], [3, 5]] as const);
    const e = PF(a, b, 2);
    return qcm(
      randomChoice([
        `Une graphiste réduit une affiche : chaque longueur est multipliée par ${F(a, b)}. Par quel nombre l’aire est-elle multipliée ?`,
        `Un photographe réduit un tirage à ${F(a, b)} de ses dimensions. Par quel coefficient son aire est-elle multipliée ?`,
      ]),
      ch(a * a, b * b),
      pieges(a, b, 2),
      expliquer(e, F(a * a, b * b), `Quand les longueurs sont multipliées par k, les aires le sont par k².`),
    );
  }
  if (situation === "maquette") {
    const k = randomChoice([2, 3, 4, 5, 10] as const);
    const e = PF(1, k, 3);
    return qcm(
      randomChoice([
        `Une architecte construit une maquette au ${F(1, k)}. Par quel nombre les volumes sont-ils multipliés ?`,
        `Un décorateur de cinéma réduit un bâtiment à l’échelle ${F(1, k)}. Par quel coefficient le volume est-il multiplié ?`,
      ]),
      ch(1, k ** 3),
      [ch(1, k), ch(1, k * k), ch(1, 3 * k), ch(3, k), ch(k ** 3, 1)],
      expliquer(e, F(1, k ** 3), `Quand les longueurs sont multipliées par k, les volumes le sont par k³.`),
    );
  }
  if (situation === "pieces") {
    const n = randomInt(2, 5);
    const e = PF(1, 2, n);
    return qcm(
      randomChoice([
        `On lance ${n} fois une pièce équilibrée. Quelle est la probabilité d’obtenir pile à chaque lancer ?`,
        `Une statisticienne modélise ${n} lancers indépendants d’une pièce équilibrée. Quelle est la probabilité de n’obtenir que des faces ?`,
      ]),
      ch(1, 2 ** n),
      [ch(1, 2 * n), ch(n, 2), ch(n, 2 ** n), ch(2, 2 ** n + 1), ch(1, 2 ** (n + 1))],
      expliquer(e, F(1, 2 ** n), `Les lancers sont indépendants : on multiplie ${n} fois par ${F(1, 2)}.`),
    );
  }
  if (situation === "de") {
    const n = randomInt(2, 3);
    const e = PF(5, 6, n);
    return qcm(
      randomChoice([
        `On lance ${n} fois un dé équilibré à 6 faces. Quelle est la probabilité de n’obtenir aucun 6 ?`,
        `Dans un jeu, il faut éviter le 6 pendant ${n} lancers d’un dé équilibré. Quelle est la probabilité d’y arriver ?`,
      ]),
      ch(5 ** n, 6 ** n),
      pieges(5, 6, n),
      expliquer(e, F(5 ** n, 6 ** n), `À chaque lancer, la probabilité d’éviter le 6 est ${F(5, 6)} ; les lancers sont indépendants.`),
    );
  }
  const [a, b] = randomChoice([[3, 4], [2, 3], [4, 5], [1, 2]] as const);
  const n = randomInt(2, 3);
  const e = PF(a, b, n);
  return qcm(
    randomChoice([
      `Chaque jour, une pharmacienne constate qu’il reste ${F(a, b)} de la quantité de médicament de la veille dans l’organisme. Quelle fraction reste-t-il au bout de ${n} jours ?`,
      `Chaque filtre d’une station d’épuration laisse passer ${F(a, b)} des particules. Quelle fraction passe après ${n} filtres ?`,
    ]),
    ch(a ** n, b ** n),
    pieges(a, b, n),
    expliquer(e, F(a ** n, b ** n), `On multiplie ${n} fois par ${F(a, b)}, c’est une puissance.`),
  );
}
