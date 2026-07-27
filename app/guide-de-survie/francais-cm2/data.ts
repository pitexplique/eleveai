// ─── Guide de survie · Français CM2 (dernière année de primaire) ─────────────
// Contenu ALIGNÉ sur le coach (source de vérité unique) :
// - chapitres      = notions de lib/tutor-v4/knowledge/francais/cm2/notions.ts
// - checklists     = micro-compétences de microSkills.ts (BO cycle 3)
// - test de survie = items "fixed" imprimables de la couche francaisCm2FixedBank
//   (le builder cycle 3 ne produit que des "template" → testDeSurvie serait vide
//   sans cette couche). Cette même couche enrichit aussi le coach (index.ts).
// Condensés écrits par 9 rédacteurs parallèles (workflow) puis VÉRIFIÉS à la main
// contre le BO cycle 3 (orthographe, accords, conjugaisons, périmètre CM2).
// ⚠️ Ici le bloc « formules » du KitNotion porte LES RÈGLES QUI SAUVENT (texte,
// pas de LaTeX) : accords, conjugaison, homophones, phrase complexe, ponctuation.
// ⚠️ Fichier GÉNÉRÉ (scratchpad/gen-data-fr-cm2.mjs) : ne pas éditer à la main.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/cm2/microSkills";
import { kitHelpers } from "@/components/kit/fromCoach";
import { francaisCm2FixedBank } from "@/lib/tutor-v4/questionBank/cm2/francais/fixed.bank";
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
      "Lire avec **fluidité**, c'est lire un texte assez long sans buter, en respectant la **ponctuation**, les **liaisons** et les **groupes de sens**. Je vise environ **120 mots par minute** et je mets le texte en voix avec la bonne intonation, pour que celui qui m'écoute comprenne bien l'histoire.",
    formules: [
      { label: "Je prépare avant de lire", latex: "Avant de lire un long texte à voix haute, je le lis d'abord dans ma tête pour repérer les mots difficiles. Exemple : je m'entraîne à dire « l'archipel » tout seul avant de le lire devant la classe." },
      { label: "Je fais les liaisons", latex: "Je relie certains mots pour que la lecture coule bien. Exemple : dans « les enfants », je dis « les-z-enfants » ; dans « un grand arbre », je dis « un grand-t-arbre »." },
      { label: "Je lis par groupes de sens", latex: "Je regroupe les mots qui vont ensemble au lieu de lire mot à mot. Exemple : « Le vieux pêcheur / range ses filets / avant la nuit. »" },
      { label: "Je garde un bon rythme", latex: "Je lis à environ 120 mots par minute, ni trop vite ni trop lentement. Exemple : je lis un paragraphe tranquillement, comme si je racontais une histoire à un ami." },
      { label: "Je mets le ton", latex: "Je change ma voix selon la ponctuation et l'histoire. Exemple : pour « Attention, une vague arrive ! », je parle plus fort et plus vite pour montrer la peur." },
    ],
    reflexes: [
      { si: "je vois un point d'interrogation", alors: "je fais monter ma voix à la fin, comme pour poser une vraie question" },
      { si: "je vois des points de suspension", alors: "je laisse ma voix en suspens et je marque un petit silence" },
      { si: "je vois un point d'exclamation", alors: "je mets de l'émotion et je parle plus fort pour la surprise ou la joie" },
      { si: "je bute sur un mot compliqué", alors: "je le découpe en syllabes dans ma tête, puis je relis la phrase entière" },
    ],
    pieges: [
      "Lire mot à mot en s'arrêtant après chaque mot : la lecture est trop hachée. Je dois lire par groupes de sens pour aller plus vite et mieux comprendre.",
      "Lire trop vite pour finir le premier : j'avale les mots et personne ne comprend. Je ralentis vers 120 mots par minute et je respire aux virgules.",
      "Lire tout sur le même ton, comme un robot : c'est ennuyeux et on perd le fil. Je mets l'intonation en suivant la ponctuation et l'histoire.",
    ],
    reel: "En vrai, quand tu lis à voix haute la légende de Grand-Mère Kalle à tes petits cousins, tu ralentis et tu baisses la voix aux passages qui font peur pour qu'ils frissonnent",
  },
  {
    id: "comprehension_textes_documents",
    emoji: "🔎",
    titre: "Comprendre textes et documents",
    domaine: "Lecture",
    essentiel:
      "Comprendre un texte, c'est trouver ce qui est **écrit** mais aussi ce qui est **caché** entre les lignes. Je reconnais le **genre** (récit, poème, théâtre, documentaire, bande dessinée) et je garde l'**essentiel** en peu de mots. Quand un document mêle du texte, une image et un schéma, je regarde tout ensemble.",
    formules: [
      { label: "Je devine l'implicite", latex: "Parfois la réponse n'est pas écrite : je la trouve grâce aux indices. Exemple : « Léa prit son parapluie avant de sortir. » Je comprends qu'il pleut, même si ce n'est jamais dit." },
      { label: "Je garde l'essentiel", latex: "Après ma lecture, je dis en une ou deux phrases de quoi parle le texte, sans tout raconter. Exemple : pour un long texte sur les tortues, je retiens seulement « Les tortues marines pondent leurs œufs sur la plage. »" },
      { label: "Je reconnais le genre", latex: "Je regarde la forme du texte pour savoir ce que je lis. Exemple : des vers qui riment, c'est un poème ; des noms suivis de deux points, c'est du théâtre ; des cases avec des bulles, c'est une bande dessinée." },
      { label: "Je relis quand je bloque", latex: "Si un passage est difficile, je le relis lentement et je cherche des indices juste avant et juste après. Exemple : je m'arrête sur le mot compliqué et je repère les mots que je connais autour." },
      { label: "Je croise texte et images", latex: "Dans un documentaire, le texte, la photo et le schéma se complètent : je les regarde ensemble. Exemple : le texte dit « le volcan est en éruption » et la photo me montre la lave qui coule." },
    ],
    reflexes: [
      { si: "je ne comprends pas un passage tout seul", alors: "je le relis lentement en cherchant des indices juste avant et juste après" },
      { si: "on me demande de résumer un texte", alors: "je dis seulement les idées les plus importantes, en peu de mots" },
      { si: "je vois des cases dessinées avec des bulles", alors: "je sais que je lis une bande dessinée et je suis l'ordre des cases" },
      { si: "une information manque dans un texte", alors: "je cherche la réponse dans un deuxième document qui parle du même sujet" },
    ],
    pieges: [
      "Croire que tout est écrit noir sur blanc : certaines informations sont sous-entendues, je dois les deviner grâce aux indices que le texte me donne.",
      "Vouloir tout recopier ou tout retenir pour résumer : l'essentiel, ce sont seulement les idées principales, dites en peu de mots.",
      "Ne lire que le texte et oublier l'image ou le schéma : dans un document, le dessin et le schéma apportent des informations aussi importantes que les mots.",
    ],
    reel: "En vrai, quand tu lis un panneau au volcan du Piton de la Fournaise, tu regardes en même temps le texte, la carte et le schéma pour savoir quel sentier tu peux suivre",
  },
  {
    id: "lecture_oeuvres",
    emoji: "📚",
    titre: "Lire une œuvre",
    domaine: "Lecture",
    essentiel:
      "Lire une **œuvre**, c'est repérer ses **personnages**, son **thème** (le sujet dont elle parle) et ses **enjeux** (ce qui est en jeu pour les héros). Je relie ce que je lis à ma propre vie et à d'autres histoires que je connais, et je garde une trace de mes lectures dans un **carnet de lecture** bien organisé.",
    formules: [
      { label: "Je cherche le thème", latex: "Le thème, c'est le grand sujet de l'histoire : l'amitié, le courage, la peur, la liberté. Pour le trouver, je me demande : de quoi ça parle vraiment ? Exemple : dans une histoire où deux enfants s'entraident tout le temps, le thème, c'est l'amitié." },
      { label: "Je repère héros et enjeux", latex: "Je note qui est le héros et ce qu'il veut ou ce qu'il risque : c'est l'enjeu. Exemple : le héros veut retrouver son chien perdu, l'enjeu, c'est de ne pas rester seul et triste." },
      { label: "Je relie à ma vie", latex: "Je pense à un moment de ma vie qui ressemble à l'histoire. Exemple : quand un personnage change d'école, je me rappelle mon premier jour dans une nouvelle classe et ce que j'ai ressenti." },
      { label: "Je relie à une autre œuvre", latex: "Je rapproche l'histoire d'un autre livre, d'un film ou d'un dessin animé que je connais. Exemple : cette histoire de renard rusé me fait penser au Roman de Renart que nous avons lu en classe." },
      { label: "Je tiens mon carnet de lecture", latex: "Pour chaque livre, j'écris le titre, l'auteur, le thème et ce que j'en ai pensé. Exemple : Titre : Le Petit Prince. Auteur : Saint-Exupéry. Thème : l'amitié. Mon avis : j'ai bien aimé le renard qui explique ce que veut dire apprivoiser." },
    ],
    reflexes: [
      { si: "je dois choisir une œuvre à lire", alors: "je regarde le titre, la couverture et le résumé, puis j'explique pourquoi ce livre me donne envie" },
      { si: "je ne trouve pas le thème", alors: "je me demande de quoi parle l'histoire du début à la fin, pas seulement dans une seule page" },
      { si: "une scène me rappelle quelque chose", alors: "je le note dans mon carnet : ma propre vie ou une autre histoire que je connais" },
      { si: "je referme un livre", alors: "j'écris tout de suite dans mon carnet le titre, le thème et mon avis avant d'oublier" },
    ],
    pieges: [
      "Confondre le thème et le titre : le titre est écrit sur la couverture, tandis que le thème est le grand sujet caché dans l'histoire. Pour ne pas me tromper, je me demande de quoi parle vraiment le livre, pas seulement comment il s'appelle.",
      "Raconter toute l'histoire au lieu de donner son avis dans le carnet de lecture : je dois surtout écrire ce que j'ai ressenti et pourquoi j'ai aimé ou non, en quelques phrases, sans recopier le résumé du dos du livre.",
      "Choisir un livre au hasard sans savoir pourquoi : avant de lire, je regarde le titre, la couverture et le résumé, et je prépare une vraie raison, par exemple j'aime les histoires d'animaux ou les aventures.",
    ],
    reel: "En vrai, quand tu lis une histoire de cyclone à Saint-Pierre, tu penses tout de suite à la dernière alerte rouge où tu es resté à la maison avec ta famille",
  },
  {
    id: "ecriture",
    emoji: "✍️",
    titre: "Écrire un texte",
    domaine: "Écriture",
    essentiel:
      "Écrire un texte, c'est d'abord **organiser ses idées** dans un **plan**, puis rédiger plusieurs **paragraphes** qui se suivent bien. Ensuite je **relis** mon texte pour corriger les fautes et l'enrichir avec de nouveaux mots.",
    formules: [
      { label: "Je fais mon plan avant d'écrire", latex: "Avant de rédiger, je range mes idées dans l'ordre. Exemple : pour raconter ma journée, je note d'abord le matin, ensuite le midi, enfin le soir." },
      { label: "J'utilise des connecteurs", latex: "Je relie mes idées avec des petits mots pour guider le lecteur. Exemple : D'abord je prépare mon sac, ensuite je pars à l'école, enfin j'arrive en classe." },
      { label: "Un paragraphe pour une idée", latex: "Je change de paragraphe et je vais à la ligne quand je change d'idée. Exemple : un paragraphe pour décrire le personnage, un autre pour raconter ce qu'il fait." },
      { label: "Je copie par groupes de mots", latex: "Pour copier un texte long sans faute, je lis un groupe de mots, je le retiens, puis je l'écris sans regarder le modèle. Exemple : je mémorise « le petit chat gris » d'un coup au lieu de recopier lettre par lettre." },
      { label: "Je relis pour corriger et enrichir", latex: "À la fin, je vérifie les points, les majuscules et les accords, puis j'ajoute un mot pour rendre la phrase plus belle. Exemple : « Le chien court » devient « Le grand chien court dans le jardin »." },
    ],
    reflexes: [
      { si: "je dois apprendre une leçon", alors: "je prends des notes en écrivant seulement les mots importants, en abrégé, jamais des phrases entières" },
      { si: "je fais parler des personnages", alors: "j'écris un dialogue avec un tiret et je vais à la ligne chaque fois qu'une personne parle" },
      { si: "je ne sais plus comment continuer", alors: "je relis mon plan pour retrouver l'idée qui vient ensuite" },
      { si: "j'ai fini d'écrire", alors: "je relis à voix basse pour entendre si une phrase est trop longue ou mal construite" },
    ],
    pieges: [
      "Écrire tout d'un seul bloc, sans aller à la ligne : je dois faire un paragraphe par idée pour que mon texte reste clair.",
      "Se lancer sans plan et raconter les choses dans le désordre : je range d'abord mes idées dans l'ordre avec « d'abord, ensuite, enfin ».",
      "Rendre son texte sans le relire : je relis toujours à la fin pour corriger les fautes et enrichir mes phrases.",
    ],
    reel: "En vrai, quand tu écris à ta correspondante de métropole pour décrire une sortie au volcan de la Fournaise, tu fais un plan puis un paragraphe par moment de la journée",
  },
  {
    id: "oral",
    emoji: "🗣️",
    titre: "S'exprimer à l'oral",
    domaine: "Oral",
    essentiel:
      "S'exprimer à l'oral, c'est se faire **comprendre** de tout le monde. J'écoute pour retenir l'**idée principale**, puis je la reformule avec mes propres mots. Quand je présente un travail, j'emploie un **vocabulaire précis**, et quand je donne mon avis, je l'appuie sur une **preuve** ou un exemple.",
    formules: [
      { label: "J'écoute l'idée principale", latex: "Pendant qu'un camarade parle, je cherche ce dont il parle le plus : c'est son idée principale. Exemple : si Léa raconte sa sortie au volcan, l'idée principale, c'est la visite du volcan, pas la couleur de son sac." },
      { label: "Je reformule en plus court", latex: "Reformuler, c'est redire l'essentiel avec mes propres mots, sans tout répéter. Exemple : mon camarade dit trois phrases sur la pluie, je résume : « Il explique pourquoi il a plu toute la journée. »" },
      { label: "Je choisis des mots précis", latex: "Pour présenter un travail, j'évite « le truc » ou « la chose » et je nomme les mots exacts. Exemple : je dis « le cratère » et « la lave » au lieu de « le trou » et « le liquide rouge »." },
      { label: "Je prouve ce que je dis", latex: "Quand je donne mon avis, j'ajoute une preuve ou un exemple pour convaincre. Exemple : « Je pense qu'il faut trier les déchets, parce que dans ma rue les poubelles débordent tous les lundis. »" },
      { label: "Je respecte le tour de parole", latex: "Dans un débat, j'attends mon tour, je ne coupe pas la parole et j'écoute avant de répondre. Exemple : je lève le doigt et je dis « Je ne suis pas d'accord, parce que... » au lieu de crier par-dessus les autres." },
    ],
    reflexes: [
      { si: "je n'ai pas retenu l'idée principale", alors: "je demande poliment à mon camarade de répéter la partie la plus importante" },
      { si: "je dois résumer un long exposé", alors: "je garde seulement le sujet et les deux ou trois détails les plus utiles" },
      { si: "je veux convaincre pendant un débat", alors: "je donne un exemple concret juste après mon avis pour le rendre solide" },
      { si: "quelqu'un parle en même temps que moi", alors: "je m'arrête, j'attends mon tour, puis je reprends calmement" },
    ],
    pieges: [
      "Vouloir tout répéter mot à mot quand on reformule : je perds du temps et j'oublie l'essentiel. Je dois garder seulement l'idée principale et deux ou trois détails utiles.",
      "Donner son avis sans preuve, en disant juste « parce que c'est comme ça » : personne n'est convaincu. Je dois toujours ajouter un exemple ou une raison précise.",
      "Couper la parole dès qu'on n'est pas d'accord : le débat se transforme en dispute. Je dois attendre mon tour, lever le doigt et écouter avant de répondre.",
    ],
    reel: "En vrai, quand tu présentes ton exposé sur le Piton de la Fournaise devant la classe à Saint-Pierre, tu dis « cratère » et « éruption » pour que tout le monde comprenne bien",
  },
  {
    id: "vocabulaire",
    emoji: "🔤",
    titre: "Le vocabulaire",
    domaine: "Étude de la langue",
    essentiel:
      "Enrichir mon **vocabulaire**, c'est comprendre les mots et bien les employer. Je devine le sens d'un mot grâce au **contexte**, je repère les **familles de mots** avec leurs préfixes et suffixes, et je vérifie toujours l'**orthographe** du mot que j'écris.",
    formules: [
      { label: "Je devine avec le contexte", latex: "Quand je ne connais pas un mot, je lis toute la phrase pour deviner son sens. Exemple : dans « La cabane était vétuste et prête à tomber », vétuste veut dire vieux et abîmé." },
      { label: "Je pense à la famille du mot", latex: "Les mots d'une même famille ont une partie commune et un sens proche. Exemple : dent, dentiste, dentaire et dentier parlent tous des dents." },
      { label: "Le préfixe se met devant", latex: "Un préfixe se place avant le mot et change son sens. Exemple : avec « in- », visible devient invisible, c'est-à-dire qu'on ne peut pas voir." },
      { label: "Le suffixe se met à la fin", latex: "Un suffixe se place après le mot pour en former un nouveau. Exemple : avec « -age », laver donne lavage, et avec « -eur », chanter donne chanteur." },
      { label: "Je choisis le mot le plus juste", latex: "Pour dire exactement ce que je pense, je choisis le mot avec la bonne nuance. Exemple : content, ravi et joyeux sont proches, mais ravi montre une très grande joie." },
    ],
    reflexes: [
      { si: "je vois un mot inconnu", alors: "je relis toute la phrase autour pour deviner son sens" },
      { si: "un mot a plusieurs sens, comme « une glace »", alors: "je regarde le reste de la phrase pour savoir si c'est le miroir ou le dessert" },
      { si: "j'ai appris un nouveau mot", alors: "je le réutilise dans une phrase à moi pour bien le retenir" },
      { si: "je ne suis pas sûr de l'orthographe d'un mot", alors: "je le cherche dans le dictionnaire avant de l'écrire" },
    ],
    pieges: [
      "Croire que deux mots qui se ressemblent ont le même sens : « habile » (adroit) et « habité » (où l'on vit) sont très différents ; je vérifie le sens dans le dictionnaire au lieu de deviner à l'oreille.",
      "Oublier qu'un même mot peut avoir plusieurs sens : la « feuille » d'un arbre et la « feuille » de papier ne veulent pas dire la même chose ; je m'aide toujours de la phrase pour choisir le bon sens.",
      "Écrire un mot comme on l'entend : on écrit exercice et non « exersice » ; je mémorise l'orthographe des mots difficiles et je la vérifie dans le dictionnaire.",
    ],
    reel: "En vrai, quand tu commandes un bonbon piment au marché de Saint-Paul, le mot bonbon ne veut pas dire sucrerie mais beignet salé",
  },
  {
    id: "grammaire_orthographe",
    emoji: "🧩",
    titre: "Grammaire et accords",
    domaine: "Étude de la langue",
    essentiel:
      "Une **phrase** simple s'organise autour d'un **verbe** et de son **sujet**. Dans le **groupe nominal**, le déterminant et l'adjectif s'accordent avec le nom, et le verbe s'accorde toujours avec son sujet. Bien accorder, c'est écrire un français juste.",
    formules: [
      { label: "Je trouve le verbe puis le sujet", latex: "Dans une phrase simple, je cherche d'abord le verbe conjugué, puis je pose la question « qui est-ce qui ? » pour trouver le sujet. Exemple : Les élèves écoutent. Qui est-ce qui écoute ? Les élèves : c'est le sujet." },
      { label: "J'accorde dans le groupe nominal", latex: "Dans un groupe nominal, le déterminant et l'adjectif (une expansion du nom) s'accordent avec le nom en genre et en nombre. Exemple : une fleur blanche, des fleurs blanches." },
      { label: "J'accorde le verbe avec son sujet", latex: "Le verbe s'accorde toujours avec son sujet, même quand le sujet est loin du verbe ou placé après lui. Exemple : Les oiseaux du jardin chantent. Le sujet est « les oiseaux », donc le verbe est au pluriel." },
      { label: "Je repère les compléments qui se déplacent", latex: "Certains compléments peuvent se déplacer ou se supprimer : ce sont les compléments circonstanciels de temps ou de lieu. D'autres sont indispensables au verbe. Exemple : Le matin, Léo mange une banane. Je peux écrire : Léo mange une banane le matin. Mais je ne peux pas enlever « une banane »." },
      { label: "Je choisis le bon homophone", latex: "Pour choisir entre a et à, je remplace par « avait » : si la phrase garde son sens, j'écris a. Exemple : Il a faim (il avait faim, ça marche). Il part à midi (on ne peut pas dire « il part avait midi »)." },
    ],
    reflexes: [
      { si: "je cherche le sujet d'un verbe", alors: "je pose la question « qui est-ce qui ? » ou « qu'est-ce qui ? » devant le verbe" },
      { si: "le sujet désigne plusieurs choses ou personnes", alors: "je mets le verbe au pluriel, même si le sujet est placé loin du verbe ou après lui" },
      { si: "j'hésite entre on et ont", alors: "je remplace par « avaient » : si ça marche, j'écris ont ; sinon j'écris on" },
      { si: "j'ajoute un adjectif à un nom", alors: "je vérifie qu'il s'accorde en genre et en nombre avec ce nom" },
    ],
    pieges: [
      "Oublier d'accorder le verbe quand le sujet est loin : dans « Les fleurs du jardin sentent bon », on écrit « sentent » au pluriel, car le sujet est « les fleurs » et non « le jardin ». Je repère toujours le vrai sujet avant d'accorder.",
      "Confondre ces et ses : « ces » sert à montrer (ces livres, ceux-là), « ses » indique la possession (ses livres, les siens). Pour choisir, je me demande si l'objet appartient à quelqu'un.",
      "Croire que tous les compléments peuvent s'enlever : dans « Léa mange une pomme », on ne peut pas supprimer « une pomme », alors qu'on peut retirer « ce soir » dans « Ce soir, Léa mange une pomme ». Je teste en déplaçant ou en supprimant le groupe.",
    ],
    reel: "En vrai, quand tu écris à ton ami pour préparer une sortie au Piton de la Fournaise, tu accordes bien le verbe avec son sujet pour que ton message reste clair",
  },
  {
    id: "phrase_complexe",
    emoji: "🔗",
    titre: "La phrase complexe",
    domaine: "Étude de la langue",
    essentiel:
      "Une phrase **simple** a un seul **verbe conjugué**, une phrase **complexe** en a plusieurs. Pour reconnaître une phrase complexe, je compte les verbes conjugués : il y a autant de **propositions** que de verbes conjugués. Ces propositions sont reliées entre elles par des petits mots comme *et*, *mais*, *quand* ou *qui*.",
    formules: [
      { label: "Je compte les verbes conjugués", latex: "Pour savoir si une phrase est simple ou complexe, je compte les verbes conjugués. Un seul verbe : la phrase est simple. Plusieurs verbes : la phrase est complexe. Exemple : Léa lit dans sa chambre. (un verbe, c'est simple) / Léa lit dans sa chambre et Tom regarde la télé. (deux verbes, c'est complexe)" },
      { label: "Je repère les deux propositions", latex: "Dans une phrase complexe, chaque partie qui possède son propre verbe conjugué est une proposition. Exemple : Le vent souffle et la pluie tombe. Il y a deux verbes conjugués, donc deux propositions." },
      { label: "La virgule relie (juxtaposition)", latex: "Parfois, les propositions sont simplement séparées par une virgule, sans petit mot de liaison : c'est la juxtaposition. Exemple : Le ciel se couvre, les oiseaux se cachent." },
      { label: "Un petit mot relie (coordination)", latex: "Parfois, un petit mot relie les deux propositions : et, mais, ou, donc, puis. C'est la coordination. Exemple : J'ai fini mes devoirs donc je peux jouer." },
      { label: "qui, que, où relient aussi", latex: "Les petits mots qui, que et où relient deux propositions en évitant de répéter un mot. Exemple : Je connais la fille qui chante. / Voici le gâteau que maman a fait. / C'est la ville où je suis né." },
    ],
    reflexes: [
      { si: "je veux savoir si une phrase est simple ou complexe", alors: "je compte les verbes conjugués : un seul verbe, c'est simple ; plusieurs verbes, c'est complexe" },
      { si: "je vois une virgule entre deux propositions, sans petit mot", alors: "c'est une juxtaposition : ce sont la virgule et la ponctuation qui relient" },
      { si: "je vois et, mais, ou, donc ou puis entre deux propositions", alors: "c'est une coordination : ce petit mot relie les deux parties de la phrase" },
      { si: "je vois qui, que ou où au milieu d'une phrase", alors: "je sais qu'une deuxième proposition commence juste après ce petit mot" },
    ],
    pieges: [
      "Croire que toute phrase longue est complexe : une phrase peut être longue avec un seul verbe conjugué, donc simple. Exemple : Le petit chat noir de ma voisine dort sur le canapé. Je compte les verbes conjugués, pas les mots.",
      "Compter un verbe à l'infinitif comme un verbe conjugué : dans « Je veux manger », seul « veux » est conjugué, « manger » reste à l'infinitif. La phrase est donc simple. Je ne compte que les verbes conjugués.",
      "Confondre juxtaposition et coordination : quand un petit mot (et, mais, ou, donc, puis) relie les propositions, c'est la coordination ; quand il y a seulement une virgule, c'est la juxtaposition. Je regarde s'il y a un mot de liaison ou juste une ponctuation.",
    ],
    reel: "En vrai, à Saint-Pierre, quand tu dis « je vais au marché forain puis je passe à la plage », tu fais une phrase complexe avec deux verbes conjugués reliés par le mot puis",
  },
  {
    id: "conjugaison",
    emoji: "🕰️",
    titre: "La conjugaison",
    domaine: "Étude de la langue",
    essentiel:
      "**Conjuguer** un verbe, c'est changer sa forme selon la personne et le **temps** (présent, imparfait, futur, passé composé). Chaque verbe a un **infinitif** et appartient à un **groupe**. Le temps me dit quand se passe l'action : hier, maintenant ou demain.",
    formules: [
      { label: "Je trouve l'infinitif et le groupe", latex: "Pour trouver l'infinitif, je dis « en train de... ». Dans « Nous chantons », le verbe est « chanter » : 1er groupe (infinitif en -er). « Finir » est du 2e groupe (-ir, nous finissons), et « prendre » ou « venir » sont du 3e groupe." },
      { label: "Le radical ne change pas, la terminaison change", latex: "Le radical est la partie qui reste pareille, la terminaison est la partie qui change. Dans « chanter », le radical est « chant- » : je chant-e, nous chant-ons, il chant-ait." },
      { label: "Au présent, j'apprends les verbes irréguliers par cœur", latex: "Les verbes très utilisés ne suivent pas les règles habituelles. Je retiens : je suis, tu es, il est (être) ; j'ai, tu as, il a (avoir) ; je vais, nous allons (aller) ; nous faisons, vous dites (et pas « vous faisez » ni « vous disez »)." },
      { label: "Imparfait et futur ont des terminaisons fixes", latex: "À l'imparfait, toutes les personnes prennent -ais, -ais, -ait, -ions, -iez, -aient : je jouais, nous jouions. Au futur, j'ajoute -ai, -as, -a, -ons, -ez, -ont à l'infinitif : je jouerai, nous jouerons." },
      { label: "Le passé composé se forme avec avoir ou être", latex: "Passé composé = avoir ou être au présent + participe passé. Avec « être », j'accorde le participe avec le sujet : « Elle est partie », « Ils sont venus ». Avec « avoir », je n'accorde pas avec le sujet : « Elle a mangé »." },
    ],
    reflexes: [
      { si: "je veux connaître le groupe d'un verbe", alors: "je regarde la fin de son infinitif : -er (1er groupe), -ir avec « nous -issons » (2e groupe), sinon 3e groupe" },
      { si: "je lis « il chanta », « il partit » ou « ils vinrent » dans une histoire", alors: "je reconnais le passé simple, le temps des actions dans les récits écrits" },
      { si: "dans un récit je vois l'imparfait et le passé simple ensemble", alors: "je comprends que l'imparfait plante le décor qui dure et que le passé simple raconte l'action soudaine" },
      { si: "j'hésite entre l'imparfait et le futur à la 1re personne", alors: "je remplace « je » par « il » : « il jouait » c'est l'imparfait, « il jouera » c'est le futur" },
    ],
    pieges: [
      "Écrire « vous faisez » ou « vous disez » : ces verbes sont irréguliers, on dit « vous faites » et « vous dites », qu'il faut apprendre par cœur.",
      "Oublier d'accorder le participe passé avec « être » : on écrit « Elle est partie » et « Ils sont arrivés », pas « Elle est parti » ; avec « être », le participe s'accorde toujours avec le sujet.",
      "Confondre l'imparfait et le futur : « je jouais » (avec -ais) raconte ce qui durait, « je jouerai » (avec -ai) dit ce qui va arriver ; je remplace « je » par « il » pour entendre la différence.",
    ],
    reel: "En vrai, quand tu racontes ta sortie au volcan de la Fournaise, tu dis « le ciel était gris » à l'imparfait pour le décor, puis « la lave a jailli » au passé composé pour l'action",
  },
];

// Couche "fixed" imprimable groupée par notion (source des tests de survie).
const BANQUES: Record<string, TutorBankItemV4[]> = {};
for (const item of francaisCm2FixedBank) {
  (BANQUES[item.notionId] ??= []).push(item);
}

export const KIT_FRANCAIS_CM2: KitData = {
  slug: "francais-cm2",
  titre: "Guide de survie · Français CM2",
  baseline:
    "Les 9 grands domaines du français en CM2 en 9 fiches : l'essentiel, les règles qui sauvent, les réflexes, les pièges — et un test corrigé par fiche. Pour bien lire, écrire et parler, et entrer en 6e sans stress. À imprimer, à glisser dans le cahier.",
  matiere: "francais",
  classeLabel: "CM2",
  coachClasse: "cm2",
  notions: CONDENSES.map((c) => ({
    ...c,
    micros: microsDe(c.id),
    exos: testDeSurvie(BANQUES[c.id] ?? []),
  })),
};
