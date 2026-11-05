// Recalcul indépendant des feuilles STMG de la famille « exponentielle »
// (05/11/2026) : lib/fiches-exercices/maths-stmg-expo-*.tsx.
// Usage : npx --yes tsx@4 scripts/verifier-exercices-stmg-exponentielle.mjs
import { feuille, fin } from "./verifier-exercices-stmg-lot-commun.mjs";

const sens = (k, a) => (a === 1 ? "constante" : k > 0 === a > 1 ? "croissante" : "décroissante");

/* ───────────── expo-definition ───────────── */
{
  const f = await feuille("expo-definition");
  // ★
  f.juste(1, null, "B"); f.faux(1, null, "A");
  f.juste(2, "a)", "oui"); f.juste(2, "b)", "non"); f.juste(2, "c)", "oui"); f.juste(2, "d)", "non");
  f.juste(3, null, 2 ** 5); f.faux(3, null, 2 * 5); f.faux(3, null, "2^5");
  f.juste(4, "a)", 0.5 ** 3); f.juste(4, "b)", 0.5 ** 0); f.faux(4, "a)", 0.5 * 3); f.faux(4, "b)", 0); f.faux(4, "a)", "0,5^3"); f.faux(4, "b)", "0,5^0");
  f.juste(5, null, Math.log(81) / Math.log(3)); f.faux(5, null, 81 / 3);
  f.juste(6, null, "0,125"); f.vrai("def ex.6", 2 ** -3 === 0.125); f.faux(6, null, -8);
  f.juste(7, "a)", "0,01"); f.vrai("def ex.7 a)", Math.abs(10 ** -2 - 0.01) < 1e-12); f.juste(7, "b)", "0,2"); f.vrai("def ex.7 b)", 5 ** -1 === 0.2); f.faux(7, "a)", -100);
  f.juste(8, "a)", 3 * 2 ** 2); f.juste(8, "b)", 3 * 2 ** 2); f.juste(8, "c)", "oui"); f.faux(8, "a)", (3 * 2) ** 2); f.faux(8, "a)", "3 * 2^2");
  // ★★
  f.juste(9, "a)", "500 * 2^x"); f.juste(9, "b)", 500 * 2 ** 3); f.faux(9, "a)", "500 + 2x"); f.juste(9, "a)", "f(x) = 500 × 2^x");
  f.juste(10, "a)", 1 - 5 / 100); f.juste(10, "b)", "800 * (1 - 0.05)^x"); f.juste(10, "c)", 800 * 0.95 ** 3); f.faux(10, "a)", 0.05); f.faux(10, "a)", 1.05);
  f.juste(11, "a)", 1.5 ** 3); f.juste(11, "b)", 1.5 ** 2.5); f.juste(11, "c)", "non"); f.faux(11, "b)", (1.5 ** 2 + 1.5 ** 3) / 2);
  f.juste(12, "a)", "1,5"); f.vrai("def ex.12 a)", 18 / 12 === 1.5); f.juste(12, "b)", 2000 * 1.1 ** (18 / 12)); f.faux(12, "b)", 2000 * 1.15);
  f.juste(13, "a)", 8000 / 1.25 ** 2); f.juste(13, "b)", "B"); f.faux(13, "a)", 8000 * 1.25 ** 2);
  f.juste(14, "a)", 0.5 ** 2 * 100); f.juste(14, "b)", 0.5 ** 3 * 100); f.juste(14, "c)", Math.log(0.0625) / Math.log(0.5)); f.juste(14, "d)", 4 * 5730); f.faux(14, "d)", 4); f.faux(14, "a)", 0.25); f.faux(14, "b)", 0.125);
  f.juste(15, "a)", "0,01"); f.juste(15, "b)", "0,0001"); f.vrai("def ex.15", Math.abs(10 ** -4 - 0.0001) < 1e-12); f.juste(15, "c)", -Math.log10(0.001)); f.faux(15, "a)", -100);
  f.juste(16, "a)", "B"); f.juste(16, "b)", "1000 * 1.2^x"); f.juste(16, "c)", 1000 * 1.2 ** 6); f.juste(16, "d)", 1000 + 6 * 200); f.faux(16, "b)", "1000 + 200x");
  // ★★★
  f.juste(17, "a)", "400 * 1.03^x"); f.juste(17, "b)", 400 * 1.03 ** 10); f.juste(17, "c)", 400 * 1.03 ** 2.5); f.juste(17, "d)", 400 * 1.03 ** -5); f.faux(17, "d)", 400 * 0.97 ** 5);
  f.juste(18, "a)", 1 - 20 / 100); f.juste(18, "b)", "200 * 0.8^x"); f.juste(18, "c)", 200 * 0.8 ** 2.5); f.juste(18, "d)", 200 * 0.8 ** 6 > 50 ? "oui" : "non"); f.juste(18, "e)", 200 * 0.8 ** -1); f.faux(18, "e)", 200 * 1.2);
  f.juste(19, "a)", "C"); f.juste(19, "b)", 150 * 1.2 ** -2); f.juste(19, "c)", 150 * 1.2 ** -2 < 0 ? "vrai" : "faux"); f.juste(19, "d)", 150 * 1.2 ** (6 / 12)); f.faux(19, "d)", 150 * 1.2 ** 6);
  f.juste(20, "a)", 10 * 1.1 ** 4); f.juste(20, "b)", "10 * 1.1^x"); f.juste(20, "c)", 10 * 1.1 ** 4.5); f.juste(20, "d)", "non"); f.faux(20, "b)", "1.1 * 10^x");
  f.tout();
}

