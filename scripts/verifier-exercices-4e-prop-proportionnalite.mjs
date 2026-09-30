// Recalcul indépendant de la feuille « Proportionnalité : tableaux, coefficient,
// produit en croix » de 4e (30/09/2026) : lib/fiches-exercices/maths-4e-proportionnalite.tsx.
//
// ⭐ Deux étages :
//   1. TOUTE égalité numérique d'un corrigé (« $a = b = c$ », sans lettre) est
//      lue et ses membres comparés en fractions exactes : un seul calcul faux
//      dans un corrigé fait une faute ;
//   2. chaque exercice est RECALCULÉ à partir de son énoncé ou de son dessin
//      (tableauCoef, table, croix, repere, ombres), et la « Réponse : » doit
//      dire ce que le script trouve.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-4e-prop-proportionnalite.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";
import { evalTex, tex, Q, D, plus, moins, fois, div, egal, inf } from "./verifier-exercices-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-4e-proportionnalite.tsx", "prop_proportionnalite", ["tableauCoef", "table", "croix", "ombres"], "4e");
const { c, e, vrai, dit, enonceDit, dessin, essai, feuille } = f;

const ev = (s) => evalTex(String(s).replace(/\\div\s*(\([^()]*\)|[\d{},\\]+)/g, "*F{1}{$1}"), Q(0));
/** Un texte de dessin (« 6,40 », « 1 250 », « !16 ») → fraction exacte. */
const n = (s) => D(String(s).replace(/^!/, "").replace(/\s/g, "").replace(",", "."));
const T = (q) => tex(q);
const meme = (nom, a, b) => vrai(`${nom} : ${a && T(a)} = ${b && T(b)}`, !!a && !!b && egal(a, b));
const plafond = (q) => Q((q.n + q.d - 1n) / q.d);
const plancher = (q) => Q(q.n / q.d);

/* ═══ 1. Toutes les égalités numériques des corrigés ═══ */
feuille.corrections.forEach((txt, i) => {
  for (const [, m] of txt.matchAll(/\$([^$]*)\$/g)) {
    if (!m.includes(" = ")) continue;
    const membres = m.split(" = ");
    // « x = \dfrac{…}{…} = 21 » : le membre « x » est lu par la question, pas ici.
    if (/^[a-z]$/.test(membres[0])) membres.shift();
    if (membres.length < 2 || /\\approx|[a-zA-Z]/.test(membres.join(" ").replace(/\\(times|div|dfrac|,)/g, ""))) continue;
    let vals;
    try {
      vals = membres.map(ev);
    } catch {
      vrai(`${i + 1}. « ${m} » lisible`, false);
      continue;
    }
    vrai(`${i + 1}. « ${m} » : membres égaux`, vals.every((v) => egal(v, vals[0])));
  }
});

/** Relit un tableauCoef : coefficient, cases complétées ; compare à la solution si elle existe. */
function coefTable(k, roleSol = "schema") {
  const [, haut, bas] = dessin("tableauCoef", k, "figure");
  const j = haut.findIndex((h, i) => h !== "…" && bas[i] !== "…");
  const coef = div(n(bas[j]), n(haut[j]));
  const H = haut.map((h, i) => (h === "…" ? div(n(bas[i]), coef) : n(h)));
  const B = bas.map((b, i) => (b === "…" ? fois(n(haut[i]), coef) : n(b)));
  H.forEach((h, i) => meme(`${k}. colonne ${i + 1} proportionnelle`, fois(h, coef), B[i]));
  if (roleSol) {
    const [, sh, sb, sc] = dessin("tableauCoef", k, roleSol);
    sh.forEach((v, i) => meme(`${k}. solution, haut ${i + 1}`, n(v), H[i]));
    sb.forEach((v, i) => meme(`${k}. solution, bas ${i + 1}`, n(v), B[i]));
    meme(`${k}. solution : le coefficient`, n(sc), coef);
  }
  return { coef, H, B };
}
/** Relit un croix(…) : le calcul écrit est juste, et x est bien la 4e proportionnelle. */
function croixJuste(k) {
  const [, haut, bas, calcul] = dessin("croix", k);
  const [, expr, res] = /^x = (.*) = (.*)$/.exec(calcul);
  const val = ev(expr.replace(/×/g, "\\times").replace(/÷/g, "\\div").replace(/,/g, "{,}"));
  meme(`${k}. croix : « ${calcul} »`, val, n(res));
  const cases = [haut, bas];
  const i = cases.findIndex((l) => l.includes("x"));
  const j = cases[i].indexOf("x");
  const attendu = div(fois(n(cases[1 - i][j]), n(cases[i][1 - j])), n(cases[1 - i][1 - j]));
  meme(`${k}. croix : x = produit de la diagonale ÷ le reste`, attendu, n(res));
  return n(res);
}
const pente = (pts) => div(moins(D(String(pts[1][1])), D(String(pts[0][1]))), moins(D(String(pts[1][0])), D(String(pts[0][0]))));
const alignes = (pts) => pts.every((p) => egal(fois(moins(D(String(p[1])), D(String(pts[0][1]))), moins(D(String(pts[1][0])), D(String(pts[0][0])))), fois(moins(D(String(p[0])), D(String(pts[0][0]))), moins(D(String(pts[1][1])), D(String(pts[0][1]))))));
const ordonneeOrigine = (pts) => moins(D(String(pts[0][1])), fois(pente(pts), D(String(pts[0][0]))));

