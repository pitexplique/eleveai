import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { compiler, lireIntegrale, proche, seuleJuste, seulChoix, simpson, val } from "../../../lycee-correcteurs-commun";

// Relisent les intégrales ÉCRITES, calculent par Simpson : aucune valeur du gabarit.

type Q = TutorGeneratedQuestionV4;
const num = (s: string) => Number(s.replace(",", "."));
const accepte = (q: Q, v: number) => (proche(num(String(q.expected[0])), v, 1e-6) ? [] : [`attendu ${q.expected[0]}, recalculé ${v}`]);

/** Les faits « ∫_a^b expr dx = V » et l'intégrale cible (la dernière, sans « = »). */
function faits(t: string) {
  const re = /\\int_\{(-?\d+)\}\^\{(-?\d+)\} (.+?)\\,\\mathrm\{d\}x\$?( = (-?\d+))?/g;
  const res: { a: number; b: number; e: string; v?: number }[] = [];
  for (const m of t.matchAll(re)) res.push({ a: +m[1], b: +m[2], e: m[3], v: m[5] === undefined ? undefined : +m[5] });
  return res;
}
function lineaire(q: Q): string[] {
  const F = faits(q.text);
  const donnes = F.filter((f) => f.v !== undefined);
  const env: Record<string, number> = { x: 1 };
  for (const d of donnes) env[d.e[0]] = d.v!;
  const cible = F.find((f) => f.v === undefined);
  if (!cible || donnes.length !== 2) return ["énoncé illisible"];
  return accepte(q, compiler(cible.e)(env));
}
function chasles(q: Q): string[] {
  const F = faits(q.text);
  const d = F.filter((f) => f.v !== undefined);
  const c = F.find((f) => f.v === undefined);
  if (!c || d.length !== 2) return ["énoncé illisible"];
  const G = new Map<number, number>([[d[0].a, 0]]);
  G.set(d[0].b, d[0].v!);
  G.set(d[1].b, G.get(d[1].a)! + d[1].v!);
  return accepte(q, G.get(c.b)! - G.get(c.a)!);
}
function signe(q: Q): string[] {
  const v = lireIntegrale(q.text).valeur;
  const juste = Math.abs(v) < 1e-9 ? "nulle" : v < 0 ? "strictement négative" : "strictement positive";
  return juste === q.expected[0] ? [] : [`recalculé ${juste} (${v}), attendu ${q.expected[0]}`];
}
function comparer(q: Q): string[] {
  const I = lireIntegrale(q.text).valeur;
  const J = lireIntegrale(q.text, {}, 1).valeur;
  const juste = I > J ? "$I > J$" : I < J ? "$I < J$" : "$I = J$";
  return juste === q.expected[0] ? [] : [`I=${I} J=${J}, attendu ${q.expected[0]}`];
}
function moyenne(q: Q): string[] {
  const F = faits(q.text);
  const d = F.filter((f) => f.v !== undefined);
  if (d.length !== 2 || d[0].b !== d[1].a) return ["énoncé illisible"];
  return accepte(q, (d[0].v! + d[1].v!) / (d[1].b - d[0].a));
}
function systeme(q: Q): string[] {
  const F = faits(q.text);
  const [S, D] = F.filter((f) => f.v !== undefined);
  const c = F.find((f) => f.v === undefined);
  if (!S || !D || !c) return ["énoncé illisible"];
  const prem = S.e.replace("(", "")[0];
  return accepte(q, c.e[0] === prem ? (S.v! + D.v!) / 2 : (S.v! - D.v!) / 2);
}

