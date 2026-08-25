// lib/tutor-v4/questionBank/3e/francais/phrase-complexe.bank.ts
//
// LA PHRASE COMPLEXE EN 3e — écrit le 13/08/2026.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020. C'est le programme ENCORE EN
// VIGUEUR pour la 3e : le nouveau BO du 5 mars 2026 ne l'atteindra qu'en
// septembre 2028. ⛔ Ne pas confondre avec le programme suivi par la 5e.
//
// NOTION NEUVE : `phrase_complexe`. La 3e ne l'avait pas — alors que le CM2 et
// la 6e en ont une — pendant que le programme lui consacre une section entière,
// « Fonctionnement de la phrase complexe ».
//
// ⭐ CE QUI SÉPARE CETTE BANQUE DE CELLE DE LA 4e : les « attendus de fin de
// cycle » du programme sont les attendus de fin de 3e. Même section, niveau
// terminal. La 4e nomme les cinq sortes de subordonnées et donne leur fonction ;
// la 3e les EMBOITE, pèse leur degré de dépendance, lit le rapport logique
// qu'elles portent et analyse le système hypothétique entier.
// ⛔ Aucun item n'est repris de `4e/francais/phrase-complexe.bank.ts`.
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
   1. L'ANALYSE PROPOSITIONNELLE COMPLÈTE
   ---------------------------------------------------------------------------
   On compte les VERBES CONJUGUÉS. Une phrase de trois lignes peut n'en avoir
   qu'un ; une phrase de huit mots peut en avoir trois. Aucune de ces phrases ne
   contient d'infinitive ni de participiale : la consigne serait ambiguë.
   ========================================================================== */

const DECOUPAGE: readonly Cas[] = [
  { gauche: "Le vieux gardien du phare, que personne n'avait vu depuis trois jours, descendit enfin au village.", droite: "deux propositions : la phrase est complexe" },
  { gauche: "Il savait qu'elle mentait, mais il ne dit rien.", droite: "trois propositions : la phrase est complexe" },
  { gauche: "Quand la pluie cessa, le vent se leva et la mer devint blanche.", droite: "trois propositions : la phrase est complexe" },
  { gauche: "Malgré les avertissements du maire et la fermeture du sentier, quelques promeneurs montèrent jusqu'au cratère.", droite: "une seule proposition : la phrase est simple" },
  { gauche: "Personne ne comprit pourquoi il était parti si vite.", droite: "deux propositions : la phrase est complexe" },
  { gauche: "Elle affirme qu'elle a tout vérifié et qu'elle ne s'est trompée nulle part.", droite: "trois propositions : la phrase est complexe" },
  { gauche: "Le car qui dessert les hauts arrive à six heures.", droite: "deux propositions : la phrase est complexe" },
  { gauche: "Il pleuvait ; les volets claquaient ; personne ne dormait ; la nuit n'en finissait pas.", droite: "quatre propositions : la phrase est complexe" },
  { gauche: "Le rapport que le principal avait demandé et que les professeurs avaient rédigé fut perdu.", droite: "trois propositions : la phrase est complexe" },
  { gauche: "Dans le silence du matin, le bruit régulier des vagues berçait tout le quartier.", droite: "une seule proposition : la phrase est simple" },
  { gauche: "Je crois qu'il viendra si le temps le permet.", droite: "trois propositions : la phrase est complexe" },
  { gauche: "Nous avons attendu, nous avons appelé, nous sommes repartis, et personne n'a répondu.", droite: "quatre propositions : la phrase est complexe" },
  { gauche: "L'homme dont je te parle habite au bout du chemin.", droite: "deux propositions : la phrase est complexe" },
  { gauche: "Après trois heures de marche sous un soleil brulant, les élèves atteignirent la crête.", droite: "une seule proposition : la phrase est simple" },
  { gauche: "Elle raconta ce qu'elle avait vu, puis elle se tut.", droite: "trois propositions : la phrase est complexe" },
  { gauche: "Il faut que tu partes avant que la nuit tombe.", droite: "trois propositions : la phrase est complexe" },
];

