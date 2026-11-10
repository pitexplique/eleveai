"use client";

// « Ton prénom ou ton pseudo » (10/11/2026, lib/pseudo.ts). Facultatif : le
// prof le voit à côté de ton code dans « Mes classes » et dans le suivi en
// direct, pour savoir qui est qui. Jamais de nom de famille.

import { FormEvent, useEffect, useState } from "react";
import { useEleve } from "@/context/EleveContext";
import { PSEUDO_MAX, nettoyerPseudo } from "@/lib/pseudo";

export default function CartePseudo() {
  const { eleve } = useEleve();
  const [enBase, setEnBase] = useState<string | null>(null);
  const [texte, setTexte] = useState("");
  const [message, setMessage] = useState<{ ok: boolean; texte: string } | null>(null);
  const [envoi, setEnvoi] = useState(false);

  useEffect(() => {
    if (!eleve?.token) return;
    fetch("/api/passions", { headers: { Authorization: `Bearer ${eleve.token}` } })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const p = (d?.pseudo as string | null | undefined) ?? null;
        setEnBase(p);
        setTexte(p ?? "");
      })
      .catch(() => null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eleve?.code_etablissement, eleve?.code_eleve]);

  // Seul un élève connecté a un prof qui le suit.
  if (!eleve?.token) return null;

  async function enregistrer(e: FormEvent) {
    e.preventDefault();
    const propre = nettoyerPseudo(texte);
    if (propre && typeof propre === "object") {
      setMessage({ ok: false, texte: propre.erreur });
      return;
    }
    setEnvoi(true);
    const r = await fetch("/api/passions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${eleve!.token}` },
      body: JSON.stringify({ pseudo: propre }),
    })
      .then((x) => x.json())
      .catch(() => null);
    setEnvoi(false);
    if (!r?.ok || !r.enBase) {
      setMessage({ ok: false, texte: r?.error ?? "Pas enregistré : réessaie plus tard." });
      return;
    }
    setEnBase(propre);
    setTexte(propre ?? "");
    setMessage({ ok: true, texte: propre ? "✅ Enregistré !" : "✅ Effacé." });
  }

  const change = texte.replace(/\s+/g, " ").trim() !== (enBase ?? "");

  return (
    <div className="mt-6 rounded-[2rem] border border-violet-200 bg-white p-6 shadow-xl">
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-5xl">🏷️</span>
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-black text-slate-900">Ton prénom ou ton pseudo</h2>
          <p className="text-sm font-semibold text-slate-500">
            Facultatif. Ton prof le voit à côté de ton code ({eleve.code_eleve}) pour savoir qui est qui. Pas de nom de famille.
          </p>
        </div>
      </div>
      <form onSubmit={enregistrer} className="mt-4 flex flex-wrap items-center gap-3">
        <input
          value={texte}
          onChange={(e) => {
            setTexte(e.target.value);
            setMessage(null);
          }}
          maxLength={PSEUDO_MAX}
          placeholder="Ex. : Léa, Tom_974"
          aria-label="Ton prénom ou ton pseudo"
          autoComplete="off"
          className="min-w-0 flex-1 rounded-full border-2 border-violet-200 px-5 py-3 text-lg font-bold text-slate-900 focus:border-violet-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={envoi || !change}
          className="rounded-full bg-violet-600 px-5 py-3 text-sm font-black text-white shadow hover:bg-violet-500 disabled:opacity-40"
        >
          {envoi ? "…" : "Enregistrer"}
        </button>
        {message && (
          <span className={`w-full text-right font-bold ${message.ok ? "text-emerald-700" : "text-rose-700"}`}>
            {message.texte}
          </span>
        )}
      </form>
    </div>
  );
}
