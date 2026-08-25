// lib/tutor-v4/questionBank/3e/francais/vocabulaire.bank.ts
//
// ENRICHIR ET STRUCTURER LE LEXIQUE EN 3e — écrit le 13/08/2026.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020 — celui qui s'applique encore à la
// 3e jusqu'en septembre 2028.
//
// PÉRIMÈTRE : « Enrichir et structurer le lexique », sept attendus, que cinq
// micro-compétences génériques portaient : inférer, relations, formation,
// réemploi, orthographe.
//
// ⭐ CE QUI SÉPARE CETTE BANQUE DE CELLE DE LA 4e : la 4e tient la dérivation,
// les racines gréco-latines, l'intensité, la connotation, la polysémie et la
// construction du verbe. Aucune n'est reprise ici. Les six retenues sont celles
// dont l'ARGUMENTATION de 3e a besoin — le programme attache à cette classe le
// lexique du jugement, des valeurs et de l'engagement, qui est celui de ses
// quatre questionnements littéraires.
// ⛔ Aucun item n'est repris de `4e/francais/vocabulaire.bank.ts`.
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
   1. LES MODALISATEURS
   ---------------------------------------------------------------------------
   Les mots par lesquels celui qui écrit dit à quel point il s'engage sur ce
   qu'il affirme. C'est la compétence lexicale la plus utile de la 3e : elle
   s'entend chaque jour dans la presse et presque personne ne la remarque.
   ⚠️ La ligne « aucun modalisateur » est indispensable : sans elle, l'élève
   apprend qu'une phrase porte toujours une marque de doute ou de certitude, et
   ne sait plus reconnaitre un fait brut.
   ========================================================================== */

const MODALISATEURS: readonly Cas[] = [
  { gauche: "Il est certain que le sentier rouvrira avant juillet.", droite: "il affirme avec certitude : celui qui écrit prend le fait à son compte" },
  { gauche: "Le rapport le prouve indéniablement.", droite: "il affirme avec certitude : celui qui écrit prend le fait à son compte" },
  { gauche: "Sans aucun doute, la mesure a produit son effet.", droite: "il affirme avec certitude : celui qui écrit prend le fait à son compte" },

  { gauche: "Le sentier rouvrira peut-être avant juillet.", droite: "il met en doute : celui qui écrit n'est pas sûr, et le dit" },
  { gauche: "Il semblerait que la mesure ait produit un effet.", droite: "il met en doute : celui qui écrit n'est pas sûr, et le dit" },
  { gauche: "Rien n'est moins sûr que la date annoncée.", droite: "il met en doute : celui qui écrit n'est pas sûr, et le dit" },

  { gauche: "Selon la mairie, le sentier rouvrira avant juillet.", droite: "il rapporte sans garantir : le fait est attribué à quelqu'un d'autre" },
  { gauche: "D'après les riverains, le bruit aurait diminué.", droite: "il rapporte sans garantir : le fait est attribué à quelqu'un d'autre" },
  { gauche: "Le rapport affirme que la mesure a produit son effet.", droite: "il rapporte sans garantir : le fait est attribué à quelqu'un d'autre" },

  { gauche: "Cette décision, heureusement, a été reportée.", droite: "il juge : celui qui écrit dit ce qu'il pense de ce qu'il rapporte" },
  { gauche: "Le chantier avance à un rythme scandaleusement lent.", droite: "il juge : celui qui écrit dit ce qu'il pense de ce qu'il rapporte" },
  { gauche: "On a enfin rouvert le sentier.", droite: "il juge : celui qui écrit dit ce qu'il pense de ce qu'il rapporte" },

  { gauche: "Le sentier a rouvert le 3 juillet.", droite: "aucun modalisateur : la phrase énonce le fait brut" },
  { gauche: "Douze classes ont participé au projet.", droite: "aucun modalisateur : la phrase énonce le fait brut" },
  { gauche: "La collecte a lieu le mardi et le vendredi.", droite: "aucun modalisateur : la phrase énonce le fait brut" },
  { gauche: "Le rapport compte quarante-huit pages.", droite: "aucun modalisateur : la phrase énonce le fait brut" },
];

