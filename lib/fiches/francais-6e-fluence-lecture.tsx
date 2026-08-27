// ─── Fiche de cours : lire avec fluidité (6e) ─────────────────────────────────
// LA QUATORZIÈME FICHE DE FRANÇAIS DE LA 6e, et la PREMIÈRE FICHE DE FLUENCE DU
// SITE — aucune classe n'en avait, du CP à la seconde.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Sixième ». ⛔ La 6e ferme le cycle 3.
//
// ⛔⛔ LA FLUENCE N'EXISTE PAS AU CYCLE 4. Ni la 5e, ni la 4e, ni la 3e n'ont de
// notion de fluidité : le programme la considère acquise à l'entrée du collège.
// Il n'y a donc RIEN à transposer ici, et rien qui resservira plus haut — c'est
// une notion propre au cycle 3, et c'est justement pour cela qu'elle manquait.
// L'en-tête de `notions.ts` le dit : « Lire avec fluidité » et « Lire à voix
// haute avec expressivité » sont DEUX compétences distinctes du BO, et elles
// étaient fondues dans la même notion avant le découpage du 22/08.
//
// ⭐⭐ LA DÉCOUVERTE QUI TIENT LA FICHE : LES GROUPES DE SOUFFLE DE LA PARTITION
// ET LES GROUPES DE SENS DE LA FLUENCE SONT LES MÊMES GROUPES. La partition de
// `francais-4e-lecture-voix-haute.tsx` découpait un texte pour la voix ; ici le
// même découpage explique la VITESSE de lecture, y compris silencieuse. Un élève
// qui lit mot à mot bute huit fois par ligne ; le même élève, lisant par
// groupes, avance sans effort. Le canvas montre les deux, et l'écart se voit.
//
// ⛔ RÈGLE DE COULEUR : ces crochets ne sont pas des fonctions — « groupe 1 »,
// « coupe fausse », « deux pauses » doivent rester GRIS, et c'est vérifié au
// rendu. (Dans `francais-6e-grammaire-phrase.tsx`, à l'inverse, les étiquettes
// SONT des fonctions et les couleurs doivent s'appliquer.)
//
// ⭐ `number_line` porte les paliers du cycle : 110 mots au CM1, 120 au CM2, 130
// en 6e. C'est un ordre chiffré, et c'est exactement ce que la droite montre.
//
// Alignée sur les items `6e_fr_fixed_flue_*` de
// lib/tutor-v4/questionBank/6e/francais/fixed.bank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `fluence_lecture`) :
// - 6e_flue_silencieuse         → propriétés 1 et 2, méthode 1, usage 1, exemple 1
// - 6e_flue_groupes_syntaxiques → figure, propriétés 3 à 5, formule, méthodes 2
//                                 et 3, usage 2, exemples 2 et 3
// - 6e_flue_130_mots            → propriétés 6 et 7, méthode 4, usage 3,
//                                 exemples 4 et 5
// - 6e_flue_defi                → propriété 8, exemple 6

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
  NumberLineCanvasPoint,
} from "@/lib/tutor-v4/types";

function phrase(opts: {
  mots: (string | PhraseCanvasMot)[];
  groupes?: PhraseCanvasGroupe[];
  liens?: PhraseCanvasLien[];
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "phrase",
        mots: opts.mots.map((m) => (typeof m === "string" ? { texte: m } : m)),
        groupes: opts.groupes,
        liens: opts.liens,
        legende: opts.legende,
        largeurMax: 190,
      }}
    />
  );
}

/** Les paliers du cycle 3. ⚠️ `showValues: false` : les nombres sont dans les
 *  étiquettes, pas sur la droite — sinon on lirait deux graduations. */
function echelle(points: NumberLineCanvasPoint[]) {
  return (
    <CanvasRenderer
      figure={{
        kind: "number_line",
        min: 0,
        max: 4,
        step: 1,
        points,
        size: { width: 235, height: 78 },
        display: { showTicks: false, showValues: false, showZero: false },
      }}
    />
  );
}

function pile(...blocs: ReactNode[]) {
  return (
    <div className="grid gap-4">
      {blocs.map((bloc, i) => (
        <div key={i}>{bloc}</div>
      ))}
    </div>
  );
}

// ─── Ce qui se dessine quand on lit vite ──────────────────────────────────────

