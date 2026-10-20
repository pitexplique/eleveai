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

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { track } from "@vercel/analytics";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Camera,
  Clapperboard,
  ClipboardCheck,
  GraduationCap,
  Languages,
  PenLine,
  Play,
  Printer,
  Projector,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import type { ChiffreDuJour, Metier } from "@/lib/accueil/journal";
import ArriveeDiagonale from "@/components/accueil/dessins/ArriveeDiagonale";
import { genererDefi, type DefiGenere, type Theme } from "@/lib/accueil/defis";
import RechercheEntete from "@/components/accueil/RechercheEntete";
import BanniereCrpe from "@/components/accueil/BanniereCrpe";

export type VideoJournal = { id: string; titre: string; short: boolean; vignette: string };

type Mise = "quotidien" | "magazine" | "fil";

const MISES: { id: Mise; label: string; texte: string }[] = [
  { id: "quotidien", label: "Quotidien", texte: "Le vrai journal, en colonnes" },
  { id: "magazine", label: "Magazine", texte: "Des cartes de couleur" },
  { id: "fil", label: "Fil", texte: "Une colonne, comme sur téléphone" },
];

const CLE_MISE = "eleveai.journal.mise";
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
  rdv: "bg-amber-100",
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
}: {
  href: string;
  quoi: Rubrique | "manchette" | "pied";
  mise: Mise;
  className?: string;
  children: ReactNode;
  label?: string;
}) {
  const sep = href.includes("?") ? "&" : "?";
  const de = useContext(Source);
  return (
    <Link
      prefetch={false}
      href={`${href}${sep}from=${de}`}
      aria-label={label}
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
    <Lien href={`/video/${v.id}`} quoi={quoi} mise={mise} className="group block" label={`Regarder : ${v.titre}`}>
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

const PROMESSES = [
  { ancre: "#apprendre", texte: "Apprendre une chose utile", couleur: "bg-blue-600 text-white" },
  { ancre: "#entrainer", texte: "S'entraîner", couleur: "bg-red-600 text-white" },
  { ancre: "#demain", texte: "Penser à demain", couleur: "bg-yellow-400 text-yellow-950" },
];

function Manchette({ mise, date, numero }: { mise: Mise; date: string; numero: number }) {
  if (mise === "quotidien") {
    return (
      <header className="border-b-[6px] border-double border-stone-900 pb-3 text-center sm:pb-4">
        <div className="flex items-center justify-between border-b border-stone-900 pb-1 text-[11px] font-bold uppercase tracking-widest text-stone-700">
          <span>{date}</span>
          <span className="hidden sm:inline">Du CP aux adultes</span>
          <span>N° {numero}</span>
        </div>
        <h1 className="mt-2 font-serif text-4xl font-black leading-none tracking-tight text-stone-900 sm:mt-3 sm:text-7xl">
          Le Journal EleveAI
          {/* ⚠️ LE h1 DE LA PAGE LA PLUS IMPORTANTE DU SITE : la marque se voit,
              la REQUÊTE se lit (Google, lecteurs d'écran) — la règle du 23/09
              (« un h1 qui dit la requête parle à ceux qui ne connaissent pas »). */}
          <span className="sr-only"> : cours, exercices corrigés et coach de maths, du CP aux adultes</span>
        </h1>
        <p className="mt-2 font-serif text-sm italic text-stone-700 sm:mt-3 sm:text-lg">
          Chaque jour, une chose utile à apprendre, de quoi s&rsquo;entraîner, et une idée pour demain.
        </p>
      </header>
    );
  }
  if (mise === "magazine") {
    return (
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-violet-600 to-rose-500 p-6 text-white shadow-xl sm:p-8">
        <div className="flex items-center gap-4 sm:gap-6">
          <Image
            src="/cahier-vacances/ti-margo.png"
            alt="Ti Margo"
            width={112}
            height={140}
            className="h-24 w-auto shrink-0 drop-shadow-xl sm:h-32"
            priority
          />
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-widest text-white/80">
              {date} · N° {numero}
            </p>
            <h1 className="mt-1 text-4xl font-black leading-none tracking-tight sm:text-6xl">
              Le Journal EleveAI
            </h1>
            <p className="mt-2 text-sm font-semibold text-white/90 sm:text-base">
              Pour les curieux du CP aux adultes.
            </p>
          </div>
        </div>
        <nav aria-label="Les trois promesses" className="mt-5 flex flex-wrap gap-2">
          {PROMESSES.map((p) => (
            <a key={p.ancre} href={p.ancre} className={`rounded-full px-4 py-2 text-sm font-black shadow ${p.couleur}`}>
              {p.texte}
            </a>
          ))}
        </nav>
      </header>
    );
  }
  return (
    <header className="flex items-center gap-3 px-1">
      <Image
        src="/cahier-vacances/ti-margo.png"
        alt="Ti Margo"
        width={56}
        height={70}
        className="h-14 w-auto shrink-0"
        priority
      />
      <div className="min-w-0">
        <h1 className="text-2xl font-black leading-tight text-slate-900">Le Journal EleveAI</h1>
        <p className="text-sm text-slate-600">
          {date} · apprendre, s&rsquo;entraîner, penser à demain
        </p>
      </div>
    </header>
  );
}

/* ═══ LES RUBRIQUES ═══════════════════════════════════════════════════════ */

type UneProps = { paysage: VideoJournal | null; short: VideoJournal | null; classe: string; utile: string | null };

function Une({ mise, une }: { mise: Mise; une: UneProps }) {
  const t = TON[mise];
  if (!une.paysage) return null;
  return (
    <Bloc mise={mise} quoi="une" rubrique={`À la Une · ${une.classe}`}>
      {/* ⛔ Toujours une PAYSAGE (donnees.ts écarte les shorts de la Une). */}
      <Vignette v={une.paysage} mise={mise} quoi="une" grande />
      <div className="mt-4 flex gap-4">
        <div className="min-w-0 flex-1">
          <h2 className={`${t.titre} text-xl leading-tight sm:text-3xl`}>
            <Lien href={`/video/${une.paysage.id}`} quoi="une" mise={mise} className="hover:underline">
              {une.paysage.titre}
            </Lien>
          </h2>
          {/* La phrase n'existe que pour les Unes écrites (l'édition de la
              semaine) ; un tirage du catalogue n'invente rien. */}
          {une.utile && (
            <p className={`${t.texte} mt-3 leading-snug sm:text-lg`}>
              <span className="font-black">Ce que tu vas apprendre : </span>
              {une.utile}
            </p>
          )}
          <p className="mt-4">
            <Lien href={`/video/${une.paysage.id}`} quoi="une" mise={mise} className={t.lien}>
              Regarder la vidéo
            </Lien>
          </p>
        </div>
        {une.short && (
          <div className="w-24 shrink-0 sm:w-28">
            <Vignette v={une.short} mise={mise} quoi="une" />
            <p className="mt-1.5 text-xs font-bold leading-tight text-current opacity-80">
              Le short : 1 minute, et ta réponse en commentaire
            </p>
          </div>
        )}
      </div>
    </Bloc>
  );
}

function DefiDuJour({
  mise,
  jour,
  defi,
  theme,
}: {
  mise: Mise;
  jour: number;
  defi: DefiGenere;
  theme: Theme | null;
}) {
  const t = TON[mise];
  // Le défi du JOUR vient du serveur : lié à la Une (écrit pour elle, ou généré
  // sur son thème). « Un autre défi » en fabrique d'autres SUR LE MÊME THÈME.
  const [i, setI] = useState(jour);
  const [choisi, setChoisi] = useState<number | null>(null);
  const d = useMemo(() => (i === jour ? defi : genererDefi(i * 31 + 7, theme)), [i, jour, defi, theme]);
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

function Chiffre({ mise, chiffre }: { mise: Mise; chiffre: ChiffreDuJour }) {
  const t = TON[mise];
  return (
    <Bloc mise={mise} quoi="chiffre" rubrique="Le chiffre du jour">
      {chiffre.dessin === "arrivee-diagonale" && (
        <figure className="mb-3">
          <ArriveeDiagonale className={mise === "quotidien" ? "" : "rounded-xl"} />
          <figcaption className="mt-1 text-xs italic opacity-70">Dessin EleveAI : l&rsquo;arrivée, sous le chrono.</figcaption>
        </figure>
      )}
      <p className={`${t.titre} text-5xl leading-none`}>{chiffre.chiffre}</p>
      <p className={`${t.texte} mt-3 leading-snug`}>{chiffre.texte}</p>
    </Bloc>
  );
}

function MetierDuJour({ mise, metier }: { mise: Mise; metier: Metier }) {
  const t = TON[mise];
  return (
    <div id="demain" className="scroll-mt-24">
      <Bloc mise={mise} quoi="metier" rubrique="Et plus tard ? Le métier du jour">
        <h2 className={`${t.titre} text-2xl leading-tight`}>{metier.nom}</h2>
        <p className={`${t.texte} mt-1 italic`}>{metier.fait}</p>
        <p className={`${t.texte} mt-3 leading-snug`}>
          <span className="font-black not-italic">Les maths qui lui servent : </span>
          {metier.maths}
        </p>
        <p className="mt-3">
          <Lien href={metier.href} quoi="metier" mise={mise} className={t.lien}>
            Apprendre : {metier.notion}
          </Lien>
        </p>
      </Bloc>
    </div>
  );
}

/* Les classes rangées par cycle, du plus grand au plus petit dans chaque cycle :
   c'est l'ordre de lecture de l'accueil (décision du 13/09, public lycée et
   collège d'abord). Couleurs des cycles = les trois primaires (07/10). */
const CYCLES = [
  {
    titre: "Lycée",
    couleur: "bg-blue-600 text-white hover:bg-blue-700",
    classes: [
      ["terminale-spe", "Term"],
      ["premiere-spe", "1re spé"],
      ["premiere", "1re"],
      ["seconde", "2de"],
      ["stmg", "STMG"],
    ],
  },
  {
    titre: "Collège",
    couleur: "bg-red-600 text-white hover:bg-red-700",
    classes: [
      ["3e", "3e"],
      ["4e", "4e"],
      ["5e", "5e"],
      ["6e", "6e"],
    ],
  },
  {
    titre: "Primaire",
    couleur: "bg-yellow-400 text-yellow-950 hover:bg-yellow-300",
    classes: [
      ["cm2", "CM2"],
      ["cm1", "CM1"],
      ["ce2", "CE2"],
      ["ce1", "CE1"],
      ["cp", "CP"],
    ],
  },
] as const;

const AUTRES_MATIERES = [
  { label: "Français", href: "/coach-ia/francais", Icone: PenLine },
  { label: "Anglais", href: "/coach-ia/anglais", Icone: Languages },
  { label: "Espagnol", href: "/coach-ia/espagnol", Icone: Languages },
  { label: "Économie", href: "/coach-ia/economie", Icone: Calculator },
  { label: "IA", href: "/coach-ia/ia", Icone: Sparkles },
  { label: "Photo d'un exercice", href: "/photo-exercice", Icone: Camera },
];

/** Les entraînements de MATHS hors coach — repris de l'ancien accueil
 *  (PanneauEvaluation et `LIEN_DANS_ACTIONS`). Routes vérifiées le 19/10. */
const EXAMENS = [
  { label: "Évaluation par chapitres", texte: "Coche un chapitre, plusieurs ou tout", href: "/parcours" },
  { label: "Automatismes", texte: "Brevet et 1re, sans calculatrice", href: "/automatismes-maths" },
  { label: "Brevet", texte: "Les exercices, notion par notion", href: "/coach-brevet" },
  { label: "Bac spécialité", texte: "Première et terminale", href: "/coach-bac-spe" },
  { label: "Évaluations nationales", texte: "6e et 4e, format réel", href: "/evaluation-nationale-college" },
];

function Coach({ mise }: { mise: Mise }) {
  const t = TON[mise];
  const etroit = mise === "fil";
  return (
    <div id="entrainer" className="scroll-mt-24">
      <Bloc mise={mise} quoi="coach" rubrique="S'entraîner avec le coach">
        <h2 className={`${t.titre} text-2xl leading-tight sm:text-3xl`}>Tu es en quelle classe ?</h2>
        <p className={`${t.texte} mt-1`}>
          Un clic, et le coach te pose des questions de maths à ta mesure, corrigées pas à pas. Il se lit et
          s&rsquo;écoute.
        </p>
        {/* ⭐ SUR ORDINATEUR, LES TROIS CYCLES SUR UNE SEULE LIGNE, séparés par
            un filet vertical (Frédéric, 20/10 : « essaie de tout mettre sur une
            ligne, réduis les espaces entre lycée, collège et primaire, ou mets
            une barre verticale — sur ordinateur, pas téléphone »). Au téléphone
            (et dans le Fil), les cycles restent empilés. */}
        <div className={`mt-4 flex flex-col gap-4 ${etroit ? "" : "lg:flex-row lg:items-start lg:gap-0"}`}>
          {CYCLES.map((c, i) => (
            <div
              key={c.titre}
              className={etroit ? "" : `lg:px-4 ${i === 0 ? "lg:pl-0" : "lg:border-l-2 lg:border-current/15"}`}
            >
              <p className="mb-2 text-sm font-black uppercase tracking-wide opacity-70">{c.titre}</p>
              <div className={`flex flex-wrap gap-2 ${etroit ? "" : "lg:flex-nowrap lg:gap-1.5"}`}>
                {c.classes.map(([id, label]) => (
                  <Lien
                    key={id}
                    href={`/coach-ia/maths?classe=${id}`}
                    quoi="coach"
                    mise={mise}
                    label={`Coach de maths, ${label}`}
                    className={`min-w-14 whitespace-nowrap rounded-xl px-3 py-2.5 text-center text-base font-black shadow-sm transition hover:-translate-y-0.5 ${etroit ? "" : "lg:min-w-0 lg:px-2.5 lg:py-2"} ${c.couleur}`}
                  >
                    {label}
                  </Lien>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* ⭐ 19/10/2026, Frédéric : « avant on avait automatisme en maths », « et
            même évaluation ». L'ancien accueil les portait dans sa ligne
            d'onglets (AccueilMatieres.tsx) ; le journal les avait perdus. */}
        <div className="mt-5 border-t border-current/15 pt-4">
          <p className="mb-2 text-sm font-black uppercase tracking-wide opacity-70">Évaluations et examens</p>
          <div className="flex flex-wrap gap-2">
            {EXAMENS.map(({ label, texte, href }) => (
              <Lien
                key={href}
                href={href}
                quoi="coach"
                mise={mise}
                className={`inline-flex flex-col rounded-xl px-3 py-2 text-left shadow-sm transition hover:-translate-y-0.5 ${t.bouton}`}
              >
                <span className="flex items-center gap-1.5 text-sm font-black">
                  <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
                  {label}
                </span>
                <span className="text-xs opacity-80">{texte}</span>
              </Lien>
            ))}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-current/15 pt-4">
          <span className="text-sm font-bold opacity-70">Et aussi :</span>
          {AUTRES_MATIERES.map(({ label, href, Icone }) => (
            <Lien
              key={href}
              href={href}
              quoi="coach"
              mise={mise}
              className="inline-flex items-center gap-1.5 rounded-full border border-current/25 bg-white/60 px-3 py-1.5 text-sm font-bold transition hover:bg-white"
            >
              <Icone className="h-4 w-4" aria-hidden="true" />
              {label}
            </Lien>
          ))}
        </div>
      </Bloc>
    </div>
  );
}

function Shorts({ mise, shorts }: { mise: Mise; shorts: VideoJournal[] }) {
  const t = TON[mise];
  if (shorts.length === 0) return null;
  return (
    <Bloc mise={mise} quoi="shorts" rubrique="Une minute pour être surpris">
      <div className="-mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-2">
        {shorts.map((v) => (
          <div key={v.id} className="w-32 shrink-0 snap-start sm:w-36">
            <Vignette v={v} mise={mise} quoi="shorts" />
            <p className={`${t.texte} mt-1.5 line-clamp-3 text-xs font-semibold leading-snug`}>
              {v.titre.replace(/#shorts?/gi, "").trim()}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-2">
        <Lien href="/video" quoi="shorts" mise={mise} className={t.lien}>
          Toutes les vidéos
        </Lien>
      </p>
    </Bloc>
  );
}

function Reel({ mise, reel }: { mise: Mise; reel: VideoJournal[] }) {
  const t = TON[mise];
  if (reel.length === 0) return null;
  // Un nombre PAIR de vignettes : la grille est à deux colonnes.
  const paysages = reel.filter((v) => !v.short).slice(0, 4);
  if (paysages.length % 2 === 1 && paysages.length > 1) paysages.pop();
  return (
    <Bloc mise={mise} quoi="reel" rubrique="Maths Réel : les maths sont dehors">
      <div className="grid grid-cols-2 gap-4">
        {paysages.map((v) => (
          <div key={v.id}>
            <Vignette v={v} mise={mise} quoi="reel" />
            <p className={`${t.texte} mt-1.5 line-clamp-3 text-sm font-bold leading-snug`}>{v.titre}</p>
          </div>
        ))}
      </div>
      <p className="mt-3">
        <Lien href="/maths-974" quoi="reel" mise={mise} className={t.lien}>
          Toutes les maths du réel
        </Lien>
      </p>
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

function Atelier({ mise }: { mise: Mise }) {
  const t = TON[mise];
  return (
    <Bloc mise={mise} quoi="atelier" rubrique="À toi de jouer">
      <div className="flex items-start gap-3">
        <Clapperboard className="h-10 w-10 shrink-0" aria-hidden="true" />
        <div>
          <h2 className={`${t.titre} text-xl leading-tight`}>Crée ta vidéo de maths</h2>
          <p className={`${t.texte} mt-1 leading-snug`}>
            Tu écris ton explication en français, elle s&rsquo;anime toute seule. La meilleure façon de
            comprendre, c&rsquo;est d&rsquo;expliquer.
          </p>
          <p className="mt-3">
            <Lien href="/atelier-video" quoi="atelier" mise={mise} className={t.lien}>
              Ouvrir l&rsquo;atelier vidéo
            </Lien>
          </p>
        </div>
      </div>
    </Bloc>
  );
}

const GRANDS = [
  { titre: "À projeter demain en classe", texte: "Le coach en mode classe, les vidéos, les rituels.", href: "/espace-profs", Icone: Projector },
  { titre: "Fiches d'exercices à imprimer", texte: "Une feuille A4 par notion, avec la correction.", href: "/fiches-exercices", Icone: Printer },
  { titre: "Préparer le CRPE", texte: "Les maths et le français du concours, et un test pour se situer.", href: "/formation-crpe", Icone: GraduationCap },
  { titre: "Reprendre les maths", texte: "Pour reprendre des études, ou aider ses enfants.", href: "/coach-ia/maths?classe=adulte", Icone: Calculator },
  { titre: "Parents", texte: "Accompagner sans faire à sa place.", href: "/parents", Icone: Users },
  { titre: "Fiches de cours", texte: "L'essentiel de chaque notion, un visuel par idée.", href: "/fiches-cours", Icone: BookOpen },
];

function Grands({ mise }: { mise: Mise }) {
  const t = TON[mise];
  return (
    <Bloc
      mise={mise}
      quoi="grands"
      rubrique="Le cahier des grands : profs, parents, adultes"
      className={mise === "quotidien" ? "bg-stone-200/50 px-4 pb-4" : ""}
    >
      <ul className={`grid gap-3 ${mise === "fil" ? "" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
        {GRANDS.map(({ titre, texte, href, Icone }) => (
          <li key={href}>
            <Lien
              href={href}
              quoi="grands"
              mise={mise}
              className="flex h-full items-start gap-3 rounded-xl bg-white/70 p-3 transition hover:bg-white"
            >
              <Icone className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <span>
                <span className={`${t.titre} block`}>{titre}</span>
                <span className={`${t.texte} block text-sm leading-snug`}>{texte}</span>
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

/* ═══ LE SÉLECTEUR DE MISE EN PAGE ═══════════════════════════════════════ */

function Selecteur({ mise, choisir }: { mise: Mise; choisir: (m: Mise) => void }) {
  return (
    <div className="border-b border-slate-200 bg-white/90 px-3 py-2">
      <div
        role="radiogroup"
        aria-label="Mise en page"
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2"
      >
        <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Mise en page :</span>
        {MISES.map((m) => (
          <button
            key={m.id}
            type="button"
            role="radio"
            aria-checked={mise === m.id}
            title={m.texte}
            onClick={() => choisir(m.id)}
            className={`rounded-full px-3 py-1 text-sm font-bold transition ${
              mise === m.id ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ═══ LA PAGE ═════════════════════════════════════════════════════════════ */

export default function JournalClient(props: {
  date: string;
  numero: number;
  une: UneProps;
  jour: number;
  demain: { titre: string; classe: string };
  defi: DefiGenere;
  theme: Theme | null;
  hier: { question: string; reponse: string };
  chiffre: ChiffreDuJour;
  metier: Metier;
  shorts: VideoJournal[];
  reel: VideoJournal[];
  /** Monté par /accueil : le Quotidien, sans sélecteur (son choix du 18/10). */
  accueil?: boolean;
}) {
  const [mise, setMise] = useState<Mise>("quotidien");
  const accueil = props.accueil ?? false;

  // ?mise= dans l'adresse l'emporte (pour lui envoyer un lien), sinon le
  // dernier choix du visiteur. Lu APRÈS l'hydratation : le serveur rend toujours
  // le Quotidien.
  useEffect(() => {
    if (accueil) return;
    const ok = (x: string | null): x is Mise => x === "quotidien" || x === "magazine" || x === "fil";
    const url = new URLSearchParams(window.location.search).get("mise");
    let garde: string | null = null;
    try {
      garde = localStorage.getItem(CLE_MISE);
    } catch {}
    if (ok(url)) setMise(url);
    else if (ok(garde)) setMise(garde);
  }, [accueil]);

  function choisir(m: Mise) {
    setMise(m);
    track("journal_mise", { mise: m });
    try {
      localStorage.setItem(CLE_MISE, m);
    } catch {}
    const u = new URL(window.location.href);
    u.searchParams.set("mise", m);
    window.history.replaceState(null, "", u);
  }

  const t = TON[mise];
  const { date, numero, jour, une, demain, defi, theme, hier, chiffre, metier, shorts, reel } = props;

  const blocs = {
    une: <Une mise={mise} une={une} />,
    defi: <DefiDuJour mise={mise} jour={jour} defi={defi} theme={theme} />,
    rdv: <RendezVous mise={mise} jour={jour} demain={demain} hier={hier} />,
    chiffre: <Chiffre mise={mise} chiffre={chiffre} />,
    metier: <MetierDuJour mise={mise} metier={metier} />,
    coach: <Coach mise={mise} />,
    shorts: <Shorts mise={mise} shorts={shorts} />,
    reel: <Reel mise={mise} reel={reel} />,
    rituels: <Rituels mise={mise} />,
    atelier: <Atelier mise={mise} />,
    grands: <Grands mise={mise} />,
  };

  return (
    <Source.Provider value={accueil ? "accueil" : "journal"}>
    <div className={`min-h-screen ${t.page}`}>
      {accueil ? (
        /* ⚠️ LE CHAMP DES TÉLÉPHONES : sous 640 px l'en-tête masque sa recherche
           (voir AccueilMatieres.tsx) ; sans cette ligne, aucune recherche. */
        <div className="border-b border-stone-300 bg-white px-3 py-2 sm:hidden">
          <RechercheEntete variante="page" />
        </div>
      ) : (
        <Selecteur mise={mise} choisir={choisir} />
      )}
      <main className={`mx-auto w-full px-4 py-6 sm:py-8 ${t.conteneur}`}>
        <Manchette mise={mise} date={date} numero={numero} />
        {/* La bande CRPE (ordinateur ; au téléphone elle est au-dessus de
            l'en-tête, posée par le layout). */}
        {accueil && (
          <div className="mt-4">
            <BanniereCrpe place="colonnes" />
          </div>
        )}
        {/* ⭐⭐ LE COACH EN PREMIER (Frédéric, 20/10/2026 : « il faut mettre en
            premier la section S'entraîner avec le coach : tu es en quelle
            classe, évaluation, examen et les matières, car c'est le cœur
            d'EleveAI », puis « juste en dessous de la pub pour le CRPE »). Sous la
            bande CRPE, avant la Une, dans les trois mises en page. */}
        <div className={mise === "fil" ? "mt-4" : "mt-6"}>{blocs.coach}</div>

        {mise === "quotidien" && (
          <div className="mt-6 space-y-8">
            <div id="apprendre" className="grid scroll-mt-24 gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">{blocs.une}</div>
              <aside className="space-y-8 lg:col-span-4 lg:border-l lg:border-stone-300 lg:pl-8">
                {blocs.defi}
                {blocs.chiffre}
                {blocs.rdv}
              </aside>
            </div>
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-4">{blocs.metier}</div>
              <div className="lg:col-span-8 lg:border-l lg:border-stone-300 lg:pl-8">{blocs.reel}</div>
            </div>
            {blocs.shorts}
            <div className="grid gap-8 md:grid-cols-12">
              <div className="md:col-span-7">{blocs.rituels}</div>
              <div className="md:col-span-5">{blocs.atelier}</div>
            </div>
            {blocs.grands}
          </div>
        )}

        {mise === "magazine" && (
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            <div id="apprendre" className="scroll-mt-24 lg:col-span-2 lg:row-span-2">
              {blocs.une}
            </div>
            {blocs.defi}
            {blocs.chiffre}
            {blocs.metier}
            <div className="lg:col-span-2">{blocs.reel}</div>
            <div className="lg:col-span-3">{blocs.shorts}</div>
            <div className="lg:col-span-3">{blocs.rdv}</div>
            <div className="lg:col-span-2">{blocs.rituels}</div>
            {blocs.atelier}
            <div className="lg:col-span-3">{blocs.grands}</div>
          </div>
        )}

        {mise === "fil" && (
          <div className="mt-4 space-y-4">
            <div id="apprendre" className="scroll-mt-24">
              {blocs.une}
            </div>
            {blocs.defi}
            {blocs.rdv}
            {blocs.metier}
            {blocs.shorts}
            {blocs.chiffre}
            {blocs.reel}
            {blocs.rituels}
            {blocs.atelier}
            {blocs.grands}
          </div>
        )}

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
    </Source.Provider>
  );
}