/* ───────────── expo-variations ───────────── */
{
  const f = await feuille("expo-variations");
  // ★
  f.juste(1, "a)", sens(1, 1.05)); f.juste(1, "b)", sens(1, 0.9)); f.juste(1, "c)", sens(1, 1)); f.faux(1, "b)", "croissante");
  f.juste(2, null, ["A", "B", "C", "D"][[1.02, 0.98, 2.5, 1.3].findIndex((a) => a < 1)]); f.faux(2, null, "A");
  f.juste(3, null, "B"); f.faux(3, null, "C");
  f.juste(4, "a)", 2.5 ** 0); f.juste(4, "b)", 2.5 ** 0 === 0 ? "oui" : "non"); f.faux(4, "a)", 0); f.faux(4, "a)", "2,5^0");
  f.juste(5, "a)", sens(3, 1.5)); f.juste(5, "b)", sens(-2, 1.5)); f.faux(5, "b)", "croissante");
  f.juste(6, null, 400 * 1.08 ** 0); f.faux(6, null, 400 * 1.08); f.faux(6, null, "400 * 1,08^0");
  f.juste(7, "a)", 0.8); f.juste(7, "b)", sens(50, 0.8)); f.juste(7, "c)", sens(50, 0.8)); f.faux(7, "a)", 50);
  f.juste(8, null, "120 * 1.15^x"); f.faux(8, null, "1.15 * 120^x");
  // ★★
  f.juste(9, "a)", sens(30, 0.97)); f.juste(9, "b)", 30 * 0.97 ** 0); f.juste(9, "c)", (1 - 0.97) * 100); f.faux(9, "c)", 97);
  f.vrai("var ex.9 tableau", Math.abs(30 * 0.97 ** 10 - 22.12) < 0.005);
  const rayons = { A: [200, 1.04], B: [150, 0.85], C: [90, 1.2], D: [300, 0.99] };
  f.juste(10, "a)", Object.keys(rayons).filter((c) => rayons[c][1] < 1)); f.faux(10, "a)", ["A", "C"]);
  const plusGrand = Object.keys(rayons).sort((u, v) => rayons[v][0] - rayons[u][0])[0];
  f.juste(10, "b)", plusGrand); f.juste(10, "c)", rayons[plusGrand][0]);
  f.juste(11, "a)", "A"); f.juste(11, "b)", `(0 ; ${1.5 ** 0})`); f.vrai("var ex.11", 0.6 ** 0 === 1); f.juste(11, "c)", "non"); f.faux(11, "b)", "(1 ; 0)");
  f.juste(12, "a)", -5 * 1.2 ** 0); f.juste(12, "b)", sens(-5, 1.2)); f.juste(12, "c)", -5 * 1.2 ** 3); f.juste(12, "d)", -5 * 1.2 ** 3 < -5 ? "oui" : "non"); f.faux(12, "b)", "croissante");
  f.vrai("var ex.12 tableau", Math.abs(-5 * 1.2 ** 5 + 12.44) < 0.005);
  f.juste(13, "a)", -16 * 0.5 ** 0); f.juste(13, "b)", sens(-16, 0.5)); f.juste(13, "c)", -16 * 0.5 ** 3); f.faux(13, "b)", "décroissante");
  f.vrai("var ex.13 tableau", -16 * 0.5 ** 4 === -1);
  f.juste(14, "a)", 1.1); f.juste(14, "b)", sens(200, 1.1)); f.juste(14, "c)", "200 * 1.1^x"); f.juste(14, "d)", 200 * 1.1 ** 3); f.faux(14, "d)", (200 * 1.1) ** 3);
  f.juste(15, "a)", 2); f.juste(15, "b)", 2 * 1.5 ** 2); f.juste(15, "c)", sens(2, 1.5)); f.juste(15, "d)", "A"); f.faux(15, "a)", 1);
  f.juste(16, "a)", 18000 * 0.85 ** 0); f.juste(16, "b)", sens(18000, 0.85)); f.juste(16, "c)", 18000 * 0.85); f.juste(16, "d)", 18000 * 0.85 ** 4); f.faux(16, "a)", 18000 * 0.85);
  // ★★★
  f.juste(17, "a)", sens(1000, 1.08)); f.juste(17, "b)", sens(5000, 0.95)); f.juste(17, "c)", 1000 * 1.08 ** 10); f.juste(17, "d)", 5000 * 0.95 ** 10);
  f.juste(17, "e)", 1000 * 1.08 ** 15 > 5000 * 0.95 ** 15 ? "vélo" : "voiture"); f.juste(17, "e)", "le vélo"); f.faux(17, "e)", "voiture");
  f.vrai("var ex.17 voiture devant à 10 ans", 5000 * 0.95 ** 10 > 1000 * 1.08 ** 10);
  f.dit(17, "3\\,172"); f.dit(17, "2\\,316"); f.vrai("var ex.17 f(15), g(15)", Math.round(1000 * 1.08 ** 15) === 3172 && Math.round(5000 * 0.95 ** 15) === 2316);
  f.juste(18, "a)", 2 ** 3); f.juste(18, "b)", "A"); f.juste(18, "c)", "B"); f.juste(18, "d)", "C"); f.juste(18, "e)", 1.2 ** 0); f.faux(18, "c)", "C");
  f.vrai("var ex.18 g(3)", Math.abs(1.2 ** 3 - 1.728) < 1e-9);
  f.juste(19, "a)", sens(-3, 0.8) === "décroissante" ? "vrai" : "faux"); f.juste(19, "b)", sens(-3, 0.8)); f.juste(19, "c)", -3 * 0.8 ** 0); f.juste(19, "d)", -3 * 0.8 ** 2); f.juste(19, "e)", -3 * 0.8 ** 2 > -3 ? "oui" : "non"); f.faux(19, "b)", "décroissante");
  f.vrai("var ex.19 tableau", Math.abs(-3 * 0.8 ** 4 + 1.23) < 0.005);
  f.juste(20, "a)", 1 - 30 / 100); f.juste(20, "b)", "6000 * 0.7^x"); f.juste(20, "c)", sens(6000, 0.7)); f.juste(20, "d)", "oui"); f.juste(20, "e)", 6000 * 0.7 ** 4); f.faux(20, "a)", 0.3);
  f.tout();
}

