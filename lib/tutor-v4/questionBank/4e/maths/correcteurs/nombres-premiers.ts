import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE nombres-premiers.bank.ts (notion nombre_premier, 08/10/2026).
// Ils relisent les nombres DANS LE TEXTE (et le tableau de divisions quand il y en
// a un), puis refont le travail sans le gabarit : primalité par essais de
// division, comptage des premiers d'une plage, décomposition (facteurs premiers
// ET produit qui redonne le nombre), fraction irréductible par le PGCD, nombre
// de diviseurs compté un par un. Vide = juste.

type Q = TutorGeneratedQuestionV4;

// ─── outils d'arithmétique (aussi pour divisibilite.ts) ─────────────────────

export function estPremier(n: number): boolean {
  if (!Number.isInteger(n) || n < 2) return false;
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return true;
}

export function diviseurs(n: number): number[] {
  const l: number[] = [];
  for (let d = 1; d <= n; d++) if (n % d === 0) l.push(d);
  return l;
}

export function pgcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

/** Les entiers d'un texte, dans l'ordre (« 1 000 » n'apparaît pas dans ces banques). */
export const entiers = (t: string) => (String(t).match(/\d+/g) ?? []).map(Number);

/** « 2 × 2 × 3 » → [2, 2, 3] ; null si ce n'est pas un produit d'entiers. */
export function lireProduit(s: string): number[] | null {
  const m = String(s).trim();
  if (!/^\d+(?:\s*[×x*]\s*\d+)*$/.test(m)) return null;
  return m.split(/\s*[×x*]\s*/).map(Number);
}

const produit = (f: number[]) => f.reduce((a, b) => a * b, 1);

/** Une décomposition juste : tous les facteurs premiers, produit = n. */
export const decompositionJuste = (f: number[] | null, n: number) =>
  !!f && f.length > 0 && f.every(estPremier) && produit(f) === n;

/** Le seul nombre (répété) dont parle le texte. */
function nombreUnique(t: string): { n: number | null; pb: string[] } {
  const ns = [...new Set(entiers(t))];
  return ns.length === 1 ? { n: ns[0], pb: [] } : { n: null, pb: [`un seul nombre attendu dans le texte, lus : ${ns.join(", ")}`] };
}

// ─── premier_definition ─────────────────────────────────────────────────────

function corrigerEstPremier(q: Q): string[] {
  const { n, pb } = nombreUnique(q.text);
  if (n == null) return pb;
  const juste = estPremier(n) ? "oui, il est premier" : "non, il n'est pas premier";
  const p = qcmUnique(q, (c) => c === juste);
  if (q.expected[0] !== juste) p.push(`attendu « ${q.expected[0] } » : ${n} ${estPremier(n) ? "est" : "n'est pas"} premier`);
  // Le rangement en rectangle n'est possible que si n n'est pas premier : cohérent par construction, mais n plausible.
  if (n < 2 || n > 250) p.push(`${n} : hors de la plage plausible`);
  return p;
}

function corrigerListe(q: Q): string[] {
  const choix = (q.choices ?? []).map(Number);
  const dansTexte = entiers(q.text);
  const p: string[] = [];
  for (const c of choix) if (!dansTexte.includes(c)) p.push(`la proposition ${c} n'est pas dans la liste du texte`);
  // Que cherche-t-on ? Le NON premier, ou le SEUL premier.
  const chercheNonPremier = /n'est PAS|n'est pas (?:un nombre )?premier|tous des nombres premiers/.test(q.text);
  const chercheP = /EST premier|est un nombre premier|[Uu]n seul est premier|seul nombre premier|aucun des nombres/.test(q.text);
  if (chercheNonPremier === chercheP) return [...p, "question illisible : on cherche le premier ou le non-premier ?"];
  const juste = (c: string) => (chercheNonPremier ? !estPremier(Number(c)) : estPremier(Number(c)));
  return [...p, ...qcmUnique(q, juste)];
}

// ─── premier_determiner ─────────────────────────────────────────────────────

function verdictJuste(c: string, n: number): boolean {
  if (/^premier/.test(c)) return estPremier(n);
  const m = c.match(/^pas premier : il est divisible par (\d+)$/);
  if (m) return !estPremier(n) && n % Number(m[1]) === 0 && Number(m[1]) !== 1 && Number(m[1]) !== n;
  return false; // « on ne peut pas savoir… » : toujours faux
}

