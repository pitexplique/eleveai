// scripts/echantillon-banque.mjs
//
// « Fais attention à tes étalons pour vérifier et système de mesure. »
// (Frédéric, 15/08/2026)
//
// Les trois vérificateurs disent « unique », « cohérent », « illustré ».
// Aucun ne dit « JUSTE », et aucun ne dit « réellement varié ». Ce script
// répond aux deux angles morts, sans rien remplacer.
//
// ─────────────────────────────────────────────────────────────────────────────
// 1. LA VARIÉTÉ RÉELLE, ET NON LA VARIÉTÉ D'HABILLAGE
//
// `verifier-variete.mjs` compte les TEXTES distincts. Or un générateur qui
// tire « la boulangerie Vanille » puis « le garage Delmas » sur les mêmes
// nombres produit deux textes et UNE SEULE question : l'élève refait le même
// calcul. Le compteur est donc gonflé par les réservoirs de contexte.
//
// Ici on compte les questions MATHÉMATIQUEMENT distinctes : la signature d'un
// énoncé est la liste ordonnée des nombres qu'il contient, plus la réponse
// attendue. Changer les nombres change la signature — c'est de la variété
// légitime. Changer seulement le nom de l'entreprise ne la change pas.
//
// L'écart entre les deux compteurs mesure exactement l'inflation d'habillage.
//
// 2. CE QUE LA MACHINE NE PEUT PAS DIRE
//
// Aucun script ne sait si une réponse est juste, ni si un énoncé est au
// programme. Le script imprime donc un ÉCHANTILLON à lire — énoncé, format,
// réponse attendue — parce que c'est un humain qui tranche.
//
//   node --experimental-strip-types scripts/echantillon-banque.mjs stmg maths
//   node --experimental-strip-types scripts/echantillon-banque.mjs stmg maths der_p_degre2
//   node --experimental-strip-types scripts/echantillon-banque.mjs stmg maths --lire 3
//
// Sortie 1 si une micro produit moins de 10 questions réellement distinctes.

import fs from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";

const args = process.argv.slice(2);
const classe = args[0] ?? "stmg";
const matiere = args[1] ?? "maths";
const iLire = args.indexOf("--lire");
const A_LIRE = iLire === -1 ? 2 : Number(args[iLire + 1] ?? 2);
// ⚠️ La valeur qui SUIT `--lire` n'est pas un nom de micro : sans cette
// exclusion, `--lire 0` fait chercher une micro appelée « 0 ».
const microFiltre =
  args.find((a, i) => i >= 2 && !a.startsWith("--") && i !== iLire + 1) ?? null;
const TIRAGES = 400;
const SEUIL = 10;

/* ── chargement ── */

const dossier = path.resolve(process.cwd(), "lib/tutor-v4/questionBank", classe, matiere);
if (!fs.existsSync(dossier)) {
  console.error(`Dossier introuvable : ${dossier}`);
  process.exit(2);
}

const banque = [];
for (const fichier of fs.readdirSync(dossier).filter((f) => f.endsWith(".bank.ts"))) {
  const mod = await import(pathToFileURL(path.join(dossier, fichier)).href);
  for (const exporte of Object.values(mod)) {
    if (Array.isArray(exporte)) banque.push(...exporte.map((it) => ({ ...it, __fichier: fichier })));
  }
}

/* ── signature mathématique d'un énoncé ──
 *
 * On extrait tous les nombres du texte (virgule décimale comprise) et on y
 * ajoute la réponse attendue. Deux tirages qui partagent cette signature
 * demandent le même travail à l'élève, quel que soit l'habillage.            */

function nombresDe(x) {
  return String(x ?? "").match(/-?\d+(?:[.,]\d+)?/g) ?? [];
}

function signature(q) {
  const nombres = nombresDe(q.text);
  const attendu = Array.isArray(q.expected) ? q.expected.join("|") : String(q.expected ?? "");
  // ⚠️ La FIGURE fait partie de la question. Sur une micro graphique, l'énoncé
  // est souvent constant (« lis la valeur de u(3) ») et toute la variété vit
  // dans les points tracés. Ignorer le canvas ferait passer pour répétitives
  // des micros qui ne le sont pas — et m'aurait poussé à ajouter de la
  // variation de texte là où il n'en faut aucune.
  const fig = q.canvas ? nombresDe(JSON.stringify(q.canvas)).join(",") : "";
  return `${nombres.join(",")}→${attendu}→${fig}`;
}

