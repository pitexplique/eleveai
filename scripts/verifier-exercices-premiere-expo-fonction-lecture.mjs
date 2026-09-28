// Recalcul indépendant de la feuille « Fonction exponentielle : variations et
// courbe » (1re sans spé, BOP1VE, 28/09/2026) :
// lib/fiches-exercices/maths-premiere-expo-fonction-lecture.tsx
//
// Chaque courbe dessinée est comparée, point par point, à la fonction de
// l'énoncé ; chaque lecture graphique (« entre x = 6 et x = 7 », « vers 5,4 »)
// est refaite en cherchant où la fonction franchit la hauteur, par
// dichotomie ; chaque sens de variation par la comparaison de deux images ;
// chaque nombre relu à sa place dans le corrigé. Plus le socle commun et les
// règles de rendu (scripts/verifier-exercices-premiere-expo-commun.mjs).
// Usage : node scripts/verifier-exercices-premiere-expo-fonction-lecture.mjs

import { ouvrir } from "./verifier-exercices-premiere-expo-commun.mjs";

const F = ouvrir("lib/fiches-exercices/maths-premiere-expo-fonction-lecture.tsx", "expo_fonction_lecture");
const { res, dit, vrai, vaut, dessin, courbeSuit, pointsSuivent } = F;

/** L'abscisse où f monotone atteint la hauteur k, par dichotomie sur [a ; b]. */
const atteint = (f, k, a = 0, b = 50) => {
  const monte = f(b) > f(a);
  for (let i = 0; i < 200; i++) {
    const m = (a + b) / 2;
    if ((f(m) < k) === monte) a = m;
    else b = m;
  }
  return a;
};
const sens = (a) => (a > 1 ? "croissante" : a < 1 ? "décroissante" : "constante");

