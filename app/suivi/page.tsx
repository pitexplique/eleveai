// /suivi — la vue du parent abonné (05/11/2026).
import type { Metadata } from "next";
import SuiviClient from "./SuiviClient";

export const metadata: Metadata = { title: "Le suivi de mon enfant", robots: { index: false, follow: false } };

export default function Page() {
  return <SuiviClient />;
}
