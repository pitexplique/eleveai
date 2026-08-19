// lib/tutor-v4/questionBank/5e/francais/ecriture-oral.bank.ts
//
// L'ÉCRITURE ET L'ORAL EN 5e — écrit le 13/08/2026. Dernière tranche du
// passage de la 5e au nouveau programme.
//
// ⚠️ BO n° 10 du 5 mars 2026, applicable en 5e À LA RENTRÉE 2026 seulement.
// ⛔ Ne pas étendre à la 4e (2027) ni à la 3e (2028).
//
// PÉRIMÈTRE — les attendus nommés que le coach n'avait pas :
//   ÉCRITURE — « Repérer l'idée principale d'un message écrit ou oral » ;
//   « Planifier son écrit en étant accompagné » ; « Écrire des textes narratifs
//   et descriptifs » ; « Écrire un texte à visée argumentative à partir de
//   consignes simples » ; « Utiliser le brouillon comme un écrit à
//   retravailler ».
//   ORAL — « Entrer dans un dialogue » ; « Intervenir dans un débat en
//   respectant les règles d'un échange argumentatif » ; « Comprendre les visées
//   d'une production orale spécifique » ; « Utiliser les ressources de la voix
//   et du corps ».
//
// ⚠️ CE QUE LE COACH NE PEUT PAS FAIRE, et qu'il ne prétend pas faire : écrire
// et parler sont des productions. Il n'entend pas l'élève et ne corrige pas son
// texte. Ce qui s'interroge ici est la MÉTHODE — ce qu'on fait avant d'écrire,
// ce qu'on regarde en se relisant, ce qui tient un débat. C'est le QCM de
// méthode du primaire, monté d'un cran.
//
// ⛔ RÈGLE DE CETTE BANQUE, apprise en 5e le 12/08 : quand les pièges sont
// tirés du même pool, chaque ligne doit avoir UN SEUL remède possible parmi
// les autres. Deux lignes de la lecture oralisée avaient chacune deux bonnes
// réponses, et aucun script ne l'a vu.
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

type Cas = { readonly gauche: string; readonly droite: string; readonly faux?: readonly string[] };

/* =============================================================================
   1. REPÉRER L'IDÉE PRINCIPALE
   ---------------------------------------------------------------------------
   ⚠️ Les trois pièges sont VRAIS du message, mais ce sont des DÉTAILS. C'est
   l'erreur réelle : on retient ce qui frappe, pas ce qui porte. Une fausse
   réponse inventée ne servirait à rien ici.
   ========================================================================== */

