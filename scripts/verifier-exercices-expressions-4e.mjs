// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Les expressions
// littérales » de 4e (lib/fiches-exercices/maths-4e-expressions.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé réduit à la main ; ici on ne réduit RIEN.
// Chaque forme est lue telle qu'elle est écrite (`evalTex`) et comparée à
// l'expression de départ en neuf valeurs de x, en fractions exactes. Les
// calculs numériques « a = b = c » sont relus membre par membre. Les formules en
// n, t, j ou a sont lues en remplaçant la lettre par x.
//
// ⭐⭐ LES DESSINS SONT RELUS dans le source :
//   · `rect(…)` : chaque étiquette, calculée pour la valeur de x écrite sous le
//     dessin, doit valoir la longueur DESSINÉE ; chaque case « morceau × largeur » ;
//   · `tuiles(…)` : le texte de chaque rangée doit valoir ce qu'elle dessine
//     (grands carrés, barres, petits carrés, signés), et la rangée réduite la
//     somme des autres ;
//   · `triangle(…)` : les côtés, mesurés dans les coordonnées, valent les
//     étiquettes pour x = 3 ;
//   · `allumettes(…)` : les allumettes sont RECOMPTÉES côté par côté ;
//   · `trace`, `tableau`, `grille` : chaque case est recalculée.
// Le nombre de corrigés dessinés est compté (« les élèves adorent les schémas »).
//
//   node scripts/verifier-exercices-expressions-4e.mjs

import { Q, D, plus, moins, div, egal, inf, evalTex, identiques, lireFeuille, lancer, outilsAlgebre, outilsEgalites } from "./verifier-exercices-commun.mjs";

/** Une étiquette de dessin (« x − 7 », « 6x² », « 0,7a », « x ÷ 2 ») → LaTeX lisible par evalTex. */
const conv = (s) =>
  String(s)
    .replace(/(\S+) ÷ (\S+)/g, "\\dfrac{$1}{$2}")
    .replace(/−/g, "-")
    .replace(/²/g, "^2")
    .replace(/×/g, "\\times")
    .replace(/(\d),(\d)/g, "$1{,}$2");

/** La lettre l (n, t, j, a) lue comme x — jamais dans `\times` ni `\dfrac`. */
const enX = (s, l) => s.replace(new RegExp(`(?<![a-zA-Z\\\\])${l}(?![a-zA-Z])`, "g"), "x");

/** Une case de tableau (8, -1, "−4", "2,5") → fraction exacte. */
const nombre = (v) => D(String(v).replace(/−/g, "-").trim());

