// Recalcul indépendant de la feuille « Ajustement affine » (1re sans spé,
// 28/09/2026) : lib/fiches-exercices/maths-premiere-info-ajustement-affine.tsx
//
// Les nuages sont RELUS dans le source (`repere(…)` : cadre, droites, points),
// les droites recalculées par leurs deux points en fractions exactes, chaque
// point confronté à la droite (écart ≤ 0,5 quand le corrigé dit « pertinent »),
// chaque égalité du corrigé relue et ses membres évalués (`outilsEgalites`).
// Plus les règles de rendu mesurées à 375 px (cadres, `grand`, étiquettes,
// tableaux, dessins imprimés) et le socle commun (8 + 8 + 4, dollars, micros).
// Usage : node scripts/verifier-exercices-premiere-info-ajustement-affine.mjs

import fs from "node:fs";
import path from "node:path";
import { RACINE, Q, D, plus, moins, fois, div, egal, inf, lireFeuille, controlesCommuns, outilsEgalites } from "./verifier-exercices-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-premiere-info-ajustement-affine.tsx";
const NOTION = "info_ajustement_affine";
const source = fs.readFileSync(path.join(RACINE, FICHIER), "utf8");

let justes = 0;
const fausses = [];
const v = {
  ok(nom, condition, detail = "") {
    if (condition) justes++;
    else fausses.push(`${nom}${detail ? " — " + detail : ""}`);
  },
  titre() {},
};
const f = lireFeuille(source);
const c = (k) => f.corrections[k - 1] ?? "";
const e = (k) => f.enonces[k - 1] ?? "";
const egalites = outilsEgalites(v, f);
const eg = (k, ...ts) => ts.forEach((t) => egalites(k, t));
const dit = (k, ...ps) => ps.forEach((p) => v.ok(`${k}. « ${p} » dans le corrigé`, c(k).includes(p), "absent"));
const n = (x) => (typeof x === "object" ? x : D(String(x).replace(/−/g, "-")));
const fr = (x) => `${x.n}/${x.d}`;
const vaut = (nom, a, b) => v.ok(nom, egal(n(a), n(b)), `${fr(n(a))} ≠ ${fr(n(b))}`);

/* ── Relire les appels dans le source ─────────────────────────────────── */

function argumentsDe(texte, debut) {
  const args = [];
  let prof = 0;
  let courant = "";
  let chaine = false;
  for (let i = debut + 1; i < texte.length; i++) {
    const ch = texte[i];
    if (ch === '"' && texte[i - 1] !== "\\") chaine = !chaine;
    if (!chaine) {
      if ("([{".includes(ch)) prof++;
      if (")]}".includes(ch)) {
        if (prof === 0) {
          if (courant.trim()) args.push(courant.trim());
          return args;
        }
        prof--;
      }
      if (ch === "," && prof === 0) {
        args.push(courant.trim());
        courant = "";
        continue;
      }
    }
    courant += ch;
  }
  throw new Error("appel non fermé");
}
const json = (t) => JSON.parse(t.replace(/,(\s*\n\s*[\]}])/g, "$1").replace(/−/g, "-"));

