// LES DONNÉES DU JOURNAL, CALCULÉES CÔTÉ SERVEUR — partagées par /accueil (le
// Quotidien, depuis le 18/10/2026) et par la maquette /accueil-journal.
// ⛔ Serveur seulement : lib/videos/r2 lit une table de ~160 Ko.
//
// ⭐ 19/10/2026, Frédéric : « assure-toi que chaque jour la page d'accueil change
// les articles et infos comme un journal quotidien », puis « les gens doivent
// revenir chaque jour ». D'où :
//   - la Une est tirée de TOUT le catalogue publié (~100 paysages : plus de trois
//     mois sans revoir la même), et non plus de 6 Unes écrites à la main ;
//   - les shorts avancent de 9 par jour sur ~120 (deux semaines sans redite) ;
//   - Maths Réel tourne, le défi est GÉNÉRÉ (lib/accueil/defis.ts), le chiffre
//     (26) et le métier (16) ont des banques plus longues ;
//   - et trois rendez-vous pour revenir : « Demain dans le journal », la réponse
//     du défi d'hier, la série de jours (côté navigateur, JournalClient).
// ⭐ L'ORDRE DE TIRAGE EST STABLE : chaque vidéo a sa place fixe (un hachage de
// son id). Une vidéo publiée demain s'insère sans bouleverser les autres.
import { toutesLesVideos, urlR2, type VideoR2 } from "@/lib/videos/r2";
import { CHIFFRES, EDITION, JOUR_DU_NUMERO_1, METIERS, UNES, jourParis } from "@/lib/accueil/journal";
import { depuisEcrit, genererDefi, themeDe } from "@/lib/accueil/defis";
import type { VideoJournal } from "./JournalClient";

