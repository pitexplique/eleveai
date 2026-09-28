// Outils communs aux cinq scripts de recalcul du chapitre « Analyse de
// l'information chiffrée » de première (28/09/2026) : tableau croisé,
// fréquences, représentations croisées, nuage de points, point moyen.
//
// ⭐ Chaque script garde ses CALCULS ; ici vit ce qui se répète :
//   · la relecture des dessins dans le source (`appels("tableauProba")`…),
//     arguments évalués comme des littéraux ;
//   · les contrôles communs de `verifier-exercices-commun.mjs` (20 exercices,
//     8 + 8 + 4, dollars, LaTeX hors formule, micros de la notion) ;
//   · les RÈGLES DE RENDU mesurées à 375 px (libellés courts sous 4 barres et
//     plus, repère : ymin < 0, `grand` au-delà de 10 unités, 15 unités au plus,
//     étiquettes loin des graduations et des autres points, texte NU dans les
//     SVG, vrai signe moins, tableaux rectangulaires) ;
//   · le compte des dessins IMPRIMÉS (10 à 14) et écran seulement, et
//     l'interdit du même dessin dans l'énoncé et dans le corrigé.
// Le script finit sur « N vérifications justes, K fausses » et sort en 1 si K > 0.

import fs from "node:fs";
import path from "node:path";
import { RACINE, creerVerif, controlesCommuns, lireFeuille } from "./verifier-exercices-commun.mjs";

