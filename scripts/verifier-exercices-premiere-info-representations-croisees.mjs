// Recalcul indépendant de la feuille « Représenter deux caractères » (1re,
// 28/09/2026) : lib/fiches-exercices/maths-premiere-info-representations-croisees.tsx.
// Les dessins sont RELUS dans le source (`barresCroisees`, `demiCercle`,
// `diagramme`, `tableauProba`) : chaque lecture, chaque pourcentage, chaque
// angle annoncé est recalculé à partir d'eux ; les barres empilées « à 100 % »
// doivent sommer à 100 ; une barre en pourcentages redessinée dans un corrigé
// doit être la répartition des effectifs de l'énoncé.
// Usage : node scripts/verifier-exercices-premiere-info-representations-croisees.mjs

import { demarrer } from "./verifier-exercices-premiere-info-outils.mjs";

const V = demarrer("lib/fiches-exercices/maths-premiere-info-representations-croisees.tsx", "info_representations_croisees");
const { verif, vrai, dit, appels, bloc, tableauxDe, tableauJuste, frequence: f } = V;

/** Les barres de l'exercice k (le i-ième appel) : v(groupe, série). */
const barres = (k, i = 0) => {
  const [groupes, series, mode = "groupees"] = appels("barresCroisees", bloc(k))[i];
  const v = (g, s) => series.find((x) => x.nom === s).valeurs[groupes.indexOf(g)];
  const total = (g) => series.reduce((acc, x) => acc + x.valeurs[groupes.indexOf(g)], 0);
  return { groupes, series, mode, v, total };
};
const cent = (k, b) => b.groupes.forEach((g) => verif(`E${k} barre « ${g} » à 100 %`, b.total(g), 100));
const camembert = (k) => {
  const [[, data]] = appels("diagramme", bloc(k));
  return data;
};
const demi = (k) => appels("demiCercle", bloc(k))[0][0];
/** Répartition en % d'effectifs → la barre à 100 % dessinée. */
const memeRepartition = (k, effectifs, b) =>
  b.groupes.forEach((g, i) => b.series.forEach((s, j) => verif(`E${k} ${g}/${s.nom}`, s.valeurs[i], (100 * effectifs[i][j]) / effectifs[i].reduce((a, x) => a + x, 0))));

/* ═══════════════ ★ ═══════════════ */
{
  const b = barres(1);
  verif("E1 a", b.v("Basket", "Garçons") * 1000, 7000);
  const filles = b.groupes.map((g) => b.v(g, "Filles"));
  vrai("E1 b basket", b.groupes[filles.indexOf(Math.max(...filles))] === "Basket");
  const ecarts = b.groupes.map((g) => Math.abs(b.v(g, "Garçons") - b.v(g, "Filles")));
  vrai("E1 c football", b.groupes[ecarts.indexOf(Math.max(...ecarts))] === "Football");
  verif("E1 c écart", Math.max(...ecarts), 12);
  dit(1, "$16 - 4 = 12$", "$7 - 6 = 1$", "$6 - 5 = 1$");
}
{
  const b = barres(2);
  cent(2, b);
  vrai("E2 empilées", b.mode === "empilees");
  verif("E2 a", b.v("Maisons", "Bois"), 30);
  verif("E2 b", b.v("Apparts", "Gaz"), 35);
  verif("E2 b sommet", b.v("Apparts", "Élec.") + b.v("Apparts", "Gaz"), 95);
  dit(2, "$30$ %", "$35$ %", "$60 + 35 = 95$");
}
{
  const parts = { Forêts: 45, Cultures: 30, Prairies: 15, Bâti: 10 };
  const angles = Object.values(parts).map((p) => p * 3.6);
  [162, 108, 54, 36].forEach((a, i) => verif(`E3 angle ${i}`, angles[i], a));
  verif("E3 total", angles.reduce((s, x) => s + x), 360);
  camembert(3).forEach((d) => verif(`E3 dessin ${d.label}`, d.value, parts[d.label]));
  dit(3, "$45 \\times 3{,}6 = 162°$", "$30 \\times 3{,}6 = 108°$", "$15 \\times 3{,}6 = 54°$", "$10 \\times 3{,}6 = 36°$");
}
{
  f(4, 144, 360, 0.4);
  f(4, 90, 360, 0.25);
  verif("E4 logement €", 0.4 * 800, 320);
  verif("E4 courses €", 0.25 * 800, 200);
  const d = camembert(4);
  verif("E4 dessin total", d.reduce((s, x) => s + x.value, 0), 100);
  verif("E4 dessin logement", d.find((x) => x.label === "Logement").value * 3.6, 144);
  verif("E4 dessin courses", d.find((x) => x.label === "Courses").value * 3.6, 90);
}
{
  const p = demi(5);
  const tot = p.reduce((s, x) => s + x.value, 0);
  verif("E5 sièges", tot, 200);
  const A = p.find((x) => x.label === "Groupe A").value, D = p.find((x) => x.label === "Groupe D").value;
  f(5, A, tot, 0.45);
  verif("E5 angle A", (A / tot) * 180, 81);
  verif("E5 angle D", (D / tot) * 180, 18);
  verif("E5 piège", (A / tot) * 360, 162);
  dit(5, "$45 \\times 1{,}8 = 81°$", "$10 \\times 1{,}8 = 18°$");
}
{
  const [t] = tableauxDe(6);
  vrai("E6 le tableau-mémo reprend les quatre choix", ["circulaire", "barres groupées", "empilées à 100 %", "nuage de points"].every((g, i) => t.lignes[i][1] === g));
}
vrai("E6 quatre réponses", ["Diagramme circulaire", "Barres groupées", "Barres empilées", "Nuage de points"].every((m) => V.c(6).includes(m)));
{
  const b = barres(7);
  vrai("E7 a", b.v("15–17 ans", "Semaine") > b.v("12–14 ans", "Semaine") && b.v("15–17 ans", "Week-end") > b.v("12–14 ans", "Week-end"));
  vrai("E7 b pas le double", b.groupes.every((g) => b.v(g, "Week-end") !== 2 * b.v(g, "Semaine")));
  vrai("E7 c +2 h", b.groupes.every((g) => b.v(g, "Week-end") - b.v(g, "Semaine") === 2));
  dit(7, "$5 - 3 = 2$", "$6 - 4 = 2$");
}
{
  const b = barres(8);
  const [t] = tableauxDe(8);
  tableauJuste("E8", t);
  b.groupes.forEach((g, i) => {
    verif(`E8 ${g} admis`, b.v(g, "Admis") * 100, t.n(i, 1));
    verif(`E8 ${g} refusés`, b.v(g, "Refusés") * 100, t.n(i, 2));
  });
  const admis = b.groupes.map((g) => b.v(g, "Admis"));
  vrai("E8 b licence", b.groupes[admis.indexOf(Math.max(...admis))] === "Licence");
}

