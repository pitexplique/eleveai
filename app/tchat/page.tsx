"use client";

import { useState } from "react";
import { MarkdownMath } from "@/components/MarkdownMath";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 👇 Mode prof avec LaTeX autorisé
  const [latexMode, setLatexMode] = useState(false);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();

    if (!message.trim()) return;

    setLoading(true);
    setAnswer("");
    setError("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          latexMode, // 👈 on envoie le choix du mode
        }),
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

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow space-y-4">
        <h1 className="text-2xl font-bold text-blue-600">Chat EleveAI</h1>

        {/* ⏻ Choix du mode */}
        <div className="flex items-center justify-between gap-3 text-xs sm:text-sm border border-blue-100 bg-blue-50 rounded-lg px-3 py-2">
          <div>
            <p className="font-semibold text-blue-700">
              Mode d&apos;affichage des maths
            </p>
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

        <form onSubmit={handleSend} className="space-y-2">
          <textarea
            className="w-full border rounded p-3 min-h-[120px] text-sm"
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

        <div className="eleveai-math border rounded p-3 min-h-[120px] bg-gray-50 text-sm whitespace-pre-wrap">
          {loading ? (
            "Réflexion en cours..."
          ) : answer ? (
            <MarkdownMath>{answer}</MarkdownMath>
          ) : (
            "La réponse d'EleveAI apparaîtra ici."
          )}
        </div>
      </div>
    </main>
  );
}
