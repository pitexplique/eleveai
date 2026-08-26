// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheAnalyseDiscours4e,
  slidesAnalyseDiscours4e,
} from "@/lib/fiches/francais-4e-analyse-discours";

export const metadata: Metadata = {
  title: "Paroles rapportées et registres en 4e (2026-2027) : le discours indirect libre",
  description:
    "Programme de français 4e 2026-2027 : distinguer les registres soutenu, courant et familier et les ajuster au destinataire, reconnaitre les quatre formes de paroles rapportées — discours direct, indirect, indirect libre, récit de paroles —, transposer les personnes, les temps et les repères, et repérer les procédés du discours argumentatif : question rhétorique, concession, métaphore. Chaque forme dessinée par sa marque, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function AnalyseDiscoursQuatriemePage() {
  return (
    <FicheCoursClient
      fiche={ficheAnalyseDiscours4e}
      slides={slidesAnalyseDiscours4e}
    />
  );
}
