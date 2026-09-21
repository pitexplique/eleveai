import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesProportionnalite3e } from "@/lib/fiches-exercices/maths-3e-proportionnalite";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Proportionnalité,
// pourcentages et grandeurs quotients ») : cette page répond à « exercices
// corrigés pourcentages 3e », l'autre à « cours proportionnalité 3e ».
export const metadata: Metadata = {
  title:
    "Proportionnalité et pourcentages 3e : 20 exercices corrigés, évolutions, vitesse (PDF)",
  description:
    "Vingt exercices corrigés de 3e : reconnaître une situation de proportionnalité, tableau et produit en croix, calculer un pourcentage, augmenter ou diminuer avec le coefficient multiplicateur, évolutions successives (+20 % puis −20 % ne ramène pas au départ), vitesse moyenne et débit. Problèmes : la tablette de 100 carrés, les abonnés perdus, la deuxième démarque, l'aller-retour. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesProportionnalite3ePage() {
  return <FicheExercicesClient fiche={exercicesProportionnalite3e} />;
}
