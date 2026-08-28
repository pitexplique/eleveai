// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheCultureEntrees5e,
  slidesCultureEntrees5e,
} from "@/lib/fiches/francais-5e-culture-entrees";

export const metadata: Metadata = {
  title: "Culture littéraire en 5e (2026-2027) : les quatre entrées",
  description:
    "Programme de français 5e 2026-2027 : les quatre entrées de l'année. Devenir héroïne ou héros — de l'épopée au héros ordinaire, qui perd en superbe et gagne en banalité ; voyager en poésie par les sonorités, l'image, le rythme et les noms de lieux ; le théâtre qui met la société sens dessus dessous — renversement, quiproquo, répétition, déguisement ; et les figures de fable, chacune facette de l'être humain. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function CultureEntreesCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheCultureEntrees5e}
      slides={slidesCultureEntrees5e}
    />
  );
}
