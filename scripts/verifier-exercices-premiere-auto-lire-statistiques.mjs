// Recalcul indépendant de la feuille « Lire des graphiques statistiques »
// (1re, automatismes, 28/09/2026) :
// lib/fiches-exercices/maths-premiere-auto-lire-statistiques.tsx.
// Les données des dessins sont RELUES dans le source (appels `diagramme(…)`,
// `tableau(…)`, `repere(…)`), puis chaque résultat annoncé est recalculé à
// partir d'elles : sommes des barres, effectifs tirés des pourcentages, angles,
// écarts. Plus : dollars appariés, micros connues du coach de première,
// exactement 20 corrections, tableaux aux en-têtes de la bonne longueur.
// Usage : node scripts/verifier-exercices-premiere-auto-lire-statistiques.mjs

import fs from "node:fs";

const FICHE = "lib/fiches-exercices/maths-premiere-auto-lire-statistiques.tsx";
const src = fs.readFileSync(FICHE, "utf8");

let ok = 0;
const ko = [];
const proche = (a, b, eps = 1e-9) => Math.abs(a - b) < eps * Math.max(1, Math.abs(b));
const verif = (nom, a, b, eps) => (proche(a, b, eps) ? ok++ : ko.push(`${nom} : ${a} ≠ ${b}`));
const vrai = (nom, c) => (c ? ok++ : ko.push(`${nom} : faux`));
const somme = (t) => t.reduce((s, x) => s + x, 0);

/** Tous les appels `nom(…)` du source, arguments évalués (des littéraux). */
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
    res.push(Function(`return [${src.slice(debut, j - 1)}]`)());
  }
  return res;
}
/** Le diagramme dont une étiquette vaut `label` : { type, v(label), valeurs, labels }. */
const diag = (label, type) => {
  const d = appels("diagramme").find(([t, data]) => (!type || t === type) && data.some((x) => x.label === label));
  if (!d) {
    ko.push(`diagramme « ${label} » introuvable`);
    return { v: () => NaN, valeurs: [], labels: [] };
  }
  const [t, data] = d;
  return { type: t, v: (l) => data.find((x) => x.label === l)?.value, valeurs: data.map((x) => x.value), labels: data.map((x) => x.label) };
};

/* ═══════════════ contrôles génériques des dessins ═══════════════ */
for (const [entete, ligne] of appels("tableau")) vrai(`tableau ${entete[0]} : en-tête et ligne de même longueur`, entete.length === ligne.length);
for (const [t, data] of appels("diagramme")) vrai(`diagramme ${t} : valeurs positives`, data.every((x) => typeof x.value === "number" && x.value >= 0));
// ⛔ Mesuré le 28/09 à 375 px : dès 4 barres ou secteurs, un libellé de plus de
// 9 signes chevauche ses voisins.
for (const [t, data] of appels("diagramme"))
  if (data.length >= 4) for (const x of data) vrai(`diagramme ${t} : libellé court « ${x.label} »`, [...x.label].length <= 9);

/* ═══════════════ ★ ═══════════════ */
{
  const d = diag("Janvier");
  verif("E1 a", d.v("Mars"), 90);
  vrai("E1 b", Math.max(...d.valeurs) === d.v("Avril"));
  verif("E1 c", d.v("Avril") - d.v("Janvier"), 120);
  verif("E1 double", d.v("Avril"), 2 * d.v("Janvier"));
}
verif("E2 a", 200 / 5, 40);
verif("E2 b", 200 + 3 * 40, 320);
{
  const d = diag("2023");
  verif("E3 hauteurs sur l'affiche", (d.v("2024") - 100) / (d.v("2023") - 100), 2);
  verif("E3 hausse", d.v("2024") - d.v("2023"), 2);
  vrai("E3 moins de 2 %", (d.v("2024") - d.v("2023")) / d.v("2023") < 0.02);
}
{
  const d = diag("0 enfant", "batons");
  verif("E4 total familles", somme(d.valeurs), 20);
  verif("E4 a", d.v("2"), 6);
  verif("E4 b", d.v("2") + d.v("3") + d.v("4"), 9);
  verif("E4 c", somme(d.labels.map((l, i) => parseInt(l, 10) * d.valeurs[i])), 29);
}
{
  const d = diag("À pied", "camembert");
  verif("E5 total %", somme(d.valeurs), 100);
  verif("E5", (d.v("À pied") / 100) * 400, 60);
  const s = diag("À pied", "barres");
  d.labels.forEach((l) => verif(`E5 schéma ${l}`, s.v(l), (d.v(l) / 100) * 400));
}
{
  const s = diag("Inès");
  const parVoix = 360 / 24;
  verif("E6 une voix", parVoix, 15);
  verif("E6 Inès", s.v("Inès") * parVoix, 180);
  verif("E6 Tom", s.v("Tom") * parVoix, 135);
  verif("E6 Sami", s.v("Sami") * parVoix, 45);
  verif("E6 total", somme(s.valeurs), 24);
}
{
  const s = diag("Train (%)");
  verif("E7 train", (20 / 50) * 100, s.v("Train (%)"));
  verif("E7 voiture", (18 / 50) * 100, s.v("Voiture (%)"));
  verif("E7 avion", (12 / 50) * 100, s.v("Avion (%)"));
  verif("E7 total", somme(s.valeurs), 100);
  verif("E7 effectif", 20 + 18 + 12, 50);
}
verif("E8 a", 175 / 50, 3.5);
verif("E8 b", 4.4 * 50, 220);

