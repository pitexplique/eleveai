// Recalcul indépendant de la feuille « Taux d'évolution » (1re, automatismes,
// 28/09/2026) : lib/fiches-exercices/maths-premiere-auto-taux-evolution.tsx
//
// Chaque taux annoncé est refait en fractions EXACTES ((arrivée − départ) / départ),
// chaque chaîne d'évolutions par le produit des coefficients, chaque taux
// réciproque par l'inverse ; chaque égalité du corrigé est relue et ses membres
// évalués (`outilsEgalites`) ; chaque diagramme, tableau et courbe est RELU dans
// le source. Plus le socle commun : 8 + 8 + 4, dollars appariés, pas de LaTeX
// hors formule, pas de $ dans un canvas, micros de la notion toutes servies et
// aucune autre, exactement 20 `correction:`.
// Usage : node scripts/verifier-exercices-premiere-auto-taux-evolution.mjs

import fs from "node:fs";
import path from "node:path";
import { RACINE, Q, D, plus, moins, fois, div, egal, lireFeuille, controlesCommuns, outilsCourbes, outilsEgalites } from "./verifier-exercices-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-premiere-auto-taux-evolution.tsx";
const NOTION = "auto_taux_evolution";
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
const coef = (t) => plus(Q(1), div(n(t), Q(100)));
/** Le taux, en %, de a vers b. */
const taux = (a, b) => fois(div(moins(n(b), n(a)), n(a)), Q(100));
/** Le taux global, en %, d'une suite de taux. */
const global = (...ts) => fois(moins(ts.reduce((p, t) => fois(p, coef(t)), Q(1)), Q(1)), Q(100));
/** Le taux réciproque, en %, d'un taux t. */
const reciproque = (t) => fois(moins(div(Q(1), coef(t)), Q(1)), Q(100));
const vaut = (nom, a, b) => v.ok(nom, egal(n(a), n(b)), `${n(a).n}/${n(a).d} ≠ ${n(b).n}/${n(b).d}`);
const eg = (k, ...ts) => ts.forEach((t) => egalites(k, t));
const dit = (k, ...ps) => ps.forEach((p) => v.ok(`${k}. « ${p} » dans le corrigé`, c(k).includes(p), "absent"));

function diag(k, role) {
  const bloc = f.blocs[k - 1] ?? "";
  const tous = [...bloc.matchAll(/diagramme\("(\w+)", \[([\s\S]*?)\]\s*,?\s*\)/g)].map((m) => {
    const avant = bloc.slice(0, m.index);
    return {
      role: avant.lastIndexOf("figure:") > avant.lastIndexOf("schema:") ? "figure" : "schema",
      data: [...m[2].matchAll(/label: "([^"]*)", value: (-?[\d.]+)/g)].map(([, label, value]) => ({ label, value: D(value) })),
    };
  });
  const d = tous.find((x) => x.role === role);
  if (!d) throw new Error(`exercice ${k} : pas de diagramme (${role})`);
  return d.data;
}
const lu = (data, label) => {
  const d = data.find((x) => x.label === label);
  if (!d) throw new Error(`étiquette absente : ${label}`);
  return d.value;
};
const coefEtiquette = (label) => D(/× (\d+(?:,\d+)?)/.exec(label)[1]);

