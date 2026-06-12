import type {
  ComparatorName,
  QuestionFormat,
  SchoolLevel,
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
} from "@/lib/tutor-v4/types";
import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import {
  generateConjugationItem,
  generateInfinitifItem,
  type ConjItem,
} from "@/lib/tutor-v4/questionBank/cycle3/francais/conjugationEngine";
import {
  generateAgreementItem,
  generateHomophoneItem,
} from "@/lib/tutor-v4/questionBank/cycle3/francais/parametricFrench";

type Cycle3PrimaryLevel = Extract<SchoolLevel, "cm1" | "cm2" | "6e">;

type Generated = TutorGeneratedQuestionV4 & {
  format: QuestionFormat;
  comparator: ComparatorName;
};

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  return shuffle([correct, ...wrongs.filter((w) => w !== correct)]).slice(0, 4);
}

function exp(methode: string, exemple: string, conclusion: string) {
  return `Methode : ${methode}\n\nExemple : ${exemple}\n\nConclusion : ${conclusion}`;
}

function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

// ── Conversion d'un item de banque vers une question generee ────────────────

type QcmItem = {
  text: string;
  correct: string;
  wrongs: string[];
  methode?: string;
};

type ShortItem = {
  text: string;
  // Plusieurs formes acceptees possibles (avec/sans accent par ex.).
  answers: string[];
  methode?: string;
};

function asQcm(item: QcmItem): Generated {
  return {
    text: item.text,
    format: "qcm",
    choices: makeChoices(item.correct, item.wrongs),
    expected: [item.correct],
    comparator: "mcq_exact",
    explanation: exp(
      item.methode ?? "On observe la phrase avec attention.",
      `La bonne reponse est : ${item.correct}.`,
      "On verifie en relisant la phrase entiere."
    ),
  };
}

function asShort(item: ShortItem): Generated {
  return {
    text: item.text,
    format: "short",
    expected: item.answers,
    comparator: "exact_text",
    explanation: exp(
      item.methode ?? "On ecrit la forme demandee sans se tromper.",
      `La reponse attendue est : ${item.answers[0]}.`,
      "On relit pour verifier la terminaison."
    ),
  };
}

function qcm(pool: readonly QcmItem[]): Generated {
  return asQcm(pick(pool));
}

function short(pool: readonly ShortItem[]): Generated {
  return asShort(pick(pool));
}

// Convertit un item du moteur de conjugaison parametrique en question generee.
function fromConjItem(item: ConjItem): Generated {
  return item.kind === "qcm"
    ? asQcm({ text: item.text, correct: item.correct, wrongs: item.wrongs, methode: item.methode })
    : asShort({ text: item.text, answers: item.answers, methode: item.methode });
}

// ── LECTURE / FLUENCE ───────────────────────────────────────────────────────

const LECTURE: QcmItem[] = [
  {
    text: 'Lis ce passage :\n"Le vent secouait les volets. Nina serra son manteau et traversa la cour sans courir."\n\nQuel indice montre qu\'il fait probablement froid ?',
    correct: "Nina serre son manteau",
    wrongs: ["Nina court vite", "les volets sont rouges", "la cour est vide"],
    methode: "On justifie sa reponse avec un indice precis du texte.",
  },
  {
    text: 'Lis ce passage :\n"Le rideau se leve. Deux personnages entrent et parlent chacun leur tour."\n\nDe quel genre de texte s\'agit-il surtout ?',
    correct: "un extrait de theatre",
    wrongs: ["un article documentaire", "une recette", "une lettre"],
    methode: "Les didascalies et les dialogues signalent le theatre.",
  },
  {
    text: 'Lis ce passage :\n"Sur la branche, l\'oiseau lissait ses plumes. Soudain, un bruit le fit s\'envoler."\n\nPourquoi l\'oiseau s\'envole-t-il ?',
    correct: "a cause d'un bruit soudain",
    wrongs: ["parce qu'il a faim", "parce qu'il fait nuit", "parce qu'il pleut"],
    methode: "On relie la cause et la consequence dans le texte.",
  },
  {
    text: 'Lis ce passage :\n"Tom rangea ses crayons, ferma son cahier et sortit en classe."\n\nDans quel ordre Tom fait-il ces actions ?',
    correct: "ranger, fermer, sortir",
    wrongs: ["sortir, ranger, fermer", "fermer, sortir, ranger", "sortir, fermer, ranger"],
    methode: "On repere les mots qui marquent l'ordre des actions.",
  },
  {
    text: 'Lis ce passage :\n"La pluie tombait depuis le matin. Les rues etaient desertes et brillantes."\n\nQuel temps fait-il dans ce passage ?',
    correct: "il pleut",
    wrongs: ["il neige", "il fait grand soleil", "il y a du vent chaud"],
    methode: "On s'appuie sur les details decrits.",
  },
  {
    text: 'Lis ce passage :\n"- Tu viens ? demanda Lea. - J\'arrive ! repondit Sami en attrapant son sac."\n\nQue montre la ponctuation ?',
    correct: "c'est un dialogue entre deux personnages",
    wrongs: ["c'est une liste", "c'est un titre", "c'est une definition"],
    methode: "Les tirets et les guillemets signalent les paroles echangees.",
  },
  {
    text: 'Lis ce passage :\n"Le petit chat gris dormait, roule en boule au creux du fauteuil."\n\nOu dort le chat ?',
    correct: "au creux du fauteuil",
    wrongs: ["sur le lit", "dans le jardin", "sous la table"],
    methode: "On prend l'information explicite donnee par le texte.",
  },
];

