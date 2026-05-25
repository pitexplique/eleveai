import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

import { suitesBank } from "./suites";

export const mathsTerminaleSpeQuestionBank: TutorBankItemV4[] = [
  ...suitesBank,
];

export function getMathTerminaleSpeQuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = mathsTerminaleSpeQuestionBank;

  if (args?.notionId) {
    bank = bank.filter((item) => item.notionId === args.notionId);
  }

  if (args?.microId) {
    bank = bank.filter((item) => item.microId === args.microId);
  }

  return bank;
}