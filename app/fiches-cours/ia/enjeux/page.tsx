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
  title: "IA — Enjeux : cours et exercices corrigés",
  description:
    "Les 5 fiches du domaine Enjeux du cadre Pix : l'empreinte environnementale de l'IA, sa gouvernance, l'éthique et la transparence, l'emploi et la formation, et les enjeux culturels et sociétaux. À lire en ligne ou à imprimer en PDF.",
};

export default function FichesIaEnjeuxPage() {
  return <SommaireClasse matiere="ia" niveau="enjeux" />;
}