function verifier(source, v) {
  const f = lireFeuille(source);
  const { blocs } = f;
  const { e, c, dit, chaine, vaut } = outilsAlgebre(v, f);
  const eg = outilsEgalites(v, f);
  const bloc = (k) => blocs[k - 1] ?? "";
  const val = (tex, x) => evalTex(tex, typeof x === "object" ? x : nombre(x));
  const role = (k, index) => {
    const avant = bloc(k).slice(0, index);
    return avant.lastIndexOf("figure:") > avant.lastIndexOf("schema:") ? "figure" : "schema";
  };

  /** « orig = … = forme$ » dans le corrigé, pour une formule écrite avec la lettre l. */
  const chaineL = (k, orig, forme, l) => {
    const id = identiques(enX(orig, l), enX(forme, l));
    const lu = c(k).includes(`${orig} = ${forme}$`);
    v.ok(`${k}. ${orig} = ${forme}`, id && lu, `identiques : ${id} ; lu dans le corrigé : ${lu}`);
  };

  /* ── Les dessins, relus ─────────────────────────────────────────────── */

  const RE_RECT = /(?<![a-zA-Z])rect\((\[\[.*?\]\]), (\["[^"]*", [\d.]+\]), ([\d.]+)(?:, (\[[^\]]*\]))?(?:, ([\d.]+))?\)/g;
  const rects = (k) =>
    [...bloc(k).matchAll(RE_RECT)].map((m) => ({
      role: role(k, m.index),
      haut: JSON.parse(m[1]),
      gauche: JSON.parse(m[2]),
      pour: m[3],
      cases: m[4] ? JSON.parse(m[4]) : [],
      echelle: m[5],
    }));
  /** Un rectangle : longueurs à l'échelle pour x = pour, cases = morceau × largeur. */
  const dessinRect = (k, r, { produit, somme, quoi = "le rectangle" } = {}) => {
    const fautes = [];
    const x = nombre(r.pour);
    for (const [t, l] of [...r.haut, r.gauche]) {
      const attendu = val(conv(t), x);
      if (!egal(attendu, nombre(l))) fautes.push(`« ${t} » dessiné ${l}, vaut ${attendu.n}/${attendu.d} pour x = ${r.pour}`);
    }
    if (r.cases.length && r.cases.length !== r.haut.length) fautes.push("nombre de cases");
    r.cases.forEach((cel, j) => {
      if (!identiques(conv(cel), `(${conv(r.haut[j][0])})(${conv(r.gauche[0])})`)) fautes.push(`case « ${cel} » ≠ ${r.haut[j][0]} × ${r.gauche[0]}`);
    });
    const rectangle = `(${r.haut.map((h) => `(${conv(h[0])})`).join("+")})(${conv(r.gauche[0])})`;
    if (produit && !identiques(rectangle, produit)) fautes.push(`le rectangle n'est pas ${produit}`);
    if (somme && !identiques(r.cases.map((cel) => `(${conv(cel)})`).join("+"), somme)) fautes.push(`les cases ne font pas ${somme}`);
    v.ok(`${k}. ${quoi} (${r.role}) : à l'échelle pour x = ${r.pour}${r.cases.length ? `, ${r.cases.length} cases = morceau × largeur` : ""}`, fautes.length === 0, fautes.slice(0, 3).join(" | "));
  };

  const tuilesDe = (k) => {
    const m = /tuiles\(\[(.*?)\](?:, (\{[^}]*\}))?\)/.exec(bloc(k));
    if (!m) return null;
    const lit = (t) => {
      const [, texte, reste] = /\{ texte: "([^"]*)"((?:, [cxu]: -?\d+)*) \}/.exec(t);
      const o = { texte, c: 0, x: 0, u: 0 };
      for (const [, cle, n] of reste.matchAll(/([cxu]): (-?\d+)/g)) o[cle] = Number(n);
      return o;
    };
    return { rangees: [...m[1].matchAll(/\{[^}]*\}/g)].map((t) => lit(t[0])), resultat: m[2] ? lit(m[2]) : null };
  };
  /** Les tuiles de l'exercice k : chaque rangée vaut ce qu'elle dessine ; ensemble, l'expression ; la rangée réduite, leur somme. */
  const dessinTuiles = (k, expression, reduit) => {
    const t = tuilesDe(k);
    if (!t) return v.ok(`${k}. des tuiles`, false, "absentes");
    const dessine = (r) => `${r.c}x^2 + ${r.x}x + ${r.u}`;
    const fautes = [];
    for (const r of [...t.rangees, ...(t.resultat ? [t.resultat] : [])]) if (!identiques(conv(r.texte), dessine(r))) fautes.push(`« ${r.texte} » dessine ${r.c} x², ${r.x} x, ${r.u}`);
    const ensemble = t.rangees.map((r) => `(${conv(r.texte)})`).join("+");
    if (!identiques(ensemble, expression)) fautes.push(`les rangées ne font pas ${expression}`);
    if (reduit) {
      if (!t.resultat) fautes.push("rangée réduite absente");
      else {
        if (!identiques(conv(t.resultat.texte), reduit)) fautes.push(`la rangée réduite n'est pas ${reduit}`);
        const s = (cle) => t.rangees.reduce((a, r) => a + r[cle], 0);
        if (["c", "x", "u"].some((cle) => s(cle) !== t.resultat[cle])) fautes.push("les tuiles réduites ne sont pas le compte des autres");
      }
    }
    v.ok(`${k}. les tuiles : ${t.rangees.length} rangées = ${expression}${reduit ? `, réduites en ${reduit}` : ""}`, fautes.length === 0, fautes.slice(0, 3).join(" | "));
  };

  const tableauDe = (k) => {
    const m = /\btableau\((\[[^\]]*\]), (\[[^\]]*\])(, true)?\)/.exec(bloc(k));
    return m ? { entete: JSON.parse(m[1]), ligne: JSON.parse(m[2]) } : null;
  };
  const grilleDe = (k) => {
    const m = /\bgrille\((\[[^\]]*\]), (\[\[.*?\]\])\)/.exec(bloc(k));
    return m ? { entete: JSON.parse(m[1]), lignes: JSON.parse(m[2]) } : null;
  };
  /** Un tableau « x | valeurs » : chaque case recalculée sur la formule tex. */
  const dessinTableau = (k, tex, quoi) => {
    const t = tableauDe(k);
    if (!t) return v.ok(`${k}. un tableau`, false, "absent");
    const xs = t.entete.slice(1);
    const faux = xs.filter((x, i) => !egal(val(tex, x), nombre(t.ligne[i + 1])));
    v.ok(`${k}. le tableau : ${quoi} en ${xs.join(" ; ")} → ${t.ligne.slice(1).join(" ; ")}`, xs.length >= 3 && xs.length === t.ligne.length - 1 && faux.length === 0, faux.length ? `faux en ${faux.join(", ")}` : "mal formé");
  };

  // Les schémas : « les élèves adorent les schémas ».
  const dessines = f.blocs.filter((b) => /\n\s+schema:/.test(b)).length;
  const figures = f.blocs.filter((b) => /\n\s+figure:/.test(b)).length;
  // ⭐ Cette feuille les dessine TOUS : un dessin qui disparaît doit se voir.
  v.ok(`${dessines} corrigés dessinés sur 20, et ${figures} énoncés avec leur figure`, dessines === 20 && figures === 2, `${dessines} / ${figures}`);

  /* ── ★ Un seul geste ────────────────────────────────────────────────── */
  v.titre("★ Un seul geste");

  // 1 — lire : termes, coefficients (retrouvés par les VALEURS de E en −1, 0, 1).
  const E1 = "8x^2 - x + 6";
  v.ok("1. l'énoncé donne E = 8x² − x + 6", e(1).includes(`$E = ${E1}$`));
  {
    const [fm, f0, f1] = [-1, 0, 1].map((n) => val(E1, n));
    const a = moins(div(plus(f1, fm), Q(2)), f0);
    const b = div(moins(f1, fm), Q(2));
    v.ok("1. coefficients recalculés : 8, −1, et 6 constant", egal(a, Q(8)) && egal(b, Q(-1)) && egal(f0, Q(6)));
    const t = tableauDe(1);
    const termes = t.entete.slice(1).map((s) => `(${conv(s)})`).join("+");
    v.ok("1. le tableau : ses trois termes font E, coefficients 8 et −1", identiques(termes, E1) && egal(nombre(t.ligne[1]), a) && egal(nombre(t.ligne[2]), b) && t.ligne[3] === "sans x", JSON.stringify(t));
  }
  dit(1, "Devant $x^2$, c'est $8$");
  dit(1, "donc le coefficient de $x$ est $-1$");
  dit(1, "Le terme constant est $6$");
  vaut(1, E1, "8 \\times x \\times x - 1 \\times x + 6", "d) $E = 8 \\times x \\times x - 1 \\times x + 6$.");
  eg(1, "8 \\times 2 \\times 2 - 1 \\times 2 + 6 = 32 - 2 + 6 = 36");
  v.ok("1. E(2) = 36 sur l'expression de départ", egal(val(E1, 2), Q(36)));
  dit(1, "Réponse : trois termes ; coefficients $8$ et $-1$ ; terme constant $6$.");

  // 2 — écrire sans le signe ×.
  chaine(2, "4 \\times x", "4x");
  chaine(2, "x \\times 9", "9x");
  chaine(2, "3 \\times x \\times x", "3x^2");
  chaine(2, "1 \\times x", "x");
  chaine(2, "x \\times 2 \\times x \\times 5", "10x^2");
  v.ok("2. le piège x × x = 2x est bien faux", !identiques("x \\times x", "2x") && c(2).includes("$x \\times x = 2x$"));
  {
    const rs = rects(2);
    v.ok("2. deux rectangles, à la MÊME échelle", rs.length === 2 && rs[0].echelle && rs[0].echelle === rs[1].echelle, JSON.stringify(rs.map((r) => r.echelle)));
    if (rs[0]) dessinRect(2, rs[0], { produit: "x \\times x", somme: "x^2", quoi: "le carré x × x" });
    if (rs[1]) dessinRect(2, rs[1], { produit: "2x", somme: "2x", quoi: "le rectangle x × 2" });
    v.ok("2. pour x = 5 : 25 contre 10", egal(val("x^2", 5), Q(25)) && egal(val("2x", 5), Q(10)) && c(2).includes("Pour $x = 5$ : $25$ contre $10$"));
  }
  dit(2, "Réponse : $4x$ ; $9x$ ; $3x^2$ ; $x$ ; $10x^2$.");

  // 3 — traduire : chaque phrase recalculée en JavaScript pour x = 10.
  {
    const x = 10;
    const phrases = [4 * x, x - 7, x * x, x / 2, 2 * (x + 6)];
    const formes = ["4x", "x - 7", "x^2", "\\dfrac{x}{2}", "2(x + 6)"];
    formes.forEach((fo, i) => dit(3, `$${fo}$`));
    v.ok("3. les cinq traductions valent 40, 3, 100, 5, 32 pour x = 10", formes.every((fo, i) => egal(val(fo, x), Q(phrases[i]))));
    const t = tableauDe(3);
    v.ok("3. le tableau : chaque en-tête EST la traduction, chaque case sa valeur", t && t.entete.length === 6 && t.entete.slice(1).every((h, i) => identiques(conv(h), formes[i]) && egal(val(conv(h), x), nombre(t.ligne[i + 1]))), JSON.stringify(t));
  }
  eg(3, "4 \\times 10 = 40");
  eg(3, "10 - 7 = 3");
  eg(3, "10^2 = 100");
  eg(3, "\\dfrac{10}{2} = 5");
  eg(3, "2 \\times (10 + 6) = 32");
  v.ok("3. le piège : 4x n'est pas x + 4, x² n'est pas 2x", !identiques("4x", "x + 4") && !identiques("x^2", "2x"));
  dit(3, "Réponse : $4x$ ; $x - 7$ ; $x^2$ ; $\\dfrac{x}{2}$ ; $2(x + 6)$.");

  // 4 — substituer dans B = 7 − 2x.
  const B4 = "7 - 2x";
  v.ok("4. l'énoncé donne B = 7 − 2x", e(4).includes(`$B = ${B4}$`));
  eg(4, "7 - 2 \\times 3 = 7 - 6 = 1");
  eg(4, "7 - 2 \\times 0 = 7 - 0 = 7");
  eg(4, "7 - 2 \\times (-4) = 7 + 8 = 15");
  eg(4, "7 - 2 \\times 2{,}5 = 7 - 5 = 2");
  v.ok("4. B(3) = 1, B(0) = 7, B(−4) = 15, B(2,5) = 2 sur l'expression", [["3", 1], ["0", 7], ["-4", 15], ["2,5", 2]].every(([x, y]) => egal(val(B4, x), Q(y))));
  eg(4, "5 \\times (-4) = -20");
  dessinTableau(4, B4, "B = 7 − 2x");
  dit(4, "Réponse : $B = 1$ ; $B = 7$ ; $B = 15$ ; $B = 2$.");

  // 5 — substituer dans D = x² − 3x.
  const D5 = "x^2 - 3x";
  v.ok("5. l'énoncé donne D = x² − 3x", e(5).includes(`$D = ${D5}$`));
  eg(5, "5^2 - 3 \\times 5 = 25 - 15 = 10");
  eg(5, "(-2)^2 - 3 \\times (-2) = 4 + 6 = 10");
  eg(5, "1^2 - 3 \\times 1 = 1 - 3 = -2");
  v.ok("5. D(5) = D(−2) = 10 et D(1) = −2", egal(val(D5, 5), Q(10)) && egal(val(D5, -2), Q(10)) && egal(val(D5, 1), Q(-2)));
  v.ok("5. le piège : −2² vaut −4, et −4 + 6 = 2", egal(val("-2^2", 0), Q(-4)) && c(5).includes("$-2^2 = -4$"));
  eg(5, "-4 + 6 = 2");
  dessinTableau(5, D5, "D = x² − 3x");
  dit(5, "Réponse : $D = 10$ ; $D = 10$ ; $D = -2$.");

  // 6 — réduire des sommes.
  chaine(6, "6x + 9x", "15x");
  chaine(6, "4x - 11x", "-7x");
  chaine(6, "x + x + x + x", "4x");
  chaine(6, "2x + 6 + 3x - 4", "5x + 2");
  v.ok("6. e) 8x + 1 ne se réduit pas en 9x", e(6).includes("$8x + 1$") && !identiques("8x + 1", "9x") && c(6).includes("est déjà réduite"));
  eg(6, "8 \\times 10 + 1 = 81");
  eg(6, "9 \\times 10 = 90");
  dessinTuiles(6, "2x + 6 + 3x - 4", "5x + 2");
  dit(6, "Réponse : $15x$ ; $-7x$ ; $4x$ ; $5x + 2$ ; $8x + 1$ ne se réduit pas.");

  // 7 — réduire des produits.
  chaine(7, "3 \\times 5x", "15x");
  chaine(7, "2x \\times 4", "8x");
  chaine(7, "x \\times 6x", "6x^2");
  chaine(7, "-2x \\times 5x", "-10x^2");
  chaine(7, "7x \\times 0", "0");
  eg(7, "2 \\times 12 = 24");
  eg(7, "7 \\times 2 = 14");
  v.ok("7. le piège : x × 6x vaut 24 en 2, 7x vaut 14", egal(val("x \\times 6x", 2), Q(24)) && egal(val("7x", 2), Q(14)));
  {
    const [r] = rects(7);
    if (r) dessinRect(7, r, { produit: "x \\times 6x", somme: "6x^2", quoi: "six carrés de côté x" });
    else v.ok("7. un rectangle", false, "absent");
  }
  dit(7, "Réponse : $15x$ ; $8x$ ; $6x^2$ ; $-10x^2$ ; $0$.");

  // 8 — réduire avec des x².
  chaine(8, "x^2 + x^2", "2x^2");
  chaine(8, "2x^2 - 3x + x^2", "3x^2 - 3x");
  chaine(8, "x^2 + 4 - 2x^2 + x - 1", "-x^2 + x + 3");
  v.ok("8. c) 3x + 3x² ne se réduit pas", e(8).includes("$3x + 3x^2$") && !identiques("3x + 3x^2", "6x^2") && !identiques("3x + 3x^2", "6x") && c(8).includes("déjà réduite"));
  eg(8, "3 \\times 2 + 3 \\times 2^2 = 6 + 12 = 18");
  eg(8, "6 \\times 2^2 = 24");
  dessinTuiles(8, "3x + 3x^2");
  dit(8, "Réponse : $2x^2$ ; $3x^2 - 3x$ ; $3x + 3x^2$ ne se réduit pas ; $-x^2 + x + 3$.");

  /* ── ★★ Type devoir ─────────────────────────────────────────────────── */
  v.titre("★★ Type devoir");

  // 9 — le rectangle x + 5 sur x.
  v.ok("9. l'énoncé donne x + 5 et x", e(9).includes("longueur $x + 5$") && e(9).includes("largeur $x$"));
  dit(9, "$P = x + 5 + x + x + 5 + x$");
  vaut(9, "x + 5 + x + x + 5 + x", "4x + 10", "Donc $P = 4x + 10$.");
  v.ok("9. autre chemin : 2 × (longueur + largeur) = 4x + 10", identiques("2(x + 5 + x)", "4x + 10"));
  dit(9, "$A = (x + 5) \\times x$");
  eg(9, "4 \\times 3 + 10 = 22");
  eg(9, "(3 + 5) \\times 3 = 24");
  eg(9, "8 + 3 + 8 + 3 = 22");
  eg(9, "8 \\times 3 = 24");
  eg(9, "3 + 15 = 18");
  v.ok("9. le piège x + 5 × x vaut 18 en 3", egal(val("x + 5 \\times x", 3), Q(18)));
  {
    const [r] = rects(9);
    if (r) dessinRect(9, r, { produit: "(x + 5)x" });
    v.ok("9. le dessin est fait pour x = 3, comme le contrôle", r?.pour === "3" && c(9).includes("$8$ cm sur $3$ cm"));
  }
  dit(9, "Réponse : $P = 4x + 10$ ; $A = (x + 5) \\times x$ ; pour $x = 3$, $22$ cm et $24$ cm².");

  // 10 — le triangle x, 2x, x + 4.
  chaine(10, "x + 2x + x + 4", "4x + 4", { enonce: false });
  v.ok("10. l'énoncé donne x, 2x et x + 4", ["$x$", "$2x$", "$x + 4$"].every((t) => e(10).includes(t)));
  eg(10, "4 \\times 3 + 4 = 16");
  eg(10, "3 + 6 + 7 = 16");
  eg(10, "4 \\times 4{,}5 + 4 = 18 + 4 = 22");
  v.ok("10. le piège 3x + 4 donne 13 en 3", egal(val("3x + 4", 3), Q(13)) && c(10).includes("$13$ cm"));
  {
    const m = /triangle\(\{ A: \[([^\]]*)\], B: \[([^\]]*)\], C: \[([^\]]*)\] \}, \{ cotes: \{ AB: "([^"]*)", BC: "([^"]*)", CA: "([^"]*)" \} \}/.exec(bloc(10));
    if (!m) v.ok("10. le triangle", false, "absent");
    else {
      const [A, B, C] = [m[1], m[2], m[3]].map((t) => t.split(",").map(Number));
      const d = (P, R) => Math.hypot(P[0] - R[0], P[1] - R[1]);
      const cotes = [[d(A, B), m[4]], [d(B, C), m[5]], [d(C, A), m[6]]];
      const fautes = cotes.filter(([l, t]) => Math.abs(l - Number(evalTex(conv(t), Q(3)).n)) > 2e-3);
      v.ok(`10. le triangle : côtés mesurés ${cotes.map(([l]) => l.toFixed(3)).join(", ")} = x + 4, 2x, x pour x = 3`, fautes.length === 0, fautes.map(([l, t]) => `${t} mesuré ${l}`).join(" | "));
      v.ok("10. la somme des étiquettes est le périmètre de l'énoncé", identiques(cotes.map(([, t]) => `(${conv(t)})`).join("+"), "x + 2x + x + 4"));
    }
  }
  dit(10, "Réponse : $P = 4x + 4$ ; $16$ cm pour $x = 3$ ; $22$ cm pour $x = 4{,}5$.");

  // 11 — le programme de calcul, rejoué en JavaScript.
  const prog11 = (n) => [n, n * 5, n * 5 + 8, n * 5 + 8 - 2 * n];
  v.ok("11. le programme donne 20 avec 4 et 2 avec −2", prog11(4)[3] === 20 && prog11(-2)[3] === 2);
  eg(11, "28 - 2 \\times 4 = 28 - 8 = 20");
  eg(11, "-2 - 2 \\times (-2) = -2 + 4 = 2");
  chaine(11, "5x + 8 - 2x", "3x + 8", { enonce: false });
  eg(11, "3 \\times 4 + 8 = 20");
  eg(11, "3 \\times (-2) + 8 = 2");
  v.ok("11. 3x + 8 et le programme coïncident de −30 à 30", [...Array(61).keys()].map((i) => i - 30).every((n) => prog11(n)[3] === 3 * n + 8));
  {
    const m = /trace\((\[[^\]]*\]), (\[\[.*?\]\])\)/.exec(bloc(11));
    if (!m) v.ok("11. la trace", false, "absente");
    else {
      const lignes = JSON.parse(m[2]);
      const fautes = [];
      lignes.forEach((l, i) => {
        const etape = Math.min(i, 3);
        [[4, 1], [-2, 2]].forEach(([n, col]) => {
          if (!egal(nombre(l[col]), Q(prog11(n)[etape]))) fautes.push(`ligne ${i + 1}, avec ${n} : ${l[col]}`);
          if (!egal(val(conv(l[3]), n), nombre(l[col]))) fautes.push(`ligne ${i + 1} : « ${l[3]} » ne vaut pas ${l[col]} pour ${n}`);
        });
      });
      v.ok(`11. la trace : ${lignes.length} étapes rejouées, colonne x relue en 4 et en −2`, lignes.length === 5 && fautes.length === 0, fautes.slice(0, 3).join(" | "));
      v.ok("11. la dernière ligne est la forme réduite", lignes[4]?.[3] === "3x + 8");
    }
  }
  dit(11, "Réponse : $20$ et $2$ ; le programme donne $3x + 8$.");

  // 12 — l'escalade, en n.
  const A12 = (n) => 25 + 7 * n;
  const B12 = (n) => 11 * n;
  dit(12, "$A = 25 + 7n$");
  dit(12, "$B = 11n$");
  [5, 8, 12].forEach((n) => {
    eg(12, `25 + 7 \\times ${n} = ${A12(n)}`);
    eg(12, `11 \\times ${n} = ${B12(n)}`);
  });
  v.ok("12. B moins chère à 5 séances, A à 8 et à 12", B12(5) < A12(5) && A12(8) < B12(8) && A12(12) < B12(12));
  dit(12, "La formule B est moins chère.");
  dit(12, "Cette fois, c'est la formule A.");
  v.ok("12. l'économie à 12 séances : 23 €", B12(12) - A12(12) === 23 && c(12).includes("économise $23$ €"));
  {
    const g = grilleDe(12);
    const ns = g.entete.slice(1);
    const fautes = g.lignes.flatMap(([lab, ...vals]) => ns.filter((n, i) => !egal(val(enX(conv(lab), "n"), n), nombre(vals[i]))).map((n) => `${lab} en ${n}`));
    v.ok("12. le tableau : 25 + 7n et 11n recalculés en 5, 8, 12", g.lignes.length === 2 && identiques(enX(conv(g.lignes[0][0]), "n"), "25 + 7x") && identiques(enX(conv(g.lignes[1][0]), "n"), "11x") && fautes.length === 0, fautes.join(" | "));
  }
  v.ok("12. le piège 32n n'est pas 25 + 7n", !identiques("32x", "25 + 7x"));

  // 13 — réduire long, et vérifier.
  const E13 = "7x - 3 + 2x^2 - 9x + 10 - x^2";
  v.ok("13. l'énoncé donne A", e(13).includes(`$A = ${E13}$`));
  vaut(13, E13, "x^2 - 2x + 7", "Donc $A = x^2 - 2x + 7$.");
  [["2x^2 - x^2", "x^2"], ["7x - 9x", "-2x"], ["-3 + 10", "7"]].forEach(([g, r]) => v.ok(`13. famille : ${g} = ${r}`, identiques(g, r) && c(13).includes(`$${g} = ${r}$`)));
  eg(13, "7 \\times 2 - 3 + 2 \\times 2^2 - 9 \\times 2 + 10 - 2^2 = 14 - 3 + 8 - 18 + 10 - 4 = 7");
  eg(13, "2^2 - 2 \\times 2 + 7 = 4 - 4 + 7 = 7");
  v.ok("13. A(2) = 7 sur l'expression de départ", egal(val(E13, 2), Q(7)));
  v.ok("13. le piège : les signes perdus donnent 3x² + 16x + 7", identiques("7x - 3 + 2x^2 + 9x + 10 + x^2", "3x^2 + 16x + 7") && c(13).includes("$3x^2 + 16x + 7$"));
  {
    const g = grilleDe(13);
    const degre = { "x²": 2, x: 1, nombres: 0 };
    const fautes = [];
    const tous = [];
    const reduits = [];
    for (const [fam, termes, red] of g.lignes) {
      const ts = termes.split(" et ").map(conv);
      tous.push(...ts);
      reduits.push(conv(red));
      if (!identiques(ts.map((t) => `(${t})`).join("+"), conv(red))) fautes.push(`${termes} ≠ ${red}`);
      // Chaque terme est de sa famille : t(2) = 2^degré × t(1).
      for (const t of ts) if (!egal(val(t, 2), Q(2 ** degre[fam] * Number(val(t, 1).n)))) fautes.push(`${t} n'est pas de la famille ${fam}`);
    }
    if (!identiques(tous.map((t) => `(${t})`).join("+"), E13)) fautes.push("les six termes ne font pas A");
    if (!identiques(reduits.map((t) => `(${t})`).join("+"), "x^2 - 2x + 7")) fautes.push("les réduits ne font pas la réponse");
    v.ok("13. le tableau des familles : chaque terme à sa place, chaque ligne réduite", tous.length === 6 && fautes.length === 0, fautes.slice(0, 3).join(" | "));
  }
  dit(13, "Réponse : $A = x^2 - 2x + 7$ ; $A = 7$ pour $x = 2$.");

  // 14 — vrai ou faux.
  const paires14 = [["x + x", "x^2"], ["3x \\times 2", "6x"], ["5x - 5", "x"], ["7x - x", "6x"], ["4 + 2x", "6x"]];
  const verdicts = paires14.map(([g, d]) => identiques(g, d));
  v.ok("14. faux, vrai, faux, vrai, faux", JSON.stringify(verdicts) === "[false,true,false,true,false]");
  paires14.forEach(([g, d], i) => v.ok(`14. l'énoncé écrit ${g} = ${d}`, e(14).includes(`$${g} = ${d}$`)));
  ["a", "b", "c", "d", "e"].forEach((l, i) => dit(14, `${l}) ${verdicts[i] ? "VRAI" : "FAUX"}.`));
  eg(14, "3 + 3 = 6");
  eg(14, "3^2 = 9");
  eg(14, "5 \\times 2 - 5 = 5");
  eg(14, "4 + 2 \\times 0 = 4");
  eg(14, "6 \\times 0 = 0");
  eg(14, "5 \\times 1{,}25 - 5 = 1{,}25");
  v.ok("14. les contre-exemples ratent bien : x = 3 (a), x = 2 (c), x = 0 (e)", !egal(val("x + x", 3), val("x^2", 3)) && !egal(val("5x - 5", 2), Q(2)) && !egal(val("4 + 2x", 0), val("6x", 0)));
  chaine(14, "3x \\times 2", "6x");
  chaine(14, "7x - x", "6x");
  dessinTuiles(14, "x + x + x^2");
  {
    const t = tuilesDe(14);
    v.ok("14. les tuiles : x + x (deux barres) n'est pas x² (un carré)", t && t.rangees.length === 2 && !identiques(conv(t.rangees[0].texte), conv(t.rangees[1].texte)));
  }
  dit(14, "Réponse : faux, vrai, faux, vrai, faux.");

  // 15 — le rectangle découpé.
  chaine(15, "x + x + 3", "2x + 3", { enonce: false });
  chaine(15, "2x + 3 + x + 2x + 3 + x", "6x + 6", { enonce: false });
  chaine(15, "x^2 + x^2 + 3x", "2x^2 + 3x", { enonce: false });
  v.ok("15. autre chemin : aire = (2x + 3) × x, périmètre = 2(2x + 3 + x)", identiques("(2x + 3)x", "2x^2 + 3x") && identiques("2(2x + 3 + x)", "6x + 6"));
  eg(15, "6 \\times 4 + 6 = 30");
  eg(15, "2 \\times 4^2 + 3 \\times 4 = 32 + 12 = 44");
  eg(15, "11 + 4 + 11 + 4 = 30");
  eg(15, "11 \\times 4 = 44");
  {
    const rs = rects(15);
    const fig = rs.find((r) => r.role === "figure");
    const sch = rs.find((r) => r.role === "schema");
    v.ok("15. la figure de l'énoncé (sans les aires) et le schéma du corrigé (avec)", !!fig && !!sch && fig.cases.length === 0 && sch.cases.length === 3);
    if (fig) dessinRect(15, fig, { produit: "(2x + 3)x" });
    if (sch) dessinRect(15, sch, { produit: "(2x + 3)x", somme: "2x^2 + 3x" });
    v.ok("15. pour x = 4, le dessin mesure 11 sur 4", fig && egal(val("2x + 3", fig.pour), Q(11)) && fig.gauche[1] === 4);
  }
  dit(15, "Réponse : $P = 6x + 6$ ; $A = 2x^2 + 3x$ ; pour $x = 4$, $30$ m et $44$ m².");

  // 16 — les âges.
  chaine(16, "2 \\times 3x - 4", "6x - 4", { enonce: false });
  chaine(16, "x + x + 3 + 3x + 6x - 4", "11x - 1", { enonce: false });
  {
    const leo = 12;
    const ages = [leo, leo + 3, 3 * leo, 2 * (3 * leo) - 4];
    const somme = ages.reduce((a, b) => a + b, 0);
    v.ok(`16. les phrases, rejouées : ${ages.join(", ")}, somme ${somme}`, somme === 131 && ages[3] === 68);
    eg(16, "6 \\times 12 - 4 = 68");
    eg(16, "12 + 15 + 36 + 68 = 131");
    eg(16, "11 \\times 12 - 1 = 131");
    const t = tableauDe(16);
    const cases = t.entete.slice(1).map((h, i) => [h.split(" : ")[1], t.ligne[i + 1]]);
    const faux = cases.filter(([ex, n]) => !egal(val(conv(ex), leo), nombre(n)));
    v.ok("16. le tableau : chaque formule recalculée en 12", cases.length === 5 && faux.length === 0 && cases.slice(0, 4).every(([, n], i) => n === ages[i]) && cases[4][1] === somme, faux.map(([ex]) => ex).join(" | "));
  }
  v.ok("16. le piège : 3x donnerait 36 ans à la sœur", egal(val("3x", 12), Q(36)) && c(16).includes("elle aurait $36$ ans"));
  dit(16, "Réponse : $x$, $x + 3$, $3x$, $6x - 4$ ; la somme vaut $11x - 1$, soit $131$ ans pour $x = 12$.");

  /* ── ★★★ Problèmes ──────────────────────────────────────────────────── */
  v.titre("★★★ Problèmes");

  // 17 — la fréquence cardiaque, en a.
  const F17 = "220 - a";
  const T17 = "208 - 0{,}7a";
  v.ok("17. l'énoncé donne F = 220 − a et T = 208 − 0,7a", e(17).includes(`$F = ${F17}$`) && e(17).includes(`$T = ${T17}$`));
  const F = (a) => val(enX(F17, "a"), a);
  const T = (a) => val(enX(T17, "a"), a);
  eg(17, "220 - 14 = 206");
  eg(17, "208 - 0{,}7 \\times 14 = 208 - 9{,}8 = 198{,}2");
  v.ok("17. F(14) = 206 et T(14) = 198,2 sur les formules", egal(F(14), Q(206)) && egal(T(14), D("198.2")));
  eg(17, "220 - 20 = 200");
  eg(17, "208 - 0{,}7 \\times 20 = 208 - 14 = 194");
  eg(17, "220 - 40 = 180");
  eg(17, "208 - 0{,}7 \\times 40 = 208 - 28 = 180");
  eg(17, "220 - 60 = 160");
  eg(17, "208 - 0{,}7 \\times 60 = 208 - 42 = 166");
  v.ok("17. égales à 40 seulement ; F plus grand à 20, T plus grand à 60", egal(F(40), T(40)) && inf(T(20), F(20)) && inf(F(60), T(60)) && c(17).includes("À $40$ ans, les deux formules donnent $180$"));
  v.ok("17. le piège : (208 − 0,7) × 14 dépasse 2 900", (208 - 0.7) * 14 > 2900 && c(17).includes("plus de $2\\,900$"));
  {
    const g = grilleDe(17);
    const ages = g.entete.slice(1);
    const fautes = g.lignes.flatMap(([lab, ...vals]) => ages.filter((a, i) => !egal(val(enX(conv(lab), "a"), a), nombre(vals[i]))).map((a) => `${lab} en ${a}`));
    v.ok("17. le tableau : les deux formules recalculées en 20, 40, 60", g.lignes.length === 2 && identiques(enX(conv(g.lignes[0][0]), "a"), enX(F17, "a")) && identiques(enX(conv(g.lignes[1][0]), "a"), enX(T17, "a")) && fautes.length === 0, fautes.join(" | "));
  }

  // 18 — les allumettes, recomptées côté par côté.
  const compte = (n) => {
    const cotes = new Set();
    for (let i = 0; i < n; i++) for (const s of [`h${i},0`, `h${i},1`, `v${i}`, `v${i + 1}`]) cotes.add(s);
    return cotes.size;
  };
  v.ok("18. le recompte donne 3n + 1 de 1 à 60 carrés, et pas 4n dès 2", [...Array(60).keys()].every((i) => compte(i + 1) === 3 * (i + 1) + 1) && compte(2) !== 4 * 2 && compte(1) === 4);
  {
    const m = /allumettes\((\[\[.*?\]\])\)/.exec(bloc(18));
    const rangees = m ? JSON.parse(m[1]) : [];
    v.ok(`18. la figure : ${rangees.map(([n, k]) => `${n} carré(s), ${k} allumettes`).join(" ; ")}, recomptées`, rangees.length === 3 && rangees.every(([n, k]) => compte(n) === k) && m && role(18, m.index) === "figure");
    const t = tableauDe(18);
    v.ok("18. le tableau : 1 à 5 carrés recomptés", t && t.entete.slice(1).every((n, i) => compte(Number(n)) === t.ligne[i + 1]) && t.entete.length === 6, JSON.stringify(t?.ligne));
  }
  dit(18, "Donc $13$ allumettes pour $4$ carrés, et $16$ pour $5$.");
  v.ok("18. 13 et 16 recomptés", compte(4) === 13 && compte(5) === 16);
  dit(18, "Inès a raison");
  eg(18, "4 \\times 2 = 8");
  eg(18, "3 \\times 50 + 1 = 151");
  v.ok("18. 50 carrés : 151 recomptés", compte(50) === 151);
  eg(18, "100 - 1 = 99");
  v.ok("18. 99 ÷ 3 = 33, et 33 carrés prennent 100 allumettes", 99 / 3 === 33 && compte(33) === 100 && c(18).includes("$99 \\div 3 = 33$"));
  eg(18, "3 \\times 33 + 1 = 100");

  // 19 — trois entiers qui se suivent, en n.
  eg(19, "8 + 9 + 10 = 27");
  eg(19, "27 = 3 \\times 9");
  eg(19, "30 + 31 + 32 = 93");
  eg(19, "93 = 3 \\times 31");
  chaineL(19, "n + n + 1 + n + 2", "3n + 3", "n");
  chaineL(19, "n + 1 + n + 1 + n + 1", "3n + 3", "n");
  v.ok("19. pour n de −50 à 50 : n + (n + 1) + (n + 2) = 3 × (n + 1)", [...Array(101).keys()].map((i) => i - 50).every((n) => n + (n + 1) + (n + 2) === 3 * (n + 1)));
  v.ok("19. 72 ÷ 3 = 24 : 23, 24, 25", 72 / 3 === 24 && 23 + 24 + 25 === 72 && c(19).includes("$72 \\div 3 = 24$"));
  eg(19, "23 + 24 + 25 = 72");
  {
    const g = grilleDe(19);
    const fautes = [];
    for (const [gauche, droite] of g.lignes) {
      const ns = gauche.split(" + ").map(Number);
      const [s, prod] = droite.split(" = ");
      const [trois, milieu] = prod.split(" × ").map(Number);
      if (!(ns.length === 3 && ns[1] === ns[0] + 1 && ns[2] === ns[1] + 1)) fautes.push(`${gauche} : pas consécutifs`);
      if (ns[0] + ns[1] + ns[2] !== Number(s)) fautes.push(`${gauche} ≠ ${s}`);
      if (trois !== 3 || milieu !== ns[1] || 3 * milieu !== Number(s)) fautes.push(`${droite} : pas le triple du milieu`);
    }
    v.ok("19. le tableau : trois lignes de consécutifs, somme = 3 × milieu", g.lignes.length === 3 && fautes.length === 0, fautes.join(" | "));
  }
  dit(19, "Réponse : la somme vaut $3n + 3$, le triple du nombre du milieu $n + 1$ ; les entiers cherchés sont $23$, $24$ et $25$.");

  // 20 — la douche, en t et en j.
  dit(20, "la pomme classique utilise $12t$ litres, la pomme économe $6t$ litres");
  [[12, 5], [6, 5], [12, 10], [6, 10], [12, 15]].forEach(([d, t]) => eg(20, `${d} \\times ${t} = ${d * t}`));
  v.ok("20. 15 min de douche classique : 180 L > 150 L", 12 * 15 > 150 && c(20).includes("c'est plus qu'un bain"));
  eg(20, "4 \\times 5 = 20");
  chaineL(20, "20 \\times 12j", "240j", "j");
  chaineL(20, "20 \\times 6j", "120j", "j");
  chaineL(20, "240j - 120j", "120j", "j");
  eg(20, "120 \\times 365 = 43\\,800");
  v.ok("20. autre chemin : 4 × 5 × (12 − 6) × 365 = 43 800 L ≈ 44 m³", 4 * 5 * (12 - 6) * 365 === 43800 && Math.round(43800 / 1000) === 44 && c(20).includes("près de $44$ m³"));
  {
    const g = grilleDe(20);
    const ts = g.entete.slice(1).map((h) => h.replace(" min", ""));
    const fautes = g.lignes.flatMap(([lab, ...vals]) => ts.filter((t, i) => !egal(val(enX(conv(lab), "t"), t), nombre(vals[i]))).map((t) => `${lab} en ${t}`));
    v.ok("20. le tableau : 12t et 6t recalculés en 5, 10, 15 min", g.lignes.length === 2 && g.lignes[0][0] === "12t" && g.lignes[1][0] === "6t" && fautes.length === 0, fautes.join(" | "));
  }
  dit(20, "l'économie vaut $120j$ litres, soit $43\\,800$ L en un an.");
}

