"use client";

// Masque l'habillage du site (header, footer, barres flottantes) sur les
// pages /embed/* : elles sont faites pour vivre en iframe chez d'autres
// (les quotidiens de l'île) — seul le contenu embarqué doit s'afficher.
//
// 05/08/2026 : /ia rejoint la liste. C'est l'entrée conversationnelle en test
// (« Qui es-tu ? / Que veux-tu faire aujourd'hui ? ») — le header du journal
// au-dessus d'elle contredirait exactement ce qu'elle essaie d'être.

import { usePathname } from "next/navigation";

// ⚠️ /accueil N'EST PAS dans cette liste, et c'est réfléchi (06/08). La refonte
// lui donne sa colonne de gauche et son pied de page court, mais sans le header
// un visiteur perdrait toute porte vers les espaces élève, parent, enseignant
// et établissement — et le haut de l'écran serait vide sur téléphone. Le header
// reste ; seul le pied de page long est masqué, par MasqueSurGuide.
// 18/08/2026 : /audit rejoint la liste. C'est la feuille qu'on remplit devant
// un dirigeant, puis qu'on lui imprime. Un menu « Élèves · Parents ·
// Enseignants » au-dessus d'un audit d'hôtel dit exactement le contraire de ce
// que le document essaie d'établir — et il partirait sur le papier.
const SANS_HABILLAGE = ["/embed", "/ia", "/devis"];

// Les générateurs d'audit forment une FAMILLE — /audit-commission aujourd'hui,
// d'autres ensuite. On les masque par préfixe plutôt qu'un par un : sinon le
// jour où /audit-visibilite naît, il sortirait avec le menu « Élèves · Parents »
// au-dessus d'un document remis à un dirigeant, et personne ne penserait à
// revenir modifier ce fichier.
const PREFIXES_SANS_HABILLAGE = ["/audit-"];

export default function MasqueSurEmbed({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (SANS_HABILLAGE.some((p) => pathname === p || pathname?.startsWith(`${p}/`))) return null;
  if (PREFIXES_SANS_HABILLAGE.some((p) => pathname?.startsWith(p))) return null;
  return <>{children}</>;
}
