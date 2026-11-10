import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSolideCm2 } from "@/lib/fiches-exercices/maths-cm2-solide";

export const metadata: Metadata = {
  title: "Solides CM2 : 20 exercices corrigés, faces, arêtes, sommets, patrons (PDF)",
  description:
    "Vingt exercices corrigés de CM2, avec champ réponse et clavier maths. Reconnaître un cube, un pavé, un cylindre, un cône, une pyramide, compter faces, arêtes et sommets, trouver le bon patron et la face d'en face. Une épicerie, une tente, un dé, une chocolaterie, un cube peint et les cartons de la pâtissière. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesSolideCm2Page() {
  return <FicheExercicesClient fiche={exercicesSolideCm2} />;
}
