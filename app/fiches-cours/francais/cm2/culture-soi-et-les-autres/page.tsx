// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheCultureSoiEtLesAutresCm2,
  slidesCultureSoiEtLesAutresCm2,
} from "@/lib/fiches/francais-cm2-culture-soi-et-les-autres";

export const metadata: Metadata = {
  title: "La morale d'une fable en CM2 (2026-2027) : l'interroger",
  description:
    "Programme de français CM2 2026-2027 : comprendre la morale d'une fable — et l'interroger, c'est-à-dire se demander si l'on est d'accord et pourquoi —, reconnaitre une valeur, comprendre qu'un conflit révèle ce à quoi chacun tient plutôt qu'il ne tranche, distinguer s'affirmer de s'imposer, et savourer le gout des mots en poésie. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function CultureSoiEtLesAutresCm2Page() {
  return (
    <FicheCoursClient
      fiche={ficheCultureSoiEtLesAutresCm2}
      slides={slidesCultureSoiEtLesAutresCm2}
    />
  );
}
