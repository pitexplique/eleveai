// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheDecimaux6e,
  slidesDecimaux6e,
} from "@/lib/fiches/maths-6e-decimaux";

export const metadata: Metadata = {
  title: "Les nombres décimaux — fiche de cours 6e | EleveAI",
  description:
    "Partie entière, virgule, dixièmes et centièmes : la fiche de cours complète des nombres décimaux en 6e, avec exemples corrigés et exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function DecimauxSixiemePage() {
  return <FicheCoursClient fiche={ficheDecimaux6e} slides={slidesDecimaux6e} />;
}
