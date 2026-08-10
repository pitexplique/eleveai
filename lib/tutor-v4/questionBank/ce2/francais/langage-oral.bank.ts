// lib/tutor-v4/questionBank/ce2/francais/langage-oral.bank.ts
//
// Le langage oral au CE2.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, CE2) :
//   — écouter et comprendre un texte ou un exposé, relier plusieurs
//     informations entendues ;
//   — reformuler une information importante ;
//   — justifier son avis, expliquer un raisonnement ;
//   — présenter un exposé de quelques minutes ;
//   — reprendre les propos d'un camarade pour avancer ;
//   — adapter son registre à la situation ;
//   — éviter les tics verbaux et varier les connecteurs.
//
// ⚠️ ON N'A NI MICRO NI OREILLE. L'oral se travaille en classe, à plusieurs, et
// un coach sur écran ne peut ni écouter un élève ni le faire parler. Ce qu'il
// peut faire, et ce qu'il fait ici : travailler le JUGEMENT sur ce qui se dit.
// Reconnaitre une bonne reformulation, distinguer un argument d'une simple
// opinion, voir ce qui fait avancer une discussion et ce qui la piétine, repérer
// un tic verbal, choisir son registre. Ce sont les décisions de celui qui parle,
// et elles se travaillent avant de prendre la parole.
//
// Les échanges rapportés ici sont écrits comme on parle vraiment en classe,
// avec les hésitations et les redites que cela suppose : c'est justement le
// matériau de la notion.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function choix(correct: string, ...reserves: readonly (readonly string[])[]): string[] {
  const vus = new Set<string>([correct]);
  const faux: string[] = [];
  for (const mot of shuffle(reserves.flat())) {
    if (vus.has(mot)) continue;
    vus.add(mot);
    faux.push(mot);
    if (faux.length === 3) break;
  }
  return shuffle([correct, ...faux]);
}

