// lib/tutor-v4/questionBank/seconde/francais/relations-logiques.bank.ts
//
// LES RELATIONS LOGIQUES ET LA COHÉSION DU PROPOS — écrit le 14/08/2026.
//
// RÉFÉRENCE : programme de seconde générale et technologique, arrêté du
// 17 janvier 2019 modifié par le JORF du 8 octobre 2020, partie « Expression
// écrite et orale » de l'étude de la langue :
//   « Il peut s'agir tout d'abord de RELATIONS LOGIQUES FONDAMENTALES, qui se
//   rencontrent dans la plupart des discours construits :
//     — l'expression de la condition ;
//     — l'expression de la cause, de la conséquence et du but ;
//     — l'expression de la comparaison ;
//     — l'expression de l'opposition et de la concession. »
//   Puis : « adapter son expression aux différentes situations de
//   communication ; organiser le développement logique d'un propos ;
//   reformuler et synthétiser un propos ; discuter et réfuter une opinion ;
//   exprimer et nuancer une opinion. »
//
// ⛔⛔ LA NUANCE QUI DÉCIDE DU HORS-PROGRAMME. Ces relations sont bien travaillées
// DÈS LA SECONDE — mais par l'EXPRESSION : on choisit l'outil, on commute, on
// reformule. « Les subordonnées conjonctives utilisées en fonction de
// compléments circonstanciels » sont, elles, un objet d'étude de la CLASSE DE
// PREMIÈRE. Aucune question d'ici ne demande donc de NOMMER une circonstancielle
// ni d'en donner la nature : on la fabrique, on la remplace, on mesure l'effet.
//
// ⭐ Le IV du programme nomme l'exercice central : « les subordonnées
// circonstancielles : paraphrase, COMMUTATION AVEC DES STRUCTURES SÉMANTIQUEMENT
// ÉQUIVALENTES (PAR EXEMPLE DES GROUPES NOMINAUX) » et « les outils de cohésion
// textuelle : repérage de ces outils dans un texte, commutation avec des
// expressions synonymes ». Deux micros leur sont consacrées.
//
// ⛔ QCM, QUATRE propositions. ⛔ Aucune ligne morte.
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

type Outil = { readonly phrase: string; readonly vise: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };
type Commutation = { readonly phrase: string; readonly subordonnee: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };
type Enchainement = { readonly avant: string; readonly apres: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };
type Reprise = { readonly phrase: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };

/* =============================================================================
   1. CAUSE OU CONSÉQUENCE  (2de_rl_cause_consequence)
   ---------------------------------------------------------------------------
   ⚠️ LE RAPPORT VOULU EST ÉCRIT DANS LA QUESTION. Sans cela, plusieurs outils
   conviendraient et l'item aurait deux bonnes réponses. On ne demande pas
   « quel est le rapport ? » — c'était le travail du collège — mais « quel outil
   l'exprime ? », ce qui est un geste d'écriture.
   ========================================================================== */

const CAUSE_CONSEQUENCE: readonly Outil[] = [
  { phrase: "… la route était coupée, nous avons fait demi-tour.", vise: "la CAUSE", bonne: "Comme", faux: ["Si bien que", "Pour que", "Bien que"], raison: "« comme » en tête de phrase introduit la cause" },
  { phrase: "La route était coupée, … nous avons fait demi-tour.", vise: "la CONSÉQUENCE", bonne: "si bien que", faux: ["parce que", "pour que", "bien que"], raison: "« si bien que » introduit le résultat" },
  { phrase: "Nous avons fait demi-tour … la route était coupée.", vise: "la CAUSE", bonne: "parce que", faux: ["si bien que", "pour que", "bien que"], raison: "« parce que » apporte la cause comme une information neuve" },
  { phrase: "Il n'a pas répondu, … tout le monde a cru qu'il refusait.", vise: "la CONSÉQUENCE", bonne: "de sorte que", faux: ["étant donné que", "afin que", "quoique"], raison: "« de sorte que » introduit le résultat" },
  { phrase: "… le vent s'est levé, la mer est devenue mauvaise.", vise: "la CAUSE", bonne: "Étant donné que", faux: ["De sorte que", "Afin que", "Quoique"], raison: "« étant donné que » pose la cause comme un fait établi" },
  { phrase: "Le vent s'est levé : la mer est … devenue mauvaise.", vise: "la CONSÉQUENCE", bonne: "par conséquent", faux: ["en effet", "en vue de quoi", "pourtant"], raison: "« par conséquent » enchaine sur le résultat" },
  { phrase: "La séance est reportée, … le professeur est absent.", vise: "la CAUSE", bonne: "car", faux: ["donc", "afin que", "quoique"], raison: "« car » apporte l'explication qui suit l'affirmation" },
  { phrase: "Le professeur est absent, … la séance est reportée.", vise: "la CONSÉQUENCE", bonne: "donc", faux: ["car", "afin que", "quoique"], raison: "« donc » tire la conséquence de ce qui précède" },
  { phrase: "… tu connais déjà la règle, applique-la.", vise: "la CAUSE", bonne: "Puisque", faux: ["Si bien que", "Pour que", "Bien que"], raison: "« puisque » invoque une cause connue des deux interlocuteurs" },
  { phrase: "Il a tellement plu … la rivière a débordé.", vise: "la CONSÉQUENCE", bonne: "que", faux: ["car", "pour que", "bien que"], raison: "« tellement… que » exprime une conséquence tirée d'un degré" },
  { phrase: "Le bateau n'est pas sorti … de la houle.", vise: "la CAUSE", bonne: "à cause", faux: ["si bien", "en vue", "en dépit"], raison: "« à cause de » introduit une cause par un groupe nominal" },
  { phrase: "Le sujet était clair, … chacun a pu traiter la question.", vise: "la CONSÉQUENCE", bonne: "aussi", faux: ["en effet", "en vue de quoi", "or"], raison: "« aussi » en tête de proposition introduit une conséquence" },
  { phrase: "Elle a réussi … à son travail régulier.", vise: "la CAUSE", bonne: "grâce", faux: ["si bien", "en vue", "en dépit"], raison: "« grâce à » introduit une cause favorable" },
  { phrase: "… la salle était pleine, certains sont restés debout.", vise: "la CAUSE", bonne: "Vu que", faux: ["De sorte que", "Afin que", "Quoique"], raison: "« vu que » pose la cause comme constatée" },
  { phrase: "La salle était pleine ; … certains sont restés debout.", vise: "la CONSÉQUENCE", bonne: "c'est pourquoi", faux: ["c'est que", "en vue de quoi", "il n'empêche que"], raison: "« c'est pourquoi » annonce le résultat" },
  { phrase: "Il a rendu sa copie en avance, … il avait tout révisé.", vise: "la CAUSE", bonne: "car", faux: ["donc", "afin que", "quoique"], raison: "« car » explique après coup" },
];

