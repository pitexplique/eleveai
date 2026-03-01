// lib/premiumSessionStore.ts

export type PremiumQuestion = {
  id: string;
  gap: string;
  question: string;
};

export type PremiumSession = {
  id: string;
  createdAt: number;
  prompt: string;
  scoreReport: any;
  model: "gpt-4o-mini" | "gpt-4o";
  type: string;
  audience: string;
  questions: PremiumQuestion[];
  answers: Record<string, string>;
};

const TTL_MS = 2 * 60 * 60 * 1000; // 2h

declare global {
  var __VALERIA_PREMIUM_SESSIONS__:
    | Map<string, PremiumSession>
    | undefined;
}

function getStore() {
  if (!globalThis.__VALERIA_PREMIUM_SESSIONS__) {
    globalThis.__VALERIA_PREMIUM_SESSIONS__ = new Map();
  }
  return globalThis.__VALERIA_PREMIUM_SESSIONS__;
}

export function createSession(session: PremiumSession) {
  const store = getStore();
  store.set(session.id, session);
}

export function getSession(id: string) {
  return getStore().get(id) || null;
}

export function updateSession(id: string, patch: Partial<PremiumSession>) {
  const store = getStore();
  const existing = store.get(id);
  if (!existing) return null;
  const updated = { ...existing, ...patch };
  store.set(id, updated);
  return updated;
}

export function deleteSession(id: string) {
  getStore().delete(id);
}

export function cleanupOldSessions() {
  const store = getStore();
  const now = Date.now();
  for (const [id, s] of store.entries()) {
    if (now - s.createdAt > TTL_MS) {
      store.delete(id);
    }
  }
}