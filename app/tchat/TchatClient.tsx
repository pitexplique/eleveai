// app/tchat/TchatClient.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { MarkdownMath } from "@/components/MarkdownMath";

type CopyKind = "plain" | "markdown" | "latex";

export default function TchatClient() {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [latexMode, setLatexMode] = useState(false);

  const [copied, setCopied] = useState<CopyKind | null>(null);
  const [copyOpen, setCopyOpen] = useState(false);

  const [toast, setToast] = useState<{ msg: string; kind: "ok" | "err" } | null>(
    null
  );
  const toastTimer = useRef<number | null>(null);

  function showToast(msg: string, kind: "ok" | "err" = "ok") {
    setToast({ msg, kind });
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 1500);
  }

  useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, []);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    setAnswer("");
    setError("");
    setCopied(null);
    setCopyOpen(false);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, latexMode }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Erreur serveur.");
        return;
      }

      setAnswer(data.answer || "");
    } catch (err) {
      console.error(err);
      setError("Impossible de contacter EleveAI.");
    } finally {
      setLoading(false);
    }
  }

  function buildCopyText(kind: CopyKind) {
    if (!answer) return "";
    if (kind === "plain") return answer;
    if (kind === "markdown") {
      return ["## Ressource EleveAI", "", "```", answer, "```", ""].join("\n");
    }
    return ["% Ressource EleveAI (LaTeX)", answer].join("\n");
  }

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        return true;
      } catch {
        return false;
      }
    }
  }

  async function handleCopy(kind: CopyKind) {
    if (!answer || loading) return;
    const ok = await copyToClipboard(buildCopyText(kind));
    if (!ok) {
      showToast("Copie impossible.", "err");
      return;
    }
    setCopied(kind);
    showToast(
      kind === "plain"
        ? "Copié !"
        : kind === "markdown"
        ? "Copié en Markdown !"
        : "Copié en LaTeX !"
    );
    window.setTimeout(() => setCopied(null), 900);
    setCopyOpen(false);
  }

  const copyLabel = useMemo(() => {
    if (!copied) return "Copier";
    if (copied === "plain") return "Copié !";
    if (copied === "markdown") return "Copié (MD)";
    return "Copié (LaTeX)";
  }, [copied]);

  return (
    <main className="h-screen bg-gray-50 text-gray-900 flex flex-col">
      <div className="w-full max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6 pb-6 flex-1 flex flex-col">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow space-y-4 mt-6">
          <h1 className="text-2xl font-bold text-blue-600">Tchat EleveAI</h1>

          {/* Mode */}
          <div className="flex justify-between items-center gap-3 text-xs border border-blue-100 bg-blue-50 rounded-lg px-3 py-2">
            <span className="font-semibold text-blue-700">
              Mode avancé (LaTeX)
            </span>
            <input
              type="checkbox"
              checked={latexMode}
              onChange={(e) => setLatexMode(e.target.checked)}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Question + bouton générer */}
            <form onSubmit={handleSend} className="space-y-3">
              <textarea
                className="w-full border rounded p-3 text-sm text-gray-900
                           min-h-[220px] lg:min-h-[320px]
                           max-h-[60vh] overflow-y-auto resize-y"
                placeholder="Pose ta question ici…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={loading || !message.trim()}
                  className="px-4 py-2 rounded bg-blue-600 text-white text-sm font-semibold disabled:opacity-50"
                >
                  {loading ? "Génération…" : "Générer ressource"}
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    setMessage("");
                    setAnswer("");
                    setError("");
                  }}
                  className="px-3 py-2 rounded border text-sm disabled:opacity-50"
                >
                  Effacer
                </button>
              </div>

              {error && (
                <div className="text-xs text-red-600 border border-red-200 bg-red-50 rounded px-3 py-2">
                  {error}
                </div>
              )}
            </form>

            {/* Réponse */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold">Ressource générée</span>

                <div className="relative">
                  <button
                    onClick={() => handleCopy("plain")}
                    className="text-xs border px-3 py-1 rounded"
                  >
                    {copyLabel}
                  </button>
                  <button
                    onClick={() => setCopyOpen(!copyOpen)}
                    className="ml-1 text-xs border px-2 py-1 rounded"
                  >
                    ▾
                  </button>

                  {copyOpen && (
                    <div className="absolute right-0 mt-1 border bg-white rounded shadow text-xs">
                      <button
                        className="block px-3 py-2"
                        onClick={() => handleCopy("plain")}
                      >
                        Copier
                      </button>
                      <button
                        className="block px-3 py-2"
                        onClick={() => handleCopy("markdown")}
                      >
                        Copier Markdown
                      </button>
                      <button
                        className="block px-3 py-2 disabled:opacity-50"
                        disabled={!latexMode}
                        onClick={() => handleCopy("latex")}
                      >
                        Copier LaTeX
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div
                className="border rounded p-3 bg-gray-50 text-sm text-gray-900
                           min-h-[220px] lg:min-h-[320px]
                           max-h-[60vh] overflow-y-auto whitespace-pre-wrap"
              >
                {loading
                  ? "Réflexion en cours…"
                  : answer
                  ? <MarkdownMath>{answer}</MarkdownMath>
                  : "La réponse apparaîtra ici."}
              </div>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-4 right-4 bg-white border rounded px-3 py-2 text-xs shadow">
          {toast.msg}
        </div>
      )}
    </main>
  );
}
