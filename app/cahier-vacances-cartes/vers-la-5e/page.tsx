import type { Metadata } from "next";
import CartesDeck from "@/components/cartes/CartesDeck";
import { CARTES } from "./data";

export const metadata: Metadata = {
  title:
    "Le corps & l’esprit — Cartes de révision « Vers la 5e » à imprimer (gratuit)",
  description:
    "Cartes de révision gratuites à imprimer pour entrer en 5e : 4 questions par carte (maths, français, anglais, sport, nutrition) + un défi sport. Réviser en bougeant, réponses au dos. « Le corps & l’esprit ».",
  keywords: [
    "cartes de révision 5e",
    "réviser avant la 5e",
    "cartes de révision à imprimer",
    "entrée en 5e",
    "réviser en s'amusant collège",
    "le corps et l’esprit",
    "cahier de vacances 5e",
    "EleveAI",
  ],
  alternates: { canonical: "/cahier-vacances-cartes/vers-la-5e" },
};

export default function CartesVersLa5ePage() {
  return <CartesDeck niveau="Vers la 5e" cartes={CARTES} signupFrom="cartes" />;
}
