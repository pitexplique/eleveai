"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Props = { ouvert: boolean; mensuel: string; annee: string; finAnnee: string; nbVideos: number };

export default function ChoixAbonnement({ ouvert, mensuel, annee, finAnnee, nbVideos }: Props) {
  const [formule, setFormule] = useState<"mensuel" | "annee">("annee");
  const [cgv, setCgv] = useState(false);
  const [pasEleve, setPasEleve] = useState(false);
  const [erreur, setErreur] = useState("");
  const [enCours, setEnCours] = useState(false);

  async function commander() {
    setErreur("");
    setEnCours(true);
    try {
      const { data } = await createClient().auth.getSession();
      if (!data.session) {
        window.location.href = "/auth/signin?next=/abonnement";
        return;
      }
      const r = await fetch("/api/abonnement/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${data.session.access_token}` },
        body: JSON.stringify({ formule, cgv, pasEleve }),
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

  const carte = (f: "mensuel" | "annee", titre: string, prix: string, unite: string, note: string) => (
    <button
      type="button"
      onClick={() => setFormule(f)}
      aria-pressed={formule === f}
      className={`rounded-2xl border-2 p-5 text-left transition ${formule === f ? "border-sky-600 bg-sky-50" : "border-slate-200 bg-white hover:border-sky-300"}`}
    >
      <span className="block text-sm font-black uppercase tracking-wide text-sky-700">{titre}</span>
      <span className="mt-1 block text-3xl font-black">{prix}</span>
      <span className="block text-sm font-bold text-slate-500">{unite}</span>
      <span className="mt-2 block text-sm text-slate-600">{note}</span>
    </button>
  );

  return (
    <main className="min-h-screen bg-white px-4 py-10 text-slate-900 [color-scheme:light]">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-black sm:text-4xl">Le suivi famille</h1>
        <p className="mt-3 text-slate-600">
          Dès aujourd&apos;hui : toute la vidéothèque, soit {nbVideos} vidéos à parcourir par classe, sans publicité.
          Le compte rendu aux parents et le bilan de départ arrivent ensuite, en exclusivité pour les abonnés et sans
          supplément.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {carte("annee", "Année scolaire", annee, `jusqu'au ${finAnnee}`, "Un seul paiement, sans reconduction.")}
          {carte("mensuel", "Au mois", mensuel, "par mois", "Prélevé chaque mois, à arrêter quand vous voulez.")}
        </div>

        {!ouvert ? (
          <p className="mt-6 rounded-2xl bg-amber-50 p-4 font-bold text-amber-900 ring-1 ring-amber-200">
            L&apos;abonnement ouvre très bientôt. Rien ne peut être payé pour l&apos;instant.
          </p>
        ) : (
          <>
            <div className="mt-6 space-y-3 text-sm">
              <label className="flex gap-3">
                <input type="checkbox" checked={cgv} onChange={(e) => setCgv(e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0" />
                <span>
                  J&apos;ai lu et j&apos;accepte les{" "}
                  <Link href="/cgv" target="_blank" className="font-bold text-sky-700 underline">conditions de vente</Link>.
                  Je suis majeur ou j&apos;ai l&apos;accord de mes parents.
                </span>
              </label>
              <label className="flex gap-3">
                <input type="checkbox" checked={pasEleve} onChange={(e) => setPasEleve(e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0" />
                <span>Mon enfant et moi ne sommes ni élèves ni anciens élèves de Frédéric Lacoste.</span>
              </label>
            </div>
            {erreur && <p role="alert" className="mt-4 font-bold text-rose-700">{erreur}</p>}
            <button
              type="button"
              onClick={commander}
              disabled={!cgv || !pasEleve || enCours}
              className="mt-5 w-full rounded-full bg-sky-700 px-6 py-4 text-lg font-black text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {enCours ? "Ouverture du paiement…" : `Commander avec obligation de paiement : ${formule === "annee" ? annee : `${mensuel} par mois`}`}
            </button>
            <p className="mt-3 text-center text-sm text-slate-500">
              14 jours pour changer d&apos;avis, remboursé sans motif. Paiement sécurisé par Stripe.
            </p>
          </>
        )}
        <p className="mt-8 text-center text-sm text-slate-500">
          Vous préférez simplement encourager le site ?{" "}
          <Link href="/soutenir" className="font-bold text-sky-700 underline">Faire un don</Link>
        </p>
      </div>
    </main>
  );
}
