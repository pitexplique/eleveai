// Recalcul indépendant de la feuille « Les nombres relatifs » de 5e (29/09/2026) :
// lib/fiches-exercices/maths-5e-relatif-nombre.tsx — la feuille étalon du lot.
//
// ⭐ Les nombres sont relus dans l'ÉNONCÉ ou dans le DESSIN (droiteRel, axeVertical,
// tableau, table), jamais recopiés ici : le script range, compare, prend
// l'opposé et la distance à zéro lui-même, puis cherche la réponse écrite dans
// le corrigé. Un dessin qui ne porte pas les nombres de l'énoncé : ça se voit.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-5e-relatif-nombre.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-5e-relatif-nombre.tsx", "relatif_nombre", ["droiteRel", "axeVertical", "table"]);
const { c, e, vrai, verif, dit, enonceDit, dessin, essai } = f;

/** « −4,5 », « +35 », « 3,2 » (texte SVG ou LaTeX) → nombre. */
const nb = (s) => Number(String(s).replace(/\{,\}/g, ".").replace(",", ".").replace("−", "-").replace(/\$/g, "").trim());
/** Les nombres $…$ d'un texte, dans l'ordre. */
const nombresDe = (texte) => [...texte.matchAll(/\$([+-]?\d+(?:\{,\}\d+)?)\$/g)].map((m) => nb(m[1]));
/** Comme la feuille l'écrit dans un dessin : « −3 », « 3,2 ». */
const svg = (v) => String(v).replace("-", "−").replace(".", ",");
const croissant = (xs) => [...xs].sort((a, b) => a - b);
const memes = (a, b) => JSON.stringify(croissant(a)) === JSON.stringify(croissant(b));

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const attendus = [-12, 35, -4.5, 3, -2];
  dit(1, "l'épave est à $-12$ m".replace("l'épave", "L'épave"));
  dit(1, "gagne $+35$ €");
  dit(1, "Il fait $-4{,}5$ °C");
  dit(1, "C'est l'étage $+3$");
  dit(1, "C'est l'étage $-2$");
  dit(1, `Réponse : a) $${t(-12)}$ ; b) $+35$ ; c) $${t(-4.5)}$ ; d) $+3$ ; e) $${t(-2)}$.`);
  const [, lignes] = dessin("table", 1);
  lignes.forEach((l, i) => {
    vrai(`1. ligne ${i + 1} du tableau : ${l[2]} = ${attendus[i]}`, nb(l[2]) === attendus[i]);
    vrai(`1. ligne ${i + 1} : le signe colle au nombre`, (l[1] === "−") === attendus[i] < 0);
  });
});
essai("2", () => {
  const xs = nombresDe(e(2));
  vrai(`2. six nombres lus (${xs})`, xs.length === 6);
  const neg = xs.filter((x) => x < 0), pos = xs.filter((x) => x > 0);
  const tx = (x) => (e(2).includes(`$+${t(x)}$`) ? `+${t(x)}` : t(x));
  dit(2, `Négatifs : $${tx(neg[0])}$, $${tx(neg[1])}$ et $${tx(neg[2])}$.`);
  dit(2, `Positifs : $${tx(pos[0])}$ et $${tx(pos[1])}$.`);
  vrai("2. zéro est dans la liste", xs.includes(0));
  const [, , , points] = dessin("droiteRel", 2);
  vrai("2. la droite porte tous les nombres non nuls", memes(points.map((p) => p.value), [...neg, ...pos]));
  vrai("2. en rouge : les négatifs, et eux seuls", points.every((p) => (p.color === f.constantes.ROUGE) === p.value < 0));
});
essai("3", () => {
  const [min, max, pas, points, opts] = dessin("droiteRel", 3, "figure");
  verif("3. une graduation", pas, 1 / 2);
  vrai("3. nombres écrits tous les 1", opts.nombres === 1 && min === -3 && max === 3);
  dit(3, `Une graduation vaut donc $1 \\div 2 = ${t(pas)}$.`);
  const A = points.find((p) => p.label === "A");
  dit(3, `à ${["zéro", "une", "deux", "trois", "quatre", "cinq"][Math.abs(A.value) / pas]} graduations : $${Math.abs(A.value) / pas} \\times ${t(pas)} = ${t(Math.abs(A.value))}$`);
  dit(3, `Réponse : ${points.map((p) => `${p.label}$(${t(p.value)})$`).join(", ").replace(/, ([^,]*)$/, ", $1")}.`);
  vrai("3. A et D opposés", points.find((p) => p.label === "D").value === -A.value);
});
essai("4", () => {
  const coords = Object.fromEntries([...e(4).matchAll(/\$([A-Z])\(([^)]*)\)\$/g)].map((m) => [m[1], nb(m[2])]));
  const [, , pas, points] = dessin("droiteRel", 4);
  verif("4. un carreau = 0,5 = une graduation", pas, 0.5);
  for (const p of points) vrai(`4. ${p.label} placé en ${coords[p.label]}`, p.value === coords[p.label]);
  vrai("4. quatre points", points.length === 4 && Object.keys(coords).length === 4);
  for (const [nom, v] of Object.entries(coords)) if (nom !== "G") dit(4, `soit $${Math.abs(v) * 2}$ carreaux`);
  dit(4, "soit $1$ carreau");
  vrai("4. G entre −1 et 0", coords.G > -1 && coords.G < 0);
});
essai("5", () => {
  const lignes = e(5).split("\\n").slice(1).map(nombresDe);
  const signes = lignes.map(([a, b]) => (a < b ? "<" : ">"));
  dit(5, `Réponse : ${signes.map((s, i) => `${"abcd"[i]}) $${s}$`).join(" ; ")}.`);
  lignes.forEach(([a, b], i) => vrai(`5${"abcd"[i]}. $${t(a)} ${signes[i]} ${t(b)}$ ou l'inverse écrit`, c(5).includes(`$${t(a)} ${signes[i]} ${t(b)}$`) || c(5).includes(`$${t(b)} ${signes[i] === "<" ? ">" : "<"} ${t(a)}$`)));
  const [, , , points] = dessin("droiteRel", 5);
  vrai("5. la droite montre le b)", memes(points.map((p) => p.value), lignes[1]));
});
essai("6", () => {
  const xs = e(6).split("\\n").slice(1).map((l) => nombresDe(l)[0]);
  xs.forEach((x) => dit(6, `L'opposé de $${t(x)}$ est $${t(-x || 0)}$`));
  dit(6, `Réponse : ${xs.map((x, i) => `${"abcd"[i]}) $${t(-x || 0)}$`).join(" ; ")}.`);
  const [, , , points, { sauts }] = dessin("droiteRel", 6);
  vrai("6. la droite montre −13 et son opposé", memes(points.map((p) => p.value), [xs[0], -xs[0]]));
  vrai("6. deux arcs de même longueur", sauts.every((s) => s.de === 0 && nb(s.label) === Math.abs(xs[0]) && Math.abs(s.vers) === Math.abs(xs[0])));
});
essai("7", () => {
  const xs = e(7).split("\\n").slice(1).map((l) => nombresDe(l)[0]);
  dit(7, `Réponse : ${xs.map((x, i) => `${"abcd"[i]}) $${t(Math.abs(x))}$`).join(" ; ")}.`);
  const [, , , points, { sauts }] = dessin("droiteRel", 7);
  vrai("7. la droite porte les nombres non nuls", memes(points.map((p) => p.value), xs.filter((x) => x !== 0)));
  vrai("7. chaque arc part de zéro et porte la distance", sauts.length === 3 && sauts.every((s) => s.de === 0 && nb(s.label) === Math.abs(s.vers) && xs.includes(s.vers)));
});
essai("8", () => {
  const xs = nombresDe(e(8));
  const r = croissant(xs);
  dit(8, `Réponse : $${r.map(t).join(" < ")}$.`);
  const [, , , points] = dessin("droiteRel", 8);
  vrai("8. la droite porte les nombres non nuls", memes(points.map((p) => p.value), xs.filter((x) => x !== 0)));
  vrai("8. étiquettes = nombres", points.every((p) => p.label === svg(p.value)));
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const [entete, ligne] = dessin("tableau", 9, "figure");
  const jours = entete.slice(1), T = ligne.slice(1);
  const froid = jours[T.indexOf(Math.min(...T))], chaud = jours[T.indexOf(Math.max(...T))];
  vrai(`9. le plus froid : ${froid} ; le plus chaud : ${chaud}`, froid === "mer." && chaud === "mar.");
  dit(9, `La plus basse est $${t(Math.min(...T))}$ °C`);
  dit(9, `La plus haute est $${t(Math.max(...T))}$ °C`);
  dit(9, `Réponse : $${croissant(T).reverse().map(t).join(" > ")}$.`);
  const sousZero = jours.filter((_, i) => T[i] < 0);
  vrai(`9. sous zéro : ${sousZero}`, JSON.stringify(sousZero) === '["lun.","mer.","ven."]');
  jours.forEach((j, i) => T[i] < 0 && dit(9, `($${t(T[i])}$ °C)`));
  const [, , , points] = dessin("axeVertical", 9);
  vrai("9. l'axe porte le tableau, jour par jour", jours.every((j, i) => points.some((p) => p.value === T[i] && p.label === `${j} ${svg(T[i])}`)) && points.length === 5);
});
essai("10", () => {
  const equipes = [...e(10).matchAll(/les ([A-Z][a-z]+) \$([+-]?\d+)\$/g)].map((m) => ({ nom: m[1], d: nb(m[2]) }));
  vrai("10. cinq équipes lues", equipes.length === 5);
  const r = [...equipes].sort((a, b) => b.d - a.d);
  dit(10, `$${r.map((q) => (q.d > 0 ? "+" : "") + t(q.d)).join(" > ")}$ : ${r.map((q) => `les ${q.nom}`).join(", ").replace(/, (les [A-Z][a-z]+)$/, ", $1")}.`);
  const neg = equipes.filter((q) => q.d < 0).map((q) => q.nom);
  vrai("10. négatives : Loups et Lynx", JSON.stringify(neg) === '["Loups","Lynx"]');
  vrai("10. −3 > −11", -3 > -11);
  dit(10, "Réponse : les Loups passent devant les Lynx.");
  const [, , , points] = dessin("axeVertical", 10);
  vrai("10. l'axe porte chaque équipe", equipes.every((q) => points.some((p) => p.value === q.d && p.label === `${q.nom} ${q.d > 0 ? "+" : ""}${svg(q.d)}`)));
});
essai("11", () => {
  const [, , pas, points] = dessin("droiteRel", 11, "figure");
  verif("11. une graduation = 1/5", pas, 1 / 5);
  dit(11, `$1 \\div 5 = ${t(pas)}$`);
  const L = points.find((p) => p.label === "L").value;
  dit(11, `L'opposé de $${t(L)}$ est $${t(-L)}$`);
  dit(11, `Réponse : ${points.map((p) => `${p.label}$(${t(p.value)})$`).join(", ")} et P$(${t(-L)})$.`);
  const K = points.find((p) => p.label === "K").value, M = points.find((p) => p.label === "M").value;
  vrai("11. P entre K et M", -L > K && -L < M);
  points.forEach((p) => vrai(`11. ${p.label} sur une graduation`, Math.abs(p.value / pas - Math.round(p.value / pas)) < 1e-9));
});
essai("12", () => {
  const [, lignes] = dessin("table", 12, "figure");
  const x1 = nb(lignes[0][0]), x2 = nb(lignes[1][0]), op3 = nb(lignes[2][1]), d4 = nb(lignes[3][2]);
  dit(12, `l'opposé de $${t(x1)}$ est $${t(-x1)}$ ; sa distance à zéro est $${t(Math.abs(x1))}$`);
  dit(12, `l'opposé de $${t(x2)}$ est $${t(-x2)}$ ; sa distance à zéro est $${t(Math.abs(x2))}$`);
  dit(12, `dont l'opposé est $${t(op3)}$, c'est $${t(-op3)}$ ; sa distance à zéro est $${t(Math.abs(op3))}$`);
  dit(12, `$${t(d4)}$ et $${t(-d4)}$`);
  vrai("12. lignes à compléter", lignes.every((l) => l.filter((x) => x === "…").length === 2));
});
essai("13", () => {
  const verites = [-12 < -10, true, !(-(-4) > 0), !(5 !== -5)];
  dit(13, `Réponse : ${verites.map((v, i) => `${"abcd"[i]}) ${v ? "vrai" : "faux"}`).join(" ; ")}.`);
  dit(13, `l'opposé de $${t(-4)}$ est $${t(4)}$`);
  const [, , , points] = dessin("droiteRel", 13);
  vrai("13. la droite porte −12, −10, −5 et 5", memes(points.map((p) => p.value), [-12, -10, -5, 5]));
});
essai("14", () => {
  const avant = [...e(14).matchAll(/\$(\d+)\$ av\. J\.-C\./g)].map((m) => -nb(m[1]));
  const apres = [...e(14).matchAll(/: \$(\d+)\$\.\\n/g)].map((m) => nb(m[1]));
  const dates = [...avant, ...apres];
  vrai(`14. quatre dates lues (${dates})`, dates.length === 4);
  dit(14, `$${croissant(dates).map(t).join(" < ")}$`);
  const plusProche = dates.reduce((a, b) => (Math.abs(b) < Math.abs(a) ? b : a));
  vrai("14. la plus proche de zéro : −52 (Alésia)", plusProche === -52);
  dit(14, `La plus petite est $${t(Math.abs(plusProche))}$.`);
  dit(14, `$${t(dates[0])}$ est plus loin de zéro`);
  const [, , , points] = dessin("droiteRel", 14);
  vrai("14. la frise porte les quatre dates", memes(points.map((p) => p.value), dates));
});
essai("15", () => {
  const xs = nombresDe(e(15));
  const r = croissant(xs).reverse();
  dit(15, `Réponse : $${r.map(t).join(" > ")}$.`);
  dit(15, `$${croissant(xs.map(Math.abs)).map(t).join(" < ")}$`);
  const [, , , points] = dessin("droiteRel", 15);
  vrai("15. la droite porte les cinq nombres", memes(points.map((p) => p.value), xs));
});
essai("16", () => {
  const [a, b] = nombresDe(e(16).split("\\n")[0]);
  const entiers = [];
  for (let n = Math.ceil(a); n <= Math.floor(b); n++) entiers.push(n);
  dit(16, `Les entiers : $${entiers.map(t).join("$ ; $")}$.`);
  dit(16, `Il y en a $${entiers.length}$.`);
  vrai("16. −0,95 entre −1 et −0,9", -0.95 > -1 && -0.95 < -0.9 && c(16).includes("$-0{,}95$"));
  const [, , , points] = dessin("droiteRel", 16);
  vrai("16. la droite porte les bornes et les entiers", memes(points.map((p) => p.value), [a, b, ...entiers]));
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const joueuses = [...e(17).matchAll(/([A-Z][a-zé]+) \$([+-]?\d+)\$/g)].map((m) => ({ nom: m[1], s: nb(m[2]) }));
  vrai("17. cinq joueuses lues", joueuses.length === 5);
  const r = [...joueuses].sort((x, y) => x.s - y.s);
  dit(17, `$${r.map((j) => (j.s > 0 ? "+" : "") + t(j.s)).join(" < ")}$ : ${r.map((j) => j.nom).join(", ")}.`);
  vrai("17. au par : Daria", joueuses.find((j) => j.s === 0).nom === "Daria");
  const proche = joueuses.filter((j) => j.s !== 0).reduce((x, y) => (Math.abs(y.s) < Math.abs(x.s) ? y : x));
  vrai("17. la plus proche du par : Chloé", proche.nom === "Chloé");
  dit(17, `C'est ${proche.nom}.`);
  const farah = -joueuses.find((j) => j.nom === "Bérénice").s;
  const rang = [...joueuses.map((j) => j.s), farah].sort((x, y) => x - y).indexOf(farah) + 1;
  vrai("17. Farah troisième", rang === 3);
  dit(17, `L'opposé de $+2$ est $${t(farah)}$`);
  const [, lignes] = dessin("table", 17);
  const tous = [...joueuses, { nom: "Farah", s: farah }].sort((x, y) => x.s - y.s);
  vrai("17. le tableau du classement", lignes.every((l, i) => l[0] === `${i + 1}. ${tous[i].nom}` && nb(l[1]) === tous[i].s && nb(l[2]) === Math.abs(tous[i].s)));
});
essai("18", () => {
  const depart = -2, monte = 6, descend = 7;
  enonceDit(18, `Il monte de $${monte}$ étages, puis il redescend de $${descend}$ étages.`);
  const pas = (de, n, sens) => Array.from({ length: n }, (_, i) => de + sens * (i + 1));
  const haut = pas(depart, monte, 1), bas = pas(haut.at(-1), descend, -1);
  dit(18, `Six étages vers le haut : $${haut.map(t).join("$, $")}$.`);
  dit(18, `Sept étages vers le bas depuis $${haut.at(-1)}$ : $${bas.map(t).join("$, $")}$.`);
  vrai("18. on reste dans l'immeuble (−3 à 8)", [...haut, ...bas].every((x) => x >= -3 && x <= 8));
  dit(18, `l'étage $${t(bas.at(-1))}$.`);
  const ines = -depart;
  dit(18, `L'opposé de $${t(depart)}$ est $${t(ines)}$`);
  vrai("18. Samir plus loin", Math.abs(bas.at(-1)) > Math.abs(ines));
  dit(18, `Samir est à $${Math.abs(bas.at(-1))}$ étages du rez-de-chaussée, Inès à $${Math.abs(ines)}$ étages.`);
  const [, , , points, fleches] = dessin("axeVertical", 18);
  vrai("18. l'axe porte départ, montée, fin et Inès", memes(points.map((p) => p.value), [depart, haut.at(-1), bas.at(-1), ines]));
  vrai("18. les flèches : +6 puis −7", fleches[0].de === depart && fleches[0].vers === haut.at(-1) && nb(fleches[0].label) === monte && fleches[1].de === haut.at(-1) && fleches[1].vers === bas.at(-1) && nb(fleches[1].label) === descend);
});
essai("19", () => {
  // Tous les nombres à un chiffre après la virgule entre −10 et 10, filtrés par les indices.
  const tous = Array.from({ length: 201 }, (_, i) => (i - 100) / 10).filter((x) => !Number.isInteger(x));
  const i12 = tous.filter((x) => x < 0 && Math.abs(x) > 3 && Math.abs(x) < 4);
  const i3 = i12.filter((x) => x > -3.3);
  const i4 = i3.filter((x) => Math.round(Math.abs(x) * 10) % 10 % 2 === 0);
  dit(19, `$${croissant(i12).map(t).join("$ ; $")}$.`);
  dit(19, `Il reste $${croissant(i3).map(t).join("$ et $")}$.`);
  vrai(`19. une seule solution (${i4})`, i4.length === 1);
  dit(19, `Réponse : je suis $${t(i4[0])}$.`);
  const [, , , points] = dessin("droiteRel", 19);
  vrai("19. la droite : la borne −3,3 et les deux restants", memes(points.map((p) => p.value), [-3.3, ...i3]));
  vrai("19. la solution en vert", points.find((p) => p.value === i4[0]).color === f.constantes.VERT);
});
essai("20", () => {
  const alt = { sommet: 320, phare: 35, plage: 0, récif: -8, épave: -45 };
  enonceDit(20, "le sommet est à $320$ m au-dessus de la mer, le phare à $35$ m au-dessus, la plage au niveau de la mer, un récif à $8$ m sous la mer et une épave à $45$ m sous la mer");
  dit(20, `Sommet $+320$ m ; phare $+35$ m ; plage $0$ m ; récif $${t(-8)}$ m ; épave $${t(-45)}$ m.`);
  dit(20, `$${croissant(Object.values(alt)).map(t).join(" < ")}$`);
  const plongeuse = -alt.phare;
  vrai("20. plongeuse entre épave et récif", plongeuse < alt.récif && plongeuse > alt.épave);
  dit(20, `$${t(plongeuse)} < ${t(alt.récif)}$`);
  dit(20, `$${t(plongeuse)} > ${t(alt.épave)}$`);
  dit(20, "$-45 < -8$");
  const [, , , points] = dessin("axeVertical", 20);
  vrai("20. l'axe porte les six altitudes", memes(points.map((p) => p.value), [...Object.values(alt), plongeuse]));
});

f.fin();
