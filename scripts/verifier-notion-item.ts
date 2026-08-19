// Chaque micro-compétence est-elle rangée sous UNE SEULE notion ?
//
// POURQUOI (19/08/2026). `questionPairBuilder` cherche les items d'une micro
// ainsi :
//
//   bank.filter((item) => item.notionId === notionId && item.microId === microId)
//
// Le `notionId` qu'il compare vient de la CONNAISSANCE — `knowledge.microSkills`
// —, pas de la banque. Un item rangé sous une autre notion que celle-là n'est
// donc jamais trouvé pour sa micro : la paire ne se forme pas, et le moteur sert
// une micro VOISINE sans que rien ne le signale.
//
// Trois seconds items STMG sont tombés dedans le 19/08 : `suite_geo_variation`
// écrit sous `suite_geometrique` alors que la connaissance le range sous
// `suite_geo_evolution`. Le nom de la micro ressemblait à la notion — et c'est
// exactement le piège : on déduit au lieu de recopier.
//
// ⛔ LES CINQ VÉRIFICATEURS ÉTAIENT VERTS. Générateurs, variété, canvas, LaTeX,
// doublons : tous comptent les items, aucun ne demande s'ils sont rangés là où
// le moteur les cherchera. Et `verifier-demarrage` n'en voyait qu'un sur trois,
// les deux autres étant détournés vers une voisine capable de démarrer — le
// détournement passait pour un succès.
//
// Usage — tsx n'est pas une dépendance du projet, npx le récupère au vol :
//   npx --yes tsx@4 scripts/verifier-notion-item.ts
//   npx --yes tsx@4 scripts/verifier-notion-item.ts stmg seconde
//   npx --yes tsx@4 scripts/verifier-notion-item.ts --matiere francais 3e

import { loadQuestionBankV4 } from "@/lib/tutor-v4/loaders/loadQuestionBankV4";
import { loadKnowledgeV4 } from "@/lib/tutor-v4/loaders/loadKnowledgeV4";

const CLASSES_MATHS = [
  "cp", "ce1", "ce2", "cm1", "cm2",
  "6e", "5e", "4e", "3e",
  "seconde", "premiere-spe", "terminale-spe", "stmg", "adulte",
] as const;

type Ecart = {
  micro: string;
  attendu: string;
  trouves: string[];
  items: string[];
};

async function verifier(classe: string, matiere: string): Promise<Ecart[]> {
  const knowledge = await loadKnowledgeV4(classe, matiere);
  const bank: { id: string; microId: string; notionId: string }[] =
    (await loadQuestionBankV4(classe, matiere)) as never;

  /* La connaissance est l'autorité : c'est SON notionId que le moteur passe. */
  const notionOfficielle = new Map<string, string>(
    knowledge.microSkills.map((m) => [m.id, m.notionId])
  );

  const parMicro = new Map<string, { notions: Set<string>; items: string[] }>();
  for (const item of bank) {
    if (!parMicro.has(item.microId)) {
      parMicro.set(item.microId, { notions: new Set(), items: [] });
    }
    const entree = parMicro.get(item.microId)!;
    entree.notions.add(item.notionId);
    entree.items.push(item.id);
  }

  const ecarts: Ecart[] = [];
  for (const [micro, { notions, items }] of parMicro) {
    const attendu = notionOfficielle.get(micro);
    if (attendu === undefined) continue; // micro inconnue : autre contrôle
    const fautives = [...notions].filter((n) => n !== attendu);
    if (fautives.length > 0) {
      ecarts.push({ micro, attendu, trouves: fautives, items });
    }
  }
  return ecarts;
}

async function main() {
  const args = process.argv.slice(2);
  const iMatiere = args.indexOf("--matiere");
  const matiere = iMatiere === -1 ? "maths" : args[iMatiere + 1];
  const classes = args.filter((a, k) => !a.startsWith("--") && k !== iMatiere + 1);
  const cibles = classes.length > 0 ? classes : [...CLASSES_MATHS];

  let total = 0;
  for (const classe of cibles) {
    let ecarts: Ecart[];
    try {
      ecarts = await verifier(classe, matiere);
    } catch (e) {
      console.log(`⚠️  ${classe.padEnd(14)} illisible — ${(e as Error).message.split("\n")[0]}`);
      continue;
    }
    if (ecarts.length === 0) {
      console.log(`✅ ${classe.padEnd(14)} chaque micro est rangée sous sa notion`);
      continue;
    }
    total += ecarts.length;
    console.log(`❌ ${classe.padEnd(14)} ${ecarts.length} micro(s) mal rangée(s) :`);
    for (const e of ecarts) {
      console.log(`     ${e.micro}`);
      console.log(`        attendu : ${e.attendu}`);
      console.log(`        trouvé  : ${e.trouves.join(", ")}`);
      console.log(`        items   : ${e.items.join(", ")}`);
    }
  }

  console.log("");
  if (total === 0) {
    console.log("✅ Aucun item rangé hors de sa notion : toutes les paires peuvent se former.");
    return;
  }
  console.log(
    `${total} micro(s) dont un item ne sera JAMAIS trouvé par le moteur.\n` +
      `Recopier le notionId du premier item — ne pas le déduire du nom de la micro.\n`
  );
  process.exit(1);
}

main();
