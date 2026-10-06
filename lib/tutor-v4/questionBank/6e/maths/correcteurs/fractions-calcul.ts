import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { fractionsDe, verifierAttendu } from "./fractions";

// Les correcteurs de fractions-calcul.bank.ts (06/10/2026, voir types.ts).
// Chacun relit les fractions et les entiers DANS LE TEXTE vu par l'élève et
// refait l'opération ; les QCM refusent tout leurre ÉGAL à la bonne réponse.

const pg = (a: number, b: number): number => (b ? pg(b, a % b) : a);
const multiples = (a: number, b: number) => a % b === 0 || b % a === 0;
const v = ([n, d]: [number, number]) => n / d;

/** Deux fractions additionnées : « a/d + b/d », ou « … puis … en tout ». */
function somme(q: TutorGeneratedQuestionV4, memeDen: boolean): string[] {
  const fr = fractionsDe(q.text);
  if (fr.length !== 2) return [`deux fractions attendues, lu ${fr.length}`];
  if (/reste|−/.test(q.text)) return ["une addition est attendue, le texte parle de retirer"];
  const p: string[] = [];
  if (memeDen && fr[0][1] !== fr[1][1]) p.push("même dénominateur attendu (★1)");
  if (!memeDen && (fr[0][1] === fr[1][1] || !multiples(fr[0][1], fr[1][1]))) p.push("dénominateurs multiples l'un de l'autre attendus");
  const s = v(fr[0]) + v(fr[1]);
  if (s >= 1) p.push(`la somme ${s} dépasse le tout : peu plausible en situation`);
  // « Complète : … = …/d » : le dénominateur imposé doit permettre la réponse.
  const trou = q.text.match(/= …\/(\d+)/);
  if (trou && Math.abs(s * Number(trou[1]) - Math.round(s * Number(trou[1]))) > 1e-9) p.push("le dénominateur imposé ne convient pas");
  return [...p, ...verifierAttendu(q, s)];
}

/** « k × n/d » écrit ou en situation : la fraction et le seul entier du texte. */
function produit(q: TutorGeneratedQuestionV4, regle: (k: number, n: number, d: number) => string | null): string[] {
  const fr = fractionsDe(q.text);
  const ent = [...q.text.replace(/\d+\/\d+/g, " ").matchAll(/\d+/g)].map((x) => Number(x[0]));
  if (fr.length !== 1 || ent.length !== 1) return [`une fraction et un entier attendus, lu ${fr.length} fraction(s) et ${ent.join(", ")}`];
  const [[n, d]] = fr;
  const k = ent[0];
  const p: string[] = [];
  const r = regle(k, n, d);
  if (r) p.push(r);
  if (n >= d) p.push(`${n}/${d} n'est pas plus petit que 1`);
  const u = q.text.match(/\d (L|km|kg|m)\b/)?.[1];
  if (pg(n, d) !== 1) p.push(`${n}/${d} donnée sans être simplifiée`);
  const val = (k * n) / d;
  if (u && Number.isInteger(val) && String(q.expected[0]) !== `${val} ${u}`) p.push(`réponse entière sans l'unité ${u}`);
  if (u && val > 30) p.push(`${val} ${u} : peu plausible`);
  return [...p, ...verifierAttendu(q, val)];
}

/** Un total T (seul entier du texte) et des fractions de T : ce qui reste, en nombre. */
function resteDuTotal(q: TutorGeneratedQuestionV4, nbFractions: number): string[] {
  const fr = fractionsDe(q.text);
  const ent = [...q.text.replace(/\d+\/\d+/g, " ").matchAll(/\d+/g)].map((x) => Number(x[0]));
  if (fr.length !== nbFractions || ent.length !== 1) return [`${nbFractions} fraction(s) et un total attendus`];
  const T = ent[0];
  const p: string[] = [];
  let reste = T;
  for (const [n, d] of fr) {
    if (T % d) p.push(`${T} ne se partage pas en ${d}`);
    if (pg(n, d) !== 1) p.push(`${n}/${d} donnée sans être simplifiée`);
    reste -= (T / d) * n;
  }
  if (!(reste > 0)) p.push("il ne reste rien");
  if (T > 64) p.push(`total ${T} peu plausible`);
  return [...p, ...verifierAttendu(q, reste)];
}