function exp(definition: string, methode: string, exemple: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Exemple : ${exemple}

Conclusion : ${conclusion}`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ÉCOUTER, RELIER, REFORMULER
   ═══════════════════════════════════════════════════════════════════════════ */

type MessageEntendu = {
  readonly message: string;
  readonly info: { readonly q: string; readonly r: string; readonly faux: readonly string[] };
  /** Ce qu'on comprend en reliant DEUX informations du message. */
  readonly conclusion: string;
  readonly conclusionsFausses: readonly string[];
  /** Une reformulation fidèle, et trois qui trahissent le message. */
  readonly reformulation: string;
  readonly reformulationsFausses: readonly string[];
};

const MESSAGES: readonly MessageEntendu[] = [
  {
    message:
      "La maitresse annonce : « La sortie au volcan est reportée à jeudi. Le car partira à sept heures, et il faut apporter un coupe-vent, parce qu'il fait froid là-haut. »",
    info: {
      q: "À quelle heure part le car ?",
      r: "à sept heures",
      faux: ["à huit heures", "à midi", "à six heures"],
    },
    conclusion: "il faudra se lever tôt jeudi, et s'habiller chaudement",
    conclusionsFausses: [
      "la sortie est annulée",
      "il fera chaud pendant toute la sortie",
      "le car partira le matin de la semaine prochaine",
    ],
    reformulation: "La sortie est jeudi, départ à sept heures, avec un coupe-vent.",
    reformulationsFausses: [
      "La sortie au volcan est annulée à cause du froid.",
      "Il faut apporter un coupe-vent pour la sortie de demain.",
      "Le car part à sept heures tous les jeudis.",
    ],
  },
  {
    message:
      "Le directeur explique : « Le ballon est resté deux jours sur le toit. Le concierge l'a récupéré jeudi. Depuis, il faut le ranger dans le placard après chaque récréation. »",
    info: {
      q: "Quand le ballon a-t-il été récupéré ?",
      r: "jeudi",
      faux: ["lundi", "au bout d'une semaine", "pendant les vacances"],
    },
    conclusion: "on veut éviter que le ballon retourne sur le toit",
    conclusionsFausses: [
      "le ballon a été jeté",
      "les récréations sont supprimées",
      "le concierge garde le ballon chez lui",
    ],
    reformulation: "Le ballon est revenu jeudi, et il faut le ranger après chaque récréation.",
    reformulationsFausses: [
      "Le ballon est perdu depuis deux jours.",
      "Le concierge range le ballon après chaque récréation.",
      "Il est interdit de jouer au ballon dans la cour.",
    ],
  },
  {
    message:
      "Nina raconte : « J'observe le nid depuis trois jours. Ce matin, il y avait trois œufs. Le maitre m'a prêté des jumelles pour que je n'approche pas de l'arbre. »",
    info: {
      q: "Combien d'œufs y avait-il ce matin ?",
      r: "trois",
      faux: ["deux", "quatre", "aucun"],
    },
    conclusion: "on ne doit pas s'approcher du nid pour ne pas déranger les oiseaux",
    conclusionsFausses: [
      "le nid est vide et abandonné",
      "Nina a pris les œufs pour les protéger",
      "le maitre a installé le nid dans l'arbre",
    ],
    reformulation: "Nina observe le nid de loin, avec des jumelles, et a compté trois œufs.",
    reformulationsFausses: [
      "Nina a grimpé à l'arbre pour compter les œufs.",
      "Le maitre observe le nid depuis trois jours.",
      "Il y a trois oiseaux dans le filao de la cour.",
    ],
  },
  {
    message:
      "Yann explique : « La mer arrache toujours le filet au même endroit, là où il frotte contre les rochers. Alors je le répare chaque soir avant de rentrer. »",
    info: {
      q: "Pourquoi le filet s'abime-t-il toujours au même endroit ?",
      r: "parce qu'il frotte contre les rochers",
      faux: ["parce qu'il est trop vieux", "parce que les poissons le déchirent", "parce qu'il est mal plié"],
    },
    conclusion: "le même problème revient tous les jours, alors il le répare tous les jours",
    conclusionsFausses: [
      "Yann change de filet chaque semaine",
      "les rochers ont été enlevés",
      "Yann ne pêche plus depuis longtemps",
    ],
    reformulation: "Le filet s'abime toujours contre les rochers, alors Yann le répare tous les soirs.",
    reformulationsFausses: [
      "Yann répare son filet quand il a le temps.",
      "La mer abime le filet à des endroits différents.",
      "Yann rentre tous les soirs sans réparer son filet.",
    ],
  },
  {
    message:
      "Papa prévient : « J'ai installé la cuve après la longue saison sèche de l'an dernier. L'eau qu'elle récupère ne se boit pas, mais elle est parfaite pour arroser. »",
    info: {
      q: "Peut-on boire l'eau de la cuve ?",
      r: "non, mais elle sert à arroser",
      faux: ["oui, après l'avoir fait bouillir", "oui, comme l'eau du robinet", "non, elle ne sert à rien"],
    },
    conclusion: "la cuve sert à ne pas manquer d'eau pour le jardin quand il ne pleut pas",
    conclusionsFausses: [
      "la cuve remplace le robinet de la cuisine",
      "il n'a pas plu depuis l'an dernier",
      "la cuve est installée devant la case",
    ],
    reformulation: "La cuve récupère l'eau de pluie pour le jardin, et cette eau ne se boit pas.",
    reformulationsFausses: [
      "La cuve fournit l'eau potable de la maison.",
      "Papa a installé la cuve pour boire l'eau de pluie.",
      "Il n'y a plus de saison sèche depuis la cuve.",
    ],
  },
  {
    message:
      "Le maitre rappelle : « Pour l'exposé de mardi, vous parlez trois minutes, avec une image à montrer. Vous avez le droit à des notes, mais pas à lire une feuille entière. »",
    info: {
      q: "Combien de temps dure l'exposé ?",
      r: "trois minutes",
      faux: ["dix minutes", "une minute", "le temps qu'on veut"],
    },
    conclusion: "il faut préparer et retenir son exposé, pas seulement l'écrire",
    conclusionsFausses: [
      "il faut apprendre l'exposé par cœur mot à mot",
      "on peut lire tout son texte à voix haute",
      "l'image remplace l'exposé",
    ],
    reformulation: "Mardi, exposé de trois minutes, avec une image et quelques notes seulement.",
    reformulationsFausses: [
      "Mardi, il faut rendre un exposé écrit de trois pages.",
      "L'exposé dure trois minutes et se lit sur une feuille.",
      "Il faut apporter une image, sans rien dire.",
    ],
  },
  {
    message:
      "La bibliothécaire explique : « Vous pouvez emprunter deux livres à la fois, pour trois semaines. Si vous les rendez en retard, vous ne pourrez plus emprunter pendant un mois. »",
    info: {
      q: "Combien de livres peut-on emprunter à la fois ?",
      r: "deux",
      faux: ["trois", "un seul", "autant qu'on veut"],
    },
    conclusion: "il vaut mieux noter la date de retour quelque part",
    conclusionsFausses: [
      "la bibliothèque est fermée pendant un mois",
      "on peut garder les livres aussi longtemps qu'on veut",
      "il faut acheter les livres qu'on rend en retard",
    ],
    reformulation: "Deux livres pour trois semaines, et un mois sans emprunt si on rend en retard.",
    reformulationsFausses: [
      "On peut emprunter deux livres par mois.",
      "Il faut rendre les livres au bout d'un mois.",
      "La bibliothèque prête trois livres pour deux semaines.",
    ],
  },
  {
    message:
      "Le maitre annonce : « La dictée de vendredi portera sur les mots de la liste 4. Il y aura aussi des accords dans le groupe nominal, mais pas de passé composé. »",
    info: {
      q: "Qu'est-ce qui ne sera PAS dans la dictée ?",
      r: "le passé composé",
      faux: ["les accords dans le groupe nominal", "les mots de la liste 4", "les majuscules"],
    },
    conclusion: "il faut réviser la liste 4 et les accords, mais pas la conjugaison au passé composé",
    conclusionsFausses: [
      "il n'y aura pas de dictée cette semaine",
      "il faut réviser toute la conjugaison",
      "la dictée porte sur la liste 5",
    ],
    reformulation: "Dictée vendredi : liste 4 et accords du groupe nominal, sans passé composé.",
    reformulationsFausses: [
      "Dictée vendredi sur toute la conjugaison.",
      "La dictée de vendredi portera sur le passé composé.",
      "Il faut apprendre la liste 4 pour lundi.",
    ],
  },
  {
    message:
      "Mamie raconte : « Quand j'étais petite, il n'y avait pas de route jusqu'au village. On montait à pied, et cela prenait la matinée entière. »",
    info: {
      q: "Comment montait-on au village ?",
      r: "à pied",
      faux: ["en car", "à cheval", "en voiture"],
    },
    conclusion: "le village était bien plus difficile à atteindre qu'aujourd'hui",
    conclusionsFausses: [
      "le village n'existait pas encore",
      "personne n'allait jamais au village",
      "la route a toujours existé",
    ],
    reformulation: "Avant, sans route, il fallait toute une matinée pour monter au village à pied.",
    reformulationsFausses: [
      "Mamie montait au village tous les matins.",
      "La route jusqu'au village prend une matinée.",
      "Il n'y a toujours pas de route jusqu'au village.",
    ],
  },
  {
    message:
      "L'entraineur prévient : « L'entrainement est déplacé au stade du Tampon. Le bus part de l'école à quatorze heures, et il ne reviendra pas vous chercher si vous le ratez. »",
    info: {
      q: "D'où part le bus ?",
      r: "de l'école",
      faux: ["du stade du Tampon", "de la mairie", "de chez l'entraineur"],
    },
    conclusion: "il faut être à l'école avant quatorze heures, sinon on ne pourra pas venir",
    conclusionsFausses: [
      "l'entrainement est annulé",
      "le bus fait plusieurs voyages",
      "on peut arriver directement au stade",
    ],
    reformulation: "Entrainement au Tampon, bus à quatorze heures depuis l'école, et pas de second départ.",
    reformulationsFausses: [
      "L'entrainement a lieu à l'école à quatorze heures.",
      "Le bus part du stade du Tampon.",
      "On peut prendre le bus suivant si on rate le premier.",
    ],
  },
  {
    message:
      "Le maitre explique : « Pour la fête, chaque classe prépare un stand. Le nôtre sera un jeu de devinettes. Il nous faut des questions, et deux élèves pour tenir le stand à tour de rôle. »",
    info: {
      q: "Quel stand prépare la classe ?",
      r: "un jeu de devinettes",
      faux: ["une buvette", "un stand de dessins", "une exposition de photos"],
    },
    conclusion: "il faut à la fois inventer des questions et se répartir les tours de garde",
    conclusionsFausses: [
      "un seul élève tiendra le stand toute la journée",
      "les questions seront données par le maitre",
      "la classe ne participe pas à la fête",
    ],
    reformulation: "Notre stand sera un jeu de devinettes : il faut des questions et deux élèves à tour de rôle.",
    reformulationsFausses: [
      "Chaque élève prépare son propre stand.",
      "Le stand de la classe est une buvette.",
      "Deux élèves prépareront toutes les questions.",
    ],
  },
  {
    message:
      "La directrice annonce : « À cause de l'alerte orange, l'école ferme à midi. Les parents ont été prévenus par message. Personne ne part seul : on attend qu'un adulte vienne vous chercher. »",
    info: {
      q: "À quelle heure l'école ferme-t-elle ?",
      r: "à midi",
      faux: ["à quatorze heures", "à seize heures trente", "elle ne ferme pas"],
    },
    conclusion: "il faudra attendre un adulte, même si on a l'habitude de rentrer seul",
    conclusionsFausses: [
      "on peut rentrer seul si on habite près",
      "les parents ne sont pas au courant",
      "l'école reste ouverte toute la journée",
    ],
    reformulation: "L'école ferme à midi à cause de l'alerte, et un adulte doit venir nous chercher.",
    reformulationsFausses: [
      "L'école ferme à midi et chacun rentre chez soi.",
      "Les parents doivent venir à seize heures trente.",
      "L'alerte orange ne change rien aux horaires.",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   ARGUMENTER, ET EXPLIQUER UNE DÉMARCHE
   ═══════════════════════════════════════════════════════════════════════════ */

type Avis = {
  readonly question: string;
  readonly argument: string;
  readonly sansRaison: readonly string[];
};

const AVIS: readonly Avis[] = [
  {
    question: "Faut-il ranger le ballon après chaque récréation ?",
    argument: "Oui, parce qu'il finit sur le toit dès qu'on l'oublie dans la cour.",
    sansRaison: ["Oui, c'est mieux.", "Non, j'ai pas envie.", "Oui, tout le monde le dit."],
  },
  {
    question: "Vaut-il mieux lire à voix haute ou dans sa tête pour préparer une lecture ?",
    argument: "À voix haute, parce qu'on entend les endroits où on bute et où il faut respirer.",
    sansRaison: ["À voix haute, c'est comme ça.", "Dans sa tête, je préfère.", "Les deux, ça revient au même."],
  },
  {
    question: "Faut-il écrire un brouillon avant de rédiger ?",
    argument: "Oui, parce qu'on peut changer l'ordre des idées sans tout recopier.",
    sansRaison: ["Oui, la maitresse l'a dit.", "Non, ça prend du temps.", "Oui, c'est plus joli."],
  },
  {
    question: "Vaut-il mieux relire sa copie ou celle du voisin ?",
    argument: "La sienne, parce que c'est là que sont les erreurs qu'on doit corriger.",
    sansRaison: ["La sienne, évidemment.", "Celle du voisin, c'est plus rapide.", "Ni l'une ni l'autre."],
  },
  {
    question: "Faut-il apprendre les mots invariables par cœur ?",
    argument: "Oui, parce qu'aucune règle ne permet de deviner comment ils s'écrivent.",
    sansRaison: ["Oui, il faut bien.", "Non, c'est trop long.", "Oui, comme les autres mots."],
  },
  {
    question: "Vaut-il mieux copier par groupes de mots ou lettre par lettre ?",
    argument: "Par groupes, parce qu'on lève les yeux moins souvent et qu'on saute moins de mots.",
    sansRaison: ["Par groupes, c'est mieux.", "Lettre par lettre, c'est plus sûr.", "Cela dépend des jours."],
  },
];

type Demarche = {
  readonly probleme: string;
  readonly explication: string;
  readonly mauvaises: readonly string[];
};

const DEMARCHES: readonly Demarche[] = [
  {
    probleme: "Comment as-tu trouvé l'infinitif de « nous sommes » ?",
    explication: "J'ai récité le verbe en entier : je suis, tu es, il est, nous sommes. C'est être.",
    mauvaises: [
      "J'ai deviné.",
      "C'est écrit dans mon cahier.",
      "J'ai enlevé la terminaison et j'ai trouvé « sommer ».",
    ],
  },
  {
    probleme: "Comment as-tu su qu'il fallait écrire « a » et non « à » ?",
    explication: "J'ai remplacé par « avait » : la phrase se disait encore, donc c'est le verbe avoir.",
    mauvaises: [
      "Parce que ça se prononce pareil.",
      "J'ai mis celui qui n'a pas d'accent, il y en a plus souvent.",
      "Mon voisin a mis « a » aussi.",
    ],
  },
  {
    probleme: "Comment as-tu trouvé le sujet dans « Dans le jardin, les enfants jouent » ?",
    explication: "J'ai demandé « Qui est-ce qui joue ? » et j'ai répondu : les enfants.",
    mauvaises: [
      "C'est le premier groupe de la phrase.",
      "C'est le mot juste avant le verbe.",
      "J'ai pris le groupe le plus long.",
    ],
  },
  {
    probleme: "Comment as-tu deviné le sens de « nasse » ?",
    explication: "La phrase disait qu'il la remontait pleine de poissons : c'est un panier pour les attraper.",
    mauvaises: [
      "Je connaissais déjà le mot.",
      "J'ai choisi la réponse la plus courte.",
      "Ça ressemble à « nager ».",
    ],
  },
  {
    probleme: "Comment as-tu su que « cheval » faisait « chevaux » ?",
    explication: "Les noms en -al font leur pluriel en -aux : cheval, journal, animal, tous pareil.",
    mauvaises: [
      "Parce que « chevals » ne se dit pas.",
      "C'est une exception, il faut la savoir.",
      "J'ai mis un x parce que ça faisait plus joli.",
    ],
  },
  {
    probleme: "Comment as-tu trouvé la lettre muette de « chant » ?",
    explication: "J'ai pensé à « chanter » : le t s'entend, donc il faut l'écrire.",
    mauvaises: [
      "J'ai mis un t au hasard.",
      "Je l'ai appris par cœur.",
      "Parce que tous les mots finissent par une lettre muette.",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   REBONDIR, REGISTRE, TICS VERBAUX
   ═══════════════════════════════════════════════════════════════════════════ */

type Echange = {
  readonly propos: string;
  readonly bonneReprise: string;
  readonly mauvaises: readonly string[];
};

const ECHANGES: readonly Echange[] = [
  {
    propos: "Un camarade dit : « Je pense que le margouillat sort surtout le soir. »",
    bonneReprise: "Tu dis qu'il sort le soir : est-ce que c'est parce que la lumière attire les insectes ?",
    mauvaises: [
      "Moi j'ai vu un margouillat une fois dans ma chambre.",
      "Non, tu te trompes.",
      "Moi je préfère parler des baleines.",
    ],
  },
  {
    propos: "Une camarade dit : « Le texte parle d'un pêcheur qui répare ses filets. »",
    bonneReprise: "Tu as raison, et il explique aussi POURQUOI ils s'abiment toujours au même endroit.",
    mauvaises: [
      "Mon oncle est pêcheur.",
      "Ce n'est pas ce que j'ai compris, mais bon.",
      "Est-ce qu'on peut passer à la suite ?",
    ],
  },
  {
    propos: "Un camarade dit : « Je ne comprends pas pourquoi on écrit « pas de margouillat ». »",
    bonneReprise: "Je peux essayer : à la forme négative, « un » devient « de ». On peut vérifier ensemble ?",
    mauvaises: [
      "C'est facile pourtant.",
      "Moi non plus je comprends pas.",
      "Il faut demander à la maitresse.",
    ],
  },
  {
    propos: "Une camarade dit : « À mon avis, il faut d'abord noter ses idées avant d'écrire. »",
    bonneReprise: "Je suis d'accord, et j'ajouterais qu'on peut aussi les numéroter pour les remettre dans l'ordre.",
    mauvaises: [
      "Moi je fais jamais de brouillon.",
      "Oui voilà.",
      "On a déjà dit ça la semaine dernière.",
    ],
  },
  {
    propos: "Un camarade dit : « Le ballon devrait rester dans la cour. »",
    bonneReprise: "Tu penses qu'il devrait rester dehors : et comment on évite qu'il reparte sur le toit ?",
    mauvaises: [
      "Non, c'est nul comme idée.",
      "Moi j'aime pas le foot.",
      "D'accord, on fait comme tu veux.",
    ],
  },
  {
    propos: "Un camarade dit : « Je trouve que le texte est triste à la fin. »",
    bonneReprise: "Tu le trouves triste : c'est à cause de la dernière phrase, ou de tout le passage ?",
    mauvaises: [
      "Moi je l'ai trouvé drôle.",
      "C'est pas triste du tout.",
      "J'ai pas fini de le lire.",
    ],
  },
  {
    propos: "Une camarade dit : « Il faudrait relire deux fois avant de rendre. »",
    bonneReprise: "Deux fois, oui — et on pourrait chercher une chose différente à chaque passage.",
    mauvaises: [
      "Moi je relis jamais.",
      "Une fois suffit largement.",
      "On n'a pas le temps de toute façon.",
    ],
  },
  {
    propos: "Un camarade dit : « Le mot “automne” a un m qu'on n'entend pas. »",
    bonneReprise: "Tu as raison, et « compter » a un p qu'on n'entend pas non plus : il y en a d'autres ?",
    mauvaises: [
      "Ah bon, je savais pas.",
      "Ce n'est pas ce que la maitresse a dit.",
      "Moi je sais déjà l'écrire.",
    ],
  },
  {
    propos: "Une camarade dit : « On devrait faire notre exposé sur les baleines. »",
    bonneReprise: "Les baleines, d'accord : on parlerait de leur voyage, ou de leur chant ?",
    mauvaises: [
      "Moi je voulais parler du volcan.",
      "Les baleines c'est bien.",
      "On verra plus tard.",
    ],
  },
  {
    propos: "Un camarade dit : « Je n'arrive pas à trouver le sujet dans cette phrase. »",
    bonneReprise: "Tu bloques sur le sujet : et si on posait « Qui est-ce qui… ? » ensemble ?",
    mauvaises: [
      "C'est pourtant le premier mot.",
      "Moi j'ai trouvé tout de suite.",
      "Demande à quelqu'un d'autre.",
    ],
  },
];

type Registre = {
  readonly situation: string;
  readonly bonne: string;
  readonly mauvaises: readonly string[];
};

const REGISTRES: readonly Registre[] = [
  {
    situation: "Tu demandes à la directrice si tu peux entrer dans son bureau.",
    bonne: "Bonjour Madame, est-ce que je peux entrer, s'il vous plait ?",
    mauvaises: ["Salut, je peux entrer ?", "J'entre.", "Vous permettez que je pénètre céans ?"],
  },
  {
    situation: "Tu demandes à ton meilleur ami de te prêter sa gomme.",
    bonne: "Tu me prêtes ta gomme ?",
    mauvaises: [
      "Auriez-vous l'obligeance de me confier votre gomme ?",
      "Gomme. Maintenant.",
      "Madame, puis-je emprunter votre gomme ?",
    ],
  },
  {
    situation: "Tu présentes ton exposé devant toute la classe.",
    bonne: "Aujourd'hui, je vais vous parler du volcan de notre ile.",
    mauvaises: [
      "Bon alors voilà, je vais parler d'un truc.",
      "Écoutez-moi bien, je commence.",
      "J'ai l'insigne honneur de vous entretenir du volcan.",
    ],
  },
  {
    situation: "Tu réponds au téléphone à quelqu'un que tu ne connais pas.",
    bonne: "Bonjour, c'est de la part de qui, s'il vous plait ?",
    mauvaises: ["Ouais ?", "C'est qui ?", "Qui ose troubler ma tranquillité ?"],
  },
  {
    situation: "Tu racontes ta journée à ta grand-mère, à table.",
    bonne: "On a fait une sortie au volcan, et il faisait très froid là-haut.",
    mauvaises: [
      "Je vous informe qu'une sortie pédagogique a eu lieu.",
      "Trop bien la sortie, on s'est gelés grave.",
      "Sortie. Volcan. Froid.",
    ],
  },
  {
    situation: "Tu demandes un renseignement à un vendeur, au marché.",
    bonne: "Bonjour, est-ce que les letchis sont de cette semaine, s'il vous plait ?",
    mauvaises: ["Eh, ils sont frais tes letchis ?", "Letchis frais ?", "Auriez-vous l'amabilité de me renseigner sur la fraicheur de vos letchis ?"],
  },
  {
    situation: "Tu t'excuses auprès d'un camarade que tu as bousculé dans la cour.",
    bonne: "Pardon, je ne t'avais pas vu. Tu n'as rien ?",
    mauvaises: ["C'est bon, j'ai pas fait exprès.", "Je vous prie de bien vouloir excuser ma maladresse.", "T'avais qu'à regarder."],
  },
  {
    situation: "Tu poses une question au maitre pendant la leçon.",
    bonne: "Maitre, je n'ai pas compris pourquoi le verbe prend un « -nt » ici.",
    mauvaises: ["J'ai rien compris.", "C'est quoi ce truc ?", "Puis-je solliciter un éclaircissement ?"],
  },
  {
    situation: "Tu proposes un jeu à des camarades pendant la récréation.",
    bonne: "Ça vous dit qu'on trace une marelle ?",
    mauvaises: ["Souhaitez-vous participer à une activité de marelle ?", "On fait une marelle, point.", "Bon, je trace une marelle, débrouillez-vous."],
  },
  {
    situation: "Tu remercies une personne âgée qui t'a laissé sa place dans le bus.",
    bonne: "Merci beaucoup Madame, c'est gentil.",
    mauvaises: ["Merci, cool.", "Je vous suis infiniment reconnaissant de votre obligeance.", "Ouais merci."],
  },
];

type Tic = {
  readonly phrase: string;
  readonly tic: string;
  readonly mieux: string;
};

const TICS: readonly Tic[] = [
  {
    phrase: "Alors euh, en fait, le margouillat, euh, il grimpe aux murs, en fait.",
    tic: "« euh » et « en fait », répétés",
    mieux: "Le margouillat grimpe aux murs grâce aux poils de ses pattes.",
  },
  {
    phrase: "Et après on est partis, et après on a marché, et après on est arrivés.",
    tic: "« et après », répété trois fois",
    mieux: "Nous sommes partis, puis nous avons marché, et nous sommes enfin arrivés.",
  },
  {
    phrase: "Voilà, donc, ben, c'est un texte qui parle de la mer, voilà.",
    tic: "« voilà », « donc », « ben » qui ne disent rien",
    mieux: "Ce texte parle de la mer et du travail des pêcheurs.",
  },
  {
    phrase: "Genre, il y avait genre trois œufs, genre bleus.",
    tic: "« genre », répété trois fois",
    mieux: "Il y avait trois œufs, d'un bleu très pâle.",
  },
  {
    phrase: "Du coup on a rangé, du coup on est sortis, du coup c'était fini.",
    tic: "« du coup », répété trois fois",
    mieux: "Nous avons rangé, puis nous sommes sortis : la journée était finie.",
  },
  {
    phrase: "Ouais alors ouais, c'était bien, ouais.",
    tic: "« ouais » qui remplace tout le propos",
    mieux: "La sortie était passionnante, surtout la fin.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   L'EXPOSÉ
   ═══════════════════════════════════════════════════════════════════════════ */

type ConseilExpose = {
  readonly situation: string;
  readonly bonne: string;
  readonly mauvaises: readonly string[];
};

const EXPOSES: readonly ConseilExpose[] = [
  {
    situation: "Tu prépares un exposé de trois minutes sur le volcan.",
    bonne: "écrire quelques notes avec les idées principales, et les regarder de temps en temps",
    mauvaises: [
      "écrire tout le texte et le lire à voix haute",
      "ne rien préparer et parler de mémoire",
      "apprendre chaque phrase par cœur, mot à mot",
    ],
  },
  {
    situation: "Tu commences ton exposé devant la classe.",
    bonne: "annoncer en une phrase de quoi tu vas parler",
    mauvaises: [
      "commencer directement par le troisième détail",
      "dire que tu n'as pas eu le temps de préparer",
      "lire le titre puis attendre les questions",
    ],
  },
  {
    situation: "Tu as trois minutes et beaucoup de choses à dire.",
    bonne: "choisir trois idées et les développer, plutôt que d'en survoler quinze",
    mauvaises: [
      "parler plus vite pour tout dire",
      "dire seulement ce qui est le plus court",
      "dépasser le temps prévu, ce n'est pas grave",
    ],
  },
  {
    situation: "Tu montres une image pendant ton exposé.",
    bonne: "montrer l'image en expliquant ce qu'on y voit, puis continuer",
    mauvaises: [
      "faire circuler l'image sans rien dire",
      "montrer l'image à la fin, quand tout est déjà dit",
      "cacher l'image jusqu'à la dernière seconde",
    ],
  },
  {
    situation: "Tu termines ton exposé.",
    bonne: "conclure en une phrase, puis proposer aux camarades de poser des questions",
    mauvaises: [
      "s'arrêter net et retourner s'assoir",
      "répéter tout ce que tu viens de dire",
      "dire que tu as fini parce que tu ne sais plus quoi dire",
    ],
  },
  {
    situation: "Un camarade te pose une question dont tu n'as pas la réponse.",
    bonne: "dire que tu ne sais pas, et proposer de chercher avant la prochaine fois",
    mauvaises: [
      "inventer une réponse pour ne pas rester bloqué",
      "faire comme si tu n'avais pas entendu",
      "répondre que la question ne compte pas",
    ],
  },
  {
    situation: "Tu t'aperçois au milieu de l'exposé que tu parles trop vite.",
    bonne: "ralentir, respirer, et repartir sur la phrase suivante",
    mauvaises: [
      "t'excuser longuement auprès de la classe",
      "recommencer l'exposé depuis le début",
      "accélérer encore pour finir plus vite",
    ],
  },
  {
    situation: "Tu prépares un exposé à deux avec un camarade.",
    bonne: "se partager les idées à l'avance, et savoir qui parle après qui",
    mauvaises: [
      "parler tous les deux en même temps",
      "laisser l'autre tout dire et écouter",
      "décider au dernier moment devant la classe",
    ],
  },
  {
    situation: "Tu ne sais pas si la classe entend bien depuis le fond.",
    bonne: "regarder le fond de la classe et parler un peu plus fort",
    mauvaises: [
      "demander toutes les deux phrases si on t'entend",
      "parler face au tableau, où c'est plus facile",
      "continuer sans t'en occuper",
    ],
  },
  {
    situation: "Tu as noté ton exposé sur une feuille entière.",
    bonne: "réécrire seulement les mots-clés sur une petite carte, pour ne pas lire",
    mauvaises: [
      "lire la feuille en entier, mais lentement",
      "apprendre la feuille par cœur mot à mot",
      "cacher la feuille et parler de mémoire, sans rien préparer",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LA BANQUE
   ═══════════════════════════════════════════════════════════════════════════ */

export const langageOralBank: TutorBankItemV4[] = [
  /* ── CE2_ORAL_ECOUTER ─────────────────────────────────────────────────── */
  {
    kind: "template",
    id: "ce2_oral_ecouter_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce2_oral_ecouter",
    difficulty: 2,
    theme: "neutral",
    hint: "L'information est dans le message. Relis-le lentement.",
    tags: ["ce2", "oral", "ecouter", "template"],
    generate: () => {
      const m = randomChoice(MESSAGES);
      return {
        text: `${m.message}\n\n${m.info.q}`,
        format: "qcm" as const,
        choices: shuffle([m.info.r, ...m.info.faux]),
        expected: [m.info.r],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Écouter, ce n'est pas seulement entendre : c'est retenir les informations utiles.",
          "Quand quelqu'un annonce quelque chose, repère tout de suite les chiffres, les jours et les objets à apporter.",
          `Ici, la réponse est : ${m.info.r}.`,
          `C'est ${m.info.r}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_oral_ecouter_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce2_oral_ecouter",
    difficulty: 3,
    theme: "neutral",
    text: "Quand la maitresse annonce une sortie, beaucoup d'élèves oublient la moitié des informations.\n\nQue peux-tu faire pour ne rien oublier ? Explique.",
    format: "open",
    expected: ["noter", "écrire", "ecrire", "répéter", "repeter", "redis", "cahier", "questions"],
    comparator: "contains_keyword",
    hint: "Pense à ce que tu fais quand quelqu'un te donne un numéro de téléphone.",
    explanation: exp(
      "Une information entendue s'efface vite : on n'en garde que deux ou trois éléments si on ne fait rien.",
      "Trois gestes : noter les chiffres et les dates, redire dans sa tête ce qu'on vient d'entendre, et poser une question si quelque chose manque.",
      "Pour une sortie, il y a toujours quatre choses : le jour, l'heure, ce qu'il faut apporter, et où l'on va. Note-les dans cet ordre.",
      "On note les informations importantes, on les redit dans sa tête, et on pose une question si quelque chose manque.",
    ),
    tags: ["ce2", "oral", "ecouter", "methode", "ouverte"],
  },

  /* ── CE2_ORAL_RELIER_INFOS ────────────────────────────────────────────── */
  {
    kind: "template",
    id: "ce2_oral_relier_infos_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce2_oral_relier_infos",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux informations du message se répondent. Lesquelles ?",
    tags: ["ce2", "oral", "relier", "template"],
    generate: () => {
      const m = randomChoice(MESSAGES);
      return {
        text: `${m.message}\n\nQu'est-ce que tu comprends en reliant DEUX informations du message ?`,
        format: "qcm" as const,
        choices: shuffle([m.conclusion, ...m.conclusionsFausses]),
        expected: [m.conclusion],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Comprendre un message, ce n'est pas retenir les informations une par une : c'est voir comment elles se répondent.",
          "Prends deux informations et demande-toi ce qu'elles donnent ensemble.",
          `Ici : ${m.conclusion}.`,
          `On comprend que ${m.conclusion}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_oral_relier_infos_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce2_oral_relier_infos",
    difficulty: 3,
    theme: "neutral",
    hint: "Dis les deux informations, puis ce qu'elles donnent ensemble.",
    tags: ["ce2", "oral", "relier", "ouverte"],
    generate: () => {
      const m = randomChoice(MESSAGES);
      return {
        text: `${m.message}\n\nQuelles informations dois-tu relier, et qu'est-ce que cela t'apprend ? Explique.`,
        format: "open" as const,
        expected: m.conclusion.split(" ").filter((w) => w.length > 4),
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Relier deux informations, c'est en tirer une conclusion que personne n'a dite à voix haute.",
          "Note les informations séparément, puis regarde ce qu'elles impliquent ensemble.",
          `Ici : ${m.conclusion}.`,
          `Cela apprend que ${m.conclusion}.`,
        ),
      };
    },
  },

  /* ── CE2_ORAL_REFORMULER ──────────────────────────────────────────────── */
  {
    kind: "template",
    id: "ce2_oral_reformuler_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce2_oral_reformuler",
    difficulty: 3,
    theme: "neutral",
    hint: "Une bonne reformulation ne change rien, elle raccourcit.",
    tags: ["ce2", "oral", "reformuler", "template"],
    generate: () => {
      const m = randomChoice(MESSAGES);
      return {
        text: `${m.message}\n\nQuelle phrase redit fidèlement l'essentiel ?`,
        format: "qcm" as const,
        choices: shuffle([m.reformulation, ...m.reformulationsFausses]),
        expected: [m.reformulation],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Reformuler, c'est redire avec ses mots ce qui vient d'être dit, sans rien ajouter ni rien déformer.",
          "Garde les informations utiles, jette les détails, et vérifie que rien n'a changé de sens.",
          `« ${m.reformulation} » : tout y est. Les autres versions ont changé un jour, une raison, ou une personne.`,
          `La bonne reformulation : « ${m.reformulation} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_oral_reformuler_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce2_oral_reformuler",
    difficulty: 3,
    theme: "neutral",
    hint: "Une phrase suffit. Garde ce qui sert, jette le reste.",
    tags: ["ce2", "oral", "reformuler", "ouverte"],
    generate: () => {
      const m = randomChoice(MESSAGES);
      return {
        text: `${m.message}\n\nRedis l'essentiel en une phrase, avec tes mots.`,
        format: "open" as const,
        expected: m.reformulation.replace(/[.,]/g, "").split(" ").filter((w) => w.length > 4),
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Une reformulation garde les informations utiles et supprime le reste, sans jamais changer le sens.",
          "Demande-toi : si je ne pouvais dire qu'une phrase à quelqu'un qui n'a rien entendu, laquelle ?",
          `Par exemple : « ${m.reformulation} »`,
          `Par exemple : ${m.reformulation}`,
        ),
      };
    },
  },

  /* ── CE2_ORAL_ARGUMENTER ──────────────────────────────────────────────── */
  {
    kind: "template",
    id: "ce2_oral_argumenter_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce2_oral_argumenter",
    difficulty: 3,
    theme: "neutral",
    hint: "Un avis avec une raison, ce n'est pas la même chose qu'un avis tout seul.",
    tags: ["ce2", "oral", "argumenter", "template"],
    generate: () => {
      const a = randomChoice(AVIS);
      return {
        text: `${a.question}\n\nQuelle réponse donne un vrai argument ?`,
        format: "qcm" as const,
        choices: shuffle([a.argument, ...a.sansRaison]),
        expected: [a.argument],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Justifier son avis, c'est dire ce qu'on pense ET pourquoi. Sans le pourquoi, ce n'est qu'une préférence.",
          "Après avoir donné ton avis, ajoute « parce que… » et termine la phrase.",
          `« ${a.argument} » — l'avis est là, et la raison aussi. Les autres réponses s'arrêtent avant la raison.`,
          `Le vrai argument : « ${a.argument} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_oral_argumenter_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce2_oral_argumenter",
    difficulty: 3,
    theme: "neutral",
    hint: "Ton avis, puis « parce que ».",
    tags: ["ce2", "oral", "argumenter", "ouverte"],
    generate: () => {
      const a = randomChoice(AVIS);
      return {
        text: `${a.question}\n\nDonne ton avis et explique pourquoi tu penses cela.`,
        format: "open" as const,
        expected: ["parce que", "car", "puisque", ...a.argument.split(" ").filter((w) => w.length > 6)],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Un avis se défend avec une raison : c'est la raison qui permet à l'autre de te répondre.",
          "Dis ce que tu penses, puis ajoute « parce que » et donne un fait, pas une préférence.",
          `Par exemple : « ${a.argument} »`,
          `Par exemple : ${a.argument}`,
        ),
      };
    },
  },

  /* ── CE2_ORAL_EXPLIQUER_DEMARCHE ──────────────────────────────────────── */
  {
    kind: "template",
    id: "ce2_oral_expliquer_demarche_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce2_oral_expliquer_demarche",
    difficulty: 3,
    theme: "neutral",
    hint: "Une vraie explication raconte ce que tu as FAIT, pas ce que tu savais.",
    tags: ["ce2", "oral", "demarche", "template"],
    generate: () => {
      const d = randomChoice(DEMARCHES);
      return {
        text: `${d.probleme}\n\nQuelle réponse explique vraiment comment on a trouvé ?`,
        format: "qcm" as const,
        choices: shuffle([d.explication, ...d.mauvaises]),
        expected: [d.explication],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Expliquer sa démarche, c'est raconter le chemin : ce qu'on a essayé, dans quel ordre, et ce qui a tranché.",
          "Commence par « J'ai… » et raconte le geste que tu as fait dans ta tête.",
          `« ${d.explication} » : on peut refaire le chemin. Les autres réponses disent le résultat, pas le chemin.`,
          `La vraie explication : « ${d.explication} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_oral_expliquer_demarche_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce2_oral_expliquer_demarche",
    difficulty: 3,
    theme: "neutral",
    hint: "Raconte ce que tu as fait dans ta tête, dans l'ordre.",
    tags: ["ce2", "oral", "demarche", "ouverte"],
    generate: () => {
      const d = randomChoice(DEMARCHES);
      return {
        text: `${d.probleme}\n\nExplique comment tu as trouvé.`,
        format: "open" as const,
        expected: ["j'ai", "remplac", "récité", "recite", "demandé", "demande", "pensé", "pense", ...d.explication.split(" ").filter((w) => w.length > 6)],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Une démarche s'explique par les gestes qu'on a faits, pas par le résultat qu'on a obtenu.",
          "Dis « J'ai… », puis raconte l'essai, la vérification, et ce qui t'a décidé.",
          `Par exemple : « ${d.explication} »`,
          `Par exemple : ${d.explication}`,
        ),
      };
    },
  },

  /* ── CE2_ORAL_EXPOSE ──────────────────────────────────────────────────── */
  {
    kind: "template",
    id: "ce2_oral_expose_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce2_oral_expose",
    difficulty: 3,
    theme: "neutral",
    hint: "Un exposé se prépare, mais ne se lit pas.",
    tags: ["ce2", "oral", "expose", "template"],
    generate: () => {
      const e = randomChoice(EXPOSES);
      return {
        text: `${e.situation}\n\nQue vaut-il mieux faire ?`,
        format: "qcm" as const,
        choices: shuffle([e.bonne, ...e.mauvaises]),
        expected: [e.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un exposé de quelques minutes se prépare avec des notes, se dit en regardant la classe, et s'arrête sur une conclusion.",
          "Trois idées développées valent mieux que quinze survolées. Et on annonce toujours ce dont on va parler.",
          `Ici, il faut ${e.bonne}.`,
          `Il vaut mieux ${e.bonne}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_oral_expose_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce2_oral_expose",
    difficulty: 3,
    theme: "neutral",
    text: "Tu dois présenter un exposé de trois minutes devant la classe.\n\nComment le prépares-tu ? Explique.",
    format: "open",
    expected: ["notes", "idées", "idees", "trois", "annonce", "conclusion", "regarder", "répète", "repete"],
    comparator: "contains_keyword",
    hint: "Il y a ce qu'on prépare avant, et ce qu'on fait au moment de parler.",
    explanation: exp(
      "Un exposé n'est ni une lecture ni une récitation : c'est une parole préparée.",
      "Choisis trois idées, écris quelques notes — pas un texte —, annonce ton sujet en une phrase, puis parle en regardant la classe.",
      "Trois minutes, c'est court : trois idées développées passent bien, quinze idées survolées ne laissent rien. Et on termine en proposant des questions.",
      "On choisit trois idées, on écrit des notes, on annonce le sujet, et on parle en regardant la classe.",
    ),
    tags: ["ce2", "oral", "expose", "methode", "ouverte"],
  },

  /* ── CE2_ORAL_REBONDIR ────────────────────────────────────────────────── */
  {
    kind: "template",
    id: "ce2_oral_rebondir_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce2_oral_rebondir",
    difficulty: 3,
    theme: "neutral",
    hint: "Une bonne réponse reprend ce que l'autre a dit, et ajoute quelque chose.",
    tags: ["ce2", "oral", "rebondir", "template"],
    generate: () => {
      const e = randomChoice(ECHANGES);
      return {
        text: `${e.propos}\n\nQuelle réponse fait AVANCER la discussion ?`,
        format: "qcm" as const,
        choices: shuffle([e.bonneReprise, ...e.mauvaises]),
        expected: [e.bonneReprise],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Rebondir, c'est reprendre les propos de l'autre pour aller plus loin — pas raconter autre chose à côté.",
          "Commence par redire ce qu'il a dit — « Tu dis que… » —, puis ajoute ta question ou ton idée.",
          `« ${e.bonneReprise} » : l'idée du camarade est reprise, et la discussion avance. Les autres réponses changent de sujet ou ferment l'échange.`,
          `La réponse qui fait avancer : « ${e.bonneReprise} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_oral_rebondir_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce2_oral_rebondir",
    difficulty: 3,
    theme: "neutral",
    hint: "Reprends ses mots d'abord, puis ajoute quelque chose.",
    tags: ["ce2", "oral", "rebondir", "ouverte"],
    generate: () => {
      const e = randomChoice(ECHANGES);
      return {
        text: `${e.propos}\n\nQue lui réponds-tu pour faire avancer la discussion ?`,
        format: "open" as const,
        expected: ["tu dis", "tu penses", "d'accord", "et si", "j'ajoute", "est-ce que", ...e.bonneReprise.split(" ").filter((w) => w.length > 6)],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Une discussion avance quand chacun s'appuie sur ce que l'autre vient de dire.",
          "Deux temps : redis ce qu'il a dit pour montrer que tu as écouté, puis ajoute une question ou une idée.",
          `Par exemple : « ${e.bonneReprise} »`,
          `Par exemple : ${e.bonneReprise}`,
        ),
      };
    },
  },

  /* ── CE2_ORAL_REGISTRE ────────────────────────────────────────────────── */
  {
    kind: "template",
    id: "ce2_oral_registre_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce2_oral_registre",
    difficulty: 3,
    theme: "neutral",
    hint: "Ni trop familier, ni trop compliqué : juste ce qui convient à la situation.",
    tags: ["ce2", "oral", "registre", "template"],
    generate: () => {
      const r = randomChoice(REGISTRES);
      return {
        text: `${r.situation}\n\nQue dis-tu ?`,
        format: "qcm" as const,
        choices: shuffle([r.bonne, ...r.mauvaises]),
        expected: [r.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Changer de registre, c'est adapter sa façon de parler à la personne et à la situation.",
          "Demande-toi deux choses : est-ce que je connais bien cette personne ? est-ce une situation ordinaire ou officielle ?",
          `Ici : « ${r.bonne} ». Ni trop familier, ni trop compliqué.`,
          `On dit : « ${r.bonne} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_oral_registre_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce2_oral_registre",
    difficulty: 3,
    theme: "neutral",
    hint: "Il n'y a pas de bonne façon de parler « en général » : cela dépend de la situation.",
    tags: ["ce2", "oral", "registre", "ouverte"],
    generate: () => {
      const r = randomChoice(REGISTRES);
      return {
        text: `${r.situation}\n\nÉcris ce que tu dirais, et explique pourquoi tu parles comme ça.`,
        format: "open" as const,
        expected: ["poli", "adulte", "connais", "situation", "école", "ecole", "copain", "ami", ...r.bonne.split(" ").filter((w) => w.length > 5)],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Le registre se choisit selon la personne à qui l'on parle et l'endroit où l'on est.",
          "Avec un adulte qu'on connait peu : on dit bonjour, on vouvoie, on ajoute « s'il vous plait ». Avec un copain : on peut aller droit au but.",
          `Par exemple : « ${r.bonne} »`,
          `Par exemple : ${r.bonne}`,
        ),
      };
    },
  },

  /* ── CE2_ORAL_TICS_VERBAUX ────────────────────────────────────────────── */
  {
    kind: "template",
    id: "ce2_oral_tics_verbaux_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce2_oral_tics_verbaux",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche le mot qui revient et qui n'apporte rien.",
    tags: ["ce2", "oral", "tics", "template"],
    generate: () => {
      const t = randomChoice(TICS);
      const autres = shuffle(TICS.filter((x) => x.tic !== t.tic)).map((x) => x.tic);
      return {
        text: `Un camarade dit :\n\n« ${t.phrase} »\n\nQu'est-ce qui gêne dans sa façon de parler ?`,
        format: "qcm" as const,
        choices: choix(t.tic, autres),
        expected: [t.tic],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un tic verbal est un mot qu'on répète sans s'en apercevoir et qui n'apporte rien : euh, en fait, genre, du coup, voilà.",
          "Enlève le mot et relis la phrase : si le sens ne change pas, c'était un tic.",
          `Ici : ${t.tic}. On peut dire la même chose ainsi : « ${t.mieux} »`,
          `Ce qui gêne : ${t.tic}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_oral_tics_verbaux_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce2_oral_tics_verbaux",
    difficulty: 3,
    theme: "neutral",
    hint: "La bonne version dit la même chose, en mieux dit.",
    tags: ["ce2", "oral", "tics", "template"],
    generate: () => {
      const t = randomChoice(TICS);
      const autres = shuffle(TICS.filter((x) => x.mieux !== t.mieux)).map((x) => x.mieux);
      return {
        text: `« ${t.phrase} »\n\nComment dire la même chose, sans les mots qui reviennent ?`,
        format: "qcm" as const,
        choices: choix(t.mieux, [t.phrase], autres),
        expected: [t.mieux],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Remplacer un tic verbal ne veut pas dire parler comme un livre : cela veut dire dire quelque chose à la place.",
          "Là où revenait « et après », mets un vrai connecteur : puis, ensuite, alors, enfin.",
          `${t.tic} → « ${t.mieux} ». Même sens, et cette fois le lien entre les idées est dit.`,
          `On peut dire : « ${t.mieux} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_oral_tics_verbaux_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce2_oral_tics_verbaux",
    difficulty: 3,
    theme: "neutral",
    hint: "Ne te contente pas d'enlever le mot : mets autre chose à la place.",
    tags: ["ce2", "oral", "tics", "ouverte"],
    generate: () => {
      const t = randomChoice(TICS);
      return {
        text: `« ${t.phrase} »\n\nRécris cette phrase pour qu'elle soit plus claire, et dis ce que tu as enlevé.`,
        format: "open" as const,
        expected: [...t.tic.split(" ").filter((w) => w.length > 3), "répète", "repete", "connecteur", "puis", "ensuite"],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Les tics verbaux remplissent les silences pendant qu'on cherche ses mots. On les enlève en préparant ce qu'on va dire.",
          "Repère le mot qui revient, supprime-le, et mets un vrai connecteur si le lien manquait.",
          `${t.tic} → « ${t.mieux} »`,
          `Par exemple : ${t.mieux}`,
        ),
      };
    },
  },

  /* ── CE2_ORAL_DEFI ────────────────────────────────────────────────────── */
  {
    kind: "template",
    id: "ce2_oral_defi_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce2_oral_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux choses en même temps : reprendre ce qu'il a dit, et donner une raison.",
    tags: ["ce2", "oral", "defi", "template"],
    generate: () => {
      const e = randomChoice(ECHANGES);
      const a = randomChoice(AVIS);
      return {
        text: `${e.propos}\n\nTu veux à la fois montrer que tu as écouté ET donner une raison. Quelle réponse fait les deux ?`,
        format: "qcm" as const,
        choices: shuffle([e.bonneReprise, ...e.mauvaises.slice(0, 2), a.sansRaison[0]]),
        expected: [e.bonneReprise],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une bonne prise de parole fait deux choses à la fois : elle s'appuie sur ce qui vient d'être dit, et elle apporte quelque chose.",
          "Redis d'abord l'idée de l'autre, puis ajoute ta question ou ta raison.",
          `« ${e.bonneReprise} » fait les deux. Les autres réponses en oublient une, ou les deux.`,
          `La réponse : « ${e.bonneReprise} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_oral_defi_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce2_oral_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Trois choses : ce que tu as retenu, ton avis, et pourquoi.",
    tags: ["ce2", "oral", "defi", "ouverte"],
    generate: () => {
      const m = randomChoice(MESSAGES);
      return {
        text: `${m.message}\n\nRedis l'essentiel en une phrase, puis dis ce que tu en penses et pourquoi.`,
        format: "open" as const,
        expected: [
          "parce que",
          "car",
          ...m.reformulation.replace(/[.,]/g, "").split(" ").filter((w) => w.length > 5),
        ],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Prendre la parole, c'est souvent enchainer deux gestes : reformuler ce qu'on a entendu, puis donner son avis motivé.",
          "D'abord l'essentiel en une phrase. Ensuite « je pense que… parce que… ».",
          `Par exemple : « ${m.reformulation} » puis ton avis, avec un « parce que ».`,
          `Par exemple : ${m.reformulation}`,
        ),
      };
    },
  },
];
