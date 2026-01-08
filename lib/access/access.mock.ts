// lib/access/access.mock.ts
import type { Access, AuthType, Plan } from "@/lib/access/access";
import { getDailyLimit, getLibraryRetentionDays, isLibraryEnabled, toUIMode } from "@/lib/access/access";

/**
 * Mocks = données “comme si” (sans BDD) pour tester l’UX.
 * On simule :
 * - anon (non connecté)
 * - email_free (email connecté, gratuit)
 * - email_paid (email connecté, abonné)
 * - college (élève connecté via code collège)
 */

export type MockKey = "anon" | "email_free" | "email_paid" | "college";

/** Infos additionnelles utiles en UI (facultatif) */
export type AccessMock = Access & {
  mockKey: MockKey;
  userLabel: string; // affichage (ex: "Invité", "Compte gratuit", "Abonné", "Élève (Collège X)")
  collegeName?: string;

  /** Pour tester le texte sous le bouton (compteur) */
  usedToday: number; // simulé
};

/** Helper UI : restant aujourd’hui */
export function getRemainingToday(access: Pick<AccessMock, "dailyLimit" | "usedToday">) {
  return Math.max(0, access.dailyLimit - Math.max(0, access.usedToday));
}

/** Fabrique un Access “cohérent” à partir d’un plan (évite les incohérences) */
function buildMock(params: {
  mockKey: MockKey;
  authType: AuthType;
  plan: Plan;
  userLabel: string;
  usedToday: number;
  collegeName?: string;
}): AccessMock {
  const { mockKey, authType, plan, userLabel, usedToday, collegeName } = params;

  const dailyLimit = getDailyLimit(plan);
  const libraryRetentionDays = getLibraryRetentionDays(plan);
  const libraryEnabled = isLibraryEnabled(plan);

  const access: AccessMock = {
    mockKey,
    authType,
    plan,
    uiMode: toUIMode(plan),

    dailyLimit,
    libraryEnabled,
    libraryRetentionDays,

    hints: {
      underGenerateFree: "🕒 Il te reste X requêtes aujourd’hui",
      underGeneratePaid: libraryEnabled
        ? "📚 Cette requête sera ajoutée à ta bibliothèque"
        : undefined,
    },

    userLabel,
    usedToday,
    ...(collegeName ? { collegeName } : {}),
  };

  return access;
}

/** 4 mocks “canon” */
export const ACCESS_MOCKS: Record<MockKey, AccessMock> = {
  anon: buildMock({
    mockKey: "anon",
    authType: "anon",
    plan: "anon",
    userLabel: "Invité (sans connexion)",
    usedToday: 0, // pour tester, mets 1 si tu veux simuler quota atteint
  }),

  email_free: buildMock({
    mockKey: "email_free",
    authType: "email",
    plan: "email_free",
    userLabel: "Compte email (gratuit)",
    usedToday: 1, // ex : 1 utilisée sur 3
  }),

  email_paid: buildMock({
    mockKey: "email_paid",
    authType: "email",
    plan: "email_paid",
    userLabel: "Compte email (abonné)",
    usedToday: 4, // peu importe, on n’affiche pas forcément le plafond
  }),

  college: buildMock({
    mockKey: "college",
    authType: "college",
    plan: "college",
    userLabel: "Élève (compte établissement)",
    usedToday: 2, // ex : 2 utilisées sur 5
    collegeName: "Collège Jean Moulin (démo)",
  }),
};

/**
 * Sélecteur pratique :
 * - par défaut : email_free (mode démo sympa)
 * - tu peux forcer via ?mock=anon|email_free|email_paid|college
 */
export function pickAccessMock(input?: string | null): AccessMock {
  const key = (input ?? "").trim() as MockKey;
  if (key && key in ACCESS_MOCKS) return ACCESS_MOCKS[key];
  return ACCESS_MOCKS.email_free;
}
