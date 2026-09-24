// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Le calcul littéral »
// de 3e (lib/fiches-exercices/maths-3e-calcul-litteral.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé développe et factorise à la main ; ici on ne
// développe RIEN. Chaque forme est lue telle qu'elle est écrite (`evalTex`) et
// évaluée en fractions exactes en neuf valeurs de x (`chaine` : « orig = … =
// forme$ » dans UNE formule du corrigé). Les calculs numériques « a = b = c »
// sont relus membre par membre (`outilsEgalites`).
//
// ⭐⭐ LES DESSINS SONT RELUS : chaque appel `aires(haut, cote, cases)` est lu
// dans le source ; chaque case doit valoir « étiquette de sa ligne × étiquette
// de sa colonne », le rectangle entier doit être le produit de l'énoncé, et la
// somme des cases sa forme développée. Chaque `tableau()` d'un programme de
// calcul est rejoué ÉTAPE PAR ÉTAPE, en JavaScript, sur ses nombres d'entrée.
//
//   node scripts/verifier-exercices-calcul-litteral-3e.mjs

import { Q, egal, evalTex, identiques, lireFeuille, lancer, outilsAlgebre, outilsEgalites } from "./verifier-exercices-commun.mjs";

/** Une étiquette de dessin (« −6x », « 4x² », « 10 000 ») → LaTeX lisible par evalTex. */
const conv = (s) => s.replace(/−/g, "-").replace(/²/g, "^2").replace(/\s+/g, "");

