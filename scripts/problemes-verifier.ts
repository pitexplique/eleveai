// Vérifie un ou plusieurs fichiers d'énigmes (lib/problemes/<classe>/<notion>.ts).
// Usage : npx tsx scripts/problemes-verifier.ts lib/problemes/6e/*.ts
// ⛔ Ne remplace pas la relecture : il attrape les oublis de forme, pas les
// erreurs de maths. Chaque calcul se vérifie à la main.
import { pathToFileURL } from "node:url";
import path from "node:path";
import type { ProblemesNotion } from "../lib/problemes/types";

const PALETTE = new Set(["#1e293b", "#64748b", "#d97706", "#be123c", "#1d4ed8"]);
const sansBalises = (h: string) => h.replace(/<[^>]+>/g, " ").replace(/\$\{[^}]*\}/g, " ");

async function verifier(fichier: string) {
  const erreurs: string[] = [];
  const mod = await import(pathToFileURL(path.resolve(fichier)).href);
  const d: ProblemesNotion = mod.default?.default ?? mod.default;
  if (!d?.problemes) return [`${fichier} : pas d'export default lisible`];
  const attendu = path.basename(fichier, ".ts");
  if (d.notionId !== attendu) erreurs.push(`notionId « ${d.notionId} » ≠ nom du fichier « ${attendu} »`);
  if (!fichier.replace(/\\/g, "/").includes(`/${d.classe}/`)) erreurs.push(`classe « ${d.classe} » ≠ dossier`);
  if (d.problemes.length !== 6) erreurs.push(`${d.problemes.length} énigmes au lieu de 6`);
  if (!d.problemes.some((e) => e.sorte === "piege")) erreurs.push("aucune énigme « piege »");
  if (!d.problemes.some((e) => e.sorte === "defi")) erreurs.push("aucune énigme « defi »");
  const bonnes: number[] = [];
  d.problemes.forEach((e, i) => {
    const ou = `énigme ${i + 1}`;
    if (!e.tag.startsWith(`Énigme ${i + 1} · `)) erreurs.push(`${ou} : tag « ${e.tag} » (attendu « Énigme ${i + 1} · … »)`);
    if (!e.consigne) erreurs.push(`${ou} : pas de consigne`);
    const v = e.verification;
    if (v.type === "qcm") {
      if (v.choix.length !== 3 || new Set(v.choix).size !== 3) erreurs.push(`${ou} : QCM sans 3 choix distincts`);
      if (![0, 1, 2].includes(v.bonne)) erreurs.push(`${ou} : bonne réponse hors A/B/C`);
      bonnes.push(v.bonne);
    } else if (!v.attendus?.length) erreurs.push(`${ou} : réponse courte sans réponse attendue`);
    // Texte : espaces insécables, pas de 5/2 hors fractions en école et 6e.
    for (const [nom, t] of [["question", e.question], ["reponse", e.reponse], ["consigne", e.consigne ?? ""], ["titre", e.titre], ["tag", e.tag]] as const) {
      const brut = sansBalises(t);
      if (/ [?!:;]/.test(brut)) erreurs.push(`${ou} ${nom} : espace ordinaire avant ? ! : ;`);
      if (/« |\s»/.test(brut.replace(/« /g, "").replace(/ »/g, ""))) erreurs.push(`${ou} ${nom} : guillemets sans espace insécable`);
      if (["cp", "ce1", "ce2", "cm1", "cm2", "6e"].includes(d.classe) && !d.notionId.startsWith("fraction") && /\d\s*\/\s*\d/.test(brut))
        erreurs.push(`${ou} ${nom} : « a/b » hors fractions (écrire ÷ ou frac())`);
      if (/undefined|NaN/.test(t)) erreurs.push(`${ou} ${nom} : undefined/NaN`);
    }
    // Dessin.
    const s = e.dessin;
    if (!/^<svg viewBox="0 0 \d+ \d+"/.test(s.trim())) erreurs.push(`${ou} : le dessin ne commence pas par <svg viewBox="0 0 L H"`);
    if (!s.trim().endsWith("</svg>")) erreurs.push(`${ou} : le dessin ne finit pas par </svg>`);
    if (!/aria-label="[^"]+"/.test(s)) erreurs.push(`${ou} : dessin sans aria-label`);
    for (const c of s.match(/#[0-9a-fA-F]{6}\b/g) ?? []) if (!PALETTE.has(c.toLowerCase())) erreurs.push(`${ou} : couleur hors palette ${c}`);
    if (/#[0-9a-fA-F]{3}\b(?![0-9a-fA-F])/.test(s)) erreurs.push(`${ou} : couleur courte #abc`);
    if (/undefined|NaN/.test(s)) erreurs.push(`${ou} : undefined/NaN dans le dessin`);
    const ouvre = (s.match(/<(text|g|svg)\b/g) ?? []).length, ferme = (s.match(/<\/(text|g|svg)>/g) ?? []).length;
    if (ouvre !== ferme) erreurs.push(`${ou} : balises text/g/svg mal fermées (${ouvre} ouvertes, ${ferme} fermées)`);
  });
  const rep = [0, 1, 2].map((k) => bonnes.filter((b) => b === k).length);
  return [...erreurs.map((x) => `  ✗ ${x}`), `  QCM : A ${rep[0]} · B ${rep[1]} · C ${rep[2]}`];
}

async function main() {
  let total = 0;
  for (const f of process.argv.slice(2)) {
    const lignes = await verifier(f);
    const nbErr = lignes.filter((l) => l.includes("✗")).length;
    total += nbErr;
    console.log(`${nbErr ? "✗" : "✓"} ${f}`);
    for (const l of lignes) console.log(l);
  }
  process.exit(total ? 1 : 0);
}
void main();
