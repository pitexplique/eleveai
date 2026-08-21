import type { Metadata } from "next";
import PourquoiEleveAIClient from "./PourquoiEleveAIClient";

export const metadata: Metadata = {
  // « Pourquoi EleveAI » est le nom de la page : `absolute` pour ne pas servir
  // « Pourquoi EleveAI — Plusieurs portes… — EleveAI ».
  title: { absolute: "Pourquoi EleveAI — s'entraîner, s'amuser et s'évaluer" },
  description:
    "De multiples portes pour s'entraîner, s'amuser et s'évaluer : cinq coachs (maths, français, espagnol, anglais, IA), les parcours, les rituels du jour, les concours, les évaluations nationales et Pix — du CP au Bac, avec la progression suivie.",
  alternates: { canonical: "/pourquoi-eleveai" },
};

export default function Page() {
  return <PourquoiEleveAIClient />;
}
