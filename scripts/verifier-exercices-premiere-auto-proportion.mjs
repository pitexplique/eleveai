// Recalcul indépendant de la feuille « Proportions et pourcentages » (1re sans spé,
// automatismes, 28/09/2026) : lib/fiches-exercices/maths-premiere-auto-proportion.tsx.
// Chaque résultat annoncé est refait ici, sans lire le source ; puis les figures
// sont RELUES dans le source : tableaux de valeurs, diagrammes, droites
// graduées, arbres et repères comparés aux valeurs recalculées ici.
// Plus : dollars appariés, micros connues du coach de première et toutes
// couvertes, exactement 20 corrections.
// Usage : node scripts/verifier-exercices-premiere-auto-proportion.mjs

import fs from "node:fs";

const FICHIER = "lib/fiches-exercices/maths-premiere-auto-proportion.tsx";
const NOTION = "auto_proportion";

let ok = 0;
const ko = [];
const proche = (a, b, eps = 1e-9) => Math.abs(a - b) < eps * Math.max(1, Math.abs(b));
const verif = (nom, a, b, eps) => (proche(a, b, eps) ? ok++ : ko.push(`${nom} : ${a} ≠ ${b}`));
const vrai = (nom, cond) => (cond ? ok++ : ko.push(`${nom} : faux`));
const memes = (nom, f, g, de = -6, a = 6) => {
  for (let k = 0; k <= 40; k++) {
    const x = de + ((a - de) * k) / 40;
    if (!proche(f(x), g(x))) return ko.push(`${nom} : diffère en x = ${x}`);
  }
  ok++;
};
const racine = (nom, f, x) => verif(`${nom} f(${x}) = 0`, f(x), 0);

