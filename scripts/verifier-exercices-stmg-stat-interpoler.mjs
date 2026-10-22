// Recalcul indépendant de la feuille « Interpoler et extrapoler » de Tle STMG
// (22/10/2026) : lib/fiches-exercices/maths-stmg-stat-interpoler.tsx.
//
// ⭐ L'AUTRE CHEMIN : chaque estimation y = ax + b est refaite ; chaque seuil
// (« à partir de quand… ») est résolu puis arrondi DANS LE BON SENS (le premier
// entier où le seuil est franchi, contrôlé par l'entier d'avant) ; chaque mot
// « interpolation » ou « extrapolation » est confronté à la plage des données
// (relue dans le dessin ou l'énoncé) ; chaque droite « de la calculatrice »
// est recalculée par les moindres carrés et comparée à l'arrondi annoncé ;
// chaque résultat déclaré absurde est bien négatif ou au-delà de la limite
// donnée ; chaque donnée réelle (OMS, ONU, World Athletics) est contrôlée.
// Socle : scripts/verifier-exercices-stmg-deux-variables-commun.mjs.
// Usage : node scripts/verifier-exercices-stmg-stat-interpoler.mjs

import { ouvrirStmg, moyenne, somme, tx, pl, mc, arr } from "./verifier-exercices-stmg-deux-variables-commun.mjs";

const s = ouvrirStmg("lib/fiches-exercices/maths-stmg-stat-interpoler.tsx", "stat_interpoler");
const { vrai, dit, enonceDit, dessin, essai, c, pointsDe, colonnes, memes, fin } = s;

