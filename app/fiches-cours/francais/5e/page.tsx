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
  title: "Français 5e : cours et exercices corrigés (programme 2026-2027)",
  description:
    "Les 14 notions du nouveau programme de 5e en fiches : types de phrase et ponctuation, fonctions, groupe nominal, chaînes d'accord, participe passé, reprises, passé simple et conditionnel, discours rapporté, vocabulaire, orthographe et registres. À lire en ligne ou à imprimer en PDF.",
};

export default function FichesFrancaisCinquiemePage() {
  return <SommaireClasse matiere="francais" niveau="5e" />;
}
