// lib/tutor-v4/questionBank/seconde/francais/phrase-complexe.bank.ts
//
// LES RELATIONS AU SEIN DE LA PHRASE COMPLEXE — écrit le 14/08/2026.
//
// RÉFÉRENCE : programme de seconde générale et technologique, arrêté du
// 17 janvier 2019 modifié par le JORF du 8 octobre 2020, troisième point de
// l'étude de la langue travaillé DÈS LA CLASSE DE SECONDE :
//   « Les relations au sein de la phrase complexe. L'analyse syntaxique de la
//   phrase complexe, déjà abordée au cycle 4, doit être consolidée et
//   complétée : l'étude des rapports entre les propositions (juxtaposition,
//   coordination, subordination) qui a été menée au collège S'ENRICHIT D'UNE
//   ÉTUDE SÉMANTIQUE DE CES RAPPORTS PERMETTANT DE RENDRE COMPTE AVEC PRÉCISION
//   DE L'INTERPRÉTATION DES TEXTES. »
//
// ⭐⭐ C'EST LA PHRASE QUI SÉPARE LE COLLÈGE DU LYCÉE. Nommer le lien —
// juxtaposition, coordination, subordination — est le travail de la 3e, et il
// est fait. Ici on demande CE QUE LE LIEN VEUT DIRE, et ce que la phrase
// devient quand on le change. Aucune question ne fait nommer un lien : toutes
// font lire un sens ou mesurer un écart.
//
// ⭐ La COMMUTATION est nommée par le programme parmi les manipulations à
// pratiquer (III), et c'est la plus mécanique de toutes : on remplace, on
// relit, on dit ce qui a bougé. Un QCM la tient parfaitement.
//
// ⛔ QCM uniquement, QUATRE propositions.
// ⚠️ AUCUNE LIGNE D'UN MÊME POOL NE S'EMBOITE. « Cause » et « explication »
// se cochent l'une l'autre ; « conséquence » et « but » aussi, puisqu'un but
// est une conséquence voulue. Les six lignes du pool ont donc été récrites pour
// s'exclure deux à deux.
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

type Rapport = { readonly phrase: string; readonly rep: string };
type Ecart = { readonly avant: string; readonly apres: string; readonly rep: string };
type Plan = { readonly phrase: string; readonly rep: string; readonly faux: readonly string[]; readonly raison: string };
type Explicite = { readonly phrase: string; readonly rep: string; readonly faux: readonly string[] };
type Interpretation = { readonly phrase: string; readonly rep: string; readonly faux: readonly string[]; readonly raison: string };

/* Le pool des rapports de sens, commun aux micros 1, 2 et 5.
   ⚠️ Chaque ligne exclut les cinq autres : le résultat n'est pas la cause, le
   moment n'est pas la condition, et l'addition dit explicitement qu'il n'y a
   pas de lien logique. */
const RAPPORTS: readonly string[] = [
  "la seconde donne la cause de la première",
  "la seconde énonce le résultat de la première",
  "la seconde s'oppose à la première",
  "la première pose la condition sans laquelle la seconde n'aurait pas lieu",
  "les deux faits se suivent dans le temps, l'un après l'autre",
  "les deux faits sont simplement ajoutés, sans ordre ni lien logique",
];

/* =============================================================================
   1. CE QUE LA JUXTAPOSITION LAISSE DEVINER  (2de_pc_juxtaposition_sens)
   ---------------------------------------------------------------------------
   Une juxtaposition ne dit rien du lien : elle pose deux propositions côte à
   côte et laisse le lecteur le reconstituer. C'est précisément ce que le
   programme appelle « rendre compte avec précision de l'interprétation ».
   ========================================================================== */