const TOUS_DECOUPAGES: readonly string[] = [...new Set(DECOUPAGE.map((d) => d.droite))];

/* =============================================================================
   2. L'ENCHÂSSEMENT
   ---------------------------------------------------------------------------
   Une subordonnée peut dépendre d'une autre subordonnée : c'est l'emboitement
   que la 4e n'aborde pas. La question est toujours la même — DE QUOI la
   proposition entre crochets dépend-elle ?
   ⚠️ Les quatre réponses sont exclusives : une subordonnée coordonnée à une
   autre subordonnée dépend, elle aussi, de la principale — elle est donc au
   premier degré, et non dans une catégorie à part. Une catégorie « coordonnée »
   aurait rendu deux lignes vraies à la fois.
   ========================================================================== */

const ENCHASSEMENT: readonly Cas[] = [
  { gauche: "Je crois [qu'il viendra] demain.", droite: "de la proposition principale, directement : elle est au premier degré seulement" },
  { gauche: "Il affirme [qu'il a tout vérifié].", droite: "de la proposition principale, directement : elle est au premier degré seulement" },
  { gauche: "Elle ignore [pourquoi le sentier est fermé].", droite: "de la proposition principale, directement : elle est au premier degré seulement" },
  { gauche: "Nous partirons [si le temps le permet].", droite: "de la proposition principale, directement : elle est au premier degré seulement" },
  { gauche: "Je crois qu'il viendra et [qu'il restera jusqu'au soir].", droite: "de la proposition principale, directement : elle est au premier degré seulement" },

  { gauche: "Je crois qu'il viendra [dès que la pluie cessera].", droite: "d'une autre subordonnée : elle est enchâssée au second degré, plus bas" },
  { gauche: "Il affirme qu'il a relu le dossier [que le principal lui avait remis].", droite: "d'une autre subordonnée : elle est enchâssée au second degré, plus bas" },
  { gauche: "Elle ignore pourquoi le sentier [qui mène au cratère] est fermé.", droite: "d'une autre subordonnée : elle est enchâssée au second degré, plus bas" },
  { gauche: "On raconte que le pêcheur [qui a trouvé l'épave] n'a rien dit.", droite: "d'une autre subordonnée : elle est enchâssée au second degré, plus bas" },
  { gauche: "Tout le monde savait qu'elle partirait [quand l'année serait finie].", droite: "d'une autre subordonnée : elle est enchâssée au second degré, plus bas" },

  { gauche: "[Je crois] qu'il viendra demain.", droite: "de rien : c'est elle qui porte toutes les subordonnées, elle est principale" },
  { gauche: "[Le car partira] quand tout le monde sera monté.", droite: "de rien : c'est elle qui porte toutes les subordonnées, elle est principale" },
  { gauche: "[Personne ne savait] où il était passé.", droite: "de rien : c'est elle qui porte toutes les subordonnées, elle est principale" },
  { gauche: "[Il faut] que tu partes maintenant.", droite: "de rien : c'est elle qui porte toutes les subordonnées, elle est principale" },

  { gauche: "Il ferma le cahier et [il éteignit la lampe].", droite: "de rien : elle est indépendante, coordonnée ou juxtaposée à une autre de même rang" },
  { gauche: "Le vent se leva ; [les volets claquèrent] ; la maison trembla.", droite: "de rien : elle est indépendante, coordonnée ou juxtaposée à une autre de même rang" },
  { gauche: "Elle appela, [personne ne répondit], et elle raccrocha.", droite: "de rien : elle est indépendante, coordonnée ou juxtaposée à une autre de même rang" },
  { gauche: "La nuit tombait et [la mer devenait noire].", droite: "de rien : elle est indépendante, coordonnée ou juxtaposée à une autre de même rang" },
];

const TOUS_ENCHASSEMENTS: readonly string[] = [...new Set(ENCHASSEMENT.map((e) => e.droite))];

