// Recalcul indépendant de la feuille « Le calcul mental » de 6e (30/09/2026) :
// lib/fiches-exercices/maths-6e-entier-calcul-mental.tsx.
//
// ⭐ Deux filets. (1) TOUTE égalité numérique écrite dans un corrigé
// (« $58 + 2 = 60$ », « $4 \times 25 = 100$ ») est recalculée, membre par
// membre : une faute de calcul d'une étape se voit, même si la réponse finale
// est juste. (2) Chaque exercice est refait ici à partir des nombres relus dans
// l'énoncé ou dans le dessin (droiteRel, barre, aire, rangement, numeration,
// pyramide, table), puis la réponse est cherchée dans le corrigé.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-6e-entier-calcul-mental.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-entier-calcul-mental.tsx", "entier_calcul_mental", ["droiteRel", "barre", "aire", "rangement", "numeration", "pyramide", "table"], "6e");
const { c, e, vrai, verif, dit, dessin, essai } = f;

/** Une formule LaTeX de nombres → valeur (× ÷ + − et parenthèses seulement), ou null. */
const valeur = (s) => {
  const js = s.replace(/\\times/g, "*").replace(/\\div/g, "/").replace(/\\,/g, "").replace(/\{,\}/g, ".").trim();
  return /^[\d\s+\-*/().]+$/.test(js) ? Function(`return (${js})`)() : null;
};
/** (1) Toutes les égalités $a = b = …$ du corrigé k sont justes. */
const egalites = (k) => {
  let n = 0;
  for (const [, formule] of c(k).matchAll(/\$([^$]*=[^$]*)\$/g)) {
    const membres = formule.split("=").map(valeur);
    if (membres.some((m) => m === null)) continue;
    n++;
    vrai(`${k}. $${formule}$ juste`, membres.every((m) => Math.abs(m - membres[0]) < 1e-9), membres.join(" / "));
  }
  return n;
};
/** Les entiers d'un texte (dans ou hors formule, « 3\,600 » compris). */
const entiers = (texte) => [...texte.matchAll(/\d+(?:\\,\d{3})*/g)].map((m) => Number(m[0].replace(/\\,/g, "")));
const lignes = (k) => e(k).split("\\n");
const nb = (s) => Number(String(s).replace(/\s/g, ""));
const memes = (a, b) => JSON.stringify([...a].sort((x, y) => x - y)) === JSON.stringify([...b].sort((x, y) => x - y));
const reponse = (k, vals, unite = "") => dit(k, `Réponse : ${vals.map((v, i) => `${"abcde"[i]}) $${t(v)}$${unite}`).join(" ; ")}.`);

