// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Développer un carré »
// de 4e (lib/fiches-exercices/maths-4e-identites-remarquables.tsx), notion
// litteral_identite_remarquable.
//
// ⛔⛔ LE CALIBRAGE DE 4e (Frédéric, 25/09) : aucune formule-règle — ni
// a² + 2ab + b², ni (a + b)² = …, ni a² − b² — dans le texte que l'élève lit
// (titre, accroche, consignes, rappels, énoncés, corrigés, dessins) ni dans la
// page (title, description). Chaque carré s'écrit comme un produit, puis quatre
// produits, puis on réduit. Le contrôle « aucune formule-règle » le garde.
//
// ⭐ L'AUTRE CHEMIN : le corrigé développe à la main ; ici on ne développe RIEN.
// Chaque chaîne d'égalités en x est lue telle qu'elle est écrite (`evalTex`) et
// TOUS ses membres sont comparés en neuf valeurs de x (`egx`) — pas seulement le
// dernier maillon, qui peut être sauvé par la ligne « Réponse ». Les calculs
// numériques « a = b = c » sont relus membre par membre (`outilsEgalites`).
//
// ⭐⭐ LES DESSINS SONT RELUS : chaque appel `aires(haut, cote, cases)` est lu
// dans le source ; chaque case doit valoir « étiquette de sa ligne × étiquette
// de sa colonne », le carré entier doit être le produit de l'énoncé, et la somme
// des cases sa forme développée. Chaque `tableau2(…)` est recalculé case par
// case : les deux produits du milieu sont refaits sur les facteurs, le nombre de
// termes se COMPTE sur les coefficients, l'essai numérique se rejoue.
// ⭐ Lisibilité à 375 px : la largeur de chaque dessin reste sous 250.
//
//   node scripts/verifier-exercices-identites-remarquables-4e.mjs

import fs from "node:fs";
import path from "node:path";
import { Q, egal, inf, plus, moins, div, evalTex, identiques, lireFeuille, lancer, outilsAlgebre, outilsEgalites, RACINE } from "./verifier-exercices-commun.mjs";

/** Une étiquette de dessin (« −6x », « 4x² », « 3 600 », « 0,1 », « n² ») → LaTeX lisible par evalTex. */
const conv = (s) =>
  s
    .replace(/−/g, "-")
    .replace(/²/g, "^2")
    .replace(/,/g, "{,}")
    .replace(/n/g, "x")
    .replace(/\s+/g, "");

/** Les coefficients (a, b, c) d'un polynôme de degré ≤ 2 lu par ses valeurs en −1, 0, 1. */
function coefs(tex) {
  const [m, z, u] = [-1, 0, 1].map((n) => evalTex(tex, Q(n)));
  // p(1) + p(−1) = 2a + 2c ; p(1) − p(−1) = 2b.
  return { a: moins(div(plus(u, m), Q(2)), z), b: div(moins(u, m), Q(2)), c: z };
}

/** La nature d'un produit, CALCULÉE sur ses coefficients (x² en tête) : un carré
 *  (terme du milieu non nul, dernier terme = carré de sa moitié), un milieu qui
 *  s'annule, ou rien de particulier. Noms internes, jamais montrés à l'élève. */
function nature(tex) {
  const { a, b, c } = coefs(tex);
  const zero = Q(0);
  if (!egal(a, Q(1))) return "?";
  const moitie = Q(b.n, b.d * 2n);
  const carre = egal(c, Q(moitie.n * moitie.n, moitie.d * moitie.d));
  if (!egal(b, zero) && carre) return inf(zero, b) ? "carreSomme" : "carreDifference";
  if (egal(b, zero) && inf(c, zero)) return "milieuAnnule";
  return "rien";
}
const nbTermes = (tex) => Object.values(coefs(tex)).filter((q) => !egal(q, Q(0))).length;

