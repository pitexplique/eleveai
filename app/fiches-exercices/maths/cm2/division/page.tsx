import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDivisionCm2 } from "@/lib/fiches-exercices/maths-cm2-division";

export const metadata: Metadata = {
  title: "Division CM2 : 20 exercices corrigés, partager, poser, reste, virgule (PDF)",
  description:
    "Vingt exercices corrigés de CM2, avec champ réponse et clavier maths. Partager en parts égales, vérifier une division par une multiplication, poser une division, comprendre le reste, continuer après la virgule. Des voitures, un album photo, du tissu, des cars, de la confiture, une course de relais et un jardin. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesDivisionCm2Page() {
  return <FicheExercicesClient fiche={exercicesDivisionCm2} />;
}
