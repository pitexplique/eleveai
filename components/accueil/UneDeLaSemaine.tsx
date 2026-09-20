"use client";

// LA BANDE « UNE DE LA SEMAINE » — le short, sa feuille, ses séries.
//
// Frédéric, 20/09/2026 : « sur la page d'accueil tu mettrais le short avec la
// feuille d'exercices et les séries du short », et « comme un slide » pour le
// lycée, le collège et le primaire. La donnée et ses règles sont dans
// lib/accueil/une.ts — ce fichier ne fait que l'afficher.
//
// ── CE QUE LA BANDE NE FAIT PAS ──────────────────────────────────────────────
//   — aucune requête : la Une est dans le paquet, les vignettes sont à nous ;
//   — aucun lecteur YouTube : la vignette EST le bouton, le clic ouvre le short ;
//   — aucun défilement automatique : une bande qui bouge seule vole le regard
//     au champ de saisie, qui reste le travail de cet écran, et elle piège qui
//     lit lentement. C'est le doigt qui tourne la page.
//
// ── LE DÉFILEMENT ────────────────────────────────────────────────────────────
// `scroll-snap` en CSS, pas de bibliothèque : le glissé du doigt, la molette et
// le clavier sont ceux du navigateur. Les onglets ne font que `scrollTo`, et
// l'onglet allumé se relit dans `onScroll` — une seule source de vérité, la
// position de la bande.
//
// ⭐ LA DIAPOSITIVE DU VISITEUR PASSE DEVANT. La matrice retient le profil
// choisi (`eleveai.ia.profil`, voir EntreeMatrice.tsx) et profils.ts range
// chaque classe dans un cycle : un élève de 5e qui revient trouve le collège,
// pas le lycée. ⚠️ On DÉPLACE la bande, on ne RETRIE pas les diapositives :
// l'ordre du HTML reste celui du fichier, donc le rendu serveur et le premier
// rendu du navigateur sont identiques (aucune erreur d'hydratation), et le
// déplacement se fait sans animation, avant que l'œil ait lu la première.

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { FileText, ListChecks, Play, Printer } from "lucide-react";
import { PROFILS } from "@/lib/matrice/profils";
import type { GenreLienUne, Une } from "@/lib/accueil/une";

/** La même clé que components/matrice/EntreeMatrice.tsx (`CLE_PROFIL`). Recopiée
 *  et non importée : ce composant-là est fermé aux modifications, et n'exporte
 *  pas sa clé. Si elle change là-bas, la bande s'ouvre simplement sur la
 *  première diapositive — rien ne casse. */
const CLE_PROFIL = "eleveai.ia.profil";

const ICONES: Record<GenreLienUne, typeof Printer> = {
  feuille: Printer,
  fiche: FileText,
  series: ListChecks,
};