const TOUS_MODALISATEURS: readonly string[] = [...new Set(MODALISATEURS.map((m) => m.droite))];

/* =============================================================================
   2. LES MOTS QUI NOMMENT DES IDÉES
   ---------------------------------------------------------------------------
   Le lexique des quatre questionnements de 3e : « Agir dans la cité »,
   « Dénoncer les travers de la société ». On n'y discute pas de la liberté sans
   distinguer la liberté de la licence, ni de la justice sans la séparer de la
   vengeance. ⚠️ PAR PAIRES : les deux mots proches se servent de piège l'un à
   l'autre, sinon la question se répondrait sans les distinguer.
   ========================================================================== */

type Notion = { readonly definition: string; readonly juste: string; readonly autres: readonly string[] };

const NOTIONS: readonly Notion[] = [
  { definition: "le fait de traiter tout le monde exactement pareil", juste: "l'égalité", autres: ["l'équité", "la charité", "la fraternité"] },
  { definition: "le fait de traiter chacun selon sa situation, pour compenser les écarts", juste: "l'équité", autres: ["l'égalité", "la charité", "la fraternité"] },
  { definition: "le fait de supporter des idées que l'on n'approuve pas", juste: "la tolérance", autres: ["l'indifférence", "l'approbation", "l'hostilité"] },
  { definition: "le fait de ne pas s'intéresser du tout à ce que pensent les autres", juste: "l'indifférence", autres: ["la tolérance", "l'approbation", "l'hostilité"] },
  { definition: "le sentiment légitime de valoir quelque chose", juste: "la fierté", autres: ["l'orgueil", "la vanité", "la honte"] },
  { definition: "le sentiment excessif de valoir plus que les autres", juste: "l'orgueil", autres: ["la fierté", "la modestie", "la honte"] },
  { definition: "le fait de rendre soi-même le mal que l'on a subi", juste: "la vengeance", autres: ["la justice", "le pardon", "la rancune"] },
  { definition: "le fait de faire trancher un tort par une autorité impartiale", juste: "la justice", autres: ["la vengeance", "la pitié", "la rancune"] },
  { definition: "le pouvoir de faire ce que l'on veut sans nuire à personne", juste: "la liberté", autres: ["la licence", "l'autorité", "l'obéissance"] },
  { definition: "le fait de s'autoriser tout, y compris ce qui nuit aux autres", juste: "la licence", autres: ["la liberté", "la discipline", "la prudence"] },
  { definition: "le fait de prendre parti publiquement pour une cause", juste: "l'engagement", autres: ["la neutralité", "l'indifférence", "l'opinion"] },
  { definition: "le refus délibéré de prendre parti dans un conflit", juste: "la neutralité", autres: ["l'engagement", "la lâcheté", "la révolte"] },
  { definition: "le fait de tenir compte de ce qu'une personne est, et de ne pas y porter atteinte", juste: "le respect", autres: ["la soumission", "la crainte", "l'admiration"] },
  { definition: "le fait d'obéir par peur des conséquences", juste: "la soumission", autres: ["le respect", "la loyauté", "la confiance"] },
  { definition: "le fait de renoncer à punir une faute que l'on a subie", juste: "le pardon", autres: ["la rancune", "la vengeance", "la punition"] },
  { definition: "le fait de garder longtemps le souvenir d'un tort", juste: "la rancune", autres: ["le pardon", "la colère", "la vengeance"] },
];

/* =============================================================================
   3. LA NOMINALISATION
   ---------------------------------------------------------------------------
   Passer du fait à l'idée : c'est ce que font les titres de presse, et c'est ce
   que demande une copie de brevet quand elle doit reprendre un texte sans le
   recopier.
   ⚠️ LES PIÈGES SONT DES MOTS DE LA MÊME FAMILLE, TOUS RÉELS — celui qui
   désigne la personne, celui qui désigne le résultat, celui qui désigne autre
   chose encore. « L'exploit » n'est pas « l'exploitation », « le réflexe »
   n'est pas « la réflexion » : c'est exactement là que l'élève se trompe.
   ========================================================================== */

