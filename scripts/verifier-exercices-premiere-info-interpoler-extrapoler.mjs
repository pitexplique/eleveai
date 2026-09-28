// Recalcul indépendant de la feuille « Interpoler et extrapoler » (1re sans
// spé, 28/09/2026) : lib/fiches-exercices/maths-premiere-info-interpoler-extrapoler.tsx
//
// Chaque estimation est refaite en fractions exactes, et chaque valeur SITUÉE
// par le script (dans la plage des données relue dans l'énoncé ou le dessin :
// interpolation ; dehors : extrapolation), puis confrontée au mot du corrigé.
// Les droites et les points des dessins sont RELUS dans le source ; les
// tableaux de relevés sont confrontés au modèle. Chaque prévision « absurde »
// est recalculée et sa limite vérifiée (plus de 100 %, négatif, > 100 °C…).
// Plus les règles de rendu mesurées à 375 px et le socle commun.
// Usage : node scripts/verifier-exercices-premiere-info-interpoler-extrapoler.mjs

import fs from "node:fs";
import path from "node:path";
import { RACINE, Q, D, plus, moins, fois, div, egal, inf, lireFeuille, controlesCommuns, outilsEgalites } from "./verifier-exercices-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-premiere-info-interpoler-extrapoler.tsx";
const NOTION = "info_interpoler_extrapoler";
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
const json = (t) => JSON.parse(t.replace(/,(\s*\n\s*[\]}])/g, "$1").replace(/−/g, "-").replace(/([{,]\s*)([a-zA-Z]+):/g, '$1"$2":'));

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
    cadre: JSON.parse(cadre),
    droites: [...courbes.matchAll(/q: \[([^\]]*)\]/g)].map((m) => m[1].split(",").map((s) => n(s.trim()))),
    brutCourbes: courbes,
    points: [...marques.matchAll(/\{([^}]*)\}/g)].map(([, t]) => ({
      x: n(/x: (-?[\d.]+)/.exec(t)[1]),
      y: n(/y: (-?[\d.]+)/.exec(t)[1]),
      label: /label: "([^"]*)"/.exec(t)?.[1] ?? "",
    })),
    horiz: horiz === undefined || horiz === "undefined" ? undefined : n(horiz),
    grand: grand === "true",
  };
}
const bloc = (k) => {
  const b = f.blocs[k - 1] ?? "";
  return b.slice(0, b.indexOf("micros:") + 1 || undefined);
};
const repereDe = (k, role = "figure") => {
  const a = appels(bloc(k), "repere").find((x) => x.role === role);
  if (!a) throw new Error(`exercice ${k} : pas de repère (${role})`);
  return lireRepere(a.args);
};
const tableauDe = (k, role = "figure") => {
  const a = appels(bloc(k), "tableau").find((x) => x.role === role);
  if (!a) throw new Error(`exercice ${k} : pas de tableau (${role})`);
  return { entete: JSON.parse(a.args[0].replace(/−/g, "-")), ligne: JSON.parse(a.args[1].replace(/−/g, "-")) };
};

/* ── Le modèle, la plage, et le mot du corrigé ────────────────────────── */

