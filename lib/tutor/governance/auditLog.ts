import type { AuditEntry, TutorSession } from "@/lib/tutor/types";

export function appendAudit(session: TutorSession, entry: AuditEntry) {
  session.audit.push(entry);
  if (session.audit.length > 100) {
    session.audit.shift();
  }
}
