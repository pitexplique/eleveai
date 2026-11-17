"use client";

// « Code oublié » (17/11) : remettre à zéro le code à 6 chiffres d'un compte
// par email. La personne choisit ensuite un nouveau code à sa connexion.

import { useState } from "react";

export default function AdminCodeOublieClient() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<{ ok: boolean; texte: string } | null>(null);
  const [chargement, setChargement] = useState(false);

  const remettre = async () => {
    const adresse = email.trim().toLowerCase();
    if (!adresse) return;
    if (!window.confirm(`Remettre à zéro le code de ${adresse} ?`)) return;
    setChargement(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/code-6-chiffres", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: adresse }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.ok) {
        setMessage({
          ok: true,
          texte: `Code remis à zéro pour ${adresse}. À sa prochaine connexion, la personne choisit un nouveau code.`,
        });
        setEmail("");
      } else {
        setMessage({ ok: false, texte: data?.error ?? "Erreur. Réessayez." });
      }
    } catch {
      setMessage({ ok: false, texte: "Erreur réseau. Réessayez." });
    } finally {
      setChargement(false);
    }
  };

  return (
    <section className="rounded-xl border border-emerald-700 bg-emerald-950/30 p-4">
      <p className="font-bold text-emerald-300">🔢 Code à 6 chiffres oublié</p>
      <p className="mt-0.5 text-xs text-slate-400">
        Comptes par email seulement. On efface le code : à sa prochaine
        connexion, la personne en choisit un nouveau. Aucun mail n’est envoyé.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="adresse@exemple.fr"
          className="min-w-[220px] flex-1 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white"
        />
        <button
          type="button"
          onClick={remettre}
          disabled={chargement || !email.trim()}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-50"
        >
          {chargement ? "…" : "Remettre le code à zéro"}
        </button>
      </div>
      {message && (
        <p className={`mt-2 text-sm ${message.ok ? "text-emerald-300" : "text-red-400"}`}>
          {message.texte}
        </p>
      )}
    </section>
  );
}
