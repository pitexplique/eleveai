import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesEchelles4e } from "@/lib/fiches-exercices/maths-4e-echelles";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Agrandissement,
// réduction et échelles ») : cette page répond à « exercices corrigés échelle
// 4e », l'autre au cours.
export const metadata: Metadata = {
  title: "Échelles 4e : 20 exercices corrigés, carte, plan, agrandissement, aires et volumes (PDF)",
  description:
    "Vingt exercices corrigés de 4e : lire une échelle, passer de la carte au terrain et du terrain au plan en convertissant, retrouver une échelle ou un rapport d'agrandissement, puis l'effet d'un rapport k sur les aires (k²) et les volumes (k³). Problèmes : le marathon au bout d'une ficelle, le bassin olympique, les grêlons, la forêt amazonienne sur la carte. Rappel de cours avant chaque niveau, corrigé étape par étape avec un dessin à l'échelle, PDF à imprimer.",
};

export default function ExercicesEchelles4ePage() {
  return <FicheExercicesClient fiche={exercicesEchelles4e} />;
}