export const CORRECTEURS: CorrecteursMaths = {
  fraction_calcul_defi_tpl_1: (q) => resteDuTotal(q, 1),
  fraction_calcul_defi_tpl_deux_fractions: (q) => resteDuTotal(q, 2),
  fraction_calcul_defi_tpl_2: (q) => {
    const fr = fractionsDe(q.text);
    if (fr.length !== 2 || fr[0][1] !== fr[1][1]) return ["deux fractions de même dénominateur attendues"];
    const p: string[] = [];
    const t = q.text.match(/(\d+) \p{L}+ égal/u);
    if (t && Number(t[1]) !== fr[0][1]) p.push("le nombre de parts ne correspond pas au dénominateur");
    const c = q.canvas as any;
    if (c?.fractions) {
      const barres = c.fractions.map((f: any) => `${f.numerator}/${f.denominator}`).join(" ");
      if (barres !== fr.map(([a, b]) => `${a}/${b}`).join(" ")) p.push("les barres ne montrent pas les parts prises");
    }
    const r = 1 - v(fr[0]) - v(fr[1]);
    if (!(r > 0)) p.push("il ne reste rien");
    return [...p, ...verifierAttendu(q, r)];
  },
  fraction_multiplier_entier_tpl_unitaire: (q) => produit(q, (k, n, d) => (n !== 1 ? "★1 : fraction unité 1/d attendue" : k >= d ? "★1 : résultat attendu sous 1" : null)),
  fraction_multiplier_entier_tpl_1: (q) => {
    const p = produit(q, () => null);
    const c = q.canvas as any;
    const [f] = fractionsDe(q.text);
    if (c?.fraction && f && (c.fraction.numerator !== f[0] || c.fraction.denominator !== f[1])) p.push("la barre ne montre pas la fraction de l'énoncé");
    return p;
  },
  fraction_multiplier_entier_tpl_simplifier: (q) =>
    produit(q, (k, n, d) => {
      const g = (a: number, b: number): number => (b ? g(b, a % b) : a);
      return g(k * n, d) === 1 ? "le produit ne se simplifie pas (★3)" : (k * n) % d === 0 ? "résultat entier : c'est la ★4" : null;
    }),
  fraction_multiplier_entier_tpl_entier: (q) => produit(q, (k, n, d) => ((k * n) % d !== 0 ? "résultat non entier (★4 attend un entier)" : null)),
  fraction_quantite_tpl_bo: (q) => {
    // « 3/4 de 60 », « 3/4 × 60 », ou « 60 € … en dépense les 3/4 ».
    const m = q.text.match(/(\d+)\/(\d+) (?:de|×) (\d+)/);
    const fr = fractionsDe(q.text);
    const ent = [...q.text.replace(/\d+\/\d+/g, " ").matchAll(/\d+/g)].map((x) => Number(x[0]));
    if (!m && (fr.length !== 1 || ent.length !== 1)) return ["« n/d de N » introuvable"];
    const [n, d, N] = m ? m.slice(1).map(Number) : [fr[0][0], fr[0][1], ent[0]];
    const p: string[] = [];
    if (N % d) p.push(`${N} ne se divise pas par ${d}`);
    if (n >= d) p.push(`${n}/${d} n'est pas plus petit que 1`);
    const dit = q.text.match(/c’est (\d+) ÷ (\d+), puis × (\d+)/);
    if (dit && (Number(dit[1]) !== N || Number(dit[2]) !== d || Number(dit[3]) !== n)) p.push("la méthode citée ne reprend pas les bons nombres");
    if (/€/.test(q.text) && !String(q.expected[0]).endsWith(" €")) p.push("unité € absente de la réponse");
    return [...p, ...verifierAttendu(q, (N / d) * n)];
  },
  fraction_additionner_tpl_1: (q) => {
    const p = somme(q, true);
    const c = q.canvas as any;
    const fr = fractionsDe(q.text);
    if (c?.fractions) {
      const barres = c.fractions.map((f: any) => `${f.numerator}/${f.denominator}`).sort().join(" ");
      if (barres !== fr.map(([a, b]) => `${a}/${b}`).sort().join(" ")) p.push("les barres ne montrent pas les fractions du texte");
    }
    return p;
  },
  fraction_additionner_tpl_2: (q) => somme(q, false),
  fraction_additionner_tpl_soustraire: (q) => {
    const fr = fractionsDe(q.text);
    let r: number;
    if (/(?:^|[^\d/])1 − (\d+)\/(\d+)/.test(q.text) || (fr.length === 1 && /reste/.test(q.text))) {
      // Ce qui reste du tout : 1 − a/d. (Le rappel « 1, c'est d/d » est une 2e fraction égale à 1.)
      const a = fr.find(([n, d]) => n !== d)!;
      r = 1 - v(a);
      for (const [n, d] of fr) if (n === d && d !== a[1]) return ["le rappel 1 = d/d n'a pas le bon dénominateur"];
    } else {
      if (fr.length !== 2) return ["deux fractions attendues"];
      if (fr[0][1] !== fr[1][1]) return ["même dénominateur attendu"];
      const m = q.text.match(/soustrait (\d+)\/(\d+) de (\d+)\/(\d+)/);
      if (m) r = Number(m[3]) / Number(m[4]) - Number(m[1]) / Number(m[2]);
      else if (/ − |avait/.test(q.text)) r = v(fr[0]) - v(fr[1]);
      else return ["opération illisible"];
    }
    const p: string[] = [];
    if (!(r > 0)) p.push(`résultat ${r} : il ne reste rien ou moins que rien`);
    return [...p, ...verifierAttendu(q, r)];
  },
  fraction_additionner_tpl_partage_reste: (q) => {
    const fr = fractionsDe(q.text);
    if (fr.length !== 2) return ["deux fractions attendues"];
    const [f1, f2] = fr;
    const p: string[] = [];
    if (!multiples(f1[1], f2[1])) p.push("dénominateurs sans lien de multiple");
    if (v(f1) + v(f2) >= 1) p.push("les deux enfants prennent plus que le tout");
    let r: number;
    if (/reste|n’a pas été/.test(q.text)) r = 1 - v(f1) - v(f2);
    else if (/à eux deux/.test(q.text)) r = v(f1) + v(f2);
    else if (/de plus que/.test(q.text)) r = v(f1) - v(f2);
    else return ["question illisible"];
    if (!(r > 0)) p.push(`résultat ${r} non positif`);
    return [...p, ...verifierAttendu(q, r)];
  },
};
