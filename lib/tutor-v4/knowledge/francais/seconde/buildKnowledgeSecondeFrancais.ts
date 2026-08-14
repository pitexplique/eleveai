import { buildKnowledge } from "@/lib/tutor-v4/knowledge/buildKnowledge";

import { bo } from "./bo";
import { microSkills } from "./microSkills";
import { notions } from "./notions";

/* ⚠️ Aucune fabrique partagée ici, volontairement. Le français de seconde est
   LITTÉRAL : les 34 micros identiques de 5e/4e/3e sont restées invisibles
   parce qu'une fabrique nourrissait trois niveaux, et seize scripts de
   vérification sur vingt-huit lisent le source. Une classe seule n'a de toute
   façon personne avec qui partager. */
export function buildKnowledgeSecondeFrancais() {
  return buildKnowledge({
    id: "seconde-francais",
    classe: "seconde",
    matiere: "francais",
    bo,
    notions,
    microSkills,
  });
}
