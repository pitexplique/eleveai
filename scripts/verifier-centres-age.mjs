#!/usr/bin/env node
// verifier-centres-age.mjs — LE CENTRE D'INTÉRÊT SE VÉRIFIE PAR ÂGE
//
// Frédéric, 15/11/2026 : « les centres d'intérêts doivent être vérifiés par âge ».
// Un centre de la liste fermée `lib/videos/centres-interet.ts` n'est pas valable à
// tout âge : chaque entrée porte ses `tranches`. Ce script relit les manifestes et
// signale tout `"centres"` hors de la tranche de la classe de la vidéo.
//
//   node scripts/verifier-centres-age.mjs                    (tous les manifestes connus)
//   node scripts/verifier-centres-age.mjs manim/poste2/manifeste-4e.json
//
// Sortie : une ligne par écart, puis « 0 centre hors tranche » si tout va bien.
// Code de sortie 1 s'il reste un écart (utilisable dans une passe finale).

import { readFileSync, existsSync } from "node:fs";

const MANIFESTES_PAR_DEFAUT = [
  "manim/manifeste-youtube.json",
  "manim/poste2/manifeste-5e.json",
  "manim/poste2/manifeste-suites.json",
  "manim/poste2/manifeste-4e.json",
  "manim/poste2/manifeste-3e.json",
];

/** La tranche d'âge de chaque classe (table de `manim/centres-interet-par-age.md`). */
const TRANCHE_PAR_CLASSE = {
  cp: "6-8", ce1: "6-8", ce2: "6-8",
  cm1: "9-11", cm2: "9-11", "6e": "9-11",
  "5e": "12-14", "4e": "12-14", "3e": "12-14",
  // ⚠️ `terminale-spe` MANQUAIT (23/11/2026), alors que `premiere-spe` y était : les
  // vidéos de terminale spé sortaient toutes en « classe inconnue — centres non
  // vérifiables », c'est-à-dire SAUTÉES sans écart. Mesuré en versant les neuf vidéos de
  // la série « géométrie dans l'espace » : les 185 écarts n'ont pas bougé et les
  // « classe inconnue » sont passées de 28 à 37, soit exactement nos neuf. Un contrôle
  // qui saute en silence ce qu'on vient d'écrire ne prouve rien.
  seconde: "15-18", premiere: "15-18", "premiere-spe": "15-18", terminale: "15-18",
  "terminale-spe": "15-18", stmg: "15-18",
  crpe: "adultes", adultes: "adultes",
};

/** Les tranches de chaque centre, lues dans la liste fermée (source de vérité). */
function lireCentres() {
  const src = readFileSync("lib/videos/centres-interet.ts", "utf8");
  const bloc = src.slice(src.indexOf("CENTRES_INTERET"));
  const centres = new Map();
  const re = /id:\s*"([a-z-]+)"[\s\S]*?tranches:\s*\[([^\]]*)\]/g;
  let m;
  while ((m = re.exec(bloc))) {
    const tranches = [...m[2].matchAll(/"([^"]+)"/g)].map((t) => t[1]);
    centres.set(m[1], tranches);
  }
  return centres;
}

function videosDe(chemin) {
  const d = JSON.parse(readFileSync(chemin, "utf8"));
  if (Array.isArray(d)) return d;
  if (Array.isArray(d.videos)) return d.videos;
  // manifeste du 2e poste : un objet { id: entrée }
  return Object.entries(d)
    .filter(([, v]) => v && typeof v === "object" && !Array.isArray(v))
    .map(([id, v]) => ({ id, ...v }));
}

/** La classe d'une vidéo : le champ `classe`, sinon le 1er segment du chemin du fichier. */
function classeDe(v) {
  if (v.classe) return String(v.classe);
  const f = String(v.fichier ?? "");
  const seg = f.split("/")[0];
  return seg in TRANCHE_PAR_CLASSE ? seg : "";
}

const centres = lireCentres();
const chemins = (process.argv.slice(2).length ? process.argv.slice(2) : MANIFESTES_PAR_DEFAUT).filter(existsSync);
if (!chemins.length) {
  console.error("Aucun manifeste à lire.");
  process.exit(1);
}

let ecarts = 0;
let examinees = 0;
let sansCentre = 0;
let sansClasse = 0;

for (const chemin of chemins) {
  for (const v of videosDe(chemin)) {
    const liste = v.centres;
    if (!Array.isArray(liste) || !liste.length) { sansCentre++; continue; }
    const classe = classeDe(v);
    const tranche = TRANCHE_PAR_CLASSE[classe];
    if (!tranche) { sansClasse++; console.log(`? ${chemin} · ${v.id} : classe inconnue (${classe || "aucune"}) — centres non vérifiables`); continue; }
    examinees++;
    for (const c of liste) {
      const tr = centres.get(c);
      if (!tr) { ecarts++; console.log(`✗ ${chemin} · ${v.id} (${classe}) : « ${c} » n'est pas dans la liste fermée`); continue; }
      if (!tr.includes(tranche)) {
        ecarts++;
        console.log(`✗ ${chemin} · ${v.id} (${classe}, tranche ${tranche}) : « ${c} » n'ouvre qu'en ${tr.join(", ")}`);
      }
    }
  }
}

console.log(
  `\n${examinees} vidéos vérifiées · ${ecarts === 0 ? "0 centre hors tranche" : `${ecarts} centre(s) hors tranche`}` +
    ` · ${sansCentre} sans champ "centres" (vidéos d'avant le 24/10 : normal)` +
    (sansClasse ? ` · ${sansClasse} de classe inconnue` : ""),
);
process.exit(ecarts === 0 ? 0 : 1);