const JUXTAPOSITIONS: readonly Rapport[] = [
  { phrase: "Il pleuvait à verse : nous sommes rentrés.", rep: "la seconde énonce le résultat de la première" },
  { phrase: "Nous sommes rentrés : il pleuvait à verse.", rep: "la seconde donne la cause de la première" },
  { phrase: "Il travaille beaucoup ; ses résultats restent moyens.", rep: "la seconde s'oppose à la première" },
  { phrase: "La cloche sonna ; les élèves sortirent en silence.", rep: "les deux faits se suivent dans le temps, l'un après l'autre" },
  { phrase: "Le vent tomba : la mer redevint lisse.", rep: "la seconde énonce le résultat de la première" },
  { phrase: "Elle ne répond pas : son téléphone est éteint.", rep: "la seconde donne la cause de la première" },
  { phrase: "Il rangea ses affaires, ferma la porte, descendit l'escalier.", rep: "les deux faits se suivent dans le temps, l'un après l'autre" },
  { phrase: "Tout le monde attendait ; personne ne disait rien.", rep: "les deux faits sont simplement ajoutés, sans ordre ni lien logique" },
  { phrase: "La mer était calme ; le ciel restait gris.", rep: "les deux faits sont simplement ajoutés, sans ordre ni lien logique" },
  { phrase: "La salle sentait la craie ; les fenêtres donnaient sur la cour.", rep: "les deux faits sont simplement ajoutés, sans ordre ni lien logique" },
  { phrase: "Il avait tout révisé : il obtint la meilleure note.", rep: "la seconde énonce le résultat de la première" },
  { phrase: "Il obtint la meilleure note : il avait tout révisé.", rep: "la seconde donne la cause de la première" },
  { phrase: "Elle promettait de venir ; elle n'est jamais venue.", rep: "la seconde s'oppose à la première" },
  { phrase: "Le jour se leva ; les oiseaux se turent d'un coup.", rep: "les deux faits se suivent dans le temps, l'un après l'autre" },
  { phrase: "La route est coupée : impossible de passer ce soir.", rep: "la seconde énonce le résultat de la première" },
  { phrase: "Personne ne bougeait : chacun craignait de se tromper.", rep: "la seconde donne la cause de la première" },
  { phrase: "Il parlait fort ; on ne l'écoutait guère.", rep: "la seconde s'oppose à la première" },
  { phrase: "Les volets claquèrent ; l'orage éclata aussitôt après.", rep: "les deux faits se suivent dans le temps, l'un après l'autre" },

  /* ⭐ La juxtaposition peut aussi poser une CONDITION, et c'est son emploi le
     plus frappant : « Un mot de plus, je quitte la salle. » Sans ces cas, la
     ligne de la condition était vue 2 400 fois sans être jamais correcte — un
     distracteur mort. Mesuré le 14/08.
     ⚠️ Noter que la condition est portée par la PREMIÈRE proposition, jamais
     par la seconde : c'est pourquoi cette ligne du pool est la seule à
     commencer par « la première ». */
  { phrase: "Un mot de plus, je quitte la salle.", rep: "la première pose la condition sans laquelle la seconde n'aurait pas lieu" },
  { phrase: "Une minute de retard, la porte se ferme.", rep: "la première pose la condition sans laquelle la seconde n'aurait pas lieu" },
  { phrase: "Encore un effort, tu tiens le bon bout.", rep: "la première pose la condition sans laquelle la seconde n'aurait pas lieu" },
];

/* =============================================================================
   2. CE QUE LE COORDONNANT CHANGE  (2de_pc_coordonnant_sens)
   ---------------------------------------------------------------------------
   Le coordonnant relie — c'est son rôle syntaxique — et il précise ce qui unit
   les deux propositions. Le second rôle change entièrement la phrase, et c'est
   celui-là qu'on interroge.
   ========================================================================== */

const COORDINATIONS: readonly Rapport[] = [
  { phrase: "Il avait tout relu, donc il répondit sans hésiter.", rep: "la seconde énonce le résultat de la première" },
  { phrase: "Il répondit sans hésiter, car il avait tout relu.", rep: "la seconde donne la cause de la première" },
  { phrase: "Le vent soufflait fort, mais la mer restait calme.", rep: "la seconde s'oppose à la première" },
  { phrase: "Elle prit son sac et sortit sans se retourner.", rep: "les deux faits se suivent dans le temps, l'un après l'autre" },
  { phrase: "La salle était pleine, or personne ne s'était inscrit.", rep: "la seconde s'oppose à la première" },
  { phrase: "Il ne restait plus de place, donc nous sommes repartis.", rep: "la seconde énonce le résultat de la première" },
  { phrase: "Nous sommes repartis, car il ne restait plus de place.", rep: "la seconde donne la cause de la première" },
  { phrase: "Elle relut la consigne, puis souligna les mots importants.", rep: "les deux faits se suivent dans le temps, l'un après l'autre" },
  { phrase: "Le vent soufflait et la pluie tombait sans discontinuer.", rep: "les deux faits sont simplement ajoutés, sans ordre ni lien logique" },
  { phrase: "La salle était vaste et les fenêtres donnaient sur la mer.", rep: "les deux faits sont simplement ajoutés, sans ordre ni lien logique" },
  { phrase: "Dépêche-toi, sinon nous partirons sans toi.", rep: "la première pose la condition sans laquelle la seconde n'aurait pas lieu" },
  { phrase: "Travaille régulièrement, et tu verras la différence.", rep: "la première pose la condition sans laquelle la seconde n'aurait pas lieu" },
  { phrase: "Le sujet était difficile, pourtant tous l'ont traité.", rep: "la seconde s'oppose à la première" },
  { phrase: "Il pleuvait depuis trois jours, aussi la rivière avait-elle débordé.", rep: "la seconde énonce le résultat de la première" },
  { phrase: "Le bateau n'est pas sorti, car la houle était trop forte.", rep: "la seconde donne la cause de la première" },
  { phrase: "Il ouvrit le carnet et se mit à écrire.", rep: "les deux faits se suivent dans le temps, l'un après l'autre" },
  { phrase: "Rends ta copie avant midi, ou elle ne sera pas corrigée.", rep: "la première pose la condition sans laquelle la seconde n'aurait pas lieu" },
  { phrase: "La consigne était claire, mais personne ne l'avait lue.", rep: "la seconde s'oppose à la première" },
  { phrase: "Le professeur est absent, donc le cours est reporté.", rep: "la seconde énonce le résultat de la première" },
  { phrase: "Le cours est reporté, car le professeur est absent.", rep: "la seconde donne la cause de la première" },
];

