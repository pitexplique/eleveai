"use client";

// Masque le pied de site (footer, remerciements) là où il ferait doublon :
//   — /guide-de-survie/* : produits imprimables qui finissent par leur propre
//     CTA coach (demande du 26/07).
//
// ⛔⛔ /accueil EST SORTI DE CETTE LISTE LE 22/08, ET NE DOIT PAS Y REVENIR.
// Il y était depuis la refonte du 06/08 — « la page a son pied de page court ».
// Ce que personne n'avait mesuré, c'est ce que ça coupait : le footer porte
// 77 liens internes, dont les 12 classes du coach maths, les 9 du coach
// français, les quatre parcours, les coachs Brevet et Bac. Retiré de
// l'accueil, il laissait la page la plus forte du site ne servir que douze
// destinations — cgu, faq, tarifs, les espaces, qui-sommes-nous.
// ⭐ ET C'EST EXACTEMENT CE QUE GOOGLE AFFICHE sur la requête « eleveai.fr »
// (relevé du 22/08) : /accueil, /espace-eleves, /explorer, /espace-parents,
// /qui-sommes-nous, /espace-ecoles. Le coach et les parcours n'y sont pas —
// non parce qu'ils seraient désindexés (/coach-ia/maths est « Indexed
// successfully » chez Bing), mais parce que rien, depuis l'accueil, ne dit à
// un moteur qu'ils comptent. Un moteur classe ce vers quoi on pointe.
// ⚠️ Le coût est connu, et il est petit : +14,6 Ko sur l'accueil, soit +1,8
// unité Vercel par visite (7,2 → 9,0). Les liens du footer sont en
// `prefetch={false}` depuis le 04/08, donc aucune lecture ISR ne s'y ajoute :
// c'est du HTML, rien d'autre.
// ⭐ LE PIED DE PAGE COURT DE L'ACCUEIL RESTE (AccueilIA.tsx) : il tient le
// ton de la page. Le footer complet s'ajoute dessous, il ne le remplace pas.

import { usePathname } from "next/navigation";

const SANS_PIED_DE_PAGE = ["/guide-de-survie"];

export default function MasqueSurGuide({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (SANS_PIED_DE_PAGE.some((p) => pathname === p || pathname?.startsWith(`${p}/`))) return null;
  return <>{children}</>;
}
