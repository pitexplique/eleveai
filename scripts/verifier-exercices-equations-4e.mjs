// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Résoudre une
// équation » de 4e (lib/fiches-exercices/maths-4e-equations.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé résout ; ici on ne résout RIEN. Chaque solution
// annoncée est REMISE dans l'équation de l'énoncé, en fractions exactes :
// gauche − droite est affine, de pente non nulle, et s'annule en la solution —
// elle est donc la seule. Les développements sont évalués en neuf valeurs de x.
// Les dessins sont relus dans le source :
//   · chaque BALANCE (seize corrigés, parfois deux par corrigé) : chaque ligne
//     est équilibrée par la solution finale, et seulement par elle ;
//     l'opération écrite au-dessus (« −3x », « ÷−70 », « je développe »)
//     transforme bien chaque plateau de la ligne d'avant en celui de la
//     suivante ; la première ligne est l'équation de l'énoncé ;
//   · les TABLEAUX : chaque case est recalculée (classement équation / calcul /
//     expression, membres de gauche et de droite, âges, coûts, CO₂) ;
//   · le TRIANGLE isocèle : ses côtés, mesurés sur ses coordonnées, font 10,
//     13 et 13 ; le TERRAIN : 105 sur 68 ; les RELAIS : leur somme fait 42,195.
// Le nombre de corrigés dessinés est compté (« les élèves adorent les schémas »).
//
//   node scripts/verifier-exercices-equations-4e.mjs

import { Q, D, egal, plus, moins, fois, div, evalTex, VALEURS_X, lireFeuille, outilsAlgebre, lancer } from "./verifier-exercices-commun.mjs";

const nb = (x) => (typeof x === "object" ? x : typeof x === "string" || !Number.isInteger(x) ? D(String(x)) : Q(x));
/** Une donnée de dessin (« 30000 - 70x », « 2.5x », « −7 », « 30 000 ») → lisible par evalTex. */
const norm = (s) =>
  String(s)
    .replace(/\\,/g, "")
    .replace(/\{,\}/g, ".")
    .replace(/−/g, "-")
    .replace(/×/g, "*")
    .replace(/[\s  ]/g, "")
    .replace(/,/g, ".");
const val = (t, x) => evalTex(norm(t), x);
const memeFn = (f, g) => VALEURS_X.every((x) => egal(f(x), g(x)));
const txt = (q) => (q.d === 1n ? `${q.n}` : `${q.n}/${q.d}`);

/** Le contenu JSON d'un appel `nom(…)` du bloc (i-ème occurrence), comme tableau d'arguments. */
function appel(bloc, nom, i = 0) {
  const re = new RegExp(`\\b${nom}\\(`, "g");
  const m = [...bloc.matchAll(re)][i];
  if (!m) return null;
  let prof = 0;
  const debut = m.index + m[0].length;
  let dansChaine = false;
  for (let j = debut; j < bloc.length; j++) {
    const ch = bloc[j];
    // ⚠️ « a) x = −2 » : une parenthèse DANS une chaîne ne ferme rien.
    if (ch === '"' && bloc[j - 1] !== "\\") dansChaine = !dansChaine;
    if (dansChaine || ch === '"') continue;
    if ("([{".includes(ch)) prof++;
    if (")]}".includes(ch)) {
      if (prof === 0) {
        const brut = bloc.slice(debut, j).replace(/,(\s*[\]}])/g, "$1").replace(/,\s*$/, "");
        const json = brut.replace(/([{,]\s*)([a-zA-Z]+):/g, '$1"$2":');
        return JSON.parse(`[${json}]`);
      }
      prof--;
    }
  }
  throw new Error(`appel ${nom}( non fermé`);
}

