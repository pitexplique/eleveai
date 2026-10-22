// Recalcul indépendant de la feuille « Nuage de points et point moyen » de Tle
// STMG (22/10/2026) : lib/fiches-exercices/maths-stmg-stat-nuage.tsx.
//
// ⭐ L'AUTRE CHEMIN : les données sont RELUES dans les appels de dessin
// (`nuage`, `grille`) ou dans l'énoncé quand le nuage n'est qu'à l'écran — et
// le schéma d'écran doit alors porter exactement les mêmes points. Le script
// refait chaque moyenne, chaque point moyen (arrondi annoncé), chaque hausse,
// chaque quotient, chaque lecture graphique (sur une graduation, ou « au
// milieu, entre a et b »), et juge la tendance par le coefficient de
// corrélation (jamais écrit à l'élève : r < −0,95 ou r > 0,95 pour « se
// rapprochent d'une droite »). Il contrôle aussi les données réelles (SMIC,
// Netflix, CNC, AVERE, ONU, OMS, marathon).
// Socle : scripts/verifier-exercices-stmg-deux-variables-commun.mjs.
// Usage : node scripts/verifier-exercices-stmg-stat-nuage.mjs

import { ouvrirStmg, moyenne, somme, tx, pl, hausses, plus, r, arr } from "./verifier-exercices-stmg-deux-variables-commun.mjs";

const s = ouvrirStmg("lib/fiches-exercices/maths-stmg-stat-nuage.tsx", "stat_nuage");
const { vrai, verif, dit, enonceDit, dessin, essai, e, c, pointsDe, colonnes, listeEnonce, memes, fin } = s;

