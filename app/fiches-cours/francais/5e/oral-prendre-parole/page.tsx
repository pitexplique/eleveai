// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheOralPrendreParole5e,
  slidesOralPrendreParole5e,
} from "@/lib/fiches/francais-5e-oral-prendre-parole";

export const metadata: Metadata = {
  title: "Prendre la parole et débattre en 5e (2026-2027) : justifier son avis",
  description:
    "Programme de français 5e 2026-2027 : présenter une lecture en cinq temps sans raconter la fin, justifier son point de vue avec les trois pièces — l'avis, la raison, le passage —, entrer dans un dialogue en reprenant le dernier mot de l'autre, et intervenir dans un débat en respectant ses règles. Les trois pièces dessinées sur la phrase, et le crochet manquant qui montre ce qui manque, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function OralPrendreParoleCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheOralPrendreParole5e}
      slides={slidesOralPrendreParole5e}
    />
  );
}
