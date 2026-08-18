// lib/tutor-v4/questionBank/seconde/francais/relatives.bank.ts
//
// LA SYNTAXE DES PROPOSITIONS SUBORDONNÉES RELATIVES — écrit le 14/08/2026.
//
// RÉFÉRENCE : programme de seconde générale et technologique, arrêté du
// 17 janvier 2019 modifié par le JORF du 8 octobre 2020, quatrième point de
// l'étude de la langue travaillé DÈS LA CLASSE DE SECONDE :
//   « La syntaxe des propositions subordonnées relatives. On s'attache à revoir
//   les subordonnées dont la syntaxe et la relation avec la proposition
//   principale peuvent être source de difficultés. ON TRAVAILLE EN PRIORITÉ LA
//   COMPRÉHENSION DE LA STRUCTURE DES RELATIVES (NOTAMMENT CELLES QUI SONT
//   INTRODUITES PAR DONT, AUQUEL, DUQUEL, ETC.), en insistant, par exemple, sur
//   CE QUI LES DISTINGUE DES SUBORDONNÉES CONJONCTIVES. »
//
// Et au IV, parmi les exercices attendus :
//   « la syntaxe des relatives : transformation de phrases (RELATIVISATION),
//   COMMUTATION AVEC D'AUTRES TYPES D'EXPANSIONS, etc. »
//
// ⭐ DEUX CONSÉQUENCES DIRECTES, ET CE FICHIER N'EST QUE CELA :
//   1. la relative ne se demande JAMAIS seule — elle se demande CONTRE la
//      conjonctive, parce que c'est ce que le texte prescrit ;
//   2. on ne fait pas reconnaitre une relative, on la CONSTRUIT (relativisation)
//      et on la REMPLACE (commutation avec un adjectif, un participe, un
//      complément du nom).
//
// ⭐ La virgule est traitée à part, et c'est la plus rentable des six micros :
// « les élèves qui avaient révisé ont réussi » et « les élèves, qui avaient
// révisé, ont réussi » ne parlent pas du même nombre d'élèves. Un signe de
// ponctuation, deux mondes.
//
// ⛔ QCM uniquement, QUATRE propositions.
// ⚠️ Tables typées à la main, jamais en `as const`.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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

type Trou = { readonly phrase: string; readonly bonne: string; readonly raison: string };
type TrouLibre = { readonly phrase: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };
type Complete = { readonly phrase: string; readonly subordonnee: string; readonly rep: string; readonly raison: string };
type Commutation = { readonly phrase: string; readonly relative: string; readonly forme: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };
type Virgule = { readonly phrase: string; readonly rep: string; readonly faux: readonly string[]; readonly raison: string };

/* =============================================================================
   1. DONT  (2de_rel_dont)
   ---------------------------------------------------------------------------
   « dont » remplace un groupe introduit par DE : parler de, se souvenir de, le
   toit de la maison, le père de l'élève. Toute la difficulté tient là — et
   l'erreur la plus tenace consiste à redoubler le complément : « l'auteur dont
   j'admire SON style » dit deux fois la même chose.
   ========================================================================== */

/* ⚠️ EXACTEMENT QUATRE PRONOMS, et « auquel » et « duquel » n'y sont PAS.
   Mesuré le 14/08 : aucun cas de cette table n'appelle ces deux formes, elles
   étaient donc vues 2 300 fois sans être jamais correctes. Un distracteur qui
   n'est jamais la réponse ramène le QCM à trois lignes — 33 % au hasard au lieu
   de 25 %. Elles ont leur propre micro, `2de_rel_auquel_duquel`. */
const PRONOMS_SIMPLES: readonly string[] = ["dont", "que", "qui", "où"];

const CAS_DONT: readonly Trou[] = [
  { phrase: "Le roman … je t'ai parlé est épuisé.", bonne: "dont", raison: "on parle DE quelque chose : le complément est introduit par de" },
  { phrase: "Le roman … tu m'as offert est épuisé.", bonne: "que", raison: "on offre quelque chose, sans préposition : complément direct" },
  { phrase: "Le roman … a obtenu le prix vient d'être réédité.", bonne: "qui", raison: "le pronom est sujet du verbe de la relative" },
  { phrase: "L'élève … le père est médecin vient d'arriver.", bonne: "dont", raison: "le père DE l'élève : le complément du nom est introduit par de" },
  { phrase: "La maison … le toit s'est effondré est inhabitée.", bonne: "dont", raison: "le toit DE la maison : complément du nom introduit par de" },
  { phrase: "La ville … je suis né se trouve au sud de l'ile.", bonne: "où", raison: "le pronom remplace un complément de lieu" },
  { phrase: "Le jour … nous sommes partis, il pleuvait.", bonne: "où", raison: "le pronom remplace un complément de temps" },
  { phrase: "Le film … tout le monde parle sort vendredi.", bonne: "dont", raison: "on parle DE quelque chose : complément introduit par de" },
  { phrase: "Le film … tout le monde attend sort vendredi.", bonne: "que", raison: "on attend quelque chose, sans préposition : complément direct" },
  { phrase: "Voici les outils … j'ai besoin pour finir.", bonne: "dont", raison: "avoir besoin DE : complément introduit par de" },
  { phrase: "Voici les outils … se trouvaient dans le placard.", bonne: "qui", raison: "le pronom est sujet du verbe de la relative" },
  { phrase: "C'est une décision … je me souviens très bien.", bonne: "dont", raison: "se souvenir DE : complément introduit par de" },
  { phrase: "C'est une décision … personne n'avait prévue.", bonne: "que", raison: "prévoir quelque chose, sans préposition : complément direct" },
  { phrase: "L'année … il est arrivé, la rivière avait débordé.", bonne: "où", raison: "le pronom remplace un complément de temps" },
  { phrase: "Le témoin … la déposition a été enregistrée n'est pas venu.", bonne: "dont", raison: "la déposition DU témoin : complément du nom introduit par de" },
  { phrase: "Le chemin … mène au phare est fermé.", bonne: "qui", raison: "le pronom est sujet du verbe de la relative" },
];

/* Les redoublements fautifs, traités à part : on donne la phrase entière et
   l'on demande la forme correcte. ⛔ Aucun cas d'usage flottant : ces quatre
   constructions sont fautives pour toutes les grammaires. */
const CAS_DONT_FAUTIF: readonly TrouLibre[] = [
  {
    phrase: "C'est un auteur dont j'admire son style.",
    bonne: "C'est un auteur dont j'admire le style.",
    faux: ["C'est un auteur qu'on admire le style.", "C'est un auteur dont j'en admire le style.", "C'est un auteur duquel j'admire son style."],
    raison: "« dont » contient déjà le « de » : garder « son » revient à le dire deux fois",
  },
  {
    phrase: "La maison dont son toit est rouge se voit de loin.",
    bonne: "La maison dont le toit est rouge se voit de loin.",
    faux: ["La maison que le toit est rouge se voit de loin.", "La maison dont son toit est rouge se voit de loin.", "La maison duquel le toit est rouge se voit de loin."],
    raison: "« dont » remplace déjà « de la maison » : « son » fait doublon",
  },
  {
    phrase: "Le livre dont je t'en ai parlé est épuisé.",
    bonne: "Le livre dont je t'ai parlé est épuisé.",
    faux: ["Le livre que je t'ai parlé est épuisé.", "Le livre dont je t'en ai parlé est épuisé.", "Le livre duquel je t'en ai parlé est épuisé."],
    raison: "« en » reprend le complément que « dont » a déjà remplacé",
  },
  {
    phrase: "Voici l'élève dont sa mère est venue hier.",
    bonne: "Voici l'élève dont la mère est venue hier.",
    faux: ["Voici l'élève que la mère est venue hier.", "Voici l'élève dont sa mère est venue hier.", "Voici l'élève duquel la mère est venue hier."],
    raison: "« dont » vaut « de l'élève » : le possessif redouble ce lien",
  },
];

