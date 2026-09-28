// Recalcul indépendant de la feuille « Le tableur » (1re sans spé, 28/09/2026) :
// lib/fiches-exercices/maths-premiere-info-tableur.tsx
//
// ⭐ Le script est un PETIT TABLEUR : il relit chaque `feuille(…)` du source
// (les cases, la barre de formule), évalue la formule de la barre sur les
// cellules voisines, la RECOPIE lui-même (décalage des références vers le bas
// ou vers la droite) et compare aux valeurs affichées. Chaque colonne
// d'évolution est refaite (départ × coefficient^n, arrondi annoncé), chaque
// seuil retrouvé en parcourant la colonne, chaque diagramme confronté à la
// feuille. Plus les règles de rendu mesurées à 375 px et le socle commun.
// Usage : node scripts/verifier-exercices-premiere-info-tableur.mjs

import fs from "node:fs";
import path from "node:path";
import { RACINE, lireFeuille, controlesCommuns } from "./verifier-exercices-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-premiere-info-tableur.tsx";
const NOTION = "info_tableur";
const source = fs.readFileSync(path.join(RACINE, FICHIER), "utf8");

let justes = 0;
const fausses = [];
const v = {
  ok(nom, condition, detail = "") {
    if (condition) justes++;
    else fausses.push(`${nom}${detail ? " — " + detail : ""}`);
  },
  titre() {},
};
const f = lireFeuille(source);
const c = (k) => f.corrections[k - 1] ?? "";
const e = (k) => f.enonces[k - 1] ?? "";
const dit = (k, ...ps) => ps.forEach((p) => v.ok(`${k}. « ${p} » dans le corrigé`, c(k).includes(p), "absent"));
const proche = (a, b, eps = 1e-9) => Math.abs(a - b) < eps * Math.max(1, Math.abs(b));
const vaut = (nom, a, b, eps) => v.ok(nom, proche(a, b, eps), `${a} ≠ ${b}`);
/** Arrondi à d décimales, comme l'affichage du tableur. */
const arrondi = (x, d = 0) => Math.round(x * 10 ** d + 1e-9) / 10 ** d;

/* ── Relire les appels dans le source ─────────────────────────────────── */

function argumentsDe(texte, debut) {
  const args = [];
  let prof = 0;
  let courant = "";
  let chaine = false;
  for (let i = debut + 1; i < texte.length; i++) {
    const ch = texte[i];
    if (ch === '"' && texte[i - 1] !== "\\") chaine = !chaine;
    if (!chaine) {
      if ("([{".includes(ch)) prof++;
      if (")]}".includes(ch)) {
        if (prof === 0) {
          if (courant.trim()) args.push(courant.trim());
          return args;
        }
        prof--;
      }
      if (ch === "," && prof === 0) {
        args.push(courant.trim());
        courant = "";
        continue;
      }
    }
    courant += ch;
  }
  throw new Error("appel non fermé");
}
const json = (t) => JSON.parse(t.replace(/,(\s*\n\s*[\]}])/g, "$1").replace(/−/g, "-").replace(/([{,]\s*)([a-zA-Z]+):/g, '$1"$2":'));

function appels(bloc, nom) {
  return [...bloc.matchAll(new RegExp(`\\b${nom}\\(`, "g"))].map((m) => {
    const avant = bloc.slice(0, m.index);
    const iF = avant.lastIndexOf("figure:");
    const iS = avant.lastIndexOf("schema:");
    const role = iF > iS ? "figure" : "schema";
    const depuis = avant.slice(Math.max(iF, iS));
    return { role, imprime: !depuis.includes("ecranSeulement("), args: argumentsDe(bloc, m.index + m[0].length - 1) };
  });
}
const bloc = (k) => {
  const b = f.blocs[k - 1] ?? "";
  return b.slice(0, b.indexOf("micros:") + 1 || undefined);
};
/** La feuille de calcul de l'exercice k : ses cases et ses options. */
const feuilleDe = (k, role = "figure") => {
  const a = appels(bloc(k), "feuille").find((x) => x.role === role);
  if (!a) throw new Error(`exercice ${k} : pas de feuille (${role})`);
  return { grille: json(a.args[0]), opts: a.args[1] ? json(a.args[1]) : {} };
};
const diagrammeDe = (k, role = "schema") => {
  const a = appels(bloc(k), "diagramme").find((x) => x.role === role);
  if (!a) throw new Error(`exercice ${k} : pas de diagramme (${role})`);
  return { type: json(a.args[0]), data: json(a.args[1]), surligne: a.args[2] === undefined ? undefined : Number(a.args[2]) };
};

