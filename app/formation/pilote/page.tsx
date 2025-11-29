import type { Metadata } from "next";
import OffrePiloteClient from "./OffrePiloteClient";

export const metadata: Metadata = {
  title: "Offre Établissement Pilote – EleveAI",
  description:
    "Présentation confidentielle de l’offre EleveAI pour les établissements pilotes.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OffrePilotePage() {
  return <OffrePiloteClient />;
}

