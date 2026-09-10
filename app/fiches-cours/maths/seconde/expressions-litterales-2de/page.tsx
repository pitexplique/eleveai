import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheExpressionsSeconde,
  slidesExpressionsSeconde,
} from "@/lib/fiches/maths-seconde-expressions";

export const metadata: Metadata = {
  title: "Les expressions littérales — 2de : réduire, substituer, démontrer, cours et exercices corrigés",
  description:
    "Les expressions littérales en seconde : traduire une phrase ou une figure, réduire, substituer une valeur négative, retourner une formule, et démontrer un programme de calcul. Pourquoi un contre-exemple réfute mais ne prouve jamais. Cours et 10 exercices corrigés.",
};

export default function ExpressionsSecondePage() {
  return (
    <FicheCoursClient
      fiche={ficheExpressionsSeconde}
      slides={slidesExpressionsSeconde}
    />
  );
}
