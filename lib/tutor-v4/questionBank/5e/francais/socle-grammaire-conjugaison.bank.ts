// lib/tutor-v4/questionBank/5e/francais/socle-grammaire-conjugaison.bank.ts
//
// GRAMMAIRE ET CONJUGAISON — les sept micros de socle de la 5e.
// Écrit le 25/08/2026.
//
// ⚠️⚠️ RÉFÉRENCE : annexe 1 du BO n° 10 du 5 mars 2026, rubriques « Cinquième ».
//
// ⛔⛔ POURQUOI. Frédéric, le 25/08 : « il faut des générateurs, un élève doit
// pouvoir rester sans les mêmes questions pendant des minutes. » Ces sept micros
// vivaient du seul `buildCycle4FrancaisBank` : cinq à six énoncés partagés par
// les trois niveaux du cycle.
//
// ⛔⛔ LA CONTRAINTE LA PLUS DURE DU CHANTIER EST ICI. La 5e a DÉJÀ vingt et une
// micros de langue avec leurs banques dédiées, et elles occupent presque tout :
//   · `grammaire-phrase.bank.ts` : COD et COI, attribut, circonstanciels, GN
//     étendu, juxtaposition et coordination, types et formes, ponctuation,
//     prépositions, pronoms, déterminants, phrase simple et complexe ;
//   · `orthographe-grammaticale.bank.ts` : chaine du GN, accord de l'attribut,
//     sujet-verbe éloigné, participe avec être et avec avoir, COD antéposé ;
//   · `conjugaison.bank.ts` : passé simple, conditionnel et impératif, temps
//     composés, temps antérieurs, radicaux variables, valeurs des temps ;
//   · `anaphore.bank.ts` : reprises pronominales et nominales.
// Les sept angles ci-dessous sont ceux qui RESTAIENT, et chaque en-tête dit
// lequel et pourquoi. C'est la raison pour laquelle ils ne ressemblent ni à la
// 4e ni à la 3e : ce ne sont pas les mêmes questions qui étaient libres.
//
// ⛔⛔ LA BONNE RÉPONSE NE DOIT PAS ÊTRE LA PLUS LONGUE, et comme un gabarit peut
// ne servir que DEUX propositions, c'est l'étendue ENTIÈRE du pool qui doit
// tenir sous huit caractères.
//
// ⭐ DEUX, TROIS OU QUATRE PROPOSITIONS, quatre au maximum (Frédéric, 25/08).
//
// ⚠️ ORTHOGRAPHE : accents partout, majuscules comprises ; apostrophe droite
// (U+0027) ; rectifications de 1990.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

const TAILLES: readonly number[] = [2, 3, 3, 4, 4, 4];

function makeChoices(correct: string, wrongs: readonly string[]) {
  const taille = randomChoice(TAILLES);
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, Math.max(1, taille - 1));
  return shuffle([correct, ...distracteurs]);
}

