// lib/tutor-v4/questionBank/ce1/francais/langage-oral.bank.ts
//
// Le langage oral du CE1, écrit à la main. Neuf micro-compétences.
//
// CE QU'ELLE REMPLACE : DEUX énoncés figés pour neuf micro-compétences. « On te
// lit la phrase : Les oiseaux chantent dans les arbres. De quoi parle-t-on ? »
// et « Pour bien raconter ce qu'on a vu ou lu, quelle est la meilleure façon de
// faire ? ». Deux questions, jamais renouvelées — et c'est ce générateur-là qui
// servait de repli à TOUT ce que le routeur ne reconnaissait pas, y compris
// l'écriture cursive.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours élémentaire première année) :
//   — « Écouter pour comprendre un texte lu ou un exposé » ;
//   — « Classer et ordonner les informations entendues » ;
//   — « Organiser son propos : d'abord, ensuite, donc, enfin » ;
//   — « Exprimer et justifier un accord ou un désaccord » ;
//   — « Adapter son niveau de langue à la situation ».
//
// ⚠️ LE COACH N'ENTEND PAS L'ÉLÈVE, ET NE LUI PARLE PAS. Un écran ne peut ni
// écouter un exposé ni juger une prise de parole. Ce qui est vérifiable ici,
// c'est ce que l'oral demande de SAVOIR : dans quel ordre ranger ce qu'on a
// entendu, quel mot relie deux idées, comment on dit qu'on n'est pas d'accord
// sans se fâcher, et à qui l'on parle. Le reste se travaille en classe, à voix
// haute, avec quelqu'un en face.
//
// LE PIÈGE DE LA NOTION : dire qu'on n'est pas d'accord n'est pas dire que
// l'autre a tort. « Je ne suis pas d'accord PARCE QUE… » ouvre la discussion ;
// « c'est faux » la ferme. C'est ce que le BO appelle justifier un désaccord.

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

/* ── Ce qu'on a entendu ──────────────────────────────────────────────────── */

type Ecoute = {
  readonly texte: string;
  readonly question: string;
  readonly reponse: string;
  readonly faux: readonly string[];
  /** Trois informations du texte, dans l'ordre où elles ont été dites. */
  readonly ordre: readonly [string, string, string];
};

const ECOUTES: readonly Ecoute[] = [
  {
    texte: "La maitresse annonce : demain, nous partons au marché. Rendez-vous à huit heures devant l'école. Prenez une casquette et une bouteille d'eau. Nous rentrerons pour midi.",
    question: "À quelle heure est le rendez-vous ?",
    reponse: "à huit heures",
    faux: ["à midi", "à sept heures", "à neuf heures"],
    ordre: ["On part au marché demain.", "Rendez-vous à huit heures.", "On rentre pour midi."],
  },
  {
    texte: "Le directeur explique : la bibliothèque ouvre le mardi et le jeudi. On peut emprunter deux livres à la fois. Il faut les rendre au bout de deux semaines.",
    question: "Combien de livres peut-on emprunter à la fois ?",
    reponse: "deux",
    faux: ["un", "trois", "autant qu'on veut"],
    ordre: ["La bibliothèque ouvre le mardi et le jeudi.", "On emprunte deux livres.", "On les rend au bout de deux semaines."],
  },
  {
    texte: "Papa raconte : quand j'étais petit, je marchais une heure pour aller à l'école. Il n'y avait pas de bus. Je partais avant le lever du soleil, avec mon frère.",
    question: "Comment papa allait-il à l'école ?",
    reponse: "à pied",
    faux: ["en bus", "en voiture", "à vélo"],
    ordre: ["Papa marchait une heure.", "Il n'y avait pas de bus.", "Il partait avant le lever du soleil."],
  },
  {
    texte: "L'entraineur dit : l'échauffement dure dix minutes. Ensuite, on fait deux tours de terrain. Le match commence à la demie. On range le matériel à la fin.",
    question: "Que fait-on juste après l'échauffement ?",
    reponse: "deux tours de terrain",
    faux: ["le match", "ranger le matériel", "une pause"],
    ordre: ["L'échauffement dure dix minutes.", "On fait deux tours de terrain.", "Le match commence."],
  },
  {
    texte: "La voisine prévient : le camion de la mairie passe le vendredi. Il faut sortir les bacs la veille au soir. Les branches coupées, elles, se déposent au fond de la cour.",
    question: "Quand faut-il sortir les bacs ?",
    reponse: "le jeudi soir",
    faux: ["le vendredi matin", "le samedi", "n'importe quand"],
    ordre: ["Le camion passe le vendredi.", "On sort les bacs la veille au soir.", "Les branches vont au fond de la cour."],
  },
  {
    texte: "Le guide explique : nous descendons par le sentier de gauche. La marche dure deux heures. Il y a une source à mi-chemin. Nous remonterons par le même chemin.",
    question: "Combien de temps dure la marche ?",
    reponse: "deux heures",
    faux: ["une heure", "trois heures", "toute la journée"],
    ordre: ["On descend par le sentier de gauche.", "Il y a une source à mi-chemin.", "On remonte par le même chemin."],
  },
  {
    texte: "La boulangère explique : le pain sort du four à six heures. Les gâteaux, eux, arrivent vers neuf heures. Le mercredi, la boutique ferme à midi.",
    question: "À quelle heure sort le pain ?",
    reponse: "à six heures",
    faux: ["à neuf heures", "à midi", "à sept heures"],
    ordre: ["Le pain sort à six heures.", "Les gâteaux arrivent vers neuf heures.", "Le mercredi, on ferme à midi."],
  },
  {
    texte: "Mamie raconte : nous plantions le manguier un dimanche. Il faisait très chaud. Mon frère portait l'arrosoir, et moi je tenais l'arbre bien droit.",
    question: "Que portait le frère de Mamie ?",
    reponse: "l'arrosoir",
    faux: ["l'arbre", "une pelle", "un panier"],
    ordre: ["On plantait le manguier un dimanche.", "Il faisait très chaud.", "Le frère portait l'arrosoir."],
  },
  {
    texte: "Le pompier prévient : en cas d'alerte, on ne prend pas l'ascenseur. On descend par l'escalier, en file, sans courir. On se rassemble ensuite dans la cour.",
    question: "Par où descend-on en cas d'alerte ?",
    reponse: "par l'escalier",
    faux: ["par l'ascenseur", "par la fenêtre", "par la cour"],
    ordre: ["On ne prend pas l'ascenseur.", "On descend par l'escalier, en file.", "On se rassemble dans la cour."],
  },
  {
    texte: "La bibliothécaire annonce : l'histoire commence dans dix minutes. Installez-vous sur les coussins bleus. Vous pourrez poser vos questions à la fin.",
    question: "Où faut-il s'installer ?",
    reponse: "sur les coussins bleus",
    faux: ["sur les chaises", "par terre", "près de la porte"],
    ordre: ["L'histoire commence dans dix minutes.", "On s'installe sur les coussins bleus.", "On pose ses questions à la fin."],
  },
  {
    texte: "Le maitre nageur explique : on entre dans l'eau par l'échelle, jamais en sautant. On reste du côté où l'on a pied. On sort dès que le sifflet retentit.",
    question: "Comment entre-t-on dans l'eau ?",
    reponse: "par l'échelle",
    faux: ["en sautant", "en courant", "par le grand bain"],
    ordre: ["On entre par l'échelle.", "On reste là où l'on a pied.", "On sort au coup de sifflet."],
  },
  {
    texte: "Le vendeur du marché explique : les letchis viennent de Saint-Joseph. Ils ont été cueillis hier matin. Ils se gardent trois jours au frais.",
    question: "D'où viennent les letchis ?",
    reponse: "de Saint-Joseph",
    faux: ["de Saint-Denis", "de Mafate", "du jardin du vendeur"],
    ordre: ["Les letchis viennent de Saint-Joseph.", "Ils ont été cueillis hier matin.", "Ils se gardent trois jours au frais."],
  },
];

