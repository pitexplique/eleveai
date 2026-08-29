// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheOralEchanger6e,
  slidesOralEchanger6e,
} from "@/lib/fiches/francais-6e-oral-echanger";

export const metadata: Metadata = {
  title: "Participer à un débat en 6e (2026-2027) : échanger à l'oral",
  description:
    "Programme de français 6e 2026-2027 : les codes de l'échange et le tour de parole, argumenter en donnant son avis ET une raison, intervenir en tenant compte de ce qui vient d'être dit — reprendre avant d'ajouter, localiser un désaccord — et porter un regard critique précis sur un oral. Pourquoi un débat de classe n'avance que si les interventions se répondent. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function OralEchangerSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheOralEchanger6e}
      slides={slidesOralEchanger6e}
    />
  );
}
