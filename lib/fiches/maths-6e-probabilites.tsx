// ─── Fiche de cours : premiers pas en probabilités (6e) ────────────────────────
// Fiche « en blocs » créée pour coller EXACTEMENT à la banque du coach
// (lib/tutor-v4/questionBank/6e/maths/probabilites.bank.ts).
// C'est la DÉCOUVERTE des probabilités en 6e : vocabulaire, issues, intuition.
// PAS de calcul P = favorables/possibles (ça, c'est la fiche 4e « probabilites »).
//
// Couverture des micro-compétences de la banque (pour la relecture du prof) :
// - proba_vocabulaire → definition, proprietes (Certain, possible, impossible),
//                       usages (carte 1), pieges (1), aRetenir (1), entrainement (Q1)
// - proba_issue       → definition, proprietes (Lister toutes les issues),
//                       methode (Lister), usages (carte 2), exemples (ex. 1),
//                       entrainement (Q2), slides (exemple guidé)
// - proba_comparer    → proprietes (Plus, moins ou aussi probable), methode (Comparer),
//                       usages (carte 3), exemples (ex. 2), entrainement (Q3)
// - proba_estimer     → proprietes (L'échelle de 0 à 1), reel, aRetenir (2),
//                       entrainement (Q4), slides (exercice flash)
// - proba_lire        → methode (Compter), usages (carte 2 et 3), exemples (ex. 2),
//                       pieges (2)
// - proba_defi        → pieges (3), aRetenir (3), entrainement (Q4), slide « pièges »

//
// ⭐ SEPT DESSINS, SEPT IMAGES DIFFÉRENTES (REGLES.md § 2 bis). Le piège de cette
// fiche-là est le dé : il est parlant, donc il revenait partout, et sept dés
// alignés font sept règles identiques aux yeux d'un élève de 6e. Chaque bloc
// porte donc l'objet qui montre SA chose : un sac d'une seule couleur (le
// certain et l'impossible se voient d'un coup), un tableau qui liste les issues
// de trois expériences, une roue aux secteurs inégaux (le plus grand gagne), la
// graduation de 0 à 1, une roue aux secteurs égaux (on fait le tour, on n'oublie
// rien), une barre de 6 dont 3 sont favorables, et des barres qu'on compare.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

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

// Un dé à 6 faces (canvas du coach) : la définition « 6 issues » se voit.
const deSixFaces = (
  <CanvasRenderer
    figure={{
      kind: "probabilites",
      variant: "de",
      de: { faces: [1, 2, 3, 4, 5, 6] as Face[] },
    }}
  />
);

// Le même dé, les nombres pairs surlignés (3 issues favorables).
const dePairs = (
  <CanvasRenderer
    figure={{
      kind: "probabilites",
      variant: "de",
      de: { faces: [1, 2, 3, 4, 5, 6] as Face[], surligne: [2, 4, 6] as Face[] },
    }}
  />
);

// Le sac de billes : 4 rouges, 2 bleues, 1 verte — on compte pour comparer.
const sacBilles = (
  <CanvasRenderer
    figure={{
      kind: "probabilites",
      variant: "billes",
      billes: {
        elements: [
          { couleur: "#dc2626" },
          { couleur: "#dc2626" },
          { couleur: "#dc2626" },
          { couleur: "#dc2626" },
          { couleur: "#2563eb" },
          { couleur: "#2563eb" },
          { couleur: "#16a34a" },
        ],
      },
    }}
  />
);

// LE CERTAIN ET L'IMPOSSIBLE DANS UN SEUL DESSIN. Un sac où toutes les billes
// sont rouges dit les deux extrêmes d'un coup d'œil : tirer rouge arrive à tous
// les coups, tirer bleu n'arrive jamais. Aucune liste de mots ne fait ça.
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
  "tirer rouge : certain · tirer bleu : impossible"
);

// LISTER, C'EST ÉCRIRE LA COLONNE ENTIÈRE. Trois expériences, leurs issues et
// leur compte : ce que la propriété demande, c'est de ne rien laisser dehors.
const tableauDesIssues = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["Expérience", "Ses issues", "Combien"],
      rows: [
        { values: ["Un dé", "1 à 6", "6"] },
        { values: ["Une pièce", "pile, face", "2"] },
        { values: ["7 billes", "une par bille", "7"] },
      ],
      highlight: { col: 2 },
    }}
  />
);

