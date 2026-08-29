// ─── Fiche de cours : lire avec fluidité (CM2) ────────────────────────────────
// PREMIÈRE FICHE DU CHANTIER CM2 DU 29/08/2026.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen deuxième année ». ⛔ C'est LE MÊME
// PROGRAMME QUE LA 6e — le CM2 traverse le cycle que la 6e ferme.
//
// ⛔⛔ ET C'EST UN PIÈGE D'UN GENRE NOUVEAU. Avec la 5e et la 6e, deux notions
// homonymes relevaient de deux PROGRAMMES différents : il suffisait de lire le
// bon texte. Ici le texte est le même, et `fluence_lecture` existe des deux
// côtés. La séparation ne vient donc pas du programme mais des MICROS, et il
// faut les comparer une par une :
//
//   | 6e (`francais-6e-fluence-lecture.tsx`) | CM2 (ici) |
//   |---|---|
//   | la lecture SILENCIEUSE, et sa vitesse | la lecture à voix haute d'un texte LONG |
//   | les GROUPES DE SENS qui expliquent la vitesse | ce qu'on PRÉPARE avant de lire |
//   | 130 mots par minute | 120 mots par minute |
//   | — | les LIAISONS, nommées par le BO au CM2 |
//
// ⭐ La découverte des groupes de sens appartient à la fiche de 6e et n'est pas
// refaite ici : elle y est citée en un mot, comme un acquis.
//
// ⭐⭐ LA DÉCOUVERTE DE CETTE FICHE : LA FLUENCE SE PRÉPARE — ELLE NE SE CONSTATE
// PAS. Le micro le dit en toutes lettres : « Lire à voix haute un texte long
// APRÈS PRÉPARATION ». Un élève à qui l'on tend un texte inconnu et qu'on
// chronomètre n'est pas évalué sur sa fluence : il est évalué sur son
// déchiffrage, qui est une autre compétence. La fluence, au CM2, est ce qu'on
// obtient APRÈS avoir regardé le texte — et cela change ce qu'on demande à
// l'élève de faire pendant les deux minutes qui précèdent.
//
// ⭐⭐ ET CE QU'ON PRÉPARE, LE SECOND MICRO LE NOMME : « ponctuation, LIAISONS et
// unités syntaxiques ». La liaison est ici l'objet propre au CM2, et elle a une
// particularité que rien d'autre ne partage : C'EST LE SEUL ÉLÉMENT D'UNE
// LECTURE À VOIX HAUTE QUI N'EST ÉCRIT NULLE PART. La ponctuation est imprimée ;
// les groupes se déduisent de la phrase ; la liaison, elle, ne se voit pas — et
// s'entend pourtant dès qu'elle manque. C'est pour cela qu'elle s'oublie, et
// c'est pour cela qu'elle se prépare.
//
// ⭐ ELLE SE DESSINE, ET C'EST NEUF : un arc étiqueté « un z » entre « les » et
// « enfants ». Le son est sur l'arc parce qu'il n'est dans aucun des deux mots.
// Et le dessin SANS arc montre la lecture hachée — le crochet absent comme
// diagnostic, une fois de plus.
//
// ⭐ `number_line` porte les trois paliers du cycle (110 au CM1, 120 au CM2, 130
// en 6e). Le même dessin sert dans la fiche de 6e, avec l'autre repère mis en
// avant : c'est voulu, c'est le même axe et l'élève doit y retrouver sa place.
// ⚠️ Points à 110/120/130 dans un axe 100..140 : jamais sur une borne.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises. ⛔ Bande `nature` centrée sur son mot.
//
// Alignée sur les items `cm2_fr_fixed_fluence_*` de
// lib/tutor-v4/questionBank/cm2/francais/fixed.bank.ts, et sur le pool LECTURE
// de lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `fluence_lecture`) :
// - cm2_flue_texte_long        → figure, propriétés 1 à 3, formule, méthode 1,
//                                usage 1, exemples 1 et 2
// - cm2_flue_unites_syntaxiques → propriétés 4 à 7, méthodes 2 et 3, usage 2,
//                                exemples 3 et 4
// - cm2_flue_120_mots          → propriétés 8 et 9, méthode 4, usage 3, exemple 5
// - cm2_flue_defi              → propriété 10, usage 4, exemple 6

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

