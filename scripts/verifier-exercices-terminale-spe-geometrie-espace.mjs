// Recalcul indépendant de la feuille « Vecteurs, droites et plans de l'espace »
// de terminale spé (29/09/2026) : lib/fiches-exercices/maths-terminale-geometrie-espace.tsx.
//
// ⭐ Les figures en perspective cavalière (`cavaliere`, aide locale de la
// feuille) sont relues dans le source : chaque point dessiné est recalculé
// (milieu, point d'une droite, point d'un plan, sommet du cube), et la
// projection est refaite pour vérifier qu'aucun nom ne chevauche un autre nom,
// une pastille ou un trait, et que tout tient dans le cadre de 260 de large.
// Les intersections sont refaites par un solveur de systèmes (moindres
// carrés sur deux équations, contrôle de la troisième), les appartenances par
// évaluation des équations ; le programme Python est EXÉCUTÉ.
// Usage : node scripts/verifier-exercices-terminale-spe-geometrie-espace.mjs

import { feuilleTerminale, executerPython } from "./verifier-exercices-terminale-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-terminale-geometrie-espace.tsx";
const F = feuilleTerminale({ fichier: FICHIER, notion: "geometrie_espace", dessinsEnPlus: ["cavaliere"] });
const { dit, enonceDit, verif, vrai, dessin, dessins, tableauDe } = F;

