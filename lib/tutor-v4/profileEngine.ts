/**
 * profileEngine.ts
 *
 * Met à jour le profil implicite de l'élève
 * à partir des choix et de la confiance.
 */

import type {
  LearnerProfile,
  QuestionChoice,
  ConfidenceLevel,
  QuestionTheme,
} from "@/lib/tutor-v4/types";

function clamp(v: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, v));
}

function clampSigned(v: number, min = -100, max = 100) {
  return Math.max(min, Math.min(max, v));
}

function updateThemePreference(profile: LearnerProfile, theme: QuestionTheme) {
  const delta = 3;

  if (theme === "reunion") {
    profile.preferences.reunionThemePreference = clamp(
      profile.preferences.reunionThemePreference + delta
    );
  }

  if (theme === "sport") {
    profile.preferences.sportThemePreference = clamp(
      profile.preferences.sportThemePreference + delta
    );
  }

  if (theme === "cuisine") {
    profile.preferences.cuisineThemePreference = clamp(
      profile.preferences.cuisineThemePreference + delta
    );
  }

  if (theme === "jeux_video") {
    profile.preferences.jeuxVideoThemePreference = clamp(
      profile.preferences.jeuxVideoThemePreference + delta
    );
  }
}

function updateChallengePreference(profile: LearnerProfile, choice: QuestionChoice) {
  const delta = 2;

  if (choice.chosenDifficulty >= 4) {
    profile.preferences.challengePreference = clamp(
      profile.preferences.challengePreference + delta
    );
  }

  if (choice.chosenDifficulty <= 2) {
    profile.preferences.challengePreference = clamp(
      profile.preferences.challengePreference - 1
    );
  }
}

function updateGuidancePreference(
  profile: LearnerProfile,
  confidence?: ConfidenceLevel,
  success?: boolean
) {
  if (confidence === undefined || success === undefined) {
    return;
  }

  if (confidence === 1 && !success) {
    profile.preferences.guidancePreference = clamp(
      profile.preferences.guidancePreference + 3
    );
  }

  if (confidence === 3 && success) {
    profile.preferences.guidancePreference = clamp(
      profile.preferences.guidancePreference - 2
    );
  }
}

function updateConfidenceCalibration(
  profile: LearnerProfile,
  confidence: ConfidenceLevel,
  success: boolean
) {
  const step = 5;

  if (confidence === 3 && !success) {
    profile.pedagogy.confidenceCalibration = clampSigned(
      profile.pedagogy.confidenceCalibration - step
    );
  }

  if (confidence === 1 && success) {
    profile.pedagogy.confidenceCalibration = clampSigned(
      profile.pedagogy.confidenceCalibration + step
    );
  }
}

function updateAutonomyAndSupport(
  profile: LearnerProfile,
  confidence?: ConfidenceLevel,
  success?: boolean
) {
  if (confidence === undefined || success === undefined) {
    return;
  }

  if (success && confidence >= 2) {
    profile.pedagogy.estimatedAutonomy = clamp(
      profile.pedagogy.estimatedAutonomy + 2
    );
    profile.pedagogy.estimatedNeedForSupport = clamp(
      profile.pedagogy.estimatedNeedForSupport - 2
    );
  }

  if (!success && confidence === 1) {
    profile.pedagogy.estimatedAutonomy = clamp(
      profile.pedagogy.estimatedAutonomy - 2
    );
    profile.pedagogy.estimatedNeedForSupport = clamp(
      profile.pedagogy.estimatedNeedForSupport + 3
    );
  }
}

function updatePersistence(profile: LearnerProfile, success?: boolean) {
  if (success === undefined) {
    return;
  }

  if (success) {
    profile.pedagogy.estimatedPersistence = clamp(
      profile.pedagogy.estimatedPersistence + 1
    );
  } else {
    profile.pedagogy.estimatedPersistence = clamp(
      profile.pedagogy.estimatedPersistence + 0
    );
  }
}

export function updateLearnerProfile(args: {
  profile: LearnerProfile;
  choice: QuestionChoice;
  confidence?: ConfidenceLevel;
  success?: boolean;
}) {
  const { profile, choice, confidence, success } = args;

  updateThemePreference(profile, choice.chosenTheme);
  updateChallengePreference(profile, choice);
  updateGuidancePreference(profile, confidence, success);
  updateAutonomyAndSupport(profile, confidence, success);
  updatePersistence(profile, success);

  if (confidence !== undefined && success !== undefined) {
    updateConfidenceCalibration(profile, confidence, success);
  }

  return profile;
}