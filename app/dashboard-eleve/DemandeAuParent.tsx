"use client";

// « VOIR MON VRAI SUIVI » (19/11/2026) : l'élève ne paie pas, il écrit à son
// parent. Le serveur envoie au parent le bilan de la semaine, le code qui relie
// les deux comptes et le lien d'abonnement (/api/suivi/debloquer).
// ⛔ Aucun prix montré à l'élève. L'adresse du parent n'est pas gardée.
import { useState, type FormEvent } from "react";
import { useEleve } from "@/context/EleveContext";

export default function DemandeAuParent({ onFermer }: { onFermer: () => void }) {
  const { eleve } = useEleve();
  const jeton = (eleve as { token?: string } | null)?.token;
  const [courriel, setCourriel] = useState("");
  const [etat, setEtat] = useState<"saisie" | "envoi" | "envoye">("saisie");
  const [erreur, setErreur] = useState("");

  async function envoyer(e: FormEvent) {
    e.preventDefault();
    setErreur("");
    setEtat("envoi");
    try {
      const r = await fetch("/api/suivi/debloquer", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${jeton}` },
        body: JSON.stringify({ courrielParent: courriel.trim() }),
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) {
        setEtat("envoye");
        return;
      }
      setErreur(j.error ?? "Le message n'a pas pu partir.");
    } catch {
      setErreur("Le message n'a pas pu partir. Vérifie ta connexion.");
    }
    setEtat("saisie");
  }

  return (
    <div className="mt-4 rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-200">
      {etat === "envoye" ? (
        <>
          <p className="font-black text-slate-900">C&apos;est parti ! 📬</p>
          <p className="mt-1 text-slate-700">Ton parent a reçu ton bilan de la semaine. Dis-lui de regarder ses courriels.</p>
          <button type="button" onClick={onFermer} className="mt-3 font-bold text-sky-700 underline">Fermer</button>
        </>
      ) : (
        <form onSubmit={envoyer}>
          <p className="font-black text-slate-900">Ton vrai suivi, c&apos;est ton parent qui le débloque.</p>
          <p className="mt-1 text-slate-700">On lui envoie ton bilan de la semaine. Écris son adresse :</p>
          <input
            type="email"
            required
            value={courriel}
            onChange={(e) => setCourriel(e.target.value)}
            placeholder="adresse de ton parent"
            className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-3 text-lg"
          />
          {erreur && <p role="alert" className="mt-2 font-bold text-rose-700">{erreur}</p>}
          <div className="mt-3 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={etat === "envoi" || !jeton}
              className="rounded-full bg-sky-700 px-6 py-3 font-black text-white hover:bg-sky-800 disabled:opacity-50"
            >
              {etat === "envoi" ? "Envoi…" : "Envoyer à mon parent"}
            </button>
            <button type="button" onClick={onFermer} className="font-bold text-slate-600 underline">Plus tard</button>
          </div>
        </form>
      )}
    </div>
  );
}
