
// lib/access/access.mock.ts
import type { Access, AuthType, Plan } from "@/lib/access/access";
import {
  getDailyLimit,
  getLibraryRetentionDays,
  isLibraryEnabled,
  toUIMode,
} from "@/lib/access/access";

/* =========================================================
   1) TYPES (fondation)
========================================================= */

export type MockKey =
  | "anon"
  | "email_free"
  | "email_paid"
  | "college_eleve"
  | "college_admin" // boss (theboss)
  | "college_vie"
  | "college_aesh"
  | "college_personnels"
  | "college_administration";

export type CollegeRole =
  | "eleve"
  | "direction" // boss
  | "vie_scolaire"
  | "aesh"
  | "personnels"
  | "administration";

export type FeatureFlag =
  | "canSeeDashboard"
  | "canSeeCollegeHub"
  | "canSeeCollegeAdministration"
  | "canSeeCollegeVieScolaire"
  | "canSeeCollegeAesh"
  | "canSeeCollegePersonnels"
  | "canSeeDirection"; // /direction

export type AccessMock = Access & {
  /* --- Identification mock --- */
  mockKey: MockKey;
  userLabel: string;

  /* --- UI: connecté ? (fondamental pour sidebar) --- */
  isLoggedIn: boolean;

  /* --- Quota UI --- */
  usedToday: number;

  /* --- Identité collège --- */
  collegeCode?: string; // ex: DIMITILE
  collegeName?: string;
  userCode?: string; // ex: theboss / vie / aesh...
  collegeRole?: CollegeRole;

  /* --- Capacités (routes/menus) --- */
  features: FeatureFlag[];
};

/* =========================================================
   2) HELPERS
========================================================= */

export function getRemainingToday(access: Pick<AccessMock, "dailyLimit" | "usedToday">) {
  return Math.max(0, access.dailyLimit - Math.max(0, access.usedToday));
}

function hasFeature(access: Pick<AccessMock, "features">, flag: FeatureFlag) {
  return access.features.includes(flag);
}

export function canSeeDirection(access: Pick<AccessMock, "features">) {
  return hasFeature(access, "canSeeDirection");
}

/* =========================================================
   3) FABRIQUE DE MOCK (cohérente)
========================================================= */

function buildMock(params: {
  mockKey: MockKey;
  authType: AuthType;
  plan: Plan;
  userLabel: string;

  usedToday: number;

  collegeCode?: string;
  collegeName?: string;
  userCode?: string;
  collegeRole?: CollegeRole;

  features: FeatureFlag[];
}): AccessMock {
  const {
    mockKey,
    authType,
    plan,
    userLabel,
    usedToday,
    collegeCode,
    collegeName,
    userCode,
    collegeRole,
    features,
  } = params;

  const dailyLimit = getDailyLimit(plan);
  const libraryRetentionDays = getLibraryRetentionDays(plan);
  const libraryEnabled = isLibraryEnabled(plan);

  const isLoggedIn = plan !== "anon"; // ✅ règle unique

  return {
    mockKey,
    userLabel,
    isLoggedIn,

    authType,
    plan,
    uiMode: toUIMode(plan),

    dailyLimit,
    libraryEnabled,
    libraryRetentionDays,

    hints: {
      underGenerateFree: "🕒 Il te reste X requêtes aujourd’hui",
      underGeneratePaid: libraryEnabled ? "📚 Cette requête sera ajoutée à ta bibliothèque" : undefined,
    },

    usedToday,

    ...(collegeCode ? { collegeCode } : {}),
    ...(collegeName ? { collegeName } : {}),
    ...(userCode ? { userCode } : {}),
    ...(collegeRole ? { collegeRole } : {}),

    features,
  };
}

/* =========================================================
   4) MOCKS “CANON” (toutes les situations)
========================================================= */

const COLLEGE = {
  collegeCode: "DIMITILE",
  collegeName: "Collège Capitaine Dimitile",
} as const;

// Base : tous les profils collège voient le hub + dashboard global
const COLLEGE_BASE_FEATURES: FeatureFlag[] = ["canSeeDashboard", "canSeeCollegeHub"];

export const ACCESS_MOCKS: Record<MockKey, AccessMock> = {
  anon: buildMock({
    mockKey: "anon",
    authType: "anon",
    plan: "anon",
    userLabel: "Invité (sans connexion)",
    usedToday: 0,
    features: [],
  }),

  email_free: buildMock({
    mockKey: "email_free",
    authType: "email",
    plan: "email_free",
    userLabel: "Compte email (gratuit)",
    usedToday: 1,
    features: ["canSeeDashboard"],
  }),

  email_paid: buildMock({
    mockKey: "email_paid",
    authType: "email",
    plan: "email_paid",
    userLabel: "Compte email (abonné)",
    usedToday: 4,
    features: ["canSeeDashboard"],
  }),

  // ---- Collège : élève
  college_eleve: buildMock({
    mockKey: "college_eleve",
    authType: "college",
    plan: "college",
    userLabel: "Élève (collège)",
    usedToday: 2,
    ...COLLEGE,
    userCode: "eleve-demo",
    collegeRole: "eleve",
    features: [...COLLEGE_BASE_FEATURES],
  }),

  // ---- Collège : boss (direction)
  college_admin: buildMock({
    mockKey: "college_admin",
    authType: "college",
    plan: "college",
    userLabel: "Direction (principal)",
    usedToday: 0,
    ...COLLEGE,
    userCode: "theboss",
    collegeRole: "direction",
    features: [
      ...COLLEGE_BASE_FEATURES,
      "canSeeDirection",
      "canSeeCollegeAdministration",
      "canSeeCollegeVieScolaire",
      "canSeeCollegeAesh",
      "canSeeCollegePersonnels",
    ],
  }),

  college_vie: buildMock({
    mockKey: "college_vie",
    authType: "college",
    plan: "college",
    userLabel: "Vie scolaire",
    usedToday: 1,
    ...COLLEGE,
    userCode: "vie",
    collegeRole: "vie_scolaire",
    features: [...COLLEGE_BASE_FEATURES, "canSeeCollegeVieScolaire"],
  }),

  college_aesh: buildMock({
    mockKey: "college_aesh",
    authType: "college",
    plan: "college",
    userLabel: "AESH",
    usedToday: 1,
    ...COLLEGE,
    userCode: "aesh",
    collegeRole: "aesh",
    features: [...COLLEGE_BASE_FEATURES, "canSeeCollegeAesh"],
  }),

  college_personnels: buildMock({
    mockKey: "college_personnels",
    authType: "college",
    plan: "college",
    userLabel: "Personnels",
    usedToday: 1,
    ...COLLEGE,
    userCode: "perso",
    collegeRole: "personnels",
    features: [...COLLEGE_BASE_FEATURES, "canSeeCollegePersonnels"],
  }),

  college_administration: buildMock({
    mockKey: "college_administration",
    authType: "college",
    plan: "college",
    userLabel: "Administration",
    usedToday: 1,
    ...COLLEGE,
    userCode: "admin",
    collegeRole: "administration",
    features: [...COLLEGE_BASE_FEATURES, "canSeeCollegeAdministration"],
  }),
};

/* =========================================================
   5) SELECTEUR
========================================================= */

export function pickAccessMock(input?: string | null): AccessMock {
  const key = (input ?? "").trim() as MockKey;
  if (key && key in ACCESS_MOCKS) return ACCESS_MOCKS[key];
  return ACCESS_MOCKS.email_free;
}
