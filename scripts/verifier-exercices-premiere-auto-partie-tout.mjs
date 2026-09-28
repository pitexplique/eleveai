// Recalcul indépendant de la feuille « La partie et le tout » (1re sans spé,
// automatismes, 28/09/2026) : lib/fiches-exercices/maths-premiere-auto-partie-tout.tsx.
// Chaque résultat annoncé est refait ici, sans lire le source ; puis les figures
// sont RELUES dans le source : tableaux de valeurs, diagrammes, droites
// graduées, arbres et repères comparés aux valeurs recalculées ici.
// Plus : dollars appariés, micros connues du coach de première et toutes
// couvertes, exactement 20 corrections.
// Usage : node scripts/verifier-exercices-premiere-auto-partie-tout.mjs

import fs from "node:fs";

const FICHIER = "lib/fiches-exercices/maths-premiere-auto-partie-tout.tsx";
const NOTION = "auto_partie_tout";

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
const partie = (tout, t) => (tout * t) / 100;
const toutDe = (p, t) => (p * 100) / t;
// ★
{
  verif("E1", partie(800, 35), 280);
  verif("E1 240 + 40", 240 + 40, 280);
  verif("E2", toutDe(80, 20), 400);
  verif("E2 800/2", 800 / 2, 400);
  verif("E2 piège", 80 * 0.2, 16);
  attendus.barre.push([80, 80, 80, 80, 80]);
  verif("E3", 0.4 * 0.25, 0.1);
  attendus.arbre.push([0.4 * 0.25, 0.4 * 0.75, 0.6]);
  verif("E4", (45 / 5) * 3, 27);
  verif("E5", toutDe(12, 30), 40);
  attendus.tableau.push([toutDe(12, 30) / 10, 12, toutDe(12, 30)]);
  verif("E6", 0.5 * 0.6, 0.3);
  verif("E7", (18 / 3) * 4, 24);
  verif("E7 vérif", (24 * 3) / 4, 18);
  attendus.barre.push([6, 6, 6, 6]);
  verif("E8", partie(240, 15), 36);
}
// ★★
{
  const salaire = toutDe(750, 30);
  verif("E9", salaire, 2500);
  verif("E9 piège", partie(750, 30), 225);
  attendus.barre.push([750, salaire - 750]);
  verif("E10", toutDe(900, 45), 2000);
  verif("E10 90000/45", 90000 / 45, 2000);
  verif("E11", 0.6 * 0.25, 0.15);
  attendus.arbre.push([0.6 * 0.25, 0.6 * 0.75, 0.4]);
  const ht = 120 / 1.2;
  verif("E12 HT", ht, 100);
  verif("E12 TVA", 120 - ht, 20);
  verif("E12 piège", 120 - partie(120, 20), 96);
  attendus.barre.push([ht, 120 - ht]);
  const budget = toutDe(1.2e6, 40);
  verif("E13 budget", budget, 3e6);
  verif("E13 10 %", 1.2e6 / 4, 3e5);
  verif("E13 culture", partie(budget, 15), 450000);
  verif("E13 camembert", 40 + 25 + 20 + 15, 100);
  attendus.diagramme.push([40, 25, 20, 15]);
  attendus.diagramme.push([40, 25, 20, 15].map((t) => partie(budget, t) / 1000));
  verif("E14 a", 0.35 * 0.2, 0.07);
  verif("E14 b", partie(6000, 7), 420);
  verif("E14 autre chemin", partie(partie(6000, 35), 20), 420);
  attendus.arbre.push([0.35 * 0.2, 0.35 * 0.8, 0.65]);
  const actifs = toutDe(3.6, 12);
  verif("E15", actifs, 30);
  verif("E15 1 %", 3.6 / 12, 0.3);
  attendus.tableau.push([actifs / 100, partie(actifs, 12), actifs]);
  verif("E16 a", 0.7 * 0.4, 0.28);
  verif("E16 b", partie(1000, 28), 280);
  verif("E16 autre chemin", partie(partie(1000, 70), 40), 280);
}
// ★★★
{
  const votants = partie(40000, 75);
  const expr = partie(votants, 90);
  const a = partie(expr, 40);
  verif("E17 votants", votants, 30000);
  verif("E17 exprimés", expr, 27000);
  verif("E17 A", a, 10800);
  verif("E17 part des inscrits", a / 40000, 0.27);
  verif("E17 chaîne", 0.75 * 0.9 * 0.4, 0.27);
  verif("E17 0,675", 0.75 * 0.9, 0.675);
  attendus.diagramme.push([40000, votants, expr, a]);
  const budget = toutDe(180000, 12);
  verif("E18 budget", budget, 1.5e6);
  verif("E18 1 %", 180000 / 12, 15000);
  const ecoles = partie(budget, 30);
  verif("E18 écoles", ecoles, 450000);
  verif("E18 c", 180000 / ecoles, 0.4);
  verif("E18 d", 0.4 * 0.3, 0.12);
  attendus.diagramme.push([budget / 1000, ecoles / 1000, 180]);
  const avant = partie(60, 16);
  const apres = partie(64, 25);
  verif("E19 avant", avant, 9.6);
  verif("E19 après", apres, 16);
  verif("E19 b %", 0.4 * 0.25, 0.1);
  verif("E19 b", partie(64, 10), 6.4);
  verif("E19 autre chemin", partie(apres, 40), 6.4);
  attendus.diagramme.push([avant, apres]);
  const depart = toutDe(90, 75);
  verif("E20 départ", depart, 120);
  const ht = 90 / 1.2;
  verif("E20 HT", ht, 75);
  verif("E20 TVA", 90 - ht, 15);
  verif("E20 piège", 90 + partie(90, 25), 112.5);
  attendus.tableau.push([90, ht, 90 - ht]);
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
