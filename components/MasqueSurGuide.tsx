"use client";

// Masque le pied de site (footer, remerciements) sur les pages
// /guide-de-survie/* : ce sont des produits imprimables qui se terminent
// par leur propre CTA coach — le footer du site et le bandeau de
// remerciements élèves n'y ont pas leur place (demande du 26/07).

import { usePathname } from "next/navigation";

export default function MasqueSurGuide({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/guide-de-survie")) return null;
  return <>{children}</>;
}
