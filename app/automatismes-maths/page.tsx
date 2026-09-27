import type { Metadata } from "next";
import AutomatismesClient from "./AutomatismesClient";

// ⚠️ Pas de « — EleveAI » ici : le layout racine l'ajoute déjà.
export const metadata: Metadata = {
  // Titre validé par Frédéric le 24/09/2026 (« de la 6e à la 1re ») ; la plage
  // corrigée le 27/09, quand le CM1, le CM2 et la terminale sont arrivés.
  title: "Automatismes de maths corrigés, du CM1 à la terminale",
  description:
    "Des séries d'automatismes toujours nouvelles, du calcul mental du CM1 à la première partie du brevet et à l'épreuve anticipée de première : questions courtes, sans calculatrice, corrigées, chaque question lue à voix haute. Par thème ou tout mélangé, avec un bilan à la fin.",
  alternates: { canonical: "/automatismes-maths" },
};

export default function AutomatismesPage() {
  return <AutomatismesClient />;
}
