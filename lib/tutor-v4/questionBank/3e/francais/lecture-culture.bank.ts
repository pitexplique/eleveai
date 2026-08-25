// lib/tutor-v4/questionBank/3e/francais/lecture-culture.bank.ts
//
// LIRE, METTRE EN VOIX, SITUER — les dix micros de 3e que personne n'avait
// retravaillées. Écrit le 25/08/2026, sur le modèle de la 4e, jamais sur son
// contenu.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020 — celui qui s'applique ENCORE à la
// 3e, et pour trois ans : le nouveau texte ne l'atteindra qu'en septembre 2028.
//
// ⛔ POURQUOI CE FICHIER (mesuré le 25/08/2026). `verifier-variete.mjs` fixe le
// seuil à DIX énoncés distincts par micro — la règle de Frédéric du 15/08 :
// « un élève ne doit pas retomber sur la même question en dix minutes ». Sur
// les 69 micros de 3e, dix-huit étaient dessous, et c'étaient EXACTEMENT les
// mêmes cinq notions transversales qu'en 4e : lecture, mise en voix, culture,
// écriture, oral. Aucune banque dédiée ne leur avait jamais été écrite ; elles
// vivaient du seul générateur `buildCycle4FrancaisBank`, dont les pools font
// cinq ou six énoncés PARTAGÉS par les trois niveaux du cycle.
//
// ⭐ LA SIGNATURE À RECONNAITRE : « 4 items, dont 1 fixe ». Six énoncés, trois
// gabarits qui piochent dedans : l'élève a tout vu en six minutes.
//
// ⛔⛔ CE FICHIER NE RECOPIE PAS LA 4e. Mêmes micros, mais la 3e est le niveau
// TERMINAL du cycle et l'année du brevet : ce sont les « attendus de fin de
// cycle » qui valent. Le programme y attache l'argumentation, la thèse et les
// arguments, l'ironie, les modalisateurs, la concordance des temps. Là où la 4e
// demandait « que fait ce texte ? », la 3e demande ce qu'un relevé PROUVE, ce
// qu'une phrase PRÉSUPPOSE, ce qu'un lecteur fait de l'objection qu'on lui
// oppose. Un élève de 3e qui a fait la 4e ici ne retrouve aucun de ses cas.
//
// ⛔⛔ TOUTES LES RÉPONSES D'UN MÊME POOL FONT LA MÊME LONGUEUR, à moins de
// huit caractères près. Sinon un élève qui ne sait rien répond juste en prenant
// la ligne la plus longue. On ne raccourcit pas la bonne réponse : on rend les
// leurres aussi précis qu'elle. Contrôle : `verifier-devinabilite-runtime.ts`
// — et c'est bien la variante `-runtime.ts` qu'il faut en français, le `.mjs`
// ne sait pas charger un `.ts` et rend un feu vert qui ne porte sur rien.
//
// ⭐ DEUX, TROIS OU QUATRE PROPOSITIONS (règle de Frédéric, 23/08 et 25/08 :
// « il peut y en avoir à deux propositions, d'autres à trois, d'autres à quatre
// — IXL a souvent deux propositions »). `makeChoices` tire sa taille dans
// `TAILLES` à chaque service : la variété vaut mieux que l'uniformité, et
// quatre est un maximum, jamais une norme.
//
// ⛔ ON INTERROGE LES NOTIONS, JAMAIS UNE ŒUVRE. Les livres sont choisis par le
// professeur : aucun cas ne nomme un titre ni un auteur. Chaque situation tient
// en une ligne, et l'élève répond sans avoir le texte sous les yeux, parce que
// ce qui s'interroge est un GESTE de lecteur, pas un souvenir.
//
// ⚠️ ORTHOGRAPHE : accents partout, majuscules comprises ; apostrophe droite
// (U+0027) ; rectifications de 1990, que le programme prend pour référence —
// « connaitre », « reconnaitre », « parait », « chaine », « gout », « cout ».

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

/** Deux, trois ou quatre lignes — jamais plus, et jamais toujours la même. */
const TAILLES: readonly number[] = [2, 3, 3, 4, 4, 4];

function makeChoices(correct: string, wrongs: readonly string[]) {
  const taille = randomChoice(TAILLES);
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, taille - 1);
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
   1. CE QUE VAUT UN RELEVÉ                     → 3e_comp_indices
   ---------------------------------------------------------------------------
   « Relever des indices précis dans le texte. » En 4e, on demandait de quelle
   FAMILLE d'indice venait une lecture. En 3e, l'attendu de fin de cycle est
   plus dur : l'élève doit savoir ce que vaut ce qu'il écrit dans sa copie. Un
   relevé, une interprétation, une paraphrase et un souvenir de cours se
   ressemblent sur la feuille — et un seul des quatre se défend au brevet.
   ⭐ La paraphrase est le défaut le plus fréquent, et le plus invisible : on
   croit citer alors qu'on redit.
   ========================================================================== */

