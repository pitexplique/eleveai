// lib/tutor-v4/questionBank/3e/francais/socle-grammaire-conjugaison.bank.ts
//
// DES GÉNÉRATEURS POUR LE SOCLE — grammaire et conjugaison, sept micros.
// Écrit le 25/08/2026, après la réparation des dix-huit micros transversales.
//
// ⛔⛔ POURQUOI CE FICHIER, ET POURQUOI AUCUN VÉRIFICATEUR NE LE DEMANDAIT.
// Frédéric, le 25/08 : « IL FAUT DES GÉNÉRATEURS. Un élève doit pouvoir rester
// sans les mêmes questions pendant des minutes. »
//
// `verifier-variete.mjs` additionne les énoncés FIXES et les énoncés GÉNÉRÉS, et
// fixe son seuil sur le total. Les sept micros de ce fichier passaient donc au
// vert — 13 à 15 énoncés chacune. Mais en séparant les deux colonnes :
//
//     3e_gram_accords          5 générés  ·  7 fixes
//     3e_conj_identifier       5 générés  ·  8 fixes
//     3e_gram_constituants     6 générés  ·  8 fixes
//     3e_gram_fonctions        6 générés  ·  8 fixes
//     3e_gram_oral_ecrit       6 générés  ·  7 fixes
//     3e_conj_composer         7 générés  ·  8 fixes
//     3e_conj_employer         7 générés  ·  7 fixes
//
// ⭐ UN ITEM `fixed` NE SE RENOUVELLE JAMAIS. Il compte pour une question, et
// l'élève la revoit à chaque tirage. Ces micros vivaient donc réellement de cinq
// à sept énoncés, la couche figée masquant le vide : à une question par minute,
// l'élève avait fait le tour en six minutes et recommençait. Le total mesurait
// une quantité, pas un RENOUVELLEMENT.
//
// Les cinq à sept énoncés générés venaient tous de `buildCycle4FrancaisBank`,
// partagés par les trois niveaux du cycle — d'où leur niveau, souvent celui de
// la 6e (« Les enfants jouent dans la cour »), dans une banque de 3e.
//
// Ce fichier ajoute UN gabarit par micro, sur une table de quinze cas de niveau
// terminal. Les questions figées restent : elles servent au guide de survie et
// aux épreuves imprimables, et deux items valent mieux qu'un pour le mode
// complet du coach (`allowSingleItem: false`).
//
// ⛔ CE QU'IL NE FAUT PAS REDIRE. Les quinze cas de chaque table sont neufs :
// aucun ne reprend une question figée existante, et aucun ne marche sur les
// banques de 3e déjà écrites — `orthographe-grammaticale.bank.ts` tient les
// chaines d'accord et le participe, `conjugaison.bank.ts` tient le subjonctif
// littéraire, la concordance et les valeurs modales, `phrase-complexe.bank.ts`
// tient l'analyse propositionnelle.
//
// ⛔⛔ LA BONNE RÉPONSE NE DOIT PAS ÊTRE LA PLUS LONGUE. Le contrôle est
// `verifier-devinabilite-runtime.ts`, et ce qu'il mesure est l'écart avec le
// PLUS LONG LEURRE — pas l'étendue du pool. Un pool peut s'étaler tant que ses
// deux plus longues lignes se tiennent.
//
// ⭐ DEUX, TROIS OU QUATRE PROPOSITIONS, quatre au maximum (Frédéric, 25/08).
//
// ⚠️ ORTHOGRAPHE : accents partout, majuscules comprises ; apostrophe droite
// (U+0027) ; rectifications de 1990 — « connaitre », « parait », « cout ».

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

/** Cas à pool partagé : les bonnes réponses des autres cas font les leurres. */
type Cas = { readonly gauche: string; readonly droite: string };

/** Cas à leurres propres — indispensable dès que la réponse est une FORME
 *  verbale ou une graphie : les formes d'un autre verbe ne piègent personne. */
type CasSeul = { readonly gauche: string; readonly droite: string; readonly leurres: readonly string[] };

