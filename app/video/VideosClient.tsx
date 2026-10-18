"use client";

// La liste des vidéos R2 : sélecteur de classe en haut + recherche dans les
// titres (sans tenir compte des accents ni des majuscules). La classe choisie
// reste dans l'adresse (?classe=4e) pour qu'on puisse partager le lien.
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";

export type VideoListe = {
  id: string;
  titre: string;
  classe: string;
  rubrique: string;
  short: boolean;
  publiee: boolean;
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
        className={[
          "w-full rounded-2xl bg-black shadow-lg",
          short ? "aspect-[9/16]" : "aspect-video",
        ].join(" ")}
      />
      <figcaption className="mt-2">
        <Link href={`/video/${v.id}`} className="text-sm font-bold leading-5 text-slate-800 hover:text-rose-700">
          {v.titre}
        </Link>
      </figcaption>
    </figure>
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
    const c = new URLSearchParams(window.location.search).get("classe");
    if (c) setClasse(c);
  }, []);
  const choisir = (c: string) => {
    setClasse(c);
    const url = new URL(window.location.href);
    if (c) url.searchParams.set("classe", c);
    else url.searchParams.delete("classe");
    window.history.replaceState(null, "", url);
  };

  // Seules les classes qui ont des vidéos ; les dossiers de travail
  // (essais, annonces) restent hors du sélecteur.
  const classes = useMemo(() => {
    const compte = new Map<string, number>();
    for (const v of videos) compte.set(v.classe, (compte.get(v.classe) ?? 0) + 1);
    return [...compte.keys()]
      .filter((c) => RANG.has(c))
      .sort((a, b) => RANG.get(a)! - RANG.get(b)!)
      .map((c) => ({ c, n: compte.get(c)! }));
  }, [videos]);

  const filtrees = useMemo(() => {
    const mots = sansAccents(recherche).split(/\s+/).filter(Boolean);
    return videos.filter((v) => {
      if (classe && v.classe !== classe) return false;
      if (!classe && !RANG.has(v.classe)) return false;
      if (!mots.length) return true;
      const texte = sansAccents(`${v.titre} ${v.id} ${v.rubrique}`);
      return mots.every((m) => texte.includes(m));
    });
  }, [videos, classe, recherche]);

  const groupes = useMemo(() => {
    const g = new Map<string, VideoListe[]>();
    for (const v of filtrees) {
      const cle = `${v.classe}|${v.rubrique}`;
      g.set(cle, [...(g.get(cle) ?? []), v]);
    }
    return [...g.entries()].sort(([a], [b]) => {
      const [ca, ra] = a.split("|");
      const [cb, rb] = b.split("|");
      return (RANG.get(ca) ?? 99) - (RANG.get(cb) ?? 99) || ra.localeCompare(rb, "fr");
    });
  }, [filtrees]);

  const pastille = (actif: boolean) =>
    [
      "shrink-0 rounded-full border px-3 py-1.5 text-sm font-bold transition",
      actif
        ? "border-rose-500 bg-rose-500 text-white"
        : "border-slate-200 bg-white text-slate-700 hover:border-rose-300 hover:text-rose-700",
    ].join(" ");

  return (
    <>
      {/* top-16 : sous l'en-tête du site, collant lui aussi (~62 px). */}
      <div className="sticky top-16 z-10 -mx-4 mt-4 bg-[#f5f8ff]/95 px-4 pb-3 pt-2 backdrop-blur">
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button type="button" onClick={() => choisir("")} className={pastille(!classe)}>
            Toutes
          </button>
          {classes.map(({ c }) => (
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

      {/* À la une : seulement sur « Toutes » sans recherche — dès qu'on
          cherche, la liste remonte en haut. */}
      {!classe && !recherche && (paysage || short) ? (
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

      {groupes.length === 0 ? (
        <p className="mt-8 text-center text-slate-500">Aucune vidéo ne correspond.</p>
      ) : null}

      {groupes.map(([cle, liste]) => {
        const [c, rubrique] = cle.split("|");
        return (
          <section key={cle} className="mt-6">
            <h2 className="text-lg font-black text-slate-800">
              {libelleClasse(c)} · {rubrique}{" "}
              <span className="text-sm font-bold text-slate-400">({liste.length})</span>
            </h2>
            <ul className="mt-2 grid gap-1 sm:grid-cols-2">
              {liste.map((v) => (
                <li key={v.id}>
                  <Link
                    href={`/video/${v.id}`}
                    className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-slate-700 transition hover:bg-rose-50 hover:text-rose-700"
                  >
                    <span
                      aria-hidden="true"
                      className={
                        v.short
                          ? "h-4 w-2.5 shrink-0 rounded-[3px] border-2 border-rose-300"
                          : "h-2.5 w-4 shrink-0 rounded-[3px] border-2 border-rose-300"
                      }
                    />
                    <span className="truncate">{v.titre}</span>
                    {v.publiee ? null : (
                      <span className="shrink-0 rounded-full bg-amber-100 px-1.5 text-[10px] font-bold text-amber-700">
                        pas sur YouTube
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </>
  );
}
