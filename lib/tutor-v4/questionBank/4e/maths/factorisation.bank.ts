// lib/tutor-v4/question-banks/maths/4e/factorisation.bank.ts

/**
 * =========================================================
 * FACTORISATION.BANK.TS
 * =========================================================
 *
 * Banque de questions Tutor V4 - Mathématiques 4e
 * Notion : Factorisation
 *
 * Idée centrale :
 * - factoriser, c’est transformer une somme ou une différence en produit ;
 * - la factorisation est le chemin inverse du développement ;
 * - en 4e, on factorise par un FACTEUR COMMUN : un nombre, une lettre, ou
 *   les deux (2x² + 6x = 2x(x + 3)).
 * ⛔ Décision de Frédéric (30/09/2026) : PAS de factorisation par identité
 *   remarquable en 4e (x² + 6x + 9 = (x + 3)², x² − 9 = (x − 3)(x + 3) :
 *   c’est la 3e). La micro `litteral_factoriser_identite` a été retirée.
 *
 * Progression :
 * 1. facteur_commun       → repérer ce qui est commun dans chaque terme
 * 2. factoriser_simple    → écrire sous forme de produit
 * 3. factoriser_verifier  → vérifier en développant
 * 4. factorisation_defis  → nombre ET lettre en facteur, erreurs, situations
 *
 * ⭐ 30/09/2026 :
 * - `expression_factorisee` (équivalente ET un produit) remplace
 *   `contains_keyword`, qui acceptait « 3(x + 4)7 » pour 3(x + 4).
 * - Des SQUELETTES variés (scripts/mesurer-squelettes-coach.ts) : lettre,
 *   ordre et signe des termes, consigne, prénom, situation changent à chaque
 *   tirage.
 */

import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pgcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

/* =========================================================
   ÉCRIRE UNE EXPRESSION PROPREMENT
   ========================================================= */

const LETTRES = ["x", "a", "t", "n", "y", "b"] as const;
const LETTRES_SITUATION = ["x", "n", "a", "y"] as const;
const PAIRES: ReadonlyArray<readonly [string, string]> = [
  ["x", "y"],
  ["a", "b"],
  ["t", "n"],
  ["x", "a"],
  ["n", "y"],
  ["a", "t"],
];

/** Un terme : [coefficient, partie littérale ?] — la partie littérale est un texte : « x », « x² », « xy ». */
type Terme = [number, string?];

function mono(c: number, l = ""): string {
  if (!l) return String(c);
  if (c === 1) return l;
  if (c === -1) return `-${l}`;
  return `${c}${l}`;
}

function somme(termes: Terme[]): string {
  const t = termes.filter(([c]) => c !== 0);
  if (!t.length) return "0";
  return t
    .map(([c, l], i) => {
      const m = mono(Math.abs(c), l ?? "");
      if (i === 0) return c < 0 ? `-${m}` : m;
      return c < 0 ? ` - ${m}` : ` + ${m}`;
    })
    .join("");
}

const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const ELEVES: ReadonlyArray<readonly [string, "il" | "elle"]> = [
  ["Léo", "il"],
  ["Inès", "elle"],
  ["Malik", "il"],
  ["Chloé", "elle"],
  ["Yanis", "il"],
  ["Emma", "elle"],
  ["Hugo", "il"],
  ["Lina", "elle"],
  ["Noah", "il"],
  ["Jade", "elle"],
  ["Sacha", "il"],
  ["Maëlys", "elle"],
];

const DEF = "Définition : factoriser, c’est transformer une somme ou une différence en produit en faisant apparaître un facteur commun.";

const FACTO: Array<(e: string) => string> = [
  (e) => `Factorise : ${e}`,
  (e) => `Factorise l’expression ${e}.`,
  (e) => `Écris ${e} sous la forme d’un produit.`,
  (e) => `Mets le facteur commun en évidence dans ${e}.`,
  (e) => `Transforme ${e} en un produit.`,
  (e) => `Factorise D = ${e}.`,
];

const FACTO_MAX: Array<(e: string) => string> = [
  (e) => `Factorise le plus possible : ${e}`,
  (e) => `Factorise au maximum l’expression ${e}.`,
  (e) => `Mets en facteur le plus grand facteur commun de ${e}.`,
  (e) => `Écris ${e} comme un produit, avec le plus grand facteur commun devant la parenthèse.`,
];

/**
 * Une expression « facteur × (u ± v) » écrite développée : le facteur F
 * (nombre, lettre, ou les deux), les deux termes de la parenthèse.
 * Renvoie l’expression développée, la forme factorisée et la décomposition.
 */
function construire(F: Terme, t: Terme[]) {
  const [fc, fl] = F;
  const lettres = (a?: string, b?: string) => {
    // x × x = x² ; x × y = xy ; sinon concaténation
    if (!a) return b ?? "";
    if (!b) return a;
    return a === b ? `${a}²` : `${a}${b}`;
  };
  const dev: Terme[] = t.map(([c, l]) => [fc * c, lettres(fl, l)]);
  const e = somme(dev);
  const facteur = mono(fc, fl ?? "");
  const res = `${facteur}(${somme(t)})`;
  const decomp = dev
    .map(([c, l], i) => `${mono(Math.abs(c), l ?? "")} = ${facteur} × ${mono(Math.abs(t[i][0]), t[i][1] ?? "")}`)
    .join(" et ");
  return { e, res, decomp, facteur };
}

function questionFacto(texte: string, c: { e: string; res: string; decomp: string; facteur: string }): TutorGeneratedQuestionV4 {
  return {
    text: texte,
    format: "short",
    expected: [c.res],
    comparator: "expression_factorisee",
    explanation:
      `${DEF}\n\n` +
      `Méthode : on repère le facteur commun ${c.facteur} : ${c.decomp}.\n\n` +
      `Calcul : ${c.e} = ${c.res}.\n\n` +
      `Conclusion : on vérifie en développant : ${c.res} = ${c.e}.`,
  };
}

/** k·m·x ± k·b avec pgcd(m, b) = 1 : le plus grand facteur commun numérique est k. */
function tirageNombre(o: { k?: number; mMax?: number; signe?: 1 | -1; l?: string } = {}) {
  const k = o.k ?? randomInt(2, 9);
  let m = randomInt(1, o.mMax ?? 1);
  let b = randomInt(2, 9);
  while (pgcd(m, b) !== 1) {
    m = randomInt(1, o.mMax ?? 1);
    b = randomInt(2, 9);
  }
  const l = o.l ?? randomChoice(LETTRES);
  const s = o.signe ?? randomChoice([1, -1] as const);
  const t: Terme[] = Math.random() < 0.3 ? [[b], [s * m, l]] : [[m, l], [s * b]];
  return { k, m, b, l, s, t, ...construire([k], t) };
}

/** Le facteur commun est une lettre (et éventuellement un nombre) : x² + 3x, 2x² - 6x, xy + 4x. */
function tirageLettre(o: { k?: number; mMax?: number; deuxLettres?: boolean } = {}) {
  const k = o.k ?? 1;
  const [L, M] = randomChoice(PAIRES);
  let m = randomInt(1, o.mMax ?? 1);
  let b = randomInt(1, 9);
  while (pgcd(m, b) !== 1) {
    m = randomInt(1, o.mMax ?? 1);
    b = randomInt(1, 9);
  }
  if (k === 1 && b === 1) b = randomInt(2, 9);
  const s = randomChoice([1, -1] as const);
  const autre = o.deuxLettres ? M : L;
  const t: Terme[] = Math.random() < 0.3 ? [[b], [s * m, autre]] : [[m, autre], [s * b]];
  return { k, m, b, L, M: autre, s, t, ...construire([k, L], t) };
}

type SituFacto = (k: number, l: string, b: number) => readonly [string, string];

