// Vérification des banques du CALCUL RAPIDE (lib/calcul-rapide/data).
//
// Même principe que scripts/verifier-generateurs.mjs pour le coach : on ne LIT
// pas les fichiers, on les EXÉCUTE. Un template de calcul rapide tire ses
// variables au hasard et calcule la réponse avec `new Function(answerRule)` :
// rien de tout ça n'est vérifié par le compilateur, et une liste de variables
// mal choisie ne se voit qu'au tirage.
//
// Ce que le 07/08/2026 a fait sortir, en vrai, dans les banques existantes :
//   — 19 questions de 6e et 28 de 4e écrites et appelées par aucune semaine ;
//   — quatre identifiants portés DEUX fois (un calcul et un problème) : le
//     problème n'était jamais atteignable, et la 7e place d'une séance servait
//     un calcul de 20 s déjà posé plus haut ;
//   — des séances annoncées « 5 minutes » dont les chronos font 220 s.
//
// Usage : node --experimental-strip-types scripts/verifier-calcul-rapide.mjs [niveau] [tirages]
//         node --experimental-strip-types scripts/verifier-calcul-rapide.mjs tous 200
//
// Sortie 1 s'il y a le moindre problème : utilisable comme garde-fou.

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const NIVEAU_ARG = process.argv[2] || "tous";
const TIRAGES = Number(process.argv[3]) || 200;

const RACINE = path.resolve("lib/calcul-rapide/data");

// Les niveaux où une réponse négative n'a aucun sens : on n'y fait pas encore
// de relatifs, et un « -3 » qui sort du générateur est un défaut, pas une
// question difficile.
const SANS_NEGATIFS = new Set(["cp", "ce1", "ce2", "cm1", "cm2"]);

const niveaux =
  NIVEAU_ARG === "tous" || NIVEAU_ARG === "all"
    ? fs
        .readdirSync(RACINE, { withFileTypes: true })
        .filter((e) => e.isDirectory())
        .map((e) => e.name)
        .sort()
    : [NIVEAU_ARG];

/* ─── Le moteur, recopié à l'identique depuis le client ──────────────────────
   app/calcul-rapide/defi/CalculRapideDefiClient.tsx. Si l'un change, l'autre
   doit suivre — sinon on vérifie autre chose que ce qui tourne. */

function formatNumber(value) {
  if (Number.isInteger(value)) return String(value);
  return String(Number(value.toFixed(6))).replace(".", ",");
}

function replaceTemplate(text, values) {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const value = values[key];
    if (typeof value === "number") return formatNumber(value);
    return String(value ?? "");
  });
}

function computeAnswer(rule, values) {
  const keys = Object.keys(values);
  const args = keys.map((key) => Number(values[key]));
  const fn = new Function(...keys, `return ${rule};`);
  const result = fn(...args);
  return typeof result === "number" ? formatNumber(result) : String(result);
}

/* ─── Chargement ────────────────────────────────────────────────────────────*/

async function charger(niveau) {
  const dir = path.join(RACINE, niveau);
  const fichiers = [
    "calculs.fixed.ts",
    "calculs.templates.ts",
    "problemes.fixed.ts",
    "problemes.templates.ts",
  ];

  const items = [];
  const idsVus = new Map(); // id -> fichier, pour repérer les doublons
  const doublons = [];

  for (const f of fichiers) {
    const p = path.join(dir, f);
    if (!fs.existsSync(p)) continue;
    const mod = await import(pathToFileURL(p).href);
    for (const exporte of Object.values(mod)) {
      if (!Array.isArray(exporte)) continue;
      for (const item of exporte) {
        if (!item || typeof item.id !== "string") continue;
        if (idsVus.has(item.id)) {
          doublons.push(`${item.id} — déjà déclaré dans ${idsVus.get(item.id)}, redéclaré dans ${f}`);
          continue; // le moteur prend le premier : on vérifie le premier
        }
        idsVus.set(item.id, f);
        items.push(item);
      }
    }
  }

  const pWeekly = path.join(dir, "weekly.ts");
  const weeks = fs.existsSync(pWeekly)
    ? Object.values(await import(pathToFileURL(pWeekly).href)).find(Array.isArray) ?? []
    : [];

  return { items, weeks, doublons };
}