/* ───── encadrements ───── */
const lireEnc = (c: string) => {
  const m = c.replace(/\$/g, "").match(/^(.+) \\leq (?:I|\\mu) \\leq (.+)$/);
  if (!m) throw new Error(`encadrement illisible : ${c}`);
  return [val(m[1]), val(m[2])] as const;
};
function encadrementHypothese(q: Q): string[] {
  const m = q.text.match(/\[(-?\d+)\\,;(-?\d+)\]/);
  const h = q.text.match(/\$(-?\d+) \\leq [fgh]\(x\) \\leq (-?\d+)\$/);
  if (!m || !h) return ["hypothèse illisible"];
  const L = +m[2] - +m[1];
  return seulChoix(q, (c) => {
    const [a, b] = lireEnc(c);
    return proche(a, +h[1] * L) && proche(b, +h[2] * L);
  });
}
function moyenneOuMajorant(q: Q): string[] {
  const m = q.text.match(/\[(-?\d+)\\,;(-?\d+)\]/);
  if (!m) return ["intervalle illisible"];
  const L = +m[2] - +m[1];
  if (q.format === "qcm") {
    const h = q.text.match(/\$(-?\d+) \\leq [fgh]\(x\) \\leq (-?\d+)\$/);
    if (!h) return ["hypothèse illisible"];
    return seulChoix(q, (c) => {
      const [a, b] = lireEnc(c);
      return proche(a, +h[1]) && proche(b, +h[2]);
    });
  }
  const h = q.text.match(/[fgh]\(x\) \\leq (-?\d+)\$/);
  if (!h) return ["majorant illisible"];
  return accepte(q, +h[1] * L);
}
function monotone(q: Q): string[] {
  const I = lireIntegrale(q.text);
  const N = 2000;
  let lo = Infinity;
  let hi = -Infinity;
  let croit = true;
  let decroit = true;
  for (let k = 0; k <= N; k++) {
    const y = I.f(I.a + ((I.b - I.a) * k) / N);
    if (k) {
      const p = I.f(I.a + ((I.b - I.a) * (k - 1)) / N);
      if (y < p) croit = false;
      if (y > p) decroit = false;
    }
    lo = Math.min(lo, y);
    hi = Math.max(hi, y);
  }
  const p: string[] = [];
  const annonce = /décroissante/.test(q.text) ? decroit : croit;
  if (!annonce) p.push("le sens annoncé est faux");
  const L = I.b - I.a;
  return [
    ...p,
    ...seulChoix(q, (c) => {
      const [a, b] = lireEnc(c);
      return proche(a, lo * L, 1e-6) && proche(b, hi * L, 1e-6);
    }),
  ];
}
function rectangles(q: Q): string[] {
  const v = [...q.text.matchAll(/\$f\((-?\d+)\) = (-?\d+)\$/g)].map((m) => +m[2]);
  const decroit = /décroissante/.test(q.text);
  if (v.some((y, i) => i && (decroit ? y >= v[i - 1] : y <= v[i - 1]))) return ["valeurs non monotones"];
  const s = (l: number[]) => l.reduce((a, b) => a + b, 0);
  const lo = decroit ? s(v.slice(1)) : s(v.slice(0, -1));
  const hi = decroit ? s(v.slice(0, -1)) : s(v.slice(1));
  return seulChoix(q, (c) => {
    const [a, b] = lireEnc(c);
    return a === lo && b === hi;
  });
}
function contientI(q: Q): string[] {
  const I = lireIntegrale(q.text).valeur;
  return seulChoix(q, (c) => {
    const [a, b] = lireEnc(c);
    return a <= I + 1e-9 && I <= b + 1e-9;
  });
}
function comparaison(q: Q): string[] {
  const m = q.text.match(/\$([^$]+?) (\\leq|\\geq) ([^$]+?)\$/);
  const iv = q.text.match(/\[(-?\d+)\\,;(-?\d+)\]/);
  if (!m || !iv) return ["inégalité illisible"];
  const [F, G] = [compiler(m[1]), compiler(m[3])];
  const [a, b] = [+iv[1], +iv[2]];
  const p: string[] = [];
  for (let k = 0; k <= 400; k++) {
    const x = a + ((b - a) * k) / 400;
    const d = F({ x }) - G({ x });
    if (m[2] === "\\leq" ? d > 1e-9 : d < -1e-9) p.push(`inégalité fausse en ${x}`);
  }
  if (p.length) return p.slice(0, 1);
  // Le texte est juste : l'unique bonne proposition vaut ∫g, et c'est bien une borne de ∫f.
  const Ig = simpson((x) => G({ x }), a, b);
  const If = simpson((x) => F({ x }), a, b);
  if (m[2] === "\\leq" ? If > Ig + 1e-9 : If < Ig - 1e-9) return ["borne fausse"];
  return seuleJuste(q, Ig);
}

