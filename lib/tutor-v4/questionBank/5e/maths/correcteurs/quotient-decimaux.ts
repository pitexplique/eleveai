import type { CorrecteursMaths } from "./types";
import { type Q, NB, egal, justeNombre, justeTexte, justeUnique, nombres, num, valeur } from "../../../cm1/maths/correcteurs/outils";

// Les correcteurs de quotient-decimaux.bank.ts (06/11/2026) : relisent la division dans le
// texte, recalculent le quotient, vérifient qu'il tombe juste. Vide = juste.

const arr = (v: number) => Math.round(v * 1e6) / 1e6;
const RE_DIV = new RegExp(`${NB}\\s÷\\s${NB}`);
const lireDiv = (t: string) => {
  const m = t.match(RE_DIV);
  return m ? { a: num(m[1]), b: num(m[2]), tb: m[2] } : null;
};
const tombeJuste = (a: number, b: number) => {
  const r = arr(a / b);
  return egal(arr(r * b), arr(a)) && egal(r, Math.round(r * 100) / 100) ? [] : [`${a} ÷ ${b} ne tombe pas juste`];
};
const decs = (s: string) => (s.split(",")[1] ?? "").length;
/** Réponse tapée : elle vaut `juste`, sans propositions qui la donneraient. */
function justeCourt(q: Q, juste: number): string[] {
  const p: string[] = [];
  if (q.format !== "short") p.push(`format ${q.format} au lieu d'une réponse tapée`);
  const v = valeur(q.expected[0]);
  if (v === null || !egal(v, arr(juste))) p.push(`attendu « ${q.expected[0]} », juste : ${juste}`);
  return p;
}

