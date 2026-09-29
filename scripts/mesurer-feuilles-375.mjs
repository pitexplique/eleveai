// Mesure des feuilles d'exercices à 375 px, corrections ouvertes (29/09/2026, lot de 5e).
//
// ⭐ POURQUOI UN SCRIPT : l'onglet du navigateur intégré, caché, laissait
// expirer la mesure. Ici Playwright ouvre chaque page à 375 × 900, déplie tous
// les corrigés, et cherche : 20 exercices, un dessin dans chacun, aucun
// débordement de page, aucun défilement horizontal DANS une carte (sauf les
// canvas communs qui défilent par conception : arbre, tableau croisé,
// diagramme), aucun texte de SVG hors de son cadre, aucune paire de textes qui
// se recouvre de plus de 3 px dans les deux sens, 0 `.katex-error`, aucun `$`.
// Ce qu'il a trouvé sur la 5e : des étiquettes coupées au bord (« Charlemagne »),
// des libellés de camembert l'un sur l'autre, un repère aux graduations dehors.
//
// Usage (serveur de dev de SA session, jamais celui d'une autre) :
//   node scripts/mesurer-feuilles-375.mjs <port> <classe> <slug> [<slug> …]
//   ex. node scripts/mesurer-feuilles-375.mjs 3000 6e entier-nombre decimal-nombre

import { chromium } from "playwright-core";

const [, , port, classe, ...slugs] = process.argv;
if (!port || !classe || !slugs.length) {
  console.log("usage : node scripts/mesurer-feuilles-375.mjs <port> <classe> <slug> …");
  process.exit(2);
}
const nav = await chromium.launch({ channel: "chrome" });
const p = await nav.newPage({ viewport: { width: 375, height: 900 } });
let fautes = 0;
for (const s of slugs) {
  try {
    await p.goto(`http://localhost:${port}/fiches-exercices/maths/${classe}/${s}`, { waitUntil: "networkidle", timeout: 240000 });
    await p.evaluate(() => document.querySelectorAll("details").forEach((x) => (x.open = true)));
    await p.waitForTimeout(1200);
    const r = await p.evaluate(() => {
      const d = document;
      const W = d.documentElement.clientWidth;
      const ex = [...d.querySelectorAll("[data-exercice]")];
      const res = { nbEx: ex.length, pageDeborde: d.documentElement.scrollWidth - W };
      res.sansDessin = ex.filter((e) => !e.querySelector("svg, table, div.grid.border-slate-900, pre")).map((e) => e.getAttribute("data-exercice"));
      res.katexErr = d.querySelectorAll(".katex-error").length;
      res.dollars = (d.body.innerText.match(/\$/g) || []).length;
      res.defile = [...d.querySelectorAll(".overflow-x-auto")]
        .filter((el) => el.scrollWidth > el.clientWidth + 1 && el.getBoundingClientRect().width > 0 && !el.querySelector("[class*='min-w-[19rem]'],[class*='min-w-[21rem]'],[class*='min-w-[22.5rem]']"))
        .map((el) => (el.closest("[data-exercice]")?.getAttribute("data-exercice") ?? "?") + ":" + (el.scrollWidth - el.clientWidth));
      const recouvre = [], horsCadre = [];
      d.querySelectorAll("svg").forEach((sv) => {
        const n = sv.closest("[data-exercice]")?.getAttribute("data-exercice") ?? "?";
        const sr = sv.getBoundingClientRect();
        if (sr.width === 0) return;
        const ts = [...sv.querySelectorAll("text")].filter((t) => t.textContent.trim()).map((t) => ({ t: t.textContent.trim(), r: t.getBoundingClientRect() }));
        for (const x of ts) if (x.r.left < sr.left - 1 || x.r.right > sr.right + 1 || x.r.top < sr.top - 1 || x.r.bottom > sr.bottom + 1) horsCadre.push(`${n}: « ${x.t} »`);
        for (let i = 0; i < ts.length; i++)
          for (let j = i + 1; j < ts.length; j++) {
            const a = ts[i].r, b = ts[j].r;
            const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left);
            const oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
            if (ox > 3 && oy > 3) recouvre.push(`${n}: « ${ts[i].t} » / « ${ts[j].t} »`);
          }
      });
      return { ...res, recouvre, horsCadre };
    });
    const bon = r.nbEx === 20 && r.pageDeborde <= 0 && !r.sansDessin.length && !r.katexErr && !r.dollars && !r.defile.length && !r.recouvre.length && !r.horsCadre.length;
    if (!bon) fautes++;
    console.log(`${bon ? "✓" : "✗"} ${s} ${bon ? "" : JSON.stringify(r)}`);
  } catch (e) {
    fautes++;
    console.log(`✗ ${s} ERREUR ${e.message.slice(0, 200)}`);
  }
}
await nav.close();
process.exit(fautes ? 1 : 0);
