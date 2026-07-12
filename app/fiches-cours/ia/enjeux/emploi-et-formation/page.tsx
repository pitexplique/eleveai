// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheEmploiEtFormation,
  slidesEmploiEtFormation,
} from "@/lib/fiches/ia-enjeux-emploi-et-formation";

export const metadata: Metadata = {
  title: "IA, emploi et formation — fiche de cours | EleveAI",
  description:
    "Métiers transformés, nouveaux métiers, travailleurs du clic et formation tout au long de la vie : la fiche de cours complète sur l'IA et l'emploi (référentiel Pix IA, Enjeux), à lire ou réviser en flashcards.",
};

export default function EmploiEtFormationPage() {
  return (
    <FicheCoursClient
      fiche={ficheEmploiEtFormation}
      slides={slidesEmploiEtFormation}
    />
  );
}