const RELEVE: readonly Cas[] = [
  { gauche: "Tu écris : « le narrateur emploie “parait-il” trois fois en dix lignes ».", droite: "un fait du texte : on peut le montrer du doigt, il ne se discute pas" },
  { gauche: "Tu écris : « la même subordonnée de concession ouvre les trois paragraphes ».", droite: "un fait du texte : on peut le montrer du doigt, il ne se discute pas" },
  { gauche: "Tu écris : « le texte passe du “nous” au “on” à partir de la ligne douze ».", droite: "un fait du texte : on peut le montrer du doigt, il ne se discute pas" },
  { gauche: "Tu écris : « ce “parait-il” montre que le narrateur se méfie de la rumeur ».", droite: "une interprétation : elle se défend, mais le texte ne la dit jamais" },
  { gauche: "Tu écris : « l'auteur veut que le lecteur se sente coupable à la fin ».", droite: "une interprétation : elle se défend, mais le texte ne la dit jamais" },
  { gauche: "Tu écris : « ce changement de pronom traduit la solitude du personnage ».", droite: "une interprétation : elle se défend, mais le texte ne la dit jamais" },
  { gauche: "Le texte dit « la salle se vida » ; tu écris : « la salle s'est vidée ».", droite: "une paraphrase : on redit la phrase et l'on ne relève rien du tout" },
  { gauche: "Le texte dit « nul ne protesta » ; tu écris : « personne n'a protesté ».", droite: "une paraphrase : on redit la phrase et l'on ne relève rien du tout" },
  { gauche: "Le texte dit « il refusa net » ; tu écris : « il a refusé tout de suite ».", droite: "une paraphrase : on redit la phrase et l'on ne relève rien du tout" },
  { gauche: "Tu écris : « à cette époque, on ne pouvait pas écrire cela librement ».", droite: "un ajout venu d'ailleurs : rien dans la page ne permet de l'avancer" },
  { gauche: "Tu écris : « l'auteur avait perdu son frère l'année d'avant, on le sait ».", droite: "un ajout venu d'ailleurs : rien dans la page ne permet de l'avancer" },
  { gauche: "Tu écris : « ce genre de scène se passait tous les jours dans les usines ».", droite: "un ajout venu d'ailleurs : rien dans la page ne permet de l'avancer" },
  { gauche: "Tu écris : « ce passage est le plus émouvant de tout le chapitre ».", droite: "un jugement de gout : on note ce qu'on ressent, non ce qui est écrit" },
  { gauche: "Tu écris : « la description est trop longue et elle casse le rythme ».", droite: "un jugement de gout : on note ce qu'on ressent, non ce qui est écrit" },
  { gauche: "Tu écris : « on s'ennuie ferme pendant les deux premiers paragraphes ».", droite: "un jugement de gout : on note ce qu'on ressent, non ce qui est écrit" },
];

const TOUS_RELEVES: readonly string[] = [...new Set(RELEVE.map((c) => c.droite))];

/* =============================================================================
   2. CE QU'UNE PHRASE FAIT PASSER               → 3e_comp_implicite
   ---------------------------------------------------------------------------
   « Comprendre l'implicite et justifier son interprétation. » En 4e, l'implicite
   était celui de la conversation : un reproche, un refus poli, une menace. En
   3e, c'est celui de l'ARGUMENTATION — le programme y attache l'année entière.
   Le présupposé, le sous-entendu, la généralisation, la fausse évidence et la
   question orientée sont les cinq façons de faire admettre sans démontrer.
   ⚠️ Chaque cas se comprend sans contexte : c'est la condition pour qu'un QCM
   sur l'implicite ait UNE bonne réponse et non trois défendables.
   ========================================================================== */

const IMPLICITE: readonly Cas[] = [
  { gauche: "« Quand cesserez-vous de nous mentir ? » demande le journaliste au ministre.", droite: "un présupposé : la phrase le tient pour acquis avant même de le dire" },
  { gauche: "On lit dans l'article : « Il a encore changé d'avis cette semaine. »", droite: "un présupposé : la phrase le tient pour acquis avant même de le dire" },
  { gauche: "« Depuis qu'il s'est mis à travailler, ses notes remontent. »", droite: "un présupposé : la phrase le tient pour acquis avant même de le dire" },
  { gauche: "Le voisin croise l'élève à dix heures et lâche : « Pas cours, ce matin ? »", droite: "un sous-entendu : il nait de la situation et peut se nier après coup" },
  { gauche: "Devant le devoir rendu, le professeur observe : « Ce n'est pas ton écriture. »", droite: "un sous-entendu : il nait de la situation et peut se nier après coup" },
  { gauche: "À l'entrée du magasin, l'agent demande : « Le sac, vous le gardez à la main ? »", droite: "un sous-entendu : il nait de la situation et peut se nier après coup" },
  { gauche: "« Deux joueurs ont triché : ce sport est pourri de haut en bas. »", droite: "une généralisation : un cas isolé est donné pour la règle générale" },
  { gauche: "« Mon voisin fraude ; tout le monde fraude dans ce quartier. »", droite: "une généralisation : un cas isolé est donné pour la règle générale" },
  { gauche: "« Un article s'est trompé la semaine dernière, donc la presse ment. »", droite: "une généralisation : un cas isolé est donné pour la règle générale" },
  { gauche: "« Chacun sait bien que la lecture recule chez les jeunes. »", droite: "une fausse évidence : on donne pour acquis ce qui reste à démontrer" },
  { gauche: "« Il va de soi qu'un écran finit par abimer la mémoire. »", droite: "une fausse évidence : on donne pour acquis ce qui reste à démontrer" },
  { gauche: "« Personne ne songerait à contester que la ville était plus sûre avant. »", droite: "une fausse évidence : on donne pour acquis ce qui reste à démontrer" },
  { gauche: "Le sondage demande : « Êtes-vous pour ou contre cette réforme dangereuse ? »", droite: "une question orientée : la réponse est déjà glissée dans la question" },
  { gauche: "Le titre demande : « Faut-il continuer à gaspiller l'argent de la commune ? »", droite: "une question orientée : la réponse est déjà glissée dans la question" },
  { gauche: "L'enquête demande : « Préférez-vous la sécurité ou le désordre actuel ? »", droite: "une question orientée : la réponse est déjà glissée dans la question" },
];

const TOUS_IMPLICITES: readonly string[] = [...new Set(IMPLICITE.map((c) => c.droite))];

/* =============================================================================
   3. RÉVISER SON APPRÉCIATION                   → 3e_comp_apprecier
   ---------------------------------------------------------------------------
   « Formuler une appréciation fondée sur le texte » — et, dit le programme,
   « justifier ET RÉVISER » son appréciation. C'est le second verbe qu'on
   n'interroge jamais, et c'est celui du niveau terminal : un avis se juge à ce
   qu'il devient quand on lui oppose quelque chose.
   ⭐ Réviser n'est pas céder. Deux réponses distinguent le lecteur qui change
   parce qu'un fait du texte l'y oblige de celui qui abandonne pour avoir la paix.
   ========================================================================== */

