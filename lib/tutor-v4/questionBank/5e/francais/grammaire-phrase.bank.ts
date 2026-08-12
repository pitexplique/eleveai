// lib/tutor-v4/questionBank/5e/francais/grammaire-phrase.bank.ts
//
// LA PHRASE ET SES CONSTITUANTS EN 5e — écrit le 12/08/2026.
//
// ⚠️ RÉFÉRENCE NEUVE : BO n° 10 du 5 mars 2026 (arrêté du 18 février 2026),
// « Annexe 1 – Programme de français pour le cycle 4 ». Applicable en 5e à la
// RENTRÉE 2026, en 4e à la rentrée 2027, en 3e à la rentrée 2028.
// ⛔ Ne pas recopier ce fichier en 4e ni en 3e avant leur date : elles suivent
// encore le programme de 2015 modifié en 2018.
//
// L'ÉTAT DE DÉPART, mesuré : 5e, 4e et 3e portaient les 34 MÊMES micros, à deux
// libellés près, et QUATRE d'entre elles couvraient toute la grammaire du
// cycle — « identifier les constituants », « repérer sujet, verbe,
// compléments », « accorder », « distinguer oral et écrit ». Le BO en détaille
// treize pour la seule classe de 5e.
//
// PÉRIMÈTRE — « Comprendre et expliquer le fonctionnement d'une phrase » :
//   Comprendre ce qu'est une phrase — « Identifier et réinvestir le rôle des
//   différents signes de ponctuation en lien avec les constituants de la
//   phrase » ; « Identifier trois types de phrases » ; « Reconnaitre trois
//   formes de phrases et leurs caractéristiques (exclamative et négative) » ;
//   « Comprendre et expliciter la différence entre phrase simple, phrase
//   complexe, phrase non verbale » ; « Comprendre les effets de sens produits
//   par les relations de juxtaposition et coordination ».
//   Connaitre les constituants — « Identifier le sujet, les compléments
//   d'objet direct et indirect, l'attribut du sujet, les compléments
//   circonstanciels de lieu, de cause, de temps et de manière, en utilisant
//   des manipulations syntaxiques » ; « Comprendre la structure du groupe
//   nominal minimal et du groupe nominal étendu » ; « Identifier les
//   prépositions, les adverbes et les mots subordonnants » ; « Distinguer les
//   déterminants et les pronoms » ; « Identifier les pronoms personnels,
//   démonstratifs et indéfinis » ; « Identifier les mots coordonnants et
//   comprendre leurs rôles syntaxique et sémantique ».
//
// ⛔ AUCUN ITEM NE COMMENCE PAR « Un(e) X est… ». On donne l'énoncé, et on
// demande ce que la forme FAIT — les définitions de cours ont été purgées du
// cycle 4 le 01/08/2026, on ne les réintroduit pas.
// ⛔ QCM uniquement, quatre propositions : 25 % au hasard contre 33 %.
// ⚠️ Chaque énoncé est DISTINCT : le tirage des épreuves déduplique sur le
// texte, et des items qui partagent un intitulé se réduisent à un seul.
//
// ⚠️ Tables typées à la main, jamais en `as const`.

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

type Ponctuation = { readonly phrase: string; readonly signe: string; readonly role: string; readonly faux: readonly string[] };
type TypeForme = { readonly phrase: string; readonly rep: string };
type Structure = { readonly phrase: string; readonly cat: string; readonly verbes: number };
type Lien = { readonly phrase: string; readonly rapport: string };
type Fonction = { readonly phrase: string; readonly groupe: string; readonly fonction: string };
type Attribut = { readonly phrase: string; readonly groupe: string; readonly attributif: boolean; readonly verbe: string };
type Circonstanciel = { readonly phrase: string; readonly groupe: string; readonly cc: string };
type GroupeNominal = { readonly gn: string; readonly noyau: string; readonly expansion: string };
type MotClasse = { readonly phrase: string; readonly mot: string; readonly classe: string };
type DetPro = { readonly phrase: string; readonly mot: string; readonly determinant: boolean; readonly nom: string; readonly remplace: string };
type Coordonnant = { readonly phrase: string; readonly mot: string; readonly rapport: string };

/* =============================================================================
   1. LA PONCTUATION, EN LIEN AVEC LES CONSTITUANTS
   ---------------------------------------------------------------------------
   Le BO ne demande pas de NOMMER les signes — l'élève les connait depuis le
   cycle 3 — mais d'expliquer ce qu'ils FONT dans la phrase. Une virgule ne
   « marque pas une pause » : elle détache, elle isole, elle sépare, et ce
   n'est pas la même chose.
   ========================================================================== */

