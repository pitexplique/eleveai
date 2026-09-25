import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesTriangles4e } from "@/lib/fiches-exercices/maths-4e-triangles";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Le triangle pour
// démontrer ») : cette page répond à « exercices corrigés triangles 4e », « cas
// d'égalité des triangles exercices », l'autre au cours.
export const metadata: Metadata = {
  title: "Triangles 4e : 20 exercices corrigés, cas d'égalité, triangles semblables, hauteurs (PDF)",
  description:
    "Vingt exercices corrigés de 4e sur le triangle : somme des angles, inégalité triangulaire, hauteur, médiatrice et médiane, les trois cas d'égalité, triangles semblables et rapport, protocole de construction. Problèmes : la largeur d'une rivière par triangulation, l'ombre de l'obélisque de la Concorde, une ferme de charpente, une course d'orientation. Rappel de cours avant chaque niveau, corrigé étape par étape avec chaque triangle dessiné à l'échelle, PDF à imprimer.",
};

export default function ExercicesTriangles4ePage() {
  return <FicheExercicesClient fiche={exercicesTriangles4e} />;
}
