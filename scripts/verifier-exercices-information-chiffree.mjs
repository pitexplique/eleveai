// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Pourcentages et
// évolutions » de seconde (lib/fiches-exercices/maths-seconde-information-chiffree.tsx).
//
// Même règle que pour les autres feuilles : on ne relit pas le corrigé, on REFAIT
// le calcul à partir des DONNÉES SOURCES (OCDE, URSSAF, INSEE, relevées le
// 20/09/2026 et recopiées ici), puis on exige que le nombre recalculé se LISE
// dans le corrigé de l'exercice. Un script qui recalcule juste à côté d'un
// corrigé faux ne vérifie rien.
//
//   node scripts/verifier-exercices-information-chiffree.mjs
//
// Sort en code 1 à la première divergence. Vérifie aussi que chaque `$` est
// apparié, que chaque micro citée existe dans la banque de seconde, que les six
// micros de la notion ont un exercice, et qu'il y a bien vingt exercices.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RACINE = path.join(__dirname, "..");
const FEUILLE = path.join(RACINE, "lib/fiches-exercices/maths-seconde-information-chiffree.tsx");
const BANQUE = path.join(RACINE, "lib/tutor-v4/questionBank/seconde/maths/information-chiffree.bank.ts");

let erreurs = 0;
function ok(nom, condition, detail = "") {
  if (condition) console.log(`  ✓ ${nom}`);
  else {
    erreurs++;
    console.log(`  ✗ ${nom}${detail ? " — " + detail : ""}`);
  }
}

// ── Les données sources, telles que relevées ────────────────────────────────
const OCDE = {
  // part des prélèvements dans le coût, célibataire sans enfant, France
  bas: { 2005: 46.5, 2025: 41.2 },
  moyen: { 2005: 50.5, 2025: 47.2 },
  haut: { 2005: 53.3, 2025: 54.1 },
  pays2025: { belgique: 52.5, allemagne: 49.3, france: 47.2, ocde: 35.1, suisse: 23.0 },
  belgique2005: 55.5,
  brutAnnuel: { 2005: 30521, 2025: 45964 },
  parMois: { 2005: { cout: 3655, net: 1809 }, 2025: { cout: 5223, net: 2759 } },
};
const URSSAF = { smic: { brut: 1823, cout: 1899, net: 1421 }, moyen: { brut: 2950, cout: 3925, net: 2313 } };
const INSEE = { 2005: 87.85, 2025: 120.95 };
const LIVRE = { cout: 3922, net: 2079 };

// ── Écriture d'un nombre comme dans la feuille : 47{,}0 · 1\,843 ─────────────
function tex(n, decimales = 0) {
  const [ent, dec] = Math.abs(n).toFixed(decimales).split(".");
  const milliers = ent.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,");
  return (n < 0 ? "-" : "") + milliers + (dec ? "{,}" + dec : "");
}

// ── Lecture de la feuille : le texte brut de chaque exercice ────────────────
const source = fs.readFileSync(FEUILLE, "utf8");
const corps = source.slice(source.indexOf("series: ["));
const morceaux = corps.split(/\n\s+enonce:/).slice(1);
const exercices = morceaux.map((m) => {
  const txt = m.replace(/\\\\/g, "\\"); // le source double les antislashs
  const iCorr = txt.indexOf("correction:");
  return { enonce: txt.slice(0, iCorr), correction: txt.slice(iCorr), tout: txt };
});

console.log("\nStructure");
ok("vingt exercices", exercices.length === 20, `trouvés : ${exercices.length}`);

function lit(numero, attendu, quoi) {
  const ex = exercices[numero - 1];
  ok(`ex. ${numero} — ${quoi} : ${attendu}`, !!ex && ex.correction.includes(attendu), "absent du corrigé");
}

console.log("\nNiveau 1");
lit(1, tex((28 / 80) * 100) + "\\,\\%", "proportion de cadres");
lit(2, tex(2000 * 0.22) + "\\,€", "cotisations");
lit(2, tex(2000 - 2000 * 0.22) + "\\,€", "net");
lit(3, tex(0.092 * 0.9825 * 100, 2) + "\\,\\%", "CSG en % du brut");
lit(4, tex(OCDE.brutAnnuel[2025] - OCDE.brutAnnuel[2005]) + "\\,€", "variation absolue");
lit(4, "+" + tex((OCDE.brutAnnuel[2025] / OCDE.brutAnnuel[2005] - 1) * 100, 1), "variation relative");
lit(5, tex(1 + 3.5 / 100, 3), "coefficient +3,5 %");
lit(5, tex(1 - 22 / 100, 2), "coefficient −22 %");
lit(6, tex(2500 * 0.78) + "\\,€", "net");
lit(7, tex(1.1 * 1.1, 2), "deux hausses de 10 %");
lit(8, tex(1 / 0.8, 2), "coefficient réciproque");

