// ─── Fiche de cours : premiers pas en probabilités (6e) ────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (lib/tutor-v4/questionBank/6e/maths/probabilites.bank.ts, notionId
// proba_experience). Réécrite le 30/09/2026 au standard des fiches de 6e
// (étalon : `maths-6e-stat-enquete.tsx`) : phrases courtes, un dessin par bloc,
// Ti Margo. C'est la DÉCOUVERTE : vocabulaire, issues, comparer, l'échelle de
// 0 à 1. Pas de formule favorables ÷ possibles.
//
// Micro-compétences 6/6 — mapping micro → blocs :
//   proba_vocabulaire → propriété 1, usage 1, exemple 3, entraînement 1
//   proba_issue       → définition + figure, propriété 2, méthode 1, exemple 1,
//                       entraînement 2
//   proba_comparer    → propriété 3, méthode 3, exemple 2, entraînement 3
//   proba_estimer     → propriété 4, usage 2, entraînement 4
//   proba_lire        → méthode 2, exemple 1
//   proba_defi        → usage 3, entraînement 5
//
// ⭐ TOUS LES NOMBRES VIENNENT DE LA BANQUE : le dé (pair : 2, 4, 6 ; « plus
// de 4 » : 5 et 6 ; « obtenir 7 », « obtenir 6 », « entre 1 et 6 »), le sac
// 4 rouges / 2 bleues / 1 verte, 7 rouges et 1 bleue, 5 rouges et 2 bleues,
// 3 + 4 + 2 = 9 billes, la probabilité « 1,5 », pair ou impair.
// ⛔ La feuille d'exercices `lib/fiches-exercices/maths-6e-proba-experience.tsx`
// (roue 1-3-5-7-9-11, sac 6 vertes / 3 jaunes / 1 noire, roue B-O-V, « au
// moins 4 », Léo et ses deux couleurs, tombola…) : aucun exemple commun.
//
// ⭐ UN OBJET PAR BLOC (REGLES.md § 2 bis). Le piège de cette fiche est le dé :
// il est parlant, donc il revenait partout. Chaque bloc porte l'objet qui montre
// SA chose : le sac d'une seule couleur (certain et impossible d'un coup), le
// tableau des issues, la roue inégale, la graduation de 0 à 1, la roue égale,
// la barre des issues favorables, les barres qu'on compare, le sac presque tout
// rouge, et la graduation qui déborde de 1.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { avecMargo } from "@/components/fiches/TiMargoBulle";

type Face = 1 | 2 | 3 | 4 | 5 | 6;

const ROUGE = "#dc2626";
const BLEU = "#2563eb";
const VERT = "#16a34a";
const JAUNE = "#f59e0b";
const GRIS = "#94a3b8";

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

// ─── Les dessins ──────────────────────────────────────────────────────────────

// LA FIGURE : un dé à 6 faces, donc 6 issues.
const deSixFaces = (
  <CanvasRenderer
    figure={{
      kind: "probabilites",
      variant: "de",
      de: { faces: [1, 2, 3, 4, 5, 6] as Face[] },
    }}
  />
);

// LE CERTAIN ET L'IMPOSSIBLE DANS UN SEUL DESSIN : un sac tout rouge.
const sacUneSeuleCouleur = legende(
  <CanvasRenderer
    figure={{
      kind: "probabilites",
      variant: "billes",
      billes: {
        elements: [
          { couleur: ROUGE },
          { couleur: ROUGE },
          { couleur: ROUGE },
          { couleur: ROUGE },
          { couleur: ROUGE },
        ],
      },
    }}
  />,
  "Tirer rouge : certain. Tirer bleu : impossible."
);

// LISTER, C'EST NE RIEN LAISSER DEHORS. Deux colonnes : l'expérience, ses issues.
const tableauDesIssues = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["Expérience", "Nombre d'issues"],
      rows: [
        { values: ["un dé", "6"] },
        { values: ["une pièce", "2 : pile, face"] },
        { values: ["un sac de 7 billes", "7"] },
      ],
      highlight: { col: 1 },
    }}
  />
);

// LE PLUS GRAND SECTEUR GAGNE. A grand, B et C petits et de même taille.
// ⚠️ Sans `size`, le canvas prend 320 de large et ses lettres tombent à 9,8 px
// dans une carte de 225. Cadre serré à 250 : 11,8 px (mesuré sur la page).
const roueInegale = legende(
  <CanvasRenderer
    figure={{
      kind: "probabilites",
      variant: "roue",
      roue: {
        segments: [
          { label: "A", poids: 4, couleur: ROUGE },
          { label: "B", poids: 1, couleur: BLEU },
          { label: "C", poids: 1, couleur: VERT },
        ],
      },
      size: { width: 250, height: 200 },
    }}
  />,
  "A a le plus de chances. B et C, autant l'un que l'autre."
);

