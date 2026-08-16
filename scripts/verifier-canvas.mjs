// scripts/verifier-canvas.mjs
//
// « N'oublie pas les canvas, surtout pour les parties graphiques. »
// (Frédéric, 15/08/2026)
//
// Une valeur relevée soi-même sur une courbe est une prise ; une valeur donnée
// dans l'énoncé n'est qu'un nombre de plus. Ce vérificateur cherche donc les
// micro-compétences dont l'intitulé APPELLE une figure — « graphiquement »,
// « lire un diagramme », « nuage de points », « tableau croisé », « arbre » —
// et qui n'en portent aucune.
//
// Les trois autres vérificateurs contrôlent qu'une question est juste, qu'elle
// ne se contredit pas et qu'elle ne se répète pas. Celui-ci contrôle qu'elle
// se VOIT. C'est un défaut qu'aucun des trois ne peut attraper : une question
// graphique posée en toutes lettres est parfaitement valide, et pédagogiquement
// fausse.
//
//   node --experimental-strip-types scripts/verifier-canvas.mjs stmg maths
//
// Sortie 1 si une micro « graphique » n'a aucune figure.
// Les micros sans mot-clé graphique sont listées à titre indicatif : un canvas
// y est un bonus, jamais une obligation.

import fs from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";

const classe = process.argv[2] ?? "stmg";
const matiere = process.argv[3] ?? "maths";
const TIRAGES = 12;

// Un intitulé de micro qui contient l'un de ces mots décrit un geste qui se
// fait SUR une figure. La liste est volontairement courte : mieux vaut rater
// un cas que réclamer un dessin là où il n'apporte rien.
const MOTS_GRAPHIQUES = [
  "graphiquement",
  "graphique",
  "courbe",
  "parabole",
  "diagramme",
  "histogramme",
  "nuage",
  "tangente",
  "tableau croisé",
  "tableau de variations",
  "tableau de signes",
  "arbre",
  "tracer",
  "représent",
  "allure",
  "feuille de calcul",
  "tableur",
];

// Les micros dont l'intitulé sonne graphique mais qui doivent se passer de
// figure. Une exception se déclare ICI, avec sa raison — pas en silence dans
// une banque. La liste doit rester très courte : si elle grossit, c'est que
// les mots-clés ci-dessus sont mal choisis.
const SANS_FIGURE_VOULU = {
  autoT_signe_image_mentale:
    "le BO demande de conclure « à l'aide d'une image mentale de la courbe », " +
    "donc SANS la tracer : fournir le dessin supprimerait l'automatisme travaillé",
};

function estGraphique(label) {
  const l = label.toLowerCase();
  return MOTS_GRAPHIQUES.some((mot) => l.includes(mot));
}

/* ── chargement des banques ── */

const dossier = path.resolve(process.cwd(), "lib/tutor-v4/questionBank", classe, matiere);
if (!fs.existsSync(dossier)) {
  console.error(`Dossier introuvable : ${dossier}`);
  process.exit(2);
}

const banque = [];
for (const fichier of fs.readdirSync(dossier).filter((f) => f.endsWith(".bank.ts"))) {
  const mod = await import(pathToFileURL(path.join(dossier, fichier)).href);
  for (const exporte of Object.values(mod)) {
    if (Array.isArray(exporte)) banque.push(...exporte);
  }
}

/* ── chargement des intitulés de micro-compétences ── */

const cheminMicros = path.resolve(
  process.cwd(),
  "lib/tutor-v4/knowledge",
  matiere,
  classe,
  "microSkills.ts"
);
const labels = new Map();
if (fs.existsSync(cheminMicros)) {
  const mod = await import(pathToFileURL(cheminMicros).href);
  for (const m of mod.microSkills ?? []) labels.set(m.id, m.label);
}

/* ── un item porte-t-il une figure ? ── */

function porteUneFigure(item) {
  if (item.kind === "fixed") return Boolean(item.canvas);
  for (let i = 0; i < TIRAGES; i++) {
    try {
      if (item.generate()?.canvas) return true;
    } catch {
      /* le vérificateur de générateurs signale déjà les gabarits qui lèvent */
    }
  }
  return false;
}

const parMicro = new Map();
for (const item of banque) {
  if (!parMicro.has(item.microId)) parMicro.set(item.microId, { total: 0, figures: 0 });
  const e = parMicro.get(item.microId);
  e.total++;
  if (porteUneFigure(item)) e.figures++;
}

/* ── rapport ── */

console.log(`CANVAS ${classe} · ${matiere}`);
console.log("─".repeat(64));
console.log(`${banque.length} items · ${parMicro.size} micro-compétences avec au moins un item\n`);

const manquantes = [];
const partielles = [];
const couvertes = [];
const bonus = [];
const exceptions = [];

for (const [micro, e] of [...parMicro].sort((a, b) => a[0].localeCompare(b[0]))) {
  const label = labels.get(micro) ?? micro;
  const ligne = `${micro} — ${e.figures}/${e.total} item(s) avec figure`;
  if (SANS_FIGURE_VOULU[micro]) {
    exceptions.push({ micro, raison: SANS_FIGURE_VOULU[micro] });
  } else if (estGraphique(label)) {
    if (e.figures === 0) manquantes.push({ ligne, label });
    else if (e.figures < e.total) partielles.push({ ligne, label });
    else couvertes.push({ ligne, label });
  } else if (e.figures > 0) {
    bonus.push({ ligne, label });
  }
}

if (couvertes.length) {
  console.log(`✅ Micros graphiques entièrement illustrées (${couvertes.length}) :`);
  for (const c of couvertes) console.log(`     ${c.ligne}`);
  console.log("");
}

if (bonus.length) {
  console.log(`➕ Figures ajoutées là où l'intitulé ne l'exigeait pas (${bonus.length}) :`);
  for (const b of bonus) console.log(`     ${b.ligne}`);
  console.log("");
}

if (exceptions.length) {
  console.log(`⚪ Sans figure, volontairement (${exceptions.length}) :`);
  for (const ex of exceptions) console.log(`     ${ex.micro}\n       ${ex.raison}`);
  console.log("");
}

if (partielles.length) {
  console.log(`~  Micros graphiques partiellement illustrées (${partielles.length}) :`);
  for (const p of partielles) console.log(`     ${p.ligne}\n       « ${p.label} »`);
  console.log("");
}

// ── taux de couverture, toutes micros confondues ──
//
// « Les STMG et les STL ne sont pas très forts en calcul pur. » (Frédéric,
// 15/08/2026) Une figure ne sert pas qu'aux micros dont l'intitulé la réclame :
// elle donne une prise là où le calcul seul bloque. On affiche donc le taux
// global, pour que la couverture se pilote au lieu d'arriver par hasard.
const avecFigure = [...parMicro.values()].filter((e) => e.figures > 0).length;
const taux = Math.round((avecFigure / parMicro.size) * 100);
console.log(
  `📊 Couverture globale : ${avecFigure}/${parMicro.size} micro-compétences portent une figure (${taux} %).\n` +
    `   Les micros « graphiques » y sont obligées ; les autres en profitent.\n`
);

if (manquantes.length) {
  console.log(`⛔ ${manquantes.length} micro(s) GRAPHIQUE(S) sans aucune figure :`);
  for (const m of manquantes) console.log(`     ${m.ligne}\n       « ${m.label} »`);
  console.log(
    "\n   L'intitulé décrit un geste qui se fait sur une figure. Posée en toutes\n" +
      "   lettres, la question change de nature : l'élève ne relève plus, il lit."
  );
  process.exit(1);
}

console.log("Aucune micro graphique sans figure.");
