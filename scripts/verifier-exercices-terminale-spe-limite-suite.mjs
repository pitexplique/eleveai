// Recalcul indépendant de la feuille « Limites de suites » de terminale spé
// (29/09/2026) : lib/fiches-exercices/maths-terminale-limite-suite.tsx.
//
// ⭐ Les points dessinés sont relus dans le source et recalculés sur la
// formule de la suite ; les limites sont confirmées par évaluation numérique
// à grand rang ; les escaliers (toiles d'araignée) sont refaits en itérant f ;
// le programme Python est EXÉCUTÉ ; le flocon de Koch est reconstruit par la
// fonction du fichier, puis mesuré (côtés, périmètre, aire par la formule du
// lacet) — un autre chemin que la formule admise de l'énoncé.
// Usage : node scripts/verifier-exercices-terminale-spe-limite-suite.mjs

import { feuilleTerminale, executerPython } from "./verifier-exercices-terminale-commun.mjs";
import fs from "node:fs";
import path from "node:path";
import { RACINE } from "./verifier-exercices-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-terminale-limite-suite.tsx";

// La fonction `koch` du fichier, types retirés, pour évaluer la figure telle qu'elle est écrite.
const source = fs.readFileSync(path.join(RACINE, FICHIER), "utf8");
const defKoch = /const koch = \(n: number\): \[number, number\]\[\] => \{[\s\S]*?\n\};/.exec(source)?.[0] ?? "";
const koch = Function(`${defKoch.replace(/: \[number, number\]\[\]/g, "").replace(/\(n: number\)/, "(n)").replace(/^const koch = /, "return ")}`)();

