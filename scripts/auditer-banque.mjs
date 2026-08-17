// Audit de couverture d'une banque de questions : y a-t-il de quoi ne PAS se
// répéter ?
//
// Écrit pour l'épreuve blanche de l'évaluation nationale de 6ᵉ, qui pioche
// dans le programme de CM2 (Frédéric, 01/08 : « vérifie que le coach CM2 est
// bien fourni, sinon complète-le pour avoir des non-répétitions »).
//
// Même méthode que valider-banques-concours.mjs : on lit le SOURCE, pas le
// module — les banques sont du TypeScript avec des imports, les exécuter
// demanderait un runner qu'on n'a pas.
//
// Ce que la machine peut voir :
//   - combien d'items par micro-compétence, et de quel type ;
//   - un item `template` génère à l'infini → aucun risque de répétition ;
//   - un item `fixed` ne sert qu'une fois → sous 3, l'élève reverra la même
//     question en deux passages.
//   - les micro-compétences déclarées dans le knowledge mais qu'AUCUN item
//     ne travaille : le coach les affiche et n'a rien à proposer.
//
// Usage : node scripts/auditer-banque.mjs [classe] [matiere]
//         node scripts/auditer-banque.mjs cm2 maths

import fs from "node:fs";
import path from "node:path";

const CLASSE = process.argv[2] || "cm2";
const MATIERE = process.argv[3] || "maths";

const BANQUES = path.resolve(`lib/tutor-v4/questionBank/${CLASSE}/${MATIERE}`);
const MICRO_SRC = path.resolve(
  `lib/tutor-v4/knowledge/${MATIERE}/${CLASSE}/microSkills.ts`,
);
const NOTION_SRC = path.resolve(
  `lib/tutor-v4/knowledge/${MATIERE}/${CLASSE}/notions.ts`,
);

/** Seuil sous lequel un micro n'a pas de quoi tenir deux passages. */
const SEUIL_FIXES = 3;

function lireSource(p) {
  if (!fs.existsSync(p)) {
    console.error(`Introuvable : ${p}`);
    process.exit(1);
  }
  return fs.readFileSync(p, "utf8");
}

// ─── Ce que le knowledge DÉCLARE ──────────────────────────────────────────────

const microSrc = lireSource(MICRO_SRC);
const notionSrc = lireSource(NOTION_SRC);

// Dans microSkills.ts : { id: "...", label: "...", notionId: "..." }
const microsDeclares = new Map(); // microId -> { label, notionId }
for (const bloc of microSrc.split(/\n\s*\{/).slice(1)) {
  const id = bloc.match(/id:\s*"([a-z0-9_]+)"/)?.[1];
  const label = bloc.match(/label:\s*"([^"]+)"/)?.[1];
  const notionId = bloc.match(/notionId:\s*"([a-z0-9_]+)"/)?.[1];
  if (id && notionId) microsDeclares.set(id, { label: label ?? id, notionId });
}

const notionsDeclarees = new Map(); // notionId -> label
for (const bloc of notionSrc.split(/\n\s*\{/).slice(1)) {
  const id = bloc.match(/id:\s*"([a-z0-9_]+)"/)?.[1];
  const label = bloc.match(/label:\s*"([^"]+)"/)?.[1];
  if (id) notionsDeclarees.set(id, label ?? id);
}

// ─── Ce que les BANQUES contiennent ───────────────────────────────────────────

const compte = new Map(); // microId -> { fixes, templates, fichiers:Set }
const microsOrphelins = new Set(); // présents en banque, absents du knowledge

function ajouter(microId, kind, fichier) {
  if (!compte.has(microId)) {
    compte.set(microId, { fixes: 0, templates: 0, fichiers: new Set() });
  }
  const c = compte.get(microId);
  if (kind === "template") c.templates += 1;
  else c.fixes += 1;
  c.fichiers.add(fichier);
}

const tousLesFichiers = fs.readdirSync(BANQUES);

const fichiers = tousLesFichiers.filter((f) => f.endsWith(".bank.ts")).sort();

