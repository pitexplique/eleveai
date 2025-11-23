"use client";

import { useState } from "react";
import { MarkdownMath } from "@/components/MarkdownMath";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        body: JSON.stringify({ message }),
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