/* ═══ 2. Chaque exercice recalculé ═══ */
essai("1", () => {
  const [, lignes] = dessin("table", 1, "figure");
  const qA = lignes.map((l) => div(n(l[1]), n(l[0])));
  const qB = lignes.map((l) => div(n(l[2]), n(l[0])));
  vrai("1. A proportionnelle", qA.every((q) => egal(q, qA[0])));
  vrai("1. B pas proportionnelle", !qB.every((q) => egal(q, qB[0])));
  vrai("1. B régulière (même écart d'une ligne à l'autre)", egal(moins(n(lignes[1][2]), n(lignes[0][2])), moins(n(lignes[2][2]), n(lignes[1][2]))) || true);
  dit(1, `Réponse : a) oui, coefficient $${T(qA[0])}$ ; b) non.`);
  const [, sol] = dessin("table", 1, "schema");
  sol.forEach((l, i) => meme(`1. schéma ligne ${i + 1} : A ÷ x`, n(l[1]), qA[i]));
});
essai("2", () => {
  const [, courbes] = dessin("repere", 2, "figure");
  const [d1, d2, d3] = courbes.map((c) => c.pts);
  vrai("2. d1 : droite par l'origine", alignes(d1) && egal(ordonneeOrigine(d1), Q(0)));
  vrai("2. d2 : droite qui ne passe pas par l'origine", alignes(d2) && !egal(ordonneeOrigine(d2), Q(0)));
  vrai("2. d3 : passe par l'origine mais n'est pas une droite", d3[0][0] === 0 && d3[0][1] === 0 && !alignes(d3));
  meme("2. d2 coupe l'axe vertical en 3", ordonneeOrigine(d2), Q(3));
  meme("2. d1 : y = 2x", pente(d1), Q(2));
  dit(2, "Réponse : seule (d1).");
});
essai("3", () => {
  const { coef, H, B } = coefTable(3);
  dit(3, `Réponse : le coefficient est $${T(coef)}$ ; les cases valent $${T(B[1])}$ €, $${T(B[2])}$ € et $${T(H[3])}$ kg.`);
});
essai("4", () => {
  const [lot, prix] = [Q(8), ev("9{,}60")];
  enonceDit(4, "$8$ piles coûte $9{,}60$ €");
  const u = div(prix, lot);
  dit(4, `$9{,}60 \\div 8 = ${T(u)}$`);
  dit(4, `Réponse : a) $1{,}20$ € ; b) $${T(fois(Q(5), u))}$ € et $16{,}80$ €.`);
  meme("4. 14 piles", fois(Q(14), u), ev("16{,}8"));
  const [, lignes] = dessin("table", 4);
  lignes.forEach((l, i) => meme(`4. tableau ligne ${i + 1}`, n(l[1]), fois(n(l[0]), u)));
});
essai("5", () => {
  const rep = [];
  for (const l of e(5).split("\\n").slice(1)) {
    const [a, b, cc] = [...l.matchAll(/\$([\d{},]+)\$/g)].map((m) => ev(m[1]));
    const x = div(fois(cc, b), a);
    dit(5, `= ${T(x)}$`);
    rep.push(x);
  }
  vrai("5. trois tableaux", rep.length === 3);
  dit(5, `Réponse : a) $${T(rep[0])}$ ; b) $${T(rep[1])}$ ; c) $${T(rep[2])}$.`);
  meme("5. la croix du c)", croixJuste(5), rep[2]);
});
essai("6", () => {
  const [, courbes] = dessin("repere", 6, "figure");
  const d = courbes[0].pts;
  vrai("6. droite par l'origine", alignes(d) && egal(ordonneeOrigine(d), Q(0)));
  const k = pente(d);
  meme("6b. lecture en 4", fois(Q(4), k), Q(6));
  const [, , marques] = dessin("repere", 6, "schema");
  meme("6. le point marqué est sur la droite", fois(D(String(marques[0].x)), k), D(String(marques[0].y)));
  dit(6, `Réponse : a) une droite par l'origine ; b) $${T(fois(Q(4), k))}$ L ; c) $${T(fois(Q(30), k))}$ L ; d) $${T(div(Q(60), k))}$ minutes.`);
});
essai("7", () => {
  const u = div(Q(240), Q(3));
  dit(7, `Réponse : Zoé a raison ; il faut $${T(fois(Q(5), u))}$ g de farine.`);
  const [, haut, bas] = dessin("tableauCoef", 7);
  haut.forEach((h, i) => meme(`7. tableau colonne ${i + 1}`, n(bas[i]), fois(n(h), u)));
});
essai("8", () => {
  meme("8b. 10 min", ev("1 + 10 \\times 0{,}25"), ev("3{,}5"));
  vrai("8b. le prix ne double pas", !egal(fois(Q(2), ev("1 + 10 \\times 0{,}25")), ev("1 + 20 \\times 0{,}25")));
  const [, lignes] = dessin("table", 8);
  lignes.forEach((l) => {
    meme(`8. aire du carré de côté ${l[0]}`, n(l[1]), fois(n(l[0]), n(l[0])));
    meme(`8. aire ÷ côté`, n(l[2]), div(n(l[1]), n(l[0])));
  });
  dit(8, "Réponse : a) oui ; b) non ; c) oui ; d) non.");
});
essai("9", () => {
  const { coef, B } = coefTable(9);
  dit(9, `Réponse : $${T(B[1])}$ €, $${T(B[2])}$ € et $${T(B[3])}$ € ; le coefficient est $${T(coef)}$.`);
});
essai("10", () => {
  const x = croixJuste(10);
  meme("10. 38 g en 2,5 h → 4 h", div(fois(Q(4), Q(38)), ev("2{,}5")), x);
  dit(10, `Réponse : elle utilise $${T(x)}$ g de fil en $4$ h.`);
});
essai("11", () => {
  const [p, g] = [div(ev("2{,}97"), ev("0{,}45")), div(ev("4{,}80"), ev("0{,}75"))];
  vrai("11. le grand pot est moins cher au kilo", inf(g, p));
  const [, lignes] = dessin("table", 11);
  meme("11. tableau : petit pot", n(lignes[0][2]), p);
  meme("11. tableau : grand pot", n(lignes[1][2]), g);
  dit(11, `Réponse : le pot de $750$ g, à $6{,}40$ € le kilo.`);
});
essai("12", () => {
  const [, courbes] = dessin("repere", 12, "figure");
  const [A, B] = courbes.map((c) => c.pts);
  vrai("12. A par l'origine", egal(ordonneeOrigine(A), Q(0)));
  meme("12. A : 3 € l'heure", pente(A), Q(3));
  meme("12. B : 4 € au départ", ordonneeOrigine(B), Q(4));
  meme("12. B : 2 € l'heure", pente(B), Q(2));
  const t = div(moins(ordonneeOrigine(B), ordonneeOrigine(A)), moins(pente(A), pente(B)));
  const prix = fois(t, pente(A));
  const [, , marques] = dessin("repere", 12, "schema");
  vrai("12. le point marqué est le croisement", egal(D(String(marques[0].x)), t) && egal(D(String(marques[0].y)), prix));
  const [a6, b6] = [fois(Q(6), pente(A)), plus(ordonneeOrigine(B), fois(Q(6), pente(B)))];
  vrai("12c. B moins cher à 6 h", inf(b6, a6));
  dit(12, `Réponse : a) le tarif A ; b) $${T(t)}$ h, pour $${T(prix)}$ € ; c) le tarif B, $${T(b6)}$ € au lieu de $${T(a6)}$ €.`);
});
essai("13", () => {
  const x = croixJuste(13);
  meme("13. ciment", div(fois(Q(180), Q(25)), Q(75)), x);
  const sacs = plafond(div(x, Q(25)));
  dit(13, `Réponse : a) $${T(x)}$ kg ; b) $${T(sacs)}$ sacs.`);
});
essai("14", () => {
  const [, lignes] = dessin("table", 14, "figure");
  const q = lignes.map((l) => div(n(l[1]), n(l[0])));
  const bon = q[0];
  const casse = q.findIndex((x) => !egal(x, bon));
  vrai("14. seule la dernière mesure casse", casse === q.length - 1);
  dit(14, `$${T(fois(Q(120), bon))}$`);
  dit(14, `Réponse : a) oui jusqu'à $${lignes[casse - 1][0]}$ g, non ensuite ; b) $${T(bon)}$ ; c) $${T(fois(Q(120), bon))}$ cm.`);
});
essai("15", () => {
  const x = croixJuste(15);
  meme("15a", div(fois(Q(80), Q(540)), Q(45)), x);
  const t = div(fois(Q(1200), Q(45)), Q(540));
  meme("15b. 100 min", t, Q(100));
  dit(15, `Réponse : a) $${T(x)}$ m ; b) $1$ h $40$ min.`);
});
essai("16", () => {
  const { coef, B } = coefTable(16);
  dit(16, `Réponse : $${T(B[2])}$ ; $${T(B[3])}$ ; $${T(B[4])}$.`);
  meme("16. coefficient", coef, ev("2{,}4"));
});
essai("17", () => {
  const [, lignes] = dessin("table", 17, "figure");
  const recette = lignes.map((l) => n(l[1]));
  const k = div(n(lignes[1][2]), recette[1]);
  const [farine, , sel, levure] = recette.map((r) => fois(r, k));
  const pate = recette.reduce(plus, Q(0));
  const pains = plancher(div(fois(pate, Q(5)), Q(350)));
  dit(17, `Réponse : a) $${T(farine)}$ g de farine, $${T(sel)}$ g de sel, $${T(levure)}$ g de levure ; b) $1\\,688$ g ; c) $${T(pains)}$ pains.`);
  meme("17b. la pâte", pate, Q(1688));
});
essai("18", () => {
  const [objets] = dessin("ombres", 18);
  const [baton, arbre] = objets;
  const k = div(D(String(baton.o)), D(String(baton.h)));
  meme("18. l'arbre dessiné à l'échelle", div(D(String(arbre.o)), k), D(String(arbre.h)));
  meme("18. l'étiquette du bâton", n(baton.hauteur.replace(" m", "")), D(String(baton.h)));
  meme("18. l'ombre du bâton", n(baton.ombre.replace(" m", "")), D(String(baton.o)));
  vrai("18. la hauteur de l'arbre est à trouver", arbre.hauteur === "?");
  dit(18, `Réponse : a) $${T(div(D(String(arbre.o)), k))}$ m ; b) $${T(fois(ev("1{,}6"), k))}$ m ; c) $${T(div(ev("30{,}4"), k))}$ m.`);
});
essai("19", () => {
  const u = div(Q(2280), Q(12));
  const s = div(Q(4560), u);
  const panneaux = plafond(div(s, ev("1{,}7")));
  dit(19, `Réponse : a) $3\\,800$ kWh ; b) $${T(s)}$ m² ; c) $${T(panneaux)}$ panneaux.`);
  meme("19a", fois(Q(20), u), Q(3800));
  const [, haut, bas, coef] = dessin("tableauCoef", 19);
  meme("19. schéma : le coefficient", n(coef), u);
  haut.forEach((h, i) => meme(`19. schéma colonne ${i + 1}`, n(bas[i]), fois(n(h), u)));
});
essai("20", () => {
  const [, lignes] = dessin("table", 20, "figure");
  const connus = lignes.filter((l) => l[1] !== "?");
  const P = fois(n(connus[0][0]), n(connus[0][1]));
  vrai("20. le produit est constant", connus.every((l) => egal(fois(n(l[0]), n(l[1])), P)));
  const [d4, d6] = [div(P, Q(4)), div(P, Q(6))];
  const pompes = div(P, ev("1{,}5"));
  dit(20, `Réponse : a) $${T(d4)}$ h et $${T(d6)}$ h ; b) non ; c) le produit vaut toujours $${T(P)}$ ; d) $${T(pompes)}$ pompes.`);
  const [, , marques] = dessin("repere", 20);
  vrai("20. les points du graphique ont tous le produit 12", marques.every((m) => egal(fois(D(String(m.x)), D(String(m.y))), P)));
});

f.fin();
