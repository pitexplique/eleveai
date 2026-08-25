// lib/tutor-v4/questionBank/3e/francais/conjugaison.bank.ts
//
// LA MORPHOLOGIE VERBALE EN 3e — écrit le 13/08/2026.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020 — celui qui s'applique ENCORE à la
// 3e, le nouveau texte ne l'atteignant qu'en septembre 2028.
//
// ⛔⛔ PIÈGE MAJEUR À NE PAS INVERSER : DANS CE PROGRAMME, LE CONDITIONNEL EST
// UN MODE. La terminologie exigible dit « mode conditionnel présent, passé ».
// C'est l'INVERSE du programme suivi par la 5e depuis la rentrée 2026, où le
// conditionnel est rangé parmi les temps simples de l'indicatif. Les deux
// banques disent donc deux choses différentes, et elles ont raison toutes les
// deux : chacune suit le texte de sa classe. ⛔ Ne pas « harmoniser ».
//
// ⭐ CE QUI SÉPARE CETTE BANQUE DE CELLE DE LA 4e : la 4e forme les modes, le
// subjonctif présent, le conditionnel, les temps composés et les onze verbes
// irréguliers. La 3e est le niveau terminal — celui du brevet : l'imparfait et
// le plus-que-parfait du subjonctif que le récit littéraire emploie, la
// concordance des temps, les VALEURS MODALES, et le système des temps tenu à
// l'échelle d'un texte entier.
// ⛔ Aucun item n'est repris de `4e/francais/conjugaison.bank.ts`.
//
// ⛔ ÉCARTÉ VOLONTAIREMENT : la concordance qui appelle un subjonctif imparfait
// après une principale au passé (« il fallait que tu fusses »). Le français
// d'aujourd'hui y met le présent, et les deux sont corrects — un QCM ne peut
// pas trancher ce que la langue ne tranche pas. La concordance interrogée ici
// est celle de l'INDICATIF, qui, elle, est ferme.
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

/** Une forme à produire : la consigne pose la demande, `juste` est attendue. */
type Forme = {
  readonly consigne: string;
  readonly juste: string;
  readonly autres: readonly string[];
  readonly pourquoi: string;
};

/** Une forme à classer : on la donne dans une phrase, on demande sa catégorie. */
type Classement = { readonly phrase: string; readonly rep: string };

/** Un passage où la forme visée est NOMMÉE : dès qu'un texte porte deux verbes,
 *  la question doit dire duquel elle parle, sinon deux lignes sont vraies. */
type Passage = { readonly texte: string; readonly forme: string; readonly rep: string };

/* =============================================================================
   1. L'IMPARFAIT ET LE PLUS-QUE-PARFAIT DU SUBJONCTIF
   ---------------------------------------------------------------------------
   ⚠️ LA CONFUSION À DÉFAIRE, et elle tient à un accent : « il vint » est un
   passé simple de l'indicatif, « qu'il vînt » un imparfait du subjonctif. Les
   lignes vont donc par SÉRIES : la même phrase aux cinq formes qui se
   ressemblent.
   ========================================================================== */

/* ⚠️ La forme visée est NOMMÉE dans la question. Sans cela, « Il fallait qu'il
   vînt » en contient deux — un imparfait de l'indicatif et un imparfait du
   subjonctif —, et deux lignes seraient vraies à la fois. */
