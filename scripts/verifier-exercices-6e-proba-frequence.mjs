// Recalcul indépendant de la feuille « Fréquences observées » de 6e
// (30/09/2026) : lib/fiches-exercices/maths-6e-proba-frequence.tsx.
//
// ⭐ L'AUTRE CHEMIN : les lancers (F P P F…) sont recomptés un par un dans
// l'ÉNONCÉ ; les résultats des barres, des tableaux, des roues et des sacs sont
// RELUS dans les appels de dessin ; chaque fréquence est refaite en fraction
// EXACTE puis en décimal, chaque probabilité en énumérant le matériel, chaque
// nombre attendu en partageant les essais, chaque écart par soustraction. Puis
// chaque résultat est cherché dans le corrigé.
// Règles communes : scripts/verifier-exercices-5e-commun.mjs (classe 6e).
// Usage : node scripts/verifier-exercices-6e-proba-frequence.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-proba-frequence.tsx", "proba_frequence", ["roue", "echelle", "barres", "pointsRelies", "grille", "pieces"], "6e");
const { e, vrai, verif, dit, enonceDit, dessin, appels, essai, constantes } = f;

const somme = (xs) => xs.reduce((a, b) => a + b, 0);
const memes = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const r9 = (x) => Math.round(x * 1e9) / 1e9;
const T = (x) => t(r9(x)); // 0.65 → « 0{,}65 », 1000 → « 1\,000 »
const nombresDe = (texte) => [...texte.matchAll(/\$(\d+(?:\\,\d{3})*(?:\{,\}\d+)?)\$/g)].map((m) => Number(m[1].replace(/\\,/g, "").replace("{,}", ".")));
const nb = (xs, x) => xs.filter((y) => y === x).length;
const issuesRoue = (segs) => segs.flatMap((s) => Array(s.poids).fill(s.label));
const { ROUGE, BLEU, VERT } = constantes;

