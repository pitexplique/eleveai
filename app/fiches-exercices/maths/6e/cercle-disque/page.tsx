import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesCercleDisque6e } from "@/lib/fiches-exercices/maths-6e-cercle-disque";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Le cercle et le
// disque ») : cette page répond à « exercices corrigés cercle périmètre 6e ».
export const metadata: Metadata = {
  title: "Cercle et périmètre du disque 6e : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur le cercle et le disque en 6e : rayon, diamètre et corde, point sur le cercle, dans le disque ou dehors, points à une distance donnée, tour proportionnel au diamètre, périmètre avec π ≈ 3,14. Problèmes : piste du collège, roue du géomètre, deux arroseurs, ronde dans la cour. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesCercleDisque6ePage() {
  return <FicheExercicesClient fiche={exercicesCercleDisque6e} />;
}
