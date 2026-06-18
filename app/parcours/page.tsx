import type { Metadata } from "next";
import ParcoursClient from "./ParcoursClient";
import BoiteAOutils from "@/components/BoiteAOutils";

export const metadata: Metadata = {
  title: "Parcours Maths - EleveAI",
  description:
    "Un parcours simple pour diagnostiquer les notions de mathématiques par classe.",
};

export default function ParcoursPage() {
  return (
    <>
      <ParcoursClient />
      <BoiteAOutils />
    </>
  );
}