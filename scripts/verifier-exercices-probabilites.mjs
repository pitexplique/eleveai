// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Les probabilités »
// de seconde (lib/fiches-exercices/maths-seconde-probabilites.tsx).
//
// ⭐ L'AUTRE CHEMIN : les probabilités sont recalculées ici en fractions
// exactes, le plus souvent en ÉNUMÉRANT les issues (dés, pièces, cartes, codes)
// plutôt qu'avec la formule du corrigé. Puis les schémas sont relus dans le
// source : les branches de chaque nœud d'un arbre font 1, la roue a les bons
// poids, l'urne les bonnes billes, chaque tableau ses bonnes cases et ses
// totaux justes, les cases surlignées sont celles de l'événement.
//
//   node scripts/verifier-exercices-probabilites.mjs

import { Q, plus, moins, fois, div, egal, lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

const F = (n, d = 1) => Q(BigInt(n), BigInt(d));
const lit = (t) => { const s = t.replace(",", "."); if (s.includes("/")) { const [n, d] = s.split("/"); return F(Number(n), Number(d)); } const [e, dec = ""] = s.split("."); return F(Number(e + dec), 10 ** dec.length); };
const somme = (l) => l.reduce(plus, F(0));
const compte = (univers, pred) => F(univers.filter(pred).length, univers.length);

/** L'argument (tableau) d'un appel `nom([...])` dans le bloc, en JSON. */
function argument(bloc, nom) {
  const i = bloc.indexOf(`${nom}(`);
  if (i < 0) return null;
  let j = i + nom.length + 1, prof = 0, k = j;
  for (; k < bloc.length; k++) {
    if (bloc[k] === "[") prof++;
    if (bloc[k] === "]") { prof--; if (prof === 0) break; }
  }
  const brut = bloc.slice(j, k + 1).replace(/(\w+):/g, '"$1":').replace(/,(\s*[\]}])/g, "$1");
  return JSON.parse(brut.replace(/couleur": (\w+)/g, 'couleur": "$1"'));
}
/** Les arguments de `tableauProba(entetes, lignes, surligne)`. */
function tableauDe(bloc) {
  const i = bloc.indexOf("tableauProba(");
  const s = bloc.slice(i + "tableauProba(".length);
  let prof = 0, k = 0;
  for (; k < s.length; k++) { if (s[k] === "(") prof++; if (s[k] === ")") { if (prof === 0) break; prof--; } }
  return JSON.parse(`[${s.slice(0, k)}]`.replace(/,(\s*[\]}])/g, "$1"));
}

