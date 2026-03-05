import type { Notion, StudentStyle, TutorMode, TutorQuestion } from "@/lib/tutor/types";

export function buildQuestion(notion: Notion, difficulty: number, style: StudentStyle, mode: TutorMode): TutorQuestion {
  const isQcm = style === "dys";

  if (notion.id === "fractions") {
    if (difficulty <= 2) {
      return {
        text: "Quelle fraction représente 1 part sur 4 parts égales ?",
        format: isQcm ? "qcm" : "short",
        choices: isQcm ? ["1/2", "1/4", "4/1"] : undefined,
        expected: isQcm ? "1/4" : "1/4",
        hint: "Le numérateur compte les parts prises.",
      };
    }
    return {
      text: "Compare 3/5 et 4/5 : lequel est le plus grand ?",
      format: "short",
      expected: "4/5",
      hint: "Même dénominateur : compare les numérateurs.",
    };
  }

  if (notion.id === "decimaux") {
    return {
      text: difficulty <= 2 ? "Quel nombre est le plus grand : 0,7 ou 0,65 ?" : "Écris en décimal : 7/10",
      format: "short",
      expected: difficulty <= 2 ? "0,7" : "0,7",
      hint: "Compare d'abord les dixièmes.",
    };
  }

  return {
    text: `Question courte sur ${notion.label} (niveau ${difficulty}). Donne une réponse très brève.`,
    format: "short",
    expected: "ok",
    hint: mode === "coaching" ? "Décris une première étape de raisonnement." : undefined,
  };
}
