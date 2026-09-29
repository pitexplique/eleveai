import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFonctionLogarithmeTerminale } from "@/lib/fiches-exercices/maths-terminale-fonction-logarithme";

export const metadata: Metadata = {
  title: "Fonction logarithme népérien terminale spé : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur la fonction logarithme népérien en terminale spécialité : définition, propriétés algébriques, équations et inéquations, limites et croissances comparées démontrées, dérivée de ln u, seuils de suites géométriques, pH et décibels. Problèmes de bac : bénéfice d'un atelier, oiseaux d'une réserve, e^π ou π^e, bruit d'un atelier, avec programmes Python. Rappel de cours avant chaque niveau, courbes dessinées, PDF à imprimer.",
};

export default function ExercicesFonctionLogarithmeTerminalePage() {
  return <FicheExercicesClient fiche={exercicesFonctionLogarithmeTerminale} />;
}
