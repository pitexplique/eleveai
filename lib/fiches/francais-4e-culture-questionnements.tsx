// ─── Fiche de cours : les questionnements de l'année de 4e ────────────────────
// LA TREIZIÈME FICHE DE FRANÇAIS DE LA 4e.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020, domaine « Culture littéraire et
// artistique ». Le texte NOMME les quatre entrées de la 4e — « Dire l'amour »,
// « Individu et société : confrontations de valeurs ? », « La fiction pour
// interroger le réel », « Informer, s'informer, déformer ? » — plus une
// complémentaire, « La ville, lieu de tous les possibles ? ».
//
// ⏳ UN AN DE VIE, ET C'EST ASSUMÉ. Le BO du 5 mars 2026 atteint la 4e en
// septembre 2027 et remplacera ces cinq entrées par quatre autres, déjà connues
// mot pour mot. La session du 13/08 les avait écartées pour cette raison ;
// l'arbitrage de Frédéric a été de les écrire quand même — une année, c'est une
// cohorte entière. Même raisonnement pour cette fiche.
// ⚠️ À la bascule, c'est CETTE fiche qui sera à refaire en entier, et elle
// seule : les douze autres tiennent sur des notions qui ne changent pas de nom.
//
// ⛔⛔ ON N'INTERROGE JAMAIS UNE ŒUVRE, et c'est ici que la règle est la plus
// difficile à tenir : une entrée littéraire ressemble à une liste de lectures.
// Elle n'en est pas une. Les livres sont choisis par le professeur, et cette
// fiche ne nomme AUCUN titre dans ce qu'elle demande à l'élève.
//
// ⭐⭐ CE QU'ELLE ENSEIGNE À LA PLACE, ET QUI EST LE CŒUR DE LA FICHE : un
// questionnement n'est pas un THÈME, c'est une TENSION. « Dire l'amour » ne
// veut pas dire « lire des textes d'amour » : cela veut dire affronter le fait
// que le sentiment déborde toujours les mots dont on dispose. Chacune des cinq
// entrées se ramène à deux forces qui tirent en sens contraire — et c'est cela
// qui se dessine, avec les groupes opposés du canvas `phrase`.
//
// Alignée sur la table QUESTIONNEMENTS de
// lib/tutor-v4/questionBank/4e/francais/culture-litteraire.bank.ts.
//
// Micro-compétences couvertes (les 5 de la notion `culture_questionnements`) :
// - 4e_cult_dire_amour        → figure, propriété 1, exemple 1
// - 4e_cult_individu_societe  → propriété 2, méthode 2, exemple 2
// - 4e_cult_fiction_reel      → propriété 3, exemple 3
// - 4e_cult_informer_deformer → propriété 4, formule, exemple 4
// - 4e_cult_ville             → propriété 5, exemple 5
//
// ⛔ RAPPEL DES PIÈGES DE FABRICATION : pas de `titre` sur un dessin ; pas de
// markdown dans un texte ; une étiquette de groupe ne se plie pas ; et LE RENDU
// SE REGARDE.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
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

// ─── Les cinq tensions, dessinées ─────────────────────────────────────────────
// ⚠️ Chaque entrée se ramène à DEUX forces qui tirent en sens contraire. Les
// deux groupes opposés du canvas `phrase` les montrent, et c'est le même dessin
// cinq fois : une fois la forme comprise, l'élève lit les cinq d'un coup.

const tensionAmour = phrase({
  mots: [
    { texte: "ce" },
    { texte: "qu'on" },
    { texte: "ressent", focus: true },
    { texte: "·" },
    { texte: "les" },
    { texte: "mots" },
    { texte: "qu'on", focus: true },
    { texte: "a" },
  ],
  groupes: [
    { mots: [0, 2], label: "le sentiment" },
    { mots: [4, 7], label: "la langue" },
  ],
  legende: "DIRE L'AMOUR : le sentiment déborde toujours les mots disponibles.",
});

const tensionIndividu = phrase({
  mots: [
    { texte: "ce" },
    { texte: "que" },
    { texte: "je", focus: true },
    { texte: "veux" },
    { texte: "·" },
    { texte: "ce" },
    { texte: "qu'on", focus: true },
    { texte: "attend" },
  ],
  groupes: [
    { mots: [0, 3], label: "l'individu" },
    { mots: [5, 7], label: "la société" },
  ],
  legende: "INDIVIDU ET SOCIÉTÉ : deux valeurs justes, et il faut choisir.",
});

