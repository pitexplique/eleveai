// app/accueil/page.tsx
import type { Metadata } from "next";
import AccueilClient from "./AccueilClient";

export const metadata: Metadata = {
  title: "EleveAI - Maths, français et anglais",
  description:
    "EleveAI aide les élèves à progresser en maths, en français et en anglais avec le Coach IA, les parcours, les leçons et les entraînements courts.",
  keywords: [
    "maths collège",
    "français cycle 2",
    "english maths",
    "anglais A1 A2 B1 B2",
    "leçon du jour",
    "révision maths",
    "révision français",
    "application éducative",
    "eleveai",
    "entraînement quotidien",
  ],
  openGraph: {
    title: "EleveAI - Maths, français et anglais",
    description:
      "Progresse en maths, en français et en anglais avec EleveAI : Coach IA, parcours guidés, leçons et entraînements courts.",
    url: "https://eleveai.fr",
    siteName: "EleveAI",
    images: [
      {
        url: "/images/accueil-eleveai-reunion.webp",
        width: 1680,
        height: 945,
        alt: "EleveAI - Maths, français et anglais",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

export default function Page() {
  return <AccueilClient />;
}
