// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheEnjeuxCulturelsSocietaux,
  slidesEnjeuxCulturelsSocietaux,
} from "@/lib/fiches/ia-enjeux-enjeux-culturels-societaux";

export const metadata: Metadata = {
  title: "Les enjeux culturels et sociétaux de l'IA — fiche de cours | EleveAI",
  description:
    "Biais, désinformation, diversité culturelle, droits des créateurs : la fiche de cours complète sur les enjeux culturels et sociétaux de l'IA (référentiel Pix, Enjeux), à lire, imprimer ou réviser en flashcards.",
};

export default function EnjeuxCulturelsSocietauxPage() {
  return (
    <FicheCoursClient
      fiche={ficheEnjeuxCulturelsSocietaux}
      slides={slidesEnjeuxCulturelsSocietaux}
    />
  );
}
