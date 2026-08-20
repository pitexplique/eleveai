// lib/tutor-v4/questionBank/cp/francais/oral-et-lecteur.bank.ts
//
// Les trois dernières notions du CP : le LANGAGE ORAL, la LECTURE À VOIX HAUTE
// et DEVENIR LECTEUR. Regroupées parce qu'elles partagent la même difficulté —
// elles se jouent d'abord dans la classe, à voix haute, et le coach ne peut en
// travailler que la part qui se réfléchit.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   ORAL — « Comprendre un message entendu de quelques minutes et mémoriser
//   quelques informations importantes » ; « Il réalise l'action demandée par un
//   discours injonctif : consigne, recette de cuisine, notice de montage, règle
//   du jeu » ; « Mener une brève production orale pour rapporter, raconter,
//   décrire ou expliquer, en utilisant quelques organisateurs du discours » —
//   le BO nomme les siens : parce que, alors, ensuite ; « S'écouter pour
//   progresser et proposer des reformulations » ; « Participer aux échanges en
//   respectant les règles, en écoutant les autres et en donnant son avis » ;
//   « Prendre conscience des écarts de niveau de langue selon les situations » —
//   « Il mesure que l'on ne parle pas de la même manière en classe et dans la
//   cour. »
//   VOIX HAUTE — « Identifier les marques de ponctuation et les prendre en
//   compte sur un texte préparé » ; « il repère les groupes de mots qui doivent
//   être lus ensemble en s'appuyant sur le sens et la chaine d'accords » ;
//   « Amorcer une lecture expressive » ; « Après préparation, il modifie sa voix
//   pour faire parler tel ou tel personnage » ; « Lire après préparation un
//   texte adapté à son niveau de lecture avec une vitesse de 30 mots par minute
//   au minimum sans préparation, 50 après préparation. »
//   DEVENIR LECTEUR — les CINQ objectifs : « Lire 5 à 10 œuvres complètes et
//   variées issues du patrimoine et de la littérature de jeunesse (albums,
//   romans, contes, fables, poèmes, pièces de théâtre et documentaires) » ;
//   « Repérer et reconnaitre des types de personnages » ; « Aller vers les
//   livres et être capable d'en choisir à titre personnel » ; « Relier ses
//   lectures à son expérience personnelle, être en mesure d'établir des liens
//   entre ses différentes lectures (mise en réseau) » ; « Fréquenter
//   régulièrement des lieux de lecture et se familiariser avec eux, rencontrer
//   des acteurs du livre ». Plus l'exemple de réussite « Il différencie le type
//   narratif du type informatif ».
//
// ⚠️ CE QUE LE COACH NE PEUT PAS FAIRE, et qu'il ne prétend pas faire : il
// n'entend pas l'élève. La fluence se mesure au chronomètre par le professeur,
// l'articulation s'écoute, et le respect des règles d'échange se vit à
// plusieurs. Ce qui est ici, c'est ce qui se RÉFLÉCHIT : où s'arrête la voix,
// quel mot enchaine deux idées, pourquoi on ne parle pas pareil en classe et
// dans la cour — et, pour le repère chiffré, savoir ce que veulent dire ces
// 30 mots par minute et où l'on en est par rapport à eux.
//
// ⚠️ Tables typées à la main, jamais en `as const` : leurs champs se comparent
// entre eux, et des types littéraux font casser le build à la compilation sans
// que `verifier-generateurs.mjs` n'y voie rien.

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

type Consigne = { readonly consigne: string; readonly action: string; readonly faux: readonly string[] };
type Message = { readonly texte: string; readonly info: string; readonly faux: readonly string[] };
type Reformulation = { readonly phrase: string; readonly bonne: string; readonly faux: readonly string[] };
type Connecteur = { readonly debut: string; readonly suite: string; readonly mot: string; readonly role: string };
type Registre = { readonly cour: string; readonly classe: string };
type PhraseVoix = { readonly phrase: string; readonly signe: string; readonly voix: string };
type Groupes = { readonly phrase: string; readonly decoupe: string; readonly faux: readonly string[] };
type Personnage = { readonly type: string; readonly indices: string; readonly faux: readonly string[] };
type SorteLivre = { readonly sorte: string; readonly indice: string };
type Gout = { readonly prenom: string; readonly gout: string; readonly livre: string };
type Paire = { readonly a: string; readonly b: string; readonly commun: string; readonly faux: readonly string[] };
type Lieu = { readonly situation: string; readonly bon: string; readonly faux: readonly string[] };
type Vitesse = { readonly prenom: string; readonly mots: number };

const CONSIGNES: readonly Consigne[] = [
  { consigne: "Entoure le mot le plus long.", action: "on entoure un mot", faux: ["on souligne une phrase", "on recopie tout", "on colorie le dessin"] },
  { consigne: "Souligne le verbe en rouge.", action: "on trace un trait sous le verbe", faux: ["on entoure le verbe", "on efface le verbe", "on écrit le verbe deux fois"] },
  { consigne: "Colorie en bleu les mots qui riment.", action: "on met de la couleur sur certains mots", faux: ["on découpe les mots", "on compte les mots", "on efface les mots"] },
  { consigne: "Recopie la phrase en cursive.", action: "on écrit la phrase en attaché", faux: ["on lit la phrase à voix haute", "on dessine la phrase", "on apprend la phrase par cœur"] },
  { consigne: "Barre l'intrus de chaque liste.", action: "on trace un trait sur le mot qui ne va pas", faux: ["on entoure toute la liste", "on ajoute un mot", "on range la liste"] },
  { consigne: "Range ces mots dans l'ordre alphabétique.", action: "on les recopie de a à z", faux: ["on les compte", "on les colorie", "on garde le premier"] },
  { consigne: "Complète la phrase avec le mot qui manque.", action: "on écrit un mot dans le trou", faux: ["on efface la phrase", "on recopie la phrase telle quelle", "on invente une autre phrase"] },
  { consigne: "Relie chaque mot à son dessin.", action: "on trace un trait entre les deux", faux: ["on entoure les dessins", "on recopie les mots", "on découpe les dessins"] },
  { consigne: "Coche la bonne réponse.", action: "on met une croix dans la case", faux: ["on écrit la réponse", "on efface les cases", "on colorie toutes les cases"] },
  { consigne: "Découpe les étiquettes puis colle-les dans l'ordre.", action: "on découpe, puis on colle", faux: ["on colle sans découper", "on découpe et on jette", "on recopie les étiquettes"] },
  { consigne: "Écris la date en haut de la page.", action: "on écrit la date tout en haut", faux: ["on écrit la date en bas", "on entoure la date", "on lit la date"] },
  { consigne: "Compte les syllabes et écris le nombre.", action: "on compte, puis on écrit un chiffre", faux: ["on écrit les syllabes", "on entoure le mot", "on lit le mot deux fois"] },
  { consigne: "Trace un trait sous les noms.", action: "on souligne les noms", faux: ["on entoure les noms", "on barre les noms", "on recopie les noms"] },
  { consigne: "Colle ta feuille dans ton cahier.", action: "on met de la colle et on la fixe dans le cahier", faux: ["on plie la feuille", "on range la feuille dans le sac", "on donne la feuille au voisin"] },
];

const MESSAGES: readonly Message[] = [
  {
    texte: "Demain, apportez vos bottes et un chapeau : nous partons voir le lagon. Le bus part à huit heures.",
    info: "il faut apporter des bottes et un chapeau",
    faux: ["il faut apporter un cahier", "on part la semaine prochaine", "on reste à l'école"],
  },
  {
    texte: "Pour faire un gâteau, il faut d'abord casser les œufs, puis ajouter le sucre, et enfin mélanger.",
    info: "on casse les œufs en premier",
    faux: ["on mélange en premier", "on ajoute le sucre en premier", "il n'y a pas d'ordre"],
  },
  {
    texte: "Le jeu commence quand tout le monde a une carte. On joue chacun son tour. Celui qui n'a plus de carte a gagné.",
    info: "on gagne quand on n'a plus de carte",
    faux: ["on gagne quand on a le plus de cartes", "on joue tous en même temps", "le jeu commence sans cartes"],
  },
  {
    texte: "La récréation est plus courte aujourd'hui. Rangez vos affaires avant de sortir et mettez votre chapeau.",
    info: "il faut ranger ses affaires avant de sortir",
    faux: ["la récréation est plus longue", "on sort sans rien faire", "on garde ses affaires sur la table"],
  },
  {
    texte: "Pour la sortie au marché, on part à neuf heures. Prenez un sac et de quoi écrire.",
    info: "il faut prendre un sac et de quoi écrire",
    faux: ["il faut prendre de l'argent", "on part à midi", "on reste en classe"],
  },
  {
    texte: "La bibliothèque ferme à quatre heures. Rendez vos livres avant, sinon vous devrez attendre lundi.",
    info: "il faut rendre les livres avant quatre heures",
    faux: ["la bibliothèque ouvre à quatre heures", "on peut rendre les livres dimanche", "on garde les livres"],
  },
  {
    texte: "Le maitre a dit : d'abord on lit le texte, ensuite on répond aux questions, et seulement après on colorie.",
    info: "on lit le texte avant de répondre",
    faux: ["on colorie en premier", "on répond avant de lire", "l'ordre ne compte pas"],
  },
  {
    texte: "Il pleuvra cet après-midi. La sortie au piton est reportée à jeudi.",
    info: "la sortie est reportée à jeudi",
    faux: ["la sortie a lieu cet après-midi", "la sortie est annulée pour toujours", "il fera beau"],
  },
  {
    texte: "Pour planter la graine, il faut creuser un petit trou, poser la graine dedans, puis reboucher et arroser.",
    info: "on arrose après avoir rebouché",
    faux: ["on arrose avant de creuser", "on ne rebouche pas", "on pose la graine sur la terre"],
  },
  {
    texte: "Demain, on fait la photo de classe. Venez coiffés et n'oubliez pas de sourire.",
    info: "la photo de classe est demain",
    faux: ["la photo était hier", "il n'y a pas de photo", "il faut apporter un appareil photo"],
  },
];

