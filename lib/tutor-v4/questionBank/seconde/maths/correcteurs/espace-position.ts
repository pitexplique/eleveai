// Correcteurs de la géométrie de position dans l'espace. Ils relisent le NOM du solide écrit dans
// l'énoncé (l'ordre des lettres dit où est chaque sommet), rebâtissent leur propre solide, avec
// d'autres dimensions que la banque, et recalculent. Ils vérifient aussi que la figure est bien
// l'image de ce solide par une application affine : un sommet mal placé serait trouvé.
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { accepte } from "../../../lycee-correcteurs-stats";
import { proche, seulChoix } from "../../../lycee-correcteurs-commun";

type Q = TutorGeneratedQuestionV4;
type V = [number, number, number];
const P1 = "2de_espace_positions_relatives_tpl_";
const P2 = "2de_espace_orthogonalite_droite_plan_tpl_";

const s = (a: V, b: V): V => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const pt = (a: V, b: V) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const vect = (a: V, b: V): V => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const zero = (a: V) => Math.hypot(...a) < 1e-9;
const entreP = (a: V, b: V, t: number): V => [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1]), a[2] + t * (b[2] - a[2])];

type Solide = { P: Record<string, V>; aretes: string[]; lettres: string };

/** Le solide nommé dans le texte. Les dimensions sont celles du correcteur, pas de la banque. */
function lire(q: Q): Solide {
  const t = q.text.replace(/ /g, " ");
  const m = t.match(/(cube|pavé droit|pyramide régulière|pyramide|prisme droit|tétraèdre régulier|tétraèdre) ([A-Z]{4,8})/);
  if (!m) throw new Error(`solide illisible : ${t.slice(0, 80)}`);
  const [, genre, n] = m;
  const l = n.split("");
  let P: Record<string, V>;
  let aretes: string[];
  if (genre === "cube" || genre === "pavé droit") {
    const [a, b, c]: V = genre === "cube" ? [1, 1, 1] : [2, 3, 5];
    const [A, B, C, D, E, F, G, H] = l;
    P = { [A]: [0, 0, 0], [B]: [a, 0, 0], [C]: [a, b, 0], [D]: [0, b, 0], [E]: [0, 0, c], [F]: [a, 0, c], [G]: [a, b, c], [H]: [0, b, c] };
    aretes = [A + B, B + C, C + D, D + A, E + F, F + G, G + H, H + E, A + E, B + F, C + G, D + H];
  } else if (genre.startsWith("pyramide")) {
    const [S, A, B, C, D] = l;
    // Affinement, toute pyramide à base parallélogramme revient à celle-ci ; la régulière est métrique.
    P = genre === "pyramide régulière" || /base carrée/.test(t)
      ? { [A]: [0, 0, 0], [B]: [2, 0, 0], [C]: [2, 2, 0], [D]: [0, 2, 0], [S]: [1, 1, 3] }
      : { [A]: [0, 0, 0], [B]: [1, 0, 0], [C]: [1, 1, 0], [D]: [0, 1, 0], [S]: [0, 0, 1] };
    aretes = [S + A, S + B, S + C, S + D, A + B, B + C, C + D, D + A];
  } else if (genre === "prisme droit") {
    const [A, B, C, D, E, F] = l;
    P = { [A]: [0, 0, 0], [B]: [3, 0, 0], [C]: [1, 2, 0], [D]: [0, 0, 4], [E]: [3, 0, 4], [F]: [1, 2, 4] };
    aretes = [A + B, B + C, C + A, D + E, E + F, F + D, A + D, B + E, C + F];
  } else {
    const [A, B, C, D] = l;
    if (/orthogonales deux à deux/.test(t)) P = { [A]: [0, 0, 0], [B]: [2, 0, 0], [C]: [0, 3, 0], [D]: [0, 0, 5] };
    else if (genre === "tétraèdre régulier") P = { [A]: [1, 1, 1], [B]: [1, -1, -1], [C]: [-1, 1, -1], [D]: [-1, -1, 1] };
    else P = { [A]: [0, 0, 0], [B]: [1, 0, 0], [C]: [0, 1, 0], [D]: [0, 0, 1] };
    aretes = [A + B, B + C, C + A, A + D, B + D, C + D];
  }
  for (const k of t.matchAll(/([A-Z]) et ([A-Z]) sont les milieux respectifs de \[([A-Z]{2})\] et \[([A-Z]{2})\]/g)) {
    P[k[1]] = entreP(P[k[3][0]], P[k[3][1]], 0.5);
    P[k[2]] = entreP(P[k[4][0]], P[k[4][1]], 0.5);
  }
  for (const k of t.matchAll(/([A-Z]) est le milieu de \[([A-Z]{2})\]/g)) P[k[1]] = entreP(P[k[2][0]], P[k[2][1]], 0.5);
  const c = t.match(/de centre ([A-Z])/);
  if (c) {
    const [, A, , C] = l;
    P[c[1]] = entreP(P[A], P[C], 0.5);
  }
  const u = t.match(/([A-Z]) est un point de \[([A-Z]{2})\], distinct de ses extrémités\. Le plan \(([A-Z]{3})\) coupe \[([A-Z]{2})\] en ([A-Z])/);
  if (u) {
    P[u[1]] = entreP(P[u[2][0]], P[u[2][1]], 0.37);
    const pl = u[3];
    const n0 = vect(s(P[pl[1]], P[pl[0]]), s(P[pl[2]], P[pl[0]]));
    const [a, b] = [P[u[4][0]], P[u[4][1]]];
    const t0 = pt(s(P[pl[0]], a), n0) / pt(s(b, a), n0);
    P[u[5]] = entreP(a, b, t0);
  }
  return { P, aretes, lettres: n };
}

