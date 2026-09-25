// Recalcul INDÉPENDANT des vingt corrigés de la feuille « La distributivité »
// de 4e (lib/fiches-exercices/maths-4e-distributivite.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé développe à la main ; ici on ne développe RIEN.
// Chaque forme est lue telle qu'elle est écrite (`evalTex`) et évaluée en
// fractions exactes en neuf valeurs de x (`chaine` : « orig = … = forme$ » dans
// UNE formule du corrigé). Les calculs numériques « a = b = c » sont relus
// membre par membre (`outilsEgalites`).
//
// ⭐⭐ LES DESSINS SONT RELUS : chaque appel `aires(haut, cote, cases)` est lu
// dans le source ; chaque case doit valoir « étiquette de sa ligne × étiquette
// de sa colonne », le rectangle entier doit être le produit de l'énoncé, et la
// somme des cases sa forme développée. Chaque `trace` est recalculée colonne par
// colonne (l'en-tête d'une colonne EST sa formule), chaque `tableau()` rejoué,
// chaque `grille` recoupée avec l'énoncé, et le calendrier de septembre 2026
// redemandé à `Date`. Les corrigés dessinés sont COMPTÉS : vingt sur vingt.
//
//   node scripts/verifier-exercices-distributivite-4e.mjs

import { Q, egal, evalTex, identiques, lireFeuille, lancer, outilsAlgebre, outilsEgalites, tex } from "./verifier-exercices-commun.mjs";

/** Une étiquette de dessin (« −6x », « 4x² », « 7 140 », « 2(x − 1) ») → LaTeX lisible par evalTex. */
const conv = (s) => String(s).replace(/−/g, "-").replace(/²/g, "^2").replace(/×/g, "\\times").replace(/\s+/g, "");
/** Un nombre d'un tableau (« −3 », 22, « 30,5 ») → fraction exacte. */
const nombre = (s) => evalTex(conv(String(s).replace(",", "{,}")), Q(0));
const json = (t) => JSON.parse(t);

