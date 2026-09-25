import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDistributivite4e } from "@/lib/fiches-exercices/maths-4e-distributivite";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« La distributivité ») :
// cette page répond à « exercices corrigés distributivité 4e », l'autre à
// « cours distributivité 4e ».
export const metadata: Metadata = {
  title: "Distributivité 4e : 20 exercices corrigés, développer et réduire, double distributivité (PDF)",
  description:
    "Vingt exercices corrigés de 4e : développer avec la distributivité simple, gérer les signes, la double distributivité et ses quatre produits, réduire après développement, reconnaître un produit d'une somme, trouver l'erreur. Problèmes : un terrain de football agrandi, les degrés Fahrenheit, un plan d'entraînement, le carré du calendrier. Rappel de cours avant chaque niveau, corrigé étape par étape avec le dessin des aires, PDF à imprimer.",
};

export default function ExercicesDistributivite4ePage() {
  return <FicheExercicesClient fiche={exercicesDistributivite4e} />;
}