/* =============================================================================
   3. CE QUE LA SUBORDINATION MET AU PREMIER PLAN  (2de_pc_subordination_plan)
   ---------------------------------------------------------------------------
   ⭐ La subordination n'est pas qu'un montage : elle HIÉRARCHISE. Ce qui est
   dans la principale s'affirme ; ce qui passe en subordonnée est reculé,
   présenté comme admis ou comme secondaire. Deux phrases qui contiennent les
   mêmes faits ne disent donc pas la même chose.
   ⭐ Les cas vont par paires : mêmes deux faits, principale et subordonnée
   échangées. Sans les paires, l'élève croirait que le premier fait cité gagne
   toujours.
   ========================================================================== */

const PLANS: readonly Plan[] = [
  {
    phrase: "Bien qu'il pleuve, nous sortirons.",
    rep: "la sortie, présentée comme décidée",
    faux: ["la pluie, présentée comme décisive", "les deux faits à égalité", "la sortie, présentée comme incertaine"],
    raison: "ce qui est dans la principale s'affirme ; la concession recule dans la subordonnée",
  },
  {
    phrase: "Il pleuvra, bien que nous sortions.",
    rep: "la pluie, présentée comme certaine",
    faux: ["la sortie, présentée comme décisive", "les deux faits à égalité", "la pluie, présentée comme improbable"],
    raison: "la principale porte cette fois la pluie : c'est elle qui s'affirme",
  },
  {
    phrase: "Comme la salle était pleine, nous sommes restés debout.",
    rep: "le fait d'être restés debout",
    faux: ["la salle pleine, donnée comme la nouvelle", "les deux faits à égalité", "le fait d'être restés debout, donné comme la cause"],
    raison: "la cause en subordonnée est présentée comme déjà admise ; l'information neuve est dans la principale",
  },
  {
    phrase: "La salle était pleine, si bien que nous sommes restés debout.",
    rep: "la salle pleine, donnée comme le fait de départ",
    faux: ["le fait d'être restés debout, donné comme le point de départ", "les deux faits à égalité", "la salle pleine, donnée comme la conséquence"],
    raison: "la principale porte ici le fait de départ, et la conséquence en découle dans la subordonnée",
  },
  {
    phrase: "Quand la cloche sonna, les élèves rangeaient déjà leurs affaires.",
    rep: "le rangement des affaires",
    faux: ["la sonnerie de la cloche", "les deux faits à égalité", "le rangement, présenté comme une conséquence de la sonnerie"],
    raison: "la subordonnée de temps sert de repère ; la principale porte ce qu'on veut dire",
  },
  {
    phrase: "Les élèves rangeaient leurs affaires quand la cloche sonna.",
    rep: "le rangement des affaires",
    faux: ["la sonnerie de la cloche", "les deux faits à égalité", "le rangement, présenté comme achevé avant la sonnerie"],
    raison: "la principale reste la principale même placée en tête : c'est elle qui porte l'information",
  },
  {
    phrase: "Puisque tout le monde est arrivé, nous pouvons commencer.",
    rep: "la possibilité de commencer",
    faux: ["l'arrivée de tout le monde, donnée comme une nouvelle", "les deux faits à égalité", "la possibilité de commencer, présentée comme incertaine"],
    raison: "« puisque » présente sa cause comme connue des deux interlocuteurs",
  },
  {
    phrase: "Tout le monde est arrivé, donc nous pouvons commencer.",
    rep: "les deux faits à égalité",
    faux: ["l'arrivée de tout le monde seule", "la possibilité de commencer seule", "l'arrivée, présentée comme une condition encore à remplir"],
    raison: "la coordination ne hiérarchise pas : elle laisse les deux propositions sur le même plan",
  },
  {
    phrase: "Si tu pars maintenant, tu arriveras avant la nuit.",
    rep: "l'arrivée avant la nuit",
    faux: ["le départ immédiat, présenté comme acquis", "les deux faits à égalité", "l'arrivée avant la nuit, donnée pour certaine"],
    raison: "la subordonnée pose l'hypothèse ; la principale dit ce qu'on veut faire entendre",
  },
  {
    phrase: "Tu arriveras avant la nuit si tu pars maintenant.",
    rep: "l'arrivée avant la nuit",
    faux: ["le départ immédiat, présenté comme acquis", "les deux faits à égalité", "le départ, mis en avant par sa place en fin de phrase"],
    raison: "déplacer la subordonnée ne change pas la hiérarchie : la principale garde le premier plan",
  },
  {
    phrase: "Alors que tout était prêt, la sortie fut annulée.",
    rep: "l'annulation de la sortie",
    faux: ["les préparatifs, présentés comme l'essentiel", "les deux faits à égalité", "l'annulation, présentée comme prévue de longue date"],
    raison: "la subordonnée d'opposition sert de toile de fond à l'information principale",
  },
  {
    phrase: "Tout était prêt, mais la sortie fut annulée.",
    rep: "les deux faits à égalité",
    faux: ["les préparatifs seuls", "l'annulation seule", "les préparatifs, présentés comme la cause de l'annulation"],
    raison: "la coordination laisse les deux propositions sur le même plan",
  },
  {
    phrase: "Parce qu'il avait tout relu, il répondit sans hésiter.",
    rep: "la réponse sans hésitation",
    faux: ["la relecture, donnée comme la nouvelle", "les deux faits à égalité", "la réponse, présentée comme un coup de chance"],
    raison: "la cause est reculée en subordonnée ; l'effet occupe la principale",
  },
  {
    phrase: "Il avait tout relu, c'est pourquoi il répondit sans hésiter.",
    rep: "les deux faits à égalité",
    faux: ["la relecture seule", "la réponse seule", "la relecture, présentée comme secondaire"],
    raison: "la coordination ne hiérarchise pas",
  },
  {
    phrase: "Même si la mer est agitée, le bateau sortira.",
    rep: "la sortie du bateau",
    faux: ["l'état de la mer, présenté comme décisif", "les deux faits à égalité", "la sortie du bateau, suspendue à l'état de la mer"],
    raison: "la concession recule dans la subordonnée ; la décision s'affirme dans la principale",
  },
  {
    phrase: "La mer sera agitée, même si le bateau sort.",
    rep: "l'état de la mer",
    faux: ["la sortie du bateau, présentée comme décisive", "les deux faits à égalité", "l'état de la mer, présenté comme une conséquence de la sortie"],
    raison: "la principale porte cette fois l'état de la mer",
  },
];

