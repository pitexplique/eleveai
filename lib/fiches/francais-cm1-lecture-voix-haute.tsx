// ─── Fiche de cours : lire à voix haute (CM1) ─────────────────────────────────
// DEUXIÈME FICHE DU CHANTIER CM1.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen première année ».
//
// ⛔⛔ SÉPARATION À TROIS COLONNES — obligatoire au CM1, où 21 notions sur 25
// portent un nom déjà pris par le CM2. Ici les trois classes se partagent le même
// pool MISE_EN_VOIX, et la ligne de partage est dans les micros :
//
//   | | CM1 (ici) | CM2 | 6e |
//   |---|---|---|---|
//   | les micros | rythme RÉGULIER, VOLUME et DÉBIT | articulation, effets, PLAISIR | préparer, émotions, DIALOGUE |
//   | le fil | ⭐ TROIS BOUTONS indépendants | on lit POUR QUELQU'UN, et il juge | le TON est ÉCRIT dans le texte |
//   | ce qu'il apporte | régler l'instrument | la raison de chaque règle | où lire l'indice du ton |
//
// ⛔ NE PAS REPRENDRE : « on ne lit pas à voix haute pour prouver qu'on sait lire,
// on lit pour quelqu'un » est l'accroche du CM2 — citée ici en UNE ligne, comme
// un acquis, jamais développée. « Le ton est écrit dans le texte, aux trois mêmes
// endroits » est celle de la 6e. Les deux blocs d'histoire sont pris aussi : le
// lector des ateliers de cigares (CM2) et l'écriture sans espaces (6e).
//
// ⭐⭐ LA DÉCOUVERTE, ET ELLE VIENT DU MICRO `cm1_voix_intensite` QUI NOMME DEUX
// CHOSES ET NON UNE — « régler le VOLUME ET LE DÉBIT » : CE SONT DEUX BOUTONS
// DIFFÉRENTS, ET TOUT LE MONDE LES CONFOND. Quand quelqu'un ne nous comprend pas,
// le réflexe est de parler PLUS FORT — alors que le problème est presque toujours
// qu'on parle TROP VITE. ⛔ Parler plus fort ne rend pas plus clair. On peut être
// parfaitement audible et parfaitement incompréhensible.
//
// ⭐ ET IL Y EN A UN TROISIÈME, que `cm1_voix_rythme` isole : LA RÉGULARITÉ. Ce
// n'est ni fort ni lent, c'est ÉGAL — et le micro dit pourquoi, « pour que
// l'AUDITOIRE SUIVE ». Une lecture qui accélère puis ralentit épuise celui qui
// écoute même sans être rapide, parce qu'il ne peut jamais se caler.
//
// ⭐⭐ D'OÙ LA RAISON PROFONDE, ET ELLE EXPLIQUE POURQUOI ON VA TOUJOURS TROP
// VITE : LE LECTEUR EST LE SEUL DE LA SALLE À CONNAITRE DÉJÀ LA PHRASE. Il ne
// lit pas, il REDIT ce que ses yeux viennent de prendre ; l'auditoire, lui,
// découvre. Lire à la vitesse où l'on comprend soi-même, c'est donc aller trop
// vite pour tous les autres.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises.
//
// Alignée sur le pool MISE_EN_VOIX de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `lecture_voix_haute`) :
// - cm1_flue_expressive → propriétés 1 et 2, méthode 1, usage 1, exemple 1
// - cm1_voix_rythme     → propriétés 3 à 5, méthode 2, usage 2, exemples 2 et 3
// - cm1_voix_intensite  → figure, propriétés 6 à 8, formule, méthode 3,
//                         usages 3 et 4, exemples 4 et 5
// - cm1_voix_defi       → propriétés 9 et 10, méthode 4, exemple 6

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
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

/** Les trois boutons. ⚠️ Cellules courtes : à la largeur d'un bloc, vingt signes
 *  tombent sous le plancher de 11 px. */
