// Recalcul indépendant de la feuille « Fréquences marginales et
// conditionnelles » (1re, 28/09/2026) : lib/fiches-exercices/maths-premiere-info-frequences.tsx.
// Les tableaux sont RELUS dans le source ; chaque fréquence est recalculée à
// partir de SES cases (numérateur et dénominateur pris dans le tableau, pas
// recopiés), puis cherchée dans le corrigé sous la forme « \dfrac{a}{b} = v ».
// Les tableaux reconstruits (4, 10, 12, 14, 20) sont refaits depuis l'énoncé ;
// les diagrammes des corrigés relus et comparés aux fréquences.
// Usage : node scripts/verifier-exercices-premiere-info-frequences.mjs

import { demarrer } from "./verifier-exercices-premiere-info-outils.mjs";

const V = demarrer("lib/fiches-exercices/maths-premiere-info-frequences.tsx", "info_frequences");
const { verif, vrai, dit, tableauxDe, tableauJuste, frequence: f, appels, bloc } = V;

const T = (k, i = 0, juste = true) => {
  const t = tableauxDe(k)[i];
  if (juste) tableauJuste(`E${k}`, t);
  return t;
};
const barres = (k) => {
  const [[, data]] = appels("diagramme", bloc(k));
  return (l) => data.find((d) => d.label === l)?.value;
};

/* ═══════════════ ★ ═══════════════ */
{
  const t = T(1);
  f(1, t.n(0, 3), t.n(2, 3), 0.6);
  f(1, t.n(2, 1), t.n(2, 3), 0.5);
}
f(2, 300, 1200, 0.25);
f(2, 120, 300, 0.4);
f(2, 120, 1200, 0.1);
{
  const [t] = tableauxDe(2);
  verif("E2 dessin : internes", t.n(0, 3), 300);
  verif("E2 dessin : internes à plus de 50 km", t.n(0, 1), 120);
  verif("E2 dessin : ligne internes", t.n(0, 1) + t.n(0, 2), t.n(0, 3));
  verif("E2 dessin : total", t.n(2, 3), 1200);
  verif("E2 dessin : externes", t.n(2, 3) - t.n(0, 3), t.n(1, 3));
}
{
  const t = T(3);
  f(3, t.n(0, 1), t.n(0, 3), 0.6);
  f(3, t.n(1, 1), t.n(1, 3), 0.1);
  f(3, t.n(0, 1), t.n(2, 1), 0.9);
}
{
  const t = T(4);
  verif("E4 piste", t.n(0, 3), 200);
  verif("E4 piste graves", t.n(0, 1), 40);
  verif("E4 autres", t.n(1, 3), 800);
  verif("E4 autres graves", t.n(1, 1), 240);
  f(4, t.n(0, 1), t.n(0, 3), 0.2);
  f(4, t.n(1, 1), t.n(1, 3), 0.3);
}
{
  const t = T(5);
  f(5, t.n(0, 1), t.n(2, 3), 0.15);
  f(5, t.n(0, 1), t.n(0, 3), 0.2);
  f(5, t.n(1, 1), t.n(1, 3), 0.5);
}
{
  const t = T(6);
  f(6, t.n(3, 2), t.n(3, 3), 0.31);
  verif("E6 b", t.n(2, 3) / t.n(3, 3), 1 / 3);
  dit(6, "\\dfrac{120}{360} = \\dfrac{1}{3} \\approx 0{,}33");
  f(6, t.n(2, 2), t.n(2, 3), 0.5);
}
{
  f(7, 45, 150, 0.3);
  f(7, 60, 240, 0.25);
  const b = barres(7);
  verif("E7 barre A", b("Club A (%)"), 30);
  verif("E7 barre B", b("Club B (%)"), 25);
}
{
  const t = T(8);
  f(8, t.n(1, 2), t.n(2, 2), 0.5);
  f(8, t.n(1, 2), t.n(1, 3), 0.6);
  f(8, t.n(1, 3), t.n(2, 3), 0.25);
}

