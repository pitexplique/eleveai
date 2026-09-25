// Recalcul INDÉPENDANT des vingt corrigés de la feuille « La factorisation »
// de 4e (lib/fiches-exercices/maths-4e-factorisation.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé factorise à la main ; ici on ne factorise RIEN.
// Chaque forme est lue telle qu'elle est écrite (`evalTex`) et évaluée en
// fractions exactes en neuf valeurs de x (`chaine` : « départ = … = forme$ »
// dans UNE formule du corrigé). Les calculs numériques « a = b = c » sont relus
// membre par membre (`outilsEgalites`). Le PLUS GRAND facteur commun est
// recalculé terme par terme (pgcd des coefficients, plus petite puissance de x).
//
// ⭐⭐ LES DESSINS SONT RELUS : chaque appel `aires(haut, cote, cases)` est lu
// dans le source ; chaque case doit valoir « étiquette de sa ligne × étiquette
// de sa colonne », le rectangle entier doit être le produit du corrigé, la
// somme des cases l'expression de départ ; un nombre plus grand est dessiné
// plus long (même famille : les nombres entre eux, les « kx » entre eux) ; le
// texte tient dans ses cases et reste à 11 px au moins sur téléphone (viewBox
// ≤ 300 pour un dessin d'au moins 16,5rem). Chaque `controle(…)` est rejoué :
// le développement écrit, le verdict « juste / faux », et « pas finie ». Chaque
// `tableau()` est rejoué sur son programme.
//
//   node scripts/verifier-exercices-factorisation-4e.mjs

import fs from "node:fs";
import path from "node:path";
import { Q, RACINE, egal, evalTex, identiques, lireFeuille, lancer, outilsAlgebre, outilsEgalites } from "./verifier-exercices-commun.mjs";

/** Une étiquette de dessin (« −8x », « 6x² », « 2 209 », « (x − 3)² ») → LaTeX lisible par evalTex. */
const conv = (s) => s.replace(/−/g, "-").replace(/²/g, "^2").replace(/\s+/g, "");
/** La même étiquette écrite comme dans une formule de la feuille : `x^2 - 9x`. */
const texDe = (s) => s.replace(/−/g, "-").replace(/²/g, "^2");

const pgcd = (a, b) => (b === 0n ? (a < 0n ? -a : a) : pgcd(b, a % b));
/** Les termes d'un polynôme écrit (« 12x² + 8x ») : coefficient et puissance de x. */
function monomes(expr) {
  return [...conv(expr).matchAll(/([+-]?)(\d*)(x(?:\^(\d))?)?/g)]
    .filter((m) => m[2] || m[3])
    .map((m) => ({ c: BigInt(m[2] || "1"), k: m[3] ? Number(m[4] || 1) : 0 }));
}
/** Le plus grand facteur commun, écrit comme dans la feuille : « 4x », « 2 », « x ». */
function pgfc(expr) {
  const t = monomes(expr);
  const g = t.reduce((a, m) => pgcd(a, m.c), 0n);
  const k = Math.min(...t.map((m) => m.k));
  const lettre = k === 0 ? "" : k === 1 ? "x" : `x^${k}`;
  return (g === 1n && k > 0 ? "" : String(g)) + lettre;
}