/* =============================================================================
   4. COMMUTER, ET MESURER L'ÉCART  (2de_pc_commuter_liens)
   ---------------------------------------------------------------------------
   ⭐ Le geste central du programme. On donne la phrase, puis sa réécriture, et
   l'on demande ce qui a bougé. La réponse n'est jamais « rien » : changer de
   lien change toujours quelque chose, ne serait-ce que la certitude.
   ========================================================================== */

const ECARTS_POOL: readonly string[] = [
  "elle rend explicite un rapport que la première laissait seulement deviner",
  "elle met les deux faits sur le même plan alors qu'ils étaient hiérarchisés",
  "elle hiérarchise deux faits qui étaient sur le même plan",
  "elle change le fait mis au premier plan",
  "elle transforme la cause en simple succession dans le temps",
  "elle affaiblit le lien : ce qui était donné pour certain devient une hypothèse",
];

const ECARTS: readonly Ecart[] = [
  { avant: "Il pleuvait à verse : nous sommes rentrés.", apres: "Comme il pleuvait à verse, nous sommes rentrés.", rep: "elle rend explicite un rapport que la première laissait seulement deviner" },
  { avant: "Comme il pleuvait, nous sommes rentrés.", apres: "Il pleuvait, donc nous sommes rentrés.", rep: "elle met les deux faits sur le même plan alors qu'ils étaient hiérarchisés" },
  { avant: "Il pleuvait, et nous sommes rentrés.", apres: "Parce qu'il pleuvait, nous sommes rentrés.", rep: "elle hiérarchise deux faits qui étaient sur le même plan" },
  { avant: "Bien qu'il pleuve, nous sortirons.", apres: "Il pleuvra, bien que nous sortions.", rep: "elle change le fait mis au premier plan" },
  { avant: "Puisque la mer était calme, ils sont sortis.", apres: "Quand la mer fut calme, ils sont sortis.", rep: "elle transforme la cause en simple succession dans le temps" },
  { avant: "Comme tu pars maintenant, tu arriveras avant la nuit.", apres: "Si tu pars maintenant, tu arriveras avant la nuit.", rep: "elle affaiblit le lien : ce qui était donné pour certain devient une hypothèse" },
  { avant: "La salle était pleine ; nous sommes restés debout.", apres: "La salle était pleine, si bien que nous sommes restés debout.", rep: "elle rend explicite un rapport que la première laissait seulement deviner" },
  { avant: "Alors que tout était prêt, la sortie fut annulée.", apres: "Tout était prêt, mais la sortie fut annulée.", rep: "elle met les deux faits sur le même plan alors qu'ils étaient hiérarchisés" },
  { avant: "Il rangea ses affaires et sortit.", apres: "Après avoir rangé ses affaires, il sortit.", rep: "elle hiérarchise deux faits qui étaient sur le même plan" },
  { avant: "Comme la salle était pleine, nous sommes restés debout.", apres: "La salle était pleine, si bien que nous sommes restés debout.", rep: "elle change le fait mis au premier plan" },
  { avant: "Parce que le vent tomba, la mer redevint lisse.", apres: "Dès que le vent tomba, la mer redevint lisse.", rep: "elle transforme la cause en simple succession dans le temps" },
  { avant: "Puisqu'il a tout révisé, il réussira.", apres: "S'il a tout révisé, il réussira.", rep: "elle affaiblit le lien : ce qui était donné pour certain devient une hypothèse" },
  { avant: "Elle ne répond pas : son téléphone est éteint.", apres: "Elle ne répond pas, car son téléphone est éteint.", rep: "elle rend explicite un rapport que la première laissait seulement deviner" },
  { avant: "Bien que la mer soit agitée, le bateau sortira.", apres: "La mer est agitée, mais le bateau sortira.", rep: "elle met les deux faits sur le même plan alors qu'ils étaient hiérarchisés" },
  { avant: "La cloche sonna ; les élèves sortirent.", apres: "Quand la cloche sonna, les élèves sortirent.", rep: "elle hiérarchise deux faits qui étaient sur le même plan" },
  { avant: "Comme le jury avait délibéré, les résultats furent affichés.", apres: "Une fois que le jury eut délibéré, les résultats furent affichés.", rep: "elle transforme la cause en simple succession dans le temps" },
];

