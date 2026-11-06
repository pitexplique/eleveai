// Lecteurs communs des correcteurs d'analyse hors France (06/11/2026) : ils relisent la
// fonction écrite dans l'énoncé (morceaux et valeur absolue compris) et les limites données.
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { compiler, type Env, type Fn } from "../../../lycee-correcteurs-commun";

export type Q = TutorGeneratedQuestionV4;
export const segments = (t: string) => t.split("$").filter((_, i) => i % 2 === 1);
export const lu = (s: string) => Number(String(s).replace(/\s/g, "").replace(/−/g, "-").replace("{,}", ".").replace(",", "."));
/** Le dernier paragraphe : la question. */
export const finale = (t: string) => t.split("\n\n").at(-1) ?? t;

/** |…| se lit comme une racine de carré, seule écriture que `compiler` connaît. */
export const sansAbs = (s: string) => s.replace(/\|([^|]+)\|/g, "\\sqrt{($1)^{2}}");
export const comp = (s: string): Fn => compiler(sansAbs(s));

/** Une condition « x < 2 », « 1 \leqslant x < 3 », « x \neq 2 », « x = 2 ». */
function condition(c: string): (x: number) => boolean {
  const m = c.trim().match(/^(?:(-?[\d{},]+) (<|\\leqslant) )?x (<|>|\\geqslant|\\leqslant|=|\\neq) (-?[\d{},]+)$/);
  if (!m) throw new Error(`condition illisible : ${c}`);
  const b = lu(m[4]);
  const droite = (x: number) => {
    switch (m[3]) {
      case "<":
        return x < b;
      case ">":
        return x > b;
      case "\\geqslant":
        return x >= b;
      case "\\leqslant":
        return x <= b;
      case "=":
        return x === b;
      default:
        return x !== b;
    }
  };
  if (!m[1]) return droite;
  const a = lu(m[1]);
  return (x) => (m[2] === "<" ? a < x : a <= x) && droite(x);
}

export type Morceau = { f: Fn; dans: (x: number) => boolean };
/** Les morceaux d'un `cases`, ou null. */
export function lireMorceaux(t: string): Morceau[] | null {
  const m = t.match(/\\begin\{cases\}(.*?)\\end\{cases\}/s);
  if (!m) return null;
  return m[1].split("\\\\").map((l) => {
    const [e, c] = l.split("&");
    const cond = c.replace(/\\text\{si \}/, "").trim();
    return { f: comp(e.trim()), dans: condition(cond) };
  });
}

/** La fonction de l'énoncé, à morceaux ou non : x ↦ valeur (`env` pour un paramètre k, m…). */
export function fonctionTexte(t: string, env: Env = {}, nom = "[a-zA-Z]"): (x: number) => number {
  const morceaux = lireMorceaux(t);
  if (morceaux)
    return (x) => {
      const p = morceaux.find((k) => k.dans(x));
      return p ? p.f({ ...env, x }) : NaN;
    };
  const seg = segments(t)
    .map((s) => s.match(new RegExp(`^${nom}\\(x\\) = (.+)$`, "s")))
    .find(Boolean);
  if (!seg) throw new Error(`fonction illisible : ${t}`);
  const f = comp(seg[1]);
  return (x) => f({ ...env, x });
}

/** Le côté et le point d'une écriture « \lim_{x \to 2^{-}} ». */
export function limEcrite(t: string) {
  const m = t.match(/x \\to (-?[\d{},]+)\^\{([-+])\}/);
  if (!m) throw new Error(`limite illisible : ${t}`);
  return { a: lu(m[1]), s: m[2] === "-" ? -1 : 1 };
}
/** « = valeur » d'un segment, ±∞ compris. */
export function valeurLim(s: string) {
  const v = s.slice(s.lastIndexOf("=") + 1).trim();
  if (v === "+\\infty") return Infinity;
  if (v === "-\\infty") return -Infinity;
  return lu(v);
}
/** Une droite écrite « $y = 2x + 3$ ». */
export function droiteLue(c: string): ((x: number) => number) | null {
  const m = c.match(/^\$y = (.+)\$$/);
  if (!m) return null;
  const f = comp(m[1]);
  return (x) => f({ x });
}
export const egal = (a: number, b: number, tol = 1e-3) => Math.abs(a - b) < tol;
export const corrige = (q: Q, juste: string) => (q.expected[0] === juste ? [] : [`attendu ${q.expected[0]}, recalculé ${juste}`]);
export const courtJuste = (q: Q, v: number, tol = 1e-4) => (Math.abs(lu(String(q.expected[0])) - v) < tol ? [] : [`attendu ${q.expected[0]}, recalculé ${v}`]);
export const mqFabrique = (P: string) => (micro: string, l: Record<number, (q: Q) => string[]>) =>
  Object.fromEntries(Object.entries(l).map(([n, c]) => [`${P}${micro}_tpl_${n}`, c]));