/* ── Le petit tableur ─────────────────────────────────────────────────── */

const colonne = (L) => L.charCodeAt(0) - 65;
function cellule(grille, ref) {
  const m = /^([A-Z])(\d+)$/.exec(ref);
  const val = grille[Number(m[2]) - 1]?.[colonne(m[1])];
  if (typeof val !== "number") throw new Error(`${ref} ne contient pas un nombre (${JSON.stringify(val)})`);
  return val;
}
/** Évalue une formule française (« =B2*1,05 », « =SOMME(B2:B6) ») sur la grille. */
function evalue(formule, grille) {
  if (!formule.startsWith("=")) throw new Error(`pas une formule : ${formule}`);
  let s = formule.slice(1).replace(/(SOMME|MOYENNE)\(([A-Z])(\d+):([A-Z])(\d+)\)/g, (_, fn, c1, l1, c2, l2) => {
    const vals = [];
    for (let l = Number(l1); l <= Number(l2); l++) for (let cc = colonne(c1); cc <= colonne(c2); cc++) vals.push(cellule(grille, String.fromCharCode(65 + cc) + l));
    const somme = vals.reduce((a, b) => a + b, 0);
    return String(fn === "SOMME" ? somme : somme / vals.length);
  });
  s = s.replace(/([A-Z])(\d+)/g, (ref) => String(cellule(grille, ref))).replace(/(\d),(\d)/g, "$1.$2");
  if (!/^[\d.+\-*/() ]+$/.test(s)) throw new Error(`formule illisible : ${formule}`);
  return Function(`return (${s})`)();
}
/** Recopier une formule de dl lignes vers le bas et dc colonnes vers la droite. */
const recopie = (formule, dl, dc = 0) => formule.replace(/(SOMME|MOYENNE)|([A-Z])(\d+)/g, (tout, fn, cc, l) => (fn ? fn : String.fromCharCode(cc.charCodeAt(0) + dc) + (Number(l) + dl)));
const ref = (col, ligne) => `${col}${ligne}`;
const guillemets = (formule) => `« ${formule} »`;

/** La barre de formule de l'exercice k affiche-t-elle la valeur de sa cellule ? */
function barreJuste(k, role = "figure") {
  const { grille, opts } = feuilleDe(k, role);
  const [cel, formule] = opts.barre;
  const calcule = evalue(formule, grille);
  vaut(`${k}. ${cel} ${formule} → ${calcule}`, cellule(grille, cel), calcule, 1e-6);
  v.ok(`${k}. la cellule de la barre est surlignée`, (opts.surligne ?? []).includes(cel));
  return { grille, cel, formule };
}
/** La colonne `col`, lignes 2 à la fin, suit-elle départ × coef^n (arrondi d) ? */
function evolution(k, col, depart, coef, d = 0, role = "figure") {
  const { grille } = feuilleDe(k, role);
  const fautes = [];
  for (let l = 2; l <= grille.length; l++) {
    const attendu = arrondi(depart * coef ** (l - 2), d);
    const lu = cellule(grille, ref(col, l));
    if (!proche(lu, attendu, 1e-9)) fautes.push(`${ref(col, l)} = ${lu}, attendu ${attendu}`);
  }
  v.ok(`${k}. la colonne ${col} : ${depart} × ${coef}^n, arrondi à ${d} décimale(s)`, fautes.length === 0, fautes.join(" ; "));
  return grille;
}
/** Première ligne (≥ 2) où la condition est vraie : on renvoie la colonne A. */
const premiere = (grille, col, cond) => {
  for (let l = 2; l <= grille.length; l++) if (cond(cellule(grille, ref(col, l)), l)) return grille[l - 1][0];
  return null;
};

