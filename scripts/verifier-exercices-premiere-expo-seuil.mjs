// Recalcul indépendant de la feuille « Problème de seuil : croissance
// exponentielle » (1re sans spé, BOP1VE, 28/09/2026) :
// lib/fiches-exercices/maths-premiere-expo-seuil.tsx
//
// Chaque seuil annoncé est retrouvé en PARCOURANT les rangs un à un (le
// premier n qui franchit), chaque demi-vie par divisions successives par 2,
// chaque lecture graphique par l'abscisse où la courbe croise l'horizontale
// (dichotomie) ; chaque nombre relu à sa place dans le corrigé ; chaque
// tableau, chaque courbe et chaque horizontale relus dans le source. Plus le
// socle commun et les règles de rendu
// (scripts/verifier-exercices-premiere-expo-commun.mjs).
// Usage : node scripts/verifier-exercices-premiere-expo-seuil.mjs

import { ouvrir } from "./verifier-exercices-premiere-expo-commun.mjs";

const F = ouvrir("lib/fiches-exercices/maths-premiere-expo-seuil.tsx", "expo_seuil");
const { res, dit, vrai, vaut, dessin, courbeSuit, pointsSuivent } = F;

const geo = (u0, q, n) => {
  let x = u0;
  for (let i = 0; i < n; i++) x *= q;
  return x;
};
/** Le premier rang n ≥ 0 où cond(n) est vraie. */
const premier = (cond, max = 5000) => {
  for (let n = 0; n <= max; n++) if (cond(n)) return n;
  return -1;
};
/** L'abscisse où f monotone atteint k, par dichotomie. */
const atteint = (f, k, a = 0, b = 100) => {
  const monte = f(b) > f(a);
  for (let i = 0; i < 200; i++) {
    const m = (a + b) / 2;
    if ((f(m) < k) === monte) a = m;
    else b = m;
  }
  return a;
};
const ligne = (k, role) => dessin(k, role).args[1].slice(1);
const horiz = (k, role) => dessin(k, role).args[3];
const nombre = (s) => Number(String(s).replace(/\s/g, "").replace(",", "."));

