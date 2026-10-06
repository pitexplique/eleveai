import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAccords6e } from "@/lib/fiches-exercices/francais-6e-grammaire-accords";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les accords et les
// homophones ») : cette page répond à « exercices accords 6e », « dictée 6e ».
export const metadata: Metadata = {
  title: "Accords et homophones 6e : 20 exercices corrigés et 3 dictées avec Jules Verne (PDF)",
  description:
    "Vingt exercices corrigés d'orthographe grammaticale en 6e, à bord du Nautilus et autour du monde en 80 jours : accord dans le groupe nominal, accord sujet-verbe, participe passé avec être et avoir, homophones a/à, et/est, son/sont, on/ont. QCM, mots à entourer, lettres à corriger, quatre défis et trois dictées. Corrigé pas à pas, PDF à imprimer.",
};

export default function ExercicesAccords6ePage() {
  return <FicheExercicesClient fiche={exercicesAccords6e} />;
}
