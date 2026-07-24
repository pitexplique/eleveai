"use client";

// Suivi AGRÉGÉ de navigation — « d'où viennent les visiteurs, et où vont-ils ».
// N'envoie QUE la section (1er segment d'URL), la provenance (?from=…) et, si
// l'élève est connecté, son code établissement. Aucune identité, aucun
// identifiant de session, aucun profilage individuel (choix RGPD).
//
// 24/07 : le verrou « élève connecté » est LEVÉ. Avant, on ne voyait que ~2 %
// du trafic (les élèves connectés) alors que l'essentiel des visiteurs arrive
// anonyme par le SEO (cahier de vacances). On compte donc tout le monde — mais
// toujours de façon agrégée et anonyme.
//
// Fire-and-forget : ne bloque jamais la navigation.

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useEleve } from "@/context/EleveContext";

export default function PageViewTracker() {
  const pathname = usePathname();
  const { eleve } = useEleve();
  const lastSent = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;

    const seg = pathname.split("/").filter(Boolean)[0];
    const page = seg ? `/${seg}` : "/";
    if (page.startsWith("/admin")) return; // on ne suit pas l'admin

    // LA PROVENANCE (?from=cahier…) : c'est elle qui rend mesurable le tunnel
    // « le cahier amène-t-il vraiment au coach ? ». Lue sur window plutôt qu'avec
    // useSearchParams : ce hook, appelé depuis le layout, forcerait le rendu
    // dynamique de tout le site (mauvais pour le SEO).
    let source = "";
    try {
      source = new URLSearchParams(window.location.search).get("from") || "";
    } catch {
      /* pas de query : tant pis */
    }

    // Pas deux fois la même section+provenance d'affilée.
    const cle = `${page}|${source}`;
    if (lastSent.current === cle) return;
    lastSent.current = cle;

    const body = JSON.stringify({
      page,
      source,
      // Renseigné UNIQUEMENT si l'élève est connecté ; null pour un visiteur
      // anonyme (on ne cherche pas à savoir qui il est).
      code_etablissement: eleve
        ? eleve.code_etablissement?.trim() || "INDEPENDANT"
        : null,
    });

    // sendBeacon = idéal pour un envoi non bloquant qui survit au changement de page.
    try {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon && navigator.sendBeacon("/api/track", blob)) return;
    } catch {
      /* repli fetch ci-dessous */
    }
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  }, [pathname, eleve]);

  return null;
}