try {
  /* ── ★ ── */
  {
    const { grille } = feuilleDe(1);
    vaut("1. B4", cellule(grille, "B4"), 15);
    vaut("1. C2", cellule(grille, "C2"), 450);
    vaut("1. le jour 3 est à la ligne 4", grille[3][0], 3);
    vaut("1. C4", cellule(grille, "C4"), 1200);
    dit(1, "On y lit $15$", "On y lit $450$", "C'est la cellule C4, qui contient $1\\,200$");
  }
  {
    const { grille, formule } = barreJuste(2);
    const b4 = recopie(formule, 1);
    v.ok("2. recopiée en B4 : =B3*1,05", b4 === "=B3*1,05");
    vaut("2. B4 affiché = formule recopiée", cellule(grille, "B4"), evalue(b4, grille), 1e-9);
    dit(2, guillemets(b4), "$210 \\times 1{,}05 = 220{,}5$");
  }
  {
    // Une feuille d'essai : un prix de 50 € en B2.
    const formules = ["=B2*0,8", "=B2*0,2", "=B2-20", "=B2*1,2"];
    const g = [["", "Prix"], ["", 50]];
    const bons = formules.filter((fo) => proche(evalue(fo, g), 50 * (1 - 20 / 100)));
    v.ok("3. une seule formule donne le prix après −20 %", bons.length === 1 && bons[0] === "=B2*0,8", bons.join(" "));
    v.ok("3. les quatre formules sont dans l'énoncé", formules.every((fo) => e(3).includes(guillemets(fo))));
    dit(3, "La bonne formule est « =B2*0,8 »", "$50 \\times 0{,}8 = 40$");
    const { formule, grille } = barreJuste(3, "schema");
    v.ok("3. la barre du schéma porte la bonne formule", formule === "=B2*0,8" && cellule(grille, "B2") === 50);
  }
  {
    // Ex. 6 : la feuille en mode « formules », recopiée par le script lui-même.
    const { grille, opts } = feuilleDe(6, "schema");
    const lue = (r) => grille[Number(r.slice(1)) - 1][colonne(r[0])];
    v.ok("6. C2 = la formule de l'énoncé", lue("C2") === "=B2+10");
    v.ok("6. D2 et E2 : recopies vers la droite", lue("D2") === recopie("=B2+10", 0, 1) && lue("E2") === recopie("=B2+10", 0, 2));
    v.ok("6. C3 : recopie vers le bas", lue("C3") === recopie("=B2+10", 1, 0));
    v.ok("6. les formules sont surlignées", JSON.stringify(opts.surligne) === JSON.stringify(["C2", "D2", "E2", "C3"]));
  }
  {
    const { grille, formule } = barreJuste(4, "schema");
    vaut("4. 600 × 1,02", evalue(formule, grille), 612);
    vaut("4. B4 = recopie", cellule(grille, "B4"), evalue(recopie(formule, 1), grille), 1e-9);
    dit(4, "« =B2*1,02 »", "« =B3*1,02 »", "$600 \\times 1{,}02 = 612$");
  }
  {
    const { grille } = barreJuste(5, "schema");
    const vals = [2, 3, 4, 5, 6].map((l) => cellule(grille, ref("B", l)));
    v.ok("5. les dépenses de l'énoncé sont celles de la feuille", e(5).includes(`$${vals.slice(0, 4).join("$, $")}$ et $${vals[4]}$`));
    vaut("5. total", vals.reduce((a, b) => a + b, 0), 130);
    dit(5, "« =SOMME(B2:B6) »", "$32 + 18 + 45 + 12 + 23 = 130$");
  }
  {
    const fo = "=B2+10";
    v.ok("6. D2", recopie(fo, 0, 1) === "=C2+10");
    v.ok("6. E2", recopie(fo, 0, 2) === "=D2+10");
    v.ok("6. C3", recopie(fo, 1, 0) === "=B3+10");
    dit(6, "en D2, « =C2+10 »", "en E2, « =D2+10 »", "en C3, « =B3+10 »");
  }
  {
    const grille = evolution(7, "B", 800, 1.25, 0);
    vaut("7. première semaine > 1 500", premiere(grille, "B", (x) => x > 1500), 3);
    vaut("7. 1 250 × 1,25", 1250 * 1.25, 1562.5);
    dit(7, "à partir de la semaine $3$", "$1\\,250 \\times 1{,}25 = 1\\,562{,}5$");
  }
  {
    const d = diagrammeDe(8);
    vaut("8. le camembert fait 100 %", d.data.reduce((a, x) => a + x.value, 0), 100);
    v.ok("8. les ordures sont la plus grosse part", d.data.reduce((m, x) => (x.value > m.value ? x : m)).label === "Ordures");
    v.ok("8. un diagramme circulaire", d.type === "camembert");
  }

  /* ── ★★ ── */
  {
    const grille = evolution(9, "B", 2000, 1.03, 2);
    barreJuste(9);
    const fautes = [];
    for (let l = 3; l <= grille.length; l++) {
      const attendu = arrondi(2000 * 1.03 ** (l - 2) - 2000 * 1.03 ** (l - 3), 2);
      if (!proche(cellule(grille, ref("C", l)), attendu)) fautes.push(ref("C", l));
    }
    v.ok("9. la colonne C : les intérêts de chaque année", fautes.length === 0, fautes.join(" "));
    const total = [3, 4, 5].reduce((s, l) => s + cellule(grille, ref("C", l)), 0);
    vaut("9. somme des intérêts", total, 185.45, 1e-9);
    vaut("9. capital final − départ", arrondi(cellule(grille, "B5") - 2000, 2), 185.45);
    vaut("9. le piège 3 × 60", 3 * 60, 180);
    dit(9, "« =B2*1,03 »", "$60 + 61{,}8 + 63{,}65 = 185{,}45$", "$180$ €");
  }
  {
    const grille = evolution(10, "B", 5000, 0.96, 0);
    vaut("10. première année < 4 000", premiere(grille, "B", (x) => x < 4000), 6);
    vaut("10. perte de la 2e année", 4800 * 0.04, 192);
    vaut("10. le piège linéaire : 5000 − 5 × 200", 5000 - 5 * 200, 4000);
    dit(10, "« =B2*0,96 »", "à partir de l'année $6$", "$192$ la deuxième");
  }
  {
    const grille = evolution(11, "B", 20, 1.1, 2);
    vaut("11. première semaine > 30", premiere(grille, "B", (x) => x > 30), 6);
    const total = evalue("=SOMME(B2:B7)", grille);
    vaut("11. =SOMME(B2:B7)", arrondi(total, 2), 154.31);
    vaut("11. la somme exacte, arrondie, est la même", arrondi([0, 1, 2, 3, 4, 5].reduce((s, n) => s + 20 * 1.1 ** n, 0), 2), 154.31);
    dit(11, "« =B2*1,1 »", "« =SOMME(B2:B7) »", "= 154{,}31$ km");
  }
  {
    const { grille, formule } = barreJuste(12);
    const attendus = { 3: 1500, 4: 300, 5: 240 };
    let total = cellule(grille, "D2");
    for (const [l, x] of Object.entries(attendus)) {
      const fo = recopie(formule, Number(l) - 2);
      vaut(`12. D${l} ${fo}`, evalue(fo, grille), x, 1e-9);
      dit(12, guillemets(fo));
      total += evalue(fo, grille);
    }
    vaut("12. total Wh", total, 3040, 1e-9);
    vaut("12. coût", (total / 1000) * 0.25, 0.76, 1e-9);
    dit(12, "« =SOMME(D2:D5) »", "= 3\\,040$ Wh, soit $3{,}04$ kWh", "$3{,}04 \\times 0{,}25 = 0{,}76$");
  }
  {
    const { grille } = barreJuste(13, "schema");
    vaut("13. TVA", evalue("=C2-B2", grille), cellule(grille, "D2"));
    vaut("13. retour au HT", evalue("=C2/1,2", grille), 45, 1e-9);
    vaut("13. le piège × 0,8", arrondi(54 * 0.8, 2), 43.2);
    dit(13, "« =C3/1,2 »", "$43{,}20$ €");
  }
  {
    const { grille, formule } = barreJuste(14);
    v.ok("14. la formule de la barre ne contient aucune cellule", !/[A-Z]\d/.test(formule));
    [3, 4, 5].forEach((l) => vaut(`14. B${l} affiche 1 030`, cellule(grille, ref("B", l)), evalue(formule, grille)));
    const bons = [1, 2, 3].map((n) => arrondi(1000 * 1.03 ** n, 2));
    vaut("14. 2025", bons[0], 1030);
    vaut("14. 2026", bons[1], 1060.9);
    vaut("14. 2027", bons[2], 1092.73);
    dit(14, "« =B2*1,03 »", "$1\\,060{,}90$ €", "$1\\,092{,}73$ €");
  }
  {
    const d = diagrammeDe(15);
    v.ok("15. un diagramme en barres pour comparer des listes", d.type === "barres" && d.data.length === 4);
    dit(15, "une courbe", "un diagramme en barres", "un diagramme circulaire", "un nuage de points");
  }
  {
    const { grille } = feuilleDe(16);
    const fautes = [];
    for (let l = 2; l <= grille.length; l++) {
      if (!proche(evalue(recopie("=30*A2", l - 2), grille), cellule(grille, ref("B", l)))) fautes.push(ref("B", l));
      if (!proche(evalue(recopie("=100+20*A2", l - 2), grille), cellule(grille, ref("C", l)))) fautes.push(ref("C", l));
    }
    v.ok("16. les colonnes B et C suivent les formules", fautes.length === 0, fautes.join(" "));
    vaut("16. B moins cher à partir de", premiere(grille, "C", (x, l) => x < cellule(grille, ref("B", l))), 11);
    vaut("16. égalité à", premiere(grille, "C", (x, l) => x === cellule(grille, ref("B", l))), 10);
    vaut("16. 100 € rattrapés à 10 € par mois", 100 / (30 - 20), 10);
    dit(16, "« =30*A2 »", "« =100+20*A2 »", "$11$ mois");
  }

  /* ── ★★★ ── */
  {
    const grille = evolution(17, "B", 800, 0.9, 0);
    vaut("17. première année < 400", premiere(grille, "B", (x) => x < 400), 7);
    vaut("17. baisse linéaire : moitié à", (800 - 400) / 80, 5);
    const a = appels(bloc(17), "repere").find((x) => x.role === "schema");
    const courbes = [...a.args[1].matchAll(/pts: (\[\[[\s\S]*?\]\])/g)].map((m) => JSON.parse(m[1]));
    const [bleu, orange] = courbes;
    v.ok("17. la courbe bleue : 8 × 0,9^n arrondi au centième", bleu.every(([x, y]) => proche(y, arrondi(8 * 0.9 ** x, 2))) && bleu.length === grille.length - 1);
    v.ok("17. la courbe bleue redit la colonne B (à la tonne près)", bleu.every(([x, y]) => Math.abs(y * 100 - cellule(grille, ref("B", x + 2))) <= 1));
    v.ok("17. la droite orange : 8 − 0,8n", orange.every(([x, y]) => proche(y, 8 - 0.8 * x)));
    vaut("17. la ligne horizontale : la moitié, en centaines", Number(a.args[3]), 400 / 100);
    dit(17, "« =B2*0,9 »", "« =C2-80 »", "à partir de l'année $7$", "$n = 5$");
  }
  {
    const { grille } = feuilleDe(18);
    const fautes = [];
    for (let l = 2; l <= grille.length; l++) {
      if (grille[l - 1][0] !== 1820 + 10 * (l - 2)) fautes.push(ref("A", l));
      if (cellule(grille, ref("B", l)) !== arrondi(20000 * 1.2 ** (l - 2))) fautes.push(ref("B", l));
    }
    v.ok("18. A : +10 ans ; B : ×1,2 arrondi", fautes.length === 0, fautes.join(" "));
    vaut("18. doublement", premiere(grille, "B", (x) => x >= 40000), 1860);
    vaut("18. hausse 1860-1870", cellule(grille, "B7") - cellule(grille, "B6"), 8294);
    vaut("18. hausse 1820-1830", cellule(grille, "B3") - cellule(grille, "B2"), 4000);
    dit(18, "« =A2+10 »", "« =B2*1,2 »", "$49\\,766 - 41\\,472 = 8\\,294$");
  }
  {
    const { grille, formule } = { ...feuilleDe(19), formule: feuilleDe(19).opts.barre[1] };
    v.ok("19. la barre : =3*B2+C2", formule === "=3*B2+C2");
    const points = [2, 3, 4, 5].map((l) => evalue(recopie(formule, l - 2), grille));
    v.ok("19. points 17, 19, 18, 12", JSON.stringify(points) === "[17,19,18,12]", JSON.stringify(points));
    v.ok("19. neuf matchs par équipe", [2, 3, 4, 5].every((l) => cellule(grille, ref("B", l)) + cellule(grille, ref("C", l)) + cellule(grille, ref("D", l)) === 9));
    const plusV = grille.slice(1).reduce((m, r) => (r[1] > m[1] ? r : m))[0];
    const iMax = points.indexOf(Math.max(...points));
    v.ok("19. le plus de victoires : Loups ; le plus de points : Aigles", plusV === "Loups" && grille[iMax + 1][0] === "Aigles");
    const d = diagrammeDe(19);
    v.ok("19. le diagramme redit les points", d.data.every((x, i) => x.label === grille[i + 1][0] && x.value === points[i]));
    vaut("19. la barre surlignée est le premier", d.surligne, iMax);
    points.forEach((p, i) => dit(19, `${grille[i + 2 - 1][0]} : $3 \\times ${grille[i + 1][1]} + ${grille[i + 1][2]} = ${p}$`));
  }
  {
    const { grille, formule } = barreJuste(20);
    const fautes = [];
    for (let l = 3; l <= grille.length; l++) if (cellule(grille, ref("C", l)) !== evalue(recopie(formule, l - 3), grille)) fautes.push(ref("C", l));
    v.ok("20. la colonne C = index − index précédent", fautes.length === 0, fautes.join(" "));
    const conso = [3, 4, 5, 6, 7, 8].map((l) => cellule(grille, ref("C", l)));
    vaut("20. total par SOMME", evalue("=SOMME(C3:C8)", grille), 80);
    vaut("20. total par B8−B2", evalue("=B8-B2", grille), 80);
    vaut("20. coût", 80 * 4, 320);
    vaut("20. la plus forte conso est la dernière (juin)", conso.indexOf(Math.max(...conso)), 5);
    const d = diagrammeDe(20);
    v.ok("20. le diagramme redit la colonne C", d.data.map((x) => x.value).join() === conso.join());
    vaut("20. la barre surlignée est juin", d.surligne, 5);
    v.ok("20. étiquette de juin", d.data[5].label === "juin");
    dit(20, "« =B8-B7 »", "« =SOMME(C3:C8) »", "« =B8-B2 »", "« =C3*4 »", "$80 \\times 4 = 320$");
  }
} catch (err) {
  v.ok("le recalcul s'exécute", false, String(err?.stack ?? err));
}

