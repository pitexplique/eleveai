import { mathsCpQuestionBank } from "@/lib/tutor-v4/questionBank/cp/maths";
import { mathsCe1QuestionBank } from "@/lib/tutor-v4/questionBank/ce1/maths";
import { mathsCe2QuestionBank } from "@/lib/tutor-v4/questionBank/ce2/maths";
import { mathsCm1QuestionBank } from "@/lib/tutor-v4/questionBank/cm1/maths";
import { mathsCm2QuestionBank } from "@/lib/tutor-v4/questionBank/cm2/maths";
import { maths6eQuestionBank } from "@/lib/tutor-v4/questionBank/6e/maths";
import { maths5eQuestionBank } from "@/lib/tutor-v4/questionBank/5e/maths";
import { maths4eQuestionBank } from "@/lib/tutor-v4/questionBank/4e/maths";
import { maths3eQuestionBank } from "@/lib/tutor-v4/questionBank/3e/maths";
import { mathsTerminaleSpeQuestionBank } from "@/lib/tutor-v4/questionBank/terminale-spe/maths";
import { mathsAdulteQuestionBank } from "@/lib/tutor-v4/questionBank/adulte/maths";
import { francaisCpQuestionBank } from "@/lib/tutor-v4/questionBank/cp/francais";
import { francaisCe1QuestionBank } from "@/lib/tutor-v4/questionBank/ce1/francais";
import { francaisCe2QuestionBank } from "@/lib/tutor-v4/questionBank/ce2/francais";
import { francaisCm1QuestionBank } from "@/lib/tutor-v4/questionBank/cm1/francais";
import { francaisCm2QuestionBank } from "@/lib/tutor-v4/questionBank/cm2/francais";
import { francais6eQuestionBank } from "@/lib/tutor-v4/questionBank/6e/francais";
import { francais5eQuestionBank } from "@/lib/tutor-v4/questionBank/5e/francais";
import { francais4eQuestionBank } from "@/lib/tutor-v4/questionBank/4e/francais";
import { francais3eQuestionBank } from "@/lib/tutor-v4/questionBank/3e/francais";
import { englishA1QuestionBank } from "@/lib/tutor-v4/questionBank/a1/english";
import { englishA2QuestionBank } from "@/lib/tutor-v4/questionBank/a2/english";
import { englishB1QuestionBank } from "@/lib/tutor-v4/questionBank/b1/english";
import { englishB2QuestionBank } from "@/lib/tutor-v4/questionBank/b2/english";
import { economie4eQuestionBank } from "@/lib/tutor-v4/questionBank/4e/economie";
import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

export async function loadQuestionBankV4(
  classe: string,
  matiere: string
): Promise<TutorBankItemV4[]> {

  if (classe === "cp" && matiere === "maths") {
    return mathsCpQuestionBank;
  }

  if (classe === "ce1" && matiere === "maths") {
    return mathsCe1QuestionBank;
  }

  if (classe === "ce2" && matiere === "maths") {
    return mathsCe2QuestionBank;
  }

    if (classe === "cm1" && matiere === "maths") {
    return mathsCm1QuestionBank;
  }

  if (classe === "cm2" && matiere === "maths") {
    return mathsCm2QuestionBank;
  }

  if (classe === "6e" && matiere === "maths") {
    return maths6eQuestionBank;
  }

  if (classe === "5e" && matiere === "maths") {
    return maths5eQuestionBank;
  }

  if (classe === "4e" && matiere === "maths") {
    return maths4eQuestionBank;
  }

  if (classe === "3e" && matiere === "maths") {
    return maths3eQuestionBank;
  }

  if (classe === "terminale-spe" && matiere === "maths") {
    return mathsTerminaleSpeQuestionBank;
  }

  if (classe === "adulte" && matiere === "maths") {
    return mathsAdulteQuestionBank;
  }

  if (classe === "cp"  && matiere === "francais") return francaisCpQuestionBank;
  if (classe === "ce1" && matiere === "francais") return francaisCe1QuestionBank;
  if (classe === "ce2" && matiere === "francais") return francaisCe2QuestionBank;
  if (classe === "cm1" && matiere === "francais") return francaisCm1QuestionBank;
  if (classe === "cm2" && matiere === "francais") return francaisCm2QuestionBank;
  if (classe === "6e" && matiere === "francais") return francais6eQuestionBank;
  if (classe === "5e" && matiere === "francais") return francais5eQuestionBank;
  if (classe === "4e" && matiere === "francais") return francais4eQuestionBank;
  if (classe === "3e" && matiere === "francais") return francais3eQuestionBank;

  if (classe === "a1" && matiere === "english-maths") return englishA1QuestionBank;
  if (classe === "a2" && matiere === "english-maths") return englishA2QuestionBank;
  if (classe === "b1" && matiere === "english-maths") return englishB1QuestionBank;
  if (classe === "b2" && matiere === "english-maths") return englishB2QuestionBank;

  if (classe === "4e" && matiere === "economie") return economie4eQuestionBank;

  throw new Error(`QuestionBank V4 introuvable pour ${classe}/${matiere}`);
}