function tirer(item) {
  if (item.kind === "fixed") return item;
  try {
    return item.generate();
  } catch {
    return null;
  }
}

/* ── mesure ── */

const parMicro = new Map();
for (const item of banque) {
  if (microFiltre && item.microId !== microFiltre) continue;
  if (!parMicro.has(item.microId)) {
    parMicro.set(item.microId, { textes: new Set(), signatures: new Set(), items: [], fichier: item.__fichier });
  }
  const e = parMicro.get(item.microId);
  e.items.push(item);
  const n = item.kind === "fixed" ? 1 : TIRAGES;
  for (let i = 0; i < n; i++) {
    const q = tirer(item);
    if (!q) continue;
    e.textes.add(String(q.text ?? ""));
    e.signatures.add(signature(q));
  }
}

if (parMicro.size === 0) {
  console.error(microFiltre ? `Aucun item pour la micro « ${microFiltre} ».` : "Banque vide.");
  process.exit(2);
}

/* ── rapport ── */

console.log(`ÉCHANTILLON ${classe} · ${matiere}`);
console.log("─".repeat(70));
console.log(
  `${banque.length} items · ${parMicro.size} micro-compétence(s)\n` +
    `Seuil : ${SEUIL} questions RÉELLEMENT distinctes par micro\n`
);

const sousLeSeuil = [];
const inflation = [];

for (const [micro, e] of [...parMicro].sort((a, b) => a[1].signatures.size - b[1].signatures.size)) {
  const t = e.textes.size;
  const s = e.signatures.size;
  if (s < SEUIL) sousLeSeuil.push({ micro, t, s, fichier: e.fichier });
  else if (t >= s * 2) inflation.push({ micro, t, s });
}

if (sousLeSeuil.length) {
  console.log(`⛔ ${sousLeSeuil.length} micro(s) sous le seuil en questions RÉELLES :`);
  for (const m of sousLeSeuil) {
    console.log(
      `     ${m.micro} — ${m.s} question(s) distincte(s) pour ${m.t} texte(s)` +
        (m.t > m.s ? `  ← ${m.t - m.s} de simple habillage` : "")
    );
    console.log(`       ${m.fichier}`);
  }
  console.log("");
}

if (inflation.length) {
  console.log(`⚠️  ${inflation.length} micro(s) au seuil grâce à l'habillage (textes ≥ 2× les questions) :`);
  for (const m of inflation.slice(0, 12)) {
    console.log(`     ${m.micro} — ${m.t} textes pour ${m.s} questions réelles`);
  }
  if (inflation.length > 12) console.log(`     … et ${inflation.length - 12} autre(s)`);
  console.log("");
}

const toutes = [...parMicro.values()].map((e) => e.signatures.size).sort((a, b) => a - b);
const mediane = toutes[Math.floor(toutes.length / 2)];
console.log(
  `Questions réellement distinctes — médiane : ${mediane} · minimum : ${toutes[0]} · maximum : ${toutes[toutes.length - 1]}\n`
);

/* ── l'échantillon à LIRE ── */

if (A_LIRE > 0) {
  console.log("─".repeat(70));
  console.log(`À LIRE — ${A_LIRE} tirage(s) par micro. Aucune machine ne vérifie que la réponse est juste.\n`);
  for (const [micro, e] of [...parMicro].sort()) {
    console.log(`▸ ${micro}`);
    for (let i = 0; i < A_LIRE; i++) {
      const item = e.items[i % e.items.length];
      const q = tirer(item);
      if (!q) continue;
      const texte = String(q.text ?? "").replace(/\s+/g, " ").trim();
      const attendu = Array.isArray(q.expected) ? q.expected.join(" | ") : String(q.expected ?? "");
      console.log(`   ${texte}`);
      if (q.format === "qcm" && Array.isArray(q.choices)) {
        console.log(`      choix : ${q.choices.join("  ·  ")}`);
      }
      console.log(`      [${q.format}] attendu : ${attendu}${q.canvas ? `  · figure : ${q.canvas.kind}` : ""}`);
    }
    console.log("");
  }
}

if (sousLeSeuil.length) process.exit(1);