const DOCUMENT: QcmItem[] = [
  {
    text: "Un document indique : Titre : Les volcans. Source : magazine scientifique junior. Date : mars 2025.\n\nQuelle information donne la source ?",
    correct: "d'ou vient le document",
    wrongs: ["le sujet principal", "le nom du lecteur", "la conclusion du texte"],
    methode: "La source indique l'origine du document.",
  },
  {
    text: "Sur une affiche : Spectacle samedi 14 juin a 18h, salle des fetes.\n\nQuelle information manque si on veut venir ?",
    correct: "rien : on a le jour, l'heure et le lieu",
    wrongs: ["le jour", "l'heure", "le lieu"],
    methode: "On verifie quelles informations utiles sont presentes.",
  },
  {
    text: "Dans un sommaire : 'Les insectes ........ page 12'.\n\nA quoi sert ce sommaire ?",
    correct: "trouver rapidement une page",
    wrongs: ["raconter une histoire", "donner son avis", "decrire un personnage"],
    methode: "Le sommaire aide a se reperer dans un livre documentaire.",
  },
  {
    text: "Une recette commence par : 'Ingredients : farine, oeufs, lait.'\n\nQue donne cette partie ?",
    correct: "la liste de ce qu'il faut",
    wrongs: ["les etapes a suivre", "le temps de cuisson", "le nom du cuisinier"],
    methode: "Une recette separe les ingredients et les etapes.",
  },
  {
    text: "Un graphique a pour titre : 'Nombre de livres lus par mois'.\n\nQue lit-on sur ce graphique ?",
    correct: "combien de livres sont lus chaque mois",
    wrongs: ["le prix des livres", "le nom des auteurs", "la taille des livres"],
    methode: "Le titre d'un graphique annonce ce qu'il montre.",
  },
];

// ── OEUVRE ──────────────────────────────────────────────────────────────────

const OEUVRE: QcmItem[] = [
  {
    text: "Apres la lecture d'un conte, quelle trace est la plus utile dans un carnet de lecteur ?",
    correct: "un avis personnel avec un passage qui le justifie",
    wrongs: ["seulement le nombre de pages", "une liste de calculs", "la couleur de la couverture seulement"],
    methode: "Un carnet de lecteur garde la memoire de ce qu'on a compris et ressenti.",
  },
  {
    text: "Dans un recit, le personnage principal qui vit l'aventure s'appelle le plus souvent...",
    correct: "le heros",
    wrongs: ["le narrateur seulement", "le lecteur", "l'auteur"],
    methode: "Le heros est au centre de l'histoire.",
  },
  {
    text: "Quelle phrase exprime une reaction personnelle de lecteur ?",
    correct: "J'ai eu peur quand le loup est apparu.",
    wrongs: ["Le livre a 64 pages.", "C'est un conte.", "Il y a trois chapitres."],
    methode: "Une reaction de lecteur dit ce qu'on a ressenti.",
  },
  {
    text: "Pour comprendre les liens entre les personnages, il est utile de...",
    correct: "noter qui est ami, ennemi ou famille",
    wrongs: ["compter les pages", "regarder la date d'edition", "mesurer le livre"],
    methode: "On suit les relations entre les personnages.",
  },
  {
    text: "Pour s'engager dans une lecture longue, le mieux est de...",
    correct: "lire un peu chaque jour et garder le fil",
    wrongs: ["tout lire en une fois sans pause", "lire la fin d'abord", "sauter des chapitres"],
    methode: "Perseverer aide a profiter d'une oeuvre entiere.",
  },
];

// ── ECRITURE ────────────────────────────────────────────────────────────────

