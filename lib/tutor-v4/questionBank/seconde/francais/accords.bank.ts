// lib/tutor-v4/questionBank/seconde/francais/accords.bank.ts
//
// LES ACCORDS EN SECONDE — écrit le 14/08/2026.
//
// RÉFÉRENCE : programme de français de seconde générale et technologique,
// arrêté du 17 janvier 2019 (BOEN spécial n° 1 du 22 janvier 2019), modifié
// par le JORF du 8 octobre 2020. Partie « L'étude de la langue au lycée »,
// premier point travaillé DÈS LA CLASSE DE SECONDE :
//   « Les accords dans le groupe nominal et entre le sujet et le verbe. Cette
//   question d'orthographe grammaticale reprend de manière synthétique les
//   règles d'accord abordées depuis le cycle 2, notamment celles entre le
//   sujet et le verbe. Elle offre en outre l'occasion de consolider la
//   connaissance des classes lexicales et des fonctions syntaxiques dans la
//   phrase simple. »
//
// ⛔⛔ CE FICHIER NE RECOPIE PAS LA 3e, ET C'EST LE PIÈGE N° 1 DE LA CLASSE.
// Le programme écrit : « plutôt que d'introduire des notions nouvelles, il
// s'agit au lycée d'enrichir les connaissances linguistiques ». Les règles sont
// donc les mêmes qu'au collège — ce qui change, c'est ce qu'on en demande.
// Au collège on applique la règle ; ici on demande CE QUE L'ACCORD PRODUIT :
// « une boite de chocolats fabriqués » ne dit pas la même chose que « une boite
// de chocolats fabriquée », et c'est la marque du pluriel qui tranche.
//
// ⭐ LES LIGNES VONT PAR PAIRES. Même groupe nominal, accord sur le noyau puis
// sur le complément ; même verbe, complément avant puis après. Une table où le
// COD serait toujours antéposé apprendrait « avec avoir, on accorde », le
// contraire de la règle.
//
// ⛔ QCM uniquement, QUATRE propositions : 25 % au hasard contre 33 %.
// ⛔ Aucun cas où l'usage hésite. « Un grand nombre de spectateurs applaudit /
// applaudissent », « la moitié des élèves », « ni l'un ni l'autre » admettent
// les deux accords : ils sont ÉCARTÉS. On n'enseigne pas une règle sur un
// terrain où les grammairiens ne s'accordent pas eux-mêmes.
// ⚠️ La position de la bonne réponse ne se gère PAS ici : `shuffleChoices` du
// pipeline mélange. Écrire [bonne, piège, piège, piège] est correct.
// ⚠️ Tables typées à la main, jamais en `as const`.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

/* Fisher-Yates honnête. `sort(() => Math.random() - 0.5)` ne mélange pas
   uniformément : il sur-représente certains distracteurs au tirage. */
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

type Lecture = {
  readonly gn: string;
  readonly mot: string;
  readonly vraie: string;
  readonly autre: string;
  readonly deux: string;
  readonly aucune: string;
};
type FormeVerbe = { readonly phrase: string; readonly bonne: string; readonly faux: readonly string[]; readonly sujet: string };
type Participe = { readonly phrase: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };
type Homophone = { readonly phrase: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };
type Pronominalisation = { readonly phrase: string; readonly groupe: string; readonly pronom: string; readonly fonction: string };

/* =============================================================================
   1. CE QUE L'ACCORD FAIT COMPRENDRE  (2de_acc_commande_gn)
   ---------------------------------------------------------------------------
   ⭐ La micro la plus « lycée » du fichier. Le groupe nominal étendu porte deux
   noms ; l'adjectif ou le participe ne peut s'accorder qu'avec l'un des deux,
   et ce choix DÉCIDE DU SENS. L'élève ne récite pas une règle : il lit une
   marque et en tire une information.
   ⭐ Les cas vont par paires — même groupe, accord sur le noyau puis sur le
   complément. Sans les paires, l'élève apprendrait « on accorde toujours avec
   le mot le plus proche », ce qui est faux une fois sur deux.
   ========================================================================== */

