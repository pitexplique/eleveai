// lib/tutor-v4/questionBank/5e/francais/lecture.bank.ts
//
// LA LECTURE EN 5e — écrit le 12/08/2026.
//
// ⚠️ BO n° 10 du 5 mars 2026, applicable en 5e À LA RENTRÉE 2026 seulement.
// ⛔ Ne pas étendre à la 4e (2027) ni à la 3e (2028).
//
// PÉRIMÈTRE — les attendus nommés par le BO que le coach n'avait pas :
//   « Travailler la lecture silencieuse et développer les différentes
//   stratégies de compréhension » et « contrôler sa compréhension » ;
//   « Formuler un jugement fondé sur des émotions, sur des critères
//   esthétiques, sur des idées et des valeurs » ; « Apprendre à recourir à
//   quelques outils d'analyse pertinents » ; « Repérer des éléments à améliorer
//   dans sa lecture oralisée ou celle des autres » ; « Comprendre et
//   interpréter le parcours d'un ou plusieurs personnages afin d'appréhender
//   les enjeux de l'œuvre » ; « Comparer les langages différents d'une œuvre
//   littéraire et d'une œuvre artistique » ; « Tirer parti des informations sur
//   le contexte de production d'une œuvre » ; « Se constituer des repères dans
//   l'histoire littéraire ».
//
// ⛔ AUCUNE ŒUVRE PRÉCISE. Les repères d'histoire littéraire se travaillent sur
// des TRAITS d'époque — une quête en vers, une comédie en cinq actes, une ville
// industrielle — jamais sur un titre à reconnaitre. Un élève qui n'a pas lu
// l'œuvre doit pouvoir répondre.
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
   1. CONTRÔLER SA COMPRÉHENSION
   ---------------------------------------------------------------------------
   « contrôler sa compréhension » : le BO demande que l'élève sache QU'IL n'a
   pas compris, et qu'il ait un geste à faire. C'est cela qui distingue un
   lecteur autonome de quelqu'un qui tourne les pages.
   ========================================================================== */

const STRATEGIES: readonly Cas[] = [
  { gauche: "Tu arrives en bas de la page et tu ne saurais pas dire ce que tu viens de lire.", droite: "tu remontes et tu relis, plus lentement" },
  { gauche: "Un mot inconnu revient trois fois dans le paragraphe.", droite: "tu cherches son sens : s'il revient, il porte quelque chose d'important" },
  { gauche: "Un mot inconnu apparait une seule fois, et la phrase reste claire.", droite: "tu continues : tout élucider casserait la lecture" },
  { gauche: "Tu ne sais plus de qui parle le « il » depuis deux pages.", droite: "tu remontes jusqu'au dernier nom propre cité" },
  { gauche: "Le texte fait un saut dans le temps et tu es perdu.", droite: "tu repères les indications de temps et tu remets les évènements dans l'ordre" },
  { gauche: "Tu lis un texte long et tu veux garder le fil.", droite: "tu t'arrêtes à la fin de chaque partie pour la résumer en une phrase" },
  { gauche: "Une phrase est très longue et tu t'y perds.", droite: "tu repères le verbe principal, puis son sujet" },
  { gauche: "Tu as compris les mots mais pas ce qui se passe.", droite: "tu te demandes qui veut quoi, et qui l'en empêche" },
  { gauche: "Tu relis la même page pour la troisième fois sans avancer.", droite: "tu changes de moment de lecture : la fatigue empêche de comprendre" },
  { gauche: "Le narrateur dit une chose et le personnage en fait une autre.", droite: "tu notes l'écart : c'est souvent là que le texte dit le plus" },
  { gauche: "Tu veux vérifier que tu as bien compris un chapitre.", droite: "tu essaies de le raconter en trois phrases sans regarder" },
  { gauche: "Le texte décrit longuement un lieu et tu sautes le passage.", droite: "tu le lis quand même : une description prépare souvent ce qui va arriver" },
  { gauche: "Deux personnages portent des noms proches et tu les confonds.", droite: "tu notes en marge un mot pour chacun" },
  { gauche: "Tu ne comprends pas pourquoi un personnage agit ainsi.", droite: "tu reviens à ce qu'on a dit de lui plus tôt" },
];

/* =============================================================================
   2. SUR QUOI SE FONDE UN JUGEMENT DE LECTEUR
   ---------------------------------------------------------------------------
   Le BO nomme trois appuis : les ÉMOTIONS, les CRITÈRES ESTHÉTIQUES, les IDÉES
   ET LES VALEURS. Le quatrième cas est le plus fréquent en classe : un avis
   qui ne s'appuie sur rien.
   ========================================================================== */

