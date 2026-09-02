// Quelle largeur RÉELLE chaque emplacement de dessin reçoit-il, sur une fiche ?
//
// ⛔ POURQUOI CE SCRIPT (02/09/2026). REGLES.md donne trois chiffres — 222 px
// pour une carte de propriété, 216 pour « La formule », 200 pour un exemple —
// mesurés une fois à la main, sur téléphone. Ils ne disent rien de la FIGURE de
// référence, rien de la largeur en 1280, et rien du RATIO viewBox → rendu, qui
// est pourtant ce qui décide de la taille finale du texte : la police affichée
// vaut `police × largeurRendue ÷ largeurViewBox`.
//
// ⭐ ET CE RATIO EST LE SEUL CHIFFRE QUI COMPTE POUR LES CANVAS À GÉOMÉTRIE
// ABSOLUE. Trois d'entre eux ont été identifiés le 02/09 : `solide_3d` place son
// cube jusqu'à x = 294, `arbre_proba` ses colonnes en [24, 168, 320], `fraction`
// en mode `compare` sa seconde barre à y = 120. Leur demander un cadre plus
// petit ne les rétrécit pas : ça les COUPE. Il faut donc leur donner leur
// largeur native — et vérifier alors que le ratio ne fait pas tomber la police
// sous 11 px. Ce script répond aux deux questions d'un coup.
//
// Usage : node scripts/mesurer-largeurs-blocs.mjs <url d'une fiche>
//         node scripts/mesurer-largeurs-blocs.mjs http://localhost:3000/fiches-cours/maths/3e/proba-experience

import { chromium } from "playwright-core";

const url = process.argv[2];
if (!url) {
  console.error("Usage : node scripts/mesurer-largeurs-blocs.mjs <url>");
  process.exit(2);
}

const nav = await chromium.launch({ channel: "chrome" });

for (const w of [375, 1280]) {
  const page = await nav.newPage({ viewport: { width: w, height: 900 } });
  await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
  const lignes = await page.evaluate(() => {
    return [...document.querySelectorAll("svg")]
      .filter((s) => !s.closest(".katex") && s.getBoundingClientRect().width > 60)
      .map((s) => {
        // On remonte jusqu'au premier ancêtre qui dit de quelle rubrique il
        // s'agit — `data-rubrique` est posé par FicheCoursClient.
        let e = s;
        let section = "?";
        for (let i = 0; i < 12 && e; i += 1) {
          const id = e.getAttribute?.("data-rubrique") || e.id;
          if (id) {
            section = id;
            break;
          }
          e = e.parentElement;
        }
        const b = s.getBoundingClientRect();
        const vb = s.viewBox?.baseVal?.width || b.width;
        const textes = [...s.querySelectorAll("text")];
        const policeMin = textes.length
          ? Math.min(
              ...textes.map(
                (t) => (parseFloat(getComputedStyle(t).fontSize) || 0) * (b.width / vb),
              ),
            )
          : 0;
        return {
          section,
          rendu: Math.round(b.width),
          viewBox: Math.round(vb),
          ratio: Math.round((b.width / vb) * 100) / 100,
          policeMin: Math.round(policeMin * 10) / 10,
          apercu: (textes[0]?.textContent || "").slice(0, 14),
        };
      });
  });

  console.log(`\n=== viewport ${w} px ===`);
  for (const x of lignes) {
    const alerte = x.policeMin > 0 && x.policeMin < 11 ? " ⛔ SOUS 11 px" : "";
    console.log(
      `  ${String(x.section).padEnd(13)} rendu ${String(x.rendu).padStart(4)} · viewBox ${String(
        x.viewBox,
      ).padStart(4)} · ratio ${String(x.ratio).padStart(4)} · police min ${String(
        x.policeMin,
      ).padStart(5)}${alerte}  « ${x.apercu} »`,
    );
  }
  await page.close();
}

await nav.close();
