// Recalcul indépendant de la feuille « La demi-droite graduée » de 6e (30/09/2026) :
// lib/fiches-exercices/maths-6e-demi-droite-graduee.tsx.
//
// ⭐ Les nombres sont relus dans l'ÉNONCÉ ou dans le DESSIN (demiDroite,
// segmentGradue), jamais recopiés ici : le script calcule ce que vaut une
// graduation, compte les graduations, écrit les fractions, puis cherche la
// réponse dans le corrigé. Un dessin qui ne porte pas les nombres de l'énoncé :
// ça se voit.
// ⭐ Consigne de Frédéric (30/09) : des phrases de 12 mots en moyenne, 20 au
// plus. Le script compte les mots de chaque phrase des énoncés et des corrigés.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-6e-demi-droite-graduee.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-demi-droite-graduee.tsx", "demi_droite_graduee", ["demiDroite", "segmentGradue"], "6e");
const { c, e, vrai, verif, dit, enonceDit, dessin, appels, essai, feuille } = f;

/** « 1{,}5 », « 2,5 » → nombre. */
const nb = (s) => Number(String(s).replace(/\{,\}/g, ".").replace(",", ".").replace(/\$/g, "").trim());
const r9 = (x) => Math.round(x * 1e9) / 1e9;
/** Comme la feuille l'écrit dans un dessin : « 1,5 ». */
const svg = (v) => String(r9(v)).replace(".", ",");
const fr = (n, d) => `$\\dfrac{${n}}{${d}}$`;
const memes = (a, b) => JSON.stringify([...a].map(r9).sort((x, y) => x - y)) === JSON.stringify([...b].map(r9).sort((x, y) => x - y));
const sur = (v, pas, depuis = 0) => Math.abs((v - depuis) / pas - Math.round((v - depuis) / pas)) < 1e-9;

/* ═════ Les dessins, chacun pour lui-même ═════ */
for (const { args } of appels("demiDroite").filter((a) => a.args)) {
  const [min, max, pas, points, opts = {}] = args;
  const nombres = opts.nombres ?? pas;
  const ecrits = [];
  for (let k = 0; min + k * pas <= max + 1e-9; k++) {
    const v = r9(min + k * pas);
    if (sur(v, nombres)) ecrits.push(v);
  }
  vrai(`demiDroite [${min} ; ${max}] : une DEMI-droite, rien sous zéro`, min >= 0);
  vrai(`demiDroite [${min} ; ${max}] : ${ecrits.length} nombres écrits, de 2 à 11`, ecrits.length >= 2 && ecrits.length <= 11);
  const ecart = (nombres / (max - min)) * 252;
  const large = Math.max(...ecrits.map((v) => svg(v).length));
  vrai(`demiDroite [${min} ; ${max}] : les nombres écrits ne se touchent pas (${Math.round(ecart)} px)`, ecart >= large * 8.6 + 4);
  vrai(`demiDroite [${min} ; ${max}] : pas plus de 60 graduations`, (max - min) / pas <= 60);
  for (const p of points) vrai(`demiDroite [${min} ; ${max}] : point ${p.value} dans le cadre`, p.value >= min && p.value <= max);
  for (const s of opts.sauts ?? []) vrai(`demiDroite [${min} ; ${max}] : saut ${s.de} → ${s.vers} dans le cadre`, [s.de, s.vers].every((v) => v >= min && v <= max));
}
/** Deux étiquettes centrées en a et b (en px), de n et m signes : elles ne se touchent pas. */
const libres = (a, n, b, m) => Math.abs(a - b) >= ((n + m) * 8.6) / 2 + 3;
for (const { args } of appels("segmentGradue").filter((a) => a.args)) {
  const [longueur, parts, bas, points = [], unite = "cm"] = args;
  vrai(`segmentGradue ${longueur} ${unite} : un nom par trait (${bas.length} pour ${parts + 1})`, bas.length === parts + 1);
  const xk = (k) => 22 + (k * 256) / parts;
  const noms = bas.map((s, k) => ({ s, x: xk(k) })).filter((o) => o.s);
  for (let i = 1; i < noms.length; i++) vrai(`segmentGradue ${longueur} : « ${noms[i - 1].s} » et « ${noms[i].s} » ne se touchent pas`, libres(noms[i - 1].x, noms[i - 1].s.length, noms[i].x, noms[i].s.length));
  const px = points.map((p) => ({ s: p.label, x: 22 + (p.cm / longueur) * 256 })).sort((a, b) => a.x - b.x);
  for (let i = 1; i < px.length; i++) vrai(`segmentGradue ${longueur} : points « ${px[i - 1].s} » et « ${px[i].s} » séparés`, libres(px[i - 1].x, px[i - 1].s.length, px[i].x, px[i].s.length));
  for (const p of points) vrai(`segmentGradue ${longueur} : point ${p.cm} sur le segment`, p.cm >= 0 && p.cm <= longueur);
}

