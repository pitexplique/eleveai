// Fabrique une planche de relecture : pour chaque fichier d'énigmes, les 6
// dessins côte à côte avec titre, question, réponse et vérification.
// Usage : npx tsx scripts/problemes-planche.ts <sortie.html> lib/problemes/6e/*.ts
import { pathToFileURL } from "node:url";
import fs from "node:fs";
import path from "node:path";
import type { ProblemesNotion } from "../lib/problemes/types";

async function main() {
  const [sortie, ...fichiers] = process.argv.slice(2);
  let html = `<!doctype html><meta charset="utf-8"><title>Planche</title><style>
body{font-family:Segoe UI,Arial,sans-serif;margin:16px;background:#f1f5f9;color:#1e293b}
h2{margin:28px 0 8px}.g{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.c{background:#fff;border:1px solid #cbd5e1;border-radius:8px;padding:8px;font-size:13px;line-height:1.35}
.c svg{width:100%;height:auto;max-height:260px;display:block;background:#fff}
.t{font-weight:700}.r{color:#065f46}.v{color:#7c2d12}.frac{display:inline-flex;flex-direction:column;vertical-align:middle;font-size:.85em;line-height:1}.frac>span:first-child{border-bottom:1px solid}</style>`;
  for (const f of fichiers) {
    const mod = await import(pathToFileURL(path.resolve(f)).href);
    const d: ProblemesNotion = mod.default?.default ?? mod.default;
    html += `<h2 id="${d.notionId}">${d.classe} · ${d.notionId} · ${d.titre}</h2><div class="g">`;
    for (const e of d.problemes) {
      const v = e.verification;
      const ver = v.type === "qcm" ? v.choix.map((c, k) => (k === v.bonne ? `<b>✔ ${"ABC"[k]} ${c}</b>` : `${"ABC"[k]} ${c}`)).join(" · ") : `courte : ${v.attendus.join(" | ")} ${v.unite ?? ""}`;
      html += `<div class="c">${e.dessin}<div class="t">${e.tag} — ${e.titre}${e.sorte ? ` [${e.sorte}]` : ""}</div><div>${e.question}</div><div class="r">${e.reponse}</div><div class="v">${e.consigne ?? ""} → ${ver}</div></div>`;
    }
    html += `</div>`;
  }
  fs.writeFileSync(sortie, html);
  console.log(`planche : ${sortie}`);
}
void main();
