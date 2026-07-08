import type { Metadata } from "next";
import CartesDeck from "@/components/cartes/CartesDeck";
import { CARTES } from "./data";

export const metadata: Metadata = {
  title: "Cartes de révision Vers la 1re à imprimer (gratuit) — EleveAI",
  description:
    "Un jeu de cartes de révision gratuit à imprimer pour entrer en 1re : 4 questions multi-matières par carte (maths, français, anglais, histoire…) + un défi sport. Réponses au dos.",
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
