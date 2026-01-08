// lib/constants/quotas.ts

export const QUOTAS = {
  /** Hors connexion (découverte) */
  ANON_DAILY: 1,

  /** Compte email gratuit */
  EMAIL_FREE_DAILY: 3,

  /** Accès collège (code établissement / élève) */
  COLLEGE_DAILY: 5,
  COLLEGE_LIBRARY_DAYS: 30, // durée de conservation de la bibliothèque élève

  /** Abonnement email (grand public) */
  PAID_DAILY: 30, // plafond technique (non affiché)
} as const;

