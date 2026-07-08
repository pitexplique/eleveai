import type { Metadata } from "next";
import CartesDeck from "@/components/cartes/CartesDeck";
import { CARTES } from "./data";

export const metadata: Metadata = {
  title:
    "La tête et les jambes — Cartes de révision « Vers la 1re » à imprimer (gratuit)",
  description:
    "Cartes de révision gratuites à imprimer pour entrer en première : 4 questions par carte (maths, français, anglais, sport, nutrition) + un défi sport. Réviser en bougeant, réponses au dos. « La tête et les jambes ».",
  keywords: [
    "cartes de révision première",
    "réviser avant la première",
    "cartes de révision à imprimer",
    "entrée en 1re",
    "réviser en s'amusant lycée",
    "la tête et les jambes",
    "cahier de vacances première",
    "EleveAI",
  ],
  alternates: { canonical: "/cartes-vacances/vers-la-premiere" },
};

export default function CartesVersLaPremierePage() {
  return (
    <CartesDeck
      niveau="Vers la 1re"
      cartes={CARTES}
      signupFrom="keepcool"
      partenaire="Keep Cool"
    />
  );
}