const question = (q: Q) => q.text.replace(/ /g, " ").split("\n\n").pop() ?? "";
/** Les droites et les plans cités dans la question, dans l'ordre. */
const cites = (t: string) => [...t.matchAll(/\(([A-Z]{2,3})\)/g)].map((m) => m[1]);
const nomChoix = (c: string) => c.match(/^\(([A-Z]{2,3})\)$/)?.[1] ?? "";

const dir = (o: Solide, l: string) => s(o.P[l[1]], o.P[l[0]]);
const norm = (o: Solide, p: string) => vect(s(o.P[p[1]], o.P[p[0]]), s(o.P[p[2]], o.P[p[0]]));
const dans = (o: Solide, x: string, p: string) => Math.abs(pt(s(o.P[x], o.P[p[0]]), norm(o, p))) < 1e-9;
function posD(o: Solide, a: string, b: string) {
  const n = vect(dir(o, a), dir(o, b));
  const w = s(o.P[b[0]], o.P[a[0]]);
  if (zero(n)) return zero(vect(w, dir(o, a))) ? "Confondues" : "Parallèles";
  return Math.abs(pt(n, w)) < 1e-9 ? "Sécantes" : "Non coplanaires";
}
function posDP(o: Solide, l: string, p: string) {
  if (Math.abs(pt(dir(o, l), norm(o, p))) > 1e-9) return "Sécante au plan";
  return dans(o, l[0], p) ? "Contenue dans le plan" : "Parallèle au plan, sans point commun";
}
function posO(o: Solide, a: string, b: string) {
  const r = posD(o, a, b);
  if (r === "Parallèles" || r === "Confondues") return "Parallèles";
  if (Math.abs(pt(dir(o, a), dir(o, b))) > 1e-9) return "Ni parallèles, ni orthogonales";
  return r === "Sécantes" ? "Perpendiculaires" : "Orthogonales, sans se couper";
}
const orthP = (o: Solide, l: string, p: string) => zero(vect(dir(o, l), norm(o, p)));
const exact = (q: Q, j: string) => (q.expected[0] === j ? [] : [`attendu ${q.expected[0]}, recalculé ${j}`]);

