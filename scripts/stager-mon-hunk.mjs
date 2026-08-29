// Stage UNIQUEMENT les hunks d'un fichier partagé qui portent un slug donné.
//
// ⛔ POURQUOI CE SCRIPT (29/08/2026). `git add lib/fiches/registre.ts` prend le
// fichier tel qu'il est et emporte les lignes non commitées des autres sessions.
// La parade documentée — patch appliqué à l'index — ne suffit pas non plus si
// l'on applique le patch ENTIER : `git diff` rendait deux hunks, et le second
// était une entrée `maths/4e/prop-echelle` de la session maths. Elle est partie
// dans l'index avant d'être rattrapée.
//
// ⛔ EN NODE, ET PAS EN PYTHON. La première version était un `.py`. La session
// maths a mesuré que PYTHON N'EST PAS DISPONIBLE dans cet environnement
// (« Python was not found; run without arguments to install from the Microsoft
// Store ») : le script était donc inutilisable depuis une autre session que la
// mienne, ce qui est le pire défaut possible pour un outil de dépôt partagé.
// Node tourne partout ici — c'est déjà lui qui fait tourner les vérificateurs.
//
// Usage : node scripts/stager-mon-hunk.mjs <fichier> <slug>

import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const [fichier, slug] = process.argv.slice(2);
if (!fichier || !slug) {
  console.error("Usage : node scripts/stager-mon-hunk.mjs <fichier> <slug>");
  process.exit(2);
}

const git = (args) => execFileSync("git", args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });

// ⛔ TROIS LIGNES DE CONTEXTE, ET PAS ZÉRO — PAYÉ LE 29/08.
// Avec `-U0`, git n'a aucun point d'ancrage : pour représenter une insertion, il
// lui arrive de RÉÉMETTRE le bloc suivant, si bien qu'un ajout de cinq lignes
// sort en hunk de dix. `git apply --cached` écrit alors les deux, et l'index
// repart avec une clé en double que l'arbre de travail n'a pas. C'est arrivé une
// fois, c'est parti dans un commit poussé, et rien ne l'a signalé.
// Avec `-U3`, le hunk porte son contexte : git apply le POSITIONNE au lieu de le
// deviner, et il ÉCHOUE bruyamment si le fichier a bougé — ce qui est le
// comportement voulu sur un fichier partagé entre trois sessions.
const diff = git(["diff", "-U3", "--", fichier]);
if (!diff.trim()) {
  console.error(`⛔ aucun changement non stagé dans ${fichier}`);
  process.exit(1);
}

const lignes = diff.split(/(?<=\n)/);
const entete = [];
const hunks = [];
let courant = null;
for (const l of lignes) {
  if (l.startsWith("@@")) {
    if (courant) hunks.push(courant);
    courant = [l];
  } else if (courant) {
    courant.push(l);
  } else {
    entete.push(l);
  }
}
if (courant) hunks.push(courant);

const miens = hunks.filter((h) => h.some((x) => x.includes(slug)));
if (miens.length === 0) {
  console.error(`⛔ aucun hunk ne porte « ${slug} »`);
  process.exit(1);
}
console.log(`${hunks.length} hunk(s) — ${miens.length} à moi, ${hunks.length - miens.length} laissé(s) intact(s)`);

const chemin = join(tmpdir(), "mon-hunk.patch");
writeFileSync(chemin, entete.join("") + miens.map((h) => h.join("")).join(""), "utf8");
git(["apply", "--cached", chemin]);
console.log("appliqué à l'index");

// ⛔ ET LE CONTRÔLE QUI MANQUAIT, PAYÉ LE 29/08 : L'INDEX PEUT SORTIR AVEC UNE
// CLÉ EN DOUBLE, et rien ne le signale — TypeScript ne refuse pas une clé
// répétée dans un objet typé `Record<string, …>`, donc `tsc --noEmit` passe.
// On relit donc l'index après coup, et on refuse de rendre la main s'il double.
const contenu = git(["show", `:${fichier}`]);
const cles = [...contenu.matchAll(/^ {2}"([^"]+)": \{/gm)].map((m) => m[1]);
const vus = new Map();
for (const c of cles) vus.set(c, (vus.get(c) ?? 0) + 1);
const doublons = [...vus].filter(([, n]) => n > 1).map(([c]) => c).sort();
if (doublons.length) {
  git(["restore", "--staged", fichier]);
  console.error(
    `⛔ l'index sortait avec ${doublons.length} clé(s) en double : ${doublons.join(", ")}\n` +
      `   index remis à HEAD. Reprends l'insertion à un autre point d'ancrage.`
  );
  process.exit(1);
}
console.log(`index vérifié : ${cles.length} clés, aucune en double`);
