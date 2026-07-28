"use client";

// Le filtre par matière du hub des guides de survie : une rangée de CHIPS qui
// défile horizontalement (mobile) et centre (desktop). « Tout » par défaut →
// tout le contenu est rendu côté serveur au premier chargement (SEO intact) ;
// le filtre ne fait que RESTREINDRE l'affichage ensuite, jamais retirer du DOM
// initial. Un clic = une matière ; « Tout » ramène les trois.

import { useState } from "react";
import Link from "next/link";

export type Kit = {
  slug: string;
  emoji: string;
  titre: string;
  niveau: string;
  pitch: string;
  grad: string;
};

type Matiere = "tout" | "maths" | "francais" | "anglais";

const CHIPS: { id: Matiere; label: string; emoji: string; actif: string }[] = [
  { id: "tout", label: "Tout", emoji: "🎒", actif: "bg-slate-900 text-white border-slate-900" },
  { id: "maths", label: "Maths", emoji: "🔢", actif: "bg-teal-600 text-white border-teal-600" },
  { id: "francais", label: "Français", emoji: "📖", actif: "bg-violet-600 text-white border-violet-600" },
  { id: "anglais", label: "Anglais", emoji: "🔤", actif: "bg-sky-600 text-white border-sky-600" },
];

function CartesKits({ kits }: { kits: Kit[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {kits.map((k) => (
        <Link
          key={k.slug}
          href={`/guide-de-survie/${k.slug}`}
          className={`group rounded-2xl bg-gradient-to-br ${k.grad} p-5 text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-xl`}
        >
          <p className="mb-1 text-3xl transition group-hover:scale-110">{k.emoji}</p>
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/80">{k.niveau}</p>
          <h2 className="mb-1 text-xl font-black leading-tight">{k.titre}</h2>
          <p className="text-[13px] leading-snug text-white/90">{k.pitch}</p>
          <p className="mt-3 text-[13px] font-bold underline underline-offset-2">Ouvrir le guide →</p>
        </Link>
      ))}
    </div>
  );
}

export default function HubFiltres({
  maths,
  francais,
  anglais,
}: {
  maths: Kit[];
  francais: Kit[];
  anglais: Kit[];
}) {
  const [filtre, setFiltre] = useState<Matiere>("tout");
  const voir = (m: Matiere) => filtre === "tout" || filtre === m;

  return (
    <>
      {/* ─── Les chips : choisir la matière (défilent en X sur mobile) ─── */}
      <div
        className="mb-8 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:justify-center"
        role="tablist"
        aria-label="Filtrer par matière"
      >
        {CHIPS.map((c) => {
          const on = filtre === c.id;
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setFiltre(c.id)}
              className={`shrink-0 whitespace-nowrap rounded-full border-2 px-4 py-1.5 text-sm font-bold transition ${
                on ? c.actif : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span aria-hidden="true">{c.emoji}</span> {c.label}
            </button>
          );
        })}
      </div>

      {/* ─── Maths ─── */}
      {voir("maths") && (
        <section className="mb-10">
          <h2 className="mb-3 flex items-center gap-2 text-2xl font-black text-slate-900">
            <span aria-hidden="true">🔢</span> Maths
            <span className="text-sm font-semibold text-slate-400">— du CM1 au lycée</span>
          </h2>
          <CartesKits kits={maths} />
        </section>
      )}

      {/* ─── Français ─── */}
      {voir("francais") && (
        <section className="mb-10">
          <h2 className="mb-3 flex items-center gap-2 text-2xl font-black text-slate-900">
            <span aria-hidden="true">📖</span> Français
            <span className="text-sm font-semibold text-slate-400">— du CM1 à la 3e</span>
          </h2>
          <CartesKits kits={francais} />
        </section>
      )}

      {/* ─── Anglais ─── */}
      {voir("anglais") && (
        <section className="mb-10">
          <h2 className="mb-3 flex items-center gap-2 text-2xl font-black text-slate-900">
            <span aria-hidden="true">🔤</span> Anglais
            <span className="text-sm font-semibold text-slate-400">— le vocabulaire, de A1 à B2</span>
            <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-widest text-sky-700">
              Nouveau
            </span>
          </h2>
          <CartesKits kits={anglais} />
        </section>
      )}
    </>
  );
}
