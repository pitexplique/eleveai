import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

// LES CORRECTEURS DE puissances.bank.ts (notion puissance_ecriture, 08/10/2026).
// Ils relisent dans le TEXTE l'écriture à calculer (« 5³ + 3² », « −4² »,
// « 2,5 × 10⁴ », « 1/16 », « 646 000 »…), la recalculent avec leur propre
// lecteur d'expressions (exposants en exposant Unicode, « − » de signe, « ÷ »,
// barre de fraction), et vérifient la réponse attendue, l'unicité de la bonne
// proposition d'un QCM (aucun leurre de même valeur), la cohérence d'une
// situation (« 8 choix… après 3 étapes… 8³ ») et les faits du monde cités
// (« Un hectare mesure 10⁴ m² », « la distance Terre-Soleil »). Vide = juste.

type Q = TutorGeneratedQuestionV4;

const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
const SUP_CLASSE = "⁰¹²³⁴⁵⁶⁷⁸⁹⁻";
export const sup = (n: number) =>
  (n < 0 ? "⁻" : "") + String(Math.abs(n)).split("").map((d) => SUP[Number(d)]).join("");
export const egalRel = (a: number, b: number) => Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b));

/* ── Lecteur d'expressions : 3², −4², (−5)³, 2,5 × 10⁴, 10⁶ ÷ 10², 1/16, 7 + 5 × 3⁴ ── */
type Tok = { t: "n"; v: number } | { t: "e"; v: number } | { t: "o"; v: string };

function jetons(s0: string): Tok[] | null {
  const s = s0.replace(/[−–]/g, "-").replace(/ | /g, " ");
  const out: Tok[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === " ") {
      i++;
      continue;
    }
    const m = s.slice(i).match(/^\d{1,3}(?: \d{3})+(?:,\d+)?(?![\d])|^\d+(?:,\d+)?/);
    if (m) {
      out.push({ t: "n", v: Number(m[0].replace(/ /g, "").replace(",", ".")) });
      i += m[0].length;
      continue;
    }
    const e = s.slice(i).match(/^[⁻]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+/);
    if (e) {
      const neg = e[0].startsWith("⁻");
      const v = Number([...e[0].replace("⁻", "")].map((d) => SUP.indexOf(d)).join(""));
      out.push({ t: "e", v: neg ? -v : v });
      i += e[0].length;
      continue;
    }
    if ("+-×÷/()*x".includes(c)) {
      out.push({ t: "o", v: c === "*" || c === "x" ? "×" : c });
      i++;
      continue;
    }
    return null;
  }
  return out;
}

/** Valeur d'une écriture numérique, ou null si illisible. −4² = −(4²). */
export function evaluer(s: string): number | null {
  const tk0 = jetons(s);
  if (!tk0 || !tk0.length) return null;
  const tk: Tok[] = tk0;
  let k = 0;
  const voir = () => tk[k];
  const op = (v: string) => voir()?.t === "o" && (voir() as { v: string }).v === v;
  function primaire(): number {
    const x = voir();
    if (!x) throw new Error("fin");
    if (x.t === "n") {
      k++;
      return x.v;
    }
    if (op("(")) {
      k++;
      const v = somme();
      if (!op(")")) throw new Error(")");
      k++;
      return v;
    }
    throw new Error("primaire");
  }
  function puissance(): number {
    let b = primaire();
    while (voir()?.t === "e") {
      b = Math.pow(b, (tk[k] as { v: number }).v);
      k++;
    }
    return b;
  }
  function unaire(): number {
    if (op("-")) {
      k++;
      return -unaire();
    }
    if (op("+")) {
      k++;
      return unaire();
    }
    return puissance();
  }
  function produit(): number {
    let v = unaire();
    while (op("×") || op("÷") || op("/")) {
      const o = (tk[k] as { v: string }).v;
      k++;
      const w = unaire();
      v = o === "×" ? v * w : v / w;
    }
    return v;
  }
  function somme(): number {
    let v = produit();
    while (op("+") || op("-")) {
      const o = (tk[k] as { v: string }).v;
      k++;
      const w = produit();
      v = o === "+" ? v + w : v - w;
    }
    return v;
  }
  try {
    const v = somme();
    return k === tk.length && Number.isFinite(v) ? v : null;
  } catch {
    return null;
  }
}

