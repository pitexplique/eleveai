"use client";

// La galerie des vidéos R2. Sélecteur de classe + recherche en haut (sans
// tenir compte des accents ni des majuscules) ; la classe reste dans l'adresse
// (?classe=4e) pour qu'on puisse partager le lien.
//   · « Toutes », sans recherche : FAÇON NETFLIX — À la une, puis une rangée
//     par classe qui défile de côté.
//   · Une classe ou une recherche : FAÇON YOUTUBE — une grille de paysages,
//     puis une étagère de shorts verticaux.
// Les vignettes (~11 Ko) sont faites par scripts/vignettes-videos.py.
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";

export type VideoListe = {
  id: string;
  titre: string;
  classe: string;
  short: boolean;
  publiee: boolean;
  vignette: string | null;
};

export type VideoUne = { id: string; titre: string; src: string; poster: string | null };

// Dossier de manim/sorties → libellé, dans l'ordre de la scolarité.
const CLASSES: [string, string][] = [
  ["cp", "CP"], ["ce1", "CE1"], ["ce2", "CE2"], ["cm1", "CM1"], ["cm2", "CM2"],
  ["6e", "6e"], ["5e", "5e"], ["4e", "4e"], ["3e", "3e"],
  ["seconde", "2de"], ["premiere", "1re spé"], ["premiere-commun", "1re commun"],
  ["stmg", "STMG"], ["terminale", "Tle"],
  ["bases", "Les bases"], ["974", "974"], ["maths-en-vrai", "Maths en vrai"], ["actu", "Actu"],
];
const LIBELLE = new Map(CLASSES);
const RANG = new Map(CLASSES.map(([k], i) => [k, i]));
const libelleClasse = (c: string) => LIBELLE.get(c) ?? c;

const sansAccents = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
// Paysages d'abord, puis shorts ; à l'intérieur, l'ordre des ids (les épisodes se suivent).
const ordre = (a: VideoListe, b: VideoListe) => Number(a.short) - Number(b.short) || a.id.localeCompare(b.id, "fr");

// ⛔ En pause (preload="metadata", jamais autoPlay) : il appuie lui-même.
function LecteurUne({ v, short }: { v: VideoUne; short?: boolean }) {
  return (
    <figure className="min-w-0">
      <video
        src={v.src}
        poster={v.poster ?? undefined}
        controls
        playsInline
        preload="metadata"
        className={["w-full rounded-2xl bg-black shadow-lg", short ? "aspect-[9/16]" : "aspect-video"].join(" ")}
      />
      <figcaption className="mt-2">
        <Link href={`/video/${v.id}`} className="text-sm font-bold leading-5 text-slate-800 hover:text-rose-700">
          {v.titre}
        </Link>
      </figcaption>
    </figure>
  );
}

// Une carte : la vignette, puis le titre sur deux lignes. `rangee` = taille
// fixe pour défiler de côté ; sinon la carte prend la largeur de sa colonne.
function Carte({ v, rangee }: { v: VideoListe; rangee?: boolean }) {
  const largeur = rangee ? (v.short ? "w-28 shrink-0 snap-start" : "w-64 shrink-0 snap-start") : "";
  return (
    <Link href={`/video/${v.id}`} className={`group block min-w-0 ${largeur}`} title={v.titre}>
      <div
        className={[
          "relative overflow-hidden rounded-xl bg-slate-200 shadow-sm ring-1 ring-slate-200 transition group-hover:shadow-lg group-hover:ring-rose-300",
          v.short ? "aspect-[9/16]" : "aspect-video",
        ].join(" ")}
      >
        {v.vignette ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={v.vignette}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : null}
        {v.publiee ? null : (
          // En bas à droite : en haut à gauche, il cachait le « EN 2 MIN » des miniatures.
          <span className="absolute bottom-1.5 right-1.5 rounded-full bg-amber-400/95 px-1.5 text-[10px] font-black text-amber-950">
            nouveau
          </span>
        )}
      </div>
      <p className="mt-1.5 line-clamp-2 text-[13px] font-bold leading-[18px] text-slate-800 group-hover:text-rose-700">
        {v.titre}
      </p>
    </Link>
  );
}

