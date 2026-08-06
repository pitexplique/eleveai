"use client";

// Masque le pied de site (footer, remerciements) là où il ferait doublon :
//   — /guide-de-survie/* : produits imprimables qui finissent par leur propre
//     CTA coach (demande du 26/07) ;
//   — /accueil : depuis la refonte du 06/08, la page a son pied de page court.
//     Le header, lui, RESTE — c'est la seule porte vers les espaces.

import { usePathname } from "next/navigation";

const SANS_PIED_DE_PAGE = ["/guide-de-survie", "/accueil"];

export default function MasqueSurGuide({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (SANS_PIED_DE_PAGE.some((p) => pathname === p || pathname?.startsWith(`${p}/`))) return null;
  return <>{children}</>;
}
