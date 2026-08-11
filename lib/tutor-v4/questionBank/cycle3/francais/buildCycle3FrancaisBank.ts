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
    wrongs: ["seulement un fruit","seulement un animal","un verbe"],
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
    wrongs: ["Le courageusement est bleu.","Il mange un courageusement.","Courageusement la table brille."],
    methode: "L'adverbe accompagne le verbe.",
  },
  {
    text: "Quelle phrase emploie bien le mot 'énorme' ?",
    correct: "Un énorme camion bloque la route.",
    wrongs: ["Il dort énorme.","Un énorme sur le banc.","Énorme mange la pomme."],
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
    wrongs: ["où ?","quand ?","combien ?"],
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
    wrongs: ["Non, jamais", "Oui, et sa nature change aussi", "Seulement les verbes"],
    methode: "« Le chien dort » / « Je vois le chien » : nom dans les deux, sujet puis complément.",
  },
  {
    text: "Pour trouver la NATURE d'un mot, on se demande…",
    correct: "ce qu'il est : nom, verbe, adjectif, déterminant…",
    wrongs: ["quel rôle il joue dans la phrase", "où il est placé", "s'il est au pluriel"],
    methode: "La nature se lit sur le mot seul ; la fonction demande la phrase entière.",
  },
  {
    text: "Pour trouver la FONCTION d'un groupe, on se demande…",
    correct: "quel rôle il joue dans la phrase",
    wrongs: ["à quelle classe il appartient", "combien il a de lettres", "s'il porte un accent"],
    methode: "Sujet ? complément ? attribut ? C'est la phrase qui répond.",
  },
  {
    text: "« Complément du nom », c'est…",
    correct: "une fonction",
    wrongs: ["une nature", "une classe grammaticale", "un temps du verbe"],
    methode: "Complément de quelque chose : c'est un rôle, donc une fonction.",
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
      "On prend toujours le premier groupe de la phrase",
      "On prend le dernier mot",
      "On regarde le signe de ponctuation final",
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
      "Il est toujours au début de la phrase",
      "Il commence toujours par « à »",
      "Il peut toujours se supprimer",
    ],
    methode: "Direct veut dire : rien entre le verbe et lui.",
  },
  {
    text: "Comment reconnait-on un complément d'objet INDIRECT ?",
    correct: "Il est relié au verbe par une préposition : à, de…",
    wrongs: [
      "Il suit le verbe sans préposition",
      "Il est toujours un pronom",
      "Il est toujours au pluriel",
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
    wrongs: ["un seul", "trois", "aucun"],
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
    wrongs: ["Non, jamais", "Seulement s'il est court", "Seulement à la fin"],
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
      "On regarde s'il est au pluriel",
      "On regarde s'il suit le verbe",
      "On compte ses mots",
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
    wrongs: ["une préposition", "un déterminant", "une conjonction de coordination"],
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
    wrongs: [
      "L'attribut est toujours placé après le verbe, le complément avant",
      "L'attribut est toujours un nom",
      "Le complément d'objet est toujours au pluriel",
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
    wrongs: ["Oui, toujours", "Seulement si c'est un adjectif", "Seulement au pluriel"],
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
    wrongs: [
      "L'épithète est toujours au pluriel",
      "L'attribut est toujours un nom",
      "Rien : ce sont deux mots pour la même chose",
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
      "une seule : sujet → verbe",
      "une seule : verbe → attribut",
      "aucune",
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
    wrongs: ["toujours", "jamais", "seulement au pluriel"],
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
    wrongs: [
      "On accorde toujours",
      "On n'accorde jamais avec « avoir »",
      "On regarde la fin de la phrase",
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
      "Oui, avec « Il »",
      "Oui, avec « son cartable »",
      "Oui : avec « avoir », on accorde toujours",
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
      "à raconter une action qui se répète aujourd'hui",
      "à raconter une action à venir",
      "à donner un ordre",
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
      "aucune différence",
      "« avait fini » est au futur",
      "« a fini » est au présent",
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
      "un groupe de mots placé entre deux virgules",
      "une phrase entière",
      "un groupe nominal",
    ],
    methode: "Le verbe conjugué est le noyau : sans lui, pas de proposition.",
  },
  {
    text: "« Le pêcheur, fatigué, rentra chez lui. » Combien de propositions ?",
    correct: "une seule : il n'y a qu'un verbe conjugué",
    wrongs: ["deux", "trois", "aucune"],
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
      "une conjonction de coordination",
      "une conjonction de subordination",
      "un verbe",
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
    wrongs: [
      "« qui » pour les personnes, « que » pour les choses",
      "« qui » au singulier, « que » au pluriel",
      "on choisit au hasard",
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
    wrongs: [
      "Il n'y en a aucune",
      "La coordination s'emploie à l'oral, la subordination à l'écrit",
      "La coordination est invariable, l'autre s'accorde",
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
    wrongs: ["un nom seul", "un adjectif seul", "rien"],
    methode: "C'est ce qui la sépare d'une préposition, qui n'introduit qu'un groupe.",
  },
  {
    text: "Peut-on supprimer la proposition introduite par « parce que » ?",
    correct: "Oui : la première proposition tient encore debout",
    wrongs: [
      "Non, jamais",
      "Seulement si elle est courte",
      "Seulement à l'oral",
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
    wrongs: ["cinq", "trois", "dix"],
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
    wrongs: ["le mot qui le suit", "son sujet", "sa terminaison"],
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
      "On prend le nom le plus proche",
      "On prend le sujet de la phrase",
      "On regarde la ponctuation",
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
      "Pour accorder l'adjectif",
      "Pour conjuguer le verbe",
      "Pour poser une question",
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
      "la phrase devient fausse",
      "le verbe change de temps",
      "le sujet change",
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
      "à rendre la phrase plus jolie",
      "à raccourcir la phrase",
      "à corriger l'orthographe",
    ],
    methode: "On ne discute pas : on essaie, et la phrase répond.",
  },
  {
    text: "« Le pêcheur répare son filet. » Que donne l'encadrement par « c'est … qui » ?",
    correct: "« C'est le pêcheur qui répare son filet. » — « le pêcheur » est bien le sujet",
    wrongs: [
      "la phrase devient une question",
      "le verbe change de personne",
      "rien du tout",
    ],
    methode: "Si l'encadrement marche, le groupe est sujet.",
  },
  {
    text: "À quelle manipulation un complément d'objet résiste-t-il ?",
    correct: "à la suppression : on ne peut pas l'enlever",
    wrongs: [
      "au déplacement seulement",
      "à la substitution",
      "à aucune",
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
      "qu'il est le sujet",
      "qu'il est le verbe",
      "qu'il est un complément d'objet",
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
      "le radical du présent + « -rais »",
      "l'infinitif employé seul",
      "l'auxiliaire + le participe passé",
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
      "aucune différence",
      "« viendrais » est au passé",
      "« viendrai » est au conditionnel",
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
      "Parce que les uns sont plus difficiles que les autres",
      "Parce que les uns s'emploient au singulier",
      "Parce que le récit n'a pas de verbe conjugué",
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
      "toujours le passé simple",
      "toujours l'imparfait",
      "toujours le plus-que-parfait",
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
    wrongs: ["un seul", "trois", "aucun"],
    methode: "Le décor à l'imparfait, l'évènement au passé simple.",
  },
  {
    text: "Un même fait peut-il se raconter avec les deux séries de temps ?",
    correct: "Oui : « il est parti » ou « il partit », selon d'où l'on parle",
    wrongs: [
      "Non, jamais",
      "Seulement au pluriel",
      "Seulement dans les poèmes",
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
    wrongs: ["un seul verbe au présent","deux noms","un adjectif"],
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
    wrongs: [
      "aucune différence",
      "« chanta » est au futur",
      "« chantait » est au présent",
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
    wrongs: ["le futur", "le présent de demain", "l'imparfait seul"],
    methode: "L'imparfait pose le décor, le passé composé marque l'action brève.",
  },
];

// ── ROUTAGE NOTION + MICRO-COMPETENCE ───────────────────────────────────────

/** La phrase complexe — CM2 (3 micros) et 6e (3 micros).
 *  ⛔ Cette fonction n'existait pas, et `questionForNotion` n'avait aucune
 *  branche pour la notion : les neuf gabarits du CM2 tombaient sur le défaut
 *  `qcm(LECTURE)` et servaient des questions de compréhension de lecture. */
function phraseComplexeQuestion(microId: string): Generated {
  if (microId.includes("relatif")) return qcm(PRONOM_RELATIF);
  if (microId.includes("conjonctions")) return qcm(CONJONCTIONS_ROLE);
  if (microId.includes("coordination") || microId.includes("articulation")) {
    return qcm(ARTICULATION);
  }
  if (microId.includes("proposition")) return qcm(PROPOSITION);
  return qcm(PROPOSITION);
}

function conjugaisonQuestion(microId: string): Generated {
  /* 6e, ajoutées le 11/08/2026. Elles passent AVANT la branche générique du
     collège (identifier / composer / employer), qui ferait tourner les temps
     déjà connus au lieu de servir les deux modes que le BO ajoute en 6e. */
  if (microId.includes("imperatif") || microId.includes("conditionnel")) {
    return qcm(IMPERATIF_CONDITIONNEL);
  }
  if (microId.includes("discours_recit")) return qcm(DISCOURS_RECIT);

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
  if (microId.includes("participe_passe")) return qcm(PARTICIPE_PASSE);
  if (microId.includes("orth_attribut")) return qcm(ACCORD_ATTRIBUT);
  if (microId.includes("attribut")) return qcm(ATTRIBUT);
  if (microId.includes("complement_nom") || microId.includes("epithete")) return qcm(COMPLEMENT_NOM);
  // 6e : l'antécédent et les manipulations syntaxiques (ajoutées le 11/08/2026).
  if (microId.includes("pronom_antecedent")) return qcm(PRONOM_ANTECEDENT);
  if (microId.includes("manipulations")) return qcm(MANIPULATIONS);
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

function questionForNotion(notionId: string, microId: string): Generated {
  if (notionId.includes("fluence")) return qcm(LECTURE);
  if (notionId.includes("comprehension")) return Math.random() < 0.5 ? qcm(LECTURE) : qcm(DOCUMENT);
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
