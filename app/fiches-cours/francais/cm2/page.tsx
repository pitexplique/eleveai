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
  title: "Français CM2 : cours et exercices corrigés",
  description:
    "Les 8 notions du programme de CM2 en fiches : la phrase, la nature et la fonction des mots, la phrase complexe, les compléments du verbe, le présent, l'imparfait, le futur, les temps du récit et le participe passé. À lire en ligne ou à imprimer en PDF.",
};

export default function FichesFrancaisCm2Page() {
  return <SommaireClasse matiere="francais" niveau="cm2" />;
}