/* ═════ Phrases courtes (Frédéric, 30/09 : « ils ont parfois du mal à LIRE ») ═════ */
{
  const phrases = [...feuille.enonces, ...feuille.corrections]
    .flatMap((txt) => txt.split("\\n"))
    .flatMap((l) => l.split(/(?<=[.!?])\s+| ; /))
    .map((p) => ({ p, n: p.replace(/\$[^$]*\$/g, "F").split(/\s+/).filter((m) => /[\p{L}\dF]/u.test(m)).length }))
    .filter((x) => x.n > 0);
  const moyenne = phrases.reduce((s, x) => s + x.n, 0) / phrases.length;
  console.log(`phrases : ${phrases.length}, ${moyenne.toFixed(1)} mots en moyenne, la plus longue ${Math.max(...phrases.map((x) => x.n))}`);
  vrai(`phrases de 13 mots en moyenne au plus (${moyenne.toFixed(1)})`, moyenne <= 13);
  for (const x of phrases) vrai(`phrase de ${x.n} mots, 20 au plus : « ${x.p.slice(0, 70)}… »`, x.n <= 20);
}

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
/** « A$(3)$, B$(7)$ » : la réponse d'une lecture d'abscisses. */
const lus = (pts) => pts.map((p) => `${p.label}$(${t(p.value)})$`).join(", ");

