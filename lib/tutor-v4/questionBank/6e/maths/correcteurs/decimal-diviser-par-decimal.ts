import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import { type Q, NB, egal, justeNombre, justeTexte, justeUnique, nombres, num } from "../../../cm1/maths/correcteurs/outils";

// Les correcteurs de decimal-diviser-par-decimal.bank.ts : relisent la division, recalculent
// le quotient, et vérifient qu'il tombe juste. Vide = juste.

const arr = (v: number) => Math.round(v * 1e6) / 1e6;
const RE_DIV = new RegExp(`${NB} ÷ ${NB}`);
const lireDiv = (t: string) => {
  const m = t.match(RE_DIV);
  return m ? { a: num(m[1]), b: num(m[2]), tb: m[2] } : null;
};
const tombeJuste = (a: number, b: number) => {
  const r = arr(a / b);
  return egal(arr(r * b), arr(a)) && egal(r, Math.round(r * 100) / 100) ? [] : [`${a} ÷ ${b} ne tombe pas juste`];
};
const decs = (s: string) => (s.split(",")[1] ?? "").length;

function facteur(q: Q) {
  const d = lireDiv(q.text);
  const seul = q.text.match(new RegExp(`(?:multiplier|rend|virgule de) ${NB}`));
  if (!(q.choices ?? []).every((c) => ["10", "100", "1 000"].includes(c))) return [`propositions inattendues : ${(q.choices ?? []).join(" | ")}`];
  const tb = d?.tb ?? seul?.[1];
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
  const avecDividende = apres.match(new RegExp(`… ÷ ${NB}`));
  const avecDiviseur = apres.match(new RegExp(`${NB} ÷ …`));
  if (avecDividende) return justeNombre(q, arr(quot * num(avecDividende[1])));
  if (avecDiviseur) return justeNombre(q, arr(num(avecDiviseur[1]) / quot));
  return [`trou illisible : ${q.text}`];
}
function calcul(q: Q) {
  const d = lireDiv(q.text);
  if (!d) return [`division illisible : ${q.text}`];
  if (Number.isInteger(d.b)) return [`le diviseur ${d.b} est entier : ce n'est pas cette micro`];
  return [...tombeJuste(d.a, d.b), ...justeNombre(q, arr(d.a / d.b))];
}
function verifier(q: Q) {
  const m = q.text.match(new RegExp(`${NB} ÷ ${NB} = ${NB}`));
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
/** Le total est le plus grand nombre… sauf quand le texte donne la part d'abord : on relit l'ordre. */
function lireSituation(q: Q) {
  const n = nombres(q.text);
  if (n.length !== 2) return null;
  const partDAbord = /par (?:minute|heure|seconde|jour|an)/.test(q.text);
  return partDAbord ? { a: n[1], b: n[0] } : { a: n[0], b: n[1] };
}
function situation(u: string[]) {
  return (q: Q) => {
    const s = lireSituation(q);
    if (!s) return [`nombres illisibles : ${q.text}`];
    if (Number.isInteger(s.b)) return [`la part ${s.b} est entière`];
    const r = arr(s.a / s.b);
    if (!Number.isInteger(r)) return [`${s.a} ÷ ${s.b} ne donne pas un nombre entier de parts`];
    const fin = u.find((x) => q.expected[0].endsWith(x));
    if (!fin) return [`unité inattendue : ${q.expected[0]}`];
    return justeNombre(q, r, fin);
  };
}
const UNITES = ["morceaux", "pots", "sachets", "tours", "lattes", "sillons", "murs", "doses", "prises", "bouteilles", "longueurs", "bouts", "fournées", "tubes"];
const TEMPS = ["minutes", "heures", "secondes", "jours", "ans"];
function quelCalcul(q: Q) {
  const s = lireSituation(q);
  if (!s) return [`nombres illisibles : ${q.text}`];
  return justeUnique(q, (c) => {
    const x = lireDiv(c);
    return !!x && egal(x.a, s.a) && egal(x.b, s.b);
  });
}
function combienDeFois(q: Q) {
  const n = nombres(q.text);
  if (n.length !== 2) return [`nombres illisibles : ${q.text}`];
  return [...tombeJuste(n[0], n[1]), ...justeNombre(q, arr(n[0] / n[1]))];
}

const I = "decimal_diviser_par_decimal_tpl_";
export const CORRECTEURS: CorrecteursMaths = {
  [`${I}1`]: facteur,
  [`${I}2`]: divisionEgale,
  [`${I}3`]: trou,
  [`${I}4`]: calcul,
  [`${I}5`]: calcul,
  [`${I}6`]: calcul,
  [`${I}7`]: verifier,
  [`${I}8`]: plusGrand,
  [`${I}9`]: situation(UNITES),
  [`${I}10`]: situation(TEMPS),
  [`${I}11`]: quelCalcul,
  [`${I}12`]: combienDeFois,
};
