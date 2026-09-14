import type { Metadata } from "next";
import ParcoursClient from "./ParcoursClient";
import BoiteAOutils from "@/components/BoiteAOutils";
import FloatingCoach from "@/components/FloatingCoach";

// ⚠️ PAS DE « - EleveAI » DANS LE TITRE : le layout racine applique déjà le
// gabarit « %s — EleveAI ». L'ancien titre donnait donc, en vrai, « Parcours
// Maths - EleveAI — EleveAI ». Même faute que sur l'accueil, corrigée le 06/08.
export const metadata: Metadata = {
  // 14/09/2026 : « Évaluation annuelle » remplace « Parcours ». Le reste du titre
  // raccourcit pour tenir, avec « — EleveAI », sous les ~60 signes qu'affiche Google.
  title: "Évaluation annuelle de maths, du CP à la Terminale",
  description:
    "Une évaluation pour savoir où tu en es vraiment : quelques questions par notion, un bilan clair, et le coach qui reprend ce qui coince. Du CP à la Terminale, gratuit.",
  alternates: { canonical: "/parcours" },
};

export default function ParcoursPage() {
  return (
    <>
      <ParcoursClient />
      <BoiteAOutils />
      <FloatingCoach />
    </>
  );
}