function verifier(source, v) {
  const f = lireFeuille(source);
  const { e, c, dit, vaut, chaine } = outilsAlgebre(v, f);
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

  /** Les balances de l'exercice k, chacune comme une liste de lignes. */
  const balancesDe = (k) =>
    [...bloc(k).matchAll(/\bbalance\(\[([\s\S]*?)\]\)/g)].map((m) =>
      [...m[1].matchAll(/\{ g: "([^"]*)", d: "([^"]*)"(?:, op: "([^"]*)")? \}/g)].map((l) => ({ g: l[1], d: l[2], op: l[3] })),
    );

  /** La i-ème balance de l'exercice k : lignes équilibrées en s, opérations justes, départ = l'énoncé. */
  const balance = (k, s, [g0, d0], i = 0) => {
    const lignes = balancesDe(k)[i] ?? [];
    const sol = nb(s);
    const fin = lignes.at(-1);
    v.ok(`${k}. balance ${i + 1} : finit sur « x = ${txt(sol)} » (${lignes.length} lignes)`, lignes.length >= 2 && fin?.g === "x" && egal(val(fin.d, Q(0)), sol));
    lignes.forEach((l, j) => {
      const h = (x) => moins(val(l.g, x), val(l.d, x));
      const [h0, h1, h2] = [0, 1, 2].map((n) => h(Q(n)));
      const ok = egal(moins(h2, h1), moins(h1, h0)) && !egal(h1, h0) && egal(h(sol), Q(0));
      v.ok(`${k}. balance ${i + 1}, ligne ${j + 1} « ${l.g} = ${l.d} » : équilibrée en ${txt(sol)}, et seulement là`, ok);
      if (j === 0) return;
      const p = lignes[j - 1];
      const m = /^([−+÷×])\s*(.+)$/.exec(l.op ?? "");
      let juste;
      if (m) {
        const oper = { "−": moins, "+": plus, "÷": div, "×": fois }[m[1]];
        const applique = (t) => (x) => oper(val(t, x), val(m[2], x));
        juste = memeFn(applique(p.g), (x) => val(l.g, x)) && memeFn(applique(p.d), (x) => val(l.d, x));
      } else juste = !!l.op && memeFn((x) => val(p.g, x), (x) => val(l.g, x)) && memeFn((x) => val(p.d, x), (x) => val(l.d, x));
      v.ok(`${k}. balance ${i + 1} : « ${l.op} » mène de la ligne ${j} à la ligne ${j + 1}, des deux côtés`, juste);
    });
    const lu = lignes[0];
    v.ok(`${k}. balance ${i + 1} : part de ${g0} = ${d0}`, !!lu && memeFn((x) => val(g0, x), (x) => val(lu.g, x)) && memeFn((x) => val(d0, x), (x) => val(lu.d, x)));
  };

  /** Les lignes d'un `tableauProba(entêtes, lignes)` de l'exercice k. */
  const tp = (k, i = 0) => {
    const a = appel(bloc(k), "tableauProba", i);
    if (!a) throw new Error(`exercice ${k} : pas de tableauProba`);
    return { entetes: a[0], lignes: a[1] };
  };

  /* ───────────────────────── ★ Un seul geste ───────────────────────── */
  v.titre("★ Un seul geste");
  {
    const { lignes } = tp(1);
    const fautes = lignes.filter(([ecr, eg, lettre, nature]) => {
      const aEgal = ecr.includes("=");
      const aLettre = /[a-z]/.test(ecr);
      const attendu = aEgal && aLettre ? "une équation" : aEgal ? "un calcul" : "une expression";
      return eg !== (aEgal ? "oui" : "non") || lettre !== (aLettre ? "oui" : "non") || nature !== attendu || !e(1).includes(`$${ecr.replace(/−/g, "-")}$`);
    });
    v.ok(`1. classement : ${lignes.length} écritures de l'énoncé, colonnes recalculées`, lignes.length === 5 && fautes.length === 0, fautes.map((l) => l[0]).join(", "));
    const equations = lignes.filter((l) => l[3] === "une équation").map((l) => l[0]);
    v.ok("1. trois équations : ①, ④, ⑤", equations.join(" | ") === "4x − 1 = 11 | 15 = 2y + 3 | 5x − 8 = 2x");
    v.ok("1. 4 × 3 − 1 = 11", egal(val("4x - 1", Q(3)), Q(11)));
    dit(1, "$4 \\times 3 - 1 = 12 - 1 = 11$");
    dit(1, "Réponse : ①, ④ et ⑤ sont des équations ; l'inconnue de ④ est $y$ ; $3$ est solution de ①.");
  }

  lineaire(2, "x - 7", "12", 19, "J'ajoute $7$ des deux côtés : $x = 19$");
  lineaire(2, "4x", "44", 11, "Je divise par $4$ : $x = 11$");
  lineaire(2, "3x + 5", "32", 9, "Je divise par $3$ : $x = 9$");
  lineaire(2, "\\dfrac{x}{2}", "9", 18, "Je multiplie par $2$ : $x = 18$");
  v.ok("2. le piège : 3(x + 5) = 32 ne donne pas 9", !egal(val("3(x + 5)", Q(9)), Q(32)));
  dit(2, "Réponse : $x = 19$ ; $x = 11$ ; $x = 9$ ; $x = 18$.");
  balance(2, 9, ["3x + 5", "32"]);

  lineaire(3, "x + 13", "6", -7, "$x = 6 - 13$, donc $x = -7$");
  lineaire(3, "x - 8", "-3", 5, "$x = -3 + 8$, donc $x = 5$");
  lineaire(3, "7x", "91", 13, "$x = 91 \\div 7$, donc $x = 13$");
  lineaire(3, "-5x", "35", -7, "$x = 35 \\div (-5)$, donc $x = -7$");
  v.ok("3. le piège : 7 + 13 = 20, pas 6", egal(val("x + 13", Q(7)), Q(20)));
  dit(3, "Réponse : $x = -7$ ; $x = 5$ ; $x = 13$ ; $x = -7$.");
  balance(3, -7, ["x + 13", "6"], 0);
  balance(3, 13, ["7x", "91"], 1);

  lineaire(4, "4x + 7", "31", 6, "Je divise par $4$ : $x = 6$");
  lineaire(4, "9 - 2x", "1", 4, "Je divise par $-2$ : $x = 4$");
  lineaire(4, "6x - 5", "-23", -3, "Je divise par $6$ : $x = -3$");
  dit(4, "$9 - 2 \\times 4 = 9 - 8 = 1$");
  dit(4, "Réponse : $x = 6$ ; $x = 4$ ; $x = -3$.");
  balance(4, 6, ["4x + 7", "31"]);

  vaut(5, "6x - 2x + x", "5x", "$6x - 2x + x = 5x$");
  vaut(5, "3x + 4 + 2x - 9", "5x - 5", "L'équation devient $5x - 5 = 20$");
  lineaire(5, "6x - 2x + x", "40", 8, "L'équation devient $5x = 40$, donc $x = 8$");
  lineaire(5, "3x + 4 + 2x - 9", "20", 5, "$5x = 25$. Donc $x = 5$");
  lineaire(5, "7x - 10x", "12", -4, "Je divise par $-3$ : $x = -4$");
  v.ok("5. le piège : 6x − 2x + x n'est pas 4x", !memeFn((x) => val("6x - 2x + x", x), (x) => val("4x", x)));
  dit(5, "$6 \\times 8 - 2 \\times 8 + 8 = 48 - 16 + 8 = 40$");
  balance(5, 5, ["3x + 4 + 2x - 9", "20"]);

  chaine(6, "5(x - 2)", "5x - 10");
  lineaire(6, "5(x - 2)", "35", 9, "Je divise par $5$ : $x = 9$");
  lineaire(6, "4(2x + 1)", "44", 5, "puis $8x = 40$, donc $x = 5$");
  vaut(6, "4(2x + 1)", "8x + 4", "En développant d'abord : $8x + 4 = 44$");
  lineaire(6, "-3(x + 4)", "6", -6, "Je retire $4$ : $x = -6$");
  dit(6, "$-3 \\times (-6 + 4) = -3 \\times (-2) = 6$");
  v.ok("6. le piège : 5(x − 2) n'est pas 5x − 2", !memeFn((x) => val("5(x - 2)", x), (x) => val("5x - 2", x)));
  dit(6, "Réponse : $x = 9$ ; $x = 5$ ; $x = -6$.");
  balance(6, 9, ["5(x - 2)", "35"], 0);
  balance(6, 9, ["5(x - 2)", "35"], 1);

  {
    const eqs = [
      ["3x + 11", "5", "-2", "a)"],
      ["2x - 3", "x + 2", "4", "b)"],
      ["7x + 4", "4 - 2x", "0", "c)"],
      ["4x", "2x + 3", "1,5", "d)"],
    ];
    const { lignes } = tp(7);
    const fautes = eqs.filter(([g, d, s, lettre], i) => {
      const l = lignes[i] ?? [];
      const x = nb(s);
      const [G, Dr] = [val(g, x), val(d, x)];
      const verdict = egal(G, Dr) ? "oui" : "non";
      return !l.length || !l[0].startsWith(lettre) || !egal(nb(norm(l[0].split("= ")[1])), x) || !egal(nb(norm(l[1])), G) || !egal(nb(norm(l[2])), Dr) || l[3] !== verdict || !e(7).includes(`$${g} = ${d}$`);
    });
    v.ok("7. tableau : les deux membres recalculés en chaque valeur, et le verdict", lignes.length === 4 && fautes.length === 0, fautes.map((f) => f[3]).join(" "));
    const verdicts = eqs.map(([g, d, s]) => (egal(val(g, nb(s)), val(d, nb(s))) ? "oui" : "non")).join(" ; ");
    v.ok(`7. verdicts recalculés : ${verdicts}`, c(7).includes(`Réponse : ${verdicts}.`));
    dit(7, "À gauche : $3 \\times (-2) + 11 = -6 + 11 = 5$");
    dit(7, "À droite : $4 + 2 = 6$");
  }

  v.ok("8. Sami : 5 × 4,2 + 3 = 24 ≠ 18 ; Inès : 6 × 48 = 288 ; Lucas : 6 − 4 = 2", egal(val("5x + 3", D("4,2")), Q(24)) && egal(val("6x", Q(48)), Q(288)) && egal(val("x - 4", Q(6)), Q(2)));
  dit(8, "$5 \\times 4{,}2 + 3 = 21 + 3 = 24$");
  dit(8, "$6 \\times 48 = 288$");
  lineaire(8, "5x + 3", "18", 3, "$5x = 15$, donc $x = 3$");
  lineaire(8, "6x", "54", 9, "Je divise par $6$ : $x = 9$");
  lineaire(8, "x - 4", "10", 14, "J'ajoute $4$ des deux côtés : $x = 14$");
  dit(8, "Réponse : $x = 3$ ; $x = 9$ ; $x = 14$.");
  balance(8, 3, ["5x + 3", "18"]);

  /* ───────────────────────── ★★ Type devoir ───────────────────────── */
  v.titre("★★ Type devoir");
  lineaire(9, "8x - 5", "3x + 20", 5, "Je divise par $5$ : $x = 5$");
  lineaire(9, "3x + 10", "7x - 6", 4, "Je divise par $-4$ : $x = 4$");
  v.ok("9. l'autre chemin : 10 = 4x − 6 donne aussi 4", egal(val("4x - 6", Q(4)), Q(10)));
  dit(9, "$3 \\times 4 + 10 = 22$ et $7 \\times 4 - 6 = 22$");
  v.ok("9. le piège : 11x − 5 = 20 ne donne pas 5", !egal(val("11x - 5", Q(5)), Q(20)));
  dit(9, "Réponse : $x = 5$ ; $x = 4$.");
  balance(9, 5, ["8x - 5", "3x + 20"]);

  chaine(10, "3(x + 5)", "3x + 15");
  chaine(10, "7 - (x - 3)", "10 - x", { enonce: true });
  lineaire(10, "3(x + 5)", "2x + 19", 4, "Je retire $15$ : $x = 4$");
  lineaire(10, "7 - (x - 3)", "2x + 1", 3, "Je divise par $-3$ : $x = 3$");
  v.ok("10. le piège : avec −x − 3, on trouve 1, et 7 − (1 − 3) = 9 ≠ 3", egal(val("7 - x - 3", Q(1)), val("2x + 1", Q(1))) && egal(val("7 - (x - 3)", Q(1)), Q(9)) && egal(val("2x + 1", Q(1)), Q(3)));
  dit(10, "Avec l'erreur, on trouve $x = 1$ ; or $7 - (1 - 3) = 9$ alors que $2 \\times 1 + 1 = 3$.");
  dit(10, "Réponse : $x = 4$ ; $x = 3$.");
  balance(10, 3, ["7 - (x - 3)", "2x + 1"]);

  vaut(11, "4(x - 1)", "4x - 4", "$4(x - 1) = 4x - 4$");
  vaut(11, "2(x + 6)", "2x + 12", "$2(x + 6) = 2x + 12$");
  vaut(11, "6(x + 2) - 2(x + 1)", "4x + 10", "Je réduis : $4x + 10 = 34$");
  lineaire(11, "4(x - 1)", "2(x + 6)", 8, "$2x = 16$. Donc $x = 8$");
  lineaire(11, "6(x + 2) - 2(x + 1)", "34", 6, "$4x = 24$. Donc $x = 6$");
  dit(11, "$6 \\times (6 + 2) - 2 \\times (6 + 1) = 48 - 14 = 34$");
  v.ok("11. le piège : −2(x + 1) n'est pas −2x + 2", !memeFn((x) => val("-2(x + 1)", x), (x) => val("-2x + 2", x)));
  balance(11, 6, ["6(x + 2) - 2(x + 1)", "34"]);

  v.ok("12. en 2,5 : 6 × 2,5 − 4 = 11 = 2 × 2,5 + 6", egal(val("6x - 4", D("2,5")), Q(11)) && egal(val("2x + 6", D("2,5")), Q(11)));
  dit(12, "$6 \\times 2{,}5 - 4 = 15 - 4 = 11$");
  lineaire(12, "6x - 4", "2x + 6", "2,5", "Je divise par $4$ : $x = 2{,}5$");
  {
    const { entetes, lignes } = tp(12);
    const xs = entetes.slice(1).map((s) => nb(norm(s)));
    const fautes = lignes.filter(([expr, ...cases]) => cases.length !== xs.length || cases.some((cs, i) => !egal(nb(norm(cs)), val(expr, xs[i]))));
    v.ok(`12. tableau : ${lignes.length} membres × ${xs.length} valeurs recalculés`, lignes.length === 2 && xs.length === 4 && fautes.length === 0, fautes.map((l) => l[0]).join(", "));
    v.ok("12. les deux lignes du tableau sont les deux membres de l'énoncé", lignes.map((l) => norm(l[0])).join("|") === "6x-4|2x+6");
    const egales = xs.filter((x, i) => lignes.length === 2 && lignes[0][i + 1] === lignes[1][i + 1]).map(txt);
    v.ok("12. seule la colonne x = 2,5 a deux membres égaux", egales.join() === "5/2");
  }
  dit(12, "Pour $x = 1$ : $2$ et $8$. Pour $x = 2$ : $8$ et $10$. Pour $x = 3$ : $14$ et $12$.");

  lineaire(13, "4(x + 6)", "52", 7, "Je retire $6$ : $x = 7$");
  lineaire(13, "4x + 6", "52", "11,5", "Je divise par $4$ : $x = 11{,}5$");
  v.ok("13. le piège : x + 6 × 4 n'est pas 4(x + 6)", !memeFn((x) => val("x + 6*4", x), (x) => val("4(x + 6)", x)));
  dit(13, "Réponse : $7$ avec le programme A ; $11{,}5$ avec le programme B.");
  balance(13, 7, ["4(x + 6)", "52"]);

  vaut(14, "x + (x + 3) + (x + 3)", "3x + 6", "Je réduis : $3x + 6 = 36$");
  lineaire(14, "x + (x + 3) + (x + 3)", "36", 10, "Je retire $6$ : $3x = 30$. Donc $x = 10$");
  {
    const t = appel(bloc(14), "triangle");
    const P = t?.[0] ?? {};
    const L = (a, b) => Math.hypot(P[a][0] - P[b][0], P[a][1] - P[b][1]);
    const cotes = t?.[1]?.cotes ?? {};
    const ok = !!t && Math.abs(L("A", "B") - 10) < 1e-9 && Math.abs(L("B", "C") - 13) < 1e-9 && Math.abs(L("C", "A") - 13) < 1e-9;
    v.ok("14. le triangle dessiné mesure 10, 13, 13 (à l'échelle)", ok, t ? `${L("A", "B")}, ${L("B", "C")}, ${L("C", "A")}` : "illisible");
    v.ok("14. ses étiquettes disent 10 cm (base) et 13 cm (côtés égaux)", /10 cm/.test(cotes.AB ?? "") && /13 cm/.test(cotes.BC ?? "") && /13 cm/.test(cotes.CA ?? ""));
  }
  v.ok("14. le piège : x + (x + 3) = 36 donne 16,5", egal(div(Q(33), Q(2)), D("16,5")) && egal(val("x + (x + 3)", D("16,5")), Q(36)));
  dit(14, "Réponse : la base mesure $10$ cm, les deux autres côtés $13$ cm chacun.");

  vaut(15, "3x + 2(x + 4)", "3x + 2x + 8", "Je développe : $3x + 2x + 8 = 28$");
  lineaire(15, "3x + 2(x + 4)", "28", 4, "Je retire $8$ : $5x = 20$. Donc $x = 4$");
  v.ok("15. 4 paniers à 3 + 8 paniers à 2 = 28 points", 4 * 3 + 8 * 2 === 28 && 8 - 4 === 4);
  v.ok("15. le piège : 3x + 2x + 4 = 28 donne 4,8 paniers", egal(val("3x + 2x + 4", D("4,8")), Q(28)));
  dit(15, "soit $4{,}8$ paniers");
  dit(15, "Réponse : $4$ paniers à $3$ points et $8$ paniers à $2$ points.");
  balance(15, 4, ["3x + 2(x + 4)", "28"]);

  lineaire(16, "2(12 + x)", "40 + x", 16, "Je retire $24$ : $x = 16$");
  {
    const { entetes, lignes } = tp(16, 0);
    const ts = entetes.slice(1).map((s) => nb(s));
    const formules = { Emma: "12 + x", "sa mère": "40 + x", "double d'Emma": "2(12 + x)" };
    const fautes = lignes.filter(([nom, ...cases]) => !formules[nom] || cases.some((cs, i) => !egal(nb(cs), val(formules[nom], ts[i]))));
    v.ok("16. tableau des âges recalculé (Emma, sa mère, le double d'Emma)", lignes.length === 3 && fautes.length === 0, fautes.map((l) => l[0]).join(", "));
    const i16 = ts.findIndex((t) => egal(t, Q(16)));
    v.ok("16. la colonne « dans 16 ans » montre la mère au double d'Emma", i16 >= 0 && lignes[1][i16 + 1] === lignes[2][i16 + 1]);
  }
  v.ok("16. le piège : 2 × 12 + x = 40 + x n'a aucune solution", egal(moins(val("2*12 + x", Q(0)), val("40 + x", Q(0))), moins(val("2*12 + x", Q(7)), val("40 + x", Q(7)))) && !egal(val("2*12 + x", Q(0)), val("40 + x", Q(0))));
  dit(16, "$2 \\times 28 = 56$");
  balance(16, 16, ["2(12 + x)", "40 + x"], 0);

  /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
  v.titre("★★★ Problèmes");
  chaine(17, "2(x + x + 37)", "2(2x + 37)", { enonce: false });
  vaut(17, "2(2x + 37)", "4x + 74", "Je développe : $4x + 74 = 346$");
  lineaire(17, "2(2x + 37)", "346", 68, "Je divise par $4$ : $x = 68$");
  v.ok("17. 68 + 37 = 105 ; 105 × 68 = 7 140 ; 3 × 346 = 1 038 > 1 000", 68 + 37 === 105 && 105 * 68 === 7140 && 3 * 346 === 1038 && 1038 > 1000);
  dit(17, "$105 \\times 68 = 7\\,140$ m²");
  dit(17, "$3 \\times 346 = 1\\,038$ m");
  v.ok("17. le piège : 2x + 37 = 346 donne 154,5, plus que 105", egal(val("2x + 37", D("154,5")), Q(346)));
  {
    const t = appel(bloc(17), "terrain");
    v.ok("17. le terrain dessiné : 105 sur 68, étiquettes d'accord", !!t && t[0] === 105 && t[1] === 68 && t[2].endsWith(`${t[0]} m`) && t[3].endsWith(`${t[1]} m`) && t[0] - t[1] === 37 && 2 * (t[0] + t[1]) === 346);
  }
  balance(17, 68, ["2(2x + 37)", "346"]);

  const E = "30\\,000 + 40x", S = "23\\,000 + 110x";
  v.ok("18. à 50 000 km : 32 000 € et 28 500 €", egal(val(E, Q(50)), Q(32000)) && egal(val(S, Q(50)), Q(28500)));
  dit(18, "$30\\,000 + 40 \\times 50 = 32\\,000$ €");
  dit(18, "$23\\,000 + 110 \\times 50 = 28\\,500$ €");
  lineaire(18, E, S, 100, "Je divise par $-70$ : $x = 100$");
  v.ok("18. à x = 100, les deux coûtent 34 000 €", egal(val(E, Q(100)), Q(34000)) && egal(val(S, Q(100)), Q(34000)));
  v.ok("18. 100 000 ÷ 12 000 ≈ 8,3", Math.abs(100000 / 12000 - 8.33) < 0.01);
  dit(18, "$100\\,000 \\div 12\\,000 \\approx 8{,}3$");
  dit(18, "au bout de $100\\,000$ km");
  {
    const { entetes, lignes } = tp(18, 0);
    const xs = entetes.slice(1).map((s) => div(nb(norm(s)), Q(1000)));
    const formules = { "électrique (€)": E, "essence (€)": S };
    const fautes = lignes.filter(([nom, ...cases]) => !formules[nom] || cases.some((cs, i) => !egal(nb(norm(cs)), val(formules[nom], xs[i]))));
    v.ok("18. tableau des coûts recalculé en 0, 50 000, 100 000 et 150 000 km", lignes.length === 2 && xs.length === 4 && fautes.length === 0, fautes.map((l) => l[0]).join(", "));
  }
  balance(18, 100, [E, S]);

  lineaire(19, "424 + 2{,}5x", "450", "10,4", "Je divise par $2{,}5$ : $x = 10{,}4$");
  v.ok("19. 2034 : 449 < 450 ; 2035 : 451,5 > 450", egal(val("424 + 2.5x", Q(10)), Q(449)) && egal(val("424 + 2.5x", Q(11)), D("451,5")));
  dit(19, "$424 + 2{,}5 \\times 10 = 449$ ppm");
  dit(19, "On dépasserait $450$ ppm en 2035.");
  lineaire(19, "280 + 2{,}5x", "424", "57,6", "donc $x = 57{,}6$");
  v.ok("19. de 1750 à 2024 : 274 ans, « environ 270 »", 2024 - 1750 === 274 && c(19).includes("il en a fallu environ $270$"));
  {
    const t = appel(bloc(19), "tableau");
    const ans = (t?.[0] ?? []).slice(1).map(Number);
    const ppm = (t?.[1] ?? []).slice(1);
    v.ok("19. tableau : 424 + 2,5 × (année − 2024), à chaque année", ans.length === 4 && ppm.length === 4 && ans.every((a, i) => egal(val("424 + 2.5x", Q(a - 2024)), nb(ppm[i]))));
    v.ok("19. le tableau montre le passage de 450 entre 2034 et 2035", ans.includes(2034) && ans.includes(2035) && ppm[ans.indexOf(2034)] < 450 && ppm[ans.indexOf(2035)] > 450);
  }
  balance(19, "10,4", ["424 + 2{,}5x", "450"]);

  chaine(20, "3x + 2 \\times 2x + 7{,}195", "7x + 7{,}195");
  lineaire(20, "7x + 7{,}195", "42{,}195", 5, "Je divise par $7$ : $x = 5$");
  v.ok("20. l'erreur : 5x = 35 donne 7, et 3 × 7 + 2 × 14 + 7,195 = 56,195", egal(val("3x + 2x + 7.195", Q(7)), D("42,195")) && egal(plus(Q(3 * 7 + 2 * 14), D("7,195")), D("56,195")));
  dit(20, "$3 \\times 7 + 2 \\times 14 + 7{,}195 = 56{,}195$ km");
  {
    const t = appel(bloc(20), "relais");
    const kms = (t?.[0] ?? []).map((r) => nb(r.km));
    const somme = kms.reduce((a, b) => plus(a, b), Q(0));
    const x = Q(5);
    const motif = [x, fois(Q(2), x), x, fois(Q(2), x), x];
    const noms = (t?.[0] ?? []).map((r) => r.nom).join(",");
    v.ok("20. les relais dessinés : x, 2x, x, 2x, x (x = 5), puis 7,195 — somme 42,195", kms.length === 6 && motif.every((m, i) => egal(m, kms[i])) && egal(kms[5], D("7,195")) && egal(somme, D("42,195")) && noms === "x,2x,x,2x,x,fin");
  }
  dit(20, "$5 + 10 + 5 + 10 + 5 + 7{,}195 = 42{,}195$ km");
  balance(20, 5, ["3x + 2*2x + 7.195", "42.195"]);

  v.titre("Les dessins");
  const dessines = f.blocs.filter((b) => /\n\s+schema:/.test(b)).length;
  const nbBalances = f.blocs.reduce((n, b) => n + [...b.matchAll(/\bbalance\(\[/g)].length, 0);
  v.ok(`${dessines} corrigés dessinés sur 20, dont ${nbBalances} balances`, dessines === 20, String(dessines));
}

lancer({
  nom: "RÉSOUDRE UNE ÉQUATION · 4e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-4e-equations.tsx",
  notionId: "equation_resolution",
  classe: "4e",
  verifier,
  casses: [
    ["ex. 1 : un calcul classé équation", "[\"6 + 5 = 11\", \"oui\", \"non\", \"un calcul\"]", "[\"6 + 5 = 11\", \"oui\", \"non\", \"une équation\"]"],
    ["ex. 2 : la balance finit sur x = 8", "{ g: \"x\", d: \"9\", op: \"÷3\" }", "{ g: \"x\", d: \"8\", op: \"÷3\" }"],
    ["ex. 3 : 13 − 6 au lieu de 6 − 13", "$x = 6 - 13$, donc $x = -7$", "$x = 6 - 13$, donc $x = 7$"],
    ["ex. 3 : l'opération de la balance à l'envers", "{ g: \"x\", d: \"-7\", op: \"−13\" }", "{ g: \"x\", d: \"-7\", op: \"+13\" }"],
    ["ex. 4 : divisé par 2 au lieu de −2", "Je divise par $-2$ : $x = 4$", "Je divise par $-2$ : $x = -4$"],
    ["ex. 5 : le x seul compté pour 0", "{ g: \"5x - 5\", d: \"20\", op: \"je réduis\" }", "{ g: \"4x - 5\", d: \"20\", op: \"je réduis\" }"],
    ["ex. 6 : développé à moitié", "{ g: \"5x - 10\", d: \"35\", op: \"je développe\" }", "{ g: \"5x - 2\", d: \"35\", op: \"je développe\" }"],
    ["ex. 7 : un membre mal calculé", "[\"b) x = 4\", \"5\", \"6\", \"non\"]", "[\"b) x = 4\", \"5\", \"5\", \"non\"]"],
    ["ex. 8 : Sami corrigé de travers", "$5x = 15$, donc $x = 3$", "$5x = 21$, donc $x = 3$"],
    ["ex. 9 : 3x « passé » sans changer de signe", "{ g: \"5x - 5\", d: \"20\", op: \"−3x\" }", "{ g: \"11x - 5\", d: \"20\", op: \"−3x\" }"],
    ["ex. 10 : −(x − 3) = −x − 3", "{ g: \"10 - x\", d: \"2x + 1\", op: \"je développe\" }", "{ g: \"4 - x\", d: \"2x + 1\", op: \"je développe\" }"],
    ["ex. 11 : −2 × 1 = +2", "Je réduis : $4x + 10 = 34$", "Je réduis : $4x + 14 = 34$"],
    ["ex. 12 : une case du tableau fausse", "[\"2x + 6\", \"8\", \"10\", \"11\", \"12\"]", "[\"2x + 6\", \"8\", \"10\", \"11\", \"13\"]"],
    ["ex. 13 : le programme B sans ordre", "Je divise par $4$ : $x = 11{,}5$", "Je divise par $4$ : $x = 13$"],
    ["ex. 14 : le triangle pas à l'échelle", "C: [5, 12]", "C: [5, 10]"],
    ["ex. 15 : 2(x + 4) = 2x + 4", "{ g: \"3x + 2x + 8\", d: \"28\", op: \"je développe\" }", "{ g: \"3x + 2x + 4\", d: \"28\", op: \"je développe\" }"],
    ["ex. 16 : un âge faux dans le tableau", "[\"sa mère\", \"40\", \"48\", \"56\"]", "[\"sa mère\", \"40\", \"48\", \"58\"]"],
    ["ex. 17 : le terrain mal dessiné", "terrain(105, 68,", "terrain(105, 64,"],
    ["ex. 17 : le demi-périmètre", "Je divise par $4$ : $x = 68$", "Je divise par $4$ : $x = 154{,}5$"],
    ["ex. 18 : une case de coût fausse", "[\"essence (€)\", \"23 000\", \"28 500\"", "[\"essence (€)\", \"23 000\", \"28 000\""],
    ["ex. 18 : le signe perdu en divisant par −70", "{ g: \"x\", d: \"100\", op: \"÷−70\" }", "{ g: \"x\", d: \"-100\", op: \"÷−70\" }"],
    ["ex. 19 : 10,4 arrondi au-dessous", "On dépasserait $450$ ppm en 2035.", "On dépasserait $450$ ppm en 2034."],
    ["ex. 19 : une année du tableau fausse", "[\"CO₂ (ppm)\", 424, 439, 449, 451.5]", "[\"CO₂ (ppm)\", 424, 440, 449, 451.5]"],
    ["ex. 20 : deux relais du double comptés 2x", "{ g: \"3x + 4x + 7.195\", d: \"42.195\" }", "{ g: \"3x + 2x + 7.195\", d: \"42.195\" }"],
    ["ex. 20 : un relais mal dessiné", "{ km: 7.195, nom: \"fin\" }", "{ km: 7.2, nom: \"fin\" }"],
    ["une micro d'une autre notion", "micros: [\"equation_reconnaitre\", \"equation_verifier\"]", "micros: [\"litteral_expression_reduire\", \"equation_verifier\"]"],
    ["un $ dans une consigne", "consigne: \"Une règle par exercice.", "consigne: \"Une règle $x$ par exercice."],
    ["un corrigé sans son dessin", "          schema: balance([\n            { g: \"4x + 7\"", "          dessin: balance([\n            { g: \"4x + 7\""],
  ],
});
