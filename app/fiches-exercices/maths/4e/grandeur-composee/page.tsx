import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesGrandeursComposees4e } from "@/lib/fiches-exercices/maths-4e-grandeurs-composees";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Grandeurs composées et
// unités ») : cette page répond à « exercices corrigés vitesse kWh conversions
// 4e », l'autre à « cours grandeurs composées 4e ».
export const metadata: Metadata = {
  title: "Grandeurs composées 4e : 20 exercices corrigés, vitesse, kWh, masse volumique, conversions (PDF)",
  description:
    "Vingt exercices corrigés de 4e : grandeur produit (énergie en kWh, volume d'une douche) et grandeur quotient (vitesse, prix au kilo, masse volumique, densité de population), lire et écrire une unité composée, convertir des longueurs, des aires et des m/s en km/h, contrôler un résultat par son unité. Problèmes : la barge rousse qui vole onze jours sans se poser, le Rhône et nos robinets, le corps humain à 100 W, le record de l'heure. Rappel de cours avant chaque niveau, corrigé étape par étape avec un schéma, PDF à imprimer.",
};

export default function ExercicesGrandeursComposees4ePage() {
  return <FicheExercicesClient fiche={exercicesGrandeursComposees4e} />;
}