const APPUIS: readonly string[] = [
  "sur une émotion : ce que le texte lui a fait ressentir",
  "sur un critère esthétique : la façon dont c'est écrit",
  "sur des idées et des valeurs : ce que le texte défend ou dénonce",
  "sur rien : c'est un avis, mais il n'est pas encore justifié",
];

const JUGEMENTS: readonly Cas[] = [
  { gauche: "« J'ai eu peur à chaque page, je n'arrivais pas à m'arrêter. »", droite: APPUIS[0] },
  { gauche: "« Les phrases sont courtes, et ça donne l'impression de courir avec lui. »", droite: APPUIS[1] },
  { gauche: "« Ce livre montre qu'on peut se tromper sur quelqu'un, et ça m'a fait réfléchir. »", droite: APPUIS[2] },
  { gauche: "« C'était nul. »", droite: APPUIS[3] },
  { gauche: "« La fin m'a serré le cœur. »", droite: APPUIS[0] },
  { gauche: "« Les descriptions sont si précises qu'on voit la pièce. »", droite: APPUIS[1] },
  { gauche: "« L'auteur dénonce le travail des enfants sans jamais faire la leçon. »", droite: APPUIS[2] },
  { gauche: "« J'ai aimé, voilà. »", droite: APPUIS[3] },
  { gauche: "« J'ai ri tout seul dans le bus. »", droite: APPUIS[0] },
  { gauche: "« Le rythme des vers imite le galop du cheval. »", droite: APPUIS[1] },
  { gauche: "« Le texte pose une question qui vaut encore aujourd'hui. »", droite: APPUIS[2] },
  { gauche: "« C'est bien. »", droite: APPUIS[3] },
  { gauche: "« Je me suis reconnu dans ce personnage, ça m'a touché. »", droite: APPUIS[0] },
  { gauche: "« Les images sont surprenantes, on ne les attend pas. »", droite: APPUIS[1] },
];

/* =============================================================================
   3. L'OUTIL D'ANALYSE QUI RÉPOND À LA QUESTION
   ---------------------------------------------------------------------------
   « quelques outils d'analyse PERTINENTS » : le BO insiste sur le mot. Un
   outil ne se plaque pas sur un texte, il répond à une question précise.
   ========================================================================== */

const OUTILS: readonly string[] = [
  "le narrateur et le point de vue : qui raconte, et par quels yeux",
  "l'ordre du récit : ce qui est raconté avant, après, ou en retour en arrière",
  "le champ lexical : les mots d'un même domaine, qui colorent le passage",
  "les images : comparaison et métaphore, qui font voir une chose par une autre",
];

const QUESTIONS_OUTILS: readonly Cas[] = [
  { gauche: "« On ne sait ce qui se passe qu'à travers ce que voit l'enfant. »", droite: OUTILS[0] },
  { gauche: "« Le chapitre commence par la fin, puis revient en arrière. »", droite: OUTILS[1] },
  { gauche: "« Naufrage, écueil, tempête, dérive : la page entière parle de mer. »", droite: OUTILS[2] },
  { gauche: "« Sa colère est un orage qui monte. »", droite: OUTILS[3] },
  { gauche: "« Le récit est à la première personne, et le narrateur se trompe. »", droite: OUTILS[0] },
  { gauche: "« Trois ans passent en une phrase, puis une soirée occupe dix pages. »", droite: OUTILS[1] },
  { gauche: "« Verrou, barreau, mur, clé : l'enfermement est partout dans le texte. »", droite: OUTILS[2] },
  { gauche: "« La ville dort comme une bête repue. »", droite: OUTILS[3] },
  { gauche: "« Le narrateur sait ce que pensent tous les personnages à la fois. »", droite: OUTILS[0] },
  { gauche: "« Un souvenir s'intercale au milieu de la scène. »", droite: OUTILS[1] },
  { gauche: "« Blessure, cicatrice, pansement : le corps revient à chaque paragraphe. »", droite: OUTILS[2] },
  { gauche: "« Ses mots tombaient comme des pierres. »", droite: OUTILS[3] },
  { gauche: "« On suit la scène de très loin, sans entrer dans aucune tête. »", droite: OUTILS[0] },
  { gauche: "« Le récit annonce ce qui arrivera bien plus tard. »", droite: OUTILS[1] },
];

