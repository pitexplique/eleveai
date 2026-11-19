"use client";

// LE TABLEAU DE BORD MINIMUM DU COMPTE GRATUIT (19/11/2026).
// Trois chiffres (exercices de la semaine, série, dernier score), l'historique
// des 7 derniers jours, la progression par chapitre FLOUTÉE et le bouton
// « Voir mon vrai suivi ». ⛔ Aucun prix ici : l'élève ne paie pas, le bouton
// écrit à son parent (DemandeAuParent).
import { useState } from "react";
import type { ResumeGratuit } from "@/lib/suivi/resumeGratuit";
import { COMPTE_GRATUIT } from "@/lib/tarifs";
import DemandeAuParent from "./DemandeAuParent";

const FAUSSES_NOTIONS = [
  { titre: "Nombres décimaux", pct: 72 },
  { titre: "Fractions", pct: 45 },
  { titre: "Périmètres et aires", pct: 88 },
  { titre: "Proportionnalité", pct: 30 },
];

export default function CarteSuiviGratuit({
  resume,
  nbNotions,
}: {
  resume: ResumeGratuit | null;
  nbNotions: number | null;
}) {
  const [ouvert, setOuvert] = useState(false);
  const chiffre = (valeur: string, libelle: string) => (
    <div className="rounded-2xl bg-sky-50 p-4 text-center ring-1 ring-sky-100">
      <div className="text-3xl font-black text-sky-800">{valeur}</div>
      <div className="mt-1 text-sm font-bold text-slate-600">{libelle}</div>
    </div>
  );
  const serie = resume?.serieJours ?? 0;
  const lignes = FAUSSES_NOTIONS.slice(0, Math.max(2, Math.min(4, nbNotions ?? 4)));

  return (
    <section className="mt-6 rounded-[2rem] border border-sky-100 bg-white p-6 shadow-xl">
      <h2 className="text-xl font-black text-slate-900">🏁 Ma semaine</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {chiffre(String(resume?.exercicesSemaine ?? 0), "exercices cette semaine")}
        {chiffre(`${serie} jour${serie > 1 ? "s" : ""}`, "d'affilée")}
        {chiffre(resume?.dernierScore != null ? `${resume.dernierScore} %` : "—", "mon dernier score")}
      </div>
      <p className="mt-3 text-sm text-slate-500">
        Tu vois ici tes {COMPTE_GRATUIT.historiqueJours} derniers jours. Tout ce que tu as fait avant est bien gardé.
      </p>

      <h3 className="mt-6 text-lg font-black text-slate-900">Ma progression par chapitre</h3>
      <div className="relative mt-3 overflow-hidden rounded-2xl ring-1 ring-slate-100">
        {/* Aperçu flou : de faux chiffres, jamais les vrais (le serveur ne les envoie pas). */}
        <ul aria-hidden="true" className="pointer-events-none select-none space-y-3 p-4 blur-sm">
          {lignes.map((n) => (
            <li key={n.titre}>
              <div className="flex justify-between text-sm font-bold text-slate-700">
                <span>{n.titre}</span>
                <span>{n.pct} %</span>
              </div>
              <div className="mt-1 h-3 rounded-full bg-slate-100">
                <div className="h-3 rounded-full bg-emerald-500" style={{ width: `${n.pct}%` }} />
              </div>
            </li>
          ))}
        </ul>
        <div className="absolute inset-0 flex items-center justify-center bg-white/40">
          <button
            type="button"
            onClick={() => setOuvert(true)}
            className="rounded-full bg-sky-700 px-6 py-3 font-black text-white shadow-lg transition hover:bg-sky-800"
          >
            Voir mon vrai suivi
          </button>
        </div>
      </div>
      {ouvert && <DemandeAuParent onFermer={() => setOuvert(false)} />}
    </section>
  );
}
