// lib/tutor-v4/questionBank/ce2/francais/devenir-lecteur.bank.ts
//
// NOTION NEUVE, créée le 12/08/2026, en même temps que celle du CE1. « Devenir
// lecteur » est l'un des QUATRE objectifs de Lecture du BO du cycle 2 — avec
// identifier les mots, lire à voix haute et comprendre un texte. Il n'existait
// ni au CE1 ni au CE2.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours élémentaire deuxième année) :
//   « Lire de manière autonome 5 à 10 œuvres complètes et variées issues du
//   patrimoine et de la littérature de jeunesse (albums, romans, contes,
//   fables, poèmes, pièces de théâtre et documentaires) » ; « Relier ses
//   lectures à son expérience personnelle, être en mesure d'établir des liens
//   entre ses différentes lectures (mise en réseau) » ; « Fréquenter des lieux
//   de lecture régulièrement et rencontrer des acteurs du livre ».
//   Exemples de réussite : « Il connait les caractéristiques de
//   personnages-types de plus en plus diversifiés ; il dispose de références
//   construites sur des réseaux de textes » ; « Il différencie les
//   caractéristiques des genres et types les plus courants : poésie, théâtre,
//   récit (policier, d'aventure, etc.) » ; « Il consigne ses expériences de
//   lecture dans un carnet de lecteur » ; « Il lit en classe, fréquente des
//   lieux de lecture ».
//
// CE QUI CHANGE DEPUIS LE CE1, et pourquoi ce n'est pas la même banque :
//   — le CE1 apprend à SUIVRE une œuvre (marque-page, table des matières,
//     quatrième de couverture) ; le CE2 la lit SEUL, et doit tenir la distance
//     sans qu'un adulte relance ;
//   — le CE1 reconnait le conte et la fable ; le CE2 différencie les GENRES DU
//     RÉCIT, que le BO nomme : policier, aventure — et, dans le prolongement,
//     fantastique et historique ;
//   — le CE1 trouve un point commun entre deux lectures ; le CE2 CHOISIT la
//     lecture qui fera réseau avec la précédente, et dit pourquoi ;
//   — le carnet de lecteur n'apparait qu'au CE2 dans le BO.
//
// ⛔ ON N'INTERROGE JAMAIS UNE ŒUVRE PRÉCISE. Les cinq à dix livres de l'année
// sont choisis par le professeur ; le coach n'a rien fait lire. Les extraits
// sont écrits ici, courts, et portent la marque de leur genre sans caricature.
//
// ⚠️ Tables typées à la main, jamais en `as const` : leurs champs se comparent
// entre eux, et des types littéraux font casser le build à la compilation.

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

type Genre = "policier" | "aventure" | "fantastique" | "historique" | "quotidien";
type Extrait = { readonly genre: Genre; readonly extrait: string; readonly marque: string };
type TypePerso = { readonly type: string; readonly indices: string };
type Reseau = { readonly lu: string; readonly bon: string; readonly faux: readonly string[] };
/** `question` n'est là que pour les lignes dont la réponse n'est PAS un geste :
 *  « c'est sa cote », « c'est le classement », « ce sont l'auteur et
 *  l'illustrateur » ne répondent pas à « Que fais-tu ? ». Mesuré en lisant les
 *  tirages : cinq lignes de `LIEUX` posaient la mauvaise question. */
type Situation = {
  readonly situation: string;
  readonly question?: string;
  readonly bon: string;
  readonly faux: readonly string[];
};

/** Assemble l'énoncé : la question propre à la ligne, celle qu'elle porte déjà,
 *  ou « Que fais-tu ? » par défaut. */
function enonceDe(s: Situation): string {
  if (s.question) return `${s.situation}\n\n${s.question}`;
  if (s.situation.endsWith("?")) return s.situation;
  return `${s.situation}\n\nQue fais-tu ?`;
}

const LABEL_GENRE: Record<Genre, string> = {
  policier: "un récit policier",
  aventure: "un récit d'aventure",
  fantastique: "un récit fantastique",
  historique: "un récit historique",
  quotidien: "un récit de la vie de tous les jours",
};

/** Le personnage que le genre fait attendre. Sert au défi, qui demande les
 *  deux dans la même réponse : le genre reconnu ET ce qu'il annonce. */
const ATTENDU: Record<Genre, string> = {
  policier: "on y attend un enquêteur, qui ne croit personne sur parole",
  aventure: "on y attend un guide, qui connait le chemin qu'on ne connait pas",
  fantastique: "on y attend un double, ou un reflet qui n'obéit plus",
  historique: "on y attend un témoin, qui raconte ce qu'il a vu de ses yeux",
  quotidien: "on y attend un confident, à qui l'on dit ce qu'on ne dit à personne",
};

const TOUS_LABELS: readonly string[] = Object.values(LABEL_GENRE);

/* =============================================================================
   LES GENRES DU RÉCIT
   ---------------------------------------------------------------------------
   Un genre ne se reconnait pas au sujet mais à la QUESTION que le récit pose.
   Le policier demande « qui, et comment ? ». L'aventure demande « y
   arrivera-t-il ? ». Le fantastique demande « est-ce que je vois bien ce que
   je vois ? ». L'historique demande « comment vivait-on alors ? ». Le récit du
   quotidien demande « comment fait-on avec ce qui arrive à tout le monde ? ».
   ========================================================================== */

