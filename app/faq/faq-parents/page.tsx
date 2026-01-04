import type { Metadata } from "next";
import FAQParents from "./FAQParents";

export const metadata: Metadata = {
  title: "FAQ Parents – EleveAI",
  description:
    "Réponses pour les parents : apprendre avec l’IA sans tricher, progression réelle, usage encadré et protection des données.",
  alternates: { canonical: "/faq-parents" },
  openGraph: {
    title: "FAQ Parents – EleveAI",
    description:
      "Apprendre sans tricher, progression, usage encadré, protection des données.",
    url: "/faq-parents",
    siteName: "EleveAI",
    type: "website",
  },
};

export default function Page() {
  return <FAQParents />;
}