const LECTURES: readonly Lecture[] = [
  {
    gn: "une boite de chocolats fabriqués en Suisse",
    mot: "fabriqués",
    vraie: "ce sont les chocolats qui viennent de Suisse",
    autre: "c'est la boite qui vient de Suisse",
    deux: "la boite et les chocolats viennent tous deux de Suisse",
    aucune: "la marque ne renseigne pas : les deux lectures restent possibles",
  },
  {
    gn: "une boite de chocolats fabriquée en Suisse",
    mot: "fabriquée",
    vraie: "c'est la boite qui vient de Suisse",
    autre: "ce sont les chocolats qui viennent de Suisse",
    deux: "la boite et les chocolats viennent tous deux de Suisse",
    aucune: "la marque ne renseigne pas : les deux lectures restent possibles",
  },
  {
    gn: "un panier de fruits mûrs",
    mot: "mûrs",
    vraie: "ce sont les fruits qui sont mûrs",
    autre: "c'est le panier qui est mûr",
    deux: "le panier et les fruits sont mûrs ensemble",
    aucune: "la marque ne renseigne pas : les deux lectures restent possibles",
  },
  {
    gn: "un panier de fruits tressé à la main",
    mot: "tressé",
    vraie: "c'est le panier qui est tressé à la main",
    autre: "ce sont les fruits qui sont tressés à la main",
    deux: "le panier et les fruits sont tressés ensemble",
    aucune: "la marque ne renseigne pas : les deux lectures restent possibles",
  },
  {
    gn: "une pile de livres poussiéreux",
    mot: "poussiéreux",
    vraie: "ce sont les livres qui sont couverts de poussière",
    autre: "c'est la pile qui est couverte de poussière",
    deux: "la pile et les livres le sont l'une comme les autres",
    aucune: "la marque ne renseigne pas : les deux lectures restent possibles",
  },
  {
    gn: "une pile de livres bancale",
    mot: "bancale",
    vraie: "c'est la pile qui tient mal debout",
    autre: "ce sont les livres qui tiennent mal debout",
    deux: "la pile et les livres tiennent mal debout l'une comme les autres",
    aucune: "la marque ne renseigne pas : les deux lectures restent possibles",
  },
  {
    gn: "un troupeau de vaches laitières",
    mot: "laitières",
    vraie: "ce sont les vaches qui donnent du lait",
    autre: "c'est le troupeau qui donne du lait",
    deux: "le troupeau et les vaches en donnent l'un comme les autres",
    aucune: "la marque ne renseigne pas : les deux lectures restent possibles",
  },
  {
    gn: "un troupeau de vaches immense",
    mot: "immense",
    vraie: "c'est le troupeau qui est de grande taille",
    autre: "ce sont les vaches qui sont de grande taille",
    deux: "le troupeau et les vaches sont grands l'un comme les autres",
    aucune: "la marque ne renseigne pas : les deux lectures restent possibles",
  },
  {
    gn: "une série de romans policiers",
    mot: "policiers",
    vraie: "ce sont les romans qui relèvent du genre policier",
    autre: "c'est la série qui relève du genre policier",
    deux: "la série et les romans en relèvent l'une comme les autres",
    aucune: "la marque ne renseigne pas : les deux lectures restent possibles",
  },
  {
    gn: "une série de romans interrompue",
    mot: "interrompue",
    vraie: "c'est la série qui s'est arrêtée en chemin",
    autre: "ce sont les romans qui se sont arrêtés en chemin",
    deux: "la série et les romans se sont arrêtés l'une comme les autres",
    aucune: "la marque ne renseigne pas : les deux lectures restent possibles",
  },
  {
    gn: "un groupe d'élèves motivés",
    mot: "motivés",
    vraie: "ce sont les élèves qui ont envie de travailler",
    autre: "c'est le groupe qui a envie de travailler",
    deux: "le groupe et les élèves en ont envie l'un comme les autres",
    aucune: "la marque ne renseigne pas : les deux lectures restent possibles",
  },
  {
    gn: "un groupe d'élèves restreint",
    mot: "restreint",
    vraie: "c'est le groupe qui compte peu de monde",
    autre: "ce sont les élèves qui comptent peu de monde",
    deux: "le groupe et les élèves comptent peu de monde l'un comme les autres",
    aucune: "la marque ne renseigne pas : les deux lectures restent possibles",
  },
  {
    gn: "une collection de timbres rares",
    mot: "rares",
    vraie: "ce sont les timbres qu'on trouve difficilement",
    autre: "c'est la collection qu'on trouve difficilement",
    deux: "la collection et les timbres se trouvent difficilement l'une comme les autres",
    aucune: "la marque ne renseigne pas : les deux lectures restent possibles",
  },
  {
    gn: "une collection de timbres vendue aux enchères",
    mot: "vendue",
    vraie: "c'est la collection entière qui est passée aux enchères",
    autre: "ce sont les timbres qui sont passés un à un aux enchères",
    deux: "la collection et les timbres y sont passés l'une comme les autres",
    aucune: "la marque ne renseigne pas : les deux lectures restent possibles",
  },
  {
    gn: "un bouquet de fleurs fanées",
    mot: "fanées",
    vraie: "ce sont les fleurs qui ont perdu leur fraicheur",
    autre: "c'est le bouquet qui a perdu sa fraicheur",
    deux: "le bouquet et les fleurs l'ont perdue l'un comme les autres",
    aucune: "la marque ne renseigne pas : les deux lectures restent possibles",
  },
  {
    gn: "un bouquet de fleurs offert au professeur",
    mot: "offert",
    vraie: "c'est le bouquet entier qui a été donné",
    autre: "ce sont les fleurs qui ont été données une à une",
    deux: "le bouquet et les fleurs ont été donnés l'un comme les autres",
    aucune: "la marque ne renseigne pas : les deux lectures restent possibles",
  },

  /* ⭐ LES QUATRE CAS OÙ LA MARQUE NE TRANCHE PAS — ajoutés le 14/08 après
     mesure. Quand le noyau et son complément ont LE MÊME genre ET le même
     nombre, l'accord ne désigne plus personne : les deux lectures restent
     ouvertes, et c'est une chose vraie qu'un élève doit savoir voir.
     Sans ces cas, la ligne « la marque ne renseigne pas » était vue 4 000 fois
     sans être jamais correcte : un distracteur mort, et le QCM retombait à
     trois lignes. */
  {
    gn: "des paniers de fruits ramassés ce matin",
    mot: "ramassés",
    vraie: "la marque ne renseigne pas : les deux lectures restent possibles",
    autre: "ce sont les fruits, et eux seuls, qui ont été ramassés",
    deux: "ce sont les paniers, et eux seuls, qui ont été ramassés",
    aucune: "la phrase est fautive : un tel accord est impossible",
  },
  {
    gn: "des groupes d'élèves inscrits depuis juin",
    mot: "inscrits",
    vraie: "la marque ne renseigne pas : les deux lectures restent possibles",
    autre: "ce sont les élèves, et eux seuls, qui sont inscrits",
    deux: "ce sont les groupes, et eux seuls, qui sont inscrits",
    aucune: "la phrase est fautive : un tel accord est impossible",
  },
  {
    gn: "des boites de photos oubliées au grenier",
    mot: "oubliées",
    vraie: "la marque ne renseigne pas : les deux lectures restent possibles",
    autre: "ce sont les photos, et elles seules, qui ont été oubliées",
    deux: "ce sont les boites, et elles seules, qui ont été oubliées",
    aucune: "la phrase est fautive : un tel accord est impossible",
  },
  {
    gn: "des piles de journaux jaunis par le soleil",
    mot: "jaunis",
    vraie: "la marque ne renseigne pas : les deux lectures restent possibles",
    autre: "ce sont les journaux, et eux seuls, qui ont jauni",
    deux: "ce sont les piles, et elles seules, qui ont jauni",
    aucune: "la phrase est fautive : un tel accord est impossible",
  },
];

