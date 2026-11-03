"use client";

// Les demandes de /rejoindre-l-aventure : le compte par pays en haut (le plan
// vise deux classes par pays), puis chaque demande avec ses boutons.

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

type Demande = {
  id: string;
  created_at: string;
  prenom: string | null;
  email: string;
  pays: string;
  niveaux: string | null;
  etablissement: string | null;
  message: string | null;
  statut: string;
  note_interne: string | null;
};

type ParPays = { pays: string; nom: string; acceptes: number; enAttente: number };

const STATUT_LABEL: Record<string, string> = {
  candidat: "En attente",
  accepte: "Acceptée",
  refuse: "Refusée",
  termine: "Terminée",
};

/** Deux classes par pays : la cible du plan d'expérience. */
const CIBLE_PAR_PAYS = 2;

export default function AdminAventureClient() {
  const [demandes, setDemandes] = useState<Demande[] | null>(null);
  const [parPays, setParPays] = useState<ParPays[]>([]);
  const [erreur, setErreur] = useState("");

  const charger = useCallback(async () => {
    const res = await fetch("/api/admin/aventure");
    const d = await res.json().catch(() => null);
    if (!d?.ok) {
      setErreur(d?.error || "Chargement impossible.");
      return;
    }
    setDemandes(d.demandes);
    setParPays(d.parPays);
  }, []);

  useEffect(() => {
    charger();
  }, [charger]);

  async function changer(id: string, statut: string) {
    await fetch("/api/admin/aventure", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, statut }),
    });
    charger();
  }

  const nomDe = (slug: string) => parPays.find((p) => p.pays === slug)?.nom ?? slug;

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <div className="mx-auto max-w-5xl">
        <Link href="/admin/dashboard" className="text-sm text-slate-400 hover:underline">
          ← Tableau de bord
        </Link>
        <h1 className="mt-2 text-2xl font-black">🌍 Profs de l’aventure</h1>
        <p className="mt-1 text-sm text-slate-400">
          Les demandes de{" "}
          <Link href="/rejoindre-l-aventure" className="underline">
            /rejoindre-l-aventure
          </Link>
          . Chaque demande t’arrive aussi par e-mail : « Répondre » écrit au prof.
        </p>

        {erreur && <p className="mt-4 text-rose-300">{erreur}</p>}

        <div className="mt-6 grid gap-2 sm:grid-cols-4">
          {parPays.map((p) => (
            <div
              key={p.pays}
              className={`rounded-xl border p-3 ${
                p.acceptes >= CIBLE_PAR_PAYS
                  ? "border-emerald-700 bg-emerald-900/30"
                  : "border-slate-700 bg-slate-900"
              }`}
            >
              <p className="font-bold">{p.nom}</p>
              <p className="text-sm text-slate-400">
                {p.acceptes} / {CIBLE_PAR_PAYS} classes
                {p.enAttente > 0 && ` · ${p.enAttente} en attente`}
              </p>
            </div>
          ))}
        </div>

        {demandes && demandes.length === 0 && (
          <p className="mt-8 text-slate-400">Aucune demande pour l’instant.</p>
        )}

        <ul className="mt-8 space-y-3">
          {demandes?.map((d) => (
            <li key={d.id} className="rounded-xl border border-slate-700 bg-slate-900 p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-bold">
                  {d.prenom || "(sans prénom)"} · {nomDe(d.pays)}
                  {d.niveaux && <span className="font-normal text-slate-400"> · {d.niveaux}</span>}
                </p>
                <p className="text-xs text-slate-500">
                  {new Date(d.created_at).toLocaleString("fr-FR")} · {STATUT_LABEL[d.statut] ?? d.statut}
                </p>
              </div>
              <p className="mt-1 text-sm">
                <a href={`mailto:${d.email}`} className="text-sky-300 underline">
                  {d.email}
                </a>
                {d.etablissement && <span className="text-slate-400"> · {d.etablissement}</span>}
              </p>
              {d.message && <p className="mt-2 whitespace-pre-wrap text-sm text-slate-300">{d.message}</p>}
              <div className="mt-3 flex flex-wrap gap-2">
                {(["accepte", "refuse", "termine", "candidat"] as const)
                  .filter((s) => s !== d.statut)
                  .map((s) => (
                    <button
                      key={s}
                      onClick={() => changer(d.id, s)}
                      className="rounded-lg border border-slate-600 px-3 py-1 text-xs font-bold hover:bg-slate-800"
                    >
                      {s === "candidat" ? "Remettre en attente" : STATUT_LABEL[s]}
                    </button>
                  ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
