import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheFonctionsSeconde,
  slidesFonctionsSeconde,
} from "@/lib/fiches/maths-seconde-fonctions";

export const metadata: Metadata = {
  title: "Fonctions : image, antécédent, courbe — 2de : cours et exercices corrigés",
  description:
    "Image et antécédent, courbe représentative, domaine de définition, lecture graphique, résolution de f(x) = k et comparaison de deux courbes : la fiche de cours complète des fonctions en seconde, avec 10 exercices corrigés, à lire, imprimer ou réviser en flashcards.",
};

export default function FonctionsSecondePage() {
  return (
    <FicheCoursClient
      fiche={ficheFonctionsSeconde}
      slides={slidesFonctionsSeconde}
    />
  );
}
