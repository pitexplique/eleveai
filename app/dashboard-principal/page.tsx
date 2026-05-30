import type { Metadata } from "next";
import DashboardPrincipalClient from "./DashboardPrincipalClient";

export const metadata: Metadata = {
  title: "Dashboard Principal | EleveAI",
  description: "Vue complète de l'établissement : tous les élèves, tous les résultats.",
  robots: { index: false, follow: false },
};

export default function DashboardPrincipalPage() {
  return <DashboardPrincipalClient />;
}