const APPRECIER: readonly Cas[] = [
  { gauche: "« Tu as raison : la dernière page reprend l'image du début, je n'avais pas vu. »", droite: "il révise son avis : un fait du texte l'a fait changer, et il dit lequel" },
  { gauche: "« J'avais tort : le narrateur écrit “je crois”, il n'affirme donc rien. »", droite: "il révise son avis : un fait du texte l'a fait changer, et il dit lequel" },
  { gauche: "« D'accord : le mot revient trois fois, ce n'est pas un hasard, je retire. »", droite: "il révise son avis : un fait du texte l'a fait changer, et il dit lequel" },
  { gauche: "« Non, moi je trouve toujours que la fin de ce texte est ratée. »", droite: "il campe sur sa position : il répète son avis sans jamais rien y ajouter" },
  { gauche: "« Je maintiens exactement ce que j'ai dit depuis le début. »", droite: "il campe sur sa position : il répète son avis sans jamais rien y ajouter" },
  { gauche: "« Tu peux dire ce que tu veux, mon avis ne bougera pas d'un pouce. »", droite: "il campe sur sa position : il répète son avis sans jamais rien y ajouter" },
  { gauche: "« Bon, si tu le dis, je veux bien, on passe à autre chose. »", droite: "il cède sans raison : il se range à l'autre avis pour clore la discussion" },
  { gauche: "« D'accord, d'accord, tu as raison, arrêtons là tout de suite. »", droite: "il cède sans raison : il se range à l'autre avis pour clore la discussion" },
  { gauche: "« Comme tu veux, je ne vais pas me disputer pour un livre. »", droite: "il cède sans raison : il se range à l'autre avis pour clore la discussion" },
  { gauche: "« La professeure a dit que c'était une critique de la société, donc c'en est une. »", droite: "il tranche par l'autorité : ce n'est plus le texte qui décide, c'est un nom" },
  { gauche: "« C'est écrit dans le corrigé, il n'y a donc pas à en discuter. »", droite: "il tranche par l'autorité : ce n'est plus le texte qui décide, c'est un nom" },
  { gauche: "« L'auteur a expliqué son livre lui-même dans un entretien à la radio. »", droite: "il tranche par l'autorité : ce n'est plus le texte qui décide, c'est un nom" },
  { gauche: "« De toute façon, plus personne ne lit ce genre de livre aujourd'hui. »", droite: "il déplace la question : il répond à autre chose que ce qu'on lui oppose" },
  { gauche: "« Tu me parles de la fin, moi je te parle du personnage principal. »", droite: "il déplace la question : il répond à autre chose que ce qu'on lui oppose" },
  { gauche: "« On n'est quand même pas là pour discuter d'une virgule. »", droite: "il déplace la question : il répond à autre chose que ce qu'on lui oppose" },
];

const TOUTES_APPRECIATIONS: readonly string[] = [...new Set(APPRECIER.map((c) => c.droite))];

/* =============================================================================
   4. ANNOTER UN TEXTE QUI ARGUMENTE             → 3e_voix_preparer
   ---------------------------------------------------------------------------
   « Préparer la lecture orale d'un texte. » En 4e, on annotait les respirations
   et les changements de voix. En 3e, les textes lus à voix haute sont ceux des
   questionnements de l'année — dénoncer, agir dans la cité — et ce sont la
   thèse, l'ironie, les connecteurs, la concession et l'apostrophe qu'il faut
   marquer AVANT de lire. Rien de tout cela ne s'entend si rien n'est marqué.
   ========================================================================== */

const PREPARER: readonly Cas[] = [
  { gauche: "Une phrase, au milieu, résume ce que tout le texte cherche à faire admettre.", droite: "tu marques la thèse : elle doit s'entendre plus nettement que le reste" },
  { gauche: "La dernière ligne dit en dix mots ce que les trois pages voulaient prouver.", droite: "tu marques la thèse : elle doit s'entendre plus nettement que le reste" },
  { gauche: "Le premier paragraphe annonce ce que l'auteur entend démontrer ensuite.", droite: "tu marques la thèse : elle doit s'entendre plus nettement que le reste" },
  { gauche: "L'auteur félicite longuement ceux qu'il passe le reste du texte à démolir.", droite: "tu marques l'ironie : le ton devra contredire ce que les mots disent" },
  { gauche: "Le texte parle des « bienfaits » de la misère, les guillemets compris.", droite: "tu marques l'ironie : le ton devra contredire ce que les mots disent" },
  { gauche: "Le narrateur admire une décision qu'il vient d'appeler une sottise.", droite: "tu marques l'ironie : le ton devra contredire ce que les mots disent" },
  { gauche: "« Or », « donc » et « en revanche » ouvrent chacun des paragraphes.", droite: "tu marques les liens : ils font entendre la marche du raisonnement" },
  { gauche: "Le texte enchaine « d'abord », « ensuite » et « enfin » sur une même page.", droite: "tu marques les liens : ils font entendre la marche du raisonnement" },
  { gauche: "« Non seulement… mais encore » relie les deux moitiés du passage.", droite: "tu marques les liens : ils font entendre la marche du raisonnement" },
  { gauche: "L'auteur écrit « il est vrai que » avant de reprendre la main.", droite: "tu marques la concession : on doit entendre qu'elle n'est pas ton avis" },
  { gauche: "Un paragraphe entier donne l'avis adverse, avant un « pourtant ».", droite: "tu marques la concession : on doit entendre qu'elle n'est pas ton avis" },
  { gauche: "Le texte accorde deux lignes à ce qu'il combat, puis revient à sa thèse.", droite: "tu marques la concession : on doit entendre qu'elle n'est pas ton avis" },
  { gauche: "Le texte s'interrompt sur : « Vous qui lisez, y avez-vous seulement pensé ? »", droite: "tu marques l'adresse : la voix quitte le texte et va chercher la salle" },
  { gauche: "Une apostrophe appelle directement ceux qui gouvernent le pays.", droite: "tu marques l'adresse : la voix quitte le texte et va chercher la salle" },
  { gauche: "Le poème passe du « on » au « vous » à la dernière strophe.", droite: "tu marques l'adresse : la voix quitte le texte et va chercher la salle" },
];

