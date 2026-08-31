// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheEcritureProduireCm1,
  slidesEcritureProduireCm1,
} from "@/lib/fiches/francais-cm1-ecriture-produire";

export const metadata: Metadata = {
  title: "Écrire un texte qui se tient en CM1 (2026-2027)",
  description:
    "Programme de français CM1 2026-2027 : construire des phrases claires et correctement ponctuées, organiser un paragraphe, écrire un court récit ou une description, et découvrir ce qui rend un texte cohérent. Pourquoi des phrases justes mises bout à bout ne font qu'une liste, et quels connecteurs en font un texte. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function EcritureProduireCm1Page() {
  return (
    <FicheCoursClient
      fiche={ficheEcritureProduireCm1}
      slides={slidesEcritureProduireCm1}
    />
  );
}
