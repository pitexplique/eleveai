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

function updateThemePreference(profile: LearnerProfile, theme: QuestionTheme) {
  const delta = 3;

  if (theme === "reunion") {
    profile.reunionThemePreference = clamp(profile.reunionThemePreference + delta);
  }

  if (theme === "sport") {
    profile.sportThemePreference = clamp(profile.sportThemePreference + delta);
  }

  if (theme === "cuisine") {
    profile.cuisineThemePreference = clamp(profile.cuisineThemePreference + delta);
  }

  if (theme === "jeux_video") {
    profile.jeuxVideoThemePreference = clamp(profile.jeuxVideoThemePreference + delta);
  }
}

function updateConfidenceCalibration(
  profile: LearnerProfile,
  confidence: ConfidenceLevel,
  success: boolean
) {
  const step = 5;

  if (confidence === 3 && !success) {
    profile.confidenceCalibration = clamp(profile.confidenceCalibration - step, -100, 100);
  }

  if (confidence === 1 && success) {
    profile.confidenceCalibration = clamp(profile.confidenceCalibration + step, -100, 100);
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

  if (confidence !== undefined && success !== undefined) {
    updateConfidenceCalibration(profile, confidence, success);
  }

  return profile;
}