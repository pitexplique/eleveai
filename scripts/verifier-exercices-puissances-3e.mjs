// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Puissances et écriture
// scientifique » de 3e (lib/fiches-exercices/maths-3e-puissances.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé additionne et soustrait des EXPOSANTS ; ici on
// ne touche jamais un exposant. Chaque puissance est recalculée en
// MULTIPLIANT facteur par facteur (`rep()` ci-dessous, une boucle), chaque
// écriture scientifique en fractions exactes (`sci`, `texSci` du module commun),
// puis le résultat doit se LIRE dans la phrase du corrigé.
//
// ⭐ LES SCHÉMAS SONT RELUS : les cases des tableaux et les barres des
// diagrammes sont extraites du source et comparées au recalcul.
//
//   node scripts/verifier-exercices-puissances-3e.mjs
//
// Sort en code 1 à la première divergence, ou si un contrôle négatif passe
// inaperçu. Le socle (structure, dollars, micros, casses) : verifier-exercices-commun.mjs.

import {
  Q, D, fois, div, plus, egal, inf, versNombre, sci, tex, texSci, lireFeuille, litPuissance, lancer,
} from "./verifier-exercices-commun.mjs";

/** base^n par multiplications répétées (n ⩾ 0) — sans passer par un exposant. */
const rep = (base, n) => {
  let r = Q(1);
  for (let i = 0; i < n; i++) r = fois(r, base);
  return r;
};
/** 10^n, n de signe quelconque : n divisions par dix si n < 0. */
const dix = (n) => (n >= 0 ? rep(Q(10), n) : div(Q(1), rep(Q(10), -n)));

const SUP = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9", "⁻": "-" };
/** Une case de tableau → fraction exacte : « 1 024 », « 0,0001 », « −8 », « 10⁻⁴ », « 3,2 × 10⁻⁴ ». */
function lireCase(s) {
  const t = s.replace(/\s/g, "").replace(/−/g, "-");
  const m = t.match(/^(?:([-\d,]+)×)?10([⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+)$/);
  if (m) return fois(m[1] ? D(m[1]) : Q(1), dix(Number([...m[2]].map((c) => SUP[c]).join(""))));
  return D(t);
}
/** Les lignes des `tableau([...])` d'un bloc, rangées par leur en-tête. */
function lignesTableau(bloc) {
  const rows = {};
  for (const m of bloc.matchAll(/\[\s*("(?:[^"\\]|\\.)*"(?:,\s*"(?:[^"\\]|\\.)*")+)\s*,?\s*\]/g)) {
    const cells = JSON.parse(`[${m[1]}]`);
    if (!cells[0].startsWith("entier_")) rows[cells[0]] = cells.slice(1);
  }
  return rows;
}
/** Les barres des `diagramme(...)` d'un bloc. */
const barres = (bloc) => [...bloc.matchAll(/label: "([^"]+)", value: ([\d.]+)/g)].map((m) => [m[1], Number(m[2])]);

