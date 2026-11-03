"use client";

// Formulaire « Je rejoins l'aventure » — poste sur /api/aventure.

import { useState } from "react";
import { PAYS_AVENTURE } from "@/lib/aventure/pays";

const MAX_MESSAGE = 600;

const MESSAGES: Record<string, string> = {
  "deja-candidat": "Votre demande est déjà arrivée cette année : elle est bien là.",
  "trop-de-candidatures": "Trop d’envois depuis cet appareil. Réessayez dans une demi-heure.",
  "email-invalide": "Cette adresse e-mail n’a pas l’air valide.",
  "pays-inconnu": "Choisissez votre pays.",
};

const CHAMP =
  "mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white placeholder-white/40 outline-none focus:border-amber-300/60";

export default function FormulaireAventure() {
  const [pays, setPays] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [niveaux, setNiveaux] = useState("");
  const [etablissement, setEtablissement] = useState("");
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
      const res = await fetch("/api/aventure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pays, prenom, email, niveaux, etablissement, message, hp }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.ok) {
        setEnvoi("ok");
      } else {
        setEnvoi("err");
        setErreur(MESSAGES[data?.erreur] || "Envoi impossible. Réessayez.");
      }
    } catch {
      setEnvoi("err");
      setErreur("Erreur réseau. Réessayez.");
    }
  }

  if (envoi === "ok") {
    return (
      <div className="rounded-2xl border border-emerald-300/30 bg-emerald-400/10 p-6 text-center">
        <p className="text-lg font-black text-emerald-200">
          ✅ Bienvenue dans l’aventure : votre demande est arrivée.
        </p>
        <p className="mx-auto mt-2 max-w-lg text-sm font-semibold text-white/75">
          Frédéric vous répond par e-mail avec l’accès de votre classe.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={envoyer} className="space-y-5">
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

      <div>
        <label className="text-sm font-black text-white" htmlFor="aventure-pays">
          1. Votre pays
        </label>
        <select
          id="aventure-pays"
          required
          value={pays}
          onChange={(e) => setPays(e.target.value)}
          className={CHAMP}
        >
          <option value="">Choisir…</option>
          {PAYS_AVENTURE.map((p) => (
            <option key={p.slug} value={p.slug} className="bg-slate-900">
              {p.nom}
            </option>
          ))}
        </select>
      </div>

      <div>
        <span className="text-sm font-black text-white">2. Vous</span>
        <input
          type="text"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          placeholder="Votre prénom"
          maxLength={40}
          className={CHAMP}
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email"
          className={CHAMP}
        />
      </div>

      <div>
        <span className="text-sm font-black text-white">3. Votre classe</span>
        <input
          type="text"
          value={niveaux}
          onChange={(e) => setNiveaux(e.target.value)}
          placeholder="Ce que vous enseignez cette année (ex. : 6e et 4e)"
          maxLength={80}
          className={CHAMP}
        />
        <input
          type="text"
          value={etablissement}
          onChange={(e) => setEtablissement(e.target.value)}
          placeholder="Ville ou établissement (facultatif)"
          maxLength={120}
          className={CHAMP}
        />
      </div>

      <div>
        <label className="text-sm font-black text-white" htmlFor="aventure-message">
          4. Un mot sur votre classe (facultatif)
        </label>
        <textarea
          id="aventure-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, MAX_MESSAGE))}
          className={CHAMP}
        />
        <p className="mt-1 text-right text-xs font-semibold text-white/40">
          {message.length} / {MAX_MESSAGE}
        </p>
      </div>

      {envoi === "err" && (
        <p className="rounded-xl border border-rose-300/30 bg-rose-400/10 px-4 py-3 text-sm font-bold text-rose-100">
          {erreur}
        </p>
      )}

      <button
        type="submit"
        disabled={!pays || !email || envoi === "loading"}
        className="w-full rounded-xl bg-amber-400 px-5 py-4 text-base font-black text-slate-900 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {envoi === "loading" ? "Envoi…" : "Je rejoins l’aventure"}
      </button>
    </form>
  );
}
