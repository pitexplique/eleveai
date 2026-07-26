"use client";

// Petit bouton « copier » pour le numéro Wero : sur mobile, on colle le
// numéro dans l'appli bancaire → Wero. tel: ne suffit pas (Wero n'ouvre pas
// depuis un lien), donc on facilite le copier-coller.

import { useState } from "react";

export default function CopierNumero({ numero }: { numero: string }) {
  const [copie, setCopie] = useState(false);

  async function copier() {
    try {
      await navigator.clipboard.writeText(numero);
      setCopie(true);
      // On repasse le bouton à l'état neutre après 2 s, sans setInterval.
      setTimeout(() => setCopie(false), 2000);
    } catch {
      // Presse-papiers indisponible (vieux navigateur / http) : on ne casse rien.
      setCopie(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copier}
      className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-black text-white transition hover:bg-white/[0.12]"
    >
      {copie ? "✅ Numéro copié" : "📋 Copier le numéro"}
    </button>
  );
}
