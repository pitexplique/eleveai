// Recalcul indépendant de la feuille « La factorisation » de 4e (04/10/2026) :
// lib/fiches-exercices/maths-4e-factorisation.tsx.
//
// ⭐ Trois étages :
//   1. TOUTE égalité d'un corrigé (« $a = b = c$ », avec ou sans lettre) est
//      lue et ses membres évalués par le script lui-même, lettres remplacées
//      par six jeux de valeurs : une factorisation, un développement ou un
//      calcul faux fait une faute ;
//   2. chaque factorisation attendue est REDÉVELOPPÉE (comparée numériquement
//      à l'expression de départ) et son facteur est contrôlé LE PLUS GRAND
//      POSSIBLE : facteur entier, plus aucun nombre ni aucune lettre commun
//      aux termes de la parenthèse ; les fausses factorisations des énoncés
//      sont bien fausses ;
//   3. chaque dessin (rectangle, division, fleches, paquets, bandes, table,
//      triangle) est relu dans le source et recalculé, et la « Réponse : »
//      doit dire ce que le script trouve.
// ⛔ Programme de 4e (Frédéric, 30/09) : aucune identité remarquable lue à
// l'envers — le script refuse toute différence de carrés ou tout carré
// d'une somme dans le texte élève.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-4e-litteral-factorisation.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-4e-factorisation.tsx", "litteral_factorisation", ["table", "rectangle", "division", "fleches", "paquets", "bandes"], "4e");
const { c, e, vrai, dit, enonceDit, dessin, essai, feuille } = f;

/* ═══ L'évaluateur : une écriture (LaTeX ou texte de dessin) → un nombre ═══ */
function prep(expr) {
  let s = String(expr)
    .replace(/\\left|\\right/g, "")
    .replace(/\\times|×/g, "*")
    .replace(/\\div|÷/g, "/")
    .replace(/\{,\}/g, ".")
    .replace(/\\,/g, "")
    .replace(/−/g, "-")
    .replace(/²/g, "^2")
    .replace(/(\d),(\d)/g, "$1.$2")
    .replace(/(\d) (\d{3})(?!\d)/g, "$1$2");
  if (/\\/.test(s)) throw new Error(`commande LaTeX inconnue dans « ${expr} »`);
  // Un monôme (12x, 3ab, x^2, 4n^2) devient un produit entre parenthèses :
  // « 12x ÷ 6x » vaut bien 2.
  s = s.replace(/(\d+(?:\.\d+)?)?((?:[a-z](?:\^\d+)?)+)/g, (m, coef, lettres) => {
    const facteurs = [...lettres.matchAll(/([a-z])(?:\^(\d+))?/g)].map(([, l, p]) => (p ? `${l}**${p}` : l));
    return `(${[coef, ...facteurs].filter(Boolean).join("*")})`;
  });
  s = s.replace(/\^/g, "**").replace(/([\d)])\s*\(/g, "$1*(");
  return s;
}
const LETTRES = "abcdefghijklmnopqrstuvwxyz".split("");
const JEUX = [-2.5, -1, 0.5, 1.5, 3, 7].map((t) => Object.fromEntries(LETTRES.map((l, i) => [l, t + i * 0.37])));
function val(expr, vars = JEUX[3]) {
  const s = prep(expr);
  return Function(...LETTRES, `return ${s};`)(...LETTRES.map((l) => vars[l]));
}
const proche = (a, b) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) < 1e-9 * Math.max(1, Math.abs(a), Math.abs(b));
/** Deux écritures égales pour toutes les valeurs (six jeux de valeurs des lettres). */
const identiques = (a, b) => JEUX.every((v) => proche(val(a, v), val(b, v)));