/** Tous les appels `nom(` d'un bloc, avec leur rôle et s'ils sont imprimés. */
function appels(bloc, nom) {
  return [...bloc.matchAll(new RegExp(`\\b${nom}\\(`, "g"))].map((m) => {
    const avant = bloc.slice(0, m.index);
    const iF = avant.lastIndexOf("figure:");
    const iS = avant.lastIndexOf("schema:");
    const role = iF > iS ? "figure" : "schema";
    const depuis = avant.slice(Math.max(iF, iS));
    return { role, imprime: !depuis.includes("ecranSeulement("), args: argumentsDe(bloc, m.index + m[0].length - 1) };
  });
}
function lireRepere(args) {
  const [cadre, courbes, marques = "[]", horiz, grand] = args;
  return {
    cadre: json(cadre),
    droites: [...courbes.matchAll(/q: \[([^\]]*)\]/g)].map((m) => m[1].split(",").map((s) => n(s.trim()))),
    brutCourbes: courbes,
    points: [...marques.matchAll(/\{([^}]*)\}/g)].map(([, t]) => ({
      x: n(/x: (-?[\d.]+)/.exec(t)[1]),
      y: n(/y: (-?[\d.]+)/.exec(t)[1]),
      label: /label: "([^"]*)"/.exec(t)?.[1] ?? "",
    })),
    horiz,
    grand: grand === "true",
  };
}
const repereDe = (k, role = "figure") => {
  const a = appels(f.blocs[k - 1] ?? "", "repere").find((x) => x.role === role);
  if (!a) throw new Error(`exercice ${k} : pas de repère (${role})`);
  return lireRepere(a.args);
};
const tableauDe = (k, role = "figure") => {
  const a = appels(f.blocs[k - 1] ?? "", "tableau").find((x) => x.role === role);
  if (!a) throw new Error(`exercice ${k} : pas de tableau (${role})`);
  return { entete: json(a.args[0]), ligne: json(a.args[1]) };
};

/* ── Géométrie exacte ─────────────────────────────────────────────────── */

/** La droite (a, b) qui passe par deux points. */
const par = ([x1, y1], [x2, y2]) => {
  const a = div(moins(n(y2), n(y1)), moins(n(x2), n(x1)));
  return { a, b: moins(n(y1), fois(a, n(x1))) };
};
const image = (d, x) => plus(fois(d.a, n(x)), d.b);
const antecedent = (d, y) => div(moins(n(y), d.b), d.a);
const absq = (x) => (inf(x, Q(0)) ? moins(Q(0), x) : x);
/** Tous les points à 0,5 au plus de la droite. */
const proches = (k, pts, d) => {
  const loin = pts.filter((p) => inf(Q(1, 2), absq(moins(p.y, image(d, p.x)))));
  v.ok(`${k}. les ${pts.length} points sont à 0,5 au plus de la droite`, loin.length === 0, loin.map((p) => `(${fr(p.x)} ; ${fr(p.y)})`).join(" "));
};
const memeDroite = (k, d, q, quoi) => v.ok(`${k}. ${quoi} : y = ${fr(d.a)}x + ${fr(d.b)}`, egal(q[0], Q(0)) && egal(q[1], d.a) && egal(q[2], d.b), `dessinée : ${q.map(fr).join(", ")}`);
const memesPoints = (k, p1, p2) => v.ok(`${k}. le schéma reprend les points de l'énoncé`, JSON.stringify(p1.map((p) => [fr(p.x), fr(p.y)])) === JSON.stringify(p2.map((p) => [fr(p.x), fr(p.y)])));
const yEn = (pts, x) => {
  const p = pts.find((q) => egal(q.x, n(x)));
  if (!p) throw new Error(`pas de point d'abscisse ${x}`);
  return p.y;
};
const ecarts = (pts) => pts.slice(1).map((p, i) => moins(p.y, pts[i].y));

