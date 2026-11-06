// Correcteurs des nombres complexes (06/11/2026) : un petit interpréteur du LaTeX des énoncés,
// avec sa propre arithmétique complexe. Ils relisent le texte, la figure et chaque proposition,
// recalculent, et n'utilisent aucune valeur du gabarit ni aucun outil de la banque.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { seulChoix } from "../../../lycee-correcteurs-commun";

type Q = TutorGeneratedQuestionV4;
type C = [number, number];
type Env = Record<string, C>;

/* ───────────────── arithmétique ───────────────── */

const add = (u: C, v: C): C => [u[0] + v[0], u[1] + v[1]];
const sub = (u: C, v: C): C => [u[0] - v[0], u[1] - v[1]];
const mul = (u: C, v: C): C => [u[0] * v[0] - u[1] * v[1], u[0] * v[1] + u[1] * v[0]];
const abs = (u: C) => Math.hypot(u[0], u[1]);
const conj = (u: C): C => [u[0], -u[1]];
function div(u: C, v: C): C {
  const n = v[0] * v[0] + v[1] * v[1];
  if (n === 0) throw new Error("division par 0");
  return [(u[0] * v[0] + u[1] * v[1]) / n, (u[1] * v[0] - u[0] * v[1]) / n];
}
const exp = (u: C): C => [Math.exp(u[0]) * Math.cos(u[1]), Math.exp(u[0]) * Math.sin(u[1])];
const unit = (t: number): C => [Math.cos(t), Math.sin(t)];
const arg = (u: C) => Math.atan2(u[1], u[0]);
function ipow(u: C, n: number): C {
  let r: C = [1, 0];
  for (let k = 0; k < Math.abs(n); k++) r = mul(r, u);
  return n < 0 ? div([1, 0], r) : r;
}
const egal = (u: C, v: C, tol = 1e-6) => abs(sub(u, v)) <= tol * Math.max(1, abs(u), abs(v));
const reel = (u: C, tol = 1e-9) => Math.abs(u[1]) <= tol * Math.max(1, abs(u));
const memeAngle = (a: number, b: number) => egal(unit(a), unit(b), 1e-7);

/* ───────────────── lecture du LaTeX ───────────────── */

function normal(src: string) {
  return src
    .replace(/\\footnotesize\s*|\\nobreak\s*/g, "")
    .replace(/\\bigl\(/g, "(")
    .replace(/\\bigr\)/g, ")")
    .replace(/\\mathrm\{e\}/g, "e")
    .replace(/\\left\|/g, "⟦")
    .replace(/\\right\|/g, "⟧")
    .replace(/\\left\(/g, "(")
    .replace(/\\right\)/g, ")")
    .replace(/\\,|\\!|\\;|\\displaystyle/g, "")
    .replace(/\{,\}/g, ".")
    .replace(/(\d),(\d)/g, "$1.$2")
    .replace(/[−–]/g, "-")
    .replace(/\\dfrac|\\tfrac/g, "\\frac")
    .replace(/\\times|\\cdot/g, "*")
    .replace(/\s+/g, "");
}

