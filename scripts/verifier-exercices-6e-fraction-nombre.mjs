// Recalcul indépendant de la feuille « Les fractions » de 6e (30/09/2026) :
// lib/fiches-exercices/maths-6e-fraction-nombre.tsx.
//
// ⭐ Les fractions sont EXACTES (BigInt, module commun). Le script relit les
// nombres dans l'énoncé ou dans le dessin (barres, découpes, grille, droite),
// refait le geste (compter les parts, redécouper, ranger, encadrer) et cherche
// la réponse écrite dans le corrigé. Les points d'une droite graduée sont
// comparés à leur étiquette.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-6e-fraction-nombre.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";
import { Q, egal, inf, texFrac, tex, D } from "./verifier-exercices-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-fraction-nombre.tsx", "fraction_nombre", ["droiteRel", "table", "comparer", "barres", "decoupes", "grille"], "6e");
const { c, e, vrai, verif, dit, dessin, essai } = f;

const F = (a, b = 1) => Q(a, b);
/** « \dfrac{3}{4} » tel quel, SANS simplifier. */
const brut = (a, b) => `\\dfrac{${a}}{${b}}`;
const TD = (q) => tex(q);
/** Les fractions \dfrac{a}{b} d'un texte, en couples d'entiers. */
const couples = (texte) => [...texte.matchAll(/\\dfrac\{(\d+)\}\{(\d+)\}/g)].map((m) => [Number(m[1]), Number(m[2])]);
/** Une étiquette de dessin « 3/4 » → fraction exacte. */
const deLabel = (s) => {
  const m = /(\d+)\/(\d+)/.exec(s);
  return F(Number(m[1]), Number(m[2]));
};
/** Valeur flottante proche d'une fraction. */
const pres = (x, q) => Math.abs(x - Number(q.n) / Number(q.d)) < 1e-9;
const lignes = (k) => e(k).split("\\n");
const signe = (a, b) => (inf(a, b) ? "<" : inf(b, a) ? ">" : "=");

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const [liste] = dessin("barres", 1, "figure");
  const rep = liste.map((b) => {
    const n = b.parts[0];
    dit(1, `Barre ${b.label} : $${b.d}$ parts, $${n}$ bleues. $${brut(n, b.d)}$`);
    return `${b.label} : $${brut(n, b.d)}$`;
  });
  dit(1, `Réponse : ${rep.join(" ; ")}.`);
  vrai("1. le piège : 2 bleues, 1 blanche pour A", liste[0].d - liste[0].parts[0] === 1 && c(1).includes(brut(liste[0].parts[0], 1)));
});
essai("2", () => {
  const nombres = { un: 1, trois: 3, cinq: 5, neuf: 9, onze: 11 };
  const rangs = { demi: 2, tiers: 3, septièmes: 7, huitièmes: 8, dixièmes: 10, centièmes: 100 };
  const rep = lignes(2).slice(1, 5).map((l, i) => {
    const [, haut, bas] = /\) (\S+) (\S+)$/.exec(l);
    const q = [nombres[haut], rangs[bas]];
    dit(2, `$${brut(...q)}$`);
    return `${"abcd"[i]}) $${brut(...q)}$`;
  });
  const [e37] = couples(lignes(2)[5]);
  vrai("2e. 3/7 se lit trois septièmes", e37[0] === nombres.trois && e37[1] === rangs.septièmes);
  dit(2, `Réponse : ${rep.join(" ; ")} ; e) trois septièmes.`);
  const [, tab] = dessin("table", 2);
  tab.forEach((l, i) => {
    const [, haut, bas] = l[0].split(" ").length === 2 ? [null, ...l[0].split(" ")] : [];
    vrai(`2. tableau « ${l[0]} »`, nombres[haut] === Number(l[1]) && rangs[bas] === Number(l[2]) && rep[i].includes(brut(l[1], l[2])));
  });
});
essai("3", () => {
  const total = Number(/a \$(\d+)\$ carreaux/.exec(e(3))[1]);
  const [a, b] = couples(e(3));
  vrai("3. dénominateurs = carreaux", a[1] === total && b[1] === total);
  const blanc = total - a[0];
  dit(3, `$${total} - ${a[0]} = ${blanc}$ carreaux restent blancs`);
  dit(3, `Réponse : a) $${a[0]}$ carreaux ; b) $${b[0]}$ carreaux ; c) $${brut(blanc, total)}$.`);
  const [li, co, groupes, reste] = dessin("grille", 3);
  vrai("3. la grille : 12 carreaux, 5 coloriés, légende juste", li * co === total && groupes[0].n === a[0] && egal(deLabel(groupes[0].nom), F(a[0], total)) && egal(deLabel(reste), F(blanc, total)));
});
essai("4", () => {
  const [cible] = couples(e(4)).map((x) => F(...x));
  const [liste] = dessin("decoupes", 4, "figure");
  const oui = liste.filter((b) => {
    const egales = b.largeurs.every((w) => w === b.largeurs[0]);
    const tot = b.largeurs.reduce((s, w) => s + w, 0);
    const bleu = b.largeurs.slice(0, b.colorie).reduce((s, w) => s + w, 0);
    return egales && egal(F(bleu, tot), cible);
  });
  dit(4, `Réponse : les barres ${oui.map((b) => b.label).join(" et ")}.`);
  const B = liste.find((b) => b.label === "B");
  vrai("4. B : 4 parts inégales", B.largeurs.length === 4 && !B.largeurs.every((w) => w === B.largeurs[0]));
  vrai("4. B : la part bleue est plus petite qu'un quart", inf(F(B.largeurs[0], B.largeurs.reduce((s, w) => s + w, 0)), cible));
  const C = liste.find((b) => b.label === "C");
  dit(4, `C : $${C.largeurs.length}$ parts égales, $${C.colorie}$ bleue. C'est $${brut(C.colorie, C.largeurs.length)}$`);
  const Dd = liste.find((b) => b.label === "D");
  dit(4, `D : $${Dd.largeurs.length}$ parts égales, $${Dd.colorie}$ bleues : $${brut(Dd.colorie, Dd.largeurs.length)}$`);
});
essai("5", () => {
  const fr = couples(e(5));
  const rep = fr.map(([n, d], i) => {
    const q = F(n, d);
    dit(5, `$${brut(n, d)} = ${TD(q)}$`);
    return `${"abcd"[i]}) $${TD(q)}$`;
  });
  dit(5, `Réponse : ${rep.join(" ; ")}.`);
  dit(5, `écrire $${TD(F(4, 10))}$`);
  const [, tab] = dessin("table", 5);
  tab.forEach((l, i) => vrai(`5. tableau ${l[0]}`, egal(deLabel(l[0]), F(...fr[i])) && egal(D(l[2]), F(...fr[i])) && l[1].startsWith(String(fr[i][0]))));
});
essai("6", () => {
  const nb = lignes(6).slice(1).map((l) => D(/\$([\d{},]+)\$/.exec(l)[1].replace("{,}", ",")));
  const dec = (q) => {
    for (const d of [10, 100]) if ((q.n * BigInt(d)) % q.d === 0n) return [Number((q.n * BigInt(d)) / q.d), d];
  };
  const fr = nb.map(dec);
  // 0,5 = 5/10 : la fraction décimale la plus « lue » ; 1,7 → 17/10 ; 0,09 → 9/100.
  const lus = [[3, 10], [9, 100], [17, 10], [5, 10]];
  lus.forEach((x, i) => vrai(`6. ${TD(nb[i])} = ${x[0]}/${x[1]}`, egal(F(...x), nb[i])));
  vrai("6. les dénominateurs viennent du dernier rang", fr[0][1] === 10 && fr[1][1] === 100 && fr[2][1] === 10);
  lus.forEach((x, i) => dit(6, `$${TD(nb[i])} = ${brut(...x)}$`));
  vrai("6d. 5/10 = 1/2", egal(F(5, 10), F(1, 2)));
  dit(6, `Réponse : a) $${brut(...lus[0])}$ ; b) $${brut(...lus[1])}$ ; c) $${brut(...lus[2])}$ ; d) $${brut(...lus[3])} = ${texFrac(F(1, 2))}$.`);
  const [, , , points] = dessin("droiteRel", 6);
  vrai("6. la droite : 3/10, 5/10, 17/10 à leur place", points.every((p) => pres(p.value, deLabel(p.label))) && points.length === 3);
});
essai("7", () => {
  const paires = lignes(7).slice(1).map((l) => couples(l));
  const s = paires.map(([a, b]) => signe(F(...a), F(...b)));
  paires.forEach(([a, b], i) => dit(7, `$${brut(...a)} ${s[i]} ${brut(...b)}$`));
  dit(7, `Réponse : ${s.map((x, i) => `${"abcd"[i]}) $${x}$`).join(" ; ")}.`);
  const [a, b] = dessin("comparer", 7);
  vrai("7. les barres : le b)", a.join() === paires[1][0].join() && b.join() === paires[1][1].join());
});
essai("8", () => {
  const fr = lignes(8).slice(1).map((l) => couples(l)[0]);
  const [, , , points] = dessin("droiteRel", 8);
  const rep = fr.map(([n, d], i) => {
    const ent = Math.floor(n / d), r = n % d;
    if (r === 0) {
      dit(8, `$${brut(n, d)} = ${ent}$`);
      return `${"abcd"[i]}) $${brut(n, d)} = ${ent}$`;
    }
    dit(8, `$${brut(n, d)} = ${ent} + ${brut(r, d)}$ : entre $${ent}$ et $${ent + 1}$`);
    vrai(`8. ${n}/${d} sur la droite`, points.some((p) => p.label === `${n}/${d}` && pres(p.value, F(n, d))));
    return `${"abcd"[i]}) entre $${ent}$ et $${ent + 1}$, $${ent} + ${brut(r, d)}$`;
  });
  dit(8, `Réponse : ${rep.join(" ; ")}.`);
  vrai("8. 6/3 sur la droite, en 2", points.some((p) => p.label === "6/3" && p.value === 2));
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const base = F(1, 3);
  const chaine = [[1, 3], [2, 6], [3, 9], [4, 12]];
  chaine.forEach((x) => vrai(`9a. ${x} égale à 1/3`, egal(F(...x), base)));
  const trous = /\$\\dfrac\{1\}\{3\} = \\dfrac\{2\}\{\\ldots\} = \\dfrac\{\\ldots\}\{9\} = \\dfrac\{4\}\{\\ldots\}\$/.test(e(9));
  vrai("9a. l'énoncé porte les trous 2/…, …/9, 4/…", trous);
  dit(9, `Réponse : a) $${chaine.map((x) => brut(...x)).join(" = ")}$ ; b) $${brut(10, 30)}$ ; c) oui.`);
  vrai("9b. 10/30 = 1/3", egal(F(10, 30), base));
  vrai("9c. 5/15 = 1/3", egal(F(5, 15), base));
  vrai("9. le piège : 2/4 n'est pas 1/3", !egal(F(2, 4), base) && c(9).includes(brut(2, 4)));
  const [liste] = dessin("barres", 9);
  vrai("9. les barres : trois écritures de 1/3", liste.every((b) => egal(F(b.parts[0], b.d), base) && egal(deLabel(b.label), F(b.parts[0], b.d))));
});
essai("10", () => {
  const paires = lignes(10).slice(1).map((l) => couples(l));
  paires.forEach(([a, b], i) => {
    const s = signe(F(...a), F(...b));
    dit(10, `${"abc"[i]}) $${brut(...a)} ${s} ${brut(...b)}$`);
  });
  dit(10, `$${brut(3, 5)} = ${brut("3 \\times 2", "5 \\times 2")} = ${brut(6, 10)}$`);
  dit(10, `$${brut(1, 2)} = ${brut("1 \\times 4", "2 \\times 4")} = ${brut(4, 8)}$`);
  dit(10, `$${brut(2, 3)} = ${brut("2 \\times 2", "3 \\times 2")} = ${brut(4, 6)}$`);
  vrai("10. redécoupages exacts", egal(F(3, 5), F(6, 10)) && egal(F(1, 2), F(4, 8)) && egal(F(2, 3), F(4, 6)));
  const [liste] = dessin("barres", 10);
  vrai("10. les barres : 3/5, 6/10, 7/10", liste.every((b) => egal(F(b.parts[0], b.d), deLabel(b.label))) && egal(deLabel(liste[0].label), F(...paires[0][0])) && egal(deLabel(liste[2].label), F(...paires[0][1])));
});
essai("11", () => {
  const fr = couples(lignes(11)[1]);
  const tri = [...fr].sort((x, y) => (inf(F(...x), F(...y)) ? -1 : 1));
  dit(11, `Réponse : $${tri.map((x) => brut(...x)).join(" < ")}$.`);
  dit(11, `$${tri.map((x) => TD(F(...x))).join(" < ")}$`);
  fr.forEach((x) => dit(11, `${brut(...x)} = `));
  const [, , , points] = dessin("droiteRel", 11);
  vrai("11. la droite range les cinq fractions", tri.every((x, i) => points[i].label === `${x[0]}/${x[1]}` && pres(points[i].value, F(...x))));
});
essai("12", () => {
  const [q] = couples(lignes(12)[0]);
  const ent = Math.floor(q[0] / q[1]), r = q[0] % q[1];
  vrai("12a. 13/5 = 2 + …/5 : l'entier de l'énoncé", lignes(12)[0].includes(`= ${ent} + `));
  dit(12, `Donc $${brut(...q)} = ${ent} + ${brut(r, q[1])}$.`);
  dit(12, `b) $${ent} < ${brut(...q)} < ${ent + 1}$.`);
  const liste = [F(13, 5), F(11, 5), F(3), F(9, 5)];
  vrai("12c. 2 + 1/5 = 11/5 et 3 = 15/5", egal(liste[1], F(2 * 5 + 1, 5)) && egal(liste[2], F(15, 5)));
  const cinquiemes = liste.map((x) => Number((x.n * 5n) / x.d)).sort((a, b) => a - b);
  dit(12, `$${cinquiemes.join(" < ")}$`);
  dit(12, `Réponse : a) $${r}$ ; b) entre $${ent}$ et $${ent + 1}$ ; c) $${brut(9, 5)} < 2 + ${brut(1, 5)} < ${brut(13, 5)} < 3$.`);
  const [, , , points] = dessin("droiteRel", 12);
  vrai("12. la droite : 9/5, 2 + 1/5, 13/5", pres(points[0].value, F(9, 5)) && pres(points[1].value, F(11, 5)) && pres(points[2].value, F(13, 5)) && points[1].label === "2 + 1/5");
});
essai("13", () => {
  const [min, max, pas, points, opts] = dessin("droiteRel", 13, "figure");
  vrai("13. graduée en cinquièmes, un nombre par unité", pas === 0.2 && opts.nombres === 1 && min === 0);
  const rep = points.map((p) => {
    const sauts = Math.round(p.value / pas);
    dit(13, `${p.label} est à $${sauts}$ sauts de $0$`);
    return [p.label, sauts];
  });
  dit(13, `Réponse : a) ${rep.map(([l, s]) => `${l} : $${brut(s, 5)}$`).join(" ; ")} ; b) ${rep.filter(([, s]) => s > 5).map(([l]) => l).join(" et ")}.`);
  vrai("13. le piège : 4 traits pour A, 0 compris", Math.round(points[0].value / pas) + 1 === 4 && c(13).includes("on trouverait $4$"));
  vrai("13. max 2", max === 2);
});
essai("14", () => {
  vrai("14a. 45/100 = 0,45", egal(F(45, 100), D("0.45")));
  dit(14, `$${brut(45, 100)} = ${TD(F(45, 100))}$`);
  dit(14, `$${TD(D("0.8"))} = ${brut(8, 10)}$`);
  vrai("14c. 3/5 = 6/10 = 0,6", egal(F(3, 5), F(6, 10)) && egal(F(6, 10), D("0.6")));
  dit(14, `$${brut(3, 5)} = ${brut(6, 10)} = ${TD(F(6, 10))}$`);
  vrai("14d. 2,07 = 207/100", egal(D("2.07"), F(207, 100)));
  dit(14, `$${TD(D("2.07"))} = ${brut(207, 100)}$`);
  dit(14, `Réponse : a) $${TD(F(45, 100))}$ ; b) $${brut(8, 10)}$ ; c) $${brut(6, 10)} = ${TD(F(6, 10))}$ ; d) $${brut(207, 100)}$.`);
  const [, tab] = dessin("table", 14);
  tab.forEach((l) => vrai(`14. tableau ${l[0]}`, egal(deLabel(l[0]), D(l[1])) && l[2].startsWith(l[0].split("/")[0] + " ") && l[2].endsWith(l[0].split("/")[1] === "10" ? "dixièmes" : "centièmes")));
});
essai("15", () => {
  const [a, b] = couples(lignes(15)[1]);
  vrai("15a. 1/8 < 1/6", inf(F(...a), F(...b)));
  dit(15, `Donc $${brut(...a)} < ${brut(...b)}$`);
  vrai("15b. 0,7 = 7/10, 7/100 = 0,07", egal(D("0.7"), F(7, 10)) && egal(F(7, 100), D("0.07")));
  dit(15, `c'est $${TD(F(7, 100))}$`);
  vrai("15c. 3/2 = 1 + 1/2 > 1", egal(F(3, 2), F(3, 2)) && inf(F(1), F(3, 2)));
  dit(15, `$${brut(3, 2)} = 1 + ${brut(1, 2)}$`);
  dit(15, `Réponse : a) $${brut(...a)} < ${brut(...b)}$ ; b) $0{,}7 = ${brut(7, 10)}$ ; c) $${brut(3, 2)} > 1$.`);
  const [x, y] = dessin("comparer", 15);
  vrai("15. les barres : 1/8 et 1/6", x.join() === a.join() && y.join() === b.join());
});
essai("16", () => {
  const [A, C] = couples(lignes(16)[0]);
  const g = { A: F(...A), B: F(1, 2), C: F(...C) };
  const dixiemes = Object.fromEntries(Object.entries(g).map(([k, q]) => [k, Number((q.n * 10n) / q.d)]));
  vrai("16. tout tombe en dixièmes", Object.values(g).every((q) => 10n % q.d === 0n));
  dit(16, `A : $${brut(...A)} = ${TD(g.A)}$ L`);
  dit(16, `B : à moitié, $${brut(1, 2)} = ${brut(dixiemes.B, 10)} = ${TD(g.B)}$ L`);
  dit(16, `C : $${brut(...C)} = ${brut(dixiemes.C, 10)} = ${TD(g.C)}$ L`);
  const ordre = Object.keys(g).sort((x, y) => (inf(g[y], g[x]) ? -1 : 1));
  dit(16, `A, puis C, puis B`);
  vrai("16b. ordre A, C, B", ordre.join() === "A,C,B");
  const manque = 10 - dixiemes.A;
  dit(16, `$10 - ${dixiemes.A} = ${manque}$ dixièmes : $${brut(manque, 10)}$ L`);
  dit(16, `Réponse : a) $${TD(g.A)}$ L ; $${TD(g.B)}$ L ; $${TD(g.C)}$ L ; b) A, C, B ; c) $${brut(manque, 10)}$ L.`);
  const [liste] = dessin("barres", 16);
  vrai("16. les barres, de la plus remplie à la moins remplie", liste.every((b, i) => b.d === 10 && b.label.startsWith(ordre[i]) && b.parts[0] === dixiemes[ordre[i]] && egal(deLabel(b.label), g[ordre[i]])));
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const n = [...lignes(17)[0].matchAll(/\$(\d+)\$/g)].map((m) => Number(m[1]));
  const [tot, ines, hugo, lina] = n;
  vrai("17. tout le monde vote", ines + hugo + lina === tot);
  const q = [ines, hugo, lina].map((x) => F(x, tot));
  dit(17, `Inès : $${brut(ines, tot)}$ ; Hugo : $${brut(hugo, tot)}$ ; Lina : $${brut(lina, tot)}$.`);
  const k = 100 / tot;
  vrai("17b. 25 × 4 = 100", Number.isInteger(k));
  [ines, hugo, lina].forEach((x, i) => dit(17, `$${brut(x, tot)} = ${brut(x * k, 100)} = ${TD(q[i])}$`));
  vrai("17c. moins de la moitié", inf(q[0], F(1, 2)));
  vrai("17d. Hugo + Lina > Inès", hugo + lina > ines);
  dit(17, `$${hugo} + ${lina} = ${hugo + lina}$ voix, contre $${ines}$`);
  dit(17, `Réponse : a) $${brut(ines, tot)}$, $${brut(hugo, tot)}$, $${brut(lina, tot)}$ ; b) $${q.map(TD).join("$ ; $")}$ ; c) non ; d) oui, $${hugo + lina}$ voix contre $${ines}$.`);
  const [li, co, groupes] = dessin("grille", 17);
  vrai("17. la grille : 25 cases, les trois élèves", li * co === tot && groupes.map((g) => g.n).join() === [ines, hugo, lina].join() && groupes.map((g) => g.nom).join() === "Inès,Hugo,Lina");
});
essai("18", () => {
  const [pont, cascade] = couples(lignes(18)[0]).map((x) => F(...x));
  const refuge = D("2.5");
  const quarts = (q) => Number((q.n * 4n) / q.d);
  vrai("18. tout tombe en quarts", [pont, cascade, refuge].every((q) => 4n % q.d === 0n));
  dit(18, `$${brut(quarts(cascade), 4)} = ${Math.floor(quarts(cascade) / 4)} + ${brut(quarts(cascade) % 4, 4)}$`);
  dit(18, `$${brut(quarts(cascade), 4)} = ${TD(cascade)}$ km`);
  dit(18, `$${brut(quarts(refuge), 4)}$ km`);
  vrai("18c. pont < cascade < refuge", inf(pont, cascade) && inf(cascade, refuge));
  dit(18, `le pont à $${quarts(pont)}$, la cascade à $${quarts(cascade)}$, le refuge à $${quarts(refuge)}$`);
  const ecart = quarts(refuge) - quarts(cascade);
  dit(18, `$${quarts(refuge)} - ${quarts(cascade)} = ${ecart}$`);
  dit(18, `Réponse : a) $${Math.floor(quarts(cascade) / 4)} + ${brut(quarts(cascade) % 4, 4)} = ${TD(cascade)}$ km ; b) $${brut(quarts(refuge), 4)}$ km ; c) le pont, la cascade, le refuge ; d) $${ecart}$ quart de kilomètre.`);
  const [, max, pas, points] = dessin("droiteRel", 18);
  vrai("18. la droite : 3 km en quarts", max === 3 && pas === 0.25);
  vrai("18. les lieux à leur place", pres(points.find((p) => p.label === "pont").value, pont) && pres(points.find((p) => p.label === "cascade").value, cascade) && pres(points.find((p) => p.label === "refuge").value, refuge));
});
essai("19", () => {
  const [tot, bleu, jaune] = [...lignes(19)[0].matchAll(/\$(\d+)\$/g)].map((m) => Number(m[1]));
  const blanc = tot - bleu - jaune;
  dit(19, `$${tot} - ${bleu} - ${jaune} = ${blanc}$ carreaux blancs`);
  dit(19, `Bleu : $${brut(bleu, tot)}$ ; jaune : $${brut(jaune, tot)}$ ; blanc : $${brut(blanc, tot)}$.`);
  const qb = F(bleu, tot), qj = F(jaune, tot);
  vrai("19c. 8/24 = 1/3, 6/24 = 1/4", qb.n === 1n && qb.d === 3n && qj.n === 1n && qj.d === 4n);
  dit(19, `$${brut(1, 3)} = ${brut(`1 \\times ${bleu}`, `3 \\times ${bleu}`)} = ${brut(bleu, tot)}$`);
  dit(19, `$${brut(1, 4)} = ${brut(`1 \\times ${jaune}`, `4 \\times ${jaune}`)} = ${brut(jaune, tot)}$`);
  vrai("19d. blanc < la moitié", blanc < tot / 2);
  dit(19, `La moitié de $${tot}$, c'est $${tot / 2}$. Or $${blanc} < ${tot / 2}$`);
  dit(19, `Réponse : a) $${blanc}$ ; b) $${brut(bleu, tot)}$, $${brut(jaune, tot)}$, $${brut(blanc, tot)}$ ; c) $${texFrac(qb)}$ et $${texFrac(qj)}$ ; d) moins de la moitié.`);
  const [li, co, groupes, reste] = dessin("grille", 19, "figure");
  vrai("19. la grille : 24 carreaux, 8 bleus, 6 jaunes, le reste blanc", li * co === tot && groupes[0].n === bleu && groupes[1].n === jaune && groupes[0].nom === "bleu" && groupes[1].nom === "jaune" && reste === "blanc");
});
essai("20", () => {
  const [bas, haut] = couples(e(20)).slice(0, 2).map((x) => F(...x));
  const possibles = Array.from({ length: 9 }, (_, i) => i + 1).filter((k) => inf(bas, F(k, 10)) && inf(F(k, 10), haut));
  dit(20, `Il vaut donc $${possibles.slice(0, -1).join("$, $")}$ ou $${possibles.at(-1)}$.`);
  const pairs = possibles.filter((k) => k % 2 === 0);
  dit(20, `il reste $${pairs.join("$ ou $")}$`);
  const sol = pairs.filter((k) => k > 7);
  vrai(`20. une seule fraction (${sol})`, sol.length === 1);
  const s = F(sol[0], 10);
  dit(20, `Je suis $${brut(sol[0], 10)}$.`);
  dit(20, `$${brut(sol[0], 10)} = ${brut(Number(s.n), Number(s.d))}$`);
  vrai("20c. dénominateur 5", s.d === 5n);
  dit(20, `Réponse : b) $${brut(sol[0], 10)}$ ; c) $${TD(s)}$ et $${texFrac(s)}$.`);
  dit(20, `$${brut(1, 2)} = ${brut(5, 10)}$`);
  const [, , , points] = dessin("droiteRel", 20);
  vrai("20. la droite : 1/2, moi, 9/10", pres(points[0].value, bas) && pres(points[1].value, s) && pres(points[2].value, haut) && points[1].label === "moi");
});

verif("contrôle de l'outil : 1/3 + 1/6 vaut 1/2 en flottant", 1 / 3 + 1 / 6, 0.5);

/* ═══ Les légendes des grilles (un nom tous les 72) ne se touchent pas ═══ */
for (const { args } of f.appels("grille").filter((a) => a.args)) {
  const [, , groupes, reste = ""] = args;
  const noms = [...groupes.map((g) => g.nom), reste].filter(Boolean);
  vrai(`légende « ${noms.join(", ")} » : 6 signes au plus, 4 noms au plus`, noms.every((n) => n.length * 8.5 < 56) && noms.length <= 4);
}
/* ═══ Les noms des barres tiennent à gauche (10 signes au plus) ═══ */
for (const { args } of f.appels("barres").filter((a) => a.args)) for (const b of args[0]) vrai(`barres : « ${b.label} » ≤ 10 signes`, b.label.length <= 10);

f.fin();
