"use client";

// « CE QUE VOIT TON PROF » (17/11/2026) — la ligne de l'élève dans le bulletin
// de la classe (/prof/classes/bulletin) : moyenne du coach, séances, jours,
// matin / après-midi / soir / week-end, acquis / à revoir, appréciation (sans
// IA), plus sa place sur le podium et ses médailles. Rien si l'élève n'est pas
// dans une classe de « Mes classes ». Données : /api/eleve/ma-ligne.

import { useEffect, useState } from "react";
import { useEleve } from "@/context/EleveContext";

type Medaille = { id: string; emoji: string; titre: string; texte: string };
type Reponse = {
  ok: boolean;
  classe?: string;
  ligne: null | {
    moyenne: number | null;
    seances: number;
    questions: number;
    videos: number;
    jours: number;
    creneaux: { matin: number; apresMidi: number; soir: number; weekend: number };
    compris: string[];
    aRevoir: string[];
    appreciation: string;
  };
  semaine?: { place: number | null; medailles: Medaille[] };
  mois?: { place: number | null; medailles: Medaille[] };
};

const virgule = (n: number) => n.toString().replace(".", ",");
const PLACE = ["", "🥇", "🥈", "🥉"];
const rang = (n: number) => (n === 1 ? "1ʳᵉ" : `${n}ᵉ`);
// Les 6 premières, puis « et N autres » : une liste trop longue décourage.
const court = (t: string[]) => (t.length > 6 ? `${t.slice(0, 6).join(", ")} et ${t.length - 6} autres` : t.join(", "));

export default function CarteMaLigneBulletin() {
  const { eleve } = useEleve();
  const token = eleve?.token ?? null;
  const [d, setD] = useState<Reponse | null>(null);

  useEffect(() => {
    if (!token) return;
    fetch("/api/eleve/ma-ligne", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((x) => x?.ok && setD(x))
      .catch(() => {});
  }, [token]);

  const l = d?.ligne;
  if (!l) return null;
  const c = l.creneaux;
  const recompenses = [
    ...(d.semaine?.place ? [{ emoji: PLACE[d.semaine.place], texte: `${rang(d.semaine.place)} place du podium de la semaine` }] : []),
    ...(d.mois?.place ? [{ emoji: PLACE[d.mois.place], texte: `${rang(d.mois.place)} place du podium du mois` }] : []),
    ...(d.semaine?.medailles ?? []).map((m) => ({ emoji: m.emoji, texte: `Médaille ${m.titre} de la semaine (${m.texte})` })),
    ...(d.mois?.medailles ?? []).map((m) => ({ emoji: m.emoji, texte: `Médaille ${m.titre} du mois (${m.texte})` })),
  ];
  const note = l.moyenne;
  const couleur = note === null ? "text-slate-400" : note >= 14 ? "text-emerald-600" : note >= 10 ? "text-amber-600" : "text-red-600";

  return (
    <section className="mt-6 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-xl font-black text-slate-900">👩‍🏫 Ce que voit ton prof</h2>
      <p className="text-sm text-slate-500">
        Ta ligne dans le bulletin de la classe{d.classe ? ` ${d.classe}` : ""} · 3 derniers mois · calculé sur ton travail au coach
      </p>

      {recompenses.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {recompenses.map((r) => (
            <span key={r.texte} className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-900">
              {r.emoji} {r.texte}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl bg-slate-50 p-3 text-center">
          <div className={`text-2xl font-black ${couleur}`}>{note === null ? "—" : `${virgule(note)}/20`}</div>
          <div className="text-xs text-slate-500">Moyenne du coach</div>
        </div>
        <div className="rounded-2xl bg-slate-50 p-3 text-center">
          <div className="text-2xl font-black text-slate-800">{l.seances}</div>
          <div className="text-xs text-slate-500">Séances</div>
        </div>
        <div className="rounded-2xl bg-slate-50 p-3 text-center">
          <div className="text-2xl font-black text-slate-800">{l.jours}</div>
          <div className="text-xs text-slate-500">Jours de travail</div>
        </div>
        <div className="rounded-2xl bg-slate-50 p-3 text-center">
          <div className="text-base font-black text-slate-800">
            ☀️ {c.matin} · 🌤️ {c.apresMidi} · 🌙 {c.soir} · 🏠 {c.weekend}
          </div>
          <div className="text-xs text-slate-500">Matin · après-midi · soir · week-end</div>
        </div>
      </div>

      {(l.compris.length > 0 || l.aRevoir.length > 0) && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {l.compris.length > 0 && (
            <div className="rounded-2xl bg-emerald-50 p-3 text-sm text-emerald-900">
              <div className="font-bold">✓ Acquis</div>
              {court(l.compris)}
            </div>
          )}
          {l.aRevoir.length > 0 && (
            <div className="rounded-2xl bg-red-50 p-3 text-sm text-red-900">
              <div className="font-bold">↻ À revoir</div>
              {court(l.aRevoir)}
            </div>
          )}
        </div>
      )}

      <blockquote className="mt-4 rounded-2xl bg-indigo-50 p-4 text-slate-800">
        <div className="mb-1 text-xs font-bold uppercase tracking-wide text-indigo-700">Appréciation proposée à ton prof</div>
        {l.appreciation}
      </blockquote>
    </section>
  );
}
