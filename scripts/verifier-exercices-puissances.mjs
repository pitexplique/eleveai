// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Les puissances » de
// seconde (lib/fiches-exercices/maths-seconde-puissances.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé additionne, soustrait et multiplie des
// EXPOSANTS ; ici on ne touche jamais un exposant. Chaque expression est
// évaluée en fractions exactes, facteur par facteur (`puissance()` du module
// commun), puis comparée à la puissance que le corrigé annonce — et celle-ci
// doit se LIRE dans le corrigé (« = 3^{-3} »). Une expression en x est évaluée
// en trois valeurs, dont une fraction négative.
//
//   node scripts/verifier-exercices-puissances.mjs
//
// Sort en code 1 à la première divergence, ou si un contrôle négatif passe
// inaperçu. Le socle (structure, dollars, micros, casses) : verifier-exercices-commun.mjs.

import {
  Q, D, fois, div, plus, egal, inf, puissance as P, sci, tex, texSci, lireFeuille, litPuissance, lancer,
} from "./verifier-exercices-commun.mjs";

const X = [Q(2), Q(3), Q(-3, 2)];

function verifier(source, v) {
  const { corrections } = lireFeuille(source);
  const c = (k) => corrections[k - 1] ?? "";
  const dit = (k, phrase, quoi = phrase) => v.ok(`${k}. « ${quoi} »`, c(k).includes(phrase), "absent du corrigé");
  /** La valeur exacte de l'expression est-elle base^n, et le corrigé écrit-il « = base^n » ? */
  const vaut = (k, quoi, valeur, base, n) =>
    v.ok(`${k}. ${quoi} = ${base}^${n}`, egal(valeur, P(Q(base), n)) && litPuissance(c(k), base, n), `lu : ${litPuissance(c(k), base, n)}`);
  /** Même chose pour une expression en x, en trois valeurs de x. */
  const vautX = (k, quoi, f, n) =>
    v.ok(`${k}. ${quoi} = x^${n}`, X.every((x) => egal(f(x), P(x, n))) && litPuissance(c(k), "x", n), `lu : ${litPuissance(c(k), "x", n)}`);
  const dix = (e) => P(Q(10), e);

  v.titre("★ Un seul geste");
  v.ok("1. 2⁵ = 32, (−1)⁷ = −1, 4⁰ = 1, (−5)² = 25, −5² = −25", egal(P(Q(2), 5), Q(32)) && egal(P(Q(-1), 7), Q(-1)) && egal(P(Q(4), 0), Q(1)) && egal(P(Q(-5), 2), Q(25)) && egal(fois(Q(-1), P(Q(5), 2)), Q(-25)));
  dit(1, `= ${tex(P(Q(2), 5))}$`);
  dit(1, `(-1)^7 = ${tex(P(Q(-1), 7))}$`);
  dit(1, `4^0 = ${tex(P(Q(4), 0))}$`);
  dit(1, `= ${tex(P(Q(-5), 2))}$`);
  dit(1, `= ${tex(fois(Q(-1), P(Q(5), 2)))}$`);

  vaut(2, "3⁴ × 3⁵", fois(P(Q(3), 4), P(Q(3), 5)), 3, 9);
  vautX(2, "x² × x⁷", (x) => fois(P(x, 2), P(x, 7)), 9);
  vaut(2, "10⁻³ × 10⁸", fois(dix(-3), dix(8)), 10, 5);

  vaut(3, "5⁸ ÷ 5³", div(P(Q(5), 8), P(Q(5), 3)), 5, 5);
  vaut(3, "10² ÷ 10⁶", div(dix(2), dix(6)), 10, -4);
  vaut(3, "7⁻² ÷ 7³", div(P(Q(7), -2), P(Q(7), 3)), 7, -5);

  vaut(4, "(2³)⁵", P(P(Q(2), 3), 5), 2, 15);
  vaut(4, "(10⁻²)³", P(dix(-2), 3), 10, -6);
  vaut(4, "2³ × 2⁵", fois(P(Q(2), 3), P(Q(2), 5)), 2, 8);
  v.ok("4. et ce n'est pas le même nombre que 2¹⁵", !egal(P(Q(2), 8), P(Q(2), 15)));

  v.ok("5. 2⁻² et 4⁻¹ sont égaux", egal(P(Q(2), -2), P(Q(4), -1)));
  dit(5, `= ${tex(dix(-3))}$`);
  v.ok(`5. « = ${tex(P(Q(2), -2))}$ » deux fois (le b et le c)`, c(5).split(`= ${tex(P(Q(2), -2))}$`).length - 1 === 2);

  dit(6, `= ${texSci(D(3070))}$`);
  dit(6, `= ${texSci(D("0,000008"))}$`);
  dit(6, `= ${texSci(fois(D(450), dix(3)))}$`);

  const ecritures = [["0,5", 3], ["5", 2], ["12", -4], ["1,2", -3]];
  const estSci = ecritures.map(([m]) => !inf(D(m), Q(1)) && inf(D(m), Q(10)));
  v.ok("7. seules 5 × 10² et 1,2 × 10⁻³ sont scientifiques", JSON.stringify(estSci) === "[false,true,false,true]");
  v.ok("7. et les deux fausses valent les deux justes", egal(sci("0,5", 3), sci(5, 2)) && egal(sci(12, -4), sci("1,2", -3)));
  dit(7, `a) $${texSci(sci(5, 2))}$ et $${texSci(sci("1,2", -3))}$ sont`);

  vaut(8, "1 ÷ 7⁴", div(Q(1), P(Q(7), 4)), 7, -4);
  vaut(8, "1 ÷ 1 000 000", Q(1, 1000000), 10, -6);
  vaut(8, "1 ÷ 8", Q(1, 8), 2, -3);

  v.titre("★★ Type devoir");
  const hautC = fois(P(Q(3), 5), P(Q(3), -2));
  const basC = P(P(Q(3), 2), 3);
  vaut(9, "le haut 3⁵ × 3⁻²", hautC, 3, 3);
  vaut(9, "le bas (3²)³", basC, 3, 6);
  vaut(9, "C", div(hautC, basC), 3, -3);

  const hautD = fois(P(P(Q(5), -1), 4), P(Q(5), 7));
  const basD = fois(P(Q(5), 2), P(Q(5), -3));
  vaut(10, "(5⁻¹)⁴", P(P(Q(5), -1), 4), 5, -4);
  vaut(10, "le haut", hautD, 5, 3);
  vaut(10, "le bas", basD, 5, -1);
  vaut(10, "D", div(hautD, basD), 5, 4);
  // ⛔ MESURÉ PAR UN CONTRÔLE NÉGATIF (21/09) : « = 5^4 » se lit AUSSI dans la
  // ligne de vérification (« D = 5^3 × 5 = 5^4 »). Casser la réponse laissait le
  // script vert. La réponse se vérifie donc par sa PHRASE, calcul compris.
  dit(10, `= 5^{3-(-1)} = 5^{3+1} = 5^${4}$`, "la ligne de la réponse : 5^{3-(-1)} = 5^{3+1} = 5^4");
  v.ok("10. et 3 − (−1) = 4", 3 - -1 === 4);

  vautX(11, "(x³)²", (x) => P(P(x, 3), 2), 6);
  vautX(11, "le haut", (x) => fois(P(P(x, 3), 2), P(x, -4)), 2);
  vautX(11, "E", (x) => div(fois(P(P(x, 3), 2), P(x, -4)), P(x, -5)), 7);
  const verif11 = div(fois(P(Q(2), 6), P(Q(2), -4)), P(Q(2), -5));
  v.ok("11. la vérification en x = 2 donne 128 = 2⁷", egal(verif11, Q(128)) && egal(Q(128), P(Q(2), 7)));
  dit(11, `= ${tex(verif11)}$`);

  vaut(12, "8²", P(Q(8), 2), 2, 6);
  vaut(12, "4⁻³", P(Q(4), -3), 2, -6);
  vaut(12, "F", fois(fois(P(Q(8), 2), P(Q(4), -3)), P(Q(2), 5)), 2, 5);

  const G = div(fois(sci(6, 5), sci(4, -2)), sci(8, -4));
  dit(13, `$G = ${texSci(G)}$`);
  const H = fois(sci("0,25", -3), sci(40, 6));
  dit(14, `= ${texSci(H)}$`);
  v.ok("14. et H vaut 10 000", egal(H, Q(10000)));

  vaut(15, "2³ × 2⁴", fois(P(Q(2), 3), P(Q(2), 4)), 2, 7);
  const somme = plus(P(Q(3), 2), P(Q(3), 2));
  v.ok("15. 3² + 3² = 18 et 3⁴ = 81 : l'égalité est fausse", egal(somme, Q(18)) && egal(P(Q(3), 4), Q(81)) && !egal(somme, P(Q(3), 4)));
  dit(15, `= ${tex(somme)}$`);
  dit(15, `3^4 = ${tex(P(Q(3), 4))}$`);
  vaut(15, "(10²)³", P(P(Q(10), 2), 3), 10, 6);

  const aRanger = [["2{,}5 \\times 10^{-3}", sci("2,5", -3)], ["3 \\times 10^{-4}", sci(3, -4)], ["0{,}01", D("0,01")], ["9 \\times 10^{-4}", sci(9, -4)]];
  const ordre = [...aRanger].sort((a, b) => (inf(a[1], b[1]) ? -1 : 1)).map((x) => x[0]).join(" < ");
  dit(16, ordre, `l'ordre recalculé : ${ordre}`);

  v.titre("★★★ Problèmes");
  const t = div(sci("1,5", 8), sci(3, 5));
  dit(17, `= ${tex(t)}$ s`);
  v.ok("17. 500 s = 8 min 20 s", egal(t, Q(8 * 60 + 20)));
  dit(17, "$8$ min $20$ s");
  dit(17, `= ${tex(div(sci("3,84", 5), sci(3, 5)))}$ s`);

  const volume = fois(Q(5), dix(6));
  const globules = fois(volume, sci(5, 6));
  const longueur = fois(globules, sci(7, -6));
  const km = div(longueur, dix(3));
  const piege18 = fois(Q(5), sci(5, 6));
  dit(18, `$${texSci(volume)}$ mm³`);
  dit(18, `$${texSci(globules)}$ globules`);
  dit(18, `$${texSci(longueur)}$ m`);
  dit(18, `$${texSci(km)}$ km`);
  dit(18, `$${tex(km)}$ km`);
  dit(18, `= ${tex(div(km, sci(4, 4)))}$`);
  dit(18, `= ${texSci(piege18)}$`);
  v.ok("18. le piège est un million de fois trop petit", egal(div(globules, piege18), dix(6)));

  v.ok("19. 1 h = 3 divisions, 2 h = 6, 10 h = 30", 60 / 20 === 3 && 120 / 20 === 6 && 10 * 3 === 30);
  dit(19, `2^3 = ${tex(P(Q(2), 3))}$ bactéries`);
  dit(19, `2^6 = ${tex(P(Q(2), 6))}$ bactéries`);
  dit(19, "$2^{30}$ bactéries");
  v.ok("19. (2¹⁰)³ = 2³⁰, et 2³⁰ est entre 10⁹ et 1,1 × 10⁹", egal(P(P(Q(2), 10), 3), P(Q(2), 30)) && !inf(P(Q(2), 30), dix(9)) && inf(P(Q(2), 30), sci("1,1", 9)));
  dit(19, `$${tex(P(Q(2), 30))}$`);
  dit(19, "= 10^{9}$");

  const vrai = [
    egal(plus(P(Q(2), 10), P(Q(2), 10)), P(Q(2), 11)),
    egal(fois(P(Q(2), 10), P(Q(2), 10)), P(Q(4), 10)),
    egal(fois(dix(-2), dix(-3)), dix(6)),
    egal(P(Q(-1), 2025), Q(1)),
  ];
  v.ok("20. vrai, vrai, faux, faux", JSON.stringify(vrai) === "[true,true,false,false]");
  ["a", "b", "c", "d"].forEach((l, i) => dit(20, `${l}) ${vrai[i] ? "VRAI" : "FAUX"}.`));
  vaut(20, "10⁻² × 10⁻³", fois(dix(-2), dix(-3)), 10, -5);
  dit(20, `= ${tex(P(Q(-1), 2025))}$`);
}