const ECRITURE: QcmItem[] = [
  {
    text: "Quelle phrase est la plus claire et correctement ponctuee ?",
    correct: "Le cheval traverse la prairie, puis il rejoint l'etable.",
    wrongs: [
      "Le cheval traverse la prairie puis",
      "traverse prairie cheval etable",
      "Le cheval traverse la prairie puis il rejoint l'etable",
    ],
    methode: "Une phrase claire a un sens complet et une ponctuation correcte.",
  },
  {
    text: "Pour ameliorer un paragraphe, que faut-il verifier en priorite ?",
    correct: "l'ordre des idees, les accords et la ponctuation",
    wrongs: ["uniquement la couleur du stylo", "le nombre exact de lignes", "la taille du cahier"],
    methode: "Relire sert a rendre l'ecrit plus clair et plus correct.",
  },
  {
    text: "Quelle phrase commence et finit correctement ?",
    correct: "Les oiseaux chantent dans le jardin.",
    wrongs: ["les oiseaux chantent dans le jardin", "Les oiseaux chantent dans le jardin", "les oiseaux chantent dans le jardin."],
    methode: "Une phrase commence par une majuscule et finit par un point.",
  },
  {
    text: "Quel connecteur organise le mieux un recit ?",
    correct: "d'abord, ensuite, enfin",
    wrongs: ["pomme, table, chat", "et et et", "ou bien ou bien"],
    methode: "Les connecteurs marquent les etapes du recit.",
  },
  {
    text: "Pour ecrire une courte description, on choisit surtout...",
    correct: "des adjectifs et des details precis",
    wrongs: ["seulement des chiffres", "des mots au hasard", "uniquement des verbes"],
    methode: "Une description s'appuie sur des details qui font voir.",
  },
  {
    text: "Avant de rendre un texte, la derniere etape utile est de...",
    correct: "se relire pour corriger les erreurs",
    wrongs: ["le plier en quatre", "compter les mots", "changer de stylo"],
    methode: "La relecture est une etape de la production d'ecrit.",
  },
];

// ── ORAL ────────────────────────────────────────────────────────────────────

const ORAL: QcmItem[] = [
  {
    text: "Pendant un debat en classe, quelle attitude est attendue ?",
    correct: "ecouter les autres et justifier son avis",
    wrongs: ["couper la parole pour parler plus fort", "changer de sujet sans prevenir", "repeter exactement la meme phrase"],
    methode: "Participer a un echange suppose d'ecouter et de repondre clairement.",
  },
  {
    text: "Pour bien presenter un livre a la classe, il vaut mieux...",
    correct: "parler clairement et regarder son public",
    wrongs: ["lire tout, tete baissee, tres vite", "parler tres bas", "tourner le dos"],
    methode: "Une bonne presentation se fait audible et claire.",
  },
  {
    text: "Reformuler une consigne entendue, c'est...",
    correct: "la redire avec ses propres mots",
    wrongs: ["la repeter mot pour mot sans comprendre", "l'ignorer", "la lire a l'ecrit seulement"],
    methode: "Reformuler montre qu'on a compris.",
  },
  {
    text: "Donner un avis justifie, c'est dire...",
    correct: "ce qu'on pense et pourquoi",
    wrongs: ["seulement oui ou non", "ce que pense le voisin", "une phrase sans rapport"],
    methode: "Un avis devient solide quand on donne une raison.",
  },
  {
    text: "Quand quelqu'un parle dans un echange, on doit...",
    correct: "attendre son tour pour parler",
    wrongs: ["parler en meme temps", "se boucher les oreilles", "sortir de la classe"],
    methode: "On respecte la parole d'autrui dans un echange.",
  },
];

// ── VOCABULAIRE ─────────────────────────────────────────────────────────────

const VOC_CONTEXTE: QcmItem[] = [
  {
    text: "Dans 'Le sentier etait escarpe, difficile a grimper', que veut dire escarpe ?",
    correct: "tres pentu",
    wrongs: ["tres plat", "tres large", "tres court"],
    methode: "Le contexte 'difficile a grimper' aide a deviner le sens.",
  },
  {
    text: "Dans 'Il etait ravi d'avoir gagne', que veut dire ravi ?",
    correct: "tres content",
    wrongs: ["tres fache", "tres fatigue", "tres surpris"],
    methode: "Le contexte 'avoir gagne' oriente vers la joie.",
  },
  {
    text: "Dans 'La piece est sombre', quel synonyme peut remplacer sombre ?",
    correct: "obscure",
    wrongs: ["bruyante", "rapide", "ancienne"],
    methode: "On cherche un mot de meme sens qui garde la phrase correcte.",
  },
  {
    text: "Dans 'Le vieil homme avancait peniblement', que veut dire peniblement ?",
    correct: "avec difficulte",
    wrongs: ["avec joie", "tres vite", "en chantant"],
    methode: "Le contexte donne le sens du mot inconnu.",
  },
];

