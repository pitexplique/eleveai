// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Les probabilités
// conditionnelles » de seconde
// (lib/fiches-exercices/maths-seconde-probabilites-conditionnelles.tsx).
//
// ⭐ L'AUTRE CHEMIN : chaque situation est refaite en EFFECTIFS entiers (sur
// 1 000 ou 10 000 individus) quand c'est possible, et en fractions exactes
// sinon — pas avec la formule du corrigé. Puis les schémas sont relus : chaque
// nœud d'arbre a des branches de somme 1 et porte les probabilités de
// l'énoncé ; chaque tableau croisé a des totaux justes et les effectifs de la
// situation ; les cases surlignées sont celles de la question.
//
//   node scripts/verifier-exercices-probabilites-conditionnelles.mjs

import { Q, plus, fois, div, egal, lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

const F = (n, d = 1) => Q(BigInt(n), BigInt(d));
const lit = (t) => { const s = t.replace(",", "."); if (s.includes("/")) { const [n, d] = s.split("/"); return F(Number(n), Number(d)); } const [e, dec = ""] = s.split("."); return F(Number(e + dec), 10 ** dec.length); };
const somme = (l) => l.reduce(plus, F(0));
const approx = (q, x, tol = 0.0005) => Math.abs(Number(q.n) / Number(q.d) - x) < tol;

function argument(bloc, nom, rang = 0) {
  let i = -1;
  for (let r = 0; r <= rang; r++) { i = bloc.indexOf(`${nom}(`, i + 1); if (i < 0) return null; }
  let j = i + nom.length + 1, prof = 0, k = j;
  for (; k < bloc.length; k++) { if (bloc[k] === "[") prof++; if (bloc[k] === "]") { prof--; if (prof === 0) break; } }
  return JSON.parse(bloc.slice(j, k + 1).replace(/(\w+):/g, '"$1":').replace(/,(\s*[\]}])/g, "$1"));
}
function tableauDe(bloc, rang = 0) {
  let i = -1;
  for (let r = 0; r <= rang; r++) { i = bloc.indexOf("tableauProba(", i + 1); if (i < 0) return null; }
  const s = bloc.slice(i + "tableauProba(".length);
  let prof = 0, k = 0;
  for (; k < s.length; k++) { if (s[k] === "(") prof++; if (s[k] === ")") { if (prof === 0) break; prof--; } }
  const [entetes, lignes, surl] = JSON.parse(`[${s.slice(0, k)}]`.replace(/,(\s*[\]}])/g, "$1"));
  return { entetes, lignes, surl: surl ?? [] };
}

