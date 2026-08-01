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
import { chiffreDuJour } from "@/lib/chiffre-du-jour";
import { problemeDuJourWeekly } from "@/lib/defis-du-jour/weekly";
import GoogleFollowChip from "@/components/GoogleFollowChip";
import FloatingCoach from "@/components/FloatingCoach";
import StaffAccueilBanner from "@/components/accueil/StaffAccueilBanner";
import AgendaJournal from "@/components/accueil/AgendaJournal";
import AbonnementJournal from "@/components/accueil/AbonnementJournal";
import ReclameMachine from "@/components/accueil/ReclameMachine";
import RituelDuJourChip from "@/components/accueil/RituelDuJourChip";
import MachinesPanel from "@/components/simulateurs/MachinesPanel";
import CarteMachine from "@/components/simulateurs/CarteMachine";
import { NB_MACHINES } from "@/lib/simulateurs";
import { getDicteeDuJour, type DicteeMot } from "@/lib/dictee-du-jour/words";
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
  /** Le défi maths de l'épisode, affiché sous l'article (optionnel). */
  defi?: string;
};

const UNE: Episode = {
  emoji: "🌾",
  titre: "La canne à sucre : du champ à la lumière",
  accroche:
    "Suis un planteur : sa canne devient du jus, du sirop, des cristaux au Gol. Et la bagasse fait de l'électricité — la canne donne du sucre ET de la lumière. Derrière, une filière de 18 000 personnes qu'on n'oublie jamais.",
  youtubeId: "hH2N0Cvx-AI",
  defi: "la proportionnalité — 3 000 m² de canne, combien de sucre ?",
};

const BREVES: Episode[] = [
  {
    emoji: "🪡",
    titre: "L'aiguille de Kakeya : Hong Wang, médaille Fields 2026",
    accroche:
      "Peut-on tourner sans être vu ? L'aire fond vers 0… mais pas la dimension. De l'aiguille au rempart du Piton de la Fournaise — l'idée d'une médaille Fields, avec un défi.",
    youtubeId: "jhb0HjHO2sg",
    defi: "les tiroirs — 18 ombres dans 5 boîtes : la plus pleine en contient au moins combien ?",
  },
  {
    emoji: "💪",
    titre: "1 minute à fond = même pas un carré de chocolat",
    accroche:
      "250 W pendant une minute : 15 000 joules, 3,6 kcal. Le rendement musculaire de 25 % explique tout — et pourquoi tu as chaud.",
    youtubeId: "XdBT05f9_F0",
    defi: "les conversions — 250 × 60 = 15 000 J, puis ÷ 4 184 pour les kcal.",
  },
  {
    emoji: "🏃",
    titre: "La Diagonale des Fous : comment doser sa course ?",
    accroche: "165 km, barrière 66 h : trop vite tu tapes le mur, trop lent la barrière te rattrape. L'équation du coureur, en images.",
    youtubeId: "MF7G9VhU07I",
  },
  {
    emoji: "🦈",
    titre: "Les requins : la peur et le risque réel",
    accroche: "~10 morts/an dans le monde ; la route : ~1 300 000. Et le requin garde le récif qui fait le lagon.",
    youtubeId: "3bPBjYsRciA",
    defi: "les probabilités — morsure : 1 chance sur 4 000 000 ; la route : 1 sur 4 000.",
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
  // Économie masquée de la grille le 23/07 (pas assez fournie) ; route gardée.
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
  "cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e",
  "seconde", "premiere-spe", "terminale-spe",
]);
const FRANCAIS_LEVELS = new Set([
  "cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e",
]);
const CLASSE_LABELS: Record<string, string> = {
  cp: "CP", ce1: "CE1", ce2: "CE2", cm1: "CM1", cm2: "CM2",
  "6e": "6e", "5e": "5e", "4e": "4e", "3e": "3e",
  seconde: "2nde", "premiere-spe": "1re", "terminale-spe": "Terminale",
};

// La rampe d'entrée par classe (CP → Terminale) : le journal est joli, mais
// l'élève vient S'ENTRAÎNER — chaque classe mène direct au coach de son
// niveau. Slugs = la whitelist réelle de /coach-ia/[matiere] (normalizeClasse).
const CLASSES_ENTREE: { slug: string; label: string }[] = [
  { slug: "cp", label: "CP" },
  { slug: "ce1", label: "CE1" },
  { slug: "ce2", label: "CE2" },
  { slug: "cm1", label: "CM1" },
  { slug: "cm2", label: "CM2" },
  { slug: "6e", label: "6ᵉ" },
  { slug: "5e", label: "5ᵉ" },
  { slug: "4e", label: "4ᵉ" },
  { slug: "3e", label: "3ᵉ" },
  { slug: "seconde", label: "2ⁿᵈᵉ" },
  { slug: "premiere-spe", label: "1ʳᵉ" },
  { slug: "terminale-spe", label: "Term." },
];

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
  { emoji: "🌀", nom: "Dans l'œil du cyclone", ligne: "Le simulateur : trace la trajectoire, tiens le vent dans ta main.", href: "/simulateur-cyclone" },
  { emoji: "🏭", nom: "L'usine dans ta main", ligne: "La sucrerie simulée : règle la canne, récolte le sucre et la lumière.", href: "/simulateur-sucre" },
  { emoji: "🧀", nom: "La fromagerie dans ta main", ligne: "Le lait des Hauts simulé : du pré au pot de fromage frais.", href: "/simulateur-fromage" },
  { emoji: "💧", nom: "Le barrage dans ta main", ligne: "Takamaka simulé : l'eau tombe de 500 m, l'île s'allume.", href: "/simulateur-barrage" },
  { emoji: "🌋", nom: "Le volcan dans ta main", ligne: "La Fournaise simulée : règle la lave, l'île grandit sur l'océan.", href: "/simulateur-volcan" },
  { emoji: "🐠", nom: "Le lagon dans ta main", ligne: "L'Ermitage simulé : la barrière casse la houle, la plage reste calme.", href: "/simulateur-lagon" },
  { emoji: "🗣️", nom: "Le dico mots & gestes", ligne: "Le vocabulaire de l'évaluation nationale 6e.", href: "/dico" },
  { emoji: "🃏", nom: "Qui suis-je ? à imprimer", ligne: "Des jeux de cartes pour réviser en famille.", href: "/qui-suis-je-a-imprimer" },
  { emoji: "🎓", nom: "Éval blanche Pix IA", ligne: "Prépare l'évaluation nationale Pix IA (16 questions).", href: "/eval-pix-ia" },
  { emoji: "🏃", nom: "Le coach Brevet", ligne: "Notion par notion jusqu'au jour J.", href: "/coach-brevet" },
  { emoji: "📋", nom: "Le programme par classe", ligne: "Ce qu'on apprend cette année, noir sur blanc.", href: "/programme/6e" },
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

/** Un slide de la Une (régie du rédacteur en chef, table journal_une). */
export type SlideUne = {
  id: string;
  kicker: string;
  titre: string;
  accroche: string | null;
  youtubeId: string | null;
  imageUrl: string | null;
  lien: string;
  cta: string;
  defi: string | null;
  /** Créé aujourd'hui (heure Réunion) → pastille « paru aujourd'hui ». */
  nouveau?: boolean;
};

/** Un article d'une rubrique du journal (table journal_articles, patron régie). */
export type ArticleRubrique = {
  id: string;
  titre: string;
  accroche: string | null;
  imageUrl: string | null;
  lien: string;
  cta: string | null;
};

/** L'édito du jour (journal_articles, rubrique 'edito' — le plus récent). */
export type Edito = {
  id: string;
  titre: string;
  /** Le corps ; les paragraphes sont séparés par une ligne vide. */
  corps: string;
  lien: string | null;
  cta: string | null;
  /** « jeudi 24 juillet », calculé serveur à l'heure de l'île. */
  dateLabel: string | null;
  nouveau: boolean;
};

// L'édito de repli, resserré le 31/07. Il dit le POURQUOI ; les engagements,
// eux, vivent désormais dans le bloc « Le parti pris » plus bas — donc on ne
// les répète pas ici (sinon la page se redit deux fois). Ce qui reste : d'où
// vient ce journal, ce qu'on y fait chaque matin, la règle qui ne bougera pas,
// et l'accueil. Il ne s'affiche que si la rubrique 'edito' est vide en base.
const EDITO_FALLBACK: Edito = {
  id: "fallback",
  titre: "Ce qu'on a sous les yeux",
  corps: [
    "Je suis Frédéric Lacoste, professeur de mathématiques à La Réunion. Ce journal est né un soir de juillet, en relisant les mots de mes élèves. Je n'ai rien inventé : j'ai regardé par la fenêtre.",
    "La pluie qui tombe droit, la canne qui monte, les baleines qui reviennent, le volcan qui recommence. Tout ça se mesure — et un enfant qui compte ce qu'il aime finit par aimer compter.",
    "Alors chaque matin : un défi, une dictée, un coach qui explique sans jamais faire à ta place. Gratuit, et le même pour chacun — c'est la seule règle qui ne bougera pas.",
    "Bienvenue. Ici, tu es chez toi.",
  ].join("\n\n"),
  lien: null,
  cta: null,
  dateLabel: null,
  nouveau: false,
};

