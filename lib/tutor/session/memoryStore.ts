import type { TutorSession } from "@/lib/tutor/types";

const TTL_MS = 30 * 60 * 1000;

const globalForTutor = globalThis as unknown as {
  tutorSessions?: Map<string, TutorSession>;
};

const sessions = globalForTutor.tutorSessions ?? new Map<string, TutorSession>();
globalForTutor.tutorSessions = sessions;

function purgeExpired() {
  const now = Date.now();
  for (const [id, session] of sessions.entries()) {
    if (session.expiresAt <= now) {
      sessions.delete(id);
    }
  }
}

export function createSession(session: Omit<TutorSession, "expiresAt" | "updatedAt">): TutorSession {
  purgeExpired();
  const now = Date.now();
  const withTtl: TutorSession = {
    ...session,
    updatedAt: now,
    expiresAt: now + TTL_MS,
  };
  sessions.set(session.id, withTtl);
  return withTtl;
}

export function getSession(sessionId: string): TutorSession | null {
  purgeExpired();
  return sessions.get(sessionId) ?? null;
}

export function saveSession(session: TutorSession): TutorSession {
  const now = Date.now();
  const updated = { ...session, updatedAt: now, expiresAt: now + TTL_MS };
  sessions.set(session.id, updated);
  return updated;
}
