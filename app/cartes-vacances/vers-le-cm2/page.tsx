import type { Metadata } from "next";
import CartesDeck from "@/components/cartes/CartesDeck";
import { CARTES } from "./data";

export const metadata: Metadata = {
  title:
    "La tête et les jambes — Cartes de révision « Vers le CM2 » à imprimer (gratuit)",
  description:
    "Cartes de révision gratuites à imprimer pour entrer en CM2 : 4 questions par carte (maths, français, anglais, sport, nutrition) + un défi sport. Réviser en bougeant, réponses au dos. « La tête et les jambes ».",
  keywords: [
    "cartes de révision CM2",
    "réviser avant le CM2",
    "cartes de révision à imprimer",
    "entrée en CM2",
    "réviser en s'amusant primaire",
    "la tête et les jambes",
    "cahier de vacances CM2",
    "EleveAI",
  ],
  alternates: { canonical: "/cartes-vacances/vers-le-cm2" },
};

export default function CartesVersLeCm2Page() {
  return <CartesDeck niveau="Vers le CM2" cartes={CARTES} signupFrom="cartes" />;
}
