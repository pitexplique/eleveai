import { buildQuestionPair } from "./lib/tutor-v4/questionPairBuilder.ts";

function makeTemplate(id: string, difficulty: number) {
  return {
    kind: "template" as const,
    id,
    niveau: "cp",
    matiere: "francais",
    notionId: "n1",
    microId: "m1",
    difficulty,
    theme: "neutral",
    hint: "indice",
    tags: ["cp", "n1", "m1", "template"],
    generate: () => ({
      text: `Question issue de ${id}`,
      format: "qcm",
      choices: ["oui", "non"],
      expected: ["oui"],
      comparator: "mcq_exact",
      explanation: "exp",
    }),
  };
}

// extrait l'id du gabarit depuis un id généré « base_173..._4521 »
function baseId(generatedId: string) {
  return generatedId.replace(/_\d{10,}_\d+$/, "");
}

function simulate(bankSize: number, tours: number) {
  const bank = Array.from({ length: bankSize }, (_, i) =>
    makeTemplate(`cp_m1_fr_tpl_${i + 1}`, (i % 3) + 1)
  );

  let recent: string[] = [];
  let previousBases: string[] = [];
  let previousMostRecentBase: string | null = null;
  const violations: string[] = [];

  for (let tour = 0; tour < tours; tour++) {
    const pair = (buildQuestionPair as any)({
      bank,
      notionId: "n1",
      microId: "m1",
      recommendedStar: 2,
      recentQuestionIds: recent,
    });

    const bases = [baseId(pair.optionA.id), baseId(pair.optionB.id)];

    if (bankSize >= 6 && previousBases.some((b) => bases.includes(b))) {
      violations.push(
        `tour ${tour}: chevauchement avec le tour précédent (${bases.join(", ")})`
      );
    }
    if (previousMostRecentBase && bases.includes(previousMostRecentBase)) {
      violations.push(
        `tour ${tour}: le gabarit le plus récent (${previousMostRecentBase}) est reposé immédiatement`
      );
    }

    previousBases = bases;
    // optionB est le dernier id empilé par le moteur → le plus récent
    previousMostRecentBase = baseId(pair.optionB.id);
    // mime tutorEngineV4 : on garde les 8 derniers + les 2 de la paire
    recent = [...recent.slice(-8), pair.optionA.id, pair.optionB.id];
  }
  return violations;
}

const v3 = simulate(3, 20);
const v6 = simulate(6, 20);

console.log(`Banque de 3 gabarits (cas cycle2 réel) : ${v3.length === 0 ? "OK, jamais de répétition immédiate" : v3.join("\n")}`);
console.log(`Banque de 6 gabarits : ${v6.length === 0 ? "OK, aucun chevauchement entre tours consécutifs" : v6.join("\n")}`);
process.exit(v3.length + v6.length === 0 ? 0 : 1);
