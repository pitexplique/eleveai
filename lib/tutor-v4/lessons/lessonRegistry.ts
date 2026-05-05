import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { pourcentagesBank } from "@/lib/tutor-v4/questionBank/6e/maths/pourcentages.bank";

export function getLessonBank(args: {
  classe: string;
  matiere: string;
  notionId: string;
}): TutorBankItemV4[] {
  const key = `${args.classe}:${args.matiere}:${args.notionId}`;

  switch (key) {
    case "6e:maths:pourcentages":
      return pourcentagesBank;

    default:
      return [];
  }
}