// /noel — NOËL AVEC TI MARGO (27/11/2026).
// Frédéric, 27/11 : « Noël, c'est hyper important », « rajouter un onglet Noël ».
// Trois onglets : le calendrier de l'Avent (un défi par jour, 3 niveaux),
// « À projeter » (le défi du jour sur fond ardoise, pour la classe), « Familles »
// (10 minutes par jour pendant les vacances).
// ⛔ Rien à vendre sur cette page : elle se projette en classe.
// ⛔ Les couleurs sont FIXES (bleu nuit, or, vert sapin) : lisibles en clair comme
//    en sombre, sans dépendre du thème de l'appareil. Pas de rouge vif.
// Les données sont dans lib/noel/calendrier.ts.

import type { Metadata } from "next";
import CalendrierNoel from "./CalendrierNoel";

export const metadata: Metadata = {
  title: "Noël avec Ti Margo : le calendrier de l'Avent des maths",
  description:
    "Un défi de maths par jour, du 1er au 24 décembre, en trois niveaux du CP à la Terminale. Gratuit, à faire en famille ou à projeter en classe.",
  alternates: { canonical: "/noel" },
};

export default function NoelPage() {
  return <CalendrierNoel />;
}
