// Vérification des GÉNÉRATEURS d'une banque de questions.
//
// scripts/verifier-banque.mjs lit le source : il contrôle ce qu'on a écrit à la
// main, donc les items `kind: "fixed"`. Ce que fabrique un `kind: "template"`
// dans son `generate()` lui échappe complètement — et c'est justement là que se
// cachait, le 04/08/2026, un défaut qui rendait des questions IMPOSSIBLES :
//
//     return shuffle(Array.from(new Set([correct, ...wrongs]))).slice(0, 4);
//
// Avec quatre distracteurs distincts, le mélange peut envoyer la bonne réponse
// en cinquième position, et le découpage l'emporte. L'élève cherche parmi
// quatre propositions dont aucune n'est bonne, et rien ne le signale.
//
// Ici on ne lit pas, on EXÉCUTE : chaque générateur est tiré soixante fois et
// on regarde ce qui sort. Les banques de maths n'ont que des `import type`,
// qui disparaissent au dépouillement — Node les charge donc directement, sans
// Next ni navigateur.
//
// ⚠️ 09/08/2026 — un second défaut, invisible jusque-là. Le contrôle vérifiait
// que la bonne réponse EST dans les choix, jamais COMBIEN il y en a. Or
// `makeChoices` déduplique et retire la bonne réponse AVANT de couper à trois
// distracteurs :
//
//     const distracteurs = shuffle([...new Set(wrongs)].filter(w => w !== correct)).slice(0, 3);
//
// Quand deux pièges écrits à la main se recoupent sur certains tirages — un
// facteur qui tombe égal à l'autre, un centime au-dessus de 9 qui rend
// l'écriture fautive identique à la bonne — il n'en reste que deux, et le QCM
// se présente à trois lignes. Parfois à deux : l'élève a une chance sur deux
// au hasard, et rien ne le signale. Vu dans deux gabarits de CE2 sur quarante.
//
// On mesure donc maintenant la RÉPARTITION du nombre de propositions par
// gabarit. Le bon signal n'est pas « moins de quatre » — un « oui / non » en a
// deux, et c'est très bien — mais l'EFFONDREMENT : un gabarit dont le nombre
// habituel est de trois ou quatre et qui tombe plus bas sur une minorité de
// tirages. Voir la section « propositions qui s'effondrent ».
//
// Usage : node --experimental-strip-types scripts/verifier-generateurs.mjs [classe] [matiere] [tirages]
//         node --experimental-strip-types scripts/verifier-generateurs.mjs 4e maths
//         node --experimental-strip-types scripts/verifier-generateurs.mjs toutes maths 600
//         node --experimental-strip-types scripts/verifier-generateurs.mjs ce2 maths 600 --strict-choix
//
// Sortie 1 s'il y a le moindre problème : utilisable comme garde-fou.

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ARGS = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const DRAPEAUX = new Set(process.argv.slice(2).filter((a) => a.startsWith("--")));

const CLASSE = ARGS[0] || "toutes";
const MATIERE = ARGS[1] || "maths";
const TIRAGES = Number(ARGS[2]) || 60;

/* Les effondrements sont signalés TOUJOURS, mais ils ne font tomber la sortie
   que sur demande : au 09/08/2026 il en reste 23 hérités dans les banques
   déjà écrites, et rendre le garde-fou rouge d'un coup le rendrait inutile.
   `--strict-choix` sert à le brancher en CI une fois l'arriéré traité. */
const STRICT_CHOIX = DRAPEAUX.has("--strict-choix");

const RACINE = path.resolve("lib/tutor-v4/questionBank");