function facteur(q: Q) {
  if (!(q.choices ?? []).every((c) => ["10", "100", "1 000"].includes(c))) return [`propositions inattendues : ${(q.choices ?? []).join(" | ")}`];
  const d = lireDiv(q.text);
  // Sans division écrite, le seul nombre du texte est le diviseur.
  const seul = nombres(q.text);
  const tb = d?.tb ?? (seul.length === 1 ? q.text.match(new RegExp(NB))?.[1] : undefined);
  if (!tb) return [`diviseur illisible : ${q.text}`];
  if (decs(tb) === 0) return [`le diviseur ${tb} est déjà entier`];
  return justeNombre(q, 10 ** decs(tb));
}
function divisionEgale(q: Q) {
  const d = lireDiv(q.text);
  if (!d) return [`division illisible : ${q.text}`];
  return [
    ...justeUnique(q, (c) => {
      const x = lireDiv(c);
      return !!x && Number.isInteger(x.b) && egal(arr(x.a / x.b), arr(d.a / d.b));
    }),
    ...tombeJuste(d.a, d.b),
  ];
}
function trou(q: Q) {
  const d = lireDiv(q.text);
  if (!d) return [`division illisible : ${q.text}`];
  const quot = d.a / d.b;
  const apres = q.text.slice(q.text.indexOf("=") + 1);
  const avecDividende = apres.match(new RegExp(`…\\s÷\\s${NB}`));
  const avecDiviseur = apres.match(new RegExp(`${NB}\\s÷\\s…`));
  if (avecDividende) return justeCourt(q, quot * num(avecDividende[1]));
  if (avecDiviseur) return justeCourt(q, num(avecDiviseur[1]) / quot);
  return [`trou illisible : ${q.text}`];
}
function calcul(q: Q) {
  const d = lireDiv(q.text);
  if (!d) return [`division illisible : ${q.text}`];
  if (Number.isInteger(d.b)) return [`le diviseur ${d.b} est entier : ce n'est pas cette micro`];
  return [...tombeJuste(d.a, d.b), ...justeCourt(q, d.a / d.b)];
}
function verifier(q: Q) {
  const m = q.text.match(new RegExp(`${NB}\\s÷\\s${NB} = ${NB}`));
  if (!m) return [`égalité illisible : ${q.text}`];
  const [a, b, r] = [num(m[1]), num(m[2]), num(m[3])];
  if (!egal(arr(a / b), r)) return [`${a} ÷ ${b} ne vaut pas ${r}`];
  return justeTexte(q, q.choices!.find((c) => {
    const x = c.match(new RegExp(`^${NB} × ${NB}$`));
    return !!x && num(x[1]) === r && num(x[2]) === b;
  }) ?? "introuvable");
}
function plusGrand(q: Q) {
  const d = lireDiv(q.text);
  const m = d ? null : q.text.match(new RegExp(`On divise ${NB} par ${NB}`));
  const b = d?.b ?? (m ? num(m[2]) : NaN);
  if (!Number.isFinite(b)) return [`division illisible : ${q.text}`];
  if (b === 1) return ["diviseur égal à 1"];
  return justeTexte(q, b < 1 ? "plus grand" : "plus petit");
}
function vraisemblance(q: Q) {
  const d = lireDiv(q.text);
  if (!d) return [`division illisible : ${q.text}`];
  return [...tombeJuste(d.a, d.b), ...justeNombre(q, arr(d.a / d.b))];
}
/** PARTS : le total, puis la part. RYTHMES (« par minute ») : la part, puis le total. */
function lireSituation(q: Q) {
  const n = nombres(q.text);
  if (n.length !== 2) return null;
  const partDAbord = /par (?:minute|heure|seconde|jour|an)\b/.test(q.text);
  return partDAbord ? { a: n[1], b: n[0] } : { a: n[0], b: n[1] };
}
function situation(q: Q) {
  const s = lireSituation(q);
  if (!s) return [`nombres illisibles : ${q.text}`];
  if (Number.isInteger(s.b)) return [`la part ${s.b} est entière`];
  const r = arr(s.a / s.b);
  if (!Number.isInteger(r)) return [`${s.a} ÷ ${s.b} ne donne pas un nombre entier de parts`];
  return justeCourt(q, r);
}
function quelCalcul(q: Q) {
  const s = lireSituation(q);
  if (!s) return [`nombres illisibles : ${q.text}`];
  return justeUnique(q, (c) => {
    const x = lireDiv(c);
    return !!x && egal(x.a, s.a) && egal(x.b, s.b);
  });
}
function combienDeFois(q: Q) {
  const n = nombres(q.text.replace("La ville A", "").replace("La ville B", ""));
  if (n.length !== 2) return [`nombres illisibles : ${q.text}`];
  return [...tombeJuste(n[0], n[1]), ...justeCourt(q, n[0] / n[1])];
}
/** « b kg … pour a € » ou « a km en b h » : le diviseur est toujours le nombre décimal de la quantité. */
function grandeurQuotient(q: Q) {
  const t = q.text;
  let m = t.match(new RegExp(`${NB} (?:kg|m) de [^.]*? pour ${NB} €`));
  if (m) return justeCourt(q, num(m[2]) / num(m[1]));
  m = t.match(new RegExp(`${NB} € pour ${NB} L`));
  if (m) return justeCourt(q, num(m[1]) / num(m[2]));
  m = t.match(new RegExp(`${NB} (?:km|L|m²|kg de papier) en ${NB} (?:h|min)`));
  if (m) return justeCourt(q, num(m[1]) / num(m[2]));
  return [`situation illisible : ${t}`];
}

const I = "quotient_decimaux_tpl_";
export const CORRECTEURS: CorrecteursMaths = {
  [`${I}1`]: facteur,
  [`${I}2`]: divisionEgale,
  [`${I}3`]: trou,
  [`${I}4`]: calcul,
  [`${I}5`]: calcul,
  [`${I}6`]: calcul,
  [`${I}7`]: verifier,
  [`${I}8`]: plusGrand,
  [`${I}9`]: vraisemblance,
  [`${I}10`]: situation,
  [`${I}11`]: situation,
  [`${I}12`]: quelCalcul,
  [`${I}13`]: combienDeFois,
  [`${I}14`]: grandeurQuotient,
};
