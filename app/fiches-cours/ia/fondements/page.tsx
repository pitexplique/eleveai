// Sommaire d'un DOMAINE d'IA : la donnée vit dans lib/fiches/registre.ts,
// cette page n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).
//
// ⭐ 26/08/2026 — Frédéric : « les fiches existent en IA mais pas par classe,
// mais par niveau ». Le second segment de l'URL porte donc un DOMAINE Pix
// (fondements / usages / enjeux) là où les maths et le français portent une
// classe. Même page, même registre, même filtre — voir SommaireClasse.

import type { Metadata } from "next";
import SommaireClasse from "@/components/fiches/SommaireClasse";

export const metadata: Metadata = {
  title: "IA — Fondements : cours et exercices corrigés",
  description:
    "Les 6 fiches du domaine Fondements du cadre Pix : définir l'intelligence artificielle, l'apprentissage automatique, les modèles d'apprentissage, les grands modèles de langage, les algorithmes de recommandation et l'IA incarnée. À lire en ligne ou à imprimer en PDF.",
};

export default function FichesIaFondementsPage() {
  return <SommaireClasse matiere="ia" niveau="fondements" />;
}
