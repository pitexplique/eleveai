import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesTransformations3e } from "@/lib/fiches-exercices/maths-3e-transformations";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Transformations et
// homothétie ») : cette page répond à « exercices corrigés homothétie 3e »,
// l'autre à « cours homothétie 3e ».
export const metadata: Metadata = {
  title: "Homothétie et transformations 3e : 20 exercices corrigés avec figures (PDF)",
  description:
    "Vingt exercices corrigés de 3e sur quadrillage : symétrie axiale et centrale, translation, rotation d'un quart de tour, puis l'homothétie — la reconnaître, la construire (rapport négatif compris), retrouver son centre et son rapport, et ce qu'elle fait aux longueurs (× k) et aux aires (× k²). Problèmes : la chambre noire, le vidéoprojecteur, la frise, la carte au 1/25 000. Rappel de cours avant chaque niveau, corrigé étape par étape avec la figure et son image dessinées, PDF à imprimer.",
};

export default function ExercicesTransformations3ePage() {
  return <FicheExercicesClient fiche={exercicesTransformations3e} />;
}