function corrigerTester(q: Q): string[] {
  const { n, pb } = nombreUnique(q.text);
  if (n == null) return pb;
  const p = qcmUnique(q, (c) => verdictJuste(c, n));
  // Le tableau : on teste 2, 3, 5, 7, et 11² dépasse 100 ≥ n.
  if (n >= 100) p.push(`${n} ⩾ 100 : le tableau « 11 : inutile » ne vaut plus`);
  const rows = ((q.canvas as any)?.rows ?? []) as { values: string[] }[];
  for (const r of rows) {
    const m = r.values[1]?.match(/^(\d+)² = (\d+) ([⩽>]) 100$/);
    if (!m) continue;
    const carre = Number(m[1]) ** 2;
    if (carre !== Number(m[2])) p.push(`tableau : ${m[1]}² ≠ ${m[2]}`);
    if ((carre <= 100) !== (m[3] === "⩽")) p.push(`tableau : comparaison fausse « ${r.values[1]} »`);
  }
  return p;
}

function corrigerCombien(q: Q): string[] {
  const ns = entiers(q.text);
  if (ns.length !== 2 || ns[0] >= ns[1]) return [`deux bornes attendues, lues : ${ns.join(", ")}`];
  const [a, b] = ns;
  if (estPremier(a) || estPremier(b)) return [`borne première (${a}, ${b}) : « entre » devient ambigu`];
  let compte = 0;
  for (let k = a; k <= b; k++) if (estPremier(k)) compte++;
  return Number(q.expected[0]) === compte ? [] : [`attendu « ${q.expected[0]} », il y a ${compte} premiers de ${a} à ${b}`];
}

// ─── premier_decomposer ─────────────────────────────────────────────────────

function corrigerProduit(q: Q): string[] {
  const { n, pb } = nombreUnique(q.text);
  if (n == null) return pb;
  const p = qcmUnique(q, (c) => decompositionJuste(lireProduit(c), n));
  // Le tableau des divisions successives : « on divise » ÷ « par » = « il reste », et on finit sur 1.
  const rows = ((q.canvas as any)?.rows ?? []) as { values: string[] }[];
  let attendu = n;
  for (const r of rows) {
    const [a, d, reste] = r.values.map(Number);
    if (a !== attendu) p.push(`tableau : on devait diviser ${attendu}, il montre ${a}`);
    if (!estPremier(d) || a / d !== reste) p.push(`tableau : ${a} ÷ ${d} ≠ ${reste} ou ${d} non premier`);
    attendu = reste;
  }
  if (rows.length && attendu !== 1) p.push(`tableau : il ne finit pas sur 1 (${attendu})`);
  return p;
}

function corrigerSimplifier(q: Q): string[] {
  const m = q.text.match(/\\frac\{(\d+)\}\{(\d+)\}/);
  if (!m) return ["fraction illisible dans le texte"];
  const [num, den] = [Number(m[1]), Number(m[2])];
  const g = pgcd(num, den);
  if (g === 1) return [`${num}/${den} est déjà irréductible`];
  if (num >= den) return [`${num} ⩾ ${den} : ce n'est pas une part`];
  const cible = q.text.match(/(numérateur|dénominateur)/)?.[1];
  if (!cible) return ["on ne sait pas si l'on demande le numérateur ou le dénominateur"];
  const juste = cible === "numérateur" ? num / g : den / g;
  const p: string[] = [];
  if (Number(q.expected[0]) !== juste) p.push(`attendu « ${q.expected[0]} », le ${cible} irréductible est ${juste}`);
  // La situation « num … sur den » doit porter les mêmes nombres.
  const autres = entiers(q.text.replace(/\$[^$]*\$/g, " "));
  for (const x of autres) if (x !== num && x !== den) p.push(`nombre ${x} étranger à la fraction`);
  return p;
}

// ─── premier_defi ───────────────────────────────────────────────────────────

/** « n = 2 × 2 × 3 », « se décompose en … », « la décomposition est … ». */
function lireDecomposition(t: string): { n: number; f: number[] } | null {
  const m =
    t.match(/(\d+) = (\d+(?: × \d+)+)/) ??
    t.match(/(\d+) se décompose en (\d+(?: × \d+)+)/) ??
    t.match(/(\d+), dont la décomposition est (\d+(?: × \d+)+)/);
  return m ? { n: Number(m[1]), f: lireProduit(m[2])! } : null;
}