/* =============================================================================
   3. LE DEGRÉ DE DÉPENDANCE
   ---------------------------------------------------------------------------
   Autre question que la précédente : non plus DE QUOI la proposition dépend,
   mais À QUEL POINT. Une subordonnée complément d'objet ne se retire pas ; une
   subordonnée circonstancielle, si. C'est l'épreuve de la suppression.
   ========================================================================== */

const DEPENDANCE: readonly Cas[] = [
  { gauche: "[Le vent se leva] ; les volets claquèrent.", droite: "indépendante : elle se suffit à elle-même, et aucune autre ne la commande" },
  { gauche: "Il ferma le cahier et [il éteignit la lampe].", droite: "indépendante : elle se suffit à elle-même, et aucune autre ne la commande" },
  { gauche: "[La mer était calme] ce matin-là.", droite: "indépendante : elle se suffit à elle-même, et aucune autre ne la commande" },
  { gauche: "Elle relut la lettre, puis [elle la déchira].", droite: "indépendante : elle se suffit à elle-même, et aucune autre ne la commande" },

  { gauche: "[Je sais] que tu as raison.", droite: "principale : elle porte une ou plusieurs subordonnées, et ne dépend de rien" },
  { gauche: "[Le car partira] dès que tout le monde sera monté.", droite: "principale : elle porte une ou plusieurs subordonnées, et ne dépend de rien" },
  { gauche: "[Elle relut la copie] que l'élève avait rendue.", droite: "principale : elle porte une ou plusieurs subordonnées, et ne dépend de rien" },
  { gauche: "[Il faut] que tu partes avant la nuit.", droite: "principale : elle porte une ou plusieurs subordonnées, et ne dépend de rien" },

  { gauche: "Je sais [que tu as raison].", droite: "subordonnée essentielle : on ne peut pas la supprimer, la phrase serait incomplète" },
  { gauche: "Il faut [que tu partes avant la nuit].", droite: "subordonnée essentielle : on ne peut pas la supprimer, la phrase serait incomplète" },
  { gauche: "Elle se demande [si le car passera].", droite: "subordonnée essentielle : on ne peut pas la supprimer, la phrase serait incomplète" },
  { gauche: "Tout dépend de [ce que le jury décidera].", droite: "subordonnée essentielle : on ne peut pas la supprimer, la phrase serait incomplète" },
  { gauche: "Le problème est [que personne n'a vérifié].", droite: "subordonnée essentielle : on ne peut pas la supprimer, la phrase serait incomplète" },

  { gauche: "Le car partira [dès que tout le monde sera monté].", droite: "subordonnée accessoire : on peut la supprimer, et la phrase reste correcte" },
  { gauche: "Elle rentra [parce que la nuit tombait].", droite: "subordonnée accessoire : on peut la supprimer, et la phrase reste correcte" },
  { gauche: "Mon oncle, [qui vivait à Cilaos], ne descendait jamais.", droite: "subordonnée accessoire : on peut la supprimer, et la phrase reste correcte" },
  { gauche: "Nous continuerons [même s'il pleut].", droite: "subordonnée accessoire : on peut la supprimer, et la phrase reste correcte" },
  { gauche: "[Quand la cloche sonna], les élèves sortirent.", droite: "subordonnée accessoire : on peut la supprimer, et la phrase reste correcte" },
];

const TOUTES_DEPENDANCES: readonly string[] = [...new Set(DEPENDANCE.map((d) => d.droite))];

/* =============================================================================
   4. LE RAPPORT LOGIQUE DE LA CIRCONSTANCIELLE
   ---------------------------------------------------------------------------
   Sept rapports, que le mot subordonnant désigne presque toujours.
   ⛔ Écartés : « de sorte que », qui dit le but au subjonctif et la conséquence
   à l'indicatif sans qu'on entende la différence, et « comme si », qui mêle
   comparaison et hypothèse. Un QCM ne tranche pas ce que la langue laisse
   ouvert.
   ========================================================================== */