const TOUTES_PREPARATIONS: readonly string[] = [...new Set(PREPARER.map((c) => c.droite))];

/* =============================================================================
   5. CE QUE LA VOIX DOIT FAIRE ENTENDRE         → 3e_voix_expressive
   ---------------------------------------------------------------------------
   « Utiliser voix, rythme, regard et ponctuation. » En 4e, c'est la ponctuation
   qui commandait. En 3e, c'est la LOGIQUE : le discours rapporté, le
   modalisateur, le retournement de la thèse et le connecteur doivent s'entendre,
   sinon le raisonnement se perd à la lecture.
   ⭐ Une réponse dit qu'il n'y a RIEN à marquer : sans elle, l'élève apprend
   qu'une voix doit toujours faire quelque chose, ce qui est faux et fatigant.
   ========================================================================== */

const EXPRESSIVE: readonly Cas[] = [
  { gauche: "La phrase enchâsse, entre guillemets, ce qu'un adversaire avait écrit.", droite: "tu détaches la citation : ces mots-là sont d'un autre, on doit l'entendre" },
  { gauche: "Le narrateur reprend mot pour mot une formule qu'il attribue à un autre.", droite: "tu détaches la citation : ces mots-là sont d'un autre, on doit l'entendre" },
  { gauche: "Le texte cite un slogan entier avant de le démonter ligne à ligne.", droite: "tu détaches la citation : ces mots-là sont d'un autre, on doit l'entendre" },
  { gauche: "La phrase glisse « il semblerait que » juste avant l'information.", droite: "tu marques le doute : un modalisateur ne se dit pas comme une certitude" },
  { gauche: "Le verbe passe au conditionnel : « le chantier couterait le double ».", droite: "tu marques le doute : un modalisateur ne se dit pas comme une certitude" },
  { gauche: "Le texte place « peut-être » au beau milieu de l'affirmation.", droite: "tu marques le doute : un modalisateur ne se dit pas comme une certitude" },
  { gauche: "Après deux pages d'éloge, un « mais » ouvre le dernier paragraphe.", droite: "tu fais entendre le retournement : la voix change là où la thèse bascule" },
  { gauche: "Le texte défend une idée, puis écrit : « J'ai longtemps cru cela. »", droite: "tu fais entendre le retournement : la voix change là où la thèse bascule" },
  { gauche: "La dernière strophe dit l'inverse des trois qui la précèdent.", droite: "tu fais entendre le retournement : la voix change là où la thèse bascule" },
  { gauche: "« Donc » ouvre la phrase qui conclut tout le paragraphe.", droite: "tu appuies le connecteur : c'est lui qui tient les deux idées ensemble" },
  { gauche: "« Or » sépare le constat de ce que l'auteur en tire aussitôt.", droite: "tu appuies le connecteur : c'est lui qui tient les deux idées ensemble" },
  { gauche: "« Parce que » relie l'affirmation à la raison qui la soutient.", droite: "tu appuies le connecteur : c'est lui qui tient les deux idées ensemble" },
  { gauche: "Une virgule sépare deux groupes de même longueur, sans rien marquer.", droite: "tu ne changes rien : rien dans cette phrase ne demande que la voix bouge" },
  { gauche: "Le paragraphe énumère trois faits de même importance, à la suite.", droite: "tu ne changes rien : rien dans cette phrase ne demande que la voix bouge" },
  { gauche: "La phrase est courte, affirmative, et rien ne s'y détache.", droite: "tu ne changes rien : rien dans cette phrase ne demande que la voix bouge" },
];

const TOUTES_EXPRESSIONS: readonly string[] = [...new Set(EXPRESSIVE.map((c) => c.droite))];

/* =============================================================================
   6. DIRE UN TEXTE LONG SANS LE CASSER          → 3e_voix_reciter
   ---------------------------------------------------------------------------
   « Réciter un texte en prose ou en vers avec fluidité. » En 4e, on préparait
   les accidents : le trou, le mot avalé, le trac. En 3e, ce qui se joue est la
   SYNTAXE : l'enjambement, la longue période, l'anaphore, la chute. Un élève
   qui s'arrête à chaque fin de vers récite juste et ne dit rien.
   ========================================================================== */

const RECITER: readonly Cas[] = [
  { gauche: "La phrase commence à la fin d'un vers et s'achève au milieu du suivant.", droite: "tu suis la phrase, pas le vers : l'enjambement ne se marque d'aucun arrêt" },
  { gauche: "Le verbe est au bout du vers, et son complément ouvre le vers d'après.", droite: "tu suis la phrase, pas le vers : l'enjambement ne se marque d'aucun arrêt" },
  { gauche: "Aucune ponctuation ne clôt le vers, et la phrase continue plus bas.", droite: "tu suis la phrase, pas le vers : l'enjambement ne se marque d'aucun arrêt" },
  { gauche: "Une seule phrase occupe huit vers avant d'atteindre son verbe principal.", droite: "tu tiens la longue période : une seule montée jusqu'à sa retombée finale" },
  { gauche: "Le paragraphe empile trois subordonnées avant d'arriver à la principale.", droite: "tu tiens la longue période : une seule montée jusqu'à sa retombée finale" },
  { gauche: "La phrase accumule les compléments et ne retombe qu'à la dernière ligne.", droite: "tu tiens la longue période : une seule montée jusqu'à sa retombée finale" },
  { gauche: "« Je vois » ouvre chacune des cinq phrases du passage.", droite: "tu gardes l'élan de la reprise : l'anaphore doit monter, et non lasser" },
  { gauche: "Le même groupe de mots revient au début de chaque strophe.", droite: "tu gardes l'élan de la reprise : l'anaphore doit monter, et non lasser" },
  { gauche: "Quatre phrases de suite commencent par la même conjonction.", droite: "tu gardes l'élan de la reprise : l'anaphore doit monter, et non lasser" },
  { gauche: "Le texte s'achève sur un mot d'une syllabe, après une longue phrase.", droite: "tu poses la chute : le dernier mot se dit plus lentement que les autres" },
  { gauche: "La dernière ligne tient en trois mots et renverse tout le reste.", droite: "tu poses la chute : le dernier mot se dit plus lentement que les autres" },
  { gauche: "Le poème finit sur un nom que rien, avant lui, n'annonçait.", droite: "tu poses la chute : le dernier mot se dit plus lentement que les autres" },
  { gauche: "Tu perds le fil au milieu d'une phrase que tu connaissais pourtant.", droite: "tu répares sans t'arrêter : tu reprends au groupe de sens, non au début" },
  { gauche: "Un mot te manque et tu t'en aperçois seulement deux vers plus loin.", droite: "tu répares sans t'arrêter : tu reprends au groupe de sens, non au début" },
  { gauche: "Ta mémoire s'arrête net sur le premier mot de la troisième strophe.", droite: "tu répares sans t'arrêter : tu reprends au groupe de sens, non au début" },
];

