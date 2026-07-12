// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheEmpreinteEnvironnementale,
  slidesEmpreinteEnvironnementale,
} from "@/lib/fiches/ia-enjeux-empreinte-environnementale";

export const metadata: Metadata = {
  title: "L'empreinte environnementale de l'IA — fiche de cours | EleveAI",
  description:
    "Énergie des centres de calcul, ressources rares, IA frugale : la fiche de cours complète sur l'empreinte environnementale de l'IA (référentiel Pix, Enjeux), à lire ou réviser en flashcards.",
};

export default function EmpreinteEnvironnementalePage() {
  return (
    <FicheCoursClient
      fiche={ficheEmpreinteEnvironnementale}
      slides={slidesEmpreinteEnvironnementale}
    />
  );
}
