"use client";

// Formulaire « Participez à l'aventure » — poste sur /api/contact
// (table contact_messages, source=partenariat) : l'admin retrouve les
// demandes dans son dashboard, rangées avec les partenariats.

import { useState } from "react";

export default function FormulaireAventure() {
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [hp, setHp] = useState(""); // pot de miel anti-spam (invisible)
  const [envoi, setEnvoi] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [erreur, setErreur] = useState("");

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();
    if (envoi === "loading" || envoi === "ok") return;
    setEnvoi("loading");
    setErreur("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "Partenaire",
          topic: "Partenariat",
          priority: "Normal",
          name,
          org,
          email,
          message,
          source: "partenariat",
          hp,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.ok) {
        setEnvoi("ok");
      } else {
        setEnvoi("err");
        setErreur(data?.error || "Envoi impossible. Réessayez.");
      }
    } catch {
      setEnvoi("err");
      setErreur("Erreur réseau. Réessayez.");
    }
  }

  if (envoi === "ok") {
    return (
      <div className="rounded-2xl border border-emerald-300/30 bg-emerald-400/10 p-5 text-center">
        <p className="text-lg font-black text-emerald-200">
          ✅ Merci ! Votre proposition est bien arrivée.
        </p>
        <p className="mt-1 text-sm font-semibold text-white/75">
          Frédéric vous répond personnellement, en général sous quelques jours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={envoyer} className="space-y-3">
      {/* Pot de miel : invisible pour un humain, rempli par les robots. */}
      <input
        type="text"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Votre nom"
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white placeholder-white/40 outline-none focus:border-amber-300/60"
        />
        <input
          type="text"
          required
          value={org}
          onChange={(e) => setOrg(e.target.value)}
          placeholder="Votre entreprise / institution"
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white placeholder-white/40 outline-none focus:border-amber-300/60"
        />
      </div>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Votre email"
        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white placeholder-white/40 outline-none focus:border-amber-300/60"
      />
      <textarea
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Votre métier, ce que vous aimeriez faire découvrir aux élèves… (quelques lignes suffisent)"
        rows={4}
        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white placeholder-white/40 outline-none focus:border-amber-300/60"
      />
      {envoi === "err" && (
        <p className="text-sm font-bold text-rose-300">⚠️ {erreur}</p>
      )}
      <button
        type="submit"
        disabled={envoi === "loading"}
        className="w-full rounded-xl bg-amber-400 px-6 py-3 text-base font-black text-[#041B33] transition hover:brightness-110 disabled:opacity-60 sm:w-auto"
      >
        {envoi === "loading" ? "Envoi…" : "Participer à l'aventure →"}
      </button>
    </form>
  );
}