function verifier(source, v) {
  const f = lireFeuille(source);
  const c = (k) => f.corrections[k - 1] ?? "";
  const blocs = f.blocs;
  const ecrit = (k, texte) => v.ok(`${k}. le corrigé écrit ${texte}`, c(k).includes(texte), texte);
  const vaut = (k, quoi, x, y) => v.ok(`${k}. ${quoi} = ${y.n}/${y.d}`, egal(x, y), `${x.n}/${x.d}`);
  /** Chaque nœud d'un arbre : ses branches font 1. */
  const arbreJuste = (k) => {
    const a = argument(blocs[k - 1], "arbre");
    const faux = [];
    const tour = (enfants, chemin) => {
      const probas = enfants.map((e) => e.proba).filter(Boolean);
      if (probas.length === enfants.length && !egal(somme(probas.map(lit)), F(1))) faux.push(chemin || "racine");
      enfants.forEach((e) => e.enfants && tour(e.enfants, `${chemin}${e.label}`));
    };
    tour(a, "");
    v.ok(`${k}. chaque nœud de l'arbre a des branches de somme 1`, a.length > 0 && faux.length === 0, faux.join(", "));
    return a;
  };
  /** Un tableau à double entrée : chaque ligne et colonne « Total » est juste. */
  const totauxJustes = (k) => {
    const [ent, lignes, surl] = tableauDe(blocs[k - 1]);
    const n = lignes.map((l) => l.slice(1).map(lit));
    const ok = n.slice(0, -1).every((l) => egal(somme(l.slice(0, -1)), l[l.length - 1])) && n[0].every((_, j) => egal(somme(n.slice(0, -1).map((l) => l[j])), n[n.length - 1][j]));
    v.ok(`${k}. les totaux du tableau sont justes`, ok, JSON.stringify(lignes));
    return { ent, lignes, surl: surl ?? [] };
  };
  const de = [1, 2, 3, 4, 5, 6];

  v.titre("★ Un seul geste");
  ecrit(1, "$A = \\{2\\,;\\,4\\,;\\,6\\}$ et $B = \\{5\\,;\\,6\\}$");
  ecrit(1, "$A \\cap B = \\{6\\}$");
  ecrit(1, "$\\overline{A} = \\{1\\,;\\,3\\,;\\,5\\}$");
  v.ok("1. le dé surligne les pairs", blocs[0].includes("de([2, 4, 6])"));

  vaut(2, "P(pair)", compte(de, (x) => x % 2 === 0), F(1, 2));
  vaut(2, "P(au moins 5)", compte(de, (x) => x >= 5), F(1, 3));
  ecrit(2, "$P(A) = \\dfrac{3}{6} = \\dfrac{1}{2}$ et $P(B) = \\dfrac{2}{6} = \\dfrac{1}{3}$");

  vaut(3, "P(6)", moins(F(1), fois(F(5), lit("0,1"))), lit("0,5"));
  ecrit(3, "$P(6) = 1 - 0{,}5 = 0{,}5$");
  const r3 = argument(blocs[2], "roue");
  v.ok("3. la roue donne 1/10 à chaque face de 1 à 5 et 5/10 au 6", r3.slice(0, 5).every((s) => s.poids === 1) && r3[5].poids === 5);

  ecrit(4, "= 1 - 0{,}35 = 0{,}65$");
  const r4 = argument(blocs[3], "roue");
  v.ok("4. la roue : 35 et 65", r4[0].poids === 35 && r4[1].poids === 65);

  const urne5 = argument(blocs[4], "billes").map((b) => b.couleur);
  v.ok("5. l'urne dessinée : 5 R, 3 B, 2 V", urne5.filter((x) => x === "R").length === 5 && urne5.filter((x) => x === "B").length === 3 && urne5.filter((x) => x === "V").length === 2);
  vaut(5, "P(rouge)", compte(urne5, (x) => x === "R"), F(1, 2));
  vaut(5, "P(pas verte)", compte(urne5, (x) => x !== "V"), F(4, 5));
  ecrit(5, "$P(\\text{pas verte}) = 1 - 0{,}2 = 0{,}8$");

  const A6 = (x) => x % 2 === 0, C6 = (x) => x >= 4;
  vaut(6, "P(A ∩ C)", compte(de, (x) => A6(x) && C6(x)), F(1, 3));
  vaut(6, "P(A ∪ C)", compte(de, (x) => A6(x) || C6(x)), F(2, 3));
  ecrit(6, "$\\{2\\,;\\,4\\,;\\,5\\,;\\,6\\}$");
  v.ok("6. le dé surligne A ∪ C", blocs[5].includes("de([2, 4, 5, 6])"));

  vaut(7, "P(A ∪ B)", moins(plus(lit("0,5"), lit("0,4")), lit("0,15")), lit("0,75"));
  ecrit(7, "= 0{,}5 + 0{,}4 - 0{,}15 = 0{,}75$");
  const t7 = totauxJustes(7);
  const casesAouB = somme(t7.surl.map(([i, j]) => lit(t7.lignes[i][j])));
  vaut(7, "les cases surlignées (A ∪ B) du tableau", casesAouB, lit("0,75"));
  v.ok("7. la case A ∩ B du tableau vaut 0,15", t7.lignes[0][1] === "0,15" && t7.lignes[0][3] === "0,5" && t7.lignes[2][1] === "0,4");

  const pieces2 = ["PP", "PF", "FP", "FF"];
  vaut(8, "P(PP)", compte(pieces2, (x) => x === "PP"), F(1, 4));
  vaut(8, "P(au moins un pile)", compte(pieces2, (x) => x.includes("P")), F(3, 4));
  arbreJuste(8);

  v.titre("★★ Type devoir");
  const deux = de.flatMap((a) => de.map((b) => [a, b]));
  vaut(9, "P(somme 8)", compte(deux, ([a, b]) => a + b === 8), F(5, 36));
  vaut(9, "P(double)", compte(deux, ([a, b]) => a === b), F(1, 6));
  const [, l9, s9] = tableauDe(blocs[8]);
  v.ok("9. chaque case du tableau est la somme de sa ligne et de sa colonne", l9.every((l, i) => l.slice(1).every((x, j) => Number(x) === i + 1 + j + 1)));
  v.ok("9. les 5 cases surlignées valent 8", s9.length === 5 && s9.every(([i, j]) => l9[i][j] === "8"));

  const r10 = argument(blocs[9], "roue");
  const tot10 = r10.reduce((s, x) => s + x.poids, 0);
  v.ok("10. la roue : 180°, 120°, 60° sur 360°", tot10 === 360 && r10[0].poids === 180 && r10[1].poids === 120 && r10[2].poids === 60);
  vaut(10, "P(pas rouge)", F(tot10 - r10[0].poids, tot10), F(1, 2));
  ecrit(10, "$\\dfrac{1}{3} + \\dfrac{1}{6} = \\dfrac{1}{2}$");

  vaut(11, "P(F ∪ N)", F(18 + 12 - 5, 30), F(5, 6));
  ecrit(11, "= \\dfrac{25}{30} = \\dfrac{5}{6}$");
  const t11 = totauxJustes(11);
  v.ok("11. le tableau : 5 font les deux, 5 ne font rien", t11.lignes[0][1] === "5" && t11.lignes[1][2] === "5" && t11.lignes[2][3] === "30" && t11.surl.length === 1 && t11.lignes[t11.surl[0][0]][t11.surl[0][1]] === "5");

  const t12 = totauxJustes(12);
  v.ok("12. 150 et 90 demi-pensionnaires, 400 élèves", t12.lignes[0][1] === "150" && t12.lignes[1][1] === "90" && t12.lignes[2][3] === "400");
  vaut(12, "P(S ∪ D)", F(220 + 240 - 150, 400), lit("0,775"));
  vaut(12, "le contraire (première et externe)", moins(F(1), F(90, 400)), lit("0,775"));
  ecrit(12, "= \\dfrac{310}{400} = 0{,}775$");

  const pieces3 = ["P", "F"].flatMap((a) => ["P", "F"].flatMap((b) => ["P", "F"].map((d) => a + b + d)));
  vaut(13, "P(au moins un pile, 3 pièces)", compte(pieces3, (x) => x.includes("P")), F(7, 8));
  ecrit(13, "$P(\\text{au moins un pile}) = 1 - \\dfrac{1}{8} = \\dfrac{7}{8}$");
  const [, l13, s13] = tableauDe(blocs[12]);
  v.ok("13. le tableau liste les 8 issues, chacune une fois", l13.length === 8 && new Set(l13.map((l) => l[3])).size === 8 && l13.every((l) => l[3] === l.slice(0, 3).join("")) && JSON.stringify([...l13.map((l) => l[3])].sort()) === JSON.stringify([...pieces3].sort()));
  v.ok("13. la ligne surlignée est FFF, le seul « aucun pile »", s13.every(([i]) => l13[i][3] === "FFF") && s13.length === 4);

  const p14 = F(1, 7);
  vaut(14, "la loi somme à 1", plus(fois(F(5), p14), fois(F(2), p14)), F(1));
  vaut(14, "P(pair)", plus(plus(p14, p14), fois(F(2), p14)), F(4, 7));
  const r14 = argument(blocs[13], "roue");
  v.ok("14. la roue : 1, 1, 1, 1, 1, 2", r14.map((s) => s.poids).join() === "1,1,1,1,1,2");

  const jeu = ["pique", "coeur", "carreau", "trefle"].flatMap((co) => ["7", "8", "9", "10", "V", "D", "R", "As"].map((va) => [co, va]));
  const fig = (x) => ["V", "D", "R"].includes(x[1]), coeur = (x) => x[0] === "coeur";
  vaut(15, "P(C ∪ F)", compte(jeu, (x) => coeur(x) || fig(x)), F(17, 32));
  vaut(15, "P(C ∩ F)", compte(jeu, (x) => coeur(x) && fig(x)), F(3, 32));
  const t15 = totauxJustes(15);
  v.ok("15. les cases surlignées comptent C ∪ F : 17 cartes", t15.surl.reduce((s, [i, j]) => s + Number(t15.lignes[i][j]), 0) === 17);

  const urne16 = ["R", "R", "R", "B", "B"];
  const tirages = urne16.flatMap((a, i) => urne16.filter((_, j) => j !== i).map((b) => a + b));
  vaut(16, "P(RR) sans remise", compte(tirages, (x) => x === "RR"), F(3, 10));
  vaut(16, "P(même couleur)", compte(tirages, (x) => x[0] === x[1]), F(2, 5));
  ecrit(16, "$P(RR) = \\dfrac{3}{5} \\times \\dfrac{2}{4} = \\dfrac{6}{20} = \\dfrac{3}{10}$");
  const a16 = arbreJuste(16);
  v.ok("16. l'arbre porte 3/5, 2/5 puis 2/4, 2/4 et 3/4, 1/4", a16[0].proba === "3/5" && a16[1].proba === "2/5" && a16[0].enfants.map((e) => e.proba).join() === "2/4,2/4" && a16[1].enfants.map((e) => e.proba).join() === "3/4,1/4");

  v.titre("★★★ Problèmes");
  v.ok("17. 10 000 codes, 5 040 aux chiffres tous différents (compté)", (() => { let n = 0; for (let x = 0; x < 10000; x++) if (new Set(String(x).padStart(4, "0")).size === 4) n++; return n === 5040; })());
  ecrit(17, "= \\dfrac{5\\,040}{10\\,000} = 0{,}504$");
  ecrit(17, "$1 - 0{,}504 = 0{,}496$");
  v.ok("17. le diagramme : 5 040 et 4 960", blocs[16].includes('value: 5040') && blocs[16].includes('value: 4960'));

  const memeMois = (n) => { let p = 1; for (let i = 0; i < n; i++) p *= (12 - i) / 12; return 1 - p; };
  const barres18 = [...blocs[17].matchAll(/value: ([\d.]+)/g)].map((m) => Number(m[1]));
  v.ok("18. le diagramme donne la bonne probabilité pour 2 à 6 personnes", barres18.length === 5 && barres18.every((x, i) => Math.abs(x - memeMois(i + 2)) < 0.0006), String([2, 3, 4, 5, 6].map(memeMois)));
  vaut(18, "trois mois différents", fois(F(11, 12), F(10, 12)), F(110, 144));
  ecrit(18, "$1 - 0{,}764 \\approx 0{,}236$");
  v.ok("18. 4 personnes sous 1/2, 5 au-dessus", memeMois(4) < 0.5 && memeMois(5) > 0.5);

  const rouges = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  const cases = Array.from({ length: 37 }, (_, i) => i);
  vaut(19, "P(rouge)", compte(cases, (x) => rouges.includes(x)), F(18, 37));
  vaut(19, "P(rouge ∪ pair)", compte(cases, (x) => rouges.includes(x) || (x > 0 && x % 2 === 0)), F(28, 37));
  v.ok("19. les 8 rouges pairs de l'énoncé sont les bons", rouges.filter((x) => x % 2 === 0).join(", ") === "12, 14, 16, 18, 30, 32, 34, 36" && f.enonces[18].includes("(12, 14, 16, 18, 30, 32, 34 et 36)"));
  ecrit(19, "= \\dfrac{28}{37} \\approx 0{,}757$");
  const r19 = argument(blocs[18], "roue");
  v.ok("19. la roue : 18 rouges, 18 noirs, 1 zéro (37 cases)", r19.map((s) => s.poids).join() === "18,18,1");

  vaut(20, "la loi des groupes somme à 1", somme(["0,42", "0,45", "0,09", "0,04"].map(lit)), F(1));
  vaut(20, "P(pas A)", moins(F(1), lit("0,45")), lit("0,55"));
  vaut(20, "P(O ou B)", plus(lit("0,42"), lit("0,09")), lit("0,51"));
  vaut(20, "P(O−)", fois(lit("0,42"), lit("0,15")), lit("0,063"));
  ecrit(20, "$P(\\text{O}^-) = 0{,}42 \\times 0{,}15 = 0{,}063$");
  arbreJuste(20);
}

