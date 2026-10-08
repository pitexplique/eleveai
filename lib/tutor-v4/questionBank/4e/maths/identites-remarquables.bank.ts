// lib/tutor-v4/question-banks/maths/4e/identites-remarquables.bank.ts

/**
 * Banque de questions Tutor V4 - Mathématiques 4e
 * Notion : Identités remarquables
 *
 * Idée centrale :
 * - une identité remarquable n’est pas une formule magique ;
 * - c’est un raccourci issu de la double distributivité.
 *
 * ⛔ PROGRAMME DE 4e décidé par Frédéric (30/09/2026) : PAS de formule
 * a² + 2ab + b². (x + 3)² s’écrit (x + 3)(x + 3), puis on fait les quatre
 * produits et on réduit. Les gabarits ci-dessous expliquent TOUJOURS ainsi.
 * La factorisation par une identité lue à l’envers (x² − 9 = (x − 3)(x + 3))
 * est passée en 3e : le 03/10, Frédéric a fait SORTIR les quatre items qui en
 * restaient (defi_fixed_3, reconnaitre_fixed_4, _fixed_5, reconnaitre_tpl_3)
 * et RÉÉCRIRE sans formule ceux qui l’exigeaient (choisir_fixed_2, _3, _5,
 * choisir_tpl_2, choisir_open_1) ; leurs versions d’origine sont gardées hors
 * du dépôt pour la 3e.
 *
 * ⛔⛔ 30/09–03/10/2026 — « DES QUESTIONS REVIENNENT SOUVENT ». 5 à 15
 * squelettes d’énoncé par micro, 10 à 18 répétitions sur une série de 20.
 * Chaque gabarit varie désormais la FORME de l’expression (lettre x, a, t, n,
 * y, z ; somme ou différence ; (x + 3) ou (3 + x) ; coefficient devant la
 * lettre), la CONSIGNE (« Développe et réduis », « Écris … sous forme
 * développée », « Que devient … ») et, pour une partie des tirages, une courte
 * SITUATION (aire d’un potager carré, d’une photo rectangulaire, programme de
 * calcul, rangées de fauteuils d’une salle…).
 * Mesure : scripts/mesurer-squelettes-coach.ts 4e litteral_identite_remarquable.
 *
 * ⛔ Les réponses tapées sont corrigées par `expression_developpee`
 * (équivalente ET sans parenthèse) ou `number_equal`, jamais par
 * `contains_keyword` (qui acceptait « x² + 6x + 97 »).
 *
 * Progression :
 * 1. lier_distributivite → (x + 3)² = (x + 3)(x + 3), les quatre produits
 * 2. reconnaitre         → carré d’une somme, d’une différence, produit somme × différence
 * 3. developper          → développer en passant par le produit
 * 4. choisir             → quelle démarche, quel calcul malin
 * 5. defi                → erreurs fréquentes : (a + b)² = a² + b², signe, confusion
 */

import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

/* ---------------------------------------------------------------------------
   Petite algèbre : une expression est une liste de termes c·L^d (d = 0, 1, 2).
   On écrit les parenthèses, on fait les quatre produits, on réduit — exactement
   ce que l’élève de 4e fait sur sa copie.
--------------------------------------------------------------------------- */
type Terme = { c: number; d: number };
type Facteur = Terme[];
type Forme = "somme" | "difference" | "produit";

const LETTRES = ["x", "a", "t", "n", "y", "z"];
const NOMS_EXPR = ["A", "B", "C", "D", "E", "F", "G", "K", "P"];

const PRENOMS: { n: string; il: "il" | "elle" }[] = [
  { n: "Léo", il: "il" },
  { n: "Inès", il: "elle" },
  { n: "Noah", il: "il" },
  { n: "Jade", il: "elle" },
  { n: "Hugo", il: "il" },
  { n: "Lina", il: "elle" },
  { n: "Malo", il: "il" },
  { n: "Chloé", il: "elle" },
  { n: "Yanis", il: "il" },
  { n: "Zoé", il: "elle" },
  { n: "Sacha", il: "il" },
  { n: "Maëlys", il: "elle" },
  { n: "Ilyes", il: "il" },
  { n: "Anaïs", il: "elle" },
  { n: "Tom", il: "il" },
  { n: "Aya", il: "elle" },
];

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** « de Léo », « d’Inès ». */
const deNom = (n: string) => (/^[AEIOUYÉÈÊÂ]/.test(n) ? `d’${n}` : `de ${n}`);

function mono(abs: number, d: number, L: string, tex: boolean): string {
  if (d === 0) return String(abs);
  const lettre = d === 1 ? L : tex ? `${L}^2` : `${L}²`;
  return abs === 1 ? lettre : `${abs}${lettre}`;
}

/** Écrit une somme de termes : « x^2 - 6x + 9 » (tex) ou « x² - 6x + 9 ». */
function somme(termes: Terme[], L: string, tex = true): string {
  const t = termes.filter((x) => x.c !== 0);
  if (!t.length) return "0";
  return t
    .map((x, i) => {
      const m = mono(Math.abs(x.c), x.d, L, tex);
      if (i === 0) return x.c < 0 ? `-${m}` : m;
      return `${x.c < 0 ? "-" : "+"} ${m}`;
    })
    .join(" ");
}

const par = (f: Facteur, L: string, tex = true) => `(${somme(f, L, tex)})`;

/** Les quatre produits, dans l’ordre de la copie. */
function produits(f1: Facteur, f2: Facteur): Terme[] {
  const r: Terme[] = [];
  for (const u of f1) for (const v of f2) r.push({ c: u.c * v.c, d: u.d + v.d });
  return r;
}

/** Ordre de la copie : x² en tête, sauf si son coefficient est négatif (« 4 − x² »). */
function ordonne(t: Terme[]): Terme[] {
  const a2 = t.filter((x) => x.d === 2).reduce((s, x) => s + x.c, 0);
  return [...t].sort((u, v) => (a2 < 0 ? u.d - v.d : v.d - u.d));
}

function reduire(termes: Terme[]): Terme[] {
  return ordonne(
    [2, 1, 0]
      .map((d) => ({ c: termes.filter((t) => t.d === d).reduce((s, t) => s + t.c, 0), d }))
      .filter((t) => t.c !== 0),
  );
}

const coef = (termes: Terme[], d: number) => termes.filter((t) => t.d === d).reduce((s, t) => s + t.c, 0);

/** « x \times x + x \times (-3) + (-3) \times x + (-3) \times (-3) » */
function detail(f1: Facteur, f2: Facteur, L: string): string {
  const ft = (t: Terme) => (t.c < 0 ? `(-${mono(-t.c, t.d, L, true)})` : mono(t.c, t.d, L, true));
  const r: string[] = [];
  for (const u of f1) for (const v of f2) r.push(`${ft(u)} \\times ${ft(v)}`);
  return r.join(" + ");
}

type Expr = {
  L: string;
  f1: Facteur;
  f2: Facteur;
  carre: boolean;
  tex: string;
  p: number;
  q: number;
  forme: Forme;
  inverse: boolean;
};

function fabrique(L: string, f1: Facteur, f2: Facteur, carre: boolean, p: number, q: number, forme: Forme, inverse: boolean): Expr {
  return {
    L,
    f1,
    f2,
    carre,
    p,
    q,
    forme,
    inverse,
    tex: carre ? `${par(f1, L)}^2` : `${par(f1, L)}${par(f2, L)}`,
  };
}

const dev = (e: Expr) => produits(e.f1, e.f2);
const red = (e: Expr) => reduire(dev(e));
const produitTex = (e: Expr) => `${par(e.f1, e.L)}${par(e.f2, e.L)}`;

/**
 * Tire (pL + q)², (pL − q)² ou (pL − q)(pL + q).
 * `coef` : p vaut parfois 2 ou 3 ; `inverse` : parfois (q + pL), (q − pL) ;
 * `pMin` : p imposé entre pMin et 4 (défis).
 */
function tirerExpr(forme: Forme, L: string, o: { coef?: boolean; inverse?: boolean; qMax?: number; pMin?: number } = {}): Expr {
  const p = o.pMin ? randomInt(o.pMin, 4) : o.coef && Math.random() < 0.45 ? randomInt(2, 3) : 1;
  const q = randomInt(1, o.qMax ?? 9);
  const inv = !!o.inverse && Math.random() < 0.3;
  const plus: Facteur = inv ? [{ c: q, d: 0 }, { c: p, d: 1 }] : [{ c: p, d: 1 }, { c: q, d: 0 }];
  const moins: Facteur = inv ? [{ c: q, d: 0 }, { c: -p, d: 1 }] : [{ c: p, d: 1 }, { c: -q, d: 0 }];
  if (forme === "somme") return fabrique(L, plus, plus, true, p, q, forme, inv);
  if (forme === "difference") return fabrique(L, moins, moins, true, p, q, forme, inv);
  return Math.random() < 0.5
    ? fabrique(L, moins, plus, false, p, q, forme, inv)
    : fabrique(L, plus, moins, false, p, q, forme, inv);
}

/** Deux parenthèses QUELCONQUES (pas une identité) : (L + q)(L + r), (L − q)(L + r)… */
function tirerQuelconque(L: string): { tex: string; f1: Facteur; f2: Facteur } {
  const q = randomInt(1, 9);
  let r = randomInt(1, 9);
  while (r === q) r = randomInt(1, 9);
  const s1 = randomChoice([1, -1]);
  const s2 = randomChoice([1, -1]);
  const f1: Facteur = [{ c: 1, d: 1 }, { c: s1 * q, d: 0 }];
  const f2: Facteur = [{ c: 1, d: 1 }, { c: s2 * r, d: 0 }];
  return { tex: `${par(f1, L)}${par(f2, L)}`, f1, f2 };
}

function calcul(e: Expr): string {
  const etapes = [e.tex];
  if (e.carre) etapes.push(produitTex(e));
  etapes.push(detail(e.f1, e.f2, e.L), somme(dev(e), e.L), somme(red(e), e.L));
  return `$${etapes.join(" = ")}$`;
}

const METHODE_CARRE =
  "Méthode : un carré, c’est une expression multipliée par elle-même. On écrit le carré comme un produit de deux parenthèses identiques, puis on fait les quatre produits (double distributivité) et on réduit.";
const METHODE_PRODUIT =
  "Méthode : on fait les quatre produits (double distributivité) : chaque terme de la première parenthèse multiplie chaque terme de la seconde. Puis on réduit.";

function explication(e: Expr, conclusion?: string): string {
  return (
    `${e.carre ? METHODE_CARRE : METHODE_PRODUIT}\n\n` +
    `Calcul : ${calcul(e)}.\n\n` +
    `Conclusion : ${conclusion ?? `$${e.tex} = ${somme(red(e), e.L)}$.`}`
  );
}

/** Les résultats faux qu’on voit sur les copies. */
function pieges(e: Expr): Terme[][] {
  const r = red(e);
  const A = coef(r, 2);
  const B = coef(r, 1);
  const C = coef(r, 0);
  const T = (x: number, y: number, z: number): Terme[] =>
    ordonne([
      { c: x, d: 2 },
      { c: y, d: 1 },
      { c: z, d: 0 },
    ]);
  if (e.carre) {
    const l = [T(A, 0, C), T(A, B / 2, C), T(A, -B, C), T(A, B, -C)];
    if (e.p > 1) l.push(T(e.p, B, C));
    return l;
  }
  const m = 2 * e.p * e.q;
  return [T(A, 0, -C), T(A, -m, -C), T(A, m, C), T(A, -m, C)];
}

/** La bonne réponse et trois leurres distincts. */
function qcm(bonne: string, faux: string[]): string[] {
  const d = shuffle([...new Set(faux)].filter((f) => f !== bonne)).slice(0, 3);
  return shuffle([bonne, ...d]);
}

/** « x^2 + 3^2 » : l’erreur qui élève chaque terme au carré. */
function carresSepares(e: Expr): string {
  const L = e.L;
  const sq = (t: Terme) => (t.d === 0 ? `${Math.abs(t.c)}^2` : Math.abs(t.c) === 1 ? `${L}^2` : `(${Math.abs(t.c)}${L})^2`);
  const [u, v] = e.f1;
  return `${u.c < 0 ? "-" : ""}${sq(u)} ${v.c < 0 ? "-" : "+"} ${sq(v)}`;
}

