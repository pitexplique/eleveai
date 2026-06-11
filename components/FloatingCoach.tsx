"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useEleve } from "@/context/EleveContext";

type CoachMessage = { role: "eleve" | "coach"; content: string };

const MESSAGE_ACCUEIL: CoachMessage = {
  role: "coach",
  content:
    "Bonjour, je suis le coach EleveAI. Pose-moi une question courte sur tes révisions.",
};

/**
 * Coach IA flottant, réutilisable sur toutes les pages (accueil, coachs, tutor).
 * Composant autonome : il lit le contexte élève, gère son propre état et
 * interroge /api/accueil/chat. Il suffit de poser <FloatingCoach /> sur une page.
 * Le fil complet reste affiché et l'historique est envoyé à l'API (retour
 * élève du 11/06/2026 : le coach resaluait et on perdait la question d'avant).
 */
export default function FloatingCoach() {
  const { eleve } = useEleve();
  const codeEtablissement = eleve?.code_etablissement?.trim() ?? "";
  const codeUtilisateur = eleve?.code_eleve?.trim() ?? "";
  const canAsk = Boolean(codeEtablissement && codeUtilisateur);

  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<CoachMessage[]>([MESSAGE_ACCUEIL]);
  const [loading, setLoading] = useState(false);
  const filRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fil = filRef.current;
    if (fil) fil.scrollTop = fil.scrollHeight;
  }, [messages, loading, open]);

  async function onSend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = question.trim();
    if (!trimmed || !canAsk || loading) return;

    // Historique envoyé à l'API : les derniers échanges, sans le message d'accueil.
    const history = messages
      .filter((m) => m !== MESSAGE_ACCUEIL)
      .slice(-8)
      .map((m) => ({ role: m.role, content: m.content }));

    setMessages((prev) => [...prev, { role: "eleve", content: trimmed }]);
    setQuestion("");
    setLoading(true);
    try {
      const res = await fetch("/api/accueil/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codeEtablissement,
          codeUtilisateur,
          studentQuestion: trimmed,
          history,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { answer?: string; error?: string };
      if (!res.ok || !data.answer) throw new Error(data.error ?? "Réponse indisponible.");
      setMessages((prev) => [...prev, { role: "coach", content: data.answer! }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "coach",
          content:
            "Je n'arrive pas à répondre pour le moment. Essaie depuis Parcours après une correction.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-emerald-500 to-orange-400 px-5 py-3 text-sm font-black text-white shadow-2xl ring-2 ring-white/50 transition hover:scale-105"
      >
        🤖 <span className="hidden sm:inline">Coach IA</span>
      </button>
    );
  }

  return (
    <aside className="fixed bottom-5 right-5 z-50 flex h-[340px] w-[300px] flex-col overflow-hidden rounded-3xl border border-cyan-200/30 bg-[#05213f] text-white shadow-2xl sm:h-[480px] sm:w-[340px]">
      <div className="flex items-center justify-between bg-gradient-to-br from-cyan-500 via-emerald-500 to-orange-400 px-5 py-4">
        <div>
          <p className="font-black text-white">🤖 Coach EleveAI</p>
          <p className="text-[11px] font-bold text-white/80">Pose ta question</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-full bg-white/20 px-3 py-1 text-xs font-black text-white hover:bg-white/30"
        >
          ✕
        </button>
      </div>

      <div ref={filRef} className="min-h-0 flex-1 space-y-2 overflow-y-auto p-4">
        {canAsk ? (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                className={[
                  "rounded-2xl px-4 py-3 text-sm font-semibold leading-relaxed",
                  message.role === "coach"
                    ? "bg-white/10 text-white/90"
                    : "ml-6 bg-emerald-500/30 text-white",
                ].join(" ")}
              >
                {message.content}
              </div>
            ))}
            {loading ? (
              <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold leading-relaxed text-white/60">
                Je réfléchis…
              </div>
            ) : null}
          </>
        ) : (
          <div className="flex h-full items-center text-center">
            <p className="text-sm font-semibold leading-relaxed text-white/70">
              Connecte-toi pour dialoguer avec le coach IA.
            </p>
          </div>
        )}
      </div>

      {canAsk ? (
        <form onSubmit={onSend} className="border-t border-white/10 p-3">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ta question…"
            rows={2}
            disabled={loading}
            className="h-16 w-full resize-none rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white placeholder-white/40 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!question.trim() || loading}
            className="mt-2 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 py-2.5 text-sm font-black text-white transition hover:from-cyan-400 hover:to-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Envoi…" : "Envoyer"}
          </button>
        </form>
      ) : (
        <div className="p-3">
          <Link
            href="/auth/signin?mode=eleve"
            className="block rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 py-3 text-center text-sm font-black text-white transition hover:from-cyan-400 hover:to-emerald-400"
          >
            Connexion / inscription
          </Link>
        </div>
      )}
    </aside>
  );
}
