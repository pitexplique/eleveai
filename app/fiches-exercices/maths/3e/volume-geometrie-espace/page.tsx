import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesGeometrieEspace3e } from "@/lib/fiches-exercices/maths-3e-geometrie-espace";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« La géométrie dans
// l'espace ») : cette page répond à « exercices corrigés géométrie dans
// l'espace 3e », l'autre à « cours géométrie dans l'espace 3e ».
export const metadata: Metadata = {
  title: "Géométrie dans l'espace 3e : 20 exercices corrigés, repérage dans le pavé et sur la sphère (PDF)",
  description:
    "Vingt exercices corrigés de 3e : reconnaître les solides et compter faces, arêtes et sommets, lire une perspective cavalière et ses pointillés, trouver la forme d'une section, repérer un point dans un pavé droit (abscisse, ordonnée, altitude) et une ville sur la Terre (latitude, longitude). Problèmes : le drone d'une salle de sport, les conteneurs d'un cargo, de Stockholm au Cap sur un même méridien, les antipodes, le ballon de football. Rappel de cours avant chaque niveau, corrigé étape par étape avec schémas, PDF à imprimer.",
};

export default function ExercicesGeometrieEspace3ePage() {
  return <FicheExercicesClient fiche={exercicesGeometrieEspace3e} />;
}
