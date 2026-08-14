// lib/calls.server.ts — les liens visio, et EUX SEULS.
//
// Pourquoi ce fichier séparé : `lib/calls.ts` est importé par des composants
// « use client » (EncartCallEnDirect ; AgendaJournal aussi, jusqu'au 14/08).
// Tout ce qu'il exporte part donc dans le bundle JavaScript envoyé au
// navigateur — y compris ce qu'on croyait privé.
//
// C'est exactement ce qui s'était produit : les liens Meet, pourtant annotés
// « PRIVÉ, jamais affiché sur le site », étaient lisibles en clair dans le
// JavaScript de l'accueil. Ils n'apparaissaient pas dans le HTML — ce qui
// avait suffi à les croire protégés — mais un simple coup d'œil aux sources
// les révélait, et n'importe qui pouvait s'inviter en séance.
//
// La garde `server-only` fait maintenant échouer la compilation si ce module
// est importé depuis un composant client : l'erreur ne peut plus passer
// inaperçue.

import "server-only";

/** call_id -> lien de visioconférence. Vide = pas encore créé. */
const LIENS_VISIO: Record<string, string> = {
  "decouverte-2026-07": "https://meet.google.com/wwb-fyhk-yns",
  "revision-premiere-2026-08": "https://meet.google.com/ari-jdic-mev",
  "soutien-maths-visio-hebdo": "",
};

/** Lien visio d'un call, ou chaîne vide s'il n'est pas encore créé. */
export function lienVisio(callId: string): string {
  return LIENS_VISIO[callId] ?? "";
}

/** Le lien est-il renseigné ? Seule information qu'on expose à l'admin. */
export function aUnLienVisio(callId: string): boolean {
  return Boolean(LIENS_VISIO[callId]);
}