// ── LA FIGURE DE RÉFÉRENCE : la même phrase, mot à mot puis par groupes.
const lectureMotAMot = phrase({
  mots: [
    { texte: "Le", focus: true },
    { texte: "vieux", focus: true },
    { texte: "pêcheur", focus: true },
    { texte: "du", focus: true },
    { texte: "port", focus: true },
    { texte: "répara", focus: true },
    { texte: "son", focus: true },
    { texte: "filet", focus: true },
    { texte: "." },
  ],
  legende: "Lu mot à mot : huit arrêts en une ligne, et le sens n'arrive jamais.",
});

const lectureParGroupes = phrase({
  mots: [
    { texte: "Le" },
    { texte: "vieux" },
    { texte: "pêcheur" },
    { texte: "du" },
    { texte: "port" },
    { texte: "répara" },
    { texte: "son" },
    { texte: "filet" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 4], label: "groupe 1" },
    { mots: [5, 8], label: "groupe 2" },
  ],
  legende: "Deux groupes de sens : de qui on parle, et ce qu'il fait. Deux arrêts.",
});

// ── LA COUPE QUI CASSE LE SENS.
const coupeFausse = phrase({
  mots: [
    { texte: "Le" },
    { texte: "vieux" },
    { texte: "pêcheur" },
    { texte: "du" },
    { texte: "port" },
    { texte: "répara" },
    { texte: "son" },
    { texte: "filet" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "coupe fausse" },
    { mots: [2, 8], label: "le reste" },
  ],
  legende: "« Le vieux / pêcheur du port… » : on sépare l'adjectif de son nom.",
});

// ── LES VIRGULES DÉTACHENT, ET LA VOIX SUIT.
const virgulesDetachent = phrase({
  mots: [
    { texte: "Il" },
    { texte: "arriva" },
    { texte: "," },
    { texte: "épuisé", focus: true },
    { texte: "," },
    { texte: "au" },
    { texte: "sommet" },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 4], label: "deux pauses" }],
  legende: "Les deux virgules détachent « épuisé » : une courte pause de chaque côté.",
});

// ── LES PALIERS DU CYCLE 3.
const paliers = echelle([
  { value: 1, label: "CM1 : 110" },
  { value: 2, label: "CM2 : 120" },
  { value: 3, label: "6e : 130" },
]);

