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

// ══ LES SECONDS ITEMS (18/08/2026) ══
// Le coach en mode COMPLET oppose deux énoncés : sans un second item par micro,
// il lève « Aucune paire disponible » — mesuré, 96/96 en mode simple mais 1/96
// en mode complet (`scripts/verifier-demarrage.ts seconde francais complete`).
// ⭐ Un second item n'est pas le même exercice avec d'autres valeurs. Le premier
// va de la FORME au SENS ou fait CHOISIR une forme ; le second part du SENS, ou
// demande une des manipulations que le programme nomme au III — commutation,
// déplacement, suppression, pronominalisation.

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

/* ═══════════ LES TABLES DES SECONDS ITEMS ═══════════ */

type Intention = { readonly gn: string; readonly veut: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };
type Commande = { readonly phrase: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };
type Faute = { readonly phrase: string; readonly bonne: string; readonly faux: readonly string[]; readonly correct: string; readonly raison: string };
type Deplace = { readonly depart: string; readonly arrivee: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };
type Graphie = { readonly phrase: string; readonly veut: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };
type Commute = { readonly phrase: string; readonly groupe: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };

/* 1 bis. L'INTENTION EST DONNÉE, L'ÉCRITURE EST À CHOISIR (2de_acc_commande_gn)
   Le premier item lit une marque déjà écrite. Celui-ci part du sens voulu : le
   même groupe nominal s'écrit de deux façons selon ce qu'on veut dire, et c'est
   exactement ce que le programme appelle enrichir plutôt qu'introduire.
   ⭐ Les entrées vont par PAIRES — même groupe, une fois le noyau, une fois le
   complément. Une table où l'accord se ferait toujours sur le complément
   apprendrait une fausse règle. */
const INTENTIONS: readonly Intention[] = [
  { gn: "une boite de chocolats … en Suisse", veut: "ce sont les CHOCOLATS qui viennent de Suisse", bonne: "fabriqués", faux: ["fabriquée", "fabriqué", "fabriquées"], raison: "l'accord au masculin pluriel renvoie à « chocolats »" },
  { gn: "une boite de chocolats … en Suisse", veut: "c'est la BOITE qui a été faite en Suisse", bonne: "fabriquée", faux: ["fabriqués", "fabriqué", "fabriquées"], raison: "le féminin singulier renvoie à « boite », le noyau du groupe" },
  { gn: "un groupe de touristes … dans la ville", veut: "ce sont les TOURISTES qui se sont égarés", bonne: "perdus", faux: ["perdu", "perdue", "perdues"], raison: "le masculin pluriel renvoie à « touristes »" },
  { gn: "un groupe de touristes … dans la ville", veut: "c'est le GROUPE entier qui s'est égaré", bonne: "perdu", faux: ["perdus", "perdue", "perdues"], raison: "le masculin singulier renvoie à « groupe », le noyau" },
  { gn: "une série de photographies … au petit matin", veut: "ce sont les PHOTOGRAPHIES qui ont été faites au petit matin", bonne: "prises", faux: ["prise", "pris", "prisent"], raison: "le féminin pluriel renvoie à « photographies »" },
  { gn: "une série de photographies … dans les années trente", veut: "c'est la SÉRIE qui date des années trente", bonne: "commencée", faux: ["commencées", "commencé", "commencés"], raison: "le féminin singulier renvoie à « série »" },
  { gn: "un panier de fruits … du jardin", veut: "ce sont les FRUITS qui viennent du jardin", bonne: "cueillis", faux: ["cueilli", "cueillie", "cueillies"], raison: "le masculin pluriel renvoie à « fruits »" },
  { gn: "un panier de fruits … à la main", veut: "c'est le PANIER qui a été fait à la main", bonne: "tressé", faux: ["tressés", "tressée", "tressées"], raison: "le masculin singulier renvoie à « panier »" },
  { gn: "un tas de feuilles … depuis l'automne", veut: "ce sont les FEUILLES qui sont sèches", bonne: "mortes", faux: ["mort", "morte", "morts"], raison: "le féminin pluriel renvoie à « feuilles »" },
  { gn: "une collection de timbres … par un spécialiste", veut: "ce sont les TIMBRES qui ont été authentifiés", bonne: "expertisés", faux: ["expertisée", "expertisé", "expertisées"], raison: "le masculin pluriel renvoie à « timbres »" },
  { gn: "une collection de timbres … à sa fille", veut: "c'est la COLLECTION qui a été transmise", bonne: "léguée", faux: ["légués", "légué", "léguées"], raison: "le féminin singulier renvoie à « collection »" },
  { gn: "un bouquet de fleurs … la veille", veut: "ce sont les FLEURS qui ont été coupées la veille", bonne: "coupées", faux: ["coupé", "coupée", "coupés"], raison: "le féminin pluriel renvoie à « fleurs »" },
  { gn: "une pile de livres … par ordre alphabétique", veut: "ce sont les LIVRES qui ont été rangés dans cet ordre", bonne: "classés", faux: ["classée", "classé", "classées"], raison: "le masculin pluriel renvoie à « livres »" },
  { gn: "une pile de livres … contre le mur", veut: "c'est la PILE qui est appuyée au mur", bonne: "posée", faux: ["posés", "posé", "posées"], raison: "le féminin singulier renvoie à « pile »" },
  { gn: "un ensemble de règles … aux élèves", veut: "ce sont les RÈGLES qui ont été expliquées", bonne: "présentées", faux: ["présenté", "présentée", "présentés"], raison: "le féminin pluriel renvoie à « règles »" },
  { gn: "un ensemble de règles … en trois parties", veut: "c'est l'ENSEMBLE qui est divisé en trois", bonne: "organisé", faux: ["organisés", "organisée", "organisées"], raison: "le masculin singulier renvoie à « ensemble »" },
];

