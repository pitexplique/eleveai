"use client";

// ─── L'ACCUEIL = LA UNE D'UN QUOTIDIEN ─────────────────────────────────────────
// Refonte du 15/07/2026 : la page d'accueil devient un journal d'actualités
// (façon Le Monde / Le Figaro / NYT) — papier, empattements, filets, colonnes.
//
// Le pourquoi (Frédéric) : chaque matin, l'élève ouvre sa Une et fait 3 gestes —
//   RÉFLÉCHIR  (ce qui se passe autour de lui : l'île, le réel, « en vrai »)
//   APPRENDRE  (le coach, une notion, le défi et la dictée du jour)
//   SE DIRIGER (sa recommandation perso — écrite en humain, jamais en score)
//
// Et le journal est le lieu où TOUT LE MONDE se retrouve :
//   l'élève (l'édition à son prénom, le courrier, à l'honneur),
//   le prof (bandeau staff, rubrique enseignants),
//   le responsable d'établissement (rubrique institution),
//   le parent (l'édito, la rubrique parents).
//
// Deux éditions du même journal :
//   « kiosque »  = visiteur non connecté (la Une commune)
//   « à ton nom » = élève connecté → bloc « L'édition de {prénom} » (reco du jour)
//
// RGPD : prénoms seuls, jamais reliés à une classe/un établissement précis.

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEleve } from "@/context/EleveContext";
import { problemesFixed } from "@/lib/defis-du-jour/problemes.fixed";
import { problemeDuJourWeekly } from "@/lib/defis-du-jour/weekly";
import GoogleFollowChip from "@/components/GoogleFollowChip";
import FloatingCoach from "@/components/FloatingCoach";
import StaffAccueilBanner from "@/components/accueil/StaffAccueilBanner";
import AgendaJournal from "@/components/accueil/AgendaJournal";
import { type EleveALHonneur } from "@/lib/ameliorations/aLHonneur";
import { prenomFromNom } from "@/lib/prenom";
import { elevesRemercies } from "@/lib/remerciements/eleves";
import type { RecoDuJour } from "@/lib/profil-eleve/types";

// ─── La palette « papier journal » ─────────────────────────────────────────────
// Fond papier crème, encre quasi noire, filets fins. UNE couleur d'accent (le
// vert EleveAI, assombri pour l'imprimé) + le rouge réservé au « EN DIRECT ».
const PAPER = "#f6f1e4";
const INK = "#1d1c16";

// ─── Constantes éditoriales ────────────────────────────────────────────────────

// Numéro d'édition : le n° 1 est daté du 15/07/2026 (naissance du journal).
const EDITION_EPOCH = new Date("2026-07-15T00:00:00");
function numeroEdition() {
  const diff = Date.now() - EDITION_EPOCH.getTime();
  return Math.max(1, Math.floor(diff / (1000 * 60 * 60 * 24)) + 1);
}

