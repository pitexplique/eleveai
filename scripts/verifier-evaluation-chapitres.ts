// UN CHAPITRE DOIT TENIR UNE ÉVALUATION ENTIÈRE.
//
// ⭐ POURQUOI CE SCRIPT (29/09/2026). L'évaluation de maths (/parcours) se fait
// désormais par chapitres : un prof coche « Théorème de Pythagore » en 3e et
// lance un Marathon de 20 questions. Frédéric : « si sur une notion il n'y a
// pas assez de questions, tu rends le coach plus robuste. Ça sert aussi à ça. »
//
// On mesure donc EXACTEMENT ce que tire la page : `getDefiQuestionForNotion`,
// par notion, dans les deux modes (Révision = difficultés 1→3, Défi = 3→5).
// La clé d'une question est celle de la page : énoncé + réponse attendue +
// propositions TRIÉES (un mélange n'est pas une question neuve).
//
// Seuil par défaut : 20, le Marathon sur un seul chapitre.
//
// Usage :
//   npx --yes tsx@4 scripts/verifier-evaluation-chapitres.ts            (toutes les classes)
//   npx --yes tsx@4 scripts/verifier-evaluation-chapitres.ts 3e         (une classe)
//   npx --yes tsx@4 scripts/verifier-evaluation-chapitres.ts 3e 20 defi (seuil, mode)

import { getClasseNotions } from "@/lib/parcours/getClasseNotions";
import {
  getDefiQuestionForNotion,
  type ParcoursDifficulteMode,
} from "@/lib/parcours/getDefiQuestionForNotion";
import { cleQuestionParcours } from "@/lib/parcours/cleQuestion";
import type { ParcoursClasse } from "@/lib/parcours/types";

const TOUTES: ParcoursClasse[] = [
  "cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e",
  "seconde", "premiere-spe", "terminale-spe", "stmg",
];

const arg = process.argv[2];
const CLASSES = arg && arg !== "toutes" ? [arg as ParcoursClasse] : TOUTES;
const SEUIL = Number(process.argv[3] ?? 20);
const MODES: ParcoursDifficulteMode[] = process.argv[4]
  ? [process.argv[4] as ParcoursDifficulteMode]
  : ["revision", "defi"];
/** Tirages par notion et par mode : de quoi épuiser une banque de 200 énoncés. */
const TIRAGES = 1500;

let enDessous = 0;
let total = 0;

for (const classe of CLASSES) {
  const notions = getClasseNotions(classe);
  const lignes: string[] = [];
  for (const notion of notions) {
    const mesures = MODES.map((mode) => {
      const vues = new Set<string>();
      for (let t = 0; t < TIRAGES; t++) {
        const q = getDefiQuestionForNotion({ classe, notionId: notion.id, mode });
        if (!q) break;
        vues.add(cleQuestionParcours(q.question));
      }
      return vues.size;
    });
    total += 1;
    if (mesures.some((m) => m < SEUIL)) {
      enDessous += 1;
      lignes.push(
        `  ${notion.id.padEnd(46)} ${MODES.map((m, i) => `${m}=${String(mesures[i]).padStart(4)}`).join("  ")}   ${notion.label}`
      );
    }
  }
  console.log(`\n${classe} — ${notions.length} notions, ${lignes.length} sous ${SEUIL}`);
  for (const l of lignes) console.log(l);
}

console.log(`\nBILAN : ${enDessous} / ${total} notions sous ${SEUIL} questions distinctes dans au moins un mode.`);
process.exit(enDessous > 0 ? 1 : 0);