const EXTRAITS: readonly Extrait[] = [
  /* ── POLICIER ───────────────────────────────────────────────────────────── */
  {
    genre: "policier",
    extrait: "La vitrine était intacte, la porte fermée à clé, et pourtant le tableau avait disparu. L'inspecteur nota l'heure, puis demanda qui possédait un double.",
    marque: "quelque chose a été commis, et on cherche qui et comment",
  },
  {
    genre: "policier",
    extrait: "Trois personnes se trouvaient dans la maison ce soir-là. Deux racontent la même chose. La troisième se trompe d'une heure, et c'est cela qui la trahit.",
    marque: "on compare les témoignages pour trouver celui qui ne tient pas",
  },
  {
    genre: "policier",
    extrait: "Sur le sable, une seule trace de pas allait vers la mer. Aucune n'en revenait. Le gendarme s'accroupit et mesura l'écart entre deux empreintes.",
    marque: "un indice matériel est examiné de près, comme une preuve",
  },
  /* ── AVENTURE ───────────────────────────────────────────────────────────── */
  {
    genre: "aventure",
    extrait: "La carte s'arrêtait au bord du volcan. Au-delà, plus de chemin : seulement une ligne tracée à la main et trois mots effacés par la pluie.",
    marque: "on part vers un endroit qu'on ne connait pas, et le danger est devant",
  },
  {
    genre: "aventure",
    extrait: "Le bateau prit la mer avant l'aube. Personne à bord ne savait ce qu'il y avait de l'autre côté du récif, et c'est pour cela qu'ils y allaient.",
    marque: "un départ vers l'inconnu, choisi",
  },
  {
    genre: "aventure",
    extrait: "Il lui restait deux jours de vivres, une corde usée, et huit cents mètres de paroi au-dessus de lui.",
    marque: "un obstacle énorme, et des moyens qui suffisent à peine",
  },
  /* ── FANTASTIQUE ────────────────────────────────────────────────────────── */
  {
    genre: "fantastique",
    extrait: "L'horloge du couloir sonna treize coups. Quand elle se retourna, l'escalier n'était plus là où il aurait dû être.",
    marque: "quelque chose d'impossible arrive dans un endroit ordinaire",
  },
  {
    genre: "fantastique",
    extrait: "Chaque nuit, le dessin du cahier avait bougé d'un trait. Personne n'était entré dans la chambre, et la fenêtre restait fermée.",
    marque: "on cherche une explication normale, et il n'y en a pas",
  },
  {
    genre: "fantastique",
    extrait: "Le miroir renvoyait la pièce, les meubles, la fenêtre — tout, sauf lui.",
    marque: "le monde de tous les jours se met à désobéir à ses propres règles",
  },
  /* ── HISTORIQUE ─────────────────────────────────────────────────────────── */
  {
    genre: "historique",
    extrait: "Ce 20 décembre 1848, sur l'île, on lut à voix haute le texte qui abolissait l'esclavage. La foule écoutait sans un mot.",
    marque: "cela s'est vraiment passé, à une date qu'on peut nommer",
  },
  {
    genre: "historique",
    extrait: "Le jour où le premier train entra en gare, la ville entière s'était rangée le long des rails pour le voir passer.",
    marque: "le récit se place à une époque qui n'est plus la nôtre",
  },
  {
    genre: "historique",
    extrait: "Les enfants de l'atelier travaillaient douze heures par jour. L'école n'était pas encore obligatoire pour eux.",
    marque: "on montre comment on vivait autrefois, et ce qui a changé depuis",
  },
  /* ── VIE DE TOUS LES JOURS ──────────────────────────────────────────────── */
  {
    genre: "quotidien",
    extrait: "Léa change d'école au milieu de l'année. Le premier matin, elle ne connait personne, et la cour lui parait immense.",
    marque: "il n'arrive rien d'extraordinaire, et pourtant tout est difficile",
  },
  {
    genre: "quotidien",
    extrait: "Son père a perdu son travail en mars. Depuis, on ne parle plus d'argent à table, et cela s'entend.",
    marque: "une situation que beaucoup d'enfants connaissent, racontée de près",
  },
];

/* =============================================================================
   LES PERSONNAGES-TYPES — « de plus en plus diversifiés »
   ---------------------------------------------------------------------------
   Au CP, ce sont le loup, l'ogre, la fée. Au CE2, ce sont des RÔLES : celui qui
   sait, celui qui trahit, celui qui écoute. Ils ne se reconnaissent plus à ce
   qu'ils ont, mais à ce qu'ils font pour l'histoire.
   ========================================================================== */

const TYPES_PERSO: readonly TypePerso[] = [
  { type: "l'enquêteur", indices: "il remarque ce que personne ne voit, et il ne croit personne sur parole" },
  { type: "le traitre", indices: "il est du côté du héros pendant tout le début, et c'est lui qui le vend" },
  { type: "le confident", indices: "il ne fait presque rien, mais c'est à lui que le héros dit ce qu'il ne dit à personne" },
  { type: "le maitre", indices: "il a déjà fait le chemin, il apprend au héros ce qu'il sait, puis il s'efface" },
  { type: "le rival", indices: "il veut exactement la même chose que le héros, et il n'est pas méchant pour autant" },
  { type: "le héros malgré lui", indices: "il n'a rien demandé, et l'aventure vient le chercher chez lui" },
  { type: "le guide", indices: "il connait le chemin, il fait traverser, et il ne va pas plus loin" },
  { type: "le témoin", indices: "il n'agit pas : il raconte ce qu'il a vu de ses yeux, et c'est par lui qu'on sait" },
  { type: "le farceur", indices: "il se moque de tout, y compris du danger, et il fait rire quand la peur monte" },
  { type: "le double", indices: "il ressemble au héros à s'y méprendre, et il fait ce que le héros n'oserait pas" },
  { type: "l'enquêteur", indices: "il pose la question que tout le monde avait oublié de poser" },
  { type: "le maitre", indices: "il parle peu, et ce qu'il a dit au début sert deux cents pages plus loin" },
  { type: "le traitre", indices: "il connait le plan parce qu'on le lui a confié, et il le donne à l'autre camp" },
  { type: "le héros malgré lui", indices: "il refuse trois fois de partir, puis il part quand même" },
];

const TOUS_TYPES: readonly string[] = [...new Set(TYPES_PERSO.map((t) => t.type))];

