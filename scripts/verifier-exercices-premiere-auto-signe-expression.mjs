// Recalcul indépendant de la feuille « Le signe d'une expression » (1re sans
// spé, automatismes, 28/09/2026) : lib/fiches-exercices/maths-premiere-auto-signe-expression.tsx.
// Chaque racine annoncée est réinjectée, chaque valeur recalculée, chaque
// développement comparé en 41 points. Les figures sont RELUES dans le source :
// chaque tableau de signes est refait facteur par facteur (signes et zéros),
// chaque point marqué d'un repère doit être sur sa courbe, chaque tableau de
// valeurs et chaque diagramme comparés aux valeurs recalculées ici.
// Plus : dollars appariés, micros connues du coach de première et toutes
// couvertes, exactement 20 corrections.
// Usage : node scripts/verifier-exercices-premiere-auto-signe-expression.mjs

import fs from "node:fs";

const FICHIER = "lib/fiches-exercices/maths-premiere-auto-signe-expression.tsx";
const NOTION = "auto_signe_expression";

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
// ★
{
  const f1 = (x) => (x - 3) * (x + 5);
  racine("E1", f1, 3);
  racine("E1", f1, -5);
  const f2 = (x) => (2 * x + 4) * (-3 * x - 9);
  racine("E2", f2, -2);
  racine("E2", f2, -3);
  verif("E2 9/(−3)", 9 / -3, -3);
  const f3 = (x) => x * (5 * x - 10);
  racine("E3", f3, 0);
  racine("E3", f3, 2);
  const f4 = (x) => 2 * x - 6;
  racine("E4", f4, 3);
  verif("E4 test en 0", f4(0), -6);
  const f5 = (x) => -3 * x + 12;
  racine("E5", f5, 4);
  verif("E5 test en 0", f5(0), 12);
  racine("E6", (x) => 5 - x, 5);
  vrai("E6 positif avant 5", 5 - 4.9 > 0 && 5 - 5.1 < 0);
  racine("E7", (x) => (x - 1) * (x + 2), 1);
  racine("E7", (x) => (x - 1) * (x + 2), -2);
  const f8 = (x) => (3 - x) * (x + 4);
  racine("E8", f8, 3);
  racine("E8", f8, -4);
  vrai("E8 positif entre", f8(0) > 0 && f8(-5) < 0 && f8(4) < 0);
}
// ★★
{
  const B = (x) => 4 * x - 200;
  verif("E9 seuil", 200 / 4, 50);
  racine("E9", B, 50);
  vrai("E9 51 bols", B(51) > 0 && B(50) === 0);
  const T = (h) => 9 - 6 * h;
  verif("E10 9/6", 9 / 6, 1.5);
  racine("E10", T, 1.5);
  vrai("E10 gel après", T(2) < 0 && T(1) > 0);
  const f11 = (x) => (x + 1) * (x - 3);
  memes("E11 courbe = f", f11, (x) => x * x - 2 * x - 3);
  racine("E11", f11, -1);
  racine("E11", f11, 3);
  vrai("E11 minimum dans le cadre", f11(1) >= -5);
  const R = (x) => x * (60 - 2 * x);
  racine("E12", R, 0);
  racine("E12", R, 30);
  verif("E12 R(10)", R(10), 400);
  verif("E12 R(20)", R(20), 400);
  const v = (t) => 3 - 0.5 * t;
  verif("E13 3/0,5", 3 / 0.5, 6);
  racine("E13", v, 6);
  verif("E13 année", 2020 + 6, 2026);
  const f14 = (x) => (2 * x - 1) * (x + 3);
  racine("E14", f14, 0.5);
  racine("E14", f14, -3);
  vrai("E14 négatif entre", f14(0) < 0 && f14(-4) > 0 && f14(1) > 0);
  const P = (x) => 3 * (x + 2) * (x - 4);
  const Q = (x) => -3 * (x + 2) * (x - 4);
  vrai("E15 signes", P(0) < 0 && P(5) > 0 && P(-3) > 0 && Q(0) > 0 && Q(5) < 0);
  racine("E16 a", (x) => x * x - 7 * x, 0);
  racine("E16 a", (x) => x * x - 7 * x, 7);
  memes("E16 b factorisation", (x) => x * x - 16, (x) => (x - 4) * (x + 4));
  racine("E16 b", (x) => x * x - 16, 4);
  racine("E16 b", (x) => x * x - 16, -4);
}
// ★★★
const attendus = { tableau: [], diagramme: [] };
{
  const R = (x) => x * (60 - 2 * x);
  attendus.tableau.push([0, 10, 20, 30].map(R)); // E12
  const B = (p) => (p - 5) * (25 - p);
  racine("E17", B, 5);
  racine("E17", B, 25);
  verif("E17 B(10)", B(10), 75);
  verif("E17 B(15)", B(15), 100);
  verif("E17 B(20)", B(20), 75);
  vrai("E17 signes", B(2) < 0 && B(10) > 0 && B(28) < 0);
  attendus.diagramme.push([B(10), B(15), B(20)]);
  const s = (t) => (t - 3) * (t - 8);
  verif("E18 s(0)", s(0), 24);
  racine("E18", s, 3);
  racine("E18", s, 8);
  memes("E18 courbe = s", s, (t) => t * t - 11 * t + 24);
  vrai("E18 minimum dans le cadre", s(5.5) >= -7);
  const A = (x) => 150 + 0.2 * x;
  const Bx = (x) => 90 + 0.25 * x;
  verif("E19 A(1000)", A(1000), 350);
  verif("E19 B(1000)", Bx(1000), 340);
  memes("E19 D", (x) => A(x) - Bx(x), (x) => 60 - 0.05 * x, 0, 3000);
  verif("E19 racine", 60 / 0.05, 1200, 1e-9);
  verif("E19 6000/5", 6000 / 5, 1200);
  attendus.tableau.push([800, 1200, 1600].map((x) => +(A(x) - Bx(x)).toFixed(9)));
  const D = (p) => 50 - p;
  const O = (p) => 2 * p - 10;
  memes("E20 D − O", (p) => D(p) - O(p), (p) => 60 - 3 * p, 5, 50);
  verif("E20 équilibre", 60 / 3, 20);
  verif("E20 D(20)", D(20), 30);
  verif("E20 O(20)", O(20), 30);
  verif("E20 recette", 20 * D(20), 600);
  vrai("E20 pénurie avant 20", D(10) - O(10) > 0 && D(30) - O(30) < 0);
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