/* =============================================================================
   5. RENDRE EXPLICITE  (2de_pc_expliciter_implicite)
   ---------------------------------------------------------------------------
   L'inverse de la commutation : la phrase laisse le lien à deviner, et l'on
   demande par quel mot on le dirait. C'est l'exercice de reformulation nommé
   au IV du programme.
   ========================================================================== */

const OUTILS: readonly string[] = ["parce que", "si bien que", "alors que", "si", "quand", "afin que"];

const EXPLICITATIONS: readonly Explicite[] = [
  { phrase: "Personne ne bougeait : chacun craignait de se tromper.", rep: "parce que", faux: ["si bien que", "alors que", "afin que"] },
  { phrase: "Le vent tomba : la mer redevint lisse.", rep: "si bien que", faux: ["parce que", "alors que", "afin que"] },
  { phrase: "Il travaille beaucoup ; ses résultats restent moyens.", rep: "alors que", faux: ["parce que", "si bien que", "afin que"] },
  { phrase: "Pars maintenant, tu arriveras avant la nuit.", rep: "si", faux: ["parce que", "alors que", "afin que"] },
  { phrase: "La cloche sonna ; les élèves sortirent aussitôt.", rep: "quand", faux: ["parce que", "alors que", "afin que"] },
  { phrase: "Il a répété la consigne : tous devaient la comprendre.", rep: "afin que", faux: ["si bien que", "alors que", "quand"] },
  { phrase: "La route est coupée : impossible de passer ce soir.", rep: "si bien que", faux: ["parce que", "alors que", "afin que"] },
  { phrase: "Elle ne répond pas : son téléphone est éteint.", rep: "parce que", faux: ["si bien que", "alors que", "afin que"] },
  { phrase: "Il promettait de venir ; il n'est jamais venu.", rep: "alors que", faux: ["parce que", "si bien que", "afin que"] },
  { phrase: "Le jour se leva ; les oiseaux se turent.", rep: "quand", faux: ["parce que", "alors que", "afin que"] },
  { phrase: "Relis ta copie, tu verras tes fautes.", rep: "si", faux: ["parce que", "alors que", "afin que"] },
  { phrase: "Il a fermé les volets : personne ne devait voir la lumière.", rep: "afin que", faux: ["si bien que", "alors que", "quand"] },
  { phrase: "La houle était trop forte : le bateau n'est pas sorti.", rep: "si bien que", faux: ["parce que", "alors que", "afin que"] },
  { phrase: "Le bateau n'est pas sorti : la houle était trop forte.", rep: "parce que", faux: ["si bien que", "alors que", "afin que"] },
  { phrase: "La consigne était claire ; personne ne l'avait lue.", rep: "alors que", faux: ["parce que", "si bien que", "afin que"] },
  { phrase: "L'orage éclata ; nous étions déjà rentrés.", rep: "quand", faux: ["parce que", "alors que", "afin que"] },
];

/* =============================================================================
   6. LE LIEN DÉCIDE DE L'INTERPRÉTATION  (2de_pc_interpreter_texte)
   ---------------------------------------------------------------------------
   ⭐ Le point d'arrivée du programme : « rendre compte avec précision de
   l'interprétation des textes ». Deux phrases contiennent les mêmes faits ;
   seul le lien change, et le sens du texte bascule. C'est ici que la grammaire
   devient de la lecture.
   ========================================================================== */