/** Le nombre que vaut une écriture ; lève une erreur si un morceau est illisible. */
function V(src: string, env: Env = {}): C {
  const s = normal(src);
  let i = 0;
  const debut = () => /[0-9a-zA-Z(⟦\\{]/.test(s[i] ?? "");
  function expr(): C {
    let g = terme();
    while (s[i] === "+" || s[i] === "-") {
      const op = s[i++];
      const d = terme();
      g = op === "+" ? add(g, d) : sub(g, d);
    }
    return g;
  }
  function terme(): C {
    let signe = 1;
    while (s[i] === "-" || s[i] === "+") {
      if (s[i] === "-") signe = -signe;
      i++;
    }
    let g = facteur();
    for (;;) {
      if (s[i] === "*") {
        i++;
        g = mul(g, facteur());
      } else if (s[i] === "/") {
        i++;
        g = div(g, facteur());
      } else if (debut()) g = mul(g, facteur());
      else break;
    }
    return signe === 1 ? g : [-g[0], -g[1]];
  }
  function groupe(): C {
    if (s[i] !== "{") throw new Error(`« { » attendu dans ${src}`);
    i++;
    const g = expr();
    if (s[i] !== "}") throw new Error(`« } » attendu dans ${src}`);
    i++;
    return g;
  }
  function exposant(): C {
    i++;
    if (s[i] === "{") return groupe();
    if (/\d/.test(s[i])) return [Number(s[i++]), 0];
    throw new Error(`exposant illisible dans ${src}`);
  }
  function facteur(): C {
    if (s[i] === "e") {
      i++;
      if (s[i] !== "^") return [Math.E, 0];
      return exp(exposant());
    }
    const b = atome();
    if (s[i] !== "^") return b;
    const e = exposant();
    if (reel(e) && Number.isInteger(Math.round(e[0] * 1e9) / 1e9)) return ipow(b, Math.round(e[0]));
    if (reel(b) && reel(e) && b[0] >= 0) return [b[0] ** e[0], 0];
    throw new Error(`puissance illisible dans ${src}`);
  }
  function trig(f: (x: number) => number): C {
    let p = 1;
    if (s[i] === "^") {
      const e = exposant();
      p = e[0];
    }
    const x = atome();
    if (!reel(x)) throw new Error(`angle non réel dans ${src}`);
    return [f(x[0]) ** p, 0];
  }
  function atome(): C {
    const c = s[i];
    if (c === undefined) throw new Error(`fin inattendue dans ${src}`);
    if (/\d/.test(c)) {
      const m = s.slice(i).match(/^\d+(?:\.\d+)?/)!;
      i += m[0].length;
      return [Number(m[0]), 0];
    }
    if (c === "(") {
      i++;
      const g = expr();
      if (s[i] !== ")") throw new Error(`« ) » attendu dans ${src}`);
      i++;
      return g;
    }
    if (c === "⟦") {
      i++;
      const g = expr();
      if (s[i] !== "⟧") throw new Error(`« | » attendu dans ${src}`);
      i++;
      return [abs(g), 0];
    }
    if (c === "{") return groupe();
    if (c === "\\") {
      const m = s.slice(i).match(/^\\(?:pi|theta|omega|sqrt|frac|cos|sin|overline|arg)/);
      if (!m) throw new Error(`commande illisible dans ${src} à ${i}`);
      i += m[0].length;
      switch (m[0]) {
        case "\\pi":
          return [Math.PI, 0];
        case "\\theta":
        case "\\omega":
          return lire(m[0]);
        case "\\sqrt": {
          const g = groupe();
          if (!reel(g) || g[0] < 0) throw new Error(`racine illisible dans ${src}`);
          return [Math.sqrt(g[0]), 0];
        }
        case "\\frac": {
          const a = groupe();
          return div(a, groupe());
        }
        case "\\cos":
          return trig(Math.cos);
        case "\\sin":
          return trig(Math.sin);
        case "\\overline":
          return conj(groupe());
        case "\\arg":
          return [arg(atome()), 0];
      }
    }
    if (c === "i" && s[i + 1] !== "_") {
      i++;
      return [0, 1];
    }
    if (/[a-zA-Z]/.test(c)) {
      let nomV = c;
      i++;
      if (s[i] === "_") {
        i++;
        if (s[i] === "{") {
          const fin = s.indexOf("}", i);
          nomV += `_${s.slice(i + 1, fin)}`;
          i = fin + 1;
        } else nomV += `_${s[i++]}`;
      }
      while (s[i] === "'") {
        nomV += "'";
        i++;
      }
      return lire(nomV);
    }
    throw new Error(`caractère « ${c} » illisible dans ${src} à ${i}`);
  }
  function lire(n: string): C {
    if (!(n in env)) throw new Error(`« ${n} » sans valeur dans ${src}`);
    return env[n];
  }
  const g = expr();
  if (i !== s.length) throw new Error(`reste « ${s.slice(i)} » dans ${src}`);
  return g;
}

const nom = (n: string) => normal(n).replace(/_\{([^}]*)\}/, "_$1");
const segs = (t: string) => t.split("$").filter((_, k) => k % 2 === 1);
const dernier = (q: Q) => {
  const l = segs(q.text);
  if (!l.length) throw new Error(`aucune formule : ${q.text}`);
  return l[l.length - 1].replace(/^\\footnotesize\s*/, "");
};
const droite = (s: string) => s.split(" = ").pop()!;
/** Toutes les données de l'énoncé : « z = … », « |z| = … », « arg(z) = … », dans l'ordre. */
function donnees(t: string): Env {
  const env: Env = {};
  for (const s of segs(t)) {
    const mod = s.match(/^\\left\|([a-z])\\right\| = (.+)$/);
    if (mod) {
      env[mod[1]] = V(mod[2]);
      continue;
    }
    const a = s.match(/^\\arg\(([a-z])\) = (.+)$/);
    if (a) {
      env[a[1]] = unit(V(a[2])[0]);
      continue;
    }
    const m = s.match(/^(\\?[A-Za-z]+(?:_\{[^}]*\}|_\w)?'*) = (.+)$/);
    if (!m) continue;
    try {
      env[nom(m[1])] = V(m[2], env);
    } catch {
      /* une formule à inconnue (z' = az + b) n'est pas une donnée */
    }
  }
  return env;
}
const proposition = (c: string) => droite(c.replace(/\$/g, "").trim());
const attendu = (q: Q) => V(String(q.expected[0]));

/** La réponse courte vaut v, ou l'unique proposition juste vaut v. */
function juge(q: Q, v: C, env: Env = {}): string[] {
  if (q.format === "qcm") return seulChoix(q, (c) => egal(V(proposition(c), env), v));
  return egal(attendu(q), v) ? [] : [`attendu ${q.expected[0]}, recalculé ${v}`];
}
/** L'unique proposition est une mesure de l'angle cherché. */
function jugeAngle(q: Q, t: number, env: Env = {}): string[] {
  return seulChoix(q, (c) => memeAngle(V(proposition(c), env)[0], t));
}

/* ───────────────── correcteurs généraux ───────────────── */

/** La formule de fin (à droite d'un éventuel « = ») se recalcule. */
const calc = (q: Q) => {
  const env = donnees(q.text);
  return juge(q, V(droite(dernier(q)), env), env);
};
const moduleDe = (q: Q) => {
  const env = donnees(q.text);
  return juge(q, [abs(V(droite(dernier(q)), env)), 0], env);
};
const argumentDe = (q: Q) => {
  const env = donnees(q.text);
  return jugeAngle(q, arg(V(droite(dernier(q)), env)), env);
};
/** Une mesure écrite \arg(…) : la valeur est déjà un angle. */
const angleEcrit = (q: Q) => {
  const env = donnees(q.text);
  return jugeAngle(q, V(dernier(q), env)[0], env);
};
function membres(s: string): [string, string] {
  const l = s.split(" = ");
  if (l.length !== 2) throw new Error(`pas une équation : ${s}`);
  return [l[0], l[1]];
}
const verifie = (eq: string, env: Env) => {
  const [g, d] = membres(eq);
  return egal(V(g, env), V(d, env), 1e-7);
};
/** La réponse, remise dans l'équation de fin, la rend vraie. */
const equation = (q: Q) => {
  const env = donnees(q.text);
  const eq = dernier(q);
  if (q.format === "qcm") return seulChoix(q, (c) => verifie(eq, { ...env, z: V(proposition(c), env) }));
  return verifie(eq, { ...env, z: attendu(q) }) ? [] : [`${q.expected[0]} ne vérifie pas ${eq}`];
};
/** Paires « z = u ou z = v » : les deux solutions, distinctes, vérifient l'équation. */
const paires = (q: Q) => {
  const eq = dernier(q);
  return seulChoix(q, (c) => {
    const l = segs(c).map((s) => V(droite(s)));
    return l.length === 2 && !egal(l[0], l[1]) && l.every((z) => verifie(eq, { z }));
  });
};
/** Une égalité vraie pour plusieurs réels. */
const POINTS = [0.7, 1.3, 2.1, -0.9, 3.4];
const envReel = (x: number): Env => ({ x: [x, 0], t: [x, 0] });
const egaliteVraie = (q: Q) =>
  seulChoix(q, (c) => {
    const [g, d] = membres(c.replace(/\$/g, ""));
    return POINTS.every((x) => egal(V(g, envReel(x)), V(d, envReel(x)), 1e-7));
  });
const memeFonction = (q: Q) => {
  const f = dernier(q);
  return seulChoix(q, (c) => POINTS.every((x) => egal(V(f, envReel(x)), V(c.replace(/\$/g, ""), envReel(x)), 1e-7)));
};

/* ───────────────── forme algébrique, conjugué ───────────────── */

function partie(q: Q) {
  const z = V(droite(dernier(q)));
  const v = /partie réelle/.test(q.text) ? z[0] : z[1];
  if (!/partie (réelle|imaginaire)/.test(q.text)) throw new Error(`illisible : ${q.text}`);
  return egal(attendu(q), [v, 0]) ? [] : [`attendu ${q.expected[0]}, recalculé ${v}`];
}
function identification(q: Q) {
  const L = segs(q.text).find((s) => s === "x" || s === "y");
  if (!L) throw new Error(`lettre illisible : ${q.text}`);
  const [g, d] = membres(dernier(q));
  const v = attendu(q);
  const R = V(d);
  const G = V(g, L === "x" ? { x: v, y: [0, 0] } : { x: [0, 0], y: v });
  const ok = L === "x" ? Math.abs(G[0] - R[0]) < 1e-9 : Math.abs(G[1] - R[1]) < 1e-9;
  return ok ? [] : [`${L} = ${q.expected[0]} ne convient pas : ${dernier(q)}`];
}
function reelOuPur(q: Q) {
  const pur = /imaginaire pur/.test(q.text);
  const z = V(droite(dernier(q)), { x: attendu(q) });
  const [nul, autre] = pur ? [z[0], z[1]] : [z[1], z[0]];
  if (Math.abs(nul) > 1e-9) return [`partie non nulle : ${dernier(q)} pour x = ${q.expected[0]}`];
  return pur && Math.abs(autre) < 1e-9 ? ["le nombre est nul, pas imaginaire pur"] : [];
}
function conjugueConnu(q: Q) {
  return egal(conj(attendu(q)), V(droite(dernier(q)))) ? [] : [`mauvais z : ${q.expected[0]}`];
}
const FAMILLES: Record<string, C[]> = {
  "Un réel": [[2, 0], [-3, 0], [0.5, 0]],
  "Un imaginaire pur": [[0, 2], [0, -5], [0, 0.5]],
  "Un complexe de module 1": [unit(1), unit(2), unit(-0.5)],
  "Un complexe de partie réelle 1": [[1, 2], [1, -1], [1, 0.5]],
};
function famille(q: Q) {
  const eq = dernier(q);
  const justes = Object.entries(FAMILLES).filter(([, l]) => l.every((z) => verifie(eq, { z }))).map(([n]) => n);
  if (justes.length !== 1) return [`${justes.length} familles conviennent à ${eq}`];
  return justes[0] === q.expected[0] ? [] : [`attendu ${q.expected[0]}, recalculé ${justes[0]}`];
}

/* ───────────────── figure ───────────────── */

function pointFigure(q: Q): C {
  const p = (q.canvas as { points?: { x: number; y: number }[] } | undefined)?.points?.[0];
  if (!p) throw new Error("figure sans point");
  return [p.x, p.y];
}
const moduleFigure = (q: Q) => juge(q, [abs(pointFigure(q)), 0]);
const affixeFigure = (q: Q) => juge(q, pointFigure(q));

/* ───────────────── exponentielle ───────────────── */

function rotations(q: Q) {
  const env = donnees(q.text);
  const n = q.text.match(/Après (\d+) /);
  if (!n) throw new Error(`illisible : ${q.text}`);
  return juge(q, mul(env.z, unit(Number(n[1]) * env["\\theta"][0])), env);
}

/* ───────────────── équations ───────────────── */

function coefficients(s: string, v: string) {
  const f = (x: number) => V(s.replace(" = 0", ""), { [v]: [x, 0] })[0];
  const [c, p, m] = [f(0), f(1), f(-1)];
  return { a: (p + m) / 2 - c, b: (p - m) / 2, c };
}
function discriminant(q: Q) {
  const { a, b, c } = coefficients(dernier(q), "z");
  return juge(q, [b * b - 4 * a * c, 0]);
}
function natureSolutions(q: Q) {
  const { a, b, c } = coefficients(dernier(q), "z");
  const D = b * b - 4 * a * c;
  const j = D > 1e-9 ? "Deux solutions réelles distinctes" : D < -1e-9 ? "Deux solutions complexes conjuguées, non réelles" : "Une solution réelle double";
  return q.expected[0] === j ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`];
}
function pulsation(q: Q) {
  const { a, b, c } = coefficients(dernier(q), "r");
  const D = b * b - 4 * a * c;
  if (D >= 0) return ["discriminant positif"];
  return juge(q, [Math.sqrt(-D) / (2 * a), 0]);
}
const carre = (q: Q) => {
  const w = V(dernier(q));
  return seulChoix(q, (c) => egal(ipow(V(proposition(c)), 2), w));
};
function autreRacine(q: Q) {
  const env = donnees(q.text);
  const z = attendu(q);
  if (egal(z, env.z_1)) return ["même solution que celle de l'énoncé"];
  return verifie(dernier(q), { z }) ? [] : [`${q.expected[0]} n'est pas solution`];
}
function trinome(q: Q) {
  const z = donnees(q.text).z_1;
  return seulChoix(q, (c) => egal(V(c.replace(/\$/g, ""), { z }), [0, 0]));
}
function racineCarree(q: Q) {
  const z = attendu(q);
  if (z[0] <= 0) return [`partie réelle non positive : ${q.expected[0]}`];
  return egal(ipow(z, 2), V(dernier(q))) ? [] : [`${q.expected[0]} au carré ne redonne pas ${dernier(q)}`];
}
function cubique(q: Q) {
  const eq = dernier(q);
  const r = segs(q.text).map((s) => droite(s)).find((s) => /^-?\d+$/.test(s));
  if (!r) throw new Error(`racine réelle illisible : ${q.text}`);
  if (!verifie(eq, { z: V(r) })) return [`${r} n'est pas solution de ${eq}`];
  return seulChoix(q, (c) => {
    const l = segs(c).map((s) => V(droite(s)));
    return l.length === 2 && !egal(l[0], l[1]) && l.every((z) => !reel(z) && verifie(eq, { z }));
  });
}
function parametre(q: Q) {
  const z = donnees(q.text).z_1;
  return verifie(dernier(q), { z, m: attendu(q) }) ? [] : [`m = ${q.expected[0]} ne convient pas`];
}

/* ───────────────── racines n-ièmes ───────────────── */

function nombreSolutions(q: Q) {
  const n = dernier(q).match(/^z\^\{(\d+)\} = /);
  if (!n) throw new Error(`illisible : ${dernier(q)}`);
  return juge(q, [Number(n[1]), 0]);
}
const POLYGONES: Record<number, string> = { 3: "un triangle équilatéral", 4: "un carré", 5: "un pentagone régulier", 6: "un hexagone régulier", 8: "un octogone régulier" };
function polygone(q: Q) {
  const n = dernier(q).match(/^z\^\{(\d+)\} = 1$/);
  if (!n || !POLYGONES[Number(n[1])]) throw new Error(`illisible : ${dernier(q)}`);
  const j = `C'est ${POLYGONES[Number(n[1])]}`;
  return q.expected[0] === j ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`];
}
function moduleRacines(q: Q) {
  const m = dernier(q).match(/^z\^\{(\d+)\} = (.+)$/);
  if (!m) throw new Error(`illisible : ${dernier(q)}`);
  return juge(q, [abs(V(m[2])) ** (1 / Number(m[1])), 0]);
}
function brancheK(q: Q) {
  const env = donnees(q.text);
  return juge(q, mul(env.r, unit((2 * env.k[0] * Math.PI) / env.n[0])), env);
}

/* ───────────────── géométrie ───────────────── */

function deuxLettres(t: string, motif: RegExp) {
  const m = t.match(motif);
  if (!m) throw new Error(`lettres illisibles : ${t}`);
  return m;
}
function vecteur(q: Q) {
  const env = donnees(q.text);
  const m = deuxLettres(q.text, /\\overrightarrow\{(\w)(\w)\}/);
  return juge(q, sub(env[`z_${m[2]}`], env[`z_${m[1]}`]));
}
function milieu(q: Q) {
  const env = donnees(q.text);
  const m = deuxLettres(q.text, /\[(\w)(\w)\]/);
  return juge(q, div(add(env[`z_${m[1]}`], env[`z_${m[2]}`]), [2, 0]));
}
function gravite(q: Q) {
  const env = donnees(q.text);
  const l = Object.keys(env).filter((k) => k.startsWith("z_")).map((k) => env[k]);
  if (l.length !== 3) throw new Error(`${l.length} sommets : ${q.text}`);
  return juge(q, div(add(add(l[0], l[1]), l[2]), [3, 0]));
}
function parallelogramme(q: Q) {
  const e = donnees(q.text);
  return juge(q, sub(add(e.z_A, e.z_C), e.z_B));
}
function alignement(q: Q) {
  const env = donnees(q.text);
  const seg = dernier(q);
  const [g, d] = membres(seg);
  const zC = V(d, { y: attendu(q) });
  const [a, b] = Object.keys(env).filter((k) => k.startsWith("z_") && k !== nom(g)).map((k) => env[k]);
  return reel(div(sub(zC, a), sub(b, a))) && !egal(b, a) ? [] : [`${seg} : non alignés pour y = ${q.expected[0]}`];
}
function natureTriangle(q: Q) {
  const e = donnees(q.text);
  const [u, v] = [sub(e.z_B, e.z_A), sub(e.z_C, e.z_A)];
  const per = Math.abs(u[0] * v[0] + u[1] * v[1]) < 1e-9;
  const iso = Math.abs(abs(u) - abs(v)) < 1e-9;
  const j = per && iso ? "Rectangle et isocèle en $A$" : per ? "Rectangle en $A$, non isocèle" : iso ? "Isocèle en $A$, non rectangle" : "Ni rectangle ni isocèle en $A$";
  return q.expected[0] === j ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`];
}
function natureQuadrilatere(q: Q) {
  const e = donnees(q.text);
  const [u, v, w] = [sub(e.z_B, e.z_A), sub(e.z_D, e.z_A), sub(e.z_C, e.z_D)];
  if (!egal(u, w)) return ["pas un parallélogramme"];
  const per = Math.abs(u[0] * v[0] + u[1] * v[1]) < 1e-9;
  const iso = Math.abs(abs(u) - abs(v)) < 1e-9;
  const j = per && iso ? "Un carré" : per ? "Un rectangle non carré" : iso ? "Un losange non carré" : "Un parallélogramme quelconque";
  return q.expected[0] === j ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`];
}
function angleOriente(q: Q) {
  const e = donnees(q.text);
  return jugeAngle(q, arg(div(sub(e.z_C, e.z_A), sub(e.z_B, e.z_A))));
}
function lieuCercle(q: Q) {
  const m = dernier(q).match(/^\\left\|z - (.+)\\right\| = (.+)$/);
  if (!m) throw new Error(`illisible : ${dernier(q)}`);
  const [c, r] = [V(m[1]), V(m[2])];
  return seulChoix(q, (x) => {
    if (!x.startsWith("Le cercle")) return false;
    const l = segs(x);
    return egal(V(l[0]), c) && egal(V(l[1]), r);
  });
}
function cocycliquesQuotient(q: Q) {
  const e = donnees(q.text);
  const k = mul(div(sub(e.z_C, e.z_A), sub(e.z_C, e.z_B)), div(sub(e.z_D, e.z_B), sub(e.z_D, e.z_A)));
  const j = Math.abs(k[1]) < 1e-9 ? "Cocycliques : ce quotient est réel" : "Non cocycliques : ce quotient n'est pas réel";
  return q.expected[0] === j ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`];
}
function cocycliques(q: Q) {
  const e = donnees(q.text);
  const w = e["\\omega"];
  const r = abs(sub(e.z_A, w));
  if (Math.abs(abs(sub(e.z_B, w)) - r) > 1e-9) return ["A et B ne sont pas sur le même cercle"];
  return seulChoix(q, (c) => Math.abs(abs(sub(V(proposition(c)), w)) - r) < 1e-9);
}
function distanceDeux(q: Q) {
  const l = segs(q.text).map((s) => V(s));
  if (l.length !== 2) throw new Error(`${l.length} points : ${q.text}`);
  return juge(q, [abs(sub(l[1], l[0])), 0]);
}

