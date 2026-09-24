import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAires3e } from "@/lib/fiches-exercices/maths-3e-aires";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Aires : triangle,
// disque et figures composées ») : cette page répond à « exercices corrigés
// aires 3e », l'autre à « cours aires 3e ».
export const metadata: Metadata = {
  title: "Aires 3e : 20 exercices corrigés, triangle, disque, figures composées (PDF)",
  description:
    "Vingt exercices corrigés de 3e sur les aires : convertir m², cm² et hectares, trouver la vraie hauteur d'un triangle, calculer l'aire d'un disque avec πr², découper une figure composée, et voir pourquoi doubler les longueurs quadruple l'aire. Problèmes : un terrain de football en hectares, une forêt brûlée, des pizzas, un mur à repeindre, un champ de panneaux solaires. Chaque corrigé a sa figure dessinée à l'échelle, la surface ombrée, étape par étape, avec le piège nommé. PDF à imprimer.",
};

export default function ExercicesAires3ePage() {
  return <FicheExercicesClient fiche={exercicesAires3e} />;
}