// LE PLUS GRAND SECTEUR GAGNE. C'est la roue de l'exercice 3 de la fiche —
// A grand, B et C petits et de même taille : l'élève retrouve dans le cours
// exactement la figure sur laquelle on l'interroge plus bas.
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
      // ⚠️ MESURÉ SUR LA PAGE, pas dans `apercu-canvas.mjs` qui l'avait laissée
      // passer : sans `size`, le canvas prend 320 de large et ses lettres
      // tombent à 9,8 px dans une carte de 225. Cadre serré à 250 : 11,8 px.
      size: { width: 250, height: 200 },
    }}
  />,
  "A a le plus de chances · B et C sont aussi probables"
);

// LA GRADUATION DES CHANCES. Le seul dessin de la fiche qui porte des NOMBRES :
// une chance se range entre 0 et 1, comme n'importe quel nombre sur une droite.
const echelleDesChances = legende(
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 0,
      max: 1,
      step: 0.25,
      points: [
        { value: 0, label: "jamais", color: ROUGE },
        { value: 1, label: "toujours", color: VERT },
      ],
      display: {
        showTicks: true,
        showValues: true,
        showPoints: true,
        showPointLabels: true,
        showZero: true,
      },
      size: { width: 300, height: 95 },
    }}
  />,
  "0 = impossible · 1 = certain"
);

// FAIRE LE TOUR SANS RIEN OUBLIER. Un disque complet : quatre secteurs, quatre
// issues, et il ne reste pas de place pour une cinquième. C'est le geste de la
// méthode « Lister », là où le tableau de la propriété en donnait la trace.
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
  "4 secteurs, donc 4 issues — et pas une de plus"
);

// COMPTER, C'EST DÉCOUPER LE TOUT. Les 6 issues du dé mises bout à bout, les 3
// favorables d'un côté : le rapport se voit avant d'être écrit. Les nombres sont
// ceux de l'exemple 1, pour que l'élève les reconnaisse.
const barreDesIssues = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      // ⚠️ Au-delà de ~28 caractères, le titre déborde du cadre en silence
      // (mesuré sur la fiche des périmètres).
      title: "Les 6 issues d'un dé",
      total: "6 issues",
      parts: [
        { label: "pairs", value: "3", color: VERT },
        { label: "impairs", value: "3", color: GRIS },
      ],
      questionLabel: "3 issues sur 6 sont paires",
      // ⚠️ DEUX RÉGLAGES, DEUX MESURES DIFFÉRENTES. La HAUTEUR : 175 px collaient
      // « pairs » / « impairs » à la phrase du bas (le canvas pose les étiquettes
      // à 144 et la phrase à hauteur − 18) — piège déjà payé sur les périmètres.
      // La LARGEUR : à 300, ces mêmes étiquettes tombent à 9 px dans une carte de
      // 225 ; `SchemaBarreCanvas` écrit en 12 px, il faut donc rester sous 245.
      size: { width: 240, height: 190 },
    }}
  />
);

// COMPARER, C'EST METTRE CÔTE À CÔTE. Trois événements du même dé, la hauteur
// donne le nombre d'issues qui les réalisent : la barre la plus haute est
// l'événement le plus probable, sans un mot de plus.
const barresAComparer = (
  <CanvasRenderer
    figure={{
      kind: "stat_graph",
      graphType: "barres",
      title: "Issues favorables",
      data: [
        { label: "« 6 »", value: 1, color: BLEU },
        { label: "pair", value: 3, color: VERT },
        { label: "plus de 2", value: 4, color: ROUGE },
      ],
      display: { showValues: true, showLabels: true, highlightIndex: 2 },
      // `StatGraphCanvas` écrit en 12 px : au-delà de 245 de viewBox, une carte
      // de 225 le descend sous le seuil.
      size: { width: 230, height: 190 },
    }}
  />
);

const pieges = [
  "Confondre « possible » et « certain » : obtenir 6 avec un dé est possible, mais pas certain, car les autres faces peuvent sortir.",
  "Conclure sans compter : en regardant vite un sac de billes, on peut se tromper. On compte les billes de chaque couleur avant de décider.",
  "Oublier une issue : si on liste 1, 2, 3, 4, 5 pour un dé, on oublie le 6 et tout le raisonnement devient faux.",
];