/* =============================================================================
   2. BUT OU CONDITION  (2de_rl_but_condition)
   ---------------------------------------------------------------------------
   ⭐ Le but est une conséquence VOULUE ; la condition suspend le fait à autre
   chose. Deux relations que le programme nomme séparément, et qu'on confond
   d'autant plus qu'elles emploient parfois le même mode.
   ========================================================================== */

const BUT_CONDITION: readonly Outil[] = [
  { phrase: "Il a fermé les volets … personne ne voie la lumière.", vise: "le BUT", bonne: "pour que", faux: ["si bien que", "parce que", "bien que"], raison: "« pour que » exprime le but recherché" },
  { phrase: "… tu pars maintenant, tu arriveras avant la nuit.", vise: "la CONDITION", bonne: "Si", faux: ["Pour que", "Parce que", "Bien que"], raison: "« si » suspend le fait à une condition" },
  { phrase: "Répète plus fort … tout le monde t'entende.", vise: "le BUT", bonne: "afin que", faux: ["si bien que", "puisque", "quoique"], raison: "« afin que » exprime le but visé" },
  { phrase: "Nous sortirons … la mer se calme.", vise: "la CONDITION", bonne: "à condition que", faux: ["afin que", "puisque", "quoique"], raison: "« à condition que » pose la condition nécessaire" },
  { phrase: "Il a tout noté … de ne rien oublier.", vise: "le BUT", bonne: "en vue", faux: ["à force", "en raison", "en dépit"], raison: "« en vue de » exprime le but par un groupe" },
  { phrase: "… d'un imprévu, la séance serait reportée.", vise: "la CONDITION", bonne: "En cas", faux: ["En vue", "En raison", "En dépit"], raison: "« en cas de » pose une éventualité" },
  { phrase: "Parle doucement … ne pas réveiller les autres.", vise: "le BUT", bonne: "pour", faux: ["par", "malgré", "depuis"], raison: "« pour » suivi de l'infinitif exprime le but" },
  { phrase: "… que tu m'aides, je finirai ce soir.", vise: "la CONDITION", bonne: "Pourvu", faux: ["Afin", "Parce", "Bien"], raison: "« pourvu que » exprime la condition nécessaire et suffisante" },
  { phrase: "Il s'est levé tôt … arriver le premier.", vise: "le BUT", bonne: "afin d'", faux: ["au lieu d'", "à force d'", "en dépit d'"], raison: "« afin de » suivi de l'infinitif exprime le but" },
  { phrase: "Dépêche-toi, … nous partirons sans toi.", vise: "la CONDITION", bonne: "sinon", faux: ["afin que", "puisque", "quoique"], raison: "« sinon » pose la condition par la négative" },
  { phrase: "Elle relit toujours … qu'aucune faute ne subsiste.", vise: "le BUT", bonne: "de sorte", faux: ["à condition", "en raison", "en dépit"], raison: "« de sorte que » suivi du subjonctif exprime un but voulu" },
  { phrase: "… vous vous inscriviez avant lundi, la place est réservée.", vise: "la CONDITION", bonne: "Pour peu que", faux: ["Afin que", "Parce que", "Bien que"], raison: "« pour peu que » pose une condition minimale" },
  { phrase: "Il a répété la consigne … tous la comprennent.", vise: "le BUT", bonne: "pour que", faux: ["si bien que", "puisque", "quoique"], raison: "« pour que » exprime le but ; « si bien que » dirait un simple résultat" },
  { phrase: "… le vent tombait, nous sortirions le bateau.", vise: "la CONDITION", bonne: "Si", faux: ["Pour que", "Puisque", "Bien que"], raison: "« si » suivi de l'imparfait pose une condition non réalisée" },
  { phrase: "Range tes affaires … de ne rien perdre.", vise: "le BUT", bonne: "de façon", faux: ["à force", "en raison", "en dépit"], raison: "« de façon à » exprime le but" },
  { phrase: "… d'un retard, préviens-moi.", vise: "la CONDITION", bonne: "En cas", faux: ["En vue", "À force", "En dépit"], raison: "« en cas de » pose une éventualité" },
];

/* =============================================================================
   3. OPPOSITION OU CONCESSION  (2de_rl_opposition_concession)
   ---------------------------------------------------------------------------
   ⭐ L'OPPOSITION met deux faits face à face, sans que l'un empêche l'autre :
   « il travaille, alors que son frère joue ». LA CONCESSION admet un obstacle
   qui aurait dû empêcher, et qui n'a pas empêché : « bien qu'il pleuve, nous
   sortirons ». Le programme les nomme ensemble, mais elles ne disent pas la
   même chose — et c'est ce que l'argumentation exploite.
   ========================================================================== */

