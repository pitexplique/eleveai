// Le socle des scripts de recalcul des feuilles « données » de STMG (22/10/2026) :
// tableau croisé, fréquences, filtres, données chiffrées, échantillonnage.
//
// Il ouvre la feuille avec le socle de 5e (`verifier-exercices-5e-commun.mjs`,
// classe « stmg » : micros lues dans lib/tutor-v4/knowledge/maths/stmg/), et y
// ajoute ce qui est propre aux dessins de `lib/fiches-exercices/figures-donnees.tsx` :
//   · barres : libellés qui tiennent dans leur colonne, 8 intervalles au plus,
//     chaque valeur sur une graduation ou au milieu de deux ;
//   · camembert : 100 % en tout quand il est en pourcentages, légende courte ;
//   · grille et croise : 5 colonnes au plus, lignes régulières, texte nu ;
//   · ⭐ croise : CHAQUE MARGE EST RECALCULÉE — une ligne (ou une colonne)
//     entièrement chiffrée doit avoir pour total la somme de ses cases, dans les
//     deux sens, total général compris (sauf les marges fausses EXPRÈS) ;
//   · le texte : « ÷ », jamais a/b hors fraction, virgule décimale.
// Puis des outils de calcul partagés (somme, pgcd, écritures à la française).

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";

export const somme = (xs) => xs.reduce((a, b) => a + b, 0);
export const memes = (a, b) => JSON.stringify(a) === JSON.stringify(b);
export const pgcd = (a, b) => (b ? pgcd(b, a % b) : a);
export const arrondi = (x, n = 6) => Math.round(x * 10 ** n) / 10 ** n;
const grouper = (e, sep) => (Math.abs(Number(e)) >= 10000 ? e.replace(/\B(?=(\d{3})+(?!\d))/g, sep) : e);
/** Un nombre exact dans une formule : 0.375 → « 0{,}375 » ; 12450 → « 12\\,450 ». */
export const tx = (x) => {
  const [e, d] = String(arrondi(x)).split(".");
  return d ? `${grouper(e, "\\,")}{,}${d}` : grouper(e, "\\,");
};
/** Un nombre exact dans le texte : 0.375 → « 0,375 » ; 12450 → « 12 450 ». */
export const plat = (x) => {
  const [e, d] = String(arrondi(x)).split(".");
  return d ? `${grouper(e, " ")},${d}` : grouper(e, " ");
};
/** Arrondi à n décimales (formule / texte) : 0.3456, 2 → « 0{,}35 » / « 0,35 ». */
export const txA = (x, n) => tx(arrondi(Number(x.toFixed(n)), n));
export const platA = (x, n) => plat(arrondi(Number(x.toFixed(n)), n));
/** Un pourcentage arrondi à n décimales, dans le texte : 0.3456, 1 → « 34,6 ». */
// ⚠️ Le zéro final se GARDE : « 28,0 % » quand l'énoncé demande le dixième.
export const pcA = (x, n = 1) => (x * 100).toFixed(n).replace(".", ",");
export const frac = (a, b) => `\\dfrac{${a}}{${b}}`;
export const plus = (xs) => xs.map(tx).join(" + ");
const num = (c) => (typeof c === "number" ? c : null);