/* =============================================================================
   2. AUQUEL, DUQUEL, LEQUEL  (2de_rel_auquel_duquel)
   ---------------------------------------------------------------------------
   Ces formes se choisissent d'après DEUX choses à la fois : la préposition que
   le verbe ou la locution réclame, et le genre et le nombre de l'antécédent.
   D'où l'erreur ordinaire : on entend la préposition et on oublie l'accord.
   ========================================================================== */

const PRONOMS_COMPOSES: readonly string[] = [
  "auquel", "à laquelle", "auxquels", "auxquelles",
  "duquel", "de laquelle", "desquels", "desquelles",
  "lequel", "laquelle",
];

const CAS_COMPOSES: readonly Trou[] = [
  { phrase: "Le projet … il travaille depuis un an sera présenté en juin.", bonne: "auquel", raison: "travailler À, antécédent masculin singulier" },
  { phrase: "La question … il a répondu n'était pas la plus simple.", bonne: "à laquelle", raison: "répondre À, antécédent féminin singulier" },
  { phrase: "Les examens … il se prépare auront lieu en mai.", bonne: "auxquels", raison: "se préparer À, antécédent masculin pluriel" },
  { phrase: "Les épreuves … elle s'est inscrite sont payantes.", bonne: "auxquelles", raison: "s'inscrire À, antécédent féminin pluriel" },
  { phrase: "L'ami à côté … je me suis assis n'a rien dit.", bonne: "duquel", raison: "à côté DE, antécédent masculin singulier" },
  { phrase: "La table au bord … il avait posé son verre a été déplacée.", bonne: "de laquelle", raison: "au bord DE, antécédent féminin singulier" },
  { phrase: "Les arbres au pied … nous avons campé ont été abattus.", bonne: "desquels", raison: "au pied DE, antécédent masculin pluriel" },
  { phrase: "Les falaises au sommet … souffle le vent dominent la baie.", bonne: "desquelles", raison: "au sommet DE, antécédent féminin pluriel" },
  { phrase: "Le sujet … il pense sans arrêt le tient éveillé.", bonne: "auquel", raison: "penser À, antécédent masculin singulier" },
  { phrase: "La règle … tout le monde doit se plier est affichée.", bonne: "à laquelle", raison: "se plier À, antécédent féminin singulier" },
  { phrase: "Le dossier sur … repose toute la décision a disparu.", bonne: "lequel", raison: "reposer SUR, antécédent masculin singulier" },
  { phrase: "La lettre par … tout a commencé n'a jamais été retrouvée.", bonne: "laquelle", raison: "par, antécédent féminin singulier" },
  { phrase: "Les personnes … il fait confiance sont peu nombreuses.", bonne: "auxquelles", raison: "faire confiance À, antécédent féminin pluriel" },
  { phrase: "Les documents à partir … il a travaillé sont confidentiels.", bonne: "desquels", raison: "à partir DE, antécédent masculin pluriel" },
  { phrase: "La réunion au cours … la décision a été prise a duré trois heures.", bonne: "de laquelle", raison: "au cours DE, antécédent féminin singulier" },
  { phrase: "Le concours … il s'était présenté est très sélectif.", bonne: "auquel", raison: "se présenter À, antécédent masculin singulier" },
];

/* =============================================================================
   3. RELATIVE OU CONJONCTIVE ?  (2de_rel_vs_conjonctive)
   ---------------------------------------------------------------------------
   ⭐ Le programme demande explicitement « ce qui les distingue des subordonnées
   conjonctives ». La réponse tient en une phrase : la relative complète un NOM,
   la conjonctive complète un VERBE ou la phrase entière. « que » peut être l'un
   ou l'autre, et c'est là que tout se joue.
   ⚠️ Les quatre lignes du pool s'excluent : compléter un nom, compléter un
   verbe, situer la principale entière, ou être le sujet.
   ========================================================================== */

const COMPLEMENTS: readonly string[] = [
  "un nom, dont elle précise le sens",
  "le verbe de la principale, dont elle est le complément d'objet",
  "la principale entière, qu'elle situe ou qu'elle nuance",
  "rien : elle occupe elle-même la fonction de sujet",
];

const CAS_COMPLETE: readonly Complete[] = [
  { phrase: "Le livre que j'ai lu m'a bouleversé.", subordonnee: "que j'ai lu", rep: "un nom, dont elle précise le sens", raison: "elle précise de quel livre il s'agit : c'est une relative" },
  { phrase: "Je crois que tu as raison.", subordonnee: "que tu as raison", rep: "le verbe de la principale, dont elle est le complément d'objet", raison: "on croit quelque chose : la subordonnée complète « crois »" },
  { phrase: "Il est parti avant que la nuit tombe.", subordonnee: "avant que la nuit tombe", rep: "la principale entière, qu'elle situe ou qu'elle nuance", raison: "elle situe le départ dans le temps" },
  { phrase: "Qui dort dine.", subordonnee: "qui dort", rep: "rien : elle occupe elle-même la fonction de sujet", raison: "la relative sans antécédent tient lieu de sujet du verbe « dine »" },
  { phrase: "La route qui mène au port est fermée.", subordonnee: "qui mène au port", rep: "un nom, dont elle précise le sens", raison: "elle dit de quelle route on parle" },
  { phrase: "Elle affirme qu'elle n'a rien vu.", subordonnee: "qu'elle n'a rien vu", rep: "le verbe de la principale, dont elle est le complément d'objet", raison: "on affirme quelque chose : la subordonnée complète « affirme »" },
  { phrase: "Bien qu'il pleuve, la sortie est maintenue.", subordonnee: "bien qu'il pleuve", rep: "la principale entière, qu'elle situe ou qu'elle nuance", raison: "elle nuance ce que la principale affirme" },
  { phrase: "Le témoin dont je vous ai parlé est absent.", subordonnee: "dont je vous ai parlé", rep: "un nom, dont elle précise le sens", raison: "elle identifie le témoin dont il s'agit" },
  { phrase: "Il faut que chacun rende sa copie.", subordonnee: "que chacun rende sa copie", rep: "le verbe de la principale, dont elle est le complément d'objet", raison: "elle complète « il faut »" },
  { phrase: "Nous partirons dès que le vent tombera.", subordonnee: "dès que le vent tombera", rep: "la principale entière, qu'elle situe ou qu'elle nuance", raison: "elle situe le départ dans le temps" },
  { phrase: "L'année où il est arrivé, la rivière avait débordé.", subordonnee: "où il est arrivé", rep: "un nom, dont elle précise le sens", raison: "elle précise de quelle année il s'agit" },
  { phrase: "Je sais que la salle est fermée.", subordonnee: "que la salle est fermée", rep: "le verbe de la principale, dont elle est le complément d'objet", raison: "on sait quelque chose : elle complète « sais »" },
  { phrase: "Qui veut voyager loin ménage sa monture.", subordonnee: "qui veut voyager loin", rep: "rien : elle occupe elle-même la fonction de sujet", raison: "sans antécédent, la relative devient sujet du verbe « ménage »" },
  { phrase: "Il travaille tant qu'il en oublie l'heure.", subordonnee: "tant qu'il en oublie l'heure", rep: "la principale entière, qu'elle situe ou qu'elle nuance", raison: "elle exprime la conséquence de ce que dit la principale" },
  { phrase: "Les élèves qui avaient révisé ont mieux réussi.", subordonnee: "qui avaient révisé", rep: "un nom, dont elle précise le sens", raison: "elle dit desquels des élèves on parle" },
  { phrase: "Il espère que tout ira bien.", subordonnee: "que tout ira bien", rep: "le verbe de la principale, dont elle est le complément d'objet", raison: "on espère quelque chose : elle complète « espère »" },
];

