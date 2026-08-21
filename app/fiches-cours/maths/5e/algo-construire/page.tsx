// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheAlgoConstruire5e,
  slidesAlgoConstruire5e,
} from "@/lib/fiches/maths-5e-algo-construire";

export const metadata: Metadata = {
  title: "Construire un programme — fiche de cours 5e",
  description:
    "Traduire une formule en blocs, écrire une condition, régler les paramètres, remplacer des blocs répétés par une boucle : la fiche de cours d'algorithmique de 5e, avec programmes Scratch dessinés, exemples corrigés et exercices.",
};

export default function AlgoConstruireCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheAlgoConstruire5e}
      slides={slidesAlgoConstruire5e}
    />
  );
}
