// lib/tutor-v4/questionBank/4e/francais/lecture-culture.bank.ts
//
// LIRE, METTRE EN VOIX, SITUER — les onze micros de 4e que personne n'avait
// retravaillées. Écrit le 25/08/2026.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020 — celui qui s'applique ENCORE à la
// 4e, le nouveau texte ne l'atteignant qu'en septembre 2027.
//
// ⛔ POURQUOI CE FICHIER (mesuré le 25/08/2026). `verifier-variete.mjs` fixe le
// seuil à DIX énoncés distincts par micro — la règle de Frédéric du 15/08 :
// « un élève ne doit pas retomber sur la même question en dix minutes ». Sur
// les 68 micros de 4e, dix-huit étaient dessous. Et elles n'étaient pas
// dispersées : c'étaient EXACTEMENT les cinq notions à qui aucune banque
// dédiée n'avait jamais été écrite — lecture, mise en voix, culture, écriture,
// oral. Toutes les autres, retravaillées entre le 12 et le 16/08, sont très
// au-dessus (médiane 19, jusqu'à 392).
//
// ⭐ LA SIGNATURE À RECONNAITRE : « 4 items, dont 1 fixe ». C'est le générateur
// `buildCycle4FrancaisBank` seul, avec son pool de cinq ou six énoncés partagé
// par les trois niveaux du cycle — plus une question figée. Six énoncés, trois
// gabarits qui piochent dedans : l'élève a tout vu en six minutes.
//
// Ce fichier ajoute UN gabarit par micro, sur une table de quatorze à seize
// cas. Chaque micro passe ainsi au-dessus de vingt énoncés distincts.
//
// ⛔⛔ TOUTES LES RÉPONSES D'UN MÊME POOL FONT LA MÊME LONGUEUR, à quelques
// caractères près. C'est la leçon du 25/08 : sur les 21 items où la bonne
// réponse dépassait de huit caractères ou plus, un élève qui ne savait rien
// répondait juste en prenant la ligne la plus longue. On ne raccourcit pas la
// bonne réponse : on rend les leurres aussi précis qu'elle. Toute ligne ajoutée
// ici doit tenir dans la fourchette de son pool — `verifier-devinabilite-runtime.ts`
// le vérifie, et le script de visée est `longueurs-pools.mjs`.
//
// ⛔ ON INTERROGE LES NOTIONS, JAMAIS UNE ŒUVRE. Les livres sont choisis par le
// professeur : aucun cas ne nomme un titre ni un auteur. Chaque situation est
// décrite en une ligne, et l'élève répond sans avoir le texte sous les yeux,
// parce que ce qui s'interroge est un GESTE de lecteur, pas un souvenir.
//
// ⛔ QCM uniquement, quatre propositions.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(definition: string, methode: string, exemple: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Exemple : ${exemple}

