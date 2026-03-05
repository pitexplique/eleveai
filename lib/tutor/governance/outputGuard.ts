import type { TutorMode } from "@/lib/tutor/types";

const EMAIL_REGEX = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const PHONE_REGEX = /(?:\+33|0)\s*[1-9](?:[ .-]?\d{2}){4}/g;

export function sanitizeText(text: string) {
  return text.replace(EMAIL_REGEX, "[email-masqué]").replace(PHONE_REGEX, "[tel-masqué]");
}

export function guardFeedback(feedback: string, mode: TutorMode) {
  let result = sanitizeText(feedback);
  const flags: string[] = [];

  if (mode === "evaluation" && /la bonne réponse est|réponse correcte est|solution est/i.test(result)) {
    flags.push("anti_solution_triggered");
    result = "Bonne tentative. Explique ton raisonnement en une étape, je te guide sans donner la réponse finale.";
  }

  if (result !== feedback) {
    flags.push("personal_data_filtered");
  }

  if (!result.trim()) {
    result = "Merci pour ta réponse. On continue étape par étape.";
  }

  return { text: result, flags };
}
