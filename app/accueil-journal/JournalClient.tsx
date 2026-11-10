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
import { ArrowRight, BookOpen, Calculator, Languages, PenLine, Play, Trophy } from "lucide-react";
import type { ChiffreDuJour, Metier } from "@/lib/accueil/journal";
import type { Article, Mission } from "@/lib/accueil/articles";
import ArriveeDiagonale from "@/components/accueil/dessins/ArriveeDiagonale";
import { genererDefi, type DefiGenere, type Theme } from "@/lib/accueil/defis";

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

const SOMMAIRE = [
  { ancre: "#comprendre", texte: "Comprendre" },
  { ancre: "#changer", texte: "Changer" },
  { ancre: "#defi", texte: "Se tester" },
  { ancre: "#dehors", texte: "Agir" },
  { ancre: "#demain", texte: "Penser à demain" },
];

function Manchette({ date, numero }: { date: string; numero: number }) {
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
            Comprendre le monde, et le changer
          </p>
        </div>
      </div>
      <nav aria-label="Sommaire" className="mt-3 flex justify-center gap-4 text-xs font-bold uppercase tracking-widest text-stone-700 sm:text-sm">
        {SOMMAIRE.map((s) => (
          <a key={s.ancre} href={s.ancre} className="hover:text-red-700 hover:underline">
            {s.texte}
          </a>
        ))}
      </nav>
    </header>
  );
}

/* ═══ LES RUBRIQUES ═══════════════════════════════════════════════════════ */

type UneProps = { paysage: VideoJournal | null; short: VideoJournal | null; classe: string; utile: string | null };

