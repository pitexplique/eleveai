"use client";

// LE JOURNAL DE L'ACCUEIL — TROIS MISES EN PAGE POUR UN SEUL CONTENU (18/10/2026).
// Voir app/accueil-journal/page.tsx pour le pourquoi, lib/accueil/journal.ts pour
// le contenu. Ici, seulement la forme :
//   · QUOTIDIEN  le vrai journal : manchette, filets noirs, titres à empattements,
//                papier crème, la Une sur deux tiers et une colonne à droite ;
//   · MAGAZINE   le magazine jeunesse : des cartes de couleur, une mosaïque ;
//   · FIL        une seule colonne, une histoire après l'autre (le téléphone).
// ⭐ Les rubriques sont les MÊMES composants dans les trois : seul `mise` change
// leurs classes et leur place. Ajouter une rubrique = l'écrire une fois.
// ⛔ Aucune vidéo ne se lance ici : la vignette mène à /video/<id>, qui s'ouvre
// en pause (règle du site).

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { ArrowRight, BookOpen, Calculator, Languages, PenLine, Play, Square, Trophy, Volume2 } from "lucide-react";
import type { Metier } from "@/lib/accueil/journal";
import type { Article, Mission } from "@/lib/accueil/articles";
import { genererDefi, type DefiGenere, type Theme } from "@/lib/accueil/defis";
import {
  DEFIS_DU_NIVEAU,
  NIVEAUX,
  NIVEAU_PAR_DEFAUT,
  PETIT_NIVEAU,
  estNiveau,
  niveauDeLaClasse,
  type NiveauJournal,
} from "@/lib/accueil/niveaux";
import { useEleve } from "@/context/EleveContext";
import type { EditionDuNiveau, Entrainement, VideosArticle } from "./donnees";

export type VideoJournal = { id: string; titre: string; short: boolean; vignette: string };

type Mise = "quotidien" | "magazine" | "fil";

/** Le marqueur posé sur tous les liens : `from=accueil` sur /accueil (la mesure
 *  des départs de l'accueil continue, voir AccueilMatieres.tsx), `from=journal`
 *  sur la maquette. */
const Source = createContext<"accueil" | "journal">("journal");

/* ═══ LES TONS : CE QUI CHANGE D'UNE MISE EN PAGE À L'AUTRE ═════════════════ */

const TON = {
  quotidien: {
    page: "bg-[#faf6ec] text-stone-900",
    conteneur: "max-w-6xl",
    carte: "border-t-[3px] border-stone-900 pt-3",
    rubrique: "text-[11px] font-bold uppercase tracking-[0.2em] text-red-700",
    titre: "font-serif font-black tracking-tight text-stone-900",
    texte: "font-serif text-stone-800",
    lien: "font-bold text-red-700 underline decoration-2 underline-offset-4 hover:text-red-900",
    bouton: "bg-stone-900 text-white hover:bg-stone-700",
  },
  magazine: {
    page: "bg-gradient-to-b from-sky-50 via-white to-amber-50 text-slate-900",
    conteneur: "max-w-6xl",
    carte: "rounded-3xl p-5 shadow-lg ring-1 ring-black/5 sm:p-6",
    rubrique:
      "inline-block rounded-full bg-white/80 px-3 py-1 text-xs font-black uppercase tracking-wide text-slate-800 shadow-sm",
    titre: "font-black tracking-tight text-slate-900",
    texte: "text-slate-800",
    lien: "font-black text-slate-900 underline decoration-[3px] underline-offset-4 hover:text-blue-700",
    bouton: "bg-slate-900 text-white hover:bg-slate-700",
  },
  fil: {
    page: "bg-slate-100 text-slate-900",
    conteneur: "max-w-xl",
    carte: "rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200",
    rubrique: "text-xs font-bold uppercase tracking-wide text-slate-500",
    titre: "font-bold text-slate-900",
    texte: "text-slate-700",
    lien: "font-bold text-blue-700 hover:text-blue-900",
    bouton: "bg-blue-600 text-white hover:bg-blue-700",
  },
} as const;

/** Le fond de chaque rubrique en MAGAZINE : des couleurs de la rose chromatique,
 *  pas des nuances d'une même famille (sa règle du 07/10). */
const COULEUR_MAGAZINE = {
  une: "bg-sky-200",
  defi: "bg-yellow-200",
  chiffre: "bg-violet-200",
  metier: "bg-emerald-200",
  coach: "bg-white",
  shorts: "bg-rose-200",
  reel: "bg-orange-200",
  rituels: "bg-cyan-100",
  atelier: "bg-red-200",
  grands: "bg-slate-200",
  article: "bg-white",
  rdv: "bg-amber-100",
  videotheque: "bg-white",
} as const;

type Rubrique = keyof typeof COULEUR_MAGAZINE;

function Bloc({
  mise,
  quoi,
  rubrique,
  children,
  className = "",
}: {
  mise: Mise;
  quoi: Rubrique;
  rubrique: string;
  children: ReactNode;
  className?: string;
}) {
  const t = TON[mise];
  return (
    <section
      aria-label={rubrique}
      className={`${t.carte} ${mise === "magazine" ? COULEUR_MAGAZINE[quoi] : ""} ${className}`}
    >
      <p className={t.rubrique}>{rubrique}</p>
      <div className="mt-3">{children}</div>
    </section>
  );
}

/** Tout lien du journal se compte, avec sa rubrique et la mise en page lue. */
function Lien({
  href,
  quoi,
  mise,
  className,
  children,
  label,
  carte = false,
}: {
  href: string;
  quoi: Rubrique | "manchette" | "pied";
  mise: Mise;
  className?: string;
  children: ReactNode;
  label?: string;
  /** Une carte de la galerie : les flèches du clavier s'y arrêtent. */
  carte?: boolean;
}) {
  const sep = href.includes("?") ? "&" : "?";
  const de = useContext(Source);
  return (
    <Link
      prefetch={false}
      href={`${href}${sep}from=${de}`}
      aria-label={label}
      data-carte={carte ? "" : undefined}
      onClick={() => track("journal_clic", { rubrique: quoi, mise, page: de })}
      className={className}
    >
      {children}
    </Link>
  );
}

/* ═══ LES VIGNETTES ═══════════════════════════════════════════════════════ */

