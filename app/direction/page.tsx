import type { Metadata } from "next";
import DirectionClient from "./DirectionClient";

export const metadata: Metadata = {
  title: "Espace Direction – Accès réservé",
  // ⚠️ Elle annonçait « offre pilote, licences » : la page pilote a été retirée
  // le 06/08 et les licences citaient 1 490 € et 2 490 €, sans rapport avec la
  // grille. Derrière le mot de passe, il n'y a qu'un tableau de bord.
  description:
    "Espace confidentiel réservé aux chefs d’établissement : tableau de bord de consommation de votre établissement.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DirectionPage() {
  return <DirectionClient />;
}