/* ── Les connecteurs de l'oral ───────────────────────────────────────────── */

const CONNECTEURS_ORAL: readonly { readonly mot: string; readonly role: string }[] = [
  { mot: "d'abord", role: "annoncer la première chose" },
  { mot: "ensuite", role: "annoncer ce qui vient après" },
  { mot: "donc", role: "annoncer la conséquence" },
  { mot: "enfin", role: "annoncer la dernière chose" },
];

/* ── Accord et désaccord ─────────────────────────────────────────────────── */

/** `faute` : ce qui manque à la MAUVAISE réponse, rangé dans l'une des quatre
 *  catégories de FAUTES ci-dessous.
 *  ⛔ Quatre catégories, et pas un libellé par ligne : écrits ligne par ligne,
 *  « elle attaque la personne au lieu de l'idée » et « elle vise la personne,
 *  pas une idée précise » seraient vrais tous les deux de la même phrase, et
 *  l'élève qui coche le second serait compté faux. Les catégories, elles,
 *  s'excluent deux à deux. */
type Faute = "raison" | "personne" | "rien" | "arret";

const FAUTES: Record<Faute, string> = {
  raison: "elle ne donne aucune raison",
  personne: "elle s'en prend à la personne",
  rien: "elle n'ajoute rien de nouveau",
  arret: "elle arrête la discussion",
};

const TOUTES_FAUTES: readonly string[] = Object.values(FAUTES);

type PriseDeParole = {
  readonly bonne: string;
  readonly mauvaise: string;
  readonly pourquoi: string;
  readonly faute: Faute;
};

