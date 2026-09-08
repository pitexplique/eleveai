import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheVariationsSeconde,
  slidesVariationsSeconde,
} from "@/lib/fiches/maths-seconde-variations";

export const metadata: Metadata = {
  title: "Variations et extremums — 2de : tableau de variations, cours et exercices corrigés",
  description:
    "Croissance et décroissance sur un intervalle, dresser un tableau de variations à partir d'une courbe, lire un maximum ou un minimum : la fiche de cours complète des variations en seconde, avec 10 exercices corrigés, à lire, imprimer ou réviser en flashcards.",
};

export default function VariationsSecondePage() {
  return (
    <FicheCoursClient
      fiche={ficheVariationsSeconde}
      slides={slidesVariationsSeconde}
    />
  );
}