/* =============================================================================
   1. CE QUE LE GROUPE PÈSE DANS LA PHRASE      → 3e_gram_constituants
   ---------------------------------------------------------------------------
   « Identifier les constituants de la phrase. » Les six énoncés générés du
   cycle demandaient de RECONNAITRE un groupe déjà nommé. L'attendu de fin de
   cycle est plus dur : savoir ce que le groupe PÈSE — s'il se supprime, s'il se
   déplace, si le verbe le réclame. C'est le test qui sert ensuite à tout, de la
   ponctuation à l'analyse de la phrase complexe.
   ⚠️ Le groupe est TOUJOURS entre crochets : sans cela, la question aurait deux
   réponses défendables dans la moitié des cas.
   ========================================================================== */

const CONSTITUANTS: readonly Cas[] = [
  { gauche: "« [Dès le lendemain], la commune ferma le sentier. »", droite: "un complément de phrase : on peut le supprimer et le déplacer" },
  { gauche: "« La commune ferma le sentier [sans prévenir personne]. »", droite: "un complément de phrase : on peut le supprimer et le déplacer" },
  { gauche: "« [Malgré les avertissements], ils montèrent quand même. »", droite: "un complément de phrase : on peut le supprimer et le déplacer" },
  { gauche: "« Le maire annonça [la fermeture du sentier]. »", droite: "un complément essentiel : le verbe ne peut pas s'en passer" },
  { gauche: "« Les habitants se souviennent [de cette nuit-là]. »", droite: "un complément essentiel : le verbe ne peut pas s'en passer" },
  { gauche: "« Le journaliste se rendit [sur les lieux]. »", droite: "un complément essentiel : le verbe ne peut pas s'en passer" },
  { gauche: "« [Le rapport remis la veille] accablait la direction. »", droite: "le groupe sujet : c'est lui qui commande l'accord du verbe" },
  { gauche: "« [Ceux qui avaient signé] furent convoqués les premiers. »", droite: "le groupe sujet : c'est lui qui commande l'accord du verbe" },
  { gauche: "« Sur la table traînait [une lettre non décachetée]. »", droite: "le groupe sujet : c'est lui qui commande l'accord du verbe" },
  { gauche: "« Le rapport [de la commission] fut publié en juillet. »", droite: "une expansion du nom : elle appartient au groupe nominal" },
  { gauche: "« Les élèves [qui avaient révisé] réussirent l'épreuve. »", droite: "une expansion du nom : elle appartient au groupe nominal" },
  { gauche: "« Une décision [lourde de conséquences] fut annoncée. »", droite: "une expansion du nom : elle appartient au groupe nominal" },
  { gauche: "« Cette mesure parait [difficilement applicable]. »", droite: "un attribut du sujet : un verbe d'état le relie au sujet" },
  { gauche: "« Le témoin demeura [muet jusqu'à la fin]. »", droite: "un attribut du sujet : un verbe d'état le relie au sujet" },
  { gauche: "« Elle est devenue [la première avocate du barreau]. »", droite: "un attribut du sujet : un verbe d'état le relie au sujet" },
];

const TOUS_CONSTITUANTS: readonly string[] = [...new Set(CONSTITUANTS.map((c) => c.droite))];

/* =============================================================================
   2. LA FONCTION, PAS LA CLASSE                → 3e_gram_fonctions
   ---------------------------------------------------------------------------
   « Repérer sujet, verbe, compléments et groupes. » Les cas retenus sont ceux
   où la place trompe : le complément déplacé en tête, le sujet séparé de son
   verbe par une relative, le complément d'agent, l'attribut du COD.
   ⛔ Aucun cas ne reprend les huit questions figées de la micro.
   ========================================================================== */

