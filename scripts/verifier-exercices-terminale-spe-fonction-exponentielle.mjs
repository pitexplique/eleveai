// Recalcul indépendant de la feuille « Fonction exponentielle » de terminale
// spé (29/09/2026) : lib/fiches-exercices/maths-terminale-fonction-exponentielle.tsx.
//
// ⭐ Les limites sont confirmées par évaluation numérique loin (ou près) ; les
// dérivées du corrigé par dérivation numérique ; les équations par dichotomie
// ou par substitution ; les tableaux de signes et de variations relus et
// recalculés ; les courbes échantillonnées relues point par point ; les deux
// programmes Python EXÉCUTÉS ; la suite des doses itérée par sa récurrence.
// Usage : node scripts/verifier-exercices-terminale-spe-fonction-exponentielle.mjs

import { feuilleTerminale, executerPython, derivee, dichotomie } from "./verifier-exercices-terminale-commun.mjs";

const F = feuilleTerminale({ fichier: "lib/fiches-exercices/maths-terminale-fonction-exponentielle.tsx", notion: "fonction_exponentielle" });
const { dit, enonceDit, verif, vrai, arrondi, termes, courbes, dessin, tableauDe, pointsSur } = F;
const E = Math.exp, L = Math.log;
const grille = (a, b, n = 400) => Array.from({ length: n + 1 }, (_, i) => a + ((b - a) * i) / n);

