// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheIaDansUneOrganisation,
  slidesIaDansUneOrganisation,
} from "@/lib/fiches/ia-usages-ia-dans-une-organisation";

export const metadata: Metadata = {
  title: "L'IA dans une organisation — fiche de cours",
  description:
    "Identifier le besoin, choisir l'outil, protéger les données, charte d'usage et RAG : la fiche de cours complète pour utiliser l'IA dans une organisation (référentiel Pix, domaine Usages).",
};

export default function IaDansUneOrganisationPage() {
  return (
    <FicheCoursClient
      fiche={ficheIaDansUneOrganisation}
      slides={slidesIaDansUneOrganisation}
    />
  );
}