const TOUTES_RECITATIONS: readonly string[] = [...new Set(RECITER.map((c) => c.droite))];

/* =============================================================================
   7. LES FORMES DE L'ÉCRIT QUI COMBAT           → 3e_culture_genres
   ---------------------------------------------------------------------------
   « Reconnaitre genres littéraires et formes artistiques. » En 4e, on
   reconnaissait le poème, la nouvelle, la fable à leur mise en page. En 3e, les
   questionnements de l'année — dénoncer les travers de la société, agir dans la
   cité — font lire des textes que la 4e ne lit pas : l'apologue, l'essai, le
   pamphlet, le discours, la lettre ouverte. Ils se distinguent par LEUR
   SITUATION DE PAROLE, pas par leur disposition sur la page.
   ⛔ Aucun titre, aucun auteur : on reconnait une forme, on ne récite pas une
   liste d'œuvres.
   ========================================================================== */

const GENRES: readonly Cas[] = [
  { gauche: "Un récit de vingt lignes met en scène des animaux et se clôt sur une leçon.", droite: "un apologue : un récit bref et plaisant dont on doit tirer une leçon" },
  { gauche: "Un conte bref raconte un voyage dont il faut tirer une règle de conduite.", droite: "un apologue : un récit bref et plaisant dont on doit tirer une leçon" },
  { gauche: "Une histoire courte et divertissante sert à faire admettre une idée.", droite: "un apologue : un récit bref et plaisant dont on doit tirer une leçon" },
  { gauche: "L'auteur avance ses idées à la première personne, sans conclure vraiment.", droite: "un essai : l'auteur parle en son nom et cherche encore devant son lecteur" },
  { gauche: "Le texte pèse le pour et le contre et n'affirme rien de définitif.", droite: "un essai : l'auteur parle en son nom et cherche encore devant son lecteur" },
  { gauche: "L'auteur réfléchit devant nous et se reprend en cours de route.", droite: "un essai : l'auteur parle en son nom et cherche encore devant son lecteur" },
  { gauche: "Le texte accumule les images violentes et ne démontre presque rien.", droite: "un pamphlet : le texte attaque, et le ton l'emporte sur la démonstration" },
  { gauche: "Chaque phrase vise une personne, sans jamais donner un argument.", droite: "un pamphlet : le texte attaque, et le ton l'emporte sur la démonstration" },
  { gauche: "Le ton reste violent du début à la fin, et la démonstration est mince.", droite: "un pamphlet : le texte attaque, et le ton l'emporte sur la démonstration" },
  { gauche: "Le texte dit « Messieurs » et suppose des auditeurs assis en face.", droite: "un discours : un orateur s'adresse à un auditoire assemblé en face de lui" },
  { gauche: "Le texte parle à une assemblée réunie, et prévoit ses réactions.", droite: "un discours : un orateur s'adresse à un auditoire assemblé en face de lui" },
  { gauche: "L'orateur interpelle ceux qui l'écoutent et attend leur approbation.", droite: "un discours : un orateur s'adresse à un auditoire assemblé en face de lui" },
  { gauche: "Le texte s'adresse à un ministre nommé et parait dans un journal.", droite: "une lettre ouverte : elle vise un destinataire nommé et le public entier" },
  { gauche: "Un écrivain écrit à un chef d'État et fait publier sa lettre le lendemain.", droite: "une lettre ouverte : elle vise un destinataire nommé et le public entier" },
  { gauche: "Le texte est adressé à une personne précise, mais destiné à tous.", droite: "une lettre ouverte : elle vise un destinataire nommé et le public entier" },
];

const TOUS_GENRES: readonly string[] = [...new Set(GENRES.map((c) => c.droite))];

/* =============================================================================
   8. CE QUE LE CONTEXTE AUTORISE À CONCLURE     → 3e_culture_contexte
   ---------------------------------------------------------------------------
   « Situer une œuvre dans un contexte simple. » En 4e, on DATAIT un texte par
   un détail. En 3e, la question est celle de sa PORTÉE : la censure explique un
   détour, un combat gagné change un texte en document, une dénonciation qui vise
   un travers toujours vivant se lit encore, et un auteur qui signait risquait
   quelque chose.
   ⭐ Une réponse dit que le contexte n'y fait rien : elle empêche de transformer
   l'exercice en devinette historique.
   ========================================================================== */

