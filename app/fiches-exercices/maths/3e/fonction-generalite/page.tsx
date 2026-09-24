import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFonctions3e } from "@/lib/fiches-exercices/maths-3e-fonctions";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Fonctions : image et
// antécédent ») : cette page répond à « exercices corrigés fonctions 3e »,
// l'autre à « cours fonctions 3e ».
export const metadata: Metadata = {
  title: "Fonctions 3e : 20 exercices corrigés, image, antécédent, lecture graphique (PDF)",
  description:
    "Vingt exercices corrigés de 3e sur les fonctions : calculer une image, chercher un antécédent, lire une courbe et un tableau de tableur comme au brevet, traduire f(3) = 7 en mots, et le piège de l'image et de l'antécédent échangés. Problèmes : le dégagement d'un gardien, une randonnée en boucle, la boîte sans couvercle, une crue après l'orage. Rappel de cours avant chaque niveau, corrigé étape par étape avec la lecture dessinée, PDF à imprimer.",
};

export default function ExercicesFonctions3ePage() {
  return <FicheExercicesClient fiche={exercicesFonctions3e} />;
}
