import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDependance4e } from "@/lib/fiches-exercices/maths-4e-dependance";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Dépendance entre deux
// grandeurs ») : cette page répond à « exercices corrigés tableau graphique
// programme de calcul 4e », l'autre au cours.
export const metadata: Metadata = {
  title: "Dépendance entre deux grandeurs 4e : 20 exercices corrigés, programme, tableau, graphique (PDF)",
  description:
    "Vingt exercices corrigés de 4e : suivre un programme de calcul et le remonter, lire un tableau et un graphique dans les deux sens, reconnaître quand une grandeur dépend d'une autre, et quand elle ne lui est pas proportionnelle. Problèmes : le ballon-sonde, le grillon thermomètre, freiner à temps, la carte de patinoire. Rappel de cours avant chaque niveau, corrigé étape par étape avec la lecture dessinée, PDF à imprimer.",
};

export default function ExercicesDependance4ePage() {
  return <FicheExercicesClient fiche={exercicesDependance4e} />;
}
