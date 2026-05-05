import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type { TutorLesson } from "./types";

function unique(values: Array<string | undefined | null>) {
  return Array.from(
    new Set(
      values
        .filter((v): v is string => typeof v === "string" && v.trim().length > 0)
        .map((v) => v.trim())
    )
  );
}

function getGeneratedExplanation(item: TutorBankItemV4): string | undefined {
  if (item.kind !== "template") return item.explanation;

  try {
    const generated = item.generate();
    return generated.explanation;
  } catch {
    return undefined;
  }
}

export function buildLessonFromBank(args: {
  bank: TutorBankItemV4[];
  classe: string;
  notionId: string;
  microId?: string | null;
  notionLabel?: string;
  microLabel?: string;
}): TutorLesson | null {
  const filtered = args.bank.filter(
    (q) =>
      q.niveau === args.classe &&
      q.notionId === args.notionId &&
      (!args.microId || q.microId === args.microId)
  );

  if (filtered.length === 0) return null;

  const hints = unique(filtered.map((q) => q.hint)).slice(0, 5);

  const explanations = unique(
    filtered.map((q) => getGeneratedExplanation(q))
  ).slice(0, 6);

  return {
    title: `Leçon écrite — ${args.notionLabel ?? args.notionId}`,
    subtitle: args.microLabel ?? undefined,
    notionId: args.notionId,
    microId: args.microId,
    blocks: [
      {
        title: "À retenir",
        items: hints.length
          ? hints
          : ["Relis bien la question et repère la méthode."],
      },
      {
        title: "Exemples expliqués",
        items: explanations,
      },
    ],
  };
}