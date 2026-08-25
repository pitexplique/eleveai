import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/4e/microSkills";
import { buildCycle4FrancaisBank } from "@/lib/tutor-v4/questionBank/cycle4/francais/buildCycle4FrancaisBank";
import { francais4eFixedBank } from "@/lib/tutor-v4/questionBank/4e/francais/fixed.bank";
// Enrichissement des pools d'étude de la langue (01/08) : le builder cycle 4
// ne produisait que 7 énoncés par micro-compétence, contre 32 en cycle 3.
import { complementsEtudeLangue4eBank } from "@/lib/tutor-v4/questionBank/4e/francais/complements-etude-langue.bank";
// « Fonctionnement de la phrase complexe » : section entière du programme de
// cycle 4 encore en vigueur pour la 4e, et la notion n'existait pas.
import { phraseComplexe4eBank } from "@/lib/tutor-v4/questionBank/4e/francais/phrase-complexe.bank";
// Les chaines d'accord que le programme énumère, et qu'aucune notion ne portait.
import { orthographeGrammaticale4eBank } from "@/lib/tutor-v4/questionBank/4e/francais/orthographe-grammaticale.bank";
// ⚠️ Dans le programme de la 4e, le conditionnel est un MODE — l'inverse de la
// 5e. Voir l'en-tête du fichier : les deux banques ont raison chacune pour sa
// classe, il ne faut pas les « harmoniser ».
import { conjugaison4eBank } from "@/lib/tutor-v4/questionBank/4e/francais/conjugaison.bank";
// « Lire des textes non littéraires, des images et des documents composites » :
// une compétence travaillée ENTIÈRE du programme, qui n'existait nulle part.
import { documentsComposites4eBank } from "@/lib/tutor-v4/questionBank/4e/francais/documents-composites.bank";
// « Enrichir et structurer le lexique » : sept attendus, cinq micros génériques.
import { vocabulaire4eBank } from "@/lib/tutor-v4/questionBank/4e/francais/vocabulaire.bank";
// Les quatre questionnements de 4e, plus le complémentaire. La 4e était la
// seule classe du collège sans aucune entrée littéraire nommée.
import { cultureLitteraire4eBank } from "@/lib/tutor-v4/questionBank/4e/francais/culture-litteraire.bank";
/* ⛔ LES CINQ NOTIONS TRANSVERSALES, RESTÉES SUR LE SEUL GÉNÉRATEUR (25/08/2026).
   Mesuré avec `verifier-variete.mjs` : dix-huit micros sur 68 servaient moins de
   dix énoncés distincts — le seuil de Frédéric, « un élève ne doit pas retomber
   sur la même question en dix minutes ». Elles n'étaient pas dispersées : c'était
   exactement `lecture_comprehension`, `lecture_voix_haute`, `culture_litteraire`,
   `ecriture` et `oral`, les cinq notions à qui aucune banque dédiée n'avait été
   écrite depuis le 12/08. Signature : « 4 items, dont 1 fixe ». */
import { lectureCulture4eBank } from "@/lib/tutor-v4/questionBank/4e/francais/lecture-culture.bank";
import { ecritureOral4eBank } from "@/lib/tutor-v4/questionBank/4e/francais/ecriture-oral.bank";

/**
 * ⭐ LA NOTION D'UN ITEM SE DÉDUIT DE SA MICRO (24/08/2026).
 *
 * Le 24/08, les onze notions du cycle 4 ont été découpées en dix-neuf (règle de
 * Frédéric : cinq micros par notion au maximum ; `vocabulaire` en portait onze).
 * Or le `notionId` est RECOPIÉ À LA MAIN dans les items des banques ci-dessus.
 * Les mettre à jour un par un, c'était garantir qu'un oubli reste : un item dont
 * la notion n'existe plus n'échoue pas, il disparaît du coach, en silence.
 *
 * On le déduit donc du `microId`, qui est la vraie clé et qui n'a pas bougé.
 * `microSkills` reste la source de vérité unique, et il n'y a plus qu'un seul
 * endroit à corriger au prochain découpage.
 */
const NOTION_PAR_MICRO = new Map(microSkills.map((micro) => [micro.id, micro.notionId]));

function recalerNotions(items: TutorBankItemV4[]): TutorBankItemV4[] {
  return items.map((item) => {
    const notionId = NOTION_PAR_MICRO.get(item.microId);
    return notionId && notionId !== item.notionId ? { ...item, notionId } : item;
  });
}

// Banque du coach = gabarits générés (variété) + couche "fixed" imprimable
// (≥5 QCM fixes par notion). La couche "fixed" enrichit le coach ET sert de
// source aux tests du guide de survie (testDeSurvie ne garde que les "fixed").
export const francais4eQuestionBank: TutorBankItemV4[] = recalerNotions([
  ...buildCycle4FrancaisBank("4e", microSkills),
  ...francais4eFixedBank,
  ...complementsEtudeLangue4eBank,
  ...phraseComplexe4eBank,
  ...orthographeGrammaticale4eBank,
  ...conjugaison4eBank,
  ...documentsComposites4eBank,
  ...vocabulaire4eBank,
  ...cultureLitteraire4eBank,
  ...lectureCulture4eBank,
  ...ecritureOral4eBank,
]);

export function getFrancais4eQuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = francais4eQuestionBank;
  if (args?.notionId) bank = bank.filter((item) => item.notionId === args.notionId);
  if (args?.microId) bank = bank.filter((item) => item.microId === args.microId);
  return bank;
}
