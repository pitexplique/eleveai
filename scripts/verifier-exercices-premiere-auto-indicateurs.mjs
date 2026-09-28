// Recalcul indépendant de la feuille « Moyenne, médiane, quartiles »
// (1re, automatismes, 28/09/2026) : lib/fiches-exercices/maths-premiere-auto-indicateurs.tsx.
// Chaque série est ressaisie ICI, rangée par le script, et ses indicateurs
// recalculés avec la convention du coach : quartile = valeur de rang
// ⌈N/4⌉ (⌈3N/4⌉), médiane = milieu ou moyenne des deux milieux. Les cinq
// nombres de chaque boîte dessinée sont RELUS dans le source et comparés.
// Plus : dollars appariés, micros connues du coach de première, 20 corrections.
// Usage : node scripts/verifier-exercices-premiere-auto-indicateurs.mjs

import fs from "node:fs";

const FICHE = "lib/fiches-exercices/maths-premiere-auto-indicateurs.tsx";
const src = fs.readFileSync(FICHE, "utf8");

let ok = 0;
const ko = [];
const proche = (a, b, eps = 1e-9) => Math.abs(a - b) < eps * Math.max(1, Math.abs(b));
const verif = (nom, a, b, eps) => (proche(a, b, eps) ? ok++ : ko.push(`${nom} : ${a} ≠ ${b}`));
const vrai = (nom, c) => (c ? ok++ : ko.push(`${nom} : faux`));
const somme = (t) => t.reduce((s, x) => s + x, 0);
const moyenne = (t) => somme(t) / t.length;
const range = (t) => [...t].sort((a, b) => a - b);
const mediane = (t) => {
  const r = range(t), n = r.length;
  return n % 2 ? r[(n - 1) / 2] : (r[n / 2 - 1] + r[n / 2]) / 2;
};
const q1 = (t) => range(t)[Math.ceil(t.length / 4) - 1];
const q3 = (t) => range(t)[Math.ceil((3 * t.length) / 4) - 1];
/** Déplie un tableau valeurs/effectifs en série. */
const deplie = (vals, effs) => vals.flatMap((v, i) => Array(effs[i]).fill(v));

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
    res.push(Function(`const ORANGE = "#ea580c"; return [${src.slice(debut, j - 1)}]`)());
  }
  return res;
}
const boites = appels("boite").flatMap(([series, axe]) => series.map((s) => ({ ...s, axe })));
/** La boîte dessinée pour la série `t` (retrouvée par son min et son max) doit porter ses cinq nombres. */
const boiteDe = (nom, t, label) => {
  // Deux séries peuvent partager min et max (E4 et E12) : on les départage
  // par la médiane, puis on contrôle les trois nombres de la boîte retenue.
  const candidates = boites.filter((x) => x.min === Math.min(...t) && x.max === Math.max(...t) && (!label || x.label === label));
  const b = candidates.find((x) => x.mediane === mediane(t)) ?? candidates[0];
  if (!b) return ko.push(`${nom} : boîte introuvable`);
  verif(`${nom} boîte Q1`, b.q1, q1(t));
  verif(`${nom} boîte médiane`, b.mediane, mediane(t));
  verif(`${nom} boîte Q3`, b.q3, q3(t));
};

/* ═══════════════ contrôles génériques des dessins ═══════════════ */
for (const b of boites) {
  vrai(`boîte ${b.min}-${b.max} ordonnée`, b.min <= b.q1 && b.q1 <= b.mediane && b.mediane <= b.q3 && b.q3 <= b.max);
  if (b.axe) vrai(`boîte ${b.min}-${b.max} dans l'axe`, b.axe.min <= b.min && b.max <= b.axe.max);
  // ⛔ Mesuré le 28/09 à 375 px : des nombres à 4 chiffres tous les 1 000 se touchaient.
  if (b.axe && b.max >= 1000) vrai(`boîte ${b.min}-${b.max} : moins de 6 étiquettes`, (b.axe.max - b.axe.min) / b.axe.step + 1 < 6);
}
for (const [entete, ligne] of appels("tableau")) vrai(`tableau ${entete[0]} : longueurs`, entete.length === ligne.length);