const SITU_A: SituFacto[] = [
  (k, l, b) => [`Pour une randonnée, ${k} groupes emportent chacun ${l} bouteilles d’eau et ${b} fruits.`, "le nombre total d’objets"],
  (k, l, b) => [`Au marché de Saint-Paul, ${k} paniers contiennent chacun ${l} mangues et ${b} letchis.`, "le nombre total de fruits"],
  (k, l, b) => [`Un fleuriste compose ${k} bouquets de ${l} roses et ${b} tulipes.`, "le nombre total de fleurs"],
  (k, l, b) => [`Un boulanger prépare ${k} plaques de ${l} croissants et ${b} pains au chocolat.`, "le nombre total de viennoiseries"],
  (k, l, b) => [`Une classe forme ${k} équipes ; chaque équipe compte ${l} filles et ${b} garçons.`, "le nombre total d’élèves"],
  (k, l, b) => [`Un groupe enregistre ${k} chansons ; chacune comporte ${l} minutes de couplets et ${b} minutes de refrains.`, "la durée totale de l’enregistrement"],
];

const SITU_B: SituFacto[] = [
  (k, l, b) => [`Dans un atelier, ${k} équipes reçoivent chacune ${l} outils et ${b} casques.`, "le nombre total d’objets"],
  (k, l, b) => [`Un chimiste prépare ${k} flacons contenant chacun ${l} mL d’eau et ${b} mL de sirop.`, "le volume total de liquide"],
  (k, l, b) => [`Une coureuse s’entraîne ${k} jours ; chaque jour, elle court ${l} kilomètres puis marche ${b} kilomètres.`, "la distance totale"],
  (k, l, b) => [`Un club de football achète ${k} tenues, chacune avec un maillot à ${l} € et un short à ${b} €.`, "le prix total"],
  (k, l, b) => [`Une famille en vacances loue des vélos pendant ${k} jours ; chaque jour, elle paie ${l} € de location et ${b} € de parking.`, "la dépense totale"],
  (k, l, b) => [`Un jardinier prépare ${k} jardinières de ${l} plants de fraisiers et ${b} plants de menthe.`, "le nombre total de plants"],
  (k, l, b) => [`Un cinéma vend ${k} formules « famille » : chacune comprend ${l} places enfant et ${b} places adulte.`, "le nombre total de places"],
];

function genSituationFacto(table: SituFacto[]): TutorGeneratedQuestionV4 {
  const k = randomInt(2, 7);
  const b = randomInt(2, 9);
  const l = randomChoice(LETTRES_SITUATION);
  const [t, q] = randomChoice(table)(k, l, b);
  const c = construire([k], [[1, l], [b]]);
  const texte = randomChoice([
    `${t} On trouve que ${q} vaut ${c.e}. Écris cette expression sous forme factorisée.`,
    `${t} Exprime ${q} en fonction de ${l}, sous forme factorisée.`,
    `${t} Sans développer, écris ${q} comme un produit.`,
    `${t} ${maj(q)} s’écrit ${c.e}. Factorise cette somme.`,
  ]);
  return {
    text: texte,
    format: "short",
    expected: [c.res],
    comparator: "expression_factorisee",
    explanation:
      `${DEF}\n\n` +
      `Méthode : il y a ${k} fois la même quantité ${l} + ${b} ; le facteur commun est ${k} : ${c.decomp}.\n\n` +
      `Calcul : ${c.e} = ${c.res}.\n\n` +
      `Conclusion : ${q} vaut ${c.res}.`,
  };
}

/* =========================================================
   FACTEUR NÉGATIF (5 étoiles) — décision de Frédéric du 05/10/2026
   −5x − 15 = −5(x + 3), −4x + 12 = −4(x − 3), −6x² − 9x = −3x(2x + 3).

   ⛔ Correction : `expression_factorisee` accepte TOUT produit équivalent,
   donc aussi 5(−x − 3) quand on demande −5 en facteur. On corrige ici en
   `exact_text` avec la liste des écritures du SEUL produit demandé : ordre
   des termes dans la parenthèse, « - », « − » ou « – », « × », « * » ou rien,
   facteur devant ou derrière, x² ou x^2 ; les espaces sont ignorés par le
   comparateur. Le premier élément de `expected` est l’écriture affichée.
   ========================================================= */

/** Vrai signe moins pour l’affichage d’une expression (pas dans les mots : « A-t-il »). */
const M = (s: string) => s.replace(/-/g, "−");
/** Un facteur négatif dans un calcul s’écrit entre parenthèses : (−5). */
const par = (s: string) => (s.startsWith("-") ? `(${s})` : s);

function permutations<T>(a: T[]): T[][] {
  if (a.length <= 1) return [a];
  return a.flatMap((x, i) => permutations([...a.slice(0, i), ...a.slice(i + 1)]).map((p) => [x, ...p]));
}

/** Multiplie deux parties littérales : x × x = x², x × rien = x. */
function fois(a?: string, b?: string): string {
  if (!a) return b ?? "";
  if (!b) return a;
  return a === b ? `${a}²` : `${a}${b}`;
}

/** Toutes les écritures acceptées du produit F × (t), F imposé. */
function ecrituresProduit(F: Terme, t: Terme[]): string[] {
  const f = mono(F[0], F[1] ?? "");
  const fp = `(${f})`;
  const facteurs = [f, fp];
  if (F[0] === -1 && !F[1]) facteurs.push("-");
  const base = new Set<string>();
  for (const p of permutations(t)) {
    const P = `(${somme(p).replace(/\s/g, "")})`;
    for (const g of facteurs) {
      base.add(`${g}${P}`);
      if (g !== "-") {
        base.add(`${g}×${P}`);
        base.add(`${g}*${P}`);
      }
    }
    for (const op of ["", "×", "*"]) base.add(`${P}${op}${fp}`);
  }
  const out = new Set<string>();
  for (const s of base)
    for (const moins of ["-", "−", "–"])
      for (const carre of ["²", "^2"]) out.add(s.replace(/-/g, moins).replace(/²/g, carre));
  return [...out];
}

type FactoNeg = {
  F: Terme;
  t: Terme[];
  /** l’expression développée, termes dans l’ordre affiché, vrai signe moins */
  e: string;
  /** le facteur, vrai signe moins */
  f: string;
  /** la forme factorisée attendue, vrai signe moins */
  res: string;
  /** les termes développés, dans l’ordre affiché */
  dev: Terme[];
};

/** Construit F × (t) ; l’expression développée est affichée dans un ordre éventuellement mélangé. */
function factoNeg(F: Terme, t: Terme[], melanger = Math.random() < 0.35): FactoNeg {
  const dev0: Terme[] = t.map(([c, l]) => [F[0] * c, fois(F[1], l)]);
  let dev = dev0;
  if (melanger) {
    const autre = shuffle(dev0);
    if (somme(autre) !== somme(dev0)) dev = autre;
    else dev = [...dev0].reverse();
  }
  const f = mono(F[0], F[1] ?? "");
  return { F, t, e: M(somme(dev)), f: M(f), res: M(`${f}(${somme(t)})`), dev };
}

/** « (−15) ÷ (−5) = 3 ; (−5x) ÷ (−5) = x » : chaque terme divisé par le facteur. */
function divisions(c: FactoNeg): string {
  const f = mono(c.F[0], c.F[1] ?? "");
  return c.t
    .map(([co, l]) => {
      const d = mono(c.F[0] * co, fois(c.F[1], l));
      return M(`${par(d)} ÷ ${par(f)} = ${mono(co, l ?? "")}`);
    })
    .join(" ; ");
}

/** « −5 × x + (−5) × 3 = −5x − 15 » : le contrôle en redéveloppant. */
function controle(c: FactoNeg): string {
  const f = mono(c.F[0], c.F[1] ?? "");
  const produits = c.t.map(([co, l], i) => `${i === 0 ? f : par(f)} × ${par(mono(co, l ?? ""))}`).join(" + ");
  return M(`${f}(${somme(c.t)}) = ${produits} = ${somme(c.t.map(([co, l]) => [c.F[0] * co, fois(c.F[1], l)] as Terme))}`);
}

