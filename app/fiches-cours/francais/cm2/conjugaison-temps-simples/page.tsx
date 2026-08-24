import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheConjugaisonTempsSimplesCm2,
  slidesConjugaisonTempsSimplesCm2,
} from "@/lib/fiches/francais-cm2-conjugaison-temps-simples";

export const metadata: Metadata = {
  title: "Présent, imparfait, futur — CM2 : cours et exercices corrigés",
  description:
    "Trouver l'infinitif et le groupe d'un verbe, repérer le radical, et conjuguer au présent, à l'imparfait et au futur — y compris les verbes irréguliers du programme : la fiche de cours de conjugaison CM2, les six personnes dessinées pour voir ce qui bouge.",
};

export default function ConjugaisonTempsSimplesCm2Page() {
  return (
    <FicheCoursClient
      fiche={ficheConjugaisonTempsSimplesCm2}
      slides={slidesConjugaisonTempsSimplesCm2}
    />
  );
}