lancer({
  nom: "LES PUISSANCES · seconde · 20 exercices",
  fichier: "lib/fiches-exercices/maths-seconde-puissances.tsx",
  notionId: "puissances_2de",
  verifier,
  casses: [
    ["ex. 9 : C devient 3⁻²", "= 3^{3-6} = 3^{-3}$", "= 3^{3-6} = 3^{-2}$"],
    ["ex. 10 : le piège appliqué, 3 − (−1) = 2", "= 5^{3+1} = 5^4$", "= 5^{3+1} = 5^2$"],
    ["ex. 5 : 2⁻² = 0,5", "= \\\\dfrac{1}{4} = 0{,}25$.\\nc)", "= \\\\dfrac{1}{4} = 0{,}5$.\\nc)"],
    ["ex. 7 : la mauvaise écriture déclarée scientifique", "a) $5 \\\\times 10^{2}$ et", "a) $0{,}5 \\\\times 10^{3}$ et"],
    ["ex. 17 : 600 s au lieu de 500", "= 500$ s", "= 600$ s"],
    ["ex. 18 : un exposant de trop peu", "2{,}5 \\\\times 10^{13}$ globules", "2{,}5 \\\\times 10^{12}$ globules"],
    ["ex. 20 : (−1)²⁰²⁵ déclaré vrai", "d) FAUX.", "d) VRAI."],
    ["ex. 1 : un dollar perdu", "a) $2^5 = 2", "a) 2^5 = 2"],
    // ⚠️ Retirer une micro ne casse rien : chacune est citée par deux exercices
    // au moins. On en REMPLACE donc une par un identifiant que le coach ignore.
    ["une micro inconnue du coach", "micros: [\"puiss_calcul\"],", "micros: [\"puiss_inconnue\"],"],
    ["un $ dans un canvas", "values: [\"3⁵ × 3⁻² = 3³\"", "values: [\"$3^5$\""],
  ],
});
