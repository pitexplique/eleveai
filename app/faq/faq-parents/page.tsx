import type { Metadata } from "next";
import FAQParents from "./FAQParents";

// ⚠️ Même correction que ses deux sœurs (10/08/2026) : la canonique désignait
// `/faq-parents`, qui répond 404 — la page vit à `/faq/faq-parents`. Et le titre
// disait « – EleveAI » là où le layout ajoute déjà « — EleveAI ».
export const metadata: Metadata = {
  title: "FAQ Parents",
  description:
    "Réponses pour les parents : apprendre avec l’IA sans tricher, progression réelle, usage encadré et protection des données.",
  alternates: { canonical: "/faq/faq-parents" },
  openGraph: {
    title: "FAQ Parents – EleveAI",
    description:
      "Apprendre sans tricher, progression, usage encadré, protection des données.",
    url: "/faq/faq-parents",
    siteName: "EleveAI",
    type: "website",
  },
};

export default function Page() {
  return <FAQParents />;
}