/** Les trois paliers du cycle. ⚠️ Ici `showValues` est VRAI : ce sont de vrais
 *  nombres, et c'est ce que la droite doit montrer. Points à 110/120/130 dans un
 *  axe 100..140 — jamais sur une borne, sinon l'étiquette déborde. */
function paliers(points: NumberLineCanvasPoint[]) {
  return (
    <CanvasRenderer
      figure={{
        kind: "number_line",
        min: 100,
        max: 140,
        step: 10,
        points,
        size: { width: 235, height: 82 },
        display: { showTicks: true, showValues: true, showZero: false },
      }}
    />
  );
}

/** Ce qu'on prépare, et ce que cela donne à entendre. ⚠️ Cellules courtes : à la
 *  largeur d'un bloc, vingt signes tombent sous le plancher de 11 px. */
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

// ─── Ce qui se dessine quand on prépare une lecture ───────────────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : la préparation vient avant la vitesse.
const preparerPuisLire = phrase({
  mots: [
    { texte: "préparer", focus: true },
    { texte: "puis lire" },
  ],
  liens: [{ de: 0, vers: 1, label: "avant", type: "question" }],
  legende: "Le programme dit « après préparation » : la fluence ne se constate pas à froid.",
});

const grillePreparer = grille({
  headers: ["Ce qu'on prépare", "Ce qu'on entend"],
  rows: [
    { values: ["la ponctuation", "les pauses"] },
    { values: ["les groupes", "le sens"] },
    { values: ["les liaisons", "ça coule"] },
    { values: ["les mots durs", "aucun blocage"] },
  ],
  caption: "Deux minutes avant, et la lecture change de nature.",
});

const grillePreparerLiaisons = grille({
  headers: ["Ce qu'on prépare", "Ce qu'on entend"],
  rows: [
    { values: ["la ponctuation", "les pauses"] },
    { values: ["les groupes", "le sens"] },
    { values: ["les liaisons", "ça coule"] },
    { values: ["les mots durs", "aucun blocage"] },
  ],
  highlight: { row: 2 },
  caption: "La seule des quatre qui n'est écrite nulle part.",
});

// ── ⭐⭐ LA LIAISON, DESSINÉE. Le son est SUR l'arc, parce qu'il n'est dans
// aucun des deux mots — et c'est exactement ce qui la rend oubliable.
const liaisonEntendue = phrase({
  mots: [
    { texte: "les" },
    { texte: "enfants" },
  ],
  liens: [{ de: 0, vers: 1, label: "un z", type: "question" }],
  legende: "Ce « z » n'est écrit nulle part — et il s'entend dès qu'il manque.",
});

// ⭐ SANS ARC : la lecture hachée. Le vide est le diagnostic.
const liaisonAbsente = phrase({
  mots: [
    { texte: "les", focus: true },
    { texte: "enfants", focus: true },
  ],
  legende: "Rien entre les deux : « les… enfants ». La lecture hache, et cela s'entend.",
});

// ── LA PONCTUATION ENTENDUE.
const pauseALaVirgule = phrase({
  mots: [
    { texte: "la nuit tomba" },
    { texte: ",", focus: true },
    { texte: "les villageois" },
  ],
  legende: "La virgule ferme un groupe : la pause est là, jamais à l'intérieur d'un mot.",
});

const jamaisDansUnMot = phrase({
  mots: [
    { texte: "vil-lageois", barre: true },
    { texte: "villageois", focus: true },
  ],
  legende: "On ne coupe pas un mot en lisant, même long : on le franchit d'un trait.",
});

// ── LE PALIER DU CM2.
const troisPaliers = paliers([
  { value: 110, label: "CM1" },
  { value: 120, label: "CM2" },
  { value: 130, label: "6e" },
]);