function Vignette({
  v,
  mise,
  quoi,
  grande = false,
}: {
  v: VideoJournal;
  mise: Mise;
  quoi: Rubrique;
  grande?: boolean;
}) {
  const arrondi = mise === "quotidien" ? "" : mise === "magazine" ? "rounded-2xl" : "rounded-xl";
  return (
    <Lien href={`/video/${v.id}`} quoi={quoi} mise={mise} carte className="group block focus-visible:outline focus-visible:outline-4 focus-visible:outline-red-700" label={`Regarder : ${v.titre}`}>
      <span
        className={`relative block overflow-hidden bg-slate-900 ${arrondi} ${v.short ? "aspect-[9/16]" : "aspect-video"}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={v.vignette}
          alt=""
          loading={grande ? "eager" : "lazy"}
          // `contain` pour les shorts : quelques vignettes ne sont pas en 9/16
          // (celle de Ti Margo fait 480 × 405) et `cover` en coupait le texte.
          className={`h-full w-full transition duration-300 group-hover:scale-105 ${v.short ? "object-contain" : "object-cover"}`}
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span
            className={`flex items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg transition group-hover:scale-110 ${grande ? "h-16 w-16" : "h-10 w-10"}`}
          >
            <Play className={grande ? "ml-1 h-8 w-8" : "ml-0.5 h-5 w-5"} fill="currentColor" aria-hidden="true" />
          </span>
        </span>
      </span>
    </Lien>
  );
}

/* ═══ LA MANCHETTE ════════════════════════════════════════════════════════ */

const SOMMAIRE = [
  { ancre: "#comprendre", texte: "Comprendre" },
  { ancre: "#changer", texte: "Changer" },
  { ancre: "#defi", texte: "Se tester" },
  { ancre: "#agir", texte: "Agir" },
  { ancre: "#demain", texte: "Penser à demain" },
];

function Manchette({ date, numero, ile = false }: { date: string; numero: number; ile?: boolean }) {
  return (
    <header className="border-b-[6px] border-double border-stone-900 pb-3 sm:pb-4">
      <div className="flex items-center justify-between border-b border-stone-900 pb-1 text-[11px] font-bold uppercase tracking-widest text-stone-700">
        <span>{date}</span>
        <span className="hidden sm:inline">Du CP aux adultes</span>
        <span>N° {numero}</span>
      </div>
      <div className="mt-3 flex items-center justify-center gap-3 sm:gap-6">
        <Image
          src="/ti-margo/ti-margo-magazine.png"
          alt="Ti Margo lit le journal"
          width={240}
          height={228}
          className="h-16 w-auto shrink-0 sm:h-28"
          priority
        />
        <div className="min-w-0 text-center">
          <h1 className="font-serif text-4xl font-black leading-none tracking-tight text-stone-900 sm:text-7xl">
            Le Journal d&rsquo;EleveAI
          </h1>
          <p className="mt-2 font-serif text-base italic text-stone-700 sm:text-2xl">
            {ile ? "Le journal scientifique de l’île de La Réunion" : "Comprendre le monde, et le changer"}
          </p>
        </div>
      </div>
      <nav
        aria-label="Sommaire"
        className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-bold uppercase tracking-wider text-stone-700 sm:tracking-widest sm:text-sm"
      >
        {SOMMAIRE.map((s) => (
          <a key={s.ancre} href={s.ancre} className="whitespace-nowrap hover:text-red-700 hover:underline">
            {s.texte}
          </a>
        ))}
      </nav>
    </header>
  );
}

/* ═══ LES RUBRIQUES ═══════════════════════════════════════════════════════ */

type UneProps = { paysage: VideoJournal | null; short: VideoJournal | null; classe: string; utile: string | null };

function DefiDuJour({
  mise,
  jour,
  defi,
  theme,
  parmi = null,
}: {
  mise: Mise;
  jour: number;
  defi: DefiGenere;
  theme: Theme | null;
  /** Les générateurs de l'édition choisie (lib/accueil/niveaux.ts). */
  parmi?: number[] | null;
}) {
  const t = TON[mise];
  // Le défi du JOUR vient du serveur : lié à la Une (écrit pour elle, ou généré
  // sur son thème). « Un autre défi » en fabrique d'autres SUR LE MÊME THÈME.
  const [i, setI] = useState(jour);
  const [choisi, setChoisi] = useState<number | null>(null);
  const d = useMemo(() => (i === jour ? defi : genererDefi(i * 31 + 7, theme, parmi)), [i, jour, defi, theme, parmi]);
  const ordre = d.choix.map((_, j) => j);
  const juste = choisi === d.bonne;

  return (
    <Bloc mise={mise} quoi="defi" rubrique={`Le défi du jour · ${d.classe}`}>
      <h2 className={`${t.titre} text-xl leading-snug`}>{d.question}</h2>
      <div className="mt-3 grid gap-2">
        {ordre.map((j) => {
          const montre = choisi !== null;
          const etat = !montre
            ? "border-slate-300 bg-white hover:border-slate-900"
            : j === d.bonne
              ? "border-green-600 bg-green-50 text-green-900"
              : j === choisi
                ? "border-orange-500 bg-orange-50 text-orange-900"
                : "border-slate-200 bg-white opacity-60";
          return (
            <button
              key={j}
              type="button"
              disabled={montre}
              onClick={() => {
                setChoisi(j);
                track("journal_defi", { juste: j === d.bonne, classe: d.classe, mise, du_jour: i === jour });
              }}
              className={`rounded-xl border-2 px-4 py-2.5 text-left text-lg font-bold transition ${etat}`}
            >
              {d.choix[j]}
            </button>
          );
        })}
      </div>
      {choisi !== null && (
        <div className="mt-3" aria-live="polite">
          <p className={`text-lg font-black ${juste ? "text-green-700" : "text-orange-700"}`}>
            {juste ? "Bravo !" : `Pas encore ! C'est ${d.choix[d.bonne]}.`}
          </p>
          <p className={`${t.texte} mt-1 leading-snug`}>{d.explication}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Lien
              href={`/coach-ia/maths?classe=${d.coach}`}
              quoi="defi"
              mise={mise}
              className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-bold ${t.bouton}`}
            >
              Encore des questions de {d.classe} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Lien>
            <button
              type="button"
              onClick={() => {
                setI(i + 1);
                setChoisi(null);
              }}
              className="rounded-full border-2 border-current px-4 py-2 text-sm font-bold"
            >
              Un autre défi
            </button>
          </div>
        </div>
      )}
    </Bloc>
  );
}

/* ═══ LES RENDEZ-VOUS : DE QUOI REVENIR DEMAIN ══════════════════════════════
   Frédéric, 19/10 : « les gens doivent revenir chaque jour ». Trois accroches
   de quotidien : la réponse du défi d'HIER (on revient pour savoir si on avait
   juste), la Une de DEMAIN (on revient pour la voir), et la SÉRIE de jours.
   ⚠️ La série vit dans le navigateur (localStorage), sans compte : c'est une
   commodité, elle peut repartir à zéro (navigation privée, autre appareil). */
const CLE_SERIE = "eleveai.journal.serie";

function RendezVous({
  mise,
  jour,
  demain,
  hier,
}: {
  mise: Mise;
  jour: number;
  demain: { titre: string; classe: string };
  /** Le défi d'hier tel qu'il a été posé (lié à la Une d'hier). */
  hier: { question: string; reponse: string };
}) {
  const t = TON[mise];
  const [serie, setSerie] = useState<number | null>(null);

  useEffect(() => {
    let n = 1;
    try {
      const avant = JSON.parse(localStorage.getItem(CLE_SERIE) ?? "null") as { jour: number; serie: number } | null;
      if (avant?.jour === jour) n = avant.serie;
      else if (avant?.jour === jour - 1) n = avant.serie + 1;
      localStorage.setItem(CLE_SERIE, JSON.stringify({ jour, serie: n }));
    } catch {}
    setSerie(n);
  }, [jour]);

  return (
    <Bloc mise={mise} quoi="rdv" rubrique="Rendez-vous demain">
      <div className="space-y-4">
        <div>
          <p className="text-xs font-black uppercase tracking-wide opacity-70">Demain à la Une · {demain.classe}</p>
          <p className={`${t.titre} mt-1 text-lg leading-snug`}>{demain.titre}</p>
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-wide opacity-70">La réponse du défi d&rsquo;hier</p>
          <p className={`${t.texte} mt-1 leading-snug`}>
            {hier.question} <span className="font-black">Réponse : {hier.reponse}.</span>
          </p>
        </div>
        {serie !== null && (
          <p className={`${t.texte} rounded-xl bg-white/70 px-3 py-2 font-bold`}>
            {serie > 1
              ? `🔥 Ta série : ${serie} jours de suite. Reviens demain pour la faire grandir !`
              : "🔥 Premier jour de ta série. Reviens demain pour la faire grandir !"}
          </p>
        )}
      </div>
    </Bloc>
  );
}

const RITUELS = [
  { titre: "Les défis du jour", texte: "Trois défis neufs chaque matin.", href: "/defis-du-jour", Icone: Trophy },
  { titre: "Le calcul rapide", texte: "Cinq minutes d'automatismes.", href: "/calcul-rapide", Icone: Calculator },
  { titre: "La dictée du jour", texte: "Lue à voix haute, corrigée mot à mot.", href: "/dictee-du-jour", Icone: PenLine },
  { titre: "La belle écriture", texte: "Les lettres en cursive, CP et CE1.", href: "/fiches-ecriture", Icone: BookOpen },
  { titre: "L'anglais du jour", texte: "Cinq mots par matin, prononcés.", href: "/anglais-du-jour", Icone: Languages },
];

function Rituels({ mise }: { mise: Mise }) {
  const t = TON[mise];
  return (
    <Bloc mise={mise} quoi="rituels" rubrique="Le rituel du matin : 5 minutes">
      <ul className={`grid gap-2 ${mise === "fil" ? "" : "sm:grid-cols-2"}`}>
        {RITUELS.map(({ titre, texte, href, Icone }) => (
          <li key={href}>
            <Lien
              href={href}
              quoi="rituels"
              mise={mise}
              className="flex items-start gap-3 rounded-xl p-2 transition hover:bg-white/70"
            >
              <Icone className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <span>
                <span className={`${t.titre} block`}>{titre}</span>
                <span className={`${t.texte} block text-sm`}>{texte}</span>
              </span>
            </Lien>
          </li>
        ))}
      </ul>
    </Bloc>
  );
}

const PIED = [
  { label: "Comment ça marche", href: "/pourquoi-eleveai" },
  { label: "Élèves", href: "/espace-eleves" },
  { label: "Enseignants", href: "/espace-profs" },
  { label: "Parents", href: "/parents" },
  { label: "Chef d'établissement", href: "/direction" },
  { label: "Toutes les ressources", href: "/explorer" },
  { label: "À propos", href: "/qui-sommes-nous" },
  { label: "Aide", href: "/faq" },
  { label: "Confidentialité", href: "/politique-confidentialite" },
  { label: "Conditions", href: "/cgu" },
];

/* ═══ LES ARTICLES : « COMPRENDRE LE MONDE » (10/11/2026) ═════════════════ */

function EncadreMaths({ a, petit = false }: { a: Article; petit?: boolean }) {
  return (
    <aside className="border-2 border-stone-900 bg-white/70 p-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-700">Les maths derrière</p>
      <p className="mt-1 font-serif text-lg font-black leading-tight text-stone-900">{a.maths.titre}</p>
      {/* Aux petits niveaux, pas de police machine à écrire : plus grand, plus rond. */}
      <ul
        className={`mt-2 space-y-1 leading-snug text-stone-800 ${petit ? "font-sans text-lg font-semibold" : "font-mono text-[13px] sm:text-sm"}`}
      >
        {a.maths.lignes.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <p className="mt-2 text-xs italic text-stone-600">À suivre {a.niveau}.</p>
    </aside>
  );
}

/** Le défi de l'article (10/11/2026) : on lit, on comprend, on se teste.
 *  Un clic donne la correction et son explication ; on peut se reprendre. */
function DefiArticle({ a, surFini }: { a: Article; surFini?: () => void }) {
  const [choisi, setChoisi] = useState<number | null>(null);
  const [vue, setVue] = useState(false);
  const d = a.defi;
  const juste = choisi === d.bonne;
  const fini = juste || vue;
  return (
    <div className="border-2 border-dashed border-stone-900 bg-yellow-50 p-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-700">🎯 Le défi de l&rsquo;article</p>
      <p className="mt-1 font-serif text-lg font-bold leading-snug text-stone-900">{d.question}</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {d.choix.map((c, i) => {
          // Une erreur ne montre PAS la bonne réponse : on se reprend d'abord.
          const etat =
            fini && i === d.bonne
              ? "bg-emerald-600 text-white"
              : i === choisi && !juste
                ? "bg-red-600 text-white"
                : fini
                  ? "bg-white opacity-60"
                  : "bg-white hover:bg-stone-100";
          return (
            <button
              key={c}
              type="button"
              disabled={fini}
              onClick={() => {
                setChoisi(i);
                track("journal_defi_article", { article: a.id, juste: i === d.bonne });
                // Le défi réussi : l'article est « lu » (rangée « Continuer à lire »).
                if (i === d.bonne) surFini?.();
              }}
              className={`rounded-lg border-2 border-stone-900 px-3 py-2 text-left font-bold transition ${etat}`}
            >
              <span className="mr-1.5 opacity-70">{"ABC"[i]}.</span>
              {c}
            </button>
          );
        })}
      </div>
      <div className="mt-3" aria-live="polite">
        {fini ? (
          <p className="font-serif leading-snug text-stone-800">
            <span className={`font-black ${juste ? "text-emerald-700" : "text-stone-900"}`}>
              {juste ? "Bravo ! " : "La réponse : "}
            </span>
            {d.explication}
          </p>
        ) : choisi !== null ? (
          <p className="font-serif leading-snug text-stone-800">
            <span className="font-black text-red-700">Pas tout à fait. </span>
            Relis « Les maths derrière » et essaie un autre choix.{" "}
            <button type="button" onClick={() => setVue(true)} className="font-bold text-red-700 underline underline-offset-4">
              Voir la réponse
            </button>
          </p>
        ) : null}
      </div>
    </div>
  );
}

function Agir({ a }: { a: Article }) {
  return (
    <p className="border-l-4 border-emerald-700 bg-emerald-50 px-3 py-2 font-serif leading-snug text-stone-800">
      <span className="font-black text-emerald-800">Et toi, tu peux… </span>
      {a.agir}
    </p>
  );
}

/** « Écouter l'article » (12/11/2026) : pour ceux qui lisent difficilement
 *  (la règle du coach sonore). La voix du navigateur, en français ; rien ne se
 *  lance tout seul. */
/** Les vidéos de l'article (13/11/2026, Frédéric : « pas assez de liens vers
 *  des vidéos paysage ou shorts, trop d'écrit ») : la paysage en grand, le
 *  short à côté. Des liens vers /video/<id> : rien ne se lance ici. */
/** Les classes (lues par classeDe, donnees.ts) dont la vidéo du jour va à chaque profil. */
const CLASSES_VIDEO_DU_JOUR: Record<NiveauJournal, string[]> = {
  "cp-ce2": [],
  cm: [],
  "6e-5e": ["6e", "5e", "Maths Réel"],
  "4e-3e": ["4e", "3e", "Maths Réel"],
  lycee: ["2de", "1re", "1re spé", "Terminale", "Maths Réel"],
  adultes: ["6e", "5e", "4e", "3e", "2de", "1re", "1re spé", "Terminale", "Maths Réel", "Les bases", "Maths"],
};

/** Les espaces qu'un titre ne doit pas couper (13/11 : « 1,5 / °C » sur deux
 *  lignes) : avant une unité ou %, et à l'intérieur des guillemets. */
const insecable = (t: string) =>
  t
    .replace(/(\d) (°C|°|%|km|m|kg|g|h|min|s|€|ans?)(?=[\s»,.!?]|$)/g, "$1 $2")
    .replace(/« /g, "« ")
    .replace(/ »/g, " »")
    .replace(/(\d) (\d{3})/g, "$1 $2");

/** Le titre d'une vidéo sans « #Shorts » ni « — Maths 6e » à la fin. */
const titreCourt = (t: string) =>
  t
    .replace(/#\S+/g, "")
    .replace(/\s*[—·]\s*(Maths\s+)?(CP|CE1|CE2|CM1|CM2|6e|5e|4e|3e|2de|1re|Tle|Seconde|Terminale)(\s.*)?$/i, "")
    .trim();

function BlocVideos({ v, petit = false }: { v?: VideosArticle; petit?: boolean }) {
  if (!v?.paysage && !v?.short) return null;
  const titre = titreCourt;
  return (
    <div className={`grid items-start gap-3 ${v.paysage && v.short ? "grid-cols-[1fr_7.5rem] sm:grid-cols-[1fr_9rem]" : v.short ? "grid-cols-[minmax(0,13rem)] justify-center" : ""}`}>
      {v.paysage && (
        <div>
          <Vignette v={v.paysage} mise="quotidien" quoi="article" grande />
          <p className={`mt-1.5 font-serif font-bold leading-snug text-stone-900 ${petit ? "text-lg" : "text-base"}`}>
            <span className="text-red-700">▶ La vidéo : </span>
            {titre(v.paysage.titre)}
          </p>
        </div>
      )}
      {v.short && (
        <div>
          <Vignette v={v.short} mise="quotidien" quoi="shorts" />
          <p className="mt-1.5 line-clamp-3 font-serif text-sm font-bold leading-snug text-stone-900">
            <span className="text-red-700">Le short : </span>
            {titre(v.short.titre)}
          </p>
        </div>
      )}
    </div>
  );
}

/** « Regarder » (13/11 : tout article a Regarder · Lire · Écouter · QCM) :
 *  la paysage de l'article, sinon son short. */
function Regarder({ videos, quoi = "article" }: { videos?: VideosArticle; quoi?: Rubrique }) {
  const v = videos?.paysage ?? videos?.short;
  if (!v) return null;
  return (
    <Lien
      href={`/video/${v.id}`}
      quoi={quoi}
      mise="quotidien"
      className="inline-flex items-center gap-2 rounded-full bg-red-700 px-6 py-2.5 font-serif text-xl font-black text-white hover:bg-red-800"
    >
      <Play className="h-5 w-5" fill="currentColor" aria-hidden="true" /> Regarder
    </Lien>
  );
}

function Ecouter({ a, grand = false }: { a: Article; grand?: boolean }) {
  const [parle, setParle] = useState(false);
  const [possible, setPossible] = useState(false);
  useEffect(() => {
    setPossible("speechSynthesis" in window);
    return () => {
      try {
        window.speechSynthesis?.cancel();
      } catch {}
    };
  }, []);
  // Un autre article (autre édition) : on se tait.
  useEffect(() => {
    try {
      window.speechSynthesis?.cancel();
    } catch {}
    setParle(false);
  }, [a.id]);
  if (!possible) return null;
  const lire = () => {
    try {
      const s = window.speechSynthesis;
      s.cancel();
      if (parle) {
        setParle(false);
        return;
      }
      // « ÷ », « × », « − » : la voix les lirait mal ; on les dit en mots.
      const texte = [a.titre, a.chapo, ...a.corps]
        .join(". ")
        .replace(/×/g, " fois ")
        .replace(/÷/g, " divisé par ")
        .replace(/−/g, " moins ");
      const u = new SpeechSynthesisUtterance(texte);
      u.lang = "fr-FR";
      u.rate = 0.9;
      const voix = s.getVoices().find((v) => v.lang.startsWith("fr"));
      if (voix) u.voice = voix;
      u.onend = () => setParle(false);
      u.onerror = () => setParle(false);
      s.speak(u);
      setParle(true);
      track("journal_ecouter", { article: a.id });
    } catch {
      setParle(false);
    }
  };
  return (
    <button
      type="button"
      onClick={lire}
      // ⭐ 13/11 : « j'aime bien écouter l'article » — un vrai bouton, bien visible.
      className={`inline-flex items-center gap-2 rounded-full border-2 border-stone-900 font-serif font-black hover:bg-amber-200 ${
        parle ? "bg-amber-200" : "bg-amber-100"
      } ${grand ? "px-6 py-2.5 text-xl" : "px-5 py-2 text-lg"} text-stone-900`}
    >
      {parle ? <Square className="h-5 w-5" aria-hidden="true" /> : <Volume2 className="h-6 w-6" aria-hidden="true" />}
      {parle ? "Arrêter" : "Écouter l’article"}
    </button>
  );
}

function ArticleUne({
  a,
  petit = false,
  duree,
  surFini,
  coach,
  videos,
  deplie = false,
}: {
  a: Article;
  petit?: boolean;
  duree?: number;
  surFini?: () => void;
  /** La série du coach où s'entraîner après l'article (donnees.ts). */
  coach?: Entrainement;
  /** La paysage et le short de l'article pour ce profil (donnees.ts). */
  videos?: VideosArticle;
  /** Ouvert sur une partie précise (maths, défi…) : le texte est déplié. */
  deplie?: boolean;
}) {
  const de = useContext(Source);
  // ⭐ 13/11 : « trop d'écrit » : deux paragraphes, la suite sur demande.
  const [suite, setSuite] = useState(deplie);
  const visibles = suite ? a.corps : a.corps.slice(0, 2);
  return (
    <article aria-label={a.titre} className="border-t-[3px] border-stone-900 pt-3">
      {videos && (videos.paysage || videos.short) && (
        <div className="mb-4">
          <BlocVideos v={videos} petit={petit} />
        </div>
      )}
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-700">
        {a.rubrique}
        {duree ? ` · ${duree} min de lecture` : ""}
      </p>
      <h2 className="mt-2 font-serif text-3xl font-black leading-[1.05] tracking-tight text-stone-900 sm:text-5xl">
        {insecable(a.titre)}
      </h2>
      <p
        className={`mt-3 font-serif font-semibold leading-snug text-stone-800 ${petit ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"}`}
      >
        {a.chapo}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Regarder videos={videos} />
        <button
          type="button"
          onClick={() => {
            setSuite(true);
            document.getElementById(`texte-${a.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-2.5 font-serif text-xl font-black text-white hover:bg-stone-700"
        >
          <BookOpen className="h-5 w-5" aria-hidden="true" /> Lire
        </button>
        <Ecouter a={a} grand />
      </div>
      {/* Les vidéos écrites à la main dans l'article (13/11/2026) : des liens vers /video/<id>, où la
          vidéo s'ouvre en pause. Rien ne se lance ici. */}
      {a.videos?.length ? (
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Les vidéos de l’article">
          {a.videos.map((v) => (
            <li key={v.id}>
              <Link
                prefetch={false}
                href={`/video/${v.id}?from=${de}`}
                onClick={() => track("journal_article_video", { article: a.id, video: v.id })}
                className="inline-flex items-center gap-2 rounded-full bg-red-700 px-4 py-1.5 font-serif text-base font-bold text-white hover:bg-red-800 focus-visible:outline focus-visible:outline-4 focus-visible:outline-stone-900"
              >
                <Play className="h-4 w-4" fill="currentColor" aria-hidden="true" />
                {v.libelle}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
      <div id={`texte-${a.id}`} className="mt-5 grid scroll-mt-4 gap-6 md:grid-cols-[1fr_16rem]">
        {/* Aux petits niveaux : plus grand, plus aéré, pas de lettrine (elle
            gêne ceux qui déchiffrent). */}
        <div
          className={
            petit
              ? "space-y-4 font-serif text-xl leading-loose text-stone-900 sm:text-[22px]"
              : "space-y-3 font-serif text-[17px] leading-relaxed text-stone-800 first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-6xl first-letter:font-black first-letter:leading-[0.85] first-letter:text-stone-900"
          }
        >
          {visibles.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {!suite && a.corps.length > visibles.length && (
            <button
              type="button"
              onClick={() => {
                setSuite(true);
                track("journal_lire_suite", { article: a.id });
              }}
              className="!mt-2 font-serif text-base font-black text-red-700 underline decoration-2 underline-offset-4 hover:text-red-900"
            >
              Lire la suite ↓
            </button>
          )}
        </div>
        <div id="lecteur-maths">
          <EncadreMaths a={a} petit={petit} />
        </div>
      </div>
      <div id="lecteur-defi" className="mt-5">
        <DefiArticle a={a} surFini={surFini} />
      </div>
      <div id="lecteur-changer" className="mt-5">
        <Agir a={a} />
      </div>
      {/* ⭐ 13/11/2026 : l'article mène au coach. C'est ce lien qui fait du
          journal un complément du suivi, et pas un site à côté. */}
      {coach && (
        <div className="mt-5 flex flex-wrap items-center gap-3 border-2 border-stone-900 bg-white p-4">
          <p className="min-w-0 flex-1 font-serif leading-snug text-stone-800">
            <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-red-700">
              À toi de jouer · {coach.classe}
            </span>
            <span className={`font-black text-stone-900 ${petit ? "text-xl" : "text-lg"}`}>{coach.label}</span>
          </p>
          <Lien
            href={coach.href}
            quoi="coach"
            mise="quotidien"
            className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 font-serif text-lg font-black text-white hover:bg-stone-700"
          >
            S&rsquo;entraîner avec le coach <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Lien>
        </div>
      )}
      <p className="mt-4 text-xs italic text-stone-500">Source : {a.source}</p>
    </article>
  );
}

/** « Le défi dehors » ou « La bonne action du jour » (10/11/2026) : un jour
 *  l'un, un jour l'autre (lib/accueil/articles.ts, missionDuJour). */
function MissionDuJour({ m }: { m: Mission }) {
  const dehors = m.genre === "dehors";
  return (
    <section
      aria-label={dehors ? "Le défi dehors" : "La bonne action du jour"}
      className={`border-[3px] p-5 ${dehors ? "border-emerald-800 bg-emerald-50" : "border-sky-800 bg-sky-50"}`}
    >
      <p className={`text-[11px] font-bold uppercase tracking-[0.2em] ${dehors ? "text-emerald-800" : "text-sky-800"}`}>
        {dehors ? "🌳 Le défi dehors" : "🤝 La bonne action du jour"} · {m.niveau}
      </p>
      <h2 className="mt-2 font-serif text-2xl font-black leading-tight text-stone-900 sm:text-3xl">{m.titre}</h2>
      <p className="mt-2 font-serif text-sm italic text-stone-700">
        <span className="font-bold not-italic">Il te faut : </span>
        {m.materiel}
      </p>
      <ol className="mt-3 list-decimal space-y-1 pl-5 font-serif leading-snug text-stone-800">
        {m.etapes.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ol>
      <p className="mt-3 border-t border-stone-900/20 pt-3 font-serif leading-snug text-stone-800">
        <span className={`font-black ${dehors ? "text-emerald-800" : "text-sky-800"}`}>Le calcul : </span>
        {m.calcul}
      </p>
      <p className="mt-2 text-xs italic text-stone-600">
        Avec un adulte dès que tu sors de l&rsquo;école. Demain, {dehors ? "une bonne action" : "un défi dehors"}.
      </p>
    </section>
  );
}

/* ═══ LE JOURNAL EN GALERIE, « À LA FAÇON NETFLIX » (12/11/2026) ═══════════
   Frédéric : « il faut que les élèves choisissent leurs niveaux, les articles
   doivent correspondre à leurs niveaux », puis « et si on faisait à la façon
   Netflix ». Donc :
     1. un écran d'entrée « Qui lit aujourd'hui ? » : une grande carte par
        profil (CP-CE2 … adultes), avec un Ti Margo ; le choix est gardé, un
        bouton en tête permet d'en changer ;
     2. une grande Une, puis des RANGÉES qui défilent (au doigt, à la molette,
        aux flèches du clavier) : Nouveau aujourd'hui, Continuer à lire,
        Comprendre, Changer, Se tester, En vidéo, Agir, Penser à demain, Les
        chiffres clés, Les maths derrière ;
     3. une carte ouvre l'article dans un lecteur, par-dessus la galerie.
   L'identité reste celle du journal : manchette, papier crème, empattements.
   L'ordre de choix du profil : ?niveau= dans l'adresse (un prof qui projette),
   puis le choix gardé dans le navigateur ; sinon on DEMANDE (la classe de
   l'élève connecté est seulement mise en avant sur l'écran des profils). */
const CLE_NIVEAU = "eleveai.journal.niveau";
const CLE_EDITION = "eleveai.journal.edition";
const CLE_LUS = "eleveai.journal.lus";

function lireNiveauGarde(): NiveauJournal | null {
  try {
    const url = new URLSearchParams(window.location.search).get("niveau");
    if (estNiveau(url)) return url;
  } catch {}
  try {
    const garde = localStorage.getItem(CLE_NIVEAU);
    if (estNiveau(garde)) return garde;
  } catch {}
  return null;
}

function niveauDeLAccueil(): NiveauJournal | null {
  try {
    const lu = JSON.parse(localStorage.getItem("eleveai.accueil") ?? "null") as { classe?: string } | null;
    return niveauDeLaClasse(lu?.classe);
  } catch {
    return null;
  }
}

function lireIleGardee(): boolean | null {
  try {
    const url = new URLSearchParams(window.location.search).get("edition");
    if (url === "reunion") return true;
    if (url === "monde") return false;
  } catch {}
  try {
    const garde = localStorage.getItem(CLE_EDITION);
    if (garde === "reunion") return true;
    if (garde === "monde") return false;
  } catch {}
  return null;
}

/* ── Les « images » des cartes ──────────────────────────────────────────────
   ⛔ Jamais de photo de presse (règle du journal). Chaque carte a une image
   maison : un grand dessin (émoji) sur un fond de la couleur de sa rubrique.
   Des couleurs de la rose chromatique, pas des nuances d'une même famille. */
export const FOND_RUBRIQUE: Record<Article["rubrique"], string> = {
  Planète: "from-emerald-400 to-teal-700",
  Espace: "from-indigo-500 to-slate-900",
  Santé: "from-rose-400 to-red-700",
  Argent: "from-amber-300 to-orange-600",
  Sport: "from-sky-400 to-blue-700",
  Technologie: "from-violet-400 to-purple-800",
  Histoire: "from-yellow-500 to-amber-800",
  Société: "from-fuchsia-400 to-pink-700",
  Sécurité: "from-orange-400 to-red-600",
};
export const DESSIN_RUBRIQUE: Record<Article["rubrique"], string> = {
  Planète: "🌍", Espace: "🚀", Santé: "❤️", Argent: "💶", Sport: "🏅",
  Technologie: "📱", Histoire: "🏛️", Société: "🤝", Sécurité: "🛡️",
};
const DESSIN_ARTICLE: Record<string, string> = {
  "bonnes-actions-puissances": "🤝", "bonnes-actions-cm": "🤝", "lumiere-soleil": "☀️", "huit-milliards": "🌍",
  "coeur-battements": "❤️", "coeur-cm": "❤️", "prix-qui-doublent": "🛒", "marathon-21-kmh": "🏃", megapixels: "📷",
  "pluie-70": "🌧️", eratosthene: "📐", "sondage-1000": "🗳️", "sondage-college": "🗳️", "sondage-ecole": "🥣",
  "oceans-71": "🌊", "code-pin": "🔐", freinage: "🚗", "rechauffement-1-5": "🌡️", "baleines-reunion": "🐋",
  "dents-de-lait": "🦷", "abeilles-hexagones": "🐝", "ballon-32-pieces": "⚽", "semaine-7-jours": "📅",
  "tirelire-2-euros": "🐷", "jour-et-nuit": "🌙", "annee-bissextile": "🗓️", "douche-ou-bain": "🚿",
  "carbone-14": "🦴", "faux-positifs": "🧪", "reunion-bassin-ecole": "🏖️", "reunion-bassin": "🏖️",
  "reunion-fournaise": "🌋", "reunion-cyclones": "🌀", "reunion-tortues": "🐢", "reunion-trois-cirques": "⛰️",
  "reunion-foot-payet": "⚽", "reunion-velo-maido": "🚴", "reunion-moringue": "🥁", "reunion-canne-a-sucre": "🌾",
  "reunion-poissons-lagon": "🐠", "reunion-soleil": "😎", "reunion-vivre-ensemble": "🫶", "reunion-record-pluie": "☔",
  "reunion-diagonale": "🥾", "reunion-altitude": "🏔️", "reunion-lave-nouvelles-terres": "🌋", "reunion-parc-national": "🌳",
};
export const dessinDe = (a: Article) => DESSIN_ARTICLE[a.id] ?? DESSIN_RUBRIQUE[a.rubrique];

function ImageCarte({ fond, dessin, grand = false }: { fond: string; dessin: string; grand?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex aspect-video w-full items-center justify-center bg-gradient-to-br ${fond} ${grand ? "text-8xl sm:text-9xl" : "text-6xl"}`}
    >
      <span className="drop-shadow-[0_3px_6px_rgba(0,0,0,0.35)]">{dessin}</span>
    </span>
  );
}

/** La durée de lecture : les petits lisent moins vite. */
function minutes(a: Article, petit: boolean): number {
  const mots = [a.titre, a.chapo, ...a.corps, ...a.maths.lignes, a.agir].join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(mots / (petit ? 70 : 160)));
}

/* ── L'écran des profils ──────────────────────────────────────────────────── */
const PROFILS: Record<NiveauJournal, { image: string; fond: string; phrase: string }> = {
  "cp-ce2": { image: "/ti-margo/animations/danse.png", fond: "bg-yellow-300", phrase: "Des phrases courtes" },
  cm: { image: "/ti-margo/animations/saut-de-joie.png", fond: "bg-orange-300", phrase: "Je découvre le monde" },
  "6e-5e": { image: "/ti-margo/animations/salut.png", fond: "bg-emerald-300", phrase: "Je comprends avec les maths" },
  "4e-3e": { image: "/ti-margo/animations/bravo.png", fond: "bg-sky-300", phrase: "Je calcule, je vérifie" },
  lycee: { image: "/ti-margo/animations/reflechit.png", fond: "bg-violet-300", phrase: "Je démontre, je doute" },
  adultes: { image: "/ti-margo/ti-margo-magazine.png", fond: "bg-rose-300", phrase: "Parents, profs, curieux" },
};

/* ⚠️ Le serveur ne sait pas si un profil est gardé : il rend l'écran des
   profils PAR-DESSUS le journal (le contenu reste dans la page, pour les
   moteurs). Un tout petit script, exécuté avant l'affichage, le cache chez
   celui qui a déjà choisi : pas d'écran qui clignote chaque matin. */
// ⛔ Pas d'attribut posé sur <html> ou <body> (erreur d'hydratation) : le script
// ajoute une règle de style dans l'en-tête, que React ne compare pas.
const SCRIPT_PROFIL = `try{if(localStorage.getItem("${CLE_NIVEAU}")||/[?&]niveau=/.test(location.search)){var s=document.createElement("style");s.textContent='[data-ecran-profils="auto"]{display:none}';document.head.appendChild(s)}}catch(e){}`;

function EcranProfils({
  mode,
  actuel,
  propose,
  surChoix,
  surFermer,
}: {
  /** « auto » : à l'arrivée (caché par le script si un profil est gardé) ; « manuel » : bouton « Changer de profil ». */
  mode: "auto" | "manuel";
  actuel: NiveauJournal | null;
  /** La classe de l'élève connecté, mise en avant. */
  propose: NiveauJournal | null;
  surChoix: (n: NiveauJournal) => void;
  surFermer: (() => void) | null;
}) {
  return (
    <div
      data-ecran-profils={mode}
      role="dialog"
      aria-modal="true"
      aria-label="Qui lit aujourd'hui ?"
      className="fixed inset-0 z-[90] overflow-y-auto bg-[#faf6ec] px-4 py-8 text-stone-900 sm:py-12"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-serif text-xl font-black tracking-tight sm:text-2xl">Le Journal d&rsquo;EleveAI</p>
        <p className="font-serif text-sm italic text-stone-700 sm:text-base">Comprendre le monde, et le changer</p>
        <h2 className="mt-6 font-serif text-[2rem] font-black leading-tight tracking-tight sm:text-6xl">
          Qui lit aujourd&rsquo;hui&nbsp;?
        </h2>
        <p className="mt-2 font-serif text-lg text-stone-700">Choisis ton niveau : le journal s&rsquo;écrit pour toi.</p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {NIVEAUX.map((n) => {
            const p = PROFILS[n.id];
            const mis = n.id === (actuel ?? propose);
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => surChoix(n.id)}
                className={`group rounded-2xl border-[3px] bg-white p-3 text-center transition hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-4 focus-visible:outline-red-700 ${
                  mis ? "border-red-700 shadow-lg" : "border-stone-900"
                }`}
              >
                <span className={`flex aspect-square items-center justify-center rounded-xl ${p.fond}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt="" className="h-4/5 w-4/5 object-contain transition group-hover:scale-105" />
                </span>
                <span className="mt-3 block font-serif text-2xl font-black leading-tight sm:text-3xl">{n.libelle}</span>
                <span className="block text-sm font-bold text-stone-600">{n.age}</span>
                <span className="mt-1 hidden font-serif text-sm italic text-stone-700 sm:block">{p.phrase}</span>
                {mis && (
                  <span className="mt-1 block text-xs font-bold uppercase tracking-widest text-red-700">
                    {actuel ? "Ton profil" : "Ta classe"}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {surFermer && (
          <button
            type="button"
            onClick={surFermer}
            className="mt-8 rounded-full border-2 border-stone-900 bg-white px-5 py-2 font-serif text-lg font-bold hover:bg-stone-100"
          >
            Garder mon profil
          </button>
        )}
      </div>
    </div>
  );
}

/** Deux éditions, le monde ou l'île (« tu me crées une version île de La Réunion »). */
function InterrupteurEdition({ ile, surChoix }: { ile: boolean; surChoix: (ile: boolean) => void }) {
  const bouton = (actif: boolean) =>
    `whitespace-nowrap rounded-full px-3 py-1.5 font-serif text-[15px] font-black transition sm:px-4 sm:text-base ${
      actif ? "bg-stone-900 text-white" : "text-stone-900 hover:bg-stone-200"
    }`;
  return (
    <div role="group" aria-label="Choisis ton édition" className="flex gap-1 rounded-full border-2 border-stone-900 bg-white p-1">
      <button type="button" aria-pressed={!ile} onClick={() => surChoix(false)} className={bouton(!ile)}>
        🌍 Le monde
      </button>
      <button type="button" aria-pressed={ile} onClick={() => surChoix(true)} className={bouton(ile)}>
        🌋 Île de La Réunion
      </button>
    </div>
  );
}

/* ── Les rangées et les cartes ────────────────────────────────────────────── */

function Rangee({ id, titre, sous, children }: { id?: string; titre: string; sous?: string; children: ReactNode }) {
  return (
    <section id={id} aria-label={titre} className="mt-9 scroll-mt-24">
      <h2 className="flex flex-wrap items-baseline gap-x-3 border-b-[3px] border-stone-900 pb-1 font-serif text-2xl font-black text-stone-900 sm:text-3xl">
        {titre}
        {sous && <span className="font-serif text-sm font-normal italic text-stone-600 sm:text-base">{sous}</span>}
      </h2>
      {/* Défilement horizontal : au doigt, à la molette (Maj), aux flèches. */}
      <div data-rangee className="-mx-4 mt-3 flex snap-x scroll-px-4 gap-4 overflow-x-auto px-4 pb-3">
        {children}
      </div>
    </section>
  );
}

const CARTE =
  "group w-[15.5rem] shrink-0 snap-start overflow-hidden rounded-lg border-2 border-stone-900 bg-white text-left transition hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-4 focus-visible:outline-red-700";

function CarteArticle({
  a,
  petit,
  etat,
  surOuvrir,
  variante = "article",
  video,
}: {
  a: Article;
  petit: boolean;
  etat?: "commence" | "fini";
  surOuvrir: () => void;
  /** 13/11 : la vignette de la vidéo de l'article, à la place de l'émoji. */
  video?: VideoJournal;
  /** Ce que la carte met en avant : l'article, son geste, son défi ou ses maths. */
  variante?: "article" | "changer" | "defi" | "maths";
}) {
  const titre =
    variante === "changer" ? a.agir : variante === "defi" ? a.defi.question : variante === "maths" ? a.maths.titre : a.titre;
  const etiquette =
    variante === "changer" ? "Et toi, tu peux…" : variante === "defi" ? "🎯 Le défi" : variante === "maths" ? "Les maths derrière" : a.rubrique;
  return (
    <button type="button" data-carte onClick={surOuvrir} className={CARTE}>
      <span className="relative block">
        {video ? (
          <span className={`relative block aspect-video w-full overflow-hidden bg-gradient-to-br ${FOND_RUBRIQUE[a.rubrique]}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={video.vignette}
              alt=""
              loading="lazy"
              className={`h-full w-full transition duration-300 group-hover:scale-105 ${video.short ? "object-contain" : "object-cover"}`}
            />
            <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-red-700 px-2.5 py-1 text-xs font-black text-white shadow">
              <Play className="h-3 w-3" fill="currentColor" aria-hidden="true" /> {video.short ? "Short" : "Vidéo"}
            </span>
          </span>
        ) : (
          <ImageCarte fond={FOND_RUBRIQUE[a.rubrique]} dessin={dessinDe(a)} />
        )}
        {etat && (
          <span className="absolute left-2 top-2 rounded-full bg-white px-2 py-0.5 text-xs font-black text-stone-900 shadow">
            {etat === "fini" ? "✓ Lu" : "À finir"}
          </span>
        )}
      </span>
      <span className="block p-3">
        <span className="block text-[11px] font-bold uppercase tracking-[0.15em] text-red-700">{etiquette}</span>
        <span className={`mt-1 line-clamp-4 font-serif font-black leading-tight text-stone-900 ${petit ? "text-xl" : "text-lg"}`}>
          {titre}
        </span>
        {variante === "maths" && (
          <span className="mt-1 line-clamp-2 font-mono text-xs text-stone-700">{a.maths.lignes[0]}</span>
        )}
        <span className="mt-2 block text-xs font-bold text-stone-600">
          {variante === "article" ? `${minutes(a, petit)} min de lecture` : a.titre}
        </span>
      </span>
    </button>
  );
}

/** Une carte sans article : un défi, une mission, un chiffre. */
function CarteSimple({
  fond,
  dessin,
  etiquette,
  titre,
  pied,
  surOuvrir,
}: {
  fond: string;
  dessin: string;
  etiquette: string;
  titre: string;
  pied?: string;
  surOuvrir: () => void;
}) {
  return (
    <button type="button" data-carte onClick={surOuvrir} className={CARTE}>
      <ImageCarte fond={fond} dessin={dessin} />
      <span className="block p-3">
        <span className="block text-[11px] font-bold uppercase tracking-[0.15em] text-red-700">{etiquette}</span>
        <span className="mt-1 line-clamp-3 font-serif text-lg font-black leading-tight text-stone-900">{titre}</span>
        {pied && <span className="mt-2 block text-xs font-bold text-stone-600">{pied}</span>}
      </span>
    </button>
  );
}

/* ── Le lecteur : une fenêtre par-dessus la galerie ───────────────────────── */
function Fenetre({ titre, surFermer, children }: { titre: string; surFermer: () => void; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const avant = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    const touche = (e: KeyboardEvent) => {
      if (e.key === "Escape") surFermer();
    };
    document.addEventListener("keydown", touche);
    const defilement = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", touche);
      document.body.style.overflow = defilement;
      avant?.focus?.();
    };
  }, [surFermer]);
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-stone-900/70 sm:p-6" onClick={surFermer}>
      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={titre}
        onClick={(e) => e.stopPropagation()}
        className="relative mx-auto min-h-full w-full max-w-3xl bg-[#faf6ec] p-4 pt-16 text-stone-900 shadow-2xl outline-none sm:min-h-0 sm:rounded-lg sm:p-8 sm:pt-16"
      >
        <button
          type="button"
          onClick={surFermer}
          className="absolute right-3 top-3 rounded-full border-2 border-stone-900 bg-white px-4 py-1.5 font-serif text-base font-bold hover:bg-stone-100"
        >
          Fermer ✕
        </button>
        {children}
      </div>
    </div>
  );
}

function LecteurArticle({
  a,
  petit,
  ancre,
  surFini,
  coach,
  videos,
}: {
  a: Article;
  petit: boolean;
  ancre?: "maths" | "defi" | "changer";
  surFini: () => void;
  coach?: Entrainement;
  videos?: VideosArticle;
}) {
  useEffect(() => {
    if (ancre) document.getElementById(`lecteur-${ancre}`)?.scrollIntoView({ block: "center" });
  }, [ancre, a.id]);
  // La vidéo en tête de l'article ; l'émoji seulement s'il n'y en a pas.
  const avecVideo = Boolean(videos?.paysage || videos?.short);
  return (
    <>
      {!avecVideo && <ImageCarte fond={FOND_RUBRIQUE[a.rubrique]} dessin={dessinDe(a)} grand />}
      <div className={avecVideo ? "" : "mt-4"}>
        <ArticleUne a={a} petit={petit} duree={minutes(a, petit)} surFini={surFini} coach={coach} videos={videos} deplie={Boolean(ancre)} />
      </div>
    </>
  );
}

/** Un article du jour, posé sur la page comme la Une (13/11/2026) : la vidéo
 *  (paysage + short), le titre et le chapô avec Regarder / Lire / Écouter, puis
 *  le défi en QCM, sans rien ouvrir. « Lire » ouvre l'article entier. */
function ArticleDuJour({
  a,
  une,
  inverse,
  libelle,
  petit,
  videos,
  surOuvrir,
  surFini,
}: {
  a: Article;
  une: boolean;
  inverse: boolean;
  libelle: string;
  petit: boolean;
  videos?: VideosArticle;
  surOuvrir: () => void;
  surFini: () => void;
}) {
  const avecVideo = Boolean(videos?.paysage || videos?.short);
  return (
    <article aria-label={`${une ? "À la Une" : "Aujourd'hui"} : ${a.titre}`} className={une ? "mt-6" : "mt-10 border-t-[3px] border-stone-900 pt-6"}>
      <div className="grid items-center gap-5 md:grid-cols-2 md:gap-8">
        <div className={inverse ? "md:order-2" : ""}>
          {avecVideo ? (
            <div className="overflow-hidden rounded-lg border-[3px] border-stone-900 bg-white p-2">
              <BlocVideos v={videos} petit={petit} />
            </div>
          ) : (
            <button
              type="button"
              onClick={surOuvrir}
              aria-label={`Lire : ${a.titre}`}
              className="w-full overflow-hidden rounded-lg border-[3px] border-stone-900 transition hover:shadow-xl"
            >
              <ImageCarte fond={FOND_RUBRIQUE[a.rubrique]} dessin={dessinDe(a)} grand />
            </button>
          )}
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-700">
            {une ? "À la Une" : "Aujourd'hui"} · {a.rubrique} · {libelle}
          </p>
          <h2
            className={`mt-2 font-serif font-black leading-[1.05] tracking-tight text-stone-900 ${
              une ? "text-3xl sm:text-5xl" : "text-2xl sm:text-4xl"
            }`}
          >
            {insecable(a.titre)}
          </h2>
          <p className={`mt-3 font-serif font-semibold leading-snug text-stone-800 ${petit ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"}`}>
            {a.chapo}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Regarder videos={videos} quoi={une ? "une" : "article"} />
            <button
              type="button"
              onClick={surOuvrir}
              className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-2.5 font-serif text-xl font-black text-white hover:bg-stone-700"
            >
              <BookOpen className="h-5 w-5" aria-hidden="true" /> Lire
            </button>
            <Ecouter a={a} grand />
          </div>
        </div>
      </div>
      <div className="mt-5">
        <DefiArticle a={a} surFini={surFini} />
      </div>
    </article>
  );
}

/** Les flèches du clavier : ← → dans la rangée, ↑ ↓ d'une rangée à l'autre. */
function auClavier(e: React.KeyboardEvent<HTMLElement>) {
  if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].includes(e.key)) return;
  const carte = (e.target as HTMLElement).closest<HTMLElement>("[data-carte]");
  const rangee = carte?.closest<HTMLElement>("[data-rangee]");
  if (!carte || !rangee) return;
  const cartes = [...rangee.querySelectorAll<HTMLElement>("[data-carte]")];
  const i = cartes.indexOf(carte);
  let cible: HTMLElement | undefined;
  if (e.key === "ArrowRight") cible = cartes[i + 1];
  else if (e.key === "ArrowLeft") cible = cartes[i - 1];
  else {
    const rangees = [...e.currentTarget.querySelectorAll<HTMLElement>("[data-rangee]")];
    const autre = rangees[rangees.indexOf(rangee) + (e.key === "ArrowDown" ? 1 : -1)];
    const l = autre ? [...autre.querySelectorAll<HTMLElement>("[data-carte]")] : [];
    cible = l[Math.min(i, l.length - 1)];
  }
  if (!cible) return;
  e.preventDefault();
  cible.focus();
  cible.scrollIntoView({ block: "nearest", inline: "nearest" });
}

