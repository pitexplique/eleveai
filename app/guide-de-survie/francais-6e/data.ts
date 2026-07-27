// ─── Guide de survie · Français 6e (entrée au collège) ──────────────────────
// Contenu ALIGNÉ sur le coach (source de vérité unique) :
// - chapitres      = notions de lib/tutor-v4/knowledge/francais/6e/notions.ts
//   (générées par le module PARTAGÉ shared/buildCollegeFrancaisSources)
// - checklists     = micro-compétences de microSkills.ts (BO cycle 3)
// - test de survie = items "fixed" imprimables de la couche francais6eFixedBank
//   (le builder cycle 3 ne produit que des "template" → testDeSurvie serait vide
//   sans cette couche). Cette même couche enrichit aussi le coach (index.ts).
// Condensés écrits par 8 rédacteurs parallèles (workflow) puis VÉRIFIÉS à la main
// contre le BO cycle 3 (orthographe, accords, conjugaisons, périmètre 6e).
// ⚠️ Ici le bloc « formules » du KitNotion porte LES RÈGLES QUI SAUVENT (texte,
// pas de LaTeX) : lecture, mise en voix, culture, accords, conjugaison, phrase.
// ⚠️ Fichier GÉNÉRÉ (scratchpad/gen-data-fr-6e.mjs) : ne pas éditer à la main.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/6e/microSkills";
import { kitHelpers } from "@/components/kit/fromCoach";
import { francais6eFixedBank } from "@/lib/tutor-v4/questionBank/6e/francais/fixed.bank";
import type { KitData, KitNotion } from "@/components/kit/types";

// Checklists + tests dérivés du coach (module partagé par tous les guides).
const { microsDe, testDeSurvie } = kitHelpers(microSkills);

type Condense = Omit<KitNotion, "micros" | "exos">;

