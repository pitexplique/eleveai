// La feuille BILAN de chaque vidéo (/video/<id>/bilan), lue dans le manifeste :
// les chapitres (« ce que j'ai vu », à cocher compris / pas tout à fait / pas
// compris) et les questions-pauses à refaire sur papier, corrigé en bas.
//
//   node scripts/generer-bilans-videos.mjs      (lancé aussi par generer-videos-r2.mjs)
//
// ⭐ 27/10/2026 — Frédéric, après avoir passé les vidéos en classe : « les élèves
// ont adoré les vidéos ; en tant que prof je vais devoir imprimer une feuille sur
// ce qu'ils ont retenu, compris ou pas compris ».
import fs from "node:fs";
import path from "node:path";

const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1")), "..");
const manifeste = JSON.parse(fs.readFileSync(path.join(RACINE, "manim", "manifeste-youtube.json"), "utf8"));

// Les chapitres qui ne sont pas une notion : questions, corrections, générique.
const PAS_NOTION = /^(question|correction|à toi|a toi|ce que tu as appris|le défi|défi|réponse|conclusion|intro)/i;

const bilans = {};
for (const v of manifeste.videos) {
  const vus = (v.chapitres ?? []).map(([, t]) => t).filter((t, i) => i > 0 && !PAS_NOTION.test(t.trim()));
  const questions = (v.questions ?? [])
    .filter((q) => q.question && Array.isArray(q.choix) && q.choix.length > 1)
    .map((q) => ({ question: q.question, choix: q.choix, reponse: q.reponse }));
  if (vus.length === 0 && questions.length === 0) continue;
  bilans[v.id] = { vus, questions };
}
const sortie = path.join(RACINE, "lib", "videos", "bilans-videos.json");
fs.writeFileSync(sortie, JSON.stringify(bilans) + "\n", "utf8");
console.log(`${Object.keys(bilans).length} feuilles bilan → ${path.relative(RACINE, sortie)} (${(fs.statSync(sortie).size / 1024).toFixed(0)} Ko)`);

// ⭐ 27/10/2026 — « une feuille A4 pour les micros d'une notion, elle peut être
// recto verso » : par classe et notion, les paysages dans l'ordre des dossiers
// (01-, 02-…), une ligne par micro et sa première question-pause.
const KNOW = path.join(RACINE, "lib", "tutor-v4", "knowledge", "maths");
const sources = {};
const libelleNotion = (classe, id) => {
  if (!(classe in sources)) {
    const f = path.join(KNOW, classe, "notions.ts");
    sources[classe] = fs.existsSync(f) ? fs.readFileSync(f, "utf8") : "";
  }
  return sources[classe].match(new RegExp(`id: "${id}",\\s*label: "([^"]+)"`))?.[1] ?? null;
};
const notions = {};
for (const v of manifeste.videos) {
  if (v.type === "short" || !v.notionId || !v.classe) continue;
  const morceaux = v.titre.split(" — ");
  const q = (v.questions ?? []).find((x) => x.question && Array.isArray(x.choix) && x.choix.length > 1);
  (notions[`${v.classe}/${v.notionId}`] ??= { classe: v.classe, notion: libelleNotion(v.classe, v.notionId) ?? v.notionId, videos: [] }).videos.push({
    id: v.id,
    micro: morceaux.length > 2 ? morceaux[1] : morceaux[0],
    ordre: v.fichier,
    question: q ? { question: q.question, choix: q.choix, reponse: q.reponse } : null,
  });
}
for (const [cle, n] of Object.entries(notions)) {
  if (n.videos.length < 2) { delete notions[cle]; continue; }
  n.videos.sort((x, y) => x.ordre.localeCompare(y.ordre));
  for (const x of n.videos) delete x.ordre;
}
const sortieN = path.join(RACINE, "lib", "videos", "bilans-notions.json");
fs.writeFileSync(sortieN, JSON.stringify(notions) + "\n", "utf8");
console.log(`${Object.keys(notions).length} feuilles bilan par notion → ${path.relative(RACINE, sortieN)}`);
