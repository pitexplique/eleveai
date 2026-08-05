// Audit des images de public/ : le poids réel, face aux dimensions réelles.
//
// Une carte affichée sur 400 px de large n'a pas besoin d'être stockée en
// 3 000 px. C'est ce décalage-là qui remplit le quota « Fast Data Transfer »
// de Vercel : le fichier part tel quel, à chaque visite, à sa taille d'origine.
//
//   node scripts/auditer-images.mjs          → les fichiers > 200 Ko
//   node scripts/auditer-images.mjs 50       → le seuil, en Ko
//
// La colonne « cible » donne la largeur d'affichage max repérée dans le code
// quand elle est connue ; sinon 1600 px (une pleine largeur d'écran suffit).
import { readdirSync, statSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const RACINE = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
const SEUIL_KO = Number(process.argv[2] || 200);
const EXT = /\.(png|jpe?g|webp)$/i;

function lister(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...lister(p));
    else if (EXT.test(e.name)) out.push(p);
  }
  return out;
}

const lignes = [];
for (const f of lister(RACINE)) {
  const ko = Math.round(statSync(f).size / 1024);
  if (ko < SEUIL_KO) continue;
  let w = 0;
  let h = 0;
  let fmt = "?";
  try {
    const m = await sharp(f).metadata();
    w = m.width ?? 0;
    h = m.height ?? 0;
    fmt = m.format ?? "?";
  } catch {
    /* fichier illisible : on le signale quand même par son poids */
  }
  lignes.push({ f: relative(RACINE, f).replace(/\\/g, "/"), ko, w, h, fmt });
}

lignes.sort((a, b) => b.ko - a.ko);

let total = 0;
console.log(`  poids   dimensions   format  fichier`);
console.log(`  ─────   ──────────   ──────  ───────`);
for (const l of lignes) {
  total += l.ko;
  const dim = l.w ? `${l.w}x${l.h}` : "—";
  const alerte = l.w > 2000 ? " ⚠️" : "";
  console.log(
    `${String(l.ko).padStart(6)} Ko  ${dim.padStart(10)}   ${l.fmt.padEnd(6)}  ${l.f}${alerte}`,
  );
}
console.log(
  `\n${lignes.length} fichiers ≥ ${SEUIL_KO} Ko — ${(total / 1024).toFixed(1)} Mo au total`,
);
console.log(`⚠️ = plus de 2 000 px de large : personne ne les voit à cette taille.`);