// LA GRADUATION DES CHANCES, de 0 à 1.
// ⛔ Les étiquettes « jamais » / « toujours » aux deux bouts sortaient du cadre
// (« toujours » occupait [241 ; 303] dans 300, mesuré par apercu-canvas). Les
// bouts restent donc sans mot, en couleur ; le mot va au milieu, où il tient.
const echelleDesChances = legende(
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 0,
      max: 1,
      step: 0.25,
      points: [
        { value: 0, label: "", color: ROUGE },
        { value: 0.5, label: "pile", color: JAUNE },
        { value: 1, label: "", color: VERT },
      ],
      display: {
        showTicks: true,
        showValues: true,
        showPoints: true,
        showPointLabels: true,
        showZero: true,
      },
      size: { width: 260, height: 95 },
    }}
  />,
  "0 impossible, 1 certain. Pile : une chance sur deux."
);

// FAIRE LE TOUR SANS RIEN OUBLIER : quatre secteurs, quatre issues.
const roueEgale = legende(
  <CanvasRenderer
    figure={{
      kind: "probabilites",
      variant: "roue",
      roue: {
        segments: [
          { label: "A", poids: 1, couleur: ROUGE },
          { label: "B", poids: 1, couleur: BLEU },
          { label: "C", poids: 1, couleur: VERT },
          { label: "D", poids: 1, couleur: JAUNE },
        ],
      },
      size: { width: 250, height: 200 },
    }}
  />,
  "4 secteurs : 4 issues, pas une de plus."
);

// COMPTER LES BONNES ISSUES : « plus de 4 » sur un dé, c'est 5 et 6.
const barrePlusDe4 = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      // ⚠️ Au-delà de ~28 caractères, le titre déborde du cadre en silence.
      title: "Obtenir plus de 4",
      total: "6 issues",
      parts: [
        { label: "5 ou 6", value: "2", color: VERT },
        { label: "1 à 4", value: "4", color: GRIS },
      ],
      questionLabel: "2 issues sur 6 font gagner",
      // `SchemaBarreCanvas` écrit en 12 px : rester sous 245 de large, et 190 de
      // haut pour ne pas coller les étiquettes à la phrase du bas.
      size: { width: 240, height: 190 },
    }}
  />
);

// COMPARER, C'EST METTRE CÔTE À CÔTE trois événements du même dé.
const barresAComparer = (
  <CanvasRenderer
    figure={{
      kind: "stat_graph",
      graphType: "barres",
      title: "Issues qui font gagner",
      data: [
        { label: "« 6 »", value: 1, color: BLEU },
        { label: "pair", value: 3, color: VERT },
        { label: "plus de 2", value: 4, color: ROUGE },
      ],
      display: { showValues: true, showLabels: true, highlightIndex: 2 },
      size: { width: 230, height: 190 },
    }}
  />
);

// LES BONS MOTS, en deux colonnes.
const tableauDesMots = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "On lance un dé",
      headers: ["Événement", "Le mot"],
      rows: [
        { values: ["obtenir 7", "impossible"] },
        { values: ["obtenir 6", "possible"] },
        { values: ["obtenir 1 à 6", "certain"] },
      ],
      highlight: { col: 1 },
    }}
  />
);

// PRESQUE TOUT ROUGE : tirer rouge est proche de 1 (banque : 7 rouges, 1 bleue).
const sacPresqueRouge = legende(
  <CanvasRenderer
    figure={{
      kind: "probabilites",
      variant: "billes",
      billes: {
        elements: [
          { couleur: ROUGE },
          { couleur: ROUGE },
          { couleur: ROUGE },
          { couleur: ROUGE },
          { couleur: ROUGE },
          { couleur: ROUGE },
          { couleur: ROUGE },
          { couleur: BLEU },
        ],
      },
    }}
  />,
  "7 rouges, 1 bleue : tirer rouge est proche de 1."
);

// ⭐ 1,5 SORT DE L'ÉCHELLE. La graduation est prolongée exprès jusqu'à 2 : le
// point rouge tombe AU-DELÀ du certain, là où aucune chance ne peut aller.
const echelleDepassee = legende(
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 0,
      max: 2,
      step: 0.5,
      points: [
        { value: 1, label: "certain", color: VERT },
        { value: 1.5, label: "?", color: ROUGE },
      ],
      display: {
        showTicks: true,
        showValues: true,
        showPoints: true,
        showPointLabels: true,
        showZero: true,
      },
      size: { width: 260, height: 95 },
    }}
  />,
  "Rien ne dépasse le certain : 1,5 est faux."
);

