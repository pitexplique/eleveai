"use client";

// 🏅 MES RÉCOMPENSES (24/11/2026) — en grand, dans le Cockpit ET le Jardin.
// Données : /api/eleve/mes-recompenses (calcul serveur).
// - Élève d'établissement : ses médailles et sa place au podium de la classe,
//   comme les projette le prof. Sans médaille : « Encore N questions… ».
// - Élève inscrit par e-mail : ses trophées personnels (lui seul, aucun
//   classement), le prochain à gagner, et sa meilleure semaine.
// Rien de triste : sans rien à montrer, la carte ne s'affiche pas.

import { useEffect, useState } from "react";
import { useEleve } from "@/context/EleveContext";

type Recompense = { emoji: string; titre: string; texte: string; periode: "semaine" | "mois"; grand: boolean };
type Objectif = { enCourse: boolean; manque: number; unite: "questions" | "jours" | "micros"; medaille: string | null };
type Trophee = { id: string; emoji: string; titre: string; texte: string };
type Reponse =
  | { ok: true; mode: "medailles"; recompenses: Recompense[]; objectif: Objectif | null }
  | { ok: true; mode: "trophees"; gagnes: Trophee[]; prochain: Trophee | null; record: { note: string; semaine: string } | null }
  | { ok: true; mode: null };

function phraseObjectif(o: Objectif) {
  const pl = o.manque > 1 ? "s" : "";
  const u =
    o.unite === "jours" ? `jour${pl} de travail` : o.unite === "micros" ? `micro${pl} réussi${pl} à 80 %` : `question${pl} au coach`;
  if (!o.enCourse) return `Encore ${o.manque} ${u} cette semaine pour entrer dans la course aux médailles.`;
  if (!o.medaille) return "Tu es dans la course aux médailles : chaque jour de travail cette semaine te rapproche du podium.";
  return `Encore ${o.manque} ${u} cette semaine pour viser la médaille ${o.medaille}.`;
}

export default function CarteMesRecompenses({ variante }: { variante: "cockpit" | "jardin" }) {
  const { eleve } = useEleve();
  const token = eleve?.token ?? null;
  const [d, setD] = useState<Reponse | null>(null);

  useEffect(() => {
    if (!token) return;
    fetch("/api/eleve/mes-recompenses", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((x) => x?.ok && setD(x))
      .catch(() => {});
  }, [token]);

  if (!d || !d.mode) return null;
  const cockpit = variante === "cockpit";
  const cadre = cockpit
    ? "border border-amber-400/30 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/60 text-white"
    : "bg-gradient-to-br from-amber-50 via-yellow-50 to-lime-100 text-emerald-950 ring-1 ring-amber-900/10";
  const doux = cockpit ? "text-slate-300" : "text-emerald-800";
  const tuile = cockpit ? "bg-white/5 ring-1 ring-white/10" : "bg-white/80 ring-1 ring-amber-900/10";

  if (d.mode === "medailles") {
    if (!d.recompenses.length && !d.objectif) return null;
    const [premiere, ...suite] = d.recompenses;
    // Pas plus de 5 petites médailles : au-delà, on les compte.
    const autres = suite.slice(0, 5);
    const enPlus = suite.length - autres.length;
    return (
      <section className={`mt-6 rounded-3xl p-5 shadow-lg ${cadre}`}>
        <h2 className="text-xl font-black">🏅 Mes médailles</h2>
        {premiere ? (
          <>
            <div className={`mt-3 flex items-center gap-4 rounded-2xl p-4 ${tuile}`}>
              <span className="text-6xl leading-none sm:text-7xl" aria-hidden>
                {premiere.emoji}
              </span>
              <div>
                <div className="text-lg font-black leading-tight sm:text-2xl">{premiere.titre}</div>
                <div className={`mt-1 text-sm font-semibold ${doux}`}>{premiere.texte}</div>
              </div>
            </div>
            {autres.length > 0 && (
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {autres.map((r) => (
                  <div key={r.titre} className={`flex items-center gap-3 rounded-2xl p-3 ${tuile}`}>
                    <span className="text-4xl leading-none" aria-hidden>
                      {r.emoji}
                    </span>
                    <div>
                      <div className="font-black leading-tight">{r.titre}</div>
                      <div className={`text-sm font-semibold ${doux}`}>{r.texte}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <p className={`mt-3 text-xs font-semibold ${doux}`}>
              {enPlus > 0 && `Et ${enPlus} autre${enPlus > 1 ? "s" : ""} médaille${enPlus > 1 ? "s" : ""} ! `}
              Les mêmes médailles que ton prof projette en classe.
            </p>
          </>
        ) : (
          d.objectif && (
            <div className={`mt-3 flex items-center gap-4 rounded-2xl p-4 ${tuile}`}>
              <span className="text-5xl leading-none" aria-hidden>
                🎯
              </span>
              <div className="text-base font-black leading-snug sm:text-lg">{phraseObjectif(d.objectif)}</div>
            </div>
          )
        )}
      </section>
    );
  }

  // Trophées personnels (inscrit par e-mail).
  return (
    <section className={`mt-6 rounded-3xl p-5 shadow-lg ${cadre}`}>
      <h2 className="text-xl font-black">🏆 Mes trophées</h2>
      <p className={`text-sm font-semibold ${doux}`}>Tu ne te compares qu&apos;à toi-même.</p>
      {d.gagnes.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {d.gagnes.map((t) => (
            <div key={t.id} className={`rounded-2xl p-3 text-center ${tuile}`}>
              <div className="text-5xl leading-none" aria-hidden>
                {t.emoji}
              </div>
              <div className="mt-2 font-black leading-tight">{t.titre}</div>
              <div className={`text-xs font-semibold ${doux}`}>{t.texte}</div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {d.prochain && (
          <div className={`flex items-center gap-3 rounded-2xl p-3 ${tuile}`}>
            <span className="text-4xl leading-none opacity-60 grayscale" aria-hidden>
              {d.prochain.emoji}
            </span>
            <div>
              <div className="font-black leading-tight">Prochain trophée : {d.prochain.titre}</div>
              <div className={`text-sm font-semibold ${doux}`}>{d.prochain.texte}</div>
            </div>
          </div>
        )}
        {d.record && (
          <div className={`flex items-center gap-3 rounded-2xl p-3 ${tuile}`}>
            <span className="text-4xl leading-none" aria-hidden>
              ⭐
            </span>
            <div>
              <div className="font-black leading-tight">Ta meilleure semaine : {d.record.note}</div>
              <div className={`text-sm font-semibold ${doux}`}>Semaine du {d.record.semaine}. Bats ton record !</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
