// Recalcul indépendant de la feuille « Probabilités conditionnelles et
// indépendance » de 1re SPÉ (29/09/2026) :
// lib/fiches-exercices/maths-premiere-probabilites-conditionnelles.tsx.
//
// ⭐ Les DESSINS sont relus dans le source, jamais recopiés : chaque appel
// `arbre(…)`, `tableauProba(…)`, `venn(…)`, `trace(…)`, `roue(…)`,
// `diagramme(…)` est évalué tel qu'il est écrit. Arbres : somme 1 à chaque
// nœud, étiquette « → p » égale au produit du chemin, chemin orange CONTINU
// (une branche colorée part d'un nœud coloré), et la somme des chemins colorés
// égale à la réponse du corrigé. Tableaux : totaux refaits. Venn : zones de
// somme 1. Partition : recalculée face par face.
// ⭐ Chaque résultat est RECALCULÉ à partir des nombres de l'énoncé ou du dessin,
// puis cherché dans le corrigé sous la forme écrite (« \dfrac{0{,}2}{0{,}5} = 0{,}4 »).
// ⭐ Contrôles de texte communs (`controlesCommuns`, classe premiere-spe) et
// règles de rendu du 29/09 : chaque exercice a un dessin, 12 à 14 imprimés,
// aucune fin de ligne dans une chaîne, texte nu et vrai signe moins en SVG.
// Usage : node scripts/verifier-exercices-premiere-spe-probabilites-conditionnelles.mjs

import fs from "node:fs";
import path from "node:path";
import { RACINE, controlesCommuns, lireFeuille, tex, D } from "./verifier-exercices-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-premiere-probabilites-conditionnelles.tsx";
const NOTION = "probabilites_conditionnelles";
const DESSINS = ["arbre", "venn", "tableauProba", "trace", "roue", "diagramme"];

const src = fs.readFileSync(path.join(RACINE, FICHIER), "utf8");
let ok = 0;
const ko = [];
const vrai = (nom, cond) => (cond ? ok++ : ko.push(nom));
const proche = (a, b, eps = 1e-9) => Math.abs(a - b) < eps * Math.max(1, Math.abs(b));
const verif = (nom, a, b, eps) => (proche(a, b, eps) ? ok++ : ko.push(`${nom} : ${a} ≠ ${b}`));
const somme = (t) => t.reduce((s, x) => s + x, 0);
/** « 0,25 », « −3 », « 98802 », et les fractions « 1/3 ». */
const nombre = (s) => {
  const t = String(s).replace(/\s/g, "").replace(",", ".").replace("−", "-");
  const f = /^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/.exec(t);
  return f ? Number(f[1]) / Number(f[2]) : Number(t);
};
const feuille = lireFeuille(src);
const c = (k) => feuille.corrections[k - 1] ?? "";
const e = (k) => feuille.enonces[k - 1] ?? "";
const bloc = (k) => feuille.blocs[k - 1] ?? "";
/** Un décimal écrit comme dans la feuille : 0{,}045, 1\,194, -0{,}5. */
const t = (x) => tex(D(x.toFixed(10)));
/** Arrondi à `dec` décimales, écrit comme dans la feuille. */
const ta = (x, dec) => t(Math.round(x * 10 ** dec) / 10 ** dec);
const dit = (k, morceau) => vrai(`${k}. le corrigé écrit « ${morceau} »`, c(k).includes(morceau));
const enonceDit = (k, morceau) => vrai(`${k}. l'énoncé écrit « ${morceau} »`, e(k).includes(morceau));

/* ═══ lecture des appels de dessin ═══ */
const constantes = Object.fromEntries([...src.matchAll(/^const ([A-Z_]+) = "([^"]*)";/gm)].map((m) => [m[1], m[2]]));
function appels(nom, texte = src, brut = false) {
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
    if (texte.slice(Math.max(0, m.index - 9), m.index) === "function ") continue;
    const corps = texte.slice(debut, j - 1);
    if (!corps.trim()) continue;
    if (brut) {
      res.push({ index: m.index, fin: j });
      continue;
    }
    try {
      res.push({ args: Function(...Object.keys(constantes), `return [${corps}]`)(...Object.values(constantes)), index: m.index, fin: j });
    } catch {
      /* une définition d'aide, pas un appel */
    }
  }
  return res;
}
/** Le premier appel `nom(…)` de l'exercice k (ou le rôle voulu : figure / schema). */
const dessin = (nom, k, role) => {
  const b = bloc(k);
  const tous = appels(nom, b).map((a) => {
    const avant = b.slice(0, a.index);
    return { ...a, role: avant.lastIndexOf("figure:") > avant.lastIndexOf("schema:") ? "figure" : "schema" };
  });
  const a = role ? tous.find((x) => x.role === role) : tous[0];
  if (!a) throw new Error(`exercice ${k} : pas de ${nom}(${role ?? ""})`);
  return a.args;
};