function verifier(source, v) {
  const { corrections, blocs } = lireFeuille(source);
  const c = (k) => corrections[k - 1] ?? "";
  const b = (k) => blocs[k - 1] ?? "";
  const dit = (k, phrase, quoi = phrase) => v.ok(`${k}. « ${quoi} »`, c(k).includes(phrase), "absent du corrigé");
  const lit = (k, base, n) => v.ok(`${k}. le corrigé écrit « = ${base}^${n} »`, litPuissance(c(k), base, n));
  const ligne = (k, lettre) => c(k).split("\\n").find((l) => l.startsWith(`${lettre})`)) ?? "";

  v.titre("★ Un seul geste");
  // 1. Le produit de quatre 7 est 7⁴ : la puissance recalculée par la boucle.
  v.ok("1. 7 × 7 × 7 × 7 = 2 401 = 7⁴", egal(fois(fois(Q(7), Q(7)), fois(Q(7), Q(7))), rep(Q(7), 4)));
  lit(1, 7, 4);
  lit(1, "(-3)", 3);
  dit(1, "5^3 = 5 \\times 5 \\times 5$");

  // 2.
  [[2, 3, 8], [3, 4, 81], [6, 1, 6], [1, 9, 1]].forEach(([a, n, r]) => {
    v.ok(`2. ${a}^${n} = ${r}`, egal(rep(Q(a), n), Q(r)));
    dit(2, `${a}^${n} = ${n > 1 && a > 1 ? Array(n).fill(a).join(" \\times ") + " = " : ""}${tex(rep(Q(a), n))}$`);
  });
  v.ok("2. le piège : 2 × 3 n'est pas 2³", !egal(Q(6), rep(Q(2), 3)));

  // 3.
  const m2 = Q(-2);
  dit(3, `(-2)^4 = (-2) \\times (-2) \\times (-2) \\times (-2) = ${tex(rep(m2, 4))}$`);
  dit(3, `-2^4 = -(2 \\times 2 \\times 2 \\times 2) = ${tex(fois(Q(-1), rep(Q(2), 4)))}$`);
  dit(3, `(-2)^3 = (-2) \\times (-2) \\times (-2) = ${tex(rep(m2, 3))}$`);
  const t3 = lignesTableau(b(3));
  v.ok("3. schéma : (−2)ⁿ pour n = 1 à 4", (t3["(−2) puissance n"] ?? []).every((s, i) => egal(lireCase(s), rep(m2, i + 1))) && t3["(−2) puissance n"]?.length === 4);
  v.ok("3. schéma : les signes", (t3["Signe"] ?? []).join("") === [1, 2, 3, 4].map((n) => (inf(rep(m2, n), Q(0)) ? "−" : "+")).join(""));

  // 4.
  dit(4, `10^6 = ${tex(dix(6))}$`);
  dit(4, `10^{-3} = ${tex(dix(-3))}$`);
  v.ok("4. 0,0001 = 10⁻⁴", egal(D("0,0001"), dix(-4)));
  dit(4, `$0{,}0001 = 10^{-4}$`);
  v.ok("4. 100 000 = 10⁵", egal(D(100000), dix(5)));
  dit(4, `$100\\,000 = 10^5$`);
  const t4 = lignesTableau(b(4));
  v.ok("4. schéma : chaque puissance vaut son écriture décimale", t4["Puissance"]?.length === 6 && t4["Puissance"].every((p, i) => egal(lireCase(p), lireCase(t4["Décimal"][i]))));

  // 5.
  dit(5, `= ${tex(sci("3,7", 4))}$`);
  dit(5, `= ${tex(sci(52, -3))}$`);
  dit(5, `= ${tex(sci("0,8", 2))}$`);

  // 6.
  dit(6, `$45\\,000 = ${texSci(D(45000))}$`);
  dit(6, `$0{,}0062 = ${texSci(D("0,0062"))}$`);
  dit(6, `$830 = ${texSci(D(830))}$`);

  // 7. On compte les zéros du produit écrit en entier.
  const zeros = (q) => tex(q).replace(/\\,/g, "").length - 1;
  v.ok("7. 100 000 × 1 000 a 8 zéros", zeros(fois(dix(5), dix(3))) === 8);
  lit(7, 10, zeros(fois(dix(5), dix(3))));
  lit(7, 10, zeros(div(dix(7), dix(2))));
  lit(7, 10, zeros(fois(fois(dix(2), dix(2)), dix(2))));

  // 8. On cherche l'exposant n tel que 3ⁿ vaille le produit — par la boucle.
  const exposant = (base, valeur) => {
    for (let n = 0; n < 40; n++) if (egal(rep(Q(base), n), valeur)) return n;
    return NaN;
  };
  lit(8, 3, exposant(3, fois(rep(Q(3), 2), rep(Q(3), 5))));
  lit(8, 2, exposant(2, div(rep(Q(2), 9), rep(Q(2), 4))));
  lit(8, 5, exposant(5, fois(fois(rep(Q(5), 2), rep(Q(5), 2)), rep(Q(5), 2))));

  v.titre("★★ Type devoir");
  // 9. L'échiquier simulé case par case.
  const grains = [null, Q(1)];
  for (let k = 2; k <= 11; k++) grains[k] = fois(grains[k - 1], Q(2));
  v.ok("9. case 4 : 8 = 2³", egal(grains[4], rep(Q(2), 3)));
  lit(9, 2, 3);
  dit(9, `= ${tex(grains[8])}$. Réponse : $${tex(grains[8])}$ grains`);
  v.ok("9. case 11 : 1 024 = 2¹⁰, pas 2¹¹", egal(grains[11], rep(Q(2), 10)) && !egal(grains[11], rep(Q(2), 11)));
  dit(9, `il y a $${tex(grains[11])}$ grains`);
  const t9 = lignesTableau(b(9));
  const cases9 = (t9["Case"] ?? []).map(Number);
  v.ok("9. schéma : les grains du tableau", cases9.length === 6 && cases9.every((n, i) => egal(lireCase(t9["Grains"][i]), grains[n])));
  v.ok("9. schéma : les facteurs 2 du tableau", cases9.every((n, i) => (t9["Facteurs 2"][i] === "aucun" ? 0 : Number(t9["Facteurs 2"][i])) === exposant(2, grains[n])));
  const b9 = barres(b(9));
  v.ok("9. schéma : les huit barres doublent", b9.length === 8 && b9.every(([l, val], i) => l === `Case ${i + 1}` && egal(Q(val), grains[i + 1])));

  // 10.
  dit(10, `= ${tex(rep(Q(2), 5))}$ et $5^2 = 5 \\times 5 = ${tex(rep(Q(5), 2))}$`);
  v.ok("10. 2⁵ ≠ 5² et 3⁴ ≠ 4³, mais 2⁴ = 4²", !egal(rep(Q(2), 5), rep(Q(5), 2)) && !egal(rep(Q(3), 4), rep(Q(4), 3)) && egal(rep(Q(2), 4), rep(Q(4), 2)));
  dit(10, `= ${tex(rep(Q(3), 4))}$ et $4^3 = 4 \\times 4 \\times 4 = ${tex(rep(Q(4), 3))}$`);
  dit(10, `$2^4 = ${tex(rep(Q(2), 4))}$ et $4^2 = ${tex(rep(Q(4), 2))}$`);

  // 11. En décimaux exacts, jamais en exposants.
  const ex11 = [[fois(dix(-2), dix(5)), "10^{3}", 3], [fois(dix(-4), dix(-3)), "10^{-7}", -7], [div(dix(3), dix(-2)), "10^{5}", 5]];
  ex11.forEach(([val, , n]) => {
    v.ok(`11. la valeur décimale est 10^${n}`, egal(val, dix(n)));
    lit(11, 10, n);
  });
  dit(11, `$0{,}01 \\times 100\\,000 = ${tex(fois(D("0,01"), D(100000)))}$`);
  dit(11, `$1\\,000 \\div 0{,}01 = ${tex(div(D(1000), D("0,01")))}$`);
  dit(11, `10^{3+2} = 10^5$`, "la ligne de la réponse du c) : 10^{3+2} = 10^5");

  // 12.
  dit(12, `$${texSci(D(150000000))}$ km`);
  dit(12, `$${texSci(D("0,000007"))}$ m`);
  dit(12, `$${texSci(D(8000000000))}$ êtres`);
  dit(12, `Réponse : $${texSci(fois(D("0,52"), dix(5)))}$.`);

  // 13.
  const A = fois(sci(3, 4), sci(2, 5));
  const B = fois(sci(6, 7), sci(5, -3));
  const C = div(sci(8, 6), sci(2, 2));
  dit(13, `(10^4 \\times 10^5) = ${texSci(A)}$`);
  dit(13, `$B = ${texSci(B)}$`);
  v.ok("13. 30 × 10⁴ vaut bien B", egal(fois(Q(30), dix(4)), B));
  dit(13, `\\dfrac{10^6}{10^2} = ${texSci(C)}$`);

  // 14. On trie les valeurs exactes.
  const aRanger = [["3{,}2 \\times 10^{-4}", sci("3,2", -4)], ["5 \\times 10^{-5}", sci(5, -5)], ["1{,}1 \\times 10^{-3}", sci("1,1", -3)], ["0{,}0009", D("0,0009")]];
  const ordre = [...aRanger].sort((x, y) => (inf(x[1], y[1]) ? -1 : 1)).map((x) => x[0]).join(" < ");
  dit(14, `Réponse : $${ordre}$`, `l'ordre recalculé : ${ordre}`);
  dit(14, `$0{,}0009 = ${texSci(D("0,0009"))}$`);
  const t14 = lignesTableau(b(14));
  v.ok("14. schéma : écriture et décimal concordent", t14["Écriture"]?.length === 4 && t14["Écriture"].every((e, i) => egal(lireCase(e), D(t14["Décimal"][i]))));
  v.ok("14. schéma : les colonnes sont dans l'ordre croissant", (t14["Décimal"] ?? []).map(D).every((x, i, t) => i === 0 || inf(t[i - 1], x)));

  // 15.
  const A15 = div(fois(rep(Q(2), 3), rep(Q(2), 4)), rep(Q(2), 5));
  v.ok("15. A = 8 × 16 ÷ 32 = 4 = 2²", egal(A15, Q(4)) && egal(A15, rep(Q(2), 2)));
  dit(15, `$A = 2^2 = ${tex(A15)}$`);
  dit(15, `= \\dfrac{128}{32} = ${tex(A15)}$`);
  const B15 = fois(rep(rep(Q(3), 2), 2), Q(3));
  v.ok("15. B = 9 × 9 × 3 = 243 = 3⁵", egal(B15, Q(243)) && egal(B15, rep(Q(3), 5)));
  dit(15, `$B = 3^5 = ${tex(B15)}$`);

  // 16.
  const vrai = [
    egal(plus(rep(Q(2), 3), rep(Q(2), 4)), rep(Q(2), 7)),
    egal(fois(rep(Q(2), 3), rep(Q(3), 3)), rep(Q(6), 3)),
    egal(plus(dix(2), dix(3)), dix(5)),
    egal(rep(Q(-1), 10), Q(1)),
  ];
  v.ok("16. faux, vrai, faux, vrai", JSON.stringify(vrai) === "[false,true,false,true]");
  ["a", "b", "c", "d"].forEach((l, i) => {
    const s = ligne(16, l);
    v.ok(`16. ${l}) ${vrai[i] ? "VRAI" : "FAUX"}`, s.includes(vrai[i] ? "VRAI" : "FAUX") && !s.includes(vrai[i] ? "FAUX" : "VRAI"), s.slice(0, 60));
  });
  dit(16, `= ${tex(plus(rep(Q(2), 3), rep(Q(2), 4)))}$, alors que $2^7 = ${tex(rep(Q(2), 7))}$`);
  dit(16, `= ${tex(fois(rep(Q(2), 3), rep(Q(3), 3)))}$ et $6^3 = 6 \\times 6 \\times 6 = ${tex(rep(Q(6), 3))}$`);
  dit(16, `= ${tex(plus(dix(2), dix(3)))}$, alors que $10^5 = ${tex(dix(5))}$`);

  v.titre("★★★ Problèmes");
  // 17.
  const vitesse = sci(3, 5);
  const tTerre = div(sci("1,5", 8), vitesse);
  const tNeptune = div(sci("4,5", 9), vitesse);
  dit(17, `= ${tex(tTerre)}$ s`);
  v.ok("17. 500 s = 8 min 20 s", egal(tTerre, Q(8 * 60 + 20)));
  dit(17, "Réponse : $8$ min $20$ s");
  dit(17, `= ${texSci(tNeptune)} = ${tex(tNeptune)}$ s`);
  v.ok("17. 15 000 s = 4 h 10 min", egal(tNeptune, Q(4 * 3600 + 10 * 60)));
  dit(17, "Réponse : $4$ h $10$ min");
  const rapport = div(sci("4,5", 9), sci("1,5", 8));
  dit(17, `= ${tex(rapport)}$. Réponse`);
  v.ok("17. contrôle : 30 × 500 = 15 000", egal(fois(rapport, tTerre), tNeptune));
  const b17 = barres(b(17));
  v.ok("17. schéma : les deux barres sont les deux durées", b17.length === 2 && egal(Q(b17[0][1]), tTerre) && egal(Q(b17[1][1]), tNeptune));

  // 18.
  const photos = div(dix(12), sci(4, 6));
  dit(18, `Réponse : $${texSci(photos)}$ photos, soit $${tex(photos)}$ photos`);
  const jours = div(photos, Q(25));
  dit(18, `= ${tex(jours)}$ jours`);
  const ans = versNombre(div(jours, Q(365)));
  dit(18, `\\approx ${String(Math.round(ans * 10) / 10).replace(".", "{,}")}$`);
  dit(18, `environ $${Math.floor(ans)}$ ans`);
  dit(18, `un Go contient $${tex(div(dix(9), dix(6)))}$ Mo`);
  const t18 = lignesTableau(b(18));
  const clair = { mille: dix(3), "un million": dix(6), "un milliard": dix(9), "mille milliards": dix(12) };
  v.ok("18. schéma : 10³, 10⁶, 10⁹, 10¹²", (t18["Octets"] ?? []).map((s) => tex(lireCase(s))).join("|") === [3, 6, 9, 12].map((n) => tex(dix(n))).join("|"));
  v.ok("18. schéma : les mots disent les mêmes nombres", (t18["En clair"] ?? []).every((m, i) => clair[m] && egal(clair[m], lireCase(t18["Octets"][i]))));
  v.ok("18. schéma : le Mo est 10⁶ comme dans l'énoncé", (t18["Préfixe"] ?? [])[1]?.includes("Mo") && egal(lireCase(t18["Octets"][1]), dix(6)));

  // 19.
  const parHumain = div(sci(2, 16), sci(8, 9));
  dit(19, `Réponse : environ $${texSci(parHumain)}$ fourmis par être humain, soit $${tex(parHumain)}$`);
  const longueur = fois(sci(2, 16), sci(5, -3));
  v.ok("19. la file mesure 10¹⁴ m", egal(longueur, dix(14)));
  lit(19, 10, 14);
  dit(19, `10 \\times 10^{13} = 10^{14}$ m`);
  const km = div(longueur, dix(3));
  dit(19, `= 10^{11}$ km`);
  v.ok("19. 10¹¹ km", egal(km, dix(11)));
  const tours = div(km, sci(4, 4));
  dit(19, `= ${texSci(tours)}$. Réponse : la file ferait environ deux millions et demi`);
  v.ok("19. deux millions et demi de tours", egal(tours, Q(2500000)));

  // 20. Le pliage simulé, pli par pli.
  const couches = [Q(1)];
  for (let k = 1; k <= 42; k++) couches[k] = fois(couches[k - 1], Q(2));
  dit(20, `$3$ pliages : $2 \\times 2 \\times 2 = ${tex(couches[3])}$`);
  dit(20, `$2^{10} = ${tex(couches[10])}$ couches`);
  const ep10 = fois(couches[10], dix(-4));
  dit(20, `= ${tex(ep10)}$ m`);
  v.ok("20. 2⁴² ≈ 4,4 × 10¹²", Math.round(versNombre(couches[42]) / 1e11) === 44);
  const ep42 = div(fois(sci("4,4", 12), dix(-4)), dix(3));
  dit(20, `$${texSci(ep42)}$ km`);
  v.ok("20. la pile dépasse la Lune (et la vraie 2⁴² aussi)", inf(sci("3,84", 5), ep42) && inf(sci("3,84", 5), div(fois(couches[42], dix(-4)), dix(3))));
  v.ok("20. avec 41 pliages, on n'y serait pas", inf(div(fois(couches[41], dix(-4)), dix(3)), sci("3,84", 5)));
  const t20 = lignesTableau(b(20));
  const plis = (t20["Pliages"] ?? []).map(Number);
  v.ok("20. schéma : les couches", plis.length === 4 && plis.every((n, i) => egal(lireCase(t20["Couches"][i]), couches[n])));
  const enMm = (s) => (s.endsWith(" cm") ? fois(D(s.slice(0, -3)), Q(10)) : D(s.replace(" mm", "")));
  v.ok("20. schéma : les épaisseurs (0,1 mm par couche)", plis.every((n, i) => egal(enMm(t20["Épaisseur"][i]), fois(couches[n], D("0,1")))));
}