const F = feuilleTerminale({ fichier: FICHIER, notion: "limite_suite", contexte: { koch } });
const { dit, enonceDit, verif, vrai, pointsSur, termes, courbes, dessin, tableauDe, c } = F;
const grand = (u, n = 1e7) => u(n);

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
{
  const u = (n) => 3 - 2 / (n + 1);
  pointsSur("1. u(n) = 3 − 2/(n + 1)", termes(1, "figure"), u);
  vrai("1. horizontale y = 3", dessin("repere", 1, "figure")[3] === 3);
  verif("1. limite 3", grand(u), 3, 1e-6);
  // Rang de 2,9 < u(n) : le premier n entier, cherché pas à pas (exact : 2/(n+1) < 1/10).
  const rang = (d) => { let n = 0; while (!(2 * d < n + 1)) n++; return n; };
  vrai("1. rang 20 pour 0,1", rang(10) === 20);
  vrai("1. rang 200 pour 0,01", rang(100) === 200);
  dit(1, "À partir du rang $20$");
  dit(1, "à partir du rang $200$");
  dit(1, "soit $n + 1 > 20$, donc $n > 19$");
}
{
  pointsSur("2. d) 2 + 4/n", termes(2), (n) => 2 + 4 / n);
  vrai("2. horizontale 2", dessin("repere", 2)[3] === 2);
  verif("2. 5/√n → 0", 5 / Math.sqrt(1e12), 0, 1e-5);
  for (const m of ["$\\lim n^3 = +\\infty$", "$-2n^2 \\to -\\infty$", "$2 + \\dfrac{4}{n} \\to 2$", "$\\dfrac{5}{\\sqrt{n}} = 5 \\times \\dfrac{1}{\\sqrt{n}} \\to 0$"]) dit(2, m);
}
{
  pointsSur("3. c) 4 × (−0,5)^n", termes(3), (n) => 4 * (-0.5) ** n, 1e-9);
  vrai("3. d) (−2)^n : 1, −2, 4, −8, 16", [0, 1, 2, 3, 4].map((n) => (-2) ** n).join() === "1,-2,4,-8,16");
  dit(3, "$1$, $-2$, $4$, $-8$, $16$");
  dit(3, "$\\lim 0{,}8^n = 0$");
  dit(3, "$\\lim 1{,}05^n = +\\infty$");
}
{
  const v = (n) => (2 + 1 / n) * (5 - 3 / n ** 2);
  const t = tableauDe(4);
  t.en.forEach((n, i) => F.arrondi(`4. v(${n})`, t.nombres[i], v(n), 0.001));
  verif("4. lim v = 10", grand(v), 10, 1e-6);
  dit(4, "tend vers $2 \\times 5 = 10$");
  dit(4, "$10{,}437$, puis $10{,}049$, puis $10{,}005$");
}
{
  const t = tableauDe(5);
  t.en.forEach((n, i) => verif(`5. n² − 5n en ${n}`, t.nombres[i], n * n - 5 * n));
  dit(5, "$u_n = n^2\\left(1 - \\dfrac{5}{n}\\right)$");
  vrai("5. u(n) → +∞ (u(10⁶) > 10¹¹)", 1e12 - 5e6 > 1e11);
}
{
  const u = (n) => (3 * n * n + 1) / (n * n + 4);
  pointsSur("6. (3n² + 1)/(n² + 4)", termes(6), u);
  verif("6. limite 3", grand(u), 3, 1e-9);
  dit(6, "Donc $\\lim u_n = 3$");
}
{
  const u = (n) => n + (-1) ** n;
  pointsSur("7. n + (−1)^n", termes(7), u, 1e-9);
  vrai("7. chaque point au-dessus de n − 1", termes(7).every((p) => p.y >= p.x - 1));
  vrai("7. la droite orange est y = x − 1", JSON.stringify(courbes(7)[0].q) === "[0,1,-1]");
  dit(7, "($u_0 = 1$ et $u_1 = 0$)");
}
{
  const u = (n) => Math.cos(n) / n;
  pointsSur("8. cos(n)/n", termes(8), u);
  vrai("8. points dans l'entonnoir ±1/n", termes(8).every((p) => Math.abs(p.y) <= 1 / p.x));
  const [haut, bas] = courbes(8);
  vrai("8. courbes 1/x et −1/x", haut.pts.every(([x, y]) => Math.abs(y - 1 / x) < 6e-4) && bas.pts.every(([x, y]) => Math.abs(y + 1 / x) < 6e-4));
}

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
/** L'escalier d'une toile d'araignée : (u0, 0) → (u0, u1) → (u1, u1) → (u1, u2)… */
const escalier = (k, f, u0) => {
  const pts = courbes(k).find((cb) => cb.couleur === "#ea580c").pts;
  const attendu = [[u0, 0]];
  let u = u0;
  while (attendu.length < pts.length) {
    const v = f(u);
    attendu.push([u, v]);
    if (attendu.length < pts.length) attendu.push([v, v]);
    u = v;
  }
  const fautes = pts.filter(([x, y], i) => Math.abs(x - attendu[i][0]) > 6e-4 || Math.abs(y - attendu[i][1]) > 6e-4);
  vrai(`${k}. l'escalier orange suit u(n+1) = f(u(n)) (${pts.length} sommets)`, fautes.length === 0, JSON.stringify(fautes[0]));
};
{
  const f = (x) => Math.sqrt(2 * x + 3);
  escalier(9, f, 1);
  verif("9. f(3) = 3", f(3), 3);
  vrai("9. racines de l² − 2l − 3 : 3 et −1", 3 * 3 - 2 * 3 - 3 === 0 && 1 + 2 - 3 === 0);
  let u = 1;
  for (let i = 0; i < 200; i++) u = f(u);
  verif("9. la suite tend vers 3", u, 3, 1e-9);
  vrai("9. croissante et ≤ 3 sur 50 rangs", (() => { let a = 1; for (let i = 0; i < 50; i++) { const b = f(a); if (!(a <= b && b <= 3)) return false; a = b; } return true; })());
  dit(9, "$u_1 = \\sqrt{5} \\approx 2{,}24$");
  dit(9, "Donc $\\ell = 3$ ou $\\ell = -1$");
}
{
  const u = (n) => (n === 0 ? 50 : 0.8 * u(n - 1) + 4); // par la récurrence, pas par la formule
  pointsSur("10. u(n)/10 (graduation = 10 t)", termes(10), (n) => u(n) / 10);
  verif("10. formule 20 + 30 × 0,8^n", u(7), 20 + 30 * 0.8 ** 7, 1e-12);
  const premier = (() => { let n = 0; while (u(n) >= 21) n++; return n; })();
  vrai(`10. premier rang sous 21 t : ${premier}`, premier === 16);
  dit(10, "Donc $n = 16$ : la masse passe sous $21$ tonnes en $2041$");
  F.arrondi("10. 0,8^15 ≈ 0,0352", 0.0352, 0.8 ** 15, 0.0001);
  F.arrondi("10. 0,8^16 ≈ 0,0281", 0.0281, 0.8 ** 16, 0.0001);
  dit(10, "$0{,}8^{15} \\approx 0{,}0352$");
  dit(10, "$0{,}8^{16} \\approx 0{,}0281$");
  verif("10. équilibre : 0,8 × 20 + 4 = 20", 0.8 * 20 + 4, 20);
}
{
  const u = (n) => (3 ** n + 2 ** n) / (3 ** n - 1);
  pointsSur("11. (3^n + 2^n)/(3^n − 1)", termes(11), u);
  verif("11. limite 1", u(200), 1, 1e-12);
  vrai("11. v(n) → −∞ (v(60) < −10⁵)", (2 ** 60 - 5 ** 60) / 4 ** 60 < -1e5);
  dit(11, "$v_n = \\dfrac{2^n}{4^n} - \\dfrac{5^n}{4^n} = 0{,}5^n - 1{,}25^n$");
}
{
  const w = (n) => n / (Math.sqrt(n * n + n) + n); // la forme conjuguée : stable en flottants
  const t = tableauDe(12);
  t.en.forEach((n, i) => F.arrondi(`12. w(${n})`, t.nombres[i], w(n), 0.0001));
  verif("12. les deux écritures coïncident", Math.sqrt(12) - 3, w(3), 1e-12);
  verif("12. limite 1/2", w(1e9), 0.5, 1e-8);
}
{
  pointsSur("13. 1,5^n", termes(13), (n) => 1.5 ** n);
  vrai("13. Bernoulli : 1,5^n ≥ 1 + 0,5n jusqu'à 60", Array.from({ length: 61 }, (_, n) => 1.5 ** n >= 1 + 0.5 * n).every(Boolean));
  vrai("13. rang 199 : 1 + 0,5n > 100 ⇔ n ≥ 199", 1 + 0.5 * 199 > 100 && !(1 + 0.5 * 198 > 100));
  vrai("13. 1,5^11 < 100 < 1,5^12", 1.5 ** 11 < 100 && 1.5 ** 12 > 100);
  F.arrondi("13. 1,5^12 ≈ 129,7", 129.7, 1.5 ** 12, 0.1);
  dit(13, "à partir du rang $199$");
  dit(13, "$1{,}5^{12} \\approx 129{,}7$");
}
{
  const S = (n) => { let s = 0; for (let k = 1; k <= n; k++) s += n / (n * n + k); return s; };
  pointsSur("14. S(n)", termes(14), S);
  vrai("14. encadrement n²/(n²+n) ≤ S ≤ n²/(n²+1) pour n ≤ 500", Array.from({ length: 500 }, (_, i) => i + 1).every((n) => n * n / (n * n + n) <= S(n) + 1e-12 && S(n) <= n * n / (n * n + 1) + 1e-12));
  verif("14. S(10⁵) ≈ 1", S(1e5), 1, 1e-4);
  const [bas, haut] = courbes(14);
  vrai("14. courbes x/(x+1) et x²/(x²+1)", bas.pts.every(([x, y]) => Math.abs(y - x / (x + 1)) < 6e-4) && haut.pts.every(([x, y]) => Math.abs(y - (x * x) / (x * x + 1)) < 6e-4));
}
{
  const lignes = dessin("programme", 15, "figure")[0];
  const sortie = executerPython(lignes, "print(seuil(1000))");
  if (sortie === null) console.log("  (Python absent : seuil(1000) non exécuté)");
  else vrai(`15. Python : seuil(1000) = ${sortie}`, sortie === "14");
  const u = [2];
  while (u.length < 16) u.push(1.5 * u[u.length - 1] + 1);
  vrai("15. u(n) ≥ n + 2", u.every((x, n) => x >= n + 2));
  F.arrondi("15. u13 ≈ 776,5", 776.5, u[13], 0.1);
  F.arrondi("15. u14 ≈ 1165,7", 1165.7, u[14], 0.1);
  dit(15, "$u_{13} \\approx 776{,}5$");
  dit(15, "$u_{14} \\approx 1165{,}7$");
  dit(15, "Donc seuil(1000) renvoie $14$");
}
{
  const u = [3];
  while (u.length < 6) u.push((u[u.length - 1] + 2 / u[u.length - 1]) / 2);
  pointsSur("16. Héron", termes(16), (n) => u[n]);
  verif("16. u1 = 11/6", u[1], 11 / 6, 1e-12);
  F.arrondi("16. u2 ≈ 1,4621", 1.4621, u[2], 0.0001);
  F.arrondi("16. u3 ≈ 1,4150", 1.415, u[3], 0.0001);
  F.arrondi("16. u4 ≈ 1,414214", 1.414214, u[4], 0.000001);
  vrai("16. u4 a six décimales justes", Math.abs(u[4] - Math.SQRT2) < 5e-7);
  vrai("16. décroissante et ≥ √2", u.every((x, i) => x >= Math.SQRT2 - 1e-15 && (i === 0 || x <= u[i - 1])));
  F.arrondi("16. horizontale ≈ √2", dessin("repere", 16)[3], Math.SQRT2, 0.001);
  dit(16, "$u_1 = \\dfrac{11}{6} \\approx 1{,}8333$, $u_2 \\approx 1{,}4621$, $u_3 \\approx 1{,}4150$");
}

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
{
  const f = (x) => 1.6 * x - 0.1 * x * x;
  escalier(17, f, 1);
  vrai("17. la parabole est f", JSON.stringify(courbes(17)[0].q) === "[-0.1,1.6,0]");
  verif("17. f(6) = 6", f(6), 6, 1e-12);
  const u = [1];
  while (u.length < 200) u.push(f(u[u.length - 1]));
  F.arrondi("17. u5 ≈ 4,725", 4.725, u[5], 0.001);
  F.arrondi("17. u6 ≈ 5,327", 5.327, u[6], 0.001);
  vrai("17. u5 < 5 < u6", u[5] < 5 && u[6] > 5);
  verif("17. limite 6", u[199], 6, 1e-9);
  vrai("17. croissante, dans [0 ; 6]", u.every((x, i) => x >= 0 && x <= 6 + 1e-12 && (i === 0 || x >= u[i - 1] - 1e-12)));
  dit(17, "$u_5 \\approx 4{,}725$, puis $u_6 \\approx 5{,}327$");
  dit(17, "au bout de $6$ ans");
}
{
  const h = (n) => 2 * 0.6 ** n;
  const D = (n) => { let d = 2; for (let k = 1; k <= n; k++) d += 2 * h(k); return d; }; // trajet par trajet
  pointsSur("18. D(n), trajet par trajet", termes(18), D);
  vrai("18. D(n) = 8 − 6 × 0,6^n (n ≤ 30)", Array.from({ length: 31 }, (_, n) => Math.abs(D(n) - (8 - 6 * 0.6 ** n)) < 1e-12).every(Boolean));
  vrai("18. horizontale 8", dessin("repere", 18)[3] === 8);
  dit(18, "$D_0 = 2$, $D_1 = 4{,}4$, $D_2 = 5{,}84$");
  verif("18. 1,2/0,4 = 3", 1.2 / 0.4, 3, 1e-12);
}
{
  const pts = dessin("repere", 19, "figure")[1][0].pts;
  const cotes = pts.slice(1).map(([x, y], i) => Math.hypot(x - pts[i][0], y - pts[i][1]));
  vrai(`19. étape 2 : 48 côtés (${cotes.length})`, cotes.length === 48);
  vrai("19. ligne fermée", Math.hypot(pts[0][0] - pts[48][0], pts[0][1] - pts[48][1]) < 1e-9);
  vrai("19. chaque côté mesure 1/3", cotes.every((l) => Math.abs(l - 1 / 3) < 2e-3));
  verif("19. périmètre 16", cotes.reduce((s, l) => s + l, 0), 16, 2e-3);
  verif("19. P2 = 9 × (4/3)²", 9 * (4 / 3) ** 2, 16, 1e-12);
  // Aire par la formule du lacet, contre la formule admise A2 = A0 (1 + 3/5 (1 − (4/9)²)).
  const lacet = Math.abs(pts.slice(1).reduce((s, [x, y], i) => s + pts[i][0] * y - x * pts[i][1], 0)) / 2;
  const A0 = (Math.sqrt(3) / 4) * 9;
  verif("19. aire de l'étape 2 (lacet) = formule de l'énoncé", lacet, A0 * (1 + (3 / 5) * (1 - (4 / 9) ** 2)), 2e-3);
  // Et la formule admise, étape par étape : on ajoute 3 × 4^n triangles de côté 3^(−n).
  let A = A0;
  for (let n = 0; n < 12; n++) A += 3 * 4 ** n * (Math.sqrt(3) / 4) * 9 ** -n;
  verif("19. A12 par ajouts = formule", A, A0 * (1 + (3 / 5) * (1 - (4 / 9) ** 12)), 1e-12);
  vrai("19. le flocon tient dans le cadre [−3 ; 3]", pts.every(([x, y]) => Math.abs(x) < 3 && Math.abs(y) < 3));
  dit(19, "$P_2 = 16$");
  dit(19, "$A_n \\to A_0\\left(1 + \\dfrac{3}{5}\\right) = \\dfrac{8}{5}A_0$");
}
{
  const u = (n) => { let s = 0; for (let k = 1; k <= n; k++) s += 1 / (k * k); return s; };
  pointsSur("20. sommes partielles", termes(20), u);
  vrai("20. u(n) ≤ 2 − 1/n pour n ≤ 2000", Array.from({ length: 2000 }, (_, i) => i + 1).every((n) => u(n) <= 2 - 1 / n + 1e-12));
  F.arrondi("20. π²/6 ≈ 1,645", 1.645, Math.PI ** 2 / 6, 0.001);
  verif("20. u(10⁶) ≈ π²/6", u(1e6), Math.PI ** 2 / 6, 1e-5);
  vrai("20. courbe orange 2 − 1/x", courbes(20)[0].pts.every(([x, y]) => Math.abs(y - (2 - 1 / x)) < 6e-4));
  dit(20, "$\\dfrac{\\pi^2}{6} \\approx 1{,}645$");
}

enonceDit(10, "$u_0 = 50$ et $u_{n+1} = 0{,}8u_n + 4$");
vrai("les corrigés citent leurs pièges (⚠️ ou ⛔ dans les 20)", F.feuille.corrections.every((t) => /⚠️|⛔/.test(t)));
void c;
F.fin();
