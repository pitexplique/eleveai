// ─── Fiche de cours : lire à voix haute et mettre en voix (4e) ────────────────
// LA QUATORZIÈME FICHE DE FRANÇAIS DE LA 4e.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020, compétence « Lire à voix haute ».
// Le texte fixe lui-même la longueur pour la 4e : « une quinzaine de lignes ou
// de vers », et il précise « en s'appuyant sur la ponctuation ». Ce n'est pas
// un détail de méthode : c'est la compétence elle-même.
//
// ⭐⭐ CE QUE CETTE FICHE MONTRE, ET QU'AUCUNE AUTRE NE POUVAIT MONTRER : LA
// PARTITION. Un texte préparé pour la voix n'est pas un texte relu — c'est un
// texte ANNOTÉ, et les annotations se dessinent. Les groupes du canvas `phrase`
// deviennent des groupes de souffle ; le `focus` marque les mots à détacher ;
// la ponctuation, mise en relief, devient une consigne de jeu. L'élève voit sa
// feuille avant de l'écrire.
//
// ⛔ LA FICHE NE PARLE PAS DE « BIEN LIRE ». Elle enseigne des GESTES qui se
// décident à l'avance et se vérifient : où respirer, quel mot détacher, quand
// baisser la voix, que faire si l'on perd le fil. Un élève qui « lit mal » n'a
// presque jamais un problème de voix — il a un texte qu'il n'a pas préparé.
//
// ⭐ ET UNE PARTIE QUE PERSONNE N'ENSEIGNE : L'ACCIDENT. Le trou, le mot avalé,
// le trac qui fait accélérer. La récitation ne se juge pas sur l'absence
// d'accident mais sur la façon de le traverser, et cela se prépare comme le
// reste. C'est la table RECITER de la banque, écrite le 25/08.
//
// Alignée sur les tables PREPARER, EXPRESSIVE et RECITER de
// lib/tutor-v4/questionBank/4e/francais/lecture-culture.bank.ts.
//
// Micro-compétences couvertes (les 3 de la notion `lecture_voix_haute`) :
// - 4e_voix_preparer   → figure, propriétés 1 et 2, méthode 1, exemples 1 et 2
// - 4e_voix_expressive → propriétés 3 à 5, formule, méthodes 2 et 3,
//                        exemples 3 à 5
// - 4e_voix_reciter    → propriétés 6 et 7, méthode 4, exemples 6 et 7
//
// ⛔ RAPPEL DES PIÈGES DE FABRICATION : pas de `titre` sur un dessin ; pas de
// markdown dans un texte ; une étiquette de groupe ne se plie pas ; et LE RENDU
// SE REGARDE.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types_canvas";

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

function pile(...blocs: ReactNode[]) {
  return (
    <div className="grid gap-4">
      {blocs.map((bloc, i) => (
        <div key={i}>{bloc}</div>
      ))}
    </div>
  );
}

// ─── La partition : un texte annoté pour la voix ──────────────────────────────
// ⚠️ Les groupes ne sont plus des fonctions grammaticales : ce sont des GROUPES
// DE SOUFFLE. Même dessin, autre usage — et la légende le dit chaque fois.

// ── LA FIGURE DE RÉFÉRENCE : la même phrase, non préparée puis annotée.
const phraseNue = phrase({
  mots: [
    { texte: "Le" },
    { texte: "vent" },
    { texte: "se" },
    { texte: "leva" },
    { texte: "," },
    { texte: "les" },
    { texte: "volets" },
    { texte: "claquèrent" },
    { texte: "," },
    { texte: "personne" },
    { texte: "ne" },
    { texte: "bougea" },
    { texte: "." },
  ],
  legende: "Le texte tel qu'il arrive. Lu ainsi, il sort d'un seul souffle.",
});

const phrasePreparee = phrase({
  mots: [
    { texte: "Le" },
    { texte: "vent" },
    { texte: "se" },
    { texte: "leva", focus: true },
    { texte: "," },
    { texte: "les" },
    { texte: "volets" },
    { texte: "claquèrent", focus: true },
    { texte: "," },
    { texte: "personne" },
    { texte: "ne" },
    { texte: "bougea", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 4], label: "souffle 1" },
    { mots: [5, 8], label: "souffle 2" },
    { mots: [9, 12], label: "souffle 3" },
  ],
  legende: "Le même texte annoté : trois respirations, trois verbes détachés.",
});