// « Un peu de maths » — repli en dur tant que la table journal_articles
// n'existe pas (même principe que la Une). Premier article : la machine
// des epsilons (la devise du site, à faire découvrir).
const ARTICLES_MATHS_FALLBACK: ArticleRubrique[] = [
  {
    id: "pourquoi-les-bulles-sont-rondes",
    titre: "Pourquoi les bulles sont rondes ?",
    accroche:
      "À ficelle égale, quelle forme enferme le plus de place ? Le cercle, toujours — et la bulle le « sait » sans calcul : sa peau se contracte pour prendre le moins de place. Cette question, la mathématicienne Yilin Wang (prix Salem 2024) se la posait déjà, enfant. Souffle ta bulle, puis relève les défis du CP à la Terminale.",
    imageUrl: "/images/bulles-rondes.svg",
    lien: "/pourquoi-les-bulles-sont-rondes",
    cta: "🫧 Souffle la bulle →",
  },
  {
    id: "dimension-du-volcan",
    titre: "La dimension du volcan : la rugosité se mesure",
    accroche:
      "La médaille Fields de Hong Wang récompense une idée : la dimension — le nombre qui dit à quel point une forme remplit l'espace. Et la dimension, ça se mesure : pose une grille sur le rempart de la Fournaise, compte les carrés que la crête traverse, affine. Une ligne lisse fait ×2 (d = 1) ; le rempart fait ×2,4 → d ≈ 1,25. La rugosité du volcan, en un seul nombre.",
    imageUrl: "/images/dimension-volcan.svg",
    lien: "/dimension-du-volcan",
    cta: "📏 Mesure le rempart →",
  },
  {
    id: "aiguille-de-kakeya",
    titre: "L'aiguille de Kakeya — Hong Wang, médaille Fields 2026",
    accroche:
      "Fais faire demi-tour à une aiguille en balayant le moins de place possible : 1,57 → 0,79 → 0,39… et les mathématiciens savent approcher 0. Le 23 juillet à Philadelphie, Hong Wang a reçu la médaille Fields pour avoir fermé la conjecture de Kakeya en 3D — en remerciant ses professeurs français. Troisième femme médaillée en 90 ans : pour elle, les maths ne font aucune différence entre les femmes et les hommes.",
    imageUrl: "/images/aiguille-de-kakeya.svg",
    lien: "/aiguille-de-kakeya",
    cta: "🪡 Fais tourner l'aiguille →",
  },
  {
    id: "diagonale-des-fous",
    titre: "La Diagonale des Fous : doser, ou taper le mur",
    accroche:
      "165 km à travers l'île, barrière à 66 h. Ta réserve se vide au carré de l'effort et avec la pente — c'est une équation différentielle. Pars trop fort, tu tapes le mur avant l'arrivée ; trop doucement, la barrière te rattrape. Règle l'allure, lance la course, et cherche le dosage qui vide la réserve pile à Saint-Denis.",
    imageUrl: "/images/diagonale-des-fous.svg",
    lien: "/diagonale-des-fous",
    cta: "🏃 Lance la course →",
  },
  {
    id: "exponentielle",
    titre: "Plus j'avance, plus ma vitesse augmente",
    accroche:
      "Tout est parti d'un dessin au stylo : deux courbes en miroir. La montée — ta vitesse grandit avec ta hauteur, le plat du début n'est pas l'échec, c'est l'élan qui se charge. La descente — la courbe de l'oubli, qu'on relance en révisant. Oublier n'est pas un échec, c'est une loi.",
    imageUrl: "/images/exponentielle-miroir.svg",
    lien: "/exponentielle",
    cta: "🌱 Fais grandir ta vitesse →",
  },
  {
    id: "loi-normale",
    titre: "La courbe en cloche n'est pas tombée du ciel",
    accroche:
      "Tout est parti d'un dessin au stylo sur une feuille à carreaux : une courbe dentelée, une flèche « n → ∞ », une courbe lisse. La loi normale n'est pas un décret — c'est la limite d'une loi à coefficients. Fais grandir n, regarde l'escalier devenir cloche (De Moivre l'a prouvé en 1733), et apprends à ne jamais te juger sur une seule note.",
    imageUrl: "/images/binomiale-vers-normale.svg",
    lien: "/loi-normale",
    cta: "🔔 Fais grandir n →",
  },
  {
    id: "loi-performance",
    titre: "Faut-il améliorer ses défauts ou ses qualités ?",
    accroche:
      "Un soir de juillet, une interview de Mbappé : « améliore tes défauts, mais SURTOUT tes qualités ». J'ai dessiné ça sur une feuille à carreaux — ton ADN te donne des traits, tu poses des coefficients, un réseau de neurones les combine, et il en sort ta performance. C'est un neurone : une somme pondérée Σ aᵢxᵢ. Règle tes coefficients et vois.",
    imageUrl: "/images/adn-reseau-coeur.svg",
    lien: "/loi-performance",
    cta: "🧠 Règle tes coefficients →",
  },
  {
    id: "loi-pareto",
    titre: "Le but qui sort de la moyenne",
    accroche:
      "« On renforce ses défauts, mais ce sont nos qualités qui nous différencient » (Mbappé). En maths : combler ses défauts, c'est la loi normale — on converge vers la moyenne. Mais un record, « meilleur buteur de la Coupe du monde », n'est jamais une moyenne : c'est une valeur extrême, née dans la queue lourde de la loi de Pareto. Pousse le curseur, joue une saison, et regarde les buteurs d'exception surgir.",
    imageUrl: "/images/pareto-mbappe.svg",
    lien: "/loi-pareto",
    cta: "⚽ Fais surgir les records →",
  },
  {
    id: "epsilon",
    titre: "Activer des epsilons peut engendrer des infinis",
    accroche:
      "Chaque étincelle en allume k autres. Pousse le coefficient : à k = 2, ton premier infini s'allume — la suite géométrique, le R₀ des épidémies et l'entraide dans un seul curseur. En créole : « In min i lav lot ».",
    imageUrl: "/images/coeur-epsilon-infini.svg",
    lien: "/simulateur-epsilon",
    cta: "⚡ Active un epsilon →",
  },
];

/** Une action du catalogue (projection minimale de catalogue_actions). */
export type ActionJournal = {
  id: string;
  famille: string;
  label: string;
  description: string | null;
  route: string;
};

