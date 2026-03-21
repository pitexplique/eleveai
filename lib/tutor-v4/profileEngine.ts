/**
 * profileEngine.ts
 *
 * Met à jour le profil implicite de l'élève
 * à partir de ses choix et de sa réussite.
 */

import type {
  LearnerProfile,
  QuestionChoice,
  QuestionTheme,
} from "@/lib/tutor-v4/types";

function clamp(v: number, min = 0, max = 100) {
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

function updateChallengePreference(
  profile: LearnerProfile,
  choice: QuestionChoice,
  success?: boolean
) {
  if (success === undefined) {
    return;
  }

  if (choice.chosenDifficulty >= 4 && success) {
    profile.preferences.challengePreference = clamp(
      profile.preferences.challengePreference + 2
    );
  }

  if (choice.chosenDifficulty <= 2 && success) {
    profile.preferences.challengePreference = clamp(
      profile.preferences.challengePreference - 1
    );
  }

  if (choice.chosenDifficulty >= 4 && !success) {
    profile.preferences.challengePreference = clamp(
      profile.preferences.challengePreference - 1
    );
  }
}

function updateGuidancePreference(
  profile: LearnerProfile,
  choice: QuestionChoice,
  success?: boolean
) {
  if (success === undefined) {
    return;
  }

  if (!success && choice.chosenDifficulty >= 3) {
    profile.preferences.guidancePreference = clamp(
      profile.preferences.guidancePreference + 3
    );
  }

  if (success && choice.chosenDifficulty <= 2) {
    profile.preferences.guidancePreference = clamp(
      profile.preferences.guidancePreference - 1
    );
  }
}

function updateAutonomyAndSupport(
  profile: LearnerProfile,
  choice: QuestionChoice,
  success?: boolean
) {
  if (success === undefined) {
    return;
  }

  if (success && choice.chosenDifficulty >= 2) {
    profile.pedagogy.estimatedAutonomy = clamp(
      profile.pedagogy.estimatedAutonomy + 2
    );
    profile.pedagogy.estimatedNeedForSupport = clamp(
      profile.pedagogy.estimatedNeedForSupport - 2
    );
  }

  if (!success) {
    profile.pedagogy.estimatedAutonomy = clamp(
      profile.pedagogy.estimatedAutonomy - 1
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
      profile.pedagogy.estimatedPersistence + 1
    );
  }
}

export function updateLearnerProfile(args: {
  profile: LearnerProfile;
  choice: QuestionChoice;
  success?: boolean;
}) {
  const { profile, choice, success } = args;

  updateThemePreference(profile, choice.chosenTheme);
  updateChallengePreference(profile, choice, success);
  updateGuidancePreference(profile, choice, success);
  updateAutonomyAndSupport(profile, choice, success);
  updatePersistence(profile, success);

  return profile;
}