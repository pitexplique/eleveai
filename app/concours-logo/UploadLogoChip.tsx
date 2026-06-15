"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useEleve } from "@/context/EleveContext";

type Statut = "idle" | "envoi" | "ok" | "erreur";

export default function UploadLogoChip() {
  const { eleve } = useEleve();
  const [ouvert, setOuvert] = useState(false);
  const [statut, setStatut] = useState<Statut>("idle");
  const [message, setMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [prenom, setPrenom] = useState("");
  const [classe, setClasse] = useState("");

  // Élève non connecté : on l'invite à se connecter.
  if (!eleve?.token) {
    return (
      <Link
        href="/auth/signin"
        className="inline-flex items-center justify-center rounded-full border border-cyan-200/40 bg-white/10 px-5 py-3 text-sm font-black text-cyan-100 transition hover:-translate-y-0.5 hover:bg-white/20"
      >
        Connecte-toi pour envoyer ton logo
      </Link>
    );
  }

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setStatut("erreur");
      setMessage("Choisis une image à envoyer.");
      return;
    }

    setStatut("envoi");
    setMessage("");

    const form = new FormData();
    form.append("file", file);
    if (prenom.trim()) form.append("prenom", prenom.trim());
    if (classe.trim()) form.append("classe", classe.trim());

    try {
      const res = await fetch("/api/concours-logo", {
        method: "POST",
        headers: { Authorization: `Bearer ${eleve!.token}` },
        body: form,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Envoi impossible.");
      }
      setStatut("ok");
      setMessage("Logo envoyé, merci ! Il apparaîtra dans la galerie.");
      if (fileRef.current) fileRef.current.value = "";
    } catch (err: any) {
      setStatut("erreur");
      setMessage(err?.message || "Envoi impossible.");
    }
  }

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setOuvert((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-5 py-3 text-sm font-black text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-amber-200"
      >
        <span aria-hidden>📤</span> Téléverser mon logo
      </button>

      {ouvert && (
        <form
          onSubmit={envoyer}
          className="mt-4 max-w-md rounded-2xl border border-white/15 bg-white/8 p-4 text-left"
        >
          <label className="block text-xs font-black uppercase tracking-wide text-cyan-100/80">
            Ton image (PNG, JPG, WEBP, GIF ou SVG — 5 Mo max)
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
              className="mt-2 block w-full text-sm text-white/80 file:mr-3 file:rounded-full file:border-0 file:bg-amber-300 file:px-4 file:py-2 file:text-sm file:font-black file:text-slate-950 hover:file:bg-amber-200"
            />
          </label>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <label className="block text-xs font-black uppercase tracking-wide text-cyan-100/80">
              Prénom
              <input
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                maxLength={60}
                placeholder="Ton prénom"
                className="mt-1 block w-full rounded-lg border border-white/15 bg-[#041B33] px-3 py-2 text-sm font-semibold text-white placeholder-white/30 focus:border-amber-300 focus:outline-none"
              />
            </label>
            <label className="block text-xs font-black uppercase tracking-wide text-cyan-100/80">
              Classe
              <input
                value={classe}
                onChange={(e) => setClasse(e.target.value)}
                maxLength={20}
                placeholder={eleve?.classe ?? "Ta classe"}
                className="mt-1 block w-full rounded-lg border border-white/15 bg-[#041B33] px-3 py-2 text-sm font-semibold text-white placeholder-white/30 focus:border-amber-300 focus:outline-none"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={statut === "envoi"}
            className="mt-4 inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-black text-[#041B33] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {statut === "envoi" ? "Envoi…" : "Envoyer mon logo"}
          </button>

          {message && (
            <p
              className={`mt-3 text-sm font-semibold ${
                statut === "ok" ? "text-emerald-300" : "text-rose-300"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
