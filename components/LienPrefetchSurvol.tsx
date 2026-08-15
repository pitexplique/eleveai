"use client";

// ⭐ LE LIEN QUI NE PRÉCHARGE QUE CE QU'ON VISE (15/08/2026).
//
// Sur une grille de cartes, le `<Link>` de Next précharge CHAQUE carte dès
// qu'elle entre dans le viewport. Sur le hub des cahiers de vacances, ça faisait
// jusqu'à 15 payloads RSC téléchargés — mesurés entre 36 et 101 Ko, soit ~1,1 Mo
// par visite — pour UN seul cahier réellement ouvert. Deux dégâts :
//
//  1. LE QUOTA. Chaque préchargement compte comme une ISR Read et une Edge
//     Request chez Vercel. Le compteur était à 804K/1M de lectures ISR sur le
//     plan Hobby, et le hub est la page la plus visitée du site.
//  2. LES CHIFFRES. Dans Observability, les 15 cahiers apparaissaient visités
//     alors que personne ne les avait ouverts — impossible de savoir lequel
//     marche. (Analytics, lui, ne compte que les vraies navigations : c'est la
//     source à croire. Idem pour `pages_vues`, alimenté par PageViewTracker.)
//
// Le survol est le bon signal : il dit l'intention sans la deviner. On précharge
// alors une seule carte, et le clic reste instantané.
//
// ⚠️ `onTouchStart` n'est PAS du zèle : sur mobile il n'y a pas de survol, et le
// hub des cahiers est massivement lu au téléphone. Sans lui, l'élève sur 4G
// perdrait le gain de vitesse au lieu de le gagner.
// ⚠️ `onFocus` pour la navigation au clavier, qui mérite la même page instantanée.

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function LienPrefetchSurvol({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  // Une seule fois par carte : sans ce verrou, un aller-retour de souris sur la
  // grille relancerait un préchargement à chaque passage — le gaspillage qu'on
  // vient justement de supprimer.
  const dejaPrecharge = useRef(false);

  const precharger = () => {
    if (dejaPrecharge.current) return;
    dejaPrecharge.current = true;
    router.prefetch(href);
  };

  return (
    <Link
      href={href}
      prefetch={false}
      className={className}
      onMouseEnter={precharger}
      onFocus={precharger}
      onTouchStart={precharger}
    >
      {children}
    </Link>
  );
}
