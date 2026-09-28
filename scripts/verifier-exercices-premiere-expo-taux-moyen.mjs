// Recalcul indépendant de la feuille « Le taux d'évolution moyen » (1re sans
// spé, BOP1VE, 28/09/2026) : lib/fiches-exercices/maths-premiere-expo-taux-moyen.tsx
//
// Chaque coefficient moyen annoncé est retrouvé par DICHOTOMIE (le nombre c
// tel que cⁿ = C), jamais par Math.pow(C, 1/n) — un autre chemin que la
// calculatrice de la feuille ; chaque coefficient global par le produit des
// coefficients ; chaque nombre relu à sa place dans le corrigé ; les
// diagrammes, tableaux et points relus dans le source. Plus le socle commun et
// les règles de rendu (scripts/verifier-exercices-premiere-expo-commun.mjs).
// Usage : node scripts/verifier-exercices-premiere-expo-taux-moyen.mjs

import { ouvrir } from "./verifier-exercices-premiere-expo-commun.mjs";

const F = ouvrir("lib/fiches-exercices/maths-premiere-expo-taux-moyen.tsx", "expo_taux_moyen");
const { res, dit, vrai, vaut, dessin, pointsSuivent } = F;

/** Le coefficient moyen c > 0 tel que cⁿ = C, par dichotomie. */
const moyen = (C, n) => {
  let [lo, hi] = [0, Math.max(1, C)];
  for (let i = 0; i < 200; i++) {
    const m = (lo + hi) / 2;
    let p = 1;
    for (let j = 0; j < n; j++) p *= m;
    if (p < C) lo = m;
    else hi = m;
  }
  return lo;
};
const produit = (...cs) => cs.reduce((p, x) => p * x, 1);
const valeurs = (k, role) => dessin(k, role).args[1].map((x) => x.value);
const ligne = (k, role) => dessin(k, role).args[1].slice(1);