function corrigerNbDiviseurs(q: Q): string[] {
  const d = lireDecomposition(q.text);
  if (!d) return ["décomposition illisible"];
  const p: string[] = [];
  if (!decompositionJuste(d.f, d.n)) p.push(`la décomposition ${d.f.join(" × ")} ne redonne pas ${d.n} en facteurs premiers`);
  const juste = diviseurs(d.n).length;
  if (Number(q.expected[0]) !== juste) p.push(`attendu « ${q.expected[0]} », ${d.n} a ${juste} diviseurs`);
  return p;
}

// Les affirmations du vrai/faux, jugées ici à nouveau (et vérifiées à la main
// ou par le calcul pour les cas numériques).
const VERITES: Record<string, boolean> = {
  "Tous les nombres premiers sont impairs.": false,
  "Tous les nombres impairs sont premiers.": false,
  "Le seul nombre premier pair est 2.": true,
  "Il existe un plus grand nombre premier.": false,
  "Un nombre premier n'a aucun diviseur.": false,
  "Deux nombres premiers différents n'ont aucun diviseur commun autre que 1.": true,
  "1 est le plus petit nombre premier.": false,
  "Le produit de deux nombres premiers n'est jamais premier.": true,
  "La somme de deux nombres premiers est toujours paire.": false,
  "Un nombre qui se termine par 7 est toujours premier.": false,
  "Un nombre premier plus grand que 5 se termine par 1, 3, 7 ou 9.": true,
  "Tout nombre entier supérieur ou égal à 2 peut s'écrire comme un produit de nombres premiers.": true,
  "Un nombre a une seule décomposition en facteurs premiers, à l'ordre des facteurs près.": true,
  "Un nombre divisible par 6 ne peut pas être premier.": true,
  "Le carré d'un nombre premier est encore premier.": false,
  "Tout nombre premier plus grand que 2 est impair.": true,
  "51 est un nombre premier.": estPremier(51),
  "91 est un nombre premier.": estPremier(91),
  "Entre 20 et 30, il y a exactement deux nombres premiers.": [21, 22, 23, 24, 25, 26, 27, 28, 29].filter(estPremier).length === 2,
  "Les seuls entiers qui se suivent et sont tous deux premiers sont 2 et 3.": true,
  "Un nombre premier peut être divisible par 3.": true,
  "Si un nombre est premier, le nombre qui vaut 2 de plus l'est aussi.": false,
  "Pour savoir si 97 est premier, il suffit de tester 2, 3, 5 et 7.": 11 * 11 > 97,
  "Un nombre qui a exactement trois diviseurs est premier.": false,
};

function corrigerVraiFaux(q: Q): string[] {
  const phrase = q.text.match(/« (.+?) »/)?.[1];
  if (!phrase || !(phrase in VERITES)) return [`affirmation inconnue du correcteur : « ${phrase} »`];
  const juste = VERITES[phrase] ? "vrai" : "faux";
  return [...qcmUnique(q, (c) => c === juste)];
}

function corrigerReconstituer(q: Q): string[] {
  const m = q.text.match(/(\d+(?: × \d+)+)/);
  if (!m) return ["produit illisible"];
  const f = lireProduit(m[1])!;
  const p: string[] = [];
  if (!f.every(estPremier)) p.push(`${m[1]} : un facteur n'est pas premier`);
  if (Number(q.expected[0]) !== produit(f)) p.push(`attendu « ${q.expected[0]} », ${m[1]} = ${produit(f)}`);
  if (produit(f) > 1000) p.push(`${produit(f)} : trop grand pour un calcul mental`);
  return p;
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  "4e_premier_definition_tpl_1_est_premier": corrigerEstPremier,
  "4e_premier_definition_tpl_2_liste_30": corrigerListe,
  "4e_premier_determiner_tpl_1_tester": corrigerTester,
  "4e_premier_determiner_tpl_2_combien": corrigerCombien,
  "4e_premier_decomposer_tpl_1_produit": corrigerProduit,
  "4e_premier_decomposer_tpl_2_simplifier": corrigerSimplifier,
  "4e_premier_defi_tpl_1_diviseurs_par_decomposition": corrigerNbDiviseurs,
  "4e_premier_defi_tpl_2_vrai_faux": corrigerVraiFaux,
  "4e_premier_defi_tpl_3_reconstituer": corrigerReconstituer,
});
