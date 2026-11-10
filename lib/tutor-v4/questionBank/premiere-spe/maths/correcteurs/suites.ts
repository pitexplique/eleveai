// Correcteurs du renfort des SUITES de Première spé (10/11/2026).
//
// Chaque correcteur relit le TEXTE affiché (relation de récurrence, formule,
// situation, programme Python, points de la figure) et refait le calcul : il
// ne prend aucune valeur dans le gabarit. Les clés viennent de la table LIGNES
// de suites-renfort.ts (CLES_SUITES : id du gabarit → clé du correcteur).

import type { CorrecteurMaths, CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { compiler, proche, seulChoix, val } from "../../../lycee-correcteurs-commun";
import { CLES_SUITES } from "../suites-renfort";

type Q = TutorGeneratedQuestionV4;
type Pt = { x: number; y: number };

/* ---------- lecture du texte ---------- */

const NB = String.raw`-?\d+(?:\{,\}\d+)?`;
/** Un nombre écrit en LaTeX (« 0{,}8 », « -12 »). */
const lu = (s: string) => Number(s.replace("{,}", ".").replace("−", "-"));
/** Les morceaux de formule entre $…$. */
const formules = (t: string) => t.split("$").filter((_, i) => i % 2 === 1);
/** Tous les nombres du texte (hors indices u_{k} et exposants). */
function nbs(t: string): number[] {
  const s = t.replace(/[uv]_\{?[^}\s$]*\}?/g, " ").replace(/\^\{[^}]*\}|\^\d/g, " ").replace(/\{,\}/g, ",");
  // « imprimante 3D » : un nombre collé à une lettre n'est pas une donnée.
  return [...s.matchAll(/(?<![A-Za-zÀ-ÿ\d])-?\d+(?:,\d+)?(?![A-Za-zÀ-ÿ\d])/g)].map((m) => Number(m[0].replace(",", ".")));
}
/** Le texte sans les blocs de code. */
const sansCode = (t: string) => t.replace(/```[\s\S]*?```/g, " ");

/** La valeur de la réponse courte. */
const rep = (q: Q) => Number(String(q.expected[0]).replace(",", "."));
/** Réponse courte : elle vaut v (tolérance relative). */
function egal(q: Q, v: number, tol = 1e-6): string[] {
  if (!Number.isFinite(v)) return [`recalcul impossible (${v})`];
  if (q.format === "qcm") return [`QCM inattendu : ${q.choices?.join(" | ")}`];
  return Math.abs(rep(q) - v) <= Math.max(tol, 1e-12 * Math.abs(v)) ? [] : [`réponse ${q.expected[0]}, recalculé ${v}`];
}
/** Arrondi demandé dans le texte. */
function arrondi(t: string, v: number) {
  if (/Arrondis à l’unité|arrondi à l’unité/.test(t)) return Math.round(v);
  if (/au centime|au centième/.test(t)) return Math.round(v * 100) / 100;
  if (/au dixième/.test(t)) return Math.round(v * 10) / 10;
  return v;
}

/** Les termes donnés « u_k = V » (indice, valeur), dans l'ordre du texte. */
function donnes(t: string, lettre = "u"): Array<[number, number]> {
  return [...sansCode(t).matchAll(new RegExp(String.raw`${lettre}_(?:\{(\d+)\}|(\d+))\s*=\s*(${NB})(?![\d{]|\s*[u\\(n]|\s*[+*-]\s*\d)`, "g"))].map((m) => [Number(m[1] ?? m[2]), lu(m[3])]);
}
/** L'indice CHERCHÉ : le dernier « u_k » qui n'est pas suivi de « = ». */
function cible(t: string, lettre = "u"): number {
  const l = [...sansCode(t).matchAll(new RegExp(String.raw`${lettre}_(?:\{(\d+)\}|(\d+))(?!\s*=)(?![\d}])`, "g"))];
  if (!l.length) throw new Error(`indice cherché illisible : ${t.slice(0, 120)}`);
  const m = l[l.length - 1];
  return Number(m[1] ?? m[2]);
}

