import type { Metadata } from "next";
import Epreuve4eFrancaisClient from "./Epreuve4eFrancaisClient";

export const metadata: Metadata = {
  title:
    "Évaluation nationale de 4e en français — l'épreuve blanche, 50 minutes, corrigée | EleveAI",
  description:
    "L'épreuve blanche de l'évaluation nationale de 4e en français : l'épreuve entière, au volume du sujet officiel — 67 questions en 50 minutes, qui défilent une par une, sans retour en arrière. Six domaines : dix questions sur un texte littéraire, neuf sur un groupement de documents, quinze de lexique, douze de grammaire, douze d'orthographe et neuf sur un enregistrement à écouter. Sur le programme de 5e. À la fin, un groupe de maîtrise par domaine, dans les mots du bilan officiel, et de quoi retravailler chaque compétence qui a coincé. Gratuit, sans publicité.",
  keywords: [
    "évaluation nationale 4e français",
    "évaluation nationale 4e s'entraîner",
    "épreuve blanche évaluation nationale 4e français",
    "évaluation de rentrée quatrième français",
    "test de rentrée 4e français",
    "valeur des temps 5e",
    "programme de 5e français révision",
  ],
  alternates: {
    canonical: "https://www.eleveai.fr/evaluation-nationale-college/4e-francais",
  },
};

export default function Page() {
  return <Epreuve4eFrancaisClient />;
}
