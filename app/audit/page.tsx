// /audit — LA FEUILLE A4 QU'ON REMPLIT DEVANT LE DIRIGEANT.
//
// ⛔ OUTIL INTERNE, `noindex`, non liée depuis le site. Ce n'est pas une page
// pour les moteurs : c'est l'instrument de travail d'un rendez-vous.
//
// ⭐ LE PARI : le montant ne doit JAMAIS sortir de ta bouche. On pose les
// trois chiffres que le dirigeant connaît par cœur — son chiffre d'affaires,
// la part qui passe par l'intermédiaire, le taux de commission — et c'est la
// page qui affiche le total. Un chiffre qu'on a vu se calculer à partir de ses
// propres réponses ne se conteste pas. Un chiffre annoncé par un vendeur, si.
//
// ⚠️ ON NE DONNE PAS LA SOLUTION ICI. La feuille montre le problème et son
// coût, rien d'autre. La première version de cet entretien (hôtel, 18/08/2026)
// livrait le diagnostic ET la marche à suivre : le client a corrigé seul et
// n'a rien payé. Quand il demande « je fais quoi ? », c'est un signal d'achat,
// pas une question.
//
// Elle s'imprime en A4 (Ctrl+P) pour lui laisser une trace signée de la main.

import type { Metadata } from "next";
import AuditClient from "./AuditClient";

export const metadata: Metadata = {
  title: "Audit express",
  // Outil de rendez-vous, pas contenu public : il n'a rien à faire dans un
  // index, et surtout pas les montants d'un client dedans.
  robots: { index: false, follow: false },
};

export default function AuditPage() {
  return <AuditClient />;
}