/** ⛔ Les formules-règles interdites en 4e : (a + b), (a − b), 2ab, a², b². */
const FORMULES = [/\(\s*a\s*[+−-]\s*b\s*\)/, /\b2\s*ab\b/, /(?<![A-Za-z\\])a\s*(\^\s*\{?2|²)/, /(?<![A-Za-z\\])b\s*(\^\s*\{?2|²)/];
const formulesDans = (textes) => textes.filter((t) => FORMULES.some((re) => re.test(t)));

function verifier(source, v) {
  const f = lireFeuille(source);
  const { blocs } = f;
  const { e, c, dit, chaine, vaut } = outilsAlgebre(v, f);
  const eg = outilsEgalites(v, f);
  const val = (tex, x) => evalTex(tex, typeof x === "object" ? x : Q(x));
  /** « a = b = c » en x, écrit tel quel dans le corrigé k : TOUS les membres
   *  identiques (la chaîne entière, pas seulement son dernier maillon). */
  const egx = (k, texte, lettre = "x") => {
    const membres = texte.replace(new RegExp(lettre, "g"), "x").split(" = ");
    const tous = membres.every((m) => identiques(m, membres[0]));
    v.ok(`${k}. ${texte}`, tous && c(k).includes(`${texte}$`), `membres identiques : ${tous} ; écrit : ${c(k).includes(`${texte}$`)}`);
  };

  /** Tous les dessins d'aires de l'exercice k, relus dans le source. */
  const lesAires = (k) =>
    [...(blocs[k - 1] ?? "").matchAll(/aires\((\[\[.*?\]\]), (\[\[.*?\]\]), (\[\[.*?\]\])\)/g)].map((m) => [m[1], m[2], m[3]].map((t) => JSON.parse(t)));

  /** Le i-ème dessin d'aires de l'exercice k : cases = ligne × colonne, rectangle = produit, total = développé. */
  const dessinAires = (k, produit, developpe, { i = 0, sansCentre } = {}) => {
    const d = lesAires(k)[i];
    if (!d) {
      v.ok(`${k}. un dessin d'aires n° ${i + 1}`, false, "absent");
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
    const longueurs = {};
    for (const [t, l] of [...haut, ...cote]) {
      const nu = t.replace("−", "");
      if (!(l > 0)) fautes.push(`longueur ${l}`);
      if (longueurs[nu] !== undefined && longueurs[nu] !== l) fautes.push(`« ${t} » dessiné à deux longueurs`);
      longueurs[nu] = l;
    }
    const largeur = 44 + haut.reduce((s, [, l]) => s + l, 0) + 6;
    if (largeur > 250) fautes.push(`dessin trop large (${largeur}) pour 375 px`);
    const somme = (l) => l.map((t) => `(${conv(t)})`).join("+");
    const rect = `(${somme(haut.map((h) => h[0]))})(${somme(cote.map((r) => r[0]))})`;
    if (!identiques(rect, produit)) fautes.push(`le rectangle n'est pas ${produit}`);
    const toutes = cases.flat();
    if (!identiques(somme(toutes), developpe)) fautes.push(`les cases ne font pas ${developpe}`);
    if (sansCentre) {
      const centre = cases[1]?.[1];
      const bord = toutes.filter((_, j) => j !== haut.length + 1);
      if (!centre || !identiques(somme(bord), sansCentre)) fautes.push(`le bord (sans ${centre}) ne fait pas ${sansCentre}`);
    }
    if (toutes.some((t) => /[$\\]/.test(t))) fautes.push("un $ ou un \\ dans le dessin");
    v.ok(`${k}. le dessin ${i + 1} : ${toutes.length} aires = ligne × colonne, rectangle ${produit}, total ${developpe}`, fautes.length === 0, fautes.slice(0, 3).join(" | "));
  };

  /** Le `tableau2("titre", [h1, h2], [[label, v1, v2], …])` de l'exercice k. */
  const leTableau = (k) => {
    const m = /tableau2\("([^"]*)", (\[[^\]]*\]), (\[\[.*\]\])\)/.exec(blocs[k - 1] ?? "");
    if (!m) return null;
    return { titre: m[1], entete: JSON.parse(m[2]), lignes: JSON.parse(m[3]) };
  };
  const nombre = (s) => evalTex(s.replace(/−/g, "-").replace(/,/g, "{,}").replace(/\s+/g, ""), Q(0));

  v.titre("★ Un seul geste");
  // 1 — le carré est un produit.
  dit(1, "$(x + 2)^2 = (x + 2)(x + 2)$");
  egx(1, "(x + 2)^2 = x^2 + 2x + 2x + 4 = x^2 + 4x + 4");
  egx(1, "(x + 8)^2 = (x + 8)(x + 8) = x^2 + 8x + 8x + 64 = x^2 + 16x + 64");
  v.ok("1. le piège x² + 4 n'est pas (x + 2)²", !identiques("x^2 + 4", "(x + 2)^2"));
  dit(1, "Réponse : $(x + 2)^2 = x^2 + 4x + 4$ et $(x + 8)^2 = x^2 + 16x + 64$.");
  dessinAires(1, "(x + 2)^2", "x^2 + 4x + 4");

  // 2 — reconnaître : les deux produits du milieu, refaits sur les facteurs.
  {
    const produits = ["(x - 7)^2", "(x + 2)(x - 2)", "(x + 9)(x + 9)", "(x + 1)(x + 5)", "(x - 3)(x + 4)", "(6 + x)^2"];
    const facteurs = [[["x", "-7"], ["x", "-7"]], [["x", "2"], ["x", "-2"]], [["x", "9"], ["x", "9"]], [["x", "1"], ["x", "5"]], [["x", "-3"], ["x", "4"]], [["6", "x"], ["6", "x"]]];
    const lettres = ["a", "b", "c", "d", "e", "f"];
    v.ok("2. les six produits sont dans l'énoncé", produits.every((p, i) => e(2).includes(`${lettres[i]}) $${p}$`)));
    v.ok("2. les facteurs du script refont bien les produits", facteurs.every(([[p, q], [r, s]], i) => identiques(`(${p} + ${q})(${r} + ${s})`.replace(/\+ -/g, "- "), produits[i])));
    const t = leTableau(2);
    const fautes = [];
    if (!t || t.lignes.length !== 6) fautes.push("pas de tableau de six lignes");
    else
      t.lignes.forEach(([label, milieu, termes], i) => {
        const [[p, q], [r, s]] = facteurs[i];
        if (conv(label) !== produits[i].replace(/\s+/g, "")) fautes.push(`ligne ${i + 1} : « ${label} » n'est pas ${produits[i]}`);
        const lus = milieu.split(" et ").map(conv);
        const attendus = [`(${p})(${s})`, `(${q})(${r})`];
        if (lus.length !== 2 || !lus.every((l, j) => identiques(l, attendus[j]))) fautes.push(`${label} : « ${milieu} » écrit`);
        if (String(nbTermes(produits[i])) !== termes) fautes.push(`${label} : ${termes} termes écrits, ${nbTermes(produits[i])} comptés`);
      });
    v.ok("2. le tableau : les deux produits du milieu et le nombre de termes, recalculés", fautes.length === 0, fautes.join(" | "));
    const noms = { carreSomme: "carré d'une somme", carreDifference: "carré d'une différence", milieuAnnule: "un seul signe change", rien: "rien" };
    dit(2, `Réponse : ${produits.map((p, i) => `${lettres[i]}) ${noms[nature(p)]}`).join(" ; ")}.`);
  }

  // 3 — carré d'une somme, par le produit.
  egx(3, "(x + 9)^2 = (x + 9)(x + 9) = x^2 + 9x + 9x + 81 = x^2 + 18x + 81");
  egx(3, "(2x + 3)^2 = (2x + 3)(2x + 3) = 4x^2 + 6x + 6x + 9 = 4x^2 + 12x + 9");
  v.ok("3. le piège 2x × 2x = 2x² est faux", !identiques("2x \\times 2x", "2x^2"));
  dit(3, "Réponse : $(x + 9)^2 = x^2 + 18x + 81$ et $(2x + 3)^2 = 4x^2 + 12x + 9$.");
  dessinAires(3, "(2x + 3)^2", "4x^2 + 12x + 9");

  // 4 — carré d'une différence, par le produit.
  egx(4, "(x - 6)^2 = (x - 6)(x - 6) = x^2 - 6x - 6x + 36 = x^2 - 12x + 36");
  egx(4, "(3x - 2)^2 = (3x - 2)(3x - 2) = 9x^2 - 6x - 6x + 4 = 9x^2 - 12x + 4");
  v.ok("4. le piège x² − 12x − 36 est faux", !identiques("(x - 6)^2", "x^2 - 12x - 36"));
  dit(4, "Réponse : $(x - 6)^2 = x^2 - 12x + 36$ et $(3x - 2)^2 = 9x^2 - 12x + 4$.");
  dessinAires(4, "(x - 6)^2", "x^2 - 12x + 36");

  // 5 — un seul signe change.
  egx(5, "(x + 11)(x - 11) = x^2 - 11x + 11x - 121 = x^2 - 121");
  egx(5, "(3x + 4)(3x - 4) = 9x^2 - 12x + 12x - 16 = 9x^2 - 16");
  dit(5, "$11 \\times (-11) = -121$");
  dit(5, "Réponse : $(x + 11)(x - 11) = x^2 - 121$ et $(3x + 4)(3x - 4) = 9x^2 - 16$.");
  dessinAires(5, "(x + 11)(x - 11)", "x^2 - 121");

  // 6 — le lien avec la double distributivité.
  egx(6, "(x - 8)(x - 8) = x^2 - 8x - 8x + 64 = x^2 - 16x + 64");
  egx(6, "(x - 8)(x + 8) = x^2 + 8x - 8x - 64 = x^2 - 64");
  v.ok("6. (x − 8)(x − 8) est un carré, (x − 8)(x + 8) perd son milieu", nature("(x - 8)(x - 8)") === "carreDifference" && nature("(x - 8)(x + 8)") === "milieuAnnule");
  dit(6, "Réponse : $x^2 - 16x + 64$ ; $x^2 - 64$.");
  v.ok("6. deux dessins", lesAires(6).length === 2);
  dessinAires(6, "(x - 8)(x - 8)", "x^2 - 16x + 64", { i: 0 });
  dessinAires(6, "(x - 8)(x + 8)", "x^2 - 64", { i: 1 });

  // 7 — carré ou pas ?
  egx(7, "(x + 4)(x + 6) = x^2 + 6x + 4x + 24 = x^2 + 10x + 24");
  egx(7, "(x + 10)(x + 10) = x^2 + 10x + 10x + 100 = x^2 + 20x + 100");
  v.ok("7. le a) n'est PAS un carré, le b) en est un", nature("(x + 4)(x + 6)") === "rien" && nature("(x + 10)(x + 10)") === "carreSomme");
  v.ok("7. le piège (x + 4)(x + 4) n'est pas (x + 4)(x + 6)", !identiques("x^2 + 8x + 16", "(x + 4)(x + 6)"));
  dit(7, "Réponse : $x^2 + 10x + 24$ ; $x^2 + 20x + 100$.");
  dessinAires(7, "(x + 4)(x + 6)", "x^2 + 10x + 24", { i: 0 });
  dessinAires(7, "(x + 10)^2", "x^2 + 20x + 100", { i: 1 });

  // 8 — l'erreur du carré « distribué ».
  eg(8, "(1 + 12)^2 = 13^2 = 169");
  eg(8, "1^2 + 144 = 145");
  egx(8, "(x + 12)^2 = (x + 12)(x + 12) = x^2 + 12x + 12x + 144 = x^2 + 24x + 144");
  eg(8, "1 + 24 + 144 = 169");
  eg(8, "169 - 145 = 24");
  v.ok("8. l'écart entre le vrai et le faux vaut 24x", identiques("(x + 12)^2 - (x^2 + 144)", "24x"));
  dit(8, "Réponse : l'égalité est fausse ; $(x + 12)^2 = x^2 + 24x + 144$.");
  dessinAires(8, "(x + 12)^2", "x^2 + 24x + 144");

  v.titre("★★ Type devoir");
  // 9 — deux carrés.
  egx(9, "(2x + 1)^2 = (2x + 1)(2x + 1) = 4x^2 + 2x + 2x + 1 = 4x^2 + 4x + 1");
  egx(9, "(2x - 1)^2 = (2x - 1)(2x - 1) = 4x^2 - 2x - 2x + 1 = 4x^2 - 4x + 1");
  vaut(9, "(2x + 1)^2 + (2x - 1)^2", "8x^2 + 2", "$A = 4x^2 + 4x + 1 + 4x^2 - 4x + 1 = 8x^2 + 2$");
  v.ok("9. l'énoncé donne A", e(9).includes("$A = (2x + 1)^2 + (2x - 1)^2$"));
  eg(9, "3^2 + 1^2 = 10");
  eg(9, "8 \\times 1 + 2 = 10");
  dit(9, "Réponse : $A = 8x^2 + 2$.");
  dessinAires(9, "(2x + 1)^2", "4x^2 + 4x + 1", { i: 0 });
  dessinAires(9, "(2x - 1)^2", "4x^2 - 4x + 1", { i: 1 });

  // 10 — le moins devant la parenthèse.
  egx(10, "(x + 9)^2 = (x + 9)(x + 9) = x^2 + 9x + 9x + 81 = x^2 + 18x + 81");
  egx(10, "(x + 9)(x - 9) = x^2 - 9x + 9x - 81 = x^2 - 81");
  egx(10, "(x^2 + 18x + 81) - (x^2 - 81) = x^2 + 18x + 81 - x^2 + 81 = 18x + 162");
  vaut(10, "(x + 9)^2 - (x + 9)(x - 9)", "18x + 162", "- x^2 + 81 = 18x + 162$");
  v.ok("10. l'énoncé donne B", e(10).includes("$B = (x + 9)^2 - (x + 9)(x - 9)$"));
  eg(10, "9^2 - 9 \\times (-9) = 81 + 81 = 162");
  eg(10, "18 \\times 0 + 162 = 162");
  v.ok("10. le piège (− x² − 81) donne 18x", identiques("x^2 + 18x + 81 - x^2 - 81", "18x"));
  dit(10, "Réponse : $B = 18x + 162$.");
  dessinAires(10, "(x + 9)^2", "x^2 + 18x + 81", { i: 0 });
  dessinAires(10, "(x + 9)(x - 9)", "x^2 - 81", { i: 1 });

  // 11 — associer produits et développements.
  {
    const produits = { A: "(x - 8)^2", B: "(x + 12)(x - 12)", C: "(x + 11)^2", D: "(x + 2)(x + 20)" };
    v.ok("11. les quatre produits sont dans l'énoncé", Object.entries(produits).every(([l, p]) => e(11).includes(`$${l} = ${p}$`)));
    v.ok("11. les quatre développements sont dans l'énoncé", ["x^2 + 22x + 40", "x^2 - 144", "x^2 + 22x + 121", "x^2 - 16x + 64"].every((d) => e(11).includes(`$${d}$`)));
    egx(11, "(x - 8)(x - 8) = x^2 - 8x - 8x + 64 = x^2 - 16x + 64");
    egx(11, "(x + 12)(x - 12) = x^2 - 12x + 12x - 144 = x^2 - 144");
    egx(11, "(x + 11)(x + 11) = x^2 + 11x + 11x + 121 = x^2 + 22x + 121");
    egx(11, "(x + 2)(x + 20) = x^2 + 20x + 2x + 40 = x^2 + 22x + 40");
    v.ok("11. seul B a deux termes", Object.values(produits).map(nbTermes).join(",") === "3,2,3,3");
    const [cc, cd] = [coefs(produits.C), coefs(produits.D)];
    v.ok("11. le piège : C et D ont le même terme du milieu, pas le même dernier terme", egal(cc.b, cd.b) && !egal(cc.c, cd.c));
    eg(11, "(1 - 8)^2 = 49");
    eg(11, "1 - 16 + 64 = 49");
    const t = leTableau(11);
    const fautes = [];
    if (!t || t.lignes.length !== 4) fautes.push("pas de tableau de quatre lignes");
    else
      t.lignes.forEach(([l, dev, n]) => {
        const p = produits[l];
        if (!p) fautes.push(`libellé ${l}`);
        else if (!identiques(conv(dev), p) || !egal(val(p, 1), nombre(n)) || !egal(val(conv(dev), 1), nombre(n))) fautes.push(`${l} : ${dev}, ${n}`);
      });
    v.ok("11. le tableau : chaque développement et son contrôle en x = 1", fautes.length === 0, fautes.join(" | "));
    dit(11, "Réponse : $A = x^2 - 16x + 64$ ; $B = x^2 - 144$ ; $C = x^2 + 22x + 121$ ; $D = x^2 + 22x + 40$.");
  }

  // 12 — choisir : écrire le produit, puis distribuer.
  egx(12, "(x + 2)(x + 8) = x^2 + 8x + 2x + 16 = x^2 + 10x + 16");
  egx(12, "(x + 15)(x - 15) = x^2 - 15x + 15x - 225 = x^2 - 225");
  egx(12, "(4 + x)^2 = (4 + x)(4 + x) = 16 + 4x + 4x + x^2 = 16 + 8x + x^2");
  egx(12, "(x - 13)(13 + x) = 13x + x^2 - 169 - 13x = x^2 - 169");
  v.ok("12. différents, s'annulent, carré, s'annulent", nature("(x + 2)(x + 8)") === "rien" && nature("(x + 15)(x - 15)") === "milieuAnnule" && nature("(4 + x)^2") === "carreSomme" && nature("(x - 13)(13 + x)") === "milieuAnnule");
  dit(12, "Réponse : a) $x^2 + 10x + 16$ ; b) $x^2 - 225$ ; c) $x^2 + 8x + 16$ ; d) $x^2 - 169$.");
  dessinAires(12, "(x + 2)(x + 8)", "x^2 + 10x + 16");

  // 13 — calcul mental, quatre produits avec des nombres.
  eg(13, "61^2 = (60 + 1)(60 + 1) = 3\\,600 + 60 + 60 + 1 = 3\\,721");
  eg(13, "59^2 = (60 - 1)(60 - 1) = 3\\,600 - 60 - 60 + 1 = 3\\,481");
  eg(13, "61 \\times 59 = (60 + 1)(60 - 1) = 3\\,600 - 60 + 60 - 1 = 3\\,599");
  v.ok("13. 61² = 3 721, 59² = 3 481, 61 × 59 = 3 599 (multiplications directes)", 61 * 61 === 3721 && 59 * 59 === 3481 && 61 * 59 === 3599);
  eg(13, "3\\,600 + 1 = 3\\,601");
  v.ok("13. le piège 3 601 n'est pas 61²", 3601 !== 61 * 61);
  dit(13, "Réponse : $3\\,721$ ; $3\\,481$ ; $3\\,599$.");
  dessinAires(13, "61^2", "3721");

  // 14 — un essai réussi ne prouve rien.
  eg(14, "(0 - 10)^2 = (-10)^2 = 100");
  eg(14, "0^2 - 100 = -100");
  v.ok("14. pour x = 10, les deux côtés valent 0 (l'essai de Tom)", egal(val("(x - 10)^2", 10), Q(0)) && egal(val("x^2 - 100", 10), Q(0)));
  v.ok("14. l'égalité de Tom est fausse", !identiques("(x - 10)^2", "x^2 - 100"));
  egx(14, "(x - 10)(x + 10) = x^2 + 10x - 10x - 100 = x^2 - 100");
  egx(14, "(x - 10)^2 = (x - 10)(x - 10) = x^2 - 10x - 10x + 100 = x^2 - 20x + 100");
  {
    const t = leTableau(14);
    const fautes = [];
    if (!t) fautes.push("pas de tableau");
    else {
      const [g, d] = t.entete.map(conv);
      if (g !== "(x-10)^2" || d !== "x^2-100") fautes.push(`en-tête ${t.entete}`);
      t.lignes.forEach(([label, a, b]) => {
        const x = Number(label.replace("x = ", ""));
        if (!egal(val(g, x), nombre(a)) || !egal(val(d, x), nombre(b))) fautes.push(`${label} : ${a} et ${b}`);
      });
      if (!t.lignes.some(([, a, b]) => a === b) || !t.lignes.some(([, a, b]) => a !== b)) fautes.push("il faut un essai égal ET un essai différent");
    }
    v.ok("14. le tableau des trois essais, rejoué", fautes.length === 0, fautes.join(" | "));
  }
  dit(14, "Réponse : l'égalité est fausse ; $(x - 10)^2 = x^2 - 20x + 100$.");

  // 15 — vrai ou faux, et l'essai x = 2.
  {
    const paires = [
      ["(3x)^2", "3x^2"],
      ["(x - 6)^2", "(6 - x)^2"],
      ["(x + 0{,}5)^2", "x^2 + x + 0{,}25"],
      ["(x - 11)^2", "x^2 - 22x - 121"],
    ];
    const verdicts = paires.map(([g, d]) => identiques(g, d));
    v.ok("15. faux, vrai, vrai, faux", JSON.stringify(verdicts) === "[false,true,true,false]");
    v.ok("15. les quatre égalités sont dans l'énoncé", paires.every(([g, d]) => e(15).includes(`$${g} = ${d}$`)));
    ["a", "b", "c", "d"].forEach((l, i) => dit(15, `${l}) ${verdicts[i] ? "VRAI" : "FAUX"}.`));
    dit(15, "Réponse : faux, vrai, vrai, faux.");
    eg(15, "(3 \\times 2)^2 = 36");
    eg(15, "3 \\times 2^2 = 12");
    egx(15, "3x \\times 3x = 9x^2");
    egx(15, "(6 - x)^2 = (6 - x)(6 - x) = 36 - 6x - 6x + x^2 = 36 - 12x + x^2");
    v.ok("15. (x − 6)² = x² − 12x + 36, écrit et vrai", identiques("(x - 6)^2", "x^2 - 12x + 36") && c(15).includes("$(x - 6)^2 = x^2 - 12x + 36$"));
    egx(15, "(x + 0{,}5)^2 = (x + 0{,}5)(x + 0{,}5) = x^2 + 0{,}5x + 0{,}5x + 0{,}25 = x^2 + x + 0{,}25");
    egx(15, "(x - 11)^2 = (x - 11)(x - 11) = x^2 - 11x - 11x + 121 = x^2 - 22x + 121");
    eg(15, "(2 - 11)^2 = 81");
    eg(15, "4 - 44 - 121 = -161");
    const t = leTableau(15);
    const fautes = [];
    if (!t) fautes.push("pas de tableau");
    else
      t.lignes.forEach(([label, a, b], i) => {
        const [g, d] = paires[i];
        if (label !== `${"abcd"[i]})`) fautes.push(`libellé ${label}`);
        if (!egal(val(g, 2), nombre(a)) || !egal(val(d, 2), nombre(b))) fautes.push(`${label} en x = 2 : ${a} et ${b}`);
      });
    v.ok("15. le tableau de l'essai x = 2, rejoué ligne par ligne", fautes.length === 0, fautes.join(" | "));
  }

  // 16 — le carré rétréci.
  egx(16, "(x - 3)^2 = (x - 3)(x - 3) = x^2 - 3x - 3x + 9 = x^2 - 6x + 9");
  eg(16, "10^2 = 100");
  eg(16, "7^2 = 49");
  eg(16, "100 - 49 = 51");
  vaut(16, "x^2 - (x^2 - 6x + 9)", "6x - 9", "= x^2 - x^2 + 6x - 9 = 6x - 9$");
  eg(16, "6 \\times 10 - 9 = 51");
  vaut(16, "2(3x - 9) + 9", "6x - 9", "$2(3x - 9) + 9 = 6x - 9$");
  v.ok("16. la perte vaut 6x − 9, pas 9", identiques("x^2 - (x - 3)^2", "6x - 9") && !identiques("x^2 - (x - 3)^2", "9"));
  dit(16, "Réponse : la nouvelle aire est $x^2 - 6x + 9$ cm² ; elle a diminué de $6x - 9$ cm², soit $51$ cm² pour $x = 10$.");
  dessinAires(16, "x^2", "x^2");
  v.ok("16. le coin du dessin est le nouveau carré (x − 3)²", lesAires(16)[0]?.[2]?.[0]?.[0] === "(x − 3)²");

  v.titre("★★★ Problèmes");
  // 17 — le tapis de judo.
  egx(17, "(8 + 2x)^2 = (8 + 2x)(8 + 2x) = 64 + 16x + 16x + 4x^2 = 64 + 32x + 4x^2");
  vaut(17, "(8 + 2x)^2 - 64", "32x + 4x^2", "$64 + 32x + 4x^2 - 64 = 32x + 4x^2$");
  eg(17, "32 \\times 3 + 4 \\times 3^2 = 96 + 36 = 132");
  eg(17, "14^2 - 64 = 196 - 64 = 132");
  v.ok("17. pour x = 3 : 8 + 2 × 3 = 14 m (le tapis de 14 m des compétitions)", 8 + 2 * 3 === 14);
  vaut(17, "4 \\times 8x + 4x^2", "32x + 4x^2", "$4 \\times 8x + 4x^2 = 32x + 4x^2$");
  v.ok("17. un produit 16x, ce sont deux bandes de 8x", identiques("16x", "2 \\times 8x"));
  v.ok("17. le piège (8 + x)² donne une autre aire", !identiques("(8 + x)^2", "(8 + 2x)^2"));
  dit(17, "Réponse : la zone de sécurité a une aire de $4x^2 + 32x$ m², soit $132$ m² pour $x = 3$.");
  dessinAires(17, "(8 + 2x)^2", "64 + 32x + 4x^2", { sansCentre: "4x^2 + 32x" });

  // 18 — les plateaux de go.
  eg(18, "19^2 = (20 - 1)(20 - 1) = 400 - 20 - 20 + 1 = 361");
  eg(18, "13^2 = (10 + 3)(10 + 3) = 100 + 30 + 30 + 9 = 169");
  eg(18, "361 - 169 = 192");
  eg(18, "(19 - 13)(19 + 13) = 6 \\times 32 = 192");
  eg(18, "(19 - 13)(19 + 13) = 19^2 + 19 \\times 13 - 13 \\times 19 - 13^2 = 361 - 169");
  v.ok("18. 19 × 19 = 361, 13 × 13 = 169, 9 × 9 = 81 (multiplications directes)", 19 * 19 === 361 && 13 * 13 === 169 && 9 * 9 === 81);
  dit(18, "$9^2 = 81$");
  v.ok(`18. 361 ÷ 81 ≈ ${(361 / 81).toFixed(3)}, soit environ 4,5, et plus de 4`, Math.round((361 / 81) * 10) / 10 === 4.5 && 361 / 81 > 4 && c(18).includes("$361 \\div 81$ vaut environ $4{,}5$"));
  eg(18, "400 - 1 = 399");
  v.ok("18. le piège 399 n'est pas 19²", 399 !== 19 * 19);
  dit(18, "Réponse : le grand plateau a $361$ intersections, celui de $13$ sur $13$ en a $169$, soit $192$ de moins");
  dessinAires(18, "19^2", "361");

  // 19 — la réserve naturelle.
  eg(19, "1{,}1^2 = (1 + 0{,}1)(1 + 0{,}1) = 1 + 0{,}1 + 0{,}1 + 0{,}01 = 1{,}21");
  eg(19, "1{,}21^2 = (1{,}2 + 0{,}01)(1{,}2 + 0{,}01) = 1{,}44 + 0{,}012 + 0{,}012 + 0{,}0001 = 1{,}4641");
  v.ok("19. 1,1 × 1,1 = 1,21 : le côté a bien augmenté deux fois de 10 %", egal(val("1{,}1 \\times 1{,}1", 0), val("1{,}21", 0)));
  v.ok("19. l'aire augmente de 21 %, pas de 10 %", egal(val("(1{,}21 - 1) \\times 100", 0), Q(21)));
  dit(19, "soit $21$ %, et non $10$ %");
  dit(19, "Réponse : la réserve passe à $1{,}21$ km², soit $21$ % d'aire en plus ; puis à $1{,}4641$ km².");
  dessinAires(19, "1{,}1^2", "1{,}21");

  // 20 — le carreleur (la lettre n, lue comme x).
  eg(20, "30^2 = 900");
  eg(20, "31 \\times 29 = (30 + 1)(30 - 1) = 900 - 30 + 30 - 1 = 899");
  egx(20, "(n + 1)(n - 1) = n^2 - n + n - 1 = n^2 - 1", "n");
  v.ok("20. une dalle de moins pour tout n de 2 à 100", [...Array(99).keys()].map((i) => i + 2).every((n) => n * n - (n + 1) * (n - 1) === 1));
  eg(20, "32 \\times 28 = (30 + 2)(30 - 2) = 900 - 60 + 60 - 4 = 896");
  dit(20, "soit $4$ dalles de moins");
  dit(20, "Réponse : $900$ dalles pour le carré et $899$ pour le rectangle");
  dessinAires(20, "(x + 1)(x - 1)", "x^2 - 1");

  v.titre("Les dessins");
  const dessines = blocs.filter((b) => /schema: (aires|deux|tableau2)\(/.test(b)).length;
  v.ok(`${dessines} corrigés dessinés sur 20`, dessines === 20);
  const nbAires = blocs.reduce((n, _, i) => n + lesAires(i + 1).length, 0);
  v.ok(`${nbAires} carrés ou rectangles découpés, tous relus`, nbAires === 20);
  const tabs = [2, 11, 14, 15].filter((k) => leTableau(k));
  v.ok("4 tableaux relus (2, 11, 14, 15), aucun $ dedans", tabs.length === 4 && tabs.every((k) => !/[$\\]/.test(JSON.stringify(leTableau(k)))));

  v.titre("⛔ Le calibrage de 4e : aucune formule-règle");
  const entete = [...source.matchAll(/^\s{2}(?:titre|accroche):\s*\n?\s*"((?:[^"\\]|\\.)*)"/gm)].map((m) => m[1]);
  const lus = [...entete, ...f.textes];
  const fautes = formulesDans(lus);
  v.ok(`aucune formule (a + b)², 2ab, a² − b² dans les ${lus.length} chaînes que l'élève lit`, entete.length === 2 && fautes.length === 0, fautes.slice(0, 2).join(" | ").slice(0, 200));
  v.ok("aucune « identité remarquable » à appliquer dans les énoncés et corrigés", ![...f.enonces, ...f.corrections].some((t) => /identités? remarquables?/i.test(t)));
  v.ok("aucun « a = … et b = … » dans les corrigés", !f.corrections.some((t) => /\$a = [^$]*\$ et \$b = /.test(t)));
}

// La page aussi : son title et sa description ne posent aucune formule.
const page = fs.readFileSync(path.join(RACINE, "app/fiches-exercices/maths/4e/litteral-identite-remarquable/page.tsx"), "utf8");
const metaPage = [...page.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]);
const fautesPage = formulesDans(metaPage);
console.log(`${fautesPage.length === 0 ? "✓" : "✗"} la page : aucune formule-règle dans le title ni la description${fautesPage.length ? " — " + fautesPage[0] : ""}`);
if (fautesPage.length) process.exitCode = 1;

