import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesExponentiellePremiere } from "@/lib/fiches-exercices/maths-premiere-exponentielle";

// ⚠️ Le titre et la description ne répètent PAS ceux de la fiche de cours
// (« La fonction exponentielle — 1re spé : propriétés, équations… cours et
// exercices corrigés ») : deux pages qui disent la même chose à Google se
// concurrencent. Celle-ci répond à « exercices corrigés exponentielle 1re ».
export const metadata: Metadata = {
  title:
    "Exponentielle 1re spé : 20 exercices corrigés, du plus simple au problème (PDF)",
  description:
    "Vingt exercices corrigés sur la fonction exponentielle en première spécialité : simplifier, résoudre e^a = e^b et les inéquations, dériver e^(at) et (ax + b)e^x, étudier les variations, modéliser un refroidissement et une croissance. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesExponentiellePremierePage() {
  return <FicheExercicesClient fiche={exercicesExponentiellePremiere} />;
}
