// app/dashboard/abonnement/page.tsx — l'état de l'abonnement et le portail Stripe (05/11/2026).
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Statut = {
  acces: boolean;
  enseignant: boolean;
  formule: "mensuel" | "annee" | null;
  accesJusquau: string | null;
  finProgrammee: boolean;
  portail: boolean;
};

export default function AbonnementPage() {
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();
  const [jeton, setJeton] = useState("");
  const [statut, setStatut] = useState<Statut | null>(null);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    async function charger() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/auth/signin?next=/dashboard/abonnement");
        return;
      }
      setJeton(data.session.access_token);
      const r = await fetch("/api/abonnement/statut", {
        headers: { Authorization: `Bearer ${data.session.access_token}` },
      });
      setStatut(await r.json());
    }
    charger().catch(() => setErreur("Impossible de lire votre abonnement."));
  }, [router, supabase]);

  async function ouvrirPortail() {
    setErreur("");
    const r = await fetch("/api/abonnement/portail", { method: "POST", headers: { Authorization: `Bearer ${jeton}` } });
    const j = await r.json().catch(() => ({}));
    if (j.url) window.location.href = j.url;
    else setErreur(j.error ?? "Le portail n'a pas pu s'ouvrir.");
  }

  const fin = statut?.accesJusquau ? new Date(statut.accesJusquau).toLocaleDateString("fr-FR") : "";

  return (
    <main className="min-h-screen bg-white px-4 py-10 text-slate-900 [color-scheme:light]">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-black">Mon abonnement</h1>
        <div className="mt-6 rounded-2xl p-5 ring-1 ring-slate-200">
          {!statut && !erreur && <p className="text-slate-600">Chargement…</p>}
          {statut?.enseignant && <p className="font-bold">Votre adresse académique vous donne accès à la vidéothèque, à titre personnel.</p>}
          {statut && !statut.enseignant && statut.acces && (
            <>
              <p className="text-xl font-black">Le suivi famille, {statut.formule === "annee" ? "année scolaire" : "au mois"}</p>
              <Link href="/suivi" className="mt-3 inline-flex rounded-full bg-sky-700 px-6 py-3 font-black text-white hover:bg-sky-800">Le suivi de mon enfant</Link>
              <p className="mt-3 text-slate-600">
                {statut.finProgrammee ? `Accès jusqu'au ${fin}, sans nouveau prélèvement.` : `Prochain prélèvement le ${fin}.`}
              </p>
            </>
          )}
          {statut && !statut.enseignant && !statut.acces && (
            <>
              <p className="text-xl font-black">Aucun abonnement en cours</p>
              <Link href="/abonnement" className="mt-4 inline-flex rounded-full bg-sky-700 px-6 py-3 font-black text-white hover:bg-sky-800">Voir le suivi famille</Link>
            </>
          )}
          {statut?.portail && (
            <button type="button" onClick={ouvrirPortail} className="mt-4 block rounded-full px-6 py-3 font-black text-slate-800 ring-1 ring-slate-300 hover:bg-slate-50">
              Arrêter l&apos;abonnement, changer de carte, voir mes factures
            </button>
          )}
          {erreur && <p role="alert" className="mt-3 font-bold text-rose-700">{erreur}</p>}
        </div>
      </div>
    </main>
  );
}