const BREVET_DATE = new Date("2026-06-27T08:00:00");
function joursAvantBrevet() {
  const diff = BREVET_DATE.getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

const CHAINE_SABONNER = "https://www.youtube.com/@eleveai-e1h?sub_confirmation=1";

// ─── L'article à la Une + les brèves « en vrai » ──────────────────────────────
// Série éditoriale courte → en dur ici. Le PREMIER épisode de la liste est
// l'article à la Une (le plus récent) ; les autres deviennent des brèves.
type Episode = {
  emoji: string;
  titre: string;
  accroche: string;
  youtubeId: string;
};

const UNE: Episode = {
  emoji: "🌾",
  titre: "La canne à sucre : du champ à la lumière",
  accroche:
    "Suis un planteur : sa canne devient du jus, du sirop, des cristaux au Gol. Et la bagasse fait de l'électricité — la canne donne du sucre ET de la lumière. Derrière, une filière de 18 000 personnes qu'on n'oublie jamais.",
  youtubeId: "hH2N0Cvx-AI",
};

const BREVES: Episode[] = [
  {
    emoji: "🦈",
    titre: "Les requins : la peur et le risque réel",
    accroche: "~10 morts/an dans le monde ; la route : ~1 300 000. Et le requin garde le récif qui fait le lagon.",
    youtubeId: "3bPBjYsRciA",
  },
  {
    emoji: "🌋",
    titre: "Le Piton de la Fournaise",
    accroche: "La lave à 1 100 °C, et un volcan qui fabrique de la terre neuve.",
    youtubeId: "4f2U1RAgk_A",
  },
  {
    emoji: "🌀",
    titre: "Les cyclones",
    accroche: "L'œil, les vents, et le record du monde de pluie... à La Réunion !",
    youtubeId: "0WUIzfICz4o",
  },
  {
    emoji: "🥛",
    titre: "Le lait de la Plaine des Cafres",
    accroche: "10 litres de lait pour 1 seul kg de fromage, du pré des hauts au yaourt.",
    youtubeId: "UjblKadInPw",
  },
  {
    emoji: "💧",
    titre: "L'eau de La Réunion",
    accroche: "Il pleut 20 fois plus à l'Est qu'à l'Ouest. De l'océan à ton robinet.",
    youtubeId: "zLpqiueEIEc",
  },
];

// ─── Les pages « matières » (le coach) ─────────────────────────────────────────

const MATIERES = [
  { icon: "🧮", label: "Maths", desc: "Calculer, raisonner, prouver", href: "/coach-ia/maths", cm: true },
  { icon: "📖", label: "Français", desc: "Lire, comprendre, s'exprimer", href: "/coach-ia/francais", cm: true },
  { icon: "🇬🇧", label: "Anglais", desc: "Comprendre, parler, progresser", href: "/coach-ia/english-maths", cm: true },
  { icon: "🇪🇸", label: "Espagnol", desc: "Comprendre, parler, découvrir", href: "/coach-ia/espagnol", cm: false },
  { icon: "🤖", label: "IA", desc: "Comprendre et maîtriser l'IA", href: "/coach-ia/ia", cm: false },
  { icon: "📊", label: "Économie", desc: "Comprendre le monde économique", href: "/coach-ia/economie", cm: false },
];

const PARCOURS = [
  { label: "Maths", href: "/parcours", cm: true },
  { label: "Français", href: "/parcours-francais", cm: true },
  { label: "Anglais", href: "/parcours-english-maths", cm: true },
  { label: "Espagnol", href: "/parcours-espagnol", cm: false },
  { label: "IA", href: "/parcours-ia", cm: false },
];

// Niveaux pour lesquels le coach sait pré-sélectionner la classe via ?classe=.
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

// ─── Le catalogue COMPLET — « les pages du journal » ──────────────────────────
// Tout ce que le site offre, rangé et listé (demande de Frédéric : rien ne
// manque). Chaque entrée = une petite annonce du journal.
const CATALOGUE: { emoji: string; nom: string; ligne: string; href: string }[] = [
  { emoji: "🤖", nom: "Le coach IA", ligne: "Il explique, il ne fait jamais à ta place — du CP au Bac.", href: "/coach-ia/maths" },
  { emoji: "🧭", nom: "Les parcours", ligne: "Teste ton niveau, vois tes forces, matière par matière.", href: "/parcours" },
  { emoji: "✍️", nom: "La dictée du jour", ligne: "5 mots à écrire sans faute, tous les jours, avec l'audio.", href: "/dictee-du-jour" },
  { emoji: "🎯", nom: "Les défis du jour", ligne: "Un vrai problème chaque jour — foot, volcan, océan...", href: "/defis-du-jour" },
  { emoji: "⚡", nom: "Calcul rapide", ligne: "Des automatismes en quelques minutes chrono.", href: "/calcul-rapide" },
  { emoji: "📚", nom: "Les fiches de cours", ligne: "La leçon claire + les corrections repliables.", href: "/fiches-cours" },
  { emoji: "🏖️", nom: "Les cahiers de vacances", ligne: "À imprimer, du CE2 au Bac +1 — avec Ti Margo.", href: "/cahier-vacances" },
  { emoji: "🖼️", nom: "Picto Maths · 974", ligne: "1 image, 1 question : 25 défis visuels de l'île.", href: "/picto-maths" },
  { emoji: "🗺️", nom: "La carte de l'île", ligne: "Les maths posées sur la carte de La Réunion.", href: "/carte" },
  { emoji: "🌋", nom: "Maths Réel · 974", ligne: "Le carnet de terrain : photos et vidéos, en vrai.", href: "/maths-974" },
  { emoji: "🗣️", nom: "Le dico mots & gestes", ligne: "Le vocabulaire de l'évaluation nationale 6e.", href: "/dico" },
  { emoji: "🃏", nom: "Qui suis-je ? à imprimer", ligne: "Des jeux de cartes pour réviser en famille.", href: "/qui-suis-je-a-imprimer" },
  { emoji: "🎓", nom: "Éval blanche Pix IA", ligne: "Prépare l'évaluation nationale Pix IA (16 questions).", href: "/eval-pix-ia" },
  { emoji: "🏃", nom: "Le coach Brevet", ligne: "Notion par notion jusqu'au jour J.", href: "/coach-brevet" },
  { emoji: "📋", nom: "Le programme par classe", ligne: "Ce qu'on apprend cette année, noir sur blanc.", href: "/programme/6e" },
  { emoji: "🔭", nom: "Tout explorer", ligne: "La table des matières complète d'EleveAI.", href: "/explorer" },
];

// ─── Le supplément de l'été : les cahiers de vacances ─────────────────────────
// Porte d'entrée SEO n°1 (stats) → vitrine visuelle. Les classes de dégradé
// sont en clair (literals) pour que Tailwind les génère.
const CAHIERS_VACANCES = [
  { slug: "vers-le-ce2",        niveau: "CE1 → CE2",       titre: "Vers le CE2",       theme: "On apprend en jouant",                    emoji: "🎲", grad: "from-orange-400 to-amber-500" },
  { slug: "vers-le-cm1",        niveau: "CE2 → CM1",       titre: "Vers le CM1",       theme: "Ti Margo explore son jardin",             emoji: "🌳", grad: "from-lime-400 to-green-600" },
  { slug: "vers-le-cm2",        niveau: "CM1 → CM2",       titre: "Vers le CM2",       theme: "Ti Margo découvre son île",               emoji: "🏖️", grad: "from-teal-400 to-emerald-600" },
  { slug: "vers-la-6e",         niveau: "CM2 → 6ᵉ",        titre: "Vers la 6ᵉ",        theme: "Le grand voyage vers la 6ᵉ",              emoji: "🎓", grad: "from-yellow-400 to-amber-600" },
  { slug: "vers-la-5e",         niveau: "6ᵉ → 5ᵉ",         titre: "Vers la 5ᵉ",        theme: "Le tour de l'océan Indien",               emoji: "🐋", grad: "from-sky-400 to-blue-600" },
  { slug: "vers-la-4e",         niveau: "5ᵉ → 4ᵉ",         titre: "Vers la 4ᵉ",        theme: "Le tour du monde en 80 jours",            emoji: "🌍", grad: "from-indigo-400 to-blue-700" },
  { slug: "vers-la-3e",         niveau: "4ᵉ → 3ᵉ",         titre: "Vers la 3ᵉ",        theme: "Le grand voyage spatial",                 emoji: "🚀", grad: "from-fuchsia-500 to-purple-700" },
  { slug: "vers-la-2nde",       niveau: "3ᵉ → 2ⁿᵈᵉ",       titre: "Vers la 2ⁿᵈᵉ",      theme: "Le grand zoom, de l'atome à l'univers",   emoji: "🔭", grad: "from-rose-400 to-pink-600" },
  { slug: "vers-la-premiere",   niveau: "2ⁿᵈᵉ → 1ʳᵉ",      titre: "Vers la 1ʳᵉ",       theme: "La créativité pour changer le monde",     emoji: "💡", grad: "from-violet-500 to-fuchsia-600" },
  { slug: "vers-la-terminale",  niveau: "1ʳᵉ → Terminale", titre: "Vers la Terminale", theme: "Les maths et l'IA pour changer le monde", emoji: "🤖", grad: "from-emerald-400 to-teal-700" },
  { slug: "vers-le-bac-plus-1", niveau: "Terminale → Bac +1", titre: "Vers le Bac +1", theme: "Inventer les solutions de demain",        emoji: "🛠️", grad: "from-cyan-400 to-indigo-600" },
];

// ─── Types partagés avec page.tsx (serveur) ────────────────────────────────────

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

// ─── Petites briques typographiques du journal ────────────────────────────────

// Le surtitre de rubrique (petites capitales espacées, comme dans un quotidien).
function Kicker({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <p
      id={id}
      className="scroll-mt-24 text-[11px] font-black uppercase tracking-[0.22em] text-emerald-900"
    >
      {children}
    </p>
  );
}

// Le titre de rubrique : serif + double filet dessous (la grammaire broadsheet).
function TitreRubrique({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-1 border-b-2 border-[#1d1c16] pb-2">
      <h2 className="font-serif text-3xl font-black leading-tight sm:text-4xl">
        {children}
      </h2>
    </div>
  );
}

// ─── « L'édition de {prénom} » — la reco du jour, écrite en humain ─────────────
// Consomme GET /api/profil-eleve (comme l'ancien RecoDuJourAccueil) mais la
// rend façon journal : pas de score en avant, une voix de rédaction qui te
// connaît. Ne rend RIEN si pas connecté / erreur (l'édition kiosque suffit).
function EditionPerso() {
  const { eleve } = useEleve();
  const token = eleve?.token ?? null;

  const [reco, setReco] = useState<RecoDuJour | null>(null);
  const [prenom, setPrenom] = useState<string | null>(null);
  const [serie, setSerie] = useState<number>(0);
  const [etat, setEtat] = useState<"idle" | "chargement" | "ok" | "erreur">("idle");

  useEffect(() => {
    if (!token) return;
    let annule = false;
    setEtat("chargement");

    fetch("/api/profil-eleve", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        if (annule) return;
        const rdj: RecoDuJour | undefined = data?.profil?.reco_du_jour;
        if (data?.ok && rdj?.principale) {
          setReco(rdj);
          setPrenom(data.profil.prenom ?? null);
          setSerie(data.profil.comportement?.serie ?? 0);
          setEtat("ok");
        } else {
          setEtat("erreur");
        }
      })
      .catch(() => {
        if (!annule) setEtat("erreur");
      });

    return () => {
      annule = true;
    };
  }, [token]);

  const prenomLocal = getPrenomAffiche(eleve?.nom);
  const nomEdition = prenom ?? prenomLocal;

  if (!token || etat === "erreur") return null;

  return (
    <section className="mx-auto mt-6 max-w-6xl border-y-4 border-double border-[#1d1c16] px-1 py-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <Kicker>Se diriger · Pour toi aujourd&apos;hui</Kicker>
        {serie >= 2 && (
          <p className="text-xs font-bold italic text-[#1d1c16]/60">
            Tu es venu {serie} jours d&apos;affilée — la rédaction te salue. 🔥
          </p>
        )}
      </div>
      <h2 className="mt-1 font-serif text-2xl font-black leading-tight sm:text-3xl">
        {nomEdition ? `L'édition de ${nomEdition}` : "Ton édition du jour"}
      </h2>

      {etat === "chargement" || !reco ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="h-28 animate-pulse rounded-sm bg-[#1d1c16]/5" />
          <div className="h-28 animate-pulse rounded-sm bg-[#1d1c16]/5" />
        </div>
      ) : (
        <div className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {[reco.principale, ...(reco.alternative ? [reco.alternative] : [])].map(
            (carte) => (
              <Link
                key={carte.titre}
                href={carte.lien}
                className="group border-t border-[#1d1c16]/25 pt-3"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
                  {carte.emoji} {carte.categorie}
                </p>
                <h3 className="mt-1 font-serif text-xl font-black leading-snug group-hover:underline">
                  {carte.titre}
                </h3>
                <p className="mt-1 text-sm font-medium leading-6 text-[#1d1c16]/75">
                  {carte.message}
                </p>
                <p className="mt-2 text-sm font-black text-emerald-900 transition group-hover:translate-x-0.5">
                  {carte.cta} →
                </p>
              </Link>
            ),
          )}
        </div>
      )}
    </section>
  );
}