/* ═══ Le facteur est-il le plus grand possible ? ═══ */
const pgcd = (a, b) => (b ? pgcd(b, a % b) : Math.abs(a));
/** « 7x^2 », « -3 », « 2y » → { coef, lettres: { x: 2 } }. */
function monome(t) {
  const m = /^(-?)(\d+(?:\.\d+)?)?((?:[a-z](?:\^\d+)?)*)$/.exec(t.replace(/\s/g, ""));
  if (!m || (!m[2] && !m[3])) throw new Error(`monôme illisible : « ${t} »`);
  const lettres = {};
  for (const [, l, p] of m[3].matchAll(/([a-z])(?:\^(\d+))?/g)) lettres[l] = (lettres[l] ?? 0) + Number(p ?? 1);
  return { coef: (m[1] ? -1 : 1) * Number(m[2] ?? 1), lettres };
}
const normal = (s) => String(s).replace(/\{,\}/g, ".").replace(/(\d),(\d)/g, "$1.$2").replace(/−/g, "-").replace(/²/g, "^2");
/** « k(a + b − c) » est factorisée le plus possible : k entier, termes de la parenthèse sans nombre ni lettre commun. */
function maximale(produit) {
  const m = /^([^()]+)\((.*)\)$/.exec(normal(produit).trim());
  if (!m) return false;
  const k = monome(m[1]);
  const termes = m[2].replace(/ - /g, " + -").split(" + ").map(monome);
  if (!Number.isInteger(k.coef) || k.coef < 1 || termes.length < 2) return false;
  if (!termes.every((t) => Number.isInteger(t.coef))) return false;
  if (termes.map((t) => t.coef).reduce(pgcd) !== 1) return false;
  const toutes = new Set(termes.flatMap((t) => Object.keys(t.lettres)));
  return [...toutes].every((l) => Math.min(...termes.map((t) => t.lettres[l] ?? 0)) === 0);
}
/** Une factorisation attendue : égale au départ, et poussée au bout. */
function facto(k, depart, produit, { enonce = true } = {}) {
  vrai(`${k}. ${produit} redéveloppé redonne ${depart}`, identiques(depart, produit));
  vrai(`${k}. ${produit} : factorisée le plus possible`, maximale(produit));
  if (enonce) enonceDit(k, `$${depart}$`);
}

/* ═══ 1. Toutes les égalités des corrigés ═══ */
/** Les factorisations justes mais inachevées, écrites EXPRÈS (ex. 14 b et c). */
const PAS_FINIES = ["3(x^2 + 7x)", "x(3x + 21)"];
feuille.corrections.forEach((txt, i) => {
  for (const [, m] of txt.matchAll(/\$([^$]*)\$/g)) {
    if (!m.includes(" = ") || /\\neq|\\approx|\\dots/.test(m)) continue;
    let membres = m.split(" = ");
    // « $x = 2$ », « $y = 1$ » : une valeur donnée, pas une égalité à vérifier.
    if (membres.length === 2 && /^[a-z]$/.test(membres[0].trim())) continue;
    membres = membres.filter((x) => !/^[A-Z]$/.test(x.trim()));
    let ok;
    try {
      ok = membres.every((x) => identiques(x, membres[0]));
    } catch (err) {
      vrai(`${i + 1}. « ${m} » lisible`, false, err.message);
      continue;
    }
    vrai(`${i + 1}. « ${m} » : membres égaux`, ok);
    // Une somme écrite « = k(…) » est une factorisation : elle doit être poussée
    // au bout, sauf les écritures volontairement inachevées de l'exercice 14.
    const [premier, dernier] = [membres[0].trim(), membres.at(-1).trim()];
    const somme = /\s[+-]\s/.test(premier.replace(/\([^()]*\)/g, "")) && !/\\times/.test(m);
    if (somme && /^[^()\s]+\([^()]*\)$/.test(dernier) && !PAS_FINIES.includes(dernier))
      vrai(`${i + 1}. « ${m} » : factorisée le plus possible`, maximale(dernier));
  }
  vrai(`${i + 1}. un piège nommé`, /⛔|⚠️/.test(txt));
  vrai(`${i + 1}. une « Réponse : » à la fin`, txt.split("\\n").at(-1).startsWith("Réponse : "));
});