function verifier(source, v) {
  const f = lireFeuille(source);
  const { blocs } = f;
  const { e, c, dit, chaine, vaut } = outilsAlgebre(v, f);
  const eg = outilsEgalites(v, f);
  /** Une égalité littérale « a = b = c » écrite dans le corrigé k, tous membres identiques. */
  const eqx = (k, texte, conv_ = (s) => s) => {
    const membres = texte.split(" = ").map(conv_);
    const ok = membres.every((m) => identiques(m, membres[0]));
    v.ok(`${k}. ${texte}`, ok && c(k).includes(texte), `membres identiques : ${ok} ; écrit : ${c(k).includes(texte)}`);
  };

  /** Les dessins d'aires de l'exercice k, relus dans le source. */
  const lesAires = (k) =>
    [...(blocs[k - 1] ?? "").matchAll(/aires\((\[\[.*?\]\]), (\[\[.*?\]\]), (\[\[.*?\]\])\)/g)].map((m) => [m[1], m[2], m[3]].map((t) => JSON.parse(t)));

  /** Le dessin i de l'exercice k : chaque case = ligne × colonne, le rectangle est `produit`, les cases font `somme`. */
  const dessinAires = (k, produit, somme, i = 0) => {
    const d = lesAires(k)[i];
    if (!d) {
      v.ok(`${k}. un dessin d'aires`, false, "absent");
      return;
    }
    const [haut, cote, cases] = d;
    const fautes = [];
    if (cases.length !== cote.length || cases.some((l) => l.length !== haut.length)) fautes.push("nombre de cases");
    cote.forEach(([r], a) =>
      haut.forEach(([h], b) => {
        const cel = cases[a]?.[b];
        if (cel === undefined || !identiques(conv(cel), `(${conv(r)})(${conv(h)})`)) fautes.push(`case ${r} × ${h} : « ${cel} »`);
      }),
    );
    // Même étiquette (au signe près), même longueur ; un nombre plus grand, plus long.
    const longueurs = {};
    const familles = { n: [], x: [] };
    for (const [t, l] of [...haut, ...cote]) {
      const nu = t.replace("−", "");
      if (!(l > 0)) fautes.push(`longueur ${l}`);
      if (longueurs[nu] !== undefined && longueurs[nu] !== l) fautes.push(`« ${t} » dessiné à deux longueurs`);
      longueurs[nu] = l;
      if (/^\d+$/.test(nu)) familles.n.push([Number(nu), l, t]);
      const mx = /^(\d*)x$/.exec(nu);
      if (mx) familles.x.push([Number(mx[1] || 1), l, t]);
    }
    for (const fam of Object.values(familles))
      for (const [a, la, ta] of fam) for (const [b, lb, tb] of fam) if (a < b && !(la < lb)) fautes.push(`« ${ta} » dessiné plus long que « ${tb} »`);
    const sommeDe = (l) => l.map((t) => `(${conv(t)})`).join("+");
    const rect = `(${sommeDe(haut.map((h) => h[0]))})(${sommeDe(cote.map((r) => r[0]))})`;
    if (!identiques(rect, produit)) fautes.push(`le rectangle n'est pas ${produit}`);
    if (!identiques(sommeDe(cases.flat()), somme)) fautes.push(`les cases ne font pas ${somme}`);
    // Lisible : viewBox ≤ 300 (13 × 264 / 300 = 11,4 px), texte dans ses cases.
    const G = 44;
    const W = haut.reduce((s, [, l]) => s + l, 0);
    if (G + W + 6 > 300) fautes.push(`viewBox de ${G + W + 6} : texte sous 11 px à 375`);
    cote.forEach(([, h], a) =>
      haut.forEach(([, w], b) => {
        const t = cases[a]?.[b] ?? "";
        if ([...t].length * 7.8 > w - 4 || h < 20) fautes.push(`« ${t} » ne tient pas dans ${w} × ${h}`);
      }),
    );
    haut.forEach(([t, l]) => [...t].length * 8.5 > l + 6 && fautes.push(`l'étiquette « ${t} » déborde de son côté (${l})`));
    cote.forEach(([t, l]) => ([...t].length * 8.5 > G - 9 || l < 16) && fautes.push(`l'étiquette « ${t} » ne tient pas à gauche`));
    v.ok(`${k}. le dessin : ${cases.flat().length} aires = ligne × colonne, rectangle ${produit}, total ${somme}, lisible`, fautes.length === 0, fautes.slice(0, 3).join(" | "));
  };

  /** Le `tableau([entête], [ligne])` de l'exercice k. */
  const leTableau = (k) => {
    const m = /tableau\((\[[^\]]*\]), (\[[^\]]*\])(?:, true)?\)/.exec(blocs[k - 1] ?? "");
    if (!m) return null;
    return { entete: JSON.parse(m[1]), ligne: JSON.parse(m[2]) };
  };
  /** Un tableau d'essais rejoué sur la fonction F. */
  const dessinTableau = (k, F, quoi) => {
    const t = leTableau(k);
    if (!t) {
      v.ok(`${k}. un tableau`, false, "absent");
      return;
    }
    const entrees = t.entete.slice(1).map((s) => Number(s.replace(/−/g, "-")));
    const valeurs = t.ligne.slice(1);
    const faux = entrees.filter((x, i) => F(x) !== valeurs[i]);
    v.ok(`${k}. le tableau : ${quoi} en ${entrees.join(" ; ")} → ${valeurs.join(" ; ")}`, entrees.length >= 3 && entrees.length === valeurs.length && faux.length === 0, faux.length ? `faux en ${faux.join(", ")}` : "tableau mal formé");
  };

  /** Le `controle([[proposition, développement, verdict], …])` de l'exercice k, rejoué. */
  const dessinControle = (k, verdicts) => {
    const m = /controle\((\[\[.*?\]\])\)/.exec(blocs[k - 1] ?? "");
    if (!m) {
      v.ok(`${k}. un tableau de contrôle`, false, "absent");
      return;
    }
    const lignes = JSON.parse(m[1]);
    const fautes = [];
    lignes.forEach(([prop, dev, verdict], i) => {
      const [gauche, droite] = prop.split(" = ");
      if (!identiques(conv(dev), conv(droite))) fautes.push(`ligne ${i + 1} : ${droite} ne se développe pas en ${dev}`);
      const juste = identiques(conv(gauche), conv(droite));
      if (juste !== verdict.startsWith("juste")) fautes.push(`ligne ${i + 1} : « ${verdict} » mais ${juste ? "juste" : "faux"} au calcul`);
      const p = /^([^()]+)\(([^()]+)\)$/.exec(droite);
      const finie = !p || pgfc(p[2]) === "1";
      if (juste && verdict.includes("pas finie") === finie) fautes.push(`ligne ${i + 1} : « ${verdict} » mais la parenthèse ${finie ? "n'a plus" : "a encore"} un facteur commun`);
      if (!e(k).includes(`$${texDe(prop)}$`)) fautes.push(`ligne ${i + 1} : « ${texDe(prop)} » absent de l'énoncé`);
    });
    const lus = lignes.map((l) => (l[2].startsWith("juste") ? (l[2].includes("pas finie") ? "juste, pas finie" : "juste") : "faux"));
    if (JSON.stringify(lus) !== JSON.stringify(verdicts)) fautes.push(`verdicts ${lus.join(", ")}`);
    v.ok(`${k}. le tableau de contrôle : ${lignes.length} lignes développées et jugées`, fautes.length === 0, fautes.slice(0, 2).join(" | "));
  };

  v.titre("★ Un seul geste");
  // 1 — le plus grand facteur commun, recalculé terme par terme.
  {
    const t = leTableau(1);
    const exprs = t.entete.slice(1);
    const lus = t.ligne.slice(1);
    const calc = exprs.map(pgfc);
    v.ok(`1. plus grands facteurs communs : ${calc.join(", ")}`, JSON.stringify(calc) === JSON.stringify(lus.map(conv)), `tableau : ${lus.join(", ")}`);
    v.ok("1. les expressions du tableau sont celles de l'énoncé", exprs.every((x) => e(1).includes(`$${texDe(x)}$`)));
    dit(1, `Réponse : ${calc.map((g) => `$${g}$`).join(" ; ")}.`);
    ["4x = 2 \\times 2x", "18 = 2 \\times 9", "15x = 5 \\times 3x", "12x^2 = 4x \\times 3x", "8x = 4x \\times 2"].forEach((t) => eqx(1, t));
    v.ok("1. le piège : 4 ne divise pas 18", 18 % 4 !== 0);
  }

  // 2 — factoriser par un nombre.
  chaine(2, "6x + 42", "6(x + 7)");
  chaine(2, "9x - 36", "9(x - 4)");
  chaine(2, "14 + 21x", "7(2 + 3x)");
  chaine(2, "10x - 25", "5(2x - 5)");
  eqx(2, "5(2x - 25) = 10x - 125");
  v.ok("2. le piège 5(2x − 25) n'est pas 10x − 25", !identiques("5(2x - 25)", "10x - 25"));
  dessinAires(2, "6(x + 7)", "6x + 42");

  // 3 — la lettre dans le facteur commun.
  chaine(3, "x^2 + 8x", "x(x + 8)");
  chaine(3, "3x^2 - 7x", "x(3x - 7)");
  chaine(3, "6x^2 + 15x", "3x(2x + 5)");
  chaine(3, "10x^2 - 4x", "2x(5x - 2)");
  v.ok("3. les facteurs choisis sont les plus grands", ["x^2 + 8x", "3x^2 - 7x", "6x^2 + 15x", "10x^2 - 4x"].map(pgfc).join(",") === "x,x,3x,2x");
  v.ok("3. le piège 3(2x² + 5x) est juste mais pas fini", identiques("3(2x^2 + 5x)", "6x^2 + 15x") && pgfc("2x^2 + 5x") === "x");
  dessinAires(3, "3x(2x + 5)", "6x^2 + 15x");

  // 4 — le 1 caché.
  chaine(4, "7x + 7", "7(x + 1)");
  chaine(4, "x^2 - x", "x(x - 1)");
  chaine(4, "8x + 4", "4(2x + 1)");
  chaine(4, "5x^2 + x", "x(5x + 1)");
  eqx(4, "4(2x + 1) = 8x + 4");
  v.ok("4. les pièges 7(x) et 4(2x) perdent un terme", !identiques("7x", "7x + 7") && !identiques("4(2x)", "8x + 4"));
  dessinAires(4, "4(2x + 1)", "8x + 4");

  // 5 — vérifier en développant.
  eqx(5, "6(2x + 5) = 6 \\times 2x + 6 \\times 5 = 12x + 30");
  eqx(5, "4(2x - 6) = 4 \\times 2x - 4 \\times 6 = 8x - 24");
  eqx(5, "7(3x + 7) = 7 \\times 3x + 7 \\times 7 = 21x + 49");
  chaine(5, "8x - 24", "8(x - 3)");
  chaine(5, "21x + 14", "7(3x + 2)");
  dessinControle(5, ["juste", "juste, pas finie", "faux"]);
  dit(5, "Réponse : a) juste ; b) juste mais pas finie, $8(x - 3)$ ; c) fausse, $7(3x + 2)$.");

  // 6 — développer (x − 3)(x + 3), puis LIRE à l'envers : sans formule.
  chaine(6, "(x - 3)(x + 3)", "x^2 - 9");
  eqx(6, "(x - 3)(x + 3) = x \\times x + x \\times 3 - 3 \\times x - 3 \\times 3 = x^2 + 3x - 3x - 9 = x^2 - 9");
  chaine(6, "x^2 - 9", "(x - 3)(x + 3)");
  vaut(6, "x^2 - 9", "(x - 3)(x + 3)", "b) Je lis le a) dans l'autre sens : $x^2 - 9 = (x - 3)(x + 3)$");
  chaine(6, "(x - 8)(x + 8)", "x^2 - 64");
  dit(6, "donc $x^2 - 64 = (x - 8)(x + 8)$");
  v.ok("6. x² − 64 ≡ (x − 8)(x + 8)", identiques("x^2 - 64", "(x - 8)(x + 8)"));
  eqx(6, "(x - 3)(x - 3) = x^2 - 3x - 3x + 9 = x^2 - 6x + 9");
  v.ok("6. le piège (x − 3)(x − 3) n'est pas x² − 9", !identiques("(x - 3)(x - 3)", "x^2 - 9"));
  dessinAires(6, "(x - 3)(x + 3)", "x^2 - 9");

  // 7 — un facteur négatif.
  chaine(7, "-5x - 15", "-5(x + 3)");
  chaine(7, "-2x + 8", "-2(x - 4)");
  chaine(7, "-3x^2 - 12x", "-3x(x + 4)");
  eqx(7, "-2(x - 4) = -2x + 8");
  eqx(7, "-5(x - 3) = -5x + 15");
  v.ok("7. le piège −5(x − 3) n'est pas −5x − 15", !identiques("-5(x - 3)", "-5x - 15"));
  dessinAires(7, "-5(x + 3)", "-5x - 15");

  // 8 — calcul mental.
  eg(8, "37 \\times 8 + 63 \\times 8 = (37 + 63) \\times 8 = 100 \\times 8 = 800");
  eg(8, "4{,}5 \\times 13 - 2{,}5 \\times 13 = (4{,}5 - 2{,}5) \\times 13 = 2 \\times 13 = 26");
  eg(8, "99 \\times 7 + 7 = (99 + 1) \\times 7 = 100 \\times 7 = 700");
  v.ok("8. multiplications directes : 296 + 504 = 800, 58,5 − 32,5 = 26, 693 + 7 = 700", 37 * 8 + 63 * 8 === 800 && 4.5 * 13 - 2.5 * 13 === 26 && 99 * 7 + 7 === 700);
  v.ok("8. le piège 99 × 14 = 1 386", 99 * 14 === 1386 && c(8).includes("$99 \\times 14 = 1\\,386$"));
  dit(8, "Réponse : $800$ ; $26$ ; $700$.");
  dessinAires(8, "37 \\times 8 + 63 \\times 8", "800");

  v.titre("★★ Type devoir");
  // 9 — factoriser complètement.
  eqx(9, "2(12x + 18) = 24x + 36");
  v.ok("9. la parenthèse de Lina a encore 6 en commun", pgfc("12x + 18") === "6");
  {
    const communs = [...Array(36).keys()].map((i) => i + 1).filter((d) => 24 % d === 0 && 36 % d === 0);
    v.ok(`9. diviseurs communs de 24 et 36 : ${communs.join(", ")}`, communs.join(",") === "1,2,3,4,6,12" && c(9).includes("$1$, $2$, $3$, $4$, $6$ et $12$"));
  }
  chaine(9, "24x + 36", "12(2x + 3)");
  chaine(9, "18x^2 - 12x", "6x(3x - 2)");
  v.ok("9. 12x + 18 → 6 ; 24x + 36 → 12 ; 18x² − 12x → 6x", pgfc("24x + 36") === "12" && pgfc("18x^2 - 12x") === "6x");
  v.ok("9. le piège 3x(6x − 4) est juste mais pas fini", identiques("3x(6x - 4)", "18x^2 - 12x") && pgfc("6x - 4") === "2");
  dit(9, "Réponse : a) juste mais pas finie ; b) $12(2x + 3)$ ; c) $6x(3x - 2)$.");
  dessinAires(9, "12(2x + 3)", "24x + 36");

  // 10 — trois termes, réduire d'abord.
  chaine(10, "6x^2 + 9x - 3", "3(2x^2 + 3x - 1)");
  chaine(10, "4x^2 + 3x - x^2 + 6x", "3x(x + 3)");
  v.ok("10. le facteur commun de 6x² + 9x − 3 est 3, pas 3x", pgfc("6x^2 + 9x - 3") === "3");
  dessinAires(10, "3(2x^2 + 3x - 1)", "6x^2 + 9x - 3");

  // 11 — développer (x + 4)(x + 4), puis lire à l'envers : sans formule.
  eqx(11, "(x + 4)(x + 4) = x \\times x + x \\times 4 + 4 \\times x + 4 \\times 4 = x^2 + 4x + 4x + 16 = x^2 + 8x + 16");
  chaine(11, "x^2 + 8x + 16", "(x + 4)(x + 4)");
  ["1^2 + 8 \\times 1 + 16 = 25", "5 \\times 5 = 25", "6^2 + 8 \\times 6 + 16 = 100", "10 \\times 10 = 100", "1^2 + 16 = 17"].forEach((t) => eg(11, t));
  v.ok("11. x = 1 et x = 6 : x + 4 vaut 5 et 10", 1 + 4 === 5 && 6 + 4 === 10);
  chaine(11, "(x - 5)(x - 5)", "x^2 - 10x + 25");
  chaine(11, "x^2 - 10x + 25", "(x - 5)(x - 5)");
  dessinAires(11, "(x + 4)(x + 4)", "x^2 + 8x + 16");

  // 12 — factoriser quand c'est possible ; le tableau est rejoué.
  chaine(12, "x^2 - 11x", "x(x - 11)");
  chaine(12, "22x - 121", "11(2x - 11)");
  chaine(12, "16x^2 - 64x", "16x(x - 4)");
  eqx(12, "16x(x - 4) = 16x^2 - 64x");
  eqx(12, "x(5x + 3) = 5x^2 + 3x");
  v.ok("12. les pièges 4x(4x − 16) et 16(x² − 4x) sont justes mais pas finis", identiques("4x(4x - 16)", "16x^2 - 64x") && identiques("16(x^2 - 4x)", "16x^2 - 64x") && pgfc("4x - 16") !== "1" && pgfc("x^2 - 4x") !== "1");
  {
    const t = leTableau(12);
    const exprs = t.entete.slice(1);
    const formes = t.ligne.slice(1);
    const fautes = [];
    exprs.forEach((x, i) => {
      if (!e(12).includes(`$${texDe(x)}$`)) fautes.push(`« ${x} » absent de l'énoncé`);
      if (formes[i] === "aucune") {
        if (pgfc(x) !== "1") fautes.push(`« ${x} » a le facteur commun ${pgfc(x)}`);
      } else {
        if (!identiques(conv(x), conv(formes[i]))) fautes.push(`${x} ≠ ${formes[i]}`);
        const p = /^([^()]+)\(([^()]+)\)$/.exec(formes[i]);
        if (!p || conv(p[1]) !== pgfc(x) || pgfc(p[2]) !== "1") fautes.push(`${formes[i]} : pas par le plus grand facteur (${pgfc(x)})`);
      }
    });
    v.ok(`12. le tableau : ${formes.join(" ; ")}`, fautes.length === 0 && formes.length === 4, fautes.join(" | "));
  }
  dit(12, "$5x^2 + 3$ n'a pas de facteur commun.");

  // 13 — la copie de Hugo.
  chaine(13, "9x^2 + 3x", "3x(3x + 1)");
  chaine(13, "12x^2 - 8x", "4x(3x - 2)");
  eqx(13, "4x(3x - 8) = 12x^2 - 32x");
  eqx(13, "8x = 4x \\times 2");
  dessinControle(13, ["juste", "faux", "faux", "juste"]);
  dit(13, "Réponse : a) juste ; b) faux, $3x(3x + 1)$ ; c) faux, $4x(3x - 2)$ ; d) juste.");

  // 14 — de l'aire aux côtés.
  chaine(14, "6x + 18", "6(x + 3)");
  chaine(14, "x^2 + 7x", "x(x + 7)");
  chaine(14, "5x^2 + 10x", "5x(x + 2)");
  ["6 \\times 5 + 18 = 48", "6 \\times 8 = 48", "5^2 + 7 \\times 5 = 60", "5 \\times 12 = 60", "5 \\times 5^2 + 10 \\times 5 = 175", "25 \\times 7 = 175", "6 \\times (5 + 18) = 138"].forEach((t) => eg(14, t));
  v.ok("14. pour x = 5 : x + 3 = 8, x + 7 = 12, 5x = 25, x + 2 = 7", 5 + 3 === 8 && 5 + 7 === 12 && 5 * 5 === 25 && 5 + 2 === 7);
  dit(14, "donc la longueur est $x + 3$ cm");
  dit(14, "donc la longueur est $x + 2$ cm");
  dit(14, "Réponse : a) $x + 3$ cm ; b) $x$ cm ; c) $x + 2$ cm.");
  v.ok("14. deux dessins côte à côte", lesAires(14).length === 2 && /deux\(/.test(blocs[13] ?? ""));
  dessinAires(14, "6(x + 3)", "6x + 18", 0);
  dessinAires(14, "5x(x + 2)", "5x^2 + 10x", 1);

  // 15 — le programme de calcul, rejoué.
  const prog15 = (n) => 4 * n - 10;
  [1, 3, 6, 10].forEach((n) => eg(15, `4 \\times ${n} - 10 = ${prog15(n)}`));
  chaine(15, "4x - 10", "2(2x - 5)", { enonce: false });
  v.ok("15. 2 et −6 ne sont pas des multiples de 4 ; tout est pair de −50 à 50", prog15(3) % 4 !== 0 && prog15(1) % 4 !== 0 && [...Array(101).keys()].map((i) => i - 50).every((n) => prog15(n) % 2 === 0 && prog15(n) === 2 * (2 * n - 5)));
  dessinTableau(15, prog15, "4x − 10");
  dit(15, "Réponse : $-6$, $2$, $14$, $30$ ; Inès a tort ; $4x - 10 = 2(2x - 5)$, toujours pair.");

  // 16 — trois entiers qui se suivent (la lettre n, lue comme x).
  const nx = (s) => s.replace(/n/g, "x");
  eg(16, "4 + 5 + 6 = 15");
  eg(16, "10 + 11 + 12 = 33");
  v.ok("16. n + (n + 1) + (n + 2) = 3n + 3 = 3(n + 1)", identiques(nx("n + (n + 1) + (n + 2)"), nx("3n + 3")) && identiques(nx("3n + 3"), nx("3(n + 1)")) && c(16).includes("$n + (n + 1) + (n + 2) = 3n + 3$") && c(16).includes("$3n + 3 = 3 \\times n + 3 \\times 1 = 3(n + 1)$"));
  eg(16, "99 + 100 + 101 = 3 \\times 100 = 300");
  ["15 = 3 \\times 5", "33 = 3 \\times 11", "78 = 3 \\times 26", "300 = 3 \\times 100"].forEach((t) => eg(16, t));
  dessinTableau(16, (n) => n + (n + 1) + (n + 2), "n + (n + 1) + (n + 2)");
  v.ok("16. chaque somme du tableau vaut 3 × l'entier du milieu", [4, 10, 25, 99].every((n) => 3 * n + 3 === 3 * (n + 1)));

  v.titre("★★★ Problèmes");
  // 17 — le terrain de handball.
  eg(17, "40 \\times 20 = 800");
  chaine(17, "800 + 40x + 40x", "800 + 80x", { enonce: false });
  chaine(17, "800 + 80x", "40(20 + 2x)", { enonce: false });
  eg(17, "40 \\times (20 + 2 \\times 1) = 40 \\times 22 = 880");
  eg(17, "800 + 80 \\times 1 = 880");
  v.ok("17. 960 ÷ 40 = 24, (24 − 20) ÷ 2 = 2, et 40(20 + 2 × 2) = 960", 960 / 40 === 24 && (24 - 20) / 2 === 2 && 40 * (20 + 2 * 2) === 960 && c(17).includes("$960 \\div 40 = 24$") && c(17).includes("soit $2$ m chacune"));
  dit(17, "Réponse : l'aire totale est $800 + 80x = 40(20 + 2x)$ m² ; $880$ m² pour $x = 1$ ; des bandes de $2$ m.");
  dessinAires(17, "40(20 + 2x)", "800 + 80x");

  // 18 — le potager.
  chaine(18, "x^2 + 2x + 2x + 4", "x^2 + 4x + 4", { enonce: false });
  chaine(18, "(x + 2)(x + 2)", "x^2 + 4x + 4", { enonce: false });
  vaut(18, "x^2 + 4x + 4", "(x + 2)(x + 2)", "Donc $x^2 + 4x + 4 = (x + 2)(x + 2)$");
  chaine(18, "x^2 + 4x + 4 - x^2", "4(x + 1)", { enonce: false });
  v.ok("18. (10 + 2)² = 144 = 12 × 12, et 12 − 2 = 10", (10 + 2) ** 2 === 144 && 12 * 12 === 144 && c(18).includes("$x = 12 - 2 = 10$"));
  eg(18, "4 \\times 11 = 44");
  eg(18, "144 - 100 = 44");
  v.ok("18. le piège x² + 4x n'est pas un carré (x = 10 : 140)", 10 * 10 + 4 * 10 === 140 && !Number.isInteger(Math.sqrt(140)));
  dit(18, "le potager mesure $10$ m de côté");
  dessinAires(18, "(x + 2)(x + 2)", "x^2 + 4x + 4");

  // 19 — la forêt replantée.
  eg(19, "12 \\times 5 = 60");
  chaine(19, "12x + 60", "12(x + 5)", { enonce: false });
  eqx(19, "12x + 60 = 12 \\times x + 12 \\times 5 = 12(x + 5)");
  eg(19, "12 \\times 15 + 60 = 240");
  eg(19, "12 \\times (15 + 5) = 12 \\times 20 = 240");
  v.ok("19. 300 ÷ 12 = 25, 25 − 5 = 20, et 12(20 + 5) = 300", 300 / 12 === 25 && 12 * (20 + 5) === 300 && c(19).includes("$300 \\div 12 = 25$") && c(19).includes("$25 - 5 = 20$"));
  dit(19, "Réponse : $12x + 60 = 12(x + 5)$ arbres ; $240$ arbres pour $x = 15$ ; $20$ chênes par rangée.");
  dessinAires(19, "12(x + 5)", "12x + 60");

  // 20 — l'étang et sa roselière.
  eg(20, "47 \\times 6 + 47 \\times 6 + 6 \\times 6 = (47 + 47 + 6) \\times 6 = 100 \\times 6 = 600");
  eg(20, "53 \\times 53 - 47 \\times 47 = 2\\,809 - 2\\,209 = 600");
  chaine(20, "6(x - 6) + 6(x - 6) + 36", "12x - 36", { enonce: false });
  v.ok("20. la roselière est bien le terrain moins l'étang : x² − (x − 6)² ≡ 12x − 36", identiques("x^2 - (x - 6)(x - 6)", "12x - 36"));
  chaine(20, "12x - 36", "12(x - 3)", { enonce: false });
  eg(20, "12 \\times (53 - 3) = 12 \\times 50 = 600");
  eg(20, "282 + 282 + 36 = 600");
  eg(20, "6 \\times 6 = 36");
  v.ok("20. l'étang est bien x − 6 : 53 − 6 = 47", 53 - 6 === 47);
  dessinAires(20, "53^2", "2809");
  {
    const [, , cases] = lesAires(20)[0] ?? [[], [], [[]]];
    const roseliere = cases.flat().slice(1).map((t) => Number(conv(t)));
    v.ok("20. le dessin : tout sauf l'étang fait 600", roseliere.reduce((s, x) => s + x, 0) === 600 && Number(conv(cases[0]?.[0] ?? "")) === 2209);
  }

  // ⛔⛔ FRÉDÉRIC, 25/09 : en 4e, une identité remarquable n'est PAS une formule
  // à appliquer — (x + 2)² = (x + 2)(x + 2), puis on distribue. Aucune règle
  // « (a + b)² = », « a² − b² = », « 2ab », ni « identité » ou « double produit »
  // dans ce que l'élève lit (séries, titre, accroche) ni dans la page (title,
  // description). Aucun carré de parenthèse non plus : (x + 2)(x + 2) s'écrit
  // en entier, pour qu'on le distribue.
  {
    const accroche = /accroche:\s*\n?\s*"((?:[^"\\]|\\.)*)"/.exec(source)?.[1] ?? "";
    const titre = /\btitre: "((?:[^"\\]|\\.)*)",\n\s*accroche/.exec(source)?.[1] ?? "";
    const page = fs.readFileSync(path.join(RACINE, "app", "fiches-exercices", "maths", "4e", "litteral-factorisation", "page.tsx"), "utf8");
    const REGLE = /\(\s*a\s*[+−-]\s*b\s*\)\s*(?:\^\s*2|²)|a\s*(?:\^\s*2|²)\s*[+−-]\s*(?:2ab\s*[+−-]\s*)?b\s*(?:\^\s*2|²)\s*=|2ab|identit|double produit|\)\s*(?:\^\s*2|²)/i;
    // Les identifiants de micros (« litteral_factoriser_identite ») ne sont pas lus par l'élève.
    const fautives = [...f.textes.filter((t) => !/^[a-z0-9_]+$/.test(t)), accroche, titre, page].filter((t) => REGLE.test(t));
    v.ok("aucune identité appliquée comme une règle (ni (a + b)², ni a² − b² =, ni 2ab, ni carré de parenthèse)", fautives.length === 0, fautives.map((t) => t.match(REGLE)?.[0]).slice(0, 3).join(" | "));
  }

  v.titre("Les dessins");
  const dessines = blocs.filter((b) => /\bschema:/.test(b)).length;
  v.ok(`${dessines} corrigés dessinés sur 20`, dessines === 20);
  const dollars = blocs.flatMap((b) => [...b.matchAll(/(?:aires|controle|tableau)\([^\n]*/g)].map((m) => m[0])).filter((l) => /[$\\]/.test(l));
  v.ok("pas de $ ni de \\ dans les dessins", dollars.length === 0, dollars[0]?.slice(0, 100));
  void Q;
  void egal;
  void evalTex;
}