/** Les écritures numériques du texte qui contiennent une puissance (ou une barre si `barre`). */
export function ecritures(t: string, barre = false): string[] {
  const runs = t.match(/[(−\-]*\d[\d ,×÷+−\-()/⁰¹²³⁴⁵⁶⁷⁸⁹⁻]*/g) ?? [];
  const out: string[] = [];
  for (let r of runs) {
    r = r.replace(/[ ,]+$/, "").trim();
    // parenthèses en trop au bord (« (soit 3²) »)
    while (r.endsWith(")") && (r.match(/\(/g) ?? []).length < (r.match(/\)/g) ?? []).length) r = r.slice(0, -1).trim();
    while (r.startsWith("(") && (r.match(/\(/g) ?? []).length > (r.match(/\)/g) ?? []).length) r = r.slice(1).trim();
    if (/[\d)][⁰¹²³⁴⁵⁶⁷⁸⁹⁻]/.test(r) || (barre && /\d\s*\/\s*\d/.test(r))) out.push(r);
  }
  return out;
}

/** Les nombres « ordinaires » du texte (hors puissances), avec les ordinaux « 7e ». */
export function nombresSimples(t: string): number[] {
  return [
    ...t.matchAll(/(?<![\d,⁰¹²³⁴⁵⁶⁷⁸⁹×÷])(\d{1,3}(?: \d{3})+|\d+)(?:,(\d+))?(?![\d,⁰¹²³⁴⁵⁶⁷⁸⁹⁻])(?! ?×)/g),
  ]
    .filter((m) => !/[⁰¹²³⁴⁵⁶⁷⁸⁹]/.test(t[m.index! - 1] ?? ""))
    .map((m) => Number(m[1].replace(/ /g, "") + (m[2] ? "." + m[2] : "")));
}

/** La réponse numérique attendue : toutes les variantes doivent valoir `v`. */
function nombre(q: Q, v: number): string[] {
  const p: string[] = [];
  if (v == null || !Number.isFinite(v)) return [`calcul impossible à refaire : ${q.text}`];
  for (const e of q.expected) {
    const w = evaluer(String(e));
    if (w == null || !egalRel(w, v)) p.push(`attendu « ${e} », le texte donne ${v}`);
  }
  if (q.format !== "qcm" && q.comparator !== "number_equal") p.push(`comparateur ${q.comparator} pour un nombre`);
  return p;
}

/** QCM : la réponse attendue est juste et c'est la SEULE proposition juste. */
function qcm(q: Q, juste: (c: string) => boolean, quoi: string): string[] {
  const p: string[] = [];
  if (q.format !== "qcm") return nombreOuTexte(q, juste, quoi);
  if (!juste(String(q.expected[0]))) p.push(`attendu « ${q.expected[0]} » faux (juste : ${quoi})`);
  const bons = (q.choices ?? []).filter(juste);
  if (bons.length !== 1) p.push(`${bons.length} proposition(s) justes (${quoi}) : ${bons.join(" | ")}`);
  return p;
}
function nombreOuTexte(q: Q, juste: (c: string) => boolean, quoi: string): string[] {
  return q.expected.every((e) => juste(String(e))) ? [] : [`attendu « ${q.expected.join(" / ")} » faux (juste : ${quoi})`];
}
const memeValeur = (v: number) => (c: string) => {
  const w = evaluer(c);
  return w != null && egalRel(w, v);
};

/** Une seule écriture à puissance dans le texte : sa valeur. */
function uneEcriture(t: string, laquelle: "premiere" | "derniere" = "derniere"): { e: string; v: number } | null {
  const es = ecritures(t);
  if (!es.length) return null;
  const e = laquelle === "premiere" ? es[0] : es[es.length - 1];
  const v = evaluer(e);
  return v == null ? null : { e, v };
}