const PONCTUATIONS: readonly Ponctuation[] = [
  {
    phrase: "Les élèves, qui avaient marché deux heures, s'assirent sur le muret.",
    signe: "les deux virgules",
    role: "elles isolent une proposition relative qui ajoute un renseignement",
    faux: ["elles séparent les termes d'une énumération", "elles annoncent une explication", "elles séparent le sujet de son verbe"],
  },
  {
    phrase: "Dans son sac, il avait un carnet, un crayon, une gourde et une carte.",
    signe: "les virgules du milieu de phrase",
    role: "elles séparent les termes d'une énumération",
    faux: ["elles isolent une proposition relative", "elles encadrent une précision qu'on pourrait retirer", "elles annoncent des paroles rapportées"],
  },
  {
    phrase: "Le lendemain, le vent tomba.",
    signe: "la virgule",
    role: "elle détache un complément circonstanciel placé en tête de phrase",
    faux: ["elle sépare le sujet de son verbe", "elle sépare deux propositions coordonnées", "elle annonce une énumération"],
  },
  {
    phrase: "Il n'y avait plus rien à faire : le bateau était parti.",
    signe: "les deux-points",
    role: "ils annoncent l'explication de ce qui précède",
    faux: ["ils annoncent une énumération", "ils introduisent des paroles rapportées", "ils opposent deux propositions"],
  },
  {
    phrase: "Elle avait tout préparé : la corde, la lampe, les vivres.",
    signe: "les deux-points",
    role: "ils annoncent une énumération",
    faux: ["ils annoncent une explication", "ils introduisent des paroles rapportées", "ils marquent une opposition"],
  },
  {
    phrase: "Il se retourna et dit : « Je ne partirai pas. »",
    signe: "les deux-points et les guillemets",
    role: "ils introduisent des paroles rapportées au discours direct",
    faux: ["ils annoncent une énumération", "ils donnent l'explication de ce qui précède", "ils signalent le titre d'une œuvre"],
  },
  {
    phrase: "La pluie avait cessé ; le sentier restait glissant.",
    signe: "le point-virgule",
    role: "il relie deux propositions dont le sens se tient, sans les séparer autant qu'un point",
    faux: ["il annonce une explication", "il sépare les termes d'une énumération", "il détache un complément en tête de phrase"],
  },
  {
    phrase: "Le margouillat — celui du mur nord — n'avait pas bougé.",
    signe: "les tirets",
    role: "ils encadrent une précision ajoutée à l'intérieur de la phrase",
    faux: ["ils marquent le changement de personne qui parle", "ils annoncent une énumération", "ils relient deux propositions"],
  },
  {
    phrase: "— Tu viens ?\n— Peut-être.",
    signe: "les tirets en début de ligne",
    role: "ils marquent le changement de personne qui parle",
    faux: ["ils encadrent une précision ajoutée", "ils annoncent une explication", "ils séparent deux compléments"],
  },
  {
    phrase: "Il posa la main sur la poignée, tourna, et ouvrit…",
    signe: "les points de suspension",
    role: "ils laissent la phrase en attente et font durer le suspens",
    faux: ["ils marquent la fin définitive du récit", "ils remplacent des guillemets", "ils annoncent une explication"],
  },
  {
    phrase: "Qui avait laissé la fenêtre ouverte ?",
    signe: "le point d'interrogation",
    role: "il ferme une phrase de type interrogatif",
    faux: ["il marque la forme négative", "il ferme une phrase de type impératif", "il encadre des paroles rapportées"],
  },
  {
    phrase: "Quelle chaleur, ce jour-là !",
    signe: "le point d'exclamation",
    role: "il marque la forme exclamative",
    faux: ["il ferme une phrase de type interrogatif", "il ferme une phrase de type impératif", "il sépare deux propositions"],
  },
  {
    phrase: "Le piton (on le voyait à peine) fumait encore.",
    signe: "les parenthèses",
    role: "elles insèrent une remarque qu'on pourrait retirer sans casser la phrase",
    faux: ["elles encadrent des paroles rapportées", "elles annoncent une énumération", "elles isolent le sujet du verbe"],
  },
  {
    phrase: "Ferme la porte derrière toi.",
    signe: "le point final",
    role: "il ferme une phrase de type impératif, qui donne un ordre",
    faux: ["il ferme une phrase de type interrogatif", "il marque la forme exclamative", "il sépare deux propositions"],
  },
];

/* =============================================================================
   2. TYPES ET FORMES DE PHRASES
   ---------------------------------------------------------------------------
   ⚠️ Le TYPE et la FORME sont deux étages différents, et c'est l'erreur la plus
   fréquente : « exclamative » n'est pas un type. Une phrase a UN type parmi
   trois, et des formes qui se combinent avec lui.
   ========================================================================== */

const TYPES_FORMES: readonly TypeForme[] = [
  { phrase: "Le bateau ne partira pas ce soir.", rep: "déclaratif, à la forme négative" },
  { phrase: "Le bateau partira avant la nuit.", rep: "déclaratif, à la forme affirmative" },
  { phrase: "Partiras-tu avec eux ?", rep: "interrogatif, à la forme affirmative" },
  { phrase: "Ne pars pas seul.", rep: "impératif, à la forme négative" },
  { phrase: "Pars avant que la nuit tombe.", rep: "impératif, à la forme affirmative" },
  { phrase: "Comme la mer est calme !", rep: "déclaratif, à la forme exclamative" },
  { phrase: "N'est-il pas déjà trop tard ?", rep: "interrogatif, à la forme négative" },
  { phrase: "Les enfants rentrèrent avant l'orage.", rep: "déclaratif, à la forme affirmative" },
  { phrase: "Rentrez tout de suite !", rep: "impératif, à la forme exclamative" },
  { phrase: "Pourquoi n'as-tu rien dit ?", rep: "interrogatif, à la forme négative" },
  { phrase: "Je n'ai jamais vu une pluie pareille.", rep: "déclaratif, à la forme négative" },
  { phrase: "Écoute-moi jusqu'au bout.", rep: "impératif, à la forme affirmative" },
  { phrase: "Est-ce que tu l'as prévenu ?", rep: "interrogatif, à la forme affirmative" },
  { phrase: "Que cette nuit est longue !", rep: "déclaratif, à la forme exclamative" },
  { phrase: "Ne recommence plus jamais.", rep: "impératif, à la forme négative" },
];

const TOUTES_REPONSES_TF: readonly string[] = [
  ...new Set(TYPES_FORMES.map((t) => t.rep)),
];

/* =============================================================================
   3. PHRASE SIMPLE, COMPLEXE, NON VERBALE
   ---------------------------------------------------------------------------
   La manipulation qui tranche : COMPTER LES VERBES CONJUGUÉS. Un seul, la
   phrase est simple ; deux ou plus, elle est complexe ; aucun, elle est non
   verbale. La réponse porte les deux, parce qu'une catégorie sans son compte
   se retient mal.
   ========================================================================== */

const STRUCTURES: readonly Structure[] = [
  { phrase: "Le vent se leva d'un coup.", cat: "une phrase simple", verbes: 1 },
  { phrase: "Le vent se leva et la pluie suivit.", cat: "une phrase complexe", verbes: 2 },
  { phrase: "Quel vent !", cat: "une phrase non verbale", verbes: 0 },
  { phrase: "Elle pensait que le chemin serait plus court.", cat: "une phrase complexe", verbes: 2 },
  { phrase: "Attention au départ.", cat: "une phrase non verbale", verbes: 0 },
  { phrase: "Les pêcheurs rentrèrent avant la nuit.", cat: "une phrase simple", verbes: 1 },
  { phrase: "Quand la cloche sonna, personne ne bougea.", cat: "une phrase complexe", verbes: 2 },
  { phrase: "Interdiction de stationner.", cat: "une phrase non verbale", verbes: 0 },
  { phrase: "Il ouvrit la porte avec précaution.", cat: "une phrase simple", verbes: 1 },
  { phrase: "La lampe fonctionnait encore, mais la pile faiblissait.", cat: "une phrase complexe", verbes: 2 },
  { phrase: "Silence dans la salle.", cat: "une phrase non verbale", verbes: 0 },
  { phrase: "Le train qui arrive vient de Saint-Pierre.", cat: "une phrase complexe", verbes: 2 },
  { phrase: "Nous partirons demain matin.", cat: "une phrase simple", verbes: 1 },
  { phrase: "Départ à six heures.", cat: "une phrase non verbale", verbes: 0 },
  { phrase: "Personne ne répondit.", cat: "une phrase simple", verbes: 1 },
];

