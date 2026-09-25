import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesRatiosPourcentages4e } from "@/lib/fiches-exercices/maths-4e-ratios-pourcentages";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Ratios et
// pourcentages ») : cette page répond à « exercices corrigés ratio 4e » ou
// « exercices pourcentages 4e », l'autre à « cours ratios 4e ».
export const metadata: Metadata = {
  title: "Ratio et pourcentages 4e : 20 exercices corrigés, partage, coefficient multiplicateur (PDF)",
  description:
    "Vingt exercices corrigés de 4e : écrire et simplifier un ratio a : b, le traduire par une égalité de quotients, partager une quantité selon un ratio à deux ou trois termes, calculer un pourcentage, utiliser le coefficient multiplicateur, enchaîner deux évolutions. Problèmes : le braquet d'un vélo, le déclin des animaux sauvages, le CO₂ de l'air, une coopérative solaire. Rappel de cours avant chaque niveau, corrigé étape par étape avec la barre des parts dessinée, PDF à imprimer.",
};

export default function ExercicesRatiosPourcentages4ePage() {
  return <FicheExercicesClient fiche={exercicesRatiosPourcentages4e} />;
}
