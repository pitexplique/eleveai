// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheFluenceLectureCm1,
  slidesFluenceLectureCm1,
} from "@/lib/fiches/francais-cm1-fluence-lecture";

export const metadata: Metadata = {
  title: "Lire avec fluidité en CM1 : 110 mots par minute (2026-2027)",
  description:
    "Programme de français CM1 2026-2027 : lire une page sans effort, respecter la ponctuation et les groupes de mots, et reconnaitre les mots fréquents et irréguliers. Pourquoi 110 mots par minute est un thermomètre et non une consigne, pourquoi « femme » et « monsieur » ne se déchiffrent pas, et pourquoi on progresse en relisant le même texte. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function FluenceLectureCm1Page() {
  return (
    <FicheCoursClient
      fiche={ficheFluenceLectureCm1}
      slides={slidesFluenceLectureCm1}
    />
  );
}