/* ── Faits du monde cités ─────────────────────────────────────────────────── */
// Valeurs vraies (sources usuelles), comparées à 4 % près.
const FAITS: [RegExp, number][] = [
  [/Terre-Lune/, 384_400],
  [/diamètre de la Terre/, 12_742],
  [/Terre-Soleil/, 149_600_000],
  [/longueur de La Réunion/, 71],
  [/Piton des Neiges/, 3.07],
  [/Everest/, 8_849],
  [/population de la France/, 68_400_000],
  [/population mondiale/, 8_100_000_000],
  [/longueur de la Seine/, 777],
  [/diamètre de la Lune/, 3_474],
  [/vitesse de la lumière/, 299_792],
  [/tour de la Terre/, 40_075],
  [/tour Eiffel/, 330],
  [/secondes dans une journée/, 86_400],
  [/mont Blanc/, 4_806],
  [/rayon du Soleil/, 696_000],
  [/battements du cœur en un jour/, 100_000],
  [/longueur de la Loire/, 1_006],
];
function faitDuMonde(t: string, v: number): string[] {
  const f = FAITS.find(([re]) => re.test(t));
  if (!f) return [`grandeur inconnue du correcteur : ${t}`];
  return Math.abs(v - f[1]) / f[1] <= 0.04 ? [] : [`valeur ${v} citée, la vraie est ${f[1]}`];
}