const DESACCORDS: readonly PriseDeParole[] = [
  {
    bonne: "Je ne suis pas d'accord, parce que le texte dit le contraire à la troisième ligne.",
    mauvaise: "C'est faux.",
    pourquoi: "la première dit POURQUOI, et on peut lui répondre ; la seconde ferme la discussion",
    faute: "raison",
  },
  {
    bonne: "Je pense autrement, parce que j'ai déjà vu un margouillat sortir en plein jour.",
    mauvaise: "N'importe quoi.",
    pourquoi: "la première apporte une preuve, la seconde attaque la personne",
    faute: "personne",
  },
  {
    bonne: "Je suis d'accord avec toi, et j'ajoute que le texte le dit aussi à la fin.",
    mauvaise: "Oui.",
    pourquoi: "la première explique ce qu'elle ajoute, la seconde n'apprend rien à personne",
    faute: "rien",
  },
  {
    bonne: "Je ne suis pas sûr, parce que le texte ne le dit nulle part.",
    mauvaise: "Tu te trompes toujours.",
    pourquoi: "la première parle du TEXTE, la seconde parle de la personne",
    faute: "personne",
  },
  {
    bonne: "Je suis d'accord sur le début, mais pas sur la fin, parce que l'histoire se passe la nuit.",
    mauvaise: "Non, pas du tout.",
    pourquoi: "la première dit sur quoi porte le désaccord, la seconde rejette tout en bloc",
    faute: "raison",
  },
  {
    bonne: "Je ne comprends pas la même chose, parce que le texte parle du matin, pas du soir.",
    mauvaise: "Tu n'as rien écouté.",
    pourquoi: "la première montre où elle a lu, la seconde accuse",
    faute: "personne",
  },
  {
    bonne: "Peut-être, mais je voudrais vérifier dans le texte avant de dire oui.",
    mauvaise: "Si tu le dis.",
    pourquoi: "la première propose de chercher, la seconde abandonne la discussion",
    faute: "arret",
  },
  {
    bonne: "Je suis d'accord, parce que j'ai vu la même chose sur le sentier l'an dernier.",
    mauvaise: "Moi aussi.",
    pourquoi: "la première apporte quelque chose de nouveau, la seconde n'ajoute rien",
    faute: "rien",
  },
  {
    bonne: "Je ne suis pas d'accord avec la fin, parce que le margouillat chasse la nuit.",
    mauvaise: "Tu dis toujours n'importe quoi.",
    pourquoi: "la première vise une idée précise, la seconde vise la personne",
    faute: "personne",
  },
  {
    bonne: "J'hésite, parce que le texte ne donne pas la réponse : il faudrait chercher ailleurs.",
    mauvaise: "On s'en fiche.",
    pourquoi: "la première reconnait ce qu'on ne sait pas encore, la seconde arrête tout",
    faute: "arret",
  },
];

/* ── Les niveaux de langue à l'oral ──────────────────────────────────────── */

type Situation = {
  readonly situation: string;
  readonly bonne: string;
  readonly mauvaise: string;
};

const SITUATIONS: readonly Situation[] = [
  {
    situation: "tu demandes quelque chose à la directrice",
    bonne: "Bonjour madame, est-ce que je peux vous poser une question ?",
    mauvaise: "Hé, j'ai un truc à te demander.",
  },
  {
    situation: "tu racontes ta journée à ton meilleur copain",
    bonne: "Tu sais pas ce qui m'est arrivé à la récré !",
    mauvaise: "Je souhaiterais vous relater les évènements de la récréation.",
  },
  {
    situation: "tu présentes un exposé devant la classe",
    bonne: "Aujourd'hui, je vais vous parler du margouillat.",
    mauvaise: "Bon alors voilà, le truc c'est le margouillat quoi.",
  },
  {
    situation: "tu réponds au téléphone à quelqu'un que tu ne connais pas",
    bonne: "Bonjour, je vais chercher ma mère, un instant s'il vous plait.",
    mauvaise: "Ouais ? C'est qui ?",
  },
  {
    situation: "tu joues aux billes avec ton cousin",
    bonne: "Vas-y, c'est à toi de tirer !",
    mauvaise: "Je vous invite à procéder à votre lancer.",
  },
  {
    situation: "tu demandes de l'aide à un adulte que tu ne connais pas",
    bonne: "Excusez-moi madame, je cherche la salle de musique.",
    mauvaise: "Eh, c'est où la musique ?",
  },
  {
    situation: "tu écris un mot d'excuse à la maitresse",
    bonne: "Je n'ai pas pu venir hier parce que j'étais malade.",
    mauvaise: "J'étais grave malade, du coup je suis pas venu.",
  },
  {
    situation: "tu proposes un jeu à ta petite sœur",
    bonne: "Tu veux jouer aux billes avec moi ?",
    mauvaise: "Je sollicite votre participation à une partie de billes.",
  },
  {
    situation: "tu remercies quelqu'un qui t'a rendu service",
    bonne: "Merci beaucoup, c'est gentil de m'avoir aidé.",
    mauvaise: "Ouais, cool.",
  },
  {
    situation: "tu présentes ton camarade à la nouvelle maitresse",
    bonne: "Madame, je vous présente Malik, il est arrivé cette semaine.",
    mauvaise: "Lui, c'est Malik, il vient d'arriver.",
  },
];

/* ── Raconter et expliquer ───────────────────────────────────────────────── */

