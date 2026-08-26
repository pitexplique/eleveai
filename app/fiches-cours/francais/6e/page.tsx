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
  title: "Français 6e : cours et exercices corrigés",
  description:
    "Les 9 notions du programme de 6e en fiches : attribut du sujet, compléments du verbe, groupe nominal, pronoms et antécédent, phrase complexe, accords et homophones, formes verbales, temps composés, impératif, conditionnel et valeur des temps. À lire en ligne ou à imprimer en PDF.",
};

export default function FichesFrancaisSixiemePage() {
  return <SommaireClasse matiere="francais" niveau="6e" />;
}
