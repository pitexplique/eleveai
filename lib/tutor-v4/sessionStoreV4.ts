/**
 * lib/tutor-v4/sessionStoreV4.ts
 *
 * Stockage des sessions V4 : Supabase (table tutor_sessions_v4) comme source
 * de vérité, mémoire locale en secours.
 *
 * Pourquoi : en serverless (Vercel), chaque requête peut toucher une instance
 * différente ; un store uniquement en mémoire perdait les sessions entre deux
 * requêtes → erreurs « Session introuvable » aléatoires (retours élèves du
 * 11/06/2026). La table est sous RLS sans policy : seule la service role y
 * accède, comme les autres tables du projet. SQL : supabase/tutor_sessions_v4.sql.
 */

import { after } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { TutorSessionV4 } from "@/lib/tutor-v4/types";

/* ⭐ L'ÉCRITURE EN BASE PART APRÈS LA RÉPONSE (14/09/2026).
   Frédéric, sur la fonction exponentielle en terminale : « les qcm sont très
   longs à charger et quand je clique je dois cliquer plusieurs fois ».
   Mesuré depuis La Réunion, un clic coûtait ~0,65 s en local, dont ~0,26 s de
   lecture Supabase et ~0,29 s d'écriture ; ~1 s en production. L'élève
   attendait donc que la base ait fini d'écrire un tour qu'il avait déjà joué.
   `after()` renvoie la question d'abord et écrit ensuite (waitUntil sur Vercel).
   ⚠️ La contrepartie est traitée dans `getSessionV4` : une lecture qui arrive
   avant la fin de l'écriture garde la copie mémoire si elle est plus récente.
   Hors requête (script), `after` lève : on écrit alors en ligne, comme avant. */
function enArrierePlan(tache: () => Promise<void>): Promise<void> {
  try {
    after(tache);
    return Promise.resolve();
  } catch {
    return tache();
  }
}

const TTL_MS = 30 * 60 * 1000;

type SessionRecord = {
  value: TutorSessionV4;
  expiresAt: number;
};

type GlobalWithStore = typeof globalThis & {
  __ELEVEAI_TUTOR_V4_STORE__?: Map<string, SessionRecord>;
  __ELEVEAI_TUTOR_V4_DB__?: SupabaseClient | null;
};

function getStore(): Map<string, SessionRecord> {
  const globalAny = globalThis as GlobalWithStore;

  if (!globalAny.__ELEVEAI_TUTOR_V4_STORE__) {
    globalAny.__ELEVEAI_TUTOR_V4_STORE__ = new Map();
  }

  return globalAny.__ELEVEAI_TUTOR_V4_STORE__;
}

function getDb(): SupabaseClient | null {
  const globalAny = globalThis as GlobalWithStore;

  if (globalAny.__ELEVEAI_TUTOR_V4_DB__ !== undefined) {
    return globalAny.__ELEVEAI_TUTOR_V4_DB__;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  globalAny.__ELEVEAI_TUTOR_V4_DB__ =
    url && key
      ? createClient(url, key, { auth: { persistSession: false } })
      : null;

  return globalAny.__ELEVEAI_TUTOR_V4_DB__;
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

function setInMemory(session: TutorSessionV4) {
  getStore().set(session.id, {
    value: session,
    expiresAt: Date.now() + TTL_MS,
  });
}

// Une erreur de persistance ne doit pas casser le tour de l'élève : la session
// reste au moins en mémoire (comportement d'avant).
async function persist(session: TutorSessionV4) {
  const db = getDb();
  if (!db) return;

  const { error } = await db.from("tutor_sessions_v4").upsert({
    id: session.id,
    data: session,
    expires_at: new Date(Date.now() + TTL_MS).toISOString(),
    updated_at: new Date().toISOString(),
  });

  if (error) {
    console.error("tutor_sessions_v4 upsert:", error.message);
  }
}

export async function createSessionV4(session: TutorSessionV4) {
  cleanup();
  setInMemory(session);
  const instantane = structuredClone(session);

  await enArrierePlan(async () => {
    await persist(instantane);

    // Purge opportuniste des sessions expirées (une requête par démarrage).
    const db = getDb();
    if (db) {
      const { error } = await db
        .from("tutor_sessions_v4")
        .delete()
        .lt("expires_at", new Date().toISOString());
      if (error) {
        console.error("tutor_sessions_v4 purge:", error.message);
      }
    }
  });

  return session;
}

export async function getSessionV4(
  sessionId: string
): Promise<TutorSessionV4 | null> {
  cleanup();

  // Supabase d'abord : la mémoire locale peut être périmée si une autre
  // instance serverless a traité le tour précédent.
  const db = getDb();
  if (db) {
    const { data, error } = await db
      .from("tutor_sessions_v4")
      .select("data, expires_at")
      .eq("id", sessionId)
      .maybeSingle();

    if (!error && data && new Date(data.expires_at).getTime() >= Date.now()) {
      const session = data.data as TutorSessionV4;
      // L'écriture du tour précédent peut ne pas être arrivée (voir
      // `enArrierePlan`) : sur la même instance, la mémoire est alors en avance
      // sur la base, et c'est elle qui fait foi.
      const enMemoire = getStore().get(sessionId)?.value;
      if (enMemoire && enMemoire.updatedAt > session.updatedAt) {
        return enMemoire;
      }
      setInMemory(session);
      return session;
    }

    if (error) {
      console.error("tutor_sessions_v4 select:", error.message);
    }
  }

  return getStore().get(sessionId)?.value ?? null;
}

export async function saveSessionV4(session: TutorSessionV4) {
  cleanup();
  setInMemory(session);
  // Copie figée : la session peut encore être modifiée par l'appelant avant que
  // l'écriture différée ne parte.
  const instantane = structuredClone(session);
  await enArrierePlan(() => persist(instantane));
}
