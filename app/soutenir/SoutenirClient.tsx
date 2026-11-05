"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

type Props = { ouvert: boolean; merci: boolean; montants: number[]; min: number; max: number };

export default function SoutenirClient({ ouvert, merci, montants, min, max }: Props) {
  const [choix, setChoix] = useState(10);
  const [libre, setLibre] = useState("");
  const [pasEleve, setPasEleve] = useState(false);
  const [erreur, setErreur] = useState("");
  const [enCours, setEnCours] = useState(false);
  const montant = libre ? Number(libre) : choix;
  const valide = Number.isInteger(montant) && montant >= min && montant <= max;

  async function donner() {
    setErreur("");
    setEnCours(true);
    try {
      const r = await fetch("/api/don/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ montant, pasEleve }),
      });
      const j = await r.json();
      if (j.url) {
        window.location.href = j.url;
        return;
      }
      setErreur(j.error ?? "Le paiement n'a pas pu s'ouvrir.");
    } catch {
      setErreur("Le paiement n'a pas pu s'ouvrir. Vérifiez votre connexion.");
    }
    setEnCours(false);
  }

  return (
    <main className="min-h-screen bg-white px-4 py-12 text-slate-900 [color-scheme:light]">
      <div className="mx-auto max-w-xl text-center">
        <Heart className="mx-auto h-12 w-12 text-rose-500" aria-hidden="true" />
        {merci ? (
          <>
            <h1 className="mt-3 text-3xl font-black sm:text-4xl">Merci du fond du cœur !</h1>
            <p className="mt-4 text-slate-600">Votre don aide à faire de nouvelles vidéos pour les élèves.</p>
            <Link href="/accueil" className="mt-8 inline-flex rounded-full bg-sky-700 px-6 py-3 font-black text-white hover:bg-sky-800">Retour au site</Link>
          </>
        ) : (
          <>
            <h1 className="mt-3 text-3xl font-black sm:text-4xl">Soutenir EleveAI</h1>
            <p className="mt-4 text-slate-600">
              Pas de compte, pas d&apos;abonnement. Un don, une fois, pour encourager un professeur qui fait des vidéos
              et un coach de maths pour tous les élèves.
            </p>
            {!ouvert ? (
              <p className="mt-6 rounded-2xl bg-amber-50 p-4 font-bold text-amber-900 ring-1 ring-amber-200">
                Les dons ouvrent très bientôt. Rien ne peut être payé pour l&apos;instant.
              </p>
            ) : (
              <>
                <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {montants.map((m) => (
                    <button
                      key={m}
                      type="button"
                      aria-pressed={!libre && choix === m}
                      onClick={() => { setChoix(m); setLibre(""); }}
                      className={`rounded-2xl border-2 py-4 text-2xl font-black transition ${!libre && choix === m ? "border-rose-500 bg-rose-50" : "border-slate-200 hover:border-rose-300"}`}
                    >
                      {m} €
                    </button>
                  ))}
                </div>
                <label className="mt-4 block text-sm font-bold text-slate-600">
                  Ou un autre montant, en euros
                  <input
                    type="number"
                    inputMode="numeric"
                    min={min}
                    max={max}
                    step={1}
                    value={libre}
                    onChange={(e) => setLibre(e.target.value)}
                    className="mx-auto mt-1 block w-32 rounded-xl border-2 border-slate-200 p-2 text-center text-lg font-black"
                  />
                </label>
                <label className="mt-5 flex gap-3 text-left text-sm">
                  <input type="checkbox" checked={pasEleve} onChange={(e) => setPasEleve(e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>Je suis majeur. Mon enfant et moi ne sommes ni élèves ni anciens élèves de Frédéric Lacoste.</span>
                </label>
                {erreur && <p role="alert" className="mt-4 font-bold text-rose-700">{erreur}</p>}
                <button
                  type="button"
                  onClick={donner}
                  disabled={!valide || !pasEleve || enCours}
                  className="mt-5 w-full rounded-full bg-rose-600 px-6 py-4 text-lg font-black text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {enCours ? "Ouverture du paiement…" : valide ? `Donner ${montant} €` : `De ${min} à ${max} €`}
                </button>
                <p className="mt-3 text-sm text-slate-500">
                  Sans contrepartie et sans reçu fiscal : EleveAI n&apos;est pas une association. Paiement sécurisé par Stripe.
                </p>
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}
