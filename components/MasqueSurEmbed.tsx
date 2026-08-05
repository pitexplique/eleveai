"use client";

// Masque l'habillage du site (header, footer, barres flottantes) sur les
// pages /embed/* : elles sont faites pour vivre en iframe chez d'autres
// (les quotidiens de l'île) — seul le contenu embarqué doit s'afficher.
//
// 05/08/2026 : /ia rejoint la liste. C'est l'entrée conversationnelle en test
// (« Qui es-tu ? / Que veux-tu faire aujourd'hui ? ») — le header du journal
// au-dessus d'elle contredirait exactement ce qu'elle essaie d'être.

import { usePathname } from "next/navigation";

const SANS_HABILLAGE = ["/embed", "/ia"];

export default function MasqueSurEmbed({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (SANS_HABILLAGE.some((p) => pathname === p || pathname?.startsWith(`${p}/`))) return null;
  return <>{children}</>;
}
