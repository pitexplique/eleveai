import type { Metadata } from "next";
import CartesDeck from "@/components/cartes/CartesDeck";
import { CARTES } from "./data";

export const metadata: Metadata = {
  title:
    "La tête et les jambes — Cartes de révision « Vers la 4e » à imprimer (gratuit)",
  description:
    "Cartes de révision gratuites à imprimer pour entrer en 4e : 4 questions par carte (maths avec démonstration, français, sport, nutrition, numérique/réseaux sociaux) + un défi sport. Réviser en bougeant, réponses au dos. « La tête et les jambes ».",
  keywords: [
    "cartes de révision 4e",
    "réviser avant la 4e",
    "cartes de révision à imprimer",
    "entrée en 4e",
    "Pythagore Thalès 4e",
    "citoyenneté numérique collège",
    "la tête et les jambes",
    "cahier de vacances 4e",
    "EleveAI",
  ],
  alternates: { canonical: "/cartes-vacances/vers-la-4e" },
};

export default function CartesVersLa4ePage() {
  return <CartesDeck niveau="Vers la 4e" cartes={CARTES} signupFrom="cartes" />;
}
