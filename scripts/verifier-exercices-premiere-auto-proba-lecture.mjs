// Recalcul indépendant de la feuille « Lire une probabilité dans un tableau
// ou un arbre » (1re, automatismes, 28/09/2026) :
// lib/fiches-exercices/maths-premiere-auto-proba-lecture.tsx.
// Chaque tableau croisé est RELU dans le source : ses totaux de lignes et de
// colonnes sont refaits, puis chaque P(A ∩ B), P_A(B) et P_B(A) annoncé est
// recalculé à partir de SES cases. Chaque arbre : branches de somme 1 à chaque
// nœud, produits le long des chemins égaux aux étiquettes « → ». Les tableaux
// déduits d'un arbre (exercices 12, 19, 20) sont reconstruits depuis l'énoncé.
// Plus : dollars appariés, micros connues du coach de première, 20 corrections.
// Usage : node scripts/verifier-exercices-premiere-auto-proba-lecture.mjs

import fs from "node:fs";

const FICHE = "lib/fiches-exercices/maths-premiere-auto-proba-lecture.tsx";
const src = fs.readFileSync(FICHE, "utf8");

let ok = 0;
const ko = [];
const proche = (a, b, eps = 1e-9) => Math.abs(a - b) < eps * Math.max(1, Math.abs(b));
const verif = (nom, a, b, eps) => (proche(a, b, eps) ? ok++ : ko.push(`${nom} : ${a} ≠ ${b}`));
const vrai = (nom, c) => (c ? ok++ : ko.push(`${nom} : faux`));
const somme = (t) => t.reduce((s, x) => s + x, 0);
const nombre = (s) => Number(String(s).replace(/\s/g, "").replace(",", "."));

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

/* ═══════════════ tableaux croisés : totaux refaits ═══════════════ */
const tableaux = appels("tableauProba").map(([entetes, lignes, surl = []]) => ({ entetes, lignes, surl }));
tableaux.forEach(({ entetes, lignes, surl }, k) => {
  const nom = `tableau ${k} (${lignes[0][0]})`;
  vrai(`${nom} : largeur`, lignes.every((l) => l.length === entetes.length));
  const v = lignes.map((l) => l.slice(1).map(nombre));
  for (const l of v) verif(`${nom} : total de ligne`, somme(l.slice(0, -1)), l[l.length - 1], 1e-9);
  for (let j = 0; j < v[0].length; j++) verif(`${nom} : total de colonne ${j}`, somme(v.slice(0, -1).map((l) => l[j])), v[v.length - 1][j], 1e-9);
  vrai(`${nom} : cases surlignées dans le tableau`, surl.every(([i, j]) => i < lignes.length && j >= 1 && j < entetes.length));
});
/** Le tableau dont une ligne s'appelle `ligne` (et une colonne `colonne`) ; case(l, c) et totaux. */
const T = (ligne, colonne) => {
  const t = tableaux.find(({ entetes, lignes }) => lignes.some((l) => l[0] === ligne) && entetes.includes(colonne));
  if (!t) throw new Error(`tableau ${ligne} × ${colonne} introuvable`);
  const c = (l, col) => nombre(t.lignes.find((x) => x[0] === l)[t.entetes.indexOf(col)]);
  return { c, total: c("Total", "Total"), ligne: (l) => c(l, "Total"), col: (col) => c("Total", col), t };
};

/* ═══════════════ arbres : nœuds de somme 1, chemins ═══════════════ */
const arbres = appels("arbre").map(([r]) => r);
for (const [k, racine] of arbres.entries()) {
  const noeud = (enfants, p, chemin) => {
    verif(`arbre ${k} ${chemin} : somme des branches`, somme(enfants.map((n) => nombre(n.proba))), 1);
    for (const n of enfants) {
      const q = p * nombre(n.proba);
      const fleche = n.label.split("→ ")[1];
      if (fleche) verif(`arbre ${k} chemin ${chemin}/${n.label}`, q, nombre(fleche));
      if (n.enfants) noeud(n.enfants, q, `${chemin}/${n.label}`);
    }
  };
  noeud(racine, 1, "racine");
}
const branche = (racineLabel, a, b) => {
  const r = arbres.find((x) => x[0].label === racineLabel);
  const n1 = r.find((n) => n.label === a);
  return b ? nombre(n1.enfants.find((n) => n.label === b || n.label.startsWith(`${b} →`)).proba) : nombre(n1.proba);
};

