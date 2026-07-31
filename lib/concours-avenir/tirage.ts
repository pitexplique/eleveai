// Tirage d'une épreuve blanche du Concours Avenir.
//
// SERVEUR UNIQUEMENT : ce module importe les banques de questions Terminale,
// qui pèsent lourd. Ne jamais l'importer depuis un composant client — passer
// par /api/concours-avenir/epreuve.
//
// Le tirage est transversal (12 questions par section, comme le sujet réel),
// et non pas notion par notion comme dans le coach : c'est précisément ce qui
// fait la difficulté du concours — enchaîner des sujets sans transition.

import "server-only";

import { getMathTerminaleSpeQuestionBank } from "@/lib/tutor-v4/questionBank/terminale-spe/maths";
import type { TutorBankItemV4, TutorBankItemFixedV4 } from "@/lib/tutor-v4/types";
import {
  DIFFICULTE_MIN,
  SECTIONS,
  type EpreuveAvenir,
  type QuestionAvenir,
  type SectionAvenir,
} from "./config";

/**
 * Un item est utilisable tel quel dans l'épreuve s'il respecte le format
 * officiel : QCU à quatre propositions, une seule réponse correcte.
 * Les items « template » (générés à la volée) et les figures canvas sont
 * écartés : le sujet Avenir est un document imprimé, sans interactivité.
 */
function estEligible(item: TutorBankItemV4): item is TutorBankItemFixedV4 {
  if (item.kind !== "fixed") return false;
  if (item.format !== "qcm") return false;
  if (item.difficulty < DIFFICULTE_MIN) return false;
  if (item.canvas) return false;
  if (!item.choices || item.choices.length !== 4) return false;
  if (item.expected.length !== 1) return false;
  return item.choices.includes(item.expected[0]);
}

function melanger<T>(liste: T[]): T[] {
  const copie = [...liste];
  for (let i = copie.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

/** Vivier éligible d'une section, tous items confondus. */
function vivierSection(section: SectionAvenir): TutorBankItemFixedV4[] {
  return section.notions
    .flatMap((notionId) => getMathTerminaleSpeQuestionBank({ notionId }))
    .filter(estEligible);
}

/**
 * Convertit un item de banque en question d'épreuve.
 * Les propositions sont remélangées : dans nos banques la bonne réponse est
 * souvent en première position, ce qui donnerait un indice.
 */
function versQuestion(
  item: TutorBankItemFixedV4,
  section: SectionAvenir,
  numero: number
): QuestionAvenir {
  const propositions = melanger(item.choices ?? []);
  return {
    id: item.id,
    sectionId: section.id,
    numero,
    enonce: item.text,
    propositions,
    bonneReponse: propositions.indexOf(item.expected[0]),
    explication: item.explanation,
    notionId: item.notionId,
  };
}

/**
 * Tire une épreuve complète.
 *
 * @param dejaVus identifiants des questions déjà rencontrées par l'élève.
 *   Elles sont écartées en priorité, pour qu'une nouvelle épreuve soit
 *   réellement nouvelle. Si une section est épuisée, on recycle ses items
 *   (et `recyclee` passe à true) plutôt que de rendre une épreuve tronquée.
 */
export function tirerEpreuve(dejaVus: string[] = []): EpreuveAvenir {
  const vus = new Set(dejaVus);
  const questions: QuestionAvenir[] = [];
  let recyclee = false;

  for (const section of SECTIONS) {
    const vivier = vivierSection(section);
    const neufs = vivier.filter((item) => !vus.has(item.id));

    let choisis = melanger(neufs).slice(0, section.nbQuestions);

    if (choisis.length < section.nbQuestions) {
      // Vivier épuisé : on complète avec des questions déjà vues.
      recyclee = true;
      const complement = melanger(vivier.filter((item) => vus.has(item.id))).slice(
        0,
        section.nbQuestions - choisis.length
      );
      choisis = [...choisis, ...complement];
    }

    for (const item of choisis) {
      questions.push(versQuestion(item, section, questions.length + 1));
    }
  }

  // Les questions gardent l'ordre des sections (comme le sujet officiel :
  // l'élève doit pouvoir repérer d'un coup d'œil les parties qu'il maîtrise).
  return { questions, recyclee };
}

/** Taille du vivier par section — utilisé par la page pour être transparent. */
export function tailleVivier(): { total: number; parSection: Record<string, number> } {
  const parSection: Record<string, number> = {};
  let total = 0;
  for (const section of SECTIONS) {
    const n = vivierSection(section).length;
    parSection[section.id] = n;
    total += n;
  }
  return { total, parSection };
}
