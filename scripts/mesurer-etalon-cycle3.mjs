/* ─── L'ÉCART À L'ÉTALON, FICHE PAR FICHE ─────────────────────────────────────
   Écrit le 31/08/2026. Frédéric : « on utilise le même étalon que pour cm1 et
   cm2 et 6e ». Avant de retoucher 57 fiches, il faut savoir laquelle dévie et de
   combien — sinon on réécrit au jugé.

   L'ÉTALON, fixé sur `francais-cm1-fluence-lecture` le 30/08 :
     propriétés 6 · méthode 3 · exemples 4 · pièges 5 · à retenir 5
     entrainement 5 · usages 0 · formule absente
     aucune capitale d'emphase · texte projeté ≤ 250 signes

   Usage : node scripts/mesurer-etalon-cycle3.mjs [cm1|cm2|6e]
*/

import { readFileSync, readdirSync } from "node:fs";

const ETALON = {
  proprietes: 6,
  methode: 3,
  exemples: 4,
  pieges: 5,
  aRetenir: 5,
  entrainement: 5,
};
const PLAFOND_PROJETE = 250;

const CLASSES = process.argv[2] ? [process.argv[2]] : ["cm1", "cm2", "6e"];

/** Compte les entrées d'un tableau de premier niveau de la fiche.
 *
 *  ⚠️ LE PIÈGE, ET IL M'A FAIT MENTIR SUR L'ÉTALON LUI-MÊME (31/08/2026) : un
 *  tableau VIDE s'écrit `usages: [],` sur une seule ligne. La première version
 *  cherchait la fermeture `\n  ],` à partir du début du bloc — elle tombait donc
 *  sur celle du bloc SUIVANT et comptait ses entrées. Résultat : « usages 4>0 »
 *  sur une fiche où je les avais vidés la veille. On teste le cas vide d'abord. */
function compterBloc(src, nom) {
  if (new RegExp(`\\n  ${nom}: \\[\\s*\\],`).test(src)) return 0;
  const debut = src.indexOf(`\n  ${nom}: [`);
  if (debut === -1) return null;
  const fin = src.indexOf("\n  ],", debut);
  if (fin === -1) return null;
  const corps = src.slice(debut, fin);
  const objets = (corps.match(/\n    \{/g) || []).length;
  if (objets) return objets;
  return (corps.match(/\n    "/g) || []).length;
}

/** Les chaines d'un champ donné, échappements compris. */
function champs(src, nom) {
  const re = new RegExp(`${nom}:\\s*\\n?\\s*"((?:[^"\\\\]|\\\\.)*)"`, "g");
  return [...src.matchAll(re)].map((m) => m[1]);
}

/* ⭐ `--details <fiche>` montre OÙ sont les défauts, pas seulement combien.
   Frédéric, le 31/08 : « il faut privilégier la qualité pas la vitesse » — on
   ne passe donc pas 57 fiches à la moulinette, on les reprend une par une. Le
   script sert à savoir quoi corriger, la correction reste à la main. */
const DETAILS = process.argv.includes("--details");

const lignes = [];
for (const classe of CLASSES) {
  const fichiers = readdirSync("lib/fiches")
    .filter((f) => f.startsWith(`francais-${classe}-`) && f.endsWith(".tsx"))
    .sort();

  for (const f of fichiers) {
    const src = readFileSync(`lib/fiches/${f}`, "utf8");
    const ecarts = [];

    for (const [bloc, cible] of Object.entries(ETALON)) {
      const n = compterBloc(src, bloc);
      if (n !== null && n > cible) ecarts.push(`${bloc} ${n}>${cible}`);
    }
    const usages = compterBloc(src, "usages");
    if (usages) ecarts.push(`usages ${usages}>0`);
    if (/\n  formule: \{/.test(src)) ecarts.push("formule");

    // Capitales d'emphase dans ce que l'élève lit.
    const lus = ["texte", "solution", "detail", "legende", "correction", "accroche"]
      .flatMap((c) => champs(src, c));
    const caps = lus.flatMap((t) => t.match(/\b[A-ZÀ-ÜŒ]{3,}\b/g) || []).length;
    if (caps) ecarts.push(`${caps} capitales`);

    // Textes projetés en mode classe : trop longs pour une diapo.
    const projetes = [
      ...champs(src, "texte"),
      ...champs(src, "solution"),
      ...champs(src, "accroche"),
    ].filter((t) => t.length > PLAFOND_PROJETE).length;
    if (projetes) ecarts.push(`${projetes} textes >${PLAFOND_PROJETE}`);

    lignes.push({
      classe,
      fiche: f.replace(/^francais-|\.tsx$/g, ""),
      ecarts,
      // Ce qu'il faut réécrire, texte par texte : le script dit OÙ.
      capitales: lus
        .map((t) => ({ t, m: t.match(/\b[A-ZÀ-ÜŒ]{3,}\b/g) }))
        .filter((x) => x.m)
        .map((x) => `${x.m.join(", ")} — ${x.t.slice(0, 58)}`),
      tropLongs: [
        ...champs(src, "texte"),
        ...champs(src, "solution"),
        ...champs(src, "accroche"),
      ]
        .filter((t) => t.length > PLAFOND_PROJETE)
        .map((t) => `${t.length} signes — ${t.slice(0, 58)}`),
    });
  }
}

const conformes = lignes.filter((l) => !l.ecarts.length);
console.log(`\nÉCART À L'ÉTALON · ${CLASSES.join(", ")}`);
console.log("─".repeat(74));
for (const l of lignes) {
  const etat = l.ecarts.length ? l.ecarts.join(" · ") : "conforme";
  console.log(`  ${l.ecarts.length ? "⛔" : "✅"} ${l.fiche.padEnd(34)} ${etat}`);
  if (DETAILS) {
    for (const c of l.capitales) console.log(`        capitales · ${c}`);
    for (const t of l.tropLongs) console.log(`        projeté   · ${t}`);
  }
}
console.log(
  `\n${conformes.length}/${lignes.length} conformes · ${lignes.length - conformes.length} à reprendre\n`,
);
