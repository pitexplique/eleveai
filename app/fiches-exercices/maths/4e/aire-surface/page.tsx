import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAires4e } from "@/lib/fiches-exercices/maths-4e-aires";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les aires ») : cette
// page répond à « exercices corrigés aires 4e », l'autre à « cours aires 4e ».
export const metadata: Metadata = {
  title: "Aires 4e : 20 exercices corrigés, rectangle, triangle, parallélogramme, figures composées (PDF)",
  description:
    "Vingt exercices corrigés de 4e sur les aires : compter des carreaux sans compter le tour, calculer l'aire d'un rectangle, d'un carré, d'un triangle et d'un parallélogramme avec la vraie hauteur, remonter de l'aire à un côté, découper une figure composée, convertir m² et cm². Problèmes : un terrain de basket et sa bande, un toit qui recueille la pluie, un parking en épi, un champ à partager. Chaque corrigé a sa figure dessinée à l'échelle, la surface ombrée, étape par étape, avec le piège nommé. PDF à imprimer.",
};

export default function ExercicesAires4ePage() {
  return <FicheExercicesClient fiche={exercicesAires4e} />;
}