// ─── La page ───────────────────────────────────────────────────────────────────

export default function AccueilPage({
  avis,
  honneur,
  apercu974,
}: {
  avis?: AvisPublic[];
  honneur?: EleveALHonneur[];
  apercu974?: Apercu974[];
}) {
  const { eleve } = useEleve();
  const derniersAvis = avis && avis.length > 0 ? avis : AVIS_FALLBACK;

  const eleveClasse = eleve?.classe?.toLowerCase() ?? null;
  const prenomAffiche = getPrenomAffiche(eleve?.nom);
  const isCmPrimary = eleveClasse === "cm1" || eleveClasse === "cm2";
  const isStaff =
    eleve?.type_utilisateur === "prof" ||
    eleve?.type_utilisateur === "principal" ||
    eleve?.type_utilisateur === "boss";

  const jours = joursAvantBrevet();

  // Date du jour en toutes lettres + n° d'édition. Calculés au montage pour
  // éviter tout écart SSR/client (fuseau) — le squelette « — » ne clignote pas.
  const [dateEdition, setDateEdition] = useState<{ date: string; numero: number } | null>(null);
  useEffect(() => {
    const brute = new Date().toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setDateEdition({
      date: brute.charAt(0).toUpperCase() + brute.slice(1),
      numero: numeroEdition(),
    });
  }, []);

  // Défi réellement programmé aujourd'hui (même logique que /defis-du-jour).
  const defiDuJour = useMemo(() => {
    const today = new Date().getDay();
    const mapping: Record<number, number> = { 0: 6, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5 };
    const index = mapping[today] ?? 0;
    const dayConfig = problemeDuJourWeekly.days[index];
    const defi =
      problemesFixed.find((p) => p.id === dayConfig.problemId) ?? problemesFixed[0];
    return { defi, day: dayConfig.day };
  }, []);

  // Passe la classe de l'élève au coach quand le niveau est géré.
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
  const matieres = isCmPrimary ? MATIERES.filter((m) => m.cm) : MATIERES;
  const parcours = isCmPrimary ? PARCOURS.filter((p) => p.cm) : PARCOURS;

  return (
    <main
      className="min-h-screen px-4 pb-16 pt-6 sm:px-6 lg:px-8"
      style={{ backgroundColor: PAPER, color: INK }}
    >
      {/* ══ LA MANCHETTE ═════════════════════════════════════════════════════ */}
      <header className="mx-auto max-w-6xl">
        {/* L'oreille : date · n° · lieu · prix — et la connexion à droite. */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1d1c16]/30 pb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#1d1c16]/70">
          <p>
            La Réunion · {dateEdition ? dateEdition.date : "—"} · N°{" "}
            {dateEdition ? dateEdition.numero : "—"}
          </p>
          <p className="hidden sm:block">Gratuit — sans publicité</p>
          {/* Pas de bouton « Se connecter » ici : le header papier au-dessus
              s'en charge (sinon deux boutons identiques à 60 px d'écart). */}
          {eleve ? (
            <p className="normal-case tracking-normal">
              ☀️ Bonjour{prenomAffiche ? ` ${prenomAffiche}` : ""}
            </p>
          ) : (
            <p className="hidden sm:block">Édition du kiosque</p>
          )}
        </div>

        {/* Le titre du journal + la devise (le manifeste, en Une). */}
        <div className="border-b-4 border-double border-[#1d1c16] py-5 text-center">
          <h1 className="font-serif text-5xl font-black leading-none tracking-tight sm:text-6xl lg:text-7xl">
            Le Journal d&apos;EleveAI
          </h1>
          <p className="mt-2 font-serif text-base font-black italic tracking-wide text-[#1d1c16]/75 sm:text-lg">
            — Île de La Réunion —
          </p>
          <p className="mt-1.5 text-xs font-bold uppercase tracking-[0.3em] text-[#1d1c16]/65 sm:text-sm">
            Fait par les élèves et les profs — pas l&apos;un sans l&apos;autre 🦎
          </p>
        </div>

        {/* Le chemin de fer : les rubriques (ancres internes). */}
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 border-b border-[#1d1c16]/30 py-2 text-[11px] font-black uppercase tracking-[0.16em]">
          <a href="#la-une" className="hover:text-emerald-900">La Une</a>
          <span aria-hidden className="text-[#1d1c16]/30">·</span>
          <a href="#en-vrai" className="hover:text-emerald-900">En vrai</a>
          <span aria-hidden className="text-[#1d1c16]/30">·</span>
          <a href="#apprendre" className="hover:text-emerald-900">Apprendre</a>
          <span aria-hidden className="text-[#1d1c16]/30">·</span>
          <a href="#catalogue" className="hover:text-emerald-900">Le catalogue</a>
          <span aria-hidden className="text-[#1d1c16]/30">·</span>
          <a href="#courrier" className="hover:text-emerald-900">Le courrier</a>
          <span aria-hidden className="text-[#1d1c16]/30">·</span>
          <a href="#honneur" className="hover:text-emerald-900">À l&apos;honneur</a>
          <span aria-hidden className="text-[#1d1c16]/30">·</span>
          <a href="#les-grands" className="hover:text-emerald-900">Parents & profs</a>
        </nav>

        {/* Les trois gestes du matin — la promesse du journal, en une ligne. */}
        <p className="border-b border-[#1d1c16]/30 py-1.5 text-center text-[11px] font-bold italic text-[#1d1c16]/60">
          Chaque matin : réfléchir · apprendre · se diriger.
        </p>
      </header>

      {/* ══ L'ÉDITION PERSONNALISÉE (connecté) ═══════════════════════════════ */}
      {isStaff ? (
        <div className="mx-auto mt-6 max-w-6xl">
          <StaffAccueilBanner />
        </div>
      ) : (
        <EditionPerso />
      )}

      {/* ══ LA UNE — 3 colonnes : l'article · le fil du jour · l'édito ═══════ */}
      <section id="la-une" className="mx-auto mt-6 max-w-6xl scroll-mt-24">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* L'article à la Une (RÉFLÉCHIR : ce qui se passe autour de toi). */}
          <article className="lg:col-span-7">
            <Kicker>Réfléchir · En vrai, à La Réunion</Kicker>
            <h2 className="mt-2 font-serif text-3xl font-black leading-tight sm:text-4xl lg:text-[2.6rem]">
              {UNE.titre}
            </h2>
            <p className="mt-3 font-serif text-base font-medium leading-7 text-[#1d1c16]/85 sm:text-lg">
              {UNE.accroche}
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-[#1d1c16]/55">
              Par la rédaction — avec les élèves de La Réunion
            </p>
            <a
              href={`https://youtu.be/${UNE.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 block border border-[#1d1c16]/25"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-[#1d1c16]/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${UNE.youtubeId}/hqdefault.jpg`}
                  alt={UNE.titre}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-700/90 text-xl text-white shadow-xl transition group-hover:scale-110">
                    ▶
                  </span>
                </span>
              </div>
              <p className="border-t border-[#1d1c16]/25 px-3 py-2 text-xs font-medium italic text-[#1d1c16]/65">
                Au Gol, la canne devient sucre — et lumière. Regarder l&apos;épisode (4 min) →
              </p>
            </a>
            <p className="mt-3 text-sm font-bold">
              🎯 Le défi de l&apos;épisode : la proportionnalité — 3 000 m² de
              canne, combien de sucre ?{" "}
              <a href="#en-vrai" className="font-black text-emerald-900 underline underline-offset-2">
                Tous les épisodes ↓
              </a>
            </p>

            {/* À lire aussi — la rivière de titres (façon portail MSN) : des
                manchettes cliquables qui irriguent le reste du site. */}
            <div className="mt-5 border-t-2 border-[#1d1c16] pt-3">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
                À lire aussi
              </p>
              <ul className="mt-2 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {[
                  { emoji: "🖼️", titre: "Picto Maths : 25 défis en images de l'île", href: "/picto-maths" },
                  { emoji: "🗺️", titre: "La carte de La Réunion, lieu par lieu, avec les maths dedans", href: "/carte" },
                  { emoji: "🃏", titre: "« Qui suis-je ? » — le jeu de cartes à imprimer en famille", href: "/qui-suis-je-a-imprimer" },
                  { emoji: "🗣️", titre: "Le dico : les 50 mots de l'évaluation nationale 6ᵉ", href: "/dico" },
                  { emoji: "📚", titre: "Les fiches de cours, notion par notion, avec corrections", href: "/fiches-cours" },
                  { emoji: "🎓", titre: "Pix IA : l'éval blanche pour arriver prêt le jour J", href: "/eval-pix-ia" },
                ].map((l) => (
                  <li key={l.href} className="border-b border-dotted border-[#1d1c16]/30 pb-2">
                    <Link href={l.href} className="group flex items-baseline gap-2">
                      <span aria-hidden className="text-sm">{l.emoji}</span>
                      <span className="font-serif text-[15px] font-black leading-snug group-hover:underline">
                        {l.titre}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* Le fil du jour (APPRENDRE : les rendez-vous quotidiens). */}
          <aside className="border-[#1d1c16]/25 lg:col-span-3 lg:border-l lg:pl-6">
            <Kicker>Apprendre · Aujourd&apos;hui</Kicker>
            <div className="mt-2 divide-y divide-[#1d1c16]/20">
              <Link href="/defis-du-jour" className="group block py-3">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
                  🎯 Le défi du jour · {defiDuJour.defi.theme}
                </p>
                <div className="relative mt-2 aspect-[16/7] w-full overflow-hidden border border-[#1d1c16]/20">
                  <Image
                    src={defiDuJour.defi.image ?? "/images/defis-du-jour/coupe-monde-foot.webp"}
                    alt={defiDuJour.defi.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 300px"
                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="mt-1 font-serif text-lg font-black leading-snug group-hover:underline">
                  {defiDuJour.defi.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm font-medium text-[#1d1c16]/70">
                  {defiDuJour.defi.question}
                </p>
                <p className="mt-1.5 text-sm font-black text-emerald-900">Relever le défi →</p>
              </Link>

              <Link href="/dictee-du-jour" className="group block py-3">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
                  ✍️ La dictée du jour
                </p>
                <h3 className="mt-1 font-serif text-lg font-black leading-snug group-hover:underline">
                  5 mots à écrire sans faute
                </h3>
                <p className="mt-1 text-sm font-medium text-[#1d1c16]/70">
                  Avec l&apos;audio, toutes matières. Ta série continue ? 🔥
                </p>
                <p className="mt-1.5 text-sm font-black text-emerald-900">Écrire la dictée →</p>
              </Link>

              <Link href="/calcul-rapide" className="group block py-3">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
                  ⚡ Calcul rapide
                </p>
                <h3 className="mt-1 font-serif text-lg font-black leading-snug group-hover:underline">
                  3 minutes d&apos;automatismes
                </h3>
                <p className="mt-1.5 text-sm font-black text-emerald-900">Chronomètre →</p>
              </Link>

              {jours > 0 && (
                <Link href="/coach-brevet" className="group block py-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-red-800">
                    🏃 Sprint Brevet
                  </p>
                  <h3 className="mt-1 font-serif text-lg font-black leading-snug group-hover:underline">
                    J−{jours} avant le brevet
                  </h3>
                  <p className="mt-1.5 text-sm font-black text-emerald-900">Commencer le sprint →</p>
                </Link>
              )}

            </div>
          </aside>

          {/* L'édito — le moment humain, signé (photo + lettre repliée). */}
          <aside className="border-[#1d1c16]/25 lg:col-span-2 lg:border-l lg:pl-6">
            <Kicker>L&apos;édito</Kicker>
            <Image
              src="/images/avatar-frederic-Lacoste.jpg"
              alt="Frédéric Lacoste"
              width={56}
              height={56}
              className="mt-3 h-14 w-14 rounded-full border border-[#1d1c16]/30 object-cover grayscale"
            />
            <h3 className="mt-2 font-serif text-lg font-black leading-snug">
              Aux parents et à leurs enfants
            </h3>
            <p className="mt-2 text-sm font-medium leading-6 text-[#1d1c16]/80">
              Merci pour cette année. EleveAI est né dans ma classe, pour mes
              élèves — et il reste{" "}
              <strong className="font-black">gratuit et ouvert tout l&apos;été</strong>.
            </p>
            <details className="mt-1">
              <summary className="cursor-pointer list-none text-xs font-black text-emerald-900 underline underline-offset-2">
                Lire la suite ▾
              </summary>
              <p className="mt-2 text-sm font-medium leading-6 text-[#1d1c16]/80">
                <strong className="font-black">Aux parents :</strong> quelques
                minutes par jour suffisent — la dictée, un défi, une fiche.
                Aucune pression, juste le plaisir d&apos;apprendre à son rythme,
                en confiance (et sans publicité).
              </p>
              <p className="mt-2 text-sm font-medium leading-6 text-[#1d1c16]/80">
                <strong className="font-black">Aux élèves :</strong> je suis
                fier de vous. Reposez-vous, profitez des vôtres et du soleil…
                et revenez quand l&apos;envie vous prend. 🌴
              </p>
            </details>
            <p className="mt-3 font-serif text-sm font-black italic">
              — M. Lacoste, professeur de mathématiques
            </p>
          </aside>
        </div>
      </section>

      {/* ══ LA MOSAÏQUE — l'actualité en images, façon portail MSN : de grandes
          tuiles cliquables (image + titre posé dessus). Chaque tuile mène à un
          rendez-vous du site. ═════════════════════════════════════════════ */}
      <section className="mx-auto mt-10 max-w-6xl">
        <Kicker>En un clic · L&apos;actualité en images</Kicker>
        <div className="mt-2 border-t-2 border-[#1d1c16]" />
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {/* Le défi du jour — la vraie image du défi programmé aujourd'hui. */}
          <Link
            href="/defis-du-jour"
            className="group relative block aspect-[4/3] overflow-hidden rounded-sm border border-[#1d1c16]/20 lg:aspect-[16/9]"
          >
            <Image
              src={defiDuJour.defi.image ?? "/images/defis-du-jour/coupe-monde-foot.webp"}
              alt={defiDuJour.defi.title}
              fill
              sizes="(max-width: 1024px) 50vw, 400px"
              className="object-cover transition duration-300 group-hover:scale-[1.04]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <span className="absolute bottom-0 left-0 p-3">
              <span className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-300">
                🎯 Le défi du jour
              </span>
              <span className="mt-0.5 block font-serif text-base font-black leading-snug text-white sm:text-lg">
                {defiDuJour.defi.title}
              </span>
            </span>
          </Link>

          {/* L'épisode à la Une — vignette YouTube. */}
          <a
            href={`https://youtu.be/${UNE.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-[4/3] overflow-hidden rounded-sm border border-[#1d1c16]/20 lg:aspect-[16/9]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${UNE.youtubeId}/hqdefault.jpg`}
              alt={UNE.titre}
              loading="lazy"
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <span className="absolute bottom-0 left-0 p-3">
              <span className="text-[10px] font-black uppercase tracking-[0.16em] text-red-300">
                ▶ La vidéo de la semaine
              </span>
              <span className="mt-0.5 block font-serif text-base font-black leading-snug text-white sm:text-lg">
                {UNE.emoji} {UNE.titre}
              </span>
            </span>
          </a>

          {/* Les rendez-vous sans photo : tuiles à dégradé (style cahiers). */}
          {(
            [
              { emoji: "✍️", kicker: "Tous les jours", titre: "La dictée du jour : 5 mots sans faute", href: "/dictee-du-jour", grad: "from-sky-500 to-indigo-700" },
              { emoji: "🏖️", kicker: "Le supplément", titre: "Les cahiers de vacances à imprimer", href: "/cahier-vacances", grad: "from-amber-400 to-orange-600" },
              { emoji: "🖼️", kicker: "L'île en images", titre: "Picto Maths : 25 défis « 1 image, 1 question »", href: "/picto-maths", grad: "from-emerald-500 to-teal-700" },
              { emoji: "🗺️", kicker: "L'exploration", titre: "La chasse aux trésors sur la carte de l'île", href: "/carte", grad: "from-violet-500 to-fuchsia-700" },
            ] as const
          ).map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={`group relative block aspect-[4/3] overflow-hidden rounded-sm border border-[#1d1c16]/20 bg-gradient-to-br ${t.grad} lg:aspect-[16/9]`}
            >
              <span
                aria-hidden
                className="absolute right-2 top-2 text-5xl opacity-30 transition duration-300 group-hover:scale-110 group-hover:opacity-50 sm:text-6xl"
              >
                {t.emoji}
              </span>
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span className="absolute bottom-0 left-0 p-3">
                <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/80">
                  {t.emoji} {t.kicker}
                </span>
                <span className="mt-0.5 block font-serif text-base font-black leading-snug text-white sm:text-lg">
                  {t.titre}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ══ EN VRAI — les brèves de la série + le terrain ═════════════════════ */}
      <section id="en-vrai" className="mx-auto mt-10 max-w-6xl scroll-mt-24">
        <Kicker>Réfléchir · La série « en vrai »</Kicker>
        <TitreRubrique>L&apos;île comme salle de classe</TitreRubrique>
        {/* Façon portail : l'image d'abord (vignette YouTube), le titre dessous. */}
        <div className="mt-4 grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {BREVES.map((ep) => (
            <a
              key={ep.youtubeId}
              href={`https://youtu.be/${ep.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group border-t border-[#1d1c16]/25 pt-3"
            >
              <div className="relative aspect-video w-full overflow-hidden border border-[#1d1c16]/20 bg-[#1d1c16]/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${ep.youtubeId}/hqdefault.jpg`}
                  alt={ep.titre}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-700/90 text-sm text-white shadow-lg transition group-hover:scale-110">
                    ▶
                  </span>
                </span>
              </div>
              <h3 className="mt-2 font-serif text-lg font-black leading-snug group-hover:underline">
                {ep.emoji} {ep.titre}
              </h3>
              <p className="mt-1 text-sm font-medium leading-6 text-[#1d1c16]/70">
                {ep.accroche}
              </p>
            </a>
          ))}

          {/* Vu sur l'île : les posts du carnet de terrain (maths_974), en
              cartes visuelles mêlées aux vidéos — le « fil de l'île ». */}
          {(apercu974 ?? []).map((c) => {
            const img =
              c.image_url ??
              (c.youtube_id ? `https://i.ytimg.com/vi/${c.youtube_id}/hqdefault.jpg` : null);
            return (
              <Link key={c.id} href="/maths-974" className="group border-t border-[#1d1c16]/25 pt-3">
                <div className="relative aspect-video w-full overflow-hidden border border-[#1d1c16]/20 bg-[#1d1c16]/5">
                  {img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={img}
                      alt={c.titre}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-4xl" aria-hidden>
                      📸
                    </span>
                  )}
                  <span className="absolute left-2 top-2 rounded-sm bg-[#1d1c16]/80 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-[#f6f1e4]">
                    📍 {c.lieu}
                  </span>
                </div>
                <h3 className="mt-2 font-serif text-lg font-black leading-snug group-hover:underline">
                  {c.titre}
                </h3>
                {c.notion && (
                  <p className="mt-1 text-sm font-medium leading-6 text-[#1d1c16]/70">
                    🧮 {c.notion}
                  </p>
                )}
              </Link>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[#1d1c16]/25 pt-4">
          <a
            href={CHAINE_SABONNER}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-red-700 px-4 py-2 text-sm font-black text-white transition hover:bg-red-600"
          >
            ▶ S&apos;abonner à la chaîne
          </a>
          <Link
            href="/carte"
            className="text-sm font-black text-emerald-900 underline underline-offset-2"
          >
            🗺️ Les maths sur la carte de l&apos;île →
          </Link>
        </div>
      </section>

      {/* ══ APPRENDRE — les pages matières (le coach) + les parcours ═════════ */}
      <section id="apprendre" className="mx-auto mt-10 max-w-6xl scroll-mt-24">
        <Kicker>Apprendre · Les pages matières</Kicker>
        <TitreRubrique>
          Le coach t&apos;explique{classeLabel ? ` — ta classe : ${classeLabel}` : ", du CP au Bac"}
        </TitreRubrique>
        <div className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {matieres.map((m) => (
            <Link
              key={m.label}
              href={getHref(m.href)}
              className="group border-t border-[#1d1c16]/25 pt-3"
            >
              <h3 className="font-serif text-xl font-black leading-snug group-hover:underline">
                {m.icon} {m.label}
              </h3>
              <p className="mt-1 text-sm font-medium text-[#1d1c16]/70">{m.desc}</p>
              <p className="mt-1.5 text-sm font-black text-emerald-900">Ouvrir le coach →</p>
            </Link>
          ))}
        </div>

        {/* Faire le point : les parcours, en une ligne de journal. */}
        <p className="mt-5 border-t border-[#1d1c16]/25 pt-3 text-sm font-medium text-[#1d1c16]/80">
          <span className="font-black">🧭 Faire le point d&apos;abord ?</span>{" "}
          Teste ton niveau :{" "}
          {parcours.map((p, i) => (
            <span key={p.href}>
              {i > 0 && <span className="text-[#1d1c16]/40"> · </span>}
              <Link href={p.href} className="font-black text-emerald-900 underline underline-offset-2">
                {p.label}
              </Link>
            </span>
          ))}
          <span className="text-[#1d1c16]/40"> · </span>
          <Link href="/eval-pix-ia" className="font-black text-emerald-900 underline underline-offset-2">
            Éval blanche Pix IA
          </Link>
          <span className="text-[#1d1c16]/40"> — et les leçons sont dans les </span>
          <Link href="/fiches-cours" className="font-black text-emerald-900 underline underline-offset-2">
            fiches de cours
          </Link>
          .
        </p>
      </section>

      {/* ══ LE SUPPLÉMENT DE L'ÉTÉ — les cahiers de vacances ═════════════════
          Porte d'entrée n°1 du site (stats 15/07 : /cahier-vacances truste le
          top des pages vues) → une vraie vitrine visuelle, pas une ligne. */}
      <section id="cahiers" className="mx-auto mt-10 max-w-6xl scroll-mt-24">
        <Kicker>Le supplément de l&apos;été · À imprimer</Kicker>
        <TitreRubrique>Les cahiers de vacances — du CE1 au Bac +1</TitreRubrique>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CAHIERS_VACANCES.map((c) => (
            <Link
              key={c.slug}
              href={`/cahier-vacances/${c.slug}`}
              className={`group flex flex-col justify-between rounded-sm bg-gradient-to-br ${c.grad} p-3 text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg`}
            >
              <p className="text-2xl" aria-hidden>{c.emoji}</p>
              <div className="mt-3">
                <p className="text-[10px] font-black uppercase tracking-wide text-white/80">
                  {c.niveau}
                </p>
                <p className="font-serif text-base font-black leading-tight">{c.titre}</p>
                <p className="mt-0.5 text-[11px] font-semibold leading-4 text-white/85">
                  {c.theme}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-2 text-xs font-medium italic text-[#1d1c16]/60">
          Gratuits, imprimables, avec Ti Margo 🦎 —{" "}
          <Link href="/cahier-vacances" className="font-black text-emerald-900 underline underline-offset-2">
            tous les cahiers →
          </Link>
        </p>
      </section>

      {/* ══ L'AGENDA — les calls en direct, version papier (coupon détachable).
          Lit lib/calls.ts ; ne rend rien si aucun call actif à venir. ════════ */}
      <AgendaJournal />

      {/* ══ LE CATALOGUE — les petites annonces : TOUT est listé ═════════════ */}
      <section id="catalogue" className="mx-auto mt-10 max-w-6xl scroll-mt-24">
        <Kicker>Le catalogue · Tout ce que le journal contient</Kicker>
        <TitreRubrique>
          Tout pour apprendre — <em className="not-italic underline decoration-emerald-800 decoration-4 underline-offset-4">gratuit</em>
        </TitreRubrique>
        <div className="mt-4 grid gap-px overflow-hidden border border-[#1d1c16]/25 bg-[#1d1c16]/25 sm:grid-cols-2 lg:grid-cols-4">
          {CATALOGUE.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group p-4 transition hover:bg-white/60"
              style={{ backgroundColor: PAPER }}
            >
              <p className="text-3xl" aria-hidden>{c.emoji}</p>
              <h3 className="mt-2 font-serif text-base font-black leading-snug group-hover:underline">
                {c.nom}
              </h3>
              <p className="mt-1 text-xs font-medium leading-5 text-[#1d1c16]/70">
                {c.ligne}
              </p>
            </Link>
          ))}
        </div>
        <p className="mt-2 text-xs font-medium italic text-[#1d1c16]/60">
          Apprendre est gratuit, et ça le restera. Ce qui se paie : le suivi dans
          la durée —{" "}
          <Link href="/tarifs" className="font-black text-emerald-900 underline underline-offset-2">
            voir les offres
          </Link>
          .
        </p>
      </section>

      {/* ══ LE COURRIER DES LECTEURS — les avis, verbatim (fautes comprises) ══ */}
      <section id="courrier" className="mx-auto mt-10 max-w-6xl scroll-mt-24">
        <Kicker>Se retrouver · Le courrier des lecteurs</Kicker>
        <TitreRubrique>Ce que les élèves nous écrivent</TitreRubrique>
        <div className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-3">
          {derniersAvis.slice(0, 3).map((a) => (
            <figure key={`${a.prenom}-${a.quote.slice(0, 12)}`} className="border-t border-[#1d1c16]/25 pt-3">
              <p className="text-sm tracking-widest text-amber-600" aria-label={`Note ${a.note} sur 5`}>
                {"★".repeat(a.note)}
              </p>
              <blockquote className="mt-1 font-serif text-base font-medium italic leading-7 text-[#1d1c16]/85">
                « {a.quote} »
              </blockquote>
              <figcaption className="mt-2 text-xs font-black uppercase tracking-[0.14em] text-[#1d1c16]/55">
                — {a.prenom} · {a.detail}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#1d1c16]/25 pt-3">
          <Link
            href="/votre-avis"
            className="inline-flex items-center gap-2 rounded-sm bg-[#1d1c16] px-4 py-2 text-sm font-black text-[#f6f1e4] transition hover:bg-emerald-900"
          >
            ✉️ Écrire au journal
          </Link>
          <p className="text-xs font-medium italic text-[#1d1c16]/60">
            Les lettres sont publiées telles quelles, fautes comprises : ce sont
            de vrais élèves qui écrivent.
          </p>
        </div>
      </section>

      {/* ══ ILS FONT LE JOURNAL — à l'honneur + les remerciements ════════════ */}
      <section id="honneur" className="mx-auto mt-10 max-w-6xl scroll-mt-24">
        <Kicker>Se retrouver · Ils font le journal</Kicker>
        <TitreRubrique>À l&apos;honneur cette semaine</TitreRubrique>
        <div className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-3">
          {(honneur ?? []).map((h) => (
            <div key={`${h.categorie}-${h.eleve}`} className="border-t border-[#1d1c16]/25 pt-3">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
                {h.emoji} {h.categorie}
              </p>
              <h3 className="mt-1 font-serif text-xl font-black">{h.eleve}</h3>
              <p className="mt-1 text-sm font-medium leading-6 text-[#1d1c16]/75">{h.pour}</p>
            </div>
          ))}
        </div>

        {/* L'ours des contributeurs : tous les prénoms des élèves testeurs. */}
        <div className="mt-5 border-t border-[#1d1c16]/25 pt-3">
          <p className="text-sm font-medium leading-7 text-[#1d1c16]/80">
            <span className="font-black">🙏 Merci à nos {elevesRemercies.length} élèves testeurs :</span>{" "}
            {elevesRemercies.map((e, i) => (
              <span key={`${e.prenom}-${e.action}`} title={e.action} className="font-serif font-black">
                {i > 0 && <span className="font-sans font-medium text-[#1d1c16]/40"> · </span>}
                {e.prenom}
              </span>
            ))}
          </p>
          <p className="mt-2 text-sm font-medium text-[#1d1c16]/70">
            Leurs idées, les bugs qu&apos;ils repèrent et leurs avis font avancer
            la plateforme.{" "}
            <Link href="/remerciements" className="font-black text-emerald-900 underline underline-offset-2">
              La page des remerciements →
            </Link>{" "}
            <span className="text-[#1d1c16]/40">·</span>{" "}
            <Link href="/besoin-de-vous" className="font-black text-emerald-900 underline underline-offset-2">
              EleveAI a besoin de vous →
            </Link>
          </p>
        </div>
      </section>

      {/* ══ LA PAGE DES GRANDS — parents, enseignants, établissements ════════ */}
      <section id="les-grands" className="mx-auto mt-10 max-w-6xl scroll-mt-24">
        <Kicker>La page des grands</Kicker>
        <TitreRubrique>Parents, enseignants, établissements</TitreRubrique>
        <div className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-3">
          <Link href="/parents" className="group border-t border-[#1d1c16]/25 pt-3">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">👪 Parents</p>
            <h3 className="mt-1 font-serif text-xl font-black leading-snug group-hover:underline">
              L&apos;IA explique, elle ne triche pas
            </h3>
            <p className="mt-1 text-sm font-medium leading-6 text-[#1d1c16]/75">
              Encadrée, sans publicité, données protégées. Et gratuit si le
              collège de votre enfant l&apos;utilise.
            </p>
            <p className="mt-1.5 text-sm font-black text-emerald-900">En savoir plus →</p>
          </Link>
          <Link href="/enseignants" className="group border-t border-[#1d1c16]/25 pt-3">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">🍎 Enseignants</p>
            <h3 className="mt-1 font-serif text-xl font-black leading-snug group-hover:underline">
              Suivez leur progression
            </h3>
            <p className="mt-1 text-sm font-medium leading-6 text-[#1d1c16]/75">
              Le travail de chaque élève en temps réel, ses moyennes par
              matière. EleveAI corrige&nbsp;; vous, vous enseignez.
            </p>
            <p className="mt-1.5 text-sm font-black text-emerald-900">En savoir plus →</p>
          </Link>
          <Link href="/espace-ecoles" className="group border-t border-[#1d1c16]/25 pt-3">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">🏫 Établissements</p>
            <h3 className="mt-1 font-serif text-xl font-black leading-snug group-hover:underline">
              Financé par l&apos;établissement, gratuit pour les familles
            </h3>
            <p className="mt-1 text-sm font-medium leading-6 text-[#1d1c16]/75">
              Multi-matières, suivi classe par classe, RGPD maîtrisé.
              ✓ Déjà utilisé en collège, à La Réunion.
            </p>
            <p className="mt-1.5 text-sm font-black text-emerald-900">En savoir plus →</p>
          </Link>
        </div>

        {/* Français de l'étranger — la ligne fine (insight d'Arthur). */}
        <Link
          href="/francais-de-l-etranger"
          className="mt-4 block border-t border-[#1d1c16]/25 pt-3 text-sm font-medium text-[#1d1c16]/80"
        >
          <span className="font-black">🌍 Vous vivez à l&apos;étranger ?</span>{" "}
          Le programme français et la dictée quotidienne, à votre fuseau
          horaire.{" "}
          <span className="font-black text-emerald-900 underline underline-offset-2">Découvrir →</span>
        </Link>

        {/* Le prix, assumé — en clair, comme un encart tarifs de journal. */}
        <div className="mt-6 border-y-2 border-[#1d1c16] py-4 text-center">
          <h3 className="font-serif text-2xl font-black">
            Apprendre est gratuit. L&apos;accompagnement, c&apos;est notre métier.
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm font-medium leading-6 text-[#1d1c16]/75">
            Dictée, défis, cahiers, coach en accès libre — gratuit, et ça le
            restera. Ce qui se paie : le suivi dans la durée, un coach qui se
            souvient de votre enfant.
          </p>
          <p className="mt-3 text-sm font-black">
            👨‍👩‍👧 Famille · 5,90 €/mois
            <span className="mx-3 text-[#1d1c16]/40">|</span>
            🏫 Établissement · 4 €/élève/an — gratuit pour les familles
          </p>
          <Link
            href="/tarifs"
            className="mt-3 inline-flex items-center gap-2 rounded-sm bg-[#1d1c16] px-5 py-2.5 text-sm font-black text-[#f6f1e4] transition hover:bg-emerald-900"
          >
            Voir les offres →
          </Link>
        </div>
      </section>

      {/* ══ L'OURS — qui fait ce journal (le pied de page du quotidien) ══════ */}
      <footer className="mx-auto mt-10 max-w-6xl border-t-4 border-double border-[#1d1c16] pt-4 text-center">
        <p className="font-serif text-sm font-black">Le Journal d&apos;EleveAI</p>
        <p className="mx-auto mt-1 max-w-3xl text-xs font-medium leading-6 text-[#1d1c16]/70">
          Écrit à La Réunion. Rédaction : les élèves et les profs. Fondé par
          Frédéric Lacoste, professeur de mathématiques. Sans publicité —{" "}
          <Link href="/politique-confidentialite" className="font-black underline underline-offset-2">
            données protégées
          </Link>
          {" · "}
          <Link href="/pourquoi-eleveai" className="font-black underline underline-offset-2">
            pourquoi EleveAI
          </Link>
          {" · "}
          <Link href="/contact" className="font-black underline underline-offset-2">
            écrire à la rédaction
          </Link>
        </p>
        <div className="mt-4 flex justify-center pb-2">
          <GoogleFollowChip />
        </div>
      </footer>

      {/* Le coach flottant reste : c'est le kiosquier qu'on peut interpeller. */}
      <FloatingCoach />
    </main>
  );
}
