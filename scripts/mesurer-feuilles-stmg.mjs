// Mesure des 86 feuilles d'exercices STMG à 375 px (05/11/2026) : enveloppe de
// `mesurer-feuilles-375.mjs`, sans son exigence « un dessin par exercice » (en
// STMG, une figure quand elle sert), et qui attend les compilations lentes du
// serveur de dev. Elle cherche : 20 exercices, page qui ne déborde pas, aucun
// défilement interne, aucun texte de SVG hors cadre ou recouvert, 0 erreur KaTeX,
// aucun dollar visible (les `$` des formules de tableur A$1 sont permis), et
// compte les champs de réponse.
// Usage : node scripts/mesurer-feuilles-stmg.mjs <port> [slug …]
import fs from "node:fs";
import { chromium } from "playwright-core";

const [, , port, ...demandes] = process.argv;
const slugs = demandes.length ? demandes : fs.readdirSync("app/fiches-exercices/maths/stmg").sort();
const nav = await chromium.launch({ channel: "chrome" });
const p = await nav.newPage({ viewport: { width: 375, height: 900 } });
const erreursConsole = [];
p.on("pageerror", (e) => erreursConsole.push(e.message.slice(0, 160)));

let fautes = 0;
for (const s of slugs) {
  erreursConsole.length = 0;
  try {
    await p.goto(`http://localhost:${port}/fiches-exercices/maths/stmg/${s}`, { waitUntil: "domcontentloaded", timeout: 900000 });
    await p.waitForSelector("[data-exercice]", { timeout: 300000 });
    await p.evaluate(() => document.querySelectorAll("details").forEach((x) => (x.open = true)));
    await p.waitForTimeout(800);
    const r = await p.evaluate(() => {
      const d = document;
      const W = d.documentElement.clientWidth;
      const ex = [...d.querySelectorAll("[data-exercice]")];
      const res = { nbEx: ex.length, pageDeborde: d.documentElement.scrollWidth - W };
      res.katexErr = d.querySelectorAll(".katex-error").length;
      const texte = d.body.innerText;
      res.dollars = (texte.replace(/[A-Z]?\$[A-Z]?\$?\d+/g, "").replace(/\$[A-Z]\b/g, "").match(/\$/g) || []).length;
      res.defile = [...d.querySelectorAll(".overflow-x-auto")]
        .filter((el) => el.scrollWidth > el.clientWidth + 1 && el.getBoundingClientRect().width > 0)
        .map((el) => (el.closest("[data-exercice]")?.getAttribute("data-exercice") ?? "?") + ":" + (el.scrollWidth - el.clientWidth));
      res.horsEcran = ex
        .flatMap((e) => [...e.querySelectorAll("p,li,table,pre,.katex-display")].filter((x) => x.getBoundingClientRect().right > W + 1 && !x.closest(".overflow-x-auto")).map(() => e.getAttribute("data-exercice")))
        .filter((v, i, a) => a.indexOf(v) === i);
      const recouvre = [], horsCadre = [];
      d.querySelectorAll("svg").forEach((sv) => {
        if (sv.closest(".katex")) return;
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
      res.champs = d.querySelectorAll("[data-exercice] input").length;
      return { ...res, recouvre, horsCadre };
    });
    const bon = r.nbEx === 20 && r.pageDeborde <= 0 && !r.katexErr && !r.dollars && !r.defile.length && !r.horsEcran.length && !r.recouvre.length && !r.horsCadre.length && !erreursConsole.length;
    if (!bon) fautes++;
    console.log(`${bon ? "✓" : "✗"} ${s} ${r.champs} champs ${bon ? "" : JSON.stringify({ ...r, erreursConsole })}`);
  } catch (e) {
    fautes++;
    console.log(`✗ ${s} ERREUR ${e.message.slice(0, 200)}`);
  }
}
await nav.close();
console.log(`${slugs.length} feuilles, ${fautes} en défaut`);
process.exit(fautes ? 1 : 0);