const f = (a, b) => (x) => arr(a * x + b, 6);
/** « $y = a \times x + b = … = r$ » : le calcul de l'estimation est écrit et juste (r arrondi à d). */
const ditCalc = (k, a, b, x, d = 6) => {
  const r = a * x + b;
  vrai(`${k}. le corrigé écrit le calcul de y(${x}) = ${arr(r, d)}`, c(k).includes(`${tx(a)} \\times ${tx(x)}`) && (c(k).includes(`= ${tx(r, d)}`) || c(k).includes(`\\approx ${tx(r, d)}`)), `${tx(a)} × ${tx(x)} → ${tx(r, d)}`);
  return r;
};
/** Le premier entier n tel que a n + b franchit le seuil (dans le sens de la pente). */
const premier = (a, b, seuil) => {
  const x = (seuil - b) / a;
  return Number.isInteger(arr(x, 9)) ? arr(x, 9) + 1 : Math.ceil(x);
};
/** x dans la plage [min ; max] : interpolation ; sinon extrapolation. */
const nature = (x, min, max) => (x >= min && x <= max ? "interpolation" : "extrapolation");
const calculatrice = (k, xs, ys, a, b, da, db = da) => {
  const m = mc(xs, ys);
  vrai(`${k}. calculatrice : a = ${a} (moindres carrés ${m.a.toFixed(6)})`, Math.abs(m.a - a) <= 0.5 * 10 ** -da + 1e-9);
  vrai(`${k}. calculatrice : b = ${b} (moindres carrés ${m.b.toFixed(6)})`, Math.abs(m.b - b) <= 0.5 * 10 ** -db + 1e-9);
  return m;
};
const droite0 = (k, role) => dessin("nuage", k, role)[2].droites[0];

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const [xs, ys] = pointsDe(1, "figure");
  const [a, b] = droite0(1, "figure");
  vrai("1. plage 2 → 10, données proches de la droite", Math.min(...xs) === 2 && Math.max(...xs) === 10 && xs.every((x, i) => Math.abs(ys[i] - f(a, b)(x)) <= 1));
  ditCalc(1, a, b, 7);
  dit(1, `soit environ ${arr((a * 7 + b) * 100)} billets`.replace("3650", "3 650"));
  vrai("1. 7 → interpolation", nature(7, 2, 10) === "interpolation");
});
essai("2", () => {
  const [a, b] = [-1.2, 48];
  enonceDit(2, "pendant 10 semaines");
  ditCalc(2, a, b, 15);
  vrai("2. 15 → extrapolation", nature(15, 1, 10) === "extrapolation");
  const n = premier(a, b, 20);
  dit(2, `$x = 28 \\div 1{,}2 \\approx ${tx((20 - b) / a, 1)}$`);
  dit(2, `à partir de la semaine ${n}`);
  dit(2, `$-1{,}2 \\times ${n - 1} + 48 = ${tx(f(a, b)(n - 1))}$, au-dessus de 20`);
});
essai("3", () => {
  const [xs] = pointsDe(3, "schema");
  vrai("3. plage 2015 → 2023", Math.min(...xs) === 2015 && Math.max(...xs) === 2023);
  const cas = [[2019, "interpolation"], [2030, "extrapolation"], [2010, "extrapolation"], [2021.5, "interpolation"]];
  for (const [x, n] of cas) vrai(`3. ${x} → ${n}`, nature(x, 2015, 2023) === n);
  dit(3, "a) interpolation, extrapolation, extrapolation, interpolation");
  dit(3, `7 ans après la dernière. 2010 n'est qu'à 5 ans`);
  vrai("3. 2030 la plus éloignée", 2030 - 2023 > 2015 - 2010);
});
essai("4", () => {
  const [xs, ys] = pointsDe(4, "figure");
  const [a, b] = droite0(4, "figure");
  vrai("4. la droite passe par G", Math.abs(a * moyenne(xs) + b - moyenne(ys)) < 1e-9);
  dit(4, `$y = 2 \\times 5 + 4 = ${f(a, b)(5)}$`);
  dit(4, "au milieu, entre 12 et 16, soit 14");
  vrai("4. 5 → interpolation", nature(5, Math.min(...xs), Math.max(...xs)) === "interpolation");
});
essai("5", () => {
  const [a, b] = [4, 50];
  dit(5, `$x = 50 \\div 4 = ${tx((100 - b) / a)}$`);
  vrai("5. au cours du mois 13, extrapolation", Math.ceil((100 - b) / a) === 13 && (100 - b) / a > 8);
});
essai("6", () => {
  const [xs, ys] = pointsDe(6, "figure");
  const [a, b] = droite0(6, "figure");
  vrai("6. plage 5 → 15, données proches", Math.min(...xs) === 5 && Math.max(...xs) === 15 && xs.every((x, i) => Math.abs(ys[i] - f(a, b)(x)) <= 0.5));
  dit(6, `$y = -0{,}5 \\times 10 + 20 = -5 + 20 = ${f(a, b)(10)}$ minutes`);
  dit(6, `$y = -0{,}5 \\times 50 + 20 = -25 + 20 = ${f(a, b)(50)}$ minutes`);
  vrai("6. 50 conseillers → négatif", f(a, b)(50) < 0);
});
essai("7", () => {
  const [xs, ys] = pointsDe(7, "figure");
  const [a, b] = droite0(7, "figure");
  vrai("7. (0 ; 20) et (4 ; 40) sur la droite", f(a, b)(0) === 20 && f(a, b)(4) === 40);
  vrai("7. données proches de la droite", xs.every((x, i) => Math.abs(ys[i] - f(a, b)(x)) <= 1));
  dit(7, `Pour $x = 12$ : $5 \\times 12 + 20 = ${f(a, b)(12)}$ hectares`);
  vrai("7. 12 → extrapolation, sur une graduation", nature(12, 1, 8) === "extrapolation" && f(a, b)(12) % 10 === 0);
});
essai("8", () => {
  const [a, b] = [0.15, 8.2];
  dit(8, `$y = 0{,}15 \\times 12 + 8{,}2 = 1{,}8 + 8{,}2 = ${tx(f(a, b)(12))}$ milliers`);
  dit(8, `$y = 0{,}15 \\times 60 + 8{,}2 = 9 + 8{,}2 = ${tx(f(a, b)(60))}$ milliers`);
  vrai("8. 2012 interpolation, 2060 extrapolation", nature(12, 0, 20) === "interpolation" && nature(60, 0, 20) === "extrapolation");
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const [xs, ys] = colonnes(9);
  // ⭐ Données réelles : OMS, taille médiane des garçons.
  vrai("9. OMS 3 → 6 ans", memes(ys, [96.1, 103.3, 110, 116]));
  const [a, b] = [6.64, 76.47];
  calculatrice(9, xs, ys, a, b, 2);
  ditCalc(9, a, b, 4.5);
  const y1 = f(a, b)(1);
  dit(9, `$y = 6{,}64 \\times 1 + 76{,}47 = ${tx(y1)}$ cm, contre 75,7 cm : la droite se trompe de $${tx(y1 - 75.7)}$ cm`);
  const y18 = ditCalc(9, a, b, 18);
  dit(9, `soit environ ${Math.round(y18)} cm, ${Math.round(y18) - 176} cm de trop`);
});
essai("10", () => {
  const [xs, ys] = pointsDe(10, "figure");
  const [a, b] = droite0(10, "figure");
  calculatrice(10, xs, ys, a, b, 2, 2);
  ditCalc(10, a, b, 5);
  ditCalc(10, a, b, 15);
  vrai("10. 5 interpolation, 15 extrapolation", nature(5, 2, 8) === "interpolation" && nature(15, 2, 8) === "extrapolation");
  const x = (20 - b) / a;
  dit(10, `$x = 17{,}5 \\div 1{,}79 \\approx ${tx(x, 2)}$ dizaines. Il faut environ ${Math.ceil(x * 10)} livreurs`);
  vrai("10. 97 livreurs ne suffisent pas", a * 9.7 + b < 20);
  vrai("10. b) au-delà de 2 000 commandes", f(a, b)(15) > 20);
});
essai("11", () => {
  const ys = s.listeEnonce(11, "de 1950 à 2020 (source : ONU)");
  const [xs, fy] = pointsDe(11, "figure");
  // ⭐ Données réelles : ONU.
  vrai("11. ONU 1950 → 2020, et la figure", memes(ys, [2.5, 3, 3.7, 4.4, 5.3, 6.1, 6.9, 7.8]) && memes(fy, ys));
  const [a, b] = droite0(11, "figure");
  calculatrice(11, xs, ys, a, b, 2);
  const y45 = ditCalc(11, a, b, 4.5);
  dit(11, `soit environ $${tx(y45, 2)}$ milliards`);
  dit(11, `$y = 0{,}77 \\times 10 + 2{,}27 = ${tx(f(a, b)(10))}$ milliards`);
  dit(11, `$y = 0{,}77 \\times 15 + 2{,}27 = ${tx(f(a, b)(15))}$ milliards`);
  dit(11, `$${tx(f(a, b)(10))} - 9{,}7 = ${tx(f(a, b)(10) - 9.7)}$ milliard`);
  dit(11, `$${tx(f(a, b)(15))} - 10{,}2 = ${tx(f(a, b)(15) - 10.2)}$ milliards`);
  dit(11, `gagne toujours ${arr(a * 1000)} millions par décennie`);
});
essai("12", () => {
  const [xs, ys] = pointsDe(12, "figure");
  const [a, b] = droite0(12, "figure");
  vrai("12. données proches de la droite", xs.every((x, i) => Math.abs(ys[i] - f(a, b)(x)) <= 1.5));
  dit(12, `$0{,}4 \\times 45 + 2 = 18 + 2 = ${f(a, b)(45)}$ m³/s`);
  dit(12, `$0{,}4 \\times 120 + 2 = 48 + 2 = ${f(a, b)(120)}$ m³/s`);
  vrai("12. 45 interpolation (et sur une graduation), 120 extrapolation", nature(45, 10, 50) === "interpolation" && f(a, b)(45) % 5 === 0 && nature(120, 10, 50) === "extrapolation");
});
essai("13", () => {
  const [a, b] = [-3.5, 98];
  dit(13, `$y = -3{,}5 \\times 10 + 98 = -35 + 98 = ${f(a, b)(10)}$ kilotonnes`);
  const n = premier(a, b, 50);
  dit(13, `$x = 48 \\div 3{,}5 \\approx ${tx((50 - b) / a, 1)}$. Sous 50 kilotonnes à partir de l'année de rang ${n}`);
  dit(13, `$-3{,}5 \\times ${n - 1} + 98 = ${tx(f(a, b)(n - 1))}$`);
  enonceDit(13, `l'année de rang ${-b / a}`);
});
essai("14", () => {
  const [a, b] = [25, -450];
  dit(14, `$y = 25 \\times 27{,}5 - 450 = ${tx(a * 27.5)} - 450 = ${tx(f(a, b)(27.5))}$, soit environ ${Math.round(f(a, b)(27.5) + 1e-9)} entrées`);
  dit(14, `$y = 25 \\times 15 - 450 = 375 - 450 = ${f(a, b)(15)}$ entrées`);
  dit(14, `$y = 25 \\times 40 - 450 = 1000 - 450 = ${f(a, b)(40)}$ entrées, plus que la capacité de 400`);
  vrai("14. 15 °C négatif, 40 °C au-delà de 400", f(a, b)(15) < 0 && f(a, b)(40) > 400);
});
essai("15", () => {
  const [xs, ys] = colonnes(15);
  const [a, b] = [0.0995, 0.014];
  const m = calculatrice(15, xs, ys, a, b, 6);
  const x1 = (0.5 - b) / a, x2 = (1.2 - b) / a;
  dit(15, `$0{,}0995x = ${tx(0.5 - b)}$, donc $x = ${tx(0.5 - b)} \\div 0{,}0995 \\approx ${tx(x1, 2)}$ mg/L`);
  dit(15, `$0{,}0995x = ${tx(1.2 - b)}$, donc $x \\approx ${tx(x2, 2)}$ mg/L`);
  vrai("15. 4,88 dans la plage, 11,92 hors", nature(x1, 0, 8) === "interpolation" && nature(x2, 0, 8) === "extrapolation");
  dit(15, `\\dfrac{${tx(somme(ys))}}{5} = ${tx(m.my)}$. $0{,}0995 \\times 4 + 0{,}014 = ${tx(a * 4)} + 0{,}014 = ${tx(a * 4 + b)}$`);
});
essai("16", () => {
  const [a, b] = [-40, 260];
  dit(16, `$y = -40 \\times 3{,}5 + 260 = -140 + 260 = ${f(a, b)(3.5)}$ packs`);
  dit(16, `$y = ${b}$ packs`);
  dit(16, `$y = -40 \\times 7 + 260 = -280 + 260 = ${f(a, b)(7)}$ packs`);
  vrai("16. 7 € négatif", f(a, b)(7) < 0);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [an, ys] = colonnes(17);
  // ⭐ Données réelles : records du monde du 100 m (World Athletics).
  vrai("17. les records", memes(ys, [9.95, 9.93, 9.92, 9.86, 9.85, 9.84, 9.79, 9.77, 9.74, 9.69, 9.58]) && memes(an, [1968, 1983, 1988, 1991, 1994, 1996, 1999, 2005, 2007, 2008, 2009]));
  const xs = an.map((x) => x - 1960);
  const [a, b] = [-0.0079, 10.09];
  calculatrice(17, xs, ys, a, b, 4, 2);
  vrai("17. le schéma porte les données", memes(pointsDe(17, "schema")[0], xs) && memes(pointsDe(17, "schema")[1], ys));
  dit(17, `$y = -0{,}0079 \\times 25 + 10{,}09 = ${tx(a * 25)} + 10{,}09 \\approx ${tx(f(a, b)(25), 2)}$ s`);
  dit(17, `$y = -0{,}0079 \\times 49 + 10{,}09 \\approx ${f(a, b)(49).toFixed(2).replace(".", "{,}")}$ s`);
  dit(17, `${pl(arr(f(a, b)(49) - 9.58, 2))} s plus vite que la tendance`);
  dit(17, `$y = -0{,}0079 \\times 70 + 10{,}09 = ${tx(a * 70)} + 10{,}09 \\approx ${tx(f(a, b)(70), 2)}$ s`);
  const x95 = (9.5 - b) / a;
  dit(17, `$x = 0{,}59 \\div 0{,}0079 \\approx ${tx(x95, 1)}$. Sous 9,5 s à partir de ${1960 + Math.ceil(x95)}`);
  const x0 = -b / a;
  dit(17, `$x \\approx ${Math.round(x0)}$ : l'an ${1960 + Math.round(x0)}`);
  vrai("17. 1985 interpolation, 2030 extrapolation", nature(25, 8, 49) === "interpolation" && nature(70, 8, 49) === "extrapolation");
});
essai("18", () => {
  const [xs, ys] = colonnes(18);
  const [a, b] = [13.43, 6.33];
  const m = calculatrice(18, xs, ys, a, b, 2);
  dit(18, `\\dfrac{${somme(ys)}}{6} \\approx ${tx(m.my, 2)}$. $13{,}43 \\times 3{,}5 + 6{,}33 = ${tx(a * 3.5)} + 6{,}33 = ${tx(a * 3.5 + b)}$`);
  dit(18, `$y = 13{,}43 \\times 12 + 6{,}33 = ${tx(a * 12)} + 6{,}33 = ${tx(f(a, b)(12))}$, soit environ ${pl(arr(f(a, b)(12), 1))} k€`);
  const n = premier(a, b, 200);
  dit(18, `$13{,}43x = ${tx(200 - b)}$, donc $x = ${tx(200 - b)} \\div 13{,}43 \\approx ${tx((200 - b) / a, 2)}$. À partir du trimestre ${n}`);
  dit(18, `$13{,}43 \\times ${n - 1} + 6{,}33 = ${tx(f(a, b)(n - 1))}$`);
});
essai("19", () => {
  const [an, ys] = colonnes(19);
  const xs = an.map((x) => x - 2000);
  const [a, b] = [28.57, -2.38];
  calculatrice(19, xs, ys, a, b, 2);
  vrai("19. le schéma porte les données", memes(pointsDe(19, "schema")[1], ys));
  dit(19, `$y = 28{,}57 \\times 10 - 2{,}38 = ${tx(a * 10)} - 2{,}38 = ${tx(f(a, b)(10))}$, soit environ ${Math.round(f(a, b)(10))} m`);
  dit(19, `$y = 28{,}57 \\times 30 - 2{,}38 = ${tx(a * 30)} - 2{,}38 = ${tx(f(a, b)(30))}$, soit environ ${Math.round(f(a, b)(30))} m`);
  const x = (2400 - b) / a;
  dit(19, `$x = ${tx(2400 - b)} \\div 28{,}57 \\approx ${tx(x, 1)}$. Vers ${2000 + Math.round(x)}`);
});
essai("20", () => {
  const paires = [...s.e(20).matchAll(/(20\d\d) : (\d+)(?= ;|\.)/g)].map((m) => [Number(m[1]) - 2015, Number(m[2])]);
  const xs = paires.map((p) => p[0]), ys = paires.map((p) => p[1]);
  vrai("20. 2018 manque", !xs.includes(3) && xs.length === 6);
  vrai("20. la figure porte les données", memes(pointsDe(20, "figure")[0], xs) && memes(pointsDe(20, "figure")[1], ys));
  const [a, b] = droite0(20, "figure");
  calculatrice(20, xs, ys, a, b, 2);
  dit(20, `$y = -5{,}75 \\times 3 + 47{,}42 = -17{,}25 + 47{,}42 = ${tx(f(a, b)(3))}$ centaines, soit environ ${Math.round(f(a, b)(3) * 100)} DVD`.replace("3017", "3 017"));
  dit(20, `$y = -5{,}75 \\times 9 + 47{,}42 = -51{,}75 + 47{,}42 = ${tx(f(a, b)(9))}$ centaines`);
  dit(20, `$x = 47{,}42 \\div 5{,}75 \\approx ${tx(-b / a, 2)}$ : au cours de ${2015 + Math.floor(-b / a)}`);
  vrai("20. 2018 interpolation, 2024 extrapolation", nature(3, 0, 6) === "interpolation" && nature(9, 0, 6) === "extrapolation");
});

fin();