/** La figure est-elle l'image affine du solide relu ? (les sommets du solide et les points ajoutés) */
function figureJuste(q: Q, o: Solide): string[] {
  const c = q.canvas as { kind?: string; points?: { id: string; x: number; y: number }[] } | undefined;
  if (c?.kind !== "construction") return ["pas de figure"];
  const F = new Map((c.points ?? []).map((p) => [p.id, p]));
  const noms = Object.keys(o.P);
  for (const n of noms) if (!F.has(n)) return [`point ${n} absent de la figure`];
  // Quatre points indépendants du solide servent de base.
  const L = o.lettres.split("");
  let base: string[] | null = null;
  for (let i = 1; i < L.length && !base; i++) for (let j = i + 1; j < L.length && !base; j++) for (let k = j + 1; k < L.length && !base; k++) {
    const d = pt(vect(s(o.P[L[i]], o.P[L[0]]), s(o.P[L[j]], o.P[L[0]])), s(o.P[L[k]], o.P[L[0]]));
    if (Math.abs(d) > 1e-6) base = [L[0], L[i], L[j], L[k]];
  }
  if (!base) return ["solide plat"];
  const [O, A, B, C] = base;
  const [u, v, w] = [s(o.P[A], o.P[O]), s(o.P[B], o.P[O]), s(o.P[C], o.P[O])];
  const D = pt(vect(u, v), w);
  const f0 = F.get(O)!;
  for (const n of noms) {
    const r = s(o.P[n], o.P[O]);
    const a = pt(vect(r, v), w) / D;
    const b = pt(vect(u, r), w) / D;
    const g = pt(vect(u, v), r) / D;
    const X = f0.x + a * (F.get(A)!.x - f0.x) + b * (F.get(B)!.x - f0.x) + g * (F.get(C)!.x - f0.x);
    const Y = f0.y + a * (F.get(A)!.y - f0.y) + b * (F.get(B)!.y - f0.y) + g * (F.get(C)!.y - f0.y);
    const f = F.get(n)!;
    // La pyramide, le tétraèdre : la banque a un autre solide, mais la même structure affine.
    if (Math.abs(X - f.x) > 0.06 || Math.abs(Y - f.y) > 0.06) {
      if (o.lettres.includes(n) || !/point de \[/.test(q.text)) return [`${n} mal placé : ${f.x} ; ${f.y} au lieu de ${X} ; ${Y}`];
    }
  }
  return [];
}
const avecFigure = (q: Q, o: Solide, r: string[]) => [...figureJuste(q, o), ...r];

/** Le mot de relation dans la question. */
const motPos = (t: string) => (/non coplanaires? avec/.test(t) ? "Non coplanaires" : /sécantes? à/.test(t) ? "Sécantes" : "Parallèles");

export const CORRECTEURS: CorrecteursMaths = {
  [`${P1}1`]: (q) => {
    const o = lire(q);
    const [a, b] = cites(question(q));
    return avecFigure(q, o, exact(q, posD(o, a, b)));
  },
  [`${P1}2`]: (q) => {
    const o = lire(q);
    const t = question(q);
    const ref = cites(t)[0];
    const m = motPos(t);
    return avecFigure(q, o, seulChoix(q, (c) => posD(o, nomChoix(c), ref) === m));
  },
  [`${P1}3`]: (q) => {
    const o = lire(q);
    const c = cites(question(q));
    return avecFigure(q, o, exact(q, posDP(o, c.find((x) => x.length === 2)!, c.find((x) => x.length === 3)!)));
  },
  [`${P1}4`]: (q) => {
    const o = lire(q);
    const t = question(q);
    const ref = cites(t)[0];
    const m = motPos(t);
    const n = o.aretes.filter((e) => !(e.includes(ref[0]) && e.includes(ref[1])) && posD(o, e, ref) === m).length;
    return avecFigure(q, o, accepte(q, n));
  },
  [`${P1}5`]: (q) => {
    const o = lire(q);
    const c = cites(question(q));
    return avecFigure(q, o, exact(q, posDP(o, c.find((x) => x.length === 2)!, c.find((x) => x.length === 3)!)));
  },
  [`${P1}6`]: (q) => {
    const o = lire(q);
    const [a, b] = cites(question(q));
    const para = zero(vect(norm(o, a), norm(o, b)));
    return avecFigure(q, o, seulChoix(q, (c) => {
      if (/parallèles/.test(c)) return para;
      const l = nomChoix(c);
      return !para && [l[0], l[1]].every((x) => dans(o, x, a) && dans(o, x, b));
    }));
  },
  [`${P1}7`]: (q) => {
    const o = lire(q);
    const t = question(q);
    const avec = t.match(/avec ([A-Z]), ([A-Z]) et ([A-Z])/) ?? t.match(/que ([A-Z]), ([A-Z]) et ([A-Z])/);
    const p = avec ? avec[1] + avec[2] + avec[3] : cites(t)[0];
    return avecFigure(q, o, seulChoix(q, (c) => /^[A-Z]$/.test(c) && dans(o, c, p)));
  },
  [`${P1}8`]: (q) => {
    const o = lire(q);
    const l = cites(question(q))[0];
    return avecFigure(q, o, seulChoix(q, (c) => zero(vect(dir(o, nomChoix(c)), dir(o, l)))));
  },
  [`${P1}9`]: (q) => {
    const o = lire(q);
    const [a, b] = cites(question(q));
    const d = vect(norm(o, a), norm(o, b));
    if (zero(d)) return ["plans parallèles"];
    return avecFigure(q, o, seulChoix(q, (c) => zero(vect(dir(o, nomChoix(c)), d))));
  },
  [`${P1}10`]: (q) => {
    const t = q.text.replace(/ /g, " ");
    const n = [...t.matchAll(/\(([a-z]'?)\)/g)].map((m) => m[1]);
    const [x, y] = [n[0], n[1]];
    if (/sécantes en un point M/.test(t)) return exact(q, "Δ passe par M");
    if (!/\) sont parallèles/.test(t)) return ["hypothèse illisible"];
    return exact(q, `Δ est parallèle à (${x}) et à (${y})`);
  },
  [`${P1}11`]: (q) => {
    const o = lire(q);
    const t = q.text.replace(/ /g, " ");
    const u = t.match(/([A-Z]) est un point de \[([A-Z]{2})\], distinct de ses extrémités\. Le plan \(([A-Z]{3})\) coupe \[([A-Z]{2})\] en ([A-Z])/);
    if (!u) return ["section illisible"];
    const [, M, , pl, , N] = u;
    const [A, B] = [pl[0], pl[1]];
    const mn = dir(o, M + N);
    if (!zero(vect(mn, dir(o, A + B)))) return ["(MN) n'est pas parallèle à (AB) : le toit ne se vérifie pas"];
    if (/nature/.test(question(q))) {
      const parallelo = zero(vect(dir(o, B + M), dir(o, A + N)));
      const droit = Math.abs(pt(dir(o, A + B), dir(o, B + M))) < 1e-9;
      return exact(q, parallelo ? (droit ? "Un rectangle" : "Un parallélogramme") : "Un trapèze");
    }
    return seulChoix(q, (c) => zero(vect(dir(o, nomChoix(c)), mn)));
  },

  /* Orthogonalité */
  [`${P2}1`]: (q) => {
    const o = lire(q);
    const [a, b] = cites(question(q));
    return avecFigure(q, o, exact(q, posO(o, a, b)));
  },
  [`${P2}2`]: (q) => {
    const o = lire(q);
    const c0 = cites(question(q))[0];
    return avecFigure(q, o, seulChoix(q, (c) => (c0.length === 3 ? orthP(o, nomChoix(c), c0) : orthP(o, c0, nomChoix(c)))));
  },
  [`${P2}3`]: (q) => {
    const o = lire(q);
    const t = question(q);
    const ref = cites(t)[0];
    const autres = o.aretes.filter((e) => !(e.includes(ref[0]) && e.includes(ref[1])));
    const n = /sans la couper/.test(t)
      ? autres.filter((e) => posO(o, e, ref) === "Orthogonales, sans se couper")
      : /perpendiculaires/.test(t)
        ? autres.filter((e) => posO(o, e, ref) === "Perpendiculaires")
        : autres.filter((e) => ["Perpendiculaires", "Orthogonales, sans se couper"].includes(posO(o, e, ref)));
    return avecFigure(q, o, accepte(q, n.length));
  },
  [`${P2}4`]: (q) => {
    const o = lire(q);
    const [a, b] = cites(question(q));
    const j = zero(vect(norm(o, a), norm(o, b))) ? "Parallèles" : Math.abs(pt(norm(o, a), norm(o, b))) < 1e-9 ? "Perpendiculaires" : "Sécants, mais pas perpendiculaires";
    return avecFigure(q, o, exact(q, j));
  },
  [`${P2}5`]: (q) => {
    const o = lire(q);
    const c0 = cites(question(q));
    const d = c0.find((x) => x.length === 2)!;
    const p = c0.find((x) => x.length === 3)!;
    return avecFigure(q, o, seulChoix(q, (c) => {
      const [x, y] = cites(c);
      return [x, y].every((l) => dans(o, l[0], p) && dans(o, l[1], p) && Math.abs(pt(dir(o, l), dir(o, d))) < 1e-9) && posD(o, x, y) === "Sécantes";
    }));
  },
  [`${P2}6`]: (q) => {
    const o = lire(q);
    const [a, b] = cites(question(q));
    return avecFigure(q, o, exact(q, posO(o, a, b)));
  },
  [`${P2}7`]: (q) => {
    const o = lire(q);
    const f = cites(question(q))[0];
    return avecFigure(q, o, seulChoix(q, (c) => Math.abs(pt(norm(o, nomChoix(c)), norm(o, f))) < 1e-9));
  },
  [`${P2}8`]: (q) => {
    const t = q.text.replace(/ /g, " ");
    const m = t.match(/pavé droit ([A-Z]{8})/);
    const d = [...t.matchAll(/([A-Z]{2}) = (\d+) cm/g)].map((x) => Number(x[2]));
    const X = question(q).match(/longueur ([A-Z]{2})/)?.[1];
    if (!m || d.length !== 3 || !X) return ["pavé illisible"];
    const [L, l, h] = d;
    const n = m[1].split("");
    const C: V[] = [[0, 0, 0], [L, 0, 0], [L, l, 0], [0, l, 0], [0, 0, h], [L, 0, h], [L, l, h], [0, l, h]];
    const e = s(C[n.indexOf(X[0])], C[n.indexOf(X[1])]);
    return accepte(q, Math.hypot(...e));
  },
  [`${P2}9`]: (q) => {
    const o = lire(q);
    const c0 = cites(question(q))[0];
    return avecFigure(q, o, seulChoix(q, (c) => (c0.length === 3 ? orthP(o, nomChoix(c), c0) : orthP(o, c0, nomChoix(c)))));
  },
  [`${P2}10`]: (q) => {
    const o = lire(q);
    const c0 = cites(question(q))[0];
    return avecFigure(q, o, seulChoix(q, (c) => {
      const n = nomChoix(c);
      return n.length === 3 ? orthP(o, c0, n) : Math.abs(pt(dir(o, n), dir(o, c0))) < 1e-9;
    }));
  },
  [`${P2}11`]: (q) => {
    const o = lire(q);
    const c0 = cites(question(q))[0];
    return avecFigure(q, o, seulChoix(q, (c) => {
      const n = nomChoix(c);
      return n.length === 3 ? orthP(o, c0, n) : Math.abs(pt(dir(o, n), dir(o, c0))) < 1e-9;
    }));
  },
  [`${P2}12`]: (q) => {
    const t = q.text.replace(/ /g, " ");
    if (/deux droites sécantes du sol/.test(t)) return exact(q, "Oui : deux droites sécantes du plan suffisent");
    if (/deux droites parallèles du sol/.test(t)) return exact(q, "Non : ces deux droites parallèles ont la même direction");
    if (/une seule droite du sol/.test(t)) return exact(q, "Non : une seule droite ne suffit pas");
    return ["contrôle illisible"];
  },
  [`${P2}13`]: (q) => {
    const t = q.text.replace(/ /g, " ");
    const lu = (r: RegExp) => {
      const m = t.match(r);
      return m ? Number(m[1]) : null;
    };
    const h = lu(/haut de (\d+) m/);
    const c = lu(/long de (\d+) m/);
    const d = lu(/à (\d+) m de son pied/);
    const v = h !== null && d !== null ? Math.hypot(h, d) : h !== null && c !== null ? Math.sqrt(c * c - h * h) : c !== null && d !== null ? Math.sqrt(c * c - d * d) : NaN;
    if (!proche(v, Math.round(v))) return [`racine non entière : ${v}`];
    return accepte(q, v);
  },
};