const OPPOSITION_CONCESSION: readonly Outil[] = [
  { phrase: "Nous sortirons … il pleuve à verse.", vise: "la CONCESSION, c'est-à-dire un obstacle qui n'empêche rien", bonne: "bien qu'", faux: ["tandis qu'", "parce qu'", "afin qu'"], raison: "« bien que » admet l'obstacle et le déclare inopérant" },
  { phrase: "Il travaille sans relâche, … son frère ne fait rien.", vise: "l'OPPOSITION, c'est-à-dire deux faits mis face à face", bonne: "tandis que", faux: ["bien que", "parce que", "afin que"], raison: "« tandis que » met deux faits en regard, sans obstacle" },
  { phrase: "… tout fût prêt, la sortie fut annulée.", vise: "la CONCESSION, c'est-à-dire un obstacle qui n'empêche rien", bonne: "Quoique", faux: ["Tandis que", "Parce que", "Afin que"], raison: "« quoique » admet un fait qui aurait dû jouer en sens contraire" },
  { phrase: "Le nord de l'ile est humide, … le sud reste sec.", vise: "l'OPPOSITION, c'est-à-dire deux faits mis face à face", bonne: "alors que", faux: ["bien que", "puisque", "afin que"], raison: "« alors que » oppose deux réalités parallèles" },
  { phrase: "Il a réussi … les difficultés.", vise: "la CONCESSION, c'est-à-dire un obstacle qui n'empêche rien", bonne: "malgré", faux: ["grâce à", "à cause de", "en vue de"], raison: "« malgré » admet l'obstacle par un groupe nominal" },
  { phrase: "Elle est arrivée en retard ; … elle a tout terminé.", vise: "la CONCESSION, c'est-à-dire un obstacle qui n'empêche rien", bonne: "pourtant", faux: ["donc", "en effet", "ainsi"], raison: "« pourtant » signale que l'attendu ne s'est pas produit" },
  { phrase: "Les uns ont choisi le théâtre, … les autres ont pris le roman.", vise: "l'OPPOSITION, c'est-à-dire deux faits mis face à face", bonne: "quant à eux", faux: ["bien qu'ils", "puisqu'ils", "afin qu'ils"], raison: "la formule met les deux groupes en regard" },
  { phrase: "… la mer soit agitée, le bateau sortira.", vise: "la CONCESSION, c'est-à-dire un obstacle qui n'empêche rien", bonne: "Bien que", faux: ["Tandis que", "Parce que", "Afin que"], raison: "« bien que » lève l'obstacle qu'il vient d'admettre" },
  { phrase: "Il parlait fort ; … personne ne l'écoutait.", vise: "la CONCESSION, c'est-à-dire un obstacle qui n'empêche rien", bonne: "cependant", faux: ["donc", "en effet", "ainsi"], raison: "« cependant » signale le démenti de l'attente" },
  { phrase: "Le premier texte est bref, … le second occupe trois pages.", vise: "l'OPPOSITION, c'est-à-dire deux faits mis face à face", bonne: "en revanche", faux: ["par conséquent", "en effet", "de plus"], raison: "« en revanche » met deux caractères en regard" },
  { phrase: "… ses efforts, il n'a pas obtenu la note espérée.", vise: "la CONCESSION, c'est-à-dire un obstacle qui n'empêche rien", bonne: "En dépit de", faux: ["Grâce à", "À cause de", "En vue de"], raison: "« en dépit de » admet ce qui aurait dû suffire" },
  { phrase: "Certains lisent vite, … d'autres prennent leur temps.", vise: "l'OPPOSITION, c'est-à-dire deux faits mis face à face", bonne: "tandis que", faux: ["bien que", "puisque", "afin que"], raison: "« tandis que » met deux habitudes en regard" },
  { phrase: "… il ait tout révisé, il a manqué la dernière question.", vise: "la CONCESSION, c'est-à-dire un obstacle qui n'empêche rien", bonne: "Bien qu'", faux: ["Tandis qu'", "Parce qu'", "Afin qu'"], raison: "« bien que » admet ce qui aurait dû garantir la réussite" },
  { phrase: "La côte est venteuse, … l'intérieur reste calme.", vise: "l'OPPOSITION, c'est-à-dire deux faits mis face à face", bonne: "alors que", faux: ["bien que", "puisque", "afin que"], raison: "« alors que » oppose deux lieux" },
  { phrase: "Il a promis de venir ; il n'est … pas venu.", vise: "la CONCESSION, c'est-à-dire un obstacle qui n'empêche rien", bonne: "toutefois", faux: ["donc", "en effet", "ainsi"], raison: "« toutefois » marque le démenti de la promesse" },
  { phrase: "Le premier candidat a parlé dix minutes, … le second en a pris trente.", vise: "l'OPPOSITION, c'est-à-dire deux faits mis face à face", bonne: "en revanche", faux: ["par conséquent", "en effet", "de plus"], raison: "« en revanche » met les deux durées en regard" },
];

/* =============================================================================
   4. LA COMPARAISON  (2de_rl_comparaison)
   ---------------------------------------------------------------------------
   Le programme la nomme parmi les quatre relations fondamentales. On demande
   l'outil qui produit l'effet voulu : égalité, supériorité, infériorité,
   ressemblance, proportion.
   ========================================================================== */