function Une({ mise, une }: { mise: Mise; une: UneProps }) {
  const t = TON[mise];
  if (!une.paysage) return null;
  return (
    <Bloc mise={mise} quoi="une" rubrique={`La vidéo du jour · ${une.classe}`}>
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
    <Bloc mise={mise} quoi="chiffre" rubrique="Les chiffres clés">
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

/** « Les chiffres clés » (10/11/2026) : le chiffre du jour en grand, puis deux
 *  autres, comme l'encadré chiffré d'un quotidien. */
function ChiffresCles({ chiffre, autres }: { chiffre: ChiffreDuJour; autres: ChiffreDuJour[] }) {
  return (
    <div className="space-y-5">
      <Chiffre mise="quotidien" chiffre={chiffre} />
      {autres.map((c) => (
        <div key={c.chiffre} className="border-t border-stone-400 pt-3">
          <p className="font-serif text-3xl font-black leading-none tracking-tight text-stone-900">{c.chiffre}</p>
          <p className="mt-2 font-serif text-sm leading-snug text-stone-800">{c.texte}</p>
        </div>
      ))}
    </div>
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

function EncadreMaths({ a }: { a: Article }) {
  return (
    <aside className="border-2 border-stone-900 bg-white/70 p-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-700">Les maths derrière</p>
      <p className="mt-1 font-serif text-lg font-black leading-tight text-stone-900">{a.maths.titre}</p>
      <ul className="mt-2 space-y-1 font-mono text-[13px] leading-snug text-stone-800 sm:text-sm">
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
function DefiArticle({ a }: { a: Article }) {
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

function ArticleUne({ a }: { a: Article }) {
  return (
    <article aria-label={`À la Une : ${a.titre}`} className="border-t-[3px] border-stone-900 pt-3">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-700">À la Une · {a.rubrique}</p>
      <h2 className="mt-2 font-serif text-3xl font-black leading-[1.05] tracking-tight text-stone-900 sm:text-5xl">
        {a.titre}
      </h2>
      <p className="mt-3 font-serif text-lg font-semibold leading-snug text-stone-800 sm:text-xl">{a.chapo}</p>
      <div className="mt-5 grid gap-6 md:grid-cols-[1fr_16rem]">
        <div className="space-y-3 font-serif text-[17px] leading-relaxed text-stone-800 first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-6xl first-letter:font-black first-letter:leading-[0.85] first-letter:text-stone-900">
          {a.corps.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <EncadreMaths a={a} />
      </div>
      <div className="mt-5">
        <DefiArticle a={a} />
      </div>
      <div id="changer" className="mt-5 scroll-mt-24">
        <Agir a={a} />
      </div>
      <p className="mt-4 text-xs italic text-stone-500">Source : {a.source}</p>
    </article>
  );
}

function AutreNouvelle({ a }: { a: Article }) {
  const [ouvert, setOuvert] = useState(false);
  return (
    <article aria-label={a.titre} className="border-t-[3px] border-stone-900 pt-3">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-700">{a.rubrique}</p>
      <h3 className="mt-2 font-serif text-2xl font-black leading-tight tracking-tight text-stone-900">{a.titre}</h3>
      <p className="mt-2 font-serif leading-snug text-stone-800">{a.chapo}</p>
      {ouvert ? (
        <div className="mt-3 space-y-3">
          {a.corps.map((p) => (
            <p key={p} className="font-serif leading-relaxed text-stone-800">
              {p}
            </p>
          ))}
          <EncadreMaths a={a} />
          <DefiArticle a={a} />
          <Agir a={a} />
          <p className="text-xs italic text-stone-500">Source : {a.source}</p>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => {
            setOuvert(true);
            track("journal_clic", { rubrique: "article", article: a.id });
          }}
          className="mt-3 font-bold text-red-700 underline decoration-2 underline-offset-4 hover:text-red-900"
        >
          Lire l&rsquo;article et ses maths
        </button>
      )}
    </article>
  );
}

/** « Le défi dehors » ou « La bonne action du jour » (10/11/2026) : un jour
 *  l'un, un jour l'autre (lib/accueil/articles.ts, missionDuJour). */
function MissionDuJour({ m }: { m: Mission }) {
  const dehors = m.genre === "dehors";
  return (
    <section
      id="dehors"
      aria-label={dehors ? "Le défi dehors" : "La bonne action du jour"}
      className={`scroll-mt-24 border-[3px] p-5 ${dehors ? "border-emerald-800 bg-emerald-50" : "border-sky-800 bg-sky-50"}`}
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

/* ═══ LA PAGE ═════════════════════════════════════════════════════════════ */

// ⭐ 10/11/2026 — UN VRAI JOURNAL. Frédéric : « faut faire un vrai journal ! »,
// « le coach est donc inutile ». Une seule mise en page (le Quotidien, son
// choix du 18/10) ; le sélecteur Magazine / Fil, le bloc du coach, la chaîne
// vidéo, l'atelier et le cahier des grands sont partis (les rituels restent,
// « garde les rituels ») (version
// d'avant : git log de ce fichier). Ce qui reste : des ARTICLES sur le monde
// (lib/accueil/articles.ts), le chiffre, le défi, la vidéo, les métiers.
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
  chiffresCles: ChiffreDuJour[];
  metier: Metier;
  shorts: VideoJournal[];
  reel: VideoJournal[];
  articles: { une: Article; autres: Article[] };
  mission: Mission;
}) {
  const mise: Mise = "quotidien";
  const t = TON[mise];
  const { date, numero, jour, une, demain, defi, theme, hier, chiffre, chiffresCles, metier, shorts, reel, articles, mission } = props;

  return (
    <Source.Provider value="journal">
      <div className={`min-h-screen ${t.page}`}>
        <main className={`mx-auto w-full px-4 py-6 sm:py-8 ${t.conteneur}`}>
          <Manchette date={date} numero={numero} />

          {/* LA UNE : l'article du jour, et la colonne de droite. */}
          <div id="comprendre" className="mt-6 grid scroll-mt-24 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <ArticleUne a={articles.une} />
            </div>
            <aside className="space-y-8 lg:col-span-4 lg:border-l lg:border-stone-300 lg:pl-8">
              <ChiffresCles chiffre={chiffre} autres={chiffresCles} />
              <div id="defi" className="scroll-mt-24">
                <DefiDuJour mise={mise} jour={jour} defi={defi} theme={theme} />
              </div>
            </aside>
          </div>

          {/* LES AUTRES NOUVELLES, sur trois colonnes. */}
          <section aria-label="Les autres nouvelles" className="mt-10">
            <h2 className="border-b-[6px] border-double border-stone-900 pb-1 font-serif text-2xl font-black text-stone-900">
              Les autres nouvelles
            </h2>
            <div className="mt-4 grid gap-8 md:grid-cols-3">
              {articles.autres.map((a) => (
                <AutreNouvelle key={a.id} a={a} />
              ))}
            </div>
          </section>

          {/* LE DÉFI DEHORS OU LA BONNE ACTION : apprendre autrement, en vrai. */}
          <div className="mt-10">
            <MissionDuJour m={mission} />
          </div>

          {/* EN IMAGES : la vidéo du jour et les maths dehors. */}
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Une mise={mise} une={une} />
            </div>
            <div className="lg:col-span-5 lg:border-l lg:border-stone-300 lg:pl-8">
              <Reel mise={mise} reel={reel} />
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <MetierDuJour mise={mise} metier={metier} />
            </div>
            <div className="lg:col-span-7 lg:border-l lg:border-stone-300 lg:pl-8">
              <RendezVous mise={mise} jour={jour} demain={demain} hier={hier} />
            </div>
          </div>

          <div className="mt-10">
            <Shorts mise={mise} shorts={shorts} />
          </div>

          {/* Frédéric, 10/11 : « garde les rituels ». */}
          <div className="mt-10">
            <Rituels mise={mise} />
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
    </Source.Provider>
  );
}