/* =============================================================================
   4. CE QUI EST À AMÉLIORER DANS UNE LECTURE À VOIX HAUTE
   ========================================================================== */

const AMELIORER: readonly Cas[] = [
  { gauche: "Il lit sans jamais s'arrêter, même aux points.", droite: "prendre en compte la ponctuation : marquer les fins de phrase" },
  // ⚠️ « ralentir » ne doit PAS parler de respiration : la ligne « il coupe au
  // milieu d'un groupe de mots » a pour remède « respirer entre les groupes »,
  // et les deux propositions devenaient justes toutes les deux. Trouvé en
  // lisant un tirage — aucun script ne voit deux bonnes réponses.
  { gauche: "Elle lit si vite qu'on ne suit plus.", droite: "ralentir : personne ne comprend à cette allure" },
  { gauche: "Il garde les yeux collés au texte du début à la fin.", droite: "lever les yeux de temps en temps vers l'auditoire" },
  { gauche: "Le dialogue est lu de la même voix que le récit.", droite: "changer de voix quand un personnage parle" },
  { gauche: "On n'entend rien au fond de la salle.", droite: "porter la voix davantage" },
  { gauche: "Elle bute sur trois mots qu'elle découvre en lisant.", droite: "préparer la lecture avant, en repérant les mots difficiles" },
  { gauche: "Il coupe au milieu d'un groupe de mots pour respirer.", droite: "respirer entre les groupes, jamais à l'intérieur" },
  { gauche: "La question est lue exactement comme une phrase déclarative.", droite: "faire monter la voix à la fin de la question" },
  { gauche: "Le ton reste le même pendant vingt lignes.", droite: "varier le rythme selon ce que le texte raconte" },
  { gauche: "Il commence à lire avant que la classe soit attentive.", droite: "attendre le silence avant de commencer" },
  // ⚠️ Cette ligne disait « elle chuchote les passages gênants », et « porter
  // la voix davantage » y répondait aussi bien : deux bonnes réponses. Toute
  // ligne de cette table doit avoir UN seul remède possible parmi les autres.
  { gauche: "Elle commente le texte et s'excuse pendant qu'elle lit.", droite: "lire le texte tel quel, et garder ses remarques pour après" },
  { gauche: "Il termine chaque phrase en laissant tomber la voix, même au milieu d'une idée.", droite: "ne descendre la voix qu'à la fin d'une idée complète" },
  { gauche: "Le poème est lu comme une liste, sans tenir compte des vers.", droite: "marquer les fins de vers sans casser la phrase" },
  { gauche: "Elle lit très bien, mais personne ne comprend de quoi il s'agit.", droite: "annoncer en une phrase de quoi parle le texte avant de lire" },
];

/* =============================================================================
   5. LE PARCOURS D'UN PERSONNAGE
   ---------------------------------------------------------------------------
   « afin d'appréhender les ENJEUX de l'œuvre » : suivre un personnage n'est
   pas résumer ce qui lui arrive, c'est voir ce qui change en lui — et ce que
   ce changement dit du livre entier.
   ========================================================================== */

const ETAPES: readonly string[] = [
  "la situation de départ : ce qu'il est avant que rien n'arrive",
  "l'élément qui le met en mouvement",
  "l'épreuve qui le fait douter de lui",
  "la transformation : ce qu'il n'était pas au début",
];

const PARCOURS: readonly Cas[] = [
  { gauche: "Il vit depuis toujours dans le même village et n'en est jamais sorti.", droite: ETAPES[0] },
  { gauche: "Une lettre arrive, et il doit partir le soir même.", droite: ETAPES[1] },
  { gauche: "Il échoue, et se demande pour la première fois s'il en est capable.", droite: ETAPES[2] },
  { gauche: "À la fin, il ose dire non à celui devant qui il baissait les yeux.", droite: ETAPES[3] },
  { gauche: "Elle obéit à tout le monde, et cela lui semble normal.", droite: ETAPES[0] },
  { gauche: "On lui refuse ce qu'elle demandait depuis des années.", droite: ETAPES[1] },
  { gauche: "Ceux en qui elle avait confiance l'abandonnent.", droite: ETAPES[2] },
  { gauche: "Elle repart seule, et cela ne lui fait plus peur.", droite: ETAPES[3] },
  { gauche: "Il possède tout ce qu'on peut désirer, et il s'ennuie.", droite: ETAPES[0] },
  { gauche: "Une rencontre lui montre qu'une autre vie est possible.", droite: ETAPES[1] },
  { gauche: "Il perd ce qui faisait toute sa force.", droite: ETAPES[2] },
  { gauche: "Il donne ce qu'il aurait gardé au premier chapitre.", droite: ETAPES[3] },
  { gauche: "Elle est la plus jeune, et personne ne l'écoute.", droite: ETAPES[0] },
  { gauche: "Un accident la met sur la route qu'elle n'aurait pas prise.", droite: ETAPES[1] },
];