function classesDisponibles() {
  return fs
    .readdirSync(RACINE, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((c) => fs.existsSync(path.join(RACINE, c, MATIERE)))
    .sort();
}

const CLASSES =
  CLASSE === "toutes" || CLASSE === "all" ? classesDisponibles() : [CLASSE];

/* ─── Les contrôles ─────────────────────────────────────────────────────────
   Chacun vient d'une panne vue en vrai, pas d'une précaution théorique. */

/* La bonne réponse peut s'écrire "3" et la proposition "3,0" : ce n'est pas un
   choix manquant, c'est la même valeur habillée autrement. On compare donc en
   nombres avant de crier au loup. */
function memeNombre(a, b) {
  const n = (s) => {
    const v = Number(String(s).replace(",", ".").replace(/\s/g, ""));
    return Number.isFinite(v) ? v : null;
  };
  const x = n(a);
  const y = n(b);
  return x !== null && y !== null && Math.abs(x - y) < 1e-9;
}

function contient(choices, attendu) {
  return choices.some((c) => c === attendu || memeNombre(c, attendu));
}

const MOTS_MORTS = /\b(undefined|NaN|null|\[object Object\])\b/;

/* Les nombres relatifs entrent en 5e. Avant, un « −10 » proposé à l'élève n'est
   pas un piège : c'est une faute. Elle arrive toute seule quand un distracteur
   se fabrique par décalage — « et s'il s'était trompé d'une dizaine ? » — sur
   un petit résultat. Vu le 05/08/2026 dans le calcul mental de CE2, où le
   complément de 910 à 1 000 proposait « −10 ». */
const PRIMAIRE = new Set(["cp", "ce1", "ce2", "cm1", "cm2"]);

// Seulement un moins EN TÊTE : « 40 - 8 » est une soustraction qu'on écrit
// tous les jours au primaire, « -8 » est une réponse qui n'existe pas encore.
function negatif(s) {
  return /^[\s(]*[-−]\s?\d/.test(String(s));
}

function controler(q, classe) {
  const problemes = [];
  const texte = typeof q?.text === "string" ? q.text : "";

  if (!texte.trim()) problemes.push("énoncé vide");
  if (MOTS_MORTS.test(texte)) problemes.push(`énoncé abîmé : « ${texte.slice(0, 80)} »`);

  const attendus = Array.isArray(q?.expected) ? q.expected : [];
  if (attendus.length === 0) problemes.push("aucune réponse attendue");
  for (const a of attendus) {
    if (typeof a !== "string" || !a.trim()) problemes.push("réponse attendue vide");
    else if (MOTS_MORTS.test(a)) problemes.push(`réponse attendue abîmée : « ${a} »`);
  }

  const choix = q?.choices;
  if (Array.isArray(choix)) {
    if (choix.length < 2) problemes.push(`seulement ${choix.length} proposition(s)`);

    const doublons = choix.filter((c, i) => choix.indexOf(c) !== i);
    if (doublons.length) problemes.push(`proposition en double : « ${doublons[0]} »`);

    for (const c of choix) {
      if (typeof c !== "string" || !String(c).trim()) problemes.push("proposition vide");
      else if (MOTS_MORTS.test(c)) problemes.push(`proposition abîmée : « ${c} »`);
      else if (PRIMAIRE.has(classe) && negatif(c)) {
        problemes.push(`nombre négatif proposé au primaire : « ${c} »`);
      }
    }

    if (attendus.length && !attendus.some((a) => contient(choix, a))) {
      problemes.push(
        `QUESTION IMPOSSIBLE — « ${attendus[0]} » absent de [${choix.join(" | ")}]`,
      );
    }
  } else if (q?.format === "qcm") {
    problemes.push("format qcm sans propositions");
  }

  return problemes;
}

/* ─── Parcours ──────────────────────────────────────────────────────────── */

function items(mod) {
  const trouves = [];
  for (const valeur of Object.values(mod)) {
    if (!Array.isArray(valeur)) continue;
    for (const item of valeur) {
      if (item && typeof item === "object" && "kind" in item && "id" in item) {
        trouves.push(item);
      }
    }
  }
  return trouves;
}

let totalItems = 0;
let totalTirages = 0;
const rapports = [];
/* Un fichier qui importe autre chose que des types ne se charge pas ici : Node
   ne résout pas l'alias `@/`. On ne peut donc rien en dire — et le taire
   laisserait croire qu'il est couvert. */
const nonCouverts = [];
/* Les gabarits dont le nombre de propositions varie d'un tirage à l'autre. */
const effondrements = [];

/* Un gabarit qui alterne DÉLIBÉRÉMENT entre deux formes — un « oui / non » une
   fois sur deux et un QCM à quatre lignes le reste du temps — fait varier le
   compte sans rien casser. On ne retient donc que la chute : le nombre le plus
   fréquent est le nombre VOULU, et tout tirage qui descend en dessous est un
   piège qui s'est évaporé au tri.
   Grave = on tombe à deux propositions alors qu'on en visait trois ou quatre :
   là, l'élève a une chance sur deux au hasard. */
function analyserRepartition(compte) {
  // À égalité de fréquence, on retient le PLUS GRAND nombre de propositions
  // comme celui qui était voulu : l'auteur avait écrit assez de pièges, ce sont
  // les tirages qui les ont fait fondre.
  const paires = [...compte.entries()].sort((a, b) => b[1] - a[1] || b[0] - a[0]);
  const voulu = paires[0][0];
  const plancher = Math.min(...compte.keys());
  if (plancher >= voulu) return null;

  const chutes = paires.filter(([n]) => n < voulu);
  const tiragesChutes = chutes.reduce((s, [, c]) => s + c, 0);
  const total = paires.reduce((s, [, c]) => s + c, 0);

  return {
    voulu,
    plancher,
    part: tiragesChutes / total,
    // Un plancher à 1 ou 0 est déjà une erreur dure côté `controler` ; on le
    // range quand même ici, la chute est la même histoire.
    grave: plancher <= 2 && voulu >= 3,
    detail: paires.map(([n, c]) => `${n}→${c}`).join("  "),
  };
}

for (const classe of CLASSES) {
  const dossier = path.join(RACINE, classe, MATIERE);
  if (!fs.existsSync(dossier)) {
    console.error(`Introuvable : ${dossier}`);
    process.exit(1);
  }

  /* Les `index.ts` ne font que réexporter, avec des chemins sans extension que
     Node ne sait pas résoudre. On va droit aux banques. */
  const fichiers = fs
    .readdirSync(dossier)
    .filter((f) => f.endsWith(".ts") && !f.startsWith("index."))
    .sort();

  for (const fichier of fichiers) {
    const chemin = path.join(dossier, fichier);
    let mod;
    try {
      mod = await import(pathToFileURL(chemin).href);
    } catch (e) {
      nonCouverts.push({ classe, fichier, raison: e.message.split("\n")[0] });
      continue;
    }

    for (const item of items(mod)) {
      totalItems += 1;

      if (item.kind === "fixed") {
        const problemes = controler(item, classe);
        if (problemes.length) {
          rapports.push({ classe, fichier, id: item.id, problemes: [...new Set(problemes)] });
        }
        continue;
      }

      if (typeof item.generate !== "function") continue;

      const vus = new Set();
      const enonces = new Set();
      const tailles = new Map();
      for (let i = 0; i < TIRAGES; i++) {
        totalTirages += 1;
        let q;
        try {
          q = item.generate();
        } catch (e) {
          vus.add(`le générateur casse : ${e.message}`);
          break;
        }
        enonces.add(q?.text);
        if (Array.isArray(q?.choices)) {
          tailles.set(q.choices.length, (tailles.get(q.choices.length) ?? 0) + 1);
        }
        for (const p of controler(q, classe)) vus.add(p);
      }

      if (tailles.size > 1) {
        const chute = analyserRepartition(tailles);
        if (chute) effondrements.push({ classe, fichier, id: item.id, ...chute });
      }

      if (vus.size) {
        rapports.push({
          classe,
          fichier,
          id: item.id,
          variantes: enonces.size,
          problemes: [...vus],
        });
      }
    }
  }
}

/* ─── Rapport ───────────────────────────────────────────────────────────── */

const titre =
  CLASSES.length === 1 ? `${CLASSES[0]} · ${MATIERE}` : `${CLASSES.length} classes · ${MATIERE}`;
console.log(`\n${titre} — ${totalItems} items, ${totalTirages} tirages\n`);

if (nonCouverts.length) {
  console.log("Hors de portée de ce contrôle (imports que Node ne résout pas) :");
  for (const n of nonCouverts) console.log(`   ${n.classe}/${n.fichier} — ${n.raison}`);
  console.log("");
}

/* ─── Propositions qui s'effondrent ─────────────────────────────────────────
   Section à part : le défaut ne rend pas la question impossible, il la rend
   trop facile. Il se voit au compte, pas au contenu. */

const graves = effondrements.filter((e) => e.grave);

if (effondrements.length) {
  console.log("⚠️  PROPOSITIONS QUI S'EFFONDRENT");
  console.log(
    "   Le gabarit écrit assez de pièges, mais deux se recoupent sur certains",
  );
  console.log(
    "   tirages et disparaissent au tri. L'élève voit alors moins de lignes.",
  );
  if (TIRAGES < 200) {
    console.log(
      `   (${TIRAGES} tirages seulement : un effondrement rare passe inaperçu. Monter à 600.)`,
    );
  }
  console.log("");

  /* Les plus graves d'abord, puis les plus fréquents : on lit du haut vers le
     bas et on s'arrête quand ça devient anecdotique. Le fichier est donc
     rappelé sur chaque ligne — regrouper ferait remonter des cas mineurs. */
  for (const e of [...effondrements].sort(
    (a, b) => Number(b.grave) - Number(a.grave) || b.part - a.part,
  )) {
    const marque = e.grave ? "⛔" : "· ";
    console.log(`   ${marque} ${e.classe}/${e.fichier} · ${e.id}`);
    console.log(
      `        ${e.voulu} propositions voulues, ${e.plancher} au plus bas` +
        ` sur ${(e.part * 100).toFixed(1)} % des tirages   [${e.detail}]`,
    );
  }

  console.log(
    `\n   ${effondrements.length} gabarit(s) au compte variable.` +
      (graves.length
        ? ` ⛔ ${graves.length} tombent à DEUX propositions : une chance sur deux au hasard.`
        : " Aucun ne tombe à deux propositions."),
  );
  console.log(
    STRICT_CHOIX
      ? "   --strict-choix : ces cas font tomber la sortie.\n"
      : "   Ces cas ne font PAS tomber la sortie. Relancer avec --strict-choix pour les rendre bloquants.\n",
  );
}

if (!rapports.length) {
  if (STRICT_CHOIX && graves.length) {
    console.log(
      `${graves.length} gabarit(s) tombent à deux propositions — bloquant avec --strict-choix.\n`,
    );
    process.exit(1);
  }
  console.log("Aucun problème. Chaque question tirée a sa bonne réponse dans les choix.\n");
  process.exit(0);
}

let fichierCourant = "";
for (const r of rapports) {
  const cle = `${r.classe}/${r.fichier}`;
  if (cle !== fichierCourant) {
    fichierCourant = cle;
    console.log(`── ${cle}`);
  }
  const variantes = r.variantes !== undefined ? ` (${r.variantes} énoncés distincts)` : "";
  console.log(`   ${r.id}${variantes}`);
  for (const p of r.problemes) console.log(`      • ${p}`);
}

const impossibles = rapports.filter((r) =>
  r.problemes.some((p) => p.startsWith("QUESTION IMPOSSIBLE")),
).length;
const doublons = rapports.filter((r) =>
  r.problemes.some((p) => p.startsWith("proposition en double")),
).length;

console.log(
  `\n${rapports.length} item(s) en défaut — dont ${impossibles} impossible(s) à réussir et ${doublons} avec une proposition en double.\n`,
);
process.exit(1);
