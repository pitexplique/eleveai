import type { Metadata } from "next";
import PourquoiEleveAIClient from "./PourquoiEleveAIClient";

export const metadata: Metadata = {
  title: "Pourquoi EleveAI",
  description:
    "EleveAI aide les élèves à progresser en mathématiques avec un tutor guidé, des défis, du calcul rapide, des leçons courtes et une progression encadrée.",
  alternates: { canonical: "/pourquoi-eleveai" },
};

export default function Page() {
  return <PourquoiEleveAIClient />;
}
