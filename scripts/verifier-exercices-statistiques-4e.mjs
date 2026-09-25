// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Statistiques :
// moyenne, médiane, étendue » de 4e (lib/fiches-exercices/maths-4e-statistiques.tsx).
//
// ⭐ L'AUTRE CHEMIN : chaque série est recopiée ICI, brute, depuis l'énoncé (ou
// dépliée depuis son tableau d'effectifs) ; moyenne (en fractions EXACTES),
// médiane (par tri, puis par comptage : sans trier, la plus petite valeur dont
// au moins la moitié des valeurs sont inférieures ou égales) et étendue sont
// refaites, puis le corrigé doit ÉCRIRE le bon résultat. Les égalités écrites
// (« a + b = c ») sont évaluées membre à membre.
//
// ⭐ LES DESSINS SONT RELUS dans le source : chaque `barres([...], { moyenne })`
// (valeurs des barres, et la ligne de moyenne = la moyenne des barres),
// chaque `rangee([...], médiane)` (la série de l'énoncé RANGÉE, et SA médiane),
// chaque `grille(...)` (produits valeur × effectif, effectifs cumulés, totaux),
// chaque `tableau(...)` d'énoncé. Et la lisibilité à 375 px : huit barres au
// plus, neuf cases au plus, chaque étiquette et chaque valeur dans la place de
// sa barre.
//
//   node scripts/verifier-exercices-statistiques-4e.mjs

import { lireFeuille, outilsEgalites, lancer, Q, D, plus, div, egal, tex } from "./verifier-exercices-commun.mjs";

/* ── Les indicateurs, refaits ─────────────────────────────────────────────── */

const somme = (t) => t.reduce((s, x) => s + x, 0);
/** La moyenne EXACTE (fraction), à partir de nombres décimaux. */
const moyQ = (t) => div(t.map((x) => D(String(x))).reduce(plus, Q(0)), Q(t.length));
const moyenne = (t) => somme(t) / t.length;
const range = (t) => [...t].sort((a, b) => a - b);
const mediane = (t) => {
  const s = range(t);
  const n = s.length;
  return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
};
/** L'autre chemin pour la médiane : sans trier, par comptage. */
const medianeParComptage = (t) => {
  const n = t.length;
  const bas = [...new Set(t)].filter((m) => t.filter((x) => x <= m).length >= n / 2).reduce((a, b) => Math.min(a, b));
  if (n % 2) return bas;
  const haut = [...new Set(t)].filter((m) => t.filter((x) => x >= m).length >= n / 2).reduce((a, b) => Math.max(a, b));
  return (bas + haut) / 2;
};
const etendue = (t) => Math.round((Math.max(...t) - Math.min(...t)) * 1000) / 1000;
const deplie = (valeurs, effectifs) => valeurs.flatMap((v, i) => Array(effectifs[i]).fill(v));
const proche = (a, b, tol = 1e-9) => Math.abs(a - b) < tol;
/** 18.5 → « 18{,}5 », 2100 → « 2\,100 », −4 → « -4 » : l'écriture des formules. */
const tx = (x) => tex(D(String(x)));
const liste = (t) => t.map((x) => `$${tx(x)}$`).join(", ");

/* ── Les dessins, relus ──────────────────────────────────────────────────── */

const nombre = (s) => Number(String(s).trim().replace(/^"|"$/g, ""));
function dessins(bloc) {
  const barres = [...bloc.matchAll(/\bbarres\(\[([^\]]*)\](?:, \{([^}]*)\})?\)/g)].map((m) => {
    const opts = m[2] ?? "";
    return {
      index: m.index,
      barres: [...m[1].matchAll(/\{ label: "([^"]*)", value: (-?[\d.]+) \}/g)].map((b) => [b[1], Number(b[2])]),
      moyenne: /moyenne: (-?[\d.]+)/.exec(opts)?.[1],
      etendue: /etendue: true/.test(opts),
      surligne: /surligne: (\d+)/.exec(opts)?.[1],
    };
  });
  const rangees = [...bloc.matchAll(/\brangee\(\[([^\]]*)\], (-?[\d.]+)\)/g)].map((m) => ({ valeurs: m[1].split(", ").map(Number), mediane: Number(m[2]) }));
  const grilles = [...bloc.matchAll(/\bgrille\(\[([^\]]*)\], \[((?:\[[^\]]*\](?:, )?)*)\](?:, \{([^}]*)\})?\)/g)].map((m) => ({
    entetes: [...m[1].matchAll(/"([^"]*)"/g)].map((x) => x[1]),
    lignes: [...m[2].matchAll(/\[([^\]]*)\]/g)].map((l) => l[1].split(", ").map((c) => (/^"/.test(c.trim()) ? c.trim().slice(1, -1) : nombre(c)))),
    surligne: /surligne: (\d+)/.exec(m[3] ?? "")?.[1],
    total: /total: true/.test(m[3] ?? ""),
  }));
  const tableaux = [...bloc.matchAll(/\btableau\(\[([^\]]*)\], \[([^\]]*)\]/g)].map((m) => ({
    entete: [...m[1].matchAll(/"([^"]*)"/g)].map((x) => x[1]),
    ligne: m[2].split(", ").map((x) => x.trim().replace(/^"|"$/g, "")),
  }));
  const iSchema = bloc.indexOf("schema:");
  return { barres, rangees, grilles, tableaux, figureBarres: barres.filter((b) => iSchema < 0 || b.index < iSchema), schemaBarres: barres.filter((b) => iSchema >= 0 && b.index > iSchema) };
}