const COMPARAISONS: readonly Outil[] = [
  { phrase: "Il travaille … son frère : ni plus, ni moins.", vise: "l'ÉGALITÉ", bonne: "autant que", faux: ["plus que", "moins que", "au lieu de"], raison: "« autant que » pose l'égalité de quantité" },
  { phrase: "Ce texte est … long que le précédent.", vise: "la SUPÉRIORITÉ", bonne: "plus", faux: ["moins", "aussi", "autant"], raison: "« plus… que » marque la supériorité" },
  { phrase: "La seconde version est … claire que la première.", vise: "l'INFÉRIORITÉ", bonne: "moins", faux: ["plus", "aussi", "autant"], raison: "« moins… que » marque l'infériorité" },
  { phrase: "Il écrit … parle : par phrases courtes.", vise: "la RESSEMBLANCE", bonne: "comme il", faux: ["plus qu'il ne", "moins qu'il ne", "au lieu qu'il"], raison: "« comme » pose la ressemblance de manière" },
  { phrase: "… il avance, le paysage change.", vise: "la PROPORTION", bonne: "À mesure qu'", faux: ["Autant qu'", "Plus qu'", "Bien qu'"], raison: "« à mesure que » lie deux évolutions parallèles" },
  { phrase: "Ce sujet est … difficile que l'autre : les deux se valent.", vise: "l'ÉGALITÉ", bonne: "aussi", faux: ["plus", "moins", "autant"], raison: "« aussi… que » pose l'égalité de degré" },
  { phrase: "Elle lit … que son voisin, et deux fois plus vite.", vise: "la SUPÉRIORITÉ", bonne: "davantage", faux: ["moins", "autant", "aussi peu"], raison: "« davantage que » marque la supériorité de quantité" },
  { phrase: "… on relit, … on trouve de fautes.", vise: "la PROPORTION", bonne: "Plus… moins", faux: ["Autant… autant", "Aussi… aussi", "Bien… bien"], raison: "« plus… moins » lie deux variations inverses" },
  { phrase: "Le second acte est … enlevé que le premier.", vise: "l'INFÉRIORITÉ", bonne: "moins", faux: ["plus", "aussi", "autant"], raison: "« moins… que » marque l'infériorité" },
  { phrase: "Il a répondu … l'aurait fait son professeur.", vise: "la RESSEMBLANCE", bonne: "ainsi que", faux: ["plus que ne", "moins que ne", "au lieu que"], raison: "« ainsi que » pose la ressemblance de manière" },
  { phrase: "Ce recueil compte … de poèmes que l'autre.", vise: "l'ÉGALITÉ", bonne: "autant", faux: ["plus", "moins", "davantage"], raison: "« autant de… que » pose l'égalité de nombre" },
  { phrase: "… la nuit tombe, … les bruits s'éteignent.", vise: "la PROPORTION", bonne: "Au fur et à mesure que… plus", faux: ["Bien que… plus", "Parce que… plus", "Afin que… plus"], raison: "la locution lie deux évolutions parallèles" },
  { phrase: "Son style est … dépouillé que celui de son maitre.", vise: "la SUPÉRIORITÉ", bonne: "plus", faux: ["moins", "aussi", "autant"], raison: "« plus… que » marque la supériorité de degré" },
  { phrase: "La scène se joue … dans un rêve.", vise: "la RESSEMBLANCE", bonne: "comme", faux: ["plus que", "moins que", "au lieu de"], raison: "« comme » rapproche deux réalités" },
  { phrase: "Il y a … de candidats cette année que l'an dernier.", vise: "l'INFÉRIORITÉ", bonne: "moins", faux: ["plus", "autant", "davantage"], raison: "« moins de… que » marque l'infériorité de nombre" },
  { phrase: "Ce passage est … émouvant que le précédent : ils se valent.", vise: "l'ÉGALITÉ", bonne: "aussi", faux: ["plus", "moins", "davantage"], raison: "« aussi… que » pose l'égalité de degré" },
];

/* =============================================================================
   5. COMMUTER AVEC UN GROUPE NOMINAL  (2de_rl_commuter_gn)
   ---------------------------------------------------------------------------
   ⭐ L'exercice nommé au IV : « commutation avec des structures sémantiquement
   équivalentes (par exemple des groupes nominaux) ». C'est aussi le geste
   central de la contraction de texte : dire la même chose en moins de mots.
   ⚠️ Les distracteurs sont des groupes nominaux corrects, mais qui changent la
   relation — un but devient une cause, une condition devient un moment.
   ========================================================================== */