try {
  /* ── ★ ── */
  {
    const r = repereDe(1);
    const d = par([0, 2], [5, 9]);
    vaut("1. premier point", yEn(r.points, 0), 2);
    vaut("1. dernier point", yEn(r.points, 5), 9);
    proches(1, r.points, d);
    const s = repereDe(1, "schema");
    memeDroite(1, d, s.droites[0], "la droite du schéma passe par le premier et le dernier point");
    memesPoints(1, r.points, s.points);
    dit(1, "$y = 1{,}4x + 2$", "$1{,}4$ m par an");
  }
  {
    const r = repereDe(2);
    const dx = ecarts(r.points);
    const i = dx.findIndex((x) => !inf(Q(0), x));
    v.ok("2. le nuage monte, puis descend (une bosse)", i > 0 && dx.slice(0, i).every((x) => inf(Q(0), x)) && dx.slice(i).every((x) => inf(x, Q(0))), dx.map(fr).join(" "));
    const max = r.points.reduce((m, p) => (inf(m.y, p.y) ? p : m));
    vaut("2. le sommet est en août (x = 3, mai = 0)", max.x, 3);
    dit(2, "de mai à août");
  }
  {
    const r = repereDe(3);
    const d = par([0, yEn(r.points, 0)], [4, yEn(r.points, 4)]);
    memeDroite(3, d, r.droites[0], "la droite tracée passe par les points d'abscisses 0 et 4");
    proches(3, r.points, d);
    eg(3, "\\dfrac{9 - 3}{4 - 0} = \\dfrac{6}{4} = 1{,}5", "1{,}5 \\times 4 + 3 = 9");
    dit(3, "$A(0 ; 3)$", "$B(4 ; 9)$", "$b = 3$", "$y = 1{,}5x + 3$");
  }
  {
    const d = par([2, 50], [6, 70]);
    vaut("4. a", d.a, 5);
    vaut("4. b", d.b, 40);
    eg(4, "\\dfrac{70 - 50}{6 - 2} = \\dfrac{20}{4} = 5", "50 - 10 = 40", "5 \\times 6 + 40 = 70");
    dit(4, "$y = 5x + 40$");
  }
  vaut("5. 0,8 × 5 + 12", image({ a: D("0.8"), b: Q(12) }, 5), 16);
  eg(5, "0{,}8 \\times 5 = 4", "4 + 12 = 16", "0{,}8 \\times (5 + 12) = 13{,}6");
  vaut("6. 2,5x + 10 = 30", antecedent({ a: D("2.5"), b: Q(10) }, 30), 8);
  eg(6, "\\dfrac{20}{2{,}5} = 8", "2{,}5 \\times 8 + 10 = 20 + 10 = 30");
  {
    const r = repereDe(7);
    const dx = ecarts(r.points);
    v.ok("7. les hausses ne diminuent jamais et grandissent (le nuage se courbe)", dx.slice(1).every((x, i) => !inf(x, dx[i])) && inf(dx[0], dx[dx.length - 1]), dx.map(fr).join(" "));
    dit(7, dx.map((x) => `$+${fr(x).replace("/1", "")}$`).join(", "));
  }
  eg(8, "-1{,}5 \\times 10 + 40 = -15 + 40 = 25");
  vaut("8. modèle en 10", image({ a: D("-1.5"), b: Q(40) }, 10), 25);
  {
    // Les dessins d'écran ajoutés le 28/09 (« les canvas qui aident »).
    const s4 = repereDe(4, "schema");
    memeDroite(4, { a: D("0.5"), b: Q(4) }, s4.droites[0], "la droite du schéma, en dizaines");
    v.ok("4. le schéma marque A et B, en dizaines", s4.points.every((p) => egal(image({ a: D("5"), b: Q(40) }, p.x), fois(p.y, Q(10)))) && s4.points.length === 2);
    for (const [k, a, b] of [[5, "0.8", 12], [6, "2.5", 10]]) {
      const { entete, ligne } = tableauDe(k, "schema");
      entete.slice(1).forEach((x, i) => vaut(`${k}. tableau du schéma en x = ${x}`, image({ a: D(a), b: Q(b) }, x), ligne[i + 1]));
    }
    const s8 = repereDe(8, "schema");
    memeDroite(8, { a: D("-0.15"), b: Q(4) }, s8.droites[0], "la droite du schéma, en dizaines de cm");
    vaut("8. le point marqué : 25 cm au jour 10", fois(s8.points[0].y, Q(10)), 25);
  }

  /* ── ★★ ── */
  {
    const r = repereDe(9);
    const d = par([1, yEn(r.points, 1)], [6, yEn(r.points, 6)]);
    vaut("9. a", d.a, "0.6");
    vaut("9. b", d.b, "3.4");
    proches(9, r.points, d);
    eg(9, "\\dfrac{7 - 4}{6 - 1} = \\dfrac{3}{5} = 0{,}6", "4 - 0{,}6 = 3{,}4", "0{,}6 \\times 4 + 3{,}4 = 2{,}4 + 3{,}4 = 5{,}8");
    vaut("9. relevé − modèle en x = 4, en euros", fois(moins(yEn(r.points, 4), image(d, 4)), Q(1000)), 200);
    dit(9, "$5\\,800$ €", "$6\\,000$ €", "$200$ €");
    const s = repereDe(9, "schema");
    memeDroite(9, d, s.droites[0], "la droite du schéma");
    memesPoints(9, r.points, s.points);
  }
  {
    const { entete, ligne } = tableauDe(10);
    const d = { a: D("0.2"), b: D("9.8") };
    const releve = (j) => n(ligne[entete.indexOf(String(j))]);
    vaut("10. modèle le 15", image(d, 15), "12.8");
    vaut("10. écart au relevé du 15", moins(releve(15), image(d, 15)), "0.2");
    vaut("10. 13,8 °C le 20", antecedent(d, "13.8"), 20);
    vaut("10. 0,2 °C × 7 jours", fois(D("0.2"), Q(7)), "1.4");
    proches(10, entete.slice(1).map((j) => ({ x: n(j), y: releve(j) })), d);
    eg(10, "0{,}2 \\times 15 + 9{,}8 = 3 + 9{,}8 = 12{,}8", "\\dfrac{4}{0{,}2} = 20");
  }
  {
    const { entete, ligne } = tableauDe(11);
    const pts = entete.slice(1).map((s, i) => ({ x: n(s), y: n(ligne[i + 1]) }));
    const d = par([pts[0].x, pts[0].y], [pts.at(-1).x, pts.at(-1).y]);
    vaut("11. a", d.a, "-1.5");
    vaut("11. b", d.b, 72);
    vaut("11. modèle semaine 2", image(d, 2), 69);
    vaut("11. relevé semaine 2", yEn(pts, 2), 70);
    vaut("11. modèle semaine 4 = relevé", image(d, 4), yEn(pts, 4));
    eg(11, "\\dfrac{60 - 72}{8 - 0} = \\dfrac{-12}{8} = -1{,}5", "-1{,}5 \\times 2 + 72 = 69", "-1{,}5 \\times 4 + 72 = 66");
  }
  {
    const r = repereDe(12);
    const dx = ecarts(r.points);
    const changements = dx.slice(1).filter((x, i) => inf(Q(0), x) !== inf(Q(0), dx[i])).length;
    v.ok("12. aucune direction : le sens change à chaque point", changements === dx.length - 1, `${changements} changements`);
    vaut("12. sept élèves", r.points.length, 7);
  }
  {
    const r = repereDe(13);
    const d = par([0, yEn(r.points, 0)], [6, yEn(r.points, 6)]);
    vaut("13. a", d.a, "-1.5");
    vaut("13. b", d.b, 12);
    proches(13, r.points, d);
    vaut("13. modèle en 4, en euros", fois(image(d, 4), Q(100)), 600);
    vaut("13. baisse annuelle, en euros", fois(d.a, Q(-100)), 150);
    eg(13, "\\dfrac{3 - 12}{6 - 0} = \\dfrac{-9}{6} = -1{,}5", "-1{,}5 \\times 4 + 12 = -6 + 12 = 6");
    memeDroite(13, d, repereDe(13, "schema").droites[0], "la droite du schéma");
    memesPoints(13, r.points, repereDe(13, "schema").points);
  }
  {
    const r = repereDe(14);
    const [bleue, orange] = r.droites.map((q) => ({ a: q[1], b: q[2] }));
    vaut("14. bleue a", bleue.a, "1.6");
    vaut("14. orange a", orange.a, "0.4");
    [0, 5].forEach((x) => vaut(`14. la bleue en ${x} = relevé`, image(bleue, x), yEn(r.points, x)));
    vaut("14. l'orange en 0 : 3 au-dessus", moins(image(orange, 0), yEn(r.points, 0)), 3);
    vaut("14. l'orange en 5 : 3 au-dessous", moins(yEn(r.points, 5), image(orange, 5)), 3);
    proches(14, r.points, bleue);
    eg(14, "1{,}6 \\times 5 + 1 = 9", "0{,}4 \\times 5 + 4 = 6", "0{,}4 \\times 0 + 4 = 4");
    v.ok("14. les deux équations de l'énoncé sont celles dessinées", e(14).includes("$y = 1{,}6x + 1$") && e(14).includes("$y = 0{,}4x + 4$") && egal(bleue.b, Q(1)) && egal(orange.b, Q(4)));
  }
  {
    const d = { a: D("0.5"), b: moins(Q(8), fois(D("0.5"), Q(10))) };
    vaut("15. b", d.b, 3);
    vaut("15. 140 g", image(d, 14), 10);
    eg(15, "8 - 5 = 3", "0{,}5 \\times 14 + 3 = 7 + 3 = 10");
    const { entete, ligne } = tableauDe(15, "schema");
    entete.slice(1).forEach((g, i) => vaut(`15. tableau : ${g} g`, image(d, div(n(g), Q(10))), ligne[i + 1]));
  }
  {
    const d = { a: D("0.4"), b: Q(58) };
    vaut("16. 2020", image(d, 30), 70);
    vaut("16. 74 %", antecedent(d, 74), 40);
    vaut("16. 2010", image(d, 20), 66);
    vaut("16. le piège x = 2020", image(d, 2020), 866);
    eg(16, "0{,}4 \\times 30 + 58 = 12 + 58 = 70", "\\dfrac{16}{0{,}4} = 40", "1990 + 40 = 2030", "0{,}4 \\times 20 + 58 = 66");
    const { entete, ligne } = tableauDe(16, "schema");
    entete.slice(1).forEach((an, i) => vaut(`16. tableau : ${an}`, image(d, moins(n(an), Q(1990))), ligne[i + 1]));
  }

  /* ── ★★★ ── */
  {
    const r = repereDe(17);
    const d = par([1, yEn(r.points, 1)], [7, yEn(r.points, 7)]);
    vaut("17. a", d.a, "1.5");
    vaut("17. b", d.b, "0.5");
    proches(17, r.points, d);
    vaut("17. modèle en 4 (abeilles)", fois(image(d, 4), Q(10)), 65);
    vaut("17. relevé en 4 (abeilles)", fois(yEn(r.points, 4), Q(10)), 60);
    vaut("17. 95 abeilles", antecedent(d, "9.5"), 6);
    vaut("17. le piège 95", antecedent(d, 95), 63);
    eg(17, "\\dfrac{11 - 2}{7 - 1} = \\dfrac{9}{6} = 1{,}5", "1{,}5 \\times 4 + 0{,}5 = 6{,}5");
    memeDroite(17, d, repereDe(17, "schema").droites[0], "la droite du schéma");
    memesPoints(17, r.points, repereDe(17, "schema").points);
  }
  {
    const { entete, ligne } = tableauDe(18);
    const pts = entete.slice(1).map((s, i) => ({ x: n(s), y: n(ligne[i + 1]) }));
    const d = par([2, yEn(pts, 2)], [10, yEn(pts, 10)]);
    vaut("18. a", d.a, "6.5");
    vaut("18. b", d.b, 75);
    vaut("18. 7 ans", image(d, 7), "120.5");
    vaut("18. 107,5 cm", antecedent(d, "107.5"), 5);
    [[4, 101], [6, 114], [8, 127]].forEach(([x, m]) => {
      vaut(`18. modèle à ${x} ans`, image(d, x), m);
      vaut(`18. relevé à ${x} ans : un de plus`, moins(yEn(pts, x), image(d, x)), 1);
    });
    eg(18, "\\dfrac{140 - 88}{10 - 2} = \\dfrac{52}{8} = 6{,}5", "88 - 13 = 75", "6{,}5 \\times 7 + 75 = 45{,}5 + 75 = 120{,}5");
  }
  {
    const r = repereDe(19);
    const d = par([1, yEn(r.points, 1)], [6, yEn(r.points, 6)]);
    vaut("19. a", d.a, 1);
    vaut("19. b", d.b, 3);
    proches(19, r.points, d);
    vaut("19. frais fixes", fois(d.b, Q(10000)), 30000);
    vaut("19. coût par personne", div(fois(d.a, Q(10000)), Q(1000)), 10);
    vaut("19. recette : 15 € × 1000 en dizaines de milliers", div(Q(15000), Q(10000)), "1.5");
    const recette = { a: D("1.5"), b: Q(0) };
    const xi = div(moins(d.b, recette.b), moins(recette.a, d.a));
    vaut("19. les droites se croisent en x = 6", xi, 6);
    vaut("19. … et y = 9", image(d, xi), 9);
    const s = repereDe(19, "schema");
    memeDroite(19, d, s.droites[0], "la droite du coût");
    memeDroite(19, recette, s.droites[1], "la droite de la recette");
    vaut("19. le point marqué est le croisement", s.points[0].x, 6);
    vaut("19. … à la hauteur 9", s.points[0].y, 9);
    dit(19, "$30\\,000$ €", "$10$ € par personne", "$6\\,000$ festivaliers");
  }
  {
    const r = repereDe(20);
    const d = par([5, yEn(r.points, 5)], [13, yEn(r.points, 13)]);
    vaut("20. a", d.a, "-0.25");
    vaut("20. b", d.b, "5.75");
    proches(20, r.points, d);
    vaut("20. modèle à 90 km/h (km)", fois(image(d, 9), Q(100)), 350);
    vaut("20. écart au relevé (km)", fois(moins(image(d, 9), yEn(r.points, 9)), Q(100)), 10);
    vaut("20. 400 km → 70 km/h", fois(antecedent(d, 4), Q(10)), 70);
    eg(20, "\\dfrac{2{,}5 - 4{,}5}{13 - 5} = \\dfrac{-2}{8} = -0{,}25", "4{,}5 + 1{,}25 = 5{,}75", "-2{,}25 + 5{,}75 = 3{,}5");
    memeDroite(20, d, repereDe(20, "schema").droites[0], "la droite du schéma");
    memesPoints(20, r.points, repereDe(20, "schema").points);
  }
} catch (err) {
  v.ok("le recalcul s'exécute", false, String(err?.message ?? err));
}

