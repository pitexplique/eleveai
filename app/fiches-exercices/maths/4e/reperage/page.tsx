import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesReperage4e } from "@/lib/fiches-exercices/maths-4e-reperage";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Se repérer sur une
// droite, dans le plan, sur la Terre ») : cette page répond à « exercices
// corrigés repérage 4e », l'autre à « cours repérage 4e ».
export const metadata: Metadata = {
  title: "Repérage 4e : 20 exercices corrigés, abscisse, coordonnées, latitude et longitude (PDF)",
  description:
    "Vingt exercices corrigés de 4e sur le repérage : lire et placer une abscisse sur une droite graduée, même fractionnaire, lire et placer un point dans un repère (l'axe des ordonnées monte), symétriques et milieu, trois coordonnées dans un pavé droit, latitude et longitude sur la Terre. Problèmes : une course d'orientation, les records de température de la planète, le Rubik's Cube, les plus hauts sommets des continents. Chaque corrigé a son schéma, étape par étape, avec le piège nommé. PDF à imprimer.",
};

export default function ExercicesReperage4ePage() {
  return <FicheExercicesClient fiche={exercicesReperage4e} />;
}
