"use client";

// « L'agenda · En direct » — la version JOURNAL (papier/encre) de l'encart
// d'inscription aux calls. Même moteur que EncartCallEnDirect (lib/calls.ts +
// POST /api/call), mais typographié pour la Une : serif, filets, encre sur
// crème. L'ancien encart sombre était illisible sur le papier (retour Frédéric).
// S'il n'y a aucun call actif à venir, ne rend RIEN (zéro entretien).
// Le lien visio n'apparaît jamais ici : il est envoyé par email aux inscrits.

import { useMemo, useState } from "react";
import Image from "next/image";
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
  etablissement: "Responsable d'établissement",
};

const INK = "#1d1c16";

export default function AgendaJournal() {
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

  const inputCls =
    "rounded-sm border border-[#1d1c16]/35 bg-white/50 px-3 py-2 text-sm font-semibold text-[#1d1c16] placeholder-[#1d1c16]/40 outline-none focus:border-[#1d1c16]";

  return (
    <section id="agenda" className="mx-auto mt-10 max-w-6xl scroll-mt-24" style={{ color: INK }}>
      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-red-800">
        <span className="relative mr-1 inline-flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-700 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-700" />
        </span>{" "}
        L&apos;agenda · En direct · Gratuit
      </p>
      <div className="mt-1 border-b-2 border-[#1d1c16] pb-2">
        <h2 className="font-serif text-3xl font-black leading-tight sm:text-4xl">
          Rencontrez la rédaction, en visio
        </h2>
      </div>

      <div className="mt-4 grid gap-8 lg:grid-cols-12">
        {/* L'annonce : le visage derrière le call (on rencontre quelqu'un). */}
        <div className="lg:col-span-7">
          {/* Sélecteur si plusieurs calls à venir */}
          {aVenir.length > 1 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {aVenir.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => choisirCall(c.id)}
                  className={`rounded-sm px-3.5 py-1.5 text-xs font-black transition ${
                    c.id === call.id
                      ? "bg-[#1d1c16] text-[#f6f1e4]"
                      : "border border-[#1d1c16]/30 text-[#1d1c16]/70 hover:bg-[#1d1c16]/10"
                  }`}
                >
                  {formatDateCall(c.date).split(" · ")[0]}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-start gap-3">
            <Image
              src="/images/avatar-frederic-visage.webp"
              alt="Frédéric Lacoste, professeur de maths et fondateur d'EleveAI"
              width={64}
              height={64}
              className="h-14 w-14 shrink-0 rounded-full border border-[#1d1c16]/30 object-cover sm:h-16 sm:w-16"
            />
            <div>
              <h3 className="font-serif text-xl font-black leading-snug sm:text-2xl">
                {call.titre}
              </h3>
              <p className="mt-1 text-sm font-medium leading-6 text-[#1d1c16]/75">
                {call.description}
              </p>
            </div>
          </div>
          <p className="mt-2 text-sm font-black text-red-800">
            📅 {formatDateCall(call.date)} · {call.duree} · en visio
          </p>
          <p className="mt-0.5 text-xs font-semibold text-[#1d1c16]/55">
            🌍 Soit {formatHeuresMonde(call.date)}
          </p>
        </div>

        {/* Le coupon d'inscription — comme un coupon détachable de journal. */}
        <div className="border-[#1d1c16]/25 lg:col-span-5 lg:border-l lg:pl-6">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
            ✂️ Le coupon d&apos;inscription
          </p>
          {etat === "ok" || etat === "deja" ? (
            <p className="mt-3 border border-[#1d1c16]/30 bg-white/50 p-3 text-sm font-black text-emerald-900">
              {etat === "deja"
                ? "Tu es déjà inscrit·e ✓ Le lien arrivera par email avant le call."
                : "Inscription enregistrée ✓ Tu recevras le lien par email avant le call."}
            </p>
          ) : (
            <form onSubmit={inscrire} className="mt-3 flex flex-col gap-2">
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="text"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  placeholder="Prénom (optionnel)"
                  className={`${inputCls} sm:w-40`}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ton@email.fr"
                  className={`${inputCls} flex-1`}
                />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as CallRole)}
                  className={`${inputCls} flex-1`}
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
                  className="rounded-sm bg-[#1d1c16] px-5 py-2 text-sm font-black text-[#f6f1e4] transition hover:bg-emerald-900 disabled:opacity-60"
                >
                  {etat === "envoi" ? "…" : "Je m'inscris →"}
                </button>
              </div>
              <label className="flex items-center gap-2 pt-1 text-xs font-semibold text-[#1d1c16]/60">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="h-3.5 w-3.5 accent-[#1d1c16]"
                />
                Me prévenir aussi des prochaines nouveautés (optionnel)
              </label>
              {etat === "erreur" && (
                <p className="text-xs font-black text-red-800">{erreur}</p>
              )}
            </form>
          )}
          <p className="mt-2 text-[11px] font-medium italic text-[#1d1c16]/50">
            Ton email sert uniquement à t&apos;envoyer le lien du call (et un
            rappel). Jamais de pub.
          </p>
        </div>
      </div>
    </section>
  );
}
