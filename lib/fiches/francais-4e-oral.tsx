// ─── Fiche de cours : prendre la parole, écouter et interagir (4e) ────────────
// LA SEIZIÈME ET DERNIÈRE FICHE DE FRANÇAIS DE LA 4e. Avec elle, la classe
// devient la PREMIÈRE classe de français entièrement couverte du site : dix-neuf
// notions, dix-neuf notions fichées.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020, domaine « Oral ». Quatre objectifs :
// écouter et interpréter un propos, présenter clairement, justifier son point de
// vue dans un débat interprétatif, et dire ou jouer un texte.
//
// ⭐⭐ LA DIFFICULTÉ DE CETTE FICHE : L'ORAL NE LAISSE PAS DE TRACE. On ne peut
// pas dessiner une voix, et un enregistrement ne s'imprime pas. Ce qui se
// dessine, en revanche, c'est LA STRUCTURE DE CE QU'ON ENTEND — thèse,
// argument, exemple, objection, transition — et c'est exactement ce que le
// programme demande d'apprendre à repérer. Les groupes du canvas `phrase`
// servent donc ici de FICHE D'ÉCOUTE : chaque prise de parole se range.
//
// ⛔ ET CE QUI SE DESSINE AUSSI : CE QU'UN ARGUMENT N'EST PAS. L'affirmation
// répétée, l'appel à l'autorité, l'attaque de la personne, l'appel au nombre.
// Les quatre ont l'air d'arguments et n'en sont pas — et un dessin qui montre
// « ce qui reste quand on retire le ton » le fait voir mieux qu'une définition.
//
// ⭐ LA CONCESSION EST TRAITÉE COMME LE GESTE FORT DU DÉBAT, pas comme une
// politesse. Accorder un point à l'adversaire retire son meilleur argument
// avant qu'il le donne. Les élèves ne l'emploient jamais, et c'est le procédé
// qui fait le plus de différence dans un oral de brevet.
//
// Alignée sur les tables ECOUTER, PRESENTER, ARGUMENTER et JOUER de
// lib/tutor-v4/questionBank/4e/francais/ecriture-oral.bank.ts, écrite le 25/08.
//
// Micro-compétences couvertes (les 4 de la notion `oral`) :
// - 4e_oral_ecouter    → figure, propriétés 1 et 2, méthode 1, exemples 1 et 2
// - 4e_oral_presenter  → propriétés 3 et 4, méthode 2, exemples 3 et 4
// - 4e_oral_argumenter → propriétés 5 et 6, formule, méthode 3, exemples 5 et 6
// - 4e_oral_jouer      → propriété 7, méthode 4, exemple 7
//
// ⛔ RAPPEL DES PIÈGES DE FABRICATION, tous payés le 26/08 : pas de `titre` sur
// un dessin ; pas de markdown dans un texte de bloc ; pas de champ `infinitif`
// sur un canvas détourné ; la frise ne tient pas dans un bloc de fiche ; une
// étiquette de groupe ne se plie pas ; aucun caractère d'une autre écriture ;
// et LE RENDU SE REGARDE — trois défauts trouvés ainsi aujourd'hui.

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

// ─── La fiche d'écoute : ranger ce qu'on entend ───────────────────────────────
// ⚠️ Les groupes ne sont pas des fonctions grammaticales : ce sont les PIÈCES
// d'un discours entendu. Même dessin, autre usage.

// ── LA FIGURE DE RÉFÉRENCE : trois moments d'un même exposé, rangés.
const ecouteThese = phrase({
  mots: [
    { texte: "Je" },
    { texte: "vais" },
    { texte: "vous" },
    { texte: "montrer" },
    { texte: "que" },
    { texte: "la" },
    { texte: "lecture" },
    { texte: "rend" },
    { texte: "libre", focus: true },
  ],
  groupes: [{ mots: [0, 8], label: "la thèse" }],
  legende: "Ce qu'il veut nous faire admettre. Tout le reste y conduit.",
});

