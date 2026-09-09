import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheEquationsSeconde,
  slidesEquationsSeconde,
} from "@/lib/fiches/maths-seconde-equations";

export const metadata: Metadata = {
  title: "Équations et inéquations du premier degré — 2de : cours et exercices corrigés",
  description:
    "Résoudre une équation et une inéquation du premier degré en seconde : la balance, le signe qui se retourne quand on divise par un négatif, l'ensemble des solutions en intervalle et la mise en équation d'un problème. Cours, méthode et 10 exercices corrigés.",
};

export default function EquationsSecondePage() {
  return (
    <FicheCoursClient
      fiche={ficheEquationsSeconde}
      slides={slidesEquationsSeconde}
    />
  );
}
