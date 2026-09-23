// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Les statistiques
// descriptives » de seconde (lib/fiches-exercices/maths-seconde-statistiques.tsx).
//
// ⭐ L'AUTRE CHEMIN : chaque série est recopiée ICI depuis l'énoncé ; moyenne,
// médiane, quartiles (rang N/4 et 3N/4 arrondis au-dessus, la convention de la
// fiche de cours), variance et écart type sont refaits, puis le corrigé doit
// ÉCRIRE le bon résultat. Les canvas sont RELUS dans le source : les cinq
// nombres de chaque boîte, les barres de chaque diagramme, les cases des
// tableaux, et comparés aux séries.
//
//   node scripts/verifier-exercices-statistiques.mjs

import { lireFeuille, outilsEgalites, lancer } from "./verifier-exercices-commun.mjs";

const somme = (t) => t.reduce((s, x) => s + x, 0);
const moyenne = (t) => somme(t) / t.length;
const range = (t) => [...t].sort((a, b) => a - b);
const mediane = (t) => { const s = range(t), n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
const quartile = (t, p) => range(t)[Math.ceil(t.length * p) - 1];
const variance = (t) => { const m = moyenne(t); return moyenne(t.map((x) => (x - m) ** 2)); };
const deplie = (valeurs, effectifs) => valeurs.flatMap((v, i) => Array(effectifs[i]).fill(v));
const cinq = (t) => [Math.min(...t), quartile(t, 0.25), mediane(t), quartile(t, 0.75), Math.max(...t)];
const proche = (a, b, tol = 0.005) => Math.abs(a - b) < tol;
const tx = (n) => String(n).replace(".", "{,}");

function canvas(bloc) {
  const boites = [...bloc.matchAll(/\{ (?:label: "([^"]*)", )?min: (-?[\d.]+), q1: (-?[\d.]+), mediane: (-?[\d.]+), q3: (-?[\d.]+), max: (-?[\d.]+)/g)].map((m) => ({ label: m[1], v: m.slice(2, 7).map(Number) }));
  const barres = [...bloc.matchAll(/\{ label: "([^"]*)", value: (-?[\d.]+) \}/g)].map((m) => [m[1], Number(m[2])]);
  const tableaux = [...bloc.matchAll(/tableau\(\[([^\]]*)\], \[([^\]]*)\]/g)].map((m) => ({
    entete: [...m[1].matchAll(/"([^"]*)"/g)].map((x) => x[1]),
    ligne: m[2].split(", ").map((x) => x.trim().replace(/^"|"$/g, "")),
  }));
  return { boites, barres, tableaux };
}

function verifier(source, v) {
  const f = lireFeuille(source);
  const c = (k) => f.corrections[k - 1] ?? "";
  const e = (k) => f.enonces[k - 1] ?? "";
  const egalites = outilsEgalites(v, f);
  const ecrit = (k, texte) => v.ok(`${k}. le corrigé écrit ${texte}`, c(k).includes(texte), texte);
  const cv = (k) => canvas(f.blocs[k - 1]);
  /** Chaque boîte dessinée donne les cinq nombres recalculés de sa série. */
  const boitesJustes = (k, series) => {
    const b = cv(k).boites;
    v.ok(`${k}. ${b.length} boîte(s), les cinq nombres de chaque série`, b.length > 0 && b.every((x, i) => String(x.v) === String(cinq(series[i % series.length]))), JSON.stringify(b.map((x) => x.v)) + " attendu " + JSON.stringify(series.map(cinq)));
  };
  /** Les barres dessinées portent les valeurs attendues, dans l'ordre. */
  const barresJustes = (k, valeurs) => {
    const b = cv(k).barres.map(([, x]) => x);
    v.ok(`${k}. le diagramme porte ${valeurs.join(", ")}`, String(b) === String(valeurs), String(b));
  };
  const ligneTableau = (k, i, attendu) => {
    const t = cv(k).tableaux[i];
    const lu = t ? t.ligne.slice(1).map((x) => Number(x.replace(/\s/g, "").replace(",", "."))) : [];
    v.ok(`${k}. le tableau ${i + 1} donne ${attendu.join(", ")}`, String(lu) === String(attendu), String(lu));
  };

  v.titre("★ Un seul geste");
  const notes = [8, 10, 12, 14, 16], eff1 = [3, 5, 8, 6, 3];
  const serie1 = deplie(notes, eff1);
  v.ok("1. N = 25, 17 élèves ≥ 12, fréquences 0,32 et 0,68", serie1.length === 25 && serie1.filter((x) => x >= 12).length === 17 && 8 / 25 === 0.32 && 17 / 25 === 0.68);
  egalites(1, "3 + 5 + 8 + 6 + 3 = 25");
  ecrit(1, "$\\dfrac{8}{25} = 0{,}32$");
  ecrit(1, "$\\dfrac{17}{25} = 0{,}68$");
  ligneTableau(1, 0, eff1);
  barresJustes(1, eff1);

  const tours = [72, 75, 70, 78, 85];
  v.ok("2. moyenne 76, (min + max)/2 = 77,5 ≠ 76", moyenne(tours) === 76 && (70 + 85) / 2 === 77.5);
  egalites(2, "72 + 75 + 70 + 78 + 85 = 380");
  ecrit(2, "$\\dfrac{380}{5} = 76$");
  barresJustes(2, tours);

  v.ok("3. moyenne 12,08", proche(moyenne(serie1), 12.08) && somme(serie1) === 302);
  egalites(3, "8 \\times 3 + 10 \\times 5 + 12 \\times 8 + 14 \\times 6 + 16 \\times 3 = 24 + 50 + 96 + 84 + 48 = 302");
  ecrit(3, "$\\dfrac{302}{25} = 12{,}08$");
  ligneTableau(3, 0, notes.map((n, i) => n * eff1[i]));

  const s4 = [14, 9, 17, 11, 20, 9, 15];
  v.ok("4. médiane 14 ; la 4e valeur NON rangée est 11", mediane(s4) === 14 && s4[3] === 11);
  ecrit(4, "Donc la médiane est $14$");
  ecrit(4, `On RANGE d'abord : ${range(s4).map((x) => `$${x}$`).join(", ")}`);
  boitesJustes(4, [s4]);

  const s5 = [3, 12, 7, 15, 10, 8, 6, 5];
  v.ok("5. médiane 7,5 ; sans ranger (15 + 10)/2 = 12,5", mediane(s5) === 7.5 && (s5[3] + s5[4]) / 2 === 12.5);
  ecrit(5, "$\\dfrac{7 + 8}{2} = 7{,}5$");
  boitesJustes(5, [s5]);

  const s6 = [9, 4, 15, 2, 12, 7, 18, 4, 11, 5, 13, 8];
  v.ok("6. médiane 8,5, Q1 = 4, Q3 = 12, EI = 8", mediane(s6) === 8.5 && quartile(s6, 0.25) === 4 && quartile(s6, 0.75) === 12);
  ecrit(6, `On range : ${range(s6).map((x) => `$${x}$`).join(", ")}`);
  ecrit(6, "$\\dfrac{8 + 9}{2} = 8{,}5$");
  ecrit(6, "$Q_1 = 4$");
  ecrit(6, "$Q_3 = 12$");
  egalites(6, "12 - 4 = 8");
  boitesJustes(6, [s6]);

  const trans = [18, 10, 4, 8];
  v.ok("7. fréquences 0,45 ; 0,25 ; 0,1 ; 0,2, de somme 1", somme(trans) === 40 && String(trans.map((x) => x / 40)) === "0.45,0.25,0.1,0.2");
  for (const [n, fr] of [[18, "0{,}45"], [10, "0{,}25"], [4, "0{,}1"], [8, "0{,}2"]]) ecrit(7, `$\\dfrac{${n}}{40} = ${fr}$`);
  barresJustes(7, trans);

  egalites(8, "1{,}8 \\times 20 + 32 = 36 + 32 = 68");
  egalites(8, "11{,}4 + 2 = 13{,}4");
  egalites(8, "1{,}8 \\times 3 = 5{,}4");
  // Linéarité, jouée sur une série quelconque : moyenne ET écart type.
  const t8 = [17, 21, 19, 24, 16, 23, 20];
  const F = t8.map((x) => 1.8 * x + 32);
  v.ok("8. la moyenne suit 1,8C + 32, l'écart type seulement × 1,8", proche(moyenne(F), 1.8 * moyenne(t8) + 32) && proche(Math.sqrt(variance(F)), 1.8 * Math.sqrt(variance(t8))));

  v.titre("★★ Type devoir");
  const pts = [36, 37, 38, 39, 40, 41], eff9 = [2, 5, 9, 8, 4, 2];
  const s9 = deplie(pts, eff9);
  v.ok("9. N = 30, médiane 38, Q1 = 38, Q3 = 39, moyenne ≈ 38,43", s9.length === 30 && mediane(s9) === 38 && quartile(s9, 0.25) === 38 && quartile(s9, 0.75) === 39 && proche(moyenne(s9), 38.43, 0.005));
  ecrit(9, "$2$, $7$, $16$, $24$, $28$, $30$");
  egalites(9, "36 \\times 2 + 37 \\times 5 + 38 \\times 9 + 39 \\times 8 + 40 \\times 4 + 41 \\times 2 = 72 + 185 + 342 + 312 + 160 + 82 = 1\\,153");
  ecrit(9, "\\approx 38{,}43$");
  ecrit(9, "donc $Q_1 = 38$");
  ecrit(9, "donc $Q_3 = 39$");
  ligneTableau(9, 0, eff9);
  ligneTableau(9, 1, eff9.map((_, i) => somme(eff9.slice(0, i + 1))));
  boitesJustes(9, [s9]);

  const s10 = [4, 6, 8, 10, 12];
  v.ok("10. moyenne 8, variance 8, σ ≈ 2,83", moyenne(s10) === 8 && variance(s10) === 8 && proche(Math.sqrt(8), 2.83));
  ecrit(10, "$\\sqrt{8} = 2\\sqrt{2} \\approx 2{,}83$");
  egalites(10, "\\dfrac{16 + 4 + 0 + 4 + 16}{5} = \\dfrac{40}{5} = 8");
  ligneTableau(10, 0, s10.map((x) => (x - 8) ** 2));

  const A11 = [7, 8, 8, 9, 8], B11 = [10, 5, 10, 6, 9];
  v.ok("11. moyennes 8 et 8, variances 0,4 et 4,4, σ ≈ 0,63 et 2,10", moyenne(A11) === 8 && moyenne(B11) === 8 && proche(variance(A11), 0.4, 1e-9) && proche(variance(B11), 4.4, 1e-9) && proche(Math.sqrt(0.4), 0.63) && proche(Math.sqrt(4.4), 2.1));
  ecrit(11, "$\\sqrt{0{,}4} \\approx 0{,}63$");
  ecrit(11, "$\\sqrt{4{,}4} \\approx 2{,}10$");
  ecrit(11, "on choisit A");
  boitesJustes(11, [A11, B11]);

  const b12 = cv(12).boites;
  v.ok("12. la boîte de l'énoncé et celle du corrigé sont les mêmes : 12, 18, 23, 30, 45", b12.length === 2 && b12.every((x) => String(x.v) === "12,18,23,30,45"));
  egalites(12, "30 - 18 = 12");
  egalites(12, "45 - 12 = 33");
  egalites(12, "0{,}25 \\times 200 = 50");

  v.ok("13. il faut 13", 12 * 5 - (12 + 9 + 15 + 11) === 13 && moyenne([12, 9, 15, 11, 13]) === 12 && moyenne([12, 9, 15, 11]) === 11.75);
  egalites(13, "12 + 9 + 15 + 11 = 47");
  egalites(13, "60 - 47 = 13");
  ecrit(13, "une moyenne de $11{,}75$");
  barresJustes(13, [12, 9, 15, 11, 13]);

  egalites(14, "1\\,800 \\times 1{,}03 = 1\\,854");
  egalites(14, "250 \\times 1{,}03 = 257{,}5");
  ligneTableau(14, 0, [1800, 1854, 1850]);
  ligneTableau(14, 1, [250, 257.5, 250]);

  v.ok("15. moyenne pondérée 13,9 ; simple 14,75", (14 * 4 + 11 * 3 + 16 * 2 + 18) / 10 === 13.9 && moyenne([14, 11, 16, 18]) === 14.75);
  egalites(15, "14 \\times 4 + 11 \\times 3 + 16 \\times 2 + 18 \\times 1 = 56 + 33 + 32 + 18 = 139");
  ecrit(15, "$\\dfrac{139}{10} = 13{,}9$");
  ligneTableau(15, 0, [56, 33, 32, 18]);

  v.ok("16. (20 × 11 + 30 × 13) / 50 = 12,2", (20 * 11 + 30 * 13) / 50 === 12.2);
  ecrit(16, "$\\dfrac{220 + 390}{50} = \\dfrac{610}{50} = 12{,}2$");
  barresJustes(16, [11, 13, 12.2]);

  v.titre("★★★ Problèmes");
  const sal = deplie([1800, 1900, 2100, 2500, 12000], [4, 3, 2, 1, 1]);
  const sansPDG = sal.filter((x) => x < 12000);
  v.ok("17. total 31 600, moyenne ≈ 2 873, médiane 1 900 ; sans PDG 1 960 et 1 900", somme(sal) === 31600 && Math.round(moyenne(sal)) === 2873 && mediane(sal) === 1900 && moyenne(sansPDG) === 1960 && mediane(sansPDG) === 1900 && sal.filter((x) => x < 2873).length === 10);
  egalites(17, "7\\,200 + 5\\,700 + 4\\,200 + 2\\,500 + 12\\,000 = 31\\,600");
  ecrit(17, "\\approx 2\\,873$ €");
  ecrit(17, "la médiane est $1\\,900$ €");
  ecrit(17, "$\\dfrac{19\\,600}{10} = 1\\,960$ €");
  barresJustes(17, [4, 3, 2, 1, 1]);

  const vA = [7, 7, 9, 10, 13, 15, 17, 17, 15, 12, 9, 7], vB = [1, 3, 7, 11, 16, 20, 22, 21, 17, 12, 6, 2];
  v.ok("18. l'énoncé donne les douze mois de chaque ville", e(18).includes(vA.map((x) => `$${x}$`).join(", ")) && e(18).includes(vB.map((x) => `$${x}$`).join(", ")));
  v.ok("18. mêmes moyennes 11,5 ; A : 11, 7, 15, EI 8 ; B : 11,5, 3, 17, EI 14", somme(vA) === 138 && somme(vB) === 138 && String(cinq(vA)) === "7,7,11,15,17" && String(cinq(vB)) === "1,3,11.5,17,22");
  ecrit(18, `A : ${range(vA).map((x) => `$${x}$`).join(", ")}`);
  ecrit(18, `B : ${range(vB).map((x) => `$${x}$`).join(", ")}`);
  ecrit(18, "A : médiane $\\dfrac{10 + 12}{2} = 11$, $Q_1 = 7$, $Q_3 = 15$, écart interquartile $8$");
  ecrit(18, "B : médiane $\\dfrac{11 + 12}{2} = 11{,}5$, $Q_1 = 3$, $Q_3 = 17$, écart interquartile $14$");
  boitesJustes(18, [vA, vB]);

  const pates = [498, 502, 501, 497, 500, 503, 499, 500, 502, 498];
  v.ok("19. moyenne 500, variance 3,6, σ ≈ 1,90 ; +4 g : 504 et σ inchangé", moyenne(pates) === 500 && proche(variance(pates), 3.6, 1e-9) && proche(Math.sqrt(3.6), 1.9) && moyenne(pates.map((x) => x + 4)) === 504 && proche(variance(pates.map((x) => x + 4)), 3.6, 1e-9));
  ecrit(19, "$\\sqrt{3{,}6} \\approx 1{,}90$ g");
  ecrit(19, "de somme $36$");
  ecrit(19, "la moyenne passe à $504$ g");
  const compte = (x) => pates.filter((p) => p === x).length;
  barresJustes(19, [497, 498, 499, 500, 501, 502, 503].map(compte));

  const eff20 = [6, 14, 18, 8, 4], centres = [0.5, 1.5, 2.5, 3.5, 4.5];
  const cumul20 = eff20.map((_, i) => somme(eff20.slice(0, i + 1)));
  v.ok("20. 12 élèves ≥ 3 h (24 %), moyenne 2,3 h = 2 h 18, médiane dans [2 ; 3[", eff20[3] + eff20[4] === 12 && proche(somme(centres.map((x, i) => x * eff20[i])) / 50, 2.3, 1e-9) && proche(0.3 * 60, 18, 1e-9) && cumul20[1] < 25 && cumul20[2] >= 26);
  egalites(20, "0{,}5 \\times 6 + 1{,}5 \\times 14 + 2{,}5 \\times 18 + 3{,}5 \\times 8 + 4{,}5 \\times 4 = 3 + 21 + 45 + 28 + 18 = 115");
  ecrit(20, "$\\dfrac{115}{50} = 2{,}3$ h");
  ecrit(20, "$\\dfrac{12}{50} = 0{,}24$");
  ligneTableau(20, 0, eff20);
  barresJustes(20, eff20);
}

lancer({
  nom: "LES STATISTIQUES DESCRIPTIVES · seconde · 20 exercices",
  fichier: "lib/fiches-exercices/maths-seconde-statistiques.tsx",
  notionId: "statistiques_descriptives",
  verifier,
  casses: [
    ["ex. 1 : un effectif du tableau changé", "[\"Effectif\", 3, 5, 8, 6, 3]", "[\"Effectif\", 3, 5, 7, 6, 3]"],
    ["ex. 2 : une barre fausse", "{ label: \"T5\", value: 85 }", "{ label: \"T5\", value: 80 }"],
    ["ex. 3 : la moyenne fausse", "$\\\\dfrac{302}{25} = 12{,}08$", "$\\\\dfrac{302}{25} = 12{,}8$"],
    ["ex. 4 : la médiane sans ranger", "Donc la médiane est $14$", "Donc la médiane est $11$"],
    ["ex. 5 : la boîte fausse", "{ min: 3, q1: 5, mediane: 7.5, q3: 10, max: 15 }", "{ min: 3, q1: 5, mediane: 12.5, q3: 10, max: 15 }"],
    ["ex. 6 : Q3 faux", "$Q_3 = 12$", "$Q_3 = 13$"],
    ["ex. 7 : une part du camembert fausse", "{ label: \"Vélo\", value: 4 }", "{ label: \"Vélo\", value: 6 }"],
    ["ex. 8 : l'écart type décalé de 32", "$1{,}8 \\\\times 3 = 5{,}4$", "$1{,}8 \\\\times 3 = 5{,}6$"],
    ["ex. 9 : Q1 au rang 7", "donc $Q_1 = 38$", "donc $Q_1 = 37$"],
    ["ex. 9 : un effectif cumulé faux", "[\"Effectif cumulé\", 2, 7, 16, 24, 28, 30]", "[\"Effectif cumulé\", 2, 7, 15, 24, 28, 30]"],
    ["ex. 10 : l'écart type faux", "$\\\\sqrt{8} = 2\\\\sqrt{2} \\\\approx 2{,}83$", "$\\\\sqrt{8} = 2\\\\sqrt{2} \\\\approx 2{,}38$"],
    ["ex. 11 : la boîte de B fausse", "{ label: \"B\", min: 5, q1: 6, mediane: 9, q3: 10, max: 10", "{ label: \"B\", min: 5, q1: 6, mediane: 8, q3: 10, max: 10"],
    ["ex. 12 : la boîte du corrigé différente de l'énoncé", "schema: boite([{ min: 12, q1: 18, mediane: 23, q3: 30, max: 45 }]", "schema: boite([{ min: 12, q1: 18, mediane: 24, q3: 30, max: 45 }]"],
    ["ex. 13 : la note manquante fausse", "60 - 47 = 13", "60 - 47 = 14"],
    ["ex. 15 : la moyenne pondérée fausse", "$\\\\dfrac{139}{10} = 13{,}9$", "$\\\\dfrac{139}{10} = 14{,}75$"],
    ["ex. 16 : la moyenne des moyennes", "= \\\\dfrac{610}{50} = 12{,}2$", "= \\\\dfrac{610}{50} = 12$"],
    ["ex. 17 : la médiane tirée par le PDG", "la médiane est $1\\\\,900$ €", "la médiane est $2\\\\,873$ €"],
    ["ex. 18 : un mois de la ville B changé", "$21$, $17$, $12$, $6$, $2$", "$21$, $17$, $12$, $6$, $3$"],
    ["ex. 19 : l'écart type faux", "$\\\\sqrt{3{,}6} \\\\approx 1{,}90$ g", "$\\\\sqrt{3{,}6} \\\\approx 1{,}80$ g"],
    ["ex. 20 : une barre fausse", "{ label: \"2-3 h\", value: 18 }", "{ label: \"2-3 h\", value: 16 }"],
  ],
});
