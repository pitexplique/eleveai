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
  generateSubjectVerbItem,
  generateVocabularyItem,
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
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  // ⚠️ 04/08/2026 — la bonne réponse était jetée dans le même chapeau que les
  // pièges : à cinq pièges écrits, le mélange pouvait la laisser au fond et
  // le découpage à quatre l'emportait. L'élève voyait alors quatre pièges et
  // rien d'autre. On la met de côté, on tire trois distracteurs, on mélange.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(methode: string, exemple: string, conclusion: string) {
  return `Méthode : ${methode}\n\nExemple : ${exemple}\n\nConclusion : ${conclusion}`;
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
      `La bonne réponse est : ${item.correct}.`,
      "On vérifie en relisant la phrase entière."
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
      item.methode ?? "On écrit la forme demandée sans se tromper.",
      `La réponse attendue est : ${item.answers[0]}.`,
      "On relit pour vérifier la terminaison."
    ),
  };
}

function qcm(pool: readonly QcmItem[]): Generated {
  return asQcm(pick(pool));
}

/** Un pool au hasard parmi plusieurs — ce dont un DÉFI a besoin : il balaie
 *  toute sa notion au lieu de rester sur une seule compétence. */
function auHasard(pools: readonly (readonly QcmItem[])[]): readonly QcmItem[] {
  return pools[Math.floor(Math.random() * pools.length)];
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
    text: "Lis : « Le soleil se couchait. Mara alluma la lampe et ouvrit son livre. » À quel moment de la journée est-on ?",
    correct: "le soir",
    wrongs: ["le matin très tôt","en plein midi","au petit-déjeuner"],
    methode: "Le coucher du soleil indique le soir.",
  },
  {
    text: "Lis : « Paul courait, essoufflé. Il ne voulait pas rater le bus. » Pourquoi Paul court-il ?",
    correct: "pour ne pas rater le bus",
    wrongs: ["pour faire du sport","parce qu'il a peur du noir","pour rattraper son chien"],
    methode: "On relie la cause donnée dans le texte.",
  },
  {
    text: "Lis : « — Bonjour, dit la marchande. Que désirez-vous ? » Où se passe surtout la scène ?",
    correct: "dans un magasin ou au marché",
    wrongs: ["à l'école","dans une piscine","dans un avion"],
    methode: "La marchande et sa question situent la scène.",
  },
  {
    text: "Lis : « La petite fille sourit en découvrant le cadeau. » Que ressent-elle ?",
    correct: "de la joie",
    wrongs: ["de la colère","de la peur","de l'ennui"],
    methode: "Le sourire montre un sentiment de joie.",
  },
  {
    text: "Lis : « D'abord, il mit ses chaussures. Ensuite, il attacha ses lacets. Enfin, il sortit. » Que fait-il en dernier ?",
    correct: "il sort",
    wrongs: ["il met ses chaussures","il attache ses lacets","il ouvre la fenêtre"],
    methode: "Le mot « enfin » marque la dernière action.",
  },
  {
    text: "Lis : « Le ciel devint gris et de grosses gouttes se mirent à tomber. » Quel temps fait-il ?",
    correct: "il commence à pleuvoir",
    wrongs: ["il fait grand soleil","il neige","il gèle"],
    methode: "On s'appuie sur les détails du texte.",
  },
  {
    text: "Lis : « — Range ta chambre ! » dit maman d'une voix ferme. Que fait la maman ?",
    correct: "elle donne un ordre",
    wrongs: ["elle pose une question","elle raconte une histoire","elle chante"],
    methode: "Le sens et le point d'exclamation montrent un ordre.",
  },
  {
    text: "Lis : « Léo n'avait rien mangé depuis le matin. Son ventre gargouillait. » Que ressent Léo ?",
    correct: "il a faim",
    wrongs: ["il a sommeil","il a froid","il a peur"],
    methode: "« rien mangé » et « ventre qui gargouille » : c'est la faim (indice implicite).",
  },
  {
    text: "Lis : « Le loup s'approcha lentement de la maison des trois petits cochons. » Ce passage vient sûrement...",
    correct: "d'un conte",
    wrongs: ["d'un documentaire","d'une lettre","d'une recette"],
    methode: "Le loup et les trois petits cochons signalent un conte.",
  },
  {
    text: "Lis : « Sur la plage, les enfants ramassaient des coquillages en riant. » Où se déroule la scène ?",
    correct: "à la plage",
    wrongs: ["à la montagne","dans une classe","dans une cave"],
    methode: "On prend l'information donnée par le texte.",
  },
  {
    text: "Lis : « Tom rangea son cartable, éteignit la lumière et alla se coucher. » Quelle est la dernière action de Tom ?",
    correct: "aller se coucher",
    wrongs: ["ranger son cartable","éteindre la lumière","ouvrir la porte"],
    methode: "On repère l'ordre des actions.",
  },
  {
    text: 'Lis ce passage :\n"Le vent secouait les volets. Nina serra son manteau et traversa la cour sans courir."\n\nQuel indice montre qu\'il fait probablement froid ?',
    correct: "Nina serre son manteau",
    wrongs: ["Nina court vite", "les volets sont rouges", "la cour est vide"],
    methode: "On justifie sa réponse avec un indice précis du texte.",
  },
  {
    text: 'Lis ce passage :\n"Le rideau se lève. Deux personnages entrent et parlent chacun leur tour."\n\nDe quel genre de texte s\'agit-il surtout ?',
    correct: "un extrait de théâtre",
    wrongs: ["un article documentaire", "une recette", "une lettre"],
    methode: "Les didascalies et les dialogues signalent le théâtre.",
  },
  {
    text: 'Lis ce passage :\n"Sur la branche, l\'oiseau lissait ses plumes. Soudain, un bruit le fit s\'envoler."\n\nPourquoi l\'oiseau s\'envole-t-il ?',
    correct: "à cause d'un bruit soudain",
    wrongs: ["parce qu'il a faim", "parce qu'il fait nuit", "parce qu'il pleut"],
    methode: "On relie la cause et la conséquence dans le texte.",
  },
  {
    text: 'Lis ce passage :\n"Tom rangea ses crayons, ferma son cahier et sortit en classe."\n\nDans quel ordre Tom fait-il ces actions ?',
    correct: "ranger, fermer, sortir",
    wrongs: ["sortir, ranger, fermer", "fermer, sortir, ranger", "sortir, fermer, ranger"],
    methode: "On repère les mots qui marquent l'ordre des actions.",
  },
  {
    text: 'Lis ce passage :\n"La pluie tombait depuis le matin. Les rues étaient désertes et brillantes."\n\nQuel temps fait-il dans ce passage ?',
    correct: "il pleut",
    wrongs: ["il neige", "il fait grand soleil", "il y a du vent chaud"],
    methode: "On s'appuie sur les détails décrits.",
  },
  {
    text: 'Lis ce passage :\n"- Tu viens ? demanda Léa. - J\'arrive ! répondit Sami en attrapant son sac."\n\nQue montre la ponctuation ?',
    correct: "c'est un dialogue entre deux personnages",
    wrongs: [
      "c'est une énumération de plusieurs actions",
      "c'est un même personnage qui se parle à lui-même",
      "c'est le narrateur qui s'adresse au lecteur",
    ],
    methode: "Les tirets et les guillemets signalent les paroles échangées.",
  },
  {
    text: 'Lis ce passage :\n"Le petit chat gris dormait, roulé en boule au creux du fauteuil."\n\nOù dort le chat ?',
    correct: "au creux du fauteuil",
    wrongs: ["sur le lit", "dans le jardin", "sous la table"],
    methode: "On prend l'information explicite donnée par le texte.",
  },
];

const DOCUMENT: QcmItem[] = [
  {
    text: "Sur une affiche : « Piscine ouverte de 9h à 18h, sauf le lundi. » Peut-on y aller le lundi ?",
    correct: "non, elle est fermée le lundi",
    wrongs: ["oui, toute la journée","oui, seulement le matin","oui, à 18h"],
    methode: "On lit l'information « sauf le lundi ».",
  },
  {
    text: "À quoi sert surtout un dictionnaire ?",
    correct: "à trouver le sens et l'orthographe d'un mot",
    wrongs: [
      "à trouver l'origine et l'histoire d'un mot",
      "à trouver un synonyme plus rare d'un mot",
      "à vérifier qu'un mot existe bien en français",
    ],
    methode: "Le dictionnaire donne le sens et l'écriture des mots.",
  },
  {
    text: "Sur la boîte d'un jeu : « À partir de 6 ans. » Que signifie cette information ?",
    correct: "l'âge conseillé pour jouer",
    wrongs: [
      "le nombre de joueurs qu'il faut réunir",
      "la durée moyenne d'une partie complète",
      "le nombre d'années de garantie du jeu",
    ],
    methode: "On lit l'information utile sur l'emballage.",
  },
  {
    text: "Dans un sommaire : « Chapitre 3 ..... page 20 ». À quoi sert la page indiquée ?",
    correct: "à trouver où commence le chapitre",
    wrongs: ["à compter les images","à connaître l'auteur","à savoir le prix"],
    methode: "Le sommaire aide à se repérer dans un livre.",
  },
  {
    text: "Sur un plan de ville, à quoi sert la légende ?",
    correct: "à expliquer ce que représentent les symboles",
    wrongs: ["à raconter l'histoire de la ville","à donner la météo","à lister les habitants"],
    methode: "La légende explique les symboles d'un plan.",
  },
  {
    text: "Une recette indique : « Cuisson : 25 minutes. » Cette information donne...",
    correct: "le temps de cuisson",
    wrongs: ["la liste des ingrédients","le nombre de parts","la température de la pièce"],
    methode: "Une recette sépare les étapes et les durées.",
  },
  {
    text: "Un tableau a pour titre « Températures de la semaine ». Que lit-on dedans ?",
    correct: "les températures de chaque jour",
    wrongs: ["les prénoms des élèves","le prix des glaces","les horaires du bus"],
    methode: "Le titre annonce ce que montre le tableau.",
  },
  {
    text: "Sur un yaourt : « À consommer avant le 12/05 ». Cette date indique...",
    correct: "jusqu'à quand on peut le manger",
    wrongs: ["la date de construction du magasin","l'heure d'ouverture","le poids du produit"],
    methode: "La date limite dit jusqu'à quand consommer.",
  },
  {
    text: "Pour trouver le mot « volcan » dans un dictionnaire, à quelle lettre cherche-t-on ?",
    correct: "V",
    wrongs: ["A","O","C"],
    methode: "Les mots sont classés par ordre alphabétique.",
  },
  {
    text: "Un panneau indique : « Sortie → ». À quoi sert la flèche ?",
    correct: "à montrer la direction à suivre",
    wrongs: ["à interdire de sortir","à donner l'heure","à compter les portes"],
    methode: "La flèche indique un sens.",
  },
  {
    text: "Une carte d'invitation donne le lieu, le jour et l'heure. Que permet-elle de savoir ?",
    correct: "où et quand se rendre",
    wrongs: ["la recette du gâteau","la fin d'une histoire","la leçon du jour"],
    methode: "On prélève les informations utiles du document.",
  },
  {
    text: "Un document indique : Titre : Les volcans. Source : magazine scientifique junior. Date : mars 2025.\n\nQuelle information donne la source ?",
    correct: "d'où vient le document",
    wrongs: ["le sujet principal", "le nom du lecteur", "la conclusion du texte"],
    methode: "La source indique l'origine du document.",
  },
  {
    text: "Sur une affiche : Spectacle samedi 14 juin à 18h, salle des fêtes.\n\nQuelle information manque si on veut venir ?",
    correct: "rien : on a le jour, l'heure et le lieu",
    wrongs: [
      "le jour : « samedi » ne dit pas de quelle semaine",
      "l'heure : « 18h » ne dit pas quand cela se termine",
      "le lieu : « salle des fêtes » ne dit pas dans quelle ville",
    ],
    methode: "On vérifie quelles informations utiles sont présentes.",
  },
  {
    text: "Dans un sommaire : 'Les insectes ........ page 12'.\n\nÀ quoi sert ce sommaire ?",
    correct: "trouver rapidement une page",
    wrongs: [
      "savoir combien de pages compte le livre",
      "connaitre l'ordre dans lequel il faut lire",
      "vérifier qu'aucune page ne manque au livre",
    ],
    methode: "Le sommaire aide à se repérer dans un livre documentaire.",
  },
  {
    text: "Une recette commence par : 'Ingrédients : farine, œufs, lait.'\n\nQue donne cette partie ?",
    correct: "la liste de ce qu'il faut",
    wrongs: ["les étapes à suivre", "le temps de cuisson", "le nom du cuisinier"],
    methode: "Une recette sépare les ingrédients et les étapes.",
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
    text: "Dans un récit, la personne qui raconte l'histoire s'appelle...",
    correct: "le narrateur",
    wrongs: ["le lecteur","l'imprimeur","le libraire"],
    methode: "Le narrateur est celui qui raconte.",
  },
  {
    text: "Le personnage qui s'oppose au héros s'appelle souvent...",
    correct: "l'adversaire (le méchant)",
    wrongs: ["le narrateur","l'auteur","le lecteur"],
    methode: "On repère les rôles des personnages.",
  },
  {
    text: "Quelle phrase raconte un événement de l'histoire (et non un avis) ?",
    correct: "Le dragon s'envola au-dessus du château.",
    wrongs: ["J'ai adoré ce passage.","Ce livre est trop long.","C'est mon conte préféré."],
    methode: "Un événement décrit une action de l'histoire.",
  },
  {
    text: "Après avoir lu un poème, quelle trace est utile dans un carnet de lecteur ?",
    correct: "recopier un vers qu'on a aimé et dire pourquoi",
    wrongs: [
      "recopier le poème en entier, pour le garder",
      "noter le titre, l'auteur et le nombre de vers",
      "résumer le poème en une phrase de son cru",
    ],
    methode: "Le carnet garde la mémoire de ce qu'on a compris et ressenti.",
  },
  {
    text: "Pour ne pas perdre le fil d'une histoire longue, on peut...",
    correct: "résumer chaque chapitre en une phrase",
    wrongs: [
      "relire le chapitre précédent avant chaque séance",
      "noter le nom de tous les personnages rencontrés",
      "lire la fin d'abord, pour savoir où l'on va",
    ],
    methode: "Persévérer et garder le fil aident à lire une œuvre entière.",
  },
  {
    text: "Dans un conte, la formule « Il était une fois » sert à...",
    correct: "commencer l'histoire",
    wrongs: ["la terminer","donner la morale","décrire l'auteur"],
    methode: "C'est une formule d'ouverture du conte.",
  },
  {
    text: "Le lieu et le moment où se passe une histoire, c'est...",
    correct: "le cadre (où et quand)",
    wrongs: ["le titre","la couverture","le prix"],
    methode: "On situe l'histoire dans l'espace et le temps.",
  },
  {
    text: "Quelle phrase exprime un sentiment du lecteur ?",
    correct: "J'ai eu de la peine pour le petit héros.",
    wrongs: ["Le livre a douze chapitres.","C'est un roman.","L'histoire se passe en hiver."],
    methode: "Une réaction de lecteur dit ce qu'on ressent.",
  },
  {
    text: "Pour comparer deux personnages, on peut noter...",
    correct: "ce qu'ils font et ce qu'ils ressentent",
    wrongs: ["le nombre de lettres de leur nom","la taille du livre","la date d'édition"],
    methode: "On suit les personnages et leurs relations.",
  },
  {
    text: "La leçon qu'une fable veut faire comprendre s'appelle...",
    correct: "la morale",
    wrongs: ["le titre","le décor","le résumé"],
    methode: "La fable se termine souvent par une morale.",
  },
  {
    text: "Pour partager un livre qu'on a aimé, une bonne idée est de...",
    correct: "le conseiller à un camarade en disant pourquoi",
    wrongs: [
      "le prêter à un camarade sans rien lui en dire",
      "raconter toute l'histoire à celui qui ne l'a pas lu",
      "noter son titre dans la liste des livres de la classe",
    ],
    methode: "On donne un avis justifié pour partager une lecture.",
  },
  {
    text: "Après la lecture d'un conte, quelle trace est la plus utile dans un carnet de lecteur ?",
    correct: "un avis personnel avec un passage qui le justifie",
    wrongs: [
      "le résumé complet du conte, du début jusqu'à la fin",
      "la liste des personnages et de leurs pouvoirs magiques",
      "le titre, l'auteur et la date à laquelle on l'a lu",
    ],
    methode: "Un carnet de lecteur garde la mémoire de ce qu'on a compris et ressenti.",
  },
  {
    text: "Dans un récit, le personnage principal qui vit l'aventure s'appelle le plus souvent...",
    correct: "le héros",
    wrongs: ["le narrateur seulement", "le lecteur", "l'auteur"],
    methode: "Le héros est au centre de l'histoire.",
  },
  {
    text: "Quelle phrase exprime une réaction personnelle de lecteur ?",
    correct: "J'ai eu peur quand le loup est apparu.",
    wrongs: ["Le livre a 64 pages.", "C'est un conte.", "Il y a trois chapitres."],
    methode: "Une réaction de lecteur dit ce qu'on a ressenti.",
  },
  {
    text: "Pour comprendre les liens entre les personnages, il est utile de...",
    correct: "noter qui est ami, ennemi ou famille",
    wrongs: ["compter les pages", "regarder la date d'édition", "mesurer le livre"],
    methode: "On suit les relations entre les personnages.",
  },
  {
    text: "Pour s'engager dans une lecture longue, le mieux est de...",
    correct: "lire un peu chaque jour et garder le fil",
    wrongs: ["tout lire en une fois sans pause", "lire la fin d'abord", "sauter des chapitres"],
    methode: "Persévérer aide à profiter d'une œuvre entière.",
  },
];

// ── ECRITURE ────────────────────────────────────────────────────────────────

const ECRITURE: QcmItem[] = [
  {
    text: "Quelle phrase est correctement ponctuée ?",
    correct: "As-tu fini tes devoirs ?",
    wrongs: ["As-tu fini tes devoirs.","as-tu fini tes devoirs","As tu fini tes devoirs"],
    methode: "Une question se termine par un point d'interrogation.",
  },
  {
    text: "Pour relier deux idées qui s'opposent, quel mot choisir ?",
    correct: "mais",
    wrongs: ["et","donc","puis"],
    methode: "« mais » marque l'opposition.",
  },
  {
    text: "Quelle phrase exprime la cause (le « pourquoi ») ?",
    correct: "Il met son manteau parce qu'il fait froid.",
    wrongs: ["Il met son manteau et il sort.","Il met son manteau, puis il court.","Il met son manteau ce matin."],
    methode: "« parce que » introduit la cause.",
  },
  {
    text: "Dans un récit, quel connecteur indique la fin ?",
    correct: "enfin",
    wrongs: ["d'abord","ensuite","pendant que"],
    methode: "« enfin » marque la dernière étape.",
  },
  {
    text: "Quelle phrase est la plus précise pour une description ?",
    correct: "Un grand chien noir aboyait devant la porte.",
    wrongs: [
      "Un chien vraiment très impressionnant aboyait.",
      "Il y avait là un chien qui faisait du bruit.",
      "Un chien magnifique aboyait avec beaucoup d'énergie.",
    ],
    methode: "Des détails précis rendent la description claire.",
  },
  {
    text: "En se relisant, que faut-il vérifier en priorité ?",
    correct: "les accords, l'orthographe et la ponctuation",
    wrongs: [
      "la longueur du texte et le nombre de lignes",
      "la propreté de l'écriture et les ratures",
      "le nombre d'idées différentes qu'on a mises",
    ],
    methode: "La relecture corrige la langue.",
  },
  {
    text: "Quelle phrase commence par une majuscule et finit par un point ?",
    correct: "La cloche sonne à midi.",
    wrongs: ["la cloche sonne à midi.","La cloche sonne à midi","la cloche sonne à midi"],
    methode: "Une phrase : majuscule au début, point à la fin.",
  },
  {
    text: "Pour ne pas répéter « le chien » dans deux phrases, on peut le remplacer par...",
    correct: "il",
    wrongs: ["le chat","elle","nous"],
    methode: "Un pronom évite les répétitions.",
  },
  {
    text: "Quel groupe de mots forme une phrase complète ?",
    correct: "Les enfants jouent dans la cour.",
    wrongs: ["Dans la cour les enfants","Jouent les enfants dans","Les enfants dans la"],
    methode: "Une phrase a un sens complet.",
  },
  {
    text: "Pour séparer les éléments d'une liste dans une phrase, on utilise...",
    correct: "des virgules",
    wrongs: ["des points d'interrogation","des majuscules partout","aucun signe"],
    methode: "La virgule sépare les éléments d'une énumération.",
  },
  {
    text: "Après avoir écrit un texte, quelle est la meilleure dernière étape ?",
    correct: "le relire pour corriger les erreurs",
    wrongs: ["le recopier sans le lire","le colorier","compter les mots"],
    methode: "La relecture est la dernière étape de l'écrit.",
  },
  {
    text: "Quelle phrase est la plus claire et correctement ponctuée ?",
    correct: "Le cheval traverse la prairie, puis il rejoint l'étable.",
    wrongs: [
      "Le cheval traverse la prairie puis",
      "traverse prairie cheval étable",
      "Le cheval traverse la prairie puis il rejoint l'étable",
    ],
    methode: "Une phrase claire a un sens complet et une ponctuation correcte.",
  },
  {
    text: "Pour améliorer un paragraphe, que faut-il vérifier en priorité ?",
    correct: "l'ordre des idées, les accords et la ponctuation",
    wrongs: [
      "le nombre de lignes et la longueur des phrases",
      "la propreté de l'écriture et l'absence de ratures",
      "la richesse du vocabulaire et les mots rares employés",
    ],
    methode: "Relire sert à rendre l'écrit plus clair et plus correct.",
  },
  {
    text: "Quelle phrase commence et finit correctement ?",
    correct: "Les oiseaux chantent dans le jardin.",
    wrongs: ["les oiseaux chantent dans le jardin", "Les oiseaux chantent dans le jardin", "les oiseaux chantent dans le jardin."],
    methode: "Une phrase commence par une majuscule et finit par un point.",
  },
  {
    text: "Quel connecteur organise le mieux un récit ?",
    correct: "d'abord, ensuite, enfin",
    wrongs: ["pomme, table, chat", "et et et", "ou bien ou bien"],
    methode: "Les connecteurs marquent les étapes du récit.",
  },
  {
    text: "Pour écrire une courte description, on choisit surtout...",
    correct: "des adjectifs et des détails précis",
    wrongs: ["seulement des chiffres", "des mots au hasard", "uniquement des verbes"],
    methode: "Une description s'appuie sur des détails qui font voir.",
  },
  {
    text: "Avant de rendre un texte, la dernière étape utile est de...",
    correct: "se relire pour corriger les erreurs",
    wrongs: ["le plier en quatre", "compter les mots", "changer de stylo"],
    methode: "La relecture est une étape de la production d'écrit.",
  },
];

// ── ORAL ────────────────────────────────────────────────────────────────────

const ORAL: QcmItem[] = [
  {
    text: "Pour bien écouter une consigne, il faut...",
    correct: "être attentif et ne pas parler en même temps",
    wrongs: [
      "commencer tout de suite, pour ne pas perdre de temps",
      "retenir sa question jusqu'à la fin de la journée",
      "noter chaque mot prononcé, sans en oublier aucun",
    ],
    methode: "Écouter, c'est se rendre disponible pour comprendre.",
  },
  {
    text: "Reformuler ce qu'on a entendu, c'est le redire...",
    correct: "avec ses propres mots",
    wrongs: [
      "avec les mots exacts de celui qui a parlé",
      "en y ajoutant ce qu'on en pense soi-même",
      "en le raccourcissant à un seul mot clé",
    ],
    methode: "Reformuler montre qu'on a compris.",
  },
  {
    text: "Pour présenter un exposé, il vaut mieux...",
    correct: "parler assez fort et regarder la classe",
    wrongs: [
      "lire ses notes mot à mot, sans lever les yeux",
      "apprendre son texte par cœur et le réciter",
      "parler vite pour tenir dans le temps imparti",
    ],
    methode: "Une présentation doit être audible et claire.",
  },
  {
    text: "« Je pense que ce livre est bien parce qu'il fait rire. » Cette phrase donne...",
    correct: "un avis avec une raison",
    wrongs: [
      "un avis sans aucune raison",
      "une raison sans aucun avis",
      "un résumé du livre en une phrase",
    ],
    methode: "Un avis justifié donne le « pourquoi ».",
  },
  {
    text: "Dans un échange, quand un camarade parle, on...",
    correct: "attend son tour et on l'écoute",
    wrongs: ["parle plus fort que lui","se lève et sort","répète le même mot"],
    methode: "On respecte la parole d'autrui.",
  },
  {
    text: "Pour raconter un souvenir à l'oral, on parle...",
    correct: "clairement, dans l'ordre des événements",
    wrongs: ["en mélangeant tout","sans faire de phrases","sans jamais respirer"],
    methode: "L'ordre aide à se faire comprendre.",
  },
  {
    text: "Poser une question pour mieux comprendre, c'est...",
    correct: "utile et permis dans un échange",
    wrongs: ["interdit","une perte de temps","toujours impoli"],
    methode: "Questionner aide à comprendre.",
  },
  {
    text: "Quand on n'est pas d'accord avec un camarade, on peut...",
    correct: "expliquer poliment pourquoi",
    wrongs: ["se moquer de lui","crier plus fort","refuser de l'écouter"],
    methode: "On donne un avis en respectant l'autre.",
  },
  {
    text: "Pour être bien compris à l'oral, il faut surtout...",
    correct: "articuler et parler à un bon rythme",
    wrongs: ["marmonner","parler en même temps que les autres","dire n'importe quoi"],
    methode: "Bien articuler rend le discours clair.",
  },
  {
    text: "Écouter quelqu'un jusqu'au bout permet de...",
    correct: "vraiment comprendre ce qu'il veut dire",
    wrongs: ["l'empêcher de parler","gagner un concours","changer de sujet"],
    methode: "L'écoute complète la compréhension.",
  },
  {
    text: "Dans un débat, un bon argument est...",
    correct: "une raison qui explique son idée",
    wrongs: ["une moquerie","un cri","une phrase sans rapport"],
    methode: "Un argument justifie ce qu'on pense.",
  },
  {
    text: "Pendant un débat en classe, quelle attitude est attendue ?",
    correct: "écouter les autres et justifier son avis",
    wrongs: ["couper la parole pour parler plus fort", "changer de sujet sans prévenir", "répéter exactement la même phrase"],
    methode: "Participer à un échange suppose d'écouter et de répondre clairement.",
  },
  {
    text: "Pour bien présenter un livre à la classe, il vaut mieux...",
    correct: "parler clairement et regarder son public",
    wrongs: ["lire tout, tête baissée, très vite", "parler très bas", "tourner le dos"],
    methode: "Une bonne présentation se fait audible et claire.",
  },
  {
    text: "Reformuler une consigne entendue, c'est...",
    correct: "la redire avec ses propres mots",
    wrongs: ["la répéter mot pour mot sans comprendre", "l'ignorer", "la lire à l'écrit seulement"],
    methode: "Reformuler montre qu'on a compris.",
  },
  {
    text: "Donner un avis justifié, c'est dire...",
    correct: "ce qu'on pense et pourquoi",
    wrongs: ["seulement oui ou non", "ce que pense le voisin", "une phrase sans rapport"],
    methode: "Un avis devient solide quand on donne une raison.",
  },
  {
    text: "Quand quelqu'un parle dans un échange, on doit...",
    correct: "attendre son tour pour parler",
    wrongs: ["parler en même temps", "se boucher les oreilles", "sortir de la classe"],
    methode: "On respecte la parole d'autrui dans un échange.",
  },
];

// ── VOCABULAIRE ─────────────────────────────────────────────────────────────

const VOC_CONTEXTE: QcmItem[] = [
  {
    text: "Dans 'Le chemin était boueux après la pluie', que veut dire boueux ?",
    correct: "plein de boue",
    wrongs: ["très sec","très propre","gelé"],
    methode: "Le contexte 'après la pluie' aide à deviner.",
  },
  {
    text: "Dans 'Elle parlait à voix basse pour ne pas réveiller le bébé', 'à voix basse' veut dire...",
    correct: "doucement",
    wrongs: ["en criant","en chantant","en pleurant"],
    methode: "Le but 'ne pas réveiller' oriente le sens.",
  },
  {
    text: "Dans 'Le désert est aride, sans une goutte d'eau', aride veut dire...",
    correct: "très sec",
    wrongs: ["très humide","très froid","très vert"],
    methode: "Le contexte 'sans eau' donne le sens.",
  },
  {
    text: "Dans 'Il dévora son repas en deux minutes', dévora veut dire...",
    correct: "mangea très vite",
    wrongs: ["cuisina","refusa","partagea"],
    methode: "Le contexte 'en deux minutes' précise le sens.",
  },
  {
    text: "Dans 'Le vieux pont menaçait de s'effondrer', s'effondrer veut dire...",
    correct: "tomber, s'écrouler",
    wrongs: ["se construire","se peindre","se laver"],
    methode: "On devine le sens grâce au contexte.",
  },
  {
    text: "Dans 'Il resta immobile, sans bouger', immobile veut dire...",
    correct: "qui ne bouge pas",
    wrongs: ["qui court","qui saute","qui parle"],
    methode: "Le contexte 'sans bouger' donne le sens.",
  },
  {
    text: "Dans 'Le ciel était limpide, on voyait très loin', limpide veut dire...",
    correct: "clair",
    wrongs: ["sombre","nuageux","orageux"],
    methode: "Le contexte 'on voyait loin' aide.",
  },
  {
    text: "Dans 'Elle est habile de ses mains, elle bricole très bien', habile veut dire...",
    correct: "adroite",
    wrongs: ["maladroite","paresseuse","triste"],
    methode: "Le contexte 'bricole bien' oriente le sens.",
  },
  {
    text: "Dans 'Il chuchota un secret à mon oreille', chuchoter veut dire...",
    correct: "parler tout bas",
    wrongs: ["crier","chanter fort","siffler"],
    methode: "Le contexte 'un secret à l'oreille' aide.",
  },
  {
    text: "Dans 'Après la course, il était épuisé', épuisé veut dire...",
    correct: "très fatigué",
    wrongs: ["très reposé","très content","très rapide"],
    methode: "Le contexte 'après la course' donne le sens.",
  },
  {
    text: "Dans 'La foule nombreuse remplissait la place', nombreuse veut dire...",
    correct: "en grand nombre",
    wrongs: ["toute petite","silencieuse","vide"],
    methode: "Le contexte 'remplissait la place' aide.",
  },
  {
    text: "Dans 'Le sentier était escarpé, difficile à grimper', que veut dire escarpé ?",
    correct: "très pentu",
    wrongs: ["très plat", "très large", "très court"],
    methode: "Le contexte 'difficile à grimper' aide à deviner le sens.",
  },
  {
    text: "Dans 'Il était ravi d'avoir gagné', que veut dire ravi ?",
    correct: "très content",
    wrongs: ["très fâché", "très fatigué", "très surpris"],
    methode: "Le contexte 'avoir gagné' oriente vers la joie.",
  },
  {
    text: "Dans 'La pièce est sombre', quel synonyme peut remplacer sombre ?",
    correct: "obscure",
    wrongs: ["bruyante", "rapide", "ancienne"],
    methode: "On cherche un mot de même sens qui garde la phrase correcte.",
  },
  {
    text: "Dans 'Le vieil homme avançait péniblement', que veut dire péniblement ?",
    correct: "avec difficulté",
    wrongs: ["avec joie", "très vite", "en chantant"],
    methode: "Le contexte donne le sens du mot inconnu.",
  },
];

const VOC_FAMILLE: QcmItem[] = [
  {
    text: "Quel mot appartient à la même famille que terre ?",
    correct: "terrien",
    wrongs: ["terreur", "tasse", "tour"],
    methode: "Les mots d'une famille partagent une même racine et un sens proche.",
  },
  {
    text: "Quel mot est de la famille de dent ?",
    correct: "dentiste",
    wrongs: ["dedans", "dindon", "donner"],
    methode: "On cherche la racine commune 'dent'.",
  },
  {
    text: "Avec le préfixe 're-', que veut dire 'refaire' ?",
    correct: "faire à nouveau",
    wrongs: ["ne pas faire", "faire à moitié", "défaire pour toujours"],
    methode: "Le préfixe 're-' indique souvent la répétition.",
  },
  {
    text: "Avec le suffixe '-able', 'lavable' signifie...",
    correct: "qui peut être lavé",
    wrongs: [
      "qui a déjà été lavé",
      "qui doit être lavé",
      "qui ne peut pas être lavé",
    ],
    methode: "Le suffixe '-able' veut dire 'qui peut être'.",
  },
  {
    text: "Quel est le mot-racine de 'fleuriste, fleurir, fleuri' ?",
    correct: "fleur",
    wrongs: ["fleuve", "flûte", "feu"],
    methode: "La racine commune se retrouve dans tous les mots de la famille.",
  },
];

const VOC_SYN_ANT: QcmItem[] = [
  {
    text: "Quel est un synonyme de 'rapide' ?",
    correct: "vif",
    wrongs: ["lent", "lourd", "calme"],
    methode: "Un synonyme a le même sens.",
  },
  {
    text: "Quel est le contraire de 'content' ?",
    correct: "triste",
    wrongs: ["joyeux", "heureux", "ravi"],
    methode: "Un antonyme a le sens opposé.",
  },
  {
    text: "Quel est un synonyme de 'maison' ?",
    correct: "demeure",
    wrongs: ["voiture", "jardin", "rue"],
    methode: "On choisit un mot de même sens.",
  },
  {
    text: "Quel est le contraire de 'monter' ?",
    correct: "descendre",
    wrongs: ["grimper", "sauter", "courir"],
    methode: "On cherche l'action opposée.",
  },
  {
    text: "Pour éviter de répéter 'grand', on peut dire...",
    correct: "immense",
    wrongs: ["petit", "minuscule", "étroit"],
    methode: "On remplace par un synonyme pour varier.",
  },
];

const VOC_POLYSEMIE: QcmItem[] = [
  {
    text: "Quelle phrase utilise 'glace' au sens du dessert ?",
    correct: "Elle mange une glace à la vanille.",
    wrongs: ["La glace du lac est solide.","Il se regarde dans la glace.","La route est couverte de glace."],
    methode: "Le contexte donne le bon sens.",
  },
  {
    text: "Quelle phrase utilise 'feuille' au sens du papier ?",
    correct: "Il écrit sur une feuille blanche.",
    wrongs: ["La feuille de l'arbre tombe.","Les feuilles jaunissent en automne.","Une feuille de salade."],
    methode: "Le contexte précise le sens.",
  },
  {
    text: "Dans 'la souris de l'ordinateur' et 'la souris grise', le mot souris...",
    correct: "a deux sens différents",
    wrongs: ["veut toujours dire l'animal","est un verbe","n'a aucun sens"],
    methode: "Un mot polysémique a plusieurs sens.",
  },
  {
    text: "Quelle phrase utilise 'bras' au sens du corps ?",
    correct: "Il s'est cassé le bras.",
    wrongs: ["Le bras du fauteuil est cassé.","Un bras de la rivière.","Le bras de la grue est long."],
    methode: "Le contexte donne le sens.",
  },
  {
    text: "Le mot 'carte' peut désigner...",
    correct: "une carte de géographie ou une carte à jouer",
    wrongs: [
      "une carte de géographie, et rien d'autre",
      "un fruit du même nom, ou bien un animal",
      "un verbe qui veut dire « mettre sur la carte »",
    ],
    methode: "Un mot peut avoir plusieurs sens.",
  },
  {
    text: "Quelle phrase utilise 'orange' comme couleur ?",
    correct: "Il porte un pull orange.",
    wrongs: ["Il mange une orange.","Il presse une orange.","Une orange bien juteuse."],
    methode: "Le contexte montre si c'est le fruit ou la couleur.",
  },
  {
    text: "Dans 'la clé de la porte' et 'la clé du mystère', le mot clé...",
    correct: "a plusieurs sens",
    wrongs: ["veut toujours dire l'objet en métal","est un déterminant","est un pluriel"],
    methode: "Le sens change avec le contexte.",
  },
  {
    text: "Quelle phrase utilise 'tour' au sens du bâtiment ?",
    correct: "La tour du château est très haute.",
    wrongs: ["C'est à ton tour de jouer.","Il fait le tour du jardin.","Un tour de magie."],
    methode: "Le contexte donne le bon sens.",
  },
  {
    text: "Quelle phrase utilise 'note' au sens de l'école ?",
    correct: "Elle a eu une bonne note en dictée.",
    wrongs: ["Il joue une note de musique.","Le serveur apporte la note.","Il prend une note dans son carnet."],
    methode: "Le contexte précise le sens de 'note'.",
  },
  {
    text: "Dans 'le pied de la table' et 'le pied du coureur', pied...",
    correct: "a deux sens différents",
    wrongs: ["veut toujours dire la partie du corps","est un verbe","n'a aucun sens"],
    methode: "Le contexte donne le sens.",
  },
  {
    text: "Quelle phrase utilise 'canard' au sens de l'animal ?",
    correct: "Le canard nage sur l'étang.",
    wrongs: ["Il chante comme un canard (faux).","Ce journal est un vrai canard.","Il fait un canard au piano."],
    methode: "Le contexte montre le vrai sens.",
  },
  {
    text: "Dans 'la glace du miroir' et 'manger une glace', le mot glace...",
    correct: "a plusieurs sens",
    wrongs: ["est toujours un dessert", "n'a aucun sens", "est un verbe"],
    methode: "Un mot polysémique a plusieurs sens selon le contexte.",
  },
  {
    text: "Dans 'la feuille de l'arbre' et 'une feuille de papier', feuille...",
    correct: "a deux sens différents",
    wrongs: ["veut toujours dire papier", "est un verbe", "est un nom propre"],
    methode: "Le contexte précise le sens du mot.",
  },
  {
    text: "Quelle phrase utilise 'pied' au sens du corps ?",
    correct: "Il s'est fait mal au pied.",
    wrongs: ["Le pied de la table est cassé.", "Au pied de la montagne.", "Un pied de salade."],
    methode: "On choisit le contexte qui donne le bon sens.",
  },
  {
    text: "Dans 'une opération à l'hôpital' et 'une opération de maths', opération...",
    correct: "a plusieurs sens",
    wrongs: ["est toujours un calcul", "est un déterminant", "n'a aucun sens"],
    methode: "Le même mot peut désigner des réalités différentes.",
  },
];

const VOC_REEMPLOI: QcmItem[] = [
  {
    text: "Quelle phrase emploie bien le mot 'timide' ?",
    correct: "Le petit garçon timide n'osait pas parler.",
    wrongs: ["Le timide roule sur la route.","Il boit un timide au petit-déjeuner.","Timide bleu la maison."],
    methode: "Le mot doit avoir du sens dans la phrase.",
  },
  {
    text: "Quelle phrase emploie bien le mot 'joyeux' ?",
    correct: "Les enfants joyeux dansaient dans la cour.",
    wrongs: ["Le joyeux est sur l'étagère.","Il mange un joyeux.","Joyeux vite la porte."],
    methode: "On réemploie le mot correctement.",
  },
  {
    text: "Quelle phrase emploie bien le mot 'immense' ?",
    correct: "Le désert est immense.",
    wrongs: ["Il court immense.","Un immense sur la table.","Immense le chat mange."],
    methode: "L'adjectif accompagne un nom.",
  },
  {
    text: "Quelle phrase emploie bien le mot 'prudemment' ?",
    correct: "Elle traverse la rue prudemment.",
    wrongs: ["Le prudemment est cassé.","Il mange un prudemment.","Prudemment rouge le mur."],
    methode: "L'adverbe accompagne un verbe.",
  },
  {
    text: "Quelle phrase emploie bien le mot 'délicieux' ?",
    correct: "Ce gâteau est délicieux.",
    wrongs: ["Il marche délicieux.","Un délicieux dans le tiroir.","Délicieux la voiture roule."],
    methode: "L'adjectif qualifie un nom.",
  },
  {
    text: "Quelle phrase emploie bien le mot 'silencieux' ?",
    correct: "Le bébé dort dans un endroit silencieux.",
    wrongs: ["Il boit un silencieux.","Le silencieux tombe de l'arbre.","Silencieux court le chien."],
    methode: "Le mot doit être bien placé.",
  },
  {
    text: "Quelle phrase emploie bien le mot 'courageusement' ?",
    correct: "Le pompier est entré courageusement dans les flammes.",
    // Les leurres emploient l'adverbe comme un adjectif, puis comme un nom :
    // c'est la faute réelle, pas une phrase absurde.
    wrongs: [
      "Le pompier était très courageusement ce jour-là.",
      "Le pompier a montré un grand courageusement.",
      "Le courageusement du pompier a sauvé la maison.",
    ],
    methode: "L'adverbe accompagne le verbe.",
  },
  {
    text: "Quelle phrase emploie bien le mot 'énorme' ?",
    correct: "Un énorme camion bloque la route.",
    wrongs: [
      "Le camion avance énorme sur la route.",
      "Le camion a montré un grand énorme.",
      "L'énorme du camion bloque la route.",
    ],
    methode: "L'adjectif qualifie un nom.",
  },
  {
    text: "Quelle phrase emploie bien le mot 'poli' ?",
    correct: "Un enfant poli dit bonjour et merci.",
    wrongs: ["Le poli roule vite.","Il boit un poli.","Poli la fenêtre est ouverte."],
    methode: "Le mot doit avoir du sens.",
  },
  {
    text: "Quelle phrase emploie bien le mot 'gourmand' ?",
    correct: "Le chat gourmand a mangé tout le poisson.",
    wrongs: ["Le gourmand est en bois.","Il écrit un gourmand.","Gourmand court la rivière."],
    methode: "L'adjectif qualifie un nom.",
  },
  {
    text: "Quelle phrase emploie bien le mot 'attentivement' ?",
    correct: "Il écoute la maîtresse attentivement.",
    wrongs: ["Le attentivement est cassé.","Il boit un attentivement.","Attentivement bleu le ciel."],
    methode: "L'adverbe accompagne le verbe.",
  },
  {
    text: "Quelle phrase réemploie correctement le mot 'courageux' ?",
    correct: "Le pompier courageux a sauvé le chat.",
    wrongs: ["Le courageux de table est cassé.", "Il a mangé un courageux.", "Courageux vite à la maison."],
    methode: "On réemploie un mot dans une phrase qui a du sens.",
  },
  {
    text: "Quelle phrase emploie bien le mot 'fragile' ?",
    correct: "Ce vase est fragile, attention !",
    wrongs: ["Il court fragile le matin.", "Le fragile mange une pomme.", "Fragile sur la table bleue."],
    methode: "Le mot doit être à la bonne place et avoir du sens.",
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
    correct: "femme",
    wrongs: ["fame","famme","feme"],
    methode: "On mémorise l'orthographe des mots fréquents.",
  },
  {
    text: "Quelle est l'orthographe correcte ?",
    correct: "pharmacie",
    wrongs: ["farmacie","pharmassie","pharmacit"],
    methode: "On mémorise l'orthographe des mots fréquents.",
  },
  {
    text: "Quelle est l'orthographe correcte ?",
    correct: "longtemps",
    wrongs: ["longtan","lontemps","longtemp"],
    methode: "On mémorise l'orthographe des mots fréquents.",
  },
  {
    text: "Quelle est l'orthographe correcte ?",
    correct: "maintenant",
    wrongs: ["maintenent","mintenant","maintnant"],
    methode: "On mémorise l'orthographe des mots fréquents.",
  },
  {
    text: "Quelle est l'orthographe correcte ?",
    correct: "monsieur",
    wrongs: ["messieur","monssieur","monsieurt"],
    methode: "On mémorise l'orthographe des mots fréquents.",
  },
  {
    text: "Quelle est l'orthographe correcte ?",
    correct: "automne",
    wrongs: ["autonne","otomne","autaumne"],
    methode: "On mémorise l'orthographe des mots fréquents.",
  },
  {
    text: "Quelle est l'orthographe correcte ?",
    correct: "difficile",
    wrongs: ["dificile","difficille","dificille"],
    methode: "On mémorise l'orthographe des mots fréquents.",
  },
  {
    text: "Quelle est l'orthographe correcte ?",
    correct: "aussi",
    wrongs: ["ossi","aussit","auci"],
    methode: "On mémorise l'orthographe des mots fréquents.",
  },
  {
    text: "Quelle est l'orthographe correcte ?",
    correct: "prochain",
    wrongs: ["prochin","prochein","praucain"],
    methode: "On mémorise l'orthographe des mots fréquents.",
  },
  {
    text: "Quelle est l'orthographe correcte ?",
    correct: "jamais",
    wrongs: ["jamé","jammais","jamait"],
    methode: "On mémorise l'orthographe des mots fréquents.",
  },
  {
    text: "Quelle est l'orthographe correcte ?",
    correct: "heureux",
    wrongs: ["eureux","heureu","hureux"],
    methode: "On mémorise l'orthographe des mots fréquents.",
  },

  {
    text: "Quelle est l'orthographe correcte ?",
    correct: "aujourd'hui",
    wrongs: ["aujourdhui", "aujour'dui", "aujourd'huit"],
    methode: "On mémorise l'orthographe des mots fréquents.",
  },
  {
    text: "Quelle est l'orthographe correcte ?",
    correct: "beaucoup",
    wrongs: ["beaucou", "beacoup", "beaucoupe"],
    methode: "On retient les lettres muettes des mots étudiés.",
  },
  {
    text: "Quelle est l'orthographe correcte ?",
    correct: "toujours",
    wrongs: ["toujour", "toujoure", "toudjours"],
    methode: "Certains mots gardent un 's' final.",
  },
  {
    text: "Quelle est l'orthographe correcte ?",
    correct: "école",
    wrongs: ["ecolle", "aicole", "ekole"],
    methode: "On vérifie l'orthographe des mots usuels.",
  },
];

// ── GRAMMAIRE / ORTHOGRAPHE GRAMMATICALE ────────────────────────────────────

const PHRASE_SIMPLE: QcmItem[] = [
  {
    text: "Quel est le type de la phrase 'Est-ce que tu viens ?' ?",
    correct: "interrogative",
    wrongs: ["déclarative","exclamative","impérative"],
    methode: "Le point d'interrogation marque la question.",
  },
  {
    text: "Combien de verbes conjugués dans 'Paul court et Léa saute' ?",
    correct: "2",
    wrongs: ["1","0","3"],
    methode: "On compte les mots qui se conjuguent.",
  },
  {
    text: "Quel signe termine une phrase qui pose une question ?",
    correct: "le point d'interrogation",
    wrongs: ["le point","la virgule","les deux points"],
    methode: "Une question se termine par ?",
  },
  {
    text: "Quel est le type de 'Ferme la porte, s'il te plaît.' ?",
    correct: "impérative (un ordre)",
    wrongs: ["interrogative","exclamative","déclarative"],
    methode: "Une phrase qui donne un ordre est impérative.",
  },
  {
    text: "À quoi sert une phrase déclarative ?",
    correct: "à raconter ou donner une information",
    wrongs: ["à poser une question","à donner un ordre","à montrer une forte émotion"],
    methode: "La phrase déclarative informe.",
  },
  {
    text: "Quelle phrase est correctement écrite ?",
    correct: "Le train arrive à huit heures.",
    wrongs: ["le train arrive à huit heures","Le train arrive à huit heures","le train arrive à huit heures."],
    methode: "Majuscule au début, point à la fin.",
  },
  {
    text: "Dans une phrase simple, il y a au minimum...",
    correct: "un sujet et un verbe",
    wrongs: ["deux verbes","trois adjectifs","aucun verbe"],
    methode: "Le sujet et le verbe sont indispensables.",
  },
  {
    text: "Quel est le type de 'Comme c'est beau !' ?",
    correct: "exclamative",
    wrongs: ["interrogative","déclarative","impérative"],
    methode: "Le point d'exclamation marque l'émotion.",
  },
  {
    text: "Quel groupe de mots n'est PAS une phrase (pas de sens complet) ?",
    correct: "Dans la grande cour de",
    wrongs: ["Le chat dort.","Il pleut.","Léa chante."],
    methode: "Une phrase a un sens complet.",
  },
  {
    text: "Une phrase commence toujours par...",
    correct: "une majuscule",
    wrongs: ["une virgule","un chiffre","un point"],
    methode: "La majuscule ouvre la phrase.",
  },
  {
    text: "Quelle phrase est une phrase simple (un seul verbe conjugué) ?",
    correct: "Le soleil brille.",
    wrongs: ["Le soleil brille et les oiseaux chantent.", "Quand il pleut, je lis.", "Il court, puis il saute."],
    methode: "Une phrase simple contient un seul verbe conjugué.",
  },
  {
    text: "Combien de verbes conjugués dans 'Le chat dort sur le canapé' ?",
    correct: "1",
    wrongs: ["2", "0", "3"],
    methode: "On cherche le mot qui se conjugue.",
  },
  {
    text: "Quelle est la ponctuation correcte d'une phrase déclarative ?",
    correct: "Elle finit par un point.",
    wrongs: ["Elle finit par une virgule.", "Elle n'a pas de majuscule.", "Elle finit par deux points."],
    methode: "Une phrase déclarative se termine par un point.",
  },
  {
    text: "Quel est le type de la phrase 'Quel beau jardin !' ?",
    correct: "exclamative",
    wrongs: ["interrogative", "déclarative", "impérative"],
    methode: "Le point d'exclamation marque la phrase exclamative.",
  },
  {
    text: "Quel est le type de 'Range ta chambre.' ?",
    correct: "impérative (un ordre)",
    wrongs: ["interrogative", "exclamative", "une question"],
    methode: "Une phrase qui donne un ordre est impérative.",
  },
];

const SUJET_VERBE: QcmItem[] = [
  {
    text: "Dans 'Le facteur apporte le courrier', quel est le sujet ?",
    correct: "Le facteur",
    wrongs: ["apporte","courrier","le"],
    methode: "On pose la question 'qui apporte ?'.",
  },
  {
    text: "Dans 'Les élèves écoutent la maîtresse', quel est le verbe conjugué ?",
    correct: "écoutent",
    wrongs: ["élèves","maîtresse","la"],
    methode: "Le verbe exprime l'action.",
  },
  {
    text: "Dans 'Chaque matin, le coq chante', quel est le sujet ?",
    correct: "le coq",
    wrongs: ["matin","chante","chaque"],
    methode: "On pose 'qui chante ?'.",
  },
  {
    text: "Dans 'Tu ranges ta chambre', quel est le sujet ?",
    correct: "Tu",
    wrongs: ["ranges","chambre","ta"],
    methode: "Le sujet fait l'action.",
  },
  {
    text: "Dans 'Dans le jardin poussent des tomates', quel est le sujet ?",
    correct: "des tomates",
    wrongs: ["le jardin","poussent","dans"],
    methode: "Le sujet peut être après le verbe.",
  },
  {
    text: "Dans 'Mes amis viennent ce soir', quel est le verbe conjugué ?",
    correct: "viennent",
    wrongs: ["amis","soir","mes"],
    methode: "Le verbe change avec le temps.",
  },
  {
    text: "Pour trouver le sujet, quelle question pose-t-on ?",
    correct: "qui est-ce qui fait l'action ?",
    wrongs: [
      "qui est-ce qui subit l'action ?",
      "où et quand se passe l'action ?",
      "comment se passe l'action ?",
    ],
    methode: "Le sujet répond à 'qui est-ce qui ?'.",
  },
  {
    text: "Dans 'La pluie tombe sur la ville', quel est le sujet ?",
    correct: "La pluie",
    wrongs: ["tombe","ville","sur"],
    methode: "On pose 'qu'est-ce qui tombe ?'.",
  },
  {
    text: "Dans 'Vous chantez très bien', quel est le sujet ?",
    correct: "Vous",
    wrongs: ["chantez","bien","très"],
    methode: "Le sujet commande le verbe.",
  },
  {
    text: "Le verbe conjugué est le mot qui...",
    correct: "change avec le temps et la personne",
    wrongs: ["ne change jamais","donne une couleur","montre un lieu"],
    methode: "Le verbe se conjugue.",
  },
  {
    text: "Dans 'Le petit garçon et sa sœur jouent', quel est le sujet ?",
    correct: "Le petit garçon et sa sœur",
    wrongs: ["jouent","le garçon seulement","la sœur seulement"],
    methode: "Deux personnes reliées par 'et' forment le sujet.",
  },
  {
    text: "Dans 'Les grands arbres bougent doucement', quel est le sujet ?",
    correct: "Les grands arbres",
    wrongs: ["bougent", "doucement", "grands"],
    methode: "Le sujet répond à 'qui est-ce qui ...?'.",
  },
  {
    text: "Dans 'Le chien aboie très fort', quel est le verbe conjugué ?",
    correct: "aboie",
    wrongs: ["chien", "fort", "le"],
    methode: "Le verbe exprime l'action et se conjugue.",
  },
  {
    text: "Dans 'Demain, Léa partira en voyage', quel est le sujet ?",
    correct: "Léa",
    wrongs: ["Demain", "voyage", "partira"],
    methode: "On pose la question 'qui partira ?'.",
  },
  {
    text: "Dans 'Sous la table dort un petit chat', quel est le sujet ?",
    correct: "un petit chat",
    wrongs: ["la table", "dort", "sous"],
    methode: "Le sujet peut être placé après le verbe.",
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
    text: "Dans le groupe 'un grand bateau blanc', quel est le nom principal ?",
    correct: "bateau",
    wrongs: ["grand","blanc","un"],
    methode: "Le nom est le mot central du groupe.",
  },
  {
    text: "Quel est le déterminant dans 'mes nouvelles chaussures' ?",
    correct: "mes",
    wrongs: ["nouvelles","chaussures","neuves"],
    methode: "Le déterminant précède et accompagne le nom.",
  },
  {
    text: "Dans 'une voiture neuve', quel mot est un adjectif ?",
    correct: "neuve",
    wrongs: ["une","voiture","."],
    methode: "L'adjectif donne une qualité du nom.",
  },
  {
    text: "Dans 'le chien du voisin', quelle est l'expansion du nom ?",
    correct: "du voisin",
    wrongs: ["le","chien","."],
    methode: "L'expansion précise le nom principal.",
  },
  {
    text: "Quel mot commande l'accord dans le groupe nominal ?",
    correct: "le nom",
    wrongs: ["le verbe","l'adverbe","la préposition"],
    methode: "Déterminant et adjectif s'accordent avec le nom.",
  },
  {
    text: "Combien de mots dans le groupe 'des fleurs rouges' ?",
    correct: "3",
    wrongs: ["2","4","1"],
    methode: "On compte : des / fleurs / rouges.",
  },
  {
    text: "Quel est le nom noyau de 'ce vieux livre poussiéreux' ?",
    correct: "livre",
    wrongs: ["vieux","poussiéreux","ce"],
    methode: "Le nom noyau est le mot central.",
  },
  {
    text: "Un groupe nominal est organisé autour d'un...",
    correct: "nom",
    wrongs: ["verbe","adverbe","déterminant seul"],
    methode: "Le nom est le coeur du groupe nominal.",
  },
  {
    text: "Dans 'une jolie robe à fleurs', quelle est l'expansion du nom ?",
    correct: "à fleurs",
    wrongs: ["une","jolie","robe"],
    methode: "L'expansion complète le nom 'robe'.",
  },
  {
    text: "Quel mot est un déterminant ?",
    correct: "cette",
    wrongs: ["belle","maison","grande"],
    methode: "Le déterminant accompagne le nom.",
  },
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
    methode: "L'expansion précise le nom principal.",
  },
  {
    text: "Quel est le déterminant dans 'ces jolies fleurs' ?",
    correct: "ces",
    wrongs: ["jolies", "fleurs", "joli"],
    methode: "Le déterminant accompagne le nom et le précède.",
  },
  {
    text: "Dans 'une voiture rouge', quel mot est un adjectif ?",
    correct: "rouge",
    wrongs: ["une", "voiture", "."],
    methode: "L'adjectif donne une qualité du nom.",
  },
  {
    text: "Quel groupe est un groupe nominal ?",
    correct: "le grand jardin fleuri",
    wrongs: ["il court vite", "manger une pomme", "très rapidement"],
    methode: "Un groupe nominal est organisé autour d'un nom.",
  },
];

const COMPLEMENTS: QcmItem[] = [
  {
    text: "Dans 'Hier, nous avons visité le musée', quel est le complément de temps ?",
    correct: "Hier",
    wrongs: ["le musée","nous","avons visité"],
    methode: "Le complément de temps dit quand.",
  },
  {
    text: "Dans 'Léo joue au ballon dans le parc', quel groupe dit où ?",
    correct: "dans le parc",
    wrongs: ["au ballon","Léo","joue"],
    methode: "Le complément de lieu répond à 'où ?'.",
  },
  {
    text: "Dans 'Elle mange une pomme', quel est le complément essentiel ?",
    correct: "une pomme",
    wrongs: ["Elle","mange","."],
    methode: "Le complément essentiel ne se supprime pas.",
  },
  {
    text: "Un complément circonstanciel de lieu répond à la question...",
    correct: "où ?",
    wrongs: ["quand ?","qui ?","pourquoi ?"],
    methode: "Le lieu répond à 'où ?'.",
  },
  {
    text: "Un complément circonstanciel de temps répond à la question...",
    correct: "quand ?",
    wrongs: ["où ?","comment ?","combien ?"],
    methode: "Le temps répond à 'quand ?'.",
  },
  {
    text: "Dans 'Le soir, le chat dort sur le canapé', quel est le complément de lieu ?",
    correct: "sur le canapé",
    wrongs: ["Le soir","le chat","dort"],
    methode: "Le lieu répond à 'où ?'.",
  },
  {
    text: "Quel complément peut être supprimé sans casser la phrase ?",
    correct: "le complément circonstanciel",
    wrongs: ["le sujet","le verbe","le complément essentiel"],
    methode: "Les circonstanciels sont facultatifs.",
  },
  {
    text: "Dans 'Il lit un livre à la bibliothèque', quel est le complément essentiel ?",
    correct: "un livre",
    wrongs: ["à la bibliothèque","Il","lit"],
    methode: "Le complément essentiel complète le verbe.",
  },
  {
    text: "Dans 'Elle a fini son dessin rapidement', quel mot dit comment ?",
    correct: "rapidement",
    wrongs: ["son dessin","elle","a fini"],
    methode: "Le complément de manière répond à 'comment ?'.",
  },
  {
    text: "Le complément essentiel complète surtout...",
    correct: "le verbe",
    wrongs: ["l'adjectif","le déterminant","la virgule"],
    methode: "L'essentiel dépend du verbe.",
  },
  {
    text: "Dans 'Nous partons demain en voyage', quel mot dit quand ?",
    correct: "demain",
    wrongs: ["en voyage","Nous","partons"],
    methode: "Le complément de temps répond à 'quand ?'.",
  },
  {
    text: "Dans 'Le matin, Tom lit un livre', quel est le complément circonstanciel de temps ?",
    correct: "Le matin",
    wrongs: ["un livre", "Tom", "lit"],
    methode: "Le complément circonstanciel de temps dit quand.",
  },
  {
    text: "Dans 'Elle range ses affaires dans le tiroir', quel groupe dit où ?",
    correct: "dans le tiroir",
    wrongs: ["ses affaires", "Elle", "range"],
    methode: "Le complément de lieu répond à 'où ?'.",
  },
  {
    text: "Dans 'Le chat mange sa croquette', quel est le complément essentiel ?",
    correct: "sa croquette",
    wrongs: ["Le chat", "mange", "."],
    methode: "Le complément essentiel ne peut pas être supprimé.",
  },
  {
    text: "Quel complément peut être déplacé ou supprimé ?",
    correct: "le complément circonstanciel",
    wrongs: ["le sujet", "le verbe", "le complément essentiel"],
    methode: "Les compléments circonstanciels sont mobiles et facultatifs.",
  },
];

const ACCORD_GN: QcmItem[] = [
  {
    text: "Quel groupe nominal est correctement accordé ?",
    correct: "les fleurs rouges",
    wrongs: ["les fleur rouge", "la fleurs rouges", "un fleurs rouge"],
    methode: "Déterminant, nom et adjectif s'accordent en genre et en nombre.",
  },
  {
    text: "Quel groupe est bien accordé ?",
    correct: "des chats noirs",
    wrongs: ["des chat noirs", "des chats noir", "un chats noir"],
    methode: "Au pluriel, le nom et l'adjectif prennent souvent un 's'.",
  },
  {
    text: "Quel groupe est bien accordé ?",
    correct: "une grande maison",
    wrongs: ["une grand maison", "un grande maison", "une grandes maison"],
    methode: "Au féminin, l'adjectif s'accorde avec le nom.",
  },
  {
    text: "Quel groupe est bien accordé ?",
    correct: "les petits chiens",
    wrongs: ["les petit chiens", "les petits chien", "le petits chiens"],
    methode: "Tout le groupe nominal s'accorde au pluriel.",
  },
  {
    text: "Quel groupe est bien accordé ?",
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
    text: "Quelle phrase est correctement accordée ?",
    correct: "Le chien et le chat dorment.",
    wrongs: ["Le chien et le chat dort.", "Le chien et le chat dormons.", "Le chien et le chat dormez."],
    methode: "Deux sujets reliés par 'et' donnent un verbe au pluriel.",
  },
  {
    text: "Quelle phrase est correcte ?",
    correct: "Nous mangeons à midi.",
    wrongs: ["Nous mange à midi.", "Nous mangent à midi.", "Nous mangez à midi."],
    methode: "Avec 'nous', le verbe se termine souvent par '-ons'.",
  },
  {
    text: "Quelle phrase est correcte ?",
    correct: "Les oiseaux chantent le matin.",
    wrongs: ["Les oiseaux chante le matin.", "Les oiseaux chantes le matin.", "L'oiseaux chantent le matin."],
    methode: "Un sujet pluriel commande un verbe au pluriel.",
  },
  {
    text: "Dans 'Les élèves de la classe ___ attentifs', quelle forme convient ?",
    correct: "sont",
    wrongs: ["est", "es", "êtes"],
    methode: "Le sujet 'les élèves' est pluriel : le verbe être devient 'sont'.",
  },
];

const HOMOPHONES: QcmItem[] = [
  {
    text: "Homophones 'a' / 'à' : choisis la phrase correcte.",
    correct: "Il a un nouveau vélo.",
    wrongs: ["Il à un nouveau vélo.", "Il as un nouveau vélo.", "Il a un nouveau vélo à."],
    methode: "'a' = verbe avoir ; 'à' = préposition.",
  },
  {
    text: "Homophones 'a' / 'à' : choisis la phrase correcte.",
    correct: "Elle va à l'école.",
    wrongs: ["Elle va a l'école.", "Elle va as l'école.", "Elle va a l'école à."],
    methode: "'à' avec accent indique le lieu ou la direction.",
  },
  {
    text: "Homophones 'est' / 'et' : choisis la phrase correcte.",
    correct: "Mon frère est grand et fort.",
    wrongs: ["Mon frère et grand et fort.", "Mon frère es grand et fort.", "Mon frère est grand est fort."],
    methode: "'est' = verbe être ; 'et' = pour relier.",
  },
  {
    text: "Homophones 'son' / 'sont' : choisis la phrase correcte.",
    correct: "Les enfants sont contents de leur cadeau.",
    wrongs: ["Les enfants son contents.", "Les enfants sont content.", "Les enfants sonts contents."],
    methode: "'sont' = verbe être ; 'son' = à lui.",
  },
  {
    text: "Homophones 'on' / 'ont' : choisis la phrase correcte.",
    correct: "Ils ont gagné le match.",
    wrongs: ["Ils on gagné le match.", "Ils ont gagner le match.", "Il ont gagné le match."],
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
    wrongs: ["Il range ces affaires à lui.", "Il range ses affaire.", "Il range ce affaires."],
    methode: "'ses' = les siens (à lui) ; 'ces' = ceux-là (que je montre).",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LES NEUF POOLS AJOUTÉS LE 11/08/2026 — CM2, mise au niveau du BO

   Relu sur le programme du cycle 3 (BO n° 16 du 17 avril 2025), rubrique
   « Grammaire et orthographe grammaticale — Cours moyen deuxième année ».
   Neuf objectifs d'apprentissage nommés par le texte n'avaient ni
   micro-compétence ni question. La couverture affichait pourtant 50/50.

   ⚠️ Douze énoncés par pool au minimum. Chaque micro reçoit trois gabarits qui
   puisent tous dans le même pool : en dessous de douze, l'élève reverrait la
   même question dès son deuxième passage. Le plancher mesuré du CE2 est de 11.
   ⚠️ Ces pools ne servent qu'au CM2 : les branches d'aiguillage sont accrochées
   à des `microId` que le CM1 et la 6e n'ont pas.
   ═══════════════════════════════════════════════════════════════════════════ */

const NATURE_FONCTION: QcmItem[] = [
  {
    text: "Dans « Le pêcheur répare son filet », quelle est la NATURE du mot « pêcheur » ?",
    correct: "un nom",
    wrongs: ["un sujet", "un complément", "une fonction"],
    methode: "La nature dit ce que le mot EST. Sujet et complément sont des fonctions, pas des natures.",
  },
  {
    text: "Dans « Le pêcheur répare son filet », quelle est la FONCTION du groupe « Le pêcheur » ?",
    correct: "sujet du verbe",
    wrongs: ["un nom", "un groupe nominal", "un déterminant"],
    methode: "La fonction dit le RÔLE du groupe dans la phrase.",
  },
  {
    text: "« Sujet », c'est…",
    correct: "une fonction",
    wrongs: ["une nature", "une classe de mots", "un temps du verbe"],
    methode: "On est sujet DANS une phrase : c'est un rôle, donc une fonction.",
  },
  {
    text: "« Adjectif », c'est…",
    correct: "une nature",
    wrongs: ["une fonction", "un complément", "un accord"],
    methode: "Un mot est adjectif dans le dictionnaire, avant toute phrase.",
  },
  {
    text: "Un même mot peut-il changer de fonction d'une phrase à l'autre ?",
    correct: "Oui : sa nature ne bouge pas, sa fonction change",
    wrongs: [
      "Oui : sa fonction ne bouge pas, sa nature change",
      "Non : nature et fonction vont toujours ensemble",
      "Oui, mais seulement pour les noms et les verbes",
    ],
    methode: "« Le chien dort » / « Je vois le chien » : nom dans les deux, sujet puis complément.",
  },
  {
    text: "Pour trouver la NATURE d'un mot, on se demande…",
    correct: "ce qu'il est : nom, verbe, adjectif, déterminant…",
    wrongs: [
      "ce qu'il fait : sujet, complément, attribut…",
      "où il se place : avant le verbe, après, en tête",
      "comment il varie : au pluriel, au féminin, au passé",
    ],
    methode: "La nature se lit sur le mot seul ; la fonction demande la phrase entière.",
  },
  {
    text: "Pour trouver la FONCTION d'un groupe, on se demande…",
    correct: "quel rôle il joue dans la phrase",
    wrongs: ["à quelle classe il appartient", "combien il a de lettres", "s'il porte un accent"],
    methode: "Sujet ? complément ? attribut ? C'est la phrase qui répond.",
  },
  {
    // ⚠️ Ce pool sert aussi au CM1, qui n'a pas encore rencontré le complément
    // du nom — il entre au CM2. « Épithète », lui, est abordé dès le CM1.
    text: "« Épithète », c'est…",
    correct: "une fonction",
    wrongs: ["une nature", "une classe grammaticale", "un temps du verbe"],
    methode: "Un adjectif (nature) peut être épithète ou attribut (fonctions) selon la phrase.",
  },
  {
    text: "Dans « Les enfants ramassent des letchis », quelle est la nature de « des » ?",
    correct: "un déterminant",
    wrongs: ["un nom", "un pronom", "une préposition"],
    methode: "Il annonce le nom « letchis » et donne son nombre.",
  },
  {
    text: "Dans « Le lagon est calme », quelle est la nature de « calme » ?",
    correct: "un adjectif",
    wrongs: ["un nom", "un adverbe", "un verbe"],
    methode: "Il dit comment est le lagon : c'est un adjectif.",
  },
  {
    text: "Un pronom peut avoir la fonction de…",
    correct: "sujet ou complément",
    wrongs: ["verbe", "adjectif", "déterminant"],
    methode: "« Il dort » : sujet. « Je le vois » : complément. Même nature, deux fonctions.",
  },
  {
    text: "Dans « Léa lit un livre », quelle est la fonction de « un livre » ?",
    correct: "complément du verbe",
    wrongs: ["sujet", "un nom", "un groupe nominal"],
    methode: "« Lit quoi ? » — un livre. C'est le rôle du groupe, donc sa fonction.",
  },
];

const PREPOSITIONS: QcmItem[] = [
  {
    text: "Dans « Le margouillat dort sur le mur », quel mot est une préposition ?",
    correct: "sur",
    wrongs: ["le", "margouillat", "dort"],
    methode: "La préposition relie le verbe à son complément : à, de, dans, sur, sous, pour, avec…",
  },
  {
    text: "Laquelle de ces listes ne contient QUE des prépositions ?",
    correct: "à, dans, pour, avec",
    wrongs: ["mais, ou, et, donc", "le, la, les, des", "je, tu, il, elle"],
    methode: "mais/ou/et/donc coordonnent ; le/la/les déterminent ; je/tu/il sont des pronoms.",
  },
  {
    text: "Dans « Je pense que tu as raison », le mot « que » est…",
    correct: "une conjonction de subordination",
    wrongs: ["une préposition", "un pronom personnel", "un déterminant"],
    methode: "Il accroche une proposition entière à la première.",
  },
  {
    text: "Dans « Il rentre parce qu'il pleut », « parce que » est…",
    correct: "une conjonction de subordination",
    wrongs: ["une conjonction de coordination", "une préposition", "un adverbe"],
    methode: "Elle introduit une proposition qui donne la cause.",
  },
  {
    text: "« mais, ou, et, donc, or, ni, car » sont des…",
    correct: "conjonctions de coordination",
    wrongs: ["conjonctions de subordination", "prépositions", "adverbes"],
    methode: "Elles relient deux éléments de même rang, sans en soumettre un à l'autre.",
  },
  {
    text: "À quoi sert une préposition ?",
    correct: "à relier un mot à son complément",
    wrongs: ["à relier deux propositions", "à conjuguer un verbe", "à accorder un adjectif"],
    methode: "« le cari DE ma grand-mère » : « de » accroche le complément au nom.",
  },
  {
    text: "Dans « le cari de ma grand-mère », quel mot introduit le complément du nom ?",
    correct: "de",
    wrongs: ["le", "cari", "grand-mère"],
    methode: "Le complément du nom passe presque toujours par une préposition.",
  },
  {
    text: "Dans « Il attend depuis le matin », le mot « depuis » est…",
    correct: "une préposition",
    wrongs: ["un adverbe", "une conjonction de subordination", "un verbe"],
    methode: "Il introduit le groupe « le matin » et ne se conjugue pas.",
  },
  {
    text: "Quelle conjonction de subordination introduit une cause ?",
    correct: "parce que",
    wrongs: ["et", "mais", "ou"],
    methode: "Les trois autres coordonnent : elles ne disent pas pourquoi.",
  },
  {
    text: "Une conjonction de subordination relie…",
    correct: "une proposition à une autre",
    wrongs: ["deux noms", "un nom à son déterminant", "deux adjectifs"],
    methode: "Elle demande un verbe conjugué derrière elle.",
  },
  {
    text: "Dans « Nous partirons quand la pluie s'arrêtera », le mot « quand » est…",
    correct: "une conjonction de subordination",
    wrongs: ["une préposition", "un adverbe de lieu", "un déterminant"],
    methode: "Derrière lui, une proposition entière avec son verbe conjugué.",
  },
  {
    text: "Les prépositions sont des mots…",
    correct: "invariables",
    wrongs: ["qui s'accordent avec le nom", "qui se conjuguent", "qui prennent un s au pluriel"],
    methode: "« sur le mur », « sur les murs » : « sur » ne bouge pas.",
  },
];

const SUJET_INVERSE: QcmItem[] = [
  {
    text: "Dans « Sur le piton souffle un vent froid », quel est le sujet ?",
    correct: "un vent froid",
    wrongs: ["Sur le piton", "souffle", "froid"],
    methode: "Qui est-ce qui souffle ? Un vent froid — même s'il est placé derrière le verbe.",
  },
  {
    text: "Dans « Où va ton frère ? », quel est le sujet ?",
    correct: "ton frère",
    wrongs: ["Où", "va", "ton"],
    methode: "Dans une question, le sujet passe souvent derrière le verbe.",
  },
  {
    text: "Comment trouve-t-on un sujet inversé ?",
    correct: "On pose « qui est-ce qui ? » devant le verbe, même si la réponse est derrière",
    wrongs: [
      "On prend le groupe placé juste devant le verbe, comme d'habitude",
      "On pose « qui est-ce qui ? » après le verbe, puisque le sujet suit",
      "On repère le point d'interrogation : le sujet est toujours inversé",
    ],
    methode: "La question marche toujours ; la place, non.",
  },
  {
    text: "Un sujet inversé est un sujet qui…",
    correct: "est placé après le verbe",
    wrongs: ["n'existe pas", "est toujours au pluriel", "est toujours un pronom"],
    methode: "Inversé veut dire « retourné » : le verbe passe devant.",
  },
  {
    text: "Dans « Arrivent alors les pêcheurs », le sujet est…",
    correct: "les pêcheurs",
    wrongs: ["Arrivent", "alors", "il n'y en a pas"],
    methode: "Qui est-ce qui arrive ? Les pêcheurs.",
  },
  {
    text: "Dans « Que veut ta sœur ? », le sujet est…",
    correct: "ta sœur",
    wrongs: ["Que", "veut", "ta"],
    methode: "« Que » est le complément : qui est-ce qui veut ? Ta sœur.",
  },
  {
    text: "« Dans le lagon nagent des poissons. » Avec quoi le verbe s'accorde-t-il ?",
    correct: "avec « des poissons »",
    wrongs: ["avec « le lagon »", "avec « Dans »", "avec rien du tout"],
    methode: "Le groupe le plus proche du verbe n'est pas le sujet : le sujet est derrière.",
  },
  {
    text: "Quand rencontre-t-on souvent un sujet inversé ?",
    correct: "dans une question",
    wrongs: ["dans une phrase négative", "dans une phrase exclamative seulement", "jamais"],
    methode: "« Viens-tu ? », « Où va ton frère ? » : le verbe passe devant.",
  },
  {
    text: "Dans « Ainsi parlait le maitre », le sujet est…",
    correct: "le maitre",
    wrongs: ["Ainsi", "parlait", "Ainsi parlait"],
    methode: "« Ainsi » dit comment : c'est un complément, pas le sujet.",
  },
  {
    text: "« Sous les filaos dorment deux chiens. » Combien la phrase a-t-elle de sujets ?",
    correct: "un seul : « deux chiens »",
    wrongs: ["deux : les filaos et les chiens", "aucun", "trois"],
    methode: "« Sous les filaos » dit où : c'est un complément circonstanciel.",
  },
  {
    text: "Pourquoi faut-il savoir repérer un sujet inversé ?",
    correct: "Parce que c'est lui qui commande l'accord du verbe",
    wrongs: [
      "Parce qu'il faut le supprimer",
      "Parce qu'il change le temps du verbe",
      "Parce qu'il prend une majuscule",
    ],
    methode: "Se tromper de sujet, c'est se tromper de terminaison.",
  },
  {
    text: "« Que disent tes parents ? » Pourquoi le verbe est-il au pluriel ?",
    correct: "Parce que le sujet « tes parents » est au pluriel",
    wrongs: [
      "Parce que « Que » est au pluriel",
      "Parce que la phrase est une question",
      "Parce qu'il y a un point d'interrogation",
    ],
    methode: "Le sujet inversé commande, exactement comme un sujet placé devant.",
  },
];

const COD_COI: QcmItem[] = [
  {
    text: "Dans « Léa mange une mangue », le groupe « une mangue » est…",
    correct: "un complément d'objet direct",
    wrongs: ["un complément d'objet indirect", "un complément de lieu", "le sujet"],
    methode: "Il suit le verbe sans préposition : mange QUOI ?",
  },
  {
    text: "Dans « Léa parle à sa grand-mère », le groupe « à sa grand-mère » est…",
    correct: "un complément d'objet indirect",
    wrongs: ["un complément d'objet direct", "un complément de temps", "un attribut du sujet"],
    methode: "Une préposition s'est glissée entre le verbe et son complément : parle À QUI ?",
  },
  {
    text: "Comment reconnait-on un complément d'objet DIRECT ?",
    correct: "Il suit le verbe sans préposition : on demande « qui ? » ou « quoi ? »",
    wrongs: [
      "Il suit le verbe avec une préposition : on demande « à qui ? »",
      "Il se déplace et se supprime sans que la phrase soit cassée",
      "Il se place toujours en tête de phrase, devant le sujet",
    ],
    methode: "Direct veut dire : rien entre le verbe et lui.",
  },
  {
    text: "Comment reconnait-on un complément d'objet INDIRECT ?",
    correct: "Il est relié au verbe par une préposition : à, de…",
    wrongs: [
      "Il suit le verbe sans préposition : on demande « quoi ? »",
      "Il se déplace et se supprime sans casser la phrase",
      "Il se place toujours après le complément circonstanciel",
    ],
    methode: "Indirect veut dire : on y arrive par un petit mot.",
  },
  {
    text: "Dans « Il pense à son voyage », le complément est…",
    correct: "un COI",
    wrongs: ["un COD", "un complément de lieu", "un attribut du sujet"],
    methode: "Pense À quoi ? La préposition « à » signe le complément indirect.",
  },
  {
    text: "Dans « Le pêcheur répare son filet », quelle question pose-t-on ?",
    correct: "répare quoi ?",
    wrongs: ["répare à qui ?", "répare où ?", "répare quand ?"],
    methode: "Pas de préposition : la question est « qui ? » ou « quoi ? ».",
  },
  {
    text: "Lequel de ces verbes se construit avec un complément d'objet INDIRECT ?",
    correct: "téléphoner à quelqu'un",
    wrongs: ["manger quelque chose", "regarder quelque chose", "prendre quelque chose"],
    methode: "On téléphone À quelqu'un : la préposition fait partie du verbe.",
  },
  {
    text: "Dans « Elle offre un cadeau à son frère », quel est le COD ?",
    correct: "un cadeau",
    wrongs: ["à son frère", "Elle", "offre"],
    methode: "Offre quoi ? Un cadeau, sans préposition.",
  },
  {
    text: "Dans « Elle offre un cadeau à son frère », quel est le COI ?",
    correct: "à son frère",
    wrongs: ["un cadeau", "Elle", "offre"],
    methode: "Offre à qui ? À son frère — la préposition est là.",
  },
  {
    text: "Peut-on supprimer le complément d'objet d'une phrase ?",
    correct: "Non : la phrase ne veut plus rien dire",
    wrongs: ["Oui, toujours", "Seulement s'il est au pluriel", "Seulement dans une question"],
    methode: "C'est ce qui le sépare du complément circonstanciel, lui facultatif.",
  },
  {
    text: "Dans « Nous parlons de la sortie », le groupe « de la sortie » est…",
    correct: "un COI",
    wrongs: ["un COD", "un complément de lieu", "un complément du nom"],
    methode: "Parlons DE quoi ? La préposition « de » signe l'indirect.",
  },
  {
    text: "Le complément d'objet direct répond à la question…",
    correct: "qui ? ou quoi ?",
    wrongs: ["à qui ? ou à quoi ?", "où ?", "quand ?"],
    methode: "Sans préposition dans la question : c'est le signe du direct.",
  },
];

const CC_SORTES: QcmItem[] = [
  {
    text: "Dans « Hier, nous sommes allés au marché », « Hier » est un complément circonstanciel de…",
    correct: "temps",
    wrongs: ["lieu", "cause", "manière"],
    methode: "Il répond à « quand ? ».",
  },
  {
    text: "Dans « Hier, nous sommes allés au marché », « au marché » est un complément circonstanciel de…",
    correct: "lieu",
    wrongs: ["temps", "cause", "manière"],
    methode: "Il répond à « où ? ».",
  },
  {
    text: "Dans « Il est rentré parce qu'il pleuvait », le groupe souligné dit…",
    correct: "la cause",
    wrongs: ["le temps", "le lieu", "la manière"],
    methode: "Il répond à « pourquoi ? ».",
  },
  {
    text: "Un complément circonstanciel de cause répond à la question…",
    correct: "pourquoi ?",
    wrongs: ["quand ?", "où ?", "comment ?"],
    methode: "La cause explique ce qui a provoqué l'action.",
  },
  {
    text: "Un complément circonstanciel de temps répond à la question…",
    correct: "quand ?",
    wrongs: ["où ?", "pourquoi ?", "avec qui ?"],
    methode: "Hier, demain, depuis trois jours, le samedi…",
  },
  {
    text: "Un complément circonstanciel de lieu répond à la question…",
    correct: "où ?",
    wrongs: ["quand ?", "pourquoi ?", "combien ?"],
    methode: "Sur la plage, au marché, sous le tamarin…",
  },
  {
    text: "« Le samedi, les enfants jouent sur la plage. » Combien y a-t-il de compléments circonstanciels ?",
    correct: "deux : un de temps, un de lieu",
    wrongs: [
      "un seul : « sur la plage »",
      "un seul : « Le samedi »",
      "trois : avec « les enfants » en plus",
    ],
    methode: "« Le samedi » dit quand, « sur la plage » dit où.",
  },
  {
    text: "Dans « À cause de la pluie, le match est annulé », le complément dit…",
    correct: "la cause",
    wrongs: ["le temps", "le lieu", "la manière"],
    methode: "« À cause de » annonce toujours la cause.",
  },
  {
    text: "Peut-on déplacer un complément circonstanciel dans la phrase ?",
    correct: "Oui : c'est justement ce qui le distingue du complément d'objet",
    wrongs: [
      "Non : comme le complément d'objet, il reste collé au verbe",
      "Oui, mais seulement s'il tient en un ou deux mots très courts",
      "Oui, mais seulement vers la fin, jamais en tête de la phrase",
    ],
    methode: "« Hier, il pleuvait. » / « Il pleuvait hier. » Les deux tiennent debout.",
  },
  {
    text: "Dans « Depuis trois jours, il souffle un vent fort », le complément dit…",
    correct: "le temps",
    wrongs: ["le lieu", "la cause", "la manière"],
    methode: "Depuis quand ? Depuis trois jours.",
  },
  {
    text: "Dans « Ils se sont abrités sous le tamarin », le complément dit…",
    correct: "le lieu",
    wrongs: ["le temps", "la cause", "la manière"],
    methode: "Abrités où ? Sous le tamarin.",
  },
  {
    text: "Comment vérifier qu'un groupe est bien un complément circonstanciel ?",
    correct: "On essaie de le déplacer ou de le supprimer : la phrase tient encore",
    wrongs: [
      "On regarde s'il suit le verbe : le circonstanciel est toujours après",
      "On remplace le groupe par un pronom : si cela marche, c'en est un",
      "On vérifie qu'il commence par une préposition comme « à » ou « de »",
    ],
    methode: "Le complément d'objet, lui, ne supporte ni l'un ni l'autre.",
  },
];

const ATTRIBUT: QcmItem[] = [
  {
    text: "Dans « Le lagon est calme », le mot « calme » est…",
    correct: "un attribut du sujet",
    wrongs: ["un complément d'objet direct", "un complément de lieu", "le sujet"],
    methode: "Il dit ce que le lagon EST, et il passe par le verbe « être ».",
  },
  {
    text: "Qu'est-ce qui relie un attribut à son sujet ?",
    correct: "un verbe d'état : être, sembler, devenir, paraitre, rester",
    wrongs: [
      "un verbe d'action : courir, prendre, dire, regarder, partir",
      "une préposition : à, de, par, pour, avec, sans, chez",
      "une conjonction : et, ou, mais, donc, or, ni, car",
    ],
    methode: "Sans verbe d'état, pas d'attribut.",
  },
  {
    text: "Dans « Elle est devenue maitresse », le mot « maitresse » est…",
    correct: "un attribut du sujet",
    wrongs: ["un COD", "un COI", "un complément du nom"],
    methode: "« devenir » est un verbe d'état : il annonce ce que le sujet est.",
  },
  {
    text: "Comment distinguer un attribut du sujet d'un complément d'objet ?",
    correct: "L'attribut dit ce que le sujet EST ; le complément d'objet dit ce qu'il subit",
    // ⭐ Le premier leurre INVERSE la règle.
    wrongs: [
      "L'attribut dit ce que le sujet SUBIT ; le complément ce qu'il EST",
      "L'attribut se place après le verbe, le complément d'objet avant",
      "L'attribut est un adjectif, le complément d'objet toujours un nom",
    ],
    methode: "« Il est pêcheur » : il L'EST. « Il voit un pêcheur » : ce n'est pas lui.",
  },
  {
    text: "Dans « Tom regarde la mer », le groupe « la mer » est…",
    correct: "un complément d'objet direct",
    wrongs: ["un attribut du sujet", "un complément de lieu", "le sujet"],
    methode: "« regarder » n'est pas un verbe d'état : Tom n'est pas la mer.",
  },
  {
    text: "Lequel de ces verbes est un verbe d'état ?",
    correct: "sembler",
    wrongs: ["manger", "courir", "prendre"],
    methode: "Les verbes d'état ne disent pas une action : ils relient le sujet à ce qu'il est.",
  },
  {
    text: "Dans « Les letchis sont mûrs », le mot « mûrs » est…",
    correct: "un attribut du sujet",
    wrongs: ["une épithète", "un COD", "un complément du nom"],
    methode: "Il passe par « sont » : c'est un attribut, pas une épithète collée au nom.",
  },
  {
    text: "Peut-on supprimer l'attribut du sujet ?",
    correct: "Non : « Le lagon est. » ne veut plus rien dire",
    wrongs: [
      "Oui : comme le complément circonstanciel, il s'enlève",
      "Oui, mais seulement quand c'est un adjectif",
      "Non : mais on peut le déplacer en tête de phrase",
    ],
    methode: "Le verbe d'état ne peut pas rester seul.",
  },
  {
    text: "Dans « Mon frère parait fatigué », quel est le verbe d'état ?",
    correct: "parait",
    wrongs: ["Mon frère", "fatigué", "il n'y en a pas"],
    methode: "paraitre, sembler, devenir, rester, demeurer : tous des verbes d'état.",
  },
  {
    text: "Un attribut du sujet peut être…",
    correct: "un adjectif ou un nom",
    wrongs: ["seulement un adjectif", "seulement un verbe", "seulement un adverbe"],
    methode: "« Il est grand » (adjectif), « Il est pêcheur » (nom).",
  },
  {
    text: "Dans « Il est pêcheur », à quoi se rapporte le mot « pêcheur » ?",
    correct: "au sujet « Il »",
    wrongs: ["au verbe « est »", "à personne", "au complément"],
    methode: "L'attribut décrit toujours le sujet : c'est pour cela qu'il s'accorde avec lui.",
  },
  {
    text: "Laquelle de ces phrases contient un attribut du sujet ?",
    correct: "La mer est agitée.",
    wrongs: ["Elle prend son cartable.", "Il court sur la plage.", "Nous mangeons un cari."],
    methode: "Cherche le verbe d'état : c'est lui qui annonce l'attribut.",
  },
];

const COMPLEMENT_NOM: QcmItem[] = [
  {
    text: "Dans « le cari de ma grand-mère », le groupe « de ma grand-mère » est…",
    correct: "un complément du nom",
    wrongs: ["un attribut du sujet", "un complément d'objet direct", "une épithète"],
    methode: "Il complète le nom « cari », et il passe par une préposition.",
  },
  {
    text: "Une épithète, c'est…",
    correct: "un adjectif collé au nom, sans préposition",
    wrongs: [
      "un groupe introduit par une préposition",
      "un verbe d'état",
      "un pronom qui remplace le nom",
    ],
    methode: "« une plage déserte » : rien entre le nom et l'adjectif.",
  },
  {
    text: "Dans « une plage déserte », le mot « déserte » est…",
    correct: "une épithète",
    wrongs: ["un attribut du sujet", "un complément du nom", "un adverbe"],
    methode: "Il est collé au nom, sans verbe entre les deux.",
  },
  {
    text: "Dans « La plage est déserte », le mot « déserte » est…",
    correct: "un attribut du sujet",
    wrongs: ["une épithète", "un complément du nom", "un COD"],
    methode: "Le verbe « est » s'est glissé entre le nom et l'adjectif : ce n'est plus une épithète.",
  },
  {
    text: "Qu'est-ce qui sépare une épithète d'un attribut du sujet ?",
    correct: "L'épithète est collée au nom ; l'attribut passe par un verbe d'état",
    // ⭐ Le premier leurre INVERSE la règle : savoir laquelle des deux passe
    // par le verbe, c'est tout ce que la notion demande.
    wrongs: [
      "L'attribut est collé au nom ; l'épithète passe par un verbe d'état",
      "L'épithète se place avant le nom ; l'attribut se place après",
      "L'épithète est un adjectif ; l'attribut est toujours un nom",
    ],
    methode: "Même adjectif, deux fonctions : tout dépend du verbe.",
  },
  {
    text: "Un complément du nom est presque toujours introduit par…",
    correct: "une préposition : de, à, en…",
    wrongs: ["un déterminant", "un verbe", "un adverbe"],
    methode: "« un jus DE letchi », « une case EN tôle ».",
  },
  {
    text: "Dans « un jus de letchi », quel est le nom noyau ?",
    correct: "jus",
    wrongs: ["letchi", "de", "un"],
    methode: "C'est le nom principal ; « de letchi » ne fait que le préciser.",
  },
  {
    text: "Dans « la case en tôle », le groupe « en tôle » est…",
    correct: "un complément du nom",
    wrongs: ["une épithète", "un attribut du sujet", "un complément de lieu"],
    methode: "Il précise « case », et il passe par la préposition « en ».",
  },
  {
    text: "Comment enrichir le nom « bateau » avec un COMPLÉMENT DU NOM ?",
    correct: "un bateau de pêche",
    wrongs: ["un bateau rapide", "le bateau part", "ce bateau"],
    methode: "Le complément du nom passe par une préposition ; l'épithète, non.",
  },
  {
    text: "Comment enrichir le nom « bateau » avec une ÉPITHÈTE ?",
    correct: "un bateau rapide",
    wrongs: ["un bateau de pêche", "le bateau du pêcheur", "ce bateau"],
    methode: "Un adjectif collé au nom, sans petit mot entre les deux.",
  },
  {
    text: "À quoi servent l'épithète et le complément du nom ?",
    correct: "tous les deux à préciser le nom",
    wrongs: [
      "à conjuguer le verbe",
      "à remplacer le sujet",
      "à relier deux phrases",
    ],
    methode: "Ils enrichissent le groupe nominal, chacun à sa façon.",
  },
  {
    text: "Dans « le chemin du piton », que précise le groupe « du piton » ?",
    correct: "le nom « chemin »",
    wrongs: ["le verbe de la phrase", "le sujet de la phrase", "rien du tout"],
    methode: "Quel chemin ? Celui du piton. Il complète le nom.",
  },
];

const ACCORD_ATTRIBUT: QcmItem[] = [
  {
    text: "« Les letchis sont mûr___. » Que faut-il écrire ?",
    correct: "mûrs",
    wrongs: ["mûr", "mûre", "mûres"],
    methode: "L'attribut s'accorde avec le sujet : « Les letchis » est masculin pluriel.",
  },
  {
    text: "« La mer est agité___. »",
    correct: "agitée",
    wrongs: ["agité", "agités", "agitées"],
    methode: "Sujet féminin singulier : l'attribut prend un « e ».",
  },
  {
    text: "L'attribut du sujet s'accorde…",
    correct: "avec le sujet",
    wrongs: ["avec le complément d'objet", "avec le verbe", "jamais"],
    methode: "C'est lui qu'il décrit, c'est donc lui qui commande.",
  },
  {
    text: "« Mes cousines semblent fatigué___. »",
    correct: "fatiguées",
    wrongs: ["fatigué", "fatigués", "fatiguée"],
    methode: "« Mes cousines » : féminin pluriel. L'attribut suit.",
  },
  {
    text: "« Le cari est bon. » Écris cette phrase au pluriel.",
    correct: "Les caris sont bons.",
    wrongs: ["Les caris sont bon.", "Les caris est bons.", "Les caris sont bonnes."],
    methode: "Trois mots bougent : le déterminant, le verbe, et l'attribut.",
  },
  {
    text: "Pour accorder l'attribut, que cherche-t-on en premier ?",
    correct: "le sujet du verbe d'état",
    wrongs: [
      "le complément d'objet",
      "le dernier mot de la phrase",
      "le déterminant le plus proche",
    ],
    methode: "On remonte au sujet, puis on regarde son genre et son nombre.",
  },
  {
    text: "« Ces filaos paraissent vieux. » Avec quoi « vieux » s'accorde-t-il ?",
    correct: "avec « Ces filaos »",
    wrongs: ["avec « paraissent »", "avec le déterminant « Ces » seulement", "avec rien"],
    methode: "L'attribut s'accorde avec le groupe sujet tout entier.",
  },
  {
    text: "« Ma sœur est devenue institutrice. » Pourquoi « institutrice » ?",
    correct: "Parce que le sujet « Ma sœur » est féminin singulier",
    wrongs: [
      "Parce que le verbe est au passé",
      "Parce que c'est un nom de métier",
      "Parce qu'il y a le mot « devenue »",
    ],
    methode: "Un attribut peut être un nom : il s'accorde quand même avec le sujet.",
  },
  {
    text: "« Les enfants restent calme___. »",
    correct: "calmes",
    wrongs: ["calme", "calmement", "calmés"],
    methode: "« rester » est un verbe d'état : « calmes » est attribut et suit le sujet.",
  },
  {
    text: "Dans « Les vagues sont hautes », combien y a-t-il de chaînes d'accords ?",
    correct: "deux : sujet → verbe, et sujet → attribut",
    wrongs: [
      "une seule : sujet → verbe, l'attribut ne s'accorde pas",
      "une seule : verbe → attribut, le sujet reste à part",
      "trois : sujet → verbe, sujet → attribut, verbe → attribut",
    ],
    methode: "Le sujet commande deux fois : la fin du verbe ET la fin de l'attribut.",
  },
  {
    text: "« Le pêcheur et son fils sont content___. »",
    correct: "contents",
    wrongs: ["content", "contente", "contentes"],
    methode: "Deux sujets masculins : l'attribut passe au masculin pluriel.",
  },
  {
    text: "L'attribut peut-il s'accorder avec le complément ?",
    correct: "Non, jamais : il s'accorde avec le sujet",
    wrongs: [
      "Oui, s'il en est plus proche",
      "Oui, au pluriel seulement",
      "Oui, si le verbe est « être »",
    ],
    methode: "Le mot le plus proche n'est pas celui qui commande.",
  },
];

const PARTICIPE_PASSE: QcmItem[] = [
  {
    text: "« Elle est allé___ au marché. »",
    correct: "allée",
    wrongs: ["allé", "allés", "aller"],
    methode: "Auxiliaire ÊTRE : le participe s'accorde avec le sujet, ici féminin singulier.",
  },
  {
    text: "Avec l'auxiliaire ÊTRE, le participe passé s'accorde avec…",
    correct: "le sujet",
    wrongs: ["le complément d'objet", "l'auxiliaire", "personne"],
    methode: "« Elles sont venues » : le sujet commande.",
  },
  {
    text: "« Les enfants sont parti___ tôt. »",
    correct: "partis",
    wrongs: ["parti", "partie", "parties"],
    methode: "Sujet masculin pluriel, auxiliaire être : « partis ».",
  },
  {
    text: "« Elle a mangé___ une mangue. »",
    correct: "mangé",
    wrongs: ["mangée", "mangés", "manger"],
    methode: "Auxiliaire AVOIR et complément placé APRÈS : pas d'accord.",
  },
  {
    text: "Avec l'auxiliaire AVOIR, le participe passé s'accorde avec le complément d'objet direct…",
    correct: "seulement si ce complément est placé AVANT le verbe",
    wrongs: [
      "seulement si ce complément est placé APRÈS le verbe",
      "toujours, où que ce complément se trouve dans la phrase",
      "seulement si ce complément est au pluriel ou au féminin",
    ],
    methode: "C'est la seule règle à retenir, et elle tient en un mot : avant.",
  },
  {
    text: "« La mangue qu'elle a mangé___. »",
    correct: "mangée",
    wrongs: ["mangé", "mangés", "manger"],
    methode: "Le complément « La mangue » est passé devant : l'accord se fait.",
  },
  {
    text: "« Nous avons ramassé___ des letchis. »",
    correct: "ramassé",
    wrongs: ["ramassés", "ramassée", "ramasser"],
    methode: "« des letchis » est derrière le verbe : rien ne bouge.",
  },
  {
    text: "« Les letchis que nous avons ramassé___. »",
    correct: "ramassés",
    wrongs: ["ramassé", "ramassée", "ramasser"],
    methode: "Cette fois « Les letchis » est devant : le participe s'accorde avec lui.",
  },
  {
    text: "Comment savoir s'il faut accorder un participe passé ?",
    correct: "On cherche l'auxiliaire : être → avec le sujet ; avoir → avec le COD s'il est avant",
    // ⭐ Le premier leurre INVERSE les deux auxiliaires : il faut savoir dans
    // quel sens va la règle, et non seulement qu'elle existe.
    wrongs: [
      "On cherche l'auxiliaire : avoir → avec le sujet ; être → avec le COD placé avant",
      "On regarde le sujet de la phrase, quel que soit l'auxiliaire employé devant",
      "On accorde dès qu'un nom au pluriel se trouve quelque part dans la phrase",
    ],
    methode: "Deux questions, dans cet ordre : quel auxiliaire ? et le complément est-il devant ?",
  },
  {
    text: "« Elles sont venu___ hier. »",
    correct: "venues",
    wrongs: ["venu", "venus", "venue"],
    methode: "Auxiliaire être, sujet féminin pluriel.",
  },
  {
    text: "Dans « Il a pris son cartable », faut-il accorder « pris » ?",
    correct: "Non : le complément « son cartable » est placé après le verbe",
    wrongs: [
      "Oui, avec « Il » : le participe suit toujours le sujet",
      "Oui, avec « son cartable », qui est bien le complément d'objet",
      "Oui : avec « avoir », le participe s'accorde dans tous les cas",
    ],
    methode: "Avec « avoir », le sujet ne commande jamais le participe.",
  },
  {
    text: "« Tom et Léo sont arrivé___ ensemble. »",
    correct: "arrivés",
    wrongs: ["arrivé", "arrivée", "arrivées"],
    methode: "Deux sujets masculins et l'auxiliaire être : masculin pluriel.",
  },
];

const CONJ_PLUS_QUE_PARFAIT: QcmItem[] = [
  {
    text: "Comment se forme le plus-que-parfait ?",
    correct: "l'auxiliaire à l'imparfait + le participe passé",
    wrongs: [
      "l'auxiliaire au présent + le participe passé",
      "le verbe à l'imparfait, en un seul mot",
      "l'infinitif + une terminaison",
    ],
    methode: "« j'avais mangé » : « avais » est à l'imparfait.",
  },
  {
    text: "« Quand je suis arrivé, il ___ déjà parti. »",
    correct: "était",
    wrongs: ["est", "sera", "serait"],
    methode: "L'auxiliaire se met à l'imparfait : « était parti ».",
  },
  {
    text: "« Nous ___ fini avant la pluie. » (plus-que-parfait)",
    correct: "avions",
    wrongs: ["avons", "aurons", "aurions"],
    methode: "« avons » est au présent, « aurons » au futur : il faut l'imparfait.",
  },
  {
    text: "À quel temps est « il avait mangé » ?",
    correct: "au plus-que-parfait",
    wrongs: ["au passé composé", "à l'imparfait", "au passé simple"],
    methode: "Auxiliaire à l'imparfait + participe passé.",
  },
  {
    text: "À quel temps est « il a mangé » ?",
    correct: "au passé composé",
    wrongs: ["au plus-que-parfait", "à l'imparfait", "au futur"],
    methode: "Auxiliaire au PRÉSENT + participe passé.",
  },
  {
    text: "À quoi sert le plus-que-parfait ?",
    correct: "à raconter une action passée AVANT une autre action passée",
    wrongs: [
      "à raconter une action passée APRÈS une autre action passée",
      "à raconter une action passée qui durait ou se répétait",
      "à raconter une action à venir vue depuis le passé",
    ],
    methode: "« Il était parti quand je suis arrivé » : deux passés, l'un avant l'autre.",
  },
  {
    text: "« Elle ___ terminé son dessin quand la cloche a sonné. »",
    correct: "avait",
    wrongs: ["a", "aura", "aurait"],
    methode: "Le dessin est fini AVANT la cloche : plus-que-parfait.",
  },
  {
    text: "Le plus-que-parfait est un temps…",
    correct: "composé : il s'écrit en deux mots",
    wrongs: ["simple : un seul mot", "du futur", "de l'impératif"],
    methode: "Auxiliaire + participe passé, comme le passé composé.",
  },
  {
    text: "« Ils ___ déjà partis quand nous sommes arrivés. »",
    correct: "étaient",
    wrongs: ["sont", "seront", "ont"],
    methode: "« partir » se conjugue avec être : l'auxiliaire passe à l'imparfait.",
  },
  {
    text: "Quelle différence entre « il avait fini » et « il a fini » ?",
    correct: "« avait fini » se passe avant un autre moment du passé",
    wrongs: [
      "« a fini » se passe avant un autre moment du passé",
      "« avait fini » dure, tandis que « a fini » arrive une fois",
      "« avait fini » se dit à l'écrit, « a fini » seulement à l'oral",
    ],
    methode: "Le plus-que-parfait recule d'un cran dans le passé.",
  },
  {
    text: "« J'___ oublié mon cahier. » (plus-que-parfait)",
    correct: "avais",
    wrongs: ["ai", "aurai", "aurais"],
    methode: "« ai » donnerait le passé composé.",
  },
  {
    text: "Dans « Le vent avait soufflé toute la nuit », le verbe est…",
    correct: "au plus-que-parfait",
    wrongs: ["à l'imparfait", "au passé composé", "au passé simple"],
    methode: "Deux mots, et l'auxiliaire est à l'imparfait.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LA PHRASE COMPLEXE — CM2 et 6e, ajoutée le 11/08/2026

   ⛔ CE QUE ÇA RÉPARE. `questionForNotion` n'avait aucune branche pour la
   notion `phrase_complexe`. Les trois micros du CM2 — propositions,
   coordination, pronom relatif — tombaient donc sur le `return qcm(LECTURE)`
   final : neuf gabarits qui servaient des questions de COMPRÉHENSION DE
   LECTURE. « Pourquoi l'oiseau s'envole-t-il ? » à un élève qui travaille la
   juxtaposition. Mesuré, pas supposé : dix-huit énoncés tirés, aucun sur la
   phrase complexe.
   Aucun vérificateur ne pouvait le voir : chaque question était valide, bien
   formée, avec sa bonne réponse dans ses choix. Elle n'était simplement pas
   sur le sujet. C'est l'angle mort d'un aiguillage par sous-chaîne.
   ═══════════════════════════════════════════════════════════════════════════ */

const PROPOSITION: QcmItem[] = [
  {
    text: "Qu'est-ce qui permet de compter les propositions d'une phrase ?",
    correct: "le nombre de verbes conjugués",
    wrongs: ["le nombre de virgules", "le nombre de mots", "le nombre de majuscules"],
    methode: "Une proposition s'organise autour d'un verbe conjugué : autant de verbes, autant de propositions.",
  },
  {
    text: "« Le vent souffle et la pluie tombe. » Combien de propositions ?",
    correct: "deux",
    wrongs: ["une", "trois", "aucune"],
    methode: "Deux verbes conjugués : souffle, tombe.",
  },
  {
    text: "« Le vent souffle sur le lagon. » Cette phrase est…",
    correct: "une phrase simple",
    wrongs: ["une phrase complexe", "deux propositions", "une proposition subordonnée"],
    methode: "Un seul verbe conjugué : une seule proposition.",
  },
  {
    text: "« Quand la pluie s'arrête, les enfants sortent. » Cette phrase est…",
    correct: "une phrase complexe",
    wrongs: ["une phrase simple", "une phrase sans verbe", "une seule proposition"],
    methode: "« s'arrête » et « sortent » : deux verbes conjugués.",
  },
  {
    text: "Une proposition, c'est…",
    correct: "un groupe de mots organisé autour d'un verbe conjugué",
    wrongs: [
      "un groupe de mots organisé autour d'un nom principal",
      "un groupe de mots placé entre deux virgules",
      "une phrase entière, du début jusqu'au point final",
    ],
    methode: "Le verbe conjugué est le noyau : sans lui, pas de proposition.",
  },
  {
    text: "« Le pêcheur, fatigué, rentra chez lui. » Combien de propositions ?",
    correct: "une seule : il n'y a qu'un verbe conjugué",
    wrongs: [
      "deux : les virgules séparent deux propositions",
      "deux : « fatigué » est un second verbe conjugué",
      "trois : chaque morceau entre virgules en est une",
    ],
    methode: "Les virgules ne découpent pas des propositions : seul le verbe compte.",
  },
  {
    text: "Une phrase simple contient…",
    correct: "une seule proposition",
    wrongs: ["deux propositions", "toujours une virgule", "toujours un sujet inversé"],
    methode: "Simple ne veut pas dire courte : elle n'a qu'un verbe conjugué.",
  },
  {
    text: "« Il pleut, mais nous sortons quand même. » Cette phrase est…",
    correct: "complexe : deux verbes conjugués",
    wrongs: ["simple", "sans proposition", "une seule proposition"],
    methode: "« pleut » et « sortons ».",
  },
  {
    text: "Un verbe à l'infinitif compte-t-il pour une proposition ?",
    correct: "Non : il faut un verbe CONJUGUÉ",
    wrongs: ["Oui, toujours", "Oui, s'il est en fin de phrase", "Seulement au pluriel"],
    methode: "« Il aime lire » : un seul verbe conjugué, donc une seule proposition.",
  },
  {
    text: "« Les enfants qui jouent sur la plage rentrent tard. » Combien de propositions ?",
    correct: "deux",
    wrongs: ["une", "trois", "aucune"],
    methode: "« jouent » et « rentrent » : deux verbes conjugués.",
  },
  {
    text: "Pour savoir si une phrase est complexe, on compte…",
    correct: "les verbes conjugués",
    wrongs: ["les noms", "les adjectifs", "les compléments"],
    methode: "C'est le seul comptage qui réponde à la question.",
  },
  {
    text: "« Léa range sa chambre, puis elle sort. » Combien de verbes conjugués ?",
    correct: "deux",
    wrongs: ["un", "trois", "aucun"],
    methode: "« range » et « sort » : la phrase est donc complexe.",
  },
];

const ARTICULATION: QcmItem[] = [
  {
    text: "« Le vent souffle, la pluie tombe, la mer monte. » Comment les propositions sont-elles reliées ?",
    correct: "par juxtaposition",
    wrongs: ["par coordination", "par subordination", "elles ne sont pas reliées"],
    methode: "Juxtaposer, c'est poser côte à côte, avec un simple signe de ponctuation.",
  },
  {
    text: "« Le vent souffle et la pluie tombe. » Les propositions sont reliées…",
    correct: "par coordination",
    wrongs: ["par juxtaposition", "par subordination", "par un pronom relatif"],
    methode: "« et » est une conjonction de coordination.",
  },
  {
    text: "« Nous sortirons quand la pluie s'arrêtera. » Les propositions sont reliées…",
    correct: "par subordination",
    wrongs: ["par juxtaposition", "par coordination", "par une virgule"],
    methode: "« quand » soumet la seconde proposition à la première.",
  },
  {
    text: "La juxtaposition relie les propositions par…",
    correct: "un signe de ponctuation : virgule, point-virgule, deux-points",
    wrongs: [
      "une conjonction de coordination : et, ou, mais, donc, or, ni, car",
      "une conjonction de subordination : que, quand, comme, si, parce que",
      "un pronom relatif : qui, que, dont, où, lequel, auquel",
    ],
    methode: "Aucun mot de liaison : c'est la ponctuation qui fait le travail.",
  },
  {
    text: "La coordination relie les propositions par…",
    correct: "mais, ou, et, donc, or, ni, car",
    wrongs: [
      "une virgule seule",
      "que, quand, si, comme",
      "un pronom personnel",
    ],
    methode: "Les sept conjonctions de coordination.",
  },
  {
    text: "La subordination met une proposition…",
    correct: "sous la dépendance d'une autre",
    wrongs: [
      "à côté d'une autre, à égalité",
      "avant le sujet",
      "entre deux virgules",
    ],
    methode: "Le mot le dit : subordonner, c'est placer en dessous.",
  },
  {
    text: "« Il rentre parce qu'il pleut. » Quelle proposition dépend de l'autre ?",
    correct: "« parce qu'il pleut »",
    wrongs: ["« Il rentre »", "aucune des deux", "les deux à la fois"],
    methode: "Elle ne peut pas vivre seule : « Parce qu'il pleut. » ne tient pas debout.",
  },
  {
    text: "Dans une juxtaposition, peut-on supprimer une proposition ?",
    correct: "Oui : les propositions sont à égalité",
    wrongs: ["Non, jamais", "Seulement la première", "Seulement s'il y a « et »"],
    methode: "Chacune tiendrait debout toute seule.",
  },
  {
    text: "Laquelle de ces phrases contient une subordination ?",
    correct: "Je crois que tu as raison.",
    wrongs: [
      "Je crois, tu as raison.",
      "Je crois et tu as raison.",
      "Je crois : tu as raison.",
    ],
    methode: "Seul « que » soumet une proposition à l'autre ; les autres les posent à égalité.",
  },
  {
    text: "Quelles sont les trois façons de relier des propositions ?",
    correct: "juxtaposition, coordination, subordination",
    wrongs: [
      "sujet, verbe, complément",
      "nom, adjectif, déterminant",
      "passé, présent, futur",
    ],
    methode: "Ponctuation seule, mot de coordination, ou mot de subordination.",
  },
  {
    text: "Dans « Il pleut, donc nous restons », le mot « donc » marque…",
    correct: "une coordination",
    wrongs: ["une subordination", "une juxtaposition", "une préposition"],
    methode: "« donc » fait partie des sept conjonctions de coordination.",
  },
  {
    text: "« Léa lit, Tom dessine. » Qu'est-ce qui relie les deux propositions ?",
    correct: "la virgule",
    wrongs: ["« et »", "« que »", "rien du tout"],
    methode: "Une ponctuation seule : c'est une juxtaposition.",
  },
];

const PRONOM_RELATIF: QcmItem[] = [
  {
    text: "« Le pêcheur ___ répare son filet est mon voisin. »",
    correct: "qui",
    wrongs: ["que", "où", "quand"],
    methode: "« qui » est le sujet du verbe qui suit : qui répare ? le pêcheur.",
  },
  {
    text: "« Le livre ___ je lis est passionnant. »",
    correct: "que",
    wrongs: ["qui", "où", "quand"],
    methode: "Le sujet de « lis » est « je » : ce n'est donc pas « qui ».",
  },
  {
    text: "« La plage ___ nous allons est déserte. »",
    correct: "où",
    wrongs: ["qui", "que", "et"],
    methode: "« où » reprend un lieu.",
  },
  {
    text: "Comment choisir entre « qui » et « que » ?",
    correct: "« qui » est sujet du verbe qui suit ; « que » ne l'est pas",
    // ⭐ Le premier leurre INVERSE la règle ; le deuxième est l'erreur la plus
    // répandue (personnes contre choses), et elle est fausse.
    wrongs: [
      "« que » est sujet du verbe qui suit ; « qui » ne l'est pas",
      "« qui » s'emploie pour les personnes, « que » pour les choses",
      "« qui » s'emploie au singulier, « que » au pluriel",
    ],
    methode: "« le filet qui sèche » : un filet n'est pas une personne, et c'est bien « qui ».",
  },
  {
    text: "Dans « le margouillat qui dort », que remplace « qui » ?",
    correct: "« le margouillat »",
    wrongs: ["« dort »", "rien du tout", "le sujet de la phrase suivante"],
    methode: "Le mot repris s'appelle l'antécédent.",
  },
  {
    text: "À quoi servent « qui », « que », « où » ?",
    correct: "à relier une proposition à un nom",
    wrongs: [
      "à relier deux noms",
      "à conjuguer un verbe",
      "à accorder un adjectif",
    ],
    methode: "Ils accrochent une proposition entière à un nom pour le préciser.",
  },
  {
    text: "« La case ___ mes grands-parents habitaient. »",
    correct: "où",
    wrongs: ["qui", "que", "quand"],
    methode: "Habiter QUELQUE PART : « où » reprend le lieu.",
  },
  {
    text: "Dans « le cari que ma mère prépare », le mot « que » est…",
    correct: "un pronom relatif",
    wrongs: [
      "une conjonction de coordination",
      "une préposition",
      "un déterminant",
    ],
    methode: "Il reprend « le cari » et introduit la proposition qui le précise.",
  },
  {
    text: "« Les enfants ___ ramassent des letchis rentrent tard. »",
    correct: "qui",
    wrongs: ["que", "où", "dont"],
    methode: "Qui ramasse ? Les enfants. Le pronom est sujet : c'est « qui ».",
  },
  {
    text: "Le mot qu'un pronom relatif remplace s'appelle…",
    correct: "l'antécédent",
    wrongs: ["le sujet", "le complément", "le radical"],
    methode: "Il est placé AVANT : anté-cédent.",
  },
  {
    text: "« C'est le jour ___ nous sommes partis. »",
    correct: "où",
    wrongs: ["qui", "que", "quand"],
    methode: "« où » reprend aussi un moment, pas seulement un lieu.",
  },
  {
    text: "« Le filet ___ le pêcheur répare est déchiré. »",
    correct: "que",
    wrongs: ["qui", "où", "et"],
    methode: "Le sujet de « répare » est « le pêcheur » : le pronom ne peut pas être sujet.",
  },
];

const CONJONCTIONS_ROLE: QcmItem[] = [
  {
    text: "Quelle est la différence entre une conjonction de coordination et une conjonction de subordination ?",
    correct: "La coordination met les propositions à égalité ; la subordination en soumet une à l'autre",
    // ⭐ Le premier leurre INVERSE la règle : la connaitre, c'est savoir dans
    // quel sens elle va.
    wrongs: [
      "La subordination met les propositions à égalité ; la coordination en soumet une",
      "La coordination s'emploie à l'oral, la subordination seulement à l'écrit soigné",
      "La coordination relie deux mots, la subordination relie deux phrases entières",
    ],
    methode: "Égalité d'un côté, dépendance de l'autre.",
  },
  {
    text: "Le mot « et » est…",
    correct: "une conjonction de coordination",
    wrongs: [
      "une conjonction de subordination",
      "une préposition",
      "un adverbe",
    ],
    methode: "mais, ou, et, donc, or, ni, car : les sept.",
  },
  {
    text: "Dans « Je pense que tu as raison », le mot « que » est…",
    correct: "une conjonction de subordination",
    wrongs: [
      "une conjonction de coordination",
      "une préposition",
      "un pronom personnel",
    ],
    methode: "Elle accroche une proposition entière au verbe « pense ».",
  },
  {
    text: "Après une conjonction de subordination, on trouve…",
    correct: "une proposition avec un verbe conjugué",
    wrongs: [
      "un groupe nominal, sans verbe conjugué",
      "un verbe à l'infinitif, jamais conjugué",
      "un adjectif qui qualifie ce qui précède",
    ],
    methode: "C'est ce qui la sépare d'une préposition, qui n'introduit qu'un groupe.",
  },
  {
    text: "Peut-on supprimer la proposition introduite par « parce que » ?",
    correct: "Oui : la première proposition tient encore debout",
    wrongs: [
      "Non : sans elle, la phrase n'a plus de sens complet",
      "Oui, mais seulement si elle tient en trois ou quatre mots",
      "Oui, mais seulement à l'oral : à l'écrit elle est obligatoire",
    ],
    methode: "« Il rentre parce qu'il pleut. » → « Il rentre. » Toujours une phrase.",
  },
  {
    text: "« Il pleut et le vent souffle. » Peut-on inverser les deux propositions ?",
    correct: "Oui : elles sont à égalité",
    wrongs: [
      "Non, jamais",
      "Seulement si on change le verbe",
      "Seulement à l'écrit",
    ],
    methode: "C'est le propre de la coordination.",
  },
  {
    text: "Laquelle de ces conjonctions est une conjonction de SUBORDINATION ?",
    correct: "comme",
    wrongs: ["mais", "donc", "or"],
    methode: "Les trois autres font partie des sept coordonnants.",
  },
  {
    text: "Combien y a-t-il de conjonctions de coordination ?",
    correct: "sept : mais, ou, et, donc, or, ni, car",
    wrongs: [
      "sept : mais, ou, et, donc, or, ni, que",
      "cinq : mais, ou, et, donc, car",
      "neuf : les sept, plus quand et comme",
    ],
    methode: "Une liste fermée, qu'on apprend une fois pour toutes.",
  },
  {
    text: "Une conjonction de coordination peut relier…",
    correct: "deux mots, deux groupes ou deux propositions",
    wrongs: [
      "seulement deux propositions",
      "seulement deux noms",
      "un nom et son déterminant",
    ],
    methode: "« du riz et du cari » : elle relie aussi des groupes.",
  },
  {
    text: "Dans « Je sortirai si la pluie s'arrête », le mot « si » introduit…",
    correct: "une proposition subordonnée",
    wrongs: [
      "une proposition coordonnée",
      "un complément du nom",
      "une question",
    ],
    methode: "La proposition dépend de la première : sans elle, la condition disparait.",
  },
  {
    text: "Dans « Il est parti, car il était tard », le mot « car » marque…",
    correct: "une coordination qui donne la cause",
    wrongs: ["une subordination", "une juxtaposition", "une préposition"],
    methode: "Attention : « car » coordonne, « parce que » subordonne — et tous deux disent la cause.",
  },
  {
    text: "Quel mot ne peut PAS commencer une proposition subordonnée ?",
    correct: "donc",
    wrongs: ["quand", "parce que", "si"],
    methode: "« donc » coordonne : il ne soumet aucune proposition à une autre.",
  },
];

const PRONOM_ANTECEDENT: QcmItem[] = [
  {
    text: "Dans « Léa a pris son cartable, puis elle est sortie », à qui renvoie « elle » ?",
    correct: "à Léa",
    wrongs: ["au cartable", "à personne", "à celui qui lit"],
    methode: "On remonte au nom déjà cité : c'est l'antécédent.",
  },
  {
    text: "L'antécédent d'un pronom, c'est…",
    correct: "le mot qu'il remplace, dit avant lui",
    wrongs: [
      "le mot qu'il remplace, dit après lui",
      "le verbe dont il est le sujet",
      "le déterminant qui l'accompagne",
    ],
    methode: "Anté-cédent : ce qui vient avant.",
  },
  {
    text: "Dans « Le pêcheur répare son filet ; il le pose ensuite », que remplace « le » ?",
    correct: "« son filet »",
    wrongs: ["« Le pêcheur »", "« il »", "rien du tout"],
    methode: "« il » reprend le pêcheur, « le » reprend le filet : deux pronoms, deux antécédents.",
  },
  {
    text: "Dans « Le pêcheur répare son filet ; il le pose ensuite », quelle est la fonction de « il » ?",
    correct: "sujet",
    wrongs: ["complément d'objet direct", "attribut du sujet", "complément du nom"],
    methode: "Qui est-ce qui pose ? « il ».",
  },
  {
    text: "Dans « Je les vois », quelle est la fonction de « les » ?",
    correct: "complément d'objet direct",
    wrongs: ["sujet", "déterminant", "attribut du sujet"],
    methode: "Vois qui ? « les ». Le pronom est complément.",
  },
  {
    text: "Comment vérifier qu'on a trouvé le bon antécédent ?",
    correct: "On remplace le pronom par le nom : la phrase doit tenir debout",
    wrongs: [
      "On prend le nom le plus proche du pronom, juste avant lui",
      "On prend le sujet de la phrase : c'est presque toujours lui",
      "On vérifie que le nom a le même genre et le même nombre",
    ],
    methode: "Le nom le plus proche n'est pas toujours le bon.",
  },
  {
    text: "Dans « Les letchis sont mûrs : nous les ramasserons demain », « les » renvoie à…",
    correct: "« Les letchis »",
    wrongs: ["« nous »", "« demain »", "rien du tout"],
    methode: "On remonte, puis on remplace pour vérifier.",
  },
  {
    text: "Le mot « les » peut être…",
    correct: "déterminant ou pronom, selon sa place",
    wrongs: [
      "toujours un déterminant",
      "toujours un pronom",
      "toujours un adverbe",
    ],
    methode: "« les enfants » : déterminant. « je les vois » : pronom.",
  },
  {
    text: "Dans « les enfants les regardent », quelle est la nature du PREMIER « les » ?",
    correct: "un déterminant",
    wrongs: ["un pronom", "un adverbe", "une préposition"],
    methode: "Il est collé devant un nom : c'est un déterminant.",
  },
  {
    text: "Pourquoi faut-il savoir repérer l'antécédent ?",
    correct: "Sans lui, on ne sait plus de qui ou de quoi on parle",
    wrongs: [
      "Pour accorder le verbe avec le bon sujet de la phrase",
      "Pour savoir quel genre donner au pronom qui suit",
      "Pour éviter de répéter deux fois le même nom",
    ],
    methode: "C'est le fil qui tient le texte d'une phrase à l'autre.",
  },
  {
    text: "Dans « Tom parle à sa sœur ; il lui explique le jeu », que remplace « lui » ?",
    correct: "« sa sœur »",
    wrongs: ["« Tom »", "« le jeu »", "« il »"],
    methode: "Explique à qui ? À sa sœur. « lui » est complément d'objet indirect.",
  },
  {
    text: "Un pronom personnel prend le genre et le nombre…",
    correct: "de son antécédent",
    wrongs: ["du verbe", "du complément", "du dernier mot de la phrase"],
    methode: "« Les vagues… elles » : féminin pluriel, comme le nom repris.",
  },
];

const MANIPULATIONS: QcmItem[] = [
  {
    text: "Pour vérifier qu'un groupe est bien le sujet, on l'encadre par…",
    correct: "« c'est … qui »",
    wrongs: ["« c'est … que »", "des guillemets", "deux virgules"],
    methode: "« C'est le pêcheur QUI répare » : l'encadrement désigne le sujet.",
  },
  {
    text: "Pour vérifier qu'un groupe est un complément circonstanciel, on essaie de…",
    correct: "le déplacer ou le supprimer",
    wrongs: [
      "le conjuguer",
      "l'accorder avec le sujet",
      "le remplacer par un adjectif",
    ],
    methode: "S'il supporte les deux, il est facultatif : c'est un circonstanciel.",
  },
  {
    text: "« Hier, les enfants ont ramassé des letchis. » Que donne le déplacement de « Hier » ?",
    correct: "« Les enfants ont ramassé des letchis hier. » — la phrase tient debout",
    wrongs: [
      "« Les enfants hier ont ramassé des letchis. » — le sens en est changé",
      "« Hier ont ramassé les enfants des letchis. » — le sujet passe après",
      "« Les enfants ramassent des letchis hier. » — le verbe change de temps",
    ],
    methode: "Le déplacement réussi prouve que le groupe est circonstanciel.",
  },
  {
    text: "Remplacer un groupe par un pronom, cette manipulation s'appelle…",
    correct: "la substitution",
    wrongs: ["le déplacement", "la suppression", "l'encadrement"],
    methode: "On substitue : on met une chose à la place d'une autre.",
  },
  {
    text: "À quoi servent les manipulations en grammaire ?",
    correct: "à prouver la fonction d'un groupe, au lieu de la deviner",
    wrongs: [
      "à vérifier que la phrase est correctement construite",
      "à retrouver le sens d'une phrase qu'on comprend mal",
      "à repérer les groupes qu'on pourrait supprimer sans perte",
    ],
    methode: "On ne discute pas : on essaie, et la phrase répond.",
  },
  {
    text: "« Le pêcheur répare son filet. » Que donne l'encadrement par « c'est … qui » ?",
    correct: "« C'est le pêcheur qui répare son filet. » — « le pêcheur » est bien le sujet",
    wrongs: [
      "« C'est son filet que le pêcheur répare. » — « son filet » est donc le sujet",
      "« C'est réparer que le pêcheur fait à son filet. » — le verbe devient sujet",
      "« Est-ce le pêcheur qui répare son filet ? » — la phrase devient une question",
    ],
    methode: "Si l'encadrement marche, le groupe est sujet.",
  },
  {
    text: "À quelle manipulation un complément d'objet résiste-t-il ?",
    correct: "à la suppression : on ne peut pas l'enlever",
    wrongs: [
      "au déplacement : on ne peut pas le mettre en tête de phrase",
      "à la substitution : on ne peut pas le remplacer par un pronom",
      "à aucune : il se déplace et se supprime librement",
    ],
    methode: "« Léa mange. » perd son sens : le complément d'objet est essentiel.",
  },
  {
    text: "« Léa mange une mangue. » Remplace le complément par un pronom.",
    correct: "Léa la mange.",
    wrongs: ["Léa mange elle.", "Léa lui mange.", "Léa mange la."],
    methode: "Le pronom complément se place DEVANT le verbe.",
  },
  {
    text: "En quoi consiste l'addition ?",
    correct: "à ajouter un mot pour éprouver la phrase",
    wrongs: [
      "à supprimer un mot",
      "à déplacer un groupe",
      "à conjuguer le verbe",
    ],
    methode: "Ajouter un adjectif, une négation… et regarder ce qui résiste.",
  },
  {
    text: "Pourquoi ne pas se fier à la PLACE d'un groupe pour trouver sa fonction ?",
    correct: "Parce qu'un groupe peut se déplacer sans changer de fonction",
    wrongs: [
      "Parce que la place ne change jamais",
      "Parce que les groupes sont toujours au pluriel",
      "Parce que le verbe est toujours au milieu",
    ],
    methode: "« Hier, il pleuvait. » / « Il pleuvait hier. » Même fonction, deux places.",
  },
  {
    text: "« Sous le tamarin dorment deux chiens. » Quel encadrement désigne le SUJET ?",
    correct: "« Ce sont deux chiens qui dorment sous le tamarin. »",
    wrongs: [
      "« C'est sous le tamarin que dorment deux chiens. »",
      "« Ce sont des chiens sous le tamarin. »",
      "« Dorment deux chiens sous le tamarin. »",
    ],
    methode: "« c'est … QUE » encadre un complément ; « c'est … QUI » encadre le sujet.",
  },
  {
    text: "Que prouve-t-on en supprimant un groupe sans casser la phrase ?",
    correct: "que ce groupe est facultatif : c'est un complément circonstanciel",
    wrongs: [
      "qu'il est le sujet : sans lui, on ne sait plus qui fait l'action",
      "qu'il est un complément d'objet, celui qui complète le verbe",
      "qu'il est mal placé, et qu'il faudrait le mettre en tête de phrase",
    ],
    methode: "Sujet, verbe et complément d'objet ne se suppriment pas.",
  },
];

const IMPERATIF_CONDITIONNEL: QcmItem[] = [
  {
    text: "À quoi sert l'impératif ?",
    correct: "à donner un ordre ou un conseil",
    wrongs: [
      "à poser une question",
      "à raconter le passé",
      "à décrire un lieu",
    ],
    methode: "« Range ta chambre ! » : c'est un ordre.",
  },
  {
    text: "Combien de personnes l'impératif présent a-t-il ?",
    correct: "trois",
    wrongs: ["six", "une", "deux"],
    methode: "2ᵉ du singulier, 1ʳᵉ et 2ᵉ du pluriel. Rien d'autre.",
  },
  {
    text: "L'impératif s'écrit…",
    correct: "sans pronom sujet",
    wrongs: [
      "toujours avec « tu »",
      "toujours avec « vous »",
      "avec le pronom entre parenthèses",
    ],
    methode: "« Viens ! » et non « Tu viens ! » : c'est ce qui le distingue du présent.",
  },
  {
    text: "« ___ ton cartable ! » (ranger, impératif, 2ᵉ personne du singulier)",
    correct: "Range",
    wrongs: ["Ranges", "Rangez", "Rangeons"],
    methode: "Les verbes en -er ne prennent pas de « s » à cette personne.",
  },
  {
    text: "Comment se forme le conditionnel présent ?",
    correct: "le radical du futur + les terminaisons de l'imparfait",
    wrongs: [
      "le radical de l'imparfait + les terminaisons du futur",
      "le radical du présent + les terminaisons de l'imparfait",
      "l'auxiliaire au conditionnel + le participe passé",
    ],
    methode: "je viendr- (futur) + -ais (imparfait) = je viendrais.",
  },
  {
    text: "« Si j'avais le temps, je ___ avec toi. » (venir, conditionnel présent)",
    correct: "viendrais",
    wrongs: ["viendrai", "venais", "viens"],
    methode: "« viendrai » serait le futur : ici, rien n'est certain.",
  },
  {
    text: "Quelle différence entre « je viendrai » et « je viendrais » ?",
    correct: "« viendrai » est au futur, « viendrais » au conditionnel",
    wrongs: [
      "« viendrais » est au futur, « viendrai » au conditionnel",
      "« viendrai » se dit pour soi, « viendrais » pour quelqu'un d'autre",
      "« viendrais » est au passé, « viendrai » au présent",
    ],
    methode: "Un « s » sépare ce qui aura lieu de ce qui aurait lieu.",
  },
  {
    text: "Le conditionnel présent sert à dire…",
    correct: "ce qui se passerait sous condition",
    wrongs: [
      "ce qui s'est passé hier",
      "un ordre",
      "ce qui se passe en ce moment",
    ],
    methode: "« Si… alors je… » : la condition d'abord, le conditionnel ensuite.",
  },
  {
    text: "« ___ prudents ! » (être, impératif, 2ᵉ personne du pluriel)",
    correct: "Soyez",
    wrongs: ["Soyer", "Êtes", "Serez"],
    methode: "« être » à l'impératif : sois, soyons, soyez.",
  },
  {
    text: "« Nous ___ partir plus tôt. » (aimer, conditionnel présent)",
    correct: "aimerions",
    wrongs: ["aimerons", "aimions", "aimons"],
    methode: "« aimerons » est le futur, « aimions » l'imparfait : le conditionnel prend les deux.",
  },
  {
    text: "À l'impératif, les verbes en -er à la 2ᵉ personne du singulier…",
    correct: "ne prennent pas de « s »",
    wrongs: [
      "prennent toujours un « s »",
      "prennent un « x »",
      "s'écrivent à l'infinitif",
    ],
    methode: "« Mange ! », « Va ! » — mais « Manges-en ! » devant « en ».",
  },
  {
    text: "« ___-moi, s'il te plait. » (aider, impératif)",
    correct: "Aide",
    wrongs: ["Aides", "Aidez", "Aider"],
    methode: "2ᵉ personne du singulier d'un verbe en -er : pas de « s ».",
  },
];

const DISCOURS_RECIT: QcmItem[] = [
  {
    text: "Quels sont les temps du RÉCIT ?",
    correct: "l'imparfait, le passé simple, le plus-que-parfait",
    wrongs: [
      "le présent, le passé composé, le futur",
      "l'impératif et le conditionnel",
      "l'infinitif et le participe",
    ],
    methode: "Ce sont les temps d'une histoire racontée, coupée du moment où l'on parle.",
  },
  {
    text: "Quels sont les temps du DISCOURS ?",
    correct: "le présent, le passé composé, le futur",
    wrongs: [
      "l'imparfait et le passé simple",
      "le plus-que-parfait seul",
      "l'impératif seul",
    ],
    methode: "Ce sont les temps de quelqu'un qui parle depuis maintenant.",
  },
  {
    text: "« Il ouvrit la porte et sortit. » Ce passage relève…",
    correct: "du récit",
    wrongs: ["du discours", "d'une consigne", "d'une description au présent"],
    methode: "Le passé simple ne s'emploie pas quand on parle : c'est un temps du récit.",
  },
  {
    text: "« J'ai fini mon travail, je pars. » Ce passage relève…",
    correct: "du discours",
    wrongs: ["du récit", "d'un poème", "d'une description au passé simple"],
    methode: "Passé composé et présent : on parle depuis maintenant.",
  },
  {
    text: "Pourquoi distingue-t-on les temps du discours et ceux du récit ?",
    correct: "Parce qu'ils disent d'où l'on parle : depuis maintenant, ou depuis l'histoire",
    wrongs: [
      "Parce que les uns servent à l'oral et les autres à l'écrit",
      "Parce que les uns sont anciens et les autres d'aujourd'hui",
      "Parce que les uns se conjuguent et les autres pas",
    ],
    methode: "Ce n'est pas une question de difficulté, c'est une question de point de vue.",
  },
  {
    text: "Dans un roman, quel temps fait avancer les évènements ?",
    correct: "le passé simple",
    wrongs: ["le futur", "l'impératif", "le conditionnel"],
    methode: "Il marque les actions qui arrivent, une par une.",
  },
  {
    text: "Dans un roman, quel temps plante le décor ?",
    correct: "l'imparfait",
    wrongs: ["le passé simple", "le futur", "l'impératif"],
    methode: "Il dit ce qui durait pendant que l'histoire avançait.",
  },
  {
    text: "Quand un personnage PARLE dans un récit, il emploie le plus souvent…",
    correct: "les temps du discours : présent, passé composé, futur",
    wrongs: [
      "les temps du récit : passé simple, imparfait, plus-que-parfait",
      "le passé simple, comme le narrateur qui raconte autour de lui",
      "l'imparfait, qui donne à ses paroles une durée",
    ],
    methode: "Entre guillemets, on quitte le récit : le personnage parle depuis son présent.",
  },
  {
    text: "Le passé composé appartient…",
    correct: "aux temps du discours",
    wrongs: [
      "aux temps du récit",
      "aux deux, indifféremment",
      "à aucun des deux",
    ],
    methode: "C'est le passé de celui qui parle ; le passé simple est celui qui raconte.",
  },
  {
    text: "« Le vent soufflait. Soudain, un volet claqua. » Combien de temps différents ?",
    correct: "deux : l'imparfait, puis le passé simple",
    wrongs: [
      "deux : le passé simple, puis l'imparfait",
      "un seul : les deux verbes sont à l'imparfait",
      "un seul : les deux verbes sont au passé simple",
    ],
    methode: "Le décor à l'imparfait, l'évènement au passé simple.",
  },
  {
    text: "Un même fait peut-il se raconter avec les deux séries de temps ?",
    correct: "Oui : « il est parti » ou « il partit », selon d'où l'on parle",
    wrongs: [
      "Non : chaque fait appelle une série de temps et une seule",
      "Oui, mais seulement si le fait se répète plusieurs fois",
      "Oui, mais seulement dans les poèmes et les textes anciens",
    ],
    methode: "Le fait ne change pas ; c'est le point de vue qui change.",
  },
  {
    text: "Le temps CHRONOLOGIQUE (passé, présent, futur) et le temps VERBAL (imparfait, passé simple…) sont…",
    correct: "deux choses différentes",
    wrongs: [
      "exactement la même chose",
      "des synonymes",
      "réservés l'un au récit, l'autre au discours",
    ],
    methode: "Un verbe au présent peut raconter le passé : « En 1946, la Réunion devient un département. »",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LE CM1 — mise au niveau du BO, 11/08/2026

   Le CM1 sautait aux constituants de la phrase sans jamais nommer les classes
   de mots ni les types de phrases. Le BO leur consacre deux rubriques
   entières au CM1, sur des corpus plus longs qu'au CE2.

   ⚠️ CE QUI N'EST PAS RÉUTILISÉ DU CM2, ET POURQUOI :
   — le participe passé. Au CM1, le BO ne demande que l'auxiliaire ÊTRE.
     L'accord avec le COD antéposé (auxiliaire avoir) entre au CM2. Servir le
     pool du CM2 mettrait le CM1 en avance d'un an sur son programme ;
   — l'épithète. Au CM1 c'est « aborder la notion » dans le groupe nominal ;
     le complément du nom, lui, n'arrive qu'au CM2. Le pool COMPLEMENT_NOM
     oppose les deux : il est hors de portée ici.
   Le reste se partage : COD_COI, NATURE_FONCTION et MANIPULATIONS sont écrits
   au niveau que le BO demande dès le CM1.
   ═══════════════════════════════════════════════════════════════════════════ */

const TYPES_PHRASES: QcmItem[] = [
  {
    text: "« Range ton cartable. » De quel type est cette phrase ?",
    correct: "impérative",
    wrongs: ["déclarative", "interrogative", "exclamative"],
    methode: "Elle donne un ordre. Attention : « exclamative » est une forme, pas un type.",
  },
  {
    text: "« Où vas-tu ? » De quel type est cette phrase ?",
    correct: "interrogative",
    wrongs: ["déclarative", "impérative", "négative"],
    methode: "Elle pose une question et attend une réponse.",
  },
  {
    text: "« Le margouillat dort sur le mur. » De quel type est cette phrase ?",
    correct: "déclarative",
    wrongs: ["interrogative", "impérative", "exclamative"],
    methode: "Elle raconte un fait, sans rien demander ni ordonner.",
  },
  {
    text: "Combien y a-t-il de types de phrases ?",
    correct: "trois : déclaratif, interrogatif, impératif",
    // ⛔ Le piège de la notion : « exclamatif » est une FORME, pas un type.
    // Le leurre le nomme, au lieu de proposer un chiffre nu.
    wrongs: [
      "quatre : déclaratif, interrogatif, impératif, exclamatif",
      "deux : déclaratif et interrogatif, les seuls vrais types",
      "cinq : les trois types, plus l'exclamatif et le négatif",
    ],
    methode: "L'exclamation et la négation sont des FORMES, pas des types.",
  },
  {
    text: "« Comme la mer est belle ! » Cette phrase est déclarative, à la forme…",
    correct: "exclamative",
    wrongs: ["négative", "interrogative", "impérative"],
    methode: "Un type et une forme se cumulent toujours.",
  },
  {
    text: "L'exclamation est…",
    correct: "une forme, pas un type",
    wrongs: ["un type de phrase", "un temps du verbe", "une classe de mots"],
    methode: "C'est le piège de la notion : le point d'exclamation ne donne pas le type.",
  },
  {
    text: "« Il ne pleut pas. » Cette phrase est à la forme…",
    correct: "négative",
    wrongs: ["exclamative", "interrogative", "impérative"],
    methode: "« ne … pas » encadre le verbe : c'est la marque de la forme négative.",
  },
  {
    text: "À quoi sert une phrase impérative ?",
    correct: "à donner un ordre ou un conseil",
    wrongs: [
      "à poser une question",
      "à raconter un fait",
      "à décrire un lieu",
    ],
    methode: "Elle attend qu'on fasse quelque chose, pas qu'on réponde.",
  },
  {
    text: "Quel signe termine une phrase interrogative ?",
    correct: "le point d'interrogation",
    wrongs: ["le point d'exclamation", "le point", "la virgule"],
    methode: "Il annonce qu'on attend une réponse.",
  },
  {
    text: "Une phrase déclarative peut-elle être à la forme négative ?",
    correct: "Oui : « Il ne pleut pas. »",
    wrongs: ["Non, jamais", "Seulement à l'oral", "Seulement au pluriel"],
    methode: "Type et forme sont deux choses différentes, et se combinent.",
  },
  {
    text: "« Ne cours pas dans le couloir ! » Quel type et quelle forme ?",
    correct: "impérative, à la forme négative",
    wrongs: [
      "déclarative, à la forme exclamative",
      "interrogative, à la forme négative",
      "impérative, à la forme exclamative",
    ],
    methode: "Un ordre — donc impérative — et « ne … pas » — donc négative.",
  },
  {
    text: "Le type d'une phrase se lit sur…",
    correct: "ce qu'elle fait : raconter, demander, ordonner",
    wrongs: [
      "le signe qui la termine : point, point d'interrogation",
      "son premier mot : « est-ce », « quel », « viens »",
      "sa longueur et le nombre de ses virgules",
    ],
    methode: "Demande-toi ce que la phrase attend de celui qui l'écoute.",
  },
];

const TRANSFORMER_PHRASE: QcmItem[] = [
  {
    text: "« Tu viens. » Transforme en phrase interrogative.",
    correct: "Est-ce que tu viens ?",
    wrongs: ["Tu viens !", "Tu ne viens pas.", "Viens."],
    methode: "« Est-ce que » au début, point d'interrogation à la fin.",
  },
  {
    text: "« Tu viens. » Transforme en phrase impérative.",
    correct: "Viens.",
    wrongs: ["Est-ce que tu viens ?", "Tu viens !", "Tu ne viens pas."],
    methode: "L'impératif se passe du pronom sujet.",
  },
  {
    text: "« Il pleut. » Mets à la forme négative.",
    correct: "Il ne pleut pas.",
    wrongs: ["Il pleut !", "Est-ce qu'il pleut ?", "Pleut-il ?"],
    methode: "On encadre le verbe par « ne » et « pas ».",
  },
  {
    text: "Quelles sont les trois façons de poser une question ?",
    correct: "l'intonation, « est-ce que », l'inversion du sujet",
    wrongs: [
      "le point, la virgule, le tiret",
      "le présent, le passé, le futur",
      "le nom, le verbe, l'adjectif",
    ],
    methode: "« Tu viens ? », « Est-ce que tu viens ? », « Viens-tu ? »",
  },
  {
    text: "« Ton frère vient. » Pose la question par inversion du sujet.",
    correct: "Ton frère vient-il ?",
    wrongs: [
      "Est-ce que ton frère vient ?",
      "Ton frère vient ?",
      "Vient ton frère.",
    ],
    methode: "Le pronom passe derrière le verbe, relié par un trait d'union.",
  },
  {
    text: "Pour passer à la forme négative, on encadre le verbe par…",
    correct: "« ne » et « pas »",
    wrongs: ["deux virgules", "des guillemets", "« est-ce que »"],
    methode: "Les deux mots, toujours : à l'écrit, « ne » ne s'oublie pas.",
  },
  {
    text: "« Range ta chambre. » Transforme en phrase déclarative.",
    correct: "Tu ranges ta chambre.",
    wrongs: [
      "Ranges-tu ta chambre ?",
      "Ne range pas ta chambre.",
      "Range ta chambre !",
    ],
    methode: "On rend le pronom sujet au verbe, et on raconte au lieu d'ordonner.",
  },
  {
    text: "« Les enfants jouent. » Mets à la forme exclamative.",
    correct: "Comme les enfants jouent !",
    wrongs: [
      "Les enfants jouent ?",
      "Les enfants ne jouent pas.",
      "Jouez !",
    ],
    methode: "« Comme », « Que », « Quel » ouvrent l'exclamation.",
  },
  {
    text: "Que change-t-on pour passer d'un type de phrase à un autre ?",
    correct: "l'ordre des mots et la ponctuation",
    wrongs: [
      "seulement le temps du verbe",
      "seulement le sujet",
      "rien du tout",
    ],
    methode: "Le sens de base reste ; c'est la façon de le dire qui change.",
  },
  {
    text: "« Est-ce que tu as fini ? » Écris la même question par inversion.",
    correct: "As-tu fini ?",
    wrongs: ["Tu as fini.", "Tu n'as pas fini.", "Finis !"],
    methode: "On supprime « est-ce que » et on renverse le pronom.",
  },
  {
    text: "À l'oral, comment pose-t-on souvent une question ?",
    correct: "en montant la voix à la fin",
    wrongs: [
      "en parlant plus fort",
      "en parlant plus lentement",
      "en répétant le verbe",
    ],
    methode: "L'intonation suffit à l'oral ; à l'écrit, il faut le point d'interrogation.",
  },
  {
    text: "« Il ne vient pas. » Mets à la forme affirmative.",
    correct: "Il vient.",
    wrongs: ["Vient-il ?", "Il vient !", "Viens."],
    methode: "On retire les deux mots de la négation, et rien d'autre.",
  },
];

const CLASSES_MOTS: QcmItem[] = [
  {
    text: "Dans « le margouillat », quelle est la nature du mot « le » ?",
    correct: "un déterminant : un article défini",
    wrongs: [
      "un déterminant : un article indéfini",
      "un pronom personnel complément",
      "une préposition placée devant le nom",
    ],
    methode: "Il est collé devant le nom et l'annonce.",
  },
  {
    text: "Dans « un cari », le mot « un » est…",
    correct: "un article indéfini",
    wrongs: ["un article défini", "un déterminant possessif", "un adverbe"],
    methode: "« un, une, des » : on ne sait pas encore lequel.",
  },
  {
    text: "Dans « ma sœur », le mot « ma » est…",
    correct: "un déterminant possessif",
    wrongs: ["un article défini", "un déterminant démonstratif", "un pronom"],
    methode: "Il dit à qui c'est : mon, ton, son, ma, ta, sa…",
  },
  {
    text: "Dans « ce bateau », le mot « ce » est…",
    correct: "un déterminant démonstratif",
    wrongs: ["un article indéfini", "un déterminant possessif", "une conjonction"],
    methode: "Il montre : ce, cet, cette, ces.",
  },
  {
    text: "Quelle liste ne contient QUE des conjonctions de coordination ?",
    correct: "mais, ou, et, donc",
    wrongs: [
      "le, la, les, des",
      "je, tu, il, elle",
      "à, dans, sur, avec",
    ],
    methode: "mais, ou, et, donc, or, ni, car : les sept.",
  },
  {
    text: "Dans « Il court vite », quelle est la nature du mot « vite » ?",
    correct: "un adverbe",
    wrongs: ["un adjectif", "un nom", "un déterminant"],
    methode: "Il dit comment se passe l'action, et il ne change jamais.",
  },
  {
    text: "Les adverbes sont des mots…",
    correct: "invariables : ils ne changent jamais",
    wrongs: [
      "qui s'accordent avec le nom",
      "qui se conjuguent",
      "qui prennent un s au pluriel",
    ],
    methode: "« ils courent vite » : « vite » ne bouge pas.",
  },
  {
    text: "À quoi sert un déterminant ?",
    correct: "à annoncer le nom et à donner son genre et son nombre",
    wrongs: [
      "à préciser le nom, en disant comment il est",
      "à remplacer le nom pour ne pas le répéter",
      "à relier le nom au verbe de la phrase",
    ],
    methode: "« des letchis » : c'est « des » qui prévient qu'il y en a plusieurs.",
  },
  {
    text: "Dans « Les enfants jouent souvent dehors », combien y a-t-il d'adverbes ?",
    correct: "deux : « souvent » et « dehors »",
    wrongs: [
      "un seul : « souvent »",
      "un seul : « dehors »",
      "trois : « souvent », « dehors » et « jouent »",
    ],
    methode: "L'un dit quand, l'autre dit où : les deux accompagnent le verbe.",
  },
  {
    text: "Un adverbe accompagne surtout…",
    correct: "le verbe",
    wrongs: ["le déterminant", "le nom", "la conjonction"],
    methode: "Adverbe : le mot dit « auprès du verbe ».",
  },
  {
    text: "Dans « Léa et Tom », le mot « et » est…",
    correct: "une conjonction de coordination",
    wrongs: ["un déterminant", "un adverbe", "un pronom"],
    methode: "Il relie deux éléments de même rang.",
  },
  {
    text: "Comment reconnait-on un déterminant ?",
    correct: "Il est collé devant un nom",
    wrongs: [
      "Il est collé devant un verbe",
      "Il termine la phrase",
      "Il porte toujours un accent",
    ],
    methode: "Cherche d'abord le nom, puis regarde le petit mot devant lui.",
  },
];

const PRONOMS_SUJET_OBJET: QcmItem[] = [
  {
    text: "Dans « Il dort », le mot « il » est un pronom personnel…",
    correct: "sujet",
    wrongs: ["complément", "possessif", "démonstratif"],
    methode: "Qui est-ce qui dort ? « il ».",
  },
  {
    text: "Dans « Je le vois », le mot « le » est un pronom personnel…",
    correct: "complément",
    wrongs: ["sujet", "possessif", "démonstratif"],
    methode: "Le sujet est « Je » ; « le » est ce qu'on voit.",
  },
  {
    text: "« Le pêcheur répare son filet. » Remplace le SUJET par un pronom.",
    correct: "Il répare son filet.",
    wrongs: [
      "Le répare son filet.",
      "Lui répare son filet.",
      "Le pêcheur le répare.",
    ],
    methode: "Un groupe sujet se remplace par un pronom sujet.",
  },
  {
    text: "« Léa mange une mangue. » Remplace le COMPLÉMENT par un pronom.",
    correct: "Léa la mange.",
    wrongs: [
      "Léa elle mange.",
      "Léa mange la.",
      "Elle mange une mangue.",
    ],
    methode: "Le pronom complément se place DEVANT le verbe.",
  },
  {
    text: "Quels sont les pronoms personnels SUJETS ?",
    correct: "je, tu, il, elle, nous, vous, ils, elles",
    wrongs: [
      "me, te, se, le, la, les, lui, leur",
      "mon, ton, son, notre, votre, leur",
      "qui, que, dont, où, lequel, auquel",
    ],
    methode: "Ce sont ceux qui commandent la terminaison du verbe.",
  },
  {
    text: "Où se place le pronom personnel complément ?",
    correct: "devant le verbe",
    wrongs: [
      "après le verbe",
      "au début de la phrase",
      "à la fin de la phrase",
    ],
    methode: "« Je LE vois » et non « Je vois le ».",
  },
  {
    text: "Dans « Les enfants les ramassent », quelle est la nature du PREMIER « les » ?",
    correct: "un déterminant",
    wrongs: ["un pronom sujet", "un pronom complément", "un adverbe"],
    methode: "Il est collé devant le nom « enfants ».",
  },
  {
    text: "Dans « Les enfants les ramassent », quelle est la nature du SECOND « les » ?",
    correct: "un pronom complément",
    wrongs: ["un déterminant", "un pronom sujet", "une conjonction"],
    methode: "Il est devant le verbe et remplace ce qu'on ramasse.",
  },
  {
    text: "À quoi sert un pronom ?",
    correct: "à remplacer un nom déjà dit, pour ne pas le répéter",
    wrongs: [
      "à désigner celui qui parle, et lui seul",
      "à porter le genre et le nombre du nom qu'il suit",
      "à relier deux propositions dans une même phrase",
    ],
    methode: "Sans lui, on redirait le même nom à chaque phrase.",
  },
  {
    text: "« Tom et Léa arrivent. » Remplace le sujet par un pronom.",
    correct: "Ils arrivent.",
    wrongs: ["Il arrive.", "Elles arrivent.", "Les arrivent."],
    methode: "Deux personnes dont un garçon : « ils ».",
  },
  {
    text: "Le pronom sujet commande…",
    correct: "la terminaison du verbe",
    wrongs: [
      "le genre du nom",
      "la place du complément",
      "rien du tout",
    ],
    methode: "« je chante », « nous chantons » : c'est lui qui décide.",
  },
  {
    text: "« Nous voyons les baleines. » Remplace le complément par un pronom.",
    correct: "Nous les voyons.",
    wrongs: [
      "Nous voyons les.",
      "Nous elles voyons.",
      "Elles nous voient.",
    ],
    methode: "Le pronom complément passe devant le verbe.",
  },
];

const GN_EPITHETE: QcmItem[] = [
  {
    text: "Dans « le grand bateau », comment le groupe nominal est-il construit ?",
    correct: "Déterminant + Adjectif + Nom",
    wrongs: [
      "Déterminant + Nom + Adjectif",
      "Nom + Déterminant",
      "Adjectif + Nom seulement",
    ],
    methode: "L'adjectif peut se placer avant ou après le nom.",
  },
  {
    text: "Dans « une plage déserte », comment le groupe nominal est-il construit ?",
    correct: "Déterminant + Nom + Adjectif",
    wrongs: [
      "Déterminant + Adjectif + Nom",
      "Nom + Adjectif seulement",
      "Adjectif + Déterminant",
    ],
    methode: "Ici l'adjectif suit le nom.",
  },
  {
    text: "Dans « le vieux tamarin », quel est le nom noyau ?",
    correct: "tamarin",
    wrongs: ["vieux", "le", "il n'y en a pas"],
    methode: "C'est le nom principal, celui qui commande tout le groupe.",
  },
  {
    text: "Le nom noyau, c'est…",
    correct: "le nom principal du groupe, celui qui commande l'accord",
    wrongs: [
      "le premier mot du groupe, celui qui ouvre et donne le ton",
      "le déterminant, puisque c'est lui qui porte le genre et le nombre",
      "l'adjectif, celui qui apporte au groupe son sens le plus précis",
    ],
    methode: "Déterminant et adjectif s'accordent avec lui.",
  },
  {
    text: "Un adjectif collé au nom s'appelle…",
    correct: "une épithète",
    wrongs: ["un attribut", "un déterminant", "un adverbe"],
    methode: "Épithète : il est dans le groupe nominal, sans verbe entre les deux.",
  },
  {
    text: "Dans « des letchis mûrs », quel mot est épithète ?",
    correct: "mûrs",
    wrongs: ["des", "letchis", "aucun mot"],
    methode: "C'est l'adjectif, collé au nom noyau.",
  },
  {
    text: "Peut-on supprimer l'épithète ?",
    correct: "Oui : le groupe nominal tient encore debout",
    wrongs: [
      "Non, jamais",
      "Seulement au pluriel",
      "Seulement si elle est devant le nom",
    ],
    methode: "« des letchis mûrs » → « des letchis ». On perd un détail, pas la phrase.",
  },
  {
    text: "Dans « le petit bateau blanc », combien y a-t-il d'épithètes ?",
    correct: "deux : « petit » et « blanc »",
    wrongs: [
      "une seule : « petit »",
      "une seule : « blanc »",
      "trois : « le », « petit » et « blanc »",
    ],
    methode: "Un adjectif avant le nom, un après : les deux sont épithètes.",
  },
  {
    text: "Avec quoi l'épithète s'accorde-t-elle ?",
    correct: "avec le nom noyau",
    wrongs: [
      "avec le verbe",
      "avec le sujet de la phrase",
      "avec le déterminant seulement",
    ],
    methode: "Le nom noyau est le donneur d'accord du groupe.",
  },
  {
    text: "Un groupe nominal contient toujours…",
    correct: "un nom",
    wrongs: ["un verbe", "un adverbe", "une conjonction"],
    methode: "C'est ce qui lui donne son nom : groupe NOMINAL.",
  },
  {
    text: "Dans « ma vieille case », quel est le déterminant ?",
    correct: "ma",
    wrongs: ["vieille", "case", "il n'y en a pas"],
    methode: "Le petit mot du début, qui annonce le nom.",
  },
  {
    text: "Comment trouver le nom noyau d'un groupe nominal ?",
    correct: "On enlève les adjectifs : le nom qui reste est le noyau",
    wrongs: [
      "On prend le premier mot du groupe, celui qui vient en tête",
      "On prend le dernier mot, celui qui ferme le groupe nominal",
      "On garde le mot le plus long : c'est lui qui porte le sens",
    ],
    methode: "Ce qui ne peut pas partir sans casser le groupe, c'est le noyau.",
  },
];

const PARTICIPE_PASSE_ETRE: QcmItem[] = [
  {
    text: "« Elle est allé___ au marché. »",
    correct: "allée",
    wrongs: ["allé", "allés", "aller"],
    methode: "Avec « être », le participe s'accorde avec le sujet : féminin singulier.",
  },
  {
    text: "Avec l'auxiliaire ÊTRE, le participe passé s'accorde avec…",
    correct: "le sujet",
    wrongs: ["le complément", "l'auxiliaire", "personne"],
    methode: "C'est la seule règle du CM1, et elle ne souffre pas d'exception.",
  },
  {
    text: "« Les enfants sont parti___ tôt. »",
    correct: "partis",
    wrongs: ["parti", "partie", "parties"],
    methode: "Sujet masculin pluriel.",
  },
  {
    text: "« Elles sont venu___ hier. »",
    correct: "venues",
    wrongs: ["venu", "venus", "venue"],
    methode: "Sujet féminin pluriel : « -ues ».",
  },
  {
    text: "« Tom et Léo sont arrivé___ ensemble. »",
    correct: "arrivés",
    wrongs: ["arrivé", "arrivée", "arrivées"],
    methode: "Deux sujets masculins : masculin pluriel.",
  },
  {
    text: "« Ma sœur est resté___ à la maison. »",
    correct: "restée",
    wrongs: ["resté", "restés", "rester"],
    methode: "« rester » se conjugue avec être : le participe suit le sujet.",
  },
  {
    text: "Comment savoir quelle terminaison mettre au participe passé ?",
    correct: "On cherche le sujet, puis on regarde son genre et son nombre",
    wrongs: [
      "On écoute la fin du mot : elle s'entend presque toujours",
      "On regarde le mot placé juste avant, quel qu'il soit",
      "On met un « s » dès que la phrase parle de plusieurs choses",
    ],
    methode: "L'accord ne s'entend pas : il se raisonne.",
  },
  {
    text: "« Le bateau est parti___ ce matin. »",
    correct: "parti",
    wrongs: ["partie", "partis", "partir"],
    methode: "Sujet masculin singulier : rien à ajouter.",
  },
  {
    text: "Dans « Elles sont sorties », pourquoi la terminaison « -es » ?",
    correct: "Parce que le sujet « Elles » est féminin pluriel",
    wrongs: [
      "Parce que le verbe est long",
      "Parce qu'il y a le mot « sont »",
      "Parce que c'est du passé",
    ],
    methode: "On remonte au sujet, toujours.",
  },
  {
    text: "« Mes cousines sont descendu___ à la plage. »",
    correct: "descendues",
    wrongs: ["descendu", "descendus", "descendue"],
    methode: "« Mes cousines » : féminin pluriel.",
  },
  {
    text: "Avec « être », le participe passé se comporte comme…",
    correct: "un adjectif : il s'accorde avec le sujet",
    wrongs: [
      "un adjectif : il s'accorde avec le complément d'objet",
      "un adverbe : il reste invariable en toute circonstance",
      "un verbe : il s'accorde en personne comme un verbe conjugué",
    ],
    methode: "« Elles sont parties » se comporte comme « Elles sont contentes ».",
  },
  {
    text: "« Nous sommes rentré___. » (le groupe est composé de garçons)",
    correct: "rentrés",
    wrongs: ["rentré", "rentrée", "rentrées"],
    methode: "« Nous » masculin pluriel : « -és ».",
  },
];

const MARQUES_TEMPS_PERSONNE: QcmItem[] = [
  {
    text: "Dans « nous chantions », quelle est la marque de PERSONNE ?",
    correct: "-ons",
    wrongs: ["-i-", "chant-", "-ions"],
    methode: "Elle dit QUI fait l'action : « -ons » va avec « nous ».",
  },
  {
    text: "Dans « nous chantions », quelle est la marque de TEMPS de l'imparfait ?",
    correct: "-i-",
    wrongs: ["-ons", "chant-", "-ez"],
    methode: "L'imparfait se reconnait à son « -ai- » ou son « -i- ».",
  },
  {
    text: "Quelle lettre annonce le futur dans « je chanterai » ?",
    correct: "le « r »",
    wrongs: ["le « a » final", "le « e »", "le « i »"],
    methode: "Le « -r- » est la marque du futur, dans tous les verbes.",
  },
  {
    text: "Un verbe conjugué se découpe en…",
    correct: "un radical et une terminaison",
    wrongs: [
      "un sujet et un verbe",
      "un nom et un adjectif",
      "deux mots séparés",
    ],
    methode: "Le radical porte le sens, la terminaison dit qui et quand.",
  },
  {
    text: "Dans « tu chantais », que dit la terminaison « -ais » ?",
    correct: "le temps ET la personne",
    wrongs: [
      "seulement le temps",
      "seulement la personne",
      "ni l'un ni l'autre",
    ],
    methode: "« -ai- » pour l'imparfait, « -s » pour « tu » : deux marques en une.",
  },
  {
    text: "Quelle marque de personne va avec « vous » ?",
    correct: "-ez",
    wrongs: ["-ons", "-ent", "-s"],
    methode: "Sauf trois exceptions : vous faites, vous dites, vous êtes.",
  },
  {
    text: "Quelle marque de personne va avec « ils » au présent ?",
    correct: "-ent",
    wrongs: ["-ez", "-ons", "-s"],
    methode: "Elle s'écrit et ne s'entend pas.",
  },
  {
    text: "Dans « il chantera », où se trouve la marque du futur ?",
    correct: "dans le « r » de « -ra »",
    wrongs: ["dans le « a » final", "dans « chant »", "il n'y en a pas"],
    methode: "Le « a » est la marque de personne ; le « r » celle du temps.",
  },
  {
    text: "Dans « je finissais », quel est le radical ?",
    correct: "finiss-",
    wrongs: ["je", "-ais", "fin-"],
    methode: "C'est le morceau qui ne bouge pas d'une personne à l'autre.",
  },
  {
    text: "À quoi sert de savoir isoler le radical d'un verbe ?",
    correct: "à retrouver le verbe et à ne pas se tromper de terminaison",
    wrongs: [
      "à savoir à quel groupe le verbe appartient, et rien de plus",
      "à trouver le sujet, puisque le radical s'accorde avec lui",
      "à découper le verbe en syllabes pour mieux le prononcer",
    ],
    methode: "Radical d'un côté, terminaison de l'autre : on ne mélange plus.",
  },
  {
    text: "Laquelle de ces formes est à l'imparfait ?",
    correct: "nous marchions",
    wrongs: ["nous marchons", "nous marcherons", "nous avons marché"],
    methode: "Le « -i- » avant la marque de personne signe l'imparfait.",
  },
  {
    text: "Laquelle de ces formes est au futur ?",
    correct: "vous parlerez",
    wrongs: ["vous parliez", "vous parlez", "vous avez parlé"],
    methode: "Le « -r- » signe le futur.",
  },
];

const RADICAL_VARIATIONS: QcmItem[] = [
  {
    text: "« Nous ___ le riz. » (manger, au présent)",
    correct: "mangeons",
    wrongs: ["mangons", "mangions", "mangez"],
    methode: "On garde le « e » pour conserver le son « j ».",
  },
  {
    text: "Pourquoi écrit-on « nous mangeons » avec un « e » ?",
    correct: "Pour garder le son « j » devant le « o »",
    wrongs: [
      "Parce que c'est un verbe irrégulier",
      "Parce que « nous » est au pluriel",
      "Pour faire plus joli",
    ],
    methode: "Sans lui, on lirait « manguons ».",
  },
  {
    text: "« Nous ___ un dessin. » (commencer, au présent)",
    correct: "commençons",
    wrongs: ["commencons", "commencions", "commencez"],
    methode: "La cédille garde le son « s » devant le « o ».",
  },
  {
    text: "Pourquoi une cédille dans « nous commençons » ?",
    correct: "Pour garder le son « s » devant le « o »",
    wrongs: [
      "Parce que le verbe est long",
      "Parce qu'il y a deux « c »",
      "Pour marquer le pluriel",
    ],
    methode: "Sans elle, on lirait « commenkons ».",
  },
  {
    text: "« Nous ___ la corde. » (lancer, au présent)",
    correct: "lançons",
    wrongs: ["lancons", "lancions", "lancez"],
    methode: "Même règle que « commencer » : cédille devant le « o ».",
  },
  {
    text: "« J'___ mon frère. » (appeler, au présent)",
    correct: "appelle",
    wrongs: ["appele", "appélle", "appelles"],
    methode: "Les verbes en -eler doublent souvent le « l ».",
  },
  {
    text: "« Tu ___ les feuilles. » (jeter, au présent)",
    correct: "jettes",
    wrongs: ["jetes", "jètes", "jeter"],
    methode: "Les verbes en -eter doublent souvent le « t ».",
  },
  {
    text: "Les verbes en -yer changent le « y » en…",
    correct: "« i » devant un e muet : il nettoie",
    wrongs: [
      "« e » : il netteoe",
      "rien du tout",
      "« ï » : il nettoïe",
    ],
    methode: "nettoyer, essuyer, appuyer : tous suivent cette règle.",
  },
  {
    text: "« Il ___ la vitre. » (nettoyer, au présent)",
    correct: "nettoie",
    wrongs: ["nettoye", "nettoies", "nettoyer"],
    methode: "Le « y » devient « i » devant la terminaison muette.",
  },
  {
    text: "« Nous ___ le sable. » (nettoyer, au présent)",
    correct: "nettoyons",
    wrongs: ["nettoions", "nettoyions", "nettoyez"],
    methode: "Avec « nous », la terminaison s'entend : le « y » reste.",
  },
  {
    text: "Le radical d'un verbe du premier groupe…",
    correct: "peut changer légèrement selon la personne",
    wrongs: [
      "ne change jamais",
      "change à chaque personne",
      "disparait au pluriel",
    ],
    methode: "Il ne change pas de sens, seulement d'orthographe, et pour le son.",
  },
  {
    text: "« Vous ___ la table. » (déplacer, au présent)",
    correct: "déplacez",
    wrongs: ["déplaçez", "déplacons", "déplacions"],
    methode: "⚠️ Pas de cédille devant « e » : le « c » se dit déjà « s ».",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   CULTURE LITTÉRAIRE ET ARTISTIQUE — 11/08/2026

   Le BO en fait un DOMAINE À PART, à côté de la Lecture, et il nomme ses
   entrées une par une : six au cours moyen, cinq en 6e. « Cette mise en
   correspondance est recommandée en CM et PRESCRITE en 6e. »
   La banque n'en nommait aucune : `lecture_oeuvres` (CM) et
   `culture_litteraire` (6e) ne portaient que des gestes de lecteur — relier,
   réagir, garder trace, reconnaitre un genre.

   ⚠️ CE QUE CES QUESTIONS PEUVENT ET NE PEUVENT PAS FAIRE. Les œuvres sont
   choisies par le professeur : la banque ne peut pas interroger sur un livre
   qu'elle n'a pas fait lire. Elle interroge donc les NOTIONS de chaque entrée
   — ce qui fait un héros, ce qui sépare le merveilleux de l'étrange, à quoi
   sert une ruse au théâtre — en s'appuyant sur le patrimoine que tout élève
   de cycle 3 a croisé : contes, fables, mythes. Jamais sur un roman précis
   qu'il faudrait avoir lu.
   ═══════════════════════════════════════════════════════════════════════════ */

const HEROS: QcmItem[] = [
  {
    text: "Qu'est-ce qui fait d'un personnage une héroïne ou un héros ?",
    correct: "Il affronte une épreuve plus grande que lui, et son choix nous apprend quelque chose",
    // Les trois leurres sont de VRAIES définitions du héros, chacune fausse
    // pour une raison différente : la force, la constance, la victoire. Avant,
    // c'étaient trois bribes de vingt-six signes contre une phrase de cent :
    // la bonne réponse se cochait à sa seule longueur (+73 car.).
    wrongs: [
      "Il possède une force ou un pouvoir que les autres personnages n'ont pas du tout",
      "Il traverse tout le récit sans jamais douter ni changer d'avis une seule fois",
      "Il finit toujours par gagner, et c'est sa victoire qui fait de lui un héros",
    ],
    methode: "Ce n'est pas la force qui fait le héros, c'est l'épreuve et le choix.",
  },
  {
    text: "Dans quels genres rencontre-t-on le plus souvent des héros ?",
    correct: "l'épopée, le conte, le roman, la fable, le théâtre",
    wrongs: [
      "le documentaire, l'article, le compte rendu, la notice",
      "la lettre, le journal intime, l'autobiographie, le carnet",
      "le dictionnaire, l'encyclopédie, l'atlas, le manuel",
    ],
    methode: "Le BO cite ces genres-là pour l'entrée « Découvrir des héroïnes, des héros ».",
  },
  {
    text: "Ulysse, dans l'Odyssée, est un héros surtout parce qu'…",
    correct: "il est rusé et ne renonce jamais à rentrer chez lui",
    wrongs: [
      "il est le plus fort de tous les guerriers de son temps",
      "il reçoit des dieux une protection qui le rend invincible",
      "il est roi, et son rang lui donne le premier rôle du récit",
    ],
    methode: "Sa ruse et sa persévérance comptent plus que sa force.",
  },
  {
    text: "Un héros peut-il avoir des faiblesses ?",
    correct: "Oui, et c'est souvent ce qui le rend intéressant",
    wrongs: [
      "Non : un héros sans faille est le modèle du genre",
      "Oui, mais il doit les avoir surmontées avant la fin",
      "Oui, mais seulement dans les récits d'aujourd'hui",
    ],
    methode: "Le BO demande de percevoir « leurs éventuelles fragilités ».",
  },
  {
    text: "Qu'est-ce qui pousse un héros à agir ?",
    correct: "un but, une promesse ou une valeur qu'il défend",
    wrongs: [
      "une menace qui pèse sur lui et qu'il cherche à fuir",
      "un ordre reçu de plus puissant que lui, et qu'il exécute",
      "le hasard des rencontres, qui le pousse d'épreuve en épreuve",
    ],
    methode: "Comprendre ses motivations, c'est comprendre le récit.",
  },
  {
    text: "Antigone, Jeanne d'Arc, Alice : ce sont…",
    correct: "des héroïnes de récits ou de l'histoire",
    wrongs: [
      "des autrices qui ont marqué la littérature",
      "des personnages inventés par un même auteur",
      "des femmes qui ont réellement existé toutes les trois",
    ],
    methode: "Le programme demande expressément de veiller à la représentation des femmes.",
  },
  {
    text: "Dans un conte, l'héroïne ou le héros est souvent…",
    correct: "aidé par un adjuvant et gêné par un opposant",
    wrongs: [
      "gêné par un adjuvant et aidé par un opposant",
      "seul face aux épreuves, du début jusqu'à la fin",
      "aidé par un objet magique, jamais par un personnage",
    ],
    methode: "Le conte distribue les rôles autour du héros.",
  },
  {
    text: "Que veut dire « s'identifier à un personnage » ?",
    correct: "se mettre à sa place et ressentir ce qu'il ressent",
    wrongs: [
      "lui trouver assez de points communs pour s'y reconnaitre",
      "vouloir agir comme lui une fois le livre refermé",
      "l'admirer au point de souhaiter lui ressembler",
    ],
    methode: "C'est ce qui permet d'ouvrir le champ de ses représentations.",
  },
  {
    text: "Un héros de la littérature de jeunesse peut être…",
    correct: "un enfant ordinaire placé dans une situation extraordinaire",
    wrongs: [
      "un enfant extraordinaire placé dans une situation ordinaire",
      "un adulte, seul capable d'affronter de vraies épreuves",
      "un roi ou un guerrier, comme dans les récits anciens",
    ],
    methode: "C'est même le cas le plus fréquent.",
  },
  {
    text: "Les valeurs qu'un héros défend, ce sont…",
    correct: "ce à quoi il tient : la justice, l'amitié, la liberté",
    wrongs: [
      "ce qu'il possède : ses armes, ses objets magiques, sa monture",
      "ce qu'il affronte : ses ennemis, les épreuves, les monstres",
      "ce qu'il obtient à la fin : le trésor, le royaume, la gloire",
    ],
    methode: "Le BO demande de s'interroger sur les valeurs dont les héros sont porteurs.",
  },
  {
    text: "Pourquoi lit-on encore des récits de héros très anciens ?",
    correct: "Parce que leurs questions se posent encore aujourd'hui",
    wrongs: [
      "Parce qu'ils racontent ce qui s'est vraiment passé autrefois",
      "Parce qu'ils sont courts et faciles à lire d'un seul trait",
      "Parce que les programmes scolaires les ont toujours imposés",
    ],
    methode: "Ce sont des questionnements universels : c'est pour cela qu'ils durent.",
  },
  {
    text: "Dans une fable, le personnage principal est souvent…",
    correct: "un animal qui se conduit comme un humain",
    wrongs: [
      "un humain qui se conduit comme un animal",
      "un enfant à qui l'on donne une leçon",
      "le fabuliste lui-même, qui raconte à la première personne",
    ],
    methode: "L'animal permet de parler des hommes sans les nommer.",
  },
];

const MERVEILLEUX: QcmItem[] = [
  {
    text: "Dans un conte merveilleux, les faits magiques…",
    correct: "sont admis : personne ne s'en étonne",
    wrongs: ["font toujours peur", "sont expliqués à la fin", "n'arrivent jamais"],
    methode: "C'est ce qui définit le merveilleux : la magie va de soi.",
  },
  {
    text: "Quelle est la différence entre le merveilleux et l'étrange ?",
    correct: "Dans le merveilleux la magie va de soi ; dans l'étrange elle inquiète et reste inexpliquée",
    // ⭐ Le premier leurre est l'INVERSION de la bonne réponse : c'est le piège
    // le plus instructif, car il oblige à savoir dans quel sens va la règle.
    wrongs: [
      "Dans le merveilleux la magie inquiète ; dans l'étrange elle est admise sans surprise",
      "Dans le merveilleux le héros est un enfant ; dans l'étrange c'est toujours un adulte",
      "Dans le merveilleux l'histoire est ancienne ; dans l'étrange elle est contemporaine",
    ],
    methode: "L'un rassure et enchante, l'autre trouble et laisse un doute.",
  },
  {
    text: "Une fée, un ogre, une baguette magique appartiennent…",
    correct: "au merveilleux",
    wrongs: ["au documentaire", "au texte prescriptif", "à la presse"],
    methode: "Ce sont les figures propres au conte merveilleux.",
  },
  {
    text: "Dans « Le Petit Poucet », l'ogre est…",
    correct: "un être merveilleux, dont l'existence n'est pas discutée",
    wrongs: [
      "un être étrange, dont l'existence inquiète et reste inexpliquée",
      "un homme ordinaire, que la peur des enfants rend monstrueux",
      "un animal réel, grossi par l'imagination de celui qui raconte",
    ],
    methode: "Le conte ne cherche jamais à le rendre vraisemblable.",
  },
  {
    text: "Pourquoi les contes merveilleux font-ils peur sans danger ?",
    correct: "Parce qu'on éprouve la peur en sécurité, à distance, en lisant",
    wrongs: [
      "Parce qu'ils finissent toujours bien, on le sait d'avance",
      "Parce que la magie qu'ils contiennent n'existe pas vraiment",
      "Parce qu'un adulte est là pour les lire à voix haute",
    ],
    methode: "C'est ce qui permet d'explorer la peur sans la subir.",
  },
  {
    text: "Le merveilleux permet d'explorer des thèmes universels comme…",
    correct: "la peur, le désir d'évasion, la curiosité pour l'inexplicable",
    wrongs: [
      "la vie quotidienne, le travail, les difficultés d'une famille",
      "l'histoire réelle : les guerres, les rois, les grandes dates",
      "les sciences : d'où viennent la pluie, le vent, les volcans",
    ],
    methode: "Le BO nomme ces trois-là pour cette entrée.",
  },
  {
    text: "Un récit étrange laisse souvent le lecteur…",
    correct: "avec un doute : rêve, folie, ou réalité ?",
    wrongs: ["avec une réponse claire", "avec une morale écrite", "avec une liste d'objets"],
    methode: "Le doute n'est pas un défaut du récit : c'est son effet.",
  },
  {
    text: "Où et quand se passent la plupart des contes merveilleux ?",
    correct: "dans un lieu et un temps qu'on ne peut pas situer : « Il était une fois… »",
    wrongs: [
      "dans une ville et à une date précises, que le texte nomme au début",
      "toujours au Moyen Âge, l'époque des châteaux et des chevaliers",
      "dans un futur lointain, quand la magie sera revenue sur la terre",
    ],
    methode: "L'imprécision est voulue : elle rend le conte transportable partout.",
  },
  {
    text: "À La Réunion, les récits autour de Grand-mère Kal relèvent…",
    correct: "du merveilleux et de l'étrange",
    wrongs: ["du documentaire", "du texte prescriptif", "de la poésie savante"],
    methode: "Les légendes locales appartiennent au même domaine que les contes.",
  },
  {
    text: "Qu'est-ce qu'un objet magique dans un conte ?",
    correct: "un objet qui donne un pouvoir et fait avancer l'histoire",
    wrongs: [
      "un objet rare et précieux, que le héros cherche tout au long",
      "un objet du quotidien, décrit avec beaucoup de précision",
      "un objet qui appartient au méchant et qu'il faut lui reprendre",
    ],
    methode: "S'il ne change rien à l'histoire, ce n'est pas un objet magique.",
  },
  {
    text: "Le merveilleux se rencontre…",
    correct: "dans les contes, les mythes et la fantasy",
    wrongs: ["seulement dans les contes", "seulement au théâtre", "seulement en poésie"],
    methode: "C'est un registre, pas un genre : il traverse plusieurs formes.",
  },
  {
    text: "Que développe surtout la lecture de récits merveilleux ?",
    correct: "l'imagination ET l'esprit critique : on sait que c'est inventé",
    wrongs: [
      "l'imagination seule : on croit un moment à ce qui est raconté",
      "la connaissance du passé : on apprend comment vivaient les gens",
      "le vocabulaire ancien, qu'on ne rencontre plus nulle part ailleurs",
    ],
    methode: "Savoir qu'on lit une fiction fait partie de l'exercice.",
  },
];

const AUTRES_VIES: QcmItem[] = [
  {
    text: "Que veut dire « vivre d'autres vies » en lisant ?",
    correct: "se projeter dans une existence qui n'est pas la sienne",
    wrongs: [
      "oublier un moment la sienne, le temps que dure la lecture",
      "lire beaucoup de livres, pour accumuler beaucoup d'histoires",
      "choisir des personnages qui vivent comme on aimerait vivre",
    ],
    methode: "C'est le titre même de cette entrée du programme.",
  },
  {
    text: "Un récit de vie raconte…",
    correct: "l'existence d'une personne, réelle ou imaginée",
    wrongs: [
      "une journée entière, heure par heure, dans le détail",
      "les événements d'une époque, vus par ceux qui les vivaient",
      "la vie d'un peuple, de ses origines jusqu'à aujourd'hui",
    ],
    methode: "Le BO parle de « récits de vie offerts par la littérature de jeunesse ».",
  },
  {
    text: "Qu'apporte la lecture d'un récit qui se passe loin de chez soi ?",
    correct: "on découvre d'autres façons de vivre, et on comprend mieux la sienne",
    wrongs: [
      "on découvre d'autres façons de vivre, et on oublie un peu la sienne",
      "on apprend des noms de pays et de villes qu'on ne connaissait pas",
      "on enrichit son vocabulaire avec des mots venus d'ailleurs",
    ],
    methode: "S'immerger dans un univers étranger, dit le BO, développe l'empathie.",
  },
  {
    text: "L'empathie, c'est…",
    correct: "la capacité à ressentir ce que ressent un autre",
    wrongs: [
      "la capacité à prendre pitié de ceux qui souffrent",
      "la capacité à deviner ce que l'autre va faire",
      "la capacité à garder son calme en toute situation",
    ],
    methode: "C'est ce que le programme attend de cette entrée.",
  },
  {
    text: "Dans un roman, un journal intime sert à…",
    correct: "faire entendre les pensées du personnage",
    wrongs: [
      "résumer ce qui s'est passé entre deux chapitres",
      "donner des dates pour situer l'histoire dans le temps",
      "montrer comment le personnage écrit et s'exprime",
    ],
    methode: "Il ouvre l'intérieur du personnage au lecteur.",
  },
  {
    text: "Se démarquer d'un personnage, c'est…",
    correct: "comprendre ce qu'il fait sans être d'accord avec lui",
    wrongs: [
      "cesser de le suivre dès qu'il fait quelque chose de mal",
      "le détester assez pour ne plus vouloir lire ses passages",
      "chercher en quoi il ne vous ressemble pas du tout",
    ],
    methode: "Le BO met « s'identifier » et « s'en démarquer » sur le même plan.",
  },
  {
    text: "Pourquoi un auteur choisit-il de raconter à la première personne ?",
    correct: "pour qu'on entre dans la tête du personnage",
    wrongs: [
      "pour que le lecteur croie que l'histoire est vraie",
      "pour ne pas avoir à décrire les autres personnages",
      "pour raconter plus vite, sans passer par un narrateur",
    ],
    methode: "Le « je » rapproche : c'est un choix, pas une facilité.",
  },
  {
    text: "Une autobiographie raconte…",
    correct: "la vie de l'auteur, écrite par lui-même",
    wrongs: ["la vie d'un autre", "une histoire entièrement inventée", "un fait scientifique"],
    methode: "auto (soi) + bio (vie) + graphie (écriture).",
  },
  {
    text: "Que peut-on apprendre d'un personnage très différent de soi ?",
    correct: "que plusieurs façons de vivre sont possibles",
    wrongs: [
      "que sa façon de vivre est moins bonne que la nôtre",
      "qu'au fond tout le monde se ressemble beaucoup",
      "que les personnages lointains restent incompréhensibles",
    ],
    methode: "C'est ce que le BO appelle « se projeter dans des existences nouvelles ».",
  },
  {
    text: "Un récit d'enfance permet souvent au lecteur…",
    correct: "de comparer son propre vécu à celui du personnage",
    wrongs: [
      "de retrouver exactement ce qu'il a vécu lui-même",
      "d'apprendre comment on vivait à une autre époque",
      "de savoir comment il faudra se comporter plus tard",
    ],
    methode: "La comparaison est le moteur de cette entrée.",
  },
  {
    text: "Lire la vie d'un personnage nourrit surtout…",
    correct: "la sensibilité et la créativité du lecteur",
    wrongs: [
      "sa connaissance des époques et des lieux",
      "sa mémoire des noms et des dates du récit",
      "sa capacité à lire vite et sans s'arrêter",
    ],
    methode: "Le BO le dit en toutes lettres pour cette entrée.",
  },
  {
    text: "Dans un roman, le narrateur et l'auteur…",
    correct: "ne sont pas toujours la même personne",
    wrongs: [
      "sont toujours la même personne",
      "n'existent jamais ensemble",
      "désignent le lecteur",
    ],
    methode: "Un auteur peut faire raconter par un personnage qui n'est pas lui.",
  },
];

const MORALE: QcmItem[] = [
  {
    text: "À la fin d'une fable, la morale…",
    correct: "dit la leçon que l'histoire veut faire comprendre",
    wrongs: [
      "résume l'histoire en deux vers, pour qu'on la retienne",
      "annonce ce qui arrivera aux personnages après la fable",
      "nomme celui des deux animaux qui avait raison au départ",
    ],
    methode: "Elle condense en une phrase ce que le récit a montré.",
  },
  {
    text: "La morale d'une fable est-elle toujours écrite ?",
    correct: "Non : parfois il faut la déduire soi-même",
    wrongs: [
      "Oui : une fable sans morale écrite n'est pas une fable",
      "Non : elle n'est jamais écrite, on la devine toujours",
      "Oui, mais seulement quand les personnages sont des animaux",
    ],
    methode: "Une morale implicite se cherche dans ce qui arrive aux personnages.",
  },
  {
    text: "Dans « Le Corbeau et le Renard », que retient-on ?",
    correct: "qu'il faut se méfier de ceux qui flattent",
    wrongs: [
      "qu'il faut chanter plus fort",
      "qu'il ne faut pas manger de fromage",
      "que les renards sont dangereux",
    ],
    methode: "La fable est écrite pour cette leçon-là, et elle le dit à la fin.",
  },
  {
    text: "« Interroger la morale », cela veut dire…",
    correct: "se demander si l'on est d'accord, et pourquoi",
    wrongs: [
      "chercher ce que l'auteur a voulu nous faire croire",
      "l'apprendre par cœur pour la citer au bon moment",
      "vérifier qu'elle découle bien de l'histoire racontée",
    ],
    methode: "Le BO demande d'interroger, pas seulement de comprendre.",
  },
  {
    text: "Une valeur, dans un récit, c'est…",
    correct: "ce à quoi les personnages tiennent : justice, tolérance, liberté",
    wrongs: [
      "ce que le récit coute au lecteur : son temps, son attention",
      "ce que vaut le livre pour un libraire ou un collectionneur",
      "la leçon écrite à la fin, que l'auteur adresse au lecteur",
    ],
    methode: "Le BO cite justice, tolérance, liberté, respect des différences.",
  },
  {
    text: "Les conséquences des actes d'un personnage servent à…",
    correct: "faire réfléchir le lecteur à ses propres choix",
    wrongs: [
      "punir le personnage qui s'est mal conduit",
      "montrer que tout finit par s'arranger",
      "relancer l'histoire quand elle s'essouffle",
    ],
    methode: "C'est par les conséquences que le récit fait réfléchir.",
  },
  {
    text: "Deux lecteurs peuvent-ils tirer des leçons différentes du même récit ?",
    correct: "Oui, et en débattre fait partie de la lecture",
    wrongs: [
      "Non : un récit ne porte qu'une seule leçon",
      "Oui, mais l'un des deux se trompe forcément",
      "Oui, mais seulement s'ils n'ont pas le même âge",
    ],
    methode: "L'esprit critique se construit dans l'échange.",
  },
  {
    text: "Un personnage qui fait un mauvais choix…",
    correct: "peut quand même apprendre quelque chose au lecteur",
    wrongs: [
      "doit être puni pour que la leçon soit claire",
      "cesse d'être un personnage auquel on s'attache",
      "doit se racheter avant la fin de l'histoire",
    ],
    methode: "L'erreur d'un personnage est souvent la leçon du lecteur.",
  },
  {
    text: "Le respect des différences est…",
    correct: "une valeur que la littérature permet d'interroger",
    wrongs: [
      "une règle de vie que la littérature se charge d'enseigner",
      "un thème que seuls certains genres peuvent aborder",
      "une consigne de classe, extérieure aux textes lus",
    ],
    methode: "Le BO le range parmi les fondements de la vie en commun.",
  },
  {
    text: "Une fable met souvent en scène des animaux pour…",
    correct: "parler des humains sans les nommer",
    wrongs: [
      "rendre l'histoire plus courte et plus facile à retenir",
      "amuser les enfants, à qui la fable s'adresse d'abord",
      "montrer comment vivent vraiment ces animaux-là",
    ],
    methode: "Le détour par l'animal rend la leçon supportable.",
  },
  {
    text: "L'esprit critique du lecteur, c'est…",
    correct: "sa capacité à se faire un avis en s'appuyant sur le texte",
    wrongs: [
      "sa capacité à trouver ce qui ne va pas dans n'importe quel texte",
      "sa capacité à juger un livre dès les premières pages lues",
      "sa capacité à retenir tout ce que le texte affirme, sans oublier",
    ],
    methode: "Un avis sans appui sur le texte n'est pas un avis de lecteur.",
  },
  {
    text: "La préservation de l'environnement peut-elle être le sujet d'une œuvre littéraire ?",
    correct: "Oui : le BO la cite parmi les valeurs à interroger",
    wrongs: [
      "Non : c'est un sujet de sciences, pas de littérature",
      "Oui, mais seulement en poésie, qui chante la nature",
      "Oui, mais seulement dans un documentaire, pas un récit",
    ],
    methode: "Justice, tolérance, liberté, respect des différences, environnement.",
  },
];

const POESIE: QcmItem[] = [
  {
    text: "À quoi reconnait-on un poème du premier coup d'œil ?",
    correct: "à sa forme sur la page : des vers, des strophes, des blancs",
    wrongs: [
      "à ses rimes, qu'on entend dès qu'on le lit à voix haute",
      "à sa longueur : un poème tient toujours sur une seule page",
      "à son titre, écrit en plus gros et souvent au singulier",
    ],
    methode: "La forme se voit avant que la lecture ne commence.",
  },
  {
    text: "Une rime, c'est…",
    correct: "un même son à la fin de deux vers",
    wrongs: ["un même mot répété", "une phrase courte", "un titre en gras"],
    methode: "C'est le son qui compte, pas l'orthographe.",
  },
  {
    text: "Qu'est-ce qu'une image poétique ?",
    correct: "une façon de dire une chose en en montrant une autre",
    wrongs: [
      "une description si précise qu'on voit la scène en lisant",
      "un dessin placé en regard du poème, pour l'accompagner",
      "un mot choisi pour son son plutôt que pour son sens",
    ],
    methode: "Le BO dit que la force de la poésie réside dans ses images.",
  },
  {
    text: "Dans « la mer était un drap froissé », que fait le poète ?",
    correct: "il compare la mer à un drap : c'est une image",
    wrongs: [
      "il décrit la mer telle qu'elle est vraiment ce jour-là",
      "il se trompe de mot : un drap n'a rien à voir avec la mer",
      "il donne la définition de la mer, en termes de tissu",
    ],
    methode: "L'image rapproche deux choses qu'on n'aurait pas rapprochées.",
  },
  {
    text: "Un poème doit-il toujours rimer ?",
    correct: "Non : le vers libre existe",
    wrongs: ["Oui, toujours", "Seulement s'il est long", "Seulement à l'école"],
    methode: "La rime est un procédé parmi d'autres, pas une obligation.",
  },
  {
    text: "Pourquoi lit-on un poème à voix haute ?",
    correct: "parce que ses sons et son rythme font partie du sens",
    wrongs: [
      "parce qu'on retient mieux un texte qu'on a dit tout haut",
      "parce que la lecture à voix haute oblige à ralentir",
      "parce que les rimes ne s'entendent pas dans sa tête",
    ],
    methode: "Un poème qu'on ne dit pas perd la moitié de ce qu'il est.",
  },
  {
    text: "Le poète peut-il inventer des mots ou bousculer la grammaire ?",
    correct: "Oui : il joue avec la langue en connaissant la règle",
    wrongs: [
      "Non : la poésie suit la grammaire plus strictement encore",
      "Oui, mais seulement pour faire tomber la rime au bon endroit",
      "Oui, à condition de prévenir le lecteur dans une note",
    ],
    methode: "Le BO dit que l'élève « mesure les écarts à la norme » et en joue.",
  },
  {
    text: "Une strophe, c'est…",
    correct: "un groupe de vers séparé des autres par une ligne blanche",
    wrongs: [
      "une ligne du poème, qui s'arrête avant la fin de la phrase",
      "un paragraphe, tel qu'on en trouve dans un roman en prose",
      "un groupe de vers qui riment tous ensemble, deux par deux",
    ],
    methode: "C'est le paragraphe du poème.",
  },
  {
    text: "Que veut dire « savourer le goût des mots » ?",
    correct: "prendre plaisir à leur son, à leur rythme, à ce qu'ils évoquent",
    wrongs: [
      "apprendre leur définition exacte, telle que la donne un dictionnaire",
      "en collectionner le plus possible, pour enrichir son vocabulaire",
      "choisir toujours le mot le plus rare, celui qui fait le plus d'effet",
    ],
    methode: "C'est le titre de cette entrée du programme.",
  },
  {
    text: "Un recueil de poèmes, c'est…",
    correct: "un livre qui rassemble plusieurs poèmes",
    wrongs: ["un poème très long", "un roman écrit en vers", "un dictionnaire"],
    methode: "Recueillir : rassembler.",
  },
  {
    text: "Écrire un poème « à la manière de », c'est…",
    correct: "reprendre sa forme ou son procédé pour en faire un à soi",
    wrongs: [
      "le recopier en changeant seulement quelques mots par des synonymes",
      "le raconter en prose, sans les vers, pour qu'il soit plus clair",
      "en écrire un autre sur le même sujet, avec une forme différente",
    ],
    methode: "On emprunte le moule, pas les mots.",
  },
  {
    text: "La poésie parle-t-elle seulement de choses belles ?",
    correct: "Non : elle parle de tout, y compris du quotidien",
    wrongs: [
      "Oui : c'est ce qui la sépare des autres genres",
      "Non : elle ne parle que de la nature et des saisons",
      "Non : elle ne parle que des sentiments du poète",
    ],
    methode: "Un caillou, une casserole, un bus : tout peut devenir poème.",
  },
];

const RAPPORT_AUTRES: QcmItem[] = [
  {
    text: "Dans un récit, un personnage se construit surtout…",
    correct: "au fil de ses rencontres et de ses choix",
    wrongs: [
      "dès la première page, une fois pour toutes",
      "grâce au narrateur seul",
      "grâce au titre",
    ],
    methode: "Le BO parle de personnages qui « se construisent et se redéfinissent ».",
  },
  {
    text: "L'amitié, dans un roman, sert souvent à…",
    correct: "montrer comment un personnage change au contact d'un autre",
    wrongs: [
      "donner au héros quelqu'un à qui parler, pour éviter le monologue",
      "adoucir le récit, pour que les épreuves soient moins dures à lire",
      "occuper les pages entre deux moments d'action importants",
    ],
    methode: "C'est une rencontre, et une rencontre transforme.",
  },
  {
    text: "Un conflit entre deux personnages permet…",
    correct: "de comprendre ce à quoi chacun tient",
    wrongs: [
      "de savoir lequel des deux a raison",
      "de désigner le méchant de l'histoire",
      "de relancer le récit quand il ralentit",
    ],
    methode: "Le désaccord révèle les valeurs de chacun.",
  },
  {
    text: "« S'affirmer », pour un personnage, c'est…",
    correct: "oser dire ou faire ce qu'il pense juste, même seul",
    wrongs: [
      "imposer son avis aux autres jusqu'à ce qu'ils cèdent",
      "l'emporter sur celui qui lui tenait tête depuis le début",
      "prendre la place du chef quand celui-ci a disparu",
    ],
    methode: "S'affirmer n'est pas s'imposer.",
  },
  {
    text: "Que peut apporter la lecture d'un récit sur le harcèlement ?",
    correct: "des mots pour comprendre une situation et pour en parler",
    wrongs: [
      "la certitude que cela n'arrive qu'aux autres, jamais à soi",
      "des solutions toutes prêtes, à appliquer telles quelles",
      "le nom des personnes à qui il faut s'adresser en pareil cas",
    ],
    methode: "La littérature donne des mots là où on n'en avait pas.",
  },
  {
    text: "Un personnage peut-il changer d'avis au cours d'un récit ?",
    correct: "Oui : c'est souvent ce qui rend l'histoire intéressante",
    wrongs: [
      "Non : un personnage garde le caractère qu'on lui a donné",
      "Oui, mais seulement au dénouement, une fois l'épreuve passée",
      "Oui, mais seulement s'il est adulte : un enfant ne change pas",
    ],
    methode: "Un personnage qui ne bouge pas n'a pas d'histoire.",
  },
  {
    text: "Le regard des autres, dans un récit, agit sur le personnage…",
    correct: "en l'aidant ou en le freinant",
    wrongs: [
      "en le freinant, jamais en l'aidant",
      "seulement quand il est en groupe",
      "seulement dans les récits modernes",
    ],
    methode: "Se découvrir est « à la fois intime et collectif », dit le BO.",
  },
  {
    text: "Une bande dessinée peut-elle traiter de sujets graves ?",
    correct: "Oui : le BO la cite à côté des romans et du théâtre",
    wrongs: [
      "Non : les images en font toujours un récit léger",
      "Oui, mais à condition qu'elle s'adresse aux adultes",
      "Oui, mais elle reste moins sérieuse qu'un roman",
    ],
    methode: "Le support ne décide pas du sérieux du propos.",
  },
  {
    text: "Discuter d'un livre en classe permet…",
    correct: "de découvrir que d'autres l'ont lu autrement",
    wrongs: [
      "de gagner du temps",
      "d'éviter de le lire",
      "de trouver l'unique bonne réponse",
    ],
    methode: "Il n'y a pas une lecture juste, il y a des lectures fondées.",
  },
  {
    text: "Se découvrir en lisant, cela veut dire…",
    correct: "comprendre quelque chose sur soi grâce à l'histoire d'un autre",
    wrongs: [
      "reconnaitre dans un personnage quelqu'un qui vous ressemble déjà",
      "lire un récit écrit par quelqu'un qui a vécu la même chose que soi",
      "tenir un journal où l'on note ce qu'on ressent en lisant",
    ],
    methode: "Le détour par un autre est le chemin le plus court vers soi.",
  },
  {
    text: "Un personnage de théâtre se révèle surtout…",
    correct: "par ce qu'il dit et par ce qu'il fait devant les autres",
    wrongs: [
      "par sa description physique, donnée en tête de la pièce",
      "par les didascalies, qui disent ce qu'il pense vraiment",
      "par ce que les autres personnages disent de lui",
    ],
    methode: "Au théâtre, il n'y a pas de narrateur pour expliquer.",
  },
  {
    text: "Pourquoi le BO parle-t-il d'une aventure « à la fois intime et collective » ?",
    correct: "Parce qu'on se construit seul, mais toujours au contact des autres",
    wrongs: [
      "Parce qu'on lit seul, puis qu'on en parle ensuite en classe",
      "Parce que toute la classe lit le même livre au même moment",
      "Parce qu'un livre appartient à celui qui l'a et se prête ensuite",
    ],
    methode: "Les deux mots vont ensemble : c'est tout le sens de l'entrée.",
  },
];

/* ── LES QUATRE ENTRÉES PROPRES À LA 6e ─────────────────────────────────────
   La cinquième, la poésie, partage le pool POESIE avec le cours moyen : les
   deux entrées disent la même chose — les images et le pouvoir d'évocation.
   ⚠️ Si la 6e doit un jour aller plus loin (versification, registres), elle
   prendra son propre pool ; pour l'instant, dupliquer serait recopier. */

const ORIGINES: QcmItem[] = [
  {
    text: "Qu'est-ce qu'un récit des origines ?",
    correct: "un récit qui explique comment le monde, les hommes ou une chose sont apparus",
    wrongs: [
      "un récit qui raconte les premiers jours de la vie d'un personnage",
      "un récit placé au début d'un livre, avant que l'histoire commence",
      "un récit qui dit d'où vient l'auteur et comment il s'est mis à écrire",
    ],
    methode: "Il répond à un « d'où cela vient-il ? ».",
  },
  {
    text: "Un mythe étiologique explique…",
    correct: "l'origine d'un phénomène : pourquoi la mer est salée, pourquoi l'araignée tisse",
    wrongs: [
      "la fin du monde : comment tout s'achèvera, et ce qu'il en restera après",
      "la vie d'un héros : sa naissance, ses exploits et sa mort glorieuse",
      "les règles d'une cité : ce qui y est permis, ce qui y est interdit",
    ],
    methode: "Étiologie : la recherche des causes.",
  },
  {
    text: "Un texte fondateur, c'est…",
    correct: "un récit ancien sur lequel une culture s'est construite",
    wrongs: [
      "le premier livre qu'un auteur a écrit dans toute sa carrière",
      "un texte de loi, qui fonde les règles communes d'un pays",
      "le texte placé au début d'un recueil, et qui annonce les autres",
    ],
    methode: "Il fonde une culture, pas une œuvre.",
  },
  {
    text: "La Genèse, l'Odyssée, les mythes grecs sont…",
    correct: "des textes fondateurs",
    wrongs: ["des romans modernes", "des documentaires", "des pièces de théâtre"],
    methode: "Le BO demande d'en découvrir au moins un, issu des religions monothéistes.",
  },
  {
    text: "Prométhée apporte le feu aux hommes. Ce récit explique…",
    correct: "l'origine d'un savoir humain, et son prix",
    wrongs: [
      "l'origine d'un phénomène naturel : la foudre, le volcan",
      "l'origine d'un peuple, et le nom de ses premiers rois",
      "la vie d'un dieu grec, de sa naissance à sa chute",
    ],
    methode: "Le mythe explique, et il fait payer : les deux comptent.",
  },
  {
    text: "Pourquoi trouve-t-on des récits des origines dans toutes les cultures ?",
    correct: "Parce que toutes les sociétés cherchent à expliquer d'où elles viennent",
    wrongs: [
      "Parce qu'un même récit s'est transmis d'un peuple à l'autre en voyageant",
      "Parce que ces récits sont courts et se retiennent sans avoir à les écrire",
      "Parce que les savants les ont recopiés dans tous les pays du monde",
    ],
    methode: "C'est ce que le BO appelle un questionnement universel.",
  },
  {
    text: "Un symbole, dans un mythe, c'est…",
    correct: "une image concrète qui porte une idée plus large",
    wrongs: [
      "un personnage inventé pour représenter un peuple entier",
      "un objet rare que le héros reçoit avant de partir",
      "un mot répété plusieurs fois pour qu'on le remarque",
    ],
    methode: "Le feu de Prométhée n'est pas seulement du feu.",
  },
  {
    text: "Que veut dire « recréer le monde » dans une production d'élève ?",
    correct: "écrire à son tour un récit qui explique une origine",
    wrongs: [
      "réécrire un mythe connu en changeant les noms des personnages",
      "imaginer à quoi ressemblerait le monde s'il était à refaire",
      "raconter la fin du monde plutôt que son commencement",
    ],
    methode: "Le BO attend des « productions écrites et créatives ».",
  },
  {
    text: "Les mythes se sont d'abord transmis…",
    correct: "à l'oral, avant d'être écrits",
    wrongs: [
      "par écrit d'abord, puis récités de mémoire",
      "par le théâtre, joué sur les places publiques",
      "par la peinture, sur les murs et les poteries",
    ],
    methode: "C'est pourquoi il en existe plusieurs versions.",
  },
  {
    text: "Un récit étiologique réunionnais pourrait expliquer…",
    correct: "pourquoi le piton fume, ou d'où vient le nom d'un lieu",
    wrongs: [
      "comment on prépare le cari, et depuis quand on le mange ici",
      "quand le volcan est entré en éruption pour la dernière fois",
      "qui furent les premiers habitants à s'installer sur l'île",
    ],
    methode: "Toute culture, y compris la plus proche, a ses récits d'origine.",
  },
  {
    text: "Que gagne-t-on à comparer deux récits des origines ?",
    correct: "on voit ce que deux cultures partagent et ce qui les sépare",
    wrongs: [
      "on découvre laquelle des deux cultures dit vrai sur les origines",
      "on retrouve le récit le plus ancien, dont l'autre a été copié",
      "on gagne du temps : les deux racontent au fond la même histoire",
    ],
    methode: "Le BO parle de mythes « issus de différents continents et traditions ».",
  },
  {
    text: "Les valeurs portées par un mythe…",
    correct: "se lisent dans ce que font les personnages et dans ce qui leur arrive",
    wrongs: [
      "se lisent dans la morale écrite à la fin, comme dans une fable",
      "se devinent au titre, qui annonce d'avance ce qu'il faut penser",
      "se trouvent dans les paroles du personnage le plus sage du récit",
    ],
    methode: "Le mythe montre ; il n'explique presque jamais.",
  },
];

const THEATRE: QcmItem[] = [
  {
    text: "Une didascalie, c'est…",
    correct: "une indication de jeu ou de mise en scène, écrite par l'auteur",
    wrongs: [
      "une réplique dite tout bas, que les autres personnages n'entendent pas",
      "le titre d'une scène, qui annonce ce qui va s'y passer",
      "la liste des personnages, donnée au début de la pièce",
    ],
    methode: "Elle n'est pas dite sur scène : elle est jouée.",
  },
  {
    text: "Une réplique, c'est…",
    correct: "ce que dit un personnage",
    wrongs: ["l'entrée d'un personnage", "la description du décor", "un acte"],
    methode: "Au théâtre, presque tout passe par la parole.",
  },
  {
    text: "Dans une comédie, la ruse sert souvent à…",
    correct: "déjouer un obstacle et faire rire",
    wrongs: ["décrire le décor", "donner la morale", "allonger la pièce"],
    methode: "C'est le ressort dramatique et comique de cette entrée.",
  },
  {
    text: "Un quiproquo, c'est…",
    correct: "un malentendu : un personnage croit une chose, le public en sait une autre",
    wrongs: [
      "un aparté : un personnage parle au public sans que les autres l'entendent",
      "un coup de théâtre : un événement soudain qui renverse toute la situation",
      "une tirade : une longue réplique dite d'un trait par un seul personnage",
    ],
    methode: "Le public en sait plus : c'est de là que vient le rire.",
  },
  {
    text: "Pourquoi le public rit-il d'une ruse au théâtre ?",
    correct: "parce qu'il en sait plus que le personnage trompé",
    wrongs: [
      "parce que les répliques sont courtes",
      "parce qu'il y a de la musique",
      "parce que c'est écrit en vers",
    ],
    methode: "Le savoir du spectateur est le moteur du comique.",
  },
  {
    text: "Une pièce de théâtre est découpée en…",
    correct: "actes et scènes",
    wrongs: ["chapitres et paragraphes", "strophes et vers", "titres et sous-titres"],
    methode: "L'acte est la grande unité, la scène la petite.",
  },
  {
    text: "Au théâtre, le masque sert à…",
    correct: "cacher qui l'on est pour jouer un autre — et parfois dire plus vrai",
    wrongs: [
      "protéger le visage de l'acteur pendant les scènes de combat",
      "porter la voix plus loin, jusqu'au dernier rang de la salle",
      "montrer au public à quel acte de la pièce on est arrivé",
    ],
    methode: "« Se masquer, jouer, déjouer » : l'illusion et la vérité vont ensemble.",
  },
  {
    text: "Un texte de théâtre est écrit d'abord pour être…",
    correct: "joué",
    wrongs: ["lu en silence", "résumé", "recopié"],
    methode: "C'est pourquoi la mise en voix fait partie de l'étude.",
  },
  {
    text: "Que change la mise en voix d'une réplique ?",
    correct: "le ton donne un sens que le texte seul ne dit pas",
    wrongs: [
      "le ton rend la réplique plus claire, sans rien y ajouter",
      "le ton remplace les didascalies que l'auteur a écrites",
      "le ton change la longueur de la scène et son rythme",
    ],
    methode: "« Très bien. » peut vouloir dire son contraire.",
  },
  {
    text: "L'illusion théâtrale, c'est…",
    correct: "le fait d'accepter, le temps de la pièce, que ce qu'on voit est vrai",
    wrongs: [
      "le fait d'oublier tout à fait qu'on se trouve dans une salle",
      "le décor peint qui fait croire à un vrai palais ou à une forêt",
      "le moment où un personnage trompe un autre par un déguisement",
    ],
    methode: "Le BO parle du rapport entre « l'illusion et le réel ».",
  },
  {
    text: "Quand un personnage parle au public sans que les autres l'entendent, on appelle cela…",
    correct: "un aparté",
    wrongs: ["une didascalie", "un monologue intérieur", "un quiproquo"],
    methode: "À part : dit de côté, pour le public seul.",
  },
  {
    text: "Jouer une scène en classe permet surtout…",
    correct: "de comprendre le texte par le corps et par la voix",
    wrongs: [
      "d'apprendre le texte par cœur plus vite qu'en le lisant",
      "de rendre la lecture plus vivante pour ceux qui écoutent",
      "de vérifier que tout le monde a bien lu la scène",
    ],
    methode: "Le BO attend des « activités de théâtralisation ».",
  },
];

const AVENTURE: QcmItem[] = [
  {
    text: "Qu'est-ce qui fait le moteur d'un récit d'aventure ?",
    correct: "un départ, un danger et un but à atteindre",
    wrongs: [
      "un décor précis, une époque et des costumes crédibles",
      "un narrateur qui commente tout ce que fait le héros",
      "une morale à la fin, qui dit ce qu'il fallait comprendre",
    ],
    methode: "Sans enjeu, il n'y a pas d'aventure.",
  },
  {
    text: "Un récit d'aventure commence souvent par…",
    correct: "une situation d'équilibre, rompue par un élément déclencheur",
    wrongs: [
      "un danger immédiat, dès la première ligne, avant toute présentation",
      "le portrait complet du héros, de sa naissance jusqu'à son départ",
      "l'annonce de ce qui va arriver, pour donner envie de continuer",
    ],
    methode: "Quelque chose doit se casser pour que le récit parte.",
  },
  {
    text: "Pourquoi le héros doit-il quitter son monde connu ?",
    correct: "parce que c'est le départ qui rend l'aventure possible",
    wrongs: [
      "parce qu'un danger le chasse de chez lui, sans qu'il choisisse",
      "parce que son monde ne lui offrait plus rien d'intéressant",
      "parce que tout récit d'aventure commence par un voyage",
    ],
    methode: "Le BO parle de « l'élan constitutif de l'aventure ».",
  },
  {
    text: "À quoi sert un obstacle dans un récit d'aventure ?",
    correct: "à montrer ce dont le héros est capable",
    wrongs: ["à allonger le livre", "à ennuyer le lecteur", "à changer de narrateur"],
    methode: "Un héros sans obstacle n'apprend rien et n'apprend rien au lecteur.",
  },
  {
    text: "L'Île au trésor et Vingt mille lieues sous les mers sont…",
    correct: "des romans d'aventure",
    wrongs: ["des recueils de poésie", "des pièces de théâtre", "des documentaires"],
    methode: "Deux classiques de cette entrée.",
  },
  {
    text: "Le suspense, c'est…",
    correct: "l'attente créée chez le lecteur quand il ignore ce qui va arriver",
    wrongs: [
      "la surprise que produit la fin quand elle arrive sans prévenir",
      "la peur qu'inspire un personnage dès sa première apparition",
      "le moment où l'auteur explique enfin tout ce qu'on ignorait",
    ],
    methode: "Il se fabrique : l'auteur retient l'information.",
  },
  {
    text: "Dans un récit d'aventure, le voyage est souvent…",
    correct: "aussi un voyage intérieur : le héros change",
    wrongs: [
      "seulement un déplacement",
      "toujours en bateau",
      "sans effet sur l'histoire",
    ],
    methode: "On ne revient jamais tout à fait le même.",
  },
  {
    text: "Le narrateur d'un récit d'aventure peut…",
    correct: "être le héros lui-même ou quelqu'un d'extérieur",
    wrongs: [
      "être le héros lui-même, jamais quelqu'un d'extérieur",
      "être extérieur à l'histoire, jamais le héros",
      "changer de personne à chaque nouveau chapitre",
    ],
    methode: "Les deux choix existent, et ils ne racontent pas pareil.",
  },
  {
    text: "Un récit de voyage, c'est…",
    correct: "un texte qui raconte la découverte, réelle ou imaginée, d'un ailleurs",
    wrongs: [
      "un guide touristique : il décrit un pays et conseille quoi y visiter",
      "un documentaire : il donne des informations vraies sur une région",
      "une carte commentée : elle situe les lieux et nomme les distances",
    ],
    methode: "Ce qui compte, c'est le récit de la découverte.",
  },
  {
    text: "Pourquoi les récits d'aventure plaisent-ils depuis si longtemps ?",
    correct: "parce qu'ils donnent à vivre ce qu'on ne vivra pas",
    wrongs: [
      "parce qu'ils se lisent vite et sans effort particulier",
      "parce qu'ils racontent des choses réellement arrivées",
      "parce qu'ils finissent toujours par une victoire du héros",
    ],
    methode: "Le BO parle de « l'expression littéraire qui en décuple le pouvoir ».",
  },
  {
    text: "Écrire un récit d'aventure demande d'abord…",
    correct: "de choisir un but, un obstacle et un enjeu",
    wrongs: [
      "de choisir un décor, une époque et des costumes",
      "de trouver un titre, un héros et une belle fin",
      "de décider combien de chapitres on va écrire",
    ],
    methode: "Le reste s'écrit autour de ces trois-là.",
  },
  {
    text: "Le dénouement d'un récit d'aventure…",
    correct: "résout la quête, heureusement ou non",
    wrongs: [
      "recommence l'histoire",
      "donne obligatoirement une morale",
      "présente les personnages",
    ],
    methode: "Résoudre ne veut pas dire finir bien.",
  },
];

const MONSTRES: QcmItem[] = [
  {
    text: "Qu'est-ce qui fait un monstre en littérature ?",
    correct: "une part d'humain et une part qui fait peur, tenues ensemble",
    wrongs: [
      "une taille et une force que rien ni personne ne peut arrêter",
      "une laideur si grande qu'elle suffit à le faire reconnaitre",
      "une méchanceté entière, sans le moindre reste d'humanité",
    ],
    methode: "Le BO parle de « la part d'humanité d'un personnage monstrueux ».",
  },
  {
    text: "Le Minotaure, le Cyclope et la Méduse viennent…",
    correct: "des mythes grecs",
    wrongs: ["des contes de Perrault", "du théâtre classique", "de la poésie moderne"],
    methode: "Trois figures que la 6e croise dans les récits des origines.",
  },
  {
    text: "Pourquoi certains monstres inspirent-ils de la pitié ?",
    correct: "parce qu'ils souffrent d'être rejetés",
    wrongs: ["parce qu'ils sont petits", "parce qu'ils perdent", "parce qu'ils parlent"],
    methode: "Le BO dit : « inspirant la peur ou la compassion ».",
  },
  {
    text: "À quoi sert le monstre dans un récit ?",
    correct: "à faire apparaitre ce que le héros a de plus humain",
    wrongs: [
      "à donner au héros un adversaire à sa mesure, et pas plus",
      "à faire peur au lecteur, ce qui l'attache à l'histoire",
      "à représenter le mal, pour que le bien se voie mieux",
    ],
    methode: "Il est l'épreuve qui révèle.",
  },
  {
    text: "Que veut dire « expérience de l'autre, expérience de soi » ?",
    correct: "en rencontrant le monstre, on découvre aussi quelque chose sur soi",
    wrongs: [
      "en rencontrant l'autre, on oublie un moment qui l'on est soi-même",
      "en lisant plusieurs récits, on finit par se connaitre un peu mieux",
      "en voyageant au loin, on apprend comment vivent les autres peuples",
    ],
    methode: "C'est le sous-titre même de cette entrée.",
  },
  {
    text: "Un monstre peut-il être le personnage principal ?",
    correct: "Oui, et le récit change alors de point de vue",
    wrongs: [
      "Non : le monstre ne peut être que l'obstacle du héros",
      "Oui, mais il cesse alors d'être vraiment un monstre",
      "Oui, à condition qu'il devienne bon avant la fin",
    ],
    methode: "Raconter depuis le monstre renverse tout le récit.",
  },
  {
    text: "Pourquoi la figure du monstre traverse-t-elle les époques ?",
    correct: "parce que chaque époque y met ce qui lui fait peur",
    wrongs: [
      "parce que les auteurs se copient",
      "parce que c'est plus facile à écrire",
      "parce que c'est obligatoire",
    ],
    methode: "Le BO parle de « la permanence de la figure du monstre à travers les âges ».",
  },
  {
    text: "Dans « La Belle et la Bête », la Bête est monstrueuse…",
    correct: "d'apparence, et pas de cœur",
    wrongs: ["de cœur, et pas d'apparence", "des deux façons", "d'aucune façon"],
    methode: "Tout le conte tient dans cet écart.",
  },
  {
    text: "Qu'est-ce qui distingue un monstre d'un simple méchant ?",
    correct: "le monstre trouble : on ne sait pas toujours s'il faut le craindre ou le plaindre",
    wrongs: [
      "le méchant trouble : on hésite entre le craindre et le plaindre, pas le monstre",
      "le monstre agit toujours seul, alors que le méchant a toujours des complices",
      "le monstre appartient toujours au merveilleux, le méchant au récit réaliste",
    ],
    methode: "Le méchant est clair ; le monstre ne l'est pas.",
  },
  {
    text: "Créer un monstre dans un texte demande de…",
    correct: "choisir ce qui, en lui, fait peur ET ce qui touche",
    wrongs: [
      "choisir ce qui, en lui, fait peur — et rien d'autre",
      "le décrire très longuement, pour qu'on le voie bien",
      "lui donner une taille et une force hors du commun",
    ],
    methode: "Sans la seconde part, ce n'est qu'un décor effrayant.",
  },
  {
    text: "La visée éducative d'un conte à monstre est souvent…",
    correct: "d'apprendre à ne pas juger sur l'apparence",
    wrongs: [
      "d'apprendre la géographie",
      "de faire peur pour faire peur",
      "de donner du vocabulaire",
    ],
    methode: "Le BO demande de « dégager la visée éducative » du récit.",
  },
  {
    text: "Dans beaucoup de récits, le monstre garde…",
    correct: "un lieu ou un secret que le héros doit atteindre",
    wrongs: [
      "un objet magique qu'il remettra au héros vaincu",
      "la mémoire du peuple, qu'il transmet de siècle en siècle",
      "la frontière entre le monde des vivants et celui des morts",
    ],
    methode: "Le franchir, c'est franchir l'épreuve.",
  },
];

/* ── TROIS TROUS DES RUBRIQUES LECTURE ET ÉCRITURE ──────────────────────────
   Relevés le 11/08/2026 en lisant les rubriques que je n'avais pas ouvertes.
   La 6e, passée par la fabrique collège, avait perdu des attendus que le CM1
   et le CM2 portent pourtant. */

const FLUENCE_130: QcmItem[] = [
  {
    text: "Quel repère de fluence la classe de 6e vise-t-elle ?",
    correct: "environ 130 mots par minute",
    wrongs: ["60 mots par minute", "90 mots par minute", "200 mots par minute"],
    methode: "Le CM1 vise 110, le CM2 120, la 6e 130.",
  },
  {
    text: "Pourquoi viser un nombre de mots par minute ?",
    correct: "parce qu'une lecture fluide libère la tête pour comprendre",
    wrongs: [
      "parce qu'un bon lecteur se reconnait à sa vitesse",
      "parce que lire vite permet de lire beaucoup plus de livres",
      "parce que la vitesse mesure ce que l'élève a compris",
    ],
    methode: "La vitesse est un moyen ; la compréhension est le but.",
  },
  {
    text: "Comment progresse-t-on en fluence ?",
    correct: "en relisant plusieurs fois le même texte",
    wrongs: [
      "en lisant chaque jour un texte nouveau, jamais le même",
      "en lisant plus fort",
      "en lisant plus lentement",
    ],
    methode: "C'est la relecture qui automatise, pas la nouveauté.",
  },
  {
    text: "Lire vite sans comprendre, c'est…",
    correct: "manquer le but : la vitesse n'est qu'un moyen",
    wrongs: [
      "atteindre le but : lire vite est ce qu'on cherche",
      "impossible : qui lit vite comprend forcément",
      "sans importance : la compréhension viendra plus tard",
    ],
    methode: "Un élève qui lit vite et ne retient rien n'a pas lu.",
  },
  {
    text: "Un groupe syntaxique, c'est…",
    correct: "un groupe de mots qui va ensemble et qu'on lit d'un seul souffle",
    wrongs: [
      "une phrase entière, du premier mot jusqu'au point de la fin",
      "un paragraphe, c'est-à-dire tout ce qui tient entre deux alinéas",
      "une syllabe, le petit morceau qu'on prononce d'une seule voix",
    ],
    methode: "Le BO demande de « prendre en compte les groupes syntaxiques ».",
  },
  {
    text: "La prosodie, c'est…",
    correct: "la mélodie de la voix : rythme, pauses, intonation",
    wrongs: [
      "la vitesse de lecture : le nombre de mots dits par minute",
      "le volume de la voix : assez fort pour le dernier rang",
      "l'articulation : dire chaque son sans en avaler aucun",
    ],
    methode: "C'est ce qui distingue une lecture vivante d'une récitation plate.",
  },
  {
    text: "Où fait-on une pause en lisant à voix haute ?",
    correct: "à la ponctuation et à la fin des groupes de sens",
    wrongs: [
      "à la fin de chaque ligne imprimée sur la page",
      "à intervalles réguliers, pour garder son souffle",
      "avant chaque mot difficile, pour se donner le temps",
    ],
    methode: "La pause au mauvais endroit casse le sens.",
  },
  {
    text: "Une liaison mal faite en lecture à voix haute…",
    correct: "casse le rythme et gêne la compréhension",
    wrongs: [
      "n'a aucune importance : seuls les mots comptent",
      "accélère la lecture en supprimant une pause",
      "rend la phrase plus claire pour celui qui écoute",
    ],
    methode: "Le BO cite les liaisons parmi ce qu'il faut prendre en compte.",
  },
  {
    text: "Le CM1 vise 110 mots par minute, le CM2 120. Et la 6e ?",
    correct: "130",
    wrongs: ["115", "150", "200"],
    methode: "Dix mots de plus par an : la progression est régulière.",
  },
  {
    text: "Lecture silencieuse et lecture à voix haute…",
    correct: "s'entrainent toutes les deux et se nourrissent l'une l'autre",
    wrongs: [
      "s'opposent : l'une va vite, l'autre ralentit la compréhension",
      "sont la même chose : seule la voix les distingue vraiment",
      "se remplacent : quand on lit bien tout haut, le reste suit",
    ],
    methode: "Le BO demande un entrainement quotidien aux deux.",
  },
  {
    text: "Que faire devant un mot long inconnu, en lecture à voix haute ?",
    correct: "le préparer des yeux avant de le dire",
    wrongs: [
      "le lire lettre par lettre, pour ne rien manquer",
      "le remplacer par un mot plus simple qu'on connait",
      "le dire très vite, pour qu'il passe inaperçu",
    ],
    methode: "Une lecture à voix haute se prépare avant que la voix ne commence.",
  },
  {
    text: "Pourquoi un texte préparé se lit-il mieux ?",
    correct: "parce que l'œil a déjà repéré les pièges et la ponctuation",
    wrongs: [
      "parce qu'on l'a appris par cœur et qu'on ne lit plus vraiment",
      "parce qu'on l'a lu tant de fois qu'on va plus vite",
      "parce qu'on sait déjà comment l'histoire se termine",
    ],
    methode: "Préparer, ce n'est pas mémoriser.",
  },
];

const DOCUMENTS: QcmItem[] = [
  {
    text: "Qu'est-ce qu'un document composite ?",
    correct: "un document qui mêle texte, image, tableau ou schéma",
    wrongs: [
      "un document écrit à plusieurs mains, par des auteurs différents",
      "un document qui rassemble plusieurs textes sur un même sujet",
      "un document long, découpé en parties et en sous-parties",
    ],
    methode: "Composite : fait de plusieurs éléments de natures différentes.",
  },
  {
    text: "La source d'un document, c'est…",
    correct: "d'où il vient : auteur, publication, date",
    wrongs: [
      "ce dont il parle : son thème, son titre",
      "à qui il s'adresse : enfants, adultes",
      "ce qu'il contient : texte, images, chiffres",
    ],
    methode: "Le BO demande d'« identifier la nature et la source des documents ».",
  },
  {
    text: "Pourquoi vérifier la source d'un document ?",
    correct: "pour savoir qui parle, et si l'on peut s'y fier",
    wrongs: [
      "pour le ranger au bon endroit dans son dossier",
      "pour citer correctement l'auteur dans son travail",
      "pour vérifier qu'il n'est pas trop ancien à lire",
    ],
    methode: "Une information sans source n'est pas une information.",
  },
  {
    text: "Comparer deux documents sur le même sujet permet…",
    correct: "de voir ce qu'ils partagent et ce sur quoi ils divergent",
    wrongs: [
      "de désigner celui des deux qui dit la vérité sur le sujet",
      "de n'en garder qu'un, le plus complet, et d'écarter l'autre",
      "de vérifier que les deux racontent bien la même chose",
    ],
    methode: "Le BO demande de « repérer ce qui les rapproche et ce qui les différencie ».",
  },
  {
    text: "Deux documents convergents, ce sont…",
    correct: "deux documents qui vont dans le même sens",
    wrongs: [
      "deux documents qui se contredisent",
      "deux documents du même auteur",
      "deux documents de même longueur",
    ],
    methode: "Converger : aller vers le même point.",
  },
  {
    text: "À quoi sert la légende d'une image ?",
    correct: "à dire ce que l'image montre et d'où elle vient",
    wrongs: [
      "à dire ce qu'il faut penser de ce que l'image montre",
      "à donner le titre de l'œuvre et le nom de l'artiste",
      "à remplacer le texte pour ceux qui ne voient pas l'image",
    ],
    methode: "Sans légende, une image peut dire à peu près n'importe quoi.",
  },
  {
    text: "À quoi sert un schéma ?",
    correct: "à montrer d'un coup d'œil une organisation ou un fonctionnement",
    wrongs: [
      "à remplacer le texte, pour qu'on n'ait plus besoin de le lire",
      "à illustrer le document, comme le ferait une photographie",
      "à donner des chiffres exacts, plus précis que dans le texte",
    ],
    methode: "Il dit en une image ce qui prendrait un paragraphe.",
  },
  {
    text: "Prélever une information, c'est…",
    correct: "aller la chercher précisément, en sachant ce qu'on cherche",
    wrongs: [
      "lire tout le document du début à la fin, puis retenir l'essentiel",
      "recopier le passage utile sans le modifier, pour le citer plus tard",
      "résumer le document entier en quelques phrases à soi",
    ],
    methode: "On part de la question, pas du document.",
  },
  {
    text: "Un article de presse et un article d'encyclopédie…",
    correct: "n'ont pas le même but, donc pas le même ton",
    wrongs: [
      "ont le même but, mais l'un est plus long que l'autre",
      "disent la même chose, l'un pour adultes, l'autre pour enfants",
      "se distinguent surtout par la date à laquelle ils ont paru",
    ],
    methode: "L'un informe sur l'actualité, l'autre fait le point sur un savoir.",
  },
  {
    text: "Que faire quand deux documents se contredisent ?",
    correct: "regarder leurs sources et leurs dates avant de trancher",
    wrongs: [
      "choisir celui qui donne le plus de détails et de chiffres",
      "garder les deux et les présenter comme également vrais",
      "choisir celui qui confirme ce qu'on pensait déjà savoir",
    ],
    methode: "La contradiction est une information, pas un obstacle.",
  },
  {
    text: "Un tableau de chiffres se lit…",
    correct: "en repérant d'abord ce que disent ses lignes et ses colonnes",
    wrongs: [
      "de gauche à droite et ligne après ligne, comme on lit un texte",
      "en commençant par la case du bas, la plus récente des deux",
      "en cherchant le plus grand nombre, qui donne la réponse",
    ],
    methode: "Sans les entêtes, un nombre ne veut rien dire.",
  },
  {
    text: "Croiser deux documents, c'est…",
    correct: "combiner leurs informations pour répondre à une question qu'aucun ne résout seul",
    wrongs: [
      "les lire l'un après l'autre, puis retenir celui qui semble le plus clair",
      "comparer leur longueur et garder celui qui donne le plus de détails",
      "vérifier qu'ils disent la même chose, et écarter celui qui dépasse",
    ],
    methode: "Le BO parle d'informations « combinées pour donner un sens global ».",
  },
];

const IMAGE: QcmItem[] = [
  {
    text: "Qu'est-ce qu'une image fixe ?",
    correct: "une image qui ne bouge pas : photo, tableau, dessin, affiche",
    wrongs: [
      "une image qui défile : film, dessin animé, publicité télévisée",
      "une image sans personne dedans : un paysage, un objet posé",
      "une image imprimée, par opposition à celle d'un écran",
    ],
    methode: "Fixe s'oppose à animée.",
  },
  {
    text: "Le premier plan d'une image, c'est…",
    correct: "ce qui est le plus près de celui qui regarde",
    wrongs: [
      "ce qui se trouve le plus loin, tout au fond de l'image",
      "ce qui occupe le centre exact, à égale distance des bords",
      "ce qu'on remarque en premier, où que ce soit dans l'image",
    ],
    methode: "Du plus près au plus loin : premier plan, second plan, arrière-plan.",
  },
  {
    text: "Le cadrage d'une photographie, c'est…",
    correct: "le choix de ce qu'on montre et de ce qu'on laisse dehors",
    wrongs: [
      "le format du tirage : carré, rectangulaire, en hauteur ou en largeur",
      "la distance à laquelle on se place du sujet photographié",
      "l'endroit d'où l'on prend la photo : en haut, en bas, de côté",
    ],
    methode: "Ce qui est hors du cadre a été écarté par quelqu'un.",
  },
  {
    text: "Pourquoi dit-on qu'une image est un choix ?",
    correct: "parce que quelqu'un a décidé de ce qu'on voit et de ce qu'on ne voit pas",
    wrongs: [
      "parce que celui qui la regarde y voit ce qu'il a envie d'y voir",
      "parce qu'on peut la recadrer ou la retoucher après l'avoir prise",
      "parce que sa légende oriente déjà la façon de la comprendre",
    ],
    methode: "Une image n'est jamais neutre : c'est le premier réflexe à prendre.",
  },
  {
    text: "Que regarde-t-on en premier dans une image ?",
    correct: "ce qui attire l'œil : la lumière, une couleur vive, un personnage au centre",
    wrongs: [
      "le coin en bas à droite, là où le regard finit toujours sa course",
      "la légende, qui dit d'avance ce qu'il faut voir dans l'image",
      "le bord du cadre, puis on remonte lentement vers le milieu",
    ],
    methode: "Le regard est guidé : reste à comprendre par quoi.",
  },
  {
    text: "Une affiche cherche surtout à…",
    correct: "faire agir : acheter, venir, se souvenir",
    wrongs: [
      "raconter une longue histoire",
      "expliquer une règle",
      "décrire un paysage",
    ],
    methode: "Son but explique ses choix de couleurs et de mots.",
  },
  {
    text: "Une prise de vue en plongée, vue d'en haut, donne souvent…",
    correct: "l'impression que le sujet est petit ou dominé",
    wrongs: [
      "l'impression que le sujet est grand ou puissant",
      "l'impression que la scène se passe très loin",
      "l'impression que le sujet est en mouvement",
    ],
    methode: "L'angle raconte, autant que ce qui est photographié.",
  },
  {
    text: "Interpréter une image, c'est…",
    correct: "dire ce qu'elle montre, puis ce qu'elle suggère, en s'appuyant sur ce qu'on voit",
    wrongs: [
      "inventer librement l'histoire qu'elle aurait pu raconter avant",
      "la décrire élément par élément, puis s'arrêter là sans conclure",
      "chercher qui l'a prise, quand, et avec quel appareil photo",
    ],
    methode: "Décrire d'abord, interpréter ensuite — jamais l'inverse.",
  },
  {
    text: "Une illustration dans un roman sert à…",
    correct: "prolonger ou éclairer le texte, pas à le remplacer",
    wrongs: [
      "montrer ce que le texte décrit, pour éviter d'avoir à l'imaginer",
      "aérer la page et reposer le lecteur entre deux chapitres",
      "résumer le passage en une image, pour ceux qui lisent vite",
    ],
    methode: "Elle dialogue avec le texte.",
  },
  {
    text: "Que dit la lumière dans une image ?",
    correct: "elle oriente le regard et donne une atmosphère",
    wrongs: [
      "elle indique l'heure et la saison de la prise de vue",
      "elle sert à rendre l'image nette et bien lisible",
      "elle montre d'où le photographe se tenait pour la prendre",
    ],
    methode: "Sombre ou éclatante, elle installe un climat avant tout mot.",
  },
  {
    text: "Deux personnes peuvent-elles interpréter la même image autrement ?",
    correct: "Oui, si chacune s'appuie sur ce qu'elle voit",
    wrongs: [
      "Non : une image ne dit qu'une seule chose",
      "Oui, mais l'une des deux se trompe forcément",
      "Oui, parce que chacun est libre d'imaginer",
    ],
    methode: "Interpréter n'est pas inventer : il faut pouvoir montrer du doigt.",
  },
  {
    text: "Avant d'interpréter une image, il faut d'abord…",
    correct: "la décrire : qui, quoi, où, et comment c'est cadré",
    wrongs: [
      "chercher qui l'a faite, quand, et dans quel but",
      "se demander ce qu'elle veut nous faire penser",
      "la comparer à d'autres images du même sujet",
    ],
    methode: "On ne peut pas interpréter ce qu'on n'a pas regardé.",
  },
];

const ECRIRE_MAIN: QcmItem[] = [
  {
    text: "Que demande le programme quand on copie un texte ?",
    correct: "une copie lisible, régulière, soignée et sans erreur",
    wrongs: [
      "une copie rapide avant tout, la propreté venant ensuite",
      "une copie faite entièrement de mémoire, sans le modèle",
      "une copie en majuscules, plus lisible qu'en cursive",
    ],
    methode: "Quatre exigences, et la vitesse n'en fait pas partie.",
  },
  {
    text: "Copier vite, ce n'est pas écrire vite. C'est…",
    correct: "lever les yeux moins souvent",
    wrongs: [
      "appuyer plus fort",
      "écrire plus petit",
      "sauter les mots inutiles",
    ],
    methode: "Le temps se perd dans les allers-retours, pas dans la main.",
  },
  {
    text: "Quelle est la meilleure méthode de copie ?",
    correct: "lire un groupe de mots, le garder en tête, l'écrire sans regarder, vérifier",
    wrongs: [
      "lire une lettre, l'écrire, en lire une autre, et ainsi jusqu'au bout",
      "lire toute la phrase, l'écrire d'un trait, puis passer à la suivante",
      "regarder le modèle à chaque mot écrit, pour ne jamais se tromper",
    ],
    methode: "C'est la taille du morceau gardé en tête qui fait la différence.",
  },
  {
    text: "Pourquoi la copie reste-t-elle importante au cycle 3 ?",
    correct: "parce qu'elle entraine le geste et fixe l'orthographe des mots",
    wrongs: [
      "parce qu'elle oblige à relire le texte plusieurs fois de suite",
      "parce qu'elle laisse une trace propre dans le cahier de l'élève",
      "parce qu'elle apprend à écrire vite, ce qui servira au collège",
    ],
    methode: "Le BO dit que « la maîtrise de l'écriture cursive reste importante ».",
  },
  {
    text: "Quelle est l'erreur de copie la plus fréquente ?",
    correct: "un mot sauté ou doublé au moment où l'on relève les yeux",
    wrongs: [
      "une faute d'accord, parce qu'on copie sans penser au sens",
      "une majuscule oubliée en début de phrase, faute d'y regarder",
      "une lettre mal formée, quand la main va plus vite que l'œil",
    ],
    methode: "C'est une erreur de repérage, pas d'inattention.",
  },
  {
    text: "Comment éviter de sauter un mot en copiant ?",
    correct: "retenir le dernier mot écrit avant de revenir au modèle",
    wrongs: [
      "copier plus lentement, une lettre après l'autre, sans se presser",
      "suivre le modèle avec le doigt pendant qu'on écrit de l'autre main",
      "copier la phrase entière de mémoire, sans revenir au modèle",
    ],
    methode: "Le repère se prend sur SA feuille, avant de lever les yeux.",
  },
  {
    text: "La mise en forme d'un texte produit, c'est…",
    correct: "les marges, les alinéas, les titres, la lisibilité",
    wrongs: [
      "l'orthographe, les accords, la ponctuation",
      "le plan, l'ordre des idées, les connecteurs",
      "la longueur, le nombre de mots, celui des lignes",
    ],
    methode: "Le BO demande de « veiller à la lisibilité et à la mise en forme ».",
  },
  {
    text: "Sur quelle feuille se relit-on ?",
    correct: "sur la sienne, jamais sur le modèle",
    wrongs: ["sur le modèle", "sur les deux à la fois", "sur celle du voisin"],
    methode: "L'œil qui relit le modèle relit un texte juste, et ne voit rien.",
  },
  {
    text: "L'écriture cursive au collège…",
    correct: "reste importante, même si l'on écrit aussi au clavier",
    wrongs: [
      "cède la place au clavier, plus rapide et plus lisible",
      "ne sert plus qu'à signer et à remplir des formulaires",
      "remplace le clavier, qu'on réserve aux travaux longs",
    ],
    methode: "Le BO le dit : « la maîtrise du geste cursif reste importante ».",
  },
  {
    text: "Un texte bien présenté…",
    correct: "se lit plus vite et se comprend mieux",
    wrongs: [
      "est plus long",
      "vaut automatiquement une meilleure note",
      "n'a pas d'importance",
    ],
    methode: "La présentation est au service du lecteur.",
  },
  {
    text: "Que vérifie-t-on en relisant une copie ?",
    correct: "les mots oubliés ou doublés, puis les accents, puis la ponctuation",
    wrongs: [
      "les accords, puis les temps des verbes, puis le sens des phrases",
      "les majuscules et les points, puisque le reste est déjà copié",
      "la longueur : on compte les lignes du modèle et celles de la copie",
    ],
    methode: "Une chose à la fois, dans cet ordre.",
  },
  {
    text: "Écrire à la main « de manière fluide », cela veut dire…",
    correct: "sans y penser, pour garder sa tête libre pour ce qu'on écrit",
    wrongs: [
      "le plus vite possible, pour finir avant les autres élèves",
      "sans jamais lever le stylo, en attachant toutes les lettres",
      "avec une écriture régulière et penchée, toujours de la même taille",
    ],
    methode: "Un geste automatisé libère l'attention pour le contenu.",
  },
];

/* ── TROIS POOLS AJOUTÉS LE 22/08/2026, EN RELISANT LE BO DU CYCLE 3 ─────────
   Mesuré, pas supposé : on a tiré une question sur chaque micro de 6e et
   comparé ce qui était SERVI à ce qui était ATTENDU. Trois intitulés recevaient
   des questions justes, sur un autre sujet — la panne qui ne tombe jamais en
   panne :
     · « Retrouver de qui parle un pronom »  → « à quoi sert la flèche d'un
       panneau ? » (pool DOCUMENT) ;
     · « Reconnaître ce qu'exprime un mot de liaison » → « à quoi sert la
       légende d'un plan ? » (pool DOCUMENT) ;
     · toute la notion « Lire à voix haute et mettre en voix » → des questions
       de compréhension (pool LECTURE), faute du moindre pool de mise en voix.

   ⭐ LES DEUX PREMIERS PORTENT LA CHAÎNE ANAPHORIQUE. Le BO l'écrit en toutes
   lettres en 6e — « Repérer les informations explicites et implicites, LES
   LIENS LOGIQUES, LES REPRISES NOMINALES » — et c'est le point le plus bas des
   résultats d'évaluation nationale. Le coach ne posait pas une seule question
   dessus.

   ⚠️ Aiguillés par MICRO (`questionParMicro`), pas par notion : ces micros
   vivent dans des notions de compréhension et de lecture qui les avaleraient. */

const REPRISES: QcmItem[] = [
  {
    text: "« Léa observait le margouillat. Il ne bougeait plus. » Que reprend « Il » ?",
    correct: "le margouillat",
    wrongs: ["Léa", "un autre animal, non nommé", "celui qui raconte l'histoire"],
    methode: "Un pronom reprend un groupe déjà écrit : on remonte le texte jusqu'à lui.",
  },
  {
    text: "« Ulysse affronta le cyclope. Le monstre hurla. » Que désigne « Le monstre » ?",
    correct: "le cyclope",
    wrongs: ["Ulysse", "un troisième personnage", "l'équipage du navire"],
    methode: "Une reprise nominale nomme autrement ce dont on vient de parler.",
  },
  {
    text: "« Les élèves rangèrent leurs cahiers. Ils sortirent en silence. » Qui sort ?",
    correct: "les élèves",
    wrongs: ["les cahiers", "les professeurs", "on ne peut pas le savoir"],
    methode: "Le pronom s'accorde avec ce qu'il reprend : « Ils », pluriel, reprend « les élèves ».",
  },
  {
    text: "Dans un texte, l'ANTÉCÉDENT d'un pronom, c'est…",
    correct: "le groupe qu'il reprend, et qui vient avant lui",
    wrongs: [
      "le mot qui le suit immédiatement",
      "le premier mot du paragraphe",
      "le sujet de la première phrase du texte",
    ],
    methode: "« Anté- » veut dire avant : l'antécédent est déjà passé quand le pronom arrive.",
  },
  {
    text: "« Marie tendit le livre à Paul. Il la remercia. » Que reprend « la » ?",
    correct: "Marie",
    wrongs: ["le livre", "Paul", "une personne dont on n'a pas parlé"],
    methode: "« Il » a déjà pris Paul ; il ne reste que Marie, et le féminin le confirme.",
  },
  {
    text: "« Le vieux chêne dominait la cour. L'arbre avait plus de cent ans. » « L'arbre » désigne…",
    correct: "le vieux chêne",
    wrongs: ["la cour", "un arbre voisin", "le narrateur"],
    methode: "Un mot plus général (arbre) peut reprendre un mot précis (chêne) : c'est encore une reprise.",
  },
  {
    text: "Pourquoi un texte remplace-t-il « le pêcheur » par « il » ou « cet homme » ?",
    correct: "pour éviter de répéter toujours le même mot",
    wrongs: [
      "pour raccourcir le texte au maximum",
      "pour parler d'une autre personne",
      "parce que la grammaire l'interdit après deux phrases",
    ],
    methode: "Les reprises tissent le texte : elles évitent la répétition sans changer de sujet.",
  },
  {
    text: "« Sami a prêté sa raquette à Nina. Elle la lui a rendue. » Qui rend quoi ?",
    correct: "Nina rend la raquette à Sami",
    wrongs: [
      "Sami rend la raquette à Nina",
      "Nina rend Sami à la raquette",
      "on ne peut pas le savoir",
    ],
    methode: "Trois pronoms d'affilée se démêlent un par un : « Elle » = Nina, « la » = la raquette, « lui » = Sami.",
  },
  {
    text: "« La tempête approchait. Elle inquiétait les marins. » Que reprend « Elle » ?",
    correct: "la tempête",
    wrongs: ["les marins", "la mer", "le bateau"],
    methode: "Un pronom peut reprendre une chose, pas seulement une personne.",
  },
  {
    text: "« Le train entra en gare. Le convoi s'arrêta. » Ces deux phrases parlent…",
    correct: "du même train",
    wrongs: ["de deux trains différents", "d'un train et d'un car", "de la gare seulement"],
    methode: "« Le convoi » est un synonyme employé en reprise : c'est toujours le même objet.",
  },
  {
    text: "« Paul appela Théo. Il ne répondit pas. » Pourquoi cette phrase est-elle ambiguë ?",
    correct: "« Il » peut reprendre Paul comme Théo",
    wrongs: [
      "il manque un verbe",
      "« Il » ne reprend personne",
      "les deux noms sont au pluriel",
    ],
    methode: "Deux antécédents possibles du même genre : le texte doit alors nommer, pas pronominaliser.",
  },
  {
    text: "« Nous avons visité le volcan. Cette excursion nous a épuisés. » « Cette excursion » reprend…",
    correct: "la visite du volcan",
    wrongs: ["le volcan seul", "la fatigue", "les visiteurs"],
    methode: "Une reprise peut résumer toute une action, pas seulement un nom.",
  },
  {
    text: "Dans « Elle la regarda », combien y a-t-il de personnes dont on parle ?",
    correct: "deux",
    wrongs: ["une", "trois", "aucune"],
    methode: "« Elle » désigne l'une, « la » désigne l'autre : deux antécédents différents.",
  },
  {
    text: "Pour vérifier qu'un pronom est bien compris, le plus sûr est de…",
    correct: "le remplacer par le groupe qu'il reprend et relire",
    wrongs: [
      "le supprimer et voir si la phrase tient",
      "chercher le mot le plus proche avant lui",
      "regarder s'il est en début de phrase",
    ],
    methode: "Le mot le plus proche n'est pas toujours le bon : seule la substitution le prouve.",
  },
];

const LIENS_LOGIQUES: QcmItem[] = [
  {
    text: "« Il pleuvait, DONC le match fut annulé. » Que marque « donc » ?",
    correct: "une conséquence",
    wrongs: ["une cause", "une opposition", "une comparaison"],
    methode: "« donc » introduit ce qui résulte de ce qui précède.",
  },
  {
    text: "« Le match fut annulé CAR il pleuvait. » Que marque « car » ?",
    correct: "une cause",
    wrongs: ["une conséquence", "un but", "une condition"],
    methode: "« car » donne la raison : c'est l'inverse de « donc ».",
  },
  {
    text: "« Il avait beaucoup travaillé, POURTANT il rata l'épreuve. » Que marque « pourtant » ?",
    correct: "une opposition",
    wrongs: ["une cause", "une addition", "une succession"],
    methode: "« pourtant » signale que la suite contredit ce à quoi on s'attendait.",
  },
  {
    text: "Quel mot de liaison exprime le BUT ?",
    correct: "afin que",
    wrongs: ["parce que", "cependant", "ensuite"],
    methode: "« afin que », « pour que » disent l'intention ; « parce que » dit la cause.",
  },
  {
    text: "« D'abord… ENSUITE… ENFIN… » Ces mots organisent…",
    correct: "l'ordre des étapes",
    wrongs: ["les causes d'un fait", "les oppositions d'un débat", "les lieux d'un récit"],
    methode: "Ce sont des connecteurs de succession : ils rangent les étapes dans le temps.",
  },
  {
    text: "« Il fait froid, MAIS je sors quand même. » Que marque « mais » ?",
    correct: "une opposition",
    wrongs: ["une cause", "une conséquence", "un ajout"],
    methode: "« mais » oppose deux idées : la seconde résiste à la première.",
  },
  {
    text: "« SI tu viens, nous partirons ensemble. » Que marque « si » ?",
    correct: "une condition",
    wrongs: ["une cause", "un but", "une opposition"],
    methode: "« si » pose ce qui doit arriver pour que la suite ait lieu.",
  },
  {
    text: "Dans « Le vent se leva ; PAR CONSÉQUENT la mer devint mauvaise », on pourrait remplacer « par conséquent » par…",
    correct: "donc",
    wrongs: ["car", "pourtant", "afin que"],
    methode: "Deux connecteurs sont équivalents quand ils marquent le même rapport : ici, la conséquence.",
  },
  {
    text: "« Elle est fatiguée. EN EFFET, elle a couru dix kilomètres. » « En effet » sert à…",
    correct: "expliquer ce qui vient d'être dit",
    wrongs: [
      "contredire ce qui vient d'être dit",
      "annoncer la suite de l'histoire",
      "conclure le texte",
    ],
    methode: "« en effet » apporte la raison de l'affirmation précédente.",
  },
  {
    text: "Quel connecteur ne marque PAS le temps ?",
    correct: "cependant",
    wrongs: ["puis", "alors", "enfin"],
    methode: "« cependant » oppose ; les trois autres situent des moments l'un par rapport à l'autre.",
  },
  {
    text: "« Il n'a pas révisé. C'est POURQUOI il a échoué. » La deuxième phrase donne…",
    correct: "la conséquence de la première",
    wrongs: ["la cause de la première", "un exemple", "une opposition"],
    methode: "« c'est pourquoi » tire la conclusion de ce qui précède.",
  },
  {
    text: "Dans un texte qui explique, à quoi servent les mots de liaison ?",
    correct: "à montrer comment les idées se tiennent entre elles",
    wrongs: [
      "à rendre le texte plus long",
      "à séparer les paragraphes",
      "à remplacer la ponctuation",
    ],
    methode: "Ils disent le RAPPORT entre deux idées : cause, conséquence, opposition, temps.",
  },
  {
    text: "« Bien qu'il fût blessé, il termina la course. » Que marque « bien que » ?",
    correct: "une opposition",
    wrongs: ["une cause", "une condition", "une conséquence"],
    methode: "« bien que » accorde un obstacle, et dit que la suite a eu lieu malgré lui.",
  },
  {
    text: "Remplace le lien qui convient : « Prends ton parapluie ___ il pleut. »",
    correct: "parce qu'",
    wrongs: ["pourtant", "afin qu'", "ensuite"],
    methode: "La pluie est la RAISON du parapluie : c'est un lien de cause.",
  },
];

const MISE_EN_VOIX: QcmItem[] = [
  {
    text: "Avant de lire un texte long devant la classe, la meilleure préparation est de…",
    correct: "le lire d'abord en silence pour repérer les mots difficiles",
    wrongs: [
      "le lire une seule fois, très vite",
      "n'apprendre que le titre et la fin",
      "le découvrir directement devant le public",
    ],
    methode: "Le BO demande une lecture « travaillée en amont » : on anticipe ce qui fera buter.",
  },
  {
    text: "Le programme de 6e demande de lire à voix haute…",
    correct: "en regardant l'auditoire",
    wrongs: [
      "le plus vite possible",
      "en gardant les yeux sur la feuille",
      "en apprenant le texte par cœur",
    ],
    methode: "« Lire un texte de 10 à 20 lignes EN REGARDANT L'AUDITOIRE » : le regard fait partie de la lecture.",
  },
  {
    text: "« — Attends-moi ! » cria Léa. Quel ton faut-il prendre ?",
    correct: "une voix plus forte, comme un appel",
    wrongs: ["une voix chuchotée", "une voix moqueuse", "une voix monotone"],
    methode: "Le point d'exclamation et le verbe « cria » commandent le volume.",
  },
  {
    text: "« Il rangea ses affaires sans un mot et referma doucement la porte. » Quel ton convient ?",
    correct: "retenu et grave",
    wrongs: ["enjoué et rapide", "moqueur", "furieux et fort"],
    methode: "« sans un mot », « doucement » : la voix doit faire entendre ce que le texte retient.",
  },
  {
    text: "Dans un dialogue de récit, comment fait-on entendre le changement de personnage ?",
    correct: "on change de voix à chaque tiret",
    wrongs: [
      "on lit tout de la même façon",
      "on lit de plus en plus fort",
      "on saute les passages entre guillemets",
    ],
    methode: "Le tiret annonce un nouveau locuteur : la voix le rend audible.",
  },
  {
    text: "À quoi sert une PAUSE dans une lecture à voix haute ?",
    correct: "à marquer la ponctuation et à laisser comprendre",
    wrongs: [
      "à reprendre son souffle uniquement",
      "à vérifier la suite du texte",
      "à ralentir toute la lecture",
    ],
    methode: "La pause est une ponctuation entendue : elle sépare les groupes de sens.",
  },
  {
    text: "Une lecture MONOTONE, c'est une lecture…",
    correct: "sans variation de ton ni de rythme",
    wrongs: ["trop rapide", "trop faible", "pleine d'hésitations"],
    methode: "Monotone : « un seul ton ». C'est ce que la mise en voix cherche à éviter.",
  },
  {
    text: "Que faire si tu oublies un passage en récitant de mémoire ?",
    correct: "faire une courte pause et reprendre",
    wrongs: [
      "t'arrêter et abandonner",
      "accélérer pour cacher l'oubli",
      "recommencer le texte au début",
    ],
    methode: "Une courte pause passe inaperçue ; l'accélération, non.",
  },
  {
    text: "Pour réciter un poème, il vaut mieux…",
    correct: "respecter le rythme des vers et articuler",
    wrongs: [
      "réciter le plus vite possible",
      "sauter les vers difficiles",
      "parler tout bas, sans expression",
    ],
    methode: "Le vers a une longueur : la respecter, c'est faire entendre le poème.",
  },
  {
    text: "Dans « Le vent — un vent glacé — se leva », que t'indiquent les tirets ?",
    correct: "il faut détacher le groupe par deux pauses",
    wrongs: [
      "il faut supprimer le groupe",
      "il faut monter la voix jusqu'à la fin",
      "il faut lire plus vite",
    ],
    methode: "Les tirets encadrent une incise : on l'isole à la voix, comme entre deux parenthèses.",
  },
  {
    text: "Que fait la voix à la fin d'une phrase interrogative ?",
    correct: "elle monte",
    wrongs: ["elle descend", "elle reste plate", "elle s'arrête net"],
    methode: "L'intonation montante signale la question, même sans mot interrogatif.",
  },
  {
    text: "Rendre les INTENTIONS de l'auteur à la lecture, c'est faire entendre…",
    correct: "l'ironie, l'émotion ou l'urgence du passage",
    wrongs: [
      "le nombre de personnages",
      "la date d'écriture du texte",
      "la longueur des phrases",
    ],
    methode: "Le BO demande de « rendre compte des émotions des personnages et des intentions de l'auteur ».",
  },
  {
    text: "Tu lis trop vite et le public décroche. Que corriges-tu en premier ?",
    correct: "le débit et les pauses",
    wrongs: ["le volume", "le choix du texte", "ta position dans la salle"],
    methode: "Un texte lu trop vite ne se comprend pas, même bien articulé : le débit passe avant tout.",
  },
  {
    text: "Pour préparer une mise en voix à plusieurs, on commence par…",
    correct: "se répartir les passages et les repérer sur le texte",
    wrongs: [
      "apprendre tout le texte chacun de son côté",
      "lire tous ensemble en même temps",
      "choisir un décor",
    ],
    methode: "La mise en voix se prépare sur le texte : qui lit quoi, et où l'on passe le relais.",
  },
];

/* ── CINQ POOLS DE PLUS, POUR LA RELECTURE DU CM2 (22/08/2026) ───────────────
   Le CM2 relu sur le BO ouvre des objectifs que le programme nomme et que le
   coach ne savait pas servir autrement que par un pool générique :

     · « Différencier épithète et ATTRIBUT DU SUJET » — le CM2 oppose l'épithète
       à l'attribut, la 6e l'oppose au complément du nom. Deux oppositions, deux
       années : le pool COMPLEMENT_NOM ne couvre que la seconde.
     · « Utiliser des dictionnaires » — chercher un mot n'est pas le deviner :
       servi depuis VOC_CONTEXTE, l'intitulé promettait une chose et en donnait
       une autre.
     · « Écrire pour résumer », « Appliquer les principes de la cohérence
       textuelle », « Utiliser le brouillon » et « Faire preuve d'autonomie dans
       le respect des codes de l'écrit » — dix-sept micros d'écriture, en 6e et
       au CM2, tiraient toutes dans le même pool ECRITURE. */

const EPITHETE_ATTRIBUT: QcmItem[] = [
  {
    text: "Dans « une plage déserte », l'adjectif « déserte » est…",
    correct: "épithète",
    wrongs: ["attribut du sujet", "complément du nom", "sujet"],
    methode: "L'adjectif est collé au nom, dans le groupe nominal : il est épithète.",
  },
  {
    text: "Dans « la plage est déserte », l'adjectif « déserte » est…",
    correct: "attribut du sujet",
    wrongs: ["épithète", "complément d'objet", "complément du nom"],
    methode: "Le verbe « est » sépare l'adjectif du nom : l'adjectif devient attribut du sujet.",
  },
  {
    text: "Qu'est-ce qui distingue à coup sûr l'épithète de l'attribut ?",
    correct: "l'attribut est relié au nom par un verbe d'état",
    wrongs: [
      "l'attribut est toujours placé après le nom",
      "l'épithète est toujours au masculin",
      "l'épithète est toujours un seul mot",
    ],
    methode: "C'est le VERBE qui décide : sans verbe d'état entre les deux, l'adjectif est épithète.",
  },
  {
    text: "« Le ciel devient sombre. » L'adjectif « sombre » est…",
    correct: "attribut du sujet",
    wrongs: ["épithète", "complément circonstanciel", "complément d'objet direct"],
    methode: "« devenir » est un verbe d'état, comme être, sembler, paraitre, rester.",
  },
  {
    text: "« Les enfants heureux courent. » L'adjectif « heureux » est…",
    correct: "épithète",
    wrongs: ["attribut du sujet", "complément d'objet", "adverbe"],
    methode: "« courir » n'est pas un verbe d'état : l'adjectif reste dans le groupe nominal.",
  },
  {
    text: "Dans laquelle de ces phrases l'adjectif est ATTRIBUT ?",
    correct: "La mer semble calme.",
    wrongs: ["La mer calme s'étend.", "Une mer calme, enfin.", "Sur la mer calme, un voilier."],
    methode: "Seule la première place un verbe d'état entre le nom et l'adjectif.",
  },
  {
    text: "Un adjectif épithète peut-il être supprimé sans casser la phrase ?",
    correct: "oui, la phrase reste correcte",
    wrongs: [
      "non, jamais",
      "seulement s'il est au pluriel",
      "seulement s'il est placé avant le nom",
    ],
    methode: "« une plage déserte » → « une plage » tient debout. « la plage est » ne tient pas.",
  },
  {
    text: "« Ce gâteau paraît délicieux. » Quelle est la fonction de « délicieux » ?",
    correct: "attribut du sujet",
    wrongs: ["épithète", "complément du nom", "sujet"],
    methode: "« paraitre » est un verbe d'état : ce qui suit dit ce QU'EST le sujet.",
  },
  {
    text: "Avec quel mot l'épithète s'accorde-t-elle ?",
    correct: "avec le nom qu'elle complète",
    wrongs: ["avec le verbe", "avec le sujet de la phrase", "elle ne s'accorde pas"],
    methode: "L'épithète est dans le groupe nominal : elle suit le genre et le nombre de son nom.",
  },
  {
    text: "Avec quel mot l'attribut du sujet s'accorde-t-il ?",
    correct: "avec le sujet",
    wrongs: ["avec le verbe", "avec le complément", "avec le déterminant"],
    methode: "« Les plages sont désertes » : l'attribut prend le genre et le nombre du sujet.",
  },
  {
    text: "« Elle rentre fatiguée. » L'adjectif « fatiguée » est…",
    correct: "attribut du sujet",
    wrongs: ["épithète", "complément d'objet direct", "adverbe"],
    methode: "Certains verbes d'action introduisent aussi un attribut : il dit l'état du sujet.",
  },
  {
    text: "Combien d'adjectifs ÉPITHÈTES dans « Le vieux pêcheur ramène un filet lourd » ?",
    correct: "deux",
    wrongs: ["un", "trois", "aucun"],
    methode: "« vieux » complète « pêcheur », « lourd » complète « filet » : deux épithètes.",
  },
];

const DICTIONNAIRE: QcmItem[] = [
  {
    text: "Pour trouver « volcan » dans un dictionnaire, on cherche à la lettre…",
    correct: "V",
    wrongs: ["O", "L", "C"],
    methode: "L'ordre alphabétique se lit sur la PREMIÈRE lettre du mot.",
  },
  {
    text: "Entre « marée » et « marin », lequel vient en premier dans le dictionnaire ?",
    correct: "marée",
    wrongs: ["marin", "les deux à la même page", "celui qui est le plus court"],
    methode: "On compare lettre à lettre : mar-é vient avant mar-i, car « e » précède « i ».",
  },
  {
    text: "À quoi servent les deux mots écrits en haut d'une page de dictionnaire ?",
    correct: "à indiquer le premier et le dernier mot de la page",
    wrongs: [
      "à donner les mots les plus difficiles",
      "à signaler les mots nouveaux",
      "à donner le titre du chapitre",
    ],
    methode: "Ce sont les mots-repères : ils évitent de lire toute la page.",
  },
  {
    text: "Dans un article de dictionnaire, l'abréviation « n. m. » signifie…",
    correct: "nom masculin",
    wrongs: ["nom multiple", "nouveau mot", "négationma­jeure"],
    methode: "L'article donne d'abord la classe grammaticale du mot.",
  },
  {
    text: "Pour chercher le verbe « courais », on cherche…",
    correct: "courir",
    wrongs: ["courais", "cour", "couru"],
    methode: "Un verbe se cherche à l'infinitif ; un nom, au singulier.",
  },
  {
    text: "Un article donne trois définitions numérotées. Cela signifie que le mot…",
    correct: "a plusieurs sens",
    wrongs: [
      "s'écrit de trois façons",
      "existe en trois langues",
      "a trois synonymes",
    ],
    methode: "Les numéros séparent les sens d'un mot polysémique.",
  },
  {
    text: "Pour chercher « chevaux », on cherche…",
    correct: "cheval",
    wrongs: ["chevaux", "chevau", "cheva"],
    methode: "Le dictionnaire donne les noms au singulier : on ramène le mot à sa forme de base.",
  },
  {
    text: "Que trouve-t-on dans un article, en plus de la définition ?",
    correct: "un exemple d'emploi du mot",
    wrongs: ["la biographie de l'auteur", "l'âge du mot en années", "un dessin obligatoire"],
    methode: "L'exemple montre le mot dans une phrase : c'est souvent lui qui éclaire le sens.",
  },
  {
    text: "Le dictionnaire indique « fam. » devant un sens. Cela veut dire…",
    correct: "que ce sens appartient au langage familier",
    wrongs: ["que le mot vient d'une famille de mots", "que le mot est ancien", "que le mot est rare"],
    methode: "Les abréviations de registre préviennent : « fam. » ne s'écrit pas dans un devoir.",
  },
  {
    text: "Quand faut-il ouvrir le dictionnaire pendant une lecture ?",
    correct: "quand le contexte n'a pas suffi à deviner le mot",
    wrongs: [
      "à chaque mot inconnu, sans réfléchir",
      "seulement après avoir fini le texte",
      "jamais pendant une lecture",
    ],
    methode: "Le BO le dit : l'usage du dictionnaire n'est pas systématique, il vérifie une hypothèse.",
  },
  {
    text: "Entre « pêche » (le fruit) et « pêche » (l'activité), le dictionnaire…",
    correct: "fait deux entrées séparées",
    wrongs: [
      "n'en garde qu'une",
      "les met dans la même définition",
      "renvoie à un autre dictionnaire",
    ],
    methode: "Deux mots homonymes ont deux origines : le dictionnaire leur donne deux entrées.",
  },
  {
    text: "Où cherche-t-on l'orthographe exacte d'un mot dont on n'est pas sûr ?",
    correct: "dans le dictionnaire, à l'ordre alphabétique",
    wrongs: [
      "dans un livre de conjugaison",
      "dans la table des matières",
      "on ne peut pas le chercher",
    ],
    methode: "On teste l'orthographe la plus probable : si le mot n'y est pas, c'est qu'elle est fausse.",
  },
];

const ECRIT_RESUMER: QcmItem[] = [
  {
    text: "Un bon résumé de récit garde…",
    correct: "les personnages, l'action et la fin",
    wrongs: ["tous les dialogues", "l'avis du lecteur", "la biographie de l'auteur"],
    methode: "Résumer, c'est garder la trame et laisser tomber les détails.",
  },
  {
    text: "Dans un résumé, on écrit…",
    correct: "avec ses propres mots",
    wrongs: [
      "en recopiant les phrases du texte",
      "en ajoutant son opinion",
      "en inventant une autre fin",
    ],
    methode: "Recopier ne prouve pas qu'on a compris : reformuler, oui.",
  },
  {
    text: "Pour résumer une page, par quoi commence-t-on ?",
    correct: "par repérer l'idée principale de chaque paragraphe",
    wrongs: [
      "par recopier la première phrase",
      "par compter les lignes",
      "par la conclusion de l'auteur",
    ],
    methode: "Le résumé se construit sur les idées, pas sur l'ordre d'apparition des phrases.",
  },
  {
    text: "Hiérarchiser ses idées avant d'écrire, c'est…",
    correct: "les classer de la plus importante à la moins importante",
    wrongs: ["les écrire dans l'ordre où elles viennent", "les compter", "les souligner"],
    methode: "Hiérarchiser, c'est décider ce qui vient d'abord parce que c'est le plus important.",
  },
  {
    text: "Qu'est-ce qu'on SUPPRIME en priorité dans un résumé ?",
    correct: "les détails qui ne changent pas l'histoire",
    wrongs: ["le nom du héros", "la fin", "le problème du récit"],
    methode: "Test : si l'histoire tient sans ce détail, il sort du résumé.",
  },
  {
    text: "À quel temps écrit-on le plus souvent un résumé ?",
    correct: "au présent",
    wrongs: ["au passé simple", "au futur", "au conditionnel"],
    methode: "Le présent de narration rend le résumé plus court et plus lisible.",
  },
  {
    text: "Écrire pour comparer deux documents, c'est écrire…",
    correct: "ce qu'ils ont en commun et ce qui les sépare",
    wrongs: [
      "seulement le contenu du premier",
      "lequel des deux est le meilleur",
      "un résumé de chacun, sans lien",
    ],
    methode: "Comparer, c'est mettre en regard : les points communs ET les différences.",
  },
  {
    text: "Reformuler l'essentiel d'une leçon « de manière schématique », c'est…",
    correct: "la mettre en schéma, en flèches ou en tableau",
    wrongs: [
      "la recopier en plus petit",
      "n'en garder que le titre",
      "l'apprendre par cœur",
    ],
    methode: "Le schéma montre les liens entre les idées : c'est une autre façon d'écrire pour apprendre.",
  },
  {
    text: "Dans un écrit réflexif court, on attend…",
    correct: "une idée et la raison qui la soutient",
    wrongs: [
      "une longue introduction",
      "un titre et une conclusion",
      "un résumé du cours entier",
    ],
    methode: "Court ne veut pas dire vague : une idée, un appui.",
  },
  {
    text: "Combien de phrases faut-il pour résumer une page en classe de CM2 ?",
    correct: "trois ou quatre suffisent",
    wrongs: ["une seule", "une dizaine", "autant que de paragraphes lus"],
    methode: "Un résumé qui fait la longueur du texte n'est plus un résumé.",
  },
  {
    text: "Pourquoi écrire pour apprendre une leçon ?",
    correct: "parce que reformuler avec ses mots aide à retenir",
    wrongs: [
      "pour remplir son cahier",
      "pour aller plus vite",
      "parce que c'est obligatoire",
    ],
    methode: "Le BO parle d'« écrire pour réfléchir, apprendre et mémoriser » : écrire fixe.",
  },
  {
    text: "Ton résumé contient une phrase que le texte ne dit pas. Que fais-tu ?",
    correct: "tu l'enlèves : un résumé n'ajoute rien",
    wrongs: [
      "tu la gardes, elle est jolie",
      "tu la mets entre parenthèses",
      "tu la mets à la fin",
    ],
    methode: "Un résumé rend compte du texte : il ne l'invente pas et ne le juge pas.",
  },
];

const ECRIT_COHERENCE: QcmItem[] = [
  {
    text: "Ton récit est au passé simple. Une phrase passe au présent sans raison. Que se passe-t-il ?",
    correct: "la cohérence du récit est rompue",
    wrongs: ["rien, c'est équivalent", "le texte devient un poème", "il faut couper le paragraphe"],
    methode: "La cohérence tient au système des temps : on n'en change pas sans raison.",
  },
  {
    text: "Dans un récit, pour dire qu'une action se passe APRÈS une autre, on écrit…",
    correct: "« Plus tard »",
    wrongs: ["« En même temps »", "« Au même moment »", "« Pendant ce temps »"],
    methode: "« ensuite », « plus tard » marquent la succession ; les autres, la simultanéité.",
  },
  {
    text: "Quand commence-t-on un nouveau paragraphe ?",
    correct: "quand on passe à une nouvelle idée",
    wrongs: ["quand la page est pleine", "tous les cinq mots", "à chaque virgule"],
    methode: "Le paragraphe est une unité de sens, pas une unité de place.",
  },
  {
    text: "Ton héros s'appelle Malo au début et Marlo à la fin. C'est…",
    correct: "une rupture de cohérence",
    wrongs: ["une faute d'orthographe sans importance", "un effet de style", "un synonyme"],
    methode: "Le lecteur ne sait plus de qui on parle : la chaine du personnage est cassée.",
  },
  {
    text: "Pourquoi remplacer « le pêcheur » par « il » dans la phrase suivante ?",
    correct: "pour éviter la répétition sans changer de personnage",
    wrongs: [
      "pour raccourcir la phrase",
      "pour parler de quelqu'un d'autre",
      "parce que la grammaire l'oblige",
    ],
    methode: "Les reprises tissent le texte : c'est aussi de la cohérence.",
  },
  {
    text: "Écrire la suite d'un récit demande de conserver…",
    correct: "les personnages, le temps et le lieu",
    wrongs: ["le nombre de lignes", "le titre", "la première phrase"],
    methode: "Une suite cohérente ne change pas en route ce que le texte a installé.",
  },
  {
    text: "Dans un dialogue écrit, une nouvelle réplique se marque par…",
    correct: "un tiret et un retour à la ligne",
    wrongs: ["une parenthèse", "un astérisque", "des points de suspension"],
    methode: "C'est un code de l'écrit : il dit au lecteur que quelqu'un d'autre parle.",
  },
  {
    text: "Quel connecteur ouvre le mieux la fin d'un récit ?",
    correct: "« Enfin »",
    wrongs: ["« D'abord »", "« Ensuite »", "« Pendant que »"],
    methode: "Les connecteurs de temps ordonnent le récit : « enfin » referme la série.",
  },
  {
    text: "Ton texte raconte à la 1re personne, puis dit « il pensa ». C'est…",
    correct: "un changement de point de vue non justifié",
    wrongs: ["une bonne idée de style", "une faute d'accord", "une reprise nominale"],
    methode: "Qui raconte doit rester le même du début à la fin, sauf choix assumé.",
  },
  {
    text: "Une description cohérente suit…",
    correct: "un ordre : de loin en près, de haut en bas",
    wrongs: [
      "l'ordre où les mots viennent",
      "l'ordre alphabétique",
      "aucun ordre particulier",
    ],
    methode: "Le lecteur doit pouvoir construire l'image : un ordre l'y aide.",
  },
  {
    text: "Dans un texte explicatif, à quoi sert le connecteur « parce que » ?",
    correct: "à donner la cause",
    wrongs: ["à donner la conséquence", "à opposer deux idées", "à conclure"],
    methode: "Les connecteurs disent le rapport entre les idées : sans eux, le texte est une liste.",
  },
  {
    text: "Ton récit passe d'un lieu à un autre sans prévenir. Que faut-il ajouter ?",
    correct: "une phrase ou un connecteur de lieu",
    wrongs: ["un titre", "un dialogue", "une nouvelle page"],
    methode: "Le lecteur ne voit pas ce que tu imagines : les changements se signalent.",
  },
];

const ECRIT_REVISER: QcmItem[] = [
  {
    text: "À quoi sert un brouillon ?",
    correct: "à essayer, raturer et réorganiser avant la version finale",
    wrongs: ["à écrire le texte définitif", "à faire joli", "à compter les mots"],
    methode: "Le brouillon est un écrit À RETRAVAILLER : les ratures y sont un signe de travail.",
  },
  {
    text: "Réviser son texte, c'est…",
    correct: "le relire pour corriger et améliorer",
    wrongs: [
      "le recopier au propre sans le lire",
      "compter les lignes",
      "changer de cahier",
    ],
    methode: "Réviser ajoute quelque chose au texte ; recopier ne fait que le déplacer.",
  },
  {
    text: "Quand tu relis pour l'orthographe, quel accord vérifies-tu en premier ?",
    correct: "l'accord du verbe avec son sujet",
    wrongs: ["la longueur des phrases", "le nombre de paragraphes", "la place des guillemets"],
    methode: "Le BO cite l'accord sujet-verbe et celui du groupe nominal comme points de vigilance.",
  },
  {
    text: "Un camarade te dit : « On ne comprend pas qui parle. » Que fais-tu ?",
    correct: "tu ajoutes des tirets et tu nommes les personnages",
    wrongs: ["tu effaces le dialogue", "tu écris plus gros", "tu ajoutes un titre"],
    methode: "Améliorer à partir d'une remarque, c'est agir précisément sur ce qui a gêné.",
  },
  {
    text: "Combien de fois faut-il relire un texte avant de le rendre ?",
    correct: "au moins deux fois, avec un but différent à chaque fois",
    wrongs: ["une seule fois suffit", "dix fois", "aucune, si on a bien écrit"],
    methode: "Une relecture pour le sens, une pour l'orthographe : on ne voit pas les deux à la fois.",
  },
  {
    text: "S'autoévaluer, c'est…",
    correct: "relire son texte avec des critères connus",
    wrongs: [
      "se donner une note",
      "demander l'avis du professeur",
      "comparer avec le texte du voisin",
    ],
    methode: "Sans critères, la relecture ne trouve rien : on relit ce qu'on croit avoir écrit.",
  },
  {
    text: "Quel signe manque le plus souvent dans un brouillon ?",
    correct: "la ponctuation de fin de phrase",
    wrongs: ["les accents", "les majuscules de noms propres", "les tirets de dialogue"],
    methode: "On écrit vite pour ne pas perdre l'idée : le point est le premier oublié.",
  },
  {
    text: "Respecter les codes de l'écrit, c'est notamment…",
    correct: "majuscule au début, point à la fin",
    wrongs: [
      "écrire en lettres attachées",
      "sauter une ligne sur deux",
      "écrire au crayon",
    ],
    methode: "Les codes sont ce que tout lecteur attend, pas une préférence de présentation.",
  },
  {
    text: "« Les élève de la classe a rendu leur devoirs. » Combien de fautes d'accord ?",
    correct: "trois",
    wrongs: ["une", "deux", "aucune"],
    methode: "« les élèves », « ont rendu », « leurs devoirs » : trois chaines d'accord cassées.",
  },
  {
    text: "Que fait-on d'une phrase trop longue repérée à la relecture ?",
    correct: "on la coupe en deux phrases",
    wrongs: ["on la supprime", "on l'écrit plus petit", "on ajoute des virgules partout"],
    methode: "Deux phrases claires valent mieux qu'une phrase juste mais illisible.",
  },
  {
    text: "Pourquoi relire son texte à voix basse ?",
    correct: "parce que l'oreille entend ce que l'œil saute",
    wrongs: [
      "pour aller plus vite",
      "pour apprendre le texte",
      "pour vérifier l'écriture",
    ],
    methode: "Un mot manquant s'entend souvent avant de se voir.",
  },
  {
    text: "Améliorer son texte, ce n'est pas seulement corriger : c'est aussi…",
    correct: "enrichir une phrase pauvre",
    wrongs: ["allonger le texte", "changer de sujet", "ajouter un titre"],
    methode: "Le BO dit « améliorer tout ou partie de son texte » : corriger ET enrichir.",
  },
];

// ── CONJUGAISON ─────────────────────────────────────────────────────────────
// Present / imparfait / futur / infinitif sont produits par le moteur
// parametrique (conjugationEngine.ts). Restent ici les notions conceptuelles.

const CONJ_PASSE_COMPOSE: QcmItem[] = [
  {
    text: "Quel auxiliaire complète : 'Nous ___ mangé une pomme.' ?",
    correct: "avons",
    wrongs: ["sommes","avez","ont"],
    methode: "Le passé composé avec avoir : 'nous avons'.",
  },
  {
    text: "Quel auxiliaire complète : 'Ils ___ partis en vacances.' ?",
    correct: "sont",
    wrongs: ["ont","est","avons"],
    methode: "Le verbe 'partir' se conjugue avec être.",
  },
  {
    text: "Quelle phrase est au passé composé ?",
    correct: "J'ai fini mes devoirs.",
    wrongs: ["Je finis mes devoirs.","Je finirai mes devoirs.","Je finissais mes devoirs."],
    methode: "Passé composé = auxiliaire + participe passé.",
  },
  {
    text: "Comment se forme le passé composé ?",
    correct: "un auxiliaire (être ou avoir) + le participe passé",
    wrongs: [
      "un auxiliaire (être ou avoir) + l'infinitif du verbe",
      "le radical du verbe + une terminaison du passé",
      "un verbe au présent + un complément de temps passé",
    ],
    methode: "Il faut un auxiliaire et un participe passé.",
  },
  {
    text: "Quel auxiliaire complète : 'Il ___ arrivé en retard.' ?",
    correct: "est",
    wrongs: ["a","ont","avez"],
    methode: "Le verbe 'arriver' se conjugue avec être.",
  },
  {
    text: "Complète : 'Tu ___ regardé un film.'",
    correct: "as",
    wrongs: ["es","a","ont"],
    methode: "Avec 'tu' et l'auxiliaire avoir : 'tu as'.",
  },
  {
    text: "Quel est le participe passé du verbe 'manger' ?",
    correct: "mangé",
    wrongs: ["manger","mangeait","mange"],
    methode: "Le participe passé des verbes en -er finit par -é.",
  },
  {
    text: "Quel est le participe passé du verbe 'prendre' ?",
    correct: "pris",
    wrongs: ["prendre","prenait","prend"],
    methode: "Certains participes passés sont irréguliers.",
  },
  {
    text: "Avec l'auxiliaire être, le participe passé s'accorde avec...",
    correct: "le sujet",
    wrongs: ["le complément","l'adverbe","rien"],
    methode: "Avec être, on accorde avec le sujet.",
  },
  {
    text: "Quelle phrase est correcte au passé composé ?",
    correct: "Elles sont arrivées à l'heure.",
    wrongs: ["Elles sont arrivé à l'heure.","Elles ont arrivées à l'heure.","Elles est arrivées à l'heure."],
    methode: "Avec être, le participe s'accorde avec le sujet.",
  },
  {
    text: "Complète : 'Vous ___ chanté une chanson.'",
    correct: "avez",
    wrongs: ["êtes","avons","ont"],
    methode: "Avec 'vous' et l'auxiliaire avoir : 'vous avez'.",
  },
  {
    text: "Quel auxiliaire complète : 'Elle ___ tombée dans l'escalier.' ?",
    correct: "est",
    wrongs: ["a", "ont", "avait"],
    methode: "Avec le verbe tomber, on utilise l'auxiliaire être.",
  },
  {
    text: "Choisis le passé composé correct : 'Nous ___ un film.'",
    correct: "avons regardé",
    wrongs: ["avons regarder", "avez regardé", "ont regardé"],
    methode: "Passé composé = auxiliaire avoir + participe passé.",
  },
  {
    text: "Choisis la forme correcte : 'Ils ___ partis tôt.'",
    correct: "sont",
    wrongs: ["ont", "est", "avaient"],
    methode: "Avec partir, l'auxiliaire est être : ils sont partis.",
  },
  {
    text: "Choisis le passé composé : 'Tu ___ une pomme.'",
    correct: "as mangé",
    wrongs: ["as manger", "a mangé", "es mangé"],
    methode: "Avec 'tu', auxiliaire avoir : tu as mangé.",
  },
  {
    text: "Quel est le participe passé de 'finir' ?",
    correct: "fini",
    wrongs: ["finir", "finit", "finissant"],
    methode: "Le participe passé de finir est 'fini'.",
  },
];

/* Le passé simple était servi depuis CONJ_VALEUR_TEMPS, qui parle du RÔLE des
   temps et non de leurs formes. Le BO du CM2 le range parmi les « conjugaisons
   à mémoriser et à maîtriser » : il lui faut ses propres formes. */
const CONJ_PASSE_SIMPLE: QcmItem[] = [
  {
    text: "« Ce jour-là, il ___ dans la cour. » (jouer, au passé simple)",
    correct: "joua",
    wrongs: ["jouait", "joue", "jouera"],
    methode: "« jouait » est l'imparfait : il dure. Le passé simple, lui, arrive d'un coup.",
  },
  {
    text: "À quel temps est « ils partirent » ?",
    correct: "au passé simple",
    wrongs: ["à l'imparfait", "au passé composé", "au plus-que-parfait"],
    methode: "Un seul mot, et une terminaison qu'on ne rencontre que dans les récits.",
  },
  {
    text: "À quoi sert le passé simple ?",
    correct: "à raconter une action passée, courte et terminée",
    wrongs: [
      "à décrire ce qui durait ou se répétait",
      "à dire ce qu'on fait en ce moment",
      "à donner un ordre",
    ],
    methode: "C'est le temps des évènements du récit ; l'imparfait est celui du décor.",
  },
  {
    text: "« Le pêcheur ___ son filet et partit. » (prendre, au passé simple)",
    correct: "prit",
    wrongs: ["prend", "prenait", "prendra"],
    methode: "Les deux verbes de la phrase sont au même temps : prit… partit.",
  },
  {
    text: "Laquelle de ces formes est au passé simple ?",
    correct: "il fut",
    wrongs: ["il était", "il est", "il sera"],
    methode: "« être » au passé simple : je fus, tu fus, il fut, nous fûmes…",
  },
  {
    text: "« Les enfants ___ la cour en courant. » (traverser, au passé simple)",
    correct: "traversèrent",
    wrongs: ["traversaient", "traversent", "traverseront"],
    methode: "Au pluriel, les verbes en -er font « -èrent ».",
  },
  {
    text: "Dans un récit, quel temps accompagne le plus souvent le passé simple ?",
    correct: "l'imparfait",
    wrongs: ["le futur", "le présent", "le conditionnel"],
    methode: "L'imparfait plante le décor, le passé simple fait arriver les évènements.",
  },
  {
    text: "« Elle ___ la porte et sortit. » (ouvrir, au passé simple)",
    correct: "ouvrit",
    wrongs: ["ouvrait", "ouvre", "ouvrira"],
    methode: "Deux actions qui se suivent : les deux au passé simple.",
  },
  {
    text: "À la 3ᵉ personne du pluriel, les verbes du 1ᵉʳ groupe font au passé simple…",
    correct: "-èrent",
    wrongs: ["-aient", "-ent", "-eront"],
    methode: "« ils chantèrent ». « -aient » serait l'imparfait.",
  },
  {
    text: "« Il ___ très peur. » (avoir, au passé simple)",
    correct: "eut",
    wrongs: ["avait", "a eu", "aura"],
    methode: "« avoir » au passé simple : j'eus, tu eus, il eut, ils eurent.",
  },
  {
    text: "Quelle différence entre « il chantait » et « il chanta » ?",
    correct: "« chantait » dure ou se répète ; « chanta » arrive une fois",
    // ⭐ Le premier leurre INVERSE les deux valeurs : il faut savoir laquelle
    // dure et laquelle survient, pas seulement qu'elles diffèrent.
    wrongs: [
      "« chanta » dure ou se répète ; « chantait » arrive une seule fois",
      "« chantait » se dit à l'oral ; « chanta » ne s'emploie qu'à l'écrit",
      "« chantait » est plus ancien ; « chanta » appartient à aujourd'hui",
    ],
    methode: "C'est le partage du récit : le décor d'un côté, l'évènement de l'autre.",
  },
  {
    text: "« Ils ___ au marché de Saint-Pierre. » (aller, au passé simple)",
    correct: "allèrent",
    wrongs: ["allaient", "vont", "iront"],
    methode: "« aller » suit les verbes en -er : ils allèrent.",
  },
];

const CONJ_VALEUR_TEMPS: QcmItem[] = [
  {
    text: "'Demain, je ___ à la piscine.' Quelle forme convient ?",
    correct: "irai (futur)",
    wrongs: ["suis allé","allais","vais hier"],
    methode: "'Demain' annonce le futur.",
  },
  {
    text: "'Hier, il ___ très beau.' Quelle forme convient ?",
    correct: "faisait (passé)",
    wrongs: ["fera","fait demain","fasse"],
    methode: "'Hier' annonce le passé.",
  },
  {
    text: "Quel mot indique le futur ?",
    correct: "demain",
    wrongs: ["hier","autrefois","la semaine dernière"],
    methode: "'Demain' place l'action dans le futur.",
  },
  {
    text: "Quel mot indique le passé ?",
    correct: "autrefois",
    wrongs: ["demain","bientôt","dans une heure"],
    methode: "'Autrefois' place l'action dans le passé.",
  },
  {
    text: "'En ce moment, elle ___ un livre.' Quelle forme convient ?",
    correct: "lit (présent)",
    wrongs: ["lira","lisait","a lu hier"],
    methode: "'En ce moment' annonce le présent.",
  },
  {
    text: "Pour raconter une action passée qui dure, on utilise souvent...",
    correct: "l'imparfait",
    wrongs: ["le futur","le présent","l'infinitif"],
    methode: "L'imparfait décrit le passé qui dure.",
  },
  {
    text: "'La semaine prochaine, nous ___ en voyage.' Quelle forme convient ?",
    correct: "partirons (futur)",
    wrongs: ["sommes partis","partions","partons hier"],
    methode: "'La semaine prochaine' annonce le futur.",
  },
  {
    text: "Quel temps utilise-t-on pour ce qui se passe maintenant ?",
    correct: "le présent",
    wrongs: ["le futur","l'imparfait","le passé composé"],
    methode: "Le présent dit ce qui se passe maintenant.",
  },
  {
    text: "'Quand j'étais petit, je ___ souvent au parc.' Quelle forme convient ?",
    correct: "allais (imparfait)",
    wrongs: ["irai","vais","suis allé une fois"],
    methode: "L'imparfait raconte une habitude du passé.",
  },
  {
    text: "'Tout à l'heure, elle ___ ses devoirs (c'est fini).' Quelle forme convient ?",
    correct: "a fait (passé composé)",
    wrongs: ["fera","fait","faisait toujours"],
    methode: "Le passé composé dit une action finie.",
  },
  {
    text: "Le mot 'bientôt' annonce une action...",
    correct: "au futur",
    wrongs: ["au passé","déjà finie","d'hier"],
    methode: "'Bientôt' place l'action dans le futur.",
  },
  {
    text: "Dans 'Demain, nous partirons', quel temps est utilisé ?",
    correct: "le futur",
    wrongs: ["le présent", "l'imparfait", "le passé composé"],
    methode: "'Demain' annonce une action future.",
  },
  {
    text: "Dans 'Hier, il pleuvait sans arrêt', quel temps est utilisé ?",
    correct: "l'imparfait",
    wrongs: ["le futur", "le présent", "le passé composé"],
    methode: "L'imparfait décrit une action passée qui dure.",
  },
  {
    text: "Dans 'Maintenant, je lis un livre', quel temps est utilisé ?",
    correct: "le présent",
    wrongs: ["le futur", "l'imparfait", "le passé composé"],
    methode: "Le présent exprime ce qui se passe maintenant.",
  },
  {
    text: "Dans 'Elle a fini ses devoirs', quel temps est utilisé ?",
    correct: "le passé composé",
    wrongs: ["le présent", "le futur", "l'imparfait"],
    methode: "Le passé composé exprime une action passée terminée.",
  },
  {
    text: "Quel temps raconte le mieux une action soudaine dans un récit au passé ?",
    correct: "le passé composé (ou le passé simple)",
    wrongs: [
      "l'imparfait, qui installe la scène qui dure",
      "le plus-que-parfait, pour ce qui précède",
      "le présent, pour rendre la scène plus vive",
    ],
    methode: "L'imparfait pose le décor, le passé composé marque l'action brève.",
  },
];

// ── ROUTAGE NOTION + MICRO-COMPETENCE ───────────────────────────────────────

/** La phrase complexe — CM2 (3 micros) et 6e (3 micros).
 *  ⛔ Cette fonction n'existait pas, et `questionForNotion` n'avait aucune
 *  branche pour la notion : les neuf gabarits du CM2 tombaient sur le défaut
 *  `qcm(LECTURE)` et servaient des questions de compréhension de lecture. */
function phraseComplexeQuestion(microId: string): Generated {
  // Le défi balaie les trois compétences de la notion : compter les
  // propositions, nommer le lien, choisir le pronom relatif.
  if (microId.includes("complexe_defi")) {
    return qcm(auHasard([PROPOSITION, ARTICULATION, PRONOM_RELATIF, CONJONCTIONS_ROLE]));
  }
  if (microId.includes("relatif")) return qcm(PRONOM_RELATIF);
  if (microId.includes("conjonctions")) return qcm(CONJONCTIONS_ROLE);
  if (microId.includes("coordination") || microId.includes("articulation")) {
    return qcm(ARTICULATION);
  }
  if (microId.includes("proposition")) return qcm(PROPOSITION);
  return qcm(PROPOSITION);
}

function conjugaisonQuestion(microId: string): Generated {
  /* ─── LES DEUX DÉFIS DE CONJUGAISON (CM2, 20/08/2026) ─────────────────────
     ⚠️ En tête : « cm2_conj_recit_defi » contient « recit », et la branche
     « discours_recit » juste en dessous le servirait depuis le pool de la 6e
     sur le discours rapporté — un sujet que le CM2 ne traite pas. */
  if (microId.includes("conj_simples_defi")) {
    const r = Math.random();
    if (r < 0.3) return fromConjItem(generateConjugationItem("present"));
    if (r < 0.55) return fromConjItem(generateConjugationItem("imparfait"));
    if (r < 0.8) return fromConjItem(generateConjugationItem("futur"));
    return fromConjItem(generateInfinitifItem());
  }
  if (microId.includes("conj_recit_defi")) {
    return qcm(
      auHasard([CONJ_PASSE_COMPOSE, CONJ_PASSE_SIMPLE, CONJ_PLUS_QUE_PARFAIT, CONJ_VALEUR_TEMPS])
    );
  }

  /* 6e, ajoutées le 11/08/2026. Elles passent AVANT la branche générique du
     collège (identifier / composer / employer), qui ferait tourner les temps
     déjà connus au lieu de servir les deux modes que le BO ajoute en 6e. */
  if (microId.includes("imperatif") || microId.includes("conditionnel")) {
    return qcm(IMPERATIF_CONDITIONNEL);
  }
  if (microId.includes("discours_recit")) return qcm(DISCOURS_RECIT);
  /* CM1 (11/08/2026) : les marques de temps et de personne, et les variations
     du radical du premier groupe. Deux attendus explicites du BO au CM1, qui
     tombaient jusqu'ici sur le moteur du présent. */
  if (microId.includes("radical_variations")) return qcm(RADICAL_VARIATIONS);
  if (microId.includes("conj_marques")) return qcm(MARQUES_TEMPS_PERSONNE);
  /* ⚠️ LE PARTICIPE PASSÉ ARRIVE ICI DEPUIS LE 22/08/2026. Le BO range son
     accord sous « Approfondir sa maitrise de la conjugaison », pas sous les
     accords du groupe nominal : `cm2_orth_participe_passe` a donc changé de
     notion, et passe désormais par CE routeur et non par `grammaireQuestion`.
     Sans cette branche, il traversait toute la fonction et tombait sur le
     moteur du présent — juste, et sur un autre sujet. */
  if (microId.includes("participe")) return qcm(PARTICIPE_PASSE);

  // Present / imparfait / futur / infinitif : moteur parametrique (centaines de
  // variantes). Passe compose et valeur des temps : pools rediges (notions plus
  // conceptuelles, peu mecaniques).
  // 6e (identifier / composer / employer) : la conjugaison n'est pas decoupee par
  // temps -> on fait TOURNER les temps existants pour couvrir tout le programme.
  if (
    microId.includes("identifier") ||
    microId.includes("composer") ||
    microId.includes("employer")
  ) {
    const r = Math.random();
    if (r < 0.2) return fromConjItem(generateConjugationItem("present"));
    if (r < 0.4) return fromConjItem(generateConjugationItem("imparfait"));
    if (r < 0.6) return fromConjItem(generateConjugationItem("futur"));
    if (r < 0.8) return qcm(CONJ_PASSE_COMPOSE);
    return qcm(CONJ_VALEUR_TEMPS);
  }
  /* ⚠️ Le plus-que-parfait EN PREMIER : « plus_que_parfait » ne contient pas
     « imparfait » — les lettres ne se suivent pas — mais l'ordre le dit, et
     personne n'aura à le revérifier. Micro ajoutée au CM2 le 11/08/2026. */
  if (microId.includes("plus_que_parfait")) return qcm(CONJ_PLUS_QUE_PARFAIT);
  if (microId.includes("imparfait")) return fromConjItem(generateConjugationItem("imparfait"));
  if (microId.includes("futur")) return fromConjItem(generateConjugationItem("futur"));
  if (microId.includes("passe_compose")) return qcm(CONJ_PASSE_COMPOSE);
  /* Le passé simple était servi depuis CONJ_VALEUR_TEMPS, qui parle du rôle
     des temps et pas de leurs formes. Le BO du CM2 le veut « à mémoriser et à
     maîtriser » : il a désormais son pool. */
  if (microId.includes("passe_simple")) return qcm(CONJ_PASSE_SIMPLE);
  if (microId.includes("valeur")) return qcm(CONJ_VALEUR_TEMPS);
  if (microId.includes("infinitif") || microId.includes("groupe")) return fromConjItem(generateInfinitifItem());
  return fromConjItem(generateConjugationItem("present"));
}

function grammaireQuestion(microId: string): Generated {
  /* ── CM2, mise au niveau du BO (11/08/2026) ───────────────────────────────
     ⚠️ CES NEUF BRANCHES PASSENT EN PREMIER, et ce n'est pas un détail :
     l'aiguillage se fait par SOUS-CHAÎNE, et les branches génériques plus bas
     attrapent tout. « cm2_gram_complement_nom » contient « complement » : sous
     l'ancienne branche, il aurait été servi depuis le pool des compléments
     circonstanciels. « cm2_orth_attribut » contient « attribut » : il doit
     passer avant « cm2_gram_attribut », sinon on lui sert la reconnaissance de
     l'attribut au lieu de son accord.
     Ces `microId` n'existent qu'au CM2 : le CM1 et la 6e ne les portent pas. */
  /* ⚠️ CM1 EN PREMIER, sur deux notions que le CM2 traite plus loin :
     — « participe_passe_etre » avant « participe_passe » : au CM1 le BO ne
       demande QUE l'auxiliaire être. Servir le pool du CM2, qui contient
       l'accord avec le COD antéposé, mettrait le CM1 un an en avance ;
     — « gn_epithete » avant « epithete » : au CM1 c'est le groupe nominal et
       son noyau ; le complément du nom, qu'oppose le pool du CM2, n'arrive
       qu'au CM2. */
  /* ─── LES DÉFIS DES TROIS NOTIONS DE GRAMMAIRE (CM2, 20/08/2026) ──────────
     Un défi n'a pas de pool à lui : il PARCOURT sa notion, et c'est justement
     ce qui en fait un défi plutôt qu'une question de plus — l'élève ne sait
     pas laquelle des cinq ou six compétences va tomber.
     ⚠️ CES BRANCHES PASSENT EN PREMIER, comme les neuf du BO juste en dessous :
     l'aiguillage se fait par sous-chaîne. « cm2_gram_complements_defi »
     contient « complement » et serait servi comme un complément ordinaire ;
     « cm2_gram_phrase_defi » ne serait attrapé par rien et tomberait sur le
     `return qcm(SUJET_VERBE)` final. */
  if (microId.includes("gram_phrase_defi")) {
    return qcm(
      auHasard([PHRASE_SIMPLE, SUJET_VERBE, SUJET_INVERSE, NATURE_FONCTION, PREPOSITIONS])
    );
  }
  if (microId.includes("gram_complements_defi")) {
    return qcm(auHasard([COMPLEMENTS, COD_COI, CC_SORTES, ATTRIBUT]));
  }
  if (microId.includes("gram_gn_defi")) {
    return qcm(auHasard([GN, COMPLEMENT_NOM, GN_EPITHETE, PREPOSITIONS]));
  }
  if (microId.includes("orth_accords_defi")) {
    // Les accords ont deux moteurs paramétriques en plus de leurs pools : le
    // défi pioche dans les deux, sinon il tournerait sur les mêmes phrases.
    const tire = Math.random();
    if (tire < 0.25) return fromConjItem(generateAgreementItem());
    if (tire < 0.5) return fromConjItem(generateSubjectVerbItem());
    if (tire < 0.7) return fromConjItem(generateHomophoneItem());
    return qcm(auHasard([ACCORD_ATTRIBUT, PARTICIPE_PASSE, HOMOPHONES, ACCORD_SUJET_VERBE]));
  }

  /* ⚠️ EN TÊTE, ET IL LE FAUT (22/08/2026). « cm2_gram_epithete_attribut »
     contient « attribut » ET « epithete » : sous les branches suivantes il
     recevrait soit la reconnaissance de l'attribut, soit l'opposition
     épithète / complément du nom — qui est le programme de la 6e, pas du CM2.
     Le CM2 oppose l'épithète à l'ATTRIBUT ; c'est un pool à part. */
  if (microId.includes("epithete_attribut")) return qcm(EPITHETE_ATTRIBUT);
  if (microId.includes("participe_passe_etre")) return qcm(PARTICIPE_PASSE_ETRE);
  if (microId.includes("gn_epithete")) return qcm(GN_EPITHETE);
  if (microId.includes("participe_passe")) return qcm(PARTICIPE_PASSE);
  if (microId.includes("orth_attribut")) return qcm(ACCORD_ATTRIBUT);
  if (microId.includes("attribut")) return qcm(ATTRIBUT);
  if (microId.includes("complement_nom") || microId.includes("epithete")) return qcm(COMPLEMENT_NOM);
  // 6e : l'antécédent et les manipulations syntaxiques (ajoutées le 11/08/2026).
  if (microId.includes("pronom_antecedent")) return qcm(PRONOM_ANTECEDENT);
  if (microId.includes("manipulations")) return qcm(MANIPULATIONS);
  /* CM1 (11/08/2026). « types_phrases » et « transformer_phrase » passent
     avant la branche « phrase_simple » plus bas, qui ne les attraperait pas
     mais dont la lecture laisserait un doute. */
  if (microId.includes("types_phrases")) return qcm(TYPES_PHRASES);
  if (microId.includes("transformer_phrase")) return qcm(TRANSFORMER_PHRASE);
  if (microId.includes("classes_mots")) return qcm(CLASSES_MOTS);
  if (microId.includes("gram_pronoms")) return qcm(PRONOMS_SUJET_OBJET);
  if (microId.includes("cod_coi")) return qcm(COD_COI);
  if (microId.includes("cc_sortes")) return qcm(CC_SORTES);
  if (microId.includes("sujet_inverse")) return qcm(SUJET_INVERSE);
  if (microId.includes("nature_fonction")) return qcm(NATURE_FONCTION);
  if (microId.includes("prepositions")) return qcm(PREPOSITIONS);

  // 6e (constituants / fonctions / accords / oral_ecrit) : les micros college ne
  // portent pas les memes libelles que cm1/cm2 -> on route vers les pools et
  // moteurs EXISTANTS les plus proches (aucun nouveau pool).
  if (microId.includes("constituants")) {
    return Math.random() < 0.5 ? qcm(PHRASE_SIMPLE) : qcm(GN);
  }
  if (microId.includes("fonctions")) {
    return Math.random() < 0.5 ? qcm(SUJET_VERBE) : qcm(COMPLEMENTS);
  }
  if (microId.includes("accords")) {
    return Math.random() < 0.5
      ? fromConjItem(generateAgreementItem())
      : fromConjItem(generateSubjectVerbItem());
  }
  if (microId.includes("oral_ecrit")) {
    return Math.random() < 0.5 ? fromConjItem(generateHomophoneItem()) : qcm(HOMOPHONES);
  }
  // Homophones : moteur parametrique (familles a/à, est/et, ces/ses, la/là,
  // mes/mais) une fois sur deux, sinon pool redige (couvre aussi on/ont,
  // son/sont, ou/où). Accord du GN : moteur parametrique (des milliers de GN).
  if (microId.includes("homophone")) {
    return Math.random() < 0.5 ? fromConjItem(generateHomophoneItem()) : qcm(HOMOPHONES);
  }
  if (microId.includes("accord_gn")) return fromConjItem(generateAgreementItem());
  if (microId.includes("orth_sujet_verbe")) {
    return Math.random() < 0.6 ? fromConjItem(generateSubjectVerbItem()) : qcm(ACCORD_SUJET_VERBE);
  }
  if (microId.includes("complement")) return qcm(COMPLEMENTS);
  if (microId.includes("gn")) return qcm(GN);
  if (microId.includes("phrase_simple")) return qcm(PHRASE_SIMPLE);
  if (microId.includes("sujet_verbe")) return qcm(SUJET_VERBE);
  return qcm(SUJET_VERBE);
}

function vocabulaireQuestion(microId: string): Generated {
  /* ─── LES TROIS DÉFIS DU VOCABULAIRE (CM2, 20/08/2026) ────────────────────
     En tête, comme ceux de la grammaire : « cm2_voc_formation_defi » contient
     « formation » et serait servi depuis le seul pool des familles de mots,
     alors qu'un défi doit balayer TOUTE sa notion — racines et composition
     comprises. */
  if (microId.includes("voc_sens_defi")) {
    const tire = Math.random();
    if (tire < 0.3) return qcm(VOC_CONTEXTE);
    if (tire < 0.55) return qcm(VOC_POLYSEMIE);
    if (tire < 0.8) return qcm(SENS_FIGURE);
    return qcm(VOC_SYN_ANT);
  }
  if (microId.includes("voc_formation_defi")) {
    const tire = Math.random();
    if (tire < 0.3) return fromConjItem(generateVocabularyItem("famille"));
    if (tire < 0.5) return qcm(VOC_FAMILLE);
    if (tire < 0.7) return qcm(RACINES);
    if (tire < 0.85) return qcm(COMPOSITION);
    return qcm(HOMONYMIE);
  }
  if (microId.includes("voc_emploi_defi")) {
    return qcm(auHasard([NIVEAU_LANGUE, VOC_REEMPLOI, VOC_ORTH]));
  }

  // 6e : "relations" (synonymie/antonymie/champ lexical/famille) et "formation"
  // (prefixes/suffixes/familles) -> pools existants VOC_SYN_ANT / VOC_FAMILLE.
  if (microId.includes("relations")) {
    return Math.random() < 0.5
      ? fromConjItem(generateVocabularyItem(Math.random() < 0.5 ? "syn" : "ant"))
      : qcm(VOC_SYN_ANT);
  }
  if (microId.includes("formation")) {
    return Math.random() < 0.5 ? fromConjItem(generateVocabularyItem("famille")) : qcm(VOC_FAMILLE);
  }
  // Familles et synonymes/antonymes : moteur parametrique (listes de mots) une
  // fois sur deux, sinon pool redige. Contexte/polysemie/orthographe/reemploi
  // restent rediges (difficiles a parametrer correctement).
  if (microId.includes("famille")) {
    return Math.random() < 0.5 ? fromConjItem(generateVocabularyItem("famille")) : qcm(VOC_FAMILLE);
  }
  if (microId.includes("syn") || microId.includes("ant") || microId.includes("nuance")) {
    return Math.random() < 0.5
      ? fromConjItem(generateVocabularyItem(Math.random() < 0.5 ? "syn" : "ant"))
      : qcm(VOC_SYN_ANT);
  }
  if (microId.includes("polysemie")) return qcm(VOC_POLYSEMIE);
  if (microId.includes("orthographe")) return qcm(VOC_ORTH);
  if (microId.includes("reemploi")) return qcm(VOC_REEMPLOI);
  return qcm(VOC_CONTEXTE);
}

/** Les micros du 11/08/2026 dont la NOTION ne suffit pas à les aiguiller.
 *  ⚠️ Elles passent AVANT tout le reste, parce qu'elles vivent dans des
 *  notions génériques qui les avaleraient : les onze entrées littéraires
 *  tomberaient toutes sur le même pool OEUVRE, `comp_documents` et
 *  `comp_image` sur LECTURE, `ecrit_copie` sur ECRITURE, `flue_130_mots` sur
 *  le défaut final. C'est la leçon de la phrase complexe du CM2 : un
 *  aiguillage trop large ne panne pas, il sert simplement autre chose. */
/* ── LEXIQUE : LES CINQ POOLS AJOUTÉS LE 15/08/2026 ─────────────────────────
   Deux sources qui se recoupent. Les « Attendus de fin d'année de CM2 »
   réclament, sous « Enrichir le lexique », les racines latines et grecques,
   l'homonymie et la composition. Et l'évaluation nationale de 6ᵉ mesure deux
   savoir-faire absents du coach, sur lesquels les écarts au national sont les
   plus lourds de toute l'épreuve de lexique : le NIVEAU DE LANGUE (26 % de
   réussite contre 57 %) et le SENS FIGURÉ (64 % contre 82 %).

   ⚠️ Ces pools existent pour que les gabarits soient SUR LE SUJET. Sans eux,
   les nouvelles micro-compétences seraient servies par `vocabulaireQuestion`
   depuis les pools génériques : des questions justes, portant sur autre chose
   que leur intitulé. C'est la panne qu'avait connue `phrase_complexe`, et
   qu'aucun vérificateur ne sait voir. */

const SENS_FIGURE: QcmItem[] = [
  {
    text: "Dans « Il a le cœur sur la main », que veut dire l'expression ?",
    correct: "il est très généreux",
    wrongs: ["il a mal au cœur", "il tient quelque chose dans sa main", "il a peur"],
    methode:
      "Au sens figuré, l'image remplace l'idée : la main qui donne dit la générosité.",
  },
  {
    text: "Dans quelle phrase « dévorer » est-il employé au sens figuré ?",
    correct: "Elle a dévoré ce roman en deux soirs.",
    wrongs: [
      "Le chien a dévoré sa gamelle.",
      "Nous avons dévoré le poulet.",
      "Le chat dévore sa pâtée.",
    ],
    methode:
      "On ne mange pas un livre : quand le verbe ne peut pas être pris au pied de la lettre, il est au sens figuré.",
  },
  {
    text: "« Tomber dans les pommes » signifie…",
    correct: "s'évanouir",
    wrongs: ["glisser sur un fruit", "faire une chute de vélo", "avoir très faim"],
    methode:
      "Une expression figée ne se comprend pas mot à mot : c'est l'ensemble qui porte le sens.",
  },
  {
    text: "Dans « Cette nouvelle m'a glacé le sang », le mot « glacé » est employé…",
    correct: "au sens figuré",
    wrongs: [
      "au sens propre",
      "comme un nom",
      "comme un complément de lieu",
    ],
    methode:
      "Le sang ne gèle pas vraiment : l'image dit la peur. C'est le sens figuré.",
  },
  {
    text: "Dans laquelle de ces phrases « brûler » est-il au sens propre ?",
    correct: "Le feu de camp brûle depuis une heure.",
    wrongs: [
      "Il brûle d'impatience.",
      "Elle a brûlé les étapes.",
      "Ce joueur brûle les planches.",
    ],
    methode:
      "Le sens propre est le sens premier, celui qu'on peut voir : ici, une vraie flamme.",
  },
  {
    text: "« Avoir un chat dans la gorge » veut dire…",
    correct: "être enroué",
    wrongs: [
      "avoir avalé quelque chose",
      "avoir un animal chez soi",
      "parler très fort",
    ],
    methode:
      "L'image de la gêne dans la gorge dit l'enrouement. On ne cherche pas le chat.",
  },
  /* ── Complété le 22/08/2026, même raison que RACINES. Le sens figuré est,
     avec le niveau de langue, l'un des deux écarts les plus lourds de
     l'évaluation nationale de 6e en lexique : le vivier devait tenir dix
     minutes de travail, il en tenait six. */
  {
    text: "« Cette montagne de devoirs m'effraie. » Le mot « montagne » est employé…",
    correct: "au sens figuré",
    wrongs: ["au sens propre", "comme un verbe", "comme un adjectif"],
    methode: "Une pile de devoirs n'est pas un relief : l'image dit la quantité.",
  },
  {
    text: "Dans quelle phrase « clé » est-il au sens propre ?",
    correct: "Il a perdu la clé de la porte.",
    wrongs: [
      "C'est le témoin clé de l'affaire.",
      "Voici la clé du problème.",
      "Elle occupe un poste clé.",
    ],
    methode: "Le sens propre est celui qu'on peut voir : un objet de métal qui ouvre une serrure.",
  },
  {
    text: "« Prendre ses jambes à son cou » veut dire…",
    correct: "s'enfuir très vite",
    wrongs: ["se blesser au cou", "s'asseoir en tailleur", "porter quelqu'un"],
    methode: "Une expression figée se comprend en bloc, jamais mot à mot.",
  },
  {
    text: "« Le temps file. » Ce verbe est employé…",
    correct: "au sens figuré",
    wrongs: ["au sens propre", "au sens littéral", "comme un nom"],
    methode: "Le temps ne court pas vraiment : l'image dit la vitesse à laquelle il passe.",
  },
  {
    text: "Quelle expression NE contient PAS de sens figuré ?",
    correct: "Il ferme la fenêtre.",
    wrongs: [
      "Il ferme les yeux sur ses erreurs.",
      "Elle a fermé son cœur.",
      "La discussion est fermée.",
    ],
    methode: "On teste : la fenêtre se ferme pour de vrai ; les yeux « fermés sur » une erreur, non.",
  },
  {
    text: "« Jeter l'éponge » signifie…",
    correct: "renoncer",
    wrongs: ["nettoyer", "se mettre en colère", "recommencer"],
    methode: "L'expression vient de la boxe : jeter l'éponge sur le ring, c'était abandonner le combat.",
  },
];

const NIVEAU_LANGUE: QcmItem[] = [
  {
    text: "Parmi ces mots, lequel appartient au langage familier ?",
    correct: "bouquin",
    wrongs: ["livre", "ouvrage", "roman"],
    methode:
      "« Bouquin » se dit entre amis, pas dans un devoir : c'est du registre familier.",
  },
  {
    text: "Quel mot appartient au langage soutenu ?",
    correct: "demeure",
    wrongs: ["maison", "baraque", "logement"],
    methode:
      "Trois niveaux : « baraque » (familier), « maison » (courant), « demeure » (soutenu).",
  },
  {
    text: "« Je suis crevé » — dans quel niveau de langue est cette phrase ?",
    correct: "familier",
    wrongs: ["courant", "soutenu", "poétique"],
    methode:
      "Le courant dirait « je suis fatigué », le soutenu « je suis épuisé ». « Crevé » est familier.",
  },
  {
    text: "Tu écris une lettre au maire de ta commune. Quelle formulation choisis-tu ?",
    correct: "Je vous prie de bien vouloir examiner ma demande.",
    wrongs: [
      "Répondez-moi vite s'il vous plaît.",
      "Faut que vous regardiez mon truc.",
      "Jetez un œil à ma demande.",
    ],
    methode:
      "On adapte le niveau de langue à qui l'on parle : à une autorité, on écrit en langage soutenu.",
  },
  {
    text: "Quel est l'équivalent COURANT du mot familier « fringues » ?",
    correct: "vêtements",
    wrongs: ["parures", "haillons", "costumes"],
    methode:
      "Le registre courant est celui de tous les jours, ni relâché ni cérémonieux.",
  },
  {
    text: "Range ces trois mots du plus familier au plus soutenu : voiture, bagnole, automobile.",
    correct: "bagnole, voiture, automobile",
    wrongs: [
      "voiture, bagnole, automobile",
      "automobile, voiture, bagnole",
      "bagnole, automobile, voiture",
    ],
    methode:
      "Familier, courant, soutenu : c'est l'ordre du registre, pas celui de la longueur du mot.",
  },
  /* ── Complété le 22/08/2026, même raison que RACINES. C'est l'écart le plus
     lourd de toute l'épreuve de lexique de l'évaluation nationale de 6e :
     26 % de réussite contre 57 % au national. */
  {
    text: "Quel est l'équivalent SOUTENU du mot courant « peur » ?",
    correct: "effroi",
    wrongs: ["trouille", "frousse", "crainte passagère"],
    methode: "« Trouille » et « frousse » sont familiers ; « effroi » relève du registre soutenu.",
  },
  {
    text: "« Sa bagnole est tombée en rade. » Combien de mots familiers ?",
    correct: "deux",
    wrongs: ["un", "trois", "aucun"],
    methode: "« bagnole » (voiture) et « en rade » (en panne) sont tous deux familiers.",
  },
  {
    text: "Tu écris à un camarade. Quel registre convient ?",
    correct: "le registre courant ou familier",
    wrongs: [
      "le registre soutenu obligatoirement",
      "aucun registre particulier",
      "le registre administratif",
    ],
    methode: "Le registre s'adapte au destinataire : entre camarades, le courant suffit.",
  },
  {
    text: "Laquelle de ces phrases est au registre soutenu ?",
    correct: "Je vous saurais gré de me répondre.",
    wrongs: [
      "Réponds-moi vite.",
      "Tu me réponds quand ?",
      "Faudrait me répondre.",
    ],
    methode: "Le conditionnel de politesse et le vouvoiement signent le registre soutenu.",
  },
  {
    text: "« Ouais, j'sais pas trop. » Cette phrase est écrite…",
    correct: "au registre familier",
    wrongs: ["au registre courant", "au registre soutenu", "sans aucun registre"],
    methode: "« Ouais » et la négation avalée (« j'sais pas ») sont des marques du familier à l'écrit.",
  },
  {
    text: "Dans un devoir de français, quel registre attend-on ?",
    correct: "le registre courant, correct et complet",
    wrongs: [
      "le registre familier, plus naturel",
      "le registre le plus soutenu possible",
      "un mélange des trois",
    ],
    methode: "Le devoir demande un français correct : ni relâché, ni cérémonieux.",
  },
];

const RACINES: QcmItem[] = [
  {
    text: "Dans « bibliothèque », que veut dire la racine grecque « biblio » ?",
    correct: "livre",
    wrongs: ["maison", "école", "papier"],
    methode:
      "« Biblio » = livre, « thèque » = rangement. Une bibliothèque range des livres.",
  },
  {
    text: "Que signifie la racine grecque « chrono », dans « chronomètre » ?",
    correct: "le temps",
    wrongs: ["la vitesse", "la mesure", "la distance"],
    methode:
      "« Chrono » = temps, « mètre » = mesure : un chronomètre mesure le temps.",
  },
  {
    text: "Dans « aquarium » et « aquatique », que veut dire la racine latine « aqua » ?",
    correct: "l'eau",
    wrongs: ["le verre", "le poisson", "le sable"],
    methode:
      "Une racine commune éclaire toute une famille de mots : aqua, c'est l'eau.",
  },
  {
    text: "Quel mot NE contient PAS la racine « thermo » (chaleur) ?",
    correct: "thermite",
    wrongs: ["thermomètre", "thermos", "thermal"],
    methode:
      "On teste le sens : thermomètre, thermos et thermal parlent tous de chaleur.",
  },
  {
    text: "« Télé » veut dire « loin ». Que fait donc un téléphone ?",
    correct: "il porte la voix au loin",
    wrongs: [
      "il montre des images",
      "il sonne très fort",
      "il enregistre des sons",
    ],
    methode:
      "« Télé » (loin) + « phone » (voix) : le mot dit lui-même à quoi il sert.",
  },
  {
    text: "Dans « géographie » et « géologie », que désigne la racine « géo » ?",
    correct: "la Terre",
    wrongs: ["le ciel", "la carte", "la pierre"],
    methode:
      "« Géo » = Terre. Géographie : décrire la Terre. Géologie : étudier la Terre.",
  },
  /* ── Complété le 22/08/2026 : le pool tenait six questions, l'élève en voyait
     donc six et reconnaissait la septième. Voir l'en-tête de
     scripts/verifier-variete.mjs — c'est le mélange des propositions qui
     masquait le compte. */
  {
    text: "Dans « microscope », que veut dire la racine grecque « micro » ?",
    correct: "petit",
    wrongs: ["rond", "lointain", "clair"],
    methode: "« Micro » (petit) + « scope » (regarder) : un microscope fait voir le très petit.",
  },
  {
    text: "« Zoo » veut dire « animal ». Que fait un zoologiste ?",
    correct: "il étudie les animaux",
    wrongs: ["il soigne les plantes", "il dessine des cartes", "il élève des poissons"],
    methode: "« Zoo » (animal) + « logie » (étude) : la racine donne le métier.",
  },
  {
    text: "Quelle racine, dans « aquaculture » et « agriculture », veut dire « cultiver » ?",
    correct: "culture",
    wrongs: ["aqua", "agri", "ure"],
    methode: "« aqua » = eau, « agri » = champ ; « culture » est la partie commune aux deux mots.",
  },
  {
    text: "Dans « manuscrit », que veut dire la racine latine « manu » ?",
    correct: "la main",
    wrongs: ["le livre", "l'encre", "le maître"],
    methode: "« Manu » (main) + « scrit » (écrit) : un manuscrit est écrit à la main.",
  },
  {
    text: "Quel mot contient une racine qui parle de la VOIX ?",
    correct: "phonétique",
    wrongs: ["photographie", "physique", "philosophie"],
    methode: "« phon » = voix, « photo » = lumière, « phys » = nature, « philo » = amour.",
  },
  {
    text: "« Poly » veut dire « plusieurs ». Un polygone est donc une figure…",
    correct: "à plusieurs côtés",
    wrongs: ["à un seul côté", "toujours ronde", "toujours à trois côtés"],
    methode: "« Poly » (plusieurs) + « gone » (angle) : plusieurs angles, donc plusieurs côtés.",
  },
];

const COMPOSITION: QcmItem[] = [
  {
    text: "Quel mot est formé par composition (deux mots réunis) ?",
    correct: "porte-monnaie",
    wrongs: ["portail", "portier", "portable"],
    methode:
      "Un mot composé réunit deux mots qui existent seuls : porte + monnaie.",
  },
  {
    text: "« Chou-fleur » est formé…",
    correct: "de deux noms réunis",
    wrongs: [
      "d'un préfixe et d'un nom",
      "d'un nom et d'un suffixe",
      "d'un seul mot raccourci",
    ],
    methode:
      "Ni préfixe ni suffixe : deux noms entiers, reliés par un trait d'union.",
  },
  {
    text: "Lequel de ces mots N'EST PAS un mot composé ?",
    correct: "grandeur",
    wrongs: ["grand-père", "arc-en-ciel", "sous-marin"],
    methode:
      "« Grandeur » vient de « grand » + le suffixe -eur : c'est une dérivation, pas une composition.",
  },
  {
    text: "Que désigne le mot composé « ouvre-boîte » ?",
    correct: "un outil qui sert à ouvrir des boîtes",
    wrongs: [
      "une boîte qui s'ouvre seule",
      "une boîte ouverte",
      "quelqu'un qui range des boîtes",
    ],
    methode:
      "Dans un mot composé verbe + nom, le premier dit l'action, le second sur quoi elle porte.",
  },
  {
    text: "« Une pomme de terre » — combien de mots composent ce mot composé ?",
    correct: "trois",
    wrongs: ["un", "deux", "quatre"],
    methode:
      "Un mot composé peut s'écrire sans trait d'union : pomme + de + terre forment un seul nom.",
  },
  {
    text: "Quel mot composé désigne un meuble ?",
    correct: "porte-manteau",
    wrongs: ["porte-parole", "porte-bonheur", "porte-avions"],
    methode:
      "Le second mot dit ce qu'on porte : le manteau. Les autres portent la parole, la chance, des avions.",
  },
  /* ── Complété le 22/08/2026, même raison que RACINES. */
  {
    text: "« Un lave-vaisselle » est composé…",
    correct: "d'un verbe et d'un nom",
    wrongs: ["de deux noms", "de deux verbes", "d'un adjectif et d'un nom"],
    methode: "« lave » est un verbe, « vaisselle » un nom : verbe + nom, comme ouvre-boîte.",
  },
  {
    text: "Lequel de ces mots est DÉRIVÉ, et non composé ?",
    correct: "chanteur",
    wrongs: ["cerf-volant", "rez-de-chaussée", "tire-bouchon"],
    methode: "Dériver, c'est ajouter un affixe à un radical : chant + -eur.",
  },
  {
    text: "« Un après-midi » est un mot composé formé…",
    correct: "d'une préposition et d'un nom",
    wrongs: ["de deux noms", "d'un verbe et d'un nom", "de deux adjectifs"],
    methode: "« après » est une préposition, « midi » un nom : la composition ne se limite pas aux noms.",
  },
  {
    text: "Que désigne « un garde-manger » ?",
    correct: "un endroit où l'on garde la nourriture",
    wrongs: [
      "quelqu'un qui surveille les repas",
      "un repas gardé au chaud",
      "un couvert de table",
    ],
    methode: "Verbe + nom : « garder » ce qu'on « mange ». Le mot dit sa fonction.",
  },
  {
    text: "Quel mot composé s'écrit SANS trait d'union ?",
    correct: "chemin de fer",
    wrongs: ["porte-clés", "arc-en-ciel", "sous-sol"],
    methode: "Un mot composé peut se souder, se lier par un trait d'union, ou rester en trois mots.",
  },
  {
    text: "Fabrique un mot composé qui désigne un appareil séchant les cheveux :",
    correct: "sèche-cheveux",
    wrongs: ["cheveux-sèche", "séchoir", "séchage"],
    methode: "En français, le verbe vient d'abord, puis ce sur quoi il agit : sèche + cheveux.",
  },
];

const HOMONYMIE: QcmItem[] = [
  {
    text: "« Le ver, le verre, le vert » : ces mots sont…",
    correct: "des homonymes",
    wrongs: ["des synonymes", "des antonymes", "des mots de la même famille"],
    methode:
      "Les homonymes se prononcent pareil mais n'ont ni le même sens ni la même orthographe.",
  },
  {
    text: "Complète : « Maman a acheté un … de lait. »",
    correct: "pot",
    wrongs: ["peau", "pos", "peaux"],
    methode:
      "Deux mots se prononcent [po] : on choisit celui dont le sens convient, ici le récipient.",
  },
  {
    text: "Dans « La reine porte une chaîne », quels mots sont homonymes d'autres mots courants ?",
    correct: "reine (rêne, renne) et chaîne (chêne)",
    wrongs: [
      "porte seulement",
      "une seulement",
      "aucun mot de la phrase",
    ],
    methode:
      "Un homonyme s'entend, il ne se voit pas : il faut passer par le sens de la phrase.",
  },
  {
    text: "Quel mot est l'homonyme de « conte » (une histoire) ?",
    correct: "compte",
    wrongs: ["contre", "comté", "content"],
    methode:
      "Même prononciation, sens différent : un conte se raconte, un compte se calcule.",
  },
  {
    text: "« Cet élève est sans faute » ou « cent faute » ? Choisis et dis pourquoi.",
    correct: "sans faute — « sans » indique l'absence",
    wrongs: [
      "cent faute — « cent » est un nombre",
      "s'en faute — « s'en » est un pronom",
      "sang faute — « sang » est un liquide",
    ],
    methode:
      "Quatre homonymes en [sɑ̃] : sans, cent, s'en, sang. Seul le sens de la phrase tranche.",
  },
  {
    text: "Lequel de ces couples N'EST PAS un couple d'homonymes ?",
    correct: "grand / grande",
    wrongs: ["mer / mère", "cour / cours", "temps / tant"],
    methode:
      "« Grand » et « grande » sont le même mot au masculin et au féminin, pas deux mots différents.",
  },
  /* ── Complété le 22/08/2026 : `cm2_voc_homonymie` tenait 9 énoncés, sous le
     seuil des dix minutes sans répétition. Même cause que les quatre autres
     pools du lexique — voir l'en-tête de scripts/verifier-variete.mjs. */
  {
    text: "« Il a acheté un pot de peinture. » Quel homonyme de « pot » existe aussi ?",
    correct: "peau",
    wrongs: ["port", "pont", "poil"],
    methode: "« Pot » et « peau » se prononcent pareil et s'écrivent autrement : ce sont des homonymes.",
  },
  {
    text: "Complète : « Le ___ souffle fort sur la côte. »",
    correct: "vent",
    wrongs: ["vend", "vends", "vant"],
    methode: "« Vent » est un nom ; « vend » est le verbe vendre. Le déterminant « le » appelle le nom.",
  },
  {
    text: "Dans « Il chante faux », quel homonyme de « faux » N'est PAS possible ici ?",
    correct: "l'outil du faucheur",
    wrongs: [
      "le contraire de « juste »",
      "l'adverbe qui suit « chanter »",
      "ce qui n'est pas vrai",
    ],
    methode: "Trois emplois voisins d'un même mot, et un homonyme : l'outil n'a rien à faire ici.",
  },
  {
    text: "« Cette histoire est sans fin » / « Il a cent euros ». Ces deux mots sont…",
    correct: "des homonymes",
    wrongs: ["des synonymes", "des mots de la même famille", "le même mot"],
    methode: "Même son, sens et orthographe différents : c'est la définition de l'homonymie.",
  },
];

function questionParMicro(microId: string): Generated | null {
  // Les cinq entrées du lexique ajoutées le 15/08 — voir le bloc au-dessus.
  if (microId.includes("voc_sens_figure")) return qcm(SENS_FIGURE);
  if (microId.includes("voc_niveau_langue")) return qcm(NIVEAU_LANGUE);
  if (microId.includes("voc_racines")) return qcm(RACINES);
  if (microId.includes("voc_composition")) return qcm(COMPOSITION);
  if (microId.includes("voc_homonymie")) return qcm(HOMONYMIE);
  // Les six entrées du cours moyen.
  if (microId.includes("cult_heros")) return qcm(HEROS);
  if (microId.includes("cult_merveilleux")) return qcm(MERVEILLEUX);
  if (microId.includes("cult_autres_vies")) return qcm(AUTRES_VIES);
  if (microId.includes("cult_morale")) return qcm(MORALE);
  if (microId.includes("cult_rapport_autres")) return qcm(RAPPORT_AUTRES);
  // Les cinq entrées de la 6e. `cult_poesie` sert les deux niveaux.
  if (microId.includes("cult_poesie")) return qcm(POESIE);
  if (microId.includes("cult_origines")) return qcm(ORIGINES);
  if (microId.includes("cult_theatre")) return qcm(THEATRE);
  if (microId.includes("cult_aventure")) return qcm(AVENTURE);
  if (microId.includes("cult_monstres")) return qcm(MONSTRES);
  /* ── La chaîne anaphorique et la mise en voix (22/08/2026) ───────────────
     Elles passent AVANT tout aiguillage par notion : ces micros vivent dans
     des notions de compréhension et de lecture qui les serviraient depuis les
     pools génériques — des questions justes, sur un autre sujet. */
  if (microId.includes("comp_reprises")) return qcm(REPRISES);
  if (microId.includes("comp_liens_logiques")) return qcm(LIENS_LOGIQUES);
  /* ── L'ÉCRITURE ET LE DICTIONNAIRE (22/08/2026) ──────────────────────────
     Dix-sept micros d'écriture, en 6e et au CM2, tiraient dans le seul pool
     ECRITURE. Chacune de ces branches correspond à un objectif que le BO nomme
     à part : résumer, tenir la cohérence, reprendre son texte. */
  if (
    microId.includes("ecrit_resumer") ||
    microId.includes("ecrit_hierarchiser") ||
    microId.includes("ecrit_comparer_documents") ||
    microId.includes("ecrit_apprendre_defi")
  ) {
    return qcm(ECRIT_RESUMER);
  }
  if (
    microId.includes("ecrit_coherence") ||
    microId.includes("ecrit_codes") ||
    microId.includes("ecrit_produire_defi")
  ) {
    return qcm(ECRIT_COHERENCE);
  }
  if (
    microId.includes("ecrit_brouillon") ||
    microId.includes("ecrit_reviser") ||
    microId.includes("ecrit_normes")
  ) {
    return qcm(ECRIT_REVISER);
  }
  if (microId.includes("voc_dictionnaire")) return qcm(DICTIONNAIRE);
  /* ⚠️ `voix_` et non `voix` : `lecture_voix_haute` est un notionId, pas un
     microId, et aucune micro du CM1 ni du CM2 ne porte ce morceau — leur
     lecture expressive s'appelle `flue_expressive`. Le jour où elles seront
     relues sur le BO, elles viendront ici aussi. */
  if (microId.includes("voix_")) return qcm(MISE_EN_VOIX);
  /* ⛔ ET CES DEUX-LÀ SONT NOMMÉES UNE PAR UNE, à dessein. Au CM2, la mise en
     voix et le plaisir de lire ont quitté la fluence pour « Lire à voix haute
     avec expressivité ». Leur `id` commence pourtant toujours par `cm2_flue_`,
     et il DOIT le rester : la progression déjà enregistrée d'un élève porte cet
     identifiant, un renommage l'effacerait en silence. On déplace la notion, on
     garde l'identité — et on paie ce choix ici, par deux lignes explicites. */
  if (microId.includes("flue_mise_en_voix") || microId.includes("flue_plaisir")) {
    return qcm(MISE_EN_VOIX);
  }
  // Les trois trous de Lecture et Écriture relevés en 6e.
  if (microId.includes("flue_130")) return qcm(FLUENCE_130);
  if (microId.includes("comp_documents")) return qcm(DOCUMENTS);
  if (microId.includes("comp_image")) return qcm(IMAGE);
  /* ⚠️ `ecrit_copie` existe AUSSI au CM1 et au CM2, où il tombait jusqu'ici
     sur le pool générique ECRITURE. Le BO leur demande pourtant la même chose
     qu'à la 6e — « Copier et produire des textes », « Acquérir des stratégies
     de copie ». Les trois niveaux y viennent donc ensemble. */
  if (microId.includes("ecrit_copie")) return qcm(ECRIRE_MAIN);
  return null;
}

function questionForNotion(notionId: string, microId: string): Generated {
  const parMicro = questionParMicro(microId);
  if (parMicro) return parMicro;
  if (notionId.includes("fluence")) return qcm(LECTURE);
  /* ⚠️ LA COMPRÉHENSION DE TEXTE N'EST PAS LA LECTURE DE DOCUMENTS — séparé le
     22/08/2026. Cette branche tirait à pile ou face entre les deux pools pour
     toute notion contenant « comprehension ». Une fois sur deux, « Rattacher un
     texte à un genre » recevait donc « quelle information donne la source ? ».
     Tant que le CM1 n'avait qu'une notion fourre-tout, le mélange passait ; la
     6e distingue maintenant les deux, et le CM2 aussi (`comprehension_textes`
     et `comprehension_documents`). On sert le pool que la notion annonce. */
  if (notionId === "comprehension_documents") return qcm(DOCUMENT);
  /* ⏳ LE CM1 GARDE LE MÉLANGE, ET C'EST VOLONTAIRE. Sa notion s'appelle encore
     `comprehension_textes_documents` : elle porte les deux, le pile ou face y
     est donc honnête. Il tombera quand le CM1 sera relu sur le BO à son tour. */
  if (notionId.includes("textes_documents")) return Math.random() < 0.5 ? qcm(LECTURE) : qcm(DOCUMENT);
  if (notionId.includes("comprehension")) return qcm(LECTURE);
  if (notionId.includes("oeuvre")) return qcm(OEUVRE);
  if (notionId.includes("ecriture")) return qcm(ECRITURE);
  if (notionId.includes("oral")) return qcm(ORAL);
  if (notionId.includes("vocabulaire")) return vocabulaireQuestion(microId);
  if (notionId.includes("conjugaison")) return conjugaisonQuestion(microId);
  if (notionId.includes("grammaire")) return grammaireQuestion(microId);
  /* ⛔ CETTE BRANCHE MANQUAIT (corrigé le 11/08/2026). Sans elle, la notion
     « phrase_complexe » traversait toute la fonction et tombait sur le
     `return qcm(LECTURE)` final : le CM2 servait des questions de
     compréhension de lecture à ses trois micros de phrase complexe. Aucun
     vérificateur ne pouvait le voir — les questions étaient valides, elles
     n'étaient simplement pas sur le sujet. */
  if (notionId.includes("complexe")) return phraseComplexeQuestion(microId);
  // 6e : "culture_litteraire" (genres, personnages, morale, carnet) -> pool OEUVRE
  // (deja on-topic). "lecture_voix_haute" tombe sur le defaut LECTURE : aucun pool
  // existant ne couvre la mise en voix -> c'est la couche "fixed" (ecrite main,
  // fusionnee au coach) qui la porte.
  if (notionId.includes("culture")) return qcm(OEUVRE);
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
