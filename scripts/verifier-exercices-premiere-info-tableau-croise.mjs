// Recalcul indépendant de la feuille « Le tableau croisé » (1re, 28/09/2026) :
// lib/fiches-exercices/maths-premiere-info-tableau-croise.tsx.
// Chaque tableau est RELU dans le source et additionné dans les deux sens ; les
// « ? » et « … » de l'énoncé sont retrouvés à partir des autres cases et
// comparés au tableau complété et au corrigé ; la liste des randonneurs (5) est
// recomptée dans l'énoncé. Plus les contrôles communs et les règles de rendu.
// Usage : node scripts/verifier-exercices-premiere-info-tableau-croise.mjs

import { demarrer } from "./verifier-exercices-premiere-info-outils.mjs";

const V = demarrer("lib/fiches-exercices/maths-premiere-info-tableau-croise.tsx", "info_tableau_croise");
const { verif, vrai, dit, tableauxDe, tableauJuste, e } = V;

/** Le tableau complet de l'exercice k (le dernier relu), vérifié. */
const complet = (k, nom = `E${k}`) => {
  const t = tableauxDe(k).at(-1);
  tableauJuste(nom, t);
  return t;
};
/** Les cases connues de l'énoncé (figure) sont-elles celles du tableau complet ? */
const memesCases = (k, fig, t) => {
  fig.lignes.forEach((l, i) => l.forEach((x, j) => { if (j > 0 && /^\d+$/.test(x)) verif(`E${k} case (${i},${j}) recopiée`, Number(x), t.n(i, j)); }));
};

/* ═══════════════ ★ ═══════════════ */
{
  const t = complet(1);
  verif("E1 a", t.n(0, 1), 70);
  verif("E1 b", t.n(2, 2), 45);
  verif("E1 c", t.n(1, 3), 100);
  dit(1, "$70$", "$45$", "$100$");
}
{
  const t = complet(2);
  verif("E2 a", t.n(2, 1), 36);
  vrai("E2 b : seul le basket a autant de filles que de garçons", [0, 1, 2].filter((i) => t.n(i, 1) === t.n(i, 2)).join() === "1");
  verif("E2 c", t.n(0, 3), 80);
  dit(2, "$36$", "$80$");
}
{
  const [t] = tableauxDe(3);
  const femmesPartiel = t.n(0, 3) - t.n(0, 1);
  verif("E3 femmes partiel", femmesPartiel, 20);
  verif("E3 total partiel", femmesPartiel + t.n(1, 2), 30);
  verif("E3 contrôle", t.n(2, 3) - t.n(2, 1), 30);
  verif("E3 lignes", t.n(0, 3) + t.n(1, 3), t.n(2, 3));
  dit(3, "$80 - 60 = 20$", "$20 + 10 = 30$", "$180 - 150 = 30$");
}
{
  const [fig] = tableauxDe(4);
  const t = complet(4);
  memesCases(4, fig, t);
  verif("E4 total", t.n(2, 3), 400);
  dit(4, "$120 + 80 = 200$", "$60 + 140 = 200$", "$120 + 60 = 180$", "$80 + 140 = 220$", "$180 + 220 = 400$");
}
{
  // La liste est recomptée dans l'énoncé lui-même.
  // ⚠️ Le `\n` du source reste écrit « \n » dans la chaîne relue : pas de `\b`.
  const liste = e(5).match(/(?<![A-Z])[CL][ON](?![A-Za-z])/g) ?? [];
  verif("E5 douze réponses", liste.length, 12);
  const n = (x) => liste.filter((r) => r === x).length;
  const t = complet(5);
  verif("E5 CO", n("CO"), t.n(0, 1));
  verif("E5 CN", n("CN"), t.n(0, 2));
  verif("E5 LO", n("LO"), t.n(1, 1));
  verif("E5 LN", n("LN"), t.n(1, 2));
  dit(5, "CO $2$ fois, CN $4$ fois, LO $5$ fois, LN $1$ fois", "$6 + 6 = 12$", "$7 + 5 = 12$");
}
{
  const [t] = tableauxDe(6);
  verif("E6 cases d'effectifs", (t.lignes.length - 1) * (t.entetes.length - 2), 6);
  dit(6, "= 6$ cases");
}
{
  const t = complet(7);
  verif("E7 a", t.n(1, 2), 70);
  verif("E7 b", t.n(2, 2), 140);
  verif("E7 c", t.n(0, 3), 130);
  dit(7, "$70$", "$140$", "$130$");
}
{
  const [fig] = tableauxDe(8);
  const t = complet(8);
  memesCases(8, fig, t);
  verif("E8 élec panne", fig.n(0, 3) - fig.n(0, 1), t.n(0, 2));
  verif("E8 méca", fig.n(2, 3) - fig.n(0, 3), t.n(1, 3));
  verif("E8 méca service", fig.n(2, 1) - fig.n(0, 1), t.n(1, 1));
  verif("E8 panne", fig.n(2, 3) - fig.n(2, 1), t.n(2, 2));
  verif("E8 méca panne", t.n(1, 3) - t.n(1, 1), t.n(1, 2));
  dit(8, "$40 - 25 = 15$", "$100 - 40 = 60$", "$70 - 25 = 45$", "$100 - 70 = 30$", "$60 - 45 = 15$");
}

