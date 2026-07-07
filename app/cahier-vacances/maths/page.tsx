import type { Metadata } from "next";
import PictoMathsClient from "../../picto-maths/PictoMathsClient";

export const metadata: Metadata = {
  title: "Cahier de vacances de maths à imprimer (PDF gratuit) — La Réunion",
  description:
    "Un cahier de vacances de maths gratuit à imprimer : 25 défis « un dessin, une question » ancrés à La Réunion (marché, volcan, canne, vélo…), du CM2 à la 3e, avec les corrigés. Réviser les maths tout l'été, sans jugement.",
  keywords: [
    "cahier de vacances de maths",
    "cahier de vacances maths à imprimer",
    "cahier de vacances maths PDF gratuit",
    "cahier de maths CM2 6e 5e 4e 3e",
    "réviser les maths l'été",
    "défis maths à imprimer",
    "cahier de vacances La Réunion",
    "EleveAI",
  ],
  alternates: { canonical: "/cahier-vacances/maths" },
  openGraph: {
    title: "Cahier de vacances de maths à imprimer (PDF gratuit) — La Réunion",
    description:
      "25 défis « un dessin, une question » ancrés à La Réunion, du CM2 à la 3e, corrigés inclus. À imprimer et à chercher sur l'ardoise.",
    url: "/cahier-vacances/maths",
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

export default function CahierVacancesMathsPage() {
  return (
    <PictoMathsClient
      titre="Cahier de vacances"
      domaine="Maths"
      baseline="Un dessin, une question — réviser les maths tout l'été, à La Réunion"
      retourHref="/cahier-vacances"
      retourLabel="Les cahiers de vacances"
      signupFrom="cahier"
    />
  );
}
