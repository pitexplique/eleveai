// Mesure le MODE CLASSE d'une fiche : ce que le vidéoprojecteur affiche.
//
// ⛔ POURQUOI CE SCRIPT (04/09/2026). `mesurer-fiches.mjs` contrôle la page
// publique et rien d'autre. Or le mode classe est une SECONDE lunette sur la
// même donnée, et il ne rendait pas KaTeX : Frédéric a vu « $\dfrac{3}{4}$ »
// s'afficher en clair au tableau, sur trente diapositives des fiches de 3e,
// pendant que le mesureur annonçait « 0 dollar visible ». Un rendu qu'on ne
// mesure pas est un rendu qu'on ne connaît pas — et celui-là est le plus
// exposé, puisqu'il est projeté devant une classe entière.
//
// Ce qu'il vérifie, diapositive par diapositive :
//   · les DOLLARS restés visibles et les commandes LaTeX en clair
//     (\dfrac, \text, \neq…), c'est-à-dire du code projeté aux élèves ;
//   · les erreurs KaTeX ;
//   · les DÉBORDEMENTS : un contenu plus haut que l'écran, qu'on ne peut pas
//     faire défiler en vidéoprojection.
//
// Usage : node scripts/mesurer-mode-classe.mjs <origine> <matiere> <classe>
// Sortie 1 si une fiche a le moindre défaut.

import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const ORIGINE = process.argv[2] ?? "http://localhost:3000";
const MATIERE = process.argv[3] ?? "maths";
const CLASSE = process.argv[4] ?? "3e";

const DOSSIER = path.resolve(`app/fiches-cours/${MATIERE}/${CLASSE}`);
if (!fs.existsSync(DOSSIER)) {
  console.error(`Aucun dossier ${DOSSIER}`);
  process.exit(1);
}

const NOTIONS = fs
  .readdirSync(DOSSIER, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

// ⚠️ 1280 × 800 : la définition d'un vidéoprojecteur de salle de classe, pas
// celle d'un écran de bureau. C'est là que le texte doit tenir.
const navigateur = await chromium.launch({ channel: "chrome" });
let enDefaut = 0;

for (const notion of NOTIONS) {
  const page = await navigateur.newPage({ viewport: { width: 1280, height: 800 } });
  const defauts = [];
  let nbDiapos = 0;

  try {
    await page.goto(`${ORIGINE}/fiches-cours/${MATIERE}/${CLASSE}/${notion}`, {
      waitUntil: "networkidle",
      timeout: 45000,
    });

    const bouton = page.locator("button", { hasText: /Mode classe/i }).first();
    if ((await bouton.count()) === 0) {
      console.log(`—  ${notion.padEnd(30)} pas de mode classe`);
      await page.close();
      continue;
    }
    await bouton.click();
    await page.waitForTimeout(600);

    // On parcourt toutes les diapositives avec la flèche droite.
    for (let i = 0; i < 60; i += 1) {
      const m = await page.evaluate(() => {
        // ⛔ ON NE MESURE QUE LE PANNEAU PROJETE. Premiere version : on lisait
        // document.body, donc la fiche restee dans le DOM DERRIERE le portail —
        // et chaque diapositive etait declaree en debordement. 22 fiches sur 22
        // en defaut, pour rien.
        const panneau = document.querySelector("div.fixed.inset-0");
        if (!panneau) return { absent: true, dollars: 0, latex: 0, katexErreurs: 0, debordent: 0, position: "?" };
        const t = panneau.innerText;
        const debordent = 0;
        return {
          dollars: (t.match(/\$/g) || []).length,
          latex: (t.match(/\\(dfrac|frac|text|neq|leqslant|circ|widehat|times|pi)\b/g) || []).length,
          katexErreurs: document.querySelectorAll(".katex-error").length,
          debordent,
          // ⛔ LE COMPTEUR A DES ESPACES AUTOUR DE SA BARRE, PAS LES FRACTIONS.
          // Premiere version : /(\d+)\s*\/\s*(\d+)/ attrapait « 3/4 », la
          // fraction du COURS, et le script concluait « diapo 3 sur 4 » — donc
          // il s arretait apres la premiere. Il annoncait alors 0 defaut sur 22
          // fiches sans avoir rien mesure.
          extrait: (t.match(/.{0,60}\$.{0,60}/) || [""])[0].split("\n").join(" | "),
          position: (t.match(/(\d+) \/ (\d+)/) || [])[0] ?? "?",
        };
      });
      nbDiapos = Math.max(nbDiapos, i + 1);
      if (m.dollars) defauts.push(`diapo ${i + 1} · ${m.dollars} dollar(s) : ${m.extrait}`);
      if (m.latex) defauts.push(`diapo ${i + 1} · ${m.latex} commande(s) LaTeX en clair`);
      if (m.katexErreurs) defauts.push(`diapo ${i + 1} · ${m.katexErreurs} formule(s) en erreur`);
      if (m.debordent) defauts.push(`diapo ${i + 1} · déborde de l'écran`);

      const [n, total] = (m.position.match(/\d+/g) || []).map(Number);
      if (!total || n >= total) break;
      await page.keyboard.press("ArrowRight");
      // ⚠️ 350 ms ET NON 120. KaTeX rend APRES le montage de la diapositive :
      // a 120 ms le script lisait encore les dollars bruts et signalait des
      // defauts qu une sonde plus lente ne retrouvait pas. Une mesure trop
      // pressee invente des defauts, exactement comme une mesure trop confiante
      // en manque.
      await page.waitForTimeout(350);
    }
  } catch (e) {
    defauts.push(`INJOIGNABLE : ${String(e).split("\n")[0].slice(0, 70)}`);
  }

  if (defauts.length) enDefaut += 1;
  console.log(
    `${defauts.length ? "⛔" : "✅"} ${notion.padEnd(30)} ${String(nbDiapos).padStart(2)} diapos`,
  );
  // On ne montre que les trois premiers défauts : ils se répètent d'une
  // diapositive à l'autre quand la cause est commune.
  defauts.slice(0, 3).forEach((d) => console.log(`      ${d}`));
  if (defauts.length > 3) console.log(`      … et ${defauts.length - 3} autres`);

  await page.close();
}

await navigateur.close();
console.log(`\nmode classe ${MATIERE} ${CLASSE} — ${NOTIONS.length} fiches, ${enDefaut} en défaut.`);
process.exit(enDefaut ? 1 : 0);