/* =============================================================================
   LA MISE EN RÉSEAU — choisir la lecture suivante, et dire pourquoi
   ---------------------------------------------------------------------------
   Le CE1 trouve un point commun entre deux lectures qu'on lui donne. Le CE2
   choisit LUI-MÊME celle qui fera réseau. La réponse comporte toujours deux
   morceaux : le livre, et la raison. Les pièges proposent de vrais livres —
   c'est la raison qui ne tient pas.
   ========================================================================== */

const RESEAU: readonly Reseau[] = [
  {
    lu: "un récit où un enfant découvre que le voisin qu'on croyait dangereux protégeait tout le quartier",
    bon: "un autre récit où l'on se trompe sur quelqu'un, parce que les deux montrent comment on juge trop vite",
    faux: [
      "un documentaire sur les quartiers de la ville, parce qu'il y est aussi question de voisins",
      "un récit qui se passe dans la même rue, parce que le décor est le même",
      "un livre où il y a aussi un enfant, parce que le héros a le même âge",
    ],
  },
  {
    lu: "un récit policier où le coupable est celui qu'on soupçonnait le moins",
    bon: "un autre récit où la vérité arrive par surprise, parce que les deux jouent avec ce que le lecteur croit savoir",
    faux: [
      "un documentaire sur la police, parce qu'il y est question d'enquêtes",
      "un récit où il y a aussi un vol, parce que c'est le même délit",
      "un récit qui fait le même nombre de pages, parce qu'il se lit en autant de soirs",
    ],
  },
  {
    lu: "un conte où le héros reçoit un objet à n'ouvrir qu'au pire moment",
    bon: "un autre conte où une aide est donnée à l'avance, parce que les deux préparent le sauvetage bien avant le danger",
    faux: [
      "un documentaire sur les objets anciens, parce qu'il y est question d'objets",
      "un conte qui se passe aussi dans une forêt, parce que le lieu est le même",
      "un conte du même pays, parce qu'il vient du même endroit",
    ],
  },
  {
    lu: "un récit où une famille quitte son île pour aller vivre ailleurs",
    bon: "un autre récit où l'on doit tout recommencer dans un endroit inconnu, parce que les deux racontent ce que coute un départ",
    faux: [
      "un documentaire sur les îles, parce qu'il y est aussi question d'îles",
      "un récit qui parle d'un avion, parce qu'on y voyage aussi",
      "un récit où il y a une famille, parce qu'il y a aussi des parents",
    ],
  },
  {
    lu: "une fable où le rusé obtient par la parole ce qu'il n'aurait pas eu par la force",
    bon: "un récit où quelqu'un se fait avoir par un beau discours, parce que les deux montrent la même arme : les mots",
    faux: [
      "un documentaire sur les renards, parce qu'il y est question du même animal",
      "une fable où il y a aussi un oiseau, parce que c'est le même animal",
      "une fable qui tient en dix lignes, parce qu'elle est aussi courte",
    ],
  },
  {
    lu: "un récit d'aventure où le héros n'arrive au bout que grâce à quelqu'un qu'il avait aidé au début",
    bon: "un autre récit où un service rendu revient bien plus tard, parce que les deux montrent qu'un geste ancien décide de la fin",
    faux: [
      "un documentaire sur la montagne, parce que l'aventure s'y passe aussi",
      "un récit avec le même moyen de transport, parce qu'on y voyage pareil",
      "un récit qui finit bien, parce que les deux finissent bien",
    ],
  },
  {
    lu: "un récit où un enfant garde un secret trop lourd pour lui",
    bon: "un autre récit où l'on se tait par peur de faire de la peine, parce que les deux montrent ce que coute le silence",
    faux: [
      "un documentaire sur les secrets d'État, parce qu'il y est aussi question de secrets",
      "un récit où l'enfant a le même prénom, parce que c'est le même prénom",
      "un récit où il y a aussi une grand-mère, parce qu'un personnage se ressemble",
    ],
  },
  {
    lu: "un récit historique où des enfants travaillaient au lieu d'aller à l'école",
    bon: "un autre récit d'une époque où les enfants n'avaient pas les mêmes droits, parce que les deux font mesurer ce qui a changé",
    faux: [
      "un documentaire sur les usines d'aujourd'hui, parce qu'on y travaille aussi",
      "un récit qui se passe aussi en hiver, parce que la saison est la même",
      "un récit avec des enfants, parce que ce sont aussi des enfants",
    ],
  },
  {
    lu: "un récit fantastique où un objet ordinaire se met à agir tout seul",
    bon: "un autre récit où le monde de tous les jours désobéit à ses règles, parce que les deux font douter de ce qu'on voit",
    faux: [
      "un documentaire sur les illusions d'optique, parce qu'on y est aussi trompé",
      "un récit où il y a aussi un miroir, parce que c'est le même objet",
      "un récit qui fait peur, parce que les deux font peur",
    ],
  },
  {
    lu: "un récit où le héros refuse trois fois de partir, puis part",
    bon: "un autre récit où l'on finit par accepter ce qu'on refusait, parce que les deux racontent le même retournement",
    faux: [
      "un documentaire sur les voyages, parce qu'il y est aussi question de partir",
      "un récit où l'on part aussi en bateau, parce que le moyen est le même",
      "un récit divisé en trois parties, parce qu'il y a aussi trois fois quelque chose",
    ],
  },
  {
    lu: "un poème qui décrit la mer sans jamais la nommer",
    bon: "un autre poème qui fait deviner son sujet, parce que les deux demandent au lecteur de chercher ce dont on parle",
    faux: [
      "un documentaire sur la mer, parce qu'il parle du même sujet",
      "un poème qui rime pareil, parce que les sons se ressemblent",
      "un poème de la même longueur, parce qu'il a autant de vers",
    ],
  },
  {
    lu: "un récit où deux amis se fâchent, puis se retrouvent sans jamais s'expliquer",
    bon: "un autre récit où l'on se réconcilie sans mettre de mots dessus, parce que les deux montrent ce qui se répare en silence",
    faux: [
      "un documentaire sur l'amitié, parce qu'il traite du même sujet",
      "un récit où les amis ont le même âge, parce qu'ils ont le même âge",
      "un récit qui se passe pendant les vacances, parce que c'est la même saison",
    ],
  },
];

