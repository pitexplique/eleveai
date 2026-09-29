// Recalcul indépendant de la feuille « Suites et récurrence » de terminale spé
// (29/09/2026) : lib/fiches-exercices/maths-terminale-suite-numerique.tsx.
//
// ⭐ Chaque suite est recalculée PAR SA RÉCURRENCE (terme après terme), et les
// formules explicites démontrées dans les corrigés sont confrontées à ces
// termes sur des dizaines de rangs ; les divisibilités sont testées en entiers
// exacts (BigInt) ; les escaliers sont refaits en itérant f ; les deux
// programmes Python sont EXÉCUTÉS ; les deux villes sont simulées AVEC la
// ville B (0,9a + 0,2b), pas par la formule réduite du corrigé.
// Usage : node scripts/verifier-exercices-terminale-spe-suite-numerique.mjs

import { feuilleTerminale, executerPython, derivee } from "./verifier-exercices-terminale-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-terminale-suite-numerique.tsx";
const F = feuilleTerminale({ fichier: FICHIER, notion: "suite_numerique" });
const { dit, enonceDit, verif, vrai, pointsSur, termes, courbes, dessin, tableauDe, arrondi } = F;

/** Les n premiers termes d'une suite récurrente. */
const suite = (u0, f, n) => {
  const u = [u0];
  while (u.length < n) u.push(f(u[u.length - 1], u.length - 1));
  return u;
};
/** L'escalier d'une toile d'araignée : (u0, 0) → (u0, u1) → (u1, u1) → … */
const escalier = (nom, pts, f, u0) => {
  const attendu = [[u0, 0]];
  let u = u0;
  while (attendu.length < pts.length) {
    const v = f(u);
    attendu.push([u, v]);
    if (attendu.length < pts.length) attendu.push([v, v]);
    u = v;
  }
  const fautes = pts.filter(([x, y], i) => Math.abs(x - attendu[i][0]) > 6e-4 || Math.abs(y - attendu[i][1]) > 6e-4);
  vrai(`${nom} : l'escalier suit u(n+1) = f(u(n)) (${pts.length} sommets)`, fautes.length === 0, JSON.stringify(fautes[0]));
};

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
{
  const w = suite(0, (x, n) => x + n, 10);
  pointsSur("1. c) w(n+1) = w(n) + n", termes(1), (n) => w[n]);
  const t = suite(2, (x) => 3 * x - 2, 4);
  vrai("1. d) t1, t2, t3 = 4, 10, 28", t.slice(1).join() === "4,10,28");
  vrai("1. d) écarts 2 puis 6, quotients 2 puis 2,5", t[1] - t[0] === 2 && t[2] - t[1] === 6 && t[1] / t[0] === 2 && t[2] / t[1] === 2.5);
  vrai("1. b) 5 × 2^n : quotient 2 sur 30 rangs", Array.from({ length: 30 }, (_, n) => (5 * 2 ** (n + 1)) / (5 * 2 ** n) === 2).every(Boolean));
  dit(1, "$t_1 = 4$, $t_2 = 10$, $t_3 = 28$");
  dit(1, "$w_1 = 0$, $w_2 = 1$, $w_3 = 3$, $w_4 = 6$");
}
{
  const u = suite(1, (x) => x / (1 + x), 60);
  pointsSur("2. u(n+1) = u(n)/(1 + u(n))", termes(2), (n) => u[n]);
  vrai("2. u(n) = 1/(n + 1) sur 60 rangs", u.every((x, n) => Math.abs(x - 1 / (n + 1)) < 1e-12));
  vrai("2. courbe orange 1/(x + 1)", courbes(2)[0].pts.every(([x, y]) => Math.abs(y - 1 / (x + 1)) < 6e-4));
  dit(2, "$u_3 = \\dfrac{1}{4}$ et $u_4 = \\dfrac{1}{5}$");
}
{
  const v = suite(1, (x, n) => x + 2 * n + 3, 100);
  const t = tableauDe(3);
  t.en.forEach((n, i) => verif(`3. v(${n})`, t.nombres[i], v[n]));
  vrai("3. v(n) = (n + 1)² sur 100 rangs", v.every((x, n) => x === (n + 1) ** 2));
  verif("3. v99 par la récurrence", v[99], 10000);
  vrai("3. (n+2)² − (n+1)² = 2n + 3", Array.from({ length: 50 }, (_, n) => (n + 2) ** 2 - (n + 1) ** 2 === 2 * n + 3).every(Boolean));
  dit(3, "$v_{99} = 100^2 = 10\\,000$");
}
{
  pointsSur("4. 2^n", termes(4), (n) => 2 ** n);
  vrai("4. droite orange y = x + 1", JSON.stringify(courbes(4)[0].q) === "[0,1,1]");
  vrai("4. 2^n ≥ n + 1 jusqu'à 60, égalité en 0 et 1 seulement", Array.from({ length: 61 }, (_, n) => 2 ** n >= n + 1 && (2 ** n === n + 1) === (n <= 1)).every(Boolean));
}
{
  const u = suite(0, (x) => 0.5 * x + 2, 200);
  pointsSur("5. u(n+1) = 0,5u(n) + 2", termes(5), (n) => u[n]);
  vrai("5. 0 ≤ u(n) ≤ 4 sur 200 rangs", u.every((x) => x >= 0 && x <= 4));
  vrai("5. horizontale 4", dessin("repere", 5)[3] === 4);
  dit(5, "$2 \\leqslant u_{n+1} \\leqslant 4$");
}
{
  const u = (n) => n * n - 6 * n;
  pointsSur("6. n² − 6n", termes(6), u);
  vrai("6. u(n+1) − u(n) = 2n − 5", Array.from({ length: 40 }, (_, n) => u(n + 1) - u(n) === 2 * n - 5).every(Boolean));
  const min = [...Array(20).keys()].reduce((m, n) => (u(n) < u(m) ? n : m), 0);
  vrai(`6. le plus bas au rang ${min}, u = −9`, min === 3 && u(3) === -9);
  dit(6, "croissante à partir du rang $3$");
}
{
  const u = (n) => n * 0.7 ** n;
  pointsSur("7. n × 0,7^n", termes(7), u);
  const q = (n) => u(n + 1) / u(n);
  vrai("7. quotient ≤ 1 ⇔ n ≥ 3 (n ≤ 60)", Array.from({ length: 60 }, (_, i) => i + 1).every((n) => (q(n) <= 1) === (n >= 3)));
  arrondi("7. 7/3 ≈ 2,33", 2.33, 7 / 3);
  arrondi("7. u3 ≈ 1,03", 1.03, u(3));
  dit(7, "$u_3 \\approx 1{,}03$");
}
{
  const f = (x) => (2 * x + 1) / (x + 3);
  pointsSur("8. (2n + 1)/(n + 3)", termes(8), f);
  verif("8. f'(1,7) = 5/(x + 3)²", derivee(f, 1.7), 5 / 4.7 ** 2, 1e-7);
  vrai("8. croissante et < 2 sur 1000 rangs", Array.from({ length: 1000 }, (_, n) => f(n) < f(n + 1) && f(n) < 2).every(Boolean));
  verif("8. 2 − u(n) = 5/(n + 3)", 2 - f(7), 5 / 10, 1e-12);
  vrai("8. courbe bleue = f", courbes(8)[0].pts.every(([x, y]) => Math.abs(y - f(x)) < 6e-4));
  vrai("8. horizontale 2", dessin("repere", 8)[3] === 2);
}

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
{
  const S = (n) => { let s = 0; for (let k = 1; k <= n; k++) s += k * k; return s; };
  const t = tableauDe(9);
  t.en.forEach((n, i) => verif(`9. S(${n}) en comptant les boulets`, t.nombres[i], S(n)));
  vrai("9. formule n(n+1)(2n+1)/6 jusqu'à 200", Array.from({ length: 200 }, (_, i) => i + 1).every((n) => S(n) === (n * (n + 1) * (2 * n + 1)) / 6));
  vrai("9. (n+2)(2n+3) = 2n² + 7n + 6 = n(2n+1) + 6(n+1)", Array.from({ length: 30 }, (_, n) => (n + 2) * (2 * n + 3) === 2 * n * n + 7 * n + 6 && n * (2 * n + 1) + 6 * (n + 1) === 2 * n * n + 7 * n + 6).every(Boolean));
  dit(9, "= 385$ boulets");
}
{
  const t = tableauDe(10);
  t.en.forEach((n, i) => verif(`10. 9^${n} − 2^${n}`, t.nombres[i], 9 ** n - 2 ** n));
  vrai("10. 3^(2n) − 2^n divisible par 7 jusqu'à 80 (entiers exacts)", Array.from({ length: 81 }, (_, n) => (9n ** BigInt(n) - 2n ** BigInt(n)) % 7n === 0n).every(Boolean));
  vrai("10. 721 = 7 × 103 et 77 = 7 × 11", 7 * 103 === 721 && 7 * 11 === 77);
  dit(10, "$7(9k + 2^n)$");
}
{
  const t = tableauDe(11);
  t.en.forEach((n, i) => verif(`11. 4^${n} + 1`, t.nombres[i], 4 ** n + 1));
  vrai("11. 4^n + 1 laisse le reste 2 (n ≤ 80)", Array.from({ length: 81 }, (_, n) => (4n ** BigInt(n) + 1n) % 3n === 2n).every(Boolean));
  vrai("11. 4^n − 1 divisible par 3 (n ≤ 80)", Array.from({ length: 81 }, (_, n) => (4n ** BigInt(n) - 1n) % 3n === 0n).every(Boolean));
  vrai("11. l'hérédité de l'élève : 4(3k − 1) + 1 = 3(4k − 1)", [1, 2, 7, 40].every((k) => 4 * (3 * k - 1) + 1 === 3 * (4 * k - 1)));
  dit(11, "$4^0 + 1 = 2$, $4^1 + 1 = 5$, $4^2 + 1 = 17$");
}
{
  const f = (x) => x - x * x;
  const u = suite(0.5, f, 300);
  pointsSur("12. u(n+1) = u(n) − u(n)², graduation 0,1", termes(12), (n) => 10 * u[n]);
  vrai("12. décroissante dans [0 ; 0,5] sur 300 rangs", u.every((x, i) => x >= 0 && x <= 0.5 && (i === 0 || x <= u[i - 1])));
  verif("12. f(0,5) = 0,25", f(0.5), 0.25);
  vrai("12. f' = 1 − 2x ≥ 0 sur [0 ; 0,5]", [0, 0.1, 0.3, 0.49].every((x) => derivee(f, x) >= 0));
  dit(12, "$0{,}5$, $0{,}25$, $0{,}1875$");
  verif("12. u2 = 0,1875", u[2], 0.1875);
}
{
  const C = suite(1000, (x) => 1.03 * x - 50, 60);
  verif("13. C1 = 980", C[1], 980, 1e-12);
  verif("13. C2 = 959,4", C[2], 959.4, 1e-12);
  arrondi("13. C18 ≈ 531,7", 531.7, C[18], 0.1);
  arrondi("13. C19 ≈ 497,7", 497.7, C[19], 0.1);
  vrai("13. C ≤ 1000 et décroissante (60 rangs)", C.every((x, i) => x <= 1000 && (i === 0 || x < C[i - 1])));
  const premier = C.findIndex((x) => x < 500);
  vrai(`13. premier rang sous 500 : ${premier}`, premier === 19);
  const sortie = executerPython(dessin("programme", 13, "figure")[0], "print(annees())");
  if (sortie === null) console.log("  (Python absent : annees() non exécuté)");
  else vrai(`13. Python : annees() = ${sortie}`, sortie === "19");
  const [entete, lignes] = dessin("trace", 13);
  vrai("13. trace : colonnes n et C", entete.join() === "n,C");
  for (const [n, c] of lignes.filter(([n]) => typeof n === "number")) arrondi(`13. trace C(${n})`, F.nombre(c), C[n], 0.1);
  dit(13, "$C_{18} \\approx 531{,}7$ et $C_{19} \\approx 497{,}7$");
  dit(13, "La fonction renvoie $19$");
}
{
  const u = (n) => { let s = 0; for (let k = n + 1; k <= 2 * n; k++) s += 1 / k; return s; };
  pointsSur("14. somme 1/(n+1) + … + 1/(2n)", termes(14), u);
  vrai("14. croissante, entre 1/2 et n/(n+1) (n ≤ 400)", Array.from({ length: 400 }, (_, i) => i + 1).every((n) => u(n + 1) > u(n) && u(n) >= 0.5 - 1e-12 && u(n) <= n / (n + 1) + 1e-12));
  vrai("14. u(n+1) − u(n) = 1/(2n+1) − 1/(2n+2)", [1, 2, 5, 30].every((n) => Math.abs(u(n + 1) - u(n) - (1 / (2 * n + 1) - 1 / (2 * n + 2))) < 1e-12));
  verif("14. u2 = 7/12", u(2), 7 / 12, 1e-12);
  vrai("14. horizontales 0,5 et 1", JSON.stringify(dessin("repere", 14)[3]) === "[0.5,1]");
}
{
  const f = (x) => 0.5 * x + 1;
  pointsSur("15. u(n) = f(n)", termes(15), f);
  vrai("15. droite bleue = f, grise = y = x", JSON.stringify(courbes(15)[0].q) === "[0,0.5,1]" && JSON.stringify(courbes(15)[1].q) === "[0,1,0]");
  escalier("15. v", courbes(15)[2].pts, f, 0);
  const v = suite(0, f, 100);
  vrai("15. v croissante et ≤ 2 (100 rangs)", v.every((x, i) => x <= 2 && (i === 0 || x >= v[i - 1])));
  dit(15, "$v_0 = 0$, $v_1 = 1$, $v_2 = 1{,}5$, $v_3 = 1{,}75$");
  vrai("15. u(n) > M dès que n > 2(M − 1)", [5, 40, 1000].every((M) => f(2 * (M - 1) + 0.001) > M));
}
{
  const u = suite(150, (x) => 2 * x - 100, 30);
  vrai("16. u(n) = 50 × 2^n + 100 (30 rangs)", u.every((x, n) => x === 50 * 2 ** n + 100));
  vrai("16. la ligne orange : u(n)/50 pour u0 = 150", courbes(16)[0].pts.every(([n, y]) => Math.abs(y - u[n] / 50) < 1e-9));
  const w = suite(90, (x) => 2 * x - 100, 6);
  pointsSur("16. d) u0 = 90, graduation 50", termes(16), (n) => w[n] / 50);
  vrai("16. d) formule admise 100 − 10 × 2^n", w.every((x, n) => x === 100 - 10 * 2 ** n));
  vrai("16. d) 90, 80, 60, 20, −60", w.slice(0, 5).join() === "90,80,60,20,-60");
  verif("16. équilibre 100 (horizontale 2)", dessin("repere", 16)[3] * 50, 2 * 100 - 100);
  dit(16, "$u_1 = 200$, $u_2 = 300$, $u_3 = 500$");
  dit(16, "puis $u_4 = -60$");
}

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
{
  // Hanoï : on JOUE la méthode (appels récursifs qui comptent les coups).
  const jouer = (n, de, vers, appui, coups) => { if (n === 0) return; jouer(n - 1, de, appui, vers, coups); coups.push([de, vers]); jouer(n - 1, appui, vers, de, coups); };
  const h = (n) => { const c = []; jouer(n, 0, 2, 1, c); return c.length; };
  const t = tableauDe(17);
  t.en.forEach((n, i) => verif(`17. h(${n}) en jouant`, t.nombres[i], h(n)));
  vrai("17. h(n) = 2^n − 1 (n ≤ 16)", Array.from({ length: 16 }, (_, i) => i + 1).every((n) => h(n) === 2 ** n - 1));
  const sortie = executerPython(dessin("programme", 17, "figure")[0], "print(coups(10))");
  if (sortie === null) console.log("  (Python absent : coups(10) non exécuté)");
  else vrai(`17. Python : coups(10) = ${sortie}`, sortie === "1023");
  verif("17. 2^20 − 1", 2 ** 20 - 1, 1048575);
  arrondi("17. environ 12 jours", 12, (2 ** 20 - 1) / 86400, 1);
  dit(17, "$2^{20} - 1 = 1\\,048\\,575$ secondes");
  dit(17, "environ $12$ jours");
}
{
  // Les deux villes, simulées avec B : un autre chemin que a(n+1) = 0,7a(n) + 20.
  let [a, b] = [80, 20];
  const A = [a];
  for (let i = 0; i < 200; i++) { [a, b] = [0.9 * a + 0.2 * b, 0.1 * a + 0.8 * b]; A.push(a); vrai(`18. total 100 à l'année ${i + 1}`, Math.abs(a + b - 100) < 1e-9); }
  pointsSur("18. a(n)/10", termes(18), (n) => A[n] / 10);
  vrai("18. décroissante, ≥ 200/3 (200 ans)", A.every((x, i) => x >= 200 / 3 - 1e-9 && (i === 0 || x <= A[i - 1])));
  vrai("18. jamais sous 60", A.every((x) => x > 60));
  verif("18. a(n+1) = 0,7a(n) + 20", A[5], 0.7 * A[4] + 20, 1e-12);
  arrondi("18. horizontale 200/30", dessin("repere", 18)[3], 20 / 3, 0.001);
  dit(18, "$80$, $76$, $73{,}2$");
}
{
  const f = (x) => (3 * x) / (1 + x);
  const [courbe, , orange, vert] = courbes(19);
  vrai("19. courbe bleue = f", courbe.pts.every(([x, y]) => Math.abs(y - f(x)) < 6e-4));
  escalier("19. départ 0,5", orange.pts, f, 0.5);
  escalier("19. départ 4", vert.pts, f, 4);
  const u = suite(0.5, f, 100);
  vrai("19. 0 ≤ u(n) ≤ u(n+1) ≤ 2 (100 rangs)", u.every((x, i) => x >= 0 && x <= 2 && (i === 0 || x >= u[i - 1])));
  const w = suite(4, f, 100);
  vrai("19. d) 2 ≤ u(n+1) ≤ u(n) (100 rangs)", w.every((x, i) => x >= 2 && (i === 0 || x <= w[i - 1])));
  verif("19. f(2) = 2", f(2), 2);
  verif("19. d) u1 = 2,4", w[1], 2.4, 1e-12);
  verif("19. f' = 3/(1 + x)²", derivee(f, 0.8), 3 / 1.8 ** 2, 1e-7);
  arrondi("19. u4 ≈ 1,93", 1.93, u[4]);
  dit(19, "$0{,}5$, $1$, $1{,}5$, $1{,}8$, puis environ $1{,}93$");
}
{
  const a = suite(2000, (x) => x + 60, 40);
  const b = suite(1900, (x) => 1.03 * x, 40);
  pointsSur("20. (b(n) − a(n))/100", termes(20), (n) => (b[n] - a[n]) / 100);
  arrondi("20. b12 ≈ 2709", 2709, b[12], 1);
  arrondi("20. b13 ≈ 2790", 2790, b[13], 1);
  vrai("20. b(n) < a(n) avant 13, > après (n < 40)", a.every((x, n) => (b[n] > x) === (n >= 13)));
  const SA = a.slice(0, 20).reduce((s, x) => s + x, 0);
  const SB = b.slice(0, 20).reduce((s, x) => s + x, 0);
  verif("20. somme A = 51 400", SA, 51400);
  arrondi("20. somme B ≈ 51 054", 51054, SB, 1);
  arrondi("20. écart ≈ 346", 346, SA - SB, 1);
  arrondi("20. × 12 ≈ 4 155", 4155, 12 * (SA - SB), 1);
  dit(20, "$a_{13} = 2\\,780$ et $b_{13} \\approx 2\\,790$");
  dit(20, "$b_{12} \\approx 2\\,709$");
  dit(20, "\\approx 51\\,054$ €");
}

enonceDit(16, "$u_0 = 150$ et $u_{n+1} = 2u_n - 100$");
vrai("les corrigés citent leurs pièges (⚠️ ou ⛔ dans les 20)", F.feuille.corrections.every((t) => /⚠️|⛔/.test(t)));
vrai("les corrigés disent ce qu'on voit (⭐ dans les 20)", F.feuille.corrections.every((t) => /⭐/.test(t)));
F.fin();
