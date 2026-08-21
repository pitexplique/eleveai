// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheConversions5e,
  slidesConversions5e,
} from "@/lib/fiches/maths-5e-conversions";

export const metadata: Metadata = {
  title: "Convertir les grandeurs — fiche de cours 5e",
  description:
    "Longueurs, masses, contenances et durées : changer d'unité, connaître le sens du changement, tout mettre dans la même unité avant de comparer. Fiche de cours de 5e avec propriétés dessinées, exemples corrigés et exercices.",
};

export default function ConversionsCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheConversions5e}
      slides={slidesConversions5e}
    />
  );
}
