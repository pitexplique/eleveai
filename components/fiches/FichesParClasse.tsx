"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Download, FileText, PencilLine } from "lucide-react";
import { TEINTES } from "@/components/accueil/matieres";

/* ═══ LES CLASSES À GAUCHE, LES FICHES À DROITE (27/09/2026) ════════════════
   Frédéric : « sur la fiche d'exercices et fiches cours il faut comme dans
   accueil les classes sélectionnables à gauche ». Même pastille colorée que
   les cartes de niveau de l'accueil (`CarteNiveau`), mêmes teintes, dans le
   même ordre : on reconnaît la classe à sa couleur d'une page à l'autre.

   ⭐ TOUTES LES CLASSES SONT DANS LE HTML, celles qu'on ne montre pas sont
   seulement masquées (`hidden`). Ces deux pages sont des portes d'entrée
   Google : ne rendre que la classe choisie retirerait du HTML les liens vers
   toutes les autres fiches.

   ⚠️ La classe choisie s'écrit dans l'URL (`?classe=4e`) : un prof qui envoie
   le lien à sa classe l'envoie ouvert sur le bon niveau. */

export type GroupeFiches = {
  /** Identifiant stable, celui de l'URL (`?classe=`). */
  cle: string;
  /** Ce qu'on lit dans la pastille : « 5e », « 1re spé »… */
  label: string;
  /** Une précision sous le compte (« Maths » quand plusieurs matières). */
  sous?: string;
  fiches: { href: string; titre: string; resume?: string }[];
};

const ACCENTS = {
  cours: {
    Icone: FileText,
    carte: "hover:border-emerald-300 hover:shadow-emerald-200/40",
    icone: "text-emerald-500",
    lien: "text-emerald-600",
  },
  exercices: {
    Icone: PencilLine,
    carte: "hover:border-amber-300 hover:shadow-amber-200/40",
    icone: "text-amber-500",
    lien: "text-amber-700",
  },
} as const;

export default function FichesParClasse({
  groupes,
  sorte,
}: {
  groupes: GroupeFiches[];
  sorte: keyof typeof ACCENTS;
}) {
  const [choisie, setChoisie] = useState(groupes[0]?.cle);
  const accent = ACCENTS[sorte];

  // Lu APRÈS le premier rendu : la page est statique, le serveur ne voit pas
  // la requête. Un `useSearchParams` la rendrait dynamique pour rien.
  useEffect(() => {
    const demandee = new URLSearchParams(window.location.search).get("classe");
    if (demandee && groupes.some((g) => g.cle === demandee)) setChoisie(demandee);
  }, [groupes]);

  // Sur téléphone la rangée défile : la pastille choisie doit être DANS le
  // champ, sinon un lien `?classe=6e` ouvre la 6e sans qu'on voie pourquoi.
  // ⚠️ `scrollLeft` et pas `scrollIntoView` : ce dernier fait aussi défiler
  // la page verticalement, et l'élève atterrirait au milieu de l'écran.
  const rangee = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const ul = rangee.current;
    const bouton = ul?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!ul || !bouton || ul.scrollWidth <= ul.clientWidth) return;
    ul.scrollLeft = bouton.offsetLeft - ul.offsetLeft - 20;
  }, [choisie]);

  function choisir(cle: string) {
    setChoisie(cle);
    const url = new URL(window.location.href);
    url.searchParams.set("classe", cle);
    window.history.replaceState(null, "", url);
  }

  const pluriel = (n: number) => `${n} fiche${n > 1 ? "s" : ""}`;

  return (
    <div className="lg:grid lg:grid-cols-[13rem_1fr] lg:gap-8">
      {/* Sous 1 024 px la colonne devient une rangée qui défile : sur un
          téléphone, une colonne de 13 rem laisserait 150 px aux fiches. */}
      <nav aria-label="Classes" className="mb-6 lg:mb-0">
        <ul ref={rangee} className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 pt-1 sm:-mx-8 sm:px-8 lg:sticky lg:top-20 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
          {groupes.map((g, i) => {
            const teinte = TEINTES[i % TEINTES.length];
            const ouverte = g.cle === choisie;
            return (
              <li key={g.cle} className="shrink-0">
                <button
                  type="button"
                  onClick={() => choisir(g.cle)}
                  aria-current={ouverte ? "true" : undefined}
                  className={[
                    "flex w-full items-stretch overflow-hidden rounded-xl border text-left shadow-sm transition",
                    ouverte
                      ? `${teinte.bord} ${teinte.clair} ring-2 ring-slate-800/70 ring-offset-1`
                      : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md",
                  ].join(" ")}
                >
                  <span
                    className={`flex w-14 shrink-0 items-center justify-center px-1 py-2.5 text-center text-sm font-black leading-tight text-white ${teinte.chip}`}
                  >
                    {g.label}
                  </span>
                  <span
                    className={`flex flex-col justify-center whitespace-nowrap px-3 py-1.5 text-sm font-bold ${ouverte ? teinte.texte : "text-slate-600"}`}
                  >
                    {pluriel(g.fiches.length)}
                    {g.sous && <span className="text-xs font-medium text-slate-400">{g.sous}</span>}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="min-w-0">
        {groupes.map((g) => (
          <section key={g.cle} hidden={g.cle !== choisie}>
            <h2 className="mb-4 flex items-baseline gap-2 text-2xl font-black text-slate-900">
              {g.label}
              <span className="text-base font-bold text-slate-400">
                {pluriel(g.fiches.length)}
                {g.sous && ` · ${g.sous}`}
              </span>
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {g.fiches.map((f) => (
                <Link
                  key={f.href}
                  href={f.href}
                  className={`group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg ${accent.carte}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black text-slate-900">{f.titre}</h3>
                      {f.resume ? (
                        <p className="mt-2 text-sm leading-6 text-slate-600">{f.resume}</p>
                      ) : null}
                    </div>
                    <accent.Icone className={`mt-1 h-6 w-6 shrink-0 ${accent.icone}`} />
                  </div>
                  <div className={`mt-5 inline-flex items-center gap-2 text-sm font-bold ${accent.lien}`}>
                    <Download className="h-4 w-4" />
                    Ouvrir la fiche
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