const image = (d, x) => plus(fois(d.a, n(x)), d.b);
const antecedent = (d, y) => div(moins(n(y), d.b), d.a);
const par = ([x1, y1], [x2, y2]) => {
  const a = div(moins(n(y2), n(y1)), moins(n(x2), n(x1)));
  return { a, b: moins(n(y1), fois(a, n(x1))) };
};
const absq = (x) => (inf(x, Q(0)) ? moins(Q(0), x) : x);
const dedans = (x, [lo, hi]) => !inf(n(x), n(lo)) && !inf(n(hi), n(x));
/** Le script SITUE x, puis vérifie que le corrigé dit le bon mot. */
const situe = (k, x, plage, question = "") => {
  const interp = dedans(x, plage);
  // Les `\n` des corrigés sont encore écrits `\` + `n` dans le texte relu.
  const segment = question ? c(k).split(/\\n(?=[a-d]\) )/).find((s) => s.startsWith(question)) ?? "" : c(k);
  const mot = interp ? "interpolation" : "extrapolation";
  v.ok(`${k}${question ? " " + question : ""}. x = ${fr(n(x))} dans [${plage.map((p) => fr(n(p))).join(" ; ")}] ? ${mot}`, segment.toLowerCase().includes(mot), `« ${mot} » absent de : ${segment.slice(0, 60)}`);
};
/** Tous les relevés à `tol` au plus du modèle. */
const proches = (k, pts, d, tol = Q(1, 2)) => {
  const loin = pts.filter((p) => inf(tol, absq(moins(p.y, image(d, p.x)))));
  v.ok(`${k}. les ${pts.length} relevés sont à ${fr(tol)} au plus du modèle`, loin.length === 0, loin.map((p) => `(${fr(p.x)} ; ${fr(p.y)})`).join(" "));
};
const ptsTableau = (k, decale = 0) => {
  const { entete, ligne } = tableauDe(k);
  return entete.slice(1).map((s, i) => ({ x: moins(n(s), n(decale)), y: n(ligne[i + 1]) }));
};
const droiteDessinee = (k, d, role = "figure") => {
  const q = repereDe(k, role).droites[0];
  v.ok(`${k}. la droite dessinée est y = ${fr(d.a)}x + ${fr(d.b)}`, egal(q[0], Q(0)) && egal(q[1], d.a) && egal(q[2], d.b), q.map(fr).join(", "));
};
const plageDe = (pts) => [pts[0].x, pts.at(-1).x];

