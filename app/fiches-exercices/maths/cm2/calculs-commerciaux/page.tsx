import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesCalculsCommerciauxCm2 } from "@/lib/fiches-exercices/maths-cm2-calculs-commerciaux";

export const metadata: Metadata = {
  title: "Calculs commerciaux CM2 : 20 exercices corrigés, bénéfice, intérêt, facture, TVA (PDF)",
  description:
    "Vingt exercices corrigés de CM2, avec champ réponse et clavier maths. Calculer un prix de revient, un bénéfice ou une perte, l'intérêt d'une somme placée, lire et compléter une facture avec la TVA. Un réparateur de vélos, une fleuriste, une banque, un club de sport, un garage, un atelier de poterie et une brocante. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesCalculsCommerciauxCm2Page() {
  return <FicheExercicesClient fiche={exercicesCalculsCommerciauxCm2} />;
}
