// Les métadonnées de la dictée du jour.
//
// ⚠️ Même raison que pour les coachs : `page.tsx` est un composant client, donc
// incapable d'exporter des métadonnées. La page héritait de celles du layout
// racine — le titre, la description ET la canonique de l'accueil. Un rituel
// quotidien qui se déclarait copie de la page d'entrée n'avait aucune chance
// d'être trouvé par quelqu'un cherchant « dictée en ligne ».

import type { Metadata } from "next";

export const metadata: Metadata = {
  // ⚠️ 50 signes, plus « — EleveAI » ajouté par le gabarit = 60, la limite de
  // Google. « Du CP à la Terminale » aurait été coupé : il vit dans la
  // description, où il y a la place de le dire.
  title: "La dictée du jour — cinq mots à écouter et à écrire",
  description:
    "Chaque jour, cinq mots lus à voix haute : tu écoutes, tu écris, la correction arrive mot par mot. Un rituel de cinq minutes, du CP à la Terminale, avec ta série de jours réussis. Gratuit.",
  alternates: { canonical: "/dictee-du-jour" },
  openGraph: {
    title: "La dictée du jour — cinq mots à écouter et à écrire",
    description:
      "Cinq mots lus à voix haute, chaque jour, corrigés à la lettre près. Du CP à la Terminale, gratuit.",
    url: "/dictee-du-jour",
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

export default function DicteeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