/* ── Vecteurs ───────────────────────────────────────────────────────────── */
const sub = (a, b) => a.map((v, i) => v - b[i]);
const add = (a, b) => a.map((v, i) => v + b[i]);
const mul = (k, a) => a.map((v) => k * v);
const dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
const norme = (a) => Math.sqrt(dot(a, a));
const milieu = (a, b) => mul(0.5, add(a, b));
const egal = (a, b, eps = 1e-9) => a.length === b.length && a.every((v, i) => Math.abs(v - b[i]) <= eps);
const vectoriel = (u, v) => [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
const colineaires = (u, v) => norme(vectoriel(u, v)) < 1e-9;
const surPlan = (n, d, p) => Math.abs(dot(n, p) + d) < 1e-9;
/** Point commun à A + t u et B + s v : { t, s, point }, ou null (le système n'a pas de solution). */
function intersection(A, u, B, v) {
  // t u − s v = B − A : on résout sur la paire de lignes la mieux conditionnée, puis on contrôle tout.
  const w = sub(B, A);
  let meilleur = null;
  for (const [i, j] of [[0, 1], [0, 2], [1, 2]]) {
    const det = u[i] * -v[j] - u[j] * -v[i];
    if (Math.abs(det) > Math.abs(meilleur?.det ?? 0)) meilleur = { i, j, det };
  }
  if (!meilleur || Math.abs(meilleur.det) < 1e-12) return null;
  const { i, j, det } = meilleur;
  const t = (w[i] * -v[j] - w[j] * -v[i]) / det;
  const s = (u[i] * w[j] - u[j] * w[i]) / det;
  const p = add(A, mul(t, u));
  return egal(p, add(B, mul(s, v)), 1e-9) ? { t, s, point: p } : null;
}
/** Une coordonnée telle que l'écrit le corrigé : −1 → « -1 », 1,5 → « 1{,}5 ». */
const nb = (x) => String(+x.toFixed(6)).replace(".", "{,}");
const co = (p) => `(${p.map(nb).join(" ; ")})`;

/* ── Les figures en perspective cavalière ───────────────────────────────── */
const K = Math.SQRT1_2 / 2;
const DEC = {
  n: [0, -13], s: [0, 14], e: [13, 0], o: [-13, 0], ne: [10, -10], no: [-10, -10], se: [10, 11], so: [-10, 11],
  nne: [5, -13], ene: [13, -5], ese: [13, 5], sse: [5, 13], sso: [-5, 13], oso: [-13, 5], ono: [-13, -5], nno: [-5, -13],
};
const distSegment = ([px, py], [ax, ay], [bx, by]) => {
  const [dx, dy] = [bx - ax, by - ay];
  const L2 = dx * dx + dy * dy || 1;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / L2));
  return Math.hypot(px - ax - t * dx, py - ay - t * dy);
};
/** Refait la projection de l'aide et contrôle la lisibilité ; renvoie les points 3D. */
function lisible(k, [points, traits = {}]) {
  const noms = Object.keys(points);
  const plan = (n) => [points[n][0] + K * points[n][1], points[n][2] + K * points[n][1]];
  const X = noms.map((n) => plan(n)[0]);
  const Y = noms.map((n) => plan(n)[1]);
  const [x0, x1, y0, y1] = [Math.min(...X), Math.max(...X), Math.min(...Y), Math.max(...Y)];
  const s = Math.min(200 / (x1 - x0 || 1), 170 / (y1 - y0 || 1));
  const H = Math.round((y1 - y0) * s + 56);
  const gauche = 30 + (200 - (x1 - x0) * s) / 2;
  const ecran = (n) => { const [a, b] = plan(n); return [+(gauche + (a - x0) * s).toFixed(1), +(H - 28 - (b - y0) * s).toFixed(1)]; };
  const fautes = [];
  const segs = [];
  for (const cle of ["pleins", "caches", "orange", "orangeCaches", "fleches", "axes"]) {
    for (const m of (traits[cle] ?? "").split(/\s+/).filter(Boolean)) {
      const [a, b] = m.split("-");
      if (!(a in points) || !(b in points)) fautes.push(`trait ${m} : point inconnu`);
      else segs.push([ecran(a), ecran(b), m]);
    }
  }
  for (const f of (traits.face ?? "").split(/\s+/).filter(Boolean)) for (const n of f.split("-")) if (!(n in points)) fautes.push(`face ${f} : ${n} inconnu`);
  const etiquettes = noms.filter((n) => points[n][3]).map((n) => {
    const [x, y] = ecran(n);
    if (!DEC[points[n][3]]) fautes.push(`${n} : place « ${points[n][3]} » inconnue`);
    const [dx, dy] = DEC[points[n][3]] ?? [0, 0];
    const texte = points[n][4] ?? n;
    return { n, cx: x + dx, cy: y + dy, w: 9 * [...texte].length + 2 };
  });
  const pastilles = noms.filter((n) => points[n][3] && n !== n.toLowerCase()).map((n) => [n, ecran(n)]);
  for (const e of etiquettes) {
    if (e.cx - e.w / 2 < 1 || e.cx + e.w / 2 > 259 || e.cy - 7 < 1 || e.cy + 7 > H - 1) fautes.push(`${e.n} sort du cadre`);
    for (const f of etiquettes) if (f.n > e.n && Math.abs(e.cx - f.cx) < (e.w + f.w) / 2 + 1 && Math.abs(e.cy - f.cy) < 15) fautes.push(`${e.n} touche ${f.n}`);
    for (const [n, [px, py]] of pastilles) if (n !== e.n && Math.abs(e.cx - px) < e.w / 2 + 3 && Math.abs(e.cy - py) < 10) fautes.push(`${e.n} sur le point ${n}`);
    for (const [a, b, m] of segs) {
      const d = distSegment([e.cx, e.cy], a, b);
      if (d < 6.5) fautes.push(`${e.n} sur le trait ${m} (${d.toFixed(1)} px)`);
    }
  }
  vrai(`${k}. figure en perspective lisible (${etiquettes.length} noms, ${segs.length} traits, 260 × ${H})`, fautes.length === 0, fautes.join(" ; "));
  return (n) => points[n].slice(0, 3);
}
const figures = {};
for (let k = 1; k <= 20; k++) {
  const tous = dessins("cavaliere", k);
  tous.forEach((a) => vrai(`${k}. cavaliere(…) lisible par le script`, !!a.args, a.erreur));
  if (tous.length && tous[0].args) figures[k] = lisible(k, tous[0].args);
}
const CUBE = { A: [0, 0, 0], B: [1, 0, 0], C: [1, 1, 0], D: [0, 1, 0], E: [0, 0, 1], F: [1, 0, 1], G: [1, 1, 1], H: [0, 1, 1] };
const cubeJuste = (k) => vrai(`${k}. les huit sommets du cube (A ; AB, AD, AE)`, Object.entries(CUBE).every(([n, p]) => egal(figures[k](n), p)));

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
{
  cubeJuste(1);
  const P = figures[1];
  vrai("1. I milieu de [FG]", egal(P("I"), milieu(CUBE.F, CUBE.G)));
  for (const n of ["C", "G", "H"]) dit(1, `$${n}${co(CUBE[n])}$`);
  dit(1, "$I\\left(1 ; \\dfrac{1}{2} ; 1\\right)$");
  dit(1, `$\\overrightarrow{EC}${co(sub(CUBE.C, CUBE.E))}$`);
  // L'autre ordre du repère : C = AB + AD s'écrit (1 ; 0 ; 1) dans (AB, AE, AD).
  dit(1, "$C$ deviendrait $(1 ; 0 ; 1)$");
}
{
  cubeJuste(2);
  const V = (a, b) => sub(CUBE[b], CUBE[a]);
  vrai("2. AB + CG = AF", egal(add(V("A", "B"), V("C", "G")), V("A", "F")));
  vrai("2. AD + FE = BD", egal(add(V("A", "D"), V("F", "E")), V("B", "D")));
  vrai("2. AB + AD + AE = AG", egal(add(add(V("A", "B"), V("A", "D")), V("A", "E")), V("A", "G")));
  vrai("2. les flèches A→B→C→G mènent en G", egal(add(add(V("A", "B"), V("B", "C")), V("C", "G")), V("A", "G")));
  dit(2, "= \\overrightarrow{AF}$");
  dit(2, "= \\overrightarrow{BD}$");
  dit(2, "= \\overrightarrow{AG}$");
}
{
  const [u, v, w] = [[2, -1, 3], [-6, 3, -9], [4, -2, 5]];
  vrai("3. u, v colinéaires (v = −3u)", colineaires(u, v) && egal(v, mul(-3, u)));
  vrai("3. u, w non colinéaires", !colineaires(u, w));
  const t = tableauDe(3);
  vrai("3. tableau : quotients v ÷ u", t.nombres.every((q, i) => Math.abs(q - v[i] / u[i]) < 1e-12));
  dit(3, "$\\vec{v} = -3\\vec{u}$");
  dit(3, "$2 \\times 3 = 6 \\neq 5$");
}
{
  const [A, B] = [[1, 4, 1], [3, 0, 5]];
  const P = figures[4];
  vrai("4. A, B, K dessinés", egal(P("A"), A) && egal(P("B"), B) && egal(P("K"), milieu(A, B)));
  dit(4, `$\\overrightarrow{AB}${co(sub(B, A))}$`);
  dit(4, `$K${co(milieu(A, B))}$`);
  verif("4. AB = 6", norme(sub(B, A)), 6);
  dit(4, "= \\sqrt{36} = 6$");
}
{
  const [A, B] = [[1, 0, 2], [3, -1, 5]];
  const u = sub(B, A);
  const d = (t) => add(A, mul(t, u));
  vrai("5. C = d(2)", egal(d(2), [5, -2, 8]));
  vrai("5. E hors de (AB)", !intersection(A, u, [7, -3, 10], [0, 0, 0]) && !colineaires(sub([7, -3, 10], A), u));
  vrai("5. d(3) = (7 ; −3 ; 11)", egal(d(3), [7, -3, 11]));
  const P = figures[5];
  vrai("5. bouts de la droite dessinée : t = −0,5 et t = 3,4", egal(P("p"), d(-0.5)) && egal(P("q"), d(3.4), 1e-9));
  vrai("5. points dessinés", egal(P("A"), A) && egal(P("B"), B) && egal(P("C"), d(2)) && egal(P("E"), [7, -3, 10]));
  dit(5, "$x = 1 + 2t$, $y = -t$, $z = 2 + 3t$");
  dit(5, "$z = 2 + 9 = 11 \\neq 10$");
}
{
  const d = (t) => [2 - t, 1 + 3 * t, 4 * t];
  const d2 = (s) => [1 + 2 * s, 4 - 6 * s, 4 - 8 * s];
  const t = tableauDe(6);
  const lus = t.ligne.slice(1).map((c) => c.replace(/[()\s]/g, "").replace(/−/g, "-").split(";").map(Number));
  vrai("6. tableau : points de d", t.en.every((tt, i) => egal(lus[i], d(tt))));
  vrai("6. les deux représentations décrivent la même droite", [-2, 0, 0.5, 3].every((s) => { const p = d2(s); return egal(d(2 - p[0]), p); }));
  vrai("6. v = −2u", egal([2, -6, -8], mul(-2, [-1, 3, 4])));
  dit(6, "$\\vec{u}(-1 ; 3 ; 4)$");
  dit(6, "$\\vec{v} = -2\\vec{u}$");
}
{
  const n = [2, 1, 2], d = -4;
  vrai("7. A, B dans P ; C non", surPlan(n, d, [1, 2, 0]) && surPlan(n, d, [0, 2, 1]) && !surPlan(n, d, [1, 1, 1]));
  verif("7. C donne 1", dot(n, [1, 1, 1]) + d, 1);
  const P = figures[7];
  const traces = [[2, 0, 0], [0, 4, 0], [0, 0, 2]];
  vrai("7. I, J, K : traces du plan sur les axes", ["I", "J", "K"].every((m, i) => egal(P(m), traces[i]) && surPlan(n, d, P(m))));
  vrai("7. A milieu de [IJ], B milieu de [JK]", egal(P("A"), milieu(traces[0], traces[1])) && egal(P("B"), milieu(traces[1], traces[2])));
  dit(7, "$I(2 ; 0 ; 0)$");
  dit(7, "$J(0 ; 4 ; 0)$");
  dit(7, "$K(0 ; 0 ; 2)$");
  dit(7, "$\\vec{n}(2 ; 1 ; 2)$");
}
{
  cubeJuste(8);
  const V = (a, b) => sub(CUBE[b], CUBE[a]);
  vrai("8. EG = AC", egal(V("E", "G"), V("A", "C")));
  vrai("8. (EG), (BD) : ni parallèles ni sécantes", !colineaires(V("E", "G"), V("B", "D")) && !intersection(CUBE.E, V("E", "G"), CUBE.B, V("B", "D")));
  const c = intersection(CUBE.A, V("A", "G"), CUBE.E, V("E", "C"));
  vrai("8. (AG), (EC) sécantes au centre du cube", !!c && egal(c.point, [0.5, 0.5, 0.5]));
  vrai("8. (EG) à la cote 1, plan (ABC) : z = 0", CUBE.E[2] === 1 && CUBE.G[2] === 1 && [CUBE.A, CUBE.B, CUBE.C].every((p) => p[2] === 0));
  dit(8, "NON COPLANAIRES");
}

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
{
  const [A, B, C, D] = [[1, 0, 1], [2, 2, 0], [3, -1, 2], [5, 3, 0]];
  const [ab, ac, ad] = [sub(B, A), sub(C, A), sub(D, A)];
  vrai("9. AD = 2 AB + AC", egal(ad, add(mul(2, ab), ac)));
  vrai("9. coplanaires : AD · (AB ∧ AC) = 0", Math.abs(dot(ad, vectoriel(ab, ac))) < 1e-12);
  const P = figures[9];
  vrai("9. points dessinés, et p = A + 2 AB", ["A", "B", "C", "D"].every((n, i) => egal(P(n), [A, B, C, D][i])) && egal(P("p"), add(A, mul(2, ab))));
  vrai("9. le chemin A → B → p → D : AB, AB, AC", egal(sub(P("p"), P("B")), ab) && egal(sub(P("D"), P("p")), ac));
  dit(9, `$\\overrightarrow{AB}${co(ab)}$, $\\overrightarrow{AC}${co(ac)}$ et $\\overrightarrow{AD}${co(ad)}$`);
  dit(9, "$5a = 10$");
  dit(9, "$\\overrightarrow{AD} = 2\\overrightarrow{AB} + \\overrightarrow{AC}$");
}
{
  cubeJuste(10);
  const M = mul(1 / 3, CUBE.G);
  const Kg = mul(1 / 3, add(add(CUBE.B, CUBE.D), CUBE.E));
  vrai("10. M = centre de gravité de BDE", egal(M, Kg));
  vrai("10. M dessiné en (1/3 ; 1/3 ; 1/3)", egal(figures[10]("M"), M));
  // Autre chemin : le plan (BDE) est x + y + z = 1, et (AG) le coupe en t = 1/3.
  vrai("10. B, D, E sur x + y + z = 1, A non", [CUBE.B, CUBE.D, CUBE.E].every((p) => surPlan([1, 1, 1], -1, p)) && !surPlan([1, 1, 1], -1, CUBE.A));
  verif("10. (AG) coupe (BDE) en t = 1/3", 1 / 3, 1 / (1 + 1 + 1));
  dit(10, "$M\\left(\\dfrac{1}{3} ; \\dfrac{1}{3} ; \\dfrac{1}{3}\\right)$");
  dit(10, "soit $K\\left(\\dfrac{1}{3} ; \\dfrac{1}{3} ; \\dfrac{1}{3}\\right)$");
}
{
  const [A1, u1] = [[1, 2, 0], [1, -1, 2]];
  const [A2, u2] = [[0, -1, 4], [1, 1, -1]];
  const [A3, u3] = [[1, 0, 0], [2, 1, 1]];
  const i12 = intersection(A1, u1, A2, u2);
  vrai("11. d1 ∩ d2 = P(2 ; 1 ; 2), t = 1, s = 2", !!i12 && egal(i12.point, [2, 1, 2]) && Math.abs(i12.t - 1) < 1e-12 && Math.abs(i12.s - 2) < 1e-12);
  vrai("11. pas de collision : positions différentes à chaque instant", [0, 0.5, 1, 1.5, 2].every((t) => !egal(add(A1, mul(t, u1)), add(A2, mul(t, u2)))));
  vrai("11. d1, d3 non coplanaires", !colineaires(u1, u3) && !intersection(A1, u1, A3, u3) && Math.abs(dot(sub(A3, A1), vectoriel(u1, u3))) > 1e-9);
  // Le chemin du corrigé : t = 2k et 2 − 2k = k.
  vrai("11. k = 2/3 vérifie 2 − 2k = k, et 2t ≠ k pour t = 2k", Math.abs(2 - 2 * (2 / 3) - 2 / 3) < 1e-12 && Math.abs(2 * (4 / 3) - 2 / 3) > 1);
  const P = figures[11];
  vrai("11. figure : D1 = d1(0), f1 = d1(2), D2 = d2(0), f2 = d2(3), P", egal(P("D1"), A1) && egal(P("f1"), add(A1, mul(2, u1))) && egal(P("D2"), A2) && egal(P("f2"), add(A2, mul(3, u2))) && egal(P("P"), [2, 1, 2]));
  dit(11, "$P(2 ; 1 ; 2)$");
  dit(11, "$k = \\dfrac{2}{3}$ et $t = \\dfrac{4}{3}$");
}
{
  const n = [2, 2, 1], d = -4;
  const f = (p) => dot(n, p) + d;
  const A = [2, 2, 2], u = [-1, -1, -2];
  // Droite / plan : f(A + t u) est affine en t : f(A) + t (n · u).
  const t = -f(A) / dot(n, u);
  vrai("12. d coupe P en t = 1, I(1 ; 1 ; 0)", t === 1 && egal(add(A, mul(t, u)), [1, 1, 0]) && f([1, 1, 0]) === 0);
  vrai("12. d' contenue dans P", [-3, 0, 2.5].every((s) => f([s, -s, 4]) === 0));
  vrai("12. d'' strictement parallèle (f vaut 1)", [-3, 0, 2.5].every((s) => f([1 + s, 1 - s, 1]) === 1));
  const P = figures[12];
  vrai("12. triangle dessiné = traces du plan", [["u", [2, 0, 0]], ["v", [0, 2, 0]], ["w", [0, 0, 4]]].every(([m, p]) => egal(P(m), p) && f(p) === 0));
  vrai("12. A et I dessinés, I milieu du bord du bas", egal(P("A"), A) && egal(P("I"), [1, 1, 0]) && egal(P("I"), milieu([2, 0, 0], [0, 2, 0])));
  dit(12, "$6 - 6t = 0$, donc $t = 1$");
  dit(12, "$I(1 ; 1 ; 0)$");
}
{
  const [A, B, C, D, S] = [[0, 0, 0], [8, 0, 0], [8, 8, 0], [0, 8, 0], [4, 4, 3]];
  const P = figures[13];
  vrai("13. pyramide dessinée", ["A", "B", "C", "D", "S"].every((n, i) => egal(P(n), [A, B, C, D, S][i])));
  const [n1, n2] = [[3, 0, 4], [0, 3, 4]];
  vrai("13. B, C, S ∈ P1 ; C, D, S ∈ P2", [B, C, S].every((p) => surPlan(n1, -24, p)) && [C, D, S].every((p) => surPlan(n2, -24, p)));
  vrai("13. normales non colinéaires", !colineaires(n1, n2));
  const sc = (t) => add(C, mul(t, sub(S, C)));
  vrai("13. (SC) dans les deux plans", [-1, 0, 0.3, 1, 2].every((t) => surPlan(n1, -24, sc(t)) && surPlan(n2, -24, sc(t))));
  vrai("13. à la verticale de (6 ; 6 ; 0) : z = 1,5", egal(sc(0.5), [6, 6, 1.5]));
  dit(13, `$\\overrightarrow{CS}${co(sub(S, C))}$`);
  dit(13, "$z = 1{,}5$");
}
{
  const [O, A, B, C] = [[0, 0, 0], [4, 0, 0], [0, -2, 0], [0, 0, 4]];
  const n = [1, -2, 1];
  vrai("14. A, B, C non alignés", !colineaires(sub(B, A), sub(C, A)));
  vrai("14. x − 2y + z − 4 = 0 passe par A, B, C", [A, B, C].every((p) => surPlan(n, -4, p)));
  const t = 4 / dot(n, [1, -1, 1]);
  vrai("14. t = 1 : K(1 ; −1 ; 1)", t === 1);
  // K dans le triangle : coordonnées barycentriques positives, de somme 1.
  const [a, b, c] = [1 / 4, -1 / -2, 1 / 4];
  vrai("14. K = A/4 + B/2 + C/4, dans la voile", egal(add(add(mul(a, A), mul(b, B)), mul(c, C)), [1, -1, 1]) && a + b + c === 1);
  // L'œil de la perspective est loin dans la direction (k ; −1 ; k), k = √2/4 : il est de l'autre côté que O.
  const oeil = mul(1e3, [K, -1, K]);
  vrai("14. O derrière la voile, vue de face", dot(n, O) - 4 < 0 && dot(n, oeil) - 4 > 0);
  const P = figures[14];
  vrai("14. figure", egal(P("O"), O) && egal(P("A"), A) && egal(P("B"), B) && egal(P("C"), C) && egal(P("K"), [1, -1, 1]) && surPlan(n, -4, P("K")));
  dit(14, "$K(1 ; -1 ; 1)$");
  dit(14, `$\\overrightarrow{AB}${co(sub(B, A))}$ et $\\overrightarrow{AC}${co(sub(C, A))}$`);
}
{
  cubeJuste(15);
  const P = figures[15];
  const aretes = { I: ["B", "C"], J: ["C", "D"], K: ["D", "H"], L: ["H", "E"], M: ["E", "F"], N: ["F", "B"] };
  vrai("15. les six milieux dessinés", Object.entries(aretes).every(([m, [a, b]]) => egal(P(m), milieu(CUBE[a], CUBE[b]))));
  vrai("15. les six milieux dans x + y + z = 3/2", Object.keys(aretes).every((m) => surPlan([1, 1, 1], -1.5, P(m))));
  const tour = ["I", "J", "K", "L", "M", "N", "I"];
  const cotes = tour.slice(1).map((m, i) => norme(sub(P(m), P(tour[i]))));
  vrai("15. six côtés égaux à √2/2", cotes.every((l) => Math.abs(l - Math.SQRT2 / 2) < 1e-12));
  // Angles : chaque sommet voit ses voisins sous 120° (hexagone régulier).
  const angles = tour.slice(0, 6).map((m, i) => {
    const [a, b] = [sub(P(tour[(i + 5) % 6]), P(m)), sub(P(tour[i + 1]), P(m))];
    return (Math.acos(dot(a, b) / (norme(a) * norme(b))) * 180) / Math.PI;
  });
  vrai("15. six angles de 120°", angles.every((x) => Math.abs(x - 120) < 1e-9));
  vrai("15. aucun sommet du cube dans le plan", Object.values(CUBE).every((p) => !surPlan([1, 1, 1], -1.5, p)));
  F.arrondi("15. √2/2 ≈ 0,71", 0.71, Math.SQRT2 / 2);
  dit(15, "\\approx 0{,}71$ dm");
}
{
  const lignes = dessin("programme", 16, "figure")[0];
  const sortie = executerPython(lignes, "print(colineaires([2, -1, 3], [-6, 3, -9]), colineaires([1, 2, 3], [2, 4, 5]), colineaires([0, 0, 1], [0, 0, -4]))");
  if (sortie === null) console.log("  (Python absent : programme non exécuté)");
  else vrai(`16. Python : ${sortie}`, sortie === "True False True");
  const abc = (u, v) => [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
  vrai("16. a, b, c nuls pour (2 ; −1 ; 3), (−6 ; 3 ; −9)", abc([2, -1, 3], [-6, 3, -9]).every((x) => x === 0));
  verif("16. a = −2 pour (1 ; 2 ; 3), (2 ; 4 ; 5)", abc([1, 2, 3], [2, 4, 5])[0], -2);
  dit(16, "$a = 2 \\times 5 - 3 \\times 4 = -2$");
  enonceDit(16, "colineaires([2, -1, 3], [-6, 3, -9])");
}

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
{
  const pts = { A: [0, 0, 0], B: [6, 0, 0], C: [6, 4, 0], D: [0, 4, 0], E: [0, 0, 3], F: [6, 0, 3], G: [6, 4, 3], H: [0, 4, 3] };
  const P = figures[17];
  vrai("17. pavé dessiné", Object.entries(pts).every(([n, p]) => egal(P(n), p)));
  const I = milieu(pts.B, pts.C);
  vrai("17. I milieu de [BC]", egal(P("I"), I) && egal(I, [6, 2, 0]));
  const ag = sub(pts.G, pts.A), ei = sub(I, pts.E), df = sub(pts.F, pts.D);
  vrai("17. (AG), (EI) non coplanaires", !colineaires(ag, ei) && !intersection(pts.A, ag, pts.E, ei));
  const x = intersection(pts.A, ag, pts.D, df);
  vrai("17. (AG) ∩ (DF) = Ω(3 ; 2 ; 1,5) en t = k = 1/2", !!x && egal(x.point, [3, 2, 1.5]) && Math.abs(x.t - 0.5) < 1e-12 && Math.abs(x.s - 0.5) < 1e-12);
  vrai("17. [EI] ne rencontre pas [DF] non plus", !intersection(pts.E, ei, pts.D, df));
  vrai("17. (BDE) : 2x + 3y + 4z − 12 = 0", [pts.B, pts.D, pts.E].every((p) => surPlan([2, 3, 4], -12, p)));
  const t = 12 / dot([2, 3, 4], ag);
  verif("17. t = 1/3", t, 1 / 3);
  vrai("17. point (2 ; 4/3 ; 1) = centre de gravité de BDE", egal(mul(t, ag), [2, 4 / 3, 1]) && egal(mul(t, ag), mul(1 / 3, add(add(pts.B, pts.D), pts.E))));
  dit(17, "$\\Omega(3 ; 2 ; 1{,}5)$");
  dit(17, "$\\left(2 ; \\dfrac{4}{3} ; 1\\right)$");
  dit(17, `$\\overrightarrow{EI}${co(ei)}$`);
}
{
  const S = [0, 0, 6], u = [2, 1, -3];
  const ray = (t) => add(S, mul(t, u));
  const n = [1, 1, -1], d = -3;
  const tSol = -S[2] / u[2];
  vrai("18. S0(4 ; 2 ; 0) en t = 2", tSol === 2 && egal(ray(2), [4, 2, 0]));
  const t = -(dot(n, S) + d) / dot(n, u);
  vrai("18. T en t = 1,5", Math.abs(t - 1.5) < 1e-12);
  const T = ray(t);
  vrai("18. T(3 ; 1,5 ; 1,5), sur la pente (x + y ≥ 3)", egal(T, [3, 1.5, 1.5]) && T[0] + T[1] >= 3 && surPlan(n, d, T));
  vrai("18. S0 sous la pente (la pente y est à z = 3)", 4 + 2 - 3 === 3);
  F.arrondi("18. ST ≈ 5,61", 5.61, norme(sub(T, S)));
  const P = figures[18];
  vrai("18. les coins de la pente dessinée sont dans P", ["a", "b", "c", "d"].every((m) => surPlan(n, d, P(m))));
  vrai("18. le bas de la pente est la ligne x + y = 3 au sol", ["a", "b"].every((m) => P(m)[2] === 0 && P(m)[0] + P(m)[1] === 3));
  vrai("18. S, T, S0 dessinés", egal(P("S"), S) && egal(P("T"), T) && egal(P("S0"), [4, 2, 0]));
  dit(18, "$S_0(4 ; 2 ; 0)$");
  dit(18, "$T(3 ; 1{,}5 ; 1{,}5)$");
  dit(18, "\\approx 5{,}61$ m");
}
{
  const [S, A, B, C] = [[0, 0, 3], [2, 1, 0], [-2, 1, 0], [0, -2, 0]];
  const [I, J, Kp] = [milieu(S, A), milieu(S, B), milieu(S, C)];
  const P = figures[19];
  vrai("19. trépied et milieux dessinés", egal(P("S"), S) && egal(P("A"), A) && egal(P("B"), B) && egal(P("C"), C) && egal(P("I"), I) && egal(P("J"), J) && egal(P("K"), Kp) && egal(P("O"), [0, 0, 0]));
  vrai("19. IJ = AB/2, IK = AC/2", egal(sub(J, I), mul(0.5, sub(B, A))) && egal(sub(Kp, I), mul(0.5, sub(C, A))));
  vrai("19. I, J, K à la cote 1,5", [I, J, Kp].every((p) => p[2] === 1.5));
  vrai("19. O centre de gravité de ABC", egal(mul(1 / 3, add(add(A, B), C)), [0, 0, 0]));
  vrai("19. (0 ; 0 ; 1,5) centre de gravité de IJK", egal(mul(1 / 3, add(add(I, J), Kp)), [0, 0, 1.5]));
  dit(19, `$I${co(I)}$, $J${co(J)}$ et $K${co(Kp)}$`);
  dit(19, `$\\overrightarrow{IJ}${co(sub(J, I))}$ et $\\overrightarrow{AB}${co(sub(B, A))}$`);
  dit(19, `$\\overrightarrow{IK}${co(sub(Kp, I))}$ et $\\overrightarrow{AC}${co(sub(C, A))}$`);
  dit(19, "$(0 ; 0 ; 1{,}5)$");
}
{
  const A = [0, 0, 0], u = [4, 2, 1], B = [12, 0, 4];
  const v = (a) => [-2, 2, a];
  vrai("20. a = 0 : non coplanaires", !colineaires(u, v(0)) && !intersection(A, u, B, v(0)));
  // a cherché par balayage : la seule valeur où les droites se coupent.
  const bons = Array.from({ length: 401 }, (_, i) => -10 + i * 0.05).filter((a) => intersection(A, u, B, v(a)));
  vrai(`20. une seule valeur de a : ${bons.map((a) => a.toFixed(2))}`, bons.length === 1 && Math.abs(bons[0] + 1) < 1e-9);
  const x = intersection(A, u, B, v(-1));
  vrai("20. P(8 ; 4 ; 2) en t = s = 2", egal(x.point, [8, 4, 2]) && Math.abs(x.t - 2) < 1e-12 && Math.abs(x.s - 2) < 1e-12);
  vrai("20. AP ≈ 92 m, BP = 60 m", Math.round(10 * norme(sub(x.point, A))) === 92 && Math.abs(10 * norme(sub(x.point, B)) - 60) < 1e-9);
  F.arrondi("20. 2√21 ≈ 9,165", 9.165, 2 * Math.sqrt(21), 0.001);
  const P = figures[20];
  vrai("20. q = B + 2 v(0), 20 m au-dessus de P", egal(P("q"), add(B, mul(2, v(0)))) && egal(sub(P("q"), [8, 4, 2]), [0, 0, 2]));
  dit(20, "$a = -1$");
  dit(20, "$P(8 ; 4 ; 2)$");
  dit(20, "environ $92$ m");
}

vrai("les corrigés citent leurs pièges (⚠️ ou ⛔ dans les 20)", F.feuille.corrections.every((t) => /⚠️|⛔/.test(t)));
vrai("les 20 corrigés disent ce que montre le dessin (⭐)", F.feuille.corrections.every((t) => t.includes("⭐")));
F.fin();