/* 2 bis. QUEL MOT COMMANDE L'ACCORD ? (2de_acc_sujet_ecran)
   Le premier item fait choisir la forme du verbe. Celui-ci demande la cause
   plutôt que l'effet : quel mot, dans une phrase où plusieurs noms se pressent
   devant le verbe, commande vraiment l'accord. C'est la suppression — l'une des
   manipulations nommées au III — appliquée aux écrans. */
const COMMANDES: readonly Commande[] = [
  { phrase: "La liste des candidats retenus pour l'épreuve sera affichée demain.", bonne: "liste", faux: ["candidats", "épreuve", "retenus"], raison: "supprime « des candidats retenus pour l'épreuve » : « la liste sera affichée » tient debout" },
  { phrase: "Le bruit des vagues qui se brisent sur les rochers berçait la maison.", bonne: "bruit", faux: ["vagues", "rochers", "maison"], raison: "c'est le bruit qui berce, pas les vagues ; le reste ne fait que le préciser" },
  { phrase: "Les élèves de cette classe, malgré la fatigue, ont tenu jusqu'au bout.", bonne: "élèves", faux: ["classe", "fatigue", "bout"], raison: "« malgré la fatigue » est un écran détaché, entre virgules : on peut l'ôter" },
  { phrase: "L'ensemble des documents transmis par les familles a été vérifié.", bonne: "ensemble", faux: ["documents", "familles", "vérifié"], raison: "le noyau du groupe sujet est « ensemble » ; « des documents » le complète" },
  { phrase: "Le choix de ces deux poèmes du seizième siècle surprend le lecteur.", bonne: "choix", faux: ["poèmes", "siècle", "lecteur"], raison: "ce qui surprend, c'est le choix — les poèmes ne font que dire lequel" },
  { phrase: "La qualité des arguments avancés par les deux camps reste inégale.", bonne: "qualité", faux: ["arguments", "camps", "inégale"], raison: "supprime les compléments : « la qualité reste inégale »" },
  { phrase: "Le nombre exact des victimes de cette éruption demeure inconnu.", bonne: "nombre", faux: ["victimes", "éruption", "exact"], raison: "« exact » qualifie le nombre, il ne commande rien" },
  { phrase: "Les images de ce documentaire tourné à La Réunion ont marqué le public.", bonne: "images", faux: ["documentaire", "Réunion", "public"], raison: "ce sont les images qui ont marqué ; le participe « tourné » se rapporte au documentaire" },
  { phrase: "L'usage de ces tournures dans les journaux du siècle dernier étonne aujourd'hui.", bonne: "usage", faux: ["tournures", "journaux", "siècle"], raison: "le noyau est « usage » : tout le reste le précise" },
  { phrase: "La lecture des trois pièces inscrites au programme demande du temps.", bonne: "lecture", faux: ["pièces", "programme", "temps"], raison: "supprime « des trois pièces inscrites au programme » et la phrase reste entière" },
  { phrase: "Le récit de ces journées passées en mer occupe le premier chapitre.", bonne: "récit", faux: ["journées", "mer", "chapitre"], raison: "c'est le récit qui occupe le chapitre, non les journées" },
  { phrase: "Les conséquences de cette décision prise en janvier apparaissent seulement maintenant.", bonne: "conséquences", faux: ["décision", "janvier", "maintenant"], raison: "le pluriel du verbe suit « conséquences », noyau du groupe sujet" },
  { phrase: "Le sens de ces deux vers, très discuté par les commentateurs, reste ouvert.", bonne: "sens", faux: ["vers", "commentateurs", "discuté"], raison: "l'apposition entre virgules est un écran : on l'ôte pour entendre l'accord" },
  { phrase: "Les portraits de cette famille peints au dix-septième siècle ont disparu.", bonne: "portraits", faux: ["famille", "siècle", "peints"], raison: "ce sont les portraits qui ont disparu ; « peints » s'accorde avec eux, il ne commande pas" },
];

