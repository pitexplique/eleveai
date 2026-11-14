// scripts/exporter-animaux.mts
//
// Exporte la bibliothèque d'animaux (`lib/canvas/animaux`) hors de React :
//   1. un SVG par animal dans `manim/assets/animaux/<id>.svg` (pour Manim :
//      `from animaux import animal` → SVGMobject, cf. `manim/animaux.py`) ;
//   2. une planche HTML autonome `manim/assets/animaux/planche.html`, qui se
//      regarde sans serveur Next (utile quand la RAM est comptée).
//
//   npx tsx scripts/exporter-animaux.mts
//
// ⚠️ Les SVG sont REGÉNÉRÉS : ne pas les retoucher à la main, modifier
// `lib/canvas/animaux/dessins.ts` puis relancer ce script.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { ANIMAUX, FICHES } from "../lib/canvas/animaux/dessins";
import { svgAnimal, svgGrille } from "../lib/canvas/animaux/svg";

const racine = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dossier = join(racine, "manim", "assets", "animaux");
mkdirSync(dossier, { recursive: true });

for (const a of ANIMAUX) {
  // 240 px : SVGMobject ne lit que la géométrie, la taille sert aux aperçus.
  // ⛔ SVGMobject ignore le viewBox et met à l'échelle sur le CONTENU : le
  // poisson (large) sortait deux fois plus gros que la tortue marine. Un cadre
  // invisible de 60 × 60, posé en PREMIER (submobject 0 côté Manim), redonne à
  // tous la même boite — les mêmes proportions que dans le coach.
  const svg = svgAnimal(a, { taille: 240 }).replace(
    /(<svg[^>]*>)/,
    `$1<rect x="0" y="0" width="60" height="60" fill="none" stroke="none"/>`
  );
  writeFileSync(join(dossier, `${a}.svg`), svg + "\n");
}

const vignette = (a: (typeof ANIMAUX)[number]) =>
  `<figure>${svgAnimal(a, { taille: 72 })}<figcaption>${FICHES[a].un}<br><code>${a}</code></figcaption></figure>`;

const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Bibliothèque d'animaux</title>
<style>
  body { margin: 0; padding: 16px; background: #f1f5f9; font-family: system-ui, sans-serif; color: #0f172a; }
  h1 { font-size: 22px; margin: 0 0 4px; } h2 { font-size: 16px; margin: 0 0 10px; }
  section { background: #fff; border-radius: 16px; padding: 14px; margin: 14px 0; box-shadow: 0 1px 3px #0001; }
  .liste { display: grid; grid-template-columns: repeat(auto-fill, minmax(96px, 1fr)); gap: 8px; }
  figure { margin: 0; background: #f8fafc; border-radius: 12px; padding: 8px; text-align: center; }
  figcaption { font-size: 13px; } code { font-size: 11px; color: #64748b; }
  .grilles { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 14px; }
  .grilles section { margin: 0; } .grilles svg { width: 100%; height: auto; max-width: max-content; display: block; margin: 0 auto; }
  p { font-size: 13px; color: #475569; margin: 8px 0 0; }
</style></head><body>
<h1>Bibliothèque d'animaux</h1>
<p>${ANIMAUX.length} animaux, source unique <code>lib/canvas/animaux/dessins.ts</code>. Planche générée par <code>scripts/exporter-animaux.mts</code>.</p>
<section><h2>Le monde</h2><div class="liste">${ANIMAUX.filter((a) => FICHES[a].origine === "monde").map(vignette).join("")}</div></section>
<section><h2>La Réunion (≈ 4 % des contextes)</h2><div class="liste">${ANIMAUX.filter((a) => FICHES[a].origine === "reunion").map(vignette).join("")}</div></section>
<div class="grilles">
<section><h2>« Combien de poules ? »</h2>${svgGrille([{ animal: "poule", nombre: 7 }])}<p>Réponse : 7 poules.</p></section>
<section><h2>« Compte les insectes » (en vrac, avec pièges)</h2>${svgGrille(
  [
    { animal: "coccinelle", nombre: 3 },
    { animal: "abeille", nombre: 2 },
    { animal: "fourmi", nombre: 2 },
    { animal: "araignee", nombre: 2 },
    { animal: "escargot", nombre: 1 },
  ],
  { disposition: "vrac", colonnes: 4, graine: 7 }
)}<p>Réponse : 7 insectes (l'araignée a 8 pattes, l'escargot aucune).</p></section>
<section><h2>« Combien de poissons rouges ? »</h2>${svgGrille(
  [
    { animal: "poisson", nombre: 4, couleur: "#ef4444" },
    { animal: "poisson", nombre: 5 },
  ],
  { graine: 3 }
)}<p>Réponse : 4 rouges, 5 bleus.</p></section>
<section><h2>« 3 lignes de 4 lapins »</h2>${svgGrille([{ animal: "lapin", nombre: 12 }], { colonnes: 4, taille: 48 })}<p>3 × 4 = 12.</p></section>
<section><h2>À colorier</h2>${svgGrille(
  [
    { animal: "chat", nombre: 1 },
    { animal: "chien", nombre: 1 },
    { animal: "vache", nombre: 1 },
    { animal: "tortue", nombre: 1 },
  ],
  { coloriage: true, colonnes: 4, melange: false }
)}</section>
<section><h2>« Combien de margouillats sur le mur ? »</h2>${svgGrille([{ animal: "margouillat", nombre: 6 }], {
  disposition: "vrac",
  colonnes: 3,
  graine: 5,
  fond: "#fef3c7",
})}</section>
</div></body></html>
`;
writeFileSync(join(dossier, "planche.html"), html);
console.log(`${ANIMAUX.length} SVG + planche.html → ${dossier}`);
