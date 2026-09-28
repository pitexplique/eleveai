// Recalcul indépendant de la feuille « Probabilités : les bases »
// (1re, automatismes, 28/09/2026) : lib/fiches-exercices/maths-premiere-auto-proba-base.tsx.
// Les dessins sont RELUS dans le source (`tableau`, `diagramme`, `roue`,
// `billes`, `de`, `arbre`, `tableauProba`) : les issues comptées sur eux,
// chaque probabilité annoncée recalculée, chaque loi vérifiée (somme 1, entre
// 0 et 1), les branches de chaque nœud d'arbre de somme 1, le tableau des deux
// dés recalculé case par case. Plus : dollars appariés, micros connues du coach
// de première, exactement 20 corrections.
// Usage : node scripts/verifier-exercices-premiere-auto-proba-base.mjs

import fs from "node:fs";

const FICHE = "lib/fiches-exercices/maths-premiere-auto-proba-base.tsx";
const src = fs.readFileSync(FICHE, "utf8");

let ok = 0;
const ko = [];
const proche = (a, b, eps = 1e-9) => Math.abs(a - b) < eps * Math.max(1, Math.abs(b));
const verif = (nom, a, b, eps) => (proche(a, b, eps) ? ok++ : ko.push(`${nom} : ${a} ≠ ${b}`));
const vrai = (nom, c) => (c ? ok++ : ko.push(`${nom} : faux`));
const somme = (t) => t.reduce((s, x) => s + x, 0);
/** « 0,3 », « 3/8 », « 1 » → nombre. */
const nombre = (s) => {
  const t = String(s).replace(/\s/g, "").replace(",", ".");
  if (t.includes("/")) {
    const [a, b] = t.split("/").map(Number);
    return a / b;
  }
  return Number(t);
};

function appels(nom) {
  const res = [];
  const re = new RegExp(`(?<![\\w.])${nom}\\(`, "g");
  let m;
  while ((m = re.exec(src))) {
    const debut = m.index + m[0].length;
    let prof = 1, j = debut, chaine = null;
    for (; j < src.length && prof > 0; j++) {
      const c = src[j];
      if (chaine) {
        if (c === "\\") j++;
        else if (c === chaine) chaine = null;
        continue;
      }
      if (c === '"' || c === "'" || c === "`") chaine = c;
      else if (c === "(") prof++;
      else if (c === ")") prof--;
    }
    res.push(Function(`const ROUGE = "r", BLEU = "b", VERT = "v"; return [${src.slice(debut, j - 1)}]`)());
  }
  return res;
}
const diag = (label) => {
  const d = appels("diagramme").find(([, data]) => data.some((x) => x.label === label));
  if (!d) {
    ko.push(`diagramme « ${label} » introuvable`);
    return { v: () => NaN, valeurs: [] };
  }
  return { v: (l) => d[1].find((x) => x.label === l)?.value, valeurs: d[1].map((x) => x.value) };
};
const loi = (nom, probas) => {
  vrai(`${nom} : chaque probabilité entre 0 et 1`, probas.every((p) => p >= 0 && p <= 1));
  verif(`${nom} : somme`, somme(probas), 1);
};

/* ═══════════════ contrôles génériques des dessins ═══════════════ */
for (const [entete, ligne] of appels("tableau")) vrai(`tableau ${entete[0]} : longueurs`, entete.length === ligne.length);
const noeuds = (enfants, chemin) => {
  loi(`arbre ${chemin}`, enfants.map((n) => nombre(n.proba)));
  for (const n of enfants) if (n.enfants) noeuds(n.enfants, `${chemin}/${n.label}`);
};
for (const [racine] of appels("arbre")) noeuds(racine, "racine");

