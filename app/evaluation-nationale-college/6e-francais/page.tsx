import type { Metadata } from "next";
import Epreuve6eFrancaisClient from "./Epreuve6eFrancaisClient";

export const metadata: Metadata = {
  title:
    "Évaluation nationale de 6e en français — l'épreuve blanche, 50 minutes, corrigée | EleveAI",
  description:
    "L'épreuve blanche de l'évaluation nationale de 6e en français : l'épreuve entière, au volume du sujet officiel — 60 questions en 50 minutes, qui défilent une par une, sans retour en arrière. Six domaines : dix questions sur un texte littéraire, neuf sur un document composite, quinze de lexique, neuf de grammaire, neuf d'orthographe et huit sur un enregistrement à écouter. Sur le programme de CM2. À la fin, un groupe de maîtrise par domaine, dans les mots du bilan officiel, et de quoi retravailler chaque compétence qui a coincé. Gratuit, sans publicité.",
  keywords: [
    "évaluation nationale 6e français",
    "évaluation nationale 6e s'entraîner",
    "épreuve blanche évaluation nationale français",
    "évaluation de rentrée sixième français",
    "test de rentrée 6e français",
    "compréhension de l'écrit CM2",
    "programme de CM2 français révision",
  ],
  alternates: {
    canonical: "https://www.eleveai.fr/evaluation-nationale-college/6e-francais",
  },
};

export default function Page() {
  return <Epreuve6eFrancaisClient />;
}
