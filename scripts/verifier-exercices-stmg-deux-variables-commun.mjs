// Le socle des vérificateurs des cinq feuilles STMG « séries à deux variables »
// (22/10/2026) : nuage, ajustement, moindres carrés, interpoler, changement de
// variable. Il s'appuie sur `verifier-exercices-5e-commun.mjs` (classe stmg :
// 8 + 8 + 4, 12 à 14 dessins imprimés, micros de la notion toutes servies,
// guillemets appariés, texte nu dans les dessins…) et ajoute :
//   · le RENDU de `nuage` (lib/fiches-exercices/stmg-deux-variables-figures.tsx) :
//     graduations entières, 10 intervalles au plus en x et 8 en y, chaque point,
//     chaque G et chaque lecture DANS le cadre, chaque droite visible, noms
//     d'axes qui tiennent ; `grille` : 5 colonnes au plus, lignes régulières ;
//   · les OUTILS de calcul, refaits ici sans rien lire de la feuille : moyenne,
//     droite des moindres carrés (a = cov / var, b = ȳ − a x̄), somme des carrés
//     des écarts, arrondis ;
//   · les contrôles de texte : virgule décimale, « ÷ » et jamais a/b hors
//     fraction, pas de « évidemment ».
// Usage : const s = ouvrirStmg("lib/fiches-exercices/maths-stmg-<slug>.tsx", "<notionId>");

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";

export const somme = (xs) => xs.reduce((a, b) => a + b, 0);
export const moyenne = (xs) => somme(xs) / xs.length;
/** Arrondi à d décimales, sans les « 0,30000000004 » du flottant. */
export const arr = (x, d = 0) => {
  const p = 10 ** d;
  return Math.round(x * p + (x >= 0 ? 1e-9 : -1e-9)) / p;
};
/** 10.9 → « 10{,}9 » (dans une formule), avec d décimales au plus. */
export const tx = (x, d = 6) => String(arr(x, d)).replace(".", "{,}").replace(/^-/, "-");
/** 10.9 → « 10,9 » (dans le texte). */
export const pl = (x, d = 6) => String(arr(x, d)).replace(".", ",");
/** La droite des moindres carrés de y en x (celle de la calculatrice). */
export function mc(xs, ys) {
  const mx = moyenne(xs);
  const my = moyenne(ys);
  let sxy = 0, sxx = 0;
  xs.forEach((x, i) => {
    sxy += (x - mx) * (ys[i] - my);
    sxx += (x - mx) ** 2;
  });
  const a = sxy / sxx;
  return { a, b: my - a * mx, mx, my };
}
/** Somme des carrés des écarts verticaux à la droite y = ax + b. */
export const sce = (xs, ys, a, b) => somme(xs.map((x, i) => (ys[i] - (a * x + b)) ** 2));
/** Le coefficient de corrélation (pour juger « presque alignés », jamais écrit à l'élève). */
export function r(xs, ys) {
  const mx = moyenne(xs), my = moyenne(ys);
  let sxy = 0, sxx = 0, syy = 0;
  xs.forEach((x, i) => {
    sxy += (x - mx) * (ys[i] - my);
    sxx += (x - mx) ** 2;
    syy += (ys[i] - my) ** 2;
  });
  return sxy / Math.sqrt(sxx * syy);
}
/** Les écarts successifs d'une liste. */
export const hausses = (ys) => ys.slice(1).map((y, i) => arr(y - ys[i], 6));
/** « a + b + c ». */
export const plus = (xs, d = 6) => xs.map((x) => tx(x, d)).join(" + ");

const LARGEUR = (s) => s.length * 7.2;
const fr = (x) => String(Math.round(x * 1000) / 1000).replace(".", ",");