const IDEES: readonly Cas[] = [
  {
    gauche: "« La sortie au volcan est maintenue. Le car partira à 6 h 30 du parking, et non 7 h comme prévu. Prévoyez un coupe-vent : il fera 9 degrés là-haut. »",
    droite: "la sortie a lieu, mais le départ est avancé",
    faux: ["il fera neuf degrés là-haut, au sommet", "il faut prévoir un coupe-vent pour la sortie", "le départ du car se fera depuis le parking"],
  },
  {
    gauche: "« Le club de lecture cherche des volontaires. Deux heures par mois suffisent. Aucune expérience n'est demandée : on vous montrera tout. »",
    droite: "le club recrute, et n'importe qui peut s'y engager",
    faux: ["deux heures par mois suffisent pour participer", "on montrera tout à ceux qui viennent d'arriver", "il existe déjà un club de lecture qui fonctionne"],
  },
  {
    gauche: "« Les résultats seront affichés lundi. En attendant, inutile de nous écrire : nous ne pouvons rien communiquer avant cette date. »",
    droite: "il faut attendre lundi, et ne rien demander d'ici là",
    faux: ["les résultats existent déjà, mais restent secrets", "il sera possible de nous écrire après lundi", "l'affichage des résultats se fera un lundi"],
  },
  {
    gauche: "« Le gymnase reste fermé toute la semaine. Les cours de sport auront lieu dehors, sauf en cas de pluie, où ils seront annulés. »",
    droite: "le sport se fera dehors cette semaine, ou pas du tout",
    faux: ["le gymnase du collège reste fermé toute la semaine", "il pourrait bien pleuvoir au cours de la semaine", "des cours de sport sont prévus cette semaine"],
  },
  {
    gauche: "« Merci de rendre les manuels avant vendredi. Un manuel non rendu sera facturé. Ceux qui ont perdu le leur doivent le signaler dès maintenant. »",
    droite: "les manuels doivent revenir avant vendredi, ou être payés",
    faux: ["certains élèves ont perdu le manuel qui leur était prêté", "il faut signaler dès maintenant toute perte de manuel", "la date de vendredi concerne l'ensemble des élèves"],
  },
  {
    gauche: "« La cantine change de menu. Un plat sans viande sera proposé chaque jour. Les inscriptions se font toujours le lundi. »",
    droite: "il y aura désormais un plat sans viande tous les jours",
    faux: ["les inscriptions continuent de se faire le lundi", "la cantine modifie le menu qu'elle propose", "le changement de menu concerne toute la cantine"],
  },
  {
    gauche: "« Le professeur d'anglais est absent jeudi. Vous serez en étude. Le contrôle prévu est reporté à la semaine suivante. »",
    droite: "l'absence de jeudi décale le contrôle",
    faux: ["les élèves seront en étude ce jeudi-là", "un contrôle était prévu cette semaine", "le professeur d'anglais sera absent jeudi"],
  },
  {
    gauche: "« Le voyage coute 180 euros. Une aide peut couvrir la moitié pour les familles qui en font la demande avant le 15. »",
    droite: "une aide existe, mais il faut la demander avant le 15",
    faux: ["le voyage proposé coute cent-quatre-vingts euros", "l'aide peut couvrir la moitié de cette somme", "ce sont les familles qui font la demande d'aide"],
  },
  {
    gauche: "« Nous cherchons deux élèves pour représenter la classe au conseil. Il faut être disponible trois mercredis dans l'année. »",
    droite: "la classe doit désigner deux représentants disponibles",
    faux: ["il faut être disponible trois mercredis dans l'année", "le conseil se tient au cours de l'année scolaire", "la classe est concernée par cette recherche"],
  },
  {
    gauche: "« Le portail ouvre à 7 h 45. Les élèves arrivés avant attendent dehors. Aucun accès n'est possible plus tôt, même par temps de pluie. »",
    droite: "personne n'entre avant 7 h 45, quoi qu'il arrive",
    faux: ["le portail ouvre à sept heures quarante-cinq", "les élèves arrivés en avance attendent dehors", "il peut pleuvoir le matin devant le portail"],
  },
  {
    gauche: "« L'exposé se fait à deux. Chacun parle cinq minutes. La note tient compte de la répartition du travail autant que du contenu. »",
    droite: "le partage du travail compte autant que le contenu",
    faux: ["l'exposé se prépare et se présente à deux", "chacun des deux parle pendant cinq minutes", "une note sera donnée à la fin de l'exposé"],
  },
  {
    gauche: "« La bibliothèque déménage pendant les vacances. Vous pourrez continuer à emprunter, mais les retours se feront à l'accueil. »",
    droite: "le prêt continue, seuls les retours changent de lieu",
    faux: ["la bibliothèque déménage pendant les vacances", "les vacances scolaires commencent bientôt", "on peut encore emprunter des livres"],
  },
  {
    gauche: "« Trois places restent libres pour l'atelier théâtre. Elles seront attribuées aux premiers inscrits, sans autre critère. »",
    droite: "les trois dernières places iront aux premiers inscrits",
    faux: ["il reste trois places libres pour l'atelier", "il faut s'inscrire pour obtenir une place", "aucun autre critère ne sera pris en compte"],
  },
  {
    gauche: "« Le devoir peut être rendu sur papier ou par la messagerie. Dans les deux cas, votre nom doit apparaitre sur la première ligne. »",
    droite: "quel que soit le support, le nom doit figurer en tête",
    faux: ["le devoir peut être rendu sur une feuille de papier", "la messagerie permet aussi de rendre le devoir", "un devoir doit être rendu par chaque élève"],
  },
];

/* =============================================================================
   2. PLANIFIER SON ÉCRIT
   ========================================================================== */