const FONCTIONS: readonly Cas[] = [
  { gauche: "« Ce dossier, la commission l'a examiné hier. » — « l' »", droite: "complément d'objet direct : il suit le verbe sans préposition" },
  { gauche: "« Le silence, je ne l'ai pas compris tout de suite. » — « l' »", droite: "complément d'objet direct : il suit le verbe sans préposition" },
  { gauche: "« La loi qu'ils ont votée déçoit. » — « qu' »", droite: "complément d'objet direct : il suit le verbe sans préposition" },
  { gauche: "« Elle se méfiait de ses propres souvenirs. » — « de ses souvenirs »", droite: "complément d'objet indirect : une préposition le relie au verbe" },
  { gauche: "« Personne ne songea à le prévenir. » — « à le prévenir »", droite: "complément d'objet indirect : une préposition le relie au verbe" },
  { gauche: "« Il tenait à cette maison plus qu'à tout. » — « à cette maison »", droite: "complément d'objet indirect : une préposition le relie au verbe" },
  { gauche: "« Le témoignage demeure irremplaçable. » — « irremplaçable »", droite: "attribut du sujet : un verbe d'état vient le rattacher au sujet" },
  { gauche: "« Elle fut élue à l'unanimité. » — « élue »", droite: "attribut du sujet : un verbe d'état vient le rattacher au sujet" },
  { gauche: "« Ces archives restent introuvables. » — « introuvables »", droite: "attribut du sujet : un verbe d'état vient le rattacher au sujet" },
  { gauche: "« Faute de preuves, l'affaire fut classée. » — « Faute de preuves »", droite: "complément circonstanciel : il situe, et rien ne le réclame" },
  { gauche: "« Il répondit sans lever les yeux. » — « sans lever les yeux »", droite: "complément circonstanciel : il situe, et rien ne le réclame" },
  { gauche: "« Le débat reprit après une longue pause. » — « après une pause »", droite: "complément circonstanciel : il situe, et rien ne le réclame" },
  { gauche: "« Les archives du tribunal ont brulé. » — « du tribunal »", droite: "complément du nom : il complète un nom, et non pas le verbe" },
  { gauche: "« Le sentier a été fermé par la commune. » — « par la commune »", droite: "complément d'agent : il dit qui agit, dans une phrase passive" },
  { gauche: "« Elle fut retenue par une averse. » — « par une averse »", droite: "complément d'agent : il dit qui agit, dans une phrase passive" },
];

const TOUTES_FONCTIONS: readonly string[] = [...new Set(FONCTIONS.map((c) => c.droite))];

/* =============================================================================
   3. EXPLIQUER SON ACCORD                      → 3e_gram_accords
   ---------------------------------------------------------------------------
   « Accorder les mots dans la phrase ET EXPLIQUER SES CHOIX » — c'est le second
   verbe du programme, et c'est lui qu'on interroge ici. La phrase est donnée
   DÉJÀ CORRECTE : la question porte sur la raison. Un élève qui accorde bien
   sans savoir pourquoi se trompe dès que la phrase change de forme.
   ⛔ Les chaines d'accord du programme de 3e — participe suivi d'un infinitif,
   pronominaux, homophones — sont dans `orthographe-grammaticale.bank.ts`. Ici,
   ce sont les accords que la PLACE rend difficiles.
   ========================================================================== */

const ACCORDS: readonly Cas[] = [
  { gauche: "« La série de mesures annoncées hier déçoit. » Pourquoi « déçoit » ?", droite: "l'accord se fait avec le noyau du groupe, non avec son complément" },
  { gauche: "« Le bruit des vagues berçait le quartier. » Pourquoi « berçait » ?", droite: "l'accord se fait avec le noyau du groupe, non avec son complément" },
  { gauche: "« La liste des candidats retenus a été affichée. » Pourquoi « a » ?", droite: "l'accord se fait avec le noyau du groupe, non avec son complément" },
  { gauche: "« Sur la table dormaient trois vieux dossiers. » Pourquoi « dormaient » ?", droite: "le sujet est inversé, mais c'est bien lui qui commande l'accord" },
  { gauche: "« Ainsi tombèrent les dernières objections. » Pourquoi « tombèrent » ?", droite: "le sujet est inversé, mais c'est bien lui qui commande l'accord" },
  { gauche: "« Peut-être viendront-ils demain. » Pourquoi « viendront » ?", droite: "le sujet est inversé, mais c'est bien lui qui commande l'accord" },
  { gauche: "« Le maire et son adjoint ont démissionné. » Pourquoi « ont » ?", droite: "les sujets coordonnés font un pluriel, même s'ils sont singuliers" },
  { gauche: "« Ni le froid ni la pluie ne les arrêtèrent. » Pourquoi « arrêtèrent » ?", droite: "les sujets coordonnés font un pluriel, même s'ils sont singuliers" },
  { gauche: "« Sa colère et sa peur se lisaient sur son visage. » Pourquoi « lisaient » ?", droite: "les sujets coordonnés font un pluriel, même s'ils sont singuliers" },
  { gauche: "« Ces archives semblent incomplètes. » Pourquoi « incomplètes » ?", droite: "l'attribut s'accorde avec le sujet, à travers le verbe d'état" },
  { gauche: "« Les deux témoins parurent sincères. » Pourquoi « sincères » ?", droite: "l'attribut s'accorde avec le sujet, à travers le verbe d'état" },
  { gauche: "« La décision demeure contestable. » Pourquoi « contestable » ?", droite: "l'attribut s'accorde avec le sujet, à travers le verbe d'état" },
  { gauche: "« Une patience et un courage exemplaires. » Pourquoi « exemplaires » ?", droite: "l'adjectif se rapporte aux deux noms : il passe donc au pluriel" },
  { gauche: "« Un texte et une image saisissants. » Pourquoi « saisissants » ?", droite: "l'adjectif se rapporte aux deux noms : il passe donc au pluriel" },
  { gauche: "« Une ravine et un sentier escarpés. » Pourquoi « escarpés » ?", droite: "l'adjectif se rapporte aux deux noms : il passe donc au pluriel" },
];

