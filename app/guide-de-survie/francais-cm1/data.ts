// ─── Guide de survie · Français CM1 (avant-dernière année de primaire) ────────
// Contenu ALIGNÉ sur le coach (source de vérité unique) :
// - chapitres      = notions de lib/tutor-v4/knowledge/francais/cm1/notions.ts
// - checklists     = micro-compétences de microSkills.ts (BO cycle 3)
// - test de survie = items "fixed" imprimables de la couche francaisCm1FixedBank
//   (le builder cycle 3 ne produit que des "template" → testDeSurvie serait vide
//   sans cette couche). Cette même couche enrichit aussi le coach (index.ts).
// Condensés écrits par 8 rédacteurs parallèles (workflow) puis VÉRIFIÉS à la main
// contre le BO cycle 3 (orthographe, accords, conjugaisons, périmètre CM1).
// ⚠️ Ici le bloc « formules » du KitNotion porte LES RÈGLES QUI SAUVENT (texte,
// pas de LaTeX) : accords, conjugaison, homophones, ponctuation.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/cm1/microSkills";
import { kitHelpers } from "@/components/kit/fromCoach";
import { francaisCm1FixedBank } from "@/lib/tutor-v4/questionBank/cm1/francais/fixed.bank";
import type { KitData, KitNotion } from "@/components/kit/types";

// Checklists + tests dérivés du coach (module partagé par tous les guides).
const { microsDe, testDeSurvie } = kitHelpers(microSkills);

type Condense = Omit<KitNotion, "micros" | "exos">;