/* ═══════════════ ★★ ═══════════════ */
{
  const [t] = tableauxDe(9);
  [0, 1].forEach((i) => verif(`E9 ligne ${i}`, t.n(i, 1) + t.n(i, 2), t.n(i, 3)));
  f(9, t.n(0, 1), t.n(0, 3), 0.75);
  f(9, t.n(1, 1), t.n(1, 3), 0.6);
  const b = barres(9);
  cent(9, b);
  memeRepartition(9, [[t.n(0, 1), t.n(0, 2)], [t.n(1, 1), t.n(1, 2)]], b);
  verif("E9 trois fois plus grande", t.n(1, 3) / t.n(0, 3), 3);
}
{
  const b = barres(10);
  cent(10, b);
  const tot = { 2000: 400, 2020: 500 };
  verif("E10 renouv 2000", (b.v("2000", "Renouv.") / 100) * tot[2000], 40);
  verif("E10 renouv 2020", (b.v("2020", "Renouv.") / 100) * tot[2020], 100);
  verif("E10 × 2,5", 100 / 40, 2.5);
  verif("E10 nucléaire 2000", (b.v("2000", "Nucléaire") / 100) * tot[2000], 160);
  verif("E10 nucléaire 2020", (b.v("2020", "Nucléaire") / 100) * tot[2020], 200);
  dit(10, "$0{,}1 \\times 400 = 40$", "$0{,}2 \\times 500 = 100$", "$0{,}4 \\times 400 = 160$", "$0{,}4 \\times 500 = 200$", "\\dfrac{100}{40} = 2{,}5");
}
{
  const autres = 15000 - 7500 - 3000;
  verif("E11 autres", autres, 4500);
  f(11, 7500, 15000, 0.5);
  f(11, 3000, 15000, 0.2);
  f(11, 4500, 15000, 0.3);
  const d = camembert(11);
  verif("E11 dessin chauffage", d.find((x) => x.label === "Chauffage").value, 50);
  verif("E11 dessin eau", d.find((x) => x.label === "Eau chaude").value, 20);
  verif("E11 dessin autres", d.find((x) => x.label === "Autres").value, 30);
  verif("E11 angles", 0.5 * 360 + 0.2 * 360 + 0.3 * 360, 360);
  dit(11, "$0{,}5 \\times 360 = 180°$", "$0{,}2 \\times 360 = 72°$", "$0{,}3 \\times 360 = 108°$");
}
{
  const b = barres(12, 0);
  verif("E12 urbain", b.total("Urbain"), 600);
  verif("E12 rural", b.total("Rural"), 200);
  verif("E12 a", b.v("Rural", "Bus"), 140);
  f(12, b.v("Urbain", "Bus"), 600, 0.5);
  f(12, b.v("Rural", "Bus"), 200, 0.7);
  const p = barres(12, 1);
  cent(12, p);
  memeRepartition(12, b.groupes.map((g) => b.series.map((s) => b.v(g, s.nom))), p);
}
{
  const p = demi(13);
  const tot = p.reduce((s, x) => s + x.value, 0);
  verif("E13 sièges", tot, 40);
  verif("E13 par siège", 180 / tot, 4.5);
  [81, 63, 36].forEach((a, i) => verif(`E13 angle ${p[i].label}`, p[i].value * 4.5, a));
  vrai("E13 b aucune seule", p.every((x) => x.value <= tot / 2));
  const paires = [[0, 1], [0, 2], [1, 2]].map(([i, j]) => p[i].value + p[j].value);
  verif("E13 c", paires.join(), "32,26,22");
  vrai("E13 c majorité", paires.every((s) => s > tot / 2));
}
{
  const b = barres(14);
  vrai("E14 pas à 100 %", b.mode === "empilees" && b.total("2024") !== 100);
  verif("E14 a", b.total("2024") * 100, 1000);
  f(14, b.v("2022", "Élec."), b.total("2022"), 0.25);
  f(14, b.v("2024", "Élec."), b.total("2024"), 0.6);
  verif("E14 totaux", b.groupes.map((g) => b.total(g) * 100).join(), "800,900,1000");
  verif("E14 triple", b.v("2024", "Élec.") / b.v("2022", "Élec."), 3);
}
{
  verif("E15 somme", 40 + 35 + 50, 125);
  const [[, data]] = appels("diagramme", bloc(15));
  verif("E15 dessin", data.map((d) => d.value).join(), "40,35,50");
}
{
  const b = barres(16);
  cent(16, b);
  verif("E16 a", b.v("Ados", "< 2 h"), 50);
  verif("E16 c enfants", b.v("Enfants", "> 5 h"), 40);
  vrai("E16 c enfants en tête", b.v("Enfants", "> 5 h") > b.v("Ados", "> 5 h") && b.v("Enfants", "> 5 h") > b.v("Adultes", "> 5 h"));
  verif("E16 d", b.v("Adultes", "< 2 h") + b.v("Adultes", "2 à 5 h"), 80);
  verif("E16 d bis", 100 - b.v("Adultes", "> 5 h"), 80);
}