const VOC_FAMILLE: QcmItem[] = [
  {
    text: "Quel mot appartient a la meme famille que terre ?",
    correct: "terrien",
    wrongs: ["terreur", "tasse", "tour"],
    methode: "Les mots d'une famille partagent une meme racine et un sens proche.",
  },
  {
    text: "Quel mot est de la famille de dent ?",
    correct: "dentiste",
    wrongs: ["dedans", "dindon", "donner"],
    methode: "On cherche la racine commune 'dent'.",
  },
  {
    text: "Avec le prefixe 're-', que veut dire 'refaire' ?",
    correct: "faire a nouveau",
    wrongs: ["ne pas faire", "faire a moitie", "defaire pour toujours"],
    methode: "Le prefixe 're-' indique souvent la repetition.",
  },
  {
    text: "Avec le suffixe '-able', 'lavable' signifie...",
    correct: "qui peut etre lave",
    wrongs: ["qui ne se lave jamais", "deja lave", "qui salit"],
    methode: "Le suffixe '-able' veut dire 'qui peut etre'.",
  },
  {
    text: "Quel est le mot-racine de 'fleuriste, fleurir, fleuri' ?",
    correct: "fleur",
    wrongs: ["fleuve", "flute", "feu"],
    methode: "La racine commune se retrouve dans tous les mots de la famille.",
  },
];

const VOC_SYN_ANT: QcmItem[] = [
  {
    text: "Quel est un synonyme de 'rapide' ?",
    correct: "vif",
    wrongs: ["lent", "lourd", "calme"],
    methode: "Un synonyme a le meme sens.",
  },
  {
    text: "Quel est le contraire de 'content' ?",
    correct: "triste",
    wrongs: ["joyeux", "heureux", "ravi"],
    methode: "Un antonyme a le sens oppose.",
  },
  {
    text: "Quel est un synonyme de 'maison' ?",
    correct: "demeure",
    wrongs: ["voiture", "jardin", "rue"],
    methode: "On choisit un mot de meme sens.",
  },
  {
    text: "Quel est le contraire de 'monter' ?",
    correct: "descendre",
    wrongs: ["grimper", "sauter", "courir"],
    methode: "On cherche l'action opposee.",
  },
  {
    text: "Pour eviter de repeter 'grand', on peut dire...",
    correct: "immense",
    wrongs: ["petit", "minuscule", "etroit"],
    methode: "On remplace par un synonyme pour varier.",
  },
];

const VOC_POLYSEMIE: QcmItem[] = [
  {
    text: "Dans 'la glace du miroir' et 'manger une glace', le mot glace...",
    correct: "a plusieurs sens",
    wrongs: ["est toujours un dessert", "n'a aucun sens", "est un verbe"],
    methode: "Un mot polysemique a plusieurs sens selon le contexte.",
  },
  {
    text: "Dans 'la feuille de l'arbre' et 'une feuille de papier', feuille...",
    correct: "a deux sens differents",
    wrongs: ["veut toujours dire papier", "est un verbe", "est un nom propre"],
    methode: "Le contexte precise le sens du mot.",
  },
  {
    text: "Quelle phrase utilise 'pied' au sens du corps ?",
    correct: "Il s'est fait mal au pied.",
    wrongs: ["Le pied de la table est casse.", "Au pied de la montagne.", "Un pied de salade."],
    methode: "On choisit le contexte qui donne le bon sens.",
  },
  {
    text: "Dans 'une operation a l'hopital' et 'une operation de maths', operation...",
    correct: "a plusieurs sens",
    wrongs: ["est toujours un calcul", "est un determinant", "n'a aucun sens"],
    methode: "Le meme mot peut designer des realites differentes.",
  },
];

const VOC_REEMPLOI: QcmItem[] = [
  {
    text: "Quelle phrase reemploie correctement le mot 'courageux' ?",
    correct: "Le pompier courageux a sauve le chat.",
    wrongs: ["Le courageux de table est casse.", "Il a mange un courageux.", "Courageux vite a la maison."],
    methode: "On reemploie un mot dans une phrase qui a du sens.",
  },
  {
    text: "Quelle phrase emploie bien le mot 'fragile' ?",
    correct: "Ce vase est fragile, attention !",
    wrongs: ["Il court fragile le matin.", "Le fragile mange une pomme.", "Fragile sur la table bleue."],
    methode: "Le mot doit etre a la bonne place et avoir du sens.",
  },
  {
    text: "Quelle phrase utilise correctement 'rapidement' ?",
    correct: "Elle a fini son travail rapidement.",
    wrongs: ["Le rapidement est sur le banc.", "Il mange un rapidement.", "Rapidement bleu la maison."],
    methode: "Un adverbe accompagne souvent un verbe.",
  },
];