const CONSEILS_RACONTER: readonly { readonly conseil: string; readonly pourquoi: string }[] = [
  { conseil: "raconter dans l'ordre où les choses se sont passées", pourquoi: "sinon celui qui écoute se perd" },
  { conseil: "dire au début qui sont les personnages et où ça se passe", pourquoi: "celui qui écoute n'a pas vu ce que tu as vu" },
  { conseil: "employer ses propres mots, pas ceux du livre appris par cœur", pourquoi: "réciter n'est pas raconter" },
  { conseil: "s'arrêter quand l'histoire est finie", pourquoi: "une fin claire aide celui qui écoute à comprendre que c'est terminé" },
  { conseil: "parler assez fort pour le dernier rang", pourquoi: "celui qui n'entend pas décroche au bout de deux phrases" },
  { conseil: "éviter de dire « et après » à chaque phrase", pourquoi: "les mêmes mots répétés effacent l'ordre des étapes" },
  { conseil: "dire ce que le personnage ressent, pas seulement ce qu'il fait", pourquoi: "c'est ce qui donne envie d'écouter la suite" },
  { conseil: "regarder ceux à qui l'on parle", pourquoi: "on voit tout de suite s'ils ont perdu le fil" },
  { conseil: "commencer par situer le moment", pourquoi: "sans repère de temps, on ne sait pas si c'était hier ou l'an dernier" },
  { conseil: "ne pas raconter deux histoires en même temps", pourquoi: "celui qui écoute ne peut suivre qu'un fil à la fois" },
  { conseil: "prendre le temps de respirer entre les phrases", pourquoi: "un récit dit d'un seul souffle arrive comme un bloc" },
  { conseil: "garder la fin pour la fin", pourquoi: "dire tout de suite comment ça se termine enlève l'envie d'écouter" },
];

const CONSEILS_ECOUTER: readonly { readonly conseil: string; readonly pourquoi: string }[] = [
  { conseil: "écouter jusqu'au bout avant de répondre", pourquoi: "la fin change souvent ce qu'on croyait avoir compris" },
  { conseil: "retenir les mots importants au fur et à mesure", pourquoi: "on ne peut pas tout retenir, il faut choisir" },
  { conseil: "poser sa question quand la personne a fini de parler", pourquoi: "couper la parole fait perdre le fil à tout le monde" },
  { conseil: "regarder la personne qui parle", pourquoi: "son visage et ses gestes disent une partie de ce qu'elle raconte" },
  { conseil: "redire dans sa tête ce qu'on vient d'entendre", pourquoi: "ce qui est redit une fois se retient beaucoup mieux" },
  { conseil: "noter un mot au brouillon quand il y a des chiffres", pourquoi: "les heures et les nombres s'oublient en quelques secondes" },
  { conseil: "attendre la fin avant de décider si l'on est d'accord", pourquoi: "on juge souvent trop tôt, sur la première phrase" },
  { conseil: "demander de répéter si l'on n'a pas compris", pourquoi: "faire semblant d'avoir compris coûte plus cher que la question" },
];

