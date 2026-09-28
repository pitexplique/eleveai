// Outils communs aux sept scripts de recalcul du chapitre « Phénomènes
// aléatoires » de première (BOP1AL), 28/09/2026 :
// alea-conditionnelle, alea-conditionnelle-calcul, alea-arbre, alea-arbre-calcul,
// alea-independance, alea-bernoulli, alea-bernoulli-calcul.
//
// ⭐ Les DESSINS sont relus dans le source, jamais recopiés : chaque appel
// `tableauProba(…)`, `arbre(…)`, `arbreRepete(…)`, `diagramme(…)`, `roue(…)`,
// `billes(…)`, `repere(…)`, `tableau(…)` est évalué tel qu'il est écrit.
// Tableaux croisés : totaux de lignes et de colonnes refaits. Arbres : somme des
// branches égale à 1 à chaque nœud, et chaque étiquette « → p » égale au
// produit du chemin.
//
// ⭐ Les contrôles de TEXTE (8 + 8 + 4, dollars, LaTeX hors formule, micros de la
// notion toutes couvertes et aucune d'ailleurs) sont ceux de
// `verifier-exercices-commun.mjs` (`controlesCommuns`), classe « premiere ».
//
// ⭐ Les RÈGLES DE RENDU du 28/09 (mesurées à 375 px) : libellés de barres ≤ 9
// signes dès 4 barres, repères (ymin < 0, `grand` au-delà de 10 unités, jamais
// plus de 15), pas de `$` ni de tiret « - » en guise de moins dans une
// étiquette SVG, `tableau` d'entête et de ligne de même longueur, 10 à 14
// dessins imprimés, jamais le même dessin dans l'énoncé et le corrigé.

import fs from "node:fs";
import path from "node:path";
import { RACINE, controlesCommuns, lireFeuille } from "./verifier-exercices-commun.mjs";