/* ═══════════════ ★ ═══════════════ */
verif("E1", moyenne([12, 15, 9, 14, 10]), 12);
{
  const t = [2, 3, 5, 4, 2, 3];
  verif("E2", mediane(t), 3);
  const lu = appels("tableau").find(([e, l]) => l[0] === "Valeur" && e.length === 7)[1].slice(1);
  vrai("E2 série rangée dessinée", JSON.stringify(lu) === JSON.stringify(range(t)));
}
verif("E3", mediane([8, 13, 5, 11, 16, 7, 10]), 10);
{
  const t = [3, 5, 6, 8, 9, 11, 12, 15];
  verif("E4 Q1", q1(t), 5);
  verif("E4 Q3", q3(t), 11);
  verif("E4 médiane", mediane(t), 8.5);
  boiteDe("E4", t);
}
{
  const t = [12, 4, 9, 15, 7, 10, 6, 13, 8, 11];
  verif("E5 Q1", q1(t), 7);
  verif("E5 Q3", q3(t), 12);
  const lu = appels("tableau").find(([e, l]) => l[0] === "Valeur" && e.length === 11)[1].slice(1);
  vrai("E5 série rangée dessinée", JSON.stringify(lu) === JSON.stringify(range(t)));
}
{
  const s = deplie([8, 10, 12, 15], [2, 5, 2, 1]);
  verif("E6 effectif", s.length, 10);
  verif("E6 somme", somme(s), 105);
  verif("E6", moyenne(s), 10.5);
  verif("E6 piège", moyenne([8, 10, 12, 15]), 11.25);
}
{
  const b = boites.find((x) => x.min === 5 && x.max === 20);
  verif("E7 EI", b.q3 - b.q1, 6);
  verif("E7 étendue", b.max - b.min, 15);
}
vrai("E8 moyenne > médiane", 2800 > 2100);
verif("E8 écart", 2800 - 2100, 700);

/* ═══════════════ ★★ ═══════════════ */
{
  const centres = [5, 15, 25, 35], effs = [10, 20, 15, 5];
  verif("E9 effectif", somme(effs), 50);
  verif("E9 somme", somme(centres.map((c, i) => c * effs[i])), 900);
  verif("E9", somme(centres.map((c, i) => c * effs[i])) / 50, 18);
  verif("E9 piège", moyenne(centres), 20);
}
verif("E10", (20 * 2000 + 2420) / 21, 2020);
verif("E10 piège", (2000 + 2420) / 2, 2210);
{
  const t = [550, 600, 620, 650, 700, 720, 2460];
  verif("E11 somme", somme(t), 6300);
  verif("E11 moyenne", moyenne(t), 900);
  verif("E11 médiane", mediane(t), 650);
  verif("E11 écart", moyenne(t) - mediane(t), 250);
  vrai("E11 six sous la moyenne", t.filter((x) => x < moyenne(t)).length === 6);
}
{
  const t = [3, 8, 5, 12, 4, 6, 15, 7, 5, 9, 4, 10];
  verif("E12 médiane", mediane(t), 6.5);
  verif("E12 Q1", q1(t), 4);
  verif("E12 Q3", q3(t), 9);
  verif("E12 EI", q3(t) - q1(t), 5);
  boiteDe("E12", t);
}
{
  const A = boites.find((b) => b.label === "A"), B = boites.find((b) => b.label === "B");
  verif("E13 a A", A.mediane * 100, 1800);
  verif("E13 a B", B.mediane * 100, 2200);
  verif("E13 b A", (A.q3 - A.q1) * 100, 600);
  verif("E13 b B", (B.q3 - B.q1) * 100, 400);
  vrai("E13 c", B.q1 * 100 >= 2000 && A.q1 * 100 < 2000);
  vrai("E13 d", A.max === 40 && A.max > B.max);
}
{
  const s = deplie([0, 1, 2, 3, 4], [8, 6, 5, 4, 2]);
  verif("E14 effectif", s.length, 25);
  verif("E14 médiane", mediane(s), 1);
  verif("E14 Q1", q1(s), 0);
  verif("E14 Q3", q3(s), 2);
  verif("E14 somme", somme(s), 36);
  verif("E14 moyenne", moyenne(s), 1.44);
}
vrai("E15 moyenne > médiane", 300000 > 180000);
{
  const t = [4, 5, 8, 11, 15, 18, 21, 20, 17, 13, 8, 4];
  verif("E16 somme", somme(t), 144);
  verif("E16 moyenne", moyenne(t), 12);
  verif("E16 médiane", mediane(t), 12);
  verif("E16 Q1", q1(t), 5);
  verif("E16 Q3", q3(t), 17);
  vrai("E16 c au moins un quart ≥ 17", t.filter((x) => x >= 17).length >= 3);
  boiteDe("E16", t);
}