/* 3 bis. TROUVER LA FAUTE (2de_acc_sujet_difficile)
   Le premier item propose des formes et en fait choisir une. Celui-ci fait
   l'inverse : la phrase est écrite, et elle est fautive. Repérer vaut plus que
   choisir — c'est le geste de la relecture.
   ⛔ Aucun cas où l'usage hésite : ni « c'est / ce sont eux », ni « un grand
   nombre de », ni « ainsi que », ni « ni l'un ni l'autre ». On ne demande pas
   à un élève de trancher là où les grammairiens ne tranchent pas. */
const FAUTES: readonly Faute[] = [
  { phrase: "Ainsi disparaissait les dernières traces du village.", bonne: "disparaissait", correct: "disparaissaient", faux: ["traces", "dernières", "village"], raison: "le sujet « les dernières traces » est placé après le verbe, mais il commande quand même" },
  { phrase: "Sur la table traînait des papiers et des crayons.", bonne: "traînait", correct: "traînaient", faux: ["table", "papiers", "crayons"], raison: "le sujet inversé est double : « des papiers et des crayons »" },
  { phrase: "Toi et moi partiront demain matin.", bonne: "partiront", correct: "partirons", faux: ["Toi", "moi", "demain"], raison: "« toi et moi » équivaut à « nous » : la première personne l'emporte" },
  { phrase: "Ton frère et toi arriveront les premiers.", bonne: "arriveront", correct: "arriverez", faux: ["frère", "toi", "premiers"], raison: "« ton frère et toi » équivaut à « vous » : la deuxième personne l'emporte sur la troisième" },
  { phrase: "Toi qui sait tout, explique-nous cette page.", bonne: "sait", correct: "sais", faux: ["Toi", "tout", "page"], raison: "dans la relative, le verbe s'accorde avec l'antécédent de « qui » — ici « toi », deuxième personne" },
  { phrase: "C'est moi qui a écrit cette lettre.", bonne: "a", correct: "ai", faux: ["moi", "écrit", "lettre"], raison: "l'antécédent de « qui » est « moi » : le verbe se met à la première personne" },
  { phrase: "Restait les deux dernières places du fond.", bonne: "Restait", correct: "Restaient", faux: ["places", "dernières", "fond"], raison: "le sujet « les deux dernières places » suit le verbe, l'accord ne change pas pour autant" },
  { phrase: "Les gens qui vient ici ne repartent jamais.", bonne: "vient", correct: "viennent", faux: ["gens", "repartent", "jamais"], raison: "l'antécédent de « qui » est « les gens » : troisième personne du pluriel" },
  { phrase: "Combien d'élèves a répondu à cette question ?", bonne: "a", correct: "ont", faux: ["élèves", "répondu", "question"], raison: "le sujet réel est « d'élèves » : c'est lui qui commande, non l'adverbe « combien »" },
  { phrase: "Les uns et les autres se félicitait du résultat.", bonne: "félicitait", correct: "félicitaient", faux: ["uns", "autres", "résultat"], raison: "deux sujets coordonnés font un pluriel" },
  { phrase: "Peu de spectateurs a compris la fin de la pièce.", bonne: "a", correct: "ont", faux: ["spectateurs", "compris", "pièce"], raison: "après « peu de », c'est le nom complément qui commande l'accord" },
  { phrase: "Nous qui a tant attendu, nous ne dirons rien.", bonne: "a", correct: "avons", faux: ["Nous", "attendu", "rien"], raison: "l'antécédent de « qui » est « nous » : première personne du pluriel" },
];