const CATEGORIES_STRUCTURE: readonly string[] = [
  "une phrase simple",
  "une phrase complexe",
  "une phrase non verbale",
];

function direVerbes(n: number): string {
  if (n === 0) return "aucun verbe conjugué";
  if (n === 1) return "un seul verbe conjugué";
  return `${n} verbes conjugués`;
}

/* =============================================================================
   4. JUXTAPOSITION ET COORDINATION : LES EFFETS DE SENS
   ---------------------------------------------------------------------------
   Le BO ne demande pas de nommer le procédé mais de comprendre CE QU'IL
   PRODUIT. Un point-virgule peut dire une conséquence sans qu'aucun mot ne la
   nomme : c'est cela qu'il faut entendre.
   ========================================================================== */

const LIENS: readonly Lien[] = [
  { phrase: "Le vent se leva ; les volets claquèrent.", rapport: "la conséquence" },
  { phrase: "Il pleuvait, pourtant elle sortit sans manteau.", rapport: "l'opposition" },
  { phrase: "Il rentra, car la nuit tombait déjà.", rapport: "la cause" },
  { phrase: "Elle ouvrit la porte, puis alluma la lampe.", rapport: "la succession dans le temps" },
  { phrase: "Tu prends le sentier ou tu attends ici.", rapport: "le choix" },
  { phrase: "Le vent soufflait et la pluie battait les vitres.", rapport: "l'addition" },
  { phrase: "La lampe s'éteignit ; ils ne virent plus rien.", rapport: "la conséquence" },
  { phrase: "Il avait tout préparé, mais il oublia la carte.", rapport: "l'opposition" },
  { phrase: "Ils se turent, car le maitre entrait.", rapport: "la cause" },
  { phrase: "Elle rangea ses affaires, ferma la porte, descendit l'escalier.", rapport: "la succession dans le temps" },
  { phrase: "Ou bien tu insistes, ou bien tu renonces.", rapport: "le choix" },
  { phrase: "Le ciel était noir, l'air était lourd.", rapport: "l'addition" },
  { phrase: "Le pont était coupé ; il fallut faire tout le tour.", rapport: "la conséquence" },
  { phrase: "Il criait de toutes ses forces, or personne ne l'entendait.", rapport: "l'opposition" },
];

const TOUS_RAPPORTS: readonly string[] = [...new Set(LIENS.map((l) => l.rapport))];

/* =============================================================================
   5. LES FONCTIONS : COD, COI, CIRCONSTANCIEL, ATTRIBUT
   ---------------------------------------------------------------------------
   Le BO les nomme dans le même attendu, et c'est juste : elles ne se
   reconnaissent qu'en s'opposant. Un COD ne se déplace pas, un circonstanciel
   si ; un attribut s'accorde avec le sujet, un COD non.
   ========================================================================== */

const FONCTIONS: readonly Fonction[] = [
  { phrase: "Le pêcheur répare son filet.", groupe: "son filet", fonction: "complément d'objet direct" },
  { phrase: "Elle pense à son frère resté au port.", groupe: "à son frère", fonction: "complément d'objet indirect" },
  { phrase: "Nous partirons à l'aube.", groupe: "à l'aube", fonction: "complément circonstanciel" },
  { phrase: "Le ciel devient orageux.", groupe: "orageux", fonction: "attribut du sujet" },
  { phrase: "Tom raconte son voyage à la classe.", groupe: "son voyage", fonction: "complément d'objet direct" },
  { phrase: "Il parle de sa journée sans s'arrêter.", groupe: "de sa journée", fonction: "complément d'objet indirect" },
  { phrase: "Elle range ses livres dans le carton.", groupe: "dans le carton", fonction: "complément circonstanciel" },
  { phrase: "La mer paraissait calme ce matin-là.", groupe: "calme", fonction: "attribut du sujet" },
  { phrase: "Les élèves écoutent la consigne.", groupe: "la consigne", fonction: "complément d'objet direct" },
  { phrase: "Je me souviens de cette nuit.", groupe: "de cette nuit", fonction: "complément d'objet indirect" },
  { phrase: "Nous marchions depuis deux heures.", groupe: "depuis deux heures", fonction: "complément circonstanciel" },
  { phrase: "Ce garçon est mon voisin.", groupe: "mon voisin", fonction: "attribut du sujet" },
  { phrase: "Le vent a renversé les chaises.", groupe: "les chaises", fonction: "complément d'objet direct" },
  { phrase: "Elle obéit à ses parents sans discuter.", groupe: "à ses parents", fonction: "complément d'objet indirect" },
];

const TOUTES_FONCTIONS: readonly string[] = [
  "complément d'objet direct",
  "complément d'objet indirect",
  "complément circonstanciel",
  "attribut du sujet",
];

/* =============================================================================
   6. L'ATTRIBUT DU SUJET ET LES VERBES ATTRIBUTIFS
   ---------------------------------------------------------------------------
   ⚠️ Le BO insiste sur « l'emploi occasionnellement attributif de certains
   verbes » : partir, tomber, vivre ne sont pas des verbes d'état, et
   pourtant « ils partirent confiants » a bien un attribut. La liste apprise
   par cœur ne suffit donc pas — c'est l'accord avec le sujet qui tranche.
   ========================================================================== */

const ATTRIBUTS: readonly Attribut[] = [
  { phrase: "La nuit devient fraiche.", groupe: "fraiche", attributif: true, verbe: "devenir" },
  { phrase: "Elle regarde la mer par la fenêtre.", groupe: "la mer", attributif: false, verbe: "regarder" },
  { phrase: "Il resta silencieux jusqu'au bout.", groupe: "silencieux", attributif: true, verbe: "rester" },
  { phrase: "Il rangea ses affaires sans un mot.", groupe: "ses affaires", attributif: false, verbe: "ranger" },
  { phrase: "Le ciel semble menaçant.", groupe: "menaçant", attributif: true, verbe: "sembler" },
  { phrase: "Nous appelons le médecin.", groupe: "le médecin", attributif: false, verbe: "appeler" },
  { phrase: "Elle fut élue déléguée de la classe.", groupe: "déléguée", attributif: true, verbe: "être élu" },
  { phrase: "Le chien vida sa gamelle.", groupe: "sa gamelle", attributif: false, verbe: "vider" },
  { phrase: "Ils partirent confiants.", groupe: "confiants", attributif: true, verbe: "partir, ici employé comme verbe attributif" },
  { phrase: "Il tomba malade au mois de janvier.", groupe: "malade", attributif: true, verbe: "tomber, ici employé comme verbe attributif" },
  { phrase: "Les élèves écrivent leur nom en haut.", groupe: "leur nom", attributif: false, verbe: "écrire" },
  { phrase: "Ce plat parait trop salé.", groupe: "trop salé", attributif: true, verbe: "paraitre" },
  { phrase: "Le vent démonta la barque.", groupe: "la barque", attributif: false, verbe: "démonter" },
  { phrase: "Elle demeura immobile un long moment.", groupe: "immobile", attributif: true, verbe: "demeurer" },
];

