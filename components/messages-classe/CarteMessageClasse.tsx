"use client";

// ✉️ MESSAGE DE TON PROF (24/11/2026) — en haut de /dashboard-eleve, dans le
// Cockpit ET dans le Jardin. Seulement les messages de SA classe (le code vient
// du jeton côté serveur). « Nouveau » tant que l'élève n'a pas appuyé sur
// « J'ai lu ». Sens unique : pas de réponse. Rien si aucun message.

import { useEffect, useState } from "react";
import { useEleve } from "@/context/EleveContext";

type Message = { id: string; created_at: string; texte: string; lu: boolean };

const dateCourte = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

export default function CarteMessageClasse({ variante }: { variante: "cockpit" | "jardin" }) {
  const { eleve } = useEleve();
  const token = eleve?.token ?? null;
  const [messages, setMessages] = useState<Message[]>([]);
  const [classe, setClasse] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    fetch("/api/eleve/messages-classe", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => {
        if (d?.ok) {
          setMessages(d.messages ?? []);
          setClasse(d.classe ?? null);
        }
      })
      .catch(() => {});
  }, [token]);

  if (!messages.length) return null;

  function marquerLu(id: string) {
    setMessages((m) => m.map((x) => (x.id === id ? { ...x, lu: true } : x)));
    fetch("/api/eleve/messages-classe", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id }),
    }).catch(() => {});
  }

  const jardin = variante === "jardin";
  const cadre = jardin
    ? "border-emerald-200 bg-gradient-to-br from-lime-50 to-emerald-50"
    : "border-slate-700 bg-slate-900 text-white";
  const sous = jardin ? "text-emerald-800" : "text-sky-200";
  const carte = jardin ? "bg-white/90 ring-emerald-200 text-slate-900" : "bg-slate-800 ring-slate-600 text-white";

  return (
    <section className={`mt-6 rounded-[2rem] border p-5 shadow-xl ${cadre}`} aria-label="Message de ton prof">
      <h2 className="text-xl font-black">
        {jardin ? "🌼" : "📡"} Message de ton prof
        {classe ? <span className={`ml-2 text-sm font-bold ${sous}`}>· {classe}</span> : null}
      </h2>
      <ul className="mt-3 space-y-3">
        {messages.map((m) => (
          <li key={m.id} className={`rounded-2xl p-4 ring-1 ${carte}`}>
            <div className="flex flex-wrap items-center gap-2">
              {!m.lu && (
                <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-black uppercase text-slate-900">
                  Nouveau
                </span>
              )}
              <span className={`text-xs font-bold ${jardin ? "text-slate-500" : "text-slate-300"}`}>{dateCourte(m.created_at)}</span>
            </div>
            <p className="mt-2 whitespace-pre-wrap break-words text-lg font-bold leading-snug">{m.texte}</p>
            {!m.lu && (
              <button
                type="button"
                onClick={() => marquerLu(m.id)}
                className={`mt-3 rounded-xl px-4 py-2 text-sm font-black shadow ${
                  jardin ? "bg-emerald-600 text-white hover:bg-emerald-500" : "bg-sky-500 text-slate-950 hover:bg-sky-400"
                }`}
              >
                ✓ J&apos;ai lu
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