/* ═══════════════ ★ ═══════════════ */
{
  const s = T("Judo", "Élite");
  verif("E1", s.c("Judo", "Élite") / s.total, 1 / 10);
  verif("E2", s.c("Judo", "Élite") / s.ligne("Judo"), 1 / 4);
  verif("E3", s.c("Judo", "Élite") / s.col("Élite"), 1 / 3);
  vrai("E3 différent", s.ligne("Judo") !== s.col("Élite"));
}
{
  const p = T("non A", "B");
  verif("E4 a P(A∩B)", p.c("A", "B"), 0.12);
  verif("E4 a P(A)", p.ligne("A"), 0.4);
  verif("E4 total 1", p.total, 1);
  verif("E4 b P_A(B)", p.c("A", "B") / p.ligne("A"), 0.3);
  verif("E4 b P_B(A)", p.c("A", "B") / p.col("B"), 1 / 3);
}
{
  verif("E5 P(A)", branche("A", "A"), 0.6);
  verif("E5 P_A(B)", branche("A", "A", "B"), 0.3);
  verif("E5 P(non A)", branche("A", "non A"), 0.4);
  verif("E5 P_nonA(non B)", branche("A", "non A", "non B"), 0.5);
  verif("E6 P(A∩B)", branche("A", "A") * branche("A", "A", "B"), 0.18);
  verif("E6 P(nonA∩B)", branche("A", "non A") * branche("A", "non A", "B"), 0.2);
}
{
  const l = T("Latin", "Filles");
  verif("E8 données filles", l.col("Filles"), 18);
  verif("E8 données latin", l.ligne("Latin"), 12);
  verif("E8 P(L∩F)", l.c("Latin", "Filles") / l.total, 0.3);
  verif("E8 P_L(F)", l.c("Latin", "Filles") / l.ligne("Latin"), 3 / 4);
  verif("E8 P_F(L)", l.c("Latin", "Filles") / l.col("Filles"), 1 / 2);
}