function verifier(source, v) {
  const f = lireFeuille(source);
  const c = (k) => f.corrections[k - 1] ?? "";
  const e = (k) => f.enonces[k - 1] ?? "";
  const egalites = outilsEgalites(v, f);
  const ecrit = (k, texte) => v.ok(`${k}. le corrigé écrit ${texte}`, c(k).includes(texte), texte);
  const dd = (k) => dessins(f.blocs[k - 1] ?? "");
  const valeurs = (b) => (b ? b.barres.map(([, x]) => x) : []);

  /** Le diagramme i (du schéma) de l'exercice k porte ces valeurs ; moyenne et surligne si donnés. */
  const barresDe = (k, i, attendu, { moyenne: m, surligne: s, etendue: et, figure = false } = {}) => {
    const b = (figure ? dd(k).figureBarres : dd(k).schemaBarres)[i];
    v.ok(`${k}. ${figure ? "figure" : "dessin"} ${i + 1} : barres ${attendu.join(", ")}`, String(valeurs(b)) === String(attendu), String(valeurs(b)));
    if (m !== undefined) v.ok(`${k}. dessin ${i + 1} : la ligne de moyenne est à ${m}`, b?.moyenne !== undefined && proche(Number(b.moyenne), m), `lu ${b?.moyenne}`);
    if (s !== undefined) v.ok(`${k}. dessin ${i + 1} : la barre en couleur est la n° ${s + 1}`, b?.surligne !== undefined && Number(b.surligne) === s, `lu ${b?.surligne}`);
    if (et !== undefined) v.ok(`${k}. dessin ${i + 1} : le crochet de l'étendue ${et ? "est" : "n'est pas"} tracé`, !!b && b.etendue === et);
    return b;
  };
  /** La série rangée dessinée est celle de l'énoncé, rangée, avec sa médiane. */
  const rangeeDe = (k, i, serie) => {
    const r = dd(k).rangees[i];
    const ok = !!r && String(r.valeurs) === String(range(serie)) && proche(r.mediane, mediane(serie)) && proche(r.mediane, medianeParComptage(serie));
    v.ok(`${k}. la série rangée dessinée (${range(serie).join(", ")}) et sa médiane ${mediane(serie)}`, ok, r ? `lu ${r.valeurs} / ${r.mediane}` : "aucune rangée");
  };
  const grilleDe = (k, i, attendu) => {
    const g = dd(k).grilles[i];
    v.ok(`${k}. la grille ${i + 1} : ${JSON.stringify(attendu)}`, !!g && JSON.stringify(g.lignes) === JSON.stringify(attendu), g ? JSON.stringify(g.lignes) : "aucune");
    return g;
  };
  const deuxMedianes = (k, t, m) => v.ok(`${k}. médiane ${m}, par tri et par comptage`, mediane(t) === m && medianeParComptage(t) === m, `${mediane(t)} / ${medianeParComptage(t)}`);
  const moyEst = (k, t, attendu) => v.ok(`${k}. moyenne exacte ${attendu}`, egal(moyQ(t), D(String(attendu))), `${moyQ(t).n}/${moyQ(t).d}`);

  v.titre("★ Un seul geste");
  const s1 = [42, 45, 44, 47, 42];
  v.ok("1. l'énoncé donne les cinq temps", e(1).includes(liste(s1)));
  moyEst(1, s1, 44);
  egalites(1, "42 + 45 + 44 + 47 + 42 = 220");
  ecrit(1, "$\\dfrac{220}{5} = 44$");
  egalites(1, "\\dfrac{42 + 45 + 44 + 47}{4} = 44{,}5");
  v.ok("1. le piège : le 42 compté une seule fois donne bien la moyenne des quatre valeurs différentes", moyenne([...new Set(s1)]) === 44.5);
  barresDe(1, 0, s1, { moyenne: 44 });

  const s2 = [64, 81, 58, 90, 72, 69, 77];
  v.ok("2. l'énoncé donne les sept hauteurs", e(2).includes(liste(s2)));
  deuxMedianes(2, s2, 72);
  v.ok("2. la 4e valeur NON rangée est 90", s2[3] === 90);
  ecrit(2, `du plus petit au plus grand : ${liste(range(s2))}`);
  ecrit(2, "Donc la médiane est $72$ cm");
  ecrit(2, "liste non rangée, $90$");
  rangeeDe(2, 0, s2);

  const s3 = [17, 21, 15, 19, 24, 18];
  v.ok("3. l'énoncé donne les six températures", e(3).includes(liste(s3)));
  deuxMedianes(3, s3, 18.5);
  ecrit(3, `Je range : ${liste(range(s3))}`);
  egalites(3, "\\dfrac{18 + 19}{2} = 18{,}5");
  egalites(3, `\\dfrac{${s3[2]} + ${s3[3]}}{2} = ${(s3[2] + s3[3]) / 2}`);
  v.ok("3. 3 jours sous la médiane, 3 au-dessus", s3.filter((x) => x < 18.5).length === 3 && s3.filter((x) => x > 18.5).length === 3);
  rangeeDe(3, 0, s3);

  const s4 = [4.2, 3.6, 5.1, 4.8, 3.9, 4.5];
  v.ok("4. l'énoncé donne les six masses", e(4).includes(s4.map((x) => `$${tx(x)}$`).join(" ; ")));
  v.ok("4. étendue 1,5 ; « dernière moins première » 0,3", etendue(s4) === 1.5 && proche(s4.at(-1) - s4[0], 0.3));
  v.ok("4. le plus lourd est C3, le plus léger C2", s4.indexOf(Math.max(...s4)) === 2 && s4.indexOf(Math.min(...s4)) === 1);
  egalites(4, "5{,}1 - 3{,}6 = 1{,}5");
  egalites(4, "4{,}5 - 4{,}2 = 0{,}3");
  ecrit(4, "(C3)");
  ecrit(4, "(C2)");
  barresDe(4, 0, s4, { etendue: true });

  const pointures = [37, 38, 39, 40], eff5 = [3, 6, 7, 4];
  const s5 = deplie(pointures, eff5);
  v.ok("5. N = 20, moyenne exacte 38,6", s5.length === 20 && egal(moyQ(s5), D("38.6")));
  egalites(5, "3 + 6 + 7 + 4 = 20");
  egalites(5, "37 \\times 3 + 38 \\times 6 + 39 \\times 7 + 40 \\times 4 = 111 + 228 + 273 + 160 = 772");
  egalites(5, "\\dfrac{772}{20} = 38{,}6");
  egalites(5, "\\dfrac{772}{4} = 193");
  const t5 = dd(5).tableaux[0];
  v.ok("5. le tableau de l'énoncé : pointures et effectifs", !!t5 && String(t5.entete.slice(1)) === String(pointures) && String(t5.ligne.slice(1).map(Number)) === String(eff5), t5 ? `${t5.entete} / ${t5.ligne}` : "absent");
  grilleDe(5, 0, [...pointures.map((p, i) => [p, eff5[i], p * eff5[i]]), ["Total", somme(eff5), somme(s5)]]);

  const s6 = [-4, -1, 2, -3, 1];
  v.ok("6. l'énoncé donne les cinq températures", ["lundi", "mardi", "mercredi", "jeudi", "vendredi"].every((j, i) => e(6).includes(`${j} $${s6[i]}$`)));
  moyEst(6, s6, -1);
  egalites(6, "(-4) + (-1) + 2 + (-3) + 1 = -5");
  egalites(6, "\\dfrac{-5}{5} = -1");
  egalites(6, "\\dfrac{4 + 1 + 2 + 3 + 1}{5} = 2{,}2");
  v.ok("6. trois matins sous zéro", s6.filter((x) => x < 0).length === 3);
  barresDe(6, 0, s6, { moyenne: -1 });

  const min7 = 38, et7 = 12;
  v.ok("7. le plus lent : 50 ; 52 hors de la série (52 − 38 = 14 > 12)", min7 + et7 === 50 && 52 - min7 > et7);
  egalites(7, "38 + 12 = 50");
  egalites(7, "52 - 38 = 14");
  egalites(7, "38 - 12 = 26");
  barresDe(7, 0, [min7, min7 + et7], { etendue: true });
  v.ok("7. le crochet du dessin mesure bien l'étendue de l'énoncé", etendue(valeurs(dd(7).schemaBarres[0])) === et7);

  const s8 = [14, 2, 13, 12, 14];
  v.ok("8. l'énoncé donne les cinq notes", e(8).includes(liste(s8)));
  moyEst(8, s8, 11);
  deuxMedianes(8, s8, 13);
  v.ok("8. Léa (12) est sous la médiane, 4 élèves sur 5 au-dessus de la moyenne", 12 < mediane(s8) && s8.filter((x) => x > 11).length === 4 && range(s8).indexOf(12) === 1);
  egalites(8, "\\dfrac{14 + 2 + 13 + 12 + 14}{5} = \\dfrac{55}{5} = 11");
  ecrit(8, `Je range : ${liste(range(s8))}`);
  ecrit(8, "la médiane est la $3^e$, $13$");
  ecrit(8, "$4$ élèves sur $5$");
  rangeeDe(8, 0, s8);

  v.titre("★★ Type devoir");
  const s9 = [18, 25, 12, 30, 21, 16, 25];
  barresDe(9, 0, s9, { figure: true });
  moyEst(9, s9, 21);
  deuxMedianes(9, s9, 21);
  v.ok("9. étendue 18 ; 3 ruches au-dessus de 21 (R2, R4, R7) ; R5 = 21 ; la 4e ruche vaut 30", etendue(s9) === 18 && String(s9.map((x, i) => (x > 21 ? `R${i + 1}` : "")).filter(Boolean)) === "R2,R4,R7" && s9[4] === 21 && s9[3] === 30);
  egalites(9, "18 + 25 + 12 + 30 + 21 + 16 + 25 = 147");
  ecrit(9, "$\\dfrac{147}{7} = 21$ kg");
  ecrit(9, `Je range : ${liste(range(s9))}`);
  ecrit(9, "la médiane est la $4^e$, $21$ kg");
  egalites(9, "30 - 12 = 18");
  ecrit(9, "R2 ($25$), R4 ($30$) et R7 ($25$)");
  ecrit(9, "Cela fait $3$ ruches");
  rangeeDe(9, 0, s9);
  barresDe(9, 0, s9, { moyenne: 21, etendue: true });

  const mois = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  v.ok("10. l'énoncé donne les douze mois dans l'ordre", e(10).includes(`${mois.slice(0, -1).map((x) => `$${x}$`).join(", ")} et $31$ jours`));
  const eff10 = [28, 30, 31].map((j) => mois.filter((x) => x === j).length);
  v.ok("10. 1 mois de 28, 4 de 30, 7 de 31 (avril, juin, septembre, novembre à 30)", String(eff10) === "1,4,7" && String(mois.map((x, i) => (x === 30 ? i + 1 : 0)).filter(Boolean)) === "4,6,9,11");
  v.ok("10. moyenne 365/12 ≈ 30,4 ; médiane 31 ; étendue 3", somme(mois) === 365 && (365 / 12).toFixed(1) === "30.4" && medianeParComptage(mois) === 31 && etendue(mois) === 3);
  const bis = mois.map((x) => (x === 28 ? 29 : x));
  v.ok("10. en 2028 : 366/12 = 30,5 ; médiane 31 ; étendue 2", somme(bis) === 366 && egal(moyQ(bis), D("30.5")) && medianeParComptage(bis) === 31 && etendue(bis) === 2);
  egalites(10, "1 + 4 + 7 = 12");
  egalites(10, "28 \\times 1 + 30 \\times 4 + 31 \\times 7 = 28 + 120 + 217 = 365");
  ecrit(10, "$\\dfrac{365}{12} \\approx 30{,}4$ jours");
  egalites(10, "31 - 28 = 3");
  egalites(10, "\\dfrac{366}{12} = 30{,}5");
  egalites(10, "31 - 29 = 2");
  ecrit(10, "la médiane est $31$ jours");
  const cumul10 = eff10.map((_, i) => somme(eff10.slice(0, i + 1)));
  ecrit(10, `$${cumul10[0]}$, puis $${cumul10[1]}$, puis $${cumul10[2]}$`);
  grilleDe(10, 0, [...[28, 30, 31].map((j, i) => [j, eff10[i], cumul10[i], j * eff10[i]]), ["Total", 12, "", 365]]);
  barresDe(10, 0, eff10, { surligne: [28, 30, 31].indexOf(mediane(mois)) });

  const s11 = [11, 14, 9, 14];
  v.ok("11. l'énoncé donne les quatre notes", e(11).includes(`$11$, $14$, $9$ et $14$`));
  moyEst(11, s11, 12);
  const x11 = 13 * 5 - somme(s11);
  v.ok(`11. la note manquante : ${x11}, et la moyenne des cinq vaut 13 ; pour 15 il faudrait 27 > 20`, x11 === 17 && moyenne([...s11, x11]) === 13 && 15 * 5 - somme(s11) === 27);
  egalites(11, "11 + 14 + 9 + 14 = 48");
  egalites(11, "\\dfrac{48}{4} = 12");
  egalites(11, "13 \\times 5 = 65");
  egalites(11, "65 - 48 = 17");
  egalites(11, "\\dfrac{48 + 17}{5} = \\dfrac{65}{5} = 13");
  egalites(11, "15 \\times 5 = 75");
  egalites(11, "75 - 48 = 27");
  egalites(11, "\\dfrac{48 + 13}{5} = 12{,}2");
  barresDe(11, 0, [...s11, x11], { moyenne: 13, surligne: 4 });

  const s12 = [180, 195, 210, 200, 190, 205, 920];
  v.ok("12. l'énoncé donne les sept prix", e(12).includes(`${s12.slice(0, -1).map((x) => `$${x}$`).join(", ")} et $920$`));
  moyEst(12, s12, 300);
  deuxMedianes(12, s12, 200);
  v.ok("12. 6 maisons sur 7 sous la moyenne ; aucune à moins de 50 000 € de 300 000 €", s12.filter((x) => x < 300).length === 6 && s12.every((x) => Math.abs(x - 300) > 50));
  egalites(12, "180 + 195 + 210 + 200 + 190 + 205 + 920 = 2\\,100");
  ecrit(12, "$\\dfrac{2\\,100}{7} = 300$ milliers");
  ecrit(12, `Je range : ${liste(range(s12))}`);
  ecrit(12, "la médiane est la $4^e$, $200$ milliers");
  ecrit(12, "$6$ maisons sur $7$");
  rangeeDe(12, 0, s12);
  barresDe(12, 0, s12, { moyenne: 300 });

  const pers = [1, 2, 3, 4], eff13 = [27, 8, 3, 2];
  const s13 = deplie(pers, eff13);
  v.ok("13. N = 40, moyenne 1,5, médiane 1, 27 voitures à une personne", s13.length === 40 && egal(moyQ(s13), D("1.5")) && medianeParComptage(s13) === 1 && s13.filter((x) => x === 1).length === 27 && mediane(pers) === 2.5);
  barresDe(13, 0, eff13, { figure: true });
  egalites(13, "1 \\times 27 + 2 \\times 8 + 3 \\times 3 + 4 \\times 2 = 27 + 16 + 9 + 8 = 60");
  egalites(13, "27 + 8 + 3 + 2 = 40");
  egalites(13, "\\dfrac{60}{40} = 1{,}5");
  ecrit(13, "donc la médiane est $1$");
  ecrit(13, "soit $2{,}5$");
  const cumul13 = eff13.map((_, i) => somme(eff13.slice(0, i + 1)));
  grilleDe(13, 0, pers.map((p, i) => [p, eff13[i], cumul13[i]]));
  v.ok("13. la ligne en couleur de la grille est celle de la médiane", dd(13).grilles[0]?.surligne === String(pers.indexOf(mediane(s13))));
  barresDe(13, 0, eff13, { surligne: pers.indexOf(mediane(s13)) });

  const faux = [14, 9, 81, 11, 13], juste = [14, 9, 18, 11, 13];
  v.ok("14. l'énoncé donne la série fausse ; la série juste n'en diffère que par 81 → 18", e(14).includes(liste(faux)) && faux.filter((x, i) => x !== juste[i]).length === 1 && String(81).split("").reverse().join("") === "18");
  moyEst(14, faux, 25.6);
  moyEst(14, juste, 13);
  deuxMedianes(14, faux, 13);
  deuxMedianes(14, juste, 13);
  v.ok("14. étendues 72 et 9 (× 8) ; 25,6 ≈ 2 × 13", etendue(faux) === 72 && etendue(juste) === 9 && 72 / 9 === 8 && moyenne(faux) / moyenne(juste) > 1.9);
  egalites(14, "14 + 9 + 81 + 11 + 13 = 128");
  egalites(14, "\\dfrac{128}{5} = 25{,}6");
  egalites(14, "14 + 9 + 18 + 11 + 13 = 65");
  egalites(14, "\\dfrac{65}{5} = 13");
  egalites(14, "81 - 9 = 72");
  egalites(14, "18 - 9 = 9");
  ecrit(14, `Rangée : ${liste(range(faux))} : médiane $13$ min`);
  ecrit(14, `Rangée : ${liste(range(juste))} : médiane $13$ min`);
  barresDe(14, 0, faux, { moyenne: 25.6, surligne: 2 });
  barresDe(14, 1, juste, { moyenne: 13, surligne: 2 });

  const rep = [0, 1, 2, 3, 4, 5], eff15 = [1, 2, 4, 6, 5, 7];
  const s15 = deplie(rep, eff15);
  const cumul15 = eff15.map((_, i) => somme(eff15.slice(0, i + 1)));
  v.ok("15. N = 25, médiane 3 (13e rang), moyenne 3,32, étendue 5 ; la valeur la plus fréquente est 5", s15.length === 25 && medianeParComptage(s15) === 3 && egal(moyQ(s15), D("3.32")) && etendue(s15) === 5 && rep[eff15.indexOf(Math.max(...eff15))] === 5);
  v.ok("15. les rangs 8 à 13 ont 3 bonnes réponses", s15.slice(7, 13).every((x) => x === 3) && s15[6] === 2 && s15[13] === 4);
  const t15 = dd(15).tableaux[0];
  v.ok("15. le tableau de l'énoncé", !!t15 && String(t15.entete.slice(1)) === String(rep) && String(t15.ligne.slice(1).map(Number)) === String(eff15));
  ecrit(15, `$${cumul15.slice(0, 4).join("$, $")}$`);
  ecrit(15, "la médiane est $3$");
  egalites(15, "0 \\times 1 + 1 \\times 2 + 2 \\times 4 + 3 \\times 6 + 4 \\times 5 + 5 \\times 7 = 0 + 2 + 8 + 18 + 20 + 35 = 83");
  egalites(15, "\\dfrac{83}{25} = 3{,}32");
  egalites(15, "5 - 0 = 5");
  grilleDe(15, 0, rep.map((r, i) => [r, eff15[i], cumul15[i]]));
  v.ok("15. la ligne en couleur de la grille est celle de la médiane", dd(15).grilles[0]?.surligne === String(rep.indexOf(mediane(s15))));

  const classeA = Array(20).fill(12.5), classeB = Array(30).fill(10);
  v.ok("16. 50 élèves réunis : moyenne 11 ; moyenne des moyennes 11,25", egal(moyQ([...classeA, ...classeB]), Q(11)) && (12.5 + 10) / 2 === 11.25);
  egalites(16, "12{,}5 \\times 20 = 250");
  egalites(16, "10 \\times 30 = 300");
  egalites(16, "250 + 300 = 550");
  egalites(16, "20 + 30 = 50");
  egalites(16, "\\dfrac{550}{50} = 11");
  ecrit(16, "Moyenne : $\\dfrac{550}{50} = 11$.");
  egalites(16, "\\dfrac{12{,}5 + 10}{2} = 11{,}25");
  grilleDe(16, 0, [["4e A", 20, 12.5, 250], ["4e B", 30, 10, 300], ["Total", 50, 11, 550]]);
  barresDe(16, 0, [12.5, 10, 11], { surligne: 2 });

  v.titre("★★★ Problèmes");
  // NASA Planetary Fact Sheet, diamètres équatoriaux (km) : on refait l'arrondi.
  const nasa = { Mercure: 4879, Vénus: 12104, Terre: 12756, Mars: 6792, Jupiter: 142984, Saturne: 120536, Uranus: 51118, Neptune: 49528 };
  const s17 = Object.values(nasa).map((x) => Math.round(x / 1000));
  v.ok("17. les diamètres de l'énoncé sont ceux de la NASA arrondis au millier", Object.keys(nasa).every((p, i) => e(17).includes(`${p} $${s17[i]}$`)));
  moyEst(17, s17, 50.25);
  deuxMedianes(17, s17, 31.5);
  v.ok("17. étendue 138 ; Jupiter / Mercure ≈ 28,6 (« presque 30 ») ; aucune planète entre 13 et 50 ; familles 9,25 et 91,25", etendue(s17) === 138 && 143 / 5 > 28 && 143 / 5 < 30 && s17.every((x) => x <= 13 || x >= 50) && moyenne(s17.filter((x) => x <= 13)) === 9.25 && moyenne(s17.filter((x) => x >= 50)) === 91.25);
  egalites(17, "5 + 12 + 13 + 7 + 143 + 121 + 51 + 50 = 402");
  egalites(17, "\\dfrac{402}{8} = 50{,}25");
  ecrit(17, `Je range : ${liste(range(s17))}`);
  egalites(17, "\\dfrac{13 + 50}{2} = 31{,}5");
  egalites(17, "143 - 5 = 138");
  egalites(17, "\\dfrac{5 + 7 + 12 + 13}{4} = 9{,}25");
  egalites(17, "\\dfrac{50 + 51 + 121 + 143}{4} = 91{,}25");
  rangeeDe(17, 0, s17);
  barresDe(17, 0, s17, { moyenne: 50.25 });

  const A = [14, 15, 13, 14, 16, 15, 11], B = [18, 6, 19, 17, 5, 18, 15];
  v.ok("18. l'énoncé donne les deux semaines", e(18).includes(`famille A : ${A.map((x) => `$${x}$`).join(", ")}`) && e(18).includes(`famille B : ${B.map((x) => `$${x}$`).join(", ")}`));
  v.ok("18. totaux 98 et 98, moyennes 14 et 14", somme(A) === 98 && somme(B) === 98 && egal(moyQ(A), Q(14)) && egal(moyQ(B), Q(14)));
  deuxMedianes(18, A, 14);
  deuxMedianes(18, B, 17);
  v.ok("18. étendues 5 et 14 ; les deux jours nuageux de B : 5 et 6", etendue(A) === 5 && etendue(B) === 14 && String(range(B).slice(0, 2)) === "5,6");
  egalites(18, "14 + 15 + 13 + 14 + 16 + 15 + 11 = 98");
  egalites(18, "18 + 6 + 19 + 17 + 5 + 18 + 15 = 98");
  egalites(18, "\\dfrac{98}{7} = 14");
  ecrit(18, `A rangée : ${liste(range(A))} : médiane $14$ kWh`);
  ecrit(18, `B rangée : ${liste(range(B))} : médiane $17$ kWh`);
  egalites(18, "16 - 11 = 5");
  egalites(18, "19 - 5 = 14");
  barresDe(18, 0, A, { moyenne: 14, etendue: true });
  barresDe(18, 1, B, { moyenne: 14, etendue: true });

  const s19 = [6, 9, 11, 14, 15];
  v.ok("19. l'énoncé donne les cinq comptages", e(19).includes(`$6$, $9$, $11$, $14$ et $15$`));
  moyEst(19, s19, 11);
  deuxMedianes(19, s19, 11);
  const x19 = 12 * 6 - somme(s19);
  v.ok(`19. le sixième jour : ${x19}, moyenne 12, nouvelle médiane 12,5`, x19 === 17 && moyenne([...s19, x19]) === 12 && medianeParComptage([...s19, x19]) === 12.5);
  // d) : balayage de 0 à 100 cigognes — une seule valeur garde la médiane à 11.
  const gardent = Array.from({ length: 101 }, (_, x) => x).filter((x) => medianeParComptage([...s19, x]) === 11);
  const bas = Array.from({ length: 10 }, (_, x) => x).every((x) => mediane([...s19, x]) === 10);
  const haut = Array.from({ length: 87 }, (_, x) => x + 14).every((x) => mediane([...s19, x]) === 12.5);
  v.ok("19. d) seule la valeur 11 garde la médiane à 11 ; 9 ou moins → 10 ; 14 ou plus → 12,5", String(gardent) === "11" && bas && haut, `lu ${gardent}`);
  egalites(19, "6 + 9 + 11 + 14 + 15 = 55");
  egalites(19, "\\dfrac{55}{5} = 11");
  egalites(19, "12 \\times 6 = 72");
  egalites(19, "72 - 55 = 17");
  egalites(19, "\\dfrac{11 + 14}{2} = 12{,}5");
  ecrit(19, "il faut qu'il vaille $11$");
  rangeeDe(19, 0, [...s19, x19]);
  barresDe(19, 0, [...s19, x19], { moyenne: 12, surligne: 5 });

  // 20 : TOUTES les séries rangées de quatre entiers de 0 à 100 qui respectent
  // les trois contraintes — le plus long et l'étendue en sortent, et on les compte.
  const series20 = [];
  for (let b = 6; b <= 100; b++) for (let cc = b; cc <= 100; cc++) for (let d = cc; d <= 100; d++) {
    const t = [6, b, cc, d];
    if (mediane(t) === 10 && somme(t) === 44) series20.push(t);
  }
  v.ok(`20. ${series20.length} séries possibles, toutes de plus longue 18 (étendue 12)`, series20.length === 5 && series20.every((t) => t[3] === 18 && etendue(t) === 12), JSON.stringify(series20));
  v.ok("20. les paires du milieu écrites sont exactement celles du balayage", c(20).includes(series20.map(([, b, cc]) => `$${b}$ et $${cc}$`).slice(0, -1).join(", ") + `, ou $${series20.at(-1)[1]}$ et $${series20.at(-1)[2]}$`));
  const sol20 = [6, 8, 12, 18];
  v.ok("20. la série proposée 6, 8, 12, 18 est l'une d'elles", series20.some((t) => String(t) === String(sol20)));
  egalites(20, "11 \\times 4 = 44");
  egalites(20, "10 \\times 2 = 20");
  egalites(20, "44 - 6 - 20 = 18");
  egalites(20, "18 - 6 = 12");
  egalites(20, "6 + 8 + 12 + 18 = 44");
  egalites(20, "\\dfrac{8 + 12}{2} = 10");
  ecrit(20, "Cela fait $5$ séries");
  rangeeDe(20, 0, sol20);
  barresDe(20, 0, sol20, { moyenne: 11, etendue: true });

  v.titre("Les dessins");
  const tous = f.blocs.map((b) => dessins(b));
  const toutesBarres = tous.flatMap((d) => d.barres);
  const avecMoyenne = toutesBarres.filter((b) => b.moyenne !== undefined);
  const moyFausses = avecMoyenne.filter((b) => !proche(Number(b.moyenne), moyenne(valeurs(b)), 1e-9));
  v.ok(`${avecMoyenne.length} lignes de moyenne : chacune est la moyenne de SES barres`, moyFausses.length === 0, moyFausses.map((b) => `${valeurs(b)} / ${b.moyenne}`).join(" | "));
  const toutesRangees = tous.flatMap((d) => d.rangees);
  const rangeesFausses = toutesRangees.filter((r) => String(r.valeurs) !== String(range(r.valeurs)) || !proche(r.mediane, medianeParComptage(r.valeurs)));
  v.ok(`${toutesRangees.length} séries rangées : bien rangées, et leur médiane est juste`, rangeesFausses.length === 0, rangeesFausses.map((r) => r.valeurs.join(",")).join(" | "));
  // Une étiquette en 12 gras fait ~7 unités par signe ; elle doit tenir dans la
  // place de sa barre, (230 − 14 − marge droite) ÷ nombre de barres.
  const place = (b) => (230 - 14 - (b.etendue ? 34 : 10)) / b.barres.length;
  const trop = [...toutesBarres.filter((b) => b.barres.length > 8 || b.barres.some(([l, x]) => Math.max(l.length, String(x).length) * 7 > place(b))), ...toutesRangees.filter((r) => r.valeurs.length > 9)];
  v.ok(`lisible à 375 px : ${toutesBarres.length} diagrammes de 8 barres au plus, étiquettes et valeurs dans la place de leur barre ; ${toutesRangees.length} rangées de 9 cases au plus`, trop.length === 0, trop.map((b) => JSON.stringify(b.barres ?? b.valeurs)).join(" | "));
  const grilles = tous.flatMap((d) => d.grilles);
  v.ok(`${grilles.length} grilles de 4 colonnes au plus`, grilles.every((g) => g.entetes.length <= 4 && g.lignes.every((l) => l.length === g.entetes.length)));
  const avecSchema = f.blocs.filter((b) => /\n\s+schema:/.test(b)).length;
  v.ok(`${avecSchema} corrigés dessinés sur 20 (au moins 18)`, avecSchema >= 18);
  const sansReponse = f.corrections.map((t, i) => [i + 1, t.split("\\n").at(-1)]).filter(([, l]) => !l.startsWith("Réponse : "));
  v.ok("les 20 corrigés finissent par une ligne « Réponse : »", sansReponse.length === 0, sansReponse.map(([k]) => k).join(", "));
  const sansPiege = f.corrections.map((t, i) => [i + 1, t]).filter(([, t]) => !t.includes("⛔ Le piège"));
  v.ok("les 20 corrigés nomment leur piège", sansPiege.length === 0, sansPiege.map(([k]) => k).join(", "));
  v.ok("les 4 problèmes ont un titre", (f.series.split(/niveau: 3,/)[1]?.match(/^\s*titre: "/gm) ?? []).length === 5);
  // ⛔ Hors programme de 4e et hors notion : quartiles, boîte, écart type, fréquences.
  const horsNotion = f.textes.filter((t) => /quartile|écart type|boîte à moustaches|fréquence/i.test(t));
  v.ok("ni quartile, ni boîte, ni écart type, ni fréquence (seconde ; stat_donnee)", horsNotion.length === 0, horsNotion[0]?.slice(0, 80));
}

lancer({
  nom: "STATISTIQUES : MOYENNE, MÉDIANE, ÉTENDUE · 4e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-4e-statistiques.tsx",
  notionId: "stat_statistique",
  classe: "4e",
  verifier,
  casses: [
    ["ex. 1 : la ligne de moyenne à côté", "{ label: \"L5\", value: 42 }], { moyenne: 44 })", "{ label: \"L5\", value: 42 }], { moyenne: 44.5 })"],
    ["ex. 1 : la valeur répétée comptée une fois", "$\\\\dfrac{220}{5} = 44$", "$\\\\dfrac{220}{5} = 44{,}5$"],
    ["ex. 2 : la médiane sans ranger", "Donc la médiane est $72$ cm", "Donc la médiane est $90$ cm"],
    ["ex. 2 : la série rangée mal rangée", "rangee([58, 64, 69, 72, 77, 81, 90], 72)", "rangee([58, 69, 64, 72, 77, 81, 90], 72)"],
    ["ex. 3 : effectif pair, une seule valeur centrale", "rangee([15, 17, 18, 19, 21, 24], 18.5)", "rangee([15, 17, 18, 19, 21, 24], 18)"],
    ["ex. 4 : l'étendue « dernière moins première »", "$5{,}1 - 3{,}6 = 1{,}5$", "$5{,}1 - 3{,}6 = 0{,}3$"],
    ["ex. 4 : une barre fausse", "{ label: \"C3\", value: 5.1 }", "{ label: \"C3\", value: 5.4 }"],
    ["ex. 5 : diviser par le nombre de pointures", "Moyenne : $\\\\dfrac{772}{20} = 38{,}6$", "Moyenne : $\\\\dfrac{772}{20} = 193$"],
    ["ex. 5 : un produit faux dans la grille", "[39, 7, 273]", "[39, 7, 263]"],
    ["ex. 6 : les signes oubliés", "$(-4) + (-1) + 2 + (-3) + 1 = -5$", "$(-4) + (-1) + 2 + (-3) + 1 = 11$"],
    ["ex. 7 : l'étendue retranchée", "$38 + 12 = 50$", "$38 + 12 = 26$"],
    ["ex. 8 : la note qui tire la moyenne changée", "$14$, $2$, $13$, $12$, $14$", "$14$, $6$, $13$, $12$, $14$"],
    ["ex. 9 : une ruche de la figure changée", "figure: barres([{ label: \"R1\", value: 18 }", "figure: barres([{ label: \"R1\", value: 19 }"],
    ["ex. 9 : la médiane prise à la 4e ruche", "la médiane est la $4^e$, $21$ kg", "la médiane est la $4^e$, $30$ kg"],
    ["ex. 10 : la médiane prise parmi les valeurs différentes", "la médiane est $31$ jours", "la médiane est $30$ jours"],
    ["ex. 10 : un effectif cumulé faux", "[30, 4, 5, 120]", "[30, 4, 6, 120]"],
    ["ex. 11 : viser la note au lieu du total", "$65 - 48 = 17$", "$65 - 48 = 13$"],
    ["ex. 12 : la villa dans la médiane", "rangee([180, 190, 195, 200, 205, 210, 920], 200)", "rangee([180, 190, 195, 200, 205, 210, 920], 300)"],
    ["ex. 13 : la médiane au milieu des valeurs", "donc la médiane est $1$", "donc la médiane est $2{,}5$"],
    ["ex. 13 : la ligne de la médiane en couleur à côté", "[4, 2, 40]], { surligne: 0 })", "[4, 2, 40]], { surligne: 1 })"],
    ["ex. 14 : la moyenne fausse non recalculée", "{ moyenne: 25.6, surligne: 2 }", "{ moyenne: 13, surligne: 2 }"],
    ["ex. 15 : la médiane = la valeur la plus fréquente", "la médiane est $3$.", "la médiane est $5$."],
    ["ex. 16 : la moyenne des deux moyennes", "$\\\\dfrac{550}{50} = 11$", "$\\\\dfrac{550}{50} = 11{,}25$"],
    ["ex. 17 : un diamètre de la NASA mal arrondi", "Neptune $50$", "Neptune $49$"],
    ["ex. 17 : la moyenne des planètes fausse", "$\\\\dfrac{402}{8} = 50{,}25$", "$\\\\dfrac{402}{8} = 52{,}25$"],
    ["ex. 18 : un jour de B changé", "famille B : $18$, $6$,", "famille B : $18$, $7$,"],
    ["ex. 18 : la médiane de B prise au milieu de la semaine", "médiane $17$ kWh", "médiane $17{,}5$ kWh"],
    ["ex. 19 : l'ancienne médiane gardée", "$\\\\dfrac{11 + 14}{2} = 12{,}5$", "$\\\\dfrac{11 + 14}{2} = 11$"],
    ["ex. 20 : une série du milieu oubliée", "$9$ et $11$, ou", "$9$ et $12$, ou"],
    ["ex. 20 : la plus longue randonnée fausse", "$44 - 6 - 20 = 18$", "$44 - 6 - 20 = 16$"],
    ["un schéma retiré", "schema: rangee([15, 17, 18, 19, 21, 24], 18.5),\n", ""],
    ["une micro d'une autre notion", "micros: [\"stat_etendue\"],", "micros: [\"stat_frequence\"],"],
    ["un $ dans un dessin", "{ label: \"Lun\", value: -4 }", "{ label: \"$Lun$\", value: -4 }"],
    ["un piège non nommé", "⛔ Le piège : croire qu'un indicateur", "Attention : croire qu'un indicateur"],
  ],
});