/* 4 bis. DÉPLACER LE COMPLÉMENT (2de_acc_participe_place)
   ⭐ Le déplacement est nommé au III parmi les manipulations. Il fait apparaitre
   la règle au lieu de la réciter : le même participe s'accorde ou non selon que
   le complément direct passe devant lui ou derrière.
   ⭐ Les entrées vont dans LES DEUX SENS. Dans un seul, l'élève apprendrait
   « quand on déplace, l'accord tombe » — ce qui n'est vrai que d'un côté. */
const DEPLACES: readonly Deplace[] = [
  { depart: "Les lettres qu'il a écrites sont parties.", arrivee: "Il a écrit les lettres.", bonne: "écrit", faux: ["écrits", "écrite", "écrites"], raison: "le complément direct passe APRÈS le participe : plus rien ne commande l'accord" },
  { depart: "Il a écrit les lettres.", arrivee: "les lettres qu'il a …", bonne: "écrites", faux: ["écrit", "écrits", "écrite"], raison: "le complément direct passe AVANT : le participe s'accorde avec lui" },
  { depart: "La maison qu'elle a vendue était petite.", arrivee: "Elle a vendu la maison.", bonne: "vendu", faux: ["vendus", "vendue", "vendues"], raison: "complément placé après : le participe reste invariable" },
  { depart: "Elle a vendu la maison.", arrivee: "la maison qu'elle a …", bonne: "vendue", faux: ["vendu", "vendus", "vendues"], raison: "complément placé avant : accord au féminin singulier" },
  { depart: "Les photos que j'ai prises sont floues.", arrivee: "J'ai pris les photos.", bonne: "pris", faux: ["prise", "prises", "prisent"], raison: "le complément suit le participe : aucun accord" },
  { depart: "J'ai pris les photos.", arrivee: "les photos que j'ai …", bonne: "prises", faux: ["pris", "prise", "prisent"], raison: "le complément précède : accord au féminin pluriel" },
  { depart: "Les erreurs qu'ils ont commises sont réparables.", arrivee: "Ils ont commis les erreurs.", bonne: "commis", faux: ["commise", "commises", "commit"], raison: "complément après : le participe ne bouge pas" },
  { depart: "Ils ont commis les erreurs.", arrivee: "les erreurs qu'ils ont …", bonne: "commises", faux: ["commis", "commise", "commit"], raison: "complément avant : accord au féminin pluriel" },
  { depart: "La lettre que j'ai reçue ce matin m'a surpris.", arrivee: "J'ai reçu la lettre ce matin.", bonne: "reçu", faux: ["reçus", "reçue", "reçues"], raison: "complément après : pas d'accord" },
  { depart: "Elle a lu tous les livres.", arrivee: "tous les livres qu'elle a …", bonne: "lus", faux: ["lu", "lue", "lues"], raison: "complément avant : accord au masculin pluriel" },
  { depart: "Les fleurs que nous avons cueillies ont fané.", arrivee: "Nous avons cueilli les fleurs.", bonne: "cueilli", faux: ["cueillis", "cueillie", "cueillies"], raison: "complément après : le participe reste tel quel" },
  { depart: "Ils ont prononcé ces paroles.", arrivee: "ces paroles qu'ils ont …", bonne: "prononcées", faux: ["prononcé", "prononcés", "prononcée"], raison: "complément avant : accord au féminin pluriel" },
  { depart: "Les décisions qu'il a prises engagent tout le monde.", arrivee: "Il a pris les décisions.", bonne: "pris", faux: ["prise", "prises", "prit"], raison: "complément après : aucun accord" },
  { depart: "Nous avons oublié les clés.", arrivee: "les clés que nous avons …", bonne: "oubliées", faux: ["oublié", "oubliés", "oubliée"], raison: "complément avant : accord au féminin pluriel" },
];