const PLANIFIER: readonly Cas[] = [
  { gauche: "On te demande un récit, et tu ne sais pas par où commencer.", droite: "tu écris d'abord la fin que tu veux atteindre, puis le chemin pour y aller" },
  // ⚠️ Le remède ne doit PAS parler d'ordre : la ligne « trois paragraphes,
  // tu hésites sur l'ordre » en porte déjà un, et les deux devenaient justes.
  { gauche: "Tu as beaucoup d'idées et tu as peur d'en perdre en route.", droite: "tu les jettes toutes en vrac sur une feuille, sans en écarter aucune" },
  { gauche: "La consigne comporte trois demandes.", droite: "tu les souligne une par une : ce sont les trois choses à vérifier à la fin" },
  { gauche: "Tu veux décrire un lieu que le lecteur doit voir.", droite: "tu choisis un ordre de parcours — du plus loin au plus près, ou de haut en bas" },
  { gauche: "Ton texte doit faire une page, et tu as une seule idée.", droite: "tu cherches ce qui pourrait la contrarier : c'est ce qui fait avancer un texte" },
  { gauche: "Tu ne sais pas si tu dois raconter au présent ou au passé.", droite: "tu tranches avant de commencer, et tu t'y tiens jusqu'au bout" },
  { gauche: "Tu écris un dialogue entre deux personnages.", droite: "tu décides d'abord ce que chacun veut obtenir de l'autre" },
  { gauche: "On te demande un texte pour un lecteur précis.", droite: "tu notes en haut de ta feuille à qui tu écris : cela décide du ton" },
  { gauche: "Tu as trois paragraphes en tête et tu hésites sur l'ordre.", droite: "tu mets en dernier celui qui compte le plus : c'est celui qu'on retient" },
  { gauche: "Tu dois écrire la suite d'un texte.", droite: "tu relis le début pour relever les temps, les noms et ce qui est déjà promis" },
  { gauche: "Le sujet te semble immense.", droite: "tu le réduis à une scène, un lieu et un moment précis" },
  { gauche: "Tu veux être sûr de ne rien oublier en cours de rédaction.", droite: "tu écris ton plan en quatre mots dans la marge, et tu les barres au fur et à mesure" },
  { gauche: "Ton récit doit surprendre à la fin.", droite: "tu places tôt un détail qui ne s'expliquera qu'à la dernière ligne" },
  { gauche: "Tu ne trouves aucune idée en dix minutes.", droite: "tu écris n'importe quelle première phrase : l'idée vient en écrivant, rarement avant" },
];

/* =============================================================================
   3. ÉCRIRE UN TEXTE NARRATIF ET DESCRIPTIF
   ========================================================================== */

const NARRATIF: readonly Cas[] = [
  // ⚠️ Symptôme rendu spécifique : « dix lignes ennuyeuses » se réparait aussi
  // par « garder deux détails », remède d'une autre ligne.
  { gauche: "Ta description est là, mais aucun personnage ne la regarde.", droite: "tu fais voir le lieu par un personnage, avec ce qu'il y cherche" },
  { gauche: "Tu veux qu'on sente qu'un personnage a peur.", droite: "tu montres ce qu'il fait de ses mains, pas ce qu'il ressent" },
  { gauche: "Ton récit enchaine « et puis », « et puis », « et puis ».", droite: "tu remplaces par des liens qui disent le temps ou la cause" },
  { gauche: "Tu veux ralentir un moment important.", droite: "tu détailles ce que perçoit le personnage, seconde après seconde" },
  { gauche: "Tu veux faire passer trois années en une ligne.", droite: "tu l'écris en une phrase et tu passes à la suite : le récit a le droit d'accélérer" },
  { gauche: "Ta description est une liste d'adjectifs.", droite: "tu gardes les deux détails qui font voir, et tu jettes le reste" },
  { gauche: "Tu décris une pièce sans que le lecteur sache où il est.", droite: "tu suis un ordre : de la porte vers le fond, ou du sol vers le plafond" },
  { gauche: "Ton personnage est présenté par un portrait de dix lignes au début.", droite: "tu le fais découvrir peu à peu, par ce qu'il fait" },
  { gauche: "Tu veux montrer qu'il fait froid.", droite: "tu décris un geste que le froid impose, pas la température" },
  { gauche: "Deux scènes se suivent sans qu'on sache combien de temps a passé.", droite: "tu ajoutes une indication de temps au début de la seconde" },
  { gauche: "Ton récit est au passé et tu glisses parfois au présent.", droite: "tu reprends tout et tu unifies : un seul système de temps" },
  { gauche: "Tu veux que le lecteur entende le lieu, pas seulement qu'il le voie.", droite: "tu ajoutes un son et une odeur : la vue seule ne suffit jamais" },
  { gauche: "Ta scène d'action est confuse.", droite: "tu écris une action par phrase, dans l'ordre où elles arrivent" },
  { gauche: "Tu ne sais pas où arrêter ta description.", droite: "tu t'arrêtes dès que le lecteur en sait assez pour comprendre la suite" },
];