export function creer(fichier, notionId) {
  const src = fs.readFileSync(path.join(RACINE, fichier), "utf8");
  let ok = 0;
  const ko = [];
  const proche = (a, b, eps = 1e-9) => Math.abs(a - b) < eps * Math.max(1, Math.abs(b));
  const verif = (nom, a, b, eps) => (proche(a, b, eps) ? ok++ : ko.push(`${nom} : ${a} ≠ ${b}`));
  const vrai = (nom, c) => (c ? ok++ : ko.push(`${nom} : faux`));
  const somme = (t) => t.reduce((s, x) => s + x, 0);
  // « 0,25 », « −3 », et les fractions « 29/99 » des tirages sans remise.
  const nombre = (s) => {
    const t = String(s).replace(/\s/g, "").replace(",", ".").replace("−", "-");
    const f = /^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/.exec(t);
    return f ? Number(f[1]) / Number(f[2]) : Number(t);
  };
  const feuille = lireFeuille(src);
  const c = (k) => feuille.corrections[k - 1] ?? "";
  const e = (k) => feuille.enonces[k - 1] ?? "";
  /** Le corrigé k écrit-il bien ce morceau ? */
  const dit = (k, morceau) => vrai(`${k}. le corrigé écrit « ${morceau} »`, c(k).includes(morceau));
  const enonceDit = (k, morceau) => vrai(`${k}. l'énoncé écrit « ${morceau} »`, e(k).includes(morceau));

  /** Les appels `nom(…)` d'un texte, arguments évalués. */
  function appels(nom, texte = src) {
    const res = [];
    const re = new RegExp(`(?<![\\w.])${nom}\\(`, "g");
    let m;
    while ((m = re.exec(texte))) {
      const debut = m.index + m[0].length;
      let prof = 1, j = debut, chaine = null;
      for (; j < texte.length && prof > 0; j++) {
        const ch = texte[j];
        if (chaine) {
          if (ch === "\\") j++;
          else if (ch === chaine) chaine = null;
          continue;
        }
        if (ch === '"' || ch === "'" || ch === "`") chaine = ch;
        else if (ch === "(") prof++;
        else if (ch === ")") prof--;
      }
      if (texte.slice(m.index - 9, m.index) === "function ") continue;
      const corps = texte.slice(debut, j - 1);
      if (!corps.trim()) continue; // « `arbre()` » cité dans un commentaire
      try {
        res.push({ args: Function("ORANGE", "BLEU", `return [${corps}]`)("#ea580c", "#2563eb"), texte: corps, index: m.index });
      } catch {
        /* la définition d'une aide, pas un appel */
      }
    }
    return res;
  }

  /* ═══ tableaux croisés : totaux refaits ═══ */
  const tableaux = appels("tableauProba").map(({ args: [entetes, lignes, surl = []] }) => ({ entetes, lignes, surl }));
  tableaux.forEach(({ entetes, lignes, surl }, k) => {
    const nom = `tableau ${k + 1} (${lignes[0][0]})`;
    vrai(`${nom} : largeur`, lignes.every((l) => l.length === entetes.length));
    vrai(`${nom} : cases surlignées dans le tableau`, surl.every(([i, j]) => i < lignes.length && j >= 1 && j < entetes.length));
    vrai(`${nom} : en-têtes courts (≤ 12 signes)`, entetes.every((x) => x.length <= 12));
    if (entetes[entetes.length - 1] !== "Total") return;
    const v = lignes.map((l) => l.slice(1).map(nombre));
    for (const l of v) verif(`${nom} : total de ligne`, somme(l.slice(0, -1)), l[l.length - 1], 1e-9);
    if (lignes[lignes.length - 1][0] === "Total")
      for (let j = 0; j < v[0].length; j++) verif(`${nom} : total de colonne ${j}`, somme(v.slice(0, -1).map((l) => l[j])), v[v.length - 1][j], 1e-9);
  });
  /** Le tableau qui a une ligne `ligne` et une colonne `colonne`. */
  const T = (ligne, colonne) => {
    const t = tableaux.find(({ entetes, lignes }) => lignes.some((l) => l[0] === ligne) && entetes.includes(colonne));
    if (!t) throw new Error(`tableau ${ligne} × ${colonne} introuvable`);
    const cse = (l, col) => nombre(t.lignes.find((x) => x[0] === l)[t.entetes.indexOf(col)]);
    return { c: cse, total: cse("Total", "Total"), ligne: (l) => cse(l, "Total"), col: (col) => cse("Total", col), t };
  };

  /** Le tableau croisé de l'exercice k (le premier de son bloc). */
  const Tk = (k) => {
    const a = appels("tableauProba", feuille.blocs[k - 1] ?? "")[0];
    if (!a) throw new Error(`exercice ${k} : pas de tableau croisé`);
    const [entetes, lignes] = a.args;
    const t = { entetes, lignes };
    const cse = (l, col) => nombre(t.lignes.find((x) => x[0] === l)[t.entetes.indexOf(col)]);
    return { c: cse, total: cse("Total", "Total"), ligne: (l) => cse(l, "Total"), col: (col) => cse("Total", col), t };
  };

  /* ═══ arbres : nœuds de somme 1, chemins ═══ */
  const arbres = [...appels("arbre"), ...appels("arbreRepete")].map(({ args: [r] }) => r);
  for (const [k, racine] of arbres.entries()) {
    const noeud = (enfants, p, chemin) => {
      // Un arbre À COMPLÉTER porte des « ? » : sa somme se vérifie sur l'arbre
      // complété du corrigé ; ici on vérifie qu'il reste bien une inconnue.
      const inconnues = enfants.filter((n) => n.proba === "?").length;
      if (inconnues) vrai(`arbre ${k + 1} ${chemin} : « ? » seuls inconnus`, enfants.every((n) => n.proba === "?" || !Number.isNaN(nombre(n.proba))));
      else verif(`arbre ${k + 1} ${chemin} : somme des branches`, somme(enfants.map((n) => nombre(n.proba))), 1);
      for (const n of enfants) {
        const q = p * nombre(n.proba);
        const fleche = n.label.split("→ ")[1];
        if (fleche) verif(`arbre ${k + 1} chemin ${chemin}/${n.label}`, q, nombre(fleche));
        vrai(`arbre ${k + 1} : étiquette sans $ (${n.label})`, !n.label.includes("$") && !n.proba.includes("$"));
        if (n.enfants) noeud(n.enfants, q, `${chemin}/${n.label}`);
      }
    };
    noeud(racine, 1, "racine");
  }
  /** La probabilité portée par la branche `chemin` (liste d'étiquettes) de l'arbre dont la 1re branche s'appelle `premiere`. */
  const branche = (premiere, ...chemin) => {
    const r = arbres.find((x) => x[0].label === premiere || x[0].label.startsWith(`${premiere} →`));
    if (!r) throw new Error(`arbre ${premiere} introuvable`);
    let niveau = r, n;
    for (const l of chemin) {
      n = niveau.find((x) => x.label === l || x.label.startsWith(`${l} →`));
      if (!n) throw new Error(`branche ${chemin.join("/")} introuvable`);
      niveau = n.enfants ?? [];
    }
    return nombre(n.proba);
  };
  /** Les arbres de l'exercice k : { figure, schema } (racines relues). */
  const arbresDe = (k) => {
    const bloc = feuille.blocs[k - 1] ?? "";
    const res = {};
    for (const nom of ["arbre", "arbreRepete"])
      for (const { args, index } of appels(nom, bloc)) {
        const avant = bloc.slice(0, index);
        res[avant.lastIndexOf("figure:") > avant.lastIndexOf("schema:") ? "figure" : "schema"] = args[0];
      }
    return res;
  };
  /** La probabilité d'une branche d'un arbre relu, par son chemin d'étiquettes. */
  const lit = (racine, ...labels) => {
    let niveau = racine, n;
    for (const l of labels) {
      n = niveau.find((x) => x.label === l || x.label.startsWith(`${l} →`));
      if (!n) throw new Error(`branche ${labels.join("/")} introuvable`);
      niveau = n.enfants ?? [];
    }
    return n.proba === "?" ? NaN : nombre(n.proba);
  };
  /** L'arbre complété garde-t-il tous les nombres connus de l'arbre à compléter ? */
  const memeArbre = (k) => {
    const { figure, schema } = arbresDe(k);
    const fautes = [];
    const compare = (f, s, chemin) => {
      vrai(`${k}. même forme (${chemin})`, f.length === s.length);
      f.forEach((n, i) => {
        const m = s[i];
        if (!m || m.label.split(" →")[0] !== n.label.split(" →")[0]) fautes.push(`${chemin}/${n.label}`);
        else if (n.proba !== "?" && nombre(n.proba) !== nombre(m.proba)) fautes.push(`${chemin}/${n.label} : ${n.proba} ≠ ${m.proba}`);
        if (n.enfants && m) compare(n.enfants, m.enfants ?? [], `${chemin}/${n.label}`);
      });
    };
    compare(figure, schema, "racine");
    vrai(`${k}. l'arbre complété garde les nombres de l'énoncé ${fautes.join(" ; ")}`, fautes.length === 0);
    return schema;
  };
  /** Produit le long d'un chemin. */
  const chemin = (premiere, ...labels) => labels.reduce((p, _, i) => p * branche(premiere, ...labels.slice(0, i + 1)), 1);

  /* ═══ diagrammes, roues, billes ═══ */
  const diagrammes = appels("diagramme").map(({ args: [type, data, surl] }) => ({ type, data, surl }));
  const roues = appels("roue").map(({ args: [s] }) => s);
  const billesLues = appels("billes").map(({ args: [s] }) => s);

  function fin() {
    /* ═══ règles de rendu ═══ */
    for (const d of diagrammes) {
      if (d.data.length >= 4) for (const x of d.data) vrai(`barres : « ${x.label} » ≤ 9 signes`, x.label.length <= 9);
      for (const x of d.data) vrai(`diagramme : étiquette sans $ (${x.label})`, !x.label.includes("$"));
    }
    for (const { args: [cadre, , marques = [], , grand] } of appels("repere")) {
      const [xmin, xmax, ymin, ymax] = cadre;
      vrai(`repère ${cadre} : ymin < 0`, ymin < 0);
      const large = Math.max(xmax - xmin, ymax - ymin);
      vrai(`repère ${cadre} : grand au-delà de 10 unités`, large <= 10 || grand === true);
      vrai(`repère ${cadre} : 15 unités au plus`, large <= 15);
      for (const p of marques) vrai(`repère : étiquette nue « ${p.label} »`, !String(p.label ?? "").includes("$"));
    }
    for (const { args: [entete, ligne] } of appels("tableau")) vrai(`tableau(${entete[0]}) : entête et ligne de même longueur`, entete.length === ligne.length);
    for (const m of src.matchAll(/(?:label|proba): "([^"]*)"/g)) {
      vrai(`étiquette SVG sans $ : ${m[1]}`, !m[1].includes("$"));
      vrai(`étiquette SVG : vrai signe moins (${m[1]})`, !/(^|[\s(])-\d/.test(m[1]));
    }

    /* ═══ dessins imprimés / écran seulement ═══ */
    let imprimes = 0, ecran = 0;
    feuille.blocs.forEach((bloc, i) => {
      const valeurs = {};
      for (const cle of ["figure", "schema"]) {
        const m = new RegExp(`\\b${cle}:\\s*`).exec(bloc);
        if (!m) continue;
        const reste = bloc.slice(m.index + m[0].length);
        const fin = reste.search(/,\n\s+(micros|correction|schema|figure):/);
        valeurs[cle] = reste.slice(0, fin < 0 ? undefined : fin).trim();
        if (valeurs[cle].startsWith("ecranSeulement(")) ecran++;
        else imprimes++;
      }
      if (valeurs.figure && valeurs.schema) {
        const nu = (t) => t.replace(/^ecranSeulement\(/, "").replace(/\)$/, "").replace(/\s+/g, "");
        vrai(`${i + 1}. pas le même dessin dans l'énoncé et le corrigé`, nu(valeurs.figure) !== nu(valeurs.schema));
      }
    });
    vrai(`10 à 14 dessins imprimés (${imprimes})`, imprimes >= 10 && imprimes <= 14);

    /* ═══ contrôles de texte communs ═══ */
    const v = { ok: (nom, cond, detail = "") => (cond ? ok++ : ko.push(`${nom}${detail ? " — " + detail : ""}`)), titre() {} };
    controlesCommuns(v, src, { notionId, classe: "premiere" });
    const nbEx = (src.match(/correction:/g) || []).length;
    vrai(`exactement 20 « correction: » (${nbEx})`, nbEx === 20);

    console.log(`${fichier}`);
    console.log(`dessins : ${imprimes} imprimés, ${ecran} à l'écran seulement`);
    console.log(`${ok} vérifications justes, ${ko.length} fausses`);
    ko.forEach((k) => console.log("  ✗", k));
    process.exit(ko.length ? 1 : 0);
  }

  return { src, verif, vrai, dit, enonceDit, T, Tk, branche, chemin, arbres, arbresDe, lit, memeArbre, nombre, diagrammes, roues, billes: billesLues, tableaux, appels, fin, c, e };
}