const ecouteArgument = phrase({
  mots: [
    { texte: "Lire" },
    { texte: "donne" },
    { texte: "accès" },
    { texte: "à" },
    { texte: "des" },
    { texte: "vies" },
    { texte: "qu'on" },
    { texte: "ne" },
    { texte: "vivra" },
    { texte: "pas", focus: true },
  ],
  groupes: [{ mots: [0, 9], label: "un argument" }],
  legende: "La RAISON qui soutient la thèse. Il peut y en avoir plusieurs.",
});

const ecouteExemple = phrase({
  mots: [
    { texte: "Tenez" },
    { texte: "," },
    { texte: "l'an" },
    { texte: "dernier" },
    { texte: "," },
    { texte: "un" },
    { texte: "élève" },
    { texte: "de" },
    { texte: "3e", focus: true },
  ],
  groupes: [{ mots: [0, 8], label: "un exemple" }],
  legende: "Le cas précis qui rend l'argument sensible. Il ne prouve pas seul.",
});

const ecouteObjection = phrase({
  mots: [
    { texte: "On" },
    { texte: "me" },
    { texte: "dira" },
    { texte: "qu'on" },
    { texte: "peut" },
    { texte: "voyager" },
    { texte: "sans" },
    { texte: "lire", focus: true },
  ],
  groupes: [{ mots: [0, 7], label: "une objection" }],
  legende: "Il donne l'avis adverse — pour y répondre juste après.",
});

// ── L'EXPOSÉ : chaque moment appelle un geste.
const exposeAnnonce = phrase({
  mots: [
    { texte: "je" },
    { texte: "commence" },
    { texte: "→" },
    { texte: "j'annonce", focus: true },
    { texte: "mon" },
    { texte: "plan" },
  ],
  legende: "L'auditoire sait où on l'emmène. Sans cela, il décroche.",
});

const exposeSilence = phrase({
  mots: [
    { texte: "phrase" },
    { texte: "importante" },
    { texte: "→" },
    { texte: "silence", focus: true },
    { texte: "avant" },
  ],
  legende: "Un silence avant l'essentiel : ce qui suit s'entend mieux.",
});

const exposeSupport = phrase({
  mots: [
    { texte: "le" },
    { texte: "support" },
    { texte: "répète", barre: true },
    { texte: "→" },
    { texte: "il" },
    { texte: "appuie", focus: true },
  ],
  legende: "Un diaporama qui redit la parole ne sert à rien : on lit, on n'écoute plus.",
});

// ── L'ARGUMENT, ET LES QUATRE CHOSES QUI LUI RESSEMBLENT.
const argumentVrai = phrase({
  mots: [
    { texte: "il" },
    { texte: "hésite", focus: true },
    { texte: "," },
    { texte: "car" },
    { texte: "sa" },
    { texte: "voix" },
    { texte: "tremble", focus: true },
  ],
  groupes: [
    { mots: [0, 1], label: "l'idée" },
    { mots: [3, 6], label: "la raison" },
  ],
  legende: "Un argument : une idée, ET une raison tirée du texte.",
});

const argumentNu = phrase({
  mots: [
    { texte: "il" },
    { texte: "hésite", focus: true },
    { texte: "," },
    { texte: "c'est" },
    { texte: "évident" },
    { texte: "," },
    { texte: "ça" },
    { texte: "se" },
    { texte: "voit" },
  ],
  groupes: [{ mots: [0, 1], label: "l'idée, répétée" }],
  legende: "Une affirmation nue : elle se répète, elle ne se justifie pas.",
});

const argumentNombre = phrase({
  mots: [
    { texte: "toute" },
    { texte: "la" },
    { texte: "classe", focus: true },
    { texte: "le" },
    { texte: "pense" },
    { texte: "," },
    { texte: "on" },
    { texte: "est" },
    { texte: "douze" },
  ],
  legende: "Un appel au nombre : être nombreux ne prouve rien du tout.",
});