/* =============================================================================
   6. COMPARER LES LANGAGES
   ---------------------------------------------------------------------------
   « les langages DIFFÉRENTS » : la question n'est pas laquelle est la meilleure,
   mais ce que chacune peut et ce qu'elle ne peut pas.
   ========================================================================== */

const LANGAGES: readonly Cas[] = [
  { gauche: "Entrer dans les pensées d'un personnage sans que rien ne le montre au-dehors", droite: "le texte écrit" },
  { gauche: "Donner à voir un visage entier en un dixième de seconde", droite: "l'image" },
  { gauche: "Faire monter l'inquiétude sans qu'un seul mot soit prononcé", droite: "la musique" },
  { gauche: "Mettre un corps vivant devant un public qui respire avec lui", droite: "la scène de théâtre" },
  { gauche: "Dire « trois ans passèrent » en quatre mots", droite: "le texte écrit" },
  { gauche: "Montrer d'un coup tous les détails d'une pièce", droite: "l'image" },
  { gauche: "Installer une atmosphère avant même qu'on sache où l'on est", droite: "la musique" },
  { gauche: "Changer le sens d'une réplique par un simple silence de l'acteur", droite: "la scène de théâtre" },
  { gauche: "Laisser le lecteur imaginer lui-même le visage du personnage", droite: "le texte écrit" },
  { gauche: "Faire tenir un paysage entier sans une seule phrase", droite: "l'image" },
  { gauche: "Faire sentir qu'un moment est en train de basculer, sans rien expliquer", droite: "la musique" },
  { gauche: "Faire exister deux personnages qui se taisent, face à face", droite: "la scène de théâtre" },
  { gauche: "Employer une comparaison qu'aucune caméra ne pourrait filmer", droite: "le texte écrit" },
  { gauche: "Cadrer, et décider ainsi de ce qu'on ne verra pas", droite: "l'image" },
];

const TOUS_LANGAGES: readonly string[] = [...new Set(LANGAGES.map((l) => l.droite))];

/* =============================================================================
   7. LE CONTEXTE DE PRODUCTION
   ========================================================================== */

const CONTEXTE: readonly Cas[] = [
  { gauche: "L'auteur écrivait à une époque où la censure lisait tout avant publication.", droite: "cela explique qu'il dise les choses de façon détournée" },
  { gauche: "Le texte a d'abord été écrit pour être dit à voix haute devant un public.", droite: "cela explique ses répétitions et son rythme marqué" },
  { gauche: "Le roman paraissait chapitre par chapitre, chaque semaine, dans un journal.", droite: "cela explique que chaque chapitre finisse sur un suspens" },
  { gauche: "L'autrice publiait sous un nom d'homme.", droite: "cela dit quelque chose de la place faite aux femmes en littérature alors" },
  { gauche: "La pièce a été écrite pour une scène sans décor ni rideau.", droite: "cela explique que le texte décrive lui-même le lieu" },
  { gauche: "Le poème a été écrit pendant une guerre, sur le front.", droite: "cela éclaire ce qu'il tait autant que ce qu'il dit" },
  { gauche: "Le conte se transmettait oralement bien avant d'être écrit.", droite: "cela explique ses formules répétées, qui aidaient à le retenir" },
  { gauche: "L'auteur écrivait pour un roi et vivait de sa protection.", droite: "cela pèse sur ce qu'il pouvait se permettre de critiquer" },
  { gauche: "Le livre a été interdit dès sa parution.", droite: "cela indique qu'il touchait à quelque chose de sensible pour son époque" },
  { gauche: "Le texte a été traduit d'une autre langue.", droite: "ce qu'on lit est le travail d'un traducteur, et un autre aurait choisi d'autres mots" },
  { gauche: "L'œuvre a été commandée pour une fête publique.", droite: "cela explique qu'elle cherche à plaire au plus grand nombre" },
  { gauche: "L'auteur avait quinze ans quand il l'a écrite.", droite: "cela éclaire le point de vue depuis lequel c'est raconté" },
  { gauche: "Le récit s'appuie sur des faits que l'auteur a vécus.", droite: "cela ne rend pas le texte vrai pour autant : il reste une construction" },
  { gauche: "La version que nous lisons a été remaniée vingt ans après la première.", droite: "cela signifie que l'auteur lui-même a changé d'avis sur son texte" },
];