/* =============================================================================
   4. RELATIVISER  (2de_rel_relativisation)
   ---------------------------------------------------------------------------
   « transformation de phrases (relativisation) », dit le IV du programme. On
   donne deux phrases indépendantes, on demande par quel pronom les fondre. La
   réponse dépend de la FONCTION qu'occupait le groupe répété dans la seconde.
   ========================================================================== */

const RELATIVISATIONS: readonly Trou[] = [
  { phrase: "J'ai lu un roman. Ce roman m'a bouleversé.", bonne: "qui", raison: "« ce roman » était sujet dans la seconde phrase" },
  { phrase: "J'ai lu un roman. Tout le monde parle de ce roman.", bonne: "dont", raison: "« de ce roman » était introduit par de" },
  { phrase: "J'ai lu un roman. Ma sœur m'avait offert ce roman.", bonne: "que", raison: "« ce roman » était complément direct du verbe offrir" },
  { phrase: "Nous sommes passés par un village. Mon père est né dans ce village.", bonne: "où", raison: "« dans ce village » était complément de lieu" },
  { phrase: "Il a présenté un projet. Il travaille sur ce projet depuis un an.", bonne: "sur lequel", raison: "« sur ce projet » était introduit par sur, antécédent masculin singulier" },
  { phrase: "Voici la question. Il n'a jamais répondu à cette question.", bonne: "à laquelle", raison: "« à cette question » était introduit par à, antécédent féminin singulier" },
  { phrase: "C'est un élève. Le père de cet élève enseigne ici.", bonne: "dont", raison: "« de cet élève » était complément du nom père" },
  { phrase: "Il y a des jours. Rien ne va comme prévu ces jours-là.", bonne: "où", raison: "« ces jours-là » était complément de temps" },
  { phrase: "Elle a rencontré des personnes. Elle fait confiance à ces personnes.", bonne: "auxquelles", raison: "« à ces personnes » était introduit par à, antécédent féminin pluriel" },
  { phrase: "Il a acheté une maison. Le toit de cette maison fuit.", bonne: "dont", raison: "« de cette maison » était complément du nom toit" },
  { phrase: "J'ai retrouvé le carnet. Je notais mes observations dans ce carnet.", bonne: "dans lequel", raison: "« dans ce carnet » était introduit par dans, antécédent masculin singulier" },
  { phrase: "Voilà le chemin. Ce chemin descend jusqu'à la mer.", bonne: "qui", raison: "« ce chemin » était sujet dans la seconde phrase" },
  { phrase: "Voilà le chemin. Nous avons pris ce chemin hier.", bonne: "que", raison: "« ce chemin » était complément direct du verbe prendre" },
  { phrase: "Il évoque une décision. Il se souvient très bien de cette décision.", bonne: "dont", raison: "se souvenir DE : le groupe était introduit par de" },
  { phrase: "C'est une réunion. La décision a été prise au cours de cette réunion.", bonne: "au cours de laquelle", raison: "« au cours de cette réunion » : locution en de, antécédent féminin singulier" },
  { phrase: "Ce sont des outils. J'ai besoin de ces outils pour finir.", bonne: "dont", raison: "avoir besoin DE : le groupe était introduit par de" },
];

const PRONOMS_RELATIVISATION: readonly string[] = [
  "qui", "que", "dont", "où", "sur lequel", "dans lequel",
  "à laquelle", "auxquelles", "au cours de laquelle",
];

/* =============================================================================
   5. COMMUTER LA RELATIVE  (2de_rel_commuter_expansion)
   ---------------------------------------------------------------------------
   ⭐ « commutation avec d'autres types d'expansions », dit le IV. Une relative
   n'est qu'une façon d'étendre un nom parmi plusieurs : l'adjectif, le participe
   et le complément du nom font le même travail, plus brièvement. Savoir passer
   de l'une à l'autre, c'est gagner en concision — et c'est exactement ce que la
   contraction de texte demandera.
   ========================================================================== */

/* ⚠️ LA FORME VISÉE EST NOMMÉE DANS LA QUESTION, et ce n'est pas un confort :
   presque toutes ces relatives acceptent DEUX expansions correctes. « la maison
   qui appartient à mes grands-parents » se réduit aussi bien en « la maison de
   mes grands-parents » qu'en « la maison appartenant à mes grands-parents ».
   Sans préciser laquelle on demande, l'item aurait deux bonnes réponses.
   ⭐ Du coup les distracteurs sont les AUTRES expansions, grammaticalement
   correctes : on ne peut plus les écarter à l'oreille, il faut savoir ce qu'est
   un participe, un adjectif, un complément du nom. */
const COMMUTATIONS: readonly Commutation[] = [
  { phrase: "un homme qui est courageux", relative: "qui est courageux", forme: "un adjectif", bonne: "un homme courageux", faux: ["un homme encourageant", "un homme encouragé", "un homme à encourager"], raison: "la relative attributive — « être » suivi d'un adjectif — se réduit à cet adjectif seul" },
  { phrase: "le livre qui a été publié en 2019", relative: "qui a été publié en 2019", forme: "un participe passé", bonne: "le livre publié en 2019", faux: ["le livre à publier en 2019", "le livre publiable en 2019", "le livre de la publication de 2019"], raison: "la relative au passif se réduit au participe passé employé comme épithète" },
  { phrase: "la route qui mène au port", relative: "qui mène au port", forme: "un complément du nom", bonne: "la route du port", faux: ["la route menant au port", "la route portuaire", "la route à mener au port"], raison: "un complément du nom se construit avec une préposition suivie d'un nom" },
  { phrase: "les élèves qui travaillent en silence", relative: "qui travaillent en silence", forme: "un participe présent", bonne: "les élèves travaillant en silence", faux: ["les élèves travailleurs", "les élèves du travail silencieux", "les élèves à faire travailler en silence"], raison: "la relative active se réduit au participe présent, invariable" },
  { phrase: "une décision qui est irréversible", relative: "qui est irréversible", forme: "un adjectif", bonne: "une décision irréversible", faux: ["une décision de l'irréversible", "une décision à ne pas renverser", "une décision renversée"], raison: "la relative attributive se réduit à l'adjectif seul" },
  { phrase: "le rapport qui a été remis hier", relative: "qui a été remis hier", forme: "un participe passé", bonne: "le rapport remis hier", faux: ["le rapport à remettre hier", "le rapport de la remise d'hier", "le rapport remettant hier"], raison: "la relative au passif se réduit au participe passé" },
  { phrase: "la maison qui appartient à mes grands-parents", relative: "qui appartient à mes grands-parents", forme: "un complément du nom", bonne: "la maison de mes grands-parents", faux: ["la maison appartenant à mes grands-parents", "la maison familiale", "la maison à mes grands-parents"], raison: "un complément du nom se construit avec « de » suivi du nom" },
  { phrase: "des nuages qui annoncent l'orage", relative: "qui annoncent l'orage", forme: "un participe présent", bonne: "des nuages annonçant l'orage", faux: ["des nuages annonciateurs", "des nuages d'orage", "des nuages annoncés par l'orage"], raison: "la relative active se réduit au participe présent" },
  { phrase: "un texte qui est difficile à lire", relative: "qui est difficile à lire", forme: "un adjectif", bonne: "un texte difficile à lire", faux: ["un texte de difficulté de lecture", "un texte à lire difficilement", "un texte lu difficilement"], raison: "la relative attributive se réduit à l'adjectif, qui garde son propre complément" },
  { phrase: "les volets qui ont été repeints cet été", relative: "qui ont été repeints cet été", forme: "un participe passé", bonne: "les volets repeints cet été", faux: ["les volets à repeindre cet été", "les volets de la peinture de cet été", "les volets repeignant cet été"], raison: "la relative au passif se réduit au participe passé" },
  { phrase: "le train qui part à six heures", relative: "qui part à six heures", forme: "un complément du nom", bonne: "le train de six heures", faux: ["le train partant à six heures", "le train matinal", "le train à six heures"], raison: "un complément du nom se construit avec une préposition suivie d'un nom, ici « de »" },
  { phrase: "une réponse qui est claire", relative: "qui est claire", forme: "un adjectif", bonne: "une réponse claire", faux: ["une réponse de clarté", "une réponse à clarifier", "une réponse clarifiée"], raison: "la relative attributive se réduit à l'adjectif seul" },
  { phrase: "les candidats qui attendent dans le couloir", relative: "qui attendent dans le couloir", forme: "un participe présent", bonne: "les candidats attendant dans le couloir", faux: ["les candidats attendus dans le couloir", "les candidats du couloir", "les candidats en attente"], raison: "la relative active se réduit au participe présent" },
  { phrase: "la lettre qui a été écrite par sa mère", relative: "qui a été écrite par sa mère", forme: "un participe passé", bonne: "la lettre écrite par sa mère", faux: ["la lettre à écrire par sa mère", "la lettre de sa mère", "la lettre écrivant sa mère"], raison: "la relative au passif se réduit au participe passé, qui garde son complément d'agent" },
  { phrase: "le carnet qui appartient au capitaine", relative: "qui appartient au capitaine", forme: "un complément du nom", bonne: "le carnet du capitaine", faux: ["le carnet appartenant au capitaine", "le carnet au capitaine", "le carnet capitaine"], raison: "un complément du nom se construit avec « de » suivi du nom" },
  { phrase: "un silence qui est complet", relative: "qui est complet", forme: "un adjectif", bonne: "un silence complet", faux: ["un silence de complétude", "un silence à compléter", "un silence complété"], raison: "la relative attributive se réduit à l'adjectif seul" },
];