const CONTEXTE: readonly Cas[] = [
  { gauche: "Le pays est imaginaire, et l'on emprisonnait alors pour bien moins que cela.", droite: "le détour vient de la censure : on ne pouvait pas nommer la cible tout haut" },
  { gauche: "L'auteur fait parler un voyageur venu d'ailleurs, sous un régime qui censure.", droite: "le détour vient de la censure : on ne pouvait pas nommer la cible tout haut" },
  { gauche: "La critique passe par des animaux, dans un temps où l'on ne disait rien.", droite: "le détour vient de la censure : on ne pouvait pas nommer la cible tout haut" },
  { gauche: "Le texte réclame que les enfants n'aillent plus travailler à l'usine.", droite: "le combat est gagné depuis : le texte se lit comme un document d'histoire" },
  { gauche: "Le texte demande que l'on cesse d'acheter et de vendre des êtres humains.", droite: "le combat est gagné depuis : le texte se lit comme un document d'histoire" },
  { gauche: "L'auteur exige que les filles entrent à l'école comme les garçons.", droite: "le combat est gagné depuis : le texte se lit comme un document d'histoire" },
  { gauche: "Le texte s'en prend à ceux qui jugent sans avoir ouvert le dossier.", droite: "le texte parle toujours : ce qu'il dénonce n'a pas disparu avec son époque" },
  { gauche: "L'auteur dénonce la peur du voisin qu'on ne connait pas.", droite: "le texte parle toujours : ce qu'il dénonce n'a pas disparu avec son époque" },
  { gauche: "Le texte se moque de ceux qui répètent ce qu'ils viennent d'entendre.", droite: "le texte parle toujours : ce qu'il dénonce n'a pas disparu avec son époque" },
  { gauche: "Le personnage perd son père et ne sait pas comment le dire aux siens.", droite: "le contexte n'y fait rien : ce détail vaut à toutes les époques et se lit seul" },
  { gauche: "Deux amis se brouillent et aucun des deux ne fait le premier pas.", droite: "le contexte n'y fait rien : ce détail vaut à toutes les époques et se lit seul" },
  { gauche: "Un enfant a peur du noir et ne l'avoue à personne chez lui.", droite: "le contexte n'y fait rien : ce détail vaut à toutes les époques et se lit seul" },
  { gauche: "L'auteur signe de son nom un texte qui accuse le pouvoir en place.", droite: "l'auteur y risquait beaucoup : le texte engage beaucoup plus qu'une opinion" },
  { gauche: "Le texte parait alors que son auteur vit déjà en exil depuis un an.", droite: "l'auteur y risquait beaucoup : le texte engage beaucoup plus qu'une opinion" },
  { gauche: "L'auteur passe en jugement l'année qui suit la parution du texte.", droite: "l'auteur y risquait beaucoup : le texte engage beaucoup plus qu'une opinion" },
];

const TOUS_CONTEXTES: readonly string[] = [...new Set(CONTEXTE.map((c) => c.droite))];

/* =============================================================================
   9. CE QUI RELIE DEUX TEXTES QUI COMBATTENT    → 3e_culture_reseau
   ---------------------------------------------------------------------------
   « Mettre en relation une œuvre avec d'autres textes ou arts. » En 4e, on
   nommait la nature du lien : motif, reprise, opposition, même genre. En 3e, le
   rapprochement sert l'argumentation : deux textes servent la même cause par des
   armes différentes, ou l'un retourne la forme de l'autre, ou la parenté n'est
   que de forme.
   ⭐ Une réponse dit que le lien vient de NOUS et non des textes : c'est
   l'erreur que le brevet sanctionne le plus souvent.
   ========================================================================== */

const RESEAU: readonly Cas[] = [
  { gauche: "L'un ridiculise les juges par une farce ; l'autre les accuse dans un discours.", droite: "une même cause, deux armes : l'un fait rire, l'autre accuse en plein jour" },
  { gauche: "Un texte moque la guerre par l'absurde ; l'autre en décrit les morts.", droite: "une même cause, deux armes : l'un fait rire, l'autre accuse en plein jour" },
  { gauche: "L'un tourne la misère en comédie ; l'autre la met sous nos yeux.", droite: "une même cause, deux armes : l'un fait rire, l'autre accuse en plein jour" },
  { gauche: "Un poète reprend la forme fixe d'un éloge pour écrire une condamnation.", droite: "une reprise qui retourne : le second emprunte la forme pour dire l'inverse" },
  { gauche: "Un auteur reprend le plan d'un discours connu et en inverse la conclusion.", droite: "une reprise qui retourne : le second emprunte la forme pour dire l'inverse" },
  { gauche: "Le second garde le refrain du premier et en renverse chaque strophe.", droite: "une reprise qui retourne : le second emprunte la forme pour dire l'inverse" },
  { gauche: "Les deux textes sont des sonnets, et ils n'ont rien d'autre en commun.", droite: "un écho de forme sans écho de sens : la ressemblance s'arrête à la façon" },
  { gauche: "Les deux commencent par la même formule et parlent de choses opposées.", droite: "un écho de forme sans écho de sens : la ressemblance s'arrête à la façon" },
  { gauche: "Les deux sont écrits en vers libres, sur des sujets sans rapport.", droite: "un écho de forme sans écho de sens : la ressemblance s'arrête à la façon" },
  { gauche: "Le second cite le premier en tête et dit vouloir continuer son combat.", droite: "une filiation revendiquée : le second se réclame du premier et le prolonge" },
  { gauche: "L'auteur récent se dit l'héritier de l'ancien et reprend sa cause.", droite: "une filiation revendiquée : le second se réclame du premier et le prolonge" },
  { gauche: "Le texte s'ouvre sur une dédicace à celui dont il poursuit l'œuvre.", droite: "une filiation revendiquée : le second se réclame du premier et le prolonge" },
  { gauche: "Les deux textes nous choquent aujourd'hui, pour des raisons différentes.", droite: "un faux rapprochement : c'est notre lecture d'aujourd'hui qui les relie" },
  { gauche: "Les deux nous paraissent modernes, alors que rien ne les rapproche.", droite: "un faux rapprochement : c'est notre lecture d'aujourd'hui qui les relie" },
  { gauche: "On les étudie ensemble parce qu'ils tombent dans le même chapitre.", droite: "un faux rapprochement : c'est notre lecture d'aujourd'hui qui les relie" },
];

const TOUS_RESEAUX: readonly string[] = [...new Set(RESEAU.map((c) => c.droite))];

/* =============================================================================
   10. UNE TRACE QUI RESSERVIRA                  → 3e_culture_trace
   ---------------------------------------------------------------------------
   « Garder une trace personnelle de lecture. » En 4e, on jugeait si la note
   situait un moment et disait pourquoi il comptait. En 3e, la trace prépare un
   ÉCRIT : un argument à venir, une question qu'on posera, un rapprochement entre
   deux lectures, une impression datée qu'on relira. Ce qui ne sert à rien, c'est
   le résumé — il redit le livre et ne garde rien de la lecture.
   ========================================================================== */

