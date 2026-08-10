import type { Metadata } from "next";
import FAQProfesseurs from "./FAQProfesseurs";

// ⚠️ La page vit à `/faq/faq-professeurs` : la canonique disait `/faq-professeurs`,
// qui répond 404. Une canonique vers une page qui n'existe pas est ignorée par
// Google, qui prend l'adresse réelle et signale l'écart (10/08/2026).
// Le titre portait « – EleveAI » alors que le layout ajoute déjà « — EleveAI ».
export const metadata: Metadata = {
  title: "FAQ Professeurs",
  description:
    "Réponses pour les enseignants : usage pédagogique, cadre anti-triche, différenciation, alignement programmes et gain de temps.",
  alternates: { canonical: "/faq/faq-professeurs" },
  openGraph: {
    title: "FAQ Professeurs – EleveAI",
    description:
      "Usage pédagogique, anti-triche, différenciation, alignement programmes, gain de temps.",
    url: "/faq/faq-professeurs",
    siteName: "EleveAI",
    type: "website",
  },
};

export default function Page() {
  return <FAQProfesseurs />;
}

