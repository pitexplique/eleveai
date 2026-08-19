// /facture — LE DOCUMENT QUI JUSTIFIE L'ARGENT REÇU.
//
// ⛔ OUTIL INTERNE, `noindex`, non lié. Comme /devis et /audit-commission.
//
// ⭐ POURQUOI ELLE EXISTE. /devis ouvre la mission, rien ne la fermait. Or ce
// n'est pas le devis qui justifie l'encaissement : c'est la facture. Elle est
// obligatoire dès qu'on vend à un professionnel (art. L441-9 du code de
// commerce), et dès qu'un particulier la demande — pour une prestation de
// services à distance, elle lui est due de toute façon.
//
// ⚠️ DEUX FACTURES DIFFÉRENTES SOUS UN SEUL TOIT. Les pénalités de retard et
// l'indemnité forfaitaire de 40 € sont obligatoires ENTRE PROFESSIONNELS et
// n'ont rien à faire sur la facture d'une famille : opposées à un
// consommateur, elles seraient abusives. Inversement, le rappel des quatorze
// jours de rétractation n'a pas de sens pour un professionnel, qui n'en
// bénéficie pas. D'où le sélecteur : il ne change pas la mise en page, il
// change ce que le document affirme.
//
// ⚠️ ELLE LIT `lib/legal/editeur.ts`, elle ne recopie rien.
//
// ⚖️ Rédaction à faire relire par un professionnel. Ces mentions couvrent le
// cas courant d'un micro-entrepreneur en franchise en base ; elles ne
// remplacent pas un conseil.

import type { Metadata } from "next";
import FactureClient from "./FactureClient";

export const metadata: Metadata = {
  title: "Facture",
  robots: { index: false, follow: false },
};

export default function FacturePage() {
  return <FactureClient />;
}
