// LES CORRECTIONS TROP INDULGENTES — `contains_keyword` sur une réponse chiffrée.
//
// ⛔ POURQUOI (30/09/2026). `contains_keyword` accepte toute réponse qui
// CONTIENT l'attendue. Pour une explication rédigée, c'est voulu (on cherche
// des mots-clés). Pour un nombre ou une expression, c'est faux : « 120 » passe
// pour 12, « 3x + 67 » pour 3x + 6, cinq facteurs pour 5⁴. Mesuré ce jour-là :
// 97 items de 4e, dont tout le calcul littéral.
// Le remède : `number_equal` pour un nombre, `expression_developpee`,
// `expression_factorisee` ou `expression_equivalente` pour une expression
// (lib/tutor/evaluation/expressionAlgebrique.ts), `exact_text` + variantes
// pour une écriture imposée.
//
// Le test : la bonne réponse SUIVIE D'UN 7 est-elle acceptée ? Si oui, l'item
// est signalé. Les réponses ouvertes (`format: "open"`) sont ignorées.
//
// Usage : npx --yes tsx@4 scripts/verifier-corrections-indulgentes.ts <classe> [<notionId> …]

import { maths4eQuestionBank } from "@/lib/tutor-v4/questionBank/4e/maths/index";
import { compareAnswer } from "@/lib/tutor/evaluation/comparators";

const BANQUES: Record<string, any[]> = { "4e": maths4eQuestionBank };
const [classe, ...notions] = process.argv.slice(2);
const B = BANQUES[classe];
if (!B) {
  console.log(`usage : npx --yes tsx@4 scripts/verifier-corrections-indulgentes.ts <${Object.keys(BANQUES).join("|")}> [notionId …]`);
  process.exit(2);
}
const parNotion: Record<string, Set<string>> = {};
for (const i of B.filter((x) => !notions.length || notions.includes(x.notionId))) {
  for (let k = 0; k < (i.kind === "template" ? 30 : 1); k++) {
    const q = i.kind === "template" ? i.generate() : i;
    if (q.format === "open" || q.comparator !== "contains_keyword") continue;
    const e = String(q.expected?.[0] ?? "");
    if (!/\d/.test(e)) continue;
    if (compareAnswer({ comparator: "contains_keyword", answer: e + "7", expected: q.expected })) (parNotion[i.notionId] ??= new Set()).add(i.id);
  }
}
let n = 0;
for (const [no, ids] of Object.entries(parNotion)) {
  n += ids.size;
  console.log(`❌ ${no.padEnd(30)} ${ids.size} : ${[...ids].join(", ")}`);
}
console.log(n ? `\n❌ ${n} item(s) acceptent « la bonne réponse suivie d'un 7 ».` : "✅ Aucune correction trop indulgente sur une réponse chiffrée.");
process.exit(n ? 1 : 0);
