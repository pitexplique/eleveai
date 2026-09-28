// Recalcul indépendant de la feuille « Coefficient multiplicateur » (1re,
// automatismes, 28/09/2026) : lib/fiches-exercices/maths-premiere-auto-coefficient-multiplicateur.tsx
//
// Chaque évolution annoncée est refaite en fractions EXACTES (départ × (1 + t/100)
// = arrivée), chaque égalité du corrigé est relue et ses membres évalués
// (`outilsEgalites`), chaque diagramme, tableau et courbe est RELU dans le source
// et confronté aux nombres de l'énoncé et du corrigé. Plus le socle commun :
// 8 + 8 + 4, dollars appariés, pas de LaTeX hors formule, pas de $ dans un canvas,
// micros de la notion toutes servies et aucune autre, exactement 20 `correction:`.
// Usage : node scripts/verifier-exercices-premiere-auto-coefficient-multiplicateur.mjs

import fs from "node:fs";
import path from "node:path";
import { RACINE, Q, D, plus, fois, div, egal, lireFeuille, controlesCommuns, outilsCourbes, outilsEgalites } from "./verifier-exercices-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-premiere-auto-coefficient-multiplicateur.tsx";
const NOTION = "auto_coefficient_multiplicateur";
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
/** Le coefficient d'une évolution de t % (t signé). */
const coef = (t) => plus(Q(1), div(n(t), Q(100)));
const vaut = (nom, a, b) => v.ok(nom, egal(n(a), n(b)), `${n(a).n}/${n(a).d} ≠ ${n(b).n}/${n(b).d}`);
/** départ, évolution de t %, arrivée. */
const evol = (k, a, t, b) => vaut(`${k}. ${a} puis ${t} % donne ${b}`, fois(n(a), coef(t)), b);
const eg = (k, ...ts) => ts.forEach((t) => egalites(k, t));
const dit = (k, ...ps) => ps.forEach((p) => v.ok(`${k}. « ${p} » dans le corrigé`, c(k).includes(p), "absent"));

/** Les `diagramme(type, [{ label, value }])` de l'exercice k, relus dans le source. */
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
/** Le coefficient écrit dans une étiquette : « après (× 1,25) » → 1,25. */
const coefEtiquette = (label) => D(/× (\d+(?:,\d+)?)/.exec(label)[1]);