const VOC_ORTH: QcmItem[] = [
  {
    text: "Quelle est l'orthographe correcte ?",
    correct: "aujourd'hui",
    wrongs: ["aujourdhui", "aujour'dui", "aujourd'huit"],
    methode: "On memorise l'orthographe des mots frequents.",
  },
  {
    text: "Quelle est l'orthographe correcte ?",
    correct: "beaucoup",
    wrongs: ["beaucou", "beacoup", "beaucoupe"],
    methode: "On retient les lettres muettes des mots etudies.",
  },
  {
    text: "Quelle est l'orthographe correcte ?",
    correct: "toujours",
    wrongs: ["toujour", "toujoure", "toudjours"],
    methode: "Certains mots gardent un 's' final.",
  },
  {
    text: "Quelle est l'orthographe correcte ?",
    correct: "ecole",
    wrongs: ["ecolle", "aicole", "ekole"],
    methode: "On verifie l'orthographe des mots usuels.",
  },
];

// ── GRAMMAIRE / ORTHOGRAPHE GRAMMATICALE ────────────────────────────────────

const PHRASE_SIMPLE: QcmItem[] = [
  {
    text: "Quelle phrase est une phrase simple (un seul verbe conjugue) ?",
    correct: "Le soleil brille.",
    wrongs: ["Le soleil brille et les oiseaux chantent.", "Quand il pleut, je lis.", "Il court, puis il saute."],
    methode: "Une phrase simple contient un seul verbe conjugue.",
  },
  {
    text: "Combien de verbes conjugues dans 'Le chat dort sur le canape' ?",
    correct: "1",
    wrongs: ["2", "0", "3"],
    methode: "On cherche le mot qui se conjugue.",
  },
  {
    text: "Quelle est la ponctuation correcte d'une phrase declarative ?",
    correct: "Elle finit par un point.",
    wrongs: ["Elle finit par une virgule.", "Elle n'a pas de majuscule.", "Elle finit par deux points."],
    methode: "Une phrase declarative se termine par un point.",
  },
  {
    text: "Quel est le type de la phrase 'Quel beau jardin !' ?",
    correct: "exclamative",
    wrongs: ["interrogative", "declarative", "imperative"],
    methode: "Le point d'exclamation marque la phrase exclamative.",
  },
  {
    text: "Quel est le type de 'Ranges ta chambre.' ?",
    correct: "imperative (un ordre)",
    wrongs: ["interrogative", "exclamative", "une question"],
    methode: "Une phrase qui donne un ordre est imperative.",
  },
];

const SUJET_VERBE: QcmItem[] = [
  {
    text: "Dans 'Les grands arbres bougent doucement', quel est le sujet ?",
    correct: "Les grands arbres",
    wrongs: ["bougent", "doucement", "grands"],
    methode: "Le sujet repond a 'qui est-ce qui ...?'.",
  },
  {
    text: "Dans 'Le chien aboie tres fort', quel est le verbe conjugue ?",
    correct: "aboie",
    wrongs: ["chien", "fort", "le"],
    methode: "Le verbe exprime l'action et se conjugue.",
  },
  {
    text: "Dans 'Demain, Lea partira en voyage', quel est le sujet ?",
    correct: "Lea",
    wrongs: ["Demain", "voyage", "partira"],
    methode: "On pose la question 'qui partira ?'.",
  },
  {
    text: "Dans 'Sous la table dort un petit chat', quel est le sujet ?",
    correct: "un petit chat",
    wrongs: ["la table", "dort", "sous"],
    methode: "Le sujet peut etre place apres le verbe.",
  },
  {
    text: "Dans 'Nous lisons une belle histoire', quel est le verbe ?",
    correct: "lisons",
    wrongs: ["Nous", "histoire", "belle"],
    methode: "On cherche le mot qui change avec le temps.",
  },
];

const GN: QcmItem[] = [
  {
    text: "Dans le groupe 'un petit chat noir', quel est le nom principal ?",
    correct: "chat",
    wrongs: ["petit", "noir", "un"],
    methode: "Le nom principal est le mot central du groupe nominal.",
  },
  {
    text: "Dans 'la maison du voisin', quelle est l'expansion du nom ?",
    correct: "du voisin",
    wrongs: ["la", "maison", "."],
    methode: "L'expansion precise le nom principal.",
  },
  {
    text: "Quel est le determinant dans 'ces jolies fleurs' ?",
    correct: "ces",
    wrongs: ["jolies", "fleurs", "joli"],
    methode: "Le determinant accompagne le nom et le precede.",
  },
  {
    text: "Dans 'une voiture rouge', quel mot est un adjectif ?",
    correct: "rouge",
    wrongs: ["une", "voiture", "."],
    methode: "L'adjectif donne une qualite du nom.",
  },
  {
    text: "Quel groupe est un groupe nominal ?",
    correct: "le grand jardin fleuri",
    wrongs: ["il court vite", "manger une pomme", "tres rapidement"],
    methode: "Un groupe nominal est organise autour d'un nom.",
  },
];