/* ---------------------------------------------------------------------------
   Situations : des carrés et des rectangles qu’on mesure, des programmes de
   calcul. La Réunion n’y est qu’une ligne parmi d’autres (la varangue).
--------------------------------------------------------------------------- */
const OBJETS_CARRES: { nom: string; u: string }[] = [
  { nom: "un potager carré", u: "m" },
  { nom: "une nappe carrée", u: "cm" },
  { nom: "une dalle de terrasse carrée", u: "cm" },
  { nom: "un tapis carré", u: "dm" },
  { nom: "une affiche carrée", u: "cm" },
  { nom: "un bac à sable carré", u: "dm" },
  { nom: "une parcelle carrée", u: "m" },
  { nom: "un carreau de faïence carré", u: "cm" },
  { nom: "une toile de peintre carrée", u: "cm" },
  { nom: "un panneau solaire carré", u: "dm" },
  { nom: "un ring de boxe", u: "m" },
  { nom: "une serviette carrée", u: "cm" },
  { nom: "un échiquier", u: "cm" },
  { nom: "une varangue carrée", u: "m" },
  { nom: "une scène de concert carrée", u: "m" },
  { nom: "une cour carrée", u: "m" },
];

const OBJETS_RECT: { nom: string; u: string }[] = [
  { nom: "une photo", u: "cm" },
  { nom: "un jardin", u: "m" },
  { nom: "une fenêtre", u: "dm" },
  { nom: "un terrain de basket", u: "m" },
  { nom: "une tablette de chocolat", u: "cm" },
  { nom: "un écran", u: "cm" },
  { nom: "un drapeau", u: "dm" },
  { nom: "une étiquette", u: "cm" },
  { nom: "un tableau blanc", u: "dm" },
  { nom: "un champ", u: "m" },
  { nom: "une piscine", u: "m" },
  { nom: "un parking", u: "m" },
  { nom: "une feuille de papier", u: "cm" },
  { nom: "un tapis de yoga", u: "cm" },
  { nom: "une bâche", u: "dm" },
];

const condition = (e: Expr) => `$${mono(e.p, 1, e.L, true)} > ${e.q}$`;

/** Une situation qui DONNE l’expression e (non inversée). */
function situation(e: Expr, mode: "court" | "qcm"): string {
  const L = e.L;
  if (!e.carre) {
    const o = randomChoice(OBJETS_RECT);
    const plus = e.f1[1].c > 0 ? e.f1 : e.f2;
    const moins = e.f1[1].c > 0 ? e.f2 : e.f1;
    const intro = randomChoice([
      `${cap(o.nom)} mesure $${somme(plus, L)}$ ${o.u} de long et $${somme(moins, L)}$ ${o.u} de large (avec ${condition(e)}).`,
      `On note $${L}$ un nombre tel que ${condition(e)}. ${cap(o.nom)} a pour longueur $${somme(plus, L)}$ ${o.u} et pour largeur $${somme(moins, L)}$ ${o.u}.`,
    ]);
    return `${intro} ${randomChoice(mode === "court" ? QUESTIONS_AIRE_COURT(L) : QUESTIONS_AIRE_QCM)}`;
  }
  const cote = somme(e.f1, L);
  const cond = e.forme === "difference" ? ` (avec ${condition(e)})` : "";
  if (Math.random() < 0.6) {
    const o = randomChoice(OBJETS_CARRES);
    const intro = randomChoice([
      `${cap(o.nom)} a des côtés de longueur $${cote}$ ${o.u}${cond}.`,
      `Le côté ${o.nom.startsWith("un ") ? "d’un " + o.nom.slice(3) : "d’une " + o.nom.slice(4)} mesure $${cote}$ ${o.u}${cond}.`,
    ]);
    return `${intro} ${randomChoice(mode === "court" ? QUESTIONS_AIRE_COURT(L) : QUESTIONS_AIRE_QCM)}`;
  }
  // Programme de calcul.
  const op = e.forme === "somme" ? "ajout" : "soustr";
  const inf =
    e.p === 1
      ? op === "ajout"
        ? `lui ajouter ${e.q}`
        : `lui soustraire ${e.q}`
      : `le multiplier par ${e.p}, puis ${op === "ajout" ? "ajouter" : "soustraire"} ${e.q}`;
  const conj =
    e.p === 1
      ? op === "ajout"
        ? `lui ajoute ${e.q}`
        : `lui soustrait ${e.q}`
      : `le multiplie par ${e.p}, puis ${op === "ajout" ? "ajoute" : "soustrait"} ${e.q}`;
  if (Math.random() < 0.5) {
    const q =
      mode === "court"
        ? `Écris le résultat en fonction de $${L}$, sous forme développée et réduite.`
        : "Quelle expression développée donne le résultat ?";
    return `Programme de calcul : choisir un nombre $${L}$, ${inf}, puis élever le résultat au carré. ${q}`;
  }
  const P = randomChoice(PRENOMS);
  const q =
    mode === "court"
      ? `Quelle expression développée et réduite obtient-${P.il} ?`
      : `Quelle expression développée obtient-${P.il} ?`;
  return `${P.n} choisit un nombre $${L}$, ${conj}, puis multiplie le résultat par lui-même. ${q}`;
}

const QUESTIONS_AIRE_COURT = (L: string) => [
  `Exprime son aire en fonction de $${L}$, sous forme développée et réduite (sans l’unité).`,
  "Écris son aire sous forme développée et réduite, sans l’unité.",
  `Donne son aire développée et réduite en fonction de $${L}$ (sans l’unité).`,
];
const QUESTIONS_AIRE_QCM = [
  "Quelle expression donne son aire ?",
  "Son aire est égale à :",
  "Quelle est son aire, sous forme développée ?",
];

/* ---------------------------------------------------------------------------
   Consignes de calcul pur.
--------------------------------------------------------------------------- */
const TOURNURES_DEV: ((E: string) => string)[] = [
  (E) => `Développe et réduis $${E}$.`,
  (E) => `Développe puis réduis : $${E}$.`,
  (E) => `Écris $${E}$ sous forme développée et réduite.`,
  (E) => `Donne la forme développée réduite de $${E}$.`,
  (E) => `On pose $${randomChoice(NOMS_EXPR)} = ${E}$. Développe et réduis cette expression.`,
  (E) => `Effectue le développement de $${E}$, puis réduis.`,
  (E) => `Que devient $${E}$ une fois développé et réduit ?`,
  (E) => `Développe et réduis l’expression $${E}$.`,
];

const TOURNURES_DEV_QCM: ((E: string) => string)[] = [
  (E) => `Quelle est la forme développée et réduite de $${E}$ ?`,
  (E) => `$${E}$ est égal à :`,
  (E) => `En développant puis en réduisant $${E}$, on obtient :`,
  (E) => `Quelle expression est égale à $${E}$ ?`,
  (E) => `Développe et réduis $${E}$. Quelle est la bonne réponse ?`,
  (E) => {
    const P = randomChoice(PRENOMS);
    return `${P.n} développe et réduit $${E}$. Quel résultat doit-${P.il} trouver ?`;
  },
];

const TOURNURES_PASSER_PAR_PRODUIT: ((E: string, FF: string) => string)[] = [
  (E) => `Écris $${E}$ comme un produit de deux parenthèses, puis développe et réduis.`,
  (E, FF) => `Développe $${E}$ en passant par $${FF}$, puis réduis.`,
  (E, FF) => `Sachant que $${E} = ${FF}$, développe et réduis $${E}$.`,
  (E) => `Utilise la double distributivité pour développer et réduire $${E}$.`,
  (E) => `Récris $${E}$ sous forme de produit, puis donne sa forme développée réduite.`,
  (E) => {
    const P = randomChoice(PRENOMS);
    return `${P.n} écrit $${E}$ comme un produit de deux parenthèses, puis développe et réduit. Quel résultat doit-${P.il} obtenir ?`;
  },
];

/* ---------------------------------------------------------------------------
   Générateurs.
--------------------------------------------------------------------------- */

/** Développer (réponse tapée). `commeProduit` : on montre (x + 3)(x + 3) au lieu de (x + 3)². */
function genDevCourt(
  formes: Forme[],
  o: { coef?: boolean; inverse?: boolean; situations?: boolean; commeProduit?: boolean },
): TutorGeneratedQuestionV4 {
  const forme = randomChoice(formes);
  const L = randomChoice(LETTRES);
  if (o.situations && Math.random() < 0.35) {
    const e = tirerExpr(forme, L, { coef: o.coef });
    return {
      text: situation(e, "court"),
      format: "short",
      expected: [somme(red(e), L, false)],
      comparator: "expression_developpee",
      explanation: explication(e),
    };
  }
  const e = tirerExpr(forme, L, o);
  const E = o.commeProduit ? produitTex(e) : e.tex;
  return {
    text: randomChoice(TOURNURES_DEV)(E),
    format: "short",
    expected: [somme(red(e), L, false)],
    comparator: "expression_developpee",
    explanation: explication(e),
  };
}

/** Développer (QCM, leurres = erreurs de copie). */
function genDevQcm(formes: Forme[], o: { coef?: boolean; inverse?: boolean; situations?: boolean }): TutorGeneratedQuestionV4 {
  const forme = randomChoice(formes);
  const L = randomChoice(LETTRES);
  const situ = !!o.situations && Math.random() < 0.35;
  const e = tirerExpr(forme, L, situ ? { coef: o.coef } : o);
  const bonne = `$${somme(red(e), L)}$`;
  return {
    text: situ ? situation(e, "qcm") : randomChoice(TOURNURES_DEV_QCM)(e.tex),
    format: "qcm",
    choices: qcm(
      bonne,
      pieges(e).map((t) => `$${somme(t, L)}$`),
    ),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: explication(e),
  };
}