/* ═══════════════ ★★ ═══════════════ */
{
  const d = diag("0-19 ans");
  verif("E9 a", somme(d.valeurs), 68);
  verif("E9 b", d.v("60-79") + d.v("80 et +"), 19);
  verif("E9 quart", 68 / 4, 17);
  vrai("E9 c plus d'un quart", 19 > 68 / 4);
}
{
  const d = diag("Liste A");
  verif("E10 total %", somme(d.valeurs), 100);
  const voix = d.valeurs.map((p) => (p / 100) * 2000);
  verif("E10 A", voix[0], 900);
  verif("E10 B", voix[1], 700);
  verif("E10 C", voix[2], 400);
  verif("E10 angle", (d.v("Liste A") / 100) * 360, 162);
  vrai("E10 pas de majorité absolue", voix[0] <= 1000);
  vrai("E10 en tête", voix[0] > voix[1] && voix[0] > voix[2]);
}
{
  const d = diag("1,5 à 2");
  verif("E11 total", somme(d.valeurs), 200);
  verif("E11 a", d.v("2 à 2,5"), 70);
  verif("E11 b", d.v("1,5 à 2") + d.v("2 à 2,5"), 130);
  verif("E11 b %", (130 / 200) * 100, 65);
  verif("E11 c", ((d.v("3 à 3,5") + d.v("3,5 à 4")) / 200) * 100, 15);
}
{
  const s = diag("T. pour");
  verif("E12 total", somme(s.valeurs), 100);
  verif("E12 a", ((s.v("T. pour") + s.v("Pour")) / 100) * 1200, 540);
  vrai("E12 b majorité d'opposés", s.v("Contre") + s.v("T. contre") > 50);
  verif("E12 c", (s.v("T. contre") / 100) * 360, 72);
}
{
  const [[cadre, , pts]] = appels("repere");
  vrai("E13 cadre ymin < 0", cadre[2] < 0);
  const y = (x) => pts.find((p) => p.x === x).y;
  verif("E13 a", y(4) * 100, 800);
  vrai("E13 b croissant", pts.every((p, i) => i === 0 || p.y > pts[i - 1].y));
  verif("E13 c 20 m²", (y(2) * 100) / 20, 25);
  verif("E13 c 60 m²", (y(6) * 100) / 60, 20);
}
{
  const s = diag("Nucléaire");
  verif("E15 a", 360 - 234 - 90, 36);
  verif("E15 renouvelables", (90 / 360) * 100, s.v("Renouvelables"));
  verif("E15 fossiles", (36 / 360) * 100, s.v("Fossiles"));
  verif("E15 nucléaire", (234 / 360) * 100, s.v("Nucléaire"));
  verif("E15 TWh nucléaire", 0.65 * 500, 325);
  verif("E15 TWh renouvelables", 0.25 * 500, 125);
  verif("E15 TWh fossiles", 0.1 * 500, 50);
}
{
  const s = diag("Cadres en 2000");
  verif("E16 2000", 0.2 * 50, s.v("Cadres en 2000"));
  verif("E16 2020", 0.15 * 200, s.v("Cadres en 2020"));
  verif("E16 triple", s.v("Cadres en 2020") / s.v("Cadres en 2000"), 3);
}