/* ───────────── expo-proprietes ───────────── */
{
  const f = await feuille("expo-proprietes");
  const p = (a, n) => `${String(a).replace(".", ",")}^${n}`;
  // ★
  f.juste(1, null, p(1.5, 3 + 4)); f.juste(1, null, "(1,5)^7"); f.faux(1, null, p(1.5, 3 * 4));
  f.juste(2, null, 13 - 5); f.faux(2, null, 13 + 5);
  f.juste(3, null, p(3, 9 - 2)); f.faux(3, null, "3^4,5");
  f.juste(4, "a)", 10 / 4 === 10 - 4 ? "oui" : "non"); f.juste(4, "b)", p(4, 10 - 4)); f.faux(4, "b)", "4^2,5");
  f.juste(5, null, p(1.2, 3 * 4)); f.faux(5, null, p(1.2, 3 + 4));
  f.juste(6, null, 12 / 3); f.faux(6, null, 12 - 3);
  f.juste(7, null, p(1.05, 4 + 5 - 2)); f.faux(7, null, p(1.05, 4 + 5 + 2));
  f.juste(8, null, p(2, 5 - 2)); f.faux(8, null, "2^(x+3)");
  // ★★
  f.juste(9, "a)", p(1.05, 3 + 4)); f.juste(9, "b)", 2000 * 1.05 ** 7); f.faux(9, "a)", p(1.05, 12));
  f.juste(10, "a)", p(2, 10 - 4)); f.juste(10, "b)", 2 ** 10 / 2 ** 4); f.faux(10, "a)", "2^2,5"); f.faux(10, "b)", "2^6");
  f.juste(11, "a)", p(1.08, 2 * 3)); f.juste(11, "b)", (1.08 ** 2) ** 3); f.juste(11, "c)", ((1.08 ** 2) ** 3 - 1) * 100); f.faux(11, "c)", 6 * 8);
  f.juste(12, "a)", 12 - 4); f.juste(12, "b)", 5000 * 1.1 ** 12); f.faux(12, "a)", 12 / 4);
  f.juste(13, "a)", 2); f.juste(13, "b)", 3 ** 2); f.juste(13, "c)", 500 * 3 ** 2); f.faux(13, "c)", 502); f.faux(13, "b)", "3^2");
  f.juste(14, "a)", 3); f.juste(14, "b)", 1.25 ** 3); f.juste(14, "c)", 800 / 1.25 ** 3); f.faux(14, "c)", 800 * (1 - 3 * 0.25)); f.faux(14, "b)", "1,25^3");
  f.dit(14, "409{,}6");
  f.juste(15, "a)", p(0.5, 2 * 3)); f.juste(15, "b)", (0.5 ** 2) ** 3); f.juste(15, "c)", (0.5 ** 2) ** 3 * 100); f.faux(15, "a)", p(0.5, 5)); f.faux(15, "b)", "0,5^6"); f.faux(15, "c)", (0.5 ** 2) ** 3);
  f.juste(16, "a)", p(2, 3 * 2 + 4)); f.vrai("prop ex.16 a)", (2 ** 3) ** 2 * 2 ** 4 === 2 ** 10); f.juste(16, "b)", p(3, 5 - 2)); f.juste(16, "c)", p(1.5, 6 - 2 * 2)); f.faux(16, "a)", p(2, 9));
  // ★★★
  f.juste(17, "a)", p(1.04, 5 + 3)); f.juste(17, "b)", 2000 * 1.04 ** 8); f.juste(17, "c)", p(1.04, 8 - 6)); f.juste(17, "d)", (1.04 ** 8 / 1.04 ** 6 - 1) * 100); f.faux(17, "d)", 8);
  f.juste(18, "a)", p(2, 10 * 2)); f.juste(18, "b)", 2 ** 20); f.juste(18, "c)", p(2, 23 - 18)); f.juste(18, "d)", 2 ** 23 / 2 ** 18); f.faux(18, "a)", p(2, 12)); f.faux(18, "b)", "2^20"); f.faux(18, "d)", 23 - 18);
  f.juste(19, "a)", 0.5 ** 3.7 / 0.5 ** 2.7); f.juste(19, "b)", p(0.5, 2 * 2)); f.juste(19, "c)", (0.5 ** 2) ** 2); f.juste(19, "d)", (0.5 ** 2) ** 2 * 100); f.juste(19, "e)", 4 * 5); f.faux(19, "e)", 4); f.faux(19, "d)", (0.5 ** 2) ** 2);
  f.juste(20, "a)", p(1.2, 3 + 4)); f.juste(20, "b)", p(5, 8 - 2)); f.juste(20, "c)", p(0.7, 2 * 3)); f.juste(20, "d)", p(3, 4 - 1));
  f.juste(20, "e)", [3 * 4 === 3 + 4, 8 / 2 === 8 - 2, 2 * 3 === 6, 4 - 1 === 3].filter(Boolean).length); f.faux(20, "b)", p(5, 4));
  f.tout();
}