/* ───────────────── transformations ───────────────── */

/** La formule « z' = … » de l'énoncé, comme fonction de z. */
function formule(s: string, env: Env = {}) {
  const d = droite(s);
  return (z: C) => V(d, { ...env, z });
}
function coefs(s: string) {
  const f = formule(s);
  const b = f([0, 0]);
  return { a: sub(f([1, 0]), b), b };
}
const formuleDe = (q: Q) => {
  const s = segs(q.text).map((x) => x.replace(/^\\footnotesize\s*/, "")).find((x) => /^z' = /.test(x) && !/= az/.test(x));
  if (!s) throw new Error(`formule illisible : ${q.text}`);
  return s;
};
/** L'unique proposition est la même transformation que g. */
function memeTransfo(q: Q, g: (z: C) => C) {
  return seulChoix(q, (c) => {
    const f = formule(c.replace(/\$/g, ""));
    return ([[0, 0], [1, 0], [2, 1], [-1, 3]] as C[]).every((z) => egal(f(z), g(z)));
  });
}
function translation(q: Q) {
  const env = donnees(q.text);
  const b = q.text.match(/vecteur d'affixe \$([^$]+)\$/);
  if (!b) throw new Error(`vecteur illisible : ${q.text}`);
  return juge(q, add(env.z, V(b[1])));
}
const homothetieO = (q: Q) => {
  const e = donnees(q.text);
  return juge(q, mul(e.k, e.z));
};
const rotationO = (q: Q) => {
  const e = donnees(q.text);
  return juge(q, mul(unit(e["\\theta"][0]), e.z), e);
};
function natureEcriture(q: Q) {
  const f = formule(dernier(q));
  const b = f([0, 0]);
  const a = sub(f([1, 0]), b);
  let j: string;
  // Une écriture en z̄ n'est pas linéaire : l'image de i n'est pas a × i.
  if (!egal(sub(f([0, 1]), b), mul(a, [0, 1]))) j = "La symétrie par rapport à l'axe des réels";
  else if (egal(a, [1, 0])) j = "Une translation";
  else if (reel(a) && egal(b, [0, 0])) j = "Une homothétie de centre $O$";
  else if (Math.abs(abs(a) - 1) < 1e-9 && egal(b, [0, 0])) j = "Une rotation de centre $O$";
  else throw new Error(`nature inconnue : ${dernier(q)}`);
  return q.expected[0] === j ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`];
}
function ecritureHomothetie(q: Q) {
  const e = donnees(q.text);
  return memeTransfo(q, (z) => add(e["\\omega"], mul(e.k, sub(z, e["\\omega"]))));
}
function ecritureRotation(q: Q) {
  const e = donnees(q.text);
  return memeTransfo(q, (z) => add(e["\\omega"], mul(unit(e["\\theta"][0]), sub(z, e["\\omega"]))));
}
function imageCentre(q: Q) {
  const e = donnees(q.text);
  const w = e["\\omega"];
  if (/homothétie/.test(q.text)) return juge(q, add(w, mul(e.k, sub(e.z, w))));
  if (/symétrie/.test(q.text)) return juge(q, sub(mul([2, 0], w), e.z));
  if (/rotation/.test(q.text)) return juge(q, add(w, mul(unit(e["\\theta"][0]), sub(e.z, w))));
  throw new Error(`transformation illisible : ${q.text}`);
}
function pointFixe(q: Q) {
  const w = attendu(q);
  return egal(formule(dernier(q))(w), w) ? [] : [`${q.expected[0]} n'est pas fixe : ${dernier(q)}`];
}
function reconnaitre(q: Q) {
  const e = donnees(q.text);
  const k = div(e.z_B, e.z_A);
  return seulChoix(q, (c) => {
    const l = segs(c);
    const v = V(l[l.length - 1]);
    return egal(k, /rotation/.test(c) ? unit(v[0]) : v);
  });
}
function composee(q: Q) {
  let z = donnees(q.text).z;
  const motif = /(translation de vecteur d'affixe|homothétie de centre \$O\$ et de rapport|rotation de centre \$O\$ et d'angle) \$([^$]+)\$/g;
  const l = [...q.text.matchAll(motif)];
  if (l.length !== 2) throw new Error(`${l.length} transformations : ${q.text}`);
  for (const m of l) {
    const v = V(m[2]);
    z = m[1].startsWith("translation") ? add(z, v) : m[1].startsWith("homothétie") ? mul(v, z) : mul(unit(v[0]), z);
  }
  return juge(q, z);
}
function quartsDeTour(q: Q) {
  const z = donnees(q.text).z;
  const n = q.text.match(/après (\d+) étapes/);
  if (!n || !/quart de tour/.test(q.text)) throw new Error(`illisible : ${q.text}`);
  return juge(q, mul(ipow([0, /sens indirect/.test(q.text) ? -1 : 1], Number(n[1])), z));
}

/* ───────────────── similitudes ───────────────── */

const rapport = (q: Q) => juge(q, [abs(coefs(formuleDe(q)).a), 0]);
const angleSim = (q: Q) => jugeAngle(q, arg(coefs(formuleDe(q)).a));
function imageSim(q: Q) {
  return juge(q, formule(formuleDe(q))(donnees(q.text).z));
}
function ecritureSim(q: Q) {
  const e = donnees(q.text);
  const a = mul(e.k, unit(e["\\theta"][0]));
  return memeTransfo(q, (z) => add(e["\\omega"], mul(a, sub(z, e["\\omega"]))));
}
function natureSim(q: Q) {
  const { a } = coefs(dernier(q));
  const j = egal(a, [1, 0]) ? "Une translation" : reel(a) ? "Une homothétie" : Math.abs(abs(a) - 1) < 1e-9 ? "Une rotation" : "Une similitude d'un autre type";
  return q.expected[0] === j ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`];
}
function elements(q: Q) {
  const { a, b } = coefs(dernier(q));
  const w = div(b, sub([1, 0], a));
  return seulChoix(q, (c) => {
    const [r, t, o] = segs(c).map((s) => V(s));
    return egal(r, [abs(a), 0]) && memeAngle(t[0], arg(a)) && egal(o, w);
  });
}
function deuxImages(q: Q) {
  const e = donnees(q.text);
  const a = div(sub(e["z_B'"], e["z_A'"]), sub(e.z_B, e.z_A));
  if (/\\dfrac\{z_/.test(q.text)) return juge(q, a);
  if (!egal(e.a, a)) return ["le coefficient donné ne convient pas"];
  return juge(q, sub(e["z_A'"], mul(a, e.z_A)));
}
function grandeurImage(q: Q) {
  const k = abs(coefs(dernier(q)).a);
  const v = q.text.match(/\$(\d+)\$ (?:cm|m)/);
  if (!v) throw new Error(`mesure illisible : ${q.text}`);
  const aire = /l'aire de son image/.test(q.text);
  return juge(q, [Number(v[1]) * (aire ? k * k : k), 0]);
}
function composeeSim(q: Q) {
  const l = segs(q.text);
  const s1 = l.find((s) => s.startsWith("S_{1} : "));
  const s2 = l.find((s) => s.startsWith("S_{2} : "));
  if (!s1 || !s2) throw new Error(`illisible : ${q.text}`);
  const d1 = droite(s1);
  const d2 = droite(s2);
  const g = (z: C) => V(d2, { "z'": V(d1, { z }) });
  return memeTransfo(q, g);
}
function appli(q: Q) {
  const { a } = coefs(formuleDe(q));
  if (/angle|rotation/.test(q.text)) return jugeAngle(q, arg(a));
  return juge(q, [abs(a), 0]);
}
function spirale(q: Q) {
  const e = donnees(q.text);
  const f = segs(q.text).find((s) => s.startsWith("z_{k+1} = "));
  const n = q.text.match(/z_\{(\d+)\}/g)?.map((s) => Number(s.replace(/\D/g, ""))).find((x) => x > 0);
  if (!f || !n) throw new Error(`illisible : ${q.text}`);
  let z = e.z_0;
  for (let k = 0; k < n; k++) z = V(droite(f), { z_k: z });
  return juge(q, [abs(z), 0]);
}
function cercleImage(q: Q) {
  const e = donnees(q.text);
  const { a } = coefs(dernier(q));
  if (/centre du cercle image|centre de l'image|Quel point est le centre/.test(q.text)) return juge(q, formule(dernier(q))(e["\\omega"]));
  return juge(q, [abs(a) * e.r[0], 0]);
}

const mq = (micro: string, l: Record<number, (q: Q) => string[]>) =>
  Object.fromEntries(Object.entries(l).map(([n, c]) => [`tle_${micro}_tpl_${n}`, c]));

export const CORRECTEURS: CorrecteursMaths = {
  ...mq("cx_forme_algebrique", {
    1: partie, 2: calc, 3: calc, 4: calc,
    5: calc, 6: calc, 7: calc, 8: identification, 9: reelOuPur,
    10: calc, 11: calc, 12: calc, 13: equation,
  }),
  ...mq("cx_conjugue_quotient", {
    1: calc, 2: calc, 3: calc, 4: conjugueConnu,
    5: calc, 6: calc, 7: calc, 8: calc,
    9: calc, 10: equation, 11: famille, 12: calc,
  }),
  ...mq("cx_module_argument", {
    1: calc, 2: calc, 3: argumentDe, 4: moduleFigure,
    5: argumentDe, 6: calc, 7: calc, 8: calc, 9: angleEcrit,
    10: argumentDe, 11: calc, 12: moduleDe, 13: argumentDe,
  }),
  ...mq("cx_forme_exponentielle", {
    1: calc, 2: calc, 3: moduleDe, 4: argumentDe, 5: calc,
    6: calc, 7: calc, 8: calc, 9: calc, 10: egaliteVraie,
    11: calc, 12: memeFonction, 13: egaliteVraie, 14: rotations, 15: calc,
  }),
  ...mq("cx_equation_second_degre", {
    1: paires, 2: discriminant, 3: carre, 4: equation,
    5: paires, 6: paires, 7: autreRacine, 8: trinome, 9: natureSolutions,
    10: racineCarree, 11: paires, 12: cubique, 13: pulsation, 14: parametre,
  }),
  ...mq("cx_racines_nieme", {
    1: nombreSolutions, 2: equation, 3: calc, 4: polygone,
    5: argumentDe, 6: moduleRacines, 7: equation, 8: calc,
    9: equation, 10: calc, 11: brancheK, 12: equation,
  }),
  ...mq("cx_geometrie", {
    1: affixeFigure, 2: vecteur, 3: calc, 4: milieu,
    5: parallelogramme, 6: alignement, 7: gravite, 8: calc,
    9: natureTriangle, 10: natureQuadrilatere, 11: angleOriente, 12: lieuCercle, 13: equation, 14: cocycliques, 15: distanceDeux, 16: cocycliquesQuotient,
  }),
  ...mq("cx_transformations", {
    1: translation, 2: natureEcriture, 3: homothetieO, 4: rotationO,
    5: ecritureHomothetie, 6: ecritureRotation, 7: imageCentre, 8: pointFixe,
    9: rotationO, 10: reconnaitre, 11: composee, 12: quartsDeTour,
  }),
  ...mq("similitude_directe", {
    1: rapport, 2: angleSim, 3: imageSim, 4: pointFixe,
    5: ecritureSim, 6: natureSim, 7: elements, 8: deuxImages, 9: grandeurImage,
    10: composeeSim, 11: appli, 12: spirale, 13: cercleImage,
  }),
};