/* ═══ ⛔ Aucune identité remarquable lue à l'envers (programme de 4e) ═══ */
// Dans tout ce que l'élève lit, aucune formule ne contient : un carré élevé
// « (…)^2 », un « ax² ± c » (différence ou somme d'un carré et d'un nombre,
// comme x² − 9), un « ax² + bx + c » carré parfait (b² = 4ac, comme
// x² + 6x + 9), ni « a² − b² ».
let identites = 0;
for (const t of feuille.textes)
  for (const [, m] of t.matchAll(/\$([^$]*)\$/g))
    for (const membre of m.split(" = ").map((x) => x.trim())) {
      const carreNombre = /^(\d*)[a-z]\^2 [-+] \d+$/.test(membre);
      const deuxCarres = /^\d*[a-z]\^2 - \d*[a-z]\^2$/.test(membre) && !/^\d*([a-z])\^2 - \d*\1\^2$/.test(membre);
      const tri = /^(\d*)([a-z])\^2 ([-+]) (\d*)\2 \+ (\d+)$/.exec(membre);
      const parfait = tri && (Number(tri[4] || 1)) ** 2 === 4 * Number(tri[1] || 1) * Number(tri[5]);
      if (/\)\^2/.test(membre) || carreNombre || deuxCarres || parfait) {
        identites++;
        vrai(`⛔ identité remarquable dans « ${m} »`, false);
      }
    }
vrai("aucune identité remarquable lue à l'envers dans le texte élève", identites === 0);

/* ═══ Relire les dessins ═══ */
/** Un rectangle découpé : chaque aire vaut hauteur × longueur ; la légende est juste. */
function rect(k, role) {
  const [h, parts, aires, legende] = dessin("rectangle", k, role);
  parts.forEach((p, i) => {
    if (aires[i] !== "?") vrai(`${k}. rectangle : ${h} × ${p} = ${aires[i]}`, identiques(`${h}*(${p})`, aires[i]));
  });
  if (legende?.includes(" = ")) {
    const membres = legende.split(" = ");
    vrai(`${k}. rectangle : légende « ${legende} »`, membres.every((x) => identiques(x, `${h}*(${parts.join(" + ")})`)));
  }
  return { h, parts, aires, legende };
}
/** Un tableau de division : chaque terme = facteur × ce qui reste. */
function div(k, role) {
  const [fac, termes, quot] = dessin("division", k, role);
  vrai(`${k}. division : autant de restes que de termes`, termes.length === quot.length);
  termes.forEach((t, i) => vrai(`${k}. division : ${t} = ${fac} × (${quot[i]})`, identiques(t, `${fac}*(${quot[i]})`)));
  vrai(`${k}. division : ${fac}(${quot.join(" ")}) le plus possible`, maximale(`${fac}(${quot.join(" ")})`));
  return { fac, somme: termes.join(" "), produit: `${fac}(${quot.join(" ")})` };
}

