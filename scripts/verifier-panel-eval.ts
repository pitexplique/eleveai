// VÉRIFICATION DES RÈGLES DU PANEL — sans navigateur.
//
// `construireItems` et `passationEligiblePanel` décident de ce qui part en base
// et de ce qui entrera, ou non, dans le panel national. Ce sont des règles
// d'épreuve : elles doivent pouvoir se vérifier sans ouvrir Chrome, exactement
// comme `reponseTableau` (voir sa note dans moteur.ts).
//
// Lancer :  npx tsx scripts/verifier-panel-eval.ts

import {
  construireItems,
  passationEligiblePanel,
  type QuestionEval,
} from "@/lib/eval-nationale/moteur";

function question(n: number): QuestionEval {
  return {
    cle: `k${n}`,
    itemId: `item-${n}`,
    themeId: "t1",
    themeLabel: "Thème",
    notionId: "n1",
    notionLabel: "Notion",
    microId: `m${n}`,
    microLabel: "Micro",
    typeItem: "autre",
    format: "cases",
    text: `Question ${n}`,
    choices: ["A", "B"],
    expected: ["A"],
  };
}

const questions = Array.from({ length: 10 }, (_, i) => question(i));

// Un élève qui répond juste aux 5 premières, faux aux 5 suivantes.
const reponses: Record<number, string> = {};
for (let i = 0; i < 10; i += 1) reponses[i] = i < 5 ? "A" : "B";

let echecs = 0;
function verifier(nom: string, obtenu: unknown, attendu: unknown) {
  const ok = JSON.stringify(obtenu) === JSON.stringify(attendu);
  if (!ok) echecs += 1;
  console.log(
    `${ok ? "✅" : "❌"} ${nom} — obtenu ${JSON.stringify(obtenu)}${ok ? "" : `, attendu ${JSON.stringify(attendu)}`}`,
  );
}

const items = construireItems(questions, reponses);
verifier("un item par question", items.length, 10);
verifier("réussites comptées", items.filter((i) => i.reussi).length, 5);
verifier("réponses comptées", items.filter((i) => i.repondu).length, 10);
verifier("l'item porte son identifiant", items[0].itemId, "item-0");
verifier("le rang commence à 1", items[0].rang, 1);

// La clé accompagne l'itemId : un gabarit produit plusieurs énoncés sous un
// seul identifiant, et sans elle ils se confondraient dans les statistiques.
verifier("la clé est distincte de l'itemId", items[3].cle, "k3");

console.log("");

verifier(
  "passation sérieuse (10 questions, 120 s)",
  passationEligiblePanel(questions, reponses, 120).eligible,
  true,
);
verifier(
  "clic de vérification (10 questions, 8 s) écarté",
  passationEligiblePanel(questions, reponses, 8).eligible,
  false,
);
verifier(
  "épreuve abandonnée (3 réponses sur 10) écartée",
  passationEligiblePanel(questions, { 0: "A", 1: "A", 2: "B" }, 200).eligible,
  false,
);
verifier(
  "le seuil des 80 % est inclusif (8 réponses sur 10)",
  passationEligiblePanel(
    questions,
    Object.fromEntries(Array.from({ length: 8 }, (_, i) => [i, "A"])),
    200,
  ).eligible,
  true,
);

console.log("");
if (echecs > 0) {
  console.error(`${echecs} vérification(s) en échec.`);
  process.exit(1);
}
console.log("Toutes les vérifications passent.");