try {
  /* ── ★ ── */
  vrai("1. sens", sens(1.8) === "croissante" && sens(0.7) === "décroissante" && sens(1) === "constante");
  dit(1, "$f$ est croissante", "$g$ est décroissante", "$h$ est constante");
  {
    const t = dessin(2, "schema").args;
    vaut("2. tableau f(0)", t[1][0], 2 ** t[0][0]);
    vaut("2. tableau f(3)", t[1][1], 2 ** t[0][1]);
    vrai("2. croissante : la flèche monte", t[1][1] > t[1][0] && sens(2) === "croissante");
  }
  courbeSuit(3, "figure", 0, (x) => 2 ** x, "celle de 2ˣ");
  res(3, 2 ** 2, "4");
  res(3, 2 ** 1.5, "2{,}83");
  res(3, 2 ** 1.5, "2{,}8");
  vaut("3. antécédent de 4", atteint((x) => 2 ** x, 4), 2, 1e-6);
  courbeSuit(4, "figure", 0, (x) => 1.5 ** x, "la bleue, celle de 1,5ˣ");
  courbeSuit(4, "figure", 1, (x) => 0.5 ** x, "l'orange, celle de 0,5ˣ");
  vrai("4. bleue montante, orange descendante", sens(1.5) === "croissante" && sens(0.5) === "décroissante");
  courbeSuit(5, "schema", 0, (x) => 3 ** x, "la bleue, celle de 3ˣ");
  courbeSuit(5, "schema", 1, (x) => 2 ** x, "l'orange, celle de 2ˣ");
  res(5, 3 ** 2, "9");
  res(5, 2 ** 2, "4");
  vrai("5. 3ˣ > 2ˣ pour x > 0", [0.1, 0.5, 1, 3.7].every((x) => 3 ** x > 2 ** x));
  res(6, 2 ** 3, "8");
  res(6, 2 ** 2.5, "5{,}66");
  vrai("6. entre u2 et u3, pas la moyenne", 2 ** 2.5 > 4 && 2 ** 2.5 < 8 && Math.abs(2 ** 2.5 - 6) > 0.1);
  res(7, 0.8 ** 2.5, "0{,}572");
  res(7, 0.8 ** 3, "0{,}512");
  res(7, 1.2 ** 1.5, "1{,}315");
  res(7, 1.2 ** 2, "1{,}44");
  vrai("7. ordres", 0.8 ** 2.5 > 0.8 ** 3 && 1.2 ** 1.5 < 1.2 ** 2);
  res(8, 3 * 0.5 ** 1.5, "1{,}06");
  courbeSuit(8, "schema", 0, (x) => 3 * 0.5 ** x, "celle de 3 × 0,5ˣ");
  pointsSuivent(8, "schema", (x) => 3 * 0.5 ** x, "sur la courbe");

  /* ── ★★ ── */
  {
    const V = (x) => 12 * 0.8 ** x;
    courbeSuit(9, "figure", 0, V, "celle de 12 × 0,8ˣ");
    courbeSuit(9, "schema", 0, V, "celle de 12 × 0,8ˣ");
    pointsSuivent(9, "schema", V, "sur la courbe, à la hauteur 6");
    vaut("9. la ligne de la moitié", dessin(9, "schema").args[3], 6);
    res(9, V(2), "7{,}68");
    res(9, V(2), "7{,}7");
    res(9, V(3), "6{,}14");
    const x = atteint(V, 6);
    vrai(`9. la moitié en x ≈ ${x.toFixed(3)} : un peu plus de 3 ans, environ 3 ans et un mois`, x > 3 && x < 3 + 2 / 12);
    res(9, 12000 * 0.2, "2\\,400");
  }
  {
    const E = (x) => 8 * 0.7 ** x;
    courbeSuit(10, "figure", 0, E, "celle de 8 × 0,7ˣ");
    res(10, E(1), "5{,}6");
    res(10, E(3), "2{,}74");
    res(10, E(3) * 10, "27");
    res(10, E(4), "1{,}92");
    const x = atteint(E, 2);
    vrai(`10. sous 2 dizaines en x ≈ ${x.toFixed(2)} : un peu moins de 4`, x > 3.5 && x < 4);
  }
  {
    const P = (x) => 5 * 1.2 ** x;
    courbeSuit(11, "figure", 0, P, "celle de 5 × 1,2ˣ");
    pointsSuivent(11, "figure", P, "les recensements, sur la courbe");
    res(11, P(2), "7{,}2");
    res(11, P(2.5), "7{,}89");
    vaut("11. 1925 → environ 79 000", Math.round(P(2.5) * 10) * 1000, 79000);
    dit(11, "environ $79\\,000$ habitants", "$50\\,000$, $60\\,000$ et $72\\,000$");
  }
  {
    const D = (x) => 6 * 1.1 ** x;
    courbeSuit(12, "figure", 0, D, "celle de 6 × 1,1ˣ");
    res(12, D(4), "8{,}78");
    res(12, D(5), "9{,}66");
    res(12, D(6), "10{,}63");
    const x = atteint(D, 9);
    vrai(`12. 9 km atteints en x ≈ ${x.toFixed(2)}, entre 4 et 5`, x > 4 && x < 5);
    vrai("12. 10 km dépassés à la semaine 6 seulement", D(5) < 10 && D(6) > 10);
    res(12, D(1) - D(0), "0{,}6");
    res(12, D(2) - D(1), "0{,}66");
  }
  {
    const f = (x) => 10 * 0.95 ** x;
    const g = (x) => 10 * 0.9 ** x;
    courbeSuit(13, "figure", 0, f, "la bleue, 10 × 0,95ˣ");
    courbeSuit(13, "figure", 1, g, "l'orange, 10 × 0,9ˣ");
    vaut("13. la ligne de la moitié", dessin(13, "figure").args[3], 5);
    res(13, g(6), "5{,}31");
    res(13, g(7), "4{,}78");
    res(13, f(10), "5{,}99");
    res(13, f(10) * 10, "60");
    const x = atteint(g, 5);
    vrai(`13. B à la moitié en x ≈ ${x.toFixed(2)}, entre 6 et 7`, x > 6 && x < 7);
    dit(13, "2032");
  }
  {
    courbeSuit(14, "figure", 0, (x) => 1.5 ** x, "celle de 1,5ˣ");
    pointsSuivent(14, "figure", (x) => 1.5 ** x, "A sur la courbe, en x = 1");
    res(14, 1.5 ** 2, "2{,}25");
    res(14, 1.5 ** 3, "3{,}375");
    res(14, 1.5 ** 6, "11{,}4");
  }
  {
    const f = (x) => 100 * 0.8 ** x;
    res(15, f(2.5), "57{,}2");
    res(15, f(3), "51{,}2");
    res(15, f(2), "64");
    res(15, (f(2) + f(3)) / 2, "57{,}6");
    courbeSuit(15, "schema", 0, (x) => f(x) / 10, "celle de f en dizaines");
    pointsSuivent(15, "schema", (x) => f(x) / 10, "sur la courbe");
  }
  {
    const C = (x) => 5000 * 1.04 ** x;
    const t = dessin(16, "figure").args;
    const lu = (s) => Number(String(s).replace(/\s/g, "").replace(",", "."));
    vaut("16. tableau C(0)", lu(t[1][0]), C(0));
    vaut("16. tableau C(10)", lu(t[1][1]), Math.round(C(10) * 100) / 100);
    res(16, C(10), "7\\,401{,}22");
    res(16, C(4), "5\\,849{,}29");
    res(16, C(5), "6\\,083{,}26");
    vrai("16. 6 000 dépassés à 5 ans", C(4) < 6000 && C(5) > 6000);
  }

  /* ── ★★★ ── */
  {
    const P = (x) => 1013 * 0.88 ** x;
    courbeSuit(17, "figure", 0, (x) => P(x) / 100, "celle de P en centaines de hPa");
    res(17, P(4.8), "548");
    res(17, P(0) / 2, "506{,}5");
    res(17, P(0) / 200, "5{,}1");
    const x = atteint(P, P(0) / 2);
    res(17, x, "5{,}4");
    res(17, P(5.4), "508");
    res(17, 0.88 ** 8.8, "0{,}325");
    vrai("17. environ un tiers", Math.abs(0.88 ** 8.8 - 1 / 3) < 0.02);
  }
  {
    const A = (t) => 3 * 1.03 ** t;
    const B = (t) => 2 * 1.05 ** t;
    courbeSuit(18, "figure", 0, (d) => A(10 * d), "la bleue, A en décennies");
    courbeSuit(18, "figure", 1, (d) => B(10 * d), "l'orange, B en décennies");
    res(18, A(20), "5{,}42");
    res(18, B(20), "5{,}31");
    res(18, A(25), "6{,}28");
    res(18, B(25), "6{,}77");
    const t = atteint((u) => B(u) - A(u), 0, 0, 60);
    vrai(`18. B dépasse A en t ≈ ${t.toFixed(2)} : vers 1971`, Math.round(1950 + t) === 1971);
  }
  {
    const V = (x) => 1000 * 0.7 ** x;
    courbeSuit(19, "figure", 0, (x) => V(x) / 100, "celle de V en centaines");
    res(19, V(2), "490");
    res(19, 0.7 ** 2, "0{,}49");
    res(19, V(1.5), "585{,}66");
    res(19, V(1.5), "586");
    const x = atteint(V, 500);
    vrai(`19. la moitié en x ≈ ${x.toFixed(2)} : un peu moins de 2 ans`, x > 1.8 && x < 2);
    vrai("19. 600 € : plus que le modèle", 600 > V(1.5));
  }
  {
    const f = (x) => 8 * 1.1 ** x;
    const g = (x) => 8 * 0.85 ** x;
    courbeSuit(20, "figure", 0, f, "la bleue, 8 × 1,1ˣ");
    courbeSuit(20, "figure", 1, g, "l'orange, 8 × 0,85ˣ");
    res(20, f(3), "10{,}65");
    res(20, f(3), "10{,}6");
    res(20, g(3), "4{,}91");
    res(20, g(3), "4{,}9");
    res(20, 0.85 ** 3, "0{,}614125");
    res(20, f(3) - g(3), "5{,}7");
    res(20, g(4), "4{,}18");
    res(20, g(5), "3{,}55");
    const x = atteint(g, 4);
    vrai(`20. sous 4 milliers en x ≈ ${x.toFixed(2)} : un peu plus de 4 ans`, x > 4 && x < 4.5);
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

    courbeSuit(1, "schema", 0, (x) => 1.8 ** x, "celle de 1,8ˣ");
    courbeSuit(1, "schema", 1, (x) => 0.7 ** x, "celle de 0,7ˣ");
    courbeSuit(1, "schema", 2, () => 1, "celle de 1ˣ");
    courbeSuit(6, "schema", 0, (x) => 2 ** x, "celle de 2ˣ");
    pointsSuivent(6, "schema", (x) => 2 ** x, "sur la courbe de 2ˣ");
    courbeSuit(7, "schema", 0, (x) => 0.8 ** x, "celle de 0,8ˣ");
    courbeSuit(7, "schema", 1, (x) => 1.2 ** x, "celle de 1,2ˣ");
    {
      const m = _d(7)[2];
      vrai("7. points sur 0,8ˣ (x ≥ 2,5) et 1,2ˣ (x ≤ 2)", m.every((p) => Math.abs((p.x >= 2.5 ? 0.8 : 1.2) ** p.x - p.y) <= 0.006));
    }
  }
} catch (err) {
  vrai("le recalcul s'exécute", false, String(err?.stack ?? err));
}

F.fin("Fonction exponentielle : variations et courbe (1re)");
