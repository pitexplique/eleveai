// Recalcul indépendant de la feuille « Variables aléatoires réelles » de 1re
// SPÉ (29/09/2026) : lib/fiches-exercices/maths-premiere-variables-aleatoires.tsx.
//
// ⭐ Les DESSINS sont relus dans le source, jamais recopiés : `tableau(…)`,
// `tableauProba(…)`, `diagramme(…)`, `roue(…)`, `billes(…)`, `arbre(…)`,
// `trace(…)`, `programme(…)`, `intervalles(…)`, `repere(…)`, `droiteLoi(…)`.
// Chaque loi est relue sur son dessin (ou dans l'énoncé), puis l'espérance, la
// variance (par la DÉFINITION, jamais par une autre formule) et l'écart type
// sont refaits et cherchés dans le corrigé sous leur forme écrite. Les droites
// graduées : l'espérance marquée en rouge est celle qu'on recalcule. Les
// programmes : la loi se relit sur leurs seuils. La simulation affichée : chaque
// moyenne doit être ATTEIGNABLE (un nombre entier de « 6 »).
// ⭐ Contrôles de texte communs (`controlesCommuns`, classe premiere-spe) et
// règles de rendu du 29/09 : un dessin par exercice, 12 à 14 imprimés, aucune
// fin de ligne dans une chaîne, texte nu et vrai signe moins en SVG.
// Usage : node scripts/verifier-exercices-premiere-spe-variables-aleatoires.mjs

import fs from "node:fs";
import path from "node:path";
import { RACINE, controlesCommuns, lireFeuille, tex, D } from "./verifier-exercices-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-premiere-variables-aleatoires.tsx";
const NOTION = "variables_aleatoires";
const DESSINS = ["arbre", "tableau", "tableauProba", "diagramme", "roue", "billes", "trace", "programme", "intervalles", "repere", "droiteLoi"];

const src = fs.readFileSync(path.join(RACINE, FICHIER), "utf8");
let ok = 0;
const ko = [];
const vrai = (nom, cond) => (cond ? ok++ : ko.push(nom));
const proche = (a, b, eps = 1e-9) => Math.abs(a - b) < eps * Math.max(1, Math.abs(b));
const verif = (nom, a, b, eps) => (proche(a, b, eps) ? ok++ : ko.push(`${nom} : ${a} ≠ ${b}`));
const somme = (t) => t.reduce((s, x) => s + x, 0);
/** « 0,25 », « −3 », « 20 000 € », et les fractions « 1/3 ». */
const nombre = (s) => {
  const t = String(s).replace(/€/g, "").replace(/\s/g, "").replace(",", ".").replace("−", "-");
  const f = /^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/.exec(t);
  return f ? Number(f[1]) / Number(f[2]) : Number(t);
};
const feuille = lireFeuille(src);
const c = (k) => feuille.corrections[k - 1] ?? "";
const e = (k) => feuille.enonces[k - 1] ?? "";
const bloc = (k) => feuille.blocs[k - 1] ?? "";
const t = (x) => tex(D(x.toFixed(10)));
const ta = (x, dec) => t(Math.round(x * 10 ** dec) / 10 ** dec);
const dit = (k, morceau) => vrai(`${k}. le corrigé écrit « ${morceau} »`, c(k).includes(morceau));
const enonceDit = (k, morceau) => vrai(`${k}. l'énoncé écrit « ${morceau} »`, e(k).includes(morceau));