/* =============================================================================
   2. LE SUJET DERRIÈRE L'ÉCRAN  (2de_acc_sujet_ecran)
   ---------------------------------------------------------------------------
   Entre le sujet et son verbe, le français glisse volontiers une relative, une
   incise, un complément du nom au pluriel ou un pronom complément. Le verbe
   s'accorde avec le NOYAU du sujet, jamais avec le mot le plus proche.
   ⚠️ Les trois formes fausses ne sont pas des fautes au hasard : ce sont les
   trois erreurs que l'écran produit — accord avec le mot voisin, participe
   accordé à tort, et les deux à la fois.
   ========================================================================== */

const ECRANS: readonly FormeVerbe[] = [
  { phrase: "Le bruit des vagues qui se brisent sur les rochers … toute la nuit.", bonne: "a duré", faux: ["ont duré", "a durés", "ont durés"], sujet: "le bruit" },
  { phrase: "La liste des élèves inscrits au voyage … affichée hier.", bonne: "a été", faux: ["ont été", "avaient été", "furent"], sujet: "la liste" },
  { phrase: "Le paquet de lettres que le facteur avait apportées … sur la table.", bonne: "trainait", faux: ["trainaient", "traina", "trainèrent"], sujet: "le paquet" },
  { phrase: "L'odeur des fleurs et des herbes coupées … dans toute la maison.", bonne: "montait", faux: ["montaient", "monta", "montèrent"], sujet: "l'odeur" },
  { phrase: "Les livres que ma sœur m'a prêtés … encore dans mon sac.", bonne: "sont", faux: ["est", "était", "a été"], sujet: "les livres" },
  { phrase: "Le professeur, entouré de ses élèves, … la consigne au tableau.", bonne: "écrivait", faux: ["écrivaient", "écrivit", "écrivirent"], sujet: "le professeur" },
  { phrase: "Les élèves, malgré la fatigue du voyage, … la question sans hésiter.", bonne: "comprirent", faux: ["comprit", "comprenait", "a compris"], sujet: "les élèves" },
  { phrase: "Le chemin qui longe les champs de canne … jusqu'au bord de mer.", bonne: "descend", faux: ["descendent", "descendait tous", "descendirent"], sujet: "le chemin" },
  { phrase: "La série des questions posées par le jury … les candidats.", bonne: "surprit", faux: ["surprirent", "surprenaient", "ont surpris"], sujet: "la série" },
  { phrase: "Les photographies que le journal a publiées … tout le pays.", bonne: "ont ému", faux: ["a ému", "ont émus", "a émus"], sujet: "les photographies" },
  { phrase: "Le silence des salles vides, après le départ des classes, … presque lourd.", bonne: "devenait", faux: ["devenaient", "devint tous", "devinrent"], sujet: "le silence" },
  { phrase: "Les conseils que son père lui avait donnés … longtemps.", bonne: "servirent", faux: ["servit", "servait", "a servi"], sujet: "les conseils" },
  { phrase: "La couleur des volets et des portes … chaque année.", bonne: "changeait", faux: ["changeaient", "changèrent", "ont changé"], sujet: "la couleur" },
  { phrase: "Les cahiers rangés au fond du placard … oubliés depuis juin.", bonne: "étaient", faux: ["était", "avait été", "fut"], sujet: "les cahiers" },
  { phrase: "Le carnet de notes où il consignait ses observations … perdu.", bonne: "est", faux: ["sont", "étaient", "ont été"], sujet: "le carnet" },
];

