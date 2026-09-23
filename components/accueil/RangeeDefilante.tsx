"use client";

// UNE RANGÉE QUI DÉFILE, ET QUI LE DIT (23/09/2026).
//
// ⛔ LE DÉFAUT MESURÉ : à 375 px, la ligne des matières montre quatre mots sur
// six. « Économie » et « IA » sont hors champ, et RIEN à l'écran ne dit qu'il y
// a quelque chose à droite — pas de barre (elle est masquée par
// `.rangee-defilante` dans globals.css, exprès), pas de flèche, pas de coupure
// visible puisque le dernier mot entier tombe pile au bord. Un visiteur sur
// téléphone — 38 % d'entre eux — n'a aucune raison de faire glisser : pour lui,
// le site fait quatre matières.
//
// LA SORTIE : un dégradé de 32 px au bord, du côté où il reste de la route.
// Il apparaît quand ça déborde, disparaît quand tout tient — donc jamais de
// fausse promesse sur un grand écran où les six mots sont déjà là.
//
// ⚠️ POURQUOI DU JAVASCRIPT ALORS QU'ON PRÉFÈRE LE CSS : il n'existe aucun
// sélecteur CSS de « ce conteneur déborde-t-il ». On a essayé de s'en passer en
// bornant le dégradé à une largeur d'écran (`sm:hidden`) — faux dans les deux
// sens : la ligne d'ACTIONS déborde encore à 1 009 px, et la ligne des matières
// tient déjà à 800 px dans certaines langues d'affichage. Un seuil fixe aurait
// menti la moitié du temps. `ResizeObserver` observe l'objet lui-même.
//
// ⚠️ ET LE COÛT EST BORNÉ : un seul observateur par rangée, aucune requête,
// aucun rendu pendant le défilement tant que l'état ne change pas (les deux
// `setEtat` ne sont appelés que sur un changement réel, voir `maj`).

import { useCallback, useEffect, useRef, useState } from "react";

export default function RangeeDefilante({
  className,
  fond,
  children,
  role,
  "aria-label": ariaLabel,
  onKeyDown,
}: {
  /** Les classes du conteneur qui défile (mise en page, espacement, padding). */
  className: string;
  /** La couleur de fond de la rangée, pour que le dégradé s'y fonde.
   *  ⚠️ Une classe Tailwind `from-…`, pas une couleur : le dégradé part du fond
   *  opaque et va vers le transparent. */
  fond: string;
  children: React.ReactNode;
  role?: string;
  "aria-label"?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [gauche, setGauche] = useState(false);
  const [droite, setDroite] = useState(false);

  const maj = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    // ⚠️ La marge de 2 px absorbe les arrondis de sous-pixel : sans elle, une
    // rangée qui tient pile affiche un dégradé fantôme sur certains zooms.
    const g = el.scrollLeft > 2;
    const d = el.scrollLeft + el.clientWidth < el.scrollWidth - 2;
    setGauche((p) => (p === g ? p : g));
    setDroite((p) => (p === d ? p : d));
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    maj();
    const ro = new ResizeObserver(maj);
    ro.observe(el);
    // Les enfants aussi : une icône qui charge change la largeur totale.
    for (const enfant of Array.from(el.children)) ro.observe(enfant);
    return () => ro.disconnect();
  }, [maj]);

  return (
    <div className="relative">
      <div
        ref={ref}
        onScroll={maj}
        className={className}
        role={role}
        aria-label={ariaLabel}
        onKeyDown={onKeyDown}
      >
        {children}
      </div>
      {/* ⚠️ `pointer-events-none` : le dégradé recouvre le premier et le dernier
          bouton de la rangée. Sans lui, il avalerait leur clic — un défaut
          qu'on ne verrait qu'au doigt, sur le bouton le plus à droite. */}
      {gauche && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r to-transparent ${fond}`}
        />
      )}
      {droite && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l to-transparent ${fond}`}
        />
      )}
    </div>
  );
}