const TOUS_ACCORDS: readonly string[] = [...new Set(ACCORDS.map((c) => c.droite))];

/* =============================================================================
   4. LA MARQUE D'ORAL, NOMMÉE                  → 3e_gram_oral_ecrit
   ---------------------------------------------------------------------------
   « Distinguer usages de l'oral et de l'écrit. » Les six énoncés générés
   demandaient de RÉÉCRIRE (« À l'écrit soigné, “J'sais pas” s'écrit… »). On
   demande ici de NOMMER la marque : c'est ce qui se transfère à une phrase
   qu'on n'a jamais vue, et c'est ce qu'il faut savoir faire sur sa propre copie.
   ⛔ Aucun cas ne reprend une phrase des sept questions figées de la micro.
   ========================================================================== */

const ORAL_ECRIT: readonly Cas[] = [
  { gauche: "« J'ai pas eu le temps de relire. »", droite: "la négation est incomplète : il manque le « ne » de l'écrit" },
  { gauche: "« On comprend rien à ce texte. »", droite: "la négation est incomplète : il manque le « ne » de l'écrit" },
  { gauche: "« Personne a réagi à l'annonce. »", droite: "la négation est incomplète : il manque le « ne » de l'écrit" },
  { gauche: "« Le narrateur, il change d'avis au chapitre trois. »", droite: "le sujet est repris par un pronom : c'est une reprise orale" },
  { gauche: "« Cette décision, elle a surpris tout le monde. »", droite: "le sujet est repris par un pronom : c'est une reprise orale" },
  { gauche: "« Mon voisin, lui, il n'a rien voulu signer. »", droite: "le sujet est repris par un pronom : c'est une reprise orale" },
  { gauche: "« Tu penses quoi de cette fin ? »", droite: "la question se passe de l'inversion et de l'« est-ce que »" },
  { gauche: "« Il part quand, exactement ? »", droite: "la question se passe de l'inversion et de l'« est-ce que »" },
  { gauche: "« Vous avez lu le rapport ou pas ? »", droite: "la question se passe de l'inversion et de l'« est-ce que »" },
  { gauche: "« Y a rien qui prouve le contraire. »", droite: "un mot est avalé : la syllabe tombe, et l'écrit la rétablit" },
  { gauche: "« T'as vu ce qu'il a écrit ? »", droite: "un mot est avalé : la syllabe tombe, et l'écrit la rétablit" },
  { gauche: "« Faut relire avant de rendre. »", droite: "un mot est avalé : la syllabe tombe, et l'écrit la rétablit" },
  { gauche: "« C'est de cela dont je voulais parler. »", droite: "la construction est doublée : deux mots disent la même chose" },
  { gauche: "« Voilà la raison pour laquelle qu'il est parti. »", droite: "la construction est doublée : deux mots disent la même chose" },
  { gauche: "« C'est à lui à qui je pensais. »", droite: "la construction est doublée : deux mots disent la même chose" },
];

const TOUS_ORAUX: readonly string[] = [...new Set(ORAL_ECRIT.map((c) => c.droite))];

/* =============================================================================
   5. LA FORME QUI SE RESSEMBLE                 → 3e_conj_identifier
   ---------------------------------------------------------------------------
   « Identifier temps, mode, personne et radical. » Les cinq énoncés générés
   nommaient des formes isolées et sans piège (« Nous chanterons à la fête »).
   Ce qui se joue en 3e, ce sont les HOMOGRAPHES : « nous chantions » est un
   imparfait ou un subjonctif selon ce qui précède, « je serai » et « je serais »
   ne diffèrent que d'une lettre, et le passé simple d'un verbe en -re ressemble
   à son subjonctif imparfait.
   ⚠️ Chaque énoncé porte donc son CONTEXTE : la forme seule ne se tranche pas.
   ========================================================================== */

