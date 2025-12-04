import type { Metadata } from "next";
import DirectionClient from "./DirectionClient";

export const metadata: Metadata = {
  title: "Espace Direction – Accès réservé",
  description:
    "Espace confidentiel réservé aux chefs d’établissement : offre pilote, licences, accompagnement EleveAI.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DirectionPage() {
  return <DirectionClient />;
}
