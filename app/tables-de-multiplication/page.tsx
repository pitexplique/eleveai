import type { Metadata } from "next";
import TablesClient from "./TablesClient";

// ⭐ LES TABLES DE MULTIPLICATION (07/10/2026). Frédéric : « intégrer table de
// multiplication avec option à imprimer et en PDF, puis on fera vidéo ». Une
// page SANS CLASSE, comme la série vidéo « Les bases » : ses 6e révisent les
// tables sur les coachs CE1 à CM2 selon leur niveau, et une étiquette de classe
// dirait à un élève de 6e qu'il fait du CE1.
// Ses demandes : tables de 1 à 10 · un seul PDF pour toutes les feuilles ·
// couleur OU noir et blanc · la division par la table (« 12 = 3 × 4 donc
// 12 : 4 = 3 et 12 : 3 = 4 »).

export const metadata: Metadata = {
  title: "Tables de multiplication de 1 à 10 à imprimer (PDF gratuit)",
  description:
    "Les tables de multiplication de 1 à 10 à imprimer gratuitement, en couleur ou en noir et blanc : les tables, le grand tableau, des tables à compléter et la division par les tables, avec le corrigé. Un seul PDF.",
  keywords: [
    "table de multiplication à imprimer",
    "tables de multiplication 1 à 10",
    "table de multiplication pdf",
    "tableau de multiplication",
    "table de multiplication à compléter",
    "table de multiplication noir et blanc",
  ],
  alternates: { canonical: "/tables-de-multiplication" },
  openGraph: {
    title: "Tables de multiplication de 1 à 10 à imprimer — EleveAI",
    description:
      "Les tables, le grand tableau, des tables à compléter et la division par les tables. En couleur ou en noir et blanc, un seul PDF gratuit.",
    url: "/tables-de-multiplication",
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

export default function TablesDeMultiplicationPage() {
  return <TablesClient />;
}