export default function VideosClient({
  videos,
  paysage,
  short,
}: {
  videos: VideoListe[];
  paysage: VideoUne | null;
  short: VideoUne | null;
}) {
  const [classe, setClasse] = useState<string>("");
  const [recherche, setRecherche] = useState("");

  // Lecture puis écriture de ?classe= sans recharger la page.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const c = p.get("classe");
    if (c) setClasse(c);
    // ?q= : posé par la recherche de l'en-tête (« vidéo pythagore », 19/10).
    const q = p.get("q");
    if (q) setRecherche(q);
  }, []);
  const choisir = (c: string) => {
    setClasse(c);
    const url = new URL(window.location.href);
    if (c) url.searchParams.set("classe", c);
    else url.searchParams.delete("classe");
    window.history.replaceState(null, "", url);
    window.scrollTo({ top: 0 });
  };

  // Seules les classes qui ont des vidéos ; les dossiers de travail
  // (essais, annonces) restent hors du sélecteur.
  const classes = useMemo(() => {
    const presentes = new Set(videos.map((v) => v.classe));
    return CLASSES.map(([c]) => c).filter((c) => presentes.has(c));
  }, [videos]);

  const filtrees = useMemo(() => {
    const mots = sansAccents(recherche).split(/\s+/).filter(Boolean);
    return videos
      .filter((v) => {
        if (classe ? v.classe !== classe : !RANG.has(v.classe)) return false;
        if (!mots.length) return true;
        const texte = sansAccents(`${v.titre} ${v.id} ${libelleClasse(v.classe)}`);
        return mots.every((m) => texte.includes(m));
      })
      .sort(ordre);
  }, [videos, classe, recherche]);

  const facon = !classe && !recherche ? "netflix" : "youtube";

  const rangees = useMemo(() => {
    if (facon !== "netflix") return [];
    return classes
      .map((c) => ({ c, liste: filtrees.filter((v) => v.classe === c) }))
      .filter((r) => r.liste.length);
  }, [facon, classes, filtrees]);

  const pastille = (actif: boolean) =>
    [
      "shrink-0 rounded-full border px-3 py-1.5 text-sm font-bold transition",
      actif
        ? "border-rose-500 bg-rose-500 text-white"
        : "border-slate-200 bg-white text-slate-700 hover:border-rose-300 hover:text-rose-700",
    ].join(" ");

  const paysages = filtrees.filter((v) => !v.short);
  const shorts = filtrees.filter((v) => v.short);

  return (
    <>
      {/* top-16 : sous l'en-tête du site, collant lui aussi (~62 px). */}
      <div className="sticky top-16 z-10 -mx-4 mt-4 bg-[#f5f8ff]/95 px-4 pb-3 pt-2 backdrop-blur">
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button type="button" onClick={() => choisir("")} className={pastille(!classe)}>
            Toutes
          </button>
          {classes.map((c) => (
            <button key={c} type="button" onClick={() => choisir(c)} className={pastille(classe === c)}>
              {libelleClasse(c)}
            </button>
          ))}
        </div>

        <label className="relative mt-2 block">
          <span className="sr-only">Rechercher une vidéo</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Rechercher : Pythagore, fractions, probabilités…"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-9 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
          />
          {recherche ? (
            <button
              type="button"
              onClick={() => setRecherche("")}
              aria-label="Effacer la recherche"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:text-slate-700"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </label>
      </div>

      {facon === "netflix" ? (
        <>
          {paysage || short ? (
            <section className="mt-4">
              <h2 className="text-lg font-black text-slate-800">À la une</h2>
              <div className="mt-2 grid items-start gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,14rem)]">
                {paysage ? <LecteurUne v={paysage} /> : null}
                {short ? (
                  <div className="mx-auto w-full max-w-[14rem]">
                    <LecteurUne v={short} short />
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {rangees.map(({ c, liste }) => (
            <section key={c} className="mt-8">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-lg font-black text-slate-800">
                  {libelleClasse(c)} <span className="text-sm font-bold text-slate-400">({liste.length})</span>
                </h2>
                <button
                  type="button"
                  onClick={() => choisir(c)}
                  className="text-sm font-bold text-rose-600 hover:text-rose-500"
                >
                  Tout voir →
                </button>
              </div>
              {/* items-start : les shorts, plus hauts, ne tirent pas les paysages. */}
              <div className="-mx-4 mt-2 flex snap-x items-start gap-3 overflow-x-auto scroll-px-4 px-4 pb-2">
                {liste.map((v) => (
                  <Carte key={v.id} v={v} rangee />
                ))}
              </div>
            </section>
          ))}
        </>
      ) : (
        <>
          {filtrees.length === 0 ? (
            <p className="mt-8 text-center text-slate-500">Aucune vidéo ne correspond.</p>
          ) : null}

          {paysages.length ? (
            <section className="mt-4">
              <h2 className="text-lg font-black text-slate-800">
                Vidéos <span className="text-sm font-bold text-slate-400">({paysages.length})</span>
              </h2>
              <div className="mt-2 grid grid-cols-1 gap-x-4 gap-y-5 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {paysages.map((v) => (
                  <Carte key={v.id} v={v} />
                ))}
              </div>
            </section>
          ) : null}

          {shorts.length ? (
            <section className="mt-8">
              <h2 className="text-lg font-black text-slate-800">
                Shorts <span className="text-sm font-bold text-slate-400">({shorts.length})</span>
              </h2>
              <div className="mt-2 grid grid-cols-3 gap-x-3 gap-y-5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                {shorts.map((v) => (
                  <Carte key={v.id} v={v} />
                ))}
              </div>
            </section>
          ) : null}
        </>
      )}
    </>
  );
}