/* 5 bis. L'INTENTION COMMANDE LA GRAPHIE (2de_acc_homophone)
   Le premier item pose la phrase et fait choisir la graphie. Celui-ci donne
   d'abord ce qu'on VEUT DIRE : c'est le sens qui tranche entre deux formes qui
   se prononcent pareil, jamais l'oreille. */
const GRAPHIES: readonly Graphie[] = [
  { phrase: "… livres sont à moi.", veut: "je désigne des livres qui sont posés là", bonne: "Ces", faux: ["Ses", "C'est", "S'est"], raison: "« ces » montre : on peut ajouter « -là » — « ces livres-là »" },
  { phrase: "Il a rangé … livres avec soin.", veut: "je dis que les livres appartiennent à Paul", bonne: "ses", faux: ["ces", "c'est", "s'est"], raison: "« ses » possède : on peut dire « les siens »" },
  { phrase: "Il … trompé de chemin.", veut: "je dis qu'il a fait une erreur, lui-même", bonne: "s'est", faux: ["c'est", "ses", "ces"], raison: "« s'est » contient le pronom réfléchi : il se trompe lui-même" },
  { phrase: "… la meilleure solution.", veut: "je désigne la solution dont je viens de parler", bonne: "C'est", faux: ["S'est", "Ces", "Ses"], raison: "« c'est » présente : on peut remplacer par « cela est »" },
  { phrase: "… eux qui décident.", veut: "je désigne les personnes qui décident", bonne: "Ce sont", faux: ["Se sont", "C'est", "S'est"], raison: "« ce sont » présente au pluriel ; « se sont » demanderait un verbe pronominal derrière" },
  { phrase: "Ils … amusés toute la soirée.", veut: "je dis qu'ils se sont amusés eux-mêmes", bonne: "se sont", faux: ["ce sont", "c'est", "s'est"], raison: "le verbe est pronominal : « s'amuser » garde son pronom réfléchi" },
  { phrase: "Je ne sais pas … heure il est.", veut: "je pose une question sur l'heure", bonne: "quelle", faux: ["qu'elle", "quel", "quels"], raison: "« quelle » accompagne le nom « heure », féminin singulier" },
  { phrase: "Je ne sais pas … viendra demain.", veut: "je parle d'une personne, elle", bonne: "qu'elle", faux: ["quelle", "quel", "quels"], raison: "« qu'elle » contient le pronom « elle » : on peut dire « qu'il »" },
  { phrase: "Le professeur … a rendu les copies.", veut: "je parle de plusieurs élèves, à qui il rend les copies", bonne: "leur", faux: ["leurs", "l'heure", "leures"], raison: "« leur » pronom, mis pour « à eux », ne prend jamais de s" },
  { phrase: "Ils ont oublié … cahiers à la maison.", veut: "je parle des cahiers qui leur appartiennent, plusieurs", bonne: "leurs", faux: ["leur", "l'heure", "leures"], raison: "« leurs » déterminant s'accorde avec le nom qu'il accompagne" },
  { phrase: "Les élèves … terminé l'exercice.", veut: "je dis qu'ils l'ont fini", bonne: "ont", faux: ["on", "onts", "hont"], raison: "« ont » est le verbe avoir : on peut dire « avaient »" },
  { phrase: "… ne sait jamais ce qui va se passer.", veut: "je parle des gens en général", bonne: "On", faux: ["Ont", "Onts", "Hont"], raison: "« on » est un pronom sujet : on peut dire « il »" },
  { phrase: "Elle est allée … se trouvait la source.", veut: "j'indique le lieu", bonne: "où", faux: ["ou", "oux", "hou"], raison: "« où » avec accent marque le lieu ; « ou » relierait deux possibilités" },
  { phrase: "Tu prendras le train … le bus.", veut: "je propose deux possibilités entre lesquelles choisir", bonne: "ou", faux: ["où", "oux", "hou"], raison: "« ou » sans accent équivaut à « ou bien »" },
];