const CONDENSES: Condense[] = [
  {
    id: "lecture_comprehension",
    emoji: "🔎",
    titre: "Comprendre et interpréter",
    domaine: "Lecture",
    essentiel:
      "Comprendre un texte, c'est d'abord dégager son **sens global** : de quoi ça parle vraiment. Ensuite, je relève des **indices précis** dans les phrases pour deviner ce qui n'est pas écrit, c'est l'**implicite**. Enfin, je **justifie** toujours mon interprétation en m'appuyant sur le texte.",
    formules: [
      { label: "Je cherche l'idée principale", latex: "Avant les détails, je me demande de quoi parle surtout le texte. Exemple : dans un passage où un personnage court sous la pluie sans jamais abandonner, l'idée principale est la persévérance, pas la météo." },
      { label: "Je m'appuie sur des indices", latex: "Pour comprendre, je repère les mots et les détails qui donnent des informations. Exemple : des valises posées près de la porte et des billets sur la table sont des indices qu'un départ se prépare." },
      { label: "Je devine l'implicite", latex: "L'implicite, c'est ce que l'auteur laisse deviner sans l'écrire. Exemple : si un élève cache vite sa copie dans son sac, les joues rouges, je comprends qu'il a sans doute eu une mauvaise note." },
      { label: "Je justifie avec le texte", latex: "Je ne réponds pas au hasard : je montre le passage qui prouve mon interprétation. Exemple : je dis que le personnage a peur parce que le texte écrit qu'il tremble et qu'il recule." },
      { label: "Je donne un avis fondé sur le texte", latex: "Pour dire si j'aime ou non, je m'appuie sur ce qui est écrit. Exemple : j'ai trouvé ce passage émouvant parce que le personnage aide son ami alors qu'il est lui-même en danger." },
    ],
    reflexes: [
      { si: "je dois donner le sens global d'un texte", alors: "je résume en une seule phrase de quoi il parle surtout, sans m'arrêter à un détail" },
      { si: "je ne comprends pas ce que ressent un personnage", alors: "je repère ce qu'il fait et ce qu'il dit pour le deviner" },
      { si: "on me demande de justifier ma réponse", alors: "je montre le mot ou le passage exact du texte qui le prouve" },
      { si: "je donne mon avis sur le texte", alors: "j'explique pourquoi en citant un passage précis, pas seulement en disant que j'ai aimé" },
    ],
    pieges: [
      "Confondre le sujet et un simple détail : je réponds que ça parle de la pluie alors que le texte parle surtout du courage du personnage. Pour l'éviter, je cherche l'idée qui revient dans tout le passage, pas un détail isolé.",
      "Inventer une interprétation sans preuve : je devine ce qui n'est pas écrit sans pouvoir le montrer dans le texte. Pour l'éviter, je vérifie qu'un mot ou une phrase justifie bien ma réponse.",
      "Donner un avis vide comme c'est bien ou c'est nul : cela ne prouve pas que j'ai compris. Pour l'éviter, j'explique mon avis en m'appuyant sur un passage précis du texte.",
    ],
    reel: "En vrai, quand tu lis une légende créole où le héros quitte le Grand Bénare avant l'aube sans un mot, tu comprends qu'il a peur d'être suivi même si le texte ne le dit jamais",
  },
  {
    id: "lecture_voix_haute",
    emoji: "📢",
    titre: "Lire à voix haute",
    domaine: "Lecture",
    essentiel:
      "Lire à voix haute, c'est **mettre le texte en voix** pour le faire vivre devant les autres. Avant de lire, je **prépare** mon passage et je repère les mots difficiles, puis je joue sur la **voix**, le **rythme** et le **regard** pour être clair et expressif.",
    formules: [
      { label: "Je prépare avant de lire", latex: "Je lis d'abord le texte en silence pour repérer les mots difficiles et les phrases longues. Exemple : je m'entraîne à dire « chrysalide » ou « aussitôt » avant de lire devant la classe." },
      { label: "Je suis la ponctuation", latex: "La ponctuation guide ma voix : je marque une pause au point, une petite pause à la virgule, et je fais monter la voix au point d'interrogation. Exemple : « Tu viens ? » se dit avec la voix qui monte à la fin." },
      { label: "Je règle mon rythme", latex: "Je ne lis ni trop vite ni trop lentement, et je ralentis sur les passages importants. Exemple : je dis lentement « Et là, dans le noir, quelque chose bougea » pour tenir le suspense." },
      { label: "Je mets le ton", latex: "Je change ma voix selon ce que dit le texte : plus fort pour un cri, plus doux pour un secret. Exemple : « — Au secours ! » se lit plus fort, « — Chut, écoute » se lit tout bas." },
      { label: "Je lève les yeux", latex: "De temps en temps, je regarde ceux qui écoutent au lieu de rester le nez sur ma feuille. Exemple : à la fin d'une phrase, je lève les yeux une seconde vers le public, puis je reviens à mon texte." },
    ],
    reflexes: [
      { si: "je vois un point d'exclamation", alors: "je mets plus de force dans ma voix, comme pour un cri ou une surprise" },
      { si: "je tombe sur un mot que je n'ai jamais dit", alors: "je le découpe en syllabes à l'avance et je m'entraîne à le prononcer avant de lire tout haut" },
      { si: "je récite une poésie", alors: "je marque la fin de chaque vers par une toute petite pause, sans m'arrêter aussi longtemps qu'à un point" },
      { si: "je lis un dialogue avec un tiret", alors: "je change de voix pour montrer que c'est un personnage qui parle" },
    ],
    pieges: [
      "Lire trop vite pour finir vite : personne ne comprend et on bute sur les mots. Il faut ralentir et respirer aux virgules et aux points.",
      "Rester tout le temps le nez sur sa feuille, sans jamais regarder les autres : on perd l'attention de ceux qui écoutent. Il faut lever les yeux vers le public de temps en temps.",
      "Lire d'une voix toujours plate, sans jamais changer de ton : le texte devient ennuyeux. Il faut mettre le ton et suivre la ponctuation, question, cri ou pause.",
    ],
    reel: "En vrai, quand tu lis le poème de la kermesse devant toute la classe à Saint-Denis, tu lèves les yeux à la fin de chaque vers pour voir si le public te suit",
  },
  {
    id: "culture_litteraire",
    emoji: "📚",
    titre: "Culture littéraire",
    domaine: "Culture littéraire",
    essentiel:
      "Avoir une **culture littéraire**, c'est savoir reconnaître les grands **genres** (conte, fable, mythe, récit d'aventure, poème, théâtre, bande dessinée) et situer une œuvre dans son **époque**. Je relie les histoires entre elles et je garde une trace de mes lectures dans mon **carnet de lecture**.",
    formules: [
      { label: "Je reconnais le genre", latex: "Chaque histoire appartient à une famille. Un mythe raconte les dieux et les héros de l'Antiquité, comme l'Odyssée d'Homère ; une fable met en scène des animaux qui parlent et se termine par une morale, comme celles de La Fontaine." },
      { label: "Je repère la forme du texte", latex: "Je regarde comment le texte est présenté. Un poème est écrit en vers, avec parfois des rimes ; une pièce de théâtre donne le nom du personnage avant ce qu'il dit ; une bande dessinée raconte avec des images et des bulles." },
      { label: "Je situe l'œuvre dans son époque", latex: "Je me demande quand l'histoire a été écrite. L'Odyssée a été composée dans l'Antiquité, en Grèce ancienne, il y a près de trois mille ans : voilà pourquoi on y rencontre des dieux comme Zeus et des monstres comme le cyclope." },
      { label: "Je relie les œuvres entre elles", latex: "Une même idée voyage d'une histoire à l'autre. La ruse d'Ulysse face au cyclope ressemble à la ruse du Petit Poucet face à l'ogre ; je peux retrouver ces héros et ces monstres dans un livre, un film ou une bande dessinée." },
      { label: "Je tiens mon carnet de lecture", latex: "Après chaque livre, j'écris le titre, l'auteur, le genre et ce que j'ai ressenti. Exemple : Le Feuilleton d'Hermès, mythologie grecque, j'ai adoré le passage où Hermès invente la lyre avec une carapace de tortue." },
    ],
    reflexes: [
      { si: "je vois des animaux qui parlent et une morale à la fin", alors: "je reconnais une fable" },
      { si: "l'histoire parle de dieux, de héros et de monstres de l'Antiquité", alors: "je pense à un mythe" },
      { si: "le texte est écrit en vers, avec des retours à la ligne et parfois des rimes", alors: "c'est sûrement un poème" },
      { si: "je viens de terminer un livre", alors: "je note tout de suite le titre, le genre et mon avis dans mon carnet de lecture" },
    ],
    pieges: [
      "Confondre le conte et le mythe : le conte commence souvent par « Il était une fois » et se passe dans un monde imaginaire, alors que le mythe raconte les dieux et les héros de l'Antiquité. Je regarde qui sont les personnages pour bien choisir.",
      "Croire que toutes les vieilles histoires viennent de France : l'Odyssée a été composée en Grèce ancienne, pas au Moyen Âge français. Avant de situer une œuvre, je cherche son pays et son époque.",
      "Penser qu'une bande dessinée ou un film ne compte pas comme de la culture littéraire : une histoire peut être racontée par des images autant que par des mots. Je relie le livre, la BD et le film qui parlent du même héros.",
    ],
    reel: "En vrai, quand une grand-mère te raconte une légende créole au coin du feu à Cilaos, tu retrouves les mêmes monstres et la même ruse que dans les mythes grecs d'Ulysse",
  },
  {
    id: "ecriture",
    emoji: "✍️",
    titre: "Écrire un texte",
    domaine: "Écriture",
    essentiel:
      "Écrire un texte, c'est d'abord **réfléchir** avant de rédiger, puis organiser ses idées avec des **connecteurs** (d'abord, ensuite, enfin). Un bon texte d'invention a un **héros**, un problème et une fin. Je me **relis** toujours pour corriger mes fautes et enrichir mon écrit.",
    formules: [
      { label: "J'écris pour mémoriser", latex: "Pour retenir une leçon, je note les idées importantes avec mes propres mots, sans recopier le manuel mot à mot. Exemple : au lieu de tout recopier, j'écris « Un volcan effusif laisse couler la lave doucement. »" },
      { label: "Je construis mon histoire", latex: "Un texte d'invention cohérent a toujours un héros, un problème à résoudre et une fin. Exemple : une jeune fille perd son chien dans la forêt, puis elle le retrouve grâce à ses aboiements." },
      { label: "Je donne mon avis en trois temps", latex: "Dans un paragraphe de réflexion, j'écris mon avis, puis une raison, puis un exemple pris dans le texte. Exemple : « J'ai aimé ce livre, car le héros est courageux : il traverse la rivière pour sauver son ami. »" },
      { label: "Je relie mes idées", latex: "J'utilise des connecteurs pour guider le lecteur : d'abord, ensuite, enfin pour le temps ; parce que, donc, mais pour la logique. Exemple : « Il pleuvait, donc nous sommes restés à la maison. »" },
      { label: "Je me relis et je corrige", latex: "Avant de rendre, je relis mon texte pour vérifier les points, les majuscules et les accords, puis j'ajoute un détail pour l'enrichir. Exemple : je remplace « un chien » par « un petit chien noir tout mouillé »." },
    ],
    reflexes: [
      { si: "je dois retenir une leçon", alors: "je la réécris avec mes propres mots au lieu de la recopier" },
      { si: "je commence une histoire", alors: "je choisis d'abord mon héros, son problème et la fin que je veux" },
      { si: "on me demande mon avis sur un texte", alors: "je donne mon avis, une raison, puis un exemple tiré du texte" },
      { si: "j'ai fini d'écrire", alors: "je me relis à voix basse pour repérer les fautes et ajouter un détail" },
    ],
    pieges: [
      "Recopier le manuel mot à mot pour « apprendre » : on ne retient presque rien. Il faut reformuler avec ses propres mots pour vraiment mémoriser.",
      "Écrire une histoire qui part dans tous les sens, sans problème ni fin : je dois choisir un héros, un problème clair et une vraie fin avant de commencer.",
      "Répondre seulement « oui » ou « j'ai aimé » sans expliquer : un paragraphe de réflexion doit toujours donner une raison et un exemple du texte.",
    ],
    reel: "En vrai, quand tu racontes ta sortie au Piton de la Fournaise à Saint-Pierre, tu écris d'abord ce que tu as vu, ensuite ce que tu as ressenti, pour que ton lecteur suive le fil",
  },
  {
    id: "oral",
    emoji: "🗣️",
    titre: "Prendre la parole",
    domaine: "Oral",
    essentiel:
      "Prendre la parole, c'est se faire **écouter** et **comprendre** par les autres. Je parle **fort**, j'**articule** et je suis un **plan** pour rester clair. J'écoute aussi ce que disent les autres et j'attends mon tour.",
    formules: [
      { label: "Je parle fort et j'articule", latex: "Je lève la tête et je parle assez fort pour être entendu du fond de la classe. Exemple : au lieu de marmonner, je dis clairement : Bonjour, je vais vous présenter mon exposé." },
      { label: "Je suis un plan", latex: "J'annonce d'abord de quoi je vais parler, puis je donne mes idées dans l'ordre. Exemple : Je vais présenter mon livre en trois parties : l'auteur, l'histoire, puis mon avis." },
      { label: "Je justifie mon avis", latex: "Je donne mon opinion ET une raison qui l'explique. Exemple : J'ai aimé ce livre parce que le héros est courageux." },
      { label: "J'écoute jusqu'au bout", latex: "Quand quelqu'un parle, j'écoute sans le couper et je repère les idées importantes. Exemple : après l'exposé, je peux redire : Tu as expliqué comment vivait le loup." },
      { label: "Je joue avec le ton et les gestes", latex: "Quand je dis ou je joue un texte de théâtre, j'adapte ma voix et mes gestes au personnage. Exemple : pour un personnage en colère, je parle plus fort et je fronce les sourcils." },
    ],
    reflexes: [
      { si: "je vois un point d'exclamation dans mon texte", alors: "je mets de l'émotion dans ma voix, comme de la surprise ou de la joie" },
      { si: "quelqu'un parle pendant le débat", alors: "j'attends qu'il ait fini et je lève la main avant de prendre la parole" },
      { si: "je ne suis pas d'accord avec un camarade", alors: "je le dis poliment et je donne une raison, sans me moquer" },
      { si: "j'ai peur devant la classe", alors: "je respire un grand coup, je regarde un camarade et je commence doucement" },
    ],
    pieges: [
      "Lire ses notes tête baissée en récitant à toute vitesse : je dois lever les yeux, ralentir et regarder la classe pour être bien compris.",
      "Dire seulement j'aime ou je n'aime pas sans rien ajouter : je dois toujours donner une raison pour justifier mon avis.",
      "Couper la parole des autres parce qu'on a une idée : je dois attendre mon tour et lever la main, même quand c'est urgent.",
    ],
    reel: "En vrai, quand tu présentes ton exposé sur le Piton de la Fournaise devant la classe, tu parles fort et tu regardes tes camarades pour qu'ils te suivent jusqu'au bout",
  },
  {
    id: "vocabulaire",
    emoji: "🔤",
    titre: "Le vocabulaire",
    domaine: "Étude de la langue",
    essentiel:
      "Le **vocabulaire**, c'est l'ensemble des mots que je connais et que je sais employer. Pour deviner le sens d'un mot nouveau, je m'aide du **contexte** de la phrase. Pour être précis, je relie les mots entre eux grâce aux **synonymes**, aux antonymes et au **champ lexical**.",
    formules: [
      { label: "Je devine grâce au contexte", latex: "Quand je ne connais pas un mot, je lis toute la phrase pour trouver son sens avant d'ouvrir le dictionnaire. Exemple : dans « Le sentier serpentait entre les arbres », le reste de la phrase montre que serpentait veut dire faisait des courbes." },
      { label: "Synonyme et antonyme", latex: "Un synonyme est un mot de sens proche, un antonyme un mot de sens contraire. Exemple : content a pour synonyme joyeux et pour antonyme triste." },
      { label: "Le champ lexical", latex: "Les mots qui parlent d'un même thème forment un champ lexical. Exemple : vague, marée et rivage appartiennent au champ lexical de la mer." },
      { label: "La famille de mots", latex: "Les mots d'une même famille sont construits sur le même radical. Exemple : terre, terrain, terrestre et atterrir viennent tous du radical terr." },
      { label: "Préfixe et suffixe", latex: "On forme des mots en ajoutant un préfixe devant le radical ou un suffixe derrière. Exemple : dans refroidir, re- est le préfixe et froid le radical ; dans lentement, -ment est le suffixe." },
    ],
    reflexes: [
      { si: "je ne connais pas un mot dans un texte", alors: "je relis la phrase entière et je cherche des indices autour du mot pour deviner son sens" },
      { si: "je répète tout le temps le même mot", alors: "je le remplace par un synonyme plus précis, par exemple dire par murmurer, crier ou expliquer" },
      { si: "j'apprends un mot nouveau", alors: "je note aussi son orthographe et je le réutilise dans une phrase à moi pour bien le retenir" },
      { si: "je cherche le sens d'un préfixe", alors: "je pense à d'autres mots qui le contiennent, comme re- dans refaire, revenir et relire, qui veut dire encore une fois" },
    ],
    pieges: [
      "Croire que deux synonymes veulent dire exactement la même chose : ils ont un sens proche mais pas identique. Grand et immense sont synonymes, pourtant immense est bien plus fort ; je choisis le mot qui convient vraiment au sens de ma phrase.",
      "Confondre le champ lexical et la famille de mots. Le champ lexical réunit des mots d'un même thème, même sans racine commune (école, cahier, récréation, professeur). La famille réunit des mots bâtis sur le même radical (terre, terrain, terrestre, atterrir). Je me demande : idée commune ou racine commune ?",
      "Écrire un mot « au son » sans vérifier son orthographe. Un mot appris se retient aussi avec les bonnes lettres : on écrit aujourd'hui et non « aujourdui ». Dès que j'ai un doute, je vérifie dans le dictionnaire ou dans mon cahier.",
    ],
    reel: "En vrai, quand tu racontes une baignade dans le lagon de l'Ermitage, tu pioches dans le champ lexical de la mer : lagon, corail, vague, marée et sable",
  },
  {
    id: "grammaire_phrase",
    emoji: "🧩",
    titre: "Grammaire et accords",
    domaine: "Étude de la langue",
    essentiel:
      "Une **phrase** est une suite de mots qui a un sens et se termine par un point. Pour bien écrire, je repère le **sujet**, le **verbe** et les **compléments**, puis je fais tous les **accords**. À l'écrit, j'écris les accords même quand on ne les entend pas à l'oral.",
    formules: [
      { label: "Je compte les verbes conjugués", latex: "Une phrase simple a un seul verbe conjugué ; une phrase complexe en a plusieurs. Exemple : Le vent se leva et les feuilles tombèrent contient deux verbes conjugués, se leva et tombèrent : c'est une phrase complexe." },
      { label: "Je trouve le verbe, puis le sujet", latex: "Je cherche d'abord le verbe conjugué, puis je pose la question « qui est-ce qui ? » pour trouver le sujet. Exemple : Sous le pont coule la rivière ; qui est-ce qui coule ? la rivière : c'est le sujet, même s'il est placé après le verbe." },
      { label: "Je repère les compléments", latex: "Après le verbe, certains groupes disent ce qu'on fait (complément d'objet), d'autres disent où, quand ou comment. Exemple : Le jardinier plante des fleurs au printemps ; des fleurs dit ce qu'il plante, au printemps dit quand." },
      { label: "J'accorde le verbe avec son sujet", latex: "Le verbe s'accorde toujours avec son sujet, même quand le sujet est loin ou inversé. Exemple : Les élèves de la classe travaillent en silence ; le sujet est les élèves, donc j'écris travaillent, malgré le mot classe placé juste avant le verbe." },
      { label: "J'accorde dans le groupe nominal", latex: "Dans un groupe nominal, le déterminant et l'adjectif s'accordent avec le nom en genre et en nombre. Exemple : les grandes vagues bleues ; vagues est féminin pluriel, donc grandes et bleues prennent un -s." },
    ],
    reflexes: [
      { si: "je cherche le sujet d'un verbe", alors: "je pose la question « qui est-ce qui ? » juste devant le verbe" },
      { si: "le sujet est placé après le verbe ou séparé de lui par d'autres mots", alors: "je le retrouve quand même et j'accorde le verbe avec lui" },
      { si: "je veux trouver le complément d'objet", alors: "je pose la question « quoi ? » ou « qui ? » juste après le verbe" },
      { si: "je n'entends pas la marque du pluriel à l'oral", alors: "je l'écris quand même à l'écrit" },
    ],
    pieges: [
      "Croire qu'une phrase n'a qu'un seul verbe : dans « Le vent se leva et les feuilles tombèrent », il y en a deux. Je compte tous les verbes conjugués pour savoir si la phrase est simple ou complexe.",
      "Accorder le verbe avec le mot juste avant lui au lieu du vrai sujet : dans « La cage des oiseaux est ouverte », le sujet est la cage (singulier), pas oiseaux. Je remonte au vrai sujet avant d'accorder.",
      "Oublier les accords qu'on n'entend pas à l'oral : on dit « ils mangent » comme « il mange », mais à l'écrit j'ajoute -nt au pluriel. Je pense à écrire les marques du pluriel même silencieuses.",
    ],
    reel: "En vrai, sur le marché du Chaudron, quand tu écris « les letchis sont mûrs », tu accordes mûrs au pluriel même si à l'oreille ça sonne comme au singulier",
  },
  {
    id: "conjugaison",
    emoji: "🕰️",
    titre: "La conjugaison",
    domaine: "Étude de la langue",
    essentiel:
      "Conjuguer un verbe, c'est changer sa **terminaison** selon la **personne** et le **temps**. Un verbe se lit en deux morceaux : le **radical**, qui bouge peu, et la terminaison, qui change tout le temps. Bien choisir son temps aide aussi le lecteur à suivre l'histoire.",
    formules: [
      { label: "Je découpe radical et terminaison", latex: "Dans un verbe, je repère le radical qui reste stable et la terminaison qui change. Exemple : avec chanter, je trouve je chante, nous chantons, ils chantaient (radical chant-)." },
      { label: "Je reconnais les cinq temps de 6e", latex: "Je dois savoir nommer le présent, l'imparfait, le futur, le passé composé et le passé simple. Exemple : je marche (présent), je marchais (imparfait), je marcherai (futur), j'ai marché (passé composé), je marchai (passé simple)." },
      { label: "Au passé composé, j'accorde avec être", latex: "Le passé composé se forme avec avoir ou être plus le participe passé. Avec être, j'accorde le participe avec le sujet : Elles sont parties. Avec avoir, je n'accorde pas avec le sujet : Elles ont mangé." },
      { label: "Dans un récit : imparfait pour le décor, passé simple pour l'action", latex: "L'imparfait décrit ce qui dure ou se répète, le passé simple raconte une action soudaine. Exemple : Le soleil brillait (décor qui dure) quand un cri retentit (action soudaine)." },
      { label: "Le présent dit ce qui est toujours vrai", latex: "J'emploie le présent de vérité générale pour ce qui est vrai en tout temps. Exemple : L'eau bout à cent degrés. La Terre tourne autour du Soleil." },
    ],
    reflexes: [
      { si: "je cherche la personne d'un verbe", alors: "je remplace le sujet par un pronom (je, tu, il ou elle, nous, vous, ils ou elles) et je repère si c'est le singulier ou le pluriel" },
      { si: "je vois les terminaisons -ais, -ait, -ions, -iez, -aient", alors: "je pense à l'imparfait, le temps du décor qui dure" },
      { si: "je vois les terminaisons -ai, -as, -a, -âmes, -âtes, -èrent", alors: "je pense au passé simple, le temps des actions soudaines dans un récit" },
      { si: "je forme un passé composé avec l'auxiliaire être", alors: "j'accorde le participe passé avec le sujet, comme dans elle est arrivée" },
    ],
    pieges: [
      "Confondre le futur (je chanterai, terminaison -ai) et l'imparfait (je chantais, terminaison -ais) : pour trancher, je regarde le radical, car au futur il y a un -r- (chante-r-ai) alors qu'à l'imparfait il n'y en a pas (chant-ais).",
      "Oublier l'accord du participe passé avec être : on n'écrit pas Elles sont parti mais Elles sont parties, car avec être le participe s'accorde toujours avec le sujet en genre et en nombre.",
      "Tout mettre au passé simple dans un récit : le passé simple sert aux actions soudaines, mais le décor qui dure va à l'imparfait. On écrit Il pleuvait (décor) quand la porte claqua (action), et non Il plut quand la porte claquait.",
    ],
    reel: "En vrai, quand tu racontes ta rando au Piton de la Fournaise, tu mets à l'imparfait ce qui durait (le brouillard flottait) et au passé simple ce qui a surgi d'un coup (le soleil apparut)",
  },
];

// Couche "fixed" imprimable groupée par notion (source des tests de survie).
const BANQUES: Record<string, TutorBankItemV4[]> = {};
for (const item of francais6eFixedBank) {
  (BANQUES[item.notionId] ??= []).push(item);
}

export const KIT_FRANCAIS_6E: KitData = {
  slug: "francais-6e",
  titre: "Guide de survie · Français 6e",
  baseline:
    "Les 8 grands domaines du français en 6e en 8 fiches : l'essentiel, les règles qui sauvent, les réflexes, les pièges — et un test corrigé par fiche. Pour bien lire, écrire et parler, et réussir son entrée au collège. À imprimer, à glisser dans le classeur.",
  matiere: "francais",
  classeLabel: "6e",
  coachClasse: "6e",
  notions: CONDENSES.map((c) => ({
    ...c,
    micros: microsDe(c.id),
    exos: testDeSurvie(BANQUES[c.id] ?? []),
  })),
};