/* ═══ Rendu des aides locales ═══ */
for (const { args } of appels("echelle").filter((a) => a.args)) {
  const pts = [...args[0]].sort((a, b) => a.valeur - b.valeur);
  const x = (v) => 24 + v * 252;
  pts.forEach((p, i) => {
    vrai(`echelle : « ${p.label} » dans le cadre`, x(p.valeur) - p.label.length * 4.6 >= 0 && x(p.valeur) + p.label.length * 4.6 <= 300);
    const q = pts[i + 2];
    if (q) vrai(`echelle : « ${p.label} » et « ${q.label} » ne se touchent pas`, x(q.valeur) - x(p.valeur) >= (p.label.length + q.label.length) * 4.6 + 4);
  });
}
for (const { args } of appels("barres").filter((a) => a.args)) {
  const slot = 274 / args[0].length;
  for (const d of args[0]) vrai(`barres : « ${d.label} » tient dans sa colonne`, d.label.length * 8.2 <= slot - 4);
}
for (const { args } of appels("pointsRelies").filter((a) => a.args)) {
  const [et, v, pas] = args;
  for (const l of et) vrai(`points reliés : « ${l} » tient`, l.length * 8.2 <= 242 / et.length - 4);
  vrai("points reliés : 7 graduations au plus", Math.ceil(Math.max(...v) / pas) <= 7);
}
for (const { args } of appels("pieces").filter((a) => a.args)) vrai("pièces : cinq au plus", args[0].length <= 5);
for (const { args } of appels("grille").filter((a) => a.args)) vrai(`grille (${args[0][0]}) : trois colonnes au plus`, args[0].length <= 3 && args[1].every((l) => l.length === args[0].length));

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const L = e(1).split("\\n").find((l) => /^([PF] )+[PF]$/.test(l)).split(" ");
  const [p, fa] = [nb(L, "P"), nb(L, "F")];
  enonceDit(1, `pièce $${L.length}$ fois`);
  const [, lignes] = dessin("grille", 1, "schema");
  vrai("1. le tableau : traits et effectifs", Number(lignes[0][2]) === p && lignes[0][1].replace(/ /g, "").length === p && Number(lignes[1][2]) === fa && lignes[1][1].replace(/ /g, "").length === fa && Number(lignes[2][2]) === L.length);
  dit(1, `Pile : $${p}$ fois. Face : $${fa}$ fois`);
  dit(1, `$${p} + ${fa} = ${L.length}$ lancers`);
  dit(1, `$\\dfrac{${p}}{${L.length}} = \\dfrac{${(p * 100) / L.length}}{100} = ${T(p / L.length)}$`);
});
essai("2", () => {
  const [data] = dessin("barres", 2, "figure");
  const v = data.map((d) => d.value), tot = somme(v);
  enonceDit(2, `dé $${tot}$ fois`);
  dit(2, `$${v.join(" + ")} = ${tot}$`);
  const q = data.find((d) => d.label === "4").value;
  dit(2, `La barre du $4$ porte $${q}$`);
  dit(2, `$\\dfrac{${q}}{${tot}}$`);
  dit(2, `$${q} \\div ${tot} = ${T(q / tot)}$`);
  dit(2, `$${tot} \\div ${q} = ${T(tot / q)}$`);
});
essai("3", () => {
  const [n, a] = nombresDe(e(3).split("\\n")[0]);
  const b = n - a;
  dit(3, `$\\dfrac{${a}}{${n}} = ${T(a / n)}$, soit $${(100 * a) / n}$ %`);
  dit(3, `$${n} - ${a} = ${b}$ fois`);
  dit(3, `$\\dfrac{${b}}{${n}} = ${T(b / n)}$, soit $${(100 * b) / n}$ %`);
  const [data] = dessin("barres", 3, "schema");
  vrai("3. le schéma", memes(data.map((d) => d.value), [a, b]));
});
essai("4", () => {
  const [segs] = dessin("roue", 4, "schema");
  const I = issuesRoue(segs);
  const [k, n] = nombresDe(e(4));
  vrai("4. la roue : 4 secteurs, 1 vert", I.length === k && nb(I, "V") === 1);
  dit(4, `$${n} \\div ${I.length} = ${n / I.length}$ verts`);
});
essai("5", () => {
  const [p, fA, nB, fB] = nombresDe(e(5).split("\\n")[0]).filter((x) => x !== 10);
  dit(5, `Amir : $${T(fA)} - ${T(p)} = ${T(fA - p)}$`);
  dit(5, `Bella : $${T(fB)} - ${T(p)} = ${T(fB - p)}$`);
  vrai("5. Bella plus proche", Math.abs(fB - p) < Math.abs(fA - p) && nB === 1000);
  const [pts] = dessin("echelle", 5, "schema");
  vrai("5. l'échelle porte les deux fréquences", pts.find((x) => x.label === "Amir").valeur === fA && pts.find((x) => x.label === "Bella").valeur === fB);
});
essai("6", () => {
  const [b] = dessin("billes", 6, "schema");
  const c = b.map((x) => x.couleur);
  const [r, bl, n, k] = nombresDe(e(6).split("\\n")[0]);
  vrai("6. le sac dessiné", nb(c, ROUGE) === r && nb(c, BLEU) === bl);
  const tot = r + bl;
  dit(6, `$${r}$ bille rouge sur $${tot}$ billes : $\\dfrac{${r}}{${tot}}$, soit $${T(r / tot)}$`);
  dit(6, `$\\dfrac{${k}}{${n}} = \\dfrac{${(k * 100) / n}}{100} = ${T(k / n)}$`);
  dit(6, `$${n} \\div ${tot} = ${n / tot}$ rouges`);
  dit(6, `On en a eu $${k}$ : $${k - n / tot}$ de plus`);
});
essai("7", () => {
  const vals = { a: 0.4, b: 1.3, c: 0, d: 1, e: 25 / 20 };
  const imp = Object.entries(vals).filter(([, v]) => v < 0 || v > 1).map(([k]) => k);
  vrai("7. impossibles : b et e", memes(imp, ["b", "e"]));
  dit(7, "Réponse : impossibles : b) et e).");
  const [pts] = dessin("echelle", 7, "schema");
  vrai("7. l'échelle ne porte que les possibles", memes(pts.map((p) => p.label).sort(), ["a", "c", "d"]) && pts.every((p) => p.valeur === vals[p.label]));
});
essai("8", () => {
  const [fs] = dessin("pieces", 8, "schema");
  enonceDit(8, `tombe $${nb(fs, "P")}$ fois de suite sur pile`);
  vrai("8. quatre piles puis le prochain lancer", memes(fs, ["P", "P", "P", "P", "?"]));
  dit(8, "pile et face ont chacun $1$ chance sur $2$");
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const issues = ["P", "F"].flatMap((a) => ["P", "F"].map((b) => a + b));
  dit(9, `: ${issues.join(", ")}. Il y a $${issues.length}$ issues`);
  const [, lignes] = dessin("grille", 9, "schema");
  vrai("9. le tableau : les quatre issues, PP seule « oui »", memes(lignes.map((l) => l[0] + l[1]), issues) && memes(lignes.map((l) => l[2]), issues.map((x) => (x === "PP" ? "oui" : "non"))));
  const [n, k] = nombresDe(e(9).split("\\n")[3]);
  dit(9, `$\\dfrac{${k}}{${n}} = \\dfrac{3}{10} = ${T(k / n)}$`);
  vrai("9. 12/40 = 3/10", k * 10 === 3 * n);
  dit(9, `$${n} \\div 4 = ${n / 4}$. On a eu $${k}$ : $${k - n / 4}$ de plus`);
});
essai("10", () => {
  const [, lignes] = dessin("grille", 10, "figure");
  const L = lignes.map(([n, p]) => [Number(n.replace(/ /g, "")), Number(p)]);
  const fq = L.map(([n, p]) => p / n);
  dit(10, `$\\dfrac{${L[0][1]}}{${L[0][0]}} = ${T(fq[0])}$`);
  dit(10, `$\\dfrac{${L[1][1]}}{${L[1][0]}} = \\dfrac{${(L[1][1] * 100) / L[1][0]}}{100} = ${T(fq[1])}$`);
  dit(10, `$\\dfrac{${L[2][1]}}{${L[2][0]}} = \\dfrac{${(L[2][1] * 100) / L[2][0]}}{100} = ${T(fq[2])}$`);
  dit(10, `$\\dfrac{${L[3][1]}}{${T(L[3][0])}} = ${T(fq[3])}$`);
  const ec = fq.map((x) => r9(Math.abs(x - 0.5)));
  dit(10, `Les écarts à $0{,}5$ : ${ec.map((x) => `$${T(x)}$`).join(", puis ")}`);
  vrai("10. l'écart décroît à chaque ligne", ec.every((x, i) => i === 0 || x < ec[i - 1]));
  vrai("10. la fréquence ne monte pas toujours", fq[1] < fq[0] && fq[2] > fq[1]);
  const [et, v] = dessin("pointsRelies", 10, "schema");
  vrai("10. les points : les fréquences en %", memes(v, fq.map((x) => r9(x * 100))) && memes(et, L.map(([n]) => String(n))));
});
essai("11", () => {
  const [segs] = dessin("roue", 11, "schema");
  const I = issuesRoue(segs);
  const [k, v, n, obs] = nombresDe(e(11).split("\\n")[0]);
  vrai("11. la roue : 5 secteurs, 1 vert", I.length === k && nb(I, "V") === v);
  dit(11, `$\\dfrac{1}{${k}}$, soit $${T(1 / k)}$`);
  dit(11, `$${n} \\div ${k} = ${n / k}$ verts`);
  dit(11, `On en a eu $${obs}$ : $${obs - n / k}$ de plus`);
});
essai("12", () => {
  const [data] = dessin("barres", 12, "figure");
  const [r, b] = data.map((d) => d.value), n = r + b;
  enonceDit(12, `résultats de $${n}$ tirages`);
  dit(12, `$${r} + ${b} = ${n}$ tirages`);
  dit(12, `$\\dfrac{${r}}{${n}} = \\dfrac{${(r * 100) / n}}{100} = ${T(r / n)}$`);
  dit(12, `$\\dfrac{${b}}{${n}} = \\dfrac{${(b * 100) / n}}{100} = ${T(b / n)}$`);
  const billes = Math.round((r / n) * 10);
  vrai("12. le nombre de billes le plus proche : 6", billes === 6);
  dit(12, `$${billes}$ billes rouges et $${10 - billes}$ bleues`);
});
essai("13", () => {
  const [, lignes] = dessin("grille", 13, "figure");
  const [[, nA, kA], [, nB, kB]] = lignes.map((l) => l.map((c, i) => (i ? Number(c) : c)));
  dit(13, `6e A : $\\dfrac{${kA}}{${nA}} = ${T(kA / nA)}$. 6e B : $\\dfrac{${kB}}{${nB}} = ${T(kB / nB)}$`);
  dit(13, `$${T(kA / nA)} - 0{,}17 = ${T(r9(kA / nA - 0.17))}$`);
  dit(13, `$0{,}17 - ${T(kB / nB)} = ${T(r9(0.17 - kB / nB))}$`);
  vrai("13. 1/6 ≈ 0,17", Math.abs(1 / 6 - 0.17) < 0.005);
  dit(13, `$${kA} + ${kB} = ${kA + kB}$ six, en $${nA} + ${nB} = ${nA + nB}$ lancers`);
  dit(13, `$${kA + kB} \\div ${nA + nB} = ${T((kA + kB) / (nA + nB))}$`);
  vrai("13. la réunion est la plus proche de 1/6", Math.abs((kA + kB) / (nA + nB) - 1 / 6) < Math.min(Math.abs(kA / nA - 1 / 6), Math.abs(kB / nB - 1 / 6)));
});
essai("14", () => {
  const [n, k] = nombresDe(e(14).split("\\n")[0]);
  dit(14, `$\\dfrac{${k}}{${n}} = \\dfrac{${(k * 100) / n}}{100} = ${T(k / n)}$, soit $${(k * 100) / n}$ %`);
  dit(14, `$\\dfrac{9}{10} = \\dfrac{90}{100}$, soit $90$ %`);
  dit(14, `$90 - ${(k * 100) / n} = ${90 - (k * 100) / n}$`);
  dit(14, `exactement $${(n * 9) / 10}$ graines`);
  const [pts] = dessin("echelle", 14, "schema");
  vrai("14. l'échelle : semis et sachet", pts.find((p) => p.label === "semis").valeur === k / n && pts.find((p) => p.label === "sachet").valeur === 0.9);
});
essai("15", () => {
  const [faces] = dessin("de", 15, "schema");
  vrai("15. le dé surligne le 6", memes(faces, [6]));
  dit(15, "Il reste $1$ chance sur $6$");
});
essai("16", () => {
  const [n, k] = nombresDe(e(16)).filter((x) => x !== 1);
  const pairs = [2, 4, 6];
  dit(16, `$${n} \\div 2 = ${n / 2}$ nombres pairs`);
  dit(16, `$${n} \\div 6 = ${n / 6}$`);
  dit(16, `On a eu $${k}$ : $${n / 6 - k}$ de moins`);
  vrai("16. la moitié des faces", pairs.length * 2 === 6);
  const [, lignes] = dessin("grille", 16, "schema");
  vrai("16. le tableau des attendus", Number(lignes[0][1]) === n / 2 && Number(lignes[1][1]) === n / 6);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [data] = dessin("barres", 17, "figure");
  const v = data.map((d) => d.value);
  const [n] = nombresDe(e(17).split("\\n")[0]);
  vrai("17. quatre groupes de 25", v.length === 4 && n === 25);
  dit(17, `G1 : $\\dfrac{${v[0]}}{${n}} = \\dfrac{${v[0] * 4}}{100} = ${T(v[0] / n)}$`);
  dit(17, `G2 : $\\dfrac{${v[1]}}{${n}} = ${T(v[1] / n)}$`);
  dit(17, `G3 : $\\dfrac{${v[2]}}{${n}} = ${T(v[2] / n)}$`);
  dit(17, `G4 : $\\dfrac{${v[3]}}{${n}} = ${T(v[3] / n)}$`);
  dit(17, `$${v.join(" + ")} = ${somme(v)}$, sur $4 \\times ${n} = ${4 * n}$ lancers. Fréquence : $${T(somme(v) / (4 * n))}$`);
});
essai("18", () => {
  const [, lignes] = dessin("grille", 18, "figure");
  const [[, n1, k1], [, n2, k2]] = lignes.map((l) => l.map((c, i) => (i ? Number(c) : c)));
  dit(18, `$${k1}$ six sur $${n1}$ lancers, soit $\\dfrac{${k1}}{${n1}}$ : $1$ chance sur $3$`);
  vrai("18. 2/6 = 1/3", k1 * 3 === n1);
  dit(18, `$\\dfrac{${k2}}{${n2}} = \\dfrac{${(k2 * 100) / n2}}{100} = ${T(k2 / n2)}$`);
  dit(18, `$${n1} \\div 6 = ${n1 / 6}$ six attendu`);
  dit(18, `$${n2} \\div 6 = ${n2 / 6}$ six attendus`);
  dit(18, `$${k2}$ au lieu de $${n2 / 6}$, soit $${k2 - n2 / 6}$ de trop`);
});
essai("19", () => {
  const [el, lan] = nombresDe(e(19).split("\\n")[0]);
  const n = el * lan;
  dit(19, `$${el} \\times ${lan} = ${n}$ lancers`);
  const k = nombresDe(e(19).split("\\n")[2])[0];
  dit(19, `$\\dfrac{${k}}{${n}} = \\dfrac{${k * 2}}{1\\,000} = ${T(k / n)}$`);
  dit(19, `$${n} \\div 4 = ${n / 4}$. On a eu $${k}$ : $${k - n / 4}$ de plus`);
  const [kl, nl] = nombresDe(e(19).split("\\n")[4]);
  dit(19, `$\\dfrac{${kl}}{${nl}} = \\dfrac{4}{10} = ${T(kl / nl)}$`);
  vrai("19. la classe plus proche de 0,25", Math.abs(k / n - 0.25) < Math.abs(kl / nl - 0.25));
  const [pts] = dessin("echelle", 19, "schema");
  vrai("19. l'échelle", pts.find((p) => p.label === "classe").valeur === k / n && pts.find((p) => p.label === "Léo").valeur === kl / nl);
});
essai("20", () => {
  const [segs] = dessin("roue", 20, "schema");
  const I = issuesRoue(segs);
  const g = nb(I, "G");
  enonceDit(20, `$${I.length}$ secteurs égaux. $${g}$ secteurs sont gagnants`);
  dit(20, `$\\dfrac{${g}}{${I.length}} = \\dfrac{1}{4}$, soit $${T(g / I.length)}$`);
  const [n1, k1] = nombresDe(e(20).split("\\n")[2]);
  const [n2, k2] = nombresDe(e(20).split("\\n")[3]);
  dit(20, `$${n1} \\div 4 = ${n1 / 4}$ gains attendus`);
  dit(20, `$${k1} \\div ${n1} = ${T(k1 / n1)}$`);
  dit(20, `$${k2} \\div ${n2} = ${T(k2 / n2)}$`);
  dit(20, `$${T(k1 / n1)} - 0{,}25 = ${T(r9(k1 / n1 - 0.25))}$`);
  dit(20, `$${T(k2 / n2)} - 0{,}25 = ${T(r9(k2 / n2 - 0.25))}$`);
  vrai("20. l'écart se réduit", Math.abs(k2 / n2 - 0.25) < Math.abs(k1 / n1 - 0.25));
});

void verif;
f.fin();
