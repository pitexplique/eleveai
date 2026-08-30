/* ─── L'ÉTALON DE LA DEVINABILITÉ PAR LA LONGUEUR ────────────────────────────
   Écrit le 30/08/2026, après que Frédéric a repris une conclusion que j'avais
   tirée d'un mauvais instrument : « attention à tes étalons et système de
   mesures ».

   ⛔ CE QUI CLOCHAIT DANS `verifier-devinabilite-runtime.ts` — non pas un bug,
   mais deux limites qu'il faut connaitre avant de lui faire dire un avant/après :
   1. IL EST BRUYANT. Quatre passages sur du code identique donnent 35,8 / 36,2 /
      37,1 / 36,9 % : une bande de 1,3 point. Tout écart plus petit qu'elle n'est
      pas une mesure, et j'en avais rapporté trois.
   2. IL SAUTE LES TIRAGES À MOINS DE TROIS PROPOSITIONS. Comparer une banque
      servie à quatre propositions partout avec la même servie en {2,3,4}, c'est
      comparer la banque entière à un sous-ensemble d'elle-même.

   ⭐⭐ CE QUE MESURE CE SCRIPT, ET POURQUOI IL EST STABLE : la propriété « la
   bonne réponse est la plus longue » appartient AU POOL, pas au tirage. On
   accumule donc, par énoncé, l'UNION de tous les leurres observés, et l'on
   tranche sur cette union. Le résultat ne dépend plus du nombre de propositions
   servi ni de la chance.

   ⭐ ET IL DONNE LES DEUX CHIFFRES CÔTE À CÔTE, sur la MÊME population :
     · AU TIRAGE   : ce que l'élève voit réellement ;
     · DANS LE POOL: le plancher, qu'on ne peut pas descendre sans réécrire.
   L'écart entre les deux est du HASARD DE TIRAGE — un leurre assez long existe,
   il n'a pas été tiré. C'est la part récupérable par la SÉLECTION des leurres ;
   le plancher, lui, ne se corrige qu'en réécrivant les pools.

   Mesuré le 30/08/2026 : cm1 38,2 / 22,5 · cm2 36,6 / 19,0 · 6e 40,4 / 24,4.

   Usage :  npx --yes tsx@4 scripts/mesurer-longueur-reponse.ts <classe> [matiere]
*/

import { loadQuestionBankV4 } from "@/lib/tutor-v4/loaders/loadQuestionBankV4";

type Q = { text?: string; choices?: string[]; expected?: string[] };
type It = { microId: string; generate?: () => Q };

/** 400 par item : l'union des leurres se stabilise bien avant. */
const TIRAGES = 400;

async function main() {
  const classe = process.argv[2];
  const matiere = process.argv[3] ?? "francais";
  if (!classe) {
    console.error("Usage : mesurer-longueur-reponse.ts <classe> [matiere]");
    process.exit(2);
  }

  const bank = ((await loadQuestionBankV4(classe, matiere)) ?? []) as It[];
  if (!bank.length) {
    console.error(`Banque vide : ${classe}/${matiere}`);
    process.exit(2);
  }

  const par = new Map<string, { correct: string; leurres: Set<string> }>();
  let tirages = 0;
  let longueAuTirage = 0;

  for (const it of bank) {
    if (!it.generate) continue;
    for (let t = 0; t < TIRAGES; t++) {
      const q = it.generate();
      const correct = q?.expected?.[0];
      if (!q?.text || !correct || !q.choices) continue;
      const autres = q.choices.filter((c) => c !== correct);
      if (!autres.length) continue;

      tirages += 1;
      if (correct.length > Math.max(...autres.map((a) => a.length))) longueAuTirage += 1;

      const cle = `${q.text}##${correct}`;
      const e = par.get(cle) ?? { correct, leurres: new Set<string>() };
      for (const c of autres) e.leurres.add(c);
      par.set(cle, e);
    }
  }

  let dansLePool = 0;
  let ecartVisible = 0;
  for (const { correct, leurres } of par.values()) {
    const plusLong = Math.max(...[...leurres].map((l) => l.length));
    if (correct.length > plusLong) dansLePool += 1;
    if (correct.length - plusLong >= 8) ecartVisible += 1;
  }

  const total = par.size;
  const pctTirage = (longueAuTirage / tirages) * 100;
  const pctPool = (dansLePool / total) * 100;

  console.log(`\nLONGUEUR DE LA BONNE RÉPONSE · ${classe} · ${matiere}`);
  console.log("────────────────────────────────────────────────────────────────");
  console.log(`   AU TIRAGE     ${pctTirage.toFixed(1)} %   ce que l'élève voit  (${tirages} tirages)`);
  console.log(`   DANS LE POOL  ${pctPool.toFixed(1)} %   le plancher          (${total} énoncés)`);
  console.log(`   écart         ${(pctTirage - pctPool).toFixed(1)} pts  récupérable en choisissant mieux les leurres`);
  console.log(`   écart ≥ 8 caractères, dans le pool : ${ecartVisible} énoncés\n`);
  console.log("⭐ Le plancher ne descend qu'en RÉÉCRIVANT les leurres — on ne");
  console.log("   raccourcit jamais la bonne réponse.\n");
}

main();
