"use client";

import { useCallback, useEffect, useState } from "react";

type Recipients = {
  ok: boolean;
  total: number;
  bySource: Record<string, number>;
  sample: {
    email: string;
    nom: string | null;
    source: string | null;
    created_at: string;
  }[];
};

const SOURCE_LABELS: Record<string, string> = {
  "cahier-vacances": "☀️ Cahier de vacances",
  direct: "🔗 Inscription directe",
};

function sourceLabel(s: string) {
  return SOURCE_LABELS[s] ?? s;
}

export default function NewsletterClient() {
  const [rec, setRec] = useState<Recipients | null>(null);
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [testEmail, setTestEmail] = useState("");
  const [busy, setBusy] = useState<null | "test" | "all">(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/newsletter");
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Erreur");
      setRec(data as Recipients);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function send(mode: "test" | "all") {
    setFeedback(null);
    setError(null);

    if (subject.trim().length < 3) {
      setError("Le sujet est trop court.");
      return;
    }
    if (message.trim().length < 10) {
      setError("Le message est trop court.");
      return;
    }

    if (mode === "all") {
      const n = rec?.total ?? 0;
      if (n === 0) {
        setError("Aucun destinataire consentant.");
        return;
      }
      const confirmed = window.confirm(
        `Envoyer cette newsletter à ${n} personne(s) ? Cette action est irréversible.`
      );
      if (!confirmed) return;
    }

    setBusy(mode);
    try {
      const res = await fetch("/api/admin/newsletter/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, message, mode, testEmail }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Échec de l'envoi");

      if (mode === "test") {
        setFeedback(`✅ Email de test envoyé à ${data.to}. Vérifie ta boîte (et le spam).`);
      } else {
        setFeedback(
          `✅ Newsletter envoyée : ${data.sent}/${data.total} destinataire(s)` +
            (data.failed ? ` · ${data.failed} échec(s)` : "") +
            "."
        );
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur d'envoi");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-5">
      {/* Destinataires */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-bold text-slate-200">👥 Destinataires</h2>
          <div className="flex items-center gap-2">
            <a
              href="/api/admin/newsletter/export"
              className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-1.5 text-xs font-bold text-slate-200 hover:bg-slate-800"
            >
              ⬇️ Export CSV
            </a>
            <button
              type="button"
              onClick={load}
              className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-1.5 text-xs font-bold text-slate-200 hover:bg-slate-800"
            >
              ↻
            </button>
          </div>
        </div>

        {loading ? (
          <p className="mt-3 text-sm text-slate-400">Chargement…</p>
        ) : rec ? (
          <>
            <p className="mt-3 text-3xl font-black text-teal-400">
              {rec.total}
              <span className="ml-2 text-sm font-semibold text-slate-500">
                consentant(s)
              </span>
            </p>
            {Object.keys(rec.bySource).length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {Object.entries(rec.bySource).map(([s, n]) => (
                  <span
                    key={s}
                    className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-bold text-slate-300"
                  >
                    {sourceLabel(s)} : {n}
                  </span>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="mt-3 text-sm text-slate-400">Aucune donnée.</p>
        )}
      </section>

      {/* Composer */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 space-y-3">
        <h2 className="text-sm font-bold text-slate-200">✍️ Composer</h2>

        <div>
          <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Sujet
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Ex : Les nouveautés de la rentrée sur EleveAI"
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 placeholder-slate-500"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={10}
            placeholder={"Bonjour,\n\nVoici les nouveautés…\n\n(Les sauts de ligne sont conservés. Un pied de page avec le lien de désinscription est ajouté automatiquement.)"}
            className="mt-1 w-full resize-y rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 placeholder-slate-500"
          />
          <p className="mt-1 text-[11px] text-slate-500">
            Texte simple : les sauts de ligne sont conservés. Pied de page (identité +
            désinscription RGPD) ajouté automatiquement.
          </p>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Adresse de test
          </label>
          <input
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            placeholder="eleveai974@gmail.com (défaut : adresse admin)"
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 placeholder-slate-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => send("test")}
            disabled={busy !== null}
            className="rounded-lg border border-sky-700 bg-sky-900/40 px-4 py-2 text-sm font-bold text-sky-200 hover:bg-sky-900/70 disabled:opacity-50"
          >
            {busy === "test" ? "Envoi…" : "✉️ Envoyer un test"}
          </button>
          <button
            type="button"
            onClick={() => send("all")}
            disabled={busy !== null || (rec?.total ?? 0) === 0}
            className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-black text-white hover:bg-teal-500 disabled:opacity-50"
          >
            {busy === "all"
              ? "Envoi en cours…"
              : `🚀 Envoyer à tous (${rec?.total ?? 0})`}
          </button>
        </div>

        <p className="text-[11px] text-amber-300/80">
          Conseil : envoie-toi d'abord un test pour vérifier le rendu et la
          délivrabilité avant l'envoi de masse.
        </p>

        {feedback && (
          <p className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-300">
            {feedback}
          </p>
        )}
        {error && (
          <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-300">
            {error}
          </p>
        )}
      </section>
    </div>
  );
}
