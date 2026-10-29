"use client";

// L'ACCUEIL « LE COACH QUI SUIT TON PROGRAMME ET TES PROGRÈS » (23/10/2026) —
// voir page.tsx pour le pourquoi. Sept blocs, dans l'ordre de la maquette validée :
//   1. la promesse (le programme du pays, vérifié par un professeur) ;
//   2. qui es-tu (élève, parent, prof), ton cycle, ta classe → le coach ;
//   3. les preuves (compteurs calculés) ;
//   4. « par où commencer ? » ;
//   5. la bibliothèque : les vidéos de ta classe, les maths dehors ;
//   6. le journal plié en trois cases (Une, défi, métier) ;
//   7. les portes des adultes (profs, parents, écoles et pays).
// ⛔ Aucune vidéo ne se lance ici : la vignette mène à /video/<id>, en pause.
// ⏸ 29/10/2026 : le choix du pays et la carte ont quitté l'accueil pour
// l'en-tête (components/SelecteurPaysEntete.tsx).
// ⚠️ Le profil et la classe choisis sont gardés dans le navigateur
// (commodité, sans compte) : tout s'affiche correctement sans.

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import {
  ArrowRight,
  Backpack,
  Building2,
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

/* Les classes du coach France, dans l'ordre de l'accueil (lycée d'abord).
   ⭐ 29/10/2026 — Frédéric : trois sélecteurs en chips, un par cycle, aux
   couleurs des cycles (lycée bleu, collège rouge, primaire jaune). */
const CYCLES = [
  { titre: "Lycée", couleur: { chip: "bg-blue-700 text-white ring-blue-700", vide: "bg-white text-blue-800 ring-blue-300 hover:bg-blue-50", classe: "bg-blue-700 text-white", repos: "bg-blue-50 text-blue-900 ring-1 ring-blue-200 hover:bg-blue-100" }, classes: [["terminale-spe", "Term"], ["premiere-spe", "1re spé"], ["premiere", "1re"], ["seconde", "2de"], ["stmg", "STMG"]] },
  { titre: "Collège", couleur: { chip: "bg-red-600 text-white ring-red-600", vide: "bg-white text-red-700 ring-red-300 hover:bg-red-50", classe: "bg-red-600 text-white", repos: "bg-red-50 text-red-900 ring-1 ring-red-200 hover:bg-red-100" }, classes: [["3e", "3e"], ["4e", "4e"], ["5e", "5e"], ["6e", "6e"]] },
  { titre: "Primaire", couleur: { chip: "bg-amber-400 text-slate-900 ring-amber-400", vide: "bg-white text-amber-800 ring-amber-300 hover:bg-amber-50", classe: "bg-amber-400 text-slate-900", repos: "bg-amber-50 text-amber-900 ring-1 ring-amber-200 hover:bg-amber-100" }, classes: [["cm2", "CM2"], ["cm1", "CM1"], ["ce2", "CE2"], ["ce1", "CE1"], ["cp", "CP"]] },
] as const;
// Les clés de la galerie /video ne sont pas celles du coach au lycée.
const CLASSE_VIDEO: Record<string, string> = { "terminale-spe": "terminale", "premiere-spe": "premiere", premiere: "premiere-commun" };
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

function Rangee({ titre, lien, videos, bloc, id, sous, attente }: { titre: string; lien: { href: string; label: string }; videos: VideoVitrine[]; bloc: string; id?: string; sous?: string; attente?: { texte: string; href: string; label: string } }) {
  return (
    <section id={id} className="mt-8 scroll-mt-24">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h2 className="text-lg font-black text-slate-900">{titre}</h2>
        <Lien href={lien.href} bloc={bloc} className="shrink-0 text-sm font-bold text-teal-700 hover:underline">
          {lien.label} →
        </Lien>
      </div>
      {sous && <p className="-mt-2 mb-3 text-sm text-slate-600">{sous}</p>}
      {videos.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {videos.map((v) => (
            <Vignette key={v.id} v={v} bloc={bloc} />
          ))}
        </div>
      )}
      {/* ⭐ 26/10/2026 : pas de vidéos CE (CE1, CE2, et leurs classes des autres
          pays) et 2 au CP → un message et le coach plutôt qu'une rangée vide. */}
      {attente && videos.length < 4 ? (
        <p className={`${videos.length > 0 ? "mt-3 " : ""}rounded-xl bg-amber-50 px-4 py-3 text-sm text-slate-700 ring-1 ring-amber-200`}>
          {attente.texte}{" "}
          <Lien href={attente.href} bloc={`${bloc}-attente`} className="font-bold text-teal-700 underline">
            {attente.label} →
          </Lien>
        </p>
      ) : videos.length === 0 ? (
        <p className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">Les vidéos de cette classe arrivent.</p>
      ) : null}
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
  const [classe, setClasse] = useState<string>("4e");

  useEffect(() => {
    try {
      const lu = JSON.parse(localStorage.getItem(CLE) ?? "{}");
      if (lu.profil) setProfil(lu.profil);
      if (lu.classe && NOM_CLASSE.has(lu.classe)) setClasse(lu.classe);
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(CLE, JSON.stringify({ profil, classe }));
    } catch {}
  }, [profil, classe]);

  const cycle = CYCLES.find((c) => c.classes.some(([id]) => id === classe)) ?? CYCLES[1];
  const nomClasse = NOM_CLASSE.get(classe) ?? classe;
  const classeVideos = classe;
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
        {/* ⭐ 25/10/2026 — Frédéric : le titre ne parlait que des vidéos, « or on a
            vidéos + coach comme porte d'entrée », « et même évaluation et
            automatismes et fiches d'exercices » : il nomme toutes les portes.
            L'évaluation est celle du COACH (/evaluation est l'ancien concours,
            « disponible le 1er juin » : on n'y envoie pas).
            26/10 : « rajoute évaluation à côté de fiches exercices et rajoute
            fiches cours ». */}
        <h1 className="max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
          Vidéos, coach, automatismes, fiches d&apos;exercices, évaluation, fiches de cours : toutes les maths de ton programme
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-600">
          Du CP à la Terminale, dans ton pays. Commence où tu veux : une vidéo pour comprendre, le coach qui t&apos;évalue et trouve ce qui te manque, les automatismes pour aller vite, les exercices corrigés à imprimer. Tout est vérifié par un professeur.
        </p>
      </section>

      {/* 2. QUI ES-TU, TON CYCLE, TA CLASSE */}
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

        {/* ⭐ 27/10/2026 — Frédéric : « quand on sélectionne profs il faut
            afficher s'inscrire ». L'inscription mène à « Mes classes ». */}
        {profil === "prof" && (
          <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl bg-teal-50 p-3 ring-1 ring-teal-200">
            <p className="flex-1 text-sm text-slate-700">
              Crée tes classes : un code et un mot de passe simple par élève, puis suis-les en direct pendant le cours.
            </p>
            <Lien
              href="/auth/signin?type=prof&inscription=1&next=/prof/classes"
              bloc="prof-inscription"
              className="inline-flex items-center gap-2 rounded-full bg-teal-700 px-5 py-2.5 font-black text-white shadow hover:bg-teal-800"
            >
              S&apos;inscrire <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Lien>
          </div>
        )}

        {/* ⭐ 29/10/2026 — Frédéric : « remplace la liste des classes par trois
            sélecteurs en chips : Lycée, Collège, Primaire ». Une chip ouvre les
            classes de son cycle, de la plus grande à la plus petite ; la classe
            choisie règle le bouton du coach et les vidéos, comme avant.
            ⏸ Le choix du pays et la carte du monde sont partis dans l'en-tête
            (components/SelecteurPaysEntete.tsx) : pays gelés jusqu'à 3 000 vidéos. */}
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Ton cycle">
          {CYCLES.map((c) => (
            <button
              key={c.titre}
              type="button"
              aria-pressed={cycle.titre === c.titre}
              onClick={() => {
                // Le cycle ouvert est celui de la classe choisie. Changer de cycle choisit sa première classe : le bouton du coach
                // ne doit pas dire « 4e » sous la chip « Lycée ».
                if (!c.classes.some(([id]) => id === classe)) setClasse(c.classes[0][0]);
              }}
              className={`rounded-full px-4 py-1.5 text-sm font-black ring-2 transition sm:text-base ${
                cycle.titre === c.titre ? c.couleur.chip : c.couleur.vide
              }`}
            >
              {c.titre}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label={`Les classes : ${cycle.titre}`}>
          {cycle.classes.map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={classe === id}
              onClick={() => setClasse(id)}
              className={`min-w-[3rem] rounded-lg px-3 py-1.5 text-sm font-black transition ${
                classe === id ? cycle.couleur.classe : cycle.couleur.repos
              }`}
            >
              {label}
            </button>
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
              {/* ⭐ 27/10/2026 — Frédéric : « commencer par une vidéo doit envoyer au
                  répertoire vidéo et sélectionner la classe en fonction du choix
                  de l'accueil ». */}
              <a
                href={`/video?classe=${CLASSE_VIDEO[classeVideos] ?? classeVideos}`}
                onClick={() => track("accueil_clic", { bloc: "porte-video" })}
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-black text-teal-700 ring-2 ring-teal-700 hover:bg-teal-50"
              >
                <Play className="h-4 w-4" fill="currentColor" aria-hidden="true" /> Ou commencer par une vidéo
              </a>
              {/* ⭐ LES PORTES 4 ET 5 (Frédéric, 25/10 : « et même évaluation et
                  automatismes et fiches d'exercices »). */}
              <Lien
                href="/automatismes-maths"
                bloc="porte-automatismes"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-black text-teal-700 ring-2 ring-teal-700 hover:bg-teal-50"
              >
                Ou les automatismes
              </Lien>
              <Lien
                href="/fiches-exercices"
                bloc="porte-fiches-exercices"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-black text-teal-700 ring-2 ring-teal-700 hover:bg-teal-50"
              >
                Ou une fiche d&apos;exercices
              </Lien>
              {/* ⭐ 26/10/2026 — Frédéric : « rajouter évaluation à côté de fiches
                  exercices et enlève prendre une photo », « et rajouter fiche
                  cours ». L'évaluation est celle du COACH, /parcours (pas
                  /evaluation, l'ancien concours). */}
              <Lien
                href="/parcours"
                bloc="porte-evaluation"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-black text-teal-700 ring-2 ring-teal-700 hover:bg-teal-50"
              >
                Ou une évaluation
              </Lien>
              <Lien
                href="/fiches-cours"
                bloc="porte-fiches-cours"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-black text-teal-700 ring-2 ring-teal-700 hover:bg-teal-50"
              >
                Ou une fiche de cours
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
      <Rangee
        titre={`Les vidéos de ${nomClasse}`}
        lien={{ href: "/video", label: "Toute la bibliothèque" }}
        videos={props.parClasse[classeVideos] ?? []}
        bloc="videos-classe"
        id="videos-classe"
        sous="Chaque vidéo te mène à sa fiche d'exercices, à son cours et au coach."
        attente={{
          texte: (props.parClasse[classeVideos] ?? []).length > 0
            ? "D'autres vidéos arrivent bientôt. En attendant, le coach t'entraîne sur tout ton programme."
            : `Les vidéos de ${nomClasse} arrivent bientôt. En attendant, le coach t'entraîne sur tout ton programme.`,
          href: `/coach-ia/maths?classe=${classeVideos}`,
          label: "Ouvrir le coach",
        }}
      />
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
