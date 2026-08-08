// Génère public/preview.jpg — l'image d'aperçu du site.
//
// ⛔ POURQUOI CE SCRIPT EXISTE : `/preview.jpg` RENVOYAIT 404 EN PRODUCTION.
// Le fichier était référencé huit fois et n'existait nulle part :
//   — `app/layout.tsx` : l'image OpenGraph PAR DÉFAUT de tout le site,
//     l'image Twitter, ET le `logo` de l'`Organization` en JSON-LD ;
//   — `app/blog/[slug]/page.tsx`, `app/tarifs/page.tsx`,
//     `app/pourquoi-nos-tarifs-sont-justes/metadata.ts`.
//
// Ce que ça coûtait, et qui ne se voit jamais depuis le site : chaque lien
// partagé — WhatsApp, Facebook, LinkedIn, Slack, un message à un collègue —
// affichait un aperçu vide. Et le logo que Google et les IA lisent pour
// représenter EleveAI pointait vers une page absente.
//
// ⭐ CE QUE L'IMAGE MONTRE, ET POURQUOI (tranché avec Frédéric le 08/08).
// Deux versions ont été rendues pour choisir en regardant plutôt qu'en
// discutant. La première donnait la moitié droite à Ti Margo en pied. Celle-ci
// montre LE GESTE : « Qui es-tu ? · Ta classe · Ta matière », puis le champ et
// sa flèche. Ti Margo est réduit à une signature dans le coin.
//
// La raison tient en une phrase, et elle vaut au-delà de cette image : une IA
// ne se montre pas avec un robot — c'est le piège que Frédéric avait déjà
// refusé pour l'icône. Elle se montre par ce qu'elle FAIT FAIRE. Quelqu'un qui
// reçoit ce lien comprend le produit sans lire une ligne.
// ⚠️ Ti Margo n'est pas écarté pour autant : sur les cahiers, les vidéos et
// l'icône de l'app, il reste en grand. C'est la surface qui décide — ici on
// répond « qu'est-ce que c'est ? » à un adulte, souvent un prof ou un
// principal ; sur un écran d'accueil de téléphone, à 48 px, un visage bat un
// logotype. Voir scripts/generer-icones.mjs.
//
// ⚠️ 1200 × 630, C'EST LA TAILLE ATTENDUE, et le format compte : en dessous de
// 600 px de large, Facebook et LinkedIn passent en petite vignette carrée et le
// texte devient illisible.
//
// ⚠️ LE TEXTE EST DESSINÉ EN SVG, pas composé en HTML. sharp le rend via
// librsvg : les polices disponibles ne sont pas celles d'un navigateur. On
// demande donc une PILE de familles génériques, et on vérifie le rendu à
// l'œil — c'est la seule vérification qui vaille ici.
//
// Usage : node scripts/generer-preview.mjs

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SORTIE = path.resolve("public/preview.jpg");
const MARGO = path.resolve("public/cahier-vacances/ti-margo.png");

const L = 1200;
const H = 630;

/** Les couleurs du site — les mêmes que le manifest et les icônes. */
const CREME = "#f6f1e4";
const ENCRE = "#1d1c16";
const TEAL = "#0e7490";
const POLICE = "Segoe UI, DejaVu Sans, Arial, sans-serif";

const fond = `
<svg width="${L}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${L}" height="${H}" fill="${CREME}"/>
  <!-- Un filet teal en bas : la seule couleur de marque, et elle tient encore
       quand la vignette est réduite à 200 px de large dans un fil de
       discussion. -->
  <rect x="0" y="${H - 10}" width="${L}" height="10" fill="${TEAL}"/>

  <text x="80" y="118" font-family="${POLICE}" font-size="66" font-weight="800" fill="${ENCRE}">Eleve<tspan fill="${TEAL}">AI</tspan></text>

  <text x="80" y="216" font-family="${POLICE}" font-size="42" font-weight="700" fill="${ENCRE}">Des ressources pédagogiques</text>
  <text x="80" y="268" font-family="${POLICE}" font-size="42" font-weight="700" fill="${ENCRE}">conçues, sélectionnées et vérifiées.</text>

  <!-- LES TROIS QUESTIONS, dans l'ordre de la page. La première est pleine :
       c'est celle à laquelle on répond en premier. -->
  <g transform="translate(80,312)">
    <rect x="0" y="0" width="190" height="46" rx="23" fill="${TEAL}"/>
    <text x="95" y="31" text-anchor="middle" font-family="${POLICE}" font-size="22" font-weight="600" fill="#ffffff">Qui es-tu ?</text>
    <rect x="206" y="0" width="172" height="46" rx="23" fill="none" stroke="${ENCRE}" stroke-opacity="0.28" stroke-width="2"/>
    <text x="292" y="31" text-anchor="middle" font-family="${POLICE}" font-size="22" font-weight="600" fill="${ENCRE}" opacity="0.8">Ta classe</text>
    <rect x="394" y="0" width="180" height="46" rx="23" fill="none" stroke="${ENCRE}" stroke-opacity="0.28" stroke-width="2"/>
    <text x="484" y="31" text-anchor="middle" font-family="${POLICE}" font-size="22" font-weight="600" fill="${ENCRE}" opacity="0.8">Ta matière</text>
  </g>

  <!-- LE CHAMP. Arrondi aux quatre coins et flèche à l'intérieur : c'est la
       forme exacte de la page, et c'est à sa forme qu'on reconnaît une zone de
       saisie avant même de la lire. -->
  <g transform="translate(80,390)">
    <rect x="0" y="0" width="700" height="70" rx="35" fill="#ffffff" stroke="${ENCRE}" stroke-width="3"/>
    <text x="30" y="45" font-family="${POLICE}" font-size="25" fill="${ENCRE}" opacity="0.45">Écris ta question ou explique ce qui coince…</text>
    <circle cx="648" cy="35" r="25" fill="${TEAL}"/>
    <text x="648" y="46" text-anchor="middle" font-family="${POLICE}" font-size="29" font-weight="700" fill="#ffffff">&#8594;</text>
  </g>

  <text x="80" y="524" font-family="${POLICE}" font-size="25" font-weight="600" fill="${TEAL}">Du CP au Bac — gratuit</text>
  <text x="80" y="566" font-family="${POLICE}" font-size="22" fill="${ENCRE}" opacity="0.6">Conçu à La Réunion par un professeur, pour ses élèves.</text>
</svg>`;

const margo = await sharp(MARGO)
  .resize({ height: 250, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .toBuffer();

await sharp(Buffer.from(fond))
  .composite([{ input: margo, top: 320, left: 940 }])
  // JPEG parce que huit endroits du code réclament ce nom-là. Qualité 88 :
  // ~80 Ko, très en dessous des 300 Ko au-delà desquels certains lecteurs de
  // flux abandonnent l'aperçu.
  .jpeg({ quality: 88, chromaSubsampling: "4:4:4" })
  .toFile(SORTIE);

console.log(`public/preview.jpg — ${L}×${H}, ${Math.round(fs.statSync(SORTIE).size / 1024)} Ko`);