const SUBJONCTIFS: readonly Passage[] = [
  { texte: "Il fallait qu'il vînt sur-le-champ.", forme: "vînt", rep: "l'imparfait du mode subjonctif" },
  { texte: "Il fallait qu'il fût venu avant la nuit.", forme: "fût venu", rep: "le plus-que-parfait du subjonctif" },
  { texte: "Il vint sur-le-champ, sans qu'on l'appelle.", forme: "vint", rep: "le passé simple de l'indicatif" },
  { texte: "Il faut qu'il vienne sur-le-champ.", forme: "vienne", rep: "le présent du mode subjonctif" },
  { texte: "Il faut qu'il soit venu avant la nuit.", forme: "soit venu", rep: "le passé du mode subjonctif" },

  { texte: "Je craignais qu'elle ne partît sans nous.", forme: "partît", rep: "l'imparfait du mode subjonctif" },
  { texte: "Je craignais qu'elle ne fût partie sans nous.", forme: "fût partie", rep: "le plus-que-parfait du subjonctif" },
  { texte: "Elle partit sans nous, à la nuit tombée.", forme: "partit", rep: "le passé simple de l'indicatif" },
  { texte: "Je crains qu'elle ne parte sans nous.", forme: "parte", rep: "le présent du mode subjonctif" },
  { texte: "Je crains qu'elle ne soit partie sans nous.", forme: "soit partie", rep: "le passé du mode subjonctif" },

  { texte: "Bien qu'il fît nuit, ils continuèrent de monter.", forme: "fît", rep: "l'imparfait du mode subjonctif" },
  { texte: "On eût dit que la mer allait tout emporter.", forme: "eût dit", rep: "le plus-que-parfait du subjonctif" },
  { texte: "Il fit nuit très tôt ce soir-là.", forme: "fit", rep: "le passé simple de l'indicatif" },
  { texte: "Bien qu'il fasse nuit, ils continuent de monter.", forme: "fasse", rep: "le présent du mode subjonctif" },
  { texte: "Bien qu'il ait fait nuit très tôt, ils ont continué.", forme: "ait fait", rep: "le passé du mode subjonctif" },

  { texte: "Nous voulions qu'ils prissent le premier car.", forme: "prissent", rep: "l'imparfait du mode subjonctif" },
  { texte: "Nous voulions qu'ils eussent terminé avant midi.", forme: "eussent terminé", rep: "le plus-que-parfait du subjonctif" },
  { texte: "Ils prirent le premier car, à cinq heures.", forme: "prirent", rep: "le passé simple de l'indicatif" },
  { texte: "Elle exigea qu'il eût rendu sa copie avant midi.", forme: "eût rendu", rep: "le plus-que-parfait du subjonctif" },
  { texte: "Il faut qu'il fasse beau demain matin.", forme: "fasse", rep: "le présent du mode subjonctif" },
];

const TOUS_SUBJONCTIFS: readonly string[] = [...new Set(SUBJONCTIFS.map((s) => s.rep))];

/* =============================================================================
   2. LA CONCORDANCE DES TEMPS
   ---------------------------------------------------------------------------
   ⚠️ PAR PAIRES : la même phrase, principale au présent puis au passé. C'est le
   seul montage qui fasse voir la règle — une table où la principale serait
   toujours au passé apprendrait « après un verbe de parole, imparfait ».
   ========================================================================== */

const CONCORDANCE: readonly Forme[] = [
  { consigne: "« Il dit qu'il ___ demain. » (venir)", juste: "viendra", autres: ["viendrait", "venait", "vînt"], pourquoi: "la principale est au présent : le fait à venir se met au futur" },
  { consigne: "« Il disait qu'il ___ le lendemain. » (venir)", juste: "viendrait", autres: ["viendra", "vient", "vînt"], pourquoi: "la principale est au passé : le futur devient conditionnel présent, ce qu'on appelle le futur du passé" },
  { consigne: "« Elle sait que nous ___ raison. » (avoir)", juste: "avons", autres: ["avions", "aurions", "eûmes"], pourquoi: "la principale est au présent : le fait simultané se met au présent" },
  { consigne: "« Elle savait que nous ___ raison. » (avoir)", juste: "avions", autres: ["avons", "aurons", "eûmes"], pourquoi: "la principale est au passé : le fait simultané se met à l'imparfait" },
  { consigne: "« Je crois qu'il ___ déjà parti. » (être)", juste: "est", autres: ["était", "sera", "fût"], pourquoi: "la principale est au présent : le fait accompli se dit au présent de l'auxiliaire" },
  { consigne: "« Je croyais qu'il ___ déjà parti. » (être)", juste: "était", autres: ["est", "sera", "fût"], pourquoi: "la principale est au passé : l'auxiliaire passe à l'imparfait" },
  { consigne: "« Il affirme qu'il ___ tout vérifié la veille. » (avoir)", juste: "a", autres: ["avait", "aura", "eut"], pourquoi: "la principale est au présent : le fait antérieur se met au passé composé" },
  { consigne: "« Il affirma qu'il ___ tout vérifié la veille. » (avoir)", juste: "avait", autres: ["a", "aura", "eut"], pourquoi: "la principale est au passé : le fait antérieur se met au plus-que-parfait" },
  { consigne: "« Nous pensons qu'elle ___ bientôt. » (arriver)", juste: "arrivera", autres: ["arriverait", "arrivait", "arrivât"], pourquoi: "la principale est au présent : le fait à venir se met au futur" },
  { consigne: "« Nous pensions qu'elle ___ bientôt. » (arriver)", juste: "arriverait", autres: ["arrivera", "arrive", "arrivât"], pourquoi: "la principale est au passé : le futur devient conditionnel présent" },
  { consigne: "« Elle explique qu'elle ___ le car chaque matin. » (prendre)", juste: "prend", autres: ["prenait", "prendra", "prît"], pourquoi: "la principale est au présent : l'habitude se dit au présent" },
  { consigne: "« Elle expliqua qu'elle ___ le car chaque matin. » (prendre)", juste: "prenait", autres: ["prend", "prendra", "prît"], pourquoi: "la principale est au passé : l'habitude passe à l'imparfait" },
  { consigne: "« Tout le monde sait qu'il ___ raison depuis le début. » (avoir)", juste: "a", autres: ["avait", "aura", "eut"], pourquoi: "la principale est au présent : le fait simultané reste au présent" },
  { consigne: "« Tout le monde savait qu'il ___ raison depuis le début. » (avoir)", juste: "avait", autres: ["a", "aura", "eut"], pourquoi: "la principale est au passé : le fait simultané passe à l'imparfait" },
  { consigne: "« Je te promets que je ___ à temps. » (finir)", juste: "finirai", autres: ["finirais", "finissais", "finis"], pourquoi: "la principale est au présent : la promesse se dit au futur" },
  { consigne: "« Je t'avais promis que je ___ à temps. » (finir)", juste: "finirais", autres: ["finirai", "finis", "finissais"], pourquoi: "la principale est au passé : le futur devient conditionnel présent" },
  { consigne: "« On annonce que le sentier ___ demain. » (rouvrir)", juste: "rouvrira", autres: ["rouvrirait", "rouvrait", "rouvre"], pourquoi: "la principale est au présent : le fait à venir se met au futur" },
  { consigne: "« On annonçait que le sentier ___ le lendemain. » (rouvrir)", juste: "rouvrirait", autres: ["rouvrira", "rouvre", "rouvrait"], pourquoi: "la principale est au passé : le futur devient conditionnel présent" },
];