/* =============================================================================
   RELIER À SON EXPÉRIENCE — et la limite de ce geste
   ---------------------------------------------------------------------------
   Le BO demande de « relier ses lectures à son expérience personnelle ». Ce
   qu'on a vécu AIDE à comprendre un personnage ; cela ne remplace jamais ce
   que le texte dit. Les deux moitiés comptent, et la seconde est celle qu'on
   oublie.
   ========================================================================== */

const EXPERIENCE: readonly Situation[] = [
  {
    situation: "Dans le livre, un personnage change d'école et ne connait personne. Toi aussi, tu as déjà été le nouveau.",
    bon: "tu te sers de ce que tu as ressenti pour comprendre ce qu'il ressent",
    faux: ["tu décides qu'il ressent exactement la même chose que toi", "tu arrêtes de lire parce que cela te rappelle un mauvais moment", "tu racontes ton histoire à la place de la sienne"],
  },
  {
    situation: "Le personnage se met en colère, et toi, à sa place, tu aurais pleuré.",
    bon: "tu notes la différence : c'est elle qui t'apprend quelque chose sur lui",
    faux: ["tu décides que l'auteur s'est trompé", "tu lis comme s'il avait pleuré", "tu conclus que le personnage est mal fait"],
  },
  {
    situation: "Le livre se passe dans un pays que tu ne connais pas du tout.",
    bon: "tu cherches ce qui ressemble quand même à ce que tu connais : l'école, la peur, l'attente",
    faux: ["tu décides que tu ne peux pas comprendre", "tu imagines que c'est exactement comme chez toi", "tu ne lis que les passages qui parlent d'ici"],
  },
  {
    situation: "Tu reconnais dans le livre un endroit qui ressemble à celui où tu vis.",
    bon: "tu le notes, et tu regardes ce que l'auteur en dit que tu n'avais pas remarqué",
    faux: ["tu corriges le livre avec ce que tu sais", "tu sautes ce passage puisque tu connais déjà", "tu décides que l'auteur habite chez toi"],
  },
  {
    situation: "Un personnage fait quelque chose que tu trouves injuste.",
    bon: "tu cherches dans le texte ce qui explique son geste, avant de juger",
    faux: ["tu arrêtes de le suivre", "tu décides que c'est le méchant", "tu changes la fin dans ta tête"],
  },
  {
    situation: "Tu as vécu la même chose que le personnage, mais cela s'est terminé autrement.",
    bon: "tu compares les deux fins : c'est ce qui te fait comprendre les deux",
    faux: ["tu écris que l'histoire est fausse", "tu ne finis pas le livre", "tu racontes ta fin à la classe comme si c'était celle du livre"],
  },
  {
    situation: "Le livre parle d'un métier que fait quelqu'un de ta famille.",
    bon: "tu vérifies dans le texte ce que le livre en montre, et tu dis en quoi cela se ressemble ou non",
    faux: ["tu expliques à la classe que le livre a tout faux", "tu sautes ces pages", "tu remplaces le personnage par ton parent"],
  },
  {
    situation: "Une scène te fait rire alors que personne d'autre ne rit dans la classe.",
    bon: "tu dis pourquoi elle t'a fait rire : ton avis vaut la peine d'être expliqué",
    faux: ["tu fais semblant de ne pas avoir ri", "tu décides que les autres n'ont rien compris", "tu ne le dis à personne"],
  },
  {
    situation: "Tu comprends un personnage mieux que les autres élèves, parce que tu as vécu quelque chose de proche.",
    bon: "tu expliques ce que tu as compris, en montrant ce qui, dans le texte, te le fait dire",
    faux: ["tu gardes ton idée pour toi", "tu dis que c'est comme ça et c'est tout", "tu racontes ce que tu as vécu, sans parler du livre"],
  },
  {
    situation: "Le personnage a peur d'une chose qui ne te fait pas peur du tout.",
    bon: "tu cherches ce que le texte dit de sa peur : on peut comprendre une peur sans la partager",
    faux: ["tu décides qu'il est peureux", "tu passes ce passage", "tu décides que la peur est inventée"],
  },
  {
    situation: "Rien dans ta vie ne ressemble à ce livre.",
    bon: "tu le lis quand même : les livres servent aussi à vivre ce qu'on ne vivra pas",
    faux: ["tu en prends un autre", "tu lis seulement le résumé", "tu attends d'être plus grand"],
  },
  {
    situation: "Tu retrouves dans un livre un sentiment que tu n'avais jamais su nommer.",
    bon: "tu notes le mot ou la phrase : le livre vient de te donner de quoi le dire",
    faux: ["tu passes vite", "tu décides que c'est trop compliqué", "tu changes le mot pour un plus simple"],
  },
  {
    situation: "Un camarade dit qu'il a compris le livre autrement que toi.",
    bon: "tu lui demandes ce qui, dans le texte, le lui fait dire",
    faux: ["tu lui dis qu'il a tort", "tu changes d'avis tout de suite", "tu arrêtes d'en parler"],
  },
  {
    situation: "Le livre raconte une époque où l'on vivait très différemment.",
    bon: "tu compares avec aujourd'hui : c'est l'écart qui te fait comprendre les deux",
    faux: ["tu juges les gens d'alors avec ce que tu sais aujourd'hui", "tu décides que rien n'a changé", "tu ne lis que ce qui ressemble à ta vie"],
  },
];

/* =============================================================================
   LE CARNET DE LECTEUR — « il consigne ses expériences de lecture »
   ========================================================================== */

