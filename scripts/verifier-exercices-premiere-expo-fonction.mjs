// Recalcul indépendant de la feuille « La fonction exponentielle x ↦ aˣ »
// (1re sans spé, BOP1VE, 28/09/2026) :
// lib/fiches-exercices/maths-premiere-expo-fonction.tsx
//
// Chaque image annoncée est refaite avec `Math.pow` (le calcul de la
// calculatrice), chaque racine n-ième vérifiée en l'élevant à la puissance n,
// chaque propriété sur ses deux membres ; chaque nombre relu à sa place dans
// le corrigé ; les courbes, tableaux et diagrammes rejoués et comparés à la
// fonction. Plus le socle commun et les règles de rendu
// (scripts/verifier-exercices-premiere-expo-commun.mjs).
// Usage : node scripts/verifier-exercices-premiere-expo-fonction.mjs

import { ouvrir } from "./verifier-exercices-premiere-expo-commun.mjs";

const F = ouvrir("lib/fiches-exercices/maths-premiere-expo-fonction.tsx", "expo_fonction");
const { res, dit, vrai, vaut, dessin, courbeSuit, pointsSuivent } = F;

const arr = (x, d) => Math.round(x * 10 ** d + 1e-7) / 10 ** d;
const ligne = (k, role) => dessin(k, role).args[1].slice(1);
const valeurs = (k, role) => dessin(k, role).args[1].map((x) => x.value);
/** La racine n-ième par dichotomie — un autre chemin que Math.pow(a, 1/n). */
const racine = (a, n) => {
  let [lo, hi] = [0, Math.max(1, a)];
  for (let i = 0; i < 100; i++) {
    const m = (lo + hi) / 2;
    if (m ** n < a) lo = m;
    else hi = m;
  }
  return lo;
};