/* ═══ 2. Chaque exercice recalculé ═══ */
essai("1", () => {
  const facteurs = { a: ["7a + 7b", "7"], b: ["4y + 28", "4"], c: ["11t - 11", "11"], d: ["ab + 6a", "a"] };
  for (const [q, [ex, k]] of Object.entries(facteurs)) {
    enonceDit(1, `$${ex}$`);
    const [t1, t2] = ex.replace(/ - /g, " + -").split(" + ");
    // k divise chaque terme : le quotient est un monôme à coefficient entier, et rien de commun ne reste.
    const q1 = `(${t1})/(${k})`, q2 = `(${t2})/(${k})`;
    vrai(`1${q}. ${k} divise les deux termes`, JEUX.every((v) => Number.isFinite(val(q1, v)) && Number.isFinite(val(q2, v))));
  }
  facto(1, "4y + 28", "4(y + 7)", { enonce: false });
  facto(1, "11t - 11", "11(t - 1)", { enonce: false });
  facto(1, "ab + 6a", "a(b + 6)", { enonce: false });
  facto(1, "7a + 7b", "7(a + b)", { enonce: false });
  dit(1, "Réponse : a) $7$ ; b) $4$ ; c) $11$ ; d) $a$.");
  const r = rect(1);
  vrai("1. le rectangle est celui du b)", r.h === "4" && identiques(`4*(${r.parts.join(" + ")})`, "4y + 28"));
});
essai("2", () => {
  const L = [["5x + 35", "5(x + 7)"], ["8y - 24", "8(y - 3)"], ["21 + 7t", "7(3 + t)"], ["9n - 45", "9(n - 5)"]];
  L.forEach(([d, p]) => facto(2, d, p));
  dit(2, `Réponse : ${L.map(([, p], i) => `${"abcd"[i]}) $${p}$`).join(" ; ")}.`);
  vrai("2. le piège 8(y − 24) est faux", !identiques("8(y - 24)", "8y - 24") && identiques("8(y - 24)", "8y - 192"));
  const d = div(2);
  vrai("2. le dessin est le b)", identiques(d.somme, "8y - 24"));
});
essai("3", () => {
  const depart = "18x + 24";
  enonceDit(3, `$${depart}$`);
  const eleves = ["2(9x + 12)", "3(6x + 8)", "6(3x + 4)", "1{,}5(12x + 16)"];
  eleves.forEach((p) => {
    enonceDit(3, `$${p}$`);
    vrai(`3a. ${p} = ${depart}`, identiques(p, depart));
  });
  const finis = eleves.filter(maximale);
  vrai("3b. seul Yanis a fini", finis.length === 1 && finis[0] === "6(3x + 4)");
  vrai("3b. 6 est le plus grand diviseur de 18 et 24", pgcd(18, 24) === 6);
  facto(3, "20t - 30", "10(2t - 3)");
  facto(3, "24n + 16", "8(3n + 2)");
  dit(3, "Réponse : a) oui, toutes ; b) seul Yanis, avec $6(3x + 4)$ ; c) $10(2t - 3)$ et $8(3n + 2)$.");
  const [ent, lignes] = dessin("table", 3);
  vrai("3. tableau : trois colonnes", ent.length === 3);
  lignes.forEach((l) => {
    vrai(`3. tableau : ${l[0]} développée = ${l[1]}`, identiques(l[0], l[1]) && identiques(l[1], depart));
    vrai(`3. tableau : ${l[0]} finie ? ${l[2]}`, (l[2] === "oui") === maximale(l[0]));
  });
});
essai("4", () => {
  const L = [["x^2 + 9x", "x(x + 9)"], ["y^2 - 4y", "y(y - 4)"], ["7t + t^2", "t(7 + t)"], ["ab - 3b", "b(a - 3)"]];
  L.forEach(([d, p]) => facto(4, d, p));
  dit(4, `Réponse : ${L.map(([, p], i) => `${"abcd"[i]}) $${p}$`).join(" ; ")}.`);
  vrai("4. le piège x(x + 9x) est faux", !identiques("x(x + 9x)", "x^2 + 9x"));
  const r = rect(4);
  vrai("4. le rectangle est le a)", identiques(`${r.h}*(${r.parts.join(" + ")})`, "x^2 + 9x"));
});
essai("5", () => {
  const L = [["4x^2 + 10x", "2x(2x + 5)"], ["9y^2 - 12y", "3y(3y - 4)"], ["15t + 5t^2", "5t(3 + t)"], ["8a^2 - 8a", "8a(a - 1)"]];
  L.forEach(([d, p]) => facto(5, d, p));
  dit(5, `Réponse : ${L.map(([, p], i) => `${"abcd"[i]}) $${p}$`).join(" ; ")}.`);
  vrai("5. le piège 3(3y² − 4y) : juste mais pas fini", identiques("3(3y^2 - 4y)", "9y^2 - 12y") && !maximale("3(3y^2 - 4y)"));
  const d = div(5);
  vrai("5. le dessin est le b)", identiques(d.somme, "9y^2 - 12y"));
});
essai("6", () => {
  const props = [...e(6).matchAll(/\$([^$]*) = ([^$]*)\$/g)].map((m) => [m[1], m[2]]);
  vrai("6. quatre propositions lues", props.length === 4);
  const verdicts = props.map(([d, p]) => identiques(d, p));
  vrai("6. juste, faux, faux, faux", verdicts.join() === "true,false,false,false");
  vrai("6a. 5(3x + 4) est aussi poussée au bout", maximale(props[0][1]));
  const bons = ["7(y + 1)", "x(x - 6)", "8(2a - 1)"];
  props.slice(1).forEach(([d], i) => facto(6, d, bons[i], { enonce: false }));
  vrai("6d. 8(2a − 8) développé donne 16a − 64", identiques("8(2a - 8)", "16a - 64"));
  vrai("6c. x(x − 6x) développé donne x² − 6x²", identiques("x(x - 6x)", "x^2 - 6x^2"));
  dit(6, "Réponse : a) juste ; b) $7(y + 1)$ ; c) $x(x - 6)$ ; d) $8(2a - 1)$.");
  const [k, termes, dev] = dessin("fleches", 6);
  vrai("6. les flèches : 7(y + 1) = 7y + 7", identiques(`${k}*(${termes.join(" ")})`, dev) && identiques(dev, "7y + 7"));
});
essai("7", () => {
  const L = [["17 \\times 23 + 17 \\times 77", 17, 100], ["2{,}8 \\times 64 + 2{,}8 \\times 36", 2.8, 100], ["46 \\times 13 - 46 \\times 3", 46, 10], ["25 \\times 39 + 25", 25, 40]];
  const res = L.map(([ex, k, par]) => {
    enonceDit(7, `$${ex}$`);
    const v = val(ex);
    vrai(`7. ${ex} = ${k} × ${par}`, proche(v, k * par));
    return v;
  });
  const T = (x) => (Number.isInteger(x) && x >= 1000 ? String(x).replace(/(\d)(\d{3})$/, "$1\\,$2") : String(x).replace(".", "{,}"));
  dit(7, `Réponse : ${res.map((v, i) => `${"abcd"[i]}) $${T(Math.round(v * 1e9) / 1e9)}$`).join(" ; ")}.`);
  const r = rect(7);
  vrai("7. le rectangle : 17 × (23 + 77) = 1 700", identiques(`${r.h}*(${r.parts.join(" + ")})`, "1700"));
});
essai("8", () => {
  vrai("8a. 5 et 3 n'ont pas de diviseur commun autre que 1", pgcd(5, 3) === 1);
  vrai("8b. le plus grand diviseur de 10 et 15 est 5", pgcd(10, 15) === 5);
  facto(8, "10x + 15", "5(2x + 3)");
  vrai("8c. x(x + 4) = x² + 4x", identiques("x(x + 4)", "x^2 + 4x"));
  vrai("8d. 2(x + 10y) n'est pas 2x + 10y", !identiques("2(x + 10y)", "2x + 10y") && identiques("2(x + 10y)", "2x + 20y"));
  facto(8, "2x + 10y", "2(x + 5y)");
  dit(8, "Réponse : a) faux ; b) vrai ; c) vrai ; d) faux, c'est $2(x + 5y)$.");
  const [l, k, b, cc, leg] = dessin("paquets", 8);
  const membres = leg.split(" = ");
  vrai("8. les paquets : 5 × (2x + 3) = 10x + 15", membres.every((m) => identiques(m, `${k}*(${b}${l} + ${cc})`)) && identiques(membres[0], "10x + 15"));
});
essai("9", () => {
  const L = [["8x + 12y - 4", "4(2x + 3y - 1)"], ["7x^2 - 14x + 21", "7(x^2 - 2x + 3)"], ["10t^2 + 25t", "5t(2t + 5)"]];
  L.forEach(([d, p]) => facto(9, d, p));
  dit(9, `Réponse : ${L.map(([, p], i) => `${"abc"[i]}) $${p}$`).join(" ; ")}.`);
  vrai("9. le piège 4(2x + 3y) perd un terme", !identiques("4(2x + 3y)", "8x + 12y - 4"));
  const d = div(9);
  vrai("9. le dessin est le a)", identiques(d.somme, "8x + 12y - 4"));
});
essai("10", () => {
  const L = [["3x + 9 + 5x + 15", "8x + 24", "8(x + 3)"], ["2y^2 + 7y + 3y^2 - 2y", "5y^2 + 5y", "5y(y + 1)"], ["11a + 4 - 2a + 14", "9a + 18", "9(a + 2)"]];
  L.forEach(([d, r, p]) => {
    vrai(`10. ${d} se réduit en ${r}`, identiques(d, r));
    facto(10, d, p);
    facto(10, r, p, { enonce: false });
  });
  dit(10, `Réponse : ${L.map(([, , p], i) => `${"abc"[i]}) $${p}$`).join(" ; ")}.`);
  const [l, k, b, cc, leg] = dessin("paquets", 10);
  const membres = leg.split(" = ");
  vrai("10. les paquets : 8x + 24 = 8 × (x + 3)", membres.every((m) => identiques(m, `${k}*(${b}${l} + ${cc})`)) && identiques(membres[0], "8x + 24"));
});
essai("11", () => {
  const [n, prix] = [12, 6];
  vrai("11. 12 joueuses, chaussettes à 6 € lues", e(11).includes(`ses $${n}$ joueuses`) && e(11).includes(`chaussettes à $${prix}$ €`));
  vrai("11. la dépense 12x + 72 suit la situation", identiques(`${n}x + ${n * prix}`, "12x + 72"));
  facto(11, "12x + 72", "12(x + 6)");
  const d25 = val("12x + 72", { ...JEUX[0], x: 25 });
  vrai("11c. 372 avec les deux écritures", d25 === 372 && val("12(x + 6)", { ...JEUX[0], x: 25 }) === 372);
  vrai("11. le piège 6(2x + 12) : juste mais pas fini", identiques("6(2x + 12)", "12x + 72") && !maximale("6(2x + 12)"));
  dit(11, `c) $${d25}$ €.`);
  dit(11, "b) $12(x + 6)$, le prix pour une joueuse");
  const r = rect(11);
  vrai("11. le rectangle : 12 × (x + 6)", identiques(`${r.h}*(${r.parts.join(" + ")})`, "12x + 72"));
});
essai("12", () => {
  const L = [["18x + 30", "6(3x + 5)", "3x + 5"], ["14y - 21", "7(2y - 3)", "7"], ["x^2 - 10x", "x(x - 10)", "x - 10"], ["20a^2 + 8a", "4a(5a + 2)", "5a + 2"]];
  L.forEach(([d, p]) => facto(12, d, p, { enonce: false }));
  dit(12, `Réponse : ${L.map(([, , r], i) => `${"abcd"[i]}) $${r}$`).join(" ; ")}.`);
  // Les trous de l'énoncé sont remplis par la réponse.
  vrai("12. les trous de l'énoncé", e(12).includes("$18x + 30 = 6(\\dots + \\dots)$") && e(12).includes("$14y - 21 = \\dots(2y - 3)$") && e(12).includes("$x^2 - 10x = x(\\dots)$") && e(12).includes("$20a^2 + 8a = 4a(\\dots)$"));
  const d = div(12);
  vrai("12. le dessin est le d)", identiques(d.somme, "20a^2 + 8a") && identiques(d.produit, "4a(5a + 2)"));
});
essai("13", () => {
  const A = (x) => x * 6 + 15;
  const B = (x) => (x * 2 + 5) * 3;
  vrai("13. A et B lus dans l'énoncé", e(13).includes("le multiplier par $6$ ; ajouter $15$") && e(13).includes("le multiplier par $2$ ; ajouter $5$ ; multiplier le résultat par $3$"));
  vrai("13. 6x + 15 est le programme A", JEUX.every((v) => proche(val("6x + 15", v), A(v.x))));
  vrai("13. 3(2x + 5) est le programme B", JEUX.every((v) => proche(val("3(2x + 5)", v), B(v.x))));
  facto(13, "6x + 15", "3(2x + 5)", { enonce: false });
  dit(13, `Réponse : a) $${A(4)}$ et $${B(4)}$, puis $${A(10)}$ et $${B(10)}$ ; b) $6x + 15$ ; c) $6x + 15 = 3(2x + 5)$, c'est le programme B.`);
  const [, lignes] = dessin("table", 13);
  lignes.forEach((l) => vrai(`13. tableau x = ${l[0]}`, Number(l[1]) === A(Number(l[0])) && Number(l[2]) === B(Number(l[0]))));
});
essai("14", () => {
  const depart = "3x^2 + 21x";
  enonceDit(14, `$${depart}$`);
  const larg = [["3x", "x + 7"], ["3", "x^2 + 7x"], ["x", "3x + 21"]];
  larg.forEach(([l, L]) => vrai(`14. largeur ${l} × longueur ${L} = l'aire`, identiques(`(${l})*(${L})`, depart)));
  const poussees = larg.filter(([l, L]) => maximale(`${l}(${L})`));
  vrai("14d. seule 3x(x + 7) est poussée au bout", poussees.length === 1 && poussees[0][0] === "3x");
  facto(14, depart, "3x(x + 7)");
  vrai("14. contrôle x = 3 : 90", proche(val(depart, { ...JEUX[0], x: 3 }), 90) && 3 * 3 * (3 + 7) === 90);
  dit(14, "Réponse : a) $x + 7$ ; b) $x^2 + 7x$ ; c) $3x + 21$ ; d) $3x(x + 7)$.");
  const r = rect(14);
  vrai("14. le rectangle du a)", r.h === "3x" && identiques(`${r.h}*(${r.parts.join(" + ")})`, depart));
});
essai("15", () => {
  const L = [[3, "9x + 6", "3x + 2"], [4, "12x + 28", "3x + 7"], [6, "24x + 30", "4x + 5"]];
  L.forEach(([n, P, cote]) => {
    vrai(`15. ${n} côtés de ${cote} font ${P}`, identiques(`${n}*(${cote})`, P));
    facto(15, P, `${n}(${cote})`);
  });
  const c2 = val("3x + 7", { ...JEUX[0], x: 2 });
  vrai("15d. côté du carré pour x = 2 : 13, et 4 × 13 = 12 × 2 + 28", c2 === 13 && 4 * c2 === 12 * 2 + 28);
  dit(15, `Réponse : a) $3x + 2$ ; b) $3x + 7$ ; c) $4x + 5$ ; d) $${c2}$ cm.`);
  vrai("15. le piège 3(3x + 6) donne 9x + 18", identiques("3(3x + 6)", "9x + 18"));
  const [pts, opts] = dessin("triangle", 15);
  const d = (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]);
  const [ab, bc, ca] = [d(pts.A, pts.B), d(pts.B, pts.C), d(pts.C, pts.A)];
  vrai("15. le triangle est équilatéral (à 0,1 % près)", Math.abs(ab - bc) / bc < 1e-3 && Math.abs(ca - bc) / bc < 1e-3);
  vrai("15. ses trois côtés portent 3x + 2", ["AB", "BC", "CA"].every((s) => opts.cotes[s] === "3x + 2"));
});
essai("16", () => {
  const L = [["3ab + 6a", "3a(b + 2)"], ["10xy - 15y", "5y(2x - 3)"], ["4n^2 + 2n", "2n(2n + 1)"], ["7xy + 7x", "7x(y + 1)"]];
  L.forEach(([d, p]) => facto(16, d, p));
  dit(16, `Réponse : ${L.map(([, p], i) => `${"abcd"[i]}) $${p}$`).join(" ; ")}.`);
  vrai("16. le piège : 3ab ne divise pas 6a", !Number.isInteger(val("(6a)/(3ab)", { ...JEUX[0], a: 2, b: 5 })));
  const [k, termes, dev] = dessin("fleches", 16);
  vrai("16. les flèches du b)", identiques(`${k}*(${termes.join(" ")})`, dev) && identiques(dev, "10xy - 15y"));
});
essai("17", () => {
  const r = rect(17, "figure");
  vrai("17. la fresque : hauteur 3, panneaux x, 2x, 4", r.h === "3" && r.parts.join() === "x,2x,4" && r.aires.every((a) => a === "?"));
  const aires = r.parts.map((p) => `3*(${p})`);
  vrai("17a. 3x, 6x et 12", identiques(aires[0], "3x") && identiques(aires[1], "6x") && identiques(aires[2], "12"));
  vrai("17a. l'aire totale 9x + 12", identiques(aires.join(" + "), "9x + 12"));
  facto(17, "9x + 12", "3(3x + 4)", { enonce: false });
  vrai("17b. la parenthèse est la longueur x + 2x + 4", identiques("3x + 4", r.parts.join(" + ")));
  const x = { ...JEUX[0], x: 2.5 };
  const [L, A] = [val("3x + 4", x), val("9x + 12", x)];
  vrai("17c. 11,5 m et 34,5 m²", proche(L, 11.5) && proche(A, 34.5) && proche(3 * L, A));
  const pots = Math.ceil(A / 6);
  vrai("17d. 6 pots", pots === 6);
  dit(17, `c) $11{,}5$ m et $34{,}5$ m² ; d) $${pots}$ pots.`);
  dit(17, "b) $3(3x + 4)$, la longueur");
});
essai("18", () => {
  vrai("18a. 27 et 126, divisés par 3 : le nombre du milieu", 8 + 9 + 10 === 27 && 27 / 3 === 9 && 41 + 42 + 43 === 126 && 126 / 3 === 42);
  vrai("18b. n + (n + 1) + (n + 2) = 3n + 3", identiques("n + (n + 1) + (n + 2)", "3n + 3"));
  facto(18, "3n + 3", "3(n + 1)", { enonce: false });
  const milieu = 132 / 3;
  vrai("18d. 43, 44, 45", Number.isInteger(milieu) && milieu - 1 + milieu + milieu + 1 === 132);
  dit(18, `Réponse : a) $27$ et $126$, le nombre du milieu ; b) $3n + 3$ ; c) $3(n + 1)$ ; d) $${milieu - 1}$, $${milieu}$ et $${milieu + 1}$.`);
  const [l, k, b, cc, leg] = dessin("paquets", 18);
  const membres = leg.split(" = ");
  vrai("18. les paquets : 3n + 3 = 3 × (n + 1)", l === "n" && membres.every((m) => identiques(m, `${k}*(${b}${l} + ${cc})`)) && identiques(membres[0], "3n + 3"));
});
essai("19", () => {
  vrai("19a. carré x², bande x × 3", identiques("x*x + 3*x", "x^2 + 3x"));
  facto(19, "x^2 + 3x", "x(x + 3)", { enonce: false });
  const x = { ...JEUX[0], x: 12 };
  vrai("19c. 180 m² avec les deux écritures", val("x^2 + 3x", x) === 180 && val("x(x + 3)", x) === 180);
  vrai("19d. le périmètre 4x + 6", identiques("2*(x + (x + 3))", "4x + 6"));
  facto(19, "4x + 6", "2(2x + 3)", { enonce: false });
  vrai("19. le piège 4(x + 6) est faux", !identiques("4(x + 6)", "4x + 6"));
  dit(19, "c) $180$ m² ; d) $4x + 6 = 2(2x + 3)$.");
  const r = rect(19);
  vrai("19. le rectangle : x sur x + 3", r.h === "x" && identiques(`${r.h}*(${r.parts.join(" + ")})`, "x^2 + 3x"));
});
essai("20", () => {
  const [k, parts, leg] = dessin("bandes", 20, "figure");
  vrai("20. 4 bandes de x + 250", k === 4 && parts.join() === "x,250" && !leg.includes("="));
  vrai("20. lu dans l'énoncé : 4 relayeurs, 250 m", e(20).includes("$4$ relayeurs") && e(20).includes("$250$ m dans le parc"));
  facto(20, "4x + 1000", `${k}(${parts.join(" + ")})`, { enonce: false });
  const chacun = 5000 / k;
  const piste = chacun - Number(parts[1]);
  vrai("20c. 1 250 m chacun, 1 000 m de piste", chacun === 1250 && piste === 1000);
  vrai("20d. 2(2x + 500) juste mais pas fini", identiques("2(2x + 500)", "4x + 1000") && !maximale("2(2x + 500)"));
  dit(20, "Réponse : a) $4x + 1\\,000$ et $4(x + 250)$ ; c) $1\\,250$ m par relayeur, dont $1\\,000$ m sur la piste ; d) juste, mais pas finie : $4(x + 250)$.");
});

f.fin();