/** Le corrigé de k écrit « $\dfrac{a + b + …}{n} = \dfrac{S}{n} … » pour la moyenne d'une liste. */
const ditSomme = (k, xs, d = 6) => dit(k, `\\dfrac{${plus(xs, d)}}{${xs.length}}`);
/** Le schéma d'écran de k porte les mêmes points que les listes (xs, ys). */
const schemaPareil = (k, xs, ys) => {
  const [sx, sy] = pointsDe(k, "schema");
  vrai(`${k}. le schéma porte les points des données`, memes(sx, xs) && memes(sy, ys));
};
/** Le G dessiné sur le schéma de k est le point moyen arrondi. */
const gDessine = (k, xs, ys, dx, dy) => {
  const [, , o] = dessin("nuage", k, "schema");
  vrai(`${k}. G dessiné = (${arr(moyenne(xs), dx)} ; ${arr(moyenne(ys), dy)})`, memes(o.moyen, [arr(moyenne(xs), dx), arr(moyenne(ys), dy)]));
};
/** Une valeur lue sur un axe gradué : sur une ligne, ou au milieu de deux (et le corrigé le dit). */
const lue = (k, v, min, pas) => {
  const q = (v - min) / pas;
  vrai(`${k}. ${v} se lit sur une graduation ou au milieu`, Math.abs(q * 2 - Math.round(q * 2)) < 1e-9);
  if (Math.abs(q - Math.round(q)) > 1e-9) dit(k, `au milieu, entre ${pl(v - pas / 2)} et ${pl(v + pas / 2)}`);
};

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const [[, , , ymin, , py], pts] = dessin("nuage", 1, "figure");
  const A = pts.find((p) => p.label === "A");
  dit(1, `$x = ${A.x}$`);
  dit(1, `$y = ${A.y}$. Donc $A(${A.x} ; ${A.y})$`);
  lue(1, A.y, ymin, py);
  dit(1, `soit ${A.y * 100} glaces`);
  const n = pts.filter((p) => p.y > 4);
  dit(1, `les points d'ordonnées ${n.map((p) => p.y).slice(0, -1).join(", ")} et ${n.at(-1).y}. Cela fait ${n.length} journées`);
});
essai("2", () => {
  const [xs, ys] = colonnes(2);
  // ⭐ Données réelles : SMIC horaire brut au 1er janvier.
  vrai("2. le SMIC 2019 → 2024", memes(ys, [10.03, 10.15, 10.25, 10.57, 11.27, 11.65]) && memes(xs, [2019, 2020, 2021, 2022, 2023, 2024]));
  dit(2, xs.map((x, i) => `$(${x} ; ${tx(ys[i])})$`).join(", "));
  schemaPareil(2, xs, ys);
  vrai("2. toutes les valeurs entre 10 et 12", ys.every((y) => y > 10 && y < 12));
  const h = hausses(ys);
  vrai("2. plus vite en 2022 et 2023", h[2] > h[1] && h[3] > h[1] && h[3] === Math.max(...h));
});
essai("3", () => {
  const [xs, ys] = pointsDe(3, "figure");
  vrai(`3. décroissant et presque aligné (r = ${r(xs, ys).toFixed(3)})`, r(xs, ys) < -0.98);
  dit(3, "le nuage est décroissant");
});
essai("4", () => {
  const xs = listeEnonce(4, "Semaine"), ys = listeEnonce(4, "Temps (min)");
  schemaPareil(4, xs, ys);
  ditSomme(4, xs);
  dit(4, `= \\dfrac{${somme(xs)}}{${xs.length}} = ${tx(moyenne(xs))}$`);
  ditSomme(4, ys);
  dit(4, `= \\dfrac{${somme(ys)}}{${ys.length}} = ${tx(moyenne(ys))}$`);
  dit(4, `$G(${tx(moyenne(xs))} ; ${tx(moyenne(ys))})$`);
  gDessine(4, xs, ys, 6, 6);
  dit(4, `\\dfrac{${ys[0]} + ${ys.at(-1)}}{2} = ${tx((ys[0] + ys.at(-1)) / 2)}$`);
  vrai("4. le piège donne une autre valeur", (ys[0] + ys.at(-1)) / 2 !== moyenne(ys));
});
essai("5", () => {
  const [xs, ys] = colonnes(5);
  // ⭐ Données réelles : abonnés Netflix en fin d'année (millions).
  vrai("5. Netflix 2015 → 2023", memes(ys, [74.8, 93.8, 117.6, 139.3, 167.1, 203.7, 221.8, 230.7, 260.3]));
  schemaPareil(5, xs, ys);
  dit(5, `$(2020 ; ${tx(ys[xs.indexOf(2020)])})$`);
  dit(5, `$${tx(ys.at(-1))} - ${tx(ys[0])} = ${tx(ys.at(-1) - ys[0], 1)}$ millions`);
  const h = hausses(ys);
  dit(5, h.map((v) => `$${tx(v, 1)}$`).join(" ; "));
  const i = h.indexOf(Math.min(...h));
  dit(5, `$${tx(ys[i + 1])} - ${tx(ys[i])} = ${tx(h[i], 1)}$ millions, entre ${xs[i]} et ${xs[i + 1]}`);
  vrai("5. croissante, presque alignée", r(xs, ys) > 0.98);
});
essai("6", () => {
  const [xs, ys] = pointsDe(6, "figure");
  // ⭐ Données réelles : entrées en salle (CNC, millions).
  vrai("6. CNC 2015 → 2024", memes(ys, [205.4, 213.2, 209.4, 201.1, 213.3, 65.1, 96.2, 152, 180.8, 181.3]) && memes(xs, [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]));
  const [, pts] = dessin("nuage", 6, "figure");
  const P = pts.findIndex((p) => p.label === "P");
  vrai("6. P est le sixième point, 2020", P === 5 && xs[P] === 2020);
  vrai("6. 2015-2019 entre 200 et 250", ys.slice(0, 5).every((y) => y >= 200 && y <= 250));
  const [a, b] = [ys[xs.indexOf(2019)], ys[xs.indexOf(2024)]];
  enonceDit(6, `En 2019, il y a eu ${pl(a)} millions d'entrées ; en 2024, ${pl(b)} millions`);
  dit(6, `$${tx(a)} - ${tx(b)} = ${tx(a - b, 1)}$ millions`);
});
essai("7", () => {
  const [, pts] = dessin("nuage", 7, "schema");
  vrai("7. le point dessiné (25 ; 6)", pts[0].x === 25 && pts[0].y === 6);
  enonceDit(7, "Un studio de 25 m² est loué 600 € par mois");
  dit(7, `$y = ${600 / 100}$`);
  dit(7, "Réponse : $(25 ; 6)$.");
});
essai("8", () => {
  const [[, , , ymin, , py], pts] = dessin("nuage", 8, "figure");
  const fc = (a) => pts.find((p) => p.x === a).y;
  lue(8, fc(40), ymin, py);
  lue(8, fc(30), ymin, py);
  dit(8, `sur la ligne ${fc(40)} : ${fc(40)} battements`);
  dit(8, `entre 190 et 200 : ${fc(30)} battements`);
  dit(8, `$220 - 30 = ${220 - 30}$. La mesure, ${fc(30)}, dépasse la formule de $${fc(30)} - ${220 - 30} = ${fc(30) - 190}$`);
  vrai("8. décroissante", r(pts.map((p) => p.x), pts.map((p) => p.y)) < -0.97);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const paires = [...e(9).matchAll(/(20\d\d) : (\d+,\d) %/g)].map((m) => [Number(m[1]), Number(m[2].replace(",", "."))]);
  const xs = paires.map((p, i) => i + 1), ys = paires.map((p) => p[1]);
  // ⭐ Données réelles : part des voitures neuves 100 % électriques (AVERE).
  vrai("9. AVERE 2019 → 2024", memes(ys, [1.9, 6.7, 9.8, 13.3, 16.8, 16.9]) && paires[0][0] === 2019);
  schemaPareil(9, xs, ys);
  dit(9, xs.map((x, i) => `$(${x} ; ${tx(ys[i])})$`).join(", "));
  ditSomme(9, xs);
  dit(9, `= \\dfrac{${somme(xs)}}{6} = ${tx(moyenne(xs))}$`);
  ditSomme(9, ys);
  dit(9, `= \\dfrac{${tx(somme(ys), 1)}}{6} = ${tx(moyenne(ys), 6)}$`);
  dit(9, `$G(${tx(moyenne(xs))} ; ${tx(moyenne(ys))})$`);
  gDessine(9, xs, ys, 6, 6);
  dit(9, hausses(ys).map((h) => `$${tx(h, 1)}$`).join(" ; "));
  vrai("9. 2020-2023 alignés", r(xs.slice(1, 5), ys.slice(1, 5)) > 0.99);
});
essai("10", () => {
  const ys = listeEnonce(10, "de 1950 à 2020");
  const [xs, fy] = pointsDe(10, "figure");
  vrai("10. la figure porte les valeurs de l'énoncé", memes(fy, ys));
  // ⭐ Données réelles : ONU, population mondiale.
  vrai("10. ONU 1950 → 2020", memes(ys, [2.5, 3, 3.7, 4.4, 5.3, 6.1, 6.9, 7.8]));
  schemaPareil(10, xs, ys);
  vrai("10. x̄ = 1985", moyenne(xs) === 1985);
  dit(10, `\\bar{x} = 1985`);
  ditSomme(10, ys);
  dit(10, `= \\dfrac{${tx(somme(ys), 1)}}{8} = ${tx(moyenne(ys))}$, soit environ $${tx(moyenne(ys), 2)}$`);
  dit(10, `$G(1985 ; ${tx(moyenne(ys), 2)})$`);
  gDessine(10, xs, ys, 0, 2);
  const d = ys.at(-1) - ys[0];
  dit(10, `$${tx(ys.at(-1))} - ${tx(ys[0])} = ${tx(d, 1)}$ milliards. $${tx(d, 1)} \\div ${xs.length - 1} \\approx ${tx(d / 7, 2)}$`);
  dit(10, `$${tx(ys.at(-1))} \\div ${tx(ys[0])} = ${tx(ys.at(-1) / ys[0], 4)}$`);
  vrai("10. presque alignés", r(xs, ys) > 0.99);
});
essai("11", () => {
  const [[, , , ymin, , py], pts] = dessin("nuage", 11, "figure");
  const M = pts.find((p) => p.label === "M");
  lue(11, M.y, ymin, py);
  dit(11, `$M(${M.x} ; ${M.y})$. Ce mois-là, ${M.x} k€ de publicité et ${M.y} 000 articles`);
  const autres = pts.filter((p) => p !== M);
  vrai("11. sans M, presque alignés", r(autres.map((p) => p.x), autres.map((p) => p.y)) > 0.98);
  vrai("11. avec M, bien moins", r(pts.map((p) => p.x), pts.map((p) => p.y)) < 0.9);
  const six = pts.find((p) => p.x === 6).y;
  lue(11, six, ymin, py);
  dit(11, `${six} milliers, soit ${six} 000 articles`);
});
essai("12", () => {
  const ys = listeEnonce(12, "de 0 à 12");
  const [xs, fy] = pointsDe(12, "figure");
  vrai("12. la figure porte les valeurs de l'énoncé", memes(fy, ys) && memes(xs, [0, 2, 4, 6, 8, 10, 12]));
  dit(12, hausses(ys).map((h, i) => `$${ys[i + 1]} - ${ys[i]} = ${h}$`).join(" ; "));
  const [y4, y8] = [ys[xs.indexOf(4)], ys[xs.indexOf(8)]];
  dit(12, `À 4, le rendement est ${y4} ; à 8, il est ${y8}. $${y4} \\times 2 = ${2 * y4}$`);
  vrai("12. hausses décroissantes", hausses(ys).every((h, i, t) => i === 0 || h <= t[i - 1]));
});
essai("13", () => {
  const xs = listeEnonce(13, "Heures"), ys = listeEnonce(13, "Erreurs");
  schemaPareil(13, xs, ys);
  ditSomme(13, xs);
  dit(13, `= \\dfrac{${somme(xs)}}{6} = ${tx(moyenne(xs))}$`);
  ditSomme(13, ys);
  dit(13, `= \\dfrac{${somme(ys)}}{6} \\approx ${tx(moyenne(ys), 1)}$`);
  dit(13, `$G(${tx(moyenne(xs), 1)} ; ${tx(moyenne(ys), 1)})$`);
  gDessine(13, xs, ys, 1, 1);
  const d = ys.at(-1) - ys[0];
  dit(13, `$${ys.at(-1)} - ${ys[0]} = ${d}$ erreurs. $${d} \\div 5 = ${tx(d / 5)}$`);
  vrai("13. presque alignés", r(xs, ys) < -0.98);
});
essai("14", () => {
  const [xs, ys] = colonnes(14);
  // ⭐ Données réelles : OMS, taille médiane des garçons.
  vrai("14. OMS 1 → 6 ans", memes(ys, [75.7, 87.8, 96.1, 103.3, 110, 116]));
  schemaPareil(14, xs, ys);
  dit(14, `$(3 ; ${tx(ys[2])})$`);
  dit(14, hausses(ys).map((h, i) => `$${tx(ys[i + 1])} - ${tx(ys[i])} = ${tx(h, 1)}$`).join(" ; "));
  const d = ys[5] - ys[2];
  dit(14, `$${tx(ys[5])} - ${tx(ys[2])} = ${tx(d, 1)}$ cm en 3 ans. $${tx(d, 1)} \\div 3 \\approx ${tx(d / 3, 1)}$`);
});
essai("15", () => {
  const [[, , , ymin, , py], pts] = dessin("nuage", 15, "figure");
  const v = (k) => pts.find((p) => p.x === k).y;
  lue(15, v(4), ymin, py);
  dit(15, `sur la ligne ${v(4)} : ${v(4)} centaines, soit ${v(4) * 100} tubes`.replace("2500", "2 500"));
  dit(15, `\\dfrac{${v(5)} - ${v(1)}}{${v(1)}} = \\dfrac{${v(5) - v(1)}}{${v(1)}} = ${(v(5) - v(1)) / v(1)}$, soit une hausse de ${((v(5) - v(1)) / v(1)) * 100} %`);
  const plusDe = pts.filter((p) => p.y > 20).map((p) => p.x);
  vrai("15. plus de 2 000 : juin, juillet, août", memes(plusDe, [4, 5, 6]));
  dit(15, `juin (${v(4)}), juillet (${v(5)}) et août (${v(6)})`);
});
essai("16", () => {
  const xs = listeEnonce(16, "Classement"), ys = listeEnonce(16, "Affluence");
  schemaPareil(16, xs, ys);
  ditSomme(16, xs);
  dit(16, `= \\dfrac{${somme(xs)}}{8} = ${tx(moyenne(xs))}$`);
  ditSomme(16, ys);
  dit(16, `= \\dfrac{${somme(ys)}}{8} = ${tx(moyenne(ys))}$`);
  dit(16, `$G(${tx(moyenne(xs))} ; ${tx(moyenne(ys))})$`);
  gDessine(16, xs, ys, 6, 6);
  const rr = r(xs, ys);
  vrai(`16. décroissante mais dispersée (r = ${rr.toFixed(3)})`, rr < -0.85 && rr > -0.98);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [, lignes] = dessin("grille", 17, "figure");
  const xs = lignes.map((l) => l[0] - 2000);
  const ys = lignes.map((l) => {
    const [, h, m, sec] = l[1].match(/(\d) h (\d\d) min (\d\d) s/).map(Number);
    vrai("17. records entre 2 h et 2 h 05", h === 2 && m < 5);
    return m * 60 + sec;
  });
  // ⭐ Données réelles : records du monde du marathon (World Athletics).
  vrai("17. les records", memes(ys, [295, 266, 239, 218, 203, 177, 99, 69, 35]));
  dit(17, ys.join(" ; "));
  dit(17, xs.map((x, i) => `$(${x} ; ${ys[i]})$`).join(", "));
  schemaPareil(17, xs, ys);
  ditSomme(17, xs);
  dit(17, `= \\dfrac{${somme(xs)}}{9} \\approx ${tx(moyenne(xs), 1)}$`);
  ditSomme(17, ys);
  dit(17, `= \\dfrac{${somme(ys)}}{9} \\approx ${tx(moyenne(ys), 1)}$`);
  dit(17, `$G(${tx(moyenne(xs), 1)} ; ${tx(moyenne(ys), 1)})$`);
  gDessine(17, xs, ys, 1, 1);
  const an = xs.at(-1) - xs[0];
  dit(17, `En ${an} ans : $${ys[0]} - ${ys.at(-1)} = ${ys[0] - ys.at(-1)}$ secondes. $${ys[0] - ys.at(-1)} \\div ${an} = ${(ys[0] - ys.at(-1)) / an}$`);
  const gains = hausses(ys).map((h) => -h);
  dit(17, `Les gains : ${gains.join(" ; ")} secondes`);
  const i = gains.indexOf(Math.max(...gains));
  vrai("17. le plus grand gain : 2018, Kipchoge", lignes[i + 1][0] === 2018 && lignes[i + 1][2] === "Kipchoge");
  dit(17, `$${ys[i]} - ${ys[i + 1]} = ${gains[i]}$ secondes, est celui de Kipchoge en 2018`);
});
essai("18", () => {
  const ys = listeEnonce(18, "sept premiers mois");
  const [xs, fy] = pointsDe(18, "figure");
  vrai("18. la figure porte les valeurs de l'énoncé", memes(fy, ys));
  schemaPareil(18, xs, ys);
  dit(18, hausses(ys).map((h, i) => `$${ys[i + 1]} - ${ys[i]} = ${h}$`).join(" ; "));
  dit(18, `= ${moyenne(xs)}$ et $\\bar{y} = \\dfrac{${plus(ys)}}{7} = \\dfrac{${somme(ys)}}{7} \\approx ${tx(moyenne(ys), 1)}$`);
  dit(18, `$G(${moyenne(xs)} ; ${tx(moyenne(ys), 1)})$`);
  gDessine(18, xs, ys, 0, 1);
  const q = ys.slice(1).map((y, i) => y / ys[i]);
  dit(18, q.map((v, i) => `$${ys[i + 1]} \\div ${ys[i]} ${Number.isInteger(v * 100) ? "=" : "\\approx"} ${tx(v, 2)}$`).join(" ; "));
  vrai("18. quotients autour de 1,5", q.every((v) => Math.abs(v - 1.5) < 0.2));
});
essai("19", () => {
  const xs = listeEnonce(19, "Prix (€)"), ys = listeEnonce(19, "Ventes (centaines)");
  schemaPareil(19, xs, ys);
  ditSomme(19, xs);
  dit(19, `= \\dfrac{${somme(xs)}}{6} = ${tx(moyenne(xs))}$`);
  ditSomme(19, ys);
  dit(19, `= \\dfrac{${somme(ys)}}{6} \\approx ${tx(moyenne(ys), 1)}$`);
  dit(19, `$G(${tx(moyenne(xs))} ; ${tx(moyenne(ys), 1)})$`);
  gDessine(19, xs, ys, 1, 1);
  const [dx, dy] = [xs.at(-1) - xs[0], ys.at(-1) - ys[0]];
  dit(19, `$${ys.at(-1)} - ${ys[0]} = ${dy}$ centaines. $${dy} \\div ${dx} = ${tx(dy / dx)}$`);
  const milliers = (n) => String(n).replace(/\B(?=(\d{3})+$)/g, "\\,");
  const recettes = xs.map((x, i) => x * ys[i] * 100);
  dit(19, xs.map((x, i) => `$${x} \\times ${milliers(ys[i] * 100)} = ${milliers(recettes[i])}$ €`).join(" ; "));
  const best = xs[recettes.indexOf(Math.max(...recettes))];
  vrai("19. 14 € rapporte le plus", best === 14);
  dit(19, `Le prix de ${best} € rapporte le plus : ${String(Math.max(...recettes)).replace(/\B(?=(\d{3})+$)/g, " ")} €`);
});
essai("20", () => {
  const [xs, ys] = colonnes(20, 1, 2);
  schemaPareil(20, xs, ys);
  ditSomme(20, xs);
  dit(20, `= \\dfrac{${somme(xs)}}{8} \\approx ${tx(moyenne(xs), 1)}$`);
  ditSomme(20, ys);
  dit(20, `= \\dfrac{${somme(ys)}}{8} \\approx ${tx(moyenne(ys), 1)}$`);
  dit(20, `$G(${tx(moyenne(xs), 1)} ; ${tx(moyenne(ys), 1)})$`);
  gDessine(20, xs, ys, 1, 1);
  const audessus = ys.filter((y) => y > moyenne(ys));
  dit(20, `Au-dessus de $${tx(moyenne(ys), 1)}$ : ${audessus.slice(0, -1).join(", ")} et ${audessus.at(-1)}. Cela fait ${audessus.length} joueuses`);
  vrai("20. presque alignés", r(xs, ys) > 0.97);
});

fin();