export default function UneDeLaSemaine({ une }: { une: Une }) {
  const bande = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let cycle: string | undefined;
    try {
      const id = localStorage.getItem(CLE_PROFIL);
      cycle = PROFILS.find((p) => p.id === id)?.cycle;
    } catch {
      /* stockage fermé (navigation privée) : on reste sur la première */
    }
    const i = une.diapos.findIndex((d) => d.cycle === cycle);
    const el = bande.current;
    if (i > 0 && el) {
      el.scrollTo({ left: i * el.clientWidth, behavior: "instant" });
      setActive(i);
    }
  }, [une]);

  function allerA(i: number) {
    const el = bande.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  }

  function relireActive() {
    const el = bande.current;
    if (!el || el.clientWidth === 0) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  }

  const plusieurs = une.diapos.length > 1;

  return (
    <section
      aria-label="La Une de la semaine"
      className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50/60"
    >
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-4 pt-3">
        {/* ⭐ LA BANDE EST SIGNÉE (Frédéric, 20/09/2026 : « sur les vidéos on met ma
            figure, pourrait-on faire pareil… pour humaniser ? », puis « ma figure
            avec Ti Margo »). La même photo et la même formule que ses vignettes
            YouTube — « Frédéric, ton prof » (`sig` dans manim/miniature_short.py) :
            le site, la chaîne et Instagram signent pareil.
            ⚠️ ICI ET PAS DANS L'EN-TÊTE, où il l'avait d'abord imaginée : l'en-tête
            s'affiche sur toutes les pages — y compris celles où un parent arrive
            de Google pour imprimer un sujet — et à 375 px il est déjà plein (le
            nom du site y est coupé). Un visage a sa place là où quelqu'un PARLE,
            et l'accroche de la bande est sa phrase d'ouverture de cours.
            ⚠️ Ça lève, sur sa demande, la règle du 24/08 (« enlève sur la page
            d'accueil Frédéric Lacoste enseignant ») : ce n'est pas le badge qui
            revient, ni le mot « enseignant » — c'est le visage, et « ton prof ».
            Ti Margo est décoratif (`alt=""`) ; la photo porte le nom.
            ⚠️ SUR TÉLÉPHONE : LA PHOTO ET TI MARGO, SANS LE NOM. Mesuré le 20/09 en
            375 px : avec « Frédéric » écrit à côté, la rangée se repliait sur deux
            lignes et la bande passait de 197 à 229 px (les trois onglets font
            ~215 px, pas 190 comme je l'avais estimé). Et beaucoup de téléphones
            font 360 px, pas 375 : on ne règle pas une rangée au pixel près —
            les trois boutons, eux, se repliaient à 360 et ont été resserrés le
            même soir. Le nom reste dit aux lecteurs d'écran (`alt`), et
            s'écrit dès `sm`. */}
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex shrink-0 items-end">
            <Image
              src="/images/avatar-frederic-visage.webp"
              alt="Frédéric Lacoste"
              width={240}
              height={240}
              sizes="28px"
              className="h-7 w-7 rounded-full border border-white object-cover shadow-sm"
            />
            <Image
              src="/cahier-vacances/ti-margo-112.webp"
              alt=""
              width={90}
              height={112}
              sizes="23px"
              className="-ml-1.5 h-7 w-auto"
            />
          </span>
          <p className="hidden truncate text-xs font-semibold text-emerald-800 sm:block">
            Frédéric, ton prof · {une.semaine}
          </p>
        </div>
        {plusieurs && (
          <div className="flex gap-1" role="group" aria-label="Choisir le niveau">
            {une.diapos.map((d, i) => (
              <button
                key={d.cycle}
                type="button"
                onClick={() => allerA(i)}
                aria-pressed={i === active}
                className={
                  i === active
                    ? "rounded-full bg-emerald-700 px-3 py-1 text-xs font-semibold text-white"
                    : "rounded-full px-3 py-1 text-xs font-medium text-emerald-900 hover:bg-emerald-100"
                }
              >
                {d.onglet}
              </button>
            ))}
          </div>
        )}
      </div>

      <div
        ref={bande}
        onScroll={relireActive}
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {une.diapos.map((d) => (
          // ⚠️ UNE GRILLE, ET NON UN `flex` : sur téléphone les boutons passent SOUS
          // la vignette, sur toute la largeur (une seule ligne) ; à partir de
          // `sm` ils remontent à droite d'elle. Mesuré le 20/09 en 375 px : en
          // `flex`, la colonne de texte ne faisait que 220 px, l'accroche tenait
          // en cinq lignes, les trois boutons s'empilaient — 304 px de bande, et
          // le champ de saisie tombait de 241 à 448 px.
          <article
            key={d.cycle}
            className="grid w-full shrink-0 snap-center grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-2.5 px-4 pb-3.5 pt-2 sm:gap-x-4 sm:pb-4"
          >
            <a
              href={`https://www.youtube.com/shorts/${d.short.id}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("une_clic", { cible: "short", cycle: d.cycle })}
              aria-label={`Voir le short : ${d.short.titre}`}
              className="group relative block shrink-0 overflow-hidden rounded-xl border border-emerald-200 bg-white sm:row-span-2"
            >
              <Image
                src={d.short.vignette}
                alt=""
                width={216}
                height={384}
                sizes="72px"
                className="h-24 w-[3.375rem] object-cover sm:h-32 sm:w-[4.5rem]"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 bg-slate-900/80 py-1 text-[11px] font-semibold text-white group-hover:bg-emerald-700">
                <Play className="h-3 w-3" aria-hidden="true" />
                1 min
              </span>
            </a>

            <div className="min-w-0 text-left sm:self-end">
              <p className="text-[15px] font-semibold leading-snug text-slate-900 sm:text-lg">
                {d.accroche}
              </p>
              <p className="mt-1 text-xs text-slate-600">{d.notion}</p>
            </div>

            <ul className="col-span-2 flex flex-wrap gap-1 sm:col-span-1 sm:col-start-2 sm:gap-2 sm:self-start">
              {d.liens.map((l) => {
                const Icone = ICONES[l.genre];
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      prefetch={false}
                      onClick={() => track("une_clic", { cible: l.genre, cycle: d.cycle })}
                      className="inline-flex items-center gap-1 rounded-full border border-emerald-300 bg-white px-2 py-1.5 text-xs sm:gap-1.5 sm:px-3 font-semibold text-emerald-900 hover:border-emerald-500 hover:bg-emerald-50"
                    >
                      <Icone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span className="sm:hidden">{l.court}</span>
                      <span className="hidden sm:inline">{l.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
