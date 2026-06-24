"use client";

import { useEffect } from "react";

/**
 * Avant impression / export PDF, on OUVRE réellement tous les `<details>` de
 * correction (`.fiche-correction`), puis on les referme après. Indispensable :
 * sur les Chrome récents, un `<details>` fermé masque son contenu d'une façon
 * que le CSS `display:block` ne force plus → sans ça, seules les corrections
 * ouvertes au clic apparaissaient dans le PDF.
 *
 * Monté une seule fois via app/fiches-cours/layout.tsx → couvre toutes les fiches.
 */
export default function PrintCorrections() {
  useEffect(() => {
    const MARK = "data-print-opened";

    const openAll = () => {
      document
        .querySelectorAll<HTMLDetailsElement>("details.fiche-correction")
        .forEach((d) => {
          if (!d.open) {
            d.open = true;
            d.setAttribute(MARK, "");
          }
        });
    };

    const restore = () => {
      document
        .querySelectorAll<HTMLDetailsElement>(`details.fiche-correction[${MARK}]`)
        .forEach((d) => {
          d.open = false;
          d.removeAttribute(MARK);
        });
    };

    window.addEventListener("beforeprint", openAll);
    window.addEventListener("afterprint", restore);

    // Safari et certains navigateurs passent par matchMedia plutôt que beforeprint.
    const mql = window.matchMedia("print");
    const onChange = (e: MediaQueryListEvent) => (e.matches ? openAll() : restore());
    mql.addEventListener?.("change", onChange);

    return () => {
      window.removeEventListener("beforeprint", openAll);
      window.removeEventListener("afterprint", restore);
      mql.removeEventListener?.("change", onChange);
    };
  }, []);

  return null;
}
