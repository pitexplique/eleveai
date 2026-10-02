// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).
// ⭐ 02/10/2026 : née de la coupe de « Ratios et pourcentages » en deux
// notions ; l'ancienne adresse `prop-ratio-pourcentage` redirige ici.

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  fichePourcentages4e,
  slidesPourcentages4e,
} from "@/lib/fiches/maths-4e-pourcentages";

export const metadata: Metadata = {
  title: "Les pourcentages en 4e : calcul mental, coefficient multiplicateur, évolutions | Cours",
  description:
    "Fiche de cours de 4e sur les pourcentages : tout part de 10 %, p % d'un nombre, retrouver un taux ou un total, le coefficient multiplicateur, et pourquoi + 20 % puis − 20 % ne ramène pas au départ. Exemples corrigés et exercices.",
};

export default function PourcentagesQuatriemePage() {
  return <FicheCoursClient fiche={fichePourcentages4e} slides={slidesPourcentages4e} />;
}