const RAPPORTS: readonly Cas[] = [
  { gauche: "Il rentra [parce que la nuit tombait].", droite: "la cause : elle dit pour quelle raison le fait a lieu" },
  { gauche: "[Puisque personne ne répond], nous partons.", droite: "la cause : elle dit pour quelle raison le fait a lieu" },
  { gauche: "[Comme il n'avait plus d'essence], il s'arrêta au bord de la route.", droite: "la cause : elle dit pour quelle raison le fait a lieu" },

  { gauche: "Il faisait si sombre [qu'on ne voyait plus le sentier].", droite: "la conséquence : elle dit ce que le fait finit par entrainer" },
  { gauche: "Il criait tellement fort [que la classe entière se retourna].", droite: "la conséquence : elle dit ce que le fait finit par entrainer" },
  { gauche: "La nuit était si noire [qu'on avançait à tâtons].", droite: "la conséquence : elle dit ce que le fait finit par entrainer" },

  { gauche: "Elle parla lentement [pour que tout le monde comprenne].", droite: "le but : elle dit dans quelle intention le sujet agit" },
  { gauche: "Il baissa la voix [afin que personne ne l'entende].", droite: "le but : elle dit dans quelle intention le sujet agit" },
  { gauche: "Elle ferma la porte [de peur que le chat ne sorte].", droite: "le but : elle dit dans quelle intention le sujet agit" },

  { gauche: "Nous sortirons [quand la pluie aura cessé].", droite: "le temps : elle situe le fait par rapport à un autre fait" },
  { gauche: "[Dès que le car arriva], nous sommes montés.", droite: "le temps : elle situe le fait par rapport à un autre fait" },
  { gauche: "[Pendant que le maitre expliquait], la pluie battait les vitres.", droite: "le temps : elle situe le fait par rapport à un autre fait" },

  { gauche: "Nous sortirons [si la pluie cesse].", droite: "la condition : elle dit à quoi le fait se trouve suspendu" },
  { gauche: "[À condition que tu révises], tu réussiras.", droite: "la condition : elle dit à quoi le fait se trouve suspendu" },
  { gauche: "Nous partirons [au cas où le vent forcirait].", droite: "la condition : elle dit à quoi le fait se trouve suspendu" },

  { gauche: "Il sortit [bien qu'il pleuve à verse].", droite: "la concession : elle dit ce qui aurait dû empêcher ce fait" },
  { gauche: "[Quoiqu'il soit très jeune], il dirige déjà l'atelier.", droite: "la concession : elle dit ce qui aurait dû empêcher ce fait" },
  { gauche: "[Même si tu insistes], je ne changerai pas d'avis.", droite: "la concession : elle dit ce qui aurait dû empêcher ce fait" },

  { gauche: "Elle courait [plus vite que je ne l'avais imaginé].", droite: "la comparaison : elle met le fait en regard d'un autre fait" },
  { gauche: "Le sentier montait [autant qu'il descendait].", droite: "la comparaison : elle met le fait en regard d'un autre fait" },
  { gauche: "Il connait l'île [mieux que personne ne la connaitra jamais].", droite: "la comparaison : elle met le fait en regard d'un autre fait" },
];

const TOUS_RAPPORTS: readonly string[] = [...new Set(RAPPORTS.map((r) => r.droite))];

/* =============================================================================
   5. DÉTERMINATIVE, EXPLICATIVE — ET LES DEUX QUI LEUR RESSEMBLENT
   ---------------------------------------------------------------------------
   La difficulté propre à la 3e n'est pas de nommer la relative : c'est de voir
   si elle RESTREINT le nom ou si elle le COMMENTE, et de ne pas confondre le
   « que » relatif avec le « que » complétif. Les quatre lignes obligent donc à
   la double décision.
   ========================================================================== */

