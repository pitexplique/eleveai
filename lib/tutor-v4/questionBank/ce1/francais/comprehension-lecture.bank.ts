// lib/tutor-v4/questionBank/ce1/francais/comprehension-lecture.bank.ts
//
// La compréhension de textes au CE1, écrite à la main.
//
// CE QU'ELLE REMPLACE : DEUX textes, pour tout le cycle 2 et pour les trois
// classes — « Tom est dans le jardin… » et « Lea va a l'ecole… », cette
// dernière avec trois fautes dans une phrase de lecture. Dix micro-compétences
// se partageaient quatre questions, et « Remettre des évènements dans
// l'ordre », « Donner un titre » et « Élucider un mot inconnu » recevaient au
// hasard l'une des deux.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours élémentaire première année) :
//   — « Lire et comprendre en autonomie un texte narratif, informatif ou
//     prescriptif d'une quinzaine de lignes » ;
//   — « Identifier les personnages et leurs relations » ;
//   — « Se repérer dans la chaine anaphorique » ;
//   — « Réaliser des inférences dans des cas simples » ;
//   — « Justifier ses réponses par un retour au texte » ;
//   — « Donner un titre à un texte, le résumer oralement ».
//
// ⚠️ LA COMPRÉHENSION NE SE GÉNÈRE PAS : ELLE SE CORPUS. C'est la leçon du CP,
// où seize textes ont donné la notion la plus maigre de la classe. Ici il y en
// a TRENTE, et ils sont plus longs — cinq à sept phrases, contre trois ou
// quatre au CP. Chaque texte porte ses douze étiquettes : le personnage, la
// chaine anaphorique, l'ordre des évènements, ce qui est sous-entendu et
// l'indice qui le fait deviner, une question et sa preuve, un mot que l'élève
// ne connait pas, un titre, un résumé.
//
// LES DEUX PIÈGES, ceux que le BO met en avant aux trois niveaux du cycle :
//   — la CHAINE ANAPHORIQUE : « il » ne renvoie pas au dernier nom cité, mais
//     à celui dont on parle. Le BO donne son exemple : le lion / il / le
//     fauve / le roi de la savane ;
//   — l'INFÉRENCE : ce qui est vrai sans être écrit. « J'ai pris mon
//     parapluie » → le temps est pluvieux.
//
// ⚠️ Les textes sont lus sur un écran, entre deux questions. Le BO parle d'une
// quinzaine de lignes en fin d'année, mais lues en autonomie sur du papier :
// ici on s'arrête à ce qu'un enfant relit sans se perdre.

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

type Texte = {
  readonly titre: string;
  readonly titresFaux: readonly string[];
  readonly type: "narratif" | "documentaire";
  readonly texte: string;
  readonly personnage: string;
  /** Le pronom ou le groupe qui reprend un nom, et ce qu'il reprend vraiment. */
  readonly anaphore: {
    readonly mot: string;
    readonly referent: string;
    readonly faux: readonly string[];
  };
  /** Trois évènements du texte, écrits DANS L'ORDRE où ils arrivent. */
  readonly chronologie: readonly [string, string, string];
  /** Ce qui est vrai sans être écrit, et le morceau qui le fait deviner. */
  readonly implicite: {
    readonly conclusion: string;
    readonly indice: string;
    readonly faux: readonly string[];
  };
  readonly question: { readonly q: string; readonly r: string; readonly faux: readonly string[] };
  readonly justification: { readonly question: string; readonly preuve: string };
  readonly motInconnu: {
    readonly mot: string;
    readonly sens: string;
    readonly faux: readonly string[];
  };
  readonly resume: string;
};