/* ═══════════════ ★★★ ═══════════════ */
{
  const A = [100, 350, 50], B = [240, 60, 300];
  verif("E17 total A", A.reduce((s, x) => s + x), 500);
  verif("E17 total B", B.reduce((s, x) => s + x), 600);
  const b = barres(17);
  cent(17, b);
  memeRepartition(17, [A, B], b);
  [[100, 0.2], [350, 0.7], [50, 0.1]].forEach(([x, v]) => f(17, x, 500, v));
  [[240, 0.4], [60, 0.1], [300, 0.5]].forEach(([x, v]) => f(17, x, 600, v));
}
{
  const d = camembert(18);
  verif("E18 total", d.reduce((s, x) => s + x.value, 0), 100);
  const angle = (l) => d.find((x) => x.label === l).value * 3.6;
  verif("E18 logement", angle("Loyer"), 108);
  verif("E18 courses", angle("Repas"), 72);
  verif("E18 transport", angle("Trajets"), 54);
  verif("E18 autres", angle("Autres"), 126);
  verif("E18 montants", d.map((x) => (x.value / 100) * 2000).join(), "600,400,300,700");
  const F2 = [800, 600, 400, 2200];
  verif("E18 famille 2", F2.reduce((s, x) => s + x), 4000);
  [[800, 0.2], [600, 0.15], [400, 0.1], [2200, 0.55]].forEach(([x, v]) => f(18, x, 4000, v));
  vrai("E18 c", 800 > 600 && 0.2 < d.find((x) => x.label === "Loyer").value / 100);
  vrai("E18 libellés courts (7 signes au plus)", d.every((x) => [...x.label].length <= 7));
}
{
  const b = barres(19, 0);
  verif("E19 ville", b.total("Ville"), 300);
  verif("E19 campagne", b.total("Campagne"), 200);
  verif("E19 a", b.v("Campagne", "Contre"), 100);
  f(19, 180, 300, 0.6);
  f(19, 80, 200, 0.4);
  f(19, 100, 200, 0.5);
  f(19, 20, 200, 0.1);
  vrai("E19 c pas majoritaire", !(b.v("Campagne", "Contre") > b.total("Campagne") / 2));
  const p = barres(19, 1);
  cent(19, p);
  memeRepartition(19, b.groupes.map((g) => b.series.map((s) => b.v(g, s.nom))), p);
  verif("E19 deux fois et demie", 50 / 20, 2.5);
}
{
  const p = demi(20);
  const tot = p.reduce((s, x) => s + x.value, 0);
  verif("E20 sièges", tot, 300);
  [72, 54, 36, 18].forEach((a, i) => verif(`E20 angle ${p[i].label}`, (p[i].value / tot) * 180, a));
  const v = Object.fromEntries(p.map((x) => [x.label.slice(-1), x.value]));
  const majo = (s) => s >= 151;
  vrai("E20 A+B", majo(v.A + v.B) && v.A + v.B === 210);
  vrai("E20 A+C", majo(v.A + v.C) && v.A + v.C === 180);
  vrai("E20 A+D, B+C", !majo(v.A + v.D) && v.A + v.D === 150 && v.B + v.C === 150);
  vrai("E20 B+D, C+D", !majo(v.B + v.D) && !majo(v.C + v.D));
  f(20, 120, 300, 0.4);
}

V.reglesDeRendu();
V.finir();