/* =============================================================================
   8. DES REPÈRES DANS L'HISTOIRE LITTÉRAIRE
   ---------------------------------------------------------------------------
   ⛔ On reconnait une ÉPOQUE à des traits, jamais une œuvre à son titre. Un
   élève qui n'a rien lu de la période doit pouvoir répondre.
   ========================================================================== */

const EPOQUES: readonly Cas[] = [
  { gauche: "Un chevalier part en quête, et le récit est écrit en vers.", droite: "le Moyen Âge" },
  { gauche: "Les auteurs redécouvrent les textes de l'Antiquité et placent l'être humain au centre.", droite: "la Renaissance" },
  { gauche: "Une comédie en cinq actes respecte l'unité de temps, de lieu et d'action.", droite: "le XVIIe siècle" },
  { gauche: "Un roman décrit la misère d'une ville d'usines et de mines.", droite: "le XIXe siècle" },
  { gauche: "Un fabliau fait rire aux dépens d'un mari trompé, en quelques dizaines de vers.", droite: "le Moyen Âge" },
  { gauche: "Un poète imite les formes venues d'Italie et écrit des sonnets.", droite: "la Renaissance" },
  { gauche: "Une pièce cherche à corriger les mœurs en faisant rire la cour.", droite: "le XVIIe siècle" },
  { gauche: "Un récit suit un jeune homme monté à la capitale pour y réussir.", droite: "le XIXe siècle" },
  { gauche: "Une chanson de geste raconte les exploits d'un vassal fidèle à son roi.", droite: "le Moyen Âge" },
  { gauche: "Un auteur défend l'idée qu'on apprend mieux en observant qu'en récitant.", droite: "la Renaissance" },
  { gauche: "Une fable met en scène des animaux pour dire ce qu'on ne peut dire des puissants.", droite: "le XVIIe siècle" },
  { gauche: "Un roman parait en épisodes dans un journal, semaine après semaine.", droite: "le XIXe siècle" },
  { gauche: "Un roman de chevalerie mêle amour courtois et merveilleux.", droite: "le Moyen Âge" },
  { gauche: "L'imprimerie diffuse les textes bien plus largement qu'auparavant.", droite: "la Renaissance" },
];

const TOUTES_EPOQUES: readonly string[] = [...new Set(EPOQUES.map((e) => e.droite))];

/** Gabarit commun : un cas à gauche, une réponse à droite, les pièges tirés
 *  des autres lignes de la même table. */
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

