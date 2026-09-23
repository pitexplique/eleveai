import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesVecteursSeconde } from "@/lib/fiches-exercices/maths-seconde-vecteurs";

// ⚠️ Le titre ne répète pas celui de la fiche de cours : cette page répond à
// « exercices corrigés vecteurs seconde », l'autre à « cours ».
export const metadata: Metadata = {
  title: "Vecteurs en seconde : 20 exercices corrigés, flèches dessinées (PDF)",
  description:
    "Vingt exercices corrigés sur les vecteurs en seconde : vecteurs égaux et opposés, coordonnées et norme, relation de Chasles sans repère, soustraction, point défini par une égalité, parallélogramme, colinéarité et alignement. Un bac dérivé par le courant, une randonnée et un drone, deux chevaux qui tirent un tronc, une rangée de vigne. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesVecteursSecondePage() {
  return <FicheExercicesClient fiche={exercicesVecteursSeconde} />;
}
