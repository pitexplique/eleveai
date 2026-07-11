"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEleve } from "@/context/EleveContext";
import { problemesFixed } from "@/lib/defis-du-jour/problemes.fixed";
import { problemeDuJourWeekly } from "@/lib/defis-du-jour/weekly";
import GoogleFollowChip from "@/components/GoogleFollowChip";
import FloatingCoach from "@/components/FloatingCoach";
import ElevesALHonneur from "@/components/ameliorations/ElevesALHonneur";
import RecoDuJourAccueil from "@/components/accueil/RecoDuJourAccueil";
import EncartCallEnDirect from "@/components/accueil/EncartCallEnDirect";
import StaffAccueilBanner from "@/components/accueil/StaffAccueilBanner";
import { type EleveALHonneur } from "@/lib/ameliorations/aLHonneur";
import { prenomFromNom } from "@/lib/prenom";
import { elevesRemercies } from "@/lib/remerciements/eleves";

// ─── Sélecteur d'audience du hero (façon « Netflix ») ──────────────────────────
// Chaque public a SA porte : on ne répond plus aux quatre en même temps (d'où
// l'accueil « illisible »). L'Élève reste sur l'accueil (qui EST sa page) via une
// ancre ; les trois publics adultes vont vers leur page dédiée.
const AUDIENCES: {
  emoji: string;
  label: string;
  sub: string;
  href: string;
}[] = [
  // Toutes les pastilles vont DIRECT (plus de double-pas par l'aperçu) : les
  // adultes sur leur page dédiée, l'Élève sur son contenu (l'accueil est son espace).
  { emoji: "🎓", label: "Élève", sub: "Coach, dictée, défis", href: "/explorer" },
  { emoji: "👪", label: "Parent", sub: "Une IA encadrée", href: "/parents" },
  { emoji: "🍎", label: "Enseignant", sub: "Le tableau de bord classe", href: "/enseignants" },
  { emoji: "🏫", label: "Établissement", sub: "Déploiement & suivi", href: "/espace-ecoles" },
];

// Maths·974 REMISE EN VITRINE (05/07/2026) : l'IA-IPR de maths (V. Bernard) adore
// « Maths Réel » (maths vivantes) → c'est le cheval institutionnel, on le montre
// à tout le monde (connectés et non connectés). Repasser à false pour la parker.
const MONTRER_974 = true;

// ─── Drag-to-scroll (glisser à la souris sur desktop) ──────────────────────────
// Sur mobile le scroll horizontal au doigt est natif. Sur desktop il n'y a pas de
// « glisser à la souris » : on le simule ici (retour Lazslo).
function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });

  const onMouseDown = (e: ReactMouseEvent) => {
    const el = ref.current;
    if (!el) return;
    drag.current = { down: true, startX: e.pageX, startScroll: el.scrollLeft, moved: false };
  };

  const onMouseMove = (e: ReactMouseEvent) => {
    const el = ref.current;
    if (!el || !drag.current.down) return;
    const dx = e.pageX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  };

  const stop = () => {
    drag.current.down = false;
  };

  // Empêche la navigation du <Link> quand on a glissé plutôt que cliqué.
  const onClickCapture = (e: ReactMouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return {
    ref,
    handlers: {
      onMouseDown,
      onMouseMove,
      onMouseUp: stop,
      onMouseLeave: stop,
      onClickCapture,
    },
  };
}

// ─── Constants ────────────────────────────────────────────────────────────────

const BREVET_DATE = new Date("2026-06-27T08:00:00");
function joursAvantBrevet() {
  const diff = BREVET_DATE.getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}
const jours = joursAvantBrevet();

// ─── Subject cards ────────────────────────────────────────────────────────────

const SUBJECTS = [
  {
    icon: "🧮",
    label: "Maths",
    desc: "Calculer, raisonner, prouver",
    href: "/coach-ia/maths",
    bg: "from-cyan-500 to-blue-600",
    border: "border-cyan-400/50",
    glow: "group-hover:shadow-cyan-500/40",
    cm: true,
  },
  {
    icon: "📖",
    label: "Français",
    desc: "Lire, comprendre, s'exprimer",
    href: "/coach-ia/francais",
    bg: "from-emerald-500 to-green-700",
    border: "border-emerald-400/50",
    glow: "group-hover:shadow-emerald-500/40",
    cm: true,
  },
  {
    icon: "🇬🇧",
    label: "Anglais",
    desc: "Comprendre, parler, progresser",
    href: "/coach-ia/english-maths",
    bg: "from-blue-500 to-indigo-700",
    border: "border-blue-400/50",
    glow: "group-hover:shadow-blue-500/40",
    cm: true,
  },
  {
    icon: "🇪🇸",
    label: "Espagnol",
    desc: "Comprendre, parler, découvrir",
    href: "/coach-ia/espagnol",
    bg: "from-red-500 to-rose-700",
    border: "border-red-400/50",
    glow: "group-hover:shadow-red-500/40",
    cm: false,
  },
  {
    icon: "🤖",
    label: "IA",
    desc: "Comprendre et maîtriser l'IA",
    href: "/coach-ia/ia",
    bg: "from-indigo-500 to-violet-700",
    border: "border-indigo-400/50",
    glow: "group-hover:shadow-indigo-500/40",
    cm: false,
  },
  {
    icon: "📊",
    label: "Économie",
    desc: "Comprendre le monde économique",
    href: "/coach-ia/economie",
    bg: "from-amber-500 to-orange-600",
    border: "border-amber-400/50",
    glow: "group-hover:shadow-amber-500/40",
    cm: false,
  },
];

// Les parcours par matière — même modèle visuel que les coachs (grille jumelle).
// « Faire le point » : un bilan de niveau par matière avant de s'entraîner.
const PARCOURS_SUBJECTS = [
  {
    icon: "🧮",
    label: "Maths",
    desc: "Teste ton niveau",
    href: "/parcours",
    bg: "from-cyan-500 to-blue-600",
    border: "border-cyan-400/50",
    glow: "group-hover:shadow-cyan-500/40",
    cm: true,
  },
  {
    icon: "📖",
    label: "Français",
    desc: "Teste ton niveau",
    href: "/parcours-francais",
    bg: "from-emerald-500 to-green-700",
    border: "border-emerald-400/50",
    glow: "group-hover:shadow-emerald-500/40",
    cm: true,
  },
  {
    icon: "🇬🇧",
    label: "Anglais",
    desc: "Bilan CECRL",
    href: "/parcours-english-maths",
    bg: "from-blue-500 to-indigo-700",
    border: "border-blue-400/50",
    glow: "group-hover:shadow-blue-500/40",
    cm: true,
  },
  {
    icon: "🇪🇸",
    label: "Espagnol",
    desc: "Bilan A1 → B2",
    href: "/parcours-espagnol",
    bg: "from-red-500 to-rose-700",
    border: "border-red-400/50",
    glow: "group-hover:shadow-red-500/40",
    cm: false,
  },
  {
    icon: "🤖",
    label: "IA",
    desc: "Bilan A1 → C1",
    href: "/parcours-ia",
    bg: "from-indigo-500 to-violet-700",
    border: "border-indigo-400/50",
    glow: "group-hover:shadow-indigo-500/40",
    cm: false,
  },
];

