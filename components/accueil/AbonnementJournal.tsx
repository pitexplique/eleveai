"use client";

// « Recevez le journal » — l'abonnement GRATUIT à la newsletter, en pied de
// Une (l'endroit où les vrais quotidiens mettent leur bulletin d'abonnement).
// POST /api/newsletter/subscribe → users_email.accepte_newsletter = true.
// Rien n'est encaissé ici : c'est un email, pas une caisse (statut en attente).
// Désinscription en 1 clic dans chaque email (jeton HMAC, déjà en place).

import { useState } from "react";

export default function AbonnementJournal() {
  const [email, setEmail] = useState("");
  const [etat, setEtat] = useState<"idle" | "envoi" | "ok" | "deja" | "erreur">(
    "idle"
  );
  const [erreur, setErreur] = useState("");

  async function abonner(e: React.FormEvent) {
    e.preventDefault();
    if (etat === "envoi") return;
    setEtat("envoi");
    setErreur("");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, hp: "" }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.ok) {
        setEtat(data.deja ? "deja" : "ok");
      } else {
        setErreur(data?.error || "Réessaie dans un instant.");
        setEtat("erreur");
      }
    } catch {
      setErreur("Réessaie dans un instant.");
      setEtat("erreur");
    }
  }

  return (
    <section
      id="abonnement"
      className="mx-auto mt-10 max-w-6xl scroll-mt-24 border-y-4 border-double border-[#f0fafc] py-5 text-center text-[#f0fafc]"
    >
      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#ffb08a]">
        ✉️ L&apos;abonnement · Gratuit, comme le reste
      </p>
      <h2 className="mt-1 font-serif text-2xl font-black leading-tight sm:text-3xl">
        Recevez le journal
      </h2>
      <p className="mx-auto mt-1.5 max-w-xl text-sm font-medium leading-6 text-[#f0fafc]/75">
        Les nouveaux épisodes, le défi de la semaine, les nouveautés — dans
        votre boîte, de temps en temps. Jamais de pub.
      </p>

      {etat === "ok" || etat === "deja" ? (
        <p className="mx-auto mt-4 max-w-md border border-[#f0fafc]/30 bg-white/50 p-3 text-sm font-black text-[#ffb08a]">
          {etat === "deja"
            ? "Vous êtes déjà abonné·e ✓ La prochaine édition arrive."
            : "Abonnement enregistré ✓ À bientôt dans votre boîte."}
        </p>
      ) : (
        <form
          onSubmit={abonner}
          className="mx-auto mt-4 flex max-w-md flex-col gap-2 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.fr"
            className="flex-1 rounded-sm border border-[#f0fafc]/35 bg-white/50 px-3 py-2 text-sm font-semibold text-[#f0fafc] placeholder-[#f0fafc]/40 outline-none focus:border-[#f0fafc]"
          />
          <button
            type="submit"
            disabled={etat === "envoi"}
            className="rounded-sm bg-[#f0fafc] px-5 py-2 text-sm font-black text-[#0e7490] transition hover:bg-[#ffb08a] disabled:opacity-60"
          >
            {etat === "envoi" ? "…" : "Je m'abonne →"}
          </button>
        </form>
      )}
      {etat === "erreur" && (
        <p className="mt-2 text-xs font-black text-red-800">{erreur}</p>
      )}
      <p className="mt-2 text-[11px] font-medium italic text-[#f0fafc]/50">
        Désinscription en un clic, dans chaque email.
      </p>
    </section>
  );
}
