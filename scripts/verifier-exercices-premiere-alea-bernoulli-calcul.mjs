// Recalcul indépendant de la feuille « Répétition d'épreuves : calculer »
// (1re, 28/09/2026) : lib/fiches-exercices/maths-premiere-alea-bernoulli-calcul.tsx.
// Chaque arbre de répétition est RELU dans le source et contrôlé comme une
// répétition : à chaque nœud, les deux mêmes branches (succès p, échec 1 − p) ;
// chaque feuille nommée par son chemin (SSE…) ; chaque « → q » égal au produit
// du chemin. Les chemins en ROUGE (`vu: true`) doivent être EXACTEMENT ceux que
// le corrigé additionne (le script les retrouve par une règle : « deux S »,
// « au moins deux D »…), avec tous leurs nœuds. Les probabilités annoncées
// sont refaites en énumérant les 2ⁿ issues, sans formule.
// Usage : node scripts/verifier-exercices-premiere-alea-bernoulli-calcul.mjs

import { creer } from "./verifier-exercices-premiere-alea-outils.mjs";

const { verif, vrai, dit, arbresDe, diagrammes, appels, nombre, fin } = creer("lib/fiches-exercices/maths-premiere-alea-bernoulli-calcul.tsx", "alea_bernoulli_calcul");

/** Probabilité, par ÉNUMÉRATION des 2ⁿ issues, que le mot vérifie `regle`. */
const enumere = (n, p, S, E, regle) => {
  let total = 0;
  for (let m = 0; m < 2 ** n; m++) {
    const mot = Array.from({ length: n }, (_, i) => ((m >> (n - 1 - i)) & 1 ? E : S)).join("");
    if (regle(mot)) total += [...mot].reduce((q, c) => q * (c === S ? p : 1 - p), 1);
  }
  return total;
};
const compte = (mot, c) => [...mot].filter((x) => x === c).length;

/** L'arbre est-il celui d'une répétition de paramètre p ? Les rouges sont-ils les chemins de `regle` ? */
const repetition = (k, role, n, p, S, E, regle) => {
  const r = arbresDe(k)[role];
  vrai(`${k}. arbre (${role}) présent`, !!r);
  const fautes = [];
  const feuilles = [];
  const parcours = (noeuds, mot, q, anc) => {
    if (noeuds.length !== 2) fautes.push(`${mot} : ${noeuds.length} branches`);
    const [a, b] = noeuds;
    if (a.label[mot.length] !== S && a.label[0] !== S) fautes.push(`${mot} : 1re branche ${a.label}`);
    if (nombre(a.proba) !== p || Math.abs(nombre(b.proba) - (1 - p)) > 1e-12) fautes.push(`${mot} : ${a.proba} / ${b.proba}`);
    for (const [x, c] of [[a, S], [b, E]]) {
      const m = mot + c, qq = q * (c === S ? p : 1 - p);
      if (x.enfants) parcours(x.enfants, m, qq, [...anc, x]);
      else {
        const nom = x.label.split(" →")[0];
        if (nom.length === n && nom !== m) fautes.push(`feuille ${nom} au bout du chemin ${m}`);
        const fl = x.label.split("→ ")[1];
        if (fl !== undefined && Math.abs(nombre(fl) - qq) > 1e-12) fautes.push(`${m} : → ${fl} au lieu de ${qq}`);
        feuilles.push({ mot: m, vu: !!x.vu, anc: [...anc, x] });
      }
    }
  };
  parcours(r, "", 1, []);
  vrai(`${k}. ${2 ** n} chemins`, feuilles.length === 2 ** n && feuilles.every((f) => f.mot.length === n));
  vrai(`${k}. répétition de paramètre ${p} ${fautes.slice(0, 2).join(" ; ")}`, fautes.length === 0);
  if (regle) {
    const faux = feuilles.filter((f) => f.vu !== regle(f.mot)).map((f) => f.mot);
    vrai(`${k}. chemins rouges = chemins comptés ${faux.join(",")}`, faux.length === 0);
    const orphelins = feuilles.filter((f) => f.vu && f.anc.some((x) => !x.vu)).map((f) => f.mot);
    vrai(`${k}. chaque chemin rouge l'est jusqu'au départ ${orphelins.join(",")}`, orphelins.length === 0);
    const tousVus = [];
    const collecte = (noeuds) => noeuds.forEach((x) => { if (x.vu) tousVus.push(x); if (x.enfants) collecte(x.enfants); });
    collecte(r);
    const utiles = new Set(feuilles.filter((f) => f.vu).flatMap((f) => f.anc));
    vrai(`${k}. aucun nœud rouge hors des chemins comptés`, tousVus.every((x) => utiles.has(x)));
  } else vrai(`${k}. aucun chemin rouge dans l'énoncé`, feuilles.every((f) => !f.vu));
};

/* ═══ ★ ═══ */
repetition(1, "schema", 2, 0.3, "S", "E");
verif("2 SS", enumere(2, 0.3, "S", "E", (m) => m === "SS"), 0.09);
verif("2 EE", enumere(2, 0.3, "S", "E", (m) => m === "EE"), 0.49);
repetition(3, "schema", 2, 0.3, "S", "E");
verif("3 exactement un", enumere(2, 0.3, "S", "E", (m) => compte(m, "S") === 1), 0.42);
verif("3 somme", 0.49 + 0.42 + 0.09, 1);
verif("4", 1 - enumere(2, 0.3, "S", "E", (m) => compte(m, "S") === 0), 0.51);
repetition(5, "schema", 3, 0.5, "S", "E", (m) => compte(m, "S") === 2);
verif("5 exactement deux pile", enumere(3, 0.5, "S", "E", (m) => compte(m, "S") === 2), 0.375);
verif("6 SSS", enumere(3, 0.4, "S", "E", (m) => m === "SSS"), 0.064);
verif("6 EEE", enumere(3, 0.4, "S", "E", (m) => m === "EEE"), 0.216);
{
  const q = 1 - enumere(3, 1 / 6, "S", "E", (m) => m === "EEE");
  verif("7", q, 91 / 216);
  vrai("7 ≈ 0,42", Math.round(100 * q) === 42);
}
repetition(8, "schema", 3, 0.4, "S", "E", (m) => compte(m, "S") === 2);
verif("8", enumere(3, 0.4, "S", "E", (m) => compte(m, "S") === 2), 0.288);

