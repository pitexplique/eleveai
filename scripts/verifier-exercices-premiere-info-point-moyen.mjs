// Recalcul indépendant de la feuille « Le point moyen » (1re, 28/09/2026) :
// lib/fiches-exercices/maths-premiere-info-point-moyen.tsx.
// G est recalculé à partir des points DESSINÉS (`repere(…)`), du tableau relu
// (`tableauProba`) ou des couples écrits dans l'énoncé — jamais recopié. On
// contrôle ensuite : G écrit dans le corrigé, G placé dans le schéma (marque
// « G »), G sur AUCUN point du nuage (le fil de la feuille), et chaque droite
// relue dans `repere()` évaluée en G.
// Usage : node scripts/verifier-exercices-premiere-info-point-moyen.mjs

import { demarrer } from "./verifier-exercices-premiere-info-outils.mjs";

const V = demarrer("lib/fiches-exercices/maths-premiere-info-point-moyen.tsx", "info_point_moyen");
const { verif, vrai, dit, appels, bloc, e, c, tableauxDe, moyenne, ecrit } = V;

const reperes = (k) => appels("repere", bloc(k));
/** Les points du nuage (sans la marque « G ») du i-ième repère de l'exercice k. */
const nuage = (k, i = 0) => reperes(k)[i][2].filter((p) => !p.label).map((p) => [p.x, p.y]);
const marqueG = (k, i = 0) => reperes(k)[i][2].find((p) => p.label === "G");
const couples = (t) => [...t.matchAll(/\((-?\d+(?:\{,\}\d+)?) ; (-?\d+(?:\{,\}\d+)?)\)/g)].map((m) => [m[1], m[2]].map((s) => Number(s.replace("{,}", "."))));
const G = (pts) => [moyenne(pts.map((p) => p[0])), moyenne(pts.map((p) => p[1]))];
/** G recalculé, écrit « G(x ; y) » dans le corrigé, et sur aucun point du nuage. */
const controleG = (k, pts, attendu, nom = "G") => {
  const [gx, gy] = G(pts);
  verif(`E${k} ${nom} abscisse`, gx, attendu[0]);
  verif(`E${k} ${nom} ordonnée`, gy, attendu[1]);
  dit(k, `${nom}(${ecrit(gx)} ; ${ecrit(gy)})`);
  vrai(`E${k} ${nom} n'est aucun point du nuage`, !pts.some(([x, y]) => x === gx && y === gy));
};
/** Le G placé dans le schéma est-il le bon ? */
const placeG = (k, attendu, i = 0) => {
  const m = marqueG(k, i);
  vrai(`E${k} G placé en (${attendu})`, !!m && m.x === attendu[0] && m.y === attendu[1]);
};
/** La droite `q: [0, a, b]` passe-t-elle par G ? */
const droite = (q) => (x) => q[1] * x + q[2];
const passe = (k, q, g, attendu = true) => vrai(`E${k} y = ${q[1]}x + ${q[2]} ${attendu ? "passe" : "ne passe pas"} par G`, Math.abs(droite(q)(g[0]) - g[1]) < 1e-9 === attendu);
const lignesTableau = (k) => {
  const [t] = tableauxDe(k);
  return t.entetes.slice(1).map((x, j) => [Number(x), Number(t.lignes[0][j + 1])]);
};