const IDENTIFIER: readonly Cas[] = [
  { gauche: "« Il vainquit sans peine son adversaire. » — « vainquit »", droite: "le passé simple de l'indicatif : le fait est achevé, il fait avancer" },
  { gauche: "« Elle parut sur le seuil, puis se tut. » — « parut »", droite: "le passé simple de l'indicatif : le fait est achevé, il fait avancer" },
  { gauche: "« Le silence tomba d'un coup. » — « tomba »", droite: "le passé simple de l'indicatif : le fait est achevé, il fait avancer" },
  { gauche: "« Il fallait qu'il vainquît sa peur. » — « vainquît »", droite: "l'imparfait du subjonctif : il dépend d'un verbe à un temps passé" },
  { gauche: "« Elle exigea qu'il parût devant elle. » — « parût »", droite: "l'imparfait du subjonctif : il dépend d'un verbe à un temps passé" },
  { gauche: "« Nous chantions à tue-tête sur la route. » — « chantions »", droite: "l'imparfait de l'indicatif : le fait dure, ou bien il se répète" },
  { gauche: "« Chaque été, nous partions avant l'aube. » — « partions »", droite: "l'imparfait de l'indicatif : le fait dure, ou bien il se répète" },
  { gauche: "« Il voulait que nous chantions avec lui. » — « chantions »", droite: "le présent du subjonctif : il dépend d'un verbe à un temps présent" },
  { gauche: "« Je doute que nous partions à l'heure. » — « partions »", droite: "le présent du subjonctif : il dépend d'un verbe à un temps présent" },
  { gauche: "« Il faut que tu prennes une décision. » — « prennes »", droite: "le présent du subjonctif : il dépend d'un verbe à un temps présent" },
  { gauche: "« Je serai là dès la première heure. » — « serai »", droite: "le futur simple de l'indicatif : le fait n'est pas encore arrivé" },
  { gauche: "« Nous saurons la réponse avant lundi. » — « saurons »", droite: "le futur simple de l'indicatif : le fait n'est pas encore arrivé" },
  { gauche: "« Je serais venu si j'avais su. » — « serais venu »", droite: "le conditionnel présent ou passé : le fait dépend d'une condition" },
  { gauche: "« Nous saurions déjà s'il avait parlé. » — « saurions »", droite: "le conditionnel présent ou passé : le fait dépend d'une condition" },
  { gauche: "« Elle aurait accepté, dans d'autres circonstances. » — « aurait accepté »", droite: "le conditionnel présent ou passé : le fait dépend d'une condition" },
];

const TOUS_IDENTIFIES: readonly string[] = [...new Set(IDENTIFIER.map((c) => c.droite))];

/* =============================================================================
   6. LA FORME ATTENDUE                         → 3e_conj_composer
   ---------------------------------------------------------------------------
   « Composer et conjuguer les formes verbales attendues. »
   ⚠️⚠️ ICI, LES LEURRES NE PEUVENT PAS ÊTRE PARTAGÉS. Une forme d'un autre
   verbe ne piège personne : le seul leurre utile est une AUTRE FORME DU MÊME
   VERBE. Chaque cas porte donc les siennes (`CasSeul`), et elles sont choisies
   de longueur voisine — c'est ce qui garde la bonne réponse indevinable.
   ⛔ Aucun cas où l'usage hésite. « Elle exigea qu'il vînt » se dit aussi
   « qu'il vienne » depuis longtemps : un QCM ne peut pas trancher cela, et les
   deux formes seraient justes. Les cas retenus n'ont qu'une réponse.
   ========================================================================== */