/* ═══════════════ ★★ ═══════════════ */
{
  const t = complet(9);
  verif("E9 électriques", 0.4 * 300, t.n(0, 3));
  verif("E9 élec utilitaires", 90, t.n(0, 1));
  verif("E9 utilitaires", 150, t.n(2, 1));
  verif("E9 c", t.n(1, 2), 120);
  dit(9, "$0{,}4 \\times 300 = 120$", "$120 - 90 = 30$", "$150 - 90 = 60$", "$180 - 60 = 120$");
}
{
  const [fig] = tableauxDe(10);
  const t = complet(10);
  memesCases(10, fig, t);
  verif("E10 femmes milieu", fig.n(0, 4) - fig.n(0, 1) - fig.n(0, 3), t.n(0, 2));
  verif("E10 hommes", fig.n(2, 4) - fig.n(0, 4), t.n(1, 4));
  dit(10, "$200 - 40 - 50 = 110$", "$500 - 200 = 300$", "$160 - 40 = 120$", "$80 - 50 = 30$", "$110 + 150 = 260$", "$120 + 150 + 30 = 300$");
}
{
  const t = complet(11);
  verif("E11 en ligne", 0.6 * 800, t.n(0, 3));
  verif("E11 satisfaits en ligne", 0.75 * t.n(0, 3), t.n(0, 1));
  verif("E11 satisfaits agence", 200, t.n(1, 1));
  verif("E11 b", t.n(2, 1), 560);
  verif("E11 c", t.n(1, 2), 120);
  vrai("E11 piège : 0,75 × 800 ≠ 360", 0.75 * 800 !== t.n(0, 1));
  dit(11, "$0{,}75 \\times 480 = 360$", "$360 + 200 = 560$");
}
{
  const [t] = tableauxDe(12);
  verif("E12 ligne A", t.n(0, 1) + t.n(0, 2) + t.n(0, 3), t.n(0, 4));
  verif("E12 ligne B", t.n(1, 1) + t.n(1, 2) + t.n(1, 3), t.n(1, 4));
  [1, 2, 3].forEach((j) => verif(`E12 colonne ${j}`, t.n(0, j) + t.n(1, j), t.n(2, j)));
  const vrai200 = t.n(0, 4) + t.n(1, 4);
  verif("E12 total vrai", vrai200, 200);
  vrai("E12 le total écrit est bien faux (210)", t.n(2, 4) === 210 && t.n(2, 4) !== vrai200);
  dit(12, "$80 + 80 + 40 = 200$", "il vaut $200$");
}
{
  const t = complet(13);
  verif("E13 a", t.n(0, 1), 150);
  verif("E13 b", t.n(2, 2), 210);
  verif("E13 c", t.n(1, 2), 120);
  verif("E13 d", t.n(0, 3), 240);
  dit(13, "$210$", "$120$", "$240$");
}
{
  const t = complet(14);
  verif("E14 plaine", 36 - 20, t.n(1, 3));
  verif("E14 montagne petites", 15, t.n(0, 1));
  verif("E14 plaine grandes", 12, t.n(1, 2));
  verif("E14 b", t.n(2, 1), 19);
  dit(14, "$36 - 20 = 16$", "$20 - 15 = 5$", "$16 - 12 = 4$", "$15 + 4 = 19$");
}
{
  const t = complet(15);
  verif("E15 total", 90 / 0.3, t.n(2, 3));
  verif("E15 jeunes = 30 %", 0.3 * t.n(2, 3), t.n(2, 1));
  verif("E15 mâles adultes", 120, t.n(0, 2));
  verif("E15 femelles", 150, t.n(1, 3));
  verif("E15 c", t.n(1, 1), 60);
  dit(15, "$90 \\div 0{,}3 = 300$", "$210 - 120 = 90$", "$150 - 120 = 30$", "$90 - 30 = 60$");
}
{
  const t = complet(16);
  verif("E16 a", t.n(2, 1), 230);
  verif("E16 b", t.n(0, 1), 80);
  vrai("E16 c : pas la plupart", t.n(0, 1) <= t.n(0, 4) / 2);
  verif("E16 c autrement", t.n(0, 2) + t.n(0, 3), 100);
  verif("E16 d", t.n(1, 3), 10);
  dit(16, "$80 < 90$", "$40 + 60 = 100$");
}