const tensionFiction = phrase({
  mots: [
    { texte: "inventer", focus: true },
    { texte: "·" },
    { texte: "dire", focus: true },
    { texte: "vrai" },
  ],
  groupes: [
    { mots: [0, 0], label: "la fiction" },
    { mots: [2, 3], label: "le réel" },
  ],
  legende: "LA FICTION POUR INTERROGER LE RÉEL : mentir pour mieux montrer.",
});

const tensionInformer = phrase({
  mots: [
    { texte: "le" },
    { texte: "fait", focus: true },
    { texte: "·" },
    { texte: "ce" },
    { texte: "qu'on", focus: true },
    { texte: "en" },
    { texte: "fait" },
  ],
  groupes: [
    { mots: [0, 1], label: "informer" },
    { mots: [3, 6], label: "déformer" },
  ],
  legende: "INFORMER, S'INFORMER, DÉFORMER : le même fait, deux récits.",
});

const tensionVille = phrase({
  mots: [
    { texte: "tout" },
    { texte: "devient", focus: true },
    { texte: "possible" },
    { texte: "·" },
    { texte: "personne" },
    { texte: "ne", focus: true },
    { texte: "te" },
    { texte: "connait" },
  ],
  groupes: [
    { mots: [0, 2], label: "la promesse" },
    { mots: [4, 7], label: "la solitude" },
  ],
  legende: "LA VILLE : la même liberté produit la chance et l'anonymat.",
});

// ── LA STRUCTURE DE L'ANNÉE : quatre entrées, une perspective qui les tient.
const perspectiveAnnuelle = phrase({
  mots: [
    { texte: "rêver" },
    { texte: "·" },
    { texte: "délibérer" },
    { texte: "·" },
    { texte: "développer" },
    { texte: "son" },
    { texte: "jugement", focus: true },
  ],
  groupes: [{ mots: [0, 6], label: "la perspective de l'année" }],
  legende: "Les quatre entrées servent toutes la même chose : former un jugement.",
});

// ── CE QU'UN QUESTIONNEMENT N'EST PAS.
const pasUnTheme = phrase({
  mots: [
    { texte: "des" },
    { texte: "textes" },
    { texte: "sur" },
    { texte: "l'amour", barre: true },
  ],
  legende: "Ce n'est PAS une liste de lectures sur un thème.",
});