const COMMUTATIONS_GN: readonly Commutation[] = [
  { phrase: "Dès que le jour se lève, ils partent.", subordonnee: "dès que le jour se lève", bonne: "dès le lever du jour", faux: ["à cause du lever du jour", "en vue du lever du jour", "malgré le lever du jour"], raison: "la subordonnée dit le moment : le groupe doit dire le moment" },
  { phrase: "Parce que la houle était forte, le bateau est resté à quai.", subordonnee: "parce que la houle était forte", bonne: "à cause de la houle", faux: ["en vue de la houle", "malgré la houle", "dès la houle"], raison: "la subordonnée dit la cause : « à cause de » la conserve" },
  { phrase: "Pour que les travaux avancent, la rue a été fermée.", subordonnee: "pour que les travaux avancent", bonne: "en vue de l'avancement des travaux", faux: ["à cause de l'avancement des travaux", "malgré l'avancement des travaux", "dès l'avancement des travaux"], raison: "la subordonnée dit le but : « en vue de » le conserve" },
  { phrase: "Bien qu'il ait plu, la fête a eu lieu.", subordonnee: "bien qu'il ait plu", bonne: "malgré la pluie", faux: ["à cause de la pluie", "en vue de la pluie", "dès la pluie"], raison: "la subordonnée concède : « malgré » conserve la concession" },
  { phrase: "Si le vent tombe, nous sortirons.", subordonnee: "si le vent tombe", bonne: "en cas de baisse du vent", faux: ["à cause de la baisse du vent", "malgré la baisse du vent", "dès la baisse du vent"], raison: "la subordonnée pose une condition : « en cas de » la conserve" },
  { phrase: "Après que la cloche eut sonné, la salle s'est vidée.", subordonnee: "après que la cloche eut sonné", bonne: "après la sonnerie", faux: ["à cause de la sonnerie", "en vue de la sonnerie", "malgré la sonnerie"], raison: "la subordonnée situe dans le temps" },
  { phrase: "Puisque le dossier est complet, l'inscription est validée.", subordonnee: "puisque le dossier est complet", bonne: "en raison de la complétude du dossier", faux: ["en vue de la complétude du dossier", "malgré la complétude du dossier", "dès la complétude du dossier"], raison: "la subordonnée dit la cause" },
  { phrase: "Afin que chacun comprenne, la consigne a été répétée.", subordonnee: "afin que chacun comprenne", bonne: "pour la compréhension de tous", faux: ["à cause de la compréhension de tous", "malgré la compréhension de tous", "dès la compréhension de tous"], raison: "la subordonnée dit le but" },
  { phrase: "Quoique le texte soit court, il est difficile.", subordonnee: "quoique le texte soit court", bonne: "malgré sa brièveté", faux: ["à cause de sa brièveté", "en vue de sa brièveté", "dès sa brièveté"], raison: "la subordonnée concède" },
  { phrase: "Dès que les résultats seront publiés, nous vous préviendrons.", subordonnee: "dès que les résultats seront publiés", bonne: "dès la publication des résultats", faux: ["à cause de la publication des résultats", "en vue de la publication des résultats", "malgré la publication des résultats"], raison: "la subordonnée situe dans le temps" },
  { phrase: "Comme la salle était pleine, certains sont restés debout.", subordonnee: "comme la salle était pleine", bonne: "en raison de l'affluence", faux: ["en vue de l'affluence", "malgré l'affluence", "dès l'affluence"], raison: "la subordonnée dit la cause" },
  { phrase: "Si vous vous inscrivez avant lundi, la place est gardée.", subordonnee: "si vous vous inscrivez avant lundi", bonne: "en cas d'inscription avant lundi", faux: ["à cause d'une inscription avant lundi", "malgré une inscription avant lundi", "dès une inscription avant lundi"], raison: "la subordonnée pose une condition" },
  { phrase: "Pour que la salle soit rénovée, les cours ont été déplacés.", subordonnee: "pour que la salle soit rénovée", bonne: "en vue de la rénovation de la salle", faux: ["à cause de la rénovation de la salle", "malgré la rénovation de la salle", "dès la rénovation de la salle"], raison: "la subordonnée dit le but" },
  { phrase: "Bien que la route soit longue, ils sont partis à pied.", subordonnee: "bien que la route soit longue", bonne: "malgré la longueur de la route", faux: ["à cause de la longueur de la route", "en vue de la longueur de la route", "dès la longueur de la route"], raison: "la subordonnée concède" },
  { phrase: "Avant que la nuit tombe, il faut rentrer.", subordonnee: "avant que la nuit tombe", bonne: "avant la tombée de la nuit", faux: ["à cause de la tombée de la nuit", "en vue de la tombée de la nuit", "malgré la tombée de la nuit"], raison: "la subordonnée situe dans le temps" },
  { phrase: "Parce que le professeur était absent, la séance a été reportée.", subordonnee: "parce que le professeur était absent", bonne: "en raison de l'absence du professeur", faux: ["en vue de l'absence du professeur", "malgré l'absence du professeur", "dès l'absence du professeur"], raison: "la subordonnée dit la cause" },
];

/* =============================================================================
   6. ENCHAINER DEUX PARAGRAPHES  (2de_rl_connecteur_paragraphe)
   ---------------------------------------------------------------------------
   « Organiser le développement logique d'un propos » : le connecteur ne relie
   plus deux propositions mais deux idées. C'est ce qui fait tenir un devoir.
   ========================================================================== */

const CONNECTEURS: readonly string[] = [
  "En effet", "De plus", "En revanche", "Ainsi", "Or", "Toutefois",
];

const ENCHAINEMENTS: readonly Enchainement[] = [
  { avant: "Le roman donne à voir toute une société.", apres: "… il ouvre la maison, l'atelier, la rue, et jusqu'aux pensées les plus intimes.", bonne: "En effet", faux: ["En revanche", "Or", "Toutefois"], raison: "le second paragraphe démontre le premier : il l'explique" },
  { avant: "Le roman donne à voir toute une société.", apres: "… il permet d'entrer dans une conscience, ce qu'aucun autre genre ne fait aussi bien.", bonne: "De plus", faux: ["En revanche", "Or", "Toutefois"], raison: "le second ajoute un argument de même sens" },
  { avant: "Le roman peut tout montrer d'une société.", apres: "… le théâtre, lui, ne dispose que d'une scène et de quelques heures.", bonne: "En revanche", faux: ["En effet", "De plus", "Ainsi"], raison: "le second oppose un cas contraire" },
  { avant: "Chaque procédé du texte concourt au même effet.", apres: "… le lecteur se trouve enfermé, comme le personnage, dans une pièce sans issue.", bonne: "Ainsi", faux: ["En revanche", "Or", "Toutefois"], raison: "le second tire la conclusion de ce qui précède" },
  { avant: "On dit souvent que la poésie fuit le réel.", apres: "… les poèmes du Moyen Âge parlent de guerre, de faim et de procès.", bonne: "Or", faux: ["En effet", "De plus", "Ainsi"], raison: "« or » introduit le fait qui va renverser l'idée reçue" },
  { avant: "Cette lecture éclaire tout le passage.", apres: "… elle laisse de côté la question du narrateur, qu'il faudra bien poser.", bonne: "Toutefois", faux: ["En effet", "De plus", "Ainsi"], raison: "le second nuance ce que le premier affirmait" },
  { avant: "La presse du XIXe siècle a changé la lecture.", apres: "… le journal quotidien a mis le récit à la portée de tous les budgets.", bonne: "En effet", faux: ["En revanche", "Or", "Toutefois"], raison: "le second explique le premier" },
  { avant: "Le personnage échappe à son auteur.", apres: "… il échappe aussi au lecteur, qui croit le connaitre.", bonne: "De plus", faux: ["En revanche", "Or", "Toutefois"], raison: "le second ajoute un argument de même sens" },
  { avant: "Le théâtre classique enferme l'action en un jour.", apres: "… le roman peut couvrir plusieurs générations.", bonne: "En revanche", faux: ["En effet", "De plus", "Ainsi"], raison: "le second oppose un cas contraire" },
  { avant: "Tous les indices du texte pointent vers le même sens.", apres: "… l'interprétation ne fait plus de doute.", bonne: "Ainsi", faux: ["En revanche", "Or", "Toutefois"], raison: "le second conclut" },
  { avant: "On présente souvent l'essai comme un genre récent.", apres: "… Montaigne écrivait déjà les siens au XVIe siècle.", bonne: "Or", faux: ["En effet", "De plus", "Ainsi"], raison: "« or » apporte le fait qui contredit l'idée reçue" },
  { avant: "Cette mise en scène rend la pièce très claire.", apres: "… elle efface l'ambigüité du dénouement, qui faisait tout le prix du texte.", bonne: "Toutefois", faux: ["En effet", "De plus", "Ainsi"], raison: "le second nuance l'éloge du premier" },
  { avant: "La contraction de texte oblige à comprendre avant d'écrire.", apres: "… on ne peut résumer une phrase dont on n'a pas saisi la fonction.", bonne: "En effet", faux: ["En revanche", "Or", "Toutefois"], raison: "le second explique le premier" },
  { avant: "L'argumentation directe expose la thèse sans détour.", apres: "… l'apologue la fait deviner par une histoire.", bonne: "En revanche", faux: ["En effet", "De plus", "Ainsi"], raison: "le second oppose l'autre voie" },
  { avant: "Le poème joue de tous les sons de la langue.", apres: "… il joue aussi de sa disposition sur la page.", bonne: "De plus", faux: ["En revanche", "Or", "Toutefois"], raison: "le second ajoute un argument de même sens" },
  { avant: "Chaque détail du portrait annonce la chute du personnage.", apres: "… sa fin était écrite dès la première page.", bonne: "Ainsi", faux: ["En revanche", "Or", "Toutefois"], raison: "le second conclut de ce qui précède" },
];

