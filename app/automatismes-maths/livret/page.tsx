import type { Metadata } from "next";
import LivretClient from "./LivretClient";

// ⚠️ En relecture (24/09/2026) : pas d'indexation tant que Frédéric n'a pas
// validé le format du livret.
export const metadata: Metadata = {
  title: "Livret d'automatismes à imprimer",
  description: "Vingt séries d'automatismes corrigées, à imprimer ou à enregistrer en PDF.",
  robots: { index: false, follow: false },
};

export default function LivretPage() {
  return <LivretClient />;
}