/* ── Les règles de rendu, mesurées à 375 px le 28/09 ──────────────────── */
{
  let imprimes = 0;
  let ecran = 0;
  const fautes = [];
  f.blocs.forEach((bloc, i) => {
    const k = i + 1;
    // Le bloc k s'arrête à l'énoncé suivant : on coupe au premier `micros:`.
    const propre = bloc.slice(0, bloc.indexOf("micros:") + 1 || undefined);
    for (const cle of ["figure:", "schema:"]) {
      const j = propre.indexOf(cle);
      if (j < 0) continue;
      if (propre.slice(j, j + 40).includes("ecranSeulement(")) ecran++;
      else imprimes++;
    }
    const dessins = ["figure:", "schema:"].map((cle) => {
      const j = propre.indexOf(cle);
      if (j < 0) return null;
      const re = /\b(?!ecranSeulement\b)(\w+)\(/g;
      re.lastIndex = j + cle.length;
      const m = re.exec(propre);
      return m[1] + JSON.stringify(argumentsDe(propre, m.index + m[0].length - 1).map((t) => t.replace(/\s+/g, "")));
    });
    if (dessins[0] && dessins[1] && dessins[0] === dessins[1]) fautes.push(`${k} : même dessin dans l'énoncé et le corrigé`);
    for (const a of appels(propre, "repere")) {
      const r = lireRepere(a.args);
      const [xmin, xmax, ymin, ymax] = r.cadre;
      const ux = xmax - xmin;
      const uy = ymax - ymin;
      if (!(ymin < 0)) fautes.push(`${k} : ymin = ${ymin} (doit être < 0)`);
      if ((ux > 10 || uy > 10) && !r.grand) fautes.push(`${k} : ${ux} × ${uy} unités sans « grand »`);
      if (ux > 15 || uy > 15) fautes.push(`${k} : ${ux} × ${uy} unités (15 au plus)`);
      if (/[a-zA-Z_]\w*\(|\bMath\./.test(r.brutCourbes)) fautes.push(`${k} : une courbe n'est pas écrite en clair`);
      for (const p of r.points) {
        const x = Number(p.x.n) / Number(p.x.d);
        const y = Number(p.y.n) / Number(p.y.d);
        if (x < xmin || x > xmax || y < ymin || y > ymax) fautes.push(`${k} : (${x} ; ${y}) hors du cadre`);
        if (p.label) {
          if (p.label.length > 2) fautes.push(`${k} : étiquette « ${p.label} » trop longue`);
          if (x === 0 || y === 0) fautes.push(`${k} : étiquette « ${p.label} » sur un axe gradué`);
          if (ymax - y < 2) fautes.push(`${k} : étiquette « ${p.label} » collée au bord du haut`);
          if (r.points.some((q) => q !== p && Math.hypot(Number(q.x.n) / Number(q.x.d) - x, Number(q.y.n) / Number(q.y.d) - y) < 1)) fautes.push(`${k} : étiquette « ${p.label} » sur un autre point`);
        }
      }
    }
    for (const a of appels(propre, "tableau")) {
      const [en, li] = [json(a.args[0]), json(a.args[1])];
      if (en.length !== li.length) fautes.push(`${k} : tableau ${en.length} en-têtes pour ${li.length} cases`);
      if ([...en, ...li].some((t) => typeof t === "string" && /\$|-\d/.test(t))) fautes.push(`${k} : $ ou tiret-moins dans un tableau`);
    }
    for (const a of appels(propre, "diagramme")) {
      const labels = [...a.args[1].matchAll(/label: "([^"]*)"/g)].map((m) => m[1]);
      if (labels.length >= 4 && labels.some((l) => [...l].length > 9)) fautes.push(`${k} : libellé de plus de 9 signes sous ${labels.length} barres`);
    }
  });
  for (const m of source.matchAll(/label: "([^"]*)"/g)) if (/\$|-\d/.test(m[1])) fautes.push(`étiquette SVG « ${m[1]} » : $ ou tiret-moins`);
  v.ok("règles de rendu : cadres, grand, étiquettes, tableaux, barres", fautes.length === 0, fautes.join(" | "));
  v.ok(`10 à 14 dessins imprimés (${imprimes} imprimés, ${ecran} à l'écran seulement)`, imprimes >= 10 && imprimes <= 14, `${imprimes}`);
  console.log(`Dessins : ${imprimes} imprimés, ${ecran} à l'écran seulement`);

  const rappels = [...f.series.matchAll(/rappel: \[([\s\S]*?)\n\s*\],/g)].map((m) => (m[1].match(/^\s*"/gm) ?? []).length);
  v.ok("trois rappels de 2 à 4 lignes", rappels.length === 3 && rappels.every((x) => x >= 2 && x <= 4), JSON.stringify(rappels));
  const serie3 = f.series.split(/niveau: [123],/)[3] ?? "";
  v.ok("les 4 problèmes ont un titre", (serie3.match(/^\s*titre: "/gm) ?? []).length === 5, `${(serie3.match(/^\s*titre: "/gm) ?? []).length - 1}`);
  const blocs3 = f.blocs.slice(16);
  v.ok("chaque problème a un dessin", blocs3.every((b) => /figure:|schema:/.test(b.slice(0, b.indexOf("micros:")))));
}

controlesCommuns(v, source, { notionId: NOTION, classe: "premiere" });
const nbCorrections = (source.match(/correction:/g) ?? []).length;
v.ok("exactement 20 `correction:`", nbCorrections === 20, `${nbCorrections}`);

console.log(`Ajustement affine (1re) — ${justes} vérifications justes, ${fausses.length} fausses`);
fausses.forEach((x) => console.log("  ✗", x));
process.exit(fausses.length ? 1 : 0);