/* =============================================================================
   3. LES VALEURS MODALES
   ---------------------------------------------------------------------------
   « Mettre en évidence le lien entre le temps employé et le sens » : un temps
   ne dit pas seulement QUAND, il dit COMMENT le fait est présenté. Le
   conditionnel de la presse — « il y aurait trois blessés » — est le plus
   utile de tous en 3e : il s'entend chaque jour et personne ne le remarque.
   ========================================================================== */

const MODALES: readonly Classement[] = [
  { phrase: "Selon la mairie, le sentier rouvrirait la semaine prochaine.", rep: "le conditionnel d'information non confirmée : le fait est donné sans garantie" },
  { phrase: "D'après le journal, il y aurait eu trois blessés.", rep: "le conditionnel d'information non confirmée : le fait est donné sans garantie" },
  { phrase: "Le suspect se serait enfui par les toits.", rep: "le conditionnel d'information non confirmée : le fait est donné sans garantie" },

  { phrase: "Pourriez-vous fermer la fenêtre ?", rep: "le conditionnel de politesse : il adoucit une demande qu'on n'ose pas faire" },
  { phrase: "J'aimerais vous poser une question.", rep: "le conditionnel de politesse : il adoucit une demande qu'on n'ose pas faire" },
  { phrase: "Je voudrais un renseignement sur les horaires.", rep: "le conditionnel de politesse : il adoucit une demande qu'on n'ose pas faire" },

  { phrase: "Tu me rendras ce livre demain, sans faute.", rep: "le futur d'ordre atténué : il commande sans en avoir l'air, et sans cri" },
  { phrase: "Vous rendrez vos copies à la fin de l'heure.", rep: "le futur d'ordre atténué : il commande sans en avoir l'air, et sans cri" },
  { phrase: "Vous serez à l'heure lundi matin.", rep: "le futur d'ordre atténué : il commande sans en avoir l'air, et sans cri" },

  { phrase: "L'eau bout à cent degrés.", rep: "le présent de vérité générale : le fait vaut en tout temps et en tout lieu" },
  { phrase: "La Terre tourne autour du Soleil.", rep: "le présent de vérité générale : le fait vaut en tout temps et en tout lieu" },
  { phrase: "Qui vole un œuf vole un bœuf.", rep: "le présent de vérité générale : le fait vaut en tout temps et en tout lieu" },

  { phrase: "Relis bien ta copie avant de la rendre.", rep: "l'impératif de conseil : il ne commande pas vraiment, il te recommande" },
  { phrase: "Prends une veste avant de sortir.", rep: "l'impératif de conseil : il ne commande pas vraiment, il te recommande" },
  { phrase: "Méfie-toi des courants près de la barrière.", rep: "l'impératif de conseil : il ne commande pas vraiment, il te recommande" },

  { phrase: "Qu'il repose en paix.", rep: "le subjonctif de souhait : il présente le fait comme désiré, non réalisé" },
  { phrase: "Puissiez-vous réussir.", rep: "le subjonctif de souhait : il présente le fait comme désiré, non réalisé" },
  { phrase: "Que la chance soit avec vous.", rep: "le subjonctif de souhait : il présente le fait comme désiré, non réalisé" },
];