const TRACE: readonly Cas[] = [
  { gauche: "« p. 61 : jamais “je veux”, toujours “il faudrait” — sa peur est là. »", droite: "elle prépare un argument : le fait noté servira de preuve dans un devoir" },
  { gauche: "« Trois “peut-être” en une page : l'auteur n'assume pas ce qu'il avance. »", droite: "elle prépare un argument : le fait noté servira de preuve dans un devoir" },
  { gauche: "« p. 12 : “progrès” revient chaque fois qu'on détruit quelque chose. »", droite: "elle prépare un argument : le fait noté servira de preuve dans un devoir" },
  { gauche: "« Pourquoi le narrateur cesse-t-il de dire “je” au chapitre 5 ? À revoir. »", droite: "elle garde une question ouverte : ce qu'on n'a pas compris se note aussi" },
  { gauche: "« Je ne comprends pas pourquoi elle accepte : à demander en classe. »", droite: "elle garde une question ouverte : ce qu'on n'a pas compris se note aussi" },
  { gauche: "« Ce mot revient sans arrêt et je ne vois pas ce qu'il fait là. »", droite: "elle garde une question ouverte : ce qu'on n'a pas compris se note aussi" },
  { gauche: "« Même retournement final que dans le texte étudié en septembre. »", droite: "elle relie deux lectures : la trace vaut par le rapprochement qu'elle tient" },
  { gauche: "« La créature demande des comptes, comme celle du texte d'avant. »", droite: "elle relie deux lectures : la trace vaut par le rapprochement qu'elle tient" },
  { gauche: "« Cette lettre ouverte fait ce que faisait le discours lu hier. »", droite: "elle relie deux lectures : la trace vaut par le rapprochement qu'elle tient" },
  { gauche: "« 14 mars : j'ai trouvé cela froid ; à relire à la fin de l'année. »", droite: "elle date une impression : on saura plus tard ce qu'on pensait ce jour-là" },
  { gauche: "« Première lecture, dimanche : je n'ai rien compris au chapitre 2. »", droite: "elle date une impression : on saura plus tard ce qu'on pensait ce jour-là" },
  { gauche: "« Noté le 3 octobre : ce personnage m'agace et je ne sais pas dire pourquoi. »", droite: "elle date une impression : on saura plus tard ce qu'on pensait ce jour-là" },
  { gauche: "« Un homme part en voyage, puis il revient chez lui à la fin. »", droite: "elle ne servira à rien : elle redit le livre sans rien garder de la lecture" },
  { gauche: "« Chapitre 4 : la dispute. Chapitre 5 : le départ pour la ville. »", droite: "elle ne servira à rien : elle redit le livre sans rien garder de la lecture" },
  { gauche: "« Livre lu en entier, du premier jusqu'au dernier chapitre. »", droite: "elle ne servira à rien : elle redit le livre sans rien garder de la lecture" },
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
  difficulty: 2 | 3 | 4,
  hint: string,
  definition: string,
  methode: string,
  tags: readonly string[],
): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "3e",
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

