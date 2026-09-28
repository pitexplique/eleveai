// Recalcul indépendant de la feuille « Suite géométrique : le terme général »
// (1re sans spé, BOP1VE, 28/09/2026) :
// lib/fiches-exercices/maths-premiere-expo-suite-terme-general.tsx
//
// Chaque terme annoncé est refait par MULTIPLICATIONS SUCCESSIVES (jamais par
// la formule qu'enseigne la feuille), chaque sens de variation par la
// comparaison de deux termes consécutifs, chaque nombre relu à sa place dans
// le corrigé ; les points, tableaux et diagrammes sont rejoués et comparés à
// la suite. Plus le socle commun et les règles de rendu
// (scripts/verifier-exercices-premiere-expo-commun.mjs).
// Usage : node scripts/verifier-exercices-premiere-expo-suite-terme-general.mjs

import { ouvrir } from "./verifier-exercices-premiere-expo-commun.mjs";

const F = ouvrir("lib/fiches-exercices/maths-premiere-expo-suite-terme-general.tsx", "expo_suite_terme_general");
const { res, dit, vrai, vaut, dessin, pointsSuivent, courbeSuit } = F;

/** u_n par n multiplications successives. */
const u = (u0, q, n) => {
  let x = u0;
  for (let i = 0; i < n; i++) x *= q;
  return x;
};
const arr = (x, d) => Math.round(x * 10 ** d + 1e-7) / 10 ** d;
const sens = (u0, q) => (u(u0, q, 1) > u0 ? "croissante" : u(u0, q, 1) < u0 ? "décroissante" : "constante");
const ligne = (k, role) => dessin(k, role).args[1].slice(1);
const valeurs = (k, role) => dessin(k, role).args[1].map((x) => x.value);

