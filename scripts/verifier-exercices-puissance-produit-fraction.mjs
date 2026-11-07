// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Puissance d'un produit ou
// d'une fraction » de seconde (lib/fiches-exercices/maths-seconde-puissance-produit-fraction.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé répartit l'exposant ou regroupe les bases. Ici, on
// ne regroupe jamais : chaque expression de l'énoncé est évaluée telle quelle, en
// fractions exactes, facteur par facteur, et le résultat doit se LIRE dans le corrigé.
//
//   node scripts/verifier-exercices-puissance-produit-fraction.mjs

import { Q, D, fois, div, plus, moins, egal, inf, puissance as P, tex, lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

/** `\dfrac{1}{2\,500}`, `-\dfrac{8}{27}` ou l'entier, écrits comme dans le corrigé. */
const texF = (a) => {
  if (a.d === 1n) return tex(a);
  const neg = a.n < 0n;
  return `${neg ? "-" : ""}\\dfrac{${tex(Q(neg ? -a.n : a.n))}}{${tex(Q(a.d))}}`;
};
const q = (x) => (typeof x === "number" ? Q(x) : x);
const pow = (a, n) => P(q(a), n);
const fr = (a, b) => Q(a, b);

function verifier(source, v) {
  const { corrections } = lireFeuille(source);
  const c = (k) => corrections[k - 1] ?? "";
  /** La valeur recalculée est-elle écrite dans le corrigé, juste après un « = » ? */
  const vaut = (k, quoi, valeur) => {
    const t = `= ${texF(valeur)}`;
    v.ok(`${k}. ${quoi} ${t}`, c(k).includes(`${t}$`) || c(k).includes(`${t}.`), "absent du corrigé");
  };
  const dit = (k, phrase) => v.ok(`${k}. « ${phrase} »`, c(k).includes(phrase), "absent du corrigé");

  v.titre("★ Un seul geste");
  v.ok("1. (3 × 5)² = 3² × 5²", egal(pow(15, 2), fois(pow(3, 2), pow(5, 2))));
  v.ok("1. (2 × 7)³ = 2³ × 7³", egal(pow(14, 3), fois(pow(2, 3), pow(7, 3))));
  v.ok("1. (4 × 10)⁵ = 4⁵ × 10⁵", egal(pow(40, 5), fois(pow(4, 5), pow(10, 5))));
  dit(1, "= 3^2 \\times 5^2$");
  dit(1, "= 2^3 \\times 7^3$");
  dit(1, "= 4^5 \\times 10^5$");
  v.ok("2. 2³ × 5³ = 10³", egal(fois(pow(2, 3), pow(5, 3)), pow(10, 3)));
  v.ok("2. 3⁴ × 4⁴ = 12⁴", egal(fois(pow(3, 4), pow(4, 4)), pow(12, 4)));
  v.ok("2. 6² × 5² = 30²", egal(fois(pow(6, 2), pow(5, 2)), pow(30, 2)));
  v.ok("2. le piège 10⁶ est bien faux", !egal(fois(pow(2, 3), pow(5, 3)), pow(10, 6)));
  dit(2, "= 10^3$");
  dit(2, "= 12^4$");
  dit(2, "= 30^2$");
  vaut(3, "2⁴ × 5⁴", fois(pow(2, 4), pow(5, 4)));
  vaut(3, "4³ × 25³", fois(pow(4, 3), pow(25, 3)));
  vaut(3, "5² × 20²", fois(pow(5, 2), pow(20, 2)));
  // Ex. 4 et 11 : une expression en lettre, évaluée en plusieurs valeurs, sans développer.
  const X = [Q(2), Q(3), Q(-3, 2)];
  const egalEnX = (f, g) => X.every((x) => egal(f(x), g(x)));
  v.ok("4. (3x)² = 9x²", egalEnX((x) => P(fois(Q(3), x), 2), (x) => fois(Q(9), P(x, 2))));
  v.ok("4. (2x)³ = 8x³", egalEnX((x) => P(fois(Q(2), x), 3), (x) => fois(Q(8), P(x, 3))));
  v.ok("4. (5a)² = 25a²", egalEnX((x) => P(fois(Q(5), x), 2), (x) => fois(Q(25), P(x, 2))));
  v.ok("4. (10t)³ = 1 000t³", egalEnX((x) => P(fois(Q(10), x), 3), (x) => fois(Q(1000), P(x, 3))));
  ["= 9x^2$", "= 8x^3$", "= 25a^2$", "= 1\\,000t^3$"].forEach((p) => dit(4, p));
  vaut(5, "(2/3)³", P(fr(2, 3), 3));
  vaut(5, "(1/2)⁴", P(fr(1, 2), 4));
  vaut(5, "(3/5)²", P(fr(3, 5), 2));
  vaut(5, "(5/2)²", P(fr(5, 2), 2));
  v.ok("6. 5³/2³ = (5/2)³", egal(div(pow(5, 3), pow(2, 3)), P(fr(5, 2), 3)));
  v.ok("6. 7²/3² = (7/3)²", egal(div(pow(7, 2), pow(3, 2)), P(fr(7, 3), 2)));
  v.ok("6. 9⁴/10⁴ = (9/10)⁴", egal(div(pow(9, 4), pow(10, 4)), P(fr(9, 10), 4)));
  dit(6, "\\left(\\dfrac{5}{2}\\right)^3$");
  dit(6, "\\left(\\dfrac{7}{3}\\right)^2$");
  dit(6, "\\left(\\dfrac{9}{10}\\right)^4$");
  vaut(7, "15²/5²", div(pow(15, 2), pow(5, 2)));
  vaut(7, "12³/4³", div(pow(12, 3), pow(4, 3)));
  vaut(7, "20⁴/10⁴", div(pow(20, 4), pow(10, 4)));
  v.ok("8. 0,5² = 0,25", egal(P(D("0,5"), 2), D("0,25")));
  v.ok("8. 0,2³ = 0,008", egal(P(D("0,2"), 3), D("0,008")));
  v.ok("8. 1,5² = 2,25", egal(P(D("1,5"), 2), D("2,25")));
  v.ok("8. 0,1⁴ = 0,0001", egal(P(D("0,1"), 4), D("0,0001")));
  ["= 0{,}25$", "= 0{,}008$", "= 2{,}25$", "= 0{,}000\\,1$"].forEach((p) => dit(8, p));

  v.titre("★★ Type devoir");
  const inv = (a, n) => div(Q(1), P(a, n)); // a⁻ⁿ = 1/aⁿ, sans retourner la fraction
  vaut(9, "(2/3)⁻¹", inv(fr(2, 3), 1));
  vaut(9, "(2/3)⁻²", inv(fr(2, 3), 2));
  vaut(9, "(1/5)⁻²", inv(fr(1, 5), 2));
  vaut(9, "(3/4)⁻³", inv(fr(3, 4), 3));
  vaut(10, "(−2/3)²", P(fr(-2, 3), 2));
  vaut(10, "(−2/3)³", P(fr(-2, 3), 3));
  vaut(10, "(−1/2)⁴", P(fr(-1, 2), 4));
  vaut(10, "(−1/2)⁵", P(fr(-1, 2), 5));
  v.ok("11. (3x²)² = 9x⁴", egalEnX((x) => P(fois(Q(3), P(x, 2)), 2), (x) => fois(Q(9), P(x, 4))));
  v.ok("11. (2x³)³ = 8x⁹", egalEnX((x) => P(fois(Q(2), P(x, 3)), 3), (x) => fois(Q(8), P(x, 9))));
  v.ok("11. (x/2)³ = x³/8", egalEnX((x) => P(div(x, Q(2)), 3), (x) => div(P(x, 3), Q(8))));
  v.ok("11. (3/x)² = 9/x²", egalEnX((x) => P(div(Q(3), x), 2), (x) => div(Q(9), P(x, 2))));
  ["= 9x^4$", "= 8x^9$", "= \\dfrac{x^3}{8}$", "= \\dfrac{9}{x^2}$"].forEach((p) => dit(11, p));
  vaut(12, "A", div(fois(pow(6, 4), pow(5, 4)), pow(10, 4)));
  vaut(12, "B", div(pow(14, 3), fois(pow(2, 3), pow(7, 3))));
  vaut(12, "C", fois(P(fr(2, 3), 5), P(fr(3, 2), 5)));
  vaut(12, "D", fois(P(fr(3, 4), 2), pow(4, 2)));
  vaut(13, "E", fois(P(fr(2, 3), 3), P(fr(9, 4), 3)));
  vaut(13, "F", div(P(fr(5, 6), 2), P(fr(5, 3), 2)));
  vaut(14, "(2 + 3)²", pow(5, 2));
  v.ok("14. 2² + 3² = 13, et ce n'est pas (2 + 3)²", egal(plus(pow(2, 2), pow(3, 2)), Q(13)) && !egal(pow(5, 2), Q(13)));
  vaut(14, "(2/5)³", P(fr(2, 5), 3));
  vaut(14, "2³ × 5³", fois(pow(2, 3), pow(5, 3)));
  v.ok("15. 12⁵ = 2¹⁰ × 3⁵", egal(pow(12, 5), fois(pow(2, 10), pow(3, 5))));
  v.ok("15. 18³ = 2³ × 3⁶", egal(pow(18, 3), fois(pow(2, 3), pow(3, 6))));
  v.ok("15. (8/9)² = 2⁶/3⁴", egal(P(fr(8, 9), 2), div(pow(2, 6), pow(3, 4))));
  ["= 2^{10} \\times 3^5$", "= 2^3 \\times 3^6$", "= \\dfrac{2^6}{3^4}$"].forEach((p) => dit(15, p));
  vaut(16, "2 réductions", P(fr(3, 4), 2));
  vaut(16, "3 réductions", P(fr(3, 4), 3));
  v.ok("16. 27/64 < 9/16 < 3/4", inf(fr(27, 64), fr(9, 16)) && inf(fr(9, 16), fr(3, 4)));
  dit(16, "\\dfrac{27}{64} < \\dfrac{9}{16} < \\dfrac{3}{4}$");
  vaut(16, "aire après 2 réductions", P(P(fr(3, 4), 2), 2));
  v.ok("16. moins du tiers", inf(P(P(fr(3, 4), 2), 2), fr(1, 3)));

  v.titre("★★★ Problèmes");
  vaut(17, "aires", P(fr(1, 50), 2));
  vaut(17, "volumes", P(fr(1, 50), 3));
  v.ok("17. façade = 0,16 m²", egal(fois(Q(400), P(fr(1, 50), 2)), D("0,16")));
  v.ok("17. volume = 0,08 m³", egal(fois(Q(10000), P(fr(1, 50), 3)), D("0,08")));
  dit(17, "\\dfrac{1}{2\\,500} = 0{,}16$");
  dit(17, "\\dfrac{1}{125\\,000} = 0{,}08$");
  v.ok("17. 0,08 m³ = 80 litres", egal(fois(fois(Q(10000), P(fr(1, 50), 3)), Q(1000)), Q(80)));
  dit(17, "soit $80$ litres");
  vaut(18, "3 réussis", P(fr(4, 5), 3));
  vaut(18, "3 manqués", P(moins(Q(1), fr(4, 5)), 3));
  dit(18, "soit $0{,}512$");
  dit(18, "soit $0{,}008$");
  v.ok("18. 0,512 et 0,008", egal(P(fr(4, 5), 3), D("0,512")) && egal(P(fr(1, 5), 3), D("0,008")));
  v.ok("18. 4 lancers : le premier sous 1/2", !inf(P(fr(4, 5), 3), fr(1, 2)) && inf(P(fr(4, 5), 4), fr(1, 2)));
  dit(18, "= 0{,}409\\,6$");
  v.ok("18. 256/625 = 0,4096", egal(P(fr(4, 5), 4), D("0,4096")));
  vaut(19, "15 h", P(fr(1, 2), 15 / 5));
  vaut(19, "mg après 15 h", fois(Q(80), P(fr(1, 2), 3)));
  vaut(19, "20 h", P(fr(1, 2), 20 / 5));
  vaut(19, "17 h à 22 h", fois(Q(80), P(fr(1, 2), (22 - 17) / 5)));
  vaut(20, "aires", P(fr(3, 11), 2));
  vaut(20, "volumes", P(fr(3, 11), 3));
  const lunes = div(Q(1), P(fr(3, 11), 3));
  v.ok("20. 1 331 ÷ 27 ≈ 49,3 → 49", Math.abs(Number(lunes.n) / Number(lunes.d) - 49.3) < 0.05 && Math.round(Number(lunes.n) / Number(lunes.d)) === 49);
  dit(20, "\\approx 49{,}3$");
  dit(20, "environ $49$ Lunes");
  v.ok("20. le rapport réel 1737/6371 est bien voisin de 3/11", Math.abs(1737 / 6371 - 3 / 11) < 0.001);
}

lancer({
  nom: "PUISSANCE D'UN PRODUIT OU D'UNE FRACTION · seconde · 20 exercices",
  fichier: "lib/fiches-exercices/maths-seconde-puissance-produit-fraction.tsx",
  notionId: "puissances_2de",
  microsRequises: ["puiss_meme_exposant"],
  verifier,
  casses: [
    ["ex. 5 : le bas oublié, 8/3", "\\\\dfrac{2^3}{3^3} = \\\\dfrac{8}{27}$", "\\\\dfrac{2^3}{3^3} = \\\\dfrac{8}{3}$"],
    ["ex. 3 : 100³ écrit 100 000", "= 100^3 = 1\\\\,000\\\\,000$", "= 100^3 = 100\\\\,000$"],
    ["ex. 9 : un résultat négatif", "= \\\\dfrac{64}{27}$", "= -\\\\dfrac{64}{27}$"],
    ["ex. 10 : le signe oublié", "= -\\\\dfrac{8}{27}$", "= \\\\dfrac{8}{27}$"],
    ["ex. 13 : E devient 27/4", "= \\\\dfrac{27}{8}$", "= \\\\dfrac{27}{4}$"],
    ["ex. 15 : le 2² non élevé", "= 2^{10} \\\\times 3^5$", "= 2^{2} \\\\times 3^5$"],
    ["ex. 17 : le volume faux", "\\\\dfrac{1}{125\\\\,000} = 0{,}08$", "\\\\dfrac{1}{125\\\\,000} = 0{,}8$"],
    ["ex. 18 : 3 lancers manqués faux", "\\\\left(\\\\dfrac{1}{5}\\\\right)^3 = \\\\dfrac{1}{125}$", "\\\\left(\\\\dfrac{1}{5}\\\\right)^3 = \\\\dfrac{1}{25}$"],
    ["ex. 19 : 20 mg au lieu de 10", "\\\\dfrac{1}{8} = 10$", "\\\\dfrac{1}{8} = 20$"],
    ["ex. 20 : 9/11 au lieu de 9/121", "= \\\\dfrac{9}{121}$", "= \\\\dfrac{9}{11}$"],
    ["une micro inconnue du coach", "micros: [\"puiss_meme_exposant\", \"puiss_exposant_negatif\"],", "micros: [\"puiss_inconnue\"],"],
    ["un $ dans un canvas", "values: [\"3/4\", \"0,75\"]", "values: [\"$3/4$\", \"0,75\"]"],
  ],
});