const aRetenir = [
  "Quatre mots à distinguer : un événement impossible n'arrive jamais, un événement certain arrive toujours, entre les deux un événement est possible et plus ou moins probable.",
  "Une chance se mesure sur une échelle de 0 (impossible) à 1 (certain) : plus l'événement a de chances, plus on s'approche de 1.",
  "Avant de conclure, on liste toutes les issues et on les compte : c'est ce qui rend une réponse sûre plutôt qu'une simple impression.",
];

export const ficheProbabilites6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "proba-experience",
  titre: "Premiers pas en probabilités",
  accroche:
    "Lancer un dé, tirer une bille, jouer à pile ou face : on ne sait pas à l'avance ce qui va sortir, c'est le hasard. En 6e, on apprend à en parler avec les bons mots (possible, certain, impossible), à repérer les résultats possibles et à dire quel événement a le plus de chances.",
  identite: [
    { label: "Prérequis", valeur: "Compter, comparer des petits nombres" },
    { label: "Idée clé", valeur: "Certaines choses sont sûres, d'autres impossibles, la plupart sont plus ou moins probables" },
    { label: "Vocabulaire", valeur: "Hasard, expérience aléatoire, issue, événement, probabilité" },
  ],
  definition: {
    texte:
      "Une expérience aléatoire est une expérience dont on ne connaît pas le résultat à l'avance : il dépend du hasard, comme lancer un dé ou tirer une bille. Chaque résultat possible s'appelle une issue. Lancer un dé à 6 faces a 6 issues : 1, 2, 3, 4, 5 ou 6.",
  },
  figure: {
    schema: deSixFaces,
    legende: "Lancer ce dé est une expérience aléatoire : il a 6 issues possibles (1, 2, 3, 4, 5 ou 6).",
  },
  proprietes: [
    {
      titre: "Certain, possible, impossible",
      micros: ["proba_vocabulaire"],
      texte:
        "Un événement impossible ne peut jamais se produire (obtenir 7 avec un dé classique). Un événement certain se produit toujours (obtenir un nombre entre 1 et 6). Entre les deux, un événement possible peut arriver, sans être garanti (obtenir 6).",
      schema: sacUneSeuleCouleur,
    },
    {
      titre: "Lister toutes les issues",
      micros: ["proba_issue"],
      texte:
        "Avant tout, on cherche tous les résultats possibles. Un dé a 6 issues, une pièce en a 2 (pile ou face), un sac de billes en a autant que de billes. Si on en oublie une, la suite est faussée.",
      schema: tableauDesIssues,
    },
    {
      titre: "Plus, moins ou aussi probable",
      micros: ["proba_comparer"],
      texte:
        "Un événement est d'autant plus probable qu'il a de résultats qui le réalisent. Sur un dé, « obtenir un nombre pair » (2, 4 ou 6) est plus probable qu'« obtenir 6 » tout seul. Deux événements sont aussi probables quand ils ont autant de chances chacun.",
      schema: roueInegale,
    },
    {
      titre: "L'échelle de 0 à 1",
      micros: ["proba_estimer"],
      texte:
        "On mesure une chance entre 0 et 1. 0, c'est impossible ; 1, c'est certain. Un événement qui a beaucoup de chances est proche de 1 ; un événement qui en a peu est proche de 0. Une chance n'est jamais plus grande que 1.",
      schema: echelleDesChances,
    },
  ],
  reel: {
    texte:
      "Le hasard est partout : à pile ou face pour choisir qui commence, avec les dés d'un jeu de société, dans une tombola. La météo aussi en parle : « 80 % de risque de pluie », c'est proche de 1, il pleuvra sûrement ; « 5 % », c'est proche de 0, il fera sec. Savoir dire « probable » ou « peu probable » aide à décider.",
  },
  historique: {
    texte:
      "Les probabilités sont nées d'un jeu d'argent. En 1654, un joueur demande de l'aide à Blaise Pascal pour partager équitablement une mise quand une partie de dés s'arrête avant la fin. Pascal échange des lettres avec Pierre de Fermat, et ensemble ils posent les premières idées du calcul des chances. Une science entière est ainsi née d'une question de jeu.",
  },
  methode: [
    {
      titre: "Lister les issues",
      micros: ["proba_issue"],
      texte:
        "On écrit tous les résultats possibles de l'expérience : les 6 faces d'un dé, les 2 côtés d'une pièce, les billes du sac. On vérifie qu'on n'en oublie aucun.",
      schema: roueEgale,
    },
    {
      titre: "Compter",
      micros: ["proba_lire"],
      texte:
        "On compte combien d'issues au total, puis combien réalisent l'événement qui nous intéresse (les issues favorables). Sur un dé, « nombre pair » a 3 issues favorables : 2, 4 et 6.",
      schema: barreDesIssues,
    },
    {
      titre: "Comparer",
      micros: ["proba_comparer"],
      texte:
        "Pour dire quel événement est le plus probable, on compare le nombre d'issues favorables : le plus de chances gagne. On peut aussi situer une chance sur l'échelle de 0 à 1.",
      schema: barresAComparer,
    },
  ],
  usages: [
    {
      titre: "Utiliser les bons mots",
      micros: ["proba_vocabulaire"],
      detail:
        "Choisir entre impossible, possible, probable et certain selon la situation : obtenir un nombre entre 1 et 6 avec un dé est certain ; obtenir 7 est impossible.",
    },
    {
      titre: "Identifier les issues",
      micros: ["proba_issue"],
      detail:
        "Repérer et compter tous les résultats possibles : combien de faces sur un dé, combien de secteurs sur une roue, combien de billes dans un sac.",
    },
    {
      titre: "Comparer et estimer",
      micros: ["proba_comparer", "proba_estimer"],
      detail:
        "Dire quel événement a le plus de chances, ou situer une chance entre 0 (impossible) et 1 (certain) : « proche de 1 » quand c'est très probable.",
    },
  ],
  exemples: [
    {
      titre: "Compter les issues d'un dé",
      micros: ["proba_issue", "proba_lire"],
      donnees: "On lance un dé classique à 6 faces.",
      question: "Combien y a-t-il d'issues possibles ? Combien réalisent l'événement « obtenir un nombre pair » ?",
      schema: dePairs,
      solution:
        "Les issues possibles sont les faces du dé : 1, 2, 3, 4, 5 et 6, soit 6 issues. Parmi elles, les nombres pairs sont 2, 4 et 6 : 3 issues réalisent l'événement « obtenir un nombre pair ». Il y a donc 6 issues au total et 3 issues favorables.",
    },
    {
      titre: "Comparer dans un sac de billes",
      micros: ["proba_comparer"],
      donnees: "Un sac contient 4 billes rouges, 2 billes bleues et 1 bille verte. On tire une bille au hasard.",
      question: "Quelle couleur a le plus de chances d'être tirée ? Laquelle en a le moins ?",
      schema: sacBilles,
      solution:
        "On compte les billes de chaque couleur : 4 rouges, 2 bleues, 1 verte. La couleur qui a le plus de billes est la plus probable : c'est le rouge, avec 4 billes. Celle qui en a le moins est la moins probable : c'est le vert, avec 1 seule bille. Tirer une bille rouge est donc plus probable que tirer une bille verte.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Range ces trois événements du moins probable au plus probable pour un dé : « obtenir 6 », « obtenir un nombre entre 1 et 6 », « obtenir 7 ».",
      correction:
        "« Obtenir 7 » est impossible avec un dé classique : aucune issue ne le réalise, c'est le moins probable. « Obtenir 6 » est possible : une seule face sur six. « Obtenir un nombre entre 1 et 6 » est certain : toutes les faces le réalisent. Du moins au plus probable : obtenir 7 (impossible), obtenir 6 (possible), obtenir un nombre entre 1 et 6 (certain).",
    },
    {
      question: "Un sac contient 3 billes rouges, 4 billes bleues et 2 billes vertes. Combien d'issues possibles y a-t-il quand on tire une bille au hasard ?",
      correction:
        "Chaque bille est un résultat possible : le nombre d'issues est le nombre total de billes. On additionne : 3 + 4 + 2 = 9. Il y a donc 9 issues possibles.",
    },
    {
      question: "Sur une roue, le secteur A est grand, les secteurs B et C sont petits et de même taille. Quelle lettre a le plus de chances ? B et C sont-elles aussi probables ?",
      correction:
        "Sur une roue, plus un secteur est grand, plus l'issue est probable. Le secteur A est le plus grand : la lettre A a le plus de chances d'être obtenue. Les secteurs B et C ont la même taille : les issues B et C sont donc aussi probables l'une que l'autre.",
    },
    {
      question: "Défi : un camarade dit « la probabilité de gagner est 1,5 ». Pourquoi est-ce impossible ? Que dois-tu toujours vérifier avant de le croire ?",
      correction:
        "Une chance se mesure entre 0 et 1 : 0 pour impossible, 1 pour certain. La valeur 1 correspond déjà à un événement certain, donc rien ne peut dépasser 1 : une probabilité de 1,5 n'a pas de sens. Avant de croire qu'un événement est « très probable », on ne se fie pas à une impression : on liste toutes les issues, on compte les issues favorables et on compare au total.",
      micros: ["proba_defi"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
};

export const slidesProbabilites6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Probabilités - 6e",
    section: {
      type: "objectif",
      phrase: "Parler du hasard avec les bons mots",
      sousPhrase:
        "Lancer un dé, tirer une bille : on ne sait pas le résultat à l'avance. On apprend à dire si un événement est possible, certain ou impossible, et lequel a le plus de chances.",
      encadre: {
        titre: "L'idée",
        texte: "Obtenir 7 avec un dé est impossible, obtenir un nombre entre 1 et 6 est certain, obtenir 6 est simplement possible.",
      },
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu:
          "Pile ou face pour choisir, les dés d'un jeu, la météo : « 80 % de risque de pluie », c'est proche de certain ; « 5 % », c'est proche d'impossible.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "En 1654, Blaise Pascal et Pierre de Fermat échangent des lettres pour partager équitablement une mise à un jeu de dés interrompu. Le calcul des probabilités est né de ce jeu.",
      },
    },
  },
  {
    titre: "Le vocabulaire",
    badge: "À connaître",
    section: {
      type: "objectif",
      phrase: "Une expérience aléatoire, des issues, un événement",
      sousPhrase:
        "Une expérience aléatoire a un résultat qui dépend du hasard. Chaque résultat possible est une issue. Un dé a 6 issues, une pièce en a 2.",
      encadre: {
        titre: "Attention",
        texte: "« Possible » et « certain », ce n'est pas pareil : obtenir 6 est possible, mais pas certain, car les autres faces peuvent sortir.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheProbabilites6e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Selon ce que l'on cherche",
    badge: "3 gestes",
    section: {
      type: "cartes",
      cartes: ficheProbabilites6e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Compter les issues",
    section: {
      type: "exemple",
      enonce: "On lance un dé classique à 6 faces.",
      question: "Combien d'issues possibles ? Combien réalisent « obtenir un nombre pair » ?",
      correction:
        "Issues possibles : 1, 2, 3, 4, 5, 6, soit 6 issues. Nombres pairs : 2, 4 et 6, soit 3 issues favorables.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Comparer",
    section: {
      type: "exemple",
      enonce: "Un sac contient 4 billes rouges, 2 bleues et 1 verte.",
      question: "Quelle couleur a le plus de chances ? Laquelle en a le moins ?",
      correction:
        "La plus présente est la plus probable : le rouge (4 billes). La moins présente est la moins probable : le vert (1 bille).",
    },
  },
  {
    titre: "Pièges & à retenir",
    badge: "Vigilance",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Pièges à éviter",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {pieges.map((piege) => (
              <li key={piege}>• {piege}</li>
            ))}
          </ul>
        ),
      },
      droite: {
        variante: "ok",
        titre: "À retenir",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {aRetenir.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        ),
      },
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    section: {
      type: "exercice",
      enonce:
        "Un camarade dit : « la probabilité de gagner est 1,5 ».",
      question: "Pourquoi est-ce impossible ?",
      indice: "Une chance se mesure entre 0 (impossible) et 1 (certain).",
      correction:
        "1 correspond déjà à un événement certain : rien ne peut dépasser 1. Une probabilité de 1,5 n'a pas de sens.",
    },
  },
];