const COMPOSER: readonly CasSeul[] = [
  { gauche: "« Je doute qu'il ___ la vérité. » (dire)", droite: "dise", leurres: ["dit", "dira", "disait"] },
  { gauche: "« Bien qu'il ___ tort, il persiste. » (avoir)", droite: "ait", leurres: ["a", "aura", "avait"] },
  { gauche: "« Il faudra que tu ___ ton choix. » (faire)", droite: "fasses", leurres: ["fais", "feras", "ferais"] },
  { gauche: "« Pourvu qu'elle ___ à temps ! » (arriver)", droite: "arrive", leurres: ["arrivera", "arriverait", "arrivait"] },
  { gauche: "« On ne pense pas qu'elle ___ menti. » (avoir)", droite: "ait", leurres: ["a", "avait", "aurait"] },
  { gauche: "« Le rapport ___ par la commission hier. » (remettre, passé composé)", droite: "a été remis", leurres: ["est remis", "avait remis", "sera remis"] },
  { gauche: "« Le texte ___ écrit bien avant sa parution. » (être, plus-que-parfait)", droite: "avait été", leurres: ["a été", "était", "aura été"] },
  { gauche: "« Si nous l'avions su, nous ___ autrement. » (agir)", droite: "aurions agi", leurres: ["agirions", "avions agi", "aurons agi"] },
  { gauche: "« Nous ___ terminé avant la nuit. » (avoir, futur antérieur)", droite: "aurons", leurres: ["avons", "aurions", "avions"] },
  { gauche: "« Dès qu'il ___ la porte, le silence tomba. » (fermer, passé antérieur)", droite: "eut fermé", leurres: ["a fermé", "avait fermé", "eût fermé"] },
  { gauche: "« À peine ___-il sorti que la pluie tomba. » (être)", droite: "fut", leurres: ["est", "était", "serait"] },
  { gauche: "« Il parle comme s'il ___ tout compris. » (avoir)", droite: "avait", leurres: ["a", "aurait", "eût"] },
  { gauche: "« Il agit comme s'il ___ le seul concerné. » (être)", droite: "était", leurres: ["est", "serait", "fût"] },
  { gauche: "« Elle craignait qu'on ne la ___ pas. » (croire)", droite: "croie", leurres: ["croit", "croira", "croirait"] },
  { gauche: "« Je souhaiterais que vous ___ ce point. » (préciser)", droite: "précisiez", leurres: ["précisez", "préciserez", "préciseriez"] },
];

/* =============================================================================
   7. LE TEMPS QUE L'INTENTION APPELLE          → 3e_conj_employer
   ---------------------------------------------------------------------------
   « Employer les temps et modes selon le sens. » Les sept énoncés générés
   partaient d'une phrase et demandaient ce que le temps y faisait. On part ici
   de l'INTENTION et l'on demande le temps : c'est le geste de celui qui écrit,
   et c'est le plus difficile des deux.
   ⛔ Les valeurs modales — conditionnel de politesse ou d'information non
   confirmée, futur d'ordre atténué, subjonctif de souhait — sont dans
   `conjugaison.bank.ts`, micro `3e_conj_valeurs_modales`. Ici, ce sont les
   temps du RÉCIT et leur emboitement.
   ========================================================================== */

const EMPLOYER: readonly Cas[] = [
  { gauche: "Tu veux qu'une action surgisse et fasse basculer ton récit.", droite: "le passé simple : l'action surgit et fait avancer le récit" },
  { gauche: "Après trois pages de description, il faut enfin que cela bouge.", droite: "le passé simple : l'action surgit et fait avancer le récit" },
  { gauche: "Tu racontes le coup de téléphone qui a tout changé.", droite: "le passé simple : l'action surgit et fait avancer le récit" },
  { gauche: "Tu poses le décor avant que l'histoire ne commence vraiment.", droite: "l'imparfait : l'arrière-plan, la durée, ce qui se répétait" },
  { gauche: "Tu dis ce que le personnage faisait tous les jours à cette époque.", droite: "l'imparfait : l'arrière-plan, la durée, ce qui se répétait" },
  { gauche: "Tu décris une pluie qui tombait déjà quand la scène a commencé.", droite: "l'imparfait : l'arrière-plan, la durée, ce qui se répétait" },
  { gauche: "Tu dois dire ce qui s'était passé AVANT la scène que tu racontes.", droite: "le plus-que-parfait : un fait antérieur à un autre fait passé" },
  { gauche: "Ton personnage se souvient d'une faute commise des années plus tôt.", droite: "le plus-que-parfait : un fait antérieur à un autre fait passé" },
  { gauche: "Tu expliques pourquoi la porte était déjà ouverte à son arrivée.", droite: "le plus-que-parfait : un fait antérieur à un autre fait passé" },
  { gauche: "Tu dis qu'une chose sera finie au moment où une autre commencera.", droite: "le futur antérieur : un fait achevé avant un autre fait futur" },
  { gauche: "« Il partira dès qu'il ___ la lettre. » Que faut-il pour « recevoir » ?", droite: "le futur antérieur : un fait achevé avant un autre fait futur" },
  { gauche: "Tu annonces que tout sera réglé avant la fin de la semaine.", droite: "le futur antérieur : un fait achevé avant un autre fait futur" },
  { gauche: "Tu veux qu'une scène ancienne se joue sous les yeux du lecteur.", droite: "le présent de narration : la scène passée se joue devant nous" },
  { gauche: "Tu racontes une bataille d'il y a deux siècles comme si l'on y était.", droite: "le présent de narration : la scène passée se joue devant nous" },
  { gauche: "Ton récit autobiographique quitte soudain le passé simple.", droite: "le présent de narration : la scène passée se joue devant nous" },
];

