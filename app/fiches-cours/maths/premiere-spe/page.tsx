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
  title: "Maths 1re spé : cours et exercices corrigés",
  description:
    "La dérivation en spécialité maths de Première : nombre dérivé, tangente, fonction dérivée et sens de variation. La fiche de cours complète, avec les propriétés dessinées, des exemples corrigés et des exercices. À lire en ligne ou à imprimer en PDF.",
};

export default function FichesMathsPremiereSpePage() {
  return <SommaireClasse matiere="maths" niveau="premiere-spe" />;
}
