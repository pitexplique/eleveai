// lib/tutor-v4/questionBank/seconde/maths/analyse-graphique.bank.ts
//
// Notion analyse_graphique_2de — « Analyse graphique » (12/10/2026, demande de
// Frédéric) : image, antécédents, tableau de signes, tableau de variations,
// équations et inéquations, TOUT lu sur une courbe. Les 30 gabarits (6 micros
// × 5 étoiles) viennent du moteur commun à la seconde et à la première spé :
// voir ../../analyse-graphique-commun.ts.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { banqueAnalyseGraphique } from "../../analyse-graphique-commun";

export const analyseGraphiqueBank: TutorBankItemV4[] = banqueAnalyseGraphique({
  niveau: "seconde",
  notionId: "analyse_graphique_2de",
  prefixe: "seconde_ag",
  micros: {
    image: "graph_image",
    antecedent: "graph_antecedent",
    signes: "graph_tableau_signes",
    variations: "graph_tableau_variations",
    equation: "graph_resoudre_equation",
    inequation: "graph_resoudre_inequation",
  },
});