/* ═══════════════ recalculs ═══════════════ */
const attendus = { tableau: [], diagramme: [], droiteGraduee: [], arbre: [], barre: [] };
const pct = (t, q) => (t * q) / 100;
// ★
{
  verif("E1", 10 / 25, 0.4);
  verif("E1 2/5", 2 / 5, 0.4);
  attendus.barre.push([10, 25 - 10]);
  verif("E2 a", 3 / 4, 0.75);
  verif("E2 b", 5 / 100, 1 / 20);
  verif("E2 c", 12 / 100, 3 / 25);
  attendus.tableau.push([(3 / 4) * 100, (1 / 20) * 100, (3 / 25) * 100]);
  vrai("E3 égales", 3 / 5 === 6 / 10 && proche(60 / 100, 3 / 5) && proche(0.6, 3 / 5));
  vrai("E3 intruse", 60 !== 3 / 5);
  verif("E3 100 fois", 60 / 0.6, 100);
  verif("E4", pct(30, 150), 45);
  verif("E4 10 %", 150 / 10, 15);
  verif("E5", pct(25, 250), 62.5);
  verif("E5 un quart", 250 / 4, 62.5);
  attendus.barre.push([62.5, 62.5, 62.5, 62.5]);
  verif("E6", 18 / 60, 0.3);
  verif("E7 a", pct(5, 80), 4);
  verif("E7 b", pct(1, 350), 3.5);
  verif("E7 c", pct(150, 40), 60);
  const rang = [1 / 5, 1 / 4, 0.28, 0.3];
  vrai("E8 ordre", rang.every((v, k) => k === 0 || v > rang[k - 1]));
  attendus.droiteGraduee.push(rang);
}
// ★★
{
  verif("E9 participation", 900 / 1200, 0.75);
  verif("E9 abstention", (1200 - 900) / 1200, 0.25);
  attendus.diagramme.push([75, 25]);
  const d = [pct(30, 2000), pct(15, 2000), pct(12, 2000)];
  verif("E10 logement", d[0], 600);
  verif("E10 alimentation", d[1], 300);
  verif("E10 transports", d[2], 240);
  verif("E10 reste", 2000 - d[0] - d[1] - d[2], 860);
  verif("E10 reste %", pct(100 - 30 - 15 - 12, 2000), 860);
  attendus.diagramme.push([...d, 2000 - d[0] - d[1] - d[2]]);
  verif("E11", pct(35, 6000), 2100);
  attendus.barre.push([pct(35, 6000), 6000 - pct(35, 6000)]);
  const t = [18, 6, 10, 6];
  verif("E12 total", t.reduce((a, b) => a + b), 40);
  verif("E12 a", 18 / 40, 0.45);
  verif("E12 9/20", 9 / 20, 0.45);
  verif("E12 b", 12 / 40, 0.3);
  attendus.diagramme.push(t);
  attendus.diagramme.push(t.map((v) => (100 * v) / 40));
  verif("E13 remise", pct(30, 80), 24);
  verif("E13 payé", 80 - 24, 56);
  verif("E13 70 %", 80 * 0.7, 56);
  attendus.barre.push([80 - pct(30, 80), pct(30, 80)]);
  verif("E14 entreprise", 100 / 250, 0.4);
  verif("E14 cadres", 6 / 20, 0.3);
  attendus.diagramme.push([40, 30]);
  verif("E15 somme", 45 + 40 + 15, 100);
  verif("E15 2/5", 2 / 5, 0.4);
  verif("E15 pour", pct(45, 1200), 540);
  verif("E15 contre", pct(40, 1200), 480);
  verif("E15 sans avis", pct(15, 1200), 180);
  attendus.diagramme.push([0.45 * 100, (2 / 5) * 100, 15]);
  verif("E16 TVA", pct(20, 45), 9);
  verif("E16 TTC", 45 * 1.2, 54);
  attendus.barre.push([45, pct(20, 45)]);
}
// ★★★
{
  const votants = pct(60, 2000);
  const bn = pct(5, votants);
  const expr = votants - bn;
  verif("E17 votants", votants, 1200);
  verif("E17 blancs", bn, 60);
  verif("E17 exprimés", expr, 1140);
  const [A, B, C] = [pct(55, expr), pct(30, expr), pct(15, expr)];
  verif("E17 A", A, 627);
  verif("E17 A = 570 + 57", 570 + 57, 627);
  verif("E17 B", B, 342);
  verif("E17 C", C, 171);
  verif("E17 total", A + B + C, 1140);
  verif("E17 d", A / 2000, 0.3135);
  vrai("E17 moins d'un sur trois", A / 2000 < 1 / 3);
  attendus.diagramme.push([2000, votants, expr, A]);
  const parts = [30, 25, 20, 25].map((p) => pct(p, 10));
  verif("E18 total", parts.reduce((a, b) => a + b), 10);
  verif("E18 objectif", 2 / 10, 0.2);
  verif("E18 sans transports", 10 - parts[0], 7);
  attendus.diagramme.push(parts);
  verif("E19 départ", 12 / 40, 0.3);
  verif("E19 après", 15 / 60, 0.25);
  verif("E19 c", pct(30, 60), 18);
  attendus.barre.push([12, 28], [15, 45]);
  const litre = [pct(50, 1.8), pct(30, 1.8), pct(20, 1.8)];
  verif("E20 taxes", litre[0], 0.9);
  verif("E20 production", litre[1], 0.54);
  verif("E20 distribution", litre[2], 0.36);
  verif("E20 3/10", 3 / 10, 0.3);
  verif("E20 1/5", 1 / 5, 0.2);
  verif("E20 plein", 40 * 1.8, 72);
  verif("E20 taxes du plein", 40 * litre[0], 36);
  verif("E20 c", 0.9 / 2, 0.45);
  attendus.barre.push(litre);
}


/* ═══════════════ les figures, relues dans le source ═══════════════ */
const src = fs.readFileSync(FICHIER, "utf8");

/** Les arguments de chaque appel `nom(…)` du source, évalués (littéraux seulement). */
function appels(nom) {
  const out = [];
  const re = new RegExp(`\\b${nom}\\(`, "g");
  let m;
  while ((m = re.exec(src))) {
    let i = m.index + m[0].length;
    const debut = i;
    let prof = 1;
    let chaine = null;
    for (; i < src.length && prof > 0; i++) {
      const c = src[i];
      if (chaine) {
        if (c === "\\") i++;
        else if (c === chaine) chaine = null;
        continue;
      }
      if (c === '"' || c === "`") chaine = c;
      else if (c === "(") prof++;
      else if (c === ")") prof--;
    }
    out.push(new Function(`return [${src.slice(debut, i - 1)}];`)());
  }
  return out;
}
const nombre = (s) => {
  if (typeof s === "number") return s;
  const t = s.replace(/\$/g, "").replace(/−/g, "-").replace(/\{,\}/g, ".").replace(/,/g, ".").replace(/\s/g, "");
  if (t === "-∞") return -Infinity;
  if (t === "+∞") return Infinity;
  const f = t.match(/^(-?)\\dfrac\{(\d+)\}\{(\d+)\}$/);
  if (f) return (f[1] ? -1 : 1) * (+f[2] / +f[3]);
  return +t;
};
/** Un libellé `$…$` d'un facteur en fonction JS, ou null (« $f(x)$ » : la ligne du produit). */
const expression = (label, variable) => {
  const t = label
    .replace(/\$/g, "")
    .replace(/−/g, "-")
    .replace(/\{,\}/g, ".")
    .replace(/\\dfrac\{([^}]*)\}\{([^}]*)\}/g, "(($1)/($2))")
    .replace(new RegExp(variable, "g"), "V")
    .replace(/(\d|\))\s*(?=[V(])/g, "$1*")
    .replace(/V\s*(?=\()/g, "V*")
    .replace(/V\^(\d)/g, "(V**$1)");
  try {
    const f = new Function("V", `return ${t};`);
    return Number.isFinite(f(1.2345)) ? f : null;
  } catch {
    return null;
  }
};
const S = (v) => (v > 0 ? "+" : "-");

