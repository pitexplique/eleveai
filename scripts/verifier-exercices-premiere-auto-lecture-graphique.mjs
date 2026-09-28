// Recalcul indépendant de la feuille « Lecture graphique » (1re, automatismes,
// 28/09/2026) : lib/fiches-exercices/maths-premiere-auto-lecture-graphique.tsx
//
// Les courbes ne sont pas recopiées : elles sont RELUES dans les appels
// `repere(…)` du source (coefficients `q`, points `pts`) et évaluées en
// fractions exactes. Chaque image annoncée est recalculée ; chaque liste
// d'antécédents est retrouvée — racines exactes pour une parabole ou une droite,
// balayage au quart d'unité (avec détection des changements de signe) pour une
// ligne brisée — et comparée à celle du corrigé. Les égalités du corrigé sont
// relues et évaluées (`outilsEgalites`). Chaque point marqué est sur sa courbe
// (`controlerTout`). Plus le socle commun (8 + 8 + 4, dollars, LaTeX, canvas,
// micros de la notion, exactement 20 `correction:`).
// Usage : node scripts/verifier-exercices-premiere-auto-lecture-graphique.mjs

import fs from "node:fs";
import path from "node:path";
import { RACINE, Q, D, plus, moins, fois, div, egal, inf, lireFeuille, controlesCommuns, outilsCourbes, outilsEgalites, racines } from "./verifier-exercices-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-premiere-auto-lecture-graphique.tsx";
const NOTION = "auto_lecture_graphique";
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
const egalites = outilsEgalites(v, f);
const { courbes, tableauDe, controlerTout } = outilsCourbes(v, f, source);

const n = (x) => (typeof x === "object" ? x : D(String(x)));
const txt = (q) => (q.d === 1n ? `${q.n}` : `${q.n}/${q.d}`);
const vaut = (nom, a, b) => v.ok(nom, a !== null && egal(n(a), n(b)), a === null ? "hors courbe" : `${txt(n(a))} ≠ ${txt(n(b))}`);
const eg = (k, ...ts) => ts.forEach((t) => egalites(k, t));
const valeur = (q) => Number(q.n) / Number(q.d);
const liste = (xs) => xs.map(n).sort((a, b) => valeur(a) - valeur(b)).map(txt).join(" ; ");

/** Les x de [a ; b] où F vaut y : zéros exacts au quart d'unité ; un
 *  changement de signe ENTRE deux points de la grille est signalé. */
function balayage(F, y, a, b) {
  const xs = [];
  let prec = null;
  for (let m = 4 * a; m <= 4 * b; m++) {
    const x = Q(m, 4);
    const fx = F(x);
    if (fx === null) continue;
    const d = moins(fx, n(y));
    const s = egal(d, Q(0)) ? 0 : inf(d, Q(0)) ? -1 : 1;
    if (s === 0) xs.push(x);
    else if (prec && prec.s !== 0 && prec.s !== s) xs.push(`entre ${txt(prec.x)} et ${txt(x)}`);
    prec = { x, s };
  }
  return xs;
}
/** Antécédents lus sur une ligne brisée. */
const antBrisee = (nom, F, y, [a, b], attendu) => {
  const trouves = balayage(F, y, a, b);
  const propres = trouves.every((t) => typeof t === "object");
  v.ok(nom, propres && liste(trouves) === liste(attendu), `trouvés : ${trouves.map((t) => (typeof t === "object" ? txt(t) : t)).join(" ; ")}`);
};
/** Antécédents EXACTS sur une parabole ou une droite (racines de F − y). */
const antExacts = (nom, F, y, attendu) => {
  const r = racines((x) => moins(F(x), n(y)));
  v.ok(nom, r !== null && liste(r) === liste(attendu), `trouvés : ${r ? r.map(txt).join(" ; ") : "partout"}`);
};
/** Le maximum (ou minimum) de F sur la grille au quart, et où il est atteint. */
function extremum(F, a, b, sens = 1) {
  let best = null;
  for (let m = 4 * a; m <= 4 * b; m++) {
    const x = Q(m, 4);
    const y = F(x);
    if (y === null) continue;
    if (!best || (sens === 1 ? inf(best.y, y) : inf(y, best.y))) best = { x, y };
  }
  return best;
}

