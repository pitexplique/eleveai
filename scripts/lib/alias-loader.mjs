// Résolution de l'alias `@/` pour les scripts qui EXÉCUTENT le code du projet.
//
// POURQUOI (11/08/2026). `verifier-generateurs.mjs` charge chaque banque avec
// `import()`. Node ne connait pas l'alias `@/` de tsconfig : toute banque qui
// importe un module voisin — et pas seulement des types — échouait à se
// charger. Le script le disait, mais tout en bas, dans une liste « non
// couverts » que personne ne lisait.
//
// Ce que ça cachait : les banques de français de CM1, CM2 et 6e sont bâties
// par `buildCycle3FrancaisBank`, derrière un `index.ts` qui importe en `@/`.
// Le script n'y voyait que la couche `fixed.bank.ts`, annonçait « 0 tirages »
// et concluait « Aucun problème ». 381 générateurs n'étaient contrôlés par
// personne, et le rapport disait le contraire.
//
// Un hook `resolve` suffit : on réécrit `@/x` en chemin absolu, et on laisse
// Node faire le reste. L'extension est ajoutée à l'essai, dans l'ordre où
// TypeScript la cherche lui-même.

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const RACINE = process.cwd();

/** Les formes que TypeScript essaie derrière un import sans extension. */
function candidats(base) {
  return [base, `${base}.ts`, `${base}.tsx`, path.join(base, "index.ts"), path.join(base, "index.tsx")];
}

function premierFichier(base) {
  for (const candidat of candidats(base)) {
    if (fs.existsSync(candidat) && fs.statSync(candidat).isFile()) return candidat;
  }
  return null;
}

export async function resolve(specifier, context, nextResolve) {
  // 1. L'alias du projet.
  if (specifier.startsWith("@/")) {
    const trouve = premierFichier(path.resolve(RACINE, specifier.slice(2)));
    if (trouve) return nextResolve(pathToFileURL(trouve).href, context);
  }

  // 2. Les imports RELATIFS sans extension — « ./conjugaison.bank ».
  //    TypeScript les accepte, Node non. C'est ce qui faisait échouer les
  //    `index.ts` de CP, CE1 et CE2 : leurs items étaient bien contrôlés par
  //    ailleurs, mais l'index apparaissait quand même dans la liste des
  //    fichiers « hors de portée », ce qui laissait croire à un trou.
  if (specifier.startsWith("./") || specifier.startsWith("../")) {
    const parent = context.parentURL ? path.dirname(new URL(context.parentURL).pathname) : RACINE;
    // Sous Windows, pathname commence par « /C: » : on le rend au système.
    const base = path.resolve(decodeURIComponent(parent.replace(/^\/([A-Za-z]:)/, "$1")), specifier);
    const trouve = premierFichier(base);
    if (trouve) return nextResolve(pathToFileURL(trouve).href, context);
  }

  return nextResolve(specifier, context);
}
