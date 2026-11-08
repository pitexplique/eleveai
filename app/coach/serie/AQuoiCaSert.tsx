"use client";

// « 💼 À quoi ça sert ? » — une pastille à côté du bouton vidéo de la micro
// (08/11/2026). Fermée, elle ne prend aucune ligne de plus ; ouverte, elle
// montre UN métier réel qui se sert de la notion (lib/matrice/metiers.ts),
// ceux des passions de l'élève d'abord, et « Un autre métier » fait défiler.
// Frédéric : « un des buts de l'apprentissage est d'évoquer des vocations ».

import { useEffect, useMemo, useState } from "react";
import { useEleve } from "@/context/EleveContext";
import { chargerPassions } from "@/lib/passions";
import { metiersDeLaNotion } from "@/lib/matrice/metiers";

export default function AQuoiCaSert({
  matiere,
  classe,
  notionId,
}: {
  matiere: string;
  classe: string;
  notionId: string | null | undefined;
}) {
  const { eleve } = useEleve();
  const [passions, setPassions] = useState<string[] | null>(null);
  const [ouvert, setOuvert] = useState(false);
  const [rang, setRang] = useState(0);

  useEffect(() => {
    chargerPassions(eleve).then(setPassions).catch(() => null);
  }, [eleve]);

  const metiers = useMemo(
    () => (matiere === "maths" && notionId ? metiersDeLaNotion(classe, notionId, { passions }) : []),
    [matiere, classe, notionId, passions],
  );

  // Nouvelle notion : on referme et on repart du premier métier.
  useEffect(() => {
    setOuvert(false);
    setRang(0);
  }, [notionId]);

  if (!metiers.length) return null;
  const m = metiers[rang % metiers.length];

  return (
    <>
      <button
        type="button"
        onClick={() => setOuvert((o) => !o)}
        aria-expanded={ouvert}
        className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-bold text-violet-800 hover:bg-violet-100"
      >
        💼 À quoi ça sert&nbsp;?
      </button>
      {ouvert ? (
        <div className="basis-full rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 text-left text-sm text-slate-800">
          <p className="font-semibold">{m.phrase}</p>
          <p className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span>Études : {m.etudes === "variable" ? "plusieurs chemins possibles" : m.etudes}</span>
            {metiers.length > 1 ? (
              <button
                type="button"
                onClick={() => setRang((r) => r + 1)}
                className="font-bold text-violet-700 hover:underline"
              >
                Un autre métier →
              </button>
            ) : null}
          </p>
        </div>
      ) : null}
    </>
  );
}
