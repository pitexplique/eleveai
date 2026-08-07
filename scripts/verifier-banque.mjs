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
/* Un troisième argument était autrefois une « densité visée » en items fixes.
   Il n'a plus de sens (voir le bloc COUVERTURE plus bas) : on l'accepte pour ne
   pas casser les commandes notées ailleurs, mais on le dit au lieu de faire
   croire qu'il compte encore. */
const CIBLE_OBSOLETE = process.argv[4];

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
  // ⚠️ 07/08 — on exigeait un saut de ligne entre « { » et « kind: ». Sept
  // banques de 6e écrivent `{ kind: "fixed", id: …` sur une seule ligne : le
  // découpage y trouvait moins d'items que de microId, et le garde-fou sautait
  // alors le fichier ENTIER. Ces sept banques n'étaient donc pas vérifiées, et
  // le rapport affichait quand même « aucun problème ».
  const debuts = [...src.matchAll(/\{\s*kind:\s*"(fixed|template)"/g)];
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
// ⚠️ 02/08 — le test cherchait « .bank. », avec un point APRÈS : un fichier
// nommé `x.banks.ts` (un « s » de trop) échappait au garde-fou lui-même.
// On teste maintenant sur la simple présence de « bank » dans le nom.
const suspects = fs
  .readdirSync(BANQUES)
  .filter(
    (f) =>
      !f.endsWith(".bank.ts") &&
      f !== "index.ts" &&
      /bank/i.test(f) &&
      !/^build[A-Z]/.test(f), // buildCycle2Bank.ts & co : des constructeurs, pas des banques
  );

console.log(`\nVÉRIFICATION ${CLASSE.toUpperCase()} · ${MATIERE.toUpperCase()}`);
console.log("─".repeat(64));

if (CIBLE_OBSOLETE) {
  console.log(
    `ℹ️  L'argument « ${CIBLE_OBSOLETE} » est ignoré : il n'y a pas de nombre d'items\n` +
      "      fixes à viser. Un item fixe existe pour une valeur exceptionnelle,\n" +
      "      un piège, une propriété ou un contexte réel — pas pour faire du chiffre.",
  );
}

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
const generateurs = new Map(); // microId -> nb de templates
const ouvertes = new Map(); // microId -> nb de questions ouvertes (fixes + templates)
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
    // ⚠️ 07/08 — on cherchait « un saut de ligne puis id: ». Or la terminale
    // écrit `kind: "fixed", id: "..."` sur UNE SEULE ligne : 112 items étaient
    // déclarés « (sans id) », donc rangés ensemble et signalés comme un
    // gigantesque doublon. On ancre maintenant sur le `kind` qui précède
    // toujours l'id, quelle que soit la mise en forme.
    const id =
      texte.match(/kind:\s*"(?:fixed|template)",\s*id:\s*"([A-Za-zÀ-ÿ0-9_-]+)"/)?.[1] ??
      "(sans id)";
    const microId = texte.match(/microId:\s*"([A-Za-zÀ-ÿ0-9_-]+)"/)?.[1];

    if (!identifiants.has(id)) identifiants.set(id, []);
    identifiants.get(id).push(f);

    // Une question ouverte peut être un item fixe OU sortir du generate() d'un
    // template : on la repère dans les deux cas sur `format: "open"`.
    if (microId && /format:\s*"open"/.test(texte)) {
      ouvertes.set(microId, (ouvertes.get(microId) ?? 0) + 1);
    }

    // Les templates fabriquent leur énoncé dans generate() à partir de
    // variables : ni leur texte ni leurs choix ne sont lisibles dans le source.
    if (kind === "template") {
      if (microId) generateurs.set(microId, (generateurs.get(microId) ?? 0) + 1);
      continue;
    }
    nbFixes += 1;
    if (microId) densite.set(microId, (densite.get(microId) ?? 0) + 1);

    // 1. Questions en double
    // ⚠️ 07/08 — on comparait les seuls énoncés, et on criait au doublon sur
    // des questions parfaitement distinctes : « Quelle affirmation est vraie ? »
    // n'a de sens qu'avec ses propositions, et « quelle est l'aire de cette
    // figure ? » qu'avec son dessin. Deux questions ne se répètent vraiment que
    // si l'élève voit LA MÊME CHOSE : même énoncé, mêmes choix, même figure.
    const enonce = texte.match(/\n\s*text:\s*"((?:[^"\\]|\\.)*)"/)?.[1];
    if (enonce) {
      const choix = texte.match(/choices:\s*(\[[^\]]*\])/)?.[1] ?? "";
      // Le canvas court souvent sur plusieurs lignes : on prend TOUT ce qui
      // suit « canvas: » jusqu'au bout du bloc. S'arrêter à la première ligne
      // rendait identiques deux figures qui ne le sont pas — deux droites
      // parallèles et deux droites sécantes, par exemple.
      const iCanvas = texte.indexOf("canvas:");
      const figure = iCanvas === -1 ? "" : texte.slice(iCanvas).replace(/\s+/g, " ");
      const empreinte = `${enonce} ${choix} ${figure}`;
      if (!enonces.has(empreinte)) enonces.set(empreinte, { enonce, ou: [] });
      enonces.get(empreinte).ou.push(`${f} ${id}`);
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
for (const [, { enonce, ou }] of enonces) {
  if (ou.length > 1) {
    problemes.push(
      `question en double (${ou.length} fois) : « ${enonce.slice(0, 70)}… »\n        ${ou.join("\n        ")}`,
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

/* ─── Couverture (indicatif) ────────────────────────────────────────────────
   ⚠️ Ce n'est PLUS un compteur d'items fixes. Frédéric, 02/08/2026 : « les
   fixed il n'y a pas de règle de compteur, mais plutôt une règle : les fixed
   sont là pour des valeurs exceptionnelles, comme exp(0) ou exp(-1) ». Le
   nombre d'items fixes d'un micro est donc décidé par le nombre de cas
   remarquables, et par rien d'autre : viser un chiffre pousserait à fabriquer
   des calculs figés, exactement ce qu'on veut éviter.

   Ce qui se mesure vraiment, et qui décide qu'un élève ne se répète pas :
     1. un micro SANS AUCUN item  → trou de couverture ;
     2. un micro SANS GÉNÉRATEUR  → au bout de quelques passages, ça tourne ;
     3. un micro SANS OUVERTE     → le BO demande de préparer l'oral dès la 1ʳᵉ.
   Rien de tout cela n'est une erreur de validité : on l'affiche à part, sans
   peser sur le code de sortie. */
if (fs.existsSync(MICRO_SRC)) {
  const microSrc = fs.readFileSync(MICRO_SRC, "utf8");
  const vides = [];
  const sansGenerateur = [];
  const sansOuverte = [];
  let total = 0;

  for (const bloc of microSrc.split(/\n\s*\{/).slice(1)) {
    const id = bloc.match(/id:\s*"([a-z0-9_]+)"/)?.[1];
    const label = bloc.match(/label:\s*"([^"]+)"/)?.[1] ?? id;
    if (!id || !bloc.includes("notionId")) continue;
    total += 1;
    const f = densite.get(id) ?? 0;
    const g = generateurs.get(id) ?? 0;
    const o = ouvertes.get(id) ?? 0;
    if (f === 0 && g === 0) vides.push({ id, label });
    else {
      if (g === 0) sansGenerateur.push({ id, label, f });
      if (o === 0) sansOuverte.push({ id, label, f });
    }
  }

  const liste = (titre, tab, detail) => {
    if (!tab.length) return;
    console.log(`\n${titre} : ${tab.length} sur ${total}`);
    for (const m of tab.slice(0, 25)) {
      console.log(`      ${m.id.padEnd(28)} ${detail(m)}${m.label}`);
    }
    if (tab.length > 25) console.log(`      … et ${tab.length - 25} autres`);
  };

  console.log(`\nCOUVERTURE : ${total} micro-compétences déclarées`);
  if (!vides.length && !sansGenerateur.length && !sansOuverte.length) {
    console.log("      ✅ chacune a des items, un générateur et une question ouverte.");
  }
  liste("⬜ AUCUN ITEM", vides, () => "");
  liste("♻️  SANS GÉNÉRATEUR (la question finira par se répéter)", sansGenerateur, (m) => `${m.f} fixes · `);
  liste("🗣️  SANS QUESTION OUVERTE", sansOuverte, (m) => `${m.f} fixes · `);
}

if (problemes.length === 0) {
  console.log("\n✅ Aucun problème de validité.\n");
  process.exit(0);
}
console.log(`\n⛔ ${problemes.length} PROBLÈME(S) :`);
for (const p of problemes) console.log(`      ${p}`);
console.log();
process.exit(1);
