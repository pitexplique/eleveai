// lib/tutor-v4/questionBank/premiere-spe/maths/analyse-graphique.bank.ts
//
// Notion analyse_graphique_1s — « Analyse graphique » (12/10/2026, Frédéric :
// « on pourrait le rajouter en première aussi »). Même moteur que la seconde
// (../../analyse-graphique-commun.ts) : en première, c'est la révision qui
// tient tout le chapitre des variations — on lit avant de dériver.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { banqueAnalyseGraphique } from "../../analyse-graphique-commun";

export const analyseGraphiqueBank: TutorBankItemV4[] = banqueAnalyseGraphique({
  niveau: "premiere-spe",
  notionId: "analyse_graphique_1s",
  prefixe: "premiere_spe_ag",
  micros: {
    image: "graph1s_image",
    antecedent: "graph1s_antecedent",
    signes: "graph1s_tableau_signes",
    variations: "graph1s_tableau_variations",
    equation: "graph1s_resoudre_equation",
    inequation: "graph1s_resoudre_inequation",
  },
});