/* ═══════════════ ★ ═══════════════ */
{
  const d = lignesTableau(1);
  controleG(1, d, [5, 2]);
  dit(1, "\\dfrac{20}{4} = 5", "\\dfrac{8}{4} = 2");
}
{
  const d = nuage(2);
  controleG(2, d, [3, 4]);
  vrai("E2 a", JSON.stringify(couples(c(2)).slice(0, 4)) === JSON.stringify(d));
  const s = nuage(2, 0);
  vrai("E2 le schéma reprend le nuage", JSON.stringify(nuage(2, 1)) === JSON.stringify(s));
  placeG(2, [3, 4], 1);
}
{
  const d = couples(e(3)).slice(0, 5);
  controleG(3, d, [3, 3]);
  vrai("E3 B = G", /B\(3 ; 3\)/.test(e(3)));
  vrai("E3 A est le point du milieu", d[2][0] === 3 && d[2][1] === 5);
  vrai("E3 C est un point du nuage", d.some(([x, y]) => x === 4 && y === 4));
  vrai("E3 schéma", JSON.stringify(nuage(3)) === JSON.stringify(d));
  placeG(3, [3, 3]);
}
{
  const g = [3, 7];
  passe(4, [0, 2, 1], g);
  passe(4, [0, 3, -1], g, false);
  verif("E4 3x − 1 en 3", 3 * 3 - 1, 8);
  const [[, courbes]] = reperes(4);
  passe(4, courbes[0].q, g);
  placeG(4, g);
}
{
  const ca = [12, 15, 14, 18, 16];
  controleG(5, ca.map((v, i) => [i + 1, v]), [3, 15]);
  dit(5, "\\dfrac{75}{5} = 15", "$15\\,000$ €");
}
{
  const connues = [5, 7, 11];
  const manquante = 4 * 8 - connues.reduce((s, x) => s + x);
  verif("E6 valeur effacée", manquante, 9);
  verif("E6 x moyen", moyenne([1, 2, 3, 4]), 2.5);
  dit(6, "$32 - 23 = 9$");
  const d = nuage(6);
  vrai("E6 dessin : les km dans l'ordre, valeur retrouvée comprise", JSON.stringify(d) === JSON.stringify([[1, 5], [2, 7], [3, manquante], [4, 11]]));
  controleG(6, d, [2.5, 8]);
  placeG(6, [2.5, 8]);
}
{
  // Exercice 5 : la colonne « Moyenne » du tableau est recalculée.
  const [t] = tableauxDe(5);
  const vals = t.lignes[0].slice(1, 6).map(Number);
  vrai("E5 dessin : les cinq CA de l'énoncé", vals.join() === "12,15,14,18,16");
  verif("E5 dessin : moyenne", moyenne(vals), Number(t.lignes[0][6]));
}
{
  const [t] = tableauxDe(15);
  const vals = t.lignes[0].slice(1, 6).map(Number);
  vrai("E15 dessin : populations de l'énoncé", vals.join() === "20,22,24,28,31");
  verif("E15 dessin : moyenne", moyenne(vals), Number(t.lignes[0][6]));
  vrai("E15 dessin : la case de 2010 en évidence n'est pas la moyenne", vals[2] !== moyenne(vals));
}
{
  const b = 5 - 0.5 * 4;
  verif("E7 b", b, 3);
  const [[, courbes]] = reperes(7);
  vrai("E7 dessin", courbes[0].q.join() === `0,0.5,${b}`);
  passe(7, courbes[0].q, [4, 5]);
  placeG(7, [4, 5]);
}
{
  const d = nuage(8);
  controleG(8, d, [3, 3]);
  vrai("E8 schéma", JSON.stringify(nuage(8, 1)) === JSON.stringify(d));
  placeG(8, [3, 3], 1);
  dit(8, "$30$ €", "$300$ spectateurs");
}

/* ═══════════════ ★★ ═══════════════ */
{
  const d = nuage(9);
  controleG(9, d, [3, 4]);
  vrai("E9 le point de la semaine 3", d.some(([x, y]) => x === 3 && y === 3));
  vrai("E9 schéma", JSON.stringify(nuage(9, 1)) === JSON.stringify(d));
  placeG(9, [3, 4], 1);
}
{
  const d = nuage(10);
  controleG(10, d, [3, 4]);
  const [[, courbes]] = reperes(10);
  const [bleue, orange] = courbes.map((x) => x.q);
  vrai("E10 bleue y = 2x − 2", bleue.join() === "0,2,-2");
  vrai("E10 orange y = x + 2", orange.join() === "0,1,2");
  passe(10, bleue, [3, 4]);
  passe(10, orange, [3, 4], false);
}
{
  const d = lignesTableau(11);
  controleG(11, d, [3, 5]);
  vrai("E11 schéma = tableau", JSON.stringify(nuage(11)) === JSON.stringify(d));
  placeG(11, [3, 5]);
  dit(11, "$3\\,000$ €", "$50\\,000$ €", "\\dfrac{18}{6} = 3", "\\dfrac{30}{6} = 5");
}
{
  const connus = [[2, 3], [3, 6], [5, 7]];
  const quatrieme = [4 * 4 - connus.reduce((s, p) => s + p[0], 0), 4 * 6 - connus.reduce((s, p) => s + p[1], 0)];
  vrai("E12 quatrième point (6 ; 8)", quatrieme.join() === "6,8");
  dit(12, "$(6 ; 8)$");
  const d = nuage(12);
  vrai("E12 schéma", JSON.stringify(d) === JSON.stringify([...connus, quatrieme]));
  controleG(12, d, [4, 6]);
  placeG(12, [4, 6]);
}
{
  const d = couples(e(13)).slice(0, 5);
  controleG(13, d, [2, 8]);
  vrai("E13 schéma", JSON.stringify(nuage(13)) === JSON.stringify(d));
  const pente = (8 - 4) / (2 - 0);
  verif("E13 coefficient", pente, 2);
  const [[, courbes]] = reperes(13);
  vrai("E13 droite dessinée y = 2x + 4", courbes[0].q.join() === `0,${pente},4`);
  passe(13, courbes[0].q, [2, 8]);
  placeG(13, [2, 8]);
  dit(13, "$y = 2x + 4$");
}
{
  const d = nuage(14);
  controleG(14, d, [3, 5]);
  controleG(14, d.slice(0, 4), [2.5, 3.5], "G'");
  vrai("E14 le point exceptionnel", d[4][1] === 11);
}
{
  // Les populations sont relues dans l'énoncé : « $20$ en $2000$ ».
  const d = [...e(15).matchAll(/\$(\d+)\$ en \$(\d{4})\$/g)].map((m) => [(Number(m[2]) - 2000) / 5, Number(m[1])]);
  verif("E15 cinq relevés", d.length, 5);
  controleG(15, d, [2, 25]);
  passe(15, [0, 2.8, 19.4], [2, 25]);
  // La droite du tableur est bien celle des moindres carrés (pente et ordonnée).
  const [gx, gy] = G(d);
  const pente = d.reduce((s, [x, y]) => s + (x - gx) * (y - gy), 0) / d.reduce((s, [x]) => s + (x - gx) ** 2, 0);
  verif("E15 pente du tableur", pente, 2.8);
  verif("E15 ordonnée du tableur", gy - pente * gx, 19.4);
  vrai("E15 énoncé : y = 2,8x + 19,4", e(15).includes("$y = 2{,}8x + 19{,}4$"));
  dit(15, "$2{,}8 \\times 2 + 19{,}4 = 5{,}6 + 19{,}4 = 25$", "$2\\,800$ habitants");
}
{
  const d = nuage(16);
  controleG(16, d, [4, 6]);
  const [[, [tom]]] = reperes(16);
  vrai("E16 Tom y = x + 3", tom.q.join() === "0,1,3");
  passe(16, tom.q, [4, 6], false);
  verif("E16 au-dessus de G", droite(tom.q)(4) - 6, 1);
  const corrigee = reperes(16)[1][1][0].q;
  vrai("E16 corrigée y = x + 2", corrigee.join() === "0,1,2");
  passe(16, corrigee, [4, 6]);
  vrai("E16 même coefficient", corrigee[1] === tom.q[1]);
  placeG(16, [4, 6], 1);
}

