// lib/promptRubricEditor.ts

import {
  RUBRIC_VERSION,
  getPromptRubricEditor,
  PromptType,
} from "@/lib/promptRubric";

/**
 * Wrapper simple pour exposer une fonction stable côté API.
 * On renvoie une rubrique typée selon le type détecté.
 */

export function PROMPT_RUBRIC_EDITOR_V2(type: PromptType) {
  return getPromptRubricEditor(type);
}

export { RUBRIC_VERSION };
