import type { Metadata } from "next";
import FicheCoursIa from "@/components/fiches/FicheCoursIa";
import { ficheLlm } from "@/lib/fiches-ia";

export const metadata: Metadata = {
  title: "Fiche IA — Les grands modèles de langage",
  description:
    "Comment fonctionne un chatbot : prédire le mot suivant, entraînement, hallucinations. Fiche de cours IA (référentiel Pix, Fondements).",
};

export default function Page() {
  return <FicheCoursIa fiche={ficheLlm} />;
}
