// Sommaire d'une classe : la donnée vit dans lib/fiches/registre.ts, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié), comme les pages
// de notion. La liste des fiches n'est PAS écrite ici — voir SommaireClasse.
//
// ⭐ 26/08/2026 — LE TITRE SUIT LA CONVENTION DES FICHES : « cours et exercices
// corrigés » est la requête tapée, « fiche de cours » est le nom de la
// collection et reste dans le H1 et le fil d'Ariane. Voir la note longue en
// tête de app/fiches-cours/page.tsx.

import type { Metadata } from "next";
import SommaireClasse from "@/components/fiches/SommaireClasse";

export const metadata: Metadata = {
  title: "Maths CM2 : cours et exercices corrigés",
  description:
    "Les 28 notions du programme de CM2 en fiches : nombres entiers et décimaux, fractions, multiplication, division, proportionnalité, pourcentages, périmètres, aires, symétrie, angles, solides, tableaux et graphiques. À lire en ligne ou à imprimer en PDF.",
};

export default function FichesMathsCm2Page() {
  return <SommaireClasse matiere="maths" niveau="cm2" />;
}
