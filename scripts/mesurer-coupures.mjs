// Le protocole de mesure des coupures fautives, appliqué à une liste de pages.
//
// Même définition que le 31/08 : on parcourt les nœuds texte du DOM, et pour
// chaque espace ordinaire suivie de » ; ? ! : (ou précédée de «), on compare le
// `top` des deux caractères qui l'encadrent. Deux tops différents = la ligne
// s'est coupée là, et c'est une faute de typographie française.
//
//   node scripts/mesurer-coupures.mjs <base> <url…>
import fs from "node:fs";
import { chromium } from "playwright-core";

const args = process.argv.slice(2);
const base = (args.find((a) => a.startsWith("http")) ?? "http://localhost:3000").replace(/\/$/, "");
const liste = args.find((a) => a.endsWith(".json"));
const urls = (liste ? JSON.parse(fs.readFileSync(liste, "utf8")) : args.filter((a) => a.startsWith("/"))).map((u) => (u.startsWith("/") ? u : "/" + u));

const SONDE = () => {
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      const p = n.parentElement;
      if (!p) return NodeFilter.FILTER_REJECT;
      if (/^(SCRIPT|STYLE|NOSCRIPT|TITLE)$/.test(p.tagName)) return NodeFilter.FILTER_REJECT;
      if (p.closest("svg")) return NodeFilter.FILTER_REJECT;
      if (!p.getClientRects().length) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const topAt = (node, i) => {
    const r = document.createRange();
    r.setStart(node, i);
    r.setEnd(node, i + 1);
    const b = r.getBoundingClientRect();
    return b.height === 0 && b.width === 0 ? null : b.top;
  };
  let risque = 0;
  let nbsp = 0;
  const coupures = [];
  let n;
  while ((n = w.nextNode())) {
    const t = n.nodeValue;
    nbsp += (t.match(/ /g) || []).length;
    for (let i = 1; i < t.length - 1; i++) {
      if (t[i] !== " ") continue;
      const av = t[i - 1];
      const ap = t[i + 1];
      let signe = null;
      if ("»;?!:".includes(ap)) signe = ap;
      else if (av === "«") signe = "«";
      if (!signe) continue;
      risque++;
      const a = topAt(n, i - 1);
      const b = topAt(n, i + 1);
      if (a === null || b === null) continue;
      if (Math.abs(a - b) > 0.5) {
        coupures.push({
          signe,
          balise: n.parentElement.tagName,
          extrait: t.slice(Math.max(0, i - 45), i + 12).replace(/\s+/g, " "),
        });
      }
    }
  }
  return { risque, nbsp, coupures };
};

const navigateur = await chromium.launch({ channel: "chrome" });
const page = await navigateur.newPage({ viewport: { width: 375, height: 812 } });

let totalRisque = 0;
let totalCoupures = 0;
const detail = [];
const parPage = [];

for (const url of urls) {
  await page.goto(base + url, { waitUntil: "load", timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  const r = await page.evaluate(SONDE);
  totalRisque += r.risque;
  totalCoupures += r.coupures.length;
  parPage.push({ url, risque: r.risque, coupures: r.coupures.length, nbsp: r.nbsp });
  for (const c of r.coupures) detail.push({ url, ...c });
  const marque = r.coupures.length ? "✗" : "·";
  console.log(
    `${marque} ${url.padEnd(52)} risque ${String(r.risque).padStart(4)}   coupures ${String(r.coupures.length).padStart(3)}   nbsp ${String(r.nbsp).padStart(4)}`,
  );
}

await navigateur.close();

console.log("\n─── total ───────────────────────────────────────────────────");
console.log(`pages ................ ${urls.length}`);
console.log(`occurrences a risque . ${totalRisque}`);
console.log(`coupures fautives .... ${totalCoupures}`);
console.log(
  `taux ................. ${totalRisque ? ((100 * totalCoupures) / totalRisque).toFixed(2) : "0.00"} %`,
);

if (detail.length) {
  console.log("\n─── le detail ───────────────────────────────────────────────");
  for (const d of detail) {
    console.log(`  [${d.signe}] <${d.balise}>  ${d.url}`);
    console.log(`       ${d.extrait}`);
  }
}
