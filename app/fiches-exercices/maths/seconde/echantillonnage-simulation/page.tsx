import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesEchantillonnageSeconde } from "@/lib/fiches-exercices/maths-seconde-echantillonnage";

export const metadata: Metadata = {
  title: "Échantillonnage en seconde : 20 exercices corrigés, fluctuation et simulation (PDF)",
  description:
    "Vingt exercices corrigés d'échantillonnage en seconde : fluctuation, intervalle p ± 1/√n, loi des grands nombres, simulation en Python, estimation d'une probabilité. Un sondage à 48 contre 52 et sa marge d'erreur, les naissances de garçons, π estimé au hasard, les truites d'un lac comptées par capture-recapture. De vrais tirages dans les corrigés. PDF à imprimer.",
};

export default function ExercicesEchantillonnageSecondePage() {
  return <FicheExercicesClient fiche={exercicesEchantillonnageSeconde} />;
}
