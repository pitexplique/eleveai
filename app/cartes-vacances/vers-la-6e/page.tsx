import type { Metadata } from "next";
import CartesDeck from "@/components/cartes/CartesDeck";
import { CARTES } from "./data";

export const metadata: Metadata = {
  title:
    "Le corps & l’esprit — Cartes de révision « Vers la 6e » à imprimer (gratuit)",
  description:
    "Cartes de révision gratuites à imprimer pour entrer en 6e : 4 questions par carte (maths, français, anglais, sport…) + un défi sport. Réviser en bougeant, réponses au dos. « Le corps & l’esprit ».",
  keywords: [
    "cartes de révision 6e",
    "réviser avant la 6e",
    "cartes de révision à imprimer",
    "entrée en 6e",
    "réviser en s'amusant",
    "le corps et l’esprit",
    "cahier de vacances 6e",
    "EleveAI",
  ],
  alternates: { canonical: "/cartes-vacances/vers-la-6e" },
};

export default function CartesVersLa6ePage() {
  return <CartesDeck niveau="Vers la 6e" cartes={CARTES} signupFrom="cartes" />;
}
