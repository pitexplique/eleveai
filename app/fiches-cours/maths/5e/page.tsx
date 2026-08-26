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
  title: "Maths 5e : cours et exercices corrigés",
  description:
    "Les 20 notions du programme de 5e en fiches : nombres relatifs, calcul littéral, fractions, proportionnalité, ratios, divisibilité, triangles, parallélogramme, symétrie centrale, aires, volumes, statistiques, probabilités et algorithmique. À lire en ligne ou à imprimer en PDF.",
};

export default function FichesMathsCinquiemePage() {
  return <SommaireClasse matiere="maths" niveau="5e" />;
}