lancer({
  nom: "PUISSANCES ET ÉCRITURE SCIENTIFIQUE · 3e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-3e-puissances.tsx",
  notionId: "entier_puissance",
  classe: "3e",
  verifier,
  casses: [
    ["ex. 2 : le piège appliqué, 2³ = 6", "a) $2^3 = 2 \\\\times 2 \\\\times 2 = 8$", "a) $2^3 = 2 \\\\times 2 \\\\times 2 = 6$"],
    ["ex. 3 : −2⁴ = 16", "(2 \\\\times 2 \\\\times 2 \\\\times 2) = -16$", "(2 \\\\times 2 \\\\times 2 \\\\times 2) = 16$"],
    ["ex. 4 : 10⁻³ = 0,0001", "10^{-3} = 0{,}001$", "10^{-3} = 0{,}0001$"],
    ["ex. 6 : 45 000 = 4,5 × 10³", "$45\\\\,000 = 4{,}5 \\\\times 10^{4}$", "$45\\\\,000 = 4{,}5 \\\\times 10^{3}$"],
    ["ex. 8 : (5²)³ = 5⁵", "= 5^{2 \\\\times 3} = 5^6$", "= 5^{2 \\\\times 3} = 5^5$"],
    ["ex. 11 : 3 − (−2) = 1", "10^{3+2} = 10^5$", "10^{3+2} = 10^1$"],
    ["ex. 12 : le piège du d), exposant 6", "Réponse : $5{,}2 \\\\times 10^{4}$.", "Réponse : $5{,}2 \\\\times 10^{6}$."],
    ["ex. 13 : B laissé à 3 × 10⁴", "donc $B = 3 \\\\times 10^{5}$", "donc $B = 3 \\\\times 10^{4}$"],
    ["ex. 14 : l'ordre inversé au milieu", "10^{-5} < 3{,}2 \\\\times 10^{-4} < 0{,}0009 <", "10^{-5} < 0{,}0009 < 3{,}2 \\\\times 10^{-4} <"],
    ["ex. 16 : b) déclaré faux", "216$. VRAI", "216$. FAUX"],
    ["ex. 17 : 600 s au lieu de 500", "= 500$ s", "= 600$ s"],
    ["ex. 19 : le piège du b), 10¹³", "= 10 \\\\times 10^{13} = 10^{14}$ m", "= 10 \\\\times 10^{13} = 10^{13}$ m"],
    ["ex. 9 schéma : une barre fausse", "{ label: \"Case 6\", value: 32 }", "{ label: \"Case 6\", value: 30 }"],
    ["ex. 20 schéma : 1 000 couches", "[\"Couches\", \"2\", \"4\", \"8\", \"1 024\"]", "[\"Couches\", \"2\", \"4\", \"8\", \"1 000\"]"],
    ["ex. 3 schéma : un signe faux", "[\"Signe\", \"−\", \"+\", \"−\", \"+\"]", "[\"Signe\", \"−\", \"+\", \"+\", \"+\"]"],
    ["ex. 18 schéma : le giga à 10⁸", "\"10⁶\", \"10⁹\", \"10¹²\"", "\"10⁶\", \"10⁸\", \"10¹²\""],
    ["ex. 1 : un dollar perdu", "Réponse : $7 \\\\times 7", "Réponse : 7 \\\\times 7"],
    ["une micro inconnue du coach", "micros: [\"entier_puissance_comprendre\"],", "micros: [\"entier_puissance_inconnue\"],"],
  ],
});