// Conversions citées : « Un hectare mesure 10⁴ m² » → exposant vrai.
const UNITES: [RegExp, number][] = [
  [/Un mètre compte # centimètres/, 2],
  [/euro vaut # centimes/, 2],
  [/siècle dure/, 2],
  [/kilomètre compte # mètres\./, 3],
  [/kilogramme vaut/, 3],
  [/litre contient # millilitres/, 3],
  [/millénaire/, 3],
  [/hectare mesure # m²/, 4],
  [/mètre carré contient # cm²/, 4],
  [/chevelure/, 5],
  [/kilomètre compte # centimètres/, 5],
  [/kilomètre compte # millimètres/, 6],
  [/mètre cube contient # cm³/, 6],
  [/mégaoctet/, 6],
  [/Dix kilomètres font # millimètres/, 7],
  [/agglomération/, 7],
  [/kilomètre carré contient # dm²/, 8],
  [/hectare contient # cm²/, 8],
  [/milliard/, 9],
  [/gigaoctet/, 9],
  [/kilomètre compte # micromètres/, 9],
  [/décilitre vaut/, -1],
  [/décimètre vaut/, -1],
  [/centimètre vaut/, -2],
  [/centime vaut/, -2],
  [/centilitre vaut/, -2],
  [/millimètre vaut/, -3],
  [/milligramme vaut/, -3],
  [/milliseconde vaut/, -3],
  [/feuille de papier a une épaisseur/, -4],
  [/balance de laboratoire/, -4],
  [/globule rouge/, -5],
  [/grain de pollen/, -5],
  [/micromètre vaut/, -6],
  [/microgramme vaut/, -6],
  [/petite bactérie/, -6],
];
function conversion(t: string, v: number): string[] {
  const t2 = t.replace(/\d[\d  ,]*[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]*(?= )/g, "#");
  const f = UNITES.find(([re]) => re.test(t2));
  if (!f) return []; // phrase sans fait cité (« Que vaut 10⁷ ? »)
  return egalRel(v, Math.pow(10, f[1])) ? [] : [`fait faux : ${v} au lieu de 10${sup(f[1])} dans « ${t} »`];
}

/* ── puissance_comprendre ─────────────────────────────────────────────────── */
function corrigerDevelopper(q: Q): string[] {
  const m = q.text.match(/(?<![\w])(\d+|[a-z])([⁰¹²³⁴⁵⁶⁷⁸⁹]+)/);
  if (!m) return [`puissance illisible : ${q.text}`];
  const n = Number([...m[2]].map((d) => SUP.indexOf(d)).join(""));
  const juste = Array(n).fill(m[1]).join("×");
  const p: string[] = [];
  for (const e of q.expected) {
    const facteurs = String(e).replace(/\s/g, "").split(m[1] === "x" ? /[×*]/ : /[×*x]/);
    if (facteurs.length !== n || facteurs.some((f) => f !== m[1])) p.push(`variante « ${e} » ≠ ${juste}`);
  }
  return p;
}

function corrigerCondenser(q: Q): string[] {
  const m = q.text.match(/(\d+|[a-z])((?: × \1(?![\w]))+)/);
  if (!m) return [`produit illisible : ${q.text}`];
  const n = m[0].split(" × ").length;
  const juste = `${m[1]}${sup(n)}`;
  return qcm(q, (c) => c.replace(/\s/g, "") === juste, juste);
}

/* ── puissance_calculer ───────────────────────────────────────────────────── */
/** Une situation (« 8 choix… 3 étapes… 8³ ») : base et exposant lus ailleurs dans le texte. */
function situation(t: string, e: string): string[] {
  const m = e.match(/^(\d+)([⁰¹²³⁴⁵⁶⁷⁸⁹]+)$/);
  const autres = nombresSimples(t);
  if (!m || !autres.length) return [];
  const b = Number(m[1]);
  const n = Number([...m[2]].map((d) => SUP.indexOf(d)).join(""));
  const p: string[] = [];
  if (!autres.includes(b)) p.push(`la base ${b} n'apparaît pas dans la situation`);
  // l'exposant est écrit (« 3 étapes »), ou la base est répétée n fois (« 7 entrées, 7 plats et 7 desserts »)
  const repetitions = autres.filter((x) => x === b).length;
  if (!autres.includes(n) && repetitions !== n && !(n === 2 && /carr/.test(t)) && !(n === 3 && /cube|cubique|couches/.test(t)))
    p.push(`l'exposant ${n} n'apparaît pas dans la situation`);
  return p;
}

function corrigerCalculer(q: Q): string[] {
  const r = uneEcriture(q.text);
  if (!r) return [`écriture illisible : ${q.text}`];
  return [...(q.format === "qcm" ? qcm(q, memeValeur(r.v), String(r.v)) : nombre(q, r.v)), ...situation(q.text, r.e)];
}

function corrigerSigne(q: Q): string[] {
  const es = ecritures(q.text);
  if (!es.length) return [`écriture illisible : ${q.text}`];
  const e = /première/.test(q.text) ? es[0] : /seconde|deuxième/.test(q.text) ? es[1] : es[es.length - 1];
  const v = evaluer(e ?? "");
  if (v == null) return [`écriture illisible : ${e}`];
  return qcm(q, memeValeur(v), `${e} = ${v}`);
}

/* ── puissance_exposant_negatif ───────────────────────────────────────────── */
function corrigerFractionPuissance(q: Q): string[] {
  const es = ecritures(q.text, true);
  if (!es.length) return [`écriture illisible : ${q.text}`];
  const v = evaluer(es[0]);
  if (v == null) return [`écriture illisible : ${es[0]}`];
  const p = qcm(q, memeValeur(v), `${es[0]} = ${v}`);
  const base = q.text.match(/(?:puissance de|base) (\d+)/);
  if (base && !String(q.expected[0]).startsWith(base[1])) p.push(`la base demandée est ${base[1]}`);
  return p;
}

function corrigerDecimalNegatif(q: Q): string[] {
  const e = ecritures(q.text).find((x) => x.includes("⁻"));
  const v = e ? evaluer(e) : null;
  if (v == null) return [`écriture à exposant négatif illisible : ${q.text}`];
  return [...nombre(q, v), ...conversion(q.text, v)];
}

/* ── puissance_dix ────────────────────────────────────────────────────────── */
function corrigerValeurDix(q: Q): string[] {
  const r = uneEcriture(q.text);
  if (!r) return [`écriture illisible : ${q.text}`];
  return [...nombre(q, r.v), ...conversion(q.text, r.v)];
}

function corrigerEcrireDix(q: Q): string[] {
  const ns = nombresSimples(q.text);
  if (!ns.length) return [`nombre illisible : ${q.text}`];
  const N = Math.max(...ns);
  const k = Math.round(Math.log10(N));
  if (!egalRel(Math.pow(10, k), N)) return [`${N} n'est pas une puissance de 10`];
  return [...qcm(q, (c) => c.replace(/\s/g, "") === `10${sup(k)}`, `10${sup(k)}`), ...conversion(q.text, N)];
}

/* ── puissance_notation_scientifique ──────────────────────────────────────── */
const estScientifique = (c: string) => /^-?[1-9](?:,\d+)? × 10[⁻]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+$/.test(c.replace(/−/g, "-").trim());

function corrigerScientifique(q: Q): string[] {
  const ns = nombresSimples(q.text);
  if (ns.length !== 1) return [`il faut un seul nombre dans le texte (lus : ${ns.join(", ")})`];
  const N = ns[0];
  return qcm(q, (c) => estScientifique(c) && memeValeur(N)(c), `notation scientifique de ${N}`);
}

/* ── puissance_comparer ───────────────────────────────────────────────────── */
function sensCherche(t: string): "min" | "max" | null {
  const MIN = /petit|proche|court|inférieur|moins|faible|bas|léger/;
  const MAX = /grand|supérieur|peuplé|loin|éloign|long|lourd|élevé|haut|fort|plus d/;
  if (/\bmoins\b/.test(t)) return "min"; // « la moins peuplée »
  const lire = (s: string) => (MIN.test(s) && !MAX.test(s) ? "min" : MAX.test(s) && !MIN.test(s) ? "max" : null);
  // d'abord le texte entier ; s'il dit les deux, la phrase de la question seule
  return lire(t) ?? lire(t.split(/(?<=[.!])\s/).filter((s) => /\?|Choisis|Coche|Donne/.test(s)).join(" "));
}

function corrigerComparer(q: Q): string[] {
  const es = ecritures(q.text);
  const vs = es.map(evaluer);
  if (es.length !== 2 || vs.some((v) => v == null)) return [`il faut deux nombres (lus : ${es.join(" | ")})`];
  if (egalRel(vs[0]!, vs[1]!)) return ["les deux nombres sont égaux"];
  const s = sensCherche(q.text);
  if (!s) return [`sens de la comparaison illisible : ${q.text}`];
  const v = s === "min" ? Math.min(vs[0]!, vs[1]!) : Math.max(vs[0]!, vs[1]!);
  const p = qcm(q, memeValeur(v), `${s} = ${v}`);
  if (!es.every((e) => estScientifique(e))) p.push(`nombre hors notation scientifique : ${es.join(" | ")}`);
  return p;
}

function corrigerRanger(q: Q): string[] {
  const es = ecritures(q.text);
  const vs = es.map(evaluer);
  if (es.length !== 3 || vs.some((v) => v == null)) return [`il faut trois nombres (lus : ${es.join(" | ")})`];
  if (new Set(vs).size !== 3) return ["deux nombres égaux"];
  const croissant = /du plus petit au plus grand|ordre croissant/.test(q.text);
  if (!croissant && !/du plus grand au plus petit|ordre décroissant/.test(q.text)) return ["sens du rangement illisible"];
  const juste = (c: string) => {
    const parts = c.split(croissant ? " < " : " > ");
    if (parts.length !== 3) return false;
    const ws = parts.map(evaluer);
    if (ws.some((w) => w == null)) return false;
    if (new Set(parts).size !== 3 || !parts.every((x) => es.includes(x))) return false;
    return croissant ? ws[0]! < ws[1]! && ws[1]! < ws[2]! : ws[0]! > ws[1]! && ws[1]! > ws[2]!;
  };
  return qcm(q, juste, croissant ? "ordre croissant" : "ordre décroissant");
}

/* ── puissance_calcul ─────────────────────────────────────────────────────── */
/** Le calcul demandé : l'écriture à opérations s'il y en a une (« Calcule 10⁶ ÷ 10² ») ;
 *  sinon la situation (« 3³ lots de 10² balles » : produit ; « partage », « seaux de » : quotient). */
function calculDemande(t: string): number | null {
  const es = ecritures(t);
  const sansPuissance = (t.match(/\d[\d ,×÷]*\d(?![\d⁰¹²³⁴⁵⁶⁷⁸⁹⁻])/g) ?? []).filter(
    (e) => /[×÷]/.test(e) && !es.some((x) => x.includes(e)),
  );
  const avecOp = [...es, ...sansPuissance].filter((e) => /\S\s*[×÷+−-]\s*\S/.test(e));
  if (avecOp.length) return evaluer(avecOp[avecOp.length - 1]);
  const facteurs = [...es.map(evaluer), ...nombresSimples(t)];
  if (facteurs.some((v) => v == null) || facteurs.length !== 2) return es.length === 1 && facteurs.length === 1 ? facteurs[0] : null;
  const [a, b] = facteurs as number[];
  return /partage|vidé avec|réparties en|coupé en morceaux/.test(t) ? a / b : a * b;
}

function corrigerProduit(q: Q): string[] {
  const v = calculDemande(q.text);
  if (v == null) return [`calcul illisible : ${q.text}`];
  return q.format === "qcm" ? qcm(q, memeValeur(v), String(v)) : nombre(q, v);
}

function corrigerMultiplierDix(q: Q): string[] {
  const r = uneEcriture(q.text);
  if (!r) return [`écriture illisible : ${q.text}`];
  const p = nombre(q, r.v);
  if (Math.abs(r.v - Math.round(r.v)) > 1e-9 && q.text.match(/habitants|coureurs|abeilles|livres|bouteilles|visites|fois/))
    p.push(`${r.v} : un effectif doit être entier`);
  return p;
}

function corrigerSomme(q: Q): string[] {
  const r = uneEcriture(q.text);
  if (!r) return [`écriture illisible : ${q.text}`];
  const p = nombre(q, r.v);
  const carre = q.text.match(/carré de (\d+) m de côté.*?côté de (\d+) m/);
  if (carre && !egalRel(r.v, (Number(carre[1]) + Number(carre[2])) ** 2)) p.push("l'aire agrandie ne correspond pas au carré décrit");
  return p;
}

/* ── puissance_defi ───────────────────────────────────────────────────────── */
function corrigerDoublement(q: Q): string[] {
  const ns = nombresSimples(q.text);
  const fois = q.text.match(/(?:après|au bout de) (\d+) [a-zéû]+/i);
  if (!ns.length || !fois) return [`situation illisible : ${q.text}`];
  const depart = ns[0];
  const n = Number(fois[1]);
  const p = nombre(q, depart * 2 ** n);
  const kase = q.text.match(/n° (\d+), après (\d+) doublements/);
  if (kase && Number(kase[1]) !== Number(kase[2]) + 1) p.push(`n° ${kase[1]} et ${kase[2]} doublements ne vont pas ensemble`);
  return p;
}

function corrigerOrdreScientifique(q: Q): string[] {
  const es = ecritures(q.text);
  let v: number | null;
  if (es.length) v = evaluer(es[0]);
  else {
    // le premier nombre : la grandeur (« puissance de 10 » vient après)
    v = nombresSimples(q.text)[0] ?? null;
  }
  if (v == null) return [`grandeur illisible : ${q.text}`];
  const k = Math.floor(Math.log10(v) + 1e-12);
  return [...qcm(q, (c) => c.replace(/\s/g, "") === `10${sup(k)}`, `10${sup(k)}`), ...faitDuMonde(q.text, v)];
}

function corrigerPliage(q: Q): string[] {
  const ord = q.text.match(/(\d+)e (?:génération|vague)/);
  const n = ord
    ? Number(ord[1])
    : Number(q.text.match(/(\d+) (?:coupes|fois|chiffres|interrupteurs|questions|étapes|tours)/)?.[1] ?? NaN);
  if (!Number.isFinite(n)) return [`nombre d'étapes illisible : ${q.text}`];
  if (/vague/.test(q.text) && !/2 nouvelles personnes/.test(q.text)) return ["chaîne d'entraide : chacun doit prévenir 2 personnes"];
  return qcm(q, memeValeur(2 ** n), `2${sup(n)} = ${2 ** n}`);
}

export const CORRECTEURS: CorrecteursMaths = {
  "4e_puissance_comprendre_tpl_1_developper": corrigerDevelopper,
  "4e_puissance_comprendre_tpl_2_condenser": corrigerCondenser,
  "4e_puissance_calculer_tpl_1": corrigerCalculer,
  "4e_puissance_calculer_tpl_2_piege_multiplication": corrigerCalculer,
  "4e_puissance_calculer_tpl_3_signe": corrigerSigne,
  "4e_puissance_exposant_negatif_tpl_1_fraction": corrigerFractionPuissance,
  "4e_puissance_exposant_negatif_tpl_2_decimal": corrigerDecimalNegatif,
  "4e_puissance_dix_tpl_1_valeur": corrigerValeurDix,
  "4e_puissance_dix_tpl_2_ecrire": corrigerEcrireDix,
  "4e_puissance_dix_tpl_3_multiplier": corrigerMultiplierDix,
  "4e_puissance_notation_scientifique_tpl_1_grand": corrigerScientifique,
  "4e_puissance_notation_scientifique_tpl_2_petit": corrigerScientifique,
  "4e_puissance_comparer_tpl_1_exposants": corrigerComparer,
  "4e_puissance_comparer_tpl_2_mantisses": corrigerComparer,
  "4e_puissance_comparer_tpl_3_ranger": corrigerRanger,
  "4e_puissance_calcul_tpl_1_produit_dix": corrigerProduit,
  "4e_puissance_calcul_tpl_2_mixte": corrigerProduit,
  "4e_puissance_calcul_tpl_3_somme": corrigerSomme,
  "4e_puissance_defi_tpl_1_doublement": corrigerDoublement,
  "4e_puissance_defi_tpl_2_ordre_scientifique": corrigerOrdreScientifique,
  "4e_puissance_defi_tpl_3_pliage": corrigerPliage,
};
