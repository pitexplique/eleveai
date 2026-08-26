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
  title: "Français 4e : cours et exercices corrigés (programme 2026-2027)",
  description:
    "Les 16 notions du nouveau programme de 4e en fiches : nature et fonction, phrase complexe et subordonnées, participe passé, chaines d'accord et passif, conjugaison, registres et paroles rapportées, vocabulaire, lecture, écriture et oral. À lire en ligne ou à imprimer en PDF.",
};

export default function FichesFrancaisQuatriemePage() {
  return <SommaireClasse matiere="francais" classe="4e" />;
}