/* =============================================================================
   7. REPRENDRE SANS RÉPÉTER NI EMBROUILLER  (2de_rl_reprises)
   ---------------------------------------------------------------------------
   « Les outils de cohésion textuelle : repérage de ces outils dans un texte,
   commutation avec des expressions synonymes » (IV). Une reprise mal choisie
   fait perdre le fil : le lecteur ne sait plus de qui l'on parle.
   ========================================================================== */

const REPRISES: readonly Reprise[] = [
  { phrase: "Paul a rencontré Marc hier. … lui a parlé de son projet.", bonne: "Le premier", faux: ["Il", "Celui-ci", "Ce dernier"], raison: "« il », « celui-ci » et « ce dernier » désigneraient Marc : seule une reprise par rang lève le doute" },
  { phrase: "Le roman et la nouvelle racontent tous deux. … est plus bref.", bonne: "Le second", faux: ["Il", "Celui-ci", "Ce genre"], raison: "il faut désigner la nouvelle sans ambigüité : la reprise par rang le fait" },
  { phrase: "Zola publie Germinal en 1885. … paraissait d'abord en feuilleton.", bonne: "Le roman", faux: ["Il", "Celui-ci", "Ce dernier"], raison: "un pronom renverrait à Zola ; la reprise nominale désigne l'œuvre" },
  { phrase: "L'auteur cite un décret et une lettre. … date de 1793.", bonne: "Le décret", faux: ["Il", "Celui-ci", "Ce dernier"], raison: "« celui-ci » et « ce dernier » désigneraient la lettre" },
  { phrase: "Le metteur en scène a rencontré l'auteur. … a défendu son texte.", bonne: "L'auteur", faux: ["Il", "Celui-ci", "Ce premier"], raison: "seule la reprise nominale dit sans ambigüité qui a parlé" },
  { phrase: "Deux témoins ont été entendus. … avait déjà déposé en janvier.", bonne: "Le premier", faux: ["Il", "Celui-ci", "Ce témoin"], raison: "la reprise par rang distingue les deux témoins" },
  { phrase: "La pièce commence par un monologue et se ferme sur un duo. … dure dix minutes.", bonne: "Le monologue", faux: ["Il", "Celui-ci", "Ce dernier"], raison: "« celui-ci » et « ce dernier » désigneraient le duo" },
  { phrase: "Le poète emprunte une forme fixe et la déforme. … devient méconnaissable.", bonne: "La forme fixe", faux: ["Elle", "Celle-ci", "Cette dernière"], raison: "la reprise nominale évite de renvoyer au poète" },
  { phrase: "L'article cite le maire et l'opposante. … conteste les chiffres.", bonne: "L'opposante", faux: ["Elle", "Celle-ci", "Cette dernière"], raison: "sans nom, on ne saurait pas qui conteste" },
  { phrase: "Le narrateur décrit la maison de son enfance. … a été vendue depuis.", bonne: "La maison", faux: ["Elle", "Celle-ci", "Cette dernière"], raison: "la reprise nominale évite de renvoyer à l'enfance" },
  { phrase: "Corneille et Racine écrivent tous deux des tragédies. … meurt en 1684.", bonne: "Le premier", faux: ["Il", "Celui-ci", "Ce dernier"], raison: "la reprise par rang désigne Corneille sans ambigüité" },
  { phrase: "Le texte oppose la ville et la campagne. … y est décrite comme un refuge.", bonne: "La campagne", faux: ["Elle", "Celle-ci", "Cette dernière"], raison: "il faut nommer laquelle des deux est le refuge" },
  { phrase: "Le journal a publié une enquête et un éditorial. … engage la rédaction.", bonne: "L'éditorial", faux: ["Il", "Celui-ci", "Ce dernier"], raison: "la reprise nominale évite l'hésitation entre les deux textes" },
  { phrase: "L'élève a rendu son devoir au professeur. … l'a corrigé le soir même.", bonne: "Le professeur", faux: ["Il", "Celui-ci", "Ce dernier"], raison: "un pronom pourrait renvoyer à l'élève" },
  { phrase: "Le recueil rassemble des sonnets et des odes. … obéissent à une forme fixe.", bonne: "Les sonnets", faux: ["Ils", "Ceux-ci", "Ces derniers"], raison: "« ceux-ci » et « ces derniers » désigneraient les odes" },
  { phrase: "La mise en scène éclaire le texte mais en efface une part. … reste malgré tout convaincante.", bonne: "La mise en scène", faux: ["Elle", "Celle-ci", "Cette dernière"], raison: "après deux propositions, la reprise nominale remet le sujet en place" },

  /* ⭐ DIX CAS OÙ LE PRONOM EST LA BONNE RÉPONSE — ajoutés le 14/08 après
     mesure. Sans eux, « Il », « Celui-ci » et « Ce dernier » étaient vus dans
     62 % des tirages sans être jamais corrects : l'élève apprenait « choisis
     toujours le nom », ce qui est FAUX. Quand un seul référent est possible, la
     reprise nominale alourdit, et le pronom est le bon choix. Deux cas rendent
     aussi « ce dernier » et « cette dernière » corrects, à leur place : quand
     ils désignent bien l'élément le plus proche. */
  { phrase: "Le poème s'ouvre sur une image marine. … revient trois fois dans le recueil.", bonne: "Elle", faux: ["Il", "Ils", "Ce dernier"], raison: "un seul référent possible : le pronom suffit, et le genre le désigne" },
  { phrase: "L'auteur retravaille son manuscrit pendant six ans. … finit par le brûler.", bonne: "Il", faux: ["Elle", "Celui-ci", "Ce dernier"], raison: "« celui-ci » désignerait le manuscrit, qui ne peut pas brûler le manuscrit" },
  { phrase: "Cette pièce n'a jamais été jouée du vivant de son auteur. … attendit deux siècles.", bonne: "Elle", faux: ["Il", "Celui-ci", "Ce dernier"], raison: "le genre féminin ne peut désigner que la pièce" },
  { phrase: "Les spectateurs ont applaudi longuement. … réclamaient un rappel.", bonne: "Ils", faux: ["Il", "Elles", "Ce dernier"], raison: "un seul référent au pluriel masculin" },
  { phrase: "Le décor représente une cour d'école. … occupe tout le plateau.", bonne: "Il", faux: ["Elle", "Ils", "Cette dernière"], raison: "seul le décor peut occuper le plateau, et il est masculin" },
  { phrase: "La contraction de texte demande de la rigueur. … se travaille toute l'année.", bonne: "Elle", faux: ["Il", "Ils", "Ce dernier"], raison: "un seul référent possible" },
  { phrase: "Les deux témoins ont fini par se contredire. … avaient pourtant juré de dire vrai.", bonne: "Ils", faux: ["Il", "Elles", "Ce dernier"], raison: "un seul référent, au pluriel masculin" },
  { phrase: "Ce recueil rassemble trente poèmes. … a été publié à compte d'auteur.", bonne: "Il", faux: ["Elle", "Ils", "Cette dernière"], raison: "le singulier masculin désigne le recueil, non les poèmes" },
  { phrase: "Le professeur a rendu son devoir à l'élève. … l'a relu aussitôt.", bonne: "Ce dernier", faux: ["Le premier", "Celui-là", "Elle"], raison: "« ce dernier » désigne l'élément le plus proche, c'est-à-dire l'élève" },
  { phrase: "Le sujet oppose une tragédie et une comédie. … se termine bien, par définition.", bonne: "Cette dernière", faux: ["Celle-là", "La première", "Il"], raison: "« cette dernière » désigne l'élément le plus proche, c'est-à-dire la comédie" },
];

