// ÉTIQUETER LES VIDÉOS PAR CENTRE D'INTÉRÊT (24/10/2026).
//
//   npx tsx scripts/taguer-centres-interet.ts
//
// Écrit lib/videos/centres-interet-videos.json = { "<id vidéo>": ["sport", …] }
// en fusionnant, dans cet ordre de priorité :
//   1. le champ `centres` du manifeste (manim/manifeste-youtube.json) : le choix
//      fait EN ÉCRIVANT la vidéo (règle de manim/REGLES.md) ;
//   2. lib/videos/centres-interet-etiquettes.json : les vidéos déjà publiées,
//      étiquetées une à une en lisant leur titre et leur accroche.
// ⛔ PAS DE MOTS-CLÉS AUTOMATIQUES : essayé le 24/10, ils étiquetaient une vidéo
// de probabilités en « nature » pour des « feux verts », en « transports » pour
// une « ligne D ». Une vidéo sans centre vaut mieux qu'une vidéo mal rangée.
// ⛔ Ce script n'écrit JAMAIS dans le manifeste (fichier partagé entre sessions).
import fs from "node:fs";
import path from "node:path";
import { CENTRES_INTERET, CENTRE_PAR_ID } from "../lib/videos/centres-interet";

const RACINE = path.resolve(__dirname, "..");
const MANIFESTE = path.join(RACINE, "manim", "manifeste-youtube.json");
const ETIQUETTES = path.join(RACINE, "lib", "videos", "centres-interet-etiquettes.json");
const SORTIE = path.join(RACINE, "lib", "videos", "centres-interet-videos.json");

type Video = { id: string; centres?: string[] };

const manifeste = JSON.parse(fs.readFileSync(MANIFESTE, "utf8")) as { videos: Video[] };
const etiquettes: Record<string, string[]> = fs.existsSync(ETIQUETTES)
  ? JSON.parse(fs.readFileSync(ETIQUETTES, "utf8"))
  : {};

const resultat: Record<string, string[]> = {};
const inconnus = new Set<string>();
let duManifeste = 0;
let desEtiquettes = 0;
for (const v of manifeste.videos) {
  const choix = v.centres?.length ? v.centres : etiquettes[v.id];
  if (!choix?.length) continue;
  if (v.centres?.length) duManifeste++;
  else desEtiquettes++;
  choix.filter((c) => !CENTRE_PAR_ID.has(c)).forEach((c) => inconnus.add(c));
  resultat[v.id] = choix.filter((c) => CENTRE_PAR_ID.has(c));
}

fs.writeFileSync(SORTIE, JSON.stringify(resultat, null, 1) + "\n");

const total = manifeste.videos.length;
const sans = total - Object.keys(resultat).length;
console.log(`${total} vidéos : ${duManifeste} par le manifeste, ${desEtiquettes} par les étiquettes, ${sans} sans centre.`);
for (const c of CENTRES_INTERET) {
  const n = Object.values(resultat).filter((l) => l.includes(c.id)).length;
  console.log(`  ${c.nom.padEnd(26)} ${String(n).padStart(4)}`);
}
if (inconnus.size) console.log(`⚠️ Centres inconnus : ${[...inconnus].join(", ")}`);
console.log(`→ ${path.relative(RACINE, SORTIE)}`);