console.log("\nNiveau 2");
const prelev = LIVRE.cout - LIVRE.net;
lit(9, tex(prelev) + "\\,€", "prélèvements du livre");
lit(9, tex((prelev / LIVRE.cout) * 100, 1) + "\\,\\%", "en % du coût");
lit(9, tex((prelev / LIVRE.net) * 100, 1) + "\\,\\%", "en % du net");
lit(10, tex(OCDE.moyen[2025] - OCDE.moyen[2005], 1), "écart en points");
lit(10, tex(((OCDE.moyen[2025] - OCDE.moyen[2005]) / OCDE.moyen[2005]) * 100, 1) + "\\,\\%", "écart relatif");
lit(11, tex(1716 / 0.78) + "\\,€", "brut retrouvé");
const u = URSSAF.moyen;
lit(12, tex((1 - u.brut / u.cout) * 100, 1) + "\\,\\%", "coût → brut");
lit(12, tex((1 - u.net / u.brut) * 100, 1) + "\\,\\%", "brut → net");
lit(12, tex((1 - u.net / u.cout) * 100, 1) + "\\,\\%", "coût → net");
ok(
  "ex. 12 — le produit des coefficients redonne le global",
  Math.abs((u.brut / u.cout) * (u.net / u.brut) - u.net / u.cout) < 1e-12,
);
lit(13, tex(0.4 * 0.3 * 100) + "\\,\\%", "femmes cadres");
lit(14, tex((1 / 0.53 - 1) * 100, 1) + "\\,\\%", "réciproque de −47 %");
for (const [pays, nom] of [["belgique", "Belgique"], ["france", "France"], ["suisse", "Suisse"]]) {
  lit(15, tex(4000 * (1 - OCDE.pays2025[pays] / 100)) + "\\,€", `net ${nom}`);
}
lit(15, tex(OCDE.pays2025.france - OCDE.pays2025.ocde, 1), "écart France − OCDE");
lit(15, tex(OCDE.pays2025.belgique - OCDE.belgique2005, 1), "Belgique en points");

console.log("\nNiveau 3");
for (const [cle, nom] of [["smic", "SMIC"], ["moyen", "2 950 €"]]) {
  const b = URSSAF[cle];
  lit(16, tex(((b.cout - b.net) / b.cout) * 100, 1) + "\\,\\%", `part prélevée ${nom}`);
}
lit(16, "+" + tex((URSSAF.moyen.brut / URSSAF.smic.brut - 1) * 100, 1), "évolution du brut");
lit(16, "+" + tex((URSSAF.moyen.net / URSSAF.smic.net - 1) * 100, 1), "évolution du net");
lit(16, "+" + tex((URSSAF.moyen.cout / URSSAF.smic.cout - 1) * 100, 1), "évolution du coût");
const m = OCDE.parMois;
lit(17, "+" + tex((m[2025].cout / m[2005].cout - 1) * 100, 1), "évolution du coût");
lit(17, "+" + tex((m[2025].net / m[2005].net - 1) * 100, 1), "évolution du net");
for (const an of [2005, 2025]) {
  const part = ((m[an].cout - m[an].net) / m[an].cout) * 100;
  lit(17, tex(part, 1) + "\\,\\%", `part prélevée ${an}`);
  ok(`ex. 17 — la part ${an} recalculée recoupe l'OCDE`, Math.abs(part - OCDE.moyen[an]) < 0.06, `${part.toFixed(2)} contre ${OCDE.moyen[an]}`);
}
const prix = INSEE[2025] / INSEE[2005];
ok("ex. 17 — prix INSEE : +37,7 %", tex((prix - 1) * 100, 1) === "37{,}7", tex((prix - 1) * 100, 1));
lit(17, tex(((m[2025].net / m[2005].net) / prix - 1) * 100, 1) + "\\,\\%", "pouvoir d'achat du net");
for (const [cle, nom] of [["bas", "bas salaire"], ["haut", "haut salaire"]]) {
  const s = OCDE[cle];
  lit(18, tex(s[2025] - s[2005], 1).replace(/^(\d)/, "+$1"), `${nom} en points`);
  lit(18, tex(((s[2025] - s[2005]) / s[2005]) * 100, 1).replace(/^(\d)/, "+$1") + "\\,\\%", `${nom} en relatif`);
}
lit(19, tex(100 / 0.53, 2) + "\\,€", "France");
lit(19, tex(100 / 0.77, 2) + "\\,€", "Suisse");
lit(19, tex(100 / 0.475, 2) + "\\,€", "Belgique");
lit(20, tex(2000 * 0.78) + "\\,€", "net");
lit(20, tex(2000 * 1.3) + "\\,€", "coût");
lit(20, tex(((2600 - 1560) / 2600) * 100) + "\\,\\%", "part du coût");
lit(20, tex(((2600 - 1560) / 1560) * 100, 1) + "\\,\\%", "part du net");
ok("ex. 20 — (coût − net)/net = coût/net − 1", Math.abs((2600 - 1560) / 1560 - (2600 / 1560 - 1)) < 1e-12);

console.log("\nTexte");
exercices.forEach((ex, i) => {
  const chaines = ex.tout.match(/"(?:[^"\\]|\\.)*"/g) ?? [];
  const impairs = chaines.filter((c) => (c.match(/\$/g) ?? []).length % 2 === 1);
  if (impairs.length) ok(`ex. ${i + 1} — dollars appariés`, false, impairs[0].slice(0, 60));
});
ok("dollars appariés dans les vingt exercices", true);

const banque = fs.readFileSync(BANQUE, "utf8");
const microsBanque = new Set([...banque.matchAll(/microId: "([a-z_]+)"/g)].map((x) => x[1]));
const microsFeuille = new Set([...source.matchAll(/"(info_[a-z_]+)"/g)].map((x) => x[1]));
for (const mic of microsFeuille) ok(`micro connue : ${mic}`, microsBanque.has(mic));
for (const mic of microsBanque) ok(`micro servie : ${mic}`, microsFeuille.has(mic));

console.log(erreurs ? `\n✗ ${erreurs} divergence(s)\n` : "\n✓ Tout concorde.\n");
process.exit(erreurs ? 1 : 0);