/** Le piège nommé : le signe de la parenthèse oublié. */
function piegeSigne(c: FactoNeg): string {
  const faux: Terme[] = c.t.map(([co, l], i) => (i === 0 ? [co, l] : [-co, l]));
  const f = mono(c.F[0], c.F[1] ?? "");
  const redev = somme(faux.map(([co, l]) => [c.F[0] * co, fois(c.F[1], l)] as Terme));
  return M(
    `Piège : diviser par un facteur négatif change le signe de CHAQUE terme. Oublier un changement de signe, comme dans ${f}(${somme(faux)}), redonnerait ${redev}, pas ${somme(c.t.map(([co, l]) => [c.F[0] * co, fois(c.F[1], l)] as Terme))}.`,
  );
}

function questionNeg(texte: string, c: FactoNeg, methode: string): TutorGeneratedQuestionV4 {
  return {
    text: texte,
    format: "short",
    expected: [c.res, ...ecrituresProduit(c.F, c.t)],
    comparator: "exact_text",
    explanation:
      `${DEF}\n\n` +
      `Méthode : ${methode} On divise CHAQUE terme par ${c.f} : ${divisions(c)}.\n\n` +
      `Calcul : ${c.e} = ${c.res}.\n\n` +
      `Conclusion : on contrôle en redéveloppant : ${controle(c)}. On retrouve bien l’expression de départ.\n\n` +
      piegeSigne(c),
  };
}

/** Une parenthèse à deux termes (lettre et nombre) ou trois termes (l², l, nombre), lettre en tête et positive. */
function interieur(l: string, o: { premiers?: boolean; mMax?: number } = {}): Terme[] {
  for (;;) {
    if (Math.random() < 0.3) {
      const m = randomInt(1, 2);
      const p = randomChoice([1, -1]) * randomInt(1, 6);
      const b = randomChoice([1, -1]) * randomInt(1, 9);
      if (!o.premiers || pgcd(pgcd(m, p), b) === 1) return [[m, `${l}²`], [p, l], [b]];
    } else {
      const m = randomInt(1, o.mMax ?? 3);
      const b = randomChoice([1, -1]) * randomInt(1, 9);
      if (!o.premiers || pgcd(m, b) === 1) return [[m, l], [b]];
    }
  }
}

/** Petites situations où un facteur négatif a un sens : chaque fois, on PERD k. */
type SituNeg = (k: number, l: string, b: number) => readonly [string, string];
const SITU_NEG: SituNeg[] = [
  (k, l, b) => [`Dans un jeu, chaque erreur coûte ${k} points. Un joueur fait ${l} erreurs au premier niveau et ${b} au second.`, "la variation de son score"],
  (k, l, b) => [`Pendant la nuit, la température baisse de ${k} °C par heure. On l’observe pendant ${l} heures, puis encore ${b} heures.`, "la variation de température (en °C)"],
  (k, l, b) => [`Un plongeur descend de ${k} m par minute, pendant ${l} minutes, puis encore ${b} minutes.`, "son altitude par rapport à la surface (en m)"],
  (k, l, b) => [`Un abonnement retire ${k} € par mois d’un compte, pendant ${l} mois, puis ${b} mois de plus.`, "la variation du solde du compte (en €)"],
  (k, l, b) => [`Une citerne perd ${k} L d’eau par heure ; la fuite dure ${l} heures, puis encore ${b} heures.`, "la variation du volume d’eau (en L)"],
  (k, l, b) => [`La batterie d’un téléphone perd ${k} % par heure de vidéo ; on regarde ${l} heures de vidéo, puis encore ${b} heures.`, "la variation de la charge (en %)"],
  (k, l, b) => [`Un glacier recule de ${k} m par an, pendant ${l} années, puis ${b} années de plus.`, "la variation de la position de son front (en m)"],
  (k, l, b) => [`Une benne descend dans un puits de mine à ${k} m par seconde, pendant ${l} secondes, puis encore ${b} secondes.`, "son altitude par rapport à l’entrée du puits (en m)"],
  (k, l, b) => [`Un randonneur descend un sentier en perdant ${k} m d’altitude par minute, pendant ${l} minutes, puis ${b} minutes de plus.`, "sa variation d’altitude (en m)"],
];

/** Une situation courte : la variation vaut −k·l − k·b = −k(l + b). */
function situationNeg(): { c: FactoNeg; contexte: string; q: string } {
  const k = randomInt(2, 9);
  const b = randomInt(2, 9);
  const l = randomChoice(LETTRES_SITUATION);
  const [contexte, q] = randomChoice(SITU_NEG)(k, l, b);
  return { c: factoNeg([-k], [[1, l], [b]], false), contexte, q };
}

/** Le développement de G × (u), écrit avec le vrai signe moins. */
function devStr(G: Terme, u: Terme[]): string {
  return M(somme(u.map(([co, l]) => [G[0] * co, fois(G[1], l)] as Terme)));
}

const STEM_NEG_IMPOSE: Array<(e: string, f: string) => string> = [
  (e, f) => `Factorise ${e} en mettant ${f} en facteur.`,
  (e, f) => `Mets ${f} en facteur dans ${e}.`,
  (e, f) => `Écris ${e} sous la forme ${f} × (…).`,
  (e, f) => `On veut ${f} devant la parenthèse : factorise ${e}.`,
  (e, f) => `Factorise ${e}, en prenant ${f} comme facteur commun.`,
  (e, f) => `Factorise A = ${e} en mettant ${f} en facteur.`,
];

const STEM_NEG_MAX_NOMBRE: Array<(e: string) => string> = [
  (e) => `Factorise ${e} en mettant en facteur un nombre négatif, le plus grand possible en valeur absolue.`,
  (e) => `Mets en facteur dans ${e} le nombre négatif de plus grande valeur absolue possible.`,
  (e) => `Écris ${e} comme un produit dont le premier facteur est un nombre négatif, le plus grand possible en valeur absolue.`,
  (e) => `Factorise ${e} au maximum, avec un nombre négatif devant la parenthèse.`,
  (e) => `Factorise B = ${e} : mets en facteur un nombre négatif, de valeur absolue la plus grande possible.`,
];

const STEM_NEG_MAX_LETTRE: Array<(e: string) => string> = [
  (e) => `Factorise ${e} au maximum, avec un facteur commun négatif devant la parenthèse.`,
  (e) => `Mets en facteur dans ${e} tout ce qui est commun aux deux termes, précédé d’un signe −.`,
  (e) => `Factorise ${e} : le facteur commun doit être négatif et le plus grand possible (nombre et lettre).`,
  (e) => `Écris ${e} comme un produit, avec le plus grand facteur commun précédé d’un signe − devant la parenthèse.`,
];

/* =========================================================
   LA BANQUE
   ========================================================= */

