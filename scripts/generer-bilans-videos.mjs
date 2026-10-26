// La feuille BILAN de chaque vidéo (/video/<id>/bilan), lue dans le manifeste :
// les chapitres (« ce que j'ai vu », à cocher compris / pas tout à fait / pas
// compris). Et la CARTE MENTALE de chaque notion (/video/bilan/<classe>/<notion>).
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
const PAS_NOTION = /^(question|la question|correction|à toi|a toi|ce que tu as appris|ce que tu sais faire|le défi|défi|réponse|conclusion|intro|et toi)/i;
// Les questions écrites à la main pour les vidéos sans questions-pauses (Pythagore 4e…).
const MANUELLES = JSON.parse(fs.readFileSync(path.join(RACINE, "manim", "bilans-questions.json"), "utf8"));
// ⛔ 27/10/2026 — Frédéric : « surtout ne pas demander quelle fraction de la barre
// est coloriée alors que tu n'affiches pas la barre ». Sur papier, une question
// qui renvoie à une image de la vidéo n'a pas de sens : on l'écarte.
const VUE_DANS_LA_VIDEO = /de la barre|de la figure|du dessin|du schéma|point (bleu|rouge|vert|orange|noir)|marque le point|ce point|ci-dessus|ci-contre|à l.écran|qui a fait/i;
const surPapier = (q) => q.question && Array.isArray(q.choix) && q.choix.length > 1 && !VUE_DANS_LA_VIDEO.test(q.question);
const questionsDe = (v) => (v.questions?.length ? v.questions : MANUELLES[v.id] ? [MANUELLES[v.id]] : []).filter(surPapier);

const bilans = {};
for (const v of manifeste.videos) {
  const vus = (v.chapitres ?? []).map(([, t]) => t).filter((t, i) => i > 0 && !PAS_NOTION.test(t.trim()));
  const questions = questionsDe(v).map((q) => ({ question: q.question, choix: q.choix, reponse: q.reponse }));
  if (vus.length === 0 && questions.length === 0) continue;
  bilans[v.id] = { vus, questions };
}
const sortie = path.join(RACINE, "lib", "videos", "bilans-videos.json");
fs.writeFileSync(sortie, JSON.stringify(bilans) + "\n", "utf8");
console.log(`${Object.keys(bilans).length} feuilles bilan → ${path.relative(RACINE, sortie)} (${(fs.statSync(sortie).size / 1024).toFixed(0)} Ko)`);

// ⭐ 27/10/2026 — la CARTE MENTALE d'une notion. Frédéric : « tu fais comme si
// les vidéos existaient, ça nous évitera de les refaire ; tu te bases sur le
// nombre de micros par notion ». Source : le coach (knowledge/maths/<classe>/
// microSkills.ts et notions.ts), une bulle par micro, dans l'ordre du coach,
// qu'il y ait des vidéos ou non.
const KNOW = path.join(RACINE, "lib", "tutor-v4", "knowledge", "maths");
// Le texte affiché sur papier, sans LaTeX : « $\\mathbb{R}$ » → « R ».
const SYMBOLES = { cap: "∩", cup: "∪", times: "×", mapsto: "↦", to: "→", leqslant: "⩽", geqslant: "⩾", leq: "≤", geq: "≥", le: "≤", ge: "≥", ne: "≠", neq: "≠", infty: "∞", in: "∈", pi: "π", cdot: "·", ldots: "…", dots: "…", approx: "≈", pm: "±", Delta: "Δ", alpha: "α", theta: "θ", lambda: "λ", sigma: "σ", mu: "μ" };
const clair = (t) =>
  t
    .replace(/\\(["\\])/g, "$1")
    .replace(/\\mathbb\{(\w)\}/g, "$1")
    .replace(/\\(?:text|mathrm|mathbf|overrightarrow|vec)\{([^}]*)\}/g, "$1")
    .replace(/\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/g, "$1/$2")
    .replace(/\\sqrt\{([^{}]*)\}/g, "√$1")
    .replace(/\\([A-Za-z]+)/g, (_, c) => SYMBOLES[c] ?? "")
    .replace(/\^\{([^{}]+)\}/g, (_, e) => (e.length > 1 ? `^(${e})` : `^${e}`))
    .replace(/_\{([^{}]+)\}/g, "_$1")
    .replace(/[{}$]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
const CHAINE = String.raw`"((?:[^"\\]|\\.)*)"`;
// (des commentaires peuvent séparer l'id du label, ex. seconde/notions.ts)
const NOTION = new RegExp(String.raw`id:\s*"([^"]+)",(?:\s*\/\/[^\n]*)*\s*label:\s*` + CHAINE, "g");
const MICRO = new RegExp(String.raw`id:\s*"([^"]+)",\s*label:\s*` + CHAINE + String.raw`,\s*notionId:\s*"([^"]+)"`, "g");

const notions = {};
for (const classe of fs.readdirSync(KNOW, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)) {
  const lire = (f) => (fs.existsSync(path.join(KNOW, classe, f)) ? fs.readFileSync(path.join(KNOW, classe, f), "utf8") : "");
  const libelles = {};
  for (const m of lire("notions.ts").matchAll(NOTION)) libelles[m[1]] ??= clair(m[2]);
  for (const m of lire("microSkills.ts").matchAll(MICRO)) {
    const n = (notions[`${classe}/${m[3]}`] ??= { classe, notion: libelles[m[3]] ?? m[3].replace(/_/g, " "), micros: [] });
    n.micros.push(clair(m[2]));
  }
}
const sortieN = path.join(RACINE, "lib", "videos", "bilans-notions.json");
fs.writeFileSync(sortieN, JSON.stringify(notions) + "\n", "utf8");
const toutes = Object.values(notions);
console.log(`${toutes.length} cartes mentales (une par notion du coach, ${toutes.filter((n) => n.micros.length > 8).length} sur deux pages) → ${path.relative(RACINE, sortieN)}`);