/* =============================================================================
   3. LES SUJETS QUI RÉSISTENT  (2de_acc_sujet_difficile)
   ---------------------------------------------------------------------------
   ⛔ TOUS LES CAS OÙ L'USAGE HÉSITE SONT ÉCARTÉS : « un grand nombre de »,
   « la moitié de », « la foule des », « ni l'un ni l'autre », « c'est / ce sont
   eux » acceptent les deux accords selon les grammaires. Ne restent ici que des
   cas fermés, où une seule forme est reçue.
   ⭐ Les deux plus instructifs sont contre-intuitifs : « plus d'un » commande le
   SINGULIER, « moins de deux » commande le PLURIEL. C'est le sens qui perd
   contre la construction.
   ========================================================================== */

const SUJETS_DIFFICILES: readonly FormeVerbe[] = [
  { phrase: "La plupart des élèves … la réponse avant la fin de l'heure.", bonne: "connaissaient", faux: ["connaissait", "connut", "a connu"], sujet: "la plupart des élèves" },
  { phrase: "Beaucoup de spectateurs … avant la fin du match.", bonne: "partirent", faux: ["partit", "partait", "est parti"], sujet: "beaucoup de spectateurs" },
  { phrase: "Peu de candidats … le sujet jusqu'au bout.", bonne: "avaient traité", faux: ["avait traité", "eut traité", "a traité"], sujet: "peu de candidats" },
  { phrase: "Plus d'un élève … la question avant de répondre.", bonne: "a relu", faux: ["ont relu", "avaient relu", "ont relus"], sujet: "plus d'un élève" },
  { phrase: "Moins de deux minutes … pour tout emporter.", bonne: "suffirent", faux: ["suffit", "suffisait", "a suffi"], sujet: "moins de deux minutes" },
  { phrase: "Tout le monde … que la séance était terminée.", bonne: "croyait", faux: ["croyaient", "crurent", "ont cru"], sujet: "tout le monde" },
  { phrase: "Chacun des candidats … dans une salle différente.", bonne: "composait", faux: ["composaient", "composèrent", "ont composé"], sujet: "chacun des candidats" },
  { phrase: "Aucun de ces livres ne … dans la valise.", bonne: "entrait", faux: ["entraient", "entrèrent", "sont entrés"], sujet: "aucun de ces livres" },
  { phrase: "C'est moi qui … la porte, hier soir.", bonne: "ai fermé", faux: ["a fermé", "as fermé", "ont fermé"], sujet: "moi, repris par qui" },
  { phrase: "C'est toi qui … le premier ce matin.", bonne: "es arrivé", faux: ["est arrivé", "suis arrivé", "sont arrivés"], sujet: "toi, repris par qui" },
  { phrase: "Toi et moi … le même chemin depuis six ans.", bonne: "prenons", faux: ["prenez", "prennent", "prend"], sujet: "toi et moi" },
  { phrase: "Ton frère et toi … partis sans prévenir personne.", bonne: "êtes", faux: ["sont", "sommes", "est"], sujet: "ton frère et toi" },
  { phrase: "Que … ces bruits venus du fond du jardin ?", bonne: "signifient", faux: ["signifie", "signifiaient tous", "a signifié"], sujet: "ces bruits, placé après le verbe" },
  { phrase: "Sur la table … deux cahiers et un stylo.", bonne: "trainaient", faux: ["trainait", "traina", "a trainé"], sujet: "deux cahiers et un stylo, placés après" },
  { phrase: "Le vent, ainsi que la pluie, … contre les volets.", bonne: "battait", faux: ["battaient", "battirent", "ont battu"], sujet: "le vent, la pluie n'étant qu'ajoutée entre virgules" },
  { phrase: "Ni la fatigue ni le froid ne … arrêtés ce jour-là.", bonne: "les ont", faux: ["les a", "l'ont", "l'a"], sujet: "la fatigue et le froid, tous deux agissants" },
];