/* =============================================================================
   4. LE TEXTE À VISÉE ARGUMENTATIVE
   ---------------------------------------------------------------------------
   Quatre pièces, et l'élève doit les distinguer : ce qu'on soutient, ce qui le
   soutient, ce qui le rend concret, et ce qui relie le tout.
   ========================================================================== */

const PIECES: readonly string[] = [
  "la thèse : ce que le texte soutient",
  "un argument : une raison qui soutient la thèse",
  "un exemple : un cas précis qui rend l'argument concret",
  "un connecteur : le mot qui relie les étapes du raisonnement",
];

const ARGUMENTATIF: readonly Cas[] = [
  { gauche: "« Le collège devrait ouvrir sa bibliothèque le midi. »", droite: PIECES[0] },
  { gauche: "« Beaucoup d'élèves n'ont pas d'endroit calme chez eux pour travailler. »", droite: PIECES[1] },
  { gauche: "« L'an dernier, quatorze élèves de 5e faisaient leurs devoirs dans le couloir. »", droite: PIECES[2] },
  { gauche: "« De plus, … »", droite: PIECES[3] },
  { gauche: "« Il faut apprendre à nager à tous les enfants de l'île. »", droite: PIECES[0] },
  { gauche: "« La mer est partout autour de nous, et le risque est quotidien. »", droite: PIECES[1] },
  { gauche: "« En juillet dernier, deux accidents ont eu lieu sur la même plage. »", droite: PIECES[2] },
  { gauche: "« C'est pourquoi… »", droite: PIECES[3] },
  { gauche: "« Les écrans ne devraient pas entrer en salle de classe. »", droite: PIECES[0] },
  { gauche: "« L'attention se disperse dès qu'une notification arrive. »", droite: PIECES[1] },
  { gauche: "« Dans une classe voisine, les téléphones ont été rangés dans une boite, et le bruit a baissé. »", droite: PIECES[2] },
  { gauche: "« En revanche, … »", droite: PIECES[3] },
  { gauche: "« Chaque élève devrait présenter un livre à la classe une fois par an. »", droite: PIECES[0] },
  { gauche: "« On retient mieux ce qu'on a dû expliquer à quelqu'un d'autre. »", droite: PIECES[1] },
];

/* =============================================================================
   5. LE BROUILLON, ÉCRIT À RETRAVAILLER
   ---------------------------------------------------------------------------
   Le BO ne dit pas « faire un brouillon » mais « UTILISER le brouillon comme un
   écrit à retravailler ». Ce n'est pas une copie sale : c'est un état du texte
   sur lequel on agit.
   ========================================================================== */

const BROUILLON: readonly Cas[] = [
  { gauche: "Tu as fini ton brouillon et tu le recopies au propre sans rien changer.", droite: "tu n'as pas encore travaillé : recopier n'est pas réviser" },
  { gauche: "Une phrase te parait mauvaise mais tu ne sais pas quoi mettre.", droite: "tu la laisses et tu la soulignes : on y revient plus tard, pas maintenant" },
  { gauche: "Tu veux essayer une autre ouverture sans perdre la première.", droite: "tu écris la seconde en dessous, et tu choisiras après" },
  { gauche: "Ton brouillon est illisible, y compris pour toi.", droite: "tu laisses une ligne sur deux dès le départ, pour pouvoir corriger dedans" },
  { gauche: "Tu t'aperçois que le troisième paragraphe devrait être le premier.", droite: "tu les numérotes dans le nouvel ordre plutôt que de tout réécrire" },
  { gauche: "Tu as écrit trois fois le même mot dans le paragraphe.", droite: "tu l'entoures aux trois endroits : on ne voit les répétitions qu'en les marquant" },
  { gauche: "La consigne demandait un dialogue et tu n'en as pas mis.", droite: "tu reprends la consigne point par point avant toute correction de détail" },
  { gauche: "Tu corriges l'orthographe alors que le plan n'est pas arrêté.", droite: "tu t'occupes d'abord de ce qui est dit, l'orthographe vient en dernier" },
  { gauche: "Un camarade relit ton brouillon.", droite: "tu lui demandes ce qu'il n'a pas compris, pas s'il a aimé" },
  { gauche: "On te rend ton texte avec une nouvelle consigne : ajouter une description.", droite: "tu cherches l'endroit où elle manque vraiment, tu ne l'ajoutes pas au début par défaut" },
  { gauche: "Tu as une idée bien meilleure au milieu de la rédaction.", droite: "tu la notes dans la marge et tu finis ta phrase avant de tout changer" },
  { gauche: "Ton texte fait le double de la longueur demandée.", droite: "tu barres ce qui ne fait pas avancer, en commençant par les répétitions" },
  { gauche: "Tu n'oses pas raturer parce que c'est sale.", droite: "tu ratures : un brouillon sans rature est un brouillon qu'on n'a pas relu" },
  { gauche: "Tu relis ton texte juste après l'avoir écrit et tout te parait bien.", droite: "tu attends un peu, ou tu le lis à voix haute : l'oreille voit ce que l'œil saute" },
];

