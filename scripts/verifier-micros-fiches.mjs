// Vérifie que chaque micro-compétence CITÉE par une fiche EXISTE vraiment.
//
// ⛔ POURQUOI CE SCRIPT (03/09/2026). Une fiche du CP citait
// `cp_gram_types_phrase` ; le micro s'appelle `cp_gram_types_phrases`, au
// pluriel. Le champ `micros` est typé `string[]` : ni TypeScript, ni le build,
// ni le rendu ne disent quoi que ce soit. La fiche s'affiche parfaitement, et
// le lien vers le coach ne pointe sur rien — un trou silencieux, exactement la
// famille de défauts que « les trous de la matrice d'entrée » a déjà coûtée.
//
// ⭐ ET IL VÉRIFIE AUSSI LE SENS INVERSE, avec `--couverture` : quelles micros
// d'une classe ne sont citées par AUCUNE fiche. C'est la carte de ce qui reste
// à écrire, mesurée au lieu d'être tenue de tête.
//
// Usage :
//   node scripts/verifier-micros-fiches.mjs                (toutes les classes)
//   node scripts/verifier-micros-fiches.mjs --couverture cp francais

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const RACINE_SAVOIR = "lib/tutor-v4/knowledge";
const RACINE_FICHES = "lib/fiches";

/** Les identifiants de micro déclarés pour une matière et une classe. */
function microsDeclares(matiere, classe) {
  const f = join(RACINE_SAVOIR, matiere, classe, "microSkills.ts");
  if (!existsSync(f)) return null;
  const src = readFileSync(f, "utf8");
  // ⚠️ On lit les `id:` du fichier, pas toutes les chaines qui ressemblent à un
  // identifiant : un `prerequis` cite des micros d'une AUTRE notion, parfois
  // d'une autre classe, et les compter ici rendrait le vérificateur aveugle au
  // seul cas qu'il cherche — un nom qui n'existe nulle part.
  return new Set([...src.matchAll(/\bid:\s*"([a-z0-9_]+)"/g)].map((m) => m[1]));
}

/** Les micros citées par un fichier de fiche, avec la classe et la matière que
 *  la fiche déclare elle-même — c'est elle qui dit à quel référentiel elle se
 *  compare. */
function ficheCitations(chemin) {
  const src = readFileSync(chemin, "utf8");
  const classe = src.match(/\bclasse:\s*"([a-z0-9]+)"/)?.[1];
  const matiere = src.match(/\bmatiere:\s*"([a-z]+)"/)?.[1];
  if (!classe || !matiere) return null;
  // Seulement ce qui est dans un tableau `micros: [...]` : une notion citée
  // dans un commentaire n'est pas un lien.
  const citees = new Set();
  for (const bloc of src.matchAll(/\bmicros:\s*\[([^\]]*)\]/g)) {
    for (const m of bloc[1].matchAll(/"([a-z0-9_]+)"/g)) citees.add(m[1]);
  }
  return { classe, matiere, citees };
}

const args = process.argv.slice(2);
const couverture = args.includes("--couverture");
const filtres = args.filter((a) => !a.startsWith("--"));

const fichiers = readdirSync(RACINE_FICHES)
  .filter((f) => f.endsWith(".tsx"))
  .map((f) => join(RACINE_FICHES, f));

let morts = 0;
let lues = 0;
const citeesParClasse = new Map();

for (const chemin of fichiers) {
  const info = ficheCitations(chemin);
  if (!info) continue;
  const { classe, matiere, citees } = info;
  if (filtres.length && !filtres.includes(classe) && !filtres.includes(matiere)) continue;
  const declares = microsDeclares(matiere, classe);
  if (!declares) continue;
  lues += 1;

  const cle = `${matiere}/${classe}`;
  if (!citeesParClasse.has(cle)) citeesParClasse.set(cle, new Set());
  for (const m of citees) citeesParClasse.get(cle).add(m);

  for (const m of citees) {
    if (!declares.has(m)) {
      console.log(`⛔ ${chemin} cite « ${m} » — ce micro n'existe pas dans ${cle}`);
      morts += 1;
    }
  }
}

console.log(
  morts
    ? `\n⛔ ${morts} lien(s) mort(s) sur ${lues} fiche(s) lue(s).`
    : `✅ ${lues} fiche(s) lue(s), toutes les micros citées existent.`,
);

if (couverture) {
  for (const [cle, citees] of [...citeesParClasse].sort()) {
    const [matiere, classe] = cle.split("/");
    const declares = microsDeclares(matiere, classe);
    const orphelines = [...declares].filter((m) => !citees.has(m)).sort();
    console.log(
      `\n${cle} — ${citees.size}/${declares.size} micros couvertes par une fiche`,
    );
    if (orphelines.length) {
      console.log(`   restent : ${orphelines.join(", ")}`);
    }
  }
}

process.exit(morts ? 1 : 0);