/* ─── Les contrôles ─────────────────────────────────────────────────────────*/

function verifierStructure(niveau, items, weeks, doublons, erreurs, alertes) {
  for (const d of doublons) erreurs.push(`[${niveau}] identifiant en double : ${d}`);

  const parId = new Map(items.map((i) => [i.id, i]));
  const utilises = new Set();

  for (const week of weeks) {
    for (const s of week.sessions ?? []) {
      const ids = s.itemIds ?? [];
      ids.forEach((id) => utilises.add(id));

      const manquants = ids.filter((id) => !parId.has(id));
      if (manquants.length) {
        erreurs.push(
          `[${niveau}] ${s.id} : ${manquants.length} identifiant(s) introuvable(s) — la séance servira ${ids.length - manquants.length} questions au lieu de ${ids.length} (${manquants.join(", ")})`
        );
      }

      const distincts = new Set(ids);
      if (distincts.size < ids.length) {
        const repetes = ids.filter((id, i) => ids.indexOf(id) !== i);
        alertes.push(
          `[${niveau}] ${s.id} : ${distincts.size} questions distinctes sur ${ids.length} (répété : ${[...new Set(repetes)].join(", ")})`
        );
      }

      const presents = ids.map((id) => parId.get(id)).filter(Boolean);
      const somme = presents.reduce((acc, i) => acc + (i.durationSec ?? 0), 0);
      if (s.durationTotalSec !== somme) {
        alertes.push(
          `[${niveau}] ${s.id} : durée annoncée ${s.durationTotalSec} s, somme réelle des chronos ${somme} s`
        );
      }

      const nbCalculs = presents.filter((i) => i.type === "calcul").length;
      const nbProblemes = presents.filter((i) => i.type === "probleme").length;
      if (nbCalculs !== 5 || nbProblemes !== 2) {
        alertes.push(
          `[${niveau}] ${s.id} : ${nbCalculs} calculs + ${nbProblemes} problèmes (la page annonce 5 + 2)`
        );
      }
    }
  }

  const orphelins = items.filter((i) => !utilises.has(i.id));
  if (orphelins.length) {
    alertes.push(
      `[${niveau}] ${orphelins.length} question(s) écrite(s) et jouée(s) par aucune séance : ${orphelins.slice(0, 6).map((i) => i.id).join(", ")}${orphelins.length > 6 ? "…" : ""}`
    );
  }

  if (weeks.length < 2) {
    alertes.push(
      `[${niveau}] une seule semaine : la rotation par semaine du calendrier n'a rien à faire tourner, l'élève rejoue le même lundi toute l'année`
    );
  }
}

