// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).
//
// ⚠️ LE DOSSIER PORTE LE `notionId` DU COACH : `production_ecrite` ne peut
// atteindre que /fiches-cours/francais/cp/production-ecrite.

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheProductionEcriteCp,
  slidesProductionEcriteCp,
} from "@/lib/fiches/francais-cp-production-ecrite";

export const metadata: Metadata = {
  title: "Écrire une phrase à soi au CP (2026-2027) : légende, réponse, texte court",
  description:
    "Programme de français CP 2026-2027 : produire des écrits courts. Légender un dessin, écrire une phrase entière avec sa majuscule et son point, répondre à une question en phrase, et ranger deux ou trois phrases dans l'ordre. « chat tapis dort » n'est pas une phrase, et « Un chat. » ne dit rien. Réglure Seyès, dix exercices, corrigé sur page détachable.",
};

export default function ProductionEcriteCpPage() {
  return (
    <FicheCoursClient
      fiche={ficheProductionEcriteCp}
      slides={slidesProductionEcriteCp}
    />
  );
}