const REFORMULATIONS: readonly Reformulation[] = [
  /* ⚠️ LES LEURRES ONT ÉTÉ RÉÉCRITS LE 18/08/2026, ET LA RAISON VAUT POUR TOUTE
     TABLE DE REFORMULATION. Une reformulation fidèle est forcément un peu
     longue — elle redit tout — tandis qu'un leurre faux se dit en cinq mots
     (« Le margouillat a mangé deux pierres »). Résultat mesuré : +22 caractères
     d'avance à la bonne réponse, qui se cochait sans lire.
     ⭐ Le remède rend l'exercice MEILLEUR : au lieu d'absurdités qu'on écarte
     sans comprendre, les leurres sont maintenant de vraies reformulations qui
     changent un détail — le lieu, le moment, qui fait quoi. Il faut avoir
     compris la phrase de départ pour les écarter. */
  {
    phrase: "Le margouillat s'est faufilé entre deux pierres et a disparu.",
    bonne: "Le margouillat est passé entre les pierres et on ne le voit plus.",
    faux: ["Le margouillat a poussé les pierres et il est resté là.", "Le margouillat est monté sur les pierres et on le voit bien.", "Le margouillat s'est arrêté devant les pierres sans passer."],
  },
  {
    phrase: "Léa a rangé toutes ses affaires avant de partir.",
    bonne: "Léa a tout rangé, puis elle est partie.",
    faux: ["Léa est partie, puis elle a tout rangé.", "Léa a rangé une partie de ses affaires.", "Léa a rangé les affaires des autres."],
  },
  {
    phrase: "Papa a mis la marmite sur le feu et l'odeur du cari a rempli la case.",
    bonne: "Papa fait cuire le cari et ça sent bon partout dans la case.",
    faux: ["Papa a retiré la marmite du feu et l'odeur est partie.", "Papa fait cuire le cari dehors et la case ne sent rien.", "Papa a posé la marmite froide et personne ne sent rien."],
  },
  {
    phrase: "Le bateau a quitté le port au lever du jour.",
    bonne: "Le bateau est parti tôt le matin.",
    faux: ["Le bateau est arrivé tôt le matin.", "Le bateau est parti tard le soir.", "Le bateau est resté au port toute la journée."],
  },
  {
    phrase: "Les élèves ont regagné la salle dès que la cloche a retenti.",
    bonne: "Les élèves sont rentrés en classe quand la cloche a sonné.",
    faux: ["Les élèves sont sortis de la classe quand la cloche a sonné.", "Les élèves sont rentrés en classe avant que la cloche sonne.", "Les élèves ont attendu longtemps après la sonnerie pour rentrer."],
  },
  {
    phrase: "Le vent s'est levé et les nuages ont recouvert le piton.",
    bonne: "Il y a du vent et on ne voit plus le piton.",
    faux: ["Il y a du vent et on voit le piton très bien.", "Le vent est tombé et les nuages sont partis.", "Il n'y a pas de vent et le piton est caché."],
  },
  {
    phrase: "Tom a réussi son exercice du premier coup.",
    bonne: "Tom a trouvé la réponse tout de suite.",
    faux: ["Tom a trouvé la réponse après plusieurs essais.", "Tom a réussi le premier exercice sur deux.", "Tom a trouvé la réponse tout seul, mais très tard."],
  },
  {
    phrase: "La maitresse a distribué les cahiers avant de commencer la leçon.",
    bonne: "La maitresse a donné les cahiers, puis la leçon a commencé.",
    faux: ["La maitresse a commencé la leçon, puis elle a donné les cahiers.", "La maitresse a repris les cahiers à la fin de la leçon.", "La maitresse a donné les cahiers pendant toute la leçon."],
  },
  {
    phrase: "Nina a cherché son crayon partout sans le trouver.",
    bonne: "Nina a beaucoup cherché son crayon, mais il reste introuvable.",
    faux: ["Nina a peu cherché son crayon, et elle l'a retrouvé vite.", "Nina a beaucoup cherché son crayon, et elle a fini par le voir.", "Nina n'a pas cherché son crayon, elle en a pris un autre."],
  },
];

/* ⛔⛔ TABLE REFAITE LE 18/08/2026 — ELLE COMPTAIT FAUX DES RÉPONSES JUSTES.
   Signalé sur une photo d'écran : « Léa a fini son travail ___ elle est allée
   jouer », réponse attendue « alors » — mais « ensuite » va tout aussi bien.
   Vérifié ensuite ligne à ligne : le défaut touchait SEPT entrées sur douze
   (les 3 « alors » et les 4 « ensuite »), et non six. « alors » et « ensuite »
   sont deux mots de succession, et rien dans ces phrases ne les départage.
   ⛔ « alors » a donc QUITTÉ les propositions. Le BO le nomme, et il reste dans
   l'explication comme équivalent de « ensuite » — mais un QCM ne peut pas
   opposer deux mots interchangeables sans compter faux un enfant qui a raison.

   ⭐ SECOND DÉFAUT, INVISIBLE SUR LA PHOTO : « mais » était ajouté aux quatre
   choix à CHAQUE tirage et n'était JAMAIS la bonne réponse. C'est une ligne
   morte — le QCM ne jouait donc qu'à trois lignes, 33 % au hasard au lieu de
   25 %. Il a maintenant ses propres phrases.

   ⚠️ LA RÈGLE QUI EN SORT, et elle vaut pour toute table de connecteurs :
   les quatre mots proposés doivent s'EXCLURE deux à deux dans chaque phrase.
   Quatre familles ici, chacune correcte trois fois sur douze : la raison, la
   suite, le contraire, la condition. */
const MOTS_LIENS: readonly string[] = ["parce que", "ensuite", "mais", "si"];

const CONNECTEURS: readonly Connecteur[] = [
  /* LA RAISON — « ensuite », « mais » et « si » ne passent dans aucune. */
  { debut: "Tom a mis son chapeau", suite: "il fait très chaud", mot: "parce que", role: "donner la raison" },
  { debut: "Le chien aboie", suite: "quelqu'un frappe à la porte", mot: "parce que", role: "donner la raison" },
  { debut: "Nina a pris son parapluie", suite: "il pleut", mot: "parce que", role: "donner la raison" },

  /* CE QUI VIENT APRÈS — recettes et suites d'actions. « alors » irait aussi,
     c'est pourquoi il n'est plus proposé. */
  { debut: "On casse les œufs", suite: "on ajoute le sucre", mot: "ensuite", role: "dire ce qui vient après" },
  { debut: "On lave la mangue", suite: "on la coupe en morceaux", mot: "ensuite", role: "dire ce qui vient après" },
  { debut: "On creuse un trou", suite: "on pose la graine dedans", mot: "ensuite", role: "dire ce qui vient après" },

  /* LE CONTRAIRE DE CE QU'ON ATTEND — les phrases neuves du 18/08. */
  { debut: "Nina a cherché son crayon partout", suite: "elle ne l'a pas trouvé", mot: "mais", role: "dire le contraire de ce qu'on attendait" },
  { debut: "Tom a couru très vite", suite: "il est arrivé en retard", mot: "mais", role: "dire le contraire de ce qu'on attendait" },
  { debut: "Le gâteau était tout petit", suite: "il était délicieux", mot: "mais", role: "dire le contraire de ce qu'on attendait" },

  /* LA CONDITION — le verbe au futur dans le début interdit les trois autres. */
  { debut: "Tu pourras jouer dehors", suite: "tu ranges tes affaires", mot: "si", role: "dire à quelle condition" },
  { debut: "On arrivera à l'heure", suite: "on part maintenant", mot: "si", role: "dire à quelle condition" },
  { debut: "Le gâteau sera réussi", suite: "tu suis bien la recette", mot: "si", role: "dire à quelle condition" },
];

const REGISTRES: readonly Registre[] = [
  { cour: "T'as vu ça ?", classe: "As-tu vu cela ?" },
  { cour: "J'sais pas.", classe: "Je ne sais pas." },
  { cour: "Y a plus de colle.", classe: "Il n'y a plus de colle." },
  { cour: "C'est ouf !", classe: "C'est étonnant !" },
  { cour: "File-moi ton crayon.", classe: "Peux-tu me prêter ton crayon ?" },
  { cour: "Ça craint.", classe: "Ce n'est pas agréable." },
];

const PHRASES_VOIX: readonly PhraseVoix[] = [
  { phrase: "Le margouillat monte sur le mur.", signe: "un point", voix: "on s'arrête et on baisse la voix" },
  { phrase: "Où est mon cahier ?", signe: "un point d'interrogation", voix: "on monte la voix à la fin" },
  { phrase: "Quel beau lagon !", signe: "un point d'exclamation", voix: "on met de la force dans la voix" },
  { phrase: "Léa mange une mangue.", signe: "un point", voix: "on s'arrête et on baisse la voix" },
  { phrase: "Est-ce que tu viens ?", signe: "un point d'interrogation", voix: "on monte la voix à la fin" },
  { phrase: "Comme il pleut fort !", signe: "un point d'exclamation", voix: "on met de la force dans la voix" },
  { phrase: "Papa prépare un cari.", signe: "un point", voix: "on s'arrête et on baisse la voix" },
  { phrase: "Qui a pris ma gomme ?", signe: "un point d'interrogation", voix: "on monte la voix à la fin" },
  { phrase: "Quelle chaleur aujourd'hui !", signe: "un point d'exclamation", voix: "on met de la force dans la voix" },
  { phrase: "Les enfants jouent dans la cour.", signe: "un point", voix: "on s'arrête et on baisse la voix" },
  { phrase: "Quand part le bateau ?", signe: "un point d'interrogation", voix: "on monte la voix à la fin" },
  { phrase: "Comme ce letchi est bon !", signe: "un point d'exclamation", voix: "on met de la force dans la voix" },
  { phrase: "Le piton fume au loin.", signe: "un point", voix: "on s'arrête et on baisse la voix" },
  { phrase: "Où sont mes bottes ?", signe: "un point d'interrogation", voix: "on monte la voix à la fin" },
];