try {
  /* ── ★ ── */
  {
    const [F] = courbes(1);
    [[0, 3], [1, 4], [3, 0]].forEach(([x, y]) => vaut(`1. f(${x})`, F(Q(x)), y));
    const m = extremum(F, -2, 4);
    vaut("1. le sommet est en 1", m.x, 1);
  }
  {
    const [F] = courbes(2);
    antExacts("2. antécédents de −3", F, -3, [0, 2]);
    antExacts("2. antécédents de 5", F, 5, [-2, 4]);
    antExacts("2. antécédent de −4", F, -4, [1]);
    antExacts("2. antécédents de −6", F, -6, []);
  }
  eg(3, "2^2 + 3 = 4 + 3 = 7", "(-1)^2 + 3 = 1 + 3 = 4");
  eg(4, "2 \\times (-2)^2 - 1 = 2 \\times 4 - 1 = 7");
  antExacts("4. points d'ordonnée 1", (x) => moins(fois(Q(2), fois(x, x)), Q(1)), 1, [-1, 1]);
  {
    const [F] = courbes(5);
    vaut("5. à 14 h (x = 4)", F(Q((14 - 6) / 2)), 4);
    vaut("5. 4 unités = 20 °C", fois(F(Q(4)), Q(5)), 20);
    antBrisee("5. 15 °C = 3 unités", F, 3, [0, 6], [3, 5]);
    vaut("5. x = 3 → 12 h", 6 + 2 * 3, 12);
    vaut("5. x = 5 → 16 h", 6 + 2 * 5, 16);
    eg(5, "\\dfrac{8}{2} = 4", "4 \\times 5 = 20", "\\dfrac{15}{5} = 3");
  }
  {
    const A2 = (x) => plus(div(fois(n(x), n(x)), Q(4)), Q(1));
    eg(6, "\\dfrac{4}{4} + 1 = 2", "\\dfrac{9}{4} + 1 = 3{,}25", "\\dfrac{16}{4} + 1 = 5", "\\dfrac{25}{4} + 1 = 7{,}25");
    antExacts("6. A(x) = 5 pour x ≥ 0 : x = 4", A2, 5, [-4, 4]);
    const { entete, ligne } = tableauDe(6);
    entete.slice(1).forEach((m, i) => vaut(`6. tableau, mois ${m}`, A2(m), D(String(ligne[i + 1]))));
  }
  eg(7, "2^2 - 2 = 2");
  antExacts("7. antécédents de 2", (x) => moins(fois(x, x), Q(2)), 2, [-2, 2]);
  vaut("7. le schéma trace x² − 2", courbes(7, "schema")[0](Q(2)), 2);
  eg(8, "0^2 - 4 \\times 0 = 0");
  antExacts("8. y = 0", (x) => moins(fois(x, x), fois(Q(4), x)), 0, [0, 4]);

  /* ── ★★ ── */
  {
    const [F] = courbes(9);
    vaut("9. départ", F(Q(0)), 4);
    const m = extremum(F, 0, 10);
    vaut("9. sommet : km 4", m.x, 4);
    vaut("9. sommet : 12", m.y, 12);
    antBrisee("9. à 10 centaines de mètres", F, 10, [0, 10], [3, 6]);
    eg(9, "1\\,200 - 400 = 800");
  }
  {
    const [F] = courbes(10);
    vaut("10. B(2)", F(Q(2)), 3);
    antExacts("10. B = 0", F, 0, [1, 5]);
    const m = extremum(F, 0, 6);
    vaut("10. sommet x", m.x, 3);
    vaut("10. sommet y", m.y, 4);
  }
  {
    const [F] = courbes(11);
    vaut("11. C(2)", F(Q(2)), 6);
    vaut("11. C(3)", F(Q(3)), 11);
    eg(11, "2^2 + 2 = 6", "3^2 + 2 = 11");
  }
  {
    const [F] = courbes(12);
    vaut("12. avril", F(Q(4)), 7);
    antBrisee("12. 14 °C = 7 unités", F, 7, [1, 12], [4, 10]);
    const m = extremum(F, 1, 12);
    vaut("12. le mois le plus chaud", m.x, 7);
    vaut("12. sa température (unités)", m.y, 12);
    eg(12, "7 \\times 2 = 14", "12 \\times 2 = 24");
  }
  {
    const [F] = courbes(13);
    vaut("13. V(0)", F(Q(0)), 12);
    antExacts("13. V = 10 (t ≥ 0 : 2)", F, 10, [-2, 2]);
    antExacts("13. V = 4 (t ≥ 0 : 4)", F, 4, [-4, 4]);
    vaut("13. perte des deux premières semaines", moins(F(Q(0)), F(Q(2))), 2);
    vaut("13. perte des deux suivantes", moins(F(Q(2)), F(Q(4))), 6);
    eg(13, "-0{,}5 \\times 4^2 + 12 = -8 + 12 = 4");
  }
  {
    const [F] = courbes(14);
    vaut("14. 2010 (x = 2)", F(Q(2)), 6);
    antExacts("14. 800 € = 8 unités", F, 8, [4]);
    vaut("14. pente", moins(F(Q(1)), F(Q(0))), 1);
    eg(14, "\\dfrac{10}{5} = 2", "6 \\times 100 = 600", "4 \\times 5 = 20");
  }
  {
    const [F] = courbes(15);
    vaut("15. h(4)", F(Q(4)), 8);
    vaut("15. h(2)", F(Q(2)), 8);
    v.ok("15. au-dessus du rempart de 6", inf(Q(6), F(Q(4))));
    antExacts("15. retombe au sol", F, 0, [0, 6]);
    eg(15, "-4^2 + 6 \\times 4 = -16 + 24 = 8", "-2^2 + 6 \\times 2 = -4 + 12 = 8");
  }
  {
    const [F] = courbes(16);
    vaut("16. lancement", F(Q(0)), 10);
    antBrisee("16. 800 €", F, 8, [0, 10], [2]);
    vaut("16. mois 6", F(Q(6)), 5);
    const sous = [];
    for (let m = 24; m <= 40; m++) if (inf(Q(5), F(Q(m, 4)))) sous.push(m / 4);
    v.ok("16. à 500 € ou moins à partir du mois 6", sous.length === 0, sous.join(" "));
    const bas = extremum(F, 0, 10, -1);
    vaut("16. le plus bas : 4", bas.y, 4);
    v.ok("16. jamais sous 3", inf(Q(3), bas.y));
  }

  /* ── ★★★ ── */
  {
    const [F] = courbes(17);
    vaut("17. P(0)", F(Q(0)), 10);
    vaut("17. P(2)", F(Q(2)), 4);
    const m = extremum(F, 0, 8, -1);
    vaut("17. minimum en t = 4", m.x, 4);
    vaut("17. minimum 2", m.y, 2);
    antExacts("17. 400 habitants", F, 4, [2, 6]);
    vaut("17. P(8)", F(Q(8)), 10);
    eg(17, "0{,}5 \\times 2^2 - 4 \\times 2 + 10 = 2 - 8 + 10 = 4", "0{,}5 \\times 8^2 - 4 \\times 8 + 10 = 32 - 32 + 10 = 10");
  }
  {
    const [F] = courbes(18);
    vaut("18. R(2)", F(Q(2)), 6);
    antExacts("18. R = 6", F, 6, [2, 6]);
    const m = extremum(F, 0, 8);
    vaut("18. sommet x", m.x, 4);
    vaut("18. sommet y", m.y, 8);
    vaut("18. R(8)", F(Q(8)), 0);
    eg(18, "-0{,}5 \\times 6^2 + 4 \\times 6 = -18 + 24 = 6");
  }
  {
    const [F] = courbes(19);
    vaut("19. mai", F(Q(5)), 4);
    antBrisee("19. 600 m³/s", F, 6, [1, 12], [4, 11]);
    const m = extremum(F, 1, 12, -1);
    vaut("19. étiage en août", m.x, 8);
    vaut("19. étiage : 1", m.y, 1);
    antBrisee("19. 200 m³/s", F, 2, [1, 12], [7, 9]);
    const dessous = [];
    for (let k = 4; k <= 48; k++) {
      const x = Q(k, 4);
      const sous = !inf(Q(2), F(x));
      const attendu = !inf(x, Q(7)) && !inf(Q(9), x);
      if (sous !== attendu) dessous.push(k / 4);
    }
    v.ok("19. 200 m³/s ou moins exactement de juillet à septembre", dessous.length === 0, dessous.join(" "));
  }
  {
    eg(20, "2 \\times 2 + 3 = 7", "2 \\times 4 + 3 = 11", "2 \\times 3 + 3 = 9");
    const P = (h) => plus(fois(Q(2), h), Q(3));
    antExacts("20. 2h + 3 = 10", P, 10, ["3,5"]);
    const [S] = courbes(20, "schema");
    vaut("20. le schéma trace 2h + 3", S(D("3,5")), 10);
    vaut("20. le schéma en 2", S(Q(2)), 7);
  }
  controlerTout();
} catch (e) {
  v.ok("le recalcul s'exécute", false, String(e?.stack ?? e));
}

controlesCommuns(v, source, { notionId: NOTION, classe: "premiere" });
const nbCorrections = (source.match(/correction:/g) ?? []).length;
v.ok("exactement 20 `correction:`", nbCorrections === 20, `${nbCorrections}`);

console.log(`Lecture graphique (1re) — ${justes} vérifications justes, ${fausses.length} fausses`);
fausses.forEach((x) => console.log("  ✗", x));
process.exit(fausses.length ? 1 : 0);