// ⚠️ LES FICHIERS QUE L'AUDIT SAUTERAIT EN SILENCE (ajouté le 01/08).
// Un `operations-relatifs.bank.ts.ts` — double extension — traînait en 5ᵉ :
// il contenait 50 items, il était bien importé (TypeScript résout
// `./x.bank.ts` vers `x.bank.ts.ts`), mais l'audit ne le lisait pas et
// annonçait 5 micro-compétences vides qui ne l'étaient pas. Un outil de
// contrôle qui saute un fichier sans le dire est pire que pas d'outil.
//
// ⚠️ 02/08 — le garde-fou lui-même avait un trou : il cherchait « .bank. »,
// avec un point APRÈS. Le jumeau 4ᵉ s'appelait `operations-relatifs.banks.ts`
// (un « s » de trop) et passait donc entre les mailles : ni lu, ni signalé,
// pendant qu'on annonçait 7 micro-compétences vides en 4ᵉ. On teste
// maintenant sur la simple présence de « bank » dans le nom.
const suspects = tousLesFichiers.filter(
  (f) =>
    !f.endsWith(".bank.ts") &&
    f !== "index.ts" &&
    /bank/i.test(f) === true &&
    !/^build[A-Z]/.test(f), // buildCycle2Bank.ts & co : des constructeurs, pas des banques
);

// ⭐ L'ÉTALON DOIT SE MÉFIER DE LUI-MÊME (Frédéric, 17/08/2026 : « fais
// attention à tes vérificateurs, qu'ils soient bien étalonnés »).
//
// Cet audit LIT LE SOURCE et compte les `microId: "…"` littéraux. Une banque
// bâtie sur une fabrique à arguments positionnels — `qcm(id, notionId,
// microId, …)`, la forme de tout le français — n'en contient AUCUN. L'audit
// annonçait alors « 36 micro-compétences sans aucun item, couverture 63 % »
// pour une banque qui en couvre 96 sur 96 à l'exécution. Un instrument qui
// répond zéro parce qu'il ne sait pas lire est pire qu'un instrument absent :
// on prend sa panne pour une mesure, et on va écrire ce qui existe déjà.
//
// On ne tente pas de le rendre plus malin — c'est `auditer-banque-runtime.ts`
// qui fait ça correctement, en important les modules. Ici on l'oblige à
// DÉTECTER qu'il est hors de son domaine, et à se taire plutôt que mentir.
const fichiersLus = [];
const fichiersMuets = [];

for (const fichier of fichiers) {
  const src = fs.readFileSync(path.join(BANQUES, fichier), "utf8");

  const litteraux = [...src.matchAll(/microId:\s*"([a-z0-9_]+)"/g)];
  // Un fichier de banque qui déclare des items mais aucun `microId` littéral
  // est écrit dans une forme que cet audit ne sait pas lire.
  const aDesItems = /kind:\s*"(fixed|template)"/.test(src);
  if (aDesItems && litteraux.length === 0) fichiersMuets.push(fichier);
  else if (litteraux.length > 0) fichiersLus.push(fichier);

  // Position de chaque `kind: "..."` pour rattacher un microId à son item :
  // dans nos banques, `kind` précède toujours `microId` dans le même objet.
  const kinds = [...src.matchAll(/kind:\s*"(fixed|template)"/g)].map((m) => ({
    index: m.index,
    kind: m[1],
  }));

  for (const m of litteraux) {
    let kind = "fixed";
    for (const k of kinds) {
      if (k.index < m.index) kind = k.kind;
      else break;
    }
    ajouter(m[1], kind, fichier);
    if (!microsDeclares.has(m[1])) microsOrphelins.add(m[1]);
  }
}

// ─── Le refus de mesurer hors domaine ─────────────────────────────────────────

if (fichiersMuets.length > 0) {
  console.error(
    `\n⛔ AUDIT REFUSÉ — cet étalon ne sait pas lire cette banque.\n`,
  );
  console.error(
    `${fichiersMuets.length} fichier(s) déclarent des items sans aucun ` +
      `\`microId: "…"\` littéral : ils passent le microId en argument de ` +
      `fonction, ce que cette lecture du source ne voit pas.\n`,
  );
  for (const f of fichiersMuets.slice(0, 12)) console.error(`      ${f}`);
  if (fichiersMuets.length > 12) {
    console.error(`      … et ${fichiersMuets.length - 12} autre(s)`);
  }
  console.error(
    `\nCompter quand même donnerait un ZÉRO FAUX, et on irait réécrire du ` +
      `contenu qui existe déjà.\n\nUtilise l'audit à l'exécution :\n` +
      `      npx tsx scripts/auditer-banque-runtime.ts ${CLASSE}\n`,
  );
  process.exit(2);
}

// ─── Le rapport ───────────────────────────────────────────────────────────────

const jamais = [];
const maigres = [];
let totalFixes = 0;
let totalTemplates = 0;