essai("1", () => {
  const [min, max, pas, points, { nombres }] = dessin("demiDroite", 1, "figure");
  const cases = nombres / pas;
  dit(1, `Entre $0$ et $${nombres}$, je compte $${cases}$ cases.`);
  dit(1, `Une graduation vaut donc $${nombres} \\div ${cases} = ${t(pas)}$.`);
  for (const p of points) {
    const base = Math.floor(p.value / nombres) * nombres;
    vrai(`1. ${p.label} à une graduation d'un nombre écrit`, r9(p.value - base) === pas && min === 0 && max === 10);
    dit(1, `${p.label} est une graduation après $${base}$ : $${base} + ${t(pas)} = ${t(p.value)}$.`);
  }
  dit(1, `Réponse : ${lus(points)}.`);
});
essai("2", () => {
  const [, , pas, points, { nombres }] = dessin("demiDroite", 2, "figure");
  verif("2. une graduation = un dixième", pas, 1 / 10);
  dit(2, `Une graduation vaut $1 \\div 10 = ${t(pas)}$.`);
  const [D, E, F] = points;
  dit(2, `$${Math.round(D.value / pas)} \\times ${t(pas)} = ${t(D.value)}$`);
  dit(2, `$${t(nombres)} + ${t(r9(E.value - nombres))} = ${t(E.value)}$`);
  verif("2. E à 2 graduations après 0,5", r9(E.value - nombres) / pas, 2);
  verif("2. F à 1 graduation avant 1", r9(1 - F.value) / pas, 1);
  dit(2, `à $1$ graduation avant $1$ : $${t(F.value)}$`);
  dit(2, `Réponse : ${lus(points)}.`);
});
essai("3", () => {
  const coords = Object.fromEntries([...e(3).matchAll(/([A-Z])\$\(([^)]*)\)\$/g)].map((m) => [m[1], nb(m[2])]));
  enonceDit(3, "Prends $2$ carreaux pour une unité.");
  const [, , pas, points] = dessin("demiDroite", 3, "schema");
  verif("3. un carreau = une graduation = 0,5", pas, 1 / 2);
  vrai("3. trois points placés, ceux de l'énoncé", points.length === 3 && points.every((p) => coords[p.label] === p.value));
  vrai("3. G et K au milieu de deux entiers", sur(coords.G - 0.5, 1) && sur(coords.K - 0.5, 1));
  dit(3, `Le 3e trait n'est pas $3$ : c'est $${t(3 * pas)}$.`);
});
essai("4", () => {
  const [, , pas, points] = dessin("demiDroite", 4, "figure");
  verif("4. une graduation = un tiers", pas * 3, 1);
  const n = points.map((p) => Math.round(p.value * 3));
  points.forEach((p, i) => verif(`4. ${p.label} sur une graduation`, p.value * 3, n[i]));
  points.forEach((p, i) => dit(4, `${p.label} est à $${n[i]}$ graduations : ${fr(n[i], 3)}`));
  dit(4, `Réponse : ${points.map((p, i) => `${p.label} : ${fr(n[i], 3)}`).join(" ; ")}.`);
  vrai("4. deux fractions dépassent 1", n.filter((k) => k > 3).length === 2);
});
essai("5", () => {
  const [L, parts] = [...e(5).matchAll(/\$(\d+)\$/g)].map((m) => Number(m[1]));
  const part = L / parts;
  dit(5, `$${L} \\div ${parts} = ${part}$ cm.`);
  const traits = Array.from({ length: parts - 1 }, (_, k) => (k + 1) * part);
  dit(5, `J'ajoute $${part}$ cm à chaque fois : ${traits.map((v) => `$${v}$ cm`).join(", ")}.`);
  dit(5, `Réponse : a) $${part}$ cm ; b) à ${traits.map((v) => `$${v}$`).join(", ").replace(/, (\$\d+\$)$/, " et $1")} cm ; c) $${parts - 1}$ traits.`);
  const [l2, p2, bas] = dessin("segmentGradue", 5);
  vrai("5. le segment de l'énoncé", l2 === L && p2 === parts);
  vrai("5. les traits nommés en cm", bas.every((s, k) => s === (k === 0 ? "0" : `${k * part} cm`)));
});
essai("6", () => {
  const xs = e(6).split("\\n").slice(1).map((l) => nb(l.match(/\$([^$]*)\$/)[1]));
  const place = (x) => {
    const bas = Math.floor(x / 0.5) * 0.5;
    return sur(x, 0.5) ? `sur $${t(x)}$` : `entre $${t(bas)}$ et $${t(bas + 0.5)}$`;
  };
  dit(6, `Réponse : ${xs.map((x, i) => `${"abcd"[i]}) ${place(x)}`).join(" ; ")}.`);
  const [, , pas, points] = dessin("demiDroite", 6);
  vrai("6. la droite de l'énoncé, de 0,5 en 0,5", pas === 0.5);
  vrai("6. la droite porte les quatre nombres", memes(points.map((p) => p.value), xs) && points.every((p) => p.label === svg(p.value)));
});
essai("7", () => {
  const [, max, pas, points, { nombres }] = dessin("demiDroite", 7, "figure");
  const cases = nombres / pas;
  dit(7, `Entre $0$ et $${nombres}$, je compte $${cases}$ cases.`);
  dit(7, `Une graduation vaut $${nombres} \\div ${cases} = ${pas}$.`);
  const [P, Q, R] = points;
  dit(7, `$${P.value / pas} \\times ${pas} = ${P.value}$`);
  dit(7, `$${nombres} + ${pas} = ${Q.value}$`);
  dit(7, `$${max} - ${pas} = ${R.value}$`);
  vrai("7. P, Q, R aux places dites", P.value / pas === 2 && Q.value === nombres + pas && R.value === max - pas);
  dit(7, `Réponse : ${lus(points)}.`);
});
essai("8", () => {
  const fracs = Object.fromEntries([...e(8).matchAll(/([A-D]) d'abscisse \$\\dfrac\{(\d+)\}\{(\d+)\}\$/g)].map((m) => [m[1], [Number(m[2]), Number(m[3])]]));
  vrai("8. quatre fractions en quarts", Object.values(fracs).length === 4 && Object.values(fracs).every(([, d]) => d === 4));
  const [, , pas, points] = dessin("demiDroite", 8);
  verif("8. une graduation = un quart", pas, 1 / 4);
  vrai("8. chaque point à sa fraction", points.every((p) => r9(fracs[p.label][0] / 4) === p.value));
  for (const [nom, [n]] of Object.entries(fracs)) dit(8, `${nom} : $${n}$ quarts.`.replace(".", n === 8 ? "," : "."));
  vrai("8. D = 2 unités", fracs.D[0] / 4 === 2);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const [, max, pas, points] = dessin("demiDroite", 9, "figure");
  enonceDit(9, `Un sentier de $${max}$ km`);
  verif("9. une graduation = un quart", pas, 1 / 4);
  const refuge = points.find((p) => p.label === "refuge").value, cascade = points.find((p) => p.label === "cascade").value;
  const k = (refuge - Math.floor(refuge)) / pas;
  dit(9, `$${Math.floor(refuge)} + ${k} \\times ${t(pas)} = ${t(refuge)}$ km`);
  dit(9, `je compte $${refuge / pas}$ quarts : ${fr(refuge / pas, 4)} km`);
  const n = r9(cascade - refuge) / pas;
  dit(9, `je compte $${n}$ graduations : $${n} \\times ${t(pas)} = ${t(r9(cascade - refuge))}$ km`);
  dit(9, `Réponse : a) ${fr(1, 4)} km $= ${t(pas)}$ km ; b) $${t(refuge)}$ km et $${t(cascade)}$ km ; c) ${fr(refuge / pas, 4)} km ; d) $${t(r9(cascade - refuge))}$ km.`);
  const [, , , , { sauts }] = dessin("demiDroite", 9, "schema");
  vrai("9. l'arc va du refuge à la cascade", sauts[0].de === refuge && sauts[0].vers === cascade && nb(sauts[0].label.replace(" km", "")) === r9(cascade - refuge));
});
essai("10", () => {
  const dates = [...e(10).matchAll(/\$(19\d\d)\$,/g)].map((m) => Number(m[1]));
  vrai(`10. trois dates lues (${dates})`, dates.length === 3);
  enonceDit(10, "une graduation tous les $10$ ans");
  const proche = dates.reduce((a, b) => (Math.abs(b - 1950) < Math.abs(a - 1950) ? b : a));
  dit(10, `Réponse : b) $${proche}$`);
  dit(10, `De $${proche}$ à $1950$, il y a $${1950 - proche}$ ans.`);
  dit(10, `$${dates[0]}$ est entre $${Math.floor(dates[0] / 10) * 10}$ et $${Math.floor(dates[0] / 10) * 10 + 10}$. Il est $${dates[0] % 10}$ ans après`);
  const [min, max, pas, points] = dessin("demiDroite", 10);
  vrai("10. la frise de 1900 à 2000, de 10 en 10", min === 1900 && max === 2000 && pas === 10);
  vrai("10. la frise porte les trois dates", memes(points.map((p) => p.value), dates) && points.every((p) => p.label === String(p.value)));
  vrai("10. aucune date sur un trait", dates.every((d) => d % 10 !== 0));
});
essai("11", () => {
  const [, , pas, points] = dessin("demiDroite", 11, "figure");
  verif("11. une graduation = un cinquième", pas, 1 / 5);
  dit(11, `Et $1 \\div 5 = ${t(pas)}$.`);
  const n = points.map((p) => Math.round(p.value * 5));
  points.forEach((p, i) => dit(11, `${p.label} : $${n[i]}$ graduations, donc ${fr(n[i], 5)}.`));
  vrai("11. B et C dépassent 1, pas A", n[0] < 5 && n[1] > 5 && n[2] > 5);
  const C = points[2];
  dit(11, `$${n[2]} \\times ${t(pas)} = ${t(C.value)}$. Donc $\\dfrac{${n[2]}}{5} = ${t(C.value)}$.`);
});
essai("12", () => {
  const [L, a, b] = [...e(12).matchAll(/\$(\d+)\$/g)].map((m) => Number(m[1]));
  vrai("12. 12 cm, de 0 à 3", L === 12 && a === 0 && b === 3);
  const u = L / b;
  dit(12, `Une unité mesure $${L} \\div ${b} = ${u}$ cm.`);
  const coords = Object.fromEntries([...e(12).matchAll(/([A-C])\$\(([^)]*)\)\$/g)].map((m) => [m[1], nb(m[2])]));
  const cm = Object.fromEntries(Object.entries(coords).map(([k, v]) => [k, r9(v * u)]));
  dit(12, `Réponse : a) $${u}$ cm ; b) $${u}$ cm et $${2 * u}$ cm ; c) A à $${cm.A}$ cm, B à $${cm.B}$ cm, C à $${cm.C}$ cm.`);
  dit(12, `C est à $${2 * u} + ${u / 4} = ${cm.C}$ cm.`);
  const [l2, parts, bas, points] = dessin("segmentGradue", 12);
  vrai("12. le segment de 12 cm, une graduation par cm", l2 === L && parts === L);
  vrai("12. les nombres 0, 1, 2, 3 tous les 4 cm", bas.every((s, k) => s === (k % u === 0 ? String(k / u) : "")));
  vrai("12. A, B, C posés aux bons cm", points.every((p) => cm[p.label] === p.cm) && points.length === 3);
});
essai("13", () => {
  const [, , pas, points] = dessin("demiDroite", 13, "figure");
  const [A, B] = points;
  enonceDit(13, `« A a pour abscisse $${A.value / pas}$, car il est sur le 3e trait. Et B a pour abscisse $${B.value / pas}$. »`);
  dit(13, `Une graduation vaut $1 \\div 4 = ${t(pas)}$.`);
  dit(13, `$${A.value / pas} \\times ${t(pas)} = ${t(A.value)}$`);
  dit(13, `$${B.value / pas} \\times ${t(pas)} = ${t(B.value)}$`);
  const C = nb(e(13).match(/d'abscisse \$([^$]*)\$/)[1]);
  dit(13, `$${t(C)} = 1 + ${t(pas)}$`);
  const [, , , pts] = dessin("demiDroite", 13, "schema");
  vrai("13. la correction place C", pts.some((p) => p.label === "C" && p.value === C));
});
essai("14", () => {
  const fracs = [...e(14).matchAll(/([A-D]) d'abscisse \$\\dfrac\{(\d+)\}\{(\d+)\}\$/g)].map((m) => ({ nom: m[1], n: Number(m[2]), d: Number(m[3]), v: Number(m[2]) / Number(m[3]) }));
  vrai("14. quatre fractions", fracs.length === 4);
  const tries = [...fracs].sort((a, b) => a.v - b.v);
  dit(14, `Réponse : $${tries.map((x) => `\\dfrac{${x.n}}{${x.d}}`).join(" < ")}$.`);
  dit(14, `De gauche à droite, je lis ${tries.map((x) => x.nom).join(", ")}.`);
  const a15 = fracs.find((x) => x.v === 1.5);
  dit(14, `$4 + 2 = 6$ quarts : c'est ${a15.nom}.`);
  const [, , pas, points] = dessin("demiDroite", 14);
  verif("14. graduée en quarts", pas, 0.25);
  vrai("14. chaque point à sa fraction", points.every((p) => fracs.find((x) => x.nom === p.label).v === p.value));
});
essai("15", () => {
  const [, , pas, points, { nombres }] = dessin("demiDroite", 15, "figure");
  const cases = nombres / pas;
  dit(15, `Entre $0$ et $${nombres}$, je compte $${cases}$ cases. Une graduation vaut $${nombres} \\div ${cases} = ${pas}$ g.`);
  const farine = points[0].value;
  dit(15, `$${farine - pas} + ${pas} = ${farine}$ g.`);
  const [sucre, beurre] = [...e(15).matchAll(/\$(\d+)\$ g de (sucre|beurre)/g)].map((m) => Number(m[1]));
  vrai("15. le sucre tombe sur un trait, pas le beurre", sur(sucre, pas) && !sur(beurre, pas));
  dit(15, `$${sucre} = 200 + ${pas}$.`);
  const bas = Math.floor(beurre / pas) * pas;
  dit(15, `$${beurre}$ est au milieu de $${bas}$ et $${bas + pas}$.`);
  verif("15. le beurre au milieu", beurre, bas + pas / 2);
  dit(15, `Réponse : a) $${pas}$ g ; b) $${farine}$ g ; c) sur la graduation $${sucre}$, puis entre $${bas}$ et $${bas + pas}$.`);
  const [, , , pts] = dessin("demiDroite", 15, "schema");
  vrai("15. le cadran porte les trois pesées", memes(pts.map((p) => p.value), [farine, sucre, beurre]));
});
essai("16", () => {
  const [L, ecart, ecart2] = [...e(16).matchAll(/\$(\d+)\$ m/g)].map((m) => Number(m[1]));
  const parts = L / ecart, parts2 = L / ecart2;
  dit(16, `$${L} \\div ${ecart} = ${parts}$ parts.`);
  dit(16, `Cela fait $${parts + 1}$ piquets`);
  dit(16, `$${L} \\div ${ecart2} = ${parts2}$ parts. Donc $${parts2} + 1 = ${parts2 + 1}$ piquets.`);
  const [l2, p2, bas, , unite] = dessin("segmentGradue", 16);
  vrai("16. la clôture dessinée", l2 === L && p2 === parts && unite === "m" && bas.every((s, k) => s === String(k * ecart)));
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [min, , pas, [leo], { nombres }] = dessin("demiDroite", 17, "figure");
  enonceDit(17, `Il commence à $${min}$ °C.`);
  verif("17. une graduation = 0,1 °C", pas, nombres / 10);
  dit(17, `Léo est $${Math.round((leo.value - Math.floor(leo.value)) / pas)}$ graduations après $${Math.floor(leo.value)}$ : $${t(leo.value)}$ °C.`);
  const jade = nb(e(17).match(/Jade a \$([^$]*)\$/)[1]), pere = nb(e(17).match(/père a \$([^$]*)\$/)[1]);
  const fievre = nb(e(17).match(/au-dessus de \$([^$]*)\$/)[1]);
  vrai("17. Léo et le père ont de la fièvre, pas Jade", leo.value > fievre && pere > fievre && jade <= fievre);
  const moins = nb(e(17).match(/a \$([^$]*)\$ °C de moins/)[1]);
  const lendemain = r9(leo.value - moins);
  dit(17, `$${t(moins)}$ °C, c'est $${Math.round(moins / pas)}$ graduations.`);
  dit(17, `$10$ graduations m'amènent à $${t(r9(leo.value - 1))}$. Encore $${Math.round((moins - 1) / pas)}$ : $${t(lendemain)}$ °C.`);
  dit(17, `Réponse : a) $${t(pas)}$ °C ; b) $${t(leo.value)}$ °C ; d) Léo et son père ; e) $${t(lendemain)}$ °C.`);
  const [, , , pts, { sauts }] = dessin("demiDroite", 17, "schema");
  vrai("17. le thermomètre du corrigé", memes(pts.map((p) => p.value), [jade, leo.value, pere]));
  vrai("17. la flèche du lendemain", sauts[0].de === leo.value && r9(sauts[0].vers) === lendemain && nb(sauts[0].label.replace("−", "")) === moins);
});
essai("18", () => {
  const L = Number(e(18).match(/soit \$(\d+)\$ cm/)[1]);
  const n = Number(e(18).match(/en \$(\d+)\$ morceaux/)[1]);
  const m = L / n;
  dit(18, `$${L} \\div ${n} = ${t(m)}$ cm.`);
  dit(18, `$${n} \\times ${t(m)} = ${L}$.`);
  dit(18, `Il faut $${n} - 1 = ${n - 1}$ marques.`);
  dit(18, `$3 \\times ${t(m)} = ${t(3 * m)}$ cm.`);
  dit(18, `$4 \\times ${t(m)} = ${t(4 * m)}$ cm.`);
  verif("18. la moitié = 50 cm", 4 * m, L / 2);
  dit(18, `Il reste $${n} - 3 = ${n - 3}$ morceaux. C'est ${fr(n - 3, n)} du ruban.`);
  const [l2, p2, bas, points] = dessin("segmentGradue", 18);
  vrai("18. le ruban dessiné", l2 === L && p2 === n && bas[3] === "3/8" && bas[4] === "4/8" && bas[n] === "1");
  vrai("18. la marque des 3/8", points[0].cm === 3 * m && points[0].label === `${svg(3 * m)} cm`);
});
essai("19", () => {
  const [min, max, pas, points, { nombres }] = dessin("demiDroite", 19, "figure");
  enonceDit(19, `de $${min}$ m à $${max}$ m`);
  const pcm = Math.round(pas * 100);
  dit(19, `Une graduation vaut $${t(nombres)} \\div ${Math.round(nombres / pas)} = ${t(pas)}$ m, soit $${pcm}$ cm.`);
  const nina = points.find((p) => p.label === "Nina").value, kylian = points.find((p) => p.label === "Kylian").value;
  const sofia = nb(e(19).match(/Sofia saute \$([^$]*)\$/)[1]);
  vrai("19. Sofia entre deux traits", !sur(sofia, pas, min));
  const ordre = [["Kylian", kylian], ["Sofia", sofia], ["Nina", nina]].sort((a, b) => b[1] - a[1]);
  dit(19, `$${ordre.map((o) => t(o[1])).join(" > ")}$`);
  const vise = nb(e(19).match(/vise \$([^$]*)\$/)[1]);
  const manque = Math.round((vise - kylian) * 100);
  dit(19, `je compte $${manque / pcm}$ graduations : $${manque / pcm} \\times ${pcm} = ${manque}$ cm.`);
  dit(19, `Réponse : a) $${t(pas)}$ m $= ${pcm}$ cm ; b) $${t(nina)}$ m et $${t(kylian)}$ m ; c) entre $5$ et $${t(5 + pas)}$ ; d) ${ordre.map((o) => o[0]).join(", ")} ; e) $${manque}$ cm.`);
  const [, , , pts, { sauts }] = dessin("demiDroite", 19, "schema");
  vrai("19. la correction place Sofia", pts.some((p) => p.label === "Sofia" && p.value === sofia));
  vrai("19. la flèche de ce qui manque", sauts[0].de === kylian && sauts[0].vers === vise && sauts[0].label === `${manque} cm`);
});
essai("20", () => {
  const [min, max, pas] = dessin("demiDroite", 20, "figure");
  const grads = Array.from({ length: Math.round((max - min) / pas) - 1 }, (_, k) => r9(min + (k + 1) * pas));
  const i12 = grads.filter((x) => x - 2 > 3 - x);
  const i3 = i12.filter((x) => Math.round(x * 10) % 2 === 0);
  const i4 = i3.filter((x) => grads.filter((g) => g > x && g < 3).length === 1);
  dit(20, `Il reste $${i12.map(t).join("$ ; $")}$.`);
  dit(20, `Dixièmes pairs : $${i3.map(t).join("$ et $")}$.`);
  vrai(`20. une seule solution (${i4})`, i4.length === 1);
  dit(20, `Réponse : je suis $${t(i4[0])} = \\dfrac{${Math.round(i4[0] * 10)}}{10}$.`);
  const [, , , pts] = dessin("demiDroite", 20, "schema");
  vrai("20. la solution en vert", pts.find((p) => p.value === i4[0])?.color === f.constantes.VERT);
});

f.fin();
