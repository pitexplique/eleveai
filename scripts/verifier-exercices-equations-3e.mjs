// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Résoudre une
// équation » de 3e (lib/fiches-exercices/maths-3e-equations.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé résout ; ici on ne résout RIEN. Chaque solution
// annoncée est REMISE dans l'équation de l'énoncé, en fractions exactes :
//   · premier degré : gauche − droite est affine, de pente non nulle, et
//     s'annule en la solution — elle est donc la seule ;
//   · produit nul, x² = a : deux solutions distinctes annulent une différence
//     de degré ≤ 2 non nulle — ce sont donc TOUTES les solutions ;
//   · factorisations : les deux écritures sont redéveloppées (évaluées en neuf
//     valeurs de x) et lues À LEUR PLACE dans le corrigé.
// Les dessins sont relus dans le source :
//   · la BALANCE : chaque ligne est équilibrée par la solution finale, et
//     l'opération écrite au-dessus (« −3x », « ÷4 », « je développe »)
//     transforme bien chaque plateau de la ligne d'avant en celui de la suivante ;
//   · les REPÈRES : chaque point marqué est sur sa courbe (sur les DEUX droites
//     pour une comparaison de tarifs), et la courbe est celle de l'énoncé ;
//   · les TABLEAUX : chaque case est recalculée.
//
//   node scripts/verifier-exercices-equations-3e.mjs

import { Q, D, egal, plus, moins, fois, div, evalTex, VALEURS_X, lireFeuille, outilsAlgebre, lancer } from "./verifier-exercices-commun.mjs";

const nb = (x) => (typeof x === "object" ? x : typeof x === "string" || !Number.isInteger(x) ? D(String(x)) : Q(x));
/** La donnée d'un dessin → une expression lisible par evalTex. */
const norm = (s) => s.replace(/²/g, "^2").replace(/−/g, "-").replace(/\bt\b/g, "x");
const val = (t, x) => evalTex(norm(t), x);
const memeFn = (f, g) => VALEURS_X.every((x) => egal(f(x), g(x)));
const txt = (q) => (q.d === 1n ? `${q.n}` : `${q.n}/${q.d}`);