/* ═══ LA PAGE ═════════════════════════════════════════════════════════════ */

type Ouvert =
  | { quoi: "article"; id: string; ancre?: "maths" | "defi" | "changer" }
  | { quoi: "defi" }
  | { quoi: "mission"; id: string }
  | null;

export default function JournalClient(props: {
  date: string;
  numero: number;
  une: UneProps;
  jour: number;
  demain: { titre: string; classe: string };
  theme: Theme | null;
  /** Les six éditions du jour (donnees.ts), monde et île. */
  editions: Record<NiveauJournal, EditionDuNiveau>;
  editionsReunion: Record<NiveauJournal, EditionDuNiveau>;
  tousArticles: Article[];
  /** article → profil → la série du coach où s'entraîner. */
  entrainements: Record<string, Partial<Record<NiveauJournal, Entrainement>>>;
  /** article → profil → sa paysage et son short (13/11/2026). */
  videosArticles?: Record<string, Partial<Record<NiveauJournal, VideosArticle>>>;
  missions: Mission[];
  metiers: Metier[];
}) {
  const mise: Mise = "quotidien";
  const t = TON[mise];
  const { date, numero, jour, une, demain, theme, editions, editionsReunion, tousArticles, entrainements, missions, metiers } = props;
  const videosArticles = props.videosArticles ?? {};

  // Le profil : null tant qu'on ne sait pas (l'écran des profils est devant).
  const { eleve } = useEleve();
  const [niveau, setNiveau] = useState<NiveauJournal>(NIVEAU_PAR_DEFAUT);
  const [profils, setProfils] = useState<"auto" | "manuel" | null>("auto");
  const [choisi, setChoisi] = useState(false);
  const [propose, setPropose] = useState<NiveauJournal | null>(null);
  useEffect(() => {
    const garde = lireNiveauGarde();
    if (garde) {
      setNiveau(garde);
      setChoisi(true);
      setProfils(null);
    } else {
      // Rien de valable n'est gardé : on demande, même si le script a cru
      // voir un choix (« manuel » n'est jamais caché par sa règle de style).
      setProfils("manuel");
    }
  }, []);
  useEffect(() => {
    setPropose(niveauDeLaClasse(eleve?.classe) ?? niveauDeLAccueil());
  }, [eleve?.classe]);
  const choisir = (n: NiveauJournal) => {
    setNiveau(n);
    setChoisi(true);
    setProfils(null);
    try {
      localStorage.setItem(CLE_NIVEAU, n);
    } catch {}
    track("journal_niveau", { niveau: n });
    window.scrollTo(0, 0);
  };

  // Le monde ou l'île (?edition=reunion, puis le choix gardé).
  const [ile, setIle] = useState(false);
  useEffect(() => {
    const garde = lireIleGardee();
    if (garde !== null) setIle(garde);
  }, []);
  const choisirIle = (oui: boolean) => {
    setIle(oui);
    try {
      localStorage.setItem(CLE_EDITION, oui ? "reunion" : "monde");
    } catch {}
    track("journal_edition", { edition: oui ? "reunion" : "monde" });
  };

  // « Continuer à lire » : les articles ouverts, gardés dans le navigateur.
  const [lus, setLus] = useState<Record<string, "commence" | "fini">>({});
  useEffect(() => {
    try {
      const l = JSON.parse(localStorage.getItem(CLE_LUS) ?? "{}") as Record<string, "commence" | "fini">;
      if (l && typeof l === "object") setLus(l);
    } catch {}
  }, []);
  const noter = useCallback((id: string, etat: "commence" | "fini") => {
    setLus((avant) => {
      if (avant[id] === etat || (avant[id] === "fini" && etat === "commence")) return avant;
      const apres = { ...avant, [id]: etat };
      try {
        localStorage.setItem(CLE_LUS, JSON.stringify(apres));
      } catch {}
      return apres;
    });
  }, []);

  const [ouvert, setOuvert] = useState<Ouvert>(null);
  const fermer = useCallback(() => setOuvert(null), []);
  const ouvrir = (a: Article, rangee: string, ancre?: "maths" | "defi" | "changer") => {
    noter(a.id, "commence");
    setOuvert({ quoi: "article", id: a.id, ancre });
    track("journal_carte", { rangee, article: a.id, niveau });
  };

  const e = (ile ? editionsReunion : editions)[niveau];
  const petit = PETIT_NIVEAU.has(niveau);
  const libelle = NIVEAUX.find((n) => n.id === niveau)?.libelle ?? niveau;
  const parId = useMemo(() => new Map(tousArticles.map((a) => [a.id, a])), [tousArticles]);
  // Tous les articles du profil, dans l'édition choisie ; ceux du jour d'abord.
  const duJour = [e.une, ...e.autres].map((id) => parId.get(id)).filter((a): a is Article => Boolean(a));
  const duProfil = tousArticles.filter((a) => a.niveaux.includes(niveau) && Boolean(a.reunion) === ile);
  const autres = duProfil.filter((a) => !duJour.includes(a));
  const tous = [...duJour, ...autres];
  const aLaUne = duJour[0];
  const aFinir = tous.filter((a) => lus[a.id] === "commence");
  const missionsDuProfil = [
    e.mission,
    ...missions.filter(
      (m) => m.id !== e.mission.id && m.niveaux.includes(niveau) && (m.genre === "bonne-action" || Boolean(m.reunion) === ile),
    ),
  ];
  // Les vidéos des articles, pour ce profil (13/11/2026).
  const videosDe = (a: Article) => videosArticles[a.id]?.[niveau];
  const vid = (a: Article) => videosDe(a)?.paysage ?? videosDe(a)?.short;
  // La rangée « En vidéo » : les paysages des autres articles du jour, la vidéo
  // du jour, puis les shorts (défis du niveau, ceux des articles). Sans doublon,
  // et sans les vidéos déjà montrées par la Une.
  const aRegarder = (() => {
    const deja = new Set(
      duJour.flatMap((a) => [videosDe(a)?.paysage?.id, videosDe(a)?.short?.id]).filter(Boolean) as string[],
    );
    const l: VideoJournal[] = [];
    const ajoute = (v?: VideoJournal | null) => {
      if (v && !deja.has(v.id)) {
        deja.add(v.id);
        l.push(v);
      }
    };
    // La vidéo du jour est tirée pour tout le site : seulement si elle est de
    // la classe du profil (13/11 : une vidéo de 2de montrée aux 6e-5e).
    if (CLASSES_VIDEO_DU_JOUR[niveau].includes(une.classe)) ajoute(une.paysage);
    e.shorts.forEach(ajoute);
    return l.slice(0, 10);
  })();
  const articleOuvert = ouvert?.quoi === "article" ? parId.get(ouvert.id) : undefined;
  const missionOuverte = ouvert?.quoi === "mission" ? missionsDuProfil.find((m) => m.id === ouvert.id) : undefined;

  return (
    <Source.Provider value="journal">
      <script dangerouslySetInnerHTML={{ __html: SCRIPT_PROFIL }} />
      {profils && (
        <EcranProfils
          mode={profils}
          actuel={choisi ? niveau : null}
          propose={propose}
          surChoix={choisir}
          surFermer={choisi ? () => setProfils(null) : null}
        />
      )}
      <div className={`min-h-screen ${t.page}`}>
        <main className={`mx-auto w-full px-4 py-6 sm:py-8 ${t.conteneur}`} onKeyDown={auClavier}>
          <Manchette date={date} numero={numero} ile={ile} />

          {/* Le profil et l'édition : toujours à portée de main. */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 border-b border-stone-900 pb-4">
            <button
              type="button"
              onClick={() => setProfils("manuel")}
              className="flex items-center gap-2 rounded-full border-2 border-stone-900 bg-white py-1 pl-1 pr-4 font-serif text-base font-black hover:bg-stone-100"
            >
              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${PROFILS[niveau].fond}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={PROFILS[niveau].image} alt="" className="h-7 w-7 object-contain" />
              </span>
              {libelle}
              <span className="font-normal italic text-stone-600">· changer de profil</span>
            </button>
            <InterrupteurEdition ile={ile} surChoix={choisirIle} />
          </div>

          {/* LA GRANDE UNE, puis LES AUTRES NOUVELLES DU JOUR, toutes faites pareil
              (13/11, Frédéric : « j'aime lorsqu'il y a la vidéo, l'article à lire
              ou à écouter et le défi en QCM », « comme à la Une », « fais pareil
              pour les autres ») : vidéo · article (Lire / Écouter) · QCM. */}
          {duJour.map((a, i) => (
            <ArticleDuJour
              key={a.id}
              a={a}
              une={i === 0}
              inverse={i % 2 === 1}
              libelle={libelle}
              petit={petit}
              videos={videosDe(a)}
              surOuvrir={() => ouvrir(a, i === 0 ? "une" : "nouveau")}
              surFini={() => noter(a.id, "fini")}
            />
          ))}

          {/* « En vidéo » : la vidéo du jour et les shorts de défi du niveau (les
              vidéos des articles du jour sont déjà dans leurs blocs). */}
          {aRegarder.length > 0 && (
            <Rangee titre="En vidéo" sous={`à regarder, puis à t’entraîner · ${libelle}`}>
              {aRegarder.map((v) => (
                <div key={v.id} className={`shrink-0 snap-start ${v.short ? "w-36 sm:w-40" : "w-72 sm:w-80"}`}>
                  <Vignette v={v} mise={mise} quoi={v.short ? "shorts" : "une"} />
                  <p className="mt-1.5 line-clamp-3 font-serif text-sm font-semibold leading-snug text-stone-800">
                    {v.id === une.paysage?.id && <span className="font-black text-red-700">La vidéo du jour · {une.classe} : </span>}
                    {titreCourt(v.titre)}
                  </p>
                </div>
              ))}
            </Rangee>
          )}

          {aFinir.length > 0 && (
            <Rangee titre="Continuer à lire">
              {aFinir.map((a) => (
                <CarteArticle key={a.id} a={a} petit={petit} etat="commence" video={vid(a)} surOuvrir={() => ouvrir(a, "continuer")} />
              ))}
            </Rangee>
          )}

          <Rangee id="comprendre" titre="Comprendre" sous="le monde, avec les maths">
            {tous.map((a) => (
              <CarteArticle key={a.id} a={a} petit={petit} etat={lus[a.id]} video={vid(a)} surOuvrir={() => ouvrir(a, "comprendre")} />
            ))}
          </Rangee>

          <Rangee id="changer" titre="Changer" sous="un geste à ta portée">
            {tous.map((a) => (
              <CarteArticle key={a.id} a={a} petit={petit} variante="changer" surOuvrir={() => ouvrir(a, "changer", "changer")} />
            ))}
          </Rangee>

          <Rangee id="defi" titre="Se tester" sous="un clic, et tu sais">
            <CarteSimple
              fond="from-yellow-300 to-amber-500"
              dessin="🎯"
              etiquette={`Le défi du jour · ${e.defi.classe}`}
              titre={e.defi.question}
              pied="Trois choix, une seule bonne réponse"
              surOuvrir={() => setOuvert({ quoi: "defi" })}
            />
            {tous.map((a) => (
              <CarteArticle key={a.id} a={a} petit={petit} variante="defi" surOuvrir={() => ouvrir(a, "defi", "defi")} />
            ))}
          </Rangee>


          <Rangee id="agir" titre="Agir" sous="un défi dehors, une bonne action">
            {missionsDuProfil.map((m, i) => (
              <CarteSimple
                key={m.id}
                fond={m.genre === "dehors" ? "from-lime-400 to-emerald-700" : "from-sky-300 to-blue-700"}
                dessin={m.genre === "dehors" ? "🌳" : "🤝"}
                etiquette={`${i === 0 ? "Aujourd'hui · " : ""}${m.genre === "dehors" ? "Le défi dehors" : "La bonne action"}`}
                titre={m.titre}
                pied={m.niveau}
                surOuvrir={() => {
                  setOuvert({ quoi: "mission", id: m.id });
                  track("journal_carte", { rangee: "agir", mission: m.id, niveau });
                }}
              />
            ))}
          </Rangee>

          <Rangee id="demain" titre="Penser à demain" sous="un métier, et les maths qui lui servent">
            {metiers.map((m) => (
              <Lien key={m.nom} href={m.href} quoi="metier" mise={mise} className={CARTE} carte>
                <ImageCarte fond="from-teal-300 to-emerald-700" dessin="🧭" />
                <span className="block p-3">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.15em] text-red-700">Et plus tard ?</span>
                  <span className="mt-1 block font-serif text-lg font-black leading-tight text-stone-900">{m.nom}</span>
                  <span className="mt-1 line-clamp-3 font-serif text-sm leading-snug text-stone-800">{m.maths}</span>
                  <span className="mt-2 block text-xs font-bold text-stone-600">Apprendre : {m.notion}</span>
                </span>
              </Lien>
            ))}
          </Rangee>

          <Rangee titre="Les chiffres clés">
            {e.chiffresRangee.map((c) => (
              <div
                key={c.chiffre}
                data-carte
                tabIndex={0}
                className="w-[15.5rem] shrink-0 snap-start rounded-lg border-2 border-stone-900 bg-white p-4 focus-visible:outline focus-visible:outline-4 focus-visible:outline-red-700"
              >
                <p className="font-serif text-4xl font-black leading-none tracking-tight text-stone-900">{c.chiffre}</p>
                <p className={`mt-3 font-serif leading-snug text-stone-800 ${petit ? "text-lg" : "text-[15px]"}`}>{c.texte}</p>
              </div>
            ))}
          </Rangee>

          <Rangee titre="Les maths derrière" sous="le calcul de chaque article">
            {tous.map((a) => (
              <CarteArticle key={a.id} a={a} petit={petit} variante="maths" surOuvrir={() => ouvrir(a, "maths", "maths")} />
            ))}
          </Rangee>

          {/* Frédéric, 10/11 : « garde les rituels ». */}
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Rituels mise={mise} />
            </div>
            <div className="lg:col-span-5 lg:border-l lg:border-stone-300 lg:pl-8">
              <RendezVous mise={mise} jour={jour} demain={demain} hier={e.hier} />
            </div>
          </div>

          <footer className="pt-10">
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-xs opacity-70">
              {PIED.map((l) => (
                <li key={l.href}>
                  <Lien href={l.href} quoi="pied" mise={mise} className="hover:underline">
                    {l.label}
                  </Lien>
                </li>
              ))}
            </ul>
          </footer>
        </main>
      </div>

      {articleOuvert && ouvert?.quoi === "article" && (
        <Fenetre titre={articleOuvert.titre} surFermer={fermer}>
          <LecteurArticle
            key={articleOuvert.id}
            a={articleOuvert}
            petit={petit}
            ancre={ouvert.ancre}
            surFini={() => noter(articleOuvert.id, "fini")}
            coach={entrainements[articleOuvert.id]?.[niveau]}
            videos={videosDe(articleOuvert)}
          />
        </Fenetre>
      )}
      {ouvert?.quoi === "defi" && (
        <Fenetre titre="Le défi du jour" surFermer={fermer}>
          <DefiDuJour key={niveau} mise={mise} jour={jour} defi={e.defi} theme={theme} parmi={DEFIS_DU_NIVEAU[niveau]} />
        </Fenetre>
      )}
      {missionOuverte && (
        <Fenetre titre={missionOuverte.titre} surFermer={fermer}>
          <MissionDuJour m={missionOuverte} />
        </Fenetre>
      )}
    </Source.Provider>
  );
}
