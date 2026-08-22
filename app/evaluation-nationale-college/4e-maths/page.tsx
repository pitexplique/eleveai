import type { Metadata } from "next";
import Epreuve4eMathsClient from "./Epreuve4eMathsClient";

export const metadata: Metadata = {
  title:
    "Évaluation nationale de 4e en maths — l'épreuve blanche, 50 minutes, corrigée | EleveAI",
  // ⚠️ 160 CARACTÈRES, PAS UN DE PLUS (Bing Webmaster, 22/08 : « Meta
  // Description too long »). Celle-ci en faisait 708 — les 548 derniers
  // n'ont jamais été lus par personne : le moteur coupe vers 157 et le
  // snippet s'arrêtait au milieu du mot « défilen… ». Ce qui tombait, c'était
  // la fin — donc « Gratuit, sans publicité », l'argument qui fait cliquer.
  // Le détail des domaines et des notions vit dans la PAGE, où il sert.
  description:
    "Évaluation nationale de 4e en maths : l'épreuve blanche, au volume du sujet officiel — 62 questions en 50 minutes, sur le programme de 5e. Gratuit.",
  keywords: [
    "évaluation nationale 4e maths",
    "évaluation nationale 4e s'entraîner",
    "épreuve blanche évaluation nationale 4e",
    "évaluation de rentrée quatrième mathématiques",
    "test de rentrée 4e maths",
    "programme de 5e révision",
    "nombres relatifs 5e",
  ],
  alternates: {
    canonical: "https://www.eleveai.fr/evaluation-nationale-college/4e-maths",
  },
};

export default function Page() {
  return <Epreuve4eMathsClient />;
}