for (const [microId, { label, notionId }] of microsDeclares) {
  const c = compte.get(microId);
  if (!c) {
    jamais.push({ microId, label, notionId });
    continue;
  }
  totalFixes += c.fixes;
  totalTemplates += c.templates;
  // Un template génère à l'infini : le micro est couvert quoi qu'il arrive.
  if (c.templates === 0 && c.fixes < SEUIL_FIXES) {
    maigres.push({ microId, label, notionId, fixes: c.fixes });
  }
}

const par = (n) => (n > 1 ? "s" : "");

console.log(`\nBANQUE ${CLASSE.toUpperCase()} · ${MATIERE.toUpperCase()}`);
console.log("─".repeat(64));

// ⚠️ LES BANQUES GÉNÉRÉES (ajouté le 01/08). CP, CE1 et CE2 n'ont pas de
// fichiers .bank.ts : leur index appelle un constructeur (buildCycle2Bank)
// qui fabrique les items À PARTIR des micro-compétences. L'audit lisait donc
// zéro fichier et annonçait 0 % de couverture — un chiffre faux qui aurait
// envoyé écrire des centaines d'items déjà existants.
if (fichiers.length === 0) {
  const index = path.join(BANQUES, "index.ts");
  const via = fs.existsSync(index)
    ? (fs.readFileSync(index, "utf8").match(/build\w+QuestionBank|build\w+Bank/) ?? [])[0]
    : null;
  console.log(
    via
      ? `BANQUE GÉNÉRÉE par ${via}() — pas de fichiers .bank.ts à auditer.\n` +
          `Les items sont fabriqués à partir des micro-compétences elles-mêmes :\n` +
          `la couverture est totale par construction. Rien à compter ici.`
      : `Aucun fichier .bank.ts et aucun constructeur repéré — à vérifier à la main.`,
  );
  console.log(
    `\n${notionsDeclarees.size} notions · ${microsDeclares.size} micro-compétences déclarées\n`,
  );
  process.exit(0);
}
console.log(`${fichiers.length} fichier${par(fichiers.length)} de banque`);
console.log(
  `${notionsDeclarees.size} notions · ${microsDeclares.size} micro-compétences déclarées`,
);
console.log(
  `${totalFixes} items fixes + ${totalTemplates} générateurs (templates)`,
);

if (suspects.length) {
  console.log(
    `\n🚨 FICHIERS QUI RESSEMBLENT À DES BANQUES MAIS NE SONT PAS LUS : ${suspects.length}`,
  );
  for (const s of suspects) console.log(`      ${s}`);
  console.log(
    "      → renomme-les en *.bank.ts, sinon le rapport ci-dessous est faux.",
  );
}

console.log(`\n⛔ MICRO-COMPÉTENCES SANS AUCUN ITEM : ${jamais.length}`);
if (jamais.length) {
  const parNotion = new Map();
  for (const j of jamais) {
    if (!parNotion.has(j.notionId)) parNotion.set(j.notionId, []);
    parNotion.get(j.notionId).push(j);
  }
  for (const [notionId, liste] of [...parNotion].sort(
    (a, b) => b[1].length - a[1].length,
  )) {
    console.log(
      `\n  ${notionsDeclarees.get(notionId) ?? notionId} (${notionId}) — ${liste.length} micro${par(liste.length)}`,
    );
    for (const j of liste) console.log(`      ${j.microId.padEnd(34)} ${j.label}`);
  }
}

console.log(
  `\n⚠️  MICRO-COMPÉTENCES À MOINS DE ${SEUIL_FIXES} ITEMS FIXES (répétition garantie) : ${maigres.length}`,
);
for (const m of maigres.sort((a, b) => a.fixes - b.fixes)) {
  console.log(
    `      ${String(m.fixes)} item${par(m.fixes)}  ${m.microId.padEnd(34)} ${m.label}`,
  );
}

if (microsOrphelins.size) {
  console.log(
    `\n🔍 MICROS PRÉSENTS EN BANQUE MAIS ABSENTS DU KNOWLEDGE : ${microsOrphelins.size}`,
  );
  for (const o of [...microsOrphelins].sort()) console.log(`      ${o}`);
}

const couverts = microsDeclares.size - jamais.length;
const pct = Math.round((couverts / microsDeclares.size) * 100);
console.log(
  `\nCOUVERTURE : ${couverts}/${microsDeclares.size} micro-compétences (${pct} %)\n`,
);
