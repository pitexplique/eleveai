import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheTriangles5e,
  slidesTriangles5e,
} from "@/lib/fiches/maths-5e-triangles";

export const metadata: Metadata = {
  title: "Les triangles — fiche de cours 5e",
  description:
    "Définition, méthode, exemples corrigés et exercices : la fiche de cours complète des triangles en 5e (nature, inégalité triangulaire, construction au compas, somme des angles = 180°), à lire, imprimer ou réviser en flashcards.",
};

export default function TrianglesCinquiemePage() {
  return <FicheCoursClient fiche={ficheTriangles5e} slides={slidesTriangles5e} />;
}
