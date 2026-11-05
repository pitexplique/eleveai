// Lance le contrôle par feuille sur toutes les feuilles STMG du chantier (05/11/2026).
// Usage : node scripts/verifier-toutes-fiches-stmg.mjs
import { execSync } from "node:child_process";
import fs from "node:fs";
const faites = new Set(["auto-donnees-graphiques","donnees-filtres","donnees-frequences","donnees-tableau-croise","stat-ajustement","stat-changement-variable","stat-interpoler","stat-moindres-carres","stat-nuage","va-echantillonnage"]);
const slugs = fs.readdirSync("app/fiches-exercices/maths/stmg").filter((s) => !faites.has(s));
let ko = 0;
for (const s of slugs) {
  let sortie;
  try { sortie = execSync(`npx --yes tsx@4 scripts/verifier-une-fiche-stmg.ts ${s}`, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }); }
  catch (e) { sortie = e.stdout ?? String(e); ko++; }
  const l = sortie.trim().split("\n").filter((x) => !x.startsWith("npm notice"));
  const fin = l.at(-1);
  if (!/0 erreur\(s\), 0 alerte/.test(fin)) console.log(l.filter((x) => x.startsWith("✗")).slice(0, 6).join("\n"), "\n" + fin);
}
console.log(`${slugs.length} feuilles, ${ko} en erreur`);
