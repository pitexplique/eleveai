import type { AuditEntry, TutorMode, TutorSession } from "@/lib/tutor/types";

const EMAIL_REGEX = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const PHONE_REGEX = /(?:\+33|0)\s*[1-9](?:[ .-]?\d{2}){4}/g;

export function sanitizeText(text: string) {
  return text.replace(EMAIL_REGEX, "[email-masqué]").replace(PHONE_REGEX, "[tel-masqué]");
}

export function guardFeedback(feedback: string, mode: TutorMode) {
  let result = sanitizeText(feedback);
  const flags: string[] = [];

  if (mode === "evaluation" && /la bonne réponse est|solution est|réponse correcte/i.test(result)) {
    flags.push("anti_solution_triggered");
    result = "Bonne tentative. Explique ton raisonnement en une étape, je te guide sans donner la réponse finale.";
  }

  if (!result.trim()) {
    result = "Merci pour ta réponse. On continue étape par étape.";
  }

  return { text: result, flags };
}

export function appendAudit(session: TutorSession, entry: AuditEntry) {
  session.audit.push(entry);
}