/* ═══════════════ ★ ═══════════════ */
{
  const candidats = { "0,7": 0.7, "1,2": 1.2, "-0,1": -0.1, "3/4": 0.75, "5/4": 1.25, "0": 0, "1": 1, "120 %": 1.2 };
  const oui = Object.keys(candidats).filter((k) => candidats[k] >= 0 && candidats[k] <= 1);
  vrai("E1", JSON.stringify(oui.sort()) === JSON.stringify(["0", "0,7", "1", "3/4"]));
}
verif("E2", 1 - 0.15, 0.85);
{
  const [, ligne] = appels("tableau").find(([e]) => e[0] === "Face" && e.length === 5);
  const connues = ligne.slice(1, 4).map(nombre);
  verif("E3", 1 - somme(connues), 0.4);
  loi("E3 loi complète", [...connues, 0.4]);
}
{
  const [[faces]] = appels("de");
  const multiples = [1, 2, 3, 4, 5, 6].filter((f) => f % 3 === 0);
  vrai("E4 faces surlignées", JSON.stringify(faces) === JSON.stringify(multiples));
  verif("E4", multiples.length / 6, 1 / 3);
}
{
  const [[els]] = appels("billes");
  const n = (c) => els.filter((e) => e.couleur === c).length;
  verif("E5 total", els.length, 10);
  verif("E5 a", n("b") / els.length, 0.5);
  verif("E5 b", 1 - n("v") / els.length, 0.8);
  verif("E5 b autre chemin", (n("r") + n("b")) / els.length, 0.8);
}
{
  const [[segs]] = appels("roue");
  const tot = somme(segs.map((s) => s.poids));
  verif("E6 secteurs", tot, 8);
  const p = (l) => segs.find((s) => s.label === l).poids / tot;
  verif("E6 10 €", p("10 €"), 1 / 8);
  verif("E6 2 €", p("2 €"), 3 / 8);
  verif("E6 perdu", p("Perdu"), 1 / 2);
  verif("E6 b", p("10 €") + p("2 €"), 1 / 2);
}
vrai("E7 impossible", !proche(0.4 + 0.5, 1));
verif("E7 correction", 1 - 0.4, 0.6);
verif("E8 roi", 4 / 32, 1 / 8);
verif("E8 cœur", 8 / 32, 1 / 4);
verif("E8 roi de cœur", 1 / 32, 0.03125);

/* ═══════════════ ★★ ═══════════════ */
{
  verif("E9 a", 1 - 0.23 - 0.55, 0.22);
  verif("E9 b", 1 - 0.22, 0.78);
  verif("E9 c", 1 - 0.23, 0.77);
  const d = diag("65 ans et +");
  verif("E9 schéma", d.v("65 ans et +"), 22);
  verif("E9 schéma total", somme(d.valeurs), 100);
}
{
  const [[ent, lignes, surl]] = appels("tableauProba");
  let justes = 0;
  lignes.forEach((l, i) => l.slice(1).forEach((c, j) => (Number(c) === Number(l[0]) + Number(ent[j + 1]) ? justes++ : ko.push(`E10 case ${i},${j}`))));
  verif("E10 cases justes", justes, 36);
  const sept = [];
  lignes.forEach((l, i) => l.forEach((c, j) => j > 0 && c === "7" && sept.push([i, j])));
  vrai("E10 cases surlignées = les 7", JSON.stringify(sept) === JSON.stringify([...surl].sort((a, b) => a[0] - b[0])));
  verif("E10 P(7)", sept.length / 36, 1 / 6);
  const douze = lignes.flat().filter((c, k) => k % 7 !== 0 && c === "12").length;
  verif("E10 P(12)", douze / 36, 1 / 36);
  const compte = {};
  for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) compte[a + b] = (compte[a + b] || 0) + 1;
  vrai("E10 c le 7 le plus probable", Object.entries(compte).every(([s, n]) => s === "7" || n < compte[7]));
}
verif("E11 a", 40 / 250, 0.16);
verif("E11 b", 1 - 40 / 250, 0.84);
verif("E11 b autre chemin", 210 / 250, 0.84);
verif("E12 a somme", 0.5 + 0.4 + 0.2, 1.1);
vrai("E12 a impossible", 0.5 + 0.4 + 0.2 > 1);
verif("E12 b", 1 - 0.5 - 0.4, 0.1);
{
  const issues = ["PP", "PF", "FP", "FF"];
  const auMoinsUnPile = issues.filter((s) => s.includes("P")).length / issues.length;
  verif("E13", auMoinsUnPile, 3 / 4);
  verif("E13 contraire", 1 - 1 / 4, auMoinsUnPile);
  const [racine] = appels("arbre")[0];
  const feuilles = racine.flatMap((n) => n.enfants.map((f) => f.label.split("→ ")[1]));
  vrai("E13 arbre : les quatre issues", JSON.stringify(feuilles) === JSON.stringify(issues));
}
verif("E14 a", 18 / 37, 18 / 37);
verif("E14 b", 1 - 18 / 37, 19 / 37);
vrai("E14 c moins d'une chance sur deux", 18 / 37 < 0.5);
verif("E14 cases", 18 + 18 + 1, 37);
{
  const p = 1 / (5 + 3);
  verif("E15 a", p, 1 / 8);
  verif("E15 P(6)", 3 * p, 3 / 8);
  verif("E15 pair", 2 * p + 3 * p, 5 / 8);
  const [, ligne] = appels("tableau").find(([e]) => e[0] === "Face" && e.length === 7);
  loi("E15 loi dessinée", ligne.slice(1).map(nombre));
}
verif("E16 a", 12 / 96, 1 / 8);
verif("E16 b", 1 - 12 / 96, 7 / 8);
verif("E16 c", 4 / 96, 1 / 24);

