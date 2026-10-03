// lib/tutor-v4/question-banks/maths/3e/calcul_litteral.bank.ts
//
// ⭐ 03/10/2026 — DES QUESTIONS QUI NE REVIENNENT PLUS. Mesuré ce jour-là
// (scripts/mesurer-squelettes-coach.ts 3e litteral_calcul) : 6 à 13 squelettes
// d'énoncés par micro, 13 à 19 répétitions sur 20 questions. Les gabarits
// changeaient les nombres, jamais la phrase. Chaque gabarit compose maintenant
// une FORME d'expression (nombre de termes, signes, place des parenthèses), une
// LETTRE (x, y, t, n, z, u, m, p), une CONSIGNE (« Factorise », « Écris sous la
// forme d'un produit », « On pose A = … ») et, pour une partie des tirages, une
// courte mise en situation (aire d'un jardin, programme de calcul, prix…).
//
// ⭐ LES TROIS FORMES DE FACTORISATION DE 3e (demande de Frédéric, 03/10) :
//   1. un facteur commun : 6x + 9 = 3(2x + 3), 2x² + 6x = 2x(x + 3),
//      une parenthèse commune : (x + 1)(2x - 3) + (x + 1)(x + 4) = (x + 1)(3x + 1) ;
//   2. le carré d'une somme ou d'une différence : x² + 6x + 9 = (x + 3)² ;
//   3. la différence de deux carrés : x² - 25 = (x - 5)(x + 5).
// Elles sont dans `litteral_factoriser` (★2 facteur commun, ★3 premières
// identités, ★4 parenthèse commune, (2x - 3)², 9x² - 16, (x + 2)² - 9, et
// « quelle méthode ? »), reprises dans `litteral_identite` et `litteral_defi`.
// Les items « 3e_litteral_factoriser_identite_* », « 3e_litteral_factorisation_defi_* »
// et « 3e_litteral_factoriser_verifier_* » viennent de la 4e (retirés le 30/09 :
// la factorisation par identité n'y est pas au programme).
//
// ⛔ CORRECTIONS : « Factorise » → `expression_factorisee`, « Développe / Réduis »
// → `expression_developpee`, une valeur → `number_equal`. Jamais
// `contains_keyword` sur une réponse chiffrée (« 3x + 67 » passait pour 3x + 6).

import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

/* =========================
   HELPERS
========================= */

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
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

/** Un entier non nul tiré entre min et max. */
function nonNul(min: number, max: number) {
  let n = 0;
  while (n === 0) n = randomInt(min, max);
  return n;
}

/** Le plus grand diviseur commun (positif). */
function pgcdDe(u: number, v: number): number {
  return v === 0 ? Math.abs(u) : pgcdDe(v, u % v);
}

/** Un entier tiré entre min et max, ni 0, ni 1, ni -1 (un coefficient qui se voit). */
function nonUn(min: number, max: number) {
  let n = 0;
  while (Math.abs(n) <= 1) n = randomInt(min, max);
  return n;
}

// La lettre : x le plus souvent, comme en classe, mais pas toujours.
// ⚠️ Ni « a » ni « b » : ce sont les lettres des formules (a + b)² = a² + 2ab + b².
const LETTRES = ["x", "x", "x", "y", "t", "n", "z", "u", "m", "p"] as const;
const LETTRES_SEULES = ["x", "y", "t", "n", "z", "u", "m", "p"] as const;
function lettre(): string {
  return randomChoice(LETTRES);
}
function autreLettre(L: string): string {
  return randomChoice(LETTRES_SEULES.filter((l) => l !== L));
}

const NOMS = ["A", "B", "C", "D", "E", "F", "G", "K"] as const;
const PRENOMS = [
  "Léa", "Hugo", "Inès", "Noah", "Jade", "Tom", "Lina", "Sacha",
  "Maëlys", "Yanis", "Chloé", "Rayan", "Emma", "Nathan", "Zoé",
] as const;

/** Un nombre à la française : virgule décimale, espace des milliers. */
function fr(n: number): string {
  const [ent, dec] = String(Math.abs(n)).split(".");
  const milliers = ent.length > 4 ? ent.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : ent;
  return `${n < 0 ? "-" : ""}${milliers}${dec ? "," + dec : ""}`;
}

/** Un nombre remplacé dans un calcul : entre parenthèses s'il est négatif. */
function val(n: number): string {
  return n < 0 ? `(${fr(n)})` : fr(n);
}

type Terme = [number, string];

/** Une somme de termes écrite proprement : [[3, "x²"], [-1, "x"], [5, ""]] → « 3x² - x + 5 ». */
function somme(termes: readonly Terme[]): string {
  let s = "";
  for (const [c, p] of termes) {
    if (c === 0) continue;
    const abs = Math.abs(c);
    const corps = p && abs === 1 ? p : `${fr(abs)}${p}`;
    if (!s) s = c < 0 ? `-${corps}` : corps;
    else s += c < 0 ? ` - ${corps}` : ` + ${corps}`;
  }
  return s || "0";
}

/** aL + b */
function lin(a: number, b: number, L: string): string {
  return somme([[a, L], [b, ""]]);
}

/** AL² + BL + C */
function quad(A: number, B: number, C: number, L: string): string {
  return somme([[A, `${L}²`], [B, L], [C, ""]]);
}

/** Regroupe les termes semblables ; renvoie la forme réduite et le détail. */
function regrouper(termes: readonly Terme[]) {
  const ordre: string[] = [];
  const total: Record<string, number> = {};
  for (const [c, p] of termes) {
    if (!(p in total)) {
      ordre.push(p);
      total[p] = 0;
    }
    total[p] += c;
  }
  const details = ordre.map((p) => {
    const groupe = termes.filter((t) => t[1] === p);
    const nom = p === "" ? "les nombres" : `les termes en ${p}`;
    return groupe.length === 1
      ? `${nom} : ${somme(groupe)}`
      : `${nom} : ${somme(groupe)} = ${somme([[total[p], p]])}`;
  });
  const rang = (p: string) => (p.endsWith("³") ? 0 : p.endsWith("²") ? 1 : p === "" ? 3 : 2);
  const reduit = somme(
    [...ordre].sort((u, v) => rang(u) - rang(v)).map((p) => [total[p], p] as Terme),
  );
  const nuls = ordre.some((p) => total[p] === 0);
  return { reduit, details: details.join(" ; "), nuls };
}

/* ---------- Les consignes, plusieurs façons de dire la même chose ---------- */

/** Une formule et sa question, présentées de trois façons. */
function varierFormule(s: string, q: string, rappel = true): string {
  const debut = s.charAt(0).toLowerCase() + s.slice(1);
  const que = /^[aeiouyéh]/i.test(debut) && !/^h[aeiou]/.test(debut) ? "qu’" : "que ";
  const formes = [() => `${s} ${q}`, () => `On sait ${que}${debut} ${q}`];
  // « Rappel : » ne va qu'à une formule connue, pas à une histoire.
  if (rappel) formes.push(() => `Rappel : ${debut} ${q}`);
  return randomChoice(formes)();
}

function consigneFactoriser(e: string): string {
  const N = randomChoice(NOMS);
  return randomChoice([
    () => `Factorise ${e}.`,
    () => `Factoriser : ${e}`,
    () => `Écris ${e} sous la forme d’un produit.`,
    () => `Donne une forme factorisée de ${e}.`,
    () => `Transforme ${e} en un produit de facteurs.`,
    () => `On pose ${N} = ${e}. Factorise ${N}.`,
    () => `Factorise l’expression ${N} = ${e}.`,
  ])();
}

function consigneDevelopper(e: string, produit = true): string {
  const N = randomChoice(NOMS);
  const tournures = [
    () => `Développe et réduis ${e}.`,
    () => `Développer et réduire : ${e}`,
    () => `Donne la forme développée et réduite de ${e}.`,
    () => `Écris ${e} sans parenthèses, puis réduis.`,
    () => `On pose ${N} = ${e}. Développe et réduis ${N}.`,
    () => `Développe ${e}, puis réduis le résultat.`,
  ];
  if (produit) tournures.push(() => `Transforme le produit ${e} en une somme réduite.`);
  return randomChoice(tournures)();
}

function consigneReduire(e: string): string {
  const N = randomChoice(NOMS);
  return randomChoice([
    () => `Réduis ${e}.`,
    () => `Réduire : ${e}`,
    () => `Écris ${e} sous forme réduite.`,
    () => `Simplifie l’écriture de ${e} en regroupant les termes semblables.`,
    () => `On pose ${N} = ${e}. Réduis ${N}.`,
    () => `Donne l’écriture la plus courte possible de ${e}.`,
  ])();
}

/** `valeurs` : « x = 3 » ou « x = -2 et y = 5 ». */
function consigneSubstituer(e: string, valeurs: string, lettreSeule: string): string {
  const N = randomChoice(NOMS);
  return randomChoice([
    () => `Calcule ${e} pour ${valeurs}.`,
    () => `Calculer la valeur de ${e} lorsque ${valeurs}.`,
    () => `Que vaut ${e} quand ${valeurs} ?`,
    () => `Donne la valeur de ${e} pour ${valeurs}.`,
    () => `Si ${valeurs}, combien vaut ${e} ?`,
    () => `On pose ${N} = ${e}. Calcule ${N} pour ${valeurs}.`,
    () => `Remplace ${lettreSeule} par sa valeur (${valeurs}) dans ${e}. Quel nombre obtiens-tu ?`,
  ])();
}

/* ---------- Factorisations toutes faites (énoncé, réponse, détail) ---------- */

type Facto = { e: string; f: string; calcul: string; methode: string };

/** k·a L + k·b : facteur commun numérique (6x + 9 = 3(2x + 3)). */
function factoNumerique(L: string): Facto {
  const k = randomInt(2, 9);
  let a = randomInt(1, 5);
  let b = nonNul(-9, 9);
  // le facteur k doit être LE plus grand facteur commun
  const pgcd = (u: number, v: number): number => (v === 0 ? Math.abs(u) : pgcd(v, u % v));
  while (pgcd(a, b) !== 1) {
    a = randomInt(1, 5);
    b = nonNul(-9, 9);
  }
  const constanteDevant = Math.random() < 0.25 && b > 0;
  const e = constanteDevant ? somme([[k * b, ""], [k * a, L]]) : lin(k * a, k * b, L);
  const interieur = constanteDevant ? somme([[b, ""], [a, L]]) : lin(a, b, L);
  const f = `${k}(${interieur})`;
  return {
    e,
    f,
    calcul: `le facteur commun est ${k} : ${e} = ${k} × ${a === 1 ? L : `${a}${L}`} ${b < 0 ? "-" : "+"} ${k} × ${Math.abs(b)} = ${f}`,
    methode: "un facteur commun",
  };
}

/** a L² + b L avec un facteur commun k L (2x² + 6x = 2x(x + 3)). */
function factoLitterale(L: string): Facto {
  const k = randomChoice([1, 1, 2, 3, 4, 5]);
  // a et b premiers entre eux : le facteur mis devant est bien le PLUS GRAND
  // (6m² - 18m = 6m(m - 3), pas 2m(3m - 9)).
  let a = randomInt(1, 4);
  let b = nonNul(-9, 9);
  while (pgcdDe(a, b) !== 1) {
    a = randomInt(1, 4);
    b = nonNul(-9, 9);
  }
  const kL = k === 1 ? L : `${k}${L}`;
  const e = quad(k * a, k * b, 0, L);
  const f = `${kL}(${lin(a, b, L)})`;
  return {
    e,
    f,
    calcul: `le facteur commun est ${kL} : ${e} = ${kL} × ${a === 1 ? L : `${a}${L}`} ${b < 0 ? "-" : "+"} ${kL} × ${Math.abs(b)} = ${f}`,
    methode: "un facteur commun",
  };
}

/** L² ± 2bL + b², ou c²L² ± 2cbL + b² : le carré d'une somme ou d'une différence. */
function factoCarre(L: string, avecCoefficient: boolean, signe?: 1 | -1): Facto {
  const c = avecCoefficient ? randomInt(2, 5) : 1;
  // b premier avec c : sinon (4x + 8)² cache un facteur commun 16.
  let b = randomInt(1, 9);
  while (pgcdDe(c, b) !== 1) b = randomInt(1, 9);
  const s = signe ?? randomChoice([1, -1]);
  const cL = c === 1 ? L : `${c}${L}`;
  const e = quad(c * c, 2 * c * b * s, b * b, L);
  const f = `(${lin(c, s * b, L)})²`;
  return {
    e,
    f,
    calcul:
      `${c === 1 ? "" : `${c * c}${L}² = (${cL})², `}${b * b} = ${b}² et ${2 * c * b}${L} = 2 × ${cL} × ${b} : ` +
      `on reconnaît a² ${s > 0 ? "+" : "-"} 2ab + b² = (a ${s > 0 ? "+" : "-"} b)² avec a = ${cL} et b = ${b}, donc ${e} = ${f}`,
    methode: s > 0 ? "le carré d’une somme" : "le carré d’une différence",
  };
}

/** c²L² - b² : la différence de deux carrés. */
function factoDifferenceCarres(L: string, avecCoefficient: boolean): Facto {
  const c = avecCoefficient ? randomInt(2, 5) : 1;
  // b premier avec c : 4x² - 16 cache un facteur commun 4.
  let b = randomInt(1, 12);
  while (pgcdDe(c, b) !== 1) b = randomInt(1, 12);
  const cL = c === 1 ? L : `${c}${L}`;
  const inverse = !avecCoefficient && Math.random() < 0.25;
  const e = inverse ? `${b * b} - ${L}²` : `${c === 1 ? "" : c * c}${L}² - ${b * b}`;
  const f = inverse ? `(${b} - ${L})(${b} + ${L})` : `(${lin(c, -b, L)})(${lin(c, b, L)})`;
  return {
    e,
    f,
    calcul: inverse
      ? `${b * b} = ${b}² : on reconnaît a² - b² = (a - b)(a + b) avec a = ${b} et b = ${L}, donc ${e} = ${f}`
      : `${c === 1 ? "" : `${c * c}${L}² = (${cL})² et `}${b * b} = ${b}² : on reconnaît a² - b² = (a - b)(a + b) avec a = ${cL} et b = ${b}, donc ${e} = ${f}`,
    methode: "la différence de deux carrés",
  };
}

/** (L + c)² - b² : une différence de deux carrés dont le premier est une parenthèse. */
function factoDifferenceParenthese(L: string): Facto {
  const c = nonNul(-6, 6);
  let b = randomInt(1, 9);
  while (b === Math.abs(c)) b = randomInt(1, 9);
  const e = `(${lin(1, c, L)})² - ${b * b}`;
  const f = `(${lin(1, c - b, L)})(${lin(1, c + b, L)})`;
  return {
    e,
    f,
    calcul:
      `${b * b} = ${b}² : on reconnaît a² - b² = (a - b)(a + b) avec a = ${lin(1, c, L)} et b = ${b}. ` +
      `${e} = (${lin(1, c, L)} - ${b})(${lin(1, c, L)} + ${b}) = ${f}`,
    methode: "la différence de deux carrés",
  };
}

/** F × G1 ± F × G2 : une parenthèse commune. */
function factoParentheseCommune(L: string): Facto {
  for (;;) {
    const p = nonNul(-6, 6);
    const F = `(${lin(1, p, L)})`;
    const b = randomInt(1, 4);
    const c = nonNul(-7, 7);
    const d = randomInt(1, 4);
    const e2 = nonNul(-7, 7);
    const signe = randomChoice([1, -1]);
    const forme = randomChoice(["FG+FG", "GF+FG", "F2+FG", "kF+FG"]);
    const G1 = `(${lin(b, c, L)})`;
    const G2 = `(${lin(d, e2, L)})`;
    const op = signe > 0 ? "+" : "-";
    let e: string;
    let ia: number;
    let ib: number;
    if (forme === "FG+FG") {
      e = `${F}${G1} ${op} ${F}${G2}`;
      ia = b + signe * d;
      ib = c + signe * e2;
    } else if (forme === "GF+FG") {
      e = `${G1}${F} ${op} ${F}${G2}`;
      ia = b + signe * d;
      ib = c + signe * e2;
    } else if (forme === "F2+FG") {
      e = `${F}² ${op} ${F}${G2}`;
      ia = 1 + signe * d;
      ib = p + signe * e2;
    } else {
      const k = randomInt(2, 9);
      e = `${k}${F} ${op} ${F}${G2}`;
      ia = signe * d;
      ib = k + signe * e2;
    }
    // Le second facteur ne doit plus rien cacher : (x + 2)(-3x - 6) se
    // factoriserait encore par -3. On écrit aussi (3 - 2x) plutôt que (-2x + 3).
    if (ia === 0 || ib === 0 || pgcdDe(ia, ib) !== 1) continue;
    const f =
      ia < 0 && ib < 0
        ? `-${F}(${lin(-ia, -ib, L)})`
        : ia < 0
        ? `${F}(${somme([[ib, ""], [ia, L]])})`
        : `${F}(${lin(ia, ib, L)})`;
    const premier = forme === "F2+FG" ? F : forme === "kF+FG" ? e.split(F)[0] : G1;
    return {
      e,
      f,
      calcul:
        `la parenthèse ${F} est en facteur dans les deux termes. ${e} = ${F}[${forme === "F2+FG" ? lin(1, p, L) : forme === "kF+FG" ? premier : lin(b, c, L)} ${op} ${signe > 0 ? lin(d, e2, L) : `(${lin(d, e2, L)})`}] = ${f}`,
      methode: "un facteur commun (ici une parenthèse)",
    };
  }
}

function explicationFacto(fa: Facto): string {
  return (
    `Définition : factoriser, c’est écrire une somme (ou une différence) sous la forme d’un produit.\n\n` +
    `Méthode : on utilise ${fa.methode}.\n\n` +
    `Calcul : ${fa.calcul}.\n\n` +
    `Conclusion : ${fa.e} = ${fa.f} ; on le vérifie en développant ${fa.f}.`
  );
}

function questionFacto(fa: Facto, text?: string): TutorGeneratedQuestionV4 {
  return {
    text: text ?? consigneFactoriser(fa.e),
    format: "short",
    expected: [fa.f],
    comparator: "expression_factorisee",
    explanation: explicationFacto(fa),
  };
}

const METHODES = {
  commun: "un facteur commun",
  somme: "le carré d’une somme : a² + 2ab + b² = (a + b)²",
  difference: "le carré d’une différence : a² - 2ab + b² = (a - b)²",
  carres: "la différence de deux carrés : a² - b² = (a - b)(a + b)",
} as const;

/** Développe et explique une identité : (cL + s·b)², ou (cL - b)(cL + b). */
function identite(L: string, c: number, b: number, forme: "somme" | "difference" | "produit") {
  const cL = c === 1 ? L : `${c}${L}`;
  const carre = c === 1 ? `${L}²` : `(${cL})²`;
  if (forme === "produit") {
    return {
      e: `(${lin(c, -b, L)})(${lin(c, b, L)})`,
      r: quad(c * c, 0, -b * b, L),
      formule: "(a - b)(a + b) = a² - b²",
      ab: `a = ${cL} et b = ${b}`,
      etapes: `${carre} - ${b}²`,
    };
  }
  const s = forme === "somme" ? 1 : -1;
  return {
    e: `(${lin(c, s * b, L)})²`,
    r: quad(c * c, 2 * c * b * s, b * b, L),
    formule: s > 0 ? "(a + b)² = a² + 2ab + b²" : "(a - b)² = a² - 2ab + b²",
    ab: `a = ${cL} et b = ${b}`,
    etapes: `${carre} ${s > 0 ? "+" : "-"} 2 × ${cL} × ${b} + ${b}²`,
  };
}

function explicationIdentite(e: string, id: ReturnType<typeof identite>): string {
  return (
    `Définition : ${id.formule}.\n\n` +
    `Méthode : on applique l’identité remarquable avec ${id.ab}.\n\n` +
    `Calcul : ${e} = ${id.etapes} = ${id.r}.\n\n` +
    `Conclusion : la forme développée et réduite est ${id.r}.`
  );
}

function consigneIdentite(e: string, formule: string): string {
  return randomChoice([
    () => consigneDevelopper(e),
    () => consigneDevelopper(e),
    () => `Développe ${e} à l’aide d’une identité remarquable.`,
    () => `Utilise une identité remarquable pour développer ${e}.`,
    () => `Développe ${e} en utilisant ${formule}.`,
    () => `Sans poser la double distributivité, développe ${e}.`,
  ])();
}