const TOUTES_MODALES: readonly string[] = [...new Set(MODALES.map((m) => m.rep))];

/* =============================================================================
   4. LE SYSTÈME DES TEMPS D'UN TEXTE
   ---------------------------------------------------------------------------
   ⚠️ La question porte sur UNE FORME NOMMÉE, pas sur le passage entier. Un
   retour en arrière est aussi du récit : demander « quel système ? » devant un
   passage qui contient les deux rendrait deux lignes vraies à la fois.
   ========================================================================== */

const SYSTEMES: readonly Passage[] = [
  { texte: "La nuit tombait. Il poussa la porte et s'assit sans un mot.", forme: "tombait", rep: "l'imparfait installe le décor, à l'arrière-plan du récit" },
  { texte: "Le vent forcissait. Les pêcheurs rentrèrent les barques avant midi.", forme: "forcissait", rep: "l'imparfait installe le décor, à l'arrière-plan du récit" },
  { texte: "Le soleil se couchait. Un chien aboya au loin, puis tout se tut.", forme: "se couchait", rep: "l'imparfait installe le décor, à l'arrière-plan du récit" },

  { texte: "La nuit tombait. Il poussa la porte et s'assit sans un mot.", forme: "poussa", rep: "le passé simple fait avancer le récit, action après action" },
  { texte: "La cloche sonna. Les élèves se levèrent en silence et sortirent.", forme: "sonna", rep: "le passé simple fait avancer le récit, action après action" },
  { texte: "Un cri déchira le silence. Tout le monde se retourna d'un bloc.", forme: "déchira", rep: "le passé simple fait avancer le récit, action après action" },

  { texte: "Il ouvrit la lettre. Elle l'avait écrite trois mois plus tôt.", forme: "avait écrite", rep: "le plus-que-parfait revient en arrière, avant le moment du récit" },
  { texte: "Il reconnut la maison. Il y avait passé tous ses étés d'enfance.", forme: "avait passé", rep: "le plus-que-parfait revient en arrière, avant le moment du récit" },
  { texte: "Elle relut la note. Le principal l'avait convoquée la veille.", forme: "avait convoquée", rep: "le plus-que-parfait revient en arrière, avant le moment du récit" },

  { texte: "Elle referma la porte. Elle ne reviendrait jamais dans cette maison.", forme: "reviendrait", rep: "le conditionnel dit ce qui va suivre, vu depuis le passé" },
  { texte: "Le train s'ébranla. Dans deux jours, il serait à Paris.", forme: "serait", rep: "le conditionnel dit ce qui va suivre, vu depuis le passé" },
  { texte: "Il ferma le cahier. Ce serait sa dernière année dans ce collège.", forme: "serait", rep: "le conditionnel dit ce qui va suivre, vu depuis le passé" },

  { texte: "Il marchait depuis des heures. Soudain, il s'arrête : quelque chose bouge.", forme: "s'arrête", rep: "le présent de narration fait basculer le récit dans l'instant" },
  { texte: "Le car montait lentement. Et là, tout bascule : un arbre barre la route.", forme: "bascule", rep: "le présent de narration fait basculer le récit dans l'instant" },
  { texte: "Ils avançaient depuis l'aube. Brusquement, le sentier s'ouvre sur la mer.", forme: "s'ouvre", rep: "le présent de narration fait basculer le récit dans l'instant" },

  { texte: "Je suis rentré tard hier soir, et ce matin je n'arrive pas à me lever.", forme: "suis rentré", rep: "le passé composé rattache le fait au moment où l'on parle" },
  { texte: "Nous avons visité l'usine ce matin. C'est impressionnant.", forme: "avons visité", rep: "le passé composé rattache le fait au moment où l'on parle" },
  { texte: "J'ai reçu ta lettre la semaine dernière. Je te réponds enfin.", forme: "ai reçu", rep: "le passé composé rattache le fait au moment où l'on parle" },
];

