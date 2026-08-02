"use client";

// « La météo de l'île » — l'ancre du rituel quotidien d'un journal (réflexion
// du 16/07 : tous les quotidiens ont la météo ; Frédéric la regarde chaque
// jour — précipitations et vents). Données Open-Meteo (API libre, sans clé),
// récupérées côté client ; en cas d'échec, la rubrique NE REND RIEN (le
// journal ne montre jamais une case en panne). Style papier du journal.

import { useEffect, useState } from "react";
import Link from "next/link";

// Les deux côtes (l'écart Est/Ouest, LE phénomène réunionnais) + les hauts.
const POINTS = [
  { nom: "Saint-Denis", lat: -20.88, lon: 55.45 },
  { nom: "Saint-Pierre", lat: -21.34, lon: 55.48 },
  { nom: "Plaine des Cafres", lat: -21.2, lon: 55.57 },
] as const;

type Releve = {
  nom: string;
  temperature: number;
  vent: number;
  rafales: number;
  pluie: number;
};

export default function MeteoJour() {
  const [releves, setReleves] = useState<Releve[] | null>(null);

  useEffect(() => {
    const lats = POINTS.map((p) => p.lat).join(",");
    const lons = POINTS.map((p) => p.lon).join(",");
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}` +
      `&current=temperature_2m,precipitation,wind_speed_10m,wind_gusts_10m` +
      `&timezone=Indian%2FReunion`;

    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        // 1 point → objet ; plusieurs → tableau. On normalise.
        const rows = Array.isArray(data) ? data : [data];
        if (rows.length !== POINTS.length) throw new Error();
        setReleves(
          rows.map((d, i) => ({
            nom: POINTS[i].nom,
            temperature: Math.round(d.current.temperature_2m),
            vent: Math.round(d.current.wind_speed_10m),
            rafales: Math.round(d.current.wind_gusts_10m),
            pluie: Math.round(d.current.precipitation * 10) / 10,
          }))
        );
      })
      .catch(() => setReleves(null));
  }, []);

  if (!releves) return null;

  return (
    <div className="py-3">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
        🌦️ La météo de l&apos;île · en ce moment
      </p>
      <ul className="mt-1.5 space-y-1">
        {releves.map((r) => (
          <li key={r.nom} className="flex items-baseline justify-between gap-2 text-sm">
            <span className="font-black">{r.nom}</span>
            <span className="font-medium tabular-nums text-[#1d1c16]/75">
              {r.temperature}° · vent {r.vent}
              {r.rafales > r.vent + 10 ? ` (raf. ${r.rafales})` : ""} km/h
              {r.pluie > 0 ? ` · ${r.pluie} mm` : ""}
            </span>
          </li>
        ))}
      </ul>
      <Link
        href="/simulateur-cyclone"
        className="mt-2 block text-sm font-black text-cyan-800 transition hover:translate-x-0.5"
      >
        🌀 La vigie : simule ton cyclone →
      </Link>
    </div>
  );
}
