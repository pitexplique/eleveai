"use client";

// Masque l'habillage du site (header, footer, barres flottantes) sur les
// pages /embed/* : elles sont faites pour vivre en iframe chez d'autres
// (les quotidiens de l'île) — seul le contenu embarqué doit s'afficher.

import { usePathname } from "next/navigation";

export default function MasqueSurEmbed({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/embed")) return null;
  return <>{children}</>;
}
