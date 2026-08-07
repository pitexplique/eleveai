// Génère les icônes de l'application (manifest + favicon) à partir de Ti Margo.
//
// POURQUOI ON REFAIT CES ICÔNES (Frédéric, 07/08/2026, point 17 de la refonte).
// L'ancienne était une image de banque : un livre bleu, quatre étoiles, le mot
// « EleveAI » écrit dessus, la mention « 1 LEÇON PAR JOUR » — une promesse que
// le site ne tient plus depuis qu'il propose des ressources au lieu d'une leçon
// quotidienne — et une pastille rouge en forme de « ? » collée dans un coin.
// Trois défauts, dans l'ordre de gravité :
//   1. le texte est illisible à 48 px, c'est-à-dire à la taille où l'icône est
//      RÉELLEMENT vue, sur un écran d'accueil de téléphone ;
//   2. elle annonçait une leçon par jour ;
//   3. déclarée `maskable` alors qu'elle a une marge blanche et des coins
//      arrondis dessinés dedans : Android la recadre en cercle, et il rognait
//      donc une icône déjà arrondie — coins doublés, bords coupés.
//
// Ce qu'on met à la place : TI MARGO, recadré sur la tête et le crayon. C'est
// la figure d'EleveAI, dessinée, celle des cahiers et des vidéos. Un visage se
// reconnaît à 48 px ; un mot, non.
//
// ⚠️ DEUX JEUX D'ICÔNES, ET C'EST TOUT L'INTÉRÊT DU SCRIPT :
//   — `any`      : le dessin occupe presque tout le carré ;
//   — `maskable` : Android découpe un CERCLE de 40 % de rayon au centre. Tout
//     ce qui déborde est perdu. Le dessin y est donc plus petit (zone sûre),
//     et le fond va d'un bord à l'autre. Servir la même image pour les deux,
//     c'est se faire couper la tête ou flotter au milieu d'un vide.
//
// Usage : node scripts/generer-icones.mjs

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SOURCE = path.resolve("public/cahier-vacances/ti-margo.png");
const DOSSIER = path.resolve("public/icons");

/** Le crème du site — c'est déjà `background_color` du manifest, donc l'écran
 *  de démarrage et l'icône ne se contredisent pas au lancement. */
const FOND = { r: 0xf6, g: 0xf1, b: 0xe4, alpha: 1 };

/**
 * LE RECADRAGE, mesuré sur l'image source (1122 × 1402).
 * On garde la tête, le crayon levé et le pouce — la moitié haute du dessin.
 * En pied, Ti Margo fait 1400 px de haut pour une tête de 350 : à 48 px
 * d'icône, sa tête ferait 12 px. On ne verrait qu'une tache verte.
 */
const CADRE = { left: 165, top: 110, width: 760, height: 640 };

async function fabriquer({ taille, part, fichier }) {
  // `part` = la part du carré que le dessin occupe.
  //   0.92 pour `any`      — il remplit, on le voit en grand ;
  //   0.62 pour `maskable` — il tient dans le cercle qu'Android découpe.
  const dessin = Math.round(taille * part);

  const motif = await sharp(SOURCE)
    .extract(CADRE)
    .resize(dessin, dessin, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: { width: taille, height: taille, channels: 4, background: FOND },
  })
    .composite([{ input: motif, gravity: "center" }])
    .png()
    .toFile(path.join(DOSSIER, fichier));

  console.log(`  ${fichier.padEnd(28)} ${taille}×${taille}`);
}

/**
 * Un .ico qui contient un PNG.
 *
 * Le format ICO accepte une image PNG telle quelle depuis Vista : six octets
 * d'en-tête, seize de répertoire, puis le PNG. sharp ne sait pas écrire de
 * .ico — mais il n'y a rien à encoder, seulement à emballer.
 * ⚠️ Le champ « largeur » vaut 0 pour dire 256 ; au-delà de 255 on ne peut pas
 * l'écrire sur un octet. On reste à 64, donc la question ne se pose pas.
 */
function emballerIco(png, taille) {
  const entete = Buffer.alloc(6);
  entete.writeUInt16LE(0, 0); // réservé
  entete.writeUInt16LE(1, 2); // 1 = icône
  entete.writeUInt16LE(1, 4); // une seule image

  const repertoire = Buffer.alloc(16);
  repertoire.writeUInt8(taille % 256, 0); // largeur
  repertoire.writeUInt8(taille % 256, 1); // hauteur
  repertoire.writeUInt8(0, 2); // palette : aucune
  repertoire.writeUInt8(0, 3); // réservé
  repertoire.writeUInt16LE(1, 4); // plans
  repertoire.writeUInt16LE(32, 6); // bits par pixel
  repertoire.writeUInt32LE(png.length, 8);
  repertoire.writeUInt32LE(22, 12); // les données commencent après 6 + 16

  return Buffer.concat([entete, repertoire, png]);
}

async function main() {
  fs.mkdirSync(DOSSIER, { recursive: true });

  console.log("Icônes « any » — le dessin remplit le carré :");
  await fabriquer({ taille: 192, part: 0.92, fichier: "icon-192.png" });
  await fabriquer({ taille: 512, part: 0.92, fichier: "icon-512.png" });

  console.log("\nIcônes « maskable » — le dessin tient dans la zone sûre :");
  await fabriquer({ taille: 192, part: 0.62, fichier: "icon-maskable-192.png" });
  await fabriquer({ taille: 512, part: 0.62, fichier: "icon-maskable-512.png" });

  console.log("\nFavicon :");
  const png64 = await sharp(SOURCE)
    .extract(CADRE)
    .resize(58, 58, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer()
    .then((motif) =>
      sharp({ create: { width: 64, height: 64, channels: 4, background: FOND } })
        .composite([{ input: motif, gravity: "center" }])
        .png()
        .toBuffer(),
    );

  fs.writeFileSync(path.resolve("app/favicon.ico"), emballerIco(png64, 64));
  console.log("  app/favicon.ico              64×64 (PNG emballé en ICO)");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