/* =============================================================================
   4. LE PARTICIPE PASSÉ ET LA PLACE DU COMPLÉMENT  (2de_acc_participe_place)
   ---------------------------------------------------------------------------
   ⭐ LES CAS VONT PAR PAIRES, et ce n'est pas un confort de rédaction : une
   table où le complément serait toujours placé avant enseignerait « avec
   avoir, on accorde » — l'inverse exact de la règle. Chaque verbe est donc
   donné deux fois, complément après puis complément avant.
   ========================================================================== */

const PARTICIPES: readonly Participe[] = [
  { phrase: "Il a … les lettres avant de partir.", bonne: "écrit", faux: ["écrite", "écrits", "écrites"], raison: "le complément « les lettres » est placé APRÈS : aucun accord" },
  { phrase: "Les lettres qu'il a … sont restées sans réponse.", bonne: "écrites", faux: ["écrit", "écrite", "écrits"], raison: "« qu' » reprend « les lettres », placé AVANT : accord au féminin pluriel" },
  { phrase: "Nous avons … les photos de la sortie.", bonne: "regardé", faux: ["regardée", "regardés", "regardées"], raison: "le complément est placé APRÈS : aucun accord" },
  { phrase: "Les photos que nous avons … étaient floues.", bonne: "regardées", faux: ["regardé", "regardée", "regardés"], raison: "« que » reprend « les photos », placé AVANT : accord au féminin pluriel" },
  { phrase: "Elle a … ses cahiers dans le placard.", bonne: "rangé", faux: ["rangée", "rangés", "rangées"], raison: "le complément est placé APRÈS : aucun accord" },
  { phrase: "Les cahiers qu'elle a … ont disparu.", bonne: "rangés", faux: ["rangé", "rangée", "rangées"], raison: "« qu' » reprend « les cahiers », placé AVANT : accord au masculin pluriel" },
  { phrase: "Le jury a … deux candidates ce matin.", bonne: "entendu", faux: ["entendue", "entendus", "entendues"], raison: "le complément est placé APRÈS : aucun accord" },
  { phrase: "Les deux candidates que le jury a … sont sorties souriantes.", bonne: "entendues", faux: ["entendu", "entendue", "entendus"], raison: "« que » reprend « les candidates », placé AVANT : accord au féminin pluriel" },
  { phrase: "Il a … ses clés sur la table de l'entrée.", bonne: "laissé", faux: ["laissée", "laissés", "laissées"], raison: "le complément est placé APRÈS : aucun accord" },
  { phrase: "Les clés qu'il a … sur la table ont été retrouvées.", bonne: "laissées", faux: ["laissé", "laissée", "laissés"], raison: "« qu' » reprend « les clés », placé AVANT : accord au féminin pluriel" },
  { phrase: "Elles sont … avant le lever du jour.", bonne: "parties", faux: ["parti", "partie", "partis"], raison: "avec « être », le participe s'accorde toujours avec le sujet" },
  { phrase: "Les élèves sont … dans le calme.", bonne: "entrés", faux: ["entré", "entrée", "entrées"], raison: "avec « être », le participe s'accorde toujours avec le sujet" },
  { phrase: "Elle leur a … la vérité sans détour.", bonne: "dit", faux: ["dite", "dits", "dites"], raison: "« leur » est complément d'objet INDIRECT : il ne commande jamais l'accord" },
  { phrase: "Elle nous a … les règles du jeu.", bonne: "expliqué", faux: ["expliquée", "expliqués", "expliquées"], raison: "« nous » est ici complément indirect, et « les règles » est placé après" },
  { phrase: "Les efforts que ce travail a … valaient la peine.", bonne: "demandés", faux: ["demandé", "demandée", "demandées"], raison: "« que » reprend « les efforts », placé AVANT : accord au masculin pluriel" },
  { phrase: "Ce travail a … beaucoup d'efforts.", bonne: "demandé", faux: ["demandée", "demandés", "demandées"], raison: "le complément est placé APRÈS : aucun accord" },
];

/* =============================================================================
   5. TRANCHER PAR L'ACCORD  (2de_acc_homophone)
   ---------------------------------------------------------------------------
   Ces couples ne se distinguent pas à l'oreille : seule la marque d'accord les
   sépare, et cette marque dit à quelle classe le mot appartient. « leur » qui
   ne prend pas de s est un pronom ; « leurs » qui en prend est un déterminant.
   ⛔ Écartés : « ci-joint », « nu », « possible », « excepté » — l'usage y flotte
   selon la place et selon les grammaires.
   ========================================================================== */

