// Recalcul indépendant de la feuille « Les probabilités » de 5e (29/09/2026) :
// lib/fiches-exercices/maths-5e-proba-experience.tsx.
//
// ⭐ L'AUTRE CHEMIN : chaque probabilité est retrouvée en ÉNUMÉRANT le matériel
// DESSINÉ, relu dans le source — les billes une à une (`billes`), les secteurs
// de la roue (`roue`), les faces du patron (`patron`), les cases des tableaux
// (`tableau`, `tableauProba`), les barres (`diagramme`) — en fractions exactes,
// puis cherchée dans le corrigé. Le calendrier (ex. 1 et 15) est recalculé avec
// l'objet Date de JavaScript.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-5e-proba-experience.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";
import { Q, texFrac, egal, plus } from "./verifier-exercices-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-5e-proba-experience.tsx", "proba_experience", ["roue", "echelle", "patron"]);
const { c, e, vrai, verif, dit, enonceDit, dessin, dessins, essai, constantes: K } = f;

/** « \dfrac{5}{12} », simplifiée ; l'entier sinon. */
const fr = (n, d) => texFrac(Q(n, d));
/** Le brut, non simplifié : « \dfrac{4}{12} ». */
const brut = (n, d) => `\\dfrac{${n}}{${d}}`;
const compte = (xs, test) => xs.filter(test).length;
const secteurs = (k, j = 0, role) => (role ? dessin("roue", k, role) : dessins("roue", k)[j].args)[0];
/** Largeur d'un secteur « égal » : tous les poids égaux ? */
const egaux = (segs) => segs.every((s) => s.poids === segs[0].poids);

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const jour = new Date(2027, 0, 1).getDay();
  vrai("1. le 1er janvier 2027 est un vendredi", jour === 5 && c(1).includes("c'est un vendredi"));
  const [, ligne] = dessin("tableau", 1);
  const attendu = ["aléatoire ?", "oui", "non", "oui", "non", "oui"];
  vrai("1. le tableau dit a, c, e aléatoires", JSON.stringify(ligne) === JSON.stringify(attendu));
  dit(1, "Réponse : aléatoires : a), c) et e) ; pas aléatoires : b) et d).");
});
essai("2", () => {
  const segs = secteurs(2, 0, "figure");
  vrai("2. cinq secteurs égaux numérotés de 1 à 5", egaux(segs) && segs.map((s) => s.label).join() === "1,2,3,4,5");
  const n = segs.map((s) => Number(s.label));
  const A = n.filter((x) => x % 2 === 1), B = n.filter((x) => x > 3);
  dit(2, `Réponse : a) ${n.map((x) => `$${x}$`).join(", ")} ; b) ${A.map((x) => `$${x}$`).join(", ")} ; c) $${B[0]}$ et $${B[1]}$.`);
  dit(2, `A est réalisé par $${A.length}$ issues.`);
  dit(2, `B est réalisé par $${B.length}$ issues.`);
});
essai("3", () => {
  const [bs] = dessin("billes", 3, "figure");
  const n = bs.map((b) => Number(b.label));
  enonceDit(3, "numérotés $2$, $4$, $6$ et $8$");
  vrai("3. jetons 2, 4, 6, 8", n.join() === "2,4,6,8");
  const nature = (test) => (n.every(test) ? "certain" : n.some(test) ? "ni l'un ni l'autre" : "impossible");
  const r = [nature((x) => x % 2 === 0), nature((x) => x === 5), nature((x) => x > 5), nature((x) => x < 10)];
  dit(3, `Réponse : a) ${r[0]} ; b) ${r[1]} ; c) ${r[2]} ; d) ${r[3]}.`);
});
essai("4", () => {
  const [bs] = dessin("billes", 4);
  enonceDit(4, "$6$ billes rouges et $2$ bleues");
  vrai("4. le sac dessiné : 6 rouges puis 2 bleues, numérotées de 1 à 8", compte(bs, (b) => b.couleur === K.ROUGE) === 6 && compte(bs, (b) => b.couleur === K.BLEU) === 2 && bs.map((b) => b.label).join() === "1,2,3,4,5,6,7,8");
  dit(4, "Réponse : a) oui ; b) non ; c) non ; d) oui ; e) non.");
});
essai("5", () => {
  const [surligne] = dessin("de", 5);
  const faces = [1, 2, 3, 4, 5, 6];
  const m3 = faces.filter((x) => x % 3 === 0);
  vrai("5. le dé surligne les multiples de 3", surligne.join() === m3.join());
  dit(5, `$P = ${brut(m3.length, 6)} = ${fr(m3.length, 6)}$`);
  const auMoins2 = compte(faces, (x) => x >= 2);
  dit(5, `$P = ${fr(auMoins2, 6)}$`);
  vrai("5. 1/6 + 5/6 = 1", egal(plus(Q(1, 6), Q(auMoins2, 6)), Q(1)));
  dit(5, `Réponse : a) $${fr(m3.length, 6)}$ ; b) $${fr(1, 6)}$ ; c) $${fr(auMoins2, 6)}$.`);
});
essai("6", () => {
  const [bs] = dessin("billes", 6, "figure");
  const [v, j, n] = [K.VERT, K.JAUNE, K.NOIR].map((col) => compte(bs, (b) => b.couleur === col));
  enonceDit(6, `$${v}$ billes vertes, $${j}$ jaunes et $${n}$ noires`);
  const N = bs.length;
  dit(6, `$${v} + ${j} + ${n} = ${N}$ billes`);
  dit(6, `$${brut(j, N)} = ${fr(j, N)}$ et $${brut(n, N)} = ${fr(n, N)}$`);
  dit(6, `Réponse : $${fr(v, N)}$ ; $${fr(j, N)}$ ; $${fr(n, N)}$.`);
});
essai("7", () => {
  const [pts] = dessin("echelle", 7);
  const v = Object.fromEntries(pts.map((p) => [p.label, p.valeur]));
  const attendu = { a: 1 / 2, b: 1 / 4, c: 0.9, d: 30 / 100, e: 0, f: 1 };
  vrai("7. l'échelle porte les six valeurs de l'énoncé", Object.entries(attendu).every(([k, x]) => Math.abs(v[k] - x) < 1e-12) && pts.length === 6);
  const ordre = Object.entries(attendu).sort((x, y) => x[1] - y[1]);
  dit(7, `Réponse : ${ordre.map(([k, x]) => `${k}) $${t(x)}$`).join(" ; ")}.`);
});
essai("8", () => {
  const [bs] = dessin("billes", 8);
  const r = compte(bs, (b) => b.couleur === K.ROUGE);
  vrai("8. l'urne dessinée : 3 rouges sur 8", r === 3 && bs.length === 8 && egal(Q(r, bs.length), Q(3, 8)));
  dit(8, `$P = ${fr(bs.length - r, bs.length)}$`);
  const r16 = 16 * 3 / 8;
  dit(8, `$\\dfrac{3}{8} = \\dfrac{${r16}}{16}$ : il faut $${r16}$ rouges`);
  dit(8, `Réponse : a) $${r}$ ; b) $${fr(5, 8)}$ ; c) $${r16}$ rouges.`);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const [bs] = dessin("billes", 9);
  const n = bs.map((b) => Number(b.label));
  vrai("9. vingt cartes de 1 à 20, les multiples de 5 en orange", n.join() === Array.from({ length: 20 }, (_, i) => i + 1).join() && bs.every((b) => (b.couleur === K.ORANGE) === (Number(b.label) % 5 === 0)));
  const m5 = compte(n, (x) => x % 5 === 0), deuxCh = compte(n, (x) => x >= 10), fin7 = compte(n, (x) => x % 10 === 7);
  dit(9, `$P = ${brut(m5, 20)} = ${fr(m5, 20)}$`);
  dit(9, `$${deuxCh}$ cartes. $P = ${fr(deuxCh, 20)}$`);
  dit(9, `$P = ${brut(fin7, 20)} = ${fr(fin7, 20)}$`);
  dit(9, `Réponse : a) $20$ issues équiprobables ; b) $${fr(m5, 20)}$ ; c) $${fr(deuxCh, 20)}$ ; d) $${fr(fin7, 20)}$.`);
});
essai("10", () => {
  const segs = secteurs(10, 0, "figure");
  vrai("10. dix secteurs égaux", segs.length === 10 && egaux(segs));
  const [J, V, O] = ["J", "V", "O"].map((l) => compte(segs, (s) => s.label === l));
  vrai("10. couleurs cohérentes avec les lettres", segs.every((s) => s.couleur === { J: K.JAUNE, V: K.VIOLET, O: K.ORANGE }[s.label]));
  dit(10, `Jaune : $${J}$ secteurs, $P = ${brut(J, 10)} = ${fr(J, 10)} = ${t(J / 10)}$.`);
  dit(10, `Violet : $${V}$ secteurs, $P = ${fr(V, 10)} = ${t(V / 10)}$.`);
  dit(10, `Orange : $${O}$ secteurs, $P = ${brut(O, 10)} = ${fr(O, 10)} = ${t(O / 10)}$.`);
  dit(10, `Réponse : jaune $${fr(J, 10)}$, violet $${fr(V, 10)}$, orange $${fr(O, 10)}$ ; c'est le jaune.`);
});
essai("11", () => {
  const [ent, ligne] = dessin("tableau", 11, "figure");
  const [to, ha, co, tot] = ligne.slice(1);
  vrai("11. le total du tableau est la somme", to + ha + co === tot && ent.at(-1) === "total");
  for (const [n, nom] of [[to, "Tournesol"], [ha, "Haricot"], [co, "Courge"]]) dit(11, `${nom} : $${brut(n, tot)} = ${fr(n, tot)} = ${t(n / tot)}$, soit $${(n / tot) * 100}$ %.`);
  dit(11, `$${to} + ${co} = ${to + co}$ boules. $P = ${brut(to + co, tot)} = ${fr(to + co, tot)}$`);
  const [, data] = dessin("diagramme", 11);
  vrai("11. le camembert porte les pourcentages", data.map((d) => d.value).join() === [to, ha, co].map((n) => (n / tot) * 100).join());
});
essai("12", () => {
  const [bs] = dessin("billes", 12);
  const [N, B, R] = ["N", "B", "R"].map((l) => compte(bs, (b) => b.label === l));
  enonceDit(12, `$${N}$ chaussettes noires, $${B}$ blanches et $${R}$ rayées`);
  const T = bs.length;
  dit(12, `$${N} + ${B} + ${R} = ${T}$ issues`);
  dit(12, `$P(\\text{noire}) = ${fr(N, T)}$ ; $P(\\text{blanche}) = ${brut(B, T)} = ${fr(B, T)}$ ; $P(\\text{rayée}) = ${brut(R, T)} = ${fr(R, T)}$.`);
  dit(12, `$${B} + ${R} = ${B + R}$ chaussettes. $P = ${fr(B + R, T)}$.`);
});
essai("13", () => {
  const [A, B] = [secteurs(13, 0), secteurs(13, 1)];
  vrai("13. deux roues à secteurs égaux", egaux(A) && egaux(B));
  const gA = compte(A, (s) => s.label === "G"), gB = compte(B, (s) => s.label === "G");
  vrai("13. G en vert, P en gris", [...A, ...B].every((s) => s.couleur === (s.label === "G" ? K.VERT : K.GRIS)));
  dit(13, `$${A.length}$ secteurs égaux, dont $${gA}$ gagnant. $P_A = ${fr(gA, A.length)}$.`);
  dit(13, `$${B.length}$ secteurs égaux, dont $${gB}$ gagnants. $P_B = ${fr(gB, B.length)}$.`);
  vrai("13. B vaut mieux", gB / B.length > gA / A.length);
  dit(13, `($${A.length - gA}$ contre $${B.length - gB}$)`);
  dit(13, `$3 \\div 8 = ${t(gB / B.length)} \\approx 0{,}38$`);
  dit(13, `$1 \\div 3 \\approx ${t(Math.round((gA / A.length) * 100) / 100)}$`);
});
essai("14", () => {
  const [, lignes] = dessin("tableauProba", 14);
  const noms = ["musée", "zoo", "parc", "plage", "château"];
  const E = ["zoo", "parc", "plage"];
  const F = noms.filter((x) => /[aâ]/.test(x));
  const at = noms.map((x) => [x, E.includes(x) ? "oui" : "non", F.includes(x) ? "oui" : "non"]);
  vrai("14. le tableau des issues", JSON.stringify(lignes) === JSON.stringify(at));
  dit(14, `$P(E) = ${fr(E.length, 5)}$`);
  dit(14, `$P(F) = ${fr(F.length, 5)}$`);
  vrai("14. F : parc, plage, château", F.join() === "parc,plage,château");
});
essai("15", () => {
  const jours = Array.from({ length: 12 }, (_, m) => new Date(2027, m + 1, 0).getDate());
  const [, lignes, surl] = dessin("tableauProba", 15);
  vrai("15. le tableau des mois : les vrais nombres de jours", lignes.every((l, m) => Number(l[1]) === jours[m]));
  vrai("15. les 31 jours surlignés", JSON.stringify(surl.map((s) => s[0])) === JSON.stringify(jours.map((j, m) => (j === 31 ? m : -1)).filter((m) => m >= 0)));
  const [n31, n30, n28] = [31, 30, 28].map((j) => compte(jours, (x) => x === j));
  const bre = compte(lignes.map((l) => l[0]), (x) => x.endsWith("bre"));
  dit(15, `$P = ${fr(n31, 12)}$`);
  dit(15, `$P = ${brut(n30, 12)} = ${fr(n30, 12)}$`);
  dit(15, `Février est seul : $P = ${fr(n28, 12)}$`);
  vrai("15. 7 + 4 + 1 = 12", n31 + n30 + n28 === 12);
  dit(15, `Réponse : a) $12$ issues ; b) $${fr(n31, 12)}$, $${fr(n30, 12)}$ et $${fr(n28, 12)}$ ; d) $${fr(bre, 12)}$.`);
});
essai("16", () => {
  const [bs] = dessin("billes", 16);
  const [r, b, v] = [K.ROUGE, K.BLEU, K.VERT].map((col) => compte(bs, (x) => x.couleur === col));
  vrai("16. le sac dessiné : 12 billes, 1/4 rouges, 1/2 bleues", bs.length === 12 && egal(Q(r, 12), Q(1, 4)) && egal(Q(b, 12), Q(1, 2)));
  dit(16, `$12 \\div 4 = ${r}$ rouges`);
  dit(16, `$12 \\div 2 = ${b}$ bleues`);
  dit(16, `$P(\\text{verte}) = ${brut(v, 12)} = ${fr(v, 12)}$`);
  vrai("16. 10 billes : 2,5 rouges, impossible", !Number.isInteger(10 / 4));
  dit(16, "$10 \\div 4 = 2{,}5$");
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [ent, ligne] = dessin("tableau", 17, "figure");
  const nb = Object.fromEntries(ent.slice(1).map((l, i) => [l, ligne[i + 1]]));
  ["E", "A", "I", "O", "U", "Y"].forEach((l) => enonceDit(17, `$${nb[l]}$ ${l}`));
  const voy = Object.values(nb).reduce((a, b) => a + b, 0);
  dit(17, `$P(\\text{E}) = ${brut(nb.E, 102)} = ${fr(nb.E, 102)} \\approx ${t(Math.round((nb.E / 102) * 100) / 100)}$`);
  dit(17, `$P(\\text{joker}) = ${brut(2, 102)} = ${fr(2, 102)}$`);
  dit(17, `= ${voy}$ jetons. $P = ${brut(voy, 102)} = ${fr(voy, 102)} \\approx ${t(Math.round((voy / 102) * 100) / 100)}$`);
});
essai("18", () => {
  const segs = secteurs(18, 0, "schema");
  const g = compte(segs, (s) => s.label === "G");
  vrai("18. 12 secteurs égaux dont 4 verts", segs.length === 12 && egaux(segs) && g === 4);
  dit(18, `$12 \\div 4 = 3$ secteurs verts`);
  dit(18, `$12 \\div 3 = ${g}$ secteurs verts`);
  dit(18, `$P(\\text{perdre}) = ${brut(12 - g, 12)} = ${fr(12 - g, 12)}$`);
  dit(18, `$12 \\div 5 = 2{,}4$`);
  const ppcm = [...Array(200).keys()].find((n) => n > 0 && n % 3 === 0 && n % 4 === 0 && n % 5 === 0);
  dit(18, `Le plus petit est $${ppcm}$.`);
  dit(18, `$\\dfrac{2}{12} = ${fr(2, 12)}$`);
});
essai("19", () => {
  const [, data] = dessin("diagramme", 19, "figure");
  const n = Object.fromEntries(data.map((d) => [d.label, d.value]));
  const T = data.reduce((a, d) => a + d.value, 0);
  vrai("19. 40 oiseaux", T === 40);
  enonceDit(19, `a bagué $${T}$ oiseaux`);
  dit(19, `$P = ${brut(n.mésange, T)} = ${fr(n.mésange, T)} = ${t(n.mésange / T)}$, soit $${(n.mésange / T) * 100}$ %.`);
  dit(19, `$P(\\text{hibou}) = ${brut(n.hibou, T)} = ${fr(n.hibou, T)} = ${t(n.hibou / T)}$`);
  dit(19, `$P = ${brut(T - n.mésange, T)} = ${fr(T - n.mésange, T)} = ${t((T - n.mésange) / T)}$`);
  const [m2, T2] = [n.mésange + 10, T + 10];
  dit(19, `$P = ${brut(m2, T2)} = ${t(m2 / T2)}$, soit $${Math.round((m2 / T2) * 100)}$ %`);
  vrai("19. elle augmente", m2 / T2 > n.mésange / T);
});
essai("20", () => {
  const [faces] = dessin("patron", 20);
  const n = faces.map(Number);
  const [u, d, tr] = [1, 2, 3].map((x) => compte(n, (y) => y === x));
  vrai("20. le patron : 6 faces, P(1) = 1/2, P(2) = 1/3, P(3) = 1/6", n.length === 6 && egal(Q(u, 6), Q(1, 2)) && egal(Q(d, 6), Q(1, 3)) && egal(Q(tr, 6), Q(1, 6)));
  const imp = compte(n, (x) => x % 2 === 1);
  dit(20, `$P = ${brut(imp, 6)} = ${fr(imp, 6)}$`);
  vrai("20. « obtenir 4 » impossible, « moins de 4 » certain", compte(n, (x) => x === 4) === 0 && n.every((x) => x < 4));
  dit(20, `$${u} + ${d} + ${tr} = 6$ faces`);
});

f.fin();
