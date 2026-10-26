import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheFractionMixteCM2,
  slidesFractionMixteCM2,
} from "@/lib/fiches/maths-cm2-fraction-mixte";

export const metadata: Metadata = {
  title: "Les fractions plus grandes que 1 — CM2 : cours et exercices corrigés",
  description:
    "Définition, propriétés, exemples corrigés et exercices : écrire une fraction comme un entier plus une fraction (7/4 = 1 + 3/4), regrouper en une seule fraction et encadrer entre deux entiers, en CM2. À lire, imprimer ou réviser en flashcards.",
};

export default function FractionMixteCM2Page() {
  return <FicheCoursClient fiche={ficheFractionMixteCM2} slides={slidesFractionMixteCM2} />;
}