function verifier(source, v) {
  const f = lireFeuille(source);
  const { c, dit, chaine, vaut, solutions } = outilsAlgebre(v, f);
  const bloc = (k) => f.blocs[k - 1] ?? "";

  /** gauche = droite a pour SEULE solution s, et la phrase est écrite. */
  const lineaire = (k, g, d, s, phrase) => {
    const h = (x) => moins(val(g, x), val(d, x));
    const [h0, h1, h2] = [0, 1, 2].map((n) => h(Q(n)));
    const affine = egal(moins(h2, h1), moins(h1, h0));
    const pente = !egal(h1, h0);
    const annule = egal(h(nb(s)), Q(0));
    v.ok(`${k}. ${g} = ${d} : seule solution ${txt(nb(s))}`, affine && pente && annule && c(k).includes(phrase), `affine : ${affine} ; pente ≠ 0 : ${pente} ; annule : ${annule} ; phrase : ${c(k).includes(phrase)}`);
  };

  /** La balance de l'exercice k : lignes équilibrées, opérations justes. */
  const balance = (k, s, depart) => {
    const lignes = [...bloc(k).matchAll(/\{ g: "([^"]*)", d: "([^"]*)"(?:, op: "([^"]*)")? \}/g)].map((m) => ({ g: m[1], d: m[2], op: m[3] }));
    const sol = nb(s);
    const fin = lignes.at(-1);
    v.ok(`${k}. la balance finit sur « x = ${txt(sol)} » (${lignes.length} lignes)`, lignes.length >= 2 && fin?.g === "x" && egal(val(fin.d, Q(0)), sol));
    lignes.forEach((l, i) => {
      const h = (x) => moins(val(l.g, x), val(l.d, x));
      const [h0, h1, h2] = [0, 1, 2].map((n) => h(Q(n)));
      const ok = egal(moins(h2, h1), moins(h1, h0)) && !egal(h1, h0) && egal(h(sol), Q(0));
      v.ok(`${k}. ligne ${i + 1} « ${l.g} = ${l.d} » : équilibrée en ${txt(sol)}, et seulement là`, ok);
      if (i === 0) return;
      const p = lignes[i - 1];
      const m = /^([−+÷×])\s*(.+)$/.exec(l.op ?? "");
      let juste;
      if (m) {
        const oper = { "−": moins, "+": plus, "÷": div, "×": fois }[m[1]];
        const applique = (e) => (x) => oper(val(e, x), val(m[2], x));
        juste = memeFn(applique(p.g), (x) => val(l.g, x)) && memeFn(applique(p.d), (x) => val(l.d, x));
      } else juste = !!l.op && memeFn((x) => val(p.g, x), (x) => val(l.g, x)) && memeFn((x) => val(p.d, x), (x) => val(l.d, x));
      v.ok(`${k}. « ${l.op} » mène de la ligne ${i} à la ligne ${i + 1}, des deux côtés`, juste);
    });
    if (depart) {
      // La première ligne est l'équation de l'énoncé, ou la même multipliée par un nombre.
      const [g, d, facteur = 1] = depart;
      const lu = lignes[0];
      v.ok(`${k}. la balance part de l'équation de l'énoncé (× ${facteur})`, !!lu && memeFn((x) => fois(nb(facteur), moins(val(g, x), val(d, x))), (x) => moins(val(lu.g, x), val(lu.d, x))));
    }
  };

  /** Le repère de l'exercice k : ses courbes q et ses points marqués. */
  const repereLu = (k) => {
    const m = /repere\(\[([^\]]*)\], \[(.*?)\], \[(.*?)\](?:, (-?[\d.]+))?\)/.exec(bloc(k));
    if (!m) return { courbes: [], points: [], horizontale: undefined };
    const courbes = [...m[2].matchAll(/q: \[([^\]]*)\]/g)].map((q) => q[1].split(", ").map((n) => nb(n)));
    const points = [...m[3].matchAll(/\{ x: (-?[\d.]+), y: (-?[\d.]+)/g)].map((p) => [nb(p[1]), nb(p[2])]);
    return { courbes, points, horizontale: m[4] === undefined ? undefined : nb(m[4]) };
  };
  const q = ([a, b, cc], x) => plus(plus(fois(a, fois(x, x)), fois(b, x)), cc);
  /** La courbe dessinée est celle de l'expression, et chaque point y est. */
  const courbe = (k, expr, quoi) => {
    const { courbes, points } = repereLu(k);
    v.ok(`${k}. la courbe dessinée est y = ${expr}`, courbes.length >= 1 && memeFn((x) => q(courbes[0], x), (x) => val(expr, x)));
    v.ok(`${k}. ${quoi} : les ${points.length} points marqués sont sur la courbe`, points.length >= 2 && points.every(([x, y]) => egal(q(courbes[0] ?? [Q(0), Q(0), Q(0)], x), y)));
    return points;
  };

  /** Le tableau d'essais `tableau(["x", …], ["expr", …])` : chaque case recalculée. */
  const tableauLu = (k) => {
    const m = /tableau\(\[([^\]]*)\], \["([^"]*)", ([^\]]*)\]\)/.exec(bloc(k));
    if (!m) return v.ok(`${k}. le tableau d'essais est lu`, false);
    const xs = [...m[1].matchAll(/"([^"]*)"/g)].map((t) => t[1]).slice(1);
    const cases = m[3].split(", ").map((n) => nb(n));
    const faux = xs.filter((x, i) => !cases[i] || !egal(val(m[2], nb(x)), cases[i]));
    v.ok(`${k}. tableau de « ${m[2]} » : ${xs.length} cases recalculées`, xs.length >= 4 && xs.length === cases.length && faux.length === 0, faux.length ? `faux en x = ${faux[0]}` : "");
    return { expr: m[2], xs, cases };
  };

  v.titre("★ Un seul geste");
  const t1 = tableauLu(1);
  v.ok("1. dans le tableau, seul x = 5 donne 19", !!t1 && t1.xs.filter((x, i) => egal(t1.cases[i], Q(19))).join() === "5");
  v.ok("1. 3 × 5 + 4 = 19", egal(val("3x + 4", Q(5)), Q(19)));
  dit(1, "$3 \\times 5 + 4 = 19$");
  dit(1, "Réponse : a) et d) sont des équations");

  lineaire(2, "x + 9", "4", -5, "donc $x = -5$");
  lineaire(2, "6x", "42", 7, "donc $x = 7$");
  lineaire(2, "x - 3{,}5", "8", "11,5", "donc $x = 11{,}5$");
  lineaire(2, "-4x", "18", "-4,5", "donc $x = -4{,}5$");
  v.ok("2. le piège : 5 + 9 = 14, pas 4", egal(val("x + 9", Q(5)), Q(14)));
  balance(2, -5, ["x + 9", "4"]);

  lineaire(3, "5x - 8", "27", 7, "Je divise par $5$ : $x = 7$");
  lineaire(3, "11 - 3x", "26", -5, "Je divise par $-3$ : $x = -5$");
  lineaire(3, "\\dfrac{x}{4} + 1", "3", 8, "Je multiplie par $4$ : $x = 8$");
  balance(3, 7, ["5x - 8", "27"]);

  v.ok("4. 3 : 4×3 − 5 = 7 = 2×3 + 1", egal(val("4x - 5", Q(3)), Q(7)) && egal(val("2x + 1", Q(3)), Q(7)));
  v.ok("4. −2 : (−2)² + 3×(−2) = −2 ≠ 2", egal(val("x^2 + 3x", Q(-2)), Q(-2)));
  v.ok("4. −1 : 2×(−1)² − (−1) = 3", egal(val("2x^2 - x", Q(-1)), Q(3)));
  dit(4, "$(-2)^2 + 3 \\times (-2) = 4 - 6 = -2$");
  dit(4, "$2 \\times (-1)^2 - (-1) = 2 + 1 = 3$");
  dit(4, "Réponse : oui ; non ; oui.");

  lineaire(5, "7x + 2", "3x + 22", 5, "Je divise par $4$ : $x = 5$");
  lineaire(5, "2x - 9", "6x + 3", -3, "Je divise par $-4$ : $x = -3$");
  balance(5, 5, ["7x + 2", "3x + 22"]);

  solutions(6, "(x - 4)(x + 1)", "0", [4, -1], "donc $x = 4$ ou $x = -1$");
  solutions(6, "x(2x - 5)", "0", [0, "2,5"].map(nb), "$x = 0$ ou $x = 2{,}5$");
  solutions(6, "(3x + 12)(x - 7)", "0", [-4, 7], "Réponse : a) $-1$ et $4$ ; b) $0$ et $2{,}5$ ; c) $-4$ et $7$.");
  const p6 = courbe(6, "(x - 4)(x + 1)", "les deux solutions");
  v.ok("6. les points marqués sont −1 et 4, sur l'axe", p6.map(([x, y]) => `${txt(x)};${txt(y)}`).sort().join() === "-1;0,4;0");

  v.ok("7. (8 + 8)(8 − 2) = 96 : 8 n'est pas solution", egal(val("(x + 8)(x - 2)", Q(8)), Q(96)));
  dit(7, "$(8 + 8)(8 - 2) = 16 \\times 6 = 96$");
  solutions(7, "(x + 8)(x - 2)", "0", [-8, 2], "Les solutions sont $x = -8$ ou $x = 2$");
  const zeros = (e) => [...Array(241).keys()].map((i) => Q(i - 120, 4)).filter((x) => egal(val(e, x), Q(0))).map(txt);
  v.ok("7. (x − 5)² = 0 et 4(x − 9) = 0 : une seule solution chacune, 5 et 9", zeros("(x - 5)^2").join() === "5" && zeros("4(x - 9)").join() === "9");
  dit(7, "une seule solution, $x = 5$");
  dit(7, "une seule solution, $x = 9$");

  solutions(8, "x^2", "64", [8, -8], "$x = 8$ ou $x = -8$");
  solutions(8, "2x^2", "50", [5, -5], "Donc $x = 5$ ou $x = -5$");
  v.ok("8. x² = −25 : aucun x de la grille, un carré est ≥ 0", zeros("x^2 + 25").length === 0);
  chaine(8, "x^2 - 64", "(x - 8)(x + 8)", { enonce: false });
  const r8 = repereLu(8);
  v.ok("8. la courbe dessinée est y = x², coupée par y = 6", r8.courbes.length === 1 && memeFn((x) => q(r8.courbes[0], x), (x) => val("x^2", x)) && !!r8.horizontale && egal(r8.horizontale, Q(6)));
  v.ok("8. les points marqués sont ±√6 au centième, à hauteur 6", r8.points.length === 2 && r8.points.every(([x, y]) => egal(y, Q(6)) && Math.abs(Math.abs(Number(x.n) / Number(x.d)) - +Math.sqrt(6).toFixed(2)) < 1e-9) && !egal(r8.points[0][0], r8.points[1][0]));

  v.titre("★★ Type devoir");
  lineaire(9, "3(2x - 5)", "4x + 7", 11, "Donc $x = 11$.");
  lineaire(9, "5 - 2(x + 4)", "x + 6", -3, "Donc $x = -3$.");
  vaut(9, "5 - 2(x + 4)", "5 - 2x - 8", "Je développe : $5 - 2x - 8 = x + 6$");
  v.ok("9. le piège : −2(x + 4) n'est pas −2x + 8", !memeFn((x) => val("-2(x + 4)", x), (x) => val("-2x + 8", x)));
  balance(9, 11, ["3(2x - 5)", "4x + 7"]);

  chaine(10, "(x + 3)(x - 2)", "x^2 + x - 6");
  chaine(10, "(x - 4)^2", "x^2 - 8x + 16");
  lineaire(10, "(x + 3)(x - 2)", "x^2 + 4", 10, "donc $x = 10$");
  lineaire(10, "(x - 4)^2", "x(x - 5)", Q(16, 3), "Donc $x = \\dfrac{16}{3}$");
  dit(10, "$(10 + 3)(10 - 2) = 13 \\times 8 = 104$ et $10^2 + 4 = 104$");
  balance(10, 10, ["(x + 3)(x - 2)", "x^2 + 4"]);

  chaine(11, "x^2 - 7x", "x(x - 7)");
  solutions(11, "x^2 - 7x", "0", [0, 7], "$x = 0$ ou $x = 7$");
  chaine(11, "(2x + 1)(x - 3) + (2x + 1)(x + 5)", "(2x + 1)(2x + 2)");
  solutions(11, "(2x + 1)(x - 3) + (2x + 1)(x + 5)", "0", [nb("-0,5"), -1], "soit $x = -0{,}5$ ou $x = -1$");

  chaine(12, "9x^2 - 16", "(3x - 4)(3x + 4)");
  solutions(12, "9x^2 - 16", "0", [Q(4, 3), Q(-4, 3)], "soit $x = \\dfrac{4}{3}$ ou $x = -\\dfrac{4}{3}$");
  chaine(12, "(x + 2)^2 - 36", "(x - 4)(x + 8)");
  solutions(12, "(x + 2)^2 - 36", "0", [4, -8], "soit $x = 4$ ou $x = -8$");
  v.ok("12. le piège : −8 marche, (−8 + 2)² = 36", egal(val("(x + 2)^2", Q(-8)), Q(36)));

  solutions(13, "x^2 + x - 6", "0", [2, -3], "ne s'annule que si $x = 2$ ou $x = -3$");
  chaine(13, "(x - 2)(x + 3)", "x^2 + x - 6");
  v.ok("13. 1 n'est pas solution : 1 + 1 − 6 = −4", egal(val("x^2 + x - 6", Q(1)), Q(-4)));
  dit(13, "$1^2 + 1 - 6 = -4$");
  const p13 = courbe(13, "x^2 + x - 6", "les deux solutions");
  v.ok("13. les points marqués sont −3 et 2, sur l'axe", p13.map(([x, y]) => `${txt(x)};${txt(y)}`).sort().join() === "-3;0,2;0");

  solutions(14, "x(x + 1)", "132", [11, -12], "C'est $x = 11$");
  const t14 = tableauLu(14);
  v.ok("14. le tableau montre 132 en x = 11, et le produit croît", !!t14 && t14.xs[t14.cases.findIndex((n) => egal(n, Q(132)))] === "11" && t14.cases.every((n, i) => i === 0 || Number(n.n) > Number(t14.cases[i - 1].n)));
  dit(14, "Réponse : $11$ et $12$, ou $-12$ et $-11$.");

  lineaire(15, "\\dfrac{x}{3} + \\dfrac{x}{4}", "14", 24, "Donc $x = 24$.");
  lineaire(15, "\\dfrac{2x - 1}{5}", "\\dfrac{x + 4}{3}", 23, "Donc $x = 23$.");
  vaut(15, "12(\\dfrac{x}{3} + \\dfrac{x}{4})", "7x", "soit $7x = 168$");
  balance(15, 23, ["\\dfrac{2x - 1}{5}", "\\dfrac{x + 4}{3}", 15]);

  v.ok("16. en partant de 5 : A donne 13, B donne 21", egal(val("4x - 7", Q(5)), Q(13)) && egal(val("3(x + 2)", Q(5)), Q(21)));
  lineaire(16, "4x - 7", "3(x + 2)", 13, "Donc $x = 13$.");
  v.ok("16. en partant de 13, les deux donnent 45", egal(val("4x - 7", Q(13)), Q(45)) && egal(val("3(x + 2)", Q(13)), Q(45)));
  dit(16, "les deux programmes donnent $45$");
  balance(16, 13, ["4x - 7", "3(x + 2)"]);

  v.titre("★★★ Problèmes");
  const A = "3x", B = "6 + 1{,}5x";
  v.ok("17. 2 h : A 6 €, B 9 € ; 6 h : A 18 €, B 15 €", [[2, 6, 9], [6, 18, 15]].every(([h, a, b]) => egal(val(A, Q(h)), Q(a)) && egal(val(B, Q(h)), Q(b))));
  lineaire(17, A, B, 4, "Je divise par $1{,}5$ : $x = 4$");
  dit(17, "Chez B, il est $6 + 1{,}5x$");
  const r17 = repereLu(17);
  v.ok("17. les deux droites dessinées sont 3x (A) et 6 + 1,5x (B)", r17.courbes.length === 2 && memeFn((x) => q(r17.courbes[0], x), (x) => val(A, x)) && memeFn((x) => q(r17.courbes[1], x), (x) => val(B, x)));
  v.ok("17. le point marqué est sur les DEUX droites, et c'est (4 ; 12)", r17.points.length === 1 && r17.courbes.length === 2 && r17.courbes.every((cq) => egal(q(cq, r17.points[0][0]), r17.points[0][1])) && egal(r17.points[0][0], Q(4)));
  dit(17, "les prix sont égaux pour $4$ heures ($12$ €)");

  vaut(18, "x + (x + 30) + (x - 8{,}5)", "3x + 21{,}5", "Je réduis : $3x + 21{,}5 = 51{,}5$");
  lineaire(18, "x + (x + 30) + (x - 8{,}5)", "51{,}5", 10, "Donc $x = 10$.");
  v.ok("18. 10 + 40 + 1,5 = 51,5", egal(plus(plus(Q(10), Q(40)), D("1,5")), D("51,5")));
  dit(18, "$1{,}5$ km de natation, $40$ km de vélo et $10$ km de course à pied");
  balance(18, 10, ["x + (x + 30) + (x - 8{,}5)", "51{,}5"]);

  const h = "5x(4 - x)";
  v.ok("19. h(1) = 15", egal(val(h, Q(1)), Q(15)));
  dit(19, "$h = 5 \\times 1 \\times (4 - 1) = 15$ m");
  solutions(19, h, "0", [0, 4], "soit $t = 0$ ou $t = 4$");
  v.ok("19. 5t(4 − t) − 15 ≡ −5(t − 1)(t − 3)", memeFn((x) => val(`${h} - 15`, x), (x) => val("-5(x - 1)(x - 3)", x)));
  dit(19, "$-5(t - 1)(t - 3) = -5(t^2 - 4t + 3) = -5t^2 + 20t - 15$");
  solutions(19, h, "15", [1, 3], "Produit nul : $t = 1$ ou $t = 3$");
  courbe(19, h, "sol et hauteur 15");
  const r19 = repereLu(19);
  v.ok("19. la droite h = 15 est tracée, et deux points y sont (t = 1 et t = 3)", !!r19.horizontale && egal(r19.horizontale, Q(15)) && r19.points.filter(([, y]) => egal(y, Q(15))).map(([x]) => txt(x)).sort().join() === "1,3");

  v.ok("20. 6 min = 0,1 h, et 45 × 0,1 = 4,5 km", egal(div(Q(6), Q(60)), D("0,1")) && egal(fois(Q(45), D("0,1")), D("4,5")));
  lineaire(20, "54x", "4{,}5 + 45x", "0,5", "Donc $t = 0{,}5$ h, soit $30$ min");
  v.ok("20. 0,5 h = 30 min ; 54 × 0,5 = 27 km, au-delà des 25 km de l'arrivée", egal(fois(D("0,5"), Q(60)), Q(30)) && egal(fois(Q(54), D("0,5")), Q(27)) && 27 > 25);
  dit(20, "$54 \\times 0{,}5 = 27$ km");
  dit(20, "l'échappé gagne l'étape");
  const ent20 = /\["t \(min\)", ([^\]]*)\]/.exec(bloc(20));
  const lig20 = Object.fromEntries([...bloc(20).matchAll(/\["(peloton|échappé) \(km\)", ([^\]]*)\]/g)].map((m) => [m[1], m[2].split(", ").map((s) => nb(s.replace(/"/g, "")))]));
  const mins = ent20 ? ent20[1].split(", ").map((s) => Q(Number(s.replace(/"/g, "")), 60)) : [];
  v.ok(`20. tableau : peloton = 54t, échappé = 4,5 + 45t, sur ${mins.length} instants`, mins.length === 4 && !!lig20.peloton && !!lig20["échappé"] && mins.every((t, i) => egal(val("54x", t), lig20.peloton[i]) && egal(val("4{,}5 + 45x", t), lig20["échappé"][i])));
  v.ok("20. le piège : 54t = 45t n'a que t = 0", egal(moins(val("54x", Q(0)), val("45x", Q(0))), Q(0)) && !egal(val("54x", Q(1)), val("45x", Q(1))));

  const dessines = f.blocs.filter((b) => /\n\s+schema:/.test(b)).length;
  v.ok(`${dessines} corrigés dessinés sur 20`, dessines >= 14);
}

lancer({
  nom: "RÉSOUDRE UNE ÉQUATION · 3e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-3e-equations.tsx",
  notionId: "equation_resolution",
  classe: "3e",
  verifier,
  casses: [
    ["ex. 1 : une case du tableau d'essais fausse", "[\"3x + 4\", 13, 16, 19, 22]", "[\"3x + 4\", 13, 16, 20, 22]"],
    ["ex. 2 : 9 − 4 au lieu de 4 − 9", "donc $x = -5$.", "donc $x = 5$."],
    ["ex. 2 : la balance finit sur x = 5", "{ g: \"x\", d: \"-5\", op: \"−9\" }", "{ g: \"x\", d: \"5\", op: \"−9\" }"],
    ["ex. 3 : l'opération de la balance à l'envers", "{ g: \"5x\", d: \"35\", op: \"+8\" }", "{ g: \"5x\", d: \"35\", op: \"−8\" }"],
    ["ex. 5 : divisé par 4 au lieu de −4", "Je divise par $-4$ : $x = -3$", "Je divise par $-4$ : $x = 3$"],
    ["ex. 5 : 3x « passé » sans changer de signe", "{ g: \"4x + 2\", d: \"22\", op: \"−3x\" }", "{ g: \"10x + 2\", d: \"22\", op: \"+3x\" }"],
    ["ex. 6 : les signes des solutions recopiés", "donc $x = 4$ ou $x = -1$", "donc $x = -4$ ou $x = 1$"],
    ["ex. 6 : la parabole dessinée n'est pas la bonne", "q: [1, -3, -4]", "q: [1, 3, -4]"],
    ["ex. 7 : le piège du signe gardé", "Les solutions sont $x = -8$ ou $x = 2$", "Les solutions sont $x = 8$ ou $x = 2$"],
    ["ex. 8 : √6 mal placé", "{ x: 2.45, y: 6,", "{ x: 2.5, y: 6,"],
    ["ex. 9 : −2 × 4 = +8", "Je développe : $5 - 2x - 8 = x + 6$", "Je développe : $5 - 2x + 8 = x + 6$"],
    ["ex. 10 : 16/13 au lieu de 16/3", "Donc $x = \\\\dfrac{16}{3}$", "Donc $x = \\\\dfrac{16}{13}$"],
    ["ex. 10 : le x² gardé d'un seul côté", "{ g: \"x - 6\", d: \"4\", op: \"−x²\" }", "{ g: \"x² + x - 6\", d: \"4\", op: \"−x²\" }"],
    ["ex. 11 : une factorisation fausse", "= (2x + 1)(2x + 2)$", "= (2x + 1)(2x - 2)$"],
    ["ex. 12 : la solution négative perdue", "soit $x = 4$ ou $x = -8$", "soit $x = 4$ ou $x = 8$"],
    ["ex. 13 : un point de la courbe hors de l'axe", "{ x: -3, y: 0, label: \"−3\" }", "{ x: 3, y: 0, label: \"−3\" }"],
    ["ex. 14 : une case du tableau fausse", "132, 156]", "132, 157]"],
    ["ex. 15 : le numérateur multiplié à moitié", "Donc $x = 23$.", "Donc $x = 25$."],
    ["ex. 16 : le programme B sans parenthèses", "Donc $x = 13$.", "Donc $x = 12$."],
    ["ex. 17 : le point de rencontre à côté", "{ x: 4, y: 12,", "{ x: 4, y: 13,"],
    ["ex. 17 : la droite du loueur B fausse", "q: [0, 1.5, 6]", "q: [0, 1.5, 4]"],
    ["ex. 18 : un seul x au lieu de trois", "Je réduis : $3x + 21{,}5 = 51{,}5$", "Je réduis : $x + 21{,}5 = 51{,}5$"],
    ["ex. 19 : le retour au sol faux", "soit $t = 0$ ou $t = 4$", "soit $t = 0$ ou $t = 5$"],
    ["ex. 19 : un point à 15 m mal placé", "{ x: 3, y: 15,", "{ x: 2, y: 15,"],
    ["ex. 20 : l'avance oubliée dans le tableau", "\"4,5\", \"12\", \"19,5\", \"27\"", "\"0\", \"7,5\", \"15\", \"22,5\""],
    ["ex. 20 : 0,5 h converti en 50 min", "Donc $t = 0{,}5$ h, soit $30$ min", "Donc $t = 0{,}5$ h, soit $50$ min"],
    ["une micro d'une autre notion", "micros: [\"equation_reconnaitre\", \"equation_verifier\"]", "micros: [\"litteral_developper\", \"equation_verifier\"]"],
    ["un $ dans un canvas", "{ x: 4, y: 12, label: \"4 ; 12\" }", "{ x: 4, y: 12, label: \"$4\\\\,;\\\\,12$\" }"],
  ],
});
