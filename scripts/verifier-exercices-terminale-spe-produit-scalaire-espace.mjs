// Recalcul indépendant de la feuille « Produit scalaire dans l'espace » de
// terminale spé (29/09/2026) : lib/fiches-exercices/maths-terminale-produit-scalaire-espace.tsx.
//
// ⭐ Autres chemins que le corrigé : les projetés sont retrouvés en MINIMISANT
// la distance (balayage puis descente), les vecteurs normaux par le produit
// vectoriel, les angles par la loi des cosinus sur les longueurs, les volumes
// par le produit mixte (|det| / 6). Les figures en perspective cavalière sont
// relues : points recalculés (dans le plan annoncé, sur la droite annoncée),
// projection refaite pour contrôler que les noms ne se chevauchent pas. Le
// programme Python est EXÉCUTÉ.
// Usage : node scripts/verifier-exercices-terminale-spe-produit-scalaire-espace.mjs

import { feuilleTerminale, executerPython } from "./verifier-exercices-terminale-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-terminale-produit-scalaire-espace.tsx";
const F = feuilleTerminale({ fichier: FICHIER, notion: "produit_scalaire_espace", dessinsEnPlus: ["cavaliere"] });
const { dit, verif, vrai, dessin, dessins, tableauDe } = F;

/* ── Vecteurs ───────────────────────────────────────────────────────────── */
const sub = (a, b) => a.map((v, i) => v - b[i]);
const add = (a, b) => a.map((v, i) => v + b[i]);
const mul = (k, a) => a.map((v) => k * v);
const dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
const norme = (a) => Math.sqrt(dot(a, a));
const dist = (a, b) => norme(sub(a, b));
const milieu = (a, b) => mul(0.5, add(a, b));
const egal = (a, b, eps = 1e-9) => a.length === b.length && a.every((v, i) => Math.abs(v - b[i]) <= eps);
const vectoriel = (u, v) => [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
const colineaires = (u, v) => norme(vectoriel(u, v)) < 1e-9;
const surPlan = (n, d, p) => Math.abs(dot(n, p) + d) < 1e-9;
/** Angle (degrés) du triangle en P, par la loi des cosinus sur les LONGUEURS. */
const angleLongueurs = (P, Q, R) => {
  const [a, b, c] = [dist(Q, R), dist(P, Q), dist(P, R)];
  return (Math.acos((b * b + c * c - a * a) / (2 * b * c)) * 180) / Math.PI;
};
/** Le point de P(s, t) = O + s u + t v le plus proche de M, par descente de gradient numérique. */
function plusProche(f, M, dim) {
  let x = Array(dim).fill(0);
  const g = (x) => dist(f(...x), M) ** 2;
  let pas = 1;
  for (let it = 0; it < 20000 && pas > 1e-13; it++) {
    let mieux = false;
    for (let i = 0; i < dim; i++) for (const sgn of [1, -1]) {
      const y = [...x];
      y[i] += sgn * pas;
      if (g(y) < g(x)) { x = y; mieux = true; }
    }
    if (!mieux) pas /= 2;
  }
  return f(...x);
}
const volume = (A, B, C, D) => Math.abs(dot(sub(B, A), vectoriel(sub(C, A), sub(D, A)))) / 6;
const nb = (x) => String(+x.toFixed(6)).replace(".", "{,}");
const co = (p) => `(${p.map(nb).join(" ; ")})`;

/* ── Les figures en perspective cavalière (même contrôle que la géométrie) ─ */
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
const cubeJuste = (k) => vrai(`${k}. les huit sommets du cube`, Object.entries(CUBE).every(([n, p]) => egal(figures[k](n), p)));
/** Les quatre coins d'un morceau de plan dessiné sont-ils dans le plan annoncé ? */
const coinsDans = (k, n, d) => vrai(`${k}. les coins du plan dessiné vérifient son équation`, ["p1", "p2", "p3", "p4"].every((m) => surPlan(n, d, figures[k](m))));

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
{
  const [u, v] = [[1, -2, 3], [4, 1, -1]];
  const t = tableauDe(1);
  vrai("1. tableau : produits et somme", egal(t.nombres, [...u.map((x, i) => x * v[i]), dot(u, v)]));
  verif("1. u · v = −1", dot(u, v), -1);
  verif("1. ‖u‖² = 14", dot(u, u), 14);
  verif("1. (2u) · (v − u) = −30 (en coordonnées)", dot(mul(2, u), sub(v, u)), -30);
  dit(1, "Soit $4 - 2 - 3 = -1$");
  dit(1, "Soit $2(-1 - 14) = -30$");
}
{
  cubeJuste(2);
  const V = (a, b) => sub(CUBE[b], CUBE[a]);
  verif("2. AB · AG = 1", dot(V("A", "B"), V("A", "G")), 1);
  verif("2. AE · BC = 0", dot(V("A", "E"), V("B", "C")), 0);
  verif("2. AB · GH = −1", dot(V("A", "B"), V("G", "H")), -1);
  vrai("2. projeté de G sur (AB) = B", egal(plusProche((t) => mul(t, V("A", "B")), CUBE.G, 1), CUBE.B, 1e-6));
  dit(2, "= AB^2 = 1$");
  dit(2, "= -AB^2 = -1$");
}
{
  verif("3. u · v = 0", dot([2, -1, 3], [1, 5, 1]), 0);
  const m = [...Array(201)].map((_, i) => -10 + i * 0.1).filter((m) => Math.abs(dot([1, m, 2], [3, 1, -3])) < 1e-9);
  vrai(`3. seule valeur : m = 3 (${m.map((x) => x.toFixed(1))})`, m.length === 1 && Math.abs(m[0] - 3) < 1e-9);
  const t = tableauDe(3);
  vrai("3. tableau : 2, −5, 3, somme 0", egal(t.nombres, [2, -5, 3, 0]));
  dit(3, "$m = 3$");
}
{
  const P = figures[4];
  const M = [6, 2, 3];
  vrai("4. M et le pavé 6 × 2 × 3", egal(P("M"), M) && egal(P("c"), [6, 2, 0]) && egal(P("b"), [6, 0, 0]) && egal(P("h"), [0, 2, 3]));
  vrai("4. cotes 6, 2, 3 au milieu de leurs arêtes", egal(P("c6"), milieu([0, 0, 0], [6, 0, 0])) && egal(P("c2"), milieu([6, 0, 0], [6, 2, 0])) && egal(P("c3"), milieu([0, 0, 0], [0, 0, 3])));
  verif("4. ‖u‖ = 7", norme(M), 7);
  verif("4. Pythagore : √(40 + 9) = 7", Math.hypot(norme([6, 2, 0]), 3), 7);
  verif("4. AB = 3", dist([1, 2, -1], [3, 0, 0]), 3);
  verif("4. vecteur unitaire", norme(mul(1 / 7, M)), 1);
  dit(4, "donc $\\|\\vec{u}\\| = 7$");
  dit(4, "\\left(\\dfrac{6}{7} ; \\dfrac{2}{7} ; \\dfrac{3}{7}\\right)");
}
{
  cubeJuste(5);
  const a = angleLongueurs(CUBE.A, CUBE.F, CUBE.C);
  verif("5. angle FAC = 60° (loi des cosinus)", a, 60, 1e-9);
  verif("5. AF · AC = 1", dot(CUBE.F, CUBE.C), 1);
  dit(5, "$\\widehat{FAC} = 60^\\circ$");
}
{
  const n = [2, -1, 1], d = -3;
  coinsDans(6, n, d);
  const P = figures[6];
  vrai("6. A et M dans le plan, flèche n = A + n", surPlan(n, d, P("A")) && surPlan(n, d, P("M")) && egal(sub(P("n"), P("A")), n) && egal(P("A"), [1, 2, 3]));
  dit(6, "soit $2x - y + z - 3 = 0$");
}
{
  const [n, n1, n2] = [[2, -1, 1], [1, 1, -1], [-4, 2, -2]];
  verif("7. n · n' = 0", dot(n, n1), 0);
  vrai("7. n'' = −2n", egal(n2, mul(-2, n)));
  vrai("7. A(0 ; 0 ; 3) dans P, pas dans R", surPlan(n, -3, [0, 0, 3]) && dot(n2, [0, 0, 3]) + 1 === -5);
  const t = tableauDe(7);
  vrai("7. tableau : quotients n'' ÷ n", t.nombres.every((q, i) => Math.abs(q - n2[i] / n[i]) < 1e-12));
}
{
  const n = [2, -1, 1];
  coinsDans(8, n, 0);
  const P = figures[8];
  vrai("8. la droite dessinée est d (points ±1,2 n)", egal(P("a"), mul(-1.2, n)) && egal(P("b"), mul(1.2, n)));
  vrai("8. d coupe P en O", surPlan(n, 0, [0, 0, 0]) && Math.abs(dot(n, n)) > 0);
  verif("8. n · u' = 0", dot(n, [1, 1, -1]), 0);
  verif("8. (1 ; 1 ; 5) donne 6", dot(n, [1, 1, 5]), 6);
}

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
{
  const [A, B] = [[1, 0, 2], [3, 4, 0]];
  const n = [1, 2, -1], d = -5;
  // Autre chemin : MA² − MB² en quelques points, contre l'équation.
  vrai("9. MA = MB ⇔ x + 2y − z − 5 = 0 (20 points)", [...Array(20)].map((_, i) => [i - 7, (i * 3) % 5 - 2, (i * 7) % 9 - 4]).every((M) => Math.abs(dist(M, A) ** 2 - dist(M, B) ** 2 - 4 * (dot(n, M) + d)) < 1e-9));
  vrai("9. I dans le plan, AB = 2n", surPlan(n, d, milieu(A, B)) && egal(sub(B, A), mul(2, n)));
  verif("9. CA² = CB² = 11", dist([4, 1, 1], A) ** 2, 11);
  verif("9. CB² = 11", dist([4, 1, 1], B) ** 2, 11);
  coinsDans(9, n, d);
  const P = figures[9];
  vrai("9. A, B, I, C dessinés", egal(P("A"), A) && egal(P("B"), B) && egal(P("I"), milieu(A, B)) && egal(P("C"), [4, 1, 1]));
  dit(9, "$x + 2y - z - 5 = 0$");
}
{
  const M = [4, 4, 2];
  const d = (t) => [1 + t, t, t];
  const H = plusProche(d, M, 1);
  vrai("10. point le plus proche (minimisation) : H(4 ; 3 ; 3)", egal(H, [4, 3, 3], 1e-6));
  F.arrondi("10. MH = √2 ≈ 1,41", 1.41, dist(M, [4, 3, 3]));
  vrai("10. MN² = MH² + HN² pour N = d(4)", Math.abs(dist(M, d(4)) ** 2 - dist(M, [4, 3, 3]) ** 2 - dist([4, 3, 3], d(4)) ** 2) < 1e-9);
  const P = figures[10];
  vrai("10. figure : câble de t = 0,5 à 4,5, H = d(3), N = d(4)", egal(P("p"), d(0.5)) && egal(P("q"), d(4.5)) && egal(P("H"), d(3)) && egal(P("N"), d(4)) && egal(P("M"), M));
  dit(10, "$H(4 ; 3 ; 3)$");
  dit(10, "$MH = \\sqrt{2} \\approx 1{,}41$ m");
}
{
  const n = [2, -1, 2], d = -3, M = [4, 0, 2];
  const v1 = [1, 2, 0], v2 = [1, 0, -1];
  vrai("11. v1, v2 dans la direction du plan", dot(n, v1) === 0 && dot(n, v2) === 0);
  const H = plusProche((s, t) => add(add([2, 1, 0], mul(s, v1)), mul(t, v2)), M, 2);
  vrai("11. projeté (minimisation sur le plan) : H(2 ; 1 ; 0)", egal(H, [2, 1, 0], 1e-6) && surPlan(n, d, [2, 1, 0]));
  verif("11. distance 3", dist(M, [2, 1, 0]), 3);
  verif("11. formule de contrôle |f(M)| / ‖n‖ = 3", Math.abs(dot(n, M) + d) / norme(n), 3);
  coinsDans(11, n, d);
  vrai("11. M et H dessinés", egal(figures[11]("M"), M) && egal(figures[11]("H"), [2, 1, 0]));
  dit(11, "$H(2 ; 1 ; 0)$");
  dit(11, "La distance de $M$ à $\\mathscr{P}$ vaut $3$");
}
{
  const Hs = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]];
  const C = [0, 0, 0];
  vrai("12. six arêtes égales à 2√2", [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]].every(([i, j]) => Math.abs(dist(Hs[i], Hs[j]) - 2 * Math.SQRT2) < 1e-12));
  const a = angleLongueurs(C, Hs[0], Hs[1]);
  F.arrondi("12. angle ≈ 109,5° (loi des cosinus)", 109.5, a, 0.1);
  const P = figures[12];
  vrai("12. H1 … H4 dessinés, C au centre", Hs.every((h, i) => egal(P(`H${i + 1}`), h)) && egal(P("C"), C));
  vrai("12. les quatre autres sommets du cube", ["g1", "g2", "g3", "g4"].every((g) => P(g).every((x) => Math.abs(x) === 1)) && ["g1", "g2", "g3", "g4"].every((g) => P(g)[0] * P(g)[1] * P(g)[2] === -1));
  dit(12, "$\\widehat{H_1CH_2} \\approx 109{,}5^\\circ$");
  dit(12, "= -\\dfrac{1}{3}$");
}
{
  cubeJuste(13);
  const n = vectoriel(sub(CUBE.D, CUBE.B), sub(CUBE.G, CUBE.B));
  vrai("13. normale de (BDG) par produit vectoriel ∥ EC", colineaires(n, sub(CUBE.C, CUBE.E)));
  vrai("13. B, D, G sur x + y − z − 1 = 0", [CUBE.B, CUBE.D, CUBE.G].every((p) => surPlan([1, 1, -1], -1, p)));
  const Kp = [2 / 3, 2 / 3, 1 / 3];
  vrai("13. K sur (EC) et dans le plan", surPlan([1, 1, -1], -1, Kp) && colineaires(sub(Kp, CUBE.E), sub(CUBE.C, CUBE.E)));
  verif("13. EK = 2/3 EC", dist(CUBE.E, Kp) / dist(CUBE.E, CUBE.C), 2 / 3);
  vrai("13. K dessiné", egal(figures[13]("K"), Kp));
  dit(13, "$x + y - z - 1 = 0$");
  dit(13, "$K\\left(\\dfrac{2}{3} ; \\dfrac{2}{3} ; \\dfrac{1}{3}\\right)$");
}
{
  const [A, B, Bp] = [[0, 0, 0], [6, 8, 5], [6, 8, 0]];
  const a = angleLongueurs(A, B, Bp);
  F.arrondi("14. angle ≈ 26,6°", 26.6, a, 0.1);
  verif("14. tan = 0,5", (Math.atan(0.5) * 180) / Math.PI, a, 1e-9);
  F.arrondi("14. 2/√5 ≈ 0,894", 0.894, 2 / Math.sqrt(5), 0.001);
  const P = figures[14];
  vrai("14. figure", egal(P("A"), A) && egal(P("B"), B) && egal(P("Bp"), Bp));
  dit(14, "\\approx 26{,}6^\\circ$");
}
{
  const [O, A, B, C] = [[0, 0, 0], [4, 0, 0], [0, -4, 0], [0, 0, 2]];
  const V = volume(O, A, B, C);
  verif("15. volume 16/3 (produit mixte)", V, 16 / 3);
  const n = vectoriel(sub(B, A), sub(C, A));
  vrai("15. normale ∥ (1 ; −1 ; 2)", colineaires(n, [1, -1, 2]));
  vrai("15. A, B, C sur x − y + 2z − 4 = 0", [A, B, C].every((p) => surPlan([1, -1, 2], -4, p)));
  const H = plusProche((s, t) => add(add(A, mul(s, sub(B, A))), mul(t, sub(C, A))), O, 2);
  vrai("15. projeté (minimisation) = (2/3 ; −2/3 ; 4/3)", egal(H, [2 / 3, -2 / 3, 4 / 3], 1e-6));
  const aire = norme(n) / 2;
  verif("15. aire ABC = 4√6 (produit vectoriel)", aire, 4 * Math.sqrt(6));
  verif("15. 3V / OH = aire", (3 * V) / dist(O, [2 / 3, -2 / 3, 4 / 3]), aire);
  F.arrondi("15. OH ≈ 1,63", 1.63, (2 * Math.sqrt(6)) / 3);
  F.arrondi("15. aire ≈ 9,80", 9.8, aire);
  F.arrondi("15. V ≈ 5,33", 5.33, V);
  vrai("15. figure", egal(figures[15]("H"), [2 / 3, -2 / 3, 4 / 3]) && egal(figures[15]("B"), B));
  dit(15, "= 4\\sqrt{6} \\approx 9{,}80$ dm²");
}
{
  const lignes = dessin("programme", 16, "figure")[0];
  const sortie = executerPython(lignes, "print(ps([1, -2, 3], [4, 1, -1]))\nprint(angle([1, 1, 0], [1, 0, 1]))\nprint(angle([1, 2, 2], [2, -2, 1]))");
  if (sortie === null) console.log("  (Python absent : programme non exécuté)");
  else vrai(`16. Python : ${sortie.split(/\r?\n/).join(" | ")}`, sortie.split(/\r?\n/).join("|") === "-1|60.00000000000001|90.0");
  let plante = false;
  try { executerPython(lignes, "print(angle([0, 0, 0], [1, 0, 0]))"); } catch { plante = true; }
  vrai("16. vecteur nul : le programme s'arrête sur une erreur", plante);
  dit(16, "Python affiche 60.00000000000001");
  dit(16, "la fonction renvoie 90.0");
}

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
{
  const [A, B, C, D] = [[0, 0, 3], [8, 0, 3], [8, 4, 6], [0, 4, 6]];
  const n = [0, -3, 4];
  vrai("17. n ∥ AB ∧ AD", colineaires(vectoriel(sub(B, A), sub(D, A)), n));
  vrai("17. A, B, C, D sur −3y + 4z − 12 = 0", [A, B, C, D].every((p) => surPlan(n, -12, p)));
  vrai("17. ABCD rectangle (AB · AD = 0, C = B + AD)", dot(sub(B, A), sub(D, A)) === 0 && egal(C, add(B, sub(D, A))));
  vrai("17. E = milieu de [AC]", egal(milieu(A, C), [4, 2, 4.5]));
  // Inclinaison : pente du toit, montée de 3 m pour 4 m de profondeur.
  F.arrondi("17. inclinaison ≈ 36,9° (arctan 3/4)", 36.9, (Math.atan(3 / 4) * 180) / Math.PI, 0.1);
  F.arrondi("17. cos(n, s) ≈ 0,933", 0.933, dot(n, [1, -2, 2]) / 15, 0.001);
  vrai("17. environ 93 %", Math.round(100 * (14 / 15)) === 93);
  vrai("17. angle ≈ 21°", Math.round((Math.acos(14 / 15) * 180) / Math.PI) === 21);
  const P = figures[17];
  vrai("17. flèche n : E + n/2", egal(sub(P("n"), P("E")), mul(0.5, n)) && egal(P("E"), [4, 2, 4.5]));
  vrai("17. murs sous le toit", egal(P("a0"), [0, 0, 0]) && egal(P("c0"), [8, 4, 0]));
  dit(17, "$-3y + 4z - 12 = 0$");
  dit(17, "environ $36{,}9^\\circ$");
  dit(17, "environ $93$ %");
}
{
  const [A, B, C, D] = [[2, 1, 0], [4, -1, 1], [3, 3, 2], [1, 0, 3]];
  verif("18. AB · AC = 0", dot(sub(B, A), sub(C, A)), 0);
  verif("18. aire 4,5", norme(vectoriel(sub(B, A), sub(C, A))) / 2, 4.5);
  vrai("18. normale ∥ (2 ; 1 ; −2)", colineaires(vectoriel(sub(B, A), sub(C, A)), [2, 1, -2]));
  vrai("18. plan 2x + y − 2z − 5 = 0", [A, B, C].every((p) => surPlan([2, 1, -2], -5, p)));
  const H = plusProche((s, t) => add(add(A, mul(s, sub(B, A))), mul(t, sub(C, A))), D, 2);
  vrai("18. projeté (minimisation) = (3 ; 1 ; 1) = centre de gravité", egal(H, [3, 1, 1], 1e-6) && egal([3, 1, 1], mul(1 / 3, add(add(A, B), C))));
  verif("18. volume 4,5 (produit mixte)", volume(A, B, C, D), 4.5);
  verif("18. masse 11,25 kg", volume(A, B, C, D) * 2.5, 11.25);
  vrai("18. H dessiné", egal(figures[18]("H"), [3, 1, 1]) && egal(figures[18]("D"), D));
  dit(18, "= 4{,}5$ dm³");
  dit(18, "= 11{,}25$ kg");
  dit(18, "$H(3 ; 1 ; 1)$");
}
{
  const n = [1, 2, 2], d = -12, R = [4, 8, 5], N = [12, 0, 0];
  const v1 = [2, -1, 0], v2 = [0, 1, -1];
  const H = plusProche((s, t) => add(add(N, mul(s, v1)), mul(t, v2)), R, 2);
  vrai("19. projeté (minimisation) : H(2 ; 4 ; 1)", egal(H, [2, 4, 1], 1e-6) && surPlan(n, d, [2, 4, 1]));
  verif("19. RH = 6", dist(R, [2, 4, 1]), 6);
  vrai("19. N dans le plan", surPlan(n, d, N));
  verif("19. RN² = 153", dist(R, N) ** 2, 153);
  verif("19. HN² = 117", dist([2, 4, 1], N) ** 2, 117);
  vrai("19. RN ≈ 124 m", Math.round(10 * dist(R, N)) === 124);
  F.arrondi("19. √153 ≈ 12,37", 12.37, Math.sqrt(153));
  F.arrondi("19. √117 ≈ 10,82", 10.82, Math.sqrt(117));
  vrai("19. la verticale de R ne tombe pas en H", !(R[0] === 2 && R[1] === 4));
  coinsDans(19, n, d);
  vrai("19. R, H, N dessinés", egal(figures[19]("R"), R) && egal(figures[19]("H"), [2, 4, 1]) && egal(figures[19]("N"), N));
  dit(19, "$H(2 ; 4 ; 1)$");
  dit(19, "Contrôle : $36 + 117 = 153$");
}
{
  const [O, S, A, B, C] = [[0, 0, 0], [0, 0, 8], [6, 0, 0], [0, 6, 0], [-3.6, -4.8, 0]];
  vrai("20. trois haubans de 10 m", [A, B, C].every((p) => Math.abs(dist(S, p) - 10) < 1e-12));
  const sol = [A, B, C].map((p) => angleLongueurs(p, S, O));
  vrai(`20. même angle avec le sol : ${sol.map((x) => x.toFixed(2))}`, sol.every((x) => Math.abs(x - sol[0]) < 1e-9));
  F.arrondi("20. SAO ≈ 53,1°", 53.1, sol[0], 0.1);
  F.arrondi("20. ASB ≈ 50,2°", 50.2, angleLongueurs(S, A, B), 0.1);
  F.arrondi("20. ASC ≈ 64,9°", 64.9, angleLongueurs(S, A, C), 0.1);
  F.arrondi("20. AOC ≈ 126,9°", 126.9, angleLongueurs(O, A, C), 0.1);
  verif("20. AOB = 90°", angleLongueurs(O, A, B), 90, 1e-9);
  const P = figures[20];
  vrai("20. figure", [["O", O], ["S", S], ["A", A], ["B", B], ["C", C]].every(([m, p]) => egal(P(m), p)));
  dit(20, "\\approx 53{,}1^\\circ$");
  dit(20, "\\approx 50{,}2^\\circ$");
  dit(20, "\\approx 64{,}9^\\circ$");
}

vrai("les corrigés citent leurs pièges (⚠️ ou ⛔ dans les 20)", F.feuille.corrections.every((t) => /⚠️|⛔/.test(t)));
vrai("les 20 corrigés disent ce que montre le dessin (⭐)", F.feuille.corrections.every((t) => t.includes("⭐")));
F.fin();
