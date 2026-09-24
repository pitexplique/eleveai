// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Les statistiques » de
// 3e (lib/fiches-exercices/maths-3e-statistiques.tsx).
//
// ⭐ L'AUTRE CHEMIN : chaque série est recopiée ICI, brute, depuis l'énoncé (ou
// dépliée depuis son tableau d'effectifs) ; moyenne, médiane (par tri, puis par
// comptage : la plus petite valeur dont au moins la moitié des valeurs sont
// inférieures ou égales), étendue et fréquences sont refaites, puis le corrigé
// doit ÉCRIRE le bon résultat. Les canvas sont RELUS dans le source : chaque
// barre, chaque case de tableau, l'indice de la barre en couleur (la médiane ou
// la moyenne), et comparés aux séries.
//
//   node scripts/verifier-exercices-statistiques-3e.mjs

import { lireFeuille, outilsEgalites, lancer } from "./verifier-exercices-commun.mjs";

const somme = (t) => t.reduce((s, x) => s + x, 0);
const moyenne = (t) => somme(t) / t.length;
const range = (t) => [...t].sort((a, b) => a - b);
const mediane = (t) => { const s = range(t), n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
/** L'autre chemin pour la médiane : sans trier, par comptage des valeurs de part et d'autre. */
const medianeParComptage = (t) => {
  const n = t.length;
  const bas = [...new Set(t)].filter((m) => t.filter((x) => x <= m).length >= n / 2).reduce((a, b) => Math.min(a, b));
  if (n % 2) return bas;
  const haut = [...new Set(t)].filter((m) => t.filter((x) => x >= m).length >= n / 2).reduce((a, b) => Math.max(a, b));
  return (bas + haut) / 2;
};
const etendue = (t) => Math.max(...t) - Math.min(...t);
const deplie = (valeurs, effectifs) => valeurs.flatMap((v, i) => Array(effectifs[i]).fill(v));
const proche = (a, b, tol = 1e-9) => Math.abs(a - b) < tol;
/** 634 → « 634 », 10000 → « 10\,000 », 52.5 → « 52{,}5 ». */
const tx = (x) => { const [e, f] = String(x).split("."); return (e.length >= 4 ? e.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : e) + (f ? `{,}${f}` : ""); };
const liste = (t) => t.map((x) => `$${tx(x)}$`).join(", ");

function canvas(bloc) {
  const diagrammes = [...bloc.matchAll(/diagramme\("(\w+)", \[([^\]]*)\](?:, (\d+))?\)/g)].map((m) => ({
    type: m[1],
    barres: [...m[2].matchAll(/\{ label: "([^"]*)", value: (-?[\d.]+) \}/g)].map((b) => [b[1], Number(b[2])]),
    surligne: m[3] === undefined ? undefined : Number(m[3]),
  }));
  const tableaux = [...bloc.matchAll(/tableau\(\[([^\]]*)\], \[([^\]]*)\]/g)].map((m) => ({
    entete: [...m[1].matchAll(/"([^"]*)"/g)].map((x) => x[1]),
    ligne: m[2].split(", ").map((x) => x.trim().replace(/^"|"$/g, "")),
  }));
  return { diagrammes, tableaux };
}