const RELATIVES: readonly Cas[] = [
  { gauche: "Les élèves [qui avaient révisé] ont réussi.", droite: "une relative déterminative : elle restreint le nom, on ne peut pas la supprimer" },
  { gauche: "Le livre [que tu m'as prêté] m'a passionné.", droite: "une relative déterminative : elle restreint le nom, on ne peut pas la supprimer" },
  { gauche: "Je ne connais pas la personne [dont tu parles].", droite: "une relative déterminative : elle restreint le nom, on ne peut pas la supprimer" },
  { gauche: "Le sentier [qui mène au cratère] est fermé.", droite: "une relative déterminative : elle restreint le nom, on ne peut pas la supprimer" },
  { gauche: "Toutes les personnes [qui ont réservé] seront prévenues.", droite: "une relative déterminative : elle restreint le nom, on ne peut pas la supprimer" },

  { gauche: "Mon oncle, [qui vivait à Cilaos], ne descendait jamais.", droite: "une relative explicative : elle commente le nom, entre virgules, et se supprime" },
  { gauche: "Le piton des Neiges, [que l'on voit de partout], culmine à 3 070 mètres.", droite: "une relative explicative : elle commente le nom, entre virgules, et se supprime" },
  { gauche: "Ma sœur, [dont je t'ai parlé], arrive demain.", droite: "une relative explicative : elle commente le nom, entre virgules, et se supprime" },
  { gauche: "Le vieux phare, [qui n'éclaire plus personne], tient encore debout.", droite: "une relative explicative : elle commente le nom, entre virgules, et se supprime" },
  { gauche: "Cette lettre, [qu'elle avait écrite en hâte], ne partit jamais.", droite: "une relative explicative : elle commente le nom, entre virgules, et se supprime" },

  { gauche: "Je crois [que tu as raison].", droite: "une conjonctive complétive : le « que » ne remplace aucun nom, il complète le verbe" },
  { gauche: "Elle affirme [que le car est passé].", droite: "une conjonctive complétive : le « que » ne remplace aucun nom, il complète le verbe" },
  { gauche: "Il faut [que tout soit rangé].", droite: "une conjonctive complétive : le « que » ne remplace aucun nom, il complète le verbe" },
  { gauche: "Tout le monde sait [que la mer est dangereuse ici].", droite: "une conjonctive complétive : le « que » ne remplace aucun nom, il complète le verbe" },

  { gauche: "Je me demande [si le car passera].", droite: "une interrogative indirecte : elle pose une question sans point d'interrogation" },
  { gauche: "Elle ignore [pourquoi le sentier est fermé].", droite: "une interrogative indirecte : elle pose une question sans point d'interrogation" },
  { gauche: "Dis-moi [quand tu comptes partir].", droite: "une interrogative indirecte : elle pose une question sans point d'interrogation" },
  { gauche: "Personne ne savait [où il était passé].", droite: "une interrogative indirecte : elle pose une question sans point d'interrogation" },
];

const TOUTES_RELATIVES: readonly string[] = [...new Set(RELATIVES.map((r) => r.droite))];

/* =============================================================================
   6. LE SYSTÈME HYPOTHÉTIQUE
   ---------------------------------------------------------------------------
   « L'expression de la condition et de l'hypothèse » : le programme la nomme,
   et c'est le seul endroit où le mode conditionnel se comprend vraiment. Ce
   n'est pas « si » qui décide du sens, c'est le COUPLE de temps.
   ⛔ Rappel : dans ce programme, le conditionnel est un MODE.
   ========================================================================== */