/* ═══════════════ ★★ ═══════════════ */
{
  const a = T("Internet", "Satisfait");
  verif("E9 a", a.c("Internet", "Satisfait") / a.total, 0.56);
  verif("E9 b internet", a.c("Internet", "Satisfait") / a.ligne("Internet"), 0.7);
  verif("E9 b agence", a.c("Agence", "Satisfait") / a.ligne("Agence"), 0.8);
  vrai("E9 c", a.c("Agence", "Satisfait") / a.ligne("Agence") > a.c("Internet", "Satisfait") / a.ligne("Internet"));
  verif("E9 d", a.c("Internet", "Satisfait") / a.col("Satisfait"), 7 / 9);
  vrai("E9 d ≈ 0,78", Math.round(100 * (7 / 9)) === 78);
}
{
  const v = T("Moins de 35 ans", "Vote");
  verif("E10 données", v.ligne("Moins de 35 ans"), 200);
  verif("E10 données", v.c("35 ans et plus", "Vote"), 240);
  verif("E10 b P(J∩V)", v.c("Moins de 35 ans", "Vote") / v.total, 0.22);
  verif("E10 b P_J(V)", v.c("Moins de 35 ans", "Vote") / v.ligne("Moins de 35 ans"), 0.55);
  verif("E10 b P_nonJ(V)", v.c("35 ans et plus", "Vote") / v.ligne("35 ans et plus"), 0.8);
  verif("E10 c", v.c("Moins de 35 ans", "Vote") / v.col("Vote"), 11 / 35);
  vrai("E10 c ≈ 0,31", Math.round(100 * (11 / 35)) === 31);
}
{
  verif("E11 P_S(E)", branche("S", "S", "E"), 0.9);
  verif("E11 P(S∩E)", branche("S", "S") * branche("S", "S", "E"), 0.54);
  verif("E11 P(nonS∩E)", branche("S", "non S") * branche("S", "non S", "E"), 0.28);
  // E12 : le tableau sur 1 000, reconstruit depuis l'arbre.
  const e = T("Supérieur", "Emploi");
  verif("E12 a sup emploi", 1000 * 0.6 * 0.9, e.c("Supérieur", "Emploi"));
  verif("E12 a autres emploi", 1000 * 0.4 * 0.7, e.c("Autres", "Emploi"));
  verif("E12 b", e.c("Supérieur", "Emploi") / e.total, 0.54);
  const pES = e.c("Supérieur", "Emploi") / e.col("Emploi");
  vrai("E12 c ≈ 2/3", Math.abs(pES - 2 / 3) < 0.01 && Math.round(100 * pES) === 66);
  vrai("E12 c deux tiers de 820 ≈ 547", Math.round((2 / 3) * 820) === 547);
}
{
  const pJA = 0.3 * 0.4;
  verif("E13 P(J∩A)", pJA, 0.12);
  verif("E13 P(A)", pJA / 0.25, 0.48);
}
{
  const c = T("Diplômés", "Chômage");
  verif("E14 données", c.ligne("Diplômés"), 160);
  verif("E14 données", c.c("Autres", "Chômage"), 24);
  verif("E14 a", c.c("Diplômés", "Chômage") / c.total, 0.02);
  verif("E14 b diplômés", c.c("Diplômés", "Chômage") / c.ligne("Diplômés"), 0.05);
  verif("E14 b autres", c.c("Autres", "Chômage") / c.ligne("Autres"), 0.1);
  verif("E14 c", c.c("Diplômés", "Chômage") / c.col("Chômage"), 0.25);
}
{
  verif("E15 P(V)", branche("V", "V"), 0.7);
  verif("E15 P_V(L)", branche("V", "V", "L"), 0.8);
  verif("E15 P(V∩L)", branche("V", "V") * branche("V", "V", "L"), 0.56);
  verif("E15 P(nonV∩L)", branche("V", "non V") * branche("V", "non V", "L"), 0.075);
}
{
  const f = T("Fraude", "Signalé");
  verif("E16 données", f.ligne("Fraude"), 20);
  verif("E16 données", f.c("Honnête", "Signalé"), 180);
  verif("E16 b", f.c("Fraude", "Signalé") / f.ligne("Fraude"), 0.9);
  verif("E16 c", f.c("Fraude", "Signalé") / f.col("Signalé"), 1 / 11);
  vrai("E16 c ≈ 0,09", Math.round(100 / 11) === 9);
}