/* =============================================================================
   6. CE QUE LA VIRGULE CHANGE  (2de_rel_virgule_sens)
   ---------------------------------------------------------------------------
   ⭐⭐ La micro la plus rentable du fichier, et l'une des plus mal connues.
   Sans virgule, la relative TRIE : elle désigne une partie seulement. Avec
   virgules, elle AJOUTE un renseignement sur la totalité. « Les passagers qui
   portaient un gilet ont survécu » et « les passagers, qui portaient un gilet,
   ont survécu » ne disent pas du tout le même nombre de morts.
   ⭐ Les cas vont par paires : même phrase, avec et sans virgules.
   ========================================================================== */

/* ═══════════ LES TABLES DES SECONDS ITEMS (18/08/2026) ═══════════
   ⚠️ `2de_rel_dont` en avait DÉJÀ deux (tpl_1 et tpl_2) : c'est la seule micro
   du fichier qui démarrait en mode complet, et c'est elle qui servait de repli
   aux cinq autres. Les cinq tables ci-dessous complètent les cinq restantes.
   ⚠️ Longueurs de réponses tenues voisines dès l'écriture. */

type Gouverne = { readonly phrase: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };
type Choix = { readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };
type Deux = { readonly phrase: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };
type Developpe = { readonly expansion: string; readonly verbe: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };
type Ponctue = { readonly veut: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };

/* 2 bis. QUI COMMANDE LA PRÉPOSITION ? (2de_rel_auquel_duquel)
   ⭐ Le premier item fait choisir la forme ; celui-ci cherche sa CAUSE. « auquel »
   ou « duquel » ne se devine pas à l'oreille : la préposition vient de la
   construction d'un verbe ou d'un nom de la phrase, et c'est elle qu'il faut
   savoir repérer. Un élève qui trouve le mot gouverneur ne se trompe plus. */
const GOUVERNES: readonly Gouverne[] = [
  { phrase: "Le projet sur lequel il travaille avance bien.", bonne: "travaille", faux: ["projet", "avance", "bien"], raison: "on travaille SUR quelque chose : le verbe impose « sur »" },
  { phrase: "La question à laquelle il n'a pas répondu reste ouverte.", bonne: "répondu", faux: ["question", "reste", "ouverte"], raison: "on répond À quelque chose : le verbe impose « à »" },
  { phrase: "Le carnet dans lequel je notais tout a disparu.", bonne: "notais", faux: ["carnet", "disparu", "tout"], raison: "on note DANS un carnet : le verbe impose « dans »" },
  { phrase: "Les personnes auxquelles elle fait confiance sont rares.", bonne: "confiance", faux: ["personnes", "rares", "elle"], raison: "on fait confiance À quelqu'un : c'est le nom « confiance » qui appelle « à »" },
  { phrase: "Le sujet dont il se souvient le mieux est ancien.", bonne: "souvient", faux: ["sujet", "ancien", "mieux"], raison: "on se souvient DE quelque chose : le verbe impose « de »" },
  { phrase: "La table sous laquelle il s'était caché était lourde.", bonne: "caché", faux: ["table", "lourde", "était"], raison: "on se cache SOUS : le verbe impose « sous »" },
  { phrase: "Le collègue avec qui il partage son bureau part demain.", bonne: "partage", faux: ["collègue", "bureau", "demain"], raison: "on partage AVEC quelqu'un : le verbe impose « avec »" },
  { phrase: "Le livre dont il a besoin est épuisé depuis un an.", bonne: "besoin", faux: ["livre", "épuisé", "an"], raison: "on a besoin DE : c'est le nom « besoin » qui appelle « de »" },
  { phrase: "L'idée à laquelle il tient le plus est très simple.", bonne: "tient", faux: ["idée", "simple", "plus"], raison: "on tient À une idée : le verbe impose « à »" },
  { phrase: "L'outil avec lequel il grave le bois est ancien.", bonne: "grave", faux: ["outil", "bois", "ancien"], raison: "on grave AVEC un outil : le verbe impose « avec »" },
];

/* 3 bis. OÙ « QUE » EST-IL RELATIF ? (2de_rel_vs_conjonctive)
   ⛔ Les quatre phrases portent le mot « que ». Une seule fois il remplace un
   nom et occupe une fonction dans sa proposition — c'est le pronom relatif.
   Les trois autres fois, il ne remplace rien : il ne fait qu'introduire, et
   c'est la conjonction. Le programme demande exactement cette distinction. */
const OU_RELATIF: readonly Choix[] = [
  { bonne: "Le livre que j'ai lu m'a bouleversé.", faux: ["Je crois que tu as raison.", "Il faut que chacun rende sa copie.", "Elle affirme qu'elle n'a rien vu."], raison: "« que » remplace « le livre » et en est le complément direct : on a lu QUOI ?" },
  { bonne: "Le chemin que nous avons pris descend à la mer.", faux: ["Je sais que la salle est fermée.", "Il espère que tout ira bien.", "Il faut que tu viennes demain."], raison: "« que » remplace « le chemin » et complète « avons pris »" },
  { bonne: "La décision qu'ils ont prise engage tout le monde.", faux: ["Elle pense que c'est trop tard.", "Nous voulons que cela cesse.", "Il semble que tout aille bien."], raison: "« que » remplace « la décision » : d'où l'accord du participe « prise »" },
  { bonne: "Les paroles qu'il a prononcées sont restées.", faux: ["On dit que le texte est de sa main.", "Je doute qu'il ait compris.", "Il craint que la pluie ne revienne."], raison: "« que » remplace « les paroles » et commande l'accord de « prononcées »" },
  { bonne: "L'année que nous avons passée là-bas fut la plus belle.", faux: ["Je vois bien que tu hésites.", "Il souhaite que nous restions.", "Il est possible que ce soit vrai."], raison: "« que » remplace « l'année » et occupe une fonction dans la subordonnée" },
  { bonne: "Le témoin que la police a entendu s'est rétracté.", faux: ["Il jure qu'il n'a rien vu.", "Il faudrait que quelqu'un parle.", "Elle regrette que ce soit fini."], raison: "« que » remplace « le témoin » : la police a entendu QUI ?" },
];

