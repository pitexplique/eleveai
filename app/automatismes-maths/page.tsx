import type { Metadata } from "next";
import AutomatismesClient from "./AutomatismesClient";

// ⚠️ Pas de « — EleveAI » ici : le layout racine l'ajoute déjà.
export const metadata: Metadata = {
  // Titre validé par Frédéric le 24/09/2026.
  title: "Automatismes de maths, de la 6e à la 1re : séries corrigées",
  description:
    "Des séries d'automatismes toujours nouvelles, au format de la première partie du brevet (3e) et de l'épreuve anticipée (première) : questions courtes, sans calculatrice, corrigées. Par thème ou tout mélangé, avec un bilan à la fin.",
  alternates: { canonical: "/automatismes-maths" },
};

export default function AutomatismesPage() {
  return <AutomatismesClient />;
}