try {
  /* ── ★ ── */
  eg(1, "1 + 0{,}15 = 1{,}15", "1 + 0{,}03 = 1{,}03", "1 + 1 = 2");
  {
    const { entete, ligne } = tableauDe(1);
    entete.slice(1).forEach((h, i) => vaut(`1. tableau : ${h}`, coef(h.replace(/[+ %]/g, "")), D(ligne[i + 1])));
  }
  eg(2, "1 - 0{,}3 = 0{,}7", "1 - 0{,}05 = 0{,}95", "1 - 0{,}8 = 0{,}2");
  [[-30, "0,7"], [-5, "0,95"], [-80, "0,2"]].forEach(([t, k]) => vaut(`2. coefficient de ${t} %`, coef(t), k));
  {
    const d = diag(2, "schema");
    vaut("2. le camembert fait 100", plus(lu(d, "il reste 20 %"), lu(d, "la remise 80 %")), 100);
    vaut("2. il reste 100 × 0,2", fois(Q(100), coef(-80)), lu(d, "il reste 20 %"));
  }
  eg(3, "1{,}08 = 1 + 0{,}08", "0{,}92 = 1 - 0{,}08", "1{,}5 = 1 + 0{,}5", "0{,}6 = 1 - 0{,}4");
  [[8, "1,08"], [-8, "0,92"], [50, "1,5"], [-40, "0,6"]].forEach(([t, k]) => vaut(`3. ${k} ↔ ${t} %`, coef(t), k));
  dit(3, "hausse de $8$ %", "baisse de $8$ %", "hausse de $50$ %", "baisse de $40$ %");

  evol(4, 80, 25, 100);
  eg(4, "1 + 0{,}25 = 1{,}25", "80 \\times 1{,}25 = 100", "80 + 20 = 100", "80 \\times 0{,}25 = 20");
  {
    const d = diag(4, "schema");
    vaut("4. le diagramme : avant × 1,25 = après", fois(lu(d, "avant"), coefEtiquette("après (× 1,25)")), lu(d, "après (× 1,25)"));
    vaut("4. le coefficient de l'étiquette est celui de +25 %", coefEtiquette("après (× 1,25)"), coef(25));
  }
  evol(5, 60, -30, 42);
  eg(5, "60 \\times 0{,}7 = 42", "60 \\times 0{,}3 = 18", "60 - 18 = 42");

  evol(6, 60, 20, 72);
  eg(6, "\\dfrac{72}{1{,}2} = \\dfrac{720}{12} = 60", "60 \\times 1{,}2 = 72");
  vaut("6. le piège : 72 × 0,8", fois(Q(72), coef(-20)), "57,6");
  dit(6, "$57{,}60$ €");
  {
    const { ligne } = tableauDe(6);
    vaut("6. tableau : départ × coefficient = arrivée", fois(n(ligne[0]), coefEtiquette(ligne[1])), ligne[2]);
  }
  evol(7, 60, -25, 45);
  eg(7, "\\dfrac{45}{0{,}75} = 60", "4 \\times 15 = 60", "45 \\times 1{,}25 = 56{,}25");
  vaut("7. un quart de 60", div(Q(60), Q(4)), 15);

  eg(8, "1{,}005 = 1 + 0{,}005", "0{,}995 = 1 - 0{,}005", "3 = 1 + 2", "0{,}005 = \\dfrac{0{,}5}{100}");
  [["0,5", "1,005"], ["-0,5", "0,995"], [200, 3]].forEach(([t, k]) => vaut(`8. ${k} ↔ ${t} %`, coef(t), k));

  /* ── ★★ ── */
  {
    const { ligne } = tableauDe(9);
    const [bl, ba, te] = ligne.slice(1);
    evol(9, bl, -40, 72);
    evol(9, ba, -20, 72);
    evol(9, te, -60, 10);
    eg(9, "120 \\times 0{,}6 = 72", "90 \\times 0{,}8 = 72", "25 \\times 0{,}4 = 10");
    vaut("9. écart avant soldes", bl - ba, 30);
    vaut("9. perte du blouson", bl - 72, 48);
    vaut("9. perte du tee-shirt", te - 10, 15);
    dit(9, "$30$ € d'écart", "seulement $15$ €", "soit $48$ €");
    const d = diag(9, "schema");
    // Les coefficients sont dans le corrigé (les étiquettes restent courtes : 8 signes au plus).
    [["blouson", bl, -40, "0{,}6"], ["baskets", ba, -20, "0{,}8"], ["T-shirt", te, -60, "0{,}4"]].forEach(([label, p, t, k]) => {
      vaut(`9. ${label} : coefficient de ${t} %`, D(k.replace("{,}", ",")), coef(t));
      dit(9, `$\\times ${k}$`);
      vaut(`9. ${label} : barre`, fois(n(p), coef(t)), lu(d, label));
      v.ok(`9. étiquette « ${label} » : 8 signes au plus`, [...label].length <= 8);
    });
  }
  evol(10, 1800, 5, 1890);
  evol(10, 150, 2, 153);
  eg(10, "1\\,800 \\times 1{,}05 = 1\\,890", "150 \\times 1{,}02 = 153", "4 \\times 3 = 12", "1\\,800 \\times 1{,}05 = 1\\,800 + 1\\,800 \\times 0{,}05 = 1\\,800 + 90");
  {
    const d = diag(10, "schema");
    vaut("10. barre salaire", lu(d, "hausse du salaire"), 1890 - 1800);
    vaut("10. barre courses", lu(d, "hausse des courses"), 4 * (153 - 150));
  }
  {
    const d = diag(11, "figure");
    const p = fois(lu(d, "2020"), Q(1000));
    vaut("11. lu en 2020", p, 40000);
    evol(11, 40000, 5, 42000);
    evol(11, 40000, -5, 38000);
    eg(11, "40\\,000 \\times 1{,}05 = 42\\,000", "40\\,000 \\times 0{,}95 = 38\\,000");
    const s = diag(11, "schema");
    vaut("11. schéma +5 %", fois(lu(d, "2020"), coefEtiquette("2030 × 1,05")), lu(s, "2030 × 1,05"));
    vaut("11. schéma −5 %", fois(lu(d, "2020"), coefEtiquette("2030 × 0,95")), lu(s, "2030 × 0,95"));
  }
  evol(12, "1,8", 10, "1,98");
  eg(12, "\\dfrac{1{,}98}{1{,}1} = \\dfrac{19{,}8}{11} = 1{,}8", "1{,}8 \\times 1{,}1 = 1{,}8 + 0{,}18 = 1{,}98");
  vaut("12. le piège : 1,98 × 0,9", fois(D("1,98"), coef(-10)), "1,782");
  dit(12, "$1{,}782$ €");
  {
    const { ligne } = tableauDe(12);
    vaut("12. tableau", fois(D(ligne[0]), coefEtiquette(ligne[1])), D(ligne[2]));
  }
  {
    const [ca] = courbes(13, "figure");
    vaut("13. lu en 2020", ca(Q(0)), 4);
    vaut("13. lu en 2024", ca(Q(4)), 8);
    vaut("13. il a doublé", fois(ca(Q(0)), Q(2)), ca(Q(4)));
    evol(13, 8, 25, 10);
    eg(13, "8 \\times 1{,}25 = 10", "2 = 1 + 1");
    const [, prevision] = courbes(13, "schema");
    vaut("13. le point de 2025 dessiné", prevision(Q(5)), 10);
  }
  evol(14, 15000, -20, 12000);
  eg(14, "\\dfrac{12\\,000}{0{,}8} = \\dfrac{120\\,000}{8} = 15\\,000", "15\\,000 \\times 0{,}8 = 12\\,000", "12\\,000 \\times 1{,}2 = 14\\,400");
  {
    const d = diag(14, "schema");
    vaut("14. diagramme", fois(lu(d, "avant (milliers)"), coefEtiquette("après × 0,8")), lu(d, "après × 0,8"));
  }
  evol(15, 5, -40, 3);
  eg(15, "\\dfrac{3}{0{,}6} = \\dfrac{30}{6} = 5", "5 \\times 0{,}6 = 3", "3 \\times 1{,}4 = 4{,}2");
  evol(16, 50, 20, 60);
  evol(16, 450, 20, 540);
  eg(16, "50 \\times 1{,}2 = 60", "\\dfrac{540}{1{,}2} = \\dfrac{5\\,400}{12} = 450", "540 - 450 = 90", "540 \\times 0{,}8 = 432");
  vaut("16. 20 % de 450", fois(Q(450), Q(1, 5)), 90);
  {
    const d = diag(16, "schema");
    vaut("16. HT + TVA = TTC", plus(lu(d, "prix HT 450 €"), lu(d, "TVA 90 €")), 540);
  }

  /* ── ★★★ ── */
  {
    const [m2] = courbes(17, "figure");
    vaut("17. lu en 2015", m2(Q(0)), 3);
    vaut("17. lu en 2025", m2(Q(10)), 6);
    vaut("17. il a doublé", fois(m2(Q(0)), Q(2)), m2(Q(10)));
    eg(17, "50 \\times 6\\,000 = 300\\,000", "6\\,000 \\times 0{,}95 = 5\\,700", "\\dfrac{240\\,000}{0{,}8} = 300\\,000");
    evol(17, 6000, -5, 5700);
    evol(17, 300000, -20, 240000);
    vaut("17. le piège : 240 000 × 1,2", fois(Q(240000), coef(20)), 288000);
    dit(17, "$288\\,000$ €", "$60\\,000$ €");
    const d = diag(17, "schema");
    vaut("17. diagramme", fois(lu(d, "2025"), coefEtiquette("2026 × 0,95")), lu(d, "2026 × 0,95"));
  }
  evol(18, 2500, -22, 1950);
  evol(18, 2000, -22, 1560);
  eg(18, "0{,}78 = 1 - 0{,}22", "2\\,500 \\times 0{,}78 = 1\\,950", "10\\,000 \\times 0{,}78 = 7\\,800", "\\dfrac{1\\,560}{0{,}78} = \\dfrac{156\\,000}{78} = 2\\,000", "78 \\times 2 = 156", "1\\,560 \\times 1{,}22 = 1\\,903{,}2");
  vaut("18. le quart de 7 800", div(Q(7800), Q(4)), 1950);
  {
    const d = diag(18, "schema");
    vaut("18. camembert", plus(lu(d, "net 78 %"), lu(d, "cotisations 22 %")), 100);
  }
  {
    const d = diag(19, "figure");
    const [p50, p87, p22] = ["1950", "1987", "2022"].map((a) => lu(d, a));
    vaut("19. 1950 → 1987 : doublé", fois(p50, Q(2)), p87);
    vaut("19. 1987 → 2022 : × 1,6", fois(p87, D("1,6")), p22);
    vaut("19. 1,6 ↔ +60 %", coef(60), "1,6");
    eg(19, "2{,}5 \\times 2 = 5", "1{,}6 = 1 + 0{,}6", "5 \\times 1{,}6 = 8", "\\dfrac{8}{1{,}6} = \\dfrac{80}{16} = 5", "8 \\times 1{,}25 = 10");
    evol(19, p22, 25, 10);
    const s = diag(19, "schema");
    vaut("19. schéma", fois(lu(s, "2022"), coefEtiquette("fin du siècle × 1,25")), lu(s, "fin du siècle × 1,25"));
  }
  evol(20, 80000, -75, 20000);
  evol(20, 20000, 100, 40000);
  evol(20, 80000, 25, 100000);
  evol(20, 20000, 75, 35000);
  evol(20, 20000, 300, 80000);
  eg(20, "80\\,000 \\times 0{,}25 = 20\\,000", "20\\,000 \\times 2 = 40\\,000", "\\dfrac{100\\,000}{1{,}25} = 80\\,000", "20\\,000 \\times 1{,}75 = 35\\,000");
  {
    const d = diag(20, "schema");
    [["2019", 80], ["2020", 20], ["2021", 40], ["2022", 80], ["2023", 100]].forEach(([a, x]) => vaut(`20. barre ${a} (milliers)`, lu(d, a), x));
  }
  controlerTout();
} catch (e) {
  v.ok("le recalcul s'exécute", false, String(e?.message ?? e));
}

controlesCommuns(v, source, { notionId: NOTION, classe: "premiere" });
const nbCorrections = (source.match(/correction:/g) ?? []).length;
v.ok("exactement 20 `correction:`", nbCorrections === 20, `${nbCorrections}`);

console.log(`Coefficient multiplicateur (1re) — ${justes} vérifications justes, ${fausses.length} fausses`);
fausses.forEach((x) => console.log("  ✗", x));
process.exit(fausses.length ? 1 : 0);
