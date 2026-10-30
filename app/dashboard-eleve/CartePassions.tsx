"use client";

// « Mes passions » dans le tableau de bord de l'élève (30/10/2026, Frédéric :
// « ça doit apparaître dans leur dashboard »). Grandes icônes, et les deux
// portes : les vidéos de ses passions, changer ses passions.
// Voir app/passions/page.tsx pour le pourquoi.

import { useEffect, useState } from "react";
import Link from "next/link";
import { useEleve } from "@/context/EleveContext";
import { chargerPassions } from "@/lib/passions";
import { libellePassion } from "@/lib/videos/centres-interet";

export default function CartePassions() {
  const { eleve } = useEleve();
  const [passions, setPassions] = useState<string[] | null | undefined>(undefined);

  useEffect(() => {
    chargerPassions(eleve).then(setPassions);
  }, [eleve]);

  if (passions === undefined) return null;

  return (
    <div className="mt-6 rounded-[2rem] border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-6 shadow-xl">
      <h2 className="text-xl font-black text-slate-900">⭐ Mes passions</h2>
      {passions?.length ? (
        <>
          <div className="mt-4 flex flex-wrap gap-3">
            {passions.map((p) => {
              const l = libellePassion(p);
              return (
                <span
                  key={p}
                  className="flex items-center gap-2 rounded-2xl border-2 border-amber-300 bg-white px-4 py-2 text-lg font-black text-slate-900"
                >
                  <span className="text-3xl">{l.emoji}</span> {l.nom}
                </span>
              );
            })}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/passions"
              className="rounded-full bg-amber-500 px-5 py-3 text-sm font-black text-white shadow hover:bg-amber-600"
            >
              🎬 Les maths de mes passions
            </Link>
            <Link
              href="/passions?modifier=1"
              className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-700 hover:bg-slate-50"
            >
              ✏️ Changer
            </Link>
          </div>
        </>
      ) : (
        <Link
          href="/passions"
          className="mt-4 flex items-center gap-3 rounded-2xl border-2 border-dashed border-amber-300 bg-white px-4 py-3 font-bold text-amber-900 hover:bg-amber-50"
        >
          <span className="text-3xl">⚽🎵🎮</span>
          <span>Dis-nous ce que tu aimes : on te montre les maths de tes passions !</span>
        </Link>
      )}
    </div>
  );
}