/** La relation « u_{n+1} = … » écrite : f(u, n). */
function lireRec(t: string, lettre = "u"): ((u: number, n: number) => number) | null {
  for (const f of formules(sansCode(t))) {
    const m = f.match(new RegExp(String.raw`^\s*${lettre}_\{n\+1\}\s*=\s*(.+)$`));
    if (!m || /[uv]_\{n\+1\}/.test(m[1])) continue;
    const c = compiler(m[1].replace(new RegExp(String.raw`${lettre}_n`, "g"), "w").trim());
    return (u, n) => c({ w: u, n });
  }
  return null;
}
/** La formule « u_n = … » écrite : f(n). */
function lireExpl(t: string, lettre = "u"): ((n: number) => number) | null {
  for (const f of formules(sansCode(t))) {
    const m = f.match(new RegExp(String.raw`^\s*${lettre}_n\s*=\s*(.+)$`));
    if (!m || /[uv]_/.test(m[1]) || !/n/.test(m[1])) continue;
    const c = compiler(m[1].trim());
    return (n) => c({ n });
  }
  return null;
}
/** Une proposition « $u_n = …$ » (ou « $u_0 = A$ et $u_{n+1} = …$ ») : ses termes de rang p à p + 5. */
function termesChoix(c: string, p = 0, lettre = "u"): number[] {
  const rec = lireRec(c, lettre);
  if (rec) {
    const d = donnes(c, lettre);
    if (!d.length) throw new Error(`premier terme illisible : ${c}`);
    return iterer(rec, d[0][0], d[0][1], p + 5).slice(p);
  }
  const e = lireExpl(c, lettre) ?? (() => { const f = compiler(c.replace(/\$/g, "").replace(/^[^=]*=/, "").trim()); return (n: number) => f({ n }); })();
  return [0, 1, 2, 3, 4, 5].map((k) => e(p + k));
}
/** Les termes u_0 … u_K d'une récurrence partant de u_p = A (indices < p : NaN). */
function iterer(f: (u: number, n: number) => number, p: number, A: number, K: number): number[] {
  const t: number[] = [];
  for (let k = 0; k < p; k++) t.push(NaN);
  t.push(A);
  for (let k = p; k < K; k++) t.push(f(t[k], k));
  return t;
}
const memes = (a: number[], b: number[]) => a.length === b.length && a.every((x, i) => (Number.isNaN(x) && Number.isNaN(b[i])) || proche(x, b[i], 1e-6 * Math.max(1, Math.abs(x))));
/** La seule proposition dont les termes sont `t` (à partir du rang p). */
function seuleSuite(q: Q, t: number[], p = 0, lettre = "u"): string[] {
  return seulChoix(q, (c) => {
    try { return memes(termesChoix(c, p, lettre), t); } catch { return false; }
  });
}
/** La valeur d'une proposition « $x$ ». */
const valChoix = (c: string) => val(c.replace(/\$/g, "").replace(/^[^=]*=/, "").replace(/\\,\\%/, "").trim());
function seulNombre(q: Q, v: number): string[] {
  return seulChoix(q, (c) => { try { return proche(valChoix(c), v, 1e-6 * Math.max(1, Math.abs(v))); } catch { return false; } });
}

/* ---------- les situations (voir l'en-tête des SITUATIONS du renfort) ---------- */

type Sit = { U: number; f: (u: number) => number; type: "A" | "G" | "C"; r?: number; q?: number; a?: number; b?: number };
const PCT = new RegExp(String.raw`\$(${NB})\\,\\%\$`);
/** Une situation : 1er nombre = départ ; pourcentage + « augmente / diminue » ; « %…, puis B » ; sinon 2e nombre = pas. */
function situation(t0: string): Sit {
  const t = sansCode(t0).split(/ On note | On modélise | On veut /)[0];
  const x = nbs(t);
  const U = x[0];
  const m = t.match(PCT);
  if (m) {
    const T = lu(m[1]);
    const apres = t.slice((m.index ?? 0) + m[0].length);
    const puis = apres.match(new RegExp(String.raw`^[^.]*?, puis[^$.]*\$(${NB})\$`));
    if (puis) {
      const a = 1 - T / 100;
      const b = lu(puis[1]);
      return { U, f: (u) => a * u + b, type: "C", a, b };
    }
    const avant = t.slice(0, m.index);
    const s = /diminue|baisse|perd/.test(avant.slice(-60)) ? -1 : /augmente|hausse/.test(avant.slice(-60)) ? 1 : NaN;
    if (Number.isNaN(s)) throw new Error(`sens du pourcentage illisible : ${t}`);
    const q = 1 + (s * T) / 100;
    return { U, f: (u) => q * u, type: "G", q };
  }
  if (x.length < 2) throw new Error(`situation illisible : ${t}`);
  const r = (/de moins|plus bas/.test(t) ? -1 : 1) * x[1];
  return { U, f: (u) => u + r, type: "A", r };
}

/** Le modèle d'une suite décrite dans le texte : uₖ pour tout k (NaN si inconnu). */
function modele(t: string): (k: number) => number {
  const rec = lireRec(t);
  if (rec) {
    const d = donnes(t);
    if (!d.length) throw new Error(`premier terme illisible : ${t.slice(0, 120)}`);
    const [p, A] = d[0];
    const cache = iterer(rec, p, A, 3000);
    return (k) => cache[k];
  }
  const e = lireExpl(t);
  if (e) return e;
  const s = sansCode(t);
  const ar = /arithmétique/.test(s);
  const ge = /géométrique/.test(s);
  if (ar || ge) {
    const d = donnes(s);
    const mr = s.match(new RegExp(String.raw`\b${ar ? "r" : "q"} = (${NB})`));
    if (!d.length) throw new Error(`aucun terme donné : ${s.slice(0, 120)}`);
    const [p, A] = d[0];
    let raison: number;
    if (mr) raison = lu(mr[1]);
    else {
      if (d.length < 2) throw new Error(`raison illisible : ${s.slice(0, 120)}`);
      const [p2, B] = d[1];
      const ec = p2 - p;
      if (ar) raison = (B - A) / ec;
      else {
        const rapport = B / A;
        const absq = Math.abs(rapport) ** (1 / ec);
        raison = rapport < 0 ? -absq : ec % 2 === 0 && !/positive/.test(s) ? NaN : absq;
      }
    }
    return ar ? (k) => A + (k - p) * raison : (k) => A * raison ** (k - p);
  }
  const S = situation(t);
  const cache = iterer((u) => S.f(u), 0, S.U, 3000);
  return (k) => cache[k];
}

