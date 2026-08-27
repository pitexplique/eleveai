// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheVolumes4e, slidesVolumes4e } from "@/lib/fiches/maths-4e-volumes";

export const metadata: Metadata = {
  title: "Les volumes — 4e : cours et exercices corrigés",
  description:
    "Comprendre le volume comme une place occupée, appliquer la formule aire de base × hauteur au pavé droit, au prisme et au cylindre, et maîtriser les unités cubes (1 dm³ = 1 000 cm³) : la fiche de cours complète en 4e, avec les propriétés dessinées, trois exemples corrigés et des exercices.",
};

export default function VolumesQuatriemePage() {
  return <FicheCoursClient fiche={ficheVolumes4e} slides={slidesVolumes4e} />;
}