const COMPLEMENTS: QcmItem[] = [
  {
    text: "Dans 'Le matin, Tom lit un livre', quel est le complement circonstanciel de temps ?",
    correct: "Le matin",
    wrongs: ["un livre", "Tom", "lit"],
    methode: "Le complement circonstanciel de temps dit quand.",
  },
  {
    text: "Dans 'Elle range ses affaires dans le tiroir', quel groupe dit ou ?",
    correct: "dans le tiroir",
    wrongs: ["ses affaires", "Elle", "range"],
    methode: "Le complement de lieu repond a 'ou ?'.",
  },
  {
    text: "Dans 'Le chat mange sa croquette', quel est le complement essentiel ?",
    correct: "sa croquette",
    wrongs: ["Le chat", "mange", "."],
    methode: "Le complement essentiel ne peut pas etre supprime.",
  },
  {
    text: "Quel complement peut etre deplace ou supprime ?",
    correct: "le complement circonstanciel",
    wrongs: ["le sujet", "le verbe", "le complement essentiel"],
    methode: "Les complements circonstanciels sont mobiles et facultatifs.",
  },
];

const ACCORD_GN: QcmItem[] = [
  {
    text: "Quel groupe nominal est correctement accorde ?",
    correct: "les fleurs rouges",
    wrongs: ["les fleur rouge", "la fleurs rouges", "un fleurs rouge"],
    methode: "Determinant, nom et adjectif s'accordent en genre et en nombre.",
  },
  {
    text: "Quel groupe est bien accorde ?",
    correct: "des chats noirs",
    wrongs: ["des chat noirs", "des chats noir", "un chats noir"],
    methode: "Au pluriel, le nom et l'adjectif prennent souvent un 's'.",
  },
  {
    text: "Quel groupe est bien accorde ?",
    correct: "une grande maison",
    wrongs: ["une grand maison", "un grande maison", "une grandes maison"],
    methode: "Au feminin, l'adjectif s'accorde avec le nom.",
  },
  {
    text: "Quel groupe est bien accorde ?",
    correct: "les petits chiens",
    wrongs: ["les petit chiens", "les petits chien", "le petits chiens"],
    methode: "Tout le groupe nominal s'accorde au pluriel.",
  },
  {
    text: "Quel groupe est bien accorde ?",
    correct: "des jolies fleurs blanches",
    wrongs: ["des joli fleurs blanches", "des jolies fleur blanche", "des jolies fleurs blanc"],
    methode: "Chaque adjectif du groupe s'accorde avec le nom.",
  },
];

const ACCORD_SUJET_VERBE: QcmItem[] = [
  {
    text: "Quelle phrase accorde correctement le verbe avec le sujet ?",
    correct: "Les enfants jouent dans la cour.",
    wrongs: ["Les enfants joue dans la cour.", "Les enfant jouent dans la cour.", "Les enfants joues dans la cour."],
    methode: "Le verbe s'accorde avec le sujet (ici pluriel : -ent).",
  },
  {
    text: "Quelle phrase est correctement accordee ?",
    correct: "Le chien et le chat dorment.",
    wrongs: ["Le chien et le chat dort.", "Le chien et le chat dormons.", "Le chien et le chat dormez."],
    methode: "Deux sujets relies par 'et' donnent un verbe au pluriel.",
  },
  {
    text: "Quelle phrase est correcte ?",
    correct: "Nous mangeons a midi.",
    wrongs: ["Nous mange a midi.", "Nous mangent a midi.", "Nous mangez a midi."],
    methode: "Avec 'nous', le verbe se termine souvent par '-ons'.",
  },
  {
    text: "Quelle phrase est correcte ?",
    correct: "Les oiseaux chantent le matin.",
    wrongs: ["Les oiseaux chante le matin.", "Les oiseaux chantes le matin.", "L'oiseaux chantent le matin."],
    methode: "Un sujet pluriel commande un verbe au pluriel.",
  },
  {
    text: "Dans 'Les eleves de la classe ___ attentifs', quelle forme convient ?",
    correct: "sont",
    wrongs: ["est", "es", "etes"],
    methode: "Le sujet 'les eleves' est pluriel : le verbe etre devient 'sont'.",
  },
];