const TOUS_EMPLOIS: readonly string[] = [...new Set(EMPLOYER.map((c) => c.droite))];

/* ========================================================================== */

function base(
  id: string,
  microId: string,
  notionId: string,
  difficulty: 2 | 3 | 4,
  hint: string,
  tags: readonly string[],
) {
  return {
    kind: "template" as const,
    id,
    niveau: "3e" as const,
    matiere: "francais" as const,
    notionId,
    microId,
    difficulty,
    theme: "neutral" as const,
    hint,
    tags: [...tags],
  };
}

/** Gabarit à pool partagé. */
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
    ...base(id, microId, notionId, difficulty, hint, tags),
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

/** Gabarit à leurres propres — pour les formes verbales et les graphies. */
function gabaritSeul(
  id: string,
  microId: string,
  notionId: string,
  table: readonly CasSeul[],
  question: string,
  difficulty: 2 | 3 | 4,
  hint: string,
  definition: string,
  methode: string,
  tags: readonly string[],
): TutorBankItemV4 {
  return {
    ...base(id, microId, notionId, difficulty, hint, tags),
    generate: () => {
      const c = randomChoice(table);
      return {
        text: `${c.gauche}\n\n${question}`,
        format: "qcm" as const,
        choices: makeChoices(c.droite, c.leurres),
        expected: [c.droite],
        comparator: "mcq_exact" as const,
        explanation: exp(
          definition,
          methode,
          `${c.gauche} → « ${c.droite} ».`,
          `La forme attendue est « ${c.droite} ».`,
        ),
      };
    },
  };
}

