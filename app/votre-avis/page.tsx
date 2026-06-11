import type { Metadata } from "next";
import VotreAvisClient from "./VotreAvisClient";

export const metadata: Metadata = {
  title: "Votre avis | EleveAI",
  description:
    "Aide-nous à améliorer EleveAI : signale un bug, propose une idée ou donne ton avis sur la plateforme.",
};

export default function VotreAvisPage() {
  return <VotreAvisClient />;
}