try {
  /* ── ★ ── */
  {
    const d = { a: Q(3), b: Q(20) };
    vaut("1. x = 5", image(d, 5), 35);
    situe(1, 5, [0, 8]);
    eg(1, "3 \\times 5 + 20 = 15 + 20 = 35");
    vaut("2. x = 12", image(d, 12), 56);
    situe(2, 12, [0, 8]);
    eg(2, "3 \\times 12 + 20 = 36 + 20 = 56");
  }
  {
    const a = appels(bloc(3), "intervalles")[0];
    const iv = json(a.args[2])[0];
    const points = json(a.args[4]);
    v.ok("3. le dessin montre la plage 2015–2023, bornes comprises", iv.de === 2015 && iv.a === 2023 && iv.deInclus && iv.aInclus);
    const annees = { A: 2019, B: 2028, C: 2012 };
    for (const p of points) {
      vaut(`3. point ${p.label} du dessin`, p.value, annees[p.label]);
      v.ok(`3. « $${p.label}$ : $${annees[p.label]}$ » dans l'énoncé`, e(3).includes(`$${p.label}$ : $${annees[p.label]}$`));
      const ligne = c(3).split("\\n").find((l) => l.startsWith(`$${p.label}$`)) ?? "";
      const mot = dedans(p.value, [iv.de, iv.a]) ? "interpolation" : "extrapolation";
      v.ok(`3. ${p.label} (${p.value}) : ${mot}`, ligne.includes(mot), ligne);
    }
  }
  {
    const r = repereDe(4);
    const d = { a: r.droites[0][1], b: r.droites[0][2] };
    vaut("4. la droite lue en x = 3", image(d, 3), 5);
    proches(4, r.points, d);
    situe(4, 3, plageDe(r.points));
    v.ok("4. l'année 3 n'a pas de relevé", !r.points.some((p) => egal(p.x, Q(3))));
    const s = repereDe(4, "schema");
    v.ok("4. le schéma marque (3 ; 5) sur la droite", s.points.some((p) => egal(p.x, Q(3)) && egal(p.y, Q(5))));
    dit(4, "$y = x + 2$", "$500$ randonneurs");
  }
  {
    const d = { a: Q(2), b: Q(10) };
    vaut("5. 2x + 10 = 40", antecedent(d, 40), 15);
    situe(5, 15, [0, 10]);
  }
  {
    const d = { a: Q(6), b: Q(76) };
    vaut("6. 40 ans", image(d, 40), 316);
    eg(6, "6 \\times 40 + 76 = 240 + 76 = 316");
    v.ok("6. plus de 3 m", inf(Q(300), image(d, 40)));
  }
  {
    const d = { a: D("-0.5"), b: Q(70) };
    vaut("7. semaine 12", image(d, 12), 64);
    vaut("7. semaine 140 : zéro seconde", image(d, 140), 0);
    eg(7, "-0{,}5 \\times 12 + 70 = -6 + 70 = 64", "-0{,}5 \\times 140 + 70 = -70 + 70 = 0");
  }
  {
    const d = { a: D("1.2"), b: Q(4) };
    vaut("8. 1,2x + 4 = 10", antecedent(d, 10), 5);
    situe(8, 5, [0, 10]);
    eg(8, "\\dfrac{6}{1{,}2} = 5", "1{,}2 \\times 5 + 4 = 6 + 4 = 10");
  }

  // Les droites graduées d'écran ajoutées le 28/09 : la zone des données est
  // la plage de l'énoncé, les points sont les valeurs cherchées, et chaque
  // point est dedans ou dehors comme le dit le corrigé.
  for (const [k, plage, valeurs] of [[1, [0, 8], [5]], [2, [0, 8], [12]], [5, [0, 10], [15]], [6, [2, 10], [40]], [7, [0, 10], [12, 140]], [8, [0, 10], [5]]]) {
    const a = appels(bloc(k), "intervalles").find((x) => x.role === "schema");
    const iv = json(a.args[2])[0];
    const pts = json(a.args[4]).map((p) => p.value);
    v.ok(`${k}. la droite graduée montre la plage [${plage.join(" ; ")}]`, iv.de === plage[0] && iv.a === plage[1] && iv.deInclus && iv.aInclus);
    v.ok(`${k}. les points marqués sont ${valeurs.join(", ")}`, JSON.stringify(pts) === JSON.stringify(valeurs));
    v.ok(`${k}. les points tiennent dans la droite graduée`, pts.every((x) => x >= Number(a.args[0]) && x <= Number(a.args[1])));
    const mot = c(k).includes("DANS la zone") || c(k).includes("au milieu de la zone");
    v.ok(`${k}. « dans / hors de la zone » s'accorde au dessin`, k === 7 || mot === dedans(valeurs[0], plage));
  }

  /* ── ★★ ── */
  {
    const r = repereDe(9);
    const d = { a: Q(-6), b: Q(12) };
    droiteDessinee(9, d);
    proches(9, r.points, d);
    const plage = plageDe(r.points);
    vaut("9. refuge", image(d, "1.2"), "4.8");
    vaut("9. sommet", image(d, "4.8"), "-16.8");
    situe(9, "1.2", plage, "a)");
    situe(9, "4.8", plage, "b)");
    vaut("9. le sommet est 2,8 km au-dessus de la dernière station", moins(D("4.8"), plage[1]), "2.8");
    eg(9, "-6 \\times 1{,}2 + 12 = -7{,}2 + 12 = 4{,}8", "-6 \\times 4{,}8 + 12 = -28{,}8 + 12 = -16{,}8");
  }
  {
    const pts = ptsTableau(10, 2000);
    const d = { a: D("0.5"), b: Q(40) };
    proches(10, pts, d);
    const plage = plageDe(pts);
    vaut("10. 2012", image(d, 12), 46);
    vaut("10. 2030", image(d, 30), 55);
    vaut("10. 60 000", antecedent(d, 60), 40);
    situe(10, 12, plage, "a)");
    situe(10, 30, plage, "b)");
    situe(10, 40, plage, "c)");
    eg(10, "0{,}5 \\times 12 + 40 = 46", "0{,}5 \\times 30 + 40 = 55");
    dit(10, "l'année $2040$");
  }
  {
    const r = repereDe(11);
    const d = { a: D("-0.6"), b: Q(8) };
    droiteDessinee(11, d);
    proches(11, r.points, d);
    const plage = plageDe(r.points);
    vaut("11. x = 2,5", image(d, "2.5"), "6.5");
    situe(11, "2.5", plage, "a)");
    const zero = antecedent(d, 0);
    vaut("11. disparition en 40/3 décennies", zero, Q(40, 3));
    v.ok("11. ≈ 13,3 décennies, ≈ 133 ans", Math.abs(Number(zero.n) / Number(zero.d) - 13.3) < 0.05 && Math.round((Number(zero.n) / Number(zero.d)) * 10) === 133);
    v.ok("11. la droite dessinée atteint 0 dans le cadre", repereDe(11).cadre[1] >= Number(zero.n) / Number(zero.d));
    eg(11, "-0{,}6 \\times 2{,}5 + 8 = -1{,}5 + 8 = 6{,}5");
    dit(11, "\\approx 13{,}3$ décennies", "$133$ ans");
  }
  {
    const pts = ptsTableau(12);
    const d = par([pts[0].x, pts[0].y], [pts.at(-1).x, pts.at(-1).y]);
    vaut("12. la droite passe par la première et la dernière année : a", d.a, "2.5");
    vaut("12. … b", d.b, 3);
    proches(12, pts, d);
    const plage = plageDe(pts);
    vaut("12. 9 %", antecedent(d, 9), "2.4");
    situe(12, "2.4", plage, "a)");
    vaut("12. x = 10", image(d, 10), 28);
    situe(12, 10, plage, "b)");
    vaut("12. x = 40", image(d, 40), 103);
    v.ok("12. plus de 100 %", inf(Q(100), image(d, 40)));
    eg(12, "\\dfrac{6}{2{,}5} = 2{,}4", "2{,}5 \\times 10 + 3 = 28", "2{,}5 \\times 40 + 3 = 103");
  }
  {
    const r = repereDe(13);
    const d = { a: D("1.5"), b: Q(4) };
    droiteDessinee(13, d);
    proches(13, r.points, d);
    const plage = plageDe(r.points);
    vaut("13. semaine 3", image(d, 3), "8.5");
    vaut("13. relevé semaine 3", r.points.find((p) => egal(p.x, Q(3))).y, 8);
    situe(13, 3, plage, "a)");
    vaut("13. semaine 8", image(d, 8), 16);
    situe(13, 8, plage, "b)");
    vaut("13. semaine 20", image(d, 20), 34);
    eg(13, "1{,}5 \\times 3 + 4 = 8{,}5", "1{,}5 \\times 8 + 4 = 16", "1{,}5 \\times 20 + 4 = 34");
  }
  {
    const pts = ptsTableau(14);
    const d = { a: Q(15), b: Q(-150) };
    const dp = par([pts[0].x, pts[0].y], [pts.at(-1).x, pts.at(-1).y]);
    v.ok("14. le modèle passe par le premier et le dernier relevé", egal(dp.a, d.a) && egal(dp.b, d.b));
    proches(14, pts, d, Q(10));
    const plage = plageDe(pts);
    vaut("14. 26 °C", image(d, 26), 240);
    situe(14, 26, plage, "a)");
    vaut("14. 5 °C", image(d, 5), -75);
    v.ok("14. 5 °C est hors de la plage", !dedans(5, plage));
    vaut("14. 40 °C", image(d, 40), 450);
    eg(14, "15 \\times 26 - 150 = 390 - 150 = 240", "15 \\times 5 - 150 = 75 - 150 = -75", "15 \\times 40 - 150 = 600 - 150 = 450");
  }
  {
    const d = { a: Q(8), b: Q(20) };
    vaut("15. 5 min", image(d, 5), 60);
    situe(15, 5, [0, 6], "a)");
    vaut("15. 15 min", image(d, 15), 140);
    situe(15, 15, [0, 6], "b)");
    vaut("15. 100 °C", antecedent(d, 100), 10);
    eg(15, "8 \\times 5 + 20 = 40 + 20 = 60", "8 \\times 15 + 20 = 120 + 20 = 140");
    const s = repereDe(15, "schema");
    const dz = { a: div(d.a, Q(10)), b: div(d.b, Q(10)) };
    droiteDessinee(15, dz, "schema");
    vaut("15. le palier du dessin : 100 °C en dizaines", s.horiz, 10);
    v.ok("15. le schéma marque le croisement (10 ; 10)", s.points.some((p) => egal(p.x, Q(10)) && egal(p.y, Q(10))));
    proches(15, s.points, dz, Q(0));
  }
  {
    const pts = ptsTableau(16);
    const d = { a: D("-0.4"), b: Q(12) };
    const dp = par([pts[0].x, pts[0].y], [pts.at(-1).x, pts.at(-1).y]);
    v.ok("16. le modèle passe par les relevés extrêmes", egal(dp.a, d.a) && egal(dp.b, d.b));
    proches(16, pts, d);
    const plage = plageDe(pts);
    vaut("16. 2 °C", image(d, 2), "11.2");
    situe(16, 2, plage, "a)");
    vaut("16. 8 kWh", antecedent(d, 8), 10);
    situe(16, 10, plage, "b)");
    vaut("16. 35 °C", image(d, 35), -2);
    eg(16, "-0{,}4 \\times 2 + 12 = -0{,}8 + 12 = 11{,}2", "-0{,}4 \\times 35 + 12 = -14 + 12 = -2", "\\dfrac{-4}{-0{,}4} = 10");
  }

  /* ── ★★★ ── */
  {
    const pts = ptsTableau(17, 1995);
    const d = { a: D("0.4"), b: Q(0) };
    proches(17, pts, d, Q(1));
    const plage = plageDe(pts);
    vaut("17. 2010", image(d, 15), 6);
    situe(17, 15, plage, "a)");
    vaut("17. 2100", image(d, 105), 42);
    situe(17, 105, plage, "b)");
    vaut("17. 30 cm", antecedent(d, 30), 75);
    situe(17, 75, plage, "c)");
    eg(17, "0{,}4 \\times 15 = 6", "0{,}4 \\times 105 = 42", "\\dfrac{30}{0{,}4} = 75", "1995 + 75 = 2070");
    vaut("17. 30 ans de relevés", moins(plage[1], plage[0]), 30);
  }
  {
    const r = repereDe(18);
    const d = { a: D("0.3"), b: Q(1) };
    droiteDessinee(18, d);
    proches(18, r.points, d);
    const plage = plageDe(r.points);
    vaut("18. 5 ans (lynx)", fois(image(d, 5), Q(10)), 25);
    situe(18, 5, plage, "a)");
    vaut("18. 10 ans", fois(image(d, 10), Q(10)), 40);
    vaut("18. 50 ans", fois(image(d, 50), Q(10)), 160);
    situe(18, 10, plage, "b)");
    const lim = antecedent(d, 6);
    vaut("18. 60 lynx", lim, Q(50, 3));
    v.ok("18. ≈ 16,7 ans", Math.round((Number(lim.n) / Number(lim.d)) * 10) === 167);
    eg(18, "0{,}3 \\times 5 + 1 = 2{,}5", "0{,}3 \\times 10 + 1 = 4", "0{,}3 \\times 50 + 1 = 16");
  }
  {
    const pts = ptsTableau(19);
    const d = par([pts[0].x, pts[0].y], [pts.at(-1).x, pts.at(-1).y]);
    vaut("19. a", d.a, -2);
    vaut("19. b", d.b, 30);
    proches(19, pts, d, Q(1));
    const plage = plageDe(pts);
    vaut("19. semaine 5", image(d, 5), 20);
    vaut("19. semaine 12", image(d, 12), 6);
    vaut("19. semaine 20", image(d, 20), -10);
    vaut("19. zéro vente", antecedent(d, 0), 15);
    v.ok("19. 5 dedans, 12 et 20 dehors", dedans(5, plage) && !dedans(12, plage) && !dedans(20, plage));
    dit(19, "Semaine $5$ (interpolation)", "Semaine $12$ (extrapolation)");
    eg(19, "\\dfrac{14 - 28}{8 - 1} = \\dfrac{-14}{7} = -2", "-2 \\times 5 + 30 = 20", "-2 \\times 12 + 30 = 6", "-2 \\times 20 + 30 = -10");
  }
  {
    const pts = ptsTableau(20, 1980);
    const d = { a: D("-0.5"), b: Q(270) };
    proches(20, pts, d, Q(1));
    const plage = plageDe(pts);
    // Le jour de l'année, recalculé par le calendrier (année non bissextile).
    const jour = (m, j) => Math.round((Date.UTC(2023, m - 1, j) - Date.UTC(2023, 0, 1)) / 864e5) + 1;
    vaut("20. le 1er septembre est le 244e jour", jour(9, 1), 244);
    vaut("20. le 1er août est le 213e jour", jour(8, 1), 213);
    vaut("20. 2004", image(d, 24), 258);
    vaut("20. 258e jour = 15 septembre", jour(9, 15), 258);
    situe(20, 24, plage, "a)");
    vaut("20. 2050", image(d, 70), 235);
    vaut("20. 235e jour = 23 août", jour(8, 23), 235);
    situe(20, 70, plage, "b)");
    vaut("20. 1700", image(d, -280), 410);
    vaut("20. le piège x = 280", image(d, 280), 130);
    situe(20, -280, plage, "c)");
    eg(20, "-0{,}5 \\times 24 + 270 = -12 + 270 = 258", "-0{,}5 \\times 70 + 270 = -35 + 270 = 235", "-0{,}5 \\times (-280) + 270 = 140 + 270 = 410", "258 - 244 = 14", "235 - 213 = 22", "1700 - 1980 = -280");
  }
} catch (err) {
  v.ok("le recalcul s'exécute", false, String(err?.stack ?? err));
}