/* =============================================================================
   6. ENTRER DANS UN DIALOGUE
   ========================================================================== */

const DIALOGUE: readonly Cas[] = [
  { gauche: "Tu veux prendre la parole alors que quelqu'un parle encore.", droite: "tu attends la fin de sa phrase, puis tu reprends son dernier mot pour enchainer" },
  { gauche: "Tu n'as pas compris ce que ton interlocuteur vient de dire.", droite: "tu le lui redis avec tes mots et tu demandes si c'est bien cela" },
  { gauche: "La discussion s'éloigne du sujet.", droite: "tu rappelles la question de départ en une phrase" },
  { gauche: "Ton interlocuteur dit quelque chose de juste que tu n'avais pas vu.", droite: "tu le reconnais à voix haute : un dialogue peut faire changer d'avis" },
  { gauche: "Tu es d'accord sur le fond mais pas sur un point.", droite: "tu commences par ce sur quoi vous vous rejoignez, puis tu isoles le point de désaccord" },
  { gauche: "Deux personnes parlent en même temps que toi.", droite: "tu t'arrêtes et tu laisses finir : trois voix ne font pas trois idées" },
  { gauche: "Quelqu'un n'a pas parlé depuis le début.", droite: "tu lui poses une question directement" },
  { gauche: "On te pose une question et tu n'as pas de réponse.", droite: "tu le dis, et tu proposes de chercher" },
  { gauche: "Tu répètes ton idée pour la troisième fois.", droite: "tu essaies de la dire autrement : si elle ne passe pas, c'est la formulation" },
  { gauche: "La discussion devient tendue.", droite: "tu t'adresses à l'idée et non à la personne" },
  { gauche: "Tu veux vérifier que le groupe avance.", droite: "tu résumes où l'on en est avant de continuer" },
  { gauche: "Ton interlocuteur cherche ses mots.", droite: "tu le laisses finir sans terminer sa phrase à sa place" },
  // ⚠️ « tu t'arrêtes et tu rends la parole » recouvrait le remède de la ligne
  // « deux personnes parlent en même temps que toi ».
  { gauche: "Tu parles depuis deux minutes sans interruption.", droite: "tu poses une question au groupe pour lui rendre la main" },
  { gauche: "Le dialogue se termine sans conclusion.", droite: "tu dis ce sur quoi vous êtes tombés d'accord, et ce qui reste ouvert" },
];

/* =============================================================================
   7. LES RÈGLES DU DÉBAT ARGUMENTATIF
   ---------------------------------------------------------------------------
   « en respectant les RÈGLES d'un échange argumentatif » : ce sont elles qu'on
   interroge, et elles ne se confondent pas avec la politesse.
   ========================================================================== */

