// Recalcul indépendant de la feuille « La fluctuation d'échantillonnage » de
// STMG (22/10/2026) : lib/fiches-exercices/maths-stmg-va-echantillonnage.tsx.
//
// ⭐ L'AUTRE CHEMIN : p et n sont relus dans l'énoncé ou la figure, 1/√n et les
// bornes p ± 1/√n recalculés (arrondis au millième), chaque fréquence observée
// refaite à partir des effectifs, placée dans ou hors de l'intervalle, et le
// verdict « courant / rare » exigé dans la ligne Réponse. Les simulations (1,
// 2, 9, 20) sont recomptées : étendues, échantillons hors intervalle, moyenne
// pondérée. La règle n × k² est vérifiée par le calcul de 1/√n. Le dessin
// `intervalle` doit porter les mêmes p, bornes et points. Données réelles :
// EFS (42 %), INSEE (105 garçons pour 100 filles), présidentielle 2022
// (58,55 %), roulette (18 rouges sur 37).
// Usage : node scripts/verifier-exercices-stmg-va-echantillonnage.mjs

import { ouvrirStmg, memes, somme, tx, plat } from "./verifier-exercices-stmg-donnees-commun.mjs";

const f = ouvrirStmg("lib/fiches-exercices/maths-stmg-va-echantillonnage.tsx", "va_echantillonnage");
const { vrai, dit, enonceDit, dessin, essai } = f;
const reponse = (k, texte) => dit(k, `Réponse : ${texte}`);
const r3 = (x) => Number(x.toFixed(3));
const b = (x) => plat(r3(x));
const IC = (p, n) => [p - 1 / Math.sqrt(n), p + 1 / Math.sqrt(n)];
const crochets = (p, n) => `[${b(IC(p, n)[0])} ; ${b(IC(p, n)[1])}]`;
const dedans = (x, p, n) => x >= r3(IC(p, n)[0]) - 1e-12 && x <= r3(IC(p, n)[1]) + 1e-12;
/** Une valeur de cellule : nombre, ou « 0,1875 » écrit en clair. */
const nb = (c) => (typeof c === "number" ? c : Number(String(c).replace(",", ".").replace(/[^\d.]/g, "")));
/** Le dessin `intervalle` porte p, la bande et les points annoncés. */
const dessinOK = (k, role, p, e, pts) => {
  const [, , , o] = dessin("intervalle", k, role);
  vrai(`${k}. dessin : p = ${p}`, o.p === p);
  if (e !== undefined) vrai(`${k}. dessin : bande ± ${e}`, Math.abs(o.e - e) < 1e-3);
  vrai(`${k}. dessin : points`, memes(o.points.map((x) => x.value), pts));
};

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const [data, o] = dessin("barres", 1, "figure");
  const v = data.map((d) => d.value);
  vrai("1. des fréquences sur 20 lancers (multiples de 0,05)", v.every((x) => Math.abs(x * 20 - Math.round(x * 20)) < 1e-9));
  const [mn, mx] = [Math.min(...v), Math.max(...v)];
  vrai("1. min et max uniques", v.filter((x) => x === mn).length === 1 && v.filter((x) => x === mx).length === 1);
  dit(1, `celle de l'échantillon ${data[v.indexOf(mn)].label} : au milieu, entre ${plat(mn - o.pas / 2)} et ${plat(mn + o.pas / 2)}, soit ${plat(mn)}`);
  dit(1, `celle de l'échantillon ${data[v.indexOf(mx)].label} : au milieu, entre ${plat(mx - o.pas / 2)} et ${plat(mx + o.pas / 2)}, soit ${plat(mx)}`);
  const demi = data.filter((d) => d.value === 0.5).map((d) => d.label);
  dit(1, `les échantillons ${demi.join(" et ")}. ${demi.length} échantillons`);
  dit(1, `$${tx(val7())} \\times 20 = ${Math.round(val7() * 20)}$`);
  reponse(1, `a) ${plat(mn)} (échantillon ${data[v.indexOf(mn)].label}) et ${plat(mx)} (échantillon ${data[v.indexOf(mx)].label}) ; b) ${demi.length} ; c) ${Math.round(val7() * 20)} ; d) la fluctuation d'échantillonnage.`);
  function val7() {
    return data.find((d) => d.label === "7").value;
  }
});
essai("2", () => {
  const [, l] = dessin("grille", 2, "figure");
  const a = l.map((r) => nb(r[1])), c = l.map((r) => nb(r[2]));
  vrai("2. n = 25 : multiples de 0,04 ; n = 400 : multiples de 0,0025", a.every((x) => Math.abs(x * 25 - Math.round(x * 25)) < 1e-9) && c.every((x) => Math.abs(x * 400 - Math.round(x * 400)) < 1e-9));
  const ea = Math.max(...a) - Math.min(...a), ec = Math.max(...c) - Math.min(...c);
  dit(2, `$${tx(Math.max(...a))} - ${tx(Math.min(...a))} = ${tx(ea)}$`);
  dit(2, `$${tx(Math.max(...c))} - ${tx(Math.min(...c))} = ${tx(ec)}$`);
  vrai("2. b) n = 400 fluctue moins", ec < ea);
  dit(2, `$${tx(a[1])} \\times 25 = ${Math.round(a[1] * 25)}$ pièces`);
  reponse(2, `a) ${plat(ea)} et ${plat(ec)} ; b) n = 400 ; c) ${Math.round(a[1] * 25)} pièces.`);
});
essai("3", () => {
  // ⭐ Données réelles : groupe O, 42 % (EFS).
  enonceDit(3, "42 % des personnes sont du groupe O. Sur les 400 donneurs de la collecte, 180 sont du groupe O");
  const [p, n, k] = [0.42, 400, 180];
  const fq = k / n;
  dit(3, `l'intervalle ${crochets(p, n)}`);
  dit(3, `$f = ${k} \\div ${n} = ${tx(fq)}$. Distance : $${tx(fq)} - ${tx(p)} = ${tx(fq - p)}$`);
  vrai("3. courant", dedans(fq, p, n));
  dessinOK(3, "schema", p, 0.05, [fq]);
  reponse(3, `a) 0,05 ; b) ${crochets(p, n)} ; c) ${plat(fq)}, distance ${plat(r3(fq - p))} : ordinaire.`);
});
essai("4", () => {
  const [, l] = dessin("grille", 4, "figure");
  const ns = l.map((r) => nb(r[0]));
  vrai("4. les tailles 100, 400, 1000, 2500, 10 000", memes(ns, [100, 400, 1000, 2500, 10000]));
  vrai("4. que des « ? » à remplir", l.every((r) => r[1] === "?"));
  for (const n of ns) {
    const s = Math.sqrt(n);
    if (Number.isInteger(s)) dit(4, `$\\dfrac{1}{\\sqrt{${tx(n)}}} = \\dfrac{1}{${s}} = ${tx(1 / s)}$`);
    else dit(4, `$\\dfrac{1}{\\sqrt{${n}}} \\approx ${tx(r3(1 / s))}$`);
  }
  reponse(4, `a) 0,1 ; 0,05 ; environ ${b(1 / Math.sqrt(1000))} ; 0,02 ; 0,01 ; b) par ${(1 / 10) / (1 / 20)} ; c) par ${(1 / 10) / (1 / 100)}.`);
});
essai("5", () => {
  enonceDit(5, "sur 100 lancers, elle obtient 62 « pile »");
  const fq = 0.62;
  dit(5, `l'intervalle ${crochets(0.5, 100)}`);
  vrai("5. rare", !dedans(fq, 0.5, 100));
  dit(5, `$0{,}62 - 0{,}5 = ${tx(fq - 0.5)}$, plus que 0,1`);
  dessinOK(5, "schema", 0.5, 0.1, [fq]);
  reponse(5, `a) ${crochets(0.5, 100)} ; b) rare ; c) non, mais on peut douter de la pièce.`);
});
essai("6", () => {
  // ⭐ Données réelles : environ 105 garçons pour 100 filles (INSEE).
  enonceDit(6, "environ 105 garçons pour 100 filles. Une sage-femme compte, dans sa maternité, 1340 garçons sur 2500 naissances");
  const p = r3(105 / 205), fq = 1340 / 2500;
  dit(6, `$p = 105 \\div 205 \\approx ${tx(p)}$`);
  dit(6, `l'intervalle ${crochets(p, 2500)}`);
  dit(6, `$f = 1340 \\div 2500 = ${tx(fq)}$`);
  vrai("6. rare (au-dessus)", fq > r3(IC(p, 2500)[1]));
  dessinOK(6, "schema", p, 0.02, [fq]);
  reponse(6, `a) environ ${plat(p)} ; b) ${crochets(p, 2500)} ; c) non, ${plat(fq)} est une fréquence rare.`);
});
essai("7", () => {
  vrai("7. 1600 donne 0,025", 1 / Math.sqrt(1600) === 0.025 && 400 * 4 === 1600);
  dit(7, `$400 \\times 4 = 1600$ adhérents`);
  dit(7, `$\\dfrac{1}{\\sqrt{800}} \\approx ${tx(r3(1 / Math.sqrt(800)))}$`);
  vrai("7. 800 ne suffit pas", 1 / Math.sqrt(800) > 0.025);
  reponse(7, `a) 1600 adhérents ; b) environ ${b(1 / Math.sqrt(800))}.`);
});
essai("8", () => {
  dit(8, `$100 \\times 9 = 900$ graines`);
  dit(8, `$\\dfrac{1}{\\sqrt{900}} = \\dfrac{1}{30} \\approx ${tx(r3(1 / 30))}$, et $0{,}1 \\div 3 \\approx ${tx(r3(0.1 / 3))}$`);
  vrai("8. b) 2500 = 100 × 5²", 2500 === 100 * 25 && (1 / 10) / (1 / Math.sqrt(2500)) === 5);
  reponse(8, "a) 900 graines ; b) par 5.");
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const [, l] = dessin("grille", 9, "figure");
  // L'échantillon k : colonne ⌊(k − 1) ÷ 5⌋, ligne (k − 1) mod 5.
  const ech = Array.from({ length: 20 }, (_, k) => l[k % 5][Math.floor(k / 5)]);
  const dehors = ech.map((x, i) => [x, i + 1]).filter(([x]) => !dedans(x, 0.3, 100));
  dit(9, `l'intervalle ${crochets(0.3, 100)}`);
  vrai("9. un seul échantillon dehors, le 8 (0,41)", dehors.length === 1 && dehors[0][1] === 8 && dehors[0][0] === 0.41);
  vrai("9. 0,22 et 0,38 bien présents", ech.includes(0.22) && ech.includes(0.38));
  dit(9, `$20 - 1 = 19$ échantillons dans l'intervalle. $19 \\div 20 = 0{,}95$, soit 95 %`);
  reponse(9, `a) ${crochets(0.3, 100)} ; b) 1 ; c) 95 %, conforme.`);
});
essai("10", () => {
  // ⭐ Données réelles : 58,55 % des exprimés (Conseil constitutionnel, 2022).
  enonceDit(10, "58,55 % des suffrages exprimés");
  const p = 0.5855, n = 1000, e = 1 / Math.sqrt(n);
  dit(10, `Bornes : $0{,}5855 - ${tx(r4(e))} \\approx ${tx(r3(p - e))}$ et $0{,}5855 + ${tx(r4(e))} \\approx ${tx(r3(p + e))}$`);
  const [, l] = dessin("grille", 10, "figure");
  const fs = l.map((r) => nb(r[2]) / 100);
  const d = fs.map((x) => Math.abs(x - p));
  for (const x of d) dit(10, tx(Number(x.toFixed(4))));
  const rares = l.filter((r, i) => !dedans(fs[i], p, n)).map((r) => r[0]);
  vrai("10. seul C est rare", memes(rares, ["C"]));
  reponse(10, `a) ${crochets(p, n)} ; b) ${d.slice(0, -1).map((x) => plat(Number(x.toFixed(4)))).join(", ")} et ${plat(Number(d.at(-1).toFixed(4)))} : le sondage C est rare.`);
  function r4(x) {
    return Number(x.toFixed(4));
  }
});
essai("11", () => {
  enonceDit(11, "80 % de ses vols partent à l'heure");
  const [, l] = dessin("grille", 11, "figure");
  const fs = l.map((r) => r[2] / r[1]);
  dit(11, `l'intervalle ${crochets(0.8, 400)}`);
  l.forEach((r, i) => dit(11, `$${r[2]} \\div ${r[1]} = ${tx(fs[i])}$`));
  vrai("11. mars courant, avril rare", dedans(fs[0], 0.8, 400) && !dedans(fs[1], 0.8, 400));
  reponse(11, `a) ${crochets(0.8, 400)} ; b) ${plat(fs[0])} et ${plat(fs[1])}, avril est rare ; c) elle peut douter de l'annonce, sans la déclarer fausse.`);
});
essai("12", () => {
  enonceDit(12, "35 % des clients utilisent l'application chaque semaine. Il observe 900 clients");
  const [, , , o] = dessin("intervalle", 12, "figure");
  vrai("12. la figure sans bande", o.e === undefined && o.p === 0.35);
  dessinOK(12, "schema", 0.35, 1 / 30, o.points.map((x) => x.value));
  dit(12, `Bornes : $0{,}35 - 0{,}0333 \\approx ${tx(r3(0.35 - 1 / 30))}$ et $0{,}35 + 0{,}0333 \\approx ${tx(r3(0.35 + 1 / 30))}$`);
  const rares = o.points.filter((x) => !dedans(x.value, 0.35, 900)).map((x) => x.label);
  vrai("12. seule l'agence Nord est rare", memes(rares, ["Nord"]));
  reponse(12, `a) ${crochets(0.35, 900)} ; b) l'agence Nord.`);
});
essai("13", () => {
  const [, l] = dessin("grille", 13, "figure");
  const [na, nb2] = l.map((r) => r[1]);
  dit(13, `$\\dfrac{1}{\\sqrt{${na}}} = \\dfrac{1}{${Math.sqrt(na)}} \\approx ${tx(r3(1 / Math.sqrt(na)))}$`);
  dit(13, `$\\dfrac{1}{\\sqrt{${nb2}}} = \\dfrac{1}{${Math.sqrt(nb2)}} \\approx ${tx(r3(1 / Math.sqrt(nb2)))}$`);
  vrai("13. B deux fois plus précis", Math.sqrt(nb2 / na) === 2);
  dit(13, `$n = 100^2 = 10\\,000$ personnes`);
  reponse(13, `a) environ ${b(1 / Math.sqrt(na))} et ${b(1 / Math.sqrt(nb2))} ; b) B, 2 fois plus précis ; c) 10 000 personnes.`);
});
essai("14", () => {
  const [, , , o] = dessin("intervalle", 14, "figure");
  vrai("14. p = 0,5, deux affiches", o.p === 0.5 && memes(o.points.map((x) => x.value), [0.46, 0.54]));
  enonceDit(14, "46 % se souviennent de l'affiche 1, 54 % de l'affiche 2");
  vrai("14. les deux courantes", o.points.every((x) => dedans(x.value, 0.5, 100)));
  reponse(14, `a) ${crochets(0.5, 100)} ; b) courantes toutes les deux ; c) non, l'écart peut venir de la fluctuation.`);
});
essai("15", () => {
  enonceDit(15, "25 % de ses visiteurs achètent");
  const [, l] = dessin("grille", 15, "figure");
  const fs = l.map((r) => r[2] / r[1]);
  dit(15, `l'intervalle ${crochets(0.25, 400)}`);
  l.forEach((r, i) => dit(15, `$${r[2]} \\div ${r[1]} = ${tx(fs[i])}$`));
  vrai("15. avant courant, après rare par le haut", dedans(fs[0], 0.25, 400) && fs[1] > r3(IC(0.25, 400)[1]));
  reponse(15, `a) ${crochets(0.25, 400)} ; b) ${plat(fs[0])} courante, ${plat(fs[1])} rare ; c) il a sans doute augmenté les achats.`);
});
essai("16", () => {
  enonceDit(16, "Un entretien coûte 15 €. Le client voulait 500 entretiens");
  dit(16, `$500 \\times 15 = ${500 * 15}$ €`);
  dit(16, `$500 \\times 4 = 2000$ entretiens, soit $2000 \\times 15 = 30\\,000$ €`);
  dit(16, `$\\dfrac{1}{\\sqrt{500}} \\approx ${tx(r3(1 / Math.sqrt(500)))}$ et $\\dfrac{1}{\\sqrt{2000}} \\approx ${tx(r3(1 / Math.sqrt(2000)))}$`);
  vrai("16. divisé par 2 exactement", Math.abs(Math.sqrt(2000 / 500) - 2) < 1e-12);
  reponse(16, "a) 7500 € ; b) 2000 entretiens, $30\\,000$ € ; c) par 4.");
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  // ⭐ Données réelles : roulette européenne, 18 rouges sur 37.
  enonceDit(17, "37 cases : 18 rouges, 18 noires et le zéro");
  const p = 18 / 37;
  const [, l] = dessin("grille", 17, "figure");
  vrai("17. 2500 tirages", l[0][1] + l[1][1] + l[2][1] === 2500 && l[3][1] === 2500);
  const fq = l[0][1] / 2500;
  dit(17, `$p = 18 \\div 37 \\approx ${tx(r3(p))}$`);
  dit(17, `$0{,}4865 - 0{,}02 \\approx ${tx(r3(p - 0.02))}$ et $0{,}4865 + 0{,}02 \\approx ${tx(r3(p + 0.02))}$`);
  vrai("17. rare avec p = 18/37, courant avec 0,5", !dedans(fq, p, 2500) && dedans(fq, 0.5, 2500));
  reponse(17, `a) environ ${b(p)} ; b) ${crochets(p, 2500)} ; c) ${plat(fq)}, rare ; d) faire contrôler la table.`);
});
essai("18", () => {
  const [, l] = dessin("grille", 18, "figure");
  const fq = l[0][1] / l[2][1];
  vrai("18. 228 + 172 = 400", l[0][1] + l[1][1] === l[2][1]);
  dit(18, `$f = ${l[0][1]} \\div ${l[2][1]} = ${tx(fq)}$`);
  vrai("18. rare si p = 0,5", !dedans(fq, 0.5, 400));
  vrai("18. c) 2500 donne 0,02", 1 / Math.sqrt(2500) === 0.02 && Math.abs(400 * 2.5 ** 2 - 2500) < 1e-9);
  reponse(18, `a) ${crochets(0.5, 400)} ; b) ${plat(fq)}, rare : on doute de l'idée de l'adjointe ; c) 2500 habitants.`);
});
essai("19", () => {
  enonceDit(19, "80 % de ses graines germent");
  const [, l] = dessin("grille", 19, "figure");
  const fs = l.map((r) => r[2] / r[1]);
  l.forEach((r, i) => dit(19, `Lot ${r[0]} : $${r[2]} \\div ${r[1]} = ${tx(fs[i])}$`));
  const rares = l.filter((r, i) => !dedans(fs[i], 0.8, 400)).map((r) => r[0]);
  vrai("19. seul le lot 3 est rare", memes(rares, [3]));
  reponse(19, `a) ${crochets(0.8, 400)} ; b) ${fs.slice(0, -1).map(plat).join(", ")} et ${plat(fs[3])} : le lot 3 est rare ; c) non ; d) 1600 graines.`);
});
essai("20", () => {
  const [, l] = dessin("grille", 20, "figure");
  const rows = l.map((r) => [nb(r[0]), r[1]]);
  const N = somme(rows.map((r) => r[1]));
  vrai("20. 50 échantillons, fréquences de 25 clients", N === 50 && rows.every(([x]) => Math.abs(x * 25 - Math.round(x * 25)) < 1e-9));
  const dehors = rows.filter(([x]) => !dedans(x, 0.4, 25));
  const nd = somme(dehors.map((r) => r[1]));
  dit(20, `l'intervalle ${crochets(0.4, 25)}`);
  dit(20, `$${N} - ${nd} = ${N - nd}$, et $${N - nd} \\div ${N} = ${tx((N - nd) / N)}$, soit ${plat(((N - nd) / N) * 100)} %`);
  const S = Number(somme(rows.map(([x, c]) => x * c)).toFixed(6));
  dit(20, `${rows.map(([x, c]) => `${tx(x)} \\times ${c}`).join(" + ")} = ${tx(S)}$`);
  dit(20, `$${tx(S)} \\div ${N} = ${tx(S / N)}$, soit environ ${b(S / N)}`);
  reponse(20, `a) ${crochets(0.4, 25)} ; b) ${nd} dehors, ${plat(((N - nd) / N) * 100)} % dedans ; c) environ ${b(S / N)}, proche de 0,4.`);
});

f.fin();