lancer({
  nom: "DÉVELOPPER UN CARRÉ (identités remarquables) · 4e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-4e-identites-remarquables.tsx",
  notionId: "litteral_identite_remarquable",
  classe: "4e",
  verifier,
  casses: [
    ["ex. 1 : le carré « distribué »", "2x + 4 = x^2 + 4x + 4$", "2x + 4 = x^2 + 4$"],
    ["ex. 1 : un rectangle du carré oublié", "[[\"x²\", \"2x\"], [\"2x\", \"4\"]]", "[[\"x²\", \"2x\"], [\"x\", \"4\"]]"],
    ["ex. 2 : les produits du milieu de (x − 3)(x + 4) pris pour opposés", "[\"(x − 3)(x + 4)\", \"4x et −3x\", \"3\"]", "[\"(x − 3)(x + 4)\", \"4x et −4x\", \"2\"]"],
    ["ex. 3 : 2x × 2x = 2x²", "6x + 6x + 9 = 4x^2 + 12x + 9$", "6x + 6x + 9 = 2x^2 + 12x + 9$"],
    ["ex. 4 : le dernier produit négatif", "- 6x - 6x + 36 = x^2 - 12x + 36$", "- 6x - 6x + 36 = x^2 - 12x - 36$"],
    ["ex. 4 : le petit carré du dessin négatif", "[\"−6x\", \"36\"]]", "[\"−6x\", \"−36\"]]"],
    ["ex. 5 : +121 au lieu de −121", "11x - 121 = x^2 - 121$", "11x - 121 = x^2 + 121$"],
    ["ex. 6 : les termes du milieu qui ne s'annulent pas", "- 8x - 64 = x^2 - 64$", "- 8x - 64 = x^2 - 16x - 64$"],
    ["ex. 7 : un carré vu dans deux parenthèses différentes", "4x + 24 = x^2 + 10x + 24$", "4x + 24 = x^2 + 8x + 16$"],
    ["ex. 8 : un seul produit du milieu", "12x + 144 = x^2 + 24x + 144$", "12x + 144 = x^2 + 12x + 144$"],
    ["ex. 9 : (2x − 1)² avec −1", "- 4x + 1 = 8x^2 + 2$", "- 4x + 1 = 8x^2 + 4x + 2$"],
    ["ex. 10 : le moins sur le premier terme seulement", "- x^2 + 81 = 18x + 162$", "- x^2 + 81 = 18x$"],
    ["ex. 11 : C et D confondus dans le tableau", "[\"C\", \"x² + 22x + 121\", \"144\"]", "[\"C\", \"x² + 22x + 40\", \"144\"]"],
    ["ex. 12 : le milieu du d) mal annulé", "- 169 - 13x = x^2 - 169$", "- 169 - 13x = x^2 + 169$"],
    ["ex. 13 : les bandes oubliées", "3\\\\,600 + 60 + 60 + 1 = 3\\\\,721$", "3\\\\,600 + 60 + 60 + 1 = 3\\\\,601$"],
    ["ex. 13 : une bande du dessin fausse", "[[\"3 600\", \"60\"], [\"60\", \"1\"]]", "[[\"3 600\", \"60\"], [\"61\", \"1\"]]"],
    ["ex. 14 : un essai du tableau faux", "[\"x = 20\", \"100\", \"300\"]", "[\"x = 20\", \"100\", \"100\"]"],
    ["ex. 15 : (x − 11)² déclaré vrai", "d) FAUX.", "d) VRAI."],
    ["ex. 15 : l'essai c) mal calculé", "[\"c)\", \"6,25\", \"6,25\"]", "[\"c)\", \"6,25\", \"4,25\"]"],
    ["ex. 16 : la perte réduite au coin", "6x - 9 = 6x - 9$", "6x - 9 = 9$"],
    ["ex. 16 : une bande du dessin fausse", "[[\"(x − 3)²\", \"3x − 9\"], [\"3x − 9\", \"9\"]]", "[[\"(x − 3)²\", \"3x − 9\"], [\"3x − 3\", \"9\"]]"],
    ["ex. 17 : la zone ajoutée d'un seul côté", "[\"8x\", \"64\", \"8x\"]", "[\"8x\", \"64\", \"4x\"]"],
    ["ex. 17 : l'aire de la zone fausse", "96 + 36 = 132$", "96 + 36 = 142$"],
    ["ex. 18 : 19² = 399", "400 - 20 - 20 + 1 = 361$", "400 - 20 - 20 + 1 = 399$"],
    ["ex. 18 : le coin du dessin compté négatif", "[\"−20\", \"1\"]]", "[\"−20\", \"−1\"]]"],
    ["ex. 19 : +10 % d'aire", "soit $21$ %, et non $10$ %", "soit $20$ %, et non $10$ %"],
    ["ex. 19 : le petit carré du dessin faux", "[\"0,1\", \"0,01\"]]", "[\"0,1\", \"0,1\"]]"],
    ["ex. 20 : 32 × 28 mal calculé", "900 - 60 + 60 - 4 = 896$", "900 - 60 + 60 - 4 = 886$"],
    ["ex. 20 : la dalle du coin comptée positive", "[\"−n\", \"−1\"]]", "[\"−n\", \"1\"]]"],
    ["un dessin trop large pour le téléphone", "[[\"x\", 40], [\"8\", 120], [\"x\", 40]], [[\"x\", 40]", "[[\"x\", 60], [\"8\", 120], [\"x\", 60]], [[\"x\", 60]"],
    ["un corrigé qui perd son schéma", "schema: aires([[\"x\", 110], [\"12\", 60]]", "sans: aires([[\"x\", 110], [\"12\", 60]]"],
    ["une micro d'une autre notion", "micros: [\"litteral_identite_reconnaitre\"],\n        },\n        {\n          enonce: \"Développer et réduire.\\na)", "micros: [\"litteral_distributivite_double\"],\n        },\n        {\n          enonce: \"Développer et réduire.\\na)"],
    ["une formule dans une consigne", "J'écris d'abord le produit des deux parenthèses, puis je fais les quatre produits.", "J'applique $(a + b)^2$, puis je fais les quatre produits."],
    ["⛔ une formule-règle dans un rappel", "$(x + 20)^2$ s'écrit $(x + 20)(x + 20)$.", "$(a + b)^2 = a^2 + 2ab + b^2$."],
    ["⛔ une formule-règle dans un corrigé", "J'écris chaque carré comme un produit, puis je fais les quatre produits.", "J'applique la règle du cours : $a^2 + 2ab + b^2$."],
    ["⛔ « identité remarquable » à appliquer dans un énoncé", "Pour chaque produit, dire si les deux parenthèses sont identiques (c'est alors un carré), puis développer.", "Développer à l'aide d'une identité remarquable."],
    ["⛔ une formule dans l'accroche", "écrire le carré comme un produit, faire les quatre produits, réduire.", "appliquer (a + b)² = a² + 2ab + b²."],
  ],
});
