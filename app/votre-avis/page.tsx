import type { Metadata } from "next";
import VotreAvisClient from "./VotreAvisClient";
import {
  getElevesALHonneur,
  getAmeliorationsALHonneur,
} from "@/lib/ameliorations/honneurServer";

// Le palmarès « élèves à l'honneur » est rechargé au plus toutes les heures.
// 04/08 : 5 minutes → 1 heure, pour la même raison que l'accueil (quota ISR
// Reads à 75 %). Un palmarès n'a pas besoin d'être à la minute — un élève qui
// vient de laisser son avis se voit apparaître au prochain passage.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Votre avis",
  description:
    "Aide-nous à améliorer EleveAI : signale un bug, propose une idée ou donne ton avis sur la plateforme.",
};

export default async function VotreAvisPage() {
  const [honneur, ameliorations] = await Promise.all([
    getElevesALHonneur(),
    getAmeliorationsALHonneur(),
  ]);
  return <VotreAvisClient honneur={honneur} ameliorations={ameliorations} />;
}