const TEXTES: readonly Texte[] = [
  {
    titre: "Le margouillat de la varangue",
    titresFaux: ["La pêche de papa", "Un orage sur le piton", "La rentrée de Léa"],
    type: "narratif",
    texte: "Chaque soir, un margouillat sort de derrière le cadre. Il traverse le mur de la varangue sans un bruit. Léa l'observe depuis son fauteuil, sans bouger. Le petit lézard s'arrête sous l'ampoule et attend. Un moustique passe, et il disparait d'un coup de langue. Léa sourit : elle sait qu'elle dormira tranquille.",
    personnage: "Léa",
    anaphore: { mot: "Il", referent: "le margouillat", faux: ["Léa", "le cadre", "le moustique"] },
    chronologie: ["Le margouillat sort de derrière le cadre.", "Il s'arrête sous l'ampoule.", "Il attrape un moustique."],
    implicite: { conclusion: "le margouillat protège Léa des moustiques", indice: "elle dormira tranquille", faux: ["le margouillat a peur de Léa", "Léa veut chasser le margouillat", "il n'y a plus d'électricité"] },
    question: { q: "Que mange le margouillat ?", r: "un moustique", faux: ["une mangue", "une feuille", "un papillon"] },
    justification: { question: "Où le margouillat s'arrête-t-il ?", preuve: "Le petit lézard s'arrête sous l'ampoule et attend." },
    motInconnu: { mot: "varangue", sens: "une terrasse couverte", faux: ["une casserole", "un arbre", "un chemin"] },
    resume: "Un margouillat chasse les moustiques sous l'ampoule, et Léa le regarde faire.",
  },
  {
    titre: "La pirogue de Yann",
    titresFaux: ["Le marché du samedi", "Une nuit d'orage", "La leçon de la maitresse"],
    type: "narratif",
    texte: "Yann pousse sa pirogue sur le sable encore froid. Le lagon est lisse comme une assiette. Il rame doucement vers la passe, là où l'eau change de couleur. Ses filets glissent dans l'eau sans faire de vagues. Une heure plus tard, il les remonte, lourds et pleins. Yann rentre en sifflant.",
    personnage: "Yann",
    anaphore: { mot: "les", referent: "les filets", faux: ["les vagues", "les couleurs", "les pirogues"] },
    chronologie: ["Yann pousse sa pirogue sur le sable.", "Il pose ses filets dans l'eau.", "Il remonte ses filets pleins."],
    implicite: { conclusion: "Yann a bien pêché", indice: "lourds et pleins", faux: ["Yann n'a rien attrapé", "Yann a perdu ses filets", "la mer était mauvaise"] },
    question: { q: "Comment est le lagon au début du texte ?", r: "lisse comme une assiette", faux: ["couvert de vagues", "plein de bateaux", "rouge au soleil"] },
    justification: { question: "Comment Yann rentre-t-il ?", preuve: "Yann rentre en sifflant." },
    motInconnu: { mot: "passe", sens: "un passage entre les rochers", faux: ["une carte", "un poisson", "une corde"] },
    resume: "Yann part en pirogue au petit matin et remonte ses filets pleins de poissons.",
  },
  {
    titre: "L'averse de quatre heures",
    titresFaux: ["La sécheresse", "Le concours de dessin", "Le chien du voisin"],
    type: "narratif",
    texte: "Le ciel devient gris au-dessus du piton. Les enfants rangent leurs billes sans qu'on le leur demande. Une première goutte claque sur la tôle, puis mille autres. La cour se vide en quelques secondes. Sous le préau, Tom essuie ses lunettes avec son tee-shirt. L'averse s'arrête aussi vite qu'elle est venue.",
    personnage: "Tom",
    anaphore: { mot: "elle", referent: "l'averse", faux: ["la cour", "la tôle", "une goutte"] },
    chronologie: ["Le ciel devient gris.", "Les enfants rangent leurs billes.", "La cour se vide."],
    implicite: { conclusion: "les enfants connaissent bien ce temps-là", indice: "sans qu'on le leur demande", faux: ["les enfants ont peur de l'orage", "la maitresse a sonné la fin", "il pleut pour la première fois"] },
    question: { q: "Où les enfants vont-ils s'abriter ?", r: "sous le préau", faux: ["dans la classe", "sous un arbre", "à la maison"] },
    justification: { question: "Avec quoi Tom essuie-t-il ses lunettes ?", preuve: "Tom essuie ses lunettes avec son tee-shirt." },
    motInconnu: { mot: "préau", sens: "un abri couvert dans une cour d'école", faux: ["un bureau", "un cartable", "un panier"] },
    resume: "Une averse vide la cour en quelques secondes, puis s'arrête aussi vite.",
  },
  {
    titre: "Le cari du dimanche",
    titresFaux: ["Le voyage en bateau", "La course de vélo", "Le nid des oiseaux"],
    type: "narratif",
    texte: "Le dimanche, papa se lève avant tout le monde. Il allume le feu sous la marmite noire. Les oignons chantent dans l'huile, puis viennent le curcuma et le gingembre. L'odeur monte jusqu'aux chambres. Une à une, les portes s'ouvrent. Personne n'a besoin d'appeler pour que la table soit pleine.",
    personnage: "papa",
    anaphore: { mot: "Il", referent: "papa", faux: ["le feu", "le dimanche", "l'oignon"] },
    chronologie: ["Papa allume le feu.", "L'odeur monte jusqu'aux chambres.", "Les portes s'ouvrent."],
    implicite: { conclusion: "l'odeur du cari a réveillé toute la famille", indice: "Personne n'a besoin d'appeler", faux: ["papa a crié pour appeler", "la famille dormait déjà à table", "le cari a brûlé"] },
    question: { q: "Que met papa dans l'huile en premier ?", r: "les oignons", faux: ["le curcuma", "le gingembre", "le riz"] },
    justification: { question: "Quand papa se lève-t-il ?", preuve: "Le dimanche, papa se lève avant tout le monde." },
    motInconnu: { mot: "curcuma", sens: "une épice jaune", faux: ["un couteau", "une casserole", "un légume vert"] },
    resume: "Papa prépare un cari le dimanche matin, et l'odeur réveille toute la maison.",
  },
  {
    titre: "La lettre de Mamie",
    titresFaux: ["Le facteur perdu", "Le match de foot", "La visite du docteur"],
    type: "narratif",
    texte: "Le facteur pose une enveloppe blanche dans la boite. Mamie l'ouvre sur le pas de la porte, sans même rentrer. Elle lit deux lignes et s'assoit sur la marche. Puis elle relit tout, plus lentement, en souriant. Elle plie la lettre, la range dans sa poche et regarde la route. Ce soir, elle mettra la table pour deux.",
    personnage: "Mamie",
    anaphore: { mot: "l'", referent: "l'enveloppe", faux: ["le facteur", "la boite", "la porte"] },
    chronologie: ["Le facteur pose l'enveloppe.", "Mamie lit deux lignes.", "Elle range la lettre dans sa poche."],
    implicite: { conclusion: "quelqu'un vient bientôt lui rendre visite", indice: "elle mettra la table pour deux", faux: ["Mamie déménage", "Mamie a perdu la lettre", "Mamie ne sait pas lire"] },
    question: { q: "Où Mamie ouvre-t-elle la lettre ?", r: "sur le pas de la porte", faux: ["dans la cuisine", "à la poste", "dans son lit"] },
    justification: { question: "Comment Mamie relit-elle la lettre ?", preuve: "Puis elle relit tout, plus lentement, en souriant." },
    motInconnu: { mot: "marche", sens: "une des pierres d'un escalier", faux: ["une promenade", "un marché", "une chaise"] },
    resume: "Mamie reçoit une lettre qui lui annonce une visite, et prépare la table pour deux.",
  },
  {
    titre: "Le sentier de Mafate",
    titresFaux: ["La plage du matin", "Un problème de calcul", "Le nouveau cartable"],
    type: "narratif",
    texte: "Le sentier descend en lacets entre les tamarins. Sarah marche devant, son sac sur les épaules. Derrière elle, son oncle porte les provisions et souffle un peu. Au troisième virage, ils s'arrêtent pour boire. En bas, quelques toits rouges apparaissent entre les arbres. Sarah compte les maisons à voix haute : elles sont sept.",
    personnage: "Sarah",
    anaphore: { mot: "elles", referent: "les maisons", faux: ["les provisions", "les épaules", "Sarah et son oncle"] },
    chronologie: ["Sarah marche devant sur le sentier.", "Ils s'arrêtent pour boire.", "Sarah compte les maisons."],
    implicite: { conclusion: "l'oncle est plus fatigué que Sarah", indice: "souffle un peu", faux: ["l'oncle marche plus vite", "Sarah porte les provisions", "ils sont perdus"] },
    question: { q: "Combien de maisons Sarah compte-t-elle ?", r: "sept", faux: ["trois", "dix", "une"] },
    justification: { question: "Que porte l'oncle de Sarah ?", preuve: "Derrière elle, son oncle porte les provisions et souffle un peu." },
    motInconnu: { mot: "lacets", sens: "des virages serrés qui montent ou descendent", faux: ["des ficelles de chaussures", "des rochers", "des ponts"] },
    resume: "Sarah et son oncle descendent un sentier jusqu'à un petit village de sept maisons.",
  },
  {
    titre: "La récréation trop courte",
    titresFaux: ["La sortie au musée", "Le repas de midi", "La panne de voiture"],
    type: "narratif",
    texte: "Karim trace la marelle à la craie, case après case. Trois camarades attendent déjà leur tour, en file. Le jeu commence, et les rires montent au-dessus du préau. Karim saute jusqu'à la dernière case sans poser le pied à côté. La cloche sonne au moment où il se retourne. Il regarde la craie par terre et soupire.",
    personnage: "Karim",
    anaphore: { mot: "il", referent: "Karim", faux: ["la cloche", "le jeu", "un camarade"] },
    chronologie: ["Karim trace la marelle.", "Le jeu commence.", "La cloche sonne."],
    implicite: { conclusion: "Karim est déçu que la récréation s'arrête", indice: "il regarde la craie par terre et soupire", faux: ["Karim est content de rentrer", "Karim a perdu la partie", "Karim n'aime pas la marelle"] },
    question: { q: "Avec quoi Karim trace-t-il la marelle ?", r: "à la craie", faux: ["avec un crayon", "avec un bâton", "avec des cailloux"] },
    justification: { question: "Combien de camarades attendent leur tour ?", preuve: "Trois camarades attendent déjà leur tour, en file." },
    motInconnu: { mot: "marelle", sens: "un jeu où l'on saute dans des cases dessinées", faux: ["une chanson", "un livre", "une corde"] },
    resume: "Karim trace une marelle et joue, mais la cloche sonne trop tôt à son goût.",
  },
  {
    titre: "Le vélo réparé",
    titresFaux: ["La leçon de natation", "L'anniversaire de Tom", "Le chat du grenier"],
    type: "narratif",
    texte: "La roue arrière du vélo ne tourne plus rond. Nina retourne l'engin sur la varangue, guidon contre le sol. Elle desserre l'écrou avec la clé de son grand frère. La chambre à air apparait, percée par une épine de bougainvillier. Nina colle une rustine et remonte la roue. Le lendemain, elle arrive à l'école avant tout le monde.",
    personnage: "Nina",
    anaphore: { mot: "Elle", referent: "Nina", faux: ["la roue", "la clé", "la chambre à air"] },
    chronologie: ["Nina retourne le vélo.", "Elle trouve le trou dans la chambre à air.", "Elle colle une rustine."],
    implicite: { conclusion: "le vélo est réparé et roule bien", indice: "elle arrive à l'école avant tout le monde", faux: ["Nina va à l'école à pied", "le vélo est cassé pour de bon", "Nina a acheté un vélo neuf"] },
    question: { q: "Qu'est-ce qui a percé la chambre à air ?", r: "une épine de bougainvillier", faux: ["un clou", "une pierre", "un morceau de verre"] },
    justification: { question: "Avec quoi Nina desserre-t-elle l'écrou ?", preuve: "Elle desserre l'écrou avec la clé de son grand frère." },
    motInconnu: { mot: "rustine", sens: "une petite pièce de caoutchouc qui bouche un trou", faux: ["une pompe", "une roue de secours", "une sonnette"] },
    resume: "Nina répare la roue de son vélo et repart rouler dès le lendemain.",
  },
  {
    titre: "Les letchis de décembre",
    titresFaux: ["La neige au sommet", "Le contrôle de lecture", "Le déménagement"],
    type: "narratif",
    texte: "L'arbre du voisin croule sous les grappes rouges. Depuis une semaine, les enfants passent devant en levant la tête. Un matin, le voisin apporte une caisse pleine et frappe à la porte. Il repart sans rien demander, les mains dans les poches. Le soir, la table est couverte de coques vides. Personne ne se souvient d'avoir compté.",
    personnage: "le voisin",
    anaphore: { mot: "Il", referent: "le voisin", faux: ["l'arbre", "un enfant", "le matin"] },
    chronologie: ["Les enfants passent devant l'arbre.", "Le voisin apporte une caisse.", "La table se couvre de coques vides."],
    implicite: { conclusion: "les enfants ont mangé beaucoup de letchis", indice: "la table est couverte de coques vides", faux: ["les letchis n'étaient pas mûrs", "personne n'a mangé", "le voisin a repris sa caisse"] },
    question: { q: "Que fait le voisin un matin ?", r: "il apporte une caisse pleine", faux: ["il coupe l'arbre", "il vend les letchis", "il ferme sa barrière"] },
    justification: { question: "Comment le voisin repart-il ?", preuve: "Il repart sans rien demander, les mains dans les poches." },
    motInconnu: { mot: "grappes", sens: "des fruits serrés les uns contre les autres", faux: ["des feuilles", "des branches mortes", "des racines"] },
    resume: "Un voisin offre une caisse de letchis, et les enfants la vident dans la journée.",
  },
  {
    titre: "La tortue de la plage",
    titresFaux: ["Le concours de château de sable", "La leçon d'anglais", "Le marché aux poissons"],
    type: "narratif",
    texte: "À la nuit tombée, une tortue sort de l'eau et remonte le sable. Ses nageoires laissent deux traces larges derrière elle. Elle creuse longtemps, puis reste immobile un moment. Plus tard, elle rebrousse chemin vers les vagues. Au matin, il ne reste qu'un monticule de sable et deux lignes effacées. Un panneau interdit désormais de marcher à cet endroit.",
    personnage: "la tortue",
    anaphore: { mot: "Elle", referent: "la tortue", faux: ["la nuit", "une nageoire", "la vague"] },
    chronologie: ["La tortue sort de l'eau.", "Elle creuse dans le sable.", "Elle retourne vers les vagues."],
    implicite: { conclusion: "la tortue a pondu ses œufs dans le sable", indice: "un panneau interdit de marcher à cet endroit", faux: ["la tortue cherchait à manger", "la tortue s'est perdue", "quelqu'un a creusé un trou"] },
    question: { q: "Que laissent les nageoires de la tortue ?", r: "deux traces larges", faux: ["des coquillages", "des bulles", "une odeur"] },
    justification: { question: "Que reste-t-il au matin ?", preuve: "Au matin, il ne reste qu'un monticule de sable et deux lignes effacées." },
    motInconnu: { mot: "monticule", sens: "un petit tas", faux: ["un trou profond", "un rocher plat", "une flaque"] },
    resume: "Une tortue vient pondre dans le sable la nuit, et l'endroit est ensuite protégé.",
  },
  {
    titre: "Le premier jour de classe",
    titresFaux: ["La sortie en forêt", "Le vieux moulin", "La partie de billes"],
    type: "narratif",
    texte: "Le cartable de Malik est trop grand pour lui. Il s'arrête devant la grille et cherche un visage connu. Une main se pose sur son épaule : c'est la maitresse de l'an dernier. Elle l'accompagne jusqu'à sa nouvelle classe et lui montre sa place. Malik pose son cartable et regarde autour de lui. À la récréation, il joue déjà avec deux garçons.",
    personnage: "Malik",
    anaphore: { mot: "Elle", referent: "la maitresse de l'an dernier", faux: ["une main", "la classe", "la grille"] },
    chronologie: ["Malik s'arrête devant la grille.", "La maitresse l'accompagne en classe.", "Il joue à la récréation."],
    implicite: { conclusion: "Malik avait peur au début, et s'est vite senti mieux", indice: "il joue déjà avec deux garçons", faux: ["Malik n'a parlé à personne", "Malik est rentré chez lui", "Malik connaissait tout le monde"] },
    question: { q: "Qui pose une main sur l'épaule de Malik ?", r: "la maitresse de l'an dernier", faux: ["son père", "un camarade", "le directeur"] },
    justification: { question: "Où Malik s'arrête-t-il ?", preuve: "Il s'arrête devant la grille et cherche un visage connu." },
    motInconnu: { mot: "grille", sens: "une barrière de barreaux", faux: ["un mur peint", "un tableau", "un escalier"] },
    resume: "Malik arrive inquiet à l'école, mais il joue déjà avec d'autres à la récréation.",
  },
  {
    titre: "Le cerf-volant du dimanche",
    titresFaux: ["La pêche aux crabes", "L'atelier peinture", "Le train fantôme"],
    type: "narratif",
    texte: "Sur la plaine, le vent ne s'arrête jamais vraiment. Inès déroule sa ficelle mètre après mètre. Le cerf-volant monte, hésite, puis grimpe d'un coup très haut. Son frère court en dessous, la tête renversée en arrière. Une bourrasque plus forte fait claquer la toile. La ficelle se tend, puis file toute seule entre les doigts d'Inès.",
    personnage: "Inès",
    anaphore: { mot: "Son", referent: "le frère d'Inès", faux: ["le cerf-volant", "le vent", "la ficelle"] },
    chronologie: ["Inès déroule sa ficelle.", "Le cerf-volant monte très haut.", "La ficelle file entre ses doigts."],
    implicite: { conclusion: "Inès a lâché le cerf-volant", indice: "la ficelle file toute seule entre les doigts", faux: ["Inès a rangé le cerf-volant", "le vent s'est arrêté", "le frère a pris la ficelle"] },
    question: { q: "Que fait le frère d'Inès ?", r: "il court en dessous", faux: ["il tient la ficelle", "il dort dans l'herbe", "il rentre à la maison"] },
    justification: { question: "Que fait la bourrasque ?", preuve: "Une bourrasque plus forte fait claquer la toile." },
    motInconnu: { mot: "bourrasque", sens: "un coup de vent brusque", faux: ["une pluie fine", "un nuage bas", "un bruit de moteur"] },
    resume: "Inès fait voler un cerf-volant, jusqu'à ce qu'un coup de vent lui arrache la ficelle.",
  },
  {
    titre: "La panne de courant",
    titresFaux: ["Le sapin de Noël", "La leçon de piano", "Le poisson rouge"],
    type: "narratif",
    texte: "Un éclair blanchit toute la cuisine, et la lumière s'éteint. Maman cherche les bougies dans le tiroir du bas. Les enfants se rapprochent de la table sans qu'on le leur dise. Une flamme apparait, puis deux, puis trois. Les ombres dansent sur le mur et personne ne parle fort. Ce soir-là, on a raconté plus d'histoires que d'habitude.",
    personnage: "Maman",
    anaphore: { mot: "les", referent: "les bougies", faux: ["les enfants", "les ombres", "les histoires"] },
    chronologie: ["Un éclair blanchit la cuisine.", "Maman allume les bougies.", "On raconte des histoires."],
    implicite: { conclusion: "la panne a rendu la soirée plus agréable que d'habitude", indice: "on a raconté plus d'histoires que d'habitude", faux: ["tout le monde s'est couché tôt", "les enfants ont pleuré", "le courant est revenu tout de suite"] },
    question: { q: "Où maman cherche-t-elle les bougies ?", r: "dans le tiroir du bas", faux: ["sous le lit", "dans la voiture", "sur l'étagère"] },
    justification: { question: "Que font les ombres ?", preuve: "Les ombres dansent sur le mur et personne ne parle fort." },
    motInconnu: { mot: "éclair", sens: "une lumière brusque pendant un orage", faux: ["un gâteau", "une lampe de poche", "un miroir"] },
    resume: "Une panne de courant transforme la soirée en veillée aux bougies.",
  },
  {
    titre: "Le poussin perdu",
    titresFaux: ["Le voyage en avion", "La dictée du lundi", "La course de sacs"],
    type: "narratif",
    texte: "Un piaillement sort du tas de bois, derrière la case. Rémi écarte deux planches et découvre un poussin tout seul. Il le pose au creux de ses mains, contre son ventre. La poule tourne autour du poulailler en appelant sans arrêt. Rémi ouvre le grillage et dépose le poussin sur la paille. Le bruit s'arrête d'un coup.",
    personnage: "Rémi",
    anaphore: { mot: "le", referent: "le poussin", faux: ["le tas de bois", "le grillage", "Rémi"] },
    chronologie: ["Rémi entend un piaillement.", "Il découvre un poussin.", "Il le remet dans le poulailler."],
    implicite: { conclusion: "la poule cherchait son poussin", indice: "le bruit s'arrête d'un coup", faux: ["la poule avait faim", "le poussin était malade", "Rémi a effrayé la poule"] },
    question: { q: "Où Rémi trouve-t-il le poussin ?", r: "dans le tas de bois", faux: ["dans le poulailler", "sous la varangue", "dans un arbre"] },
    justification: { question: "Que fait la poule ?", preuve: "La poule tourne autour du poulailler en appelant sans arrêt." },
    motInconnu: { mot: "piaillement", sens: "un petit cri aigu d'oiseau", faux: ["un ronflement", "un claquement de porte", "un bruit de moteur"] },
    resume: "Rémi retrouve un poussin perdu et le rend à sa mère.",
  },
  {
    titre: "La course des canots",
    titresFaux: ["Le pique-nique raté", "La visite du dentiste", "Le grand nettoyage"],
    type: "narratif",
    texte: "Sur la plage, six canots attendent, alignés dans le sable. Chaque équipage compte quatre rameurs et un barreur. Le signal part et les rames frappent l'eau en même temps. Le canot jaune prend la tête, puis se fait rattraper à la bouée. À l'arrivée, deux coques touchent la ligne presque ensemble. Les juges se penchent longtemps sur leurs papiers.",
    personnage: "les rameurs",
    anaphore: { mot: "se", referent: "le canot jaune", faux: ["la bouée", "les juges", "le signal"] },
    chronologie: ["Les canots attendent sur la plage.", "Le canot jaune prend la tête.", "Deux coques touchent la ligne."],
    implicite: { conclusion: "les juges hésitent à désigner le gagnant", indice: "les juges se penchent longtemps sur leurs papiers", faux: ["la course est annulée", "le canot jaune a gagné facilement", "personne n'a fini la course"] },
    question: { q: "Combien de rameurs compte chaque équipage ?", r: "quatre", faux: ["six", "un", "dix"] },
    justification: { question: "Que se passe-t-il à la bouée ?", preuve: "Le canot jaune prend la tête, puis se fait rattraper à la bouée." },
    motInconnu: { mot: "barreur", sens: "celui qui dirige le bateau", faux: ["celui qui compte les points", "celui qui vend les billets", "celui qui répare les rames"] },
    resume: "Six canots s'affrontent, et l'arrivée est si serrée que les juges hésitent.",
  },
  {
    titre: "Le margouillat, un voisin discret",
    titresFaux: ["Le crocodile du fleuve", "Comment pousse le manguier", "Le voyage des baleines"],
    type: "documentaire",
    texte: "Le margouillat est un petit lézard qui vit près des maisons. Il mesure une dizaine de centimètres, queue comprise. Ses pattes portent de minuscules lamelles qui lui permettent de grimper aux murs lisses. Il chasse la nuit, surtout les moustiques et les papillons attirés par la lumière. En cas de danger, il peut abandonner sa queue, qui repousse ensuite. On le rencontre dans toutes les maisons de l'île.",
    personnage: "le margouillat",
    anaphore: { mot: "Il", referent: "le margouillat", faux: ["le moustique", "le mur", "le danger"] },
    chronologie: ["Le margouillat grimpe grâce à ses lamelles.", "Il chasse la nuit près des lumières.", "En cas de danger, il abandonne sa queue."],
    implicite: { conclusion: "le margouillat est utile dans les maisons", indice: "il chasse surtout les moustiques", faux: ["le margouillat est dangereux", "le margouillat vit dans l'eau", "le margouillat dort la nuit"] },
    question: { q: "Combien mesure un margouillat ?", r: "une dizaine de centimètres", faux: ["un mètre", "deux centimètres", "cinquante centimètres"] },
    justification: { question: "Comment le margouillat grimpe-t-il aux murs lisses ?", preuve: "Ses pattes portent de minuscules lamelles qui lui permettent de grimper aux murs lisses." },
    motInconnu: { mot: "lamelles", sens: "de très fines lames", faux: ["des griffes crochues", "des poils longs", "des ventouses de pieuvre"] },
    resume: "Le margouillat est un petit lézard des maisons qui grimpe aux murs et chasse les moustiques.",
  },
  {
    titre: "D'où vient la mangue",
    titresFaux: ["La fabrication du pain", "Le cycle de l'eau", "Les volcans du monde"],
    type: "documentaire",
    texte: "La mangue est le fruit du manguier, un arbre qui peut vivre plus de cent ans. Ses fleurs apparaissent à la fin de l'hiver, en grappes légères. Chaque fleur qui a été visitée par un insecte peut donner un fruit. La mangue grossit pendant plusieurs semaines, puis change de couleur. On la cueille quand elle cède un peu sous le doigt. Un manguier adulte peut porter plusieurs centaines de fruits.",
    personnage: "le manguier",
    anaphore: { mot: "la", referent: "la mangue", faux: ["la fleur", "la couleur", "la semaine"] },
    chronologie: ["Les fleurs apparaissent à la fin de l'hiver.", "La mangue grossit pendant plusieurs semaines.", "On cueille le fruit."],
    implicite: { conclusion: "sans insectes, il y aurait beaucoup moins de mangues", indice: "chaque fleur qui a été visitée par un insecte peut donner un fruit", faux: ["les insectes mangent les mangues", "le manguier n'a pas besoin de fleurs", "la mangue pousse en hiver"] },
    question: { q: "Comment sait-on qu'une mangue est mûre ?", r: "elle cède un peu sous le doigt", faux: ["elle tombe toute seule", "elle devient toute verte", "elle sent le citron"] },
    justification: { question: "Combien de temps peut vivre un manguier ?", preuve: "La mangue est le fruit du manguier, un arbre qui peut vivre plus de cent ans." },
    motInconnu: { mot: "cède", sens: "s'enfonce légèrement", faux: ["se casse en deux", "devient dure", "change d'odeur"] },
    resume: "La mangue naît d'une fleur visitée par un insecte, grossit, puis se cueille quand elle est tendre.",
  },
  {
    titre: "Les cyclones de l'océan Indien",
    titresFaux: ["Les tremblements de terre", "La vie des fourmis", "L'histoire du chocolat"],
    type: "documentaire",
    texte: "Un cyclone est une immense tempête qui se forme au-dessus de la mer chaude. Il tourne sur lui-même et avance lentement, en emportant des pluies très fortes. Au centre, une zone calme appelée l'œil laisse parfois voir le ciel bleu. La saison des cyclones dure de novembre à avril. Avant l'arrivée d'un cyclone, on ferme les volets et on stocke de l'eau. L'alerte rouge oblige tout le monde à rester à l'abri.",
    personnage: "le cyclone",
    anaphore: { mot: "Il", referent: "le cyclone", faux: ["l'œil", "la mer", "le ciel"] },
    chronologie: ["Le cyclone se forme au-dessus de la mer chaude.", "On ferme les volets et on stocke de l'eau.", "L'alerte rouge oblige à rester à l'abri."],
    implicite: { conclusion: "un cyclone est dangereux et on s'y prépare à l'avance", indice: "avant l'arrivée d'un cyclone, on ferme les volets et on stocke de l'eau", faux: ["un cyclone dure toute l'année", "un cyclone est sans danger", "on sort pour regarder le cyclone"] },
    question: { q: "Comment s'appelle la zone calme au centre d'un cyclone ?", r: "l'œil", faux: ["le cœur", "la queue", "la bouche"] },
    justification: { question: "Quand dure la saison des cyclones ?", preuve: "La saison des cyclones dure de novembre à avril." },
    motInconnu: { mot: "stocke", sens: "met de côté pour plus tard", faux: ["jette", "boit tout de suite", "fait bouillir"] },
    resume: "Un cyclone est une grosse tempête née sur la mer chaude, contre laquelle on se prépare.",
  },
  {
    titre: "Le paille-en-queue",
    titresFaux: ["Le poisson-clown", "La forêt de bambous", "Les grottes du littoral"],
    type: "documentaire",
    texte: "Le paille-en-queue est un oiseau blanc au bec rouge ou jaune. On le reconnait à deux longues plumes qui trainent derrière lui en vol. Il niche dans les falaises et les remparts, à l'abri du vent. Il passe la plus grande partie de sa vie au-dessus de la mer. Pour manger, il plonge d'un coup sur les petits poissons de surface. Il ne revient à terre que pour élever son unique poussin.",
    personnage: "le paille-en-queue",
    anaphore: { mot: "lui", referent: "le paille-en-queue", faux: ["le bec", "la falaise", "le poisson"] },
    chronologie: ["Il niche dans les falaises.", "Il passe sa vie au-dessus de la mer.", "Il revient à terre pour son poussin."],
    implicite: { conclusion: "le paille-en-queue est un très bon voilier", indice: "il passe la plus grande partie de sa vie au-dessus de la mer", faux: ["il ne sait pas nager", "il vit dans les arbres", "il mange des fruits"] },
    question: { q: "À quoi reconnait-on le paille-en-queue en vol ?", r: "à deux longues plumes derrière lui", faux: ["à ses ailes noires", "à son cri grave", "à ses pattes rouges"] },
    justification: { question: "Où niche le paille-en-queue ?", preuve: "Il niche dans les falaises et les remparts, à l'abri du vent." },
    motInconnu: { mot: "niche", sens: "installe son nid", faux: ["mange", "dort debout", "chante fort"] },
    resume: "Le paille-en-queue est un oiseau marin à longues plumes qui niche dans les falaises.",
  },
  {
    titre: "Comment se forme une ravine",
    titresFaux: ["La construction d'un pont", "Les saisons en Europe", "Le métier de boulanger"],
    type: "documentaire",
    texte: "Quand la pluie tombe sur une pente, l'eau ne reste pas en place. Elle glisse en emportant la terre et les petits cailloux. Année après année, ce passage se creuse et devient une ravine. Au fond, l'eau court seulement après les grosses pluies. Le reste du temps, la ravine est sèche et on peut la traverser à pied. Il ne faut jamais y descendre quand le ciel se couvre en amont.",
    personnage: "l'eau",
    anaphore: { mot: "Elle", referent: "l'eau", faux: ["la pluie", "la pente", "la terre"] },
    chronologie: ["La pluie tombe sur la pente.", "L'eau emporte la terre.", "Le passage devient une ravine."],
    implicite: { conclusion: "une ravine sèche peut se remplir très vite et devenir dangereuse", indice: "il ne faut jamais y descendre quand le ciel se couvre en amont", faux: ["une ravine est toujours pleine", "une ravine se creuse en un jour", "l'eau monte de la mer"] },
    question: { q: "Quand l'eau court-elle au fond de la ravine ?", r: "après les grosses pluies", faux: ["tous les jours", "seulement l'été", "quand il fait chaud"] },
    justification: { question: "Qu'emporte l'eau quand elle glisse ?", preuve: "Elle glisse en emportant la terre et les petits cailloux." },
    motInconnu: { mot: "amont", sens: "plus haut, du côté d'où vient l'eau", faux: ["au bord de la mer", "dans la maison", "sous la terre"] },
    resume: "Une ravine se creuse peu à peu quand l'eau de pluie emporte la terre d'une pente.",
  },
  {
    titre: "La récolte de la canne",
    titresFaux: ["Le tour du monde à voile", "Le musée des dinosaures", "Le concours de chant"],
    type: "documentaire",
    texte: "La canne à sucre pousse pendant environ un an avant d'être coupée. La coupe a lieu de juillet à décembre, quand les tiges sont les plus sucrées. Les camions apportent la canne à l'usine, où on la broie pour en tirer le jus. Ce jus est chauffé jusqu'à ce que le sucre se sépare du liquide. Ce qui reste des tiges sert à faire fonctionner l'usine elle-même. Rien n'est jeté.",
    personnage: "la canne à sucre",
    anaphore: { mot: "la", referent: "la canne", faux: ["l'usine", "la coupe", "la tige"] },
    chronologie: ["La canne pousse pendant un an.", "Les camions l'apportent à l'usine.", "On chauffe le jus pour en tirer le sucre."],
    implicite: { conclusion: "l'usine se sert des restes de la canne comme combustible", indice: "ce qui reste des tiges sert à faire fonctionner l'usine", faux: ["les restes sont jetés à la mer", "l'usine achète du charbon", "on replante les restes"] },
    question: { q: "Quand a lieu la coupe de la canne ?", r: "de juillet à décembre", faux: ["en janvier", "toute l'année", "seulement en mars"] },
    justification: { question: "Que fait-on de la canne à l'usine ?", preuve: "Les camions apportent la canne à l'usine, où on la broie pour en tirer le jus." },
    motInconnu: { mot: "broie", sens: "écrase pour en sortir le jus", faux: ["fait sécher", "coupe en morceaux égaux", "plante en terre"] },
    resume: "La canne pousse un an, puis l'usine la broie pour en tirer le sucre sans rien jeter.",
  },
  {
    titre: "Pourquoi la mer est salée",
    titresFaux: ["Le voyage de la Lune", "Les os du squelette", "La vie au château fort"],
    type: "documentaire",
    texte: "La pluie qui tombe sur la terre n'est pas salée. En descendant vers la mer, elle traverse les roches et emporte de minuscules grains de sel. Les rivières apportent ce sel à la mer, goutte après goutte, depuis des millions d'années. L'eau de mer, elle, s'évapore sous le soleil et repart en nuages. Mais le sel, lui, ne s'évapore pas : il reste. C'est ainsi que la mer est devenue salée peu à peu.",
    personnage: "l'eau de pluie",
    anaphore: { mot: "lui", referent: "le sel", faux: ["le soleil", "le nuage", "la rivière"] },
    chronologie: ["La pluie traverse les roches.", "Les rivières apportent le sel à la mer.", "L'eau s'évapore et le sel reste."],
    implicite: { conclusion: "le sel s'accumule parce qu'il ne repart jamais avec l'eau", indice: "le sel ne s'évapore pas : il reste", faux: ["quelqu'un verse du sel dans la mer", "la mer était salée dès le début", "les nuages sont salés"] },
    question: { q: "Qu'est-ce qui s'évapore sous le soleil ?", r: "l'eau de mer", faux: ["le sel", "les roches", "les nuages"] },
    justification: { question: "La pluie qui tombe est-elle salée ?", preuve: "La pluie qui tombe sur la terre n'est pas salée." },
    motInconnu: { mot: "s'évapore", sens: "se transforme en vapeur et monte dans l'air", faux: ["gèle", "devient plus lourde", "change de couleur"] },
    resume: "Les rivières apportent du sel à la mer, et comme l'eau seule s'évapore, le sel s'accumule.",
  },
  {
    titre: "Le tamarin des hauts",
    titresFaux: ["Le sapin de montagne", "L'élevage des poules", "La pêche à la ligne"],
    type: "documentaire",
    texte: "Le tamarin des hauts est un arbre qui ne pousse que sur cette île. On le trouve entre mille et deux mille mètres d'altitude. Son tronc se tord et ses branches partent dans tous les sens. Ses graines ont besoin de chaleur pour germer : un incendie léger les réveille. Son bois, très dur et veiné, sert à fabriquer des meubles. Les forêts de tamarins sont aujourd'hui protégées.",
    personnage: "le tamarin des hauts",
    anaphore: { mot: "les", referent: "les graines", faux: ["les branches", "les forêts", "les meubles"] },
    chronologie: ["Le tamarin pousse en altitude.", "Ses graines germent après un feu.", "Les forêts sont protégées."],
    implicite: { conclusion: "le feu n'est pas toujours un ennemi de la forêt", indice: "un incendie léger réveille les graines", faux: ["le tamarin pousse au bord de la mer", "le tamarin n'a pas de graines", "le bois du tamarin est mou"] },
    question: { q: "À quelle altitude trouve-t-on le tamarin des hauts ?", r: "entre mille et deux mille mètres", faux: ["au bord de la mer", "à dix mètres", "au sommet du piton seulement"] },
    justification: { question: "À quoi sert le bois du tamarin ?", preuve: "Son bois, très dur et veiné, sert à fabriquer des meubles." },
    motInconnu: { mot: "germer", sens: "commencer à pousser", faux: ["tomber par terre", "sécher au soleil", "changer de couleur"] },
    resume: "Le tamarin des hauts pousse en altitude, ses graines germent après un feu, et ses forêts sont protégées.",
  },
  {
    titre: "Le marché du samedi",
    titresFaux: ["La bibliothèque du quartier", "Le stade de football", "L'hôpital de nuit"],
    type: "narratif",
    texte: "Dès six heures, les étals se couvrent de piments, de brèdes et de bananes. Une marchande empile ses letchis en pyramide, sans que rien ne tombe. Amina tient la liste et son père tient le panier. Ils s'arrêtent trois fois pour goûter, et deux fois pour discuter. Le panier devient lourd bien avant la fin de la liste. Au retour, Amina porte le sac à deux mains, en marchant vite.",
    personnage: "Amina",
    anaphore: { mot: "Ils", referent: "Amina et son père", faux: ["les letchis", "les marchandes", "les étals"] },
    chronologie: ["Les étals se couvrent de fruits et de légumes.", "Amina et son père s'arrêtent pour goûter.", "Ils rentrent avec le panier plein."],
    implicite: { conclusion: "ils n'ont pas pu tout acheter", indice: "le panier devient lourd bien avant la fin de la liste", faux: ["ils ont oublié la liste", "le marché était fermé", "ils n'ont rien acheté"] },
    question: { q: "Que tient le père d'Amina ?", r: "le panier", faux: ["la liste", "les letchis", "la monnaie"] },
    justification: { question: "À quelle heure les étals se couvrent-ils ?", preuve: "Dès six heures, les étals se couvrent de piments, de brèdes et de bananes." },
    motInconnu: { mot: "étals", sens: "les tables où les marchands posent leurs produits", faux: ["des sacs de courses", "des chariots", "des balances"] },
    resume: "Amina et son père font le marché, mais le panier est plein avant la fin de leur liste.",
  },
  {
    titre: "La leçon de natation",
    titresFaux: ["La course de relais", "L'atelier cuisine", "Le spectacle de fin d'année"],
    type: "narratif",
    texte: "Au bord du bassin, Lino serre la barre des deux mains. L'eau lui arrive à la poitrine et il la trouve froide. Le maitre-nageur lui demande de souffler par le nez, sous l'eau. Lino essaie une fois, remonte trop vite, tousse. À la troisième tentative, il tient trois secondes et ressort en riant. La séance suivante, il lâche la barre tout seul.",
    personnage: "Lino",
    anaphore: { mot: "la", referent: "l'eau", faux: ["la barre", "la séance", "la poitrine"] },
    chronologie: ["Lino serre la barre au bord du bassin.", "Il souffle sous l'eau et tousse.", "Il lâche la barre tout seul."],
    implicite: { conclusion: "Lino a pris confiance au fil des essais", indice: "la séance suivante, il lâche la barre tout seul", faux: ["Lino a abandonné", "Lino savait déjà nager", "le maitre-nageur était absent"] },
    question: { q: "Que demande le maitre-nageur à Lino ?", r: "de souffler par le nez sous l'eau", faux: ["de courir sur le bord", "de sauter du plongeoir", "de compter jusqu'à dix"] },
    justification: { question: "Combien de temps Lino tient-il à la troisième tentative ?", preuve: "À la troisième tentative, il tient trois secondes et ressort en riant." },
    motInconnu: { mot: "bassin", sens: "le grand bac rempli d'eau d'une piscine", faux: ["un seau", "une rivière", "un bateau"] },
    resume: "Lino apprend peu à peu à souffler sous l'eau, puis ose lâcher la barre.",
  },
  {
    titre: "Le vieux manguier",
    titresFaux: ["Le déménagement de Tom", "Le concours de mathématiques", "La sortie au phare"],
    type: "narratif",
    texte: "Le manguier de la cour a été planté par l'arrière-grand-père. Son tronc est si large que trois enfants n'en font pas le tour. Chaque année, il donne moins de fruits que l'année d'avant. Cette saison, on n'a compté que douze mangues sur tout l'arbre. Papa parle de le couper, mais il ne le fait pas. Il a accroché une balançoire à la plus grosse branche.",
    personnage: "Papa",
    anaphore: { mot: "le", referent: "le manguier", faux: ["l'arrière-grand-père", "la branche", "le tronc"] },
    chronologie: ["L'arrière-grand-père plante le manguier.", "L'arbre donne de moins en moins de fruits.", "Papa accroche une balançoire."],
    implicite: { conclusion: "papa tient à l'arbre pour autre chose que ses fruits", indice: "il a accroché une balançoire à la plus grosse branche", faux: ["papa a coupé l'arbre", "l'arbre donne beaucoup de mangues", "l'arbre est mort"] },
    question: { q: "Combien de mangues a-t-on comptées cette saison ?", r: "douze", faux: ["cent", "trois", "aucune"] },
    justification: { question: "Qui a planté le manguier ?", preuve: "Le manguier de la cour a été planté par l'arrière-grand-père." },
    motInconnu: { mot: "tronc", sens: "la grosse tige d'un arbre", faux: ["une racine", "une feuille", "un fruit"] },
    resume: "Le vieux manguier donne peu de fruits, mais papa le garde et y accroche une balançoire.",
  },
  {
    titre: "Le concert sous la varangue",
    titresFaux: ["La panne d'ascenseur", "Le tournoi d'échecs", "La visite du zoo"],
    type: "narratif",
    texte: "Le kayamb sort de derrière la porte, plein de graines sèches. Grand-père le secoue une fois, deux fois, et le rythme s'installe. Les voisins arrivent sans avoir été prévenus, chacun avec une chaise. Une voix commence, une autre répond, puis tout le monde chante. Les enfants tapent des mains, un peu à côté du temps. Personne ne regarde l'heure jusqu'à ce que la lumière baisse.",
    personnage: "Grand-père",
    anaphore: { mot: "le", referent: "le kayamb", faux: ["grand-père", "le rythme", "la porte"] },
    chronologie: ["Grand-père sort le kayamb.", "Les voisins arrivent avec des chaises.", "Tout le monde chante."],
    implicite: { conclusion: "ce genre de soirée arrive souvent ici", indice: "les voisins arrivent sans avoir été prévenus", faux: ["personne n'est venu", "grand-père a envoyé des invitations", "les voisins sont fâchés"] },
    question: { q: "Qu'apportent les voisins ?", r: "une chaise", faux: ["un gâteau", "un instrument", "une lampe"] },
    justification: { question: "Que font les enfants ?", preuve: "Les enfants tapent des mains, un peu à côté du temps." },
    motInconnu: { mot: "kayamb", sens: "un instrument plat rempli de graines qu'on secoue", faux: ["un tambour en peau", "une flûte en bambou", "une guitare à trois cordes"] },
    resume: "Grand-père sort le kayamb et une soirée de chants s'organise toute seule sous la varangue.",
  },
  {
    titre: "L'abeille et la fleur",
    titresFaux: ["Le nid de guêpes", "La chenille verte", "L'araignée du grenier"],
    type: "documentaire",
    texte: "Une abeille butine pour rapporter du nectar à la ruche. En se posant, elle se couvre sans le vouloir d'une fine poussière jaune : le pollen. Elle vole ensuite vers une autre fleur de la même espèce. Un peu de pollen y tombe, et la fleur peut alors donner un fruit. L'abeille ne cherche pas à rendre service : elle cherche à manger. Sans elle, pourtant, beaucoup d'arbres ne donneraient presque rien.",
    personnage: "l'abeille",
    anaphore: { mot: "y", referent: "l'autre fleur", faux: ["la ruche", "l'abeille", "le fruit"] },
    chronologie: ["L'abeille se pose sur une fleur.", "Elle se couvre de pollen.", "Elle dépose le pollen sur une autre fleur."],
    implicite: { conclusion: "l'abeille aide les arbres sans le faire exprès", indice: "l'abeille ne cherche pas à rendre service : elle cherche à manger", faux: ["l'abeille plante les arbres", "l'abeille mange les fruits", "l'abeille travaille pour les jardiniers"] },
    question: { q: "Comment s'appelle la poussière jaune ?", r: "le pollen", faux: ["le nectar", "la cire", "le miel"] },
    justification: { question: "Pourquoi l'abeille butine-t-elle ?", preuve: "Une abeille butine pour rapporter du nectar à la ruche." },
    motInconnu: { mot: "butine", sens: "va de fleur en fleur pour récolter", faux: ["construit un nid", "dort dans une fleur", "pique quelqu'un"] },
    resume: "En cherchant à manger, l'abeille transporte le pollen d'une fleur à l'autre et permet aux fruits de pousser.",
  },
  {
    titre: "La classe transplantée",
    titresFaux: ["Le contrôle de géographie", "La kermesse de l'école", "Le nouveau tableau"],
    type: "narratif",
    texte: "Le car part de l'école à sept heures, et personne ne dort. Après deux heures de virages, la route s'arrête devant un gîte de bois. Les valises roulent mal sur les cailloux du chemin. La maitresse distribue les chambres, quatre lits par pièce. Le soir, on entend seulement le vent et une casserole qu'on remue. Le lendemain matin, deux élèves se réveillent avant le lever du soleil.",
    personnage: "la maitresse",
    anaphore: { mot: "on", referent: "les élèves et la maitresse", faux: ["le car", "la route", "le vent"] },
    chronologie: ["Le car part de l'école.", "La maitresse distribue les chambres.", "Deux élèves se réveillent très tôt."],
    implicite: { conclusion: "les élèves sont impatients de découvrir l'endroit", indice: "deux élèves se réveillent avant le lever du soleil", faux: ["les élèves ont mal dormi à cause du bruit", "le car est tombé en panne", "la maitresse a oublié les chambres"] },
    question: { q: "Combien de lits y a-t-il par chambre ?", r: "quatre", faux: ["deux", "dix", "un"] },
    justification: { question: "Combien de temps dure la route ?", preuve: "Après deux heures de virages, la route s'arrête devant un gîte de bois." },
    motInconnu: { mot: "gîte", sens: "une maison où l'on peut dormir en voyage", faux: ["un magasin", "une gare", "une école"] },
    resume: "Une classe part en car jusqu'à un gîte de montagne, et deux élèves se lèvent avant le jour.",
  },
  {
    titre: "Le cahier oublié",
    titresFaux: ["La chasse au trésor", "Le poisson d'avril", "Le grand ménage de printemps"],
    type: "narratif",
    texte: "Le cartable de Zoé est plus léger que d'habitude, et elle ne s'en aperçoit pas. En classe, la maitresse demande de sortir le cahier bleu. Zoé fouille, ressort une trousse, un livre, une pomme. Sa voisine pousse son propre cahier au milieu de la table. Les deux filles écrivent côte à côte, penchées sur la même page. À la sortie, Zoé propose de porter le sac de sa voisine.",
    personnage: "Zoé",
    anaphore: { mot: "Sa", referent: "la voisine de Zoé", faux: ["la maitresse", "la trousse", "la page"] },
    chronologie: ["Zoé part avec un cartable trop léger.", "Elle cherche son cahier bleu.", "Sa voisine partage le sien."],
    implicite: { conclusion: "Zoé remercie sa voisine à sa manière", indice: "à la sortie, Zoé propose de porter le sac de sa voisine", faux: ["Zoé s'est fâchée avec sa voisine", "Zoé avait deux cahiers", "la maitresse a puni Zoé"] },
    question: { q: "Que sort Zoé de son cartable ?", r: "une trousse, un livre, une pomme", faux: ["le cahier bleu", "un stylo et une règle", "rien du tout"] },
    justification: { question: "Que fait la voisine de Zoé ?", preuve: "Sa voisine pousse son propre cahier au milieu de la table." },
    motInconnu: { mot: "fouille", sens: "cherche en remuant tout", faux: ["ferme doucement", "jette par terre", "range en ordre"] },
    resume: "Zoé oublie son cahier, sa voisine partage le sien, et Zoé la remercie à la sortie.",
  },
];

