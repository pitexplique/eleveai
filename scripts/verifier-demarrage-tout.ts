// EST-CE QUE ÇA DÉMARRE — SUR TOUT LE COACH, D'UN SEUL COUP
//
// POURQUOI (23/11/2026). `verifier-demarrage.ts` fait le geste de l'élève sur
// UNE classe et UNE matière. Personne ne le lançait sur les 44 couples du
// catalogue, donc personne ne savait combien de lignes du coach ouvrent une
// AUTRE ligne que celle qu'on a cliquée. Ce script balaie le catalogue entier.
//
// ⭐⭐ LE MODE EST UN RÉGLAGE : chaque couple est mesuré en SIMPLE **et** en
// COMPLET, parce que `allowSingleItem` (tutorEngineV4) ne vaut pas pareil dans
// les deux, et qu'un chiffre de démarrage sans son mode ne veut rien dire.
//
// ⚠️ C'est un INSTRUMENT, donc il a son étalon : les mêmes 25 lignes que
// `verifier-demarrage.ts`. Toute divergence entre les deux est un défaut de
// CELUI-CI, pas une découverte. `--etalon <classe> <matiere>` n'en mesure qu'un
// couple, pour comparer les deux sorties.
//
// Usage :
//   npx --yes tsx@4 scripts/verifier-demarrage-tout.ts
//   npx --yes tsx@4 scripts/verifier-demarrage-tout.ts --etalon 6e maths

import { startTutorSessionV4 } from "@/lib/tutor-v4/tutorEngineV4";
import { loadKnowledgeV4 } from "@/lib/tutor-v4/loaders/loadKnowledgeV4";
import { defaultDisplayModeForClasse } from "@/lib/tutor-v4/displayMode";

/* Les couples viennent du switch de `lib/tutor-v4/catalog.ts` : c'est le
   registre. ⛔ Ne pas en recopier un à la main ailleurs. */
const COUPLES: { classe: string; matiere: string }[] = [
  ...["cp","ce1","ce2","cm1","cm2","6e","5e","4e","3e","seconde","premiere","premiere-spe","terminale-spe","stmg","adulte"].map(c => ({ classe: c, matiere: "maths" })),
  ...["cp","ce1","ce2","cm1","cm2","6e","5e","4e","3e","seconde"].map(c => ({ classe: c, matiere: "francais" })),
  ...["a1","a2","b1","b2"].map(c => ({ classe: c, matiere: "english-maths" })),
  ...["a1","a2","b1","b2"].map(c => ({ classe: c, matiere: "espagnol" })),
  ...["a1","a2","b1","b2"].map(c => ({ classe: c, matiere: "economie" })),
  ...["pix-college","pix-lycee","a1","a2","b1","b2","c1"].map(c => ({ classe: c, matiere: "ia" })),
];

type Bilan = {
  classe: string; matiere: string; mode: string;
  notions: number; total: number; franc: number;
  detourne: { micro: string; servi: string }[];
  leve: { micro: string; raison: string }[];
  erreurCharge?: string;
};

async function mesurer(classe: string, matiere: string, mode: "simple" | "complete"): Promise<Bilan> {
  const vide: Bilan = { classe, matiere, mode, notions: 0, total: 0, franc: 0, detourne: [], leve: [] };
  let knowledge;
  try {
    knowledge = await loadKnowledgeV4(classe, matiere);
  } catch (e) {
    return { ...vide, erreurCharge: (e as Error).message.split("\n")[0] };
  }
  const detourne: { micro: string; servi: string }[] = [];
  const leve: { micro: string; raison: string }[] = [];
  let franc = 0;
  for (const micro of knowledge.microSkills) {
    try {
      const r = await startTutorSessionV4({
        classe: classe as never, matiere: matiere as never,
        notion: micro.notionId, microId: micro.id, displayMode: mode,
      });
      const servi = r.pair?.optionA?.microId;
      if (!r.pair?.optionA?.text) throw new Error("la paire revient vide");
      if (servi !== micro.id) detourne.push({ micro: micro.id, servi: servi ?? "?" });
      else franc += 1;
    } catch (e) {
      leve.push({ micro: micro.id, raison: (e as Error).message.split("\n")[0] });
    }
  }
  return { classe, matiere, mode, notions: knowledge.notions.length, total: knowledge.microSkills.length, franc, detourne, leve };
}

async function main() {
  const args = process.argv.slice(2);
  const etalon = args[0] === "--etalon";
  const couples = etalon ? [{ classe: args[1], matiere: args[2] }] : COUPLES;
  const modes: ("simple" | "complete")[] = ["simple", "complete"];

  const tout: Bilan[] = [];
  for (const c of couples) {
    for (const mode of modes) {
      const b = await mesurer(c.classe, c.matiere, mode);
      tout.push(b);
      const defaut = defaultDisplayModeForClasse(c.classe as never) === mode ? " (mode par défaut de la classe)" : "";
      if (b.erreurCharge) {
        console.log(`⛔ ${c.classe.padEnd(14)} ${c.matiere.padEnd(14)} ${mode.padEnd(9)} CHARGEMENT IMPOSSIBLE : ${b.erreurCharge}`);
        continue;
      }
      console.log(
        `${(b.leve.length ? "⛔" : b.detourne.length ? "🟠" : "🟢")} ` +
        `${c.classe.padEnd(14)} ${c.matiere.padEnd(14)} ${mode.padEnd(9)} ` +
        `${String(b.notions).padStart(3)} notions · ${String(b.total).padStart(4)} micros · ` +
        `franches ${String(b.franc).padStart(4)} · détournées ${String(b.detourne.length).padStart(3)} · lèvent ${String(b.leve.length).padStart(3)}${defaut}`
      );
    }
  }

  console.log("\n" + "═".repeat(100));
  console.log("LE DÉTAIL DE CE QUI NE VA PAS");
  console.log("═".repeat(100));
  for (const b of tout) {
    if (!b.detourne.length && !b.leve.length && !b.erreurCharge) continue;
    console.log(`\n── ${b.classe} · ${b.matiere} · mode ${b.mode} ──`);
    if (b.erreurCharge) { console.log(`   CHARGEMENT : ${b.erreurCharge}`); continue; }
    for (const l of b.leve) console.log(`   ⛔ ${l.micro.padEnd(34)} ${l.raison}`);
    for (const d of b.detourne) console.log(`   🟠 ${d.micro.padEnd(34)} → sert ${d.servi}`);
  }

  const microsTotal = tout.filter(b => b.mode === "complete").reduce((s, b) => s + b.total, 0);
  const levent = tout.reduce((s, b) => s + b.leve.length, 0);
  const detournees = tout.reduce((s, b) => s + b.detourne.length, 0);
  console.log("\n" + "═".repeat(100));
  console.log(`${tout.length} mesures · ${microsTotal} micro-compétences au catalogue (comptées une fois)`);
  console.log(`${levent} démarrages en erreur · ${detournees} lignes qui en ouvrent une autre (les deux modes additionnés)`);
  if (levent) process.exit(1);
}

main();