// ── CE QUE CHAQUE SIGNE COMMANDE À LA VOIX.
const signeSuspension = phrase({
  mots: [
    { texte: "Je" },
    { texte: "crois" },
    { texte: "que" },
    { texte: "…", focus: true },
  ],
  legende: "Points de suspension : la voix reste en l'air, et un silence suit.",
});

const signeInterrogation = phrase({
  mots: [
    { texte: "Où" },
    { texte: "étaient-ils" },
    { texte: "passés" },
    { texte: "?", focus: true },
  ],
  legende: "Interrogation : la voix monte sur la fin. Sans crier.",
});

const signeIncise = phrase({
  mots: [
    { texte: "Il" },
    { texte: "rentra" },
    { texte: "," },
    { texte: "dit-on", focus: true },
    { texte: "," },
    { texte: "très" },
    { texte: "tard" },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 4], label: "plus bas" }],
  legende: "Incise entre deux virgules : la voix baisse, puis reprend son niveau.",
});

const signeRythmeBref = phrase({
  mots: [
    { texte: "Il" },
    { texte: "courut" },
    { texte: "." },
    { texte: "Il" },
    { texte: "tomba" },
    { texte: "." },
    { texte: "Il" },
    { texte: "se" },
    { texte: "releva" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 9], label: "on accélère" }],
  legende: "Trois phrases brèves : le rythme presse, et la voix doit le suivre.",
});

// ── LE MOT QU'ON DÉTACHE, ET POURQUOI.
const motRepete = phrase({
  mots: [
    { texte: "Jamais", focus: true },
    { texte: "il" },
    { texte: "ne" },
    { texte: "revint" },
    { texte: "·" },
    { texte: "Jamais", focus: true },
    { texte: "il" },
    { texte: "n'écrivit" },
  ],
  legende: "Un mot répété en tête : c'est lui qui doit s'entendre, les deux fois.",
});

const motChangementVoix = phrase({
  mots: [
    { texte: "Il" },
    { texte: "cria" },
    { texte: ":" },
    { texte: "«", focus: true },
    { texte: "Sortez" },
    { texte: "!" },
    { texte: "»", focus: true },
  ],
  groupes: [{ mots: [3, 6], label: "autre voix" }],
  legende: "Les guillemets annoncent un autre personnage : on change de voix.",
});

// ── L'ACCIDENT, ET CE QU'ON A DÉCIDÉ D'AVANCE.
const accidentTrou = phrase({
  mots: [
    { texte: "strophe" },
    { texte: "2" },
    { texte: "…" },
    { texte: "trou", barre: true },
    { texte: "→" },
    { texte: "strophe" },
    { texte: "3", focus: true },
  ],
  legende: "Un trou : on repart au vers SUIVANT, jamais au début.",
});

