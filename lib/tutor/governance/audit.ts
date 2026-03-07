import type { AuditEntry, TutorMode, TutorSession } from "@/lib/tutor/types";

const solutionPatterns = [/la bonne réponse est/i, /réponse\s*:\s*/i, /il faut écrire/i];

export function sanitizeText(text: string): string {
  return text
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[email-masked]")
    .replace(/(?:\+33|0)\s*[1-9](?:[\s.-]*\d{2}){4}/g, "[phone-masked]");
}

export function guardFeedback(text: string, mode: TutorMode): { text: string; flags: string[] } {
  const sanitized = sanitizeText(text);
  const flags: string[] = [];

  if (mode === "evaluation" && solutionPatterns.some((pattern) => pattern.test(sanitized))) {
    flags.push("solution_blocked_in_evaluation");
    return {
      text: "Bonne tentative. Je te donne une piste, mais pas la solution directe en mode évaluation.",
      flags,
    };
  }

  return { text: sanitized, flags };
}

export function appendAudit(session: TutorSession, entry: AuditEntry): void {
  session.audit.push(entry);
  session.audit = session.audit.slice(-30);
}
