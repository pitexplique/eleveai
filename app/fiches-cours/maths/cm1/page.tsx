// Sommaire d'une classe : la donnée vit dans lib/fiches/registre.ts, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié), comme celle du
// CM2. La liste des fiches n'est PAS écrite ici — voir SommaireClasse.
// ⭐ 26/10/2026 : ouverte avec la première fiche de maths du CM1 (les fractions).

import type { Metadata } from "next";
import SommaireClasse from "@/components/fiches/SommaireClasse";

export const metadata: Metadata = {
  title: "Maths CM1 : cours et exercices corrigés",
  description:
    "Les fiches de cours de maths du CM1 : les fractions (lire, représenter, placer sur la droite, comparer, fractions égales et décimales). À lire en ligne ou à imprimer en PDF.",
};

export default function FichesMathsCm1Page() {
  return <SommaireClasse matiere="maths" niveau="cm1" />;
}