function verifier(source, v) {
  const f = lireFeuille(source);
  const c = (k) => f.corrections[k - 1] ?? "";
  const e = (k) => f.enonces[k - 1] ?? "";
  const egalites = outilsEgalites(v, f);
  const ecrit = (k, texte) => v.ok(`${k}. le corrigé écrit ${texte}`, c(k).includes(texte), texte);
  const cv = (k) => canvas(f.blocs[k - 1] ?? "");
  const nombre = (s) => Number(String(s).replace(/\s/g, "").replace(",", "."));

  /** Le diagramme i de l'exercice k porte ces valeurs, dans l'ordre, et la barre en couleur est `surligne`. */
  const barres = (k, i, valeurs, surligne) => {
    const d = cv(k).diagrammes[i];
    const lu = d ? d.barres.map(([, x]) => x) : [];
    v.ok(`${k}. diagramme ${i + 1} : ${valeurs.join(", ")}`, String(lu) === String(valeurs), String(lu));
    if (surligne !== undefined) v.ok(`${k}. diagramme ${i + 1} : la barre en couleur est la n° ${surligne + 1} (${valeurs[surligne]})`, d?.surligne === surligne, `lu ${d?.surligne}`);
    return d;
  };
  /** La barre étiquetée `etiquette` du diagramme i vaut `valeur`. */
  const barre = (k, i, etiquette, valeur) => {
    const b = cv(k).diagrammes[i]?.barres.find(([l]) => l === etiquette);
    v.ok(`${k}. la barre « ${etiquette} » vaut ${valeur}`, !!b && proche(b[1], valeur, 1e-6), String(b?.[1]));
  };
  /** La ligne du tableau i de l'exercice k, lue en nombres. */
  const ligneTableau = (k, i, attendu) => {
    const t = cv(k).tableaux[i];
    const lu = t ? t.ligne.slice(1).map(nombre) : [];
    v.ok(`${k}. le tableau ${i + 1} donne ${attendu.join(", ")}`, String(lu) === String(attendu), String(lu));
  };
  const deuxMedianes = (k, t, m) => v.ok(`${k}. médiane ${m}, par tri et par comptage`, mediane(t) === m && medianeParComptage(t) === m, `${mediane(t)} / ${medianeParComptage(t)}`);

  v.titre("★ Un seul geste");
  const buts = [0, 1, 2, 3, 4], eff1 = [4, 8, 7, 4, 2];
  const s1 = deplie(buts, eff1);
  v.ok("1. N = 25, 8 matchs à 1 but, 13 à au moins 2 (52 %), 16 % sans but", s1.length === 25 && s1.filter((x) => x === 1).length === 8 && s1.filter((x) => x >= 2).length === 13 && 13 / 25 === 0.52 && 4 / 25 === 0.16);
  egalites(1, "4 + 8 + 7 + 4 + 2 = 25");
  egalites(1, "7 + 4 + 2 = 13");
  ecrit(1, "$\\dfrac{13}{25} = 0{,}52$");
  ecrit(1, "$\\dfrac{4}{25} = 0{,}16$");
  ligneTableau(1, 0, eff1);
  barres(1, 0, eff1, 1);

  const pluie = [48, 42, 45, 46, 69, 51, 59, 58, 45, 55, 54, 62];
  const mois = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
  const iMax = pluie.indexOf(Math.max(...pluie)), iMin = pluie.indexOf(Math.min(...pluie));
  v.ok(`2. le plus pluvieux : ${mois[iMax]} ; le plus sec : ${mois[iMin]} ; ${pluie.filter((x) => x > 55).length} mois > 55`, mois[iMax] === "Mai" && mois[iMin] === "Fév" && pluie.filter((x) => x > 55).length === 4);
  ecrit(2, `mai, avec $${pluie[iMax]}$ mm`);
  ecrit(2, `février, avec $${pluie[iMin]}$ mm`);
  ecrit(2, `Cela fait $${pluie.filter((x) => x > 55).length}$ mois`);
  ecrit(2, `barre de juillet : $${pluie[6]}$ mm`);
  barres(2, 0, pluie);
  barres(2, 1, pluie, iMax);
  v.ok("2. étiquettes des mois dans l'ordre", String(cv(2).diagrammes[1]?.barres.map(([l]) => l)) === String(mois));

  const s3 = [18, 25, 12, 30, 21, 14];
  v.ok("3. moyenne 20", moyenne(s3) === 20);
  egalites(3, "18 + 25 + 12 + 30 + 21 + 14 = 120");
  ecrit(3, "$\\dfrac{120}{6} = 20$");
  barres(3, 0, [...s3, moyenne(s3)], 6);

  const fs = [0, 1, 2, 3, 4], eff4 = [5, 10, 6, 3, 1];
  const s4 = deplie(fs, eff4);
  v.ok("4. N = 25, moyenne 1,4 ; moyenne des valeurs 2 ≠ 1,4", s4.length === 25 && proche(moyenne(s4), 1.4) && moyenne(fs) === 2);
  egalites(4, "0 \\times 5 + 1 \\times 10 + 2 \\times 6 + 3 \\times 3 + 4 \\times 1 = 0 + 10 + 12 + 9 + 4 = 35");
  ecrit(4, "$\\dfrac{35}{25} = 1{,}4$");
  ligneTableau(4, 0, eff4);
  ligneTableau(4, 1, fs.map((x, i) => x * eff4[i]));
  barres(4, 0, eff4, eff4.indexOf(Math.max(...eff4)));

  const s5 = [52, 47, 61, 44, 58, 49, 55, 70, 50];
  deuxMedianes(5, s5, 52);
  v.ok("5. la 5e valeur NON rangée est 58", s5[4] === 58);
  ecrit(5, `du plus petit au plus grand : ${liste(range(s5))}`);
  ecrit(5, "Donc la médiane est $52$ minutes");
  barres(5, 0, range(s5), range(s5).indexOf(mediane(s5)));

  const s6 = [32, 45, 28, 40, 36, 50, 30, 38];
  deuxMedianes(6, s6, 37);
  ecrit(6, `Je range : ${liste(range(s6))}`);
  ecrit(6, "$\\dfrac{36 + 38}{2} = 37$");
  ecrit(6, `sans ranger : $\\dfrac{${s6[3]} + ${s6[4]}}{2} = ${(s6[3] + s6[4]) / 2}$`);
  const ordre6 = s6.map((x, i) => [x, `S${i + 1}`]).sort((a, b) => a[0] - b[0]);
  barres(6, 0, [...ordre6.map(([x]) => x), mediane(s6)], 8);
  v.ok("6. chaque barre rangée porte le nom de SA semaine", String(cv(6).diagrammes[0]?.barres.slice(0, 8).map(([l]) => l)) === String(ordre6.map(([, l]) => l)));

  const s7 = [186, 201, 194, 178, 205, 190, 197];
  v.ok("7. étendue 27 (≠ 205, ≠ 197 − 186)", etendue(s7) === 27 && s7.at(-1) - s7[0] === 11);
  egalites(7, "205 - 178 = 27");
  egalites(7, "197 - 186 = 11");
  barres(7, 0, s7, s7.indexOf(Math.max(...s7)));

  const med = [16, 26, 22];
  v.ok("8. 64 médailles ; 0,25 ; 0,40625 ; 0,34375 ; somme 1", somme(med) === 64 && String(med.map((x) => x / 64)) === "0.25,0.40625,0.34375");
  egalites(8, "16 + 26 + 22 = 64");
  for (const [n, fr, pct] of [[16, "0{,}25", "25"], [26, "0{,}40625", "40{,}6"], [22, "0{,}34375", "34{,}4"]]) {
    ecrit(8, `$\\dfrac{${n}}{64} = ${fr}$`);
    v.ok(`8. ${n}/64 arrondi au dixième de % : ${pct}`, (Math.round((n / 64) * 1000) / 10).toString().replace(".", "{,}") === pct);
  }
  egalites(8, "0{,}25 + 0{,}40625 + 0{,}34375 = 1");
  barres(8, 0, med, 1);

  v.titre("★★ Type devoir");
  const pas = [8200, 10500, 6400, 12000, 9300, 15100, 8500];
  v.ok("9. moyenne 10 000, médiane 9 300, étendue 8 700", moyenne(pas) === 10000 && medianeParComptage(pas) === 9300 && etendue(pas) === 8700);
  egalites(9, "8\\,200 + 10\\,500 + 6\\,400 + 12\\,000 + 9\\,300 + 15\\,100 + 8\\,500 = 70\\,000");
  ecrit(9, "$\\dfrac{70\\,000}{7} = 10\\,000$");
  ecrit(9, `Je range : ${liste(range(pas))}`);
  ecrit(9, "la $4^e$, $9\\,300$ pas");
  egalites(9, "15\\,100 - 6\\,400 = 8\\,700");
  ligneTableau(9, 0, pas);
  barres(9, 0, [...pas, moyenne(pas)], 7);

  v.ok("10. l'énoncé reprend la série de l'exercice 2", e(10).includes(liste(pluie)));
  v.ok("10. total 634, moyenne ≈ 52,8, médiane 52,5", somme(pluie) === 634 && (somme(pluie) / 12).toFixed(1) === "52.8" && medianeParComptage(pluie) === 52.5);
  egalites(10, `${pluie.join(" + ")} = 634`);
  ecrit(10, "$\\dfrac{634}{12} \\approx 52{,}8$");
  ecrit(10, `Je range : ${liste(range(pluie))}`);
  ecrit(10, "$\\dfrac{51 + 54}{2} = 52{,}5$");
  const ordre10 = pluie.map((x, i) => [x, mois[i]]).sort((a, b) => a[0] - b[0]);
  barres(10, 0, [...ordre10.map(([x]) => x), mediane(pluie)], 12);
  v.ok("10. chaque barre rangée porte son mois", String(cv(10).diagrammes[0]?.barres.slice(0, 12).map(([l]) => l)) === String(ordre10.map(([, l]) => l)));

  const livres = [0, 1, 2, 3, 4, 5], eff11 = [4, 9, 8, 5, 3, 1];
  const s11 = deplie(livres, eff11);
  const cumul11 = eff11.map((_, i) => somme(eff11.slice(0, i + 1)));
  v.ok("11. N = 30, moyenne 1,9, médiane 2, 9 élèves ≥ 3 (30 %)", s11.length === 30 && proche(moyenne(s11), 1.9) && medianeParComptage(s11) === 2 && s11.filter((x) => x >= 3).length === 9);
  egalites(11, "4 + 9 + 8 + 5 + 3 + 1 = 30");
  egalites(11, "0 \\times 4 + 1 \\times 9 + 2 \\times 8 + 3 \\times 5 + 4 \\times 3 + 5 \\times 1 = 0 + 9 + 16 + 15 + 12 + 5 = 57");
  ecrit(11, "$\\dfrac{57}{30} = 1{,}9$");
  ecrit(11, "donc la médiane est $2$");
  ecrit(11, "$\\dfrac{9}{30} = 0{,}3$");
  ecrit(11, `$${cumul11[0]}$, $${cumul11[1]}$, $${cumul11[2]}$…`);
  barres(11, 0, eff11);
  ligneTableau(11, 0, cumul11);
  barres(11, 1, eff11, livres.indexOf(mediane(s11)));

  const ines = [14, 16, 15, 17, 13], maya = [5, 28, 9, 25, 8];
  v.ok("12. moyennes 15 et 15, étendues 4 et 23", moyenne(ines) === 15 && moyenne(maya) === 15 && etendue(ines) === 4 && etendue(maya) === 23);
  v.ok("12. l'énoncé donne les deux séries", e(12).includes(liste(ines)) && e(12).includes(liste(maya)));
  egalites(12, "\\dfrac{14 + 16 + 15 + 17 + 13}{5} = \\dfrac{75}{5} = 15");
  egalites(12, "\\dfrac{5 + 28 + 9 + 25 + 8}{5} = \\dfrac{75}{5} = 15");
  egalites(12, "17 - 13 = 4");
  egalites(12, "28 - 5 = 23");
  ecrit(12, "je choisis Inès");
  barres(12, 0, [...ines, moyenne(ines)], 5);
  barres(12, 1, [...maya, moyenne(maya)], 5);

  const s13 = [8, 15, 10, 14, 9];
  const x13 = 12 * 6 - somme(s13);
  v.ok(`13. la sixième semaine : ${x13} mm, et la moyenne des six vaut 12`, x13 === 16 && moyenne([...s13, x13]) === 12 && proche(moyenne(s13), 11.2));
  egalites(13, "12 \\times 6 = 72");
  egalites(13, "8 + 15 + 10 + 14 + 9 = 56");
  egalites(13, "72 - 56 = 16");
  egalites(13, "\\dfrac{56 + 16}{6} = \\dfrac{72}{6} = 12");
  ecrit(13, "une moyenne de $11{,}2$");
  barres(13, 0, [...s13, x13, 12], 5);

  const s14 = [0, 2, 0, 1, 3, 0, 85, 2, 1, 0];
  v.ok("14. moyenne 9,4, médiane 1, un seul jour au-dessus de la moyenne", proche(moyenne(s14), 9.4) && medianeParComptage(s14) === 1 && s14.filter((x) => x > moyenne(s14)).length === 1);
  egalites(14, `${s14.join(" + ")} = 94`);
  ecrit(14, "$\\dfrac{94}{10} = 9{,}4$");
  ecrit(14, `Je range : ${liste(range(s14))}`);
  ecrit(14, "$\\dfrac{1 + 1}{2} = 1$ mm");
  egalites(14, "9{,}4 \\times 10 = 94");
  barres(14, 0, s14, s14.indexOf(Math.max(...s14)));
  barres(14, 1, [moyenne(s14), mediane(s14)], 1);

  const heures15 = [30, 30, 30, 18];
  v.ok("15. 27 km/h (moyenne des quatre heures) ; (30 + 18)/2 = 24", moyenne(heures15) === 27 && (30 + 18) / 2 === 24);
  egalites(15, "3 \\times 30 + 1 \\times 18 = 90 + 18 = 108");
  ecrit(15, "$\\dfrac{108}{4} = 27$ km/h");
  ecrit(15, "$\\dfrac{30 + 18}{2} = 24$ km/h");
  barres(15, 0, [...heures15, moyenne(heures15)], 4);

  // 16 : deux classes de 24 qui respectent les quatre résultats — l'une sans
  // aucun 11, l'autre avec : « impossible à savoir » est donc prouvé.
  const sans11 = [5, 6, 7, 7, 8, 8, 9, 9, 10, 10, 10, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14, 19];
  const avec11 = [5, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 12, 12, 12, 12, 12, 13, 13, 13, 14, 14, 14, 14, 19];
  const conforme = (t) => t.length === 24 && Math.min(...t) === 5 && moyenne(t) === 11 && medianeParComptage(t) === 12 && etendue(t) === 14;
  v.ok("16. deux classes conformes, l'une sans 11, l'autre avec : c) impossible à savoir", conforme(sans11) && conforme(avec11) && !sans11.includes(11) && avec11.includes(11));
  v.ok("16. a) au moins 12 élèves à 12 ou plus, dans les deux classes", [sans11, avec11].every((t) => t.filter((x) => x >= 12).length >= 12));
  v.ok("16. d) + 1 partout : étendue inchangée", [sans11, avec11].every((t) => etendue(t.map((x) => x + 1)) === 14));
  egalites(16, "5 + 14 = 19");
  egalites(16, "20 - 6 = 14");
  ["a) VRAI.", "b) VRAI.", "c) IMPOSSIBLE À SAVOIR.", "d) FAUX."].forEach((t) => ecrit(16, t));
  barres(16, 0, [5, 11, 12, 5 + 14], 2);

  v.titre("★★★ Problèmes");
  const temps = { 2015: [4, 0], 2017: [3, 32], 2018: [1, 39], 2022: [1, 9], 2023: [2, 42] };
  const tb = cv(17).tableaux[0];
  v.ok("17. le tableau porte les cinq temps officiels", !!tb && String(tb.entete.slice(1)) === String(Object.keys(temps)) && tb.ligne.slice(1).every((t, i) => t === `2 h ${String(Object.values(temps)[i][0]).padStart(2, "0")} min ${String(Object.values(temps)[i][1]).padStart(2, "0")} s`), tb?.ligne.join(" | "));
  const sec = Object.values(temps).map(([m, s]) => m * 60 + s);
  v.ok("17. secondes 240, 212, 99, 69, 162", String(sec) === "240,212,99,69,162");
  for (const [an, [m, s]] of Object.entries(temps)) egalites(17, `${m} \\times 60 + ${s} = ${m * 60 + s}`), ecrit(17, `${an} : $${m} \\times 60`);
  v.ok("17. moyenne 156,4 s = 2 min 36,4 s ; médiane 162 s = 2023 ; étendue 171 s = 2 min 51 s", proche(moyenne(sec), 156.4) && medianeParComptage(sec) === 162 && etendue(sec) === 171);
  egalites(17, "240 + 212 + 99 + 69 + 162 = 782");
  ecrit(17, "$\\dfrac{782}{5} = 156{,}4$ s");
  egalites(17, "156{,}4 = 2 \\times 60 + 36{,}4");
  egalites(17, "240 - 69 = 171");
  egalites(17, "171 = 2 \\times 60 + 51");
  ecrit(17, `Je range : ${liste(range(sec))}`);
  ecrit(17, "le temps de 2023");
  const ordre17 = Object.keys(temps).map((an, i) => [sec[i], an]).sort((a, b) => a[0] - b[0]);
  barres(17, 0, [...ordre17.map(([x]) => x), moyenne(sec)], ordre17.findIndex(([x]) => x === mediane(sec)));
  v.ok("17. chaque barre porte son année", String(cv(17).diagrammes[0]?.barres.slice(0, 5).map(([l]) => l)) === String(ordre17.map(([, a]) => a)));

  const temp = [5, 6, 9, 12, 16, 19, 21, 21, 17, 13, 9, 6];
  // Les normales 1991-2020 de Météo-France, arrondies : on refait l'arrondi.
  const normales = [5.4, 6.0, 9.2, 12.2, 15.6, 18.8, 20.9, 20.8, 17.2, 13.2, 8.7, 5.9];
  const pluieNormales = [47.6, 41.8, 45.2, 45.8, 69.0, 51.3, 59.4, 58.0, 44.7, 55.2, 54.3, 62.0];
  v.ok("18. les températures sont les normales arrondies", String(normales.map(Math.round)) === String(temp));
  v.ok("2. les pluies sont les normales arrondies", String(pluieNormales.map(Math.round)) === String(pluie));
  const m18 = moyenne(temp);
  v.ok("18. moyenne ≈ 12,8, médiane 12,5, étendue 16, 6 mois au-dessus", (m18).toFixed(1) === "12.8" && medianeParComptage(temp) === 12.5 && etendue(temp) === 16 && temp.filter((x) => x > m18).length === 6);
  egalites(18, `${temp.join(" + ")} = 154`);
  ecrit(18, "$\\dfrac{154}{12} \\approx 12{,}8$ °C");
  ecrit(18, `Je range : ${liste(range(temp))}`);
  ecrit(18, "$\\dfrac{12 + 13}{2} = 12{,}5$ °C");
  egalites(18, "21 - 5 = 16");
  const chauds = temp.map((x, i) => [x, ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"][i]]).filter(([x]) => x > m18).map(([, n]) => n);
  ecrit(18, `${chauds.slice(0, -1).join(", ")} et ${chauds.at(-1)}. $${chauds.length}$ mois`);
  barres(18, 0, temp);
  barres(18, 1, [...temp, Number(m18.toFixed(1))], 12);

  const sal = [1900, 2200, 2800, 7500], eff19 = [10, 6, 2, 2];
  const s19 = deplie(sal, eff19);
  const apres = s19.map((x) => (x === 7500 ? 8500 : x));
  v.ok("19. N = 20, moyenne 2 640, médiane 2 050, 16 sous la moyenne ; après : 2 740 et 2 050", s19.length === 20 && moyenne(s19) === 2640 && medianeParComptage(s19) === 2050 && s19.filter((x) => x < 2640).length === 16 && moyenne(apres) === 2740 && medianeParComptage(apres) === 2050);
  egalites(19, "10 + 6 + 2 + 2 = 20");
  egalites(19, "1\\,900 \\times 10 + 2\\,200 \\times 6 + 2\\,800 \\times 2 + 7\\,500 \\times 2 = 19\\,000 + 13\\,200 + 5\\,600 + 15\\,000 = 52\\,800");
  ecrit(19, "$\\dfrac{52\\,800}{20} = 2\\,640$ €");
  ecrit(19, "$\\dfrac{1\\,900 + 2\\,200}{2} = 2\\,050$ €");
  ecrit(19, "$\\dfrac{54\\,800}{20} = 2\\,740$ €");
  ecrit(19, "$\\dfrac{1\\,900 + 2\\,200 + 2\\,800 + 7\\,500}{4} = 3\\,600$ €");
  v.ok("19. la moyenne des quatre salaires vaut bien 3 600", moyenne(sal) === 3600);
  ligneTableau(19, 0, eff19);
  ligneTableau(19, 1, sal.map((x, i) => x * eff19[i]));
  barres(19, 0, [moyenne(s19), mediane(s19)], 1);

  const sol20 = [6, 10, 14, 14, 16];
  v.ok("20. a) 6, 10, 14, 14, 16 : moyenne 12, médiane 14, étendue 10", moyenne(sol20) === 12 && medianeParComptage(sol20) === 14 && etendue(sol20) === 10);
  // b) : balayage de TOUTES les séries rangées de cinq entiers entre 0 et 20.
  let trouvees = 0;
  let totalMin = Infinity;
  for (let a = 0; a <= 20; a++) for (let b = a; b <= 20; b++) for (let d = 14; d <= 20; d++) for (let g = d; g <= 20; g++) {
    if (b > 14 || g - a !== 4) continue;
    const t = [a, b, 14, d, g];
    totalMin = Math.min(totalMin, somme(t));
    if (somme(t) === 60) trouvees++;
  }
  v.ok(`20. b) aucune série ne convient ; le plus petit total possible est ${totalMin}`, trouvees === 0 && totalMin === 62);
  egalites(20, "6 + 10 + 14 + 14 + 16 = 60");
  egalites(20, "60 - 6 - 14 - 16 = 24");
  egalites(20, "10 + 10 + 14 + 14 + 14 = 62");
  ecrit(20, "c'est impossible");
  barres(20, 0, [...sol20, moyenne(sol20)], 2);
}

lancer({
  nom: "LES STATISTIQUES · 3e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-3e-statistiques.tsx",
  notionId: "stat_statistique",
  classe: "3e",
  verifier,
  casses: [
    ["ex. 1 : un effectif du tableau changé", "[\"Matchs\", 4, 8, 7, 4, 2]", "[\"Matchs\", 4, 8, 6, 4, 2]"],
    ["ex. 1 : la fréquence divisée par 5", "$\\\\dfrac{4}{25} = 0{,}16$", "$\\\\dfrac{4}{5} = 0{,}8$"],
    ["ex. 2 : octobre compté (> 55)", "Cela fait $4$ mois", "Cela fait $5$ mois"],
    ["ex. 2 : une barre de la figure fausse", "figure: diagramme(\"barres\", [{ label: \"Jan\", value: 48 }", "figure: diagramme(\"barres\", [{ label: \"Jan\", value: 58 }"],
    ["ex. 3 : la barre de la moyenne fausse", "{ label: \"Moy.\", value: 20 }], 6)", "{ label: \"Moy.\", value: 120 }], 6)"],
    ["ex. 4 : moyenne des valeurs au lieu de la moyenne pondérée", "$\\\\dfrac{35}{25} = 1{,}4$", "$\\\\dfrac{35}{25} = 2$"],
    ["ex. 5 : la médiane sans ranger", "Donc la médiane est $52$ minutes", "Donc la médiane est $58$ minutes"],
    ["ex. 5 : la barre en couleur à côté de la médiane", "{ label: \"9e\", value: 70 }], 4)", "{ label: \"9e\", value: 70 }], 5)"],
    ["ex. 6 : effectif pair, une seule valeur centrale", "{ label: \"Méd.\", value: 37 }", "{ label: \"Méd.\", value: 36 }"],
    ["ex. 7 : l'étendue prise pour le maximum", "$205 - 178 = 27$", "$205 - 178 = 205$"],
    ["ex. 8 : une part du camembert fausse", "{ label: \"Argent\", value: 26 }", "{ label: \"Argent\", value: 22 }"],
    ["ex. 9 : un nombre de pas du tableur changé", "\"12 000\", \"9 300\"", "\"12 000\", \"9 800\""],
    ["ex. 9 : la médiane prise au jeudi", "la $4^e$, $9\\\\,300$ pas", "la $4^e$, $12\\\\,000$ pas"],
    ["ex. 10 : la médiane = la 6e valeur seule", "$\\\\dfrac{51 + 54}{2} = 52{,}5$", "$\\\\dfrac{51 + 54}{2} = 51$"],
    ["ex. 11 : un effectif cumulé faux", "[\"Effectif cumulé\", 4, 13, 21, 26, 29, 30]", "[\"Effectif cumulé\", 4, 13, 20, 26, 29, 30]"],
    ["ex. 12 : une étendue fausse", "$28 - 5 = 23$", "$28 - 5 = 28$"],
    ["ex. 13 : la valeur manquante = la moyenne", "$72 - 56 = 16$", "$72 - 56 = 12$"],
    ["ex. 14 : la médiane tirée par l'orage", "{ label: \"Médiane\", value: 1 }], 1)}", "{ label: \"Médiane\", value: 9.4 }], 1)}"],
    ["ex. 15 : la moyenne des deux vitesses", "$\\\\dfrac{108}{4} = 27$ km/h", "$\\\\dfrac{108}{4} = 24$ km/h"],
    ["ex. 16 : l'étendue qui augmente de 1", "d) FAUX.", "d) VRAI."],
    ["ex. 17 : un temps officiel changé", "\"2 h 01 min 39 s\"", "\"2 h 01 min 49 s\""],
    ["ex. 17 : la moyenne en décimal", "$\\\\dfrac{782}{5} = 156{,}4$ s", "$\\\\dfrac{782}{5} = 164{,}6$ s"],
    ["ex. 18 : un mois de Paris changé", "{ label: \"Jul\", value: 21 }, { label: \"Aoû\", value: 21 }, { label: \"Sep\", value: 17 }, { label: \"Oct\", value: 13 }, { label: \"Nov\", value: 9 }, { label: \"Déc\", value: 6 }]),", "{ label: \"Jul\", value: 22 }, { label: \"Aoû\", value: 21 }, { label: \"Sep\", value: 17 }, { label: \"Oct\", value: 13 }, { label: \"Nov\", value: 9 }, { label: \"Déc\", value: 6 }]),"],
    ["ex. 19 : la moyenne des salaires sans les effectifs", "$\\\\dfrac{52\\\\,800}{20} = 2\\\\,640$ €", "$\\\\dfrac{52\\\\,800}{20} = 3\\\\,600$ €"],
    ["ex. 19 : la médiane poussée par les dirigeants", "{ label: \"Médiane\", value: 2050 }", "{ label: \"Médiane\", value: 2200 }"],
    ["ex. 20 : une solution fausse", "{ label: \"N2\", value: 10 }", "{ label: \"N2\", value: 12 }"],
    ["une micro d'une autre notion", "micros: [\"stat_etendue\"],", "micros: [\"stat_ecart_type\"],"],
    ["un $ dans un canvas", "{ label: \"Or\", value: 16 }", "{ label: \"$Or$\", value: 16 }"],
  ],
});
