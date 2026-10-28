import type { Metadata } from "next";
import VotreAvisClient from "./VotreAvisClient";
import { getAmeliorationsALHonneur } from "@/lib/ameliorations/honneurServer";

// Le mur des améliorations est rechargé au plus toutes les heures.
// 28/10 : la rubrique « élèves à l'honneur » est retirée de cette page (Frédéric).
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
  const ameliorations = await getAmeliorationsALHonneur();
  return <VotreAvisClient ameliorations={ameliorations} />;
}
