// Le registre des FICHES D'ÉCRITURE — les feuilles à repasser, crayon en main.
//
// ── POURQUOI CE HUB EXISTE (03/09/2026) ──────────────────────────────────────
// ⭐⭐ Frédéric, après avoir vu les vidéos de lettres : « c'est super mais je
// viens de me rendre compte qu'il faut des fiches d'écriture ». Une vidéo montre
// le geste, elle ne le fait pas faire. L'enfant apprend à écrire avec un crayon
// dans la main.
//
// ⚠️ NE PAS CONFONDRE AVEC LES « FICHES D'ACTIVITÉS » (`lib/fiches/registre.ts`,
// route `/fiches-cours/...`) : celles-là sont un COURS plus des exercices. Ici,
// c'est une feuille de réglure où l'on repasse une lettre. Deux objets, deux
// registres, deux routes.
//
// ── CE QUI NOUS DISTINGUE ────────────────────────────────────────────────────
// ⭐ Cinq sites vivent déjà de « fiche écriture CP à imprimer » (professeur-o,
// ecriture-cp, bienenseigner, reussiralecole, apprendreavecbobo) — vérifié le
// 03/09. Tous donnent un PDF ; AUCUN ne montre le geste. Notre page de fiche
// porte la VIDÉO (droitier ET gaucher) à côté du PDF : c'est le seul endroit du
// web où l'on voit le crayon tracer la lettre qu'on va repasser.
//
// ── L'AGENCEMENT ─────────────────────────────────────────────────────────────
// ⭐ RANGÉ PAR OBJET, PAS PAR MATIÈRE. Un parent tape « fiche écriture chiffre
// 3 », jamais « fiche maths écriture ». La matière reste une étiquette.
//
//   /fiches-ecriture                 le hub, les six familles
//   /fiches-ecriture/lettres         les 26, en grille
//   /fiches-ecriture/lettres/a       la fiche + la vidéo + le coach
//
// ⛔ Le PDF et la vidéo viennent des MÊMES courbes de Bézier
// (`manim/scripts/cp/lettre_<x>.py` → `manim/miniature.py` → la fiche). Une
// feuille qui montrerait un « a » un peu différent du film apprendrait à
// l'enfant que le modèle change selon le support.

export type FamilleEcriture = {
  slug: string;
  titre: string;
  promesse: string;
  /** La matière, en étiquette — jamais dans le chemin. */
  matiere: "francais" | "maths";
  classes: string[];
  /** Faux tant que la famille n'a aucune fiche : elle ne s'affiche pas. */
  ouverte: boolean;
};

export type FicheEcriture = {
  famille: string;
  /** Ce qui s'écrit : « a », « 3 », « alpha »… Sert d'URL. */
  slug: string;
  titre: string;
  /** Le PDF, sous public/. Nom pensé pour la requête tapée. */
  pdf: string;
  /** L'aperçu PNG de la FEUILLE, même base — le rendu réduit du PDF. */
  apercu: string;
  /**
   * La vignette de la VIDÉO (1280×720, style cahier), copiée dans public/ par
   * `manim/fiche_ecriture.py`.
   * ⛔ C'est elle qui s'affiche sur le hub, PAS une iframe : une iframe YouTube
   * tire ~1 Mo de script avant même le clic, et le hub doit tenir à mille
   * fiches. Le lecteur ne se charge que sur la page de la fiche.
   */
  vignette?: string;
  /** Les identifiants YouTube, quand la vidéo est en ligne. */
  video?: { droitier?: string; gaucher?: string };
};