function verifier(source, v) {
  const f = lireFeuille(source);
  const { blocs } = f;
  const { e, c, dit, chaine, vaut } = outilsAlgebre(v, f);
  const eg = outilsEgalites(v, f);
  const val = (tex, x) => evalTex(tex, Q(x));

  /** Le dessin d'aires de l'exercice k, relu dans le source. */
  const dessinAires = (k, produit, developpe, { sansCentre } = {}) => {
    const m = /aires\((\[\[.*?\]\]), (\[\[.*?\]\]), (\[\[.*?\]\])\)/.exec(blocs[k - 1] ?? "");
    if (!m) {
      v.ok(`${k}. un dessin d'aires`, false, "absent");
      return;
    }
    const [haut, cote, cases] = [m[1], m[2], m[3]].map((t) => JSON.parse(t));
    const fautes = [];
    if (cases.length !== cote.length || cases.some((l) => l.length !== haut.length)) fautes.push("nombre de cases");
    cote.forEach(([r], i) =>
      haut.forEach(([h], j) => {
        const cel = cases[i]?.[j];
        if (cel === undefined || !identiques(conv(cel), `(${conv(r)})(${conv(h)})`)) fautes.push(`case ${r} × ${h} : « ${cel} »`);
      }),
    );
    // Même étiquette (au signe près), même longueur dessinée ; longueurs positives.
    const longueurs = {};
    for (const [t, l] of [...haut, ...cote]) {
      const nu = t.replace("−", "");
      if (!(l > 0)) fautes.push(`longueur ${l}`);
      if (longueurs[nu] !== undefined && longueurs[nu] !== l) fautes.push(`« ${t} » dessiné à deux longueurs`);
      longueurs[nu] = l;
    }
    const somme = (l) => l.map((t) => `(${conv(t)})`).join("+");
    const rect = `(${somme(haut.map((h) => h[0]))})(${somme(cote.map((r) => r[0]))})`;
    if (!identiques(rect, produit)) fautes.push(`le rectangle n'est pas ${produit}`);
    const toutes = cases.flat();
    if (!identiques(somme(toutes), developpe)) fautes.push(`les cases ne font pas ${developpe}`);
    if (sansCentre) {
      const centre = cases[1]?.[1];
      const bord = toutes.filter((_, i) => i !== haut.length + 1);
      if (!centre || !identiques(somme(bord), sansCentre)) fautes.push(`le cadre (sans ${centre}) ne fait pas ${sansCentre}`);
    }
    v.ok(`${k}. le dessin : ${toutes.length} aires = ligne × colonne, rectangle ${produit}, total ${developpe}`, fautes.length === 0, fautes.slice(0, 3).join(" | "));
  };

  /** Le `tableau([entête], [ligne])` de l'exercice k, rejoué sur la fonction F. */
  const dessinTableau = (k, F, quoi) => {
    const m = /tableau\((\[[^\]]*\]), (\[[^\]]*\])\)/.exec(blocs[k - 1] ?? "");
    if (!m) {
      v.ok(`${k}. un tableau`, false, "absent");
      return;
    }
    const entete = JSON.parse(m[1].replace(/−/g, "-"));
    const ligne = JSON.parse(m[2].replace(/−/g, "-"));
    const entrees = entete.slice(1).map(Number);
    const valeurs = ligne.slice(1);
    const faux = entrees.filter((x, i) => F(x) !== valeurs[i]);
    v.ok(`${k}. le tableau : ${quoi} en ${entrees.join(" ; ")} → ${valeurs.join(" ; ")}`, entrees.length >= 3 && entrees.length === valeurs.length && faux.length === 0, faux.length ? `faux en ${faux.join(", ")}` : "tableau mal formé");
  };

  v.titre("★ Un seul geste");
  // 1 — la dernière opération commande l'écriture.
  dit(1, "Réponse : $2x + 5$ ; $(x + 4)^2$ ; $x^2 + 4$ ; $3(x - 1)$.");
  v.ok("1. traductions : 2x + 5, (x + 4)², x² + 4, 3(x − 1) en x = 3", egal(val("2x + 5", 3), Q(2 * 3 + 5)) && egal(val("(x + 4)^2", 3), Q((3 + 4) ** 2)) && egal(val("x^2 + 4", 3), Q(3 * 3 + 4)) && egal(val("3(x - 1)", 3), Q(3 * (3 - 1))));
  eg(1, "(2 + 4)^2 = 6^2 = 36");
  eg(1, "2^2 + 4 = 4 + 4 = 8");
  v.ok("1. les pièges ne sont pas les mêmes expressions", !identiques("(x + 4)^2", "x^2 + 4") && !identiques("3x - 1", "3(x - 1)"));

  // 2 — substitution, lue dans l'énoncé.
  v.ok("2. l'énoncé donne A = 3x² − 5x + 2", e(2).includes("$A = 3x^2 - 5x + 2$"));
  eg(2, "3 \\times 2^2 - 5 \\times 2 + 2 = 12 - 10 + 2 = 4");
  eg(2, "3 \\times (-1)^2 - 5 \\times (-1) + 2 = 3 + 5 + 2 = 10");
  eg(2, "3 \\times (-3)^2 - 5 \\times (-3) + 2 = 27 + 15 + 2 = 44");
  eg(2, "-27 + 15 + 2 = -10");
  dessinTableau(2, (x) => 3 * x * x - 5 * x + 2, "A = 3x² − 5x + 2");
  dit(2, "Réponse : $A = 4$ ; $A = 10$ ; $A = 44$.");

  // 3 — réduire.
  chaine(3, "4x + 7 - x + 3", "3x + 10");
  chaine(3, "2x^2 + 5x - x^2 - 8x", "x^2 - 3x");
  chaine(3, "6x \\times 3x", "18x^2");
  chaine(3, "5 - 2x + 3x^2 - 4 + x", "3x^2 - x + 1");
  dessinAires(3, "6x \\times 3x", "18x^2");

  // 4 — développer (simple).
  chaine(4, "7(x - 3)", "7x - 21");
  chaine(4, "-4(2x - 5)", "-8x + 20");
  chaine(4, "3x(x + 6)", "3x^2 + 18x");
  chaine(4, "12 - 2(x + 4)", "4 - 2x");
  v.ok("4. le piège 10(x + 4) n'est pas 12 − 2(x + 4)", !identiques("10(x + 4)", "12 - 2(x + 4)"));
  dessinAires(4, "3x(x + 6)", "3x^2 + 18x");

  // 5 — double distributivité.
  chaine(5, "(x + 5)(x + 3)", "x^2 + 8x + 15");
  chaine(5, "(2x - 1)(x + 4)", "2x^2 + 7x - 4");
  dessinAires(5, "(x + 5)(x + 3)", "x^2 + 8x + 15");

  // 6 — factoriser.
  chaine(6, "8x + 20", "4(2x + 5)");
  chaine(6, "9x^2 - 15x", "3x(3x - 5)");
  chaine(6, "x^2 + x", "x(x + 1)");
  chaine(6, "(x + 1)(2x + 3) + (x + 1)(x - 5)", "(x + 1)(3x - 2)");
  dessinAires(6, "4(2x + 5)", "8x + 20");

  // 7 — identités, développer.
  chaine(7, "(x + 6)^2", "x^2 + 12x + 36");
  chaine(7, "(x - 2)^2", "x^2 - 4x + 4");
  chaine(7, "(x + 10)(x - 10)", "x^2 - 100");
  eg(7, "(1 + 6)^2 = 49");
  eg(7, "1^2 + 36 = 37");
  dessinAires(7, "(x + 6)^2", "x^2 + 12x + 36");

  // 8 — différence de deux carrés.
  chaine(8, "x^2 - 25", "(x - 5)(x + 5)");
  chaine(8, "49 - x^2", "(7 - x)(7 + x)");
  chaine(8, "4x^2 - 9", "(2x - 3)(2x + 3)");
  v.ok("8. les pièges : (x − 5)² ≠ x² − 25, (4x − 3)(4x + 3) ≠ 4x² − 9", !identiques("(x - 5)^2", "x^2 - 25") && !identiques("(4x - 3)(4x + 3)", "4x^2 - 9") && identiques("(x - 5)^2", "x^2 - 10x + 25"));
  dit(8, "$(x - 5)^2 = x^2 - 10x + 25$");
  dessinAires(8, "(2x - 3)(2x + 3)", "4x^2 - 9");

  v.titre("★★ Type devoir");
  // 9 — le sujet de brevet.
  chaine(9, "(2x - 3)^2", "4x^2 - 12x + 9");
  vaut(9, "(2x - 3)^2 - 16", "4x^2 - 12x - 7", "$E = 4x^2 - 12x + 9 - 16 = 4x^2 - 12x - 7$");
  vaut(9, "(2x - 3)^2 - 16", "(2x - 7)(2x + 1)", "$E = (2x - 3 - 4)(2x - 3 + 4) = (2x - 7)(2x + 1)$");
  v.ok("9. (2x − 3 − 4)(2x − 3 + 4) est bien E", identiques("(2x - 3 - 4)(2x - 3 + 4)", "(2x - 3)^2 - 16"));
  dit(9, "Réponse : $E = 4x^2 - 12x - 7 = (2x - 7)(2x + 1)$");
  v.ok("9. E(0) = −7 et E(3,5) = 0", egal(val("(2x - 3)^2 - 16", 0), Q(-7)) && egal(evalTex("(2x - 3)^2 - 16", Q(7, 2)), Q(0)));
  eg(9, "4 \\times 0^2 - 12 \\times 0 - 7 = -7");
  eg(9, "2 \\times 3{,}5 - 7 = 0");
  dit(9, "$E = 0 \\times 8 = 0$");
  v.ok("9. 2 × 3,5 + 1 = 8", 2 * 3.5 + 1 === 8);
  dessinAires(9, "(2x - 3)^2", "4x^2 - 12x + 9");

  // 10 — développer, le moins devant le carré.
  chaine(10, "(x + 4)(x - 2)", "x^2 + 2x - 8");
  chaine(10, "(x - 3)^2", "x^2 - 6x + 9");
  vaut(10, "(x + 4)(x - 2) - (x - 3)^2", "8x - 17", "- 9 = 8x - 17$");
  eg(10, "4 \\times (-2) - (-3)^2 = -8 - 9 = -17");
  dessinAires(10, "(x + 4)(x - 2)", "x^2 + 2x - 8");

  // 11 — le programme de calcul, rejoué étape par étape.
  const prog11 = (n) => {
    let r = n + 5;
    r = r * r;
    return r - n * n;
  };
  v.ok("11. le programme donne 35 avec 1 et −5 avec −3", prog11(1) === 35 && prog11(-3) === -5);
  dit(11, "puis $36 - 1^2 = 35$");
  eg(11, "4 - (-3)^2 = 4 - 9 = -5");
  chaine(11, "(x + 5)^2", "x^2 + 10x + 25", { enonce: false });
  vaut(11, "(x + 5)^2 - x^2", "10x + 25", "= x^2 + 10x + 25 - x^2 = 10x + 25$");
  chaine(11, "10x + 25", "5(2x + 5)");
  v.ok("11. le programme vaut 10n + 25 et un multiple de 5 pour n de −50 à 50", [...Array(101).keys()].map((i) => i - 50).every((n) => prog11(n) === 10 * n + 25 && prog11(n) % 5 === 0));
  dessinTableau(11, prog11, "le programme");

  // 12 — facteur commun, avec le moins.
  vaut(12, "(2x + 1)(x - 4) - (2x + 1)(3x + 2)", "(2x + 1)(-2x - 6)", "Donc $C = (2x + 1)(-2x - 6)$");
  chaine(12, "(x - 4) - (3x + 2)", "-2x - 6", { enonce: false });
  vaut(12, "(2x + 1)(x - 4) - (2x + 1)(3x + 2)", "-2(2x + 1)(x + 3)", "$C = -2(2x + 1)(x + 3)$");
  v.ok("12. le piège x − 4 − 3x + 2 donne autre chose", !identiques("(2x + 1)(x - 4 - 3x + 2)", "(2x + 1)(x - 4) - (2x + 1)(3x + 2)"));

  // 13 — calcul mental.
  eg(13, "101^2 = (100 + 1)^2 = 100^2 + 2 \\times 100 \\times 1 + 1^2 = 10\\,000 + 200 + 1 = 10\\,201");
  eg(13, "99^2 = (100 - 1)^2 = 100^2 - 2 \\times 100 \\times 1 + 1^2 = 10\\,000 - 200 + 1 = 9\\,801");
  eg(13, "102 \\times 98 = (100 + 2)(100 - 2) = 100^2 - 2^2 = 10\\,000 - 4 = 9\\,996");
  v.ok("13. 101² = 10 201, 99² = 9 801, 102 × 98 = 9 996 (multiplications directes)", 101 * 101 === 10201 && 99 * 99 === 9801 && 102 * 98 === 9996);
  dit(13, "Réponse : $10\\,201$ ; $9\\,801$ ; $9\\,996$.");
  dessinAires(13, "101^2", "10\\,201");

  // 14 — preuve.
  chaine(14, "(x + 1)^2", "x^2 + 2x + 1");
  chaine(14, "(x - 1)^2", "x^2 - 2x + 1");
  vaut(14, "(x + 1)^2 - (x - 1)^2", "4x", "= x^2 + 2x + 1 - x^2 + 2x - 1 = 4x$");
  eg(14, "1\\,001^2 - 999^2 = 4 \\times 1\\,000 = 4\\,000");
  v.ok("14. le piège donne 2", identiques("x^2 + 2x + 1 - x^2 - 2x + 1", "2"));
  dessinTableau(14, (x) => (x + 1) ** 2 - (x - 1) ** 2, "(x + 1)² − (x − 1)²");

  // 15 — rectangle.
  chaine(15, "2(2x + 3 + x - 1)", "6x + 4", { enonce: false });
  chaine(15, "(2x + 3)(x - 1)", "2x^2 + x - 3", { enonce: false });
  v.ok("15. l'énoncé donne 2x + 3 et x − 1", e(15).includes("$2x + 3$") && e(15).includes("$x - 1$"));
  eg(15, "6 \\times 4 + 4 = 28");
  eg(15, "2 \\times 4^2 + 4 - 3 = 33");
  eg(15, "11 \\times 3 = 33");
  v.ok("15. pour x = 4 : 11 m sur 3 m, périmètre 2(11 + 3) = 28", egal(val("2x + 3", 4), Q(11)) && egal(val("x - 1", 4), Q(3)) && 2 * (11 + 3) === 28);
  dessinAires(15, "(2x + 3)(x - 1)", "2x^2 + x - 3");

  // 16 — vrai ou faux.
  const verdicts = [identiques("(x + 5)^2", "x^2 + 25"), identiques("2(x + 4) - 3", "2x + 5"), identiques("(x - 4)(x + 4)", "x^2 - 16"), [0.5, 1, 2, 3, -1].every((x) => x * x > x)];
  v.ok("16. faux, vrai, vrai, faux", JSON.stringify(verdicts) === "[false,true,true,false]");
  ["a", "b", "c", "d"].forEach((l, i) => dit(16, `${l}) ${verdicts[i] ? "VRAI" : "FAUX"}.`));
  dit(16, "Réponse : faux, vrai, vrai, faux.");
  eg(16, "(1 + 5)^2 = 36");
  eg(16, "1^2 + 25 = 26");
  chaine(16, "(x + 5)^2", "x^2 + 10x + 25");
  chaine(16, "2(x + 4) - 3", "2x + 5");
  chaine(16, "(x - 4)(x + 4)", "x^2 - 16");
  eg(16, "0{,}5^2 = 0{,}25");

  v.titre("★★★ Problèmes");
  // 17 — le potager.
  eg(17, "10^2 = 100");
  eg(17, "14 \\times 6 = 84");
  v.ok("17. x = 10 : 14 × 6 = 100 − 16", (10 + 4) * (10 - 4) === 100 - 16);
  chaine(17, "(x + 4)(x - 4)", "x^2 - 16", { enonce: false });
  v.ok("17. la perte vaut 16 pour tout x", identiques("x^2 - (x + 4)(x - 4)", "16"));
  dessinAires(17, "(x + 4)(x - 4)", "x^2 - 16");

  // 18 — le cadre.
  chaine(18, "(40 + 2x)(30 + 2x)", "4x^2 + 140x + 1\\,200", { enonce: false });
  vaut(18, "(40 + 2x)(30 + 2x) - 1\\,200", "4x^2 + 140x", "Aire du cadre : $4x^2 + 140x + 1\\,200 - 1\\,200 = 4x^2 + 140x$");
  vaut(18, "4x^2 + 80x + 60x", "4x^2 + 140x", "$4x^2 + 80x + 60x = 4x^2 + 140x$");
  eg(18, "4 \\times 5^2 + 140 \\times 5 = 100 + 700 = 800");
  eg(18, "50 \\times 40 - 1\\,200 = 2\\,000 - 1\\,200 = 800");
  v.ok("18. pour x = 5 : 50 cm sur 40 cm", 40 + 2 * 5 === 50 && 30 + 2 * 5 === 40);
  dessinAires(18, "(40 + 2x)(30 + 2x)", "4x^2 + 140x + 1200", { sansCentre: "4x^2 + 140x" });

  // 19 — deux entiers qui se suivent (la lettre n, lue comme x).
  const nx = (s) => s.replace(/n/g, "x");
  eg(19, "10^2 - 9^2 = 100 - 81 = 19");
  v.ok("19. 9 + 10 = 19", 9 + 10 === 19);
  const p19 = "(n + 1)^2 - n^2 = n^2 + 2n + 1 - n^2 = 2n + 1";
  v.ok(`19. ${p19}`, identiques(nx("(n + 1)^2 - n^2"), nx("2n + 1")) && identiques(nx("n^2 + 2n + 1 - n^2"), nx("2n + 1")) && c(19).includes(`$${p19}$`));
  v.ok("19. n + (n + 1) = 2n + 1", identiques(nx("n + (n + 1)"), nx("2n + 1")) && c(19).includes("$n + (n + 1) = 2n + 1$"));
  eg(19, "500^2 - 499^2 = 499 + 500 = 999");
  dessinTableau(19, (n) => (n + 1) ** 2 - n * n, "(n + 1)² − n²");
  v.ok("19. et chaque case du tableau est aussi n + (n + 1)", [3, 9, 20, 99].every((n) => (n + 1) ** 2 - n * n === n + (n + 1)));

  // 20 — deux programmes.
  const progA = (n) => (n + 14) * n + 49;
  const progB = (n) => (n + 7) * (n + 7);
  eg(20, "(1 + 14) \\times 1 + 49 = 15 + 49 = 64");
  eg(20, "(1 + 7)^2 = 8^2 = 64");
  eg(20, "(-5 + 14) \\times (-5) + 49 = -45 + 49 = 4");
  eg(20, "(-5 + 7)^2 = 2^2 = 4");
  v.ok("20. A(1) = B(1) = 64, A(−5) = B(−5) = 4", progA(1) === 64 && progB(1) === 64 && progA(-5) === 4 && progB(-5) === 4);
  chaine(20, "(x + 14)x + 49", "x^2 + 14x + 49", { enonce: false });
  chaine(20, "(x + 7)^2", "x^2 + 14x + 49", { enonce: false });
  v.ok("20. A et B coïncident de −50 à 50, et seul −7 donne 0", [...Array(101).keys()].map((i) => i - 50).every((n) => progA(n) === progB(n) && progB(n) >= 0 && (progB(n) === 0) === (n === -7)));
  dit(20, "pour $x = -7$");
  dessinTableau(20, (n) => (progA(n) === progB(n) ? progA(n) : NaN), "A et B");
}