function exp(definition: string, methode: string, exemple: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Exemple : ${exemple}

Conclusion : ${conclusion}`;
}

type Cas = { readonly gauche: string; readonly droite: string };
/** Leurres propres au cas — obligatoire dès que la réponse est un MOT ou une
 *  FORME : les mots d'un autre cas ne piègent personne. */
type CasSeul = { readonly gauche: string; readonly droite: string; readonly leurres: readonly string[] };

/* =============================================================================
   1. CE QU'IL RESTE QUAND ON ENLÈVE TOUT       → 5e_gram_constituants
   ---------------------------------------------------------------------------
   « Identifier les constituants de la phrase. »
   ⛔ Nommer les groupes (nominal, verbal, prépositionnel, adverbial) est la
   question de la 4e ; peser un groupe est celle de la 3e ; et
   `5e_gram_simple_complexe` compte déjà les propositions. Restait la PHRASE
   MINIMALE : ce qui subsiste quand on retire tout ce qui peut l'être. C'est le
   test qui apprend ensuite à distinguer l'essentiel de l'accessoire.
   ========================================================================== */

const MINIMALE: readonly Cas[] = [
  { gauche: "« Ce matin-là, dans la cour, les enfants criaient très fort. »", droite: "le sujet et le verbe seuls : tout le reste peut s'enlever" },
  { gauche: "« Depuis trois jours, la pluie tombe sans arrêt sur la ville. »", droite: "le sujet et le verbe seuls : tout le reste peut s'enlever" },
  { gauche: "« Enfin, après des heures d'attente, le messager arriva. »", droite: "le sujet et le verbe seuls : tout le reste peut s'enlever" },
  { gauche: "« Hier soir, le gardien a fermé la porte du château. »", droite: "le sujet, le verbe et son objet, que le verbe ne lâche pas" },
  { gauche: "« Dans la salle basse, le roi prononça un long discours. »", droite: "le sujet, le verbe et son objet, que le verbe ne lâche pas" },
  { gauche: "« Sans se retourner, elle referma le coffre de bois. »", droite: "le sujet, le verbe et son objet, que le verbe ne lâche pas" },
  { gauche: "« Ce soir-là, le vieux marchand semblait vraiment inquiet. »", droite: "le sujet, le verbe et l'attribut, que le verbe d'état réclame" },
  { gauche: "« Après le combat, les deux hommes restèrent silencieux. »", droite: "le sujet, le verbe et l'attribut, que le verbe d'état réclame" },
  { gauche: "« Depuis l'aube, la mer paraissait étrangement calme. »", droite: "le sujet, le verbe et l'attribut, que le verbe d'état réclame" },
  { gauche: "« Chaque été, toute la famille se rendait sur cette île. »", droite: "le sujet, le verbe et le lieu, parce que le verbe l'exige" },
  { gauche: "« Sans un mot, le voyageur entra dans la vieille auberge. »", droite: "le sujet, le verbe et le lieu, parce que le verbe l'exige" },
  { gauche: "« À la nuit tombée, la troupe alla vers le pont de pierre. »", droite: "le sujet, le verbe et le lieu, parce que le verbe l'exige" },
  { gauche: "« Le gardien ferma la porte. »", droite: "la phrase entière : rien dedans ne peut être supprimé ici" },
  { gauche: "« La mer paraissait calme. »", droite: "la phrase entière : rien dedans ne peut être supprimé ici" },
  { gauche: "« Les enfants criaient. »", droite: "la phrase entière : rien dedans ne peut être supprimé ici" },
];

const TOUTES_MINIMALES: readonly string[] = [...new Set(MINIMALE.map((c) => c.droite))];

/* =============================================================================
   2. OÙ SE CACHE LE SUJET                      → 5e_gram_fonctions
   ---------------------------------------------------------------------------
   « Repérer SUJET, VERBE, compléments et groupes. » Les compléments ont chacun
   leur micro dédiée en 5e — COD et COI, attribut, circonstanciels. Restaient
   les deux premiers mots du libellé, et c'est tant mieux : un élève qui ne
   trouve pas le sujet ne peut accorder aucun verbe, et c'est la cause de la
   moitié des fautes de la classe.
   ⭐ Les cinq cas retenus sont ceux qui trompent : l'inversion, le groupe
   intercalé, le groupe long, l'impératif sans sujet exprimé.
   ========================================================================== */

const SUJET: readonly Cas[] = [
  { gauche: "« Ainsi parlèrent les envoyés du roi. » — sujet de « parlèrent » ?", droite: "il est placé après le verbe : la phrase est inversée" },
  { gauche: "« Sur la table dormait un vieux chat roux. » — sujet de « dormait » ?", droite: "il est placé après le verbe : la phrase est inversée" },
  { gauche: "« Peut-être viendra-t-il demain. » — sujet de « viendra » ?", droite: "il est placé après le verbe : la phrase est inversée" },
  { gauche: "« Le gardien, ce matin-là, ferma la porte. » — sujet de « ferma » ?", droite: "il est séparé de son verbe par un groupe intercalé" },
  { gauche: "« Les enfants, épuisés, rentrèrent enfin. » — sujet de « rentrèrent » ?", droite: "il est séparé de son verbe par un groupe intercalé" },
  { gauche: "« La mer, depuis trois jours, montait sans cesse. » — sujet ?", droite: "il est séparé de son verbe par un groupe intercalé" },
  { gauche: "« Il ferma la porte sans un mot. » — sujet de « ferma » ?", droite: "c'est un pronom, placé juste devant son propre verbe" },
  { gauche: "« Elles partirent avant le lever du jour. » — sujet de « partirent » ?", droite: "c'est un pronom, placé juste devant son propre verbe" },
  { gauche: "« Nous attendions depuis deux heures. » — sujet de « attendions » ?", droite: "c'est un pronom, placé juste devant son propre verbe" },
  { gauche: "« Les longues allées bordées de filaos menaient à la mer. » — sujet ?", droite: "c'est un groupe entier, et son noyau est un nom" },
  { gauche: "« Le bruit sourd des vagues berçait le quartier. » — sujet ?", droite: "c'est un groupe entier, et son noyau est un nom" },
  { gauche: "« La liste des candidats retenus fut affichée. » — sujet ?", droite: "c'est un groupe entier, et son noyau est un nom" },
  { gauche: "« Ferme la porte derrière toi. » — sujet de « ferme » ?", droite: "il n'est pas exprimé : le verbe est à l'impératif" },
  { gauche: "« Prenez la première rue à droite. » — sujet de « prenez » ?", droite: "il n'est pas exprimé : le verbe est à l'impératif" },
  { gauche: "« Écoutons ce qu'il a vraiment à nous dire. » — sujet ?", droite: "il n'est pas exprimé : le verbe est à l'impératif" },
];

const TOUS_SUJETS: readonly string[] = [...new Set(SUJET.map((c) => c.droite))];

/* =============================================================================
   3. CE MOT S'ACCORDE-T-IL, ET AVEC QUOI       → 5e_gram_accords
   ---------------------------------------------------------------------------
   « Accorder les mots dans la phrase et expliquer ses choix. »
   ⛔ La chaine du GN, l'attribut, le sujet éloigné et les participes ont chacun
   leur micro dédiée en 5e. Restait la question d'avant toutes les autres, et
   c'est la plus utile : ce mot-là VARIE-T-IL ? Un élève qui accorde un adverbe
   ou une préposition ne connait pas la règle : il accorde ce qui l'entoure.
   ⭐ Deux réponses sur cinq disent que le mot NE BOUGE PAS.
   ========================================================================== */

const ACCORDS: readonly Cas[] = [
  { gauche: "« Ils marchaient lentement. » — le mot « lentement »", droite: "il ne bouge pas : un adverbe ne s'accorde jamais avec rien" },
  { gauche: "« Elles parlent beaucoup trop. » — le mot « beaucoup »", droite: "il ne bouge pas : un adverbe ne s'accorde jamais avec rien" },
  { gauche: "« Les enfants criaient très fort. » — le mot « fort »", droite: "il ne bouge pas : un adverbe ne s'accorde jamais avec rien" },
  { gauche: "« Les livres sont sur les tables. » — le mot « sur »", droite: "il ne bouge pas : une préposition est toujours invariable" },
  { gauche: "« Elles partirent avec leurs frères. » — le mot « avec »", droite: "il ne bouge pas : une préposition est toujours invariable" },
  { gauche: "« Il revint sans ses compagnons. » — le mot « sans »", droite: "il ne bouge pas : une préposition est toujours invariable" },
  { gauche: "« Les allées étaient longues et sombres. » — le mot « longues »", droite: "il s'accorde avec le nom : c'est un adjectif qualificatif" },
  { gauche: "« Une vieille auberge éclairait la route. » — le mot « vieille »", droite: "il s'accorde avec le nom : c'est un adjectif qualificatif" },
  { gauche: "« Des chevaux noirs attendaient dehors. » — le mot « noirs »", droite: "il s'accorde avec le nom : c'est un adjectif qualificatif" },
  { gauche: "« Les enfants criaient dans la cour. » — le mot « criaient »", droite: "il s'accorde avec son sujet : c'est le verbe de la phrase" },
  { gauche: "« Le bruit des vagues berçait la case. » — le mot « berçait »", droite: "il s'accorde avec son sujet : c'est le verbe de la phrase" },
  { gauche: "« Nous attendions sur le quai. » — le mot « attendions »", droite: "il s'accorde avec son sujet : c'est le verbe de la phrase" },
  { gauche: "« Ces chevaux appartiennent au roi. » — le mot « Ces »", droite: "il s'accorde avec le nom qu'il annonce : c'est un déterminant" },
  { gauche: "« Leurs bagages restèrent sur le quai. » — le mot « Leurs »", droite: "il s'accorde avec le nom qu'il annonce : c'est un déterminant" },
  { gauche: "« Quelques marchands passaient encore. » — le mot « Quelques »", droite: "il s'accorde avec le nom qu'il annonce : c'est un déterminant" },
];

const TOUS_ACCORDS: readonly string[] = [...new Set(ACCORDS.map((c) => c.droite))];

/* =============================================================================
   4. LA MÊME PHRASE, MAIS ÉCRITE               → 5e_gram_oral_ecrit
   ---------------------------------------------------------------------------
   « Distinguer usages de l'oral et de l'écrit. » La 4e demande de RECONNAITRE
   l'usage, la 3e de NOMMER la marque. La 5e fait le geste lui-même : elle
   récrit. C'est plus dur qu'il n'y parait, et c'est ce qu'on lui demandera dans
   toutes ses copies.
   ⚠️ Leurres propres au cas : une phrase récrite d'un autre exemple ne piège
   personne. Les trois concurrentes de chaque cas sont des récritures
   INCOMPLÈTES ou FAUSSES, jamais des phrases sans rapport.
   ========================================================================== */

const ORAL_ECRIT: readonly CasSeul[] = [
  { gauche: "« J'ai pas vu le film. »", droite: "Je n'ai pas vu le film.", leurres: ["J'ai pas vu ce film.", "Je n'ai vu pas le film.", "J'ai point vu le film."] },
  { gauche: "« On comprend rien du tout. »", droite: "On ne comprend rien du tout.", leurres: ["On comprend rien de tout.", "On ne comprend pas rien.", "On comprend nul du tout."] },
  { gauche: "« Y a personne dans la cour. »", droite: "Il n'y a personne dans la cour.", leurres: ["Y a pas personne dans la cour.", "Il y a personne dans la cour.", "Il n'y a pas personne là."] },
  { gauche: "« Le prof, il a rien dit. »", droite: "Le professeur n'a rien dit.", leurres: ["Le prof n'a rien dit.", "Le professeur, il n'a rien dit.", "Le professeur a rien dit."] },
  { gauche: "« Ma sœur, elle est partie. »", droite: "Ma sœur est partie.", leurres: ["Ma sœur, elle est partie tôt.", "Elle est partie, ma sœur.", "Ma sœur elle est partie."] },
  { gauche: "« Tu vas où comme ça ? »", droite: "Où vas-tu ainsi ?", leurres: ["Tu vas où ainsi ?", "Où tu vas comme ça ?", "Où est-ce tu vas ?"] },
  { gauche: "« Il part quand exactement ? »", droite: "Quand part-il exactement ?", leurres: ["Il part quand au juste ?", "Quand il part exactement ?", "Quand est-ce il part ?"] },
  { gauche: "« T'as compris la règle ? »", droite: "As-tu compris la règle ?", leurres: ["Tu as compris la règle ?", "As-tu compris cette règle ?", "T'as-tu compris la règle ?"] },
  { gauche: "« Faut réviser avant lundi. »", droite: "Il faut réviser avant lundi.", leurres: ["Faut-il réviser avant lundi.", "Il faut réviser avant le lundi.", "Faut réviser d'ici lundi."] },
  { gauche: "« J'sais pas quoi répondre. »", droite: "Je ne sais pas quoi répondre.", leurres: ["Je sais pas quoi répondre.", "Je ne sais quoi pas répondre.", "J'ignore pas quoi répondre."] },
  { gauche: "« C'est de ça dont je parle. »", droite: "C'est de cela que je parle.", leurres: ["C'est de ça que je parle.", "C'est cela dont je parle.", "C'est de cela dont je parle."] },
  { gauche: "« C'est à lui à qui je pense. »", droite: "C'est à lui que je pense.", leurres: ["C'est lui à qui je pense.", "C'est à lui dont je pense.", "C'est à lui qui je pense."] },
  { gauche: "« Ils se sont bien amusés, eux. »", droite: "Ils se sont bien amusés.", leurres: ["Eux, ils se sont bien amusés.", "Ils se sont, eux, bien amusés.", "Ils se sont bien amusé."] },
  { gauche: "« Y'a plus rien à manger. »", droite: "Il n'y a plus rien à manger.", leurres: ["Il y a plus rien à manger.", "Y a plus rien à manger.", "Il n'y a pas plus à manger."] },
  { gauche: "« Le livre que j'te parle. »", droite: "Le livre dont je te parle.", leurres: ["Le livre que je te parle.", "Le livre duquel je te parle.", "Le livre dont je t'en parle."] },
];

/* =============================================================================
   5. DE QUEL VERBE VIENT CETTE FORME           → 5e_conj_identifier
   ---------------------------------------------------------------------------
   « Identifier temps, mode, personne et RADICAL. »
   ⛔ Nommer le temps et la personne est déjà la question de
   `5e_conj_radical_terminaison` ; les temps composés et antérieurs ont leurs
   micros ; les radicaux variables aussi. Restait l'INFINITIF — et c'est le
   premier geste de tous : sans lui, on ne cherche pas dans un tableau de
   conjugaison, on ne trouve pas le groupe, et on n'accorde pas le participe.
   ⭐ Les quinze formes retenues sont celles où l'infinitif ne se devine PAS :
   « il vit », « il fut », « nous vînmes », « ils durent ».
   ========================================================================== */

const INFINITIFS: readonly CasSeul[] = [
  { gauche: "« Il vit la lumière au loin. »", droite: "voir", leurres: ["vivre", "vêtir", "veiller"] },
  { gauche: "« Il fut le premier à parler. »", droite: "être", leurres: ["faire", "falloir", "fuir"] },
  { gauche: "« Ils durent renoncer au voyage. »", droite: "devoir", leurres: ["durer", "dire", "dormir"] },
  { gauche: "« Nous vînmes sans prévenir. »", droite: "venir", leurres: ["vaincre", "vivre", "voir"] },
  { gauche: "« Elle mourut au bout de trois jours. »", droite: "mourir", leurres: ["mouvoir", "moudre", "murer"] },
  { gauche: "« Il tint parole jusqu'au bout. »", droite: "tenir", leurres: ["teindre", "tinter", "tondre"] },
  { gauche: "« Ils crurent à cette histoire. »", droite: "croire", leurres: ["croitre", "créer", "cueillir"] },
  { gauche: "« Elle sut répondre sans hésiter. »", droite: "savoir", leurres: ["suivre", "sortir", "servir"] },
  { gauche: "« Il conclut par une question. »", droite: "conclure", leurres: ["concevoir", "confondre", "conduire"] },
  { gauche: "« Nous pûmes enfin traverser. »", droite: "pouvoir", leurres: ["puiser", "punir", "paraitre"] },
  { gauche: "« Elle acquit une belle réputation. »", droite: "acquérir", leurres: ["acquitter", "accueillir", "accroitre"] },
  { gauche: "« Ils résolurent de partir seuls. »", droite: "résoudre", leurres: ["résulter", "résonner", "réussir"] },
  { gauche: "« Il vainquit sa peur du vide. »", droite: "vaincre", leurres: ["venir", "vanter", "veiller"] },
  { gauche: "« Elle cousit la doublure du manteau. »", droite: "coudre", leurres: ["courir", "couvrir", "cuire"] },
  { gauche: "« Ils s'assirent au bord du chemin. »", droite: "assoir", leurres: ["assurer", "assaillir", "assister"] },
];

/* =============================================================================
   6. LA FORME ATTENDUE                         → 5e_conj_composer
   ---------------------------------------------------------------------------
   « Composer et conjuguer les formes verbales attendues. »
   ⛔ `5e_conj_passe_simple`, `5e_conj_temps_composes`, `5e_conj_anterieurs` et
   `5e_conj_radical_variable` ANALYSENT des formes déjà écrites. Composer est
   l'opération inverse, et c'est celle qui se rate en rédaction.
   ⚠️ Leurres propres au cas — une forme d'un autre verbe ne piège personne.
   ⛔ Aucun cas où l'usage hésite : chaque phrase n'a qu'une forme correcte.
   ========================================================================== */

const COMPOSER: readonly CasSeul[] = [
  { gauche: "« Hier, il ___ la porte à la volée. » (ouvrir, passé simple)", droite: "ouvrit", leurres: ["ouvra", "ouvrait", "ouvrissa"] },
  { gauche: "« Chaque soir, nous ___ le même chemin. » (prendre, imparfait)", droite: "prenions", leurres: ["prenons", "prendrions", "prenâmes"] },
  { gauche: "« Demain, vous ___ la réponse. » (savoir, futur simple)", droite: "saurez", leurres: ["saverez", "sauriez", "savez"] },
  { gauche: "« Il faut que tu ___ plus tôt. » (venir, subjonctif présent)", droite: "viennes", leurres: ["viens", "viendras", "viendrais"] },
  { gauche: "« Ils ___ déjà partis quand j'arrivai. » (être, imparfait)", droite: "étaient", leurres: ["furent", "seraient", "ont été"] },
  { gauche: "« Nous ___ tout compris avant la fin. » (avoir, passé composé)", droite: "avons eu", leurres: ["avions eu", "eûmes", "aurons eu"] },
  { gauche: "« Elle ___ la lettre sans rien dire. » (lire, passé simple)", droite: "lut", leurres: ["lisa", "lisait", "lirait"] },
  { gauche: "« Autrefois, ils ___ dans cette maison. » (vivre, imparfait)", droite: "vivaient", leurres: ["vécurent", "vivraient", "vivent"] },
  { gauche: "« ___ la porte, s'il te plait. » (fermer, impératif)", droite: "Ferme", leurres: ["Fermes", "Fermez", "Fermer"] },
  { gauche: "« Si j'avais su, je ___ autrement. » (agir, conditionnel passé)", droite: "aurais agi", leurres: ["agirais", "avais agi", "aurai agi"] },
  { gauche: "« Le pont ___ emporté par la crue. » (être, passé composé)", droite: "a été", leurres: ["fut", "était", "aura été"] },
  { gauche: "« Ils ___ à peine de manger. » (finir, imparfait)", droite: "finissaient", leurres: ["finirent", "finiraient", "finissent"] },
  { gauche: "« Nous ___ dès l'aube demain matin. » (partir, futur simple)", droite: "partirons", leurres: ["partions", "partirions", "partîmes"] },
  { gauche: "« Il faut que vous ___ patients. » (être, subjonctif présent)", droite: "soyez", leurres: ["êtes", "serez", "seriez"] },
  { gauche: "« Elle ___ toute la nuit sans dormir. » (courir, passé simple)", droite: "courut", leurres: ["couru", "courait", "courrait"] },
];

/* =============================================================================
   7. LE MODE QUE L'INTENTION APPELLE           → 5e_conj_employer
   ---------------------------------------------------------------------------
   « Employer les temps ET LES MODES selon le sens. »
   ⛔ `5e_conj_valeurs` tient les valeurs des TEMPS du récit — l'imparfait de
   description, le passé simple d'action brève, l'antérieur. Restaient les
   MODES : ce qu'on choisit selon qu'on ordonne, qu'on constate, qu'on suppose,
   qu'on souhaite, ou qu'on écrit une consigne pour tout le monde.
   ========================================================================== */

const MODES: readonly Cas[] = [
  { gauche: "Tu écris une consigne à quelqu'un que tu tutoies.", droite: "l'impératif : on ordonne ou l'on conseille, sans dire le sujet" },
  { gauche: "Tu dis à ton frère de fermer la fenêtre derrière lui.", droite: "l'impératif : on ordonne ou l'on conseille, sans dire le sujet" },
  { gauche: "Tu écris une pancarte : « ___ le portail après 18 heures. »", droite: "l'impératif : on ordonne ou l'on conseille, sans dire le sujet" },
  { gauche: "Tu racontes ce qui s'est réellement passé la veille.", droite: "l'indicatif : on présente le fait comme réel et bien certain" },
  { gauche: "Tu décris ce que le personnage voit en entrant.", droite: "l'indicatif : on présente le fait comme réel et bien certain" },
  { gauche: "Tu annonces un fait dont tu es tout à fait sûr.", droite: "l'indicatif : on présente le fait comme réel et bien certain" },
  { gauche: "Tu dis ce que tu ferais si tu avais plus de temps.", droite: "le conditionnel : le fait dépend d'une condition posée avant" },
  { gauche: "Tu demandes quelque chose sans vouloir paraitre brusque.", droite: "le conditionnel : le fait dépend d'une condition posée avant" },
  { gauche: "Tu imagines la suite d'une histoire qui n'a pas eu lieu.", droite: "le conditionnel : le fait dépend d'une condition posée avant" },
  { gauche: "Tu écris après « il faut que » ou après « je souhaite que ».", droite: "le subjonctif : le fait est voulu, craint ou bien envisagé" },
  { gauche: "Tu dis ce que tu redoutes qu'il arrive demain.", droite: "le subjonctif : le fait est voulu, craint ou bien envisagé" },
  { gauche: "Tu écris ce que tu aimerais qu'on te réponde.", droite: "le subjonctif : le fait est voulu, craint ou bien envisagé" },
  { gauche: "Tu écris une recette qui vaut pour n'importe qui.", droite: "l'infinitif : la consigne vaut pour tous, sans nommer personne" },
  { gauche: "Tu rédiges un mode d'emploi affiché dans un couloir.", droite: "l'infinitif : la consigne vaut pour tous, sans nommer personne" },
  { gauche: "Tu écris la règle d'un jeu, valable pour chaque joueur.", droite: "l'infinitif : la consigne vaut pour tous, sans nommer personne" },
];

const TOUS_MODES: readonly string[] = [...new Set(MODES.map((c) => c.droite))];

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
    niveau: "5e" as const,
    matiere: "francais" as const,
    notionId,
    microId,
    difficulty,
    theme: "neutral" as const,
    hint,
    tags: [...tags],
  };
}

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
          `La réponse attendue est « ${c.droite} ».`,
        ),
      };
    },
  };
}

export const socleGrammaireConjugaison5eBank: TutorBankItemV4[] = [
  gabarit(
    "5e_gram_constituants_tpl_2",
    "5e_gram_constituants",
    "grammaire_fonctions",
    MINIMALE,
    TOUTES_MINIMALES,
    "Que reste-t-il si l'on enlève tout ce qui peut s'enlever ?",
    3,
    "Enlève un groupe, puis relis à voix haute : si la phrase boite, remets-le.",
    "La phrase minimale est ce qui subsiste quand on retire tout l'accessoire. Il reste toujours le sujet et le verbe ; il reste en plus un objet, un attribut ou un complément de lieu quand le verbe les réclame. Certaines phrases sont déjà minimales.",
    "Retire les groupes un par un, en commençant par ceux qui se déplacent. Ce qui refuse d'être retiré sans casser la phrase fait partie du minimum : c'est le verbe qui décide, pas toi.",
    ["5e", "grammaire", "phrase-minimale", "template"],
  ),
  gabarit(
    "5e_gram_fonctions_tpl_2",
    "5e_gram_fonctions",
    "grammaire_fonctions",
    SUJET,
    TOUS_SUJETS,
    "Où se trouve le sujet de ce verbe ?",
    2,
    "Pose la question « qui est-ce qui ? » juste devant le verbe, à voix haute.",
    "Le sujet ne se trouve pas toujours à gauche du verbe. Il peut être inversé, séparé par un groupe intercalé, réduit à un pronom, étendu en un groupe entier dont le noyau est un nom — ou absent, quand le verbe est à l'impératif.",
    "Dis le verbe tout seul, puis demande « qui est-ce qui ? ». La réponse est le sujet, où qu'il soit dans la phrase. Si personne ne répond, regarde si le verbe donne un ordre.",
    ["5e", "grammaire", "sujet", "template"],
  ),
  gabarit(
    "5e_gram_accords_tpl_2",
    "5e_gram_accords",
    "orthographe_accords",
    ACCORDS,
    TOUS_ACCORDS,
    "Ce mot s'accorde-t-il, et avec quoi ?",
    2,
    "Avant de te demander COMMENT accorder, demande-toi SI le mot varie.",
    "Tous les mots ne s'accordent pas. L'adverbe et la préposition ne varient jamais. L'adjectif s'accorde avec le nom qu'il qualifie, le déterminant avec le nom qu'il présente, et le verbe conjugué avec son sujet. Il n'y a pas d'autre cas.",
    "Mets la phrase au pluriel dans ta tête et regarde quels mots bougent. Ceux qui ne bougent pas sont invariables — et les accorder est une faute que le correcteur voit tout de suite.",
    ["5e", "grammaire", "accords", "invariables", "template"],
  ),
  gabaritSeul(
    "5e_gram_oral_ecrit_tpl_2",
    "5e_gram_oral_ecrit",
    "discours_registres",
    ORAL_ECRIT,
    "Comment cette phrase s'écrit-elle dans une copie ?",
    3,
    "Il y a souvent DEUX choses à corriger, pas une : lis chaque proposition en entier.",
    "L'oral a ses usages réguliers : le « ne » de la négation tombe, le sujet est repris par un pronom, la question se passe d'inversion, une syllabe s'avale, et une construction se double. À l'écrit, chacun de ces usages se rétablit — et souvent plusieurs à la fois.",
    "Récris la phrase entièrement plutôt que de corriger un mot. Puis relis-la en te demandant si un adulte que tu ne connais pas l'écrirait ainsi.",
    ["5e", "grammaire", "oral-ecrit", "template"],
  ),
  gabaritSeul(
    "5e_conj_identifier_tpl_2",
    "5e_conj_identifier",
    "conjugaison_formes",
    INFINITIFS,
    "De quel verbe cette forme vient-elle ?",
    3,
    "Ne te fie pas au début du mot : « il vit » ne vient pas de « vivre ».",
    "Retrouver l'infinitif est le premier geste de la conjugaison : sans lui, on ne cherche pas dans un tableau, on ne trouve pas le groupe, et on n'accorde aucun participe. Beaucoup de formes du passé simple ressemblent à un autre verbe que le leur.",
    "Remets la forme dans une phrase au présent : « aujourd'hui, il… ». Le verbe que tu emploies alors est le bon, et son infinitif se lit tout seul.",
    ["5e", "conjugaison", "infinitif", "template"],
  ),
  gabaritSeul(
    "5e_conj_composer_tpl_2",
    "5e_conj_composer",
    "conjugaison_formes",
    COMPOSER,
    "Quelle forme du verbe convient ?",
    3,
    "Repère d'abord le temps demandé, puis la personne. Jamais l'inverse.",
    "Composer une forme, c'est choisir un temps, une personne, et écrire la terminaison qui va avec. Les erreurs viennent presque toujours d'un temps voisin — l'imparfait pour le passé simple, le futur pour le conditionnel — dont la terminaison ne diffère que d'une lettre.",
    "Écris la forme à part, sur ton brouillon, avant de la mettre dans la phrase. Puis relis la phrase entière : l'oreille reconnait un temps qui ne va pas avec le reste.",
    ["5e", "conjugaison", "formes", "template"],
  ),
  gabarit(
    "5e_conj_employer_tpl_2",
    "5e_conj_employer",
    "conjugaison_valeurs",
    MODES,
    TOUS_MODES,
    "Quel mode emploies-tu ?",
    3,
    "On ne te demande pas d'analyser une phrase : on te demande d'en écrire une.",
    "Le mode dit comment on présente le fait. L'impératif ordonne, l'indicatif donne le fait pour réel, le conditionnel le suspend à une condition, le subjonctif le montre voulu ou craint, et l'infinitif écrit une consigne valable pour tous.",
    "Demande-toi ce que tu fais avec ta phrase : ordonner, constater, supposer, souhaiter, ou expliquer à n'importe qui. Chacune de ces cinq intentions appelle un mode, et un seul.",
    ["5e", "conjugaison", "modes", "template"],
  ),
];