const HOMOPHONES: QcmItem[] = [
  {
    text: "Homophones 'a' / 'à' : choisis la phrase correcte.",
    correct: "Il a un nouveau velo.",
    wrongs: ["Il à un nouveau velo.", "Il as un nouveau velo.", "Il a un nouveau velo à."],
    methode: "'a' = verbe avoir ; 'à' = preposition.",
  },
  {
    text: "Homophones 'a' / 'à' : choisis la phrase correcte.",
    correct: "Elle va à l'ecole.",
    wrongs: ["Elle va a l'ecole.", "Elle va as l'ecole.", "Elle va a l'ecole à."],
    methode: "'à' avec accent indique le lieu ou la direction.",
  },
  {
    text: "Homophones 'est' / 'et' : choisis la phrase correcte.",
    correct: "Mon frere est grand et fort.",
    wrongs: ["Mon frere et grand et fort.", "Mon frere es grand et fort.", "Mon frere est grand est fort."],
    methode: "'est' = verbe etre ; 'et' = pour relier.",
  },
  {
    text: "Homophones 'son' / 'sont' : choisis la phrase correcte.",
    correct: "Les enfants sont contents de leur cadeau.",
    wrongs: ["Les enfants son contents.", "Les enfants sont content.", "Les enfants sonts contents."],
    methode: "'sont' = verbe etre ; 'son' = a lui.",
  },
  {
    text: "Homophones 'on' / 'ont' : choisis la phrase correcte.",
    correct: "Ils ont gagne le match.",
    wrongs: ["Ils on gagne le match.", "Ils ont gagner le match.", "Il ont gagne le match."],
    methode: "'ont' = verbe avoir ; 'on' = pronom.",
  },
  {
    text: "Homophones 'ou' / 'où' : choisis la phrase correcte.",
    correct: "Tu veux du jus ou de l'eau ?",
    wrongs: ["Tu veux du jus où de l'eau ?", "Tu veux du jus ou de l'eau", "tu veux du jus ou de l'eau ?"],
    methode: "'ou' relie deux choix ; 'où' (avec accent) indique le lieu.",
  },
  {
    text: "Homophones 'ses' / 'ces' : choisis la phrase correcte.",
    correct: "Il range ses affaires.",
    wrongs: ["Il range ces affaires a lui.", "Il range ses affaire.", "Il range ce affaires."],
    methode: "'ses' = les siens (a lui) ; 'ces' = ceux-la (que je montre).",
  },
];

// ── CONJUGAISON ─────────────────────────────────────────────────────────────
// Present / imparfait / futur / infinitif sont produits par le moteur
// parametrique (conjugationEngine.ts). Restent ici les notions conceptuelles.

const CONJ_PASSE_COMPOSE: QcmItem[] = [
  {
    text: "Quel auxiliaire complete : 'Elle ___ tombee dans l'escalier.' ?",
    correct: "est",
    wrongs: ["a", "ont", "avait"],
    methode: "Avec le verbe tomber, on utilise l'auxiliaire etre.",
  },
  {
    text: "Choisis le passe compose correct : 'Nous ___ un film.'",
    correct: "avons regarde",
    wrongs: ["avons regarder", "avez regarde", "ont regarde"],
    methode: "Passe compose = auxiliaire avoir + participe passe.",
  },
  {
    text: "Choisis la forme correcte : 'Ils ___ partis tot.'",
    correct: "sont",
    wrongs: ["ont", "est", "avaient"],
    methode: "Avec partir, l'auxiliaire est etre : ils sont partis.",
  },
  {
    text: "Choisis le passe compose : 'Tu ___ une pomme.'",
    correct: "as mange",
    wrongs: ["as manger", "a mange", "es mange"],
    methode: "Avec 'tu', auxiliaire avoir : tu as mange.",
  },
  {
    text: "Quel est le participe passe de 'finir' ?",
    correct: "fini",
    wrongs: ["finir", "finit", "finissant"],
    methode: "Le participe passe de finir est 'fini'.",
  },
];

const CONJ_VALEUR_TEMPS: QcmItem[] = [
  {
    text: "Dans 'Demain, nous partirons', quel temps est utilise ?",
    correct: "le futur",
    wrongs: ["le present", "l'imparfait", "le passe compose"],
    methode: "'Demain' annonce une action future.",
  },
  {
    text: "Dans 'Hier, il pleuvait sans arret', quel temps est utilise ?",
    correct: "l'imparfait",
    wrongs: ["le futur", "le present", "le passe compose"],
    methode: "L'imparfait decrit une action passee qui dure.",
  },
  {
    text: "Dans 'Maintenant, je lis un livre', quel temps est utilise ?",
    correct: "le present",
    wrongs: ["le futur", "l'imparfait", "le passe compose"],
    methode: "Le present exprime ce qui se passe maintenant.",
  },
  {
    text: "Dans 'Elle a fini ses devoirs', quel temps est utilise ?",
    correct: "le passe compose",
    wrongs: ["le present", "le futur", "l'imparfait"],
    methode: "Le passe compose exprime une action passee terminee.",
  },
  {
    text: "Quel temps raconte le mieux une action soudaine dans un recit au passe ?",
    correct: "le passe compose (ou le passe simple)",
    wrongs: ["le futur", "le present de demain", "l'imparfait seul"],
    methode: "L'imparfait pose le decor, le passe compose marque l'action breve.",
  },
];