const TOUS_SYSTEMES: readonly string[] = [...new Set(SYSTEMES.map((s) => s.rep))];

/* =============================================================================
   5. PARTICIPE PRÉSENT, ADJECTIF VERBAL, GÉRONDIF — ET NOM
   ---------------------------------------------------------------------------
   Quatre emplois pour une même terminaison, et l'orthographe change avec
   l'emploi : « fatiguant tout le monde » mais « un travail fatigant » ;
   « convainquant l'assemblée » mais « un argument convaincant ».
   ⚠️ La quatrième catégorie n'est pas un remplissage : « les habitants », « les
   passants », « les commerçants » sont bien des noms, et sans elle le QCM ne
   sortirait qu'à trois lignes.
   ========================================================================== */

const ANT: readonly Classement[] = [
  { phrase: "Les élèves, obéissant à la consigne, se sont tus aussitôt.", rep: "un participe présent : invariable, il se comporte comme un verbe" },
  { phrase: "Une odeur, provoquant des maux de tête, montait de la cave.", rep: "un participe présent : invariable, il se comporte comme un verbe" },
  { phrase: "Négligeant les consignes de sécurité, il a tout raté.", rep: "un participe présent : invariable, il se comporte comme un verbe" },
  { phrase: "Fatiguant tout le monde, il a fini par se taire.", rep: "un participe présent : invariable, il se comporte comme un verbe" },
  { phrase: "Convainquant l'assemblée en dix minutes, elle a emporté le vote.", rep: "un participe présent : invariable, il se comporte comme un verbe" },

  { phrase: "Ce sont des élèves très obéissants.", rep: "un adjectif verbal : il s'accorde avec le nom, comme un adjectif" },
  { phrase: "Elle a pris une attitude provocante.", rep: "un adjectif verbal : il s'accorde avec le nom, comme un adjectif" },
  { phrase: "Ce sont des élèves négligents.", rep: "un adjectif verbal : il s'accorde avec le nom, comme un adjectif" },
  { phrase: "C'était un travail fatigant.", rep: "un adjectif verbal : il s'accorde avec le nom, comme un adjectif" },
  { phrase: "Voilà un argument convaincant.", rep: "un adjectif verbal : il s'accorde avec le nom, comme un adjectif" },

  { phrase: "Il est parti en courant sous la pluie.", rep: "un gérondif : « en » suivi de la forme en -ant, il dit comment ou quand" },
  { phrase: "En relisant sa copie, elle a trouvé trois fautes.", rep: "un gérondif : « en » suivi de la forme en -ant, il dit comment ou quand" },
  { phrase: "Il apprend en écoutant les autres.", rep: "un gérondif : « en » suivi de la forme en -ant, il dit comment ou quand" },
  { phrase: "En arrivant au port, ils ont vu la barque échouée.", rep: "un gérondif : « en » suivi de la forme en -ant, il dit comment ou quand" },
  { phrase: "Elle répond toujours en souriant.", rep: "un gérondif : « en » suivi de la forme en -ant, il dit comment ou quand" },

  { phrase: "Les commerçants du quartier ont fermé à midi.", rep: "un nom : la forme en -ant a son déterminant et se met au pluriel" },
  { phrase: "Les habitants des hauts descendent rarement.", rep: "un nom : la forme en -ant a son déterminant et se met au pluriel" },
  { phrase: "Les passants s'arrêtaient devant la vitrine.", rep: "un nom : la forme en -ant a son déterminant et se met au pluriel" },
  { phrase: "Les manifestants ont défilé jusqu'au port.", rep: "un nom : la forme en -ant a son déterminant et se met au pluriel" },
  { phrase: "Les gagnants seront prévenus par courrier.", rep: "un nom : la forme en -ant a son déterminant et se met au pluriel" },
];

const TOUS_ANT: readonly string[] = [...new Set(ANT.map((a) => a.rep))];

