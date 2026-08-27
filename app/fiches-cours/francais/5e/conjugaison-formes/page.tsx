// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheConjugaisonFormes5e,
  slidesConjugaisonFormes5e,
} from "@/lib/fiches/francais-5e-conjugaison-formes";

export const metadata: Metadata = {
  title: "La forme verbale en 5e (2026-2027) : radical, terminaison, personne",
  description:
    "Programme de français 5e 2026-2027 : retrouver l'infinitif d'une forme qui le cache, lire dans la terminaison le temps ET la personne, conjuguer les verbes dont le radical change, et composer la forme verbale demandée. Le verbe démonté en wagons, les six personnes en tableau avec la variation en relief, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function ConjugaisonFormesCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheConjugaisonFormes5e}
      slides={slidesConjugaisonFormes5e}
    />
  );
}
