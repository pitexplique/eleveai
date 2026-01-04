import type { Metadata } from "next";
import FAQProfesseurs from "./FAQProfesseurs";

export const metadata: Metadata = {
  title: "FAQ Professeurs – EleveAI",
  description:
    "Réponses pour les enseignants : usage pédagogique, cadre anti-triche, différenciation, alignement programmes et gain de temps.",
  alternates: { canonical: "/faq-professeurs" },
  openGraph: {
    title: "FAQ Professeurs – EleveAI",
    description:
      "Usage pédagogique, anti-triche, différenciation, alignement programmes, gain de temps.",
    url: "/faq-professeurs",
    siteName: "EleveAI",
    type: "website",
  },
};

export default function Page() {
  return <FAQProfesseurs />;
}

