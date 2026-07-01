"use client";

// Suivi AGRÉGÉ de navigation — « où vont les élèves ».
// N'envoie QUE la section (1er segment d'URL) + le code établissement, et
// uniquement pour un élève connecté. Aucune identité, aucun profilage
// individuel (choix RGPD). Fire-and-forget : ne bloque jamais la navigation.

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useEleve } from "@/context/EleveContext";

export default function PageViewTracker() {
  const pathname = usePathname();
  const { eleve } = useEleve();
  const lastSent = useRef<string | null>(null);

  useEffect(() => {
    if (!eleve || !pathname) return;

    const seg = pathname.split("/").filter(Boolean)[0];
    const page = seg ? `/${seg}` : "/";
    if (page.startsWith("/admin")) return; // on ne suit pas l'admin
    if (lastSent.current === page) return; // pas deux fois la même section d'affilée
    lastSent.current = page;

    const body = JSON.stringify({
      page,
      code_etablissement: eleve.code_etablissement?.trim() || "INDEPENDANT",
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
