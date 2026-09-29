import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesBissectriceAngle6e } from "@/lib/fiches-exercices/maths-6e-bissectrice-angle";

// ⚠️ Pas encore de fiche de cours de 6e pour cette notion : le titre vise
// « exercices corrigés bissectrice 6e ».
export const metadata: Metadata = {
  title: "Bissectrice d'un angle 6e : 20 exercices corrigés, pliage, rapporteur (PDF)",
  description:
    "Vingt exercices corrigés sur la bissectrice d'un angle en 6e : la reconnaître (deux angles égaux), la tracer par pliage puis au rapporteur, calculer la moitié ou le double d'un angle, enchaîner les bissectrices, angle saillant. Problèmes : tarte en parts égales, deux bissectrices perpendiculaires, programme de construction, projecteur de théâtre. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesBissectriceAngle6ePage() {
  return <FicheExercicesClient fiche={exercicesBissectriceAngle6e} />;
}
