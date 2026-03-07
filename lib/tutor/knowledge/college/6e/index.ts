import type { BankItem, TutorMode, TutorQuestion } from "@/lib/tutor/types";
import { materializeBankItem } from "@/lib/tutor/generation/templateEngine";
import { decimauxBank } from "./decimaux.bank";
import { fractionsBank } from "./fractions.bank";
import { proportionnaliteBank } from "./proportionnalite.bank";
import { perimetreBank } from "./perimetre.bank";
import { airesBank } from "./aires.bank";
import { anglesBank } from "./angles.bank";

export const bank6eMaths: BankItem[] = [
  ...decimauxBank,
  ...fractionsBank,
  ...proportionnaliteBank,
  ...perimetreBank,
  ...airesBank,
  ...anglesBank,
];

export function buildQuestionFromBank(args: {
  questions: BankItem[];
  notionId: string;
  microId: string;
  difficulty: number;
  style: "dys" | "middle" | "challenge";
  mode: TutorMode;
  recentQuestionIds: string[];
}): TutorQuestion {
  let candidates = args.questions.filter(
    (q) => q.notionId === args.notionId && q.microId === args.microId
  );

  if (candidates.length === 0) {
    candidates = args.questions.filter((q) => q.microId === args.microId);
  }

  if (candidates.length === 0) {
    candidates = args.questions;
  }

  const fixedFirst = candidates.sort((a, b) => {
    if (a.kind === "fixed" && b.kind === "template") return -1;
    if (a.kind === "template" && b.kind === "fixed") return 1;
    return 0;
  });

  const notRecentlyUsed = fixedFirst.filter((q) => !args.recentQuestionIds.includes(q.id));
  const pool = notRecentlyUsed.length > 0 ? notRecentlyUsed : fixedFirst;
  const picked = pool[0];

  const materialized = materializeBankItem({
    item: picked,
    mode: args.mode,
  });

  if (args.style === "dys" && materialized.format === "short" && !materialized.choices) {
    return {
      ...materialized,
      format: "qcm",
      choices: [materialized.expected[0], "Autre réponse 1", "Autre réponse 2"],
    };
  }

  return materialized;
}