const maisUneQuestion = phrase({
  mots: [
    { texte: "peut-on" },
    { texte: "dire", focus: true },
    { texte: "ce" },
    { texte: "qu'on" },
    { texte: "ressent" },
    { texte: "?", focus: true },
  ],
  groupes: [{ mots: [0, 5], label: "une question ouverte" }],
  legende: "C'est une QUESTION, à laquelle chaque œuvre répond autrement.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheCultureQuestionnements4e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "4e",
  notion: "culture-questionnements",
  titre: "Les questionnements de l'année de 4e (2026-2027)",
  accroche:
    "« Dire l'amour » n'est pas un thème, et ce n'est pas une liste de textes romantiques. C'est une question, et elle est difficile : peut-on dire ce qu'on ressent ? Le sentiment déborde toujours les mots dont on dispose — et c'est justement pour cela que des poètes s'y sont usés pendant huit siècles. Chacune des quatre entrées de ton année est une question de ce genre.",
  identite: [
    { label: "Mots clés", valeur: "Perspective, entrée littéraire, tension, jugement" },
    { label: "Le secret", valeur: "Une entrée est une tension, pas un thème" },
    { label: "Outil", valeur: "Chercher les deux forces qui s'opposent" },
  ],
  definition: {
    texte:
      "L'année de 4e est orientée par une PERSPECTIVE : rêver, délibérer, développer son jugement — en quête de valeurs et de vérité. Sous elle, le programme nomme quatre ENTRÉES, plus une complémentaire. Une entrée n'est ni un thème ni une liste de lectures : c'est une question ouverte, à laquelle chaque œuvre étudiée apporte une réponse différente, et souvent contradictoire. Toutes se ramènent à une TENSION — deux forces qui tirent en sens contraire et qu'on ne peut pas réconcilier d'un mot. Dire l'amour oppose le sentiment à la langue ; l'individu et la société opposent deux valeurs également justes ; la fiction invente pour mieux dire vrai ; informer et déformer partent du même fait ; et la ville promet la liberté en même temps que la solitude.",
  },
  figure: {
    schema: pile(tensionAmour, tensionIndividu),
    legende:
      "Deux entrées, dessinées de la même façon. À gauche une force, à droite celle qui la contrarie, et le point médian entre les deux. « Dire l'amour » oppose ce qu'on ressent aux mots dont on dispose ; « Individu et société » oppose ce que je veux à ce qu'on attend de moi. Une fois cette forme comprise, les cinq entrées se lisent d'un coup.",
  },
  proprietes: [
    {
      titre: "Dire l'amour : le sentiment déborde les mots",
      texte:
        "Comment nommer ce qui n'a pas de nom ? Les œuvres inventent des images, empruntent, exagèrent — et échouent magnifiquement. C'est l'échec qui est intéressant.",
      schema: tensionAmour,
      micros: ["4e_cult_dire_amour"],
    },
    {
      titre: "Individu et société : deux valeurs justes, et il faut choisir",
      texte:
        "Obéir ou refuser, se taire ou parler, rester ou partir. Le conflit n'oppose pas le bien au mal : il oppose deux biens, et c'est ce qui le rend tragique.",
      schema: tensionIndividu,
      micros: ["4e_cult_individu_societe"],
    },
    {
      titre: "La fiction pour interroger le réel : inventer pour mieux montrer",
      texte:
        "Un récit fantastique ou d'anticipation ne fuit pas le monde : il le déplace juste assez pour qu'on le regarde autrement. Le faux sert le vrai.",
      schema: tensionFiction,
      micros: ["4e_cult_fiction_reel"],
    },
    {
      titre: "Informer, s'informer, déformer : le même fait, deux récits",
      texte:
        "Entre le fait et ce qu'on en dit, il y a toujours quelqu'un qui choisit. Cette entrée rejoint la fiche sur les images et les documents : c'est la même méthode.",
      schema: tensionInformer,
      micros: ["4e_cult_informer_deformer"],
    },
    {
      titre: "La ville : la même liberté produit la chance et l'anonymat",
      texte:
        "On y devient qui on veut parce que personne ne vous connait — et on y est seul pour la même raison. La promesse et la menace ont une seule cause.",
      schema: tensionVille,
      micros: ["4e_cult_ville"],
    },
    {
      titre: "Une entrée n'est pas un thème",
      texte:
        "« Des textes sur l'amour » ne dit rien. « Peut-on dire ce qu'on ressent ? » ouvre un débat auquel chaque œuvre répond différemment.",
      schema: pile(pasUnTheme, maisUneQuestion),
      micros: ["4e_cult_dire_amour"],
    },
    {
      titre: "Les quatre servent la même chose",
      texte:
        "La perspective de l'année les tient ensemble : rêver, délibérer, développer son jugement. Chaque entrée est un exercice de jugement sur un terrain différent.",
      schema: perspectiveAnnuelle,
      micros: ["4e_cult_individu_societe"],
    },
  ],
  reel: {
    texte:
      "Ces quatre questions ne sont pas scolaires, et c'est ce qui les rend utiles. « Individu et société » est la question de tout élève à qui l'on demande de se conformer à une règle qu'il trouve injuste. « Informer, s'informer, déformer » est celle qu'on se pose devant chaque contenu partagé. « La ville » est celle de ceux qui partent étudier ailleurs, et découvrent ensemble la liberté et l'anonymat. Et « dire l'amour » est celle de n'importe qui essayant d'écrire un message important, et effaçant trois fois. Les œuvres n'y répondent pas mieux que toi : elles y ont réfléchi plus longtemps.",
  },
  historique: {
    texte:
      "Ces entrées n'ont pas toujours existé, et elles ne dureront pas. Jusqu'en 1996, les programmes de collège prescrivaient des LISTES D'ŒUVRES, les mêmes pour tous : chaque élève de 4e lisait le même roman au même moment. Le passage aux « objets d'étude » puis aux « questionnements » a transféré le choix des livres au professeur, en gardant les questions communes — de sorte que deux classes peuvent lire des textes entièrement différents tout en travaillant la même chose. Ce système a trente ans, et il change encore : celles que tu étudies cette année seront remplacées à la rentrée 2027 par quatre autres. Les questions changent, la manière de les travailler reste.",
  },
  formule: {
    contexte: "Le geste qui transforme un thème en question, et donc en travail.",
    expression: "quelles sont les deux forces qui s'opposent ?",
    legende:
      "Devant une entrée, ne cherche pas de quoi elle parle : cherche ce qu'elle met en conflit. « La ville, lieu de tous les possibles ? » ne parle pas des villes — elle demande si la liberté qu'on y trouve vaut la solitude qu'on y paie. Le point d'interrogation du titre n'est pas décoratif.",
    schema: tensionVille,
  },
  methode: [
    {
      titre: "Repérer la tension avant de lire",
      texte:
        "Devant une entrée, écris les deux forces en face l'une de l'autre. Tu sauras alors quoi chercher dans chaque texte : de quel côté il penche, et pourquoi.",
      schema: pile(tensionAmour, tensionFiction),
      micros: ["4e_cult_dire_amour", "4e_cult_fiction_reel"],
    },
    {
      titre: "Ne pas chercher la bonne réponse",
      texte:
        "Un questionnement n'en a pas. Deux œuvres peuvent répondre l'inverse et avoir toutes deux raison : c'est même ce qu'on attend de l'étude.",
      schema: tensionIndividu,
      micros: ["4e_cult_individu_societe"],
    },
    {
      titre: "Relier chaque texte à la question, pas au thème",
      texte:
        "Ne demande pas « de quoi parle ce texte ? » mais « que répond-il à la question de l'entrée ? ». C'est ce qui distingue un exposé d'un travail.",
      schema: maisUneQuestion,
      micros: ["4e_cult_dire_amour"],
    },
    {
      titre: "Garder trace par la question",
      texte:
        "Dans ton carnet, note pour chaque œuvre la réponse qu'elle donne à l'entrée. En fin d'année, tu auras quatre débats, pas une liste de résumés.",
      schema: perspectiveAnnuelle,
      micros: ["4e_cult_ville"],
    },
  ],
  usages: [
    {
      titre: "Pour un devoir : la question donne le plan",
      detail:
        "Deux forces qui s'opposent, c'est déjà deux parties. La troisième est ce que l'œuvre en fait — et elle est la plus intéressante.",
      schema: tensionIndividu,
      micros: ["4e_cult_individu_societe"],
    },
    {
      titre: "Pour un débat : chercher le conflit de valeurs",
      detail:
        "Un désaccord tenace oppose presque toujours deux choses justes. Le nommer désamorce la dispute et ouvre la discussion.",
      schema: tensionIndividu,
      micros: ["4e_cult_individu_societe"],
    },
    {
      titre: "Pour lire l'actualité",
      detail:
        "« Informer, s'informer, déformer » n'est pas une entrée de français : c'est la question qu'on se pose vingt fois par jour devant un écran.",
      schema: tensionInformer,
      micros: ["4e_cult_informer_deformer"],
    },
  ],
  exemples: [
    {
      titre: "Transformer un thème en question",
      donnees: "« Dire l'amour »",
      schema: pile(pasUnTheme, maisUneQuestion),
      question: "Quelle question cette entrée pose-t-elle vraiment ?",
      solution:
        "« Peut-on dire ce qu'on ressent ? » Le titre a l'air d'annoncer un thème — des textes d'amour — mais il contient un verbe : DIRE. La difficulté est là. Le sentiment déborde toujours la langue, et huit siècles de poètes s'y sont usés en inventant des images pour combler l'écart.",
      micros: ["4e_cult_dire_amour"],
    },
    {
      titre: "Un conflit qui n'oppose pas le bien au mal",
      donnees: "« Individu et société : confrontations de valeurs ? »",
      schema: tensionIndividu,
      question: "Pourquoi ce conflit est-il difficile ?",
      solution:
        "Parce qu'il oppose DEUX VALEURS JUSTES. Obéir à une règle commune est juste ; refuser une règle qu'on croit injuste l'est aussi. Si l'un des deux camps avait tort, il n'y aurait pas de tragédie — il y aurait une leçon de morale. C'est l'égalité des deux droits qui rend la question intéressante.",
      micros: ["4e_cult_individu_societe"],
    },
    {
      titre: "Inventer pour dire vrai",
      donnees: "« La fiction pour interroger le réel »",
      schema: tensionFiction,
      question: "Comment une histoire inventée peut-elle dire quelque chose de vrai ?",
      solution:
        "En DÉPLAÇANT le monde juste assez pour qu'on le regarde autrement. Un récit d'anticipation ne parle pas du futur : il parle du présent, débarrassé de l'habitude qui nous empêche de le voir. Le faux n'est pas le contraire du vrai — il en est un chemin.",
      micros: ["4e_cult_fiction_reel"],
    },
    {
      titre: "Le même fait, deux récits",
      donnees: "« Informer, s'informer, déformer ? »",
      schema: tensionInformer,
      question: "Où se glisse la déformation ?",
      solution:
        "Entre le fait et ce qu'on en dit, parce qu'il y a toujours quelqu'un qui CHOISIT : quels mots, quel cadrage, quel angle, quoi laisser dehors. La déformation n'exige pas de mentir — il suffit de choisir. C'est exactement la méthode de la fiche sur les images et les documents.",
      micros: ["4e_cult_informer_deformer"],
    },
    {
      titre: "Une promesse et une menace, une seule cause",
      donnees: "« La ville, lieu de tous les possibles ? »",
      schema: tensionVille,
      question: "Pourquoi la ville est-elle à la fois une chance et un danger ?",
      solution:
        "Pour la MÊME raison : personne ne vous y connait. C'est ce qui permet de devenir qui l'on veut, et c'est ce qui laisse seul. La promesse et la menace ne sont pas deux aspects opposés de la ville — elles ont une cause unique, et c'est pour cela que la question ne se tranche pas.",
      micros: ["4e_cult_ville"],
    },
    {
      titre: "Le point d'interrogation n'est pas décoratif",
      donnees: "Trois des cinq entrées se terminent par un point d'interrogation.",
      schema: maisUneQuestion,
      question: "Qu'est-ce que cela indique ?",
      solution:
        "Que le programme n'attend PAS de réponse unique. Une entrée qui interroge demande un débat, pas une leçon. Deux œuvres peuvent y répondre l'inverse et avoir toutes deux raison — et c'est même ce qu'on attend de l'année : que tu saches défendre une position en connaissant l'autre.",
      micros: ["4e_cult_individu_societe"],
    },
    {
      titre: "Ce qui tient les quatre ensemble",
      donnees: "La perspective annuelle : « Rêver, délibérer, développer son jugement. »",
      schema: perspectiveAnnuelle,
      question: "Qu'ont en commun les quatre entrées de l'année ?",
      solution:
        "Elles sont toutes des exercices de JUGEMENT, sur des terrains différents : le sentiment, la loi commune, le vrai et le faux, la vie collective. L'année ne cherche pas à te faire aimer la littérature — elle cherche à te faire penser par toi-même, et les textes sont les outils.",
      micros: ["4e_cult_individu_societe"],
    },
  ],
  pieges: [
    "Prendre une entrée pour un thème : « Dire l'amour » n'est pas « des textes sur l'amour », c'est une difficulté à affronter.",
    "Chercher la bonne réponse : un questionnement n'en a pas, et deux œuvres peuvent répondre l'inverse.",
    "Croire qu'un conflit de valeurs oppose le bien au mal : il oppose deux biens, et c'est ce qui le rend difficile.",
    "Résumer une œuvre au lieu de dire ce qu'elle répond à la question de l'entrée.",
    "Croire que la fiction s'éloigne du réel : elle le déplace pour le rendre visible.",
    "Oublier que le point d'interrogation du titre est un ordre : il demande un débat, pas une leçon.",
  ],
  aRetenir: [
    "Une entrée n'est pas un thème : c'est une question ouverte, et une tension entre deux forces.",
    "Dire l'amour : le sentiment déborde toujours les mots dont on dispose.",
    "Individu et société : deux valeurs également justes, et il faut choisir.",
    "La fiction déplace le réel pour le rendre visible. Le faux sert le vrai.",
    "Informer et déformer partent du même fait : entre les deux, quelqu'un choisit.",
    "La ville : la promesse et la solitude ont une cause unique — personne ne vous y connait.",
  ],
  entrainement: [
    {
      question: "« Dire l'amour » : quelles sont les deux forces qui s'opposent ?",
      correction: "Le sentiment qu'on éprouve, et les mots dont on dispose pour le dire.",
      micros: ["4e_cult_dire_amour"],
    },
    {
      question: "Pourquoi un conflit de valeurs est-il plus difficile qu'un conflit entre le bien et le mal ?",
      correction: "Parce que les deux camps ont raison : il faut choisir sans pouvoir s'appuyer sur une faute.",
      micros: ["4e_cult_individu_societe"],
    },
    {
      question: "Un récit d'anticipation parle-t-il du futur ?",
      correction: "Non : il parle du présent, déplacé juste assez pour qu'on le regarde autrement.",
      micros: ["4e_cult_fiction_reel"],
    },
    {
      question: "Faut-il mentir pour déformer une information ?",
      correction: "Non : il suffit de choisir — les mots, le cadrage, ce qu'on laisse dehors.",
      micros: ["4e_cult_informer_deformer"],
    },
    {
      question: "Pourquoi la ville promet-elle et menace-t-elle à la fois ?",
      correction: "Pour la même raison : personne n'y connait personne. C'est la liberté, et c'est la solitude.",
      micros: ["4e_cult_ville"],
    },
    {
      question: "Que demande le point d'interrogation à la fin d'une entrée ?",
      correction: "Un débat, pas une leçon : le programme n'attend pas de réponse unique.",
      micros: ["4e_cult_individu_societe"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=4e",
};

export const slidesCultureQuestionnements4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Questionnements - 4e",
    section: {
      type: "objectif",
      phrase: "Une entrée n'est pas un thème, c'est une tension",
      sousPhrase:
        "Deux forces qui tirent en sens contraire, et qu'aucune œuvre ne réconcilie tout à fait.",
      encadre: {
        titre: "L'idée",
        texte: "« Dire l'amour » : peut-on dire ce qu'on ressent ? Huit siècles de poètes s'y sont usés.",
      },
    },
  },
  {
    titre: "Les quatre entrées de l'année",
    badge: "Questionnements - 4e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Dire l'amour", texte: "Le sentiment contre les mots dont on dispose." },
        { titre: "Individu et société", texte: "Ce que je veux contre ce qu'on attend. Deux valeurs justes." },
        { titre: "La fiction et le réel", texte: "Inventer pour mieux montrer. Le faux sert le vrai." },
        { titre: "Informer, déformer", texte: "Le même fait, deux récits. Entre les deux, quelqu'un choisit." },
      ],
    },
    schema: pile(tensionAmour, tensionIndividu),
  },
  {
    titre: "Et la cinquième",
    badge: "Questionnements - 4e",
    section: {
      type: "objectif",
      phrase: "La ville, lieu de tous les possibles ?",
      sousPhrase:
        "On y devient qui on veut parce que personne ne vous connait — et on y est seul pour la même raison.",
    },
    schema: tensionVille,
  },
  {
    titre: "Ce qu'un questionnement n'est pas",
    badge: "Questionnements - 4e",
    section: {
      type: "duo",
      gauche: {
        titre: "⛔ Un thème",
        contenu: "« Des textes sur l'amour. » Cela ne dit rien, et n'ouvre aucun travail.",
      },
      droite: {
        titre: "✅ Une question",
        contenu: "« Peut-on dire ce qu'on ressent ? » Chaque œuvre y répond autrement.",
      },
    },
    schema: pile(pasUnTheme, maisUneQuestion),
  },
  {
    titre: "Le point d'interrogation est un ordre",
    badge: "Questionnements - 4e",
    section: {
      type: "objectif",
      phrase: "Le programme n'attend pas de réponse unique",
      sousPhrase:
        "Deux œuvres peuvent répondre l'inverse et avoir toutes deux raison. Ce qu'on te demande est de savoir défendre une position en connaissant l'autre.",
    },
    schema: perspectiveAnnuelle,
  },
  {
    titre: "À vous",
    badge: "Questionnements - 4e",
    section: {
      type: "exercice",
      enonce: "« La ville, lieu de tous les possibles ? »",
      question: "Pourquoi la ville est-elle à la fois une chance et un danger ?",
      indice: "Cherche la cause unique, pas deux causes opposées.",
      correction:
        "Pour la MÊME raison : personne ne vous y connait. C'est ce qui permet de devenir qui l'on veut, et c'est ce qui laisse seul. La question ne se tranche pas parce que la promesse et la menace ont une seule cause.",
    },
    schema: tensionVille,
  },
];
