// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheOralEcouterCm1,
  slidesOralEcouterCm1,
} from "@/lib/fiches/francais-cm1-oral-ecouter";

export const metadata: Metadata = {
  title: "Écouter une consigne en CM1 (2026-2027)",
  description:
    "Programme de français CM1 2026-2027 : écouter pour comprendre un texte ou une consigne, et reformuler une information entendue. Pourquoi tant d'exercices ratés ont simplement été commencés trop tôt, et pourquoi redire la consigne avec ses mots est le seul test qui marche. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function OralEcouterCm1Page() {
  return (
    <FicheCoursClient
      fiche={ficheOralEcouterCm1}
      slides={slidesOralEcouterCm1}
    />
  );
}
