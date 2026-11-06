import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/types";
import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { nombres, reponse, texte, unique, type Q } from "./outils";

// LES CORRECTEURS DE calcul-rapide.bank.ts (06/11/2026). Ils relisent l'opération dans le
// TEXTE, la refont par × et ÷ ordinaires (jamais par la méthode de la banque). Vide = juste.

const T = (q: Q) => q.text.replace(/[  ]/g, " ");
const NB = "(\\d{1,3}(?: \\d{3})+(?:,\\d+)?|\\d+(?:,\\d+)?)";
const n_ = (s: string) => Number(s.replace(/ /g, "").replace(",", "."));

/** « a × 11 », « a ÷ 0,25 » : le calcul demandé, refait. */
function operation(q: Q): number | null {
  const m = T(q).match(new RegExp(`${NB} ([×÷]) (11|25|0,5|0,25)(?!\\d|,\\d)`));
  if (!m) return null;
  return m[2] === "×" ? n_(m[1]) * n_(m[3]) : n_(m[1]) / n_(m[3]);
}
const direct = (q: Q) => {
  const r = operation(q);
  return r === null ? ["opération illisible"] : reponse(q, r);
};
/** « … × 11 = 462 », « Quel nombre multiplié par 25 donne 300 », « … ÷ 25 = 12 ». */
function manquant(q: Q): string[] {
  const t = T(q);
  const f = Number(t.match(/\b(11|25)\b/)?.[1]);
  const div = /÷|divisé/.test(t);
  const l = nombres(t).filter((x, i, a) => !(x === f && i === a.indexOf(f)));
  const r = l[l.length - 1];
  return reponse(q, div ? r * f : r / f);
}
/** Un calcul écrit en toutes lettres dans la proposition, évalué. */
function evalue(c: string): number {
  const s = c.replace(/[  ]/g, " ");
  const m = s.match(/^(\d+) ([×÷]) (\d+)(?: \+ (\d+))?$/);
  if (m) return (m[2] === "×" ? Number(m[1]) * Number(m[3]) : Number(m[1]) / Number(m[3])) + Number(m[4] ?? 0);
  const a = s.match(/^(\d+) \+ (\d+)$/);
  return a ? Number(a[1]) + Number(a[2]) : NaN;
}
const memeValeur = (q: Q) => {
  const r = operation(q);
  if (r === null) return ["opération illisible"];
  return unique(q, (c) => Math.abs(evalue(c) - r) < 1e-9);
};

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  calcul_fois_11_25_tpl_1: direct,
  calcul_fois_11_25_tpl_2: direct,
  calcul_fois_11_25_tpl_3: direct,
  calcul_fois_11_25_tpl_4: memeValeur,
  calcul_fois_11_25_tpl_5: direct,
  calcul_fois_11_25_tpl_6: direct,
  calcul_fois_11_25_tpl_7: direct,
  calcul_fois_11_25_tpl_8: manquant,
  calcul_fois_11_25_tpl_9: (q) => {
    const [f, n] = nombres(T(q));
    return reponse(q, f * n);
  },
  calcul_fois_11_25_tpl_10: (q) => reponse(q, nombres(T(q))[0] / 25),
  calcul_fois_11_25_tpl_11: (q) => {
    const m = T(q).match(/(\d+) × 11, l'autre (\d+) × 25|(\d+) × 11.*?(\d+) × 25/);
    const a = Number(m?.[1] ?? m?.[3]) * 11;
    const b = Number(m?.[2] ?? m?.[4]) * 25;
    const juste = a === b ? "Les deux sont égaux" : a > b ? `${Number(m?.[1] ?? m?.[3])} × 11` : `${Number(m?.[2] ?? m?.[4])} × 25`;
    return texte(q, juste);
  },
  calcul_fois_11_25_tpl_12: (q) => {
    const [n, p] = nombres(T(q));
    return reponse(q, n * p, /F CFA/.test(T(q)) ? "F CFA" : "€");
  },

  calcul_fois_05_025_tpl_1: direct,
  calcul_fois_05_025_tpl_2: direct,
  calcul_fois_05_025_tpl_3: direct,
  calcul_fois_05_025_tpl_4: direct,
  calcul_fois_05_025_tpl_5: direct,
  calcul_fois_05_025_tpl_6: direct,
  calcul_fois_05_025_tpl_7: direct,
  calcul_fois_05_025_tpl_8: memeValeur,
  calcul_fois_05_025_tpl_9: (q) => {
    const [x, d] = nombres(T(q));
    return reponse(q, x / d);
  },
  calcul_fois_05_025_tpl_10: (q) => {
    const [x, d] = nombres(T(q));
    return reponse(q, x * d, (T(q).match(/\d (L|kg|km)\b/) ?? [])[1] ?? "");
  },
  calcul_fois_05_025_tpl_11: (q) => {
    const m = T(q).match(/fait ([×÷]) (0,25|0,5) et trouve (\d+)/);
    if (!m) return ["opération illisible"];
    const d = n_(m[2]);
    const r = Number(m[3]);
    return reponse(q, m[1] === "×" ? r / d : r * d);
  },
  calcul_fois_05_025_tpl_12: (q) => {
    const m = T(q).match(/a (\d+) .*? de (\d+) m\. On en utilise (le quart|la moitié), soit la longueur totale × (0,25|0,5)/);
    if (!m) return ["énoncé illisible"];
    if ((m[3] === "le quart") !== (m[4] === "0,25")) return ["le mot et le décimal se contredisent"];
    return reponse(q, Number(m[1]) * Number(m[2]) * n_(m[4]), "m");
  },
});
