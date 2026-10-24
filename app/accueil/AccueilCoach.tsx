"use client";

// L'ACCUEIL « LE COACH QUI SUIT TON PROGRAMME ET TES PROGRÈS » (23/10/2026) —
// voir page.tsx pour le pourquoi. Sept blocs, dans l'ordre de la maquette validée :
//   1. la promesse (le programme du pays, vérifié par un professeur) ;
//   2. qui es-tu (élève, parent, prof), ton pays, ta classe → le coach ;
//   3. les preuves (compteurs calculés) ;
//   4. « par où commencer ? » ;
//   5. la bibliothèque : les vidéos de ta classe, les maths dehors ;
//   6. le journal plié en trois cases (Une, défi, métier) ;
//   7. les portes des adultes (profs, parents, écoles et pays).
// ⛔ Aucune vidéo ne se lance ici : la vignette mène à /video/<id>, en pause.
// ⚠️ Le profil, le pays et la classe choisis sont gardés dans le navigateur
// (commodité, sans compte) : tout s'affiche correctement sans.

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import {
  ArrowRight,
  Backpack,
  Building2,
  Camera,
  Compass,
  Eye,
  Play,
  Projector,
  ShieldCheck,
  Users,
  GraduationCap,
} from "lucide-react";
import type { Metier } from "@/lib/accueil/journal";
import type { DefiGenere } from "@/lib/accueil/defis";
import { PAYS } from "@/lib/programmes-pays/pays";
import RechercheEntete from "@/components/accueil/RechercheEntete";

export type VideoVitrine = { id: string; titre: string; vignette: string };

type Profil = "eleve" | "parent" | "prof";
const CLE = "eleveai.accueil";

/* Les classes du coach France, dans l'ordre de l'accueil (lycée d'abord). */
const CYCLES = [
  { titre: "Lycée", classes: [["terminale-spe", "Term"], ["premiere-spe", "1re spé"], ["premiere", "1re"], ["seconde", "2de"], ["stmg", "STMG"]] },
  { titre: "Collège", classes: [["3e", "3e"], ["4e", "4e"], ["5e", "5e"], ["6e", "6e"]] },
  { titre: "Primaire", classes: [["cm2", "CM2"], ["cm1", "CM1"], ["ce2", "CE2"], ["ce1", "CE1"], ["cp", "CP"]] },
] as const;
const NOM_CLASSE = new Map<string, string>(CYCLES.flatMap((c) => c.classes.map(([id, l]) => [id, l] as [string, string])));

const PROFILS: { id: Profil; label: string; Icone: typeof Backpack }[] = [
  { id: "eleve", label: "Je suis élève", Icone: Backpack },
  { id: "parent", label: "Je suis parent", Icone: Users },
  { id: "prof", label: "Je suis prof", Icone: GraduationCap },
];

const ADULTES = [
  { titre: "Professeurs", texte: "Projeter le coach en classe, une feuille A4 par notion, avec la correction.", href: "/espace-profs", Icone: Projector },
  { titre: "Parents", texte: "Voir où en est votre enfant, notion par notion, sans faire à sa place.", href: "/parents", Icone: Eye },
  { titre: "Écoles et pays", texte: "Votre programme officiel, notre bibliothèque vérifiée. Exemple : le Québec.", href: "/pays/quebec", Icone: Building2 },
];

function Lien({ href, bloc, className, children, label }: { href: string; bloc: string; className?: string; children: ReactNode; label?: string }) {
  const sep = href.includes("?") ? "&" : "?";
  return (
    <Link
      prefetch={false}
      href={`${href}${sep}from=accueil`}
      aria-label={label}
      onClick={() => track("accueil_clic", { bloc })}
      className={className}
    >
      {children}
    </Link>
  );
}