// ── ROUTAGE NOTION + MICRO-COMPETENCE ───────────────────────────────────────

function conjugaisonQuestion(microId: string): Generated {
  // Present / imparfait / futur / infinitif : moteur parametrique (centaines de
  // variantes). Passe compose et valeur des temps : pools rediges (notions plus
  // conceptuelles, peu mecaniques).
  if (microId.includes("imparfait")) return fromConjItem(generateConjugationItem("imparfait"));
  if (microId.includes("futur")) return fromConjItem(generateConjugationItem("futur"));
  if (microId.includes("passe_compose")) return qcm(CONJ_PASSE_COMPOSE);
  if (microId.includes("passe_simple")) return qcm(CONJ_VALEUR_TEMPS);
  if (microId.includes("valeur")) return qcm(CONJ_VALEUR_TEMPS);
  if (microId.includes("infinitif") || microId.includes("groupe")) return fromConjItem(generateInfinitifItem());
  return fromConjItem(generateConjugationItem("present"));
}

function grammaireQuestion(microId: string): Generated {
  // Homophones : moteur parametrique (familles a/à, est/et, ces/ses, la/là,
  // mes/mais) une fois sur deux, sinon pool redige (couvre aussi on/ont,
  // son/sont, ou/où). Accord du GN : moteur parametrique (des milliers de GN).
  if (microId.includes("homophone")) {
    return Math.random() < 0.5 ? fromConjItem(generateHomophoneItem()) : qcm(HOMOPHONES);
  }
  if (microId.includes("accord_gn")) return fromConjItem(generateAgreementItem());
  if (microId.includes("orth_sujet_verbe")) return qcm(ACCORD_SUJET_VERBE);
  if (microId.includes("complement")) return qcm(COMPLEMENTS);
  if (microId.includes("gn")) return qcm(GN);
  if (microId.includes("phrase_simple")) return qcm(PHRASE_SIMPLE);
  if (microId.includes("sujet_verbe")) return qcm(SUJET_VERBE);
  return qcm(SUJET_VERBE);
}

function vocabulaireQuestion(microId: string): Generated {
  if (microId.includes("famille")) return qcm(VOC_FAMILLE);
  if (microId.includes("syn") || microId.includes("ant") || microId.includes("nuance")) return qcm(VOC_SYN_ANT);
  if (microId.includes("polysemie")) return qcm(VOC_POLYSEMIE);
  if (microId.includes("orthographe")) return qcm(VOC_ORTH);
  if (microId.includes("reemploi")) return qcm(VOC_REEMPLOI);
  return qcm(VOC_CONTEXTE);
}

function questionForNotion(notionId: string, microId: string): Generated {
  if (notionId.includes("fluence")) return qcm(LECTURE);
  if (notionId.includes("comprehension")) return Math.random() < 0.5 ? qcm(LECTURE) : qcm(DOCUMENT);
  if (notionId.includes("oeuvre")) return qcm(OEUVRE);
  if (notionId.includes("ecriture")) return qcm(ECRITURE);
  if (notionId.includes("oral")) return qcm(ORAL);
  if (notionId.includes("vocabulaire")) return vocabulaireQuestion(microId);
  if (notionId.includes("conjugaison")) return conjugaisonQuestion(microId);
  if (notionId.includes("grammaire")) return grammaireQuestion(microId);
  return qcm(LECTURE);
}

function makeTemplate(
  level: Cycle3PrimaryLevel,
  micro: MicroSkillSource,
  variant: 0 | 1
): TutorBankItemV4 {
  return {
    kind: "template",
    id: `${level}_${micro.id}_fr_cycle3_tpl_${variant + 1}`,
    niveau: level,
    matiere: "francais",
    notionId: micro.notionId,
    microId: micro.id,
    difficulty: variant === 0 ? 2 : 3,
    theme: "neutral",
    hint: micro.label,
    tags: [level, micro.notionId, micro.id, "cycle3", "francais", "template"],
    generate: () => questionForNotion(micro.notionId, micro.id),
  };
}

export function buildCycle3FrancaisBank(
  level: Cycle3PrimaryLevel,
  microSkills: readonly MicroSkillSource[]
): TutorBankItemV4[] {
  return microSkills.flatMap((micro) => [
    makeTemplate(level, micro, 0),
    makeTemplate(level, micro, 1),
    {
      ...makeTemplate(level, micro, 1),
      id: `${level}_${micro.id}_fr_cycle3_tpl_3_defi`,
      difficulty: 4,
      tags: [level, micro.notionId, micro.id, "cycle3", "francais", "template", "defi"],
    },
  ]);
}