/* =============================================================================
   6. LES ONZE IRRÉGULIERS AUX TEMPS LES MOINS FRÉQUENTS
   ---------------------------------------------------------------------------
   Le programme nomme les onze verbes ; la 4e les conjugue au subjonctif présent
   et au passé simple des personnes courantes. Restent les temps qu'on ne voit
   qu'à l'écrit, et les personnes qu'on n'emploie jamais à l'oral : « nous
   sûmes », « vous pûtes », « qu'ils prissent ».
   ⚠️ Le piège tient à un accent : « il vint » n'est pas « qu'il vînt ».
   ========================================================================== */

const IRREGULIERS: readonly Forme[] = [
  { consigne: "« venir », imparfait du subjonctif, avec « il »", juste: "vînt", autres: ["vint", "vienne", "viendrait"], pourquoi: "l'imparfait du mode subjonctif se construit sur le passé simple, avec un accent circonflexe à la troisième personne" },
  { consigne: "« faire », imparfait du subjonctif, avec « nous »", juste: "fissions", autres: ["fîmes", "fassions", "faisions"], pourquoi: "le passé simple « nous fîmes » donne l'imparfait du mode subjonctif « que nous fissions »" },
  { consigne: "« pouvoir », passé simple, avec « vous »", juste: "pûtes", autres: ["pouviez", "pourrez", "puissiez"], pourquoi: "« pouvoir » a un passé simple en -u- : je pus, nous pûmes, vous pûtes" },
  { consigne: "« savoir », passé simple, avec « nous »", juste: "sûmes", autres: ["savions", "saurons", "sachions"], pourquoi: "« savoir » a un passé simple en -u- : je sus, nous sûmes" },
  { consigne: "« vouloir », imparfait du subjonctif, avec « il »", juste: "voulût", autres: ["voulut", "veuille", "voudrait"], pourquoi: "« qu'il voulût » prend l'accent circonflexe ; « il voulut » sans accent est un passé simple" },
  { consigne: "« voir », passé simple, avec « vous »", juste: "vîtes", autres: ["voyiez", "verrez", "voyez"], pourquoi: "« voir » fait au passé simple je vis, nous vîmes, vous vîtes" },
  { consigne: "« prendre », imparfait du subjonctif, avec « ils »", juste: "prissent", autres: ["prirent", "prennent", "prendraient"], pourquoi: "le passé simple « ils prirent » donne l'imparfait du mode subjonctif « qu'ils prissent »" },
  { consigne: "« aller », imparfait du subjonctif, avec « je »", juste: "allasse", autres: ["allai", "aille", "irais"], pourquoi: "« aller » a un passé simple en -a- : j'allai, donc « que j'allasse »" },
  { consigne: "« dire », passé simple, avec « nous »", juste: "dîmes", autres: ["disions", "dirons", "disons"], pourquoi: "« dire » fait au passé simple je dis, nous dîmes, avec l'accent circonflexe" },
  { consigne: "« falloir », imparfait du subjonctif", juste: "fallût", autres: ["fallut", "faille", "faudrait"], pourquoi: "« qu'il fallût » prend l'accent ; « il fallut » sans accent est un passé simple" },
  { consigne: "« valoir », imparfait du subjonctif, avec « il »", juste: "valût", autres: ["valut", "vaille", "vaudrait"], pourquoi: "« qu'il valût » prend l'accent ; « il valut » sans accent est un passé simple" },
  { consigne: "« venir », passé antérieur, avec « il »", juste: "il fut venu", autres: ["il eut venu", "il était venu", "il aura venu"], pourquoi: "« venir » se conjugue avec être : le passé antérieur est l'auxiliaire au passé simple suivi du participe" },
  { consigne: "« faire », futur antérieur, avec « nous »", juste: "nous aurons fait", autres: ["nous avons fait", "nous eûmes fait", "nous avions fait"], pourquoi: "le futur antérieur, c'est l'auxiliaire au futur simple suivi du participe passé" },
  { consigne: "« pouvoir », conditionnel passé, avec « ils »", juste: "ils auraient pu", autres: ["ils auront pu", "ils avaient pu", "ils eurent pu"], pourquoi: "le conditionnel passé, c'est l'auxiliaire au conditionnel présent suivi du participe passé" },
  { consigne: "« savoir », impératif présent, avec « tu »", juste: "sache", autres: ["sais", "saches", "saurais"], pourquoi: "« savoir » emprunte son impératif au subjonctif, mais sans -s : sache, sachons, sachez" },
  { consigne: "« vouloir », impératif présent, avec « vous »", juste: "veuillez", autres: ["voulez", "vouliez", "voudriez"], pourquoi: "« vouloir » fait à l'impératif veuille, veuillons, veuillez" },
  { consigne: "« aller », passé simple, avec « nous »", juste: "allâmes", autres: ["allions", "irons", "allons"], pourquoi: "« aller » a un passé simple en -a-, comme les verbes du premier groupe : nous allâmes" },
  { consigne: "« voir », imparfait du subjonctif, avec « elle »", juste: "vît", autres: ["vit", "voie", "verrait"], pourquoi: "« qu'elle vît » prend l'accent circonflexe ; « elle vit » sans accent est un passé simple" },
];