function verifier(source, v) {
  const f = lireFeuille(source);
  const { blocs, corrections } = f;
  const { e, c, dit, chaine, vaut } = outilsAlgebre(v, f);
  const eg = outilsEgalites(v, f);
  const val = (t, x) => evalTex(t, typeof x === "object" ? x : Q(x));

  /* ── Ce qui vaut pour toute la feuille ─────────────────────────────────── */
  v.titre("Les corrigés dessinés");
  const dessines = blocs.filter((bl) => /\n\s+schema:/.test(bl)).length;
  v.ok(`${dessines} corrigés dessinés sur 20`, dessines === 20, "Frédéric : des schémas dans la grande majorité des corrigés");
  const sansReponse = corrections.findIndex((t) => !t.split("\\n").at(-1).startsWith("Réponse : "));
  v.ok("chaque corrigé finit par sa ligne « Réponse : »", sansReponse === -1, `corrigé ${sansReponse + 1}`);
  const sansPiege = corrections.findIndex((t) => !t.includes("⛔ Le piège"));
  v.ok("chaque corrigé nomme son piège", sansPiege === -1, `corrigé ${sansPiege + 1}`);
  // ⛔ Hors programme de cette feuille : les identités remarquables ont la leur.
  v.ok("aucune identité remarquable écrite (pas de (a + b)² ni de a² − b² à reconnaître)", !/\)\^2|identit/i.test(f.textes.join(" ")));
  // ⛔ Un dessin ne passe pas par KaTeX : aucun `$` dans ses arguments.
  const appels = f.series.split("\n").filter((l) => /\b(aires|trace|grille|tableau|calendrier)\(/.test(l));
  v.ok(`aucun $ dans les ${appels.length} lignes de dessin`, appels.length >= 20 && appels.every((l) => !l.includes("$")), appels.find((l) => l.includes("$"))?.trim().slice(0, 100));

  /* ── Les lecteurs de dessins ───────────────────────────────────────────── */
  const tousAires = (k) => [...(blocs[k - 1] ?? "").matchAll(/aires\((\[\[.*?\]\]), (\[\[.*?\]\]), (\[\[.*?\]\])\)/g)].map((m) => [m[1], m[2], m[3]].map((t) => json(t)));
  /** Lisible au téléphone : 12 px dans un viewBox de G + W + 6 rendu à 235 px. */
  let airesLus = 0;
  const trop = [];
  blocs.forEach((_, i) =>
    tousAires(i + 1).forEach(([haut]) => {
      airesLus++;
      const W = haut.reduce((s, [, l]) => s + l, 0);
      if ((12 * 235) / (44 + W + 6) < 11) trop.push(`${i + 1} : largeur ${44 + W + 6}`);
    }),
  );
  v.ok(`${airesLus} dessins d'aires, tous lisibles à 375 px (≥ 11 px effectifs)`, trop.length === 0, trop.join(" | "));

  const dessinAires = (k, n, produit, developpe) => {
    const a = tousAires(k)[n];
    if (!a) {
      v.ok(`${k}. le dessin d'aires n° ${n + 1}`, false, "absent");
      return;
    }
    const [haut, cote, cases] = a;
    const fautes = [];
    if (cases.length !== cote.length || cases.some((l) => l.length !== haut.length)) fautes.push("nombre de cases");
    cote.forEach(([r], i) =>
      haut.forEach(([h], j) => {
        const cel = cases[i]?.[j];
        if (cel === undefined || !identiques(conv(cel), `(${conv(r)})(${conv(h)})`)) fautes.push(`case ${r} × ${h} : « ${cel} »`);
      }),
    );
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
    v.ok(`${k}. le dessin : ${toutes.length} aires = ligne × colonne, rectangle ${produit}, total ${developpe}`, fautes.length === 0, fautes.slice(0, 3).join(" | "));
    return a;
  };

  const traceDe = (k) => {
    const m = /trace\((\[[^\]]*\]), (\[\[.*?\]\])\)/.exec(blocs[k - 1] ?? "");
    return m ? { entete: json(m[1]), lignes: json(m[2]) } : null;
  };
  const grilleDe = (k) => {
    const m = /grille\((\[[^\]]*\]), (\[\[.*?\]\])\)/.exec(blocs[k - 1] ?? "");
    return m ? { entete: json(m[1]), lignes: json(m[2]) } : null;
  };
  const dessinTableau = (k, F, quoi) => {
    const m = /tableau\((\[[^\]]*\]), (\[[^\]]*\])\)/.exec(blocs[k - 1] ?? "");
    if (!m) {
      v.ok(`${k}. un tableau`, false, "absent");
      return null;
    }
    const entete = json(m[1]);
    const ligne = json(m[2]);
    const entrees = entete.slice(1).map((t) => nombre(t));
    const valeurs = ligne.slice(1).map((t) => nombre(t));
    const faux = entrees.filter((x, i) => !egal(F(x), valeurs[i]));
    v.ok(`${k}. le tableau : ${quoi} en ${entete.slice(1).join(" ; ")} → ${ligne.slice(1).join(" ; ")}`, entrees.length >= 3 && entrees.length === valeurs.length && faux.length === 0, faux.length ? `faux en ${faux.map((x) => x.n).join(", ")}` : "tableau mal formé");
    return entrees;
  };

  /* ── ★ Un seul geste ───────────────────────────────────────────────────── */
  v.titre("★ Un seul geste");
  // 1 — distributivité simple.
  chaine(1, "6(x + 2)", "6x + 12");
  chaine(1, "4(3x + 5)", "12x + 20");
  chaine(1, "8(x - 3)", "8x - 24");
  chaine(1, "x(x + 7)", "x^2 + 7x");
  dessinAires(1, 0, "6(x + 2)", "6x + 12");
  v.ok("1. le piège 6x + 2 n'est pas 6(x + 2)", !identiques("6x + 2", "6(x + 2)"));
  dit(1, "Réponse : $6x + 12$ ; $12x + 20$ ; $8x - 24$ ; $x^2 + 7x$.");

  // 2 — les signes.
  chaine(2, "-3(x + 6)", "-3x - 18");
  chaine(2, "-5(2x - 4)", "-10x + 20");
  chaine(2, "-(x - 9)", "-x + 9");
  chaine(2, "-7(1 - x)", "-7 + 7x");
  eg(2, "(-5) \\times (-4) = 20");
  dessinAires(2, 0, "-3(x + 6)", "-3x - 18");
  v.ok("2. le piège −10x − 20 n'est pas −5(2x − 4)", !identiques("-10x - 20", "-5(2x - 4)"));
  dit(2, "Réponse : $-3x - 18$ ; $-10x + 20$ ; $-x + 9$ ; $-7 + 7x$.");

  // 3 — quatre produits.
  eg(3, "2 \\times 2 = 4");
  chaine(3, "(x + 6)(x + 4)", "x^2 + 10x + 24");
  v.ok("3. les quatre produits écrits sont ceux des termes", ["$x \\times x = x^2$", "$x \\times 4 = 4x$", "$6 \\times x = 6x$", "$6 \\times 4 = 24$"].every((p) => c(3).includes(p)) && identiques("x^2 + 4x + 6x + 24", "(x + 6)(x + 4)"));
  dessinAires(3, 0, "(x + 6)(x + 4)", "x^2 + 10x + 24");
  v.ok("3. le piège x² + 24 n'est pas le produit", !identiques("x^2 + 24", "(x + 6)(x + 4)"));

  // 4 — double, avec des signes.
  chaine(4, "(x + 7)(x - 2)", "x^2 + 5x - 14");
  chaine(4, "(3x + 1)(x + 5)", "3x^2 + 16x + 5");
  eg(4, "7 \\times (-2) = -14");
  dessinAires(4, 0, "(x + 7)(x - 2)", "x^2 + 5x - 14");

  // 5 — développer puis réduire ; la trace rejoue le c).
  chaine(5, "5(x + 2) + 3x", "8x + 10");
  chaine(5, "4(2x - 1) - 5x", "3x - 4");
  chaine(5, "2(x + 3) + 4(x - 1)", "6x + 2");
  v.ok("5. le piège 5(4x + 2) n'est pas 5(x + 2) + 3x", !identiques("5(4x + 2)", "5(x + 2) + 3x"));
  {
    const t = traceDe(5);
    const formules = t ? t.entete.slice(1).map(conv) : [];
    const ok = !!t && t.lignes.length >= 3 && identiques(formules[0], "2(x + 3) + 4(x - 1)") && identiques(formules[1], "6x + 2") && t.lignes.every(([x, ...r]) => r.every((y, j) => egal(val(formules[j], nombre(x)), nombre(y))));
    v.ok("5. la trace : chaque case recalculée sur la formule de sa colonne", ok, JSON.stringify(t));
  }

  // 6 — reconnaître la forme : la DERNIÈRE opération, calculée ici sur le texte.
  const forme = (s) => {
    const t = conv(s);
    let prof = 0;
    let somme = false;
    for (let i = 0; i < t.length; i++) {
      if (t[i] === "(") prof++;
      else if (t[i] === ")") prof--;
      else if (prof === 0 && i > 0 && (t[i] === "+" || t[i] === "-")) somme = true;
    }
    return somme ? (t.includes("(") ? "somme à ouvrir" : "somme") : "produit";
  };
  {
    const exprs = [...e(6).matchAll(/\$([A-E]) = ([^$]*)\$/g)].map((m) => [m[1], m[2]]);
    const g = grilleDe(6);
    const okGrille = !!g && exprs.length === 5 && g.lignes.length === 5 && g.lignes.every(([ex, fo], i) => identiques(conv(ex), exprs[i][1]) && fo === forme(exprs[i][1]));
    v.ok(`6. la grille : ${exprs.map(([l, x]) => `${l} ${forme(x)}`).join(", ")}`, okGrille, JSON.stringify(g?.lignes));
    const produits = exprs.filter(([, x]) => forme(x) === "produit").map(([l]) => `$${l}$`);
    const sommes = exprs.filter(([, x]) => forme(x) !== "produit").map(([l]) => `$${l}$`);
    dit(6, `Réponse : ${produits.join(" et ")} sont des produits ; ${sommes.slice(0, -1).join(", ")} et ${sommes.at(-1)} sont des sommes`);
    vaut(6, "4(x - 5)", "4x - 20", "$A = 4x - 20$");
    vaut(6, "(x + 3)(2x - 1)", "2x^2 + 5x - 3", "$C = 2x^2 - x + 6x - 3 = 2x^2 + 5x - 3$");
    v.ok("6. C : 2x² − x + 6x − 3 est bien le produit", identiques("2x^2 - x + 6x - 3", "(x + 3)(2x - 1)"));
    vaut(6, "7 + 2(x + 1)", "2x + 9", "$E = 7 + 2x + 2 = 2x + 9$");
    v.ok("6. pour x = 0 : A = −20 et B = −5", egal(val("4(x - 5)", 0), Q(-20)) && egal(val("4x - 5", 0), Q(-5)) && c(6).includes("$A = -20$, mais $B = -5$"));
  }

  // 7 — le test numérique, lu dans l'énoncé.
  {
    const egalites = [...e(7).matchAll(/([abc])\) \$([^$=]*) = ([^$]*)\$/g)].map((m) => ({ l: m[1], g: m[2], d: m[3] }));
    const t = traceDe(7);
    const verdicts = egalites.map(({ g, d }) => identiques(g, d));
    const okTrace = !!t && egalites.length === 3 && t.lignes.every(([lettre, a, b], i) => lettre === `${egalites[i].l})` && egal(nombre(a), val(egalites[i].g, 2)) && egal(nombre(b), val(egalites[i].d, 2)));
    v.ok("7. la trace : les deux côtés de chaque égalité, recalculés en x = 2", okTrace, JSON.stringify(t?.lignes));
    v.ok("7. en x = 2, seul le c) donne deux côtés égaux — et lui seul est vrai pour tout x", JSON.stringify(egalites.map(({ g, d }) => egal(val(g, 2), val(d, 2)))) === "[false,false,true]" && JSON.stringify(verdicts) === "[false,false,true]");
    eg(7, "5(2 + 3) = 5 \\times 5 = 25");
    eg(7, "5 \\times 2 + 3 = 13");
    eg(7, "(2 + 6)(2 + 3) = 8 \\times 5 = 40");
    eg(7, "2^2 + 18 = 22");
    eg(7, "3(2 \\times 2 - 5) = 3 \\times (-1) = -3");
    eg(7, "6 \\times 2 - 15 = -3");
    chaine(7, "5(x + 3)", "5x + 15");
    chaine(7, "(x + 6)(x + 3)", "x^2 + 9x + 18");
    chaine(7, "3(2x - 5)", "6x - 15");
    dit(7, "Réponse : a) faux, $5x + 15$ ; b) faux, $x^2 + 9x + 18$ ; c) juste.");
  }

  // 8 — calcul mental.
  eg(8, "6 \\times 103 = 6 \\times (100 + 3) = 600 + 18 = 618");
  eg(8, "9 \\times 48 = 9 \\times (50 - 2) = 450 - 18 = 432");
  eg(8, "25 \\times 12 = 25 \\times (10 + 2) = 250 + 50 = 300");
  eg(8, "15 \\times 99 = 15 \\times (100 - 1) = 1\\,500 - 15 = 1\\,485");
  v.ok("8. multiplications directes : 618, 432, 300, 1 485", 6 * 103 === 618 && 9 * 48 === 432 && 25 * 12 === 300 && 15 * 99 === 1485);
  eg(8, "6 \\times 100 + 3 = 603");
  dessinAires(8, 0, "6 \\times 103", "618");
  dit(8, "Réponse : $618$ ; $432$ ; $300$ ; $1\\,485$.");

  /* ── ★★ Type devoir ────────────────────────────────────────────────────── */
  v.titre("★★ Type devoir");
  // 9 — deux produits, le second avec −4.
  chaine(9, "3(2x + 5)", "6x + 15");
  chaine(9, "-4(x - 2)", "-4x + 8", { enonce: false });
  vaut(9, "3(2x + 5) - 4(x - 2)", "2x + 23", "$A = 6x + 15 - 4x + 8 = 2x + 23$");
  v.ok("9. 6x + 15 − 4x + 8 est bien A", identiques("6x + 15 - 4x + 8", "3(2x + 5) - 4(x - 2)"));
  eg(9, "3(2 \\times 10 + 5) - 4(10 - 2) = 75 - 32 = 43");
  eg(9, "2 \\times 10 + 23 = 43");
  v.ok("9. le piège −4x − 8 n'est pas −4(x − 2)", !identiques("-4x - 8", "-4(x - 2)"));
  dessinAires(9, 0, "3(2x + 5)", "6x + 15");
  dessinAires(9, 1, "-4(x - 2)", "-4x + 8");

  // 10 — double, deux signes moins.
  chaine(10, "(2x - 3)(x + 4)", "2x^2 + 5x - 12");
  chaine(10, "(x - 6)(x - 1)", "x^2 - 7x + 6");
  eg(10, "(-1) \\times (-6) = 6");
  dessinAires(10, 0, "(x - 6)(x - 1)", "x^2 - 7x + 6");

  // 11 — la terrasse.
  chaine(11, "4(x + 6)", "4x + 24", { enonce: false });
  chaine(11, "2(x + 6) + 2 \\times 4", "2x + 20", { enonce: false });
  v.ok("11. l'énoncé donne 4 m et x + 6", e(11).includes("$4$ m de large") && e(11).includes("$x + 6$ mètres"));
  eg(11, "4 \\times 2{,}5 + 24 = 34");
  eg(11, "2 \\times 2{,}5 + 20 = 25");
  eg(11, "8{,}5 \\times 4 = 34");
  v.ok("11. pour x = 2,5 : 8,5 m sur 4 m, périmètre 2(8,5 + 4) = 25", egal(val("x + 6", Q(5, 2)), Q(17, 2)) && egal(val("2(8{,}5 + 4)", 0), Q(25)));
  dessinAires(11, 0, "4(x + 6)", "4x + 24");

  // 12 — le programme, rejoué étape par étape.
  const prog12 = (n) => {
    let r = n + 3n;
    r = r * 4n;
    return r - 2n * n;
  };
  const p12 = (x) => Q(prog12(x.n / x.d));
  v.ok("12. le programme donne 22 avec 5 et 10 avec −1", prog12(5n) === 22n && prog12(-1n) === 10n);
  eg(12, "32 - 2 \\times 5 = 22");
  eg(12, "8 - 2 \\times (-1) = 8 + 2 = 10");
  chaine(12, "4(x + 3) - 2x", "2x + 12", { enonce: false });
  v.ok("12. le programme vaut 2n + 12 pour n de −50 à 50", [...Array(101).keys()].map((i) => BigInt(i - 50)).every((n) => prog12(n) === 2n * n + 12n));
  v.ok("12. le piège 4 × x + 3 − 2x n'est pas le programme", !identiques("4 \\times x + 3 - 2x", "4(x + 3) - 2x"));
  dessinTableau(12, p12, "le programme");
  dit(12, "Réponse : $22$ et $10$ ; le résultat vaut $2x + 12$ ; Tom a raison.");

  // 13 — le moins devant un produit.
  chaine(13, "(x + 4)(x + 5)", "x^2 + 9x + 20");
  chaine(13, "(x + 1)(x + 2)", "x^2 + 3x + 2");
  vaut(13, "(x + 4)(x + 5) - (x + 1)(x + 2)", "6x + 18", "- 3x - 2 = 6x + 18$");
  v.ok("13. x² + 9x + 20 − x² − 3x − 2 est bien D", identiques("x^2 + 9x + 20 - x^2 - 3x - 2", "(x + 4)(x + 5) - (x + 1)(x + 2)"));
  eg(13, "4 \\times 5 - 1 \\times 2 = 20 - 2 = 18");
  eg(13, "6 \\times 0 + 18 = 18");
  v.ok("13. le piège (un seul signe changé) donne autre chose", !identiques("x^2 + 9x + 20 - x^2 + 3x + 2", "(x + 4)(x + 5) - (x + 1)(x + 2)"));
  dessinAires(13, 0, "(x + 4)(x + 5)", "x^2 + 9x + 20");
  dessinAires(13, 1, "(x + 1)(x + 2)", "x^2 + 3x + 2");

  // 14 — les erreurs, lues dans l'énoncé.
  {
    const erreurs = [...e(14).matchAll(/: \$([^$]*) = ([^$]*)\$/g)].map((m) => ({ depart: m[1], ecrit: m[2] }));
    const g = grilleDe(14);
    v.ok("14. trois écritures d'élèves, toutes fausses", erreurs.length === 3 && erreurs.every(({ depart, ecrit }) => !identiques(depart, ecrit)));
    const okGrille = !!g && g.lignes.length === 3 && g.lignes.every(([ecrit, juste], i) => identiques(conv(ecrit), erreurs[i].ecrit) && identiques(conv(juste), erreurs[i].depart));
    v.ok("14. la grille : chaque erreur face à SON développement juste", okGrille, JSON.stringify(g?.lignes));
    chaine(14, "7(x - 2)", "7x - 14");
    chaine(14, "-3(x - 4)", "-3x + 12");
    chaine(14, "(x + 3)(x + 7)", "x^2 + 10x + 21");
    eg(14, "(-3) \\times (-4) = 12");
    const enUn = erreurs.map(({ depart, ecrit }) => `$${tex(val(ecrit, 1))}$ contre $${tex(val(depart, 1))}$`).join(", ");
    dit(14, enUn, `en x = 1 : ${enUn}`);
    v.ok("14. la demi-correction x² + 7x + 21 est fausse", !identiques("x^2 + 7x + 21", "(x + 3)(x + 7)"));
  }

  // 15 — relier : chaque forme développée est CHERCHÉE, pas recopiée.
  {
    const factos = [...e(15).matchAll(/\$([A-D]) = ([^$]*)\$/g)].map((m) => [m[1], m[2]]);
    const ligneDev = e(15).split("\\n").find((l) => l.startsWith("Formes développées")) ?? "";
    const devs = [...ligneDev.matchAll(/\$([^$]*)\$/g)].map((m) => m[1]);
    const paires = factos.map(([l, fx]) => [l, fx, devs.filter((d) => identiques(d, fx))]);
    const intrus = devs.filter((d) => !factos.some(([, fx]) => identiques(d, fx)));
    v.ok(`15. quatre formes, chacune UNE développée, et un seul intrus (${intrus.join(", ")})`, factos.length === 4 && devs.length === 5 && paires.every(([, , t]) => t.length === 1) && intrus.length === 1);
    const g = grilleDe(15);
    const okGrille = !!g && g.lignes.length === 5 && factos.every(([, fx], i) => identiques(conv(g.lignes[i][0]), fx) && identiques(conv(g.lignes[i][1]), fx)) && g.lignes[4][0] === "intrus" && identiques(conv(g.lignes[4][1]), intrus[0] ?? "0");
    v.ok("15. la grille relie les mêmes paires, et nomme le même intrus", okGrille, JSON.stringify(g?.lignes));
    for (const [, fx, [d]] of paires) if (d) chaine(15, fx, d);
    v.ok("15. l'intrus est le « premier × premier + dernier × dernier » de B", identiques(intrus[0] ?? "0", "x^2 + 12"));
    const rep = `Réponse : $A$ va avec $${paires[0][2][0]}$, $B$ avec $${paires[1][2][0]}$, $C$ avec $${paires[2][2][0]}$, $D$ avec $${paires[3][2][0]}$ ; $${intrus[0]}$ est l'intrus.`;
    dit(15, rep);
  }

  // 16 — la commande du club.
  chaine(16, "24(x + 12)", "24x + 288", { enonce: false });
  eg(16, "24 \\times 12 = 288");
  eg(16, "18{,}50 + 12 = 30{,}50");
  eg(16, "24 \\times 30{,}50 = 732");
  eg(16, "24 \\times 18{,}50 + 288 = 444 + 288 = 732");
  v.ok("16. 24 × 30,50 = 732 (en centimes : 24 × 3 050 = 73 200)", 24 * 3050 === 73200);
  dessinAires(16, 0, "24(x + 12)", "24x + 288");
  dit(16, "la commande coûte $732$ €.");

  /* ── ★★★ Problèmes ─────────────────────────────────────────────────────── */
  v.titre("★★★ Problèmes");
  // 17 — la pelouse de 105 m sur 68 m.
  chaine(17, "(105 + x)(68 + x)", "x^2 + 173x + 7\\,140", { enonce: false });
  v.ok("17. l'énoncé donne 105 m et 68 m (FIFA)", e(17).includes("$105$ m de long et $68$ m de large"));
  eg(17, "2^2 + 173 \\times 2 + 7\\,140 = 4 + 346 + 7\\,140 = 7\\,490");
  eg(17, "7\\,490 - 7\\,140 = 350");
  eg(17, "107 \\times 70 = 7\\,490");
  v.ok("17. le conseiller : 2 × 105 + 2 × 68 = 346, soit 4 m² de moins (le coin 2 × 2)", e(17).includes("$2 \\times 105 + 2 \\times 68 = 346$") && egal(val("2 \\times 105 + 2 \\times 68", 0), Q(346)) && 350 - 346 === 2 * 2 && (105 + 2) * (68 + 2) - 105 * 68 === 350);
  dit(17, "on gagne $350$ m²");
  {
    const a = dessinAires(17, 0, "(105 + x)(68 + x)", "x^2 + 173x + 7140");
    const l = (t) => [...(a?.[0] ?? []), ...(a?.[1] ?? [])].find(([e1]) => e1 === t)?.[1];
    v.ok("17. le dessin est à l'échelle : 105 et 68 dans le même rapport", !!a && Math.abs(l("105") / 105 - l("68") / 68) < 0.02, `${l("105")} / ${l("68")}`);
  }

  // 18 — les degrés Fahrenheit.
  const F = (t) => evalTex("1{,}8x + 32", t);
  v.ok("18. la formule donne 0 °C = 32 °F et 100 °C = 212 °F", e(18).includes("$1{,}8 \\times t + 32$") && egal(F(Q(0)), Q(32)) && egal(F(Q(100)), Q(212)));
  chaine(18, "1{,}8(x + 10) + 32", "1{,}8x + 50", { enonce: false });
  vaut(18, "(1{,}8x + 50) - (1{,}8x + 32)", "18", "$(1{,}8x + 50) - (1{,}8x + 32) = 18$");
  v.ok("18. l'écart vaut 18 °F pour tout x", identiques("1{,}8(x + 10) + 32 - (1{,}8x + 32)", "18"));
  eg(18, "1{,}8 \\times (30 + 10) + 32 = 72 + 32 = 104");
  eg(18, "1{,}8 \\times 30 + 50 = 54 + 50 = 104");
  {
    const t = traceDe(18);
    const ok = !!t && t.lignes.length >= 3 && t.lignes.every(([x, a, b]) => egal(nombre(a), F(nombre(x))) && egal(nombre(b), F(Q(Number(nombre(x).n) + 10))) && egal(Q(b - a), Q(18)));
    v.ok("18. la trace : 8 h et 15 h convertis, 18 °F d'écart à chaque ligne", ok, JSON.stringify(t?.lignes));
  }
  v.ok("18. le piège 1,8x + 10 + 32 n'est pas la conversion", !identiques("1{,}8x + 10 + 32", "1{,}8(x + 10) + 32"));

  // 19 — la semaine d'entraînement.
  chaine(19, "3(x + 5) + 2x", "5x + 15", { enonce: false });
  chaine(19, "5(x + 3)", "5x + 15");
  v.ok("19. l'énoncé : trois sorties de x + 5 et une de 2x", e(19).includes("trois fois par semaine $x + 5$ kilomètres") && e(19).includes("$2x$ kilomètres"));
  eg(19, "5 \\times 8 + 15 = 55");
  eg(19, "3 \\times 13 + 16 = 39 + 16 = 55");
  v.ok("19. pour x = 8 : sorties de 13 km et 16 km", 8 + 5 === 13 && 2 * 8 === 16);
  dessinTableau(19, (x) => val("3(x + 5) + 2x", x), "3(x + 5) + 2x");
  dessinAires(19, 0, "3(x + 5)", "3x + 15");

  // 20 — le carré du calendrier : les dates sont redemandées à `Date`.
  {
    const lundiPremier = (new Date(2026, 8, 1).getDay() + 6) % 7; // 0 = lundi
    const dec = Number(/const DECALAGE = (\d+);/.exec(source)?.[1]);
    v.ok(`20. le 1er septembre 2026 tombe en colonne ${lundiPremier + 1} (mardi) : DECALAGE = ${dec}`, dec === lundiPremier);
    const colonne = (d) => (new Date(2026, 8, d).getDay() + 6) % 7;
    const carreValide = (n) => n >= 1 && n + 8 <= 30 && colonne(n) !== 6 && colonne(n + 1) === colonne(n) + 1 && colonne(n + 7) === colonne(n);
    const ecart = (n) => (n + 1) * (n + 7) - n * (n + 8);
    const dessine = Number(/calendrier\((\d+)\)/.exec(blocs[19] ?? "")?.[1]);
    v.ok("20. le carré dessiné est celui de l'énoncé (9, 10, 16, 17), et c'est un vrai carré du mois", dessine === 9 && carreValide(9) && e(20).includes("$9$, $10$, $16$ et $17$"));
    v.ok("20. le carré 3, 4, 10, 11 est un vrai carré du mois", carreValide(3) && e(20).includes("$3$, $4$, $10$, $11$"));
    eg(20, "10 \\times 16 - 9 \\times 17 = 160 - 153 = 7");
    eg(20, "4 \\times 10 - 3 \\times 11 = 40 - 33 = 7");
    const m = /tableau\((\[[^\]]*\]), (\[[^\]]*\])\)/.exec(blocs[19] ?? "");
    const ns = m ? json(m[1]).slice(1).map(Number) : [];
    const vs = m ? json(m[2]).slice(1) : [];
    v.ok(`20. le tableau : ${ns.join(", ")} sont de vrais carrés de septembre 2026, et l'écart vaut ${vs.join(", ")}`, ns.length >= 3 && ns.every((n, i) => carreValide(n) && ecart(n) === vs[i]), JSON.stringify({ ns, vs }));
    // La preuve, la lettre n lue comme x.
    const nx = (s) => s.replace(/n/g, "x");
    const p1 = "(n + 1)(n + 7) = n^2 + 7n + n + 7 = n^2 + 8n + 7";
    const p2 = "(n + 1)(n + 7) - n(n + 8) = n^2 + 8n + 7 - n^2 - 8n = 7";
    v.ok(`20. ${p1}`, c(20).includes(`$${p1}$`) && identiques(nx("(n + 1)(n + 7)"), nx("n^2 + 7n + n + 7")) && identiques(nx("n^2 + 7n + n + 7"), nx("n^2 + 8n + 7")));
    v.ok("20. n(n + 8) = n² + 8n", c(20).includes("$n(n + 8) = n^2 + 8n$") && identiques(nx("n(n + 8)"), nx("n^2 + 8n")));
    v.ok(`20. ${p2}`, c(20).includes(`$${p2}$`) && identiques(nx("(n + 1)(n + 7) - n(n + 8)"), "7") && identiques(nx("n^2 + 8n + 7 - n^2 - 8n"), "7"));
    v.ok("20. l'écart vaut 7 pour TOUS les carrés du mois", [...Array(30).keys()].map((i) => i + 1).filter(carreValide).every((n) => ecart(n) === 7));
  }
}