const INTERPRETATIONS: readonly Interpretation[] = [
  {
    phrase: "Il a démissionné parce que le rapport a été publié.",
    rep: "la publication a provoqué la démission",
    faux: ["la démission a provoqué la publication", "les deux faits n'ont aucun rapport entre eux", "la démission a eu lieu avant la publication"],
    raison: "« parce que » désigne explicitement la cause, et c'est la publication",
  },
  {
    phrase: "Le rapport a été publié parce qu'il a démissionné.",
    rep: "la démission a provoqué la publication",
    faux: ["la publication a provoqué la démission", "les deux faits n'ont aucun rapport entre eux", "la publication a eu lieu avant la démission"],
    raison: "la cause a changé de place : c'est maintenant la démission",
  },
  {
    phrase: "Il a démissionné quand le rapport a été publié.",
    rep: "les deux faits se sont suivis, sans que la phrase dise lequel a causé l'autre",
    faux: ["la publication a provoqué la démission", "la démission a provoqué la publication", "les deux faits n'ont aucun rapport entre eux"],
    raison: "« quand » ne marque que le moment : l'enchainement reste à interpréter",
  },
  {
    phrase: "Il a démissionné bien que le rapport ait été publié.",
    rep: "la publication aurait dû empêcher la démission, et ne l'a pas empêchée",
    faux: ["la publication a provoqué la démission", "les deux faits se sont produits en même temps par hasard", "la démission a empêché la publication"],
    raison: "la concession pose un obstacle qui n'a pas joué",
  },
  {
    phrase: "La sortie est maintenue si la mer se calme.",
    rep: "la sortie n'est pas encore décidée : elle dépend de la mer",
    faux: ["la sortie est décidée, quel que soit l'état de la mer", "la mer s'est déjà calmée", "la sortie a été annulée"],
    raison: "« si » suspend le fait à une condition non encore réalisée",
  },
  {
    phrase: "La sortie est maintenue même si la mer ne se calme pas.",
    rep: "la sortie est décidée, quel que soit l'état de la mer",
    faux: ["la sortie dépend encore de l'état de la mer", "la mer s'est déjà calmée", "la sortie a été annulée"],
    raison: "la concession lève la condition au lieu de la poser",
  },
  {
    phrase: "Il est parti puisque la salle était fermée.",
    rep: "la fermeture est présentée comme connue de tous",
    faux: ["la fermeture est une information nouvelle", "la fermeture est mise en doute", "la fermeture a suivi le départ"],
    raison: "« puisque » invoque une cause déjà admise, contrairement à « parce que »",
  },
  {
    phrase: "Il est parti parce que la salle était fermée.",
    rep: "la fermeture est donnée comme l'explication du départ",
    faux: ["la fermeture est présentée comme déjà connue de tous", "la fermeture est mise en doute", "la fermeture a suivi le départ"],
    raison: "« parce que » apporte la cause comme une information",
  },
  {
    phrase: "Le témoin affirme avoir vu la voiture alors qu'il faisait nuit.",
    rep: "l'obscurité est présentée comme un obstacle à ce témoignage",
    faux: ["l'obscurité confirme le témoignage", "l'obscurité est sans rapport avec le témoignage", "le témoin a vu la voiture après la nuit"],
    raison: "« alors que » oppose : il souligne ce qui rend le fait douteux",
  },
  {
    phrase: "Le témoin affirme avoir vu la voiture quand il faisait nuit.",
    rep: "l'obscurité est donnée comme un simple repère de moment",
    faux: ["l'obscurité est présentée comme un obstacle", "l'obscurité confirme le témoignage", "le témoin a vu la voiture après la nuit"],
    raison: "« quand » situe, il ne juge pas",
  },
  {
    phrase: "Les travaux ont commencé sans que les riverains soient prévenus.",
    rep: "l'absence d'information est présentée comme une anomalie",
    faux: ["les riverains ont été prévenus en retard", "les riverains ont demandé les travaux", "les travaux ont été suspendus"],
    raison: "« sans que » signale ce qui manque, et le signale comme fautif",
  },
  {
    phrase: "Les travaux ont commencé avant que les riverains soient prévenus.",
    rep: "l'information est venue, mais après le début des travaux",
    faux: ["les riverains n'ont jamais été prévenus", "les riverains ont demandé les travaux", "les travaux ont été suspendus"],
    raison: "« avant que » ordonne dans le temps : l'information a bien eu lieu",
  },
  {
    phrase: "Il a répondu si vite que personne n'a compris la question.",
    rep: "la rapidité a eu pour effet l'incompréhension",
    faux: ["l'incompréhension a rendu la réponse rapide", "les deux faits sont sans rapport", "la question n'a jamais été posée"],
    raison: "« si… que » exprime une conséquence tirée d'un degré",
  },
  {
    phrase: "Il a répondu vite pour que personne ne comprenne la question.",
    rep: "l'incompréhension était le but recherché",
    faux: ["l'incompréhension est un effet qu'il n'avait pas prévu", "les deux faits sont sans rapport", "la question n'a jamais été posée"],
    raison: "« pour que » exprime un but voulu, non un simple résultat",
  },
  {
    phrase: "Le projet a été voté, alors que le rapport n'était pas terminé.",
    rep: "le vote est présenté comme prématuré",
    faux: ["le rapport a permis le vote", "le rapport a été terminé juste avant le vote", "le projet a été rejeté"],
    raison: "l'opposition souligne la contradiction entre les deux faits",
  },
  {
    phrase: "Le projet a été voté après que le rapport a été terminé.",
    rep: "le vote a suivi l'achèvement du rapport",
    faux: ["le vote est présenté comme prématuré", "le rapport n'a jamais été terminé", "le projet a été rejeté"],
    raison: "la subordonnée de temps se contente d'ordonner les faits",
  },

  /* ⚠️ QUATRE CAS À BONNE RÉPONSE COURTE, ajoutés le 14/08 après mesure. Les
     lectures justes demandent souvent une phrase nuancée, et la bonne réponse
     se trouvait être la plus longue des quatre dans 76 % des tirages : on
     pouvait la cocher à la taille. Ici, ce sont les LECTURES FAUSSES qui
     s'étendent, parce qu'elles ajoutent ce que la phrase ne dit pas. */
  {
    phrase: "Le maire a démissionné après la publication du rapport.",
    rep: "la démission a suivi la publication",
    faux: [
      "la publication du rapport a directement provoqué la démission du maire",
      "le maire a démissionné dans le but d'empêcher la publication du rapport",
      "la démission et la publication se sont produites le même jour par coïncidence",
    ],
    raison: "« après » n'ordonne que dans le temps : il ne dit rien de la cause",
  },
  {
    phrase: "Les élèves sont sortis dès que la cloche a sonné.",
    rep: "la sortie a immédiatement suivi la sonnerie",
    faux: [
      "les élèves sont sortis parce qu'ils avaient terminé leur travail avant tout le monde",
      "la cloche a sonné une seconde fois pour rappeler les élèves restés dans la salle",
      "les élèves attendaient depuis longtemps la permission de quitter la salle de classe",
    ],
    raison: "« dès que » marque l'immédiateté de la succession, rien d'autre",
  },
  {
    phrase: "Il a signé sans avoir lu le contrat.",
    rep: "il a signé, et il n'avait pas lu",
    faux: [
      "il a lu le contrat en entier avant d'accepter d'y apposer sa signature",
      "il a refusé de signer tant qu'on ne lui aurait pas laissé lire le contrat",
      "il a lu le contrat après l'avoir signé, et il l'a aussitôt regretté",
    ],
    raison: "« sans » nie purement et simplement la lecture, sans rien ajouter",
  },
  {
    phrase: "La salle a été fermée pour que les travaux commencent.",
    rep: "la fermeture visait à permettre les travaux",
    faux: [
      "les travaux ont commencé sans que personne ait décidé de fermer la salle",
      "la fermeture de la salle a été rendue nécessaire par des travaux déjà commencés",
      "les travaux et la fermeture ont été décidés par deux services différents",
    ],
    raison: "« pour que » exprime un but voulu, non un effet subi",
  },
  {
    phrase: "Il est revenu avant que la nuit tombe.",
    rep: "il est revenu, la nuit n'était pas tombée",
    faux: [
      "il est revenu juste au moment où la nuit achevait de tomber sur la baie",
      "il a attendu que la nuit soit tombée pour se décider enfin à revenir",
      "il n'est pas revenu du tout, la nuit l'ayant surpris en chemin",
    ],
    raison: "« avant que » place le retour du côté du jour, sans autre commentaire",
  },
  {
    phrase: "Elle a répondu bien qu'on ne lui ait rien demandé.",
    rep: "elle a répondu sans qu'on l'interroge",
    faux: [
      "elle a répondu à une question qu'on venait précisément de lui poser",
      "elle a refusé de répondre tant qu'on ne lui aurait rien demandé",
      "on lui a demandé de répondre, et elle a mis du temps à le faire",
    ],
    raison: "la concession dit que la réponse est venue malgré l'absence de question",
  },
  {
    phrase: "La route sera fermée tant que durera le chantier.",
    rep: "la fermeture durera autant que le chantier",
    faux: [
      "la route sera rouverte bien avant que le chantier ne soit terminé",
      "le chantier a été lancé parce que la route était déjà fermée",
      "la route sera fermée une fois seulement que le chantier sera achevé",
    ],
    raison: "« tant que » fait coïncider les deux durées, du début à la fin",
  },
];