const TEXTES_NARRATIFS = TEXTES.filter((t) => t.type === "narratif");

/** L'énoncé complet, texte compris. Le texte est TOUJOURS sous les yeux :
 *  au CE1, on ne demande pas de se souvenir, on demande de retourner au texte. */
function avecTexte(t: Texte, question: string): string {
  return `Lis ce texte :\n\n« ${t.texte} »\n\n${question}`;
}

/** Les phrases du texte, une par une : elles servent de propositions quand on
 *  demande la preuve. */
function phrasesDe(t: Texte): string[] {
  return t.texte
    .split(". ")
    .map((p) => (p.endsWith(".") ? p : `${p}.`))
    .filter((p) => p.length > 12);
}

export const comprehensionLectureBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_COMP_PERSONNAGES
  ========================================================= */
  {
    kind: "template",
    id: "ce1_comp_personnages_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce1_comp_personnages",
    difficulty: 2,
    theme: "reunion",
    hint: "Cherche le nom qui revient le plus, ou qui est repris par « il » et « elle ».",
    tags: ["ce1", "comprehension", "personnages", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      const autres = shuffle(TEXTES.filter((x) => x.personnage !== t.personnage))
        .slice(0, 3)
        .map((x) => x.personnage);
      return {
        text: avecTexte(t, "De qui, ou de quoi, parle-t-on surtout ?"),
        format: "qcm" as const,
        choices: makeChoices(t.personnage, autres),
        expected: [t.personnage],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le personnage principal est celui dont on parle le plus, du début à la fin.",
          "Compte les fois où un nom revient, ou est repris par « il », « elle », « son ».",
          `Ici, tout tourne autour de ${t.personnage}.`,
          `On parle surtout de ${t.personnage}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_COMP_ANAPHORE — le piège du BO
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_comp_anaphore_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce1_comp_anaphore",
    difficulty: 3,
    theme: "neutral",
    text: "Lis :\n\n« Le lion dort dans l'herbe haute. Il ouvre un œil. Le fauve a entendu quelque chose. Le roi de la savane se lève sans bruit. »\n\nCombien y a-t-il d'animaux dans ce texte ?",
    format: "qcm",
    choices: ["Un seul : le lion", "Deux", "Trois", "Quatre"],
    expected: ["Un seul : le lion"],
    comparator: "mcq_exact",
    hint: "« il », « le fauve », « le roi de la savane » : et si c'était toujours le même ?",
    explanation: exp(
      "Pour éviter de se répéter, un texte remplace un nom par « il », ou par un autre mot qui désigne la même chose. C'est la chaine anaphorique.",
      "À chaque nouveau mot, demande-toi : est-ce quelqu'un de nouveau, ou est-ce encore le même ?",
      "Le lion → il → le fauve → le roi de la savane. Quatre façons de nommer UN seul animal. Qui ne le voit pas croit qu'une savane entière se remplit.",
      "Il n'y a qu'un seul animal : le lion.",
    ),
    tags: ["ce1", "comprehension", "anaphore", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_comp_anaphore_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce1_comp_anaphore",
    difficulty: 3,
    theme: "reunion",
    hint: "Remonte dans le texte : de qui, ou de quoi, parlait-on juste avant ?",
    tags: ["ce1", "comprehension", "anaphore", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      return {
        text: avecTexte(t, `Dans ce texte, le mot « ${t.anaphore.mot} » désigne quoi, ou qui ?`),
        format: "qcm" as const,
        choices: makeChoices(t.anaphore.referent, t.anaphore.faux),
        expected: [t.anaphore.referent],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un texte évite de répéter : il remplace un nom par un petit mot comme « il », « elle », « le », « les », « y ».",
          "Remonte d'une phrase et demande-toi de qui on parlait. Attention : ce n'est pas toujours le nom le plus proche.",
          `Ici, « ${t.anaphore.mot} » reprend « ${t.anaphore.referent} ». Remplace-le pour vérifier : la phrase doit garder son sens.`,
          `« ${t.anaphore.mot} » désigne ${t.anaphore.referent}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_COMP_CHRONOLOGIE
  ========================================================= */
  {
    kind: "template",
    id: "ce1_comp_chronologie_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce1_comp_chronologie",
    difficulty: 2,
    theme: "reunion",
    hint: "Relis le texte du début à la fin, et repère l'ordre.",
    tags: ["ce1", "comprehension", "chronologie", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      const [a, b, c] = t.chronologie;
      const bon = `${a} → ${b} → ${c}`;
      return {
        text: avecTexte(t, "Remets ces trois moments dans l'ordre du texte."),
        format: "qcm" as const,
        choices: shuffle([
          bon,
          `${c} → ${b} → ${a}`,
          `${b} → ${a} → ${c}`,
          `${a} → ${c} → ${b}`,
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un texte raconte les choses dans un ordre. Cet ordre fait partie du sens.",
          "Cherche chaque moment dans le texte et note s'il est au début, au milieu ou à la fin.",
          `Dans le texte : ${a} Puis : ${b} Enfin : ${c}`,
          `Le bon ordre est : ${bon}`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_comp_chronologie_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce1_comp_chronologie",
    difficulty: 3,
    theme: "reunion",
    hint: "Repère d'abord le moment cité, puis regarde ce qui arrive juste après.",
    tags: ["ce1", "comprehension", "chronologie", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      const rang = randomChoice([0, 1] as const);
      const bon = t.chronologie[rang + 1];
      const autres = [
        t.chronologie[rang],
        ...shuffle(TEXTES.filter((x) => x.titre !== t.titre)).slice(0, 2).map((x) => x.chronologie[1]),
      ];
      return {
        text: avecTexte(t, `Que se passe-t-il JUSTE APRÈS ce moment : « ${t.chronologie[rang]} » ?`),
        format: "qcm" as const,
        choices: makeChoices(bon, autres),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Suivre un texte, c'est savoir ce qui vient avant et ce qui vient après.",
          "Pose ton doigt sur le moment cité, puis lis la suite sans sauter de ligne.",
          `Après « ${t.chronologie[rang]} », le texte enchaine sur « ${bon} »`,
          `Juste après, il y a : ${bon}`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_COMP_IMPLICITE — l'inférence du BO
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_comp_implicite_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce1_comp_implicite",
    difficulty: 3,
    theme: "neutral",
    text: "« J'ai pris mon parapluie avant de sortir. »\n\nQuel temps fait-il, à ton avis ?",
    format: "qcm",
    choices: ["il pleut", "il fait très chaud", "il neige", "on ne peut pas savoir"],
    expected: ["il pleut"],
    comparator: "mcq_exact",
    hint: "À quoi sert un parapluie ?",
    explanation: exp(
      "Comprendre un texte, ce n'est pas seulement lire ce qui est écrit : c'est aussi deviner ce qui ne l'est pas.",
      "Demande-toi pourquoi la personne fait ce qu'elle fait.",
      "Le mot « pluie » n'est écrit nulle part. Mais on ne prend un parapluie que pour une raison. C'est ce qu'on appelle une inférence.",
      "Il pleut.",
    ),
    tags: ["ce1", "comprehension", "inference", "remarquable", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_comp_implicite_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce1_comp_implicite",
    difficulty: 3,
    theme: "reunion",
    hint: "Ce n'est pas écrit. Mais le texte te donne un indice.",
    tags: ["ce1", "comprehension", "inference", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      return {
        text: avecTexte(t, "Qu'est-ce qui est vrai, même si ce n'est PAS écrit dans le texte ?"),
        format: "qcm" as const,
        choices: makeChoices(t.implicite.conclusion, t.implicite.faux),
        expected: [t.implicite.conclusion],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une inférence, c'est ce qu'on comprend sans que ce soit écrit.",
          "Cherche l'indice dans le texte, puis demande-toi ce qu'il t'apprend.",
          `Le texte ne dit nulle part que ${t.implicite.conclusion}. Mais « ${t.implicite.indice} » le laisse deviner.`,
          `On peut en déduire que ${t.implicite.conclusion}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_comp_implicite_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce1_comp_implicite",
    difficulty: 3,
    theme: "reunion",
    hint: "Un seul morceau du texte t'a mis sur la piste. Retrouve-le.",
    tags: ["ce1", "comprehension", "inference", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      const autres = shuffle(TEXTES.filter((x) => x.titre !== t.titre))
        .slice(0, 3)
        .map((x) => x.implicite.indice);
      return {
        text: avecTexte(
          t,
          `On devine que ${t.implicite.conclusion}. Quel morceau du texte te le fait deviner ?`,
        ),
        format: "qcm" as const,
        choices: makeChoices(t.implicite.indice, autres),
        expected: [t.implicite.indice],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une inférence s'appuie toujours sur un indice écrit, même si la conclusion, elle, ne l'est pas.",
          "Cherche le morceau de phrase qui t'a mis sur la piste, et pose ton doigt dessus.",
          `« ${t.implicite.indice} » : voilà l'indice. C'est lui qui fait deviner que ${t.implicite.conclusion}.`,
          `L'indice est « ${t.implicite.indice} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_COMP_QUESTION
  ========================================================= */
  {
    kind: "template",
    id: "ce1_comp_question_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce1_comp_question",
    difficulty: 2,
    theme: "reunion",
    hint: "La réponse est écrite dans le texte. Relis lentement.",
    tags: ["ce1", "comprehension", "question", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      return {
        text: avecTexte(t, t.question.q),
        format: "qcm" as const,
        choices: makeChoices(t.question.r, t.question.faux),
        expected: [t.question.r],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Répondre à une question sur un texte, c'est retrouver l'information DANS le texte, pas dans sa tête.",
          "Cherche les mots de la question dans le texte, puis pose ton doigt sur la réponse.",
          `La réponse se lit dans le texte : ${t.question.r}.`,
          `La réponse est : ${t.question.r}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_comp_question_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce1_comp_question",
    difficulty: 3,
    theme: "reunion",
    hint: "Trois de ces choses sont dans le texte. Une seule n'y est pas.",
    tags: ["ce1", "comprehension", "question", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      const dedans = [...new Set([t.question.r, t.personnage, t.anaphore.referent])];
      const intrus = randomChoice(
        TEXTES.filter((x) => x.titre !== t.titre)
          .map((x) => x.question.r)
          .filter((r) => !dedans.includes(r) && !t.texte.includes(r)),
      );
      return {
        text: avecTexte(t, "Qu'est-ce qui n'est PAS dans ce texte ?"),
        format: "qcm" as const,
        choices: shuffle([intrus, ...dedans]),
        expected: [intrus],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Lire, c'est vérifier ce qui est écrit, pas se souvenir de ce qu'on imagine.",
          "Cherche chaque proposition dans le texte, l'une après l'autre.",
          `${dedans.map((d) => `« ${d} »`).join(", ")} sont dans le texte. « ${intrus} », non.`,
          `Ce qui n'y est pas, c'est « ${intrus} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_COMP_JUSTIFIER — retourner au texte
  ========================================================= */
  {
    kind: "template",
    id: "ce1_comp_justifier_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce1_comp_justifier",
    difficulty: 3,
    theme: "reunion",
    hint: "Une seule phrase du texte contient la réponse. Retrouve-la mot à mot.",
    tags: ["ce1", "comprehension", "justifier", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      const autres = phrasesDe(t).filter((p) => p !== t.justification.preuve).slice(0, 3);
      return {
        text: avecTexte(
          t,
          `${t.justification.question}\n\nQuelle phrase du texte le prouve ?`,
        ),
        format: "qcm" as const,
        choices: makeChoices(t.justification.preuve, autres),
        expected: [t.justification.preuve],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Justifier, c'est montrer l'endroit du texte qui donne la réponse. On ne dit pas « je le sais », on montre.",
          "Relis chaque phrase et arrête-toi sur celle qui répond exactement à la question.",
          `« ${t.justification.preuve} » répond à la question. Les autres phrases parlent d'autre chose.`,
          `La phrase qui le prouve est « ${t.justification.preuve} »`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_COMP_MOT_INCONNU
  ========================================================= */
  {
    kind: "template",
    id: "ce1_comp_mot_inconnu_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce1_comp_mot_inconnu",
    difficulty: 3,
    theme: "reunion",
    hint: "Ne saute pas le mot. Lis ce qu'il y a autour, et devine à quoi il sert.",
    tags: ["ce1", "comprehension", "mot-inconnu", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      return {
        text: avecTexte(t, `Que veut dire le mot « ${t.motInconnu.mot} » dans ce texte ?`),
        format: "qcm" as const,
        choices: makeChoices(t.motInconnu.sens, t.motInconnu.faux),
        expected: [t.motInconnu.sens],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot inconnu ne bloque pas la lecture : le texte autour de lui donne presque toujours assez pour le comprendre.",
          "Relis la phrase entière, puis celle d'avant. Demande-toi à quoi sert la chose, ou ce qu'elle fait.",
          `Dans ce texte, « ${t.motInconnu.mot} » veut dire ${t.motInconnu.sens}. On l'a deviné sans dictionnaire.`,
          `« ${t.motInconnu.mot} », c'est ${t.motInconnu.sens}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_COMP_TITRE
  ========================================================= */
  {
    kind: "template",
    id: "ce1_comp_titre_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce1_comp_titre",
    difficulty: 3,
    theme: "reunion",
    hint: "Un titre dit de quoi parle TOUT le texte, pas seulement une phrase.",
    tags: ["ce1", "comprehension", "titre", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      return {
        text: avecTexte(t, "Quel titre irait le mieux à ce texte ?"),
        format: "qcm" as const,
        choices: makeChoices(t.titre, t.titresFaux),
        expected: [t.titre],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un titre annonce de quoi parle le texte en entier, en quelques mots.",
          "Demande-toi de quoi il est question du début à la fin — pas seulement dans la première phrase.",
          `« ${t.titre} » va bien : tout le texte en parle. Les autres titres racontent une autre histoire.`,
          `Le meilleur titre est « ${t.titre} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_COMP_RESUMER
  ========================================================= */
  {
    kind: "template",
    id: "ce1_comp_resumer_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce1_comp_resumer",
    difficulty: 3,
    theme: "reunion",
    hint: "Cherche la phrase qui dit tout le texte, sans rien inventer et sans rien oublier.",
    tags: ["ce1", "comprehension", "resumer", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      const autres = shuffle(TEXTES.filter((x) => x.titre !== t.titre))
        .slice(0, 3)
        .map((x) => x.resume);
      return {
        text: avecTexte(t, "Quelle phrase résume le mieux ce texte ?"),
        format: "qcm" as const,
        choices: makeChoices(t.resume, autres),
        expected: [t.resume],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Résumer, c'est redire l'essentiel en une phrase, sans rien ajouter et sans rien oublier d'important.",
          "Demande-toi : qui, où, et quoi ? Puis cherche la phrase qui dit ces trois choses.",
          `« ${t.resume} » : tout y est, et rien de plus.`,
          `Le bon résumé est « ${t.resume} »`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_COMP_DEFI — l'anaphore ET l'inférence dans le même texte
  ========================================================= */
  {
    kind: "template",
    id: "ce1_comp_defi_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce1_comp_defi",
    difficulty: 3,
    theme: "reunion",
    hint: "Deux choses à vérifier : qui est désigné, et ce qu'on devine.",
    tags: ["ce1", "comprehension", "defi", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      const bon = `« ${t.anaphore.mot} » désigne ${t.anaphore.referent}, et ${t.implicite.conclusion}`;
      return {
        text: avecTexte(t, "Quelle réponse est entièrement juste ?"),
        format: "qcm" as const,
        choices: shuffle([
          bon,
          `« ${t.anaphore.mot} » désigne ${t.anaphore.faux[0]}, et ${t.implicite.conclusion}`,
          `« ${t.anaphore.mot} » désigne ${t.anaphore.referent}, et ${t.implicite.faux[0]}`,
          `« ${t.anaphore.mot} » désigne ${t.anaphore.faux[1]}, et ${t.implicite.faux[1]}`,
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une réponse n'est juste que si TOUT est juste dedans.",
          "Vérifie les deux moitiés l'une après l'autre : d'abord qui est désigné, ensuite ce qu'on devine.",
          `« ${t.anaphore.mot} » reprend « ${t.anaphore.referent} », et « ${t.implicite.indice} » laisse deviner que ${t.implicite.conclusion}.`,
          `La réponse juste est : ${bon}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_comp_defi_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce1_comp_defi",
    difficulty: 3,
    theme: "reunion",
    hint: "Un bon titre et un bon résumé disent la même chose, en plus ou moins long.",
    tags: ["ce1", "comprehension", "defi", "template"],
    generate: () => {
      const t = randomChoice(TEXTES_NARRATIFS);
      const autre = randomChoice(TEXTES.filter((x) => x.titre !== t.titre));
      const bon = `titre : « ${t.titre} » — résumé : « ${t.resume} »`;
      return {
        text: avecTexte(t, "Quel couple titre + résumé va avec ce texte ?"),
        format: "qcm" as const,
        choices: shuffle([
          bon,
          `titre : « ${t.titre} » — résumé : « ${autre.resume} »`,
          `titre : « ${autre.titre} » — résumé : « ${t.resume} »`,
          `titre : « ${t.titresFaux[0]} » — résumé : « ${autre.resume} »`,
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le titre annonce, le résumé raconte. Les deux doivent parler du MÊME texte.",
          "Vérifie d'abord le titre, puis le résumé, puis relis la proposition en entier.",
          `« ${t.titre} » annonce bien ce texte, et « ${t.resume} » le raconte en une phrase.`,
          `La bonne réponse est : ${bon}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce1_comp_defi_meth_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce1_comp_defi",
    difficulty: 3,
    theme: "neutral",
    text: "« Le lion dort dans l'herbe haute. Il ouvre un œil. Le fauve a entendu quelque chose. Le roi de la savane se lève sans bruit. »\n\nIl n'y a qu'UN seul animal dans ce texte. Comment le sais-tu ?",
    format: "qcm",
    choices: [
      "« il », « le fauve » et « le roi de la savane » nomment tous le lion : personne d'autre n'est arrivé.",
      // LE piège : chaque nouveau mot est pris pour un nouveau personnage.
      "« Le fauve » et « le roi de la savane » sont deux autres animaux qui dorment aussi.",
      "Parce qu'on ne voit qu'une seule fois le mot « lion ».",
      "Parce que le texte est court.",
    ],
    expected: [
      "« il », « le fauve » et « le roi de la savane » nomment tous le lion : personne d'autre n'est arrivé.",
    ],
    comparator: "mcq_exact",
    hint: "« Le fauve » et « le roi de la savane » : de qui parle-t-on à chaque fois ?",
    explanation: exp(
      "Pour éviter de se répéter, un texte remplace un nom par « il » ou par un autre mot qui désigne la même chose.",
      "À chaque nouveau mot, demande-toi : est-ce quelqu'un de nouveau, ou est-ce encore le même ?",
      "Le lion → il → le fauve → le roi de la savane. Personne d'autre n'est arrivé : c'est le même animal, nommé quatre fois autrement.",
      "Ce sont quatre façons de nommer le lion, et rien d'autre.",
    ),
    tags: ["ce1", "comprehension", "defi", "piege", "qcm"],
  },

  /* ═══════════════════════════════════════════════════════════════════════
     LES SECONDS ITEMS (20/08/2026)
     ---------------------------------------------------------------------
     Cinq micros portaient UN SEUL item : la ligne cliquée ouvrait celle du
     voisin (ce1_comp_question, ce1_comp_anaphore, ce1_comp_defi). Chacun de
     ces seconds items prend le chemin INVERSE de son premier, et se sert des
     champs que la table TEXTES porte déjà — aucun contenu n'a été inventé.
     ═══════════════════════════════════════════════════════════════════════ */

  {
    kind: "template",
    id: "ce1_comp_personnages_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce1_comp_personnages",
    difficulty: 2,
    theme: "reunion",
    hint: "La question n'est pas QUI, mais COMMENT on le sait.",
    tags: ["ce1", "comprehension", "personnages", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      const bon = "parce qu'on en parle du début à la fin";
      return {
        text: avecTexte(
          t,
          `Le personnage principal de ce texte est ${t.personnage}.\n\nComment le sait-on ?`,
        ),
        format: "qcm" as const,
        choices: shuffle([
          bon,
          "parce que son nom est écrit en premier",
          "parce que son nom est le plus court",
          "parce qu'il est le seul à avoir un nom",
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le personnage principal n'est pas celui qui arrive le premier ni celui qui a le nom le plus joli : c'est celui dont il est question tout au long du texte.",
          "Le premier exercice demandait QUI. Celui-ci demande COMMENT on le sait : suis le nom et ses reprises (« il », « elle », « son ») de la première à la dernière phrase.",
          `Ici, ${t.personnage} est présent du début à la fin — c'est ce qui en fait le personnage principal.`,
          `${bon.charAt(0).toUpperCase()}${bon.slice(1)}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce1_comp_justifier_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce1_comp_justifier",
    difficulty: 3,
    theme: "reunion",
    hint: "La preuve est donnée. Cherche la question à laquelle elle répond.",
    tags: ["ce1", "comprehension", "justifier", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      const autres = shuffle(TEXTES.filter((x) => x.titre !== t.titre))
        .slice(0, 3)
        .map((x) => x.justification.question);
      return {
        text: avecTexte(
          t,
          `Dans le texte, on lit : « ${t.justification.preuve} »\n\nÀ quelle question cette phrase répond-elle ?`,
        ),
        format: "qcm" as const,
        choices: makeChoices(t.justification.question, autres),
        expected: [t.justification.question],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une phrase du texte ne prouve pas n'importe quoi : elle répond à UNE question précise. Savoir laquelle, c'est savoir justifier.",
          "Le premier exercice partait de la question pour trouver la preuve. Celui-ci fait l'inverse : lis la phrase, et demande-toi ce qu'elle t'apprend exactement.",
          `« ${t.justification.preuve} » répond à : ${t.justification.question}`,
          `Elle répond à : ${t.justification.question}`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce1_comp_mot_inconnu_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce1_comp_mot_inconnu",
    difficulty: 3,
    theme: "reunion",
    hint: "Le sens est donné. Retrouve le mot du texte qui le porte.",
    tags: ["ce1", "comprehension", "mot-inconnu", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      const autres = shuffle(TEXTES.filter((x) => x.titre !== t.titre))
        .slice(0, 3)
        .map((x) => x.motInconnu.mot);
      return {
        text: avecTexte(t, `Quel mot de ce texte veut dire « ${t.motInconnu.sens} » ?`),
        format: "qcm" as const,
        choices: makeChoices(t.motInconnu.mot, autres),
        expected: [t.motInconnu.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Comprendre un mot rare, c'est le relier à ce qu'il désigne — et savoir le retrouver dans le texte quand on en a besoin.",
          "Le premier exercice partait du mot pour trouver son sens. Celui-ci fait l'inverse : le sens est donné, cherche dans le texte le mot qui lui correspond. Un seul des quatre y figure.",
          `Dans ce texte, « ${t.motInconnu.mot} » veut dire ${t.motInconnu.sens}. Les trois autres mots ne sont pas dans le texte.`,
          `C'est « ${t.motInconnu.mot} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce1_comp_titre_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce1_comp_titre",
    difficulty: 3,
    theme: "reunion",
    hint: "Un titre annonce. Devine ce que le texte va raconter.",
    tags: ["ce1", "comprehension", "titre", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      const autres = shuffle(TEXTES.filter((x) => x.titre !== t.titre))
        .slice(0, 3)
        .map((x) => x.resume);
      return {
        text: `Dans un livre, tu trouves un texte intitulé « ${t.titre} ».\n\nDe quoi va-t-il parler ?`,
        format: "qcm" as const,
        choices: makeChoices(t.resume, autres),
        expected: [t.resume],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un titre annonce le texte en entier. Il sert avant la lecture : il dit ce qu'on va trouver.",
          "Le premier exercice partait du texte pour choisir le titre. Celui-ci fait l'inverse : pars du titre, et demande-toi ce qu'il promet.",
          `« ${t.titre} » annonce : ${t.resume}`,
          `Il va parler de cela : ${t.resume}`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce1_comp_resumer_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce1_comp_resumer",
    difficulty: 3,
    theme: "reunion",
    hint: "Le résumé est donné. Cherche le titre qui va avec.",
    tags: ["ce1", "comprehension", "resumer", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      return {
        text: `Voici le résumé d'un texte :\n\n« ${t.resume} »\n\nQuel titre lui convient ?`,
        format: "qcm" as const,
        choices: makeChoices(t.titre, t.titresFaux),
        expected: [t.titre],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un résumé et un titre disent la même chose, l'un en une phrase, l'autre en quelques mots. Passer de l'un à l'autre, c'est tenir l'essentiel.",
          "Le premier exercice partait du texte pour choisir le résumé. Celui-ci part du résumé : cherche le titre qui couvre tout ce qu'il dit, sans rien ajouter.",
          `« ${t.resume} » → « ${t.titre} »`,
          `Le titre est « ${t.titre} ».`,
        ),
      };
    },
  },
];