let nbSignes = 0;
for (const [bornes, lignes, variable = "x"] of appels("tableauSignes")) {
  nbSignes++;
  const b = bornes.map(nombre);
  vrai(`tableau de signes ${nbSignes} : bornes croissantes`, b.every((x, k) => k === 0 || x > b[k - 1]));
  const tests = b.slice(0, -1).map((g, k) => (g === -Infinity ? b[k + 1] - 1 : b[k + 1] === Infinity ? g + 1 : (g + b[k + 1]) / 2));
  const interieures = b.slice(1, -1);
  const facteurs = [];
  for (const [label, signes, marques = interieures.map(() => "")] of lignes) {
    const f = expression(label, variable);
    let s, z;
    if (f) {
      s = tests.map((t) => S(f(t)));
      z = interieures.map((x) => (Math.abs(f(x)) < 1e-9 ? "0" : ""));
      facteurs.push({ s, z });
    } else {
      // La ligne du produit : produit de TOUS les facteurs au-dessus.
      s = tests.map((_, k) => S(facteurs.reduce((p, l) => p * (l.s[k] === "+" ? 1 : -1), 1)));
      z = interieures.map((_, k) => (facteurs.some((l) => l.z[k] === "0") ? "0" : ""));
    }
    vrai(`tableau ${nbSignes}, ${label} : signes ${signes.join("")} (calcul ${s.join("")})`, s.join() === signes.join());
    vrai(`tableau ${nbSignes}, ${label} : zéros`, z.join() === marques.join());
    vrai(`tableau ${nbSignes}, ${label} : ${signes.length} signes pour ${tests.length} intervalles`, signes.length === tests.length && marques.length === interieures.length);
  }
}

for (const [cadre, courbes, marques = [], horizontale] of appels("repere")) {
  const [xmin, xmax, ymin, ymax] = cadre;
  vrai(`repère ${cadre} : ymin < 0`, ymin < 0);
  vrai(`repère ${cadre} : au plus 15 unités par axe`, xmax - xmin <= 15 && ymax - ymin <= 15);
  const hs = horizontale === undefined ? [] : [].concat(horizontale);
  for (const p of marques) {
    const surCourbe = courbes.some((c) => c.q && proche(c.q[0] * p.x * p.x + c.q[1] * p.x + c.q[2], p.y)) || hs.includes(p.y);
    vrai(`repère ${cadre} : le point ${p.label} (${p.x} ; ${p.y}) est sur la courbe`, surCourbe);
    vrai(`repère ${cadre} : point dans le cadre`, p.x >= xmin && p.x <= xmax && p.y >= ymin && p.y <= ymax);
    vrai(`repère : étiquette nue ${p.label}`, !String(p.label ?? "").includes("$"));
  }
}