const DEBAT: readonly Cas[] = [
  { gauche: "Un participant dit : « Ton idée est nulle, comme toi. »", droite: "il attaque la personne au lieu de l'idée : c'est hors des règles du débat" },
  { gauche: "Quelqu'un affirme une chose sans donner de raison.", droite: "on lui demande sur quoi il s'appuie : une affirmation n'est pas un argument" },
  { gauche: "Un participant déforme l'idée de l'autre pour la démolir plus facilement.", droite: "on rétablit ce que l'autre a réellement dit avant de répondre" },
  { gauche: "Deux personnes répètent leurs positions sans jamais se répondre.", droite: "on demande à chacune de reprendre l'argument de l'autre avant d'ajouter le sien" },
  { gauche: "Quelqu'un dit : « Tout le monde le sait. »", droite: "le nombre de gens qui pensent une chose ne prouve pas qu'elle soit vraie" },
  { gauche: "Un participant apporte un exemple précis et vérifiable.", droite: "c'est recevable : l'exemple rend l'argument concret" },
  { gauche: "Le débat n'a pas de question claire au départ.", droite: "on formule la question en une phrase avant de commencer" },
  { gauche: "Quelqu'un parle beaucoup plus longtemps que les autres.", droite: "on répartit le temps : un débat n'est pas un exposé à plusieurs" },
  { gauche: "Un participant change d'avis en cours de débat.", droite: "c'est un résultat du débat, pas une faiblesse" },
  { gauche: "Quelqu'un s'appuie sur une expérience personnelle unique.", droite: "on l'entend, mais un cas seul ne suffit pas à conclure" },
  { gauche: "Un participant coupe la parole dès qu'il n'est pas d'accord.", droite: "on note son objection et on la garde pour son tour" },
  { gauche: "Le débat se termine sans que rien ne soit tranché.", droite: "on récapitule les points d'accord et ce qui reste en désaccord" },
  { gauche: "Quelqu'un répond à côté de la question posée.", droite: "on ramène à la question : c'est le rôle de celui qui anime" },
  { gauche: "Un participant cite un chiffre sans dire d'où il vient.", droite: "on demande la source : un chiffre sans origine ne prouve rien" },
];

/* =============================================================================
   8. LA VISÉE D'UNE PRODUCTION ORALE
   ========================================================================== */

const VISEES: readonly string[] = [
  "informer : faire savoir quelque chose",
  "convaincre : faire adopter un avis",
  "émouvoir : faire ressentir",
  "faire agir : obtenir un geste précis",
];

const PRODUCTIONS: readonly Cas[] = [
  { gauche: "Un exposé présente le cycle de l'eau, avec un schéma.", droite: VISEES[0] },
  { gauche: "Un candidat explique pourquoi il devrait être délégué.", droite: VISEES[1] },
  { gauche: "Un élève raconte le jour où il a quitté son île.", droite: VISEES[2] },
  { gauche: "Une annonce demande de rapporter les manuels avant vendredi.", droite: VISEES[3] },
  { gauche: "Un bulletin météo annonce les températures de la semaine.", droite: VISEES[0] },
  { gauche: "Une publicité explique pourquoi ce produit est meilleur que les autres.", droite: VISEES[1] },
  { gauche: "Un poème est dit à voix haute lors d'une cérémonie.", droite: VISEES[2] },
  { gauche: "Une consigne demande de se ranger deux par deux dans le couloir.", droite: VISEES[3] },
  { gauche: "Un guide décrit l'histoire du bâtiment devant lequel on se trouve.", droite: VISEES[0] },
  { gauche: "Un débatteur cherche à faire changer d'avis son adversaire.", droite: VISEES[1] },
  { gauche: "Un discours rend hommage à quelqu'un qui vient de partir.", droite: VISEES[2] },
  { gauche: "Un appel demande aux volontaires de s'inscrire avant midi.", droite: VISEES[3] },
  { gauche: "Un professeur explique le fonctionnement d'un moteur.", droite: VISEES[0] },
  { gauche: "Une association explique pourquoi il faut protéger le lagon.", droite: VISEES[1] },
];

/* =============================================================================
   9. LES RESSOURCES DE LA VOIX ET DU CORPS
   ---------------------------------------------------------------------------
   ⚠️ Une seule ressource par intention : le coach n'entend pas l'élève, il ne
   peut interroger que le CHOIX du moyen. Chaque ligne a donc un moyen unique
   parmi ceux de la table.
   ========================================================================== */