export const lecture5eBank: TutorBankItemV4[] = [
  gabaritCas(
    "5e_comp_strategies_tpl_1",
    "5e_comp_strategies",
    "lecture_comprehension",
    STRATEGIES,
    "Que fais-tu ?",
    2,
    "Un lecteur autonome n'est pas celui qui ne bloque jamais : c'est celui qui sait quoi faire quand il bloque.",
    "Contrôler sa compréhension, c'est savoir qu'on n'a pas compris — et avoir un geste à faire. Sans cela, on tourne les pages sans lire.",
    "Devant un blocage, demande-toi ce qui fera repartir la lecture, et non ce qui la fera cesser.",
    ["5e", "lecture", "strategies", "template"],
  ),
  gabaritCas(
    "5e_comp_jugement_tpl_1",
    "5e_comp_jugement",
    "lecture_comprehension",
    JUGEMENTS,
    "Sur quoi ce jugement de lecteur se fonde-t-il ?",
    3,
    "Trois appuis possibles — l'émotion, la façon d'écrire, les idées. Et un quatrième cas : rien du tout.",
    "Un jugement de lecteur peut s'appuyer sur ce qu'on a ressenti, sur la façon dont le texte est écrit, ou sur ce qu'il défend. Un avis sans appui n'est pas une faute : c'est un jugement qui n'a pas encore été formulé jusqu'au bout.",
    "Demande-toi ce que la phrase donnerait si on retirait « j'ai aimé ». S'il ne reste rien, l'avis n'est pas encore justifié.",
    ["5e", "lecture", "jugement", "template"],
    APPUIS,
  ),
  gabaritCas(
    "5e_comp_outils_analyse_tpl_1",
    "5e_comp_outils_analyse",
    "lecture_comprehension",
    QUESTIONS_OUTILS,
    "Quel outil d'analyse permet d'en rendre compte ?",
    3,
    "Un outil ne se plaque pas sur un texte : il répond à une question précise.",
    "Quelques outils suffisent pour analyser un texte au collège : qui raconte et par quels yeux, dans quel ordre, avec quels mots, et par quelles images.",
    "Repère d'abord ce qui est remarquable dans l'extrait — un regard, un saut dans le temps, des mots qui se répondent, une comparaison. L'outil suit.",
    ["5e", "lecture", "outils-analyse", "template"],
    OUTILS,
  ),
  gabaritCas(
    "5e_voix_ameliorer_tpl_1",
    "5e_voix_ameliorer",
    "lecture_voix_haute",
    AMELIORER,
    "Que faut-il améliorer ?",
    2,
    "Écouter une lecture, c'est repérer ce qui empêche de suivre.",
    "Le BO demande de repérer ce qui est à améliorer dans sa lecture oralisée ou celle des autres. Ce n'est pas juger : c'est nommer un point précis, et donc réparable.",
    "Demande-toi ce qui, dans cette lecture, empêche celui qui écoute de comprendre. C'est cela qu'il faut nommer.",
    ["5e", "lecture", "voix-haute", "ameliorer", "template"],
  ),
  gabaritCas(
    "5e_lect_parcours_personnage_tpl_1",
    "5e_lect_parcours_personnage",
    "culture_litteraire",
    PARCOURS,
    "À quel moment du parcours du personnage sommes-nous ?",
    3,
    "Un parcours n'est pas une suite d'évènements : c'est ce qui change dans quelqu'un.",
    "Suivre un personnage, ce n'est pas résumer ce qui lui arrive : c'est voir ce qu'il devient. Le début le montre tel qu'il est, quelque chose le met en route, une épreuve le fait douter, et il finit autre.",
    "Compare toujours au premier chapitre : ce que le personnage n'aurait pas pu faire au début est exactement ce que le livre raconte.",
    ["5e", "lecture", "personnage", "template"],
    ETAPES,
  ),
  gabaritCas(
    "5e_lect_langages_tpl_1",
    "5e_lect_langages",
    "culture_litteraire",
    LANGAGES,
    "Quel langage peut faire cela le mieux ?",
    3,
    "La question n'est pas lequel est le meilleur, mais ce que chacun peut.",
    "Une histoire racontée par un texte, une image, une musique ou une scène n'est pas la même histoire. Chaque langage a ce qu'il peut, et ce qu'il ne peut pas — et c'est en les comparant qu'on comprend ce que chacun fait.",
    "Demande-toi ce qui serait perdu si l'on changeait de support. Ce qui se perd est précisément la force de celui qu'on quitte.",
    ["5e", "lecture", "langages", "arts", "template"],
    TOUS_LANGAGES,
  ),
  gabaritCas(
    "5e_lect_contexte_production_tpl_1",
    "5e_lect_contexte_production",
    "culture_litteraire",
    CONTEXTE,
    "Qu'est-ce que cela éclaire dans l'œuvre ?",
    3,
    "Le contexte n'excuse rien et n'explique pas tout : il rend certains choix lisibles.",
    "Savoir où, quand et pour qui une œuvre a été faite change ce qu'on y lit. Une forme qui paraissait bizarre devient un choix, et parfois une nécessité.",
    "Demande-toi ce que l'auteur pouvait faire, et ce qu'il ne pouvait pas. Le contexte se lit d'abord comme une contrainte.",
    ["5e", "lecture", "contexte", "template"],
  ),
  gabaritCas(
    "5e_lect_reperes_histoire_tpl_1",
    "5e_lect_reperes_histoire",
    "culture_litteraire",
    EPOQUES,
    "De quelle période ce trait est-il caractéristique ?",
    3,
    "On reconnait une époque à ce qu'elle écrit, pas à une date apprise par cœur.",
    "Se constituer des repères en histoire littéraire, c'est savoir associer quelques traits à quelques périodes : la quête en vers du Moyen Âge, le retour à l'Antiquité de la Renaissance, les règles du XVIIe siècle, la ville industrielle du XIXe.",
    "Cherche ce que le trait suppose : un château et un vassal, une imprimerie, une cour, une usine. Chacun situe une époque.",
    ["5e", "lecture", "histoire-litteraire", "template"],
    TOUTES_EPOQUES,
  ),
];