const HOMOPHONES: readonly Homophone[] = [
  { phrase: "Les surveillants … ont demandé de sortir en silence.", bonne: "leur", faux: ["leurs", "leur s", "les leurs"], raison: "ici « leur » remplace « à eux » : c'est un pronom, il ne prend jamais de s" },
  { phrase: "Les élèves ont oublié … cahiers dans la salle.", bonne: "leurs", faux: ["leur", "leur s", "les leur"], raison: "ici « leurs » accompagne un nom au pluriel : c'est un déterminant, il s'accorde" },
  { phrase: "Elle est … étonnée de sa réponse.", bonne: "tout", faux: ["toute", "tous", "toutes"], raison: "devant un adjectif féminin commençant par une voyelle, « tout » reste invariable : c'est un adverbe" },
  { phrase: "Elle est … honteuse de son retard.", bonne: "toute", faux: ["tout", "tous", "toutes"], raison: "devant un adjectif féminin commençant par une consonne, l'adverbe « tout » prend la marque du féminin" },
  { phrase: "… les candidats ont rendu leur copie.", bonne: "Tous", faux: ["Tout", "Toute", "Toutes"], raison: "ici le mot accompagne un nom masculin pluriel : c'est un déterminant, il s'accorde" },
  { phrase: "Les élèves … ont trouvé la consigne obscure.", bonne: "eux-mêmes", faux: ["eux-même", "eux même", "eux mêmes"], raison: "après un pronom pluriel, « même » se met au pluriel et garde son trait d'union" },
  { phrase: "Ce sont les … arguments qu'hier.", bonne: "mêmes", faux: ["même", "mêmes s", "mème"], raison: "ici « mêmes » accompagne un nom pluriel : il s'accorde" },
  { phrase: "… soient les résultats, il faudra recommencer.", bonne: "Quels que", faux: ["Quelque", "Quelques", "Quel que"], raison: "devant le verbe « être », on écrit « quel que » en deux mots, et « quel » s'accorde avec le sujet qui suit" },
  { phrase: "Il a relu … pages avant de conclure.", bonne: "quelques", faux: ["quelque", "quels que", "quelles que"], raison: "ici le mot accompagne un nom pluriel : c'est un déterminant, il s'accorde" },
  { phrase: "Elles se sont … la main sur le quai.", bonne: "serré", faux: ["serrée", "serrés", "serrées"], raison: "le complément « la main » est placé après : le pronom « se » est indirect, aucun accord" },
  { phrase: "Elles se sont … dans le couloir.", bonne: "croisées", faux: ["croisé", "croisée", "croisés"], raison: "ici « se » est complément direct et placé avant : accord au féminin pluriel" },
  { phrase: "Il a acheté quatre-… œufs pour la recette.", bonne: "vingts", faux: ["vingt", "vingtes", "vingt s"], raison: "« vingt » multiplié et terminant le nombre prend un s" },
  { phrase: "Il a compté quatre-…-trois marches.", bonne: "vingt", faux: ["vingts", "vingtes", "vingt s"], raison: "« vingt » suivi d'un autre nombre reste invariable" },
  { phrase: "La règle qu'ils s'étaient … n'a pas tenu.", bonne: "fixée", faux: ["fixé", "fixés", "fixées"], raison: "« qu' » reprend « la règle », complément direct placé avant : accord au féminin singulier" },
  { phrase: "Les années qu'il a … ici l'ont marqué.", bonne: "passées", faux: ["passé", "passée", "passés"], raison: "« qu' » reprend « les années », complément direct placé avant : accord au féminin pluriel" },
];

/* =============================================================================
   6. LA COMMUTATION QUI RÉVÈLE LA FONCTION  (2de_acc_classe_fonction)
   ---------------------------------------------------------------------------
   ⭐ Le programme demande de « consolider la connaissance des classes lexicales
   et des fonctions syntaxiques », et il nomme au III les manipulations qui le
   permettent — dont la PRONOMINALISATION. On ne fait donc pas réciter une
   étiquette : on remplace, et le pronom qui convient trahit la fonction.
   « le / la / les » remplace un complément direct, « lui / leur » un complément
   indirect introduit par à, « en » un complément introduit par de, « y » un
   complément de lieu ou introduit par à devant une chose.
   ========================================================================== */