lancer({
  nom: "LES PROBABILITÉS · seconde · 20 exercices",
  fichier: "lib/fiches-exercices/maths-seconde-probabilites.tsx",
  notionId: "probabilites_ensemble_fini",
  verifier,
  casses: [
    ["ex. 1 : « au moins 5 » sans le 5", "$A = \\\\{2\\\\,;\\\\,4\\\\,;\\\\,6\\\\}$ et $B = \\\\{5\\\\,;\\\\,6\\\\}$", "$A = \\\\{2\\\\,;\\\\,4\\\\,;\\\\,6\\\\}$ et $B = \\\\{6\\\\}$"],
    ["ex. 3 : la loi ne fait plus 1", "{ label: \"6\", poids: 5, couleur: R }", "{ label: \"6\", poids: 4, couleur: R }"],
    ["ex. 5 : une bille de trop", "{ couleur: B }, { couleur: V }, { couleur: V }]", "{ couleur: B }, { couleur: V }, { couleur: V }, { couleur: V }]"],
    ["ex. 7 : l'intersection oubliée", "= 0{,}5 + 0{,}4 - 0{,}15 = 0{,}75$", "= 0{,}5 + 0{,}4 - 0{,}15 = 0{,}9$"],
    ["ex. 7 : un total faux", "[\"Total\", \"0,4\", \"0,6\", \"1\"]", "[\"Total\", \"0,4\", \"0,5\", \"1\"]"],
    ["ex. 8 : une branche fausse", "enfants: [{ label: \"P\", proba: \"1/2\" }, { label: \"F\", proba: \"1/2\" }] }, { label: \"F\", proba: \"1/2\", enfants: [{ label: \"P\", proba: \"1/2\" }, { label: \"F\", proba: \"1/2\" }] }]),\n          micros: [\"proba_tableau_arbre\", \"proba_evenement_contraire\"]", "enfants: [{ label: \"P\", proba: \"1/2\" }, { label: \"F\", proba: \"1/3\" }] }, { label: \"F\", proba: \"1/2\", enfants: [{ label: \"P\", proba: \"1/2\" }, { label: \"F\", proba: \"1/2\" }] }]),\n          micros: [\"proba_tableau_arbre\", \"proba_evenement_contraire\"]"],
    ["ex. 9 : une case surlignée fausse", "[[1, 6], [2, 5], [3, 4], [4, 3], [5, 2]]", "[[1, 6], [2, 5], [3, 4], [4, 3], [5, 3]]"],
    ["ex. 10 : un secteur faux", "{ label: \"jaune 1/6\", poids: 60, couleur: J }", "{ label: \"jaune 1/6\", poids: 90, couleur: J }"],
    ["ex. 11 : le tableau ne tombe plus juste", "[\"Football\", \"5\", \"13\", \"18\"]", "[\"Football\", \"5\", \"12\", \"18\"]"],
    ["ex. 12 : la réunion fausse", "= \\\\dfrac{310}{400} = 0{,}775$", "= \\\\dfrac{310}{400} = 0{,}75$"],
    ["ex. 13 : le contraire oublié", "$P(\\\\text{au moins un pile}) = 1 - \\\\dfrac{1}{8} = \\\\dfrac{7}{8}$", "$P(\\\\text{au moins un pile}) = 1 - \\\\dfrac{1}{8} = \\\\dfrac{5}{8}$"],
    ["ex. 16 : avec remise au lieu de sans", "{ label: \"R\", proba: \"3/5\", enfants: [{ label: \"R\", proba: \"2/4\" }, { label: \"B\", proba: \"2/4\" }] }", "{ label: \"R\", proba: \"3/5\", enfants: [{ label: \"R\", proba: \"3/5\" }, { label: \"B\", proba: \"2/5\" }] }"],
    ["ex. 17 : les codes différents mal comptés", "= \\\\dfrac{5\\\\,040}{10\\\\,000} = 0{,}504$", "= \\\\dfrac{5\\\\,040}{10\\\\,000} = 0{,}54$"],
    ["ex. 18 : une barre fausse", "{ label: \"5\", value: 0.618 }", "{ label: \"5\", value: 0.5 }"],
    ["ex. 19 : la probabilité du rouge fausse", "[{ label: \"rouge 18\", poids: 18, couleur: R }, { label: \"noir 18\", poids: 18, couleur: N }, { label: \"0\", poids: 1, couleur: V }]", "[{ label: \"rouge 18\", poids: 18, couleur: R }, { label: \"noir 18\", poids: 18, couleur: N }]"],
    ["ex. 20 : la branche du rhésus fausse", "{ label: \"Rh−\", proba: \"0,15\" }", "{ label: \"Rh−\", proba: \"0,25\" }"],
  ],
});