const accidentMot = phrase({
  mots: [
    { texte: "« sombre »", barre: true },
    { texte: "→" },
    { texte: "« lourde »", focus: true },
    { texte: "→" },
    { texte: "on" },
    { texte: "continue" },
  ],
  legende: "Un mot de travers : on le redit UNE fois, correctement, et on avance.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheLectureVoixHaute4e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "4e",
  notion: "lecture-voix-haute",
  titre: `Lire à voix haute et mettre en voix en 4e (${ANNEE_SCOLAIRE})`,
  accroche:
    "Un élève qui lit mal n'a presque jamais un problème de voix : il a un texte qu'il n'a pas préparé. Lire à voix haute ne s'improvise pas plus qu'on ne joue un morceau à vue — cela s'annote, comme une partition. Où respirer, quel mot détacher, où baisser le ton : tout cela se décide avant, le crayon à la main, et se voit sur la feuille.",
  identite: [
    { label: "Mots clés", valeur: "Souffle, ponctuation, rythme, changement de voix" },
    { label: "Le secret", valeur: "Annoter avant de lire, pas relire" },
    { label: "Outil", valeur: "La ponctuation commande, pas l'humeur" },
  ],
  definition: {
    texte:
      "Lire à voix haute, c'est faire entendre une compréhension. Le programme le dit ainsi : « exprimer sa compréhension et son interprétation par sa lecture ». Cela suppose une préparation, et cette préparation est matérielle : on découpe le texte en GROUPES DE SOUFFLE, on repère les mots qui doivent s'entendre, on note les changements de voix, on vérifie ce qu'on ne sait pas prononcer. La PONCTUATION sert de mode d'emploi — chaque signe commande quelque chose à la voix, et le programme demande explicitement de « s'appuyer » sur elle. Réciter, enfin, ne veut pas dire réciter sans faute : cela veut dire ne pas s'arrêter, et la façon de traverser un accident se décide à l'avance elle aussi.",
  },
  figure: {
    schema: pile(phraseNue, phrasePreparee),
    legende:
      "La même phrase, deux fois. En haut telle qu'elle arrive : lue ainsi, elle sort d'un seul souffle et rien ne s'entend. En bas annotée : trois groupes de souffle, et les trois verbes mis en relief parce que ce sont eux qui font avancer. Les crochets ne marquent plus une fonction grammaticale — ils marquent une respiration. Même dessin, autre usage.",
  },
  proprietes: [
    {
      titre: "On découpe en groupes de souffle",
      texte:
        "Une virgule, un point-virgule, une fin de proposition : autant d'endroits où l'on peut reprendre son air. Marqués à l'avance, ils ne manquent jamais.",
      schema: phrasePreparee,
      micros: ["4e_voix_preparer"],
    },
    {
      titre: "On repère ce qui doit s'entendre",
      texte:
        "Un mot répété, un mot en italique, un nom qui revient : l'auteur l'a placé là pour qu'on le remarque. La voix doit le rendre.",
      schema: motRepete,
      micros: ["4e_voix_preparer"],
    },
    {
      titre: "La ponctuation est un mode d'emploi",
      texte:
        "Les points de suspension suspendent, l'interrogation monte, l'exclamation porte. Ce ne sont pas des signes à respecter : ce sont des consignes.",
      schema: pile(signeSuspension, signeInterrogation),
      micros: ["4e_voix_expressive"],
    },
    {
      titre: "L'incise se dit plus bas",
      texte:
        "Ce qui est enfermé entre deux virgules, deux tirets ou deux parenthèses passe sous le niveau du reste — et l'on remonte après.",
      schema: signeIncise,
      micros: ["4e_voix_expressive"],
    },
    {
      titre: "Le rythme du texte commande celui de la voix",
      texte:
        "Trois phrases brèves qui se suivent pressent ; une phrase de six lignes retient. On suit le texte, on ne lit pas tout à la même vitesse.",
      schema: signeRythmeBref,
      micros: ["4e_voix_expressive"],
    },
    {
      titre: "On doit entendre qui parle",
      texte:
        "Des guillemets, un tiret de dialogue : un autre personnage prend la parole, et la voix doit changer — hauteur, débit, ou simplement un silence avant.",
      schema: motChangementVoix,
      micros: ["4e_voix_reciter"],
    },
    {
      titre: "L'accident se prépare comme le reste",
      texte:
        "Un trou : on repart au vers suivant. Un mot de travers : on le redit une fois. On décide cela AVANT, sinon on s'arrête et on recommence au début.",
      schema: pile(accidentTrou, accidentMot),
      micros: ["4e_voix_reciter"],
    },
  ],
  reel: {
    texte:
      "Ce n'est pas une compétence scolaire, et cela se vérifie dès qu'on sort de l'école. Un oral de brevet, une présentation de stage, un discours de mariage, une réunion où l'on doit exposer un projet : dans tous les cas, ce n'est pas le contenu qui décide de l'effet produit, c'est la manière de le dire. Et la différence entre quelqu'un qu'on écoute et quelqu'un qu'on décroche tient à trois choses très concrètes : il respire au bon endroit, il détache ce qui compte, il ralentit quand c'est important. Aucune des trois n'est un don. Les trois se marquent au crayon.",
  },
  historique: {
    texte:
      "Pendant très longtemps, lire voulait dire lire à voix haute, y compris seul. Les textes antiques et médiévaux s'écrivaient sans espaces entre les mots et sans ponctuation — SCRIPTIOCONTINUA — et l'on ne pouvait les déchiffrer qu'en les prononçant, en cherchant à l'oreille où les mots se séparaient. Saint Augustin raconte au IVe siècle son étonnement en voyant Ambroise de Milan lire SANS remuer les lèvres : la chose était assez rare pour être notée. La lecture silencieuse ne s'est généralisée qu'avec l'apparition des espaces, des majuscules et de la ponctuation, entre le VIIe et le XIIe siècle. Autrement dit : la ponctuation n'a pas été inventée pour l'œil, mais pour la voix — et c'est pour cela qu'elle marche encore si bien quand on lit tout haut.",
  },
  formule: {
    contexte: "Le principe qui règle toutes les décisions de la voix.",
    expression: "c'est la ponctuation qui commande, pas l'humeur",
    legende:
      "Avant de « mettre le ton », regarde les signes : ils disent où respirer, où monter, où baisser, où accélérer. L'expression vient après, et elle ne se décide pas au hasard. Un texte lu avec beaucoup d'émotion et aucune ponctuation respectée s'entend comme un texte mal lu.",
    schema: signeIncise,
  },
  methode: [
    {
      titre: "Lire une fois en silence, une fois en marquant",
      texte:
        "La première lecture est pour comprendre. La seconde est pour annoter : barres de souffle, mots à détacher, changements de voix. Ce qui n'est pas marqué ne s'entendra pas.",
      schema: pile(phraseNue, phrasePreparee),
      micros: ["4e_voix_preparer"],
    },
    {
      titre: "Vérifier les mots inconnus AVANT",
      texte:
        "Un nom propre étranger, un mot ancien, une liaison douteuse : cela se règle à la maison, jamais devant la classe.",
      schema: motChangementVoix,
      micros: ["4e_voix_preparer"],
    },
    {
      titre: "Suivre les signes, dans l'ordre",
      texte:
        "Point de suspension : je suspends et je laisse un silence. Interrogation : je monte. Incise : je baisse. Phrases brèves : j'accélère.",
      schema: pile(signeSuspension, signeRythmeBref),
      micros: ["4e_voix_expressive"],
    },
    {
      titre: "Décider ses accidents à l'avance",
      texte:
        "Que ferai-je si je perds le fil ? Je repars au vers suivant. Si je bute sur un mot ? Je le redis une fois et je continue. C'est cela qui fait la fluidité.",
      schema: pile(accidentTrou, accidentMot),
      micros: ["4e_voix_reciter"],
    },
  ],
  usages: [
    {
      titre: "Pour un oral : la respiration se prépare",
      detail:
        "Marquer ses reprises d'air sur ses notes évite l'essoufflement, qui est la première cause d'un oral qui s'effondre.",
      schema: phrasePreparee,
      micros: ["4e_voix_preparer"],
    },
    {
      titre: "Pour se relire : lire tout haut trouve les fautes",
      detail:
        "Une phrase trop longue s'entend avant de se voir : si tu manques d'air en la lisant, il faut la couper.",
      schema: signeRythmeBref,
      micros: ["4e_voix_expressive"],
    },
    {
      titre: "Pour apprendre un texte : par blocs, sur plusieurs jours",
      detail:
        "Vingt relectures la veille ne tiennent pas. Quatre séances courtes réparties dans la semaine tiennent des mois.",
      schema: accidentTrou,
      micros: ["4e_voix_reciter"],
    },
  ],
  exemples: [
    {
      titre: "Préparer une phrase longue",
      donnees: "« Le vent se leva, les volets claquèrent, personne ne bougea. »",
      schema: pile(phraseNue, phrasePreparee),
      question: "Comment la préparer pour la lire à voix haute ?",
      solution:
        "Trois groupes de souffle, marqués aux virgules : on reprend son air deux fois, à des endroits choisis. Et les trois verbes se détachent, parce que ce sont eux qui font avancer. Sans préparation, la phrase sort d'un seul trait et l'on n'entend plus les trois moments.",
      micros: ["4e_voix_preparer"],
    },
    {
      titre: "Ce qui doit s'entendre",
      donnees: "« Jamais il ne revint. Jamais il n'écrivit. »",
      schema: motRepete,
      question: "Que faut-il marquer avant de lire ?",
      solution:
        "Le mot « jamais », aux deux endroits. Une répétition en tête de phrase n'est jamais un hasard : l'auteur veut qu'on l'entende. Si la voix la traite comme un mot ordinaire, l'effet disparait entièrement, et le texte perd ce qu'il avait de plus fort.",
      micros: ["4e_voix_preparer"],
    },
    {
      titre: "Que fait la voix ici ?",
      donnees: "« Je crois que… »",
      schema: signeSuspension,
      question: "Comment lire cette fin de phrase ?",
      solution:
        "On laisse la voix EN L'AIR — ni descendante comme un point, ni montante comme une question — et l'on ménage un vrai silence après. Les points de suspension ne se lisent pas : ils s'entendent dans ce qui ne vient pas.",
      micros: ["4e_voix_expressive"],
    },
    {
      titre: "L'incise",
      donnees: "« Il rentra, dit-on, très tard. »",
      schema: signeIncise,
      question: "Que fait la voix sur « dit-on » ?",
      solution:
        "Elle DESCEND, et elle remonte après. Ce qui est enfermé entre deux virgules est une parenthèse : on peut l'enlever sans casser la phrase, et la voix le signale en passant sous le niveau du reste. Même règle avec deux tirets ou deux parenthèses.",
      micros: ["4e_voix_expressive"],
    },
    {
      titre: "Le rythme",
      donnees: "« Il courut. Il tomba. Il se releva. »",
      schema: signeRythmeBref,
      question: "À quelle vitesse lire ces trois phrases ?",
      solution:
        "Plus vite que le reste. Trois phrases de trois mots qui se suivent créent une accélération : c'est le texte qui presse, et la voix doit le suivre. Lire tout à la même vitesse est l'erreur la plus fréquente, et la plus facile à corriger.",
      micros: ["4e_voix_expressive"],
    },
    {
      titre: "Un trou en pleine récitation",
      donnees: "Tu perds le fil au milieu de la troisième strophe.",
      schema: accidentTrou,
      question: "Que fais-tu ?",
      solution:
        "Tu repars au VERS SUIVANT, sans t'excuser et sans t'interrompre. Reprendre la strophe au début est le réflexe naturel et c'est le mauvais : il signale l'accident, casse le rythme, et fait souvent perdre le fil une seconde fois. La fluidité, c'est cela — pas l'absence d'oubli.",
      micros: ["4e_voix_reciter"],
    },
    {
      titre: "Un mot de travers",
      donnees: "Tu as dit « sombre » à la place de « lourde ».",
      schema: accidentMot,
      question: "Que fais-tu ?",
      solution:
        "Tu redis le mot UNE fois, correctement, et tu continues. Pas d'excuse, pas de retour en arrière, pas de commentaire. L'auditoire oublie une correction faite en une seconde ; il n'oublie pas un arrêt de dix.",
      micros: ["4e_voix_reciter"],
    },
  ],
  pieges: [
    "Croire qu'on peut lire à vue : un texte non annoté se lit d'un seul souffle et rien ne s'entend.",
    "Lire tout à la même vitesse : le rythme du texte change, la voix doit changer avec lui.",
    "Découvrir un mot difficile devant la classe : cela se vérifie à la maison.",
    "Mettre le ton avant de regarder la ponctuation : ce sont les signes qui commandent, pas l'humeur.",
    "Reprendre au début après un trou : on repart au vers suivant, sans signaler l'accident.",
    "Apprendre un texte la veille au soir en entier : quatre séances courtes tiennent des mois, vingt relectures ne tiennent pas une nuit.",
  ],
  aRetenir: [
    "Un texte pour la voix s'ANNOTE : groupes de souffle, mots à détacher, changements de voix.",
    "La ponctuation est un mode d'emploi : suspension, montée, incise plus basse, accélération.",
    "Ce qui n'est pas marqué ne s'entendra pas. La voix ne devine rien toute seule.",
    "On doit entendre qui parle : les guillemets demandent un changement de voix.",
    "Réciter avec fluidité, ce n'est pas réciter sans faute : c'est ne pas s'arrêter.",
    "L'accident se décide à l'avance : trou → vers suivant ; mot raté → une correction, puis on avance.",
  ],
  entrainement: [
    {
      question: "« Trois phrases très longues s'enchainent sans un seul point. » Que marques-tu ?",
      correction: "Tes respirations : la virgule devient ta pause, et tu la choisis avant de lire.",
      micros: ["4e_voix_preparer"],
    },
    {
      question: "« Le passage contient trois mots que tu n'as jamais prononcés. » Que fais-tu ?",
      correction: "Tu vérifies leur prononciation avant, jamais devant la classe.",
      micros: ["4e_voix_preparer"],
    },
    {
      question: "« Un groupe est enfermé entre deux tirets, au milieu de la phrase. » Que fait la voix ?",
      correction: "Elle baisse : l'incise se dit plus bas que le reste, puis on remonte.",
      micros: ["4e_voix_expressive"],
    },
    {
      question: "« Le texte s'achève sur un point d'exclamation. » Que fait la voix ?",
      correction: "Elle porte plus haut, et tient la dernière syllabe.",
      micros: ["4e_voix_expressive"],
    },
    {
      question: "« Le trac t'a fait débiter la première strophe d'un trait. » Que fais-tu ?",
      correction: "Tu ralentis sur une pause déjà prévue, sans le faire voir.",
      micros: ["4e_voix_reciter"],
    },
    {
      question: "« Tu récites en regardant tes chaussures depuis le début. » Que fais-tu ?",
      correction: "Tu relèves les yeux à chaque fin de phrase, au moins.",
      micros: ["4e_voix_reciter"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=4e",
};

export const slidesLectureVoixHaute4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Lire à voix haute - 4e",
    section: {
      type: "objectif",
      phrase: "Un texte pour la voix s'annote, il ne se relit pas",
      sousPhrase:
        "Où respirer, quel mot détacher, où baisser le ton : tout se décide avant, le crayon à la main.",
      encadre: {
        titre: "L'idée",
        texte: "Un élève qui lit mal a rarement un problème de voix : il a un texte qu'il n'a pas préparé.",
      },
    },
  },
  {
    titre: "La même phrase, préparée",
    badge: "Lire à voix haute - 4e",
    section: {
      type: "duo",
      gauche: {
        titre: "Telle qu'elle arrive",
        contenu: "Lue ainsi, elle sort d'un seul souffle. Les trois moments disparaissent.",
      },
      droite: {
        titre: "Annotée",
        contenu: "Trois groupes de souffle, trois verbes détachés. On entend le texte.",
      },
    },
    schema: pile(phraseNue, phrasePreparee),
  },
  {
    titre: "La ponctuation est un mode d'emploi",
    badge: "Lire à voix haute - 4e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "…", texte: "La voix reste en l'air, et un silence suit." },
        { titre: "?", texte: "La voix monte sur la fin. Sans crier." },
        { titre: ", incise ,", texte: "La voix baisse, puis remonte après." },
        { titre: "Phrases brèves", texte: "On accélère : le texte presse, la voix suit." },
      ],
    },
    schema: pile(signeSuspension, signeIncise),
  },
  {
    titre: "Ce qui n'est pas marqué ne s'entendra pas",
    badge: "Lire à voix haute - 4e",
    section: {
      type: "etapes",
      etapes: [
        "Je lis une fois en silence, pour comprendre.",
        "Je lis une seconde fois en marquant : souffles, mots à détacher, changements de voix.",
        "Je vérifie les mots que je ne sais pas prononcer — à la maison, pas devant la classe.",
        "Alors seulement je lis tout haut.",
      ],
    },
    schema: phrasePreparee,
  },
  {
    titre: "L'accident se prépare",
    badge: "Lire à voix haute - 4e",
    section: {
      type: "duo",
      gauche: {
        titre: "Un trou",
        contenu: "Je repars au VERS SUIVANT. Jamais au début : cela signale l'accident.",
      },
      droite: {
        titre: "Un mot raté",
        contenu: "Je le redis UNE fois, correctement, et je continue. Sans m'excuser.",
      },
    },
    schema: pile(accidentTrou, accidentMot),
  },
  {
    titre: "À vous",
    badge: "Lire à voix haute - 4e",
    section: {
      type: "exercice",
      enonce: "« Jamais il ne revint. Jamais il n'écrivit. »",
      question: "Que faut-il marquer avant de lire ces deux phrases ?",
      indice: "Cherche ce que l'auteur a placé là pour qu'on l'entende.",
      correction:
        "Le mot « jamais », aux deux endroits. Une répétition en tête de phrase n'est jamais un hasard — si la voix la traite comme un mot ordinaire, l'effet disparait entièrement.",
    },
    schema: motRepete,
  },
];