const norme = (v) => String(v).replace(/−/g, "-").replace(/,/g, ".").replace(/[\s%€]/g, "");
const comparer = (quoi, lus, voulus) => {
  vrai(`${quoi} : ${lus.length} lus, ${voulus.length} attendus`, lus.length === voulus.length);
  lus.forEach((l, i) => {
    const v = voulus[i] ?? [];
    vrai(`${quoi} n° ${i + 1} : ${l.join(" ; ")} (attendu ${v.join(" ; ")})`, l.length === v.length && l.every((x, k) => proche(+norme(x), +norme(v[k]))));
  });
};
const tableaux = appels("tableau");
tableaux.forEach(([entete, ligne]) => {
  vrai(`tableau ${entete[0]} : entete.length === ligne.length`, entete.length === ligne.length);
  vrai(`tableau ${entete[0]} : texte nu`, ![...entete, ...ligne].some((c) => String(c).includes("$")));
});
comparer("tableau", tableaux.map(([, ligne]) => ligne.slice(1)), attendus.tableau);
const diagrammes = appels("diagramme");
diagrammes.forEach(([, data]) => vrai("diagramme : étiquettes nues", !data.some((d) => d.label.includes("$"))));
comparer("diagramme", diagrammes.map(([, data]) => data.map((d) => d.value)), attendus.diagramme);
diagrammes.forEach(([type, data]) => {
  if (type === "camembert") verif("camembert : les parts font 100", data.reduce((t, d) => t + d.value, 0), 100);
});
const droitesGraduees = appels("droiteGraduee");
droitesGraduees.forEach(([min, max, , points]) =>
  points.forEach((p) => {
    vrai(`droite graduée : ${p.label} dans [${min} ; ${max}]`, p.value >= min && p.value <= max);
    vrai(`droite graduée : étiquette nue ${p.label}`, !p.label.includes("$"));
  }),
);
comparer("droite graduée", droitesGraduees.map(([, , , points]) => points.map((p) => p.value)), attendus.droiteGraduee ?? []);
/** Les poids des feuilles d'un arbre (produit des branches), et chaque nœud qui fait 1. */
const parcourir = (noeuds, poids, sortie) => {
  verif(`arbre : les branches ${noeuds.map((n) => n.label).join(" / ")} font 1`, noeuds.reduce((t, n) => t + nombre(n.proba), 0), 1);
  for (const n of noeuds) {
    vrai(`arbre : texte nu ${n.label}`, !`${n.label}${n.proba}`.includes("$"));
    const p = poids * nombre(n.proba);
    if (n.enfants) parcourir(n.enfants, p, sortie);
    else sortie.push(p);
  }
};
comparer("arbre (feuilles)", appels("arbre").map(([racine]) => {
  const s = [];
  parcourir(racine, 1, s);
  return s;
}), attendus.arbre ?? []);
// La barre de partage d'une feuille : chaque part étiquetée « 40 % » doit
// valoir 40 % de la barre entière.
const barres = appels("barre");
barres.forEach(([parts]) => {
  const tout = parts.reduce((t, p) => t + p.value, 0);
  parts.forEach((p) => {
    vrai(`barre : texte nu ${p.label}`, !p.label.includes("$"));
    const pct = p.label.match(/(\d+(?:,\d+)?) %/);
    if (pct) verif(`barre : la part « ${p.label} »`, (100 * p.value) / tout, +pct[1].replace(",", "."));
  });
});
comparer("barre", barres.map(([parts]) => parts.map((p) => p.value)), attendus.barre ?? []);

/* ═══════════════ contrôles de texte ═══════════════ */
const skills = fs.readFileSync("lib/tutor-v4/knowledge/maths/premiere/microSkills.ts", "utf8");
const connues = new Set([...skills.matchAll(/id: "(\w+)"/g)].map((m) => m[1]));
const deLaNotion = [...skills.matchAll(new RegExp(`id: "(\\w+)"[^\\n]*notionId: "${NOTION}"`, "g"))].map((m) => m[1]);
const citees = new Set();
for (const m of src.matchAll(/micros: \[([^\]]*)\]/g)) for (const id of m[1].matchAll(/"(\w+)"/g)) citees.add(id[1]);
for (const id of citees) (connues.has(id) ? ok++ : ko.push(`micro inconnue ${id}`));
for (const id of deLaNotion) (citees.has(id) ? ok++ : ko.push(`micro de la notion jamais travaillée : ${id}`));
vrai("la notion a des micros", deLaNotion.length > 0);
for (const m of src.matchAll(/"((?:[^"\\]|\\.)*)"/g)) {
  const n = (m[1].replace(/\\\$/g, "").match(/\$/g) || []).length;
  if (n % 2) ko.push(`dollars impairs dans « ${m[1].slice(0, 60)}… »`);
  else ok++;
}
const nbEx = (src.match(/correction:/g) || []).length;
nbEx === 20 ? ok++ : ko.push(`${nbEx} exercices au lieu de 20`);
const parNiveau = [...src.matchAll(/niveau: (\d)/g)].map((m) => m[1]).join("");
vrai(`trois niveaux dans l'ordre (${parNiveau})`, parNiveau === "123");

console.log(`${ok} vérifications justes, ${ko.length} fausses`);
ko.forEach((k) => console.log("  ✗", k));
process.exit(ko.length ? 1 : 0);
