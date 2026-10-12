// VÉRIFIE LA FEUILLE « ANALYSE GRAPHIQUE » (seconde, 12/10/2026).
// Chaque fait affirmé par un corrigé (lib/fiches-exercices/analyse-graphique-courbes.ts,
// FAITS) est RECALCULÉ sur la courbe : image, antécédents (et aucune traversée
// entre deux graduations), ensemble de solutions point par point, ligne de
// signes, ligne de variations. Puis chaque nombre affirmé doit figurer dans le
// texte de l'exercice correspondant de la feuille.
// Usage : npx --yes tsx@4 scripts/verifier-exercices-analyse-graphique.ts [seconde|premiere-spe]

import { readFileSync } from "node:fs";
import * as S2 from "@/lib/fiches-exercices/analyse-graphique-courbes";
import * as P1 from "@/lib/fiches-exercices/analyse-graphique-1s-courbes";
import type { CourbeNoeuds } from "@/lib/fiches-exercices/analyse-graphique-courbes";

const premiere = process.argv[2] === "premiere-spe";
const COURBES: Record<string, CourbeNoeuds> = premiere ? P1.COURBES : S2.COURBES;
const FAITS: any[] = premiere ? P1.FAITS : S2.FAITS;
const evaluer = S2.evaluer;

let defauts = 0;
const ko = (m: string) => {
  defauts += 1;
  console.log("⛔ " + m);
};
const fr = (n: number) => (n < 0 ? `−${-n}` : String(n));
const xs = (c: CourbeNoeuds) => c.ys.map((_, i) => c.xa + i);
const val = (c: CourbeNoeuds, x: number) => c.ys[x - c.xa];

function test(op: string, y: number, k: number) {
  return op === "<" ? y < k - 1e-9 : op === ">" ? y > k + 1e-9 : op === "≤" ? y <= k + 1e-9 : y >= k - 1e-9;
}
function dans(ens: string, x: number): boolean {
  if (ens === "∅") return false;
  return ens.split(" ∪ ").some((m) => {
    const p = m.match(/^\{(−?\d+)\}$/);
    if (p) return Math.abs(x - Number(p[1].replace("−", "-"))) < 1e-9;
    const r = m.match(/^([\[\]])(−?\d+) ; (−?\d+)([\[\]])$/);
    if (!r) throw new Error(`intervalle illisible : ${m}`);
    const a = Number(r[2].replace("−", "-")), b = Number(r[3].replace("−", "-"));
    return (r[1] === "[" ? x >= a - 1e-9 : x > a + 1e-9) && (r[4] === "]" ? x <= b + 1e-9 : x < b - 1e-9);
  });
}

// Le texte de chaque exercice de la feuille, dans l'ordre.
const source = readFileSync(premiere ? "lib/fiches-exercices/maths-premiere-spe-analyse-graphique.tsx" : "lib/fiches-exercices/maths-seconde-analyse-graphique.tsx", "utf8");
const blocs = source.replace(/\r\n/g, "\n").split(/\n\s*\{\n\s*(?:titre: [^\n]*\n\s*)?enonce:/).slice(1);
if (blocs.length !== 20) ko(`la feuille a ${blocs.length} exercices, pas 20`);
/** Les nombres d'un texte de corrigé, LaTeX compris (« -2 », « −2 », « {-2} »). */
const nombresDe = (t: string) => new Set((t.replace(/\\,/g, " ").match(/[−-]?\d+/g) ?? []).map((s) => Number(s.replace("−", "-"))));

for (const f of FAITS) {
  const c = COURBES[f.c];
  const txt = blocs[f.ex - 1] ?? "";
  const nb = nombresDe(txt);
  const exige = (n: number, quoi: string) => { if (!nb.has(n)) ko(`ex ${f.ex} : ${quoi} ${n} absent du texte`); };
  if ("image" in f) {
    const [x, y] = f.image;
    if (val(c, x) !== y) ko(`ex ${f.ex} : ${f.c}(${x}) = ${val(c, x)}, pas ${y}`);
    exige(y, "l'image");
  } else if ("antecedents" in f) {
    const [k, sol] = f.antecedents;
    const vrai = xs(c).filter((x) => val(c, x) === k);
    if (vrai.join() !== sol.join()) ko(`ex ${f.ex} : antécédents de ${k} = ${vrai}, pas ${sol}`);
    if (c.ys.some((y, i) => i < c.ys.length - 1 && (y - k) * (c.ys[i + 1] - k) < 0)) ko(`ex ${f.ex} : y = ${k} traverse entre deux graduations`);
    sol.forEach((x) => exige(x, "l'antécédent"));
  } else if ("ensemble" in f) {
    const [op, k, ens] = f.ensemble;
    const xb = c.xa + c.ys.length - 1;
    for (let x = c.xa; x <= xb + 1e-9; x += 1 / 24) {
      if (dans(ens, x) !== test(op, evaluer(c, x), k)) { ko(`ex ${f.ex} : ${ens} faux en x = ${x.toFixed(3)}`); break; }
    }
    (ens.match(/−?\d+/g) ?? []).forEach((s) => exige(Number(s.replace("−", "-")), "la borne"));
  } else if ("signes" in f) {
    const [bornes, ligne] = f.signes;
    const signes = ligne.split(" ").filter((s) => s !== "0");
    bornes.slice(0, -1).forEach((a, i) => {
      const b = bornes[i + 1];
      for (let x = a + 0.05; x < b - 0.04; x += 0.05) {
        const s = evaluer(c, x) > 0 ? "+" : "−";
        if (s !== signes[i]) { ko(`ex ${f.ex} : signe faux entre ${a} et ${b}`); break; }
      }
    });
    bornes.slice(1, -1).forEach((z) => { if (val(c, z) !== 0) ko(`ex ${f.ex} : ${z} n'est pas un zéro`); });
    const zeros = xs(c).filter((x) => val(c, x) === 0 && x !== c.xa && x !== c.xa + c.ys.length - 1);
    if (zeros.join() !== bornes.slice(1, -1).join()) ko(`ex ${f.ex} : zéros ${zeros}, bornes ${bornes}`);
  } else {
    const [bornes, valeurs] = f.variations;
    const som = xs(c).filter((x, i) => i > 0 && i < c.ys.length - 1 && (c.ys[i] - c.ys[i - 1]) * (c.ys[i + 1] - c.ys[i]) < 0);
    const attendu = [c.xa, ...som, c.xa + c.ys.length - 1];
    if (attendu.join() !== bornes.join()) ko(`ex ${f.ex} : bornes ${attendu}, pas ${bornes}`);
    bornes.forEach((x, i) => { if (val(c, x) !== valeurs[i]) ko(`ex ${f.ex} : ${f.c}(${x}) = ${val(c, x)}, pas ${valeurs[i]}`); });
    valeurs.forEach((v) => exige(v, "la valeur"));
  }
}
console.log(defauts ? `\n⛔ ${defauts} défauts` : `\n✅ ${FAITS.length} faits recalculés sur 20 exercices : aucun défaut`);
process.exit(defauts ? 1 : 0);
