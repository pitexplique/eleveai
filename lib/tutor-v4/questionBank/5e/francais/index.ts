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

// Banque du coach = gabarits générés (variété) + couche "fixed" imprimable
// (≥5 QCM fixes par notion). La couche "fixed" enrichit le coach ET sert de
// source aux tests du guide de survie (testDeSurvie ne garde que les "fixed").
export const francais5eQuestionBank: TutorBankItemV4[] = [
  ...buildCycle4FrancaisBank("5e", microSkills),
  ...francais5eFixedBank,
  ...complementsEtudeLangue5eBank,
  ...grammairePhrase5eBank,
  ...orthographeGrammaticale5eBank,
  ...conjugaison5eBank,
  ...cultureLitteraire5eBank,
  ...vocabulaireDiscours5eBank,
];

export function getFrancais5eQuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = francais5eQuestionBank;
  if (args?.notionId) bank = bank.filter((item) => item.notionId === args.notionId);
  if (args?.microId) bank = bank.filter((item) => item.microId === args.microId);
  return bank;
}
