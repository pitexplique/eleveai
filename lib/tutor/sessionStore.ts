import type { TutorSession } from "@/lib/tutor/types";

const TTL_MS = 30 * 60 * 1000;

type SessionRecord = {
  value: TutorSession;
  expiresAt: number;
};

function getStore(): Map<string, SessionRecord> {
  const globalAny = globalThis as typeof globalThis & {
    __ELEVEAI_TUTOR_STORE__?: Map<string, SessionRecord>;
  };

  if (!globalAny.__ELEVEAI_TUTOR_STORE__) {
    globalAny.__ELEVEAI_TUTOR_STORE__ = new Map();
  }

  return globalAny.__ELEVEAI_TUTOR_STORE__;
}

function cleanup() {
  const store = getStore();
  const now = Date.now();

  for (const [key, record] of store.entries()) {
    if (record.expiresAt < now) {
      store.delete(key);
    }
  }
}

export function createSession(session: TutorSession) {
  cleanup();
  const store = getStore();
  store.set(session.id, {
    value: session,
    expiresAt: Date.now() + TTL_MS,
  });
  return session;
}

export function getSession(sessionId: string): TutorSession | null {
  cleanup();
  const store = getStore();
  const found = store.get(sessionId);
  if (!found) return null;
  return found.value;
}

export function saveSession(session: TutorSession) {
  cleanup();
  const store = getStore();
  store.set(session.id, {
    value: session,
    expiresAt: Date.now() + TTL_MS,
  });
}