// scripts/generate-knowledge.ts
//
// À lancer depuis la racine du projet :
// npx tsx scripts/generate-knowledge.ts

import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

import { buildKnowledge6eMaths } from "../lib/tutor-v4/knowledge/maths/6e/buildKnowledge6e";
import { buildKnowledge5eMaths } from "../lib/tutor-v4/knowledge/maths/5e/buildKnowledge5e";
import { buildKnowledge4eMaths } from "../lib/tutor-v4/knowledge/maths/4e/buildKnowledge4e";
import { buildKnowledge3eMaths } from "../lib/tutor-v4/knowledge/maths/3e/buildKnowledge3e";

const packs = [
 // {
 //   classe: "6e",
 //   matiere: "maths",
 //   filename: "6e.maths.knowledge.json",
 //   build: buildKnowledge6eMaths,
 // },
 // {
 //   classe: "5e",
 //   matiere: "maths",
 //   filename: "5e.maths.knowledge.json",
 //   build: buildKnowledge5eMaths,
 // },
 // {
 //   classe: "4e",
 //   matiere: "maths",
 //   filename: "4e.maths.knowledge.json",
 //   build: buildKnowledge4eMaths,
 // },//
    {
    classe: "3e",
    matiere: "maths",
    filename: "3e.maths.knowledge.json",
    build: buildKnowledge3eMaths,
  },
];

for (const pack of packs) {
  const knowledge = pack.build();

    const outputDir = join(
      process.cwd(),
      "app",
      "lib",
      "tutor-v4",
      "knowledge",
      pack.matiere
    );
  mkdirSync(outputDir, { recursive: true });

  const outputPath = join(outputDir, pack.filename);

  writeFileSync(outputPath, JSON.stringify(knowledge, null, 2), "utf-8");

  console.log(`✅ JSON généré : ${outputPath}`);
}