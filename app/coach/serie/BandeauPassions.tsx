"use client";

// Une ligne dans le coach : « Dis-nous ce que tu aimes » tant que l'élève n'a
// rien choisi, puis ses passions en icônes, qui ramènent vers /passions (les
// vidéos de ses passions). 30/10/2026 — voir app/passions/page.tsx.

import { useEffect, useState } from "react";
import Link from "next/link";
import { useEleve } from "@/context/EleveContext";
import { chargerPassions } from "@/lib/passions";
import { libellePassion } from "@/lib/videos/centres-interet";

export default function BandeauPassions() {
  const { eleve } = useEleve();
  const [passions, setPassions] = useState<string[] | null | undefined>(undefined);

  useEffect(() => {
    chargerPassions(eleve).then(setPassions);
  }, [eleve]);

  if (passions === undefined) return null;

  if (!passions?.length) {
    return (
      <Link
        href="/passions"
        className="flex items-center gap-3 rounded-2xl border-2 border-amber-300 bg-amber-50 px-4 py-2 font-bold text-amber-900 hover:bg-amber-100"
      >
        <span className="text-2xl">⚽🎵🎮</span>
        <span>Dis-nous ce que tu aimes : on te montre les maths de tes passions !</span>
      </Link>
    );
  }

  return (
    <Link
      href="/passions"
      className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:border-amber-300"
    >
      <span className="text-slate-500">Les maths de tes passions :</span>
      {passions.map((p) => {
        const l = libellePassion(p);
        return (
          <span key={p} className="rounded-full bg-amber-100 px-2 py-0.5">
            {l.emoji} {l.nom}
          </span>
        );
      })}
      <span className="ml-auto text-amber-700">Voir les vidéos →</span>
    </Link>
  );
}