const bonRythme = phrase({
  mots: [
    { texte: "le plus vite", barre: true },
    { texte: "sans trainer", focus: true },
  ],
  legende: "« Autour de 120 » veut dire un bon rythme — ni pressé, ni trainant.",
});

// ── LE DÉFI : le mot difficile qui ne casse pas la phrase.
const motDifficile = phrase({
  mots: [
    { texte: "un mot dur" },
    { texte: "en syllabes", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "se franchit", type: "question" }],
  legende: "On le découpe, on continue — et le rythme de la phrase ne s'arrête pas.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheFluenceLectureCm2: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm2",
  notion: "fluence-lecture",
  titre: "Lire avec fluidité en CM2 (2026-2027)",
  accroche:
    "LA FLUENCE SE PRÉPARE — elle ne se constate pas. Le programme demande de lire un texte long à voix haute « après préparation », et ces deux mots changent tout : on ne te tend pas un texte inconnu pour te chronométrer. Deux minutes avant, tu regardes quatre choses — la ponctuation, les groupes, les mots difficiles, et LES LIAISONS. Cette dernière est la seule qui n'est écrite nulle part.",
  identite: [
    { label: "Mots clés", valeur: "Préparation, liaison, ponctuation, 120 mots" },
    { label: "Le secret", valeur: "La liaison n'est écrite nulle part" },
    { label: "Outil", valeur: "Deux minutes de préparation" },
  ],
  definition: {
    texte:
      "Lire avec FLUIDITÉ au CM2, c'est lire à voix haute un TEXTE LONG, APRÈS PRÉPARATION — et cette préparation fait partie de l'exercice, elle n'est pas une faveur. On y regarde quatre choses. LA PONCTUATION, qui dit où faire les pauses : une virgule ferme un groupe, et l'on ne fait jamais de pause à l'intérieur d'un mot. LES UNITÉS SYNTAXIQUES, c'est-à-dire les groupes de mots qui vont ensemble et se lisent d'un trait. LES MOTS DIFFICILES, qu'on repère à l'avance pour les franchir sans casser la phrase — on les découpe en syllabes et l'on continue. Et LES LIAISONS : ce « z » qu'on entend entre « les » et « enfants », qui n'est écrit dans aucun des deux mots, et dont l'absence s'entend aussitôt. Le repère de vitesse du CM2 est d'environ 120 MOTS PAR MINUTE — 110 au CM1, 130 en 6e —, et « autour de 120 » veut dire à un bon rythme : ni se presser, ni trainer, et toujours en comprenant ce qu'on lit.",
  },
  figure: {
    schema: pile(liaisonEntendue, liaisonAbsente),
    legende:
      "En haut, un son posé sur l'arc et non dans les mots : c'est bien là qu'il vit. Le « z » de « les enfants » ne s'écrit ni à la fin de « les », ni au début de « enfants » — il nait de leur rencontre, et il disparait si l'on prononce les deux séparément. En bas, exactement cela : plus d'arc, et la lecture hache. C'est le seul élément d'une lecture à voix haute que la page ne montre pas — la ponctuation est imprimée, les groupes se devinent, la liaison non. Voilà pourquoi elle s'oublie, et voilà pourquoi elle se prépare.",
  },
  proprietes: [
    {
      titre: "Le programme dit « après préparation »",
      texte:
        "Ces deux mots sont dans le texte officiel. Lire à froid un texte inconnu ne mesure pas ta fluidité : cela mesure ton déchiffrage, qui est autre chose.",
      schema: preparerPuisLire,
      micros: ["cm2_flue_texte_long"],
    },
    {
      titre: "Quatre choses se préparent",
      texte:
        "La ponctuation, les groupes, les liaisons, les mots difficiles. Deux minutes avant, et la lecture change de nature — pas parce que tu lis mieux, mais parce que rien ne te surprend.",
      schema: grillePreparer,
      micros: ["cm2_flue_texte_long"],
    },
    {
      titre: "Un texte long se prépare par morceaux",
      texte:
        "On ne prépare pas une page entière d'un coup. Un paragraphe, puis le suivant — et l'on repère surtout ce qui risque de faire buter.",
      schema: preparerPuisLire,
      micros: ["cm2_flue_texte_long"],
    },
    {
      titre: "La virgule ferme un groupe",
      texte:
        "C'est là que la petite pause se fait. Jamais entre un déterminant et son nom, jamais à l'intérieur d'un mot, même long.",
      schema: pauseALaVirgule,
      micros: ["cm2_flue_unites_syntaxiques"],
    },
    {
      titre: "Un mot ne se coupe pas en lisant",
      texte:
        "Même s'il est difficile. On le découpe dans sa tête, on le dit d'un trait — couper à voix haute casse la phrase pour celui qui écoute.",
      schema: jamaisDansUnMot,
      micros: ["cm2_flue_unites_syntaxiques"],
    },
    {
      titre: "La liaison n'est écrite nulle part",
      texte:
        "Le « z » de « les enfants » n'est ni à la fin du premier mot, ni au début du second : il nait de leur rencontre. C'est pour cela qu'on l'oublie.",
      schema: liaisonEntendue,
      micros: ["cm2_flue_unites_syntaxiques"],
    },
    {
      titre: "Et son absence s'entend aussitôt",
      texte:
        "« Les… enfants » : la lecture hache, et celui qui écoute le remarque avant de savoir pourquoi. C'est un des signes d'une lecture non préparée.",
      schema: pile(liaisonAbsente, grillePreparerLiaisons),
      micros: ["cm2_flue_unites_syntaxiques"],
    },
    {
      titre: "Environ 120 mots par minute au CM2",
      texte:
        "110 au CM1, 120 au CM2, 130 en 6e. C'est un repère du cycle, et il monte d'année en année : tu n'es pas censé lire aujourd'hui comme en 6e.",
      schema: troisPaliers,
      micros: ["cm2_flue_120_mots"],
    },
    {
      titre: "« Autour de 120 » n'est pas « le plus vite possible »",
      texte:
        "C'est un bon rythme : ni se presser, ni trainer. Lire vite sans comprendre ne compte pas — la fluidité sert la compréhension, elle ne la remplace pas.",
      schema: bonRythme,
      micros: ["cm2_flue_120_mots"],
    },
    {
      titre: "Le défi : franchir sans s'arrêter",
      texte:
        "Un mot difficile se découpe en syllabes et se franchit. Ce qui compte n'est pas de ne jamais buter : c'est que la phrase continue.",
      schema: motDifficile,
      micros: ["cm2_flue_defi"],
    },
  ],
  reel: {
    texte:
      "Personne ne lit bien un texte qu'il découvre — pas même les adultes dont c'est le métier. Un présentateur de journal télévisé a son texte sous les yeux et il l'a lu avant ; un comédien qui enregistre un livre audio prépare chaque page. Quand tu entends une lecture qui coule, tu n'entends pas quelqu'un de doué : tu entends quelqu'un qui a préparé. Et la liaison, tu la fais déjà sans y penser quand tu parles — « les enfants », « un grand arbre », « on est arrivés ». Ce qui la fait disparaitre, c'est de lire mot à mot, en regardant chaque mot séparément : à ce moment-là, les mots cessent de se toucher, et le son qui naissait entre eux n'a plus où naitre.",
  },
  historique: {
    texte:
      "La liaison est le fantôme d'une prononciation ancienne. En ancien français, on prononçait les consonnes finales : le « s » de « les », le « t » de « petit », le « n » de « bon ». Au fil des siècles, ces consonnes se sont tues à la fin des mots — mais elles ont survécu à un seul endroit, quand le mot suivant commence par une voyelle. « Les enfants » garde donc, dans son « z », la trace d'un « s » qu'on ne prononce plus nulle part ailleurs. C'est ce qui explique une bizarrerie du français : on écrit des lettres qu'on ne dit jamais, sauf de temps en temps. Elles ne sont pas là par caprice — elles sont là parce qu'on les a dites, et qu'elles reviennent quand deux mots se touchent.",
  },
  formule: {
    contexte: "Ce qu'on fait des deux minutes qui précèdent une lecture à voix haute.",
    expression: "où est-ce que je vais buter ?",
    legende:
      "Un mot long, un nom qu'on ne connait pas, une phrase qui n'en finit pas. Repère-les et règle-les d'avance : c'est tout ce que « préparer » veut dire. Ce n'est pas apprendre le texte — c'est enlever les surprises, et il n'y en a jamais plus de trois ou quatre.",
    schema: preparerPuisLire,
  },
  methode: [
    {
      titre: "Lire une fois en silence, crayon à la main",
      texte:
        "Souligne les mots difficiles, marque d'un trait les endroits où tu respires. Deux minutes, et tu ne découvriras plus rien à voix haute.",
      schema: grillePreparer,
      micros: ["cm2_flue_texte_long"],
    },
    {
      titre: "Suivre la ponctuation, pas le souffle",
      texte:
        "La pause se met à la virgule et au point, pas quand tu manques d'air. Si tu manques d'air, c'est que tu n'as pas respiré à la virgule d'avant.",
      schema: pauseALaVirgule,
      micros: ["cm2_flue_unites_syntaxiques"],
    },
    {
      titre: "Chercher les mots qui se touchent",
      texte:
        "Un petit mot suivi d'une voyelle : « les enfants », « un arbre », « nous avons ». La liaison est là, et elle ne se voit pas — repère-la avant.",
      schema: liaisonEntendue,
      micros: ["cm2_flue_unites_syntaxiques"],
    },
    {
      titre: "Se chronométrer sur un texte préparé",
      texte:
        "Sinon la mesure ne dit rien de ta fluidité. Un texte préparé, une minute, et l'on compte les mots : c'est ainsi que le repère a du sens.",
      schema: troisPaliers,
      micros: ["cm2_flue_120_mots"],
    },
  ],
  usages: [
    {
      titre: "Pour lire devant la classe sans trembler",
      detail:
        "Ce qui rassure n'est pas le courage : c'est de savoir qu'aucun mot ne va te surprendre. Et cela se règle en deux minutes, pas en confiance.",
      schema: preparerPuisLire,
      micros: ["cm2_flue_texte_long"],
    },
    {
      titre: "Pour qu'on te comprenne du premier coup",
      detail:
        "Les pauses aux bons endroits font plus pour la compréhension que la vitesse. Un lecteur lent mais bien découpé se suit très bien.",
      schema: pauseALaVirgule,
      micros: ["cm2_flue_unites_syntaxiques"],
    },
    {
      titre: "Pour savoir où tu en es",
      detail:
        "120 au CM2, et 130 l'an prochain. Si tu es à 100, tu n'es pas en retard : tu es à un palier, et il monte avec de l'entrainement.",
      schema: troisPaliers,
      micros: ["cm2_flue_120_mots"],
    },
    {
      titre: "Pour lire une histoire à un plus jeune",
      detail:
        "C'est le meilleur entrainement qui existe : quelqu'un écoute vraiment, et tu entends toi-même où ça accroche.",
      schema: motDifficile,
      micros: ["cm2_flue_defi"],
    },
  ],
  exemples: [
    {
      titre: "Où faire la pause",
      donnees: "« Quand la nuit tomba, les villageois rentrèrent chez eux. »",
      schema: pauseALaVirgule,
      question: "Où fais-tu une petite pause ?",
      solution:
        "APRÈS « TOMBA », À LA VIRGULE. Pas entre « la » et « nuit » — ces deux mots vont ensemble et ne se séparent pas. Et surtout pas au milieu d'un mot : la virgule marque la fin d'un groupe de sens, et c'est le seul endroit prévu pour respirer.",
      micros: ["cm2_flue_unites_syntaxiques"],
    },
    {
      titre: "Un texte à préparer",
      donnees: "On te donne un texte long à lire à voix haute dans deux minutes.",
      schema: grillePreparer,
      question: "Que fais-tu pendant ces deux minutes ?",
      solution:
        "TU CHERCHES OÙ TU VAS BUTER. Les mots longs ou inconnus, les phrases qui n'en finissent pas, les endroits où respirer. Tu n'apprends pas le texte et tu ne le lis pas en entier : tu enlèves les surprises, et il n'y en a jamais plus de trois ou quatre.",
      micros: ["cm2_flue_texte_long"],
    },
    {
      titre: "Un son qui n'est pas écrit",
      donnees: "« les enfants »",
      schema: liaisonEntendue,
      question: "Quel son entends-tu entre les deux mots ?",
      solution:
        "UN « Z ». Et il n'est écrit nulle part : ni à la fin de « les », ni au début de « enfants ». Il nait de leur rencontre. C'est une LIAISON — le seul élément d'une lecture à voix haute que la page ne montre pas, et donc celui qu'on oublie.",
      micros: ["cm2_flue_unites_syntaxiques"],
    },
    {
      titre: "Une lecture qui hache",
      donnees: "Un élève lit : « les… enfants… sont… arrivés ».",
      schema: liaisonAbsente,
      question: "Qu'est-ce qui manque ?",
      solution:
        "LES LIAISONS. Chaque mot est juste, chaque mot est bien prononcé — et pourtant on suit mal, parce que les mots ne se touchent plus. C'est le signe le plus net d'une lecture faite mot à mot, sans préparation et sans groupes.",
      micros: ["cm2_flue_unites_syntaxiques"],
    },
    {
      titre: "Le repère de vitesse",
      donnees: "« Lire autour de 120 mots par minute, cela veut dire… »",
      schema: bonRythme,
      question: "Cela veut dire quoi ?",
      solution:
        "LIRE À UN BON RYTHME, SANS SE PRESSER NI TRAINER. Ni lire le plus vite possible sans comprendre — la vitesse sert la compréhension, elle ne la remplace pas —, ni lire un seul mot par minute, ni s'arrêter à 120 mots. C'est une allure, pas une quantité.",
      micros: ["cm2_flue_120_mots"],
    },
    {
      titre: "Le défi",
      donnees: "Au milieu de ta lecture, tu tombes sur un mot que tu n'as jamais vu.",
      schema: motDifficile,
      question: "Que fais-tu ?",
      solution:
        "TU LE DÉCOUPES EN SYLLABES ET TU CONTINUES. Ce qui compte n'est pas de ne jamais buter — cela arrive à tout le monde — mais que la phrase ne s'arrête pas. Un lecteur qui bute et repart se suit ; un lecteur qui s'arrête et recommence sa phrase, non.",
      micros: ["cm2_flue_defi"],
    },
  ],
  pieges: [
    "Croire qu'on mesure la fluidité sur un texte découvert : le programme dit « après préparation ».",
    "Faire une pause quand on manque d'air : elle se met à la virgule, décidée avant.",
    "Couper un mot long en le lisant : on le découpe dans sa tête, on le dit d'un trait.",
    "Oublier les liaisons : ce sont les seuls sons que la page ne montre pas.",
    "Lire le plus vite possible : « autour de 120 » veut dire un bon rythme, pas un record.",
    "S'arrêter et reprendre sa phrase après avoir buté : on franchit, et l'on continue.",
  ],
  aRetenir: [
    "La fluence se PRÉPARE : deux minutes avant, on cherche où l'on va buter.",
    "La pause est à la virgule — jamais à l'intérieur d'un mot.",
    "La liaison n'est écrite nulle part, et son absence s'entend aussitôt.",
    "Environ 120 mots par minute au CM2 : 110 au CM1, 130 en 6e.",
    "Buter n'est pas grave ; s'arrêter, si.",
  ],
  entrainement: [
    {
      question: "« On est arrivés. » Quel son entends-tu entre « on » et « est » ?",
      correction: "Un « n » : c'est une liaison, et elle n'est écrite nulle part.",
      micros: ["cm2_flue_unites_syntaxiques"],
    },
    {
      question: "Où fais-tu la pause dans « Le vent se leva, et la porte claqua » ?",
      correction: "À la virgule, après « leva » : elle ferme le premier groupe.",
      micros: ["cm2_flue_unites_syntaxiques"],
    },
    {
      question: "Combien de mots par minute vise-t-on en CM1, en CM2 et en 6e ?",
      correction: "110, 120 et 130 : le repère monte d'année en année.",
      micros: ["cm2_flue_120_mots"],
    },
    {
      question: "On te chronomètre sur un texte que tu découvres. Que mesure-t-on ?",
      correction: "Ton déchiffrage, pas ta fluidité : celle-ci se mesure après préparation.",
      micros: ["cm2_flue_texte_long"],
    },
    {
      question: "« Pour lire une histoire à des plus jeunes, le mieux est de… »",
      correction: "Mettre le ton et respecter les pauses.",
      micros: ["cm2_flue_texte_long"],
    },
    {
      question: "Tu butes sur un mot au milieu d'une phrase. Faut-il recommencer la phrase ?",
      correction: "Non : on découpe le mot, on le franchit, et la phrase continue.",
      micros: ["cm2_flue_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm2",
};

export const slidesFluenceLectureCm2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Lire avec fluidité - CM2",
    section: {
      type: "objectif",
      phrase: "La fluence se prépare",
      sousPhrase:
        "Le programme dit « après préparation ». On ne te tend pas un texte inconnu pour te chronométrer.",
      encadre: {
        titre: "L'idée",
        texte: "Deux minutes avant : où est-ce que je vais buter ?",
      },
    },
  },
  {
    titre: "Quatre choses à préparer",
    badge: "Lire avec fluidité - CM2",
    section: {
      type: "cartes",
      cartes: [
        { titre: "La ponctuation", texte: "Elle dit où faire les pauses." },
        { titre: "Les groupes", texte: "Les mots qui vont ensemble se lisent d'un trait." },
        { titre: "Les liaisons", texte: "Le seul son que la page ne montre pas." },
        { titre: "Les mots durs", texte: "Repérés d'avance, ils ne surprennent plus." },
      ],
    },
    schema: grillePreparer,
  },
  {
    titre: "La liaison n'est écrite nulle part",
    badge: "Lire avec fluidité - CM2",
    section: {
      type: "duo",
      gauche: {
        titre: "Avec",
        contenu: "« les enfants » : un « z » nait entre les deux mots. Ça coule.",
      },
      droite: {
        titre: "Sans",
        contenu: "« les… enfants » : chaque mot est juste, et la lecture hache.",
      },
    },
    schema: liaisonEntendue,
  },
  {
    titre: "Où se met la pause",
    badge: "Lire avec fluidité - CM2",
    section: {
      type: "etapes",
      etapes: [
        "À LA VIRGULE : elle ferme un groupe de sens.",
        "AU POINT, bien sûr — et plus longuement.",
        "JAMAIS entre un déterminant et son nom.",
        "JAMAIS à l'intérieur d'un mot, même long.",
      ],
    },
    schema: pauseALaVirgule,
  },
  {
    titre: "Le repère du cycle",
    badge: "Lire avec fluidité - CM2",
    section: {
      type: "etapes",
      etapes: [
        "110 mots par minute au CM1.",
        "120 au CM2 — c'est ton palier cette année.",
        "130 en 6e : il monte d'année en année.",
        "Et « autour de 120 » veut dire un bon rythme, jamais un record.",
      ],
    },
    schema: troisPaliers,
  },
  {
    titre: "À vous",
    badge: "Lire avec fluidité - CM2",
    section: {
      type: "exercice",
      enonce: "Tu tombes sur un mot que tu n'as jamais vu, au milieu d'une phrase.",
      question: "Que fais-tu, et pourquoi pas autre chose ?",
      indice: "Demande-toi ce qu'entend celui qui t'écoute.",
      correction:
        "TU LE DÉCOUPES EN SYLLABES ET TU CONTINUES. Buter arrive à tout le monde. Recommencer la phrase, en revanche, fait perdre le fil à celui qui écoute — et c'est cela qu'on évite.",
    },
    schema: motDifficile,
  },
];