try {
  /* ── ★ ── */
  res(1, u(3, 2, 5), "96");
  dit(1, "3 \\times 2^n");
  res(2, u(5000, 0.8, 3), "2\\,560");
  res(2, u(1, 0.8, 3), "0{,}512");
  res(2, 0.8 * 3, "2{,}4");
  res(3, u(7, 1.5, 0), "7");
  res(3, u(7, 1.5, 2), "15{,}75");
  res(3, 1.5 * 1.5, "2{,}25");
  vrai("4a. croissante", sens(10, 1.3) === "croissante" && /\(u_n\)\$ est croissante/.test(F.c(4)));
  vrai("4b. décroissante", sens(50, 0.6) === "décroissante" && /\(v_n\)\$ est décroissante/.test(F.c(4)));
  vrai("4c. constante", sens(8, 1) === "constante" && /\(w_n\)\$ est constante/.test(F.c(4)));
  vrai("5. décroissante", sens(400, 0.9) === "décroissante" && F.c(5).includes("décroissante"));
  res(5, u(400, 0.9, 1), "360");
  res(5, u(400, 0.9, 2), "324");
  res(6, 6 / 3, "2");
  res(6, u(6 / 3, 3, 4), "162");
  res(6, u(6, 3, 1), "18");
  {
    ["6", "3", "1{,}5", "0{,}75", "0{,}375"].forEach((t, n) => res(7, u(6, 0.5, n), t));
    pointsSuivent(7, "schema", (n) => u(6, 0.5, n), "ceux de 6 × 0,5ⁿ");
  }
  res(8, u(12000, 1.05, 2), "13\\,230");
  res(8, 1.05 * 1.05, "1{,}1025");
  dit(8, "2020 + 2 = 2022");

  /* ── ★★ ── */
  {
    res(9, u(5000, 1.03, 5), "5\\,796{,}37");
    res(9, u(5000, 1.03, 10), "6\\,719{,}58");
    res(9, u(1, 1.03, 10), "1{,}344");
    res(9, (u(1, 1.03, 10) - 1) * 100, "34{,}4");
    const l = ligne(9, "schema");
    [0, 5, 10].forEach((n, i) => vaut(`9. tableau, année ${n}`, l[i], arr(u(5000, 1.03, n), 2)));
  }
  {
    vrai("10. décroissante", sens(12, 0.9) === "décroissante");
    res(10, u(12, 0.9, 3), "8{,}748");
    res(10, u(12, 0.9, 3), "8{,}75");
    res(10, u(12, 0.9, 5), "7{,}09");
    res(10, u(1, 0.9, 3), "0{,}729");
    vrai("10. plus de la moitié de 12 V", u(12, 0.9, 5) > 6);
    pointsSuivent(10, "schema", (n) => u(12, 0.9, n), "ceux de 12 × 0,9ⁿ");
  }
  {
    res(11, u(3, 1.02, 10), "3{,}66");
    res(11, u(3, 1.02, 40), "6{,}62");
    pointsSuivent(11, "figure", (d) => u(3, 1.02, 10 * d), "ceux de 3 × 1,02ⁿ tous les dix ans");
    vrai("11. le modèle en prévoit trop", u(3, 1.02, 40) > 6.1);
  }
  {
    const d = valeurs(12, "figure");
    d.slice(1).forEach((x, i) => vaut(`12. quotient ${i + 1}`, x / d[i], 1.2));
    res(12, u(d[0], 1.2, 6), "373{,}2");
    res(12, u(d[0], 1.2, 6), "373");
    res(12, 2028 - 2022, "6");
  }
  {
    res(13, u(800, 0.95, 10), "479");
    res(13, (1 - u(1, 0.95, 10)) * 100, "40");
    vrai("13. pas divisé par deux", u(800, 0.95, 10) > 400);
    const l = ligne(13, "schema");
    [0, 5, 10].forEach((n, i) => vaut(`13. tableau ${2025 + n}`, l[i], arr(u(800, 0.95, n), 2)));
  }
  {
    pointsSuivent(14, "figure", (n) => u(1, 2, n), "ceux de 2ⁿ");
    const m = dessin(14, "figure").args[2];
    vrai("14. 1 + n ne passe pas par les points", m.some((p) => 1 + p.x !== p.y));
    vrai("14. 2n ne passe pas par les points", m.some((p) => 2 * p.x !== p.y));
    res(14, u(1, 2, 10), "1\\,024");
    vaut("14. jour 19 : moitié du jour 20", u(1, 2, 19) * 2, u(1, 2, 20));
    vaut("14. jour 10 : un millième environ", u(1, 2, 10) / u(1, 2, 20), 1 / 1024);
  }
  {
    res(15, u(1000, 1.1, 3), "1\\,331");
    res(15, u(1000, 0.7, 3), "343");
    vrai("15. v croissante, u décroissante", sens(1000, 1.1) === "croissante" && sens(1000, 0.7) === "décroissante");
    pointsSuivent(15, "schema", (n) => u(10, 1.1, n), "ceux de v en centaines");
    courbeSuit(15, "schema", 0, (n) => u(10, 0.7, n), "celle de u en centaines");
  }
  {
    res(16, u(250, 0.98, 10), "204{,}3");
    res(16, 250 - arr(u(250, 0.98, 10), 1), "45{,}7");
    vrai("16. décroissante", sens(250, 0.98) === "décroissante");
    const l = ligne(16, "schema");
    [0, 5, 10].forEach((n, i) => vaut(`16. tableau ${2020 + n}`, l[i], arr(u(250, 0.98, n), 2)));
  }

  /* ── ★★★ ── */
  {
    const p = (n) => u(20000, 1.03, n);
    ["26\\,900", "36\\,100", "48\\,500", "65\\,200", "87\\,700"].forEach((t, i) => vaut(`17. ${1860 + 10 * i} à la centaine`, Math.round(p(10 * (i + 1)) / 100) * 100, Number(t.replace("\\,", ""))));
    ["26\\,900", "36\\,100", "48\\,500", "65\\,200", "87\\,700"].forEach((t) => dit(17, `\\approx ${t}$`));
    res(17, u(1, 1.03, 50), "4{,}38");
    res(17, u(1, 1.03, 10), "1{,}34");
    res(17, ((p(50) - 80000) / 80000) * 100, "10");
    pointsSuivent(17, "schema", (d) => p(10 * d) / 10000, "la population en dizaines de milliers, tous les dix ans");
  }
  {
    const E = (n) => u(60, 0.8, n);
    res(18, 80 - 20, "60");
    res(18, 20 + E(5), "39{,}7");
    res(18, u(1, 0.8, 5), "0{,}32768");
    res(18, 20 + E(1), "68");
    res(18, 20 + E(2), "58{,}4");
    res(18, (20 + E(1)) / 80, "0{,}85");
    res(18, (20 + E(2)) / (20 + E(1)), "0{,}86");
    vrai("18. T n'est pas géométrique", Math.abs((20 + E(1)) / 80 - (20 + E(2)) / (20 + E(1))) > 0.001);
    pointsSuivent(18, "schema", (n) => E(n) / 10, "les écarts en dizaines de degrés");
  }
  {
    const s = u(2000, 1.015, 20);
    const p = u(2000, 1.02, 20);
    res(19, s, "2\\,694");
    res(19, p, "2\\,972");
    res(19, p - s, "278");
    res(19, s / p, "0{,}906");
    res(19, (s / p) * 100, "90{,}6");
    res(19, (1 - s / p) * 100, "9");
    const d = valeurs(19, "schema");
    vaut("19. barre 2025", d[0], 2000);
    vaut("19. barre salaire", d[1], Math.round(s));
    vaut("19. barre panier", d[2], Math.round(p));
  }
  {
    const a = (n) => u(5000, 1.2, n);
    ["6\\,000", "7\\,200", "8\\,640", "10\\,368", "12\\,441{,}6"].forEach((t, i) => res(20, a(i + 1), t));
    res(20, a(5), "12\\,442");
    vrai("20. doublé au bout de 4 semaines", a(3) < 10000 && a(4) > 10000);
    vrai("20. 52 semaines : plus de 60 millions", a(52) > 60e6);
    pointsSuivent(20, "schema", (n) => a(n) / 1000, "les abeilles en milliers");
    vaut("20. la ligne du double (en milliers)", dessin(20, "schema").args[3], 10);
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

    vrai("1. tableau = 3 × 2ⁿ", _proche(_l(1), [0, 1, 2, 5].map((n) => 3 * 2 ** n), 1e-9));
    pointsSuivent(2, "schema", (n) => (5000 * 0.8 ** n) / 1000, "5 000 × 0,8ⁿ en milliers");
    vrai("3. tableau = 7 × 1,5ⁿ", _proche(_l(3), _suite(7, 1.5, 3), 1e-9));
    courbeSuit(4, "schema", 0, (n) => (10 * 1.3 ** n) / 5, "u/5 = 10 × 1,3ⁿ / 5");
    courbeSuit(4, "schema", 1, (n) => (50 * 0.6 ** n) / 5, "v/5 = 50 × 0,6ⁿ / 5");
    courbeSuit(4, "schema", 2, () => 8 / 5, "w/5 = 8/5");
    pointsSuivent(5, "schema", (n) => (400 * 0.9 ** n) / 100, "400 × 0,9ⁿ en centaines");
    vrai("6. tableau = 2 × 3ⁿ", _proche(_l(6), _suite(2, 3, 5), 1e-9));
    vrai("8. barres = 12 000 × 1,05ⁿ", _proche(_v(8), _suite(12000, 1.05, 3), 1e-6));
  }
} catch (err) {
  vrai("le recalcul s'exécute", false, String(err?.stack ?? err));
}

F.fin("Suite géométrique : le terme général (1re)");
