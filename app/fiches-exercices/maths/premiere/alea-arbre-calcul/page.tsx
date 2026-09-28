import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAleaArbreCalculPremiere } from "@/lib/fiches-exercices/maths-premiere-alea-arbre-calcul";

export const metadata: Metadata = {
  title: "Arbre pondéré, calculer — 1re : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de première : probabilité d'un chemin (on multiplie), d'un évènement atteint par plusieurs chemins (on additionne), passage de l'arbre au tableau croisé. Feux tricolores, détecteur de particules, élection à deux tours, biathlon, cigognes, radar routier, choléra de 1832, panneaux solaires, frelon asiatique. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesAleaArbreCalculPremierePage() {
  return <FicheExercicesClient fiche={exercicesAleaArbreCalculPremiere} />;
}
