// Recalcul indépendant de la feuille « Mener une enquête » de 6e (30/09/2026) :
// lib/fiches-exercices/maths-6e-stat-enquete.tsx.
//
// ⭐ L'AUTRE CHEMIN : les listes brutes (E H E P…, 2 0 1 3…) sont recomptées
// réponse par réponse dans l'ÉNONCÉ ; les tableaux (effectifs, TRAITS, total)
// sont RELUS dans les appels `grille` ; chaque somme, écart, conversion (g, kg,
// mm, cm) est refaite, puis cherchée dans le corrigé. Aides locales relues :
// `etapes` (30 signes au plus), `foule` (le groupe tient sur une ligne).
// Règles communes : scripts/verifier-exercices-5e-commun.mjs (classe 6e).
// Usage : node scripts/verifier-exercices-6e-stat-enquete.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-stat-enquete.tsx", "stat_enquete", ["grille", "etapes", "foule"], "6e");
const { e, vrai, dit, enonceDit, dessin, appels, essai } = f;

const somme = (xs) => xs.reduce((a, b) => a + b, 0);
const memes = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const T = (x) => t(x); // 2500 → « 2\,500 », 0.2 → « 0{,}2 »
/** Les nombres $…$ d'un texte, dans l'ordre (virgule et espace des milliers compris). */
const nombresDe = (texte) => [...texte.matchAll(/\$(\d+(?:\\,\d{3})*(?:\{,\}\d+)?)\$/g)].map((m) => Number(m[1].replace(/\\,/g, "").replace("{,}", ".")));
/** La liste brute : la ligne de l'énoncé faite de lettres ou de nombres séparés par des espaces. */
const liste = (k) => e(k).split("\\n").find((l) => /^([A-Z0-9]+ )+[A-Z0-9]+$/.test(l)).split(" ");
const compte = (xs) => xs.reduce((m, x) => ({ ...m, [x]: (m[x] ?? 0) + 1 }), {});
/** Un tableau d'effectifs relu : chaque ligne [nom, traits, effectif] contrôlée, total compris. */
function tableauEffectifs(k, attendus, role = "schema") {
  const [, lignes] = dessin("grille", k, role);
  const corps = lignes.filter((l) => l[0] !== "total");
  for (const [nom, traits, eff] of corps) {
    vrai(`${k}. « ${nom} » : effectif ${attendus[nom]}`, Number(eff) === attendus[nom]);
    vrai(`${k}. « ${nom} » : ${attendus[nom]} traits`, traits.replace(/ /g, "").length === attendus[nom]);
  }
  const tot = lignes.find((l) => l[0] === "total");
  vrai(`${k}. ligne total`, !tot || Number(tot[2]) === somme(Object.values(attendus)));
  vrai(`${k}. une ligne par réponse possible`, corps.length === Object.keys(attendus).length);
}

