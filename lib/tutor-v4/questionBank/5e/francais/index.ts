import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/5e/microSkills";
import { buildCycle4FrancaisBank } from "@/lib/tutor-v4/questionBank/cycle4/francais/buildCycle4FrancaisBank";
import { francais5eFixedBank } from "@/lib/tutor-v4/questionBank/5e/francais/fixed.bank";
// Enrichissement des pools d'étude de la langue (01/08) : le builder cycle 4
// ne produisait que 7 énoncés par micro-compétence, contre 32 en cycle 3, et
// ce sont ces notions qui alimentent 15 des 20 questions de l'épreuve blanche.
import { complementsEtudeLangue5eBank } from "@/lib/tutor-v4/questionBank/5e/francais/complements-etude-langue.bank";
// La 5e passe au NOUVEAU programme (BO n° 10 du 5 mars 2026) à la rentrée 2026.
// Douze micro-compétences de grammaire ouvertes avec leur banque écrite — le
// builder cycle 4 aiguille par sous-chaîne et n'aurait servi que du générique.
import { grammairePhrase5eBank } from "@/lib/tutor-v4/questionBank/5e/francais/grammaire-phrase.bank";
// La chaîne anaphorique : « maîtriser la chaine anaphorique et l'emploi des
// pronoms représentants » est le point le plus bas des résultats mesurés
// (19 %, 24 %, 43 % sur six items). Le coach savait identifier un pronom, pas
// dire ce qu'il reprend.
import { anaphore5eBank } from "@/lib/tutor-v4/questionBank/5e/francais/anaphore.bank";
// « Savoir accorder les mots dans la phrase et expliquer ses choix » : objectif
// à part entière du BO, cinq attendus, qui tenait dans UNE micro-compétence.
import { orthographeGrammaticale5eBank } from "@/lib/tutor-v4/questionBank/5e/francais/orthographe-grammaticale.bank";
// « Approfondir sa maitrise des formes conjuguées du verbe et leur emploi » :
// deux objectifs, six attendus, qui tenaient dans trois micros génériques.
import { conjugaison5eBank } from "@/lib/tutor-v4/questionBank/5e/francais/conjugaison.bank";
// Les QUATRE entrées de culture littéraire que le BO nomme, sous la perspective
// annuelle « Éprouver, expérimenter ». Aucune n'existait.
import { cultureLitteraire5eBank } from "@/lib/tutor-v4/questionBank/5e/francais/culture-litteraire.bank";
// Vocabulaire (étymologie, néologisme, dérivation, dictionnaire) et paroles
// rapportées : seize attendus du BO, cinq micros génériques dans le coach.
import { vocabulaireDiscours5eBank } from "@/lib/tutor-v4/questionBank/5e/francais/vocabulaire-discours.bank";
// ⛔⛔ LES TRENTE-QUATRE MICROS DE SOCLE (25/08/2026). Frédéric : « il faut des
// générateurs, un élève doit pouvoir rester sans les mêmes questions pendant des
// minutes. » Les micros du NOUVEAU BO ont leurs banques ci-dessus et se portent
// bien ; les micros de SOCLE, héritées de la fabrique du cycle 4, vivaient du
// seul `buildCycle4FrancaisBank` — cinq à onze énoncés générés chacune, partagés
// avec la 4e et la 3e, et le tout maquillé par sept à huit questions figées.
// ⚠️ `verifier-variete.mjs` ADDITIONNE le figé et le généré : elles étaient donc
// toutes au vert. Le contrôle qui les voit est `verifier-renouvellement.ts`.
import { socleLectureCulture5eBank } from "@/lib/tutor-v4/questionBank/5e/francais/socle-lecture-culture.bank";
import { socleEcritureOral5eBank } from "@/lib/tutor-v4/questionBank/5e/francais/socle-ecriture-oral.bank";
import { socleGrammaireConjugaison5eBank } from "@/lib/tutor-v4/questionBank/5e/francais/socle-grammaire-conjugaison.bank";
import { socleLexiqueDiscours5eBank } from "@/lib/tutor-v4/questionBank/5e/francais/socle-lexique-discours.bank";
// Les attendus nommés des quatre objectifs de Lecture : contrôler sa
// compréhension, fonder son jugement, les outils d'analyse, le parcours d'un
// personnage, les langages, le contexte, les repères d'histoire littéraire.
import { lecture5eBank } from "@/lib/tutor-v4/questionBank/5e/francais/lecture.bank";
// Écriture et oral : la méthode, seule part qu'un QCM puisse tenir de deux
// domaines qui sont des productions.
import { ecritureOral5eBank } from "@/lib/tutor-v4/questionBank/5e/francais/ecriture-oral.bank";

/**
 * ⭐ LA NOTION D'UN ITEM SE DÉDUIT DE SA MICRO (24/08/2026).
 *
 * Le 24/08, les dix notions de la 5e ont été découpées en vingt-neuf (règle de
 * Frédéric : « 3-4 micros par notion, 5 au maximum » ; `grammaire_phrase` en
 * portait dix-neuf). Or le `notionId` était RECOPIÉ À LA MAIN dans chaque item
 * des onze banques ci-dessus — soixante endroits pour la seule 5e. Les mettre à
 * jour un par un, c'était garantir qu'un oubli reste : un item dont la notion
 * n'existe plus n'échoue pas, il disparaît simplement du coach, en silence.
 *
 * On le déduit donc du `microId`, qui est la vraie clé et qui n'a pas bougé.
 * `microSkills` reste la source de vérité unique, et il n'y a plus qu'un seul
 * endroit à corriger le jour d'un prochain découpage.
 *
 * ⚠️ Un item dont la micro n'est pas au programme garde son `notionId` d'origine
 * plutôt que d'être jeté : c'est visible dans `scripts/auditer-banque-runtime.ts`,
 * alors qu'un item silencieusement écarté ne l'est pas.
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
export const francais5eQuestionBank: TutorBankItemV4[] = recalerNotions([
  ...buildCycle4FrancaisBank("5e", microSkills),
  ...francais5eFixedBank,
  ...complementsEtudeLangue5eBank,
  ...grammairePhrase5eBank,
  ...anaphore5eBank,
  ...orthographeGrammaticale5eBank,
  ...conjugaison5eBank,
  ...cultureLitteraire5eBank,
  ...vocabulaireDiscours5eBank,
  ...lecture5eBank,
  ...ecritureOral5eBank,
  ...socleLectureCulture5eBank,
  ...socleEcritureOral5eBank,
  ...socleGrammaireConjugaison5eBank,
  ...socleLexiqueDiscours5eBank,
]);

export function getFrancais5eQuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = francais5eQuestionBank;
  if (args?.notionId) bank = bank.filter((item) => item.notionId === args.notionId);
  if (args?.microId) bank = bank.filter((item) => item.microId === args.microId);
  return bank;
}