/* 4 bis. DÉFAIRE LA RELATIVE (2de_rel_relativisation)
   Le premier item fond deux phrases en une. Celui-ci les sépare. ⭐ Le trajet
   inverse est le plus formateur : pour retrouver les deux phrases, il faut
   d'abord savoir quelle fonction le pronom occupait — et c'est justement ce
   qu'on ne peut pas deviner. */
const DEFAITS: readonly Deux[] = [
  { phrase: "Le carnet dans lequel je notais mes observations a disparu.", bonne: "Le carnet a disparu. Je notais mes observations dans ce carnet.", faux: ["Le carnet a disparu. Ce carnet notait mes observations.", "Le carnet a disparu. J'ai noté ce carnet.", "Le carnet a disparu. Mes observations notaient ce carnet."], raison: "« dans lequel » remplace « dans ce carnet », complément de lieu" },
  { phrase: "Le roman dont tout le monde parle vient de sortir.", bonne: "Le roman vient de sortir. Tout le monde parle de ce roman.", faux: ["Le roman vient de sortir. Ce roman parle de tout le monde.", "Le roman vient de sortir. Tout le monde parle à ce roman.", "Le roman vient de sortir. Tout le monde parle ce roman."], raison: "« dont » remplace « de ce roman » : parler DE" },
  { phrase: "La route qui mène au port est fermée.", bonne: "La route est fermée. Cette route mène au port.", faux: ["La route est fermée. Le port mène à cette route.", "La route est fermée. On mène cette route au port.", "La route est fermée. Cette route est menée au port."], raison: "« qui » remplace « cette route », sujet du verbe mener" },
  { phrase: "L'élève dont le père enseigne ici a déménagé.", bonne: "L'élève a déménagé. Le père de cet élève enseigne ici.", faux: ["L'élève a déménagé. Cet élève enseigne à son père.", "L'élève a déménagé. Le père enseigne cet élève.", "L'élève a déménagé. Cet élève est le père d'ici."], raison: "« dont » remplace « de cet élève », complément du nom « père »" },
  { phrase: "Le village où mon père est né a disparu.", bonne: "Le village a disparu. Mon père est né dans ce village.", faux: ["Le village a disparu. Ce village est né de mon père.", "Le village a disparu. Mon père a fait naitre ce village.", "Le village a disparu. Mon père est né de ce village."], raison: "« où » remplace « dans ce village », complément de lieu" },
  { phrase: "La question à laquelle il n'a pas répondu reste ouverte.", bonne: "La question reste ouverte. Il n'a pas répondu à cette question.", faux: ["La question reste ouverte. Cette question n'a pas répondu.", "La question reste ouverte. Il n'a pas répondu de cette question.", "La question reste ouverte. Il n'a pas répondu cette question."], raison: "« à laquelle » remplace « à cette question » : répondre À" },
  { phrase: "Le projet sur lequel il travaille avance bien.", bonne: "Le projet avance bien. Il travaille sur ce projet.", faux: ["Le projet avance bien. Ce projet travaille sur lui.", "Le projet avance bien. Il travaille ce projet.", "Le projet avance bien. Il travaille avec ce projet."], raison: "« sur lequel » remplace « sur ce projet » : travailler SUR" },
  { phrase: "Les outils dont j'ai besoin sont restés au garage.", bonne: "Les outils sont restés au garage. J'ai besoin de ces outils.", faux: ["Les outils sont restés au garage. Ces outils ont besoin de moi.", "Les outils sont restés au garage. J'ai besoin à ces outils.", "Les outils sont restés au garage. J'ai ces outils en besoin."], raison: "« dont » remplace « de ces outils » : avoir besoin DE" },
];

/* 5 bis. DÉVELOPPER L'EXPANSION EN RELATIVE (2de_rel_commuter_expansion)
   Le premier item réduit une relative ; celui-ci la rétablit.
   ⚠️ MÊME PRÉCAUTION QU'EN HAUT, PRISE PAR L'AUTRE BOUT : une expansion se
   développe souvent de deux façons correctes (« le train de six heures » peut
   partir ou être pris à six heures). Le VERBE À EMPLOYER est donc nommé dans la
   question — sans quoi l'item aurait deux bonnes réponses.
   ⭐ Les distracteurs sont alors des relatives bâties sur le même verbe mais à
   la mauvaise voix, au mauvais temps ou avec le mauvais pronom : on ne les
   écarte plus à l'oreille. */
const DEVELOPPES: readonly Developpe[] = [
  { expansion: "le train de six heures", verbe: "partir", bonne: "le train qui part à six heures", faux: ["le train qui est parti à six heures", "le train dont on part à six heures", "le train que l'on part à six heures"], raison: "« qui » est sujet du verbe partir, au présent comme dans l'expansion" },
  { expansion: "les élèves travaillant en silence", verbe: "travailler", bonne: "les élèves qui travaillent en silence", faux: ["les élèves qui ont travaillé en silence", "les élèves que l'on fait travailler en silence", "les élèves dont le travail est silencieux"], raison: "le participe présent correspond à une relative active au présent" },
  { expansion: "le livre publié en 2019", verbe: "publier", bonne: "le livre qui a été publié en 2019", faux: ["le livre qui a publié en 2019", "le livre qui publie en 2019", "le livre dont on publie en 2019"], raison: "le participe passé épithète correspond à une relative au PASSIF" },
  { expansion: "la maison de mes grands-parents", verbe: "appartenir", bonne: "la maison qui appartient à mes grands-parents", faux: ["la maison dont mes grands-parents appartiennent", "la maison que mes grands-parents appartiennent", "la maison où appartiennent mes grands-parents"], raison: "« appartenir » se construit avec à, et la maison en est le sujet" },
  { expansion: "les volets repeints cet été", verbe: "repeindre", bonne: "les volets qui ont été repeints cet été", faux: ["les volets qui ont repeint cet été", "les volets qui repeignent cet été", "les volets dont on a repeint cet été"], raison: "le participe passé épithète correspond à une relative au passif" },
  { expansion: "le carnet du capitaine", verbe: "appartenir", bonne: "le carnet qui appartient au capitaine", faux: ["le carnet dont le capitaine appartient", "le carnet que le capitaine appartient", "le carnet où le capitaine appartient"], raison: "le complément du nom en « de » se développe ici par « appartenir à »" },
  { expansion: "des nuages annonçant l'orage", verbe: "annoncer", bonne: "des nuages qui annoncent l'orage", faux: ["des nuages qui sont annoncés par l'orage", "des nuages qu'annonce l'orage", "des nuages dont l'orage est annoncé"], raison: "le participe présent est ACTIF : ce sont les nuages qui annoncent" },
  { expansion: "la lettre écrite par sa mère", verbe: "écrire", bonne: "la lettre qui a été écrite par sa mère", faux: ["la lettre qui a écrit sa mère", "la lettre qu'écrit sa mère", "la lettre dont sa mère a écrit"], raison: "le complément d'agent « par sa mère » signale le passif" },
  { expansion: "la route du port", verbe: "mener", bonne: "la route qui mène au port", faux: ["la route dont le port mène", "la route que le port mène", "la route où mène le port"], raison: "« la route » est sujet du verbe mener, le port en est le terme" },
  { expansion: "les candidats en attente", verbe: "attendre", bonne: "les candidats qui attendent", faux: ["les candidats qui sont attendus", "les candidats qu'on attend", "les candidats dont on attend"], raison: "ce sont les candidats qui attendent : la relative est active" },
];