lancer({
  nom: "LA FACTORISATION · 4e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-4e-factorisation.tsx",
  notionId: "litteral_factorisation",
  classe: "4e",
  verifier,
  casses: [
    ["ex. 1 : le premier facteur venu au lieu du plus grand", "[\"plus grand facteur commun\", \"2\"", "[\"plus grand facteur commun\", \"4\""],
    ["ex. 2 : le second terme non divisé", "- 5 \\\\times 5 = 5(2x - 5)$", "- 5 \\\\times 5 = 5(2x - 25)$"],
    ["ex. 3 : une aire du dessin fausse", "[[\"6x²\", \"15x\"]]", "[[\"6x²\", \"5x\"]]"],
    ["ex. 4 : le 1 oublié", "4 \\\\times 1 = 4(2x + 1)$", "4 \\\\times 1 = 4(2x)$"],
    ["ex. 5 : une factorisation fausse jugée juste", "\"21x + 49\", \"fausse\"", "\"21x + 49\", \"juste\""],
    ["ex. 5 : « pas finie » oublié", "\"8x − 24\", \"juste, pas finie\"", "\"8x − 24\", \"juste\""],
    ["ex. 6 : la bande négative comptée positive", "[\"−3x\", \"−9\"]", "[\"−3x\", \"9\"]"],
    ["ex. 6 : x² − 9 lu comme (x − 3)(x − 3)", "b) Je lis le a) dans l'autre sens : $x^2 - 9 = (x - 3)(x + 3)$", "b) Je lis le a) dans l'autre sens : $x^2 - 9 = (x - 3)(x - 3)$"],
    ["ex. 7 : le signe gardé dans la parenthèse", "(-5) \\\\times 3 = -5(x + 3)$", "(-5) \\\\times 3 = -5(x - 3)$"],
    ["ex. 8 : le 7 doublé", "= 100 \\\\times 7 = 700$", "= 100 \\\\times 7 = 707$"],
    ["ex. 9 : pas le plus grand facteur", "12 \\\\times 3 = 12(2x + 3)$", "12 \\\\times 3 = 6(4x + 6)$"],
    ["ex. 10 : le 1 dessiné plus long que le 3", "[\"−1\", 24]", "[\"−1\", 60]"],
    ["ex. 11 : les deux bandes oubliées", "[[\"x²\", \"4x\"], [\"4x\", \"16\"]]", "[[\"x²\", \"4x\"], [\"x\", \"16\"]]"],
    ["ex. 11 : le 8x du milieu faux", "4 \\\\times 4 = x^2 + 4x + 4x + 16 = x^2 + 8x + 16$", "4 \\\\times 4 = x^2 + 4x + 4x + 16 = x^2 + 16$"],
    ["ex. 12 : une expression sans facteur commun factorisée", "\"16x(x − 4)\", \"aucune\"", "\"16x(x − 4)\", \"x(5x + 3)\""],
    ["ex. 12 : juste mais pas fini dans le tableau", "\"11(2x − 11)\", \"16x(x − 4)\"", "\"11(2x − 11)\", \"4x(4x − 16)\""],
    ["ex. 13 : un terme non divisé jugé juste", "[\"12x² − 8x = 4x(3x − 8)\", \"12x² − 32x\", \"faux\"]", "[\"12x² − 8x = 4x(3x − 8)\", \"12x² − 32x\", \"juste\"]"],
    ["ex. 14 : le 18 non divisé", "donc la longueur est $x + 3$ cm", "donc la longueur est $x + 18$ cm"],
    ["ex. 14 : une aire du second dessin fausse", "[[\"5x²\", \"10x\"]]", "[[\"5x²\", \"2x\"]]"],
    ["une identité appliquée comme règle", "Quand un terme EST le facteur commun, il reste $1$", "On retient $(a + b)^2 = a^2 + 2ab + b^2$. Quand un terme EST le facteur commun, il reste $1$"],
    ["un carré de parenthèse", "Réponse : l'aire totale est $(x + 2)(x + 2)$ m²", "Réponse : l'aire totale est $(x + 2)^2$ m²"],
    ["ex. 15 : un essai du tableau faux", "[\"résultat\", -6, 2, 14, 30]", "[\"résultat\", -6, 2, 14, 34]"],
    ["ex. 16 : une somme du tableau fausse", "78, 300]", "78, 303]"],
    ["ex. 17 : une bande de sécurité fausse", "[[\"40x\"], [\"800\"], [\"40x\"]]", "[[\"40x\"], [\"800\"], [\"20x\"]]"],
    ["ex. 17 : l'aire pour x = 1 fausse", "= 40 \\\\times 22 = 880$", "= 40 \\\\times 22 = 800$"],
    ["ex. 18 : le côté du grand carré faux", "Donc $x^2 + 4x + 4 = (x + 2)(x + 2)$", "Donc $x^2 + 4x + 4 = (x + 4)(x + 2)$"],
    ["ex. 19 : les hêtres d'une seule rangée", "12 \\\\times 5 = 12(x + 5)$", "12 \\\\times 5 = 12(x + 60)$"],
    ["ex. 20 : le coin pris pour toute la roselière", "= 100 \\\\times 6 = 600$", "= 100 \\\\times 6 = 36$"],
    ["ex. 20 : une bande oubliée dans le calcul général", "= 6x - 36 + 6x - 36 + 36 = 12x - 36$", "= 6x - 36 + 6x - 36 + 36 = 6x - 36$"],
    ["ex. 20 : le coin du dessin faux", "[\"282\", \"36\"]", "[\"282\", \"12\"]"],
    ["un dessin trop large pour le téléphone", "[[\"37\", 90], [\"63\", 150]]", "[[\"37\", 90], [\"63\", 200]]"],
    ["une micro d'une autre notion", "micros: [\"litteral_facteur_commun\"],", "micros: [\"litteral_distributivite_simple\"],"],
    ["un $ dans un canvas", "tableau([\"nombre choisi\", \"1\"", "tableau([\"$x$\", \"1\""],
    ["une formule dans une consigne", "Je vérifie chaque réponse en développant.", "Je vérifie chaque réponse en développant $k(a + b)$."],
  ],
});
