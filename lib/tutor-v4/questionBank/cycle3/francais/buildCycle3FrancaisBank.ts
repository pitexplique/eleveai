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
  return shuffle([correct, ...wrongs.filter((w) => w !== correct)]).slice(0, 4);
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
    wrongs: ["c'est une liste", "c'est un titre", "c'est une définition"],
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
    wrongs: ["à raconter une histoire","à donner l'heure","à dessiner une carte"],
    methode: "Le dictionnaire donne le sens et l'écriture des mots.",
  },
  {
    text: "Sur la boîte d'un jeu : « À partir de 6 ans. » Que signifie cette information ?",
    correct: "l'âge conseillé pour jouer",
    wrongs: ["le nombre de joueurs","le prix du jeu","la durée d'une partie"],
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
    wrongs: ["le jour", "l'heure", "le lieu"],
    methode: "On vérifie quelles informations utiles sont présentes.",
  },
  {
    text: "Dans un sommaire : 'Les insectes ........ page 12'.\n\nÀ quoi sert ce sommaire ?",
    correct: "trouver rapidement une page",
    wrongs: ["raconter une histoire", "donner son avis", "décrire un personnage"],
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
    wrongs: ["noter la couleur de la couverture","compter les pages","dessiner la maîtresse"],
    methode: "Le carnet garde la mémoire de ce qu'on a compris et ressenti.",
  },
  {
    text: "Pour ne pas perdre le fil d'une histoire longue, on peut...",
    correct: "résumer chaque chapitre en une phrase",
    wrongs: ["lire la fin en premier","sauter des chapitres","fermer le livre"],
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
    wrongs: ["cacher le livre","déchirer une page","oublier le titre"],
    methode: "On donne un avis justifié pour partager une lecture.",
  },
  {
    text: "Après la lecture d'un conte, quelle trace est la plus utile dans un carnet de lecteur ?",
    correct: "un avis personnel avec un passage qui le justifie",
    wrongs: ["seulement le nombre de pages", "une liste de calculs", "la couleur de la couverture seulement"],
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
    wrongs: ["Un chien.","Il y a un chien là.","Chien devant la porte."],
    methode: "Des détails précis rendent la description claire.",
  },
  {
    text: "En se relisant, que faut-il vérifier en priorité ?",
    correct: "les accords, l'orthographe et la ponctuation",
    wrongs: ["la couleur des pages","le poids du cahier","l'heure qu'il est"],
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
    wrongs: ["uniquement la couleur du stylo", "le nombre exact de lignes", "la taille du cahier"],
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
    wrongs: ["regarder par la fenêtre","parler à son voisin","se boucher les oreilles"],
    methode: "Écouter, c'est se rendre disponible pour comprendre.",
  },
  {
    text: "Reformuler ce qu'on a entendu, c'est le redire...",
    correct: "avec ses propres mots",
    wrongs: ["exactement pareil sans comprendre","beaucoup plus fort","en criant"],
    methode: "Reformuler montre qu'on a compris.",
  },
  {
    text: "Pour présenter un exposé, il vaut mieux...",
    correct: "parler assez fort et regarder la classe",
    wrongs: ["lire très vite, tête baissée","chuchoter","tourner le dos"],
    methode: "Une présentation doit être audible et claire.",
  },
  {
    text: "« Je pense que ce livre est bien parce qu'il fait rire. » Cette phrase donne...",
    correct: "un avis avec une raison",
    wrongs: ["une question","une consigne","une simple liste"],
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
    wrongs: ["qui ne se lave jamais", "déjà lavé", "qui salit"],
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

// ── CONJUGAISON ─────────────────────────────────────────────────────────────
// Present / imparfait / futur / infinitif sont produits par le moteur
// parametrique (conjugationEngine.ts). Restent ici les notions conceptuelles.

const CONJ_PASSE_COMPOSE: QcmItem[] = [
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

const CONJ_VALEUR_TEMPS: QcmItem[] = [
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
    wrongs: ["le futur", "le présent de demain", "l'imparfait seul"],
    methode: "L'imparfait pose le décor, le passé composé marque l'action brève.",
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
