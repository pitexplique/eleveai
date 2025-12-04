"use client";

import { useState } from "react";
import {
  getDashboardDirectionData,
  type Profil,
} from "@/data/dashboardDirectionData";

export default function DashboardDirectionClient() {
  // 👉 Données simulées – à remplacer plus tard par Supabase
  const [profilFocus, setProfilFocus] = useState<Profil>("eleves");

  const {
    statsGlobales,
    repartitionUsage,
    topThemesEleves,
    topUsagesProfs,
    alertes,
  } = getDashboardDirectionData();

  const coutReel = Math.min(
    statsGlobales.coutEstimeMois,
    statsGlobales.plafondMensuel
  );
  const resteAvantPlafond = statsGlobales.plafondMensuel - coutReel;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-black text-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 lg:py-10 space-y-8">
        {/* HEADER */}
        <header className="space-y-3">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 text-xs font-semibold text-emerald-300 border border-slate-700">
            <span>📊</span>
            <span>Tableau de bord – Direction EleveAI</span>
          </p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-50">
                Suivi des usages IA et du budget – Collège
              </h1>
              <p className="text-sm text-slate-300 max-w-xl">
                Vue d’ensemble de la consommation d’EleveAI dans l’établissement
                : élèves, enseignants, vie scolaire / administration, avec
                indicateurs de budget et d’éthique.
              </p>
            </div>

            <div className="rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-xs text-slate-200 space-y-1">
              <p className="font-semibold text-emerald-300">
                Mois en cours : décembre 2025
              </p>
              <p>
                Coût estimé :{" "}
                <span className="font-semibold text-emerald-300">
                  {statsGlobales.coutEstimeMois} € / {statsGlobales.plafondMensuel} €
                </span>{" "}
                (plafond)
              </p>
              <p className="text-[11px] text-slate-400">
                Le montant facturé ne dépassera jamais le plafond mensuel fixé
                par l’établissement.
              </p>
            </div>
          </div>
        </header>

        {/* SECTION 1 – CARTES PRINCIPALES */}
        <section className="grid gap-4 md:grid-cols-4">
          <CardStat
            label="Élèves actifs ce mois-ci"
            value={statsGlobales.nbElevesActifs.toString()}
            icon="👨‍🎓"
          />
          <CardStat
            label="Enseignants actifs"
            value={statsGlobales.nbProfsActifs.toString()}
            icon="👨‍🏫"
          />
          <CardStat
            label="Requêtes IA (mois)"
            value={statsGlobales.requetesMois.toLocaleString("fr-FR")}
            icon="⚡"
            subLabel={`+${statsGlobales.evolutionPourcent}% vs mois précédent`}
            highlight
          />
          <CardBudget
            coutEstime={statsGlobales.coutEstimeMois}
            plafond={statsGlobales.plafondMensuel}
            coutReel={coutReel}
            resteAvantPlafond={resteAvantPlafond}
          />
        </section>

        {/* SECTION 2 – RÉPARTITION DES USAGES */}
        <section className="grid gap-4 lg:grid-cols-2">
          {/* Répartition profils */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-100">
                Répartition des usages par profil
              </h2>
              <p className="text-[11px] text-slate-400">
                Données globales sur le mois
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <BarProfil
                label="Élèves"
                value={repartitionUsage.eleves}
                color="bg-emerald-500"
              />
              <BarProfil
                label="Enseignants"
                value={repartitionUsage.profs}
                color="bg-sky-400"
              />
              <BarProfil
                label="Vie scolaire / Admin"
                value={repartitionUsage.admin}
                color="bg-violet-400"
              />
            </div>

            <p className="text-[11px] text-slate-400">
              Ces pourcentages indiquent la part des requêtes IA initiées par
              chaque type de profil.
            </p>
          </div>

          {/* Basculer focus élèves / profs */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-slate-100">
                Focus usages pédagogiques
              </h2>
              <div className="inline-flex items-center gap-1 rounded-full bg-slate-800/80 p-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => setProfilFocus("eleves")}
                  className={`px-2 py-0.5 rounded-full ${
                    profilFocus === "eleves"
                      ? "bg-emerald-500 text-slate-950 font-semibold"
                      : "text-slate-300"
                  }`}
                >
                  Élèves
                </button>
                <button
                  type="button"
                  onClick={() => setProfilFocus("profs")}
                  className={`px-2 py-0.5 rounded-full ${
                    profilFocus === "profs"
                      ? "bg-sky-400 text-slate-950 font-semibold"
                      : "text-slate-300"
                  }`}
                >
                  Enseignants
                </button>
              </div>
            </div>

            {profilFocus === "eleves" ? (
              <div className="space-y-2 text-xs text-slate-200">
                {topThemesEleves.map((t) => (
                  <div
                    key={t.theme}
                    className="flex items-center justify-between gap-2"
                  >
                    <span className="truncate">{t.theme}</span>
                    <span className="text-slate-400">{t.part}%</span>
                  </div>
                ))}
                <p className="text-[11px] text-slate-400 mt-2">
                  Indique les thèmes les plus souvent demandés par les élèves
                  avec EleveAI (révisions, remédiation, entraînements…).
                </p>
              </div>
            ) : (
              <div className="space-y-2 text-xs text-slate-200">
                {topUsagesProfs.map((u) => (
                  <div
                    key={u.usage}
                    className="flex items-center justify-between gap-2"
                  >
                    <span className="truncate">{u.usage}</span>
                    <span className="text-slate-400">{u.part}%</span>
                  </div>
                ))}
                <p className="text-[11px] text-slate-400 mt-2">
                  Indique les usages principaux des enseignants : préparation,
                  exercices, évaluations, différenciation pédagogique.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3 – ÉTHIQUE & PRÉVENTION */}
        <section className="grid gap-4 lg:grid-cols-2">
          {/* Alertes éthique / triche */}
          <div className="rounded-2xl border border-rose-500/40 bg-slate-900/80 p-5 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-rose-100">
                Alertes éthiques & prévention de la triche
              </h2>
              <span className="text-[11px] text-rose-200 bg-rose-500/20 px-2 py-0.5 rounded-full">
                Bientôt enrichi
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-100">
              {alertes.map((a, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-2.5"
                >
                  <p className="flex items-center justify-between gap-2 text-[11px] text-rose-100 mb-1">
                    <span>
                      {a.type === "triche"
                        ? "Suspicion de triche"
                        : "Usage intensif ciblé"}
                    </span>
                    <span className="text-rose-200/80">
                      {a.date} · {a.niveau}
                    </span>
                  </p>
                  <p className="text-[11px] text-slate-100 leading-snug">
                    {a.message}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-400">
              Ces éléments sont des indicateurs à croiser avec les observations
              des équipes. Ils ne remplacent pas le regard professionnel, mais
              peuvent servir de base à un échange pédagogique.
            </p>
          </div>

          {/* Bloc "Rapports & export" */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-3">
            <h2 className="text-sm font-semibold text-slate-100">
              Rapports mensuels & préparation du CA
            </h2>
            <p className="text-xs text-slate-300">
              Le tableau de bord permettra d’exporter un{" "}
              <span className="font-semibold text-slate-100">
                rapport mensuel
              </span>{" "}
              (PDF) incluant :
            </p>
            <ul className="list-disc pl-5 text-xs text-slate-200 space-y-1">
              <li>les indicateurs de consommation (global, profils, coût),</li>
              <li>les principaux usages pédagogiques,</li>
              <li>les éventuelles alertes à signaler,</li>
              <li>un résumé lisible pour le conseil d’administration.</li>
            </ul>
            <p className="text-[11px] text-slate-400">
              L’objectif est de rendre le pilotage de l’IA{" "}
              <span className="font-semibold text-slate-200">
                lisible, sécurisant et compatible
              </span>{" "}
              avec les contraintes de l’Éducation Nationale.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ---------- PETITS COMPOSANTS RÉUTILISABLES ---------- */

type CardStatProps = {
  label: string;
  value: string;
  icon?: string;
  subLabel?: string;
  highlight?: boolean;
};

function CardStat({
  label,
  value,
  icon,
  subLabel,
  highlight,
}: CardStatProps) {
  return (
    <article
      className={`rounded-2xl border bg-slate-900/80 p-4 flex flex-col gap-2 ${
        highlight ? "border-emerald-500/60" : "border-slate-800"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-slate-400">{label}</p>
        {icon && <span className="text-lg">{icon}</span>}
      </div>
      <p className="text-2xl font-semibold text-slate-50">{value}</p>
      {subLabel && (
        <p className="text-[11px] text-emerald-300 font-medium">{subLabel}</p>
      )}
    </article>
  );
}

type CardBudgetProps = {
  coutEstime: number;
  plafond: number;
  coutReel: number;
  resteAvantPlafond: number;
};

function CardBudget({
  coutEstime,
  plafond,
  coutReel,
  resteAvantPlafond,
}: CardBudgetProps) {
  const ratio = Math.min(coutReel / plafond, 1);

  return (
    <article className="rounded-2xl border border-emerald-500/50 bg-slate-900/80 p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-slate-400">Budget IA – mois en cours</p>
        <span className="text-sm">💶</span>
      </div>
      <p className="text-sm text-slate-200">
        Facturation simulée :{" "}
        <span className="font-semibold text-emerald-300">
          {coutReel.toFixed(0)} € / {plafond} €
        </span>{" "}
        (plafond)
      </p>

      <div className="h-2 rounded-full bg-slate-800 overflow-hidden mt-1">
        <div
          className="h-full bg-emerald-500 transition-all"
          style={{ width: `${ratio * 100}%` }}
        />
      </div>

      <p className="text-[11px] text-slate-400">
        Estimation brute : {coutEstime.toFixed(0)} € · Il reste environ{" "}
        <span className="font-semibold text-emerald-300">
          {resteAvantPlafond.toFixed(0)} €
        </span>{" "}
        avant d’atteindre le plafond décidé par l’établissement.
      </p>
    </article>
  );
}

type BarProfilProps = {
  label: string;
  value: number; // entre 0 et 1
  color: string; // classe Tailwind, ex "bg-emerald-500"
};

function BarProfil({ label, value, color }: BarProfilProps) {
  const pct = Math.round(value * 100);
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs text-slate-300">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
        <div
          className={`h-full ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
