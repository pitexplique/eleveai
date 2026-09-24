import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesProbabilites3e } from "@/lib/fiches-exercices/maths-3e-probabilites";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Probabilités : issues,
// événements et deux épreuves ») : cette page répond à « exercices corrigés
// probabilités 3e », l'autre à « cours probabilités 3e ».
export const metadata: Metadata = {
  title: "Probabilités 3e : 20 exercices corrigés, arbres, deux dés, urnes (PDF)",
  description:
    "Vingt exercices corrigés de probabilités en 3e : issues et événements, équiprobabilité, événement contraire, puis les expériences à deux épreuves — le tableau des deux dés, l'arbre des tirages avec ou sans remise, une roue de loterie tournée deux fois. Les pièges nommés : la somme 7 n'est pas aussi probable que 2, on multiplie le long d'une branche, « après 5 faces, pile est dû ». Problèmes : tirs au but, météo du week-end, donneurs de sang, jeu équitable. Un schéma par corrigé, rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesProbabilites3ePage() {
  return <FicheExercicesClient fiche={exercicesProbabilites3e} />;
}
