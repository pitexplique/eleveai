import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSectionsSolides3e } from "@/lib/fiches-exercices/maths-3e-sections-solides";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les sections planes de
// solides ») : cette page répond à « exercices corrigés sections de solides 3e »,
// l'autre à « cours sections planes 3e ».
export const metadata: Metadata = {
  title: "Sections de solides 3e : 20 exercices corrigés, pavé, cylindre, cône, boule (PDF)",
  description:
    "Vingt exercices corrigés de 3e sur les sections planes : nommer la section d'un pavé, d'un cube, d'un cylindre, d'un cône, d'une pyramide ou d'une boule, puis calculer dedans (Pythagore, rayon d'une section de boule, réduction d'une pyramide). Les trois pièges : le cylindre coupé parallèlement à l'axe donne un rectangle, la section d'une boule n'a pas son rayon, la pyramide se réduit depuis le sommet. Problèmes : la pyramide du Louvre, le parallèle de Paris, la pastèque, la perche dans le conteneur. Rappel de cours avant chaque niveau, corrigé étape par étape avec schémas, PDF à imprimer.",
};

export default function ExercicesSectionsSolides3ePage() {
  return <FicheExercicesClient fiche={exercicesSectionsSolides3e} />;
}