export const relationsLogiquesSecondeBank: TutorBankItemV4[] = [
  {
    kind: "template",
    id: "2de_rl_cause_consequence_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "relations_logiques_2de",
    microId: "2de_rl_cause_consequence",
    difficulty: 2,
    theme: "neutral",
    hint: "Le rapport voulu est écrit en majuscules. Cherche l'outil qui l'exprime, pas celui qui sonne bien.",
    tags: ["seconde", "expression", "relations logiques", "template"],
    generate: () => {
      const c = randomChoice(CAUSE_CONSEQUENCE);
      return {
        text: `« ${c.phrase} »\n\nQuel outil exprime ${c.vise} ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La cause explique ce qui précède ; la conséquence énonce ce qui suit. Les mêmes deux faits peuvent être présentés dans les deux sens, et c'est l'outil qui décide : « la route était coupée, donc nous sommes rentrés » et « nous sommes rentrés, car la route était coupée » disent la même chose dans deux ordres différents.",
          "Repère les deux faits, puis demande-toi lequel des deux la phrase veut expliquer. L'outil se place devant l'explication ou devant le résultat, jamais au hasard.",
          `Ici, ${c.raison}.`,
          `L'outil attendu est « ${c.bonne} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_rl_but_condition_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "relations_logiques_2de",
    microId: "2de_rl_but_condition",
    difficulty: 3,
    theme: "neutral",
    hint: "Le but est une conséquence VOULUE ; la condition suspend le fait à autre chose.",
    tags: ["seconde", "expression", "relations logiques", "template"],
    generate: () => {
      const c = randomChoice(BUT_CONDITION);
      return {
        text: `« ${c.phrase} »\n\nQuel outil exprime ${c.vise} ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le but est une conséquence que l'on cherche : elle n'est pas encore réalisée, et c'est pourquoi elle appelle le subjonctif. La condition, elle, suspend un fait à un autre : tant que la condition n'est pas remplie, rien ne se produit.",
          "Demande-toi si le second fait est RECHERCHÉ — c'est un but — ou s'il est ATTENDU sous réserve — c'est une condition.",
          `Ici, ${c.raison}.`,
          `L'outil attendu est « ${c.bonne} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_rl_opposition_concession_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "relations_logiques_2de",
    microId: "2de_rl_opposition_concession",
    difficulty: 3,
    theme: "neutral",
    hint: "L'opposition met deux faits côte à côte. La concession admet un obstacle qui n'a pas empêché.",
    tags: ["seconde", "expression", "relations logiques", "template"],
    generate: () => {
      const c = randomChoice(OPPOSITION_CONCESSION);
      return {
        text: `« ${c.phrase} »\n\nQuel outil exprime ${c.vise} ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'opposition met deux faits face à face, sans que l'un empêche l'autre : « il travaille, tandis que son frère joue ». La concession fait autre chose : elle admet un obstacle qui aurait dû empêcher, et qui n'a pas empêché — « bien qu'il pleuve, nous sortirons ». C'est cette seconde figure que l'argumentation utilise pour désarmer l'adversaire.",
          "Demande-toi si le premier fait aurait dû empêcher le second. Si oui, c'est une concession. Sinon, c'est une simple opposition.",
          `Ici, ${c.raison}.`,
          `L'outil attendu est « ${c.bonne} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_rl_comparaison_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "relations_logiques_2de",
    microId: "2de_rl_comparaison",
    difficulty: 2,
    theme: "neutral",
    hint: "L'effet voulu est écrit en majuscules : égalité, supériorité, infériorité, ressemblance ou proportion.",
    tags: ["seconde", "expression", "comparaison", "template"],
    generate: () => {
      const c = randomChoice(COMPARAISONS);
      return {
        text: `« ${c.phrase} »\n\nQuel outil exprime ${c.vise} ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Comparer, c'est mesurer un écart : égalité, supériorité, infériorité, ressemblance, ou proportion entre deux variations. Chaque effet a ses outils, et les confondre change ce que la phrase affirme.",
          "Demande-toi d'abord ce que tu veux dire — plus, moins, autant, comme — puis choisis l'outil qui le dit exactement.",
          `Ici, ${c.raison}.`,
          `L'outil attendu est « ${c.bonne} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_rl_commuter_gn_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "relations_logiques_2de",
    microId: "2de_rl_commuter_gn",
    difficulty: 3,
    theme: "neutral",
    hint: "Les quatre groupes sont corrects. Un seul garde la relation que la subordonnée exprimait.",
    tags: ["seconde", "expression", "commutation", "template"],
    generate: () => {
      const c = randomChoice(COMMUTATIONS_GN);
      return {
        text: `« ${c.phrase} »\n\nRemplace « ${c.subordonnee} » par un groupe nominal de même sens. Lequel convient ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le programme demande de savoir commuter une subordonnée avec « des structures sémantiquement équivalentes, par exemple des groupes nominaux ». Le groupe est plus court, mais il doit garder la relation : une cause reste une cause, un but reste un but. C'est exactement ce que la contraction de texte réclamera.",
          "Repère d'abord la relation exprimée par la subordonnée — cause, but, condition, concession, temps — puis cherche la préposition qui porte la même relation.",
          `Ici, ${c.raison}.`,
          `Le groupe attendu est « ${c.bonne} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_rl_connecteur_paragraphe_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "relations_logiques_2de",
    microId: "2de_rl_connecteur_paragraphe",
    difficulty: 3,
    theme: "neutral",
    hint: "Demande-toi si le second paragraphe explique, ajoute, oppose, conclut ou renverse.",
    tags: ["seconde", "expression", "cohésion", "template"],
    generate: () => {
      const c = randomChoice(ENCHAINEMENTS);
      return {
        text: `Fin d'un paragraphe : « ${c.avant} »\nDébut du suivant : « ${c.apres} »\n\nQuel connecteur ouvre le second paragraphe ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, [...c.faux, ...CONNECTEURS]),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "« Organiser le développement logique d'un propos » est l'une des compétences que le programme vise. À l'échelle du devoir, le connecteur ne relie plus deux propositions mais deux idées : il annonce au lecteur ce que le paragraphe va faire — expliquer, ajouter, opposer, conclure, ou renverser une idée reçue.",
          "Lis le second paragraphe seul et demande-toi ce qu'il fait au premier. Le connecteur n'est que le nom de cette opération.",
          `Ici, ${c.raison}.`,
          `Le connecteur attendu est « ${c.bonne} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_rl_reprises_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "relations_logiques_2de",
    microId: "2de_rl_reprises",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les référents possibles. S'il n'y en a qu'un, le pronom suffit ; s'il y en a deux, il faut lever le doute.",
    tags: ["seconde", "expression", "cohésion", "template"],
    generate: () => {
      const c = randomChoice(REPRISES);
      return {
        text: `« ${c.phrase} »\n\nQuelle reprise convient ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Reprendre un mot sans le répéter est un outil de cohésion textuelle. « Celui-ci » et « ce dernier » désignent le plus proche, « celui-là » et « le premier » le plus éloigné, et le pronom personnel renvoie au référent évident. Quand un seul référent est possible, le pronom suffit et répéter le nom alourdit. Quand deux éléments viennent d'être nommés, le pronom seul laisse le lecteur en plan.",
          "Compte d'abord les référents possibles. S'il n'y en a qu'un, prends le pronom, en vérifiant genre et nombre. S'il y en a deux, vérifie ce que chaque reprise désignerait pour un lecteur qui ne connait pas la suite.",
          `Ici, ${c.raison}.`,
          `La reprise attendue est « ${c.bonne} ».`,
        ),
      };
    },
  },
];