lancer({
  nom: "LE CALCUL LITTÉRAL · 3e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-3e-calcul-litteral.tsx",
  notionId: "litteral_calcul",
  classe: "3e",
  verifier,
  casses: [
    ["ex. 1 : le triple sans parenthèses", "$x^2 + 4$ ; $3(x - 1)$.", "$x^2 + 4$ ; $3x - 1$."],
    ["ex. 2 : une valeur du tableau fausse", "[\"A\", 4, 10, 44]", "[\"A\", 4, 10, -10]"],
    ["ex. 3 : les familles mélangées", "+ x = 3x^2 - x + 1$", "+ x = 3x^2 - 3x + 1$"],
    ["ex. 4 : le moins oublié devant 2", "- 8 = 4 - 2x$", "- 8 = 4 + 2x$"],
    ["ex. 5 : une aire du dessin fausse", "[[\"x²\", \"5x\"], [\"3x\", \"15\"]]", "[[\"x²\", \"5x\"], [\"3x\", \"8\"]]"],
    ["ex. 6 : le crochet mal réduit", "= (x + 1)(3x - 2)$", "= (x + 1)(3x + 8)$"],
    ["ex. 7 : (a + b)² = a² + b²", "6^2 = x^2 + 12x + 36$", "6^2 = x^2 + 36$"],
    ["ex. 7 : un rectangle du carré oublié", "[[\"x²\", \"6x\"], [\"6x\", \"36\"]]", "[[\"x²\", \"6x\"], [\"x\", \"36\"]]"],
    ["ex. 8 : la racine de 4x² prise pour 4x", "3^2 = (2x - 3)(2x + 3)$", "3^2 = (4x - 3)(4x + 3)$"],
    ["ex. 9 : un signe faux dans la factorisation", "3 + 4) = (2x - 7)(2x + 1)$", "3 + 4) = (2x - 7)(2x - 1)$"],
    ["ex. 10 : le moins sur le premier terme seulement", "- 9 = 8x - 17$", "- 9 = -4x - 17$"],
    ["ex. 11 : le programme mal rejoué", "[\"Résultat\", 35, 45, -5, 125]", "[\"Résultat\", 35, 45, 5, 125]"],
    ["ex. 12 : le crochet x − 4 − 3x + 2", "Donc $C = (2x + 1)(-2x - 6)$", "Donc $C = (2x + 1)(-2x - 2)$"],
    ["ex. 13 : le petit carré du dessin faux", "[[\"10 000\", \"100\"], [\"100\", \"1\"]]", "[[\"10 000\", \"100\"], [\"100\", \"10\"]]"],
    ["ex. 14 : une case du tableau fausse", "[\"(x+1)² − (x−1)²\", 4, 12, 40]", "[\"(x+1)² − (x−1)²\", 4, 12, 44]"],
    ["ex. 15 : l'aire mal réduite", "3x - 3 = 2x^2 + x - 3$", "3x - 3 = 2x^2 - 5x - 3$"],
    ["ex. 16 : l'identité déclarée fausse", "c) VRAI.", "c) FAUX."],
    ["ex. 17 : le petit carré compté positif", "[\"−4x\", \"−16\"]", "[\"−4x\", \"16\"]"],
    ["ex. 18 : une bande du cadre fausse", "[\"30x\", \"1 200\", \"30x\"]", "[\"30x\", \"1 200\", \"40x\"]"],
    ["ex. 18 : l'aire du cadre fausse", "100 + 700 = 800$", "100 + 700 = 900$"],
    ["ex. 19 : un essai du tableau faux", "41, 199]", "41, 198]"],
    ["ex. 19 : la différence des carrés fausse", "= 499 + 500 = 999$", "= 499 + 500 = 998$"],
    ["ex. 20 : B mal calculé", "B donne $(-5 + 7)^2 = 2^2 = 4$", "B donne $(-5 + 7)^2 = 3^2 = 9$"],
    ["ex. 20 : le zéro mal placé", "[\"A et B\", 64, 100, 4, 0]", "[\"A et B\", 64, 100, 4, 49]"],
    ["une micro d'une autre notion", "micros: [\"litteral_reduire\"],", "micros: [\"entier_racine_calculer\"],"],
    ["un $ dans un canvas", "tableau([\"x\", \"2\", \"−1\", \"−3\"]", "tableau([\"$x$\", \"2\", \"−1\", \"−3\"]"],
    ["une formule dans une consigne", "Je vérifie en remplaçant la lettre par un nombre.", "Je vérifie en remplaçant $x$ par un nombre."],
  ],
});