/* ── Les règles de rendu, mesurées à 375 px le 28/09 ──────────────────── */
{
  let imprimes = 0;
  let ecran = 0;
  const fautes = [];
  f.blocs.forEach((_, i) => {
    const k = i + 1;
    const propre = bloc(k);
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
      const [en, li] = [JSON.parse(a.args[0]), JSON.parse(a.args[1])];
      if (en.length !== li.length) fautes.push(`${k} : tableau ${en.length} en-têtes pour ${li.length} cases`);
      if ([...en, ...li].some((t) => typeof t === "string" && /\$|-\d/.test(t))) fautes.push(`${k} : $ ou tiret-moins dans un tableau`);
    }
    for (const a of appels(propre, "intervalles")) {
      const [min, max] = [Number(a.args[0]), Number(a.args[1])];
      const pas = a.args[3] ? Number(a.args[3]) : 1;
      const nb = Math.round((max - min) / pas) + 1;
      const quatre = Math.max(Math.abs(min), Math.abs(max)) >= 1000;
      if (nb > (quatre ? 6 : 10)) fautes.push(`${k} : ${nb} graduations sur la droite graduée`);
    }
    for (const a of appels(propre, "diagramme")) {
      const labels = [...a.args[1].matchAll(/label: "([^"]*)"/g)].map((m) => m[1]);
      if (labels.length >= 4 && labels.some((l) => [...l].length > 9)) fautes.push(`${k} : libellé de plus de 9 signes sous ${labels.length} barres`);
    }
  });
  for (const m of source.matchAll(/label: "([^"]*)"/g)) if (/\$|-\d/.test(m[1])) fautes.push(`étiquette SVG « ${m[1]} » : $ ou tiret-moins`);
  v.ok("règles de rendu : cadres, grand, étiquettes, tableaux, graduations", fautes.length === 0, fautes.join(" | "));
  v.ok(`10 à 14 dessins imprimés (${imprimes} imprimés, ${ecran} à l'écran seulement)`, imprimes >= 10 && imprimes <= 14, `${imprimes}`);
  console.log(`Dessins : ${imprimes} imprimés, ${ecran} à l'écran seulement`);

  const rappels = [...f.series.matchAll(/rappel: \[([\s\S]*?)\n\s*\],/g)].map((m) => (m[1].match(/^\s*"/gm) ?? []).length);
  v.ok("trois rappels de 2 à 4 lignes", rappels.length === 3 && rappels.every((x) => x >= 2 && x <= 4), JSON.stringify(rappels));
  const serie3 = f.series.split(/niveau: [123],/)[3] ?? "";
  v.ok("les 4 problèmes ont un titre", (serie3.match(/^\s*titre: "/gm) ?? []).length === 5);
  v.ok("chaque problème a un dessin", [17, 18, 19, 20].every((k) => /figure:|schema:/.test(bloc(k))));
}

controlesCommuns(v, source, { notionId: NOTION, classe: "premiere" });
const nbCorrections = (source.match(/correction:/g) ?? []).length;
v.ok("exactement 20 `correction:`", nbCorrections === 20, `${nbCorrections}`);

console.log(`Interpoler et extrapoler (1re) — ${justes} vérifications justes, ${fausses.length} fausses`);
fausses.forEach((x) => console.log("  ✗", x));
process.exit(fausses.length ? 1 : 0);
