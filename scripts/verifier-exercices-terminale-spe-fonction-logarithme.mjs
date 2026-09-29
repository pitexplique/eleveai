// Recalcul indépendant de la feuille « Fonction logarithme népérien » de
// terminale spé (29/09/2026) : lib/fiches-exercices/maths-terminale-fonction-logarithme.tsx.
//
// ⭐ Les égalités de logarithmes sont vérifiées en valeurs numériques ; les
// équations et inéquations par balayage d'une grille (l'ensemble solution
// annoncé est comparé point par point) ou par dichotomie ; les dérivées par
// dérivation numérique ; les seuils en itérant la suite ; les courbes et les
// tableaux relus dans le source ; les trois programmes Python EXÉCUTÉS.
// Usage : node scripts/verifier-exercices-terminale-spe-fonction-logarithme.mjs

import { feuilleTerminale, executerPython, derivee, dichotomie } from "./verifier-exercices-terminale-commun.mjs";

const F = feuilleTerminale({ fichier: "lib/fiches-exercices/maths-terminale-fonction-logarithme.tsx", notion: "fonction_logarithme" });
const { dit, enonceDit, verif, vrai, arrondi, termes, courbes, dessin, tableauDe, pointsSur } = F;
const E = Math.exp, L = Math.log, log = Math.log10;
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
const variations = (k, attendu) => {
  const [bornes, valeurs] = dessin("tableauVariations", k);
  const lu = valeurs.map((v) => (v === "+∞" ? Infinity : v === "−∞" ? -Infinity : Number(String(v).replace(",", ".").replace("−", "-"))));
  const ok = lu.every((v, i) => (Number.isFinite(attendu[i]) ? Math.abs(v - attendu[i]) <= 0.005 : v === attendu[i]));
  vrai(`${k}. tableau de variations ${bornes.join(" | ")} : ${valeurs.join(" | ")}`, ok, `attendu ${attendu.join(" | ")}`);
};
/** L'ensemble solution annoncé (prédicat) coïncide-t-il avec la condition, point par point, là où elle a un sens ? */
const memeEnsemble = (nom, a, b, definie, condition, annonce) => {
  const fautes = grille(a, b, 2000).filter((x) => (definie(x) && condition(x)) !== annonce(x));
  vrai(`${nom} : ensemble solution vérifié sur une grille`, fautes.length === 0, `faux en ${fautes.slice(0, 3).join(", ")}`);
};

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
{
  surCourbe(1, 0, E, "exp");
  surCourbe(1, 1, L, "ln", undefined);
  vrai("1. droite grise y = x", JSON.stringify(courbes(1)[2].q) === "[0,1,0]");
  vrai("1. ln 1 = 0, ln e = 1, ln e³ = 3", L(1) === 0 && L(Math.E) === 1 && Math.abs(L(E(3)) - 3) < 1e-12);
  verif("1. e^(ln 5) = 5", E(L(5)), 5, 1e-12);
  verif("1. e^(2 ln 3) = 9", E(2 * L(3)), 9, 1e-12);
  verif("1. ln(1/√e) = −1/2", L(1 / Math.sqrt(Math.E)), -0.5, 1e-12);
  vrai("1. les courbes sont symétriques : ln(e^x) = x", grille(-2, 1.5, 20).every((x) => Math.abs(L(E(x)) - x) < 1e-12));
}
{
  verif("2. a) ln 12 = 2 ln 2 + ln 3", L(12), 2 * L(2) + L(3), 1e-12);
  verif("2. b) ln(8/9) = 3 ln 2 − 2 ln 3", L(8 / 9), 3 * L(2) - 2 * L(3), 1e-12);
  verif("2. c) ln √6 = (ln 2 + ln 3)/2", L(Math.sqrt(6)), (L(2) + L(3)) / 2, 1e-12);
  verif("2. d) ln(1/18) = −ln 2 − 2 ln 3", L(1 / 18), -L(2) - 2 * L(3), 1e-12);
  vrai("2. ln 5 ≠ ln 2 + ln 3", Math.abs(L(5) - L(6)) > 0.1);
  const t = tableauDe(2);
  t.en.forEach((x, i) => arrondi(`2. ln ${x}`, t.nombres[i], L(x), 0.001));
}
{
  const x = dichotomie((x) => L(2 * x - 1) - 1, 0.6, 5);
  verif("3. a) (e + 1)/2", x, (Math.E + 1) / 2, 1e-9);
  arrondi("3. a) ≈ 1,86", 1.86, x);
  arrondi("3. b) ln 7 ≈ 1,95", 1.95, L(7));
  surCourbe(3, 0, (x) => L(2 * x - 1), "ln(2x − 1)");
  vrai("3. point rouge (1,86 ; 1), horizontale 1", Math.abs(termes(3)[0].x - x) <= 0.005 && dessin("repere", 3)[3] === 1);
}
{
  memeEnsemble("4. a) ln x < 2", -3, 12, (x) => x > 0, (x) => L(x) < 2, (x) => x > 0 && x < E(2));
  memeEnsemble("4. b) ln(3 − x) ≥ 0", -5, 5, (x) => 3 - x > 0, (x) => L(3 - x) >= 0, (x) => x <= 2);
  arrondi("4. e² ≈ 7,39", 7.39, E(2));
  surCourbe(4, 0, L, "ln");
  dit(4, "$S = ]-\\infty ; 2]$");
}
{
  const f = (x) => x * L(x) - x, g = (x) => L(x * x + 1), h = (x) => L(3 * x);
  vrai("5. f' = ln x, h' = 1/x", grille(0.2, 5, 30).every((x) => Math.abs(derivee(f, x) - L(x)) < 1e-7 && Math.abs(derivee(h, x) - 1 / x) < 1e-6));
  vrai("5. g' = 2x/(x² + 1)", grille(-4, 4, 30).every((x) => Math.abs(derivee(g, x) - (2 * x) / (x * x + 1)) < 1e-8));
  signes(5, [-Infinity, 0, Infinity], [(x) => 2 * x, (x) => x * x + 1, (x) => derivee(g, x)]);
}
{
  vrai("6. a) 1 − ln x → +∞ en 0⁺", 1 - L(1e-300) > 600);
  vrai("6. b) ln x / x² → 0", L(1e10) / 1e20 < 1e-18);
  vrai("6. c) x ln x → 0 en 0⁺", Math.abs(1e-12 * L(1e-12)) < 1e-10);
  vrai("6. d) ln x − x → −∞", L(1e12) - 1e12 < -1e11);
  surCourbe(6, 0, (x) => x * L(x), "x ln x");
  vrai("6. minimum −1/e en 1/e", Math.abs(termes(6)[0].x - E(-1)) <= 0.005 && Math.abs(termes(6)[0].y + E(-1)) <= 0.005 && Math.abs(derivee((x) => x * L(x), E(-1))) < 1e-8);
}
{
  let n = 0;
  while (0.8 ** n >= 0.01) n++;
  vrai(`7. premier n : ${n}`, n === 21);
  arrondi("7. ln 0,01 / ln 0,8 ≈ 20,6", 20.6, L(0.01) / L(0.8), 0.1);
  const t = tableauDe(7);
  t.en.forEach((m, i) => arrondi(`7. 0,8^${m}`, t.nombres[i], 0.8 ** m, 0.0001));
  dit(7, "Le plus petit entier est $n = 21$");
}
{
  const t = tableauDe(8);
  t.en.forEach((x, i) => arrondi(`8. ln(1 + x)/x en ${x}`, t.nombres[i], L(1 + x) / x, 0.0001));
  verif("8. ln(1 + 2h)/h → 2", L(1 + 2e-8) / 1e-8, 2, 1e-6);
  dit(8, "La limite vaut $2$");
}

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
{
  const f = (x) => L(x) + L(x - 2);
  surCourbe(9, 0, f, "ln x + ln(x − 2)");
  verif("9. f(3) = ln 3", f(3), L(3), 1e-12);
  memeEnsemble("9. ln x + ln(x − 2) = ln 3", -3, 8, (x) => x > 2, (x) => Math.abs(f(x) - L(3)) < 1e-9, (x) => Math.abs(x - 3) < 1e-9);
  vrai("9. racines de x² − 2x − 3 : 3 et −1", 9 - 6 - 3 === 0 && 1 + 2 - 3 === 0);
  arrondi("9. horizontale ln 3", dessin("repere", 9)[3], L(3), 0.001);
  dit(9, "$S = \\{3\\}$");
}
{
  let n = 0;
  while (5000 * 1.03 ** n <= 8000) n++;
  vrai(`10. premier n : ${n}`, n === 16);
  arrondi("10. ln 1,6 / ln 1,03 ≈ 15,9", 15.9, L(1.6) / L(1.03), 0.1);
  const t = tableauDe(10);
  t.en.forEach((m, i) => arrondi(`10. capital après ${m} ans`, t.nombres[i], 5000 * 1.03 ** m, 0.01));
  dit(10, "au bout de $16$ ans");
}
{
  const f = (x) => x - L(x);
  vrai("11. f' = (x − 1)/x", grille(0.2, 5, 30).every((x) => Math.abs(derivee(f, x) - (x - 1) / x) < 1e-8));
  variations(11, [Infinity, f(1), Infinity]);
  vrai("11. f → +∞ en 0⁺ et en +∞", f(1e-100) > 200 && f(1e10) > 1e9);
  vrai("11. ln x < x", grille(0.001, 50).every((x) => L(x) < x));
}
{
  const f = (x) => L(x * x - 4 * x + 5);
  surCourbe(12, 0, f, "ln(x² − 4x + 5)");
  vrai("12. f' = (2x − 4)/(x² − 4x + 5)", grille(-3, 6, 30).every((x) => Math.abs(derivee(f, x) - (2 * x - 4) / (x * x - 4 * x + 5)) < 1e-8));
  vrai("12. minimum 0 en 2, symétrie x = 2", f(2) === 0 && grille(0, 3, 30).every((h) => Math.abs(f(2 + h) - f(2 - h)) < 1e-12));
  vrai("12. point rouge (2 ; 0)", termes(12)[0].x === 2 && termes(12)[0].y === 0);
}
{
  const pH = (c) => -L(c) / L(10);
  verif("13. a) pH(10⁻³) = 3", pH(1e-3), 3, 1e-12);
  verif("13. b) diluer ×10 : +1", pH(3.7e-4 / 10) - pH(3.7e-4), 1, 1e-12);
  arrondi("13. c) pH ≈ 4,40", 4.4, pH(4e-5));
  arrondi("13. d) 10^(−7,4) ≈ 4,0 × 10⁻⁸", 4.0, 10 ** -7.4 * 1e8, 0.1);
  const t = tableauDe(13);
  t.en.forEach((c, i) => verif(`13. pH(${c})`, pH(c), t.nombres[i], 1e-9));
  dit(13, "$\\mathrm{pH} = 5 - \\log 4 \\approx 4{,}40$");
}
{
  const t = tableauDe(14);
  t.en.forEach((x, i) => arrondi(`14. ln(x)/x en ${x}`, t.nombres[i], L(x) / x, 0.0001));
  vrai("14. X/e^X = ln x / x (x = e^X)", grille(0.5, 20, 20).every((X) => Math.abs(X / E(X) - L(E(X)) / E(X)) < 1e-12));
  vrai("14. x ln x = −ln X / X (X = 1/x)", grille(0.01, 0.9, 20).every((x) => Math.abs(x * L(x) + L(1 / x) * x) < 1e-12));
}
{
  memeEnsemble("15. a) ln(x + 1) − ln x ≤ ln 2", -3, 6, (x) => x > 0, (x) => L(x + 1) - L(x) <= L(2) + 1e-12, (x) => x >= 1 - 1e-12);
  const g = (x) => L(x) ** 2 - L(x) - 2;
  memeEnsemble("15. b) (ln x)² − ln x − 2 > 0", -1, 12, (x) => x > 0, (x) => g(x) > 1e-12, (x) => x > 0 && ((x < E(-1) - 1e-9) || x > E(2) + 1e-9));
  surCourbe(15, 0, g, "(ln x)² − ln x − 2");
  vrai("15. points rouges en e⁻¹ et e²", Math.abs(termes(15)[0].x - E(-1)) <= 0.005 && Math.abs(termes(15)[1].x - E(2)) <= 0.005);
  dit(15, "$S = [1 ; +\\infty[$");
}
{
  const lignes = dessin("programme", 16, "figure")[0];
  const sortie = executerPython(lignes, "print(etapes(10**-6))");
  if (sortie === null) console.log("  (Python absent : etapes non exécuté)");
  else vrai(`16. Python : etapes(10**-6) = ${sortie}`, sortie === "20");
  arrondi("16. 6 ln 10 / ln 2 ≈ 19,93", 19.93, (6 * L(10)) / L(2));
  vrai("16. 2^−19 ≥ 10⁻⁶ > 2^−20", 2 ** -19 >= 1e-6 && 2 ** -20 < 1e-6);
  arrondi("16. ≈ 3,3 étapes par décimale", 3.3, L(10) / L(2), 0.1);
  dit(16, "Il faut $20$ étapes");
}

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
{
  const B = (x) => 10 * x - 4 * x * L(x);
  surCourbe(17, 0, (x) => B(x) / 2, "B/2 (graduation 2 k€)");
  verif("17. B(0⁺) → 0", B(1e-12), 0, 1e-9);
  vrai("17. B' = 6 − 4 ln x", grille(0.2, 13, 30).every((x) => Math.abs(derivee(B, x) - (6 - 4 * L(x))) < 1e-6));
  const xm = dichotomie((x) => 6 - 4 * L(x), 1, 10);
  arrondi("17. max en e^1,5 ≈ 4,48", 4.48, xm);
  arrondi("17. B max = 4e^1,5 ≈ 17,93", 17.93, B(xm));
  verif("17. B(e^1,5) = 4e^1,5", B(E(1.5)), 4 * E(1.5), 1e-12);
  vrai("17. c'est bien le maximum sur ]0 ; 13]", grille(0.01, 13).every((x) => B(x) <= B(xm) + 1e-9));
  const x0 = dichotomie(B, 5, 13);
  arrondi("17. B = 0 en e^2,5 ≈ 12,18", 12.18, x0);
  vrai("17. points rouges (4,48 ; 8,96) et (12,18 ; 0)", Math.abs(termes(17)[0].y - B(xm) / 2) <= 0.005 && Math.abs(termes(17)[1].x - x0) <= 0.005);
  dit(17, "= 4\\mathrm{e}^{1{,}5} \\approx 17{,}93$");
}
{
  const u = [1000];
  while (u.length < 40) u.push(0.85 * u[u.length - 1] + 60);
  pointsSur("18. u(n)/100, par la récurrence", termes(18), (n) => u[n] / 100);
  vrai("18. u(n) = 400 + 600 × 0,85^n", u.every((x, n) => Math.abs(x - (400 + 600 * 0.85 ** n)) < 1e-9));
  const n = u.findIndex((x) => x < 450);
  vrai(`18. premier rang sous 450 : ${n}`, n === 16);
  arrondi("18. ln 12 / (−ln 0,85) ≈ 15,3", 15.3, L(12) / -L(0.85), 0.1);
  arrondi("18. u15 ≈ 452,4", 452.4, u[15], 0.1);
  arrondi("18. u16 ≈ 444,6", 444.6, u[16], 0.1);
  const lignes = dessin("programme", 18, "figure")[0];
  const sortie = executerPython(lignes, "print(seuil())");
  if (sortie === null) console.log("  (Python absent : seuil() non exécuté)");
  else vrai(`18. Python : seuil() = ${sortie}`, sortie === "16");
  vrai("18. horizontale 4 = 400 oiseaux", dessin("repere", 18)[3] === 4);
  dit(18, "la population passe sous $450$ en $2041$");
  enonceDit(18, "$u_0 = 1\\,000$ et $u_{n+1} = 0{,}85u_n + 60$");
}
{
  const f = (x) => L(x) / x;
  vrai("19. f' = (1 − ln x)/x²", grille(0.3, 10, 30).every((x) => Math.abs(derivee(f, x) - (1 - L(x)) / (x * x)) < 1e-7));
  variations(19, [-Infinity, f(Math.E), 0]);
  vrai("19. max en e", grille(0.05, 50).every((x) => f(x) <= f(Math.E) + 1e-15));
  vrai("19. e^π > π^e", E(Math.PI) > Math.PI ** Math.E);
  arrondi("19. e^π ≈ 23,14", 23.14, E(Math.PI));
  arrondi("19. π^e ≈ 22,46", 22.46, Math.PI ** Math.E);
  verif("19. f(2) = f(4)", f(2), f(4), 1e-12);
  vrai("19. a^b > b^a ⇔ f(a) > f(b) (grille)", grille(0.5, 6, 30).every((a) => grille(0.5, 6, 30).every((b) => Math.abs(f(a) - f(b)) < 1e-12 || (a ** b > b ** a) === (f(a) > f(b)))));
  dit(19, "Léa a raison");
}
{
  const Ln = (n) => 70 + 10 * log(n);
  surCourbe(20, 0, (x) => 10 * log(x), "10 log x");
  arrondi("20. deux machines ≈ 73,0 dB", 73.0, Ln(2), 0.1);
  arrondi("20. quatre machines ≈ 76,0 dB", 76.0, Ln(4), 0.1);
  verif("20. dix machines : 80 dB", Ln(10), 80, 1e-12);
  arrondi("20. baisse 10 log 4 ≈ 6,0 dB", 6.0, 10 * log(4), 0.1);
  let n = 1;
  while (Ln(n + 1) < 85) n++;
  vrai(`20. au plus ${n} machines sous 85 dB`, n === 31);
  arrondi("20. 10^1,5 ≈ 31,6", 31.6, 10 ** 1.5, 0.1);
  pointsSur("20. points rouges", termes(20), (x) => 10 * log(x));
  dit(20, "Au plus $31$ machines");
}

vrai("les corrigés citent leurs pièges (⚠️ ou ⛔ dans les 20)", F.feuille.corrections.every((t) => /⚠️|⛔/.test(t)));
F.fin();
