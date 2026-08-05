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
//
// ─── ⚠️ `prefetch={false}` PARTOUT, SAUF SUR QUATRE LIENS ──────────────────────
// Frédéric, 04/08 : Vercel annonce 75 % du quota gratuit d'« ISR Reads »
// (1 000 000). Ces lectures ne se comptent PAS par déploiement — grouper les
// pushes économise les régénérations et les minutes de build, pas ce
// compteur-là. Elles se comptent par requête servie depuis le cache.
//
// Or un `<Link>` d'App Router précharge la charge RSC de sa destination DÈS
// QU'IL ENTRE DANS LE CHAMP DE VISION, et pour une route statique ce
// préchargement est une lecture du cache ISR. Cette page portait 61 liens sans
// une seule exception : dérouler l'accueil jusqu'en bas déclenchait donc une
// soixantaine de lectures pour UNE visite, sur des liens dont on n'en clique
// qu'un. Le catalogue en aligne 21 à lui seul, les cahiers 11.
//
// Le préchargement ne reste donc que là où le clic est probable ET où la
// vitesse se voit : les DEUX OREILLES de manchette et les DEUX BOUTONS de
// « Commence ici ». Partout ailleurs il s'éteint — le lien s'ouvre en une
// fraction de seconde de plus, sur des liens qu'on lit avant de cliquer.
// ⚠️ Ne pas ajouter un `<Link>` ici sans `prefetch={false}` : c'est une lecture
// de quota par visiteur qui déroule la page, pas une par clic.

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
import { useAudience } from "@/lib/useAudience";
import { elevesRemercies } from "@/lib/remerciements/eleves";
import type { RecoDuJour } from "@/lib/profil-eleve/types";

// ─── La palette « papier journal » ─────────────────────────────────────────────
// Fond papier crème, encre quasi noire, filets fins. UNE couleur d'accent (le
// vert EleveAI, assombri pour l'imprimé) + le rouge réservé au « EN DIRECT ».
const PAPER = "#d8e9ee";
const INK = "#1d1c16";

// ─── LES ACCENTS DU JOURNAL ────────────────────────────────────────────────────
// Quatre couleurs de l'île, une par famille de rubrique (Frédéric, 02/08 :
// « choisis des couleurs de mon île »). Le principe est celui d'un vrai
// quotidien sectionné : la couleur PORTE la rubrique, elle ne décore pas — on
// reconnaît une section à sa teinte avant d'en avoir lu le titre.
//
// Le papier reste le papier, l'encre reste l'encre : la couleur ne touche que
// le surtitre et le filet sous le titre. C'est ce qui permet d'en mettre sans
// que la page devienne un sapin.
const ACCENTS = {
  /** Le bleu de Boucan Canot, choisi le 18/07 — il ne bouge pas. */
  boucan: "#0e7490",
  /** L'arbre qui fleurit en été austral. */
  flamboyant: "#bf3b1e",
  /** Le vert des champs. */
  canne: "#3f6b0c",
  /** Le curcuma de Saint-Joseph, pas un « jaune soleil » de kit. */
  safran: "#a34c07",
} as const;

type Accent = keyof typeof ACCENTS;

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