let total = 0;
for (let k = 1; k <= 20; k++) total += egalites(k);
vrai(`au moins 120 égalités recalculées (${total})`, total >= 120);

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const ops = lignes(1).slice(1).map(entiers);
  ops.forEach(([a, b]) => {
    const rond = Math.ceil(a / 10) * 10, s = rond - a;
    dit(1, `$${a} + ${s} = ${rond}$, puis $${rond} + ${b - s} = ${a + b}$.`);
  });
  reponse(1, ops.map(([a, b]) => a + b));
  const [, , , points, { sauts }] = dessin("droiteRel", 1);
  const [a, b] = ops[3];
  vrai("1. la droite montre le d)", memes(points.map((p) => p.value), [a, 400, a + b]) && sauts[0].de === a && sauts[1].vers === a + b);
});
essai("2", () => {
  const ops = lignes(2).slice(1).map(entiers);
  ops.forEach(([a, b]) => {
    const rond = Math.floor(a / 10) * 10, s = a - rond;
    dit(2, `$${a} - ${s} = ${rond}$, puis $${rond} - ${b - s} = ${a - b}$.`);
  });
  reponse(2, ops.map(([a, b]) => a - b));
  const [, , , points, { sauts }] = dessin("droiteRel", 2);
  const [a, b] = ops[3];
  vrai("2. la droite montre le d)", memes(points.map((p) => p.value), [a, 200, a - b]) && sauts[0].de === a && sauts[1].vers === a - b);
  vrai("2. le piège 203", 200 + (7 - 4) === 203);
});
essai("3", () => {
  const ops = lignes(3).slice(1).map(entiers);
  reponse(3, ops.map(([a, b]) => a * b));
  const [, lg] = dessin("table", 3);
  lg.forEach((l, i) => {
    const [a, b] = ops[i + 2];
    vrai(`3. tableau : ${l[0]} = ${l[2]}`, nb(l[2]) === a * b && valeur(l[0].replace("×", "\\times")) === a * b);
  });
});
essai("4", () => {
  const ops = lignes(4).slice(1).map(entiers);
  reponse(4, ops.map(([a, b]) => a / b));
  ops.forEach(([a, b]) => vrai(`4. ${a} ÷ ${b} tombe juste`, a % b === 0));
  dit(4, `Donc $560 \\div 8 = ${560 / 8}$.`);
  dit(4, `Donc $3\\,600 \\div 9 = ${3600 / 9}$.`);
  const [n, col] = dessin("rangement", 4);
  vrai("4. les jetons du a)", n === ops[0][0] && col === ops[0][1] && n % col === 0);
});
essai("5", () => {
  const ops = lignes(5).slice(1).map((l) => [entiers(l), l.includes("\\times") ? "×" : "÷"]);
  const res = ops.map(([[a, b], op]) => (op === "×" ? a * b : a / b));
  reponse(5, res);
  ops.forEach(([[a, b], op], i) => dit(5, `$${t(a)} ${op === "×" ? "\\times" : "\\div"} ${t(b)} = ${t(res[i])}$`));
  const [nums] = dessin("numeration", 5);
  vrai("5. le tableau : 37 et 37 × 100", nb(nums[0]) === ops[0][0][0] && nb(nums[1]) === res[0]);
});
essai("6", () => {
  const [a, b, cc, d] = lignes(6).slice(1).map((l) => entiers(l)[0]);
  reponse(6, [2 * a, b / 2, cc / 4, d / 2]);
  const [tot, parts] = dessin("barre", 6);
  vrai("6. la barre : 76 coupé en deux moitiés", nb(tot) === b && parts.length === 2 && parts.every((p) => p.valeur === b / 2 && nb(p.texte) === b / 2));
});
essai("7", () => {
  const ops = lignes(7).slice(1).map((l) => [...entiers(l), l.includes(" - ") ? "-" : "+"]);
  ops.forEach(([a, b, s]) => {
    const R = Math.round(b / 10) * 10, ecart = R - b;
    if (s === "+") dit(7, `$${a} + ${R} = ${a + R}$. J'ai ajouté $${ecart}$ de trop : $${a + R} - ${ecart} = ${a + b}$.`);
    else dit(7, `$${a} - ${R} = ${a - R}$`);
  });
  dit(7, "$53 + 1 = 54$");
  dit(7, "$212 + 1 = 213$");
  reponse(7, ops.map(([a, b, s]) => (s === "+" ? a + b : a - b)));
  const [, , , points, { sauts }] = dessin("droiteRel", 7);
  vrai("7. la droite du c) : 83, 53, 54", memes(points.map((p) => p.value), [83, 53, 54]) && sauts[0].de === 83 && sauts[0].vers === 53 && sauts[1].vers === 83 - 29);
});
essai("8", () => {
  const prods = lignes(8).slice(1).map((l) => entiers(l).reduce((x, y) => x * y, 1));
  reponse(8, prods);
  const [, lg] = dessin("table", 8);
  vrai("8. tableau : c) et d)", nb(lg[0][2]) === prods[2] && nb(lg[1][2]) === prods[3]);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const sommes = lignes(9).slice(1).map((l) => entiers(l).reduce((x, y) => x + y, 0));
  dit(9, `Réponse : a) $${sommes[0]}$ ; b) $${sommes[1]}$.`);
  const [tot, parts] = dessin("barre", 9);
  const a = entiers(lignes(9)[1]);
  vrai("9. la barre : les quatre nombres du a), rangés par paires", nb(tot) === sommes[0] && memes(parts.map((p) => p.valeur), a) && parts[0].valeur + parts[1].valeur === 40);
});
essai("10", () => {
  const ops = lignes(10).slice(1).map(entiers);
  ops.forEach(([p, N]) => {
    const r1 = Math.ceil(p / 10) * 10, s1 = r1 - p, s2 = N - r1;
    dit(10, `$${p} + ${s1} = ${r1}$, puis $${r1} + ${s2} = ${N}$. On me rend $${s1} + ${s2} = ${N - p}$ €.`);
  });
  dit(10, `Réponse : ${ops.map(([p, N], i) => `${"abc"[i]}) $${N - p}$ €`).join(" ; ")}.`);
  const [, , , points, { sauts }] = dessin("droiteRel", 10);
  const [p, N] = ops[0];
  vrai("10. la droite du a)", memes(points.map((x) => x.value), [p, 30, N]) && sauts.at(-1).vers === N);
});
essai("11", () => {
  const ops = lignes(11).slice(1).map(entiers);
  reponse(11, ops.map(([a, b]) => a * b));
  const [h, dec] = dessin("aire", 11);
  const [a, b] = ops[0];
  vrai("11. le rectangle du a) : 4 sur 20 + 3", h === b && dec.reduce((x, y) => x + y, 0) === a);
});
essai("12", () => {
  const ops = lignes(12).slice(1).map(entiers);
  reponse(12, ops.map(([a, b]) => a / b));
  ops.forEach(([a, b]) => vrai(`12. ${a} ÷ ${b} tombe juste`, a % b === 0));
  const [h, dec] = dessin("aire", 12);
  vrai("12. le rectangle du b) : 5 × 15 = 75", h === ops[1][1] && h * dec.reduce((x, y) => x + y, 0) === ops[1][0]);
});
essai("13", () => {
  const [a, b] = entiers(lignes(13)[0]);
  vrai("13. les trois chemins donnent 83", [48 + 30 + 5, 50 + 35 - 2, 40 + 30 + 8 + 5].every((x) => x === a + b));
  const [x, y] = entiers(lignes(13).at(-1));
  dit(13, `Je calcule $200 + ${y} = ${200 + y}$.`);
  dit(13, `Réponse : a) tous les trois ; c) $${x + y}$.`);
  const [, lg] = dessin("table", 13);
  vrai("13. tableau : 83 partout", lg.every((l) => nb(l[2]) === a + b));
});
essai("14", () => {
  const res = lignes(14).slice(1).map((l) => {
    const [formule, choix] = l.replace(/^[a-c]\) /, "").split(" : ");
    const exact = valeur(formule.replace(/\$/g, ""));
    const props = entiers(choix);
    vrai(`14. ${formule} = ${exact} est proposé`, props.includes(exact));
    return exact;
  });
  dit(14, `Réponse : a) $${t(res[0])}$ ; b) $${t(res[1])}$ ; c) $${t(res[2])}$.`);
  res.forEach((r) => dit(14, `Le bon résultat est $${t(r)}$.`));
  const [, lg] = dessin("table", 14);
  vrai("14. tableau : les trois résultats", lg.every((l, i) => nb(l[2]) === res[i]));
});
essai("15", () => {
  const [pers, farine, oeufs, lait] = entiers(lignes(15)[0]);
  const n12 = entiers(lignes(15)[1])[0], n8 = entiers(lignes(15)[2])[0], boite = entiers(lignes(15)[3])[0];
  const k12 = n12 / pers, k8 = n8 / pers;
  const boites = Math.ceil((oeufs * k12) / boite);
  dit(15, `Réponse : a) $${farine * k12}$ g, $${oeufs * k12}$ œufs, $${lait * k12}$ cl ; b) $${farine * k8}$ g, $${oeufs * k8}$ œufs, $${lait * k8}$ cl ; c) $${boites}$ boîtes.`);
  const [, lg] = dessin("table", 15);
  vrai("15. tableau 4 → 12 personnes", lg.every((l) => nb(l[2]) === nb(l[1]) * k12) && nb(lg[0][1]) === farine && nb(lg[1][1]) === oeufs && nb(lg[2][1]) === lait);
});
essai("16", () => {
  const [n, somme] = entiers(lignes(16)[0]);
  const autres = [lignes(16)[2], lignes(16)[3]].map((l) => entiers(l)[0]);
  dit(16, `Réponse : a) $${somme / n}$ € ; b) $${somme / autres[0]}$ € ; c) $${somme / autres[1]}$ €.`);
  const [tot, parts] = dessin("barre", 16);
  vrai("16. la barre : 90 € en 6 parts de 15", nb(tot.replace("€", "")) === somme && parts.length === n && parts.every((p) => p.valeur === somme / n && nb(p.texte) === somme / n));
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [eleves, adultes] = entiers(lignes(17)[0]);
  const [pe, pa] = entiers(lignes(17)[1]);
  const budget = entiers(lignes(17)[4])[0], car = entiers(lignes(17)[5])[0];
  const be = eleves * pe, ba = adultes * pa, reste = budget - be - ba;
  dit(17, `Réponse : a) $${be}$ € ; b) $${ba}$ € ; c) $${reste}$ € ; d) $${car / eleves}$ €.`);
  const [tot, parts] = dessin("barre", 17);
  vrai("17. la barre : billets élèves, adultes, reste", nb(tot.replace("€", "")) === budget && JSON.stringify(parts.map((p) => p.valeur)) === JSON.stringify([be, ba, reste]));
});
essai("18", () => {
  const [tour, km] = entiers(lignes(18)[0]);
  const t8 = entiers(lignes(18)[1])[0], faits = entiers(lignes(18)[3])[0];
  const m = km * 1000, tours = m / tour, reste = m - faits * tour;
  dit(18, `Réponse : a) $${t(t8 * tour)}$ m ; b) $${tours}$ tours ; c) $${t(reste)}$ m.`);
  vrai("18. il reste 8 tours, comme au a)", tours - faits === t8);
  const [tot, parts] = dessin("barre", 18);
  vrai("18. la barre : 17 tours + le reste = 10 000 m", nb(tot.replace("m", "")) === m && parts[0].valeur === faits * tour && parts[1].valeur === reste && parts[0].texte === `${faits} tours` && parts[1].texte === `${reste / tour} tours`);
});
essai("19", () => {
  const [etages] = dessin("pyramide", 19, "figure");
  let rang = etages.at(-1).map(Number);
  const tous = [rang];
  while (rang.length > 1) {
    rang = rang.slice(1).map((x, i) => x + rang[i]);
    tous.unshift(rang);
  }
  dit(19, `Sommet : $${tous[1][0]} + ${tous[1][1]} = ${tous[0][0]}$.`);
  dit(19, `Réponse : a) le sommet vaut $${tous[0][0]}$`);
  const [haut, milieu, centre] = entiers(lignes(19).slice(2).join(" "));
  const autre = haut - milieu, g = milieu - centre, d = autre - centre;
  dit(19, `b) $${autre}$ au milieu, $${g}$ et $${d}$ en bas.`);
  const [sol] = dessin("pyramide", 19, "schema");
  vrai("19. la pyramide du b), et ses additions", sol[0][0] === String(haut) && sol[1].map(Number).join() === `${milieu},${autre}` && sol[2].map(Number).join() === `${g},${centre},${d}` && g + centre === milieu && centre + d === autre);
});
essai("20", () => {
  // Les montants sont dans les formules (« 1re » n'en est pas une).
  const [p] = [...lignes(20)[1].matchAll(/\$(\d+)\$/g)].map((m) => Number(m[1]));
  const semaine = (n) => p * n;
  const cumul = (n) => Array.from({ length: n }, (_, i) => semaine(i + 1)).reduce((x, y) => x + y, 0);
  const prix = entiers(lignes(20)[4])[0];
  let n = 1;
  while (cumul(n) < prix) n++;
  dit(20, `Réponse : a) $${semaine(8)}$ € ; b) $${cumul(8)}$ € ; c) $${n}$ semaines.`);
  const [, lg] = dessin("table", 20);
  vrai("20. le tableau des semaines", lg.every((l, i) => nb(l[0]) === i + 1 && nb(l[1]) === semaine(i + 1) && nb(l[2]) === cumul(i + 1)));
  vrai("20. la 9e ne suffit pas, la 10e oui", cumul(9) < prix && cumul(10) >= prix && n === 10);
});

f.fin();
