import type { Metadata } from "next";
import FAQAdministration from "./FAQAdministration";

// ⚠️ Même correction que ses deux sœurs (10/08/2026) : la canonique désignait
// `/faq-administration`, qui répond 404 — la page vit à `/faq/faq-administration`.
// Et le titre disait « – EleveAI » là où le layout ajoute déjà « — EleveAI ».
export const metadata: Metadata = {
  title: "FAQ Établissements",
  description:
    "Réponses pour les établissements : cadre d’usage, gouvernance, protection des données, pilote, formation et accompagnement.",
  alternates: { canonical: "/faq/faq-administration" },
  openGraph: {
    title: "FAQ Établissements – EleveAI",
    description:
      "Cadre d’usage, gouvernance, protection des données, pilote et accompagnement.",
    url: "/faq/faq-administration",
    siteName: "EleveAI",
    type: "website",
  },
};

export default function Page() {
  return <FAQAdministration />;
}