/* ── Les règles de rendu, mesurées à 375 px le 28/09 ──────────────────── */
{
  let imprimes = 0;
  let ecran = 0;
  const fautes = [];
  f.blocs.forEach((_, i) => {
    const k = i + 1;
    const propre = bloc(k);
    for (const cle of ["figure:", "schema:"]) {
      const j = propre.indexOf(cle);
      if (j < 0) continue;
      if (propre.slice(j, j + 40).includes("ecranSeulement(")) ecran++;
      else imprimes++;
    }
    const dessins = ["figure:", "schema:"].map((cle) => {
      const j = propre.indexOf(cle);
      if (j < 0) return null;
      const re = /\b(?!ecranSeulement\b)(\w+)\(/g;
      re.lastIndex = j + cle.length;
      const m = re.exec(propre);
      return m[1] + JSON.stringify(argumentsDe(propre, m.index + m[0].length - 1).map((t) => t.replace(/\s+/g, "")));
    });
    if (dessins[0] && dessins[1] && dessins[0] === dessins[1]) fautes.push(`${k} : même dessin dans l'énoncé et le corrigé`);
    for (const a of appels(propre, "repere")) {
      const [xmin, xmax, ymin, ymax] = JSON.parse(a.args[0]);
      const ux = xmax - xmin;
      const uy = ymax - ymin;
      if (!(ymin < 0)) fautes.push(`${k} : ymin = ${ymin} (doit être < 0)`);
      if ((ux > 10 || uy > 10) && a.args[4] !== "true") fautes.push(`${k} : ${ux} × ${uy} unités sans « grand »`);
      if (ux > 15 || uy > 15) fautes.push(`${k} : ${ux} × ${uy} unités (15 au plus)`);
      if (/[a-zA-Z_]\w*\(|\bMath\./.test(a.args[1])) fautes.push(`${k} : une courbe n'est pas écrite en clair`);
      for (const m of a.args[1].matchAll(/pts: (\[\[[\s\S]*?\]\])/g)) for (const [x, y] of JSON.parse(m[1])) if (x < xmin || x > xmax || y < ymin || y > ymax) fautes.push(`${k} : (${x} ; ${y}) hors du cadre`);
    }
    for (const a of appels(propre, "feuille")) {
      const grille = json(a.args[0]);
      for (const ligne of grille) for (const t of ligne) if (typeof t === "string" && (/\$/.test(t) || [...t].length > 14)) fautes.push(`${k} : case « ${t} » ($ ou plus de 14 signes)`);
      if (grille.some((l) => l.length > 5)) fautes.push(`${k} : plus de 5 colonnes`);
    }
    for (const a of appels(propre, "diagramme")) {
      const labels = [...a.args[1].matchAll(/label: "([^"]*)"/g)].map((m) => m[1]);
      if (labels.length >= 4 && labels.some((l) => [...l].length > 9)) fautes.push(`${k} : libellé de plus de 9 signes sous ${labels.length} barres`);
    }
  });
  for (const m of source.matchAll(/label: "([^"]*)"/g)) if (/\$|-\d/.test(m[1])) fautes.push(`étiquette SVG « ${m[1]} » : $ ou tiret-moins`);
  v.ok("règles de rendu : cadres, feuilles, étiquettes, barres", fautes.length === 0, fautes.join(" | "));
  v.ok(`10 à 14 dessins imprimés (${imprimes} imprimés, ${ecran} à l'écran seulement)`, imprimes >= 10 && imprimes <= 14, `${imprimes}`);
  console.log(`Dessins : ${imprimes} imprimés, ${ecran} à l'écran seulement`);

  const rappels = [...f.series.matchAll(/rappel: \[([\s\S]*?)\n\s*\],/g)].map((m) => (m[1].match(/^\s*"/gm) ?? []).length);
  v.ok("trois rappels de 2 à 4 lignes", rappels.length === 3 && rappels.every((x) => x >= 2 && x <= 4), JSON.stringify(rappels));
  const serie3 = f.series.split(/niveau: [123],/)[3] ?? "";
  v.ok("les 4 problèmes ont un titre", (serie3.match(/^\s*titre: "/gm) ?? []).length === 5);
  v.ok("chaque problème a un dessin", [17, 18, 19, 20].every((k) => /figure:|schema:/.test(bloc(k))));
}

controlesCommuns(v, source, { notionId: NOTION, classe: "premiere" });
const nbCorrections = (source.match(/correction:/g) ?? []).length;
v.ok("exactement 20 `correction:`", nbCorrections === 20, `${nbCorrections}`);

console.log(`Le tableur (1re) — ${justes} vérifications justes, ${fausses.length} fausses`);
fausses.forEach((x) => console.log("  ✗", x));
process.exit(fausses.length ? 1 : 0);