/* ═══════════════ ★★★ ═══════════════ */
{
  const d = diag("Retraités");
  const p = (l) => d.v(l) / 100;
  loi("E17 loi", d.valeurs.map((v) => v / 100));
  verif("E17 a", p("Retraités"), 0.3);
  verif("E17 b", p("En emploi") + p("Au chômage"), 0.5);
  verif("E17 c", 1 - p("Retraités"), 0.7);
  verif("E17 c autre chemin", p("En emploi") + p("Au chômage") + p("Autres inactifs"), 0.7);
  verif("E17 d", p("Au chômage") * 20000, 1000);
  verif("E17 e", 1000 / ((p("En emploi") + p("Au chômage")) * 20000), 0.1);
}
{
  const d = diag("18-29 ans");
  const tot = somme(d.valeurs);
  verif("E18 total", tot, 2000);
  const pr = d.valeurs.map((v) => v / tot);
  [0.15, 0.35, 0.25, 0.25].forEach((x, i) => verif(`E18 a ${i}`, pr[i], x));
  loi("E18 loi", pr);
  verif("E18 b", 1 - pr[0], 0.85);
  verif("E18 c", pr[1] + pr[2], 0.6);
  verif("E18 d", pr[2], pr[3]);
}
{
  const d = diag("À l'heure");
  const tot = somme(d.valeurs);
  verif("E19 total", tot, 200);
  const p = (l) => d.v(l) / tot;
  verif("E19 a heure", p("À l'heure"), 0.75);
  verif("E19 a petit retard", p("< 15 min"), 0.18);
  verif("E19 a gros retard", p("≥ 15 min"), 0.05);
  verif("E19 a supprimé", p("Supprimé"), 0.02);
  loi("E19 loi", d.valeurs.map((v) => v / tot));
  verif("E19 b", 1 - p("Supprimé"), 0.98);
  verif("E19 c", p("< 15 min") + p("≥ 15 min"), 0.23);
  verif("E19 d contraire", 1 - p("À l'heure"), 0.25);
  verif("E19 d somme", p("< 15 min") + p("≥ 15 min") + p("Supprimé"), 0.25);
}
verif("E20 a", 1 / 400, 0.0025);
verif("E20 b", (1 + 4 + 15) / 400, 0.05);
verif("E20 c", 1 - 20 / 400, 0.95);
verif("E20 d", 10 / 400, 1 / 40);
verif("E20 e billets", 0.5 * 400, 200);
verif("E20 e coût", 200 * 2, 400);
verif("E20 recette", 400 * 2, 800);

/* ═══════════════ contrôles de texte ═══════════════ */
{
  const connues = new Set(
    [...fs.readFileSync("lib/tutor-v4/knowledge/maths/premiere/microSkills.ts", "utf8").matchAll(/id: "(\w+)"/g)].map((m) => m[1]),
  );
  const citees = new Set();
  for (const m of src.matchAll(/micros: \[([^\]]*)\]/g)) for (const id of m[1].matchAll(/"(\w+)"/g)) citees.add(id[1]);
  for (const id of citees) connues.has(id) ? ok++ : ko.push(`micro inconnue ${id}`);
  const notion = ["auto_proba_encadrement", "auto_proba_contraire", "auto_proba_somme_issues", "auto_proba_equiprobabilite"];
  for (const id of notion) citees.has(id) ? ok++ : ko.push(`micro non couverte ${id}`);
  for (const id of citees) notion.includes(id) ? ok++ : ko.push(`micro hors notion ${id}`);
  for (const m of src.matchAll(/"((?:[^"\\]|\\.)*)"/g)) {
    const n = (m[1].replace(/\\\$/g, "").match(/\$/g) || []).length;
    if (n % 2) ko.push(`dollars impairs dans « ${m[1].slice(0, 60)}… »`);
    else ok++;
  }
  for (const m of src.matchAll(/(?:label|proba): "([^"]*)"/g)) (m[1].includes("$") ? ko.push(`$ dans une étiquette SVG : ${m[1]}`) : ok++);
  const nbEx = (src.match(/correction:/g) || []).length;
  nbEx === 20 ? ok++ : ko.push(`${nbEx} exercices au lieu de 20`);
  const niveaux = [...src.matchAll(/niveau: (\d)/g)].map((m) => m[1]).join("");
  niveaux === "123" ? ok++ : ko.push(`niveaux ${niveaux}`);
}

console.log(`${ok} vérifications justes, ${ko.length} fausses`);
ko.forEach((k) => console.log("  ✗", k));
process.exit(ko.length ? 1 : 0);