try {
  /* ── ★ ── */
  res(1, 3 ** 4, "81");
  res(1, 4 ** 3, "64");
  dit(1, "$f(x) = 3^x$ : oui", "$k(x) = 0{,}5^x$ : oui", "$g(x) = x^3$ : non", "$h(x) = 3x$ : non");
  res(2, 2 ** 0, "1");
  res(2, 2 ** 3, "8");
  res(2, 2 ** 5, "32");
  ["1", "0{,}5", "0{,}25", "0{,}125"].forEach((t, x) => res(3, 0.5 ** x, t));
  res(4, 2 ** 3 * 2 ** 4, "128");
  dit(4, "= 2^7");
  res(5, 5 ** 1.5 * 5 ** 0.5, "25");
  res(5, 5 ** 1.5, "11{,}18");
  res(5, Math.sqrt(5), "2{,}236");
  vaut("6. 9^(1/2)", racine(9, 2), 3, 1e-9);
  vaut("6. 8^(1/3)", racine(8, 3), 2, 1e-9);
  vaut("6. 16^(1/4)", racine(16, 4), 2, 1e-9);
  dit(6, "c'est $3$", "c'est $2$, car $2^3 = 8$", "c'est $2$, car $2^4 = 16$");
  res(7, 1.5 ** 2, "2{,}25");
  res(7, 1.5 ** 2.5, "2{,}76");
  res(7, 1.5 ** 3, "3{,}375");
  courbeSuit(7, "schema", 0, (x) => 1.5 ** x, "celle de 1,5ˣ");
  res(8, racine(2, 2), "1{,}414");
  res(8, 4 ** 1.5, "8");
  res(8, 4 * 1.5, "6");

  /* ── ★★ ── */
  {
    const l = ligne(9, "figure");
    ["0", "0,5", "1", "1,5", "2"].forEach((x, i) => vrai(`9. tableau en x = ${x}`, l[i] === "?" || Number(l[i]) === 3 ** Number(x.replace(",", "."))));
    res(9, 3 ** 0.5, "1{,}73");
    res(9, 3 ** 1.5, "5{,}20");
    vaut("9. √3 × √3 = 3", racine(3, 2) ** 2, 3, 1e-9);
    courbeSuit(9, "schema", 0, (x) => 3 ** x, "celle de 3ˣ");
    pointsSuivent(9, "schema", (x) => 3 ** x, "sur la courbe de 3ˣ");
  }
  {
    const P = (x) => 600 * 1.03 ** x;
    res(10, P(4), "675{,}31");
    res(10, P(2.5), "646{,}02");
    const l = ligne(10, "schema");
    [0, 1, 2, 2.5, 3].forEach((x, i) => vaut(`10. tableau en ${x}`, l[i], arr(P(x), 2)));
  }
  {
    const C = (x) => 20 * 0.75 ** x;
    res(11, C(1), "15");
    res(11, C(2), "11{,}25");
    res(11, 0.75 ** 2, "0{,}5625");
    res(11, C(0.5), "17{,}32");
    res(11, C(0.5) / 20, "0{,}866");
    res(11, (1 - C(0.5) / 20) * 100, "13{,}4");
    vaut("11. C(x+1) = 0,75 C(x)", C(3.7) * 0.75, C(4.7), 1e-12);
    const l = ligne(11, "schema");
    [0, 0.5, 1, 2].forEach((x, i) => vaut(`11. tableau en ${x}`, l[i], arr(C(x), 2)));
  }
  {
    const P = (x) => 10 * 1.02 ** x;
    res(12, P(35), "20{,}0");
    res(12, P(70), "40{,}0");
    res(12, (1.02 ** 70 - 1) * 100, "300");
    res(12, 2 * 70, "140");
    const d = valeurs(12, "schema");
    [0, 35, 70].forEach((x, i) => vaut(`12. barre ${1950 + x}`, d[i], Math.round(P(x))));
  }
  {
    const a = racine(2, 4);
    res(13, a, "1{,}189");
    res(13, (a - 1) * 100, "18{,}9");
    res(13, 1.25 ** 4, "2{,}44");
    ligne(13, "schema").forEach((x, i) => vaut(`13. tableau mois ${4 * i}`, x, 1000 * 2 ** i));
  }
  {
    const l = ligne(14, "figure");
    l.forEach((x, i) => vaut(`14. tableau semaine ${i}`, x, 5 * 3 ** i));
    res(14, 5 * 3 ** 0.5, "8{,}7");
    res(14, 5000 * 3 ** 0.5, "8\\,660");
    res(14, 5 * 3 ** 4, "405");
  }
  {
    const C = (x) => 80 * 0.9 ** x;
    res(15, C(2), "64{,}8");
    res(15, C(5), "47{,}2");
    res(15, C(0.5), "75{,}9");
    res(15, C(0.5) / 80, "0{,}949");
    res(15, (1 - C(0.5) / 80) * 100, "5{,}1");
    res(15, 0.9 * 0.9, "0{,}81");
    vaut("15. C(x+2) = 0,81 C(x)", C(1.3) * 0.81, C(3.3), 1e-12);
    courbeSuit(15, "schema", 0, (x) => C(x) / 10, "celle de C en dizaines");
    pointsSuivent(15, "schema", (x) => C(x) / 10, "sur la courbe de C");
  }
  {
    res(16, 1.344 * 1.344, "1{,}806");
    res(16, 1.03 ** 20, "1{,}806");
    res(16, 700 * 1.03 ** 20, "1\\,264");
    res(16, 2 * 1.344, "2{,}688");
    res(16, 1.03 ** 10, "1{,}344");
    const d = valeurs(16, "schema");
    vaut("16. barre 2035", d[1], 700 * 1.344);
    vaut("16. barre 2045", d[2], Math.round(700 * 1.03 ** 20));
  }

  /* ── ★★★ ── */
  {
    const a = racine(1.04, 12);
    res(17, a, "1{,}00327");
    res(17, (a - 1) * 100, "0{,}327");
    res(17, 4 / 12, "0{,}333");
    res(17, 1.00333 ** 12, "1{,}0407");
    res(17, (1.00333 ** 12 - 1) * 100, "4{,}07");
    res(17, 10000 * 1.04 ** 1.5, "10\\,605{,}96");
    vaut("17. a^18 = 1,04^1,5", a ** 18, 1.04 ** 1.5, 1e-9);
    const l = ligne(17, "schema");
    [0, 6, 12, 18].forEach((m, i) => vaut(`17. tableau mois ${m}`, l[i], arr(10000 * a ** m, 2)));
  }
  {
    const f = (x) => 0.5 ** x;
    ["0{,}5", "0{,}25", "0{,}125"].forEach((t, i) => res(18, f(i + 1), t));
    res(18, racine(0.5, 2), "0{,}707");
    res(18, f(0.5) * 100, "70{,}7");
    res(18, (1 - f(0.5)) * 100, "29{,}3");
    res(18, f(1.5), "0{,}354");
    vrai("18. arrête plus d'un quart", 1 - f(0.5) > 0.25);
    courbeSuit(18, "schema", 0, (x) => 10 * f(x), "celle de 0,5ˣ en dixièmes");
    pointsSuivent(18, "schema", (x) => 10 * f(x), "sur la courbe");
  }
  {
    const a = racine(8, 3);
    vaut("19. a = 2", a, 2, 1e-9);
    res(19, 2 ** 0.5, "1{,}41");
    res(19, 2 ** 2.5, "5{,}66");
    res(19, (8 / 3) ** 3, "19");
    vrai("19. 4 millions en 2 h, 32 en 5 h", 2 ** 2 === 4 && 2 ** 5 === 32);
    courbeSuit(19, "schema", 0, (x) => 2 ** x, "celle de 2ˣ");
    pointsSuivent(19, "schema", (x) => 2 ** x, "sur la courbe de 2ˣ");
  }
  {
    const P = (x) => 1200 * 0.98 ** x;
    res(20, P(10), "980");
    res(20, P(30), "655");
    res(20, P(50), "437");
    res(20, 0.98 ** 10, "0{,}817");
    res(20, (1 - 0.98 ** 10) * 100, "18{,}3");
    res(20, 0.98 ** 50, "0{,}364");
    res(20, 0.98 ** 50 * 100, "36");
    const d = valeurs(20, "schema");
    [0, 10, 30, 50].forEach((x, i) => vaut(`20. barre ${1950 + x}`, d[i], Math.round(P(x))));
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

    courbeSuit(1, "schema", 0, (x) => 3 ** x, "celle de 3ˣ");
    courbeSuit(1, "schema", 1, (x) => x ** 3, "celle de x³");
    vrai("2. tableau = 2ˣ", _proche(_l(2), [0, 1, 2, 3, 4, 5].map((x) => 2 ** x), 1e-9));
    courbeSuit(3, "schema", 0, (x) => 0.5 ** x, "celle de 0,5ˣ");
    pointsSuivent(3, "schema", (x) => 0.5 ** x, "sur la courbe de 0,5ˣ");
    vrai("4. tableau 2³, 2⁴, 2⁷", _proche(_l(4), [8, 16, 128], 0));
    vrai("5. tableau 5^1,5 ; 5^0,5 ; produit", _proche(_l(5), [5 ** 1.5, 5 ** 0.5, 25], 0.005));
    vrai("6. tableau des racines", _proche(_l(6), [9 ** 0.5, 8 ** (1 / 3), 16 ** 0.25], 1e-9));
  }
} catch (err) {
  vrai("le recalcul s'exécute", false, String(err?.stack ?? err));
}

F.fin("La fonction exponentielle x ↦ aˣ (1re)");