// ⭐ Six familles, dont deux seulement sont ouvertes aujourd'hui. Les autres
// sont déclarées pour que l'agencement soit décidé UNE fois : ajouter les
// chiffres ne devra pas rouvrir la question du rangement.
export const FAMILLES: FamilleEcriture[] = [
  {
    slug: "lettres",
    titre: "Les lettres en cursive",
    promesse: "Le geste, le sens, le point de départ — puis on repasse.",
    matiere: "francais",
    classes: ["cp", "ce1"],
    ouverte: true,
  },
  {
    slug: "majuscules",
    titre: "Les majuscules cursives",
    promesse: "Les vingt-six capitales, une par une.",
    matiere: "francais",
    classes: ["cp", "ce1", "ce2"],
    ouverte: false,
  },
  {
    slug: "chiffres",
    titre: "Les chiffres",
    promesse: "De 0 à 9 : chaque chiffre a son chemin.",
    // ⚠️ `matiere: "maths"` désigne le RAYON du site, pas la nature du geste.
    // Tracer un chiffre est de l'écriture — point de départ, sens, nombre de
    // temps, lever de crayon — et les feuilles portent d'ailleurs le bandeau
    // « FRANÇAIS CP · ÉCRITURE ». C'est la même série que les lettres.
    matiere: "maths",
    classes: ["cp", "ce1"],
    ouverte: true,
  },
  {
    slug: "nombres",
    titre: "Les nombres en lettres",
    promesse: "Un, deux, trois… écrire ce qu'on compte.",
    matiere: "francais",
    classes: ["cp", "ce1"],
    ouverte: false,
  },
  {
    slug: "mots",
    titre: "Les mots fréquents",
    promesse: "Le, la, est, un — ceux qu'on écrit tous les jours.",
    matiere: "francais",
    classes: ["cp"],
    ouverte: false,
  },
  {
    // ⭐⭐ LA FAMILLE QUI DONNE ENVIE. Frédéric, 03/09 : « je me rappelle avoir
    // fait une leçon sur l'écriture grecque et tous mes élèves avaient adoré ».
    // Ce n'est pas une récréation : écrire un autre alphabet fait voir que les
    // lettres sont des DESSINS qui obéissent à des règles. Pour l'enfant qui
    // peine, c'est libérateur — il ne rate pas quelque chose d'évident, il
    // apprend un système. Et c'est la fiche que les parents se partagent.
    slug: "ailleurs",
    titre: "Écrire ailleurs",
    promesse: "Le grec, les runes : d'autres façons de tracer.",
    matiere: "francais",
    classes: ["cp", "ce1", "ce2", "cm1", "cm2", "6e"],
    ouverte: false,
  },
];

// ⚠️ L'ORDRE EST CELUI DE LA PRODUCTION, PAS L'ALPHABET. On a fait les voyelles
// dont la lettre et le son coïncident (a, i, o), puis le « u », qui a demandé un
// autre format : en français, `u` initial ne donne que des mots qu'un enfant de
// six ans n'a jamais entendus (urne, ustensile). Sa vidéo dit donc « u comme
// DANS lune » — et c'est la formule qu'il faudra pour le « e » et les consonnes.
const LETTRES_FAITES = ["a", "e", "i", "o", "u", "y"];

// ⚠️ LES IDENTIFIANTS YOUTUBE SE COLLENT ICI, et nulle part ailleurs.
// Une lettre sans identifiant affiche quand même sa fiche et sa vignette : la
// feuille existe avant que la vidéo soit en ligne, et la page ne doit pas
// attendre après elle.
const VIDEOS: Record<string, { droitier?: string; gaucher?: string }> = {
  // a: { droitier: "xxxxxxxxxxx", gaucher: "xxxxxxxxxxx" },
};

// ⚠️ MÊME RÈGLE QUE POUR LES LETTRES : on ne liste que ce qui EXISTE sur le
// disque. Déclarer 0-9 alors que seules six feuilles sont faites donnerait
// quatre pages qui promettent un PDF absent — et le sitemap les soumettrait.
const CHIFFRES_FAITS = ["0", "1", "2", "3", "4", "5"];

export const FICHES: FicheEcriture[] = [
  ...LETTRES_FAITES.map((x) => ({
    famille: "lettres",
    slug: x,
    titre: `La lettre ${x} en cursive`,
    pdf: `/fiches-ecriture/lettres/ecriture-cursive-lettre-${x}-cp-a-imprimer.pdf`,
    apercu: `/fiches-ecriture/lettres/ecriture-cursive-lettre-${x}-cp-a-imprimer.png`,
    vignette: `/fiches-ecriture/lettres/vignette-lettre-${x}.png`,
    video: VIDEOS[x],
  })),
  ...CHIFFRES_FAITS.map((x) => ({
    famille: "chiffres",
    slug: x,
    titre: `Le chiffre ${x} à écrire`,
    pdf: `/fiches-ecriture/chiffres/ecriture-chiffre-${x}-cp-a-imprimer.pdf`,
    apercu: `/fiches-ecriture/chiffres/ecriture-chiffre-${x}-cp-a-imprimer.png`,
    vignette: `/fiches-ecriture/chiffres/vignette-chiffre-${x}.png`,
    video: VIDEOS[`chiffre-${x}`],
  })),
];

export function famille(slug: string) {
  return FAMILLES.find((f) => f.slug === slug);
}

export function fichesDe(slugFamille: string) {
  return FICHES.filter((f) => f.famille === slugFamille);
}

export function fiche(slugFamille: string, slug: string) {
  return FICHES.find((f) => f.famille === slugFamille && f.slug === slug);
}