/* ═══ Rendu des aides locales ═══ */
for (const { args } of appels("etapes").filter((a) => a.args)) for (const s of args[0]) vrai(`etapes : « ${s} » ≤ 30 signes`, s.length <= 30);
for (const { args } of appels("foule").filter((a) => a.args)) {
  const [total, groupe, legende] = args;
  vrai(`foule : groupe de ${groupe} sur une ligne, légende ≤ 30 signes`, groupe >= 1 && groupe <= 10 && groupe < total && legende.length <= 30);
}
for (const { args } of appels("grille").filter((a) => a.args)) {
  const [ent, lignes] = args;
  vrai(`grille (${ent[0]}) : trois colonnes au plus, lignes pleines`, ent.length <= 3 && lignes.every((l) => l.length === ent.length));
}

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const [pas] = dessin("etapes", 1, "schema");
  vrai("1. quatre étapes", pas.length === 4);
  const lettre = { "écrire la question": "C", "poser la question": "B", "ranger dans un tableau": "A", "lire et conclure": "D" };
  const ordre = pas.map((s) => lettre[s.replace(/^\d\. /, "")]);
  vrai("1. le schéma suit C, B, A, D", memes(ordre, ["C", "B", "A", "D"]));
  const dansEnonce = { A: "ranger les réponses dans un tableau", B: "poser la question à chaque élève", C: "écrire la question exacte", D: "lire le tableau pour conclure" };
  for (const [l, texte] of Object.entries(dansEnonce)) enonceDit(1, `${l} : ${texte}.`);
  dit(1, `Réponse : ${ordre.join(", ")}.`);
});
essai("2", () => {
  const [total, groupe] = dessin("foule", 2, "schema");
  enonceDit(2, `interroge $${groupe}$ élèves`);
  vrai("2. la foule : plus d'élèves que le groupe", total > groupe);
});
essai("3", () => {
  const [, lignes] = dessin("grille", 3, "schema");
  const rep = lignes.map((l) => l[0]);
  enonceDit(3, `« Comment viens-tu au collège : ${rep.slice(0, 3).join(", ")} ou ${rep[3]} ? »`);
  dit(3, `B propose quatre réponses possibles`);
  vrai("3. quatre réponses, quatre lignes", rep.length === 4);
});
essai("4", () => {
  const h = nombresDe(e(4).split("\\n")[0]).filter((_, i) => i % 2 === 1);
  const [ent, lignes] = dessin("grille", 4, "schema");
  vrai("4. le tableau : les quatre hauteurs, l'unité dans l'en-tête", memes(lignes.map((l) => Number(l[1])), h) && ent[1] === "hauteur (cm)" && lignes.every((l) => !/cm/.test(l[1])));
  const imax = h.indexOf(Math.max(...h));
  dit(4, `Le plus grand nombre est $${h[imax]}$ : c'est le plant $${imax + 1}$`);
});
essai("5", () => {
  const m = nombresDe(e(5).split("\\n")[0]);
  const unites = [...e(5).split("\\n")[0].matchAll(/\$ (kg|g)\b/g)].map((x) => x[1]);
  vrai("5. quatre masses, deux unités", m.length === 4 && unites.length === 4 && new Set(unites).size === 2);
  const g = m.map((x, i) => Math.round(unites[i] === "kg" ? x * 1000 : x));
  m.forEach((x, i) => unites[i] === "kg" && dit(5, `$${T(x)}$ kg $= ${g[i]}$ g`));
  dit(5, `Les quatre masses : ${g.map((x) => `$${x}$ g`).join(", ")}`);
  const imax = g.indexOf(Math.max(...g));
  dit(5, `La plus grande est $${g[imax]}$ g : c'est la pomme $${imax + 1}$`);
  const [, lignes] = dessin("grille", 5, "schema");
  vrai("5. le tableau en grammes", memes(lignes.map((l) => Number(l[1])), g));
  vrai("5. le piège : la plus lourde était écrite en kg", unites[imax] === "kg");
});
essai("6", () => {
  const L = liste(6);
  const n = compte(L);
  enonceDit(6, `$${L.length}$ élèves`);
  const nom = { E: "été", H: "hiver", P: "printemps", A: "automne" };
  tableauEffectifs(6, Object.fromEntries(Object.entries(nom).map(([k, v]) => [v, n[k]])));
  dit(6, `Été : $${n.E}$. Hiver : $${n.H}$. Printemps : $${n.P}$. Automne : $${n.A}$.`);
  dit(6, `$${n.E} + ${n.H} + ${n.P} + ${n.A} = ${L.length}$`);
  vrai("6. l'été en tête", n.E === Math.max(...Object.values(n)));
});
essai("7", () => {
  const [, lignes] = dessin("grille", 7, "figure");
  const g = Object.fromEntries(lignes.map(([p, c]) => [p, Number(c)]));
  dit(7, `je lis la case : $${g.fraise}$`);
  enonceDit(7, `vendu $${g.chocolat}$ cornets`);
  vrai("7. le citron le moins", g.citron === Math.min(...Object.values(g)));
  dit(7, `$${g.vanille} - ${g.citron} = ${g.vanille - g.citron}$ cornets`);
});
essai("8", () => {
  const [, lignes] = dessin("grille", 8, "figure");
  const tot = Number(lignes.at(-1)[1]);
  enonceDit(8, `interrogé $${tot}$ élèves`);
  const connus = lignes.slice(0, -1).filter((l) => l[1] !== "?").map((l) => Number(l[1]));
  const v = tot - somme(connus);
  dit(8, `$${connus.join(" + ")} = ${somme(connus)}$`);
  dit(8, `$${tot} - ${somme(connus)} = ${v}$ élèves`);
  dit(8, `$${[...connus, v].join(" + ")} = ${tot}$`);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const L = liste(9);
  const n = compte(L);
  enonceDit(9, `$${L.length}$ élèves`);
  tableauEffectifs(9, Object.fromEntries(["0", "1", "2", "3", "4"].map((k) => [k, n[k] ?? 0])));
  dit(9, ["0", "1", "2", "3", "4"].map((k) => `$${k}$ livre${k === "0" || k === "1" ? "" : "s"} : $${n[k]}$.`).join(" "));
  dit(9, `$${["0", "1", "2", "3", "4"].map((k) => n[k]).join(" + ")} = ${L.length}$`);
  dit(9, `$${n[2]} + ${n[3]} + ${n[4]} = ${n[2] + n[3] + n[4]}$ élèves`);
  dit(9, `C'est la ligne du $0$ : $${n[0]}$ élèves`);
});
essai("10", () => {
  const v = nombresDe(e(10).split("\\n")[0]);
  const [, lignes] = dessin("grille", 10, "schema");
  vrai("10. le tableau porte les sept relevés", memes(lignes.map((l) => Number(l[1])), v));
  const zeros = lignes.filter((l) => l[1] === "0").map((l) => l[0]);
  vrai("10. mardi et vendredi à 0", memes(zeros, ["mardi", "vendredi"]));
  dit(10, `Cela fait $${zeros.length}$ jours`);
  dit(10, `$${v.join(" + ")} = ${somme(v)}$ mm`);
  const imax = v.indexOf(Math.max(...v));
  dit(10, `Le plus grand nombre est $${v[imax]}$ : ${lignes[imax][0]}`);
});
essai("11", () => {
  const [pas] = dessin("etapes", 11, "schema");
  enonceDit(11, "il interroge $5$ clients");
  vrai("11. le plan : qui, quand, question, noter", pas.length === 4 && /^qui/.test(pas[0]) && /^quand/.test(pas[1]));
});
essai("12", () => {
  const [ent, lignes] = dessin("grille", 12, "figure");
  const g = (l, c) => Number(lignes.find((x) => x[0] === l)[ent.indexOf(c)]);
  dit(12, `Ligne « robotique », colonne « 5e » : $${g("robotique", "5e")}$`);
  dit(12, `$${g("théâtre", "6e")} + ${g("théâtre", "5e")} = ${g("théâtre", "6e") + g("théâtre", "5e")}$ élèves`);
  const six = lignes.map((l) => Number(l[1]));
  dit(12, `$${six.join(" + ")} = ${somme(six)}$ élèves`);
  vrai("12. plus de 5e que de 6e : la robotique seule", memes(lignes.filter((l) => Number(l[2]) > Number(l[1])).map((l) => l[0]), ["robotique"]));
  dit(12, `répondre $${g("robotique", "6e")}$`);
});
essai("13", () => {
  const L = liste(13);
  const n = compte(L);
  const nom = { L: "libellule", G: "grenouille", C: "canard", T: "tortue" };
  tableauEffectifs(13, Object.fromEntries(Object.entries(nom).map(([k, v]) => [v, n[k]])));
  dit(13, `Libellule : $${n.L}$. Grenouille : $${n.G}$. Canard : $${n.C}$. Tortue : $${n.T}$.`);
  dit(13, `$${n.L} + ${n.G} + ${n.C} + ${n.T} = ${L.length}$ : il y a bien $${L.length}$ lettres`);
  vrai("13. la libellule en tête", n.L === Math.max(...Object.values(n)));
  enonceDit(13, `vu $${L.length}$ animaux différents`);
});
essai("14", () => {
  const txt = e(14).split("\\n")[0];
  const temps = [...txt.matchAll(/([A-ZÉ][a-zé]+) : \$([\d{},]+)\$ s/g)].map((m) => [m[1], Number(m[2].replace("{,}", "."))]);
  vrai("14. quatre temps", temps.length === 4);
  const tri = [...temps].sort((a, b) => a[1] - b[1]);
  const [, lignes] = dessin("grille", 14, "schema");
  vrai("14. le tableau : du plus rapide au plus lent", memes(lignes.map((l) => [l[0], Number(l[1].replace(",", "."))]), tri));
  dit(14, `$${tri.map((x) => (Number.isInteger(x[1]) ? `${x[1]}{,}0` : T(x[1]))).join("$ ; $")}$`);
  dit(14, `L'ordre est : ${tri.map((x) => x[0]).join(", ")}`);
  const ec = Math.round((tri[3][1] - tri[0][1]) * 10) / 10;
  dit(14, `$${T(tri[3][1])} - ${T(tri[0][1])} = ${T(ec)}$ s`);
});
essai("15", () => {
  const [, lignes] = dessin("grille", 15, "figure");
  const g = Object.fromEntries(lignes.map(([a, b]) => [a, Number(b)]));
  dit(15, `$${g.adulte} + ${g.enfant} + ${g.enfant} = ${g.adulte + 2 * g.enfant}$ €`);
  dit(15, `$10 \\times ${g.enfant} = ${10 * g.enfant}$ €`);
  const carte = g["carte enfant 10 entrées"];
  vrai("15. la carte est moins chère", carte < 10 * g.enfant);
  dit(15, `$${10 * g.enfant} - ${carte} = ${10 * g.enfant - carte}$ €`);
});
essai("16", () => {
  const [, lignes] = dessin("grille", 16, "schema");
  const rep = lignes.filter((l) => l[0] !== "total");
  vrai("16. quatre lignes vides, dont celle du 0", rep.length === 4 && rep[0][0] === "0" && rep.every((l) => l[1] === "" && l[2] === ""));
  vrai("16. total annoncé 25", lignes.at(-1)[2] === "25");
  enonceDit(16, "demander à $25$ élèves");
  dit(16, "Il y a $4$ réponses possibles : $4$ lignes");
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const L = liste(17);
  const n = compte(L);
  enonceDit(17, `réponses de $${L.length}$ élèves`);
  tableauEffectifs(17, Object.fromEntries(["8", "9", "10", "11"].map((k) => [k, n[k] ?? 0])));
  vrai("17. réponses de 8 à 11 seulement", memes(Object.keys(n).sort((a, b) => a - b), ["8", "9", "10", "11"]));
  dit(17, `$8$ h : $${n[8]}$. $9$ h : $${n[9]}$. $10$ h : $${n[10]}$. $11$ h : $${n[11]}$.`);
  dit(17, `$${n[8]} + ${n[9]} + ${n[10]} + ${n[11]} = ${L.length}$`);
  dit(17, `$${n[10]} + ${n[11]} = ${n[10] + n[11]}$ élèves`);
  vrai("17. 9 h la plus fréquente", n[9] === Math.max(...Object.values(n)));
});
essai("18", () => {
  const [ent, lignes] = dessin("grille", 18, "figure");
  vrai("18. l'en-tête annonce des cm", ent[1] === "plant A (cm)" && ent[2] === "plant B (cm)");
  const intrus = lignes.filter((l) => /mm/.test(l[2]));
  vrai("18. une seule case en mm : B, semaine 3", intrus.length === 1 && intrus[0][0] === "3");
  const mm = Number(intrus[0][2].replace(" mm", ""));
  const B = lignes.map((l) => (/mm/.test(l[2]) ? mm / 10 : Number(l[2])));
  const A = lignes.map((l) => Number(l[1]));
  dit(18, `Donc $${mm}$ mm $= ${mm / 10}$ cm`);
  dit(18, `A mesure $${A[2]}$ cm, B mesure $${B[2]}$ cm`);
  vrai("18. semaine 3 : A plus haut, B paraissait plus haut", A[2] > B[2] && mm > A[2]);
  dit(18, `$${A[3]} - ${A[0]} = ${A[3] - A[0]}$ cm`);
  dit(18, `$${B[3]} - ${B[0]} = ${B[3] - B[0]}$ cm`);
});
essai("19", () => {
  const [, lignes] = dessin("grille", 19, "figure");
  const S = lignes.map((l) => Number(l[1])), L = lignes.map((l) => Number(l[2]));
  enonceDit(19, `interroge $${somme(S)}$ élèves du club de foot`);
  enonceDit(19, `tire au sort $${somme(L)}$ élèves`);
  dit(19, `Sam : $${S.join(" + ")} = ${somme(S)}$. Lina : $${L.join(" + ")} = ${somme(L)}$`);
  vrai("19. le foot gagne chez les deux, de peu chez Lina", S[0] === Math.max(...S) && L[0] === Math.max(...L) && L[0] - [...L].sort((a, b) => b - a)[1] === 1);
  dit(19, `$${L[0]}$, contre $${L[2]}$ pour la natation`);
  dit(19, `$${somme(L)} - ${L[0]} = ${somme(L) - L[0]}$ élèves`);
});
essai("20", () => {
  const txt = e(20).split("\\n")[0];
  const rel = [...txt.matchAll(/([A-Z][a-z]+) : \$([\d{},\\]+)\$ (kg|g)/g)].map((m) => [m[1].toLowerCase(), Number(m[2].replace(/\\,/g, "").replace("{,}", ".")), m[3]]);
  vrai("20. quatre relevés", rel.length === 4);
  const g = rel.map(([j, x, u]) => [j, Math.round(u === "kg" ? x * 1000 : x)]);
  rel.forEach(([, x, u], i) => u === "kg" && dit(20, `$${T(x)}$ kg $= ${T(g[i][1])}$ g`));
  const tot = somme(g.map((x) => x[1]));
  dit(20, `$${g.map((x) => T(x[1])).join(" + ")} = ${T(tot)}$ g`);
  dit(20, `$${T(tot)}$ g $= ${T(tot / 1000)}$ kg`);
  const [, lignes] = dessin("grille", 20, "schema");
  vrai("20. le tableau : quatre jours, en g, sans mercredi", memes(lignes.slice(0, -1).map((l) => [l[0], Number(l[1].replace(/ /g, ""))]), g));
  vrai("20. ligne total", Number(lignes.at(-1)[1].replace(/ /g, "")) === tot);
  dit(20, `additionner $${rel.map((x) => T(x[1])).join(" + ")}$`);
});

f.fin();
