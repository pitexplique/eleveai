// /devis — LE DOCUMENT QUI TRANSFORME UN OUI EN FACTURE.
//
// ⛔ OUTIL INTERNE, `noindex`, non lié. Comme /audit : ce n'est pas du contenu,
// c'est un instrument de rendez-vous.
//
// ⭐ POURQUOI IL EXISTE. Entre « c'est d'accord » et un virement, il manque un
// papier. Sans lui, la mission reste une conversation — et une conversation
// entre un habitué et son hôte ne se facture jamais. Le devis est ce qui fait
// passer Frédéric de « celui qui dépanne » à « celui qu'on paie ».
//
// ⚠️ IL LIT `lib/legal/editeur.ts`, il ne recopie rien. Un SIREN recopié est un
// SIREN qui vieillit — c'est écrit dans ce fichier-là, et ça vaut ici aussi.
// Tant que le SIREN et l'adresse manquent, la page refuse de se présenter comme
// un devis émissible et affiche ce qu'il reste à faire.
//
// ⚖️ Rédaction juridique à faire relire par un professionnel. Les clauses
// ci-dessous couvrent le cas courant d'une prestation entre professionnels ;
// elles ne remplacent pas un conseil.

import type { Metadata } from "next";
import DevisClient from "./DevisClient";

export const metadata: Metadata = {
  title: "Devis",
  robots: { index: false, follow: false },
};

export default function DevisPage() {
  return <DevisClient />;
}
