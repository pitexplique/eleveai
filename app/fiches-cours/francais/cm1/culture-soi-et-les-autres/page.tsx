// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheCultureSoiEtLesAutresCm1,
  slidesCultureSoiEtLesAutresCm1,
} from "@/lib/fiches/francais-cm1-culture-soi-et-les-autres";

export const metadata: Metadata = {
  title: "Morale, poésie et rapport aux autres en CM1 (2026-2027)",
  description:
    "Programme de français CM1 2026-2027 : comprendre et interroger la morale d'une fable, savourer les images de la poésie, se découvrir dans le rapport aux autres. Pourquoi une histoire ne dit pas ce qu'elle veut dire mais le montre — un drap froissé pour la mer, un renard pour un flatteur, une dispute pour ce à quoi chacun tient. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function CultureSoiEtLesAutresCm1Page() {
  return (
    <FicheCoursClient
      fiche={ficheCultureSoiEtLesAutresCm1}
      slides={slidesCultureSoiEtLesAutresCm1}
    />
  );
}