const ANALYSES_ATTRIBUT: readonly string[] = [
  "attribut du sujet : il dit ce qu'EST le sujet, et il s'accorde avec lui",
  "complément d'objet direct : il dit sur QUOI porte l'action",
  "complément circonstanciel : on pourrait le déplacer ou le supprimer",
  "sujet : c'est lui qui fait l'action",
];

/* =============================================================================
   7. LES QUATRE CIRCONSTANCIELS QUE LE BO NOMME
   ========================================================================== */

const CIRCONSTANCIELS: readonly Circonstanciel[] = [
  { phrase: "Ils avancèrent le long du récif.", groupe: "le long du récif", cc: "de lieu" },
  { phrase: "Nous partirons dès l'aube.", groupe: "dès l'aube", cc: "de temps" },
  { phrase: "Il renonça par prudence.", groupe: "par prudence", cc: "de cause" },
  { phrase: "Elle répondit avec calme.", groupe: "avec calme", cc: "de manière" },
  { phrase: "Le chat dort sous la table.", groupe: "sous la table", cc: "de lieu" },
  { phrase: "Le concert commence à vingt heures.", groupe: "à vingt heures", cc: "de temps" },
  { phrase: "La route fut coupée à cause de l'orage.", groupe: "à cause de l'orage", cc: "de cause" },
  { phrase: "Il courut à toutes jambes.", groupe: "à toutes jambes", cc: "de manière" },
  { phrase: "On l'attendait devant le collège.", groupe: "devant le collège", cc: "de lieu" },
  { phrase: "Pendant la nuit, la mer se calma.", groupe: "pendant la nuit", cc: "de temps" },
  { phrase: "Elle se tut par gêne.", groupe: "par gêne", cc: "de cause" },
  { phrase: "Il posa la caisse sans un bruit.", groupe: "sans un bruit", cc: "de manière" },
  { phrase: "Le sentier grimpe jusqu'au piton.", groupe: "jusqu'au piton", cc: "de lieu" },
  { phrase: "Ils travaillèrent jusqu'au soir.", groupe: "jusqu'au soir", cc: "de temps" },
];

const TOUS_CC: readonly string[] = ["de lieu", "de temps", "de cause", "de manière"];

/* =============================================================================
   8. LE GROUPE NOMINAL MINIMAL ET ÉTENDU
   ========================================================================== */

const GROUPES_NOMINAUX: readonly GroupeNominal[] = [
  { gn: "le vieux pêcheur", noyau: "pêcheur", expansion: "un adjectif épithète" },
  { gn: "le pêcheur du village", noyau: "pêcheur", expansion: "un complément du nom" },
  { gn: "le pêcheur qui rentrait au port", noyau: "pêcheur", expansion: "une proposition subordonnée relative" },
  { gn: "un pêcheur", noyau: "pêcheur", expansion: "rien : le groupe nominal est minimal" },
  { gn: "une longue nuit", noyau: "nuit", expansion: "un adjectif épithète" },
  { gn: "la nuit de décembre", noyau: "nuit", expansion: "un complément du nom" },
  { gn: "la nuit qu'ils passèrent dehors", noyau: "nuit", expansion: "une proposition subordonnée relative" },
  { gn: "cette nuit", noyau: "nuit", expansion: "rien : le groupe nominal est minimal" },
  { gn: "des sentiers escarpés", noyau: "sentiers", expansion: "un adjectif épithète" },
  { gn: "le sentier des Anglais", noyau: "sentier", expansion: "un complément du nom" },
  { gn: "le sentier que personne n'emprunte", noyau: "sentier", expansion: "une proposition subordonnée relative" },
  { gn: "ce sentier", noyau: "sentier", expansion: "rien : le groupe nominal est minimal" },
  { gn: "une barque neuve", noyau: "barque", expansion: "un adjectif épithète" },
  { gn: "la barque du voisin", noyau: "barque", expansion: "un complément du nom" },
  { gn: "la barque qu'on avait tirée sur le sable", noyau: "barque", expansion: "une proposition subordonnée relative" },
];

const TOUTES_EXPANSIONS: readonly string[] = [
  ...new Set(GROUPES_NOMINAUX.map((g) => g.expansion)),
];

/* =============================================================================
   9. PRÉPOSITIONS, ADVERBES, MOTS SUBORDONNANTS
   ---------------------------------------------------------------------------
   ⚠️ Chaque mot est donné DANS une phrase, jamais seul : « derrière » est une
   préposition quand un groupe le suit, un adverbe quand rien ne le suit. Une
   liste de mots à classer hors contexte serait fausse.
   ========================================================================== */

const MOTS_CLASSES: readonly MotClasse[] = [
  { phrase: "Il marche lentement le long du quai.", mot: "lentement", classe: "un adverbe" },
  { phrase: "Le livre est resté sur la table.", mot: "sur", classe: "une préposition" },
  { phrase: "Je crois qu'il viendra demain.", mot: "qu'", classe: "un mot subordonnant" },
  { phrase: "Il pleuvait mais nous sommes sortis.", mot: "mais", classe: "une conjonction de coordination" },
  { phrase: "Elle chante souvent en travaillant.", mot: "souvent", classe: "un adverbe" },
  { phrase: "Il est parti avec ses cousins.", mot: "avec", classe: "une préposition" },
  { phrase: "Nous rentrerons quand la pluie cessera.", mot: "quand", classe: "un mot subordonnant" },
  { phrase: "Il est fatigué et il continue.", mot: "et", classe: "une conjonction de coordination" },
  { phrase: "Le sentier passe derrière la case.", mot: "derrière", classe: "une préposition" },
  { phrase: "Il répond toujours trop vite.", mot: "toujours", classe: "un adverbe" },
  { phrase: "Je sais que tu as raison.", mot: "que", classe: "un mot subordonnant" },
  { phrase: "Prends la lampe ou la torche.", mot: "ou", classe: "une conjonction de coordination" },
  { phrase: "Elle attend depuis midi.", mot: "depuis", classe: "une préposition" },
  { phrase: "Il travaille sérieusement.", mot: "sérieusement", classe: "un adverbe" },
  { phrase: "Il est resté parce qu'il pleuvait.", mot: "parce qu'", classe: "un mot subordonnant" },
];