/** Espérance, variance PAR LA DÉFINITION, écart type. */
const loi = (x, p) => {
  verif(`loi (${x.join(" ; ")}) : somme des probabilités`, somme(p), 1);
  const E = somme(x.map((v, i) => v * p[i]));
  const V = somme(x.map((v, i) => p[i] * (v - E) ** 2));
  return { E, V, s: Math.sqrt(V) };
};

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
const dessins = (nom, k) => {
  const b = bloc(k);
  return appels(nom, b).map((a) => {
    const avant = b.slice(0, a.index);
    return { ...a, role: avant.lastIndexOf("figure:") > avant.lastIndexOf("schema:") ? "figure" : "schema" };
  });
};
const dessin = (nom, k, role) => {
  const tous = dessins(nom, k);
  const a = role ? tous.find((x) => x.role === role) : tous[0];
  if (!a) throw new Error(`exercice ${k} : pas de ${nom}(${role ?? ""})`);
  return a.args;
};
/** La loi d'un `tableau([x, …], [P, …])` : valeurs et probabilités. */
const loiTableau = (k, role) => {
  const [entete, ligne] = dessin("tableau", k, role);
  return { x: entete.slice(1).map(nombre), p: ligne.slice(1).map(nombre), entete, ligne };
};
/** La loi d'un diagramme : étiquettes = valeurs, hauteurs = probabilités × total. */
const loiDiagramme = (args, total = 100) => ({ x: args[1].map((d) => nombre(d.label)), p: args[1].map((d) => d.value / total) });
/** Les points d'une droite de la loi : bleus = valeurs (étiquette = probabilité), rouge = espérance. */
const droiteDe = (k) => {
  const [min, max, pas, points] = dessin("droiteLoi", k);
  return { min, max, pas, bleus: points.filter((p) => p.color === constantes.BLEU), rouge: points.find((p) => p.color === constantes.ROUGE), points };
};
const memeLoiSurLaDroite = (k, x, p, E) => {
  const d = droiteDe(k);
  const lu = d.bleus.map((b) => `${b.value}:${nombre(b.label).toFixed(9)}`).sort().join("|");
  const attendu = x.map((v, i) => `${v}:${p[i].toFixed(9)}`).sort().join("|");
  vrai(`${k}. la droite porte les valeurs et leurs probabilités (${lu})`, lu === attendu);
  verif(`${k}. le point rouge de la droite est l'espérance`, d.rouge.value, E);
  vrai(`${k}. l'étiquette rouge dit E = ${t(E)}`, d.rouge.label === `E = ${t(E).replace("{,}", ",").replace("-", "−")}`);
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

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
{
  const { entete, ligne } = loiTableau(1);
  const X = entete.slice(1).map((issue) => [...issue].filter((ch) => ch === "P").length);
  vrai(`1. X de chaque issue = nombre de P (${X})`, JSON.stringify(X) === JSON.stringify(ligne.slice(1)));
  vrai("1. X prend 0, 1, 2", JSON.stringify([...new Set(X)].sort()) === "[0,1,2]");
  const n1 = X.filter((x) => x === 1).length;
  dit(1, `P(X = 1) = \\dfrac{${n1}}{${X.length}} = \\dfrac{1}{2}`);
  verif("1. 2/4 = 1/2", n1 / X.length, 1 / 2);
  for (const [issue, v] of entete.slice(1).map((s, i) => [s, X[i]])) vrai(`1. le corrigé donne ${issue} → ${v}`, new RegExp(`${issue}[^$]*\\$X = ${v}\\$`).test(c(1)));
}
const L2 = loiTableau(2, "figure");
{
  const { x, p } = L2;
  enonceDit(2, `$${x.map((v) => t(v)).slice(0, -1).join("$, $")}$ et $${t(x[x.length - 1])}$`);
  enonceDit(2, `$${p.map((v) => t(v)).slice(0, -1).join("$ ; $")}$ et $${t(p[p.length - 1])}$`);
  const P = (f) => somme(x.map((v, i) => (f(v) ? p[i] : 0)));
  dit(2, `P(X = 1) = ${t(P((v) => v === 1))}`);
  dit(2, `P(X \\leqslant 0) = ${t(p[0])} + ${t(p[1])} = ${t(P((v) => v <= 0))}`);
  dit(2, `P(X > 0) = 1 - ${t(P((v) => v <= 0))} = ${t(P((v) => v > 0))}`);
  dit(2, `P(-1 < X < 2) = ${t(p[1])} + ${t(p[2])} = ${t(P((v) => v > -1 && v < 2))}`);
  const d = loiDiagramme(dessin("diagramme", 2));
  vrai("2. le diagramme est la loi, en %", JSON.stringify(d) === JSON.stringify({ x, p }));
  dit(2, `$${Math.round(100 * p[2])} + ${Math.round(100 * p[3])} = ${Math.round(100 * P((v) => v > 0))}$`);
}
{
  const r = dessin("roue", 3)[0];
  const tot = somme(r.map((s) => s.poids));
  const recu = r.map((s) => nombre(s.label));
  const G = recu.map((v) => v - 3);
  const p = r.map((s) => s.poids / tot);
  for (const [i, v] of recu.entries()) dit(3, `$${t(v)} - 3 = ${t(G[i])}$ €`);
  const { x: xs, p: ps } = loiTableau(3);
  vrai("3. le tableau du corrigé = gains nets", JSON.stringify(xs) === JSON.stringify(G));
  ps.forEach((q, i) => verif(`3. tableau : P(G = ${G[i]})`, q, p[i]));
  loi(G, p);
  enonceDit(3, "la moitié de la roue");
  verif("3. la moitié", p[0], 1 / 2);
  verif("3. un tiers", p[1], 1 / 3);
  verif("3. un sixième", p[2], 1 / 6);
}
const L4 = (() => {
  const b = dessin("billes", 4)[0];
  const x = [...new Set(b.map((j) => nombre(j.label)))];
  const p = x.map((v) => b.filter((j) => nombre(j.label) === v).length / b.length);
  x.forEach((v, i) => dit(4, `P(X = ${v}) = \\dfrac{${p[i] * b.length}}{${b.length}} = ${t(p[i])}`));
  x.forEach((v, i) => enonceDit(4, `$${p[i] * b.length}$ ${i === 0 ? "portent" : "le"} ${i === 0 ? "le nombre " : "nombre "}$${v}$`));
  const d = loiDiagramme(dessin("diagramme", 4));
  vrai("4. le diagramme est la loi, en %", JSON.stringify(d) === JSON.stringify({ x, p }));
  loi(x, p);
  return { x, p };
})();
{
  const { x, p } = L2;
  const { E } = loi(x, p);
  dit(5, `= ${x.map((v, i) => t(v * p[i])).join(" + ")} = ${t(E)}`);
  memeLoiSurLaDroite(5, x, p, E);
  dit(5, `\\dfrac{-2 + 0 + 1 + 3}{4} = ${t(somme(x) / x.length)}`);
}
{
  const { x, p } = L2;
  const { E, V, s } = loi(x, p);
  enonceDit(6, `E(X) = ${t(E)}`);
  const [entete, lignes] = dessin("trace", 6);
  vrai("6. tableau des écarts : largeur", lignes.every((l) => l.length === entete.length));
  x.forEach((v, i) => {
    const ec = v - E, ca = ec * ec, po = p[i] * ca;
    const l = lignes[i].map(nombre);
    vrai(`6. ligne x = ${v} du tableau`, proche(l[0], v) && proche(l[1], p[i]) && proche(l[2], ec) && proche(l[3], ca) && proche(l[4], po));
    dit(6, `$x = ${t(v)}$ : écart $${t(ec)}$, carré $${t(ca)}$, pondéré $${t(p[i])} \\times ${t(ca)} = ${t(po)}$`);
  });
  verif("6. total du tableau = V", nombre(lignes[lignes.length - 1][4]), V);
  dit(6, `= ${t(V)}$, et $\\sigma(X) = \\sqrt{${t(V)}} = ${t(s)}$`);
  verif("6. somme pondérée des écarts nulle", somme(x.map((v, i) => p[i] * (v - E))), 0);
}
{
  const [dX, dY] = dessins("diagramme", 7).map((d) => loiDiagramme(d.args));
  const X = loi(dX.x, dX.p), Y = loi(dY.x, dY.p);
  verif("7. E(X) = 0", X.E, 0);
  verif("7. E(Y) = 0", Y.E, 0);
  dit(7, `= ${t(X.V)}$, donc $\\sigma(X) = ${t(X.s)}$`);
  dit(7, `= ${t(Y.V)}$, donc $\\sigma(Y) = \\sqrt{${t(Y.V)}} \\approx ${ta(Y.s, 2)}$`);
  enonceDit(7, `la probabilité $${t(dY.p[0])}$`);
  vrai("7. B plus risqué", Y.s > X.s);
}
{
  const lignes = dessin("programme", 8)[0];
  const seuils = lignes.map((l) => /u < ([\d.]+)/.exec(l)?.[1]).filter(Boolean).map(Number);
  const valeurs = lignes.map((l) => /return (-?\d+)/.exec(l)?.[1]).filter(Boolean).map(Number);
  const bornes = [0, ...seuils, 1];
  const p = valeurs.map((_, i) => bornes[i + 1] - bornes[i]);
  vrai("8. le programme simule la loi du sac de l'exercice 4", JSON.stringify(valeurs) === JSON.stringify(L4.x) && p.every((q, i) => proche(q, L4.p[i])));
  valeurs.forEach((v, i) => dit(8, `longueur $${t(p[i])}$, donc $P(X = ${v}) = ${t(p[i])}$`));
  const ivs = dessin("intervalles", 8)[2];
  ivs.forEach((iv, i) => vrai(`8. intervalle « ${iv.label} » = [${bornes[i]} ; ${bornes[i + 1]}[`, proche(iv.de, bornes[i]) && proche(iv.a, bornes[i + 1]) && iv.label === `X = ${valeurs[i]}`));
  vrai("8. lignes de 30 signes au plus", lignes.every((l) => l.length <= 30));
}

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
{
  const { x, ligne } = loiTableau(9);
  const connus = ligne.slice(1).filter((s) => !/a/.test(s)).map(nombre);
  const a = (1 - somme(connus)) / 3;
  dit(9, `$3a = ${t(1 - somme(connus))}$ et $a = ${t(a)}$`);
  const p = [...connus, a, 2 * a];
  const { E } = loi(x, p);
  dit(9, `P(X \\geqslant 1) = 1 - P(X = 0) = 1 - ${t(p[0])} = ${t(1 - p[0])}`);
  dit(9, `= ${t(p[1])} + ${t(2 * p[2])} + ${t(3 * p[3])} = ${t(E)}`);
  const d = loiDiagramme(dessin("diagramme", 9));
  vrai("9. le diagramme est la loi complétée, en %", JSON.stringify(d.x) === JSON.stringify(x) && d.p.every((q, i) => proche(q, p[i])));
  dit(9, `$a = ${t((1 - somme(connus)) / 2)}$ : faux`);
  enonceDit(9, `$${t(connus[0])}$ ; $${t(connus[1])}$ ; $a$ et $2a$`);
}
{
  const r = arbreDe(10);
  const b = dessin("billes", 10)[0];
  const rouges = b.filter((x) => x.couleur === constantes.ROUGE).length;
  verif("10. P(R1) = rouges / boules", lit(r, "R1"), rouges / b.length);
  verif("10. après une rouge", lit(r, "R1", "R2"), (rouges - 1) / (b.length - 1));
  verif("10. après une noire", lit(r, "N1", "R2"), rouges / (b.length - 1));
  const p2 = lit(r, "R1") * lit(r, "R1", "R2"), p0 = lit(r, "N1") * lit(r, "N1", "N2");
  const p1 = sommeChemins(r);
  verif("10. P(X = 1) = chemins orange = 1 − les deux autres", p1, 1 - p0 - p2);
  const { E } = loi([0, 1, 2], [p0, p1, p2]);
  dit(10, `= \\dfrac{6}{20} = ${t(p2)}`);
  dit(10, `= \\dfrac{2}{20} = ${t(p0)}`);
  dit(10, `\\dfrac{6}{20} + \\dfrac{6}{20} = ${t(p1)}`);
  dit(10, `= ${t(E)}$.`);
  verif("10. E(X) = 2 × part des rouges", E, (2 * rouges) / b.length);
  dit(10, `soit $${Math.round((100 * E) / 2)}$ %`);
}
{
  const r = dessin("roue", 11)[0];
  vrai("11. huit secteurs égaux", r.length === 8 && r.every((s) => s.poids === 1));
  const x = [...new Set(r.map((s) => nombre(s.label)))].sort((u, v) => v - u);
  const p = x.map((v) => r.filter((s) => nombre(s.label) === v).length / 8);
  const R = loi(x, p);
  verif("11. E(R) = 4", R.E, 4);
  dit(11, `= \\dfrac{20 + 12}{8} = ${t(R.E)}$ €`);
  dit(11, `$m = ${t(R.E)}$ €`);
  const G = x.map((v) => v - 5);
  const g = loi(G, p);
  dit(11, `= \\dfrac{15 + 2 - 25}{8} = ${t(g.E)}$ €`);
  verif("11. E(G) = E(R) − 5", g.E, R.E - 5);
  memeLoiSurLaDroite(11, G, p, g.E);
}
{
  const { x, p } = loiTableau(12, "figure");
  const { E } = loi(x, p);
  x.forEach((v, i) => enonceDit(12, `P(X = ${v}) = ${t(p[i])}`));
  dit(12, `= ${x.slice(1).map((v, i) => t(v * p[i + 1])).join(" + ")} = ${t(E)}$ vélo`);
  const S = x.map((v) => 50 + 120 * v);
  const lS = loiTableau(12, "schema");
  vrai("12. la loi de S = 50 + 120 X", JSON.stringify(lS.x) === JSON.stringify(S) && lS.p.every((q, i) => proche(q, p[i])));
  const ES = loi(S, p).E;
  dit(12, `= ${S.map((s, i) => t(s * p[i])).join(" + ")} = ${t(ES)}$ €`);
  verif("12. E(aX + b)", 120 * E + 50, ES);
  dit(12, `$E(S) = 120 \\times ${t(E)} + 50 = ${t(ES)}$ €`);
  dit(12, `120 \\times ${t(E)} = ${t(120 * E)}$ €`);
}
{
  const { x, p } = loiDiagramme(dessin("diagramme", 13));
  x.forEach((v, i) => enonceDit(13, `P(X = ${v}) = ${t(p[i])}`));
  const { E, V, s } = loi(x, p);
  dit(13, `= ${t(E)}$ but`);
  dit(13, `$V(X) = ${x.map((v, i) => `${t(p[i])} \\times ${t((v - E) ** 2)}`).join(" + ")} = ${x.map((v, i) => t(p[i] * (v - E) ** 2)).join(" + ")} = ${t(V)}$`);
  dit(13, `\\sqrt{${t(V)}} = ${t(s)}$ but`);
  dit(13, `$E(X) - \\sigma(X) = ${t(E - s)}$ et $E(X) + \\sigma(X) = ${t(E + s)}$`);
  const dans = x.map((v, i) => (v >= E - s && v <= E + s ? p[i] : 0));
  dit(13, `= ${t(somme(dans))}$.`);
  const d = droiteDe(13);
  const [g, m, dd] = d.points.map((q) => q.value);
  vrai("13. droite : E − σ, E, E + σ", proche(g, E - s) && proche(m, E) && proche(dd, E + s));
  dit(13, `contient ici $${Math.round(100 * somme(dans))}$ % des matchs`);
}
{
  const [entetes, lignes, surl] = dessin("tableauProba", 14);
  const fautes = [];
  lignes.forEach((l, i) => l.slice(1).forEach((v, j) => nombre(v) !== Math.max(i + 1, j + 1) && fautes.push(`${i + 1},${j + 1}`)));
  vrai(`14. chaque case = le plus grand des deux dés ${fautes.join(" ")}`, fautes.length === 0 && entetes.length === 7);
  const attendu = [];
  lignes.forEach((l, i) => l.slice(1).forEach((v, j) => nombre(v) <= 3 && attendu.push(`${i},${j + 1}`)));
  vrai("14. cases surlignées = {X ≤ 3}", JSON.stringify(surl.map(String).sort()) === JSON.stringify(attendu.sort()));
  const comptes = [1, 2, 3, 4, 5, 6].map((k) => lignes.flatMap((l) => l.slice(1)).filter((v) => nombre(v) === k).length);
  vrai(`14. comptes des cases (${comptes})`, comptes.every((n, i) => n === 2 * (i + 1) - 1));
  const d = dessin("diagramme", 14)[1].map((q) => q.value);
  vrai("14. le diagramme compte les cases", JSON.stringify(d) === JSON.stringify(comptes));
  const { E } = loi([1, 2, 3, 4, 5, 6], comptes.map((n) => n / 36));
  dit(14, `\\dfrac{161}{36} \\approx ${ta(E, 2)}`);
  verif("14. 161/36", E, 161 / 36);
  dit(14, `\\dfrac{${attendu.length}}{36} = ${t(attendu.length / 36)}`);
  // 29/09 : la somme est écrite à part (une fraction d'un seul tenant débordait à 375 px).
  dit(14, `1 \\times 1 + 2 \\times 3 + 3 \\times 5$ $+ 4 \\times 7 + 5 \\times 9 + 6 \\times 11 = 161`);
}
{
  const { x, p } = loiDiagramme(dessin("diagramme", 15));
  const { E, s } = loi(x, p);
  dit(15, `= ${t(x[1] * p[1])} + ${t(x[2] * p[2])} = ${t(E)}$ €`);
  vrai(`15. σ ≈ 2 802 (${s.toFixed(2)})`, Math.round(s) === 2802);
  enonceDit(15, `\\sigma(X) \\approx 2\\,802`);
  dit(15, `$600 - ${t(E)} = ${t(600 - E)}$ €`);
  dit(15, `$10\\,000 \\times ${t(600 - E)} = ${t(10000 * (600 - E))}$ €`);
  dit(15, `une perte de $${t(x[2] - 600)}$ €`);
  const d = droiteDe(15);
  verif("15. droite : E en rouge", d.rouge.value, E);
  vrai("15. droite : c = 600", d.bleus.some((q) => q.value === 600 && q.label === "c = 600"));
}
{
  const EG = 4 / 6 - 5 / 6;
  dit(16, `= -\\dfrac{1}{6} \\approx ${ta(EG, 3)}$ €`);
  const { entete, ligne } = loiTableau(16);
  const ns = entete.slice(1).map(nombre), ms = ligne.slice(1).map(nombre);
  ns.forEach((n, i) => {
    const k = (ms[i] * n + n) / 5;
    vrai(`16. moyenne ${ms[i]} sur ${n} parties : ${k} « 6 », un entier`, proche(k, Math.round(k)) && k >= 0 && k <= n);
  });
  vrai("16. « trois « 6 » en dix lancers »", proche((ms[0] * ns[0] + ns[0]) / 5, 3) && c(16).includes("trois « 6 » en dix lancers"));
  vrai("16. la dernière moyenne est à moins de 0,001 de E(G)", Math.abs(ms[ms.length - 1] - EG) < 0.001);
  dit(16, `on lit justement $${t(ms[ms.length - 1])}$`);
  const [cadre, courbes, , horizontale] = dessin("repere", 16);
  vrai("16. le graphique porte les moyennes du tableau (abscisse k pour n = 10^k)", JSON.stringify(courbes[0].pts) === JSON.stringify(ns.map((n, i) => [Math.log10(n), ms[i]])));
  vrai("16. la ligne horizontale est E(G) arrondie", Math.abs(horizontale - EG) < 0.001 && cadre[2] < 0);
  const lignes = dessin("programme", 16)[0];
  vrai("16. le programme : 6 → 4 €, sinon −1 €", lignes.some((l) => l.includes("== 6")) && lignes.includes("        return 4") && lignes.includes("    return -1"));
}

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
{
  const X = loi([2, 0], [0.5, 0.5]), Y = loi([3, 0], [0.35, 0.65]);
  enonceDit(17, "réussi $50$ % du temps");
  enonceDit(17, "réussi $35$ % du temps");
  dit(17, `$E(X) = 2 \\times 0{,}5 = ${t(X.E)}$ point`);
  dit(17, `$E(Y) = 3 \\times 0{,}35 = ${t(Y.E)}$ point`);
  dit(17, `= ${t(X.V)}$, donc $\\sigma(X) = ${t(X.s)}$`);
  dit(17, `0{,}35 \\times ${t((3 - Y.E) ** 2)} + 0{,}65 \\times ${t(Y.E ** 2)} = ${t(0.35 * (3 - Y.E) ** 2)} + ${t(0.65 * Y.E ** 2)} = ${t(Y.V)}$, donc $\\sigma(Y) \\approx ${ta(Y.s, 2)}$`);
  const r = arbreDe(17);
  const g2 = sommeChemins(r);
  verif("17. tir à deux points gagnant = 0,5 × 0,5", g2, 0.25);
  dit(17, `$P(\\text{gagner}) = 0{,}5 \\times 0{,}5 = ${t(g2)}$`);
  vrai("17. le tir à trois gagne plus souvent", 0.35 > g2);
  const d = dessin("diagramme", 17)[1].map((q) => q.value);
  vrai("17. diagramme : chances de gagner en %", JSON.stringify(d) === JSON.stringify([Math.round(100 * g2), 35]));
}
{
  const d = dessin("diagramme", 18)[1];
  const G = d.map((q) => nombre(q.label)), n = d.map((q) => q.value);
  vrai("18. 200 billets", somme(n) === 200);
  const lots = G.map((g) => g + 2);
  vrai("18. lots 100, 20, 5, 0", JSON.stringify(lots) === "[100,20,5,0]");
  const { E } = loi(G, n.map((k) => k / 200));
  dit(18, `= \\dfrac{-100}{200} = ${t(E)}$ €`);
  verif("18. association : 200 × 0,5 = recettes − lots", -200 * E, 400 - somme(lots.map((l, i) => l * n[i])));
  const recu = somme(lots.map((l, i) => l * n[i])) / 200;
  dit(18, `= \\dfrac{300}{200} = ${t(recu)}$ €`);
  dit(18, `$200p - 300 = 300$, soit $p = ${t(600 / 200)}$ €`);
  n.forEach((k, i) => dit(18, `P(G = ${t(G[i])}) = \\dfrac{${k}}{200}`));
}
{
  const b = dessin("billes", 19)[0];
  const m = b.filter((x) => x.couleur === constantes.CHEMIN).length;
  enonceDit(19, `ils pêchent $${b.length}$ poissons, dont $${m}$ marqués`);
  dit(19, `\\dfrac{${m}}{${b.length}} = ${t(m / b.length)}`);
  dit(19, `\\dfrac{200}{${t(m / b.length)}} = ${t(200 / (m / b.length))}$ poissons`);
  dit(19, `donneraient $N \\approx ${t(Math.round(200 / ((m - 1) / b.length)))}$`);
  dit(19, `donneraient $N = ${t(200 / ((m + 1) / b.length))}$`);
  const lignes = dessin("programme", 19)[0];
  vrai("19. le programme tire avec la probabilité 200 / N et renvoie k / n", lignes.some((l) => l.includes("random() < 200 / N")) && lignes.includes("    return k / n"));
  vrai("19. lignes de 30 signes au plus", lignes.every((l) => l.length <= 30));
}
{
  const { entete, ligne } = loiTableau(20);
  const Lx = ligne.slice(1).map(nombre);
  const p = [0.5, 0.3, 0.2];
  enonceDit(20, `Il loue alors $${Lx[0]}$, $${Lx[1]}$ ou $${Lx[2]}$ kayaks`);
  vrai("20. météo du tableau", entete.slice(1).join() === "Soleil,Nuages,Pluie");
  const EL = loi(Lx, p).E;
  dit(20, `= ${Lx.map((v, i) => t(v * p[i])).join(" + ")} = ${t(EL)}$ kayaks`);
  const B = Lx.map((v) => 15 * v - 300);
  B.forEach((b, i) => dit(20, `15 \\times ${Lx[i]} - 300 = ${t(b)}$ €`));
  const EB = loi(B, p).E;
  dit(20, `= 150 + 22{,}5 - 30 = ${t(EB)}$ €`);
  verif("20. E(aL + b)", 15 * EL - 300, EB);
  dit(20, `15 \\times ${t(EL)} - 300 = ${t(EB)}$ €`);
  dit(20, `$P(B < 0) = ${t(somme(B.map((b, i) => (b < 0 ? p[i] : 0))))}$`);
  dit(20, `$90 \\times ${t(EB)} = ${t(90 * EB)}$ €`);
  dit(20, `$15 \\times ${t(EL)} = ${t(15 * EL)}$ €`);
  memeLoiSurLaDroite(20, B, p, EB);
}

/* ═══ règles de rendu ═══ */
for (const { args: [, data] } of appels("diagramme")) {
  if (data.length >= 4) for (const x of data) vrai(`barres : « ${x.label} » ≤ 9 signes`, x.label.length <= 9);
  for (const x of data) vrai(`diagramme : valeur entière (${x.label})`, Number.isInteger(x.value));
}
for (const { args: [entete, ligne] } of appels("tableau")) vrai(`tableau(${entete[0]}) : entête et ligne de même longueur`, entete.length === ligne.length);
for (const { args: [entete, lignes] } of appels("trace")) vrai("trace : lignes de la largeur de l'entête", lignes.every((l) => l.length === entete.length));
for (const { args: [min, max, pas, points] } of appels("droiteLoi")) {
  const n = Math.round((max - min) / pas) + 1;
  vrai(`droite [${min} ; ${max}] : ${n} graduations, 8 au plus`, n <= 8);
  for (const q of points) vrai(`droite : point ${q.value} dans le cadre`, q.value >= min && q.value <= max);
}
for (const { args: [cadre, , , , grand] } of appels("repere")) {
  const [xmin, xmax, ymin, ymax] = cadre;
  const large = Math.max(xmax - xmin, ymax - ymin);
  vrai(`repère ${cadre} : ymin < 0, grand au-delà de 10, 15 au plus`, ymin < 0 && (large <= 10 || grand === true) && large <= 15);
}
for (const { args: [lignes] } of appels("programme")) vrai("programme : pas de guillemet double ni d'antislash", lignes.every((l) => !/["\\]/.test(l)));
for (const m of src.matchAll(/(?:label|proba): "([^"]*)"/g)) {
  vrai(`étiquette SVG sans $ : ${m[1]}`, !m[1].includes("$"));
  vrai(`étiquette SVG : vrai signe moins (${m[1]})`, !/(^|[\s(])-\d/.test(m[1]));
}
for (const { args: [entete, ligne] } of appels("tableau")) for (const s of [...entete, ...ligne].map(String)) vrai(`tableau : texte nu, vrai signe moins (${s})`, !s.includes("$") && !/(^|\s)-\d/.test(s));
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
  const tous = DESSINS.flatMap((nom) => appels(nom, b, true));
  vrai(`${i + 1}. au moins un dessin (figure ou schéma)`, tous.length > 0 && /\b(figure|schema):/.test(b));
  for (const d of tous) (zones.some(([a, f]) => d.index > a && d.index < f) ? ecran++ : imprimes++);
  vrai(`${i + 1}. micros renseignées`, /micros: \["/.test(b0));
});
vrai(`12 à 14 dessins imprimés (${imprimes})`, imprimes >= 12 && imprimes <= 14);

/* ═══ structure ═══ */
const niv3 = feuille.series.split(/niveau: 3,/)[1] ?? "";
vrai("★★★ : quatre problèmes titrés", (niv3.match(/^\s+titre: "/gm) ?? []).length === 5);
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
