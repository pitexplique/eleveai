// lib/access/access.ts
import { QUOTAS } from "@/lib/constants/quotas";

export type AuthType = "anon" | "email" | "college";

/**
 * Plan = ce qui détermine les droits.
 * - email_free : utilisateur email, pas abonné
 * - email_paid : utilisateur email, abonné
 * - college    : utilisateur via codes établissement/élève
 */
export type Plan = "anon" | "email_free" | "email_paid" | "college";

/**
 * Mode UI = 3 états demandés pour la sidebar.
 * (Le cas "college" est rangé dans "connected" côté UI, mais le plan reste "college".)
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

  /** Messages courts utiles UI (sidebar, tooltips) */
  hints: {
    underGenerateFree?: string;
    underGeneratePaid?: string;
  };
};

export function getDailyLimit(plan: Plan): number {
  switch (plan) {
    case "anon":
      return QUOTAS.ANON_DAILY;
    case "email_free":
      return QUOTAS.EMAIL_FREE_DAILY;
    case "college":
      return QUOTAS.COLLEGE_DAILY;
    case "email_paid":
      return QUOTAS.PAID_DAILY; // plafond technique
    default:
      return QUOTAS.ANON_DAILY;
  }
}

export function getLibraryRetentionDays(plan: Plan): number | null {
  switch (plan) {
    case "college":
      return QUOTAS.COLLEGE_LIBRARY_DAYS; // 30 jours
    case "email_paid":
      return null; // illimité (historique complet)
    case "anon":
    case "email_free":
    default:
      return 0; // pas de bibliothèque
  }
}

export function isLibraryEnabled(plan: Plan): boolean {
  // Décision v1 : Bibliothèque réservée aux abonnés + collège (30 jours)
  return plan === "email_paid" || plan === "college";
}

/**
 * Plan -> 3 modes sidebar
 */
export function toUIMode(plan: Plan): UIMode {
  if (plan === "email_paid") return "subscribed";
  if (plan === "email_free" || plan === "college") return "connected";
  return "anon";
}

/**
 * Fabrique l'objet Access complet, réutilisable partout (sidebar + espaces).
 */
export function getAccess(params: { authType: AuthType; isPaid?: boolean }): Access {
  const { authType, isPaid } = params;

  const plan: Plan =
    authType === "anon"
      ? "anon"
      : authType === "college"
      ? "college"
      : isPaid
      ? "email_paid"
      : "email_free";

  const dailyLimit = getDailyLimit(plan);
  const libraryRetentionDays = getLibraryRetentionDays(plan);
  const libraryEnabled = isLibraryEnabled(plan);

  return {
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
  };
}
