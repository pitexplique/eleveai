import type { Metadata } from "next";
import ParcoursFrancaisClient from "./ParcoursFrancaisClient";

export const metadata: Metadata = {
  title: "Parcours Français — EleveAI",
  description:
    "Diagnostique ton niveau de français du CP à la 3e : grammaire, conjugaison, orthographe et vocabulaire, notion par notion.",
};

export default function ParcoursFrancaisPage() {
  return <ParcoursFrancaisClient />;
}
