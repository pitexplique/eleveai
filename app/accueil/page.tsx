// app/page.tsx
import type { Metadata } from "next";
import AccueilClient from "./AccueilClient";

export const metadata: Metadata = {
  title: "EleveAI • Valeria — IA encadrée pour l’éducation et la formation",
  description:
    "Valeria (score /20) clarifie et optimise vos prompts. EleveAI génère des ressources pédagogiques. Valeria Consulting accompagne aussi les entreprises (formation, procédures, qualité) avec des critères mesurables.",
};

export default function Page() {
  return <AccueilClient />;
}

