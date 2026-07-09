import type { Metadata } from "next";
import CartesDeck from "@/components/cartes/CartesDeck";
import { CARTES } from "./data";

export const metadata: Metadata = {
  title:
    "Le corps & l’esprit — Cartes de révision « Vers la 3e » à imprimer (gratuit)",
  description:
    "Cartes de révision gratuites à imprimer pour entrer en 3e (année du brevet) : 4 questions par carte (maths avec démonstration, français, La Réunion, respect/émotions, numérique/jeux vidéo…) + un défi sport. Réviser en bougeant, réponses au dos. « Le corps & l’esprit ».",
  keywords: [
    "cartes de révision 3e",
    "réviser avant la 3e",
    "réviser le brevet",
    "cartes de révision à imprimer",
    "entrée en 3e",
    "le corps et l’esprit",
    "cahier de vacances 3e",
    "EleveAI",
  ],
  alternates: { canonical: "/cartes-vacances/vers-la-3e" },
};

export default function CartesVersLa3ePage() {
  return <CartesDeck niveau="Vers la 3e" cartes={CARTES} signupFrom="cartes" />;
}