/* ═══ arbres ═══ */
const arbreDe = (k, role) => dessin("arbre", k, role)[0];
const lit = (racine, ...labels) => {
  let niveau = racine, n;
  for (const l of labels) {
    n = niveau.find((x) => x.label === l || x.label.startsWith(`${l} →`));
    if (!n) throw new Error(`branche ${labels.join("/")} introuvable`);
    niveau = n.enfants ?? [];
  }
  return nombre(n.proba);
};
/** Somme des produits le long des chemins COLORÉS qui finissent sur une feuille colorée. */
const sommeChemins = (racine) => {
  let s = 0;
  const aller = (ns, p) => {
    for (const n of ns) {
      const q = p * nombre(n.proba);
      if (n.enfants?.length) aller(n.enfants, q);
      else if (n.chemin) s += q;
    }
  };
  aller(racine, 1);
  return s;
};
/** Derrière chaque nœud du premier niveau, les mêmes branches : l'indépendance dessinée. */
const branchesRepetees = (k, racine) => {
  const a = racine.map((n) => (n.enfants ?? []).map((x) => `${x.label.split(" →")[0]}:${x.proba}`).join("|"));
  vrai(`${k}. l'arbre répète les mêmes branches (épreuves indépendantes)`, a.every((x) => x === a[0]));
};
appels("arbre").forEach(({ args: [racine] }, i) => {
  const noeud = (enfants, p, chemin, parentColore) => {
    verif(`arbre ${i + 1} ${chemin} : somme des branches`, somme(enfants.map((n) => nombre(n.proba))), 1);
    for (const n of enfants) {
      const q = p * nombre(n.proba);
      const fleche = n.label.split("→ ")[1];
      if (fleche) verif(`arbre ${i + 1} ${chemin}/${n.label} : produit du chemin`, q, nombre(fleche));
      if (n.chemin) vrai(`arbre ${i + 1} ${chemin}/${n.label} : chemin orange continu`, parentColore);
      if (n.enfants) noeud(n.enfants, q, `${chemin}/${n.label}`, !!n.chemin);
    }
  };
  noeud(racine, 1, "racine", true);
});

/* ═══ tableaux croisés ═══ */
appels("tableauProba").forEach(({ args: [entetes, lignes, surl = []] }, i) => {
  const nom = `tableau croisé ${i + 1} (${lignes[0][0]})`;
  vrai(`${nom} : largeur`, lignes.every((l) => l.length === entetes.length));
  vrai(`${nom} : cases surlignées dans le tableau`, surl.every(([a, b]) => a < lignes.length && b >= 1 && b < entetes.length));
  vrai(`${nom} : en-têtes courts (≤ 12 signes)`, entetes.every((x) => x.length <= 12));
  if (entetes[entetes.length - 1] !== "Total") return;
  const v = lignes.map((l) => l.slice(1).map(nombre));
  for (const l of v) verif(`${nom} : total de ligne`, somme(l.slice(0, -1)), l[l.length - 1]);
  if (lignes[lignes.length - 1][0] === "Total")
    for (let j = 0; j < v[0].length; j++) verif(`${nom} : total de colonne ${j + 1}`, somme(v.slice(0, -1).map((l) => l[j])), v[v.length - 1][j]);
});
/** Le tableau croisé de l'exercice k : case, ligne, colonne, total. */
const Tk = (k, role) => {
  const [entetes, lignes] = dessin("tableauProba", k, role);
  const cse = (l, col) => nombre(lignes.find((x) => x[0] === l)[entetes.indexOf(col)]);
  return { c: cse, total: cse("Total", "Total"), ligne: (l) => cse(l, "Total"), col: (col) => cse("Total", col), entetes, lignes };
};