export const socleGrammaireConjugaison3eBank: TutorBankItemV4[] = [
  gabarit(
    "3e_gram_constituants_tpl_2",
    "3e_gram_constituants",
    "grammaire_phrase",
    CONSTITUANTS,
    TOUS_CONSTITUANTS,
    "Que pèse le groupe entre crochets ?",
    3,
    "Fais deux essais : supprime-le, puis déplace-le. Sa réponse est dans ce qui reste.",
    "Un constituant se reconnait à ce qu'il supporte. Le complément de phrase se supprime et se déplace ; le complément essentiel est réclamé par le verbe ; le groupe sujet commande l'accord ; l'expansion appartient au nom ; l'attribut passe par un verbe d'état.",
    "Supprime le groupe : si la phrase tient encore, il n'est pas essentiel. Déplace-le : s'il accepte la tête de phrase, c'est un complément de phrase. Les deux tests ensemble suffisent presque toujours.",
    ["3e", "grammaire", "constituants", "template"],
  ),
  gabarit(
    "3e_gram_fonctions_tpl_2",
    "3e_gram_fonctions",
    "grammaire_phrase",
    FONCTIONS,
    TOUTES_FONCTIONS,
    "Quelle est la fonction du groupe souligné ?",
    3,
    "Une fonction se dit toujours PAR RAPPORT À un autre mot. Demande-toi : par rapport à quoi ?",
    "La fonction dit le lien d'un groupe avec un autre mot de la phrase. Le complément d'objet dépend du verbe, directement ou par une préposition ; l'attribut passe par un verbe d'état ; le circonstanciel n'est réclamé par rien ; le complément du nom dépend d'un nom ; le complément d'agent n'existe qu'au passif.",
    "Trouve d'abord le verbe. Demande ensuite si le groupe dépend de lui, d'un nom, ou de personne. Attention à la place : un complément d'objet peut être en tête de phrase, repris par un pronom.",
    ["3e", "grammaire", "fonctions", "template"],
  ),
  gabarit(
    "3e_gram_accords_tpl_2",
    "3e_gram_accords",
    "grammaire_phrase",
    ACCORDS,
    TOUS_ACCORDS,
    "Pourquoi cet accord est-il correct ?",
    3,
    "La phrase est juste. Ce qu'on demande, c'est la raison — c'est elle qui resservira.",
    "Le programme demande d'accorder ET d'expliquer ses choix. Les accords difficiles sont ceux que la place brouille : le noyau séparé de son verbe par un complément, le sujet inversé, les sujets coordonnés, l'attribut relié par un verbe d'état, l'adjectif qui porte sur deux noms.",
    "Pose la question « qui est-ce qui ? » à haute voix, et n'accepte pour réponse qu'un NOM NOYAU — jamais le complément qui le suit. Le reste de l'accord découle de ce nom-là.",
    ["3e", "grammaire", "accords", "template"],
  ),
  gabarit(
    "3e_gram_oral_ecrit_tpl_2",
    "3e_gram_oral_ecrit",
    "grammaire_phrase",
    ORAL_ECRIT,
    TOUS_ORAUX,
    "Quelle marque d'oral cette phrase porte-t-elle ?",
    2,
    "Ne la corrige pas : nomme ce qui, dedans, ne s'écrit pas.",
    "L'oral n'est pas du mauvais français : c'est un autre usage, avec ses marques régulières. La négation réduite au seul « pas », la reprise du sujet par un pronom, la question sans inversion, la syllabe avalée, et la construction doublée sont les cinq plus fréquentes.",
    "Lis la phrase à voix haute : elle passera très bien. Puis cherche ce qu'un correcteur soulignerait. C'est en NOMMANT la marque qu'on apprend à la voir dans sa propre copie.",
    ["3e", "grammaire", "oral-ecrit", "template"],
  ),
  gabarit(
    "3e_conj_identifier_tpl_2",
    "3e_conj_identifier",
    "conjugaison_formes",
    IDENTIFIER,
    TOUS_IDENTIFIES,
    "À quel temps et à quel mode cette forme est-elle ?",
    3,
    "La forme seule ne suffit pas : regarde ce qui la précède.",
    "Beaucoup de formes s'écrivent pareil et ne sont pas les mêmes. « Nous chantions » est un imparfait après rien, un subjonctif après « il voulait que ». « Je serai » est un futur, « je serais » un conditionnel. Le passé simple d'un verbe en -re ressemble à son subjonctif imparfait.",
    "Cherche le mot qui commande : une conjonction « que », un verbe de volonté ou de doute, une condition en « si ». C'est lui qui décide du mode ; le temps se lit ensuite sur la terminaison.",
    ["3e", "conjugaison", "identification", "template"],
  ),
  gabaritSeul(
    "3e_conj_composer_tpl_2",
    "3e_conj_composer",
    "conjugaison_formes",
    COMPOSER,
    "Quelle forme du verbe convient ?",
    3,
    "Trouve d'abord le MODE que la phrase impose. Le temps vient après.",
    "Composer une forme verbale, c'est répondre à deux questions dans l'ordre : quel mode la construction impose-t-elle, puis quel temps le sens demande-t-il. « Bien que » impose le subjonctif ; « comme si » interdit le conditionnel ; « dès que » au passé simple appelle le passé antérieur.",
    "Repère le mot qui commande — « que », « bien que », « comme si », « dès que », « si ». Chacun impose un mode, et certains interdisent une forme qu'on écrirait spontanément.",
    ["3e", "conjugaison", "formes", "template"],
  ),
  gabarit(
    "3e_conj_employer_tpl_2",
    "3e_conj_employer",
    "conjugaison_valeurs",
    EMPLOYER,
    TOUS_EMPLOIS,
    "Quel temps emploies-tu ?",
    3,
    "On ne te donne pas une phrase à analyser : on te donne une intention à servir.",
    "Dans un récit, chaque temps a un emploi. Le passé simple fait avancer l'action ; l'imparfait tient l'arrière-plan et la répétition ; le plus-que-parfait dit ce qui précède ; le futur antérieur dit ce qui sera fini avant autre chose ; le présent de narration rapproche une scène ancienne.",
    "Demande-toi si ce que tu écris FAIT AVANCER l'histoire ou si cela l'entoure. Avancer, c'est le passé simple ; entourer, c'est l'imparfait. Les deux autres se repèrent à l'antériorité.",
    ["3e", "conjugaison", "valeurs", "recit", "template"],
  ),
];
