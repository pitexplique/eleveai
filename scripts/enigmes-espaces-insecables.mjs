// Usage : node scripts/enigmes-espaces-insecables.mjs lib/enigmes/<classe>/<notion>.ts …
// Espaces insécables dans la partie « données » d'un fichier d'énigmes (hors SVG, hors ${...}).
import fs from "node:fs";
for (const f of process.argv.slice(2)) {
  let s = fs.readFileSync(f, "utf8");
  const i = s.indexOf("const enigmes: EnigmesNotion");
  let d = s.slice(i);
  const parts = d.split(/(<svg[\s\S]*?<\/svg>|\$\{[^}]*\})/);
  for (let k = 0; k < parts.length; k += 2)
    parts[k] = parts[k].replace(/ ([?!:;])/g, " $1").replace(/« /g, "« ").replace(/ »/g, " »");
  s = s.slice(0, i) + parts.join("");
  fs.writeFileSync(f, s);
  console.log(f, (s.match(/ /g) || []).length);
}