// Niveaux pour lesquels le coach sait pré-sélectionner la classe via ?classe=.
// (À la connexion on connaît la classe → proposer directement le bon niveau.
//  À terme : suggestions plus fines par niveau.)
const MATHS_LEVELS = new Set([
  "cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "terminale-spe",
]);
const FRANCAIS_LEVELS = new Set([
  "cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e",
]);
const CLASSE_LABELS: Record<string, string> = {
  cp: "CP", ce1: "CE1", ce2: "CE2", cm1: "CM1", cm2: "CM2",
  "6e": "6e", "5e": "5e", "4e": "4e", "3e": "3e", "terminale-spe": "Terminale",
};

// ─── Bottom features bar ──────────────────────────────────────────────────────

const FEATURES = [
  { icon: "🧮", label: "Parcours Maths",    desc: "Diagnostic et entraînement maths",   href: "/parcours"               },
  { icon: "📖", label: "Parcours Français", desc: "Lecture, grammaire, expression",     href: "/parcours-francais"      },
  { icon: "🇬🇧", label: "Parcours English",  desc: "Bilan de niveau CECRL avec audio",   href: "/parcours-english-maths" },
  { icon: "🇪🇸", label: "Parcours Espagnol", desc: "Bilan de niveau A1 → B2 avec audio", href: "/parcours-espagnol"      },
  { icon: "🤖", label: "Parcours IA",       desc: "Culture et bons réflexes IA, A1 → C1", href: "/parcours-ia"          },
  { icon: "🎓", label: "Éval blanche Pix IA", desc: "Prépare l'évaluation nationale Pix IA", href: "/eval-pix-ia"        },
];

// ─── Cahiers de vacances (cartes colorées, du CE2 à la Terminale) ──────────────
// Les classes de dégradé sont en clair (literals) pour que Tailwind les génère.
const CAHIERS_VACANCES = [
  { slug: "vers-le-ce2",       niveau: "CE1 → CE2",       titre: "Vers le CE2",       theme: "On apprend en jouant",                  emoji: "🎲", grad: "from-orange-400 to-amber-500" },
  { slug: "vers-le-cm1",       niveau: "CE2 → CM1",       titre: "Vers le CM1",       theme: "Ti Margo explore son jardin",           emoji: "🌳", grad: "from-lime-400 to-green-600"  },
  { slug: "vers-le-cm2",       niveau: "CM1 → CM2",       titre: "Vers le CM2",       theme: "Ti Margo découvre son île",             emoji: "🏖️", grad: "from-teal-400 to-emerald-600" },
  { slug: "vers-la-6e",        niveau: "CM2 → 6ᵉ",        titre: "Vers la 6ᵉ",        theme: "Le grand voyage vers la 6ᵉ",            emoji: "🎓", grad: "from-yellow-400 to-amber-600" },
  { slug: "vers-la-5e",        niveau: "6ᵉ → 5ᵉ",         titre: "Vers la 5ᵉ",        theme: "Le tour de l'océan Indien",             emoji: "🐋", grad: "from-sky-400 to-blue-600"    },
  { slug: "vers-la-4e",        niveau: "5ᵉ → 4ᵉ",         titre: "Vers la 4ᵉ",        theme: "Le tour du monde en 80 jours",          emoji: "🌍", grad: "from-indigo-400 to-blue-700" },
  { slug: "vers-la-3e",        niveau: "4ᵉ → 3ᵉ",         titre: "Vers la 3ᵉ",        theme: "Le grand voyage spatial",               emoji: "🚀", grad: "from-fuchsia-500 to-purple-700" },
  { slug: "vers-la-2nde",      niveau: "3ᵉ → 2ⁿᵈᵉ",       titre: "Vers la 2ⁿᵈᵉ",      theme: "Le grand zoom, de l'atome à l'univers", emoji: "🔭", grad: "from-rose-400 to-pink-600"  },
  { slug: "vers-la-premiere",  niveau: "2ⁿᵈᵉ → 1ʳᵉ",      titre: "Vers la 1ʳᵉ",       theme: "La créativité pour changer le monde",   emoji: "💡", grad: "from-violet-500 to-fuchsia-600" },
  { slug: "vers-la-terminale", niveau: "1ʳᵉ → Terminale", titre: "Vers la Terminale", theme: "Les maths et l'IA pour changer le monde", emoji: "🤖", grad: "from-emerald-400 to-teal-700" },
  { slug: "vers-le-bac-plus-1", niveau: "Terminale → Bac +1", titre: "Vers le Bac +1", theme: "Inventer les solutions de demain", emoji: "🛠️", grad: "from-cyan-400 to-indigo-600" },
];

// ─── Main component ───────────────────────────────────────────────────────────

function getPrenomAffiche(nom?: string | null) {
  // En base, le nom de famille est en MAJUSCULES et le prénom en minuscules
  // (ex. "DUPONT Jean"). prenomFromNom ne garde que le prénom.
  const prenom = prenomFromNom(nom);
  const normalise = prenom?.toLowerCase();
  if (!prenom || normalise === "élève" || normalise === "eleve") {
    return null;
  }
  return prenom;
}

export type AvisPublic = {
  prenom: string;
  detail: string;
  note: number;
  quote: string;
};

export type Apercu974 = {
  id: string;
  lieu: string;
  titre: string;
  notion: string | null;
  youtube_id: string | null;
  image_url: string | null;
};

// Avis affichés si la base ne renvoie rien (chargement, erreur, env absente).
const AVIS_FALLBACK: AvisPublic[] = [
  {
    quote:
      "Rubrique très intéressante pour revoir les bases et acquérir des automatismes. Très rapide, mais très intuitif.",
    prenom: "Pierre",
    detail: "Défis du jour",
    note: 5,
  },
  {
    quote:
      "C'est trop bien, on peut vraiment progresser sur ce site comparé à d'autres.",
    prenom: "Tamara",
    detail: "6e",
    note: 5,
  },
  {
    quote:
      "Je pense qu'il faudrait mettre une calculatrice sur le site, au cas où on ne sait plus.",
    prenom: "Guilianne",
    detail: "4e",
    note: 4,
  },
];