/* ═══════════════ ★★★ ═══════════════ */
{
  const t = [1600, 1700, 1700, 1800, 1900, 2000, 2100, 2400, 7300];
  verif("E17 somme", somme(t), 22500);
  verif("E17 moyenne", moyenne(t), 2500);
  verif("E17 médiane", mediane(t), 1900);
  verif("E17 b", t.filter((x) => x < moyenne(t)).length, 8);
  verif("E17 Q1", q1(t), 1700);
  verif("E17 Q3", q3(t), 2100);
  verif("E17 EI", q3(t) - q1(t), 400);
  const t2 = [...t.slice(0, 8), 8200];
  verif("E17 d moyenne", moyenne(t2), 2600);
  verif("E17 d médiane", mediane(t2), 1900);
  boiteDe("E17", t);
}
{
  const N = boites.find((b) => b.label === "Nord"), S = boites.find((b) => b.label === "Sud");
  verif("E18 a", N.mediane, S.mediane);
  verif("E18 b EI Nord", N.q3 - N.q1, 3);
  verif("E18 b EI Sud", S.q3 - S.q1, 5);
  verif("E18 b étendue Nord", N.max - N.min, 12);
  verif("E18 b étendue Sud", S.max - S.min, 9);
  vrai("E18 c Nord Q3 = 13", N.q3 === 13);
  vrai("E18 c Sud médiane ≤ 13 < Q3", S.mediane <= 13 && 13 < S.q3);
}
{
  const centres = [25, 35, 45, 55], effs = [12, 18, 14, 6];
  const d = appels("diagramme").find(([, data]) => data[0].label === "20-30 ans")[1];
  vrai("E19 effectifs dessinés", JSON.stringify(d.map((x) => x.value)) === JSON.stringify(effs));
  verif("E19 effectif", somme(effs), 50);
  verif("E19 somme", somme(centres.map((c, i) => c * effs[i])), 1890);
  verif("E19 a", 1890 / 50, 37.8);
  vrai("E19 b classe médiane", effs[0] < 25 && effs[0] + effs[1] >= 26);
  verif("E19 c", 1890 / 50 + 10, 47.8);
  verif("E19 d", (6 / 50) * 100, 12);
}
{
  const t = [10, 20, 20, 30, 40, 40, 50, 60, 130, 1000];
  const d = appels("diagramme").find(([, data]) => data[0].label === "D1")[1];
  vrai("E20 dons dessinés", JSON.stringify(d.map((x) => x.value)) === JSON.stringify(t));
  verif("E20 moyenne", moyenne(t), 140);
  verif("E20 médiane", mediane(t), 40);
  verif("E20 Q1", q1(t), 20);
  verif("E20 Q3", q3(t), 60);
  verif("E20 EI", q3(t) - q1(t), 40);
  const t2 = t.slice(0, 9);
  verif("E20 c somme", somme(t2), 400);
  vrai("E20 c moyenne ≈ 44", Math.round(moyenne(t2)) === 44);
  verif("E20 c médiane", mediane(t2), 40);
  vrai("E20 d neuf sous 140", t.filter((x) => x < 140).length === 9);
  vrai("E20 moyenne × plus de 3", moyenne(t) / moyenne(t2) > 3);
}

/* ═══════════════ contrôles de texte ═══════════════ */
{
  const connues = new Set(
    [...fs.readFileSync("lib/tutor-v4/knowledge/maths/premiere/microSkills.ts", "utf8").matchAll(/id: "(\w+)"/g)].map((m) => m[1]),
  );
  const citees = new Set();
  for (const m of src.matchAll(/micros: \[([^\]]*)\]/g)) for (const id of m[1].matchAll(/"(\w+)"/g)) citees.add(id[1]);
  for (const id of citees) connues.has(id) ? ok++ : ko.push(`micro inconnue ${id}`);
  const notion = ["auto_stat_moyenne", "auto_stat_mediane", "auto_stat_quartiles", "auto_stat_interpreter_indicateurs", "auto_stat_boites"];
  for (const id of notion) citees.has(id) ? ok++ : ko.push(`micro non couverte ${id}`);
  for (const id of citees) notion.includes(id) ? ok++ : ko.push(`micro hors notion ${id}`);
  for (const m of src.matchAll(/"((?:[^"\\]|\\.)*)"/g)) {
    const n = (m[1].replace(/\\\$/g, "").match(/\$/g) || []).length;
    if (n % 2) ko.push(`dollars impairs dans « ${m[1].slice(0, 60)}… »`);
    else ok++;
  }
  for (const m of src.matchAll(/label: "([^"]*)"/g)) (m[1].includes("$") ? ko.push(`$ dans une étiquette SVG : ${m[1]}`) : ok++);
  const nbEx = (src.match(/correction:/g) || []).length;
  nbEx === 20 ? ok++ : ko.push(`${nbEx} exercices au lieu de 20`);
  const niveaux = [...src.matchAll(/niveau: (\d)/g)].map((m) => m[1]).join("");
  niveaux === "123" ? ok++ : ko.push(`niveaux ${niveaux}`);
}

console.log(`${ok} vérifications justes, ${ko.length} fausses`);
ko.forEach((k) => console.log("  ✗", k));
process.exit(ko.length ? 1 : 0);