/* ═══ Venn pondérés ═══ */
const zonesVenn = (z) => ({ a: somme(z.aSeul.map(nombre)), ab: somme(z.commun.map(nombre)), b: somme(z.bSeul.map(nombre)), hors: somme((z.dehors ?? []).map(nombre)) });

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
{
  const z = zonesVenn(dessin("venn", 1)[0]);
  const [PA, PB, PAB] = [z.a + z.ab, z.ab + z.b, z.ab];
  verif("1. Venn : somme des zones", z.a + z.ab + z.b + z.hors, 1);
  enonceDit(1, `P(A) = ${t(PA)}`);
  enonceDit(1, `P(B) = ${t(PB)}`);
  enonceDit(1, `P(A \\cap B) = ${t(PAB)}`);
  dit(1, `\\dfrac{${t(PAB)}}{${t(PA)}} = ${t(PAB / PA)}`);
  dit(1, `\\dfrac{${t(PAB)}}{${t(PB)}} = ${t(PAB / PB)}`);
  dit(1, `$${Math.round((100 * PAB) / PA)}$ % du disque $A$`);
  dit(1, `$${Math.round((100 * PAB) / PB)}$ % du disque $B$`);
}
{
  const r = arbreDe(2);
  const [PI, PSI, PIS, PSsachantI] = [lit(r, "I"), lit(r, "I", "S"), 0.12, 0.4];
  verif("2. le chemin I → S vaut P(I ∩ S)", PI * PSI, PIS);
  enonceDit(2, `$${t(100 * PSI)}$ % des internes`);
  enonceDit(2, `$${t(100 * PIS)}$ % des élèves`);
  enonceDit(2, `$${t(100 * PSsachantI)}$ % sont internes`);
  dit(2, `P_I(S) = ${t(PSI)}`);
  dit(2, `P(I \\cap S) = ${t(PIS)}`);
  dit(2, `P_S(I) = ${t(PSsachantI)}`);
  dit(2, `P(I) = \\dfrac{${t(PIS)}}{${t(PSI)}} = ${t(PIS / PSI)}`);
  verif("2. P(I) de l'arbre", PIS / PSI, PI);
  dit(2, `P(S) = \\dfrac{${t(PIS)}}{${t(PSsachantI)}} = ${t(PIS / PSsachantI)}`);
}
{
  const T = Tk(3, "figure");
  const S = Tk(3, "schema");
  vrai("3. le tableau du corrigé garde les nombres de l'énoncé", JSON.stringify(T.lignes) === JSON.stringify(S.lignes));
  enonceDit(3, `$${T.total}$ oiseaux`);
  const a = T.c("Mésanges", "Recapturés");
  dit(3, `\\dfrac{${a}}{${T.ligne("Mésanges")}} = ${t(a / T.ligne("Mésanges"))}`);
  dit(3, `\\dfrac{${a}}{${T.col("Recapturés")}} = ${t(a / T.col("Recapturés"))}`);
  dit(3, `\\dfrac{${a}}{${T.total}} = ${t(a / T.total)}`);
}
{
  const r = arbreDe(4);
  const [pC, pT, pT2] = [lit(r, "C"), lit(r, "C", "T"), lit(r, "non C", "T")];
  enonceDit(4, `$${t(100 * pC)}$ % des courses`);
  enonceDit(4, `dans $${t(100 * pT)}$ % des cas`);
  enonceDit(4, `dans $${t(100 * pT2)}$ % des cas`);
  dit(4, `P(\\overline{C}) = 1 - ${t(pC)} = ${t(1 - pC)}`);
  dit(4, `P_C(\\overline{T}) = ${t(1 - pT)}`);
  dit(4, `P_{\\overline{C}}(\\overline{T}) = ${t(1 - pT2)}`);
}
{
  const f = arbreDe(5, "figure");
  const s = arbreDe(5, "schema");
  for (const ch of [["A"], ["non A"], ["A", "B"], ["A", "non B"], ["non A", "B"], ["non A", "non B"]]) verif(`5. l'arbre du corrigé garde ${ch.join("/")}`, lit(s, ...ch), lit(f, ...ch));
  const [a, nb, na, b] = [lit(f, "A"), lit(f, "A", "non B"), lit(f, "non A"), lit(f, "non A", "B")];
  dit(5, `${t(a)} \\times ${t(nb)} = ${t(a * nb)}`);
  dit(5, `${t(na)} \\times ${t(b)} = ${t(na * b)}`);
  const PB = a * lit(f, "A", "B") + na * b;
  dit(5, `= ${t(a * lit(f, "A", "B"))} + ${t(na * b)} = ${t(PB)}`);
  verif("5. chemins orange = P(B)", sommeChemins(s), PB);
  dit(5, `${t(lit(f, "A", "B"))} + ${t(b)} = ${t(lit(f, "A", "B") + b)}`);
}
{
  const [entete, lignes] = dessin("trace", 6);
  const listes = {
    A: { A1: [1, 2], A2: [3, 4, 5], A3: [6] },
    B: { B1: [1, 2, 3], B2: [3, 4], B3: [5, 6] },
    C: { C1: [2, 4, 6], C2: [1, 3] },
  };
  for (const [nom, morceaux] of Object.entries(listes)) {
    for (const [m, faces] of Object.entries(morceaux)) if (m !== "C1") enonceDit(6, `${m[0]}_${m[1]} = \\{${faces.join(" ; ")}\\}`);
    const ligne = lignes.find((l) => l[0] === nom);
    const fautes = [];
    let partition = true;
    for (let f = 1; f <= 6; f++) {
      const ou = Object.entries(morceaux).filter(([, fs]) => fs.includes(f)).map(([mm]) => mm);
      if (ou.length !== 1) partition = false;
      const lu = ligne[entete.indexOf(String(f))];
      const attendu = ou.length ? ou.join(" ") : "aucun";
      if (lu !== attendu) fautes.push(`face ${f} : ${lu} ≠ ${attendu}`);
    }
    vrai(`6. ligne ${nom} du tableau face par face ${fautes.join(" ; ")}`, fautes.length === 0);
    listes[nom].partition = partition;
  }
  vrai("6. A partition, B et C non", listes.A.partition && !listes.B.partition && !listes.C.partition);
  dit(6, "a) Chaque face est dans exactement un $A_i$ (tableau) : c'est une partition.");
  vrai("6. deux fois « ce n'est pas une partition »", (c(6).match(/ce n'est pas une partition/g) ?? []).length === 2);
  dit(6, "La face $3$ est à la fois dans $B_1$ et dans $B_2$");
  dit(6, "La face $5$ n'est ni paire, ni dans $C_2$");
}
{
  const val = (nom) => nombre(new RegExp(`P\\(${nom.replace(/\\/g, "\\\\")}\\) = ([\\d{},]+)`).exec(e(7))[1].replace("{,}", ","));
  const [PA, PB, PC, PAB, PAC] = [val("A"), val("B"), val("C"), val("A \\cap B"), val("A \\cap C")];
  const indAB = proche(PA * PB, PAB), indAC = proche(PA * PC, PAC);
  vrai("7. A, B indépendants ; A, C non", indAB && !indAC);
  dit(7, `${t(PA)} \\times ${t(PB)} = ${t(PA * PB)} = P(A \\cap B)$ : $A$ et $B$ sont indépendants`);
  dit(7, `${t(PA)} \\times ${t(PC)} = ${t(PA * PC)}$, alors que $P(A \\cap C) = ${t(PAC)}$ : $A$ et $C$ ne sont pas indépendants`);
  dit(7, `\\dfrac{${t(PAC)}}{${t(PA)}} = ${t(PAC / PA)} \\neq ${t(PC)}`);
  const T = Tk(7);
  verif("7. tableau : A ∩ B", T.c("A", "B"), PAB);
  verif("7. tableau : A", T.ligne("A"), PA);
  verif("7. tableau : B", T.col("B"), PB);
  verif("7. tableau : lignes proportionnelles", T.c("A", "B") / T.ligne("A"), T.c("non A", "B") / T.ligne("non A"));
}
{
  const O = [1, 2, 3, 4, 5, 6];
  const A = O.filter((x) => x % 2 === 0), B = [1, 3], C = [1, 2];
  const P = (s) => s.length / 6;
  const inter = (s, u) => s.filter((x) => u.includes(x));
  vrai("8. A, B incompatibles et pas indépendants", inter(A, B).length === 0 && !proche(P(A) * P(B), 0));
  vrai("8. A, C compatibles et indépendants", inter(A, C).length > 0 && proche(P(inter(A, C)), P(A) * P(C)));
  dit(8, `\\dfrac{1}{2} \\times \\dfrac{1}{3} = \\dfrac{1}{6}`);
  verif("8. 1/2 × 1/3", P(A) * P(B), 1 / 6);
  dit(8, `\\dfrac{1}{2} \\times \\dfrac{2}{6} = \\dfrac{1}{6}`);
  verif("8. 1/2 × 2/6", P(A) * P(C), 1 / 6);
  dit(8, "ils ne sont PAS indépendants");
  dit(8, "ils sont indépendants");
  const vs = appels("venn", bloc(8)).map((a) => a.args);
  const zone = (s, u) => ({ aSeul: s.filter((x) => !u.includes(x)).map(String), commun: inter(s, u).map(String), bSeul: u.filter((x) => !s.includes(x)).map(String), dehors: O.filter((x) => !s.includes(x) && !u.includes(x)).map(String) });
  const memes = (z, w) => ["aSeul", "commun", "bSeul", "dehors"].every((k) => [...z[k]].sort().join() === [...w[k]].sort().join());
  vrai("8. Venn de A et B : les bonnes faces", memes(vs[0][0], zone(A, B)) && vs[0][1].b === "B");
  vrai("8. Venn de A et C : les bonnes faces", memes(vs[1][0], zone(A, C)) && vs[1][1].b === "C");
}

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
{
  const r = arbreDe(9);
  const V = ["V1", "V2", "V3"];
  verif("9. partition : premier niveau de somme 1", somme(V.map((v) => lit(r, v))), 1);
  for (const v of V) enonceDit(9, `$${t(100 * lit(r, v))}$ %`);
  for (const v of V) enonceDit(9, `$${t(100 * lit(r, v, "A"))}$ %`);
  const morceaux = V.map((v) => lit(r, v) * lit(r, v, "A"));
  const PA = somme(morceaux);
  dit(9, `= ${morceaux.map(t).join(" + ")} = ${t(PA)}`);
  verif("9. chemins orange = P(A)", sommeChemins(r), PA);
  dit(9, `\\dfrac{${t(morceaux[2])}}{${t(PA)}} = \\dfrac{4}{9} \\approx ${ta(morceaux[2] / PA, 3)}`);
  verif("9. 4/9", morceaux[2] / PA, 4 / 9);
  dit(9, `près de $${Math.round((100 * morceaux[2]) / PA)}$ %`);
  dit(9, "formule des probabilités totales");
}
{
  const T = Tk(10);
  const n = 2000;
  verif("10. téléphone = 30 % de 2 000", T.ligne("Téléphone"), 0.3 * n);
  verif("10. renvoyées sur téléphone = 8 %", T.c("Téléphone", "Renvoyées"), 0.08 * T.ligne("Téléphone"));
  verif("10. renvoyées sur ordinateur = 5 %", T.c("Ordinateur", "Renvoyées"), 0.05 * T.ligne("Ordinateur"));
  verif("10. total", T.total, n);
  dit(10, `\\dfrac{${T.col("Renvoyées")}}{2\\,000} = ${t(T.col("Renvoyées") / n)}`);
  const q = T.c("Téléphone", "Renvoyées") / T.col("Renvoyées");
  dit(10, `\\dfrac{${T.c("Téléphone", "Renvoyées")}}{${T.col("Renvoyées")}} \\approx ${ta(q, 3)}`);
  dit(10, `environ $${Math.round(100 * q)}$ % des renvois`);
  dit(10, `$1\\,330$ gardées`);
}
{
  const [PC, PF, PU] = [0.6, 0.3, 0.72];
  enonceDit(11, `P(C) = ${t(PC)}$, $P(F) = ${t(PF)}$ et $P(C \\cup F) = ${t(PU)}`);
  const PCF = PC + PF - PU;
  dit(11, `${t(PC)} + ${t(PF)} - ${t(PU)} = ${t(PCF)}`);
  vrai("11. C et F indépendants", proche(PC * PF, PCF));
  dit(11, `${t(PC)} \\times ${t(PF)} = ${t(PC * PF)} = P(C \\cap F)`);
  dit(11, `${t(PF)} - ${t(PCF)} = ${t(PF - PCF)}`);
  vrai("11. non C et F indépendants", proche((1 - PC) * PF, PF - PCF));
  dit(11, `${t(1 - PC)} \\times ${t(PF)} = ${t((1 - PC) * PF)}`);
  const z = zonesVenn(dessin("venn", 11)[0]);
  verif("11. Venn : C seul", z.a, PC - PCF);
  verif("11. Venn : C ∩ F", z.ab, PCF);
  verif("11. Venn : F seul", z.b, PF - PCF);
  verif("11. Venn : dehors", z.hors, 1 - PU);
}
{
  const r = arbreDe(12);
  branchesRepetees(12, r);
  verif("12. P(V) = une bille verte sur quatre", lit(r, "Or", "V"), 1 / 4);
  const roueLue = dessin("roue", 12)[0];
  const tot = somme(roueLue.map((s) => s.poids));
  for (const s of roueLue) verif(`12. roue : secteur ${s.label}`, s.poids / tot, lit(r, s.label));
  for (const s of roueLue) enonceDit(12, `« ${s.label} » avec ${s.label === "Or" ? "la probabilité " : ""}$${t(lit(r, s.label))}$`);
  dit(12, `${t(lit(r, "Or"))} \\times ${t(lit(r, "Or", "V"))} = ${t(lit(r, "Or") * lit(r, "Or", "V"))}`);
  const g = [lit(r, "Or") * lit(r, "Or", "V"), lit(r, "Or") * lit(r, "Or", "non V"), lit(r, "Argent") * lit(r, "Argent", "V")];
  dit(12, `= ${g.map(t).join(" + ")} = ${t(somme(g))}`);
  verif("12. chemins orange = P(lot)", sommeChemins(r), somme(g));
  dit(12, `${t(lit(r, "Or"))} + ${t(g[2])} = ${t(somme(g))}`);
}
{
  const r = arbreDe(13);
  const [g, ag, an] = [lit(r, "G"), lit(r, "G", "A"), lit(r, "non G", "A")];
  enonceDit(13, `la probabilité $${t(g)}$`);
  enonceDit(13, `$${t(100 * ag)}$ % des nuits de gel`);
  enonceDit(13, `$${t(100 * an)}$ % des nuits sans gel`);
  const PA = g * ag + (1 - g) * an;
  dit(13, `= ${t(g * ag)} + ${t((1 - g) * an)} = ${t(PA)}`);
  verif("13. chemins orange = P(A)", sommeChemins(r), PA);
  dit(13, `\\dfrac{${t(g * ag)}}{${t(PA)}} = ${t((g * ag) / PA)}`);
  dit(13, `$30 \\times ${t((1 - g) * an)} = ${t(30 * (1 - g) * an)}$ nuits`);
  dit(13, `$${Math.round((10 * (1 - g) * an) / PA)}$ alarmes sur $10$ sont fausses`);
  vrai("13. « quatre fois plus nombreuses »", proche((1 - g) / g, 4));
}
{
  const T = Tk(14);
  const [PJ, PD, PJD] = [T.ligne("Moins de 25") / T.total, T.col("BD") / T.total, T.c("Moins de 25", "BD") / T.total];
  dit(14, `P(J) = \\dfrac{${T.ligne("Moins de 25")}}{${T.total}} = ${t(PJ)}`);
  dit(14, `P(D) = \\dfrac{${T.col("BD")}}{${T.total}} = ${t(PD)}`);
  dit(14, `P(J \\cap D) = \\dfrac{${T.c("Moins de 25", "BD")}}{${T.total}} = ${t(PJD)}`);
  vrai("14. J et D pas indépendants", !proche(PJ * PD, PJD));
  dit(14, `${t(PJ)} \\times ${t(PD)} = ${t(PJ * PD)} \\neq ${t(PJD)}`);
  const pJ = T.c("Moins de 25", "BD") / T.ligne("Moins de 25"), pV = T.c("25 et plus", "BD") / T.ligne("25 et plus");
  dit(14, `P_J(D) = \\dfrac{${T.c("Moins de 25", "BD")}}{${T.ligne("Moins de 25")}} = ${t(pJ)}`);
  dit(14, `\\dfrac{${T.c("25 et plus", "BD")}}{${T.ligne("25 et plus")}} = ${t(pV)}`);
  const d = dessin("diagramme", 14)[1].map((x) => x.value);
  vrai("14. diagramme = les trois parts en %", JSON.stringify(d) === JSON.stringify([pJ, pV, PD].map((x) => Math.round(100 * x))));
}
{
  const [f, bf, bh] = [0.002, 0.98, 0.01];
  enonceDit(15, `$${t(100 * f)}$ % des paiements`);
  const PB = f * bf + (1 - f) * bh;
  dit(15, `= ${t(f * bf)} + ${t((1 - f) * bh)} = ${t(PB)}`);
  dit(15, `\\dfrac{${t(f * bf)}}{${t(PB)}} \\approx ${ta((f * bf) / PB, 3)}`);
  const T = Tk(15);
  const N = 100000;
  verif("15. tableau : fraudes", T.ligne("Fraudes"), N * f);
  verif("15. tableau : fraudes bloquées", T.c("Fraudes", "Bloqué"), N * f * bf);
  verif("15. tableau : honnêtes bloqués", T.c("Honnêtes", "Bloqué"), N * (1 - f) * bh);
  verif("15. tableau : même quotient", T.c("Fraudes", "Bloqué") / T.col("Bloqué"), (f * bf) / PB);
  dit(15, `\\dfrac{${T.c("Fraudes", "Bloqué")}}{1\\,194} \\approx ${ta((f * bf) / PB, 3)}`);
  vrai("15. « 5 blocages sur 6 » honnêtes", Math.round(6 * (1 - (f * bf) / PB)) === 5);
}
{
  const r = arbreDe(16);
  branchesRepetees(16, r);
  const [n, v] = [lit(r, "N"), lit(r, "N", "V")];
  dit(16, `${t(n)} \\times ${t(v)} = ${t(n * v)}`);
  const un = n * (1 - v) + (1 - n) * v;
  dit(16, `= ${t(n * (1 - v))} + ${t((1 - n) * v)} = ${t(un)}`);
  verif("16. chemins orange = exactement un problème", sommeChemins(r), un);
  dit(16, `1 - ${t(n * v)} = ${t(1 - n * v)}`);
  verif("16. au moins un = exactement un + les deux", 1 - n * v, un + (1 - n) * (1 - v));
  dit(16, `${t((1 - n) * (1 - v))} = ${t(1 - n)} \\times ${t(1 - v)}`);
}

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
{
  const r = arbreDe(17);
  const [m, tm, ts] = [lit(r, "M"), lit(r, "M", "T"), lit(r, "non M", "T")];
  enonceDit(17, `$${t(100 * m)}$ % des nouveau-nés`);
  const PT = m * tm + (1 - m) * ts;
  dit(17, `= ${t(m * tm)} + ${t((1 - m) * ts)} = ${t(PT)}`);
  verif("17. chemins orange = P(T)", sommeChemins(r), PT);
  dit(17, `\\dfrac{${t(m * tm)}}{${t(PT)}} \\approx ${ta((m * tm) / PT, 3)}`);
  const T = Tk(17);
  const N = 200000;
  verif("17. tableau : malades", T.ligne("Malades"), N * m);
  verif("17. tableau : malades positifs", T.c("Malades", "Positif"), N * m * tm);
  verif("17. tableau : sains positifs", T.c("Sains", "Positif"), N * (1 - m) * ts);
  verif("17. tableau : même quotient", T.c("Malades", "Positif") / T.col("Positif"), (m * tm) / PT);
  vrai("17. « 1 chance sur 7 »", Math.round(PT / (m * tm)) === 7);
  vrai("17. « six fois plus nombreux »", Math.round(T.c("Sains", "Positif") / T.c("Malades", "Positif")) === 6);
  dit(17, `$${t(tm)} \\times ${t(tm)} = ${t(tm * tm)}$`);
  dit(17, `$${t(ts)} \\times ${t(ts)} = ${t(ts * ts)}$`);
  const P2 = m * tm * tm + (1 - m) * ts * ts;
  dit(17, `= ${t(m * tm * tm)} + ${t((1 - m) * ts * ts)} = ${t(P2)}`);
  dit(17, `\\dfrac{${t(m * tm * tm)}}{${t(P2)}} \\approx ${ta((m * tm * tm) / P2, 3)}`);
  dit(17, `De $${Math.round((100 * m * tm) / PT)}$ % à $${Math.round((100 * m * tm * tm) / P2)}$ %`);
}
{
  const [pe, pb] = [0.04, 0.05];
  enonceDit(18, `de probabilité $${t(pe)}$`);
  enonceDit(18, `de probabilité $${t(pb)}$`);
  dit(18, `${t(pe)} \\times ${t(pb)} = ${t(pe * pb)}`);
  const U = pe + pb - pe * pb;
  dit(18, `${t(pe)} + ${t(pb)} - ${t(pe * pb)} = ${t(U)}`);
  vrai("18. contraires indépendants", proche(1 - U, (1 - pe) * (1 - pb)));
  dit(18, `1 - ${t(U)} = ${t(1 - U)}`);
  dit(18, `${t(1 - pe)} \\times ${t(1 - pb)} = ${t((1 - pe) * (1 - pb))}`);
  dit(18, `\\dfrac{${t(pe * pb)}}{${t(U)}} \\approx ${ta((pe * pb) / U, 3)}`);
  dit(18, `${t(pe)} + ${t(pb)} = ${t(pe + pb)}`);
  const z = zonesVenn(dessin("venn", 18)[0]);
  verif("18. Venn : E seul", z.a, pe - pe * pb);
  verif("18. Venn : B seul", z.b, pb - pe * pb);
  verif("18. Venn : aucun défaut", z.hors, 1 - U);
  const r = arbreDe(18);
  branchesRepetees(18, r);
  verif("18. arbre : P(E)", lit(r, "E"), pe);
  verif("18. arbre : P(B)", lit(r, "E", "B"), pb);
  verif("18. chemins orange = au moins un défaut", sommeChemins(r), U);
}
{
  const r = arbreDe(19);
  const X = ["S", "H", "N"];
  verif("19. partition : premier niveau de somme 1", somme(X.map((x) => lit(r, x))), 1);
  for (const x of X) enonceDit(19, `$${t(lit(r, x))}$ (${x === "S" ? "événement $S$" : `$${x}$`})`);
  for (const x of X) enonceDit(19, `$${t(lit(r, x, "A"))}$`);
  const m = X.map((x) => lit(r, x) * lit(r, x, "A"));
  const PA = somme(m);
  dit(19, `= ${m.map(t).join(" + ")} = ${t(PA)}`);
  verif("19. chemins orange = P(A)", sommeChemins(r), PA);
  dit(19, `P_A(N) = \\dfrac{${t(m[2])}}{${t(PA)}} \\approx ${ta(m[2] / PA, 3)}`);
  dit(19, `P_A(S) = \\dfrac{${t(m[0])}}{${t(PA)}} \\approx ${ta(m[0] / PA, 3)}`);
  const parts = m.map((x) => Math.round((100 * x) / PA));
  const d = dessin("diagramme", 19)[1].map((x) => x.value);
  vrai("19. diagramme = parts des accidents en %", JSON.stringify(d) === JSON.stringify(parts));
  dit(19, `environ $${parts[2]}$ % des accidents`);
  dit(19, `compte encore $${parts[0]}$ % des accidents`);
  dit(19, `La pluie en fait environ $${parts[1]}$ %`);
  vrai("19. « dix fois plus que par temps sec »", proche(lit(r, "N", "A") / lit(r, "S", "A"), 10));
  dit(19, `ne fait que $${t(100 * lit(r, "N"))}$ % des jours`);
}
{
  const r = arbreDe(20);
  for (const v of ["V1", "V2", "V3"]) verif(`20. ${v} : 1/3`, lit(r, v), 1 / 3);
  const PO3 = somme(["V1", "V2", "V3"].map((v) => {
    try {
      return lit(r, v) * lit(r, v, "O3");
    } catch {
      return 0; // la branche de probabilité 0 n'est pas dessinée
    }
  }));
  verif("20. P(O3)", PO3, 1 / 2);
  verif("20. chemins orange = P(O3)", sommeChemins(r), PO3);
  dit(20, `\\dfrac{1}{6} + \\dfrac{2}{6} = \\dfrac{1}{2}`);
  verif("20. P_O3(V1)", (lit(r, "V1") * lit(r, "V1", "O3")) / PO3, 1 / 3);
  verif("20. P_O3(V2)", (lit(r, "V2") * lit(r, "V2", "O3")) / PO3, 2 / 3);
  dit(20, `\\dfrac{1/6}{1/2} = \\dfrac{1}{3}`);
  dit(20, `\\dfrac{1/3}{1/2} = \\dfrac{2}{3}`);
}

/* ═══ règles de rendu ═══ */
for (const { args: [, data] } of appels("diagramme")) {
  if (data.length >= 4) for (const x of data) vrai(`barres : « ${x.label} » ≤ 9 signes`, x.label.length <= 9);
  for (const x of data) vrai(`diagramme : valeur entière (${x.label})`, Number.isInteger(x.value));
}
for (const { args: [z] } of appels("venn")) for (const s of [...z.aSeul, ...z.commun, ...z.bSeul, ...(z.dehors ?? [])]) vrai(`Venn : texte nu (${s})`, !/[$\\]/.test(s) && !/(^|\s)-\d/.test(s));
for (const { args: [entete, lignes] } of appels("trace")) vrai("trace : lignes de la largeur de l'entête", lignes.every((l) => l.length === entete.length));
for (const m of src.matchAll(/(?:label|proba): "([^"]*)"/g)) {
  vrai(`étiquette SVG sans $ : ${m[1]}`, !m[1].includes("$"));
  vrai(`étiquette SVG : vrai signe moins (${m[1]})`, !/(^|[\s(])-\d/.test(m[1]));
}
// ⛔ Une vraie fin de ligne dans une chaîne "…" : chaque ligne de code a ses guillemets appariés.
src.split("\n").forEach((l, i) => {
  const tr = l.trim();
  if (tr.startsWith("//") || tr.startsWith("*") || tr.startsWith("/*")) return;
  const n = (l.replace(/\\./g, "").match(/"/g) ?? []).length;
  vrai(`ligne ${i + 1} : guillemets appariés (pas de fin de ligne dans une chaîne)`, n % 2 === 0);
});

// ⛔ MESURÉ À 375 PX (29/09) : une grille à colonne « auto » prend la largeur MINIMALE
// de ses enfants (arbre 360 px, tableau croisé 336 px) et fait déborder la page :
// le conteneur défilant de l'enfant ne joue plus. Toute grille : grid-cols-1 min-w-0.
for (const m of src.matchAll(/className="(grid[^"]*)"/g)) vrai(`grille « ${m[1]} » : grid-cols-1 et min-w-0 (pas de débordement à 375 px)`, /grid-cols-1/.test(m[1]) && /min-w-0/.test(m[1]));

/* ═══ un dessin par exercice, dessins imprimés ═══ */
let imprimes = 0, ecran = 0;
feuille.blocs.forEach((b0, i) => {
  const b = b0.slice(0, b0.search(/\n\s+micros:/) + 1 || undefined);
  const zones = appels("ecranSeulement", b, true).map((a) => [a.index, a.fin]);
  const tous = DESSINS.flatMap((nom) => appels(nom, b));
  vrai(`${i + 1}. au moins un dessin (figure ou schéma)`, tous.length > 0 && /\b(figure|schema):/.test(b));
  for (const d of tous) (zones.some(([a, f]) => d.index > a && d.index < f) ? ecran++ : imprimes++);
  vrai(`${i + 1}. micros renseignées`, /micros: \["/.test(b0));
});
vrai(`12 à 14 dessins imprimés (${imprimes})`, imprimes >= 12 && imprimes <= 14);

/* ═══ structure ═══ */
const niv3 = feuille.series.split(/niveau: 3,/)[1] ?? "";
vrai("★★★ : quatre problèmes titrés", (niv3.match(/^\s+titre: "/gm) ?? []).length === 5); // le titre de la série + 4
for (const [, r] of feuille.series.matchAll(/rappel: \[([\s\S]*?)\n\s+\],/g)) {
  const n = (r.match(/^\s+"/gm) ?? []).length;
  vrai(`rappel de 2 à 4 lignes (${n})`, n >= 2 && n <= 4);
}
const nbEx = (src.match(/correction:/g) || []).length;
vrai(`exactement 20 « correction: » (${nbEx})`, nbEx === 20);

/* ═══ contrôles de texte communs ═══ */
const v = { ok: (nom, cond, detail = "") => (cond ? ok++ : ko.push(`${nom}${detail ? " — " + detail : ""}`)), titre() {} };
controlesCommuns(v, src, { notionId: NOTION, classe: "premiere-spe" });

console.log(FICHIER);
console.log(`dessins : ${imprimes} imprimés, ${ecran} à l'écran seulement`);
console.log(`${ok} vérifications justes, ${ko.length} fausses`);
ko.forEach((k) => console.log("  ✗", k));
process.exit(ko.length ? 1 : 0);