export function demarrer(fichier, notionId) {
  const src = fs.readFileSync(path.resolve(RACINE, fichier), "utf8");
  const feuille = lireFeuille(src);
  let ok = 0;
  const ko = [];
  const proche = (a, b, eps = 1e-9) => Math.abs(a - b) < eps * Math.max(1, Math.abs(b));
  const verif = (nom, a, b, eps) =>
    (typeof a === "string" || typeof b === "string" ? a === b : proche(a, b, eps)) ? ok++ : ko.push(`${nom} : ${a} ≠ ${b}`);
  const vrai = (nom, c, detail = "") => (c ? ok++ : ko.push(`${nom} : faux${detail ? " — " + detail : ""}`));
  const somme = (t) => t.reduce((s, x) => s + x, 0);
  const moyenne = (t) => somme(t) / t.length;

  /** Fin d'un appel dont `debut` suit la parenthèse ouvrante. */
  const fermeture = (texte, debut) => {
    let prof = 1, j = debut, chaine = null;
    for (; j < texte.length && prof > 0; j++) {
      const c = texte[j];
      if (chaine) {
        if (c === "\\") j++;
        else if (c === chaine) chaine = null;
        continue;
      }
      if (c === '"' || c === "'" || c === "`") chaine = c;
      else if (c === "(") prof++;
      else if (c === ")") prof--;
    }
    return j - 1;
  };
  const evaluer = (t) => Function("ORANGE", "BLEU", "VERT", `return [${t}]`)("#ea580c", "#2563eb", "#16a34a");

  /** Tous les appels `nom(…)` d'un texte (les séries par défaut : pas les
   *  définitions ni les commentaires d'en-tête, où « `diagramme()` » se lit),
   *  arguments évalués. */
  function appels(nom, texte = feuille.series) {
    const res = [];
    const re = new RegExp(`(?<![\\w.])${nom}\\(`, "g");
    let m;
    while ((m = re.exec(texte))) {
      const debut = m.index + m[0].length;
      res.push(evaluer(texte.slice(debut, fermeture(texte, debut))));
    }
    return res;
  }

  /** Le bloc source de l'exercice k (1 à 20). */
  const bloc = (k) => feuille.blocs[k - 1] ?? "";
  const e = (k) => feuille.enonces[k - 1] ?? "";
  const c = (k) => feuille.corrections[k - 1] ?? "";
  /** Le corrigé k écrit-il chacun de ces morceaux ? */
  const dit = (k, ...morceaux) => morceaux.forEach((m) => vrai(`E${k} écrit « ${m} »`, c(k).includes(m), "absent du corrigé"));

  /** L'expression qui suit `cle:` dans un bloc (jusqu'à la virgule de premier niveau). */
  function expression(b, cle) {
    const i = b.search(new RegExp(`\\b${cle}:\\s`));
    if (i < 0) return null;
    let j = b.indexOf(":", i) + 1, prof = 0, chaine = null;
    const debut = j;
    for (; j < b.length; j++) {
      const ch = b[j];
      if (chaine) {
        if (ch === "\\") j++;
        else if (ch === chaine) chaine = null;
        continue;
      }
      if (ch === '"') chaine = ch;
      else if ("([{".includes(ch)) prof++;
      else if (")]}".includes(ch)) {
        if (prof === 0) break;
        prof--;
      } else if (ch === "," && prof === 0) break;
    }
    return b.slice(debut, j).trim();
  }

  /** Un tableau `tableauProba` relu : { entetes, lignes, n(i, j) } (n = nombre, NaN si « ? »). */
  const tableauxDe = (k) =>
    appels("tableauProba", bloc(k)).map(([entetes, lignes]) => ({
      entetes,
      lignes,
      n: (i, j) => Number(String(lignes[i][j]).replace(/\s/g, "").replace(",", ".")),
    }));

  /** Un tableau croisé COMPLET : chaque ligne somme à sa marge, la dernière ligne aux colonnes. */
  function tableauJuste(nom, t) {
    const L = t.lignes.length, C = t.entetes.length;
    for (let i = 0; i < L; i++) verif(`${nom} ligne « ${t.lignes[i][0]} »`, somme([...Array(C - 2)].map((_, j) => t.n(i, j + 1))), t.n(i, C - 1));
    for (let j = 1; j < C; j++) verif(`${nom} colonne « ${t.entetes[j]} »`, somme([...Array(L - 1)].map((_, i) => t.n(i, j))), t.n(L - 1, j));
  }

  /* ─────────── règles de rendu, sur toute la feuille ─────────── */
  function reglesDeRendu({ imprimesMin = 10, imprimesMax = 14 } = {}) {
    for (const [entete, ligne] of appels("tableau")) vrai(`tableau « ${entete[0]} » : en-tête et ligne de même longueur`, entete.length === ligne.length);
    for (const [entetes, lignes] of appels("tableauProba"))
      lignes.forEach((l, i) => vrai(`tableauProba « ${entetes[1]} » ligne ${i + 1} : autant de cases que d'en-têtes`, l.length === entetes.length));
    for (const [t, data] of appels("diagramme")) {
      vrai(`diagramme ${t} : valeurs positives`, data.every((x) => typeof x.value === "number" && x.value >= 0));
      // ⛔ Le canvas écrit `{d.value}` tel quel : 62.5 s'afficherait avec un POINT.
      vrai(`diagramme ${t} : valeurs entières (le canvas écrirait « 62.5 »)`, data.every((x) => Number.isInteger(x.value)));
      if (data.length >= 4) for (const x of data) vrai(`diagramme ${t} : libellé court « ${x.label} »`, [...x.label].length <= 9);
    }
    for (const [groupes, series] of appels("barresCroisees")) {
      const nbBarres = groupes.length * series.length;
      series.forEach((s) => vrai(`barres « ${s.nom} » : une valeur par groupe`, s.valeurs.length === groupes.length));
      if (nbBarres >= 4 || groupes.length >= 4) for (const g of groupes) vrai(`barres : libellé court « ${g} »`, [...g].length <= 9);
      for (const s of series) vrai(`barres : légende courte « ${s.nom} »`, [...s.nom].length <= 9);
    }
    for (const [parts] of appels("demiCercle")) {
      vrai("demi-cercle : 4 parts au plus", parts.length <= 4);
      for (const p of parts) vrai(`demi-cercle : libellé court « ${p.label} »`, [...p.label].length <= 12);
    }
    // Le repère : cadre, taille, étiquettes.
    for (const args of appels("repere")) {
      const [[xmin, xmax, ymin, ymax], courbes, marques = [], , grand = false] = args;
      const nom = `repère [${xmin}, ${xmax}, ${ymin}, ${ymax}]`;
      vrai(`${nom} : ymin < 0`, ymin < 0);
      const [lx, ly] = [xmax - xmin, ymax - ymin];
      vrai(`${nom} : 15 unités au plus par axe`, lx <= 15 && ly <= 15);
      if (lx > 10 || ly > 10) vrai(`${nom} : plus de 10 unités, donc grand = true`, grand === true);
      for (const p of marques) {
        vrai(`${nom} : (${p.x} ; ${p.y}) dans le cadre`, p.x > xmin && p.x < xmax && p.y > ymin && p.y < ymax);
        if (p.label) {
          vrai(`${nom} : étiquette « ${p.label} » courte`, [...p.label].length <= 2);
          vrai(`${nom} : « ${p.label} » loin des graduations des axes`, Math.abs(p.x) >= 1 && Math.abs(p.y) >= 1);
          vrai(`${nom} : « ${p.label} » loin du bord du haut`, ymax - p.y >= 1);
          const voisins = marques.filter((q) => q !== p && Math.hypot(q.x - p.x, q.y - p.y) < 1);
          vrai(`${nom} : « ${p.label} » ne touche aucun autre point`, voisins.length === 0);
        }
      }
      for (const cb of courbes) vrai(`${nom} : courbe écrite en clair`, !!(cb.q || cb.p || cb.pts));
    }
    // Texte NU dans les SVG, vrai signe moins.
    for (const m of src.matchAll(/label: "([^"]*)"|nom: "([^"]*)"/g)) {
      const t = m[1] ?? m[2];
      vrai(`étiquette SVG sans $ « ${t} »`, !t.includes("$"));
      vrai(`étiquette SVG au vrai signe moins « ${t} »`, !/(^|\s)-\d/.test(t));
    }
    for (const [groupes] of appels("barresCroisees")) for (const g of groupes) vrai(`groupe sans $ « ${g} »`, !g.includes("$"));
    // Dessins imprimés / écran seulement ; jamais le même dessin deux fois.
    let imprimes = 0, ecran = 0;
    feuille.blocs.forEach((b, i) => {
      const f = expression(b, "figure");
      const s = expression(b, "schema");
      for (const x of [f, s]) if (x) x.startsWith("ecranSeulement(") ? ecran++ : imprimes++;
      if (f && s) {
        const nu = (x) => x.replace(/^ecranSeulement\(/, "").replace(/\s+/g, "").replace(/,?\)$/, "");
        vrai(`E${i + 1} : pas le même dessin dans l'énoncé et le corrigé`, nu(f) !== nu(s));
      }
    });
    vrai(`${imprimes} dessins imprimés (${imprimesMin} à ${imprimesMax})`, imprimes >= imprimesMin && imprimes <= imprimesMax);
    console.log(`Dessins : ${imprimes} imprimés, ${ecran} à l'écran seulement.`);
  }

  /** Contrôles communs (20, 8 + 8 + 4, dollars, LaTeX, micros) + fin du script. */
  function finir() {
    const v = creerVerif(false);
    const avant = [];
    const vv = { ...v, ok: (nom, cond, detail) => (cond ? ok++ : avant.push(`${nom}${detail ? " — " + detail : ""}`)) };
    controlesCommuns(vv, src, { notionId, classe: "premiere" });
    ko.push(...avant);
    const nbEx = (src.match(/correction:/g) || []).length;
    nbEx === 20 ? ok++ : ko.push(`${nbEx} « correction: » au lieu de 20`);
    console.log(`${ok} vérifications justes, ${ko.length} fausses`);
    ko.forEach((k) => console.log("  ✗", k));
    process.exit(ko.length ? 1 : 0);
  }

  /** Le nombre tel que la feuille l'écrit : `1\,200`, `0{,}75`. */
  const ecrit = (x) => {
    const [ent, dec] = String(x).split(".");
    return ent.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") + (dec ? `{,}${dec}` : "");
  };
  /** La fréquence a/b, recalculée, et écrite dans le corrigé k sous la forme
   *  « \dfrac{a}{b} = v » (exacte) ou « \dfrac{a}{b} \approx v » (arrondie au centième). */
  function frequence(k, a, b, v) {
    const vraie = a / b;
    const exacte = Math.abs(vraie - v) < 1e-12;
    const arrondie = Math.abs(Math.round(vraie * 100) / 100 - v) < 1e-12;
    vrai(`E${k} ${a}/${b} ${exacte ? "=" : "≈"} ${v}`, exacte || arrondie, `vaut ${vraie}`);
    const texte = `\\dfrac{${ecrit(a)}}{${ecrit(b)}} ${exacte ? "=" : "\\approx"} ${ecrit(v)}`;
    vrai(`E${k} écrit « ${texte} »`, c(k).includes(texte), "absent du corrigé");
  }

  return { src, feuille, appels, bloc, e, c, dit, verif, vrai, somme, moyenne, tableauxDe, tableauJuste, reglesDeRendu, finir, frequence, ecrit };
}
