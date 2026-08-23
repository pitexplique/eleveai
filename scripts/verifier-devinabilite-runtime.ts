// LA BONNE RÉPONSE SE DEVINE-T-ELLE ? — la version qui voit le français.
//
// ⛔⛔ POURQUOI CE SCRIPT EXISTE À CÔTÉ DE `verifier-devinabilite.mjs`
// (23/08/2026). Frédéric : « vérifie aussi que les bonnes réponses sur 6e et
// cm2 sont mélangées et que la bonne réponse ne soit pas la phrase la plus
// longue tout le temps. » Passé sur ces deux classes, le `.mjs` a répondu :
//
//     cm2   aucun QCM à trois propositions ou plus.
//     Aucune banque ne se laisse gagner à la longueur.
//
// … en ayant écrit trois lignes plus haut, dans un paragraphe qu'on saute :
//
//     Fichiers illisibles par ce script :
//        cm2/fixed.bank.ts — Unknown file extension ".ts"
//
// Il ne sait pas charger un `.ts`. Il saute donc TOUTE la banque de français et
// prononce quand même son verdict. Le feu vert ne portait sur rien. C'est le
// défaut déjà documenté pour `auditer-banque.mjs`, et le remède est le même :
// charger la banque à l'EXÉCUTION, par le loader du coach.
//
// ⭐ ON COMPTE PAR ITEM, PAS PAR TIRAGE. C'est la leçon de l'étalonnage du
// `.mjs` : compter les tirages fait peser un gabarit n fois un item figé, donc
// changer le nombre de tirages change la grandeur mesurée. Un gabarit compte
// ici pour UN, avec la part de ses propres tirages où il penche.
//
// ⭐ ET LA QUESTION QUI TRANCHE EST LA MARGE, PAS LA PART. À 36 %, rogner des
// bonnes réponses pour passer sous 35 %, c'est repeindre le verdict. Ce qui se
// voit d'un coup d'œil, c'est un écart de 8 caractères ; en dessous de 3, c'est
// du bruit et on n'y touche pas.
//
// Usage :
//   npx --yes tsx@4 scripts/verifier-devinabilite-runtime.ts cm2 francais
//   npx --yes tsx@4 scripts/verifier-devinabilite-runtime.ts 6e francais --liste

import { loadQuestionBankV4 } from "@/lib/tutor-v4/loaders/loadQuestionBankV4";

const CLASSE = process.argv[2];
const MATIERE = process.argv[3] ?? "francais";
const LISTE = process.argv.includes("--liste");

/** Le seuil au-delà duquel l'écart se voit à l'œil nu (cycle 4, 19/08/2026). */
const MARGE_VISIBLE = 8;
/** La part de bonnes réponses les plus longues jugée saine — même étalon. */
const PART_SAINE = 35;
/** Tirages par gabarit. La grandeur n'en dépend PAS : on agrège par item. */
const TIRAGES = 30;

/* Le mélange RÉEL du coach (`questionPairBuilder.shuffleChoices`), recopié —
   et non ré-inventé : c'est lui qui décide de la position vue par l'élève.
   ⚠️ Le dernier tour lit les bits de POIDS FORT. Avec `seed % (i + 1)`, le
   mélange était faux à quatre lignes (33 % en rang 1) ; corrigé le 11/08. */
