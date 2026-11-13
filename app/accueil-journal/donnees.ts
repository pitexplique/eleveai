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
import { ARTICLES, CHIFFRES_PETITS, MISSIONS, articlesDuJour, chiffresDesPetits, missionDuJour } from "@/lib/accueil/articles";
import { DEFIS_DU_NIVEAU, NIVEAUX, type NiveauJournal } from "@/lib/accueil/niveaux";
import { toutesLesVideos, urlR2, type VideoR2 } from "@/lib/videos/r2";
import { CHIFFRES, EDITION, JOUR_DU_NUMERO_1, METIERS, UNES, jourParis } from "@/lib/accueil/journal";
import { depuisEcrit, genererDefi, themeDe, type DefiGenere } from "@/lib/accueil/defis";
import type { ChiffreDuJour } from "@/lib/accueil/journal";
import type { Mission } from "@/lib/accueil/articles";
import type { VideoJournal } from "./JournalClient";
import { NOTION_COACH_MATHS } from "@/lib/matrice/coach";
import { NOTIONS_COACH } from "@/lib/matrice/notions.generated";
import { displayParamForClasse } from "@/lib/tutor-v4/displayMode";

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
/* ⛔ 20/10/2026 : une vidéo SANS MINIATURE (poster) a une vignette tirée de sa
   première image — souvent un écran noir. Sur l'accueil (Une tirée, bande de la
   chaîne, Maths Réel), on ne montre que des vidéos qui ont leur miniature. */
const avecMiniature = (v: VideoR2) => Boolean(v.poster);
const PAYSAGES = melange(publiees.filter((v) => !v.short && !PAS_EN_UNE.has(v.id) && avecMiniature(v)), "une");
/* ⭐ LA VIDÉOTHÈQUE (20/10/2026) : Frédéric veut « en annonce la page vidéo,
   style YouTube » sur l'accueil. 4 paysages par jour, dans un AUTRE ordre que la
   Une (sinon la bande montrerait les Unes des jours suivants), et le nombre de
   vidéos de la galerie /video (tout R2, publiées ou non sur YouTube). */
const VIDEOTHEQUE = melange(PAYSAGES, "videotheque");
const TOTAL_GALERIE = toutesLesVideos().filter(
  (v) => v.vignette && !v.fichier.startsWith("atelier-video-essais"),
).length;
const SHORTS = melange(publiees.filter((v) => v.short && avecMiniature(v)), "short");
const REELS = melange(PAYSAGES.filter((v) => REEL.test(v.id) || REEL.test(v.titre)), "reel");
const UTILE = new Map([...UNES, ...EDITION].map((u) => [u.paysage, u]));
const PAR_ID = new Map(publiees.map((v) => [v.id, v]));
const iso = (jour: number) => new Date(jour * 86400000).toISOString().slice(0, 10);
const jourDe = (date: string) => Math.round(Date.parse(`${date}T00:00:00Z`) / 86400000);

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
  // Le tirage écarte les Unes de l'édition datées à moins de 60 jours : une
  // vidéo vue lundi en Une ne revient pas trois semaines plus tard (simulation
  // du 20/10).
  const recentes = new Set(
    EDITION.filter((u) => u.date && Math.abs(jourDe(u.date) - jour) <= 60).map((u) => u.paysage),
  );
  const pool = PAYSAGES.filter((v) => !recentes.has(v.id));
  const p = datee ? PAR_ID.get(datee.paysage)! : pool[jour % pool.length];
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

/* ═══ LES ÉDITIONS PAR NIVEAU (12/11/2026) ══════════════════════════════════
   Frédéric : « il faut que les élèves choisissent leurs niveaux, les articles
   doivent correspondre à leurs niveaux », puis « une vidéo dessin animé ou un
   short sur un défi en fonction des classes », « 3 shorts, plus simple ».
   Le serveur prépare les SIX éditions du jour ; le navigateur montre celle que
   l'élève a choisie (JournalClient). */

