import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type { ParcoursClasse, ParcoursQuestion, ParcoursQuestionItem } from "./types";
import type { ParcoursDifficulteMode } from "./getDefiQuestionForNotion";
import { getFrancaisNotions, type ParcoursClasseFrancais } from "./getFrancaisNotions";

import { francaisCpQuestionBank } from "@/lib/tutor-v4/questionBank/cp/francais";
import { francaisCe1QuestionBank } from "@/lib/tutor-v4/questionBank/ce1/francais";
import { francaisCe2QuestionBank } from "@/lib/tutor-v4/questionBank/ce2/francais";
import { francaisCm1QuestionBank } from "@/lib/tutor-v4/questionBank/cm1/francais";
import { francaisCm2QuestionBank } from "@/lib/tutor-v4/questionBank/cm2/francais";
import { francais6eQuestionBank } from "@/lib/tutor-v4/questionBank/6e/francais";
import { francais5eQuestionBank } from "@/lib/tutor-v4/questionBank/5e/francais";
import { francais4eQuestionBank } from "@/lib/tutor-v4/questionBank/4e/francais";
import { francais3eQuestionBank } from "@/lib/tutor-v4/questionBank/3e/francais";

function getBank(classe: ParcoursClasseFrancais): TutorBankItemV4[] {
  switch (classe) {
    case "cp": return francaisCpQuestionBank;
    case "ce1": return francaisCe1QuestionBank;
    case "ce2": return francaisCe2QuestionBank;
    case "cm1": return francaisCm1QuestionBank;
    case "cm2": return francaisCm2QuestionBank;
    case "6e": return francais6eQuestionBank;
    case "5e": return francais5eQuestionBank;
    case "4e": return francais4eQuestionBank;
    case "3e": return francais3eQuestionBank;
  }
}

// Dans les banques, la bonne réponse est souvent en première position :
// on mélange une copie des choix pour ne pas la trahir (sans muter la banque).
function shuffleChoices(choices: readonly string[]): string[] {
  const arr = [...choices];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Les banques français sont entièrement constituées de templates
// (kind: "template" avec generate()) : on les matérialise comme le fait
// le parcours maths (getDefiQuestionForNotion).
function materializeQuestion(
  item: TutorBankItemV4
): ParcoursQuestionItem | null {
  let question: ParcoursQuestionItem;

  if (item.kind === "template") {
    const generated = item.generate();

    question = {
      ...item,
      ...generated,
      kind: "fixed",
    } as ParcoursQuestionItem;
  } else {
    question = item as ParcoursQuestionItem;
  }

  if (question.choices && question.choices.length > 1) {
    question = { ...question, choices: shuffleChoices(question.choices) };
  }

  return question;
}

export function getDefiQuestionsForFrancais(
  classe: ParcoursClasseFrancais,
  count: number,
  mode: ParcoursDifficulteMode = "revision"
): ParcoursQuestion[] {
  const notions = getFrancaisNotions(classe);
  const bank = getBank(classe);
  const questions: ParcoursQuestion[] = [];

  // Révision = difficultés 1→3 (consolider), Défi = 3→5 (se dépasser).
  const minDiff = mode === "defi" ? 3 : 1;
  const maxDiff = mode === "defi" ? 5 : 3;

  for (const notion of notions) {
    const candidates = bank.filter(
      (item) =>
        item.notionId === notion.id &&
        (item.kind === "template" || item.format !== "open")
    );

    // On privilégie les items dans la plage de difficulté demandée ; si une
    // notion n'en a pas, on retombe sur tous ses items pour rester complet.
    const inRange = candidates.filter(
      (item) =>
        typeof item.difficulty === "number" &&
        item.difficulty >= minDiff &&
        item.difficulty <= maxDiff
    );

    const items = (inRange.length > 0 ? inRange : candidates).sort(
      () => Math.random() - 0.5
    );

    const item = items[0];
    if (!item) continue;

    const question = materializeQuestion(item);
    if (!question?.expected || !question.text) continue;

    questions.push({
      classe: classe as ParcoursClasse,
      notionId: notion.id,
      notionLabel: notion.label,
      question,
    });
  }

  return questions.sort(() => Math.random() - 0.5).slice(0, count);
}
