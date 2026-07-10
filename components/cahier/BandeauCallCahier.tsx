"use client";

// Bandeau FIN « en direct » des pages cahier de vacances : une seule ligne
// sous le CTA coach (pas un 2e pavé — le haut de page a été nettoyé exprès).
// Ciblage : cahiers lycée -> call révision ; autres -> call découverte
// (le parent qui imprime). Lit lib/calls.ts : disparaît tout seul quand le
// call est passé. Clic -> l'encart d'inscription de l'accueil (#en-direct).

import Link from "next/link";
import { useMemo } from "react";
import { callsAVenir, formatDateCall } from "@/lib/calls";

export default function BandeauCallCahier({ slug }: { slug: string }) {
  const call = useMemo(() => {
    const aVenir = callsAVenir();
    if (aVenir.length === 0) return null;
    const lycee = /premiere|2nde|terminale|bac/.test(slug);
    return (
      aVenir.find((c) =>
        lycee ? c.id.startsWith("revision-premiere") : c.publicVise === "parent"
      ) ?? aVenir[0]
    );
  }, [slug]);

  if (!call) return null;

  return (
    <Link
      href="/accueil#en-direct"
      className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-center text-xs font-bold text-rose-900 transition hover:bg-rose-100 sm:text-sm"
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
      </span>
      <span className="font-black">En direct avec Frédéric :</span>
      <span>{call.titre}</span>
      <span className="text-rose-700/80">· {formatDateCall(call.date)}</span>
      <span className="font-black underline decoration-rose-400 underline-offset-2">
        Je m&apos;inscris →
      </span>
    </Link>
  );
}