const NOMINALISATIONS: readonly Notion[] = [
  { definition: "construire", juste: "la construction", autres: ["le constructeur", "la constructibilité", "le constructivisme"] },
  { definition: "juger", juste: "le jugement", autres: ["le juge", "le juré", "la juridiction"] },
  { definition: "produire", juste: "la production", autres: ["le producteur", "le produit", "la productivité"] },
  { definition: "former", juste: "la formation", autres: ["le formateur", "le formulaire", "le formalisme"] },
  { definition: "informer", juste: "l'information", autres: ["l'informateur", "l'informatique", "l'informel"] },
  { definition: "décider", juste: "la décision", autres: ["le décideur", "l'indécision", "le décisionnaire"] },
  { definition: "protéger", juste: "la protection", autres: ["le protecteur", "le protégé", "le protectionnisme"] },
  { definition: "accuser", juste: "l'accusation", autres: ["l'accusateur", "l'accusé", "l'accusatif"] },
  { definition: "exploiter", juste: "l'exploitation", autres: ["l'exploitant", "l'exploiteur", "l'exploit"] },
  { definition: "réfléchir", juste: "la réflexion", autres: ["le réflecteur", "le réflexe", "la réflectivité"] },
  { definition: "polluer", juste: "la pollution", autres: ["le pollueur", "le polluant", "la dépollution"] },
  { definition: "gouverner", juste: "le gouvernement", autres: ["le gouverneur", "la gouvernante", "le gouvernail"] },
  { definition: "traduire", juste: "la traduction", autres: ["le traducteur", "la traductrice", "la traductibilité"] },
  { definition: "émigrer", juste: "l'émigration", autres: ["l'émigrant", "l'émigré", "l'immigration"] },
  { definition: "observer", juste: "l'observation", autres: ["l'observateur", "l'observatoire", "l'observance"] },
  { definition: "hériter", juste: "l'héritage", autres: ["l'héritier", "l'héritière", "l'hérédité"] },
  { definition: "manifester", juste: "la manifestation", autres: ["le manifestant", "le manifeste", "la manifestante"] },
  { definition: "signer", juste: "la signature", autres: ["le signataire", "le signal", "le signe"] },
];

/* =============================================================================
   4. L'EMPLOI FIGURÉ
   ---------------------------------------------------------------------------
   ⚠️ PAR PAIRES là encore, et c'est la seule façon d'y arriver : « il a bu un
   verre » est une métonymie, « elle a bu un verre d'eau fraiche » ne l'est pas.
   Le même mot, deux emplois. Sans la ligne « emploi propre », l'élève apprend
   que tout mot est figuré.
   ========================================================================== */