// ── LE DÉFI : le mot long qui fait buter.
const motQuiFaitButer = phrase({
  mots: [
    { texte: "un" },
    { texte: "escarpement", focus: true },
    { texte: "au" },
    { texte: "bord" },
    { texte: "du" },
    { texte: "vide" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 1], label: "es-carpe-ment" }],
  legende: "Un mot long se lit par morceaux, sans s'arrêter — puis on continue.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheFluenceLecture6e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "6e",
  notion: "fluence-lecture",
  titre: "Lire avec fluidité en 6e",
  accroche:
    "« Le vieux pêcheur du port répara son filet. » Lue mot à mot, cette ligne demande huit arrêts — et à la fin, on a oublié le début. Lue en deux groupes, elle en demande deux. Lire vite n'est pas lire en se dépêchant : c'est arrêter de s'arrêter partout.",
  identite: [
    { label: "Mots clés", valeur: "Fluidité, groupes de sens, phrasé, 130 mots" },
    { label: "Le secret", valeur: "On lit des groupes, pas des mots" },
    { label: "Outil", valeur: "Couper là où le sens se tient" },
  ],
  definition: {
    texte:
      "Lire avec FLUIDITÉ, c'est lire sans buter, à une allure qui laisse le temps de comprendre. Cela ne s'obtient pas en se dépêchant : un lecteur rapide ne lit pas les mots plus vite, il en lit PLUSIEURS À LA FOIS. Il découpe la phrase en GROUPES DE SENS — « le vieux pêcheur du port » d'un côté, « répara son filet » de l'autre — et son œil saisit chaque groupe d'un coup. La PONCTUATION lui dit où couper : une virgule sépare, deux virgules détachent, un point ferme. Et cela vaut aussi bien pour la lecture à voix haute que pour la lecture SILENCIEUSE, celle où l'on ne prononce rien, ni tout haut ni tout bas. Le programme fixe un repère chiffré : environ 130 mots par minute en 6e — après 110 au CM1 et 120 au CM2.",
  },
  figure: {
    schema: pile(lectureMotAMot, lectureParGroupes),
    legende:
      "La même phrase, deux façons de la lire. En haut, chaque mot est une étiquette isolée : huit arrêts en une ligne, et le temps d'arriver au filet on a perdu le pêcheur. En bas, deux groupes de sens — de qui on parle, puis ce qu'il fait : deux arrêts, et la phrase tient d'un bloc. Ce sont les mêmes groupes que ceux du souffle quand on lit à voix haute.",
  },
  proprietes: [
    {
      titre: "Lire silencieusement, c'est ne rien prononcer",
      texte:
        "Ni tout haut, ni tout bas, ni en remuant les lèvres. Tant qu'on prononce, on lit à la vitesse de la bouche — et elle est bien plus lente que l'œil.",
      schema: lectureParGroupes,
      micros: ["6e_flue_silencieuse"],
    },
    {
      titre: "Le phrasé sert aussi dans la tête",
      texte:
        "Les groupes de sens ne servent pas qu'à la voix : ils font gagner du temps même quand on lit sans un bruit.",
      schema: lectureMotAMot,
      micros: ["6e_flue_silencieuse"],
    },
    {
      titre: "On lit des groupes, pas des mots",
      texte:
        "« Le vieux pêcheur du port » se saisit d'un coup : c'est un seul morceau de sens. L'œil le prend entier, comme on reconnait un visage.",
      schema: lectureParGroupes,
      micros: ["6e_flue_groupes_syntaxiques"],
    },
    {
      titre: "Une coupe fausse casse le sens",
      texte:
        "« Le vieux / pêcheur du port » sépare l'adjectif de son nom. Le groupe est brisé, et l'on doit revenir en arrière pour recoller.",
      schema: coupeFausse,
      micros: ["6e_flue_groupes_syntaxiques"],
    },
    {
      titre: "La ponctuation dit où couper",
      texte:
        "Une virgule sépare, deux virgules détachent ce qu'elles enferment, un point ferme. Ce sont des consignes de découpage, pas des décorations.",
      schema: virgulesDetachent,
      micros: ["6e_flue_groupes_syntaxiques"],
    },
    {
      titre: "Le programme donne un repère chiffré",
      texte:
        "Environ 130 mots par minute en 6e. Ce n'est pas une note : c'est l'allure à partir de laquelle on comprend ce qu'on lit sans effort.",
      schema: paliers,
      micros: ["6e_flue_130_mots"],
    },
    {
      titre: "Le cycle monte par paliers",
      texte:
        "110 mots au CM1, 120 au CM2, 130 en 6e. Dix mots de plus par an : cela s'entraine, et cela se mesure en une minute chrono.",
      schema: paliers,
      micros: ["6e_flue_130_mots"],
    },
    {
      titre: "Le défi : un texte qu'on n'a jamais lu",
      texte:
        "Sans buter ni s'essouffler. Un mot long se lit par morceaux et l'on continue ; on ne s'arrête pas pour le déchiffrer lettre à lettre.",
      schema: motQuiFaitButer,
      micros: ["6e_flue_defi"],
    },
  ],
  reel: {
    texte:
      "La fluidité n'est pas une affaire de cours de français : c'est ce qui décide de tout le reste. Un élève qui lit à 70 mots par minute met deux fois plus de temps qu'un autre à lire le même énoncé de mathématiques — et il arrive à la question en ayant déjà oublié les données. Il ne comprend pas moins bien : il n'a pas eu le temps. C'est la même chose en histoire, en sciences, devant une consigne de contrôle ou un règlement. Et cela s'entraine comme un sport : relire à voix haute un texte qu'on connait déjà, chronométrer une minute, recommencer. Personne ne devient fluide en lisant plus difficile ; on le devient en relisant du facile jusqu'à ce que ça coule.",
  },
  historique: {
    texte:
      "Lire sans prononcer est une invention récente à l'échelle de l'écriture. Les textes de l'Antiquité s'écrivaient sans espaces entre les mots — SANSESPACESENTRELESMOTS —, et il fallait les dire à voix haute pour les découper. Ce sont les moines copistes irlandais qui, vers le VIIe siècle, se sont mis à séparer les mots : ils lisaient du latin, une langue qu'ils ne parlaient pas, et ils avaient besoin de voir où chaque mot commençait. L'espace entre les mots est donc une invention, au même titre que la ponctuation — et c'est elle qui a rendu possible la lecture silencieuse, puis rapide. Quand tu lis un groupe de mots d'un seul coup d'œil, tu utilises un outil vieux de treize siècles.",
  },
  formule: {
    contexte: "La règle qui dit où couper une phrase pour la lire d'un trait.",
    expression: "je coupe entre les groupes, jamais à l'intérieur",
    legende:
      "« Le vieux pêcheur du port » ne se coupe pas : l'adjectif tient au nom, le complément aussi. La coupe se met là où le sens change de morceau — entre celui dont on parle et ce qu'il fait. C'est exactement le même découpage que les groupes de souffle d'une lecture à voix haute.",
    schema: pile(lectureParGroupes, coupeFausse),
  },
  methode: [
    {
      titre: "Arrêter de prononcer",
      texte:
        "Lèvres immobiles, aucune voix intérieure qui articule. Tant qu'on prononce, on lit à la vitesse de la bouche — trois fois plus lentement que l'œil.",
      schema: lectureParGroupes,
      micros: ["6e_flue_silencieuse"],
    },
    {
      titre: "Repérer les groupes avant de lire",
      texte:
        "Qui ? fait quoi ? où ? quand ? Chaque réponse est un groupe, et l'œil le prend entier. Deux ou trois par ligne, pas huit.",
      schema: lectureParGroupes,
      micros: ["6e_flue_groupes_syntaxiques"],
    },
    {
      titre: "Suivre la ponctuation, pas les retours à la ligne",
      texte:
        "Une virgule, deux virgules, un point : ce sont eux qui donnent les coupes. La fin d'une ligne imprimée ne veut rien dire.",
      schema: virgulesDetachent,
      micros: ["6e_flue_groupes_syntaxiques"],
    },
    {
      titre: "S'entrainer sur du FACILE, en relisant",
      texte:
        "On ne devient pas fluide en lisant plus difficile. On relit trois fois un texte qu'on comprend, chronomètre en main, jusqu'à ce que ça coule.",
      schema: paliers,
      micros: ["6e_flue_130_mots"],
    },
  ],
  usages: [
    {
      titre: "Pour lire un long roman sans abandonner",
      detail:
        "À 70 mots par minute, trois cents pages sont un mur. À 130, c'est une histoire. La fluidité décide de ce qu'on peut lire.",
      schema: lectureParGroupes,
      micros: ["6e_flue_silencieuse"],
    },
    {
      titre: "Pour comprendre un énoncé du premier coup",
      detail:
        "Un énoncé mal découpé se relit trois fois. Bien découpé, il se comprend en une lecture — et il reste du temps pour chercher.",
      schema: virgulesDetachent,
      micros: ["6e_flue_groupes_syntaxiques"],
    },
    {
      titre: "Pour se mesurer soi-même",
      detail:
        "Une minute, un texte, on compte les mots lus. C'est le seul exercice de français où l'on voit ses progrès en chiffres, semaine après semaine.",
      schema: paliers,
      micros: ["6e_flue_130_mots"],
    },
  ],
  exemples: [
    {
      titre: "Ce qu'est vraiment lire silencieusement",
      donnees: "« Lire silencieusement, c'est lire… »",
      schema: lectureParGroupes,
      question: "En remuant les lèvres, à voix basse, ou sans prononcer les mots ?",
      solution:
        "SANS PRONONCER LES MOTS. La lecture silencieuse se fait entièrement dans la tête. Remuer les lèvres ou murmurer, c'est encore lire à la vitesse de la bouche — et la bouche est beaucoup plus lente que l'œil. C'est souvent la première chose à corriger quand on veut gagner en vitesse.",
      micros: ["6e_flue_silencieuse"],
    },
    {
      titre: "Où couper la phrase",
      donnees: "« Le vieux pêcheur du port répara son filet. »",
      schema: pile(lectureParGroupes, coupeFausse),
      question: "Où faut-il marquer la pause ?",
      solution:
        "APRÈS « PORT » : « Le vieux pêcheur du port / répara son filet. » Le premier groupe dit de qui on parle, le second ce qu'il fait. Couper après « vieux » séparerait l'adjectif de son nom ; couper après « répara » séparerait le verbe de son complément. On coupe entre les groupes, jamais dedans.",
      micros: ["6e_flue_groupes_syntaxiques"],
    },
    {
      titre: "Ce que disent deux virgules",
      donnees: "« Il arriva, épuisé, au sommet. »",
      schema: virgulesDetachent,
      question: "Que t'indiquent les deux virgules ?",
      solution:
        "QU'IL FAUT DÉTACHER « ÉPUISÉ » par deux courtes pauses. Les virgules vont par paire : ce qu'elles enferment est un ajout, qu'on isole du reste. Ce n'est ni un signal d'accélérer, ni une invitation à supprimer le mot — c'est un découpage, et il vaut pour la voix comme pour l'œil.",
      micros: ["6e_flue_groupes_syntaxiques"],
    },
    {
      titre: "Le repère du programme",
      donnees: "En 6e, l'objectif est de lire environ…",
      schema: paliers,
      question: "70, 100, 130 ou 200 mots par minute ?",
      solution:
        "130 MOTS PAR MINUTE. Le cycle 3 monte par paliers : 110 au CM1, 120 au CM2, 130 en 6e. Ce n'est pas une performance à exhiber — c'est l'allure à partir de laquelle on comprend sans effort ce qu'on lit, et donc à partir de laquelle lire cesse d'être fatigant.",
      micros: ["6e_flue_130_mots"],
    },
    {
      titre: "Se mesurer",
      donnees: "Tu lis 95 mots en une minute.",
      schema: paliers,
      question: "Que faut-il faire ?",
      solution:
        "T'ENTRAINER SUR DU FACILE, en relisant. On ne progresse pas en attaquant plus difficile : on relit deux ou trois fois un texte qu'on comprend déjà, jusqu'à ce qu'il coule — et l'on recommence sur un autre. Dix mots gagnés par an est le rythme normal du cycle ; on peut aller plus vite en s'y mettant vraiment.",
      micros: ["6e_flue_130_mots"],
    },
    {
      titre: "Le défi",
      donnees: "« Le sentier serpentait à flanc d'escarpement. »",
      schema: motQuiFaitButer,
      question: "Tu ne connais pas « escarpement ». Que fais-tu en lisant ?",
      solution:
        "Tu le lis PAR MORCEAUX — es-carpe-ment — sans t'arrêter, et tu continues. Buter dessus, revenir en arrière, le déchiffrer lettre à lettre : voilà ce qui casse la fluidité, et le sens de la phrase avec. Le mot inconnu se comprendra par la suite ; l'important est de ne pas rompre l'élan.",
      micros: ["6e_flue_defi"],
    },
  ],
  pieges: [
    "Croire que lire vite, c'est se dépêcher : on ne lit pas les mots plus vite, on en lit plusieurs à la fois.",
    "Remuer les lèvres ou murmurer : on lit alors à la vitesse de la bouche, trois fois plus lentement que l'œil.",
    "Couper à l'intérieur d'un groupe : « le vieux / pêcheur » brise le sens, et il faut revenir en arrière.",
    "S'arrêter à la fin de chaque ligne imprimée : c'est la ponctuation qui découpe, pas la mise en page.",
    "S'entrainer sur des textes trop difficiles : on progresse en relisant du facile, pas en attaquant du dur.",
    "Buter sur un mot long et le déchiffrer lettre à lettre : on le lit par morceaux et l'on continue.",
  ],
  aRetenir: [
    "Lire vite, ce n'est pas se dépêcher : c'est lire plusieurs mots à la fois.",
    "On coupe ENTRE les groupes de sens, jamais à l'intérieur.",
    "La ponctuation donne les coupes : une virgule sépare, deux virgules détachent.",
    "Lire silencieusement, c'est ne rien prononcer — pas même tout bas.",
    "Le repère : 110 mots au CM1, 120 au CM2, 130 en 6e.",
  ],
  entrainement: [
    {
      question: "Tu lis en remuant légèrement les lèvres. Est-ce de la lecture silencieuse ?",
      correction: "Non : tant qu'on articule, on lit à la vitesse de la bouche.",
      micros: ["6e_flue_silencieuse"],
    },
    {
      question: "« La petite fille du village chantait doucement. » Où coupes-tu ?",
      correction: "Après « village » : de qui on parle, puis ce qu'elle fait.",
      micros: ["6e_flue_groupes_syntaxiques"],
    },
    {
      question: "« Il partit, sans un mot, vers la forêt. » Que font les deux virgules ?",
      correction: "Elles détachent « sans un mot » : une courte pause de chaque côté.",
      micros: ["6e_flue_groupes_syntaxiques"],
    },
    {
      question: "Quel est l'objectif de fluidité au CM2 ?",
      correction: "120 mots par minute — 110 au CM1, 130 en 6e.",
      micros: ["6e_flue_130_mots"],
    },
    {
      question: "Comment progresser quand on lit à 95 mots par minute ?",
      correction: "En relisant plusieurs fois des textes FACILES, chronomètre en main.",
      micros: ["6e_flue_130_mots"],
    },
    {
      question: "Tu butes sur « incommensurable » au milieu d'une phrase. Que fais-tu ?",
      correction: "Tu le lis par morceaux et tu continues : ne pas rompre l'élan.",
      micros: ["6e_flue_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=6e",
};

export const slidesFluenceLecture6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Lire avec fluidité - 6e",
    section: {
      type: "objectif",
      phrase: "Lire vite, ce n'est pas se dépêcher",
      sousPhrase:
        "Un lecteur rapide ne lit pas les mots plus vite : il en lit plusieurs à la fois.",
      encadre: {
        titre: "L'idée",
        texte: "Huit arrêts par ligne, ou deux. C'est toute la différence.",
      },
    },
  },
  {
    titre: "Mot à mot, ou par groupes",
    badge: "Lire avec fluidité - 6e",
    section: {
      type: "duo",
      gauche: {
        titre: "Mot à mot",
        contenu: "Huit arrêts en une ligne. Au filet, on a déjà perdu le pêcheur.",
      },
      droite: {
        titre: "Par groupes de sens",
        contenu: "« Le vieux pêcheur du port » / « répara son filet ». Deux arrêts.",
      },
    },
    schema: pile(lectureMotAMot, lectureParGroupes),
  },
  {
    titre: "Où couper",
    badge: "Lire avec fluidité - 6e",
    section: {
      type: "etapes",
      etapes: [
        "Je cherche les groupes : qui ? fait quoi ? où ? quand ?",
        "Je coupe ENTRE les groupes, jamais à l'intérieur.",
        "Une virgule sépare ; deux virgules détachent ce qu'elles enferment.",
        "La fin d'une ligne imprimée ne veut rien dire : c'est la ponctuation qui décide.",
      ],
    },
    schema: pile(coupeFausse, virgulesDetachent),
  },
  {
    titre: "Les paliers du cycle",
    badge: "Lire avec fluidité - 6e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "CM1", texte: "110 mots par minute." },
        { titre: "CM2", texte: "120 mots par minute." },
        { titre: "6e", texte: "130 mots par minute — le repère du programme." },
        { titre: "Pourquoi", texte: "C'est l'allure à partir de laquelle lire cesse de fatiguer." },
      ],
    },
    schema: paliers,
  },
  {
    titre: "L'espace entre les mots est une invention",
    badge: "Lire avec fluidité - 6e",
    section: {
      type: "etapes",
      etapes: [
        "Les textes de l'Antiquité s'écrivaient sans espaces entre les mots.",
        "Il fallait les dire à voix haute pour savoir où chaque mot commençait.",
        "Des moines copistes ont commencé à les séparer vers le VIIe siècle.",
        "C'est cette invention qui a rendu possible la lecture silencieuse.",
      ],
    },
    schema: lectureParGroupes,
  },
  {
    titre: "À vous",
    badge: "Lire avec fluidité - 6e",
    section: {
      type: "exercice",
      enonce: "« Le vieux pêcheur du port répara son filet. »",
      question: "Où faut-il marquer la pause ?",
      indice: "Cherche les deux morceaux de sens : de qui parle-t-on, et que fait-il ?",
      correction:
        "Après « port ». Couper après « vieux » séparerait l'adjectif de son nom ; couper après « répara » séparerait le verbe de son complément.",
    },
    schema: pile(lectureParGroupes, coupeFausse),
  },
];
