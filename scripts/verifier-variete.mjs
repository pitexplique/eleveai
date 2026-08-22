// scripts/verifier-variete.mjs
//
// « Un élève ne doit pas retomber sur la même question en dix minutes. »
// (Frédéric, 15/08/2026)
//
// À une minute par question, dix minutes de travail sur UNE micro-compétence
// font dix questions. Il faut donc au moins dix énoncés distincts par micro —
// sinon l'élève reconnaît la question et répond sans refaire le raisonnement.
//
// verifier-generateurs.mjs contrôle qu'un gabarit ne se contredit pas ;
// celui-ci contrôle qu'il ne se RÉPÈTE pas. Ce sont deux défauts différents :
// un gabarit peut être parfaitement juste et ne produire que quatre énoncés.
//
// On tire chaque item de la micro un grand nombre de fois et l'on compte les
// textes distincts. Un `fixed` compte pour un ; un `template` pour autant
// d'énoncés qu'il sait fabriquer.
//
//   npx --yes tsx@4 scripts/verifier-variete.mjs premiere maths
//   npx --yes tsx@4 scripts/verifier-variete.mjs premiere maths 15
//
// Le troisième argument est le seuil (10 par défaut).
// Sortie 1 si une micro-compétence passe sous le seuil.
//
// ⛔⛔ IL MESURAIT LA MOITIÉ DE LA BANQUE — corrigé le 22/08/2026.
// Le chargeur ne lisait que les `*.bank.ts` du dossier de la classe. En maths
// c'est toute la banque ; EN FRANÇAIS, non : les gabarits générés viennent de
// `questionBank/cycle3/francais/buildCycle3FrancaisBank.ts`, un dossier qu'il
// n'ouvrait jamais. Il ne voyait donc que la couche « fixed », et annonçait
// « 1 énoncé » sur des micros que les générateurs alimentent en centaines de
// variantes. Un instrument qui ne voit qu'une partie de son objet ne mesure
// pas peu : il mesure FAUX, et dans le sens qui fait travailler pour rien.
// On charge désormais `index.ts` — l'export que le coach consomme réellement.
// ⚠️ Il faut donc `tsx` : `index.ts` importe par alias `@/…`, que
// `node --experimental-strip-types` ne sait pas résoudre.

import fs from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";

const classe = process.argv[2] ?? "premiere";
const matiere = process.argv[3] ?? "maths";
const SEUIL = Number(process.argv[4] ?? 10);
const TIRAGES = 400;

// LA BANQUE, C'EST `index.ts` — celle que le coach sert vraiment. Elle fusionne
// les fichiers `*.bank.ts` du dossier ET, en français, les gabarits fabriqués
// ailleurs (`cycle3/francais`, `cycle4/francais`). On ne retombe sur la lecture
// fichier par fichier que si la classe n'a pas d'index.
const dossier = path.resolve(process.cwd(), "lib/tutor-v4/questionBank", classe, matiere);
if (!fs.existsSync(dossier)) {
  console.error(`Dossier introuvable : ${dossier}`);
  process.exit(2);
}

const banque = [];
const index = path.join(dossier, "index.ts");
const fichiers = fs.existsSync(index)
  ? [index]
  : fs.readdirSync(dossier).filter((f) => f.endsWith(".bank.ts")).map((f) => path.join(dossier, f));
for (const fichier of fichiers) {
  const mod = await import(pathToFileURL(fichier).href);
  for (const exporte of Object.values(mod)) {
    if (Array.isArray(exporte)) banque.push(...exporte);
  }
}

if (!banque.length) {
  console.error(`Aucun item trouvé dans ${dossier}`);
  process.exit(2);
}

/** Les énoncés distincts qu'un item sait produire. */
function enoncesDe(item) {
  if (item.kind === "fixed") return new Set([item.text]);
  const vus = new Set();
  for (let i = 0; i < TIRAGES; i++) {
    try {
      const q = item.generate();
      // L'empreinte doit contenir TOUT ce que l'élève voit : le texte, les
      // propositions, et la FIGURE. « Quelle est la moyenne de la série
      // ci-contre ? » ne change pas d'un mot d'un tirage à l'autre, mais le
      // tableau, lui, change — et c'est une autre question.
      vus.add(
        `${q.text}||${(q.choices ?? []).join("|")}||${q.canvas ? JSON.stringify(q.canvas) : ""}`
      );
    } catch {
      /* un tirage qui échoue est signalé par verifier-generateurs */
    }
  }
  return vus;
}

const parMicro = new Map();
for (const item of banque) {
  const cle = item.microId;
  if (!parMicro.has(cle)) parMicro.set(cle, { items: 0, enonces: new Set(), fixes: 0 });
  const entree = parMicro.get(cle);
  entree.items += 1;
  if (item.kind === "fixed") entree.fixes += 1;
  for (const e of enoncesDe(item)) entree.enonces.add(e);
}

const lignes = [...parMicro.entries()]
  .map(([micro, v]) => ({ micro, n: v.enonces.size, items: v.items, fixes: v.fixes }))
  .sort((a, b) => a.n - b.n);

console.log(`VARIÉTÉ ${classe} · ${matiere} — seuil : ${SEUIL} énoncés distincts par micro`);
console.log("─".repeat(64));
console.log(`${parMicro.size} micro-compétences, ${banque.length} items`);

const faibles = lignes.filter((l) => l.n < SEUIL);

if (faibles.length) {
  console.log(`\n⛔ ${faibles.length} micro(s) sous le seuil — l'élève reverra la même question :`);
  for (const l of faibles) {
    console.log(
      `   ${String(l.n).padStart(3)} énoncés  ·  ${l.micro}  (${l.items} item${l.items > 1 ? "s" : ""}${l.fixes ? `, dont ${l.fixes} fixe${l.fixes > 1 ? "s" : ""}` : ""})`
    );
  }
} else {
  console.log(`\n✅ Toutes les micro-compétences produisent au moins ${SEUIL} énoncés distincts.`);
}

const mediane = lignes[Math.floor(lignes.length / 2)]?.n ?? 0;
console.log(
  `\nMédiane : ${mediane} énoncés par micro · minimum : ${lignes[0]?.n} · maximum : ${lignes[lignes.length - 1]?.n}`
);

process.exit(faibles.length ? 1 : 0);
