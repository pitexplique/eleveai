// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheProportionnalite3e, slidesProportionnalite3e } from "@/lib/fiches/maths-3e-proportionnalite";

export const metadata: Metadata = {
  title: "Proportionnalité, pourcentages et vitesse — 3e : cours et exercices corrigés",
  description:
    "Reconnaître une situation de proportionnalité, utiliser un tableau et le produit en croix, calculer un pourcentage, appliquer un coefficient multiplicateur, comprendre pourquoi deux évolutions successives se multiplient au lieu de s'additionner, et résoudre les problèmes de vitesse, de débit et de densité : la fiche de cours complète en 3e, avec huit propriétés dessinées, quatre exemples corrigés, sept pièges et dix exercices.",
};

export default function ProportionnaliteTroisiemePage() {
  return <FicheCoursClient fiche={ficheProportionnalite3e} slides={slidesProportionnalite3e} />;
}