function grille(opts: {
  headers: string[];
  rows: { values: string[] }[];
  highlight?: { row?: number };
  caption?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "tableau_donnees",
        headers: opts.headers,
        rows: opts.rows,
        highlight: opts.highlight,
        caption: opts.caption,
        display: { compact: true, striped: true },
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

// ─── Ce qui se dessine quand on lit pour d'autres ─────────────────────────────

// ── ⭐⭐ LA FIGURE DE RÉFÉRENCE : trois boutons, et on en tourne un pour l'autre.
const grilleTroisBoutons = grille({
  headers: ["Le bouton", "Ce qu'il règle"],
  rows: [
    { values: ["le volume", "être entendu"] },
    { values: ["le débit", "être compris"] },
    { values: ["le rythme", "être suivi"] },
  ],
  caption: "Trois réglages indépendants — et on confond les deux premiers.",
});

const pasLeBonBouton = phrase({
  mots: [
    { texte: "plus fort", barre: true },
    { texte: "moins vite", focus: true },
  ],
  legende: "Quand on ne te comprend pas, ce n'est presque jamais le volume.",
});

// ── AISANCE ET EXPRESSIVITÉ.
const aisanceDabord = phrase({
  mots: [
    { texte: "sans buter" },
    { texte: "avec le ton", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "puis", type: "question" }],
  legende: "On ne met pas le ton sur un mot qu'on est en train de déchiffrer.",
});

const avoirDejaLu = phrase({
  mots: [
    { texte: "découvrir devant", barre: true },
    { texte: "avoir déjà lu", focus: true },
  ],
  legende: "On lit d'abord en silence, pour repérer les mots difficiles.",
});

// ── LE RYTHME.
const rythmeRegulier = phrase({
  mots: [
    { texte: "ça accélère", barre: true },
    { texte: "régulier", focus: true },
  ],
  legende: "Une lecture qui accélère puis ralentit épuise, même sans être rapide.",
});

const leLecteurSaitDeja = phrase({
  mots: [
    { texte: "toi" },
    { texte: "eux" },
  ],
  legende: "Tu connais déjà la phrase ; eux la découvrent. D'où la vitesse de trop.",
});

const pauseLaisseComprendre = phrase({
  mots: [
    { texte: "la pause" },
    { texte: "laisser comprendre", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "sert à", type: "question" }],
  legende: "Elle marque la ponctuation ET laisse le temps de comprendre.",
});

// ── LE VOLUME ET LE DÉBIT.
const audibleEtIncomprehensible = phrase({
  mots: [
    { texte: "on t'entend" },
    { texte: "on ne suit pas" },
  ],
  legende: "On peut être parfaitement audible et parfaitement incompréhensible.",
});

const fondDeLaSalle = phrase({
  mots: [
    { texte: "le premier rang", barre: true },
    { texte: "le dernier", focus: true },
  ],
  legende: "Le volume se règle sur celui qui est le plus loin.",
});

const crierNestPasParler = phrase({
  mots: [
    { texte: "crier", barre: true },
    { texte: "porter", focus: true },
  ],
  legende: "Une voix qui porte n'est pas une voix qui crie : elle est posée.",
});

// ── LE DÉFI.
const troisReglagesEnsemble = phrase({
  mots: [
    { texte: "un seul bouton", barre: true },
    { texte: "les trois", focus: true },
  ],
  legende: "Le défi du CM1 : régler les trois à la fois, et les tenir jusqu'au bout.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheLectureVoixHauteCm1: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm1",
  notion: "lecture-voix-haute",
  titre: `Lire à voix haute en CM1 (${ANNEE_SCOLAIRE})`,
  accroche:
    "Quand quelqu'un ne te comprend pas, ton réflexe est de parler PLUS FORT. C'est le mauvais bouton — presque toujours, le problème est que tu parles TROP VITE. Le volume et le débit sont deux réglages différents, et il en existe un troisième que personne ne pense à toucher : LA RÉGULARITÉ. Trois boutons indépendants, et lire à voix haute consiste exactement à les régler.",
  identite: [
    { label: "Mots clés", valeur: "Volume, débit, rythme, expressivité" },
    { label: "Le secret", valeur: "Plus fort ne veut pas dire plus clair" },
    { label: "Outil", valeur: "Le dernier rang t'entend-il ?" },
  ],
  definition: {
    texte:
      "LIRE À VOIX HAUTE, au CM1, c'est régler TROIS CHOSES qui n'ont rien à voir entre elles. LE VOLUME : assez fort pour le DERNIER RANG, pas pour le premier — et une voix qui porte n'est pas une voix qui crie, elle est posée. LE DÉBIT : assez lent pour qu'on te suive. ⛔ Et c'est là qu'est le piège : quand on ne te comprend pas, tu montes le volume, alors que c'est le débit qu'il faut baisser. On peut être parfaitement audible et parfaitement incompréhensible. LE RYTHME, enfin : RÉGULIER, pour que l'auditoire suive. Une lecture qui accélère puis ralentit épuise même sans être rapide, parce que celui qui écoute ne peut jamais se caler. ⭐ ET SI TU VAS TOUJOURS TROP VITE, VOICI POURQUOI : TU ES LE SEUL DE LA SALLE À CONNAITRE DÉJÀ LA PHRASE. Tes yeux l'ont prise avant ta bouche ; les autres la découvrent. Il faut donc lire plus lentement que la vitesse à laquelle tu comprends. L'AISANCE vient avant l'EXPRESSIVITÉ : on ne met pas le ton sur un mot qu'on est en train de déchiffrer — d'où la préparation, en silence d'abord.",
  },
  figure: {
    schema: pile(grilleTroisBoutons, pasLeBonBouton),
    legende:
      "Regarde la colonne de droite : trois problèmes différents, donc trois réglages différents. Être ENTENDU n'est pas être COMPRIS, et être compris n'est pas être SUIVI. C'est pour cela qu'on se trompe si souvent de bouton — on entend « je n'ai pas compris » et l'on monte le son, alors que la personne entendait très bien. En bas, la correction à retenir : neuf fois sur dix, ce n'est pas plus fort qu'il faut, c'est moins vite. Et cela ne coute rien : ralentir ne fatigue pas, crier si.",
  },
  proprietes: [
    {
      titre: "L'aisance vient avant le ton",
      texte:
        "On ne met pas le ton sur un mot qu'on déchiffre. Tant que la lecture coute, toute l'attention y passe et il n'en reste pas pour la voix.",
      schema: aisanceDabord,
      micros: ["cm1_flue_expressive"],
    },
    {
      titre: "Donc on lit d'abord en silence",
      texte:
        "Pour repérer les mots difficiles avant qu'ils n'arrivent. Découvrir un texte devant la classe, c'est se condamner à buter en public.",
      schema: avoirDejaLu,
      micros: ["cm1_flue_expressive"],
    },
    {
      titre: "Le rythme doit être régulier",
      texte:
        "Ni fort ni lent : ÉGAL. Une lecture qui accélère puis ralentit épuise l'auditoire, parce qu'il ne peut jamais se caler dessus.",
      schema: rythmeRegulier,
      micros: ["cm1_voix_rythme"],
    },
    {
      titre: "Tu es le seul à connaitre la phrase",
      texte:
        "Tes yeux l'ont prise avant ta bouche ; les autres la découvrent. C'est toute l'explication de la vitesse de trop.",
      schema: leLecteurSaitDeja,
      micros: ["cm1_voix_rythme"],
    },
    {
      titre: "La pause laisse comprendre",
      texte:
        "Elle marque la ponctuation, et elle donne à l'auditoire le temps de rattraper. Un texte sans pause file sans qu'on le suive.",
      schema: pauseLaisseComprendre,
      micros: ["cm1_voix_rythme"],
    },
    {
      titre: "Le volume se règle sur le dernier rang",
      texte:
        "Pas sur celui qui est devant toi, ni sur le maitre. Celui qui est le plus loin est la mesure — s'il entend, tout le monde entend.",
      schema: fondDeLaSalle,
      micros: ["cm1_voix_intensite"],
    },
    {
      titre: "Une voix qui porte ne crie pas",
      texte:
        "Elle est posée, appuyée sur le souffle. Crier fatigue en trois minutes et déforme les mots : on t'entend plus fort et l'on te comprend moins.",
      schema: crierNestPasParler,
      micros: ["cm1_voix_intensite"],
    },
    {
      titre: "Audible n'est pas compréhensible",
      texte:
        "Ce sont deux boutons. On peut t'entendre parfaitement et ne rien suivre — c'est même le cas le plus fréquent.",
      schema: audibleEtIncomprehensible,
      micros: ["cm1_voix_intensite"],
    },
    {
      titre: "Le défi : tenir les trois à la fois",
      texte:
        "Le volume, le débit, la régularité. Chacun est facile seul ; c'est ensemble, et sur une page entière, que cela devient un exercice.",
      schema: troisReglagesEnsemble,
      micros: ["cm1_voix_defi"],
    },
    {
      titre: "Et l'auditoire est le juge",
      texte:
        "C'est ce que le CM2 formulera pour de bon. Retiens déjà la conséquence : ce n'est pas le nombre d'erreurs qui dit si c'est réussi.",
      schema: troisReglagesEnsemble,
      micros: ["cm1_voix_defi"],
    },
  ],
  reel: {
    texte:
      "Tu as déjà vu la scène, et peut-être sans la comprendre : quelqu'un parle à une personne qui entend mal, ne se fait pas comprendre, et se met à crier. Cela ne marche presque jamais. Ce qui marche, c'est de ralentir et d'articuler — et souvent la personne répond alors du premier coup, sans qu'on ait élevé la voix d'un décibel. C'est la même erreur qu'en classe : « on ne t'entend pas » et « on ne te suit pas » sont deux phrases différentes, et l'on répond à la seconde comme à la première. Écoute bien ce qu'on te dit exactement la prochaine fois : la plainte t'indique le bouton.",
  },
  historique: {
    texte:
      "Avant les micros, les acteurs devaient porter leur voix devant des milliers de personnes en plein air — et le problème a été résolu par L'ARCHITECTURE, pas par les cris. Le théâtre d'Épidaure, en Grèce, est construit en gradins de pierre très inclinés, et l'on y entend depuis les derniers rangs, à plus de cinquante mètres, une voix qui ne force pas. Les bancs eux-mêmes filtrent une partie des bruits de fond et renvoient le son vers le haut. Autrement dit, la civilisation qui a le plus eu besoin de se faire entendre n'a pas appris à hurler : elle a construit des salles où une voix posée suffisait. Le bon réglage n'a jamais été le volume.",
  },
  formule: {
    contexte: "La question qui règle le volume, et il n'y en a qu'une.",
    expression: "le dernier rang t'entend-il ?",
    legende:
      "Pas le premier rang, pas le maitre à côté de toi : celui qui est le plus loin. S'il entend, tout le monde entend, et tu peux arrêter de monter. Et si l'on te dit « on ne comprend pas », change de bouton — ce n'est pas le volume, c'est le débit.",
    schema: fondDeLaSalle,
  },
  methode: [
    {
      titre: "Lire le texte en silence avant",
      texte:
        "Une fois suffit pour repérer les mots qui vont te faire buter. Tu les prépares, et ils n'arriveront plus par surprise devant la classe.",
      schema: avoirDejaLu,
      micros: ["cm1_flue_expressive"],
    },
    {
      titre: "Se donner un tempo, et s'y tenir",
      texte:
        "Choisis une allure au début et garde-la. La régularité se sent tout de suite : l'auditoire se cale dessus sans y penser.",
      schema: rythmeRegulier,
      micros: ["cm1_voix_rythme"],
    },
    {
      titre: "Viser quelqu'un au fond",
      texte:
        "Choisis une personne au dernier rang et parle pour elle. Le volume se règle tout seul, sans que tu aies à y penser.",
      schema: fondDeLaSalle,
      micros: ["cm1_voix_intensite"],
    },
    {
      titre: "Écouter la plainte qu'on te fait",
      texte:
        "« On ne t'entend pas » → monte le volume. « On ne comprend pas » → baisse le débit. Deux plaintes, deux boutons, jamais le même.",
      schema: pasLeBonBouton,
      micros: ["cm1_voix_defi"],
    },
  ],
  usages: [
    {
      titre: "Pour lire un texte devant la classe",
      detail:
        "C'est l'exercice lui-même, et il commence avant : une lecture silencieuse préalable fait la moitié du travail.",
      schema: avoirDejaLu,
      micros: ["cm1_flue_expressive"],
    },
    {
      titre: "Pour qu'on te suive jusqu'au bout",
      detail:
        "La régularité est ce qui évite le décrochage. Un auditoire décroche moins par ennui que par incapacité à se caler.",
      schema: rythmeRegulier,
      micros: ["cm1_voix_rythme"],
    },
    {
      titre: "Pour ne pas s'épuiser en trois minutes",
      detail:
        "Crier fatigue vite et déforme les mots. Une voix posée tient une page entière sans que tu aies mal à la gorge.",
      schema: crierNestPasParler,
      micros: ["cm1_voix_intensite"],
    },
    {
      titre: "Pour te faire comprendre partout, pas qu'en classe",
      detail:
        "Au téléphone, devant un guichet, avec quelqu'un qui entend mal : ralentir marche presque toujours mieux que hausser la voix.",
      schema: pasLeBonBouton,
      micros: ["cm1_voix_intensite"],
    },
  ],
  exemples: [
    {
      titre: "Préparer une lecture",
      donnees: "« Avant de lire un texte long devant la classe, la meilleure préparation est de… »",
      schema: avoirDejaLu,
      question: "De quoi faire ?",
      solution:
        "LE LIRE D'ABORD EN SILENCE POUR REPÉRER LES MOTS DIFFICILES. Pas l'apprendre par cœur, pas le lire une fois très vite. On repère ce qui va faire buter — et l'on ne bute plus en public, ce qui laisse enfin de la place pour le ton.",
      micros: ["cm1_flue_expressive"],
    },
    {
      titre: "Une lecture qui perd son auditoire",
      donnees: "Tu lis fort et sans faute, et pourtant on décroche.",
      schema: rythmeRegulier,
      question: "Quel bouton n'est pas réglé ?",
      solution:
        "LE RYTHME. Si ta lecture accélère puis ralentit, ceux qui écoutent ne peuvent jamais se caler dessus, et cela fatigue plus qu'une lecture rapide mais régulière. Le micro du programme le dit dans ses termes : un rythme régulier POUR QUE L'AUDITOIRE SUIVE.",
      micros: ["cm1_voix_rythme"],
    },
    {
      titre: "La pause",
      donnees: "« À quoi sert une PAUSE dans une lecture à voix haute ? »",
      schema: pauseLaisseComprendre,
      question: "À quoi sert-elle ?",
      solution:
        "À MARQUER LA PONCTUATION ET À LAISSER COMPRENDRE. Les deux ensemble : ce n'est pas seulement un signe qu'on respecte, c'est du temps qu'on donne. Sans pauses, le texte file et l'auditoire reste une phrase en arrière.",
      micros: ["cm1_voix_rythme"],
    },
    {
      titre: "Le mauvais bouton",
      donnees: "On te dit : « On ne comprend rien. » Tu montes la voix.",
      schema: pasLeBonBouton,
      question: "Est-ce le bon réglage ?",
      solution:
        "NON. On te dit qu'on ne COMPREND pas, pas qu'on n'ENTEND pas. Ce sont deux boutons différents : la réponse est de RALENTIR. Monter le volume rendra la même chose incompréhensible, mais plus fort — et te fatiguera en trois minutes.",
      micros: ["cm1_voix_intensite"],
    },
    {
      titre: "Régler le volume",
      donnees: "Tu ne sais pas si tu parles assez fort.",
      schema: fondDeLaSalle,
      question: "Sur qui te règles-tu ?",
      solution:
        "SUR LE DERNIER RANG. Choisis quelqu'un au fond et parle pour cette personne : si elle entend, tout le monde entend, et tu peux cesser de monter. Se régler sur le premier rang, c'est être inaudible pour la moitié de la classe.",
      micros: ["cm1_voix_intensite"],
    },
    {
      titre: "Le défi",
      donnees: "Tu dois lire une page entière devant la classe.",
      schema: troisReglagesEnsemble,
      question: "Que dois-tu tenir en même temps ?",
      solution:
        "LES TROIS RÉGLAGES : le volume, le débit, la régularité. Chacun est facile tout seul ; c'est ensemble, et sur une page entière, que cela devient un exercice. Et n'oublie pas la raison de la lenteur : tu es le seul de la salle à connaitre déjà la phrase.",
      micros: ["cm1_voix_defi"],
    },
  ],
  pieges: [
    "Monter le volume quand on te dit qu'on ne comprend pas : mauvais bouton.",
    "Crier au lieu de poser sa voix : cela fatigue et déforme les mots.",
    "Se régler sur le premier rang : la moitié de la classe n'entend pas.",
    "Lire à la vitesse où tu comprends : les autres découvrent la phrase.",
    "Accélérer puis ralentir : l'auditoire ne peut jamais se caler.",
    "Sauter les pauses : elles donnent le temps de comprendre.",
    "Découvrir le texte devant la classe : on bute alors en public.",
  ],
  aRetenir: [
    "Trois boutons indépendants : le volume, le débit, le rythme.",
    "Plus fort ne veut pas dire plus clair — on peut être audible et incompris.",
    "Le volume se règle sur le dernier rang ; une voix qui porte ne crie pas.",
    "Tu es le seul à connaitre déjà la phrase : lis plus lentement que tu ne comprends.",
    "L'aisance vient avant le ton : on lit en silence d'abord.",
  ],
  entrainement: [
    {
      question: "« Avant de lire un texte long devant la classe, la meilleure préparation est de… »",
      correction: "Le lire d'abord en silence pour repérer les mots difficiles.",
      micros: ["cm1_flue_expressive"],
    },
    {
      question: "« À quoi sert une PAUSE dans une lecture à voix haute ? »",
      correction: "À marquer la ponctuation et à laisser comprendre.",
      micros: ["cm1_voix_rythme"],
    },
    {
      question: "Pourquoi le rythme doit-il être régulier ?",
      correction: "Pour que l'auditoire puisse se caler dessus et suivre.",
      micros: ["cm1_voix_rythme"],
    },
    {
      question: "On te dit « on ne comprend rien ». Que règles-tu ?",
      correction: "Le débit — tu ralentis. Pas le volume.",
      micros: ["cm1_voix_intensite"],
    },
    {
      question: "Sur qui règles-tu ton volume ?",
      correction: "Sur le dernier rang : s'il entend, tout le monde entend.",
      micros: ["cm1_voix_intensite"],
    },
    {
      question: "Pourquoi lis-tu presque toujours trop vite ?",
      correction: "Parce que tu es le seul à connaitre déjà la phrase.",
      micros: ["cm1_voix_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm1",
};

export const slidesLectureVoixHauteCm1: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Lire à voix haute - CM1",
    section: {
      type: "objectif",
      phrase: "Plus fort ne veut pas dire plus clair",
      sousPhrase:
        "Le volume et le débit sont deux boutons différents. On les confond tout le temps.",
      encadre: {
        titre: "L'idée",
        texte: "On peut être parfaitement audible et parfaitement incompréhensible.",
      },
    },
  },
  {
    titre: "Trois boutons",
    badge: "Lire à voix haute - CM1",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le volume", texte: "Pour être ENTENDU. Se règle sur le dernier rang." },
        { titre: "Le débit", texte: "Pour être COMPRIS. Se baisse quand on décroche." },
        { titre: "Le rythme", texte: "Pour être SUIVI. Régulier, pas rapide ni lent." },
        { titre: "⛔ L'erreur", texte: "Répondre à « je ne comprends pas » par du volume." },
      ],
    },
    schema: grilleTroisBoutons,
  },
  {
    titre: "Pourquoi tu vas trop vite",
    badge: "Lire à voix haute - CM1",
    section: {
      type: "etapes",
      etapes: [
        "Tes yeux prennent la phrase avant ta bouche.",
        "Tu ne lis pas : tu REDIS ce que tu viens de lire.",
        "Les autres, eux, la découvrent au même instant.",
        "⭐ Il faut donc lire plus lentement que tu ne comprends.",
      ],
    },
    schema: leLecteurSaitDeja,
  },
  {
    titre: "Une voix qui porte ne crie pas",
    badge: "Lire à voix haute - CM1",
    section: {
      type: "duo",
      gauche: {
        titre: "Crier",
        contenu: "Fatigue en trois minutes, et déforme les mots. Plus fort, moins clair.",
      },
      droite: {
        titre: "Porter",
        contenu: "Voix posée, appuyée sur le souffle. Tient une page entière.",
      },
    },
    schema: crierNestPasParler,
  },
  {
    titre: "Épidaure",
    badge: "Lire à voix haute - CM1",
    section: {
      type: "etapes",
      etapes: [
        "Avant les micros, il fallait porter sa voix devant des milliers de gens.",
        "Le théâtre d'Épidaure porte une voix posée à plus de cinquante mètres.",
        "Les gradins de pierre filtrent les bruits et renvoient le son.",
        "⭐ On a construit mieux plutôt que de crier plus fort.",
      ],
    },
    schema: fondDeLaSalle,
  },
  {
    titre: "À vous",
    badge: "Lire à voix haute - CM1",
    section: {
      type: "exercice",
      enonce: "On te dit : « On ne comprend rien. » Tu montes la voix.",
      question: "Est-ce le bon réglage ?",
      indice: "Relis exactement ce qu'on t'a dit.",
      correction:
        "NON. On te dit qu'on ne COMPREND pas, pas qu'on n'ENTEND pas. Il faut RALENTIR. Monter le volume rend la même chose incompréhensible, mais plus fort.",
    },
    schema: pasLeBonBouton,
  },
];
