// app/ia/page.tsx
//
// La nouvelle entrée d'EleveAI, en TEST à côté de l'ancienne.
// « / » et « /accueil » ne bougent pas : on compare en vrai avant de trancher.
//
// noindex volontaire : tant que c'est un test, cette page ne doit ni entrer
// dans le sitemap, ni concurrencer /accueil sur la marque. Le jour où elle
// devient l'entrée du site, on retire ce bloc ET on l'ajoute au sitemap.

import type { Metadata } from "next";
import IAClient from "./IAClient";

export const metadata: Metadata = {
  title: "EleveAI — l'IA éducative conçue à La Réunion",
  description:
    "Dis qui tu es et ce que tu veux faire aujourd'hui : EleveAI cherche parmi des ressources pédagogiques vérifiées celles qui peuvent vraiment t'aider.",
  robots: { index: false, follow: false },
};

export default function PageIA() {
  return <IAClient />;
}
