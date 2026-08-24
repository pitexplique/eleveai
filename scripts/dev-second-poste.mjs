// Un second serveur de développement, avec son propre dossier compilé.
//
// ⛔ POURQUOI (24/08/2026). Deux postes travaillent sur ce dépôt en même temps —
// les maths d'un côté, le français de l'autre. Chacun lance `npm run dev` ; le
// second prend automatiquement un autre port, et tout a l'air normal. Mais les
// deux écrivent leurs modules compilés dans le MÊME dossier `.next`, et se les
// écrasent l'un l'autre.
//
// Ce que ça donne, mesuré : des 404 sur des routes qui existent, des 500 sur
// `/favicon.ico` et `/_document`, un « Cannot read properties of undefined
// (reading 'call') » au fond d'un chunk webpack. Par intermittence, donc
// impossible à rattacher à sa cause : on croit avoir cassé sa propre page. Une
// fournée de PDF s'y est arrêtée deux fois, et a écrit le PDF d'une page 404.
//
// Usage : npm run dev:2 [-- --port 3100]
// Le dossier `.next-2` est ignoré par git (`/.next-*/`).

import { spawn } from "node:child_process";

const dossier = process.env.NEXT_DIST_DIR || ".next-2";

console.log(`▸ second serveur de dev — dossier compilé : ${dossier}`);
console.log("  (le premier poste garde .next, les deux ne se marchent plus dessus)\n");

const enfant = spawn("npx", ["next", "dev", ...process.argv.slice(2)], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, NEXT_DIST_DIR: dossier },
});

enfant.on("exit", (code) => process.exit(code ?? 0));