function Vignette({ v, bloc }: { v: VideoVitrine; bloc: string }) {
  return (
    <Lien href={`/video/${v.id}`} bloc={bloc} className="group block" label={`Regarder : ${v.titre}`}>
      <span className="relative block aspect-video overflow-hidden rounded-xl bg-slate-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={v.vignette} alt="" loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg">
            <Play className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden="true" />
          </span>
        </span>
      </span>
      <span className="mt-1.5 line-clamp-2 block text-sm font-semibold leading-snug text-slate-800 group-hover:underline">{v.titre}</span>
    </Lien>
  );
}

function Rangee({ titre, lien, videos, bloc, id, sous }: { titre: string; lien: { href: string; label: string }; videos: VideoVitrine[]; bloc: string; id?: string; sous?: string }) {
  return (
    <section id={id} className="mt-8 scroll-mt-24">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h2 className="text-lg font-black text-slate-900">{titre}</h2>
        <Lien href={lien.href} bloc={bloc} className="shrink-0 text-sm font-bold text-teal-700 hover:underline">
          {lien.label} →
        </Lien>
      </div>
      {sous && <p className="-mt-2 mb-3 text-sm text-slate-600">{sous}</p>}
      {videos.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {videos.map((v) => (
            <Vignette key={v.id} v={v} bloc={bloc} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">Les vidéos de cette classe arrivent.</p>
      )}
    </section>
  );
}

function Defi({ defi }: { defi: DefiGenere }) {
  const [choisi, setChoisi] = useState<number | null>(null);
  return (
    <div>
      <p className="font-bold leading-snug text-slate-900">{defi.question}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {defi.choix.map((c, j) => {
          const etat =
            choisi === null
              ? "border-slate-300 bg-white hover:border-slate-900"
              : j === defi.bonne
                ? "border-green-600 bg-green-50 text-green-900"
                : j === choisi
                  ? "border-orange-500 bg-orange-50 text-orange-900"
                  : "border-slate-200 bg-white opacity-60";
          return (
            <button
              key={j}
              type="button"
              disabled={choisi !== null}
              onClick={() => {
                setChoisi(j);
                track("accueil_defi", { juste: j === defi.bonne });
              }}
              className={`rounded-lg border-2 px-3 py-1.5 text-sm font-bold transition ${etat}`}
            >
              {c}
            </button>
          );
        })}
      </div>
      {choisi !== null && (
        <p className={`mt-2 text-sm font-bold ${choisi === defi.bonne ? "text-green-700" : "text-orange-700"}`} aria-live="polite">
          {choisi === defi.bonne ? "Bravo !" : `C'est ${defi.choix[defi.bonne]}.`}{" "}
          <Lien href={`/coach-ia/maths?classe=${defi.coach}`} bloc="defi" className="text-teal-700 underline">
            Encore des questions
          </Lien>
        </p>
      )}
    </div>
  );
}

export default function AccueilNouveau(props: {
  totalVideos: number;
  parClasse: Record<string, VideoVitrine[]>;
  dehors: VideoVitrine[];
  une: (VideoVitrine & { classe: string }) | null;
  defi: DefiGenere;
  metier: Metier;
}) {
  const [profil, setProfil] = useState<Profil>("eleve");
  const [pays, setPays] = useState<string>("france");
  const [classe, setClasse] = useState<string>("4e");

  useEffect(() => {
    try {
      const lu = JSON.parse(localStorage.getItem(CLE) ?? "{}");
      if (lu.profil) setProfil(lu.profil);
      if (lu.pays) setPays(lu.pays);
      if (lu.classe && NOM_CLASSE.has(lu.classe)) setClasse(lu.classe);
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(CLE, JSON.stringify({ profil, pays, classe }));
    } catch {}
  }, [profil, pays, classe]);

  const nomClasse = NOM_CLASSE.get(classe) ?? classe;
  const autrePays = PAYS.find((p) => p.slug === pays);
  const appel =
    profil === "eleve"
      ? `Commencer avec le coach de ${nomClasse}`
      : profil === "parent"
        ? `Voir ce qu'on travaille en ${nomClasse}`
        : `Projeter le coach de ${nomClasse}`;
  const videosParCent = Math.floor(props.totalVideos / 100) * 100;

  return (
    /* ⛔ FOND BLANC EXPLICITE (Frédéric, 23/10 : « entre le fond noir avec le
       vert et le bleu, on voit rien du tout »). Sans fond posé, un navigateur en
       mode sombre peignait la page en noir sous un texte bleu nuit. */
    <div className="min-h-screen bg-white [color-scheme:light]">
      {/* ⛔ LA RECHERCHE DES TÉLÉPHONES (Frédéric, 23/10 : « tu as enlevé la barre
          de recherche, il faut la remettre »). Sous 640 px, l'en-tête masque la
          sienne (components/Header.tsx, `rechercheAuCentre`) : le Journal
          l'ajoutait lui-même, et elle était partie avec lui. */}
      <div className="border-b border-slate-200 bg-white px-3 py-2 sm:hidden">
        <RechercheEntete variante="page" />
      </div>
    <main className="mx-auto max-w-5xl px-4 pb-16 pt-6 text-slate-900">
      {/* 1. LA PROMESSE */}
      {/* ⭐ LE TITRE (Frédéric, 23/10 : « on l'avait appelé le Journal d'EleveAI, il
          faut le renommer, ça n'a plus rien à voir ; se concentrer sur ce que va
          faire le site et le suivi des élèves »). */}
      <section>
        <p className="mb-2 text-sm font-black uppercase tracking-wide text-teal-700">
          EleveAI · le coach qui suit ton programme et tes progrès
        </p>
        <h1 className="max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
          Toutes les maths de ton programme, expliquées en vidéo et vérifiées par un professeur
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-600">
          Du CP à la Terminale, dans ton pays. Le coach trouve ce qui te manque et te fait progresser, une notion à la fois.
        </p>
      </section>

      {/* 2. QUI ES-TU, TON PAYS, TA CLASSE */}
      <section aria-label="Commencer" className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {PROFILS.map(({ id, label, Icone }) => (
            <button
              key={id}
              type="button"
              aria-pressed={profil === id}
              onClick={() => setProfil(id)}
              className={`flex flex-col items-center gap-1 rounded-xl px-2 py-3 text-sm font-bold transition sm:flex-row sm:justify-center sm:gap-2 sm:text-base ${
                profil === id ? "bg-teal-700 text-white" : "bg-slate-50 text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
              }`}
            >
              <Icone className="h-5 w-5" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="font-bold text-slate-600">Ton pays :</span>
          {[{ slug: "france", nom: "France" }, ...PAYS].map((p) => (
            <button
              key={p.slug}
              type="button"
              aria-pressed={pays === p.slug}
              onClick={() => setPays(p.slug)}
              className={`inline-flex items-center gap-1.5 rounded-full py-1 pl-1.5 pr-3 text-xs font-black ring-1 transition ${
                pays === p.slug ? "bg-teal-700 text-white ring-teal-700" : "bg-white text-teal-700 ring-slate-200 hover:bg-slate-50"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/drapeaux/${p.slug}.svg`} alt="" width={20} height={15} className="h-[15px] w-5 rounded-[3px] object-cover" />
              {p.nom}
            </button>
          ))}
        </div>

        {/* ⭐ 24/10/2026 — Frédéric : « sous ton pays, affiche une map monde avec
            en rouge mes pays ». SVG statique (public/carte-pays.svg, 74 Ko, Natural
            Earth 110m) : un point rouge pour le Québec, la Suisse et la Belgique,
            trop petits à cette échelle. Pleine largeur de la carte, 680 px au plus. */}
        <figure className="mx-auto mt-4 max-w-[680px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/carte-pays.svg"
            alt="Carte du monde : en rouge, la France, la Suisse, la Belgique, le Maroc, le Québec, la Côte d'Ivoire et le Sénégal"
            width={960}
            height={426}
            loading="lazy"
            className="h-auto w-full"
          />
          <figcaption className="mt-1 text-center text-xs text-slate-500">
            En rouge, nos pays : France, Suisse, Belgique, Maroc, Québec, Côte d&apos;Ivoire, Sénégal.
          </figcaption>
        </figure>

        {autrePays ? (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-sky-50 px-4 py-3">
            <p className="text-sm text-slate-700">
              Le coach suit le programme officiel : {autrePays.nom}. Tes classes, tes notions, nos vidéos.
            </p>
            <Lien
              href={`/pays/${autrePays.slug}`}
              bloc="pays"
              className="inline-flex items-center gap-1 rounded-full bg-teal-700 px-4 py-2 text-sm font-bold text-white hover:bg-teal-800"
            >
              Ouvrir le coach de ce pays <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Lien>
          </div>
        ) : (
          <>
            <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:gap-0">
              {CYCLES.map((c, i) => (
                <div key={c.titre} className={i === 0 ? "lg:pr-4" : "lg:border-l lg:border-slate-200 lg:px-4"}>
                  <p className="mb-1.5 text-xs font-black uppercase tracking-wide text-slate-500">{c.titre}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {c.classes.map(([id, label]) => (
                      <button
                        key={id}
                        type="button"
                        aria-pressed={classe === id}
                        onClick={() => setClasse(id)}
                        className={`min-w-[3rem] rounded-lg px-3 py-1.5 text-sm font-black transition ${
                          classe === id ? "bg-teal-700 text-white" : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Lien
                href={`/coach-ia/maths?classe=${classe}`}
                bloc={`coach-${profil}`}
                className="inline-flex items-center gap-2 rounded-full bg-teal-700 px-5 py-3 font-black text-white shadow hover:bg-teal-800"
              >
                {appel} <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Lien>
              {/* ⭐ DEUX PORTES D'ENTRÉE (Frédéric, 23/10 : « soit l'élève commence
                  avec le coach, soit avec la vidéo, car quand il regarde la vidéo,
                  la fiche d'exercices, le cours et le coach sont proposés »). */}
              <a
                href="#videos-classe"
                onClick={() => track("accueil_clic", { bloc: "porte-video" })}
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-black text-teal-700 ring-2 ring-teal-700 hover:bg-teal-50"
              >
                <Play className="h-4 w-4" fill="currentColor" aria-hidden="true" /> Ou commencer par une vidéo
              </a>
              {/* ⭐ LA TROISIÈME PORTE (Frédéric, 23/10 : « il manque : commence en
                  prenant une photo »). Elle mène à /photo-exercice (la feuille → les
                  séries du coach), qui marche aujourd'hui. ⏳ À élargir à la photo du
                  COURS (mémoire : photo-du-cours-et-suivi-du-cahier). */}
              <Lien
                href="/photo-exercice"
                bloc="porte-photo"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-black text-teal-700 ring-2 ring-teal-700 hover:bg-teal-50"
              >
                <Camera className="h-4 w-4" aria-hidden="true" /> Ou prendre ton exercice en photo
              </Lien>
              {profil === "parent" && (
                <Lien href="/parents" bloc="parents" className="text-sm font-bold text-teal-700 hover:underline">
                  Suivre les progrès de votre enfant →
                </Lien>
              )}
              {profil === "prof" && (
                <Lien href="/espace-profs" bloc="espace-profs" className="text-sm font-bold text-teal-700 hover:underline">
                  Le mode classe et les feuilles A4 →
                </Lien>
              )}
            </div>
          </>
        )}
      </section>

      {/* 3. LES PREUVES */}
      <section aria-label="EleveAI en chiffres" className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          [`${videosParCent.toLocaleString("fr-FR")}+`, "vidéos relues par un professeur"],
          ["CP → Tle", "toutes les classes"],
          [String(PAYS.length + 1), "programmes de pays"],
          // ⭐ 23/10, Frédéric : « change l'élève ne paie jamais par des ressources
          // gratuites » (une offre famille à 4,95 € viendra peut-être : le suivi
          // coûte des API). Il lève ici, à sa demande, le mot « gratuit ».
          ["Gratuites", "les ressources : fiches, exercices, vidéos"],
        ].map(([n, t]) => (
          <div key={t} className="rounded-xl bg-slate-50 px-3 py-3 sm:px-4">
            <p className="text-xl font-black text-slate-900 sm:text-2xl">{n}</p>
            <p className="text-sm text-slate-600">{t}</p>
          </div>
        ))}
      </section>

      {/* 4. PAR OÙ COMMENCER */}
      <Lien
        href="/parcours"
        bloc="par-ou-commencer"
        className="mt-6 flex items-center gap-4 rounded-2xl border border-slate-200 px-4 py-3 transition hover:bg-slate-50"
      >
        <Compass className="h-7 w-7 shrink-0 text-teal-700" aria-hidden="true" />
        <span className="flex-1">
          <span className="block font-black">Tu ne sais pas par où commencer ?</span>
          <span className="block text-sm text-slate-600">Coche tes chapitres : le coach te dit quoi revoir en premier.</span>
        </span>
        <span className="hidden rounded-full px-4 py-2 text-sm font-bold text-teal-700 ring-1 ring-slate-300 sm:block">Faire le point</span>
      </Lien>

      {/* 5. LA BIBLIOTHÈQUE */}
      {!autrePays && (
        <Rangee
          titre={`Les vidéos de ${nomClasse}`}
          lien={{ href: "/video", label: "Toute la bibliothèque" }}
          videos={props.parClasse[classe] ?? []}
          bloc="videos-classe"
          id="videos-classe"
          sous="Chaque vidéo te mène à sa fiche d'exercices, à son cours et au coach."
        />
      )}
      <Rangee titre="Les maths dehors" lien={{ href: "/maths-974", label: "Toutes" }} videos={props.dehors} bloc="dehors" />

      {/* 6. LE JOURNAL EN TROIS CASES */}
      <section className="mt-8">
        <h2 className="mb-3 text-lg font-black">Aujourd&apos;hui</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 p-4">
            <p className="text-xs font-black uppercase tracking-wide text-slate-500">À la une · {props.une?.classe}</p>
            {props.une && (
              <Lien href={`/video/${props.une.id}`} bloc="une" className="mt-2 block font-bold leading-snug hover:underline">
                {props.une.titre}
              </Lien>
            )}
          </div>
          <div className="rounded-2xl border border-slate-200 p-4">
            <p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-500">Le défi du jour · {props.defi.classe}</p>
            <Defi defi={props.defi} />
          </div>
          <div className="rounded-2xl border border-slate-200 p-4">
            <p className="text-xs font-black uppercase tracking-wide text-slate-500">Le métier du jour</p>
            <p className="mt-2 font-bold">{props.metier.nom}</p>
            <p className="mt-1 text-sm leading-snug text-slate-600">{props.metier.maths}</p>
            <Lien href={props.metier.href} bloc="metier" className="mt-2 inline-block text-sm font-bold text-teal-700 hover:underline">
              Apprendre : {props.metier.notion} →
            </Lien>
          </div>
        </div>
      </section>

      {/* 7. LES ADULTES */}
      <section className="mt-8">
        <h2 className="mb-3 text-lg font-black">Pour les adultes</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {ADULTES.map(({ titre, texte, href, Icone }) => (
            <Lien key={titre} href={href} bloc={`adultes-${titre}`} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 transition hover:bg-slate-100">
              <Icone className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" aria-hidden="true" />
              <span>
                <span className="block font-black">{titre}</span>
                <span className="block text-sm leading-snug text-slate-600">{texte}</span>
              </span>
            </Lien>
          ))}
        </div>
        <p className="mt-4 flex items-center gap-2 text-sm text-slate-500">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          Chaque vidéo est écrite et relue par Frédéric, professeur de mathématiques à La Réunion.
        </p>
      </section>
    </main>
    </div>
  );
}
