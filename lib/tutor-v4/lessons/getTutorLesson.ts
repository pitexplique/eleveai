import { getLessonBank } from "./lessonRegistry";
import { buildLessonFromBank } from "./buildLessonFromBank";

export function getTutorLesson(args: {
  classe: string;
  matiere: string;
  notionId: string;
  microId?: string | null;
  notionLabel?: string;
  microLabel?: string;
}) {
  const bank = getLessonBank({
    classe: args.classe,
    matiere: args.matiere,
    notionId: args.notionId,
    microId: args.microId,
  });

  return buildLessonFromBank({
    bank,
    classe: args.classe,
    notionId: args.notionId,
    microId: args.microId,
    notionLabel: args.notionLabel,
    microLabel: args.microLabel,
  });
}