/** Reconnaître, parmi quatre, la forme développée réduite juste (sens direct). */
function genFormeDeveloppeeJuste(): TutorGeneratedQuestionV4 {
  const L = randomChoice(LETTRES);
  const e = tirerExpr(randomChoice<Forme>(["somme", "difference", "produit"]), L, { coef: true, inverse: true });
  const bonne = `$${somme(red(e), L)}$`;
  const P = randomChoice(PRENOMS);
  const text = randomChoice([
    `Parmi ces quatre expressions, laquelle est la forme développée réduite de $${e.tex}$ ?`,
    `Une seule de ces expressions est égale à $${e.tex}$. Laquelle ?`,
    `${P.n} a développé $${e.tex}$ de quatre façons différentes. Quelle est la bonne ?`,
    `Reconnais le bon développement de $${e.tex}$.`,
    `Laquelle de ces expressions obtient-on en développant puis en réduisant $${e.tex}$ ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: qcm(
      bonne,
      pieges(e).map((t) => `$${somme(t, L)}$`),
    ),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: explication(e),
  };
}

/** Quel développement est juste ? Les propositions sont des égalités complètes. */
function genQuelDevJuste(): TutorGeneratedQuestionV4 {
  const L = randomChoice(LETTRES);
  const e = tirerExpr(randomChoice<Forme>(["somme", "difference", "produit"]), L, { coef: true, inverse: true });
  const eg = (t: Terme[]) => `$${e.tex} = ${somme(t, L)}$`;
  const bonne = eg(red(e));
  const P = randomChoice(PRENOMS);
  const text = randomChoice([
    `Quel développement de $${e.tex}$ est juste ?`,
    `Une seule de ces égalités est vraie pour toutes les valeurs de $${L}$. Laquelle ?`,
    `${P.n} hésite entre ces quatre développements de $${e.tex}$. Lequel est juste ?`,
    `Quelle égalité est juste ?`,
    `Pour développer $${e.tex}$, on fait les quatre produits. Quelle égalité obtient-on ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: qcm(bonne, pieges(e).map(eg)),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: explication(e),
  };
}

/** Développer un carré en passant explicitement par le produit. */
function genPasserParProduit(): TutorGeneratedQuestionV4 {
  const L = randomChoice(LETTRES);
  const e = tirerExpr(randomChoice<Forme>(["somme", "difference"]), L, { coef: true, inverse: true });
  return {
    text: randomChoice(TOURNURES_PASSER_PAR_PRODUIT)(e.tex, produitTex(e)),
    format: "short",
    expected: [somme(red(e), L, false)],
    comparator: "expression_developpee",
    explanation: explication(e),
  };
}

/** (x + 3)² = (x + 3)(x + 3) : quelle écriture ? */
function genEcrireProduit(formes: Forme[], o: { coef?: boolean; inverse?: boolean }): TutorGeneratedQuestionV4 {
  const L = randomChoice(LETTRES);
  const e = tirerExpr(randomChoice(formes), L, o);
  const F = par(e.f1, L);
  const bonne = `$${F}${F}$`;
  const tournures: (() => string)[] = [
    () => `Quelle écriture est égale à $${e.tex}$ ?`,
    () => `Par quel produit peut-on remplacer $${e.tex}$ ?`,
    () => `Que signifie $${e.tex}$ ?`,
    () => `Complète : $${e.tex} = \\ldots$`,
    () => `Écris $${e.tex}$ sous la forme d’un produit de deux parenthèses.`,
    () => `Quel produit est égal à $${e.tex}$ ?`,
  ];
  if (!e.inverse) {
    tournures.push(() => {
      const ob = randomChoice(OBJETS_CARRES);
      const cond = e.forme === "difference" ? ` (avec ${condition(e)})` : "";
      return `${cap(ob.nom)} a des côtés de $${somme(e.f1, L)}$ ${ob.u}${cond}. Son aire s’écrit $${e.tex}$. Quelle autre écriture donne cette aire ?`;
    });
  }
  return {
    text: randomChoice(tournures)(),
    format: "qcm",
    choices: shuffle([bonne, `$${carresSepares(e)}$`, `$2${F}$`, `$${F} + ${F}$`]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation:
      "Méthode : un carré, c’est une expression multipliée par elle-même (comme $5^2 = 5 \\times 5$).\n\n" +
      `Calcul : $${e.tex} = ${F} \\times ${F}$, qu’on écrit $${F}${F}$.\n\n` +
      `Conclusion : $${e.tex} = ${F}${F}$. Ce n’est ni $${carresSepares(e)}$, ni le double de $${F}$.`,
  };
}

/** Première étape pour développer un carré. */
function genPremiereEtape(): TutorGeneratedQuestionV4 {
  const L = randomChoice(LETTRES);
  const e = tirerExpr(randomChoice<Forme>(["somme", "difference"]), L, { inverse: true });
  const F = par(e.f1, L);
  const P = randomChoice(PRENOMS);
  const bonne = `J’écris $${F}${F}$, puis je fais les quatre produits.`;
  const text = randomChoice([
    `Pour développer $${e.tex}$, que fais-tu en premier ?`,
    `Quelle est la bonne première étape pour développer $${e.tex}$ ?`,
    `${P.n} veut développer $${e.tex}$. Par quoi doit-${P.il} commencer ?`,
    `On veut développer $${e.tex}$. Quelle méthode est la bonne ?`,
    `Comment commencer le développement de $${e.tex}$ ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: shuffle([
      bonne,
      `J’écris directement $${carresSepares(e)}$.`,
      `Je calcule $${F} + ${F}$.`,
      `Je multiplie $${F}$ par 2.`,
    ]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: explication(e),
  };
}

/** Les quatre produits de la double distributivité. */
function genQuatreProduits(): TutorGeneratedQuestionV4 {
  const L = randomChoice(LETTRES);
  const e = tirerExpr(randomChoice<Forme>(["somme", "difference", "produit"]), L, { inverse: true });
  const ft = (t: Terme) => (t.c < 0 ? `(-${mono(-t.c, t.d, L, true)})` : mono(t.c, t.d, L, true));
  const [u1, v1] = e.f1;
  const [u2, v2] = e.f2;
  const x = (s: Terme, t: Terme) => `$${ft(s)} \\times ${ft(t)}$`;
  const bonne = `${x(u1, u2)} ; ${x(u1, v2)} ; ${x(v1, u2)} ; ${x(v1, v2)}`;
  const plus = (s: Terme, t: Terme) => `$${ft(s)} + ${ft(t)}$`;
  const FF = produitTex(e);
  const P = randomChoice(PRENOMS);
  const tournures = [
    `Pour développer $${FF}$, quels sont les quatre produits à calculer ?`,
    `En développant $${FF}$, quels produits doit-on effectuer ?`,
    `La double distributivité appliquée à $${FF}$ donne quels produits ?`,
    `${P.n} développe $${FF}$. Quels produits doit-${P.il} calculer ?`,
  ];
  if (e.carre) tournures.push(`On écrit $${e.tex} = ${FF}$. Quels sont les quatre produits à effectuer ?`);
  return {
    text: randomChoice(tournures),
    format: "qcm",
    choices: shuffle([
      bonne,
      `${x(u1, u2)} et ${x(v1, v2)} seulement`,
      `${x(u1, v2)} et ${x(v1, u2)} seulement`,
      `${plus(u1, u2)} ; ${plus(u1, v2)} ; ${plus(v1, u2)} ; ${plus(v1, v2)}`,
    ]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: explication(e),
  };
}

const LABELS = {
  somme: "carré d’une somme",
  difference: "carré d’une différence",
  produit: "produit d’une somme par une différence",
  autre: "aucune de ces trois formes",
} as const;

function raisonForme(mode: keyof typeof LABELS, E: string, FF: string): string {
  if (mode === "somme") return `$${E}$ est une somme entre parenthèses multipliée par elle-même : $${E} = ${FF}$. C’est le carré d’une somme.`;
  if (mode === "difference") return `$${E}$ est une différence entre parenthèses multipliée par elle-même : $${E} = ${FF}$. C’est le carré d’une différence.`;
  if (mode === "produit") return `$${E}$ multiplie une somme par la différence des MÊMES termes : c’est le produit d’une somme par une différence.`;
  return `$${E}$ n’est ni une parenthèse multipliée par elle-même, ni le produit d’une somme par la différence des mêmes termes.`;
}

/** Quelle est la forme de E ? */
function genFormeDe(): TutorGeneratedQuestionV4 {
  const L = randomChoice(LETTRES);
  const mode = randomChoice<keyof typeof LABELS>(["somme", "difference", "produit", "autre"]);
  let E: string;
  let FF = "";
  if (mode === "autre") {
    E = Math.random() < 0.7 ? tirerQuelconque(L).tex : `${randomInt(2, 9)}${par([{ c: 1, d: 1 }, { c: randomInt(1, 9), d: 0 }], L)}`;
  } else {
    const e = tirerExpr(mode, L, { coef: true, inverse: true });
    E = e.tex;
    FF = produitTex(e);
  }
  const P = randomChoice(PRENOMS);
  const text = randomChoice([
    `Quelle est la forme de $${E}$ ?`,
    `Observe $${E}$. De quelle forme s’agit-il ?`,
    `Sans développer, dis de quelle forme est $${E}$.`,
    `À quelle famille appartient l’expression $${E}$ ?`,
    `On considère $${E}$. Comment décrire sa structure ?`,
    `${P.n} doit développer $${E}$. Quelle forme reconnaît-${P.il} ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: shuffle([LABELS.somme, LABELS.difference, LABELS.produit, LABELS.autre]),
    expected: [LABELS[mode]],
    comparator: "mcq_exact",
    explanation:
      "Méthode : on regarde la structure. Une parenthèse multipliée par elle-même est un carré ; deux parenthèses avec les mêmes termes, un « + » dans l’une et un « − » dans l’autre, forment le produit d’une somme par une différence.\n\n" +
      `Calcul : ${raisonForme(mode, E, FF)}\n\n` +
      `Conclusion : c’est « ${LABELS[mode]} ».`,
  };
}

/** Laquelle de ces expressions est le carré d’une somme ? */
function genLaquelle(): TutorGeneratedQuestionV4 {
  const L = randomChoice(LETTRES);
  const cible = randomChoice<Forme>(["somme", "difference", "produit"]);
  const ex = {
    somme: tirerExpr("somme", L, { coef: true, inverse: true }).tex,
    difference: tirerExpr("difference", L, { coef: true, inverse: true }).tex,
    produit: tirerExpr("produit", L, { coef: true, inverse: true }).tex,
    autre: tirerQuelconque(L).tex,
  };
  const lab = {
    somme: "le carré d’une somme",
    difference: "le carré d’une différence",
    produit: "le produit d’une somme par une différence",
  }[cible];
  const labDu = lab.replace(/^le /, "du ");
  const P = randomChoice(PRENOMS);
  const text = randomChoice([
    `Laquelle de ces expressions est ${lab} ?`,
    `Parmi ces expressions, laquelle est ${lab} ?`,
    `Trouve ${lab} parmi ces expressions.`,
    `Quelle expression a la forme ${labDu} ?`,
    `${P.n} cherche ${lab}. Quelle expression doit-${P.il} choisir ?`,
  ]);
  const bonne = `$${ex[cible]}$`;
  return {
    text,
    format: "qcm",
    choices: shuffle([`$${ex.somme}$`, `$${ex.difference}$`, `$${ex.produit}$`, `$${ex.autre}$`]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation:
      "Méthode : un carré est une parenthèse multipliée par elle-même ; le produit d’une somme par une différence a les mêmes termes dans les deux parenthèses, avec « + » dans l’une et « − » dans l’autre.\n\n" +
      `Calcul : $${ex.somme}$ est le carré d’une somme, $${ex.difference}$ le carré d’une différence, $${ex.produit}$ le produit d’une somme par une différence, et $${ex.autre}$ n’est aucun des trois.\n\n` +
      `Conclusion : ${lab}, c’est ${bonne}.`,
  };
}

/** Le terme en L du développement réduit. */
function genTermeEnL(): TutorGeneratedQuestionV4 {
  const L = randomChoice(LETTRES);
  const e = tirerExpr(randomChoice<Forme>(["somme", "difference", "produit"]), L, { coef: true, inverse: true });
  const B = coef(red(e), 1);
  const m = 2 * e.p * e.q;
  const aucun = `aucun : les termes en $${L}$ s’annulent`;
  const t = (c: number) => `$${somme([{ c, d: 1 }], L)}$`;
  const bonne = B === 0 ? aucun : t(B);
  const faux = B === 0 ? [t(m), t(-m), t(e.p * e.q)] : [t(B / 2), t(-B), aucun, t(-B / 2)];
  const P = randomChoice(PRENOMS);
  const text = randomChoice([
    `Sans tout développer, quel est le terme en $${L}$ dans le développement réduit de $${e.tex}$ ?`,
    `On développe et on réduit $${e.tex}$. Quel terme en $${L}$ obtient-on ?`,
    `Dans la forme développée réduite de $${e.tex}$, quel est le terme en $${L}$ ?`,
    `Quel terme en $${L}$ apparaît quand on développe $${e.tex}$ puis qu’on réduit ?`,
    `${P.n} développe $${e.tex}$. Quel terme en $${L}$ doit-${P.il} trouver après réduction ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: qcm(bonne, faux),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: explication(
      e,
      B === 0
        ? `les deux termes en $${L}$ sont opposés : il n’en reste aucun.`
        : `les deux termes en $${L}$ s’ajoutent : le terme en $${L}$ est ${t(B)}.`,
    ),
  };
}

/** Quel cas de développement ? */
function genMethode(): TutorGeneratedQuestionV4 {
  const L = randomChoice(LETTRES);
  const mode = randomChoice(["somme", "difference", "produit", "classique"] as const);
  const lab = {
    somme: "carré d’une somme",
    difference: "carré d’une différence",
    produit: "produit d’une somme par une différence",
    // ⛔ 08/10/2026 : « double distributivité classique » était aussi juste pour les
    // trois autres cas (en 4e, TOUT se développe par les quatre produits). Le choix
    // porte désormais sur la FORME reconnue.
    classique: "aucun de ces trois cas (deux parenthèses quelconques)",
  };
  let E: string;
  let calc: string;
  if (mode === "classique") {
    const qc = tirerQuelconque(L);
    E = qc.tex;
    calc = `$${E}$ n’a ni deux parenthèses identiques, ni les mêmes termes avec « + » et « − » : on fait directement les quatre produits, $${E} = ${somme(reduire(produits(qc.f1, qc.f2)), L)}$.`;
  } else {
    const e = tirerExpr(mode, L, { coef: true, inverse: true });
    E = e.tex;
    calc = `${raisonForme(mode, E, produitTex(e))} On développe : ${calcul(e)}.`;
  }
  const P = randomChoice(PRENOMS);
  const text = randomChoice([
    `Quel cas reconnais-tu dans $${E}$ avant de le développer ?`,
    `Pour développer $${E}$, quel cas reconnais-tu ?`,
    `Avant de développer $${E}$, ${P.n} cherche de quel cas il s’agit. Lequel ?`,
    `Quel cas de développement correspond à $${E}$ ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: shuffle([lab.somme, lab.difference, lab.produit, lab.classique]),
    expected: [lab[mode]],
    comparator: "mcq_exact",
    explanation:
      "Méthode : on identifie d’abord la structure, puis on développe toujours par les quatre produits.\n\n" +
      `Calcul : ${calc}\n\n` +
      `Conclusion : c’est « ${lab[mode]} ».`,
  };
}

/** Laquelle est une parenthèse multipliée par elle-même ? */
function genMemeFacteur(): TutorGeneratedQuestionV4 {
  const L = randomChoice(LETTRES);
  const e = tirerExpr(randomChoice<Forme>(["somme", "difference"]), L, { coef: true, inverse: true });
  const F = par(e.f1, L);
  const ecritProduit = Math.random() < 0.4;
  const bonne = ecritProduit ? `$${F}${F}$` : `$${e.tex}$`;
  const sd = tirerExpr("produit", L, {}).tex;
  const qc = tirerQuelconque(L).tex;
  const k = randomInt(2, 5);
  const P = randomChoice(PRENOMS);
  const enL = `en $${L}$`;
  const text = ecritProduit
    ? randomChoice([
        `Voici quatre expressions ${enL}. Laquelle est égale à un carré ?`,
        `Parmi ces expressions ${enL}, laquelle peut s’écrire comme un carré ?`,
        `Quelle expression ${enL} est le carré d’une parenthèse ?`,
        `${P.n} cherche, parmi ces expressions ${enL}, celle qui s’écrit comme un carré. Laquelle doit-${P.il} choisir ?`,
      ])
    : randomChoice([
        `Voici quatre expressions ${enL}. Laquelle est une parenthèse multipliée par elle-même ?`,
        `Parmi ces expressions ${enL}, laquelle peut s’écrire comme le produit d’une parenthèse par elle-même ?`,
        `Quelle expression ${enL} se développe en écrivant deux fois la même parenthèse ?`,
        `${P.n} veut développer en écrivant deux fois la même parenthèse. Quelle expression ${enL} s’y prête ?`,
      ]);
  return {
    text,
    format: "qcm",
    choices: shuffle([bonne, `$${sd}$`, `$${qc}$`, `$${k}${F}$`]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation:
      "Méthode : un carré, c’est une parenthèse multipliée par elle-même ; les deux parenthèses sont alors IDENTIQUES.\n\n" +
      `Calcul : $${e.tex} = ${F}${F}$. Les autres ont deux parenthèses différentes, ou un nombre devant une seule parenthèse.\n\n` +
      `Conclusion : la bonne réponse est ${bonne}.`,
  };
}

/** Quelle démarche pour développer E ? */
function genQuelleDemarche(): TutorGeneratedQuestionV4 {
  const L = randomChoice(LETTRES);
  const c1 = "écrire le carré comme un produit de deux parenthèses identiques, puis faire les quatre produits";
  const c2 = "faire directement les quatre produits (double distributivité), puis réduire";
  const c3 = "élever au carré chaque terme de la parenthèse";
  const c4 = "multiplier seulement les premiers termes entre eux et les derniers entre eux";
  const r = Math.random();
  let E: string;
  let calc: string;
  let bonne: string;
  if (r < 0.55) {
    const e = tirerExpr(randomChoice<Forme>(["somme", "difference"]), L, { coef: true, inverse: true });
    E = e.tex;
    calc = calcul(e);
    bonne = c1;
  } else if (r < 0.8) {
    const e = tirerExpr("produit", L, { coef: true, inverse: true });
    E = e.tex;
    calc = calcul(e);
    bonne = c2;
  } else {
    const qc = tirerQuelconque(L);
    E = qc.tex;
    calc = `$${E} = ${detail(qc.f1, qc.f2, L)} = ${somme(reduire(produits(qc.f1, qc.f2)), L)}$`;
    bonne = c2;
  }
  const P = randomChoice(PRENOMS);
  const text = randomChoice([
    `Pour développer $${E}$, quelle démarche est correcte ?`,
    `Quelle est la bonne démarche pour développer $${E}$ ?`,
    `${P.n} doit développer $${E}$. Que doit-${P.il} faire ?`,
    `Comment développer $${E}$ ?`,
    `On veut la forme développée de $${E}$. Comment s’y prendre ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: shuffle([c1, c2, c3, c4]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation:
      "Méthode : un carré s’écrit d’abord comme un produit de deux parenthèses identiques ; un produit de deux parenthèses se développe directement par les quatre produits.\n\n" +
      `Calcul : ${calc}.\n\n` +
      `Conclusion : il faut ${bonne}.`,
  };
}

/* ---------------------------------------------------------------------------
   Calcul malin : 31² = (30 + 1)(30 + 1), 39 × 41 = (40 − 1)(40 + 1).
--------------------------------------------------------------------------- */
const RANGEES: { f: (a: number, b: number) => string; o: string }[] = [
  { f: (a, b) => `Une salle de spectacle compte ${a} rangées de ${b} fauteuils.`, o: "fauteuils" },
  { f: (a, b) => `Un verger compte ${a} rangées de ${b} manguiers.`, o: "manguiers" },
  { f: (a, b) => `Une mosaïque est faite de ${a} lignes de ${b} carreaux.`, o: "carreaux" },
  { f: (a, b) => `Une image numérique mesure ${a} pixels sur ${b} pixels.`, o: "pixels" },
  { f: (a, b) => `Une fanfare défile en ${a} rangs de ${b} musiciens.`, o: "musiciens" },
  { f: (a, b) => `Une centrale solaire aligne ${a} rangées de ${b} panneaux.`, o: "panneaux" },
  { f: (a, b) => `Un parking compte ${a} rangées de ${b} places.`, o: "places" },
  { f: (a, b) => `Une grille de jeu a ${a} lignes et ${b} colonnes.`, o: "cases" },
  { f: (a, b) => `Une vigne est plantée en ${a} rangs de ${b} pieds.`, o: "pieds de vigne" },
  { f: (a, b) => `Une chorale se place sur ${a} rangs de ${b} chanteurs.`, o: "chanteurs" },
  { f: (a, b) => `Un mur est fait de ${a} rangées de ${b} briques.`, o: "briques" },
  { f: (a, b) => `Un potager compte ${a} rangs de ${b} salades.`, o: "salades" },
  { f: (a, b) => `Une tribune de stade a ${a} rangées de ${b} sièges.`, o: "sièges" },
  { f: (a, b) => `Une boîte de chocolats contient ${a} rangées de ${b} chocolats.`, o: "chocolats" },
];

const milliers = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
const milliersTex = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\\,");

function tirerMalin() {
  const a = randomChoice([20, 30, 40, 50, 60, 70, 80, 90, 100]);
  const d = a === 100 ? randomInt(1, 3) : randomInt(1, 2);
  const carre = Math.random() < 0.6;
  const s1 = carre ? randomChoice([1, -1]) : -1;
  const s2 = carre ? s1 : 1;
  const n1 = a + s1 * d;
  const n2 = a + s2 * d;
  const fac = (s: number) => `(${a} ${s < 0 ? "-" : "+"} ${d})`;
  const prodTex = `${fac(s1)}${fac(s2)}`;
  const exprNum = carre ? `${n1}^2` : `${n1} \\times ${n2}`;
  const termes = [
    { txt: `${a} \\times ${a}`, v: a * a },
    { txt: `${a} \\times ${d}`, v: a * s2 * d },
    { txt: `${d} \\times ${a}`, v: s1 * d * a },
    { txt: `${d} \\times ${d}`, v: s1 * s2 * d * d },
  ];
  const joindre = (l: string[], signes: number[]) =>
    l.map((t, i) => (i === 0 ? t : `${signes[i] < 0 ? "-" : "+"} ${t}`)).join(" ");
  const signes = termes.map((t) => t.v);
  const v = n1 * n2;
  const calc =
    `$${exprNum} = ${prodTex} = ${joindre(termes.map((t) => t.txt), signes)} = ` +
    `${joindre(termes.map((t) => milliersTex(Math.abs(t.v))), signes)} = ${milliersTex(v)}$`;
  return { a, d, carre, s1, s2, n1, n2, prodTex, exprNum, v, calc, fac };
}

function explicationMalin(m: ReturnType<typeof tirerMalin>): string {
  return (
    `Méthode : on écrit ${m.carre ? `$${m.n1} = ${m.a} ${m.s1 < 0 ? "-" : "+"} ${m.d}$` : `$${m.n1} = ${m.a} - ${m.d}$ et $${m.n2} = ${m.a} + ${m.d}$`}, puis on développe le produit par les quatre produits, faciles à calculer de tête.\n\n` +
    `Calcul : ${m.calc}.\n\n` +
    `Conclusion : $${m.exprNum} = ${milliersTex(m.v)}$.`
  );
}

/** Calcul malin, réponse tapée. */
function genMalinCourt(): TutorGeneratedQuestionV4 {
  const m = tirerMalin();
  const ctx = randomChoice(RANGEES);
  const decomp = m.carre ? `$${m.n1} = ${m.a} ${m.s1 < 0 ? "-" : "+"} ${m.d}$` : `$${m.n1} = ${m.a} - ${m.d}$ et $${m.n2} = ${m.a} + ${m.d}$`;
  const text = randomChoice([
    `${ctx.f(m.n1, m.n2)} Combien y a-t-il de ${ctx.o} en tout ? Calcule-le de tête en développant $${m.prodTex}$.`,
    `Calcule $${m.exprNum}$ de tête, en écrivant ${decomp} puis en développant $${m.prodTex}$.`,
    `Sans calculatrice, utilise $${m.prodTex}$ pour calculer $${m.exprNum}$.`,
    `Que vaut $${m.exprNum}$ ? Aide : $${m.exprNum} = ${m.prodTex}$.`,
    `${ctx.f(m.n1, m.n2)} Écris ${decomp}, puis calcule de tête le nombre de ${ctx.o}.`,
  ]);
  return {
    text,
    format: "short",
    expected: [String(m.v), milliers(m.v)],
    comparator: "number_equal",
    explanation: explicationMalin(m),
  };
}

/** Calcul malin, QCM : quelle écriture ? */
function genMalinQcm(): TutorGeneratedQuestionV4 {
  const m = tirerMalin();
  const ctx = randomChoice(RANGEES);
  const P = randomChoice(PRENOMS);
  const bonne = `$${m.prodTex}$`;
  const faux = m.carre
    ? [
        `$${m.a}^2 ${m.s1 < 0 ? "-" : "+"} ${m.d}^2$`,
        `$2 \\times ${m.n1}$`,
        `$${m.fac(m.s1)} + ${m.fac(m.s2)}$`,
      ]
    : [
        `$${m.a} \\times ${m.a} + ${m.d} \\times ${m.d}$`,
        `$${m.fac(m.s1)} + ${m.fac(m.s2)}$`,
        `$${m.a} \\times ${m.d} \\times 2$`,
      ];
  const text = randomChoice([
    `${ctx.f(m.n1, m.n2)} Quelle écriture donne le nombre de ${ctx.o} et se calcule facilement de tête ?`,
    `Quelle écriture est égale à $${m.exprNum}$ et permet de le calculer de tête ?`,
    `Pour calculer $${m.exprNum}$ sans calculatrice, quelle écriture égale est la plus pratique ?`,
    `${P.n} veut calculer $${m.exprNum}$ de tête. Quelle écriture, égale à ce nombre, doit-${P.il} utiliser ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: shuffle([bonne, ...faux]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: explicationMalin(m),
  };
}

/* ---------------------------------------------------------------------------
   Défis : l’élève qui se trompe.
--------------------------------------------------------------------------- */

/** Un élève écrit E = … : juste ou faux, et sinon quel est le bon résultat ? */
function genEleveErreur(): TutorGeneratedQuestionV4 {
  const L = randomChoice(LETTRES);
  const e = tirerExpr(randomChoice<Forme>(["somme", "difference", "produit"]), L, { inverse: true });
  const bonneExpr = somme(red(e), L);
  const fx = pieges(e).map((t) => somme(t, L));
  const juste = Math.random() < 0.25;
  const claim = juste ? bonneExpr : randomChoice(fx);
  const JUSTE = "C’est juste.";
  const faux = (x: string) => `C’est faux : on trouve $${x}$.`;
  let bonne: string;
  let choices: string[];
  if (juste) {
    bonne = JUSTE;
    choices = qcm(bonne, fx.map(faux));
  } else {
    bonne = faux(bonneExpr);
    choices = shuffle([bonne, JUSTE, ...shuffle(fx.filter((x) => x !== claim)).slice(0, 2).map(faux)]);
  }
  const P = randomChoice(PRENOMS);
  const text = randomChoice([
    `${P.n} écrit : $${e.tex} = ${claim}$. Qu’en penses-tu ?`,
    `Sur sa copie, ${P.n} a écrit $${e.tex} = ${claim}$. Est-ce juste ?`,
    `${P.n} affirme que $${e.tex}$ est égal à $${claim}$. A-t-${P.il} raison ?`,
    `Vérifie le calcul ${deNom(P.n)} : $${e.tex} = ${claim}$.`,
  ]);
  return {
    text,
    format: "qcm",
    choices,
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: explication(e, juste ? `c’est juste : $${e.tex} = ${bonneExpr}$.` : `c’est faux : $${e.tex} = ${bonneExpr}$, et non $${claim}$.`),
  };
}

/** Oui / non, avec des erreurs plus fines (coefficient, signe). */
function genOuiNon(): TutorGeneratedQuestionV4 {
  const L = randomChoice(LETTRES);
  const e = tirerExpr(randomChoice<Forme>(["somme", "difference", "produit"]), L, { coef: true, inverse: true });
  const bonneExpr = somme(red(e), L);
  const juste = Math.random() < 0.3;
  const claim = juste ? bonneExpr : somme(randomChoice(pieges(e)), L);
  const P = randomChoice(PRENOMS);
  const text = randomChoice([
    `${P.n} écrit $${e.tex} = ${claim}$. A-t-${P.il} raison ?`,
    `Sur sa copie, ${P.n} a écrit : $${e.tex} = ${claim}$. Est-ce juste ?`,
    `L’égalité $${e.tex} = ${claim}$ est-elle vraie pour toutes les valeurs de $${L}$ ?`,
    `${P.n} affirme que $${e.tex}$ et $${claim}$ sont égales. Est-ce vrai ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: ["oui", "non"],
    expected: [juste ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation: explication(e, juste ? `oui : $${e.tex} = ${bonneExpr}$.` : `non : $${e.tex} = ${bonneExpr}$, et non $${claim}$.`),
  };
}

/** Explique l’erreur (réponse rédigée). */
function genExpliqueErreur(): TutorGeneratedQuestionV4 {
  const L = randomChoice(LETTRES);
  const e = tirerExpr(randomChoice<Forme>(["somme", "difference"]), L, { coef: true, inverse: true });
  const r = red(e);
  const A = coef(r, 2);
  const B = coef(r, 1);
  const C = coef(r, 0);
  const claim = somme(
    [
      { c: A, d: 2 },
      { c: C, d: 0 },
    ],
    L,
  );
  const terme = somme([{ c: B, d: 1 }], L);
  const P = randomChoice(PRENOMS);
  // ⛔ 08/10/2026 : c’était une question ouverte à mots-clés (« double produit »,
  // « manque », « oubli »… : le vocabulaire de la formule, que la 4e n’emploie pas,
  // et des mots qui passaient seuls). L’élève corrige maintenant le calcul.
  const text = randomChoice([
    `L’égalité $${e.tex} = ${claim}$ est fausse. Écris le bon développement réduit de $${e.tex}$.`,
    `${P.n} a écrit $${e.tex} = ${claim}$. Corrige son calcul : donne la forme développée réduite de $${e.tex}$.`,
    `Où est l’erreur dans $${e.tex} = ${claim}$ ? Écris $${e.tex}$ comme un produit de deux parenthèses, puis donne le bon développement réduit.`,
    `Pourquoi l’égalité $${e.tex} = ${claim}$ est-elle fausse ? Refais le calcul et donne la forme développée réduite.`,
  ]);
  return {
    text,
    format: "short",
    expected: [somme(r, L, false)],
    comparator: "expression_developpee",
    explanation: explication(
      e,
      `l’erreur est d’avoir élevé chaque terme au carré : on oublie les deux produits croisés, qui donnent $${terme}$. ` +
        `Il fallait écrire $${e.tex} = ${produitTex(e)}$ et faire les quatre produits.`,
    ),
  };
}

/** Carré d’une différence (ou d’une somme) contre produit somme × différence. */
function genComparaison(): TutorGeneratedQuestionV4 {
  const L = randomChoice(LETTRES);
  const sq = tirerExpr(randomChoice<Forme>(["somme", "difference"]), L, { coef: true });
  const plus: Facteur = [{ c: sq.p, d: 1 }, { c: sq.q, d: 0 }];
  const moins: Facteur = [{ c: sq.p, d: 1 }, { c: -sq.q, d: 0 }];
  const pr = fabrique(L, moins, plus, false, sq.p, sq.q, "produit", false);
  const rs = somme(red(sq), L);
  const rp = somme(red(pr), L);
  const bonne = `$${sq.tex} = ${rs}$, tandis que $${pr.tex} = ${rp}$`;
  const [X, Y] = Math.random() < 0.5 ? [sq.tex, pr.tex] : [pr.tex, sq.tex];
  const P = randomChoice(PRENOMS);
  const text = randomChoice([
    `Quelle est la différence entre $${X}$ et $${Y}$ ?`,
    `Compare $${X}$ et $${Y}$ : que donne le développement de chacune ?`,
    `${P.n} pense que $${X}$ et $${Y}$ sont égales. Qu’en est-il ?`,
    `Développe $${X}$ et $${Y}$. Quelle phrase est juste ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: shuffle([
      bonne,
      `$${sq.tex} = ${rp}$, tandis que $${pr.tex} = ${rs}$`,
      "les deux expressions donnent toujours le même résultat",
      "aucune des deux ne se développe",
    ]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation:
      "Méthode : on développe chacune par les quatre produits.\n\n" +
      `Calcul : ${calcul(sq)} ; ${calcul(pr)}.\n\n` +
      `Conclusion : ${bonne} — les termes en $${L}$ ne s’annulent que dans le produit d’une somme par une différence.`,
  };
}

/** Défi : développer une expression plus longue. */
function genDefiDev(): TutorGeneratedQuestionV4 {
  const L = randomChoice(LETTRES);
  const v = randomInt(1, 6);
  type Partie = { k: number; e: Expr | null };
  let parties: Partie[];
  const q = randomInt(1, 9);
  const plus = (qq: number): Facteur => [{ c: 1, d: 1 }, { c: qq, d: 0 }];
  const moins = (qq: number): Facteur => [{ c: 1, d: 1 }, { c: -qq, d: 0 }];
  const carre = (f: Facteur, forme: Forme) => fabrique(L, f, f, true, 1, q, forme, false);
  if (v <= 2) {
    parties = [{ k: 1, e: tirerExpr(randomChoice<Forme>(["somme", "difference", "difference"]), L, { pMin: 2, inverse: true }) }];
  } else if (v === 3) {
    parties = [
      { k: 1, e: carre(plus(q), "somme") },
      { k: -1, e: null },
    ];
  } else if (v === 4) {
    parties = [
      { k: 1, e: carre(plus(q), "somme") },
      { k: 1, e: carre(moins(q), "difference") },
    ];
  } else if (v === 5) {
    parties = [
      { k: 1, e: carre(plus(q), "somme") },
      { k: -1, e: carre(moins(q), "difference") },
    ];
  } else {
    parties = [{ k: randomInt(2, 3), e: tirerExpr(randomChoice<Forme>(["somme", "difference"]), L, {}) }];
  }
  const corps = (p: Partie) => (p.e ? p.e.tex : `${L}^2`);
  const E = parties
    .map((p, i) => {
      const a = Math.abs(p.k);
      const kk = a === 1 ? "" : `${a}`;
      if (i === 0) return `${p.k < 0 ? "-" : ""}${kk}${corps(p)}`;
      return `${p.k < 0 ? "-" : "+"} ${kk}${corps(p)}`;
    })
    .join(" ");
  const total: Terme[] = [];
  for (const p of parties) {
    const t = p.e ? red(p.e) : [{ c: 1, d: 2 }];
    for (const x of t) total.push({ c: p.k * x.c, d: x.d });
  }
  const res = reduire(total);
  const lignes = parties.filter((p) => p.e).map((p) => calcul(p.e as Expr));
  const reconstitue = parties
    .map((p, i) => {
      const a = Math.abs(p.k);
      const kk = a === 1 ? "" : `${a}`;
      const b = p.e ? `(${somme(red(p.e), L)})` : `${L}^2`;
      if (i === 0) return `${p.k < 0 ? "-" : ""}${kk}${b}`;
      return `${p.k < 0 ? "-" : "+"} ${kk}${b}`;
    })
    .join(" ");
  const multi = parties.length > 1 || Math.abs(parties[0].k) !== 1;
  return {
    text: randomChoice(TOURNURES_DEV)(E),
    format: "short",
    expected: [somme(res, L, false)],
    comparator: "expression_developpee",
    explanation:
      `${METHODE_CARRE}${multi ? " On développe chaque carré à part, puis on distribue et on réduit l’ensemble." : ""}\n\n` +
      `Calcul : ${lignes.join(" ; ")}.` +
      (multi ? ` Donc $${E} = ${reconstitue} = ${somme(res, L)}$.` : "") +
      `\n\nConclusion : $${E} = ${somme(res, L)}$.`,
  };
}

export const identitesRemarquablesBank: TutorBankItemV4[] = [
  // =========================
  // IR_LIER_DISTRIBUTIVITE
  // =========================
  {
    kind: "fixed",
    id: "litteral_identite_lier_litteral_distributivite_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_lier_distributivite",
    difficulty: 1,
    theme: "neutral",
    text: "Pourquoi peut-on écrire (x + 3)² = (x + 3)(x + 3) ?",
    format: "qcm",
    choices: [
      "car le carré signifie multiplier par soi-même",
      "car le carré signifie ajouter le nombre à lui-même",
      "car le carré signifie multiplier par deux le nombre",
      "car les parenthèses se multiplient toujours entre elles",
    ],
    expected: ["car le carré signifie multiplier par soi-même"],
    comparator: "mcq_exact",
    hint: "Un carré signifie qu’une expression est multipliée par elle-même.",
    explanation: "Méthode : un carré, c’est une expression multipliée par elle-même, comme (x + 3)² = (x + 3)(x + 3) ; un produit de deux parenthèses se développe par les quatre produits (double distributivité), puis on réduit.\n\n" +
          "Calcul : " +
          ("(x + 3)² signifie (x + 3) multiplié par lui-même, donc (x + 3)(x + 3).") +
          "\n\nConclusion : on passe toujours par le produit de deux parenthèses et ses quatre produits, sans formule à retenir.",
    tags: ["litteral_identite_remarquable", "double_distributivite", "sens"],
  },
  {
    kind: "template",
    id: "litteral_identite_lier_litteral_distributivite_tpl_ecrire_produit_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_lier_distributivite",
    difficulty: 1,
    theme: "neutral",
    hint: "Un carré, c’est une expression multipliée par elle-même : 5² = 5 × 5.",
    tags: ["litteral_identite_remarquable", "double_distributivite", "sens", "template"],
    generate: () => genEcrireProduit(["somme", "difference"], {}),
  },
  {
    kind: "template",
    id: "litteral_identite_lier_litteral_distributivite_tpl_premiere_etape_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_lier_distributivite",
    difficulty: 1,
    theme: "neutral",
    hint: "Avant de développer un carré, écris-le comme un produit de deux parenthèses identiques.",
    tags: ["litteral_identite_remarquable", "double_distributivite", "methode", "template"],
    generate: () => genPremiereEtape(),
  },
  {
    kind: "fixed",
    id: "litteral_identite_lier_litteral_distributivite_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_lier_distributivite",
    difficulty: 2,
    theme: "neutral",
    text: "Développer par double distributivité : (x + 2)(x + 2)",
    format: "qcm",
    choices: [
      "x² + 4x + 4",
      "x² + 4",
      "2x + 4",
      "x² + 2x + 4",
    ],
    expected: ["x² + 4x + 4"],
    comparator: "mcq_exact",
    hint: "Fais les 4 produits : x×x, x×2, 2×x, 2×2.",
    explanation: "Méthode : un carré, c’est une expression multipliée par elle-même, comme (x + 3)² = (x + 3)(x + 3) ; un produit de deux parenthèses se développe par les quatre produits (double distributivité), puis on réduit.\n\n" +
          "Calcul : " +
          ("(x + 2)(x + 2) = x² + 2x + 2x + 4 = x² + 4x + 4.") +
          "\n\nConclusion : on passe toujours par le produit de deux parenthèses et ses quatre produits, sans formule à retenir.",
    tags: ["litteral_identite_remarquable", "double_distributivite"],
  },
  {
    kind: "template",
    id: "litteral_identite_lier_litteral_distributivite_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_lier_distributivite",
    difficulty: 2,
    theme: "neutral",
    hint: "Remplace le carré par un produit de deux parenthèses identiques.",
    tags: ["litteral_identite_remarquable", "double_distributivite", "template"],
    generate: () => genEcrireProduit(["somme"], { coef: true, inverse: true }),
  },
  {
    kind: "template",
    id: "litteral_identite_lier_litteral_distributivite_tpl_quatre_produits_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_lier_distributivite",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque terme de la première parenthèse multiplie chaque terme de la seconde : 2 × 2 = 4 produits.",
    tags: ["litteral_identite_remarquable", "double_distributivite", "template"],
    generate: () => genQuatreProduits(),
  },
  {
    kind: "template",
    id: "litteral_identite_lier_litteral_distributivite_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_lier_distributivite",
    difficulty: 3,
    theme: "neutral",
    hint: "Développe avec les 4 produits, puis réduis.",
    tags: ["litteral_identite_remarquable", "double_distributivite", "template"],
    generate: () => genDevCourt(["somme", "difference"], { coef: true, inverse: true, commeProduit: true }),
  },
  {
    kind: "template",
    id: "litteral_identite_lier_litteral_distributivite_tpl_passer_par_produit_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_lier_distributivite",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris le carré comme un produit de deux parenthèses identiques, fais les quatre produits, puis réduis.",
    tags: ["litteral_identite_remarquable", "double_distributivite", "developper", "template"],
    generate: () => genPasserParProduit(),
  },
  {
    kind: "fixed",
    id: "litteral_identite_lier_litteral_distributivite_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_lier_distributivite",
    difficulty: 3,
    theme: "neutral",
    // ⛔ 08/10/2026 : question ouverte à mots-clés → réponse jugée par le comparateur.
    text: "Écris (x + 4)² comme un produit de deux parenthèses, fais les quatre produits, puis réduis.",
    format: "short",
    expected: ["x² + 8x + 16"],
    comparator: "expression_developpee",
    hint: "Commence par écrire (x + 4)² sous forme de produit.",
    explanation: "Méthode : un carré, c’est une expression multipliée par elle-même, comme (x + 3)² = (x + 3)(x + 3) ; un produit de deux parenthèses se développe par les quatre produits (double distributivité), puis on réduit.\n\n" +
          "Calcul : " +
          ("(x + 4)² = (x + 4)(x + 4) = x² + 4x + 4x + 16 = x² + 8x + 16.") +
          "\n\nConclusion : on passe toujours par le produit de deux parenthèses et ses quatre produits, sans formule à retenir.",
    tags: ["litteral_identite_remarquable", "open", "justification"],
  },

  // =========================
  // IR_RECONNAITRE
  // =========================
  {
    kind: "fixed",
    id: "litteral_identite_reconnaitre_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle expression est de la forme (a + b)² ?",
    format: "qcm",
    choices: ["(x + 5)²", "(x + 5)(x - 5)", "x + 5²", "2(x + 5)"],
    expected: ["(x + 5)²"],
    comparator: "mcq_exact",
    hint: "On cherche une somme entre parenthèses élevée au carré.",
    explanation: "Méthode : un carré, c’est une expression multipliée par elle-même, comme (x + 3)² = (x + 3)(x + 3) ; un produit de deux parenthèses se développe par les quatre produits (double distributivité), puis on réduit.\n\n" +
          "Calcul : " +
          ("(x + 5)² est une somme entre parenthèses multipliée par elle-même : (x + 5)² = (x + 5)(x + 5).") +
          "\n\nConclusion : on passe toujours par le produit de deux parenthèses et ses quatre produits, sans formule à retenir.",
    tags: ["litteral_identite_remarquable", "reconnaitre"],
  },
  {
    kind: "fixed",
    id: "litteral_identite_reconnaitre_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    // ⛔ 08/10/2026 : « différence de deux carrés » (vocabulaire de la formule) → on demande le résultat.
    text: "Laquelle de ces expressions donne x² − 9 une fois développée et réduite ?",
    format: "qcm",
    choices: ["(x - 3)(x + 3)", "(x + 3)²", "(x - 3)²", "x² + 9"],
    expected: ["(x - 3)(x + 3)"],
    comparator: "mcq_exact",
    hint: "Fais les quatre produits de chaque proposition : laquelle donne x² moins un nombre, sans terme en x ?",
    explanation: "Méthode : un carré, c’est une expression multipliée par elle-même, comme (x + 3)² = (x + 3)(x + 3) ; un produit de deux parenthèses se développe par les quatre produits (double distributivité), puis on réduit.\n\n" +
          "Calcul : " +
          ("(x - 3)(x + 3) = x × x + x × 3 + (-3) × x + (-3) × 3 = x² + 3x - 3x - 9 = x² - 9 : les termes en x s’annulent.") +
          "\n\nConclusion : on passe toujours par le produit de deux parenthèses et ses quatre produits, sans formule à retenir.",
    tags: ["litteral_identite_remarquable", "difference_carres"],
  },
  {
    kind: "template",
    id: "litteral_identite_reconnaitre_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde la structure : carré d’une somme, carré d’une différence ou produit somme-différence.",
    tags: ["litteral_identite_remarquable", "reconnaitre", "template"],
    generate: () => genFormeDe(),
  },

  // =========================
  // IR_DEVELOPPER
  // =========================
  {
    kind: "fixed",
    id: "litteral_identite_developper_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_developper",
    difficulty: 2,
    theme: "neutral",
    text: "Développer : (x + 3)²",
    format: "qcm",
    choices: [
      "x² + 6x + 9",
      "x² + 9",
      "x² + 3x + 9",
      "2x + 6",
    ],
    expected: ["x² + 6x + 9"],
    comparator: "mcq_exact",
    hint: "Pense à (x + 3)(x + 3).",
    explanation: "Méthode : un carré, c’est une expression multipliée par elle-même, comme (x + 3)² = (x + 3)(x + 3) ; un produit de deux parenthèses se développe par les quatre produits (double distributivité), puis on réduit.\n\n" +
          "Calcul : " +
          ("(x + 3)² = (x + 3)(x + 3) = x² + 6x + 9.") +
          "\n\nConclusion : on passe toujours par le produit de deux parenthèses et ses quatre produits, sans formule à retenir.",
    tags: ["litteral_identite_remarquable", "developper"],
  },
  {
    kind: "fixed",
    id: "litteral_identite_developper_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_developper",
    difficulty: 2,
    theme: "neutral",
    text: "Développer : (x - 4)²",
    format: "qcm",
    choices: [
      "x² - 8x + 16",
      "x² - 16",
      "x² + 8x + 16",
      "x² - 4x + 16",
    ],
    expected: ["x² - 8x + 16"],
    comparator: "mcq_exact",
    hint: "Pense à (x - 4)(x - 4).",
    explanation: "Méthode : un carré, c’est une expression multipliée par elle-même, comme (x + 3)² = (x + 3)(x + 3) ; un produit de deux parenthèses se développe par les quatre produits (double distributivité), puis on réduit.\n\n" +
          "Calcul : " +
          ("(x - 4)² = (x - 4)(x - 4) = x² - 4x - 4x + 16 = x² - 8x + 16.") +
          "\n\nConclusion : on passe toujours par le produit de deux parenthèses et ses quatre produits, sans formule à retenir.",
    tags: ["litteral_identite_remarquable", "developper", "signe"],
  },
  {
    kind: "fixed",
    id: "litteral_identite_developper_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_developper",
    difficulty: 2,
    theme: "neutral",
    text: "Développer : (x - 5)(x + 5)",
    format: "qcm",
    choices: [
      "x² - 25",
      "x² + 25",
      "x² - 10x + 25",
      "x² + 10x + 25",
    ],
    expected: ["x² - 25"],
    comparator: "mcq_exact",
    hint: "Fais les quatre produits : les deux termes en x s’annulent.",
    explanation: "Méthode : un carré, c’est une expression multipliée par elle-même, comme (x + 3)² = (x + 3)(x + 3) ; un produit de deux parenthèses se développe par les quatre produits (double distributivité), puis on réduit.\n\n" +
          "Calcul : " +
          ("(x - 5)(x + 5) = x × x + x × 5 + (-5) × x + (-5) × 5 = x² + 5x - 5x - 25 = x² - 25.") +
          "\n\nConclusion : on passe toujours par le produit de deux parenthèses et ses quatre produits, sans formule à retenir.",
    tags: ["litteral_identite_remarquable", "difference_carres"],
  },
  {
    kind: "template",
    id: "litteral_identite_developper_tpl_qcm_simple_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_developper",
    difficulty: 2,
    theme: "neutral",
    hint: "Écris le carré comme un produit de deux parenthèses, fais les quatre produits, puis réduis.",
    tags: ["litteral_identite_remarquable", "developper", "qcm", "template"],
    generate: () => genDevQcm(["somme", "difference", "produit"], { situations: true }),
  },
  {
    kind: "template",
    id: "litteral_identite_developper_tpl_court_simple_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_developper",
    difficulty: 2,
    theme: "neutral",
    hint: "Écris le carré comme un produit de deux parenthèses, fais les quatre produits, puis réduis.",
    tags: ["litteral_identite_remarquable", "developper", "template"],
    generate: () => genDevCourt(["somme", "difference", "produit"], { situations: true }),
  },
  {
    kind: "template",
    id: "litteral_identite_developper_tpl_somme_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_developper",
    difficulty: 3,
    theme: "neutral",
    hint: "Passe par le produit de deux parenthèses identiques, puis réduis.",
    tags: ["litteral_identite_remarquable", "developper", "somme", "template"],
    generate: () => genDevCourt(["somme"], { coef: true, inverse: true, situations: true }),
  },
  {
    kind: "template",
    id: "litteral_identite_developper_tpl_difference_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_developper",
    difficulty: 3,
    theme: "neutral",
    hint: "Attention au signe : (−3) × (−3) = +9, et les deux termes en x sont négatifs.",
    tags: ["litteral_identite_remarquable", "developper", "difference", "template"],
    generate: () => genDevCourt(["difference"], { coef: true, inverse: true, situations: true }),
  },
  {
    kind: "template",
    id: "litteral_identite_developper_tpl_carres_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_developper",
    difficulty: 3,
    theme: "neutral",
    hint: "Les termes en x s’annulent.",
    tags: ["litteral_identite_remarquable", "difference_carres", "template"],
    generate: () => genDevCourt(["produit"], { coef: true, inverse: true, situations: true }),
  },

  // =========================
  // IR_CHOISIR
  // =========================
  {
    kind: "fixed",
    id: "litteral_identite_choisir_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_choisir",
    difficulty: 3,
    theme: "neutral",
    text: "Pour développer (x + 7)², quelle méthode est la plus adaptée ?",
    format: "qcm",
    choices: [
      "écrire (x + 7)(x + 7), puis appliquer la double distributivité",
      "écrire (x + 7)(x + 7), puis additionner les deux parenthèses",
      "écrire x² + 7² directement, puis simplifier le résultat obtenu",
      "écrire (x + 7) × 2, puis appliquer la double distributivité",
    ],
    expected: ["écrire (x + 7)(x + 7), puis appliquer la double distributivité"],
    comparator: "mcq_exact",
    hint: "Un carré d’expression signifie produit par soi-même.",
    explanation: "Méthode : un carré, c’est une expression multipliée par elle-même, comme (x + 3)² = (x + 3)(x + 3) ; un produit de deux parenthèses se développe par les quatre produits (double distributivité), puis on réduit.\n\n" +
          "Calcul : " +
          ("La méthode correcte est de passer par (x + 7)(x + 7), puis de développer.") +
          "\n\nConclusion : on passe toujours par le produit de deux parenthèses et ses quatre produits, sans formule à retenir.",
    tags: ["litteral_identite_remarquable", "choisir"],
  },
  {
    kind: "template",
    id: "litteral_identite_choisir_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_choisir",
    difficulty: 3,
    theme: "neutral",
    hint: "Identifie d’abord la structure de l’expression.",
    tags: ["litteral_identite_remarquable", "choisir", "template"],
    generate: () => genMethode(),
  },
  {
    kind: "template",
    id: "litteral_identite_choisir_tpl_meme_facteur_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_choisir",
    difficulty: 3,
    theme: "neutral",
    hint: "Un carré, ce sont deux parenthèses IDENTIQUES multipliées entre elles.",
    tags: ["litteral_identite_remarquable", "choisir", "template"],
    generate: () => genMemeFacteur(),
  },

  // =========================
  // IR_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "litteral_identite_defi_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit : (x + 5)² = x² + 25. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Écris (x + 5)(x + 5) et fais les quatre produits.",
    explanation: "Méthode : un carré, c’est une expression multipliée par elle-même, comme (x + 3)² = (x + 3)(x + 3) ; un produit de deux parenthèses se développe par les quatre produits (double distributivité), puis on réduit.\n\n" +
          "Calcul : " +
          ("Non. (x + 5)² = (x + 5)(x + 5) = x² + 10x + 25. Il manque 10x.") +
          "\n\nConclusion : on passe toujours par le produit de deux parenthèses et ses quatre produits, sans formule à retenir.",
    tags: ["litteral_identite_remarquable", "erreur", "defi"],
  },
  {
    kind: "fixed",
    id: "litteral_identite_defi_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit : (x - 4)² = x² - 16. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Écris (x - 4)² = (x - 4)(x - 4) et fais les quatre produits : n’oublie aucun terme en x.",
    explanation: "Méthode : un carré, c’est une expression multipliée par elle-même, comme (x + 3)² = (x + 3)(x + 3) ; un produit de deux parenthèses se développe par les quatre produits (double distributivité), puis on réduit.\n\n" +
          "Calcul : " +
          ("Non. (x - 4)² = (x - 4)(x - 4) = x² - 4x - 4x + 16 = x² - 8x + 16. C’est (x - 4)(x + 4) = x² + 4x - 4x - 16 qui donne x² - 16.") +
          "\n\nConclusion : on passe toujours par le produit de deux parenthèses et ses quatre produits, sans formule à retenir.",
    tags: ["litteral_identite_remarquable", "erreur", "defi"],
  },
  {
    kind: "template",
    id: "litteral_identite_defi_tpl_eleve_erreur_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Refais le calcul : écris le produit de deux parenthèses, fais les quatre produits, puis compare.",
    tags: ["litteral_identite_remarquable", "defi", "erreur", "template"],
    generate: () => genEleveErreur(),
  },
  {
    kind: "template",
    id: "litteral_identite_defi_tpl_calcul_malin_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Écris le nombre comme une dizaine ronde plus ou moins un petit nombre, puis fais les quatre produits.",
    tags: ["litteral_identite_remarquable", "defi", "calcul_malin", "template"],
    generate: () => genMalinCourt(),
  },
  {
    kind: "template",
    id: "litteral_identite_defi_open_erreur_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Développe en écrivant le carré comme un produit de deux parenthèses.",
    tags: ["litteral_identite_remarquable", "open", "erreur", "template"],
    generate: () => genExpliqueErreur(),
  },
  {
    kind: "template",
    id: "litteral_identite_defi_tpl_comparaison_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare les deux formes : carré d’une différence et produit somme-différence.",
    tags: ["litteral_identite_remarquable", "defi", "comparaison", "template"],
    generate: () => genComparaison(),
  },

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  // ---------- IR_LIER_DISTRIBUTIVITE ----------
  {
    kind: "fixed",
    id: "litteral_identite_lier_litteral_distributivite_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_lier_distributivite",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle écriture correspond à $(x - 2)^2$ ?",
    format: "qcm",
    choices: ["$(x - 2)(x - 2)$", "$x^2 - 2^2$", "$(x - 2) + (x - 2)$", "$2(x - 2)$"],
    expected: ["$(x - 2)(x - 2)$"],
    comparator: "mcq_exact",
    hint: "Le carré signifie multiplier par soi-même.",
    explanation:
      "Définition : élever au carré, c’est multiplier l’expression par elle-même.\n\n" +
      "Méthode : on récrit le carré comme un produit.\n\n" +
      "Calcul : $(x - 2)^2 = (x - 2)(x - 2)$.\n\n" +
      "Conclusion : l’écriture est $(x - 2)(x - 2)$.",
    tags: ["litteral_identite_remarquable", "double_distributivite", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_identite_lier_litteral_distributivite_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_lier_distributivite",
    difficulty: 2,
    theme: "neutral",
    text: "Développer par double distributivité : $(x + 1)(x + 1)$",
    format: "qcm",
    choices: ["$x^2 + 2x + 1$", "$x^2 + 1$", "$x^2 + x + 1$", "$2x + 1$"],
    expected: ["$x^2 + 2x + 1$"],
    comparator: "mcq_exact",
    hint: "Fais les quatre produits puis réduis.",
    explanation:
      "Définition : la double distributivité fait quatre produits.\n\n" +
      "Méthode : $(x+1)(x+1) = x^2 + x + x + 1$.\n\n" +
      "Calcul : $= x^2 + 2x + 1$.\n\n" +
      "Conclusion : le résultat est $x^2 + 2x + 1$.",
    tags: ["litteral_identite_remarquable", "double_distributivite", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_identite_lier_litteral_distributivite_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_lier_distributivite",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle égalité est FAUSSE ?",
    format: "qcm",
    choices: [
      "$(x + 3)^2 = x^2 + 9$",
      "$(x + 3)^2 = (x + 3)(x + 3)$",
      "$(x + 3)^2 = x^2 + 6x + 9$",
      "$(x + 3)(x + 3) = x^2 + 6x + 9$",
    ],
    expected: ["$(x + 3)^2 = x^2 + 9$"],
    comparator: "mcq_exact",
    hint: "Le carré d’une somme n’est pas la somme des carrés.",
    explanation:
      "Méthode : un carré, c’est une expression multipliée par elle-même ; on écrit le produit de deux parenthèses et on fait les quatre produits.\n\n" +
      "Calcul : $(x + 3)^2 = (x + 3)(x + 3) = x \\times x + x \\times 3 + 3 \\times x + 3 \\times 3 = x^2 + 6x + 9$, donc « $= x^2 + 9$ » est faux : il oublie les deux produits $3x$.\n\n" +
      "Conclusion : l’égalité fausse est $(x + 3)^2 = x^2 + 9$.",
    tags: ["litteral_identite_remarquable", "erreur", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_identite_lier_litteral_distributivite_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_lier_distributivite",
    difficulty: 2,
    theme: "neutral",
    hint: "Le carré d’une différence est aussi un produit par soi-même.",
    tags: ["litteral_identite_remarquable", "double_distributivite", "template"],
    generate: () => genEcrireProduit(["difference"], { coef: true, inverse: true }),
  },
  {
    kind: "fixed",
    id: "litteral_identite_lier_litteral_distributivite_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_lier_distributivite",
    difficulty: 3,
    theme: "neutral",
    // ⛔ 08/10/2026 : question ouverte à mots-clés → réponse jugée par le comparateur.
    text: "Écris $(x - 3)^2$ comme un produit de deux parenthèses, fais les quatre produits, puis réduis.",
    format: "short",
    expected: ["x² - 6x + 9"],
    comparator: "expression_developpee",
    hint: "Écris d’abord le carré comme un produit.",
    explanation:
      "Définition : un carré est un produit par soi-même.\n\n" +
      "Méthode : on développe les quatre produits.\n\n" +
      "Calcul : $(x - 3)^2 = (x - 3)(x - 3) = x^2 - 3x - 3x + 9 = x^2 - 6x + 9$.\n\n" +
      "Conclusion : $(x - 3)^2 = x^2 - 6x + 9$.",
    tags: ["litteral_identite_remarquable", "open"],
  },

  // ---------- IR_RECONNAITRE ----------
  {
    kind: "fixed",
    id: "litteral_identite_reconnaitre_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle expression est de la forme $(a - b)^2$ ?",
    format: "qcm",
    choices: ["$(x - 6)^2$", "$(x - 6)(x + 6)$", "$(x + 6)^2$", "$x^2 - 6$"],
    expected: ["$(x - 6)^2$"],
    comparator: "mcq_exact",
    hint: "On cherche une différence entre parenthèses élevée au carré.",
    explanation:
      "Définition : $(a - b)^2$ est le carré d’une différence.\n\n" +
      "Méthode : on cherche une différence au carré.\n\n" +
      "Calcul : $(x - 6)^2$ est de la forme $(a - b)^2$.\n\n" +
      "Conclusion : c’est $(x - 6)^2$.",
    tags: ["litteral_identite_remarquable", "reconnaitre", "qcm"],
  },
  // ⛔ 03/10/2026 : `litteral_identite_reconnaitre_fixed_4` (x² + 10x + 25 →
  // (x + 5)²) et `_fixed_5` (x² − 49 → (x − 7)(x + 7)) sont sortis de la 4e,
  // décision de Frédéric : une identité lue à l’envers, c’est de la 3e.
  {
    kind: "template",
    id: "litteral_identite_reconnaitre_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Carré d’une somme, d’une différence, ou produit somme-différence.",
    tags: ["litteral_identite_remarquable", "reconnaitre", "template"],
    generate: () => genLaquelle(),
  },
  {
    kind: "template",
    // ⛔ 03/10/2026 : remplace `litteral_identite_reconnaitre_tpl_3` (remonter
    // de la forme développée à l’identité = factorisation, sortie en 3e sur
    // décision de Frédéric). Ici on reste dans le SENS DIRECT : reconnaître,
    // parmi plusieurs, le développement juste.
    id: "litteral_identite_reconnaitre_tpl_forme_developpee_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris le produit de deux parenthèses, fais les quatre produits, puis cherche le résultat parmi les propositions.",
    tags: ["litteral_identite_remarquable", "reconnaitre", "developpe", "template"],
    generate: () => genFormeDeveloppeeJuste(),
  },
  {
    kind: "template",
    id: "litteral_identite_reconnaitre_tpl_terme_milieu_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Les deux produits croisés donnent les termes en x : s’ajoutent-ils ou s’annulent-ils ?",
    tags: ["litteral_identite_remarquable", "reconnaitre", "template"],
    generate: () => genTermeEnL(),
  },
  {
    kind: "fixed",
    id: "litteral_identite_reconnaitre_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    // ⛔ 08/10/2026 : question ouverte à mots-clés (lettres a et b, proches de la formule) → QCM avec des nombres.
    text: "Qu’est-ce qui distingue $(x + 3)^2$ de $(x - 3)(x + 3)$ ?",
    format: "qcm",
    choices: [
      "$(x + 3)^2 = (x + 3)(x + 3)$ : deux parenthèses identiques ; dans $(x - 3)(x + 3)$, un signe change",
      "rien : ce sont deux écritures de la même expression",
      "$(x - 3)(x + 3)$ est aussi un carré",
      "$(x + 3)^2$ n’a que deux produits à faire",
    ],
    expected: ["$(x + 3)^2 = (x + 3)(x + 3)$ : deux parenthèses identiques ; dans $(x - 3)(x + 3)$, un signe change"],
    comparator: "mcq_exact",
    hint: "L’une est un carré, l’autre un produit somme-différence.",
    explanation:
      "Définition : $(x + 3)^2$ est un carré ; $(x - 3)(x + 3)$ est le produit d’une somme par une différence.\n\n" +
      "Méthode : on regarde si les deux parenthèses sont identiques, ou si un signe change.\n\n" +
      "Calcul : $(x + 3)(x + 3) = x^2 + 3x + 3x + 9 = x^2 + 6x + 9$ : les termes en $x$ s’ajoutent. $(x - 3)(x + 3) = x^2 + 3x - 3x - 9 = x^2 - 9$ : ils s’annulent.\n\n" +
      "Conclusion : dans le carré, les deux parenthèses sont identiques et les termes en $x$ restent ; dans le produit d’une somme par une différence, un signe change et ils disparaissent.",
    tags: ["litteral_identite_remarquable", "reconnaitre", "open"],
  },

  // ---------- IR_DEVELOPPER ----------
  {
    kind: "fixed",
    id: "litteral_identite_developper_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_developper",
    difficulty: 2,
    theme: "neutral",
    text: "Développer : $(x + 6)^2$",
    format: "qcm",
    choices: ["$x^2 + 12x + 36$", "$x^2 + 36$", "$x^2 + 6x + 36$", "$x^2 + 12x + 12$"],
    expected: ["$x^2 + 12x + 36$"],
    comparator: "mcq_exact",
    hint: "Écris $(x + 6)(x + 6)$ et fais les quatre produits.",
    explanation:
      "Méthode : un carré, c’est une expression multipliée par elle-même ; on fait les quatre produits, puis on réduit.\n\n" +
      "Calcul : $(x + 6)^2 = (x + 6)(x + 6) = x \\times x + x \\times 6 + 6 \\times x + 6 \\times 6 = x^2 + 6x + 6x + 36 = x^2 + 12x + 36$.\n\n" +
      "Conclusion : le résultat est $x^2 + 12x + 36$.",
    tags: ["litteral_identite_remarquable", "developper", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_identite_developper_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_developper",
    difficulty: 2,
    theme: "neutral",
    text: "Développer : $(x - 7)(x + 7)$",
    format: "qcm",
    choices: ["$x^2 - 49$", "$x^2 + 49$", "$x^2 - 14x + 49$", "$x^2 - 14x - 49$"],
    expected: ["$x^2 - 49$"],
    comparator: "mcq_exact",
    hint: "Fais les quatre produits : les termes en x s’annulent.",
    explanation:
      "Méthode : on fait les quatre produits (double distributivité), puis on réduit.\n\n" +
      "Calcul : $(x - 7)(x + 7) = x \\times x + x \\times 7 + (-7) \\times x + (-7) \\times 7 = x^2 + 7x - 7x - 49 = x^2 - 49$.\n\n" +
      "Conclusion : le résultat est $x^2 - 49$.",
    tags: ["litteral_identite_remarquable", "developper", "difference_carres", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_identite_developper_tpl_qcm_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_developper",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris le carré comme un produit de deux parenthèses identiques, fais les quatre produits, puis réduis.",
    tags: ["litteral_identite_remarquable", "developper", "qcm", "template"],
    generate: () => genDevQcm(["somme", "difference"], { coef: true, inverse: true, situations: true }),
  },
  {
    kind: "template",
    id: "litteral_identite_developper_tpl_carres_qcm_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_developper",
    difficulty: 3,
    theme: "neutral",
    hint: "Fais les quatre produits : les deux termes en x sont opposés et s’annulent.",
    tags: ["litteral_identite_remarquable", "developper", "difference_carres", "qcm", "template"],
    generate: () => genDevQcm(["produit"], { coef: true, inverse: true, situations: true }),
  },

  // ---------- IR_CHOISIR ----------
  {
    kind: "fixed",
    id: "litteral_identite_choisir_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_choisir",
    difficulty: 3,
    theme: "neutral",
    // ⛔ 03/10/2026 : réécrit SANS formule (décision de Frédéric) ; l’ancienne
    // version (« Quelle formule s’applique… a² + 2ab + b² ») est gardée pour la 3e.
    text: "Pour développer $(x + 3)^2$, quel produit faut-il d’abord écrire ?",
    format: "qcm",
    choices: [
      "$(x + 3)(x + 3)$",
      "$(x + 3) \\times 2$",
      "$x^2 \\times 3^2$",
      "$(x + 3) + (x + 3)$",
    ],
    expected: ["$(x + 3)(x + 3)$"],
    comparator: "mcq_exact",
    hint: "Un carré, c’est une expression multipliée par elle-même.",
    explanation:
      "Méthode : un carré, c’est une expression multipliée par elle-même, comme $5^2 = 5 \\times 5$.\n\n" +
      "Calcul : $(x + 3)^2 = (x + 3)(x + 3) = x \\times x + x \\times 3 + 3 \\times x + 3 \\times 3 = x^2 + 6x + 9$.\n\n" +
      "Conclusion : on écrit d’abord $(x + 3)(x + 3)$, puis on fait les quatre produits.",
    tags: ["litteral_identite_remarquable", "choisir", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_identite_choisir_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_choisir",
    difficulty: 3,
    theme: "neutral",
    // ⛔ 03/10/2026 : réécrit SANS formule (décision de Frédéric) ; l’ancienne
    // version (« Quelle formule s’applique… a² − 2ab + b² ») est gardée pour la 3e.
    text: "Pourquoi $(x - 4)^2$ n’est-il pas égal à $x^2 - 16$ ?",
    format: "qcm",
    choices: [
      "car $(x - 4)(x - 4)$ donne quatre produits, dont deux termes en $x$ : on trouve $x^2 - 8x + 16$",
      "car un carré change tous les signes : on trouve $x^2 + 16$",
      "car un carré, c’est le double : on trouve $2x - 8$",
      "en fait, $(x - 4)^2$ est bien égal à $x^2 - 16$",
    ],
    expected: ["car $(x - 4)(x - 4)$ donne quatre produits, dont deux termes en $x$ : on trouve $x^2 - 8x + 16$"],
    comparator: "mcq_exact",
    hint: "Écris $(x - 4)^2$ comme un produit de deux parenthèses et fais les quatre produits.",
    explanation:
      "Méthode : un carré, c’est une expression multipliée par elle-même ; on fait les quatre produits.\n\n" +
      "Calcul : $(x - 4)^2 = (x - 4)(x - 4) = x \\times x + x \\times (-4) + (-4) \\times x + (-4) \\times (-4) = x^2 - 4x - 4x + 16 = x^2 - 8x + 16$.\n\n" +
      "Conclusion : $x^2 - 16$ oublie les deux produits croisés $-4x$ et $-4x$, et se trompe de signe sur $16$.",
    tags: ["litteral_identite_remarquable", "choisir", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_identite_choisir_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_choisir",
    difficulty: 3,
    theme: "neutral",
    text: "Pour développer $(x + 2)(x + 5)$, quelle méthode utiliser ?",
    format: "qcm",
    choices: [
      "la double distributivité classique",
      "le carré d’une somme",
      "le produit d’une somme par une différence",
      "le carré d’une différence",
    ],
    expected: ["la double distributivité classique"],
    comparator: "mcq_exact",
    hint: "Les deux parenthèses ne sont ni identiques ni de la forme somme-différence.",
    // ⛔ 08/10/2026 : plus de « identité remarquable » ni de « différence de deux carrés » (décision de Frédéric).
    explanation:
      "Définition : un carré a deux parenthèses identiques ; le produit d’une somme par une différence a les mêmes termes, avec « + » dans l’une et « − » dans l’autre.\n\n" +
      "Méthode : ici les parenthèses sont différentes et n’ont pas les mêmes termes, comme $(x - 2)(x + 2)$ les aurait.\n\n" +
      "Calcul : on développe par double distributivité classique.\n\n" +
      "Conclusion : on utilise la double distributivité classique.",
    tags: ["litteral_identite_remarquable", "choisir", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_identite_choisir_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_choisir",
    difficulty: 3,
    theme: "neutral",
    // ⛔ 03/10/2026 : réécrit SANS formule (décision de Frédéric) ; l’ancienne
    // version (« Quelle formule s’applique… a² − b² ») est gardée pour la 3e.
    text: "Pour développer $(x - 5)(x + 5)$, faut-il faire quatre produits ou deux ?",
    format: "qcm",
    choices: [
      "quatre produits : $x \\times x$, $x \\times 5$, $(-5) \\times x$, $(-5) \\times 5$ ; puis les deux termes en $x$ s’annulent",
      "deux produits seulement : $x \\times x$ et $5 \\times 5$",
      "deux produits seulement : $x \\times 5$ et $(-5) \\times x$",
      "un seul produit : $x \\times x$",
    ],
    expected: ["quatre produits : $x \\times x$, $x \\times 5$, $(-5) \\times x$, $(-5) \\times 5$ ; puis les deux termes en $x$ s’annulent"],
    comparator: "mcq_exact",
    hint: "Chaque terme de la première parenthèse multiplie chaque terme de la seconde.",
    explanation:
      "Méthode : deux parenthèses de deux termes donnent toujours quatre produits (double distributivité).\n\n" +
      "Calcul : $(x - 5)(x + 5) = x \\times x + x \\times 5 + (-5) \\times x + (-5) \\times 5 = x^2 + 5x - 5x - 25 = x^2 - 25$.\n\n" +
      "Conclusion : on fait quatre produits ; les termes $5x$ et $-5x$ s’annulent, il reste $x^2 - 25$.",
    tags: ["litteral_identite_remarquable", "choisir", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_identite_choisir_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_choisir",
    difficulty: 4,
    theme: "neutral",
    hint: "Refais les quatre produits, réduis, puis compare avec chaque proposition.",
    tags: ["litteral_identite_remarquable", "choisir", "template"],
    // ⛔ 03/10/2026 : réécrit SANS formule (décision de Frédéric). L’ancien
    // « Quelle formule faut-il appliquer… » est gardé pour la 3e.
    generate: () => genQuelDevJuste(),
  },
  {
    kind: "template",
    id: "litteral_identite_choisir_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_choisir",
    difficulty: 4,
    theme: "neutral",
    hint: "Un carré ou un produit de deux parenthèses ? Dans les deux cas, on finit par les quatre produits.",
    tags: ["litteral_identite_remarquable", "choisir", "template"],
    generate: () => genQuelleDemarche(),
  },
  {
    kind: "template",
    id: "litteral_identite_choisir_tpl_calcul_malin_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_choisir",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche une écriture ÉGALE au nombre, avec une dizaine ronde : elle se développe de tête.",
    tags: ["litteral_identite_remarquable", "choisir", "calcul_malin", "template"],
    generate: () => genMalinQcm(),
  },
  {
    kind: "fixed",
    id: "litteral_identite_choisir_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_choisir",
    difficulty: 3,
    theme: "neutral",
    // ⛔ 03/10/2026 : réécrit SANS formule ni « différence de deux carrés »
    // (décision de Frédéric) ; l’ancienne version est gardée pour la 3e.
    // ⛔ 08/10/2026 : question ouverte à mots-clés → réponse jugée par le comparateur.
    text: "Développe et réduis $(x + 5)^2$ en l’écrivant comme un produit de deux parenthèses (attention : on ne trouve pas $x^2 + 25$).",
    format: "short",
    expected: ["x² + 10x + 25"],
    comparator: "expression_developpee",
    hint: "Écris $(x + 5)^2$ comme un produit de deux parenthèses, puis compte les produits.",
    explanation:
      "Méthode : un carré, c’est une expression multipliée par elle-même ; on l’écrit comme un produit de deux parenthèses, puis on fait les quatre produits.\n\n" +
      "Calcul : $(x + 5)^2 = (x + 5)(x + 5) = x \\times x + x \\times 5 + 5 \\times x + 5 \\times 5 = x^2 + 5x + 5x + 25 = x^2 + 10x + 25$.\n\n" +
      "Conclusion : $x^2 + 25$ ne garde que deux des quatre produits ; il manque $5x + 5x = 10x$.",
    tags: ["litteral_identite_remarquable", "choisir", "open"],
  },

  // ---------- IR_DEFIS ----------
  // ⛔ 03/10/2026 : `litteral_identite_defi_fixed_3` (factoriser x² − 9) est
  // sorti de la 4e, décision de Frédéric — la factorisation par une identité est
  // de la 3e. Source gardée hors du dépôt pour la banque de 3e.
  {
    kind: "fixed",
    id: "litteral_identite_defi_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Calculer $101^2$ de tête, en écrivant $101 = 100 + 1$ et en développant $(100 + 1)(100 + 1)$.",
    format: "qcm",
    choices: ["10201", "10001", "11000", "10101"],
    expected: ["10201"],
    comparator: "mcq_exact",
    hint: "Fais les quatre produits : $100 \\times 100$, $100 \\times 1$, $1 \\times 100$, $1 \\times 1$.",
    explanation:
      "Méthode : $101^2 = (100 + 1)(100 + 1)$ ; on fait les quatre produits, faciles de tête.\n\n" +
      "Calcul : $100 \\times 100 + 100 \\times 1 + 1 \\times 100 + 1 \\times 1 = 10\\,000 + 100 + 100 + 1 = 10\\,201$.\n\n" +
      "Conclusion : $101^2 = 10\\,201$.",
    tags: ["litteral_identite_remarquable", "defi", "calcul_malin", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_identite_defi_tpl_erreur_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Refais le développement par les quatre produits, puis compare terme à terme.",
    tags: ["litteral_identite_remarquable", "defi", "erreur", "template"],
    generate: () => genOuiNon(),
  },
  {
    kind: "template",
    id: "litteral_identite_defi_tpl_developper_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Développe chaque carré en l’écrivant comme un produit de deux parenthèses, puis réduis l’ensemble.",
    tags: ["litteral_identite_remarquable", "defi", "developper", "template"],
    generate: () => genDefiDev(),
  },
  {
    kind: "fixed",
    id: "litteral_identite_defi_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_identite_remarquable",
    microId: "litteral_identite_defi",
    difficulty: 5,
    theme: "neutral",
    // ⛔ 08/10/2026 : question ouverte à mots-clés (« double produit », « 2ab », « manque »…) :
    // le vocabulaire de la formule, que la 4e n’emploie pas → QCM avec des nombres.
    text: "Pourquoi $(x + 3)^2$ n’est-il pas égal à $x^2 + 9$ ?",
    format: "qcm",
    choices: [
      "$(x + 3)(x + 3)$ fait quatre produits : $x^2 + 3x + 3x + 9$ ; $x^2 + 9$ oublie $3x + 3x$",
      "parce que $3^2 = 6$",
      "parce qu’il faut multiplier par 2 : $(x + 3)^2 = 2x + 6$",
      "il est égal : on élève chaque terme au carré",
    ],
    expected: ["$(x + 3)(x + 3)$ fait quatre produits : $x^2 + 3x + 3x + 9$ ; $x^2 + 9$ oublie $3x + 3x$"],
    comparator: "mcq_exact",
    hint: "Écris $(x + 3)^2 = (x + 3)(x + 3)$ et compte les produits.",
    explanation:
      "Méthode : un carré, c’est une expression multipliée par elle-même : on écrit $(x + 3)(x + 3)$ et on fait les quatre produits.\n\n" +
      "Calcul : $(x + 3)(x + 3) = x \\times x + x \\times 3 + 3 \\times x + 3 \\times 3 = x^2 + 3x + 3x + 9 = x^2 + 6x + 9$.\n\n" +
      "Conclusion : $x^2 + 9$ ne garde que deux des quatre produits ; il manque $3x + 3x = 6x$, donc $(x + 3)^2 \\neq x^2 + 9$.",
    tags: ["litteral_identite_remarquable", "defi", "open"],
  },
];