export function ouvrirStmg(fichier, notionId) {
  const f = ouvrir(fichier, notionId, ["nuage", "grille"], "stmg");
  const { vrai, appels, feuille, dessin, dit } = f;

  /* ═══ Rendu de nuage ═══ */
  for (const { args } of appels("nuage").filter((a) => a.args)) {
    const [[xmin, xmax, px, ymin, ymax, py], points, o = {}] = args;
    const nom = `nuage [${xmin} ; ${xmax}] × [${ymin} ; ${ymax}]`;
    const nx = (xmax - xmin) / px, ny = (ymax - ymin) / py;
    vrai(`${nom} : graduations entières (${nx}, ${ny})`, Math.abs(nx - Math.round(nx)) < 1e-9 && Math.abs(ny - Math.round(ny)) < 1e-9);
    vrai(`${nom} : 10 intervalles au plus en x (${nx}), 8 en y (${ny})`, nx <= 10 && ny <= 8 && nx >= 2 && ny >= 2);
    const dedans = (x, y) => x >= xmin - 1e-9 && x <= xmax + 1e-9 && y >= ymin - 1e-9 && y <= ymax + 1e-9;
    for (const p of points) vrai(`${nom} : point (${p.x} ; ${p.y}) dans le cadre`, dedans(p.x, p.y));
    if (o.moyen) vrai(`${nom} : G dans le cadre`, dedans(...o.moyen));
    for (const [a, b] of o.droites ?? []) {
      // La droite doit traverser le cadre sur au moins la moitié de sa largeur.
      const xs = Array.from({ length: 101 }, (_, k) => xmin + ((xmax - xmin) * k) / 100);
      const vus = xs.filter((x) => dedans(x, a * x + b)).length;
      vrai(`${nom} : droite y = ${a}x + ${b} visible sur la moitié du cadre (${vus} %)`, vus >= 50);
    }
    const d0 = o.droites?.[0];
    for (const l of o.lectures ?? []) {
      vrai(`${nom} : une lecture suppose une droite`, !!d0);
      if (!d0) continue;
      const x = l.x ?? (l.y - d0[1]) / d0[0];
      vrai(`${nom} : lecture (${l.x ?? "?"} ; ${l.y ?? "?"}) dans le cadre`, dedans(x, d0[0] * x + d0[1]));
    }
    vrai(`${nom} : écarts seulement avec une droite`, !o.ecarts || !!d0);
    if (o.noms) vrai(`${nom} : noms des axes de 36 signes au plus`, o.noms.every((n) => LARGEUR(n) <= 260));
    const gy = Array.from({ length: Math.round(ny) + 1 }, (_, k) => fr(ymin + k * py));
    const G = 14 + Math.max(...gy.map(LARGEUR));
    vrai(`${nom} : marge gauche raisonnable (${G.toFixed(0)})`, G <= 60);
  }
  for (const { args } of appels("grille").filter((a) => a.args)) {
    const [ent, lignes] = args;
    vrai(`grille « ${ent[0]} » : 5 colonnes au plus`, ent.length <= 5);
    vrai(`grille « ${ent[0]} » : lignes de la largeur de l'entête`, lignes.every((l) => l.length === ent.length));
  }

  /* ═══ Le texte ═══ */
  const textes = feuille.textes.join(" ");
  vrai("pas de « évidemment »", !/évidemment/i.test(textes));
  vrai("pas de « / » comme division", !/\d ?\/ ?\d/.test(textes));
  vrai("virgule décimale, jamais de point", !/\d\.\d/.test(textes));

  /** Les points (x, y) du nuage `role` de l'exercice k. */
  const pointsDe = (k, role) => {
    const [, pts] = dessin("nuage", k, role);
    return [pts.map((p) => p.x), pts.map((p) => p.y)];
  };
  /** Les colonnes i et j d'une grille de l'exercice k. */
  const colonnes = (k, i = 0, j = 1, role = "figure") => {
    const [, lignes] = dessin("grille", k, role);
    return [lignes.map((l) => l[i]), lignes.map((l) => l[j])];
  };
  /** Les nombres d'une ligne « Nom : 1, 2, 3. » de l'énoncé (virgule ou point-virgule). */
  const listeEnonce = (k, nom) => {
    const morceaux = f.e(k).split(`${nom} : `);
    if (morceaux.length !== 2) throw new Error(`exercice ${k} : pas de liste « ${nom} : » (ou plusieurs)`);
    const seg = morceaux[1].split("\\n")[0].split(/\.(?:\s|$)/)[0];
    const parts = seg.includes(" ; ") ? seg.split(" ; ") : seg.split(", ");
    return parts.map((s) => parseFloat(s.trim().replace(",", ".")));
  };
  /** Deux listes égales (à 1e-9 près). */
  const memes = (a, b) => a.length === b.length && a.every((x, i) => Math.abs(x - b[i]) < 1e-9);
  /** Le corrigé de k écrit le point moyen G arrondi à d décimales. */
  const ditG = (k, xs, ys, dx = 1, dy = 1) => dit(k, `$G(${tx(moyenne(xs), dx)} ; ${tx(moyenne(ys), dy)})$`);

  return { ...f, pointsDe, colonnes, listeEnonce, memes, ditG };
}
