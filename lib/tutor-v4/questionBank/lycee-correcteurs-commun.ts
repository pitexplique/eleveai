// RELIRE LE TEXTE ET RECALCULER (05/11/2026) : un petit interpréteur du LaTeX des
// énoncés de lycée. Les correcteurs n'utilisent JAMAIS les valeurs du gabarit :
// ils lisent la fonction écrite, l'intègrent (Simpson), la dérivent (différences
// finies), testent les racines. Si l'écriture change, ils échouent : tant mieux.

import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

export type Env = Record<string, number>;
export type Fn = (env: Env) => number;

export function compiler(src: string): Fn {
  const s = src
    // Mise en page à 375 px (`tenir-375.ts`, équations différentielles) : rien de mathématique.
    .replace(/\\nobreak|\\footnotesize|\\scriptsize|\\begin\{aligned\}|\\end\{aligned\}|&|\\\\/g, "")
    .replace(/\\mathrm\{e\}/g, "e")
    .replace(/\\left|\\right|\\,|\\!|\\;|\\displaystyle/g, "")
    .replace(/\{,\}/g, ",")
    .replace(/−/g, "-")
    .replace(/\\dfrac|\\tfrac/g, "\\frac")
    .replace(/\s+/g, "");
  let i = 0;
  const estDebutAtome = () => /[0-9a-zA-Z({\\]/.test(s[i] ?? "") && !s.startsWith("\\times", i) && !s.startsWith("\\cdot", i);
  function expr(): Fn {
    let g = terme();
    while (s[i] === "+" || s[i] === "-") {
      const op = s[i++];
      const d = terme();
      const a = g;
      g = op === "+" ? (e) => a(e) + d(e) : (e) => a(e) - d(e);
    }
    return g;
  }
  function terme(): Fn {
    let signe = 1;
    while (s[i] === "-" || s[i] === "+") {
      if (s[i] === "-") signe = -signe;
      i++;
    }
    let g = puissance();
    for (;;) {
      if (s.startsWith("\\times", i) || s.startsWith("\\cdot", i)) {
        i += s.startsWith("\\times", i) ? 6 : 5;
        const d = puissance();
        const a = g;
        g = (e) => a(e) * d(e);
      } else if (s[i] === "/") {
        i++;
        const d = puissance();
        const a = g;
        g = (e) => a(e) / d(e);
      } else if (estDebutAtome()) {
        const d = puissance();
        const a = g;
        g = (e) => a(e) * d(e);
      } else break;
    }
    const f = g;
    return signe === 1 ? f : (e) => -f(e);
  }
  function groupe(): Fn {
    if (s[i] !== "{") throw new Error(`« { » attendu dans ${src} à ${i}`);
    i++;
    const g = expr();
    if (s[i] !== "}") throw new Error(`« } » attendu dans ${src} à ${i}`);
    i++;
    return g;
  }
  function puissance(): Fn {
    const b = atome();
    if (s[i] === "^") {
      i++;
      let ex: Fn;
      if (s[i] === "{") ex = groupe();
      else if (/\d/.test(s[i])) {
        const v = Number(s[i++]);
        ex = () => v;
      } else {
        const l = s[i++];
        ex = (e) => e[l];
      }
      return (e) => Math.pow(b(e), ex(e));
    }
    return b;
  }
  function fonction(f: (x: number) => number): Fn {
    if (s[i] === "(") {
      i++;
      const g = expr();
      if (s[i] !== ")") throw new Error(`« ) » attendu dans ${src}`);
      i++;
      return (e) => f(g(e));
    }
    const g = puissance();
    return (e) => f(g(e));
  }
  function atome(): Fn {
    const c = s[i];
    if (c === undefined) throw new Error(`fin inattendue dans ${src}`);
    if (/\d/.test(c)) {
      const m = s.slice(i).match(/^\d+(?:[,.]\d+)?/)!;
      i += m[0].length;
      const v = Number(m[0].replace(",", "."));
      return () => v;
    }
    if (c === "(") {
      i++;
      const g = expr();
      if (s[i] !== ")") throw new Error(`« ) » attendu dans ${src}`);
      i++;
      return g;
    }
    if (c === "{") return groupe();
    if (c === "\\") {
      const m = s.slice(i).match(/^\\(?:pi|ln|sin|cos|tan|sqrt|frac)/);
      if (!m) throw new Error(`commande illisible dans ${src}`);
      i += m[0].length;
      switch (m[0]) {
        case "\\pi":
          return () => Math.PI;
        case "\\ln":
          return fonction(Math.log);
        case "\\sin":
          return fonction(Math.sin);
        case "\\cos":
          return fonction(Math.cos);
        case "\\tan":
          return fonction(Math.tan);
        case "\\sqrt": {
          const g = groupe();
          return (e) => Math.sqrt(g(e));
        }
        case "\\frac": {
          const a = groupe();
          const b = groupe();
          return (e) => a(e) / b(e);
        }
        default:
          throw new Error(`commande inconnue ${m[0]} dans ${src}`);
      }
    }
    if (c === "e") {
      i++;
      return () => Math.E;
    }
    if (/[a-zA-Z]/.test(c)) {
      i++;
      return (e) => {
        if (!(c in e)) throw new Error(`variable ${c} sans valeur dans ${src}`);
        return e[c];
      };
    }
    throw new Error(`caractère « ${c} » illisible dans ${src} à ${i}`);
  }
  const g = expr();
  if (i !== s.length) throw new Error(`reste « ${s.slice(i)} » dans ${src}`);
  return g;
}

export const val = (src: string, env: Env = {}) => compiler(src)(env);

export function simpson(f: (x: number) => number, a: number, b: number, n = 2000) {
  const h = (b - a) / n;
  let s = f(a) + f(b);
  for (let k = 1; k < n; k++) s += f(a + k * h) * (k % 2 ? 4 : 2);
  return (s * h) / 3;
}
export const deriveeNum = (f: (x: number) => number, x: number, h = 1e-5) => (f(x + h) - f(x - h)) / (2 * h);
export const proche = (a: number, b: number, tol = 1e-6) => Math.abs(a - b) < tol;

/** Lit « {…} » équilibré à partir de la position `i` : renvoie contenu et position suivante. */
function accolade(t: string, i: number): [string, number] {
  if (t[i] !== "{") throw new Error(`accolade attendue : ${t.slice(i, i + 20)}`);
  let n = 0;
  for (let k = i; k < t.length; k++) {
    if (t[k] === "{") n++;
    if (t[k] === "}" && --n === 0) return [t.slice(i + 1, k), k + 1];
  }
  throw new Error("accolade non fermée");
}

/** Une intégrale du texte (`rang` = 0 pour la première) : `\int_{a}^{b} f\,\mathrm{d}x`. */
export function lireIntegrale(t: string, env: Env = {}, rang = 0) {
  let d = -1;
  for (let k = 0; k <= rang; k++) d = t.indexOf("\\int_", d + 1);
  if (d < 0) throw new Error(`pas d'intégrale dans ${t}`);
  const [a, p1] = accolade(t, d + 5);
  const [b, p2] = accolade(t, p1 + 1);
  const m = t.slice(p2).match(/^(.*?)\\,\\mathrm\{d\}([a-z])/);
  if (!m) throw new Error(`intégrande illisible : ${t.slice(p2, p2 + 40)}`);
  const c = compiler(m[1]);
  const v = m[2];
  const A = val(a, env);
  const B = val(b, env);
  const f = (x: number) => c({ ...env, [v]: x });
  return { a: A, b: B, f, valeur: simpson(f, A, B), source: m[1], variable: v };
}

/** Le contenu d'une proposition : sans les $, sans « I = ». */
export const nue = (c: string) => c.replace(/\$/g, "").replace(/^[^=]*=\s*/, "").trim();

/** Vide si la réponse est bien l'UNIQUE proposition qui vaut `v` (ou, en réponse courte, vaut `v`). */
export function seuleJuste(q: TutorGeneratedQuestionV4, v: number, env: Env = {}, tol = 1e-6): string[] {
  if (q.format !== "qcm") {
    const lu = Number(String(q.expected[0]).replace(",", "."));
    return proche(lu, v, tol) ? [] : [`réponse ${q.expected[0]}, recalculé ${v}`];
  }
  const justes = (q.choices ?? []).filter((c) => proche(val(nue(c), env), v, tol));
  if (justes.length !== 1) return [`${justes.length} proposition(s) valent ${v} : ${q.choices?.join(" | ")}`];
  return justes[0] === q.expected[0] ? [] : [`attendu ${q.expected[0]}, recalculé ${justes[0]}`];
}

/** La fonction écrite dans l'énoncé : « f(x) = … » jusqu'au $ suivant. */
export function lireFonction(t: string, nom = "[a-zA-Z]", vr = "[a-z]") {
  const m = t.match(new RegExp(`(${nom})\\((${vr})\\)\\s*=\\s*([^$]+?)\\s*\\$`));
  if (!m) throw new Error(`fonction illisible : ${t.slice(0, 80)}`);
  const c = compiler(m[3]);
  const v = m[2];
  return { nom: m[1], source: m[3], variable: v, f: (x: number) => c({ [v]: x }) };
}

/** L'intervalle `[a\,;b]` écrit dans un texte (le premier). */
export function lireIntervalle(t: string): [number, number] {
  const m = t.match(/\[\s*([^\[\];$]+?)\s*\\,;\s*([^\[\];$]+?)\s*\]/);
  if (!m) throw new Error(`intervalle illisible : ${t.slice(0, 80)}`);
  return [val(m[1]), val(m[2])];
}

/** Une proposition qui est l'unique juste selon un test. */
export function seulChoix(q: TutorGeneratedQuestionV4, test: (c: string) => boolean): string[] {
  const justes = (q.choices ?? []).filter(test);
  if (justes.length !== 1) return [`${justes.length} proposition(s) justes : ${q.choices?.join(" | ")}`];
  return justes[0] === q.expected[0] ? [] : [`attendu ${q.expected[0]}, juste ${justes[0]}`];
}

/** Tous les nombres écrits dans un texte, virgule française ou {,}. */
export function nombres(t: string): number[] {
  return [...t.replace(/\{,\}/g, ",").replace(/−/g, "-").matchAll(/-?\d+(?:,\d+)?/g)].map((m) => Number(m[0].replace(",", ".")));
}