// La table n'a pas de colonne emoji : mapping par id, repli par famille.
const CATALOGUE_EMOJIS: Record<string, string> = {
  "coach-maths": "🧮", "coach-francais": "📖", "coach-anglais": "🇬🇧",
  "coach-espagnol": "🇪🇸", "coach-ia": "🤖", "coach-economie": "📊",
  "defis-du-jour": "🎯", "calcul-rapide": "⚡", "dictee-du-jour": "✍️",
  "semaine-verbes": "📅", "dico-maths": "🗣️", "dico-francais": "🗣️",
  "anglais-du-jour": "🇬🇧", "espagnol-du-jour": "🇪🇸",
  "podcast-maths": "🎧", "fiches-maths": "📚", "fiches-ia": "📚",
  "livre-ia": "📕", "maths-974": "🌋", "le-bon-prompt": "💬",
  "picto-maths": "🖼️", "carte-tresor": "🗺️", "eval-pix-ia": "🎓",
  "simulateur-cyclone": "🌀",
  "simulateur-sucre": "🏭",
  "simulateur-fromage": "🧀",
  "simulateur-barrage": "💧",
  "simulateur-volcan": "🌋",
  "simulateur-lagon": "🐠",
  "simulateur-energie": "💪",
  "grand-oral": "🎤", "concours-ia": "🏆", "concours-general": "🏆",
  "concours-logo": "🎨", "cahier-vacances": "🏖️", "cahier-maths": "🏖️",
};
const FAMILLE_EMOJIS: Record<string, string> = {
  coach: "🤖", parcours: "🧭", rituel: "📅", reviser: "📚",
  ouverture: "🌋", evenement: "🏆", cahier: "🏖️",
};
const FAMILLE_LABELS: Record<string, string> = {
  coach: "Le coach", parcours: "Faire le point", rituel: "Chaque jour",
  reviser: "Réviser", ouverture: "L'île & l'ouverture",
  evenement: "Événements & concours", cahier: "À imprimer",
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
      className="scroll-mt-24 text-[11px] font-black uppercase tracking-[0.22em] text-cyan-800"
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

// ─── Le carrousel de la Une — façon MSN, piloté par la RÉGIE ───────────────────
// Les slides viennent de la table journal_une (éditée dans /admin/journal par
// le rédacteur en chef) ; repli sur les 6 épisodes en dur si la base est vide.
// Auto 8 s, flèches ‹ › et points, pause au survol.
// La pastille « aujourd'hui » : un point qui bat + le mot. C'est LE signal
// que la page a changé depuis hier (objectif de Frédéric, 18/07 : le lecteur
// doit VOIR que ça bouge chaque jour) — posée sur ce qui est vraiment frais :
// le slide paru le jour même, le défi, la dictée.
function PastilleJour({ label = "aujourd'hui" }: { label?: string }) {
  return (
    <span className="inline-flex translate-y-[-1px] items-center gap-1.5 rounded-sm bg-red-700 px-1.5 py-0.5 align-middle text-[9px] font-black uppercase tracking-[0.14em] text-white">
      <span aria-hidden className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
      </span>
      {label}
    </span>
  );
}

// LE MOT DU JOUR — l'appât de la dictée : on lit l'indice ici, on écoute et
// on écrit le mot sur /dictee-du-jour. La réponse reste disponible SUR PLACE
// (règle de l'accueil : jamais de question sans sa réponse dessous) via le
// dépliant « Voir le mot ». Calculé APRÈS montage (comme la page dictée) pour
// éviter le décalage d'hydratation sur la date.

// (La vignette animée du guide de survie est partie avec la mise au même
// format que les cahiers de vacances — 01/08. Elle est dans l'historique git
// si un jour un livret mérite sa propre illustration.)

function MotDuJourEncart() {
  const [mot, setMot] = useState<DicteeMot | null>(null);
  useEffect(() => {
    setMot(getDicteeDuJour(new Date(), 5)[0]);
  }, []);
  if (!mot) return null;
  return (
    <div className="mt-3 border-2 border-[#1d1c16] p-3">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
        ✍️ Le mot du jour · {mot.matiere} <PastilleJour />
      </p>
      <p className="mt-1.5 text-sm font-medium leading-6 text-[#1d1c16]/70">
        💡 {mot.indice}
      </p>
      <Link
        href="/dictee-du-jour"
        className="mt-1.5 inline-block text-xs font-black text-cyan-800 underline underline-offset-2 hover:text-[#1d1c16]"
      >
        Écoute-le et écris-le — la dictée du jour →
      </Link>
      <details className="mt-1">
        <summary className="cursor-pointer text-xs font-black text-[#1d1c16]/55 underline underline-offset-2 hover:text-[#1d1c16]">
          Voir le mot ▾
        </summary>
        <p className="mt-1 border-l-2 border-cyan-800/40 pl-2.5 font-serif text-lg font-black">
          {mot.mot}
        </p>
      </details>
    </div>
  );
}

function UneCarousel({ slides }: { slides?: SlideUne[] }) {
  const items = useMemo<SlideUne[]>(() => {
    if (slides && slides.length > 0) return slides;
    // Repli : les épisodes historiques, projetés au format SlideUne.
    return [UNE, ...BREVES].map((e) => ({
      id: e.youtubeId,
      kicker: "Réfléchir · En vrai, à La Réunion",
      titre: e.titre,
      accroche: e.accroche,
      youtubeId: e.youtubeId,
      imageUrl: null,
      lien: `https://youtu.be/${e.youtubeId}`,
      cta: `${e.emoji} Regarder l'épisode →`,
      defi: e.defi ?? null,
    }));
  }, [slides]);

  const [index, setIndex] = useState(0);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause || items.length < 2) return;
    // 6 s : assez vivant pour montrer la richesse, assez lent pour lire le
    // chapô (2 s testé et rejeté — illisible). Pause au survol.
    const id = setInterval(
      () => setIndex((i) => (i + 1) % items.length),
      6000,
    );
    return () => clearInterval(id);
  }, [pause, items.length]);

  const ep = items[index % items.length];
  const externe = /^https?:\/\//.test(ep.lien);
  const image =
    ep.youtubeId
      ? `https://i.ytimg.com/vi/${ep.youtubeId}/hqdefault.jpg`
      : ep.imageUrl;

  const carte = (
    <>
      <div className="relative aspect-video w-full overflow-hidden bg-[#1d1c16]/5">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={ep.titre}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-6xl" aria-hidden>
            🗞️
          </span>
        )}
        {ep.youtubeId && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-700/90 text-xl text-white shadow-xl transition group-hover:scale-110">
              ▶
            </span>
          </span>
        )}
      </div>
      {/* La barre sous l'image = le CTA du slide : bien visible (encre pleine),
          pas une légende grisée (retour Frédéric : « on ne voit pas le titre
          sous l'image »). */}
      <p className="bg-[#1d1c16] px-3 py-2.5 text-sm font-black text-[#f6f1e4] transition group-hover:bg-cyan-800">
        {ep.cta}
      </p>
    </>
  );

  return (
    <div onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)}>
      <p className="scroll-mt-24 text-[11px] font-black uppercase tracking-[0.22em] text-cyan-800">
        {ep.kicker}
        {ep.nouveau && (
          <>
            {" "}
            <PastilleJour label="paru aujourd'hui" />
          </>
        )}
      </p>
      <h2 className="mt-2 font-serif text-3xl font-black leading-tight sm:text-4xl lg:text-[2.6rem]">
        {ep.titre}
      </h2>
      {ep.accroche && (
        <p className="mt-3 font-serif text-base font-medium leading-7 text-[#1d1c16]/70 sm:text-lg">
          {ep.accroche}
        </p>
      )}
      {/* Pas de signature « avec les élèves » tant que ce n'est pas VRAI
          (retour Frédéric 17/07) : l'authenticité d'abord — la mention
          reviendra le jour où des élèves signeront réellement la Une. */}

      <div className="relative mt-4">
        {externe ? (
          <a
            href={ep.lien}
            target="_blank"
            rel="noopener noreferrer"
            className="group block border border-[#1d1c16]/25"
          >
            {carte}
          </a>
        ) : (
          <Link href={ep.lien} className="group block border border-[#1d1c16]/25">
            {carte}
          </Link>
        )}

        {/* Les flèches ‹ › (façon MSN), posées sur l'image. */}
        <button
          type="button"
          aria-label="Épisode précédent"
          onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
          className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#1d1c16]/25 bg-[#f6f1e4]/90 text-xl font-black text-[#1d1c16] shadow transition hover:bg-[#f6f1e4]"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Épisode suivant"
          onClick={() => setIndex((i) => (i + 1) % items.length)}
          className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#1d1c16]/25 bg-[#f6f1e4]/90 text-xl font-black text-[#1d1c16] shadow transition hover:bg-[#f6f1e4]"
        >
          ›
        </button>
      </div>

      {/* Les points : un par slide. */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {items.map((e, i) => (
          <button
            key={e.id}
            type="button"
            aria-label={`Aller au slide : ${e.titre}`}
            onClick={() => setIndex(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === index % items.length ? "w-6 bg-[#1d1c16]" : "w-2.5 bg-[#1d1c16]/25 hover:bg-[#1d1c16]/50"
            }`}
          />
        ))}
      </div>

      {ep.defi ? (
        <p className="mt-3 text-sm font-bold">
          🎯 Le défi de l&apos;épisode : {ep.defi}{" "}
          <a href="#en-vrai" className="font-black text-cyan-800 underline underline-offset-2">
            Tous les épisodes ↓
          </a>
        </p>
      ) : (
        <p className="mt-3 text-sm font-bold">
          <a href="#en-vrai" className="font-black text-cyan-800 underline underline-offset-2">
            Tous les épisodes ↓
          </a>
        </p>
      )}
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
          <p className="text-xs font-bold italic text-[#1d1c16]/70">
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
                <p className="mt-1 text-sm font-medium leading-6 text-[#1d1c16]/70">
                  {carte.message}
                </p>
                <p className="mt-2 text-sm font-black text-cyan-800 transition group-hover:translate-x-0.5">
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
  catalogue,
  slides,
  articlesMaths,
  edito,
}: {
  avis?: AvisPublic[];
  honneur?: EleveALHonneur[];
  apercu974?: Apercu974[];
  catalogue?: ActionJournal[];
  slides?: SlideUne[];
  articlesMaths?: ArticleRubrique[];
  edito?: Edito | null;
}) {
  const { eleve } = useEleve();
  const derniersAvis = avis && avis.length > 0 ? avis : AVIS_FALLBACK;
  const unPeuDeMaths =
    articlesMaths && articlesMaths.length > 0 ? articlesMaths : ARTICLES_MATHS_FALLBACK;
  // L'édito vient de la base (régie /admin/articles, rubrique 'edito') ; le
  // repli n'est là que si personne n'en a encore publié un.
  const editoDuJour = edito ?? EDITO_FALLBACK;
  const editoParagraphes = editoDuJour.corps
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  // La rampe des classes : la classe cliquée déplie son choix de matières.
  const [classeDepliee, setClasseDepliee] = useState<string | null>(null);

  // L'avis d'élève en manchette (demande de Frédéric, 19/07) : rotation
  // douce sur les mêmes avis que le courrier des lecteurs (verbatim).
  const [avisIdx, setAvisIdx] = useState(0);
  useEffect(() => {
    if (derniersAvis.length < 2) return;
    const t = setInterval(() => setAvisIdx((i) => i + 1), 8000);
    return () => clearInterval(t);
  }, [derniersAvis.length]);
  const avisManchette = derniersAvis[avisIdx % derniersAvis.length];

  const eleveClasse = eleve?.classe?.toLowerCase() ?? null;
  const classeActive = classeDepliee ?? eleveClasse ?? "6e";
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
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1d1c16]/25 pb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#1d1c16]/70">
          <p>
            La Réunion · {dateEdition ? dateEdition.date : "—"} · N°{" "}
            {dateEdition ? dateEdition.numero : "—"}
          </p>
          {/* « Gratuit — sans publicité » est l'argument le plus fort de la
              page pour un professeur ou un parent, et il était en gris clair
              au milieu d'une ligne de service. On lui donne l'encre du
              journal (01/08). */}
          <p className="font-black text-cyan-800">Gratuit — sans publicité</p>
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

        {/* Le titre du journal + la devise (le manifeste, en Une) — encadré par
            les OREILLES de manchette : dans un vrai quotidien, les deux pavés
            de part et d'autre du titre sont les emplacements les plus vus du
            journal. Refonte 19/07 (demande de Frédéric) : une oreille par
            AUDIENCE — l'élève (coach + séries d'exercices) et le professeur
            (la connexion ouvre le tableau de suivi, la correction est faite).
            Style : fond clair, écriture bleu boucan canot. La dictée garde sa
            place dans « À lire aussi ». */}
        <div className="grid items-center gap-3 border-b-4 border-double border-[#1d1c16] py-5 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          {/* Oreille gauche — l'élève : le coach + les séries d'exercices.
              Destination /explorer (demande de Frédéric, 19/07) : l'oreille
              promet le coach ET les séries — /explorer montre tout et laisse
              choisir sa classe, le coach maths seul était réducteur. */}
          <Link
            href="/explorer"
            className="group order-2 border-2 border-cyan-800 bg-cyan-800 p-3 text-center text-[#f0fafc] transition hover:bg-[#f0fafc] hover:text-cyan-800 lg:order-1"
          >
            {/* NE PAS RÉPÉTER LE PAVÉ « COMMENCE ICI » (01/08) : l'oreille
                disait « Il t'explique, tu t'entraînes — tout est corrigé »
                et, 300 px plus bas, le pavé disait « Entraîne-toi maintenant
                — tout est corrigé ». Les deux se voient en même temps : le
                même argument dit deux fois ne s'entend plus. L'oreille prend
                donc l'ÉTENDUE (toutes les classes, toutes les matières), le
                pavé garde le GESTE (entraîne-toi maintenant). */}
            <p className="text-[10px] font-black uppercase tracking-[0.18em]">
              🗂️ Le catalogue · du CP à la Terminale
            </p>
            <p className="mt-1 font-serif text-lg font-black leading-tight">
              Ta classe est dedans, et toutes tes matières
            </p>
            <p className="mt-1 text-xs font-black underline underline-offset-2">
              Explorer le catalogue →
            </p>
          </Link>

          {/* La manchette = L'ADRESSE. Le public YouTube tape eleveai.fr à la
              main : le titre du journal EST l'adresse (elle se grave à chaque
              visite). « Le Journal » passe en surtitre, la devise du manifeste
              cède la place à la phrase choc du coach. */}
          <div className="order-1 text-center lg:order-2">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#1d1c16]/70 sm:text-xs">
              Le journal pour apprendre et s&apos;évaluer · Île de La Réunion
            </p>
            <h1 className="mt-1 font-serif text-5xl font-black leading-none tracking-tight sm:text-6xl lg:text-7xl">
              eleveai<span className="text-cyan-800">.fr</span>
            </h1>
            <p className="mt-2 font-serif text-base font-black italic tracking-wide text-[#1d1c16]/70 sm:text-lg">
              « Ici, personne n&apos;apprend à ta place. »
            </p>
          </div>

          {/* Oreille droite — le professeur : la connexion ouvre le tableau
              de suivi (résultats élève par élève, correction automatique).
              On ne promet QUE ce qui existe : pas de « vue classe » tant que
              le chantier d'août n'a pas livré. */}
          <Link
            href="/enseignants"
            className="group order-3 border-2 border-cyan-800 bg-cyan-800 p-3 text-center text-[#f0fafc] transition hover:bg-[#f0fafc] hover:text-cyan-800"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.18em]">
              🧑‍🏫 Professeurs
            </p>
            <p className="mt-1 font-serif text-lg font-black leading-tight">
              Vos élèves s&apos;entraînent, la correction est déjà faite
            </p>
            <p className="mt-1 text-xs font-black underline underline-offset-2">
              Ouvrir le tableau de suivi →
            </p>
          </Link>
        </div>

        {/* Le chemin de fer + la devise SUR LA MÊME BANDE (01/08). Ils avaient
            chacun la leur : deux filets de plus sur le premier écran, et trois
            accroches empilées sous le titre (le surtitre du journal, « Ici,
            personne n'apprend à ta place », puis la devise). Les mots restent,
            la bande de trop s'en va. */}
        <div className="border-b border-[#1d1c16]/25 py-2">
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[11px] font-black uppercase tracking-[0.16em]">
          <a href="#la-une" className="hover:text-cyan-800">La Une</a>
          <span aria-hidden className="text-[#1d1c16]/30">·</span>
          <a href="#en-vrai" className="hover:text-cyan-800">En vrai</a>
          <span aria-hidden className="text-[#1d1c16]/30">·</span>
          {/* « Comprendre » a fusionné avec « Un peu de maths » (24/07) : une
              seule entrée, sinon deux liens du chemin de fer menaient au même
              endroit. */}
          <a href="#un-peu-de-maths" className="hover:text-cyan-800">Un peu de maths</a>
          <span aria-hidden className="text-[#1d1c16]/30">·</span>
          <a href="#apprendre" className="hover:text-cyan-800">Apprendre</a>
          <span aria-hidden className="text-[#1d1c16]/30">·</span>
          <a href="#catalogue" className="hover:text-cyan-800">Le catalogue</a>
          <span aria-hidden className="text-[#1d1c16]/30">·</span>
          <a href="#courrier" className="hover:text-cyan-800">Le courrier</a>
          <span aria-hidden className="text-[#1d1c16]/30">·</span>
          <a href="#honneur" className="hover:text-cyan-800">À l&apos;honneur</a>
          <span aria-hidden className="text-[#1d1c16]/30">·</span>
          <a href="#les-grands" className="hover:text-cyan-800">Parents & profs</a>
        </nav>

        {/* La devise publique (choisie 16/07). La doctrine interne reste
            « réfléchir · apprendre · se diriger » — même triptyque, dit pour
            un enfant. */}
        <p className="mt-1 text-center font-serif text-sm font-black italic tracking-wide text-[#1d1c16]/70">
          Comprendre. Apprendre. S&apos;amuser.
        </p>
        </div>

        {/* ══ LE COACH — LE PREMIER GESTE ═══════════════════════════════════
            Décision produit (24/07, Frédéric) : le COACH est la destination
            (il entraîne), PARCOURS + DÉFIS sont l'épreuve (ils testent), et le
            journal / simulateurs ne sont que la PORTE D'ENTRÉE. On remet donc
            l'entraînement en tête d'affiche — trois verbes TOUJOURS visibles,
            la classe affine la destination — au lieu de la bande repliée qui
            cachait le coach derrière un clic. */}
        <div className="border-b border-[#1d1c16]/25 py-4">
          <div className="mx-auto max-w-4xl border-2 border-cyan-800 bg-cyan-800/[0.05] p-4 sm:p-5">
            <p className="text-center text-[11px] font-black uppercase tracking-[0.22em] text-cyan-800">
              ✏️ Commence ici · Le coach t&apos;entraîne
            </p>
            <h2 className="mt-1 text-center font-serif text-2xl font-black leading-tight sm:text-[1.75rem]">
              Entraîne-toi maintenant — tout est corrigé
            </h2>
            <p className="mx-auto mt-1.5 max-w-2xl text-center text-sm font-medium leading-6 text-[#1d1c16]/70">
              Le coach t&apos;explique et tu t&apos;entraînes ; le parcours et le
              défi te testent. Le journal, c&apos;est l&apos;histoire qui donne
              envie — ici, c&apos;est l&apos;entraînement.
            </p>

            {/* Les 3 verbes de l'objectif — toujours visibles, un clic chacun :
                s'entraîner (coach) · se tester (parcours) · le rituel du jour
                (mini-slide : défi, dictée, anglais, espagnol, calcul). */}
            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2">
              <Link
                href="/explorer#coach"
                className="inline-flex items-center gap-2 rounded-sm bg-cyan-800 px-5 py-2.5 text-sm font-black text-[#f0fafc] shadow-sm transition hover:bg-[#1d1c16]"
              >
                ✏️ Entraîne-toi <span className="font-semibold opacity-80">· le Coach</span>
              </Link>
              <Link
                href="/explorer#parcours"
                className="inline-flex items-center gap-2 rounded-sm border-2 border-cyan-800 px-5 py-2.5 text-sm font-black text-cyan-800 transition hover:bg-cyan-800 hover:text-[#f0fafc]"
              >
                🧭 Teste-toi <span className="font-semibold opacity-80">· Parcours</span>
              </Link>
              <RituelDuJourChip />
            </div>

            {/* La classe affine la destination du coach (accordéon conservé). */}
            <div className="mt-4 border-t border-[#1d1c16]/25 pt-3.5">
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                <span className="mr-1 text-[11px] font-black uppercase tracking-[0.16em] text-[#1d1c16]/70">
                  🎓 Ta classe :
                </span>
                {CLASSES_ENTREE.map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => setClasseDepliee(c.slug)}
                aria-pressed={classeActive === c.slug}
                className={`rounded-sm border px-2.5 py-1 text-xs font-black transition ${
                  classeActive === c.slug
                    ? "border-[#1d1c16] bg-[#1d1c16] text-[#f6f1e4]"
                    : "border-[#1d1c16]/25 text-[#1d1c16]/70 hover:border-[#1d1c16] hover:bg-[#1d1c16] hover:text-[#f6f1e4]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          {classeActive && (
            <div className="mx-auto mt-2 max-w-2xl space-y-1.5 text-sm font-black">
              {/* S'entraîner : les coachs de la classe. */}
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
                <span className="text-[11px] font-black uppercase tracking-[0.14em] text-[#1d1c16]/55">
                  ✏️ S&apos;entraîner :
                </span>
                <Link href={`/coach-ia/maths?classe=${classeActive}`} className="text-cyan-800 underline underline-offset-2 hover:no-underline">
                  🧮 Maths
                </Link>
                {FRANCAIS_LEVELS.has(classeActive) && (
                  <Link href={`/coach-ia/francais?classe=${classeActive}`} className="text-cyan-800 underline underline-offset-2 hover:no-underline">
                    📖 Français
                  </Link>
                )}
                <Link href="/coach-ia/english-maths" className="text-cyan-800 underline underline-offset-2 hover:no-underline">
                  🇬🇧 Anglais
                </Link>
                <Link href="/coach-ia/espagnol" className="text-cyan-800 underline underline-offset-2 hover:no-underline">
                  🇪🇸 Espagnol
                </Link>
                <Link href="/coach-ia/ia" className="text-cyan-800 underline underline-offset-2 hover:no-underline">
                  🤖 IA
                </Link>
              </div>
              {/* S evaluer : LE parcours de chaque matiere (rappel de
                  Frédéric : il y en a un par matière, pas un seul). */}
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
                <span className="text-[11px] font-black uppercase tracking-[0.14em] text-[#1d1c16]/55">
                  🧭 S&apos;&eacute;valuer :
                </span>
                <Link href="/parcours" className="text-cyan-800 underline underline-offset-2 hover:no-underline">
                  🧮 Maths
                </Link>
                {FRANCAIS_LEVELS.has(classeActive) && (
                  <Link href="/parcours-francais" className="text-cyan-800 underline underline-offset-2 hover:no-underline">
                    📖 Français
                  </Link>
                )}
                <Link href="/parcours-english-maths" className="text-cyan-800 underline underline-offset-2 hover:no-underline">
                  🇬🇧 Anglais
                </Link>
                <Link href="/parcours-espagnol" className="text-cyan-800 underline underline-offset-2 hover:no-underline">
                  🇪🇸 Espagnol
                </Link>
                <Link href="/parcours-ia" className="text-cyan-800 underline underline-offset-2 hover:no-underline">
                  🤖 IA
                </Link>
                <Link href={`/programme/${classeActive}`} className="text-[#1d1c16]/70 underline underline-offset-2 hover:no-underline">
                  📋 Le programme
                </Link>
              </div>
            </div>
          )}
            </div>
          </div>
        </div>

        {/* Le courrier en manchette (demande de Frédéric, 19/07) : un avis
            d'élève sous la rampe des classes — verbatim, fautes comprises
            (authenticité), prénom + niveau seul (RGPD). Rotation douce
            toutes les 8 s sur les mêmes avis que le courrier des lecteurs ;
            le clic descend au courrier complet. */}
        <a
          href="#courrier"
          className="block border-b border-[#1d1c16]/25 py-2 text-center transition hover:bg-[#1d1c16]/5"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
            💬 Les avis des élèves
          </p>
          <p className="mx-auto mt-0.5 max-w-3xl px-2 font-serif text-sm font-medium italic leading-6 text-[#1d1c16]/70">
            <span className="not-italic tracking-widest text-amber-600" aria-label={`Note ${avisManchette.note} sur 5`}>
              {"★".repeat(avisManchette.note)}
            </span>{" "}
            « {avisManchette.quote} »{" "}
            <span className="text-xs font-black not-italic uppercase tracking-[0.14em] text-[#1d1c16]/55">
              — {avisManchette.prenom} · {avisManchette.detail}
            </span>
          </p>
        </a>
      </header>

      {/* ══ L'ÉDITION PERSONNALISÉE (connecté) ═══════════════════════════════ */}
      {isStaff ? (
        <div className="mx-auto mt-6 max-w-6xl">
          <StaffAccueilBanner />

          {/* L'ATELIER DU PROF — les fiches à composer, mises en avant pour
              l'enseignant connecté (effet IKEA côté prof, manifeste
              prof-élève). Demande de Frédéric du 16/07. */}
          <div className="mt-4 border-2 border-[#1d1c16] p-4 sm:p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-cyan-800">
              🍎 L&apos;atelier du prof · Fiches à composer
            </p>
            <h2 className="mt-1 font-serif text-2xl font-black leading-tight">
              Composez votre fiche comme vous faites cours
            </h2>
            <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-[#1d1c16]/70">
              Chaque fiche de maths est en blocs — Définition, Propriétés,
              « À quoi ça sert dans le réel », un peu d&apos;histoire, exemples
              corrigés, entraînement. Cochez vos rubriques, choisissez votre
              ordre : mode classe, impression PDF, et votre composition vous
              attend dans votre tableau de bord.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Link
                href="/fiches-cours/maths"
                className="inline-flex items-center gap-2 rounded-sm bg-[#1d1c16] px-4 py-2 text-sm font-black text-[#f6f1e4] transition hover:bg-cyan-800"
              >
                Ouvrir l&apos;atelier →
              </Link>
              <p className="text-xs font-medium italic text-[#1d1c16]/70">
                « Le cours est fait par les élèves et les profs — pas l&apos;un
                sans l&apos;autre. »
              </p>
            </div>
          </div>
        </div>
      ) : (
        <EditionPerso />
      )}

      {/* ══ LA UNE — 3 colonnes : l'article · le fil du jour · l'édito ═══════ */}
      <section id="la-une" className="mx-auto mt-6 max-w-6xl scroll-mt-24">
        {/* CONTRE LES TROUS (Frédéric, 24/07 : « qu'il n'y ait pas de trou ») :
            le contenu des 3 colonnes vient de la base et change chaque jour —
            un calage à la main se décalerait à la prochaine édition. Solution
            de maquettiste : chaque colonne est une colonne flex dont le
            dernier bloc s'ancre au pied (mt-auto) — les trois finissent
            toujours sur la même ligne, le mou respire À L'INTÉRIEUR. */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* L'article à la Une (RÉFLÉCHIR : ce qui se passe autour de toi). */}
          <article className="lg:col-span-7 lg:flex lg:flex-col">
            {/* Le carrousel façon MSN, piloté par la régie (/admin/journal) :
                chaque slide porte son propre surtitre. */}
            <UneCarousel slides={slides} />

            {/* « À LIRE AUSSI » EST PARTI (Frédéric, 01/08). Elle avait déjà
                fondu de 11 titres à 4 ; sous le carrousel, elle restait une
                rivière de liens qui répétait le catalogue et repoussait les
                évaluations tout en bas de la colonne. Les quatre pages qu'elle
                portait vivent ailleurs : Picto Maths et la carte dans « En
                vrai », « Qui suis-je ? » et le Grand oral dans le catalogue. */}

            {/* LES ÉVALUATIONS DU COLLÈGE — idée de Frédéric (01/08). Le dico
                et Pix IA traînaient au milieu de la rivière de titres, sans
                dire à quoi ils servent. Regroupés, ils forment une rubrique
                qui a un sens à la rentrée : les évaluations que le collège
                fait passer, et de quoi les préparer tranquillement.
                Plus de `mt-auto` : la rivière partie, l'ancrage au pied
                aurait creusé un trou de 400 px entre le carrousel et
                l'encadré. Le bloc suit le carrousel, le mou va en fin de
                colonne — là où il se lit comme « l'article est fini ». */}
            <div className="mt-5 border-2 border-[#1d1c16] p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
                🎓 Les évaluations du collège
              </p>
              <p className="mt-1 font-serif text-lg font-black leading-tight">
                Celles qu&apos;on te fera passer — prépare-les tranquillement
              </p>
              <div className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {[
                  {
                    nom: "L'évaluation nationale de 6ᵉ",
                    quoi: "Les 50 mots qu'elle emploie, expliqués un par un — pour ne pas perdre de points sur la consigne.",
                    cta: "Ouvrir le dico",
                    href: "/dico",
                  },
                  {
                    nom: "Pix IA",
                    quoi: "L'éval blanche, 16 questions corrigées, pour arriver prêt le jour J.",
                    cta: "Passer l'éval blanche",
                    href: "/eval-pix-ia",
                  },
                ].map((e) => (
                  <Link key={e.href} href={e.href} className="group block">
                    <span className="block font-serif text-[15px] font-black leading-snug group-hover:underline">
                      {e.nom}
                    </span>
                    <span className="mt-0.5 block text-xs font-medium leading-5 text-[#1d1c16]/70">
                      {e.quoi}
                    </span>
                    <span className="mt-1 block text-sm font-black text-cyan-800">
                      {e.cta} →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </article>

          {/* Le fil du jour (APPRENDRE : les rendez-vous quotidiens). */}
          <aside className="border-[#1d1c16]/25 lg:col-span-3 lg:flex lg:flex-col lg:border-l lg:pl-6">
            <Kicker>Apprendre · Aujourd&apos;hui</Kicker>
            <div className="mt-2 divide-y divide-[#1d1c16]/25">
              {/* LES RITUELS DU JOUR — un emplacement COMMUN (Frédéric, 25/07) :
                  les rendez-vous quotidiens groupés au même endroit. Le défi a
                  sa grande carte au-dessus ; ici les rituels d'entraînement :
                  la dictée (français) et l'anglais du jour — l'espagnol du jour
                  les rejoindra. Routes à plat, regroupées visuellement. */}
              <div className="py-3">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
                  ⏰ Chaque jour · tes rituels
                </p>
                {[
                  { emoji: "✍️", nom: "La dictée du jour", quoi: "5 mots sans faute, avec l'audio", href: "/dictee-du-jour" },
                  { emoji: "🇬🇧", nom: "L'anglais du jour", quoi: "5 mots par jour, du A1 au B2", href: "/anglais-du-jour" },
                  { emoji: "🇪🇸", nom: "L'espagnol du jour", quoi: "5 mots par jour, du A1 au B2", href: "/espagnol-du-jour" },
                  { emoji: "⚡", nom: "Le calcul rapide", quoi: "3 minutes d'automatismes chrono", href: "/calcul-rapide" },
                ].map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="group block border-b border-dotted border-[#1d1c16]/25 py-2"
                  >
                    <span className="flex items-baseline gap-2">
                      <span aria-hidden className="text-sm">{r.emoji}</span>
                      <span className="font-serif text-[15px] font-black leading-snug group-hover:underline">
                        {r.nom}
                      </span>
                    </span>
                    <span className="mt-0.5 block pl-[22px] text-xs font-medium text-[#1d1c16]/70">
                      {r.quoi}
                    </span>
                  </Link>
                ))}
              </div>

              {/* GUIDES DE SURVIE — pointe le HUB (la page qui regroupe tous
                  les guides) : chaque niveau livré y apparaît sans retoucher
                  l'accueil. */}
              {/* EXACTEMENT LE MÊME CSS QUE LES CAHIERS DE VACANCES
                  (Frédéric, 01/08) : surtitre 10 px, titre serif 15 px,
                  description 12 px — rien d'autre. La vignette animée et la
                  ligne « Voir les livrets à imprimer → » lui donnaient trois
                  fois la surface de son voisin alors que les deux sont la
                  même chose : un livret. Le « Nouveau » reste, en rouge : il
                  signale, il n'enfle pas.
                  Au passage `border-y` devient `border-b` — le dernier rituel
                  au-dessus porte déjà son filet, ça faisait un trait double. */}
              <Link
                href="/guide-de-survie"
                className="group block border-b border-dotted border-[#1d1c16]/25 py-3"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-red-800">
                  📗 Nouveau
                </p>
                <span className="mt-1 block font-serif text-[15px] font-black leading-snug group-hover:underline">
                  Les guides de survie
                </span>
                <span className="mt-0.5 block text-xs font-medium text-[#1d1c16]/70">
                  Du CM1 &agrave; la Terminale : formules, r&eacute;flexes et
                  pi&egrave;ges, en maths, fran&ccedil;ais et anglais.
                </span>
              </Link>

              {/* LES CAHIERS DE VACANCES — pointe le HUB, comme les guides :
                  chaque cahier livré y apparaît sans retoucher l'accueil. */}
              <Link
                href="/cahier-vacances"
                className="group block border-b border-dotted border-[#1d1c16]/25 py-3"
              >
                {/* « À consulter / imprimer » (Frédéric, 01/08) : « à
                    imprimer » laissait croire qu'il fallait une imprimante
                    pour s'en servir. Les cahiers se lisent aussi à l'écran —
                    et tout le monde n'a pas d'imprimante à la maison. */}
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
                  📘 &Agrave; consulter / imprimer
                </p>
                <span className="mt-1 block font-serif text-[15px] font-black leading-snug group-hover:underline">
                  Les cahiers de vacances
                </span>
                <span className="mt-0.5 block text-xs font-medium text-[#1d1c16]/70">
                  Du CP &agrave; l&apos;apr&egrave;s-bac, un cahier par passage de classe.
                </span>
              </Link>

              {/* PRÉPA CONCOURS — une RUBRIQUE, pas un lien (idée de Frédéric,
                  31/07) : le Concours Avenir aujourd'hui, les autres viendront
                  s'y ranger sans retoucher l'accueil.
                  ORDRE DE LA COLONNE (Frédéric, 31/07) : on descend du
                  quotidien vers l'outillage puis vers l'exploration —
                  rituels, guides, cahiers, prépa concours, machines, et le
                  défi du jour en dernier. Le défi occupait la première place
                  alors qu'il n'est pas le plus important. */}
              <div className="py-3">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
                  🎯 Pr&eacute;pa concours
                </p>
                {[
                  {
                    emoji: "📐",
                    nom: "Concours Avenir",
                    quoi: "Épreuve blanche chronométrée · 7 écoles d'ingénieurs",
                    href: "/concours-avenir",
                  },
                  {
                    emoji: "🏅",
                    nom: "Concours général",
                    quoi: "Les problèmes qui sortent du programme, au collège",
                    href: "/concours-general",
                  },
                ].map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="group block border-b border-dotted border-[#1d1c16]/25 py-2"
                  >
                    <span className="flex items-baseline gap-2">
                      <span aria-hidden className="text-sm">{c.emoji}</span>
                      <span className="font-serif text-[15px] font-black leading-snug group-hover:underline">
                        {c.nom}
                      </span>
                    </span>
                    <span className="mt-0.5 block pl-[22px] text-xs font-medium text-[#1d1c16]/70">
                      {c.quoi}
                    </span>
                  </Link>
                ))}
              </div>

              {/* La machine reste visible, mais en format plus court dans cette colonne. */}
              <ReclameMachine />

              <Link
                href="/simulateurs"
                className="group mt-2 block border-2 border-cyan-800 bg-cyan-800/[0.05] p-2 transition hover:bg-cyan-800/[0.1]"
              >
                <div className="grid grid-cols-[78px_1fr] items-center gap-2.5">
                  <MachinesPanel className="h-11 w-full" />
                  <span className="block">
                    <span className="block font-serif text-[14px] font-black leading-tight text-[#1d1c16]">
                      Les {NB_MACHINES} machines dans ta main
                    </span>
                    <span className="text-xs font-black text-cyan-800 group-hover:underline">
                      Toutes les machines →
                    </span>
                  </span>
                </div>
              </Link>

              {/* LE DÉFI DU JOUR — descendu sous les machines (Frédéric,
                  31/07) : c'est un plaisir quotidien, pas la porte d'entrée.
                  RÈGLE DU JOURNAL (18/07) : une question posée en Une porte sa
                  réponse SOUS elle (repliée) — on ne renvoie jamais le lecteur
                  chercher la réponse ailleurs. Le lien vers le défi guidé
                  reste, mais il devient un plus. */}
              <div className="py-3">
                <Link href="/defis-du-jour" className="group block">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
                    🎯 Le défi du jour · {defiDuJour.defi.theme}{" "}
                    <PastilleJour />
                  </p>
                  <div className="relative mt-2 aspect-[16/7] w-full overflow-hidden border border-[#1d1c16]/25">
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
                </Link>
                <p className="mt-1 text-sm font-medium text-[#1d1c16]/70">
                  {defiDuJour.defi.question}
                </p>
                <details className="mt-1.5">
                  <summary className="cursor-pointer text-xs font-black text-[#1d1c16]/55 underline underline-offset-2 hover:text-[#1d1c16]">
                    Voir la réponse ▾
                  </summary>
                  <p className="mt-1.5 border-l-2 border-cyan-800/40 pl-2.5 text-[13px] font-medium leading-5 text-[#1d1c16]/70">
                    {defiDuJour.defi.explanation}
                  </p>
                </details>
                <Link
                  href="/defis-du-jour"
                  className="mt-1.5 block text-sm font-black text-cyan-800 hover:underline"
                >
                  Le défi guidé, pas à pas →
                </Link>
              </div>

              {/* (La dictée a son oreille en manchette et le calcul rapide vit
                  dans le catalogue — doublons retirés du fil, demande de
                  Frédéric du 18/07 : la colonne respire.) */}

              {jours > 0 && (
                <Link href="/coach-brevet" className="group block py-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-red-800">
                    🏃 Sprint Brevet
                  </p>
                  <h3 className="mt-1 font-serif text-lg font-black leading-snug group-hover:underline">
                    J−{jours} avant le brevet
                  </h3>
                  <p className="mt-1.5 text-sm font-black text-cyan-800">Commencer le sprint →</p>
                </Link>
              )}

            </div>

          </aside>

          {/* L'édito — le moment humain, signé (photo + lettre repliée). */}
          <aside className="border-[#1d1c16]/25 lg:col-span-2 lg:flex lg:flex-col lg:border-l lg:pl-6">
            {/* L'ÉDITO VIENT DE LA BASE (24/07) : il s'appelait « du jour »
                mais ne changeait jamais. Rubrique 'edito' de journal_articles,
                éditable dans /admin/articles — le plus récent gagne, et sa
                date s'affiche : le lecteur voit de QUAND il date. */}
            <Kicker>
              L&apos;édito
              {editoDuJour.dateLabel ? ` · ${editoDuJour.dateLabel}` : " du jour"}{" "}
              {editoDuJour.nouveau && <PastilleJour />}
            </Kicker>
            {/* En couleur : c'est le moment humain de la page (le noir et blanc
                « encre de journal » lui donnait un air de nécrologie — retiré
                sur retour de Frédéric). Photo un peu plus grande. */}
            <Image
              src="/images/avatar-frederic-visage.webp"
              alt="Frédéric Lacoste"
              width={72}
              height={72}
              className="mt-3 h-[72px] w-[72px] rounded-full border-2 border-[#1d1c16]/25 object-cover"
            />
            <h3 className="mt-2 font-serif text-lg font-black leading-snug">
              {editoDuJour.titre}
            </h3>
            {/* Le 1er paragraphe se lit tout de suite, la suite s'ouvre dans le
                dépliant (demande de Frédéric, 22/07). */}
            <p className="mt-2 text-sm font-medium leading-6 text-[#1d1c16]/70">
              {editoParagraphes[0]}
            </p>
            {editoParagraphes.length > 1 && (
              <details className="mt-1">
                <summary className="cursor-pointer list-none text-xs font-black text-cyan-800 underline underline-offset-2">
                  Lire la suite ▾
                </summary>
                {editoParagraphes.slice(1).map((p, i) => (
                  <p
                    key={i}
                    className="mt-2 text-sm font-medium leading-6 text-[#1d1c16]/70"
                  >
                    {p}
                  </p>
                ))}
              </details>
            )}
            {editoDuJour.lien && editoDuJour.cta && (
              <Link
                href={editoDuJour.lien}
                className="mt-2 inline-block text-sm font-black text-cyan-800 hover:underline"
              >
                {editoDuJour.cta}
              </Link>
            )}
            {/* Le nom ne se coupe jamais ; « professeur d'élèves » peut
                passer à la ligne dessous. */}
            <p className="mt-3 font-serif text-sm font-black italic">
              <span className="whitespace-nowrap">— Frédéric Lacoste,</span>{" "}
              <span className="whitespace-nowrap">professeur d&apos;élèves</span>
            </p>

            {/* CHIFFRE + MOT DU JOUR - directement sous l'edito. */}
            <div>
            {/* LE CHIFFRE DU JOUR — la chose à LIRE chaque matin (30 secondes,
                un chiffre vrai, trois lignes). Rotation quotidienne sur la
                banque lib/chiffre-du-jour.ts. Place choisie par Frédéric :
                sous l'édito, ça rééquilibre la colonne. */}
            <div className="mt-4 border-2 border-[#1d1c16] p-3">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
                🔢 Le chiffre du jour <PastilleJour />
              </p>
              {/* Teaser court + « Lire la suite » (demande de Frédéric, 22/07,
                  comme l'édito) : la 1re phrase (le fait) se lit tout de suite,
                  la chute s'ouvre dans le dépliant. */}
              {(() => {
                const c = chiffreDuJour();
                const i = c.texte.indexOf(". ");
                const teaser = i === -1 ? c.texte : c.texte.slice(0, i + 1);
                const suite = i === -1 ? "" : c.texte.slice(i + 2);
                return (
                  <>
                    <p className="mt-1 font-serif text-2xl font-black leading-none">
                      {c.chiffre}
                    </p>
                    <p className="mt-1.5 text-sm font-medium leading-6 text-[#1d1c16]/70">
                      {teaser}
                    </p>
                    {suite && (
                      <details className="mt-1">
                        <summary className="cursor-pointer list-none text-xs font-black text-cyan-800 underline underline-offset-2">
                          Lire la suite ▾
                        </summary>
                        <p className="mt-2 text-sm font-medium leading-6 text-[#1d1c16]/70">
                          {suite}
                        </p>
                      </details>
                    )}
                  </>
                );
              })()}
            </div>

            {/* LE MOT DU JOUR — entre le chiffre et le picto (demande de
                Frédéric, 22/07) : l'indice se lit ici, le mot s'écoute et
                s'écrit sur la dictée du jour. */}
            <MotDuJourEncart />
            </div>

            {/* L'APPEL AUX ENTREPRISES — revenu en colonne 3, sous l'édito
                (Frédéric, 31/07). Il avait migré en colonne 2 le 24/07 pour
                combler un trou ; la colonne 2 s'est depuis remplie (cahiers,
                prépa concours), et c'est ici sa vraie place : il s'adresse aux
                adultes, comme l'édito juste au-dessus, alors que la colonne 2
                parle aux élèves.
                Ancré au PIED (mt-auto) pour que la colonne finisse droit. */}
            <div className="lg:mt-auto">
              <div className="mt-4 border-2 border-[#1d1c16] bg-amber-50 p-3.5 shadow-[3px_3px_0_0_#1d1c16]">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#1d1c16]">
                  🚀 Aux entreprises de l&apos;île
                </p>
                <p className="mt-1.5 text-sm font-semibold leading-6 text-[#1d1c16]/70">
                  Votre métier peut devenir un article, une simulation, un défi —
                  comme la canne, le lait ou le barrage avant vous.
                </p>
                <Link
                  href="/entreprises"
                  className="mt-2 inline-block border-2 border-[#1d1c16] bg-[#1d1c16] px-3 py-1.5 text-xs font-black text-amber-50 hover:bg-transparent hover:text-[#1d1c16]"
                >
                  Participez à l&apos;aventure →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ══ LE PARTI PRIS — « il faut mettre en avant qu'on est différent »
          (Frédéric, 18/07). Quatre engagements FACTUELS, jamais de superlatif
          (la règle : le site célèbre les élèves, pas la plateforme) : chacun
          est vérifiable sur la page même. ════════════════════════════════ */}
      <section className="mx-auto mt-10 max-w-6xl">
        <Kicker>Le parti pris · Ce qu&apos;on fait autrement</Kicker>
        <div className="mt-2 border-t-2 border-[#1d1c16]" />
        <div className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              emoji: "🤖",
              titre: "Le coach explique. Il ne fait jamais à ta place.",
              ligne: "Pas de réponse toute faite : des questions, des indices, et toi qui trouves.",
            },
            {
              emoji: "🌋",
              titre: "Né dans une classe, à La Réunion.",
              ligne: "On apprend avec ce qu'on a sous les yeux : la pluie, la canne, les baleines, le volcan.",
            },
            {
              emoji: "✍️",
              titre: "Écrit avec les élèves.",
              ligne: "Leurs idées, leurs avis — même leurs fautes, gardées parce qu'elles sont vraies.",
            },
            // Les trois principes fondateurs ajoutés le 31/07 (Frédéric). Un
            // quatrième était prévu sur le RGPD : ÉCARTÉ tant que la conformité
            // n'est pas réglée — on n'affiche pas un engagement juridique qu'on
            // ne peut pas encore tenir.
            {
              emoji: "📚",
              titre: "Le savoir ne se paie pas.",
              ligne: "Fiches, vidéos, exercices, coach : rien derrière un mur, et exactement le même pour chacun.",
            },
            {
              emoji: "⚖️",
              titre: "Les maths sont autant aux filles qu'aux garçons.",
              ligne: "Hong Wang, Yilin Wang : on donne à voir les mathématiciennes qu'on ne montre jamais.",
            },
            {
              emoji: "🚀",
              titre: "Pousse tes qualités, ne t'acharne pas sur tes défauts.",
              ligne: "La phrase de Kylian Mbappé, devenue une machine que tu règles toi-même.",
            },
            {
              emoji: "🕊️",
              titre: "Ici, tu peux te tromper tranquille.",
              ligne: "Sans publicité, sans jugement : c'est comme ça qu'on apprend.",
            },
          ].map((p) => (
            <div key={p.titre} className="border-l-2 border-[#1d1c16]/25 pl-3">
              <p className="font-serif text-[15px] font-black leading-snug">
                <span aria-hidden className="mr-1">{p.emoji}</span>
                {p.titre}
              </p>
              <p className="mt-1 text-[12.5px] font-medium leading-5 text-[#1d1c16]/70">
                {p.ligne}
              </p>
            </div>
          ))}
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
            className="group relative block aspect-[4/3] overflow-hidden rounded-sm border border-[#1d1c16]/25 lg:aspect-[16/9]"
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
              <span className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-300">
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
            className="group relative block aspect-[4/3] overflow-hidden rounded-sm border border-[#1d1c16]/25 lg:aspect-[16/9]"
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

          {/* Les autres rendez-vous : de vraies images partout où on en a —
              les tuiles à dégradé + émoji pâle rendaient comme des cases
              vides sur Windows (constat de Frédéric, 18/07). La dictée, sans
              photo, garde son dégradé avec un filigrane typographique. */}
          {(
            [
              { emoji: "🏖️", kicker: "Le supplément", titre: "Les cahiers de vacances à imprimer", href: "/cahier-vacances", image: "/images/accueil-eleveai-reunion.webp" },
              { emoji: "🖼️", kicker: "L'île en images", titre: "Picto Maths : 25 défis « 1 image, 1 question »", href: "/picto-maths", image: "/images/defis-du-jour/piton-fournaise.webp" },
              { emoji: "🗺️", kicker: "L'exploration", titre: "La chasse aux trésors sur la carte de l'île", href: "/carte", image: "/images/lagon.webp" },
            ] as const
          ).map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group relative block aspect-[4/3] overflow-hidden rounded-sm border border-[#1d1c16]/25 lg:aspect-[16/9]"
            >
              <Image
                src={t.image}
                alt={t.titre}
                fill
                sizes="(max-width: 1024px) 50vw, 400px"
                className="object-cover transition duration-300 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
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

          {/* La dictée : pas de photo — dégradé + filigrane « Aa » (le glyphe
              émoji géant rendait mal, façon picto cassé). */}
          <Link
            href="/dictee-du-jour"
            className="group relative block aspect-[4/3] overflow-hidden rounded-sm border border-[#1d1c16]/25 bg-gradient-to-br from-sky-500 to-indigo-700 lg:aspect-[16/9]"
          >
            <span
              aria-hidden
              className="absolute right-3 top-1 font-serif text-6xl font-black text-white/25 transition duration-300 group-hover:scale-110 group-hover:text-white/40 sm:text-7xl"
            >
              Aa
            </span>
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute bottom-0 left-0 p-3">
              <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/80">
                ✍️ Tous les jours
              </span>
              <span className="mt-0.5 block font-serif text-base font-black leading-snug text-white sm:text-lg">
                La dictée du jour : 5 mots sans faute
              </span>
            </span>
          </Link>
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
              <div className="relative aspect-video w-full overflow-hidden border border-[#1d1c16]/25 bg-[#1d1c16]/5">
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
                <div className="relative aspect-video w-full overflow-hidden border border-[#1d1c16]/25 bg-[#1d1c16]/5">
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
            className="text-sm font-black text-cyan-800 underline underline-offset-2"
          >
            🗺️ Les maths sur la carte de l&apos;île →
          </Link>
        </div>
      </section>

      {/* ══ UN PEU DE MATHS — les pépites du prof (table journal_articles,
          rubrique 'un-peu-de-maths', repli en dur). Refonte du 24/07 :
          « Les schémas animés » disait la même chose et fusionne ici, et on
          n'affiche plus que LES TROIS derniers, au patron de /simulateurs
          (CarteMachine : filet noir, image en bandeau, ombre au survol). Le
          reste se lit dans le hub des machines, lien en bas. L'ancre
          #comprendre est gardée sur le surtitre : les vieux liens tombent
          toujours au bon endroit. ═══════════════════════════════════════════ */}
      <section id="un-peu-de-maths" className="mx-auto mt-10 max-w-6xl scroll-mt-24">
        <Kicker id="comprendre">Comprendre · La rubrique du prof</Kicker>
        <TitreRubrique>Un peu de maths</TitreRubrique>
        {/* Sous-titre qui POSE L'ATTENTE (demande de Frédéric, 23/07) : le hook
            est tous âges, mais le fond va loin — personne ne se sent exclu, et
            les grands savent que c'est pour eux. */}
        <p className="mt-2 text-sm font-semibold text-[#1d1c16]/70">
          Des histoires pour tous, des maths qui vont loin — collège → supérieur.
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {unPeuDeMaths.slice(0, 3).map((a) => (
            <CarteMachine
              key={a.id}
              href={a.lien}
              image={a.imageUrl}
              titre={a.titre}
              texte={a.accroche}
              cta={a.cta}
              externe={/^https?:\/\//.test(a.lien)}
            />
          ))}
        </div>
        <Link
          href="/simulateurs"
          className="mt-4 inline-block text-sm font-black text-cyan-800 underline underline-offset-2"
        >
          🎛️ Toutes les machines dans ta main →
        </Link>
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
              <p className="mt-1.5 text-sm font-black text-cyan-800">Ouvrir le coach →</p>
            </Link>
          ))}
        </div>

        {/* FAIRE LE POINT — les parcours montés en vraie sous-section
            (demande de Frédéric : s'évaluer n'était pas assez mis en avant).
            C'est le premier geste d'un nouvel élève — et la question des
            parents : « où en est mon enfant ? » */}
        <div className="mt-6 border-t-2 border-[#1d1c16] pt-3">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-cyan-800">
            S&apos;évaluer · Faire le point
          </p>
          <h3 className="mt-1 font-serif text-2xl font-black leading-tight">
            Teste ton niveau — vois tes forces, et par où commencer
          </h3>
          <div className="mt-3 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {parcours.map((p) => (
              <Link key={p.href} href={p.href} className="group border-t border-[#1d1c16]/25 pt-2.5">
                <h4 className="font-serif text-lg font-black leading-snug group-hover:underline">
                  🧭 Parcours {p.label}
                </h4>
                <p className="mt-0.5 text-sm font-medium text-[#1d1c16]/70">
                  Un bilan guidé — tes points forts, tes manques, la suite.
                </p>
                <p className="mt-1 text-sm font-black text-cyan-800">Passer le bilan →</p>
              </Link>
            ))}
            <Link href="/eval-pix-ia" className="group border-t border-[#1d1c16]/25 pt-2.5">
              <h4 className="font-serif text-lg font-black leading-snug group-hover:underline">
                🎓 Éval blanche Pix IA
              </h4>
              <p className="mt-0.5 text-sm font-medium text-[#1d1c16]/70">
                Prépare l&apos;évaluation nationale : 16 questions, ton profil.
              </p>
              <p className="mt-1 text-sm font-black text-cyan-800">Passer le bilan →</p>
            </Link>
          </div>
          <p className="mt-3 text-sm font-medium text-[#1d1c16]/70">
            Et les leçons sont dans les{" "}
            <Link href="/fiches-cours" className="font-black text-cyan-800 underline underline-offset-2">
              fiches de cours
            </Link>
            .
          </p>
        </div>
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
        <p className="mt-2 text-xs font-medium italic text-[#1d1c16]/70">
          Gratuits, imprimables, avec Ti Margo 🦎 —{" "}
          <Link href="/cahier-vacances" className="font-black text-cyan-800 underline underline-offset-2">
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
          {(catalogue && catalogue.length > 0
            ? // La base d'abord : catalogue_actions (actif, trié par ordre).
              catalogue.map((a) => ({
                key: a.id,
                emoji: CATALOGUE_EMOJIS[a.id] ?? FAMILLE_EMOJIS[a.famille] ?? "📌",
                famille: FAMILLE_LABELS[a.famille] ?? a.famille,
                nom: a.label,
                ligne: a.description ?? "",
                href: getHref(a.route),
              }))
            : // Repli si la base ne répond pas : la liste en dur.
              CATALOGUE.map((c) => ({
                key: c.href,
                emoji: c.emoji,
                famille: null as string | null,
                nom: c.nom,
                ligne: c.ligne,
                href: getHref(c.href),
              }))
          )
            // « Tout explorer » ferme toujours la marche.
            .concat([{ key: "explorer", emoji: "🔭", famille: null, nom: "Tout explorer", ligne: "La table des matières complète d'EleveAI.", href: "/explorer" }])
            .map((c) => (
              <Link
                key={c.key}
                href={c.href}
                className="group p-4 transition hover:bg-white/60"
                style={{ backgroundColor: PAPER }}
              >
                <p className="text-3xl" aria-hidden>{c.emoji}</p>
                {c.famille && (
                  <p className="mt-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-[#1d1c16]/55">
                    {c.famille}
                  </p>
                )}
                <h3 className="mt-1 font-serif text-base font-black leading-snug group-hover:underline">
                  {c.nom}
                </h3>
                <p className="mt-1 text-xs font-medium leading-5 text-[#1d1c16]/70">
                  {c.ligne}
                </p>
              </Link>
            ))}
        </div>
        <p className="mt-2 text-xs font-medium italic text-[#1d1c16]/70">
          Apprendre est gratuit, et ça le restera. Ce qui se paie : le suivi dans
          la durée —{" "}
          <Link href="/tarifs" className="font-black text-cyan-800 underline underline-offset-2">
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
              <blockquote className="mt-1 font-serif text-base font-medium italic leading-7 text-[#1d1c16]/70">
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
            className="inline-flex items-center gap-2 rounded-sm bg-[#1d1c16] px-4 py-2 text-sm font-black text-[#f6f1e4] transition hover:bg-cyan-800"
          >
            ✉️ Écrire au journal
          </Link>
          <p className="text-xs font-medium italic text-[#1d1c16]/70">
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
              <p className="mt-1 text-sm font-medium leading-6 text-[#1d1c16]/70">{h.pour}</p>
            </div>
          ))}
        </div>

        {/* L'ours des contributeurs : tous les prénoms des élèves testeurs. */}
        <div className="mt-5 border-t border-[#1d1c16]/25 pt-3">
          <p className="text-sm font-medium leading-7 text-[#1d1c16]/70">
            <span className="font-black">🙏 Merci à nos {elevesRemercies.length} élèves testeurs :</span>{" "}
            {elevesRemercies.map((e, i) => (
              <span key={`${e.prenom}-${e.action}`} title={e.action} className="font-serif font-black">
                {i > 0 && <span className="font-sans font-medium text-[#1d1c16]/30"> · </span>}
                {e.prenom}
              </span>
            ))}
          </p>
          <p className="mt-2 text-sm font-medium text-[#1d1c16]/70">
            Leurs idées, les bugs qu&apos;ils repèrent et leurs avis font avancer
            la plateforme.{" "}
            <Link href="/remerciements" className="font-black text-cyan-800 underline underline-offset-2">
              La page des remerciements →
            </Link>{" "}
            <span className="text-[#1d1c16]/30">·</span>{" "}
            <Link href="/besoin-de-vous" className="font-black text-cyan-800 underline underline-offset-2">
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
            <p className="mt-1 text-sm font-medium leading-6 text-[#1d1c16]/70">
              Encadrée, sans publicité, données protégées. Et gratuit si le
              collège de votre enfant l&apos;utilise.
            </p>
            <p className="mt-1.5 text-sm font-black text-cyan-800">En savoir plus →</p>
          </Link>
          <Link href="/enseignants" className="group border-t border-[#1d1c16]/25 pt-3">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">🍎 Enseignants</p>
            <h3 className="mt-1 font-serif text-xl font-black leading-snug group-hover:underline">
              Suivez leur progression
            </h3>
            <p className="mt-1 text-sm font-medium leading-6 text-[#1d1c16]/70">
              Le travail de chaque élève en temps réel, ses moyennes par
              matière. EleveAI corrige&nbsp;; vous, vous enseignez.
            </p>
            <p className="mt-1.5 text-sm font-black text-cyan-800">En savoir plus →</p>
          </Link>
          <Link href="/espace-ecoles" className="group border-t border-[#1d1c16]/25 pt-3">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">🏫 Établissements</p>
            <h3 className="mt-1 font-serif text-xl font-black leading-snug group-hover:underline">
              Financé par l&apos;établissement, gratuit pour les familles
            </h3>
            <p className="mt-1 text-sm font-medium leading-6 text-[#1d1c16]/70">
              Multi-matières, suivi classe par classe, RGPD maîtrisé.
              ✓ Déjà utilisé en collège, à La Réunion.
            </p>
            <p className="mt-1.5 text-sm font-black text-cyan-800">En savoir plus →</p>
          </Link>
        </div>

        {/* L'ATELIER DU PROF, MONTRÉ SANS COMPTE (01/08). Il n'existait que
            dans la branche `isStaff`, tout en haut : l'argument le plus fort
            pour un enseignant — composer sa fiche comme il fait cours —
            n'était visible qu'une fois connecté, c'est-à-dire trop tard pour
            l'avoir convaincu. On le montre ici en clair. Le prof déjà
            connecté, lui, garde sa version personnalisée en haut de page :
            pas de doublon. */}
        {!isStaff && (
          <div className="mt-6 border-2 border-[#1d1c16] p-4 sm:p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-cyan-800">
              🍎 L&apos;atelier du prof · Fiches à composer
            </p>
            <h3 className="mt-1 font-serif text-2xl font-black leading-tight">
              Composez votre fiche comme vous faites cours
            </h3>
            <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-[#1d1c16]/70">
              Chaque fiche de maths est en blocs — Définition, Propriétés,
              « À quoi ça sert dans le réel », un peu d&apos;histoire, exemples
              corrigés, entraînement. Cochez vos rubriques, choisissez votre
              ordre : mode classe, impression PDF. Rien à installer, rien à
              payer.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Link
                href="/fiches-cours/maths"
                className="inline-flex items-center gap-2 rounded-sm bg-[#1d1c16] px-4 py-2 text-sm font-black text-[#f6f1e4] transition hover:bg-cyan-800"
              >
                Voir l&apos;atelier →
              </Link>
              <p className="text-xs font-medium italic text-[#1d1c16]/70">
                « Le cours est fait par les élèves et les profs — pas l&apos;un
                sans l&apos;autre. »
              </p>
            </div>
          </div>
        )}

        {/* Français de l'étranger — la ligne fine (insight d'Arthur). */}
        <Link
          href="/francais-de-l-etranger"
          className="mt-4 block border-t border-[#1d1c16]/25 pt-3 text-sm font-medium text-[#1d1c16]/70"
        >
          <span className="font-black">🌍 Vous vivez à l&apos;étranger ?</span>{" "}
          Le programme français et la dictée quotidienne, à votre fuseau
          horaire.{" "}
          <span className="font-black text-cyan-800 underline underline-offset-2">Découvrir →</span>
        </Link>

        {/* Le prix, assumé — en clair, comme un encart tarifs de journal. */}
        <div className="mt-6 border-y-2 border-[#1d1c16] py-4 text-center">
          <h3 className="font-serif text-2xl font-black">
            Apprendre est gratuit. L&apos;accompagnement, c&apos;est notre métier.
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm font-medium leading-6 text-[#1d1c16]/70">
            Dictée, défis, cahiers, coach en accès libre — gratuit, et ça le
            restera. Ce qui se paie : le suivi dans la durée, un coach qui se
            souvient de votre enfant.
          </p>
          <p className="mt-3 text-sm font-black">
            👨‍👩‍👧 Famille · 5,90 €/mois
            <span className="mx-3 text-[#1d1c16]/30">|</span>
            🏫 Établissement · 4 €/élève/an — gratuit pour les familles
          </p>
          <Link
            href="/tarifs"
            className="mt-3 inline-flex items-center gap-2 rounded-sm bg-[#1d1c16] px-5 py-2.5 text-sm font-black text-[#f6f1e4] transition hover:bg-cyan-800"
          >
            Voir les offres →
          </Link>
        </div>
      </section>

      {/* ══ L'ABONNEMENT — recevez le journal (gratuit, newsletter Resend) ═══ */}
      <AbonnementJournal />

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
