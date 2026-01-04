import type { Metadata } from "next";
import FAQAdministration from "./FAQAdministration";

export const metadata: Metadata = {
  title: "FAQ Établissements – EleveAI",
  description:
    "Réponses pour les établissements : cadre d’usage, gouvernance, protection des données, pilote, formation et accompagnement.",
  alternates: { canonical: "/faq-administration" },
  openGraph: {
    title: "FAQ Établissements – EleveAI",
    description:
      "Cadre d’usage, gouvernance, protection des données, pilote et accompagnement.",
    url: "/faq-administration",
    siteName: "EleveAI",
    type: "website",
  },
};

export default function Page() {
  return <FAQAdministration />;
}