const CARNET: readonly Situation[] = [
  {
    situation: "À quoi sert un carnet de lecteur ?",
    bon: "à garder la trace de ce qu'on a lu, et de ce qu'on en a pensé",
    faux: ["à prouver au professeur qu'on a lu", "à résumer chaque livre en entier", "à noter les livres qu'il faudra acheter"],
  },
  {
    situation: "Tu commences une page de carnet pour un livre.",
    bon: "tu écris le titre, l'auteur, et la date où tu l'as lu",
    faux: ["tu écris seulement le titre", "tu écris le nombre de pages", "tu écris le prix du livre"],
  },
  {
    situation: "Une phrase du livre t'a frappé.",
    bon: "tu la recopies exactement, avec la page où tu l'as trouvée",
    faux: ["tu la réécris avec tes mots", "tu la retiens par cœur, sans l'écrire", "tu recopies toute la page"],
  },
  {
    situation: "Tu veux écrire ton avis dans le carnet.",
    bon: "tu dis ce que tu as pensé, et un moment précis du livre qui l'explique",
    faux: ["tu écris « super »", "tu mets une note sur dix", "tu écris ce qu'en pense la classe"],
  },
  {
    situation: "Une question est restée sans réponse à la fin du livre.",
    bon: "tu l'écris : elle servira quand tu en parleras, ou quand tu reliras",
    faux: ["tu l'oublies", "tu inventes une réponse", "tu écris que le livre est mal fait"],
  },
  {
    situation: "Ce livre te fait penser à un autre que tu as lu en début d'année.",
    bon: "tu écris lequel, et ce qui les relie",
    faux: ["tu écris seulement son titre", "tu déchires l'ancienne page", "tu recommences un carnet neuf"],
  },
  {
    situation: "Tu n'as pas aimé le livre.",
    bon: "tu l'écris quand même, en disant ce qui ne t'a pas plu",
    faux: ["tu ne fais pas de page", "tu écris que tu as aimé", "tu arraches la page"],
  },
  {
    situation: "Tu relis ton carnet six mois plus tard.",
    question: "Qu'est-ce que tu y vois ?",
    bon: "tu vois ce que tu as lu, et comment tes gouts ont bougé",
    faux: ["tu effaces ce que tu ne penses plus", "tu recopies tout au propre", "tu jettes les pages des livres oubliés"],
  },
  {
    situation: "Tu abandonnes un livre au bout de trente pages.",
    bon: "tu fais quand même une page : pourquoi tu l'as arrêté, et si tu y reviendras",
    faux: ["tu ne notes rien : il ne compte pas", "tu écris que le livre est nul", "tu fais comme si tu l'avais fini"],
  },
  {
    situation: "Tu veux garder l'image de couverture dans ton carnet.",
    bon: "tu la dessines ou tu la décris : ce qui compte, c'est de la reconnaitre plus tard",
    faux: ["tu découpes la couverture du livre", "tu gardes le livre au lieu de le rendre", "tu photographies et tu n'écris rien"],
  },
  {
    situation: "Ton carnet est plein de pages presque vides.",
    bon: "tu écris moins de livres mais mieux : trois phrases vraies valent mieux que dix titres",
    faux: ["tu recommences un carnet", "tu écris seulement les titres", "tu arrêtes le carnet"],
  },
  {
    situation: "Le professeur ne ramasse pas le carnet.",
    bon: "tu continues à le tenir : il est à toi, et c'est justement ce qui le rend utile",
    faux: ["tu arrêtes de l'écrire", "tu l'écris seulement avant les vacances", "tu le remplis d'un coup à la fin de l'année"],
  },
  {
    situation: "Un camarade cherche quoi lire.",
    bon: "tu ouvres ton carnet : il te dit ce que tu as aimé, et pourquoi",
    faux: ["tu lui prêtes ton carnet à garder", "tu lui donnes le premier titre venu", "tu lui dis de demander au professeur"],
  },
  {
    situation: "Tu écris dans le carnet trois semaines après avoir fini le livre.",
    bon: "tu écris ce qui t'en reste : ce qui reste après trois semaines est ce qui comptait",
    faux: ["tu relis tout le livre d'abord", "tu recopies le résumé du dos", "tu n'écris rien, c'est trop tard"],
  },
];

/* =============================================================================
   LES LIEUX DE LECTURE ET LES MÉTIERS DU LIVRE
   ---------------------------------------------------------------------------
   Le CP connait l'auteur, l'illustrateur, le libraire et le bibliothécaire. Le
   CE2 ajoute ceux qu'on ne voit jamais et sans lesquels le livre n'existerait
   pas : le traducteur, l'éditeur, l'imprimeur.
   ========================================================================== */