// `ecartsAttendus` : les marges FAUSSES exprès (exercice « trouve l'erreur »),
// sous la forme « ligne « Total » » ou « colonne « Total » » : elles doivent
// être fausses, et elles seules.
export function ouvrirStmg(fichier, notionId, { ecartsAttendus = [] } = {}) {
  const f = ouvrir(fichier, notionId, ["barres", "camembert", "grille", "croise", "intervalle"], "stmg");
  const { vrai, appels, feuille } = f;

  for (const { args } of appels("barres").filter((a) => a.args)) {
    const [data, o = {}] = args;
    const G = o.pas ? 44 : 16;
    const slot = (300 - G - 10) / data.length;
    for (const d of data) vrai(`barres : « ${d.label} » tient dans sa colonne (${slot.toFixed(0)})`, d.label.length * 8.2 <= slot - 4);
    if (o.pas) {
      const debut = o.debut ?? 0;
      const vmax = debut + Math.ceil((Math.max(...data.map((d) => d.value)) - debut) / o.pas) * o.pas;
      vrai(`barres graduées : ${(vmax - debut) / o.pas} intervalles, 8 au plus`, (vmax - debut) / o.pas <= 8);
      const demi = (d) => (2 * (d.value - debut)) / o.pas;
      vrai("barres graduées : chaque valeur sur une graduation ou au milieu", data.every((d) => Math.abs(demi(d) - Math.round(demi(d))) < 1e-9 && d.value >= debut));
    }
    if (o.batons) vrai("bâtons : des valeurs numériques en bas", data.every((d) => /^[\d,]+$/.test(d.label)));
  }
  for (const { args } of appels("intervalle").filter((a) => a.args)) {
    const [min, max, pas, o = {}] = args;
    const n = Math.round((max - min) / pas);
    vrai(`intervalle [${min} ; ${max}] : ${n} pas, 10 au plus, pas exact`, n <= 10 && Math.abs((max - min) / pas - n) < 1e-9);
    for (const pt of o.points ?? []) vrai(`intervalle : point ${pt.value} dans le cadre`, pt.value >= min && pt.value <= max);
    if (o.e !== undefined) vrai(`intervalle : bande [${o.p - o.e} ; ${o.p + o.e}] dans le cadre`, o.p - o.e >= min - 1e-9 && o.p + o.e <= max + 1e-9);
  }
  for (const { args } of appels("camembert").filter((a) => a.args)) {
    const [data, , pourcent = false] = args;
    if (pourcent) {
      vrai("camembert en pourcentages : 100 % en tout", Math.abs(somme(data.map((d) => d.value)) - 100) < 1e-9);
      for (const d of data) vrai(`camembert : « ${d.label} : ${d.value} % » ≤ 24 signes`, `${d.label} : ${d.value} %`.length <= 24);
    } else for (const d of data) vrai(`camembert : « ${d.label} » ≤ 12 signes`, d.label.length <= 12);
  }
  for (const nom of ["grille", "croise"])
    for (const { args } of appels(nom).filter((a) => a.args)) {
      const [ent, lignes] = args;
      vrai(`${nom} « ${ent[0] || ent[1]} » : 5 colonnes au plus`, ent.length <= 5);
      vrai(`${nom} « ${ent[0] || ent[1]} » : lignes de la largeur de l'entête`, lignes.every((l) => l.length === ent.length));
      vrai(`${nom} « ${ent[0] || ent[1]} » : texte nu, sans $`, !JSON.stringify(args).includes("$"));
    }

  // ⭐ Les marges de chaque tableau croisé, recalculées dans les deux sens.
  const vus = [];
  const marge = (nom, cle, calcule, ecrit) => {
    const juste = Math.abs(calcule - ecrit) < 1e-9;
    if (ecartsAttendus.includes(cle) && !juste) {
      vus.push(cle);
      vrai(`${nom} : FAUSSE exprès (${calcule} ≠ ${ecrit})`, true);
    } else vrai(`${nom} : ${calcule} = ${ecrit}`, juste);
  };
  for (const { args } of appels("croise").filter((a) => a.args)) {
    const [ent, lignes] = args;
    const jT = ent.findIndex((x) => /^total$/i.test(x));
    const iT = lignes.findIndex((l) => /^total$/i.test(String(l[0])));
    const nom = `croise « ${ent.slice(1).join(" / ")} »`;
    if (jT > 0)
      lignes.forEach((l) => {
        const cases = l.slice(1, jT).map(num);
        if (cases.every((x) => x !== null) && num(l[jT]) !== null) marge(`${nom} : ligne « ${l[0]} »`, `ligne « ${l[0]} »`, somme(cases), l[jT]);
      });
    if (iT >= 0)
      for (let j = 1; j < ent.length; j++) {
        const cases = lignes.filter((_, i) => i !== iT).map((l) => num(l[j]));
        if (cases.every((x) => x !== null) && num(lignes[iT][j]) !== null) marge(`${nom} : colonne « ${ent[j]} »`, `colonne « ${ent[j]} »`, somme(cases), lignes[iT][j]);
      }
  }
  for (const cle of ecartsAttendus) vrai(`la marge fausse exprès « ${cle} » est bien fausse`, vus.includes(cle));

  // ⛔ 22/10 : un antislash SEUL dans une chaîne de la feuille (« \times », « \div »)
  // devient une tabulation ou disparaît à l'affichage. Seuls « \n » et « \\ » sont permis.
  const chaines = [...feuille.series.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]);
  const seuls = chaines.filter((s) => /\\[^n"]/.test(s.replace(/\\\\/g, "")));
  vrai(`aucun antislash seul dans les chaînes (${seuls.length})`, seuls.length === 0, (seuls[0] ?? "").slice(0, 100));

  const textes = feuille.textes.join(" ");
  vrai("pas de « évidemment »", !/évidemment/i.test(textes));
  vrai("pas de « / » comme division", !/\d ?\/ ?\d/.test(textes));
  vrai("virgule décimale, jamais de point", !/\d\.\d/.test(textes));

  /** Une case d'un tableau croisé, lue par le nom de sa ligne et de sa colonne. */
  const lire = ([ent, lignes], ligne, col) => {
    const l = lignes.find((x) => x[0] === ligne);
    if (!l) throw new Error(`ligne « ${ligne} » introuvable`);
    const j = ent.indexOf(col);
    if (j < 0) throw new Error(`colonne « ${col} » introuvable`);
    return l[j];
  };
  return { ...f, lire };
}

/**
 * L'écriture d'une fréquence dans les corrigés, recalculée : « $90 \\div 300 =
 * 0{,}3$, soit 30 % » quand le quotient tombe juste (4 décimales au plus),
 * sinon « $54 \\div 193 \\approx 0{,}2798$, soit environ 28,0 % » (quatre
 * décimales, puis le pourcentage au dixième).
 */
// Un quotient JUSTE dont le pourcentage a deux décimales (0,5625) s'écrit « = »,
// puis « soit environ 56,3 % » : l'arrondi au dixième reste la règle.
export const quotient = (a, b) => {
  const q = a / b;
  const juste = Math.abs(q * 10000 - Math.round(q * 10000)) < 1e-9;
  const dixieme = Math.abs(q * 1000 - Math.round(q * 1000)) < 1e-9;
  if (juste && dixieme) return `$${tx(a)} \\div ${tx(b)} = ${tx(q)}$, soit ${plat(q * 100)} %`;
  if (juste) return `$${tx(a)} \\div ${tx(b)} = ${tx(q)}$, soit environ ${pcA(q, 1)} %`;
  return `$${tx(a)} \\div ${tx(b)} \\approx ${txA(q, 4)}$, soit environ ${pcA(q, 1)} %`;
};
/** Le pourcentage seul, tel que la ligne « Réponse » l'écrit : « 30 % » ou « environ 28,0 % ». */
export const pourcent = (a, b) => {
  const q = a / b;
  return Math.abs(q * 1000 - Math.round(q * 1000)) < 1e-9 ? `${plat(q * 100)} %` : `environ ${pcA(q, 1)} %`;
};
