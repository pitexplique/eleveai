// Poser l'édito de l'accueil dans la base, sans passer par la régie.
//
// L'accueil lit la rubrique 'edito' de `journal_articles` et garde UNE ligne :
// tri par `ordre` croissant puis `created_at` décroissant, limit 1 (cf.
// app/accueil/page.tsx › getEdito). Le corps vit dans `accroche`, paragraphes
// séparés par une ligne vide. `lien` est NOT NULL en base, mais le bouton de
// fin ne s'affiche que si `lien` ET `cta` sont remplis : on laisse donc `cta`
// à null pour un édito sans renvoi.
//
//   node scripts/poser-edito.mjs           → liste les éditos existants
//   node scripts/poser-edito.mjs --write   → pose l'édito ci-dessous
//
// L'ancien édito n'est jamais supprimé : il reste en base, simplement plus
// affiché. Pour revenir en arrière, remettre son `ordre` au-dessous du nouveau.

import fs from "node:fs";
import { createClient } from "@supabase/supabase-js";

// ── L'édito à poser ──────────────────────────────────────────────────────────
const EDITO = {
  titre: "Ce qu'on a sous les yeux",
  corps: [
    "Je suis Frédéric Lacoste, professeur de mathématiques à La Réunion. Ce journal est né un soir de juillet, en relisant les mots de mes élèves. Je n'ai rien inventé : j'ai regardé par la fenêtre.",
    "La pluie qui tombe droit, la canne qui monte, les baleines qui reviennent, le volcan qui recommence. Tout ça se mesure — et un enfant qui compte ce qu'il aime finit par aimer compter.",
    "Alors chaque matin : un défi, une dictée, un coach qui explique sans jamais faire à ta place. Gratuit, et le même pour chacun — c'est la seule règle qui ne bougera pas.",
    "Bienvenue. Ici, tu es chez toi.",
  ].join("\n\n"),
  // `lien` sert de clé d'unicité (index unique sur rubrique+lien) : un jeton
  // daté suffit, il n'est jamais affiché puisque `cta` reste null.
  lien: "/#edito-2026-07-31",
  cta: null,
};

function loadEnv() {
  const env = {};
  const text = fs.readFileSync(".env.local", "utf8");
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!m) continue;
    env[m[1]] = m[2].replace(/^"|"$/g, "");
  }
  return env;
}

const env = loadEnv();
const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

const { data: existants, error: errLecture } = await supabase
  .from("journal_articles")
  .select("id, titre, lien, cta, actif, ordre, created_at")
  .eq("rubrique", "edito")
  .order("ordre", { ascending: true })
  .order("created_at", { ascending: false });

if (errLecture) throw errLecture;

console.log("Éditos en base (le premier est celui qui s'affiche) :");
console.log(JSON.stringify(existants, null, 2));

if (!process.argv.includes("--write")) {
  console.log("\n(lecture seule — relancer avec --write pour poser l'édito)");
  process.exit(0);
}

// Pour gagner le tri, on se place au moins une marche au-dessus du meilleur
// `ordre` existant (à égalité, c'est la date la plus récente qui gagne, mais on
// ne veut pas dépendre de ça).
const meilleurOrdre = existants?.length ? existants[0].ordre : 100;
const ordre = Math.max(0, Math.min(meilleurOrdre, 100) - 1);

// Garde-fou : on ne pose pas deux fois le même édito (l'index unique
// rubrique+lien n'existe pas forcément en base, on vérifie donc nous-mêmes).
const dejaPose = existants?.find((e) => e.lien === EDITO.lien);
if (dejaPose) {
  console.log("\nCet édito est déjà en base — rien à faire.");
  process.exit(0);
}

const { data, error } = await supabase
  .from("journal_articles")
  .insert({
    rubrique: "edito",
    titre: EDITO.titre,
    accroche: EDITO.corps,
    lien: EDITO.lien,
    cta: EDITO.cta,
    actif: true,
    ordre,
  })
  .select("id, titre, ordre, created_at")
  .single();

if (error) throw error;

console.log("\nÉdito posé :");
console.log(JSON.stringify(data, null, 2));