export const langageOralBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_ORAL_ECOUTER
  ========================================================= */
  {
    kind: "template",
    id: "ce1_oral_ecouter_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce1_oral_ecouter",
    difficulty: 2,
    theme: "reunion",
    hint: "Une seule information répond à la question. Cherche-la.",
    tags: ["ce1", "oral", "ecouter", "template"],
    generate: () => {
      const e = randomChoice(ECOUTES);
      return {
        text: `On te dit ceci :\n\n« ${e.texte} »\n\n${e.question}`,
        format: "qcm" as const,
        choices: makeChoices(e.reponse, e.faux),
        expected: [e.reponse],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Écouter pour comprendre, ce n'est pas tout retenir : c'est retenir ce dont on aura besoin.",
          "Pendant qu'on parle, garde en tête les nombres, les heures et les noms : ce sont eux qu'on te redemandera.",
          `Ici, la réponse est « ${e.reponse} ». Elle est dite une seule fois, et elle passe vite.`,
          `La réponse est ${e.reponse}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_oral_ecouter_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce1_oral_ecouter",
    difficulty: 3,
    theme: "neutral",
    hint: "Écouter, ça s'apprend comme le reste : il y a des façons de faire.",
    tags: ["ce1", "oral", "ecouter", "template"],
    generate: () => {
      const c = randomChoice(CONSEILS_ECOUTER);
      const autres = CONSEILS_ECOUTER.filter((x) => x.conseil !== c.conseil).map((x) => x.pourquoi);
      return {
        text: `Pourquoi faut-il ${c.conseil} ?`,
        format: "qcm" as const,
        choices: makeChoices(c.pourquoi, autres),
        expected: [c.pourquoi],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Bien écouter demande des gestes précis, exactement comme bien lire.",
          "Avant que quelqu'un ne parle, décide de ce que tu vas chercher.",
          `Il faut ${c.conseil} : ${c.pourquoi}.`,
          `Parce que ${c.pourquoi}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ORAL_CLASSER_INFOS
  ========================================================= */
  {
    kind: "template",
    id: "ce1_oral_classer_infos_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce1_oral_classer_infos",
    difficulty: 3,
    theme: "reunion",
    hint: "Remets les informations dans l'ordre où elles ont été dites.",
    tags: ["ce1", "oral", "classer", "template"],
    generate: () => {
      const e = randomChoice(ECOUTES);
      const [a, b, c] = e.ordre;
      const bon = `${a} → ${b} → ${c}`;
      return {
        text: `On te dit ceci :\n\n« ${e.texte} »\n\nRemets ces informations dans l'ordre où elles ont été dites.`,
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
          "Classer ce qu'on entend, c'est le remettre dans l'ordre : ce qui a été dit d'abord, puis ensuite, puis en dernier.",
          "Pendant qu'on parle, compte les étapes sur tes doigts : une, deux, trois.",
          `L'ordre est : ${bon}`,
          `Le bon ordre est : ${bon}`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ORAL_REFORMULER
  ========================================================= */
  {
    kind: "template",
    id: "ce1_oral_reformuler_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce1_oral_reformuler",
    difficulty: 3,
    theme: "reunion",
    hint: "Reformuler, c'est redire l'essentiel avec ses mots — sans rien inventer.",
    tags: ["ce1", "oral", "reformuler", "template"],
    generate: () => {
      const e = randomChoice(ECOUTES);
      const autre = randomChoice(ECOUTES.filter((x) => x.texte !== e.texte));
      const bon = e.ordre.join(" ");
      return {
        text: `On te dit ceci :\n\n« ${e.texte} »\n\nQuelle reformulation garde l'essentiel, sans rien ajouter ?`,
        format: "qcm" as const,
        choices: shuffle([
          bon,
          autre.ordre.join(" "),
          `${e.ordre[0]} ${autre.ordre[1]} ${e.ordre[2]}`,
          `${e.ordre[2]} ${e.ordre[0]}`,
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Reformuler, c'est redire ce qu'on a compris avec ses propres mots, dans l'ordre, sans rien ajouter ni oublier.",
          "Redis les informations une par une, en comptant : ai-je tout ? ai-je inventé quelque chose ?",
          `« ${bon} » reprend les trois informations, dans l'ordre, et rien d'autre.`,
          `La bonne reformulation est : ${bon}`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ORAL_RACONTER
  ========================================================= */
  {
    kind: "template",
    id: "ce1_oral_raconter_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce1_oral_raconter",
    difficulty: 2,
    theme: "neutral",
    hint: "Celui qui t'écoute n'a pas vu ce que tu as vu.",
    tags: ["ce1", "oral", "raconter", "template"],
    generate: () => {
      const c = randomChoice(CONSEILS_RACONTER);
      const autres = CONSEILS_RACONTER.filter((x) => x.conseil !== c.conseil).map((x) => x.pourquoi);
      return {
        text: `Quand tu racontes une histoire, pourquoi faut-il ${c.conseil} ?`,
        format: "qcm" as const,
        choices: makeChoices(c.pourquoi, autres),
        expected: [c.pourquoi],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Raconter, c'est faire voir à quelqu'un ce qu'il n'a pas vu. Tout ce qui l'aide compte.",
          "Avant de commencer, demande-toi ce que celui qui écoute ne sait pas encore.",
          `Il faut ${c.conseil} : ${c.pourquoi}.`,
          `Parce que ${c.pourquoi}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ORAL_CONNECTEURS
  ========================================================= */
  {
    kind: "template",
    id: "ce1_oral_connecteurs_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce1_oral_connecteurs",
    difficulty: 2,
    theme: "neutral",
    hint: "D'abord, ensuite, donc, enfin : chacun a son travail.",
    tags: ["ce1", "oral", "connecteurs", "template"],
    generate: () => {
      const c = randomChoice(CONNECTEURS_ORAL);
      const autres = CONNECTEURS_ORAL.filter((x) => x.mot !== c.mot).map((x) => x.role);
      return {
        text: `À quoi sert le mot « ${c.mot} » quand on raconte quelque chose ?`,
        format: "qcm" as const,
        choices: makeChoices(c.role, autres),
        expected: [c.role],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Quand on parle, les petits mots d'organisation tiennent le propos : d'abord, ensuite, donc, enfin.",
          "Prépare-les avant de prendre la parole : ils t'évitent de te perdre au milieu.",
          `« ${c.mot} » sert à ${c.role}.`,
          `Il sert à ${c.role}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_oral_connecteurs_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce1_oral_connecteurs",
    difficulty: 3,
    theme: "reunion",
    hint: "Trois étapes, trois mots pour les annoncer.",
    tags: ["ce1", "oral", "connecteurs", "template"],
    generate: () => {
      const e = randomChoice(ECOUTES);
      const bon = `D'abord, ${minuscule(e.ordre[0])} Ensuite, ${minuscule(e.ordre[1])} Enfin, ${minuscule(e.ordre[2])}`;
      return {
        text: `Tu dois redire ces trois étapes à quelqu'un :\n\n${e.ordre.join(" · ")}\n\nQuelle façon de les enchainer est la plus claire ?`,
        format: "qcm" as const,
        choices: shuffle([
          bon,
          `${e.ordre[0]} ${e.ordre[1]} ${e.ordre[2]}`,
          `Enfin, ${minuscule(e.ordre[0])} D'abord, ${minuscule(e.ordre[1])} Ensuite, ${minuscule(e.ordre[2])}`,
          `Donc, ${minuscule(e.ordre[0])} Donc, ${minuscule(e.ordre[1])} Donc, ${minuscule(e.ordre[2])}`,
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les connecteurs annoncent où l'on en est. Sans eux, celui qui écoute ne sait pas si tu commences ou si tu finis.",
          "Range tes idées, puis colle devant chacune le mot qui dit sa place.",
          `« D'abord… Ensuite… Enfin… » : celui qui écoute sait à chaque instant combien il en reste.`,
          `La façon la plus claire est : ${bon}`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ORAL_EXPLIQUER
  ========================================================= */
  {
    kind: "template",
    id: "ce1_oral_expliquer_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce1_oral_expliquer",
    difficulty: 3,
    theme: "neutral",
    hint: "Donner son avis, c'est dire ce qu'on pense ET pourquoi.",
    tags: ["ce1", "oral", "expliquer", "template"],
    generate: () => {
      const d = randomChoice(DESACCORDS);
      return {
        text: `Deux élèves donnent leur avis :\n\n« ${d.bonne} »\n« ${d.mauvaise} »\n\nLaquelle permet à la discussion de continuer ?`,
        format: "qcm" as const,
        choices: shuffle([d.bonne, d.mauvaise]),
        expected: [d.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Donner son point de vue, ce n'est pas seulement dire oui ou non : c'est dire POURQUOI.",
          "Après ton avis, ajoute toujours « parce que… », suivi de ce que tu as vu, lu ou entendu.",
          `Ici, ${d.pourquoi}.`,
          `La bonne façon est : « ${d.bonne} »`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ORAL_ACCORD_DESACCORD — le piège de la notion
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_oral_accord_desaccord_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce1_oral_accord_desaccord",
    difficulty: 3,
    theme: "neutral",
    text: "Un camarade dit : « Le margouillat sort surtout le jour. » Tu penses le contraire. Que dis-tu ?",
    format: "qcm",
    choices: [
      "Je ne suis pas d'accord, parce que le texte dit qu'il chasse la nuit",
      "C'est faux",
      "Tu ne connais rien aux margouillats",
      "Je ne dis rien",
    ],
    expected: ["Je ne suis pas d'accord, parce que le texte dit qu'il chasse la nuit"],
    comparator: "mcq_exact",
    hint: "On peut n'être pas d'accord sans dire que l'autre a tort.",
    explanation: exp(
      "Exprimer un désaccord, c'est dire ce qu'on pense ET sur quoi on s'appuie. On parle de ce qui est dit, jamais de la personne.",
      "Commence par « je ne suis pas d'accord », puis ajoute « parce que » et une preuve.",
      "« C'est faux » ferme la discussion : l'autre n'a plus rien à répondre. « Parce que le texte dit… » l'ouvre : il peut aller vérifier, et on avance tous les deux.",
      "On dit pourquoi on n'est pas d'accord.",
    ),
    tags: ["ce1", "oral", "desaccord", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_oral_accord_desaccord_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce1_oral_accord_desaccord",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche la phrase qui parle de ce qui est DIT, pas de la personne.",
    tags: ["ce1", "oral", "desaccord", "template"],
    generate: () => {
      const d = randomChoice(DESACCORDS);
      const autres = shuffle(DESACCORDS.filter((x) => x.bonne !== d.bonne))
        .slice(0, 2)
        .map((x) => x.mauvaise);
      return {
        text: `Pourquoi « ${d.bonne} » vaut-il mieux que « ${d.mauvaise} » ?`,
        format: "qcm" as const,
        choices: makeChoices(d.pourquoi, [
          ...shuffle(DESACCORDS.filter((x) => x.pourquoi !== d.pourquoi)).slice(0, 2).map((x) => x.pourquoi),
          "la première est plus longue",
        ]),
        expected: [d.pourquoi],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un désaccord bien dit porte sur ce qui a été dit, et il s'appuie sur quelque chose.",
          "Vérifie deux choses : est-ce que je dis pourquoi ? est-ce que je parle du sujet, et pas de la personne ?",
          `${d.pourquoi.charAt(0).toUpperCase() + d.pourquoi.slice(1)}. « ${autres[0] ?? d.mauvaise} » aurait le même défaut.`,
          `Parce que ${d.pourquoi}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ORAL_REGISTRE
  ========================================================= */
  {
    kind: "template",
    id: "ce1_oral_registre_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce1_oral_registre",
    difficulty: 3,
    theme: "neutral",
    hint: "On ne parle pas pareil à un copain et à une directrice.",
    tags: ["ce1", "oral", "registre", "template"],
    generate: () => {
      const s = randomChoice(SITUATIONS);
      return {
        text: `Tu es dans cette situation : ${s.situation}.\n\nQue dis-tu ?`,
        format: "qcm" as const,
        choices: shuffle([s.bonne, s.mauvaise]),
        expected: [s.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "On change de façon de parler selon la personne à qui l'on s'adresse. C'est le niveau de langue.",
          "Demande-toi : à qui je parle, et est-ce que je le connais bien ?",
          `Ici, « ${s.bonne} » convient. « ${s.mauvaise} » n'est pas fausse en soi — elle est juste au mauvais endroit.`,
          `On dit : « ${s.bonne} »`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ORAL_DEFI
  ========================================================= */
  {
    kind: "template",
    id: "ce1_oral_defi_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce1_oral_defi",
    difficulty: 3,
    theme: "reunion",
    hint: "Deux choses : la bonne information, et le bon ordre.",
    tags: ["ce1", "oral", "defi", "template"],
    generate: () => {
      const e = randomChoice(ECOUTES);
      const bon = `${e.reponse}, et l'ordre est : ${e.ordre.join(" → ")}`;
      return {
        text: `On te dit ceci :\n\n« ${e.texte} »\n\n${e.question} Et dans quel ordre les informations ont-elles été données ?`,
        format: "qcm" as const,
        choices: shuffle([
          bon,
          `${e.reponse}, et l'ordre est : ${[...e.ordre].reverse().join(" → ")}`,
          `${e.faux[0]}, et l'ordre est : ${e.ordre.join(" → ")}`,
          `${e.faux[1]}, et l'ordre est : ${[...e.ordre].reverse().join(" → ")}`,
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une réponse n'est juste que si les deux moitiés le sont : l'information, ET l'ordre.",
          "Prends une chose à la fois : d'abord la réponse à la question, ensuite l'ordre des étapes.",
          `La réponse est « ${e.reponse} », et les informations sont venues dans cet ordre : ${e.ordre.join(" → ")}`,
          `La réponse juste est : ${bon}`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce1_oral_defi_meth_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce1_oral_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Un camarade dit quelque chose que tu crois faux.\n\nComment le lui dis-tu sans le fâcher ?",
    format: "qcm",
    choices: [
      "Je dis « je ne suis pas d'accord », puis « parce que… », et je donne ce que j'ai lu ou entendu.",
      // L'erreur réelle : « c'est faux » ferme la discussion au lieu de l'ouvrir.
      "Je lui dis « c'est faux ».",
      "Je ne dis rien, pour éviter la dispute.",
      "Je répète mon avis plus fort jusqu'à ce qu'il change d'avis.",
    ],
    expected: [
      "Je dis « je ne suis pas d'accord », puis « parce que… », et je donne ce que j'ai lu ou entendu.",
    ],
    comparator: "mcq_exact",
    hint: "Il y a deux mots magiques à ajouter après ton avis.",
    explanation: exp(
      "On peut n'être pas d'accord sans dire que l'autre a tort. On parle de ce qui est dit, pas de la personne.",
      "Dis « je ne suis pas d'accord », puis « parce que… », puis ce que tu as lu, vu ou entendu.",
      "« C'est faux » ferme la discussion. « Je ne suis pas d'accord, parce que le texte dit le contraire » l'ouvre : l'autre peut aller vérifier, et vous avancez tous les deux.",
      "On dit qu'on n'est pas d'accord, et on ajoute POURQUOI.",
    ),
    tags: ["ce1", "oral", "defi", "methode", "qcm"],
  },

  /* ═══════════════════════════════════════════════════════════════════════
     LES SECONDS ITEMS (20/08/2026)
     ---------------------------------------------------------------------
     Cinq micros de cette notion portaient UN SEUL item. Le coach en mode
     complet oppose deux énoncés : sous deux items, la ligne cliquée ouvrait
     sur une AUTRE ligne (repli silencieux) — l'élève croyait travailler
     « reformuler » et travaillait « écouter ». Mesuré : ce1/francais rendait
     97/125 lignes franches.
     ⭐ Un second item se fabrique par CONTRASTE, pas en changeant les valeurs.
     Chacun prend ici le chemin inverse de son premier.
     ⚠️ Deux des premiers items ne proposent que DEUX choix (expliquer,
     registre) : une chance sur deux au hasard. Les seconds en proposent
     quatre, ce qui resserre aussi la mesure de ces deux micros.
     ═══════════════════════════════════════════════════════════════════════ */

  {
    kind: "template",
    id: "ce1_oral_classer_infos_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce1_oral_classer_infos",
    difficulty: 3,
    theme: "reunion",
    hint: "Trois de ces phrases ont été dites. Une non.",
    tags: ["ce1", "oral", "classer", "template"],
    generate: () => {
      const e = randomChoice(ECOUTES);
      const autre = randomChoice(ECOUTES.filter((x) => x.texte !== e.texte));
      const intrus = randomChoice(autre.ordre);
      return {
        text: `On te dit ceci :\n\n« ${e.texte} »\n\nLaquelle de ces informations n'a PAS été dite ?`,
        format: "qcm" as const,
        choices: shuffle([intrus, ...e.ordre]),
        expected: [intrus],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Classer ce qu'on entend, c'est aussi savoir ce qui N'A PAS été dit. Une information qui n'y était pas ne doit pas se glisser dans ce qu'on retient.",
          "Le premier exercice demandait de remettre en ordre. Celui-ci demande de trier : reprends le texte phrase par phrase et coche celle qu'on n'y retrouve pas.",
          `Le texte disait : ${e.ordre.join(" ")} Il ne disait rien de « ${intrus} »`,
          `L'information en trop est : « ${intrus} »`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce1_oral_reformuler_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce1_oral_reformuler",
    difficulty: 3,
    theme: "reunion",
    hint: "Compare la reformulation au texte : ajoute-t-elle, oublie-t-elle, ou mélange-t-elle ?",
    tags: ["ce1", "oral", "reformuler", "template"],
    generate: () => {
      const e = randomChoice(ECOUTES);
      const autre = randomChoice(ECOUTES.filter((x) => x.texte !== e.texte));
      const genre = randomChoice(["ajoute", "oublie", "ordre", "juste"] as const);
      const dite =
        genre === "ajoute"
          ? `${e.ordre.join(" ")} ${randomChoice(autre.ordre)}`
          : genre === "oublie"
            ? `${e.ordre[0]} ${e.ordre[2]}`
            : genre === "ordre"
              ? `${e.ordre[2]} ${e.ordre[0]} ${e.ordre[1]}`
              : e.ordre.join(" ");
      const bon =
        genre === "ajoute"
          ? "elle ajoute une chose qui n'a pas été dite"
          : genre === "oublie"
            ? "elle oublie une des informations dites"
            : genre === "ordre"
              ? "elle change l'ordre des informations"
              : "rien : elle est juste et complète";
      return {
        text: `On t'a dit :\n\n« ${e.texte} »\n\nUn élève reformule : « ${dite} »\n\nQu'est-ce qui cloche dans sa reformulation ?`,
        format: "qcm" as const,
        choices: shuffle([
          "elle ajoute une chose qui n'a pas été dite",
          "elle oublie une des informations dites",
          "elle change l'ordre des informations",
          "rien : elle est juste et complète",
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une reformulation fidèle garde TOUT ce qui a été dit, RIEN de plus, et dans l'ordre. Trois façons de se tromper, donc — et une seule de réussir.",
          "Le premier exercice demandait de choisir la bonne reformulation. Celui-ci demande de NOMMER la faute : compte les informations, puis vérifie leur ordre.",
          `Le texte disait, dans l'ordre : ${e.ordre.join(" ")}`,
          `${bon.charAt(0).toUpperCase()}${bon.slice(1)}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce1_oral_raconter_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce1_oral_raconter",
    difficulty: 2,
    theme: "neutral",
    hint: "La raison est donnée. Cherche le conseil qui va avec.",
    tags: ["ce1", "oral", "raconter", "template"],
    generate: () => {
      const c = randomChoice(CONSEILS_RACONTER);
      const autres = CONSEILS_RACONTER.filter((x) => x.conseil !== c.conseil).map((x) => x.conseil);
      return {
        text: `Quand tu racontes, il y a une règle parce que ${c.pourquoi}.\n\nQuelle est cette règle ?`,
        format: "qcm" as const,
        choices: makeChoices(c.conseil, autres),
        expected: [c.conseil],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Chaque conseil pour raconter répond à une difficulté précise de celui qui écoute.",
          "Le premier exercice partait du conseil pour trouver sa raison. Celui-ci fait l'inverse : la raison est donnée, retrouve le conseil.",
          `Parce que ${c.pourquoi}, il faut ${c.conseil}.`,
          `Il faut ${c.conseil}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce1_oral_expliquer_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce1_oral_expliquer",
    difficulty: 3,
    theme: "neutral",
    hint: "Quatre façons de rater une réponse. Laquelle est celle-ci ?",
    tags: ["ce1", "oral", "expliquer", "template"],
    generate: () => {
      const d = randomChoice(DESACCORDS);
      const bon = FAUTES[d.faute];
      return {
        text: `Un camarade donne son avis. Un élève lui répond : « ${d.mauvaise} »\n\nQu'est-ce qu'on peut reprocher à cette réponse ?`,
        format: "qcm" as const,
        choices: makeChoices(bon, TOUTES_FAUTES),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une réponse rate de quatre façons : elle ne donne aucune raison, elle s'en prend à la personne, elle n'ajoute rien, ou elle arrête la discussion.",
          "Le premier exercice demandait de choisir la bonne réponse. Celui-ci demande de dire ce qui manque à la mauvaise — c'est ce qui permet de la réparer.",
          `« ${d.mauvaise} » : ${bon}. On aurait pu dire : « ${d.bonne} »`,
          `${bon.charAt(0).toUpperCase()}${bon.slice(1)}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce1_oral_registre_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "langage_oral",
    microId: "ce1_oral_registre",
    difficulty: 3,
    theme: "neutral",
    hint: "Cette phrase convient à une seule de ces quatre situations.",
    tags: ["ce1", "oral", "registre", "template"],
    generate: () => {
      const s = randomChoice(SITUATIONS);
      const autres = SITUATIONS.filter((x) => x.situation !== s.situation).map((x) => x.situation);
      return {
        text: `Quelqu'un dit : « ${s.bonne} »\n\nDans quelle situation est-il ?`,
        format: "qcm" as const,
        choices: makeChoices(s.situation, autres),
        expected: [s.situation],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le niveau de langue dit à qui l'on parle. En l'entendant, on devine la situation : un copain, une directrice, un inconnu au téléphone.",
          "Le premier exercice partait de la situation pour choisir la phrase. Celui-ci fait l'inverse : écoute la phrase, et demande-toi à qui elle s'adresse.",
          `« ${s.bonne} » convient quand ${s.situation}.`,
          `C'est quand ${s.situation}.`,
        ),
      };
    },
  },
];

/** La première lettre en minuscule : une phrase qui suit « D'abord, » ne
 *  garde pas sa majuscule. */
function minuscule(phrase: string): string {
  return phrase.charAt(0).toLowerCase() + phrase.slice(1);
}