const FIGURES: readonly Cas[] = [
  { gauche: "Il a essuyé une tempête de reproches.", droite: "une métaphore : on nomme une chose par une autre, sans « comme » ni outil" },
  { gauche: "Ce quartier est un désert le dimanche.", droite: "une métaphore : on nomme une chose par une autre, sans « comme » ni outil" },
  { gauche: "Elle a bâti son argumentation pierre par pierre.", droite: "une métaphore : on nomme une chose par une autre, sans « comme » ni outil" },

  { gauche: "Le sentier montait, raide comme une échelle.", droite: "une comparaison : les deux termes sont là, reliés par « comme » ou « tel »" },
  { gauche: "Il est resté droit tel un piton dans la brume.", droite: "une comparaison : les deux termes sont là, reliés par « comme » ou « tel »" },
  { gauche: "Sa voix, pareille à un galet roulé, râpait un peu.", droite: "une comparaison : les deux termes sont là, reliés par « comme » ou « tel »" },

  { gauche: "La mer s'est mise en colère vers midi.", droite: "une personnification : une chose ou une idée reçoit des traits humains" },
  { gauche: "Le vieux phare veille encore sur la baie.", droite: "une personnification : une chose ou une idée reçoit des traits humains" },
  { gauche: "La ville s'éveille lentement, et bâille.", droite: "une personnification : une chose ou une idée reçoit des traits humains" },

  { gauche: "Toute la salle a applaudi.", droite: "une métonymie : on nomme le contenu par le contenant, ou le tout par la partie" },
  { gauche: "Il a bu un verre avant de repartir.", droite: "une métonymie : on nomme le contenu par le contenant, ou le tout par la partie" },
  { gauche: "La mairie a répondu ce matin.", droite: "une métonymie : on nomme le contenu par le contenant, ou le tout par la partie" },

  { gauche: "Je te l'ai dit mille fois.", droite: "une hyperbole : le mot exagère volontairement, et nul n'y croit" },
  { gauche: "Ce sac pèse une tonne.", droite: "une hyperbole : le mot exagère volontairement, et nul n'y croit" },
  { gauche: "Il a attendu une éternité devant le guichet.", droite: "une hyperbole : le mot exagère volontairement, et nul n'y croit" },

  { gauche: "La mer était calme et l'eau très claire.", droite: "un emploi propre : le mot est employé dans son sens premier, sans image" },
  { gauche: "Le phare se trouve à deux kilomètres du port.", droite: "un emploi propre : le mot est employé dans son sens premier, sans image" },
  { gauche: "Elle a bu un verre d'eau fraiche.", droite: "un emploi propre : le mot est employé dans son sens premier, sans image" },
];

const TOUTES_FIGURES: readonly string[] = [...new Set(FIGURES.map((f) => f.droite))];

/* =============================================================================
   5. CE QU'UN CONNECTEUR FAIT DANS UN RAISONNEMENT
   ---------------------------------------------------------------------------
   ⚠️ Ce n'est pas la même question que celle du rapport logique d'une
   circonstancielle. Ici, le connecteur ne relie pas deux propositions dans une
   phrase : il relie deux MOMENTS d'un raisonnement, et la question est ce qu'il
   fait avancer.
   ========================================================================== */

const CONNECTEURS: readonly Cas[] = [
  { gauche: "De plus, la fréquentation a doublé en cinq ans.", droite: "il ajoute un argument qui va dans le même sens" },
  { gauche: "D'ailleurs, les communes voisines ont fait le même choix.", droite: "il ajoute un argument qui va dans le même sens" },
  { gauche: "Et surtout, personne n'a été consulté.", droite: "il ajoute un argument qui va dans le même sens" },

  { gauche: "En revanche, aucun budget n'a été prévu.", droite: "il oppose : il introduit une objection ou une restriction" },
  { gauche: "Or, les mesures faites au large disent l'inverse.", droite: "il oppose : il introduit une objection ou une restriction" },
  { gauche: "Pourtant, rien n'a changé depuis.", droite: "il oppose : il introduit une objection ou une restriction" },

  { gauche: "Par conséquent, la mesure doit être revue.", droite: "il conclut : il tire la conséquence de ce qui précède" },
  { gauche: "Donc, il faut maintenir la fermeture du sentier.", droite: "il conclut : il tire la conséquence de ce qui précède" },
  { gauche: "Ainsi, le doute n'est plus permis.", droite: "il conclut : il tire la conséquence de ce qui précède" },

  { gauche: "En effet, le corail meurt au-dessus de trente degrés.", droite: "il justifie : il donne la raison de ce qui vient d'être dit" },
  { gauche: "Car la paroi n'a jamais été stabilisée.", droite: "il justifie : il donne la raison de ce qui vient d'être dit" },
  { gauche: "C'est que personne n'avait relu le dossier.", droite: "il justifie : il donne la raison de ce qui vient d'être dit" },

  { gauche: "Par exemple, la classe de 3e B n'a pas eu de manuel.", droite: "il illustre : il annonce un exemple" },
  { gauche: "On le voit à l'Ermitage, où la couverture est passée de 40 % à 15 %.", droite: "il illustre : il annonce un exemple" },
  { gauche: "Notamment dans les hauts, où le car ne passe plus.", droite: "il illustre : il annonce un exemple" },

  { gauche: "Certes, le tourisme fait vivre la côte.", droite: "il concède : il accorde un point avant de reprendre la main" },
  { gauche: "Il est vrai que le téléphone rassure les familles.", droite: "il concède : il accorde un point avant de reprendre la main" },
  { gauche: "Bien sûr, tout ne peut pas être décidé en un jour.", droite: "il concède : il accorde un point avant de reprendre la main" },

  { gauche: "D'abord, la question du budget.", droite: "il classe : il marque une étape dans l'ordre du raisonnement" },
  { gauche: "En second lieu, la sécurité des accès.", droite: "il classe : il marque une étape dans l'ordre du raisonnement" },
  { gauche: "Enfin, il reste la question du calendrier.", droite: "il classe : il marque une étape dans l'ordre du raisonnement" },
];