/* ───────────── expo-taux-moyen ───────────── */
{
  const f = await feuille("expo-taux-moyen");
  const moyen = (k, n) => (k ** (1 / n) - 1) * 100;
  const coef = (...t) => t.reduce((q, x) => q * (1 + x / 100), 1);
  const moy = (...t) => t.reduce((s, x) => s + x, 0) / t.length;
  // ★
  f.juste(1, null, 8 ** (1 / 3)); f.faux(1, null, 8 / 3); f.faux(1, null, "8^(1/3)");
  f.juste(2, "a)", 625 ** (1 / 4)); f.juste(2, "b)", 100 ** (1 / 2)); f.faux(2, "b)", 50); f.faux(2, "a)", "625^(1/4)");
  f.juste(3, "a)", "20^(1/5)"); f.juste(3, "a)", "20^(1÷5)"); f.juste(3, "b)", 20 ** (1 / 5)); f.faux(3, "a)", "20/5"); f.faux(3, "a)", "20^1/5"); f.faux(3, "b)", 4);
  f.juste(4, null, 1.5 ** (1 / 3)); f.faux(4, null, 1.5 / 3);
  f.juste(5, null, moyen(1.21, 2)); f.faux(5, null, 10.5);
  f.juste(6, null, moyen(0.81, 2)); f.faux(6, null, 10); f.faux(6, null, -9.5);
  f.juste(7, "a)", coef(100, -50)); f.juste(7, "b)", moyen(coef(100, -50), 2)); f.faux(7, "b)", moy(100, -50));
  f.juste(8, "a)", 100 * 1.5); f.juste(8, "b)", 100 * 1.5 * 0.5); f.juste(8, "c)", moyen(coef(50, -50), 2) === 0 ? "oui" : "non"); f.faux(8, "b)", 100);
  // ★★
  f.juste(9, "a)", 12000 / 8000); f.juste(9, "b)", (12000 / 8000) ** (1 / 5)); f.juste(9, "c)", moyen(12000 / 8000, 5)); f.faux(9, "c)", 50 / 5);
  f.juste(10, "a)", 300 / 400); f.juste(10, "b)", moyen(300 / 400, 4)); f.faux(10, "b)", -25 / 4); f.faux(10, "b)", -moyen(300 / 400, 4));
  f.juste(11, "a)", coef(30, -20, 10)); f.juste(11, "b)", moyen(coef(30, -20, 10), 3)); f.faux(11, "b)", moy(30, -20, 10));
  f.juste(12, "a)", coef(40, -30)); f.juste(12, "b)", 1000 * coef(40, -30)); f.juste(12, "c)", moyen(coef(40, -30), 2)); f.faux(12, "c)", moy(40, -30));
  f.juste(13, "a)", 80 / 50); f.juste(13, "b)", moyen(80 / 50, 6)); f.juste(13, "c)", 50 * 1.081 ** 6); f.faux(13, "b)", 60 / 6);
  f.vrai("moy ex.13 c) corrigé", Math.abs(50 * 1.081 ** 6 - 79.8) < 0.05);
  f.juste(14, null, moyen(5, 10)); f.faux(14, null, 400 / 10); f.vrai("moy ex.14 presque 29", 1.4 ** 10 > 28 && 1.4 ** 10 < 29);
  const tA = moyen(260 / 200, 3), tB = moyen(360 / 300, 2);
  f.juste(15, "a)", tA); f.juste(15, "b)", tB); f.juste(15, "c)", tB > tA ? "B" : "A"); f.faux(15, "c)", "A");
  f.juste(16, "a)", coef(25, 15)); f.juste(16, "b)", moyen(coef(25, 15), 2)); f.juste(16, "c)", Math.round(moyen(coef(25, 15), 2) * 1e6) === 20e6 ? "oui" : "non"); f.faux(16, "b)", moy(25, 15));
  // ★★★
  f.juste(17, "a)", 400 / 500); f.juste(17, "b)", 0.8 ** (1 / 20)); f.juste(17, "c)", moyen(0.8, 20)); f.juste(17, "d)", 400 * (0.8 ** (1 / 20)) ** 10); f.juste(17, "d)", 400 * 0.989 ** 10); f.faux(17, "d)", 350); f.faux(17, "d)", 357); f.faux(17, "d)", 359);
  const ski = [30, -25, 40, -20];
  f.juste(18, "a)", coef(...ski)); f.juste(18, "b)", moyen(coef(...ski), 4)); f.juste(18, "c)", moy(...ski)); f.juste(18, "d)", 1000 * coef(...ski)); f.faux(18, "b)", moy(...ski));
  f.vrai("moy ex.18 1 270 k€", 1000 * 1.0625 ** 4 > 1270 && 1000 * 1.0625 ** 4 < 1280);
  f.juste(19, "a)", coef(10, 10)); f.juste(19, "b)", coef(0, 20)); f.juste(19, "c)", moyen(coef(0, 20), 2)); f.juste(19, "d)", coef(10, 10) > coef(0, 20) ? "A" : "B"); f.faux(19, "c)", moy(0, 20));
  f.vrai("moy ex.19 même moyenne", moy(10, 10) === moy(0, 20));
  f.juste(20, "a)", 2); f.juste(20, "b)", "2^(1/8)"); f.juste(20, "b)", "2^(1÷8)"); f.juste(20, "c)", moyen(2, 8)); f.juste(20, "d)", 1.12 ** 8 >= 2 ? "oui" : "non"); f.faux(20, "c)", 100 / 8); f.faux(20, "b)", "2^1/8");
  f.tout();
}