/* 6 bis. COMMUTER SANS CHANGER LA FONCTION (2de_acc_classe_fonction)
   Le premier item pronominalise. Celui-ci commute : on remplace le groupe par
   un autre, et un seul occupe la MÊME place dans la phrase. Le programme nomme
   la commutation en tête des manipulations, et son IV en fait un exercice.
   ⚠️ Les distracteurs sont des groupes parfaitement corrects — ils ont
   seulement une AUTRE fonction. On ne les écarte donc pas à l'oreille. */
const COMMUTES: readonly Commute[] = [
  { phrase: "Les élèves écoutent le professeur.", groupe: "le professeur", bonne: "la consigne", faux: ["attentivement", "en silence", "au professeur"], raison: "« le professeur » est complément direct : seul un autre complément direct tient la place" },
  { phrase: "Elle parle de son voyage.", groupe: "de son voyage", bonne: "de ses projets", faux: ["son voyage", "longuement", "hier"], raison: "le complément est introduit par « de » : le remplaçant doit l'être aussi" },
  { phrase: "Il est devenu médecin.", groupe: "médecin", bonne: "célèbre", faux: ["un livre", "à Paris", "hier"], raison: "« médecin » est attribut du sujet : un adjectif peut occuper la même place" },
  { phrase: "Nous partirons demain.", groupe: "demain", bonne: "à l'aube", faux: ["contents", "le train", "de joie"], raison: "« demain » indique le temps : seul un autre repère de temps tient la place" },
  { phrase: "Elle habite à Saint-Denis.", groupe: "à Saint-Denis", bonne: "en ville", faux: ["depuis un an", "sa maison", "heureuse"], raison: "le groupe indique le lieu ; « depuis un an » indiquerait le temps" },
  { phrase: "Je pense à mon avenir.", groupe: "à mon avenir", bonne: "à mes études", faux: ["mon avenir", "souvent", "avec inquiétude"], raison: "le complément est introduit par « à » : le retirer changerait la construction" },
  { phrase: "Il a acheté une maison ancienne.", groupe: "ancienne", bonne: "en pierre", faux: ["hier", "cher", "une maison"], raison: "« ancienne » qualifie le nom « maison » : un complément du nom fait le même travail" },
  { phrase: "Le vent souffle violemment.", groupe: "violemment", bonne: "avec force", faux: ["le vent", "violent", "la nuit"], raison: "l'adverbe dit la manière ; « violent » qualifierait le nom, ce n'est pas la même place" },
  { phrase: "Ils ont trouvé la réponse.", groupe: "la réponse", bonne: "une solution", faux: ["rapidement", "à la réponse", "ensemble"], raison: "complément direct : ni préposition, ni adverbe" },
  { phrase: "Cette pièce se joue depuis trois mois.", groupe: "depuis trois mois", bonne: "sans interruption", faux: ["trois mois", "au théâtre", "cette pièce"], raison: "le groupe complète la phrase entière ; « trois mois » seul n'a pas la même construction" },
  { phrase: "Le narrateur paraît sincère.", groupe: "sincère", bonne: "troublé", faux: ["un menteur", "souvent", "au lecteur"], raison: "attribut du sujet : un adjectif seul convient" },
  { phrase: "Elle écrit à sa sœur.", groupe: "à sa sœur", bonne: "à ses parents", faux: ["sa sœur", "une lettre", "chaque semaine"], raison: "complément indirect : « une lettre » serait un complément direct" },
];

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

  /* ══════════════ LES SECONDS ITEMS ══════════════ */

  {
    kind: "template",
    id: "2de_acc_commande_gn_tpl_2",
    niveau: "seconde",
    matiere: "francais",
    notionId: "accords_2de",
    microId: "2de_acc_commande_gn",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche d'abord de QUI ou de QUOI on parle. La marque suit, elle ne précède pas.",
    tags: ["seconde", "grammaire", "accords", "groupe nominal", "template"],
    generate: () => {
      const c = randomChoice(INTENTIONS);
      return {
        text: `« ${c.gn} »\n\nOn veut dire que ${c.veut}.\nComment écrire le mot manquant ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Dans un groupe nominal étendu, deux noms peuvent recevoir l'accord : le noyau et son complément. Les deux écritures sont correctes — elles ne disent simplement pas la même chose. L'accord n'est donc pas une décoration : c'est lui qui désigne de quoi on parle.",
          "Pose la question « qui est-ce qui l'est ? ». Le nom qui répond donne le genre et le nombre ; recopie sa marque.",
          `Ici, ${c.raison}.`,
          `On écrit « ${c.bonne} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_acc_sujet_ecran_tpl_2",
    niveau: "seconde",
    matiere: "francais",
    notionId: "accords_2de",
    microId: "2de_acc_sujet_ecran",
    difficulty: 3,
    theme: "neutral",
    hint: "Supprime tout ce qui peut s'enlever sans casser la phrase. Le mot qui reste devant le verbe commande.",
    tags: ["seconde", "grammaire", "accords", "sujet", "suppression", "template"],
    generate: () => {
      const c = randomChoice(COMMANDES);
      return {
        text: `« ${c.phrase} »\n\nQuel mot commande l'accord du verbe ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Entre le sujet et son verbe, la langue glisse volontiers des compléments, des relatives, des appositions. Ces écrans portent souvent un nombre différent de celui du sujet, et c'est là que l'accord se perd. Le noyau du groupe sujet, lui, ne change pas.",
          "Applique la suppression : ôte tout ce qui peut disparaitre sans que la phrase s'écroule. Ce qui résiste devant le verbe est le noyau.",
          `Ici, ${c.raison}.`,
          `C'est « ${c.bonne} » qui commande.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_acc_sujet_difficile_tpl_2",
    niveau: "seconde",
    matiere: "francais",
    notionId: "accords_2de",
    microId: "2de_acc_sujet_difficile",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche le verbe d'abord, puis demande-lui qui fait l'action — même si la réponse est derrière lui.",
    tags: ["seconde", "grammaire", "accords", "relecture", "template"],
    generate: () => {
      const c = randomChoice(FAUTES);
      return {
        text: `« ${c.phrase} »\n\nCette phrase contient une faute d'accord. Quel mot est mal écrit ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Repérer une faute est plus difficile que choisir entre deux formes : rien ne signale où regarder. Les sujets qui trompent sont toujours les mêmes — sujet placé après le verbe, sujets coordonnés de personnes différentes, antécédent de « qui », quantité suivie d'un complément.",
          "Pointe chaque verbe, puis pose-lui la question « qui est-ce qui ? ». Compare la réponse à la terminaison écrite.",
          `Ici, ${c.raison}.`,
          `Il faut écrire « ${c.correct} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_acc_participe_place_tpl_2",
    niveau: "seconde",
    matiere: "francais",
    notionId: "accords_2de",
    microId: "2de_acc_participe_place",
    difficulty: 4,
    theme: "neutral",
    hint: "Regarde uniquement où se trouve le complément direct par rapport au participe. Rien d'autre ne compte.",
    tags: ["seconde", "grammaire", "accords", "participe", "déplacement", "template"],
    generate: () => {
      const c = randomChoice(DEPLACES);
      return {
        text: `« ${c.depart} »\n\nOn récrit la phrase ainsi : « ${c.arrivee} »\nComment s'écrit le participe ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Avec l'auxiliaire avoir, le participe passé ne s'accorde jamais avec le sujet. Il s'accorde avec le complément direct, et à une seule condition : que ce complément soit placé AVANT lui. Déplacer le complément fait donc apparaitre ou disparaitre l'accord, sans qu'aucun autre mot ne bouge.",
          "Repère le complément direct, puis regarde s'il est à gauche ou à droite du participe. À gauche : accord. À droite : rien.",
          `Ici, ${c.raison}.`,
          `On écrit « ${c.bonne} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_acc_homophone_tpl_2",
    niveau: "seconde",
    matiere: "francais",
    notionId: "accords_2de",
    microId: "2de_acc_homophone",
    difficulty: 4,
    theme: "neutral",
    hint: "L'oreille ne sert à rien ici : les formes se prononcent pareil. C'est le sens annoncé qui décide.",
    tags: ["seconde", "grammaire", "accords", "homophones", "template"],
    generate: () => {
      const c = randomChoice(GRAPHIES);
      return {
        text: `« ${c.phrase} »\n\nOn veut dire : ${c.veut}.\nQuelle graphie écrire ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Deux homophones ne se distinguent que par ce qu'ils FONT dans la phrase. Partir du sens voulu supprime le doute : on ne cherche plus quelle forme sonne juste, mais laquelle dit ce qu'on a décidé de dire.",
          "Remplace par une formule qui, elle, ne s'écrit que d'une façon : « ces » par « ces …-là », « ses » par « les siens », « c'est » par « cela est », « leur » par « à eux », « où » par « à quel endroit ».",
          `Ici, ${c.raison}.`,
          `On écrit « ${c.bonne} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_acc_classe_fonction_tpl_2",
    niveau: "seconde",
    matiere: "francais",
    notionId: "accords_2de",
    microId: "2de_acc_classe_fonction",
    difficulty: 3,
    theme: "neutral",
    hint: "Les quatre groupes sont corrects en français. Un seul tient exactement la même place dans la phrase.",
    tags: ["seconde", "grammaire", "fonctions", "commutation", "template"],
    generate: () => {
      const c = randomChoice(COMMUTES);
      return {
        text: `« ${c.phrase} »\n\nPar lequel de ces groupes peut-on remplacer « ${c.groupe} » sans changer sa fonction ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Commuter, c'est remplacer un groupe par un autre à la même place. Si la phrase reste construite pareil, les deux groupes ont la même fonction — et l'on n'a eu besoin d'aucune étiquette pour le savoir. Le programme met cette manipulation en tête de celles qu'il attend au lycée.",
          "Vérifie deux choses : la préposition (« à », « de », ou rien) doit être la même, et le groupe doit répondre à la même question posée au verbe.",
          `Ici, ${c.raison}.`,
          `On peut écrire « ${c.bonne} ».`,
        ),
      };
    },
  },
];
