// Recompresse les images de public/ SUR PLACE — même nom, même chemin, même
// format. Une image appelée depuis le code comme depuis la base continue de
// marcher : seul le poids change.
//
// Le barème vient des cartes que Frédéric a converties lui-même : une
// illustration de 1 500 px tient sous 100 Ko sans qu'on voie la différence.
//
//   node scripts/compresser-images.mjs           → simulation, n'écrit rien
//   node scripts/compresser-images.mjs --ecrire  → applique
//   node scripts/compresser-images.mjs --seuil 300 --ecrire
//
// Les originaux sont dans git : `git checkout -- public/` annule tout.
import { readdirSync, statSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const RACINE = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
const args = process.argv.slice(2);
const ECRIRE = args.includes("--ecrire");
const SEUIL_KO = Number(args[args.indexOf("--seuil") + 1]) || 150;
const EXT = /\.(png|jpe?g|webp)$/i;

// Qualités choisies pour des illustrations et des photos d'écran, pas pour de
// la retouche : à 80, l'œil ne suit plus, le poids oui.
const Q_WEBP = 80;
const Q_PNG = 80;
const Q_JPEG = 82;

function lister(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...lister(p));
    else if (EXT.test(e.name)) out.push(p);
  }
  return out;
}

async function recompresser(f) {
  // On charge le fichier EN MÉMOIRE avant de le relire : sous Windows, sharp
  // garde le fichier ouvert et l'écriture sur place échoue (EUNKNOWN).
  const img = sharp(readFileSync(f));
  const m = await img.metadata();
  // On garde le format du fichier, pas celui de son extension : plusieurs
  // « .webp » du dossier sont en réalité des PNG renommés.
  switch (m.format) {
    case "webp":
      return img.webp({ quality: Q_WEBP, effort: 6 }).toBuffer();
    case "png":
      return img.png({ quality: Q_PNG, compressionLevel: 9, palette: true, effort: 10 }).toBuffer();
    case "jpeg":
      return img.jpeg({ quality: Q_JPEG, mozjpeg: true }).toBuffer();
    default:
      return null;
  }
}

let avant = 0;
let apres = 0;
let touches = 0;

console.log(ECRIRE ? "── ÉCRITURE ──\n" : "── SIMULATION (rien n'est écrit) ──\n");
console.log("   avant     après   gain   fichier");
console.log("   ─────     ─────   ────   ───────");

for (const f of lister(RACINE)) {
  const taille = statSync(f).size;
  if (taille / 1024 < SEUIL_KO) continue;

  let buf;
  try {
    buf = await recompresser(f);
  } catch (e) {
    console.log(`   ⚠️  illisible : ${relative(RACINE, f)} (${e.message})`);
    continue;
  }
  if (!buf) continue;

  // On n'écrit que si ça allège vraiment : recompresser un fichier déjà
  // optimisé le dégraderait pour rien.
  if (buf.length >= taille * 0.9) continue;

  avant += taille;
  apres += buf.length;
  touches++;
  const pct = Math.round((1 - buf.length / taille) * 100);
  console.log(
    `${String(Math.round(taille / 1024)).padStart(7)} Ko` +
      `${String(Math.round(buf.length / 1024)).padStart(8)} Ko` +
      `${String(pct).padStart(6)} %   ${relative(RACINE, f).replace(/\\/g, "/")}`,
  );

  if (ECRIRE) writeFileSync(f, buf);
}

console.log(
  `\n${touches} fichiers · ${(avant / 1024 / 1024).toFixed(1)} Mo → ` +
    `${(apres / 1024 / 1024).toFixed(1)} Mo ` +
    `(${Math.round((1 - apres / avant) * 100)} % de moins)`,
);
if (!ECRIRE) console.log(`\nPour appliquer : node scripts/compresser-images.mjs --ecrire`);
