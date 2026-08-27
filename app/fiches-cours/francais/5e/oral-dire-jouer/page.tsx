// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheOralDireJouer5e,
  slidesOralDireJouer5e,
} from "@/lib/fiches/francais-5e-oral-dire-jouer";

export const metadata: Metadata = {
  title: "Dire, lire et jouer un texte en 5e (2026-2027) : la voix et le corps",
  description:
    "Programme de français 5e 2026-2027 : jouer une scène de comédie avec les cinq gestes qui la portent — la surprise, le mensonge, l'aparté, la répétition, la peur que le corps trahit — et se servir des ressources de la voix et du corps : le silence, le mot appuyé, la hauteur, le regard, le débit. L'écart entre ce que la voix dit et ce que le corps fait, dessiné sur la réplique, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function OralDireJouerCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheOralDireJouer5e}
      slides={slidesOralDireJouer5e}
    />
  );
}
