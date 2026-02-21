import type { Metadata } from "next";
import ValeriaClient from "./ValeriaClient";

export const metadata: Metadata = {
  title: "Valeria Consulting — La Réunion | Architecture IA",
  description:
    "Audit IA structuré, indicateurs, gouvernance et plan d’intégration. Interventions à La Réunion et à distance.",
};

export default function Page() {
  return <ValeriaClient />;
}