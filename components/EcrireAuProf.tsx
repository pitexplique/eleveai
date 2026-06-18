"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useEleve } from "@/context/EleveContext";

/**
 * Bouton flottant « Écris à ton prof », réservé aux ÉLÈVES CONNECTÉS.
 * Demande des élèves (2026-06-18) : pouvoir écrire au professeur même pendant
 * les vacances. Message seul (pas de réponse demandée) ; l'identité de l'élève
 * (nom, classe, codes) est jointe automatiquement pour savoir qui écrit.
 *
 * Enregistre dans `contact_messages` via l'API existante /api/contact, avec
 * role="Élève", topic="Question", source="eleve-message" → filtrable dans
 * l'admin. Composant autonome : il suffit de poser <EcrireAuProf />.
 *
 * Position : bas AU CENTRE (les coins sont pris : Calculatrice à gauche,
 * Coach IA à droite). Bouton et panneau centrés horizontalement.
 */
export default function EcrireAuProf() {
  const { eleve } = useEleve();
  const connecte = Boolean(
    eleve?.code_etablissement?.trim() && eleve?.code_eleve?.trim()
  );

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [envoye, setEnvoye] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const champRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (open && !envoye) champRef.current?.focus();
  }, [open, envoye]);

  // Réservé aux élèves connectés.
  if (!connecte) return null;

  const prenomOuCode = eleve?.nom?.trim() || `Élève ${eleve?.code_eleve}`;

  async function onSend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const texte = message.trim();
    if (texte.length < 10) {
      setErreur("Écris un message d'au moins 10 caractères.");
      return;
    }
    if (envoi) return;

    setEnvoi(true);
    setErreur(null);
    try {
      const classe = eleve?.classe?.trim();
      const org = [classe, eleve?.code_etablissement, eleve?.code_eleve]
        .filter(Boolean)
        .join(" · ");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "Élève",
          topic: "Question",
          priority: "Normal",
          source: "eleve-message",
          name: prenomOuCode,
          org,
          message: texte,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Envoi impossible.");
      }
      setEnvoye(true);
      setMessage("");
    } catch (e) {
      setErreur(
        e instanceof Error ? e.message : "Une erreur est survenue, réessaie."
      );
    } finally {
      setEnvoi(false);
    }
  }

  function fermer() {
    setOpen(false);
    // On remet le formulaire à zéro après un envoi réussi.
    if (envoye) {
      setEnvoye(false);
      setErreur(null);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Écris à ton prof"
        className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 px-5 py-3 text-sm font-black text-white shadow-2xl ring-2 ring-white/50 transition hover:scale-105 print:hidden"
      >
        ✉️ <span className="hidden sm:inline">Écris-moi</span>
      </button>
    );
  }

  return (
    <aside className="fixed bottom-5 left-1/2 z-50 flex w-[300px] -translate-x-1/2 flex-col overflow-hidden rounded-3xl border border-amber-200 bg-white text-slate-800 shadow-2xl sm:w-[340px] print:hidden">
      <div className="flex items-center justify-between bg-gradient-to-br from-amber-500 via-orange-500 to-pink-500 px-5 py-4">
        <div>
          <p className="font-black text-white">✉️ Écris à ton prof</p>
          <p className="text-[11px] font-bold text-white/80">
            Même pendant les vacances
          </p>
        </div>
        <button
          type="button"
          onClick={fermer}
          aria-label="Fermer"
          className="rounded-full bg-white/25 px-3 py-1 text-xs font-black text-white hover:bg-white/40"
        >
          ✕
        </button>
      </div>

      {envoye ? (
        <div className="space-y-3 p-5 text-center">
          <p className="text-3xl">✅</p>
          <p className="text-sm font-bold text-slate-800">
            Message envoyé, {prenomOuCode} !
          </p>
          <p className="text-sm font-semibold leading-relaxed text-slate-600">
            Ton professeur l&apos;a bien reçu. Il te répondra dès que possible.
          </p>
          <button
            type="button"
            onClick={fermer}
            className="mt-1 w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-2.5 text-sm font-black text-white transition hover:from-amber-400 hover:to-orange-400"
          >
            Fermer
          </button>
        </div>
      ) : (
        <form onSubmit={onSend} className="space-y-3 p-4">
          <p className="text-sm font-semibold leading-relaxed text-slate-600">
            Tu peux m&apos;écrire un message (une question, un blocage, un
            bonjour…). Je sais que c&apos;est toi : <strong>{prenomOuCode}</strong>
            {eleve?.classe ? ` · ${eleve.classe}` : ""}.
          </p>
          <textarea
            ref={champRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ton message…"
            rows={4}
            maxLength={4000}
            disabled={envoi}
            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800 placeholder-slate-400 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 disabled:opacity-50"
          />
          {erreur ? (
            <p className="text-xs font-bold text-pink-600">{erreur}</p>
          ) : null}
          <button
            type="submit"
            disabled={message.trim().length < 10 || envoi}
            className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-2.5 text-sm font-black text-white transition hover:from-amber-400 hover:to-orange-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {envoi ? "Envoi…" : "Envoyer à mon prof"}
          </button>
        </form>
      )}
    </aside>
  );
}
