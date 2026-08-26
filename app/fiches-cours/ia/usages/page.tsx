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
  title: "IA — Usages : cours et exercices corrigés",
  description:
    "Les 5 fiches du domaine Usages du cadre Pix : ce que l'IA sait faire, utiliser une IA générative, évaluer l'information à l'ère de l'IA, les services de recommandation et l'IA dans une organisation. À lire en ligne ou à imprimer en PDF.",
};

export default function FichesIaUsagesPage() {
  return <SommaireClasse matiere="ia" niveau="usages" />;
}