/* ───── suites d'intégrales ───── */
const rangDemande = (t: string) => {
  const l = [...t.matchAll(/\$[IJu]_\{(\d+)\}\$/g)];
  if (!l.length) throw new Error(`rang illisible : ${t}`);
  return +l[l.length - 1][1];
};
function terme(q: Q): string[] {
  const n = rangDemande(q.text);
  return seuleJuste(q, lireIntegrale(q.text, { n }).valeur, {}, 1e-5);
}
const premierRang = (t: string) => +(t.match(/entier \$n \\geq (\d+)\$/)?.[1] ?? 0);
function sens(q: Q): string[] {
  const d = premierRang(q.text);
  const v = [0, 1, 2, 3, 4].map((k) => lireIntegrale(q.text, { n: d + k + 1 }).valeur);
  const croit = v.every((y, i) => !i || y > v[i - 1]);
  const decroit = v.every((y, i) => !i || y < v[i - 1]);
  const mot = croit ? "croissante" : decroit ? "décroissante" : "?";
  return String(q.expected[0]).endsWith(`est ${mot}`) ? [] : [`recalculé ${mot}, attendu ${q.expected[0]}`];
}
function limite(q: Q): string[] {
  const u = (n: number) => lireIntegraleFine(q.text, n);
  const [a, b] = [u(100), u(400)];
  const juste = b > 4 ? "$+\\infty$" : proche(b, 1, 0.02) ? "$1$" : proche(b, 0, 0.02) ? "$0$" : `?${b}`;
  void a;
  return juste === q.expected[0] ? [] : [`recalculé ${juste} (${b}), attendu ${q.expected[0]}`];
}
/** Pour n grand, on resserre le pas de Simpson (x^400 varie vite près de 1). */
function lireIntegraleFine(t: string, n: number) {
  const I = lireIntegrale(t, { n });
  return simpson(I.f, I.a, I.b, 40000);
}
function relation(q: Q): string[] {
  const d = premierRang(q.text);
  const u = (n: number) => lireIntegrale(q.text, { n }).valeur;
  return seulChoix(q, (c) => {
    const m = c.replace(/\$/g, "").match(/^([IJu])_\{n\+1\} = (.+)$/);
    if (!m) throw new Error(`relation illisible ${c}`);
    const e = compiler(m[2].replaceAll(`${m[1]}_n`, "y"));
    return [d, d + 1, d + 2, d + 3].every((n) => proche(e({ n, y: u(n) }), u(n + 1), 1e-6));
  });
}

export const CORRECTEURS: CorrecteursMaths = {
  tle_integrale_proprietes_tpl_1: lineaire,
  tle_integrale_proprietes_tpl_2: chasles,
  tle_integrale_proprietes_tpl_3: signe,
  tle_integrale_proprietes_tpl_4: comparer,
  tle_integrale_proprietes_tpl_5: moyenne,
  tle_integrale_proprietes_tpl_6: systeme,
  tle_integrale_encadrer_tpl_1: encadrementHypothese,
  tle_integrale_encadrer_tpl_2: moyenneOuMajorant,
  tle_integrale_encadrer_tpl_3: monotone,
  tle_integrale_encadrer_tpl_4: rectangles,
  tle_integrale_encadrer_tpl_5: contientI,
  tle_integrale_encadrer_tpl_6: comparaison,
  tle_integrale_suite_tpl_1: terme,
  tle_integrale_suite_tpl_2: terme,
  tle_integrale_suite_tpl_3: sens,
  tle_integrale_suite_tpl_4: limite,
  tle_integrale_suite_tpl_5: relation,
  tle_integrale_suite_tpl_6: terme,
};