const CONDENSES: Condense[] = [
  {
    id: "fluence_lecture",
    emoji: "📖",
    titre: "Lire avec fluidité",
    domaine: "Lecture",
    essentiel:
      "Lire avec **fluidité**, c'est lire sans buter sur les mots, en respectant la **ponctuation** et les **groupes de sens**. Je lis à voix haute avec **expressivité**, ni trop vite ni trop lentement, pour bien comprendre l'histoire.",
    formules: [
      { label: "Je m'arrête au point", latex: "Au point, je marque une pause et je baisse la voix. Exemple : Le chien aboie. Le chat s'enfuit." },
      { label: "Je respire à la virgule", latex: "À la virgule, je fais une toute petite pause sans baisser la voix. Exemple : Dans mon sac, il y a un cahier, un stylo et une gomme." },
      { label: "Je lis par groupes de mots", latex: "Je regroupe les mots qui vont ensemble au lieu de lire mot à mot. Exemple : Le petit garçon / court vers la plage." },
      { label: "La voix qui monte pour la question", latex: "Devant un point d'interrogation, je fais monter la voix comme pour interroger. Exemple : Où est ton cartable ?" },
      { label: "Les mots que je connais par cœur", latex: "Certains mots reviennent très souvent : je les reconnais d'un seul coup d'œil sans les déchiffrer. Exemple : les, avec, monsieur, femme, aujourd'hui." },
    ],
    reflexes: [
      { si: "je vois un point", alors: "je marque une pause et je baisse la voix" },
      { si: "je vois un point d'interrogation", alors: "je fais monter la voix comme pour poser une question" },
      { si: "je bute sur un mot difficile", alors: "je le relis calmement en le découpant en syllabes" },
      { si: "le texte fait une page entière", alors: "je lis par petits groupes de mots pour ne pas me fatiguer" },
    ],
    pieges: [
      "Lire mot à mot, en s'arrêtant après chaque mot : je dois lire par groupes de sens pour aller plus vite et mieux comprendre.",
      "Lire trop vite sans respecter la ponctuation : je saute les pauses et je ne comprends plus rien ; je dois m'arrêter aux points et aux virgules.",
      "Lire tout sur le même ton, comme un robot : je dois mettre le ton, faire monter la voix pour une question et la baisser à la fin d'une phrase.",
    ],
    reel: "En vrai, quand tu lis à voix haute la recette du rougail saucisse à Saint-Pierre, tu t'arrêtes à chaque étape pour ne pas oublier un ingrédient",
  },
  {
    id: "comprehension_textes_documents",
    emoji: "🔎",
    titre: "Comprendre un texte",
    domaine: "Lecture",
    essentiel:
      "Pour **comprendre un texte**, je cherche d'abord les **informations explicites**, celles qui sont écrites, puis je devine les **informations implicites**, celles qui sont sous-entendues. Je repère aussi la **nature** du texte (récit, poème, théâtre, documentaire) et sa **source**, pour savoir d'où vient l'information.",
    formules: [
      { label: "Lire avec une stratégie", latex: "Avant de lire, je regarde le titre et les images pour deviner le sujet. Pendant la lecture, je m'arrête pour vérifier que j'ai bien compris. Exemple : le titre « Les tortues de mer » m'annonce que le texte parle des tortues." },
      { label: "Information explicite", latex: "L'information explicite est écrite dans le texte : je la retrouve en relisant. Exemple : « Le petit chat gris dormait, roulé en boule au creux du fauteuil. » Où dort le chat ? Au creux du fauteuil." },
      { label: "Information implicite", latex: "L'information implicite n'est pas écrite : je la devine grâce aux indices du texte. Exemple : « Léo n'avait rien mangé depuis le matin. Son ventre gargouillait. » Je comprends que Léo a faim." },
      { label: "Nature du texte", latex: "Je reconnais la nature du texte : le récit raconte une histoire, le poème joue avec les mots et les rimes, la pièce de théâtre se lit avec des dialogues et des noms de personnages, le documentaire donne des informations vraies." },
      { label: "Source d'un document", latex: "La source indique d'où vient le document : un journal, un magazine ou un site. Exemple : « Source : magazine scientifique junior » me dit où l'information a été trouvée." },
    ],
    reflexes: [
      { si: "la question demande où, quand ou qui", alors: "je relis le texte pour trouver l'information qui y est écrite" },
      { si: "la réponse n'est pas écrite dans le texte", alors: "je cherche les indices pour la deviner" },
      { si: "on me demande la nature du texte", alors: "je regarde s'il y a des rimes, des dialogues ou des informations vraies" },
      { si: "on me demande la source du document", alors: "je cherche d'où il vient : journal, magazine ou site" },
    ],
    pieges: [
      "Inventer une réponse au lieu de relire : pour une information explicite, je dois toujours retrouver la phrase exacte dans le texte.",
      "Confondre ce qui est écrit et ce que je devine : une information implicite se déduit des indices, elle n'est jamais donnée directement.",
      "Confondre un documentaire et un récit : le documentaire donne des informations vraies, alors que le récit raconte une histoire imaginée.",
    ],
    reel: "Dans un documentaire sur le Piton de la Fournaise, la source « parc national de La Réunion » me dit d'où vient l'information",
  },
  {
    id: "lecture_oeuvres",
    emoji: "📚",
    titre: "Lire une œuvre",
    domaine: "Lecture",
    essentiel:
      "Lire une **œuvre**, c'est suivre une histoire du début à la fin et se faire son propre avis. On repère le **héros** et les autres **personnages**, on exprime sa **réaction** de lecteur, et on garde une **trace** de ses lectures pour s'en souvenir.",
    formules: [
      { label: "Le héros", latex: "Le héros est le personnage principal, celui qui vit l'aventure du début à la fin. Exemple : dans une histoire de pirates, le héros est le jeune mousse qui cherche le trésor." },
      { label: "Les personnages et leurs liens", latex: "Les autres personnages entourent le héros : ce sont ses amis, sa famille ou ses ennemis. Exemple : le loup est l'ennemi du Petit Chaperon rouge." },
      { label: "Exprimer sa réaction", latex: "Je peux dire ce que je ressens en lisant, avec des mots comme j'ai aimé, j'ai eu peur, cela m'a fait rire. Exemple : J'ai eu peur quand le loup est apparu." },
      { label: "La morale", latex: "Certaines histoires, comme les fables, veulent faire comprendre une leçon : c'est la morale. Exemple : dans Le Lièvre et la Tortue, la morale est qu'il vaut mieux être régulier que trop sûr de soi." },
      { label: "Le carnet de lecture", latex: "Pour garder une trace, je note le titre, l'auteur et ce que j'ai pensé du livre. Exemple : Titre : Le Petit Prince ; ce que j'ai aimé : le renard." },
    ],
    reflexes: [
      { si: "la consigne demande qui est le personnage principal", alors: "je pense au héros, celui qui vit l'aventure d'un bout à l'autre" },
      { si: "on me demande mon avis sur le livre", alors: "j'exprime une réaction personnelle : j'ai aimé, j'ai eu peur, cela m'a fait rire" },
      { si: "je dois me souvenir de mes lectures", alors: "je remplis mon carnet avec le titre, l'auteur et mon avis" },
      { si: "je lis un livre long", alors: "je continue un peu chaque jour sans abandonner" },
    ],
    pieges: [
      "Confondre le héros avec un personnage secondaire : le héros est celui qui vit l'aventure du début à la fin, pas celui qui apparaît une seule fois.",
      "Raconter toute l'histoire alors qu'on demande une réaction personnelle : là, il faut dire ce que l'on ressent, comme j'ai aimé ou j'ai eu peur.",
      "Oublier de noter le titre et l'auteur dans son carnet de lecture, ce qui empêche de retrouver le livre plus tard.",
    ],
    reel: "À la médiathèque de Saint-Pierre, beaucoup d'élèves tiennent un carnet où ils notent chaque roman lu pendant les vacances",
  },
  {
    id: "ecriture",
    emoji: "✍️",
    titre: "Écrire un texte",
    domaine: "Écriture",
    essentiel:
      "Pour **écrire un texte** clair, je choisis mes idées, je les range dans l'**ordre** et je fais des **phrases** courtes bien ponctuées. À la fin, je me **relis** toujours pour corriger mes erreurs.",
    formules: [
      { label: "Une idée par phrase", latex: "J'écris une idée à la fois et je fais des phrases courtes. Exemple : Le chien court. Il attrape la balle." },
      { label: "Majuscule et point", latex: "Chaque phrase commence par une majuscule et se termine par un point. Exemple : Nous partons à la plage." },
      { label: "Ranger avec des mots-liens", latex: "Pour ordonner un récit, j'utilise d'abord, ensuite, puis, enfin. Exemple : D'abord je me lève, ensuite je déjeune, enfin je pars à l'école." },
      { label: "Un paragraphe, une idée", latex: "Je regroupe dans un même paragraphe les phrases qui parlent de la même chose, et je vais à la ligne quand je change d'idée." },
      { label: "Se relire", latex: "Avant de rendre mon texte, je me relis pour vérifier les majuscules, les points et l'orthographe. Exemple : je remplace « les chat dort » par « le chat dort »." },
    ],
    reflexes: [
      { si: "la consigne dit « raconte une histoire »", alors: "je range les événements avec d'abord, ensuite, enfin" },
      { si: "la consigne dit « décris »", alors: "je donne des détails : la couleur, la taille, la forme" },
      { si: "ma phrase devient très longue", alors: "je la coupe en deux phrases plus courtes" },
      { si: "j'ai fini d'écrire", alors: "je me relis pour corriger les erreurs" },
    ],
    pieges: [
      "Écrire une phrase sans fin en collant toutes les idées : « je me lève et je mange et je pars et... ». Il vaut mieux couper en plusieurs phrases courtes.",
      "Oublier la majuscule au début ou le point à la fin de la phrase. On relit chaque phrase pour vérifier qu'elle commence par une majuscule et se termine par un point.",
      "Mélanger l'ordre du récit en racontant la fin avant le début. On range les étapes dans l'ordre avec d'abord, ensuite, enfin.",
    ],
    reel: "En classe à Saint-Denis, pour raconter la sortie au Jardin de l'État, on écrit d'abord ce qu'on voit en arrivant, ensuite les animaux, enfin le pique-nique",
  },
  {
    id: "oral",
    emoji: "🗣️",
    titre: "S'exprimer à l'oral",
    domaine: "Oral",
    essentiel:
      "S'exprimer à l'oral, c'est **écouter** avec attention, **parler clairement** et **respecter la parole** des autres. Je peux raconter, présenter un travail ou donner mon **avis**, en disant toujours **pourquoi** je le pense.",
    formules: [
      { label: "Bien écouter", latex: "Pour comprendre un texte ou une consigne, je me tais et je regarde la personne qui parle. Exemple : quand la maîtresse lit la consigne, j'écoute sans jouer avec ma trousse." },
      { label: "Reformuler", latex: "Reformuler, c'est redire avec mes propres mots ce que j'ai entendu. Exemple : la consigne dit « Souligne les verbes », je reformule : je dois trouver les verbes et les souligner." },
      { label: "Parler clairement", latex: "Pour présenter une lecture ou un travail, je parle assez fort, sans aller trop vite, et je regarde ceux qui m'écoutent. Exemple : je présente mon livre en articulant bien chaque mot." },
      { label: "Donner un avis justifié", latex: "Donner un avis, c'est dire ce que je pense et pourquoi. Exemple : J'ai aimé cette histoire parce que la fin est surprenante." },
      { label: "Respecter la parole", latex: "Dans un échange, j'attends mon tour et je ne coupe pas la parole. Exemple : je lève la main et j'attends que mon camarade ait fini de parler." },
    ],
    reflexes: [
      { si: "la consigne dit « écoute »", alors: "je me tais et je fais attention à chaque mot" },
      { si: "on me demande de redire ce que j'ai compris", alors: "je reformule avec mes propres mots" },
      { si: "on me demande mon avis", alors: "je dis ce que je pense et j'ajoute pourquoi" },
      { si: "c'est mon camarade qui parle", alors: "j'attends mon tour sans le couper" },
    ],
    pieges: [
      "Parler en même temps que les autres : on n'entend plus rien. Il faut attendre son tour de parole.",
      "Donner un avis sans l'expliquer, par exemple dire seulement « c'est nul ». Il faut ajouter pourquoi : je n'ai pas aimé parce que…",
      "Parler trop bas ou trop vite : personne ne comprend. Il faut articuler et parler assez fort.",
    ],
    reel: "À la fête de fin d'année de l'école, à Saint-Paul, chaque élève récite sa poésie devant la classe en articulant bien pour être entendu de tous",
  },
  {
    id: "vocabulaire",
    emoji: "🔤",
    titre: "Le vocabulaire",
    domaine: "Étude de la langue",
    essentiel:
      "Le **vocabulaire**, c'est tous les mots que l'on connaît et que l'on apprend. Le **contexte** de la phrase aide à deviner un mot inconnu, les mots d'une même **famille** partagent une racine, et les **synonymes** ou les **antonymes** disent la même chose ou le contraire.",
    formules: [
      { label: "Deviner par le contexte", latex: "Quand un mot est inconnu, je lis toute la phrase pour deviner son sens. Dans « Le chemin était boueux après la pluie », boueux veut dire plein de boue." },
      { label: "Les familles de mots", latex: "Les mots d'une même famille ont la même racine et parlent de la même idée. Dent, dentiste et dentaire appartiennent à la famille de dent." },
      { label: "Les synonymes", latex: "Un synonyme est un mot qui a presque le même sens qu'un autre. Content et joyeux sont des synonymes." },
      { label: "Les antonymes", latex: "Un antonyme est un mot de sens contraire. Le contraire de content est triste." },
      { label: "Les mots à plusieurs sens", latex: "Un même mot peut avoir plusieurs sens selon la phrase. Le mot glace peut désigner un dessert froid ou un miroir." },
    ],
    reflexes: [
      { si: "je ne comprends pas un mot", alors: "je lis toute la phrase pour deviner son sens grâce au contexte" },
      { si: "on me demande un mot de la même famille", alors: "je cherche la racine commune, comme dent dans dentiste" },
      { si: "on me demande le contraire d'un mot", alors: "je pense à un antonyme, comme triste pour content" },
      { si: "je réemploie un mot nouveau", alors: "je vérifie son orthographe et que son sens va bien dans ma phrase" },
    ],
    pieges: [
      "Confondre synonyme et antonyme : dire que triste est un synonyme de content. En réalité triste est le contraire, c'est donc un antonyme.",
      "Croire que des mots qui se ressemblent sont de la même famille : terre et terrible ne parlent pas de la même idée, ils ne sont pas de la même famille.",
      "Rester bloqué sur un mot inconnu sans se servir du contexte. Il faut lire toute la phrase : dans « L'arbre est immense », immense veut dire très grand.",
    ],
    reel: "Au marché de Saint-Pierre, le mot « péi » revient partout ; grâce au contexte, on comprend qu'il veut dire d'ici, de La Réunion",
  },
  {
    id: "grammaire_orthographe",
    emoji: "🧩",
    titre: "Grammaire et accords",
    domaine: "Étude de la langue",
    essentiel:
      "Dans une phrase, les mots s'organisent autour du **sujet** et du **verbe conjugué**. Il faut penser à l'**accord** : le verbe s'accorde avec son sujet, et dans le **groupe nominal** le déterminant, le nom et l'adjectif s'accordent ensemble. Attention aussi aux petits mots qui se ressemblent, les **homophones** comme est et et.",
    formules: [
      { label: "Trouver le sujet et le verbe", latex: "Le verbe est le mot qui se conjugue ; pour trouver son sujet, je pose la question « Qui est-ce qui... ? » devant lui. Exemple : dans « Le facteur apporte le courrier », je demande « Qui est-ce qui apporte ? » : c'est le facteur, le sujet." },
      { label: "Accord dans le groupe nominal", latex: "Dans un groupe nominal, le déterminant, le nom et l'adjectif s'accordent en genre et en nombre. Exemple : les fleurs rouges (déterminant, nom et adjectif sont tous au pluriel)." },
      { label: "Accord du verbe avec son sujet", latex: "Le verbe s'accorde toujours avec son sujet, même si le sujet est loin. Exemple : Les élèves de la classe écoutent la maîtresse (sujet « les élèves » au pluriel, donc écoutent)." },
      { label: "Homophones est et et", latex: "« est » est le verbe être (je peux le remplacer par « était ») ; « et » relie deux mots (je peux dire « et puis »). Exemple : Mon frère est grand et fort." },
      { label: "Complément que je peux déplacer", latex: "Un complément circonstanciel peut être déplacé ou supprimé, alors que le complément essentiel ne bouge pas. Exemple : Le matin, je vais à l'école ; je peux dire « Je vais à l'école le matin »." },
    ],
    reflexes: [
      { si: "la consigne demande le sujet", alors: "je pose la question « Qui est-ce qui... ? » juste devant le verbe" },
      { si: "un nom est au pluriel", alors: "j'accorde aussi son déterminant et son adjectif au pluriel" },
      { si: "j'hésite entre est et et", alors: "je remplace par « était » : si la phrase garde son sens, j'écris est" },
      { si: "un groupe de mots peut être déplacé ou enlevé", alors: "je pense que c'est un complément circonstanciel" },
    ],
    pieges: [
      "Oublier d'accorder l'adjectif avec le nom : on écrit « des voitures bleu » alors qu'il faut « des voitures bleues », car l'adjectif prend le pluriel du nom.",
      "Se tromper d'accord quand le sujet est loin du verbe : on écrit « Les enfants de la classe joue » au lieu de « Les enfants de la classe jouent », car le verbe s'accorde avec « les enfants ».",
      "Confondre « a » (verbe avoir) et « à » (petit mot invariable) : on écrit « Il va a la mer » au lieu de « Il va à la mer » ; pour vérifier, je remplace par « avait ».",
    ],
    reel: "Devant l'école de Saint-Joseph, l'affiche « Nos élèves sont curieux » montre que le verbe sont s'accorde au pluriel avec son sujet nos élèves",
  },
  {
    id: "conjugaison",
    emoji: "🕰️",
    titre: "La conjugaison",
    domaine: "Étude de la langue",
    essentiel:
      "**Conjuguer** un verbe, c'est changer sa terminaison selon la **personne** (je, tu, il, nous...) et le **temps** (présent, imparfait, futur). L'**infinitif** est le nom du verbe : il donne son groupe. Exemple : « nous chantons » vient du verbe chanter.",
    formules: [
      { label: "Infinitif et groupe", latex: "Pour trouver l'infinitif, je dis « en train de... ». Un verbe en -er est du 1er groupe. Exemple : dans « Nous mangeons », l'infinitif est manger, du 1er groupe." },
      { label: "Le présent", latex: "Au présent, les verbes en -er prennent -e, -es, -e, -ons, -ez, -ent. Exemple : je chante, tu chantes, il chante, nous chantons." },
      { label: "L'imparfait", latex: "L'imparfait raconte une action passée qui dure. Ses terminaisons sont -ais, -ais, -ait, -ions, -iez, -aient. Exemple : hier, il pleuvait sans arrêt." },
      { label: "Le futur", latex: "Au futur, je garde souvent l'infinitif et j'ajoute -ai, -as, -a, -ons, -ez, -ont. Exemple : demain, nous partirons en voyage." },
      { label: "Le passé composé", latex: "Le passé composé se forme avec avoir ou être au présent, suivi du participe passé. Exemple : j'ai mangé une mangue ; elle est partie à l'école." },
    ],
    reflexes: [
      { si: "la phrase dit « hier » ou « autrefois »", alors: "je pense à l'imparfait ou au passé composé" },
      { si: "la phrase dit « demain » ou « plus tard »", alors: "je conjugue au futur" },
      { si: "je cherche le groupe d'un verbe", alors: "je trouve d'abord son infinitif" },
      { si: "le verbe se forme avec avoir ou être + un autre mot", alors: "je pense au passé composé" },
    ],
    pieges: [
      "Écrire « nous mangons » : au présent, les verbes en -ger gardent le e devant -ons. On écrit « nous mangeons ».",
      "Confondre le futur et l'imparfait : « il jouait demain » est faux. On dit « demain, il jouera » (futur).",
      "Avec être au passé composé, oublier d'accorder : « elle est parti » est faux. On écrit « elle est partie ».",
    ],
    reel: "À la boulangerie de Saint-Pierre, la vendeuse dit « nous avons vendu tous les samoussas » : c'est un passé composé formé avec le verbe avoir",
  },
];

// Couche "fixed" imprimable groupée par notion (source des tests de survie).
const BANQUES: Record<string, TutorBankItemV4[]> = {};
for (const item of francaisCm1FixedBank) {
  (BANQUES[item.notionId] ??= []).push(item);
}

export const KIT_FRANCAIS_CM1: KitData = {
  slug: "francais-cm1",
  titre: "Guide de survie · Français CM1",
  baseline:
    "Les 8 grands domaines du français en CM1 en 8 fiches : l'essentiel, les règles qui sauvent, les réflexes, les pièges — et un test corrigé par fiche. Pour bien lire, écrire et parler, et préparer le CM2. À imprimer, à glisser dans le cahier.",
  matiere: "francais",
  classeLabel: "CM1",
  coachClasse: "cm1",
  notions: CONDENSES.map((c) => ({
    ...c,
    micros: microsDe(c.id),
    exos: testDeSurvie(BANQUES[c.id] ?? []),
  })),
};