/* ═══════════════ ★★★ ═══════════════ */
{
  const t = appels("tableau");
  const pct = (an) => t.find(([, l]) => l[0] === `${an} (%)`)[1].slice(1);
  const hab = (an) => t.find(([, l]) => l[0] === `${an} (hab.)`)[1].slice(1).map((s) => Number(String(s).replace(/\s/g, "")));
  verif("E17 1975 %", somme(pct(1975)), 100);
  verif("E17 2025 %", somme(pct(2025)), 100);
  pct(1975).forEach((p, i) => verif(`E17 1975 tranche ${i}`, (p / 100) * 50000, hab(1975)[i]));
  pct(2025).forEach((p, i) => verif(`E17 2025 tranche ${i}`, (p / 100) * 60000, hab(2025)[i]));
  vrai("E17 b plus que doublé", hab(2025)[2] > 2 * hab(1975)[2]);
  verif("E17 c", hab(2025)[1] - hab(1975)[1], 5000);
  vrai("E17 jeunes en baisse", hab(2025)[0] < hab(1975)[0]);
}
{
  const s = diag("Candidat A (%)");
  const [a, b] = [s.v("Candidat A (%)"), s.v("Candidat B (%)")];
  verif("E18 a A", a - 22, 4);
  verif("E18 a B", b - 22, 2);
  verif("E18 b", (a - 22) / (b - 22), 2);
  verif("E18 c A", (a / 100) * 50000, 13000);
  verif("E18 c B", (b / 100) * 50000, 12000);
  verif("E18 d", 1000 / 12000, 1 / 12);
  vrai("E18 d environ 8 %", Math.round((100 * 1000) / 12000) === 8);
}
{
  const d = diag("Logement", "camembert");
  verif("E19 total %", somme(d.valeurs), 100);
  const euros = d.valeurs.map((p) => (p / 100) * 2500);
  [700, 400, 350, 300, 250, 500].forEach((e, i) => verif(`E19 a ${d.labels[i]}`, euros[i], e));
  verif("E19 a total", somme(euros), 2500);
  verif("E19 b logement", (800 / 2500) * 100, 32);
  verif("E19 b loisirs", (200 / 2500) * 100, 8);
  verif("E19 c", (32 - 28) * 3.6, 14.4);
  verif("E19 d", (1000 / 5000) * 100, 20);
}
{
  const d = diag("1970");
  verif("E20 a", d.v("2000"), 30);
  verif("E20 a par an", d.v("2000") / 10, 3);
  const ecarts = d.valeurs.slice(1).map((v, i) => v - d.valeurs[i]);
  const lu = appels("tableau").find(([, l]) => l[0] === "Écart avec la précédente")[1].slice(1);
  ecarts.forEach((e, i) => verif(`E20 b écart ${i}`, lu[i], e));
  vrai("E20 b pas +10 partout", ecarts.some((e) => e !== 10));
  verif("E20 c", d.v("2010") / d.v("1970"), 5);
  verif("E20 d total", somme(d.valeurs), 120);
  vrai("E20 d plus d'un tiers", d.v("2010") > somme(d.valeurs) / 3);
}

/* ═══════════════ contrôles de texte ═══════════════ */
{
  const connues = new Set(
    [...fs.readFileSync("lib/tutor-v4/knowledge/maths/premiere/microSkills.ts", "utf8").matchAll(/id: "(\w+)"/g)].map((m) => m[1]),
  );
  const citees = new Set();
  for (const m of src.matchAll(/micros: \[([^\]]*)\]/g)) for (const id of m[1].matchAll(/"(\w+)"/g)) citees.add(id[1]);
  for (const id of citees) connues.has(id) ? ok++ : ko.push(`micro inconnue ${id}`);
  const notion = ["auto_stat_lire_graphique", "auto_stat_graphiques_usuels", "auto_stat_graphique_donnees"];
  for (const id of notion) citees.has(id) ? ok++ : ko.push(`micro non couverte ${id}`);
  for (const id of citees) notion.includes(id) ? ok++ : ko.push(`micro hors notion ${id}`);
  for (const m of src.matchAll(/"((?:[^"\\]|\\.)*)"/g)) {
    const n = (m[1].replace(/\\\$/g, "").match(/\$/g) || []).length;
    if (n % 2) ko.push(`dollars impairs dans « ${m[1].slice(0, 60)}… »`);
    else ok++;
  }
  for (const m of src.matchAll(/label: "([^"]*)"/g)) (m[1].includes("$") ? ko.push(`$ dans une étiquette SVG : ${m[1]}`) : ok++);
  const nbEx = (src.match(/correction:/g) || []).length;
  nbEx === 20 ? ok++ : ko.push(`${nbEx} exercices au lieu de 20`);
  const niveaux = [...src.matchAll(/niveau: (\d)/g)].map((m) => m[1]).join("");
  niveaux === "123" ? ok++ : ko.push(`niveaux ${niveaux}`);
}

console.log(`${ok} vérifications justes, ${ko.length} fausses`);
ko.forEach((k) => console.log("  ✗", k));
process.exit(ko.length ? 1 : 0);