const surCourbe = (k, i, f, nom, role) => {
  const pts = courbes(k, role)[i].pts;
  const fautes = pts.filter(([x, y]) => Math.abs(y - f(x)) > 6e-4);
  vrai(`${k}. courbe ${nom} (${pts.length} points)`, pts.length > 5 && fautes.length === 0, JSON.stringify(fautes[0]));
};
const signes = (k, bornes, fonctions) => {
  const [, lignes] = dessin("tableauSignes", k);
  const s = (y) => (Math.abs(y) < 1e-9 ? "0" : y > 0 ? "+" : "-");
  const fautes = [];
  lignes.forEach(([label, sg, marques], i) => {
    const f = fonctions[i];
    sg.forEach((x, j) => {
      const a = bornes[j] === -Infinity ? bornes[j + 1] - 1 : bornes[j];
      const b = bornes[j + 1] === Infinity ? bornes[j] + 1 : bornes[j + 1];
      if (s(f((a + b) / 2)) !== x) fautes.push(`${label} colonne ${j + 1}`);
    });
    for (let j = 1; j + 1 < bornes.length; j++) if ((s(f(bornes[j])) === "0" ? "0" : "") !== (marques[j - 1] ?? "")) fautes.push(`${label} sous la borne ${j}`);
  });
  vrai(`${k}. tableau de signes juste case par case (${lignes.length} lignes)`, lignes.length === fonctions.length && fautes.length === 0, fautes.join(" ; "));
};
/** Le tableau de variations de k : valeurs lues (±∞ comprises) contre f aux bornes (ou sa limite). */
const variations = (k, attendu) => {
  const [bornes, valeurs] = dessin("tableauVariations", k);
  const lu = valeurs.map((v) => (v === "+∞" ? Infinity : v === "−∞" ? -Infinity : Number(String(v).replace(",", ".").replace("−", "-"))));
  const ok = lu.every((v, i) => (Number.isFinite(attendu[i]) ? Math.abs(v - attendu[i]) <= 0.005 : v === attendu[i]));
  vrai(`${k}. tableau de variations ${bornes.join(" | ")} : ${valeurs.join(" | ")}`, ok, `attendu ${attendu.join(" | ")}`);
};
const loin = (f, x, lim, eps = 1e-6) => (Number.isFinite(lim) ? Math.abs(f(x) - lim) < eps : Math.sign(f(x)) === Math.sign(lim) && Math.abs(f(x)) > 1e6);

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
{
  vrai("1. a) e^(−2x+1) → 0", loin((x) => E(-2 * x + 1), 50, 0));
  vrai("1. b) e^(x²) → +∞ en −∞", loin((x) => E(x * x), -10, Infinity));
  vrai("1. c) e^(1/x) → +∞ en 0⁺, → 0 en 0⁻", E(1 / 0.01) > 1e40 && E(1 / -0.01) < 1e-40);
  vrai("1. d) e^(1/x) → 1", loin((x) => E(1 / x), 1e8, 1, 1e-7));
  surCourbe(1, 0, (x) => E(1 / x), "e^(1/x) à gauche");
  surCourbe(1, 1, (x) => E(1 / x), "e^(1/x) à droite");
  vrai("1. horizontale y = 1", dessin("repere", 1)[3] === 1);
}
{
  vrai("2. a) eˣ/x³ → +∞", E(100) / 1e6 > 1e30);
  vrai("2. b) x eˣ → 0 en −∞", Math.abs(-50 * E(-50)) < 1e-18);
  vrai("2. c) x² e^(−x) → 0", 1e4 * E(-100) < 1e-38);
  surCourbe(2, 0, (x) => x * E(x), "x eˣ");
  arrondi("2. minimum −1/e ≈ −0,37 en −1", termes(2)[0].y, -E(-1));
  vrai("2. minimum en x = −1", Math.abs(derivee((x) => x * E(x), -1)) < 1e-8 && termes(2)[0].x === -1);
  dit(2, "$-\\dfrac{1}{\\mathrm{e}} \\approx -0{,}37$");
}
{
  const t = tableauDe(3);
  t.en.forEach((x, i) => arrondi(`3. eˣ − x en ${x}`, t.nombres[i], E(x) - x, 0.1));
  vrai("3. b) e^(2x) − 3eˣ + 1 → +∞", E(60) - 3 * E(30) + 1 > 1e20);
  dit(3, "$22\\,016{,}5$ en $x = 10$");
}
{
  const f = (x) => E(x * x - 3 * x), g = (x) => x * E(-2 * x), h = (x) => E(x) / (E(x) + 1);
  vrai("4. f', g', h' par dérivation numérique", grille(-2, 3, 25).every((x) =>
    Math.abs(derivee(f, x) - (2 * x - 3) * f(x)) < 1e-4 * Math.max(1, f(x)) &&
    Math.abs(derivee(g, x) - (1 - 2 * x) * E(-2 * x)) < 1e-4 * Math.max(1, E(-2 * x)) &&
    Math.abs(derivee(h, x) - E(x) / (E(x) + 1) ** 2) < 1e-8));
  signes(4, [-Infinity, 0.5, Infinity], [(x) => 1 - 2 * x, (x) => E(-2 * x), (x) => derivee(g, x)]);
  dit(4, "$f'(x) = (2x - 3)\\,\\mathrm{e}^{x^2 - 3x}$");
}
{
  const u = (n) => E(-0.5 * n);
  pointsSur("5. e^(−0,5n)", termes(5), u);
  verif("5. rapport constant e^(−0,5)", u(7) / u(6), E(-0.5), 1e-12);
  const S = (n) => { let s = 0; for (let k = 0; k <= n; k++) s += u(k); return s; };
  arrondi("5. lim S = 1/(1 − e^(−0,5)) ≈ 2,54", 2.54, S(200));
  arrondi("5. q ≈ 0,61", 0.61, E(-0.5));
  dit(5, "\\approx 2{,}54$");
}
{
  const f = (x) => E(2 * x) + E(x) - 2;
  surCourbe(6, 0, f, "e^(2x) + eˣ − 2");
  verif("6. f(0) = 0", f(0), 0);
  vrai("6. une seule racine : f croissante", grille(-6, 3).every((x) => derivee(f, x) > 0));
  vrai("6. asymptote y = −2", dessin("repere", 6)[3] === -2 && Math.abs(f(-40) + 2) < 1e-12);
  dit(6, "Une seule solution : $x = 0$");
}
{
  signes(7, [-Infinity, -3, 0, Infinity], [(x) => x + 3, (x) => E(x) - 1, (x) => (x + 3) * (E(x) - 1)]);
  vrai("7. solutions de (eˣ − 1)(x + 3) ≤ 0 : [−3 ; 0]", grille(-6, 3, 900).every((x) => ((E(x) - 1) * (x + 3) <= 1e-12) === (x >= -3 - 1e-12 && x <= 1e-12)));
  vrai("7. a) eˣ(x − 2) > 0 ⇔ x > 2", grille(-5, 5, 1000).every((x) => (E(x) * (x - 2) > 0) === (x > 2)));
  dit(7, "$S = [-3 ; 0]$");
}
{
  const t = tableauDe(8);
  t.en.forEach((x, i) => arrondi(`8. (eˣ − 1)/x en ${x}`, t.nombres[i], (E(x) - 1) / x, 0.0001));
  verif("8. (e^(3x) − 1)/x → 3", (E(3e-7) - 1) / 1e-7, 3, 1e-5);
  dit(8, "La limite vaut $3$");
}

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
{
  const f = (x) => (2 - x) * E(x);
  vrai("9. f' = (1 − x)eˣ", grille(-4, 3, 30).every((x) => Math.abs(derivee(f, x) - (1 - x) * E(x)) < 1e-6 * Math.max(1, E(x))));
  variations(9, [f(-60), f(1), -Infinity]);
  vrai("9. f → −∞ en +∞", f(40) < -1e10);
  verif("9. f(2) = 0", f(2), 0);
  dit(9, "$f(1) = \\mathrm{e} \\approx 2{,}72$");
}
{
  const u = (t) => 5 * (1 - E(-t / 2));
  surCourbe(10, 0, u, "u(t)");
  verif("10. u'(0) = 2,5", derivee(u, 0), 2.5, 1e-8);
  vrai("10. tangente y = 2,5t, qui atteint 5 en t = 2", JSON.stringify(courbes(10)[1].q) === "[0,2.5,0]" && termes(10)[0].x === 2 && termes(10)[0].y === 5);
  const t99 = dichotomie((t) => u(t) - 4.95, 0, 30);
  arrondi("10. 99 % en 9,21 ms", 9.21, t99);
  verif("10. = 2 ln 100", t99, 2 * L(100), 1e-9);
  dit(10, "= 2\\ln 100 \\approx 9{,}21$ ms");
}
{
  const lignes = dessin("programme", 11, "figure")[0];
  const sortie = executerPython(lignes, "print(seuil())");
  if (sortie === null) console.log("  (Python absent : seuil() non exécuté)");
  else vrai(`11. Python : seuil() = ${sortie}`, sortie === "151");
  let n = 2;
  while (E(0.1 * n) <= n ** 3) n++;
  vrai("11. premier n ≥ 2 où B est plus lent : 151", n === 151);
  arrondi("11. e^10 ≈ 22 026", 22026, E(10), 1);
  arrondi("11. rapport ≈ 60 en n = 200", 60, E(20) / 200 ** 3, 2);
  vrai("11. rapport → +∞ (n = 1000)", E(100) / 1e9 > 1e30);
  dit(11, "Elle renvoie $151$");
  dit(11, "$\\mathrm{e}^{10} \\approx 22\\,026$ µs");
}
{
  const f = (x) => E(x) / x;
  vrai("12. f' = (x − 1)eˣ/x²", grille(0.2, 4, 30).every((x) => Math.abs(derivee(f, x) - ((x - 1) * E(x)) / (x * x)) < 1e-6 * Math.max(1, f(x))));
  variations(12, [Infinity, f(1), Infinity]);
  vrai("12. f → +∞ en 0⁺ et en +∞", f(1e-9) > 1e8 && f(60) > 1e20);
  vrai("12. eˣ ≥ e x pour x > 0", grille(0.01, 6).every((x) => E(x) >= Math.E * x - 1e-12));
}
{
  const f = (x) => E(x) + E(-x);
  surCourbe(13, 0, f, "eˣ + e^(−x)");
  verif("13. f(ln 2) = 5/2", f(L(2)), 2.5, 1e-12);
  verif("13. f(−ln 2) = 5/2", f(-L(2)), 2.5, 1e-12);
  vrai("13. points rouges en ±0,69 sur y = 2,5", termes(13).every((p) => Math.abs(Math.abs(p.x) - L(2)) <= 0.005 && p.y === 2.5));
  vrai("13. seulement deux solutions (f paire, croissante sur [0 ; +∞[)", grille(0.001, 5).every((x) => derivee(f, x) > 0));
  dit(13, "$S = \\{-\\ln 2 ; \\ln 2\\}$");
}
{
  const N = (t) => 1000 * E(-0.05 * t);
  surCourbe(14, 0, (x) => N(10 * x) / 100, "N en (10 j ; 100 milliards)");
  const T = dichotomie((t) => N(t) - 500, 0, 100);
  verif("14. demi-vie = 20 ln 2", T, 20 * L(2), 1e-9);
  arrondi("14. T ≈ 13,9 jours", 13.9, T, 0.1);
  vrai("14. N(t + T) = N(t)/2 pour tout t", grille(0, 100, 20).every((t) => Math.abs(N(t + T) - N(t) / 2) < 1e-9));
  arrondi("14. N(60) ≈ 49,8", 49.8, N(60), 0.1);
  arrondi("14. point rouge en 1,39 graduation", termes(14)[0].x, T / 10, 0.01);
  vrai("14. N'(t) = −50 e^(−0,05t)", Math.abs(derivee(N, 7) + 50 * E(-0.35)) < 1e-6);
  dit(14, "$T = 20\\ln 2 \\approx 13{,}9$ jours");
}
{
  const g = (x) => E(x) - (x * x) / 2;
  vrai("15. g croissante et ≥ 1 sur [0 ; 20]", grille(0, 20).every((x) => derivee(g, x) > 0 && g(x) >= 1 - 1e-12));
  vrai("15. eˣ/x ≥ x/2", grille(0.01, 30).every((x) => E(x) / x > x / 2));
  surCourbe(15, 0, E, "exp");
  vrai("15. parabole orange y = x²/2", JSON.stringify(courbes(15)[1].q) === "[0.5,0,0]");
}
{
  const a = dichotomie((a) => E(a) * (1 - a), 0, 3);
  verif("16. la tangente passe par O pour a = 1", a, 1, 1e-9);
  vrai("16. h(x) = eˣ − e x ≥ 0", grille(-3, 4).every((x) => E(x) - Math.E * x >= -1e-12));
  arrondi("16. pente orange = e", courbes(16)[1].q[1], Math.E, 0.001);
  surCourbe(16, 0, E, "exp");
  dit(16, "soit $y = \\mathrm{e}\\,x$");
}

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
{
  const O = (x) => E(0.5 * x) - 1, D = (x) => 5 * E(-0.5 * x);
  surCourbe(17, 0, O, "offre");
  surCourbe(17, 1, D, "demande");
  const x = dichotomie((x) => O(x) - D(x), 0, 5);
  arrondi("17. prix d'équilibre ≈ 2,05 €", 2.05, x);
  arrondi("17. X = e^(0,5x) ≈ 2,79 = (1 + √21)/2", 2.79, E(0.5 * x));
  verif("17. X = (1 + √21)/2", E(0.5 * x), (1 + Math.sqrt(21)) / 2, 1e-9);
  arrondi("17. quantité ≈ 1,79 millier", 1.79, D(x));
  const xd = dichotomie((x) => D(x) - 1, 0, 10);
  arrondi("17. demande < 1 000 au-delà de 3,22 €", 3.22, xd);
  verif("17. = 2 ln 5", xd, 2 * L(5), 1e-9);
  vrai("17. point rouge ≈ équilibre", Math.abs(termes(17)[0].x - x) <= 0.005 && Math.abs(termes(17)[0].y - D(x)) <= 0.005);
  dit(17, "$x = 2\\ln X \\approx 2{,}05$ €");
  dit(17, "$x > 2\\ln 5 \\approx 3{,}22$ €");
}
{
  const C = (t) => 5 * t * E(-0.4 * t);
  surCourbe(18, 0, C, "C(t)");
  vrai("18. C' = 5(1 − 0,4t)e^(−0,4t)", grille(0, 12, 30).every((t) => Math.abs(derivee(C, t) - 5 * (1 - 0.4 * t) * E(-0.4 * t)) < 1e-7));
  arrondi("18. max 12,5/e ≈ 4,60", 4.6, C(2.5));
  vrai("18. max en 2,5", grille(0, 12).every((t) => C(t) <= C(2.5) + 1e-12));
  arrondi("18. t1 ≈ 0,84", 0.84, dichotomie((t) => C(t) - 3, 0, 2.5));
  arrondi("18. t2 ≈ 5,57", 5.57, dichotomie((t) => C(t) - 3, 2.5, 20));
  verif("18. C(100) ≈ 0", C(100), 0, 1e-12);
  const lignes = dessin("programme", 18, "figure")[0];
  const sortie = executerPython(lignes, "print(attente())");
  if (sortie === null) console.log("  (Python absent : attente() non exécuté)");
  else vrai(`18. Python : attente() = ${sortie}`, sortie === "9.8");
  vrai("18. C passe sous 1 entre 9,7 et 9,8", C(9.7) >= 1 && C(9.8) < 1);
  vrai("18. horizontale 3, pic (2,5 ; 4,6)", dessin("repere", 18)[3] === 3 && termes(18)[0].x === 2.5 && Math.abs(termes(18)[0].y - C(2.5)) <= 0.005);
  dit(18, "$C(2{,}5) = 12{,}5\\,\\mathrm{e}^{-1} \\approx 4{,}60$ mg/L");
  dit(18, "entre $0{,}84$ h et $5{,}57$ h");
  dit(18, "Elle renvoie $9{,}8$");
}
{
  const u = [2];
  while (u.length < 60) u.push(E(-1) * u[u.length - 1] + 2);
  pointsSur("19. doses (par la récurrence)", termes(19), (n) => u[n]);
  const ell = 2 / (1 - E(-1));
  vrai("19. formule u(n) = ℓ − (ℓ − 2)e^(−n)", u.every((x, n) => Math.abs(x - (ell - (ell - 2) * E(-n))) < 1e-12));
  verif("19. ℓ/(ℓ − 2) = e", ell / (ell - 2), Math.E, 1e-12);
  arrondi("19. ℓ ≈ 3,16", 3.16, ell);
  arrondi("19. horizontale ≈ ℓ", dessin("repere", 19)[3], ell, 0.001);
  const n99 = u.findIndex((x) => x >= 0.99 * ell);
  vrai(`19. premier rang à 99 % : ${n99}`, n99 === 4);
  arrondi("19. ln 100 − 1 ≈ 3,6", 3.6, L(100) - 1, 0.1);
  dit(19, "Donc $n = 4$ : à partir de la cinquième dose");
}
{
  const H = (t) => 10 * E(-2 * E(-0.5 * t));
  surCourbe(20, 0, H, "H(t)");
  arrondi("20. H(0) ≈ 1,35", 1.35, H(0));
  verif("20. H → 10", H(80), 10, 1e-12);
  vrai("20. H' de l'énoncé", grille(0, 12, 30).every((t) => Math.abs(derivee(H, t) - 10 * E(-0.5 * t) * E(-2 * E(-0.5 * t))) < 1e-7));
  const t90 = dichotomie((t) => H(t) - 9, 0, 20);
  arrondi("20. 90 % en 5,89 ans", 5.89, t90);
  arrondi("20. −ln(0,9)/2 ≈ 0,0527", 0.0527, -L(0.9) / 2, 0.0001);
  vrai("20. point rouge (0 ; 1,35), horizontale 10", termes(20)[0].x === 0 && Math.abs(termes(20)[0].y - H(0)) <= 0.005 && dessin("repere", 20)[3] === 10);
  dit(20, "$t \\geqslant 5{,}89$");
}

enonceDit(19, "$u_0 = 2$ et $u_{n+1} = \\mathrm{e}^{-1}u_n + 2$");
vrai("les corrigés citent leurs pièges (⚠️ ou ⛔ dans les 20)", F.feuille.corrections.every((t) => /⚠️|⛔/.test(t)));
F.fin();
