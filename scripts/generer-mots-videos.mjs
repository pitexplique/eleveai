// Les MOTS des vidéos publiées, pour la recherche de l'en-tête (19/10/2026).
//
//   node scripts/generer-mots-videos.mjs      (lancé aussi par generer-videos-r2.mjs)
//
// Frédéric : « quand tu tapes pythagore tu dois voir le coach mais aussi la
// vidéo ». La recherche (lib/matrice/suggestions.ts) tourne dans le NAVIGATEUR ;
// la table des vidéos (~160 Ko) n'a rien à y faire. On n'y envoie que la liste
// des mots distincts des titres publiés — quelques Ko — pour savoir s'il existe
// au moins une vidéo sur ce qu'on tape. La galerie /video?q= fait le reste.
// ⚠️ Même normalisation que lib/matrice/normaliser.ts (minuscules, sans accents).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const table = JSON.parse(fs.readFileSync(path.join(RACINE, "lib/videos/videos-r2.json"), "utf8"));

const normaliser = (t) =>
  t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9' ]/g, " ").replace(/\s+/g, " ").trim();

const mots = new Set();
for (const v of Object.values(table)) {
  if (!v.youtube) continue;
  for (const brut of normaliser(v.titre).split(" ")) {
    // « l'hypotenuse » → « l'hypotenuse » et « hypotenuse », comme suggestions.ts
    for (const m of [brut, brut.includes("'") ? brut.slice(brut.indexOf("'") + 1) : ""]) {
      if (m.length >= 4 && !/^\d+$/.test(m)) mots.add(m);
    }
  }
}
const sortie = path.join(RACINE, "lib/videos/mots-videos.json");
fs.writeFileSync(sortie, JSON.stringify([...mots].sort()) + "\n", "utf8");
console.log(`${mots.size} mots → ${path.relative(RACINE, sortie)} (${fs.statSync(sortie).size} octets)`);