const TOUTES_CLASSES: readonly string[] = [
  "une préposition",
  "un adverbe",
  "un mot subordonnant",
  "une conjonction de coordination",
];

/* =============================================================================
   10. DÉTERMINANT OU PRONOM
   ---------------------------------------------------------------------------
   Les lignes vont PAR PAIRES : le même mot, une fois déterminant, une fois
   pronom. C'est la seule façon de montrer que la classe ne se lit pas sur le
   mot mais sur ce qu'il fait — « les » accompagne un nom ou en remplace un.
   ========================================================================== */

const DET_PRO: readonly DetPro[] = [
  { phrase: "Les élèves rangent les tables.", mot: "les", determinant: true, nom: "élèves", remplace: "les tables" },
  { phrase: "Il les rangea sans un mot.", mot: "les", determinant: false, nom: "mot", remplace: "les tables" },
  { phrase: "Leur maison donne sur la mer.", mot: "leur", determinant: true, nom: "maison", remplace: "à leurs parents" },
  { phrase: "Je leur ai tout raconté.", mot: "leur", determinant: false, nom: "tout", remplace: "à mes cousins" },
  { phrase: "Cette barque est neuve.", mot: "cette", determinant: true, nom: "barque", remplace: "la barque du voisin" },
  { phrase: "Celle-ci est encore plus vieille.", mot: "celle-ci", determinant: false, nom: "vieille", remplace: "cette barque" },
  { phrase: "Quelques enfants attendaient devant la grille.", mot: "quelques", determinant: true, nom: "enfants", remplace: "les enfants du quartier" },
  { phrase: "Quelques-uns attendaient encore.", mot: "quelques-uns", determinant: false, nom: "encore", remplace: "les enfants" },
  { phrase: "Notre chemin passe par le piton.", mot: "notre", determinant: true, nom: "chemin", remplace: "le nôtre" },
  { phrase: "Le nôtre est bien plus court.", mot: "le nôtre", determinant: false, nom: "court", remplace: "notre chemin" },
  { phrase: "Chaque élève a répondu.", mot: "chaque", determinant: true, nom: "élève", remplace: "tous les élèves" },
  { phrase: "Chacun a répondu à son tour.", mot: "chacun", determinant: false, nom: "tour", remplace: "chaque élève" },
  { phrase: "Plusieurs bateaux sont rentrés.", mot: "plusieurs", determinant: true, nom: "bateaux", remplace: "les bateaux du port" },
  { phrase: "Plusieurs sont rentrés avant l'orage.", mot: "plusieurs", determinant: false, nom: "orage", remplace: "les bateaux" },
];

/* =============================================================================
   11. PRONOMS PERSONNELS, DÉMONSTRATIFS, INDÉFINIS
   ---------------------------------------------------------------------------
   Le BO ajoute « sans chercher l'exhaustivité ». Le pronom relatif sert de
   quatrième proposition : il est réel, il sera étudié en 4e, et le confondre
   avec un démonstratif est l'erreur qui se fait.
   ========================================================================== */

const PRONOMS: readonly MotClasse[] = [
  { phrase: "Elle nous attendait devant le portail.", mot: "nous", classe: "un pronom personnel" },
  { phrase: "Celui-là ne fonctionne plus.", mot: "celui-là", classe: "un pronom démonstratif" },
  { phrase: "Personne n'avait rien remarqué.", mot: "personne", classe: "un pronom indéfini" },
  { phrase: "Le sentier qui monte est fermé.", mot: "qui", classe: "un pronom relatif" },
  { phrase: "Je le lui ai rendu hier.", mot: "lui", classe: "un pronom personnel" },
  { phrase: "Ceux qui restaient se turent.", mot: "ceux", classe: "un pronom démonstratif" },
  { phrase: "Chacun repartit de son côté.", mot: "chacun", classe: "un pronom indéfini" },
  { phrase: "La barque que nous avons vue est à quai.", mot: "que", classe: "un pronom relatif" },
  { phrase: "Tu les as prévenus ?", mot: "les", classe: "un pronom personnel" },
  { phrase: "Celle de gauche est la plus ancienne.", mot: "celle", classe: "un pronom démonstratif" },
  { phrase: "Quelqu'un avait laissé la porte ouverte.", mot: "quelqu'un", classe: "un pronom indéfini" },
  { phrase: "C'est le jour où tout a changé.", mot: "où", classe: "un pronom relatif" },
  { phrase: "Il se retourna vers eux.", mot: "eux", classe: "un pronom personnel" },
  { phrase: "Ceci ne te regarde pas.", mot: "ceci", classe: "un pronom démonstratif" },
  { phrase: "Rien ne bougeait dans la cour.", mot: "rien", classe: "un pronom indéfini" },
];

const TOUS_PRONOMS: readonly string[] = [
  "un pronom personnel",
  "un pronom démonstratif",
  "un pronom indéfini",
  "un pronom relatif",
];

/* =============================================================================
   12. LES MOTS COORDONNANTS ET LEUR RÔLE
   ---------------------------------------------------------------------------
   « leurs rôles syntaxique ET sémantique » : le mot relie — c'est le rôle
   syntaxique — et il dit quelque chose de plus, qui change le sens de la
   phrase. C'est ce second rôle qui est interrogé ici.
   ========================================================================== */

