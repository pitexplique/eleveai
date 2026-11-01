// /journal — LE JOURNAL D'ELEVEAI, une des deux branches de la page d'entrée (01/11/2026).
// C'est le Quotidien choisi le 18/10 (sans le sélecteur de mises en page, qui
// reste sur la maquette /accueil-journal). Mêmes données, régénérées toutes les
// heures : la Une, le défi, le chiffre et le métier changent chaque jour.
import type { Metadata } from "next";
import JournalClient from "../accueil-journal/JournalClient";
import { donneesDuJournal } from "../accueil-journal/donnees";

export const metadata: Metadata = {
  title: { absolute: "Le Journal d'EleveAI — une chose utile à apprendre chaque jour" },
  description:
    "Le journal des jeunes d'EleveAI : la Une du jour, un défi, un chiffre, un métier, et des vidéos pour apprendre.",
  alternates: { canonical: "/journal" },
};

export const revalidate = 3600;

export default function Journal() {
  return <JournalClient {...donneesDuJournal()} accueil />;
}