try {
  /* ── ★ ── */
  vaut("1. taux 40 → 50", taux(40, 50), 25);
  eg(1, "\\dfrac{50 - 40}{40} = \\dfrac{10}{40} = 0{,}25", "\\dfrac{10}{50} = 0{,}2");
  {
    const d = diag(1, "schema");
    vaut("1. diagramme", fois(lu(d, "départ"), coefEtiquette("arrivée (× 1,25)")), lu(d, "arrivée (× 1,25)"));
  }
  vaut("2. taux 250 → 200", taux(250, 200), -20);
  eg(2, "\\dfrac{200 - 250}{250} = \\dfrac{-50}{250} = -0{,}2");
  vaut("3. taux 800 → 1 200", taux(800, 1200), 50);
  eg(3, "\\dfrac{1\\,200}{800} = \\dfrac{12}{8} = 1{,}5", "1{,}5 - 1 = 0{,}5", "\\dfrac{1\\,200 - 800}{800} = 0{,}5");
  vaut("4. +10 % puis +20 %", global(10, 20), 32);
  eg(4, "1{,}1 \\times 1{,}2 = 1{,}32", "1{,}32 - 1 = 0{,}32");
  {
    const { ligne } = tableauDe(4);
    vaut("4. tableau × 1,1", fois(n(ligne[1]), D("1,1")), ligne[2]);
    vaut("4. tableau × 1,2", fois(n(ligne[2]), D("1,2")), ligne[3]);
  }
  vaut("5. +50 % puis −20 %", global(50, -20), 20);
  eg(5, "1{,}5 \\times 0{,}8 = 1{,}2", "50 - 20");
  vaut("6. −10 % puis +10 % sur 50", fois(Q(50), fois(coef(-10), coef(10))), "49,5");
  eg(6, "50 \\times 0{,}9 = 45", "45 \\times 1{,}1 = 49{,}5", "0{,}9 \\times 1{,}1 = 0{,}99", "50 \\times 0{,}99 = 49{,}5");
  vaut("6. la hausse rapporte 4,50", fois(Q(45), D("0,1")), "4,5");
  dit(6, "$4{,}50$ €", "$5$ € perdus");
  {
    const d = diag(6, "schema");
    vaut("6. barre × 0,9", fois(lu(d, "départ"), D("0,9")), lu(d, "× 0,9"));
    vaut("6. barre puis × 1,1", fois(lu(d, "× 0,9"), D("1,1")), lu(d, "puis × 1,1"));
  }
  vaut("7. réciproque de +25 %", reciproque(25), -20);
  eg(7, "\\dfrac{1}{1{,}25} = \\dfrac{100}{125} = 0{,}8", "0{,}8 = 1 - 0{,}2", "100 \\times 1{,}25 = 125", "125 \\times 0{,}8 = 100", "125 \\times 0{,}75 = 93{,}75");
  vaut("8. réciproque de +100 %", reciproque(100), -50);
  vaut("8. réciproque de −50 %", reciproque(-50), 100);
  eg(8, "\\dfrac{1}{2} = 0{,}5", "\\dfrac{1}{0{,}5} = 2");

  /* ── ★★ ── */
  {
    const d = diag(9, "figure");
    const [a, b, cc] = ["2021", "2022", "2023"].map((x) => lu(d, x));
    vaut("9. a", taux(a, b), 20);
    vaut("9. b", taux(b, cc), 25);
    vaut("9. c direct", taux(a, cc), 50);
    vaut("9. c par les coefficients", global(20, 25), 50);
    eg(9, "\\dfrac{240 - 200}{200} = \\dfrac{40}{200} = 0{,}2", "\\dfrac{300 - 240}{240} = \\dfrac{60}{240} = 0{,}25", "\\dfrac{300 - 200}{200} = 0{,}5", "1{,}2 \\times 1{,}25 = 1{,}5");
  }
  {
    const { ligne } = tableauDe(10);
    vaut("10. points", moins(n(ligne[1]), n(ligne[2])), 2);
    vaut("10. taux", taux(ligne[1], ligne[2]), -20);
    eg(10, "10 - 8 = 2", "\\dfrac{8 - 10}{10} = -0{,}2");
    const d = diag(10, "schema");
    vaut("10. schéma", fois(lu(d, "2015"), coefEtiquette("2025 (× 0,8)")), lu(d, "2025 (× 0,8)"));
  }
  vaut("11. +5 % puis +2 %", global(5, 2), "7,1");
  eg(11, "1{,}05 \\times 1{,}02 = 1{,}05 + 0{,}021 = 1{,}071");
  {
    const d = diag(11, "schema");
    vaut("11. barre des prix", fois(Q(1000), fois(coef(5), coef(2))), lu(d, "prix (base 1 000)"));
    vaut("11. barre du salaire", fois(Q(1000), coef(7)), lu(d, "salaire (base 1 000)"));
  }
  vaut("12. −30 % puis −20 %", global(-30, -20), -44);
  eg(12, "200 \\times 0{,}7 = 140", "140 \\times 0{,}8 = 112", "0{,}7 \\times 0{,}8 = 0{,}56", "0{,}56 - 1 = -0{,}44");
  {
    const { ligne } = tableauDe(12);
    vaut("12. tableau × 0,7", fois(n(ligne[1]), D("0,7")), ligne[2]);
    vaut("12. tableau × 0,8", fois(n(ligne[2]), D("0,8")), ligne[3]);
  }
  {
    const [cours] = courbes(13, "figure");
    vaut("13. jour 1", cours(Q(1)), 10);
    vaut("13. jour 2", cours(Q(2)), 8);
    vaut("13. jour 4", cours(Q(4)), 10);
    vaut("13. taux", taux(cours(Q(1)), cours(Q(2))), -20);
    vaut("13. réciproque", reciproque(-20), 25);
    vaut("13. jour 3 → 4", taux(cours(Q(3)), cours(Q(4))), 25);
    eg(13, "\\dfrac{8 - 10}{10} = -0{,}2", "\\dfrac{1}{0{,}8} = \\dfrac{10}{8} = 1{,}25", "8 \\times 1{,}25 = 10");
  }
  vaut("14. −20 % puis +20 %", global(-20, 20), -4);
  eg(14, "50\\,000 \\times 0{,}8 = 40\\,000", "40\\,000 \\times 1{,}2 = 48\\,000", "0{,}8 \\times 1{,}2 = 0{,}96", "40\\,000 \\times 1{,}25 = 50\\,000");
  {
    const d = diag(14, "schema");
    vaut("14. barre × 0,8", fois(lu(d, "avant (milliers)"), D("0,8")), lu(d, "× 0,8"));
    vaut("14. barre puis × 1,2", fois(lu(d, "× 0,8"), D("1,2")), lu(d, "puis × 1,2"));
  }
  vaut("15. réciproque de +60 %", reciproque(60), "-37,5");
  eg(15, "\\dfrac{1}{1{,}6} = \\dfrac{10}{16} = \\dfrac{5}{8} = 0{,}625", "0{,}625 = 1 - 0{,}375", "200 \\times 1{,}6 = 320", "320 \\times 0{,}625 = 200", "320 \\times 0{,}4 = 128");
  {
    const { ligne } = tableauDe(15);
    vaut("15. tableau crise", fois(n(ligne[1]), D("1,6")), ligne[2]);
    vaut("15. tableau retour", fois(n(ligne[2]), D("0,625")), ligne[3]);
  }
  {
    const [p] = courbes(16, "figure");
    const [a19, a20, a23] = [1, 2, 5].map((x) => p(Q(x)));
    vaut("16. 2019", a19, 12);
    vaut("16. 2020", a20, 3);
    vaut("16. 2023", a23, 12);
    vaut("16. a", taux(a19, a20), -75);
    vaut("16. b", taux(a20, a23), 300);
    vaut("16. réciproque de −75 %", reciproque(-75), 300);
    eg(16, "\\dfrac{3 - 12}{12} = -0{,}75", "\\dfrac{12 - 3}{3} = 3", "0{,}25 \\times 4 = 1");
  }

  /* ── ★★★ ── */
  {
    const d = diag(17, "figure");
    const [a0, a1, b0, b1] = ["A 2000", "A 2020", "B 2000", "B 2020"].map((x) => lu(d, x));
    d.forEach(({ label }) => v.ok(`17. étiquette « ${label} » : 7 signes au plus`, [...label].length <= 7));
    vaut("17. taux de A", taux(a0, a1), 25);
    vaut("17. taux de B", taux(b0, b1), -10);
    vaut("17. A en 2040", fois(a1, coef(25)), "62,5");
    vaut("17. B en 2040", fois(b1, coef(-10)), "48,6");
    vaut("17. taux global de A", global(25, 25), "56,25");
    vaut("17. retour de B : 60/54 = 1/0,9", div(b0, b1), div(Q(1), coef(-10)));
    v.ok("17. 10/9 ≈ 1,11", Math.abs(10 / 9 - 1.11) < 0.005);
    eg(17, "\\dfrac{50 - 40}{40} = 0{,}25", "\\dfrac{54 - 60}{60} = -0{,}1", "50 \\times 1{,}25 = 62{,}5", "54 \\times 0{,}9 = 48{,}6", "1{,}25 \\times 1{,}25 = 1{,}5625", "\\dfrac{60}{54} = \\dfrac{10}{9}", "54 \\times 1{,}1 = 59{,}4");
    const s = diag(17, "schema");
    vaut("17. schéma A", lu(s, "A 2040"), "62,5");
    vaut("17. schéma B", lu(s, "B 2040"), "48,6");
  }
  vaut("18. −40 % puis +40 %", global(-40, 40), -16);
  eg(18, "1\\,000 \\times 0{,}6 = 600", "600 \\times 1{,}4 = 840", "0{,}6 \\times 1{,}4 = 0{,}84", "\\dfrac{1}{0{,}6} = \\dfrac{10}{6} = \\dfrac{5}{3}", "600 \\times \\dfrac{5}{3} = 1\\,000");
  v.ok("18. 5/3 ≈ 1,667 et +66,7 %", Math.abs(5 / 3 - 1.667) < 0.0005 && Math.abs((5 / 3 - 1) * 100 - 66.7) < 0.05);
  {
    const d = diag(18, "schema");
    vaut("18. barre × 0,6", fois(lu(d, "départ"), D("0,6")), lu(d, "× 0,6"));
    vaut("18. barre puis × 1,4", fois(lu(d, "× 0,6"), D("1,4")), lu(d, "puis × 1,4"));
  }
  vaut("19. trois fois +10 %", global(10, 10, 10), "33,1");
  eg(19, "1{,}1 \\times 1{,}1 = 1{,}21", "1{,}21 \\times 1{,}1 = 1{,}331", "500 \\times 1{,}331 = 665{,}5", "500 \\times 1{,}3 = 650", "665{,}5 - 650 = 15{,}5");
  {
    const d = diag(19, "schema");
    ["départ", "an 1", "an 2", "an 3"].reduce((prec, a) => {
      if (prec) vaut(`19. ${a} = précédent × 1,1`, fois(prec, coef(10)), lu(d, a));
      return lu(d, a);
    }, null);
  }
  {
    const [s] = courbes(20, "figure");
    const [s0, s1, s2] = [0, 1, 2].map((x) => s(Q(x)));
    vaut("20. décennie 1", taux(s0, s1), -20);
    vaut("20. décennie 2", taux(s1, s2), "-37,5");
    vaut("20. global", global(-20, "-37,5"), -50);
    vaut("20. le dessin : la moitié", fois(s0, Q(1, 2)), s2);
    vaut("20. reboisement", fois(s2, coef(50)), "7,5");
    vaut("20. réciproque de −50 %", reciproque(-50), 100);
    v.ok("20. −57,5 est bien la somme fausse", -20 + -37.5 === -57.5);
    eg(20, "\\dfrac{8 - 10}{10} = -0{,}2", "\\dfrac{5 - 8}{8} = -\\dfrac{3}{8} = -0{,}375", "0{,}8 \\times 0{,}625 = 0{,}5", "5 \\times 1{,}5 = 7{,}5", "\\dfrac{1}{0{,}5} = 2");
    const [, reb] = courbes(20, "schema");
    vaut("20. schéma : le point du reboisement", reb(Q(3)), "7,5");
  }
  controlerTout();
} catch (e) {
  v.ok("le recalcul s'exécute", false, String(e?.message ?? e));
}

controlesCommuns(v, source, { notionId: NOTION, classe: "premiere" });
const nbCorrections = (source.match(/correction:/g) ?? []).length;
v.ok("exactement 20 `correction:`", nbCorrections === 20, `${nbCorrections}`);

console.log(`Taux d'évolution (1re) — ${justes} vérifications justes, ${fausses.length} fausses`);
fausses.forEach((x) => console.log("  ✗", x));
process.exit(fausses.length ? 1 : 0);
