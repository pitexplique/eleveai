// Vérification de VALIDITÉ d'une banque de questions.
//
// Complément de scripts/auditer-banque.mjs, qui mesure la COUVERTURE (y a-t-il
// de quoi ne pas se répéter ?). Ici on répond à une autre question : les items
// qu'on a écrits sont-ils utilisables par un élève ?
//
// Écrit le 02/08/2026 après la mise à niveau de la 1ʳᵉ spé (202 → 495 items).
// Les trois contrôles viennent d'erreurs qui ne se voient PAS au runtime :
//
//   1. Un `expected` absent des `choices` rend la question IMPOSSIBLE : l'élève
//      ne peut pas la réussir, et rien dans l'application ne le signale.
//      ⚠️ En revanche, la POSITION de la bonne réponse dans le source n'a aucune
//      importance : questionPairBuilder.ts mélange les choix (seed déterministe
//      sur l'id) « afin que la bonne réponse ne soit jamais systématiquement en
//      première position ». C'est une convention d'écriture, pas une erreur :
//      on l'affiche pour information, sans peser sur le code de sortie.
//   2. Un énoncé recopié à l'identique ruine l'objectif même de la densité —
//      on croit avoir 11 questions, l'élève en voit deux fois la même.
//   3. Un "$" orphelin casse le rendu KaTeX d'un item. On ne s'en aperçoit
//      qu'en tombant dessus, c'est-à-dire trop tard.
//
// On lit le SOURCE, pas le module : les banques sont du TypeScript avec des
// imports, les exécuter demanderait un runner qu'on n'a pas (même méthode que
// auditer-banque.mjs et valider-banques-concours.mjs).
//
// Usage : node scripts/verifier-banque.mjs [classe] [matiere] [cible]
//         node scripts/verifier-banque.mjs premiere-spe maths 11
//
// Sortie 1 s'il y a le moindre problème : utilisable comme garde-fou.

import fs from "node:fs";
import path from "node:path";

const CLASSE = process.argv[2] || "premiere-spe";
const MATIERE = process.argv[3] || "maths";
/** Densité visée, en items FIXES par micro-compétence (Terminale = 11). */
const CIBLE = Number(process.argv[4] || 11);

const BANQUES = path.resolve(`lib/tutor-v4/questionBank/${CLASSE}/${MATIERE}`);
const MICRO_SRC = path.resolve(
  `lib/tutor-v4/knowledge/${MATIERE}/${CLASSE}/microSkills.ts`,
);

if (!fs.existsSync(BANQUES)) {
  console.error(`Introuvable : ${BANQUES}`);
  process.exit(1);
}

/* ─── Découpage en items ────────────────────────────────────────────────────
   On repère chaque item par son `kind`, et non par l'indentation : le
   découpage résiste ainsi à une mise en forme différente d'un fichier à
   l'autre. On vérifie ensuite qu'on a bien trouvé autant d'items que de
   `microId` — sinon le rapport porterait sur une partie seulement du fichier,
   et un « 0 problème » serait un mensonge. */