const TOUS_CONNECTEURS: readonly string[] = [...new Set(CONNECTEURS.map((c) => c.droite))];

/* =============================================================================
   6. L'HISTOIRE DES MOTS
   ---------------------------------------------------------------------------
   « Appréhender la dimension historique du lexique » : un mot ne garde pas son
   sens. Il s'élargit, il se rétrécit, il se dégrade, il se relève, ou il passe
   d'un métier à un autre. Les cinq mouvements se reconnaissent, et savoir les
   reconnaitre fait deviner le sens des mots qu'on n'a jamais lus.
   ⛔ Aucun élément latin ni grec n'est interrogé ici : c'est la 4e qui le fait,
   et on ne lui reprend rien.
   ========================================================================== */

const HISTOIRE: readonly Cas[] = [
  { gauche: "« Panier » désignait une corbeille à pain ; il désigne aujourd'hui tout contenant tressé, et même celui d'un site marchand.", droite: "un élargissement : le mot a fini par désigner beaucoup plus de choses" },
  { gauche: "« Arriver » signifiait « toucher la rive » ; il se dit aujourd'hui de la fin de n'importe quel trajet.", droite: "un élargissement : le mot a fini par désigner beaucoup plus de choses" },
  { gauche: "« Bureau » désignait la bure qui couvrait une table ; il désigne aujourd'hui le meuble, la pièce, et le service entier.", droite: "un élargissement : le mot a fini par désigner beaucoup plus de choses" },

  { gauche: "« Viande » désignait toute nourriture ; il ne désigne plus que la chair des animaux.", droite: "un rétrécissement : le mot ne désigne plus qu'un cas de ce qu'il désignait" },
  { gauche: "« Traire » signifiait « tirer » en général ; il ne se dit plus que du lait.", droite: "un rétrécissement : le mot ne désigne plus qu'un cas de ce qu'il désignait" },
  { gauche: "« Poison » vient d'un mot latin qui désignait toute boisson ; il n'en garde que la boisson mortelle.", droite: "un rétrécissement : le mot ne désigne plus qu'un cas de ce qu'il désignait" },

  { gauche: "« Rustre » vient de « rusticus », qui voulait dire « de la campagne », sans le moindre mépris.", droite: "une péjoration : le mot a pris un sens plus défavorable" },
  { gauche: "« Vilain » désignait le paysan libre du village ; il désigne aujourd'hui ce qui est laid ou méchant.", droite: "une péjoration : le mot a pris un sens plus défavorable" },
  { gauche: "« Idiot » désignait en grec le simple particulier, celui qui n'exerce aucune charge publique.", droite: "une péjoration : le mot a pris un sens plus défavorable" },

  { gauche: "« Formidable » signifiait « qui inspire la terreur » ; il signifie aujourd'hui « remarquable ».", droite: "une amélioration : le mot a pris un sens plus favorable" },
  { gauche: "« Ministre » vient de « minister », le serviteur ; il désigne aujourd'hui un membre du gouvernement.", droite: "une amélioration : le mot a pris un sens plus favorable" },
  { gauche: "« Prestige » a longtemps désigné une illusion de magicien ; il désigne aujourd'hui l'éclat qui impose le respect.", droite: "une amélioration : le mot a pris un sens plus favorable" },

  { gauche: "« Souris » désignait l'animal ; l'informatique l'a repris pour l'objet posé près du clavier.", droite: "un passage d'un domaine à un autre : le mot a été emprunté ailleurs" },
  { gauche: "« Virus » venait de la médecine ; l'informatique l'a repris pour un programme nuisible.", droite: "un passage d'un domaine à un autre : le mot a été emprunté ailleurs" },
  { gauche: "« Toile » venait du tissage ; on l'emploie aujourd'hui pour le réseau mondial.", droite: "un passage d'un domaine à un autre : le mot a été emprunté ailleurs" },
  { gauche: "« Naviguer » venait de la mer ; on navigue aujourd'hui sur internet.", droite: "un passage d'un domaine à un autre : le mot a été emprunté ailleurs" },
];