export const phraseComplexeSecondeBank: TutorBankItemV4[] = [
  {
    kind: "template",
    id: "2de_pc_juxtaposition_sens_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "phrase_complexe_2de",
    microId: "2de_pc_juxtaposition_sens",
    difficulty: 2,
    theme: "neutral",
    hint: "Aucun mot ne dit le lien : c'est à toi de le reconstituer. Essaie d'intercaler « parce que », puis « donc », et vois lequel tient.",
    tags: ["seconde", "grammaire", "phrase complexe", "juxtaposition", "template"],
    generate: () => {
      const c = randomChoice(JUXTAPOSITIONS);
      return {
        text: `« ${c.phrase} »\n\nQuel rapport de sens la juxtaposition laisse-t-elle deviner ?`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, RAPPORTS),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Juxtaposer, c'est poser deux propositions côte à côte sans dire ce qui les unit. Le lien n'a pas disparu : il est laissé au lecteur, qui le reconstitue d'après le sens. C'est une des façons dont un texte se fait interpréter.",
          "Essaie d'intercaler un mot de liaison : « parce que », « donc », « mais », « quand ». Un seul rend la phrase naturelle : c'est celui-là que la juxtaposition suggérait.",
          `Ici, ${c.rep}.`,
          `${c.rep.charAt(0).toUpperCase()}${c.rep.slice(1)}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_pc_coordonnant_sens_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "phrase_complexe_2de",
    microId: "2de_pc_coordonnant_sens",
    difficulty: 2,
    theme: "neutral",
    hint: "Le mot de liaison relie, mais il dit aussi quelque chose. C'est ce quelque chose qu'on cherche.",
    tags: ["seconde", "grammaire", "phrase complexe", "coordination", "template"],
    generate: () => {
      const c = randomChoice(COORDINATIONS);
      return {
        text: `« ${c.phrase} »\n\nQuel rapport de sens le mot de liaison établit-il ?`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, RAPPORTS),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un coordonnant fait deux choses à la fois : il relie deux propositions de même rang, et il précise ce qui les unit. Remplacer « donc » par « car » ne réorganise pas la phrase — cela renverse ce qu'elle affirme.",
          "Remplace le mot par un autre coordonnant et relis : si le sens bascule, c'est que le mot portait ce sens-là.",
          `Ici, ${c.rep}.`,
          `${c.rep.charAt(0).toUpperCase()}${c.rep.slice(1)}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_pc_subordination_plan_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "phrase_complexe_2de",
    microId: "2de_pc_subordination_plan",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche la proposition qui pourrait tenir seule : c'est elle qui porte ce que la phrase veut faire entendre.",
    tags: ["seconde", "grammaire", "phrase complexe", "subordination", "template"],
    generate: () => {
      const c = randomChoice(PLANS);
      return {
        text: `« ${c.phrase} »\n\nQu'est-ce que la phrase met au premier plan ?`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, c.faux),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La subordination hiérarchise. Ce qui est dans la principale s'affirme ; ce qui passe en subordonnée est reculé, présenté comme admis, comme secondaire ou comme un simple repère. La coordination, elle, ne hiérarchise pas : elle laisse les deux propositions à égalité.",
          "Supprime la subordonnée : si la phrase tient encore debout et garde son message, c'est que le premier plan était bien dans la principale.",
          `Ici, ${c.raison}.`,
          `La phrase met en avant ${c.rep}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_pc_commuter_liens_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "phrase_complexe_2de",
    microId: "2de_pc_commuter_liens",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare les deux phrases mot à mot. Les faits sont les mêmes : c'est leur mise en scène qui a changé.",
    tags: ["seconde", "grammaire", "phrase complexe", "commutation", "template"],
    generate: () => {
      const c = randomChoice(ECARTS);
      return {
        text: `Phrase de départ : « ${c.avant} »\nRéécriture : « ${c.apres} »\n\nQu'est-ce que la réécriture change ?`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, ECARTS_POOL),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Commuter, c'est remplacer un élément par un autre pour voir ce qui bouge. Le programme de lycée nomme cette manipulation parmi celles qu'il faut pratiquer. Appliquée aux liens entre propositions, elle montre qu'un même contenu peut être hiérarchisé, mis à plat, rendu certain ou rendu hypothétique.",
          "Vérifie d'abord que les faits sont identiques dans les deux phrases. Ce qui reste différent, c'est la réponse.",
          `Ici, ${c.rep}.`,
          `${c.rep.charAt(0).toUpperCase()}${c.rep.slice(1)}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_pc_expliciter_implicite_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "phrase_complexe_2de",
    microId: "2de_pc_expliciter_implicite",
    difficulty: 2,
    theme: "neutral",
    hint: "Un seul de ces mots rend la phrase naturelle. Essaie-les tous à voix basse.",
    tags: ["seconde", "grammaire", "phrase complexe", "reformulation", "template"],
    generate: () => {
      const c = randomChoice(EXPLICITATIONS);
      return {
        text: `« ${c.phrase} »\n\nPar quel mot rendrait-on le lien explicite ?`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, [...c.faux, ...OUTILS]),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Rendre explicite un rapport laissé implicite est l'un des exercices de reformulation que le programme demande. Le lien existait déjà dans la phrase : on ne l'invente pas, on le nomme.",
          "Récris la phrase avec chaque mot proposé et relis-la. Un seul donne une phrase à la fois correcte et fidèle au sens de départ.",
          `Ici, on écrirait : « ${c.rep} … ».`,
          `Le mot attendu est « ${c.rep} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_pc_interpreter_texte_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "phrase_complexe_2de",
    microId: "2de_pc_interpreter_texte",
    difficulty: 3,
    theme: "neutral",
    hint: "Les faits sont les mêmes dans toutes les réponses. Seul le lien tranche entre elles.",
    tags: ["seconde", "grammaire", "phrase complexe", "interprétation", "template"],
    generate: () => {
      const c = randomChoice(INTERPRETATIONS);
      return {
        text: `« ${c.phrase} »\n\nQue faut-il comprendre exactement ?`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, c.faux),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "C'est le point d'arrivée du programme : la grammaire de la phrase complexe sert à lire. Deux phrases qui contiennent les mêmes faits ne disent pas la même chose si le lien change — et dans un article, un discours ou un témoignage, cette différence décide de ce qu'on a le droit de conclure.",
          "Repère le mot qui lie, puis demande-toi ce qu'il autorise à affirmer. Ne complète jamais avec ce que la phrase ne dit pas.",
          `Ici, ${c.raison}.`,
          `Il faut comprendre que ${c.rep}.`,
        ),
      };
    },
  },
];
