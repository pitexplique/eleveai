"use client";

// « Mes passions » dans le tableau de bord de l'élève (30/10/2026, Frédéric :
// « ça doit apparaître dans leur dashboard »). Voir app/passions/page.tsx.
//
// 03/11/2026, Frédéric : « il devrait simplement appuyer sur les icônes pour
// les sélectionner avec bouton enregistrer ». Plus de détour par /passions :
// la grille est ici, on touche, l'icône s'allume, « Enregistrer ».

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useEleve } from "@/context/EleveContext";
import { chargerPassions, enregistrerPassions } from "@/lib/passions";
import { CENTRES_INTERET, EMOJI_CENTRE, MAX_PASSIONS } from "@/lib/videos/centres-interet";

const centreDe = (p: string) => p.split(":")[0];

export default function CartePassions() {
  const { eleve } = useEleve();
  const [enregistrees, setEnregistrees] = useState<string[] | undefined>(undefined);
  const [choix, setChoix] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    chargerPassions(eleve).then((p) => {
      setEnregistrees(p ?? []);
      setChoix(p ?? []);
    });
  }, [eleve]);

  const modifie = useMemo(
    () => JSON.stringify([...choix].sort()) !== JSON.stringify([...(enregistrees ?? [])].sort()),
    [choix, enregistrees]
  );

  if (enregistrees === undefined) return null;

  const plein = choix.length >= MAX_PASSIONS;

  function basculer(centre: string) {
    setMessage("");
    if (choix.some((p) => centreDe(p) === centre)) setChoix(choix.filter((p) => centreDe(p) !== centre));
    else if (!plein) setChoix([...choix, centre]);
    else setMessage(`${MAX_PASSIONS} au plus : touche une passion allumée pour l'enlever.`);
  }

  async function enregistrer() {
    await enregistrerPassions(eleve, choix);
    setEnregistrees(choix);
    setMessage("✅ Enregistré !");
  }

  return (
    <div className="mt-6 rounded-[2rem] border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-6 shadow-xl">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-xl font-black text-slate-900">⭐ Mes passions</h2>
        <span className="text-sm font-semibold text-slate-500">
          Touche jusqu&apos;à {MAX_PASSIONS} icônes ({choix.length} / {MAX_PASSIONS})
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
        {CENTRES_INTERET.map((c) => {
          const actif = choix.some((p) => centreDe(p) === c.id);
          return (
            <button
              key={c.id}
              onClick={() => basculer(c.id)}
              aria-pressed={actif}
              className={`flex flex-col items-center justify-center gap-1 rounded-2xl border-2 p-2 text-center transition ${
                actif
                  ? "border-amber-500 bg-amber-100 shadow ring-4 ring-amber-300"
                  : `border-slate-200 bg-white hover:border-amber-300 ${plein ? "opacity-40" : ""}`
              }`}
            >
              <span className="text-4xl leading-none">{EMOJI_CENTRE[c.id]}</span>
              <span className="text-xs font-black text-slate-800">{c.nom}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          onClick={enregistrer}
          disabled={!modifie}
          className="rounded-2xl bg-emerald-500 px-6 py-3 text-lg font-black text-white shadow hover:bg-emerald-600 disabled:opacity-40"
        >
          💾 Enregistrer
        </button>
        {message && <span className="font-bold text-slate-700">{message}</span>}
        {enregistrees.length > 0 && !modifie && (
          <Link
            href="/passions"
            className="ml-auto rounded-full bg-amber-500 px-5 py-3 text-sm font-black text-white shadow hover:bg-amber-600"
          >
            🎬 Les maths de mes passions
          </Link>
        )}
      </div>
    </div>
  );
}
