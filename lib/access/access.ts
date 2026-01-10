// lib/access/access.ts
import { QUOTAS } from "@/lib/constants/quotas";

export type AuthType = "anon" | "email" | "college";

/**
 * Plan = droits fonctionnels (quotas, bibliothèque, etc.)
 */
export type Plan = "anon" | "email_free" | "email_paid" | "college";

/**
 * Mode UI = affichage global (sidebar, badges…)
 */
export type UIMode = "anon" | "connected" | "subscribed";

export type Access = {
  authType: AuthType;
  plan: Plan;
  uiMode: UIMode;

  dailyLimit: number;

  /** Bibliothèque autorisée ? */
  libraryEnabled: boolean;

  /** Nombre de jours de conservation (null = illimité / non applicable) */
  libraryRetentionDays: number | null;

  /** Messages courts utiles UI */
  hints: {
    underGenerateFree?: string;
    underGeneratePaid?: string;
  };
};

/* =========================
   QUOTAS / DROITS
========================= */

export function getDailyLimit(plan: Plan): number {
  switch (plan) {
    case "anon":
      return QUOTAS.ANON_DAILY;
    case "email_free":
      return QUOTAS.EMAIL_FREE_DAILY;
    case "college":
      return QUOTAS.COLLEGE_DAILY;
    case "email_paid":
      return QUOTAS.PAID_DAILY;
    default:
      return QUOTAS.ANON_DAILY;
  }
}

export function getLibraryRetentionDays(plan: Plan): number | null {
  switch (plan) {
    case "college":
      return QUOTAS.COLLEGE_LIBRARY_DAYS;
    case "email_paid":
      return null; // illimité
    case "anon":
    case "email_free":
    default:
      return 0;
  }
}

export function isLibraryEnabled(plan: Plan): boolean {
  return plan === "email_paid" || plan === "college";
}

export function toUIMode(plan: Plan): UIMode {
  if (plan === "email_paid") return "subscribed";
  if (plan === "email_free" || plan === "college") return "connected";
  return "anon";
}

/**
 * Fabrique un Access réel (hors mock)
 */
export function getAccess(params: {
  authType: AuthType;
  isPaid?: boolean;
}): Access {
  const { authType, isPaid } = params;

  const plan: Plan =
    authType === "anon"
      ? "anon"
      : authType === "college"
      ? "college"
      : isPaid
      ? "email_paid"
      : "email_free";

  return {
    authType,
    plan,
    uiMode: toUIMode(plan),
    dailyLimit: getDailyLimit(plan),
    libraryEnabled: isLibraryEnabled(plan),
    libraryRetentionDays: getLibraryRetentionDays(plan),
    hints: {
      underGenerateFree: "🕒 Il te reste X requêtes aujourd’hui",
      underGeneratePaid:
        isLibraryEnabled(plan)
          ? "📚 Cette requête sera ajoutée à ta bibliothèque"
          : undefined,
    },
  };
}