/* ═══════════════ ★★ ═══════════════ */
{
  const t = T(9);
  f(9, t.n(1, 1), t.n(2, 1), 0.56);
  vrai("E9 majorité sans plan", t.n(1, 1) / t.n(2, 1) > 0.5);
  f(9, t.n(0, 1), t.n(0, 3), 0.8);
  f(9, t.n(1, 1), t.n(1, 3), 0.5);
  const b = barres(9);
  verif("E9 barre avec", b("Avec plan (%)"), 80);
  verif("E9 barre sans", b("Sans plan (%)"), 50);
}
{
  const t = T(10);
  verif("E10 moins de 35", t.n(0, 3), 320);
  verif("E10 jeunes ailleurs", t.n(0, 1), 240);
  verif("E10 ailleurs", t.n(2, 1), 400);
  verif("E10 total", t.n(2, 3), 800);
  f(10, t.n(0, 3), t.n(2, 3), 0.4);
  f(10, t.n(2, 1), t.n(2, 3), 0.5);
  f(10, t.n(0, 1), t.n(0, 3), 0.75);
  f(10, t.n(1, 1), t.n(1, 3), 0.33);
  dit(10, "$800 - 320 = 480$", "$320 - 240 = 80$", "$400 - 240 = 160$", "$480 - 160 = 320$");
}
{
  const t = T(11);
  const fr = T(11, 1, false);
  [0, 1].forEach((i) => [1, 2].forEach((j) => verif(`E11 fréquence (${i},${j})`, fr.n(i, j), t.n(i, j) / t.n(i, 3))));
  [0, 1].forEach((i) => verif(`E11 ligne ${i} fait 1`, fr.n(i, 1) + fr.n(i, 2), 1));
  f(11, 120, 300, 0.4);
  f(11, 180, 300, 0.6);
  f(11, 160, 200, 0.8);
  f(11, 40, 200, 0.2);
}
{
  const t = T(12);
  verif("E12 A", 0.3 * 1000, t.n(0, 3));
  verif("E12 décalés A", 0.4 * t.n(0, 3), t.n(0, 1));
  verif("E12 décalés B", 0.1 * t.n(1, 3), t.n(1, 1));
  f(12, t.n(2, 1), t.n(2, 3), 0.19);
  f(12, t.n(0, 1), t.n(2, 1), 0.63);
  dit(12, "$0{,}4 \\times 300 = 120$", "$0{,}1 \\times 700 = 70$", "$120 + 70 = 190$");
}
{
  const t = T(13);
  f(13, t.n(0, 1), t.n(0, 3), 0.75);
  f(13, t.n(1, 1), t.n(1, 3), 0.4);
  f(13, t.n(2, 1), t.n(2, 3), 0.54);
  verif("E13 la fausse moyenne", (0.75 + 0.4) / 2, 0.575);
  vrai("E13 la fausse moyenne diffère", Math.abs(0.575 - t.n(2, 1) / t.n(2, 3)) > 0.01);
}
{
  const t = T(14);
  verif("E14 télétravail", t.n(0, 3), 150);
  verif("E14 satisfaits télé", t.n(0, 1), 120);
  verif("E14 satisfaits", t.n(2, 1), 270);
  verif("E14 a", t.n(1, 1), 150);
  f(14, t.n(0, 1), t.n(0, 3), 0.8);
  f(14, t.n(1, 1), t.n(1, 3), 0.6);
  dit(14, "$270 - 120 = 150$", "$400 - 150 = 250$");
}
{
  const t = T(15);
  f(15, t.n(2, 1), t.n(2, 3), 0.85);
  f(15, t.n(0, 2), t.n(3, 2), 0.47);
  f(15, t.n(3, 1), t.n(3, 3), 0.72);
  f(15, t.n(0, 1), t.n(0, 3), 0.6);
  f(15, t.n(1, 1), t.n(1, 3), 0.7);
  vrai("E15 les trois classes ont le même effectif", t.n(0, 3) === t.n(1, 3) && t.n(1, 3) === t.n(2, 3));
}
{
  const t = T(16);
  f(16, t.n(0, 1), t.n(0, 3), 0.7);
  f(16, t.n(1, 1), t.n(1, 3), 0.3);
  const b = barres(16);
  verif("E16 barre écran", b("Écran (%)"), 70);
  verif("E16 barre sans", b("Sans écran (%)"), 30);
}

/* ═══════════════ ★★★ ═══════════════ */
{
  const t = T(17);
  f(17, t.n(2, 1), t.n(2, 3), 0.22);
  f(17, t.n(0, 1), t.n(0, 3), 0.3);
  f(17, t.n(1, 1), t.n(1, 3), 0.1);
  f(17, t.n(1, 1), t.n(2, 1), 0.18);
  verif("E17 trois fois", t.n(0, 1) / t.n(0, 3) / (t.n(1, 1) / t.n(1, 3)), 3);
}
{
  const [t] = tableauxDe(18);
  const lu = (i, j) => t.lignes[i][j].split(" sur ").map(Number);
  const [bp, cp, br, cr] = [lu(0, 1), lu(0, 2), lu(1, 1), lu(1, 2)];
  f(18, ...bp, 0.3);
  f(18, ...cp, 0.2);
  f(18, ...br, 0.9);
  f(18, ...cr, 0.8);
  vrai("E18 le bio gagne sur chaque sol", bp[0] / bp[1] > cp[0] / cp[1] && br[0] / br[1] > cr[0] / cr[1]);
  f(18, bp[0] + br[0], bp[1] + br[1], 0.5);
  f(18, cp[0] + cr[0], cp[1] + cr[1], 0.6);
  vrai("E18 et perd au total", (bp[0] + br[0]) / (bp[1] + br[1]) < (cp[0] + cr[0]) / (cp[1] + cr[1]));
  verif("E18 bio sur sol pauvre", bp[1], 100);
}
{
  const groupes = [[60, 120], [156, 240], [168, 240]];
  verif("E19 effectif", groupes.reduce((s, [, n]) => s + n, 0), 600);
  f(19, 60 + 156 + 168, 600, 0.64);
  f(19, 60, 120, 0.5);
  f(19, 156, 240, 0.65);
  f(19, 168, 240, 0.7);
  const b = barres(19);
  verif("E19 barre 1", b("< 2 km"), 50);
  verif("E19 barre 2", b("2 à 10 km"), 65);
  verif("E19 barre 3", b("> 10 km"), 70);
  vrai("E19 énoncé", V.e(19).includes("$156$ y sont favorables") && V.e(19).includes("$168$ y sont favorables"));
}
{
  const t = T(20);
  verif("E20 s'échauffent", (2 / 3) * 240, t.n(0, 3));
  verif("E20 blessés échauffés", 0.1 * t.n(0, 3), t.n(0, 1));
  verif("E20 blessés", t.n(2, 1), 40);
  f(20, t.n(0, 1), t.n(0, 3), 0.1);
  f(20, t.n(1, 1), t.n(1, 3), 0.3);
  f(20, t.n(1, 1), t.n(2, 1), 0.6);
  verif("E20 d", t.n(1, 1) / t.n(1, 3) / (t.n(0, 1) / t.n(0, 3)), 3);
}

V.reglesDeRendu();
V.finir();
