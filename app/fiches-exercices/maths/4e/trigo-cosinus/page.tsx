import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesCosinus4e } from "@/lib/fiches-exercices/maths-4e-cosinus";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Le cosinus d'un angle
// aigu ») : cette page répond à « exercices corrigés cosinus 4e », l'autre à
// « cours cosinus 4e ».
export const metadata: Metadata = {
  title: "Cosinus 4e : 20 exercices corrigés, calculer une longueur ou un angle (PDF)",
  description:
    "Vingt exercices corrigés de 4e sur le cosinus dans le triangle rectangle : repérer l'hypoténuse et le côté adjacent, écrire le cosinus, calculer une longueur, puis un angle avec la touche cos⁻¹, rédiger comme en devoir. Problèmes : un télésiège, des panneaux solaires, le funiculaire de Montmartre, un voilier qui remonte au vent, la vitesse de Paris autour de l'axe de la Terre, une traversée à la nage. Chaque corrigé est dessiné à l'échelle, étape par étape, avec le piège nommé. PDF à imprimer.",
};

export default function ExercicesCosinus4ePage() {
  return <FicheExercicesClient fiche={exercicesCosinus4e} />;
}
