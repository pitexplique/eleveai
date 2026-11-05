"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import RapportVue from "@/components/suivi/RapportVue";
import { createClient } from "@/lib/supabase/client";
import type { RapportEnfant } from "@/lib/suivi/types";

type Enfant = { cle: string; rapport: RapportEnfant };
type Etat = "chargement" | "sans-abonnement" | "pret" | "erreur";

export default function SuiviClient() {
  const [etat, setEtat] = useState<Etat>("chargement");
  const [jeton, setJeton] = useState("");
  const [enfants, setEnfants] = useState<Enfant[]>([]);
  const [actif, setActif] = useState(0);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [enCours, setEnCours] = useState(false);

  const charger = useCallback(async (t: string) => {
    const r = await fetch("/api/suivi/enfants", { headers: { Authorization: `Bearer ${t}` } });
    if (r.status === 402) return setEtat("sans-abonnement");
    if (!r.ok) return setEtat("erreur");
    const j = await r.json();
    setEnfants(j.enfants ?? []);
    setEtat("pret");
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await createClient().auth.getSession();
      if (!data.session) {
        window.location.href = "/auth/signin?type=parent&next=/suivi";
        return;
      }
      setJeton(data.session.access_token);
      await charger(data.session.access_token);
    })().catch(() => setEtat("erreur"));
  }, [charger]);

  async function relier(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setEnCours(true);
    try {
      const r = await fetch("/api/suivi/enfants", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${jeton}` },
        body: JSON.stringify({ code }),
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok) {
        setCode("");
        await charger(jeton);
      } else {
        setMessage(j.error ?? "Le lien n'a pas pu être créé.");
      }
    } catch {
      setMessage("Le lien n'a pas pu être créé. Vérifiez votre connexion.");
    }
    setEnCours(false);
  }

  async function retirer(cle: string) {
    await fetch("/api/suivi/enfants", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${jeton}` },
      body: JSON.stringify({ cle }),
    });
    setActif(0);
    await charger(jeton);
  }

  const courant = enfants[actif];

  return (
    <main className="min-h-screen bg-white px-4 py-10 text-slate-900 [color-scheme:light]">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-black sm:text-4xl">Le suivi de mon enfant</h1>

        {etat === "chargement" && <p className="mt-6 text-slate-600">Chargement…</p>}
        {etat === "erreur" && <p role="alert" className="mt-6 font-bold text-rose-700">Le suivi n&apos;a pas pu se charger. Réessayez dans un instant.</p>}

        {etat === "sans-abonnement" && (
          <div className="mt-6 rounded-3xl p-6 ring-1 ring-slate-200">
            <p className="text-lg font-bold">Cette page fait partie du suivi famille.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/abonnement" className="rounded-full bg-sky-700 px-6 py-3 font-black text-white hover:bg-sky-800">Voir le suivi famille</Link>
              <Link href="/suivi/exemple" className="rounded-full px-6 py-3 font-black text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50">Voir un exemple</Link>
            </div>
          </div>
        )}

        {etat === "pret" && (
          <>
            {enfants.length > 1 && (
              <div className="mt-6 flex flex-wrap gap-2" role="tablist">
                {enfants.map((e, i) => (
                  <button
                    key={e.cle}
                    role="tab"
                    type="button"
                    aria-selected={i === actif}
                    onClick={() => setActif(i)}
                    className={`rounded-full px-5 py-2 font-black ${i === actif ? "bg-sky-700 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                  >
                    {e.rapport.prenom}
                  </button>
                ))}
              </div>
            )}

            {courant && (
              <div className="mt-6">
                <RapportVue r={courant.rapport} />
                <button type="button" onClick={() => retirer(courant.cle)} className="mt-6 text-sm font-bold text-slate-500 underline hover:text-slate-800">
                  Ne plus suivre {courant.rapport.prenom}
                </button>
              </div>
            )}

            <section className="mt-10 rounded-3xl bg-slate-50 p-6">
              <h2 className="text-xl font-black">{enfants.length ? "Relier un autre enfant" : "Reliez le compte de votre enfant"}</h2>
              <ol className="mt-3 list-decimal space-y-1 pl-5 text-slate-700">
                <li>Votre enfant se connecte à son compte EleveAI, créé avec une adresse courriel.</li>
                <li>Dans « Mon espace », il appuie sur « Créer un code pour mes parents ».</li>
                <li>Vous saisissez ce code ici. Il vaut 7 jours et ne sert qu&apos;une fois.</li>
              </ol>
              <form onSubmit={relier} className="mt-4 flex flex-wrap items-end gap-3">
                <label className="text-sm font-bold text-slate-700">
                  Le code
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    autoComplete="off"
                    maxLength={12}
                    className="mt-1 block w-44 rounded-xl border-2 border-slate-200 bg-white p-2 text-lg font-black tracking-widest"
                  />
                </label>
                <button type="submit" disabled={code.length < 8 || enCours} className="rounded-full bg-sky-700 px-6 py-3 font-black text-white hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-50">
                  {enCours ? "Vérification…" : "Relier"}
                </button>
              </form>
              {message && <p role="alert" className="mt-3 font-bold text-rose-700">{message}</p>}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
