/**
 * sessionStoreV4.ts
 *
 * Stockage mémoire simple des sessions V4.
 */

import type { TutorSessionV4 } from "@/lib/tutor-v4/types";

const TTL_MS = 30 * 60 * 1000;

type SessionRecord = {
  value: TutorSessionV4;
  expiresAt: number;
};

function getStore(): Map<string, SessionRecord> {
  const globalAny = globalThis as typeof globalThis & {
    __ELEVEAI_TUTOR_V4_STORE__?: Map<string, SessionRecord>;
  };

  if (!globalAny.__ELEVEAI_TUTOR_V4_STORE__) {
    globalAny.__ELEVEAI_TUTOR_V4_STORE__ = new Map();
  }

  return globalAny.__ELEVEAI_TUTOR_V4_STORE__;
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

export function createSessionV4(session: TutorSessionV4) {
  cleanup();
  const store = getStore();

  store.set(session.id, {
    value: session,
    expiresAt: Date.now() + TTL_MS,
  });

  return session;
}

export function getSessionV4(sessionId: string): TutorSessionV4 | null {
  cleanup();
  const store = getStore();
  return store.get(sessionId)?.value ?? null;
}

export function saveSessionV4(session: TutorSessionV4) {
  cleanup();
  const store = getStore();

  store.set(session.id, {
    value: session,
    expiresAt: Date.now() + TTL_MS,
  });
}