import DashboardDirectionClient from "./DashboardDirectionClient";

export const metadata = {
  title: "Tableau de bord – Direction EleveAI",
  robots: { index: false, follow: false },
};

export default function DashboardDirectionPage() {
  return <DashboardDirectionClient />;
}