/* ═══════════════ ★★★ ═══════════════ */
{
  const d = couples(e(17)).slice(0, 5);
  controleG(17, d, [2, 3]);
  vrai("E17 schéma", JSON.stringify(nuage(17)) === JSON.stringify(d));
  const [[, courbes]] = reperes(17);
  const [ines, hugo] = courbes.map((x) => x.q);
  vrai("E17 Inès", ines.join() === "0,1.2,0.6");
  vrai("E17 Hugo", hugo.join() === "0,-1,5");
  passe(17, ines, [2, 3]);
  passe(17, hugo, [2, 3]);
  const rr = (() => {
    const [mx, my] = G(d);
    return d.reduce((s, [x, y]) => s + (x - mx) * (y - my), 0);
  })();
  vrai("E17 nuage croissant, Inès monte, Hugo descend", rr > 0 && ines[1] > 0 && hugo[1] < 0);
  verif("E17 d par an (mm)", (1.2 * 10) / 5, 2.4);
  placeG(17, [2, 3]);
}
{
  const d = lignesTableau(18);
  controleG(18, d, [10, 12]);
  passe(18, [0, 1.5, -3], [10, 12]);
  passe(18, [0, 2, -7], [10, 12], false);
  verif("E18 c", 1.5 * 100, 150);
  dit(18, "$1\\,200$ kW", "$150$ kW");
}
{
  const [nA, gA, nB, gB] = [4, [2, 3], 6, [7, 8]];
  const g = [(nA * gA[0] + nB * gB[0]) / (nA + nB), (nA * gA[1] + nB * gB[1]) / (nA + nB)];
  vrai("E19 G(5 ; 6)", g.join() === "5,6");
  dit(19, "$G(5 ; 6)$", "$(4{,}5 ; 5{,}5)$", "$4 \\times 2 = 8$", "$6 \\times 7 = 42$");
  const m = reperes(19)[0][2];
  const lu = (l) => m.find((p) => p.label === l);
  vrai("E19 schéma A, B, G", lu("A").x === 2 && lu("A").y === 3 && lu("B").x === 7 && lu("B").y === 8 && lu("G").x === 5 && lu("G").y === 6);
  vrai("E19 G sur [GA GB]", (g[0] - 2) * (8 - 3) === (g[1] - 3) * (7 - 2));
  vrai("E19 plus près de GB", Math.hypot(g[0] - 7, g[1] - 8) < Math.hypot(g[0] - 2, g[1] - 3));
}
{
  const d = couples(e(20)).slice(0, 5);
  controleG(20, d, [4, 8]);
  vrai("E20 schéma", JSON.stringify(nuage(20)) === JSON.stringify(d));
  const [[, [ligne]]] = reperes(20);
  vrai("E20 droite", ligne.q.join() === "0,1.1,3.6");
  passe(20, ligne.q, [4, 8]);
  placeG(20, [4, 8]);
  const attendus = d.map(([x]) => Math.round(droite(ligne.q)(x) * 100) / 100);
  verif("E20 prix attendus", attendus.join(), "4.7,5.8,8,9.1,12.4");
  const ecarts = d.map(([, y], i) => Math.round((y - attendus[i]) * 100) / 100);
  verif("E20 écarts", ecarts.join(), "-0.7,0.2,-1,0.9,0.6");
  vrai("E20 plus cher : 50 Go", d[ecarts.indexOf(Math.max(...ecarts))][0] === 5);
  vrai("E20 plus avantageux : 40 Go", d[ecarts.indexOf(Math.min(...ecarts))][0] === 4);
}

V.reglesDeRendu();
V.finir();
