import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/3e/microSkills";
import { buildCycle4FrancaisBank } from "@/lib/tutor-v4/questionBank/cycle4/francais/buildCycle4FrancaisBank";
import { francais3eFixedBank } from "@/lib/tutor-v4/questionBank/3e/francais/fixed.bank";
// Enrichissement des pools d'étude de la langue (01/08) : le builder cycle 4
// ne produisait que 7 énoncés par micro-compétence, contre 32 en cycle 3.
import { complementsEtudeLangue3eBank } from "@/lib/tutor-v4/questionBank/3e/francais/complements-etude-langue.bank";
// « Fonctionnement de la phrase complexe » : section entière du programme de
// cycle 4 encore en vigueur pour la 3e, et la notion n'existait pas — alors que
// le CM2 et la 6e en ont une.
import { phraseComplexe3eBank } from "@/lib/tutor-v4/questionBank/3e/francais/phrase-complexe.bank";
// Les chaines d'accord que le programme énumère, et qu'aucune notion ne portait.
import { orthographeGrammaticale3eBank } from "@/lib/tutor-v4/questionBank/3e/francais/orthographe-grammaticale.bank";
// ⚠️ Dans le programme de la 3e, le conditionnel est un MODE — l'inverse de la
// 5e. Voir l'en-tête du fichier : les deux banques ont raison chacune pour sa
// classe, il ne faut pas les « harmoniser ».
import { conjugaison3eBank } from "@/lib/tutor-v4/questionBank/3e/francais/conjugaison.bank";
// « Lire des textes non littéraires, des images et des documents composites » :
// une compétence travaillée ENTIÈRE, qui n'existait nulle part. En 3e, le
// programme insiste sur l'argumentation, dans la presse et dans l'image.
import { argumentationPresse3eBank } from "@/lib/tutor-v4/questionBank/3e/francais/argumentation-presse.bank";
// « Enrichir et structurer le lexique » : sept attendus, cinq micros génériques.
import { vocabulaire3eBank } from "@/lib/tutor-v4/questionBank/3e/francais/vocabulaire.bank";
// Les quatre questionnements de 3e que le programme nomme, plus le
// complémentaire. ⚠️ Ils ont trois ans de vie devant eux, jusqu'en 2028.
import { cultureLitteraire3eBank } from "@/lib/tutor-v4/questionBank/3e/francais/culture-litteraire.bank";
// ⛔ LES CINQ NOTIONS TRANSVERSALES (25/08/2026). `lecture_comprehension`,
// `lecture_voix_haute`, `culture_litteraire`, `ecriture` et `oral` n'avaient
// jamais eu de banque dédiée : leurs dix-huit micros vivaient du seul
// `buildCycle4FrancaisBank`, dont les pools font cinq ou six énoncés PARTAGÉS
// par les trois niveaux du cycle. Mesuré : dix-huit micros sous le seuil de dix
// énoncés, signature « 4 items, dont 1 fixe ». Les deux banques ci-dessous les
// remontent, un gabarit par micro sur une table de quinze cas.
// ⛔ Elles ne recopient pas la 4e : mêmes micros, cas de niveau terminal —
// argumentation, thèse et arguments, ironie, modalisateurs, concordance.
import { lectureCulture3eBank } from "@/lib/tutor-v4/questionBank/3e/francais/lecture-culture.bank";
import { ecritureOral3eBank } from "@/lib/tutor-v4/questionBank/3e/francais/ecriture-oral.bank";

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
export const francais3eQuestionBank: TutorBankItemV4[] = recalerNotions([
  ...buildCycle4FrancaisBank("3e", microSkills),
  ...francais3eFixedBank,
  ...complementsEtudeLangue3eBank,
  ...phraseComplexe3eBank,
  ...orthographeGrammaticale3eBank,
  ...conjugaison3eBank,
  ...argumentationPresse3eBank,
  ...vocabulaire3eBank,
  ...cultureLitteraire3eBank,
  ...lectureCulture3eBank,
  ...ecritureOral3eBank,
]);

export function getFrancais3eQuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = francais3eQuestionBank;
  if (args?.notionId) bank = bank.filter((item) => item.notionId === args.notionId);
  if (args?.microId) bank = bank.filter((item) => item.microId === args.microId);
  return bank;
}
