// Compte les exercices de maths du coach (CP → Tle) pour l'accueil (16/11/2026).
//   npx --yes tsx@4 scripts/compter-exercices-accueil.ts
// ⭐ À relancer CHAQUE SEMAINE, en même temps que le relevé Vercel des visiteurs
// (lib/accueil/chiffres-semaine.ts). Écrit lib/accueil/exercices.json.
// Pourquoi un JSON et pas un calcul dans la page : les banques de questions
// pèsent des mégaoctets, l'accueil n'a pas à les charger pour un seul nombre.
import fs from "node:fs";
import { loadQuestionBankV4 } from "@/lib/tutor-v4/loaders/loadQuestionBankV4";

const CLASSES = ["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "premiere-spe", "terminale-spe", "stmg"];

(async () => {
  let exercices = 0;
  let gabarits = 0;
  for (const c of CLASSES) {
    const banque = await loadQuestionBankV4(c, "maths");
    exercices += banque.length;
    gabarits += banque.filter((i) => (i as { kind?: string }).kind === "template").length;
  }
  const sortie = { exercices, gabarits, compteLe: new Date().toISOString().slice(0, 10) };
  fs.writeFileSync("lib/accueil/exercices.json", JSON.stringify(sortie, null, 2) + "\n");
  console.log(sortie);
})();