/* 6 bis. QUELLE PHRASE DIT CELA ? (2de_rel_virgule_sens)
   Le premier item lit le sens d'une ponctuation donnée ; celui-ci part du sens
   voulu. ⛔ Les quatre propositions sont TOUTES correctes en français — sans
   virgules, entre virgules, en relative détachée après le verbe, en participiale.
   Trois d'entre elles disent la même chose (la totalité), une seule trie. C'est
   voulu : l'élève doit voir que la restriction est l'exception, et qu'elle tient
   à deux virgules absentes. */
const PONCTUES: readonly Ponctue[] = [
  { veut: "que seuls certains élèves avaient révisé, et que ce sont eux qui ont réussi", bonne: "Les élèves qui avaient révisé ont réussi.", faux: ["Les élèves, qui avaient révisé, ont réussi.", "Les élèves ont réussi, qui avaient révisé.", "Les élèves, ayant révisé, ont réussi."], raison: "sans virgules, la relative trie : elle ne désigne qu'une partie du groupe" },
  { veut: "que tous les élèves avaient révisé, et que tous ont réussi", bonne: "Les élèves, qui avaient révisé, ont réussi.", faux: ["Les élèves qui avaient révisé ont réussi.", "Seuls les élèves qui avaient révisé ont réussi.", "Les élèves qui avaient révisé sont les seuls à réussir."], raison: "entre virgules, la relative ajoute un renseignement sur la totalité" },
  { veut: "que seuls certains passagers portaient un gilet, et que ce sont eux qui ont survécu", bonne: "Les passagers qui portaient un gilet ont survécu.", faux: ["Les passagers, qui portaient un gilet, ont survécu.", "Les passagers ont survécu, qui portaient un gilet.", "Les passagers, portant un gilet, ont survécu."], raison: "sans virgules, la relative restreint : les autres passagers n'ont pas survécu" },
  { veut: "que tous les passagers portaient un gilet, et que tous ont survécu", bonne: "Les passagers, qui portaient un gilet, ont survécu.", faux: ["Les passagers qui portaient un gilet ont survécu.", "Seuls les passagers qui portaient un gilet ont survécu.", "Les passagers qui portaient un gilet furent les seuls à survivre."], raison: "entre virgules, la relative renseigne sur la totalité du groupe" },
  { veut: "que seuls certains témoins avaient tout vu, et que ce sont eux qui ont parlé", bonne: "Les témoins qui avaient tout vu ont parlé.", faux: ["Les témoins, qui avaient tout vu, ont parlé.", "Les témoins ont parlé, qui avaient tout vu.", "Les témoins, ayant tout vu, ont parlé."], raison: "sans virgules, la relative distingue une partie du groupe" },
  { veut: "que tous les témoins avaient tout vu, et que tous ont parlé", bonne: "Les témoins, qui avaient tout vu, ont parlé.", faux: ["Les témoins qui avaient tout vu ont parlé.", "Seuls les témoins qui avaient tout vu ont parlé.", "Les témoins qui avaient tout vu furent les seuls à parler."], raison: "entre virgules, la relative n'exclut personne" },
];

const VIRGULES: readonly Virgule[] = [
  {
    phrase: "Les élèves qui avaient révisé ont réussi.",
    rep: "seuls ceux qui avaient révisé ont réussi",
    faux: ["tous les élèves avaient révisé et tous ont réussi", "aucun élève n'avait révisé", "les élèves ont réussi sans avoir révisé"],
    raison: "sans virgule, la relative trie : elle désigne une partie du groupe",
  },
  {
    phrase: "Les élèves, qui avaient révisé, ont réussi.",
    rep: "tous les élèves avaient révisé, et tous ont réussi",
    faux: ["seuls ceux qui avaient révisé ont réussi", "aucun élève n'avait révisé", "les élèves ont réussi sans avoir révisé"],
    raison: "entre virgules, la relative ajoute un renseignement sur la totalité du groupe",
  },
  {
    phrase: "Les passagers qui portaient un gilet ont survécu.",
    rep: "seuls ceux qui portaient un gilet ont survécu",
    faux: ["tous les passagers portaient un gilet et tous ont survécu", "aucun passager ne portait de gilet", "les gilets n'ont servi à rien"],
    raison: "sans virgule, la relative restreint le groupe désigné",
  },
  {
    phrase: "Les passagers, qui portaient un gilet, ont survécu.",
    rep: "tous les passagers portaient un gilet, et tous ont survécu",
    faux: ["seuls ceux qui portaient un gilet ont survécu", "aucun passager ne portait de gilet", "les gilets n'ont servi à rien"],
    raison: "entre virgules, la relative renseigne sur l'ensemble du groupe",
  },
  {
    phrase: "Mon frère qui habite à Paris vient nous voir.",
    rep: "j'ai plusieurs frères, et c'est celui de Paris qui vient",
    faux: ["j'ai un seul frère, et il habite à Paris", "j'ai un seul frère, et il n'habite pas à Paris", "mes frères habitent tous à Paris"],
    raison: "sans virgule, la relative sert à distinguer un frère parmi d'autres",
  },
  {
    phrase: "Mon frère, qui habite à Paris, vient nous voir.",
    rep: "j'ai un seul frère, et j'ajoute au passage qu'il habite à Paris",
    faux: ["j'ai plusieurs frères, et c'est celui de Paris qui vient", "j'ai un seul frère, et il n'habite pas à Paris", "mes frères habitent tous à Paris"],
    raison: "entre virgules, la relative n'identifie pas : elle ajoute un renseignement",
  },
  {
    phrase: "Les candidats qui avaient un dossier complet ont été reçus.",
    rep: "seuls ceux dont le dossier était complet ont été reçus",
    faux: ["tous les candidats avaient un dossier complet et tous ont été reçus", "aucun dossier n'était complet", "les dossiers n'ont pas été examinés"],
    raison: "sans virgule, la relative trie parmi les candidats",
  },
  {
    phrase: "Les candidats, qui avaient un dossier complet, ont été reçus.",
    rep: "tous les candidats avaient un dossier complet, et tous ont été reçus",
    faux: ["seuls ceux dont le dossier était complet ont été reçus", "aucun dossier n'était complet", "les dossiers n'ont pas été examinés"],
    raison: "entre virgules, la relative renseigne sur l'ensemble",
  },
  {
    phrase: "Les livres qui étaient abimés ont été retirés du rayon.",
    rep: "seuls les livres abimés ont été retirés",
    faux: ["tous les livres étaient abimés et tous ont été retirés", "aucun livre n'était abimé", "les livres ont été retirés sans motif"],
    raison: "sans virgule, la relative restreint",
  },
  {
    phrase: "Les livres, qui étaient abimés, ont été retirés du rayon.",
    rep: "tous les livres étaient abimés, et tous ont été retirés",
    faux: ["seuls les livres abimés ont été retirés", "aucun livre n'était abimé", "les livres ont été retirés sans motif"],
    raison: "entre virgules, la relative explique le retrait de la totalité",
  },
  {
    phrase: "Les habitants qui vivaient près de la rivière ont été évacués.",
    rep: "seuls ceux qui vivaient près de la rivière ont été évacués",
    faux: ["tous les habitants vivaient près de la rivière et tous ont été évacués", "personne ne vivait près de la rivière", "l'évacuation n'a pas eu lieu"],
    raison: "sans virgule, la relative désigne une partie de la population",
  },
  {
    phrase: "Les habitants, qui vivaient près de la rivière, ont été évacués.",
    rep: "tous les habitants vivaient près de la rivière, et tous ont été évacués",
    faux: ["seuls ceux qui vivaient près de la rivière ont été évacués", "personne ne vivait près de la rivière", "l'évacuation n'a pas eu lieu"],
    raison: "entre virgules, la relative vaut pour l'ensemble des habitants",
  },
  {
    phrase: "Les employés qui avaient signé la pétition ont été convoqués.",
    rep: "seuls les signataires ont été convoqués",
    faux: ["tous les employés avaient signé et tous ont été convoqués", "personne n'avait signé", "la pétition a été retirée"],
    raison: "sans virgule, la relative trie",
  },
  {
    phrase: "Les employés, qui avaient signé la pétition, ont été convoqués.",
    rep: "tous les employés avaient signé, et tous ont été convoqués",
    faux: ["seuls les signataires ont été convoqués", "personne n'avait signé", "la pétition a été retirée"],
    raison: "entre virgules, la relative renseigne sur la totalité",
  },
  {
    phrase: "Les copies qui étaient illisibles ont été écartées.",
    rep: "seules les copies illisibles ont été écartées",
    faux: ["toutes les copies étaient illisibles et toutes ont été écartées", "aucune copie n'était illisible", "les copies ont été écartées au hasard"],
    raison: "sans virgule, la relative restreint le groupe",
  },
  {
    phrase: "Les copies, qui étaient illisibles, ont été écartées.",
    rep: "toutes les copies étaient illisibles, et toutes ont été écartées",
    faux: ["seules les copies illisibles ont été écartées", "aucune copie n'était illisible", "les copies ont été écartées au hasard"],
    raison: "entre virgules, la relative explique pourquoi tout a été écarté",
  },
];