// L'EXEMPLE 1 : le dé, les faces paires allumées.
const dePairs = (
  <CanvasRenderer
    figure={{
      kind: "probabilites",
      variant: "de",
      de: { faces: [1, 2, 3, 4, 5, 6] as Face[], surligne: [2, 4, 6] as Face[] },
    }}
  />
);

// L'EXEMPLE 2 : le sac de billes, 4 rouges, 2 bleues, 1 verte.
const sacBilles = (
  <CanvasRenderer
    figure={{
      kind: "probabilites",
      variant: "billes",
      billes: {
        elements: [
          { couleur: ROUGE },
          { couleur: ROUGE },
          { couleur: ROUGE },
          { couleur: ROUGE },
          { couleur: BLEU },
          { couleur: BLEU },
          { couleur: VERT },
        ],
      },
    }}
  />
);

// L'EXEMPLE 3 : le 6 est-il impossible ? Une seule face allumée.
const deSix = (
  <CanvasRenderer
    figure={{
      kind: "probabilites",
      variant: "de",
      de: { faces: [1, 2, 3, 4, 5, 6] as Face[], surligne: [6] as Face[] },
    }}
  />
);

// ─── Les textes ───────────────────────────────────────────────────────────────

const pieges = [
  "Dire « certain » pour « possible ». Obtenir 6 est possible, pas certain.",
  "Oublier une issue. Écrire 1, 2, 3, 4, 5 pour un dé, c'est oublier le 6.",
  "Conclure sans compter. On compte les billes de chaque couleur avant de décider.",
];

const aRetenir = [
  "Impossible : jamais. Certain : toujours. Possible : peut-être.",
  "Une chance se range entre 0 (impossible) et 1 (certain).",
  "On liste toutes les issues, puis on compte celles qui font gagner.",
];

