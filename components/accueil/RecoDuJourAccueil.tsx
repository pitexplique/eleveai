"use client";

// Bloc « ta journée » en haut de l'accueil, personnalisé pour l'élève connecté.
// Consomme GET /api/profil-eleve (Niveau + Comportement + reco_du_jour) et
// affiche 2 cartes : 🔥 principale (progresser / renforcer / reprendre) + 🧭
// alternative (explorer une voie neuve).
//
// Dégradation propre : si pas connecté (pas de token), erreur réseau ou table
// absente → le composant ne rend RIEN (l'accueil garde son allure vitrine).

import { useEffect, useState } from "react";
import Link from "next/link";
import { useEleve } from "@/context/EleveContext";
import type { RecoDuJour, CarteReco } from "@/lib/profil-eleve/types";

// Dégradés par « ton » de carte (cf. CarteReco.ton).
const TONS: Record<CarteReco["ton"], string> = {
  fire: "from-orange-500 to-rose-600",
  warn: "from-amber-500 to-orange-600",
  compass: "from-violet-500 to-fuchsia-600",
};

function Carte({ carte }: { carte: CarteReco }) {
  return (
    <Link
      href={carte.lien}
      className="group relative flex flex-col overflow-hidden rounded-2xl p-5 text-left shadow-lg transition-transform hover:-translate-y-1 hover:scale-[1.02] sm:p-6"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${TONS[carte.ton]} opacity-95 transition-opacity group-hover:opacity-100`}
      />
      <div className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full bg-white/20 blur-2xl" />

      <div className="relative z-10 flex items-center gap-2">
        <span className="text-2xl" aria-hidden="true">
          {carte.emoji}
        </span>
        <span className="rounded-full bg-black/25 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white backdrop-blur-sm">
          {carte.categorie}
        </span>
      </div>

      <h3 className="relative z-10 mt-3 text-xl font-black leading-tight text-white drop-shadow-sm sm:text-2xl">
        {carte.titre}
      </h3>
      <p className="relative z-10 mt-1.5 flex-1 text-sm font-semibold leading-snug text-white/90">
        {carte.message}
      </p>
      <span className="relative z-10 mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-slate-900 shadow-md transition-all group-hover:gap-3">
        {carte.cta}
      </span>
    </Link>
  );
}

export default function RecoDuJourAccueil() {
  const { eleve } = useEleve();
  const token = eleve?.token ?? null;

  const [reco, setReco] = useState<RecoDuJour | null>(null);
  const [prenom, setPrenom] = useState<string | null>(null);
  const [etat, setEtat] = useState<"idle" | "chargement" | "ok" | "erreur">(
    "idle"
  );

  useEffect(() => {
    if (!token) return;
    let annule = false;
    setEtat("chargement");

    fetch("/api/profil-eleve", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        if (annule) return;
        const rdj: RecoDuJour | undefined = data?.profil?.reco_du_jour;
        if (data?.ok && rdj?.principale) {
          setReco(rdj);
          setPrenom(data.profil.prenom ?? null);
          setEtat("ok");
        } else {
          setEtat("erreur");
        }
      })
      .catch(() => {
        if (!annule) setEtat("erreur");
      });

    return () => {
      annule = true;
    };
  }, [token]);

  // Rien à montrer : visiteur non connecté, chargement initial, ou échec.
  if (!token || etat === "erreur") return null;

  return (
    <section className="bg-[#041B33] px-4 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">
            ☀️
          </span>
          <div>
            <h2 className="text-xl font-black leading-tight text-white sm:text-2xl">
              {prenom ? `Bonjour ${prenom}, voici ta journée` : "Voici ta journée"}
            </h2>
            <p className="text-xs font-bold text-white/50">
              Choisi pour toi · progresse 🔥 ou explore 🧭
            </p>
          </div>
        </div>

        {etat === "chargement" || !reco ? (
          // Squelette discret le temps du calcul.
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="h-40 animate-pulse rounded-2xl bg-white/5" />
            <div className="h-40 animate-pulse rounded-2xl bg-white/5" />
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <Carte carte={reco.principale} />
            {reco.alternative && <Carte carte={reco.alternative} />}
          </div>
        )}
      </div>
    </section>
  );
}
