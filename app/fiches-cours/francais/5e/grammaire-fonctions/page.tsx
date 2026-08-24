import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheFonctions5e,
  slidesFonctions5e,
} from "@/lib/fiches/francais-5e-grammaire-fonctions";

export const metadata: Metadata = {
  title: "COD, COI, attribut et circonstanciels — 5e 2026-2027",
  description:
    "Programme de français 5e 2026-2027 : distinguer le complément d'objet direct et indirect, y compris quand le pronom est placé avant le verbe, reconnaître l'attribut du sujet et les verbes occasionnellement attributifs, identifier les compléments circonstanciels de lieu, de temps, de cause et de manière par les manipulations syntaxiques. Chaque règle dessinée sur la phrase, avec exemples corrigés et exercices.",
};

export default function GrammaireFonctions5ePage() {
  return <FicheCoursClient fiche={ficheFonctions5e} slides={slidesFonctions5e} />;
}
