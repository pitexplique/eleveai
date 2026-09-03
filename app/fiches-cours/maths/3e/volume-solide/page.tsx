// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheVolumes3e, slidesVolumes3e } from "@/lib/fiches/maths-3e-volumes";

export const metadata: Metadata = {
  title: "Calculer un volume — 3e : cours et exercices corrigés",
  description:
    "Calculer le volume d'un pavé droit, d'un prisme, d'un cylindre et d'une boule, convertir en litres, comprendre pourquoi l'unité porte un exposant 3 et pourquoi un agrandissement de rapport k multiplie le volume par k³ : la fiche de cours complète en 3e, avec huit propriétés dessinées, quatre exemples corrigés, sept pièges et dix exercices.",
};

export default function VolumesTroisiemePage() {
  return <FicheCoursClient fiche={ficheVolumes3e} slides={slidesVolumes3e} />;
}
