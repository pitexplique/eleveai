import knowledge from "../6e.maths.knowledge.json";
import { microSkills6e } from "../microSkills6e";

export function loadKnowledge6eMaths() {
  return {
    ...knowledge,
    microSkills: microSkills6e,
  };
}