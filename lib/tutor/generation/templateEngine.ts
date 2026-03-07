import type {
  BankItem,
  FixedQuestionDefinition,
  TemplateQuestionDefinition,
  TutorMode,
  TutorQuestion,
} from "@/lib/tutor/types";

function isTemplate(item: BankItem): item is TemplateQuestionDefinition {
  return item.kind === "template";
}

function isFixed(item: BankItem): item is FixedQuestionDefinition {
  return item.kind === "fixed";
}

export function materializeBankItem(args: {
  item: BankItem;
  mode: TutorMode;
}): TutorQuestion {
  const { item, mode } = args;

  if (isFixed(item)) {
    return {
      id: item.id,
      notionId: item.notionId,
      microId: item.microId,
      text: item.text,
      format: item.format,
      choices: item.choices,
      expected: item.expected,
      comparator: item.comparator,
      hint: mode === "coaching" ? item.hint : undefined,
    };
  }

  if (isTemplate(item)) {
    const generated = item.generate();

    return {
      id: `${item.id}_${Date.now()}`,
      notionId: item.notionId,
      microId: item.microId,
      text: generated.text,
      format: generated.format ?? "short",
      choices: generated.choices,
      expected: generated.expected,
      comparator: generated.comparator,
      hint: mode === "coaching" ? item.hint : undefined,
    };
  }

  throw new Error("BankItem non supporté.");
}