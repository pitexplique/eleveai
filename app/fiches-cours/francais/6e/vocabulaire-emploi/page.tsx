// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheVocabulaireEmploi6e,
  slidesVocabulaireEmploi6e,
} from "@/lib/fiches/francais-6e-vocabulaire-emploi";

export const metadata: Metadata = {
  title: "Registres de langue et polysémie en 6e : employer le mot juste",
  description:
    "Programme de français 6e (cycle 3) : employer un mot nouveau à la bonne place, choisir le registre de langue qui convient au destinataire, ranger les mots du plus familier au plus soutenu, employer un mot polysémique dans le bon contexte et écrire les mots fréquents sans hésiter. La classe du mot lue au-dessus de la phrase, l'échelle des registres dessinée, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function VocabulaireEmploiSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheVocabulaireEmploi6e}
      slides={slidesVocabulaireEmploi6e}
    />
  );
}