const PRONOMINALISATIONS: readonly Pronominalisation[] = [
  { phrase: "Le facteur apporte une lettre.", groupe: "une lettre", pronom: "l'", fonction: "complément direct du verbe" },
  { phrase: "Le facteur parle à la voisine.", groupe: "à la voisine", pronom: "lui", fonction: "complément indirect introduit par à" },
  { phrase: "Elle se souvient de cette journée.", groupe: "de cette journée", pronom: "en", fonction: "complément indirect introduit par de" },
  { phrase: "Nous pensons à ce voyage depuis des mois.", groupe: "à ce voyage", pronom: "y", fonction: "complément indirect introduit par à devant une chose" },
  { phrase: "Le professeur rend les copies aux élèves.", groupe: "les copies", pronom: "les", fonction: "complément direct du verbe" },
  { phrase: "Le professeur rend les copies aux élèves.", groupe: "aux élèves", pronom: "leur", fonction: "complément indirect introduit par à" },
  { phrase: "Il revient du marché à midi.", groupe: "du marché", pronom: "en", fonction: "complément indirect introduit par de" },
  { phrase: "Elle habite à Saint-Pierre depuis l'enfance.", groupe: "à Saint-Pierre", pronom: "y", fonction: "complément de lieu" },
  { phrase: "Les élèves ont écouté le récit sans bouger.", groupe: "le récit", pronom: "l'", fonction: "complément direct du verbe" },
  { phrase: "Il a répondu à sa mère sans lever les yeux.", groupe: "à sa mère", pronom: "lui", fonction: "complément indirect introduit par à" },
  { phrase: "Nous avons besoin de ces documents.", groupe: "de ces documents", pronom: "en", fonction: "complément indirect introduit par de" },
  { phrase: "Elle a rangé ses affaires dans le tiroir.", groupe: "ses affaires", pronom: "les", fonction: "complément direct du verbe" },
  { phrase: "Le principal a téléphoné aux parents hier soir.", groupe: "aux parents", pronom: "leur", fonction: "complément indirect introduit par à" },
  { phrase: "Il tient beaucoup à cette promesse.", groupe: "à cette promesse", pronom: "y", fonction: "complément indirect introduit par à devant une chose" },
  { phrase: "Le jury a félicité les candidats.", groupe: "les candidats", pronom: "les", fonction: "complément direct du verbe" },
  { phrase: "Elle doute de sa réussite.", groupe: "de sa réussite", pronom: "en", fonction: "complément indirect introduit par de" },
];

const TOUS_PRONOMS: readonly string[] = ["l'", "les", "lui", "leur", "en", "y"];