const GROUPES: readonly Groupes[] = [
  {
    phrase: "Le petit chien dort sur le tapis.",
    decoupe: "Le petit chien / dort / sur le tapis.",
    faux: ["Le / petit chien dort sur / le tapis.", "Le petit / chien dort sur le / tapis.", "Le petit chien dort sur le tapis. (sans respirer)"],
  },
  {
    phrase: "Les enfants jouent dans la cour.",
    decoupe: "Les enfants / jouent / dans la cour.",
    faux: ["Les / enfants jouent dans / la cour.", "Les enfants jouent / dans / la / cour.", "Les enfants jouent dans la cour. (sans respirer)"],
  },
  {
    phrase: "Le bateau glisse sur le lagon.",
    decoupe: "Le bateau / glisse / sur le lagon.",
    faux: ["Le / bateau glisse sur / le lagon.", "Le bateau glisse sur / le / lagon.", "Le bateau glisse sur le lagon. (sans respirer)"],
  },
  {
    phrase: "Ma petite sœur mange une mangue.",
    decoupe: "Ma petite sœur / mange / une mangue.",
    faux: ["Ma / petite sœur mange une / mangue.", "Ma petite / sœur mange / une / mangue.", "Ma petite sœur mange une mangue. (sans respirer)"],
  },
  {
    phrase: "Le vieux margouillat dort sur le mur.",
    decoupe: "Le vieux margouillat / dort / sur le mur.",
    faux: ["Le / vieux margouillat dort sur / le mur.", "Le vieux / margouillat dort / sur le / mur.", "Le vieux margouillat dort sur le mur. (sans respirer)"],
  },
  {
    phrase: "La maitresse écrit la date au tableau.",
    decoupe: "La maitresse / écrit la date / au tableau.",
    faux: ["La / maitresse écrit la / date au tableau.", "La maitresse écrit / la / date au / tableau.", "La maitresse écrit la date au tableau. (sans respirer)"],
  },
  {
    phrase: "Mon grand frère range sa chambre.",
    decoupe: "Mon grand frère / range / sa chambre.",
    faux: ["Mon / grand frère range sa / chambre.", "Mon grand / frère range / sa / chambre.", "Mon grand frère range sa chambre. (sans respirer)"],
  },
  {
    phrase: "Les oiseaux chantent dans les arbres.",
    decoupe: "Les oiseaux / chantent / dans les arbres.",
    faux: ["Les / oiseaux chantent dans / les arbres.", "Les oiseaux chantent / dans / les / arbres.", "Les oiseaux chantent dans les arbres. (sans respirer)"],
  },
  {
    phrase: "Le pêcheur range son filet mouillé.",
    decoupe: "Le pêcheur / range / son filet mouillé.",
    faux: ["Le / pêcheur range son / filet mouillé.", "Le pêcheur range / son / filet / mouillé.", "Le pêcheur range son filet mouillé. (sans respirer)"],
  },
  {
    phrase: "Une grosse pluie tombe sur le toit.",
    decoupe: "Une grosse pluie / tombe / sur le toit.",
    faux: ["Une / grosse pluie tombe sur / le toit.", "Une grosse / pluie tombe / sur le / toit.", "Une grosse pluie tombe sur le toit. (sans respirer)"],
  },
  // Les quatre suivantes ajoutées le 12/08/2026 : la table en comptait dix, et
  // `cp_voix_groupes_mots` n'avait donc que dix énoncés — sous le plancher.
  {
    phrase: "Le vieux pêcheur pousse sa barque à l'eau.",
    decoupe: "Le vieux pêcheur / pousse sa barque / à l'eau.",
    faux: ["Le / vieux pêcheur pousse sa / barque à l'eau.", "Le vieux / pêcheur pousse / sa barque à / l'eau.", "Le vieux pêcheur pousse sa barque à l'eau. (sans respirer)"],
  },
  {
    phrase: "Ma maitresse raconte une histoire aux élèves.",
    decoupe: "Ma maitresse / raconte une histoire / aux élèves.",
    faux: ["Ma / maitresse raconte une / histoire aux élèves.", "Ma maitresse raconte / une / histoire aux / élèves.", "Ma maitresse raconte une histoire aux élèves. (sans respirer)"],
  },
  {
    phrase: "Un petit crabe court sur le sable.",
    decoupe: "Un petit crabe / court / sur le sable.",
    faux: ["Un / petit crabe court sur / le sable.", "Un petit / crabe court / sur le / sable.", "Un petit crabe court sur le sable. (sans respirer)"],
  },
  {
    phrase: "Les cannes poussent au bord de la route.",
    decoupe: "Les cannes / poussent / au bord de la route.",
    faux: ["Les / cannes poussent au / bord de la route.", "Les cannes poussent / au / bord de la / route.", "Les cannes poussent au bord de la route. (sans respirer)"],
  },
];

const PERSONNAGES: readonly Personnage[] = [
  { type: "le loup", indices: "il a de grandes dents, il fait peur et il rôde la nuit", faux: ["la fée", "le roi", "l'enfant sage"] },
  { type: "la fée", indices: "elle a une baguette et elle exauce les vœux", faux: ["l'ogre", "le loup", "le pêcheur"] },
  { type: "l'ogre", indices: "il est énorme, il a très faim et il vit dans un château", faux: ["la fée", "la princesse", "le maitre"] },
  { type: "la sorcière", indices: "elle prépare des potions dans un chaudron", faux: ["la fée", "la princesse", "la maitresse"] },
  { type: "le héros", indices: "il part à l'aventure et il n'abandonne jamais", faux: ["l'ogre", "le loup", "la sorcière"] },
  { type: "le roi", indices: "il porte une couronne et il commande tout le royaume", faux: ["le pêcheur", "l'ogre", "le facteur"] },
  { type: "le géant", indices: "il est plus haut que les arbres et le sol tremble quand il marche", faux: ["la fée", "l'enfant", "la sorcière"] },
  { type: "le dragon", indices: "il crache du feu et garde un trésor dans une grotte", faux: ["le roi", "la fée", "le pêcheur"] },
  { type: "la princesse", indices: "elle vit dans un château et attend qu'on vienne la délivrer", faux: ["la sorcière", "l'ogre", "la maitresse"] },
  { type: "la grand-mère", indices: "elle raconte des histoires le soir et connait tous les secrets", faux: ["l'ogre", "le dragon", "le loup"] },
  // Les quatre suivantes ajoutées le 12/08/2026 : la table en comptait dix, et
  // `cp_lect_types_personnages` comme `cp_voix_expressive` s'y arrêtaient.
  // ⚠️ Toute entrée ajoutée ici doit recevoir sa voix dans
  // `cp_voix_expressive_tpl_1`, sinon la bonne réponse y devient `undefined`.
  { type: "le pirate", indices: "il a un bateau, un drapeau noir, et il cherche un trésor", faux: ["le roi", "la fée", "la grand-mère"] },
  { type: "le renard", indices: "il est rusé et il obtient ce qu'il veut par de belles paroles", faux: ["l'ogre", "le géant", "la princesse"] },
  { type: "le lutin", indices: "il est tout petit, farceur, et il se cache dans la maison", faux: ["le géant", "le dragon", "le roi"] },
  { type: "le chevalier", indices: "il porte une armure, il monte à cheval et il défend les plus faibles", faux: ["la sorcière", "l'ogre", "la grand-mère"] },
];

const TEXTES_TYPE: readonly (readonly [string, string])[] = [
  ["Il était une fois un margouillat qui voulait voir la mer.", "un texte qui raconte"],
  ["Le margouillat est un petit lézard. Il vit sur les murs et mange des insectes.", "un texte qui informe"],
  ["Léa ouvrit la porte et découvrit un panier posé là.", "un texte qui raconte"],
  ["Le letchi pousse sur un arbre. Sa peau est rouge et sa chair est blanche.", "un texte qui informe"],
  ["Tom courut jusqu'au lagon sans se retourner une seule fois.", "un texte qui raconte"],
  ["La Réunion est une île. Son point le plus haut est le piton des Neiges.", "un texte qui informe"],
  ["Un matin, Nina trouva une plume bleue devant sa porte.", "un texte qui raconte"],
  ["Le tamarin est un grand arbre. Il donne de l'ombre et des gousses acides.", "un texte qui informe"],
  ["Le vieux pêcheur poussa sa barque et disparut derrière la barrière de corail.", "un texte qui raconte"],
  ["La vanille pousse sur une liane. Sa fleur doit être fécondée à la main.", "un texte qui informe"],
  ["Ce jour-là, la classe entière retint son souffle.", "un texte qui raconte"],
  ["Le cari se prépare avec du curcuma, des oignons et de la tomate.", "un texte qui informe"],
  ["Léo grimpa sur le muret pour mieux voir passer le cortège.", "un texte qui raconte"],
  ["Le paille-en-queue est un oiseau blanc. Il niche dans les falaises de l'île.", "un texte qui informe"],
];

/* =============================================================================
   LE PARCOURS DE LECTEUR — les trois objectifs du BO qui manquaient
   ---------------------------------------------------------------------------
   « Lire 5 à 10 œuvres complètes et variées issues du patrimoine et de la
   littérature de jeunesse (albums, romans, contes, fables, poèmes, pièces de
   théâtre et documentaires) » ; « Aller vers les livres et être capable d'en
   choisir à titre personnel » ; « Relier ses lectures à son expérience
   personnelle, être en mesure d'établir des liens entre ses différentes
   lectures (mise en réseau) » ; « Fréquenter régulièrement des lieux de lecture
   et se familiariser avec eux, rencontrer des acteurs du livre ».

   ⚠️ ON N'INTERROGE JAMAIS UNE ŒUVRE PRÉCISE. Les livres sont choisis par le
   professeur, et le coach n'a rien fait lire. Ce qui s'interroge, c'est ce qui
   se transporte d'un livre à l'autre : la SORTE de livre, le geste de choisir,
   le point commun entre deux histoires, le fonctionnement d'une bibliothèque.
   Les personnages du patrimoine — le loup, l'ogre, la fée — sont pris comme le
   fait déjà `PERSONNAGES` : tout enfant les a croisés, sans qu'aucun titre ne
   soit exigé.
   ========================================================================== */

/** Les sept sortes que le BO énumère, deux indices chacune sauf le roman. */
const SORTES_LIVRES: readonly SorteLivre[] = [
  { sorte: "un album", indice: "il y a une grande image sur presque chaque page, et peu de texte" },
  { sorte: "un album", indice: "les dessins racontent autant de choses que les mots" },
  { sorte: "un conte", indice: "l'histoire commence par « Il était une fois », et il y a une fée" },
  { sorte: "un conte", indice: "un enfant part dans la forêt, rencontre un loup qui parle, et tout finit bien" },
  { sorte: "une fable", indice: "des animaux parlent, l'histoire est très courte, et elle finit par une leçon" },
  { sorte: "une fable", indice: "un renard et un corbeau discutent, et à la fin on apprend quelque chose sur les gens" },
  { sorte: "un poème", indice: "les lignes sont courtes, on va à la ligne avant la fin de la phrase, et les mots riment" },
  { sorte: "un poème", indice: "le texte est écrit en petits morceaux qu'on appelle des vers" },
  { sorte: "une pièce de théâtre", indice: "avant chaque phrase, il y a le nom de celui qui la dit" },
  { sorte: "une pièce de théâtre", indice: "tout est écrit pour être joué sur une scène, devant des gens" },
  { sorte: "un documentaire", indice: "il y a des photos, des titres, et de vrais renseignements sur les volcans" },
  { sorte: "un documentaire", indice: "on apprend ce que mange un animal, pour de vrai" },
  { sorte: "un roman", indice: "l'histoire est longue, découpée en chapitres, et il n'y a presque pas d'images" },
  { sorte: "un roman", indice: "on suit les mêmes personnages pendant plus de cent pages" },
];

const TOUTES_SORTES: readonly string[] = [
  ...new Set(SORTES_LIVRES.map((s) => s.sorte)),
];

/** « Il est capable de choisir un livre en fonction de ses centres d'intérêt. » */
const GOUTS: readonly Gout[] = [
  { prenom: "Tom", gout: "veut savoir comment vivent les tortues", livre: "un documentaire sur les tortues" },
  { prenom: "Léa", gout: "adore les histoires qui font un peu peur", livre: "un conte avec un ogre" },
  { prenom: "Nina", gout: "veut apprendre à faire un gâteau", livre: "un livre de recettes" },
  { prenom: "Malik", gout: "aime les histoires courtes où les animaux parlent", livre: "un livre de fables" },
  { prenom: "Ravi", gout: "veut comprendre pourquoi le piton fume", livre: "un documentaire sur les volcans" },
  { prenom: "Jade", gout: "aime les mots qui riment", livre: "un recueil de poèmes" },
  { prenom: "Émile", gout: "veut une longue histoire pour tout l'été", livre: "un roman" },
  { prenom: "Alix", gout: "aime regarder de grandes images en lisant", livre: "un album" },
  { prenom: "Noé", gout: "veut jouer une histoire avec ses copains", livre: "une pièce de théâtre" },
  { prenom: "Lina", gout: "veut savoir ce que mange un margouillat", livre: "un documentaire sur les animaux de l'île" },
  { prenom: "Maya", gout: "veut connaitre le nom des étoiles", livre: "un documentaire sur le ciel" },
  { prenom: "Sara", gout: "adore les histoires de bateaux et de pirates", livre: "un roman d'aventure" },
  { prenom: "Yann", gout: "aime chercher qui a fait le coup", livre: "un roman policier" },
  { prenom: "Anaïs", gout: "veut une histoire courte avant de dormir", livre: "un album" },
];

