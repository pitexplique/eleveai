import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

import { digitsA1EsBank }    from "./digits.bank";
import { numbersA1EsBank }   from "./numbers.bank";
import { operationsA1EsBank }from "./operations.bank";
import { shapesA1EsBank }    from "./shapes.bank";
import { colorsA1EsBank }    from "./colors.bank";
import { familyA1EsBank }    from "./family.bank";
import { schoolA1EsBank }    from "./school.bank";
import { bodyA1EsBank }      from "./body.bank";
import { foodA1EsBank }      from "./food.bank";
import { animalsA1EsBank }   from "./animals.bank";
import { clothesA1EsBank }   from "./clothes.bank";
import { houseA1EsBank }     from "./house.bank";
import { daysA1EsBank }      from "./days.bank";
import { greetingsA1EsBank } from "./greetings.bank";

export const espagnolA1QuestionBank: TutorBankItemV4[] = [
  ...digitsA1EsBank,
  ...numbersA1EsBank,
  ...operationsA1EsBank,
  ...shapesA1EsBank,
  ...colorsA1EsBank,
  ...familyA1EsBank,
  ...schoolA1EsBank,
  ...bodyA1EsBank,
  ...foodA1EsBank,
  ...animalsA1EsBank,
  ...clothesA1EsBank,
  ...houseA1EsBank,
  ...daysA1EsBank,
  ...greetingsA1EsBank,
];

export function getEspagnolA1QuestionBank(args?: {
  notionId?: string | null;
  microId?: string | null;
}): TutorBankItemV4[] {
  let bank = espagnolA1QuestionBank;
  if (args?.notionId) bank = bank.filter((item) => item.notionId === args.notionId);
  if (args?.microId)  bank = bank.filter((item) => item.microId  === args.microId);
  return bank;
}
