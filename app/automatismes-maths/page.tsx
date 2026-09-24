import type { Metadata } from "next";
import AutomatismesClient from "./AutomatismesClient";

// ⚠️ Pas de « — EleveAI » ici : le layout racine l'ajoute déjà.
export const metadata: Metadata = {
  title: "Automatismes de maths : brevet et épreuve anticipée",
  description:
    "Des séries d'automatismes toujours nouvelles, au format de la première partie du brevet (3e) et de l'épreuve anticipée (première) : questions courtes, sans calculatrice, corrigées. Par thème ou tout mélangé, avec un bilan à la fin.",
  alternates: { canonical: "/automatismes-maths" },
};

export default function AutomatismesPage() {
  return <AutomatismesClient />;
}