function verifier(source, v) {
  const f = lireFeuille(source);
  const c = (k) => f.corrections[k - 1] ?? "";
  const b = (k) => f.blocs[k - 1];
  const ecrit = (k, texte) => v.ok(`${k}. le corrigé écrit ${texte}`, c(k).includes(texte), texte);
  /** L'arbre (rang-ième du bloc) : chaque nœud somme à 1, et ses probabilités sont celles attendues. */
  const arbreVaut = (k, attendu, rang = 0) => {
    const a = argument(b(k), "arbre", rang);
    const faux = [];
    const tour = (enfants, ch) => {
      if (enfants.every((e) => e.proba) && !egal(somme(enfants.map((e) => lit(e.proba))), F(1))) faux.push(ch || "racine");
      enfants.forEach((e) => e.enfants && tour(e.enfants, ch + e.label));
    };
    tour(a, "");
    const probas = JSON.stringify(a.map((e) => [e.proba, (e.enfants ?? []).map((x) => x.proba)]));
    v.ok(`${k}. l'arbre : branches de somme 1 et probabilités de l'énoncé`, faux.length === 0 && probas === JSON.stringify(attendu), `${faux} ${probas}`);
  };
  /** Le tableau (rang-ième) : totaux justes, cases = effectifs attendus (lignes sans la colonne Total), surlignage attendu. */
  const tableauVaut = (k, effectifs, surl, rang = 0) => {
    const t = tableauDe(b(k), rang);
    const n = t.lignes.map((l) => l.slice(1).map(Number));
    const totaux = n.slice(0, -1).every((l) => l.slice(0, -1).reduce((a, x) => a + x, 0) === l[l.length - 1]) && n[0].every((_, j) => n.slice(0, -1).reduce((a, l) => a + l[j], 0) === n[n.length - 1][j]);
    const cases = JSON.stringify(n.slice(0, -1).map((l) => l.slice(0, -1))) === JSON.stringify(effectifs);
    v.ok(`${k}. le tableau : totaux justes, effectifs de la situation`, totaux && cases, JSON.stringify(n));
    if (surl) v.ok(`${k}. les cases surlignées sont celles de la question`, JSON.stringify(t.surl) === JSON.stringify(surl), JSON.stringify(t.surl));
    return t;
  };

  v.titre("★ Un seul geste");
  v.ok("1. P_F(D) = 0,6, P_D(F) ≈ 0,545, P(F ∩ D) = 0,3", egal(F(60, 100), lit("0,6")) && approx(F(60, 110), 0.545) && egal(F(60, 200), lit("0,3")));
  // Deux tableaux : celui de l'énoncé (rang 0), puis celui du corrigé, surligné (rang 1).
  tableauVaut(1, [[60, 40], [50, 50]], null, 0);
  tableauVaut(1, [[60, 40], [50, 50]], [[0, 1], [0, 3], [2, 1]], 1);
  ecrit(1, "$P_D(F) = \\dfrac{60}{110} \\approx 0{,}545$");

  v.ok("2. P_A(B) = 0,1 / 0,4 = 0,25", egal(div(lit("0,1"), lit("0,4")), lit("0,25")));
  ecrit(2, "= \\dfrac{0{,}1}{0{,}4} = 0{,}25$");
  arbreVaut(2, [["0,4", ["0,25", "0,75"]], ["0,6", []]]);

  const t3 = [["0,3", ["0,6", "0,4"]], ["0,7", ["0,2", "0,8"]]];
  arbreVaut(3, t3);
  arbreVaut(4, t3);
  arbreVaut(5, t3);
  const AB = fois(lit("0,3"), lit("0,6")), nAB = fois(lit("0,7"), lit("0,2"));
  v.ok("4. P(A ∩ B) = 0,18, P(Ā ∩ B) = 0,14 ; 5. P(B) = 0,32", egal(AB, lit("0,18")) && egal(nAB, lit("0,14")) && egal(plus(AB, nAB), lit("0,32")));
  ecrit(4, "= 0{,}3 \\times 0{,}6 = 0{,}18$");
  ecrit(5, "= 0{,}18 + 0{,}14 = 0{,}32$");

  v.ok("6. parmi les 12 figures, 3 cœurs : 1/4", egal(F(3, 12), F(1, 4)));
  tableauVaut(6, [[3, 5], [9, 15]], [[0, 1], [2, 1]]);

  v.ok("7. P_N(P) = 12/30 = 0,4 et P_P(N) = 12/12 = 1", egal(F(12, 30), lit("0,4")) && egal(F(12, 12), F(1)));
  tableauVaut(7, [[12, 18], [0, 70]], [[0, 1]]);

  const t8 = [["0,6", ["0,3", "0,7"]], ["0,4", ["0,5", "0,5"]]];
  arbreVaut(8, t8);
  ecrit(8, "$P(F \\cap D) = 0{,}6 \\times 0{,}3 = 0{,}18$");

  v.titre("★★ Type devoir");
  const D9 = plus(fois(lit("0,6"), lit("0,3")), fois(lit("0,4"), lit("0,5")));
  v.ok("9. P(D) = 0,38, P_D(F) ≈ 0,474", egal(D9, lit("0,38")) && approx(div(lit("0,18"), D9), 0.474));
  arbreVaut(9, t8);
  ecrit(9, "= 0{,}18 + 0{,}2 = 0{,}38$");
  ecrit(9, "\\approx 0{,}474$");

  v.ok("10. 0,3 et 0,15 ; P_V(J) ≈ 0,571", egal(F(60, 200), lit("0,3")) && egal(F(45, 300), lit("0,15")) && approx(F(60, 105), 0.571));
  tableauVaut(10, [[60, 140], [45, 255]], [[0, 1], [2, 1]]);

  const parts = ["0,5", "0,3", "0,2"], defauts = ["0,02", "0,03", "0,05"];
  const chemins = parts.map((p, i) => fois(lit(p), lit(defauts[i])));
  const D11 = somme(chemins);
  v.ok("11. P(défaut) = 0,029", egal(D11, lit("0,029")));
  arbreVaut(11, [["0,5", ["0,02", "0,98"]], ["0,3", ["0,03", "0,97"]], ["0,2", ["0,05", "0,95"]]]);
  ecrit(11, "= 0{,}01 + 0{,}009 + 0{,}01 = 0{,}029$");

  const partDefauts = chemins.map((x) => div(x, D11));
  v.ok("12. parts des défauts : 34,5 %, 31,0 %, 34,5 %", approx(partDefauts[0], 0.345) && approx(partDefauts[1], 0.31, 0.0005) && approx(partDefauts[2], 0.345));
  const t12 = tableauDe(b(12));
  const lus12 = t12.lignes.map((l) => Number(l[2].replace(" %", "").replace(",", ".")) / 100);
  v.ok("12. le tableau porte ces parts, au dixième de point", lus12.every((x, i) => Math.abs(x - Number(partDefauts[i].n) / Number(partDefauts[i].d)) < 0.0006) && JSON.stringify(t12.surl) === "[[2,2]]", JSON.stringify(lus12));

  v.ok("13. 20 garçons compétiteurs sur 40 garçons, sur 30 compétiteurs", (2 / 3) * 30 === 20 && 0.4 * 50 === 20 && egal(F(20, 40), lit("0,5")) && egal(F(20, 30), F(2, 3)));
  tableauVaut(13, [[20, 20], [10, 30]], [[0, 1]]);

  // 14-15 : sur 1 000 pièces, en entiers.
  const def = 50, bon = 950, dR = 0.9 * def, bR = 0.02 * bon;
  v.ok("14. rejetées : 45 + 19 = 64 sur 1 000", dR === 45 && Math.round(bR) === 19 && egal(plus(fois(lit("0,05"), lit("0,9")), fois(lit("0,95"), lit("0,02"))), lit("0,064")));
  arbreVaut(14, [["0,05", ["0,9", "0,1"]], ["0,95", ["0,02", "0,98"]]]);
  ecrit(14, "= 0{,}045 + 0{,}019 = 0{,}064$");
  v.ok("15. P_R(D) = 45/64 ≈ 0,703", approx(F(45, 64), 0.703));
  tableauVaut(15, [[45, 5], [19, 931]], [[0, 1], [2, 1]]);
  ecrit(15, "= \\dfrac{0{,}045}{0{,}064} \\approx 0{,}703$");

  // 16 : on énumère les tirages ordonnés sans remise.
  const urne = [..."RRRRBBBBBB"];
  const tir = urne.flatMap((x, i) => urne.filter((_, j) => j !== i).map((y) => x + y));
  const nR1 = tir.filter((t) => t[0] === "R").length;
  v.ok("16. P_R1(R2) = 1/3, P(R2) = 0,4 = P(R1) (énuméré)", egal(F(tir.filter((t) => t === "RR").length, nR1), F(1, 3)) && egal(F(tir.filter((t) => t[1] === "R").length, tir.length), lit("0,4")));
  arbreVaut(16, [["4/10", ["3/9", "6/9"]], ["6/10", ["4/9", "5/9"]]]);
  ecrit(16, "= \\dfrac{36}{90} = 0{,}4$");

  v.titre("★★★ Problèmes");
  // 17 : sur 10 000 personnes.
  const m = 100, s = 9900, mP = 0.99 * m, sP = 0.05 * s;
  v.ok("17. 99 vrais positifs, 495 faux ; P_+(M) = 99/594 = 1/6", mP === 99 && sP === 495 && egal(F(99, 594), F(1, 6)) && egal(plus(fois(lit("0,01"), lit("0,99")), fois(lit("0,99"), lit("0,05"))), lit("0,0594")));
  arbreVaut(17, [["0,01", ["0,99", "0,01"]], ["0,99", ["0,05", "0,95"]]]);
  tableauVaut(17, [[99, 1], [495, 9405]], [[0, 1], [2, 1]]);
  ecrit(17, "\\approx 0{,}167$");

  const m18 = 2000, s18 = 8000;
  v.ok("18. 1 980 et 400 positifs ; P_+(M) ≈ 0,832", 0.99 * m18 === 1980 && 0.05 * s18 === 400 && approx(F(1980, 2380), 0.832));
  tableauVaut(18, [[1980, 20], [400, 7600]], [[0, 1], [2, 1]]);

  const A19 = plus(fois(lit("0,25"), lit("0,8")), fois(lit("0,75"), lit("0,1")));
  v.ok("19. P(A) = 0,275, P_A(P) ≈ 0,727", egal(A19, lit("0,275")) && approx(div(lit("0,2"), A19), 0.727));
  arbreVaut(19, [["0,25", ["0,8", "0,2"]], ["0,75", ["0,1", "0,9"]]]);
  ecrit(19, "= 0{,}2 + 0{,}075 = 0{,}275$");

  v.ok("20. 570 + 8 filtrés ; 8/578 ≈ 0,014 ; 30/422 ≈ 0,071", 0.95 * 600 === 570 && 0.02 * 400 === 8 && approx(F(8, 578), 0.014, 0.0005) && approx(F(30, 422), 0.071, 0.0005));
  tableauVaut(20, [[570, 30], [8, 392]], [[1, 1], [2, 1]]);
  ecrit(20, "$\\dfrac{8}{578} \\approx 0{,}014$");
}