/* ---------- Python ---------- */

/** Exécute le programme du bloc ```python``` : valeurs affichées et nombre de tours de boucle. */
function python(t: string, remplace?: string): { sortie: number[]; tours: number; trace: number[] } {
  const trace: number[] = [];
  const m = t.match(/```python\n([\s\S]*?)```/);
  if (!m) throw new Error(`programme illisible : ${t.slice(0, 80)}`);
  const src = remplace === undefined ? m[1] : m[1].replace("…", remplace);
  const env: Record<string, number> = {};
  const sortie: number[] = [];
  let tours = 0;
  const expr = (e: string) => {
    const js = e.trim().replace(/\band\b/g, "&&").replace(/\bor\b/g, "||");
    if (!/^[\w\s+\-*/().<>=!&|]+$/.test(js)) throw new Error(`expression Python inconnue : ${e}`);
    const noms = Object.keys(env);
    return Number(new Function(...noms, `return (${js});`)(...noms.map((k) => env[k])));
  };
  const instr = (s: string) => {
    for (const p of s.split(";").map((x) => x.trim()).filter(Boolean)) {
      const pr = p.match(/^print\((.*)\)$/);
      if (pr) { sortie.push(expr(pr[1])); continue; }
      const af = p.match(/^([a-z]\w*)\s*=(?!=)\s*(.+)$/);
      if (!af) throw new Error(`instruction Python inconnue : ${p}`);
      env[af[1]] = expr(af[2]);
    }
  };
  for (const ligne of src.split("\n").map((l) => l.trim()).filter(Boolean)) {
    const fo = ligne.match(/^for (\w+) in range\(([^)]*)\):\s*(.+)$/);
    const wh = ligne.match(/^while (.+?):\s*(.+)$/);
    if (fo) {
      const b = fo[2].split(",").map((x) => expr(x));
      const [deb, fin] = b.length === 1 ? [0, b[0]] : b;
      trace.push(env.u);
      for (let i = deb; i < fin; i++) { env[fo[1]] = i; instr(fo[3]); tours++; trace.push(env.u); }
    } else if (wh) {
      trace.push(env.u);
      while (expr(wh[1])) { instr(wh[2]); trace.push(env.u); if (++tours > 10000) throw new Error("boucle infinie"); }
    } else instr(ligne);
  }
  return { sortie, tours, trace };
}

/** Les points de la figure. */
function points(q: Q): Pt[] {
  const p = (q.canvas as { points?: Pt[] } | undefined)?.points;
  if (!p?.length) throw new Error("figure sans points");
  return [...p].sort((a, b) => a.x - b.x);
}
/** Le sens de variation de termes successifs. */
function sens(t: number[]): string {
  const d = t.slice(1).map((x, i) => x - t[i]);
  const e = t.slice(1).map((x, i) => 1e-12 * Math.max(Math.abs(x), Math.abs(t[i])) + 1e-300);
  if (d.every((x, i) => Math.abs(x) <= e[i])) return "constante";
  if (d.every((x, i) => x > e[i])) return "croissante";
  if (d.every((x, i) => x < -e[i])) return "décroissante";
  return "ni croissante ni décroissante";
}