const TOUTE_HISTOIRE: readonly string[] = [...new Set(HISTOIRE.map((h) => h.droite))];

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
    notionId: "vocabulaire",
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

export const vocabulaire3eBank: TutorBankItemV4[] = [
  gabarit(
    "3e_voc_modalisateurs_tpl_1",
    "3e_voc_modalisateurs",
    MODALISATEURS,
    TOUS_MODALISATEURS,
    "Que fait celui qui écrit, dans cette phrase ?",
    3,
    "Cherche le petit mot qui n'apporte aucun fait : c'est lui qui porte l'engagement.",
    "Un modalisateur est un mot par lequel celui qui écrit dit à quel point il s'engage sur ce qu'il affirme. « Certainement » engage tout ; « peut-être » retient ; « selon la mairie » renvoie la responsabilité à un autre ; « heureusement » ajoute un jugement. Et beaucoup de phrases n'en portent aucun : elles donnent le fait, et rien de plus.",
    "Enlève le mot en question et relis. Si le fait reste exactement le même, ce mot ne servait pas à informer : il servait à dire ce que l'auteur en pense, ou à quel point il y croit.",
    ["3e", "vocabulaire", "modalisateurs", "argumentation", "template"],
  ),
  {
    kind: "template",
    id: "3e_voc_notions_abstraites_tpl_1",
    niveau: "3e",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "3e_voc_notions_abstraites",
    difficulty: 3,
    theme: "neutral",
    hint: "Les quatre mots sont proches. Relis la définition mot à mot : un seul détail les sépare.",
    tags: ["3e", "vocabulaire", "notions", "valeurs", "template"],
    generate: () => {
      const n = randomChoice(NOTIONS);
      return {
        text: `Quel mot désigne exactement ceci :\n\n${n.definition} ?`,
        format: "qcm" as const,
        choices: shuffle([n.juste, ...n.autres]),
        expected: [n.juste],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les mots qui nomment des idées ne sont pas interchangeables, et c'est de leurs écarts que se font les débats. L'égalité traite tout le monde pareil, l'équité tient compte des situations. La justice fait trancher par un tiers, la vengeance se rend elle-même. La liberté s'arrête là où elle nuit, la licence ne s'arrête nulle part.",
          "Ne cherche pas le mot qui « ressemble » : cherche le détail de la définition qu'un seul des quatre mots contient. C'est presque toujours une restriction — « sans nuire », « par une autorité », « selon sa situation ».",
          `${n.definition} : c'est ${n.juste}.`,
          `Le mot est ${n.juste}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "3e_voc_nominalisation_tpl_1",
    niveau: "3e",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "3e_voc_nominalisation",
    difficulty: 3,
    theme: "neutral",
    hint: "Les quatre mots sont de la même famille. Un seul nomme L'ACTION.",
    tags: ["3e", "vocabulaire", "nominalisation", "template"],
    generate: () => {
      const n = randomChoice(NOMINALISATIONS);
      return {
        text: `Quel nom désigne l'ACTION exprimée par le verbe « ${n.definition} » ?`,
        format: "qcm" as const,
        choices: shuffle([n.juste, ...n.autres]),
        expected: [n.juste],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Nominaliser, c'est transformer un verbe en nom pour passer du fait à l'idée. C'est ce que font les titres de presse — « Le sentier a été fermé » devient « Fermeture du sentier » — et c'est ce qu'on demande dans une copie quand il faut reprendre un texte sans le recopier.",
          "Une même famille contient plusieurs noms : celui de l'action, celui de la personne qui agit, celui du résultat, et parfois un mot qui a pris un tout autre sens. Demande-toi lequel pourrait suivre « il y a eu une… » : c'est celui de l'action.",
          `« ${n.definition} » donne ${n.juste} ; les autres nomment la personne, le résultat, ou autre chose encore.`,
          `Le nom d'action est ${n.juste}.`,
        ),
      };
    },
  },
  gabarit(
    "3e_voc_sens_figure_tpl_1",
    "3e_voc_sens_figure",
    FIGURES,
    TOUTES_FIGURES,
    // ⚠️ « Comment le MOT est-il employé ? » supposerait qu'on dise lequel :
    // certaines de ces phrases n'ont aucun mot figuré, et la question porte
    // alors sur la phrase entière.
    "Comment la langue est-elle employée dans cette phrase ?",
    3,
    "Demande-toi d'abord si le mot est employé au sens premier. Souvent, il l'est.",
    "Un mot employé au sens figuré désigne autre chose que ce qu'il désigne d'ordinaire. La métaphore remplace sans prévenir ; la comparaison garde les deux termes et le mot qui les relie ; la personnification prête des traits humains ; la métonymie nomme le contenu par le contenant ou le tout par la partie ; l'hyperbole exagère. Mais un mot peut aussi être employé au sens propre, et il l'est le plus souvent.",
    "Prends la phrase au pied de la lettre. Si elle décrit quelque chose de possible, l'emploi est propre. Si elle décrit l'impossible — une mer en colère, un sac d'une tonne —, cherche quel transfert a eu lieu.",
    ["3e", "vocabulaire", "figures", "sens-figure", "template"],
  ),
  gabarit(
    "3e_voc_connecteurs_tpl_1",
    "3e_voc_connecteurs",
    CONNECTEURS,
    TOUS_CONNECTEURS,
    "Que fait ce connecteur dans le raisonnement ?",
    3,
    "Demande-toi ce qui vient AVANT : le connecteur dit ce qu'on en fait.",
    "Les connecteurs sont les panneaux d'un raisonnement. Certains ajoutent un argument, d'autres opposent une objection, d'autres tirent la conséquence, d'autres donnent la raison, d'autres annoncent un exemple. « Certes » et « il est vrai que » accordent un point à l'adversaire — et annoncent presque toujours un « mais ».",
    "Reformule la phrase sans le connecteur, puis demande-toi ce qui manque : une addition, une opposition, une conclusion, une justification, un exemple ou une étape.",
    ["3e", "vocabulaire", "connecteurs", "argumentation", "template"],
  ),
  gabarit(
    "3e_voc_histoire_mots_tpl_1",
    "3e_voc_histoire_mots",
    HISTOIRE,
    TOUTE_HISTOIRE,
    "Quel mouvement le sens du mot a-t-il suivi ?",
    3,
    "Compare le nombre de choses que le mot désignait, et celui qu'il désigne aujourd'hui.",
    "Le sens d'un mot ne tient pas en place. Il s'élargit quand il finit par désigner plus de choses, il se rétrécit quand il n'en garde qu'une, il se dégrade quand il prend un sens défavorable, il se relève quand il en prend un plus favorable — et il change parfois simplement de métier, comme « souris » ou « virus » que l'informatique a empruntés.",
    "Pose deux questions : le mot désigne-t-il aujourd'hui plus ou moins de choses qu'avant ? et le regard qu'il porte est-il devenu meilleur ou pire ? Si ni l'un ni l'autre n'a bougé, c'est qu'il a changé de domaine.",
    ["3e", "vocabulaire", "histoire-des-mots", "etymologie", "template"],
  ),
];
