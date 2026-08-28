// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheEcritureReflechir5e,
  slidesEcritureReflechir5e,
} from "@/lib/fiches/francais-5e-ecriture-reflechir";

export const metadata: Metadata = {
  title: "Écrire pour réfléchir et mémoriser en 5e (2026-2027)",
  description:
    "Programme de français 5e 2026-2027 : planifier un devoir en partant de la fin qu'on veut atteindre, repérer l'idée principale d'un message — celle qui commande, et non le détail qui frappe même quand il est vrai —, et apprendre une leçon en la récrivant avec ses mots. Les cinq écrits qui font retenir, et pourquoi aucun d'eux ne se rend. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function EcritureReflechirCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheEcritureReflechir5e}
      slides={slidesEcritureReflechir5e}
    />
  );
}