const COORDONNANTS: readonly Coordonnant[] = [
  { phrase: "Il pleuvait et le vent forcissait.", mot: "et", rapport: "l'addition" },
  { phrase: "Il pleuvait mais nous sommes sortis quand même.", mot: "mais", rapport: "l'opposition" },
  { phrase: "Rentre, car la nuit tombe.", mot: "car", rapport: "la cause" },
  { phrase: "La route est coupée, donc nous ferons le tour.", mot: "donc", rapport: "la conséquence" },
  { phrase: "Prends la lampe ou la torche.", mot: "ou", rapport: "le choix" },
  { phrase: "Il n'avait ni carte ni boussole.", mot: "ni", rapport: "la négation de deux choses à la fois" },
  { phrase: "Elle a tout rangé et elle est partie.", mot: "et", rapport: "l'addition" },
  { phrase: "Le pont tenait encore, or la crue montait.", mot: "or", rapport: "l'opposition" },
  { phrase: "Il s'est tu, car il ne savait rien.", mot: "car", rapport: "la cause" },
  { phrase: "Le sentier est fermé, donc personne ne passe.", mot: "donc", rapport: "la conséquence" },
  { phrase: "Tu insistes ou tu renonces.", mot: "ou", rapport: "le choix" },
  { phrase: "Il ne mangeait ni ne dormait.", mot: "ni", rapport: "la négation de deux choses à la fois" },
  { phrase: "Le ciel était noir et l'air était lourd.", mot: "et", rapport: "l'addition" },
  { phrase: "Elle avait raison, mais personne ne l'écoutait.", mot: "mais", rapport: "l'opposition" },
];

const RAPPORTS_COORD: readonly string[] = [
  ...new Set(COORDONNANTS.map((c) => c.rapport)),
];