lancer({
  nom: "LES EXPRESSIONS LITTÉRALES · 4e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-4e-expressions.tsx",
  notionId: "litteral_expression",
  classe: "4e",
  verifier,
  casses: [
    ["ex. 1 : le coefficient de −x pris pour 1", "[\"coefficient\", 8, -1, \"sans x\"]", "[\"coefficient\", 8, 1, \"sans x\"]"],
    ["ex. 2 : le nombre mal rangé", "x \\\\times 9 = 9x$", "x \\\\times 9 = 10x$"],
    ["ex. 2 : le carré dessiné rempli de 2x", "[\"x²\"], 20)", "[\"2x\"], 20)"],
    ["ex. 3 : le carré de 10 pris pour le double", "[\"valeur\", 40, 3, 100, 5, 32]", "[\"valeur\", 40, 3, 20, 5, 32]"],
    ["ex. 4 : moins par moins oublié", "= 7 + 8 = 15$", "= 7 - 8 = -1$"],
    ["ex. 5 : −2² dans le tableau", "[\"D\", 10, 10, -2]", "[\"D\", 10, 2, -2]"],
    ["ex. 6 : les unités rouges comptées positives", "{ texte: \"5x + 2\", x: 5, u: 2 }", "{ texte: \"5x + 2\", x: 5, u: 10 }"],
    ["ex. 7 : le signe du produit perdu", "-2x \\\\times 5x = -10x^2$", "-2x \\\\times 5x = 10x^2$"],
    ["ex. 7 : une case du dessin sans carré", "[\"x²\", \"x²\", \"x²\", \"x²\", \"x²\", \"x²\"]", "[\"x²\", \"x²\", \"x²\", \"x²\", \"x²\", \"x\"]"],
    ["ex. 8 : les x² mal réduits", "= -x^2 + x + 3$", "= -3x^2 + x + 3$"],
    ["ex. 9 : le rectangle mal dessiné", "rect([[\"x + 5\", 8]], [\"x\", 3], 3)", "rect([[\"x + 5\", 9]], [\"x\", 3], 3)"],
    ["ex. 9 : l'aire sans parenthèses", "(3 + 5) \\\\times 3 = 24$", "(3 + 5) \\\\times 3 = 18$"],
    ["ex. 10 : un sommet du triangle déplacé", "C: [1.5714, 2.5555]", "C: [2.5714, 2.5555]"],
    ["ex. 10 : le x seul compté pour zéro", "x + 2x + x + 4 = 4x + 4$", "x + 2x + x + 4 = 3x + 4$"],
    ["ex. 11 : une étape de la trace fausse", "[\"+ 8\", \"28\", \"−2\", \"5x + 8\"]", "[\"+ 8\", \"28\", \"2\", \"5x + 8\"]"],
    ["ex. 12 : un prix de la formule B faux", "[\"11n\", 55, 88, 132]", "[\"11n\", 55, 88, 128]"],
    ["ex. 13 : le signe de −9x perdu dans le tableau", "[\"x\", \"7x et −9x\", \"−2x\"]", "[\"x\", \"7x et −9x\", \"2x\"]"],
    ["ex. 14 : l'égalité vraie déclarée fausse", "d) VRAI.", "d) FAUX."],
    ["ex. 15 : le petit rectangle vu comme un nombre", "[\"x²\", \"x²\", \"3x\"]", "[\"x²\", \"x²\", \"3\"]"],
    ["ex. 16 : l'âge de la grand-mère faux", "[\"âge\", 12, 15, 36, 68, 131]", "[\"âge\", 12, 15, 36, 72, 131]"],
    ["ex. 17 : une valeur de Tanaka fausse", "[\"208 − 0,7a\", 194, 180, 166]", "[\"208 − 0,7a\", 196, 180, 166]"],
    ["ex. 17 : la soustraction avant le produit", "= 208 - 9{,}8 = 198{,}2$", "= 207{,}3 \\\\times 14 = 198{,}2$"],
    ["ex. 18 : une rangée de la figure mal comptée", "[2, 7]", "[2, 8]"],
    ["ex. 19 : le milieu mal lu", "\"93 = 3 × 31\"", "\"93 = 3 × 30\""],
    ["ex. 20 : additionner au lieu de multiplier", "20 \\\\times 12j = 240j$", "20 \\\\times 12j = 32j$"],
    ["une micro d'une autre notion", "micros: [\"litteral_expression_comprendre\"],\n        },\n        {\n          enonce: \"Écrire", "micros: [\"litteral_distributivite_simple\"],\n        },\n        {\n          enonce: \"Écrire"],
    ["une formule dans une consigne", "Je vérifie en remplaçant la lettre par un nombre.", "Je vérifie en remplaçant $x$ par un nombre."],
    ["un $ dans un canvas", "tableau([\"x\", \"5\", \"−2\", \"1\"]", "tableau([\"$x$\", \"5\", \"−2\", \"1\"]"],
  ],
});
