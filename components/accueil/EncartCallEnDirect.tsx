"use client";

// Encart « 🔴 En direct » de l'accueil : inscription au(x) prochain(s) calls
// (sessions visio avec le fondateur). Lit lib/calls.ts (source de vérité) ;
// s'il n'y a aucun call actif à venir, ne rend RIEN (zéro entretien).
// Le lien visio n'apparaît jamais ici : il est envoyé par email aux inscrits.

import { useMemo, useState } from "react";
import {
  callsAVenir,
  formatDateCall,
  formatHeuresMonde,
  type CallRole,
} from "@/lib/calls";

const ROLE_LABELS: Record<CallRole, string> = {
  eleve: "Élève",
  parent: "Parent",
  enseignant: "Enseignant",
};

export default function EncartCallEnDirect() {
  // La liste est figée au premier rendu (pas de tic-tac pendant la visite).
  const aVenir = useMemo(() => callsAVenir(), []);

  const [callId, setCallId] = useState(aVenir[0]?.id ?? "");
  const call = aVenir.find((c) => c.id === callId) ?? aVenir[0];

  const [email, setEmail] = useState("");
  const [prenom, setPrenom] = useState("");
  const [role, setRole] = useState<CallRole>(call?.publicVise ?? "parent");
  const [consent, setConsent] = useState(false);
  const [etat, setEtat] = useState<"idle" | "envoi" | "ok" | "deja" | "erreur">(
    "idle"
  );
  const [erreur, setErreur] = useState("");

  if (!call) return null;

  function choisirCall(id: string) {
    setCallId(id);
    const c = aVenir.find((x) => x.id === id);
    if (c) setRole(c.publicVise);
    setEtat("idle");
  }

  async function inscrire(e: React.FormEvent) {
    e.preventDefault();
    if (etat === "envoi") return;
    setEtat("envoi");
    setErreur("");
    try {
      const res = await fetch("/api/call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          call_id: call!.id,
          email,
          prenom,
          role,
          consentement: consent,
          hp: "",
        }),
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
    <section className="px-4 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-2xl border border-rose-300/30 bg-gradient-to-br from-rose-500/[0.12] to-white/[0.03] p-5 sm:p-6">
        <p className="inline-flex items-center gap-2 rounded-full bg-rose-500/20 px-3 py-1 text-xs font-black uppercase tracking-wide text-rose-200">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-400" />
          </span>
          En direct · gratuit
        </p>

        {/* Sélecteur si plusieurs calls à venir */}
        {aVenir.length > 1 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {aVenir.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => choisirCall(c.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-black transition ${
                  c.id === call.id
                    ? "bg-white text-slate-900"
                    : "border border-white/20 bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {formatDateCall(c.date).split(" · ")[0]}
              </button>
            ))}
          </div>
        )}

        <h2 className="mt-3 text-xl font-black text-white sm:text-2xl">
          {call.titre}
        </h2>
        <p className="mt-1 text-sm font-semibold leading-snug text-white/75">
          {call.description}
        </p>
        <p className="mt-2 text-sm font-black text-rose-200">
          📅 {formatDateCall(call.date)} · {call.duree} · en visio
        </p>
        <p className="mt-0.5 text-xs font-semibold text-white/50">
          🌍 Soit {formatHeuresMonde(call.date)}
        </p>

        {etat === "ok" || etat === "deja" ? (
          <p className="mt-4 rounded-xl border border-emerald-300/30 bg-emerald-400/10 p-3 text-sm font-black text-emerald-200">
            {etat === "deja"
              ? "Tu es déjà inscrit·e ✓ Le lien arrivera par email avant le call."
              : "Inscription enregistrée ✓ Tu recevras le lien par email avant le call."}
          </p>
        ) : (
          <form
            onSubmit={inscrire}
            className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <input
              type="text"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              placeholder="Prénom (optionnel)"
              className="rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white placeholder-white/40 outline-none focus:border-rose-300/60 sm:w-40"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ton@email.fr"
              className="flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white placeholder-white/40 outline-none focus:border-rose-300/60 sm:min-w-52"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as CallRole)}
              className="rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white outline-none focus:border-rose-300/60 [&>option]:text-slate-900"
              aria-label="Je suis"
            >
              {(Object.keys(ROLE_LABELS) as CallRole[]).map((r) => (
                <option key={r} value={r}>
                  {ROLE_LABELS[r]}
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={etat === "envoi"}
              className="rounded-full bg-rose-400 px-5 py-2.5 text-sm font-black text-slate-900 shadow-lg shadow-rose-500/30 transition hover:bg-rose-300 disabled:opacity-60"
            >
              {etat === "envoi" ? "…" : "Je m'inscris →"}
            </button>

            <label className="flex w-full items-center gap-2 pt-1 text-xs font-semibold text-white/55">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="h-3.5 w-3.5 accent-rose-400"
              />
              Me prévenir aussi des prochaines nouveautés (optionnel)
            </label>
            {etat === "erreur" && (
              <p className="w-full text-xs font-black text-rose-300">{erreur}</p>
            )}
          </form>
        )}

        <p className="mt-3 text-[11px] font-semibold text-white/40">
          Ton email sert uniquement à t&apos;envoyer le lien du call (et un
          rappel). Jamais de pub.
        </p>
      </div>
    </section>
  );
}