export const relativesSecondeBank: TutorBankItemV4[] = [
  {
    kind: "template",
    id: "2de_rel_dont_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "relatives_2de",
    microId: "2de_rel_dont",
    difficulty: 2,
    theme: "neutral",
    hint: "Reconstruis la phrase sans le pronom : si un « de » apparait, c'est « dont ».",
    tags: ["seconde", "grammaire", "relatives", "dont", "template"],
    generate: () => {
      const c = randomChoice(CAS_DONT);
      return {
        text: `« ${c.phrase} »\n\nQuel pronom relatif convient ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, PRONOMS_SIMPLES),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "« dont » remplace un groupe introduit par DE : parler de quelque chose, avoir besoin de quelque chose, le toit de la maison. Les autres pronoms correspondent à d'autres fonctions : « qui » pour le sujet, « que » pour le complément direct, « où » pour le lieu et le temps.",
          "Défais la relative : refais la phrase simple qu'elle contient. La préposition qui apparait, ou son absence, désigne le pronom.",
          `Ici, ${c.raison}.`,
          `Le pronom attendu est « ${c.bonne} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_rel_dont_tpl_2",
    niveau: "seconde",
    matiere: "francais",
    notionId: "relatives_2de",
    microId: "2de_rel_dont",
    difficulty: 3,
    theme: "neutral",
    hint: "« dont » contient déjà un « de ». Cherche le mot qui le répète inutilement.",
    tags: ["seconde", "grammaire", "relatives", "dont", "template"],
    generate: () => {
      const c = randomChoice(CAS_DONT_FAUTIF);
      return {
        text: `On lit souvent : « ${c.phrase} »\n\nQuelle est la forme correcte ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "« dont » remplace à lui seul un groupe entier introduit par de. Reprendre ce groupe une seconde fois — par un possessif, par « en », par une préposition — revient à le dire deux fois. C'est l'erreur la plus fréquente de la relative.",
          "Remplace « dont » par « de qui » ou « de quoi » et relis : si la phrase contient alors deux compléments identiques, il faut en supprimer un.",
          `Ici, ${c.raison}.`,
          `On écrit : « ${c.bonne} »`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_rel_auquel_duquel_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "relatives_2de",
    microId: "2de_rel_auquel_duquel",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux questions, pas une : quelle préposition le verbe réclame-t-il, et quel est le genre de l'antécédent ?",
    tags: ["seconde", "grammaire", "relatives", "template"],
    generate: () => {
      const c = randomChoice(CAS_COMPOSES);
      return {
        text: `« ${c.phrase} »\n\nQuelle forme convient ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, PRONOMS_COMPOSES),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Ces pronoms portent deux informations à la fois : la préposition que le verbe ou la locution réclame, et le genre et le nombre de l'antécédent. « auquel » vaut à + lequel, « duquel » vaut de + lequel, et les deux s'accordent.",
          "Pose d'abord la question au verbe : travailler à quoi, se souvenir de quoi, à côté de quoi. Puis regarde le nom repris, et accorde.",
          `Ici, ${c.raison}.`,
          `La forme attendue est « ${c.bonne} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_rel_vs_conjonctive_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "relatives_2de",
    microId: "2de_rel_vs_conjonctive",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche ce que la subordonnée complète : un nom juste avant elle, ou le verbe de la principale.",
    tags: ["seconde", "grammaire", "relatives", "conjonctives", "template"],
    generate: () => {
      const c = randomChoice(CAS_COMPLETE);
      return {
        text: `« ${c.phrase} »\n\nQue complète la subordonnée « ${c.subordonnee} » ?`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, COMPLEMENTS),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une relative complète un NOM : elle a un antécédent, juste avant elle, et elle en précise le sens. Une conjonctive complète un VERBE, dont elle est le complément d'objet, ou la phrase entière, qu'elle situe ou qu'elle nuance. Le mot « que » peut introduire les deux : seule la fonction tranche.",
          "Supprime la subordonnée. S'il manque une précision sur un nom, c'était une relative. S'il manque le complément du verbe, c'était une conjonctive.",
          `Ici, ${c.raison}.`,
          `Elle complète ${c.rep}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_rel_relativisation_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "relatives_2de",
    microId: "2de_rel_relativisation",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde la fonction qu'occupait le groupe répété dans la seconde phrase : c'est elle qui choisit le pronom.",
    tags: ["seconde", "grammaire", "relatives", "relativisation", "template"],
    generate: () => {
      const c = randomChoice(RELATIVISATIONS);
      return {
        text: `« ${c.phrase} »\n\nPar quel pronom relatif fondre ces deux phrases en une seule ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, PRONOMS_RELATIVISATION),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Relativiser, c'est fondre deux phrases en une : la seconde devient une relative accrochée au nom qu'elles ont en commun. Le pronom choisi dépend de la FONCTION qu'occupait ce nom dans la seconde phrase — sujet, complément direct, complément en de, complément de lieu.",
          "Repère le groupe répété dans la seconde phrase, puis demande-toi ce qu'il y faisait. Sujet donne « qui », complément direct donne « que », complément en de donne « dont ».",
          `Ici, ${c.raison}.`,
          `Le pronom attendu est « ${c.bonne} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_rel_commuter_expansion_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "relatives_2de",
    microId: "2de_rel_commuter_expansion",
    difficulty: 3,
    theme: "neutral",
    hint: "Les quatre propositions sont des groupes corrects. Une seule est de la forme demandée.",
    tags: ["seconde", "grammaire", "relatives", "commutation", "template"],
    generate: () => {
      const c = randomChoice(COMMUTATIONS);
      return {
        text: `« ${c.phrase} »\n\nRemplace « ${c.relative} » par ${c.forme}, sans changer le sens. Quelle forme obtient-on ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une relative n'est qu'une manière d'étendre un nom parmi plusieurs. L'adjectif, le participe présent, le participe passé et le complément du nom font le même travail, en moins de mots. Le programme demande de savoir passer de l'une à l'autre.",
          "Regarde le verbe de la relative : « être » suivi d'un adjectif donne un adjectif, un passif donne un participe passé, un verbe actif donne un participe présent, « appartenir à » donne un complément du nom en de.",
          `Ici, ${c.raison}.`,
          `On écrit : « ${c.bonne} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_rel_virgule_sens_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "relatives_2de",
    microId: "2de_rel_virgule_sens",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte : la phrase parle-t-elle de tout le groupe, ou seulement d'une partie ?",
    tags: ["seconde", "grammaire", "relatives", "ponctuation", "template"],
    generate: () => {
      const c = randomChoice(VIRGULES);
      return {
        text: `« ${c.phrase} »\n\nQue dit exactement cette phrase ?`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, c.faux),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Sans virgule, la relative TRIE : elle sert à désigner une partie seulement du groupe, et sans elle on ne saurait pas de qui l'on parle. Entre virgules, elle AJOUTE un renseignement sur la totalité, et on pourrait la supprimer sans rien changer à l'identification.",
          "Essaie de supprimer la relative. Si la phrase désigne encore le même monde, la relative était détachée. Si l'on ne sait plus de qui l'on parle, elle triait.",
          `Ici, ${c.raison}.`,
          `La phrase dit que ${c.rep}.`,
        ),
      };
    },
  },

  /* ══════════════ LES SECONDS ITEMS ══════════════ */

  {
    kind: "template",
    id: "2de_rel_auquel_duquel_tpl_2",
    niveau: "seconde",
    matiere: "francais",
    notionId: "relatives_2de",
    microId: "2de_rel_auquel_duquel",
    difficulty: 4,
    theme: "neutral",
    hint: "Refais la phrase simple : « il travaille … ce projet ». Le mot qui réclame une préposition est celui-là.",
    tags: ["seconde", "grammaire", "relatives", "template"],
    generate: () => {
      const c = randomChoice(GOUVERNES);
      return {
        text: `« ${c.phrase} »\n\nQuel mot impose la préposition contenue dans le pronom relatif ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "« auquel », « duquel », « sur lequel » sont des pronoms composés : une préposition soudée à un pronom. Cette préposition ne vient jamais de l'antécédent — elle vient de la construction d'un verbe ou d'un nom de la subordonnée. On répond À, on se souvient DE, on a besoin DE, on travaille SUR.",
          "Défais la relative en deux phrases : « … et il travaille SUR ce projet ». Le mot dont dépend cette préposition est celui qui commande.",
          `Ici, ${c.raison}.`,
          `C'est « ${c.bonne} » qui l'impose.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_rel_vs_conjonctive_tpl_2",
    niveau: "seconde",
    matiere: "francais",
    notionId: "relatives_2de",
    microId: "2de_rel_vs_conjonctive",
    difficulty: 3,
    theme: "neutral",
    hint: "Demande-toi si « que » remplace un mot déjà écrit. S'il ne remplace rien, ce n'est pas un pronom.",
    tags: ["seconde", "grammaire", "relatives", "conjonctive", "template"],
    generate: () => {
      const c = randomChoice(OU_RELATIF);
      return {
        text: `Dans laquelle de ces phrases « que » est-il un pronom relatif ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le programme demande de distinguer les relatives des conjonctives, et le même mot « que » sert aux deux. Le pronom relatif REMPLACE un nom déjà écrit et occupe une fonction dans sa proposition ; la conjonction ne remplace rien, elle ne fait qu'introduire une subordonnée complément du verbe.",
          "Deux vérifications rapides : le mot a-t-il un antécédent juste avant ? et peut-on lui poser une question comme « on a lu quoi ? ». Si oui aux deux, c'est un relatif.",
          `Ici, ${c.raison}.`,
          `C'est : « ${c.bonne} »`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_rel_relativisation_tpl_2",
    niveau: "seconde",
    matiere: "francais",
    notionId: "relatives_2de",
    microId: "2de_rel_relativisation",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche d'abord ce que le pronom remplaçait, préposition comprise. Puis remets ce groupe à sa place.",
    tags: ["seconde", "grammaire", "relatives", "relativisation", "template"],
    generate: () => {
      const c = randomChoice(DEFAITS);
      return {
        text: `« ${c.phrase} »\n\nQuelles étaient les deux phrases indépendantes de départ ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Relativiser, c'est fondre deux phrases en une en remplaçant le groupe répété par un pronom. Défaire l'opération oblige à retrouver ce groupe entier — préposition comprise —, et donc la fonction qu'il occupait. C'est le contrôle le plus sûr : si les deux phrases obtenues sont correctes, le pronom était le bon.",
          "Repère le pronom, puis demande-toi par quoi le remplacer pour reconstituer une phrase complète : « ce roman », « de ce roman », « dans ce carnet ».",
          `Ici, ${c.raison}.`,
          `Les deux phrases étaient : « ${c.bonne} »`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_rel_commuter_expansion_tpl_2",
    niveau: "seconde",
    matiere: "francais",
    notionId: "relatives_2de",
    microId: "2de_rel_commuter_expansion",
    difficulty: 4,
    theme: "neutral",
    hint: "Demande-toi qui fait l'action. Si le nom la subit, la relative doit être au passif.",
    tags: ["seconde", "grammaire", "relatives", "commutation", "template"],
    generate: () => {
      const c = randomChoice(DEVELOPPES);
      return {
        text: `« ${c.expansion} »\n\nDéveloppe cette expansion en relative, avec le verbe « ${c.verbe} ».\nQuelle forme obtient-on ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Adjectif, participe et complément du nom disent en peu de mots ce qu'une relative dit au long. Développer, c'est refaire le chemin en sens inverse — et l'on découvre alors ce que la forme brève avait tu : qui fait l'action. Un participe présent est actif, un participe passé épithète est presque toujours passif.",
          "Pose la question « qui fait quoi ? ». Si le nom fait l'action, la relative est active ; s'il la subit, elle passe au passif, avec l'auxiliaire être.",
          `Ici, ${c.raison}.`,
          `On obtient : « ${c.bonne} »`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_rel_virgule_sens_tpl_2",
    niveau: "seconde",
    matiere: "francais",
    notionId: "relatives_2de",
    microId: "2de_rel_virgule_sens",
    difficulty: 4,
    theme: "neutral",
    hint: "Les quatre phrases sont correctes. Trois parlent de tout le groupe, une seule n'en désigne qu'une partie.",
    tags: ["seconde", "grammaire", "relatives", "ponctuation", "template"],
    generate: () => {
      const c = randomChoice(PONCTUES);
      return {
        text: `On veut dire ${c.veut}.\nQuelle phrase écrire ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Deux virgules changent le nombre de personnes dont on parle. Sans elles, la relative trie : elle désigne une partie du groupe, et le reste est exclu. Avec elles, elle ajoute un renseignement qui vaut pour tous. C'est la même phrase, aux mêmes mots, et ce n'est pas le même monde.",
          "Supprime la relative par la pensée. Si tu sais encore de qui l'on parle, elle était détachée et concernait tout le monde. Si tu ne le sais plus, c'est qu'elle triait.",
          `Ici, ${c.raison}.`,
          `On écrit : « ${c.bonne} »`,
        ),
      };
    },
  },
];