function decouper(src) {
  const debuts = [...src.matchAll(/\{\s*\n\s*kind:\s*"(fixed|template)"/g)];
  return debuts.map((m, i) => ({
    kind: m[1],
    texte: src.slice(m.index, debuts[i + 1]?.index ?? src.length),
  }));
}

/** Extrait les chaînes JS d'un tableau littéral commençant à `start` ("["). */
function lireTableau(src, start) {
  const out = [];
  let i = start + 1;
  while (i < src.length) {
    const c = src[i];
    if (c === "]") return out;
    if (c === '"') {
      let s = "";
      i += 1;
      while (i < src.length && src[i] !== '"') {
        if (src[i] === "\\") {
          s += src[i] + src[i + 1];
          i += 2;
          continue;
        }
        s += src[i];
        i += 1;
      }
      out.push(s);
    }
    i += 1;
  }
  return out;
}

const fichiers = fs.readdirSync(BANQUES).filter((f) => f.endsWith(".bank.ts"));

// Même piège que dans auditer-banque.mjs : un `x.bank.ts.ts` est chargé par
// TypeScript mais sauté ici. Le dire, plutôt que de rendre un rapport faux.
const suspects = fs
  .readdirSync(BANQUES)
  .filter((f) => !f.endsWith(".bank.ts") && f !== "index.ts" && /\.bank\./.test(f));

console.log(`\nVÉRIFICATION ${CLASSE.toUpperCase()} · ${MATIERE.toUpperCase()}`);
console.log("─".repeat(64));

if (fichiers.length === 0) {
  console.log(
    "Aucun fichier .bank.ts : banque probablement GÉNÉRÉE depuis les\n" +
      "micro-compétences (cas de CP, CE1, CE2). Rien à vérifier ici.\n",
  );
  process.exit(0);
}

if (suspects.length) {
  console.log(`\n🚨 FICHIERS NON LUS (renomme-les en *.bank.ts) : ${suspects.join(", ")}`);
}

const problemes = [];
const conventions = []; // écarts de style, sans effet pour l'élève
const enonces = new Map(); // text -> [ids]
const identifiants = new Map(); // id -> [fichiers]
const densite = new Map(); // microId -> nb d'items fixes
let nbFixes = 0;
let nbQcm = 0;
let nbQcmOpaques = 0;
let nbChaines = 0;

for (const f of fichiers) {
  const src = fs.readFileSync(path.join(BANQUES, f), "utf8");
  const items = decouper(src);
  const attendus = [...src.matchAll(/microId:\s*"/g)].length;
  if (items.length !== attendus) {
    problemes.push(
      `${f} : ${items.length} items découpés pour ${attendus} microId — ` +
        "mise en forme inattendue, la vérification serait PARTIELLE.",
    );
    continue;
  }

  for (const { kind, texte } of items) {
    // Les id ne sont pas tous en snake_case : le CM1 utilise "cm1-algo-inst-001".
    const id = texte.match(/\n\s*id:\s*"([A-Za-z0-9_-]+)"/)?.[1] ?? "(sans id)";
    const microId = texte.match(/microId:\s*"([A-Za-z0-9_-]+)"/)?.[1];

    if (!identifiants.has(id)) identifiants.set(id, []);
    identifiants.get(id).push(f);

    // Les templates fabriquent leur énoncé dans generate() à partir de
    // variables : ni leur texte ni leurs choix ne sont lisibles dans le source.
    if (kind === "template") continue;
    nbFixes += 1;
    if (microId) densite.set(microId, (densite.get(microId) ?? 0) + 1);

    // 1. Énoncés en double
    const enonce = texte.match(/\n\s*text:\s*"((?:[^"\\]|\\.)*)"/)?.[1];
    if (enonce) {
      if (!enonces.has(enonce)) enonces.set(enonce, []);
      enonces.get(enonce).push(`${f} ${id}`);
    }

    // 2. QCM : la bonne réponse figure-t-elle dans les choix, en 1re position ?
    const iC = texte.indexOf("choices:");
    const iE = texte.indexOf("expected:");
    if (iC !== -1 && iE !== -1) {
      // `choices:` n'est pas toujours un tableau littéral : le CM1 le construit
      // par makeChoices("bonne réponse", ["mauvaises"]). Lire le premier "["
      // venu attraperait alors le tableau des MAUVAISES réponses et ferait
      // crier à la « question impossible » sur des items parfaitement valides.
      const litteral = /^\s*\[/.test(texte.slice(iC + "choices:".length));
      const choix = litteral ? lireTableau(texte, texte.indexOf("[", iC)) : [];
      const attendu = /^\s*\[/.test(texte.slice(iE + "expected:".length))
        ? lireTableau(texte, texte.indexOf("[", iE))
        : [];
      if (!litteral || !attendu.length) {
        nbQcmOpaques += 1; // construit à l'exécution : non vérifiable ici
      } else {
        nbQcm += 1;
        if (!choix.length) {
          problemes.push(`${f} ${id} : choices illisibles`);
        } else if (!choix.includes(attendu[0])) {
          problemes.push(
            `${f} ${id} : QUESTION IMPOSSIBLE — la réponse attendue n'est pas dans les choix\n` +
              `        attendu : ${attendu[0]}\n` +
              `        choix   : ${choix.join(" | ")}`,
          );
        } else if (choix[0] !== attendu[0]) {
          // Sans effet pour l'élève (le moteur mélange) : simple convention.
          conventions.push(
            `${f} ${id} : bonne réponse écrite en position ${choix.indexOf(attendu[0]) + 1}`,
          );
        }
        if (new Set(choix).size !== choix.length) {
          problemes.push(`${f} ${id} : deux choix identiques`);
        }
      }
    }

    // 3. LaTeX : délimiteurs et accolades appariés
    for (const m of texte.matchAll(/"((?:[^"\\]|\\.)*)"/g)) {
      const s = m[1];
      if (!s.includes("$")) continue;
      nbChaines += 1;
      if ((s.match(/\$/g) ?? []).length % 2 !== 0) {
        problemes.push(`${f} ${id} : "$" orphelin → ${s.slice(0, 90)}`);
      }
      if ((s.match(/\{/g) ?? []).length !== (s.match(/\}/g) ?? []).length) {
        problemes.push(`${f} ${id} : accolades déséquilibrées → ${s.slice(0, 90)}`);
      }
    }
  }
}

for (const [id, ou] of identifiants) {
  if (ou.length > 1) problemes.push(`identifiant en double : ${id} (${ou.join(", ")})`);
}
for (const [enonce, ou] of enonces) {
  if (ou.length > 1) {
    problemes.push(
      `énoncé en double (${ou.length} fois) : « ${enonce.slice(0, 70)}… »\n        ${ou.join("\n        ")}`,
    );
  }
}

console.log(
  `${fichiers.length} fichiers · ${nbFixes} items fixes · ${nbQcm} QCM vérifiables · ${nbChaines} chaînes LaTeX`,
);
if (nbQcmOpaques) {
  console.log(
    `      (${nbQcmOpaques} QCM aux choix construits à l'exécution — non vérifiables sur le source)`,
  );
}
if (conventions.length) {
  console.log(
    `\nℹ️  ${conventions.length} QCM n'ont pas la bonne réponse en 1re position.\n` +
      "      Sans effet pour l'élève : questionPairBuilder.ts mélange les choix.",
  );
}

/* ─── Densité (indicatif) ───────────────────────────────────────────────────
   Ce n'est pas une erreur de validité : on l'affiche à part, sans peser sur le
   code de sortie. La référence est la Terminale, à 11 items fixes par micro. */
if (fs.existsSync(MICRO_SRC)) {
  const microSrc = fs.readFileSync(MICRO_SRC, "utf8");
  const sous = [];
  for (const bloc of microSrc.split(/\n\s*\{/).slice(1)) {
    const id = bloc.match(/id:\s*"([a-z0-9_]+)"/)?.[1];
    const label = bloc.match(/label:\s*"([^"]+)"/)?.[1] ?? id;
    if (!id || !bloc.includes("notionId")) continue;
    const n = densite.get(id) ?? 0;
    if (n < CIBLE) sous.push({ id, label, n });
  }
  console.log(
    `\nDENSITÉ : ${sous.length} micro-compétence(s) sous la cible de ${CIBLE} items fixes`,
  );
  for (const m of sous.sort((a, b) => a.n - b.n).slice(0, 40)) {
    console.log(`      ${String(m.n).padStart(2)}/${CIBLE}  ${m.id.padEnd(26)} ${m.label}`);
  }
  if (sous.length > 40) console.log(`      … et ${sous.length - 40} autres`);
}

if (problemes.length === 0) {
  console.log("\n✅ Aucun problème de validité.\n");
  process.exit(0);
}
console.log(`\n⛔ ${problemes.length} PROBLÈME(S) :`);
for (const p of problemes) console.log(`      ${p}`);
console.log();
process.exit(1);