const CORPS: readonly Cas[] = [
  { gauche: "Tu veux que la salle sente qu'une chose importante arrive.", droite: "un silence, juste avant de la dire" },
  { gauche: "Tu veux qu'on retienne un mot précis de ta phrase.", droite: "appuyer ce mot plus fort que les autres" },
  { gauche: "Tu veux tenir l'attention d'un public dispersé.", droite: "regarder successivement plusieurs endroits de la salle" },
  { gauche: "Tu veux montrer que ton personnage se sent petit.", droite: "rentrer les épaules et baisser le regard" },
  { gauche: "Tu veux que la fin de ta phrase ne retombe pas.", droite: "garder la voix haute jusqu'au dernier mot" },
  { gauche: "Ton récit accélère vers son moment le plus tendu.", droite: "accélérer le débit à mesure qu'on approche" },
  { gauche: "Tu veux séparer deux idées sans le dire.", droite: "changer de place sur la scène entre les deux" },
  { gauche: "Tu veux qu'on comprenne que tu cites quelqu'un.", droite: "changer de hauteur de voix pendant la citation" },
  { gauche: "Tu veux que le public respire avec toi dans un passage lent.", droite: "ralentir et allonger les pauses entre les phrases" },
  { gauche: "Tu veux que ta question soit entendue comme une vraie question.", droite: "faire monter la voix au dernier mot, et attendre" },
  { gauche: "Tu veux occuper l'espace sans bouger tout le temps.", droite: "poser les deux pieds au sol et rester stable" },
  { gauche: "Tu veux montrer la colère d'un personnage sans crier.", droite: "durcir le débit, en détachant chaque syllabe" },
  // ⚠️ « marquer un changement de partie » se réglait aussi par « changer de
  // place », remède de la ligne « séparer deux idées sans le dire ».
  { gauche: "Tu veux qu'on saisisse la taille de ce dont tu parles.", droite: "un geste des mains qui en dessine la dimension" },
  { gauche: "Tu veux que le fond de la salle t'entende sans forcer.", droite: "articuler davantage plutôt que pousser la voix" },
];

function gabaritCas(
  id: string,
  microId: string,
  notionId: string,
  table: readonly Cas[],
  question: string,
  difficulty: 2 | 3,
  hint: string,
  definition: string,
  methode: string,
  tags: readonly string[],
  pool?: readonly string[],
): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "5e",
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
        choices: makeChoices(c.droite, c.faux ?? pool ?? table.map((x) => x.droite)),
        expected: [c.droite],
        comparator: "mcq_exact" as const,
        explanation: exp(definition, methode, `${c.gauche} → ${c.droite}.`, `${c.droite.charAt(0).toUpperCase()}${c.droite.slice(1)}.`),
      };
    },
  };
}

