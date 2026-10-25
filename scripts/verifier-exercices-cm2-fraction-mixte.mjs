// Recalcul indépendant de la feuille « Les fractions plus grandes que 1 » de
// CM2 (25/10/2026) : lib/fiches-exercices/maths-cm2-fraction-mixte.tsx.
//
// ⭐ L'AUTRE CHEMIN : pour « entier + fraction », le script fait la DIVISION
// euclidienne (quotient, reste) ; pour regrouper, il multiplie l'entier par le
// dénominateur et ajoute ; pour encadrer, il prend la partie entière. Il relit
// les dessins (barres de plusieurs unités, pizzas, droites) et cherche chaque
// résultat dans le corrigé.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs (classe cm2).
// Usage : node scripts/verifier-exercices-cm2-fraction-mixte.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";
import { Q, egal, inf, tex } from "./verifier-exercices-commun.mjs";

const DESSINS = ["barres", "deuxDisques", "droiteRel"];
const f = ouvrir("lib/fiches-exercices/maths-cm2-fraction-mixte.tsx", "fraction_mixte", DESSINS, "cm2");
const { vrai, dit, enonceDit, e, dessin, appels, essai } = f;

const F = (a, b = 1) => Q(a, b);
const fr = (a, b) => `\\dfrac{${a}}{${b}}`;
const txt = (q) => tex(q).replace("{,}", ",");
const couples = (t) => [...t.matchAll(/\\dfrac\{(\d+)\}\{(\d+)\}/g)].map((m) => [Number(m[1]), Number(m[2])]);
const lignes = (k) => e(k).split("\\n");
const pres = (x, q) => Math.abs(x - Number(q.n) / Number(q.d)) < 1e-9;
/** a/b → [entier, reste]. */
const mixte = (a, b) => [Math.floor(a / b), a % b];
const ecrireMixte = (a, b) => {
  const [q, r] = mixte(a, b);
  return `${q} + ${fr(r, b)}`;
};
/** e + r/b → numérateur sur b. */
const regroupe = (ent, r, b) => ent * b + r;
/** Les points d'une droite sont à la place que dit leur étiquette « a/b ». */
const pointsJustes = (pts) => pts.filter((p) => /^\d+\/\d+$/.test(p.label)).every((p) => pres(p.value, F(...p.label.split("/").map(Number))));

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const [a, b, ecrire] = dessin("deuxDisques", 1, "figure");
  vrai("1. les pizzas sans écriture", ecrire === false && a[0] === a[1]);
  const n = a[0] + b[0];
  dit(1, `${a[0]} + ${b[0]} = ${n} quarts : $${fr(n, b[1])}$`);
  dit(1, `$${fr(n, b[1])} = ${ecrireMixte(n, b[1])}$`);
});
essai("2", () => {
  const [liste] = dessin("barres", 2, "figure");
  liste.forEach((x) => {
    const n = x.parts[0];
    vrai(`2. barre ${x.label} : plus d'une unité, moins de deux`, n > x.d && n < 2 * x.d && x.fois === 2);
    dit(2, `${n} parts bleues : $${fr(n, x.d)}$`);
    dit(2, `$${fr(n, x.d)} = ${ecrireMixte(n, x.d)}$`);
  });
  dit(2, `écrire $${fr(liste[0].parts[0], liste[0].d * 2)}$ pour A`);
});
essai("3", () => {
  const fs = couples(e(3));
  fs.slice(0, 4).forEach(([a, b]) => {
    vrai(`3. ${a}/${b} est entier`, a % b === 0);
    if (a !== b) dit(3, `$${fr(a, b)} = ${a / b}$`);
  });
  const ent = Number(/e\) \$(\d+) =/.exec(e(3))[1]);
  const d = Number(/\\dfrac\{\\ldots\}\{(\d+)\}/.exec(e(3))[1]);
  dit(3, `$${ent} = ${fr(ent * d, d)}$`);
  dit(3, `Réponse : a) 1 ; b) 2 ; c) 3 ; d) 3 ; e) $${fr(ent * d, d)}$.`);
  const [liste] = dessin("barres", 3);
  vrai("3. les barres : 12/4 et 18/6 pleines sur 3 unités", liste.every((x) => x.parts[0] === x.d * x.fois && x.label === `${x.parts[0]}/${x.d}`));
});
essai("4", () => {
  const [, , pas, pts] = dessin("droiteRel", 4, "figure");
  const d = Math.round(1 / pas);
  pts.forEach((p) => {
    const k = Math.round(p.value / pas);
    const [q] = mixte(k, d);
    dit(4, `${p.label} est à ${k} sauts${p === pts[0] ? " de 0" : ""} : $${fr(k, d)}$`);
    dit(4, `$${q} < ${fr(k, d)} < ${q + 1}$`);
  });
  dit(4, `« entre 7 et 8 »`);
});
essai("5", () => {
  const fs = couples(e(5));
  const rep = fs.map(([a, b]) => {
    const [q] = mixte(a, b);
    vrai(`5. ${a}/${b} n'est pas entier`, a % b !== 0);
    dit(5, `$${q} < ${fr(a, b)} < ${q + 1}$`);
    dit(5, `${q} × ${b} = ${q * b} et ${q + 1} × ${b} = ${(q + 1) * b}`);
    return `${q} et ${q + 1}`;
  });
  dit(5, `Réponse : ${rep.map((r, i) => `${"abcde"[i]}) ${r}`).join(" ; ")}.`);
  const [, , , pts] = dessin("droiteRel", 5);
  vrai("5. la droite place les cinq fractions", pointsJustes(pts) && pts.length === fs.length);
});
essai("6", () => {
  const items = lignes(6).slice(1).map((l) => {
    const m = /\$(\d+) \+ \\dfrac\{(\d+)\}\{(\d+)\}\$/.exec(l);
    return [Number(m[1]), Number(m[2]), Number(m[3])];
  });
  const rep = items.map(([ent, r, b]) => {
    const n = regroupe(ent, r, b);
    dit(6, `$${ent} + ${fr(r, b)} = ${fr(n, b)}$`);
    dit(6, `$${ent} = ${fr(ent * b, b)}$`);
    return `$${fr(n, b)}$`;
  });
  dit(6, `Réponse : ${rep.map((r, i) => `${"abcd"[i]}) ${r}`).join(" ; ")}.`);
  dit(6, `n'est pas $${fr(items[1][0] * 10 + items[1][1], items[1][2])}$ : ça ferait ${(items[1][0] * 10 + items[1][1]) / items[1][2]} unités`);
  const [liste] = dessin("barres", 6);
  vrai("6. la barre : 1 + 1/4 = 5 quarts", liste[0].parts[0] === regroupe(1, 1, 4) && liste[0].d === 4);
});
essai("7", () => {
  const [ent, r, b] = (() => {
    const m = /\$(\d+) \+ \\dfrac\{(\d+)\}\{(\d+)\}\$/.exec(e(7));
    return [Number(m[1]), Number(m[2]), Number(m[3])];
  })();
  const n = regroupe(ent, r, b);
  dit(7, `${ent} km, ce sont ${ent} × ${b} = ${ent * b} quarts`);
  dit(7, `$${ent} + ${fr(r, b)} = ${fr(n, b)}$ km`);
  const [, max] = dessin("droiteRel", 7, "figure");
  vrai("7. la piste fait 3 km", max === 3);
  const [, , , pts] = dessin("droiteRel", 7, "schema");
  vrai("7. le point d'eau à sa place", pres(pts[0].value, F(n, b)) && pts[0].label === `${n}/${b}`);
});
essai("8", () => {
  const fs = couples(e(8));
  const rep = fs.map(([a, b]) => {
    const [q, r] = mixte(a, b);
    dit(8, `${q} × ${b} = ${q * b} : $${fr(a, b)} = ${fr(q * b, b)} + ${fr(r, b)} = ${q} + ${fr(r, b)}$`);
    return `$${q} + ${fr(r, b)}$`;
  });
  dit(8, `Réponse : ${rep.map((r, i) => `${"abcd"[i]}) ${r}`).join(" ; ")}.`);
  const [a, b] = fs[3];
  dit(8, `Il reste alors ${a - 6 * b} sixièmes`);
  const [, , , pts] = dessin("droiteRel", 8);
  vrai("8. la droite place les quatre fractions", pointsJustes(pts));
});
/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const fs = couples(e(9));
  const rep = fs.map(([a, b]) => {
    const q = F(a, b);
    dit(9, `$${fr(a, b)} = ${ecrireMixte(a, b)} = ${tex(q)}$`);
    return txt(q);
  });
  dit(9, `Réponse : ${rep.map((r, i) => `${"abcd"[i]}) ${r}`).join(" ; ")}.`);
  vrai("9. le piège 1 + 3/4 ≠ 1,3", txt(F(7, 4)) === "1,75");
  const [, , , pts] = dessin("droiteRel", 9);
  vrai("9. la droite : 5/4, 3/2, 7/4", pointsJustes(pts) && pts.length === 3);
});
essai("10", () => {
  const n = regroupe(2, 3, 5);
  enonceDit(10, `$2 + ${fr(3, 5)}$`);
  vrai("10. Tom : 5/5 = 1, trop petit", egal(F(2 + 3, 5), F(1)) && inf(F(1), F(n, 5)));
  vrai("10. Léa : 23/5 entre 4 et 5", mixte(23, 5)[0] === 4);
  dit(10, `$${fr(23, 5)} = ${ecrireMixte(23, 5)}$`);
  dit(10, `Donc $2 + ${fr(3, 5)} = ${fr(n, 5)}$`);
  dit(10, `c) $${fr(n, 5)}$`);
  const [liste] = dessin("barres", 10);
  vrai("10. la barre : 13 cinquièmes sur 3 unités", liste[0].parts[0] === n && liste[0].d === 5 && liste[0].fois === 3);
});
essai("11", () => {
  vrai("11. l'exemple du programme : 58/7 = 8 + 2/7", ecrireMixte(58, 7) === `8 + ${fr(2, 7)}`);
  const fs = couples(lignes(11).slice(2).join(" "));
  fs.forEach(([a, b]) => {
    const [q, r] = mixte(a, b);
    dit(11, `${q} × ${b} = ${q * b} : $${fr(a, b)} = ${fr(q * b, b)} + ${fr(r, b)} = ${q} + ${fr(r, b)}$, donc $${q} < ${fr(a, b)} < ${q + 1}$`);
    dit(11, `$${q} + ${fr(r, b)}$, entre ${q} et ${q + 1}`);
  });
  dit(11, `prendre 6 × 9 = 54`);
  const [, , , pts] = dessin("droiteRel", 11);
  vrai("11. la droite", pointsJustes(pts));
});
essai("12", () => {
  const vals = [["2 + 1/3", F(7, 3)], ["8/3", F(8, 3)], ["2", F(2)], ["5/3", F(5, 3)], ["3", F(3)]];
  const tri = [...vals].sort((x, y) => (inf(x[1], y[1]) ? -1 : 1));
  const tiers = tri.map((x) => Number((x[1].n * 3n) / x[1].d));
  dit(12, `Je range les numérateurs : ${tiers.join(" < ")}.`);
  const texte = (s) => (s.includes("+") ? `2 + ${fr(1, 3)}` : s.includes("/") ? fr(...s.split("/")) : s);
  dit(12, `Réponse : $${tri.map((x) => texte(x[0])).join(" < ")}$.`);
  const [, , , pts] = dessin("droiteRel", 12);
  vrai("12. la droite : 5/3, 2 + 1/3, 8/3", pres(pts[1].value, F(7, 3)) && pointsJustes(pts));
});
essai("13", () => {
  const fs = couples(lignes(13).slice(1).join(" "));
  fs.forEach(([a, b]) => {
    const q = F(a, b);
    const [n, d] = [Number(q.n), Number(q.d)];
    dit(13, `$${fr(a, b)} = ${fr(n, d)} = ${ecrireMixte(n, d)}$`);
  });
  dit(13, `Réponse : a) $${ecrireMixte(3, 2)}$ ; b) $${ecrireMixte(5, 2)}$ ; c) $${ecrireMixte(3, 2)}$.`);
  const [liste] = dessin("barres", 13);
  vrai("13. les barres : même longueur bleue", egal(F(liste[0].parts[0], liste[0].d), F(liste[1].parts[0], liste[1].d)));
});
essai("14", () => {
  const items = lignes(14).slice(1).map((l) => {
    const [[a, b]] = couples(l);
    const [, x, y] = /entre (\d+) et (\d+)/.exec(l).map(Number);
    return { a, b, x, y, vrai: inf(F(x), F(a, b)) && inf(F(a, b), F(y)) };
  });
  const rep = items.map((it) => (it.vrai ? "vrai" : "faux"));
  dit(14, `Réponse : ${rep.map((r, i) => `${"abcd"[i]}) ${r}`).join(" ; ")}.`);
  vrai("14b. 9/3 = 3 pile", egal(F(9, 3), F(3)));
  const [, , , pts] = dessin("droiteRel", 14);
  vrai("14. la droite", pointsJustes(pts) && pts.length === 4);
});
essai("15", () => {
  const n = regroupe(2, 3, 4);
  dit(15, `8 + 3 = ${n} quarts. Il remplit sa mesure ${n} fois`);
  dit(15, `$2 + ${fr(3, 4)} = ${fr(n, 4)}$ tasses`);
  dit(15, `$2 + ${fr(3, 4)} = ${tex(F(n, 4))}$ tasses`);
  const [liste] = dessin("barres", 15);
  vrai("15. la barre : 11 quarts", liste[0].parts[0] === n);
});
essai("16", () => {
  const [min, , pas, pts] = dessin("droiteRel", 16, "figure");
  const d = Math.round(1 / pas);
  pts.forEach((p) => {
    const k = Math.round(p.value / pas);
    const [q, r] = mixte(k, d);
    dit(16, `${p.label} est ${r} sauts après ${q} : $${fr(k, d)}$`);
    dit(16, `$${fr(k, d)} = ${q} + ${fr(r, d)}$`);
  });
  vrai("16. la droite commence à 2", min === 2);
  dit(16, `écrire $${fr(Math.round((pts[0].value - min) / pas), d)}$ pour A`);
});
/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [d, n] = [...lignes(17)[0].matchAll(/(\d+) parts/g)].map((m) => Number(m[1]));
  const [q, r] = mixte(n, d);
  dit(17, `${n} parts : $${fr(n, d)}$ de tarte`);
  dit(17, `$${fr(n, d)} = ${fr(q * d, d)} + ${fr(r, d)} = ${q} + ${fr(r, d)}$`);
  dit(17, `$${q} < ${fr(n, d)} < ${q + 1}$`);
  dit(17, `3 tartes = 3 × ${d} = ${3 * d} parts. ${3 * d} − ${n} = ${3 * d - n} part manque`);
  const [liste] = dessin("barres", 17, "figure");
  vrai("17. la barre : 17 sixièmes sur 3 tartes", liste[0].parts[0] === n && liste[0].d === d && liste[0].fois === 3);
});
essai("18", () => {
  const [[a, b]] = couples(lignes(18)[0]);
  const [q, r] = mixte(a, b);
  dit(18, `$${fr(a, b)} = ${fr(q * b, b)} + ${fr(r, b)} = ${q} + ${fr(r, b)}$ heures`);
  vrai("18b. un quart d'heure = 15 min", (60 * r) / b === 15);
  dit(18, `${q} h ${(60 * r) / b} min`);
  dit(18, `$${fr(a, b)} = ${tex(F(a, b))}$ heures`);
  const retour = regroupe(2, 2, 4);
  vrai("18d. 2 + 1/2 = 10/4 > 9/4", egal(F(5, 2), F(retour, 4)) && inf(F(a, b), F(retour, 4)));
  dit(18, `$2 + ${fr(1, 2)} = ${fr(retour, 4)}$`);
  dit(18, `de ${((retour - a) * 60) / 4} minutes`);
  const [, , , pts] = dessin("droiteRel", 18);
  vrai("18. la droite : aller et retour", pres(pts[0].value, F(a, b)) && pres(pts[1].value, F(5, 2)));
});
essai("19", () => {
  const m = /\$(\d+) \+ \\dfrac\{(\d+)\}\{(\d+)\}\$ mètres/.exec(e(19));
  const [ent, r, b] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const n = regroupe(ent, r, b);
  dit(19, `${ent} mètres = ${ent} × ${b} = ${ent * b} morceaux. Et ${r} de plus : ${ent * b} + ${r} = ${n} morceaux`);
  dit(19, `$${ent} + ${fr(r, b)} = ${fr(n, b)}$ mètres`);
  const cousu = Number(/coud (\d+) morceaux/.exec(e(19))[1]);
  dit(19, `$${fr(cousu, b)} = ${fr(mixte(cousu, b)[0] * b, b)} + ${fr(mixte(cousu, b)[1], b)} = ${ecrireMixte(cousu, b)}$ m`);
  const reste = n - cousu;
  vrai("19d. il reste 1 mètre", egal(F(reste, b), F(1)));
  dit(19, `${n} − ${cousu} = ${reste} morceaux`);
  const [liste] = dessin("barres", 19, "figure");
  vrai("19. la barre : 17 cinquièmes sur 4 mètres", liste[0].parts[0] === n && liste[0].d === b && liste[0].fois === 4);
});
essai("20", () => {
  const sol = [13, 14, 15].filter((k) => k % 2 === 1 && k > 14);
  vrai("20. une seule fraction", sol.length === 1);
  const [k] = sol;
  vrai("20. entre 3 et 4 : numérateurs 13 à 15", Array.from({ length: 20 }, (_, i) => i).filter((i) => inf(F(3), F(i, 4)) && inf(F(i, 4), F(4))).join() === "13,14,15");
  dit(20, `Je suis $${fr(k, 4)}$`);
  dit(20, `$${fr(k, 4)} = ${ecrireMixte(k, 4)} = ${tex(F(k, 4))}$`);
  dit(20, `$3 + ${fr(1, 2)} = ${fr(14, 4)}$`);
  const [, , , pts] = dessin("droiteRel", 20, "figure");
  vrai("20. la droite : 3 + 1/2 au milieu", pts[0].value === 3.5);
});

/* ═══ Les noms des barres tiennent ; une barre de plusieurs unités en a 4 au plus ═══ */
for (const { args } of appels("barres").filter((a) => a.args)) {
  const fois = Math.max(...args[0].map((b) => b.fois ?? 1));
  for (const b of args[0]) {
    vrai(`barres : « ${b.label} » ≤ 10 signes`, b.label.length <= 10);
    vrai(`barres : « ${b.label} » ne déborde pas de ses unités`, b.parts.reduce((s, x) => s + x, 0) <= b.d * (b.fois ?? 1));
    vrai(`barres : « ${b.label} » a autant d'unités que ses voisines`, (b.fois ?? 1) === fois && fois <= 4);
  }
}

f.fin();