lancer({
  nom: "LES PROBABILITÉS CONDITIONNELLES · seconde · 20 exercices",
  fichier: "lib/fiches-exercices/maths-seconde-probabilites-conditionnelles.tsx",
  notionId: "probabilites_conditionnelles_2de",
  verifier,
  casses: [
    ["ex. 1 : divisé par le total", "$P_D(F) = \\\\dfrac{60}{110} \\\\approx 0{,}545$", "$P_D(F) = \\\\dfrac{60}{200} \\\\approx 0{,}545$"],
    ["ex. 1 : un effectif du tableau changé", "[\"Garçons\", \"50\", \"50\", \"100\"], [\"Total\", \"110\", \"90\", \"200\"]], [[0, 1], [0, 3], [2, 1]]", "[\"Garçons\", \"55\", \"50\", \"100\"], [\"Total\", \"110\", \"90\", \"200\"]], [[0, 1], [0, 3], [2, 1]]"],
    ["ex. 2 : la division retournée", "= \\\\dfrac{0{,}1}{0{,}4} = 0{,}25$", "= \\\\dfrac{0{,}1}{0{,}4} = 4$"],
    ["ex. 3 : une branche qui ne fait plus 1", "[{ label: \"A\", proba: \"0,3\", enfants: [{ label: \"B\", proba: \"0,6\" }, { label: \"non B\", proba: \"0,4\" }] }, { label: \"non A\", proba: \"0,7\", enfants: [{ label: \"B\", proba: \"0,2\" }, { label: \"non B\", proba: \"0,8\" }] }]", "[{ label: \"A\", proba: \"0,3\", enfants: [{ label: \"B\", proba: \"0,6\" }, { label: \"non B\", proba: \"0,2\" }] }, { label: \"non A\", proba: \"0,7\", enfants: [{ label: \"B\", proba: \"0,2\" }, { label: \"non B\", proba: \"0,8\" }] }]"],
    ["ex. 5 : les branches additionnées", "= 0{,}18 + 0{,}14 = 0{,}32$", "= 0{,}18 + 0{,}14 = 0{,}8$"],
    ["ex. 7 : un jour de pluie par ciel clair", "[\"Ciel clair\", \"0\", \"70\", \"70\"]", "[\"Ciel clair\", \"1\", \"69\", \"70\"]"],
    ["ex. 9 : P(D) faux", "= 0{,}18 + 0{,}2 = 0{,}38$", "= 0{,}18 + 0{,}2 = 0{,}3$"],
    ["ex. 11 : la moyenne des taux", "= 0{,}01 + 0{,}009 + 0{,}01 = 0{,}029$", "= 0{,}01 + 0{,}009 + 0{,}01 = 0{,}033$"],
    ["ex. 11 : un taux de défaut changé", "{ label: \"défect.\", proba: \"0,05\" }, { label: \"bonne\", proba: \"0,95\" }", "{ label: \"défect.\", proba: \"0,04\" }, { label: \"bonne\", proba: \"0,96\" }"],
    ["ex. 12 : une part des défauts fausse", "[\"M2\", \"30 %\", \"31,0 %\"]", "[\"M2\", \"30 %\", \"30,0 %\"]"],
    ["ex. 13 : un effectif faux", "[\"Filles\", \"10\", \"30\", \"40\"]", "[\"Filles\", \"12\", \"28\", \"40\"]"],
    ["ex. 14 : le second chemin oublié", "= 0{,}045 + 0{,}019 = 0{,}064$", "= 0{,}045 + 0{,}019 = 0{,}045$"],
    ["ex. 16 : avec remise au lieu de sans", "{ label: \"R1\", proba: \"4/10\", enfants: [{ label: \"R2\", proba: \"3/9\" }, { label: \"B2\", proba: \"6/9\" }] }", "{ label: \"R1\", proba: \"4/10\", enfants: [{ label: \"R2\", proba: \"4/10\" }, { label: \"B2\", proba: \"6/10\" }] }"],
    ["ex. 17 : les faux positifs mal comptés", "[\"Sains\", \"495\", \"9405\", \"9900\"]", "[\"Sains\", \"99\", \"9801\", \"9900\"]"],
    ["ex. 18 : le tableau du groupe à risque faux", "[\"Malades\", \"1980\", \"20\", \"2000\"]", "[\"Malades\", \"1800\", \"200\", \"2000\"]"],
    ["ex. 20 : la mauvaise case surlignée", "[[1, 1], [2, 1]]", "[[0, 1], [2, 1]]"],
  ],
});
