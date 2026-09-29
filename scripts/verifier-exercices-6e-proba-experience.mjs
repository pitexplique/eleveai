// Recalcul indépendant de la feuille « Premiers pas en probabilités » de 6e
// (30/09/2026) : lib/fiches-exercices/maths-6e-proba-experience.tsx.
//
// ⭐ L'AUTRE CHEMIN : chaque « chances sur » est retrouvé en ÉNUMÉRANT le
// matériel DESSINÉ — les billes une à une, les secteurs de la roue (poids), les
// faces du patron, les faces surlignées du dé —, chaque événement est réévalué
// (certain : toutes les issues ; impossible : aucune ; sinon possible), et les
// points de l'échelle sont comparés aux chances exactes. Puis chaque résultat
// est cherché dans le corrigé.
// Règles communes : scripts/verifier-exercices-5e-commun.mjs (classe 6e).
// Usage : node scripts/verifier-exercices-6e-proba-experience.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-proba-experience.tsx", "proba_experience", ["roue", "echelle", "patron", "barres", "grille"], "6e");
const { e, vrai, dit, enonceDit, dessin, dessins, appels, essai, constantes } = f;

const somme = (xs) => xs.reduce((a, b) => a + b, 0);
const memes = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const nombresDe = (texte) => [...texte.matchAll(/\$(\d+)\$/g)].map((m) => Number(m[1]));
const { ROUGE, BLEU, VERT, JAUNE, NOIR, GRIS, ORANGE } = constantes;
/** Les issues d'une roue : une par unité de poids (secteurs égaux). */
const issuesRoue = (segs) => segs.flatMap((s) => Array(s.poids).fill(s.label));
const nb = (xs, x) => xs.filter((y) => y === x).length;
const statut = (issues, cond) => {
  const k = issues.filter(cond).length;
  return k === 0 ? "impossible" : k === issues.length ? "certain" : "possible";
};