try {
  /* ── ★ ── */
  vaut("1. premier rang au-dessus de 1 000", premier((n) => geo(100, 2, n) > 1000), 4);
  res(1, geo(100, 2, 3), "800");
  res(1, geo(100, 2, 4), "1\\,600");
  ["500", "400", "320", "256", "204{,}8", "163{,}84"].forEach((t, n) => res(2, geo(500, 0.8, n), t));
  vaut("2. premier rang sous 200", premier((n) => geo(500, 0.8, n) < 200), 5);
  {
    const l = ligne(3, "figure");
    l.forEach((x, n) => vaut(`3. tableau n = ${n}`, x, Math.round(geo(1000, 1.06, n) * 100) / 100));
    vaut("3. premier au-dessus de 1 500", premier((n) => geo(1000, 1.06, n) > 1500), 7);
    res(3, l[6], "1\\,418{,}52");
    res(3, l[7], "1\\,503{,}63");
  }
  {
    pointsSuivent(4, "figure", (n) => geo(2, 1.5, n), "ceux de 2 × 1,5ⁿ (centaines)");
    vaut("4. la ligne des 900", horiz(4, "figure"), 9);
    vaut("4. premier point au-dessus", premier((n) => geo(2, 1.5, n) > 9), 4);
    res(4, geo(2, 1.5, 3), "6{,}75");
  }
  res(5, 30 / 10, "3");
  res(5, geo(80, 0.5, 3), "10");
  res(6, geo(5000, 2, 60 / 20), "40\\,000");
  res(6, 5000 * 3, "15\\,000");
  res(7, geo(1, 0.5, 4), "0{,}0625");
  res(7, geo(100, 0.5, 4), "6{,}25");
  res(8, 1.05 ** 14, "1{,}980");
  res(8, 1.05 ** 15, "2{,}079");
  vaut("8. premier n tel que 1,05ⁿ > 2", premier((n) => geo(1, 1.05, n) > 2), 15);

  /* ── ★★ ── */
  {
    const u = (n) => geo(2000, 1.03, n);
    res(9, u(7), "2\\,459{,}75");
    res(9, u(8), "2\\,533{,}54");
    vaut("9. premier au-dessus de 2 500", premier((n) => u(n) > 2500), 8);
    res(9, 500 / 60, "8{,}3");
    vaut("9. intérêts simples : 9 ans", premier((n) => 2000 + 60 * n > 2500), 9);
    const l = ligne(9, "schema");
    [6, 7, 8].forEach((n, i) => vaut(`9. tableau année ${n}`, l[i], Math.round(u(n) * 100) / 100));
  }
  {
    [200, 100, 50].forEach((x, i) => res(10, geo(400, 0.5, i + 1), String(x)));
    vaut("10. premier nombre de demi-vies sous 40", premier((k) => geo(400, 0.5, k) < 40), 4);
    res(10, 4 * 8, "32");
    vaut("10. premier k tel que 2^k > 10", premier((k) => 2 ** k > 10), 4);
    pointsSuivent(10, "schema", (k) => geo(4, 0.5, k), "une demi-vie par point (centaines)");
    vaut("10. la ligne des 40 unités", horiz(10, "schema"), 0.4);
  }
  {
    const p = (n) => geo(8, 1.01, n);
    res(11, p(22), "9{,}96");
    res(11, p(23), "10{,}06");
    vaut("11. dépasse 10 milliards à n = 23", premier((n) => p(n) > 10), 23);
    res(11, 1.01 ** 69, "1{,}987");
    res(11, 1.01 ** 70, "2{,}007");
    vaut("11. doublement à n = 70", premier((n) => geo(1, 1.01, n) > 2), 70);
    const l = ligne(11, "schema");
    vaut("11. tableau 2044", l[0], Math.round(p(22) * 100) / 100);
    vaut("11. tableau 2045", l[1], Math.round(p(23) * 100) / 100);
  }
  {
    const P = (n) => geo(200, 1.02, n);
    const l = ligne(12, "figure");
    [10, 11, 12, 13].forEach((n, i) => vaut(`12. tableau mois ${n}`, l[i], Math.round(P(n) * 100) / 100));
    res(12, P(10), "243{,}80");
    vaut("12. premier mois au-dessus de 250", premier((n) => P(n) > 250), 12);
    res(12, 1.02 ** 12, "1{,}268");
    res(12, (1.02 ** 12 - 1) * 100, "26{,}8");
  }
  {
    const P = (x) => 5 * 0.9 ** x;
    courbeSuit(13, "figure", 0, P, "celle de 5 × 0,9ˣ");
    vaut("13. la ligne critique", horiz(13, "figure"), 2.5);
    res(13, P(6), "2{,}66");
    res(13, P(7), "2{,}39");
    vaut("13. sous le seuil à 7 ans", premier((n) => P(n) < 2.5), 7);
    res(13, atteint(P, 2.5), "6{,}6");
    vaut("13. deux demi-vies ≈ 13 ans : environ 125 individus", Math.round(P(13) * 100 / 10) * 10, 130);
    vrai("13. le quart de 500 = 125, P(13) ≈ 127", Math.abs(P(13) * 100 - 125) < 5);
  }
  {
    res(14, geo(1000, 2, 3), "8\\,000");
    vaut("14. premier doublement au-dessus de 1 000", premier((k) => 2 ** k >= 1000), 10);
    res(14, 2 ** 9, "512");
    res(14, 10 * 20, "200");
    const l = ligne(14, "schema").map(nombre);
    [0, 3, 6, 10].forEach((k, i) => vaut(`14. tableau, ${k} doublements`, l[i], 1000 * 2 ** k));
  }
  {
    const l = ligne(15, "figure");
    [19, 20, 21, 22].forEach((n, i) => vaut(`15. tableau ${n} m`, l[i], Math.round(geo(100, 0.8, n) * 100) / 100));
    res(15, geo(100, 0.8, 20), "1{,}15");
    res(15, geo(100, 0.8, 21), "0{,}92");
    vaut("15. sous 1 % à 21 m", premier((n) => geo(100, 0.8, n) < 1), 21);
    res(15, geo(100, 0.7, 12), "1{,}38");
    res(15, geo(100, 0.7, 13), "0{,}97");
    vaut("15. eau trouble : 13 m", premier((n) => geo(100, 0.7, n) < 1), 13);
  }
  {
    const Q = (x) => 100 * 0.7 ** x;
    courbeSuit(16, "figure", 0, (x) => Q(x) / 10, "celle de la quantité en dizaines de mg");
    vaut("16. la ligne des 20 mg", horiz(16, "figure"), 2);
    res(16, atteint(Q, 20), "4{,}5");
    res(16, geo(100, 0.7, 4), "24{,}01");
    res(16, geo(100, 0.7, 5), "16{,}81");
    res(16, 100 - Q(1), "30");
    res(16, Q(1) - Q(2), "21");
    res(16, Q(2) - Q(3), "14{,}7");
  }

  /* ── ★★★ ── */
  {
    res(17, 2 * 5730, "11\\,460");
    res(17, 3 * 5730, "17\\,190");
    vaut("17. 25 % = 2 demi-vies", premier((k) => geo(100, 0.5, k) <= 25), 2);
    vaut("17. 12,5 % = 3 demi-vies", premier((k) => geo(100, 0.5, k) <= 12.5), 3);
    res(17, 100 / 64, "1{,}5625");
    res(17, 100 / 128, "0{,}78");
    vaut("17. sous 1 % : 7 demi-vies", premier((k) => geo(100, 0.5, k) < 1), 7);
    res(17, 7 * 5730, "40\\,110");
    vrai("17. plus de 11 000 demi-vies", 66e6 / 5730 > 11000 && F.c(17).includes("plus de $11\\,000$ demi-vies"));
    const l = ligne(17, "schema");
    [0, 1, 2, 3, 7].forEach((k, i) => vaut(`17. tableau ${k} demi-vies`, l[i], Math.round(geo(100, 0.5, k) * 100) / 100));
  }
  {
    const p = (n) => geo(800, 0.97, n);
    courbeSuit(18, "figure", 0, (t) => 8 * 0.97 ** (10 * t), "la population en centaines, par décennies");
    vrai("18. les lignes de 400 et 200 habitants", JSON.stringify(horiz(18, "figure")) === "[4,2]");
    const t = atteint((u) => 8 * 0.97 ** (10 * u), 4);
    vrai(`18. sous 400 entre les abscisses 2 et 2,5 (t ≈ ${t.toFixed(2)})`, t > 2 && t < 2.5);
    res(18, p(22), "409{,}3");
    res(18, p(23), "397{,}0");
    vaut("18. sous 400 en 1973", 1950 + premier((n) => p(n) < 400), 1973);
    res(18, p(45), "203{,}2");
    res(18, p(46), "197{,}1");
    vaut("18. sous 200 en 1996", 1950 + premier((n) => p(n) < 200), 1996);
  }
  {
    res(19, 1.04 ** 17, "1{,}948");
    res(19, 1.04 ** 18, "2{,}026");
    vaut("19. doublement à 4 % : 18 ans", premier((n) => geo(1, 1.04, n) > 2), 18);
    res(19, 1.06 ** 11, "1{,}898");
    res(19, 1.06 ** 12, "2{,}012");
    vaut("19. doublement à 6 % : 12 ans", premier((n) => geo(1, 1.06, n) > 2), 12);
    res(19, 72 / 4, "18");
    res(19, 72 / 6, "12");
    res(19, 1.04 ** 36, "4{,}10");
    res(19, 1.04 ** 35, "3{,}95");
    vaut("19. × 4 à 36 ans", premier((n) => geo(1, 1.04, n) > 4), 36);
    const l = ligne(19, "schema");
    [16, 17, 18].forEach((n, i) => vaut(`19. tableau ${n} ans`, l[i], Math.round(1.04 ** n * 1000) / 1000));
  }
  {
    const s = (n) => geo(10, 0.98, n);
    courbeSuit(20, "figure", 0, (t) => 10 * 0.98 ** (10 * t), "la surface en km², par décennies");
    vaut("20. la ligne de la moitié", horiz(20, "figure"), 5);
    const t = atteint((u) => 10 * 0.98 ** (10 * u), 5);
    vrai(`20. la moitié entre les abscisses 3 et 3,5 (t ≈ ${t.toFixed(2)})`, t > 3 && t < 3.5);
    res(20, s(34), "5{,}03");
    res(20, s(35), "4{,}93");
    vaut("20. sous la moitié en 2060", 2025 + premier((n) => s(n) < 5), 2060);
    res(20, s(70), "2{,}43");
    res(20, 10 / 4, "2{,}5");
  }
  /* ── Les dessins ajoutés le 28/09 (« des canvas qui aident ») : données recalculées ── */
  {
    const _d = (k) => dessin(k, "schema").args;
    const _v = (k) => _d(k)[1].map((x) => x.value);
    const _l = (k) => _d(k)[1].slice(1).map((x) => (typeof x === "number" ? x : Number(String(x).replace(/\s/g, "").replace(",", "."))));
    const _proche = (a, b, t) => a.length === b.length && a.every((x, i) => Math.abs(x - b[i]) <= t);
    const _suite = (u0, q, n) => Array.from({ length: n }, (_, i) => u0 * q ** i);
    const _coef = (k) => _d(k)[1].slice(2).map((s) => Number(s.replace("× ", "").replace(",", ".")));
    const _termes = (k) => _d(k)[0].slice(1).map((s) => Number(s.replace(/\s/g, "").replace(",", ".")));

    vrai("1. barres 100 × 2ⁿ", _proche(_v(1), _suite(100, 2, 5), 0));
    vaut("1. barre en évidence = premier rang au-dessus de 1 000", _d(1)[2], premier((n) => 100 * 2 ** n > 1000));
    pointsSuivent(2, "schema", (n) => 5 * 0.8 ** n, "500 × 0,8ⁿ en centaines");
    vaut("2. la ligne des 200", _d(2)[3], 2);
    vrai("5. barres 80 / 2ᵏ", _proche(_v(5), _suite(80, 0.5, 4), 0));
    vaut("5. barre en évidence : 30 ans", _d(5)[2], 3);
    vrai("6. barres 5 000 × 2ᵏ", _proche(_v(6), _suite(5000, 2, 4), 0));
    vaut("6. barre en évidence : 60 ans", _d(6)[2], 3);
    vrai("7. barres 100 / 2ᵏ", _proche(_v(7), _suite(100, 0.5, 5), 0));
    vaut("7. barre en évidence : 4 demi-vies", _d(7)[2], 4);
    vrai("8. bâtons 1,05ⁿ", _proche(_v(8), [13, 14, 15, 16].map((n) => 1.05 ** n), 0.0006));
    vaut("8. bâton en évidence : n = 15", [13, 14, 15, 16][_d(8)[2]], premier((n) => 1.05 ** n > 2));
  }
} catch (err) {
  vrai("le recalcul s'exécute", false, String(err?.stack ?? err));
}

F.fin("Problème de seuil : croissance exponentielle (1re)");
