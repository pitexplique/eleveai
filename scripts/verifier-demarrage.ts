// EST-CE QUE ÇA DÉMARRE ?
//
// POURQUOI (16/08/2026). Le dépôt a déjà payé ce contrôle manquant :
// « La classe STMG passait les cinq vérificateurs et ne démarrait pas »
// (af94f92b). Les vérificateurs de banque regardent les ITEMS ; aucun ne fait
// le geste de l'élève, qui est de cliquer UNE ligne précise et d'attendre une
// question. Entre les deux il y a le moteur, et le moteur a ses exigences :
//
//   - `buildQuestionPair` propose DEUX énoncés au choix. Sous deux items pour
//     un savoir-faire, il lève « Pas assez de questions disponibles » — sauf
//     si l'unique item est un GÉNÉRATEUR, qui peut se dédoubler.
//   - quand une micro-compétence ne peut pas servir, le moteur cherche une
//     VOISINE dans la même notion et la sert à sa place. L'élève a cliqué une
//     ligne et en reçoit une autre, sans que rien ne le dise. Si la notion
//     entière est trop maigre, alors seulement il lève.
//
// Le second cas est le plus traître : tout paraît marcher. Ce script le
// distingue du premier, parce qu'une ligne qui en ouvre une autre n'est pas
// une ligne qui marche.
//
// Usage :
//   npx --yes tsx@4 scripts/verifier-demarrage.ts <classe> <matiere>
//   npx --yes tsx@4 scripts/verifier-demarrage.ts pix-college ia
//   npx --yes tsx@4 scripts/verifier-demarrage.ts stmg maths

import { startTutorSessionV4 } from "@/lib/tutor-v4/tutorEngineV4";
import { loadKnowledgeV4 } from "@/lib/tutor-v4/loaders/loadKnowledgeV4";
import { defaultDisplayModeForClasse } from "@/lib/tutor-v4/displayMode";

const CLASSE = process.argv[2];
const MATIERE = process.argv[3] ?? "maths";

/* ⭐⭐ LE MODE EST UN RÉGLAGE, DONC IL DOIT ÊTRE UN ARGUMENT (18/08/2026).
   Ce script lisait `defaultDisplayModeForClasse(CLASSE)` en dur. Il a donc
   annoncé « 90 micros sur 96 ne démarrent pas » en français de 2de, pendant que
   Frédéric constatait que le coach marchait. Les deux étaient vrais : lui en
   mode SIMPLE, le script en mode COMPLET — et l'écart entre les deux n'est pas
   un détail, c'est `allowSingleItem` (tutorEngineV4), qui autorise un gabarit
   unique à se dédoubler.
   ⛔ Une mesure qui dépend d'un réglage caché n'est pas une mesure. Le réglage
   se déclare : `… <classe> <matiere> [simple|complete]`. Sans argument, on garde
   le mode réel de la classe — c'est ce que voit l'élève par défaut. */
const MODE_ARG = process.argv[4];

if (!CLASSE || (MODE_ARG && MODE_ARG !== "simple" && MODE_ARG !== "complete")) {
  console.error(
    "Usage : npx --yes tsx@4 scripts/verifier-demarrage.ts <classe> <matiere> [simple|complete]"
  );
  process.exit(1);
}

/* Tout dans une fonction : `tsx` compile ce fichier en CommonJS, où le `await`
   de premier niveau n'existe pas. */
async function main() {
const knowledge = await loadKnowledgeV4(CLASSE, MATIERE);
const displayMode =
  (MODE_ARG as "simple" | "complete" | undefined) ??
  defaultDisplayModeForClasse(CLASSE);

const leve: { micro: string; raison: string }[] = [];
const detourne: { micro: string; servi: string }[] = [];
let franc = 0;

for (const micro of knowledge.microSkills) {
  try {
    const r = await startTutorSessionV4({
      classe: CLASSE,
      matiere: MATIERE,
      notion: micro.notionId,
      microId: micro.id,
      displayMode,
    });

    const servi = r.pair?.optionA?.microId;
    if (!r.pair?.optionA?.text) throw new Error("la paire revient vide");

    /* La ligne cliquée et la ligne servie doivent être la même. Sinon le
       moteur a fait un repli — utile en cours de séance, mensonger au
       démarrage. */
    if (servi !== micro.id) detourne.push({ micro: micro.id, servi: servi ?? "?" });
    else franc += 1;
  } catch (e) {
    leve.push({ micro: micro.id, raison: (e as Error).message.split("\n")[0] });
  }
}

const total = knowledge.microSkills.length;
console.log(`\nDÉMARRAGE · ${CLASSE} · ${MATIERE} · mode ${displayMode}`);
console.log("─".repeat(72));
console.log(`${knowledge.notions.length} notions · ${total} micro-compétences\n`);
console.log(`🟢 ${franc}/${total} ouvrent bien la ligne cliquée`);
if (detourne.length) console.log(`🟠 ${detourne.length} ouvrent une AUTRE ligne (repli silencieux)`);
if (leve.length) console.log(`⛔ ${leve.length} ne démarrent pas du tout`);

if (detourne.length) {
  console.log(`\nCliqué → réellement servi :`);
  for (const d of detourne) console.log(`   ${d.micro.padEnd(12)} → ${d.servi}`);
}

if (leve.length) {
  console.log(`\nNe démarrent pas :`);
  for (const l of leve) console.log(`   ${l.micro.padEnd(12)} ${l.raison}`);
}

if (leve.length) {
  console.log(
    `\n${leve.length} micro-compétence(s) affichée(s) au coach ouvrent sur une erreur.\n`,
  );
  process.exit(1);
}
if (detourne.length) {
  console.log(
    `\nAucune erreur, mais ${detourne.length} ligne(s) en ouvrent une autre : à nourrir\n` +
      `avant d'ouvrir la classe aux élèves.\n`,
  );
  process.exit(1);
}
console.log(`\nChaque ligne du coach ouvre la sienne.\n`);
}

main();
