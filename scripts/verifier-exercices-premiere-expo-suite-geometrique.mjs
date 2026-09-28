// Recalcul indépendant de la feuille « Reconnaître une suite géométrique »
// (1re sans spé, BOP1VE, 28/09/2026) :
// lib/fiches-exercices/maths-premiere-expo-suite-geometrique.tsx
//
// Chaque terme annoncé est refait par multiplications successives à partir
// des données de l'énoncé, chaque raison par un quotient, chaque taux par
// l'écart à 1 ; chaque nombre est relu À SA PLACE dans le corrigé (égal, ou
// arrondi précédé de ≈). Les dessins (points, diagrammes, tableaux) sont
// rejoués et comparés à la suite. Plus le socle commun et les règles de rendu
// (scripts/verifier-exercices-premiere-expo-commun.mjs).
// Usage : node scripts/verifier-exercices-premiere-expo-suite-geometrique.mjs

import { ouvrir } from "./verifier-exercices-premiere-expo-commun.mjs";

const F = ouvrir("lib/fiches-exercices/maths-premiere-expo-suite-geometrique.tsx", "expo_suite_geometrique");
const { res, dit, vrai, vaut, dessin, pointsSuivent } = F;

/** Les termes u_0 … u_n d'une suite géométrique, par multiplications successives. */
const termes = (u0, q, n) => {
  const t = [u0];
  for (let i = 0; i < n; i++) t.push(t[i] * q);
  return t;
};
const valeurs = (k, role) => dessin(k, role).args[1].map((x) => x.value);
const ligne = (k, role) => dessin(k, role).args[1].slice(1);

