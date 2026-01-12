"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { MarkdownMath } from "@/components/MarkdownMath";
import { Copy, Check, ChevronDown, Code } from "lucide-react";

type CopyKind = "plain" | "markdown" | "latex";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 👇 Mode prof avec LaTeX autorisé
  const [latexMode, setLatexMode] = useState(false);

  // ✅ état UI copier
  const [copied, setCopied] = useState<CopyKind | null>(null);
  const [copyOpen, setCopyOpen] = useState(false);

  // ✅ toast
  const [toast, setToast] = useState<{ msg: string; kind: "ok" | "err" } | null>(null);
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
      setError("Impossible de contacter EleveAI (vérifie que npm run dev tourne).");
    } finally {
      setLoading(false);
    }
  }

  function buildCopyText(kind: CopyKind) {
    if (!answer) return "";

    if (kind === "plain") return answer;

    if (kind === "markdown") {
      // On encapsule pour coller facilement dans Notion/Docs/GitHub
      return [
        "## Ressource EleveAI",
        "",
        "```",
        answer,
        "```",
        "",
      ].join("\n");
    }

    // kind === "latex"
    // Hypothèse: en latexMode, la réponse peut contenir du LaTeX ($...$ / $$...$$)
    // On ne "détecte" pas tout : on fournit la réponse telle quelle (souvent déjà en LaTeX)
    // + une petite entête optionnelle.
    return [
      "% Ressource EleveAI (LaTeX)",
      answer,
    ].join("\n");
  }

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fallback
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
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

    const text = buildCopyText(kind);
    const ok = await copyToClipboard(text);

    if (!ok) {
      showToast("Copie impossible (permission navigateur).", "err");
      return;
    }

    setCopied(kind);
    showToast(
      kind === "plain"
        ? "Copié !"
        : kind === "markdown"
        ? "Copié en Markdown !"
        : "Copié en LaTeX !",
      "ok"
    );

    window.setTimeout(() => setCopied(null), 900);
    setCopyOpen(false);
  }

  const copyLabel = useMemo(() => {
    if (!copied) return "Copier";
    if (copied === "plain") return "Copié !";
    if (copied === "markdown") return "Copié (MD) !";
    return "Copié (LaTeX) !";
  }, [copied]);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="w-full max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6 pt-0 pb-6 lg:pb-10">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow space-y-4 mt-6">
          <h1 className="text-2xl font-bold text-blue-600">Tchat EleveAI</h1>

          {/* ⏻ Choix du mode */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm border border-blue-100 bg-blue-50 rounded-lg px-3 py-2">
            <div>
              <p className="font-semibold text-blue-700">Mode d&apos;affichage des maths</p>
              <p className="text-[11px] text-blue-800">
                Par défaut : écriture simple (2/5, 3/10, 7/8), sans LaTeX. <br />
                En mode avancé, les professeurs peuvent obtenir des formules en LaTeX.
              </p>
            </div>
            <label className="inline-flex items-center gap-2 text-xs text-blue-800">
              <input
                type="checkbox"
                checked={latexMode}
                onChange={(e) => setLatexMode(e.target.checked)}
                className="rounded border-gray-400"
              />
              <span>Mode avancé (prof – LaTeX)</span>
            </label>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Colonne gauche */}
            <div className="space-y-2">
              <form onSubmit={handleSend} className="space-y-2">
                <textarea
                  className="w-full border rounded p-3 text-sm text-gray-900 min-h-[220px] lg:min-h-[320px] max-h-[60vh] overflow-y-auto resize-y"
                  placeholder="Pose ta question de maths ici..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {loading ? "EleveAI réfléchit..." : "Envoyer à EleveAI"}
                </button>
              </form>

              {error && (
                <div className="border border-red-300 bg-red-50 text-red-800 text-sm rounded p-3">
                  {error}
                </div>
              )}
            </div>

            {/* Colonne droite */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-semibold text-gray-700">Ressource générée</div>

                {/* ✅ Bouton copier + menu */}
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy("plain")}
                      disabled={!answer || loading}
                      title={!answer ? "Rien à copier" : "Copier le texte"}
                      className={[
                        "inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded border bg-white",
                        "hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
                        "transition transform active:scale-[0.98]",
                      ].join(" ")}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copyLabel}
                    </button>

                    <button
                      type="button"
                      onClick={() => setCopyOpen((v) => !v)}
                      disabled={!answer || loading}
                      title="Options de copie"
                      className={[
                        "inline-flex items-center justify-center px-2 py-1.5 text-xs rounded border bg-white",
                        "hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
                        "transition transform active:scale-[0.98]",
                      ].join(" ")}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>

                  {copyOpen && (
                    <div
                      className="absolute right-0 mt-2 w-52 rounded-lg border bg-white shadow-lg overflow-hidden z-10"
                      role="menu"
                    >
                      <button
                        type="button"
                        onClick={() => handleCopy("plain")}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 flex items-center gap-2"
                        role="menuitem"
                      >
                        <Copy className="h-4 w-4" />
                        Copier (texte)
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCopy("markdown")}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 flex items-center gap-2"
                        role="menuitem"
                      >
                        <Code className="h-4 w-4" />
                        Copier en Markdown
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCopy("latex")}
                        disabled={!latexMode}
                        className={[
                          "w-full text-left px-3 py-2 text-xs flex items-center gap-2",
                          latexMode ? "hover:bg-gray-50" : "opacity-50 cursor-not-allowed",
                        ].join(" ")}
                        role="menuitem"
                        title={
                          latexMode
                            ? "Copier la réponse (LaTeX)"
                            : "Active le mode avancé (prof – LaTeX) pour cette option"
                        }
                      >
                        <Code className="h-4 w-4" />
                        Copier en LaTeX
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="eleveai-math border rounded p-3 min-h-[220px] lg:min-h-[320px] max-h-[60vh] overflow-y-auto bg-gray-50  text-sm  text-gray-900  whitespace-pre-wrap">
                {loading ? (
                  "Réflexion en cours..."
                ) : answer ? (
                  <div className="text-gray-900">
                    <MarkdownMath>{answer}</MarkdownMath>
                  </div>
                ) : (
                  "La réponse d'EleveAI apparaîtra ici."
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Toast discret */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50">
          <div
            className={[
              "rounded-lg px-3 py-2 text-xs shadow border bg-white",
              "transition transform animate-[fadeIn_0.15s_ease-out]",
              toast.kind === "ok" ? "border-green-200" : "border-red-200",
            ].join(" ")}
          >
            <span className={toast.kind === "ok" ? "text-green-700" : "text-red-700"}>
              {toast.msg}
            </span>
          </div>
        </div>
      )}

      {/* animation CSS inline minimal */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}