const argumentConcession = phrase({
  mots: [
    { texte: "c'est" },
    { texte: "vrai", focus: true },
    { texte: "qu'il" },
    { texte: "tremble" },
    { texte: ";" },
    { texte: "mais", focus: true },
    { texte: "il" },
    { texte: "agit" },
    { texte: "ensuite" },
  ],
  groupes: [
    { mots: [0, 3], label: "je t'accorde" },
    { mots: [5, 8], label: "et pourtant" },
  ],
  legende: "La concession : on retire à l'autre son meilleur argument avant qu'il le donne.",
});

// ── DIRE ET JOUER : les indications sont dans le texte.
const jeuAPart = phrase({
  mots: [
    { texte: "(à" },
    { texte: "part)", focus: true },
    { texte: "→" },
    { texte: "je" },
    { texte: "parle" },
    { texte: "au" },
    { texte: "public", focus: true },
  ],
  legende: "L'aparté sort du dialogue : on change de destinataire, pas de volume.",
});

const jeuIronie = phrase({
  mots: [
    { texte: "«" },
    { texte: "Quel" },
    { texte: "courage", focus: true },
    { texte: "!" },
    { texte: "»" },
    { texte: "→" },
    { texte: "à" },
    { texte: "un" },
    { texte: "fuyard", focus: true },
  ],
  legende: "Le ton doit dire l'INVERSE des mots. C'est cela, jouer l'ironie.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheOral4e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "4e",
  notion: "oral",
  titre: "Prendre la parole, écouter et interagir en 4e (2026-2027)",
  accroche:
    "« Toute la classe le pense, on est douze à le dire. » Cette phrase a le ton d'un argument, la longueur d'un argument, l'assurance d'un argument — et ce n'en est pas un. Être nombreux ne prouve rien. Reconnaitre ce qui ressemble à une raison sans en être une est le vrai travail de l'oral, et il commence par savoir écouter.",
  identite: [
    { label: "Mots clés", valeur: "Thèse, argument, exemple, objection, concession" },
    { label: "Le secret", valeur: "Ranger ce qu'on entend au lieu de tout noter" },
    { label: "Outil", valeur: "Retirer le ton, et regarder ce qui reste" },
  ],
  definition: {
    texte:
      "L'oral se travaille dans les deux sens, et l'écoute vient en premier. ÉCOUTER n'est pas tout noter : c'est RANGER ce qui arrive — la thèse est ce qu'on veut nous faire admettre, l'argument la raison qui la soutient, l'exemple le cas qui la rend sensible, l'objection l'avis d'en face qu'on donne pour y répondre, la transition ce qui annonce la suite. PRÉSENTER, ensuite, c'est enchainer des gestes à des moments précis : annoncer son plan, illustrer, ménager un silence avant l'essentiel, regarder la salle, récapituler. ARGUMENTER, c'est donner une raison — et quatre choses lui ressemblent sans en être : l'affirmation répétée, l'appel à l'autorité, l'attaque de la personne, l'appel au nombre. DIRE OU JOUER un texte, enfin, c'est suivre les indications qu'il porte déjà.",
  },
  figure: {
    schema: pile(ecouteThese, ecouteArgument, ecouteExemple),
    legende:
      "Trois moments du même exposé, rangés au lieu d'être recopiés. En haut la thèse : ce qu'il veut nous faire admettre. Au milieu l'argument : la raison qui la soutient. En bas l'exemple : le cas précis qui la rend sensible — et qui ne prouve rien tout seul. Les crochets ne marquent pas une fonction grammaticale ici : ils marquent les pièces d'un discours entendu.",
  },
  proprietes: [
    {
      titre: "Écouter, c'est ranger — pas tout noter",
      texte:
        "Trois colonnes suffisent : thèse, arguments, exemples. Celui qui note chaque phrase ne retient rien, parce qu'il n'a pas le temps de comprendre.",
      schema: pile(ecouteThese, ecouteArgument),
      micros: ["4e_oral_ecouter"],
    },
    {
      titre: "L'objection et la transition se reconnaissent à ce qu'elles annoncent",
      texte:
        "« On me dira que… » donne l'avis adverse pour y répondre. « J'en viens maintenant à… » annonce la partie suivante. Ni l'une ni l'autre n'est un argument.",
      schema: ecouteObjection,
      micros: ["4e_oral_ecouter"],
    },
    {
      titre: "Chaque moment de l'exposé appelle un geste",
      texte:
        "On annonce son plan au début, on illustre quand l'idée devient abstraite, on ménage un silence avant l'essentiel, on récapitule à la fin.",
      schema: pile(exposeAnnonce, exposeSilence),
      micros: ["4e_oral_presenter"],
    },
    {
      titre: "Un support appuie la parole, il ne la double pas",
      texte:
        "Un diaporama qui reprend le texte prononcé fait décrocher : on lit, et on n'écoute plus. Peu de mots, une image, un chiffre.",
      schema: exposeSupport,
      micros: ["4e_oral_presenter"],
    },
    {
      titre: "Un argument donne une raison, et rien d'autre ne compte",
      texte:
        "« Il hésite, car sa voix tremble » : une idée, et une raison prise dans le texte. C'est le seul modèle, et il tient en une phrase.",
      schema: argumentVrai,
      micros: ["4e_oral_argumenter"],
    },
    {
      titre: "Quatre choses ressemblent à un argument sans en être",
      texte:
        "L'affirmation qu'on répète plus fort, l'avis d'une personne qu'on admire, l'attaque de celui qui parle, et le nombre de gens d'accord.",
      schema: pile(argumentNu, argumentNombre),
      micros: ["4e_oral_argumenter"],
    },
    {
      titre: "La concession est le geste le plus fort du débat",
      texte:
        "Accorder d'abord un point retire à l'adversaire son meilleur argument avant qu'il le donne. Les élèves ne l'emploient jamais.",
      schema: argumentConcession,
      micros: ["4e_oral_argumenter"],
    },
  ],
  reel: {
    texte:
      "Les quatre faux arguments ne sont pas des curiosités d'école : ce sont les quatre formes les plus courantes de la discussion en ligne. « Tout le monde le sait » est un appel au nombre. « Tu dis ça parce que tu es… » est une attaque de la personne. Un lien vers quelqu'un de connu qui pense pareil est un appel à l'autorité. Et la majuscule répétée est une affirmation qu'on hausse au lieu de la justifier. Savoir les nommer change complètement une conversation : on cesse de répondre à l'agacement, et l'on demande la seule chose qui manque — une raison. La plupart du temps, il n'y en a pas, et cela se voit alors sans qu'on ait à le dire.",
  },
  historique: {
    texte:
      "Ces pièges portent des noms depuis vingt-quatre siècles. Aristote, dans les Réfutations sophistiques, en recense treize, et l'on y reconnait sans peine ceux d'aujourd'hui : l'argument qui vise la personne, celui qui invoque la foule, celui qui déplace la question. Il ne les décrivait pas pour en faire la liste noire, mais parce qu'ils MARCHENT — un raisonnement faux qui convainc est un objet d'étude, pas seulement une faute. Les sophistes, contre qui il écrivait, enseignaient d'ailleurs à les employer, et se faisaient payer cher pour cela. Rien n'a changé depuis, sinon la vitesse : ce qu'on apprenait sur l'agora se pratique aujourd'hui devant quelques millions de personnes en quelques secondes.",
  },
  formule: {
    contexte: "Le test qui sépare un argument de ce qui lui ressemble.",
    expression: "je retire le ton, et je regarde ce qui reste",
    legende:
      "S'il reste une RAISON — un fait du texte, un chiffre vérifiable, une conséquence — c'est un argument. S'il ne reste qu'un nom célèbre, un nombre de gens d'accord, une personne visée, ou la même idée répétée plus fort, ce n'en est pas un. Le test marche aussi sur ce qu'on s'apprête à dire soi-même.",
    schema: pile(argumentVrai, argumentNu),
  },
  methode: [
    {
      titre: "Écouter en trois colonnes",
      texte:
        "Thèse, arguments, exemples. Ce qui n'entre dans aucune des trois est une objection ou une transition — et se reconnait à ce qu'il annonce.",
      schema: pile(ecouteThese, ecouteObjection),
      micros: ["4e_oral_ecouter"],
    },
    {
      titre: "Préparer ses gestes en même temps que son contenu",
      texte:
        "Écris dans la marge de tes notes où tu annonces, où tu t'arrêtes, où tu regardes la salle. Sinon tu ne feras rien de tout cela.",
      schema: pile(exposeAnnonce, exposeSilence),
      micros: ["4e_oral_presenter"],
    },
    {
      titre: "Avant de parler dans un débat : formuler la raison",
      texte:
        "Dis-toi la phrase entière dans ta tête : mon idée, puis « parce que » suivi d'un fait. Si le « parce que » ne vient pas, ton tour n'est pas prêt.",
      schema: argumentVrai,
      micros: ["4e_oral_argumenter"],
    },
    {
      titre: "Pour jouer : chercher les indications écrites",
      texte:
        "« À part », « bas », les points de suspension, la longueur des répliques. Elles décident du jeu avant toi — et l'ironie demande le ton contraire des mots.",
      schema: pile(jeuAPart, jeuIronie),
      micros: ["4e_oral_jouer"],
    },
  ],
  usages: [
    {
      titre: "En ligne : nommer le faux argument",
      detail:
        "« Tout le monde le sait » est un appel au nombre. Le dire calmement change la conversation, parce qu'il ne reste plus qu'à donner une raison.",
      schema: argumentNombre,
      micros: ["4e_oral_argumenter"],
    },
    {
      titre: "En cours : la concession désamorce",
      detail:
        "« C'est vrai que… mais » retire son meilleur argument à l'autre. C'est le procédé qui fait le plus de différence à l'oral du brevet.",
      schema: argumentConcession,
      micros: ["4e_oral_argumenter"],
    },
    {
      titre: "En réunion ou en exposé : le silence travaille",
      detail:
        "Un silence avant une phrase importante la fait entendre. C'est gratuit, et presque personne ne l'utilise.",
      schema: exposeSilence,
      micros: ["4e_oral_presenter"],
    },
  ],
  exemples: [
    {
      titre: "Que viens-tu d'entendre ?",
      donnees: "« Je vais vous montrer que la lecture rend plus libre. »",
      schema: ecouteThese,
      question: "Quelle pièce du discours est-ce ?",
      solution:
        "La THÈSE : ce qu'il veut nous faire admettre à la fin. Tout ce qui suivra y conduira. La repérer dès les premières phrases permet de ranger le reste — et elle est presque toujours annoncée, par « je vais montrer que », « il faut selon moi », « ce que je veux vous faire comprendre ».",
      micros: ["4e_oral_ecouter"],
    },
    {
      titre: "Et celle-ci ?",
      donnees: "« On me dira qu'on peut voyager sans lire ; c'est vrai, mais… »",
      schema: ecouteObjection,
      question: "Argument, ou autre chose ?",
      solution:
        "Une OBJECTION : il donne l'avis adverse, et il le donne lui-même pour pouvoir y répondre. Ce n'est pas un argument en faveur de sa thèse — c'est un argument contre, qu'il désamorce. À l'écoute, cela se range à part.",
      micros: ["4e_oral_ecouter"],
    },
    {
      titre: "Le début d'un exposé",
      donnees: "« Tu viens de dire bonjour, et la classe ne sait pas où tu vas. »",
      schema: exposeAnnonce,
      question: "Que fais-tu à cet instant ?",
      solution:
        "Tu ANNONCES TON PLAN. L'auditoire a besoin de savoir où on l'emmène pour pouvoir suivre : sans carte, il décroche au bout d'une minute. Deux phrases suffisent — « je vais d'abord montrer…, ensuite… ».",
      micros: ["4e_oral_presenter"],
    },
    {
      titre: "Le diaporama",
      donnees: "« Ton diaporama affiche exactement le texte que tu prononces. »",
      schema: exposeSupport,
      question: "Pourquoi est-ce un problème ?",
      solution:
        "Parce que l'auditoire LIT, et cesse d'écouter. On ne peut pas faire les deux : la lecture est plus rapide que la parole, donc le public finit avant toi et s'ennuie. Un support porte peu de mots, une image ou un chiffre — le reste est dans ta bouche.",
      micros: ["4e_oral_presenter"],
    },
    {
      titre: "Est-ce un argument ?",
      donnees: "« Il hésite, c'est évident, ça se voit tout de suite. »",
      schema: argumentNu,
      question: "Que vaut cette prise de parole ?",
      solution:
        "Rien : c'est une AFFIRMATION NUE. Retire le ton et regarde ce qui reste — l'idée, répétée trois fois avec des mots différents. « C'est évident » n'est pas une raison, c'est une façon de dire qu'on n'en donnera pas. Il aurait suffi d'ajouter : « car le texte dit que sa voix tremble ».",
      micros: ["4e_oral_argumenter"],
    },
    {
      titre: "Le geste que personne n'emploie",
      donnees: "« C'est vrai qu'il tremble ; mais il agit quand même, ensuite. »",
      schema: argumentConcession,
      question: "Pourquoi commencer par donner raison à l'autre ?",
      solution:
        "Parce qu'on lui RETIRE son meilleur argument avant qu'il le donne. Une fois que tu as accordé qu'il tremble, il ne peut plus le brandir — et ce qui suit devient beaucoup plus difficile à refuser. C'est le procédé qui fait le plus de différence dans un débat, et celui qu'on voit le moins en classe.",
      micros: ["4e_oral_argumenter"],
    },
    {
      titre: "Jouer une réplique",
      donnees: "La réplique dit « Quel courage vous avez ! » à un personnage qui fuit.",
      schema: jeuIronie,
      question: "Comment la jouer ?",
      solution:
        "En faisant entendre le CONTRAIRE des mots. Dire « quel courage » sur un ton admiratif ne joue pas la scène : cela l'annule. L'ironie n'est pas dans le texte, elle est dans l'écart entre le texte et la voix — et c'est le comédien qui doit le creuser.",
      micros: ["4e_oral_jouer"],
    },
  ],
  pieges: [
    "Noter chaque phrase d'un exposé : on n'a plus le temps de comprendre, et l'on ne retient rien.",
    "Prendre une objection pour un argument : celui qui parle la donne pour y répondre.",
    "Croire qu'un support doit tout contenir : s'il redit la parole, l'auditoire lit et n'écoute plus.",
    "Confondre l'assurance et la preuve : « c'est évident » est une façon de ne pas donner de raison.",
    "Prendre le nombre pour un argument : douze personnes d'accord ne font pas une raison.",
    "Jouer l'ironie sur le ton des mots : elle demande exactement le ton contraire.",
  ],
  aRetenir: [
    "Écouter, c'est RANGER : thèse, argument, exemple — et à part, objection et transition.",
    "Chaque moment d'un exposé appelle un geste : annoncer, illustrer, faire silence, récapituler.",
    "Un support appuie la parole, il ne la double jamais.",
    "Un argument donne une IDÉE et une RAISON. Le reste lui ressemble sans en être.",
    "Les quatre faux : l'affirmation répétée, l'autorité, l'attaque de la personne, le nombre.",
    "La concession est le geste le plus fort du débat, et le moins employé.",
  ],
  entrainement: [
    {
      question: "« Car beaucoup d'élèves n'ont pas d'endroit calme chez eux. » Quelle pièce ?",
      correction: "Un argument : la raison qui vient soutenir la thèse.",
      micros: ["4e_oral_ecouter"],
    },
    {
      question: "« Nous avons vu le pourquoi ; venons-en au comment. » Quelle pièce ?",
      correction: "Une transition : elle annonce la partie qui va venir.",
      micros: ["4e_oral_ecouter"],
    },
    {
      question: "« Tu conclus par “voilà, j'ai fini” et tu retournes t'assoir. » Que manque-t-il ?",
      correction: "La récapitulation : on retient ce que tu redis pour finir.",
      micros: ["4e_oral_presenter"],
    },
    {
      question: "« Elle ment, c'est écrit dans le résumé au dos du livre. » Que vaut cette parole ?",
      correction: "Un appel à l'autorité : on s'abrite derrière quelqu'un au lieu de donner une raison.",
      micros: ["4e_oral_argumenter"],
    },
    {
      question: "« Tu défends ça parce que tu défends toujours les personnages. » Que vaut-elle ?",
      correction: "Une attaque personnelle : on vise la personne, pas l'idée.",
      micros: ["4e_oral_argumenter"],
    },
    {
      question: "« Le texte porte l'indication “(à part)”. » Que fais-tu ?",
      correction: "Tu t'adresses au public : l'aparté sort du dialogue en cours.",
      micros: ["4e_oral_jouer"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=4e",
};

export const slidesOral4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Prendre la parole - 4e",
    section: {
      type: "objectif",
      phrase: "Reconnaitre ce qui ressemble à une raison sans en être une",
      sousPhrase:
        "Écouter, c'est ranger. Argumenter, c'est donner une raison. Le reste est du ton.",
      encadre: {
        titre: "L'idée",
        texte: "« Toute la classe le pense, on est douze. » Ce n'est pas un argument.",
      },
    },
  },
  {
    titre: "Écouter en trois colonnes",
    badge: "Prendre la parole - 4e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "La thèse", texte: "Ce qu'il veut nous faire admettre. Presque toujours annoncée." },
        { titre: "L'argument", texte: "La raison qui la soutient. Il peut y en avoir plusieurs." },
        { titre: "L'exemple", texte: "Le cas précis. Il rend sensible, il ne prouve pas seul." },
        { titre: "À part", texte: "L'objection donne l'avis adverse ; la transition annonce la suite." },
      ],
    },
    schema: pile(ecouteThese, ecouteArgument),
  },
  {
    titre: "Le test",
    badge: "Prendre la parole - 4e",
    section: {
      type: "objectif",
      phrase: "Je retire le ton, et je regarde ce qui reste",
      sousPhrase:
        "Une raison ? C'est un argument. Un nom célèbre, un nombre, une personne visée, ou la même idée répétée plus fort ? Ce n'en est pas un.",
    },
    schema: pile(argumentVrai, argumentNu),
  },
  {
    titre: "Les quatre faux arguments",
    badge: "Prendre la parole - 4e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "L'affirmation nue", texte: "« C'est évident, ça se voit. » On répète, on ne justifie pas." },
        { titre: "L'autorité", texte: "« C'est écrit au dos du livre. » On s'abrite derrière quelqu'un." },
        { titre: "L'attaque", texte: "« Tu dis ça parce que tu es… » On vise la personne, pas l'idée." },
        { titre: "Le nombre", texte: "« On est douze à le penser. » Être nombreux ne prouve rien." },
      ],
    },
    schema: pile(argumentNu, argumentNombre),
  },
  {
    titre: "Le geste que personne n'emploie",
    badge: "Prendre la parole - 4e",
    section: {
      type: "objectif",
      phrase: "« C'est vrai que… mais »",
      sousPhrase:
        "Accorder d'abord un point retire à l'adversaire son meilleur argument avant qu'il le donne. La suite devient beaucoup plus difficile à refuser.",
    },
    schema: argumentConcession,
  },
  {
    titre: "À vous",
    badge: "Prendre la parole - 4e",
    section: {
      type: "exercice",
      enonce: "« Il hésite, c'est évident, ça se voit tout de suite. »",
      question: "Que vaut cette prise de parole, et comment la réparer ?",
      indice: "Retire le ton, et regarde ce qui reste.",
      correction:
        "Une affirmation nue : l'idée répétée trois fois, et aucune raison. « C'est évident » est une façon de dire qu'on n'en donnera pas. Il suffisait d'ajouter : « car le texte dit que sa voix tremble ».",
    },
    schema: pile(argumentNu, argumentVrai),
  },
];