function melangeDuCoach(choices: string[], id: string): string[] {
  let seed = 0;
  for (let i = 0; i < id.length; i++) seed = (seed * 31 + id.charCodeAt(i)) >>> 0;
  const arr = [...new Set(choices)];
  for (let i = arr.length - 1; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const j = Math.floor((seed / 0x100000000) * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

type Penchant = {
  id: string;
  microId: string;
  penche: number; // part des tirages où la bonne est la plus longue
  margeMax: number;
  texte: string;
  bonne: string;
};

async function main() {
  if (!CLASSE) {
    console.error("usage : npx --yes tsx@4 scripts/verifier-devinabilite-runtime.ts <classe> [matiere] [--liste]");
    process.exit(1);
  }
  const bank: { id: string; microId: string; generate?: (o?: unknown) => unknown }[] =
    (await loadQuestionBankV4(CLASSE, MATIERE)) as never;

  const rangs = [0, 0, 0, 0, 0, 0];
  let tiragesQcm = 0;
  const items: Penchant[] = [];

  for (const item of bank) {
    const n = item.generate ? TIRAGES : 1;
    let vus = 0;
    let penchants = 0;
    let margeMax = -Infinity;
    let dernierTexte = "";
    let derniereBonne = "";

    for (let t = 0; t < n; t++) {
      const g = (item.generate ? item.generate({}) : item) as {
        text?: string;
        choices?: string[];
        expected?: string[];
      };
      const choix = g.choices;
      const bonne = (g.expected ?? [])[0];
      if (!choix || choix.length < 3 || typeof bonne !== "string") continue;
      vus++;
      tiragesQcm++;

      const rang = melangeDuCoach(choix, `${item.id}__${t}_${tiragesQcm}`).indexOf(bonne);
      if (rang >= 0 && rang < rangs.length) rangs[rang]++;

      const leurres = choix.filter((c) => c !== bonne);
      if (!leurres.length) continue;
      const marge = bonne.length - Math.max(...leurres.map((c) => c.length));
      if (marge > 0) {
        penchants++;
        if (marge > margeMax) {
          margeMax = marge;
          dernierTexte = g.text ?? "";
          derniereBonne = bonne;
        }
      }
    }

    if (!vus) continue;
    items.push({
      id: item.id,
      microId: item.microId,
      penche: penchants / vus,
      margeMax: margeMax === -Infinity ? 0 : margeMax,
      texte: dernierTexte,
      bonne: derniereBonne,
    });
  }

  const pctRang = (n: number) => ((100 * n) / tiragesQcm).toFixed(1);
  const partPenchee = items.reduce((a, i) => a + i.penche, 0) / items.length;
  const visibles = items.filter((i) => i.margeMax >= MARGE_VISIBLE).sort((a, b) => b.margeMax - a.margeMax);
  const marges = items.filter((i) => i.margeMax > 0).map((i) => i.margeMax).sort((a, b) => a - b);
  const mediane = marges.length ? marges[Math.floor(marges.length / 2)] : 0;

  console.log(`\nDEVINABILITÉ · ${CLASSE.toUpperCase()} · ${MATIERE}`);
  console.log("─".repeat(72));
  console.log(`${items.length} items à 3 propositions ou plus · ${tiragesQcm} tirages`);

  const posOk = rangs.slice(0, 4).every((n) => Math.abs((100 * n) / tiragesQcm - 25) < 3);
  console.log(
    `\n${posOk ? "✅" : "⛔"} POSITION  ` +
      rangs.slice(0, 4).map((n, i) => `rang ${i + 1} : ${pctRang(n)} %`).join(" · ") +
      `   (25 % attendu)`
  );

  const part = 100 * partPenchee;
  console.log(
    `${part <= PART_SAINE ? "✅" : "⛔"} LONGUEUR  la bonne réponse est la plus longue dans ${part.toFixed(1)} % des cas` +
      `   (${PART_SAINE} % visé)`
  );
  console.log(`   marge médiane quand elle l'est : +${mediane} car.`);
  console.log(
    `   ${visibles.length ? "⛔" : "✅"} items dont l'écart atteint ${MARGE_VISIBLE} car. — ça se voit d'un coup d'œil : ${visibles.length}`
  );

  if (visibles.length) {
    const montrer = LISTE ? visibles : visibles.slice(0, 15);
    for (const v of montrer) {
      console.log(`\n   +${v.margeMax} car. · ${v.microId} · ${v.id}`);
      console.log(`      « ${v.texte.slice(0, 90)} »`);
      console.log(`      → « ${v.bonne.slice(0, 90)} »`);
    }
    if (!LISTE && visibles.length > 15) {
      console.log(`\n   … et ${visibles.length - 15} autres. --liste pour tout voir.`);
    }
    console.log(
      `\n→ On ne RACCOURCIT PAS la bonne réponse : on rend les leurres PLAUSIBLES,` +
        `\n  ce qui les allonge naturellement. ⚠️ Un leurre allongé peut devenir FAUX` +
        `\n  du texte : relire l'en-tête du pool avant de le réécrire.`
    );
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
