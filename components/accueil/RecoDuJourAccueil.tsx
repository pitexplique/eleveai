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

// Micro-message adapté au score de régularité (encourageant, jamais culpabilisant).
function messageRegularite(score: number): string {
  if (score >= 70) return "Tu es très régulier, continue comme ça ! 🔥";
  if (score >= 40) return "Tu tiens un bon rythme, garde le cap.";
  return "Reviens un peu plus souvent — ça remonte vite. 🌱";
}

// Jauge « ta régularité » : montre le score d'engagement (0–100). Progrès rendu
// visible = récompense saine (pas de points/compétition). Cachée si trop faible
// (élève tout nouveau) pour ne pas démarrer sur un « 0 » décourageant.
function JaugeRegularite({ score, serie }: { score: number; serie: number }) {
  return (
    <div className="mb-4 rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-black uppercase tracking-wide text-white/60">
          🔥 Ta régularité
        </p>
        <div className="flex items-center gap-2">
          {serie >= 2 && (
            <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-[11px] font-black text-orange-300">
              {serie} j d&apos;affilée
            </span>
          )}
          <span className="text-sm font-black text-white">
            {score}
            <span className="text-white/40">/100</span>
          </span>
        </div>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all"
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="mt-1.5 text-xs font-semibold text-white/60">
        {messageRegularite(score)}
      </p>
    </div>
  );
}

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
  const [engagement, setEngagement] = useState<number | null>(null);
  const [serie, setSerie] = useState<number>(0);

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
          setEngagement(data.profil.comportement?.engagement ?? null);
          setSerie(data.profil.comportement?.serie ?? 0);
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

        {/* Jauge de régularité : seulement si le score est significatif (≥ 20),
            pour ne pas afficher un « 0 » décourageant à un tout nouvel élève. */}
        {etat === "ok" && engagement !== null && engagement >= 20 && (
          <JaugeRegularite score={engagement} serie={serie} />
        )}

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
