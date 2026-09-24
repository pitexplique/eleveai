import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesPerimetres3e } from "@/lib/fiches-exercices/maths-3e-perimetres";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Périmètres : polygones,
// cercle et figures composées ») : cette page répond à « exercices corrigés
// périmètre 3e », l'autre à « cours périmètre 3e ».
export const metadata: Metadata = {
  title: "Périmètres 3e : 20 exercices corrigés, cercle, figures composées (PDF)",
  description:
    "Vingt exercices corrigés de 3e sur les périmètres : polygones, longueur d'un cercle (2πr ou πd, jamais πr²), demi-cercle, figures composées sans compter les traits intérieurs, unités à convertir, même aire et périmètres différents. Problèmes : la piste d'athlétisme de 400 m, la roue d'un vélo, la boucle d'un parc, une corde autour de la Terre, un enclos au bord d'une rivière. Rappel de cours avant chaque niveau, corrigé étape par étape avec la figure dessinée et son contour en couleur, PDF à imprimer.",
};

export default function ExercicesPerimetres3ePage() {
  return <FicheExercicesClient fiche={exercicesPerimetres3e} />;
}