lancer({
  nom: "LA DISTRIBUTIVITÉ · 4e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-4e-distributivite.tsx",
  notionId: "litteral_distributivite",
  classe: "4e",
  verifier,
  casses: [
    ["ex. 1 : le terme constant oublié dans le dessin", "[[\"6x\", \"12\"]]", "[[\"6x\", \"2\"]]"],
    ["ex. 1 : 6x + 2", "= 6x + 12$.", "= 6x + 2$."],
    ["ex. 2 : moins par moins négatif", "= -10x + 20$", "= -10x - 20$"],
    ["ex. 3 : une aire du dessin fausse", "[\"x²\", \"6x\"], [\"4x\", \"24\"]", "[\"x²\", \"6x\"], [\"4x\", \"10\"]"],
    ["ex. 4 : le signe du −2 perdu", "= x^2 + 5x - 14$", "= x^2 + 5x + 14$"],
    ["ex. 5 : une case de la trace fausse", "[5, 32, 32]", "[5, 32, 30]"],
    ["ex. 6 : 4x − 5 pris pour un produit", "[\"4x − 5\", \"somme\"]", "[\"4x − 5\", \"produit\"]"],
    ["ex. 7 : le côté droit du b) mal calculé", "[\"b)\", 40, 22]", "[\"b)\", 40, 40]"],
    ["ex. 8 : un calcul mental faux", "= 450 - 18 = 432$", "= 450 - 18 = 442$"],
    ["ex. 9 : la réduction fausse", "- 4x + 8 = 2x + 23$", "- 4x + 8 = 2x + 7$"],
    ["ex. 10 : (−1) × (−6) compté négatif", "[\"−x\", \"6\"]", "[\"−x\", \"−6\"]"],
    ["ex. 11 : le périmètre mal réduit", "12 + 8 = 2x + 20$", "12 + 8 = 2x + 14$"],
    ["ex. 12 : le programme mal rejoué", "[\"Résultat\", 22, 10, 12, 32]", "[\"Résultat\", 22, 6, 12, 32]"],
    ["ex. 13 : le moins sur le premier terme seulement", "- 3x - 2 = 6x + 18$", "- 3x - 2 = 6x + 22$"],
    ["ex. 14 : la correction de Hugo fausse", "[\"−3x − 12\", \"−3x + 12\"]", "[\"−3x − 12\", \"−3x − 12\"]"],
    ["ex. 15 : l'intrus mal nommé", "[\"intrus\", \"x² + 12\"]", "[\"intrus\", \"x² + 8x + 12\"]"],
    ["ex. 16 : le total faux", "444 + 288 = 732$", "444 + 288 = 722$"],
    ["ex. 17 : le petit carré du coin faux", "[\"105x\", \"x²\"]", "[\"105x\", \"2x\"]"],
    ["ex. 17 : l'aire gagnée du conseiller reprise", "on gagne $350$ m²", "on gagne $346$ m²"],
    ["ex. 18 : une conversion fausse dans la trace", "[20, 68, 86]", "[20, 68, 88]"],
    ["ex. 18 : les 10 degrés non multipliés", "+ 32 = 1{,}8x + 50$", "+ 32 = 1{,}8x + 42$"],
    ["ex. 19 : une semaine du tableau fausse", "[\"Total (km)\", 40, 45, 50, 55]", "[\"Total (km)\", 40, 45, 50, 56]"],
    ["ex. 20 : le mois commence un mercredi", "const DECALAGE = 1;", "const DECALAGE = 2;"],
    ["ex. 20 : un carré qui déborde du mois", "[\"n\", \"3\", \"9\", \"14\", \"22\"]", "[\"n\", \"3\", \"9\", \"14\", \"27\"]"],
    ["une micro d'une autre notion", "micros: [\"litteral_distributivite_reduire\", \"litteral_distributivite_simple\"],", "micros: [\"litteral_expression_reduire\", \"litteral_distributivite_simple\"],"],
    ["un corrigé sans son dessin", "schema: grille([\"Factorisée\"", "figure: grille([\"Factorisée\""],
    ["un $ dans un dessin", "trace([\"x (°C)\"", "trace([\"$x$ (°C)\""],
    ["une formule dans une consigne", "J'écris tous les produits avant de réduire.", "J'écris tous les produits avant de réduire $x$."],
  ],
});
