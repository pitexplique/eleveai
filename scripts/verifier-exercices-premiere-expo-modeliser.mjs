// Recalcul indépendant de la feuille « Modéliser une évolution exponentielle »
// (1re sans spé, BOP1VE, 28/09/2026) :
// lib/fiches-exercices/maths-premiere-expo-modeliser.tsx
//
// Chaque modèle est rejoué terme à terme (multiplications successives pour
// l'exponentiel, additions pour le linéaire) ; chaque « à partir de quelle
// année » est retrouvé en parcourant les années une à une ; chaque puissance
// entière calculée en BigInt ; chaque ordre de grandeur comparé à la valeur
// exacte ; chaque nombre relu à sa place dans le corrigé ; tableaux,
// diagrammes et courbes relus dans le source. Plus le socle commun et les
// règles de rendu (scripts/verifier-exercices-premiere-expo-commun.mjs).
// Usage : node scripts/verifier-exercices-premiere-expo-modeliser.mjs

import { ouvrir } from "./verifier-exercices-premiere-expo-commun.mjs";

const F = ouvrir("lib/fiches-exercices/maths-premiere-expo-modeliser.tsx", "expo_modeliser");
const { res, dit, vrai, vaut, dessin, courbeSuit, pointsSuivent } = F;

const geo = (u0, q, n) => {
  let x = u0;
  for (let i = 0; i < n; i++) x *= q;
  return x;
};
const puisB = (a, n) => {
  let r = 1n;
  for (let i = 0; i < n; i++) r *= BigInt(a);
  return r;
};
/** Le premier n (entier) où cond(n) est vraie. */
const premier = (cond, max = 1000) => {
  for (let n = 0; n <= max; n++) if (cond(n)) return n;
  return -1;
};
const ligne = (k, role) => dessin(k, role).args[1].slice(1);
const nombre = (s) => Number(String(s).replace(/\s/g, "").replace(",", "."));