const LIEUX: readonly Situation[] = [
  {
    situation: "Un livre a d'abord été écrit en anglais, et tu le lis en français. Qui l'a fait passer d'une langue à l'autre ?",
    bon: "le traducteur",
    faux: ["l'auteur", "l'éditeur", "l'imprimeur"],
  },
  {
    situation: "Qui choisit de publier un livre, travaille le texte avec l'auteur et décide de sa couverture ?",
    bon: "l'éditeur",
    faux: ["l'imprimeur", "le libraire", "le bibliothécaire"],
  },
  {
    situation: "Qui fabrique les milliers d'exemplaires d'un même livre ?",
    bon: "l'imprimeur",
    faux: ["l'éditeur", "l'auteur", "le libraire"],
  },
  {
    situation: "Qui achète des livres pour son magasin, les conseille et les vend ?",
    bon: "le libraire",
    faux: ["le bibliothécaire", "l'éditeur", "l'imprimeur"],
  },
  {
    situation: "Qui choisit les livres d'une bibliothèque, les range et te conseille sans rien te vendre ?",
    bon: "le bibliothécaire",
    faux: ["le libraire", "l'éditeur", "le traducteur"],
  },
  {
    situation: "Dans une bibliothèque, chaque livre porte une étiquette avec des lettres et des chiffres.",
    question: "Qu'est-ce que c'est ?",
    bon: "c'est sa cote : elle dit exactement à quelle place il se range",
    faux: ["c'est son prix", "c'est son numéro d'ordre d'arrivée", "c'est l'âge à partir duquel on peut le lire"],
  },
  {
    situation: "Le livre que tu veux n'est dans aucune bibliothèque de ta ville.",
    bon: "tu demandes s'il peut être fait venir d'une autre bibliothèque",
    faux: ["tu abandonnes", "tu demandes qu'on l'achète pour toi", "tu le cherches sur une autre étagère"],
  },
  {
    situation: "Un auteur vient rencontrer ta classe.",
    bon: "tu prépares une question sur son livre, à laquelle lui seul peut répondre",
    faux: ["tu lui demandes combien il gagne", "tu lui demandes de raconter la fin", "tu attends de voir ce que demandent les autres"],
  },
  {
    situation: "Tu vas à un salon du livre.",
    question: "Qu'y trouves-tu ?",
    bon: "tu y trouves des auteurs, des illustrateurs et des éditeurs réunis au même endroit",
    faux: ["c'est une bibliothèque ouverte le dimanche", "c'est un magasin de livres d'occasion", "c'est une salle où l'on lit en silence"],
  },
  {
    situation: "Tu veux savoir si un livre a une suite.",
    bon: "tu regardes la page où l'éditeur liste les autres livres de la série",
    faux: ["tu lis la dernière page", "tu comptes les chapitres", "tu attends qu'on te le dise"],
  },
  {
    situation: "À la médiathèque, on ne trouve pas les documentaires au même endroit que les romans.",
    question: "Pourquoi ?",
    bon: "c'est le classement : il regroupe ce qui répond au même besoin",
    faux: ["c'est parce que les documentaires sont plus chers", "c'est parce qu'on ne les emprunte pas", "c'est parce qu'ils sont plus grands"],
  },
  {
    situation: "Tu rends un livre abimé sans t'en être rendu compte plus tôt.",
    bon: "tu le signales : la bibliothèque préfère le savoir pour le réparer ou le remplacer",
    faux: ["tu le glisses dans la boite de retour sans rien dire", "tu le répares toi-même avec du ruban adhésif", "tu attends qu'on t'en parle"],
  },
  {
    situation: "Tu lis un livre publié il y a soixante ans.",
    question: "Qu'est-ce que cela veut dire ?",
    bon: "l'auteur a pu mourir depuis, et le livre continue d'être réimprimé",
    faux: ["c'est forcément une erreur de la bibliothèque", "l'auteur le réécrit chaque année", "on ne peut pas emprunter les vieux livres"],
  },
  {
    situation: "Sur la couverture, deux noms sont écrits.",
    question: "Qui sont-ils ?",
    bon: "c'est en général celui qui a écrit le texte et celui qui a fait les images",
    faux: ["c'est l'auteur et l'imprimeur", "ce sont deux personnes qui ont écrit la même phrase", "c'est l'auteur et le libraire qui le vend"],
  },
];

/* =============================================================================
   LIRE SEUL UNE ŒUVRE ENTIÈRE
   ---------------------------------------------------------------------------
   Le CE1 apprend à se servir des outils du livre. Le CE2 lit SANS ADULTE à
   côté : ce qui s'interroge ici, c'est tenir la distance et se débloquer seul.
   ========================================================================== */

const AUTONOMIE: readonly Situation[] = [
  {
    situation: "Le livre fait 120 pages et tu as trois semaines.",
    bon: "tu te fixes un petit nombre de pages chaque soir, et tu t'y tiens",
    faux: ["tu le lis d'un coup le dernier soir", "tu lis quand tu y penses", "tu lis un chapitre sur deux"],
  },
  {
    situation: "Tu bloques sur un mot que tu ne connais pas.",
    bon: "tu finis la phrase : le plus souvent, la suite explique le mot",
    faux: ["tu arrêtes de lire", "tu cherches chaque mot inconnu dans le dictionnaire avant de continuer", "tu sautes tout le paragraphe"],
  },
  {
    situation: "Après deux pages, tu t'aperçois que tu n'as rien retenu.",
    bon: "tu reviens en arrière et tu relis, plus lentement",
    faux: ["tu continues quand même", "tu passes au chapitre suivant", "tu changes de livre"],
  },
  {
    situation: "Personne n'est là pour te demander où tu en es.",
    bon: "tu tiens toi-même le compte : c'est cela, lire en autonomie",
    faux: ["tu lis seulement quand on te le demande", "tu attends la séance de classe", "tu arrêtes jusqu'à la prochaine consigne"],
  },
  {
    situation: "Le début du livre est lent et tu t'ennuies.",
    bon: "tu te donnes trente pages avant de décider : beaucoup de livres démarrent doucement",
    faux: ["tu abandonnes tout de suite", "tu sautes au milieu", "tu lis la fin pour voir si ça vaut le coup"],
  },
  {
    situation: "Tu ne sais plus qui est un personnage apparu au chapitre 2.",
    bon: "tu remontes à sa première apparition, et tu notes qui il est",
    faux: ["tu continues sans t'en occuper", "tu recommences le livre", "tu demandes à quelqu'un de te raconter la suite"],
  },
  {
    situation: "Tu lis surtout le soir, et tu t'endors au bout d'une page.",
    bon: "tu changes de moment : un quart d'heure éveillé vaut mieux qu'une heure endormi",
    faux: ["tu lis debout", "tu arrêtes de lire le soir et tu ne lis plus du tout", "tu lis deux fois plus vite"],
  },
  {
    situation: "Un passage est écrit d'une façon que tu ne comprends pas.",
    bon: "tu le lis à voix basse : entendre la phrase aide souvent à la démêler",
    faux: ["tu le sautes", "tu recommences le chapitre", "tu décides que le livre est trop dur"],
  },
  {
    situation: "Tu as commencé trois livres et tu n'en as fini aucun.",
    bon: "tu en choisis un, tu finis celui-là, et tu ranges les autres",
    faux: ["tu en commences un quatrième", "tu les finis tous en même temps", "tu abandonnes les trois"],
  },
  {
    situation: "Il te reste vingt pages et tu connais déjà la fin, parce qu'un camarade te l'a dite.",
    bon: "tu les lis quand même : ce qui compte, c'est comment on y arrive",
    faux: ["tu arrêtes là", "tu lis en diagonale", "tu recommences le livre depuis le début"],
  },
  {
    situation: "Tu as lu quatre livres du même genre et tu t'en lasses.",
    bon: "tu en essaies un d'un autre genre : c'est comme cela qu'on découvre ce qu'on aime",
    faux: ["tu arrêtes de lire", "tu relis le premier", "tu continues, ça finira par revenir"],
  },
  {
    situation: "Tu veux savoir si tu as bien compris ce que tu viens de lire.",
    bon: "tu essaies de le raconter en trois phrases, sans regarder",
    faux: ["tu relis les mêmes pages trois fois", "tu comptes les pages lues", "tu demandes la réponse"],
  },
  {
    situation: "Un chapitre se termine sur une question laissée en suspens.",
    question: "Pourquoi ?",
    bon: "c'est fait exprès pour te faire ouvrir le suivant",
    faux: ["c'est une erreur du livre", "il manque des pages", "il faut relire le chapitre"],
  },
  {
    situation: "Tu as fini le livre plus vite que prévu.",
    bon: "tu notes ce que tu en gardes, puis tu en prends un autre",
    faux: ["tu attends les autres", "tu le relis immédiatement en entier", "tu ne dis rien pour ne pas te faire remarquer"],
  },
];

