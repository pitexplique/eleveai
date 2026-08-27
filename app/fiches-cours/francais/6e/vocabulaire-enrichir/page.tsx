// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheVocabulaireEnrichir6e,
  slidesVocabulaireEnrichir6e,
} from "@/lib/fiches/francais-6e-vocabulaire-enrichir";

export const metadata: Metadata = {
  title: "Comprendre un mot inconnu en 6e : contexte et sens figuré",
  description:
    "Programme de français 6e (cycle 3) : deviner le sens d'un mot inconnu grâce à la phrase qui l'entoure, démonter un mot en préfixe, radical et suffixe, choisir sa stratégie dans l'ordre — déduire, vérifier, chercher — et reconnaitre un emploi au sens figuré avec le test de la caméra. L'indice dessiné sur la phrase, les mots démontés en wagons, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function VocabulaireEnrichirSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheVocabulaireEnrichir6e}
      slides={slidesVocabulaireEnrichir6e}
    />
  );
}