/* ═══════════════ ★★★ ═══════════════ */
{
  const t = complet(17);
  verif("E17 a", 1200 - 400 - 500, t.n(2, 3));
  verif("E17 jeunes recyclé", 0.25 * 400, t.n(0, 1));
  verif("E17 recyclé total", 330, t.n(3, 1));
  verif("E17 c", t.n(3, 2), 870);
  vrai("E17 d : 25-50 ans en tête", t.n(1, 1) > t.n(0, 1) && t.n(1, 1) > t.n(2, 1));
  dit(17, "$330 - 100 - 150 = 80$", "$300 + 350 + 220 = 870$", "$1\\,200 - 330 = 870$");
}
{
  const t = complet(18);
  verif("E18 adultes", 1200, t.n(0, 3));
  verif("E18 journée", 1100, t.n(2, 1));
  verif("E18 adultes journée", 700, t.n(0, 1));
  verif("E18 b", t.n(1, 2), 400);
  const recettes = [t.n(0, 1) * 50, t.n(1, 1) * 40, t.n(0, 2) * 250, t.n(1, 2) * 200];
  verif("E18 c", recettes.reduce((a, b) => a + b), 256000);
  verif("E18 d", Math.max(...recettes), t.n(0, 2) * 250);
  dit(18, "$700 \\times 50 = 35\\,000$", "$400 \\times 40 = 16\\,000$", "$500 \\times 250 = 125\\,000$", "$400 \\times 200 = 80\\,000$", "= 256\\,000$");
}
{
  const t = complet(19);
  verif("E19 autres 1900", 300 - 180 - 60, t.n(0, 3));
  verif("E19 b", 300 - 15 - 240, t.n(1, 2));
  verif("E19 c", t.n(0, 1) / t.n(1, 1), 12);
  dit(19, "$300 - 180 - 60 = 60$", "$300 - 15 - 240 = 45$", "$180 \\div 15 = 12$");
}
{
  const t = complet(20);
  verif("E20 voiture seule", 0.4 * 5000, t.n(2, 1));
  verif("E20 train", 1500, t.n(2, 2));
  verif("E20 covoiturage", 5000 - 2000 - 1500, t.n(2, 3));
  verif("E20 proches", 2000, t.n(0, 4));
  verif("E20 c", t.n(1, 3), 1000);
  verif("E20 d", t.n(0, 1) / 60, 20);
  dit(20, "$2\\,000 - 1\\,200 - 300 = 500$", "$1\\,500 - 500 = 1\\,000$", "$1\\,200 \\div 60 = 20$");
}

V.reglesDeRendu();
V.finir();