function verifierGenerateurs(niveau, items, erreurs, alertes) {
  for (const item of items) {
    if (item.mode !== "template") {
      if (!item.expected?.length) {
        erreurs.push(`[${niveau}] ${item.id} : item figé sans réponse attendue`);
      }
      continue;
    }

    if (!item.template || !item.variables || !item.answerRule) {
      erreurs.push(`[${niveau}] ${item.id} : template incomplet (template / variables / answerRule)`);
      continue;
    }

    const listes = Object.entries(item.variables).filter(([, v]) => Array.isArray(v));
    if (!listes.length) {
      erreurs.push(`[${niveau}] ${item.id} : aucune variable tirable`);
      continue;
    }

    // Toutes les combinaisons si elles sont peu nombreuses, sinon des tirages.
    const combinaisons = listes.reduce((acc, [, v]) => acc * v.length, 1);
    const tirages = [];
    if (combinaisons <= TIRAGES) {
      const construire = (i, courant) => {
        if (i === listes.length) return tirages.push({ ...courant });
        const [cle, valeurs] = listes[i];
        for (const v of valeurs) construire(i + 1, { ...courant, [cle]: v });
      };
      construire(0, {});
    } else {
      for (let t = 0; t < TIRAGES; t++) {
        const v = {};
        for (const [cle, valeurs] of listes) {
          v[cle] = valeurs[Math.floor(Math.random() * valeurs.length)];
        }
        tirages.push(v);
      }
    }

    const vus = new Set();
    for (const valeurs of tirages) {
      let reponse;
      try {
        reponse = computeAnswer(item.answerRule, valeurs);
      } catch (e) {
        erreurs.push(`[${niveau}] ${item.id} : answerRule plante (${e.message})`);
        break;
      }

      const enonce = replaceTemplate(item.template, valeurs);
      const contexte = `« ${enonce} » → « ${reponse} »`;

      if (reponse === "NaN" || reponse === "Infinity" || reponse === "-Infinity") {
        erreurs.push(`[${niveau}] ${item.id} : réponse impossible, ${contexte}`);
        break;
      }
      if (/\{\{\w+\}\}/.test(enonce)) {
        erreurs.push(`[${niveau}] ${item.id} : variable non remplacée dans l'énoncé, ${contexte}`);
        break;
      }
      // Une valeur décimale recopiée telle quelle s'écrit à l'anglaise (4.5) :
      // le moteur ne formate que la RÉPONSE, jamais l'énoncé.
      if (/\d\.\d/.test(enonce)) {
        erreurs.push(`[${niveau}] ${item.id} : point décimal à l'anglaise dans l'énoncé, ${contexte}`);
        break;
      }
      if (/\+\s*-|\-\s*-/.test(enonce)) {
        alertes.push(`[${niveau}] ${item.id} : signes qui se suivent dans l'énoncé, ${contexte}`);
        break;
      }
      if (SANS_NEGATIFS.has(niveau) && Number(reponse.replace(",", ".")) < 0) {
        erreurs.push(`[${niveau}] ${item.id} : réponse négative à un niveau qui ne fait pas les relatifs, ${contexte}`);
        break;
      }
      if (item.explanationTemplate) {
        const expl = replaceTemplate(item.explanationTemplate, { ...valeurs, answer: reponse });
        if (/\{\{\w+\}\}/.test(expl)) {
          erreurs.push(`[${niveau}] ${item.id} : variable non remplacée dans l'explication — « ${expl} »`);
          break;
        }
      }
      // Le moteur ne remplace les variables que dans `template` et
      // `explanationTemplate`. Un indice qui en contient les affiche en clair.
      if (item.hint && /\{\{\w+\}\}/.test(item.hint)) {
        erreurs.push(
          `[${niveau}] ${item.id} : l'indice contient des variables non remplaçables — « ${item.hint} »`
        );
        break;
      }
      vus.add(enonce);
    }

    if (vus.size === 1 && tirages.length > 1) {
      alertes.push(`[${niveau}] ${item.id} : le générateur ne produit qu'un seul énoncé`);
    }
  }
}

/* ─── Exécution ─────────────────────────────────────────────────────────────*/

const erreurs = [];
const alertes = [];
let totalItems = 0;
let totalTemplates = 0;

for (const niveau of niveaux) {
  const { items, weeks, doublons } = await charger(niveau);
  totalItems += items.length;
  totalTemplates += items.filter((i) => i.mode === "template").length;

  verifierStructure(niveau, items, weeks, doublons, erreurs, alertes);
  verifierGenerateurs(niveau, items, erreurs, alertes);

  const jours = weeks.reduce((acc, w) => acc + (w.sessions?.length ?? 0), 0);
  console.log(
    `${niveau.padEnd(14)} ${String(items.length).padStart(3)} questions · ${weeks.length} semaine(s) · ${jours} séances`
  );
}

console.log(
  `\n${totalItems} questions au total, dont ${totalTemplates} générateurs, tirés jusqu'à ${TIRAGES} fois chacun.`
);

if (alertes.length) {
  console.log(`\n⚠️  ${alertes.length} alerte(s) :`);
  for (const a of alertes) console.log("   " + a);
}

if (erreurs.length) {
  console.log(`\n⛔ ${erreurs.length} erreur(s) :`);
  for (const e of erreurs) console.log("   " + e);
  process.exit(1);
}

console.log("\n✅ Aucune erreur bloquante.");