/* ═══ Rendu des aides locales ═══ */
for (const { args } of appels("echelle").filter((a) => a.args)) {
  const pts = [...args[0]].sort((a, b) => a.valeur - b.valeur);
  const x = (v) => 24 + v * 252;
  pts.forEach((p, i) => {
    vrai(`echelle : « ${p.label} » dans le cadre`, x(p.valeur) - p.label.length * 4.6 >= 0 && x(p.valeur) + p.label.length * 4.6 <= 300);
    const q = pts[i + 2];
    if (q) vrai(`echelle : « ${p.label} » et « ${q.label} » (même hauteur) ne se touchent pas`, x(q.valeur) - x(p.valeur) >= (p.label.length + q.label.length) * 4.6 + 4);
  });
}
for (const { args } of appels("barres").filter((a) => a.args)) {
  const slot = 274 / args[0].length;
  for (const d of args[0]) vrai(`barres : « ${d.label} » tient dans sa colonne`, d.label.length * 8.2 <= slot - 4);
}
for (const { args } of appels("roue").filter((a) => a.args)) vrai("roue : douze secteurs au plus, étiquettes de 2 signes au plus", issuesRoue(args[0]).length <= 12 && args[0].every((s) => s.label.length <= 2));
for (const { args } of appels("grille").filter((a) => a.args)) vrai(`grille (${args[0][0]}) : trois colonnes au plus`, args[0].length <= 3 && args[1].every((l) => l.length === args[0].length));

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const [segs] = dessin("roue", 1, "figure");
  const I = issuesRoue(segs).map(Number);
  enonceDit(1, `Elle a $${I.length}$ secteurs égaux`);
  const s = [statut(I, (x) => x % 2 === 1), statut(I, (x) => x === 4), statut(I, (x) => x === 7), statut(I, (x) => x < 20), statut(I, (x) => x > 10)];
  dit(1, `Réponse : a) ${s[0]} ; b) ${s[1]} ; c) ${s[2]} ; d) ${s[3]} ; e) ${s[4]}.`);
  dit(1, `Je lis les $${I.length}$ nombres de la roue : ${I.map((x) => `$${x}$`).join(", ")}`);
});
essai("2", () => {
  const [b] = dessin("billes", 2, "schema");
  const [r, bl] = nombresDe(e(2).split("\\n")[3]);
  vrai("2. le sac dessiné : 3 rouges, 2 bleues", nb(b.map((x) => x.couleur), ROUGE) === r && nb(b.map((x) => x.couleur), BLEU) === bl);
  dit(2, `Il y a $${r} + ${bl} = ${b.length}$ billes, donc $${b.length}$ issues`);
  dit(2, `Réponse : a) $2$ ; b) $3$ ; c) $${b.length}$.`);
});
essai("3", () => {
  const [b] = dessin("billes", 3, "schema");
  const c = b.map((x) => x.couleur);
  const [v, j, n] = nombresDe(e(3).split("\\n")[0]);
  vrai("3. le sac dessiné", nb(c, VERT) === v && nb(c, JAUNE) === j && nb(c, NOIR) === n);
  vrai("3. vert le plus, noir le moins", v > j && j > n);
  dit(3, `$2 \\times ${j} = ${2 * j}$`);
  vrai("3. deux fois plus", v === 2 * j);
});
essai("4", () => {
  const [pts] = dessin("echelle", 4, "schema");
  const exact = { a: 1, b: 0, c: 0.5, d: 1 / 6, e: 5 / 6 };
  for (const p of pts) vrai(`4. « ${p.label} » placé près de ${exact[p.label].toFixed(2)}`, Math.abs(p.valeur - exact[p.label]) <= 0.02);
  const ok = [2, 3, 4, 5, 6];
  dit(4, `$5$ faces sur $6$ conviennent : ${ok.slice(0, 4).map((x) => `$${x}$`).join(", ")} et $6$`);
  const ordre = [...pts].sort((x, y) => x.valeur - y.valeur).map((p) => p.label);
  vrai("4. la réponse suit l'ordre de l'échelle", memes(ordre, ["b", "d", "c", "e", "a"]));
});
essai("5", () => {
  const [segs] = dessin("roue", 5, "figure");
  const I = issuesRoue(segs);
  vrai("5. bleu = moitié, orange = vert = quart", nb(I, "B") * 2 === I.length && nb(I, "O") * 4 === I.length && nb(I, "V") === nb(I, "O"));
  vrai("5. bleu pas certain", statut(I, (x) => x === "B") === "possible");
});
essai("6", () => {
  const [faces] = dessin("de", 6, "schema");
  const au4 = [1, 2, 3, 4, 5, 6].filter((x) => x >= 4);
  vrai("6. le dé surligne 4, 5, 6", memes(faces, au4));
  dit(6, `Les faces $4$, $5$ et $6$`);
  dit(6, `$${au4.length}$ faces conviennent, sur $6$ : $${au4.length}$ chances sur $6$`);
  dit(6, `$\\dfrac{${au4.length}}{6}$`);
  vrai("6. la moitié", au4.length * 2 === 6);
});
essai("7", () => {
  const [, lignes] = dessin("grille", 7, "schema");
  vrai("7. le tableau : oui, non, oui, oui, non", memes(lignes.map((l) => l[1]), ["oui", "non", "oui", "oui", "non"]));
  dit(7, `$12 \\times 5 = ${12 * 5}$`);
});
essai("8", () => {
  const [b] = dessin("billes", 8, "schema");
  const c = b.map((x) => x.couleur);
  const [r, bl] = nombresDe(e(8));
  vrai("8. le sac dessiné", nb(c, ROUGE) === r && nb(c, BLEU) === bl);
  dit(8, `$${r} + ${bl} = ${r + bl}$ billes, donc $${r + bl}$ issues`);
  dit(8, `$${r}$ chance sur $${r + bl}$`);
  dit(8, `$${bl}$ chances sur $${r + bl}$`);
  vrai("8. pas une chance sur deux", r * 2 !== r + bl);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const [b] = dessin("billes", 9, "schema");
  const n = b.map((x) => Number(x.label));
  vrai("9. les cartes 1 à 12", memes(n, Array.from({ length: 12 }, (_, i) => i + 1)));
  const deux = b.filter((x) => x.label.length === 2).map((x) => Number(x.label));
  vrai("9. en orange : les nombres à deux chiffres", memes(b.filter((x) => x.couleur === ORANGE).map((x) => Number(x.label)), deux));
  dit(9, `${deux.map((x) => `$${x}$`).join(", ").replace(/, (\$\d+\$)$/, " et $1")}. Cela fait $${deux.length}$ cartes`);
  const m4 = n.filter((x) => x % 4 === 0);
  dit(9, `Les multiples de $4$ : ${m4.map((x) => `$${x}$`).join(", ").replace(/, (\$\d+\$)$/, " et $1")}`);
  vrai("9. d) certain", statut(n, (x) => x < 13) === "certain");
});
essai("10", () => {
  const [A, B] = dessins("billes", 10).map((d) => d.args[0].map((x) => x.couleur));
  const [rA, rB] = [nb(A, ROUGE), nb(B, ROUGE)];
  dit(10, `Sac A : $${rA}$ rouges sur $${A.length}$ billes. $${rA}$ chances sur $${A.length}$`);
  dit(10, `$${A.length} \\div 2 = ${A.length / 2}$, et $${rA}$ est plus grand que $${A.length / 2}$`);
  dit(10, `Sac B : $${rB}$ rouges sur $${B.length}$ billes. $${rB}$ chances sur $${B.length}$`);
  vrai("10. A : plus de la moitié ; B : la moitié ; B a plus de rouges", rA * 2 > A.length && rB * 2 === B.length && rB > rA);
});
essai("11", () => {
  const [segs] = dessin("roue", 11, "figure");
  const I = issuesRoue(segs);
  const g = nb(I, "G");
  enonceDit(11, `$${I.length}$ secteurs égaux`);
  dit(11, `Je compte les secteurs G, en faisant le tour : $${g}$. Il y a $${g}$ chances sur $${I.length}$`);
  dit(11, `$${I.length} - ${g} = ${I.length - g}$ secteurs P`);
  const [pts] = dessin("echelle", 11, "schema");
  vrai("11. l'échelle : gagner 0,7, perdre 0,3", pts.find((p) => p.label === "gagner").valeur === g / I.length && pts.find((p) => p.label === "perdre").valeur === (I.length - g) / I.length);
});
essai("12", () => {
  const jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
  vrai("12. tous les jours contiennent un i", statut(jours, (j) => j.includes("i")) === "certain");
  vrai("12. aucun ne commence par x", statut(jours, (j) => j.startsWith("x")) === "impossible");
  const [, lignes] = dessin("grille", 12, "schema");
  vrai("12. le tableau : sept jours, tous « oui »", memes(lignes.map((l) => l[0]), jours) && lignes.every((l) => l[1] === (l[0].includes("i") ? "oui" : "non")));
  dit(12, `: $${jours.length}$ issues`);
  dit(12, "Cela fait $2$ chances sur $7$");
});
essai("13", () => {
  const [faces] = dessin("patron", 13, "figure");
  const [a, b, c] = ["A", "B", "C"].map((l) => nb(faces, l));
  dit(13, `La lettre B est sur $${b}$ faces`);
  vrai("13. B le plus", b > a && b > c);
  dit(13, `La lettre A est sur $${a}$ faces : $${a}$ chances sur $6$`);
  dit(13, `$${a} + ${b} + ${c} = 6$ faces`);
  vrai("13. D impossible", !faces.includes("D"));
});
essai("14", () => {
  const [pts] = dessin("echelle", 14, "schema");
  const v = Object.fromEntries(pts.map((p) => [p.label, p.valeur]));
  vrai("14. les cinq nombres de l'énoncé, un chacun", memes(Object.values(v).sort(), [0, 0.1, 0.5, 0.9, 1]));
  const T = (x) => String(x).replace(".", "{,}");
  dit(14, `Réponse : a) $${T(v.a)}$ ; b) $${T(v.b)}$ ; c) $${T(v.c)}$ ; d) $${T(v.d)}$ ; e) $${T(v.e)}$.`);
  vrai("14. presque sûr 0,9 ; très peu probable 0,1", v.a === 0.9 && v.e === 0.1 && v.b === 0 && v.d === 1);
});
essai("15", () => {
  const [A, B] = dessins("roue", 15).map((d) => issuesRoue(d.args[0]));
  dit(15, `Roue A : $${nb(A, "G")}$ secteurs G sur $${A.length}$`);
  dit(15, `Roue B : $${nb(B, "G")}$ secteur G sur $${B.length}$`);
  vrai("15. mêmes chances", nb(A, "G") * B.length === nb(B, "G") * A.length);
  vrai("15. la roue A = deux fois la roue B", memes(A, [...B, ...B]) && nb(A, "G") > nb(B, "G"));
  dit(15, `${B.join("-")}, puis encore ${B.join("-")}`);
});
essai("16", () => {
  const [b] = dessin("billes", 16, "schema");
  const c = b.map((x) => x.couleur);
  vrai("16. le sac : 10 billes, plus de rouges, au moins une bleue, aucune verte", b.length === 10 && nb(c, ROUGE) > nb(c, BLEU) && nb(c, BLEU) >= 1 && nb(c, VERT) === 0);
  dit(16, `Par exemple : $${nb(c, ROUGE)}$ rouges et $${nb(c, BLEU)}$ bleues`);
  dit(16, "$10 \\div 2 = 5$ rouges");
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const tickets = Array.from({ length: 50 }, (_, i) => i + 1);
  const g = tickets.filter((x) => x % 10 === 0);
  dit(17, `${g.map((x) => `$${x}$`).join(", ")}. Il y a $${g.length}$ tickets gagnants`);
  dit(17, `$${g.length}$ chances sur $50$`);
  dit(17, `$50 - ${g.length} = ${50 - g.length}$ chances sur $50$`);
  const [pts] = dessin("echelle", 17, "schema");
  vrai("17. l'échelle : gagner 5/50, perdre 45/50", pts.find((p) => p.label === "gagner").valeur === g.length / 50 && pts.find((p) => p.label === "perdre").valeur === (50 - g.length) / 50);
  vrai("17. le 25 perd", !g.includes(25));
});
essai("18", () => {
  const D = [1, 2, 3, 4, 5, 6];
  const [emma1] = dessin("de", 18, "schema");
  vrai("18. le dé surligne les faces d'Emma (règle 1)", memes(emma1, [1, 2]));
  const noe1 = D.filter((x) => !emma1.includes(x));
  dit(18, `Noé a les $${noe1.length}$ autres : ${noe1.map((x) => `$${x}$`).join(", ")}`);
  const pairs = D.filter((x) => x % 2 === 0), impairs = D.filter((x) => x % 2 === 1);
  dit(18, `Emma a $${pairs.length}$ faces, ${pairs.map((x) => `$${x}$`).join(", ")}. Noé a $${impairs.length}$ faces, ${impairs.map((x) => `$${x}$`).join(", ")}`);
  dit(18, `Règle 1 : $${emma1.length}$ contre $${noe1.length}$`);
  vrai("18. règles 2 et 3 justes, 1 injuste", emma1.length !== noe1.length && pairs.length === impairs.length);
  dit(18, "Réponse : b) les règles 2 et 3.");
});
essai("19", () => {
  const [data] = dessin("barres", 19, "figure");
  const v = data.map((d) => d.value), tot = somme(v);
  enonceDit(19, `contient $${tot}$ bulbes`);
  const max = data.find((d) => d.value === Math.max(...v));
  dit(19, `la tulipe : $${max.value}$ bulbes. Donc $${max.value}$ chances sur $${tot}$`);
  dit(19, `$${tot} \\div 2 = ${tot / 2}$`);
  vrai("19. la tulipe : une chance sur deux", max.label === "tulipe" && max.value * 2 === tot);
  const asc = [...data].sort((a, b) => a.value - b.value);
  dit(19, asc.map((d) => `${d.label[0].toUpperCase()}${d.label.slice(1)} ($${d.value}$)`).join(", ").replace(/^(\w)/, (m) => m).replace("Jonquille", "jonquille").replace("Tulipe", "tulipe"));
  dit(19, `$${v.join(" + ")} = ${tot}$ bulbes`);
});
essai("20", () => {
  const [segs] = dessin("roue", 20, "schema");
  const I = issuesRoue(segs);
  const [p, b, r] = ["P", "B", "R"].map((x) => nb(I, x));
  enonceDit(20, `roue de $${I.length}$ secteurs égaux`);
  vrai("20. la roue suit les trois règles", p >= 1 && p < b && p < r && b < r && r < I.length);
  dit(20, `Je mets $${p}$ secteur P`);
  dit(20, `je mets $${b}$ secteurs B`);
  dit(20, `Il reste $${I.length} - ${p} - ${b} = ${r}$ secteurs R`);
  dit(20, `Peluche : $${p}$ chance sur $${I.length}$. Bonbon : $${b}$ chances sur $${I.length}$. Rien : $${r}$ chances sur $${I.length}$`);
});

f.fin();