/** Gabarit des tables de PRODUCTION. */
function gabaritForme(
  id: string,
  microId: string,
  table: readonly Forme[],
  difficulty: 2 | 3,
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
    notionId: "conjugaison",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: [...tags],
    generate: () => {
      const f = randomChoice(table);
      return {
        text: `${f.consigne}\n\nQuelle est la forme correcte ?`,
        format: "qcm" as const,
        choices: shuffle([f.juste, ...f.autres]),
        expected: [f.juste],
        comparator: "mcq_exact" as const,
        explanation: exp(definition, methode, `${f.pourquoi}.`, `La forme correcte est « ${f.juste} ».`),
      };
    },
  };
}

/** Gabarit des tables de CLASSEMENT. */
function gabaritClassement(
  id: string,
  microId: string,
  table: readonly Classement[],
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
    niveau: "3e",
    matiere: "francais",
    notionId: "conjugaison",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: [...tags],
    generate: () => {
      const c = randomChoice(table);
      return {
        text: `« ${c.phrase} »\n\n${question}`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, pool),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(definition, methode, `« ${c.phrase} » → ${c.rep}.`, `${c.rep.charAt(0).toUpperCase()}${c.rep.slice(1)}.`),
      };
    },
  };
}

export const conjugaison3eBank: TutorBankItemV4[] = [
  {
    kind: "template",
    id: "3e_conj_subjonctif_imparfait_pqp_tpl_1",
    niveau: "3e",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "3e_conj_subjonctif_imparfait_pqp",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde d'abord s'il y a un « que » devant. Puis regarde l'accent circonflexe.",
    tags: ["3e", "conjugaison", "subjonctif", "imparfait", "plus-que-parfait", "template"],
    generate: () => {
      const s = randomChoice(SUBJONCTIFS);
      return {
        text: `« ${s.texte} »\n\nÀ quel temps et à quel mode « ${s.forme} » est-il ?`,
        format: "qcm" as const,
        choices: makeChoices(s.rep, TOUS_SUBJONCTIFS),
        expected: [s.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'imparfait du subjonctif se construit sur le passé simple et prend un accent circonflexe à la troisième personne du singulier : « qu'il vînt ». Le plus-que-parfait du subjonctif, lui, met cet imparfait sur l'auxiliaire : « qu'il fût venu ». Les deux appartiennent au récit littéraire et ne se rencontrent presque plus qu'à l'écrit.",
          "Deux indices suffisent. Un mot subordonnant « que » annonce le subjonctif ; sans lui, on est à l'indicatif. Puis l'accent tranche : « il vint » est un passé simple, « qu'il vînt » un imparfait du subjonctif.",
          `Dans « ${s.texte} », « ${s.forme} » est ${s.rep}.`,
          `${s.rep.charAt(0).toUpperCase()}${s.rep.slice(1)}.`,
        ),
      };
    },
  },
  gabaritForme(
    "3e_conj_concordance_tpl_1",
    "3e_conj_concordance",
    CONCORDANCE,
    3,
    "Regarde d'abord le temps de la PRINCIPALE : c'est lui qui commande.",
    "La subordonnée règle son temps sur celui de la principale. Si la principale est au présent, la subordonnée emploie le présent, le passé composé ou le futur. Si la principale est au passé, tout recule d'un cran : imparfait, plus-que-parfait, et conditionnel présent pour ce qui était encore à venir.",
    "Repère le verbe de la principale. S'il est au passé, remplace le présent par l'imparfait, le passé composé par le plus-que-parfait, et le futur par le conditionnel présent — ce qu'on appelle le futur du passé.",
    ["3e", "conjugaison", "concordance", "template"],
  ),
  gabaritClassement(
    "3e_conj_valeurs_modales_tpl_1",
    "3e_conj_valeurs_modales",
    MODALES,
    TOUTES_MODALES,
    "Que fait la forme verbale employée ici ?",
    3,
    "Le temps ne dit pas seulement quand : il dit comment le fait est présenté.",
    "Un temps a une valeur modale quand il sert à autre chose qu'à situer dans le temps. Le conditionnel donne une information sans la garantir — c'est celui de la presse — ou adoucit une demande. Le futur commande sans en avoir l'air. Le présent énonce une vérité qui ne dépend d'aucune date. L'impératif conseille. Le subjonctif souhaite.",
    "Demande-toi si la forme situe vraiment dans le temps. « Il y aurait trois blessés » ne parle pas de l'avenir ni d'une condition : elle dit que l'information n'est pas confirmée. C'est cela, une valeur modale.",
    ["3e", "conjugaison", "valeurs-modales", "template"],
  ),
  {
    kind: "template",
    id: "3e_conj_systeme_temps_texte_tpl_1",
    niveau: "3e",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "3e_conj_systeme_temps_texte",
    difficulty: 3,
    theme: "neutral",
    hint: "Une seule forme est en jeu. Demande-toi ce qu'elle fait AU RÉCIT.",
    tags: ["3e", "conjugaison", "systeme-des-temps", "recit", "template"],
    generate: () => {
      const s = randomChoice(SYSTEMES);
      return {
        text: `« ${s.texte} »\n\nQue fait « ${s.forme} » dans ce passage ?`,
        format: "qcm" as const,
        choices: makeChoices(s.rep, TOUS_SYSTEMES),
        expected: [s.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Dans un texte, les temps se partagent le travail. Le récit repose sur deux temps : l'imparfait, qui étale et installe, et le passé simple, qui découpe et fait avancer. Autour d'eux, le plus-que-parfait revient en arrière, le conditionnel annonce ce qui suivra, le présent de narration rapproche brusquement la scène — et le passé composé, lui, appartient à celui qui parle, pas au récit.",
          "Supprime la phrase et relis. Si l'enchainement tient encore, la forme était à l'arrière-plan. Si le récit se casse, elle le faisait avancer. Et si le temps ne colle pas avec ses voisins, cherche pourquoi : c'est presque toujours un décrochage voulu.",
          `Dans « ${s.texte} », ${s.rep}.`,
          `${s.rep.charAt(0).toUpperCase()}${s.rep.slice(1)}.`,
        ),
      };
    },
  },
  gabaritClassement(
    "3e_conj_participe_gerondif_tpl_1",
    "3e_conj_participe_gerondif",
    ANT,
    TOUS_ANT,
    "Qu'est-ce que la forme en -ant, ici ?",
    3,
    "Essaie de mettre au pluriel ou au féminin. Si la forme bouge, c'est un adjectif.",
    "Une même terminaison recouvre quatre emplois. Le participe présent reste invariable et garde ses compléments, comme un verbe. L'adjectif verbal s'accorde et qualifie, comme un adjectif — et son orthographe change souvent : « fatiguant » devient « fatigant », « convainquant » devient « convaincant ». Le gérondif est précédé de « en ». Et certaines formes sont devenues des noms à part entière.",
    "Trois tests. Un déterminant devant : c'est un nom. Un « en » devant : c'est un gérondif. Sinon, essaie d'accorder : si la forme s'accorde, c'est un adjectif verbal ; si elle refuse et garde un complément d'objet, c'est un participe présent.",
    ["3e", "conjugaison", "participe-present", "adjectif-verbal", "gerondif", "template"],
  ),
  gabaritForme(
    "3e_conj_irreguliers_temps_rares_tpl_1",
    "3e_conj_irreguliers_temps_rares",
    IRREGULIERS,
    3,
    "L'imparfait du subjonctif se fabrique sur le passé simple, et prend l'accent.",
    "Les onze verbes irréguliers que le programme nomme — faire, aller, dire, venir, pouvoir, voir, vouloir, prendre, savoir, falloir, valoir — se conjuguent aussi aux temps qu'on ne rencontre plus qu'à l'écrit. L'imparfait du subjonctif se construit toujours sur le passé simple, et prend un accent circonflexe à la troisième personne du singulier.",
    "Trouve d'abord le passé simple : « il prit » donne « qu'il prît » et « qu'ils prissent » ; « il fut » donne « qu'il fût ». L'accent circonflexe est le seul signe qui distingue « il vint » de « qu'il vînt ».",
    ["3e", "conjugaison", "irreguliers", "temps-rares", "template"],
  ),
];