const TOUS_LIVRES: readonly string[] = [...new Set(GOUTS.map((g) => g.livre))];

/** Mise en réseau : deux lectures, un point commun.
 *
 * ⚠️ Les trois pièges sont VRAIS D'UNE SEULE des deux histoires. C'est l'erreur
 * réelle de l'enfant — il retient un détail de celle qu'il a préférée — et
 * c'est ce qui oblige à relire les deux. Un piège pris ailleurs dans la table
 * risquerait d'être vrai lui aussi : on ne réutilise jamais un `commun`. */
const PAIRES: readonly Paire[] = [
  {
    a: "un loup tourne autour d'une maison et essaie d'entrer",
    b: "un ogre cherche des enfants pour son diner",
    commun: "le méchant veut attraper quelqu'un",
    faux: ["il y a un loup dans les deux", "les deux se passent dans une maison", "les deux parlent d'un repas"],
  },
  {
    a: "une petite fille traverse la forêt toute seule",
    b: "un garçon part sur la mer tout seul dans une barque",
    commun: "le héros part seul, et il a un peu peur",
    faux: ["les deux se passent dans la forêt", "les deux parlent de la mer", "les deux ont une fille comme héros"],
  },
  {
    a: "une fée exauce trois vœux",
    b: "une lampe trouvée dans le sable réalise trois souhaits",
    commun: "quelque chose de magique réalise trois souhaits",
    faux: ["il y a une fée dans les deux", "les deux se passent au bord de la mer", "il y a une lampe dans les deux"],
  },
  {
    a: "un renard flatte un corbeau pour lui prendre son fromage",
    b: "un chat fait semblant d'être gentil pour attraper une souris",
    commun: "le rusé trompe l'autre pour obtenir ce qu'il veut",
    faux: ["il y a un oiseau dans les deux", "les deux parlent de fromage", "il y a un chat dans les deux"],
  },
  {
    a: "un enfant perd son chien et le cherche dans tout le quartier",
    b: "une fillette perd son doudou et retourne toute la maison",
    commun: "on cherche partout quelque chose qu'on a perdu",
    faux: ["les deux parlent d'un animal", "les deux se passent dans une maison", "les deux se passent dans la rue"],
  },
  {
    a: "trois cochons construisent chacun leur maison",
    b: "sept chevreaux se cachent chacun dans un coin",
    commun: "ils sont plusieurs, et le dernier s'en sort le mieux",
    faux: ["ils sont trois dans les deux", "les deux parlent de construire", "les deux parlent de se cacher"],
  },
  {
    a: "un pêcheur remonte dans son filet un poisson qui parle",
    b: "un bucheron s'arrête devant un arbre qui se met à parler",
    commun: "un être de la nature se met à parler",
    faux: ["les deux se passent au bord de l'eau", "les deux parlent d'un poisson", "les deux se passent dans la forêt"],
  },
  {
    a: "un roi promet la moitié de son royaume à qui le sauvera",
    b: "une reine promet un coffre d'or à qui retrouvera sa fille",
    commun: "on promet une récompense à celui qui réussira",
    faux: ["c'est un roi dans les deux", "les deux parlent d'or", "les deux parlent d'une fille perdue"],
  },
  {
    a: "un enfant raconte que le vase s'est cassé tout seul",
    b: "un berger crie au loup pour rire, et le jour du vrai loup, personne ne vient",
    commun: "le mensonge finit par se retourner contre celui qui ment",
    faux: ["il y a un loup dans les deux", "les deux se passent à la maison", "les deux parlent d'un objet cassé"],
  },
  {
    a: "une souris ronge le filet où le lion est pris",
    b: "une fourmi sauve une colombe tombée dans l'eau",
    commun: "le plus petit sauve le plus grand",
    faux: ["il y a un oiseau dans les deux", "les deux parlent d'un filet", "les deux se passent dans l'eau"],
  },
  {
    a: "un enfant part de chez lui fâché, et revient le soir",
    b: "un chat s'échappe par la fenêtre et retrouve sa maison après trois jours",
    commun: "on part loin, et on finit par revenir chez soi",
    faux: ["les deux parlent d'un animal", "les deux durent trois jours", "les deux parlent d'une dispute"],
  },
  {
    a: "un géant fait trembler le sol quand il marche",
    b: "un dragon crache du feu au-dessus du village",
    commun: "une créature énorme fait peur à tout un pays",
    faux: ["les deux crachent du feu", "les deux parlent d'un village", "les deux font trembler le sol"],
  },
];

/** « Fréquenter des lieux de lecture… rencontrer des acteurs du livre. » */
const LIEUX: readonly Lieu[] = [
  {
    situation: "Tu veux emprunter un livre à la bibliothèque de l'école.",
    bon: "tu le fais enregistrer, et tu le rapportes à la date prévue",
    faux: ["tu le mets dans ton sac sans rien dire", "tu le gardes toute l'année", "tu le prends pour un camarade qui n'est pas là"],
  },
  {
    situation: "Tu ne trouves pas le livre que tu cherches.",
    bon: "tu demandes à la personne qui s'occupe de la bibliothèque",
    faux: ["tu abandonnes et tu repars", "tu prends n'importe quel livre", "tu sors tous les livres de l'étagère"],
  },
  {
    situation: "Tu as fini le livre que tu avais emprunté.",
    bon: "tu le rapportes, pour qu'un autre enfant puisse le lire",
    faux: ["tu le gardes chez toi", "tu le ranges dans ton casier", "tu le prêtes à un copain sans le dire"],
  },
  {
    situation: "Comment appelle-t-on la personne qui range les livres et te conseille à la bibliothèque ?",
    bon: "le bibliothécaire",
    faux: ["l'auteur", "l'illustrateur", "le libraire"],
  },
  {
    situation: "Comment appelle-t-on celui qui a écrit l'histoire ?",
    bon: "l'auteur",
    faux: ["l'illustrateur", "le bibliothécaire", "le libraire"],
  },
  {
    situation: "Comment appelle-t-on celui qui a fait les dessins du livre ?",
    bon: "l'illustrateur",
    faux: ["l'auteur", "le bibliothécaire", "le libraire"],
  },
  {
    situation: "Comment appelle-t-on la personne qui vend des livres dans son magasin ?",
    bon: "le libraire",
    faux: ["le bibliothécaire", "l'auteur", "l'illustrateur"],
  },
  {
    situation: "À la bibliothèque, les histoires ne sont pas rangées avec les documentaires. Pourquoi ?",
    bon: "parce qu'on range par sortes de livres, pour les retrouver vite",
    faux: ["parce que les documentaires sont plus grands", "parce qu'on ne peut pas les emprunter", "parce qu'ils coutent plus cher"],
  },
  {
    situation: "Tu as taché la page d'un livre emprunté.",
    bon: "tu le dis à la personne qui s'occupe des livres",
    faux: ["tu arraches la page", "tu ne dis rien et tu le rapportes", "tu le caches au fond de l'étagère"],
  },
  {
    situation: "Autour de toi, plusieurs enfants sont en train de lire.",
    bon: "tu parles doucement pour ne pas les déranger",
    faux: ["tu appelles ton copain de l'autre bout de la salle", "tu lis tout haut", "tu attends que tout le monde parte"],
  },
  {
    situation: "Comment appelle-t-on la bibliothèque qui se trouve dans l'école ?",
    bon: "la BCD",
    faux: ["la médiathèque", "la librairie", "la salle informatique"],
  },
  {
    situation: "Comment appelle-t-on le grand lieu de la ville où on emprunte des livres, des films et de la musique ?",
    bon: "la médiathèque",
    faux: ["la BCD", "la librairie", "la salle des maitres"],
  },
  {
    situation: "Un auteur vient dans ta classe parler de son livre.",
    bon: "tu prépares une question à lui poser",
    faux: ["tu lui demandes de te donner un livre", "tu ne dis rien du tout", "tu lui racontes une autre histoire"],
  },
  {
    situation: "Tu veux savoir de quoi parle un livre avant de l'emprunter.",
    bon: "tu lis ce qui est écrit au dos, sur la quatrième de couverture",
    faux: ["tu lis la dernière page", "tu regardes le prix", "tu comptes les pages"],
  },
];

/** Le repère chiffré de fin de CP : 30 mots par minute sans préparation, 50
 *  après préparation. Les nombres sont choisis pour tomber dans les trois cas —
 *  en dessous de 30, entre 30 et 49, et au-delà de 50 — et la comparaison reste
 *  celle du CP : deux nombres jusqu'à cent, rien à multiplier. */
const VITESSES: readonly Vitesse[] = [
  { prenom: "Tom", mots: 18 },
  { prenom: "Léa", mots: 24 },
  { prenom: "Nina", mots: 27 },
  { prenom: "Malik", mots: 29 },
  { prenom: "Ravi", mots: 31 },
  { prenom: "Jade", mots: 34 },
  { prenom: "Émile", mots: 38 },
  { prenom: "Alix", mots: 42 },
  { prenom: "Noé", mots: 45 },
  { prenom: "Lina", mots: 49 },
  { prenom: "Maya", mots: 52 },
  { prenom: "Sara", mots: 56 },
  { prenom: "Yann", mots: 61 },
  { prenom: "Anaïs", mots: 68 },
];