/** Les dossiers de vidéos de chaque édition (le 1er segment de `fichier`). */
const DOSSIERS: Record<NiveauJournal, string[]> = {
  "cp-ce2": ["cp"],
  cm: ["cm1", "cm2"],
  "6e-5e": ["6e", "5e"],
  "4e-3e": ["4e", "3e"],
  lycee: ["seconde", "premiere", "premiere-commun", "premiere-spe", "terminale"],
  adultes: ["actu", "bases", "maths-en-vrai"],
};
/** CP-CE2 n'a que trois shorts de maths : on y ajoute les billes de 3 × 4 = 12. */
const EN_PLUS: Partial<Record<NiveauJournal, string[]>> = {
  "cp-ce2": ["bases-multiplication-division-short-billes"],
};
/** ⛔ Le français est en pause (10/11) : pas de shorts d'écriture des lettres. */
const PAS_DANS_LE_JOURNAL = /cursive|writing|la lettre|english/i;
/** Le même short existe parfois en CM1 et en CM2 : un seul. */
const sansClasse = (t: string) => t.replace(/[—-]\s*(CM1|CM2|6e|5e|4e|3e).*$/i, "").replace(/#\w+/g, "").trim();

/* Les shorts AVEC miniature, sur R2 (publiés ou non sur YouTube : la page
   /video/<id> les lit sur R2, règle « élèves = vidéos R2 »). */
const SHORTS_R2 = toutesLesVideos().filter((v) => v.short && v.vignette && v.poster && !PAS_DANS_LE_JOURNAL.test(v.titre));
const SHORTS_DU_NIVEAU = Object.fromEntries(
  NIVEAUX.map(({ id }) => {
    const vus = new Set<string>();
    const liste = melange(
      SHORTS_R2.filter((v) => DOSSIERS[id].includes(v.fichier.split("/")[0]) || EN_PLUS[id]?.includes(v.id)),
      `short-${id}`,
    ).filter((v) => {
      const t = sansClasse(v.titre);
      if (vus.has(t)) return false;
      vus.add(t);
      return true;
    });
    return [id, liste];
  }),
) as Record<NiveauJournal, VideoR2[]>;

/** Trois shorts par jour pour une édition : un DÉFI d'abord (id « …-defi-… »
 *  ou titre en « Défi »), puis deux autres. */
function shortsDuNiveau(jour: number, niveau: NiveauJournal): VideoJournal[] {
  const liste = SHORTS_DU_NIVEAU[niveau];
  const defis = liste.filter((v) => /defi/i.test(v.id) || /^défi/i.test(v.titre));
  const premier = defis.length ? defis[((jour % defis.length) + defis.length) % defis.length] : null;
  const reste = liste.filter((v) => v !== premier);
  return [...(premier ? [premier] : []), ...fenetre(reste, jour, premier ? 2 : 3)]
    .map(video)
    .filter((x): x is VideoJournal => x !== null);
}

/* ═══ LE LIEN VERS LE COACH (13/11/2026) ════════════════════════════════════
   « Chaque article renvoie vers la micro du coach qui correspond (la pente
   vers les pourcentages, le bassin vers les volumes) : c'est ce lien qui en
   fait un complément du suivi plutôt qu'un site à côté. » Pour chaque article
   et chaque profil : la série du coach où s'entraîner, dans une classe du
   profil. Calculé ICI (serveur) : la table des libellés pèse 130 Ko. */
const CLASSES_DU_NIVEAU: Record<NiveauJournal, string[]> = {
  "cp-ce2": ["ce2", "ce1", "cp"],
  cm: ["cm2", "cm1"],
  "6e-5e": ["6e", "5e"],
  "4e-3e": ["4e", "3e"],
  lycee: ["seconde", "premiere", "premiere-spe"],
  adultes: ["4e", "3e", "seconde", "6e", "5e"],
};
const NOM_CLASSE: Record<string, string> = {
  cp: "CP", ce1: "CE1", ce2: "CE2", cm1: "CM1", cm2: "CM2", "6e": "6e", "5e": "5e", "4e": "4e", "3e": "3e",
  seconde: "2de", premiere: "1re", "premiere-spe": "1re spé",
};
export type Entrainement = { href: string; label: string; classe: string };

function entrainement(cles: string[], niveau: NiveauJournal): Entrainement | null {
  for (const brut of cles) {
    const [cle, imposee] = brut.split("@");
    for (const classe of imposee ? [imposee] : CLASSES_DU_NIVEAU[niveau]) {
      const notion = NOTION_COACH_MATHS[cle]?.[classe];
      const label = notion && NOTIONS_COACH.maths?.[classe]?.find((n) => n.id === notion)?.label;
      // ⛔ Pas de lien vers une série que le coach ne connaît pas.
      if (!notion || !label) continue;
      return {
        href: `/coach/serie?classe=${classe}&matiere=maths&notion=${notion}&${displayParamForClasse(classe)}`,
        label,
        classe: NOM_CLASSE[classe] ?? classe,
      };
    }
  }
  return null;
}

/** article → profil → la série du coach (absent : pas de série à ce niveau). */
const ENTRAINEMENTS: Record<string, Partial<Record<NiveauJournal, Entrainement>>> = Object.fromEntries(
  ARTICLES.map((a) => [
    a.id,
    Object.fromEntries(
      a.niveaux.map((n) => [n, entrainement(a.coach, n)] as const).filter(([, e]) => e !== null),
    ),
  ]),
);

/* ═══ LES VIDÉOS DE CHAQUE ARTICLE (13/11/2026) ═════════════════════════════
   Frédéric : « pas assez de liens vers des vidéos paysage ou shorts, trop
   d'écrit », puis « les élèves y ont été ce matin et regardent chez eux ».
   Chaque vidéo de lib/videos/videos-r2.json porte la série du coach de sa
   notion (`coach`) : l'article, qui connaît ses notions (`coach`), y trouve
   SA paysage et SON short, dans la classe du profil. Rien à écrire à la main :
   une vidéo rendue et mise dans la table arrive d'elle-même dans le journal.
   ⭐ Le choix tourne CHAQUE SEMAINE parmi les vidéos de la notion (« on le
   mettra à jour chaque semaine »). */
export type VideosArticle = { paysage?: VideoJournal; short?: VideoJournal };

const VIDEOS_PAR_NOTION = (() => {
  const m = new Map<string, { paysages: VideoR2[]; shorts: VideoR2[] }>();
  for (const v of toutesLesVideos()) {
    if (!v.coach || !v.poster || !v.vignette || PAS_DANS_LE_JOURNAL.test(v.titre)) continue;
    const q = new URLSearchParams(v.coach.split("?")[1]);
    const cle = `${q.get("classe")}/${q.get("notion")}`;
    const l = m.get(cle) ?? { paysages: [], shorts: [] };
    (v.short ? l.shorts : l.paysages).push(v);
    m.set(cle, l);
  }
  // Les vidéos de TOUTE la notion (sans micro) et publiées d'abord, puis un
  // ordre stable : la rotation de la semaine part de la meilleure.
  const rang = (v: VideoR2) => (v.coach!.includes("microId=") ? 2 : 0) + (v.youtube ? 0 : 1);
  for (const l of m.values()) {
    for (const liste of [l.paysages, l.shorts]) liste.sort((a, b) => rang(a) - rang(b) || hache(a.id) - hache(b.id));
  }
  return m;
})();

/** Les clés « classe/notion » d'un article pour un profil, dans l'ordre du coach. */
function notionsDe(cles: string[], niveau: NiveauJournal): string[] {
  const out: string[] = [];
  for (const brut of cles) {
    const [cle, imposee] = brut.split("@");
    for (const classe of imposee ? [imposee] : CLASSES_DU_NIVEAU[niveau]) {
      const notion = NOTION_COACH_MATHS[cle]?.[classe];
      if (notion) out.push(`${classe}/${notion}`);
    }
  }
  return out;
}

function videosArticle(a: (typeof ARTICLES)[number], niveau: NiveauJournal, semaine: number): VideosArticle {
  const notions = notionsDe(a.coach, niveau);
  const tour = <T,>(l: T[]) => l[((semaine % l.length) + l.length) % l.length];
  // La paysage : la première notion qui en a une ; le short, de préférence le
  // jumeau de la paysage (son id commence par celui de la paysage), sinon un
  // short de la même notion, sinon d'une autre notion de l'article.
  let paysage: VideoR2 | undefined;
  let short: VideoR2 | undefined;
  for (const n of notions) {
    const l = VIDEOS_PAR_NOTION.get(n);
    if (!l) continue;
    if (!paysage && l.paysages.length) {
      paysage = tour(l.paysages);
      short = l.shorts.find((s) => s.id.startsWith(`${paysage!.id}-short`)) ?? (l.shorts.length ? tour(l.shorts) : undefined);
    }
    if (!short && l.shorts.length) short = tour(l.shorts);
    if (paysage && short) break;
  }
  // Aucune vidéo de la notion à ce niveau (le « calcul » de CM, 13/11) : un
  // short de l'édition, différent d'un article à l'autre.
  if (!paysage && !short) {
    const l = SHORTS_DU_NIVEAU[niveau];
    if (l.length) short = l[(hache(a.id) + semaine) % l.length];
  }
  return { paysage: video(paysage) ?? undefined, short: video(short) ?? undefined };
}

/** article → profil → ses vidéos de la semaine. */
function videosDesArticles(jour: number): Record<string, Partial<Record<NiveauJournal, VideosArticle>>> {
  const semaine = Math.floor(jour / 7);
  return Object.fromEntries(
    ARTICLES.map((a) => [
      a.id,
      Object.fromEntries(
        a.niveaux
          .map((n) => [n, videosArticle(a, n, semaine)] as const)
          .filter(([, v]) => v.paysage || v.short),
      ),
    ]),
  );
}

export type EditionDuNiveau = {
  une: string;
  autres: string[];
  chiffres: ChiffreDuJour[];
  /** La rangée « Les chiffres clés » de la galerie : ceux du jour, puis d'autres. */
  chiffresRangee: ChiffreDuJour[];
  defi: DefiGenere;
  hier: { question: string; reponse: string };
  mission: Mission;
  shorts: VideoJournal[];
};

/* ═══ L'ÉDITION « ÎLE DE LA RÉUNION » (12/11/2026) ══════════════════════════
   Frédéric : « journal scientifique de l'île de La Réunion », « tu me crées une
   version île de La Réunion ». Mêmes niveaux, mêmes défis et missions ; les
   articles, les chiffres clés et les shorts sont ceux de l'île. */
const REUNION = /Réunion|réunionnais|974|Piton|Maïdo|Foc-Foc|Diagonale|lagon|baleine|Cilaos|Mafate|Salazie|Saint-|Grand Raid/i;
const CHIFFRES_REUNION: ChiffreDuJour[] = [
  ...CHIFFRES.filter((c) => REUNION.test(c.texte)),
  { chiffre: "2 632 m", texte: "L'altitude du Piton de la Fournaise, l'un des volcans les plus actifs du monde." },
  { chiffre: "2 512 km²", texte: "La surface de l'île. Le cœur du Parc national en couvre environ 42 %." },
  { chiffre: "3 cirques", texte: "Cilaos, Mafate et Salazie, creusés par les pluies dans l'ancien volcan du Piton des Neiges." },
  { chiffre: "6 mois", texte: "La saison des cyclones, du 1er novembre au 30 avril, pendant l'été austral." },
];
const SHORTS_REUNION = melange(
  SHORTS_R2.filter((v) => v.fichier.startsWith("974/") || REUNION.test(v.titre)),
  "short-reunion",
);

function chiffresReunion(jour: number): ChiffreDuJour[] {
  const l = CHIFFRES_REUNION;
  const j = ((jour % l.length) + l.length) % l.length;
  return [0, 3, 5].map((k) => l[(j + k) % l.length]);
}

/** Les shorts de l'île d'abord, complétés par ceux du niveau. */
function shortsReunion(jour: number, niveau: NiveauJournal): VideoJournal[] {
  const ile = fenetre(SHORTS_REUNION, jour, 2).map(video).filter((x): x is VideoJournal => x !== null);
  const ids = new Set(ile.map((v) => v.id));
  return [...ile, ...shortsDuNiveau(jour, niveau).filter((v) => !ids.has(v.id))].slice(0, 3);
}

function editionDuNiveau(jour: number, niveau: NiveauJournal, reunion = false): EditionDuNiveau {
  const art = articlesDuJour(jour, niveau, reunion);
  const parmi = DEFIS_DU_NIVEAU[niveau];
  // Le défi du jour : celui des adultes reste lié à la vidéo de la Une ; les
  // autres éditions restent sur LEURS générateurs (le thème est gardé s'il en fait partie).
  const defiDe = (j: number) => {
    const u = uneDuJour(j);
    if (!parmi) return u.ecrite?.defi ? depuisEcrit(u.ecrite.defi, j) : genererDefi(j, u.theme);
    return genererDefi(j, u.theme, parmi);
  };
  const d = defiDe(jour);
  const h = defiDe(jour - 1);
  let chiffres: ChiffreDuJour[];
  if (reunion) chiffres = chiffresReunion(jour);
  else if (niveau === "cp-ce2" || niveau === "cm") chiffres = chiffresDesPetits(jour, niveau);
  else {
    const c = chiffreDuJour(jour);
    chiffres = [c, ...chiffresEnPlus(jour, c)];
  }
  // La rangée : les 3 du jour d'abord, puis la suite de la banque de l'édition.
  const banque = reunion
    ? CHIFFRES_REUNION
    : niveau === "cp-ce2" || niveau === "cm"
      ? CHIFFRES_PETITS[niveau]
      : CHIFFRES.filter((c) => !REUNION.test(c.texte));
  const dejaLa = new Set(chiffres.map((c) => c.chiffre));
  const chiffresRangee = [...chiffres, ...fenetre(banque, jour, banque.length).filter((c) => !dejaLa.has(c.chiffre))].slice(0, 9);
  return {
    une: art.une.id,
    autres: art.autres.map((a) => a.id),
    chiffres,
    chiffresRangee,
    defi: d,
    hier: { question: h.question, reponse: h.choix[h.bonne] },
    mission: missionDuJour(jour, niveau, reunion),
    shorts: reunion ? shortsReunion(jour, niveau) : shortsDuNiveau(jour, niveau),
  };
}

/** Les deux chiffres clés en plus (10/11/2026) : pas de 7 et 13, jamais le même
 *  que celui du jour. ⛔ La Réunion ≈ 4 % des contextes : on l'écarte ici. */
function chiffresEnPlus(jour: number, duJour: ChiffreDuJour): ChiffreDuJour[] {
  const monde = CHIFFRES.filter(
    (c) => !/Réunion|Piton|Maïdo|Foc-Foc|Diagonale|lagon|baleine/i.test(c.texte) && c.chiffre !== duJour.chiffre,
  );
  return [3, 8].map((k) => monde[(jour * 2 + k) % monde.length]).filter((c, i, l) => l.indexOf(c) === i);
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
    // 10/11/2026 — « les chiffres clés » : celui du jour, et deux autres du
    // catalogue (pas de 7 et 13, jamais le même que celui du jour).
    // ⛔ La Réunion ≈ 4 % des contextes : les deux chiffres en plus l'écartent.
    chiffresCles: chiffresEnPlus(jour, chiffreDuJour(jour)),
    // Le défi d'aujourd'hui, son thème (pour « Un autre défi », qui reste sur
    // la notion de la Une), et celui d'HIER pour la réponse des rendez-vous.
    defi: defiDuJour(jour),
    theme: une.theme,
    hier: (() => {
      const d = defiDuJour(jour - 1);
      return { question: d.question, reponse: d.choix[d.bonne] };
    })(),
    metier: METIERS[jour % METIERS.length],
    // 10/11/2026 : les articles « comprendre le monde » (lib/accueil/articles.ts).
    articles: articlesDuJour(jour),
    // « des défis à faire à l'extérieur », « ou des bonnes actions » (10/11).
    mission: missionDuJour(jour),
    // 12/11/2026 : les six éditions du jour, et les articles qu'elles citent
    // (envoyés une seule fois, par id).
    editions: Object.fromEntries(NIVEAUX.map(({ id }) => [id, editionDuNiveau(jour, id)])) as Record<
      NiveauJournal,
      EditionDuNiveau
    >,
    // L'édition « Île de La Réunion », niveau par niveau.
    editionsReunion: Object.fromEntries(NIVEAUX.map(({ id }) => [id, editionDuNiveau(jour, id, true)])) as Record<
      NiveauJournal,
      EditionDuNiveau
    >,
    // La galerie (12/11/2026, « à la façon Netflix ») : tous les articles et
    // toutes les missions, le navigateur les range par profil ; 8 métiers.
    tousArticles: ARTICLES,
    entrainements: ENTRAINEMENTS,
    videosArticles: videosDesArticles(jour),
    missions: MISSIONS,
    metiers: fenetre(METIERS, jour, 8, 1),
    // ⚠️ La fenêtre se prend sur la liste ENTIÈRE, et le short de la Une n'est
    // retiré qu'après (il en reste alors 8) : retirer d'abord changeait la
    // longueur de la liste d'un jour à l'autre, et deux jours pouvaient
    // retomber sur le même départ.
    shorts: fenetre(SHORTS, jour, 9).filter((s) => s.id !== une.short?.id && s.id !== une.p.id)
      .map(video)
      .filter((x): x is VideoJournal => x !== null),
    // Deux par jour, et les deux suivants le lendemain : peu de vidéos « réel »
    // (une demi-douzaine), on les fait défiler plutôt que de répéter les mêmes.
    videotheque: {
      videos: fenetre(VIDEOTHEQUE, jour, 6, 4)
        .filter((v) => v.id !== une.p.id)
        .slice(0, 4)
        .map((v) => ({ ...video(v)!, classe: classeDe(v) })),
      // « plus de 800 » : arrondi à la centaine, pour ne pas mentir d'un jour à
      // l'autre quand des vidéos arrivent.
      total: Math.floor(TOTAL_GALERIE / 100) * 100,
    },
    reel: fenetre(REELS, jour, 3, 2)
      .filter((r) => r.id !== une.p.id)
      .slice(0, 2)
      .map(video)
      .filter((x): x is VideoJournal => x !== null),
  };
}