try {
  /* ── ★ ── */
  [6 / 3, 12 / 6, 24 / 12].forEach((x) => vaut("1. quotient", x, 2));
  dit(1, "$q = 2$");
  vrai("2. quotients différents", 10 / 5 !== 15 / 10);
  res(2, 15 / 10, "1{,}5");
  {
    const u = termes(4, 3, 3);
    res(3, u[1], "12");
    res(3, u[2], "36");
    res(3, u[3], "108");
  }
  res(4, 1 + 20 / 100, "1{,}2");
  res(5, 1 - 15 / 100, "0{,}85");
  res(5, (1.07 - 1) * 100, "7");
  res(5, (1 - 0.96) * 100, "4");
  {
    const u = termes(800, 0.5, 4);
    [400, 200, 100, 50].forEach((x, i) => res(6, u[i + 1], String(x)));
    pointsSuivent(6, "schema", (n) => u[n] / 100, "les termes en centaines");
  }
  {
    const t = [1000, 1100, 1210, 1331];
    t.slice(1).forEach((x, i) => vaut(`7. quotient ${i + 1}`, x / t[i], 1.1));
    dit(7, "$q = 1{,}1$", "$10$ %");
    [100, 110, 121].forEach((d, i) => vaut(`7. écart ${i + 1}`, t[i + 1] - t[i], d));
  }
  {
    const q = 54 / 45;
    res(8, q, "1{,}2");
    res(8, 54 * q, "64{,}8");
    res(8, 45 / q, "37{,}5");
  }

  /* ── ★★ ── */
  {
    const u = termes(2500, 1.02, 3);
    res(9, u[1], "2\\,550");
    res(9, u[2], "2\\,601");
    res(9, u[3], "2\\,653{,}02");
    res(9, u[1] - u[0], "50");
    res(9, u[2] - u[1], "51");
    ligne(9, "schema").forEach((x, i) => vaut(`9. tableau, année ${i}`, x, Math.round(u[i] * 100) / 100));
  }
  {
    const u = termes(100, 0.8, 4);
    ["80", "64", "51{,}2", "40{,}96"].forEach((t, i) => res(10, u[i + 1], t));
    vrai("10. 3 m : au-dessus de 50", u[3] > 50);
    vrai("10. 4 m : en dessous de 50", u[4] < 50);
    pointsSuivent(10, "schema", (n) => u[n] / 10, "l'intensité en dizaines");
    vaut("10. la ligne des 50 % (en dizaines)", dessin(10, "schema").args[3], 5);
  }
  {
    const u = termes(1, 2, 10); // u[i] = grains de la case i + 1
    res(11, u[5], "32");
    res(11, u[10], "1\\,024");
    valeurs(11, "schema").forEach((x, i) => vaut(`11. bâton case ${i + 1}`, x, u[i]));
    // La case 64 : 2^63 grains, à environ 0,05 g le grain, contre moins d'un
    // milliard de tonnes de blé récoltées par an (ordre de grandeur sûr).
    vrai("11. case 64 : plus que les récoltes mondiales d'une année", (2 ** 63 * 0.05e-6) / 1e9 > 100);
  }
  {
    const d = ligne(12, "figure");
    vaut("12. tableau semaine 0", d[0], 20);
    d.slice(1).forEach((x, i) => vaut(`12. quotient ${i + 1}`, x / d[i], 1.1));
    res(12, d[1] - d[0], "2");
    res(12, d[2] - d[1], "2{,}2");
    res(12, d[3] * 1.1, "29{,}282");
    res(12, d[3] * 1.1, "29{,}3");
  }
  {
    const d = termes(500, 0.96, 3);
    res(13, d[1], "480");
    res(13, d[2], "460{,}8");
    res(13, d[3], "442{,}368");
    res(13, d[3], "442{,}4");
    res(13, 500 * (1 - 0.12), "440");
    vrai("13. plus que 440", d[3] > 440);
    valeurs(13, "schema").forEach((x, i) => vaut(`13. barre ${2024 + i}`, x, Math.round(d[i] * 10) / 10));
  }
  {
    const u = termes(2, 1.5, 4);
    pointsSuivent(14, "figure", (n) => u[n], "ceux de 2 × 1,5ⁿ");
    res(14, u[3], "6{,}75");
    res(14, u[4], "10{,}125");
    dit(14, "$+50$ %");
  }
  {
    const m = termes(200, 0.7, 3);
    res(15, m[1], "140");
    res(15, m[2], "98");
    res(15, m[3], "68{,}6");
    res(15, (m[3] / 200) * 100, "34{,}3");
    res(15, 100 - (m[3] / 200) * 100, "65{,}7");
    valeurs(15, "schema").forEach((x, i) => vaut(`15. bâton ${i} h`, x, m[i]));
  }
  {
    const B = termes(1800, 1.025, 2);
    res(16, 1800 + 45, "1\\,845");
    res(16, 1800 + 90, "1\\,890");
    res(16, B[2], "1\\,891{,}125");
    res(16, B[2], "1\\,891{,}13");
    vaut("16. 2,5 % de 1 800 = 45", 1800 * 0.025, 45);
    ligne(16, "schema").forEach((x, i) => vaut(`16. tableau B, année ${i}`, x, Math.round(B[i] * 100 + 1e-7) / 100));
  }

  /* ── ★★★ ── */
  {
    const p = termes(40, 1.02, 3);
    res(17, p[1], "40{,}8");
    res(17, p[2], "41{,}616");
    res(17, p[2], "41{,}62");
    res(17, p[3], "42{,}45");
    ["40{,}8", "41{,}6", "42{,}4"].forEach((t, i) => res(17, 40 + 0.8 * (i + 1), t));
    res(17, p[2] - p[1], "0{,}816");
    ligne(17, "schema").forEach((x, i) => vaut(`17. tableau ${2000 + i}`, x, Math.round(p[i] * 100) / 100));
  }
  {
    const h = termes(5, 0.8, 5);
    pointsSuivent(18, "figure", (n) => h[n], "ceux de 5 × 0,8ⁿ");
    res(18, 4 / 5, "0{,}8");
    res(18, h[2], "3{,}2");
    res(18, h[3], "2{,}56");
    res(18, h[4], "2{,}048");
    res(18, h[1] - h[2], "0{,}8");
    res(18, h[2] - h[3], "0{,}64");
    pointsSuivent(18, "schema", (n) => h[n], "ceux de 5 × 0,8ⁿ");
    vrai("18. la droite du joueur : 5 − n", JSON.stringify(dessin(18, "schema").args[1][0].pts) === JSON.stringify([[0, 5], [5, 0]]));
  }
  {
    const v = termes(800, 0.75, 4);
    res(19, v[1], "600");
    res(19, v[2], "450");
    res(19, v[3], "337{,}5");
    res(19, v[4], "253{,}125");
    res(19, v[4], "253{,}13");
    vrai("19. v2 > 400 > v3", v[2] > 400 && v[3] < 400);
    valeurs(19, "schema").forEach((x, i) => vaut(`19. barre ${i} an(s)`, x, Math.round(v[i] * 100) / 100));
  }
  {
    const c = termes(40, 1.25, 4);
    res(20, c[1], "50");
    res(20, c[2], "62{,}5");
    res(20, c[3], "78{,}125");
    res(20, c[4], "97{,}65625");
    res(20, c[3], "78");
    res(20, c[4], "98");
    res(20, 1.25 ** 3, "1{,}95");
    vrai("20. 2028 : pas doublé ; 2029 : doublé", c[3] < 80 && c[4] > 80);
    pointsSuivent(20, "schema", (n) => c[n] / 10, "les couples en dizaines", 0.006);
    vaut("20. la ligne du double (en dizaines)", dessin(20, "schema").args[3], 8);
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

    [1, 2, 3, 7].forEach((k) => { const t = _termes(k); const c = _coef(k); vrai(`${k}. schéma : chaque « × q » est le quotient des termes`, c.every((q, i) => Math.abs(t[i + 1] / t[i] - q) <= 0.005)); });
    vrai("1. termes 3 ; 6 ; 12 ; 24", _termes(1).join() === "3,6,12,24");
    vrai("2. termes 5 ; 10 ; 15 ; 20", _termes(2).join() === "5,10,15,20");
    vrai("3. termes = 4 × 3ⁿ", _proche(_termes(3), _suite(4, 3, 4), 1e-9));
    vrai("7. termes = 1 000 × 1,1ⁿ", _proche(_termes(7), _suite(1000, 1.1, 4), 1e-6));
    vrai("4. barres × 1,2", _proche(_v(4), _suite(100, 1.2, 3), 1e-9));
    vrai("5. barres × 0,85", _proche(_v(5), _suite(100, 0.85, 3), 1e-9));
    pointsSuivent(8, "schema", (n) => (37.5 * 1.2 ** (n - 1)) / 10, "u₁ à u₄ en dizaines");
  }
} catch (err) {
  vrai("le recalcul s'exécute", false, String(err?.stack ?? err));
}

F.fin("Reconnaître une suite géométrique (1re)");
