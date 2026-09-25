import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSolides4e } from "@/lib/fiches-exercices/maths-4e-solides";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Solides et
// représentations ») : cette page répond à « exercices corrigés solides
// patrons vues 4e », l'autre à « cours solides et représentations 4e ».
export const metadata: Metadata = {
  title: "Solides, patrons et vues 4e : 20 exercices corrigés, perspective cavalière et sections (PDF)",
  description:
    "Vingt exercices corrigés de 4e : nommer un solide posé de travers, compter faces, arêtes et sommets, lire les vues d'un empilement de cubes, reconnaître un patron de cube et un patron de prisme, lire une perspective cavalière et ses pointillés, trouver la forme d'une section plane. Problèmes : le cristal de quartz, le silo à grain, le bassin de la piscine, le podium. Rappel de cours avant chaque niveau, corrigé étape par étape avec schémas, PDF à imprimer.",
};

export default function ExercicesSolides4ePage() {
  return <FicheExercicesClient fiche={exercicesSolides4e} />;
}
