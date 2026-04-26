import type { Metadata } from "next";
import CalculRapideDefiClient from "./CalculRapideDefiClient";

export const metadata: Metadata = {
  title: "Défi calcul rapide | EleveAI",
  description: "Lance le défi du jour en calcul rapide.",
};

export default function CalculRapideDefiPage() {
  return <CalculRapideDefiClient />;
}