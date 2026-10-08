import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { estFactorisee, estReduite } from "@/lib/tutor/evaluation/expressionAlgebrique";
import { qcmUnique as qcmUniqueBrut, sansMotCleNumerique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DU CALCUL LITTÉRAL DE 4e (08/10/2026, voir 6e/maths/correcteurs/types.ts).
// Ce fichier porte aussi les OUTILS communs aux quatre banques du calcul
// littéral (expressions, distributivité, factorisation, identités) :
//   · un lecteur d'expressions qui les met sous forme de POLYNÔME (coefficients
//     exacts par monôme) — deux expressions sont égales si leurs polynômes le
//     sont : c'est « évaluer pour plusieurs valeurs de la lettre », sans hasard ;
//   · la lecture des expressions écrites dans le TEXTE que voit l'élève (y
//     compris en LaTeX : $(x + 3)^2$, \times) ;
//   · la FORME demandée : développée-réduite (estReduite), factorisée le plus
//     possible (estFactorisee) — les critères mêmes des comparateurs `expression_*`.
// Chaque correcteur relit la ou les expressions du texte, refait le calcul
// (développer, réduire, substituer, factoriser, traduire) sans passer par le
// gabarit, et rend la liste des problèmes (vide = juste).
// ⛔ Décisions de Frédéric (4e) : pas de formule a² + 2ab + b² (un carré se
// développe comme un produit de deux parenthèses), factorisation par facteur
// commun seulement, aucune question ouverte à mots-clés.

type Q = TutorGeneratedQuestionV4;

// ─── Polynômes ─────────────────────────────────────────────────────────────

/** Monôme → coefficient. Clé : lettres triées avec exposants (« a2b1 ») ; « » pour la constante. */
export type Poly = Map<string, number>;

const cle = (e: Record<string, number>) =>
  Object.keys(e)
    .filter((l) => e[l] !== 0)
    .sort()
    .map((l) => `${l}${e[l]}`)
    .join("");
const exposants = (k: string): Record<string, number> => {
  const e: Record<string, number> = {};
  for (const m of k.matchAll(/([a-z])(\d+)/g)) e[m[1]] = Number(m[2]);
  return e;
};
const nettoyerPoly = (p: Poly): Poly => {
  const r: Poly = new Map();
  for (const [k, c] of p) if (Math.abs(c) > 1e-9) r.set(k, Math.round(c * 1e9) / 1e9);
  return r;
};
const constante = (c: number): Poly => nettoyerPoly(new Map([["", c]]));
function plus(a: Poly, b: Poly, s = 1): Poly {
  const r: Poly = new Map(a);
  for (const [k, c] of b) r.set(k, (r.get(k) ?? 0) + s * c);
  return nettoyerPoly(r);
}
function fois(a: Poly, b: Poly): Poly {
  const r: Poly = new Map();
  for (const [k1, c1] of a)
    for (const [k2, c2] of b) {
      const e = exposants(k1);
      for (const [l, n] of Object.entries(exposants(k2))) e[l] = (e[l] ?? 0) + n;
      const k = cle(e);
      r.set(k, (r.get(k) ?? 0) + c1 * c2);
    }
  return nettoyerPoly(r);
}

/** Le texte d'une expression, rendu lisible pour le lecteur (LaTeX, signes, virgule). */
export function normaliser(s: string): string {
  return s
    .replace(/\$/g, "")
    .replace(/\\times/g, "×")
    .replace(/\\left|\\right/g, "")
    .replace(/[−–]/g, "-")
    .replace(/[×·*]/g, "*")
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .replace(/(\d),(\d)/g, "$1.$2")
    .replace(/\s+/g, "");
}

/** Lit une expression (« 3(x − 2) + x² », « $(2a + 1)^2$ », « 3*x ») ; null si elle ne se lit pas. */
export function poly(texte: string): Poly | null {
  const s = normaliser(texte);
  if (!s) return null;
  let i = 0;
  const voir = () => s[i];
  const expr = (): Poly => {
    let r = terme();
    while (voir() === "+" || voir() === "-") {
      const op = s[i++];
      r = plus(r, terme(), op === "+" ? 1 : -1);
    }
    return r;
  };
  const terme = (): Poly => {
    let r = unaire();
    for (;;) {
      if (voir() === "*") {
        i++;
        r = fois(r, unaire());
      } else if (voir() === ":" || voir() === "/" || voir() === "÷") {
        i++;
        const d = unaire();
        if (d.size !== 1 || !d.has("")) throw new Error("division par une lettre");
        r = fois(r, constante(1 / d.get("")!));
      } else if (voir() !== undefined && /[0-9.a-z(]/.test(voir())) r = fois(r, puissance());
      else return r;
    }
  };
  const unaire = (): Poly => {
    if (voir() === "-") {
      i++;
      return fois(constante(-1), unaire());
    }
    if (voir() === "+") {
      i++;
      return unaire();
    }
    return puissance();
  };
  const puissance = (): Poly => {
    const b = atome();
    if (voir() === "^") {
      i++;
      const m = /^\d+/.exec(s.slice(i));
      if (!m) throw new Error("exposant");
      i += m[0].length;
      let r = constante(1);
      for (let k = 0; k < Number(m[0]); k++) r = fois(r, b);
      return r;
    }
    return b;
  };
  const atome = (): Poly => {
    const c = voir();
    if (c === "(") {
      i++;
      const r = expr();
      if (s[i++] !== ")") throw new Error("parenthèse");
      return r;
    }
    const m = /^\d+(?:\.\d+)?/.exec(s.slice(i));
    if (m) {
      i += m[0].length;
      return constante(Number(m[0]));
    }
    if (c !== undefined && /[a-z]/.test(c)) {
      i++;
      return new Map([[`${c}1`, 1]]);
    }
    throw new Error("symbole");
  };
  try {
    const r = expr();
    return i === s.length ? r : null;
  } catch {
    return null;
  }
}

export function polyEgaux(a: Poly | null, b: Poly | null): boolean {
  if (!a || !b) return false;
  const d = plus(a, b, -1);
  return d.size === 0;
}

/** Deux expressions écrites sont égales (même polynôme). */
export const equiv = (a: string, b: string) => polyEgaux(poly(a), poly(b));

/** Valeur d'une expression pour des valeurs des lettres. */
export function valeur(texte: string, v: Record<string, number>): number | null {
  const p = poly(texte);
  if (!p) return null;
  let s = 0;
  for (const [k, c] of p) {
    let m = c;
    for (const [l, n] of Object.entries(exposants(k))) {
      if (!(l in v)) return null;
      m *= v[l] ** n;
    }
    s += m;
  }
  return s;
}

/** Coefficient d'un monôme (« x », « x2 », « ab ») ; « » pour la constante. */
export function coef(p: Poly, mono: string): number {
  if (!mono) return p.get("") ?? 0;
  const e: Record<string, number> = {};
  for (const m of mono.matchAll(/([a-z])(\d*)/g)) e[m[1]] = (e[m[1]] ?? 0) + Number(m[2] || 1);
  return p.get(cle(e)) ?? 0;
}

/** Les lettres d'un polynôme. */
export const lettresDe = (p: Poly) => [...new Set([...p.keys()].flatMap((k) => k.match(/[a-z]/g) ?? []))];

/** Écrit un polynôme (pour les messages). */
export function ecrirePoly(p: Poly | null): string {
  if (!p) return "?";
  if (!p.size) return "0";
  return [...p.entries()]
    .sort((a, b) => b[0].length - a[0].length || (b[0] > a[0] ? 1 : -1))
    .map(([k, c]) => `${c >= 0 ? "+" : "-"}${Math.abs(c) === 1 && k ? "" : Math.abs(c)}${k.replace(/1(?![0-9])/g, "").replace(/(\d)/g, "^$1")}`)
    .join(" ")
    .replace(/^\+/, "");
}

// ─── Lecture du texte ──────────────────────────────────────────────────────

/** Texte sans LaTeX : $…$ retirés, \times → ×, ^2 → ². */
export function texteLisible(t: string): string {
  return t
    .replace(/\$/g, "")
    .replace(/\\times/g, "×")
    .replace(/\\ldots/g, "…")
    .replace(/\^2/g, "²")
    .replace(/\^3/g, "³")
    .replace(/\\/g, "");
}

const LETTRE_MOT = /[A-Za-zÀ-ÿ’']/;
/** Petits mots français qui ne sont jamais des produits de lettres. */
const MOTS = new Set(["en", "et", "il", "le", "la", "les", "un", "une", "de", "du", "des", "ou", "au", "aux", "on", "ne", "se", "ce", "sa", "son", "ses", "si", "ni", "me", "te", "est", "par", "lui", "cm", "km", "kg", "mm", "dm", "mL", "min"]);

/** Les lettres qui jouent le rôle d'un nombre : collées à un chiffre, une opération ou une parenthèse. */
export function lettresVariables(t0: string): string[] {
  const t = texteLisible(t0);
  const out = new Set<string>();
  for (const m of t.matchAll(/[a-z]+/g)) {
    const mot = m[0];
    const i = m.index!;
    if (i > 0 && LETTRE_MOT.test(t[i - 1])) continue;
    if (LETTRE_MOT.test(t[i + mot.length] ?? "")) continue;
    if (mot.length > 3 || MOTS.has(mot)) continue;
    if (/\(en $/.test(t.slice(0, i))) continue; // « (en m) » : une unité
    const avant = t.slice(Math.max(0, i - 2), i);
    const apres = t.slice(i + mot.length, i + mot.length + 2);
    if (/[\d)²(]$|[+\-−×*=(] ?$/.test(avant) || /^[)²(]|^ ?[+\-−×*=)]/.test(apres) || /^\d/.test(apres))
      for (const l of mot) out.add(l);
  }
  return [...out];
}

/**
 * Les expressions écrites dans le texte (avec au moins une lettre ou une
 * opération), dans l'ordre. `lettres` : les lettres admises (par défaut, celles
 * de `lettresVariables`).
 */
export function expressionsDuTexte(t0: string, lettres?: string[]): string[] {
  const t = texteLisible(t0);
  const L = new Set(lettres ?? lettresVariables(t0));
  const ok: boolean[] = [...t].map(() => false);
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (/[\d ()+\-−×*²³^]/.test(c)) ok[i] = true;
    else if (c === "," && /\d/.test(t[i - 1] ?? "") && /\d/.test(t[i + 1] ?? "")) ok[i] = true;
  }
  for (const m of t.matchAll(/[A-Za-zÀ-ÿ’']+/g)) {
    const mot = m[0];
    if (mot.length <= 3 && !MOTS.has(mot) && [...mot].every((l) => L.has(l))) for (let k = 0; k < mot.length; k++) ok[m.index! + k] = true;
  }
  const out: string[] = [];
  let debut = -1;
  for (let i = 0; i <= t.length; i++) {
    if (i < t.length && ok[i]) {
      if (debut < 0) debut = i;
    } else if (debut >= 0) {
      // deux nombres ou lettres séparés par un simple espace ne font pas une expression (« a a ans », « 4y (en cm) »)
      for (let e of t.slice(debut, i).trim().split(/(?<=[\da-z)²³])\s+(?=[\da-z(])/)) {
        // bords : opérations pendantes et parenthèses orphelines
        for (let k = 0; k < 4; k++) {
          e = e.replace(/^[+\-−×*]\s+(?=\D)/, "").replace(/[\s+\-−×*(]+$/, "").trim();
          const ouv = (e.match(/\(/g) ?? []).length;
          const fer = (e.match(/\)/g) ?? []).length;
          if (ouv > fer && e.startsWith("(")) e = e.slice(1).trim();
          else if (fer > ouv && e.endsWith(")")) e = e.slice(0, -1).trim();
        }
        if (e && (/[a-z]/.test(e) || /\d\s*[+\-−×*^²]\s*\(?\d/.test(e)) && poly(e)) out.push(e);
      }
      debut = -1;
    }
  }
  return out;
}

/** Les expressions du texte qui contiennent une lettre. */
export const expressionsLitterales = (t: string, lettres?: string[]) => expressionsDuTexte(t, lettres).filter((e) => /[a-z]/.test(e));

/** L'expression à transformer : la plus longue parmi celles qui ne sont pas réduites (parenthèses, termes semblables). */
export function cibleNonReduite(t: string, lettres?: string[]): string | null {
  const es = expressionsLitterales(t, lettres).filter((e) => !estReduite(e));
  if (!es.length) return null;
  return es.reduce((a, b) => (normaliser(b).length > normaliser(a).length ? b : a));
}

/** La plus longue expression littérale du texte. */
export function plusLongue(t: string, lettres?: string[]): string | null {
  const es = expressionsLitterales(t, lettres);
  if (!es.length) return null;
  return es.reduce((a, b) => (normaliser(b).length > normaliser(a).length ? b : a));
}

// ─── Vérifications ─────────────────────────────────────────────────────────

/** Exactement une proposition juste, et c'est l'attendue (comparaison sans espaces). */
export const qcmUnique = (q: Q, juste: (c: string) => boolean) => qcmUniqueBrut(q, (c) => juste(c.trim()));

/** Une QCM d'expressions : une seule proposition égale à la bonne expression. */
export function qcmExpression(q: Q, juste: string | Poly | null): string[] {
  const P = typeof juste === "string" ? poly(juste) : juste;
  if (!P) return [`calcul impossible à refaire (${String(juste)})`];
  if (q.format !== "qcm") return ["QCM attendu"];
  return qcmUnique(q, (c) => polyEgaux(poly(c), P));
}

/** Réponse courte d'expression : égale au calcul refait, et à la forme demandée par le comparateur. */
export function reponseExpression(q: Q, juste: string | Poly | null, quoi: string): string[] {
  const P = typeof juste === "string" ? poly(juste) : juste;
  if (!P) return [`calcul impossible à refaire (${quoi})`];
  const e = String(q.expected[0]);
  const p: string[] = [];
  if (!polyEgaux(poly(e), P)) p.push(`attendu « ${e} », le calcul refait donne ${ecrirePoly(P)} (${quoi})`);
  if (!q.comparator.startsWith("expression_")) p.push(`comparateur ${q.comparator} pour une expression (expression_* attendu)`);
  if ((q.comparator === "expression_developpee" || q.comparator === "expression_reduite") && !estReduite(e))
    p.push(`attendu « ${e} » : pas sous forme développée réduite`);
  if (q.comparator === "expression_factorisee" && !estFactorisee(e)) p.push(`attendu « ${e} » : pas factorisé le plus possible`);
  return p;
}

/** Réponse numérique. */
export function reponseNombre(q: Q, juste: number | null, quoi: string): string[] {
  if (juste == null || !Number.isFinite(juste)) return [`calcul impossible à refaire (${quoi})`];
  const e = Number(String(q.expected[0]).replace(/\s/g, "").replace(/[−–]/g, "-").replace(",", "."));
  const p: string[] = [];
  if (Math.abs(e - juste) > 1e-9) p.push(`attendu « ${q.expected[0]} », le calcul refait donne ${juste} (${quoi})`);
  if (q.comparator !== "number_equal") p.push(`comparateur ${q.comparator} pour un nombre`);
  return p;
}

/** ⛔ Décision de Frédéric (4e) : jamais la formule a² + 2ab + b² (ni « double produit »). */
export function sansFormule(q: Q): string[] {
  const tout = [q.text, ...(q.choices ?? []), ...(q.expected ?? []), q.explanation ?? ""].map((s) => texteLisible(String(s))).join(" ");
  const p: string[] = [];
  if (/a² ?[+\-−] ?2ab ?\+ ?b²|double produit|identités? remarquables?/i.test(tout)) p.push("formule ou vocabulaire des identités remarquables (décision : par la double distributivité)");
  return p;
}

/** ⛔ Pas de question ouverte à mots-clés (nombre seul ou mot vague) : comparateur d'expression, nombre ou QCM. */
export function sansMotsCles(q: Q): string[] {
  return [...sansMotCleNumerique(q), ...(q.comparator === "contains_keyword" ? ["question à mots-clés (contains_keyword) : passer en QCM ou en comparateur d'expression"] : [])];
}

/** Ajoute aux correcteurs d'un fichier les règles du calcul littéral de 4e. */
export function avecReglesLitteral(c: CorrecteursMaths): CorrecteursMaths {
  return Object.fromEntries(Object.entries(c).map(([id, f]) => [id, (q: Q) => [...sansMotsCles(q), ...sansFormule(q), ...f(q)]]));
}

/** Les nombres d'un morceau de texte (entiers ou décimaux, signe « − » collé compris). */
export function nombresDe(t: string): number[] {
  return (texteLisible(t).match(/[−-]?\d+(?:,\d+)?/g) ?? []).map((s) => Number(s.replace(/[−]/, "-").replace(",", ".")));
}

/**
 * Une SITUATION affine décrite en mots : « Un taxi facture 6 € de prise en
 * charge, puis 2 € par kilomètre » → départ 6, pas 2, signe +. Le départ est le
 * premier nombre de la phrase, le pas le second ; « raccourcit », « perd » : signe −.
 */
export function situationAffine(t: string): { depart: number; pas: number; signe: 1 | -1 } | null {
  const phrases = texteLisible(t).split(/(?<=[.?!])\s+/);
  for (const ph of phrases) {
    if (!/\bpar (heure|jour|mois|semaine|minute|kilomètre|cours|part|an)|\bchaque\b|pour chaque|\bpar\b.*\b(heure|jour|mois)/.test(ph)) continue;
    if (/\d[a-z](?![a-zà-ÿ’'])|[a-z] [+\-−] \d/.test(ph)) continue; // une phrase qui contient déjà l'expression
    const ns = nombresDe(ph).filter((n) => n >= 0);
    if (ns.length !== 2) continue;
    return { depart: ns[0], pas: ns[1], signe: /raccourcit|perd/.test(ph) ? -1 : 1 };
  }
  return null;
}

/** L'expression écrite est-elle celle de la situation (départ ± pas × lettre) ? */
function verifierSituation(t: string, E: string | null, l: string): string[] {
  const s = situationAffine(t);
  if (!s) return ["situation illisible (départ et pas)"];
  if (!E) return ["expression introuvable dans le texte"];
  const juste = `${s.depart} ${s.signe === 1 ? "+" : "-"} ${s.pas}${l}`;
  return equiv(E, juste) ? [] : [`l'expression « ${E} » ne traduit pas la situation (${juste})`];
}

/** La seule lettre d'une expression. */
function seuleLettre(E: string | null): string | null {
  const P = E ? poly(E) : null;
  if (!P) return null;
  const L = lettresDe(P);
  return L.length === 1 ? L[0] : null;
}

// ─── Outils des situations « k groupes de … » (distributivité, factorisation) ───

/** La lettre de la réponse attendue (l'identité de la lettre n'est pas le calcul). */
export const lettreAttendue = (q: Q) => lettresDe(poly(String(q.expected[0])) ?? new Map())[0] ?? null;

/**
 * Les données d'une phrase, dans l'ordre : nombres, la lettre seule, ou
 * « lettre + nombre » (« 4 cartons de a + 5 romans » → 4, « a + 5 »).
 * La lettre suivie d'un nombre (« Un apiculteur a 3 ruches ») est le verbe avoir.
 */
export function donnees(phrase: string, l: string): string[] {
  const out: string[] = [];
  const re = new RegExp(`(?<![A-Za-zÀ-ÿ’'\\d])(${l} \\+ \\d+|\\d+|${l})(?![A-Za-zÀ-ÿ’'\\d])`, "g");
  const t = texteLisible(phrase);
  for (const m of t.matchAll(re)) {
    if (m[1] === l && /^ \d/.test(t.slice(m.index! + 1))) continue;
    out.push(m[1]);
  }
  return out;
}

/** Facteur commun seulement : un monôme (nombre, lettre) devant UNE parenthèse, ou l'inverse. */
export function facteurCommunSeulement(e: string): boolean {
  const s = normaliser(e);
  return /^-?\(?-?\d*(\.\d+)?[a-z]?(\^\d)?\)?\*?\([^()]+\)$|^\([^()]+\)\*?\(?-?\d*[a-z]?\)?$/.test(s);
}

/** Factoriser la somme écrite dans le texte : même polynôme, factorisée le plus possible, par facteur commun. */
export function cFactoriser(q: Q): string[] {
  const S = plusLongue(q.text);
  if (!S) return ["expression introuvable"];
  const p = reponseExpression(q, S, `${S} factorisée`);
  if (!facteurCommunSeulement(String(q.expected[0]))) p.push(`attendu « ${q.expected[0]} » : pas une factorisation par facteur commun`);
  return p;
}

// ─── Correcteurs de expressions-litterales.bank.ts ─────────────────────────

/** Comprendre ★1 : la lettre de l'expression. */
function cLaLettre(q: Q): string[] {
  const E = plusLongue(q.text);
  const l = seuleLettre(E);
  if (!l) return [`expression à une lettre introuvable (${E})`];
  const p = String(q.expected[0]) === l ? [] : [`attendu « ${q.expected[0]} », la lettre de ${E} est ${l}`];
  if (situationAffine(q.text)) p.push(...verifierSituation(q.text, E, l));
  return p;
}

/** Comprendre : coefficient de la lettre ou terme constant, avec son signe. */
function cCoefficient(q: Q): string[] {
  const t = texteLisible(q.text);
  const E = plusLongue(q.text);
  const l = seuleLettre(E);
  const P = E ? poly(E) : null;
  if (!l || !P) return [`expression à une lettre introuvable (${E})`];
  const p: string[] = [];
  if (situationAffine(q.text)) p.push(...verifierSituation(q.text, E, l));
  const veutConstante = /terme constant|nombre seul|ne dépend pas/.test(t);
  const veutCoef = /coefficient|multiplie|multiplié/.test(t);
  if (veutConstante === veutCoef) return [...p, "question illisible (coefficient ou terme constant ?)"];
  return [...p, ...reponseNombre(q, veutCoef ? coef(P, l) : coef(P, ""), veutCoef ? `coefficient de ${l}` : "terme constant")];
}

/** Comprendre ★2 : expression littérale (une lettre) ou calcul numérique ? */
function cLitteralOuNumerique(q: Q): string[] {
  const t = texteLisible(q.text);
  // l'écriture jugée : ce qui précède « : » ou suit « l'écriture / l'expression / que »
  const m = t.match(/^(.*?) : (?:est-ce|expression)|(?:l’écriture|L’écriture|l’expression|L’expression|que) (.*?) (?:est-elle|\?|est une)/);
  const E = m ? (m[1] ?? m[2]).trim() : null;
  if (!E || !poly(E)) return [`écriture illisible (${E})`];
  const litterale = /[a-z]/.test(E);
  if (q.choices?.includes("oui")) return qcmUnique(q, (c) => c === (litterale ? "oui" : "non"));
  return qcmUnique(q, (c) => c === (litterale ? "une expression littérale" : "un calcul numérique"));
}

/**
 * Traduit une phrase de calcul en expression, comme en classe : « le double de
 * x augmenté de 3 » → (2·x) + 3 ; « le triple de la somme de x et de 2 » →
 * 3·(x + 2). null si la phrase n'est pas comprise.
 */
export function traduire(s0: string): string | null {
  const s = s0.trim().replace(/^du /, "le ");
  const K: Record<string, number> = { double: 2, triple: 3, quadruple: 4 };
  const r = (x: string) => traduire(x);
  const deux = (a: string | null, op: string, b: string | null) => (a && b ? `(${a}) ${op} (${b})` : null);
  let m: RegExpMatchArray | null;
  if (/^\d+$|^[a-z]$/.test(s)) return s;
  if ((m = s.match(/^(.+), puis (augmenté|diminué) de (\d+)$/))) return deux(r(m[1]), m[2] === "augmenté" ? "+" : "-", m[3]);
  if ((m = s.match(/^(.+), (augmenté|diminué) de (\d+)$/))) return deux(r(m[1]), m[2] === "augmenté" ? "+" : "-", m[3]);
  if ((m = s.match(/^(.+), multipliée? par (\d+)$/))) return deux(r(m[1]), "*", m[2]);
  if ((m = s.match(/^(.+) (augmenté|diminué) de (\d+)$/))) return deux(r(m[1]), m[2] === "augmenté" ? "+" : "-", m[3]);
  if ((m = s.match(/^(.+) (plus|moins) (\d+)$/))) return deux(r(m[1]), m[2] === "plus" ? "+" : "-", m[3]);
  if ((m = s.match(/^(\d+) moins (.+)$/))) return deux(m[1], "-", r(m[2]));
  if ((m = s.match(/^(\d+) de (plus|moins) que (.+)$/))) return deux(r(m[3]), m[2] === "plus" ? "+" : "-", m[1]);
  if ((m = s.match(/^la somme (?:de|du) (.+?) et de (.+)$/))) return deux(r(s.startsWith("la somme du") ? `le ${m[1]}` : m[1]), "+", r(m[2]));
  if ((m = s.match(/^la différence entre (.+?) et (.+)$/))) return deux(r(m[1]), "-", r(m[2]));
  if ((m = s.match(/^le (double|triple|quadruple) de (.+)$/))) return deux(String(K[m[1]]), "*", r(m[2]));
  if ((m = s.match(/^le carré de (.+)$/))) return r(m[1]) ? `(${r(m[1])})^2` : null;
  if ((m = s.match(/^le produit de (\d+) par (.+)$/))) return deux(m[1], "*", r(m[2]));
  if ((m = s.match(/^(\d+) fois (.+)$/))) return deux(m[1], "*", r(m[2]));
  if ((m = s.match(/^(.+) multiplié par (\d+)$/))) return deux(r(m[1]), "*", m[2]);
  return null;
}

/** La phrase entre guillemets « … ». */
const phraseCitee = (t: string) => t.match(/« (.+?) »/)?.[1] ?? null;

/** Traduire : la phrase citée, ou la situation affine (« On note t… »). */
function cTraduire(q: Q): string[] {
  const t = texteLisible(q.text);
  const ph = phraseCitee(t);
  let juste: string | null = null;
  let quoi = "";
  if (ph) {
    juste = traduire(ph);
    quoi = `« ${ph} »`;
    if (!juste) return [`phrase non comprise : « ${ph} »`];
  } else {
    const s = situationAffine(t);
    const l = t.match(/(?:On note|si|lettre|à l’aide de|avec la lettre|en fonction de) ([a-z])\b/)?.[1];
    if (!s || !l) return ["situation illisible (départ, pas, lettre)"];
    juste = `${s.depart} ${s.signe === 1 ? "+" : "-"} ${s.pas}${l}`;
    quoi = "situation";
  }
  if (q.format === "qcm") return qcmExpression(q, juste);
  return reponseExpression(q, juste, quoi);
}

/** Traduire ★3 : les situations avec parenthèses (rectangle, carré, paquets, rangées…). */
function cTraduireParentheses(q: Q): string[] {
  const t = texteLisible(q.text);
  if (phraseCitee(t)) return cTraduire(q);
  let m: RegExpMatchArray | null;
  let juste: string | null = null;
  if ((m = t.match(/longueur ([a-z] \+ \d+) \(en cm\) et pour largeur (\d+) cm\. Écris son aire/))) juste = `(${m[1]}) * ${m[2]}`;
  else if ((m = t.match(/Un carré a pour côté ([a-z] \+ \d+) \(en cm\)\. Écris son périmètre/))) juste = `4(${m[1]})`;
  else if ((m = t.match(/triangle équilatéral a pour côté ([a-z] \+ \d+) \(en cm\)\. Écris son périmètre/))) juste = `3(${m[1]})`;
  else if ((m = t.match(/On achète (\d+) paquets ; chacun contient ([a-z]) biscuits et (\d+) bonbons/))) juste = `${m[1]}(${m[2]} + ${m[3]})`;
  else if ((m = t.match(/^(\d+) amis .* chacun paie ([a-z]) € de repas et (\d+) € de transport/))) juste = `${m[1]}(${m[2]} + ${m[3]})`;
  else if ((m = t.match(/(\d+) rangées ; chaque rangée contient ([a-z]) livres, dont on retire (\d+) livres/))) juste = `${m[1]}(${m[2]} - ${m[3]})`;
  else if ((m = t.match(/(\d+) rangs de salades ; chaque rang compte ([a-z]) salades, mais (\d+) plants/))) juste = `${m[1]}(${m[2]} - ${m[3]})`;
  if (!juste) return ["situation non reconnue"];
  return reponseExpression(q, juste, "situation");
}

/** Les valeurs données : « x = −3 », « pour c = 2 », « On remplace a par −2 ». */
export function valeursDonnees(t0: string): Record<string, number> {
  const t = texteLisible(t0);
  const v: Record<string, number> = {};
  for (const m of t.matchAll(/(?<![A-Za-zÀ-ÿ’'])([a-z]) = ([−-]?\d+(?:,\d+)?)(?![\d,]*[a-z(]|\s*[+\-−×*]\s*[\d(a-z])/g)) v[m[1]] = Number(m[2].replace("−", "-").replace(",", "."));
  for (const m of t.matchAll(/remplace ([a-z]) par ([−-]?\d+)/g)) v[m[1]] = Number(m[2].replace("−", "-"));
  return v;
}

/** Substituer : l'expression du texte, les valeurs données (ou celle de la question en situation). */
function cSubstituer(q: Q): string[] {
  const t = texteLisible(q.text);
  const E = plusLongue(q.text);
  if (!E) return ["expression introuvable"];
  const P = poly(E)!;
  const L = lettresDe(P);
  const v = valeursDonnees(q.text);
  const p: string[] = [];
  const situation = situationAffine(t);
  if (L.some((l) => !(l in v))) {
    // en situation : la valeur est le seul nombre de la question (« après 7 heures ? »)
    const question = t.split(/(?<=[.?!])\s+/).filter((ph) => ph.endsWith("?") && !ph.includes(E));
    const ns = question.length === 1 ? nombresDe(question[0]) : [];
    if (L.length !== 1 || ns.length !== 1) return [`valeur de ${L.join(", ")} introuvable`];
    v[L[0]] = ns[0];
  }
  if (situation) {
    p.push(...verifierSituation(t, E, L[0]));
    if ((valeur(E, v) ?? 0) <= 0) p.push(`résultat ${valeur(E, v)} : pas plausible en situation`);
  }
  // deux lettres en situation : « des croissants à 2 € et des sandwichs à 6 €. On note c… et s… »
  const m = t.match(/^[^.]*?(\d+) (?:€|points)[^.]*?(\d+) (?:€|points)[^.]*\. On note ([a-z]) le nombre[^.]* et ([a-z]) le nombre/);
  if (m && !equiv(E, `${m[1]}${m[3]} + ${m[2]}${m[4]}`)) p.push(`l'expression « ${E} » ne traduit pas les prix (${m[1]}${m[3]} + ${m[2]}${m[4]})`);
  return [...p, ...reponseNombre(q, valeur(E, v), `${E} pour ${Object.entries(v).map(([l, x]) => `${l} = ${x}`).join(", ")}`)];
}

/** Réduire (ou développer) l'expression du texte : le polynôme refait, une seule proposition juste. */
export function cReduire(q: Q): string[] {
  const E = cibleNonReduite(q.text) ?? plusLongue(q.text);
  if (!E) return ["expression introuvable"];
  const P = poly(E);
  if (q.format === "qcm") {
    const p = qcmExpression(q, P);
    if (!estReduite(String(q.expected[0]))) p.push(`la bonne proposition « ${q.expected[0]} » n'est pas réduite`);
    return p;
  }
  return reponseExpression(q, P, `${E} réduite`);
}

/** Les longueurs d'une figure (« des côtés de longueurs y, y + 8 et 4y ») → leur somme. */
const somme = (morceaux: string[]) => morceaux.map((m) => `(${m.trim()})`).join(" + ");
const liste = (s: string) => s.split(/, | et /).map((x) => x.trim());

/** Un triangle de côtés (expressions d'une lettre) existe-t-il pour une valeur de la lettre (0,1 à 30) ? */
export function triangleExiste(cotes: string[]): boolean {
  const L = [...new Set(cotes.flatMap((c) => lettresDe(poly(c) ?? new Map())))];
  for (let v = 0.1; v <= 30; v += 0.1) {
    const x = cotes.map((c) => valeur(c, Object.fromEntries(L.map((l) => [l, v]))) ?? NaN);
    const s = x.reduce((a, b) => a + b, 0);
    if (x.every((c) => c > 0 && c < s - c)) return true;
  }
  return false;
}

/** Réduire ★1 en situation : périmètre, billes, ficelle ; sinon l'expression écrite. */
function cReduireSituation(q: Q): string[] {
  const t = texteLisible(q.text);
  let m: RegExpMatchArray | null;
  let juste: string | null = null;
  if ((m = t.match(/côtés de longueurs (.+?)(?: \(en \w+\))?\. /))) {
    juste = somme(liste(m[1]));
    if (!triangleExiste(liste(m[1]))) return [`aucun triangle n'a pour côtés ${m[1]} (inégalité triangulaire)`];
  }
  else if ((m = t.match(/contient (\S+) billes rouges et (\S+) billes bleues/))) juste = somme([m[1], m[2]]);
  else if ((m = t.match(/mesure (\S+) cm ; on en coupe (\S+) cm/))) {
    juste = `(${m[1]}) - (${m[2]})`;
    if (!(coef(poly(juste)!, lettresDe(poly(juste)!)[0] ?? "") > 0)) return [`longueur restante ${ecrirePoly(poly(juste))} : pas plausible`];
  } else if ((m = t.match(/longueur (\S+) et pour largeur (\S+)\. Son périmètre s’écrit (.+?)\. /))) {
    juste = `2(${m[1]} + ${m[2]})`;
    const L = poly(m[1]), l = poly(m[2]);
    const p = equiv(m[3], juste) ? [] : [`le périmètre écrit « ${m[3]} » n'est pas 2 × (longueur + largeur)`];
    if (L && l && [...L.values()][0] < [...l.values()][0]) p.push("la longueur est plus petite que la largeur");
    return [...p, ...reponseExpression(q, juste, "périmètre")];
  }
  if (!juste) return cReduire(q);
  return reponseExpression(q, juste, "situation");
}

/** La lettre que l'énoncé définit : « On note t… », « où t désigne… », « à l'aide de t ». */
function lettreDefinie(t: string): string | null {
  return t.match(/(?:(?:On note|On appelle|où|si|lettre|à l’aide de|avec la lettre|en fonction de) |\()([a-z])\b(?! =)/)?.[1] ?? null;
}

/** Défi ★4 : le rôle d'un nombre dans l'expression d'une situation (partie fixe ou ce qui change). */
function cRoleDesNombres(q: Q): string[] {
  const t = texteLisible(q.text);
  const s = situationAffine(t);
  const l = lettreDefinie(t);
  const E = expressionsLitterales(q.text).find((e) => /\d/.test(e) && /[a-z]/.test(e)) ?? null;
  const X = Number(t.match(/(?:le nombre|D’où vient le) (\d+)/)?.[1]);
  if (!s || !l || !Number.isFinite(X)) return ["situation, lettre ou nombre interrogé illisible"];
  const p = verifierSituation(t, E, l);
  if (s.depart === s.pas) p.push("départ et pas égaux : la question est ambiguë");
  if (X !== s.depart && X !== s.pas) return [...p, `le nombre ${X} n'est ni le départ ni le pas`];
  const verbe = s.signe === 1 ? "s’ajoute" : "se retire";
  return [...p, ...qcmUnique(q, (c) => (X === s.pas ? c.startsWith(`ce qui ${verbe} chaque fois que ${l}`) : c.startsWith(`la valeur de départ, quand ${l} vaut 0`)))];
}

/** Défi ★4 : écrire l'expression de la situation, puis la calculer pour la valeur donnée. */
function cSituationPuisValeur(q: Q): string[] {
  const t = texteLisible(q.text);
  const s = situationAffine(t);
  const l = lettreDefinie(t);
  if (!s || !l) return ["situation ou lettre illisible"];
  const E = `${s.depart} ${s.signe === 1 ? "+" : "-"} ${s.pas}${l}`;
  const v = valeursDonnees(t);
  if (!(l in v)) {
    const question = t.split(/(?<=[.?!])\s+/).filter((ph) => ph.endsWith("?"));
    const ns = question.length === 1 ? nombresDe(question[0]) : [];
    if (ns.length !== 1) return [`valeur de ${l} introuvable`];
    v[l] = ns[0];
  }
  const r = valeur(E, v);
  return [...(r != null && r <= 0 ? [`résultat ${r} : pas plausible`] : []), ...reponseNombre(q, r, `${E} pour ${l} = ${v[l]}`)];
}

/** Défi ★5 : une relation entre deux personnes (« 4 ans de moins que Marie », « le double de ce nombre, augmenté de 3 »). */
function cRelation(q: Q): string[] {
  const t = texteLisible(q.text);
  const m = t.match(/^(.+?) (a|possède|a lu|a marqué|a parcouru à vélo|a économisé) ([a-z]) (\S+)\. .+? \2 (.+), soit (.+?) \4\./);
  if (!m) return ["relation illisible"];
  const [, p1, , l, unite, rel, E] = m;
  const phrase = rel
    .replace(/ce nombre/g, l)
    .replace(new RegExp(`que (?:${p1}|${p1.replace(/^L’/, "l’")})$`), `que ${l}`)
    .replace(new RegExp(`^(\\d+) ${unite} de (plus|moins) que`), "$1 de $2 que");
  const juste = traduire(phrase);
  const p: string[] = [];
  if (!juste) return [`relation non comprise : « ${rel} »`];
  if (!equiv(E, juste)) p.push(`« ${E} » ne traduit pas « ${rel} »`);
  const v = valeursDonnees(t);
  const r = valeur(juste, v);
  if (r != null && r <= 0) p.push(`résultat ${r} : pas plausible`);
  return [...p, ...reponseNombre(q, r, `${E} pour ${l} = ${v[l]}`)];
}

/** Défi ★3 : un programme de calcul suivi pas à pas. */
function cProgramme(q: Q): string[] {
  const t = texteLisible(q.text);
  const l = t.match(/(?:Choisir un nombre|noté|Penser à un nombre) ([a-z])\./)?.[1];
  if (!l) return ["nombre de départ illisible"];
  let cur = l;
  const etapes = t.split(/(?<=\.)\s+/).slice(2);
  let n = 0;
  for (const e of etapes) {
    let m: RegExpMatchArray | null;
    if ((m = e.match(/^Multiplier (?:ce nombre|le résultat) par (\d+)\.$/))) cur = `(${cur}) * ${m[1]}`;
    else if ((m = e.match(/^Ajouter (\d+)(?: au résultat| à ce nombre)?\.$/))) cur = `(${cur}) + ${m[1]}`;
    else if ((m = e.match(/^Soustraire (\d+)(?: au résultat| à ce nombre)?\.$/))) cur = `(${cur}) - ${m[1]}`;
    else if (/^Ajouter le nombre de départ\.$/.test(e)) cur = `(${cur}) + ${l}`;
    else if (/^Soustraire le nombre de départ\.$/.test(e)) cur = `(${cur}) - ${l}`;
    else continue;
    n++;
  }
  if (n < 2) return [`programme illisible (${n} étape(s) comprise(s))`];
  return reponseExpression(q, cur, "programme de calcul");
}

/** Défi ★4 : le périmètre d'une figure dont les côtés sont des expressions. */
function cPerimetre(q: Q): string[] {
  const t = texteLisible(q.text);
  let m: RegExpMatchArray | null;
  let juste: string | null = null;
  let cotes: string[] | null = null;
  if ((m = t.match(/rectangle a pour longueur (.+?) et pour largeur (.+?) \(en \w+\)\./))) juste = `2(${m[1]}) + 2(${m[2]})`;
  else if ((m = t.match(/mesure (.+?) m de long et (.+?) m de large\./))) juste = `2(${m[1]}) + 2(${m[2]})`;
  else if ((m = t.match(/triangle a des côtés de longueurs (.+?) \(en \w+\)\./))) juste = somme((cotes = liste(m[1])));
  else if ((m = t.match(/isocèle a deux côtés de longueur (.+?) et une base de longueur (.+?) \(en \w+\)\./))) juste = somme((cotes = [m[1], m[1], m[2]]));
  else if ((m = t.match(/(carré|losange) a pour côté (.+?) \(en \w+\)\./))) juste = `4(${m[2]})`;
  else if ((m = t.match(/pentagone régulier a des côtés de longueur (.+?) \(en \w+\)\./))) juste = `5(${m[1]})`;
  if (!juste) return ["figure non reconnue"];
  const p = cotes && !triangleExiste(cotes) ? [`aucun triangle n'a pour côtés ${cotes.join(", ")}`] : [];
  return [...p, ...reponseExpression(q, juste, "périmètre")];
}

/** Défi ★5 : deux formules de prix, laquelle est la moins chère pour n utilisations ? */
function cDeuxFormules(q: Q): string[] {
  const t = texteLisible(q.text);
  const sans = t.match(/sans abonnement, (\d+) €/)?.[1];
  const avec = t.match(/avec abonnement, (\d+) € par an puis (\d+) €|abonnement annuel de (\d+) € puis (\d+) €/);
  const n = t.match(/n = (\d+)|Pour (\d+) \S+, quelle|prévoit (\d+) /);
  if (!sans || !avec || !n) return ["formules ou nombre d'utilisations illisibles"];
  const P = Number(sans), B = Number(avec[1] ?? avec[3]), A = Number(avec[2] ?? avec[4]), N = Number(n[1] ?? n[2] ?? n[3]);
  const p: string[] = [];
  if (A >= P) p.push("le prix avec abonnement n'est pas plus bas à l'unité : la comparaison n'a pas d'intérêt");
  const ecrit = t.match(/s’écrivent (\d+)n et (\d+) \+ (\d+)n/);
  if (ecrit && (Number(ecrit[1]) !== P || Number(ecrit[2]) !== B || Number(ecrit[3]) !== A)) p.push("les expressions écrites ne sont pas celles des formules");
  const sansPrix = P * N, avecPrix = B + A * N;
  const bon = sansPrix < avecPrix ? "la formule sans abonnement" : sansPrix > avecPrix ? "la formule avec abonnement" : "les deux coûtent autant";
  return [...p, ...qcmUnique(q, (c) => c === bon)];
}

export const CORRECTEURS: CorrecteursMaths = avecReglesLitteral({
  litteral_expression_defi_open_1: cRoleDesNombres,
  litteral_expression_defi_tpl_2: cSituationPuisValeur,
  litteral_expression_defi_tpl_3: cRelation,
  litteral_expression_defi_tpl_4: cTraduire,
  litteral_expression_defi_tpl_5: cProgramme,
  litteral_expression_defi_tpl_6: cPerimetre,
  litteral_expression_defi_tpl_7: cDeuxFormules,
  litteral_expression_reduire_tpl_1: cReduire,
  litteral_expression_reduire_tpl_2: cReduire,
  litteral_expression_reduire_tpl_3: cReduire,
  litteral_expression_reduire_tpl_4: cReduireSituation,
  litteral_expression_reduire_tpl_5: cReduire,
  litteral_expression_substituer_tpl_1: cSubstituer,
  litteral_expression_substituer_tpl_2: cSubstituer,
  litteral_expression_substituer_tpl_3: cSubstituer,
  litteral_expression_substituer_tpl_4: cSubstituer,
  litteral_expression_substituer_tpl_5: cSubstituer,
  litteral_expression_traduire_tpl_1: cTraduire,
  litteral_expression_traduire_tpl_2: cTraduire,
  litteral_expression_traduire_tpl_3: cTraduire,
  litteral_expression_traduire_tpl_4: cTraduire,
  litteral_expression_traduire_tpl_5: cTraduireParentheses,
  litteral_expression_comprendre_tpl_1: cLaLettre,
  litteral_expression_comprendre_tpl_2: cCoefficient,
  litteral_expression_comprendre_tpl_3: cLitteralOuNumerique,
  litteral_expression_comprendre_tpl_4: cCoefficient,
});