/* ═══ ★★ ═══ */
repetition(9, "figure", 3, 0.8, "S", "E");
verif("9 a", enumere(3, 0.8, "S", "E", (m) => m === "SSS"), 0.512);
verif("9 b", enumere(3, 0.8, "S", "E", (m) => compte(m, "S") === 2), 0.384);
verif("9 c", enumere(3, 0.8, "S", "E", (m) => compte(m, "S") >= 1), 0.992);
repetition(10, "schema", 3, 0.9, "J", "F", (m) => compte(m, "F") <= 1);
verif("10 b", enumere(3, 0.9, "J", "F", (m) => compte(m, "F") <= 1), 0.972);
verif("11 a", enumere(4, 0.4, "S", "E", (m) => compte(m, "S") === 0), 0.1296);
verif("11 b", enumere(4, 0.4, "S", "E", (m) => compte(m, "S") >= 1), 0.8704);
verif("11 c", enumere(4, 0.4, "S", "E", (m) => m === "SSSS"), 0.0256);
verif("12 a", enumere(3, 0.8, "S", "E", (m) => compte(m, "S") === 0), 0.008);
verif("12 b", enumere(3, 0.8, "S", "E", (m) => compte(m, "S") >= 1), 0.992);
verif("12 c", enumere(3, 0.8, "S", "E", (m) => compte(m, "S") === 1), 0.096);
repetition(13, "schema", 3, 0.2, "S", "E", (m) => compte(m, "S") === 1);
verif("13 b", enumere(3, 0.2, "S", "E", (m) => compte(m, "S") === 1), 0.384);
verif("13 c", enumere(3, 0.2, "S", "E", (m) => compte(m, "S") >= 1), 0.488);
{
  const d = diagrammes[0].data;
  [1, 2, 3, 4].forEach((n, i) => {
    const q = enumere(n, 0.1, "S", "E", (m) => compte(m, "S") >= 1);
    verif(`14 diagramme n = ${n}`, d[i].value, Math.round(100 * q));
    vrai(`14 étiquette n = ${n}`, d[i].label === `n = ${n}`);
  });
  verif("14 a", enumere(4, 0.1, "S", "E", (m) => compte(m, "S") >= 1), 0.3439);
}
repetition(15, "schema", 3, 0.9, "M", "G", (m) => m === "MMM");
verif("15 a", enumere(3, 0.9, "M", "G", (m) => m === "MMM"), 0.729);
verif("15 b", enumere(3, 0.9, "M", "G", (m) => compte(m, "G") === 1), 0.243);
verif("16 a", enumere(4, 0.25, "S", "E", (m) => m === "SSSS"), 0.00390625);
verif("16 b", enumere(4, 0.25, "S", "E", (m) => m === "EEEE"), 0.31640625);
verif("16 c", enumere(4, 0.25, "S", "E", (m) => compte(m, "S") >= 1), 0.68359375);

/* ═══ ★★★ ═══ */
repetition(17, "schema", 3, 0.2, "D", "B", (m) => compte(m, "D") >= 2);
verif("17 b aucune", enumere(3, 0.2, "D", "B", (m) => compte(m, "D") === 0), 0.512);
verif("17 b au moins une", enumere(3, 0.2, "D", "B", (m) => compte(m, "D") >= 1), 0.488);
verif("17 c", enumere(3, 0.2, "D", "B", (m) => compte(m, "D") >= 2), 0.104);
{
  const [entete, ligne] = appels("tableau").map((a) => a.args).find(([e]) => e[0] === "relais");
  [1, 2, 3, 4].forEach((n, i) => {
    vrai(`18 entête ${n}`, entete[i + 1] === String(n));
    verif(`18 b n = ${n}`, nombre(ligne[i + 1]), enumere(n, 0.8, "S", "E", (m) => compte(m, "S") >= 1));
  });
  vrai("18 c : 3 relais", enumere(2, 0.8, "S", "E", (m) => m !== "EE") < 0.99 && enumere(3, 0.8, "S", "E", (m) => m !== "EEE") >= 0.99);
}
repetition(19, "schema", 3, 0.95, "M", "P", (m) => compte(m, "M") >= 2);
verif("19 b", enumere(3, 0.95, "M", "P", (m) => m === "MMM"), 0.857375);
{
  const c = enumere(3, 0.95, "M", "P", (m) => compte(m, "M") >= 2);
  verif("19 c", c, 0.99275);
  vrai("19 c ≈ 0,993", Math.round(1000 * c) === 993);
  const d = 1 - enumere(3, 0.95, "M", "P", (m) => m === "MMM");
  verif("19 d", d, 0.142625);
  vrai("19 d ≈ 0,143", Math.round(1000 * d) === 143);
}
repetition(20, "figure", 3, 0.6, "G", "P");
repetition(20, "schema", 3, 0.6, "G", "P", (m) => compte(m, "G") >= 2);
verif("20 b", enumere(3, 0.6, "G", "P", (m) => compte(m, "G") >= 2), 0.648);
verif("20 c", enumere(3, 0.6, "G", "P", (m) => m.startsWith("GG")), 0.36);
dit(20, "= 0{,}648$");

fin();
