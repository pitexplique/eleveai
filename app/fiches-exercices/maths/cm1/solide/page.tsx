import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSolideCm1 } from "@/lib/fiches-exercices/maths-cm1-solide";

// ⚠️ Cette page répond à « exercices solides CM1 » : faces, arêtes, sommets,
// cube, pavé, prisme, pyramide, patrons.
export const metadata: Metadata = {
  title: "Solides CM1 : 20 exercices corrigés, faces, arêtes, sommets, patrons (PDF)",
  description:
    "Vingt exercices corrigés sur les solides au CM1 : reconnaître un cube, un pavé droit, un cylindre, un cône, une pyramide, une boule, compter les faces, les arêtes et les sommets (cachés compris), dire la forme des faces, reconnaître un patron de cube, de pavé ou de pyramide, décrire un prisme droit. Problèmes : une boîte de bonbons, une maquette en pailles, le patron d'un dé, le toit d'un kiosque. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesSolideCm1Page() {
  return <FicheExercicesClient fiche={exercicesSolideCm1} />;
}
