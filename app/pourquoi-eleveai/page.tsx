import type { Metadata } from "next";
import PourquoiEleveAIClient from "./PourquoiEleveAIClient";

export const metadata: Metadata = {
  // « Pourquoi EleveAI » est le nom de la page : `absolute` pour ne pas servir
  // « Pourquoi EleveAI — Plusieurs portes… — EleveAI ».
  title: { absolute: "Pourquoi EleveAI — Plusieurs portes pour apprendre les maths" },
  description:
    "EleveAI propose 8 portes d'entrée pour apprendre les maths : Coach Maths IA, Parcours, Brevet, Calcul rapide, English Maths, Défis… avec suivi de progression automatique.",
  alternates: { canonical: "/pourquoi-eleveai" },
};

export default function Page() {
  return <PourquoiEleveAIClient />;
}