const HYPOTHESES: readonly Cas[] = [
  { gauche: "Si tu révises, tu réussiras.", droite: "si + présent, puis futur : le fait est possible, il peut encore arriver" },
  { gauche: "Si le vent tombe, nous sortirons la barque.", droite: "si + présent, puis futur : le fait est possible, il peut encore arriver" },
  { gauche: "Si la pluie cesse, le match reprendra.", droite: "si + présent, puis futur : le fait est possible, il peut encore arriver" },
  { gauche: "Si tu insistes, il finira par céder.", droite: "si + présent, puis futur : le fait est possible, il peut encore arriver" },

  { gauche: "Si j'avais le temps, je viendrais avec vous.", droite: "si + imparfait, puis conditionnel présent : le fait est imaginé, contraire au présent" },
  { gauche: "Si j'étais toi, je recommencerais tout.", droite: "si + imparfait, puis conditionnel présent : le fait est imaginé, contraire au présent" },
  { gauche: "Si nous habitions plus près, nous viendrions à pied.", droite: "si + imparfait, puis conditionnel présent : le fait est imaginé, contraire au présent" },
  { gauche: "Si je savais nager, je traverserais le lagon.", droite: "si + imparfait, puis conditionnel présent : le fait est imaginé, contraire au présent" },

  { gauche: "Si tu avais su, tu ne serais pas parti.", droite: "si + plus-que-parfait, puis conditionnel passé : le fait est imaginé, contraire au passé" },
  { gauche: "Si elle avait écouté, elle aurait compris.", droite: "si + plus-que-parfait, puis conditionnel passé : le fait est imaginé, contraire au passé" },
  { gauche: "Si le car était passé, nous l'aurions vu.", droite: "si + plus-que-parfait, puis conditionnel passé : le fait est imaginé, contraire au passé" },
  { gauche: "Si tu m'avais prévenu, je serais resté.", droite: "si + plus-que-parfait, puis conditionnel passé : le fait est imaginé, contraire au passé" },

  { gauche: "Si on chauffe l'eau, elle bout.", droite: "si + présent, puis présent : ce n'est plus une hypothèse, c'est une constatation" },
  { gauche: "Si on descend au sud, il fait plus sec.", droite: "si + présent, puis présent : ce n'est plus une hypothèse, c'est une constatation" },
  { gauche: "Si le corail blanchit, c'est que l'eau est trop chaude.", droite: "si + présent, puis présent : ce n'est plus une hypothèse, c'est une constatation" },
  { gauche: "Si la mer est basse, on voit les rochers.", droite: "si + présent, puis présent : ce n'est plus une hypothèse, c'est une constatation" },
];

const TOUTES_HYPOTHESES: readonly string[] = [...new Set(HYPOTHESES.map((h) => h.droite))];

function gabarit(
  id: string,
  microId: string,
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
    niveau: "3e",
    matiere: "francais",
    notionId: "phrase_complexe",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: [...tags],
    generate: () => {
      const c = randomChoice(table);
      return {
        text: `« ${c.gauche} »\n\n${question}`,
        format: "qcm" as const,
        choices: makeChoices(c.droite, pool),
        expected: [c.droite],
        comparator: "mcq_exact" as const,
        explanation: exp(definition, methode, `« ${c.gauche} » → ${c.droite}.`, `${c.droite.charAt(0).toUpperCase()}${c.droite.slice(1)}.`),
      };
    },
  };
}