export const oralEtLecteurBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_ORAL_ECOUTER
  ========================================================= */
  {
    kind: "template",
    id: "cp_oral_ecouter_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "cp_oral_ecouter",
    difficulty: 2,
    theme: "neutral",
    hint: "Retiens l'information importante, pas tous les mots.",
    tags: ["cp", "oral", "ecouter", "template"],
    generate: () => {
      const m = randomChoice(MESSAGES);
      return {
        text: `On te lit ce message :\n« ${m.texte} »\n\nQu'est-ce qu'il faut retenir ?`,
        format: "qcm" as const,
        choices: makeChoices(m.info, m.faux),
        expected: [m.info],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Écouter pour comprendre, ce n'est pas retenir tous les mots : c'est garder ce qui compte.",
          "Pendant qu'on parle, demande-toi : qu'est-ce que je dois faire, ou savoir, après ?",
          `Le message dit : « ${m.texte} » — l'important, c'est que ${m.info}.`,
          `Il faut retenir que ${m.info}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_ORAL_CONSIGNE — le discours injonctif du BO
  ========================================================= */
  {
    kind: "template",
    id: "cp_oral_consigne_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "cp_oral_consigne",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le verbe de la consigne : c'est lui qui dit quoi faire.",
    tags: ["cp", "oral", "consigne", "template"],
    generate: () => {
      const c = randomChoice(CONSIGNES);
      return {
        text: `La maitresse dit : « ${c.consigne} »\n\nQue fais-tu ?`,
        format: "qcm" as const,
        choices: makeChoices(c.action, c.faux),
        expected: [c.action],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une consigne dit quoi faire. Le verbe du début commande tout le reste.",
          "Repère le verbe, puis demande-toi quel geste il demande.",
          `« ${c.consigne} » : le verbe dit exactement le geste — ${c.action}.`,
          `On fait ceci : ${c.action}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_oral_consigne_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "cp_oral_consigne",
    difficulty: 3,
    theme: "neutral",
    text: "Tu n'as pas compris la consigne. Que fais-tu ?",
    format: "qcm",
    choices: [
      "tu demandes qu'on la redise, ou tu la relis",
      "tu fais ce que fait ton voisin",
      "tu ne fais rien et tu attends",
      "tu fais quelque chose au hasard",
    ],
    expected: ["tu demandes qu'on la redise, ou tu la relis"],
    comparator: "mcq_exact",
    hint: "Copier son voisin ne dit pas ce qu'il fallait faire.",
    explanation: exp(
      "Ne pas avoir compris n'est pas une faute : c'est un moment normal du travail.",
      "Demande qu'on répète, ou relis la consigne lentement en cherchant le verbe.",
      "Faire comme le voisin peut marcher par hasard — mais la fois d'après, on sera bloqué au même endroit.",
      "On demande qu'on la redise, ou on la relit.",
    ),
    tags: ["cp", "oral", "consigne", "methode", "qcm"],
  },

  /* =========================================================
     CP_ORAL_REFORMULER
  ========================================================= */
  {
    kind: "template",
    id: "cp_oral_reformuler_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "cp_oral_reformuler",
    difficulty: 3,
    theme: "neutral",
    hint: "Redire la même chose, avec d'autres mots, sans rien inventer.",
    tags: ["cp", "oral", "reformuler", "template"],
    generate: () => {
      const r = randomChoice(REFORMULATIONS);
      return {
        text: `On te dit :\n« ${r.phrase} »\n\nComment peux-tu le redire avec tes mots ?`,
        format: "qcm" as const,
        choices: makeChoices(r.bonne, r.faux),
        expected: [r.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Reformuler, c'est redire la même chose autrement — sans rien ajouter et sans rien perdre.",
          "Demande-toi ce qui s'est passé, puis raconte-le avec des mots à toi.",
          `« ${r.bonne} » dit exactement la même chose que la phrase de départ. Les autres racontent autre chose.`,
          `On peut dire : « ${r.bonne} »`,
        ),
      };
    },
  },

  /* =========================================================
     CP_ORAL_RACONTER — les connecteurs que le BO nomme
  ========================================================= */
  {
    kind: "template",
    id: "cp_oral_raconter_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "cp_oral_raconter",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis les deux morceaux, puis demande-toi ce que le second apporte : la raison, la suite, le contraire, ou une condition.",
    tags: ["cp", "oral", "raconter", "template"],
    generate: () => {
      const c = randomChoice(CONNECTEURS);
      /* Les trois autres familles, jamais un synonyme de la bonne réponse.
         `makeChoices` écarte déjà `c.mot` de la liste qu'on lui passe. */
      return {
        text: `Quel petit mot relie ces deux morceaux ?\n\n« ${c.debut} ___ ${c.suite}. »`,
        format: "qcm" as const,
        choices: makeChoices(c.mot, MOTS_LIENS),
        expected: [c.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Pour raconter, on relie ses idées avec de petits mots. Chacun fait un travail différent : « parce que » donne la raison, « ensuite » dit ce qui vient après, « mais » annonce le contraire de ce qu'on attendait, « si » pose une condition.",
          "Demande-toi ce que le second morceau apporte au premier, puis choisis le mot qui fait ce travail-là.",
          `Ici, le second morceau sert à ${c.role} : c'est « ${c.mot} » qu'il faut.${c.mot === "ensuite" ? " (« alors » dirait la même chose — c'est pour cela qu'il n'est pas proposé ici.)" : ""}`,
          `Le mot est « ${c.mot} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_oral_raconter_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "cp_oral_raconter",
    difficulty: 2,
    theme: "neutral",
    text: "Pour raconter une histoire qu'on a entendue, quelle est la meilleure façon de faire ?",
    format: "qcm",
    choices: [
      "raconter dans l'ordre, avec ses propres mots",
      "répéter mot à mot sans comprendre",
      "raconter la fin en premier",
      "inventer une autre histoire",
    ],
    expected: ["raconter dans l'ordre, avec ses propres mots"],
    comparator: "mcq_exact",
    hint: "Celui qui t'écoute n'a pas entendu l'histoire.",
    explanation: exp(
      "Raconter, c'est refaire le chemin de l'histoire pour quelqu'un qui ne l'a pas entendue.",
      "Commence par le début, avance dans l'ordre, et utilise tes mots à toi.",
      "Si on commence par la fin, celui qui écoute est perdu. Et répéter par cœur sans comprendre ne tient pas trois phrases.",
      "On raconte dans l'ordre, avec ses propres mots.",
    ),
    tags: ["cp", "oral", "raconter", "methode", "qcm"],
  },

  /* =========================================================
     CP_ORAL_PRENDRE_PAROLE
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_oral_prendre_parole_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "cp_oral_prendre_parole",
    difficulty: 2,
    theme: "neutral",
    text: "Tu veux dire quelque chose devant la classe. Qu'est-ce qui aide le plus à être compris ?",
    format: "qcm",
    choices: [
      "parler assez fort, en regardant les autres",
      "parler très vite pour finir tôt",
      "parler en regardant ses pieds",
      "parler tout bas pour ne pas déranger",
    ],
    expected: ["parler assez fort, en regardant les autres"],
    comparator: "mcq_exact",
    hint: "Ceux qui écoutent sont au fond de la classe.",
    explanation: exp(
      "Prendre la parole, ce n'est pas seulement dire : c'est se faire entendre de ceux qui écoutent.",
      "Lève la tête, regarde ceux à qui tu parles, et parle assez fort pour le fond de la classe.",
      "Une bonne idée dite trop bas, personne ne l'entend — et c'est dommage, parce qu'elle était bonne.",
      "Il faut parler assez fort, en regardant les autres.",
    ),
    tags: ["cp", "oral", "prendre-parole", "methode", "qcm"],
  },

  /* =========================================================
     CP_ORAL_ECHANGES
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_oral_echanges_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "cp_oral_echanges",
    difficulty: 2,
    theme: "neutral",
    text: "Un camarade dit quelque chose que tu ne penses pas. Que fais-tu ?",
    format: "qcm",
    choices: [
      "tu attends qu'il finisse, puis tu réponds",
      "tu parles en même temps que lui, plus fort",
      "tu lui dis qu'il a tort tout de suite",
      "tu ne dis rien et tu penses à autre chose",
    ],
    expected: ["tu attends qu'il finisse, puis tu réponds"],
    comparator: "mcq_exact",
    hint: "Un échange, ça se fait à deux — mais pas en même temps.",
    explanation: exp(
      "Participer à un échange, c'est écouter les autres ET donner son avis.",
      "Laisse la phrase se terminer, puis explique ce que tu penses, toi.",
      "Deux personnes qui parlent en même temps, ça ne fait pas deux idées : ça fait du bruit. Et se taire tout à fait, c'est priver les autres de ce qu'on avait à dire.",
      "On attend qu'il finisse, puis on dit ce qu'on pense.",
    ),
    tags: ["cp", "oral", "echanges", "methode", "qcm"],
  },

  {
    kind: "template",
    id: "cp_oral_prendre_parole_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "cp_oral_prendre_parole",
    difficulty: 2,
    theme: "neutral",
    hint: "Pense à celui qui est au fond de la classe et qui essaie de te suivre.",
    tags: ["cp", "oral", "prendre-parole", "template"],
    generate: () => {
      const cas = [
        { souci: "Personne ne t'entend au fond de la classe.", remede: "parler plus fort" },
        { souci: "Tu parles si vite qu'on ne te suit pas.", remede: "ralentir" },
        { souci: "Tu regardes tes pieds pendant que tu parles.", remede: "lever la tête et regarder les autres" },
        { souci: "Tu dis « euh » entre chaque mot.", remede: "réfléchir avant de commencer" },
        { souci: "Tu racontes la fin de l'histoire en premier.", remede: "reprendre depuis le début" },
        { souci: "Tu tournes le dos à la classe.", remede: "se tourner vers ceux qui écoutent" },
      ];
      const c = randomChoice(cas);
      const autres = shuffle(cas.filter((x) => x.remede !== c.remede).map((x) => x.remede)).slice(0, 3);
      return {
        text: `${c.souci}\n\nQue faut-il faire ?`,
        format: "qcm" as const,
        choices: makeChoices(c.remede, autres),
        expected: [c.remede],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Prendre la parole, c'est se faire comprendre de ceux qui écoutent.",
          "Demande-toi ce qui empêche les autres de te suivre, puis corrige cela.",
          `${c.souci} La réponse, c'est de ${c.remede}.`,
          `Il faut ${c.remede}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_oral_echanges_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "cp_oral_echanges",
    difficulty: 3,
    theme: "neutral",
    hint: "Un échange se fait à deux — mais pas en même temps.",
    tags: ["cp", "oral", "echanges", "template"],
    generate: () => {
      const cas = [
        { situation: "Un camarade parle et tu as une idée tout de suite.", bon: "attendre qu'il finisse, puis parler" },
        { situation: "Tu n'es pas d'accord avec ce qui vient d'être dit.", bon: "expliquer pourquoi, sans se moquer" },
        { situation: "Un camarade cherche ses mots.", bon: "le laisser finir sans le couper" },
        { situation: "Tu as la même idée que quelqu'un d'autre.", bon: "le dire, et ajouter quelque chose de nouveau" },
        { situation: "Tu n'as pas compris ce qu'a dit ton camarade.", bon: "lui demander de répéter" },
        { situation: "Deux personnes parlent en même temps.", bon: "s'arrêter et laisser l'autre finir" },
      ];
      const c = randomChoice(cas);
      const autres = shuffle(cas.filter((x) => x.bon !== c.bon).map((x) => x.bon)).slice(0, 3);
      return {
        text: `${c.situation}\n\nQue fais-tu ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bon, autres),
        expected: [c.bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Participer à un échange, c'est écouter les autres ET donner son avis. Les deux, pas l'un sans l'autre.",
          "Demande-toi ce qui permet à la discussion d'avancer.",
          `${c.situation} Le mieux est de ${c.bon}.`,
          `On fait ceci : ${c.bon}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_ORAL_NIVEAU_LANGUE — « en classe et dans la cour »
  ========================================================= */
  {
    kind: "template",
    id: "cp_oral_niveau_langue_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "cp_oral_niveau_langue",
    difficulty: 3,
    theme: "neutral",
    hint: "On ne parle pas de la même manière en classe et dans la cour.",
    tags: ["cp", "oral", "niveau-langue", "template"],
    generate: () => {
      const r = randomChoice(REGISTRES);
      const autres = shuffle(REGISTRES.filter((x) => x.classe !== r.classe).map((x) => x.classe)).slice(0, 2);
      return {
        text: `Dans la cour, on dit : « ${r.cour} »\n\nComment le dit-on quand on parle à la maitresse ?`,
        format: "qcm" as const,
        choices: makeChoices(r.classe, [r.cour, ...autres]),
        expected: [r.classe],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "On ne parle pas de la même manière selon à qui on parle. Ce n'est pas mieux ou moins bien : c'est différent.",
          "Demande-toi à qui tu parles, puis choisis la façon de dire qui convient.",
          `Dans la cour : « ${r.cour} ». En classe : « ${r.classe} ». Les deux disent la même chose.`,
          `À la maitresse, on dit : « ${r.classe} »`,
        ),
      };
    },
  },

  /* =========================================================
     CP_VOIX_PONCTUATION
  ========================================================= */
  {
    kind: "template",
    id: "cp_voix_ponctuation_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "lecture_voix_haute",
    microId: "cp_voix_ponctuation",
    difficulty: 2,
    theme: "neutral",
    hint: "Le signe de la fin dit à ta voix ce qu'elle doit faire.",
    tags: ["cp", "voix-haute", "ponctuation", "template"],
    generate: () => {
      const p = randomChoice(PHRASES_VOIX);
      return {
        text: `Tu lis cette phrase à voix haute :\n\n« ${p.phrase} »\n\nQue fait ta voix à la fin ?`,
        format: "qcm" as const,
        choices: shuffle([
          "on s'arrête et on baisse la voix",
          "on monte la voix à la fin",
          "on met de la force dans la voix",
        ]),
        expected: [p.voix],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La ponctuation ne se lit pas : elle se joue avec la voix.",
          "Regarde le dernier signe avant de commencer à lire.",
          `« ${p.phrase} » finit par ${p.signe} : ${p.voix}.`,
          `Ta voix fait ceci : ${p.voix}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_VOIX_GROUPES_MOTS
  ========================================================= */
  {
    kind: "template",
    id: "cp_voix_groupes_mots_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "lecture_voix_haute",
    microId: "cp_voix_groupes_mots",
    difficulty: 3,
    theme: "neutral",
    hint: "On respire entre les groupes, jamais au milieu d'un groupe.",
    tags: ["cp", "voix-haute", "groupes", "template"],
    generate: () => {
      const g = randomChoice(GROUPES);
      return {
        text: `Où faut-il respirer en lisant cette phrase à voix haute ?\n\n« ${g.phrase} »`,
        format: "qcm" as const,
        choices: makeChoices(g.decoupe, g.faux),
        expected: [g.decoupe],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les mots qui vont ensemble se lisent ensemble : on respire entre les groupes, jamais au milieu.",
          "Cherche d'abord de qui on parle, puis ce qu'il fait, puis où.",
          `${g.decoupe} — chaque morceau se tient tout seul. Couper ailleurs casse le sens, et celui qui écoute ne comprend plus.`,
          `On respire ainsi : ${g.decoupe}`,
        ),
      };
    },
  },

  /* =========================================================
     CP_VOIX_EXPRESSIVE
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_voix_expressive_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "lecture_voix_haute",
    microId: "cp_voix_expressive",
    difficulty: 3,
    theme: "neutral",
    text: "Dans l'histoire, l'ogre dit : « Qui a mangé mon gâteau ? »\n\nComment lis-tu cette phrase ?",
    format: "qcm",
    choices: [
      "avec une grosse voix, en montant à la fin",
      "avec une toute petite voix très douce",
      "en chuchotant, comme pour un secret",
      "sans changer de voix, comme le reste",
    ],
    expected: ["avec une grosse voix, en montant à la fin"],
    comparator: "mcq_exact",
    hint: "Deux choses à mettre dans la voix : qui parle, et le signe de la fin.",
    explanation: exp(
      "Lire de façon expressive, c'est faire entendre qui parle et ce qu'il ressent.",
      "Demande-toi qui parle, comment il se sent, puis regarde le signe de la fin.",
      "C'est l'ogre : il est énorme et il est fâché. Et c'est une question : la voix monte au bout.",
      "On lit avec une grosse voix en colère, et en montant à la fin.",
    ),
    tags: ["cp", "voix-haute", "expressive", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "cp_voix_expressive_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "lecture_voix_haute",
    microId: "cp_voix_expressive",
    difficulty: 2,
    theme: "neutral",
    hint: "Qui parle ? La voix change avec le personnage.",
    tags: ["cp", "voix-haute", "expressive", "template"],
    generate: () => {
      const p = randomChoice(PERSONNAGES);
      const voix: Record<string, string> = {
        "le loup": "une voix grave et menaçante",
        "la fée": "une voix douce et légère",
        "l'ogre": "une voix énorme et forte",
        "la sorcière": "une voix grinçante",
        "le héros": "une voix décidée",
        "le roi": "une voix qui commande",
        "le géant": "une voix qui fait trembler",
        "le dragon": "une voix rauque",
        "la princesse": "une voix claire et polie",
        "la grand-mère": "une voix lente et tranquille",
        "le pirate": "une voix rude, qui crie par-dessus le vent",
        "le renard": "une voix douce et flatteuse",
        "le lutin": "une petite voix rapide",
        "le chevalier": "une voix droite, qui ne tremble pas",
      };
      const bonne = voix[p.type];
      const autres = shuffle(Object.values(voix).filter((v) => v !== bonne)).slice(0, 3);
      return {
        text: `Dans l'histoire, c'est ${p.type} qui parle. Quelle voix prends-tu ?`,
        format: "qcm" as const,
        choices: makeChoices(bonne, autres),
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Faire parler un personnage, c'est lui prêter une voix qui lui ressemble.",
          "Demande-toi comment il est, puis essaie la voix avant de lire devant les autres.",
          `${p.type.charAt(0).toUpperCase() + p.type.slice(1)} : ${p.indices}. Il lui faut ${bonne}.`,
          `On prend ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_LECT_TYPES_PERSONNAGES
  ========================================================= */
  {
    kind: "template",
    id: "cp_lect_types_personnages_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "cp_lect_types_personnages",
    difficulty: 2,
    theme: "neutral",
    hint: "Ces personnages reviennent d'une histoire à l'autre. Tu les connais déjà.",
    tags: ["cp", "devenir-lecteur", "personnages", "template"],
    generate: () => {
      const p = randomChoice(PERSONNAGES);
      return {
        text: `Dans une histoire, un personnage : ${p.indices}. Qui est-ce ?`,
        format: "qcm" as const,
        choices: makeChoices(p.type, p.faux),
        expected: [p.type],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Certains personnages reviennent d'une histoire à l'autre : on les reconnait à ce qu'ils font et à ce qu'ils ont.",
          "Cherche les indices : ce qu'il possède, ce qu'il veut, ce qu'il fait peur ou non.",
          `${p.indices} — c'est ${p.type}, et tu l'as déjà croisé dans d'autres livres.`,
          `C'est ${p.type}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_LECT_NARRATIF_INFORMATIF
  ========================================================= */
  {
    kind: "template",
    id: "cp_lect_narratif_informatif_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "cp_lect_narratif_informatif",
    difficulty: 3,
    theme: "neutral",
    hint: "Est-ce qu'il se passe quelque chose, ou est-ce qu'on t'apprend quelque chose ?",
    tags: ["cp", "devenir-lecteur", "types-textes", "template"],
    generate: () => {
      const [texte, type] = randomChoice(TEXTES_TYPE);
      return {
        text: `« ${texte} »\n\nQuel genre de texte est-ce ?`,
        format: "qcm" as const,
        choices: shuffle(["un texte qui raconte", "un texte qui informe"]),
        expected: [type],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un texte peut raconter une histoire, ou apprendre quelque chose de vrai.",
          "Demande-toi : est-ce qu'il se passe quelque chose, ou est-ce qu'on t'explique comment c'est ?",
          type === "un texte qui raconte"
            ? `« ${texte} » : il arrive quelque chose, à quelqu'un, à un moment.`
            : `« ${texte} » : rien n'arrive — on t'apprend comment c'est, pour de vrai.`,
          `C'est ${type}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_lect_narratif_informatif_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "cp_lect_narratif_informatif",
    difficulty: 3,
    theme: "neutral",
    text: "Dans quel livre irais-tu chercher pour savoir ce que mange un margouillat ?",
    format: "qcm",
    choices: [
      "un documentaire sur les animaux",
      "un conte de fées",
      "un recueil de poèmes",
      "un roman d'aventure",
    ],
    expected: ["un documentaire sur les animaux"],
    comparator: "mcq_exact",
    hint: "Tu cherches quelque chose de vrai, pas une histoire.",
    explanation: exp(
      "On ne choisit pas un livre au hasard : on le choisit selon ce qu'on cherche.",
      "Demande-toi si tu veux une histoire, ou une information vraie.",
      "Un conte peut mettre en scène un margouillat qui parle — il ne te dira pas ce qu'il mange pour de vrai. Le documentaire, si.",
      "On va chercher dans un documentaire sur les animaux.",
    ),
    tags: ["cp", "devenir-lecteur", "types-textes", "methode", "qcm"],
  },

  /* =========================================================
     CP_VOIX_30_MOTS — le repère chiffré de fin d'année
     « Lire après préparation un texte adapté à son niveau de lecture avec
       une vitesse de 30 mots par minute au minimum sans préparation,
       50 après préparation. »
  ========================================================= */
  {
    kind: "template",
    id: "cp_voix_30_mots_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "lecture_voix_haute",
    microId: "cp_voix_30_mots",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare les deux nombres, puis conclus. Les deux doivent aller ensemble.",
    tags: ["cp", "voix-haute", "30-mots", "template"],
    generate: () => {
      const v = randomChoice(VITESSES);
      const atteint = v.mots >= 30;
      const bon = atteint
        ? `oui, ${v.mots} est plus grand que 30`
        : `non, ${v.mots} est plus petit que 30`;
      return {
        text: `En fin de CP, il faut lire au moins 30 mots par minute sans avoir préparé le texte.\n\n${v.prenom} lit ${v.mots} mots en une minute. L'objectif est-il atteint ?`,
        format: "qcm" as const,
        choices: shuffle([
          `oui, ${v.mots} est plus grand que 30`,
          `oui, ${v.mots} est plus petit que 30`,
          `non, ${v.mots} est plus grand que 30`,
          `non, ${v.mots} est plus petit que 30`,
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'objectif de fin de CP est de trente mots par minute, lus correctement, sur un texte qu'on n'a pas préparé.",
          "Compare d'abord les deux nombres, puis dis oui ou non. La réponse n'est juste que si les deux morceaux le sont.",
          `${v.mots} est ${atteint ? "plus grand" : "plus petit"} que 30, donc l'objectif ${atteint ? "est atteint" : "n'est pas encore atteint"}.`,
          bon.charAt(0).toUpperCase() + bon.slice(1) + ".",
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_voix_30_mots_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "lecture_voix_haute",
    microId: "cp_voix_30_mots",
    difficulty: 3,
    theme: "neutral",
    hint: "Il y a deux objectifs, et l'un est plus haut que l'autre.",
    tags: ["cp", "voix-haute", "30-mots", "preparation", "template"],
    generate: () => {
      const v = randomChoice(VITESSES);
      const LES_DEUX = "les deux : les 30 mots sans préparation et les 50 après préparation";
      const TRENTE = "seulement les 30 mots sans préparation";
      const CINQUANTE = "seulement les 50 mots après préparation";
      const AUCUN = "aucun des deux : il faut d'abord arriver à 30";
      const bon = v.mots >= 50 ? LES_DEUX : v.mots >= 30 ? TRENTE : AUCUN;
      return {
        text: `En fin de CP, il faut lire 30 mots par minute sur un texte qu'on n'a pas préparé, et 50 sur un texte qu'on a préparé.\n\n${v.prenom} lit ${v.mots} mots en une minute. Quel objectif est atteint ?`,
        format: "qcm" as const,
        choices: shuffle([LES_DEUX, TRENTE, CINQUANTE, AUCUN]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le BO donne deux repères pour la fin du CP : 30 mots par minute sans préparation, 50 après préparation. Préparer un texte, c'est l'avoir déjà lu une ou deux fois.",
          "Place le nombre par rapport à 30, puis par rapport à 50.",
          v.mots >= 50
            ? `${v.mots} dépasse 50, donc il dépasse aussi 30 : les deux objectifs sont atteints.`
            : v.mots >= 30
              ? `${v.mots} dépasse 30 mais pas 50 : seul le premier objectif est atteint. Passer 50 ne peut pas arriver avant de passer 30.`
              : `${v.mots} n'atteint pas encore 30, donc aucun des deux. Cela vient en lisant tous les jours.`,
          `${bon.charAt(0).toUpperCase()}${bon.slice(1)}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_voix_30_mots_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "lecture_voix_haute",
    microId: "cp_voix_30_mots",
    difficulty: 3,
    theme: "neutral",
    text: "Tu lis 22 mots en une minute, et l'objectif de fin de CP est de 30.\n\nQue fais-tu pour progresser ?",
    format: "qcm",
    choices: [
      "relire chaque jour un texte court à voix haute",
      "lire le plus vite possible, même sans comprendre",
      "sauter les mots difficiles pour gagner du temps",
      "attendre le CE1, où cela viendra tout seul",
    ],
    expected: ["relire chaque jour un texte court à voix haute"],
    comparator: "mcq_exact",
    hint: "La vitesse vient de la répétition, pas de la précipitation.",
    explanation: exp(
      "Lire vite n'est pas le but : c'est ce qui arrive quand les mots ne demandent plus d'effort. Le BO dit « s'entrainer à lire des textes déchiffrables de manière à automatiser sa lecture ».",
      "Prends un texte court, relis-le à voix haute chaque jour, jusqu'à ne plus avoir à déchiffrer.",
      "Se dépêcher fait sauter des mots, et un texte dont on a sauté les mots ne veut plus rien dire. Sauter les mots difficiles, c'est justement laisser de côté ceux qui feraient progresser.",
      "On relit chaque jour un texte court à voix haute, jusqu'à ce qu'il vienne tout seul.",
    ),
    tags: ["cp", "voix-haute", "30-mots", "methode", "qcm"],
  },

  /* =========================================================
     CP_LECT_SORTES_DE_LIVRES — « 5 à 10 œuvres complètes et VARIÉES »
  ========================================================= */
  {
    kind: "template",
    id: "cp_lect_sortes_de_livres_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "cp_lect_sortes_de_livres",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde la forme du livre, pas ce qu'il raconte.",
    tags: ["cp", "devenir-lecteur", "sortes-de-livres", "template"],
    generate: () => {
      const s = randomChoice(SORTES_LIVRES);
      return {
        text: `Dans ce livre, ${s.indice}.\n\nQuelle sorte de livre est-ce ?`,
        format: "qcm" as const,
        choices: makeChoices(s.sorte, TOUTES_SORTES),
        expected: [s.sorte],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Dans une année, on lit plusieurs sortes de livres : des albums, des contes, des fables, des poèmes, des pièces de théâtre, des documentaires et des romans. Chacune se reconnait à sa forme.",
          "Ne regarde pas de quoi ça parle : regarde comment c'est fait, et à quoi ça sert.",
          `${s.indice.charAt(0).toUpperCase()}${s.indice.slice(1)} : c'est ${s.sorte}.`,
          `C'est ${s.sorte}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_LECT_CHOISIR_LIVRE — « aller vers les livres et en choisir à titre
     personnel »
  ========================================================= */
  {
    kind: "template",
    id: "cp_lect_choisir_livre_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "cp_lect_choisir_livre",
    difficulty: 2,
    theme: "neutral",
    hint: "Pars de ce qu'il veut, pas du livre le plus joli.",
    tags: ["cp", "devenir-lecteur", "choisir", "template"],
    generate: () => {
      const g = randomChoice(GOUTS);
      return {
        text: `${g.prenom} ${g.gout}.\n\nQuel livre lui faut-il ?`,
        format: "qcm" as const,
        choices: makeChoices(g.livre, TOUS_LIVRES),
        expected: [g.livre],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Choisir un livre, ce n'est pas prendre celui qui est devant soi : c'est partir de ce qu'on a envie de savoir ou de vivre.",
          "Dis d'abord ce que tu cherches, puis cherche le livre qui répond à cela.",
          `${g.prenom} ${g.gout} : il lui faut ${g.livre}. Les autres sont de vrais livres, mais ils ne répondent pas à cette envie-là.`,
          `Il lui faut ${g.livre}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_lect_choisir_livre_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "cp_lect_choisir_livre",
    difficulty: 3,
    theme: "neutral",
    text: "Tu es devant l'étagère et tu ne sais pas quoi prendre.\n\nQue fais-tu ?",
    format: "qcm",
    choices: [
      "tu cherches un livre qui parle de ce qui t'intéresse",
      "tu prends le plus mince pour le finir très vite",
      "tu prends le même livre que ton voisin de table",
      "tu prends celui qui est le plus près de ta main",
    ],
    expected: ["tu cherches un livre qui parle de ce qui t'intéresse"],
    comparator: "mcq_exact",
    hint: "Le choix commence dans ta tête, pas sur l'étagère.",
    explanation: exp(
      "Aller vers les livres, c'est apprendre à en choisir un pour soi — pas parce qu'il est là.",
      "Commence par ce qui t'intéresse : les animaux, la mer, les histoires qui font peur, les blagues. Puis cherche ce qui en parle.",
      "Prendre le plus mince, ou le même que le voisin, c'est laisser quelqu'un d'autre choisir à ta place — et le livre finit souvent inachevé.",
      "On part de ce qui nous intéresse, puis on cherche un livre qui en parle.",
    ),
    tags: ["cp", "devenir-lecteur", "choisir", "methode", "qcm"],
  },

  /* =========================================================
     CP_LECT_RELIER_LECTURES — la mise en réseau
  ========================================================= */
  {
    kind: "template",
    id: "cp_lect_relier_lectures_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "cp_lect_relier_lectures",
    difficulty: 3,
    theme: "neutral",
    hint: "Le point commun doit être vrai des DEUX histoires, pas d'une seule.",
    tags: ["cp", "devenir-lecteur", "reseau", "template"],
    generate: () => {
      const p = randomChoice(PAIRES);
      return {
        text: `Tu as lu deux histoires.\n\nDans la première, ${p.a}.\nDans la seconde, ${p.b}.\n\nQu'est-ce qu'elles ont en commun ?`,
        format: "qcm" as const,
        choices: makeChoices(p.commun, p.faux),
        expected: [p.commun],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Relier deux lectures, c'est trouver ce qui se retrouve dans les deux : le genre de personnage, ce qui lui arrive, ou la leçon.",
          "Vérifie chaque proposition sur la première histoire, PUIS sur la seconde. Si elle n'est vraie que d'une seule, ce n'est pas un point commun.",
          `Ici : ${p.commun}. Les autres propositions sont vraies d'une histoire seulement — c'est le piège, et c'est l'erreur qu'on fait quand on ne relit que celle qu'on a préférée.`,
          `Elles ont ceci en commun : ${p.commun}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_lect_relier_lectures_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "cp_lect_relier_lectures",
    difficulty: 2,
    theme: "neutral",
    text: "Tu viens de finir un livre.\n\nComment fais-tu pour le relier à ce que tu as déjà lu ?",
    format: "qcm",
    choices: [
      "tu cherches ce qui ressemble à une autre histoire",
      "tu regardes si les deux couvertures se ressemblent",
      "tu comptes les pages pour voir lequel est le plus long",
      "tu gardes seulement celui que tu as préféré des deux",
    ],
    expected: ["tu cherches ce qui ressemble à une autre histoire"],
    comparator: "mcq_exact",
    hint: "On relie par ce qui est DANS l'histoire, pas par l'objet.",
    explanation: exp(
      "Les livres qu'on a lus ne restent pas chacun dans son coin : ils se répondent. C'est cela, se faire une mémoire de lecteur.",
      "Après un livre, demande-toi : ce personnage, cet endroit, ce qui arrive à la fin — où l'ai-je déjà rencontré ?",
      "La couleur de la couverture et le nombre de pages ne disent rien de l'histoire. Deux livres qui ne se ressemblent pas du tout peuvent raconter la même chose.",
      "On cherche ce qui ressemble à une autre histoire : le personnage, le lieu, ou ce qui arrive.",
    ),
    tags: ["cp", "devenir-lecteur", "reseau", "methode", "qcm"],
  },

  /* =========================================================
     CP_LECT_LIEUX_LECTURE — « fréquenter des lieux de lecture, rencontrer
     des acteurs du livre »
  ========================================================= */
  {
    kind: "template",
    id: "cp_lect_lieux_lecture_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "cp_lect_lieux_lecture",
    difficulty: 2,
    theme: "neutral",
    hint: "Une bibliothèque, ça se partage : les livres y retournent toujours.",
    tags: ["cp", "devenir-lecteur", "bibliotheque", "template"],
    generate: () => {
      const l = randomChoice(LIEUX);
      // Les lignes qui nomment un métier ou un lieu posent déjà leur question ;
      // les autres décrivent une situation, et il faut la leur poser.
      const enonce = l.situation.endsWith("?")
        ? l.situation
        : `${l.situation}\n\nQue fais-tu ?`;
      return {
        text: enonce,
        format: "qcm" as const,
        choices: makeChoices(l.bon, l.faux),
        expected: [l.bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une bibliothèque n'est à personne et elle est à tout le monde : les livres y sont prêtés, puis ils reviennent. Autour d'eux travaillent des gens — l'auteur qui écrit, l'illustrateur qui dessine, le libraire qui vend, le bibliothécaire qui prête et conseille.",
          "Demande-toi ce qui permettra au livre suivant d'arriver entre les mains d'un autre enfant.",
          `${l.situation} → ${l.bon}.`,
          `${l.bon.charAt(0).toUpperCase()}${l.bon.slice(1)}.`,
        ),
      };
    },
  },

  /* ═══════════════════════════════════════════════════════════════════════
     LES SECONDS ITEMS (20/08/2026)
     ---------------------------------------------------------------------
     Huit micros de ce fichier portaient UN SEUL item : le coach en mode
     complet oppose deux énoncés, et sous deux items la ligne cliquée ouvrait
     celle du voisin, sans rien signaler. Mesuré : cp/francais rendait 78/96.
     ⭐ Un second item se fabrique par CONTRASTE. Chacun prend ici le chemin
     inverse de son premier.
     ⚠️ Le `notionId` de chaque item est RECOPIÉ sur son voisin, jamais deviné :
     au CP la notion s'appelle `copie`, au CE1 `copie_fluente`. Deux items dont
     un seul est bien rangé valent un seul item, et la ligne se détourne quand
     même.
     ═══════════════════════════════════════════════════════════════════════ */

  {
    kind: "template",
    id: "cp_oral_ecouter_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "cp_oral_ecouter",
    difficulty: 2,
    theme: "neutral",
    hint: "Ce qu'il fallait retenir est donné. Cherche le message d'où cela vient.",
    tags: ["cp", "oral", "ecouter", "template"],
    generate: () => {
      const m = randomChoice(MESSAGES);
      const debutDe = (x: Message) => `${x.texte.split(". ")[0]}.`;
      const autres = shuffle(MESSAGES.filter((x) => x.texte !== m.texte))
        .slice(0, 3)
        .map(debutDe);
      return {
        text: `Tu as retenu ceci : « ${m.info} »\n\nQuel message t'a-t-on lu ?`,
        format: "qcm" as const,
        choices: makeChoices(debutDe(m), autres),
        expected: [debutDe(m)],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Écouter pour comprendre, c'est relier ce qu'on retient à ce qui a été dit. Si on ne retrouve plus d'où vient l'information, c'est qu'on ne l'a pas vraiment écoutée.",
          "Le premier exercice partait du message pour trouver ce qu'il fallait retenir. Celui-ci fait l'inverse : pars de ce que tu as retenu, et cherche le message qui le disait.",
          `« ${m.info} » vient de : « ${debutDe(m)} »`,
          `C'est ce message : « ${debutDe(m)} »`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cp_oral_reformuler_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "cp_oral_reformuler",
    difficulty: 2,
    theme: "neutral",
    hint: "La reformulation est donnée. Cherche la phrase qu'elle redit.",
    tags: ["cp", "oral", "reformuler", "template"],
    generate: () => {
      const r = randomChoice(REFORMULATIONS);
      const autres = shuffle(REFORMULATIONS.filter((x) => x.phrase !== r.phrase))
        .slice(0, 3)
        .map((x) => x.phrase);
      return {
        text: `Un élève redit une phrase avec ses mots :\n\n« ${r.bonne} »\n\nQuelle phrase avait-il entendue ?`,
        format: "qcm" as const,
        choices: makeChoices(r.phrase, autres),
        expected: [r.phrase],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Reformuler, c'est redire la même chose autrement. Les mots changent, ce qui est dit ne change pas — c'est à cela qu'on retrouve la phrase de départ.",
          "Le premier exercice partait de la phrase pour choisir la reformulation. Celui-ci fait l'inverse : lis la reformulation, et cherche la phrase qui dit exactement la même chose.",
          `« ${r.bonne} » redit : « ${r.phrase} »`,
          `Il avait entendu : « ${r.phrase} »`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cp_oral_niveau_langue_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "cp_oral_niveau_langue",
    difficulty: 2,
    theme: "neutral",
    hint: "La phrase de la classe est donnée. Comment la dirait-on dans la cour ?",
    tags: ["cp", "oral", "registre", "template"],
    generate: () => {
      const r = randomChoice(REGISTRES);
      const autres = shuffle(REGISTRES.filter((x) => x.cour !== r.cour))
        .slice(0, 3)
        .map((x) => x.cour);
      return {
        text: `À la maitresse, on dit : « ${r.classe} »\n\nComment le dit-on entre copains, dans la cour ?`,
        format: "qcm" as const,
        choices: makeChoices(r.cour, autres),
        expected: [r.cour],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "On ne parle pas de la même façon à un copain et à la maitresse. Les deux façons sont bonnes — chacune à sa place.",
          "Le premier exercice allait de la cour vers la classe. Celui-ci fait le chemin inverse : cherche la façon rapide, celle qu'on emploie entre copains.",
          `« ${r.classe} » se dit « ${r.cour} » dans la cour.`,
          `On dit : « ${r.cour} »`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cp_voix_ponctuation_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "lecture_voix_haute",
    microId: "cp_voix_ponctuation",
    difficulty: 2,
    theme: "neutral",
    hint: "Ce que fait la voix est décrit. Cherche la phrase qui la fait faire cela.",
    tags: ["cp", "voix", "ponctuation", "template"],
    generate: () => {
      const p = randomChoice(PHRASES_VOIX);
      /* Les leurres portent un AUTRE signe : une seule phrase fait faire cela
         à la voix. */
      const autres = shuffle(PHRASES_VOIX.filter((x) => x.signe !== p.signe))
        .slice(0, 3)
        .map((x) => x.phrase);
      return {
        text: `En lisant à voix haute, ${p.voix}.\n\nLaquelle de ces phrases lis-tu ?`,
        format: "qcm" as const,
        choices: makeChoices(p.phrase, autres),
        expected: [p.phrase],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le signe de la fin commande la voix : le point la fait descendre, le point d'interrogation la fait monter, le point d'exclamation lui donne de la force.",
          "Le premier exercice partait de la phrase pour dire ce que fait la voix. Celui-ci fait l'inverse : regarde le dernier signe de chaque phrase.",
          `« ${p.phrase} » finit par ${p.signe} : ${p.voix}.`,
          `C'est « ${p.phrase} »`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cp_voix_groupes_mots_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "lecture_voix_haute",
    microId: "cp_voix_groupes_mots",
    difficulty: 2,
    theme: "neutral",
    hint: "On respire après un paquet de mots qui va ensemble.",
    tags: ["cp", "voix", "groupes", "template"],
    generate: () => {
      const g = randomChoice(GROUPES);
      const debut = (v: string) => v.split(" / ")[0].trim();
      const bon = debut(g.decoupe);
      /* On écarte le leurre « (sans respirer) », qui ne porte pas de barre :
         son « premier groupe » serait la phrase entière. */
      const autres = g.faux
        .filter((f) => f.includes(" / "))
        .map(debut)
        .filter((d) => d !== bon);
      return {
        text: `Tu lis cette phrase à voix haute :\n\n« ${g.phrase} »\n\nAprès quels mots respires-tu la première fois ?`,
        format: "qcm" as const,
        choices: makeChoices(bon, [...autres, g.phrase.replace(/\.$/, "")]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "On respire APRÈS un paquet de mots qui va ensemble, jamais au milieu. Le premier paquet dit de qui ou de quoi on parle.",
          "Le premier exercice demandait le découpage entier. Celui-ci ne demande que la première pause : lis tout bas et arrête-toi là où la phrase tient encore debout.",
          `« ${g.decoupe} » : on respire après « ${bon} ».`,
          `On respire après « ${bon} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cp_lect_types_personnages_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "cp_lect_types_personnages",
    difficulty: 2,
    theme: "neutral",
    hint: "Le personnage est nommé. Cherche à quoi on le reconnait.",
    tags: ["cp", "devenir-lecteur", "personnages", "template"],
    generate: () => {
      const p = randomChoice(PERSONNAGES);
      const autres = shuffle(PERSONNAGES.filter((x) => x.type !== p.type))
        .slice(0, 3)
        .map((x) => x.indices);
      return {
        text: `Dans une histoire, tu rencontres ${p.type}.\n\nÀ quoi le reconnais-tu ?`,
        format: "qcm" as const,
        choices: makeChoices(p.indices, autres),
        expected: [p.indices],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les personnages des histoires reviennent d'un livre à l'autre, et chacun a ses signes : ce qu'il porte, ce qu'il fait, où il vit.",
          "Le premier exercice partait des signes pour nommer le personnage. Celui-ci fait l'inverse : le personnage est donné, retrouve ses signes.",
          `${p.type.charAt(0).toUpperCase()}${p.type.slice(1)} : ${p.indices}.`,
          `${p.indices.charAt(0).toUpperCase()}${p.indices.slice(1)}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cp_lect_sortes_de_livres_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "cp_lect_sortes_de_livres",
    difficulty: 2,
    theme: "neutral",
    hint: "La sorte de livre est donnée. Cherche ce qu'on y voit.",
    tags: ["cp", "devenir-lecteur", "sortes", "template"],
    generate: () => {
      const s = randomChoice(SORTES_LIVRES);
      /* ⛔ Chaque sorte porte DEUX indices dans la table : les leurres doivent
         venir d'une AUTRE sorte, sinon le second indice de la même sorte serait
         servi comme piège alors qu'il est juste. */
      const autres = shuffle(SORTES_LIVRES.filter((x) => x.sorte !== s.sorte))
        .slice(0, 3)
        .map((x) => x.indice);
      return {
        text: `Tu ouvres ${s.sorte}.\n\nQu'est-ce que tu y vois ?`,
        format: "qcm" as const,
        choices: makeChoices(s.indice, autres),
        expected: [s.indice],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Chaque sorte de livre se reconnait à ce qu'on y voit : les grandes images de l'album, les vers du poème, les noms devant les phrases au théâtre, les photos du documentaire.",
          "Le premier exercice partait de ce qu'on voit pour nommer la sorte. Celui-ci fait l'inverse : la sorte est donnée, retrouve ce qu'on y trouve.",
          `Dans ${s.sorte}, ${s.indice}.`,
          `${s.indice.charAt(0).toUpperCase()}${s.indice.slice(1)}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cp_lect_lieux_lecture_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "cp_lect_lieux_lecture",
    difficulty: 2,
    theme: "neutral",
    hint: "Le bon geste est donné. Dans quel moment le fait-on ?",
    tags: ["cp", "devenir-lecteur", "lieux", "template"],
    generate: () => {
      /* On ne garde que les lignes dont la situation est une SCÈNE : celles qui
         posent déjà une question (« Comment appelle-t-on… ? ») ne peuvent pas
         servir de proposition ici. */
      const scenes = LIEUX.filter((x) => !x.situation.endsWith("?"));
      const l = randomChoice(scenes);
      const autres = shuffle(scenes.filter((x) => x.situation !== l.situation))
        .slice(0, 3)
        .map((x) => x.situation);
      return {
        text: `À la bibliothèque, le bon geste est : ${l.bon}.\n\nDans quel moment ?`,
        format: "qcm" as const,
        choices: makeChoices(l.situation, autres),
        expected: [l.situation],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une bibliothèque marche parce que chacun y fait le geste qu'il faut, au moment où il faut : enregistrer, rapporter, demander de l'aide.",
          "Le premier exercice partait du moment pour trouver le geste. Celui-ci fait l'inverse : le geste est donné, cherche quand il sert.",
          `${l.situation} → ${l.bon}.`,
          `C'est ce moment : ${l.situation}`,
        ),
      };
    },
  },
];
