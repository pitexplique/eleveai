import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesLogiqueSeconde } from "@/lib/fiches-exercices/maths-seconde-logique";

export const metadata: Metadata = {
  title: "Ensembles et logique en seconde : 20 exercices corrigés, diagrammes de Venn (PDF)",
  description:
    "Vingt exercices corrigés de vocabulaire ensembliste et de logique en seconde : appartenance et inclusion, réunion, intersection, complémentaire, connecteurs « et » et « ou », négation, contre-exemple, implication, réciproque, équivalence. Le feu rouge, les conditions d'une aide, la formule d'Euler qui se trompe à 40, un aquarium pour deux espèces. Diagrammes de Venn et intervalles dessinés. PDF à imprimer.",
};

export default function ExercicesLogiqueSecondePage() {
  return <FicheExercicesClient fiche={exercicesLogiqueSeconde} />;
}
