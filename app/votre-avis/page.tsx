import type { Metadata } from "next";
import VotreAvisClient from "./VotreAvisClient";
import {
  getElevesALHonneur,
  getAmeliorationsALHonneur,
} from "@/lib/ameliorations/honneurServer";

// Le palmarès « élèves à l'honneur » est rechargé au plus toutes les 5 minutes.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Votre avis | EleveAI",
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
