// Tri de la file YouTube (15/11/2026, choix de Frédéric : trier plutôt qu'ajouter des créneaux).
// Ne touche QUE deux champs du manifeste : `prioritaire` (retiré) et `plus_tard` (posé).
// ⛔ Le manifeste est partagé entre sessions : relu juste avant d'écrire, rien d'autre modifié.
//
//   node scripts/trier-file-youtube.mjs                 → rapport seul
//   node scripts/trier-file-youtube.mjs --ecrire        → écrit manim/manifeste-youtube.json
//   node scripts/trier-file-youtube.mjs --vers <chemin> → écrit une copie (pour la simulation)
//   --depuis <chemin> : part de cette copie du manifeste (ex. `git show HEAD:...`) au lieu du fichier courant
//
// Règles : voir `choixDuJour` dans publier-youtube.mjs.
//  - `prioritaire` sans date : gardé seulement pour 6e et 4e (les classes de Frédéric).
//    (Les vidéos datées passent devant de toute façon : leur drapeau n'y change rien.)
//  - `plus_tard` : paysages SANS date, non prioritaires, pas encore en ligne, du lycée
//    (seconde, 1re, spé, STMG, terminale) + leur short (`renvoie_vers`), pour qu'un short
//    ne reste pas bloqué derrière une paysage repoussée.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MANIFESTE = path.join(RACINE, "manim", "manifeste-youtube.json");
const args = process.argv.slice(2);
const vers = args.includes("--vers") ? args[args.indexOf("--vers") + 1] : args.includes("--ecrire") ? MANIFESTE : null;

const LYCEE = new Set(["seconde", "premiere", "premiere-commun", "premiere-spe", "stmg", "terminale", "terminale-spe"]);
const CLASSES_FREDERIC = new Set(["6e", "4e"]);
const classeDe = (v) => v.classe || v.fichier.split("/")[0];

const depuis = args.includes("--depuis") ? args[args.indexOf("--depuis") + 1] : MANIFESTE;
const texte = fs.readFileSync(depuis, "utf-8"); // relu ICI, juste avant d'écrire
const eol = texte.includes("\r\n") ? "\r\n" : "\n";
const m = JSON.parse(texte);
const enAttente = (v) => !v.url && !v.pas_avant;

let retires = 0;
const reporte = {};
const poses = new Set();
for (const v of m.videos) {
  if (v.prioritaire && enAttente(v) && !CLASSES_FREDERIC.has(classeDe(v))) { delete v.prioritaire; retires++; }
}
for (const v of m.videos) {
  if (v.type === "longue" && enAttente(v) && !v.prioritaire && LYCEE.has(classeDe(v))) poses.add(v.id);
}
for (const v of m.videos) {
  if (v.type === "short" && enAttente(v) && !v.prioritaire && poses.has(v.renvoie_vers)) poses.add(v.id);
}
for (const v of m.videos) {
  if (poses.has(v.id)) {
    if (!v.plus_tard) { v.plus_tard = true; }
    reporte[classeDe(v)] = (reporte[classeDe(v)] ?? 0) + 1;
  } else if (v.plus_tard && args.includes("--raz")) delete v.plus_tard;
}
console.log(`prioritaire retiré : ${retires} ; plus_tard : ${poses.size}`, reporte);

if (vers) {
  const tmp = vers + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(m, null, 2).replace(/\n/g, eol) + eol);
  JSON.parse(fs.readFileSync(tmp, "utf-8"));
  fs.renameSync(tmp, vers);
  console.log("écrit :", vers);
}