/** Hachage FNV-1a : une place stable par id. */
function hache(texte: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < texte.length; i++) {
    h ^= texte.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  // Brassage final (murmur3) : sans lui, des ids qui ne diffèrent que par la
  // fin (« …-short-relation », « …-short-tableau ») restaient voisins dans le
  // tirage — la simulation du 19/10 ouvrait deux dimanches sur la même série.
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

const melange = (liste: VideoR2[], sel: string) =>
  [...liste].sort((a, b) => hache(sel + a.id) - hache(sel + b.id));

/** Ce qui n'a pas sa place en Une : l'annonce, et l'atelier (il a sa rubrique). */
const PAS_EN_UNE = new Set(["annonce-probabilites", "bases-atelier-video"]);
const REEL = /974|diagonale|grand raid|réunion|maïdo|saint-gilles|maths réel|sondages|instituts/i;

const publiees = toutesLesVideos().filter((v) => v.youtube && v.vignette);
const PAYSAGES = melange(publiees.filter((v) => !v.short && !PAS_EN_UNE.has(v.id)), "une");
const SHORTS = melange(publiees.filter((v) => v.short), "short");
const REELS = melange(PAYSAGES.filter((v) => REEL.test(v.id) || REEL.test(v.titre)), "reel");
const UTILE = new Map([...UNES, ...EDITION].map((u) => [u.paysage, u]));
const PAR_ID = new Map(publiees.map((v) => [v.id, v]));
const iso = (jour: number) => new Date(jour * 86400000).toISOString().slice(0, 10);

function video(v: VideoR2 | undefined): VideoJournal | null {
  if (!v || !v.vignette) return null;
  return { id: v.id, titre: v.titre, short: v.short, vignette: urlR2(v.vignette) };
}

/** La classe affichée en tête de la Une, lue dans le chemin ou le titre. */
function classeDe(v: VideoR2): string {
  const dossier = v.fichier.split("/")[0];
  const parDossier: Record<string, string> = {
    "3e": "3e", "4e": "4e", "5e": "5e", "6e": "6e", seconde: "2de", premiere: "1re",
    terminale: "Terminale", "974": "Maths Réel", "maths-en-vrai": "Maths Réel", bases: "Les bases",
  };
  if (parDossier[dossier]) return parDossier[dossier];
  const t = v.titre;
  if (/1re spé/i.test(t)) return "1re spé";
  if (/seconde|2de/i.test(t)) return "2de";
  const m = t.match(/Maths (6e|5e|4e|3e)/);
  if (m) return m[1];
  if (/974/.test(t)) return "Maths Réel";
  return "Maths";
}

/** Une fenêtre de `n` éléments qui avance de `pas` chaque jour, en boucle. */
function fenetre<T>(liste: T[], jour: number, n: number, pas = n): T[] {
  if (liste.length === 0) return [];
  const debut = (jour * pas) % liste.length;
  return Array.from({ length: Math.min(n, liste.length) }, (_, i) => liste[(debut + i) % liste.length]);
}

function uneDuJour(jour: number) {
  // 1. L'édition de la semaine, si ce jour a sa Une écrite (et publiée).
  // ⛔ Jamais un SHORT en Une (20/10/2026 : un short vertical y laissait une
  // colonne étroite à bandes noires) : une entrée datée qui en désignerait un
  // est ignorée, et le tirage prend le relais.
  const datee = EDITION.find(
    (u) => u.date === iso(jour) && PAR_ID.has(u.paysage) && !PAR_ID.get(u.paysage)!.short,
  );
  // 2. Sinon le tirage dans tout le catalogue.
  const p = datee ? PAR_ID.get(datee.paysage)! : PAYSAGES[jour % PAYSAGES.length];
  const ecrite = datee ?? UTILE.get(p.id);
  const short =
    (ecrite?.short && publiees.find((v) => v.id === ecrite.short)) ||
    SHORTS.find((s) => s.id.startsWith(`${p.id}-short`));
  return {
    p,
    short,
    classe: ecrite?.classe ?? classeDe(p),
    utile: ecrite?.utile ?? null,
    ecrite,
    theme: themeDe(`${p.titre} ${p.id}`),
  };
}

/* ⭐ LA VIDÉO, LE DÉFI ET LE CHIFFRE DU JOUR SONT LIÉS (Frédéric, 19/10).
   Le défi : celui écrit pour la Une, sinon un défi généré sur son thème,
   sinon (vidéo sans thème reconnu) la rotation des 14 types. */
function defiDuJour(jour: number) {
  const u = uneDuJour(jour);
  return u.ecrite?.defi ? depuisEcrit(u.ecrite.defi, jour) : genererDefi(jour, u.theme);
}

/* Le chiffre : celui écrit pour la Une, sinon un chiffre de la banque sur le
   thème de la vidéo, sinon la rotation. */
function chiffreDuJour(jour: number) {
  const u = uneDuJour(jour);
  if (u.ecrite?.chiffre) return u.ecrite.chiffre;
  const memeTheme = u.theme ? CHIFFRES.filter((c) => c.theme === u.theme) : [];
  if (memeTheme.length) return memeTheme[jour % memeTheme.length];
  return CHIFFRES[jour % CHIFFRES.length];
}

/** Le contenu du journal d'un jour donné (défaut : aujourd'hui, à Paris). */
export function donneesDuJournal(jour = jourParis()) {
  const une = uneDuJour(jour);
  const demain = uneDuJour(jour + 1);
  const date = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(jour * 86400000));
  return {
    date: date.charAt(0).toUpperCase() + date.slice(1),
    numero: jour - JOUR_DU_NUMERO_1 + 1,
    jour,
    une: {
      paysage: video(une.p),
      short: video(une.short),
      classe: une.classe,
      utile: une.utile,
    },
    demain: { titre: demain.p.titre, classe: demain.classe },
    chiffre: chiffreDuJour(jour),
    // Le défi d'aujourd'hui, son thème (pour « Un autre défi », qui reste sur
    // la notion de la Une), et celui d'HIER pour la réponse des rendez-vous.
    defi: defiDuJour(jour),
    theme: une.theme,
    hier: (() => {
      const d = defiDuJour(jour - 1);
      return { question: d.question, reponse: d.choix[d.bonne] };
    })(),
    metier: METIERS[jour % METIERS.length],
    // ⚠️ La fenêtre se prend sur la liste ENTIÈRE, et le short de la Une n'est
    // retiré qu'après (il en reste alors 8) : retirer d'abord changeait la
    // longueur de la liste d'un jour à l'autre, et deux jours pouvaient
    // retomber sur le même départ.
    shorts: fenetre(SHORTS, jour, 9).filter((s) => s.id !== une.short?.id && s.id !== une.p.id)
      .map(video)
      .filter((x): x is VideoJournal => x !== null),
    // Deux par jour, et les deux suivants le lendemain : peu de vidéos « réel »
    // (une demi-douzaine), on les fait défiler plutôt que de répéter les mêmes.
    reel: fenetre(REELS, jour, 3, 2)
      .filter((r) => r.id !== une.p.id)
      .slice(0, 2)
      .map(video)
      .filter((x): x is VideoJournal => x !== null),
  };
}
