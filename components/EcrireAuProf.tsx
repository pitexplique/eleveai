"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useEleve } from "@/context/EleveContext";
import { prenomFromNom } from "@/lib/prenom";

// Aligné sur la limite serveur (app/api/contact/route.ts, source=eleve-message) :
// 200 mots suffisent pour un message honnête, au-delà c'est un copier-collé d'IA.
const MAX_MOTS = 200;

/**
 * Bouton flottant « Écris à l'équipe EleveAI », réservé aux ÉLÈVES CONNECTÉS.
 * (Le destinataire est l'administrateur de la plateforme, pas le prof de classe.)
 * Demande des élèves (2026-06-18) : pouvoir écrire à l'équipe EleveAI même pendant
 * les vacances. Message seul (pas de réponse demandée) ; l'identité de l'élève
 * (nom, classe, codes) est jointe automatiquement pour savoir qui écrit.
 *
 * Enregistre dans `contact_messages` via l'API existante /api/contact, avec
 * role="Élève", topic="Question", source="eleve-message" → filtrable dans
 * l'admin. Composant autonome : il suffit de poser <EcrireAuProf />.
 *
 * Position : bas À GAUCHE (Calculatrice au centre, Coach IA à droite).
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
  // Affichage à l'élève : prénom seul (jamais le nom de famille, règle RGPD).
  // prenomOuCode (nom complet) reste envoyé au prof pour l'identification.
  const prenomAffiche = prenomFromNom(eleve?.nom) || `Élève ${eleve?.code_eleve}`;
  const nbMots = message.trim() ? message.trim().split(/\s+/).length : 0;
  const tropLong = nbMots > MAX_MOTS;

  async function onSend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const texte = message.trim();
    if (texte.length < 10) {
      setErreur("Écris un message d'au moins 10 caractères.");
      return;
    }
    if (tropLong) {
      setErreur(
        `Ton message fait ${nbMots} mots (max ${MAX_MOTS}). Va à l'essentiel, avec tes propres mots.`
      );
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
          // Codes joints pour relier le message à l'élève (réponse du prof
          // affichée ensuite sur SON dashboard).
          code_etablissement: eleve?.code_etablissement?.trim() || null,
          // Pour un élève collège, le code utilisateur du jeton = le code élève.
          code_utilisateur: eleve?.code_eleve?.trim() || null,
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
        aria-label="Écris-moi"
        className="fixed bottom-5 left-5 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 px-5 py-3 text-sm font-black text-white shadow-2xl ring-2 ring-white/50 transition hover:scale-105 print:hidden"
      >
        ✉️ <span className="hidden sm:inline">Écris-moi</span>
      </button>
    );
  }

  return (
    <aside className="fixed bottom-5 left-5 z-50 flex w-[300px] flex-col overflow-hidden rounded-3xl border border-amber-200 bg-white text-slate-800 shadow-2xl sm:w-[340px] print:hidden">
      <div className="flex items-center justify-between bg-gradient-to-br from-amber-500 via-orange-500 to-pink-500 px-5 py-4">
        <div>
          <p className="font-black text-white">✉️ Écris-moi</p>
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
            Message envoyé, {prenomAffiche} !
          </p>
          <p className="text-sm font-semibold leading-relaxed text-slate-600">
            Je l&apos;ai bien reçu, on se reparle vite.
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
            Bonjour <strong>{prenomAffiche}</strong> 👋 Tu peux m&apos;écrire un
            message (une question, un blocage, un bonjour…).
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
          <div className="flex items-center justify-between">
            {erreur ? (
              <p className="text-xs font-bold text-pink-600">{erreur}</p>
            ) : (
              <span />
            )}
            <span
              className={[
                "shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold tabular-nums",
                tropLong ? "bg-pink-100 text-pink-700" : "bg-slate-100 text-slate-500",
              ].join(" ")}
            >
              {nbMots} / {MAX_MOTS} mots
            </span>
          </div>
          <button
            type="submit"
            disabled={message.trim().length < 10 || tropLong || envoi}
            className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-2.5 text-sm font-black text-white transition hover:from-amber-400 hover:to-orange-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {envoi ? "Envoi…" : "Envoyer"}
          </button>
        </form>
      )}
    </aside>
  );
}