/* ═══════════════ ★★★ ═══════════════ */
{
  const l = T("Terminale", "Favorable");
  verif("E17 a", l.c("Première", "Favorable") / l.total, 0.2);
  verif("E17 b P_T(F)", l.c("Terminale", "Favorable") / l.ligne("Terminale"), 8 / 15);
  verif("E17 b P_F(T)", l.c("Terminale", "Favorable") / l.col("Favorable"), 4 / 15);
  vrai("E17 b arrondis", Math.round(100 * (8 / 15)) === 53 && Math.round(100 * (4 / 15)) === 27);
  verif("E17 c P(F)", l.col("Favorable") / l.total, 0.6);
  const parNiveau = ["Seconde", "Première", "Terminale"].map((n) => l.c(n, "Favorable") / l.ligne(n));
  verif("E17 d seconde", parNiveau[0], 24 / 35);
  verif("E17 d première", parNiveau[1], 4 / 7);
  vrai("E17 d arrondis", Math.round(100 * (24 / 35)) === 69 && Math.round(100 * (4 / 7)) === 57);
  vrai("E17 d seconde en tête", parNiveau[0] > parNiveau[1] && parNiveau[0] > parNiveau[2]);
}
{
  const jc = branche("J", "J") * branche("J", "J", "C");
  const njc = branche("J", "non J") * branche("J", "non J", "C");
  verif("E18 b J∩C", jc, 0.04);
  verif("E18 b nonJ∩C", njc, 0.04);
  verif("E18 c", jc + njc, 0.08);
  verif("E18 d", jc / (jc + njc), 0.5);
}
{
  const r = T("Vêtements", "Renvoyée");
  verif("E19 a vêtements", r.ligne("Vêtements"), 0.4 * 1000);
  verif("E19 a retours vêtements", r.c("Vêtements", "Renvoyée"), 0.25 * 400);
  verif("E19 a retours autres", r.c("Autres", "Renvoyée"), 0.05 * 600);
  verif("E19 b P(V∩R)", r.c("Vêtements", "Renvoyée") / r.total, 0.1);
  verif("E19 b P_V(R)", r.c("Vêtements", "Renvoyée") / r.ligne("Vêtements"), 0.25);
  verif("E19 c", r.c("Vêtements", "Renvoyée") / r.col("Renvoyée"), 10 / 13);
  vrai("E19 c ≈ 0,77", Math.round(100 * (10 / 13)) === 77);
}
{
  const v = T("Annonce A", "Vote A");
  verif("E20 a annonce", v.ligne("Annonce A"), 0.55 * 1000);
  verif("E20 a annonce et vote", v.c("Annonce A", "Vote A"), 0.8 * 550);
  verif("E20 a sans annonce et vote", v.c("N'annonce pas", "Vote A"), 0.1 * 450);
  verif("E20 b P(D∩V)", v.c("Annonce A", "Vote A") / v.total, 0.44);
  verif("E20 b P(V)", v.col("Vote A") / v.total, 0.485);
  vrai("E20 b pas de majorité", v.col("Vote A") / v.total < 0.5);
  verif("E20 c 90 % de 485", 0.9 * 485, 436.5);
  vrai("E20 c plus de 90 %", v.c("Annonce A", "Vote A") / v.col("Vote A") > 0.9);
}

/* ═══════════════ contrôles de texte ═══════════════ */
{
  const connues = new Set(
    [...fs.readFileSync("lib/tutor-v4/knowledge/maths/premiere/microSkills.ts", "utf8").matchAll(/id: "(\w+)"/g)].map((m) => m[1]),
  );
  const citees = new Set();
  for (const m of src.matchAll(/micros: \[([^\]]*)\]/g)) for (const id of m[1].matchAll(/"(\w+)"/g)) citees.add(id[1]);
  for (const id of citees) connues.has(id) ? ok++ : ko.push(`micro inconnue ${id}`);
  const notion = ["auto_proba_conditionnelle_lecture", "auto_proba_intersection_tableau", "auto_proba_distinguer"];
  for (const id of notion) citees.has(id) ? ok++ : ko.push(`micro non couverte ${id}`);
  for (const id of citees) notion.includes(id) ? ok++ : ko.push(`micro hors notion ${id}`);
  for (const m of src.matchAll(/"((?:[^"\\]|\\.)*)"/g)) {
    const n = (m[1].replace(/\\\$/g, "").match(/\$/g) || []).length;
    if (n % 2) ko.push(`dollars impairs dans « ${m[1].slice(0, 60)}… »`);
    else ok++;
  }
  for (const m of src.matchAll(/(?:label|proba): "([^"]*)"/g)) (m[1].includes("$") ? ko.push(`$ dans une étiquette SVG : ${m[1]}`) : ok++);
  const nbEx = (src.match(/correction:/g) || []).length;
  nbEx === 20 ? ok++ : ko.push(`${nbEx} exercices au lieu de 20`);
  const niveaux = [...src.matchAll(/niveau: (\d)/g)].map((m) => m[1]).join("");
  niveaux === "123" ? ok++ : ko.push(`niveaux ${niveaux}`);
}

console.log(`${ok} vérifications justes, ${ko.length} fausses`);
ko.forEach((k) => console.log("  ✗", k));
process.exit(ko.length ? 1 : 0);