export default function AccueilPage({
  avis,
  honneur,
  apercu974,
}: {
  avis?: AvisPublic[];
  honneur?: EleveALHonneur[];
  apercu974?: Apercu974[];
}) {
  const derniersAvis = avis && avis.length > 0 ? avis : AVIS_FALLBACK;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { eleve } = useEleve();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSignatureMeaning, setShowSignatureMeaning] = useState(true);
  const nouveautes = useDragScroll();

  // Bandeau d'avis sur une ligne sous l'image (retour d'une élève) : on fait
  // défiler un avis à la fois, toutes les 5 s.
  const [avisLigneIndex, setAvisLigneIndex] = useState(0);
  useEffect(() => {
    if (derniersAvis.length <= 1) return;
    const id = setInterval(
      () => setAvisLigneIndex((i) => (i + 1) % derniersAvis.length),
      5000,
    );
    return () => clearInterval(id);
  }, [derniersAvis.length]);
  const avisLigne = derniersAvis[avisLigneIndex % derniersAvis.length];

  const eleveClasse = eleve?.classe?.toLowerCase() ?? null;
  const prenomAffiche = getPrenomAffiche(eleve?.nom);
  const isCmPrimary = eleveClasse === "cm1" || eleveClasse === "cm2";

  // Défi réellement programmé aujourd'hui (même logique que /defis-du-jour),
  // pour que le bandeau d'accueil affiche le vrai défi du jour et pas un texte figé.
  const defiDuJour = useMemo(() => {
    const today = new Date().getDay();
    const mapping: Record<number, number> = { 0: 6, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5 };
    const index = mapping[today] ?? 0;
    const dayConfig = problemeDuJourWeekly.days[index];
    const defi =
      problemesFixed.find((p) => p.id === dayConfig.problemId) ?? problemesFixed[0];
    return { defi, day: dayConfig.day };
  }, []);

  // Passe la classe de l'élève au coach quand le niveau est géré, pour qu'il
  // atterrisse directement sur le bon niveau (sinon le coach ouvre 6e par défaut).
  function getHref(href: string) {
    if (!eleveClasse) return href;
    if (href === "/coach-ia/maths" && MATHS_LEVELS.has(eleveClasse)) {
      return `/coach-ia/maths?classe=${eleveClasse}`;
    }
    if (href === "/coach-ia/francais" && FRANCAIS_LEVELS.has(eleveClasse)) {
      return `/coach-ia/francais?classe=${eleveClasse}`;
    }
    return href;
  }

  const classeLabel = eleveClasse ? (CLASSE_LABELS[eleveClasse] ?? "") : "";

  // Chemins proposés à l'élève. La 1re carte est la sélection mise en avant ;
  // Maths/Français portent le niveau quand on le connaît ; Anglais/Espagnol
  // restent généraux (niveaux CECRL, pas la classe).
  const suggestions = [
    {
      icon: "✨",
      title: "Sélection du jour",
      desc: "EleveAI a choisi pour toi aujourd'hui",
      href: "/defis-du-jour",
      tone: "from-amber-500 to-orange-600",
    },
    {
      icon: "🧮",
      title: classeLabel ? `Maths ${classeLabel}` : "Maths",
      desc: "Reprends une notion avec le coach",
      href: getHref("/coach-ia/maths"),
      tone: "from-cyan-500 to-blue-600",
    },
    ...(!eleveClasse || FRANCAIS_LEVELS.has(eleveClasse)
      ? [{
          icon: "📖",
          title: classeLabel ? `Français ${classeLabel}` : "Français",
          desc: "Lecture, grammaire, expression",
          href: getHref("/coach-ia/francais"),
          tone: "from-emerald-500 to-green-700",
        }]
      : []),
    {
      icon: "🇬🇧",
      title: "Anglais",
      desc: "Vocabulaire et maths en anglais",
      href: "/coach-ia/english-maths",
      tone: "from-blue-500 to-indigo-700",
    },
    {
      icon: "🇪🇸",
      title: "Espagnol",
      desc: "Vocabulaire et audio, A1 → B2",
      href: "/coach-ia/espagnol",
      tone: "from-red-500 to-rose-700",
    },
    {
      icon: "🧭",
      title: "Parcours",
      desc: "Teste ton niveau, vois tes forces",
      href: "/parcours",
      tone: "from-violet-500 to-purple-700",
    },
  ];

  const visibleSubjects = isCmPrimary ? SUBJECTS.filter(s => s.cm) : SUBJECTS;
  const visibleParcours = isCmPrimary ? PARCOURS_SUBJECTS.filter(s => s.cm) : PARCOURS_SUBJECTS;

  // Staff (prof/principal) connecté : on remplace le hero élève par leur bandeau.
  const isStaff =
    eleve?.type_utilisateur === "prof" ||
    eleve?.type_utilisateur === "principal" ||
    eleve?.type_utilisateur === "boss";

  async function toggleAudio() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.pause(); audio.currentTime = 0; return; }
    try { audio.currentTime = 0; await audio.play(); }
    catch { /* ignore */ }
  }

  return (
    <main className="relative isolate min-h-screen overflow-x-hidden text-white" style={{ backgroundColor: "#041B33" }}>

      {/* Fond décoratif partagé : quadrillage « cahier de maths » + halos de couleur.
         -z-10 + isolate = derrière le contenu ; les sections plates sont transparentes
         pour le laisser transparaître, les cartes gardent leur propre fond. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
        <div className="absolute -left-40 top-[-8%] h-[36rem] w-[36rem] rounded-full bg-cyan-500/15 blur-[120px]" />
        <div className="absolute right-[-12%] top-[26%] h-[32rem] w-[32rem] rounded-full bg-violet-500/12 blur-[120px]" />
        <div className="absolute left-[8%] top-[58%] h-[32rem] w-[32rem] rounded-full bg-teal-500/12 blur-[120px]" />
        <div className="absolute right-[4%] top-[86%] h-[30rem] w-[30rem] rounded-full bg-fuchsia-500/10 blur-[120px]" />
      </div>

      <h1 className="sr-only">EleveAI – Coach IA maths, français, anglais et espagnol. Du CP au Bac.</h1>

      <audio
        ref={audioRef}
        src="/audio/accueil/presentation.mp3"
        preload="none"
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

      {/* Staff connecté → son bandeau « tableau de bord » remplace le hero élève. */}
      <StaffAccueilBanner />

      {/* ── TA JOURNÉE — le plan du jour de l'élève connecté, EN PREMIER (🔥 + 🧭).
          L'IA guide : l'élève arrive et voit SON chemin avant la vitrine (qui
          glisse dessous pour les visiteurs). Ne rend rien sans token : l'accueil
          visiteur est inchangé. Consomme /api/profil-eleve.
          !isStaff : un prof/principal connecté a son bandeau tableau de bord,
          pas des recos d'élève (retour de Frédéric, 10/07). */}
      {!isStaff && <RecoDuJourAccueil />}

      {/* ── HERO — Image plein écran (masqué pour le staff) ─────────────────── */}
      {!isStaff && (
      <section
        className="relative w-full animate-gradient-shift px-3 pt-2 sm:px-6"
        style={{
          backgroundImage:
            "linear-gradient(115deg, #041B33 0%, #0a2a55 35%, #251355 65%, #041B33 100%)",
        }}
      >
        {/* L'image ne doit pas contenir d'éléments qui ressemblent à des boutons :
            les élèves essayaient de cliquer sur les cartes dessinées (retours du
            11-12/06/2026). Les vraies actions sont sous l'image. */}
        {/* L'image hero d'abord. Le compte à rebours reste posé dessus. */}
        <div className="relative mx-auto max-w-5xl md:w-[62%] xl:w-[46rem]">
          <Image
            src="/images/accueil-eleveai-reunion.webp"
            alt="EleveAI – Comprendre, S'entraîner, Réussir – CP à Terminale"
            width={1920}
            height={1080}
            priority
            sizes="100vw"
            className="block h-auto w-full border-x border-b border-white/10 shadow-2xl"
          />
          {/* Fondu bas vers le fond de page */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[#041B33]" />

          {/* Brevet countdown si 3e/4e */}
          {(eleveClasse === "3e" || eleveClasse === "4e") && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
              <Link
                href="/coach-brevet"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-black text-white shadow-lg transition hover:bg-emerald-400 hover:scale-105 whitespace-nowrap"
              >
                🎯 Sprint Brevet · J−{jours} → Commencer
              </Link>
            </div>
          )}
        </div>

        {/* Message + SÉLECTEUR D'AUDIENCE (4 portes), SOUS l'image */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 pb-4 pt-6 text-center">
          {/* Prénom uniquement : aucun nom de famille n'est affiché. */}
          {prenomAffiche && (
            <p className="mx-auto mb-3 inline-block rounded-full border border-white/20 bg-black/40 px-4 py-1.5 text-xs font-black text-white backdrop-blur-sm sm:text-sm">
              Bonjour, {prenomAffiche} 👋
            </p>
          )}
          {/* Accueil chaleureux — « chez toi », sans jugement (esprit north star). */}
          <p className="mx-auto mb-2 inline-block rounded-full bg-amber-300/15 px-4 py-1 text-xs font-black text-amber-200 sm:text-sm">
            🏡 Ici, tu es chez toi
          </p>
          {/* Une seule promesse : le coach est le cœur. */}
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
            Ton <span className="text-amber-300">coach IA</span> pour progresser
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-6 text-white/80 sm:text-base">
            Maths, français, anglais, espagnol, IA — du CP au Bac. À ton rythme,
            sans jugement&nbsp;: on t&apos;explique, on t&apos;encourage. ✨
          </p>

          {/* Bandeau de confiance remonté en haut : ce qui rassure le parent
             (prof réunionnais, gratuit, sans pub, RGPD) était enterré tout en bas. */}
          <div className="mx-auto mt-4 flex max-w-2xl flex-wrap items-center justify-center gap-2">
            {[
              "🧑‍🏫 Conçu par un prof à La Réunion",
              "🆓 Gratuit, sans publicité",
              "🔒 Données protégées (RGPD)",
              "❤️ Né dans une vraie classe",
            ].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-bold text-white/80 backdrop-blur-sm sm:text-xs"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Sélecteur « Je suis… » — pour les VISITEURS ; masqué si connecté
              (l'élève connecté a déjà ses recos « Ta journée » juste dessous). */}
          {!eleve && (
          <>
          <p className="mt-7 text-xs font-black uppercase tracking-[0.2em] text-white/45">
            Je suis…
          </p>
          <div className="mx-auto mt-3 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {AUDIENCES.map((a) => (
              <Link
                key={a.label}
                href={a.href}
                className="group flex flex-col items-center gap-1 rounded-2xl border border-white/15 bg-white/[0.06] px-3 py-4 text-center backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/[0.12]"
              >
                <span className="text-3xl" aria-hidden="true">
                  {a.emoji}
                </span>
                <span className="text-sm font-black text-white">{a.label}</span>
                <span className="text-[11px] font-semibold leading-tight text-white/55">
                  {a.sub}
                </span>
              </Link>
            ))}
          </div>
          </>
          )}

          {/* Voie élève par défaut : connexion (le coach est accessible plus bas). */}
          {!eleve && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#coach"
              className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-6 py-2.5 text-sm font-black text-[#0b2c4a] shadow-lg transition hover:scale-105 hover:bg-amber-200"
            >
              Essayer le coach →
            </Link>
            <Link
              href="/auth/signin?mode=eleve"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-sm font-black text-white shadow-lg transition hover:scale-105 hover:bg-white/20"
            >
              Se connecter
            </Link>
          </div>
          )}
        </div>
      </section>
      )}

      {/* ── EN DIRECT — inscription aux prochains calls (visible par tous :
          il y a un call par public). Lit lib/calls.ts ; ne rend rien si aucun
          call actif à venir. */}
      <EncartCallEnDirect />

      {/* ── MOT DE M. LACOSTE — collé au call : le MOMENT HUMAIN (photo + lettre repliée) ── */}
      <section className="px-4 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center sm:p-8">
          <Image
            src="/images/avatar-frederic-Lacoste.jpg"
            alt="Frédéric Lacoste"
            width={64}
            height={64}
            className="mx-auto h-16 w-16 rounded-full border-2 border-emerald-300/50 object-cover"
          />
          <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-3xl">
            Aux parents et à leurs enfants
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-white/80 sm:text-base">
            Merci pour cette année. EleveAI est né dans ma classe, pour mes
            élèves — et il reste{" "}
            <span className="font-black text-sky-200">
              gratuit et ouvert tout l&apos;été
            </span>
            .
          </p>
          <details className="mt-1">
            <summary className="mt-2 cursor-pointer list-none text-xs font-black text-sky-300 transition hover:text-sky-200">
              Lire la suite ▾
            </summary>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-white/80 sm:text-base">
            <span className="font-black text-sky-200">Aux parents :</span>{" "}
            quelques minutes par jour suffisent — la dictée du jour, un défi, une
            fiche. Aucune pression, juste le plaisir d&apos;apprendre à son
            rythme, en confiance (et sans publicité — vos enfants sont en
            sécurité).
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-white/80 sm:text-base">
            <span className="font-black text-sky-200">Aux élèves :</span> je suis
            fier de vous. Reposez-vous, profitez des vôtres et du soleil… et
            revenez quand l&apos;envie vous prend. 🌴
          </p>
          </details>
          <p className="mt-4 text-sm font-black text-emerald-200">— M. Lacoste</p>
        </div>
      </section>

      {/* ── APERÇUS PAR AUDIENCE — pour les VISITEURS ; masqués si connecté (un
          élève/prof connecté n'a plus à choisir « Je suis… »). ──────────────── */}
      {!eleve && (
      <section className="px-4 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Élève — l'utilisateur PRINCIPAL : mis en avant (pleine largeur,
              un peu plus grand), les trois publics adultes viennent ensuite. */}
          <div id="a-eleve" className="scroll-mt-24 flex flex-col gap-4 rounded-2xl border border-emerald-300/40 bg-gradient-to-br from-emerald-400/[0.14] to-white/[0.03] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div className="flex-1">
              <p className="text-xs font-black uppercase tracking-wide text-emerald-200">🎓 Élève</p>
              <h2 className="mt-1 text-2xl font-black text-white">Entraîne-toi dans ta matière forte</h2>
              <p className="mt-2 text-sm font-semibold leading-snug text-white/75">
                Coach IA, parcours, dictée, défis — à ton rythme, sans jugement.
                On t&apos;explique et on t&apos;encourage, du CP au Bac.
              </p>
            </div>
            <Link
              href="#coach"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-black text-[#041B33] transition hover:brightness-110"
            >
              Voir mon espace →
            </Link>
          </div>

          {/* Les trois publics adultes, sous l'élève */}
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {/* Parent */}
          <div id="a-parent" className="scroll-mt-24 flex flex-col rounded-2xl border border-sky-300/25 bg-gradient-to-br from-sky-400/[0.10] to-white/[0.03] p-5 sm:p-6">
            <p className="text-xs font-black uppercase tracking-wide text-sky-200">👪 Parent</p>
            <h2 className="mt-1 text-xl font-black text-white">L&apos;IA explique, elle ne triche pas</h2>
            <p className="mt-2 flex-1 text-sm font-semibold leading-snug text-white/75">
              Encadrée, sans publicité, données protégées. Et <strong>gratuit si le
              collège de votre enfant l&apos;utilise</strong>.
            </p>
            <Link
              href="/parents"
              className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-sky-400 px-4 py-2 text-sm font-black text-[#041B33] transition hover:brightness-110"
            >
              En savoir plus →
            </Link>
          </div>

          {/* Enseignant */}
          <div id="a-enseignant" className="scroll-mt-24 flex flex-col rounded-2xl border border-amber-300/25 bg-gradient-to-br from-amber-400/[0.10] to-white/[0.03] p-5 sm:p-6">
            <p className="text-xs font-black uppercase tracking-wide text-amber-200">🍎 Enseignant</p>
            <h2 className="mt-1 text-xl font-black text-white">Suivez leur progression</h2>
            <p className="mt-2 flex-1 text-sm font-semibold leading-snug text-white/75">
              Le travail de chaque élève en temps réel, et ses moyennes par
              matière. EleveAI corrige&nbsp;; vous, vous enseignez.
            </p>
            <Link
              href="/enseignants"
              className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-amber-400 px-4 py-2 text-sm font-black text-[#041B33] transition hover:brightness-110"
            >
              En savoir plus →
            </Link>
          </div>

          {/* Établissement */}
          <div id="a-etablissement" className="scroll-mt-24 flex flex-col rounded-2xl border border-violet-300/25 bg-gradient-to-br from-violet-400/[0.10] to-white/[0.03] p-5 sm:p-6">
            <p className="text-xs font-black uppercase tracking-wide text-violet-200">🏫 Établissement</p>
            <h2 className="mt-1 text-xl font-black text-white">Financé par l&apos;établissement, gratuit pour les familles</h2>
            <p className="mt-2 flex-1 text-sm font-semibold leading-snug text-white/75">
              Multi-matières, suivi classe par classe, RGPD maîtrisé. Déployé en
              quelques heures, sans installation.
            </p>
            <Link
              href="/espace-ecoles"
              className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-violet-400 px-4 py-2 text-sm font-black text-white transition hover:brightness-110"
            >
              En savoir plus →
            </Link>
          </div>
          </div>

          {/* Français de l'étranger — UNE ligne fine (pattern bandeau) : segment
             B2C qui paie volontiers (insight d'Arthur), il mérite sa ligne sans
             alourdir l'accueil. */}
          <Link
            href="/francais-de-l-etranger"
            className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-xl border border-sky-300/30 bg-sky-500/10 px-4 py-2.5 text-center text-xs font-bold text-sky-100 transition hover:bg-sky-500/20 sm:text-sm"
          >
            <span aria-hidden>🌍</span>
            <span className="font-black">Vous vivez à l&apos;étranger&nbsp;?</span>
            <span>Le programme français et la dictée quotidienne, à votre fuseau horaire</span>
            <span className="font-black underline decoration-sky-300/60 underline-offset-2">
              Découvrir →
            </span>
          </Link>
        </div>
      </section>
      )}

      {/* ── COACHS + PARCOURS — les essentiels élève, remontés en tête ─────────── */}
      <section id="coach" className="scroll-mt-20 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Coach IA — texte + chips des matières à gauche, aperçu à droite */}
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 lg:flex-row lg:justify-between">
            <div className="w-full text-center lg:flex-1 lg:text-left">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200/80">
                🧠 Coach IA
              </p>
              <h2 className="mt-1 text-2xl font-black text-white">
                Ton coach, dans chaque matière
              </h2>
              <p className="mt-1.5 text-sm font-semibold leading-snug text-white/75">
                On t&apos;explique, on t&apos;encourage — à ton rythme, sans jugement. Du CP au Bac.
              </p>
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-black text-cyan-100">
                🎯 Près de 2&nbsp;000 compétences à travailler, du CP au Bac
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
                {visibleSubjects.map((subject) => (
                  <Link
                    key={subject.label}
                    href={getHref(subject.href)}
                    className={`inline-flex items-center gap-1.5 rounded-full border bg-white/5 px-3.5 py-2 text-sm font-black text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/10 ${subject.border}`}
                  >
                    <span className="text-base leading-none">{subject.icon}</span>
                    {subject.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Aperçu façon capture du coach : l'arbre de compétences (comme la vraie
               page /coach-ia) — notions + micro-compétences numérotées + le compte. */}
            <Link
              href={getHref("/coach-ia/maths")}
              className="group w-full max-w-[300px] shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl"
            >
              <div className="flex items-center justify-between bg-gradient-to-r from-cyan-600 to-blue-600 px-3 py-2 text-white">
                <span className="text-[11px] font-black">🧠 Coach IA · Maths 6e</span>
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-black">116 compétences</span>
              </div>
              <div className="space-y-2.5 p-3">
                {[
                  {
                    groupe: "Utiliser et comparer des nombres",
                    micros: [
                      "Lire et écrire un nombre entier",
                      "Comparer des nombres entiers",
                      "Encadrer un nombre entier",
                    ],
                  },
                  {
                    groupe: "Pratiquer le calcul mental et posé",
                    micros: [
                      "Poser une addition",
                      "Poser une division",
                      "Addition mentale",
                    ],
                  },
                ].map((g) => (
                  <div key={g.groupe}>
                    <p className="text-[11px] font-black text-green-700">{g.groupe}</p>
                    <ul className="mt-1 space-y-1">
                      {g.micros.map((m, i) => (
                        <li
                          key={m}
                          className="flex items-center gap-2 text-[11px] font-bold text-slate-700"
                        >
                          <span className="grid h-4 w-4 shrink-0 place-items-center rounded bg-green-100 text-[9px] font-black text-green-700">
                            {i + 1}
                          </span>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <p className="text-center text-[10px] font-black text-cyan-700">
                  + 110 micro-compétences · choisis, on t&apos;entraîne →
                </p>
                <p className="text-right text-[8px] font-black uppercase tracking-[0.15em] text-slate-300">
                  eleveai.fr
                </p>
              </div>
            </Link>
          </div>

          {/* Parcours par matière — même modèle que le coach : chips + aperçu */}
          <div className="mt-8 flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 lg:flex-row lg:justify-between">
            <div className="w-full text-center lg:flex-1 lg:text-left">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-200/80">
                🛤️ Parcours
              </p>
              <h2 className="mt-1 text-2xl font-black text-white">
                Fais le point, matière par matière
              </h2>
              <p className="mt-1.5 text-sm font-semibold leading-snug text-white/75">
                Un bilan de tes forces (🟢) et de ce qui coince (🔴) — puis on s&apos;entraîne pile là où il faut.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
                {visibleParcours.map((subject) => (
                  <Link
                    key={subject.label}
                    href={getHref(subject.href)}
                    className={`inline-flex items-center gap-1.5 rounded-full border bg-white/5 px-3.5 py-2 text-sm font-black text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/10 ${subject.border}`}
                  >
                    <span className="text-base leading-none">{subject.icon}</span>
                    {subject.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Aperçu façon capture de l'évaluation (niveau · nb questions · difficulté) */}
            <Link
              href="/parcours"
              className="group w-full max-w-[300px] shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl"
            >
              <div className="flex items-center justify-between bg-gradient-to-r from-violet-600 to-fuchsia-600 px-3 py-2 text-white">
                <span className="text-[11px] font-black">🛤️ Parcours Maths</span>
                <span className="text-[9px] font-black opacity-80">évaluation</span>
              </div>
              <div className="space-y-2 p-3">
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.15em] text-slate-400">1 · Ton niveau</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    <span className="rounded-md border border-slate-200 px-2 py-0.5 text-[10px] font-black text-slate-500">CM2</span>
                    <span className="rounded-md bg-slate-900 px-2 py-0.5 text-[10px] font-black text-amber-300 ring-1 ring-amber-300">6e</span>
                    <span className="rounded-md border border-slate-200 px-2 py-0.5 text-[10px] font-black text-slate-500">5e</span>
                    <span className="rounded-md border border-slate-200 px-2 py-0.5 text-[10px] font-black text-slate-500">4e</span>
                  </div>
                </div>
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.15em] text-slate-400">2 · Combien de questions</p>
                  <div className="mt-1 grid grid-cols-2 gap-1">
                    <span className="rounded-md border border-slate-200 px-2 py-1 text-[9px] font-black text-slate-500">⚡ Sprint · 5</span>
                    <span className="rounded-md bg-slate-900 px-2 py-1 text-[9px] font-black text-white ring-1 ring-amber-300">🏃 Course · 10</span>
                  </div>
                </div>
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.15em] text-slate-400">3 · Difficulté</p>
                  <div className="mt-1 grid grid-cols-2 gap-1">
                    <span className="rounded-md bg-slate-900 px-2 py-1 text-[9px] font-black text-white ring-1 ring-amber-300">Révision ⭐⭐⭐</span>
                    <span className="rounded-md border border-slate-200 px-2 py-1 text-[9px] font-black text-slate-500">Défi ⭐⭐⭐⭐⭐</span>
                  </div>
                </div>
                <p className="text-right text-[8px] font-black uppercase tracking-[0.15em] text-slate-300">
                  eleveai.fr
                </p>
              </div>
            </Link>
          </div>

          {/* Picto Maths · 974 — après les parcours : aperçu « capture » d'un défi */}
          <Link
            href="/picto-maths"
            className="group mt-4 flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-white/30 sm:flex-row sm:justify-between sm:gap-6"
          >
            <div className="text-center sm:text-left">
              <p className="text-xs font-black uppercase tracking-wide text-cyan-200">
                🃏 Picto Maths · 974
              </p>
              <h3 className="mt-1 text-lg font-black text-white">Un dessin, une question</h3>
              <p className="mt-0.5 text-sm font-semibold text-white/80">
                Les maths de La Réunion à imprimer et à chercher sur l&apos;ardoise.
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-cyan-400 px-5 py-2 text-sm font-black text-[#041B33]">
                Voir les défis →
              </span>
            </div>

            {/* Aperçu façon capture d'un vrai défi */}
            <div className="w-full max-w-[264px] shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl transition group-hover:-translate-y-0.5 group-hover:shadow-2xl">
              <div className="flex items-center justify-between bg-gradient-to-r from-cyan-600 to-teal-600 px-3 py-1.5 text-white">
                <span className="text-[11px] font-black">🍒 Le marché</span>
                <span className="rounded-full border border-white/40 px-1.5 py-0.5 text-[9px] font-black">PM·01</span>
              </div>
              <div className="p-3">
                <p className="text-center text-sm font-black leading-tight text-slate-900">
                  Combien coûtent 9 kg de letchis&nbsp;?
                </p>
                <div className="mt-2 space-y-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2 py-2.5">
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="text-base leading-none">🍒🍒🍒</span>
                    <span className="text-slate-400">→</span>
                    <span className="rounded border border-cyan-300 bg-cyan-50 px-1.5 py-0.5 text-[11px] font-black text-cyan-800">5 €</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="text-base leading-none">🍒🍒🍒</span>
                    <span className="text-xs font-black text-slate-400">…</span>
                    <span className="text-slate-400">→</span>
                    <span className="rounded border border-dashed border-amber-400 bg-amber-50 px-2 py-0.5 text-[11px] font-black text-amber-600">?</span>
                  </div>
                </div>
                <p className="mt-1.5 text-right text-[8px] font-black uppercase tracking-[0.15em] text-slate-300">
                  eleveai.fr
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── DICTÉE DU JOUR — le rituel quotidien, tout en haut ───────────────── */}
      <section className="px-4 pt-10 sm:px-6 lg:px-8">
        <Link
          href="/dictee-du-jour"
          className="group mx-auto flex max-w-4xl flex-col items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-white/30 sm:flex-row sm:justify-between sm:gap-6 sm:p-7"
        >
          <div className="text-center sm:text-left">
            <p className="text-xs font-black uppercase tracking-wide text-cyan-200">
              ✍️ Nouveau chaque jour
            </p>
            <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">
              📜 La dictée du jour
            </h2>
            <p className="mt-1 text-sm font-semibold text-white/75">
              Un mot à écouter et à écrire — français, maths, langues, histoire,
              géo, écologie… 2 minutes, chaque matin. ☀️
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-cyan-400 px-5 py-2 text-sm font-black text-[#041B33]">
              Faire la dictée →
            </span>
          </div>
          {/* Aperçu de la dictée */}
          <div className="w-full max-w-[260px] shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl transition group-hover:-translate-y-0.5 group-hover:shadow-2xl">
            <div className="flex items-center justify-between bg-gradient-to-r from-cyan-600 to-sky-600 px-3 py-1.5 text-white">
              <span className="text-[11px] font-black">📜 Dictée du jour</span>
              <span className="text-[9px] font-black">🔥 4</span>
            </div>
            <div className="p-3">
              <p className="text-sm font-black text-slate-900">🔊 Écoute et écris le mot :</p>
              <div className="mt-2 flex items-center justify-between rounded-lg border-2 border-slate-200 bg-slate-50 px-3 py-2 text-sm font-black text-slate-700">
                <span>margouilla<span className="text-slate-300">__</span></span>
                <span className="text-[10px] text-cyan-600">Mot 3/5</span>
              </div>
              <p className="mt-2 text-[10px] font-bold text-slate-500">Français · Maths · Anglais · Histoire · Écologie</p>
              <p className="mt-1 text-right text-[8px] font-black uppercase tracking-[0.15em] text-slate-300">eleveai.fr</p>
            </div>
          </div>
        </Link>
      </section>

      {/* ── EXPLORER — le catalogue de toutes les actions possibles ──────────── */}
      <section className="px-4 pt-10 sm:px-6 lg:px-8">
        <Link
          href="/explorer"
          className="group mx-auto flex max-w-4xl flex-col items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-white/30 sm:flex-row sm:justify-between sm:gap-6 sm:p-7"
        >
          <div className="text-center sm:text-left">
            <p className="text-xs font-black uppercase tracking-wide text-violet-200">
              🧭 Tout au même endroit
            </p>
            <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">
              🔍 Explore tout ce que tu peux faire
            </h2>
            <p className="mt-1 text-sm font-semibold text-white/75">
              Coachs, parcours, défis, dictée, concours, cahiers de vacances… Progresse
              dans ta matière forte, ou tente une voie que tu n&apos;as pas encore explorée.
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-violet-400 px-5 py-2 text-sm font-black text-[#041B33]">
              🔍 Voir le catalogue →
            </span>
          </div>
          {/* Aperçu du catalogue */}
          <div className="w-full max-w-[260px] shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl transition group-hover:-translate-y-0.5 group-hover:shadow-2xl">
            <div className="flex items-center justify-between bg-gradient-to-r from-violet-600 to-fuchsia-600 px-3 py-1.5 text-white">
              <span className="text-[11px] font-black">🔍 Explorer</span>
              <span className="text-[9px] font-black opacity-80">tout au même endroit</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 p-3">
              {([["🧠", "Coach IA"], ["🛤️", "Parcours"], ["🎯", "Défis"], ["📜", "Dictée"], ["🃏", "Picto Maths"], ["🗺️", "Carte 974"]] as const).map(([e, l]) => (
                <span key={l} className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-[11px] font-black text-slate-700">
                  <span className="leading-none">{e}</span>
                  {l}
                </span>
              ))}
            </div>
          </div>
        </Link>
      </section>

      {/* ── CAHIERS DE VACANCES — produit saisonnier, cartes colorées & fun ──── */}
      <section id="explorer" className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-[#08294a] to-[#041B33] px-4 pb-2 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
            <div className="w-full text-center lg:flex-1 lg:text-left">
              <p className="inline-flex items-center gap-2 rounded-full bg-amber-300/20 px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-amber-200">
                ☀️ Spécial été · à imprimer · gratuit
              </p>
              <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                Les cahiers de vacances{" "}
                <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
                  EleveAI
                </span>{" "}
                🦎
              </h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-white/75">
                Une page par jour, 6 semaines d&apos;aventure avec Ti Margo — du CE2 à
                la Terminale. Choisis ta classe&nbsp;:
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
                {CAHIERS_VACANCES.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/cahier-vacances/${c.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-white/5 px-3 py-1.5 text-sm font-black text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/10"
                  >
                    <span className="text-base leading-none">{c.emoji}</span>
                    {c.titre}
                  </Link>
                ))}
              </div>
              <Link
                href="/cahier-vacances"
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-black text-amber-200 transition hover:bg-white/20 hover:text-amber-100"
              >
                Voir tous les cahiers →
              </Link>
            </div>

            {/* Aperçu d'un cahier */}
            <Link
              href="/cahier-vacances/vers-la-6e"
              className="group w-full max-w-[300px] shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl"
            >
              <div className="flex items-center justify-between bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-2 text-white">
                <span className="text-[11px] font-black">☀️ Cahier · Vers la 6ᵉ</span>
                <span className="text-[9px] font-black opacity-90">Jour 1</span>
              </div>
              <div className="space-y-1.5 p-3">
                <span className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-700">
                  <span>🧮 Maths — calcul mental</span>
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-slate-300" />
                </span>
                <span className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-700">
                  <span>✍️ Français — le pluriel</span>
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-slate-300" />
                </span>
                <span className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-700">
                  <span>🎯 Défi du jour</span>
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-slate-300" />
                </span>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-bold text-slate-500">🦎 Corrigés inclus</span>
                  <span className="text-[8px] font-black uppercase tracking-[0.15em] text-slate-300">eleveai.fr</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── MATHS RÉEL · 974 — PARKÉ hors vitrine (cf. MONTRER_974) ──────────── */}
      {MONTRER_974 && (
      <section className="relative overflow-hidden bg-gradient-to-b from-[#041B33] to-[#07231f] px-4 pb-2 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-3xl border border-rose-400/30 bg-gradient-to-br from-rose-500/15 via-orange-500/[0.08] to-emerald-500/[0.08] p-6 text-center sm:p-10">
            <p className="inline-flex items-center gap-2 rounded-full bg-rose-400/20 px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-rose-200">
              🌋 Nouveau · La Réunion en vidéo
            </p>
            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
              Maths Réel{" "}
              <span className="bg-gradient-to-r from-rose-300 via-orange-300 to-amber-300 bg-clip-text text-transparent">
                · 974
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-6 text-white/80 sm:text-base">
              «&nbsp;À quoi ça sert, les maths&nbsp;?» La preuve par le terrain : le
              volcan, le marché de Saint-Paul, le lagon, les sentiers de Mafate… De
              vraies vidéos, et les maths qui se cachent derrière. À chaque étape, un
              défi à relever.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {["🌋 Volcan", "🛒 Marché", "🐠 Lagon", "🥾 Mafate", "🌾 Canne"].map((t) => (
                <span key={t} className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/80">
                  {t}
                </span>
              ))}
            </div>

            {/* Aperçu : quelques vraies cartes (vignette vidéo) */}
            {apercu974 && apercu974.length > 0 && (
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {apercu974.map((u) => {
                  const thumb = u.youtube_id
                    ? `https://i.ytimg.com/vi/${u.youtube_id}/hqdefault.jpg`
                    : u.image_url;
                  return (
                    <Link
                      key={u.id}
                      href="/maths-974"
                      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left transition hover:-translate-y-1 hover:border-rose-400/40 hover:bg-white/10"
                    >
                      <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                        {thumb && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={thumb}
                            alt={u.lieu}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          />
                        )}
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-base text-white backdrop-blur-sm transition group-hover:bg-rose-500/80">
                            ▶
                          </span>
                        </span>
                      </div>
                      <div className="p-3">
                        <p className="text-[11px] font-black uppercase tracking-wider text-rose-200">
                          📍 {u.lieu}
                        </p>
                        <p className="mt-1 text-sm font-black leading-snug text-white">{u.titre}</p>
                        {u.notion && (
                          <p className="mt-1 line-clamp-1 text-xs font-semibold text-white/60">{u.notion}</p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            <Link
              href="/maths-974"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 px-6 py-3 text-sm font-black text-white shadow-lg transition hover:scale-105 hover:brightness-110"
            >
              🎬 Voir toutes les vidéos · Maths Réel 974
              <span className="transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>
      )}

      {/* ── FEATURED BANNER — Défi du jour (sous le cahier de vacances et les coachs) ── */}
      <section className="px-4 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {eleveClasse === "3e" || eleveClasse === "4e" ? (
            <Link href="/coach-brevet" className="group relative block h-[220px] overflow-hidden rounded-2xl shadow-2xl sm:h-[280px]">
              <Image src="/images/defis-du-jour/grand_raid_2026.webp" alt="Sprint Brevet" fill sizes="(max-width: 1200px) 100vw, 1200px" className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                <span className="mb-3 inline-block rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-white">🎯 Sprint Brevet · J−{jours}</span>
                <h3 className="text-2xl font-black leading-tight text-white sm:text-3xl">{jours} jours pour décrocher ton brevet</h3>
                <p className="mt-2 max-w-lg text-sm text-white/75">Fractions, Pythagore, probabilités, équations, Thalès… notion par notion jusqu&apos;au jour J.</p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-black text-white transition-all group-hover:bg-emerald-400 group-hover:gap-3">Commencer le sprint <span className="transition-transform group-hover:translate-x-1">→</span></div>
              </div>
              <div className="absolute right-6 top-6 rounded-xl border border-white/20 bg-black/60 px-4 py-2 text-center backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">Compte à rebours</p>
                <p className="text-3xl font-black text-white">J−{jours}</p>
              </div>
            </Link>
          ) : (
            <Link href="/defis-du-jour" className="group relative block h-[220px] overflow-hidden rounded-2xl shadow-2xl sm:h-[280px]">
              <Image src={defiDuJour.defi.image ?? "/images/defis-du-jour/coupe-monde-foot.webp"} alt={defiDuJour.defi.title} fill sizes="(max-width: 1200px) 100vw, 1200px" className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                <span className="mb-3 inline-block rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-white">🎯 Défi du jour · {defiDuJour.defi.theme}</span>
                <h3 className="text-2xl font-black leading-tight text-white sm:text-3xl">{defiDuJour.defi.title}</h3>
                <p className="mt-2 line-clamp-2 max-w-lg text-sm text-white/75">{defiDuJour.defi.question}</p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-black text-white transition-all group-hover:bg-emerald-400 group-hover:gap-3">Relever le défi <span className="transition-transform group-hover:translate-x-1">→</span></div>
              </div>
              <div className="absolute right-6 top-6 rounded-xl border border-white/20 bg-black/60 px-4 py-2 text-center backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">Aujourd&apos;hui</p>
                <p className="text-2xl font-black text-white">⚽</p>
                <p className="text-[10px] font-bold text-white/60">Jour {defiDuJour.day}/7</p>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* ── NOUVEAUTÉS ───────────────────────────────────────────────────────── */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-black text-white">✨ Nouveautés</h2>
            <span className="text-xs font-bold text-white/40">Fais glisser →</span>
          </div>
          {/* Fondu à droite : montre qu'il y a d'autres cartes à faire défiler
              (retour élève du 11/06/2026 : « on voit pas la droite de nouveautés ») */}
          <div className="relative">
          <div
            ref={nouveautes.ref}
            {...nouveautes.handlers}
            className="flex gap-3 overflow-x-auto pb-3 pr-12 cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {[
              { icon: "☀️", label: "Cahiers de vacances",  desc: "CE2 → Bac +1 · à imprimer",                href: "/cahier-vacances",              color: "from-teal-600 to-emerald-800" },
              { icon: "🎓", label: "Éval blanche Pix IA",  desc: "Prépa éval nationale, collège & lycée",  href: "/eval-pix-ia",                  color: "from-indigo-600 to-violet-800" },
              { icon: "📄", label: "Fiches de cours IA",   desc: "16 fiches par domaine du référentiel Pix", href: "/fiches-cours/ia",            color: "from-violet-600 to-fuchsia-800" },
              { icon: "📕", label: "Ebook IA",             desc: "Le livre « Comprendre l'IA » (PDF/EPUB)", href: "/fiches-cours/ia/livre",        color: "from-blue-600 to-indigo-800"  },
              { icon: "🇪🇸", label: "Parcours Espagnol",  desc: "Bilan de niveau A1 → B2 avec audio",    href: "/parcours-espagnol",           color: "from-rose-600 to-red-800"     },
              { icon: "🇪🇸", label: "Coach Espagnol",     desc: "A1 → B2, vocabulaire & audio",          href: "/coach-ia/espagnol",           color: "from-red-600 to-rose-800"     },
              { icon: "🇬🇧", label: "Coach English",       desc: "A1 → B2, vocabulaire maths en anglais",  href: "/coach-ia/english-maths",       color: "from-sky-600 to-blue-800"     },
              { icon: "🎧", label: "Parcours English",     desc: "Bilan de niveau CECRL avec audio",        href: "/parcours-english-maths",       color: "from-orange-600 to-amber-700" },
              { icon: "🤖", label: "Parcours IA",          desc: "Culture & bons réflexes IA, A1 → C1",     href: "/parcours-ia",                  color: "from-violet-600 to-purple-800" },
              { icon: "💰", label: "Coach Économie",       desc: "Entreprise, marché, élections…",          href: "/coach-ia/economie",            color: "from-amber-600 to-yellow-700" },
              { icon: "⚽", label: "Défis du jour",        desc: "Coupe du monde · Maths",                  href: "/defis-du-jour",                color: "from-emerald-600 to-teal-700" },
              { icon: "🌿", label: "Environnement B1",     desc: "Biodiversité, climat, écosystèmes",       href: "/coach-ia/english-maths?niveau=b1", color: "from-lime-600 to-green-700" },
            ].map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="group relative flex h-[110px] w-[190px] shrink-0 flex-col justify-between overflow-hidden rounded-xl border border-white/10 p-4 transition-all hover:-translate-y-1 hover:border-white/30 hover:shadow-lg"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${n.color} opacity-80 transition-opacity group-hover:opacity-100`} />
                <div className="relative z-10 flex items-start justify-between">
                  <span className="text-2xl">{n.icon}</span>
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-black tracking-wider text-white">NEW</span>
                </div>
                <div className="relative z-10">
                  <p className="text-sm font-black text-white leading-tight">{n.label}</p>
                  <p className="mt-0.5 text-[11px] leading-tight text-white/70">{n.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#041B33] to-transparent" />
          </div>
        </div>
      </section>

      {/* ── AVIS EN UNE LIGNE (sous l'image) — retour d'une élève ────────────── */}
      <section className="border-b border-white/10 px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 sm:gap-3">
          <span
            className="shrink-0 text-sm tracking-widest text-amber-300"
            aria-label={`Note ${avisLigne.note} sur 5`}
          >
            {"★".repeat(avisLigne.note)}
          </span>
          <p className="min-w-0 truncate text-xs font-medium text-white/85 sm:text-sm">
            «&nbsp;{avisLigne.quote}&nbsp;»
            <span className="ml-1.5 font-black text-white/55">
              — {avisLigne.prenom} · {avisLigne.detail}
            </span>
          </p>
          <Link
            href="/votre-avis"
            className="shrink-0 text-[11px] font-black text-emerald-300 transition hover:translate-x-0.5 sm:text-xs"
          >
            Donner mon avis →
          </Link>
        </div>
      </section>

      {/* ── ÉLÈVES À L'HONNEUR ───────────────────────────────────────────────── */}
      <ElevesALHonneur eleves={honneur} />

      {/* ── REMERCIEMENTS ────────────────────────────────────────────────────── */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="flex flex-wrap items-center gap-2 text-lg font-black text-white">
              🙏 Merci à nos élèves testeurs
              <span className="rounded-full border border-yellow-300/30 bg-yellow-300/10 px-2 py-0.5 text-[11px] font-black text-yellow-200">
                {elevesRemercies.length} élèves
              </span>
            </h2>
            <Link
              href="/remerciements"
              className="text-xs font-black text-yellow-300 transition hover:translate-x-1 hover:text-yellow-200"
            >
              Voir la page →
            </Link>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/65">
            EleveAI est construit <span className="font-bold text-white/90">avec ses élèves</span> : leurs idées,
            les bugs qu&apos;ils repèrent et leurs avis font avancer la plateforme.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {/* clé prénom + action : deux élèves peuvent porter le même prénom (deux Maëlle) */}
            {elevesRemercies.map((e) => (
              <span
                key={`${e.prenom}-${e.action}`}
                title={e.action}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] py-1.5 pl-2 pr-3.5 text-sm font-bold text-white/90 transition hover:-translate-y-0.5 hover:border-yellow-300/50 hover:bg-white/[0.12]"
              >
                <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 text-[11px] font-black text-slate-900">
                  {e.prenom.charAt(0)}
                </span>
                <span className="font-black text-yellow-300">{e.prenom}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── LE PRIX, ASSUMÉ — philosophie VueSchool (« $25/month » en clair en
          bas de page) : apprendre est gratuit, l'accompagnement se paie. ────── */}
      <section className="px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-emerald-300/25 bg-gradient-to-br from-emerald-400/[0.10] to-white/[0.03] p-6 text-center sm:p-8">
          <h2 className="text-xl font-black text-white sm:text-2xl">
            Apprendre est <span className="text-emerald-300">gratuit</span>.
            L&apos;accompagnement, c&apos;est notre métier.
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm font-semibold leading-6 text-white/75">
            Dictée, défis, cahiers, coach en accès libre : gratuit, et ça le
            restera. Ce qui se paie, c&apos;est le suivi dans la durée — un coach
            qui se souvient de votre enfant et une progression visible.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm font-black">
            <span className="rounded-full bg-white/10 px-4 py-2 text-white">
              👨‍👩‍👧 Famille · 5,90 €/mois
            </span>
            <span className="rounded-full bg-white/10 px-4 py-2 text-white">
              🏫 Établissement · 4 €/élève/an — gratuit pour les familles
            </span>
          </div>
          <Link
            href="/tarifs"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-black text-[#041B33] transition hover:brightness-110"
          >
            Voir les offres →
          </Link>
        </div>
      </section>

      {/* ── GOOGLE FOLLOW ────────────────────────────────────────────────────── */}
      <div className="flex justify-center py-8">
        <GoogleFollowChip />
      </div>

      {/* ── COACH FLOTTANT ───────────────────────────────────────────────────── */}
      <FloatingCoach />

    </main>
  );
}