try {
  /* ── ★ ── */
  {
    const A = [100, 150, 225, 337.5];
    const B = [100, 150, 200, 250];
    vrai("1. A : quotients 1,5", A.slice(1).every((x, i) => x / A[i] === 1.5));
    vrai("1. B : différences 50", B.slice(1).every((x, i) => x - B[i] === 50));
    vrai("1. B n'est pas exponentiel", B[2] / B[1] !== B[1] / B[0]);
    res(1, 337.5 / 225, "1{,}5");
  }
  dit(2, "a) On ajoute $50$ € chaque année : linéaire", "b) On multiplie par $1{,}03$", "c) On ajoute $2$ €", "d) On multiplie par $0{,}5$");
  res(3, 50 * 1.2, "60");
  res(3, 50 * 1.2 - 50, "10");
  res(4, 0.75 ** 3, "0{,}421875");
  res(4, geo(800, 0.75, 3), "337{,}5");
  res(4, 800 - 3 * 200, "200");
  res(5, Number(puisB(2, 20)), "1\\,048\\,576");
  res(5, Number(puisB(2, 30)), "1\\,073\\,741\\,824");
  res(6, 100 + 10, "110");
  res(6, 100 + 10 * 10, "200");
  res(6, geo(100, 1.1, 10), "259{,}37");
  res(7, 0.1 * 1024, "102{,}4");
  res(7, 0.1 * Number(puisB(2, 20)), "104\\,857{,}6");
  res(7, (0.1 * Number(puisB(2, 20))) / 1000, "105");
  res(8, 0.75 ** 5, "0{,}24");
  res(8, 0.75 ** 5 * 100, "24");
  {
    const l = ligne(8, "schema");
    [0, 1, 2, 5].forEach((n, i) => vaut(`8. tableau étape ${n}`, l[i], Math.round(0.75 ** n * 10000) / 10000, 0.006));
  }

  /* ── ★★ ── */
  {
    res(9, 1000 + 50, "1\\,050");
    res(9, 1000 * 1.05, "1\\,050");
    res(9, 1000 + 50 * 20, "2\\,000");
    res(9, geo(1000, 1.05, 20), "2\\,653{,}30");
    vrai("9. écart de plus de 650 €", geo(1000, 1.05, 20) - 2000 > 650);
    const d = dessin(9, "schema").args[1].map((x) => x.value);
    vaut("9. barre A", d[0], 2000);
    vaut("9. barre B", d[1], Math.round(geo(1000, 1.05, 20) * 10) / 10);
  }
  {
    const l = ligne(10, "figure");
    l.forEach((x, n) => vaut(`10. relevé t = ${n} (au centième)`, x, Math.round(geo(9, 0.7, n) * 100) / 100));
    ["2{,}7", "1{,}89", "1{,}32"].forEach((t, i) => res(10, l[i] - l[i + 1], t));
    res(10, l[1] / l[0], "0{,}7");
    res(10, l[3] / l[2], "0{,}7");
    res(10, geo(9, 0.7, 5), "1{,}51");
    res(10, 9 * 0.7 ** 2.5, "3{,}69");
  }
  {
    const p = (n) => geo(10, 2, n);
    const r = (n) => 10 + 10 * n;
    [[1, 20, 20], [2, 40, 30], [4, 160, 50]].forEach(([n, a, b]) => {
      vaut(`11. p_${n}`, p(n), a);
      vaut(`11. r_${n}`, r(n), b);
    });
    dit(11, "$p_1 = 20$ et $r_1 = 20$", "$p_2 = 40$ et $r_2 = 30$", "$p_4 = 160$ et $r_4 = 50$");
    vrai("11. plus de trois fois trop", p(4) / r(4) > 3);
    courbeSuit(11, "schema", 0, (n) => r(n) / 10, "la nourriture en dizaines de millions");
    pointsSuivent(11, "schema", (n) => p(n) / 10, "la population en dizaines de millions");
  }
  {
    const a = (n) => 100 + 15 * n;
    const b = (n) => geo(100, 1.1, n);
    const l = ligne(12, "figure");
    [0, 5, 8, 9].forEach((n, i) => vaut(`12. écart n = ${n}`, l[i], Math.round((a(n) - b(n)) * 100) / 100));
    res(12, a(5), "175");
    res(12, b(5), "161");
    res(12, a(8), "220");
    res(12, b(8), "214{,}36");
    res(12, a(9), "235");
    res(12, b(9), "235{,}79");
    vaut("12. B dépasse A à n = 9", premier((n) => n > 0 && b(n) > a(n)), 9);
    dit(12, "2034");
  }
  {
    const l = ligne(13, "figure");
    l.forEach((x, n) => vaut(`13. relevé ${n}`, x, Math.round(geo(240, 0.95, n) * 100) / 100));
    ["12", "11{,}4", "10{,}83"].forEach((t, i) => res(13, l[i] - l[i + 1], t));
    res(13, l[1] / l[0], "0{,}95");
    res(13, geo(240, 0.95, 10), "144");
    res(13, 240 - 12 * 10, "120");
  }
  {
    res(14, 24 * 4, "96");
    res(14, 24 * 16, "384");
    vaut("14. 4^10 = 2^20", Number(puisB(4, 10)), Number(puisB(2, 20)));
    res(14, Number(24n * puisB(4, 10)), "25\\,165\\,824");
    vrai("14. « environ 24 millions » : bon ordre de grandeur", Math.abs(Number(24n * puisB(4, 10)) / 24e6 - 1) < 0.05);
    const l = ligne(14, "schema").map(nombre);
    [0, 1, 2, 10].forEach((n, i) => vaut(`14. tableau ${1859 + n}`, l[i], Number(24n * puisB(4, n))));
  }
  {
    res(15, Number(puisB(3, 10)), "59\\,049");
    res(15, 1.5 ** 10, "57{,}7");
    res(15, 1.5 ** 10, "58");
    res(15, 0.8 ** 10, "0{,}11");
    vaut("15. 3^10 / 1,5^10 = 2^10", 3 ** 10 / 1.5 ** 10, 1024, 1e-9);
    const l = ligne(15, "schema");
    [0, 5, 10].forEach((n, i) => vaut(`15. tableau génération ${n}`, l[i], 3 ** n));
  }
  {
    res(16, (2021 - 1971) / 2, "25");
    res(16, 2 ** 5, "32");
    res(16, (2300 * 32e6) / 1e9, "74");
    res(16, (2300 * 2 ** 25) / 1e9, "77");
    vrai("16. facteur de plus de 30 millions", 2 ** 25 > 30e6);
    vrai("16. tableau 1991 : ≈ 2,4 millions", Math.round((2300 * 2 ** 10) / 1e5) / 10 === 2.4 && ligne(16, "schema")[1] === "≈ 2,4 millions");
  }

  /* ── ★★★ ── */
  {
    const total = puisB(2, 64) - 1n;
    res(17, 16, "16");
    res(17, 16e18 / 1e19, "1{,}6");
    res(17, Number(total) / 1e19, "1{,}8");
    res(17, 1.6e19 * 0.05 / 1e17, "8");
    vaut("17. 8 × 10^17 g = 8 × 10^11 t", (1.6e19 * 0.05) / 1e6, 8e11, 1e-9);
    res(17, 8e11 / 8e8, "1\\,000");
    const l = ligne(17, "schema");
    vaut("17. case 1", nombre(l[0]), 1);
    vaut("17. case 10", nombre(l[1]), 2 ** 9);
    vaut("17. case 20", nombre(l[2]), 2 ** 19);
    vaut("17. case 64 ≈ 9,2 × 10¹⁸", Math.round(Number(puisB(2, 63)) / 1e17) / 10, 9.2, 1e-9);
  }
  {
    const a = (n) => 30 + 3 * n;
    const b = (n) => geo(30, 1.05, n);
    courbeSuit(18, "figure", 0, (x) => a(5 * x) / 10, "la bleue, A en dizaines d'euros");
    courbeSuit(18, "figure", 1, (x) => b(5 * x) / 10, "l'orange, B en dizaines d'euros");
    res(18, a(26), "108");
    res(18, b(26), "106{,}67");
    res(18, a(27), "111");
    res(18, b(27), "112{,}00");
    vaut("18. B plus chère à partir de 27 ans", premier((n) => n > 0 && b(n) > a(n)), 27);
    res(18, b(10), "48{,}87");
    res(18, a(10), "60");
  }
  {
    const l = ligne(19, "figure");
    l.forEach((x, n) => vaut(`19. relevé ${n}`, x, geo(10, 3, n)));
    res(19, geo(10, 3, 6), "7\\,290");
    res(19, 10 + 86.7 * 3, "270", { ou: "enonce" });
    res(19, 10 + 86.7 * 6, "530");
    vrai("19. plus de 13 fois", geo(10, 3, 6) / (10 + 86.7 * 6) > 13);
    res(19, geo(10, 3, 10), "590\\,490");
    res(19, 3 ** 6, "729");
  }
  {
    res(20, Number(puisB(3, 10)), "59\\,049");
    res(20, Number(puisB(3, 16)), "43\\,046\\,721");
    res(20, Number(puisB(3, 17)), "129\\,140\\,163");
    vaut("20. dépasse 68 millions à n = 17", premier((n) => Number(puisB(3, n)) > 68e6), 17);
    res(20, 8 + 17, "25");
    const l = ligne(20, "schema").map(nombre);
    [0, 5, 10, 17].forEach((n, i) => vaut(`20. tableau n = ${n}`, l[i], Number(puisB(3, n))));
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

    pointsSuivent(1, "schema", (n) => 1.5 ** n, "le relevé A en centaines");
    courbeSuit(1, "schema", 0, (n) => 1 + 0.5 * n, "le relevé B en centaines");
    courbeSuit(2, "schema", 0, (x) => 2 * x, "le taxi, 2 € par km");
    pointsSuivent(2, "schema", (n) => 8 * 0.5 ** n, "la substance divisée par 2");
    courbeSuit(3, "schema", 0, (x) => (50 * 1.2 ** x) / 10, "50 × 1,2ˣ en dizaines");
    courbeSuit(3, "schema", 1, (x) => (50 + 20 * x) / 10, "50 + 20x en dizaines");
    courbeSuit(4, "schema", 0, (n) => 8 - 2 * n, "le « −200 € par an » en centaines");
    pointsSuivent(4, "schema", (n) => 8 * 0.75 ** n, "800 × 0,75ⁿ en centaines");
    vrai("5. tableau 2^10, 2^20, 2^30", _proche(_l(5), [2 ** 10, 2 ** 20, 2 ** 30], 0));
    courbeSuit(6, "schema", 0, (n) => 1.1 ** n, "100 × 1,1ⁿ en centaines");
    courbeSuit(6, "schema", 1, (n) => 1 + 0.1 * n, "100 + 10n en centaines");
    vrai("7. tableau des pliages", _d(7)[1][2] === "≈ 10 cm" && Math.abs(0.1 * 2 ** 10 - 100) < 5 && Math.abs((0.1 * 2 ** 20) / 1000 - 105) < 0.5);
  }
} catch (err) {
  vrai("le recalcul s'exécute", false, String(err?.stack ?? err));
}

F.fin("Modéliser une évolution exponentielle (1re)");