// LES ÉVALUATIONS NATIONALES DE RENTRÉE (6ᵉ et 4ᵉ, français + maths).
// LA RÉUNION PASSE AUX MÊMES DATES QUE LA MÉTROPOLE (Frédéric, 01/08) —
// donc en SEPTEMBRE, même si l'île a fait sa rentrée en août. C'est le
// piège de ce fichier : ne pas caler cette date sur le calendrier local.
// ⚠️ À REMETTRE À JOUR CHAQUE ANNÉE, quand la note de service sort. Le
// 7 septembre 2026 est le lundi qui suit la rentrée, dans la continuité
// des années précédentes (2024 : 9 septembre ; 2025 : 8 septembre) —
// une seule ligne à changer, le compte à rebours et le plan en découlent.
const EVAL_NATIONALE_DATE = new Date("2026-09-07T08:00:00");
// Le rituel qu'on propose en face du compte à rebours : court, tenable.
const EVAL_MINUTES_PAR_JOUR = 15;
function joursAvantEvalNationale() {
  const diff = EVAL_NATIONALE_DATE.getTime() - Date.now();
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

// ─── « QUI EST-CE ? » — LE SÉLECTEUR DE PROFIL ────────────────────────────────
// Idée de Frédéric (02/08), d'après le sélecteur de profils Netflix. Le journal
// ne savait à qui il parlait qu'une fois l'élève connecté ; ici on demande, en
// une ligne, sans rien à lire.
//
// DANS la page et pas en modale bloquante : la première porte d'entrée du site
// est Google (les cahiers de vacances trustent les pages vues), et un
// interstitiel plein écran fait repartir un visiteur venu d'une recherche —
// Google le compte d'ailleurs comme un signal négatif au classement sur mobile.
//
// Deux familles, deux comportements — et aucune tuile qui ne fasse rien :
//   • les quatre CYCLES restent sur la page et préréglent la rampe des classes,
//     donc les liens du coach partent avec le bon niveau. C'est ce dont seul un
//     élève CONNECTÉ bénéficiait jusqu'ici.
//   • les quatre PORTES ADULTES mènent à leur espace. Inutile de mémoriser quoi
//     que ce soit : `useAudience` enregistre l'espace dès qu'on visite sa route,
//     donc le header est déjà adapté au retour.
// `classes` = les classes du cycle. Une fois le cycle choisi, la rampe
// « Ta classe » n'affiche plus les douze niveaux mais les deux à quatre du
// cycle : on garde le réglage fin (un 4ᵉ reste un 4ᵉ, pas « collège ») en
// divisant la hauteur du bloc. Cycle non choisi → les douze, comme avant.
const CYCLES: { id: string; emoji: string; label: string; classe: string; classes: string[]; accent: Accent }[] = [
  { id: "cp-ce2", emoji: "🧸", label: "CP–CE2", classe: "cp", classes: ["cp", "ce1", "ce2"], accent: "safran" },
  { id: "cm1-cm2", emoji: "🌳", label: "CM1–CM2", classe: "cm1", classes: ["cm1", "cm2"], accent: "canne" },
  { id: "6e-3e", emoji: "🎒", label: "6ᵉ–3ᵉ", classe: "6e", classes: ["6e", "5e", "4e", "3e"], accent: "boucan" },
  { id: "lycee", emoji: "🎓", label: "Lycée", classe: "seconde", classes: ["seconde", "premiere-spe", "terminale-spe"], accent: "flamboyant" },
];

// ─── LA COULEUR D'UNE CLASSE = CELLE DE SON CYCLE ─────────────────────────────
// Frédéric, 04/08 : « le CSS des classes n'est pas joli, peut-être prendre des
// couleurs d'IXL ». Le geste est juste — une rangée de douze rectangles gris
// est ce qu'il y a de plus terne sur le premier écran, et IXL a raison de faire
// du niveau une pastille qu'on reconnaît de loin. Mais l'arc-en-ciel de dix
// teintes saturées est l'identité d'IXL, et le 18/07 la consigne était ⛔ « ne
// copie pas IXL » : la page a déjà SES quatre couleurs, celles de l'île.
//
// Elles sont même déjà attribuées : chaque cycle porte son accent dans « Qui
// est-ce ? ». On le fait simplement DESCENDRE sur les classes — un CM1 et un
// CM2 sont verts comme la tuile CM1–CM2, un 4ᵉ est bleu boucan comme la tuile
// 6ᵉ–3ᵉ. La couleur choisie en haut suit le lecteur en bas, et la rampe des
// douze niveaux se lit d'un coup en quatre familles au lieu de douze pastilles
// identiques. La couleur porte toujours la rubrique, elle ne décore pas.
const ACCENT_PAR_CLASSE: Record<string, Accent> = Object.fromEntries(
  CYCLES.flatMap((c) => c.classes.map((slug) => [slug, c.accent])),
);

const PORTES_ADULTES: { emoji: string; label: string; colonne: Colonne; memo: string; accent: Accent }[] = [
  { emoji: "👪", label: "Parent", colonne: "parent", memo: "parent", accent: "canne" },
  { emoji: "🍎", label: "Professeur", colonne: "prof", memo: "enseignant", accent: "flamboyant" },
  { emoji: "🏫", label: "Établissement", colonne: "principal", memo: "etablissement", accent: "boucan" },
  { emoji: "🏭", label: "Entreprise", colonne: "entreprise", memo: "entreprise", accent: "safran" },
];

/** L'audience choisie survit à la visite — même clé que useAudience. */
const CLE_AUDIENCE = "eleveai-audience";

/**
 * La 3ᵉ tuile de la bande adulte : sa destination change selon le profil.
 * C'est la matrice appliquée au CONTENU et plus seulement à l'ordre — chacun
 * arrive sur la page écrite pour lui, qui existait déjà mais n'était liée
 * nulle part sur le premier écran.
 */
const ESPACE_ADULTE: Partial<Record<Colonne, { href: string; kicker: string; titre: string }>> = {
  principal: { href: "/espace-ecoles", kicker: "🏫 Votre établissement", titre: "Financement, RGPD, déploiement" },
  prof: { href: "/enseignants", kicker: "🍎 Votre classe", titre: "Le suivi élève par élève" },
  parent: { href: "/parents", kicker: "👪 Votre enfant", titre: "Ça aide ? C'est sûr ? Ça coûte quoi ?" },
  entreprise: { href: "/entreprises", kicker: "🏭 Votre entreprise", titre: "Soutenir l'aventure" },
};

/** Le cycle choisi survit à la visite — même clé de nommage que useAudience. */
const CLE_CYCLE = "eleveai-cycle";

// ─── LES OREILLES DE MANCHETTE, PAR PROFIL ────────────────────────────────────
// Frédéric, 04/08. Dans un vrai quotidien, les deux pavés de part et d'autre du
// titre sont les emplacements les plus vus de la page ; ici ils disaient la même
// chose à tout le monde — et l'oreille droite disait « Professeurs » à un élève
// de 6ᵉ, dans l'endroit le plus regardé du journal.
//
// MÊME FORME QUE LA MATRICE : le rôle décide des deux oreilles, le cycle
// n'affine que la gauche (celle qui parle à l'élève). 5 × 2 + 1 = 11 textes à
// tenir, pas 8 × 2 paires.
//
// ⚠️ LA RÈGLE QUI ÉVITE L'ERREUR DU 01/08 (« le même argument dit deux fois ne
// s'entend plus ») : le premier écran porte maintenant TROIS blocs de portes —
// les deux oreilles, les huit tuiles « Qui est-ce ? », et la bande adulte. Une
// oreille doit donc mener là où RIEN D'AUTRE du premier écran ne mène. Chez les
// adultes, la bande occupe déjà les évaluations nationales, les données et
// l'espace dédié : les oreilles vont ailleurs, exprès.
//
// ⚠️ AUCUN CHOIX ⇒ RIEN NE CHANGE (demande de Frédéric). La colonne `eleve` sans
// cycle porte mot pour mot les deux oreilles d'avant, et c'est elle que le
// serveur rend : ce que Google lit ne bouge pas d'un visiteur à l'autre.
type Oreille = { href: string; kicker: string; titre: string; action: string };

const OREILLES: Record<Colonne, { gauche: Oreille; droite: Oreille }> = {
  // ⚠️ NE PAS RÉÉCRIRE CETTE PAIRE sans le dire : c'est l'affichage par défaut,
  // celui d'un visiteur venu de Google qui n'a encore rien choisi.
  eleve: {
    gauche: {
      href: "/explorer",
      kicker: "🗂️ Le catalogue · du CP à la Terminale",
      titre: "Ta classe est dedans, et toutes tes matières",
      action: "Explorer le catalogue →",
    },
    droite: {
      href: "/enseignants",
      kicker: "🧑‍🏫 Professeurs",
      titre: "Vos élèves s'entraînent, la correction est déjà faite",
      action: "Ouvrir le tableau de suivi →",
    },
  },
  // Le prof : sa porte à gauche. À droite l'atelier de fiches, qui n'est
  // aujourd'hui visible que pour un prof CONNECTÉ — donc invisible pour celui
  // qu'il faut convaincre. C'est le même angle mort qu'on a déjà corrigé une
  // fois, à un autre endroit de la page.
  prof: {
    gauche: {
      href: "/enseignants",
      kicker: "🍎 Votre classe",
      titre: "Vos élèves s'entraînent, la correction est déjà faite",
      action: "Ouvrir le tableau de suivi →",
    },
    droite: {
      href: "/fiches-cours/maths",
      kicker: "✂️ L'atelier du prof",
      titre: "Composez votre fiche comme vous faites cours",
      action: "Ouvrir l'atelier →",
    },
  },
  // Le principal : la bande adulte lui sert déjà la rentrée, les données et son
  // espace. Les oreilles prennent donc ce qu'elle ne dit pas — l'étendue de ce
  // qui existe, et les élèves qui écrivent le journal (rang 15 chez lui, donc à
  // 9 000 px du haut de page).
  principal: {
    gauche: {
      href: "/explorer",
      kicker: "🗂️ Le catalogue · du CP à la Terminale",
      titre: "Cinq matières, douze niveaux, le même pour tous",
      action: "Explorer le catalogue →",
    },
    droite: {
      href: "#honneur",
      kicker: "✍️ Ils font le journal",
      titre: "Les élèves proposent, corrigent, signent",
      action: "Lire ce qu'ils en disent →",
    },
  },
  // Le parent : l'étendue, puis les cahiers à imprimer — la porte d'entrée n°1
  // du site, et la seule chose de la page qui se pose sur une table.
  parent: {
    gauche: {
      href: "/explorer",
      kicker: "🗂️ Le catalogue · du CP à la Terminale",
      titre: "Tout ce que votre enfant peut travailler",
      action: "Explorer le catalogue →",
    },
    droite: {
      href: "/cahier-vacances",
      kicker: "🏖️ Les cahiers de vacances",
      titre: "À imprimer, du CE2 au Bac +1 — avec Ti Margo",
      action: "Voir les cahiers →",
    },
  },
  // L'entreprise : `evals` étant absent de sa colonne, la bande adulte ne
  // s'affiche PAS pour elle — /entreprises n'est donc lié nulle part sur son
  // premier écran. L'oreille droite est la seule porte qui lui reste.
  entreprise: {
    gauche: {
      href: "/explorer",
      // Surtitre court, mesuré lui aussi : « Le catalogue · ce que vous
      // soutenez » passait sur deux lignes à 343 px — la largeur d'une oreille
      // sur un téléphone — et faisait grandir la manchette de 15 px. Le mot
      // « catalogue » est de toute façon repris par la ligne d'action.
      kicker: "🗂️ Ce que vous soutenez",
      titre: "Du CP à la Terminale, gratuit pour l'élève",
      action: "Explorer le catalogue →",
    },
    droite: {
      href: "/entreprises",
      // ⚠️ Surtitre court : à 219 px de large — la largeur d'une oreille sur un
      // écran de 1280 — « Participez à l'aventure » passait sur deux lignes et
      // poussait la boîte à 172 px contre 157 pour toutes les autres. La
      // manchette entière grandissait de 8 px au moment où le profil est lu.
      kicker: "🏭 Votre entreprise",
      titre: "Ce que vous apportez, et comment vous êtes cités",
      action: "En savoir plus →",
    },
  },
};

/**
 * Un élève qui a dit son cycle n'a plus rien à faire de la porte du prof : elle
 * cède la place à la série « en vrai », qui est à 2 700 px du haut de sa page et
 * qui n'existe nulle part ailleurs sur le premier écran.
 */
const OREILLE_ELEVE_CYCLE: Oreille = {
  href: "#en-vrai",
  kicker: "🌋 En vrai · à La Réunion",
  titre: "Le volcan, les requins, la canne : ton île",
  action: "Voir la série →",
};

// ─── LA MATRICE D'ACCUEIL ─────────────────────────────────────────────────────
// Idée de Frédéric (02/08), posée en mathématicien : un VECTEUR de sections, et
// une MATRICE qui dit, pour chaque profil, laquelle vient en premier.
//
// Deux corrections apportées à la forme initiale (0/1), qu'il a validées :
//
//  1. ℕ plutôt que {0,1}. Avec 0/1 on décide SI on affiche, mais l'ordre reste
//     le même pour tout le monde — or son propre travail du 31/07 sur la
//     colonne 2 dit l'inverse : ce qui compte n'est pas ce qu'on retire, c'est
//     ce qui vient en premier. Donc 0 = masqué, k = rang.
//
//  2. Chaque colonne est une PERMUTATION, pas un masque. Si les colonnes
//     étaient des sous-ensembles on retomberait sur l'erreur du 01/08 —
//     l'atelier du prof caché derrière `isStaff`, donc invisible pour le prof
//     qu'il fallait convaincre. Les mêmes sections partout, seul l'ordre
//     change ; les masquages restent l'exception qu'on assume une par une.
//
// Le rang final = RANGS[colonne][section] + CORRECTION[cycle][section].
// Le rôle dit quoi montrer d'abord, l'âge corrige. 5 + 4 = 9 lignes à tenir au
// lieu des 65 qu'aurait coûté une matrice (rôle × classe) à plat.
//
// La manchette, le sélecteur et l'édition personnalisée ne sont pas dans le
// vecteur : ce sont le cadre, pas le contenu. Ils restent en tête.
type Colonne = "eleve" | "prof" | "principal" | "parent" | "entreprise";

// ⚠️ Les rangs sont des ENTIERS ≥ 1, et toute section du <main> doit en avoir
// un. La propriété CSS `order` vaut 0 par défaut, et 0 passe AVANT 1 : une
// section oubliée ne resterait pas à sa place, elle remonterait en tête. Seuls
// le cadre (manchette, sélecteur, édition personnalisée) reste à 0, et c'est
// voulu — il ouvre la page.
// ⚠️ `commence` ET `avis` SONT ENTRÉS DANS LE VECTEUR LE 04/08. Ils vivaient
// dans la manchette, donc HORS matrice : quel que soit le profil, un lecteur se
// prenait d'abord les 326 px de la rampe d'élève (« Commence ici », douze
// classes) puis un avis d'élève, avant sa première ligne à lui. La matrice
// rangeait consciencieusement quinze sections derrière deux qui ne bougeaient
// jamais. C'est le bout qui manquait à la correction du 03/08 : le cadre, ce
// sont la manchette, le sélecteur et l'édition personnalisée — pas le premier
// geste de l'élève, qui est du CONTENU et se range comme le reste.
const RANGS: Record<Colonne, Record<string, number>> = {
  // ⚠️ `evals` est VOLONTAIREMENT absent de la colonne élève : il a déjà le
  // bloc complet des évaluations dans la colonne 1 de la Une. Une section
  // absente d'une colonne est masquée pour ce profil (cf. `rang()`).
  eleve: { commence: 1, avis: 2, une: 3, parti: 4, mosaique: 5, envrai: 6, maths: 7, apprendre: 8, cahiers: 9, agenda: 10, catalogue: 11, courrier: 12, honneur: 13, grands: 14, abonnement: 15, ours: 16 },
  prof: { apprendre: 1, evals: 2, parti: 3, avis: 4, commence: 5, une: 6, maths: 7, catalogue: 8, envrai: 9, mosaique: 10, cahiers: 11, agenda: 12, courrier: 13, honneur: 14, grands: 15, abonnement: 16, ours: 17 },
  // LE PRINCIPAL (Frédéric, 03/08 : « ce qui va l'intéresser c'est la
  // préparation aux évaluations nationales, il se fout des vidéos »). Il est
  // jugé sur ces épreuves, et elles sont dans cinq semaines : elles ouvrent sa
  // page. « En vrai » — les vidéos — descend en 11.
  principal: { evals: 1, parti: 2, avis: 3, grands: 4, une: 5, courrier: 6, catalogue: 7, apprendre: 8, commence: 9, maths: 10, envrai: 11, mosaique: 12, cahiers: 13, agenda: 14, honneur: 15, abonnement: 16, ours: 17 },
  parent: { parti: 1, courrier: 2, evals: 3, apprendre: 4, commence: 5, avis: 6, une: 7, envrai: 8, mosaique: 9, maths: 10, cahiers: 11, catalogue: 12, agenda: 13, honneur: 14, grands: 15, abonnement: 16, ours: 17 },
  // L'entreprise ne vient pas apprendre : elle vient comprendre pourquoi
  // soutenir, vérifier l'ancrage local, et savoir comment elle sera citée.
  entreprise: { parti: 1, grands: 2, envrai: 3, honneur: 4, courrier: 5, une: 6, avis: 7, maths: 8, mosaique: 9, catalogue: 10, apprendre: 11, commence: 12, cahiers: 13, agenda: 14, abonnement: 15, ours: 16 },
};

// LA RÈGLE QUI TIENT `avis` DANS LES CINQ COLONNES : le chapeau et le courrier
// ne se touchent jamais. L'un annonce une phrase d'élève, l'autre les donne
// toutes — collés, le premier ne fait que retarder le second. D'où l'avis haut
// là où le courrier est bas (élève 2/12, prof 4/13, principal 3/6), et l'avis
// BAS là où le courrier ouvre la page (parent : courrier 2, avis 6).
//
// Et `commence` suit le rôle, pas la page : premier pour l'élève, qui vient
// s'entraîner ; cinquième pour le prof et le parent, qui veulent d'abord savoir
// à quoi ils ont affaire ; neuvième pour le principal et douzième pour
// l'entreprise, qui ne s'entraîneront jamais.

// ─── HUIT TUILES, CINQ COLONNES ───────────────────────────────────────────────
// Frédéric, 04/08 : « le sélecteur promet huit profils, le modèle n'en distingue
// que cinq ». C'est vrai de la seule matrice des rôles, et c'est le rôle de la
// CORRECTION de fermer l'écart — pas celui de trois colonnes de plus. Ajouter
// `cp-ce2`, `cm1-cm2`, `6e-3e` et `lycee` comme colonnes pleines ferait passer
// le modèle de 9 lignes à 8 × 17 nombres, c'est-à-dire exactement la matrice à
// plat qu'il avait écartée le 02/08.
//
// Huit profils sortent donc de deux coordonnées : 4 (élève × cycle) + 4 portes
// adultes. Ce qui manquait, c'est que les quatre cycles bougeaient trois
// sections chacun sur seize — un CP et un lycéen voyaient presque la même page.
// Chaque cycle déplace maintenant assez de rubriques pour qu'on reconnaisse la
// sienne d'un coup d'œil, sans sortir de la forme « le rôle dit quoi montrer
// d'abord, l'âge corrige ».
//
/** `"x"` = masqué. Le reste décale : négatif remonte, positif descend. */
const CORRECTION: Record<string, Record<string, number | "x">> = {
  // CP–CE2 : personne ne lit ici — on regarde. Les images (mosaïque) et les
  // vidéos passent devant l'article, les cahiers à imprimer remontent (c'est ce
  // que cherche l'adulte qui tient le téléphone), et le catalogue de 21 entrées
  // descend. « Un peu de maths » reste le seul ✕ assumé de toute la matrice :
  // la rubrique est écrite pour le collège.
  "cp-ce2": { mosaique: -2, envrai: -2, une: 2, cahiers: -4, catalogue: 3, maths: "x" },
  // CM1–CM2 : l'entrée dans le coach et le guide de survie. Les cahiers et les
  // pages matières remontent, « un peu de maths » attend encore un peu.
  "cm1-cm2": { cahiers: -3, apprendre: -1, envrai: -1, maths: 3 },
  // 6ᵉ–3ᵉ : le cœur de cible, celui pour qui la colonne élève est écrite. On y
  // touche le moins — les matières remontent d'un cran, les cahiers d'été
  // cèdent la place au catalogue de l'année.
  "6e-3e": { apprendre: -2, catalogue: -1, cahiers: 1 },
  // Lycée : la spécialité d'abord (« un peu de maths » et le catalogue
  // remontent), les images et les cahiers de vacances passent derrière.
  lycee: { maths: -3, catalogue: -3, mosaique: 4, cahiers: 3 },
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
  /**
   * Le cycle à partir duquel ce slide a du sens (`cp-ce2`, `cm1-cm2`,
   * `6e-3e`, `lycee`). Constat de Frédéric : « les élèves de CP ne peuvent
   * pas regarder Pourquoi les bulles sont rondes ». `null` = pas de garde,
   * le slide est montré à tout le monde — c'est l'état tant que la colonne
   * `niveau_mini` n'existe pas en base.
   */
  niveauMini?: string | null;
};

/** Les cycles, du plus jeune au plus grand — l'ordre EST le sens. */
const ORDRE_CYCLES = ["cp-ce2", "cm1-cm2", "6e-3e", "lycee"];

/** La colonne de la matrice → l'étiquette adulte correspondante. */
const PROFIL_ADULTE: Partial<Record<Colonne, string>> = {
  parent: "parent",
  prof: "prof",
  principal: "etablissement",
  entreprise: "entreprise",
};

/**
 * Un slide s'adresse à l'une des HUIT options de « Qui est-ce ? » (Frédéric,
 * 02/08 : « cale-les sur les options de qui est-ce »). Les deux familles ne se
 * filtrent pas de la même façon, et c'est le cœur de la règle :
 *
 *   • un CYCLE est un SEUIL — `cm1-cm2` veut dire « à partir du CM1 », donc un
 *     lycéen le voit aussi ;
 *   • un PROFIL ADULTE est une CIBLE — `prof` veut dire « pour les
 *     professeurs », pas « à partir des professeurs ».
 *
 * D'où :
 *   – sans étiquette → tout le monde ;
 *   – lecteur élève → les cycles ≤ au sien, jamais un slide adulte ;
 *   – lecteur adulte → son propre profil, plus TOUS les slides d'élèves : il
 *     n'a pas d'âge qui le limite, et un parent a de bonnes raisons de vouloir
 *     voir ce que son enfant verrait.
 */
function slidePourProfil(
  s: SlideUne,
  cycle: string | null,
  colonne: Colonne,
): boolean {
  const cible = s.niveauMini;
  if (!cible) return true;
  const estCycle = ORDRE_CYCLES.includes(cible);

  if (cycle) {
    // Lecteur élève : le seuil d'âge s'applique, les slides adultes sont hors sujet.
    if (!estCycle) return false;
    return ORDRE_CYCLES.indexOf(cycle) >= ORDRE_CYCLES.indexOf(cible);
  }

  // Lecteur adulte, ou visiteur dont on ignore l'âge.
  if (estCycle) return true;
  return cible === PROFIL_ADULTE[colonne];
}

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
// Le surtitre porte la couleur de sa rubrique. `boucan` par défaut : les blocs
// de la Une gardent le bleu du journal, seules les rubriques du dessous se
// colorent (sinon le premier écran vire au sapin).
function Kicker({
  children,
  id,
  accent = "boucan",
}: {
  children: React.ReactNode;
  id?: string;
  accent?: Accent;
}) {
  return (
    <p
      id={id}
      className="scroll-mt-24 break-words text-[11px] font-black uppercase tracking-[0.22em]"
      style={{ color: ACCENTS[accent] }}
    >
      {children}
    </p>
  );
}

// Le titre de rubrique : serif + filet dessous (la grammaire broadsheet). Le
// filet prend l'accent de la rubrique — deux pixels suffisent à signer une
// section, là où colorer le titre lui-même casserait la page.
function TitreRubrique({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent?: Accent;
}) {
  return (
    <div
      className="mt-1 border-b-2 pb-2"
      style={{ borderColor: accent ? ACCENTS[accent] : INK }}
    >
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
      <Link prefetch={false}
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

function UneCarousel({
  slides,
  cycle,
  colonne = "eleve",
}: {
  slides?: SlideUne[];
  cycle?: string | null;
  /** La colonne de la matrice — pour les slides ciblant un profil adulte. */
  colonne?: Colonne;
}) {
  const items = useMemo<SlideUne[]>(() => {
    const base =
      slides && slides.length > 0
        ? slides
        : // Repli : les épisodes historiques, projetés au format SlideUne.
          [UNE, ...BREVES].map((e) => ({
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

    // Le filtre par âge, branché sur « Qui est-ce ? ». Il ne fait rien tant
    // que la colonne `niveau_mini` n'existe pas en base : tous les slides
    // ont alors `niveauMini` à null, donc tous passent.
    const gardes = base.filter((s) => slidePourProfil(s, cycle ?? null, colonne));
    // Filet de sécurité : jamais de Une vide. Si le filtre a tout coupé —
    // colonne mal remplie, cycle inattendu — on remontre tout plutôt que
    // d'afficher un carrousel blanc en haut de page.
    return gardes.length > 0 ? gardes : base;
  }, [slides, cycle, colonne]);

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
      <p className="bg-[#1d1c16] px-3 py-2.5 text-sm font-black text-[#d8e9ee] transition group-hover:bg-cyan-800">
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
          <Link prefetch={false} href={ep.lien} className="group block border border-[#1d1c16]/25">
            {carte}
          </Link>
        )}

        {/* Les flèches ‹ › (façon MSN), posées sur l'image. */}
        <button
          type="button"
          aria-label="Épisode précédent"
          onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
          className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#1d1c16]/25 bg-[#d8e9ee]/90 text-xl font-black text-[#1d1c16] shadow transition hover:bg-[#d8e9ee]"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Épisode suivant"
          onClick={() => setIndex((i) => (i + 1) % items.length)}
          className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#1d1c16]/25 bg-[#d8e9ee]/90 text-xl font-black text-[#1d1c16] shadow transition hover:bg-[#d8e9ee]"
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
              <Link prefetch={false}
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

  // « Qui est-ce ? » — le cycle choisi. Lu APRÈS le montage : au premier rendu
  // il vaut null des deux côtés, donc l'hydratation ne casse pas (même
  // précaution que useAudience).
  const [cycleChoisi, setCycleChoisi] = useState<string | null>(null);
  useEffect(() => {
    try {
      const v = localStorage.getItem(CLE_CYCLE);
      if (v && CYCLES.some((c) => c.id === v)) setCycleChoisi(v);
    } catch {
      /* localStorage indisponible (navigation privée, cookies bloqués) */
    }
  }, []);

  // L'audience choisie à la main dans « Qui est-ce ? ». Lue après montage,
  // comme le cycle, pour ne pas casser l'hydratation.
  const [audienceChoisie, setAudienceChoisie] = useState<Colonne | null>(null);
  useEffect(() => {
    try {
      const v = localStorage.getItem(CLE_AUDIENCE);
      const p = PORTES_ADULTES.find((x) => x.memo === v);
      if (p) setAudienceChoisie(p.colonne);
    } catch {
      /* localStorage indisponible */
    }
  }, []);

  function choisirAudience(p: (typeof PORTES_ADULTES)[number]) {
    // On RESTE sur la page : le sélecteur sert à la ranger, pas à la quitter.
    // Le lien vers l'espace dédié est la 3ᵉ tuile de la bande adulte, qui
    // apparaît juste en dessous une fois le profil connu.
    setAudienceChoisie(p.colonne);
    setCycleChoisi(null);
    try {
      localStorage.setItem(CLE_AUDIENCE, p.memo);
      localStorage.removeItem(CLE_CYCLE);
    } catch {
      /* ignore */
    }
  }

  function choisirCycle(id: string) {
    const c = CYCLES.find((x) => x.id === id);
    if (!c) return;
    setCycleChoisi(id);
    // La rampe se prérègle : les liens du coach partent avec le bon niveau.
    setClasseDepliee(c.classe);
    try {
      localStorage.setItem(CLE_CYCLE, id);
    } catch {
      /* ignore */
    }
  }

  // ── LA MATRICE, APPLIQUÉE ──────────────────────────────────────────────────
  // La colonne vient de l'espace mémorisé par useAudience : un visiteur passé
  // par /parents, /enseignants ou /espace-ecoles retrouve un accueil rangé pour
  // lui, sans avoir eu à se connecter. Défaut : élève.
  //
  // L'ordonnancement se fait en CSS (`order` sur un conteneur flex) et non en
  // réécrivant le JSX. Deux raisons : le DOM garde l'ordre du journal, donc ce
  // que Google lit ne change pas d'un visiteur à l'autre ; et on ne touche pas
  // aux 1 300 lignes de rendu, donc rien ne casse ailleurs.
  // ⚠️ Contrepartie connue : un lecteur d'écran suit le DOM, pas le CSS — ordre
  // lu et ordre vu divergent. Acceptable ici (les sections sont indépendantes
  // et chacune porte son titre), à revoir si on masque plus d'une section.
  const { space } = useAudience();
  const colonneDeLaRoute: Colonne =
    space === "parent"
      ? "parent"
      : space === "enseignant"
        ? "prof"
        : space === "etablissement"
          ? "principal"
          : "eleve";
  // Le clic explicite dans « Qui est-ce ? » prime sur l'espace déduit.
  const colonne: Colonne = audienceChoisie ?? colonneDeLaRoute;

  /**
   * LE RANG FINAL DE CHAQUE SECTION : on corrige, puis on RENUMÉROTE.
   *
   * ⚠️ Sans cette renumérotation, une correction produit fatalement des ex
   * æquo : la colonne occupe déjà 1…n sans trou, donc remonter une rubrique de
   * trois crans la pose sur une autre. `order` tranchait alors par l'ordre du
   * DOM — c'est-à-dire par le hasard de l'écriture du JSX, pas par une
   * décision. Les corrections restaient donc timides pour éviter les collisions,
   * et c'est bien ce qui empêchait les quatre cycles de vraiment se distinguer.
   *
   * On trie sur (rang corrigé, rang de la colonne) et on réattribue 1…n : à
   * égalité, c'est le rôle qui tranche, et le résultat est toujours une
   * permutation propre. Écrire `cahiers: -4` veut dire « très haut », sans avoir
   * à vérifier quelle case est libre.
   *
   * Une section ABSENTE de la colonne est masquée. C'est une exception à la
   * règle « chaque colonne est une permutation », et elle ne vaut que quand le
   * lecteur ne perd rien : la bande des évaluations nationales n'existe que pour
   * les adultes, parce qu'un élève a déjà le bloc complet dans la Une — on ne
   * lui cache pas un argument, on évite de lui montrer deux fois la même chose.
   */
  const rangs = useMemo(() => {
    const base = RANGS[colonne];
    const correction = cycleChoisi ? (CORRECTION[cycleChoisi] ?? {}) : {};
    const final: Record<string, number> = {};
    Object.keys(base)
      .filter((id) => correction[id] !== "x")
      .map((id) => {
        const c = correction[id];
        return {
          id,
          corrige: base[id] + (typeof c === "number" ? c : 0),
          base: base[id],
        };
      })
      .sort((a, b) => a.corrige - b.corrige || a.base - b.base)
      .forEach((s, i) => {
        final[s.id] = i + 1;
      });
    return final;
  }, [colonne, cycleChoisi]);

  /** Le rang d'une section pour le profil courant. `null` = masquée. */
  function rang(id: string): number | null {
    return rangs[id] ?? null;
  }

  /**
   * Le style à poser sur une section. Tout passe par `style` — ni classe à
   * fusionner, ni JSX à remanier : une seule chose à écrire par section.
   */
  function ordre(id: string): React.CSSProperties {
    const r = rang(id);
    // ⚠️ `minWidth: 0` est OBLIGATOIRE, pas une précaution. Un enfant de
    // conteneur flex vaut `min-width: auto` par défaut : il refuse de rétrécir
    // sous la largeur de son contenu. Depuis que <main> est passé en flex pour
    // porter les rangs, le moindre bloc large — la bande des 8 tuiles, un
    // titre à fort interlettrage — poussait toute la page en débordement
    // horizontal sur mobile (375 px de fenêtre, 731 px de page).
    return r === null
      ? { display: "none" }
      : { order: r, minWidth: 0 };
  }

  /**
   * Les deux oreilles de manchette du profil courant. Même forme que les
   * rangs : le rôle décide, le cycle affine — et seulement la gauche, dont le
   * surtitre nomme alors le niveau du lecteur.
   */
  const oreilles = useMemo(() => {
    const paire = OREILLES[colonne];
    const cycle = cycleChoisi ? CYCLES.find((c) => c.id === cycleChoisi) : null;
    // Aucun choix (ou un adulte, qui n'a pas de cycle) ⇒ la paire telle quelle.
    if (!cycle || colonne !== "eleve") return paire;
    return {
      gauche: { ...paire.gauche, kicker: `${cycle.emoji} Le catalogue · ${cycle.label}` },
      droite: OREILLE_ELEVE_CYCLE,
    };
  }, [colonne, cycleChoisi]);

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
  // Le cycle choisi retrouve sa classe au rechargement : `classeDepliee` est
  // remis à null par le montage, pas le souvenir. Priorité : le clic explicite
  // sur la rampe, puis la classe réelle d'un élève connecté (elle bat toujours
  // un cycle deviné), puis le cycle choisi, puis la 6ᵉ par défaut.
  const classeDuCycle = CYCLES.find((c) => c.id === cycleChoisi)?.classe ?? null;
  // La rampe se resserre sur le cycle choisi : 2 à 4 boutons au lieu de 12,
  // sans rien perdre du réglage fin. Pas de cycle → les douze, comme avant.
  const classesAffichees = cycleChoisi
    ? CLASSES_ENTREE.filter((c) =>
        (CYCLES.find((y) => y.id === cycleChoisi)?.classes ?? []).includes(c.slug),
      )
    : CLASSES_ENTREE;
  const classeActive = classeDepliee ?? eleveClasse ?? classeDuCycle ?? "6e";
  const prenomAffiche = getPrenomAffiche(eleve?.nom);
  const isCmPrimary =
    eleveClasse === "cm1" || eleveClasse === "cm2" || cycleChoisi === "cm1-cm2";
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
    // La classe d'un élève connecté d'abord ; à défaut celle du cycle choisi
    // dans « Qui est-ce ? » — c'est ce qui donne à un visiteur non connecté le
    // même confort qu'à un élève inscrit.
    const classe = eleveClasse ?? classeDuCycle;
    if (!classe) return href;
    if (href === "/coach-ia/maths" && MATHS_LEVELS.has(classe)) {
      return `/coach-ia/maths?classe=${classe}`;
    }
    if (href === "/coach-ia/francais" && FRANCAIS_LEVELS.has(classe)) {
      return `/coach-ia/francais?classe=${classe}`;
    }
    return href;
  }

  const classeLabel = eleveClasse ? (CLASSE_LABELS[eleveClasse] ?? "") : "";
  const matieres = isCmPrimary ? MATIERES.filter((m) => m.cm) : MATIERES;
  const parcours = isCmPrimary ? PARCOURS.filter((p) => p.cm) : PARCOURS;

  return (
    <main
      className="flex min-h-screen flex-col overflow-x-hidden px-4 pb-16 pt-6 sm:px-6 lg:px-8"
      style={{ backgroundColor: PAPER, color: INK }}
    >
      {/* ══ LA MANCHETTE ═════════════════════════════════════════════════════ */}
      <header className="mx-auto w-full min-w-0 max-w-6xl">
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
        {/* ⚠️ LES TROIS COLONNES ATTENDENT `xl`, PAS `lg` (04/08). Mesuré à
            1024 px exactement : le titre du journal prend ce qu'il veut au
            milieu (`auto`) et ne laissait que 117 px à chaque oreille — les
            titres y tombaient sur cinq à sept lignes, et d'un profil à l'autre
            la boîte passait de 226 à 256 px. Aucune hauteur figée ne rattrape
            un écart pareil : la cause n'est pas le texte, c'est une manchette
            en trois colonnes dans une fenêtre qui n'en tient que deux. En
            dessous de 1280 px elle s'empile — les oreilles prennent toute la
            largeur et leur titre tient sur une ligne. */}
        <div className="grid items-center gap-3 border-b-4 border-double border-[#1d1c16] py-5 xl:grid-cols-[1fr_auto_1fr] xl:gap-6">
          {/* Oreille gauche — FAIRE : la porte du lecteur, celle qui l'emmène
              travailler. Par défaut (personne n'a rien choisi) c'est le
              catalogue, destination /explorer (demande de Frédéric, 19/07) :
              l'oreille promet le coach ET les séries — /explorer montre tout et
              laisse choisir sa classe, le coach maths seul était réducteur.

              NE PAS RÉPÉTER LE PAVÉ « COMMENCE ICI » (01/08) : l'oreille disait
              « Il t'explique, tu t'entraînes — tout est corrigé » et, 300 px
              plus bas, le pavé disait « Entraîne-toi maintenant — tout est
              corrigé ». Les deux se voient en même temps : le même argument dit
              deux fois ne s'entend plus. L'oreille prend donc l'ÉTENDUE (toutes
              les classes, toutes les matières), le pavé garde le GESTE.

              ⚠️ `min-h` + centrage vertical : le profil n'est lu qu'APRÈS le
              montage, donc les mots changent ~100 ms après l'affichage. À
              hauteur libre, deux oreilles de longueurs différentes feraient
              sauter la manchette entière — le bloc le plus regardé de la page.
              Hauteur figée : seuls les mots se précisent, la page ne bouge
              pas. */}
          <Link
            href={oreilles.gauche.href}
            className="group order-2 flex min-h-[112px] flex-col justify-center border-2 border-cyan-800 bg-cyan-800 xl:min-h-[157px] p-3 text-center text-[#f0fafc] transition hover:bg-[#f0fafc] hover:text-cyan-800 xl:order-1"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.18em]">
              {oreilles.gauche.kicker}
            </p>
            <p className="mt-1 font-serif text-lg font-black leading-tight">
              {oreilles.gauche.titre}
            </p>
            <p className="mt-1 text-xs font-black underline underline-offset-2">
              {oreilles.gauche.action}
            </p>
          </Link>

          {/* La manchette = L'ADRESSE. Le public YouTube tape eleveai.fr à la
              main : le titre du journal EST l'adresse (elle se grave à chaque
              visite). « Le Journal » passe en surtitre, la devise du manifeste
              cède la place à la phrase choc du coach. */}
          <div className="order-1 text-center xl:order-2">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#1d1c16]/70 sm:text-xs">
              Le journal pour apprendre et s&apos;évaluer · Île de La Réunion
            </p>
            {/* TI MARGO EN MANCHETTE (Frédéric, 02/08). D'abord posé en emoji
                à droite : il le veut à gauche, plus gros, et surtout AVEC SON
                CRAYON — c'est-à-dire le vrai dessin des cahiers de vacances
                (public/cahier-vacances/ti-margo.png), pas un pictogramme
                système qui change de tête d'un téléphone à l'autre.
                Le titre devient une ligne flex : `items-end` pose ses pattes
                sur la ligne de base du mot, `h-[1.5em]` le dimensionne par
                rapport au titre — il grandit donc avec la manchette, du
                téléphone au grand écran, sans réglage par palier.
                Pas de `lazy` : il est au-dessus de la ligne de flottaison. */}
            <h1 className="mt-1 flex items-end justify-center gap-2 font-serif text-5xl font-black leading-none tracking-tight sm:text-6xl lg:text-7xl">
              {/* Par next/image et pas <img> : le PNG d'origine pèse 682 Ko
                  pour 1122×1402, et il est désormais la première image de la
                  page. Servi tel quel, c'est lui qui retarderait l'affichage
                  sur un téléphone au collège. next/image le redimensionne et
                  le convertit en WebP ; `priority` le charge tout de suite
                  puisqu'il est au-dessus de la ligne de flottaison. */}
              <Image
                src="/cahier-vacances/ti-margo.png"
                alt="Ti Margo, le margouillat du journal, avec son crayon"
                width={1122}
                height={1402}
                sizes="(max-width: 640px) 60px, (max-width: 1024px) 75px, 90px"
                priority
                className="h-[1.5em] w-auto shrink-0"
              />
              <span>
                eleveai<span className="text-cyan-800">.fr</span>
              </span>
            </h1>
            <p className="mt-2 font-serif text-base font-black italic tracking-wide text-[#1d1c16]/70 sm:text-lg">
              « Ici, personne n&apos;apprend à ta place. »
            </p>
          </div>

          {/* Oreille droite — COMPRENDRE : ce que ça donne, la preuve, la porte
              qu'aucun autre bloc du premier écran ne propose à ce lecteur.
              Par défaut (personne n'a rien choisi) c'est le professeur : la
              connexion ouvre le tableau de suivi, résultats élève par élève,
              correction automatique. On ne promet QUE ce qui existe : pas de
              « vue classe » tant que le chantier d'août n'a pas livré. */}
          <Link
            href={oreilles.droite.href}
            className="group order-3 flex min-h-[112px] flex-col justify-center border-2 border-cyan-800 bg-cyan-800 xl:min-h-[157px] p-3 text-center text-[#f0fafc] transition hover:bg-[#f0fafc] hover:text-cyan-800"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.18em]">
              {oreilles.droite.kicker}
            </p>
            <p className="mt-1 font-serif text-lg font-black leading-tight">
              {oreilles.droite.titre}
            </p>
            <p className="mt-1 text-xs font-black underline underline-offset-2">
              {oreilles.droite.action}
            </p>
          </Link>
        </div>

        {/* ══ « QUI EST-CE ? » — LE SÉLECTEUR DE PROFIL ════════════════════════
            Huit tuiles sur UNE SEULE LIGNE (demande de Frédéric) : sur un
            téléphone la bande glisse horizontalement au lieu de passer à la
            ligne — c'est le geste des rangées, et les quatre tuiles d'élève
            restent les premières vues. Masqué pour un staff connecté : il a son
            bandeau de tableau de bord, on ne lui demande pas qui il est. */}
        {!isStaff && (
          <section className="border-b border-[#1d1c16]/25 py-4">
            {cycleChoisi || audienceChoisie ? (
              // Choix fait — cycle OU profil adulte : la bande se replie en
              // pastille. Un adulte doit pouvoir changer d'avis comme un élève.
              <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
                <span className="font-serif font-black">
                  {cycleChoisi
                    ? `${CYCLES.find((c) => c.id === cycleChoisi)?.emoji} ${CYCLES.find((c) => c.id === cycleChoisi)?.label}`
                    : `${PORTES_ADULTES.find((p) => p.colonne === audienceChoisie)?.emoji} ${PORTES_ADULTES.find((p) => p.colonne === audienceChoisie)?.label}`}
                </span>
                <span className="text-[#1d1c16]/50">·</span>
                <button
                  type="button"
                  onClick={() => {
                    setCycleChoisi(null);
                    setAudienceChoisie(null);
                    try {
                      localStorage.removeItem(CLE_CYCLE);
                      localStorage.removeItem(CLE_AUDIENCE);
                    } catch {
                      /* ignore */
                    }
                  }}
                  className="font-black text-cyan-800 underline underline-offset-2 hover:no-underline"
                >
                  changer
                </button>
              </div>
            ) : (
              <>
                {/* Le sous-titre « Une fois, et le journal se range pour
                    vous » est parti : une phrase à lire au-dessus de huit
                    images qui se comprennent sans elle. */}
                <p className="text-center font-serif text-lg font-black leading-none sm:text-xl">
                  Qui est-ce&nbsp;?
                </p>
                <div className="mt-2 flex flex-nowrap gap-2 overflow-x-auto pb-1">
                  {CYCLES.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => choisirCycle(c.id)}
                      className="min-w-[82px] flex-1 border-2 border-[#1d1c16] bg-[#1d1c16]/[0.04] px-1 py-2.5 text-center transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#1d1c16]"
                    >
                      <span className="block text-2xl leading-none" aria-hidden>
                        {c.emoji}
                      </span>
                      <span className="mt-1.5 block whitespace-nowrap font-serif text-[10px] font-black">
                        {c.label}
                      </span>
                      <span
                        className="mx-auto mt-1.5 block h-[3px] w-6 rounded-sm"
                        style={{ backgroundColor: ACCENTS[c.accent] }}
                        aria-hidden
                      />
                    </button>
                  ))}
                  {PORTES_ADULTES.map((p) => (
                    <button
                      key={p.memo}
                      type="button"
                      onClick={() => choisirAudience(p)}
                      className="min-w-[82px] flex-1 border-2 border-[#1d1c16] bg-[#1d1c16]/[0.04] px-1 py-2.5 text-center transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#1d1c16]"
                    >
                      <span className="block text-2xl leading-none" aria-hidden>
                        {p.emoji}
                      </span>
                      <span className="mt-1.5 block whitespace-nowrap font-serif text-[10px] font-black">
                        {p.label}
                      </span>
                      <span
                        className="mx-auto mt-1.5 block h-[3px] w-6 rounded-sm"
                        style={{ backgroundColor: ACCENTS[p.accent] }}
                        aria-hidden
                      />
                    </button>
                  ))}
                </div>
              </>
            )}
          </section>
        )}
        {/* Le chemin de fer + la devise SUR LA MÊME BANDE (01/08). Ils avaient
            chacun la leur : deux filets de plus sur le premier écran, et trois
            accroches empilées sous le titre (le surtitre du journal, « Ici,
            personne n'apprend à ta place », puis la devise). Les mots restent,
            la bande de trop s'en va.
            REMONTÉ AU-DESSUS DE « COMMENCE ICI » (04/08) : il ferme la
            manchette. Le sommaire d'un journal est du CADRE — il annonce les
            rubriques, il n'en est pas une —, donc il reste en tête pour tout le
            monde pendant que les deux blocs qui le suivaient entrent dans la
            matrice. */}
        <div className="border-b border-[#1d1c16]/25 py-2">
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[11px] font-black uppercase tracking-[0.16em]">
          <a href="#la-une" className="hover:text-cyan-800">La Une</a>
          <span aria-hidden className="text-[#1d1c16]/30">·</span>
          <a href="#en-vrai" className="hover:text-[#3f6b0c]">En vrai</a>
          <span aria-hidden className="text-[#1d1c16]/30">·</span>
          {/* « Comprendre » a fusionné avec « Un peu de maths » (24/07) : une
              seule entrée, sinon deux liens du chemin de fer menaient au même
              endroit. */}
          <a href="#un-peu-de-maths" className="hover:text-[#0e7490]">Un peu de maths</a>
          <span aria-hidden className="text-[#1d1c16]/30">·</span>
          <a href="#apprendre" className="hover:text-[#bf3b1e]">Apprendre</a>
          <span aria-hidden className="text-[#1d1c16]/30">·</span>
          <a href="#catalogue" className="hover:text-[#3f6b0c]">Le catalogue</a>
          <span aria-hidden className="text-[#1d1c16]/30">·</span>
          <a href="#courrier" className="hover:text-[#0e7490]">Le courrier</a>
          <span aria-hidden className="text-[#1d1c16]/30">·</span>
          <a href="#honneur" className="hover:text-[#a34c07]">À l&apos;honneur</a>
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
      </header>

      {/* ══ COMMENCE ICI — LE PREMIER GESTE ══════════════════════════════════
          Décision produit (24/07, Frédéric) : le COACH est la destination
          (il entraîne), PARCOURS + DÉFIS sont l'épreuve (ils testent), et le
          journal / simulateurs ne sont que la PORTE D'ENTRÉE. On remet donc
          l'entraînement en tête d'affiche — trois verbes TOUJOURS visibles,
          la classe affine la destination — au lieu de la bande repliée qui
          cachait le coach derrière un clic.

          SORTI DE LA MANCHETTE (04/08) — c'est le bout qui manquait à la
          correction du 03/08. Tant qu'il vivait dans le <header>, il passait
          avant tout le monde : un principal venu pour les évaluations
          nationales, un chef d'entreprise venu voir qui soutenir, se prenaient
          d'abord 326 px de rampe d'élève. Il entre donc dans la matrice comme
          les autres — premier pour l'élève, neuvième pour le principal.
          ⚠️ `w-full min-w-0` : fille d'un <main> en flex (cf. `ordre`), sans
          quoi elle refuse de rétrécir et fait déborder la page sur mobile. */}
      <section
        style={ordre("commence")}
        className="mx-auto mt-6 w-full min-w-0 max-w-6xl"
      >
        <div className="mx-auto max-w-4xl border-2 border-cyan-800 bg-cyan-800/[0.05] p-4 sm:p-5">
          <p className="text-center text-[11px] font-black uppercase tracking-[0.22em] text-cyan-800">
            ✏️ Commence ici · Le coach t&apos;entraîne
          </p>
          <h2 className="mt-1 text-center font-serif text-2xl font-black leading-tight sm:text-[1.75rem]">
            Entraîne-toi maintenant — tout est corrigé
          </h2>
          {/* LE PARAGRAPHE DE DOCTRINE EST PARTI (02/08). Il expliquait en
              48 px que « le coach t'explique et tu t'entraînes ; le parcours
              et le défi te testent » — soit exactement ce que disent les
              trois boutons juste en dessous, en plus long. Sur un premier
              écran de 924 px avant le premier article, et avec le constat de
              Frédéric que les gens ne lisent pas, c'était le morceau le plus
              cher au mot. Les boutons restent, la leçon s'en va. */}

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
              {classesAffichees.map((c) => {
                const teinte = ACCENTS[ACCENT_PAR_CLASSE[c.slug] ?? "boucan"];
                const actif = classeActive === c.slug;
                // La couleur passe par `style` : Tailwind ne génère que les
                // classes qu'il lit en clair dans le fichier, un
                // `border-[${teinte}]` calculé ne sortirait jamais du build.
                return (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => setClasseDepliee(c.slug)}
                    aria-pressed={actif}
                    className="rounded-full border-2 px-3.5 py-1 text-sm font-black transition hover:-translate-y-0.5"
                    // ⚠️ MESURÉ, pas supposé : écrire le label DANS sa teinte
                    // donnait 4,29:1 pour le boucan et 4,36:1 pour le
                    // flamboyant sur le papier — sous les 4,5:1 exigés à cette
                    // taille (14 px gras ne compte pas comme du « grand
                    // texte »). L'accent tient donc le cercle, l'encre garde le
                    // mot : 13,7:1 au repos, et de 5,1 à 6,0:1 une fois la
                    // pastille pleine, avec le clair des oreilles de manchette.
                    style={
                      actif
                        ? {
                            backgroundColor: teinte,
                            borderColor: teinte,
                            color: "#f0fafc",
                            // L'ombre portée dure du journal, celle des tuiles
                            // « Qui est-ce ? » — en deux pixels, à l'échelle
                            // d'une pastille.
                            boxShadow: `2px 2px 0 ${INK}`,
                          }
                        : { borderColor: teinte, color: INK }
                    }
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
            {classeActive && (
              <div className="mx-auto mt-2 max-w-2xl space-y-1.5 text-sm font-black">
                {/* S'entraîner : les coachs de la classe. */}
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
                  <span className="text-[11px] font-black uppercase tracking-[0.14em] text-[#1d1c16]/55">
                    ✏️ S&apos;entraîner :
                  </span>
                  <Link prefetch={false} href={`/coach-ia/maths?classe=${classeActive}`} className="text-cyan-800 underline underline-offset-2 hover:no-underline">
                    🧮 Maths
                  </Link>
                  {FRANCAIS_LEVELS.has(classeActive) && (
                    <Link prefetch={false} href={`/coach-ia/francais?classe=${classeActive}`} className="text-cyan-800 underline underline-offset-2 hover:no-underline">
                      📖 Français
                    </Link>
                  )}
                  <Link prefetch={false} href="/coach-ia/english-maths" className="text-cyan-800 underline underline-offset-2 hover:no-underline">
                    🇬🇧 Anglais
                  </Link>
                  <Link prefetch={false} href="/coach-ia/espagnol" className="text-cyan-800 underline underline-offset-2 hover:no-underline">
                    🇪🇸 Espagnol
                  </Link>
                  <Link prefetch={false} href="/coach-ia/ia" className="text-cyan-800 underline underline-offset-2 hover:no-underline">
                    🤖 IA
                  </Link>
                </div>
                {/* S evaluer : LE parcours de chaque matiere (rappel de
                    Frédéric : il y en a un par matière, pas un seul). */}
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
                  <span className="text-[11px] font-black uppercase tracking-[0.14em] text-[#1d1c16]/55">
                    🧭 S&apos;&eacute;valuer :
                  </span>
                  <Link prefetch={false} href="/parcours" className="text-cyan-800 underline underline-offset-2 hover:no-underline">
                    🧮 Maths
                  </Link>
                  {FRANCAIS_LEVELS.has(classeActive) && (
                    <Link prefetch={false} href="/parcours-francais" className="text-cyan-800 underline underline-offset-2 hover:no-underline">
                      📖 Français
                    </Link>
                  )}
                  <Link prefetch={false} href="/parcours-english-maths" className="text-cyan-800 underline underline-offset-2 hover:no-underline">
                    🇬🇧 Anglais
                  </Link>
                  <Link prefetch={false} href="/parcours-espagnol" className="text-cyan-800 underline underline-offset-2 hover:no-underline">
                    🇪🇸 Espagnol
                  </Link>
                  <Link prefetch={false} href="/parcours-ia" className="text-cyan-800 underline underline-offset-2 hover:no-underline">
                    🤖 IA
                  </Link>
                  <Link prefetch={false} href={`/programme/${classeActive}`} className="text-[#1d1c16]/70 underline underline-offset-2 hover:no-underline">
                    📋 Le programme
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══ LES AVIS DES ÉLÈVES — le chapeau du courrier ══════════════════════
          Demande de Frédéric (19/07) : un avis d'élève en manchette — verbatim,
          fautes comprises (authenticité), prénom + niveau seul (RGPD). Rotation
          douce toutes les 8 s sur les mêmes avis que le courrier des lecteurs ;
          le clic descend au courrier complet.

          SORTI DE LA MANCHETTE (04/08), lui aussi. Il garde son filet — un
          bandeau encadré haut et bas, pour qu'il se lise comme une brève où
          qu'il tombe — et il ne touche jamais le courrier complet (cf. la règle
          sous RANGS) : l'un annonce, l'autre développe. */}
      <a
        href="#courrier"
        style={ordre("avis")}
        className="mx-auto mt-6 block w-full min-w-0 max-w-6xl border-y border-[#1d1c16]/25 py-2 text-center transition hover:bg-[#1d1c16]/5"
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

      {/* ══ LA BANDE DES ADULTES ════════════════════════════════════════════
          Frédéric, 03/08. Un adulte arrivait sur une page conçue pour un
          enfant, sans une seule porte à lui sur le premier écran — alors que
          /espace-ecoles répond déjà en 405 lignes au financement, au RGPD et
          à la souveraineté des données, sans être liée nulle part en haut.

          Trois tuiles, une ligne, même grammaire que « Qui est-ce ? » : rien à
          lire, et une hauteur qui ne repousse pas la Une comme l'avaient fait
          les 326 px de « Commence ici ».

          RÉSERVÉE AUX ADULTES (`evals` est absent de la colonne élève) : un
          élève a déjà le bloc complet des évaluations dans la Une, donc
          personne ne voit deux fois la même chose.

          ⚠️ La 3ᵉ tuile CHANGE DE DESTINATION selon le profil — c'est la
          matrice appliquée au contenu et plus seulement à l'ordre.
          ⚠️ `w-full min-w-0` : fille d'un <main> en flex, sans quoi elle
          refuse de rétrécir et fait déborder la page sur mobile. */}
      <section
        style={ordre("evals")}
        className="mx-auto mt-6 grid w-full min-w-0 max-w-6xl gap-2 sm:grid-cols-3"
      >
        <Link prefetch={false}
          href="/evaluation-nationale-college"
          className="group min-w-0 border-2 border-[#1d1c16] p-3 transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#1d1c16]"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-800">
            🎓 La rentrée{joursAvantEvalNationale() > 0 ? ` · J−${joursAvantEvalNationale()}` : ""}
          </p>
          <p className="mt-1 font-serif text-lg font-black leading-tight">
            Les évaluations nationales de 6ᵉ et 4ᵉ
          </p>
          <p className="mt-1 text-xs font-medium leading-5 text-[#1d1c16]/70">
            Les quatre épreuves en blanc, le bilan par compétence.
          </p>
        </Link>

        {/* LE RGPD DIT PAR SON MÉCANISME, PAS PAR UN PARAGRAPHE (idée de
            Frédéric). « L'élève entre un code, pas une adresse mail » se
            comprend en une seconde et se vérifie : la connexion élève demande
            un code de 6 à 8 chiffres, son établissement et sa classe. On
            n'affirme rien de plus — la page dédiée dit le reste. */}
        <Link prefetch={false}
          href="/politique-confidentialite"
          className="group min-w-0 border-2 border-[#1d1c16] p-3 transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#1d1c16]"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#3f6b0c]">
            🔒 Les données de vos élèves
          </p>
          <p className="mt-1 font-serif text-lg font-black leading-tight">
            Un code d&apos;établissement, pas une adresse mail
          </p>
          <p className="mt-1 text-xs font-medium leading-5 text-[#1d1c16]/70">
            L&apos;élève entre un code, son établissement et sa classe.
          </p>
        </Link>

        <Link prefetch={false}
          href={ESPACE_ADULTE[colonne]?.href ?? "/espace-ecoles"}
          className="group min-w-0 border-2 border-[#1d1c16] p-3 transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#1d1c16]"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#bf3b1e]">
            {ESPACE_ADULTE[colonne]?.kicker ?? "🏫 Votre établissement"}
          </p>
          <p className="mt-1 font-serif text-lg font-black leading-tight">
            {ESPACE_ADULTE[colonne]?.titre ?? "Financement, RGPD, déploiement"}
          </p>
          <p className="mt-1 text-xs font-black text-[#bf3b1e]">
            En savoir plus →
          </p>
        </Link>
      </section>

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
              <Link prefetch={false}
                href="/fiches-cours/maths"
                className="inline-flex items-center gap-2 rounded-sm bg-[#1d1c16] px-4 py-2 text-sm font-black text-[#d8e9ee] transition hover:bg-cyan-800"
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
      <section id="la-une" className="mx-auto mt-6 max-w-6xl scroll-mt-24" style={ordre("une")}>
        {/* CONTRE LES TROUS (Frédéric, 24/07 : « qu'il n'y ait pas de trou ») :
            le contenu des 3 colonnes vient de la base et change chaque jour —
            un calage à la main se décalerait à la prochaine édition. Solution
            de maquettiste : chaque colonne est une colonne flex dont le
            dernier bloc s'ancre au pied (mt-auto) — les trois finissent
            toujours sur la même ligne, le mou respire À L'INTÉRIEUR. */}
        <div className="grid min-w-0 gap-8 lg:grid-cols-12">
          {/* L'article à la Une (RÉFLÉCHIR : ce qui se passe autour de toi). */}
          <article className="min-w-0 lg:col-span-7 lg:flex lg:flex-col">
            {/* Le carrousel façon MSN, piloté par la régie (/admin/journal) :
                chaque slide porte son propre surtitre. */}
            <UneCarousel slides={slides} cycle={cycleChoisi} colonne={colonne} />

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
            {/* ON NE COMBLE PAS UN MANQUE DE CONTENU AVEC DE L'AIR (01/08).
                Première tentative : la boîte s'étirait et répartissait le mou
                entre ses trois temps. Frédéric a envoyé la capture — 70 px de
                vide entre chaque ligne, dans un cadre, c'est encore plus
                visible qu'un trou en fin de colonne. La vraie cause était
                ailleurs : il n'y avait pas assez à dire. Les deux cases
                « 6ᵉ Français · Maths » deviennent donc LES QUATRE ÉPREUVES,
                chacune avec ce qu'elle teste et son entraînement. Le blanc
                disparaît parce que du contenu utile a pris sa place. */}
            <div className="mt-5 border-2 border-[#1d1c16] p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
                🎓 Les évaluations nationales de la rentrée du collège
              </p>
              <p className="mt-1 font-serif text-xl font-black leading-tight">
                Celles qu&apos;on te fera passer — prépare-les tranquillement
              </p>

              {/* LE COMPTE À REBOURS, TOURNÉ EN PLAN (idée de Frédéric,
                  01/08 : « par exemple en mettant un gros compte à rebours »).
                  Un décompte sec dirait le contraire du titre juste au-dessus
                  — « prépare-les tranquillement ». Celui-ci annonce le jour ET
                  ce qu'il reste à faire d'ici là : quinze minutes par jour,
                  et le total dépasse la durée de l'épreuve. Le chiffre fait
                  peur ; le chiffre avec son plan rassure. */}
              {joursAvantEvalNationale() > 0 && (
                <div className="mt-3 flex items-center gap-4 border-y-2 border-[#1d1c16] py-3">
                  <p className="font-serif text-5xl font-black leading-none tracking-tight text-cyan-800">
                    J−{joursAvantEvalNationale()}
                  </p>
                  <p className="text-xs font-medium leading-5 text-[#1d1c16]/70">
                    <span className="block text-sm font-black text-[#1d1c16]">
                      avant les évaluations de rentrée
                    </span>
                    {EVAL_MINUTES_PAR_JOUR} minutes par jour d&apos;ici là, et
                    ça fait{" "}
                    {Math.round(
                      (joursAvantEvalNationale() * EVAL_MINUTES_PAR_JOUR) / 60,
                    )}{" "}
                    heures d&apos;entraînement. Plus que ce que l&apos;épreuve
                    durera.
                  </p>
                </div>
              )}

              {/* LES QUATRE ÉPREUVES MÈNENT AUX ÉPREUVES BLANCHES (01/08).
                  Elles envoyaient au coach du niveau, faute de mieux : les
                  épreuves blanches n'existaient pas encore. Maintenant qu'elles
                  existent, c'est là qu'il faut arriver — un élève qui a le jour
                  J en tête veut d'abord voir à quoi ça ressemble, et son bilan
                  le renverra au coach avec le nom des compétences qui ont
                  coincé. C'est un meilleur chemin vers le coach qu'un lien
                  froid, et le hub garde « ou t'entraîner sans chrono ».
                  ⚠️ `minutes` est recopié de `dureeSecondes` (voir le hub) :
                  importer les configs ici embarquerait les quatre banques dans
                  le bundle de l'accueil. */}
              <div className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {[
                  {
                    niveau: "6ᵉ",
                    matiere: "Français",
                    teste: "Comprendre un texte qu'on lit et qu'on écoute, lire à voix haute.",
                    href: "/evaluation-nationale-college/6e-francais",
                    minutes: 25,
                  },
                  {
                    niveau: "6ᵉ",
                    matiere: "Mathématiques",
                    teste: "Nombres et calcul, grandeurs, géométrie, résoudre un problème.",
                    href: "/evaluation-nationale-college/6e-maths",
                    minutes: 20,
                  },
                  {
                    niveau: "4ᵉ",
                    matiere: "Français",
                    teste: "Comprendre un texte long et un texte qu'on écoute, la langue.",
                    href: "/evaluation-nationale-college/4e-francais",
                    minutes: 25,
                  },
                  {
                    niveau: "4ᵉ",
                    matiere: "Mathématiques",
                    teste: "Calculs, lire des données, grandeurs et mesures, géométrie.",
                    href: "/evaluation-nationale-college/4e-maths",
                    minutes: 20,
                  },
                ].map((e) => (
                  <Link prefetch={false}
                    key={e.href}
                    href={e.href}
                    className="group block border-t border-[#1d1c16]/25 pt-2"
                  >
                    <span className="flex items-baseline gap-2">
                      <span className="font-serif text-xl font-black leading-none">
                        {e.niveau}
                      </span>
                      <span className="font-serif text-[15px] font-black leading-snug group-hover:underline">
                        {e.matiere}
                      </span>
                    </span>
                    {/* Une seule ligne, coupée aux points de suspension
                        (Frédéric, 01/08) : sur deux lignes, les quatre
                        descriptions faisaient un pavé gris sous les titres.
                        Le détail complet est sur le hub.
                        ⚠️ `truncate` et pas `line-clamp-1` : line-clamp pose
                        `display:-webkit-box` et se fait écraser par le `block`
                        de la même classe — la description restait sur deux
                        lignes. */}
                    <span className="mt-0.5 block truncate text-xs font-medium leading-5 text-[#1d1c16]/70">
                      {e.teste}
                    </span>
                    <span className="mt-1 block text-sm font-black text-cyan-800">
                      Passer l&apos;épreuve blanche · {e.minutes} min →
                    </span>
                  </Link>
                ))}
              </div>
              <Link prefetch={false}
                href="/evaluation-nationale-college"
                className="mt-3 block text-sm font-black text-cyan-800 hover:underline"
              >
                Ou d&apos;abord voir ce qu&apos;on te demandera, épreuve par
                épreuve →
              </Link>

              {/* LE DICO EST RETIRÉ D'ICI (Frédéric, 01/08 : « personne n'y
                  va », « c'est plutôt une source »). La page reste en ligne,
                  elle n'est simplement plus mise en avant : une vitrine qui
                  montre ce qu'on ne consulte pas coûte de l'attention aux
                  liens qui, eux, servent.
                  PIX EST À PART, ET DATÉ : la certification au collège, c'est
                  la 3ᵉ au printemps — pas la rentrée de 6ᵉ/4ᵉ. Mise sur le
                  même rang, elle brouillait l'encadré. */}
              <Link prefetch={false}
                href="/eval-pix-ia"
                className="group mt-4 block border-t border-[#1d1c16]/25 pt-3"
              >
                <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
                  Et plus tard · en 3ᵉ
                </span>
                <span className="mt-1 block font-serif text-[15px] font-black leading-snug group-hover:underline">
                  La certification Pix, au printemps
                </span>
                <span className="mt-0.5 block text-xs font-medium leading-5 text-[#1d1c16]/70">
                  Celle-là compte, et elle va au livret scolaire. Notre éval
                  blanche te prépare au volet intelligence artificielle.
                </span>
                <span className="mt-1 block text-sm font-black text-cyan-800">
                  Passer l&apos;éval blanche IA →
                </span>
              </Link>
            </div>

            {/* PRÉPA CONCOURS — remontée du fil du jour (01/08). Rubrique et
                pas lien (Frédéric, 31/07) : le Concours Avenir et le Concours
                général aujourd'hui, les autres viendront s'y ranger sans
                retoucher l'accueil. Sa place est ici, à côté des évaluations
                nationales : ce sont les mêmes échéances, à deux âges.
                Plus de `mt-auto` ici : c'est l'encadré des évaluations, juste
                au-dessus, qui s'étire et absorbe le mou (doctrine du 24/07 —
                le contenu vient de la base et change chaque jour, un calage à
                la main ne tiendrait qu'une édition). */}
            <div className="mt-5 border-t-2 border-[#1d1c16] pt-3">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
                🎯 Pr&eacute;pa concours
              </p>
              <div className="mt-2 grid gap-x-6 sm:grid-cols-2">
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
                  <Link prefetch={false}
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
            </div>
          </article>

          {/* Le fil du jour (APPRENDRE : les rendez-vous quotidiens). */}
          <aside className="border-[#1d1c16]/25 lg:col-span-3 lg:flex lg:flex-col lg:border-l lg:pl-6">
            <Kicker>Apprendre · Aujourd&apos;hui</Kicker>
            {/* PLUS D'ANCRAGE FORCÉ ICI (01/08). L'encadré des évaluations
                ayant grossi (compte à rebours + les quatre épreuves), c'est
                la colonne de gauche qui donne désormais la hauteur : le
                `mt-auto` du défi ouvrait alors 155 px au milieu du fil, entre
                les machines et le défi. Un blanc au MILIEU se lit comme un
                bug, un blanc au PIED se lit comme une fin de colonne. Le fil
                coule donc naturellement. */}
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
                  <Link prefetch={false}
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
              <Link prefetch={false}
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
              <Link prefetch={false}
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

              {/* PRÉPA CONCOURS A DÉMÉNAGÉ dans la colonne de gauche, sous les
                  évaluations du collège (01/08). L'ORDRE DÉCIDÉ LE 31/07 est
                  intact — rituels, guides, cahiers, puis machines, puis le
                  défi en dernier : on descend toujours du quotidien vers
                  l'exploration. Ce qui change, c'est que « ce qui se prépare »
                  (les échéances : évaluations nationales, concours) tient
                  désormais dans UNE colonne, et « aujourd'hui » dans l'autre.
                  Sans « À lire aussi », la colonne de gauche finissait 490 px
                  avant ses voisines — c'est ce trou-là que le déménagement
                  ferme, par le sens et pas par du remplissage. */}

              {/* La machine reste visible, mais en format plus court dans cette colonne. */}
              <ReclameMachine />

              <Link prefetch={false}
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
                  reste, mais il devient un plus.
                  ANCRÉ AU PIED (mt-auto, 01/08) : le fil du jour finit droit,
                  comme les deux autres colonnes. */}
              <div className="py-3 lg:mt-auto">
                <Link prefetch={false} href="/defis-du-jour" className="group block">
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
                <Link prefetch={false}
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
                <Link prefetch={false} href="/coach-brevet" className="group block py-3">
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
              <Link prefetch={false}
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
                {/* Resserré (Frédéric, 01/08) : dans une colonne de 165 px,
                    chaque mot coûte une ligne. « le lait » part, la canne et
                    le barrage suffisent à prouver que d'autres l'ont fait. */}
                <p className="mt-1.5 text-sm font-semibold leading-6 text-[#1d1c16]/70">
                  Votre métier peut devenir un article, une simulation, un
                  défi — comme la canne ou le barrage.
                </p>
                <Link prefetch={false}
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
      <section className="mx-auto mt-10 max-w-6xl" style={ordre("parti")}>
        <Kicker accent="flamboyant">Le parti pris · Ce qu&apos;on fait autrement</Kicker>
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
      <section className="mx-auto mt-10 max-w-6xl" style={ordre("mosaique")}>
        <Kicker accent="safran">En un clic · L&apos;actualité en images</Kicker>
        <div className="mt-2 border-t-2 border-[#1d1c16]" />
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {/* Le défi du jour — la vraie image du défi programmé aujourd'hui. */}
          <Link prefetch={false}
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
            <Link prefetch={false}
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
          <Link prefetch={false}
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
      <section id="en-vrai" className="mx-auto mt-10 max-w-6xl scroll-mt-24" style={ordre("envrai")}>
        <Kicker accent="canne">Réfléchir · La série « en vrai »</Kicker>
        <TitreRubrique accent="canne">L&apos;île comme salle de classe</TitreRubrique>
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
              <Link prefetch={false} key={c.id} href="/maths-974" className="group border-t border-[#1d1c16]/25 pt-3">
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
                  <span className="absolute left-2 top-2 rounded-sm bg-[#1d1c16]/80 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-[#d8e9ee]">
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
          <Link prefetch={false}
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
      <section id="un-peu-de-maths" className="mx-auto mt-10 max-w-6xl scroll-mt-24" style={ordre("maths")}>
        <Kicker id="comprendre">Comprendre · La rubrique du prof</Kicker>
        <TitreRubrique accent="boucan">Un peu de maths</TitreRubrique>
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
        <Link prefetch={false}
          href="/simulateurs"
          className="mt-4 inline-block text-sm font-black text-cyan-800 underline underline-offset-2"
        >
          🎛️ Toutes les machines dans ta main →
        </Link>
      </section>

      {/* ══ APPRENDRE — les pages matières (le coach) + les parcours ═════════ */}
      <section id="apprendre" className="mx-auto mt-10 max-w-6xl scroll-mt-24" style={ordre("apprendre")}>
        <Kicker accent="flamboyant">Apprendre · Les pages matières</Kicker>
        <TitreRubrique accent="flamboyant">
          Le coach t&apos;explique{classeLabel ? ` — ta classe : ${classeLabel}` : ", du CP au Bac"}
        </TitreRubrique>
        <div className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {matieres.map((m) => (
            <Link prefetch={false}
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
              <Link prefetch={false} key={p.href} href={p.href} className="group border-t border-[#1d1c16]/25 pt-2.5">
                <h4 className="font-serif text-lg font-black leading-snug group-hover:underline">
                  🧭 Parcours {p.label}
                </h4>
                <p className="mt-0.5 text-sm font-medium text-[#1d1c16]/70">
                  Un bilan guidé — tes points forts, tes manques, la suite.
                </p>
                <p className="mt-1 text-sm font-black text-cyan-800">Passer le bilan →</p>
              </Link>
            ))}
            <Link prefetch={false} href="/eval-pix-ia" className="group border-t border-[#1d1c16]/25 pt-2.5">
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
            <Link prefetch={false} href="/fiches-cours" className="font-black text-cyan-800 underline underline-offset-2">
              fiches de cours
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ══ LE SUPPLÉMENT DE L'ÉTÉ — les cahiers de vacances ═════════════════
          Porte d'entrée n°1 du site (stats 15/07 : /cahier-vacances truste le
          top des pages vues) → une vraie vitrine visuelle, pas une ligne. */}
      <section id="cahiers" className="mx-auto mt-10 max-w-6xl scroll-mt-24" style={ordre("cahiers")}>
        <Kicker accent="safran">Le supplément de l&apos;été · À imprimer</Kicker>
        <TitreRubrique accent="safran">Les cahiers de vacances — du CE1 au Bac +1</TitreRubrique>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CAHIERS_VACANCES.map((c) => (
            <Link prefetch={false}
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
          <Link prefetch={false} href="/cahier-vacances" className="font-black text-cyan-800 underline underline-offset-2">
            tous les cahiers →
          </Link>
        </p>
      </section>

      {/* ══ L'AGENDA — les calls en direct, version papier (coupon détachable).
          Lit lib/calls.ts ; ne rend rien si aucun call actif à venir. ════════ */}
      <div style={ordre("agenda")}>
        <AgendaJournal />
      </div>

      {/* ══ LE CATALOGUE — les petites annonces : TOUT est listé ═════════════ */}
      <section id="catalogue" className="mx-auto mt-10 max-w-6xl scroll-mt-24" style={ordre("catalogue")}>
        <Kicker accent="canne">Le catalogue · Tout ce que le journal contient</Kicker>
        <TitreRubrique accent="canne">
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
              <Link prefetch={false}
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
          <Link prefetch={false} href="/tarifs" className="font-black text-cyan-800 underline underline-offset-2">
            voir les offres
          </Link>
          .
        </p>
      </section>

      {/* ══ LE COURRIER DES LECTEURS — les avis, verbatim (fautes comprises) ══ */}
      <section id="courrier" className="mx-auto mt-10 max-w-6xl scroll-mt-24" style={ordre("courrier")}>
        <Kicker>Se retrouver · Le courrier des lecteurs</Kicker>
        <TitreRubrique accent="boucan">Ce que les élèves nous écrivent</TitreRubrique>
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
          <Link prefetch={false}
            href="/votre-avis"
            className="inline-flex items-center gap-2 rounded-sm bg-[#1d1c16] px-4 py-2 text-sm font-black text-[#d8e9ee] transition hover:bg-cyan-800"
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
      <section id="honneur" className="mx-auto mt-10 max-w-6xl scroll-mt-24" style={ordre("honneur")}>
        <Kicker accent="safran">Se retrouver · Ils font le journal</Kicker>
        <TitreRubrique accent="safran">À l&apos;honneur cette semaine</TitreRubrique>
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
            <Link prefetch={false} href="/remerciements" className="font-black text-cyan-800 underline underline-offset-2">
              La page des remerciements →
            </Link>{" "}
            <span className="text-[#1d1c16]/30">·</span>{" "}
            <Link prefetch={false} href="/besoin-de-vous" className="font-black text-cyan-800 underline underline-offset-2">
              EleveAI a besoin de vous →
            </Link>
          </p>
        </div>
      </section>

      {/* ══ LA PAGE DES GRANDS — parents, enseignants, établissements ════════ */}
      <section id="les-grands" className="mx-auto mt-10 max-w-6xl scroll-mt-24" style={ordre("grands")}>
        <Kicker>La page des grands</Kicker>
        <TitreRubrique>Parents, enseignants, établissements</TitreRubrique>
        <div className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-3">
          <Link prefetch={false} href="/parents" className="group border-t border-[#1d1c16]/25 pt-3">
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
          <Link prefetch={false} href="/enseignants" className="group border-t border-[#1d1c16]/25 pt-3">
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
          <Link prefetch={false} href="/espace-ecoles" className="group border-t border-[#1d1c16]/25 pt-3">
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
              <Link prefetch={false}
                href="/fiches-cours/maths"
                className="inline-flex items-center gap-2 rounded-sm bg-[#1d1c16] px-4 py-2 text-sm font-black text-[#d8e9ee] transition hover:bg-cyan-800"
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
        <Link prefetch={false}
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
          <Link prefetch={false}
            href="/tarifs"
            className="mt-3 inline-flex items-center gap-2 rounded-sm bg-[#1d1c16] px-5 py-2.5 text-sm font-black text-[#d8e9ee] transition hover:bg-cyan-800"
          >
            Voir les offres →
          </Link>
        </div>
      </section>

      {/* ══ L'ABONNEMENT — recevez le journal (gratuit, newsletter Resend) ═══ */}
      <div style={ordre("abonnement")}><AbonnementJournal /></div>

      {/* ══ L'OURS — qui fait ce journal (le pied de page du quotidien) ══════ */}
      <footer className="mx-auto mt-10 max-w-6xl border-t-4 border-double border-[#1d1c16] pt-4 text-center" style={ordre("ours")}>
        <p className="font-serif text-sm font-black">Le Journal d&apos;EleveAI</p>
        <p className="mx-auto mt-1 max-w-3xl text-xs font-medium leading-6 text-[#1d1c16]/70">
          Écrit à La Réunion. Rédaction : les élèves et les profs. Mascotte :
          Ti Margo, margouillat 🦎. Fondé par Frédéric Lacoste, professeur de
          mathématiques. Sans publicité —{" "}
          <Link prefetch={false} href="/politique-confidentialite" className="font-black underline underline-offset-2">
            données protégées
          </Link>
          {" · "}
          <Link prefetch={false} href="/pourquoi-eleveai" className="font-black underline underline-offset-2">
            pourquoi EleveAI
          </Link>
          {" · "}
          <Link prefetch={false} href="/contact" className="font-black underline underline-offset-2">
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
