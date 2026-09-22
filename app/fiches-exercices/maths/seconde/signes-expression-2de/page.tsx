import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSignesSeconde } from "@/lib/fiches-exercices/maths-seconde-signes";

// ⚠️ Le titre ne répète pas celui de la fiche de cours : cette page répond à
// « exercices corrigés tableau de signes seconde », l'autre à « cours ».
export const metadata: Metadata = {
  title: "Tableau de signes en seconde : 20 exercices corrigés, produit et quotient (PDF)",
  description:
    "Vingt exercices corrigés sur le signe d'une expression en seconde : signe de ax + b, tableau de signes d'un produit et d'un quotient, valeur interdite et double barre, équations produit nul, inéquations. Un maraîcher, une transformation au rugby, la fenêtre d'un médicament, une salle de sport, un parapentiste. Chaque corrigé dresse son tableau, PDF à imprimer.",
};

export default function ExercicesSignesSecondePage() {
  return <FicheExercicesClient fiche={exercicesSignesSeconde} />;
}