/* ───────────── expo-taux-equivalent ───────────── */
{
  const f = await feuille("expo-taux-equivalent");
  const global = (t, n) => ((1 + t / 100) ** n - 1) * 100;
  const equiv = (t, n) => ((1 + t / 100) ** (1 / n) - 1) * 100;
  // ★
  f.juste(1, null, global(5, 2)); f.faux(1, null, 5 * 2);
  f.juste(2, null, global(-10, 3)); f.faux(2, null, -30);
  f.juste(3, null, global(3, 10)); f.faux(3, null, 30);
  f.juste(4, null, equiv(12, 12)); f.faux(4, null, 12 / 12);
  f.juste(5, null, equiv(6, 2)); f.faux(5, null, 6 / 2);
  f.vrai("équ ex.5 6,09 %", Math.abs(global(3, 2) - 6.09) < 1e-9);
  f.juste(6, null, global(1, 12)); f.faux(6, null, 12);
  f.juste(7, null, "B"); f.faux(7, null, "A"); f.faux(7, null, "D");
  f.vrai("équ ex.7 26,4 % et 24", Math.abs(global(4.8, 5) - 26.4) < 0.05 && Math.abs(4.8 * 5 - 24) < 1e-9);
  f.juste(8, "a)", "faux"); f.juste(8, "b)", "vrai"); f.juste(8, "c)", "vrai"); f.faux(8, "b)", "faux");
  // ★★
  f.juste(9, "a)", 1.015 ** 12); f.juste(9, "b)", global(1.5, 12)); f.juste(9, "c)", 1.5 * 12); f.faux(9, "b)", 18);
  f.juste(10, "a)", equiv(4, 4)); f.juste(10, "b)", 5000 * 1.04 ** (1 / 4)); f.faux(10, "a)", 1); f.faux(10, "b)", 5000 * 1.01);
  f.vrai("équ ex.10 1 % dépasse", global(1, 4) > 4);
  f.juste(11, "a)", global(2.5, 8)); f.juste(11, "b)", 12000 * 1.025 ** 8); f.faux(11, "a)", 20);
  f.vrai("équ ex.11 plus de 200 habitants", 12000 * 1.025 ** 8 - 12000 * 1.2 > 200);
  f.juste(12, "a)", global(1.8, 10)); f.juste(12, "b)", 1 * 1.018 ** 10); f.faux(12, "a)", 18);
  f.juste(13, "a)", equiv(20, 12)); f.juste(13, "b)", equiv(20, 2)); f.juste(13, "c)", 900 * 1.2 ** (6 / 12)); f.faux(13, "a)", 20 / 12);
  f.vrai("équ ex.13 douze hausses dépassent", global(20 / 12, 12) > 20);
  f.juste(14, "a)", global(6.2, 8)); f.juste(14, "b)", Math.abs(global(6.2, 8) - 6.2 * 8) < 0.05 ? "vrai" : "faux"); f.juste(14, "c)", "B"); f.faux(14, "c)", "A");
  f.juste(15, "a)", 1 - 5.1 / 100); f.juste(15, "b)", global(-5.1, 3)); f.juste(15, "c)", 40000 * 0.949 ** 3); f.juste(15, "d)", "non"); f.faux(15, "b)", -5.1 * 3);
  f.juste(16, "a)", 1 + 40 / 100); f.juste(16, "b)", (1.4 ** (1 / 5) - 1) * 100); f.juste(16, "c)", 1.07 ** 5); f.faux(16, "b)", 40 / 5);
  f.vrai("équ ex.16 8 % dépasse 46 %", global(8, 5) > 46 && global(8, 5) < 47);
  // ★★★
  f.juste(17, "a)", global(1.2, 12)); f.juste(17, "b)", equiv(15, 12)); f.juste(17, "c)", 15 < global(1.2, 12) ? "B" : "A"); f.juste(17, "d)", 1.2 * 12); f.faux(17, "c)", "A");
  f.juste(18, "a)", global(2, 4)); f.juste(18, "b)", global(2, 12)); f.juste(18, "c)", 200 * 1.02 ** 12); f.faux(18, "b)", 3 * global(2, 4));
  const tourisme = 1.2 * 0.95 * 1.15 * 1.02;
  f.juste(19, "a)", tourisme); f.juste(19, "b)", (tourisme - 1) * 100); f.juste(19, "c)", (tourisme ** (1 / 4) - 1) * 100); f.juste(19, "d)", [20, -5, 15, 2].every((t) => t === 7.5) ? "vrai" : "faux"); f.faux(19, "d)", "vrai");
  f.juste(20, "a)", equiv(30, 12)); f.juste(20, "b)", equiv(30, 4)); f.juste(20, "c)", global(2.5, 12) >= 30 ? "oui" : "non"); f.juste(20, "d)", global(2.5, 12)); f.faux(20, "a)", 30 / 12);
  f.tout();
}

fin();