/** Le plus petit rang k ≥ debut où la condition « u_k op V » est vraie. */
const OPS: Record<string, (a: number, b: number) => boolean> = { "<": (a, b) => a < b, ">": (a, b) => a > b, "\\le": (a, b) => a <= b, "\\ge": (a, b) => a >= b, "=": (a, b) => proche(a, b) };
const COND = new RegExp(String.raw`u_n\s*(<|>|\\le|\\ge|=)\s*(${NB})(?=\s*\$)|(égal à|compte|vaut) \$(${NB})\$ [^$]*\?`);
function seuil(f: (k: number) => number, op: string, V: number, debut = 0) {
  for (let k = debut; k < 3000; k++) if (OPS[op](f(k), V)) return k;
  return NaN;
}
/** La condition « u_n < V » (ou « le terme égal à V ») de la question. */
function condition(t: string): [string, number] {
  const m = sansCode(t).match(COND);
  if (!m) throw new Error(`condition illisible : ${t.slice(-120)}`);
  return m[1] ? [m[1], lu(m[2])] : ["=", lu(m[4])];
}
/** Un indice « $u_{k}$ » lu dans une proposition. */
const indiceChoix = (c: string) => Number((c.match(/u_\{?(\d+)/) ?? [])[1]);
/** Une phrase « à chaque étape, … » traduite en opération. */
function phrase(c: string): (u: number) => number {
  const ops = c.replace(/^à chaque étape, /, "").split(", puis ").map((p) => {
    const x = (p.match(new RegExp(`\\$(${NB})`)) ?? [])[1];
    if (x === undefined) throw new Error(`phrase illisible : ${p}`);
    const v = lu(x);
    if (/on ajoute/.test(p)) return (u: number) => u + v;
    if (/on retire/.test(p)) return (u: number) => u - v;
    if (/on multiplie par/.test(p)) return (u: number) => u * v;
    if (/augmente de/.test(p)) return (u: number) => u * (1 + v / 100);
    if (/diminue de/.test(p)) return (u: number) => u * (1 - v / 100);
    throw new Error(`phrase illisible : ${p}`);
  });
  return (u) => ops.reduce((acc, o) => o(acc), u);
}
/** La raison lue : r ou q écrite, ou déduite de deux termes donnés. */
function raisonLue(t: string): number {
  const s = sansCode(t);
  const ar = /arithmétique/.test(s);
  const m = modele(t);
  const [p] = donnes(s)[0];
  return ar ? m(p + 1) - m(p) : m(p + 1) / m(p);
}
/** Les trois premières figures d'un motif, prolongées par le polynôme de degré 2 qui passe par elles. */
function motif(t: string): (k: number) => number {
  const m = t.match(new RegExp(String.raw`figure 1 compte \$(\d+)\$[^$]*\$(\d+)\$[^$]*\$(\d+)\$`));
  if (!m) throw new Error(`motif illisible : ${t.slice(0, 120)}`);
  const [a, b, c] = [Number(m[1]), Number(m[2]), Number(m[3])];
  return (k) => a + (k - 1) * (b - a) + ((k - 1) * (k - 2) * (c - 2 * b + a)) / 2;
}
/** Affine en u : u_{n+1} = a u_n + b (lu sur la relation). */
function affine(t: string) {
  const f = lireRec(t);
  if (!f) throw new Error(`relation illisible : ${t.slice(0, 120)}`);
  const b = f(0, 0);
  const a = f(1, 0) - b;
  if (!proche(f(7, 0), 7 * a + b)) throw new Error("relation non affine");
  return { f, a, b };
}
/** Somme de termes d'une fonction de k, de p à q. */
const somme = (f: (k: number) => number, p: number, q: number) => { let s = 0; for (let k = p; k <= q; k++) s += f(k); return s; };
/** La série 1 + q + q² + … + q^N écrite. */
function serieGeo(t: string) {
  const m = t.match(new RegExp(String.raw`1 \+ (${NB}) \+ (${NB})\^2 \+ \\dots \+ (${NB})\^\{(\d+)\}`));
  if (!m || m[1] !== m[2] || m[2] !== m[3]) throw new Error(`série illisible : ${t.slice(0, 120)}`);
  return { q: lu(m[1]), N: Number(m[4]) };
}
/** Limite d'une proposition « vers … ». */
function versChoix(c: string): number {
  if (c.includes("+\\infty")) return Infinity;
  if (c.includes("-\\infty")) return -Infinity;
  return valChoix(c.replace(/^vers /, ""));
}

/* ---------- les correcteurs, par clé ---------- */

const DEFU = /On note \$u_n\$ (.+?) après \$n\$ ([^ .]+)\./;

const VERIFS: Record<string, CorrecteurMaths> = {
  rang: (q) => {
    const m = q.text.match(DEFU);
    if (!m) return ["définition de u_n illisible"];
    const k = cible(q.text);
    return seulChoix(q, (c) => c === `${m[1]} après $${k}$ ${m[2]}`);
  },
  egalite: (q) => {
    const m = q.text.match(DEFU);
    const d = donnes(q.text);
    if (!m || !d.length) return ["égalité illisible"];
    const [k, V] = d[d.length - 1];
    const p: string[] = [];
    if (!proche(modele(q.text.split(" On note ")[0])(k), V)) p.push(`u_${k} = ${V} ne suit pas la situation`);
    return [...p, ...seulChoix(q, (c) => {
      const x = c.match(new RegExp(String.raw`^après \$(\d+)\$ (\S+), on a \$(${NB})\$`));
      return Boolean(x) && Number(x![1]) === k && x![2] === m[2] && proche(lu(x![3]), V);
    })];
  },
  traduire: (q) => {
    const S = situation(q.text);
    return seulChoix(q, (c) => {
      const f = lireRec(c);
      return Boolean(f) && [0, 10, 100, 1000].every((u) => proche(f!(u, 0), S.f(u)));
    });
  },
  explicite: (q) => {
    const [p, A] = donnes(q.text)[0];
    const t = q.text;
    const mul = t.match(new RegExp(String.raw`multiplie par \$(${NB})\$`));
    const aj = t.match(new RegExp(String.raw`(ajoute|retranche) \$(${NB})\$`));
    const f = mul ? (k: number) => A * lu(mul[1]) ** (k - p) : aj ? (k: number) => A + (aj[1] === "ajoute" ? 1 : -1) * lu(aj[2]) * (k - p) : null;
    if (!f) return ["opération illisible"];
    return seuleSuite(q, [0, 1, 2, 3, 4, 5].map((k) => f(p + k)), p);
  },
  francais: (q) => {
    const f = lireRec(q.text);
    if (!f) return ["relation illisible"];
    return seulChoix(q, (c) => { try { const g = phrase(c); return [0, 10, 100, 1000].every((u) => proche(g(u), f(u, 0))); } catch { return false; } });
  },
  annee: (q) => {
    const m = q.text.match(/On note \$u_(\d+)\$ .+? en \$(\d{4})\$/) ?? q.text.match(/On note \$u_n\$ .+? en l’année \$(\d{4}) \+ n\$/);
    const ans = [...q.text.matchAll(/\$(\d{4})\$/g)];
    if (!m || !ans.length) return ["années illisibles"];
    const [p, Y0] = m.length === 3 ? [Number(m[1]), Number(m[2])] : [0, Number(m[1])];
    const k = p + Number(ans[ans.length - 1][1]) - Y0;
    return seulChoix(q, (c) => indiceChoix(c) === k && !/\d{4}/.test(c));
  },
  terme: (q) => {
    const m = modele(q.text);
    if (/rang \$n\$|on cherche \$u_n/.test(q.text)) { const [op, V] = condition(q.text); return egal(q, seuil(m, op, V)); }
    return egal(q, arrondi(q.text, m(cible(q.text))));
  },
  lireNuage: (q) => {
    let k = NaN;
    try { k = cible(q.text); } catch { /* on cherche un rang */ }
    if (!Number.isNaN(k)) { const p = points(q).find((p) => p.x === k); return p ? egal(q, p.y) : [`pas de point d’abscisse ${k}`]; }
    const x = nbs(q.text);
    const v = x[x.length - 1];
    const pts = points(q).filter((p) => proche(p.y, v));
    return pts.length === 1 ? egal(q, pts[0].x) : [`${pts.length} points d’ordonnée ${v}`];
  },
  un1: (q) => {
    const e = lireExpl(q.text);
    const m = [...q.text.matchAll(/u_\{([^}]*n[^}]*)\}/g)].pop();
    if (!e || !m) return ["formule ou terme cherché illisible"];
    const X = compiler(m[1]);
    return seulChoix(q, (c) => { try { return [0, 1, 2, 3, 5].every((k) => proche(val(c.replace(/\$/g, ""), { n: k }), e(X({ n: k })))); } catch { return false; } });
  },
  rangValeur: (q) => {
    const e = lireExpl(q.text);
    if (!e) return ["formule illisible"];
    const [op, V] = condition(q.text);
    return egal(q, seuil(e, op, V));
  },
  recReconnaitre: (q) => {
    const explicite = /EXPLICITE|DIRECTEMENT|en fonction de \$n\$/.test(q.text);
    return seulChoix(q, (c) => /u_\{n\+1\}/.test(c) !== explicite);
  },
  recInverse: (q) => {
    const f = lireRec(q.text);
    const d = donnes(q.text);
    if (!f || !d.length) return ["relation illisible"];
    let [k, u] = d[d.length - 1];
    const but = cible(q.text);
    while (k > but) {
      const b = f(0, k - 1);
      const a = f(1, k - 1) - b;
      u = (u - b) / a;
      k--;
    }
    return egal(q, u);
  },
  recExplicite: (q) => {
    const m = modele(q.text);
    const [p] = donnes(q.text)[0];
    return seuleSuite(q, [0, 1, 2, 3, 4, 5].map((k) => m(p + k)), p);
  },
  python: (q) => {
    const { sortie } = python(q.text);
    return egal(q, sortie[sortie.length - 1]);
  },
  algoTerme: (q) => {
    const [p] = donnes(q.text)[0];
    const { tours } = python(q.text);
    return seulChoix(q, (c) => indiceChoix(c) === p + tours);
  },
  algoQuelleSuite: (q) => {
    const { trace } = python(q.text);
    const t = trace.slice(0, 4);
    return seulChoix(q, (c) => { try { return memes(termesChoix(c, 0).slice(0, t.length), t); } catch { return false; } });
  },
  algoCompleter: (q) => {
    const t = q.text;
    const S = situation(t);
    const suite = iterer((u) => S.f(u), 0, S.U, 3000);
    let attendu: number;
    if (/afficher le nombre d’étapes/.test(t)) {
      const m = t.match(new RegExp(String.raw`(dépasse|passe sous) \$(${NB})\$`));
      if (!m) return ["seuil illisible"];
      attendu = seuil((k) => suite[k], m[1] === "dépasse" ? ">" : "<", lu(m[2]));
    } else attendu = suite[cible(t)];
    return seulChoix(q, (c) => {
      try { const { sortie } = python(t, c.replace(/`/g, "")); return proche(sortie[sortie.length - 1], attendu, 1e-6 * Math.max(1, Math.abs(attendu))); } catch { return false; }
    });
  },
  motif: (q) => {
    const f = motif(q.text);
    if (/On cherche|a-t-on \$u_n = |Quelle figure compte/.test(q.text)) {
      const [op, V] = condition(q.text);
      return egal(q, seuil(f, op, V, 1));
    }
    return egal(q, f(cible(q.text)));
  },
  motifFormule: (q) => {
    const f = motif(q.text);
    return seuleSuite(q, [1, 2, 3, 4, 5, 6].map(f), 1);
  },
  nature: (q) => {
    const S = situation(q.text);
    return seulChoix(q, (c) => {
      if (S.type === "C") return c === "ni arithmétique ni géométrique";
      const m = c.match(new RegExp(String.raw`^(arithmétique|géométrique) de raison \$(${NB})\$$`));
      return Boolean(m) && (m![1] === "arithmétique") === (S.type === "A") && proche(lu(m![2]), S.type === "A" ? S.r! : S.q!);
    });
  },
  denombre: (q) => {
    const e = lireExpl(q.text) ?? modele(q.text);
    if (/On cherche \$n\$/.test(q.text)) { const [op, V] = condition(q.text); return egal(q, seuil(e, op, V, 1)); }
    return egal(q, e(cible(q.text)));
  },
  seuilCtx: (q) => {
    const [op, V] = condition(q.text);
    return egal(q, seuil(modele(q.text), op, V));
  },
  formuleAG: (q) => {
    const m = modele(q.text);
    const [p] = donnes(q.text)[0];
    return seuleSuite(q, [0, 1, 2, 3, 4, 5].map((k) => m(p + k)), p);
  },
  raison2: (q) => egal(q, raisonLue(q.text)),
  graphe: (q) => {
    const pts = points(q);
    const y = pts.map((p) => p.y);
    const ge = /géométrique/.test(q.text);
    const r = ge ? y[1] / y[0] : y[1] - y[0];
    if (!y.every((v, i) => i === 0 || proche(ge ? v / y[i - 1] : v - y[i - 1], r))) return ["les points ne suivent pas une suite " + (ge ? "géométrique" : "arithmétique")];
    let k: number;
    try { k = cible(q.text); } catch { return egal(q, r); }
    const p0 = pts[0];
    return egal(q, ge ? p0.y * r ** (k - p0.x) : p0.y + (k - p0.x) * r);
  },
  montrer: (q) => {
    const e = lireExpl(q.text);
    if (!e) return ["formule illisible"];
    const ge = (q.choices ?? []).some((c) => /géométrique/.test(c));
    const t = [0, 1, 2, 3, 4, 5, 6, 7].map(e);
    const r = ge ? t[1] / t[0] : t[1] - t[0];
    const ok = t.every((v, i) => i === 0 || proche(ge ? v / t[i - 1] : v - t[i - 1], r, 1e-9 * Math.max(1, Math.abs(v))));
    const mot = ge ? "géométrique" : "arithmétique";
    return seulChoix(q, (c) => {
      if (!ok) return c === `elle n’est pas ${mot}`;
      const m = c.match(new RegExp(String.raw`^${mot} de raison \$(${NB})\$$`));
      return Boolean(m) && proche(lu(m![1]), r);
    });
  },
  rangAG: (q) => {
    const [op, V] = condition(q.text);
    return egal(q, seuil(modele(q.text), op, V));
  },
  gePct: (q) => seulNombre(q, situation(q.text).q!),
  cm: (q) => {
    const x = q.text.match(new RegExp(String.raw`multiplié par \$(${NB})\$`));
    if (x) {
      const c = lu(x[1]);
      return seulChoix(q, (ch) => {
        const m = ch.match(new RegExp(String.raw`^une (hausse|baisse) de \$(${NB})\\,\\%\$$`));
        return Boolean(m) && proche(1 + ((m![1] === "hausse" ? 1 : -1) * lu(m![2])) / 100, c);
      });
    }
    const m = q.text.match(new RegExp(String.raw`(augmente|diminue) de \$(${NB})\\,\\%\$`));
    if (!m) return ["taux illisible"];
    return seulNombre(q, 1 + ((m[1] === "augmente" ? 1 : -1) * lu(m[2])) / 100);
  },
  evol: (q) => {
    const t = q.text;
    if (/Offre A/.test(t)) {
      const [C] = nbs(t);
      const a = lu((t.match(new RegExp(String.raw`Offre A : on ajoute \$(${NB})\$`)) ?? [])[1] ?? "NaN");
      const pc = t.match(new RegExp(String.raw`Offre B[^.]*augmente de \$(${NB})\\,\\%\$`));
      const N = Number((t.match(/[Aa]u bout de \$(\d+)\$/) ?? [])[1]);
      if (!pc || Number.isNaN(a) || !N) return ["offres illisibles"];
      const A = C + N * a;
      const B = C * (1 + lu(pc[1]) / 100) ** N;
      return seulChoix(q, (c) => c === (proche(A, B, 1e-9) ? "les deux donnent le même capital" : A > B ? "l’offre A" : "l’offre B"));
    }
    const ev = [...t.matchAll(new RegExp(String.raw`(augmente|diminue) de \$(${NB})\\,\\%\$`, "g"))].map((m) => 1 + ((m[1] === "augmente" ? 1 : -1) * lu(m[2])) / 100);
    if (!ev.length) return ["évolutions illisibles"];
    const fois = t.match(/pendant \$(\d+)\$/);
    const cm = fois ? ev[0] ** Number(fois[1]) : ev.reduce((a, b) => a * b, 1);
    if (/taux|évolution globale/.test(t)) return egal(q, arrondi(t, (cm - 1) * 100));
    const v0 = t.match(new RegExp(String.raw`vaut \$(${NB})\$`));
    if (!v0) return ["valeur de départ illisible"];
    return egal(q, arrondi(t, lu(v0[1]) * cm));
  },
  linExp: (q) => {
    if (/Offre A/.test(q.text)) return VERIFS.evol(q);
    const S = situation(q.text);
    if (S.type === "C") return ["situation combinée inattendue"];
    return seulChoix(q, (c) => c === (S.type === "A" ? "une évolution linéaire : suite arithmétique" : "une évolution exponentielle : suite géométrique"));
  },
  doubler: (q) => {
    const S = situation(q.text);
    const m = q.text.match(new RegExp(String.raw`u_n\s*(\\ge|\\le|>|<)\s*(${NB})\s*\\times\s*u_0`)) ?? q.text.match(new RegExp(String.raw`u_n\s*(\\ge|\\le|>|<)\s*\\dfrac\{u_0\}\{(${NB})\}`));
    if (!m) return ["condition illisible"];
    const V = m[0].includes("dfrac") ? S.U / lu(m[2]) : lu(m[2]) * S.U;
    const suite = iterer((u) => S.f(u), 0, S.U, 3000);
    return egal(q, seuil((k) => suite[k], m[1], V));
  },
  recip: (q) => {
    const m = q.text.match(new RegExp(String.raw`(augmente|diminue|baisse|monte) de \$(${NB})\\,\\%\$`));
    if (!m) return ["taux illisible"];
    const t = lu(m[2]) / 100;
    return egal(q, arrondi(q.text, /augmente|monte/.test(m[1]) ? (1 - 1 / (1 + t)) * 100 : (1 / (1 - t) - 1) * 100));
  },
  variation: (q) => {
    const t = q.text;
    const ratio = formules(t).map((f) => f.match(/^\s*\\dfrac\{u_\{n\+1\}\}\{u_n\}\s*=\s*(.+)$/)).find(Boolean);
    const diff = formules(t).map((f) => f.match(/^\s*u_\{n\+1\} - u_n\s*=\s*(.+)$/)).find(Boolean);
    let s: string;
    if (ratio) {
      if (!/strictement positifs|à termes positifs/.test(t)) return ["termes positifs non dits"];
      const c = compiler(ratio[1]);
      const r = [...Array(40).keys()].map((k) => c({ n: k }));
      s = r.every((x) => x > 1) ? "croissante" : r.every((x) => x < 1) ? "décroissante" : r.every((x) => proche(x, 1)) ? "constante" : "ni croissante ni décroissante";
    }
    else if (diff) { const c = compiler(diff[1]); s = sens(somme0([...Array(40).keys()].map((k) => c({ n: k })))); }
    else {
      const debut = /n \\ge 1/.test(t) ? 1 : 0;
      const rec = lireRec(t);
      if (rec && !donnes(t).length) {
        const s1 = sens(iterer(rec, debut, 3, debut + 30).slice(debut));
        const s2 = sens(iterer(rec, debut, 50, debut + 30).slice(debut));
        if (s1 !== s2) return ["sens qui dépend du premier terme"];
        s = s1;
      } else { const m = modele(t); s = sens([...Array(30).keys()].map((k) => m(k + debut))); }
    }
    return seulChoix(q, (c) => c === s);
  },
  varGraphe: (q) => seulChoix(q, (c) => c === sens(points(q).map((p) => p.y))),
  varRang: (q) => {
    const diff = formules(q.text).map((f) => f.match(/^\s*u_\{n\+1\} - u_n\s*=\s*(.+)$/)).find(Boolean);
    if (!diff) return ["différence illisible"];
    const c = compiler(diff[1]);
    let n0 = NaN;
    for (let k = 400; k >= 0; k--) { if (c({ n: k }) >= 0) n0 = k; else break; }
    return egal(q, n0);
  },
  s1n: (q) => {
    const m = q.text.match(/1 \+ 2 \+ (?:3 \+ )?\\dots \+ (\d+)/);
    if (!m) return ["somme illisible"];
    const N = Number(m[1]);
    return egal(q, (N * (N + 1)) / 2);
  },
  nbT: (q) => {
    const t = q.text;
    const u = t.match(/u_\{?(\d+)\}? \+ u_\{?(\d+)\}? \+ \\dots \+ u_\{(\d+)\}/);
    if (u) return Number(u[2]) === Number(u[1]) + 1 ? egal(q, Number(u[3]) - Number(u[1]) + 1) : ["indices non consécutifs"];
    const l = t.match(new RegExp(String.raw`\$(${NB}) \+ (${NB}) \+ (${NB}) \+ \\dots \+ (${NB})\$`));
    if (!l) return ["somme illisible"];
    const [a, b, c, z] = [l[1], l[2], l[3], l[4]].map(lu);
    if (!proche(c - b, b - a)) return ["liste non arithmétique"];
    return egal(q, (z - a) / (b - a) + 1);
  },
  sommeAG: (q) => {
    const u = q.text.match(/u_\{?(\d+)\}? \+ u_\{?(\d+)\}? \+ \\dots \+ u_\{(\d+)\}/);
    if (!u) return ["somme illisible"];
    return egal(q, arrondi(q.text, somme(modele(q.text), Number(u[1]), Number(u[3]))));
  },
  sCtx: (q) => {
    const [A, R, N] = nbs(q.text);
    const r = /de moins/.test(q.text) ? -R : R;
    return egal(q, somme((k) => A + k * r, 0, N - 1));
  },
  sListe: (q) => {
    const l = q.text.match(new RegExp(String.raw`\$(?:S = )?(${NB}) \+ (${NB}) \+ (${NB}) \+ \\dots \+ (${NB})\$`));
    if (!l) return ["somme illisible"];
    const [a, b, c, z] = [l[1], l[2], l[3], l[4]].map(lu);
    const r = b - a;
    const N = (z - a) / r + 1;
    if (!proche(c - b, r) || !Number.isInteger(N)) return ["liste non arithmétique"];
    return egal(q, somme((k) => a + k * r, 0, N - 1));
  },
  sInverse: (q) => {
    const m = q.text.match(/1 \+ 2 \+ \\dots \+ N = (\d+)/);
    if (!m) return ["somme illisible"];
    const S = Number(m[1]);
    const N = (-1 + Math.sqrt(1 + 8 * S)) / 2;
    return Number.isInteger(N) ? egal(q, N) : [`${S} n’est pas une somme 1 + … + N`];
  },
  sg1q: (q) => {
    const { q: r, N } = serieGeo(q.text);
    return egal(q, somme((k) => r ** k, 0, N));
  },
  sgFormule: (q) => {
    const { q: r, N } = serieGeo(q.text);
    const S = somme((k) => r ** k, 0, N);
    return seulChoix(q, (c) => { try { return proche(valChoix(c), S, 1e-9 * S); } catch { return false; } });
  },
  sgNb: (q) => {
    const t = q.text;
    const p = t.match(/\$(\d+)\^\{(\d+)\} \+ (\d+)\^\{(\d+)\} \+ \\dots \+ (\d+)\^\{(\d+)\}\$/);
    if (p) return Number(p[4]) === Number(p[2]) + 1 ? egal(q, Number(p[6]) - Number(p[2]) + 1) : ["exposants non consécutifs"];
    return egal(q, serieGeo(t).N + 1);
  },
  sgCtx: (q) => {
    const t = q.text;
    const A = nbs(t)[0];
    const N = Number((t.match(/pendant \$(\d+)\$/) ?? [])[1]);
    const pc = t.match(PCT);
    const fois = t.match(/\$(\d+)\$ fois plus|(deux|trois) fois plus|double/);
    const r = pc && /de plus/.test(t) ? 1 + lu(pc[1]) / 100 : fois ? (fois[1] ? Number(fois[1]) : fois[2] === "trois" ? 3 : 2) : NaN;
    return egal(q, arrondi(t, somme((k) => A * r ** k, 0, N - 1)));
  },
  limite: (q) => {
    const t = q.text;
    let v: number;
    const rec = lireRec(t);
    const e = lireExpl(t);
    if (rec) {
      const [p, A] = donnes(t)[0];
      v = iterer(rec, p, A, p + 4000)[p + 4000];
    } else if (e || /arithmétique|géométrique/.test(t)) {
      const f = e ?? modele(t);
      const a = f(1000000);
      const b = f(1000001);
      const c = f(2000000);
      if (Math.abs(c) > 1e5) {
        if (Math.sign(a) !== Math.sign(c) || Math.sign(b) !== Math.sign(c) || Math.abs(c) < Math.abs(a)) return ["suite qui oscille"];
        v = c;
      } else {
        if (!proche(a, c, 1e-3) || !proche(a, b, 1e-3)) return ["suite qui oscille"];
        v = c;
      }
    } else {
      const S = situation(t);
      v = iterer((u) => S.f(u), 0, S.U, 4000)[4000];
    }
    const L = Math.abs(v) > 1e6 ? Math.sign(v) * Infinity : v;
    return seulChoix(q, (c) => { try { const x = versChoix(c); return Number.isFinite(L) ? Number.isFinite(x) && Math.abs(x - L) < 1e-2 : x === L; } catch { return false; } });
  },
  auxL: (q) => { const { a, b } = affine(q.text); return egal(q, b / (1 - a)); },
  auxRaison: (q) => seulNombre(q, affine(q.text).a),
  auxV0: (q) => {
    const m = q.text.match(new RegExp(String.raw`v_n = u_n ([+-]) (${NB})`));
    if (!m) return ["v_n illisible"];
    const [, u0] = donnes(q.text)[0];
    return egal(q, u0 + (m[1] === "+" ? 1 : -1) * lu(m[2]));
  },
  auxEtape: (q) => {
    const { f } = affine(q.text);
    const m = q.text.match(new RegExp(String.raw`v_n = u_n ([+-]) (${NB})`));
    if (!m) return ["v_n illisible"];
    const c = (m[1] === "+" ? 1 : -1) * lu(m[2]);
    return seulChoix(q, (x) => {
      const g = lireRec(x, "v");
      return Boolean(g) && [0, 10, 100, -7].every((v) => proche(g!(v, 0), f(v - c, 0) + c));
    });
  },
  auxExpr: (q) => {
    const m = modele(q.text);
    const t = [0, 1, 2, 3, 4, 5].map(m);
    // « $v_n$ vaut : » : les propositions donnent v_n = u_n + c.
    const v = q.text.match(new RegExp(String.raw`v_n = u_n ([+-]) (${NB})`));
    if (/\$v_n\$ vaut|(de|Exprime) \$v_n\$/.test(q.text)) {
      if (!v) return ["v_n illisible"];
      const c = (v[1] === "+" ? 1 : -1) * lu(v[2]);
      return seuleSuite(q, t.map((x) => x + c), 0);
    }
    return seuleSuite(q, t, 0);
  },
};

/** Les correcteurs, par id exact du gabarit. */
export const CORRECTEURS: CorrecteursMaths = Object.fromEntries(
  Object.entries(CLES_SUITES).map(([id, cle]) => {
    const v = VERIFS[cle];
    if (!v) throw new Error(`correcteur manquant pour la clé ${cle}`);
    return [id, v];
  })
);
/** Les différences successives d'une liste, vues comme une suite qui part de 0 (pour `sens`). */
function somme0(d: number[]) {
  const t = [0];
  for (const x of d) t.push(t[t.length - 1] + x);
  return t;
}