export const ecritureOral5eBank: TutorBankItemV4[] = [
  gabaritCas(
    "5e_ecrit_idee_principale_tpl_1",
    "5e_ecrit_idee_principale",
    "ecriture",
    IDEES,
    "Quelle est l'idée principale de ce message ?",
    3,
    "Les trois autres propositions sont vraies. Ce sont des détails.",
    "L'idée principale est ce sans quoi le message n'aurait pas été envoyé. Tout le reste — l'heure, le prix, la météo — la précise, mais ne la remplace pas.",
    "Demande-toi ce que celui qui écrit veut absolument que tu retiennes. Une proposition vraie n'est pas pour autant l'idée principale.",
    ["5e", "ecriture", "idee-principale", "template"],
  ),
  gabaritCas(
    "5e_ecrit_planifier_tpl_1",
    "5e_ecrit_planifier",
    "ecriture",
    PLANIFIER,
    "Que fais-tu avant de rédiger ?",
    2,
    "Planifier, ce n'est pas écrire moins : c'est décider avant, pour ne pas décider en écrivant.",
    "Planifier un écrit, c'est arrêter quelques choix avant la première phrase — la fin visée, l'ordre, le destinataire, le système de temps. Ce qui n'est pas décidé avant se décide au milieu, et le texte s'y casse.",
    "Avant d'écrire, réponds à trois questions : pour qui, dans quel ordre, et où cela finit.",
    ["5e", "ecriture", "planifier", "template"],
  ),
  gabaritCas(
    "5e_ecrit_narratif_descriptif_tpl_1",
    "5e_ecrit_narratif_descriptif",
    "ecriture",
    NARRATIF,
    "Que fais-tu ?",
    3,
    "Montrer plutôt que dire : c'est la règle qui règle presque tout.",
    "Un texte narratif fait avancer, un texte descriptif fait voir. Les deux se tiennent : une description qui n'est vue par personne s'arrête, et un récit sans lieu flotte.",
    "Chaque fois que tu veux annoncer un sentiment ou une qualité, cherche à la place un geste, un objet ou une sensation qui la donne à voir.",
    ["5e", "ecriture", "narratif", "descriptif", "template"],
  ),
  gabaritCas(
    "5e_ecrit_argumentatif_tpl_1",
    "5e_ecrit_argumentatif",
    "ecriture",
    ARGUMENTATIF,
    "Quelle pièce du raisonnement est-ce ?",
    3,
    "Ce qu'on soutient, ce qui le soutient, ce qui le rend concret, ce qui relie.",
    "Un texte à visée argumentative se monte avec quatre pièces : une thèse — ce qu'on soutient —, des arguments qui la soutiennent, des exemples qui rendent les arguments concrets, et des connecteurs qui montrent l'ordre du raisonnement.",
    "Demande-toi ce que la phrase fait : elle affirme ce qu'on veut obtenir, elle donne une raison, elle cite un cas, ou elle articule.",
    ["5e", "ecriture", "argumentation", "template"],
    PIECES,
  ),
  gabaritCas(
    "5e_ecrit_brouillon_tpl_1",
    "5e_ecrit_brouillon",
    "ecriture",
    BROUILLON,
    "Que fais-tu ?",
    3,
    "Un brouillon n'est pas une copie sale : c'est un état du texte sur lequel on agit.",
    "Le BO ne demande pas de faire un brouillon, mais de l'UTILISER comme un écrit à retravailler. On y coupe, on y déplace, on y essaie une autre version — et l'on corrige l'orthographe en dernier, quand le texte ne bouge plus.",
    "Révise dans cet ordre : ce qui est dit, puis l'ordre, puis les phrases, puis l'orthographe. Commencer par la fin de cette liste fait perdre le travail à chaque coupe.",
    ["5e", "ecriture", "brouillon", "reviser", "template"],
  ),
  gabaritCas(
    "5e_oral_dialogue_tpl_1",
    "5e_oral_dialogue",
    "oral",
    DIALOGUE,
    "Que fais-tu ?",
    2,
    "Entrer dans un dialogue, c'est parler AVEC, pas parler À TOUR DE RÔLE.",
    "Un dialogue n'est pas une suite de prises de parole : c'est un échange où chacun tient compte de ce que l'autre vient de dire. Reprendre, reformuler, reconnaitre — ce sont les gestes qui font qu'on avance à deux.",
    "Avant de dire ton idée, redis en trois mots celle de l'autre. Si tu n'y arrives pas, c'est que tu ne l'as pas écoutée.",
    ["5e", "oral", "dialogue", "template"],
  ),
  gabaritCas(
    "5e_oral_debat_tpl_1",
    "5e_oral_debat",
    "oral",
    DEBAT,
    "Que dit la règle de l'échange argumentatif ?",
    3,
    "Les règles du débat ne se confondent pas avec la politesse : elles portent sur les idées.",
    "Un débat argumentatif a ses règles : on discute des idées et non des personnes, une affirmation doit être appuyée, on répond à ce que l'autre a réellement dit, et un chiffre appelle sa source. Changer d'avis y est un résultat, pas une défaite.",
    "Devant une intervention, demande-toi : est-ce que cela fait avancer la question, ou est-ce que cela vise quelqu'un ?",
    ["5e", "oral", "debat", "template"],
  ),
  gabaritCas(
    "5e_oral_visees_tpl_1",
    "5e_oral_visees",
    "oral",
    PRODUCTIONS,
    "Quelle est la visée de cette production orale ?",
    2,
    "Demande-toi ce que celui qui parle attend de toi en retour.",
    "Toute prise de parole vise quelque chose : faire savoir, faire adopter un avis, faire ressentir, ou obtenir un geste. Reconnaitre la visée, c'est savoir comment écouter — et se garder d'être conduit sans s'en apercevoir.",
    "Demande-toi ce que tu devrais faire ou penser en sortant. C'est la visée.",
    ["5e", "oral", "visees", "template"],
    VISEES,
  ),
  gabaritCas(
    "5e_oral_corps_tpl_1",
    "5e_oral_corps",
    "oral",
    CORPS,
    "Quelle ressource de la voix ou du corps emploies-tu ?",
    3,
    "La voix et le corps ne décorent pas la parole : ils en font partie.",
    "Dire un texte, ce n'est pas seulement le prononcer. Le silence, le débit, la hauteur, le regard, la place et le geste portent une part du sens — souvent celle que les mots ne disent pas.",
    "Pars de l'effet que tu veux produire, puis choisis le moyen le plus direct pour l'obtenir. Un seul suffit : tout employer à la fois ne produit rien.",
    ["5e", "oral", "voix", "corps", "template"],
  ),
];