export const accordsSecondeBank: TutorBankItemV4[] = [
  /* =========================================================
     2DE_ACC_COMMANDE_GN
  ========================================================= */
  {
    kind: "template",
    id: "2de_acc_commande_gn_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "accords_2de",
    microId: "2de_acc_commande_gn",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde la marque du mot souligné : singulier ou pluriel. Elle désigne celui des deux noms dont on parle.",
    tags: ["seconde", "grammaire", "accords", "groupe nominal", "template"],
    generate: () => {
      const c = randomChoice(LECTURES);
      const ambigu = c.vraie.startsWith("la marque ne renseigne pas");
      return {
        text: `« ${c.gn} »\n\nQue nous apprend l'accord de « ${c.mot} » ?`,
        format: "qcm" as const,
        choices: makeChoices(c.vraie, [c.autre, c.deux, c.aucune]),
        expected: [c.vraie],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Dans un groupe nominal étendu, l'adjectif ou le participe ne peut s'accorder qu'avec un seul des deux noms. Sa marque n'est donc pas une décoration : elle DÉSIGNE celui dont on parle — sauf quand les deux noms ont le même genre et le même nombre, et alors elle ne désigne plus rien.",
          "Compare le genre et le nombre des deux noms. S'ils diffèrent, la marque tranche et te dit lequel est concerné. S'ils sont identiques, aucune lecture ne l'emporte.",
          ambigu
            ? `Dans « ${c.gn} », les deux noms ont le même genre et le même nombre : la marque de « ${c.mot} » pourrait venir de l'un comme de l'autre.`
            : `Dans « ${c.gn} », la marque de « ${c.mot} » conduit à une seule lecture : ${c.vraie}.`,
          ambigu
            ? "Rien ne permet de trancher : la phrase reste ambigüe."
            : `${c.vraie.charAt(0).toUpperCase()}${c.vraie.slice(1)}.`,
        ),
      };
    },
  },

  /* =========================================================
     2DE_ACC_SUJET_ECRAN
  ========================================================= */
  {
    kind: "template",
    id: "2de_acc_sujet_ecran_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "accords_2de",
    microId: "2de_acc_sujet_ecran",
    difficulty: 2,
    theme: "neutral",
    hint: "Supprime tout ce qui sépare le sujet du verbe. Ce qui reste commande l'accord.",
    tags: ["seconde", "grammaire", "accords", "sujet-verbe", "template"],
    generate: () => {
      const c = randomChoice(ECRANS);
      return {
        text: `« ${c.phrase} »\n\nQuelle forme convient ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le verbe s'accorde avec le NOYAU du sujet, jamais avec le mot qui le précède immédiatement. Relative, incise, complément du nom : tout cela fait écran sans rien commander.",
          "Efface par la pensée ce qui s'intercale entre le sujet et le verbe, puis relis. La phrase réduite donne l'accord sans hésitation.",
          `Ici, le sujet est ${c.sujet} : la forme attendue est « ${c.bonne} ».`,
          `C'est « ${c.bonne} ».`,
        ),
      };
    },
  },

  /* =========================================================
     2DE_ACC_SUJET_DIFFICILE
  ========================================================= */
  {
    kind: "template",
    id: "2de_acc_sujet_difficile_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "accords_2de",
    microId: "2de_acc_sujet_difficile",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche d'abord QUI fait l'action, même si le sujet est placé après le verbe ou dispersé.",
    tags: ["seconde", "grammaire", "accords", "sujet-verbe", "template"],
    generate: () => {
      const c = randomChoice(SUJETS_DIFFICILES);
      return {
        text: `« ${c.phrase} »\n\nQuelle forme convient ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Certains sujets ne se laissent pas lire de gauche à droite : sujet collectif, sujets coordonnés, sujet rejeté après le verbe, ou pronom relatif qui reprend une personne. Dans chaque cas, c'est le sens et la construction qui décident, pas la place.",
          "Pose la question « qui est-ce qui ? » devant le verbe. La réponse est le sujet, où qu'il se trouve dans la phrase.",
          `Ici, le sujet est ${c.sujet} : la forme attendue est « ${c.bonne} ».`,
          `C'est « ${c.bonne} ».`,
        ),
      };
    },
  },

  /* =========================================================
     2DE_ACC_PARTICIPE_PLACE
  ========================================================= */
  {
    kind: "template",
    id: "2de_acc_participe_place_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "accords_2de",
    microId: "2de_acc_participe_place",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche le complément direct. S'il est avant le participe, l'accord se fait ; s'il est après, rien ne bouge.",
    tags: ["seconde", "grammaire", "accords", "participe passé", "template"],
    generate: () => {
      const c = randomChoice(PARTICIPES);
      return {
        text: `« ${c.phrase} »\n\nQuelle forme convient ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Avec l'auxiliaire avoir, le participe passé ne s'accorde que si le complément DIRECT est placé avant lui. Avec l'auxiliaire être, il s'accorde toujours avec le sujet. Un complément indirect, lui, ne commande jamais rien.",
          "Trouve le complément direct en demandant « quoi ? » après le verbe, puis regarde s'il est avant ou après le participe. S'il n'y a pas de complément direct, il n'y a pas d'accord.",
          `Ici, ${c.raison} : on écrit « ${c.bonne} ».`,
          `C'est « ${c.bonne} ».`,
        ),
      };
    },
  },

  /* =========================================================
     2DE_ACC_HOMOPHONE
  ========================================================= */
  {
    kind: "template",
    id: "2de_acc_homophone_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "accords_2de",
    microId: "2de_acc_homophone",
    difficulty: 3,
    theme: "neutral",
    hint: "Les deux graphies se prononcent pareil. Demande-toi ce que le mot FAIT dans la phrase : il accompagne un nom, ou il en remplace un.",
    tags: ["seconde", "grammaire", "accords", "homophones", "template"],
    generate: () => {
      const c = randomChoice(HOMOPHONES);
      return {
        text: `« ${c.phrase} »\n\nQuelle graphie convient ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Ces couples ne se distinguent pas à l'oreille : seule la marque d'accord les sépare, et elle dit à quelle classe le mot appartient. Un mot qui accompagne un nom s'accorde avec lui ; un mot qui remplace un nom, ou qui modifie un adjectif, ne s'accorde pas de la même façon.",
          "Remplace le groupe par un équivalent qui, lui, ne pose pas de doute : « leur » par « à eux », « tout » par « entièrement », « quel que » par « peu importe ».",
          `Ici, ${c.raison}.`,
          `On écrit « ${c.bonne} ».`,
        ),
      };
    },
  },

  /* =========================================================
     2DE_ACC_CLASSE_FONCTION
  ========================================================= */
  {
    kind: "template",
    id: "2de_acc_classe_fonction_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "accords_2de",
    microId: "2de_acc_classe_fonction",
    difficulty: 2,
    theme: "neutral",
    hint: "Remplace le groupe par un pronom et écoute : le pronom qui convient trahit la fonction.",
    tags: ["seconde", "grammaire", "fonctions", "pronominalisation", "template"],
    generate: () => {
      const c = randomChoice(PRONOMINALISATIONS);
      return {
        text: `« ${c.phrase} »\n\nPar quel pronom peut-on remplacer « ${c.groupe} » ?`,
        format: "qcm" as const,
        choices: makeChoices(c.pronom, TOUS_PRONOMS),
        expected: [c.pronom],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La pronominalisation est l'une des manipulations que le programme de lycée nomme. Elle révèle la fonction sans qu'on ait à l'étiqueter : « le, la, les » remplacent un complément direct, « lui, leur » un complément indirect en à, « en » un complément en de, « y » un complément de lieu ou en à devant une chose.",
          "Remplace, puis relis la phrase à voix basse. Une seule des formes tient debout.",
          `Ici, « ${c.groupe} » est ${c.fonction} : il se remplace par « ${c.pronom} ».`,
          `C'est « ${c.pronom} ».`,
        ),
      };
    },
  },
];
