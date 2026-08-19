// /audit-commission — LA FEUILLE A4 QU'ON REMPLIT DEVANT LE DIRIGEANT.
//
// ⛔ OUTIL INTERNE, `noindex`, non liée depuis le site — sauf le dashboard
// admin, qui en est la seule porte. Ce n'est pas une page pour les moteurs :
// c'est l'instrument de travail d'un rendez-vous.
//
// ⭐ PREMIÈRE D'UNE FAMILLE `/audit-*`. Le nom dit ce qu'elle mesure, parce
// qu'il y en aura d'autres — la visibilité, le remplissage d'une salle, la
// dépendance à un canal. Un fichier nommé `/audit` tout court aurait forcé à
// tout renommer au deuxième. Le masquage de l'habillage se fait d'ailleurs
// par préfixe (cf. components/MasqueSurEmbed.tsx), pour que les suivantes
// n'aient rien à déclarer.
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
  title: "Audit — commissions",
  // Outil de rendez-vous, pas contenu public : il n'a rien à faire dans un
  // index, et surtout pas les montants d'un client dedans.
  robots: { index: false, follow: false },
};

export default function AuditPage() {
  return <AuditClient />;
}