export const lectureCulture3eBank: TutorBankItemV4[] = [
  gabarit(
    "3e_comp_indices_tpl_1",
    "3e_comp_indices",
    "lecture_comprehension",
    RELEVE,
    TOUS_RELEVES,
    "Que vaut ce relevé ?",
    3,
    "Demande-toi si un camarade pourrait te contredire. Un fait, non ; le reste, oui.",
    "Au brevet, un relevé n'a de valeur que s'il montre quelque chose de vérifiable dans le texte : un mot, un temps, une construction, une reprise. L'interprétation vient après, et se distingue du relevé ; la paraphrase, elle, ne relève rien.",
    "Avant d'écrire une ligne dans ta copie, demande-toi si tu pourrais l'entourer au crayon dans le texte. Si oui, c'est un relevé. Sinon, c'est déjà autre chose, et il faut le dire.",
    ["3e", "lecture", "indices", "brevet", "template"],
  ),
  gabarit(
    "3e_comp_implicite_tpl_1",
    "3e_comp_implicite",
    "lecture_comprehension",
    IMPLICITE,
    TOUS_IMPLICITES,
    "Que fait passer cette phrase sans le démontrer ?",
    3,
    "Cherche ce que la phrase te fait accepter avant même que tu répondes.",
    "Un texte qui argumente fait admettre beaucoup de choses sans les prouver. Le présupposé est déjà là dans la phrase ; le sous-entendu nait de la situation et se nie ; la généralisation prend un cas pour la règle ; la fausse évidence annonce comme acquis ce qui reste à démontrer ; la question orientée contient sa réponse.",
    "Essaie de répondre « non » à la phrase. Si le « non » laisse quelque chose debout que tu n'as jamais accepté, c'est là que se cache l'implicite.",
    ["3e", "lecture", "implicite", "argumentation", "template"],
  ),
  gabarit(
    "3e_comp_apprecier_tpl_1",
    "3e_comp_apprecier",
    "lecture_comprehension",
    APPRECIER,
    TOUTES_APPRECIATIONS,
    "Que fait ce lecteur de ce qu'on lui oppose ?",
    3,
    "Réviser n'est pas céder : c'est changer parce qu'un fait du texte l'exige.",
    "Le programme demande de justifier ET de réviser son appréciation. Réviser, c'est nommer le fait du texte qui a fait changer d'avis. Camper, céder pour avoir la paix, s'abriter derrière un nom ou répondre à côté ne sont pas des révisions.",
    "Quand on te contredit, cherche d'abord si l'on t'apporte un FAIT du texte. Si oui, ton avis doit bouger et tu dis lequel. Sinon, tu peux garder le tien — à condition de redire sur quoi il repose.",
    ["3e", "lecture", "appreciation", "template"],
  ),
  gabarit(
    "3e_voix_preparer_tpl_1",
    "3e_voix_preparer",
    "lecture_voix_haute",
    PREPARER,
    TOUTES_PREPARATIONS,
    "Que marques-tu sur ta feuille avant de lire ?",
    2,
    "Un raisonnement ne s'entend pas tout seul : ce qui n'est pas marqué se perdra.",
    "Lire à voix haute un texte qui argumente demande d'annoter autre chose que les respirations : la thèse, les passages ironiques, les connecteurs qui font la marche du raisonnement, la concession qui n'est pas l'avis de l'auteur, et l'adresse au public.",
    "Lis une fois en silence pour trouver ce que le texte veut faire admettre. Puis relis le crayon à la main : tu marques la thèse, et tout ce qui, autour d'elle, joue un autre rôle.",
    ["3e", "lecture", "voix-haute", "argumentation", "template"],
  ),
  gabarit(
    "3e_voix_expressive_tpl_1",
    "3e_voix_expressive",
    "lecture_voix_haute",
    EXPRESSIVE,
    TOUTES_EXPRESSIONS,
    "Que fait ta voix à cet endroit ?",
    3,
    "Ce n'est plus la ponctuation qui commande : c'est la logique du texte.",
    "À l'oral, la logique d'un texte doit s'entendre. On détache ce qui est cité pour qu'on sache que ces mots sont d'un autre ; on marque le doute quand un modalisateur l'installe ; on fait entendre le retournement d'une thèse ; on appuie le connecteur qui tient deux idées. Et parfois, il n'y a rien à faire.",
    "Repère d'abord qui parle et ce qu'il affirme vraiment. Une citation, un « il semblerait », un « mais », un « donc » : chacun demande un déplacement de la voix. Le reste se dit simplement.",
    ["3e", "lecture", "voix-haute", "modalisateurs", "template"],
  ),
  gabarit(
    "3e_voix_reciter_tpl_1",
    "3e_voix_reciter",
    "lecture_voix_haute",
    RECITER,
    TOUTES_RECITATIONS,
    "Que fais-tu en disant ce passage ?",
    3,
    "Le vers n'est pas une phrase : c'est la phrase qui décide où tu respires.",
    "Dire un texte long avec fluidité, c'est suivre la syntaxe et non la mise en page. L'enjambement se traverse sans arrêt ; la longue période se tient d'une seule montée ; l'anaphore doit garder son élan ; la chute se pose. Et l'accident se répare au groupe de sens, jamais au début.",
    "Marque au crayon la fin des PHRASES, pas la fin des vers. Puis dis le texte en respirant à tes marques : c'est là que le sens se met à passer.",
    ["3e", "lecture", "recitation", "template"],
  ),
  gabarit(
    "3e_culture_genres_tpl_1",
    "3e_culture_genres",
    "culture_litteraire",
    GENRES,
    TOUS_GENRES,
    "De quelle forme ce texte relève-t-il ?",
    3,
    "Demande-toi à qui l'on parle, et si l'on prouve ou si l'on frappe.",
    "Les formes de l'écrit qui combat se reconnaissent à leur situation de parole. L'apologue raconte pour faire tirer une leçon ; l'essai cherche en son nom propre ; le pamphlet attaque plus qu'il ne démontre ; le discours vise un auditoire présent ; la lettre ouverte vise un destinataire nommé devant tout le monde.",
    "Pose-toi deux questions dans l'ordre : à qui ce texte s'adresse-t-il, et par quel moyen veut-il l'emporter — un récit, une recherche, une attaque, une parole publique ?",
    ["3e", "culture", "genres", "argumentation", "template"],
  ),
  gabarit(
    "3e_culture_contexte_tpl_1",
    "3e_culture_contexte",
    "culture_litteraire",
    CONTEXTE,
    TOUS_CONTEXTES,
    "Que le contexte permet-il de conclure ?",
    3,
    "La bonne question n'est pas « quand ? », mais « qu'est-ce que cela change à ma lecture ? ».",
    "Situer une œuvre engagée, c'est mesurer sa portée. La censure explique les détours ; un combat gagné change le texte en document d'histoire ; un travers toujours vivant fait que le texte parle encore ; une signature dit ce que l'auteur risquait. Et certains détails ne dépendent d'aucune époque.",
    "Demande-toi ce que ce texte réclame, et si on le réclame encore. Puis demande-toi ce qu'il en coutait à l'auteur de l'écrire : les deux réponses ensemble donnent sa portée.",
    ["3e", "culture", "contexte", "template"],
  ),
  gabarit(
    "3e_culture_reseau_tpl_1",
    "3e_culture_reseau",
    "culture_litteraire",
    RESEAU,
    TOUS_RESEAUX,
    "Quel lien relie ces deux textes ?",
    3,
    "Un lien appartient aux textes. S'il vient de toi, ce n'est pas un lien.",
    "Mettre en réseau, c'est nommer ce qui relie deux textes et ce que la comparaison fait apparaitre. Deux armes au service d'une même cause, une reprise qui retourne une forme, une filiation revendiquée : trois liens réels. Un écho de pure forme n'en est pas un, et notre lecture d'aujourd'hui non plus.",
    "Demande-toi si l'un des deux auteurs aurait reconnu le lien. Si oui, c'est un lien du texte. Si le rapprochement ne tient qu'à ce que nous en pensons, dis-le : c'est aussi une réponse.",
    ["3e", "culture", "reseau", "template"],
  ),
  gabarit(
    "3e_culture_trace_tpl_1",
    "3e_culture_trace",
    "culture_litteraire",
    TRACE,
    TOUTES_TRACES,
    "Que vaut cette trace de lecture ?",
    2,
    "Demande-toi ce que cette note te permettra d'écrire dans six mois.",
    "En 3e, la trace de lecture prépare un écrit. Elle garde un fait qui servira de preuve, une question restée ouverte, un rapprochement entre deux lectures, ou une impression datée qu'on relira. Le résumé, lui, redit le livre et ne garde rien de la lecture.",
    "Note toujours en pensant à l'usage : « cela me servira à prouver quoi ? ». Une note qui ne répond pas à cette question ne se relit pas, même si elle est juste.",
    ["3e", "culture", "carnet-de-lecture", "template"],
  ),
];
