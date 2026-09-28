// Recalcul indépendant de la feuille « Utiliser une formule » (1re sans spé,
// automatismes, 28/09/2026) : lib/fiches-exercices/maths-premiere-auto-formules.tsx.
// Chaque résultat annoncé est refait ici, sans lire le source ; puis les figures
// sont RELUES dans le source : tableaux de valeurs, diagrammes, droites
// graduées, arbres et repères comparés aux valeurs recalculées ici.
// Plus : dollars appariés, micros connues du coach de première et toutes
// couvertes, exactement 20 corrections.
// Usage : node scripts/verifier-exercices-premiere-auto-formules.mjs

import fs from "node:fs";

const FICHIER = "lib/fiches-exercices/maths-premiere-auto-formules.tsx";
const NOTION = "auto_formules";

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
const attendus = { tableau: [], diagramme: [], droiteGraduee: [], arbre: [] };
// ★
{
  verif("E1", 2 * (-1) ** 2 - 3 * -1 - 4, 1);
  verif("E2", -((-2) ** 2) + 5 * -2, -14);
  const [a, b] = [-3, 5];
  verif("E3 a − b", a - b, -8);
  verif("E3 a × b", a * b, -15);
  verif("E3 −a + 2b", -a + 2 * b, 13);
  verif("E3 a² − b²", a ** 2 - b ** 2, -16);
  verif("E4 R", 20 ** 2 / 80, 5);
  verif("E5 I", 60 / 12, 5);
  verif("E5 vérif", 12 * 5, 60);
  verif("E6 t", 150 / 60, 2.5);
  verif("E6 0,5 h en min", 0.5 * 60, 30);
  attendus.tableau.push([1, 2, 2.5].map((t) => 60 * t)); // E6
  memes("E7", (x) => x / 3 + x / 6, (x) => x / 2);
  verif("E7 x = 6", 6 / 3 + 6 / 6, 3);
  memes("E8 x = (y + 6)/3", (x) => (3 * x - 6 + 6) / 3, (x) => x);
  verif("E8 x = 4", (3 * 4 - 6 + 6) / 3, 4);
  vrai("E8 piège faux", 6 / 3 + 6 !== 4);
}
// ★★
{
  const TTC = (ht) => 1.2 * ht;
  verif("E9 a", TTC(50), 60);
  verif("E9 c", 90 / 1.2, 75);
  verif("E9 900/12", 900 / 12, 75);
  verif("E9 piège", 90 * 0.8, 72);
  attendus.tableau.push([50, 75, 100].map(TTC));
  const F = (c) => 1.8 * c + 32;
  const C = (f) => (f - 32) / 1.8;
  verif("E10 20 °C", F(20), 68);
  verif("E10 0 °C", F(0), 32);
  verif("E10 −10 °C", F(-10), 14);
  verif("E10 50 °F", C(50), 10);
  memes("E10 C inverse de F", (c) => C(F(c)), (c) => c, -40, 40);
  attendus.tableau.push([-10, 0, 10, 20].map(F));
  verif("E11 v", 450 / 2.5, 180);
  verif("E11 4500/25", 4500 / 25, 180);
  verif("E11 t", 540 / 180, 3);
  const n = (N, P) => (N / P) * 1000;
  const N = (nn, P) => (nn * P) / 1000;
  verif("E12 a", n(600, 50000), 12);
  verif("E12 600000/50000", 600000 / 50000, 12);
  verif("E12 c", N(10, 80000), 800);
  verif("E12 N inverse de n", n(N(10, 80000), 80000), 10);
  const I = (c, t, nn) => c * t * nn;
  verif("E13 par an", 2000 * 0.03, 60);
  verif("E13 a", I(2000, 0.03, 4), 240);
  verif("E13 c", 300 / (2000 * 0.03), 5);
  attendus.diagramme.push([1, 2, 3, 4, 5].map((k) => I(2000, 0.03, k)));
  verif("E14 a", 0.8 * 2000, 1600);
  verif("E14 c", 2400 / 0.8, 3000);
  verif("E14 24000/8", 24000 / 8, 3000);
  verif("E14 piège", 2400 * 1.2, 2880);
  attendus.diagramme.push([2400 / 0.8, 2400, 2400 / 0.8 - 2400]);
  verif("E15 a cm", 25000 * 4, 100000);
  verif("E15 a km", 100000 / 100000, 1);
  verif("E15 c", 300000 / 25000, 12);
  attendus.tableau.push([1, 4, 12].map((d) => (25000 * d) / 100000));
  const M = (q) => (5 * q + 200) / q;
  memes("E16 M", M, (q) => 5 + 200 / q, 1, 400);
  verif("E16 q = 50", M(50), 9);
  verif("E16 q = 100", M(100), 7);
  verif("E16 q = 200", M(200), 6);
  attendus.diagramme.push([50, 100, 200].map(M));
}
// ★★★
{
  verif("E17 a", 1 + 0.2, 1.2);
  verif("E17 c HT", 44 / 1.1, 40);
  verif("E17 440/11", 440 / 11, 40);
  verif("E17 d HT", 36 / 1.2, 30);
  verif("E17 360/12", 360 / 12, 30);
  verif("E17 piège", 0.1 * 44, 4.4);
  vrai("E17 le pull rapporte plus", 36 - 30 > 44 - 40);
  attendus.diagramme.push([44 / 1.1, 44 - 44 / 1.1, 36 / 1.2, 36 - 36 / 1.2]);
  verif("E18 aller", 120 / 40, 3);
  verif("E18 retour", 120 / 60, 2);
  verif("E18 moyenne", 240 / 5, 48);
  vrai("E18 pas 50", (40 + 60) / 2 !== 240 / 5);
  attendus.tableau.push([120 / 40, 120 / 60, 120 / 40 + 120 / 60]);
  const P = (d) => 2 + d;
  verif("E19 a", P(7), 9);
  verif("E19 c", 12 - 2, 10);
  verif("E19 d", 8 - 2, 6);
  verif("E19 lecture", P(6), 8);
  verif("E19 10 km", P(10), 12);
  verif("E19 5 km", P(5), 7);
  memes("E19 droite = P", P, (d) => 0 * d * d + 1 * d + 2, -1, 11);
  verif("E20 a", 12e6 / 3e5, 40);
  verif("E20 b", 120 * 5e5, 6e7);
  verif("E20 c", 18e6 / 90, 2e5);
  verif("E20 piège", 90 / 18e6, 5e-6);
  vrai("E20 ordre", 40 < 90 && 90 < 120);
  attendus.diagramme.push([12e6 / 3e5, 120, 18e6 / 2e5]);
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

for (const [cadre, courbes, marques = [], horizontale, grand = false] of appels("repere")) {
  const [xmin, xmax, ymin, ymax] = cadre;
  vrai(`repère ${cadre} : ymin < 0`, ymin < 0);
  vrai(`repère ${cadre} : au plus 15 unités par axe`, xmax - xmin <= 15 && ymax - ymin <= 15);
  // ⛔ Mesuré à 375 px (28/09) : au-delà de 10 unités sur un axe, les
  // graduations du petit cadre se touchent. Le repère passe alors en `grand`.
  vrai(`repère ${cadre} : plus de 10 unités sur un axe, donc en grand`, grand || (xmax - xmin <= 10 && ymax - ymin <= 10));
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
diagrammes.forEach(([type, data]) => {
  vrai("diagramme : étiquettes nues", !data.some((d) => d.label.includes("$")));
  // ⛔ Mesuré à 375 px (28/09) : à partir de 4 barres, un libellé de plus de
  // 9 signes chevauche son voisin (« Resto HT » sur « Resto TVA »).
  if (type !== "camembert" && data.length >= 4)
    data.forEach((d) => vrai(`diagramme : « ${d.label} » en 9 signes au plus (4 barres ou plus)`, [...d.label].length <= 9));
});
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