export const factorisationBank: TutorBankItemV4[] = [
  // =========================
  // FACTEUR_COMMUN
  // =========================
  {
    kind: "fixed",
    id: "litteral_facteur_commun_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_facteur_commun",
    difficulty: 1,
    theme: "neutral",
    text: "Dans l’expression 3x + 12, quel est le facteur commun ?",
    format: "qcm",
    choices: ["3", "x", "12", "15"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Cherche un nombre qui divise les deux termes.",
    explanation:
      `${DEF}\n\n` +
      "Méthode : on cherche un facteur commun, puis on met ce facteur devant une parenthèse.\n\nCalcul : " +
      "3x = 3 × x et 12 = 3 × 4. Le facteur commun est donc 3." +
      "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
    tags: ["litteral_factorisation", "litteral_facteur_commun", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_facteur_commun_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_facteur_commun",
    difficulty: 1,
    theme: "neutral",
    text: "Dans l’expression 5x + 5y, quel est le facteur commun ?",
    format: "qcm",
    choices: ["5", "x", "y", "x + y"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Le même nombre multiplie x et y.",
    explanation:
      `${DEF}\n\n` +
      "Méthode : on cherche un facteur commun, puis on met ce facteur devant une parenthèse.\n\nCalcul : " +
      "5x = 5 × x et 5y = 5 × y. Le facteur commun est donc 5." +
      "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
    tags: ["litteral_factorisation", "litteral_facteur_commun"],
  },
  {
    kind: "template",
    id: "litteral_facteur_commun_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_facteur_commun",
    difficulty: 1,
    theme: "neutral",
    hint: "Cherche le nombre qui multiplie les deux termes.",
    tags: ["litteral_factorisation", "litteral_facteur_commun", "template"],
    generate: () => {
      // k premier : ses seuls diviseurs sont 1 et k, la réponse est unique.
      const c = tirageNombre({ k: randomChoice([2, 3, 5, 7]), mMax: 3 });
      const text = randomChoice([
        `Dans l’expression ${c.e}, quel est le facteur commun ?`,
        `Quel nombre, autre que 1, est un facteur commun aux deux termes de ${c.e} ?`,
        `On veut factoriser ${c.e}. Quel nombre peut-on mettre en facteur ?`,
        `Repère le facteur commun dans ${c.e}.`,
        `Par quel nombre, autre que 1, peut-on diviser chacun des termes de ${c.e} ?`,
        `${c.e} : quel est le facteur commun aux deux termes ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(c.k)],
        comparator: "number_equal",
        explanation:
          `${DEF}\n\n` +
          "Méthode : on écrit chaque terme comme un produit et on cherche ce qui revient.\n\n" +
          `Calcul : ${c.decomp}. Le facteur commun est ${c.k}.\n\n` +
          `Conclusion : ${c.e} = ${c.res}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "litteral_facteur_commun_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_facteur_commun",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi 4 est un facteur commun dans 4x + 20.",
    format: "open",
    expected: ["4", "multiplie", "x", "5"],
    comparator: "contains_keyword",
    hint: "Écris chaque terme sous forme d’un produit par 4.",
    explanation:
      `${DEF}\n\n` +
      "Méthode : on cherche un facteur commun, puis on met ce facteur devant une parenthèse.\n\nCalcul : " +
      "4x = 4 × x et 20 = 4 × 5. Donc 4 est un facteur commun." +
      "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
    tags: ["litteral_factorisation", "litteral_facteur_commun", "open"],
  },

  // =========================
  // FACTORISER_SIMPLE
  // =========================
  {
    kind: "fixed",
    id: "litteral_factoriser_simple_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Factoriser : 3x + 12",
    format: "qcm",
    choices: ["3(x + 4)", "3x(12)", "x(3 + 12)", "3(x + 12)"],
    expected: ["3(x + 4)"],
    comparator: "mcq_exact",
    hint: "Mets 3 en facteur.",
    explanation:
      `${DEF}\n\n` +
      "Méthode : on cherche un facteur commun, puis on met ce facteur devant une parenthèse.\n\nCalcul : " +
      "3x + 12 = 3 × x + 3 × 4 = 3(x + 4)." +
      "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
    tags: ["litteral_factorisation", "simple", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_factoriser_simple_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Factoriser : 5x - 20",
    format: "qcm",
    choices: ["5(x - 4)", "5(x + 4)", "x(5 - 20)", "5x(1 - 4)"],
    expected: ["5(x - 4)"],
    comparator: "mcq_exact",
    hint: "20 = 5 × 4.",
    explanation:
      `${DEF}\n\n` +
      "Méthode : on cherche un facteur commun, puis on met ce facteur devant une parenthèse.\n\nCalcul : " +
      "5x - 20 = 5 × x - 5 × 4 = 5(x - 4)." +
      "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
    tags: ["litteral_factorisation", "simple", "signe"],
  },
  {
    kind: "template",
    id: "litteral_factoriser_simple_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "Mets le facteur commun devant la parenthèse.",
    tags: ["litteral_factorisation", "simple", "template"],
    generate: () => {
      if (Math.random() < 0.3) return genSituationFacto(SITU_B);
      const c = tirageNombre({ signe: 1 });
      return questionFacto(randomChoice(FACTO)(c.e), c);
    },
  },
  {
    kind: "template",
    id: "litteral_factoriser_simple_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "Attention au signe dans la parenthèse.",
    tags: ["litteral_factorisation", "simple", "soustraction", "template"],
    generate: () => {
      const c = tirageNombre({ signe: -1, mMax: 2 });
      return questionFacto(randomChoice(FACTO)(c.e), c);
    },
  },
  {
    kind: "template",
    id: "litteral_factoriser_simple_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_simple",
    difficulty: 3,
    theme: "neutral",
    hint: "La lettre est présente dans les deux termes : c’est elle, le facteur commun.",
    tags: ["litteral_factorisation", "x_commun", "template"],
    generate: () => {
      const c = tirageLettre({ deuxLettres: Math.random() < 0.3 });
      if (Math.random() < 0.25) {
        const [obj, u] = randomChoice([
          ["un rectangle", "cm²"],
          ["un potager rectangulaire", "m²"],
          ["une affiche", "cm²"],
          ["un tapis", "dm²"],
          ["une terrasse", "m²"],
        ] as const);
        if (c.s === 1) {
          const texte = randomChoice([
            `L’aire d’${obj} vaut ${c.e} (en ${u}). Écris cette aire comme un produit de deux longueurs, en factorisant.`,
            `${maj(obj)} a une aire de ${c.e} (en ${u}) ; l’un de ses côtés mesure ${c.L}. Factorise cette aire pour l’écrire sous la forme ${c.L} × (…).`,
          ]);
          return questionFacto(texte, c);
        }
      }
      return questionFacto(randomChoice(FACTO)(c.e), c);
    },
  },
  {
    kind: "fixed",
    id: "litteral_factoriser_simple_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_simple",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 6x + 18 = 6(x + 3).",
    format: "open",
    expected: ["6", "facteur commun", "x", "3"],
    comparator: "contains_keyword",
    hint: "Écris 6x et 18 comme des produits par 6.",
    explanation:
      `${DEF}\n\n` +
      "Méthode : on cherche un facteur commun, puis on met ce facteur devant une parenthèse.\n\nCalcul : " +
      "6x = 6 × x et 18 = 6 × 3. Donc 6x + 18 = 6(x + 3)." +
      "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
    tags: ["litteral_factorisation", "simple", "open"],
  },

  // =========================
  // FACTORISER_VERIFIER
  // =========================
  {
    kind: "fixed",
    id: "litteral_factoriser_verifier_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_verifier",
    difficulty: 3,
    theme: "neutral",
    text: "La factorisation 4x + 12 = 4(x + 3) est-elle correcte ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Développe 4(x + 3).",
    explanation:
      `${DEF}\n\n` +
      "Méthode : on vérifie en développant la forme factorisée.\n\nCalcul : " +
      "4(x + 3) = 4x + 12. La factorisation est correcte." +
      "\n\nConclusion : la forme finale est un produit équivalent à l’expression de départ.",
    tags: ["litteral_factorisation", "verifier"],
  },
  {
    kind: "fixed",
    id: "litteral_factoriser_verifier_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_verifier",
    difficulty: 3,
    theme: "neutral",
    text: "La factorisation 3x + 15 = 3(x + 15) est-elle correcte ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Développe 3(x + 15).",
    explanation:
      `${DEF}\n\n` +
      "Méthode : on vérifie en développant la forme factorisée.\n\nCalcul : " +
      "3(x + 15) = 3x + 45, pas 3x + 15. La bonne factorisation est 3(x + 5)." +
      "\n\nConclusion : la forme finale doit être un produit équivalent à l’expression de départ.",
    tags: ["litteral_factorisation", "verifier", "erreur"],
  },
  {
    kind: "template",
    id: "litteral_factoriser_verifier_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Développe la forme factorisée pour comparer.",
    tags: ["litteral_factorisation", "verifier", "template"],
    generate: () => {
      const k = randomInt(2, 9);
      const b = randomInt(2, 9);
      const l = randomChoice(LETTRES);
      const s = randomChoice([1, -1] as const);
      const sg = s === 1 ? "+" : "-";
      const e = `${k}${l} ${sg} ${k * b}`;
      const juste = `${k}(${l} ${sg} ${b})`;
      const erreurs: Array<[string, string]> = [
        [`${k}(${l} ${sg} ${k * b})`, `${k}(${l} ${sg} ${k * b}) = ${k}${l} ${sg} ${k * k * b}`],
        [`${k}(${l} ${s === 1 ? "-" : "+"} ${b})`, `${k}(${l} ${s === 1 ? "-" : "+"} ${b}) = ${k}${l} ${s === 1 ? "-" : "+"} ${k * b}`],
        [`${k}${l}(1 ${sg} ${b})`, `${k}${l}(1 ${sg} ${b}) = ${k}${l} ${sg} ${k * b}${l}`],
      ];
      const correct = Math.random() < 0.45;
      const [prop, dev] = correct ? [juste, `${juste} = ${e}`] : randomChoice(erreurs);
      const [nom, pr] = randomChoice(ELEVES);
      const vf = Math.random() < 0.25;
      const text = vf
        ? `Vrai ou faux : ${e} = ${prop} ?`
        : randomChoice([
            `La factorisation ${e} = ${prop} est-elle correcte ?`,
            `${nom} factorise ${e} et obtient ${prop}. A-t-${pr} raison ?`,
            `Pour factoriser ${e}, ${nom} écrit ${prop}. Est-ce juste ?`,
            `On propose : ${e} = ${prop}. Cette factorisation est-elle exacte ?`,
          ]);
      const choices = vf ? ["vrai", "faux"] : ["oui", "non"];
      return {
        text,
        format: "qcm",
        choices,
        expected: [correct ? choices[0] : choices[1]],
        comparator: "mcq_exact",
        explanation:
          `${DEF}\n\n` +
          "Méthode : on développe le produit proposé et on compare avec l’expression de départ.\n\n" +
          `Calcul : ${dev}.\n\n` +
          `Conclusion : ${correct ? "on retrouve bien l’expression de départ, la factorisation est correcte." : `on ne retrouve pas ${e} : c’est faux. La bonne factorisation est ${juste}.`}`,
      };
    },
  },

  // =========================
  // FACTORISATION_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "litteral_litteral_factorisation_defi_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factorisation_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit : 5x + 20 = 5(x + 20). A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Développe 5(x + 20).",
    explanation:
      `${DEF}\n\n` +
      "Méthode : on vérifie en développant la proposition.\n\nCalcul : " +
      "Non. 5(x + 20) = 5x + 100. La bonne factorisation est 5(x + 4)." +
      "\n\nConclusion : la forme finale doit être un produit équivalent à l’expression de départ.",
    tags: ["litteral_factorisation", "defi", "erreur"],
  },
  {
    kind: "template",
    id: "litteral_litteral_factorisation_defi_open_erreur_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factorisation_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Développe la proposition de l’élève et compare.",
    tags: ["litteral_factorisation", "defi", "open", "erreur", "template"],
    generate: () => {
      const k = randomInt(2, 9);
      const b = randomInt(2, 9);
      const l = randomChoice(LETTRES);
      const [nom, pr] = randomChoice(ELEVES);
      const cas = randomInt(0, 2);
      let e: string;
      let faux: string;
      let juste: string;
      let pourquoi: string;
      if (cas === 0) {
        e = `${k}${l} + ${k * b}`;
        faux = `${k}(${l} + ${k * b})`;
        juste = `${k}(${l} + ${b})`;
        pourquoi = `${k * b} est resté dans la parenthèse ; or ${k * b} = ${k} × ${b}, il fallait écrire ${b}. En développant ${faux}, on trouve ${k}${l} + ${k * k * b}`;
      } else if (cas === 1) {
        e = `${k}${l} + ${k}`;
        faux = `${k}(${l})`;
        juste = `${k}(${l} + 1)`;
        pourquoi = `${k} = ${k} × 1 : il reste 1 dans la parenthèse. En développant ${faux}, on ne retrouve que ${k}${l}`;
      } else {
        e = `${l}² + ${b}${l}`;
        faux = `${l}(${l} + ${b}${l})`;
        juste = `${l}(${l} + ${b})`;
        pourquoi = `le ${l} mis en facteur ne doit plus apparaître dans le second terme. En développant ${faux}, on trouve ${l}² + ${b}${l}²`;
      }
      const text = randomChoice([
        `Un élève écrit : ${e} = ${faux}. Explique son erreur.`,
        `${nom} factorise ${e} et obtient ${faux}. Quelle erreur a-t-${pr} faite ? Corrige-la.`,
        `La factorisation ${e} = ${faux} est fausse. Explique pourquoi et donne la bonne.`,
        `Trouve et explique l’erreur : ${e} = ${faux}.`,
      ]);
      return {
        text,
        format: "open",
        expected: ["erreur", "développ", String(b), String(k), "facteur"],
        comparator: "contains_keyword",
        explanation:
          `${DEF}\n\n` +
          "Méthode : on développe la proposition pour la contrôler.\n\n" +
          `Calcul : ${pourquoi}.\n\n` +
          `Conclusion : la bonne factorisation est ${juste}.`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_litteral_factorisation_defi_tpl_reunion_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factorisation_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Cherche le facteur commun : c’est le nombre de groupes.",
    tags: ["litteral_factorisation", "defi", "probleme", "template"],
    generate: () => genSituationFacto(SITU_A),
  },

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  // ---------- FACTEUR_COMMUN ----------
  {
    kind: "fixed",
    id: "litteral_facteur_commun_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_facteur_commun",
    difficulty: 1,
    theme: "neutral",
    text: "Dans l’expression 6x + 9, quel est le facteur commun ?",
    format: "qcm",
    choices: ["3", "6", "9", "x"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Cherche un nombre qui divise 6 et 9.",
    explanation:
      "Définition : le facteur commun divise tous les termes.\n\n" +
      "Méthode : on cherche un diviseur commun à 6 et 9.\n\n" +
      "Calcul : 6x = 3 × 2x et 9 = 3 × 3, donc le facteur commun est 3.\n\n" +
      "Conclusion : le facteur commun est 3.",
    tags: ["litteral_factorisation", "litteral_facteur_commun", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_facteur_commun_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_facteur_commun",
    difficulty: 2,
    theme: "neutral",
    text: "Dans l’expression x² + 5x, quel est le facteur commun ?",
    format: "qcm",
    choices: ["x", "5", "x²", "5x"],
    expected: ["x"],
    comparator: "mcq_exact",
    hint: "La lettre x est présente dans les deux termes.",
    explanation:
      "Définition : le facteur commun peut être une lettre.\n\n" +
      "Méthode : on repère que x apparaît dans x² et dans 5x.\n\n" +
      "Calcul : x² = x × x et 5x = x × 5, donc x est commun.\n\n" +
      "Conclusion : le facteur commun est x.",
    tags: ["litteral_factorisation", "litteral_facteur_commun", "x_commun", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_facteur_commun_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_facteur_commun",
    difficulty: 2,
    theme: "neutral",
    hint: "Écris chaque terme comme un produit : qu’est-ce qui revient dans tous ?",
    tags: ["litteral_factorisation", "litteral_facteur_commun", "template"],
    generate: () => {
      const stem = randomChoice([
        (e: string) => `Dans l’expression ${e}, quel est le facteur commun ?`,
        (e: string) => `Quel facteur est commun à tous les termes de ${e} ?`,
        (e: string) => `On veut factoriser ${e}. Que met-on en facteur ?`,
        (e: string) => `Repère le facteur commun aux termes de ${e}.`,
        (e: string) => `Pour factoriser ${e}, quel facteur faut-il écrire devant la parenthèse ?`,
      ]);
      if (Math.random() < 0.5) {
        // Un nombre premier devant deux lettres (et parfois un nombre).
        const k = randomChoice([2, 3, 5, 7]);
        const [L, M] = randomChoice(PAIRES);
        const termes: Terme[] = [[k, L], [randomChoice([1, -1]) * k, M]];
        if (Math.random() < 0.35) termes.push([randomChoice([1, -1]) * k * randomInt(2, 9)]);
        const ordre = shuffle(termes);
        if (ordre[0][0] < 0) ordre[0] = [-ordre[0][0], ordre[0][1]];
        const e = somme(ordre);
        return {
          text: stem(e),
          format: "short",
          expected: [String(k)],
          comparator: "number_equal",
          explanation:
            `${DEF}\n\n` +
            `Méthode : ${k} multiplie chacun des termes.\n\n` +
            `Calcul : ${ordre.map(([c, l]) => `${mono(Math.abs(c), l ?? "")} = ${k} × ${mono(Math.abs(c) / k, l ?? "")}`).join(" ; ")}.\n\n` +
            `Conclusion : le facteur commun est ${k}.`,
        };
      }
      const c = tirageLettre({ deuxLettres: Math.random() < 0.3 });
      return {
        text: stem(c.e),
        format: "short",
        expected: [c.L],
        comparator: "expression_equivalente",
        explanation:
          `${DEF}\n\n` +
          `Méthode : la lettre ${c.L} apparaît dans chaque terme.\n\n` +
          `Calcul : ${c.decomp}.\n\n` +
          `Conclusion : le facteur commun est ${c.L} ; ${c.e} = ${c.res}.`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_facteur_commun_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_facteur_commun",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche le plus grand nombre qui divise les coefficients, puis regarde si une lettre est commune.",
    tags: ["litteral_factorisation", "litteral_facteur_commun", "template"],
    generate: () => {
      const stem = randomChoice([
        (e: string) => `Quel est le plus grand facteur commun aux termes de ${e} ?`,
        (e: string) => `Dans ${e}, quel est le plus grand facteur que l’on peut mettre en évidence ?`,
        (e: string) => `Pour factoriser ${e} au maximum, quel facteur commun faut-il choisir ?`,
        (e: string) => `Donne le plus grand facteur commun de ${e}.`,
      ]);
      if (Math.random() < 0.55) {
        const c = tirageNombre({ mMax: 5 });
        return {
          text: stem(c.e),
          format: "short",
          expected: [String(c.k)],
          comparator: "number_equal",
          explanation:
            `${DEF}\n\n` +
            "Méthode : on cherche le plus grand nombre qui divise les deux coefficients.\n\n" +
            `Calcul : ${c.decomp}, et ${c.m} et ${c.b} n’ont plus de diviseur commun autre que 1.\n\n` +
            `Conclusion : le plus grand facteur commun est ${c.k} ; ${c.e} = ${c.res}.`,
        };
      }
      const c = tirageLettre({ k: randomInt(2, 6), mMax: 3 });
      return {
        text: stem(c.e),
        format: "short",
        expected: [c.facteur],
        comparator: "expression_equivalente",
        explanation:
          `${DEF}\n\n` +
          `Méthode : on prend le plus grand nombre commun (${c.k}) ET la lettre commune (${c.L}).\n\n` +
          `Calcul : ${c.decomp}.\n\n` +
          `Conclusion : le plus grand facteur commun est ${c.facteur} ; ${c.e} = ${c.res}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "litteral_facteur_commun_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_facteur_commun",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi x est un facteur commun dans x² + 7x.",
    format: "open",
    expected: ["x", "x²", "7x"],
    comparator: "contains_keyword",
    hint: "Écris chaque terme comme un produit faisant apparaître x.",
    explanation:
      "Définition : un facteur commun apparaît dans tous les termes.\n\n" +
      "Méthode : on écrit chaque terme comme un produit par x.\n\n" +
      "Calcul : x² = x × x et 7x = x × 7.\n\n" +
      "Conclusion : x est donc un facteur commun.",
    tags: ["litteral_factorisation", "litteral_facteur_commun", "open"],
  },

  // ---------- FACTORISER_SIMPLE ----------
  {
    kind: "fixed",
    id: "litteral_factoriser_simple_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Factoriser : 7x + 21",
    format: "qcm",
    choices: ["7(x + 3)", "7(x + 21)", "7x(1 + 3)", "x(7 + 21)"],
    expected: ["7(x + 3)"],
    comparator: "mcq_exact",
    hint: "21 = 7 × 3.",
    explanation:
      "Définition : factoriser, c’est mettre le facteur commun devant une parenthèse.\n\n" +
      "Méthode : on met 7 en facteur.\n\n" +
      "Calcul : 7x + 21 = 7 × x + 7 × 3 = 7(x + 3).\n\n" +
      "Conclusion : la forme factorisée est 7(x + 3).",
    tags: ["litteral_factorisation", "simple", "qcm"],
  },

  // ---------- FACTORISER_VERIFIER ----------
  {
    kind: "fixed",
    id: "litteral_factoriser_verifier_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_verifier",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la factorisation correcte de 6x + 9 ?",
    format: "qcm",
    choices: ["3(2x + 3)", "3(2x + 9)", "6(x + 9)", "9(x + 6)"],
    expected: ["3(2x + 3)"],
    comparator: "mcq_exact",
    hint: "Vérifie en développant chaque proposition.",
    explanation:
      "Définition : on vérifie en développant.\n\n" +
      "Méthode : on développe 3(2x + 3).\n\n" +
      "Calcul : 3(2x + 3) = 6x + 9.\n\n" +
      "Conclusion : la factorisation correcte est 3(2x + 3).",
    tags: ["litteral_factorisation", "verifier", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_factoriser_verifier_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Développe la forme factorisée proposée.",
    tags: ["litteral_factorisation", "verifier", "x_commun", "template"],
    generate: () => {
      const l = randomChoice(LETTRES);
      const b = randomInt(2, 9);
      const s = randomChoice([1, -1] as const);
      const sg = s === 1 ? "+" : "-";
      const e = `${l}² ${sg} ${b}${l}`;
      const juste = `${l}(${l} ${sg} ${b})`;
      const erreurs: Array<[string, string]> = [
        [`${l}(${l} ${sg} ${b}${l})`, `${l}(${l} ${sg} ${b}${l}) = ${l}² ${sg} ${b}${l}²`],
        [`${l}²(1 ${sg} ${b})`, `${l}²(1 ${sg} ${b}) = ${l}² ${sg} ${b}${l}²`],
        [`${l}(${l} ${sg} ${b + 1})`, `${l}(${l} ${sg} ${b + 1}) = ${l}² ${sg} ${b + 1}${l}`],
        [`${b}${l}(${l} ${sg} 1)`, `${b}${l}(${l} ${sg} 1) = ${b}${l}² ${sg} ${b}${l}`],
      ];
      const correct = Math.random() < 0.45;
      const [prop, dev] = correct ? [juste, `${juste} = ${e}`] : randomChoice(erreurs);
      const [nom, pr] = randomChoice(ELEVES);
      const vf = Math.random() < 0.25;
      const text = vf
        ? `Vrai ou faux : ${e} = ${prop} ?`
        : randomChoice([
            `La factorisation ${e} = ${prop} est-elle correcte ?`,
            `${nom} factorise ${e} et trouve ${prop}. A-t-${pr} raison ?`,
            `Est-il exact que ${e} = ${prop} ?`,
            `Pour mettre ${l} en facteur dans ${e}, ${nom} écrit ${prop}. Est-ce juste ?`,
          ]);
      const choices = vf ? ["vrai", "faux"] : ["oui", "non"];
      return {
        text,
        format: "qcm",
        choices,
        expected: [correct ? choices[0] : choices[1]],
        comparator: "mcq_exact",
        explanation:
          `${DEF}\n\n` +
          "Méthode : on développe le produit proposé.\n\n" +
          `Calcul : ${dev}.\n\n` +
          `Conclusion : ${correct ? "c’est correct." : `c’est faux, la bonne factorisation est ${juste}.`}`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_factoriser_verifier_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_verifier",
    difficulty: 4,
    theme: "neutral",
    hint: "Développe chaque proposition : une seule redonne l’expression de départ.",
    tags: ["litteral_factorisation", "verifier", "template"],
    generate: () => {
      const forme = randomInt(0, 2);
      let e: string;
      let correct: string;
      let pieges: string[];
      if (forme === 0) {
        const c = tirageNombre({ mMax: 3 });
        const [u, v] = c.t;
        e = c.e;
        correct = c.res;
        pieges = [
          // le nombre est resté multiplié par k dans la parenthèse
          `${c.k}(${somme(c.t.map(([co, l]) => (l ? [co, l] : [co * c.k])) as Terme[])})`,
          // le signe du second terme a changé
          `${c.k}(${somme([u, [-v[0], v[1]]])})`,
          // les rôles de k et de b échangés : b(k·m·x ± k)
          `${c.b}(${somme(c.t.map(([co, l]) => (l ? [co * c.k, l] : [Math.sign(co) * c.k])) as Terme[])})`,
        ];
      } else if (forme === 1) {
        const c = tirageLettre({ mMax: 1 });
        const sgS = c.s === 1 ? "+" : "-";
        e = c.e;
        correct = c.res;
        const [u] = c.t;
        const lettreEnTete = Boolean(u[1]);
        pieges = lettreEnTete
          ? [`${c.L}(${c.L} ${sgS} ${c.b}${c.L})`, `${c.L}(${c.L} ${c.s === 1 ? "-" : "+"} ${c.b})`, `${c.b}${c.L}(${c.L} ${sgS} 1)`]
          : [`${c.L}(${c.b}${c.L} ${sgS} ${c.L})`, `${c.L}(${c.b} ${c.s === 1 ? "-" : "+"} ${c.L})`, `${c.b}${c.L}(1 ${sgS} ${c.L})`];
      } else {
        const k = randomInt(2, 6);
        const b = randomInt(2, 9);
        const l = randomChoice(LETTRES);
        e = `${k}${l}² + ${k * b}${l}`;
        correct = `${k}${l}(${l} + ${b})`;
        pieges = [`${k}${l}(${l} + ${k * b})`, `${l}(${k}${l} + ${b})`, `${k}(${l}² + ${b})`];
      }
      const choices = shuffle([correct, ...pieges]);
      const [nom] = randomChoice(ELEVES);
      const text = randomChoice([
        `Quelle est la factorisation correcte de ${e} ?`,
        `Parmi ces produits, lequel est égal à ${e} ?`,
        `Développe chaque proposition : laquelle redonne ${e} ?`,
        `${nom} hésite entre quatre factorisations de ${e}. Laquelle est juste ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `${DEF}\n\n` +
          "Méthode : on développe chaque proposition ; une seule redonne l’expression de départ.\n\n" +
          `Calcul : ${correct} = ${e}.\n\n` +
          `Conclusion : la factorisation correcte est ${correct}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "litteral_factoriser_verifier_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_verifier",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment vérifier qu’une factorisation est correcte.",
    format: "open",
    expected: ["développer", "produit", "départ"],
    comparator: "contains_keyword",
    hint: "La factorisation est l’inverse du développement.",
    explanation:
      "Définition : factoriser et développer sont des opérations inverses.\n\n" +
      "Méthode : on développe la forme factorisée obtenue.\n\n" +
      "Calcul : si on retrouve l’expression de départ, la factorisation est correcte.\n\n" +
      "Conclusion : on vérifie en développant le produit obtenu.",
    tags: ["litteral_factorisation", "verifier", "open"],
  },

  // ---------- FACTORISATION_DEFIS ----------
  {
    kind: "fixed",
    id: "litteral_factorisation_defi_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factorisation_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Factoriser : 2x² + 6x",
    format: "qcm",
    choices: ["2x(x + 3)", "2(x² + 6)", "2x(x + 6)", "x(2x + 3)"],
    expected: ["2x(x + 3)"],
    comparator: "mcq_exact",
    hint: "Le facteur commun est 2x.",
    explanation:
      "Définition : on met en facteur tout ce qui est commun (nombre et lettre).\n\n" +
      "Méthode : 2x est commun à 2x² et 6x.\n\n" +
      "Calcul : 2x² + 6x = 2x × x + 2x × 3 = 2x(x + 3).\n\n" +
      "Conclusion : la forme la plus factorisée est 2x(x + 3).",
    tags: ["litteral_factorisation", "defi", "facteur_double", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_factorisation_defi_tpl_double_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factorisation_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Mets en facteur le nombre ET la lettre communs à tous les termes.",
    tags: ["litteral_factorisation", "defi", "facteur_double", "template"],
    generate: () => {
      const c = tirageLettre({ k: randomInt(2, 7), mMax: 3, deuxLettres: Math.random() < 0.3 });
      return questionFacto(randomChoice([...FACTO_MAX, ...FACTO])(c.e), c);
    },
  },
  {
    kind: "template",
    id: "litteral_factorisation_defi_tpl_erreur_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factorisation_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Développe la proposition : retrouves-tu l’expression de départ ?",
    tags: ["litteral_factorisation", "defi", "erreur", "template"],
    generate: () => {
      const k = randomInt(2, 6);
      const b = randomInt(2, 9);
      const l = randomChoice(LETTRES);
      const e = `${k}${l}² + ${k * b}${l}`;
      const juste = `${k}${l}(${l} + ${b})`;
      const erreurs: Array<[string, string]> = [
        [`${k}${l}(${l} + ${k * b})`, `${k}${l}(${l} + ${k * b}) = ${k}${l}² + ${k * k * b}${l}`],
        [`${l}(${k}${l} + ${b})`, `${l}(${k}${l} + ${b}) = ${k}${l}² + ${b}${l}`],
        [`${k}(${l}² + ${b})`, `${k}(${l}² + ${b}) = ${k}${l}² + ${k * b}`],
        [`${k}${l}²(1 + ${b})`, `${k}${l}²(1 + ${b}) = ${k}${l}² + ${k * b}${l}²`],
      ];
      const correct = Math.random() < 0.4;
      const [prop, dev] = correct ? [juste, `${juste} = ${e}`] : randomChoice(erreurs);
      const [nom, pr] = randomChoice(ELEVES);
      const vf = Math.random() < 0.25;
      const text = vf
        ? `Vrai ou faux : ${e} = ${prop} ?`
        : randomChoice([
            `${nom} affirme que ${e} = ${prop}. A-t-${pr} raison ?`,
            `Pour factoriser ${e}, ${nom} écrit ${prop}. Est-ce juste ?`,
            `Dans sa copie, ${nom} factorise ${e} en ${prop}. Le professeur doit-il valider ?`,
            `La factorisation ${e} = ${prop} est-elle correcte ?`,
          ]);
      const choices = vf ? ["vrai", "faux"] : ["oui", "non"];
      return {
        text,
        format: "qcm",
        choices,
        expected: [correct ? choices[0] : choices[1]],
        comparator: "mcq_exact",
        explanation:
          `${DEF}\n\n` +
          `Méthode : on développe la proposition ; le facteur commun complet est ${k}${l}.\n\n` +
          `Calcul : ${dev}.\n\n` +
          `Conclusion : ${correct ? "c’est correct." : `c’est faux ; la bonne factorisation est ${juste}.`}`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_factorisation_defi_tpl_contexte_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factorisation_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Mets le facteur commun (le nombre de groupes) devant la parenthèse.",
    tags: ["litteral_factorisation", "defi", "contexte", "template"],
    generate: () => genSituationFacto(SITU_B),
  },
  {
    kind: "fixed",
    id: "litteral_factorisation_defi_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factorisation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi la factorisation est l’opération inverse du développement.",
    format: "open",
    expected: ["produit", "somme", "inverse"],
    comparator: "contains_keyword",
    hint: "Développer transforme un produit en somme ; factoriser fait l’inverse.",
    explanation:
      "Définition : développer transforme un produit en somme ; factoriser transforme une somme en produit.\n\n" +
      "Méthode : on part d’une somme et on cherche le produit qui la donne.\n\n" +
      "Calcul : par exemple 3(x + 2) = 3x + 6 (développer), et 3x + 6 = 3(x + 2) (factoriser).\n\n" +
      "Conclusion : factoriser est l’opération inverse du développement.",
    tags: ["litteral_factorisation", "defi", "open"],
  },

  // ---------- FACTEUR NÉGATIF (★5, 05/10/2026) ----------
  {
    kind: "template",
    id: "litteral_factorisation_defi_tpl_negatif_impose",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factorisation_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Divise CHAQUE terme par le facteur imposé : diviser par un nombre négatif change le signe.",
    tags: ["litteral_factorisation", "defi", "facteur_negatif", "template"],
    generate: () => {
      const r = Math.random();
      if (r < 0.2) {
        const s = situationNeg();
        const texte = randomChoice([
          `${s.contexte} ${maj(s.q)} vaut ${s.c.e}. Factorise cette expression en mettant ${s.c.f} en facteur.`,
          `${s.contexte} On trouve que ${s.q} vaut ${s.c.e}. Écris-la sous la forme ${s.c.f} × (…).`,
          `${s.contexte} ${maj(s.q)} s’écrit ${s.c.e}. Mets ${s.c.f} en facteur.`,
        ]);
        return questionNeg(texte, s.c, `on perd ${-s.c.F[0]} à chaque fois : le facteur imposé est ${s.c.f}.`);
      }
      const l = randomChoice(LETTRES);
      let F: Terme;
      let t: Terme[];
      // ⭐ 05/10 : la parenthèse est toujours « finie » (plus rien en commun),
      // sinon le facteur imposé n'est pas le plus grand et l'élève est piégé.
      if (r < 0.6) {
        F = [-randomInt(2, 9)];
        t = interieur(l, { premiers: true });
      } else if (r < 0.72) {
        F = [-1];
        t = interieur(l, { premiers: true });
      } else {
        F = [-randomInt(1, 6), l];
        let m: number, b: number;
        do {
          m = randomInt(1, 3);
          b = randomChoice([1, -1]) * randomInt(1, 9);
        } while (pgcd(m, b) !== 1);
        t = [[m, l], [b]];
      }
      const c = factoNeg(F, t);
      return questionNeg(randomChoice(STEM_NEG_IMPOSE)(c.e, c.f), c, `le facteur commun imposé est ${c.f}.`);
    },
  },
  {
    kind: "template",
    id: "litteral_factorisation_defi_tpl_negatif_max",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factorisation_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Cherche le plus grand facteur commun, mets un signe − devant, puis divise chaque terme par ce facteur négatif.",
    tags: ["litteral_factorisation", "defi", "facteur_negatif", "template"],
    generate: () => {
      const l = randomChoice(LETTRES);
      if (Math.random() < 0.3) {
        const k = randomInt(1, 6);
        let m = randomInt(1, 3);
        let b = randomInt(1, 9);
        while (pgcd(m, b) !== 1) {
          m = randomInt(1, 3);
          b = randomInt(1, 9);
        }
        const c = factoNeg([-k, l], [[m, l], [randomChoice([1, -1]) * b]]);
        const methode =
          k === 1
            ? `les coefficients n’ont pas de diviseur commun autre que 1, mais ${l} est dans chaque terme ; on met en facteur ${c.f}.`
            : `${k} divise les deux coefficients et ${l} est dans chaque terme ; le plus grand facteur commun est ${mono(k, l)}, on prend ${c.f}.`;
        return questionNeg(randomChoice(STEM_NEG_MAX_LETTRE)(c.e), c, methode);
      }
      const g = randomInt(2, 9);
      const c = factoNeg([-g], interieur(l, { premiers: true }));
      const co = c.dev.map(([x]) => Math.abs(x));
      const coeffs = `${co.slice(0, -1).join(", ")} et ${co[co.length - 1]}`;
      return questionNeg(
        randomChoice(STEM_NEG_MAX_NOMBRE)(c.e),
        c,
        `sans les signes, les coefficients sont ${coeffs} ; leur plus grand diviseur commun est ${g}, on prend son opposé, ${c.f}.`,
      );
    },
  },
  {
    kind: "template",
    id: "litteral_factorisation_defi_tpl_negatif_qcm",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factorisation_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Développe chaque proposition : une seule redonne exactement l’expression de départ.",
    tags: ["litteral_factorisation", "defi", "facteur_negatif", "qcm", "template"],
    generate: () => {
      const l = randomChoice(LETTRES);
      const r = Math.random();
      let c: FactoNeg;
      let contexte = "";
      let q = "";
      if (r < 0.2) {
        const s = situationNeg();
        c = s.c;
        contexte = s.contexte;
        q = s.q;
      } else if (r < 0.65) {
        c = factoNeg([-randomInt(2, 9)], interieur(l, { premiers: true }));
      } else {
        let m = randomInt(1, 3);
        let b = randomInt(1, 9);
        while (pgcd(m, b) !== 1) {
          m = randomInt(1, 3);
          b = randomInt(1, 9);
        }
        c = factoNeg([-randomInt(2, 6), l], [[m, l], [randomChoice([1, -1]) * b]]);
      }
      const k = -c.F[0];
      const L = c.F[1];
      const signe: Terme[] = c.t.map(([co, lt], i) => (i === 0 ? [co, lt] : [-co, lt]));
      const positif: Terme = [k, L];
      // facteur incomplet : la lettre oubliée dans le facteur, ou le nombre resté non divisé
      const incomplet: [Terme, Terme[]] = L
        ? [[-k], c.t]
        : [c.F, c.t.map(([co, lt]) => (lt ? [co, lt] : [co * k]) as Terme)];
      const pieges: Array<[Terme, Terme[], string]> = [
        [c.F, signe, "signe oublié dans la parenthèse"],
        [positif, c.t, "facteur positif, le signe − a disparu"],
        [incomplet[0], incomplet[1], L ? `facteur incomplet, la lettre ${L} est oubliée` : `facteur incomplet, un terme n’a pas été divisé par ${c.f}`],
      ];
      const ecrit = (G: Terme, u: Terme[]) => M(`${mono(G[0], G[1] ?? "")}(${somme(u)})`);
      const choices = shuffle([c.res, ...pieges.map(([G, u]) => ecrit(G, u))]);
      const [nom, pr] = randomChoice(ELEVES);
      const text = contexte
        ? `${contexte} ${maj(q)} vaut ${c.e}. Quelle écriture factorisée de cette expression est juste ?`
        : randomChoice([
            `Parmi ces produits, lequel est égal à ${c.e} ?`,
            `Quelle est la factorisation juste de ${c.e} avec ${c.f} en facteur ?`,
            `${nom} veut mettre ${c.f} en facteur dans ${c.e}. Quelle écriture doit-${pr} choisir ?`,
            `Développe chaque proposition : laquelle redonne ${c.e} ?`,
            `Une seule de ces factorisations de ${c.e} est juste. Laquelle ?`,
          ]);
      return {
        text,
        format: "qcm",
        choices,
        expected: [c.res],
        comparator: "mcq_exact",
        explanation:
          `${DEF}\n\n` +
          `Méthode : on divise CHAQUE terme par ${c.f} : ${divisions(c)}.\n\n` +
          `Calcul : ${c.e} = ${c.res}. Les autres propositions sont fausses : ` +
          pieges.map(([G, u, nomPiege]) => `${ecrit(G, u)} redonne ${devStr(G, u)} (${nomPiege})`).join(" ; ") +
          `.\n\n` +
          `Conclusion : on contrôle en redéveloppant : ${controle(c)}. La bonne réponse est ${c.res}.`,
      };
    },
  },
];
