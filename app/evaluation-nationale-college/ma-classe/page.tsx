import type { Metadata } from "next";
import MaClasseClient from "./MaClasseClient";

// ⛔ PAS INDEXABLE : la page ne montre rien sans session, et ce qu'elle montre
// avec en est le contraire d'un contenu public — des élèves nommés, rangés en
// groupes de maîtrise.
export const metadata: Metadata = {
  title: "Votre classe — évaluation nationale du collège | EleveAI",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <MaClasseClient />;
}