Conclusion : ${conclusion}`;
}

type Cas = { readonly gauche: string; readonly droite: string };

/* =============================================================================
   1. CE QUE LE TEXTE FAIT, D'ENSEMBLE          → 4e_comp_sens_global
   ---------------------------------------------------------------------------
   « Élaborer une interprétation de textes littéraires » commence par une
   question simple, que les élèves sautent : qu'est-ce que ce texte FAIT ?
   Raconter, décrire, faire parler, convaincre, expliquer — cinq gestes qui ne
   se lisent pas de la même façon. Un élève qui prend un portrait pour un récit
   cherche une action qui n'existe pas, et conclut que « rien ne se passe ».
   ========================================================================== */

const ENSEMBLE: readonly Cas[] = [
  { gauche: "Rien ne bouge : le texte détaille le visage, les mains et l'allure d'un homme.", droite: "il fait un portrait : c'est un être qu'il donne à voir, pas une action" },
  { gauche: "Le texte suit un personnage du matin au soir, et l'ordre des faits compte.", droite: "il raconte : les évènements s'enchainent dans un ordre qui fait sens" },
  { gauche: "Deux personnages se répondent, et l'on ne lit presque que leurs paroles.", droite: "il fait parler : ce sont les répliques qui portent tout le passage" },
  { gauche: "Le texte affirme une idée, donne une raison, puis un exemple qui l'appuie.", droite: "il argumente : il cherche à faire admettre quelque chose au lecteur" },
  { gauche: "Le texte détaille une pièce vide, sa lumière, ses odeurs, et rien d'autre.", droite: "il décrit un lieu : l'atmosphère compte plus que ce qui s'y passe" },
  { gauche: "On lit ce que pense le personnage, sans qu'il le dise à personne.", droite: "il fait entendre une pensée : c'est le dedans qui est donné à lire" },
  { gauche: "Le texte énumère les rues, les enseignes et les bruits d'un quartier.", droite: "il décrit un lieu : l'atmosphère compte plus que ce qui s'y passe" },
  { gauche: "Trois phrases suffisent : il part, il marche, il n'arrive jamais.", droite: "il raconte : les évènements s'enchainent dans un ordre qui fait sens" },
  { gauche: "Le narrateur défend une opinion sur la justice et cite deux cas.", droite: "il argumente : il cherche à faire admettre quelque chose au lecteur" },
  { gauche: "Le passage entier tient dans une dispute, réplique après réplique.", droite: "il fait parler : ce sont les répliques qui portent tout le passage" },
  { gauche: "Le texte s'arrête sur une silhouette, ses vêtements et sa démarche.", droite: "il fait un portrait : c'est un être qu'il donne à voir, pas une action" },
  { gauche: "Le personnage se demande s'il a eu raison, et personne ne l'entend.", droite: "il fait entendre une pensée : c'est le dedans qui est donné à lire" },
  { gauche: "Le texte raconte une journée qui bascule à la dernière ligne.", droite: "il raconte : les évènements s'enchainent dans un ordre qui fait sens" },
  { gauche: "L'auteur veut prouver que la ville a changé, et il donne ses raisons.", droite: "il argumente : il cherche à faire admettre quelque chose au lecteur" },
  { gauche: "Le texte décrit la mer un soir de tempête, longuement, sans personnage.", droite: "il décrit un lieu : l'atmosphère compte plus que ce qui s'y passe" },
];

const TOUS_ENSEMBLES: readonly string[] = [...new Set(ENSEMBLE.map((c) => c.droite))];

/* =============================================================================
   2. L'INDICE QUI JUSTIFIE                     → 4e_comp_indices
   ---------------------------------------------------------------------------
   « Justifier son interprétation en s'appuyant sur des éléments du texte. »
   L'élève de 4e sait souvent CE QU'IL COMPREND, jamais D'OÙ ÇA VIENT. Ce
   gabarit lui donne l'interprétation et lui demande sur quoi elle repose : on
   nomme la SORTE d'indice, ce qui se transfère d'un texte à l'autre.
   ========================================================================== */

const INDICES: readonly Cas[] = [
  { gauche: "Tu veux montrer qu'il a peur. Le texte dit : « ses mains tremblaient, sa gorge était sèche ».", droite: "des notations physiques : le corps dit ce que le personnage tait" },
  { gauche: "Tu veux montrer que le lieu est menaçant. On lit : « couteau », « griffe », « morsure du vent ».", droite: "un champ lexical : les mots d'un même domaine reviennent ensemble" },
  { gauche: "Tu veux montrer que tout bascule ici. Le texte passe de l'imparfait au passé simple.", droite: "un changement de temps : la rupture se voit dans la conjugaison" },
  { gauche: "Tu veux montrer que la ville l'écrase. On lit : « la ville l'avalait comme une bouche ».", droite: "une image : une comparaison ou une métaphore porte le jugement" },
  { gauche: "Tu veux montrer qu'il hésite. La phrase s'interrompt trois fois par des points de suspension.", droite: "la ponctuation : elle fait entendre un rythme et une hésitation" },
  { gauche: "Tu veux montrer que le narrateur juge. Il écrit « ce prétendu savant » au lieu du nom.", droite: "un mot qui évalue : le narrateur glisse son avis dans le mot choisi" },
  { gauche: "Tu veux montrer qu'il est épuisé. Le texte dit : « ses jambes ne le portaient plus ».", droite: "des notations physiques : le corps dit ce que le personnage tait" },
  { gauche: "Tu veux montrer que la scène est militaire. On lit : « ordre », « rang », « clairon », « garde ».", droite: "un champ lexical : les mots d'un même domaine reviennent ensemble" },
  { gauche: "Tu veux montrer que le calme est fini. Le récit quitte l'imparfait pour le passé simple.", droite: "un changement de temps : la rupture se voit dans la conjugaison" },
  { gauche: "Tu veux montrer que le silence pèse. On lit : « un silence lourd comme une pierre ».", droite: "une image : une comparaison ou une métaphore porte le jugement" },
  { gauche: "Tu veux montrer qu'il s'emporte. La phrase se termine par trois points d'exclamation.", droite: "la ponctuation : elle fait entendre un rythme et une hésitation" },
  { gauche: "Tu veux montrer que le narrateur méprise le lieu. Il parle d'« une espèce de village ».", droite: "un mot qui évalue : le narrateur glisse son avis dans le mot choisi" },
  { gauche: "Tu veux montrer que la mer domine tout. On lit : « vague », « écume », « marée », « ressac ».", droite: "un champ lexical : les mots d'un même domaine reviennent ensemble" },
  { gauche: "Tu veux montrer qu'il pleure sans le dire. Le texte dit : « sa vue se brouillait ».", droite: "des notations physiques : le corps dit ce que le personnage tait" },
  { gauche: "Tu veux montrer que le temps s'arrête. Une phrase de deux mots suit une phrase de dix lignes.", droite: "la ponctuation : elle fait entendre un rythme et une hésitation" },
];

const TOUS_INDICES: readonly string[] = [...new Set(INDICES.map((c) => c.droite))];

/* =============================================================================
   3. L'IMPLICITE                               → 4e_comp_implicite
   ---------------------------------------------------------------------------
   « Mettre en relation des informations pour comprendre l'implicite » : c'est
   l'attendu qui distingue la 4e de la 5e. On donne une réplique ou une phrase
   ordinaire, et l'on demande ce qu'elle fait vraiment.
   ⚠️ Chaque cas se comprend sans contexte : c'est la condition pour qu'un QCM
   sur l'implicite ait UNE bonne réponse et non trois défendables.
   ========================================================================== */

const IMPLICITE: readonly Cas[] = [
  { gauche: "La mère ouvre la porte à minuit et demande : « Tu as vu l'heure ? »", droite: "un reproche : la question n'attend aucune réponse, elle accuse" },
  { gauche: "Invité à sortir, il répond : « J'ai beaucoup de travail en ce moment. »", droite: "un refus poli : on dit non sans jamais prononcer le mot « non »" },
  { gauche: "Le visiteur sourit et lâche : « Vous avez une bien belle maison, ici. »", droite: "une menace voilée : la douceur des mots en dit tout autre chose" },
  { gauche: "Après une chute spectaculaire, son ami dit : « Élégant, vraiment. »", droite: "de l'ironie : on dit le contraire de ce qu'on veut faire entendre" },
  { gauche: "Interrogé sur le vol, il répond : « Je n'étais même pas dans la pièce. »", droite: "un aveu indirect : il en sait plus qu'on ne lui en avait demandé" },
  { gauche: "Le père regarde le bulletin et dit seulement : « Bien. Très bien. »", droite: "de l'ironie : on dit le contraire de ce qu'on veut faire entendre" },
  { gauche: "On lui propose de rester diner ; il répond : « Le dernier car passe à sept heures. »", droite: "un refus poli : on dit non sans jamais prononcer le mot « non »" },
  { gauche: "Le contremaitre observe : « Il reste beaucoup de gens à embaucher, dehors. »", droite: "une menace voilée : la douceur des mots en dit tout autre chose" },
  { gauche: "Elle rentre trempée, et sa sœur dit : « Tu n'as pas pris de parapluie. »", droite: "un reproche : la question n'attend aucune réponse, elle accuse" },
  { gauche: "Accusé d'avoir menti, il répond : « Ce n'est pas moi qui ai commencé. »", droite: "un aveu indirect : il en sait plus qu'on ne lui en avait demandé" },
  { gauche: "Le client goute et déclare : « C'est original, comme cuisine. »", droite: "de l'ironie : on dit le contraire de ce qu'on veut faire entendre" },
  { gauche: "Le voisin passe et remarque : « Votre chien aboie toute la nuit, dites-moi. »", droite: "un reproche : la question n'attend aucune réponse, elle accuse" },
  { gauche: "On l'invite à parler devant la classe : « Je crois que Léa le fera mieux. »", droite: "un refus poli : on dit non sans jamais prononcer le mot « non »" },
  { gauche: "Le propriétaire glisse : « Les loyers montent beaucoup, dans le quartier. »", droite: "une menace voilée : la douceur des mots en dit tout autre chose" },
  { gauche: "On lui demande où il était ; il répond : « Personne ne m'a vu partir. »", droite: "un aveu indirect : il en sait plus qu'on ne lui en avait demandé" },
];

const TOUS_IMPLICITES: readonly string[] = [...new Set(IMPLICITE.map((c) => c.droite))];

/* =============================================================================
   4. UNE APPRÉCIATION FONDÉE                   → 4e_comp_apprecier
   ---------------------------------------------------------------------------
   « Justifier et réviser son appréciation. » Le programme ne demande pas
   d'aimer : il demande de DIRE POURQUOI, en s'appuyant sur le texte. On donne
   donc une réaction d'élève, et l'on fait nommer ce qu'elle vaut.
   ⛔ La bonne réponse n'est pas « celle qui aime » : deux cas ci-dessous sont
   des rejets parfaitement fondés.
   ========================================================================== */

const APPRECIER: readonly Cas[] = [
  { gauche: "« Ce passage m'a ému : le narrateur ne dit jamais qu'il pleure, et on le sent. »", droite: "une appréciation fondée : le jugement s'appuie sur le texte lui-même" },
  { gauche: "« Je n'ai pas aimé, c'est tout. »", droite: "un avis sans appui : rien n'est dit de ce qui l'aurait provoqué" },
  { gauche: "« Ça parle d'un garçon qui part, puis qui revient, et à la fin il repart. »", droite: "un résumé déguisé : on redit l'histoire au lieu de la juger" },
  { gauche: "« J'ai trouvé ça long, parce que la description tient trois pages sans action. »", droite: "une appréciation fondée : le jugement s'appuie sur le texte lui-même" },
  { gauche: "« Je préfère les histoires de sport, alors forcément. »", droite: "un jugement sur soi : on parle de son gout, pas de ce qu'on a lu" },
  { gauche: "« C'est un beau texte, très beau même, vraiment très beau. »", droite: "un avis sans appui : rien n'est dit de ce qui l'aurait provoqué" },
  { gauche: "« La fin m'a surpris : rien dans les pages d'avant ne la laissait deviner. »", droite: "une appréciation fondée : le jugement s'appuie sur le texte lui-même" },
  { gauche: "« Le personnage rencontre une femme, ils se disputent, il s'en va. »", droite: "un résumé déguisé : on redit l'histoire au lieu de la juger" },
  { gauche: "« J'ai détesté : le narrateur juge tout le monde et on ne peut jamais lui répondre. »", droite: "une appréciation fondée : le jugement s'appuie sur le texte lui-même" },
  { gauche: "« Je lis peu, donc je ne peux pas dire si c'est bien. »", droite: "un jugement sur soi : on parle de son gout, pas de ce qu'on a lu" },
  { gauche: "« Franchement, ce livre est nul, tout le monde le pense. »", droite: "un avis sans appui : rien n'est dit de ce qui l'aurait provoqué" },
  { gauche: "« Il y a d'abord la fuite, ensuite le procès, et enfin la lettre. »", droite: "un résumé déguisé : on redit l'histoire au lieu de la juger" },
  { gauche: "« Ce qui m'a plu, c'est qu'on entend le personnage penser, et jamais parler. »", droite: "une appréciation fondée : le jugement s'appuie sur le texte lui-même" },
  { gauche: "« Les livres d'avant 1900 m'ennuient, celui-là comme les autres. »", droite: "un jugement sur soi : on parle de son gout, pas de ce qu'on a lu" },
  { gauche: "« C'était pas mal, dans l'ensemble, je dirais. »", droite: "un avis sans appui : rien n'est dit de ce qui l'aurait provoqué" },
];

const TOUTES_APPRECIATIONS: readonly string[] = [...new Set(APPRECIER.map((c) => c.droite))];

/* =============================================================================
   5. PRÉPARER SA LECTURE À VOIX HAUTE          → 4e_voix_preparer
   ---------------------------------------------------------------------------
   « Réciter un texte, d'une quinzaine de lignes ou de vers, de manière
   expressive en s'appuyant sur la ponctuation. » Préparer, ce n'est pas
   relire : c'est ANNOTER. Chaque cas donne une difficulté du texte et demande
   la marque à porter sur la feuille avant de lire.
   ========================================================================== */

const PREPARER: readonly Cas[] = [
  { gauche: "Trois phrases très longues s'enchainent sans un seul point.", droite: "tu marques tes respirations : la virgule devient ta pause" },
  { gauche: "Au milieu du texte, un autre personnage prend la parole.", droite: "tu notes le changement de voix : on doit entendre qui parle" },
  { gauche: "Le passage contient trois mots que tu n'as jamais prononcés.", droite: "tu vérifies leur prononciation avant, jamais devant la classe" },
  { gauche: "Une phrase de deux mots suit une phrase de six lignes.", droite: "tu prépares le contraste : le court ne se dit pas comme le long" },
  { gauche: "Un mot est répété quatre fois dans le même paragraphe.", droite: "tu soulignes ce qui doit s'entendre : la reprise porte le sens" },
  { gauche: "Le texte est en vers, et une phrase court sur deux lignes.", droite: "tu marques tes respirations : la virgule devient ta pause" },
  { gauche: "Le narrateur cite les paroles d'un personnage entre guillemets.", droite: "tu notes le changement de voix : on doit entendre qui parle" },
  { gauche: "Deux noms propres étrangers reviennent tout au long du texte.", droite: "tu vérifies leur prononciation avant, jamais devant la classe" },
  { gauche: "Le dernier vers ne fait que trois syllabes, après douze longs vers.", droite: "tu prépares le contraste : le court ne se dit pas comme le long" },
  { gauche: "Le mot « jamais » apparait au début de chaque strophe.", droite: "tu soulignes ce qui doit s'entendre : la reprise porte le sens" },
  { gauche: "Le texte enchaine des propositions séparées par des points-virgules.", droite: "tu marques tes respirations : la virgule devient ta pause" },
  { gauche: "Un dialogue de six répliques occupe le cœur du passage.", droite: "tu notes le changement de voix : on doit entendre qui parle" },
  { gauche: "Le texte emploie deux mots anciens que tu lis pour la première fois.", droite: "tu vérifies leur prononciation avant, jamais devant la classe" },
  { gauche: "Le même adjectif revient à la fin de chacune des quatre phrases.", droite: "tu soulignes ce qui doit s'entendre : la reprise porte le sens" },
  { gauche: "Une seule ligne isolée sépare deux longs blocs de texte.", droite: "tu prépares le contraste : le court ne se dit pas comme le long" },
];

const TOUTES_PREPARATIONS: readonly string[] = [...new Set(PREPARER.map((c) => c.droite))];

/* =============================================================================
   6. LA VOIX, LE RYTHME, LE REGARD             → 4e_voix_expressive
   ---------------------------------------------------------------------------
   « Exprimer sa compréhension et son interprétation par sa lecture à voix
   haute. » Ici, un signe du texte → ce qu'il commande à la voix. C'est la
   ponctuation qui dirige, et c'est cela que le programme demande d'entendre.
   ========================================================================== */

const EXPRESSIVE: readonly Cas[] = [
  { gauche: "La phrase se termine par des points de suspension.", droite: "tu laisses la voix en suspens et tu ménages un silence" },
  { gauche: "La phrase se termine par un point d'interrogation.", droite: "tu fais monter la voix sur la fin, sans crier pour autant" },
  { gauche: "Un mot est écrit en italique au milieu de la phrase.", droite: "tu appuies dessus : l'auteur demande qu'on l'entende à part" },
  { gauche: "Un groupe est enfermé entre deux tirets, au milieu.", droite: "tu baisses la voix : l'incise se dit plus bas que le reste" },
  { gauche: "Trois phrases très courtes se suivent, coup sur coup.", droite: "tu accélères : le rythme bref doit s'entendre comme tel" },
  { gauche: "Le texte s'achève sur un point d'exclamation.", droite: "tu portes la voix plus haut, et tu tiens la dernière syllabe" },
  { gauche: "Une question suit immédiatement une affirmation.", droite: "tu fais monter la voix sur la fin, sans crier pour autant" },
  { gauche: "Deux mots sont mis entre parenthèses au milieu du vers.", droite: "tu baisses la voix : l'incise se dit plus bas que le reste" },
  { gauche: "La phrase s'arrête net, sans que l'idée soit finie.", droite: "tu laisses la voix en suspens et tu ménages un silence" },
  { gauche: "Un nom est écrit tout en majuscules dans la réplique.", droite: "tu appuies dessus : l'auteur demande qu'on l'entende à part" },
  { gauche: "Le paragraphe enchaine des phrases de trois mots chacune.", droite: "tu accélères : le rythme bref doit s'entendre comme tel" },
  { gauche: "Le personnage crie son refus, et le texte le marque.", droite: "tu portes la voix plus haut, et tu tiens la dernière syllabe" },
  { gauche: "Une remarque du narrateur s'intercale entre deux virgules.", droite: "tu baisses la voix : l'incise se dit plus bas que le reste" },
  { gauche: "Le vers se termine par trois points, et la strophe s'arrête.", droite: "tu laisses la voix en suspens et tu ménages un silence" },
  { gauche: "Un seul mot est souligné dans tout le paragraphe.", droite: "tu appuies dessus : l'auteur demande qu'on l'entende à part" },
];

const TOUTES_EXPRESSIONS: readonly string[] = [...new Set(EXPRESSIVE.map((c) => c.droite))];

/* =============================================================================
   7. RÉCITER SANS S'ARRÊTER                    → 4e_voix_reciter
   ---------------------------------------------------------------------------
   « S'entrainer, seul ou avec ses pairs, pour améliorer sa lecture. » La
   récitation se joue sur les accidents : le trou, le mot avalé, le trac. On
   interroge donc la RÉACTION, qui s'apprend et se prépare.
   ========================================================================== */

const RECITER: readonly Cas[] = [
  { gauche: "Tu as un trou au milieu de la troisième strophe.", droite: "tu repars au vers suivant, sans t'excuser ni t'interrompre" },
  { gauche: "Tu récites beaucoup trop vite depuis le premier vers.", droite: "tu ralentis sur une pause déjà prévue, sans le faire voir" },
  { gauche: "Tu t'aperçois que personne au fond ne t'entend.", droite: "tu portes la voix vers le fond, sans changer ton rythme" },
  { gauche: "Tu butes sur un mot et tu le prononces de travers.", droite: "tu redis le mot une fois, correctement, et tu continues" },
  { gauche: "Tu apprends encore le texte la veille au soir, en entier.", droite: "tu l'apprends par petits blocs, plusieurs jours de suite" },
  { gauche: "Tu oublies un vers entier et tu t'en rends compte après.", droite: "tu repars au vers suivant, sans t'excuser ni t'interrompre" },
  { gauche: "Le trac t'a fait débiter la première strophe d'un trait.", droite: "tu ralentis sur une pause déjà prévue, sans le faire voir" },
  { gauche: "Tu récites en regardant tes chaussures depuis le début.", droite: "tu relèves les yeux à chaque fin de phrase, au moins" },
  { gauche: "Tu as dit « sombre » à la place de « lourde ».", droite: "tu redis le mot une fois, correctement, et tu continues" },
  { gauche: "Tu répètes le poème dans ta tête, sans jamais le dire tout haut.", droite: "tu l'apprends par petits blocs, plusieurs jours de suite" },
  { gauche: "Ta voix baisse à chaque fin de vers et se perd.", droite: "tu portes la voix vers le fond, sans changer ton rythme" },
  { gauche: "Tu t'arrêtes et tu recommences la strophe depuis le début.", droite: "tu repars au vers suivant, sans t'excuser ni t'interrompre" },
  { gauche: "Tu regardes le plafond pour retrouver la suite du texte.", droite: "tu relèves les yeux à chaque fin de phrase, au moins" },
  { gauche: "Tu récites d'une seule traite, sans jamais reprendre ton souffle.", droite: "tu ralentis sur une pause déjà prévue, sans le faire voir" },
  { gauche: "Tu relis le texte vingt fois la veille et rien ne tient.", droite: "tu l'apprends par petits blocs, plusieurs jours de suite" },
];

const TOUTES_RECITATIONS: readonly string[] = [...new Set(RECITER.map((c) => c.droite))];

/* =============================================================================
   8. RECONNAITRE UN GENRE                      → 4e_culture_genres
   ---------------------------------------------------------------------------
   « Connaitre quelques caractéristiques des genres littéraires abordés dans
   l'année. » Le genre se voit à la FORME, avant même la lecture : c'est ce
   raccourci-là qu'on installe.
   ⛔ Aucun titre, aucun auteur : on reconnait une forme, on ne récite pas une
   liste d'œuvres.
   ========================================================================== */

const GENRES: readonly Cas[] = [
  { gauche: "Le texte est en vers, avec des retours à la ligne et des rimes.", droite: "un poème : la forme se voit avant même qu'on ait lu un mot" },
  { gauche: "Un nom de personnage précède chaque réplique, et rien ne raconte.", droite: "une scène de théâtre : les noms en tête portent la parole" },
  { gauche: "Un narrateur raconte, sur trois cents pages, la vie d'une famille.", droite: "un roman : le récit long installe des personnages qui durent" },
  { gauche: "Un récit de six pages, peu de personnages, une chute à la fin.", droite: "une nouvelle : le récit est bref et tout converge vers la fin" },
  { gauche: "Des animaux parlent, l'histoire est courte et se clôt sur une leçon.", droite: "une fable : le récit bref sert une morale qu'on peut citer" },
  { gauche: "Le narrateur dit « je » et raconte sa propre enfance.", droite: "un récit de soi : celui qui écrit et celui qui vit ne font qu'un" },
  { gauche: "Chaque strophe compte quatre vers, et le son revient de deux en deux.", droite: "un poème : la forme se voit avant même qu'on ait lu un mot" },
  { gauche: "Le texte indique entre parenthèses qu'un personnage entre en scène.", droite: "une scène de théâtre : les noms en tête portent la parole" },
  { gauche: "Le récit tient en quatre pages et bascule à la dernière ligne.", droite: "une nouvelle : le récit est bref et tout converge vers la fin" },
  { gauche: "Le livre suit un personnage sur vingt ans, chapitre après chapitre.", droite: "un roman : le récit long installe des personnages qui durent" },
  { gauche: "Un loup et un agneau discutent, et la dernière phrase donne la leçon.", droite: "une fable : le récit bref sert une morale qu'on peut citer" },
  { gauche: "L'auteur écrit « je me souviens » et donne la date de sa naissance.", droite: "un récit de soi : celui qui écrit et celui qui vit ne font qu'un" },
  { gauche: "Le texte alterne des répliques et des indications de mise en scène.", droite: "une scène de théâtre : les noms en tête portent la parole" },
  { gauche: "Le texte joue sur les sonorités et compte ses syllabes.", droite: "un poème : la forme se voit avant même qu'on ait lu un mot" },
  { gauche: "Le livre commence à la naissance du narrateur et suit sa jeunesse.", droite: "un récit de soi : celui qui écrit et celui qui vit ne font qu'un" },
];

const TOUS_GENRES: readonly string[] = [...new Set(GENRES.map((c) => c.droite))];

/* =============================================================================
   9. SITUER PAR UN DÉTAIL                      → 4e_culture_contexte
   ---------------------------------------------------------------------------
   « Comprendre, interpréter, apprécier une œuvre dans son contexte. » On ne
   demande pas une date apprise : on demande ce QU'UN DÉTAIL AUTORISE à
   conclure. C'est un raisonnement, transférable à n'importe quel texte.
   ⭐ Une réponse dit qu'on NE PEUT PAS conclure : c'est la plus utile des cinq,
   et elle empêche de transformer l'exercice en devinette.
   ========================================================================== */

const CONTEXTE: readonly Cas[] = [
  { gauche: "Le personnage écrit une lettre et attend trois semaines la réponse.", droite: "c'est avant le téléphone : le temps de l'attente date le texte" },
  { gauche: "L'usine embauche des enfants, et le train traverse la campagne.", droite: "c'est le XIXe siècle : l'usine et le rail sont là, pas l'école" },
  { gauche: "On parle de couvre-feu, de tickets de rationnement et d'occupants.", droite: "c'est un temps de guerre : le texte en porte partout les traces" },
  { gauche: "Le personnage consulte son écran avant de traverser la rue.", droite: "c'est notre époque : les objets du quotidien sont les nôtres" },
  { gauche: "Deux personnages se disputent au sujet d'un héritage de famille.", droite: "on ne peut pas dater : ce détail existe à toutes les époques" },
  { gauche: "Le voyageur met huit jours pour rejoindre la ville en voiture à chevaux.", droite: "c'est avant le téléphone : le temps de l'attente date le texte" },
  { gauche: "Le patron paie à la journée, et l'atelier tourne à la vapeur.", droite: "c'est le XIXe siècle : l'usine et le rail sont là, pas l'école" },
  { gauche: "Les personnages descendent à la cave dès que la sirène retentit.", droite: "c'est un temps de guerre : le texte en porte partout les traces" },
  { gauche: "Le personnage aime, se tait, puis regrette de s'être tu.", droite: "on ne peut pas dater : ce détail existe à toutes les époques" },
  { gauche: "On envoie un message et l'on s'étonne qu'il reste sans réponse une heure.", droite: "c'est notre époque : les objets du quotidien sont les nôtres" },
  { gauche: "Le courrier arrive par la malle-poste, deux fois par semaine.", droite: "c'est avant le téléphone : le temps de l'attente date le texte" },
  { gauche: "Un enfant de dix ans descend à la mine avant le lever du jour.", droite: "c'est le XIXe siècle : l'usine et le rail sont là, pas l'école" },
  { gauche: "Le père et le fils ne se comprennent pas, et le texte le montre.", droite: "on ne peut pas dater : ce détail existe à toutes les époques" },
  { gauche: "Les habitants écoutent le communiqué du soir autour du poste.", droite: "c'est un temps de guerre : le texte en porte partout les traces" },
  { gauche: "La conversation se poursuit alors que les deux sont à mille kilomètres.", droite: "c'est notre époque : les objets du quotidien sont les nôtres" },
];

const TOUS_CONTEXTES: readonly string[] = [...new Set(CONTEXTE.map((c) => c.droite))];

/* =============================================================================
   10. METTRE EN RÉSEAU                         → 4e_culture_reseau
   ---------------------------------------------------------------------------
   « Comparer des œuvres littéraires et artistiques. » Rapprocher deux textes
   ne suffit pas : il faut dire CE QUI les relie. On donne deux œuvres décrites
   en une ligne, et l'on fait nommer la nature du lien.
   ⭐ Là encore, une réponse dit qu'IL N'Y A PAS DE LIEN : le rapprochement de
   sujet est la faute la plus fréquente en 4e.
   ========================================================================== */

const RESEAU: readonly Cas[] = [
  { gauche: "Un poème dit une ville la nuit ; un tableau montre cette ville éclairée.", droite: "un même motif dans deux arts : on compare ce que chacun peut" },
  { gauche: "Un auteur récrit une fable ancienne en changeant la fin et la morale.", droite: "une reprise : le second reprend le premier pour le déplacer" },
  { gauche: "Un texte célèbre la guerre en héros ; un autre la montre en boue.", droite: "une opposition : les deux disent l'inverse sur le même sujet" },
  { gauche: "Deux romans racontent une arrivée à la ville, à deux siècles d'écart.", droite: "un même genre à deux époques : on mesure ce qui a changé" },
  { gauche: "Un poème parle de la mer ; un roman se passe au bord de la mer.", droite: "aucun lien véritable : le sujet commun ne fait pas un réseau" },
  { gauche: "Une chanson reprend mot pour mot un poème et lui donne une musique.", droite: "un même motif dans deux arts : on compare ce que chacun peut" },
  { gauche: "Un dramaturge reprend un mythe connu et en fait une pièce moderne.", droite: "une reprise : le second reprend le premier pour le déplacer" },
  { gauche: "Un texte fait du travail une fierté ; l'autre en fait une machine.", droite: "une opposition : les deux disent l'inverse sur le même sujet" },
  { gauche: "Deux nouvelles fantastiques, l'une de 1830, l'autre d'aujourd'hui.", droite: "un même genre à deux époques : on mesure ce qui a changé" },
  { gauche: "Les deux textes contiennent le mot « nuit » dans leur première phrase.", droite: "aucun lien véritable : le sujet commun ne fait pas un réseau" },
  { gauche: "Un film montre la scène qu'un roman avait racontée en trois pages.", droite: "un même motif dans deux arts : on compare ce que chacun peut" },
  { gauche: "Un poète répond à un poème célèbre en gardant sa forme exacte.", droite: "une reprise : le second reprend le premier pour le déplacer" },
  { gauche: "Deux pièces de théâtre sur le pouvoir, l'une antique, l'autre récente.", droite: "un même genre à deux époques : on mesure ce qui a changé" },
  { gauche: "Un texte défend la science ; un autre montre ce qu'elle détruit.", droite: "une opposition : les deux disent l'inverse sur le même sujet" },
  { gauche: "Les deux auteurs sont nés la même année, dans le même pays.", droite: "aucun lien véritable : le sujet commun ne fait pas un réseau" },
];

const TOUS_RESEAUX: readonly string[] = [...new Set(RESEAU.map((c) => c.droite))];

/* =============================================================================
   11. GARDER TRACE DE SES LECTURES             → 4e_culture_trace
   ---------------------------------------------------------------------------
   « Garder une trace personnelle de lecture » — journal de lecteur, carnet,
   écrit d'appropriation. Une trace vaut par ce qu'elle permettra de retrouver
   dans six mois : on juge donc des notes réelles.
   ========================================================================== */

const TRACE: readonly Cas[] = [
  { gauche: "« p. 74 : il ment à sa sœur — c'est là que tout bascule. »", droite: "une trace utile : elle situe le moment et dit pourquoi il compte" },
  { gauche: "« Un garçon part de chez lui, puis il revient, puis il repart. »", droite: "un résumé : il redit l'histoire et ne garde rien de personnel" },
  { gauche: "« J'ai bien aimé ce livre, il était vraiment très intéressant. »", droite: "un avis sans appui : rien ne dira d'où venait cette impression" },
  { gauche: "« Mots à retenir : véranda, varangue, paillote, case. »", droite: "une liste de mots : sans phrase autour, elle ne resservira pas" },
  { gauche: "« “Il ne restait que la mer.” (p. 112) » — et rien d'autre.", droite: "une citation nue : recopiée sans qu'on dise ce qu'on en fait" },
  { gauche: "« p. 30 : la description du port — c'est là qu'on comprend sa peur. »", droite: "une trace utile : elle situe le moment et dit pourquoi il compte" },
  { gauche: "« Chapitre 1 : présentation. Chapitre 2 : le départ. Chapitre 3 : la ville. »", droite: "un résumé : il redit l'histoire et ne garde rien de personnel" },
  { gauche: "« Livre génial, à relire absolument un jour ou l'autre. »", droite: "un avis sans appui : rien ne dira d'où venait cette impression" },
  { gauche: "« “La ville l'avalait.” (p. 88) » — recopié seul dans le carnet.", droite: "une citation nue : recopiée sans qu'on dise ce qu'on en fait" },
  { gauche: "« Vocabulaire du chapitre 4 : escarpé, ravine, remblai, éboulis. »", droite: "une liste de mots : sans phrase autour, elle ne resservira pas" },
  { gauche: "« p. 145 : elle refuse — première fois qu'elle dit non toute seule. »", droite: "une trace utile : elle situe le moment et dit pourquoi il compte" },
  { gauche: "« C'était long au début, puis c'est devenu bien vers la moitié. »", droite: "un avis sans appui : rien ne dira d'où venait cette impression" },
  { gauche: "« Le père meurt au chapitre 9 et la famille quitte la maison. »", droite: "un résumé : il redit l'histoire et ne garde rien de personnel" },
  { gauche: "« p. 12, p. 40, p. 91 : la même phrase sur le silence — c'est un motif. »", droite: "une trace utile : elle situe le moment et dit pourquoi il compte" },
  { gauche: "« “Personne ne l'attendait.” » — sans page ni commentaire.", droite: "une citation nue : recopiée sans qu'on dise ce qu'on en fait" },
];

const TOUTES_TRACES: readonly string[] = [...new Set(TRACE.map((c) => c.droite))];

/* ========================================================================== */

function gabarit(
  id: string,
  microId: string,
  notionId: string,
  table: readonly Cas[],
  pool: readonly string[],
  question: string,
  difficulty: 2 | 3,
  hint: string,
  definition: string,
  methode: string,
  tags: readonly string[],
): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "4e",
    matiere: "francais",
    notionId,
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: [...tags],
    generate: () => {
      const c = randomChoice(table);
      return {
        text: `${c.gauche}\n\n${question}`,
        format: "qcm" as const,
        choices: makeChoices(c.droite, pool),
        expected: [c.droite],
        comparator: "mcq_exact" as const,
        explanation: exp(
          definition,
          methode,
          `${c.gauche} → ${c.droite}.`,
          `${c.droite.charAt(0).toUpperCase()}${c.droite.slice(1)}.`,
        ),
      };
    },
  };
}

export const lectureCulture4eBank: TutorBankItemV4[] = [
  gabarit(
    "4e_comp_sens_global_tpl_1",
    "4e_comp_sens_global",
    "lecture_comprehension",
    ENSEMBLE,
    TOUS_ENSEMBLES,
    "Que fait ce texte, d'ensemble ?",
    2,
    "Ne cherche pas de quoi il parle : cherche ce qu'il FAIT.",
    "Avant d'interpréter, on reconnait le geste du texte : raconter, décrire, faire un portrait, faire parler, faire entendre une pensée, ou argumenter. Six gestes, et ils ne se lisent pas de la même façon.",
    "Demande-toi si quelque chose se passe. Si oui, dans quel ordre ? Si non, qu'est-ce qui occupe la place — un être, un lieu, une parole, une pensée, une idée à défendre ?",
    ["4e", "lecture", "comprehension", "template"],
  ),
  gabarit(
    "4e_comp_indices_tpl_1",
    "4e_comp_indices",
    "lecture_comprehension",
    INDICES,
    TOUS_INDICES,
    "Sur quelle sorte d'indice ta lecture s'appuie-t-elle ?",
    3,
    "Ce n'est pas ce que tu comprends qu'on demande, c'est d'où tu le tires.",
    "Une interprétation ne vaut que par ce qui la soutient dans le texte. Les indices se rangent en familles : le champ lexical, les notations physiques, le temps des verbes, les images, la ponctuation, et les mots qui portent un jugement.",
    "Une fois que tu as compris quelque chose, reviens en arrière et mets le doigt sur ce qui te l'a fait comprendre. Puis nomme la famille : c'est elle qui te resservira sur le texte suivant.",
    ["4e", "lecture", "indices", "template"],
  ),
  gabarit(
    "4e_comp_implicite_tpl_1",
    "4e_comp_implicite",
    "lecture_comprehension",
    IMPLICITE,
    TOUS_IMPLICITES,
    "Que fait vraiment cette phrase ?",
    3,
    "Personne ne dit ce qu'il veut dire. Demande-toi ce que ça produit.",
    "Comprendre l'implicite, c'est entendre ce qui n'est pas écrit. Une question peut accuser, une politesse peut refuser, un compliment peut menacer, un éloge peut se moquer, et une défense peut trahir.",
    "Remplace la phrase par ce qu'elle produirait si on la disait franchement. Si le remplacement change tout, c'est que le sens était ailleurs que dans les mots.",
    ["4e", "lecture", "implicite", "template"],
  ),
  gabarit(
    "4e_comp_apprecier_tpl_1",
    "4e_comp_apprecier",
    "lecture_comprehension",
    APPRECIER,
    TOUTES_APPRECIATIONS,
    "Que vaut cette réaction de lecteur ?",
    3,
    "Aimer ou ne pas aimer n'est pas la question : la question est « sur quoi ? ».",
    "Le programme ne demande pas d'aimer, il demande de justifier. Une appréciation fondée s'appuie sur un fait du texte. Un avis sans appui n'en donne aucun ; un résumé raconte au lieu de juger ; un jugement sur soi parle du lecteur, pas du livre.",
    "Cherche le « parce que ». S'il renvoie à quelque chose que le texte fait, c'est fondé — même si l'avis est un rejet. S'il renvoie à tes gouts, c'est de toi qu'il parle.",
    ["4e", "lecture", "appreciation", "template"],
  ),
  gabarit(
    "4e_voix_preparer_tpl_1",
    "4e_voix_preparer",
    "lecture_voix_haute",
    PREPARER,
    TOUTES_PREPARATIONS,
    "Que marques-tu sur ta feuille avant de lire ?",
    2,
    "Préparer, ce n'est pas relire : c'est annoter.",
    "Une lecture à voix haute se prépare le crayon à la main. On marque les respirations, les changements de voix, les mots à détacher, les contrastes de rythme — et l'on vérifie à l'avance ce qu'on ne sait pas prononcer.",
    "Lis le texte une fois en silence, puis une fois en marquant. Ce qui n'est pas marqué ne s'entendra pas : la voix ne devine rien toute seule.",
    ["4e", "lecture", "voix-haute", "template"],
  ),
  gabarit(
    "4e_voix_expressive_tpl_1",
    "4e_voix_expressive",
    "lecture_voix_haute",
    EXPRESSIVE,
    TOUTES_EXPRESSIONS,
    "Que fait ta voix à cet endroit ?",
    2,
    "C'est la ponctuation qui commande, pas ton humeur.",
    "La ponctuation et la typographie sont les indications de jeu du texte écrit. Le point de suspension suspend, l'interrogation monte, l'exclamation porte, l'incise baisse, l'italique appuie, et les phrases brèves accélèrent.",
    "Avant de mettre le ton, regarde les signes. Ils te disent où respirer, où monter, où baisser et où accélérer — l'expression vient après, elle ne se décide pas au hasard.",
    ["4e", "lecture", "voix-haute", "ponctuation", "template"],
  ),
  gabarit(
    "4e_voix_reciter_tpl_1",
    "4e_voix_reciter",
    "lecture_voix_haute",
    RECITER,
    TOUTES_RECITATIONS,
    "Que fais-tu ?",
    2,
    "Une récitation ne se juge pas sur les accidents, mais sur la façon de les traverser.",
    "Réciter avec fluidité, ce n'est pas réciter sans faute : c'est ne pas s'arrêter. On repart au vers suivant plutôt que de reprendre au début, on corrige un mot une seule fois, et l'on apprend par blocs, plusieurs jours à l'avance.",
    "Prépare tes accidents comme tu prépares ton texte : décide À L'AVANCE ce que tu feras si tu perds le fil. C'est ce qui fait la différence entre un trou et un arrêt.",
    ["4e", "lecture", "recitation", "template"],
  ),
  gabarit(
    "4e_culture_genres_tpl_1",
    "4e_culture_genres",
    "culture_litteraire",
    GENRES,
    TOUS_GENRES,
    "De quel genre ce texte relève-t-il ?",
    2,
    "Regarde la mise en page avant de lire une seule phrase.",
    "Chaque genre a une forme qui se voit : les vers et les rimes du poème, les noms en tête de réplique du théâtre, la longueur du roman, la brièveté et la chute de la nouvelle, la morale de la fable, le « je » du récit de soi.",
    "Pose-toi deux questions dans l'ordre : comment le texte est-il disposé sur la page, et qui parle ? Les deux réponses suffisent presque toujours.",
    ["4e", "culture", "genres", "template"],
  ),
  gabarit(
    "4e_culture_contexte_tpl_1",
    "4e_culture_contexte",
    "culture_litteraire",
    CONTEXTE,
    TOUS_CONTEXTES,
    "Que ce détail permet-il de conclure ?",
    3,
    "Un objet, une durée, un usage : ce sont eux qui datent, pas les sentiments.",
    "Situer une œuvre, ce n'est pas réciter une date : c'est raisonner sur un détail. Les objets techniques, les durées de trajet et de courrier, les usages sociaux datent un texte. Les sentiments, eux, ne datent rien.",
    "Demande-toi ce qui serait impossible à une autre époque. Si rien ne l'est — un amour, une dispute, un deuil —, alors le détail ne permet pas de conclure, et c'est aussi une réponse.",
    ["4e", "culture", "contexte", "template"],
  ),
  gabarit(
    "4e_culture_reseau_tpl_1",
    "4e_culture_reseau",
    "culture_litteraire",
    RESEAU,
    TOUS_RESEAUX,
    "Quel lien relie ces deux œuvres ?",
    3,
    "Parler du même sujet n'est pas un lien : c'est une coïncidence.",
    "Mettre en réseau, c'est nommer ce qui relie. Un même motif traité par deux arts, une reprise qui déplace, une opposition qui contredit, un même genre à deux époques : quatre liens réels — et un cinquième cas, où il n'y en a pas.",
    "Demande-toi ce que la comparaison ferait APPARAITRE. Si elle ne fait rien apparaitre, c'est que le rapprochement tenait au seul sujet, et il ne vaut rien.",
    ["4e", "culture", "reseau", "template"],
  ),
  gabarit(
    "4e_culture_trace_tpl_1",
    "4e_culture_trace",
    "culture_litteraire",
    TRACE,
    TOUTES_TRACES,
    "Que vaut cette note de carnet de lecture ?",
    2,
    "Demande-toi si, dans six mois, cette note te rendra encore service.",
    "Une trace de lecture vaut par ce qu'elle permettra de retrouver plus tard. La bonne trace situe un moment ET dit pourquoi il compte. Le résumé, l'avis sans appui, la liste de mots isolés et la citation nue ne servent plus dès qu'on a refermé le livre.",
    "Écris toujours deux choses ensemble : OÙ c'est, et POURQUOI tu le notes. L'une sans l'autre ne se relit pas.",
    ["4e", "culture", "carnet-de-lecture", "template"],
  ),
];