export const devenirLecteurBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_LECT_AUTONOMIE
  ========================================================= */
  {
    kind: "template",
    id: "ce2_lect_autonomie_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "ce2_lect_autonomie",
    difficulty: 2,
    theme: "neutral",
    hint: "Lire seul, ce n'est pas lire sans méthode : c'est se débloquer sans qu'on te le demande.",
    tags: ["ce2", "devenir-lecteur", "autonomie", "template"],
    generate: () => {
      const s = randomChoice(AUTONOMIE);
      return {
        text: enonceDe(s),
        format: "qcm" as const,
        choices: makeChoices(s.bon, s.faux),
        expected: [s.bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le BO demande au CE2 de lire « de manière autonome » cinq à dix œuvres entières. Autonome ne veut pas dire seul devant la difficulté : cela veut dire savoir quoi faire quand elle arrive, sans attendre qu'on vienne.",
          "Devant un blocage, demande-toi ce qui fera repartir la lecture — et non ce qui la fera cesser.",
          `${s.situation} → ${s.bon}.`,
          `${s.bon.charAt(0).toUpperCase()}${s.bon.slice(1)}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_LECT_GENRES_RECIT
  ========================================================= */
  {
    kind: "template",
    id: "ce2_lect_genres_recit_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "ce2_lect_genres_recit",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche la QUESTION que le récit pose, pas le sujet dont il parle.",
    tags: ["ce2", "devenir-lecteur", "genres", "template"],
    generate: () => {
      const e = randomChoice(EXTRAITS);
      const label = LABEL_GENRE[e.genre];
      return {
        text: `« ${e.extrait} »\n\nQuel genre de récit est-ce ?`,
        format: "qcm" as const,
        choices: makeChoices(label, TOUS_LABELS),
        expected: [label],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Chaque genre du récit pose sa question. Le policier demande qui, et comment. L'aventure demande s'il y arrivera. Le fantastique demande si l'on voit bien ce qu'on voit. L'historique montre comment on vivait alors. Le récit du quotidien raconte ce qui arrive à tout le monde.",
          "Ne regarde pas le décor ni les personnages : regarde ce que le texte te donne envie de savoir.",
          `Ici : ${e.marque}. C'est donc ${label}.`,
          `C'est ${label}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_LECT_PERSONNAGES_TYPES
  ========================================================= */
  {
    kind: "template",
    id: "ce2_lect_personnages_types_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "ce2_lect_personnages_types",
    difficulty: 3,
    theme: "neutral",
    hint: "Un personnage-type ne se reconnait pas à ce qu'il a, mais à ce qu'il fait pour l'histoire.",
    tags: ["ce2", "devenir-lecteur", "personnages-types", "template"],
    generate: () => {
      const p = randomChoice(TYPES_PERSO);
      return {
        text: `Dans un récit, un personnage : ${p.indices}.\n\nQuel rôle tient-il ?`,
        format: "qcm" as const,
        choices: makeChoices(p.type, TOUS_TYPES),
        expected: [p.type],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Certains rôles reviennent d'un récit à l'autre : celui qui enquête, celui qui trahit, celui qui écoute, celui qui a déjà fait le chemin. Les reconnaitre, c'est savoir dès les premières pages ce que le livre prépare.",
          "Demande-toi à quoi il sert : qu'est-ce qui manquerait à l'histoire s'il n'était pas là ?",
          `${p.indices.charAt(0).toUpperCase()}${p.indices.slice(1)} : c'est ${p.type}.`,
          `C'est ${p.type}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_LECT_RESEAU
  ========================================================= */
  {
    kind: "template",
    id: "ce2_lect_reseau_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "ce2_lect_reseau",
    difficulty: 3,
    theme: "neutral",
    hint: "Les quatre livres existent. C'est la RAISON qui les sépare.",
    tags: ["ce2", "devenir-lecteur", "reseau", "template"],
    generate: () => {
      const r = randomChoice(RESEAU);
      return {
        text: `Ta classe vient de lire ${r.lu}.\n\nLequel de ces livres forme un réseau avec celui-là ?`,
        format: "qcm" as const,
        choices: makeChoices(r.bon, r.faux),
        expected: [r.bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Mettre deux livres en réseau, ce n'est pas les rapprocher par leur sujet, leur décor ou leur longueur : c'est trouver ce qu'ils FONT tous les deux — la même question posée au lecteur, le même retournement, la même leçon.",
          "Lis chaque raison jusqu'au bout. « Il y est aussi question de… » est presque toujours un faux lien : le sujet commun n'est pas un lien de lecture.",
          `Ici : ${r.bon}. Les trois autres livres existent, mais leur raison ne tient pas — elle s'arrête à un décor, un mot ou un nombre de pages.`,
          `C'est ${r.bon}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_LECT_EXPERIENCE
  ========================================================= */
  {
    kind: "template",
    id: "ce2_lect_experience_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "ce2_lect_experience",
    difficulty: 3,
    theme: "neutral",
    hint: "Ce que tu as vécu aide à comprendre. Cela ne remplace jamais ce que le texte dit.",
    tags: ["ce2", "devenir-lecteur", "experience", "template"],
    generate: () => {
      const s = randomChoice(EXPERIENCE);
      return {
        text: enonceDe(s),
        format: "qcm" as const,
        choices: makeChoices(s.bon, s.faux),
        expected: [s.bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le BO demande de « relier ses lectures à son expérience personnelle ». Ce qu'on a vécu ouvre le livre : on comprend une peur pour l'avoir eue, une attente pour l'avoir attendue. Mais le personnage n'est pas nous, et c'est là que la lecture commence vraiment.",
          "Sers-toi de ton expérience pour ENTRER dans le texte, puis retourne au texte pour vérifier. L'écart entre les deux est ce qu'il y a à apprendre.",
          `${s.situation} → ${s.bon}.`,
          `${s.bon.charAt(0).toUpperCase()}${s.bon.slice(1)}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_LECT_CARNET
  ========================================================= */
  {
    kind: "template",
    id: "ce2_lect_carnet_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "ce2_lect_carnet",
    difficulty: 2,
    theme: "neutral",
    hint: "Le carnet n'est pas un devoir : c'est ta mémoire de lecteur.",
    tags: ["ce2", "devenir-lecteur", "carnet", "template"],
    generate: () => {
      const s = randomChoice(CARNET);
      return {
        text: enonceDe(s),
        format: "qcm" as const,
        choices: makeChoices(s.bon, s.faux),
        expected: [s.bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un carnet de lecteur garde la trace de ce qu'on a lu et de ce qu'on en a pensé. Il ne sert pas à prouver qu'on a lu : il sert à ce qu'un livre continue d'exister une fois refermé, et à retrouver un an plus tard ce qu'on croyait avoir oublié.",
          "Écris toujours deux choses : ce que le livre était, et ce qu'il t'a fait. La seconde est celle qu'on oublie, et c'est la seule qui soit à toi.",
          `${s.situation} → ${s.bon}.`,
          `${s.bon.charAt(0).toUpperCase()}${s.bon.slice(1)}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_LECT_LIEUX_ACTEURS
  ========================================================= */
  {
    kind: "template",
    id: "ce2_lect_lieux_acteurs_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "ce2_lect_lieux_acteurs",
    difficulty: 2,
    theme: "neutral",
    hint: "Entre l'auteur et toi, il y a plusieurs métiers qu'on ne voit jamais.",
    tags: ["ce2", "devenir-lecteur", "lieux", "metiers", "template"],
    generate: () => {
      const s = randomChoice(LIEUX);
      return {
        text: enonceDe(s),
        format: "qcm" as const,
        choices: makeChoices(s.bon, s.faux),
        expected: [s.bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un livre passe par beaucoup de mains avant les tiennes : l'auteur écrit, l'illustrateur dessine, le traducteur le fait changer de langue, l'éditeur choisit de le publier, l'imprimeur le fabrique, le libraire le vend, le bibliothécaire le prête. Les lieux aussi ont chacun leur rôle : la BCD, la médiathèque, la librairie, le salon du livre.",
          "Demande-toi à quel moment du chemin du livre on se trouve — avant l'impression, après, ou au moment où il arrive au lecteur.",
          `${s.situation} → ${s.bon}.`,
          `${s.bon.charAt(0).toUpperCase()}${s.bon.slice(1)}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_LECT_DEFI — le genre ET ce qu'il annonce
  ========================================================= */
  {
    kind: "template",
    id: "ce2_lect_defi_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "ce2_lect_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux morceaux à trouver : le genre, et le personnage qu'il fait attendre. Les deux doivent être justes.",
    tags: ["ce2", "devenir-lecteur", "defi", "template"],
    generate: () => {
      const e = randomChoice(EXTRAITS);
      const autres = shuffle(
        (Object.keys(ATTENDU) as Genre[]).filter((g) => g !== e.genre),
      );
      const bon = `${LABEL_GENRE[e.genre]}, et ${ATTENDU[e.genre]}`;
      return {
        text: `« ${e.extrait} »\n\nQuelle réponse est entièrement juste ?`,
        format: "qcm" as const,
        choices: shuffle([
          bon,
          // Bon genre, mauvaise attente.
          `${LABEL_GENRE[e.genre]}, et ${ATTENDU[autres[0]]}`,
          // Mauvais genre, bonne attente.
          `${LABEL_GENRE[autres[1]]}, et ${ATTENDU[e.genre]}`,
          // Les deux faux.
          `${LABEL_GENRE[autres[2]]}, et ${ATTENDU[autres[3]]}`,
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Reconnaitre un genre sert à quelque chose : il annonce ce qui va venir. Un policier fait attendre un enquêteur, une aventure un guide, un fantastique un double, un récit historique un témoin, un récit du quotidien un confident.",
          "Trouve le genre, puis vérifie l'attente. Une réponse dont un seul des deux morceaux est faux reste fausse.",
          `Ici : ${e.marque} — donc ${LABEL_GENRE[e.genre]}. Et ${ATTENDU[e.genre]}.`,
          `${bon.charAt(0).toUpperCase()}${bon.slice(1)}.`,
        ),
      };
    },
  },
];
