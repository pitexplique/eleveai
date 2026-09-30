// Mesure le DÉBORDEMENT du mode classe des fiches de cours, diapo par diapo
// (30/09/2026). Complète `mesurer-mode-classe.mjs` (dollars et LaTeX projetés
// en clair), dont le contrôle de débordement est désactivé.
//
// ⭐ POURQUOI : Frédéric projette ces diapos à des élèves qui lisent mal ; une
// diapo qui déborde oblige à défiler devant la classe. Mesuré à 1280 × 800 (un
// vidéoprojecteur), correction RÉVÉLÉE sur les exemples et les exercices : le
// pire cas. Le 30/09 : les exemples débordaient de 100 à 340 px sur toutes les
// fiches (corrigé dans ModeClasse) ; ce qui déborde encore vient de la LONGUEUR
// des textes — les fiches de juin sont à réécrire au standard des nouvelles.
//
// Usage (serveur de dev de SA session, jamais celui d'une autre) :
//   node scripts/mesurer-debordement-mode-classe.mjs <port> <classe/slug> [<classe/slug> …]
//   ex. node scripts/mesurer-debordement-mode-classe.mjs 3300 6e/cercle-disque 5e/relatif-nombre

import { chromium } from "playwright-core";

const [, , port, ...chemins] = process.argv;
if (!port || !chemins.length) {
  console.log("usage : node scripts/mesurer-debordement-mode-classe.mjs <port> <classe/slug> …");
  process.exit(2);
}
const nav = await chromium.launch({ channel: "chrome" });
const p = await nav.newPage({ viewport: { width: 1280, height: 800 } });
let fautes = 0;
for (const c of chemins) {
  try {
    await p.goto(`http://localhost:${port}/fiches-cours/maths/${c}`, { waitUntil: "networkidle", timeout: 240000 });
    await p.getByRole("button", { name: /Mode classe/ }).first().click();
    // On attend le compteur « 1 / N » (le panneau se compile à froid en dev).
    await p.waitForFunction(() => /\d+ \/ \d+/.test(document.querySelector("div.fixed.inset-0")?.innerText ?? ""), undefined, { timeout: 60000 });
    const n = await p.evaluate(() => Number((document.querySelector("div.fixed.inset-0")?.innerText.match(/\d+ \/ (\d+)/) || [])[1] || 0));
    const pbs = [];
    let margo = 0;
    for (let i = 0; i < n; i++) {
      const b = p.getByRole("button", { name: "Révéler la correction" });
      if (await b.count()) {
        await b.first().click();
        await p.waitForTimeout(150);
      }
      const r = await p.evaluate(() => {
        const sec = document.querySelector("div.fixed.inset-0 section");
        return {
          d: sec.scrollHeight - sec.clientHeight,
          w: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          m: !!sec.querySelector('img[alt="Ti Margo"]'),
          t: sec.querySelector("h2")?.textContent ?? "",
        };
      });
      if (r.m) margo++;
      if (r.d > 0 || r.w > 0) pbs.push(`${i + 1} « ${r.t.slice(0, 28)} » +${r.d}${r.w ? ` (largeur +${r.w})` : ""}`);
      await p.keyboard.press("ArrowRight");
      await p.waitForTimeout(250);
    }
    if (pbs.length) fautes++;
    console.log(`${pbs.length ? "✗" : "✓"} ${c} : ${n} diapos, Ti Margo ${margo}${pbs.length ? "\n    " + pbs.join("\n    ") : ""}`);
  } catch (e) {
    fautes++;
    console.log(`✗ ${c} ERREUR ${String(e).slice(0, 150)}`);
  }
}
await nav.close();
process.exit(fautes ? 1 : 0);
