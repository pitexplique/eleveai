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
//   pour faire parler tel ou tel personnage. »
//   DEVENIR LECTEUR — « Repérer et reconnaitre des types de personnages » ;
//   « Il différencie le type narratif du type informatif » ; 5 à 10 œuvres
//   complètes dans l'année.
//
// ⚠️ CE QUE LE COACH NE PEUT PAS FAIRE, et qu'il ne prétend pas faire : il
// n'entend pas l'élève. La fluence se mesure au chronomètre par le professeur
// — 30 mots par minute sans préparation, 50 après —, l'articulation s'écoute,
// et le respect des règles d'échange se vit à plusieurs. Ce qui est ici, c'est
// ce qui se RÉFLÉCHIT : où s'arrête la voix, quel mot enchaine deux idées,
// pourquoi on ne parle pas pareil en classe et dans la cour.
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
  {
    phrase: "Le margouillat s'est faufilé entre deux pierres et a disparu.",
    bonne: "Le margouillat est passé entre les pierres et on ne le voit plus.",
    faux: ["Le margouillat a mangé deux pierres.", "Les pierres ont bougé toutes seules.", "Le margouillat dort sur une pierre."],
  },
  {
    phrase: "Léa a rangé toutes ses affaires avant de partir.",
    bonne: "Léa a tout rangé, puis elle est partie.",
    faux: ["Léa est partie sans rien ranger.", "Léa range ses affaires demain.", "Léa a rangé les affaires de Tom."],
  },
  {
    phrase: "Papa a mis la marmite sur le feu et l'odeur du cari a rempli la case.",
    bonne: "Papa fait cuire le cari et ça sent bon partout dans la case.",
    faux: ["Papa a éteint le feu.", "La case sent le gâteau.", "Papa mange le cari dehors."],
  },
  {
    phrase: "Le bateau a quitté le port au lever du jour.",
    bonne: "Le bateau est parti tôt le matin.",
    faux: ["Le bateau est resté au port.", "Le bateau est parti la nuit.", "Le port a fermé."],
  },
  {
    phrase: "Les élèves ont regagné la salle dès que la cloche a retenti.",
    bonne: "Les élèves sont rentrés en classe quand la cloche a sonné.",
    faux: ["Les élèves sont sortis dans la cour.", "La cloche n'a pas sonné.", "Les élèves sont restés dehors."],
  },
  {
    phrase: "Le vent s'est levé et les nuages ont recouvert le piton.",
    bonne: "Il y a du vent et on ne voit plus le piton.",
    faux: ["Le piton a disparu pour toujours.", "Il fait grand soleil sur le piton.", "Le vent a soufflé les nuages au loin."],
  },
  {
    phrase: "Tom a réussi son exercice du premier coup.",
    bonne: "Tom a trouvé la réponse tout de suite.",
    faux: ["Tom a raté son exercice.", "Tom a recommencé plusieurs fois.", "Tom n'a pas fait l'exercice."],
  },
  {
    phrase: "La maitresse a distribué les cahiers avant de commencer la leçon.",
    bonne: "La maitresse a donné les cahiers, puis la leçon a commencé.",
    faux: ["La leçon a commencé avant les cahiers.", "La maitresse a ramassé les cahiers.", "Il n'y a pas eu de leçon."],
  },
  {
    phrase: "Nina a cherché son crayon partout sans le trouver.",
    bonne: "Nina a beaucoup cherché son crayon, mais il reste introuvable.",
    faux: ["Nina a retrouvé son crayon.", "Nina n'a pas cherché.", "Nina a perdu sa trousse."],
  },
];

const CONNECTEURS: readonly Connecteur[] = [
  { debut: "Tom a mis son chapeau", suite: "il fait très chaud", mot: "parce que", role: "donner la raison" },
  { debut: "Léa a fini son travail", suite: "elle est allée jouer", mot: "alors", role: "dire ce qui arrive après" },
  { debut: "On casse les œufs", suite: "on ajoute le sucre", mot: "ensuite", role: "mettre les étapes dans l'ordre" },
  { debut: "Le chien aboie", suite: "quelqu'un frappe à la porte", mot: "parce que", role: "donner la raison" },
  { debut: "La cloche a sonné", suite: "les élèves sont sortis", mot: "alors", role: "dire ce qui arrive après" },
  { debut: "Nina a pris son parapluie", suite: "il pleut", mot: "parce que", role: "donner la raison" },
  { debut: "On lave la mangue", suite: "on la coupe en morceaux", mot: "ensuite", role: "mettre les étapes dans l'ordre" },
  { debut: "Le bateau est rentré", suite: "la mer était trop forte", mot: "parce que", role: "donner la raison" },
  { debut: "Tom a fini de ranger", suite: "il est sorti jouer", mot: "alors", role: "dire ce qui arrive après" },
  { debut: "On creuse un trou", suite: "on pose la graine dedans", mot: "ensuite", role: "mettre les étapes dans l'ordre" },
  { debut: "Léa a mis ses bottes", suite: "le chemin est plein de boue", mot: "parce que", role: "donner la raison" },
  { debut: "Le feu est allumé", suite: "papa pose la marmite", mot: "ensuite", role: "mettre les étapes dans l'ordre" },
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
    hint: "Quel petit mot relie les deux morceaux : la raison, ou la suite ?",
    tags: ["cp", "oral", "raconter", "template"],
    generate: () => {
      const c = randomChoice(CONNECTEURS);
      const autres = shuffle([
        ...new Set(CONNECTEURS.filter((x) => x.mot !== c.mot).map((x) => x.mot)),
      ]);
      return {
        text: `Quel petit mot relie ces deux morceaux ?\n\n« ${c.debut} ___ ${c.suite}. »`,
        format: "qcm" as const,
        choices: makeChoices(c.mot, [...autres, "mais"]),
        expected: [c.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Pour raconter, on relie ses idées avec de petits mots : parce que, alors, ensuite.",
          "Demande-toi ce que fait le second morceau : il donne la raison, ou il vient après ?",
          `Ici, le second morceau sert à ${c.role} : c'est « ${c.mot} » qu'il faut.`,
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
      "tu attends qu'il finisse, puis tu dis ce que tu penses",
      "tu parles en même temps que lui",
      "tu dis qu'il a tort tout de suite",
      "tu ne dis rien du tout",
    ],
    expected: ["tu attends qu'il finisse, puis tu dis ce que tu penses"],
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
      "avec une grosse voix en colère, et en montant à la fin",
      "avec une toute petite voix douce",
      "en chuchotant",
      "sans changer de voix, comme le reste",
    ],
    expected: ["avec une grosse voix en colère, et en montant à la fin"],
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
];
