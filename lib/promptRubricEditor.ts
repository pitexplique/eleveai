// lib/promptRubricEditor.ts

import { PROMPT_RUBRIC_V2, RUBRIC_VERSION } from "@/lib/promptRubric";

/**
 * ✅ Rubrique "EDITOR" (optimisation)
 * Objectif : être cohérent avec l’endpoint /improve.
 * On enlève l’instruction contradictoire "Ne JAMAIS fournir de prompt amélioré".
 */
export const PROMPT_RUBRIC_EDITOR_V2 = PROMPT_RUBRIC_V2.replace(
  /- Ne JAMAIS fournir de “prompt amélioré”\.\s*/g,
  ""
).trim();

export { RUBRIC_VERSION };