export const calculLitteralBank: TutorBankItemV4[] = [
  /* =========================
     LITTERAL_COMPRENDRE
  ========================= */

  {
    kind: "fixed",
    id: "3e_litteral_comprendre_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans l’expression 3x + 5, que représente la lettre x ?",
    format: "qcm",
    choices: [
      "un nombre inconnu ou variable",
      "toujours le nombre 3",
      "toujours le nombre 5",
      "un signe de multiplication uniquement",
    ],
    expected: ["un nombre inconnu ou variable"],
    comparator: "mcq_exact",
    hint: "Une lettre peut représenter un nombre qui varie ou que l’on ne connaît pas encore.",
    explanation:
      "Définition : en calcul littéral, une lettre représente un nombre inconnu ou variable.\n\n" +
      "Méthode : on lit l’expression en repérant les nombres et les lettres.\n\n" +
      "Calcul : dans 3x + 5, la lettre x représente un nombre, et 3x signifie 3 × x.\n\n" +
      "Conclusion : x représente un nombre inconnu ou variable.",
    tags: ["litteral", "comprendre", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_comprendre_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Que signifie 4x en calcul littéral ?",
    format: "qcm",
    choices: ["4 × x", "4 + x", "4 - x", "x ÷ 4"],
    expected: ["4 × x"],
    comparator: "mcq_exact",
    hint: "Quand un nombre est collé à une lettre, cela signifie une multiplication.",
    explanation:
      "Définition : en calcul littéral, lorsqu’un nombre est placé devant une lettre, la multiplication est implicite.\n\n" +
      "Méthode : on réécrit l’expression en faisant apparaître le signe ×.\n\n" +
      "Calcul : 4x signifie 4 × x.\n\n" +
      "Conclusion : 4x se lit « 4 multiplié par x ».",
    tags: ["litteral", "notation", "multiplication", "qcm"],
  },

  {
    kind: "template",
    id: "3e_litteral_comprendre_tpl_1_notation",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Un nombre collé à une lettre, ou deux lettres collées, cachent une multiplication.",
    tags: ["litteral", "notation", "template"],
    generate: () => {
      const L = lettre();
      const M = autreLettre(L);
      const a = randomInt(2, 9);
      const b = randomInt(2, 9);
      const cas = randomChoice([
        {
          e: `${a}${L}`,
          bon: `${a} × ${L}`,
          pieges: [`${a} + ${L}`, `${a} - ${L}`, `${L} ÷ ${a}`, `${L} - ${a}`],
          regle: `un nombre collé à une lettre est multiplié par elle`,
        },
        {
          e: `${L}²`,
          bon: `${L} × ${L}`,
          pieges: [`2 × ${L}`, `${L} + ${L}`, `${L} + 2`, `2 + ${L}`],
          regle: `${L}² est le carré de ${L}, c’est-à-dire ${L} multiplié par lui-même`,
        },
        {
          e: `${a}${L}²`,
          bon: `${a} × ${L} × ${L}`,
          pieges: [`${a} × ${L} × 2`, `(${a} × ${L}) × (${a} × ${L})`, `${a} + ${L} × ${L}`, `${a} × ${L} + 2`],
          regle: `le carré ne porte que sur ${L}, puis on multiplie par ${a}`,
        },
        {
          e: `${L}${M}`,
          bon: `${L} × ${M}`,
          pieges: [`${L} + ${M}`, `${L} - ${M}`, `${L} ÷ ${M}`],
          regle: `deux lettres collées sont multipliées`,
        },
        {
          e: `${a}(${L} + ${b})`,
          bon: `${a} × (${L} + ${b})`,
          pieges: [`${a} + (${L} + ${b})`, `${a} × ${L} + ${b}`, `${a} + ${L} + ${b}`],
          regle: `un nombre collé à une parenthèse multiplie toute la parenthèse`,
        },
        {
          e: `${a}${L}${M}`,
          bon: `${a} × ${L} × ${M}`,
          pieges: [`${a} + ${L} + ${M}`, `${a} × ${L} + ${M}`, `${a} + ${L} × ${M}`],
          regle: `le nombre et les deux lettres sont tous multipliés`,
        },
      ]);
      const text = randomChoice([
        () => `Que signifie ${cas.e} ?`,
        () => `Comment écrire ${cas.e} en faisant apparaître tous les signes d’opération ?`,
        () => `Dans une expression littérale, on lit ${cas.e}. Quelle écriture lui est égale ?`,
        () => `Quelle écriture complète correspond à ${cas.e} ?`,
        () => `On a écrit ${cas.e} sans le signe ×. Remets-le : quelle écriture obtiens-tu ?`,
        () => `${cas.e} : quelle opération se cache dans cette écriture ? Choisis l’écriture complète.`,
      ])();

      return {
        text,
        format: "qcm",
        choices: makeChoices(cas.bon, cas.pieges),
        expected: [cas.bon],
        comparator: "mcq_exact",
        explanation:
          `Définition : en calcul littéral, on n’écrit pas toujours le signe ×.\n\n` +
          `Méthode : ${cas.regle}.\n\n` +
          `Calcul : ${cas.e} = ${cas.bon}.\n\n` +
          `Conclusion : ${cas.e} signifie ${cas.bon}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_comprendre_tpl_4_ecrire_court",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Une somme de termes égaux devient un produit ; un produit d’une lettre par elle-même devient une puissance.",
    tags: ["litteral", "notation", "simplifier", "template"],
    generate: () => {
      const L = lettre();
      const a = randomInt(2, 9);
      const cas = randomChoice([
        { e: `${L} × ${L}`, bon: `${L}²`, pieges: [`2${L}`, `${L} + 2`, `2 + ${L}`, `${L}³`], pourquoi: `un nombre multiplié par lui-même s’écrit avec le carré` },
        { e: `${L} + ${L}`, bon: `2${L}`, pieges: [`${L}²`, `${L} + 2`, `2 + ${L}`], pourquoi: `ajouter deux fois ${L}, c’est prendre le double de ${L}` },
        { e: `${L} × ${L} × ${L}`, bon: `${L}³`, pieges: [`3${L}`, `${L}²`, `3 + ${L}`], pourquoi: `trois facteurs égaux à ${L} donnent ${L} au cube` },
        { e: `${L} + ${L} + ${L}`, bon: `3${L}`, pieges: [`${L}³`, `3 + ${L}`, `${L} + 3`], pourquoi: `ajouter trois fois ${L}, c’est prendre le triple de ${L}` },
        { e: `${a} × ${L} × ${L}`, bon: `${a}${L}²`, pieges: [`${2 * a}${L}`, `(${a}${L})²`, `${a}${L}`, `${a} + ${L}²`], pourquoi: `${L} × ${L} = ${L}², et le nombre ${a} s’écrit devant` },
        { e: `${L} × ${a}`, bon: `${a}${L}`, pieges: [`${a} + ${L}`, `${L} + ${a}`, `${a}${L}²`], pourquoi: `on écrit le nombre devant la lettre et on supprime le signe ×` },
      ]);
      const text = randomChoice([
        () => `Écris plus simplement : ${cas.e}.`,
        () => `Quelle est l’écriture simplifiée de ${cas.e} ?`,
        () => `Comment note-t-on ${cas.e} en calcul littéral ?`,
        () => `${cas.e} peut s’écrire plus court. Quelle écriture est la bonne ?`,
        () => `Simplifie l’écriture ${cas.e}.`,
      ])();
      return {
        text,
        format: "qcm",
        choices: makeChoices(cas.bon, cas.pieges),
        expected: [cas.bon],
        comparator: "mcq_exact",
        explanation:
          `Définition : en calcul littéral, on allège les écritures sans changer leur valeur.\n\n` +
          `Méthode : ${cas.pourquoi}.\n\n` +
          `Calcul : ${cas.e} = ${cas.bon}.\n\n` +
          `Conclusion : ${cas.e} s’écrit ${cas.bon}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_comprendre_tpl_2_traduire",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Repère l’ordre des opérations dans la phrase : la dernière opération décrite est la plus « extérieure ».",
    tags: ["litteral", "traduire", "template"],
    generate: () => {
      const L = lettre();
      const a = randomInt(3, 9);
      const b = randomInt(2, 12);
      const cas = randomChoice([
        { p: `le double de ${L} augmenté de ${b}`, bon: `2${L} + ${b}`, pieges: [`2(${L} + ${b})`, `${L} + 2 + ${b}`, `${L}² + ${b}`] },
        { p: `le triple de ${L} diminué de ${b}`, bon: `3${L} - ${b}`, pieges: [`3(${L} - ${b})`, `${b} - 3${L}`, `${L}³ - ${b}`] },
        { p: `le double de la somme de ${L} et de ${b}`, bon: `2(${L} + ${b})`, pieges: [`2${L} + ${b}`, `${L} + 2 × ${b}`, `(${L} + ${b})²`] },
        { p: `le carré de ${L} augmenté de ${b}`, bon: `${L}² + ${b}`, pieges: [`(${L} + ${b})²`, `2${L} + ${b}`, `${L}² + ${b}²`] },
        { p: `le carré de la somme de ${L} et de ${b}`, bon: `(${L} + ${b})²`, pieges: [`${L}² + ${b}`, `${L}² + ${b * b}`, `2(${L} + ${b})`] },
        { p: `la moitié de ${L}, diminuée de ${b}`, bon: `${L} ÷ 2 - ${b}`, pieges: [`(${L} - ${b}) ÷ 2`, `2${L} - ${b}`, `${L}² - ${b}`] },
        { p: `la différence entre ${a} fois ${L} et ${b}`, bon: `${a}${L} - ${b}`, pieges: [`${a}(${L} - ${b})`, `${b} - ${a}${L}`, `${a} + ${L} - ${b}`] },
        { p: `le produit de ${a} par la somme de ${L} et de ${b}`, bon: `${a}(${L} + ${b})`, pieges: [`${a}${L} + ${b}`, `${a} + ${L} + ${b}`, `${a} + ${L} × ${b}`] },
        { p: `la somme du carré de ${L} et du double de ${L}`, bon: `${L}² + 2${L}`, pieges: [`(${L} + 2${L})²`, `${L}² + ${L}²`, `2${L}² + ${L}`] },
        { p: `l’opposé de ${L}, augmenté de ${b}`, bon: `-${L} + ${b}`, pieges: [`-(${L} + ${b})`, `${L} - ${b}`, `-${L} - ${b}`] },
      ]);
      const text = randomChoice([
        () => `Quelle expression traduit : « ${cas.p} » ?`,
        () => `On appelle ${L} un nombre. Comment écrire « ${cas.p} » ?`,
        () => `« ${cas.p.charAt(0).toUpperCase()}${cas.p.slice(1)} » : quelle expression correspond à cette phrase ?`,
        () => `Parmi ces expressions, laquelle signifie « ${cas.p} » ?`,
        () => `Traduis par une expression littérale : « ${cas.p} ».`,
      ])();

      return {
        text,
        format: "qcm",
        choices: makeChoices(cas.bon, cas.pieges),
        expected: [cas.bon],
        comparator: "mcq_exact",
        explanation:
          `Définition : traduire une phrase en expression littérale consiste à remplacer les mots par des opérations.\n\n` +
          `Méthode : on repère quelle opération est faite EN DERNIER : c’est elle qui donne la forme de l’expression (somme, différence, produit ou carré).\n\n` +
          `Calcul : « ${cas.p} » s’écrit ${cas.bon}.\n\n` +
          `Conclusion : la bonne expression est ${cas.bon}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_comprendre_tpl_3_reunion",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Ce qui est payé (ou ajouté) à chaque fois est multiplié par la lettre ; ce qui est payé une seule fois est ajouté.",
    tags: ["litteral", "traduire", "situation", "template"],
    generate: () => {
      const L = randomChoice(["x", "x", "n", "t", "h", "k"]);
      const ctx = randomChoice([
        () => { const p = randomInt(6, 11); const f = randomInt(1, 3); return { s: `Une place de cinéma coûte ${p} €, et la réservation en ligne ajoute ${f} € de frais pour toute la commande. On achète ${L} places.`, q: "le prix total, en euros", p, f }; },
        () => { const p = randomInt(4, 9); const f = randomInt(2, 5); return { s: `Un vélo se loue ${p} € l’heure, plus ${f} € d’assurance. On le loue pendant ${L} heures.`, q: "le prix de la location, en euros", p, f }; },
        () => { const p = randomInt(2, 3); const f = randomInt(3, 6); return { s: `Un taxi facture ${f} € de prise en charge, puis ${p} € par kilomètre. La course fait ${L} km.`, q: "le prix de la course, en euros", p, f }; },
        () => { const p = randomInt(2, 4) * 10; const f = randomInt(3, 6) * 10; return { s: `Une salle de sport demande ${f} € d’inscription, puis ${p} € par mois. On s’abonne pendant ${L} mois.`, q: "la somme dépensée, en euros", p, f }; },
        () => { const p = randomInt(2, 4); const f = randomInt(2, 5); return { s: `Un fleuriste vend la rose ${p} € et ajoute ${f} € pour l’emballage du bouquet. On achète ${L} roses.`, q: "le prix du bouquet, en euros", p, f }; },
        () => { const p = randomInt(2, 4); const f = randomInt(1, 3); return { s: `Au marché de Saint-Paul, les litchis sont vendus ${p} € le kilo, et le panier coûte ${f} €. On achète ${L} kilos de litchis.`, q: "le prix payé, en euros", p, f }; },
        () => { const p = randomInt(2, 4); const f = randomInt(3, 6); return { s: `Un parking demande ${f} € à l’entrée, puis ${p} € par heure. Une voiture y reste ${L} heures.`, q: "le prix du stationnement, en euros", p, f }; },
        () => { const p = randomInt(3, 6); const f = randomInt(10, 20); return { s: `Une piscine vend l’entrée ${p} € aux adhérents ; la carte d’adhérent coûte ${f} €. On prend la carte et on fait ${L} entrées.`, q: "la dépense totale, en euros", p, f }; },
        () => { const p = randomInt(2, 4); const f = randomInt(6, 12); return { s: `Un jardinier achète ${L} plants de tomates à ${p} € l’un et un sac de terreau à ${f} €.`, q: "le montant de ses achats, en euros", p, f }; },
        () => { const p = randomInt(10, 15); const f = randomInt(3, 6) * 50; return { s: `Pour une sortie scolaire, chaque élève paie ${p} € d’entrée au musée, et le car coûte ${f} € en tout. ${L} élèves participent.`, q: "le coût total de la sortie, en euros", p, f }; },
        () => { const p = randomInt(2, 5); const f = randomInt(10, 25); return { s: `Un forfait téléphonique coûte ${f} € par mois, plus ${p} € par gigaoctet supplémentaire. Ce mois-ci, on consomme ${L} Go supplémentaires.`, q: "la facture du mois, en euros", p, f }; },
        () => { const p = randomInt(2, 4); const f = randomInt(20, 40); return { s: `Une imprimerie facture ${f} € de mise en page, puis ${p} € par affiche. On commande ${L} affiches.`, q: "le prix de la commande, en euros", p, f }; },
        () => { const p = randomInt(2, 5) * 100; const f = randomInt(8, 15) * 100; return { s: `Une randonneuse part d’un refuge situé à ${fr(f)} m d’altitude et monte de ${p} m par heure. Elle marche pendant ${L} heures.`, q: "l’altitude atteinte, en mètres", p, f }; },
        () => { const p = randomInt(5, 15); const f = randomInt(20, 80); return { s: `Une cuve contient déjà ${f} L d’eau de pluie ; une averse y ajoute ${p} L par minute pendant ${L} minutes.`, q: "le volume d’eau dans la cuve, en litres", p, f }; },
        () => { const p = randomInt(3, 8); const f = randomInt(5, 20); return { s: `Un joueur de jeu vidéo a déjà ${f} points ; chaque niveau réussi lui en rapporte ${p}. Il réussit ${L} niveaux.`, q: "son nombre de points", p, f }; },
      ])();
      const correct = `${ctx.p}${L} + ${ctx.f}`;
      const text =
        ctx.s +
        " " +
        randomChoice([
          `Quelle expression donne ${ctx.q} ?`,
          `Quelle expression, en fonction de ${L}, donne ${ctx.q} ?`,
          `Laquelle de ces expressions donne ${ctx.q} ?`,
          `Comment exprimer, en fonction de ${L}, ${ctx.q} ?`,
        ]);

      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `${ctx.p + ctx.f}${L}`,
          `${ctx.p}(${L} + ${ctx.f})`,
          lin(ctx.f, ctx.p, L),
          `${ctx.p} + ${L} + ${ctx.f}`,
          `${ctx.f}(${L} + ${ctx.p})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : une expression littérale peut représenter une situation où une quantité varie.\n\n` +
          `Méthode : ${fr(ctx.p)} revient ${L} fois, donc on écrit ${fr(ctx.p)} × ${L} ; ${fr(ctx.f)} ne compte qu’une fois, donc on l’ajoute.\n\n` +
          `Calcul : ${fr(ctx.p)} × ${L} + ${fr(ctx.f)} = ${correct}.\n\n` +
          `Conclusion : ${ctx.q} est donné par ${correct}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_litteral_comprendre_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève dit : « 5x signifie 5 + x. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Un nombre collé à une lettre signifie une multiplication.",
    explanation:
      "Définition : en calcul littéral, 5x signifie 5 multiplié par x.\n\n" +
      "Méthode : on réécrit l’expression avec le signe ×.\n\n" +
      "Calcul : 5x = 5 × x, et non 5 + x.\n\n" +
      "Conclusion : l’élève a tort.",
    tags: ["litteral", "erreur", "notation"],
  },

  {
    kind: "template",
    id: "3e_litteral_comprendre_tpl_5_vrai_faux",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_comprendre",
    difficulty: 3,
    theme: "neutral",
    hint: "Teste l’égalité avec une valeur de la lettre, par exemple 3 : si les deux côtés diffèrent, elle est fausse.",
    tags: ["litteral", "comprendre", "vrai_faux", "template"],
    generate: () => {
      const L = lettre();
      const a = randomInt(2, 9);
      const b = randomInt(2, 9);
      const t = 3;
      const cas = randomChoice([
        { s: `${a}${L} = ${a} + ${L}`, vrai: false, test: `${a} × ${t} = ${a * t} mais ${a} + ${t} = ${a + t}` },
        { s: `${a}${L} = ${a} × ${L}`, vrai: true, test: `un nombre collé à une lettre est multiplié par elle` },
        { s: `${L}² = 2${L}`, vrai: false, test: `${t}² = ${t * t} mais 2 × ${t} = ${2 * t}` },
        { s: `${L}² = ${L} × ${L}`, vrai: true, test: `le carré d’un nombre est ce nombre multiplié par lui-même` },
        { s: `${L} + ${L} = ${L}²`, vrai: false, test: `${t} + ${t} = ${2 * t} mais ${t}² = ${t * t}` },
        { s: `${L} + ${L} = 2${L}`, vrai: true, test: `ajouter deux fois un nombre, c’est le doubler` },
        { s: `${a}${L} + ${b} = ${a + b}${L}`, vrai: false, test: `${a} × ${t} + ${b} = ${a * t + b} mais ${a + b} × ${t} = ${(a + b) * t} ; ${b} n’est pas un terme en ${L}` },
        { s: `${a}(${L} + ${b}) = ${a}${L} + ${b}`, vrai: false, test: `${a} × (${t} + ${b}) = ${a * (t + b)} mais ${a} × ${t} + ${b} = ${a * t + b} ; le ${a} multiplie aussi le ${b}` },
        { s: `${a}(${L} + ${b}) = ${a}${L} + ${a * b}`, vrai: true, test: `${a} multiplie chaque terme de la parenthèse : ${a} × ${L} + ${a} × ${b}` },
        { s: `${L} × ${L} × ${L} = 3${L}`, vrai: false, test: `${t} × ${t} × ${t} = ${t ** 3} mais 3 × ${t} = ${3 * t}` },
        { s: `${L} × ${a} = ${a}${L}`, vrai: true, test: `l’ordre des facteurs ne change pas un produit` },
        { s: `${a}${L} × ${L} = ${a}${L}²`, vrai: true, test: `${a} × ${L} × ${L} = ${a} × ${L}²` },
      ]);
      const prenom = randomChoice(PRENOMS);
      const tournure = randomChoice([
        { text: `Un élève affirme : « ${cas.s} » pour tout nombre ${L}. A-t-il raison ?`, oui: "oui", non: "non" },
        { text: `Vrai ou faux : pour tout nombre ${L}, ${cas.s}.`, oui: "vrai", non: "faux" },
        { text: `${prenom} écrit ${cas.s}. Cette égalité est-elle juste pour n’importe quelle valeur de ${L} ?`, oui: "oui", non: "non" },
        { text: `Dans une copie, on lit « ${cas.s} ». Est-ce correct, quel que soit ${L} ?`, oui: "oui", non: "non" },
      ]);
      const bon = cas.vrai ? tournure.oui : tournure.non;
      return {
        text: tournure.text,
        format: "qcm",
        choices: [tournure.oui, tournure.non],
        expected: [bon],
        comparator: "mcq_exact",
        explanation:
          `Définition : une égalité littérale est vraie si elle est vraie pour TOUTES les valeurs de la lettre.\n\n` +
          `Méthode : ${cas.vrai ? "on revient au sens des écritures" : `un seul contre-exemple suffit : on essaie ${L} = ${t}`}.\n\n` +
          `Calcul : ${cas.test}.\n\n` +
          `Conclusion : ${cas.s} est ${cas.vrai ? "vraie pour tout nombre" : "fausse"} ; la réponse est « ${bon} ».`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_comprendre_tpl_6_programme",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_comprendre",
    difficulty: 3,
    theme: "neutral",
    hint: "Suis le programme étape par étape en écrivant ce que devient le nombre de départ ; mets des parenthèses quand une opération porte sur tout le résultat.",
    tags: ["litteral", "comprendre", "programme_calcul", "template"],
    generate: () => {
      const L = lettre();
      const a = randomInt(2, 7);
      let b = randomInt(2, 9);
      while (b === a) b = randomInt(2, 9);
      let c = randomInt(2, 5);
      while (c === a) c = randomInt(2, 5);
      const cas = randomChoice([
        { etapes: [`Multiplie-le par ${a}.`, `Ajoute ${b}.`], bon: `${a}${L} + ${b}`, pieges: [`${a}(${L} + ${b})`, `${a} + ${L} + ${b}`, `${b}${L} + ${a}`] },
        { etapes: [`Ajoute ${b}.`, `Multiplie le résultat par ${a}.`], bon: `${a}(${L} + ${b})`, pieges: [`${a}${L} + ${b}`, `${L} + ${a * b}`, `${b}(${L} + ${a})`] },
        { etapes: [`Soustrais ${b}.`, `Élève le résultat au carré.`], bon: `(${L} - ${b})²`, pieges: [`${L}² - ${b}`, `${L}² - ${b * b}`, `2(${L} - ${b})`] },
        { etapes: [`Élève-le au carré.`, `Retire ${b}.`], bon: `${L}² - ${b}`, pieges: [`(${L} - ${b})²`, `2${L} - ${b}`, `${L}² - ${b * b}`] },
        { etapes: [`Multiplie-le par ${a}.`, `Retire ${b}.`, `Multiplie le résultat par ${c}.`], bon: `${c}(${a}${L} - ${b})`, pieges: [`${a}${L} - ${b * c}`, `${a * c}${L} - ${b}`, `${a}(${c}${L} - ${b})`] },
        { etapes: [`Ajoute ${b}.`, `Multiplie le résultat par le nombre de départ.`], bon: `${L}(${L} + ${b})`, pieges: [`${L} + ${b}${L}`, `${L}² + ${b}`, `2${L} + ${b}`] },
      ]);
      const etapes = `Choisis un nombre. ${cas.etapes.join(" ")}`;
      const text = randomChoice([
        () => `Programme de calcul : « ${etapes} » On note ${L} le nombre choisi. Quelle expression donne le résultat ?`,
        () => `Voici un programme : ${etapes} Si le nombre de départ est ${L}, quel résultat obtient-on ?`,
        () => `${randomChoice(PRENOMS)} applique ce programme à un nombre ${L} : ${etapes} Quelle expression obtient-on à la fin ?`,
        () => `En appelant ${L} le nombre de départ, traduis ce programme par une expression : ${etapes}`,
      ])();
      return {
        text,
        format: "qcm",
        choices: makeChoices(cas.bon, cas.pieges),
        expected: [cas.bon],
        comparator: "mcq_exact",
        explanation:
          `Définition : un programme de calcul appliqué à un nombre ${L} donne une expression littérale.\n\n` +
          `Méthode : on écrit le résultat après chaque étape ; si une opération porte sur TOUT le résultat précédent, on le met entre parenthèses.\n\n` +
          `Calcul : en suivant les étapes « ${cas.etapes.join(" ")} », on obtient ${cas.bon}.\n\n` +
          `Conclusion : le programme donne ${cas.bon}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_litteral_comprendre_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_comprendre",
    difficulty: 3,
    theme: "neutral",
    text: "Explique à quoi sert une lettre dans une expression littérale.",
    format: "open",
    expected: ["nombre", "inconnu", "variable"],
    comparator: "contains_keyword",
    hint: "Une lettre permet de représenter un nombre qu’on ne connaît pas ou qui peut changer.",
    explanation:
      "Définition : une lettre dans une expression littérale représente un nombre inconnu ou variable.\n\n" +
      "Méthode : on utilise cette lettre pour écrire une règle générale ou traduire une situation.\n\n" +
      "Calcul : par exemple, si x est le nombre de places achetées et qu’une place coûte 4 €, le prix total est 4x.\n\n" +
      "Conclusion : une lettre permet de généraliser un calcul.",
    tags: ["litteral", "open", "definition"],
  },

  /* =========================
     LITTERAL_SUBSTITUER
  ========================= */

  {
    kind: "fixed",
    id: "3e_litteral_substituer_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer 3x + 2 pour x = 4.",
    format: "qcm",
    choices: ["14", "20", "10", "6"],
    expected: ["14"],
    comparator: "mcq_exact",
    hint: "Remplace x par 4.",
    explanation:
      "Définition : substituer signifie remplacer une lettre par une valeur.\n\n" +
      "Méthode : on remplace x par 4 dans l’expression.\n\n" +
      "Calcul : 3 × 4 + 2 = 12 + 2 = 14.\n\n" +
      "Conclusion : la valeur de l’expression est 14.",
    tags: ["litteral", "substitution", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_substituer_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer 2a - 5 pour a = -3.",
    format: "short",
    expected: ["-11"],
    comparator: "number_equal",
    hint: "Attention au signe négatif.",
    explanation:
      "Définition : substituer consiste à remplacer une lettre par un nombre.\n\n" +
      "Méthode : on remplace a par -3 puis on calcule étape par étape.\n\n" +
      "Calcul : 2 × (-3) - 5 = -6 - 5 = -11.\n\n" +
      "Conclusion : le résultat est -11.",
    tags: ["litteral", "substitution", "negatif"],
  },

  {
    kind: "template",
    id: "3e_litteral_substituer_tpl_1_simple",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 1,
    theme: "neutral",
    hint: "Remplace la lettre par la valeur donnée, puis fais d’abord les multiplications.",
    tags: ["litteral", "substitution", "template"],
    generate: () => {
      const L = lettre();
      const a = randomInt(2, 9);
      const b = randomInt(1, 12);
      const v = randomInt(1, 9);
      const cas = randomChoice([
        { e: `${a}${L} + ${b}`, r: a * v + b, c: `${a} × ${v} + ${b} = ${a * v} + ${b}` },
        { e: `${a}${L} - ${b}`, r: a * v - b, c: `${a} × ${v} - ${b} = ${a * v} - ${b}` },
        { e: `${b} + ${a}${L}`, r: b + a * v, c: `${b} + ${a} × ${v} = ${b} + ${a * v}` },
        { e: `${a}${L}`, r: a * v, c: `${a} × ${v}` },
        { e: `${L} + ${b}`, r: v + b, c: `${v} + ${b}` },
        { e: `${a * 10} - ${a}${L}`, r: a * 10 - a * v, c: `${a * 10} - ${a} × ${v} = ${a * 10} - ${a * v}` },
      ]);
      return {
        text: consigneSubstituer(cas.e, `${L} = ${v}`, L),
        format: "short",
        expected: [String(cas.r)],
        comparator: "number_equal",
        explanation:
          `Définition : substituer signifie remplacer une lettre par une valeur.\n\n` +
          `Méthode : on remplace ${L} par ${v}, on remet le signe × et on calcule les produits avant les sommes.\n\n` +
          `Calcul : ${cas.c} = ${cas.r}.\n\n` +
          `Conclusion : pour ${L} = ${v}, ${cas.e} vaut ${cas.r}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_substituer_tpl_5_formule",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 1,
    theme: "neutral",
    hint: "Une formule est une expression littérale : remplace chaque lettre par sa valeur.",
    tags: ["litteral", "substitution", "formule", "template"],
    generate: () => {
      const f = randomChoice([
        () => { const c = randomInt(3, 15); return { s: `Le périmètre d’un carré de côté c est donné par la formule 4c.`, q: `Calcule ce périmètre pour c = ${c} cm.`, r: 4 * c, u: " cm", calc: `4 × ${c}` }; },
        () => { const c = randomInt(3, 12); return { s: `L’aire d’un carré de côté c est c².`, q: `Calcule cette aire pour c = ${c} m.`, r: c * c, u: " m²", calc: `${c}² = ${c} × ${c}` }; },
        () => { const n = randomInt(4, 20); return { s: `Pour former une rangée de n carrés avec des allumettes, il faut 3n + 1 allumettes.`, q: `Combien en faut-il pour n = ${n} ?`, r: 3 * n + 1, u: " allumettes", calc: `3 × ${n} + 1` }; },
        () => { const t = randomInt(2, 5); const v = randomChoice([50, 70, 80, 90, 110]); return { s: `Une voiture roule à ${v} km/h. En t heures, elle parcourt ${v}t kilomètres.`, q: `Quelle distance parcourt-elle pour t = ${t} ?`, r: v * t, u: " km", calc: `${v} × ${t}` }; },
        () => { const n = randomInt(3, 12); return { s: `Un cours de natation coûte 8n + 15 euros pour n séances (inscription comprise).`, q: `Combien coûtent ${n} séances ?`, r: 8 * n + 15, u: " €", calc: `8 × ${n} + 15` }; },
        () => { const c = randomInt(2, 6); return { s: `Le volume d’un cube d’arête a est a³.`, q: `Calcule ce volume pour a = ${c} cm.`, r: c ** 3, u: " cm³", calc: `${c} × ${c} × ${c}` }; },
        () => { const n = randomInt(3, 9); return { s: `Sur une frise, on place n triangles côte à côte avec 2n + 1 bâtonnets.`, q: `Combien de bâtonnets faut-il pour n = ${n} ?`, r: 2 * n + 1, u: " bâtonnets", calc: `2 × ${n} + 1` }; },
        () => { const m = randomInt(2, 8); return { s: `Un abonnement de vélos en libre-service coûte 5 + 2m euros pour m mois d’utilisation.`, q: `Calcule ce prix pour m = ${m}.`, r: 5 + 2 * m, u: " €", calc: `5 + 2 × ${m}` }; },
        () => { const h = randomInt(2, 6); return { s: `Une bougie de 30 cm raccourcit de 4 cm par heure : après h heures, elle mesure 30 - 4h centimètres.`, q: `Quelle est sa longueur pour h = ${h} ?`, r: 30 - 4 * h, u: " cm", calc: `30 - 4 × ${h}` }; },
      ])();
      return {
        text: varierFormule(f.s, f.q),
        format: "short",
        expected: [String(f.r)],
        comparator: "number_equal",
        explanation:
          `Définition : utiliser une formule, c’est remplacer chaque lettre par sa valeur.\n\n` +
          `Méthode : on remplace, puis on respecte les priorités (puissances, puis produits, puis sommes).\n\n` +
          `Calcul : ${f.calc} = ${f.r}.\n\n` +
          `Conclusion : on obtient ${fr(f.r)}${f.u}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_substituer_tpl_2_negatif",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 2,
    theme: "neutral",
    hint: "Remplace la lettre par le nombre négatif ENTRE PARENTHÈSES, puis applique la règle des signes.",
    tags: ["litteral", "substitution", "negatif", "template"],
    generate: () => {
      const L = lettre();
      const a = randomInt(2, 7);
      const b = randomInt(1, 9);
      const v = randomInt(-6, -1);
      const cas = randomChoice([
        { e: `${a}${L} + ${b}`, r: a * v + b, c: `${a} × (${v}) + ${b} = ${a * v} + ${b}` },
        { e: `${a}${L} - ${b}`, r: a * v - b, c: `${a} × (${v}) - ${b} = ${a * v} - ${b}` },
        { e: `${b} - ${a}${L}`, r: b - a * v, c: `${b} - ${a} × (${v}) = ${b} - (${a * v})` },
        { e: `${L}² + ${b}`, r: v * v + b, c: `(${v})² + ${b} = ${v * v} + ${b}` },
        { e: `-${L} + ${b}`, r: -v + b, c: `-(${v}) + ${b} = ${-v} + ${b}` },
        { e: `${a}${L}²`, r: a * v * v, c: `${a} × (${v})² = ${a} × ${v * v}` },
        { e: `${L}² - ${a}${L}`, r: v * v - a * v, c: `(${v})² - ${a} × (${v}) = ${v * v} - (${a * v})` },
      ]);
      return {
        text: consigneSubstituer(cas.e, `${L} = ${v}`, L),
        format: "short",
        expected: [String(cas.r)],
        comparator: "number_equal",
        explanation:
          `Définition : substituer consiste à remplacer une lettre par une valeur.\n\n` +
          `Méthode : on écrit (${v}) entre parenthèses pour garder son signe ; un carré d’un nombre négatif est positif.\n\n` +
          `Calcul : ${cas.c} = ${cas.r}.\n\n` +
          `Conclusion : pour ${L} = ${v}, ${cas.e} vaut ${cas.r}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_substituer_tpl_4_reunion",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 2,
    theme: "neutral",
    hint: "Repère ce que représente la lettre, puis remplace-la par la valeur de l’énoncé.",
    tags: ["litteral", "substitution", "situation", "template"],
    generate: () => {
      const ctx = randomChoice([
        () => { const C = randomChoice([5, 10, 15, 20, 25, 30, 35, 40]); const r = 1.8 * C + 32; return { s: `Pour passer des degrés Celsius aux degrés Fahrenheit, on utilise F = 1,8C + 32.`, q: `Combien de degrés Fahrenheit correspondent à ${C} °C ?`, r, calc: `1,8 × ${C} + 32 = ${fr(1.8 * C)} + 32`, u: " °F" }; },
        () => { const p = randomInt(3, 6); const k = randomInt(4, 15); return { s: `Un taxi coûte ${p} + 2k euros pour une course de k kilomètres.`, q: `Combien paie-t-on pour k = ${k} ?`, r: p + 2 * k, calc: `${p} + 2 × ${k}`, u: " €" }; },
        () => { const n = randomInt(3, 12); return { s: `Pour border un carré de n carreaux de côté, il faut 4n - 4 carreaux.`, q: `Combien de carreaux faut-il pour n = ${n} ?`, r: 4 * n - 4, calc: `4 × ${n} - 4`, u: " carreaux" }; },
        () => { const t = randomInt(2, 5); return { s: `Une randonneuse part de 1 200 m d’altitude et monte de 300 m par heure : après t heures, elle est à 1 200 + 300t mètres.`, q: `À quelle altitude est-elle pour t = ${t} ?`, r: 1200 + 300 * t, calc: `1 200 + 300 × ${t}`, u: " m" }; },
        () => { const h = randomInt(1, 4); return { s: `En montagne, la température baisse d’environ 6 °C par kilomètre d’altitude : à h kilomètres au-dessus d’un village à 18 °C, il fait 18 - 6h degrés.`, q: `Quelle température fait-il pour h = ${h} ?`, r: 18 - 6 * h, calc: `18 - 6 × ${h}`, u: " °C" }; },
        () => { const t = randomInt(2, 12); return { s: `Une piscine de 500 m³ se vide de 25 m³ par heure : après t heures, il reste 500 - 25t mètres cubes.`, q: `Combien en reste-t-il pour t = ${t} ?`, r: 500 - 25 * t, calc: `500 - 25 × ${t}`, u: " m³" }; },
        () => { const n = randomInt(5, 30); return { s: `Un forfait de téléphone coûte 12 + 0,5n euros, où n est le nombre de gigaoctets supplémentaires.`, q: `Calcule ce prix pour n = ${n}.`, r: 12 + 0.5 * n, calc: `12 + 0,5 × ${n} = 12 + ${fr(0.5 * n)}`, u: " €" }; },
        () => { const x = randomInt(2, 9); return { s: `Au snack, l’expression 3x + 2 donne le prix, en euros, de x bouchons avec la sauce.`, q: `Combien coûtent x = ${x} bouchons ?`, r: 3 * x + 2, calc: `3 × ${x} + 2`, u: " €" }; },
        () => { const L = randomInt(4, 12); const l = randomInt(2, L - 1); return { s: `Le périmètre d’un rectangle de longueur L et de largeur l est 2L + 2l.`, q: `Calcule-le pour L = ${L} m et l = ${l} m.`, r: 2 * L + 2 * l, calc: `2 × ${L} + 2 × ${l} = ${2 * L} + ${2 * l}`, u: " m" }; },
        () => { const v = randomInt(10, 30); const t = randomInt(2, 6); return { s: `Un cycliste roule à v km/h pendant t heures : il parcourt v × t kilomètres.`, q: `Quelle distance parcourt-il pour v = ${v} et t = ${t} ?`, r: v * t, calc: `${v} × ${t}`, u: " km" }; },
        () => { const n = randomInt(10, 40); return { s: `Une association paie 150 + 4n euros pour louer une salle et offrir un goûter à n enfants.`, q: `Calcule cette dépense pour n = ${n}.`, r: 150 + 4 * n, calc: `150 + 4 × ${n}`, u: " €" }; },
        () => { const s = randomInt(3, 8); return { s: `Un arbre planté à 1,5 m de haut grandit de 0,5 m par an : après s années, il mesure 1,5 + 0,5s mètres.`, q: `Quelle est sa hauteur pour s = ${s} ?`, r: 1.5 + 0.5 * s, calc: `1,5 + 0,5 × ${s} = 1,5 + ${fr(0.5 * s)}`, u: " m" }; },
      ])();
      return {
        text: varierFormule(ctx.s, ctx.q, false),
        format: "short",
        expected: [String(ctx.r)],
        comparator: "number_equal",
        explanation:
          `Définition : une expression littérale peut modéliser une situation réelle.\n\n` +
          `Méthode : on remplace la lettre par la valeur donnée, puis on calcule en respectant les priorités.\n\n` +
          `Calcul : ${ctx.calc} = ${fr(ctx.r)}.\n\n` +
          `Conclusion : on obtient ${fr(ctx.r)}${ctx.u}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_substituer_tpl_3_parentheses",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace, mets les nombres négatifs entre parenthèses, puis calcule dans l’ordre : parenthèses, puissances, produits, sommes.",
    tags: ["litteral", "substitution", "parentheses", "template"],
    generate: () => {
      const L = lettre();
      const M = autreLettre(L);
      const a = randomInt(2, 6);
      const b = randomInt(1, 7);
      const c = randomInt(1, 6);
      const v = nonNul(-5, 6);
      const w = nonNul(-5, 6);
      const cas = randomChoice([
        { e: `${a}(${L} + ${b})`, vals: `${L} = ${v}`, r: a * (v + b), c: `${a} × (${val(v)} + ${b}) = ${a} × ${v + b}` },
        { e: `(${L} + ${b})(${L} - ${c})`, vals: `${L} = ${v}`, r: (v + b) * (v - c), c: `(${val(v)} + ${b}) × (${val(v)} - ${c}) = ${val(v + b)} × ${val(v - c)}` },
        { e: quad(a, -b, c, L), vals: `${L} = ${v}`, r: a * v * v - b * v + c, c: `${a} × ${val(v)}² - ${b} × ${val(v)} + ${c} = ${a * v * v} - ${val(b * v)} + ${c}` },
        { e: `(${L} - ${b})²`, vals: `${L} = ${v}`, r: (v - b) ** 2, c: `(${val(v)} - ${b})² = ${val(v - b)}²` },
        { e: somme([[a, L], [-b, M]]), vals: `${L} = ${v} et ${M} = ${w}`, r: a * v - b * w, c: `${a} × ${val(v)} - ${b} × ${val(w)} = ${a * v} - ${val(b * w)}` },
        { e: `${L}² + ${M}²`, vals: `${L} = ${v} et ${M} = ${w}`, r: v * v + w * w, c: `${val(v)}² + ${val(w)}² = ${v * v} + ${w * w}` },
        { e: `${a}${L}${M}`, vals: `${L} = ${v} et ${M} = ${w}`, r: a * v * w, c: `${a} × ${val(v)} × ${val(w)}` },
        { e: `-${L}² + ${a}${L}`, vals: `${L} = ${v}`, r: -v * v + a * v, c: `-${val(v)}² + ${a} × ${val(v)} = ${-v * v} + ${val(a * v)}` },
      ]);
      return {
        text: consigneSubstituer(cas.e, cas.vals, cas.vals.includes(" et ") ? `${L} et ${M}` : L),
        format: "short",
        expected: [String(cas.r)],
        comparator: "number_equal",
        explanation:
          `Définition : substituer consiste à remplacer chaque lettre par sa valeur.\n\n` +
          `Méthode : on remplace (${cas.vals}), on garde les parenthèses autour des nombres négatifs, puis on respecte les priorités. ⚠️ Dans -${L}², le carré ne porte que sur ${L}.\n\n` +
          `Calcul : ${cas.c} = ${cas.r}.\n\n` +
          `Conclusion : pour ${cas.vals}, ${cas.e} vaut ${cas.r}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_substituer_tpl_6_formule",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace chaque lettre, puis calcule en respectant les priorités : parenthèses, puissances, produits et quotients, sommes.",
    tags: ["litteral", "substitution", "formule", "template"],
    generate: () => {
      const f = randomChoice([
        () => { const n = randomInt(5, 12); return { s: `Un polygone à n côtés a n(n - 3)/2 diagonales.`, q: `Combien de diagonales a un polygone à n = ${n} côtés ?`, r: (n * (n - 3)) / 2, calc: `${n} × (${n} - 3) ÷ 2 = ${n} × ${n - 3} ÷ 2`, u: " diagonales" }; },
        () => { const n = randomInt(10, 30); return { s: `La somme 1 + 2 + … + n est égale à n(n + 1)/2.`, q: `Calcule cette somme pour n = ${n}.`, r: (n * (n + 1)) / 2, calc: `${n} × (${n} + 1) ÷ 2 = ${n} × ${n + 1} ÷ 2`, u: "" }; },
        () => { const t = randomInt(1, 3); return { s: `Une balle lancée vers le haut est à la hauteur h = -5t² + 20t mètres après t secondes.`, q: `À quelle hauteur est-elle pour t = ${t} ?`, r: -5 * t * t + 20 * t, calc: `-5 × ${t}² + 20 × ${t} = ${-5 * t * t} + ${20 * t}`, u: " m" }; },
        () => { const m = randomChoice([2, 4, 6, 8, 10]); const v = randomInt(2, 9); return { s: `L’énergie cinétique d’un objet de masse m (en kg) roulant à la vitesse v (en m/s) est E = 0,5 × m × v² joules.`, q: `Calcule E pour m = ${m} et v = ${v}.`, r: 0.5 * m * v * v, calc: `0,5 × ${m} × ${v}² = 0,5 × ${m} × ${v * v}`, u: " J" }; },
        () => { const B = randomInt(6, 12); const b = randomInt(2, B - 1); const h = randomChoice([2, 4, 6]); return { s: `L’aire d’un trapèze de bases B et b et de hauteur h est (B + b) × h / 2.`, q: `Calcule-la pour B = ${B} cm, b = ${b} cm et h = ${h} cm.`, r: ((B + b) * h) / 2, calc: `(${B} + ${b}) × ${h} ÷ 2 = ${B + b} × ${h} ÷ 2`, u: " cm²" }; },
        () => { const L = randomInt(3, 9); const l = randomInt(2, 6); const h = randomInt(2, 5); return { s: `Le volume d’un pavé droit est L × l × h.`, q: `Calcule-le pour L = ${L} dm, l = ${l} dm et h = ${h} dm.`, r: L * l * h, calc: `${L} × ${l} × ${h}`, u: " dm³" }; },
        () => { const x = randomInt(1, 4); return { s: `Une boîte sans couvercle, fabriquée dans une plaque de 12 cm sur 10 cm en découpant des carrés de côté x aux coins, a un volume de x(12 - 2x)(10 - 2x) cm³.`, q: `Calcule ce volume pour x = ${x}.`, r: x * (12 - 2 * x) * (10 - 2 * x), calc: `${x} × (12 - ${2 * x}) × (10 - ${2 * x}) = ${x} × ${12 - 2 * x} × ${10 - 2 * x}`, u: " cm³" }; },
        () => { const v = randomChoice([30, 50, 60, 80, 90, 110, 130]); return { s: `Sur route sèche, la distance de freinage d’une voiture roulant à v km/h est d’environ v²/100 mètres.`, q: `Calcule-la pour v = ${v}.`, r: (v * v) / 100, calc: `${v}² ÷ 100 = ${fr(v * v)} ÷ 100`, u: " m" }; },
      ])();
      return {
        text: varierFormule(f.s, f.q),
        format: "short",
        expected: [String(f.r)],
        comparator: "number_equal",
        explanation:
          `Définition : une formule est une expression littérale dans laquelle on remplace chaque lettre par sa valeur.\n\n` +
          `Méthode : on remplace, puis on calcule dans l’ordre : parenthèses, puissances, produits et quotients, sommes.\n\n` +
          `Calcul : ${f.calc} = ${fr(f.r)}.\n\n` +
          `Conclusion : on trouve ${fr(f.r)}${f.u}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_litteral_substituer_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève calcule 2x + 3 pour x = 5 et trouve 13. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Remplace x par 5.",
    explanation:
      "Définition : substituer signifie remplacer une lettre par une valeur.\n\n" +
      "Méthode : on remplace x par 5 puis on calcule.\n\n" +
      "Calcul : 2 × 5 + 3 = 10 + 3 = 13.\n\n" +
      "Conclusion : l’élève a raison.",
    tags: ["litteral", "erreur", "verification"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_substituer_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi il faut mettre les nombres négatifs entre parenthèses lorsqu’on remplace une lettre.",
    format: "open",
    expected: ["signe", "parentheses", "negatif"],
    comparator: "contains_keyword",
    hint: "Les parenthèses évitent les erreurs de signe.",
    explanation:
      "Définition : lorsqu’on remplace une lettre par un nombre négatif, on doit conserver son signe.\n\n" +
      "Méthode : on écrit le nombre négatif entre parenthèses.\n\n" +
      "Calcul : par exemple 3x devient 3 × (-2) et non 3 × -2 sans précaution.\n\n" +
      "Conclusion : les parenthèses évitent les erreurs de calcul et de signe.",
    tags: ["litteral", "open", "negatif"],
  },

  /* =========================
     LITTERAL_REDUIRE
  ========================= */

  {
    kind: "fixed",
    id: "3e_litteral_reduire_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 1,
    theme: "neutral",
    text: "Réduire : 3x + 2x",
    format: "qcm",
    choices: ["5x", "6x", "5x²", "x"],
    expected: ["5x"],
    comparator: "mcq_exact",
    hint: "On additionne les coefficients.",
    explanation:
      "Définition : réduire une expression consiste à regrouper les termes semblables.\n\n" +
      "Méthode : 3x et 2x sont des termes en x.\n\n" +
      "Calcul : 3x + 2x = 5x.\n\n" +
      "Conclusion : l’expression réduite est 5x.",
    tags: ["reduction", "litteral", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_reduire_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 2,
    theme: "neutral",
    text: "Réduire : 4a - 2a + 3",
    format: "short",
    expected: ["2a + 3"],
    comparator: "expression_developpee",
    hint: "Regroupe les termes en a.",
    explanation:
      "Définition : réduire consiste à simplifier l’écriture d’une expression.\n\n" +
      "Méthode : on regroupe les termes de même nature.\n\n" +
      "Calcul : 4a - 2a = 2a. Donc l’expression devient 2a + 3.\n\n" +
      "Conclusion : l’expression réduite est 2a + 3.",
    tags: ["reduction", "litteral"],
  },

  {
    kind: "template",
    id: "3e_litteral_reduire_tpl_1_simple",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 1,
    theme: "neutral",
    hint: "Additionne (ou soustrais) les coefficients des termes semblables ; la lettre ne change pas.",
    tags: ["reduction", "template"],
    generate: () => {
      const L = lettre();
      for (;;) {
        const a = randomInt(2, 9);
        const b = randomInt(1, 9);
        const c = randomInt(1, 6);
        const forme = randomChoice<Terme[]>([
          [[a, L], [b, L]],
          [[a + b, L], [-b, L]],
          [[a, L], [b, L], [c, L]],
          [[1, L], [a, L]],
          [[a, L], [-1, L]],
          [[a, `${L}²`], [b, `${L}²`]],
          [[a, L], [-b, L], [c, L]],
        ]);
        const { reduit, details, nuls } = regrouper(forme);
        if (nuls) continue;
        const e = somme(forme);
        if (Math.random() < 0.3) {
          const fig = randomChoice([
            { f: "un triangle", n: 3 },
            { f: "un rectangle", n: 4 },
            { f: "un enclos à quatre côtés", n: 4 },
            { f: "un pentagone", n: 5 },
          ]);
          const cotes = Array.from({ length: fig.n }, () => randomInt(1, 6));
          const termes = cotes.map((k) => [k, L] as Terme);
          const r = regrouper(termes);
          return {
            text:
              `Les côtés d’${fig.f} mesurent ${cotes.map((k) => somme([[k, L]])).join(", ").replace(/, ([^,]*)$/, " et $1")} (en cm). ` +
              randomChoice([`Exprime son périmètre en fonction de ${L}, sous forme réduite.`, `Écris son périmètre sous forme réduite.`, `Quel est son périmètre, réduit, en fonction de ${L} ?`]),
            format: "short",
            expected: [r.reduit],
            comparator: "expression_developpee",
            explanation:
              `Définition : le périmètre est la somme des longueurs des côtés ; réduire, c’est regrouper les termes semblables.\n\n` +
              `Méthode : tous les côtés sont des termes en ${L} : on additionne leurs coefficients.\n\n` +
              `Calcul : ${somme(termes)} = ${r.reduit}.\n\n` +
              `Conclusion : le périmètre vaut ${r.reduit} cm.`,
          };
        }
        return {
          text: consigneReduire(e),
          format: "short",
          expected: [reduit],
          comparator: "expression_developpee",
          explanation:
            `Définition : réduire consiste à regrouper les termes semblables (même lettre, même exposant).\n\n` +
            `Méthode : on additionne les coefficients ; la partie littérale ne change pas.\n\n` +
            `Calcul : ${details}.\n\n` +
            `Conclusion : ${e} = ${reduit}.`,
        };
      }
    },
  },

  {
    kind: "template",
    id: "3e_litteral_reduire_tpl_2_avec_constante",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 2,
    theme: "neutral",
    hint: "Regroupe les termes en lettre ensemble, puis les nombres seuls ensemble, en gardant le signe devant chaque terme.",
    tags: ["reduction", "template"],
    generate: () => {
      const L = lettre();
      for (;;) {
        const a = nonNul(-9, 9);
        const b = nonNul(-9, 9);
        const c = nonNul(-12, 12);
        const d = nonNul(-12, 12);
        const forme = randomChoice<Terme[]>([
          [[Math.abs(a), L], [-Math.abs(b), L], [c, ""]],
          [[a, L], [c, ""], [b, L], [d, ""]],
          [[c, ""], [a, L], [b, L]],
          [[a, L], [c, ""], [b, L]],
          [[c, ""], [a, L], [d, ""], [b, L]],
        ]);
        const { reduit, details, nuls } = regrouper(forme);
        if (nuls) continue;
        const e = somme(forme);
        return {
          text: consigneReduire(e),
          format: "short",
          expected: [reduit],
          comparator: "expression_developpee",
          explanation:
            `Définition : réduire consiste à regrouper les termes de même nature.\n\n` +
            `Méthode : chaque terme garde le signe écrit devant lui ; on regroupe les termes en ${L}, puis les nombres.\n\n` +
            `Calcul : ${details}.\n\n` +
            `Conclusion : ${e} = ${reduit}.`,
        };
      }
    },
  },

  {
    kind: "template",
    id: "3e_litteral_reduire_tpl_4_reunion",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 2,
    theme: "neutral",
    hint: "Écris la somme de toutes les quantités, puis regroupe les termes en lettre et les nombres.",
    tags: ["reduction", "situation", "template"],
    generate: () => {
      const L = randomChoice(["x", "x", "n", "t", "y"]);
      for (;;) {
        const a = randomInt(2, 4);
        const b = randomInt(2, 15);
        const c = randomInt(1, 9);
        const ctx = randomChoice([
          () => ({ termes: [[1, L], [1, L], [a, L], [b, ""], [-c, ""]] as Terme[], s: `Les côtés d’un triangle mesurent ${L} cm, (${L} + ${b}) cm et (${a}${L} - ${c}) cm.`, q: `son périmètre`, u: "cm" }),
          () => ({ termes: [[a, L], [1, L], [b, ""], [a, L], [1, L], [b, ""]] as Terme[], s: `Un rectangle a pour longueur ${a}${L} cm et pour largeur (${L} + ${b}) cm.`, q: `son périmètre (les quatre côtés additionnés)`, u: "cm" }),
          () => ({ termes: [[1, L], [2, L], [b, ""]] as Terme[], s: `Une boulangerie vend ${L} baguettes le matin et (2${L} + ${b}) l’après-midi.`, q: `le nombre de baguettes vendues dans la journée`, u: "baguettes" }),
          () => ({ termes: [[1, L], [1, L], [b, ""], [2, L]] as Terme[], s: `Un cycliste parcourt ${L} km lundi, (${L} + ${b}) km mardi et 2${L} km mercredi.`, q: `la distance parcourue sur les trois jours`, u: "km" }),
          () => ({ termes: [[1, L], [3, L], [-c, ""], [1, L], [b, ""]] as Terme[], s: `Lina a ${L} €, Tom a (3${L} - ${c}) € et Sami a ${b} € de plus que Lina.`, q: `la somme dont disposent les trois amis`, u: "€" }),
          () => ({ termes: [[1, L], [1, L], [b, ""], [a, L], [c, ""]] as Terme[], s: `Léo a ${L} ans, sa sœur a ${b} ans de plus que lui et leur mère a (${a}${L} + ${c}) ans.`, q: `la somme de leurs trois âges`, u: "ans" }),
          () => ({ termes: [[1, L], [2, L], [b, ""], [1, L], [-c, ""]] as Terme[], s: `Un jardin partagé compte trois parcelles d’aires ${L} m², (2${L} + ${b}) m² et (${L} - ${c}) m².`, q: `l’aire totale des parcelles`, u: "m²" }),
          () => ({ termes: [[a, L], [1, L], [c, ""]] as Terme[], s: `Au basket, Inès marque ${a}${L} points et Jade marque (${L} + ${c}) points.`, q: `le total de points des deux joueuses`, u: "points" }),
          () => ({ termes: [[1, L], [a, L], [2, L], [b, ""]] as Terme[], s: `Une pépinière vend ${L} plants de basilic, ${a}${L} plants de tomates et (2${L} + ${b}) plants de fraisiers.`, q: `le nombre total de plants vendus`, u: "plants" }),
          () => ({ termes: [[2, L], [b, ""], [1, L], [-c, ""], [1, L]] as Terme[], s: `Trois morceaux de musique durent (2${L} + ${b}) s, (${L} - ${c}) s et ${L} s.`, q: `la durée totale des trois morceaux`, u: "s" }),
          () => ({ termes: [[a, L], [1, L], [b, ""], [1, L], [b, ""]] as Terme[], s: `Une piste d’athlétisme est formée de trois segments de ${a}${L} m, (${L} + ${b}) m et (${L} + ${b}) m.`, q: `la longueur totale de la piste`, u: "m" }),
          () => ({ termes: [[a, L], [-c, ""], [1, L], [b, ""]] as Terme[], s: `Au marché, Maé achète des mangues pour (${a}${L} - ${c}) € et des ananas pour (${L} + ${b}) €.`, q: `le montant de ses achats`, u: "€" }),
        ])();
        const r = regrouper(ctx.termes);
        if (r.nuls) continue;
        return {
          text:
            ctx.s +
            " " +
            randomChoice([
              `Exprime ${ctx.q} en fonction de ${L}, sous forme réduite.`,
              `Écris ${ctx.q} sous la forme la plus simple possible.`,
              `Donne une expression réduite de ${ctx.q}.`,
            ]),
          format: "short",
          expected: [r.reduit],
          comparator: "expression_developpee",
          explanation:
            `Définition : réduire consiste à regrouper les termes semblables.\n\n` +
            `Méthode : on additionne toutes les quantités, puis on regroupe les termes en ${L} et les nombres.\n\n` +
            `Calcul : ${somme(ctx.termes)} donne ${r.details}.\n\n` +
            `Conclusion : ${ctx.q} s’écrit ${r.reduit} (en ${ctx.u}).`,
        };
      }
    },
  },

  {
    kind: "template",
    id: "3e_litteral_reduire_tpl_3_double_variable",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 3,
    theme: "neutral",
    hint: "On ne mélange ni des lettres différentes, ni une lettre et son carré : 3x et 3x² ne sont pas semblables.",
    tags: ["reduction", "variable", "template"],
    generate: () => {
      const L = lettre();
      const M = autreLettre(L);
      const L2 = `${L}²`;
      for (;;) {
        const a = nonNul(-8, 8);
        const b = nonNul(-8, 8);
        const c = nonNul(-8, 8);
        const d = nonNul(-8, 8);
        const k = nonNul(-9, 9);
        const forme = randomChoice<Terme[]>([
          [[a, L], [b, M], [c, L], [d, M]],
          [[a, L2], [b, L], [c, L2], [d, L], [k, ""]],
          [[a, L2], [k, ""], [b, L], [c, L2]],
          [[a, L], [b, M], [k, ""], [c, M], [d, L]],
          [[a, L2], [b, L], [c, L], [d, L2]],
          [[k, ""], [a, L], [b, L2], [c, ""], [d, L]],
        ]);
        const { reduit, details, nuls } = regrouper(forme);
        if (nuls) continue;
        const e = somme(forme);
        return {
          text: consigneReduire(e),
          format: "short",
          expected: [reduit],
          comparator: "expression_developpee",
          explanation:
            `Définition : seuls les termes semblables (même lettre, même exposant) peuvent être regroupés.\n\n` +
            `Méthode : on regroupe chaque famille de termes séparément, en gardant les signes.\n\n` +
            `Calcul : ${details}.\n\n` +
            `Conclusion : ${e} = ${reduit}.`,
        };
      }
    },
  },

  {
    kind: "template",
    id: "3e_litteral_reduire_tpl_5_produit",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour réduire un produit, multiplie les nombres entre eux, puis les lettres entre elles (x × x = x²).",
    tags: ["reduction", "produit", "template"],
    generate: () => {
      const L = lettre();
      const M = autreLettre(L);
      const a = nonUn(-7, 9);
      const b = nonUn(-7, 9);
      const c = nonUn(-9, 9);
      const A = (n: number) => (n < 0 ? `(${somme([[n, L]])})` : somme([[n, L]]));
      const cas = randomChoice([
        () => ({ e: `${somme([[a, L]])} × ${A(b)}`, r: somme([[a * b, `${L}²`]]), c: `${val(a)} × ${val(b)} = ${a * b} et ${L} × ${L} = ${L}²` }),
        () => ({ e: `${somme([[a, L]])} × ${val(b)}`, r: somme([[a * b, L]]), c: `${val(a)} × ${val(b)} = ${a * b}` }),
        () => ({ e: `${somme([[a, L]])} × ${b < 0 ? `(${somme([[b, M]])})` : somme([[b, M]])}`, r: somme([[a * b, [L, M].sort().join("")]]), c: `${val(a)} × ${val(b)} = ${a * b} et ${L} × ${M} = ${[L, M].sort().join("")}` }),
        () => ({ e: `${somme([[a, `${L}²`]])} × ${A(b)}`, r: somme([[a * b, `${L}³`]]), c: `${val(a)} × ${val(b)} = ${a * b} et ${L}² × ${L} = ${L}³` }),
        () => ({ e: `${somme([[a, L]])} × ${A(b)} + ${somme([[Math.abs(c), `${L}²`]])}`, r: somme([[a * b + Math.abs(c), `${L}²`]]), c: `${somme([[a, L]])} × ${A(b)} = ${somme([[a * b, `${L}²`]])}, puis ${somme([[a * b, `${L}²`], [Math.abs(c), `${L}²`]])} = ${somme([[a * b + Math.abs(c), `${L}²`]])}` }),
        () => ({ e: `${val(c)} × ${A(a)} × ${L}`, r: somme([[a * c, `${L}²`]]), c: `${val(c)} × ${val(a)} = ${a * c} et ${L} × ${L} = ${L}²` }),
      ])();
      if (cas.r === "0") return { text: consigneReduire(`3${L} × 4${L}`), format: "short", expected: [`12${L}²`], comparator: "expression_developpee", explanation: `Définition : réduire un produit, c’est l’écrire avec un seul nombre devant les lettres.\n\nMéthode : on multiplie les nombres, puis les lettres.\n\nCalcul : 3 × 4 = 12 et ${L} × ${L} = ${L}².\n\nConclusion : 3${L} × 4${L} = 12${L}².` };
      return {
        text: consigneReduire(cas.e),
        format: "short",
        expected: [cas.r],
        comparator: "expression_developpee",
        explanation:
          `Définition : réduire un produit, c’est l’écrire avec un seul nombre devant les lettres.\n\n` +
          `Méthode : on multiplie les nombres entre eux (règle des signes), puis les lettres entre elles.\n\n` +
          `Calcul : ${cas.c}.\n\n` +
          `Conclusion : ${cas.e} = ${cas.r}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_litteral_reduire_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : 3x + 2 = 5x. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "2 n’est pas un terme en x.",
    explanation:
      "Définition : seuls les termes semblables peuvent être additionnés.\n\n" +
      "Méthode : 3x est un terme en x alors que 2 est un nombre seul.\n\n" +
      "Calcul : on ne peut pas additionner 3x et 2.\n\n" +
      "Conclusion : 3x + 2 ne peut pas se réduire en 5x.",
    tags: ["reduction", "erreur"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_reduire_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 3,
    theme: "neutral",
    text: "Explique ce que signifie « termes semblables » en calcul littéral.",
    format: "open",
    expected: ["meme", "lettre", "puissance"],
    comparator: "contains_keyword",
    hint: "Les termes doivent avoir la même partie littérale.",
    explanation:
      "Définition : deux termes sont semblables lorsqu’ils possèdent la même partie littérale.\n\n" +
      "Méthode : on compare les lettres et leurs puissances.\n\n" +
      "Calcul : par exemple 3x et -2x sont semblables, mais 3x et 3y ne le sont pas.\n\n" +
      "Conclusion : seuls les termes semblables peuvent être regroupés.",
    tags: ["reduction", "open", "vocabulaire"],
  },

  /* =========================
     LITTERAL_DEVELOPPER
  ========================= */

  {
    kind: "fixed",
    id: "3e_litteral_developper_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_developper",
    difficulty: 2,
    theme: "neutral",
    text: "Développer : 3(x + 4)",
    format: "qcm",
    choices: ["3x + 12", "3x + 4", "x + 12", "7x"],
    expected: ["3x + 12"],
    comparator: "mcq_exact",
    hint: "Multiplie 3 par chaque terme de la parenthèse.",
    explanation:
      "Définition : développer, c’est supprimer les parenthèses en distribuant la multiplication.\n\n" +
      "Méthode : on multiplie 3 par x puis 3 par 4.\n\n" +
      "Calcul : 3(x + 4) = 3 × x + 3 × 4 = 3x + 12.\n\n" +
      "Conclusion : l’expression développée est 3x + 12.",
    tags: ["litteral", "developper", "distributivite", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_developper_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_developper",
    difficulty: 3,
    theme: "neutral",
    text: "Développer : -2(x - 5)",
    format: "short",
    expected: ["-2x + 10"],
    comparator: "expression_developpee",
    hint: "Attention au signe moins devant 2.",
    explanation:
      "Définition : développer, c’est multiplier chaque terme de la parenthèse par le facteur extérieur.\n\n" +
      "Méthode : on multiplie -2 par x puis -2 par -5.\n\n" +
      "Calcul : -2(x - 5) = -2 × x + (-2) × (-5) = -2x + 10.\n\n" +
      "Conclusion : l’expression développée est -2x + 10.",
    tags: ["litteral", "developper", "signe"],
  },

  {
    kind: "template",
    id: "3e_litteral_developper_tpl_1_simple",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_developper",
    difficulty: 2,
    theme: "neutral",
    hint: "Le nombre devant la parenthèse multiplie CHAQUE terme de la parenthèse.",
    tags: ["litteral", "developper", "template"],
    generate: () => {
      const L = lettre();
      const k = randomInt(2, 9);
      const a = randomInt(1, 5);
      const b = nonNul(-9, 9);
      if (Math.random() < 0.3) {
        const c = randomInt(2, 12);
        const obj = randomChoice([
          { s: `Un potager rectangulaire mesure ${k} m de large et (${L} + ${c}) m de long.`, q: "son aire", u: "m²" },
          { s: `Un tapis rectangulaire mesure ${k} dm sur (${L} + ${c}) dm.`, q: "son aire", u: "dm²" },
          { s: `Une affiche mesure ${k} dm de haut et (${L} + ${c}) dm de large.`, q: "son aire", u: "dm²" },
          { s: `Un groupe de ${k} amis paie chacun (${L} + ${c}) € pour un concert.`, q: "la somme payée par le groupe", u: "€" },
          { s: `Un panneau solaire rectangulaire mesure ${k} dm sur (${L} + ${c}) dm.`, q: "sa surface", u: "dm²" },
          { s: `Une équipe de ${k} coureurs fait chacun (${L} + ${c}) tours de piste.`, q: "le nombre total de tours", u: "tours" },
        ]);
        const r = lin(k, k * c, L);
        return {
          text: `${obj.s} ${randomChoice([`Exprime ${obj.q} en fonction de ${L}, sous forme développée.`, `Écris ${obj.q} sans parenthèses.`, `Donne ${obj.q} sous forme développée.`])}`,
          format: "short",
          expected: [r],
          comparator: "expression_developpee",
          explanation:
            `Définition : développer, c’est transformer un produit en somme.\n\n` +
            `Méthode : ${obj.q} vaut ${k}(${L} + ${c}) ; on multiplie ${k} par ${L}, puis ${k} par ${c}.\n\n` +
            `Calcul : ${k}(${L} + ${c}) = ${k} × ${L} + ${k} × ${c} = ${r}.\n\n` +
            `Conclusion : ${obj.q} vaut ${r} (en ${obj.u}).`,
        };
      }
      const forme = randomChoice(["k(aL+b)", "k(b+aL)", "(aL+b)k", "k(aL+b)"]);
      const interieur = forme === "k(b+aL)" ? somme([[b, ""], [a, L]]) : lin(a, b, L);
      const e = forme === "(aL+b)k" ? `(${interieur}) × ${k}` : `${k}(${interieur})`;
      const r = forme === "k(b+aL)" ? somme([[k * b, ""], [k * a, L]]) : lin(k * a, k * b, L);
      return {
        text: consigneDevelopper(e),
        format: "short",
        expected: [r],
        comparator: "expression_developpee",
        explanation:
          `Définition : développer consiste à transformer un produit en somme.\n\n` +
          `Méthode : on multiplie ${k} par chaque terme de la parenthèse : k(a + b) = ka + kb.\n\n` +
          `Calcul : ${e} = ${k} × ${somme([[a, L]])} ${b < 0 ? "-" : "+"} ${k} × ${Math.abs(b)} = ${r}.\n\n` +
          `Conclusion : l’expression développée est ${r}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_developper_tpl_2_moins",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_developper",
    difficulty: 3,
    theme: "neutral",
    hint: "Un signe moins devant une parenthèse change le signe de CHAQUE terme de la parenthèse.",
    tags: ["litteral", "developper", "moins", "template"],
    generate: () => {
      const L = lettre();
      for (;;) {
        const a = randomInt(1, 6);
        const b = nonNul(-9, 9);
        const c = nonNul(-12, 12);
        const d = randomInt(1, 7);
        const forme = randomChoice(["-(P)", "c-(P)", "dL-(P)", "(P)-(Q)"]);
        const P = lin(a, b, L);
        let e: string;
        let termes: Terme[];
        if (forme === "-(P)") {
          e = `-(${P})`;
          termes = [[-a, L], [-b, ""]];
        } else if (forme === "c-(P)") {
          e = `${c} - (${P})`;
          termes = [[c, ""], [-a, L], [-b, ""]];
        } else if (forme === "dL-(P)") {
          e = `${somme([[d, L]])} - (${P})`;
          termes = [[d, L], [-a, L], [-b, ""]];
        } else {
          const Q = lin(d, c, L);
          e = `(${Q}) - (${P})`;
          termes = [[d, L], [c, ""], [-a, L], [-b, ""]];
        }
        const r = regrouper(termes);
        if (r.nuls) continue;
        return {
          text: consigneDevelopper(e, false),
          format: "short",
          expected: [r.reduit],
          comparator: "expression_developpee",
          explanation:
            `Définition : -(a + b) = -a - b : on enlève la parenthèse précédée d’un signe moins en changeant le signe de chacun de ses termes.\n\n` +
            `Méthode : on supprime les parenthèses, puis on réduit.\n\n` +
            `Calcul : ${e} = ${somme(termes)} = ${r.reduit}.\n\n` +
            `Conclusion : l’expression développée et réduite est ${r.reduit}.`,
        };
      }
    },
  },

  {
    kind: "template",
    id: "3e_litteral_developper_tpl_3_signe",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_developper",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie le facteur (avec son signe) par chaque terme : moins par moins donne plus.",
    tags: ["litteral", "developper", "signe", "template"],
    generate: () => {
      const L = lettre();
      const k = randomInt(2, 8);
      const a = randomInt(1, 5);
      const b = nonNul(-9, 9);
      const cas = randomChoice([
        () => ({ e: `-${k}(${lin(a, b, L)})`, r: lin(-k * a, -k * b, L), c: `-${k} × ${somme([[a, L]])} + (-${k}) × ${val(b)}` }),
        () => ({ e: `${L}(${lin(a, b, L)})`, r: quad(a, b, 0, L), c: `${L} × ${somme([[a, L]])} + ${L} × ${val(b)}` }),
        () => ({ e: `-${L}(${lin(a, b, L)})`, r: quad(-a, -b, 0, L), c: `-${L} × ${somme([[a, L]])} + (-${L}) × ${val(b)}` }),
        () => ({ e: `${k}${L}(${lin(a, b, L)})`, r: quad(k * a, k * b, 0, L), c: `${k}${L} × ${somme([[a, L]])} + ${k}${L} × ${val(b)}` }),
        () => ({ e: `-${k}${L}(${somme([[b, ""], [a, L]])})`, r: somme([[-k * b, L], [-k * a, `${L}²`]]), c: `-${k}${L} × ${val(b)} + (-${k}${L}) × ${somme([[a, L]])}` }),
        () => ({ e: `(${lin(a, b, L)}) × (-${k})`, r: lin(-k * a, -k * b, L), c: `${somme([[a, L]])} × (-${k}) + ${val(b)} × (-${k})` }),
      ])();
      return {
        text: consigneDevelopper(cas.e),
        format: "short",
        expected: [cas.r],
        comparator: "expression_developpee",
        explanation:
          `Définition : développer consiste à multiplier chaque terme de la parenthèse par le facteur extérieur.\n\n` +
          `Méthode : on applique k(a + b) = ka + kb avec la règle des signes, et ${L} × ${L} = ${L}².\n\n` +
          `Calcul : ${cas.e} = ${cas.c} = ${cas.r}.\n\n` +
          `Conclusion : l’expression développée est ${cas.r}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_developper_tpl_4_double_distributivite",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_developper",
    difficulty: 4,
    theme: "neutral",
    hint: "(a + b)(c + d) = ac + ad + bc + bd : chaque terme de la première parenthèse multiplie chaque terme de la seconde.",
    tags: ["litteral", "developper", "double_distributivite", "template"],
    generate: () => {
      const L = lettre();
      for (;;) {
        const a = randomInt(1, 5);
        const b = nonNul(-7, 7);
        const c = randomInt(1, 5);
        const d = nonNul(-7, 7);
        if (a * d + b * c === 0) continue;
        const premier = Math.random() < 0.2 ? somme([[b, ""], [a, L]]) : lin(a, b, L);
        const P = `(${premier})`;
        const Q = `(${lin(c, d, L)})`;
        const r = quad(a * c, a * d + b * c, b * d, L);
        const detail = `${quad(a * c, 0, 0, L)} ${a * d < 0 ? "-" : "+"} ${somme([[Math.abs(a * d), L]])} ${b * c < 0 ? "-" : "+"} ${somme([[Math.abs(b * c), L]])} ${b * d < 0 ? "-" : "+"} ${Math.abs(b * d)}`;
        if (Math.random() < 0.25) {
          const obj = randomChoice([
            { s: `Un rectangle mesure ${P} cm de long et ${Q} cm de large.`, q: "son aire" },
            { s: `Une terrasse rectangulaire a pour dimensions ${P} m et ${Q} m.`, q: "sa surface" },
            { s: `Un écran rectangulaire mesure ${P} cm sur ${Q} cm.`, q: "son aire" },
            { s: `Un parterre de fleurs rectangulaire mesure ${P} m sur ${Q} m.`, q: "son aire" },
          ]);
          if (b < 0 || d < 0) continue;
          return {
            text: `${obj.s} Exprime ${obj.q} en fonction de ${L}, sous forme développée et réduite.`,
            format: "short",
            expected: [r],
            comparator: "expression_developpee",
            explanation:
              `Définition : l’aire d’un rectangle est longueur × largeur ; la double distributivité développe un produit de deux parenthèses.\n\n` +
              `Méthode : on multiplie chaque terme de ${P} par chaque terme de ${Q}, puis on réduit.\n\n` +
              `Calcul : ${P}${Q} = ${detail} = ${r}.\n\n` +
              `Conclusion : ${obj.q} vaut ${r}.`,
          };
        }
        const e = `${P}${Q}`;
        return {
          text: consigneDevelopper(e),
          format: "short",
          expected: [r],
          comparator: "expression_developpee",
          explanation:
            `Définition : la double distributivité permet de développer un produit de deux parenthèses.\n\n` +
            `Méthode : on multiplie chaque terme de la première parenthèse par chaque terme de la seconde, puis on réduit.\n\n` +
            `Calcul : ${e} = ${detail} = ${r}.\n\n` +
            `Conclusion : l’expression développée et réduite est ${r}.`,
        };
      }
    },
  },

  {
    kind: "template",
    id: "3e_litteral_developper_tpl_5_somme_de_produits",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_developper",
    difficulty: 4,
    theme: "neutral",
    hint: "Développe chaque produit séparément ; si un produit est précédé d’un signe moins, mets son développement entre parenthèses avant de les enlever.",
    tags: ["litteral", "developper", "somme_de_produits", "template"],
    generate: () => {
      const L = lettre();
      for (;;) {
        const k = randomInt(2, 7);
        const m = randomInt(2, 7);
        const a = nonNul(-8, 8);
        const b = nonNul(-8, 8);
        const c = nonNul(-6, 6);
        const d = nonNul(-6, 6);
        const op = randomChoice([1, -1]);
        const sgn = op > 0 ? "+" : "-";
        const forme = randomChoice(["k()+m()", "L()+()()", "()()+k()", "kL()+()()"]);
        let e: string;
        let p1: Terme[];
        let p2: Terme[];
        if (forme === "k()+m()") {
          e = `${k}(${lin(1, a, L)}) ${sgn} ${m}(${lin(1, b, L)})`;
          p1 = [[k, L], [k * a, ""]];
          p2 = [[m, L], [m * b, ""]];
        } else if (forme === "L()+()()") {
          e = `${L}(${lin(1, a, L)}) ${sgn} (${lin(1, c, L)})(${lin(1, d, L)})`;
          p1 = [[1, `${L}²`], [a, L]];
          p2 = [[1, `${L}²`], [c + d, L], [c * d, ""]];
        } else if (forme === "()()+k()") {
          e = `(${lin(1, c, L)})(${lin(2, d, L)}) ${sgn} ${k}(${lin(1, a, L)})`;
          p1 = [[2, `${L}²`], [d + 2 * c, L], [c * d, ""]];
          p2 = [[k, L], [k * a, ""]];
        } else {
          e = `${k}${L}(${lin(1, a, L)}) ${sgn} (${lin(1, c, L)})(${lin(1, d, L)})`;
          p1 = [[k, `${L}²`], [k * a, L]];
          p2 = [[1, `${L}²`], [c + d, L], [c * d, ""]];
        }
        const termes: Terme[] = [...p1, ...p2.map(([n, p]) => [op * n, p] as Terme)];
        const r = regrouper(termes);
        if (r.nuls || r.reduit === "0") continue;
        return {
          text: consigneDevelopper(e, false),
          format: "short",
          expected: [r.reduit],
          comparator: "expression_developpee",
          explanation:
            `Définition : pour développer une somme de produits, on développe chaque produit, puis on réduit.\n\n` +
            `Méthode : ${op < 0 ? "le second produit est précédé d’un signe moins : on écrit son développement entre parenthèses, puis on change tous ses signes" : "on développe les deux produits, puis on regroupe les termes semblables"}.\n\n` +
            `Calcul : ${e} = ${somme(p1)} ${sgn} (${somme(p2)}) = ${somme(termes)} = ${r.reduit}.\n\n` +
            `Conclusion : l’expression développée et réduite est ${r.reduit}.`,
        };
      }
    },
  },

  {
    kind: "fixed",
    id: "3e_litteral_developper_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_developper",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : 4(x + 3) = 4x + 3. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le 4 doit multiplier tous les termes de la parenthèse.",
    explanation:
      "Définition : développer consiste à multiplier chaque terme de la parenthèse par le facteur extérieur.\n\n" +
      "Méthode : on multiplie 4 par x et 4 par 3.\n\n" +
      "Calcul : 4(x + 3) = 4x + 12, et non 4x + 3.\n\n" +
      "Conclusion : l’élève a oublié de multiplier le deuxième terme.",
    tags: ["litteral", "developper", "erreur"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_developper_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_developper",
    difficulty: 3,
    theme: "neutral",
    text: "Explique ce que signifie développer une expression.",
    format: "open",
    expected: ["parenthèses", "multiplie", "distributivité"],
    comparator: "contains_keyword",
    hint: "Développer sert souvent à supprimer les parenthèses.",
    explanation:
      "Définition : développer une expression signifie transformer un produit avec parenthèses en une somme ou une différence.\n\n" +
      "Méthode : on utilise la distributivité en multipliant chaque terme de la parenthèse.\n\n" +
      "Calcul : par exemple, 3(x + 2) = 3x + 6.\n\n" +
      "Conclusion : développer permet de supprimer les parenthèses correctement.",
    tags: ["litteral", "developper", "open"],
  },

  /* =========================
     LITTERAL_FACTORISER
     ★2 facteur commun numérique ; ★3 facteur commun avec la lettre, premières
     identités (x² + 6x + 9, x² - 25), reconnaître la forme ; ★4 parenthèse
     commune, (2x - 3)², 9x² - 16, (x + 2)² - 9, choisir la méthode.
  ========================= */

  {
    kind: "fixed",
    id: "3e_litteral_factoriser_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 2,
    theme: "neutral",
    text: "Factoriser : 3x + 12",
    format: "qcm",
    choices: ["3(x + 4)", "x(3 + 12)", "3(x + 12)", "12(x + 3)"],
    expected: ["3(x + 4)"],
    comparator: "mcq_exact",
    hint: "Cherche le facteur commun.",
    explanation:
      "Définition : factoriser, c’est transformer une somme en produit.\n\n" +
      "Méthode : on cherche un facteur commun aux deux termes.\n\n" +
      "Calcul : 3x + 12 = 3 × x + 3 × 4 = 3(x + 4).\n\n" +
      "Conclusion : la forme factorisée est 3(x + 4).",
    tags: ["litteral", "factoriser", "facteur_commun"],
  },

  {
    kind: "template",
    id: "3e_litteral_factoriser_tpl_1_simple",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le plus grand nombre qui divise les deux termes, puis écris chaque terme comme un produit par ce nombre.",
    tags: ["litteral", "factoriser", "facteur_commun", "template"],
    generate: () => questionFacto(factoNumerique(lettre())),
  },

  {
    kind: "template",
    id: "3e_litteral_factoriser_tpl_5_qcm_facteur_commun",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 2,
    theme: "neutral",
    hint: "Développe chaque proposition dans ta tête : une seule redonne l’expression de départ.",
    tags: ["litteral", "factoriser", "facteur_commun", "qcm", "template"],
    generate: () => {
      const L = lettre();
      const k = randomInt(2, 9);
      const a = randomInt(1, 4);
      let b = randomInt(2, 9);
      while (pgcdDe(a, b) !== 1) b = randomInt(2, 9);
      const s = randomChoice([1, -1]);
      const e = lin(k * a, s * k * b, L);
      const bon = `${k}(${lin(a, s * b, L)})`;
      const pieges = [
        `${k}(${lin(a, s * k * b, L)})`,
        `${k}(${lin(a, -s * b, L)})`,
        `${L}(${k * a} ${s > 0 ? "+" : "-"} ${k * b})`,
        `${k * b}(${lin(a, s * k, L)})`,
      ];
      const text = randomChoice([
        () => `Quelle est la forme factorisée de ${e} ?`,
        () => `Parmi ces écritures, laquelle est une factorisation de ${e} ?`,
        () => `Quel produit est égal à ${e} ?`,
        () => `${randomChoice(PRENOMS)} doit factoriser ${e}. Quelle réponse est juste ?`,
        () => `On met ${k} en facteur dans ${e}. Qu’obtient-on ?`,
      ])();
      return {
        text,
        format: "qcm",
        choices: makeChoices(bon, pieges),
        expected: [bon],
        comparator: "mcq_exact",
        explanation:
          `Définition : factoriser, c’est écrire une somme sous la forme d’un produit.\n\n` +
          `Méthode : ${k} divise les deux termes : c’est le facteur commun.\n\n` +
          `Calcul : ${e} = ${k} × ${somme([[a, L]])} ${s > 0 ? "+" : "-"} ${k} × ${b} = ${bon}.\n\n` +
          `Conclusion : la bonne réponse est ${bon} ; en la développant, on retrouve ${e}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_factoriser_tpl_2_avec_x",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 3,
    theme: "neutral",
    hint: "La lettre elle-même peut être en facteur : x² = x × x. Mets en facteur tout ce qui est commun (nombre ET lettre).",
    tags: ["litteral", "factoriser", "facteur_x", "template"],
    generate: () => questionFacto(factoLitterale(lettre())),
  },

  {
    kind: "template",
    id: "3e_litteral_factoriser_tpl_3_signe_moins",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 3,
    theme: "neutral",
    hint: "Le facteur commun peut être négatif, ou se retrouver dans trois termes à la fois.",
    tags: ["litteral", "factoriser", "signe", "template"],
    generate: () => {
      const L = lettre();
      const M = autreLettre(L);
      const pgcd = (u: number, v: number): number => (v === 0 ? Math.abs(u) : pgcd(v, u % v));
      for (;;) {
        const k = randomInt(2, 7);
        const a = randomInt(1, 4);
        const b = nonNul(-8, 8);
        const c = nonNul(-8, 8);
        const cas = randomChoice(["neg", "trois", "deuxLettres"]);
        if (cas === "neg") {
          if (b < 0 || pgcdDe(a, b) !== 1) continue;
          const e = lin(-k * a, -k * b, L);
          const f = `-${k}(${lin(a, b, L)})`;
          return questionFacto({
            e,
            f,
            calcul: `les deux termes sont négatifs : on met -${k} en facteur. ${e} = -${k} × ${somme([[a, L]])} + (-${k}) × ${b} = ${f}`,
            methode: "un facteur commun (ici négatif)",
          });
        }
        if (cas === "trois") {
          if (pgcd(pgcd(a, b), c) !== 1) continue;
          const e = quad(k * a, k * b, k * c, L);
          const f = `${k}(${quad(a, b, c, L)})`;
          return questionFacto({
            e,
            f,
            calcul: `${k} divise les trois termes : ${e} = ${k} × ${somme([[a, `${L}²`]])} ${b < 0 ? "-" : "+"} ${k} × ${somme([[Math.abs(b), L]])} ${c < 0 ? "-" : "+"} ${k} × ${Math.abs(c)} = ${f}`,
            methode: "un facteur commun aux trois termes",
          });
        }
        if (pgcd(a, b) !== 1) continue;
        const e = somme([[k * a, `${L}${M}`], [k * b, L]]);
        const f = `${k}${L}(${lin(a, b, M)})`;
        return questionFacto({
          e,
          f,
          calcul: `${k}${L} est commun aux deux termes : ${e} = ${k}${L} × ${somme([[a, M]])} ${b < 0 ? "-" : "+"} ${k}${L} × ${Math.abs(b)} = ${f}`,
          methode: "un facteur commun (un nombre et une lettre)",
        });
      }
    },
  },

  {
    kind: "template",
    id: "3e_litteral_factoriser_tpl_4_reunion",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 3,
    theme: "neutral",
    hint: "La forme factorisée fait apparaître une longueur ou une quantité « × » une autre : cherche le facteur commun.",
    tags: ["litteral", "factoriser", "situation", "template"],
    generate: () => {
      const L = randomChoice(["x", "x", "n", "t", "y"]);
      const k = randomInt(2, 9);
      const a = randomInt(1, 3);
      let b = randomInt(1, 9);
      while (pgcdDe(a, b) !== 1) b = randomInt(1, 9);
      const ctx = randomChoice([
        () => ({ s: `Un rectangle de largeur ${k} cm a pour aire (${lin(k * a, k * b, L)}) cm².`, q: `Écris cette aire sous forme d’un produit pour faire apparaître la longueur.`, e: lin(k * a, k * b, L), f: `${k}(${lin(a, b, L)})`, calcul: `${lin(k * a, k * b, L)} = ${k} × ${somme([[a, L]])} + ${k} × ${b} = ${k}(${lin(a, b, L)}) : la longueur est ${lin(a, b, L)} cm` }),
        () => ({ s: `Le périmètre d’un carré est (${lin(4 * a, 4 * b, L)}) cm.`, q: `Factorise ce périmètre par 4 pour lire la longueur d’un côté.`, e: lin(4 * a, 4 * b, L), f: `4(${lin(a, b, L)})`, calcul: `${lin(4 * a, 4 * b, L)} = 4 × ${somme([[a, L]])} + 4 × ${b} = 4(${lin(a, b, L)}) : un côté mesure ${lin(a, b, L)} cm` }),
        () => ({ s: `Un rectangle de longueur ${L} a pour aire ${quad(1, b, 0, L)}.`, q: `Factorise cette aire pour trouver sa largeur.`, e: quad(1, b, 0, L), f: `${L}(${lin(1, b, L)})`, calcul: `${quad(1, b, 0, L)} = ${L} × ${L} + ${L} × ${b} = ${L}(${lin(1, b, L)}) : la largeur est ${lin(1, b, L)}` }),
        () => ({ s: `${k} amis partagent une note de restaurant de (${lin(k * a, k * b, L)}) € en parts égales.`, q: `Écris la note sous la forme ${k} × (…) pour lire la part de chacun.`, e: lin(k * a, k * b, L), f: `${k}(${lin(a, b, L)})`, calcul: `${lin(k * a, k * b, L)} = ${k}(${lin(a, b, L)}) : chacun paie ${lin(a, b, L)} €` }),
        () => ({ s: `Une bande de terrain a une aire de (${lin(k * a, k * b, L)}) m² et une largeur de ${k} m.`, q: `Factorise cette aire.`, e: lin(k * a, k * b, L), f: `${k}(${lin(a, b, L)})`, calcul: `${lin(k * a, k * b, L)} = ${k} × ${somme([[a, L]])} + ${k} × ${b} = ${k}(${lin(a, b, L)})` }),
        () => ({ s: `Un fleuriste prépare ${k} bouquets identiques avec, en tout, ${lin(k * a, k * b, L)} fleurs.`, q: `Écris ce nombre de fleurs sous forme factorisée pour connaître la composition d’un bouquet.`, e: lin(k * a, k * b, L), f: `${k}(${lin(a, b, L)})`, calcul: `${lin(k * a, k * b, L)} = ${k}(${lin(a, b, L)}) : un bouquet compte ${lin(a, b, L)} fleurs` }),
        () => ({ s: `Un panneau rectangulaire de hauteur ${k}${L} dm a pour aire (${quad(k * a, k * b, 0, L)}) dm².`, q: `Factorise cette aire par ${k}${L}.`, e: quad(k * a, k * b, 0, L), f: `${k}${L}(${lin(a, b, L)})`, calcul: `${quad(k * a, k * b, 0, L)} = ${k}${L} × ${somme([[a, L]])} + ${k}${L} × ${b} = ${k}${L}(${lin(a, b, L)})` }),
        () => ({ s: `Pour une fête, ${k} tables identiques reçoivent en tout ${lin(k * a, k * b, L)} invités.`, q: `Écris ce nombre sous forme d’un produit.`, e: lin(k * a, k * b, L), f: `${k}(${lin(a, b, L)})`, calcul: `${lin(k * a, k * b, L)} = ${k}(${lin(a, b, L)}) : ${lin(a, b, L)} invités par table` }),
      ])();
      return questionFacto({ e: ctx.e, f: ctx.f, calcul: ctx.calcul, methode: "un facteur commun" }, `${ctx.s} ${ctx.q}`);
    },
  },

  {
    kind: "template",
    id: "3e_litteral_factoriser_tpl_x1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 3,
    theme: "neutral",
    hint: "Mets en facteur le nombre ET la lettre communs aux deux termes.",
    tags: ["litteral", "factoriser", "qcm", "template"],
    generate: () => {
      const L = lettre();
      const k = randomInt(2, 6);
      const a = randomInt(1, 4);
      let b = randomInt(2, 9);
      while (pgcdDe(a, b) !== 1) b = randomInt(2, 9);
      const s = randomChoice([1, -1]);
      const kL = `${k}${L}`;
      const e = quad(k * a, s * k * b, 0, L);
      const bon = `${kL}(${lin(a, s * b, L)})`;
      const pieges = [
        `${kL}(${lin(a, s * k * b, L)})`,
        `${k}(${somme([[a, `${L}²`], [s * b, ""]])})`,
        `${kL}(${lin(a, -s * b, L)})`,
        `${L}²(${k * a} ${s > 0 ? "+" : "-"} ${k * b})`,
      ];
      const text = randomChoice([
        () => `Factorise ${e}.`,
        () => `Quelle est la forme factorisée de ${e} ?`,
        () => `On met ${kL} en facteur dans ${e}. Quel produit obtient-on ?`,
        () => `Parmi ces produits, lequel est égal à ${e} ?`,
      ])();
      return {
        text,
        format: "qcm",
        choices: makeChoices(bon, pieges),
        expected: [bon],
        comparator: "mcq_exact",
        explanation:
          `Définition : on met en facteur ce qui est commun aux deux termes.\n\n` +
          `Méthode : ${somme([[k * a, `${L}²`]])} = ${kL} × ${somme([[a, L]])} et ${k * b}${L} = ${kL} × ${b} : le facteur commun est ${kL}.\n\n` +
          `Calcul : ${e} = ${bon}.\n\n` +
          `Conclusion : la forme factorisée est ${bon}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_litteral_factoriser_identite_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 3,
    theme: "neutral",
    text: "Factoriser : x² + 6x + 9",
    format: "qcm",
    choices: ["(x + 3)²", "(x - 3)²", "(x - 3)(x + 3)", "x(x + 9)"],
    expected: ["(x + 3)²"],
    comparator: "mcq_exact",
    hint: "9 = 3² et 6x = 2 × 3 × x.",
    explanation:
      "Définition : factoriser, c’est transformer une somme ou une différence en produit.\n\n" +
      "Méthode : on reconnaît le carré d’une somme : a² + 2ab + b² = (a + b)².\n\n" +
      "Calcul : x² + 6x + 9 = x² + 2 × x × 3 + 3² = (x + 3)².\n\n" +
      "Conclusion : la forme factorisée est (x + 3)².",
    tags: ["litteral_factorisation", "identite_remarquable", "somme"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_factoriser_identite_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 3,
    theme: "neutral",
    text: "Factoriser : x² - 8x + 16",
    format: "qcm",
    choices: ["(x - 4)²", "(x + 4)²", "(x - 4)(x + 4)", "x(x - 16)"],
    expected: ["(x - 4)²"],
    comparator: "mcq_exact",
    hint: "16 = 4² et -8x = -2 × 4 × x.",
    explanation:
      "Définition : factoriser, c’est transformer une somme ou une différence en produit.\n\n" +
      "Méthode : on reconnaît le carré d’une différence : a² - 2ab + b² = (a - b)².\n\n" +
      "Calcul : x² - 8x + 16 = x² - 2 × x × 4 + 4² = (x - 4)².\n\n" +
      "Conclusion : la forme factorisée est (x - 4)².",
    tags: ["litteral_factorisation", "identite_remarquable", "difference"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_factoriser_identite_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 3,
    theme: "neutral",
    text: "Factoriser : x² - 25",
    format: "qcm",
    choices: ["(x - 5)(x + 5)", "(x - 5)²", "(x + 5)²", "x(x - 25)"],
    expected: ["(x - 5)(x + 5)"],
    comparator: "mcq_exact",
    hint: "C’est une différence de deux carrés.",
    explanation:
      "Définition : factoriser, c’est transformer une somme ou une différence en produit.\n\n" +
      "Méthode : on reconnaît la différence de deux carrés : a² - b² = (a - b)(a + b).\n\n" +
      "Calcul : x² - 25 = x² - 5² = (x - 5)(x + 5).\n\n" +
      "Conclusion : la forme factorisée est (x - 5)(x + 5).",
    tags: ["litteral_factorisation", "difference_carres"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_factoriser_identite_fixed_4",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 3,
    theme: "neutral",
    text: "Factoriser : x² + 10x + 25",
    format: "qcm",
    choices: ["(x + 5)²", "(x - 5)²", "(x - 5)(x + 5)", "x(x + 10)"],
    expected: ["(x + 5)²"],
    comparator: "mcq_exact",
    hint: "25 = 5² et 10x = 2 × 5 × x.",
    explanation:
      "Définition : a² + 2ab + b² = (a + b)².\n\n" +
      "Méthode : on reconnaît a = x et b = 5.\n\n" +
      "Calcul : x² + 10x + 25 = (x + 5)².\n\n" +
      "Conclusion : la forme factorisée est (x + 5)².",
    tags: ["litteral_factorisation", "identite_remarquable", "qcm"],
  },

  {
    kind: "template",
    id: "3e_litteral_factoriser_identite_tpl_qcm_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 3,
    theme: "neutral",
    hint: "Trois termes dont deux carrés : carré d’une somme ou d’une différence (regarde le signe du milieu). Deux carrés séparés par un moins : différence de deux carrés.",
    tags: ["litteral_factorisation", "identite_remarquable", "reconnaitre", "qcm", "template"],
    generate: () => {
      const L = lettre();
      const a = randomInt(2, 9);
      const mode = randomChoice(["somme", "difference", "carres", "commun"] as const);
      const e =
        mode === "somme"
          ? quad(1, 2 * a, a * a, L)
          : mode === "difference"
          ? quad(1, -2 * a, a * a, L)
          : mode === "carres"
          ? `${L}² - ${a * a}`
          : quad(1, a, 0, L);
      const formes = {
        somme: `(${L} + ${a})²`,
        difference: `(${L} - ${a})²`,
        carres: `(${L} - ${a})(${L} + ${a})`,
        commun: `${L}(${L} + ${a})`,
      };
      const parMethode = Math.random() < 0.4;
      if (parMethode) {
        const bon = METHODES[mode];
        return {
          text: randomChoice([
            `Pour factoriser ${e}, quelle forme reconnais-tu ?`,
            `Quelle méthode permet de factoriser ${e} ?`,
            `${e} : que faut-il reconnaître pour factoriser cette expression ?`,
          ]),
          format: "qcm",
          choices: shuffle(Object.values(METHODES)),
          expected: [bon],
          comparator: "mcq_exact",
          explanation:
            `Définition : en 3e, on factorise avec un facteur commun ou en reconnaissant une identité remarquable.\n\n` +
            `Méthode : ${mode === "commun" ? `les deux termes contiennent ${L}` : mode === "carres" ? `${a * a} = ${a}², et les deux carrés sont séparés par un signe moins` : `${a * a} = ${a}² et ${2 * a}${L} = 2 × ${L} × ${a}, avec un signe ${mode === "somme" ? "plus" : "moins"} au milieu`}.\n\n` +
            `Calcul : ${e} = ${formes[mode]}.\n\n` +
            `Conclusion : on utilise ${bon}.`,
        };
      }
      const correct = formes[mode];
      return {
        text: randomChoice([
          `Factoriser : ${e}`,
          `Quelle est la forme factorisée de ${e} ?`,
          `${e} est égal à :`,
          `Parmi ces produits, lequel est égal à ${e} ?`,
        ]),
        format: "qcm",
        choices: shuffle(Object.values(formes)),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : on reconnaît une identité remarquable « à l’envers », ou un facteur commun.\n\n" +
          "Méthode : on regarde le nombre de termes, les carrés et le signe du terme du milieu.\n\n" +
          `Calcul : ${e} se factorise en ${correct}.\n\n` +
          `Conclusion : la forme factorisée est ${correct}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_factoriser_tpl_6_identite_simple",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère les carrés : x² et un nombre comme 9 = 3². Un double produit au milieu ? C’est (a ± b)². Un simple « carré moins carré » ? C’est (a - b)(a + b).",
    tags: ["litteral", "factoriser", "identite_remarquable", "template"],
    generate: () => {
      const L = lettre();
      const fa = randomChoice([
        () => factoCarre(L, false, 1),
        () => factoCarre(L, false, -1),
        () => factoDifferenceCarres(L, false),
      ])();
      return questionFacto(fa);
    },
  },

  {
    kind: "fixed",
    id: "3e_litteral_factoriser_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : 5x + 10 = 5(x + 10). A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Vérifie en développant.",
    explanation:
      "Définition : une factorisation correcte doit redonner l’expression de départ lorsqu’on développe.\n\n" +
      "Méthode : on développe 5(x + 10) pour vérifier.\n\n" +
      "Calcul : 5(x + 10) = 5x + 50, pas 5x + 10.\n\n" +
      "Conclusion : l’élève a tort ; la bonne factorisation est 5(x + 2).",
    tags: ["litteral", "factoriser", "erreur"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_factoriser_qcm_x1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la forme factorisée de 4x + 12 ?",
    format: "qcm",
    choices: ["4(x + 3)", "4x + 12", "x(4 + 12)", "4(x + 12)"],
    expected: ["4(x + 3)"],
    comparator: "mcq_exact",
    hint: "Le facteur commun est 4.",
    explanation:
      "Définition : factoriser, c’est mettre en évidence un facteur commun.\n\n" +
      "Méthode : on repère le facteur commun de 4x et 12.\n\n" +
      "Calcul : 4x + 12 = 4 × x + 4 × 3 = 4(x + 3).\n\n" +
      "Conclusion : la forme factorisée est 4(x + 3).",
    tags: ["litteral", "factoriser", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_factoriser_qcm_x2_def",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 3,
    theme: "neutral",
    text: "Factoriser une expression, c’est l’écrire sous forme…",
    format: "qcm",
    choices: ["d’un produit", "d’une somme", "d’une fraction", "d’une racine"],
    expected: ["d’un produit"],
    comparator: "mcq_exact",
    hint: "C’est l’opération inverse du développement.",
    explanation:
      "Définition : factoriser, c’est transformer une somme en produit.\n\n" +
      "Méthode : on met en facteur un terme commun, ou on reconnaît une identité remarquable.\n\n" +
      "Calcul : par exemple 4x + 12 = 4(x + 3) et x² - 9 = (x - 3)(x + 3).\n\n" +
      "Conclusion : on l’écrit sous forme d’un produit.",
    tags: ["litteral", "factoriser", "definition", "qcm"],
  },

  {
    kind: "template",
    id: "3e_litteral_factoriser_identite_tpl_somme_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 4,
    theme: "neutral",
    hint: "Reconnais a² + 2ab + b² : le premier terme est le carré de quoi ? le dernier ? Vérifie le double produit.",
    tags: ["litteral_factorisation", "identite_remarquable", "template"],
    generate: () => questionFacto(factoCarre(lettre(), true, 1)),
  },

  {
    kind: "template",
    id: "3e_litteral_factoriser_identite_tpl_difference_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 4,
    theme: "neutral",
    hint: "Reconnais a² - 2ab + b² : 4x² = (2x)², 9 = 3², et le terme du milieu est -2 × 2x × 3.",
    tags: ["litteral_factorisation", "identite_remarquable", "template"],
    generate: () => questionFacto(factoCarre(lettre(), true, -1)),
  },

  {
    kind: "template",
    id: "3e_litteral_factoriser_identite_tpl_carres_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 4,
    theme: "neutral",
    hint: "Reconnais a² - b² = (a - b)(a + b) : a peut être 3x, ou même une parenthèse comme (x + 2).",
    tags: ["litteral_factorisation", "difference_carres", "template"],
    generate: () => {
      const L = lettre();
      return questionFacto(Math.random() < 0.55 ? factoDifferenceCarres(L, true) : factoDifferenceParenthese(L));
    },
  },

  {
    kind: "template",
    id: "3e_litteral_factoriser_identite_tpl_carres_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 4,
    theme: "neutral",
    hint: "Écris le premier terme comme le carré d’un monôme : 9x² = (3x)².",
    tags: ["litteral_factorisation", "difference_carres", "qcm", "template"],
    generate: () => {
      const L = lettre();
      const c = randomInt(2, 5);
      let b = randomInt(1, 9);
      while (pgcdDe(c, b) !== 1) b = randomInt(1, 9);
      const cL = `${c}${L}`;
      const e = `${c * c}${L}² - ${b * b}`;
      const correct = `(${cL} - ${b})(${cL} + ${b})`;
      return {
        text: randomChoice([
          `Factoriser : ${e}`,
          `Quelle est la forme factorisée de ${e} ?`,
          `Parmi ces produits, lequel est égal à ${e} ?`,
          `${randomChoice(PRENOMS)} veut factoriser ${e}. Quelle écriture est la bonne ?`,
        ]),
        format: "qcm",
        choices: makeChoices(correct, [
          `(${cL} - ${b})²`,
          `(${c * c}${L} - ${b})(${c * c}${L} + ${b})`,
          `(${L} - ${b})(${L} + ${b})`,
          `(${cL} - ${b * b})(${cL} + ${b * b})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : a² - b² = (a - b)(a + b).\n\n" +
          `Méthode : on reconnaît ${c * c}${L}² = (${cL})² et ${b * b} = ${b}².\n\n` +
          `Calcul : ${e} = (${cL})² - ${b}² = ${correct}.\n\n` +
          `Conclusion : la forme factorisée est ${correct}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_factoriser_tpl_7_parenthese_commune",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 4,
    theme: "neutral",
    hint: "Le facteur commun peut être une parenthèse entière, comme (x + 1). Mets-la devant, et écris entre crochets ce qui reste de chaque terme.",
    tags: ["litteral", "factoriser", "parenthese_commune", "template"],
    generate: () => questionFacto(factoParentheseCommune(lettre())),
  },

  {
    kind: "template",
    id: "3e_litteral_factoriser_tpl_8_methode",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche d’abord un facteur commun ; s’il n’y en a pas, repère des carrés : (a ± b)² ou (a - b)(a + b).",
    tags: ["litteral", "factoriser", "choix_methode", "template"],
    generate: () => {
      const L = lettre();
      const fa = randomChoice([
        () => factoNumerique(L),
        () => factoLitterale(L),
        () => factoCarre(L, true),
        () => factoCarre(L, false),
        () => factoDifferenceCarres(L, true),
        () => factoDifferenceParenthese(L),
        () => factoParentheseCommune(L),
      ])();
      const N = randomChoice(NOMS);
      const text = randomChoice([
        () => `Choisis la bonne méthode, puis factorise ${fa.e}.`,
        () => `Factorise ${fa.e} : facteur commun ou identité remarquable ?`,
        () => `On pose ${N} = ${fa.e}. Écris ${N} sous la forme d’un produit.`,
        () => `Trouve une forme factorisée de ${fa.e}.`,
        () => consigneFactoriser(fa.e),
      ])();
      return questionFacto(fa, text);
    },
  },

  {
    kind: "fixed",
    id: "3e_litteral_factoriser_identite_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment factoriser x² - 49.",
    format: "open",
    expected: ["différence", "49", "(x - 7)(x + 7)"],
    comparator: "contains_keyword",
    hint: "49 = 7² : c’est une différence de deux carrés.",
    explanation:
      "Définition : a² - b² = (a - b)(a + b).\n\n" +
      "Méthode : on reconnaît 49 = 7².\n\n" +
      "Calcul : x² - 49 = (x - 7)(x + 7).\n\n" +
      "Conclusion : la forme factorisée est (x - 7)(x + 7).",
    tags: ["litteral_factorisation", "difference_carres", "open"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_factoriser_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_factoriser",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment vérifier qu’une factorisation est correcte.",
    format: "open",
    expected: ["développer", "retrouver", "expression"],
    comparator: "contains_keyword",
    hint: "On peut développer la forme factorisée.",
    explanation:
      "Définition : factoriser transforme une somme en produit.\n\n" +
      "Méthode : pour vérifier, on développe la forme factorisée.\n\n" +
      "Calcul : si on propose 3(x + 4), on développe : 3x + 12.\n\n" +
      "Conclusion : la factorisation est correcte si on retrouve l’expression de départ lorsqu’on développe.",
    tags: ["litteral", "factoriser", "open", "verification"],
  },

  /* =========================
     LITTERAL_IDENTITES
  ========================= */

  {
    kind: "fixed",
    id: "3e_litteral_identite_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_identite",
    difficulty: 3,
    theme: "neutral",
    text: "Développer : (x + 3)²",
    format: "qcm",
    choices: ["x² + 6x + 9", "x² + 9", "x² + 3x + 9", "2x + 9"],
    expected: ["x² + 6x + 9"],
    comparator: "mcq_exact",
    hint: "Utilise (a + b)² = a² + 2ab + b².",
    explanation:
      "Définition : (a + b)² est une identité remarquable.\n\n" +
      "Méthode : on applique la formule (a + b)² = a² + 2ab + b².\n\n" +
      "Calcul : (x + 3)² = x² + 2 × x × 3 + 3² = x² + 6x + 9.\n\n" +
      "Conclusion : le développement est x² + 6x + 9.",
    tags: ["identites", "developpement", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_identite_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_identite",
    difficulty: 3,
    theme: "neutral",
    text: "Développer : (x - 5)²",
    format: "short",
    expected: ["x² - 10x + 25"],
    comparator: "expression_developpee",
    hint: "Attention au signe du terme du milieu.",
    explanation:
      "Définition : (a - b)² = a² - 2ab + b².\n\n" +
      "Méthode : on applique l’identité remarquable.\n\n" +
      "Calcul : (x - 5)² = x² - 2 × x × 5 + 25 = x² - 10x + 25.\n\n" +
      "Conclusion : le développement est x² - 10x + 25.",
    tags: ["identites", "carre_difference"],
  },

  {
    kind: "template",
    id: "3e_litteral_identite_tpl_1_somme",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_identite",
    difficulty: 3,
    theme: "neutral",
    hint: "(a + b)² = a² + 2ab + b² : n’oublie pas le double produit 2ab.",
    tags: ["identites", "carre_somme", "template"],
    generate: () => {
      const L = lettre();
      const b = randomInt(1, 9);
      const id = identite(L, 1, b, "somme");
      const inverse = Math.random() < 0.2;
      const e = inverse ? `(${b} + ${L})²` : id.e;
      return {
        text: consigneIdentite(e, id.formule),
        format: "short",
        expected: [id.r],
        comparator: "expression_developpee",
        explanation: explicationIdentite(e, inverse ? { ...id, ab: `a = ${b} et b = ${L}`, etapes: `${b}² + 2 × ${b} × ${L} + ${L}²` } : id),
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_identite_tpl_2_difference",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_identite",
    difficulty: 3,
    theme: "neutral",
    hint: "(a - b)² = a² - 2ab + b² : le double produit est précédé d’un moins, le dernier carré est positif.",
    tags: ["identites", "carre_difference", "template"],
    generate: () => {
      const L = lettre();
      const b = randomInt(1, 9);
      const id = identite(L, 1, b, "difference");
      const inverse = Math.random() < 0.2;
      const e = inverse ? `(${b} - ${L})²` : id.e;
      return {
        text: consigneIdentite(e, id.formule),
        format: "short",
        expected: [id.r],
        comparator: "expression_developpee",
        explanation: explicationIdentite(e, inverse ? { ...id, ab: `a = ${b} et b = ${L}`, etapes: `${b}² - 2 × ${b} × ${L} + ${L}²` } : id),
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_identite_tpl_5_produit",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_identite",
    difficulty: 3,
    theme: "neutral",
    hint: "(a - b)(a + b) = a² - b² : les termes en x se compensent, il ne reste que deux carrés.",
    tags: ["identites", "produit_somme_difference", "template"],
    generate: () => {
      const L = lettre();
      const b = randomInt(1, 12);
      const id = identite(L, 1, b, "produit");
      const forme = randomChoice(["(L-b)(L+b)", "(L+b)(L-b)", "(b-L)(b+L)"]);
      if (forme === "(b-L)(b+L)") {
        const e = `(${b} - ${L})(${b} + ${L})`;
        const r = somme([[b * b, ""], [-1, `${L}²`]]);
        return {
          text: consigneIdentite(e, id.formule),
          format: "short",
          expected: [r],
          comparator: "expression_developpee",
          explanation: explicationIdentite(e, { ...id, ab: `a = ${b} et b = ${L}`, etapes: `${b}² - ${L}²`, r }),
        };
      }
      const e = forme === "(L+b)(L-b)" ? `(${L} + ${b})(${L} - ${b})` : id.e;
      return {
        text: consigneIdentite(e, id.formule),
        format: "short",
        expected: [id.r],
        comparator: "expression_developpee",
        explanation: explicationIdentite(e, id),
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_identite_tpl_6_quelle_identite",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_identite",
    difficulty: 3,
    theme: "neutral",
    hint: "Un carré d’une somme, un carré d’une différence, ou le produit d’une somme par une différence : regarde la forme avant de calculer.",
    tags: ["identites", "reconnaitre", "qcm", "template"],
    generate: () => {
      const L = lettre();
      const b = randomInt(2, 9);
      const forme = randomChoice(["somme", "difference", "produit"] as const);
      const id = identite(L, 1, b, forme);
      if (Math.random() < 0.5) {
        const formules = [
          "(a + b)² = a² + 2ab + b²",
          "(a - b)² = a² - 2ab + b²",
          "(a - b)(a + b) = a² - b²",
          "k(a + b) = ka + kb",
        ];
        return {
          text: randomChoice([
            `Pour développer ${id.e}, quelle égalité utilises-tu ?`,
            `Quelle identité remarquable permet de développer ${id.e} ?`,
            `${id.e} : quelle formule appliquer pour le développer rapidement ?`,
          ]),
          format: "qcm",
          choices: shuffle(formules),
          expected: [id.formule],
          comparator: "mcq_exact",
          explanation: explicationIdentite(id.e, id),
        };
      }
      const cas =
        forme === "produit"
          ? { trou: `${L}² - …`, bon: `${b * b}`, pieges: [`${2 * b}`, `${b}`, `${2 * b}${L}`, `${b * b}${L}`, `${2 * b * b}`, `${b * b}${L}²`] }
          : { trou: `${L}² ${forme === "somme" ? "+" : "-"} … + ${b * b}`, bon: `${2 * b}${L}`, pieges: [`${b}${L}`, `${b * b}${L}`, `${2 * b}`, `${2 * b}${L}²`] };
      return {
        text: randomChoice([
          `Complète : ${id.e} = ${cas.trou}`,
          `Quel terme manque ? ${id.e} = ${cas.trou}`,
          `Dans le développement ${id.e} = ${cas.trou}, par quoi faut-il remplacer les points ?`,
        ]),
        format: "qcm",
        choices: makeChoices(cas.bon, cas.pieges),
        expected: [cas.bon],
        comparator: "mcq_exact",
        explanation:
          `Définition : ${id.formule}.\n\n` +
          `Méthode : on applique l’identité avec ${id.ab}.\n\n` +
          `Calcul : ${id.e} = ${id.etapes} = ${id.r}.\n\n` +
          `Conclusion : le terme manquant est ${cas.bon}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_litteral_factoriser_verifier_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_identite",
    difficulty: 3,
    theme: "neutral",
    text: "La factorisation x² + 6x + 9 = (x + 3)² est-elle correcte ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Développe (x + 3)².",
    explanation:
      "Définition : on vérifie une factorisation en développant.\n\n" +
      "Méthode : on développe (x + 3)².\n\n" +
      "Calcul : (x + 3)² = x² + 6x + 9.\n\n" +
      "Conclusion : oui, la factorisation est correcte.",
    tags: ["litteral_factorisation", "verifier", "identite", "qcm"],
  },

  {
    kind: "template",
    id: "3e_litteral_identite_tpl_3_difference_carres",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_identite",
    difficulty: 4,
    theme: "neutral",
    hint: "a² - b² = (a - b)(a + b) : a peut être un nombre, 3x, ou toute une parenthèse.",
    tags: ["identites", "difference_carres", "template"],
    generate: () => {
      const L = lettre();
      return questionFacto(
        randomChoice([
          () => factoDifferenceCarres(L, false),
          () => factoDifferenceCarres(L, true),
          () => factoDifferenceParenthese(L),
        ])(),
      );
    },
  },

  {
    kind: "template",
    id: "3e_litteral_identite_tpl_4_reunion",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_identite",
    difficulty: 4,
    theme: "neutral",
    hint: "Écris d’abord l’aire avec des parenthèses (côté × côté), puis reconnais une identité remarquable.",
    tags: ["identites", "aire", "situation", "template"],
    generate: () => {
      const L = randomChoice(["x", "x", "x", "y", "t"]);
      const b = randomInt(1, 6);
      const c = randomInt(2, 4);
      const devS = identite(L, 1, b, "somme");
      const ctx = randomChoice([
        () => ({ s: `Un jardin carré a un côté de (${L} + ${b}) m.`, q: `Exprime son aire sous forme développée et réduite.`, e: `(${L} + ${b})²`, r: devS.r, cmp: "dev", id: devS }),
        () => ({ s: `On agrandit un carré de côté ${L} cm : chaque côté gagne ${b} cm.`, q: `Donne l’aire du nouveau carré, développée et réduite.`, e: `(${L} + ${b})²`, r: devS.r, cmp: "dev", id: devS }),
        () => { const id = identite(L, c, b, "difference"); return { s: `Une dalle carrée mesure (${lin(c, -b, L)}) dm de côté.`, q: `Développe et réduis l’expression de son aire.`, e: id.e, r: id.r, cmp: "dev", id }; },
        () => ({ s: `Dans un jardin carré de côté ${L} m, on creuse un bassin carré de côté ${b} m.`, q: `L’aire restante est ${L}² - ${b * b}. Écris-la sous forme factorisée.`, e: `${L}² - ${b * b}`, r: `(${L} - ${b})(${L} + ${b})`, cmp: "fac", id: identite(L, 1, b, "produit") }),
        () => { const id = identite(L, 1, b, "produit"); return { s: `Un rectangle mesure (${L} + ${b}) cm sur (${L} - ${b}) cm.`, q: `Exprime son aire sous forme développée.`, e: `(${L} + ${b})(${L} - ${b})`, r: id.r, cmp: "dev", id }; },
        () => { const id = identite(L, 1, 2 * b, "somme"); return { s: `Une cour carrée de ${L} m de côté est entourée d’une allée de ${b} m de large.`, q: `Exprime l’aire totale (cour et allée), développée et réduite.`, e: `(${L} + ${2 * b})²`, r: id.r, cmp: "dev", id }; },
        () => ({ s: `La terrasse carrée d’une case créole mesure (${L} + ${b}) m de côté.`, q: `Développe et réduis l’expression de son aire.`, e: `(${L} + ${b})²`, r: devS.r, cmp: "dev", id: devS }),
        () => { const id = identite(L, c, b, "somme"); return { s: `Un tapis carré a pour côté (${lin(c, b, L)}) dm.`, q: `Écris son aire sous forme développée et réduite.`, e: id.e, r: id.r, cmp: "dev", id }; },
        () => { const id = identite(L, c, b, "somme"); return { s: `Un panneau solaire carré mesure (${lin(c, b, L)}) dm de côté.`, q: `Développe l’expression de son aire.`, e: id.e, r: id.r, cmp: "dev", id }; },
        () => ({ s: `Une feuille carrée de côté ${L} cm porte, dans un coin, un carré découpé de ${b} cm de côté.`, q: `L’aire de ce qui reste vaut ${L}² - ${b * b}. Factorise cette expression.`, e: `${L}² - ${b * b}`, r: `(${L} - ${b})(${L} + ${b})`, cmp: "fac", id: identite(L, 1, b, "produit") }),
      ])();
      return {
        text: `${ctx.s} ${ctx.q}`,
        format: "short",
        expected: [ctx.r],
        comparator: ctx.cmp === "fac" ? "expression_factorisee" : "expression_developpee",
        explanation:
          ctx.cmp === "fac"
            ? `Définition : a² - b² = (a - b)(a + b).\n\nMéthode : ${b * b} = ${b}², on reconnaît une différence de deux carrés avec a = ${L} et b = ${b}.\n\nCalcul : ${ctx.e} = ${L}² - ${b}² = ${ctx.r}.\n\nConclusion : l’aire restante s’écrit ${ctx.r}.`
            : `Définition : l’aire est ${ctx.e} ; ${ctx.id.formule}.\n\nMéthode : on applique l’identité remarquable avec ${ctx.id.ab}.\n\nCalcul : ${ctx.e} = ${ctx.id.etapes} = ${ctx.r}.\n\nConclusion : l’aire vaut ${ctx.r}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_identite_tpl_8_calcul_mental",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_identite",
    difficulty: 4,
    theme: "neutral",
    hint: "Écris le nombre comme 100 + 3, 50 - 1… puis applique (a + b)², (a - b)² ou (a - b)(a + b).",
    tags: ["identites", "calcul_mental", "template"],
    generate: () => {
      const cas = randomChoice([
        () => { const b = randomInt(1, 9); const n = 100 + b; return { e: `${n}²`, forme: `(100 + ${b})²`, calc: `100² + 2 × 100 × ${b} + ${b}² = 10 000 + ${200 * b} + ${b * b}`, r: n * n, formule: "(a + b)² = a² + 2ab + b²" }; },
        () => { const b = randomInt(1, 9); const n = 100 - b; return { e: `${n}²`, forme: `(100 - ${b})²`, calc: `100² - 2 × 100 × ${b} + ${b}² = 10 000 - ${200 * b} + ${b * b}`, r: n * n, formule: "(a - b)² = a² - 2ab + b²" }; },
        () => { const k = randomInt(2, 9); const n = 10 * k + 1; return { e: `${n}²`, forme: `(${10 * k} + 1)²`, calc: `${10 * k}² + 2 × ${10 * k} × 1 + 1² = ${100 * k * k} + ${20 * k} + 1`, r: n * n, formule: "(a + b)² = a² + 2ab + b²" }; },
        () => { const k = randomInt(2, 9); const n = 10 * k - 1; return { e: `${n}²`, forme: `(${10 * k} - 1)²`, calc: `${10 * k}² - 2 × ${10 * k} × 1 + 1² = ${100 * k * k} - ${20 * k} + 1`, r: n * n, formule: "(a - b)² = a² - 2ab + b²" }; },
        () => { const k = randomInt(2, 9); const b = randomInt(1, 4); return { e: `${10 * k - b} × ${10 * k + b}`, forme: `(${10 * k} - ${b})(${10 * k} + ${b})`, calc: `${10 * k}² - ${b}² = ${100 * k * k} - ${b * b}`, r: 100 * k * k - b * b, formule: "(a - b)(a + b) = a² - b²" }; },
        () => { const b = randomInt(1, 5); return { e: `${100 - b} × ${100 + b}`, forme: `(100 - ${b})(100 + ${b})`, calc: `100² - ${b}² = 10 000 - ${b * b}`, r: 10000 - b * b, formule: "(a - b)(a + b) = a² - b²" }; },
      ])();
      const text = randomChoice([
        () => `Calcule ${cas.e} de tête à l’aide d’une identité remarquable.`,
        () => `Sans calculatrice, combien vaut ${cas.e} ? Pense à une identité remarquable.`,
        () => `En écrivant ${cas.e} = ${cas.forme}, calcule ${cas.e}.`,
        () => `${randomChoice(PRENOMS)} affirme qu’on calcule ${cas.e} de tête en l’écrivant ${cas.forme}. Que vaut ${cas.e} ?`,
        () => `Utilise ${cas.formule} pour calculer ${cas.e}.`,
      ])();
      return {
        text,
        format: "short",
        expected: [String(cas.r)],
        comparator: "number_equal",
        explanation:
          `Définition : ${cas.formule}.\n\n` +
          `Méthode : on écrit ${cas.e} = ${cas.forme}, avec des nombres faciles à élever au carré.\n\n` +
          `Calcul : ${cas.e} = ${cas.calc} = ${fr(cas.r)}.\n\n` +
          `Conclusion : ${cas.e} = ${fr(cas.r)}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_identite_tpl_9_developper_coef",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_identite",
    difficulty: 4,
    theme: "neutral",
    hint: "Avec (3x + 2)², a = 3x : son carré est (3x)² = 9x², pas 3x².",
    tags: ["identites", "coefficient", "template"],
    generate: () => {
      const L = lettre();
      const c = randomInt(2, 5);
      const b = randomInt(1, 9);
      const id = identite(L, c, b, randomChoice(["somme", "difference", "produit"] as const));
      return {
        text: consigneIdentite(id.e, id.formule),
        format: "short",
        expected: [id.r],
        comparator: "expression_developpee",
        explanation: explicationIdentite(id.e, id),
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_identite_tpl_10_somme_identites",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_identite",
    difficulty: 4,
    theme: "neutral",
    hint: "Développe chaque morceau avec une identité remarquable ; mets entre parenthèses ce qui est soustrait, puis réduis.",
    tags: ["identites", "developper", "reduire", "template"],
    generate: () => {
      const L = lettre();
      const L2 = `${L}²`;
      for (;;) {
        const b = randomInt(1, 7);
        const c = randomInt(1, 7);
        const k = randomInt(2, 5);
        const cas = randomChoice([
          () => ({ e: `(${L} + ${b})² - (${L} - ${c})(${L} + ${c})`, p1: [[1, L2], [2 * b, L], [b * b, ""]] as Terme[], p2: [[1, L2], [-c * c, ""]] as Terme[], op: -1 }),
          () => ({ e: `(${L} - ${b})² + (${L} + ${c})²`, p1: [[1, L2], [-2 * b, L], [b * b, ""]] as Terme[], p2: [[1, L2], [2 * c, L], [c * c, ""]] as Terme[], op: 1 }),
          () => ({ e: `(${L} + ${b})² - (${L} - ${c})²`, p1: [[1, L2], [2 * b, L], [b * b, ""]] as Terme[], p2: [[1, L2], [-2 * c, L], [c * c, ""]] as Terme[], op: -1 }),
          () => ({ e: `${k}(${L} - ${b})²`, p1: [[k, L2], [-2 * k * b, L], [k * b * b, ""]] as Terme[], p2: [] as Terme[], op: 1 }),
          () => ({ e: `(${L} + ${b})² - ${k}${L}`, p1: [[1, L2], [2 * b, L], [b * b, ""]] as Terme[], p2: [[k, L]] as Terme[], op: -1 }),
          () => ({ e: `(${L} - ${b})(${L} + ${b}) + (${L} - ${c})²`, p1: [[1, L2], [-b * b, ""]] as Terme[], p2: [[1, L2], [-2 * c, L], [c * c, ""]] as Terme[], op: 1 }),
        ])();
        const termes: Terme[] = [...cas.p1, ...cas.p2.map(([n, p]) => [cas.op * n, p] as Terme)];
        const r = regrouper(termes);
        if (r.nuls || r.reduit === "0") continue;
        const detail = cas.p2.length
          ? `${somme(cas.p1)} ${cas.op < 0 ? "-" : "+"} (${somme(cas.p2)})`
          : somme(cas.p1);
        return {
          text: consigneDevelopper(cas.e, false),
          format: "short",
          expected: [r.reduit],
          comparator: "expression_developpee",
          explanation:
            `Définition : (a + b)² = a² + 2ab + b², (a - b)² = a² - 2ab + b², (a - b)(a + b) = a² - b².\n\n` +
            `Méthode : on développe chaque morceau avec la bonne identité ; ce qui est soustrait reste entre parenthèses, puis on change ses signes.\n\n` +
            `Calcul : ${cas.e} = ${detail} = ${r.reduit}.\n\n` +
            `Conclusion : l’expression développée et réduite est ${r.reduit}.`,
        };
      }
    },
  },

  {
    kind: "fixed",
    id: "3e_litteral_identite_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_identite",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit : (x + 2)² = x² + 4. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il manque un terme.",
    explanation:
      "Définition : (a + b)² = a² + 2ab + b².\n\n" +
      "Méthode : il faut penser au terme du milieu.\n\n" +
      "Calcul : (x + 2)² = x² + 4x + 4.\n\n" +
      "Conclusion : l’élève a oublié le terme 4x.",
    tags: ["identites", "erreur"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_identite_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_identite",
    difficulty: 4,
    theme: "neutral",
    text: "Explique à quoi servent les identités remarquables.",
    format: "open",
    expected: ["développer", "factoriser", "plus vite"],
    comparator: "contains_keyword",
    hint: "Elles permettent de gagner du temps.",
    explanation:
      "Définition : les identités remarquables sont des égalités utiles à connaître.\n\n" +
      "Méthode : elles servent à développer ou factoriser rapidement certaines expressions.\n\n" +
      "Calcul : par exemple, (x + 3)² peut être développé directement sans double distributivité.\n\n" +
      "Conclusion : les identités remarquables permettent de calculer plus vite et plus efficacement.",
    tags: ["identites", "open"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_factoriser_verifier_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_identite",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment vérifier que x² - 25 = (x - 5)(x + 5).",
    format: "open",
    expected: ["développer", "x²", "25"],
    comparator: "contains_keyword",
    hint: "Développe (x - 5)(x + 5).",
    explanation:
      "Définition : on vérifie une factorisation en développant le produit obtenu.\n\n" +
      "Méthode : on développe (x - 5)(x + 5) par double distributivité, ou avec (a - b)(a + b) = a² - b².\n\n" +
      "Calcul : (x - 5)(x + 5) = x² + 5x - 5x - 25 = x² - 25.\n\n" +
      "Conclusion : on retrouve x² - 25, donc la factorisation est juste.",
    tags: ["litteral_factorisation", "verifier", "open"],
  },

  /* =========================
     LITTERAL_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "3e_litteral_defi_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève affirme : « 2x + 3x² = 5x² ». A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "x et x² ne sont pas des termes semblables.",
    explanation:
      "Définition : on ne peut réduire que des termes semblables.\n\n" +
      "Méthode : on compare les parties littérales des termes.\n\n" +
      "Calcul : 2x est un terme en x, alors que 3x² est un terme en x². Ils ne sont pas semblables.\n\n" +
      "Conclusion : l’expression 2x + 3x² ne se réduit pas en 5x².",
    tags: ["litteral", "defi", "erreur", "reduction"],
  },

  {
    kind: "template",
    id: "3e_litteral_defi_tpl_1_valeur_expression",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Le nombre est grand : simplifie d’abord l’expression (développe, réduis), puis remplace.",
    tags: ["litteral", "defi", "substitution", "template"],
    generate: () => {
      const L = lettre();
      const v = randomInt(23, 99);
      const b = randomInt(2, 9);
      const k = randomInt(2, 9);
      const cas = randomChoice([
        () => ({ e: `${k}(${L} + ${b}) - ${k}${L}`, simple: `${k * b}`, r: k * b, calc: `${k}${L} + ${k * b} - ${k}${L} = ${k * b}` }),
        () => ({ e: `(${L} + ${b})² - ${L}² - ${2 * b}${L}`, simple: `${b * b}`, r: b * b, calc: `${L}² + ${2 * b}${L} + ${b * b} - ${L}² - ${2 * b}${L} = ${b * b}` }),
        () => ({ e: `(${L} - ${b})(${L} + ${b}) - ${L}²`, simple: `-${b * b}`, r: -b * b, calc: `${L}² - ${b * b} - ${L}² = -${b * b}` }),
        () => ({ e: `${L}(${L} + ${b}) - ${L}²`, simple: `${b}${L}`, r: b * v, calc: `${L}² + ${b}${L} - ${L}² = ${b}${L}, donc ${b} × ${v} = ${b * v}` }),
        () => ({ e: `(${L} + ${b})² - (${L} - ${b})²`, simple: `${4 * b}${L}`, r: 4 * b * v, calc: `${L}² + ${2 * b}${L} + ${b * b} - (${L}² - ${2 * b}${L} + ${b * b}) = ${4 * b}${L}, donc ${4 * b} × ${v} = ${4 * b * v}` }),
        () => ({ e: `(${L} - ${b})² - ${L}(${L} - ${2 * b})`, simple: `${b * b}`, r: b * b, calc: `${L}² - ${2 * b}${L} + ${b * b} - ${L}² + ${2 * b}${L} = ${b * b}` }),
      ])();
      const N = randomChoice(NOMS);
      const text = randomChoice([
        () => `Calcule ${cas.e} pour ${L} = ${v}. (Astuce : simplifie d’abord.)`,
        () => `Sans calculatrice, que vaut ${cas.e} quand ${L} = ${v} ?`,
        () => `${randomChoice(PRENOMS)} doit calculer ${cas.e} pour ${L} = ${v}. Quel résultat obtient-on ?`,
        () => `On pose ${N} = ${cas.e}. Donne la valeur de ${N} pour ${L} = ${v}.`,
      ])();
      return {
        text,
        format: "short",
        expected: [String(cas.r)],
        comparator: "number_equal",
        explanation:
          `Définition : une expression littérale peut être simplifiée avant d’être calculée.\n\n` +
          `Méthode : on développe et on réduit d’abord ; il ne reste presque rien à calculer.\n\n` +
          `Calcul : ${cas.e} = ${cas.calc}.\n\n` +
          `Conclusion : pour ${L} = ${v}, le résultat est ${fr(cas.r)}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_defi_tpl_2_comparer_expressions",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Développe et réduis les deux expressions : elles sont égales pour tout nombre si leurs formes réduites sont identiques.",
    tags: ["litteral", "defi", "developper", "comparer", "template"],
    generate: () => {
      const L = lettre();
      const b = randomInt(2, 8);
      const k = randomInt(2, 6);
      const cas = randomChoice([
        { A: `${k}(${L} + ${b})`, B: `${k}${L} + ${k * b}`, egal: true, pourquoi: `${k}(${L} + ${b}) = ${k}${L} + ${k * b}` },
        { A: `${k}(${L} + ${b})`, B: `${k}${L} + ${b}`, egal: false, pourquoi: `${k}(${L} + ${b}) = ${k}${L} + ${k * b}, pas ${k}${L} + ${b}` },
        { A: `(${L} + ${b})²`, B: `${L}² + ${2 * b}${L} + ${b * b}`, egal: true, pourquoi: `(${L} + ${b})² = ${L}² + 2 × ${L} × ${b} + ${b}² = ${L}² + ${2 * b}${L} + ${b * b}` },
        { A: `(${L} + ${b})²`, B: `${L}² + ${b * b}`, egal: false, pourquoi: `(${L} + ${b})² = ${L}² + ${2 * b}${L} + ${b * b} : il manque ${2 * b}${L}` },
        { A: `(${L} - ${b})(${L} + ${b})`, B: `${L}² - ${b * b}`, egal: true, pourquoi: `(a - b)(a + b) = a² - b², donc (${L} - ${b})(${L} + ${b}) = ${L}² - ${b * b}` },
        { A: `(${L} - ${b})²`, B: `${L}² - ${b * b}`, egal: false, pourquoi: `(${L} - ${b})² = ${L}² - ${2 * b}${L} + ${b * b}` },
        { A: `(${L} - ${b})²`, B: `(${b} - ${L})²`, egal: true, pourquoi: `${b} - ${L} = -(${L} - ${b}), et un nombre et son opposé ont le même carré` },
        { A: `${L}(${L} + ${b})`, B: `${L}² + ${b}`, egal: false, pourquoi: `${L}(${L} + ${b}) = ${L}² + ${b}${L}` },
        { A: `-(${L} - ${b})`, B: `${b} - ${L}`, egal: true, pourquoi: `-(${L} - ${b}) = -${L} + ${b} = ${b} - ${L}` },
        { A: `-(${L} - ${b})`, B: `-${L} - ${b}`, egal: false, pourquoi: `-(${L} - ${b}) = -${L} + ${b}` },
      ]);
      const prenom = randomChoice(PRENOMS);
      const text = randomChoice([
        `Les expressions ${cas.A} et ${cas.B} sont-elles égales pour tout ${L} ?`,
        `A-t-on, quel que soit ${L} : ${cas.A} = ${cas.B} ?`,
        `${prenom} pense que ${cas.A} et ${cas.B} donnent toujours le même résultat. Est-ce vrai ?`,
        `Peut-on remplacer ${cas.A} par ${cas.B} dans un calcul, pour n’importe quelle valeur de ${L} ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [cas.egal ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          `Définition : deux expressions sont égales pour tout ${L} si elles ont la même forme développée et réduite.\n\n` +
          `Méthode : on développe ${cas.A}.\n\n` +
          `Calcul : ${cas.pourquoi}.\n\n` +
          `Conclusion : ${cas.egal ? "oui, elles sont égales pour tout nombre" : `non : par exemple pour ${L} = 1, elles ne donnent pas le même résultat`}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_defi_tpl_5_reunion",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Remplace la lettre par sa valeur dans l’expression donnée, en respectant les priorités.",
    tags: ["litteral", "defi", "modelisation", "template"],
    generate: () => {
      const ctx = randomChoice([
        () => { const b = randomInt(1, 3); const x = randomInt(3, 9); return { s: `Un tableau carré de ${"x"} dm de côté est entouré d’un cadre de ${b} dm de large. L’aire du cadre seul est (x + ${2 * b})² - x² dm².`, q: `Calcule-la pour x = ${x}.`, r: (x + 2 * b) ** 2 - x * x, calc: `(${x} + ${2 * b})² - ${x}² = ${(x + 2 * b) ** 2} - ${x * x}`, u: " dm²" }; },
        () => { const p = randomInt(12, 20); const c = randomInt(4, 8); const f = randomInt(5, 15) * 10; const n = randomInt(30, 80); return { s: `Un club fabrique n tee-shirts : chacun est vendu ${p} € et coûte ${c} €, et l’imprimante a coûté ${f} €. Le bénéfice est ${p}n - (${c}n + ${f}).`, q: `Calcule ce bénéfice pour n = ${n}.`, r: p * n - (c * n + f), calc: `${p} × ${n} - (${c} × ${n} + ${f}) = ${p * n} - ${c * n + f}`, u: " €" }; },
        () => { const t = randomInt(1, 3); return { s: `Un caillou lâché d’une falaise de 80 m est à la hauteur 80 - 5t² mètres après t secondes.`, q: `À quelle hauteur est-il pour t = ${t} ?`, r: 80 - 5 * t * t, calc: `80 - 5 × ${t}² = 80 - ${5 * t * t}`, u: " m" }; },
        () => { const x = randomInt(1, 4); return { s: `On découpe des carrés de côté x cm aux coins d’une plaque de 20 cm sur 12 cm pour fabriquer une boîte. Son volume est x(20 - 2x)(12 - 2x) cm³.`, q: `Calcule ce volume pour x = ${x}.`, r: x * (20 - 2 * x) * (12 - 2 * x), calc: `${x} × ${20 - 2 * x} × ${12 - 2 * x}`, u: " cm³" }; },
        () => { const x = randomInt(4, 12); const b = randomInt(1, 3); return { s: `Une piscine carrée de x m de côté est bordée d’une margelle de ${b} m de large. L’aire de la margelle est (x + ${2 * b})² - x².`, q: `Calcule-la pour x = ${x}.`, r: (x + 2 * b) ** 2 - x * x, calc: `(${x} + ${2 * b})² - ${x}² = ${(x + 2 * b) ** 2} - ${x * x}`, u: " m²" }; },
        () => { const x = randomInt(5, 12); const b = randomInt(1, 4); return { s: `Un terrain rectangulaire mesure (x + ${b}) m sur (x - ${b}) m. Son aire est (x + ${b})(x - ${b}).`, q: `Calcule cette aire pour x = ${x}.`, r: (x + b) * (x - b), calc: `(${x} + ${b}) × (${x} - ${b}) = ${x + b} × ${x - b}`, u: " m²" }; },
        () => { const n = randomInt(5, 15); return { s: `Dans un tournoi où chacune des n équipes rencontre toutes les autres une fois, il y a n(n - 1)/2 matchs.`, q: `Combien y a-t-il de matchs pour n = ${n} ?`, r: (n * (n - 1)) / 2, calc: `${n} × ${n - 1} ÷ 2`, u: " matchs" }; },
        () => { const x = randomInt(2, 6); return { s: `Le bénéfice journalier d’un vendeur de mangues, en euros, est -2x² + 24x - 40 quand il vend le kilo x euros.`, q: `Calcule ce bénéfice pour x = ${x}.`, r: -2 * x * x + 24 * x - 40, calc: `-2 × ${x}² + 24 × ${x} - 40 = ${-2 * x * x} + ${24 * x} - 40`, u: " €" }; },
        () => { const v = randomChoice([20, 30, 40, 50]); return { s: `La distance d’arrêt d’un vélo électrique roulant à v km/h est environ v²/200 + v/4 mètres.`, q: `Calcule-la pour v = ${v}.`, r: (v * v) / 200 + v / 4, calc: `${v}² ÷ 200 + ${v} ÷ 4 = ${fr((v * v) / 200)} + ${fr(v / 4)}`, u: " m" }; },
      ])();
      return {
        text: varierFormule(ctx.s, ctx.q, false),
        format: "short",
        expected: [String(ctx.r)],
        comparator: "number_equal",
        explanation:
          `Définition : une expression littérale peut modéliser une situation réelle.\n\n` +
          `Méthode : on remplace la lettre par sa valeur, puis on calcule : parenthèses, puissances, produits, sommes.\n\n` +
          `Calcul : ${ctx.calc} = ${fr(ctx.r)}.\n\n` +
          `Conclusion : on obtient ${fr(ctx.r)}${ctx.u}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_defi_tpl_6_methode",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Facteur commun d’abord ; sinon, compte les termes et repère les carrés.",
    tags: ["litteral", "defi", "choix_methode", "qcm", "template"],
    generate: () => {
      const L = lettre();
      const tirage = randomChoice([
        () => ({ fa: factoNumerique(L), m: METHODES.commun }),
        () => ({ fa: factoLitterale(L), m: METHODES.commun }),
        () => ({ fa: factoParentheseCommune(L), m: METHODES.commun }),
        () => ({ fa: factoCarre(L, Math.random() < 0.5, 1), m: METHODES.somme }),
        () => ({ fa: factoCarre(L, Math.random() < 0.5, -1), m: METHODES.difference }),
        () => ({ fa: factoDifferenceCarres(L, Math.random() < 0.5), m: METHODES.carres }),
        () => ({ fa: factoDifferenceParenthese(L), m: METHODES.carres }),
      ])();
      const text = randomChoice([
        `Quelle méthode est la plus adaptée pour factoriser ${tirage.fa.e} ?`,
        `Pour factoriser ${tirage.fa.e}, que faut-il utiliser ?`,
        `${randomChoice(PRENOMS)} doit factoriser ${tirage.fa.e}. Quelle méthode doit-on choisir ?`,
        `${tirage.fa.e} : facteur commun ou identité remarquable ? Choisis la méthode.`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle(Object.values(METHODES)),
        expected: [tirage.m],
        comparator: "mcq_exact",
        explanation:
          `Définition : en 3e, on factorise par un facteur commun ou en reconnaissant une identité remarquable.\n\n` +
          `Méthode : on utilise ${tirage.m}.\n\n` +
          `Calcul : ${tirage.fa.calcul}.\n\n` +
          `Conclusion : ${tirage.fa.e} = ${tirage.fa.f}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_litteral_factorisation_defi_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Factoriser : x² - 1",
    format: "qcm",
    choices: ["(x - 1)(x + 1)", "(x - 1)²", "(x + 1)²", "x(x - 1)"],
    expected: ["(x - 1)(x + 1)"],
    comparator: "mcq_exact",
    hint: "1 = 1² : différence de deux carrés.",
    explanation:
      "Définition : a² - b² = (a - b)(a + b).\n\n" +
      "Méthode : on reconnaît 1 = 1².\n\n" +
      "Calcul : x² - 1 = (x - 1)(x + 1).\n\n" +
      "Conclusion : la forme factorisée est (x - 1)(x + 1).",
    tags: ["litteral_factorisation", "defi", "difference_carres", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_factorisation_defi_fixed_5",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle méthode est la plus adaptée pour factoriser x² + 8x + 16 ?",
    format: "qcm",
    choices: [
      "le carré d’une somme",
      "la différence de deux carrés",
      "un simple facteur commun",
      "le carré d’une différence",
    ],
    expected: ["le carré d’une somme"],
    comparator: "mcq_exact",
    hint: "16 = 4² et 8x = 2 × 4 × x.",
    explanation:
      "Définition : a² + 2ab + b² = (a + b)².\n\n" +
      "Méthode : on reconnaît la forme d’un carré d’une somme.\n\n" +
      "Calcul : x² + 8x + 16 = (x + 4)².\n\n" +
      "Conclusion : on utilise le carré d’une somme.",
    tags: ["litteral_factorisation", "defi", "choix_methode", "qcm"],
  },

  {
    kind: "template",
    id: "3e_litteral_defi_tpl_3_factorisation_cachee",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Deux étapes : mets d’abord en facteur ce qui est commun, puis regarde si ce qui reste est une identité remarquable.",
    tags: ["litteral", "defi", "factoriser", "template"],
    generate: () => {
      const L = lettre();
      for (;;) {
        const k = randomInt(2, 6);
        const b = randomInt(1, 7);
        const cas = randomChoice([
          () => ({ e: `${k}${L}² - ${k * b * b}`, f: `${k}(${L} - ${b})(${L} + ${b})`, calc: `${k}${L}² - ${k * b * b} = ${k}(${L}² - ${b * b}) = ${k}(${L} - ${b})(${L} + ${b})`, m: `le facteur commun ${k}, puis la différence de deux carrés` }),
          () => ({ e: quad(k, 2 * k * b, k * b * b, L), f: `${k}(${L} + ${b})²`, calc: `${quad(k, 2 * k * b, k * b * b, L)} = ${k}(${quad(1, 2 * b, b * b, L)}) = ${k}(${L} + ${b})²`, m: `le facteur commun ${k}, puis le carré d’une somme` }),
          () => ({ e: quad(k, -2 * k * b, k * b * b, L), f: `${k}(${L} - ${b})²`, calc: `${quad(k, -2 * k * b, k * b * b, L)} = ${k}(${quad(1, -2 * b, b * b, L)}) = ${k}(${L} - ${b})²`, m: `le facteur commun ${k}, puis le carré d’une différence` }),
          () => ({ e: somme([[1, `${L}³`], [-b * b, L]]), f: `${L}(${L} - ${b})(${L} + ${b})`, calc: `${somme([[1, `${L}³`], [-b * b, L]])} =${L}(${L}² - ${b * b}) = ${L}(${L} - ${b})(${L} + ${b})`, m: `le facteur commun ${L}, puis la différence de deux carrés` }),
          () => {
            const a = randomInt(2, 4);
            const c = randomInt(1, 6);
            const d = randomInt(1, 6);
            const p = a - 1;
            const q = a + 1;
            // (aL + c)² - (L + d)² = ((a - 1)L + c - d)((a + 1)L + c + d),
            // puis on sort de chaque parenthèse son facteur commun : « Factorise »
            // veut dire factoriser LE PLUS POSSIBLE (décision de Frédéric, 03/10).
            const g1 = pgcdDe(p, c - d);
            const g2 = pgcdDe(q, c + d);
            const facteur = (u: number, v: number) => (v === 0 ? somme([[u, L]]) : `(${lin(u, v, L)})`);
            const f1 = facteur(p / g1, (c - d) / g1);
            const f2 = facteur(q / g2, (c + d) / g2);
            const K = g1 * g2;
            // un facteur réduit à la lettre seule se place devant : 4p(2p + 1)
            const f = `${K === 1 ? "" : K}${f1}${f2}`;
            const brut = `(${lin(p, c - d, L)})(${lin(q, c + d, L)})`;
            return { e: `(${lin(a, c, L)})² - (${lin(1, d, L)})²`, f, calc: `a² - b² = (a - b)(a + b) avec a = ${lin(a, c, L)} et b = ${lin(1, d, L)} : [${lin(a, c, L)} - (${lin(1, d, L)})][${lin(a, c, L)} + ${lin(1, d, L)}] = ${brut}${brut === f ? "" : ` = ${f}, en sortant le facteur commun de chaque parenthèse`}`, m: `la différence de deux carrés, avec des parenthèses` };
          },
        ])();
        if (cas.f.includes("(0") || cas.f.includes("()")) continue;
        const text = randomChoice([
          () => `Factorise complètement ${cas.e}.`,
          () => `Donne la forme factorisée la plus poussée de ${cas.e}.`,
          () => `Factorise ${cas.e} (il faut deux étapes ou une identité bien choisie).`,
          () => `Écris ${cas.e} comme un produit de facteurs le plus simples possible.`,
        ])();
        return {
          text,
          format: "short",
          expected: [cas.f],
          comparator: "expression_factorisee",
          explanation:
            `Définition : factoriser complètement, c’est continuer tant qu’un facteur peut encore se factoriser.\n\n` +
            `Méthode : on utilise ${cas.m}.\n\n` +
            `Calcul : ${cas.calc}.\n\n` +
            `Conclusion : ${cas.e} = ${cas.f}.`,
        };
      }
    },
  },

  {
    kind: "template",
    id: "3e_litteral_defi_tpl_4_identite_ou_pas",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Développe le membre de gauche avec la bonne identité, ou teste une valeur simple comme 1.",
    tags: ["litteral", "defi", "identites", "piege", "template"],
    generate: () => {
      const L = lettre();
      const b = randomInt(2, 7);
      const a = randomInt(2, 4);
      const cas = randomChoice([
        { s: `(${L} + ${b})² = ${L}² + ${b * b}`, vrai: false, c: `(${L} + ${b})² = ${L}² + ${2 * b}${L} + ${b * b} : il manque le double produit ${2 * b}${L}` },
        { s: `(${L} - ${b})² = ${L}² - ${b * b}`, vrai: false, c: `(${L} - ${b})² = ${L}² - ${2 * b}${L} + ${b * b}` },
        { s: `(${L} + ${b})² = ${L}² + ${2 * b}${L} + ${b * b}`, vrai: true, c: `(a + b)² = a² + 2ab + b² avec a = ${L} et b = ${b}` },
        { s: `(${L} - ${b})(${L} + ${b}) = ${L}² - ${b * b}`, vrai: true, c: `(a - b)(a + b) = a² - b² avec a = ${L} et b = ${b}` },
        { s: `${L}² + ${b * b} = (${L} + ${b})(${L} - ${b})`, vrai: false, c: `(${L} + ${b})(${L} - ${b}) = ${L}² - ${b * b}, pas ${L}² + ${b * b} ; une somme de deux carrés ne se factorise pas ainsi` },
        { s: `(${a}${L})² = ${a}${L}²`, vrai: false, c: `(${a}${L})² = ${a}² × ${L}² = ${a * a}${L}²` },
        { s: `(${L} - ${b})² = ${L}² - ${2 * b}${L} - ${b * b}`, vrai: false, c: `(${L} - ${b})² = ${L}² - ${2 * b}${L} + ${b * b} : le dernier terme est un carré, donc positif` },
        { s: `(${b} - ${L})² = (${L} - ${b})²`, vrai: true, c: `${b} - ${L} et ${L} - ${b} sont opposés, et deux nombres opposés ont le même carré` },
        { s: `(${a}${L} + ${b})² = ${a * a}${L}² + ${2 * a * b}${L} + ${b * b}`, vrai: true, c: `(a + b)² avec a = ${a}${L} et b = ${b} : ${a * a}${L}² + 2 × ${a}${L} × ${b} + ${b * b}` },
        { s: `(${a}${L} + ${b})² = ${a * a}${L}² + ${a * b}${L} + ${b * b}`, vrai: false, c: `le double produit vaut 2 × ${a}${L} × ${b} = ${2 * a * b}${L}, pas ${a * b}${L}` },
      ]);
      const prenom = randomChoice(PRENOMS);
      const t = randomChoice([
        { text: `L’égalité ${cas.s} est-elle vraie pour tout ${L} ?`, oui: "oui", non: "non" },
        { text: `Vrai ou faux : pour tout nombre ${L}, ${cas.s}.`, oui: "vrai", non: "faux" },
        { text: `${prenom} a écrit « ${cas.s} ». Son calcul est-il juste ?`, oui: "oui", non: "non" },
        { text: `Dans un corrigé, on lit ${cas.s}. Cette égalité est-elle toujours vraie ?`, oui: "oui", non: "non" },
      ]);
      const bon = cas.vrai ? t.oui : t.non;
      return {
        text: t.text,
        format: "qcm",
        choices: [t.oui, t.non],
        expected: [bon],
        comparator: "mcq_exact",
        explanation:
          `Définition : (a + b)² = a² + 2ab + b², (a - b)² = a² - 2ab + b², (a - b)(a + b) = a² - b².\n\n` +
          `Méthode : on développe le membre de gauche avec la bonne identité et on compare.\n\n` +
          `Calcul : ${cas.c}.\n\n` +
          `Conclusion : l’égalité est ${cas.vrai ? "vraie pour tout nombre" : "fausse"} ; la réponse est « ${bon} ».`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_litteral_defi_tpl_7_preuve",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Développe tout, réduis : les termes en x² disparaissent souvent, et le résultat devient une « preuve pour tous les nombres ».",
    tags: ["litteral", "defi", "preuve", "template"],
    generate: () => {
      const L = lettre();
      const b = randomInt(2, 7);
      const cas = randomChoice([
        () => ({ e: `(${L} + 1)² - ${L}²`, r: `2${L} + 1`, pieges: [`1`, `2${L}`, `${L}² + 1`, `2${L} + 2`], calc: `${L}² + 2${L} + 1 - ${L}² = 2${L} + 1`, sens: `la différence des carrés de deux entiers consécutifs est toujours un nombre impair` }),
        () => ({ e: `(${L} + ${b})² - (${L} - ${b})²`, r: `${4 * b}${L}`, pieges: [`0`, `${2 * b * b}`, `${2 * b}${L}`, `${2 * b}${L} + ${2 * b * b}`], calc: `${L}² + ${2 * b}${L} + ${b * b} - (${L}² - ${2 * b}${L} + ${b * b}) = ${4 * b}${L}`, sens: `le résultat vaut toujours ${4 * b} fois le nombre de départ` }),
        () => ({ e: `(${L} + ${b})(${L} - ${b}) - ${L}²`, r: `-${b * b}`, pieges: [`${b * b}`, `0`, `-${2 * b}${L}`, `-${2 * b * b}`], calc: `${L}² - ${b * b} - ${L}² = -${b * b}`, sens: `le résultat ne dépend pas de ${L}` }),
        () => ({ e: `(${L} + ${b})² - ${L}(${L} + ${2 * b})`, r: `${b * b}`, pieges: [`0`, `${2 * b}${L}`, `-${b * b}`, `${2 * b * b}`], calc: `${L}² + ${2 * b}${L} + ${b * b} - ${L}² - ${2 * b}${L} = ${b * b}`, sens: `on trouve toujours ${b * b}, quel que soit ${L}` }),
        () => ({ e: `(${L} + 1)(${L} - 1) + 1`, r: `${L}²`, pieges: [`${L}² + 2`, `${L}² - 2`, `2${L}`, `${L}² + 1`], calc: `${L}² - 1 + 1 = ${L}²`, sens: `le produit des deux voisins d’un nombre, plus 1, redonne son carré` }),
        () => ({ e: `(${L} + 1)² - (${L} - 1)²`, r: `4${L}`, pieges: [`2`, `0`, `2${L}`, `4${L} + 2`], calc: `${L}² + 2${L} + 1 - (${L}² - 2${L} + 1) = 4${L}`, sens: `on obtient toujours le quadruple du nombre` }),
      ])();
      if (Math.random() < 0.4) {
        return {
          text: randomChoice([
            `Développe et réduis ${cas.e}.`,
            `Simplifie au maximum ${cas.e}.`,
            `Prouve, en développant, à quoi est égal ${cas.e} pour tout nombre ${L}. Donne l’expression réduite.`,
          ]),
          format: "short",
          expected: [cas.r],
          comparator: "expression_developpee",
          explanation:
            `Définition : pour montrer qu’un résultat est vrai pour TOUS les nombres, on développe et on réduit l’expression littérale.\n\n` +
            `Méthode : on utilise les identités remarquables, en mettant entre parenthèses ce qui est soustrait.\n\n` +
            `Calcul : ${cas.e} = ${cas.calc}.\n\n` +
            `Conclusion : ${cas.e} = ${cas.r} : ${cas.sens}.`,
        };
      }
      return {
        text: randomChoice([
          `Pour tout nombre ${L}, l’expression ${cas.e} est égale à :`,
          `${randomChoice(PRENOMS)} essaie plusieurs nombres dans ${cas.e} et voit une régularité. À quoi cette expression est-elle égale, quel que soit ${L} ?`,
          `Simplifie ${cas.e}. Quelle expression obtiens-tu ?`,
          `Quelle que soit la valeur de ${L}, ${cas.e} vaut :`,
        ]),
        format: "qcm",
        choices: makeChoices(cas.r, cas.pieges),
        expected: [cas.r],
        comparator: "mcq_exact",
        explanation:
          `Définition : pour montrer qu’un résultat est vrai pour TOUS les nombres, on développe et on réduit l’expression littérale.\n\n` +
          `Méthode : on utilise les identités remarquables, en mettant entre parenthèses ce qui est soustrait.\n\n` +
          `Calcul : ${cas.e} = ${cas.calc}.\n\n` +
          `Conclusion : ${cas.e} = ${cas.r} : ${cas.sens}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_litteral_factorisation_defi_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle méthode est la plus adaptée pour factoriser x² - 36 ?",
    format: "qcm",
    choices: [
      "utiliser la différence de deux carrés",
      "chercher seulement un facteur commun numérique",
      "additionner x² et 36",
      "développer avec la distributivité simple",
    ],
    expected: ["utiliser la différence de deux carrés"],
    comparator: "mcq_exact",
    hint: "36 est un carré parfait.",
    explanation:
      "Définition : a² - b² = (a - b)(a + b).\n\n" +
      "Méthode : 36 = 6², donc x² - 36 est une différence de deux carrés.\n\n" +
      "Calcul : x² - 36 = x² - 6² = (x - 6)(x + 6).\n\n" +
      "Conclusion : on utilise la différence de deux carrés.",
    tags: ["litteral_factorisation", "defi", "choix_methode"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_defi_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la différence entre développer, réduire et factoriser.",
    format: "open",
    expected: ["développer", "réduire", "factoriser"],
    comparator: "contains_keyword",
    hint: "Développer enlève des parenthèses, réduire regroupe, factoriser met en produit.",
    explanation:
      "Définition : développer, réduire et factoriser sont trois transformations d’écritures littérales.\n\n" +
      "Méthode : développer supprime des parenthèses, réduire regroupe les termes semblables, factoriser transforme une somme en produit.\n\n" +
      "Calcul : par exemple, 3(x + 2) se développe en 3x + 6 ; 3x + 2x se réduit en 5x ; 3x + 6 se factorise en 3(x + 2).\n\n" +
      "Conclusion : ces trois techniques servent à changer la forme d’une expression selon l’objectif.",
    tags: ["litteral", "defi", "open", "synthese"],
  },

  {
    kind: "fixed",
    id: "3e_litteral_defi_open_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi on peut vérifier une factorisation en développant.",
    format: "open",
    expected: ["factorisation", "développer", "retrouve"],
    comparator: "contains_keyword",
    hint: "Développer est l’opération inverse de factoriser.",
    explanation:
      "Définition : factoriser transforme une somme en produit, tandis que développer transforme un produit en somme.\n\n" +
      "Méthode : pour vérifier une factorisation, on développe la forme factorisée.\n\n" +
      "Calcul : si 4x + 12 = 4(x + 3), alors en développant 4(x + 3), on retrouve 4x + 12.\n\n" +
      "Conclusion : une factorisation est correcte si le développement redonne l’expression de départ.",
    tags: ["litteral", "defi", "open", "verification"],
  },

  /* ===== LITTERAL_COMPRENDRE (compléments) ===== */
  {
    kind: "fixed",
    id: "3e_litteral_comprendre_fixed_x1",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans l’expression 3x, que signifie l’écriture sans signe entre 3 et x ?",
    format: "qcm",
    choices: ["3 × x", "3 + x", "3 - x", "x³"],
    expected: ["3 × x"],
    comparator: "mcq_exact",
    hint: "On sous-entend la multiplication.",
    explanation:
      "Définition : en calcul littéral, 3x signifie 3 × x.\n\n" +
      "Méthode : on rétablit le signe de multiplication sous-entendu.\n\n" +
      "Calcul : 3x = 3 × x.\n\n" +
      "Conclusion : 3x veut dire 3 × x.",
    tags: ["litteral", "comprendre", "qcm"],
  },
  {
    kind: "template",
    id: "3e_litteral_comprendre_tpl_x1_substituer",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "On remplace la lettre par sa valeur ; un nombre collé à la lettre la multiplie.",
    tags: ["litteral", "comprendre", "substitution", "template"],
    generate: () => {
      const L = lettre();
      const a = randomInt(2, 9);
      const b = randomInt(1, 9);
      const v = randomInt(2, 9);
      const cas = randomChoice([
        { e: `${a}${L} + ${b}`, r: a * v + b, c: `${a} × ${v} + ${b} = ${a * v} + ${b}` },
        { e: `${a}${L} - ${b}`, r: a * v - b, c: `${a} × ${v} - ${b} = ${a * v} - ${b}` },
        { e: `${L}² + ${b}`, r: v * v + b, c: `${v} × ${v} + ${b} = ${v * v} + ${b}` },
        { e: `${a}(${L} + ${b})`, r: a * (v + b), c: `${a} × (${v} + ${b}) = ${a} × ${v + b}` },
        { e: `${L}(${L} - 1)`, r: v * (v - 1), c: `${v} × (${v} - 1) = ${v} × ${v - 1}` },
      ]);
      return {
        text: consigneSubstituer(cas.e, `${L} = ${v}`, L),
        format: "short",
        expected: [String(cas.r)],
        comparator: "number_equal",
        explanation:
          `Définition : calculer la valeur d’une expression, c’est remplacer la lettre par un nombre.\n\n` +
          `Méthode : on remplace ${L} par ${v} et on rétablit les signes × sous-entendus.\n\n` +
          `Calcul : ${cas.c} = ${cas.r}.\n\n` +
          `Conclusion : l’expression vaut ${cas.r}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_litteral_comprendre_qcm_x1_2x",
    niveau: "3e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Que signifie « le double d’un nombre x » ?",
    format: "qcm",
    choices: ["2x", "x + 2", "x²", "x/2"],
    expected: ["2x"],
    comparator: "mcq_exact",
    hint: "Doubler, c’est multiplier par 2.",
    explanation:
      "Définition : le double d’un nombre est ce nombre multiplié par 2.\n\n" +
      "Méthode : on traduit « double » par × 2.\n\n" +
      "Calcul : le double de x est 2x.\n\n" +
      "Conclusion : c’est 2x.",
    tags: ["litteral", "comprendre", "traduction", "qcm"],
  },
];