export const grammairePhrase5eBank: TutorBankItemV4[] = [
  /* =========================================================
     5E_GRAM_PONCTUATION
  ========================================================= */
  {
    kind: "template",
    id: "5e_gram_ponctuation_tpl_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "5e_gram_ponctuation",
    difficulty: 3,
    theme: "neutral",
    hint: "Demande-toi ce que le signe FAIT au groupe de mots, pas comment il se lit.",
    tags: ["5e", "grammaire", "ponctuation", "template"],
    generate: () => {
      const p = randomChoice(PONCTUATIONS);
      return {
        // ⚠️ Formulation neutre en nombre : `signe` est le plus souvent au
        // pluriel — « les deux virgules », « les tirets », « les parenthèses ».
        // « Que fait les deux virgules » sortait à l'écran, dans une banque de
        // français. Trouvé en lisant un tirage.
        text: `« ${p.phrase} »\n\nQuel est le rôle de ${p.signe} dans cette phrase ?`,
        format: "qcm" as const,
        choices: makeChoices(p.role, p.faux),
        expected: [p.role],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La ponctuation n'est pas une affaire de souffle : elle découpe la phrase et signale ce que chaque groupe y fait. Deux virgules qui encadrent, ce n'est pas la même chose que deux virgules qui séparent.",
          "Retire le groupe encadré par le signe, ou déplace-le : ce qui reste te dit à quoi il servait.",
          `Ici, ${p.signe} : ${p.role}.`,
          `${p.role.charAt(0).toUpperCase()}${p.role.slice(1)}.`,
        ),
      };
    },
  },

  /* =========================================================
     5E_GRAM_TYPES_FORMES
  ========================================================= */
  {
    kind: "template",
    id: "5e_gram_types_formes_tpl_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "5e_gram_types_formes",
    difficulty: 3,
    theme: "neutral",
    hint: "Le type d'abord — déclaratif, interrogatif, impératif — puis la forme.",
    tags: ["5e", "grammaire", "types-formes", "template"],
    generate: () => {
      const t = randomChoice(TYPES_FORMES);
      return {
        text: `« ${t.phrase} »\n\nQuel est le type de cette phrase, et sa forme ?`,
        format: "qcm" as const,
        choices: makeChoices(t.rep, TOUTES_REPONSES_TF),
        expected: [t.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une phrase a UN type parmi trois — déclaratif, interrogatif, impératif — et des formes qui se combinent avec lui : affirmative ou négative, exclamative ou non.",
          "Cherche d'abord ce que la phrase FAIT : elle raconte, elle demande, ou elle ordonne. Puis regarde s'il y a une négation, et si le ton s'exclame.",
          `« ${t.phrase} » est ${t.rep}.`,
          `Elle est ${t.rep}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "5e_gram_types_formes_fixed_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "5e_gram_types_formes",
    difficulty: 3,
    theme: "neutral",
    text: "Un camarade écrit qu'une phrase est « de type exclamatif ».\n\nQu'est-ce qui ne va pas ?",
    format: "qcm",
    choices: [
      "l'exclamative est une FORME, pas un type : la phrase reste déclarative, interrogative ou impérative",
      "rien : exclamatif est bien le quatrième type",
      "il aurait fallu dire « de type interrogatif »",
      "une phrase ne peut pas être exclamative si elle finit par un point",
    ],
    expected: [
      "l'exclamative est une FORME, pas un type : la phrase reste déclarative, interrogative ou impérative",
    ],
    comparator: "mcq_exact",
    hint: "Compte les types que le programme nomme.",
    explanation: exp(
      "Le type dit ce que la phrase fait — raconter, demander, ordonner. La forme dit comment elle le fait : affirmative ou négative, exclamative ou non. Les deux étages se combinent.",
      "Demande-toi si la phrase raconte, demande ou ordonne : tu auras le type. Le point d'exclamation, lui, ne change que la forme.",
      "« Rentrez tout de suite ! » ordonne : elle est de type impératif, à la forme exclamative. Le point d'exclamation n'en fait pas un type nouveau.",
      "L'exclamative est une forme, pas un type : la phrase reste déclarative, interrogative ou impérative.",
    ),
    tags: ["5e", "grammaire", "types-formes", "methode", "qcm"],
  },

  /* =========================================================
     5E_GRAM_SIMPLE_COMPLEXE
  ========================================================= */
  {
    kind: "template",
    id: "5e_gram_simple_complexe_tpl_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "5e_gram_simple_complexe",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les verbes conjugués. C'est la seule manipulation qui tranche.",
    tags: ["5e", "grammaire", "phrase-complexe", "template"],
    generate: () => {
      const s = randomChoice(STRUCTURES);
      const autresCat = shuffle(CATEGORIES_STRUCTURE.filter((c) => c !== s.cat));
      const autresN = shuffle([0, 1, 2].filter((n) => n !== s.verbes));
      const bon = `${s.cat} : ${direVerbes(s.verbes)}`;
      return {
        text: `« ${s.phrase} »\n\nQuelle analyse est entièrement juste ?`,
        format: "qcm" as const,
        choices: shuffle([
          bon,
          `${autresCat[0]} : ${direVerbes(s.verbes)}`,
          `${s.cat} : ${direVerbes(autresN[0])}`,
          `${autresCat[1]} : ${direVerbes(autresN[1])}`,
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une phrase simple a un seul verbe conjugué, une phrase complexe en a deux ou plus, une phrase non verbale n'en a aucun. Le nombre de verbes conjugués et la catégorie sont la même information, dite deux fois.",
          "Souligne les verbes conjugués, et seulement eux : un infinitif ou un participe ne compte pas.",
          `« ${s.phrase} » contient ${direVerbes(s.verbes)} : c'est donc ${s.cat}.`,
          `C'est ${bon}.`,
        ),
      };
    },
  },

  /* =========================================================
     5E_GRAM_JUXTA_COORD
  ========================================================= */
  {
    kind: "template",
    id: "5e_gram_juxta_coord_tpl_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "5e_gram_juxta_coord",
    difficulty: 3,
    theme: "neutral",
    hint: "Le rapport peut n'être écrit nulle part : c'est le sens qui le porte.",
    tags: ["5e", "grammaire", "juxtaposition", "coordination", "template"],
    generate: () => {
      const l = randomChoice(LIENS);
      return {
        text: `« ${l.phrase} »\n\nQu'exprime le lien entre les deux propositions ?`,
        format: "qcm" as const,
        choices: makeChoices(l.rapport, TOUS_RAPPORTS),
        expected: [l.rapport],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Deux propositions peuvent être juxtaposées — séparées par une virgule ou un point-virgule — ou coordonnées par un petit mot. Dans les deux cas, un rapport de sens s'établit, même quand aucun mot ne le nomme.",
          "Essaie de remplacer le signe par « donc », « car », « mais », « puis » : celui qui va sans forcer te donne le rapport.",
          `Ici, le lien exprime ${l.rapport}.`,
          `Il exprime ${l.rapport}.`,
        ),
      };
    },
  },

  /* =========================================================
     5E_GRAM_COD_COI
  ========================================================= */
  {
    kind: "template",
    id: "5e_gram_cod_coi_tpl_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "5e_gram_cod_coi",
    difficulty: 3,
    theme: "neutral",
    hint: "Pose la question après le verbe : « qui ? quoi ? » ou « à qui ? de quoi ? ».",
    tags: ["5e", "grammaire", "cod-coi", "template"],
    generate: () => {
      const f = randomChoice(FONCTIONS);
      return {
        text: `« ${f.phrase} »\n\nQuelle est la fonction du groupe « ${f.groupe} » ?`,
        format: "qcm" as const,
        choices: makeChoices(f.fonction, TOUTES_FONCTIONS),
        expected: [f.fonction],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le complément d'objet direct se rattache au verbe sans préposition, l'indirect en passe par une. Ni l'un ni l'autre ne se déplace : le circonstanciel, lui, se déplace et se supprime. L'attribut, enfin, s'accorde avec le sujet.",
          "Pose la question après le verbe. Puis essaie de déplacer le groupe en tête de phrase : si cela passe, ce n'est ni un COD ni un COI.",
          `Dans « ${f.phrase} », « ${f.groupe} » est ${f.fonction}.`,
          `C'est ${f.fonction}.`,
        ),
      };
    },
  },

  /* =========================================================
     5E_GRAM_ATTRIBUT
  ========================================================= */
  {
    kind: "template",
    id: "5e_gram_attribut_tpl_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "5e_gram_attribut",
    difficulty: 3,
    theme: "neutral",
    hint: "Change le genre ou le nombre du sujet : si le groupe suit, c'est un attribut.",
    tags: ["5e", "grammaire", "attribut", "template"],
    generate: () => {
      const a = randomChoice(ATTRIBUTS);
      const bon = a.attributif ? ANALYSES_ATTRIBUT[0] : ANALYSES_ATTRIBUT[1];
      return {
        text: `« ${a.phrase} »\n\nQuelle est la fonction de « ${a.groupe} » ?`,
        format: "qcm" as const,
        choices: makeChoices(bon, ANALYSES_ATTRIBUT),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'attribut du sujet dit ce que le sujet EST, et il s'accorde avec lui. Le complément d'objet direct dit sur quoi porte l'action, et il ne s'accorde avec rien. ⚠️ La liste des verbes d'état ne suffit pas : partir, tomber, vivre peuvent être employés de façon attributive.",
          "Mets le sujet au féminin ou au pluriel. Si le groupe change avec lui, c'est un attribut ; s'il ne bouge pas, c'est un complément d'objet.",
          a.attributif
            ? `« ${a.phrase} » — le verbe est ${a.verbe}, et « ${a.groupe} » s'accorde avec le sujet : c'est un attribut du sujet.`
            : `« ${a.phrase} » — le verbe est ${a.verbe}, et « ${a.groupe} » ne s'accorde pas avec le sujet : l'action porte dessus, c'est un complément d'objet direct.`,
          `C'est ${a.attributif ? "un attribut du sujet" : "un complément d'objet direct"}.`,
        ),
      };
    },
  },

  /* =========================================================
     5E_GRAM_CIRCONSTANCIELS
  ========================================================= */
  {
    kind: "template",
    id: "5e_gram_circonstanciels_tpl_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "5e_gram_circonstanciels",
    difficulty: 2,
    theme: "neutral",
    hint: "Où ? quand ? pourquoi ? comment ? — une seule des quatre convient.",
    tags: ["5e", "grammaire", "circonstanciels", "template"],
    generate: () => {
      const c = randomChoice(CIRCONSTANCIELS);
      return {
        text: `« ${c.phrase} »\n\nLe groupe « ${c.groupe} » est un complément circonstanciel…`,
        format: "qcm" as const,
        choices: makeChoices(c.cc, TOUS_CC),
        expected: [c.cc],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un complément circonstanciel donne la circonstance de l'action : où elle se passe, quand, pourquoi, ou de quelle façon. On le reconnait à ce qu'il se déplace et se supprime sans casser la phrase.",
          "Pose les quatre questions dans l'ordre — où ? quand ? pourquoi ? comment ? — et garde celle à laquelle le groupe répond.",
          `Dans « ${c.phrase} », « ${c.groupe} » répond à la question qui donne le circonstanciel ${c.cc}.`,
          `C'est un complément circonstanciel ${c.cc}.`,
        ),
      };
    },
  },

  /* =========================================================
     5E_GRAM_GN_ETENDU
  ========================================================= */
  {
    kind: "template",
    id: "5e_gram_gn_etendu_tpl_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "5e_gram_gn_etendu",
    difficulty: 3,
    theme: "neutral",
    hint: "Trouve le nom noyau, puis regarde ce qui s'y accroche.",
    tags: ["5e", "grammaire", "groupe-nominal", "template"],
    generate: () => {
      const g = randomChoice(GROUPES_NOMINAUX);
      return {
        text: `Groupe nominal : « ${g.gn} »\n\nQu'est-ce qui étend le nom noyau « ${g.noyau} » ?`,
        format: "qcm" as const,
        choices: makeChoices(g.expansion, TOUTES_EXPANSIONS),
        expected: [g.expansion],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un groupe nominal minimal, c'est un déterminant et un nom. Il devient étendu dès qu'on ajoute quelque chose au noyau : un adjectif épithète, un complément du nom introduit par une préposition, ou une proposition relative avec son verbe conjugué.",
          "Enlève tout sauf le déterminant et le nom. Ce que tu viens d'ôter est l'expansion — et sa forme te dit laquelle.",
          `« ${g.gn} » : le noyau est « ${g.noyau} », et l'expansion est ${g.expansion}.`,
          `C'est ${g.expansion}.`,
        ),
      };
    },
  },

  /* =========================================================
     5E_GRAM_PREPOSITIONS
  ========================================================= */
  {
    kind: "template",
    id: "5e_gram_prepositions_tpl_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "5e_gram_prepositions",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde ce qui suit le mot : un groupe, une proposition, ou rien.",
    tags: ["5e", "grammaire", "prepositions", "template"],
    generate: () => {
      const m = randomChoice(MOTS_CLASSES);
      return {
        text: `« ${m.phrase} »\n\nQu'est-ce que « ${m.mot} » dans cette phrase ?`,
        format: "qcm" as const,
        choices: makeChoices(m.classe, TOUTES_CLASSES),
        expected: [m.classe],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La préposition introduit un groupe : elle ne peut pas rester seule. L'adverbe, lui, se suffit à lui-même et modifie le verbe ou l'adjectif. Le mot subordonnant ouvre une proposition avec son verbe conjugué, et la conjonction de coordination relie deux éléments de même rang.",
          "Regarde ce qui suit : un groupe nominal, une proposition entière, ou rien du tout. C'est la suite qui donne la classe, pas le mot.",
          `Dans « ${m.phrase} », « ${m.mot} » est ${m.classe}.`,
          `C'est ${m.classe}.`,
        ),
      };
    },
  },

  /* =========================================================
     5E_GRAM_DETERMINANT_PRONOM
  ========================================================= */
  {
    kind: "template",
    id: "5e_gram_determinant_pronom_tpl_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "5e_gram_determinant_pronom",
    difficulty: 3,
    theme: "neutral",
    hint: "Un déterminant ne peut pas rester seul : il lui faut son nom.",
    tags: ["5e", "grammaire", "determinant-pronom", "template"],
    generate: () => {
      const d = randomChoice(DET_PRO);
      const bon = d.determinant
        ? `un déterminant : il accompagne le nom « ${d.nom} »`
        : `un pronom : il remplace « ${d.remplace} »`;
      return {
        text: `« ${d.phrase} »\n\nQu'est-ce que « ${d.mot} » dans cette phrase ?`,
        format: "qcm" as const,
        choices: shuffle([
          `un déterminant : il accompagne le nom « ${d.nom} »`,
          `un pronom : il remplace « ${d.remplace} »`,
          `un déterminant : il remplace « ${d.remplace} »`,
          `un pronom : il accompagne le nom « ${d.nom} »`,
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un déterminant accompagne un nom et ne peut pas s'en passer. Un pronom, lui, remplace un groupe nominal : il tient sa place, et il n'y a pas de nom derrière lui.",
          "Cherche le nom juste après le mot. S'il y en a un, c'est un déterminant ; s'il n'y en a pas, le mot remplace quelque chose — c'est un pronom.",
          d.determinant
            ? `Dans « ${d.phrase} », « ${d.mot} » est suivi du nom « ${d.nom} » : c'est un déterminant.`
            : `Dans « ${d.phrase} », « ${d.mot} » n'est suivi d'aucun nom : il remplace « ${d.remplace} », c'est un pronom.`,
          `C'est ${d.determinant ? "un déterminant" : "un pronom"}.`,
        ),
      };
    },
  },

  /* =========================================================
     5E_GRAM_PRONOMS
  ========================================================= */
  {
    kind: "template",
    id: "5e_gram_pronoms_tpl_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "5e_gram_pronoms",
    difficulty: 3,
    theme: "neutral",
    hint: "Demande-toi ce que le pronom fait : il désigne, il montre, il reste vague, ou il relie.",
    tags: ["5e", "grammaire", "pronoms", "template"],
    generate: () => {
      const p = randomChoice(PRONOMS);
      return {
        text: `« ${p.phrase} »\n\nQuel genre de pronom est « ${p.mot} » ?`,
        format: "qcm" as const,
        choices: makeChoices(p.classe, TOUS_PRONOMS),
        expected: [p.classe],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le pronom personnel désigne celui qui parle, à qui l'on parle ou de qui l'on parle. Le démonstratif montre, et il se reconnait à sa forme en c- : celui, celle, ceux, ceci, cela. L'indéfini reste vague : personne, chacun, quelqu'un, rien. Le relatif, lui, relie une proposition à un nom.",
          "Regarde d'abord si le mot RELIE deux propositions : c'est alors un relatif. Sinon, demande-toi s'il désigne, s'il montre, ou s'il reste vague.",
          `Dans « ${p.phrase} », « ${p.mot} » est ${p.classe}.`,
          `C'est ${p.classe}.`,
        ),
      };
    },
  },

  /* =========================================================
     5E_GRAM_COORDONNANTS
  ========================================================= */
  {
    kind: "template",
    id: "5e_gram_coordonnants_tpl_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "5e_gram_coordonnants",
    difficulty: 2,
    theme: "neutral",
    hint: "Le mot relie — mais il dit aussi quelque chose. C'est ce quelque chose qu'on cherche.",
    tags: ["5e", "grammaire", "coordination", "template"],
    generate: () => {
      const c = randomChoice(COORDONNANTS);
      return {
        text: `« ${c.phrase} »\n\nQuel rapport le mot « ${c.mot} » établit-il ?`,
        format: "qcm" as const,
        choices: makeChoices(c.rapport, RAPPORTS_COORD),
        expected: [c.rapport],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot coordonnant a deux rôles à la fois : il relie deux éléments de même rang — c'est son rôle syntaxique — et il précise ce qui les unit — c'est son rôle de sens. Le second change entièrement la phrase.",
          "Remplace le mot par un autre coordonnant : si le sens change, c'est que le mot portait ce sens-là.",
          `Dans « ${c.phrase} », « ${c.mot} » exprime ${c.rapport}.`,
          `Il exprime ${c.rapport}.`,
        ),
      };
    },
  },
];