export const ficheProbabilites6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "proba-experience",
  titre: "Premiers pas en probabilités",
  accroche:
    "Un dé, une pièce, une bille tirée d'un sac : c'est le hasard qui décide. On apprend à en parler avec les bons mots.",
  identite: [
    { label: "Les mots clés", valeur: "Issue, impossible, possible, certain" },
    { label: "Le secret", valeur: "On liste toutes les issues, puis on compte" },
    { label: "L'échelle", valeur: "De 0 (impossible) à 1 (certain)" },
  ],
  definition: {
    texte:
      "Une expérience aléatoire, c'est quand le hasard décide du résultat. Chaque résultat possible s'appelle une issue. Un dé a 6 issues : 1, 2, 3, 4, 5 et 6.",
  },
  figure: {
    schema: deSixFaces,
    legende: "On lance le dé : 6 issues possibles.",
  },
  proprietes: [
    {
      titre: "Impossible ou certain",
      micros: ["proba_vocabulaire"],
      texte:
        "Un événement impossible n'arrive jamais. Un événement certain arrive toujours ; entre les deux, il est possible.",
      schema: sacUneSeuleCouleur,
    },
    {
      titre: "Toutes les issues",
      micros: ["proba_issue"],
      texte:
        "On écrit tous les résultats possibles, sans en oublier. Une pièce a 2 issues, un sac de 7 billes en a 7.",
      schema: tableauDesIssues,
    },
    {
      titre: "Le plus grand gagne",
      micros: ["proba_comparer"],
      texte:
        "Sur une roue, le plus grand secteur a le plus de chances. Deux secteurs égaux ont autant de chances.",
      schema: roueInegale,
    },
    {
      titre: "De 0 à 1",
      micros: ["proba_estimer"],
      texte: "On range une chance entre 0 et 1. 0, c'est impossible ; 1, c'est certain.",
      schema: echelleDesChances,
    },
  ],
  reel: {
    texte:
      "On joue à pile ou face pour savoir qui commence. Les jeux de société lancent des dés. La météo dit « 80 % de risque de pluie » : c'est presque certain. Avec les bons mots, on décide mieux.",
  },
  historique: {
    texte:
      "En 1654, une partie de dés s'arrête avant la fin. Un joueur demande à Blaise Pascal comment partager l'argent. Pascal en parle par lettres avec Pierre de Fermat. De ce jeu naît le calcul des chances.",
  },
  methode: [
    {
      titre: "Lister",
      micros: ["proba_issue"],
      texte: "On écrit toutes les issues. On vérifie qu'on n'en oublie aucune.",
      schema: roueEgale,
    },
    {
      titre: "Compter les bonnes",
      micros: ["proba_lire"],
      texte:
        "On compte les issues qui font gagner. « Plus de 4 » sur un dé : 5 et 6, donc 2 issues.",
      schema: barrePlusDe4,
    },
    {
      titre: "Comparer",
      micros: ["proba_comparer"],
      texte:
        "L'événement qui a le plus d'issues gagnantes a le plus de chances.",
      schema: barresAComparer,
    },
  ],
  usages: [
    {
      titre: "Choisir le bon mot",
      micros: ["proba_vocabulaire"],
      detail:
        "Obtenir 7 avec un dé est impossible. Obtenir 6 est possible, mais pas certain.",
      schema: tableauDesMots,
    },
    {
      titre: "Proche de 0 ou de 1 ?",
      micros: ["proba_estimer"],
      detail:
        "Le sac a 7 billes rouges et 1 bleue. Tirer rouge est très probable : c'est proche de 1.",
      schema: sacPresqueRouge,
    },
    {
      titre: "Vérifier une chance",
      micros: ["proba_defi"],
      detail:
        "Une chance ne dépasse jamais 1. Si on lit « 1,5 », il y a une erreur.",
      schema: echelleDepassee,
    },
  ],
  exemples: [
    {
      titre: "Les faces paires",
      micros: ["proba_issue", "proba_lire"],
      donnees: "On lance un dé à 6 faces.",
      question: "Combien d'issues ? Combien sont paires ?",
      schema: dePairs,
      solution:
        "Le dé a 6 faces : 6 issues. Les nombres pairs sont 2, 4 et 6. Donc 3 issues sur 6 sont paires.",
    },
    {
      titre: "Le sac de billes",
      micros: ["proba_comparer"],
      donnees: "Le sac : 4 billes rouges, 2 bleues, 1 verte.",
      question: "Quelle couleur a le plus de chances ? Et le moins ?",
      schema: sacBilles,
      solution:
        "4 rouges, c'est le plus : le rouge a le plus de chances. 1 verte : le vert en a le moins.",
    },
    {
      titre: "Le 6, impossible ?",
      micros: ["proba_vocabulaire"],
      donnees: "Un élève dit : « Obtenir 6 avec un dé, c'est impossible. »",
      question: "A-t-il raison ?",
      schema: deSix,
      solution:
        "Non. Le dé a une face 6 : le 6 peut sortir. C'est possible, mais pas certain.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question:
        "Avec un dé, range du moins probable au plus probable : « obtenir 6 », « obtenir 1 à 6 », « obtenir 7 ».",
      correction: "Obtenir 7 (impossible), puis obtenir 6 (possible), puis obtenir 1 à 6 (certain).",
      micros: ["proba_vocabulaire"],
    },
    {
      question:
        "Un sac contient 3 billes rouges, 4 bleues et 2 vertes. On tire une bille. Combien d'issues ?",
      correction: "Une issue par bille : 3 + 4 + 2 = 9 issues.",
      micros: ["proba_issue"],
    },
    {
      question: "Un sac contient 5 billes rouges et 2 bleues. Quelle couleur est la plus probable ?",
      correction: "Le rouge : il y a plus de billes rouges (5) que de bleues (2).",
      micros: ["proba_comparer"],
    },
    {
      question:
        "Un sac contient 5 billes rouges et 5 bleues. Rouge et bleu ont-ils autant de chances ?",
      correction: "Oui : il y a autant de rouges que de bleues.",
      micros: ["proba_estimer"],
    },
    {
      question: "Défi : avec un dé, a-t-on plus de chances d'obtenir un nombre pair ou impair ?",
      correction: "Pair : 2, 4, 6. Impair : 1, 3, 5. 3 issues chacun : autant de chances.",
      micros: ["proba_defi"],
    },
  ],
  tiMargo: {
    objectif: "Le hasard, ça se raconte avec les bons mots !",
    definition: "Une issue, c'est un résultat possible !",
    methode: "Je liste tout, puis je compte !",
    pieges: "Possible, ce n'est pas certain !",
    retenir: "De 0, jamais, à 1, toujours !",
    exercice: "Compte les billes avant de répondre !",
  },
  coachHref: "/coach-ia/maths?classe=6e",
};

// ⛔ Le mode classe est ENGENDRÉ depuis la fiche (`slidesDepuisFiche`) : ce
// tableau reste exporté pour la page, mais il n'est pas projeté.
export const slidesProbabilites6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Probabilités - 6e",
    teinte: "objectif",
    schema: avecMargo(deSixFaces, "Le hasard, ça se raconte avec les bons mots !", "joie"),
    section: {
      type: "objectif",
      phrase: "Parler du hasard avec les bons mots",
      sousPhrase: "Impossible, possible, certain : et quel événement a le plus de chances ?",
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    schema: avecMargo(sacBilles, "Compte les billes avant de répondre !"),
    section: {
      type: "exercice",
      enonce: "4 billes rouges, 2 bleues, 1 verte.",
      question: "Quelle couleur a le plus de chances ?",
      indice: "Compte les billes de chaque couleur.",
      correction: "Le rouge : 4 billes, c'est le plus.",
    },
  },
];
