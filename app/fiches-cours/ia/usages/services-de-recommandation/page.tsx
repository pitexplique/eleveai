// Fiche IA « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheServicesDeRecommandation,
  slidesServicesDeRecommandation,
} from "@/lib/fiches/ia-usages-services-de-recommandation";

export const metadata: Metadata = {
  title: "Les services de recommandation — fiche de cours | EleveAI",
  description:
    "Avantages, limites et contrôle de la personnalisation : bulle de filtre, chambre d'écho, réglages. La fiche de cours IA complète (référentiel Pix, Usages), à lire ou réviser en flashcards.",
};

export default function ServicesDeRecommandationPage() {
  return (
    <FicheCoursClient
      fiche={ficheServicesDeRecommandation}
      slides={slidesServicesDeRecommandation}
    />
  );
}