try {
  /* ── ★ ── */
  res(1, moyen(1.21, 2), "1{,}1");
  res(1, (moyen(1.21, 2) - 1) * 100, "10");
  res(2, moyen(8, 3), "2");
  res(2, (moyen(8, 3) - 1) * 100, "100");
  vrai("2. (8/3)³ > 8", (8 / 3) ** 3 > 8);
  res(3, 1.22 * 1.22, "1{,}4884");
  res(3, (1.22 * 1.22 - 1) * 100, "48{,}84");
  res(3, moyen(1.44, 2), "1{,}2");
  vrai("3. taux moyen < 44/2", (moyen(1.44, 2) - 1) * 100 < 22);
  res(4, 1.05 ** 4, "1{,}21550625");
  res(4, (1.05 ** 4 - 1) * 100, "21{,}55");
  res(5, 1.2 * 0.8, "0{,}96");
  res(5, moyen(0.96, 2), "0{,}9798");
  res(5, (1 - moyen(0.96, 2)) * 100, "2{,}02");
  res(6, moyen(0.64, 2), "0{,}8");
  res(6, (1 - moyen(0.64, 2)) * 100, "20");
  res(7, 1.02 ** 10, "1{,}219");
  res(7, (1.02 ** 10 - 1) * 100, "21{,}9");
  res(8, moyen(1.3, 5), "1{,}0539");
  res(8, (moyen(1.3, 5) - 1) * 100, "5{,}39");
  res(8, 1.0539 ** 5, "1{,}30");

  /* ── ★★ ── */
  {
    const d = valeurs(9, "figure");
    res(9, d[1] / d[0], "1{,}25");
    res(9, d[2] / d[1], "0{,}968");
    res(9, (1 - d[2] / d[1]) * 100, "3{,}2");
    res(9, d[3] / d[2], "1{,}1");
    res(9, d[3] / d[0], "1{,}331");
    vaut("9. produit des coefficients = C", produit(d[1] / d[0], d[2] / d[1], d[3] / d[2]), d[3] / d[0], 1e-12);
    vaut("9. 3 périodes, taux moyen 10 %", moyen(d[3] / d[0], d.length - 1), 1.1, 1e-9);
  }
  {
    const d = valeurs(10, "figure");
    const C = d[1] / d[0];
    res(10, C, "0{,}4096");
    res(10, moyen(C, 4), "0{,}8");
    res(10, (1 - C) * 100, "59{,}04");
    res(10, ((1 - C) * 100) / 4, "14{,}76");
    res(10, 0.8524 ** 4, "0{,}528");
    res(10, 0.8524 ** 4 * 100, "52{,}8");
  }
  {
    res(11, moyen(2, 127), "1{,}00547");
    res(11, (moyen(2, 127) - 1) * 100, "0{,}55");
    res(11, moyen(4, 95), "1{,}0147");
    res(11, (moyen(4, 95) - 1) * 100, "1{,}47");
    const r = (moyen(4, 95) - 1) / (moyen(2, 127) - 1);
    vrai(`11. « presque triplé » (rapport ${r.toFixed(2)})`, r > 2.5 && r < 3);
    const d = valeurs(11, "schema");
    vrai("11. diagramme 1 ; 2 ; 8 milliards", d.join() === "1,2,8");
  }
  {
    const t = ligne(12, "figure");
    res(12, t[1] / t[0], "0{,}88");
    res(12, t[2] / t[1], "0{,}9205");
    res(12, (1 - t[2] / t[1]) * 100, "7{,}95");
    res(12, t[2] / t[0], "0{,}81");
    res(12, moyen(t[2] / t[0], 2), "0{,}9");
    res(12, t[2] * 0.9, "36{,}45");
  }
  {
    res(13, moyen(0.8, 5), "0{,}9564");
    res(13, (1 - moyen(0.8, 5)) * 100, "4{,}36");
    res(13, 0.45 / 0.8, "0{,}5625");
    res(13, moyen(0.5625, 5), "0{,}8913");
    res(13, (1 - moyen(0.5625, 5)) * 100, "10{,}87");
    res(13, (1 - moyen(0.5625, 5)) / (1 - moyen(0.8, 5)), "2{,}5");
    vaut("13. 0,8 × 0,5625 = 0,45", 0.8 * 0.5625, 0.45, 1e-12);
    const d = valeurs(13, "schema");
    vrai("13. diagramme 100 ; 80 ; 45", d.join() === "100,80,45");
  }
  {
    pointsSuivent(14, "figure", (n) => [2, 2.6, 3, 3.8, 4.5][n], "les effectifs de l'énoncé (en dizaines)");
    const e = dessin(14, "figure").args[2].map((p) => p.y * 10);
    const C = e[4] / e[0];
    res(14, C, "2{,}25");
    res(14, moyen(C, 4), "1{,}2247");
    res(14, (moyen(C, 4) - 1) * 100, "22{,}5");
    const taux = e.slice(1).map((x, i) => (x / e[i] - 1) * 100);
    ["30", "15{,}4", "26{,}7", "18{,}4"].forEach((t, i) => res(14, taux[i], t));
    res(14, e[2] / e[1], "1{,}1538");
    res(14, e[3] / e[2], "1{,}2667");
    res(14, e[4] / e[3], "1{,}1842");
    res(14, taux.reduce((s, x) => s + x, 0) / 4, "22{,}6");
    vaut("14. √1,5 = coefficient moyen", Math.sqrt(1.5), moyen(C, 4), 1e-9);
  }
  {
    const t = ligne(15, "figure");
    const C = produit(...t.map((x) => 1 + x / 100));
    res(15, C, "1{,}1693");
    res(15, (C - 1) * 100, "16{,}93");
    res(15, moyen(C, 4), "1{,}0399");
    res(15, (moyen(C, 4) - 1) * 100, "3{,}99");
    res(15, 100 * C, "116{,}93");
    res(15, t.reduce((s, x) => s + x, 0), "16");
    res(15, t.reduce((s, x) => s + x, 0) / 4, "4");
  }
  {
    res(16, moyen(0.25, 6), "0{,}794");
    res(16, (1 - moyen(0.25, 6)) * 100, "20{,}6");
    res(16, 75 / 6, "12{,}5");
    res(16, 0.875 ** 6, "0{,}449");
    res(16, 0.875 ** 6 * 100, "45");
    res(16, moyen(0.25, 2), "0{,}5");
    const l = ligne(16, "schema");
    [0, 3, 6].forEach((h, i) => vaut(`16. tableau ${h} h`, l[i], 100 * moyen(0.25, 6) ** h, 1e-6));
  }

  /* ── ★★★ ── */
  {
    const cA = moyen(5, 60);
    const cB = moyen(2, 60);
    res(17, cA, "1{,}02719");
    res(17, (cA - 1) * 100, "2{,}72");
    res(17, cB, "1{,}01162");
    res(17, (cB - 1) * 100, "1{,}16");
    vrai("17. A plus du double de B", cA - 1 > 2 * (cB - 1));
    res(17, 1.02719 ** 25, "1{,}96");
    res(17, 1.02719 ** 26, "2{,}01");
    vrai("17. doublement en 26 ans", cA ** 25 < 2 && cA ** 26 > 2);
    const d = valeurs(17, "schema");
    vrai("17. diagramme 1 ; 5 ; 6 ; 12", d.join() === "1,5,6,12");
    vrai("17. gains : 6 millions pour B, 4 pour A", d[3] - d[2] === 6 && d[1] - d[0] === 4);
  }
  {
    const C = 50 / 200;
    res(18, C, "0{,}25");
    res(18, moyen(C, 2), "0{,}5");
    res(18, moyen(C, 4), "0{,}7071");
    res(18, 200 * moyen(C, 4), "141{,}4");
    res(18, 100 * moyen(C, 4), "70{,}7");
    res(18, moyen(C, 8), "0{,}8409");
    res(18, (1 - moyen(C, 8)) * 100, "15{,}9");
    res(18, (1 - moyen(C, 4)) * 100, "29{,}3");
    const l = ligne(18, "schema");
    [0, 1, 2, 3, 4].forEach((q, i) => vaut(`18. tableau, demi-heure ${q}`, l[i], Math.round(200 * moyen(C, 4) ** q * 10) / 10, 1e-9));
  }
  {
    res(19, 1.08 * 1.02, "1{,}1016");
    res(19, 1.05 * 1.05, "1{,}1025");
    res(19, moyen(1.1016, 2), "1{,}0496");
    res(19, (moyen(1.1016, 2) - 1) * 100, "4{,}96");
    res(19, 10000 * 1.1016, "11\\,016");
    res(19, 10000 * 1.1025, "11\\,025");
    res(19, 10000 * (1.1025 - 1.1016), "9");
    vaut("19. identité (a + b)(a − b)", 1.08 * 1.02, 1.05 ** 2 - 0.03 ** 2, 1e-12);
    const d = valeurs(19, "schema");
    vaut("19. barre A", d[0], 10000 * 1.1016, 1e-9);
    vaut("19. barre B", d[1], 10000 * 1.1025, 1e-9);
  }
  {
    const C = 1e6 / 1e3;
    res(20, C, "1\\,000");
    res(20, moyen(C, 10), "1{,}995");
    res(20, 2 ** 10, "1\\,024");
    res(20, 1e6 * C, "1\\,000\\,000\\,000");
    res(20, 1000 * moyen(C, 2), "31\\,623");
    const l = ligne(20, "schema").map((s) => Number(String(s).replace(/\s/g, "")));
    [0, 5, 10].forEach((j, i) => vaut(`20. tableau jour ${j}`, l[i], Math.round(1000 * moyen(C, 10) ** j), 1e-9));
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

    vrai("2. tableau × 2 par an", _proche(_l(2), _suite(1, 2, 4), 0));
    vrai("4. barres × 1,05 par an", _proche(_v(4), _suite(100, 1.05, 5), 0.006));
    vrai("7. tableau 100 × 1,02ⁿ", _proche(_l(7), [0, 5, 10].map((n) => 100 * 1.02 ** n), 0.006));
    vrai("8. tableau au taux moyen", _proche(_l(8), [0, 1, 2, 3, 4, 5].map((n) => 100 * 1.3 ** (n / 5)), 0.006));
  }
} catch (err) {
  vrai("le recalcul s'exécute", false, String(err?.stack ?? err));
}

F.fin("Le taux d'évolution moyen (1re)");