export const phraseComplexe3eBank: TutorBankItemV4[] = [
  gabarit(
    "3e_phrc_analyse_complete_tpl_1",
    "3e_phrc_analyse_complete",
    DECOUPAGE,
    TOUS_DECOUPAGES,
    "Combien de propositions cette phrase compte-t-elle ?",
    2,
    "Un verbe conjugué, une proposition. Les compléments, même longs, n'en font pas.",
    "Une phrase compte autant de propositions qu'elle compte de verbes conjugués. Ni la longueur ni les virgules ne décident : une phrase de trois lignes peut n'avoir qu'un verbe, une phrase de huit mots peut en avoir trois.",
    "Souligne chaque verbe conjugué, puis compte. Les groupes prépositionnels, les énumérations et les compléments circonstanciels ne comptent pas : ils appartiennent à la proposition qui les porte.",
    ["3e", "phrase-complexe", "analyse-propositionnelle", "template"],
  ),
  gabarit(
    "3e_phrc_enchassement_tpl_1",
    "3e_phrc_enchassement",
    ENCHASSEMENT,
    TOUS_ENCHASSEMENTS,
    "De quoi la proposition entre crochets dépend-elle ?",
    3,
    "Cherche le verbe qui la commande. S'il est lui-même dans une subordonnée, on est au second degré.",
    "Une subordonnée ne dépend pas toujours de la principale : elle peut dépendre d'une autre subordonnée. On dit alors qu'elle est enchâssée au second degré. Une subordonnée coordonnée à une autre reste, elle, au premier degré : les deux dépendent du même verbe.",
    "Remonte au mot que la proposition complète : un verbe, un nom, un adjectif. Puis regarde où ce mot se trouve. S'il appartient déjà à une subordonnée, la proposition est au second degré.",
    ["3e", "phrase-complexe", "enchassement", "template"],
  ),
  gabarit(
    "3e_phrc_degre_dependance_tpl_1",
    "3e_phrc_degre_dependance",
    DEPENDANCE,
    TOUTES_DEPENDANCES,
    "Quel est le degré de dépendance de la proposition entre crochets ?",
    3,
    "Essaie de la retirer. Ce qui reste te dit tout.",
    "Les propositions ne dépendent pas toutes au même degré. L'indépendante se suffit à elle-même. La principale porte les autres. Parmi les subordonnées, celles qui complètent le verbe — objet, sujet, attribut — sont essentielles ; celles qui n'ajoutent qu'une circonstance ou un commentaire sont accessoires.",
    "Supprime la proposition et relis. Si la phrase reste correcte, la subordonnée est accessoire. Si la phrase devient bancale — « Je sais. » pour « Je sais que tu as raison. » ne dit plus rien —, elle est essentielle.",
    ["3e", "phrase-complexe", "dependance", "template"],
  ),
  gabarit(
    "3e_phrc_circonstancielles_logique_tpl_1",
    "3e_phrc_circonstancielles_logique",
    RAPPORTS,
    TOUS_RAPPORTS,
    "Quel rapport logique la subordonnée exprime-t-elle ?",
    3,
    "Le mot qui l'introduit le dit presque toujours.",
    "Une subordonnée circonstancielle ne se contente pas de compléter : elle établit un rapport logique entre deux faits. Le programme en nomme sept — la cause, la conséquence, le but, le temps, la condition, la concession et la comparaison.",
    "Regarde le mot subordonnant. « Parce que », « puisque », « comme » disent la cause ; « si bien que », « tellement que » la conséquence ; « pour que », « afin que », « de peur que » le but ; « bien que », « quoique », « même si » la concession.",
    ["3e", "phrase-complexe", "circonstancielles", "rapport-logique", "template"],
  ),
  gabarit(
    "3e_phrc_relative_determinative_tpl_1",
    "3e_phrc_relative_determinative",
    RELATIVES,
    TOUTES_RELATIVES,
    "Quelle est la nature exacte de la proposition entre crochets ?",
    3,
    "Deux décisions : le mot introducteur remplace-t-il un nom ? Et la proposition restreint-elle, ou commente-t-elle ?",
    "Le pronom relatif remplace un nom placé avant lui ; la conjonction « que » ne remplace rien, elle complète simplement le verbe. Et parmi les relatives, la déterminative restreint le nom — « les élèves qui avaient révisé » n'est pas « les élèves » — tandis que l'explicative, entre virgules, n'ajoute qu'un commentaire qu'on pourrait retirer.",
    "Demande-toi d'abord si le mot introducteur a un antécédent. Puis, s'il en a un, regarde les virgules et essaie de supprimer : la déterminative résiste, l'explicative se retire sans dommage.",
    ["3e", "phrase-complexe", "relative", "determinative-explicative", "template"],
  ),
  gabarit(
    "3e_phrc_condition_hypothese_tpl_1",
    "3e_phrc_condition_hypothese",
    HYPOTHESES,
    TOUTES_HYPOTHESES,
    "Que dit ce système hypothétique ?",
    3,
    "Ce n'est pas « si » qui décide du sens : c'est le couple de temps.",
    "Après « si », le temps de la subordonnée et le mode de la principale forment un système. Présent puis futur : le fait est encore possible. Imparfait puis conditionnel présent : il est imaginé, et contraire au présent. Plus-que-parfait puis conditionnel passé : il est imaginé, et contraire à ce qui a eu lieu. Présent puis présent : ce n'est plus une hypothèse du tout, mais une constatation.",
    "⛔ Jamais de conditionnel après « si ». Repère le temps qui suit « si », puis celui de l'autre proposition : c'est le couple qui donne le sens, pas le mot « si » tout seul.",
    ["3e", "phrase-complexe", "condition", "hypothese", "template"],
  ),
];
