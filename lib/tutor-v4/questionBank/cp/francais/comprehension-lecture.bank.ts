// lib/tutor-v4/questionBank/cp/francais/comprehension-lecture.bank.ts
//
// La compréhension de textes au CP, écrite à la main.
//
// CE QU'ELLE REMPLACE : DEUX textes, pour tout le cycle 2 et pour les trois
// classes — « Tom est dans le jardin… » et « Lea va a l'ecole… », cette
// dernière avec trois fautes dans une phrase de lecture. Cinq
// micro-compétences se partageaient quatre questions.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   — « Dégager le sens global d'un texte entendu ou lu de façon autonome » ;
//   — « Identifier les mots inconnus dans un texte et chercher à leur donner
//     un sens » ;
//   — « Se repérer dans la chaine anaphorique (qui relie un nom à sa ou ses
//     reprise(s) pronominale(s) ou à d'autres noms de sens équivalent) » ;
//   — « Comprendre ce qui est implicite (inférences simples) » ;
//   — « Justifier ses réponses par un retour au texte » ;
//   — « Lire et comprendre en autonomie un texte narratif, informatif ou
//     prescriptif d'une dizaine de lignes. »
//
// LES DEUX PIÈGES, et ce sont ceux que le BO met en avant aux trois niveaux
// du cycle :
//   — la CHAINE ANAPHORIQUE : « il » ne renvoie pas au dernier nom cité, mais
//     à celui dont on parle. Le BO donne son propre exemple : le lion / il /
//     le fauve / le roi de la savane ;
//   — l'INFÉRENCE : ce qui est vrai sans être écrit. Là encore l'exemple est
//     du BO : « J'ai pris mon parapluie » → le temps est pluvieux.
//
// ⚠️ Les textes font trois ou quatre phrases, entièrement déchiffrables au CP.
// Le BO parle d'une dizaine de lignes en fin d'année, mais lues en autonomie
// sur du papier — pas sur un écran, entre deux questions.

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
  readonly texte: string;
  readonly personnage: string;
  readonly lieu: string;
  readonly moment: string | null;
  readonly anaphore: { readonly pronom: string; readonly referent: string; readonly faux: readonly string[] };
  readonly inference: { readonly conclusion: string; readonly faux: readonly string[] };
  readonly justification: { readonly question: string; readonly preuve: string };
  readonly question: { readonly q: string; readonly r: string; readonly faux: readonly string[] };
  readonly resume: string;
};

const TEXTES: readonly Texte[] = [
  {
    texte: "Léa marche sur le sentier. Un margouillat file entre les pierres. Il se cache sous une grande feuille. Léa sourit et continue son chemin.",
    personnage: "Léa",
    lieu: "sur le sentier",
    moment: null,
    anaphore: { pronom: "Il", referent: "le margouillat", faux: ["Léa", "le sentier", "la feuille"] },
    inference: { conclusion: "Léa est contente", faux: ["Léa a peur", "Léa est fatiguée", "Léa a froid"] },
    justification: { question: "Où se cache le margouillat ?", preuve: "Il se cache sous une grande feuille." },
    question: { q: "Que fait le margouillat quand Léa arrive ?", r: "il se cache", faux: ["il chante", "il dort", "il mange"] },
    resume: "Léa croise un margouillat sur le sentier et continue sa route.",
  },
  {
    texte: "Tom prend son panier. Il ramasse les letchis tombés dans l'herbe. Sa maman l'attend à la case. Le panier est bientôt plein.",
    personnage: "Tom",
    lieu: "dans l'herbe",
    moment: null,
    anaphore: { pronom: "Il", referent: "Tom", faux: ["le panier", "la maman", "le letchi"] },
    inference: { conclusion: "Tom a ramassé beaucoup de letchis", faux: ["Tom n'a rien trouvé", "Tom a perdu son panier", "Tom est rentré les mains vides"] },
    justification: { question: "Qui attend Tom ?", preuve: "Sa maman l'attend à la case." },
    question: { q: "Que ramasse Tom ?", r: "des letchis", faux: ["des mangues", "des cailloux", "des feuilles"] },
    resume: "Tom remplit son panier de letchis pendant que sa maman l'attend.",
  },
  {
    texte: "Le matin, papa allume le feu. Il pose la marmite dessus. L'odeur du cari remplit la cuisine. Les enfants arrivent en courant.",
    personnage: "papa",
    lieu: "dans la cuisine",
    moment: "le matin",
    anaphore: { pronom: "Il", referent: "papa", faux: ["le feu", "la marmite", "le cari"] },
    inference: { conclusion: "les enfants ont faim", faux: ["les enfants ont peur", "les enfants vont dormir", "les enfants sont malades"] },
    justification: { question: "Quand papa allume-t-il le feu ?", preuve: "Le matin, papa allume le feu." },
    question: { q: "Que prépare papa ?", r: "un cari", faux: ["un gâteau", "du riz au lait", "une salade"] },
    resume: "Papa prépare un cari le matin et les enfants accourent.",
  },
  {
    texte: "Nina ouvre son parapluie avant de sortir. Elle met ses bottes. Dans la rue, les gens courent pour rentrer chez eux.",
    personnage: "Nina",
    lieu: "dans la rue",
    moment: null,
    anaphore: { pronom: "Elle", referent: "Nina", faux: ["le parapluie", "la rue", "les bottes"] },
    inference: { conclusion: "il pleut", faux: ["il fait très chaud", "il neige", "il y a du soleil"] },
    justification: { question: "Qu'est-ce que Nina met à ses pieds ?", preuve: "Elle met ses bottes." },
    question: { q: "Qu'est-ce que Nina ouvre ?", r: "son parapluie", faux: ["la porte", "sa trousse", "la fenêtre"] },
    resume: "Nina se protège de la pluie avant de sortir.",
  },
  {
    texte: "Le bateau quitte le port. Il glisse sur la mer calme. Des poissons sautent tout près. Le pêcheur sourit.",
    personnage: "le pêcheur",
    lieu: "en mer",
    moment: null,
    anaphore: { pronom: "Il", referent: "le bateau", faux: ["la mer", "le port", "le pêcheur"] },
    inference: { conclusion: "le pêcheur pense qu'il va bien pêcher", faux: ["le pêcheur veut rentrer", "le pêcheur a perdu son filet", "le pêcheur a peur de la mer"] },
    justification: { question: "Comment est la mer ?", preuve: "Il glisse sur la mer calme." },
    question: { q: "Qui sourit ?", r: "le pêcheur", faux: ["le capitaine", "un enfant", "la maitresse"] },
    resume: "Un pêcheur part en mer par temps calme et voit des poissons.",
  },
  {
    texte: "À midi, la cloche sonne. Les élèves rangent leurs cahiers. Ils sortent dans la cour. Le maitre ferme la porte de la classe.",
    personnage: "les élèves",
    lieu: "dans la cour",
    moment: "à midi",
    anaphore: { pronom: "Ils", referent: "les élèves", faux: ["les cahiers", "le maitre", "la cloche"] },
    inference: { conclusion: "la classe est finie", faux: ["la classe commence", "il y a un contrôle", "les élèves sont punis"] },
    justification: { question: "Qui ferme la porte ?", preuve: "Le maitre ferme la porte de la classe." },
    question: { q: "Que font les élèves quand la cloche sonne ?", r: "ils rangent leurs cahiers", faux: ["ils écrivent", "ils dorment", "ils chantent"] },
    resume: "À midi, les élèves rangent et sortent dans la cour.",
  },
  {
    texte: "Le vent souffle fort sur le piton. Les nuages passent vite. Léo remonte la fermeture de son blouson. Il redescend sans attendre.",
    personnage: "Léo",
    lieu: "sur le piton",
    moment: null,
    anaphore: { pronom: "Il", referent: "Léo", faux: ["le vent", "le piton", "un nuage"] },
    inference: { conclusion: "Léo a froid", faux: ["Léo a chaud", "Léo a soif", "Léo est en retard"] },
    justification: { question: "Que fait le vent ?", preuve: "Le vent souffle fort sur le piton." },
    question: { q: "Où se trouve Léo ?", r: "sur le piton", faux: ["à la plage", "dans la classe", "au marché"] },
    resume: "Léo se couvre parce que le vent souffle fort sur le piton.",
  },
  {
    texte: "Sur le marché, maman choisit des mangues. Elle les met dans son sac. Le vendeur lui rend la monnaie.",
    personnage: "maman",
    lieu: "au marché",
    moment: null,
    anaphore: { pronom: "Elle", referent: "maman", faux: ["les mangues", "le sac", "le vendeur"] },
    inference: { conclusion: "maman a payé les mangues", faux: ["maman est partie sans payer", "le vendeur a tout donné", "maman n'a rien acheté"] },
    justification: { question: "Que fait le vendeur ?", preuve: "Le vendeur lui rend la monnaie." },
    question: { q: "Que choisit maman ?", r: "des mangues", faux: ["des letchis", "du poisson", "des cahiers"] },
    resume: "Maman achète des mangues au marché et le vendeur lui rend la monnaie.",
  },
  {
    texte: "Le chien gratte à la porte. Il gémit doucement. Papa se lève et ouvre.",
    personnage: "le chien",
    lieu: "à la maison",
    moment: null,
    anaphore: { pronom: "Il", referent: "le chien", faux: ["papa", "la porte", "le bruit"] },
    inference: { conclusion: "le chien veut sortir", faux: ["le chien a faim", "le chien est malade", "le chien dort"] },
    justification: { question: "Que fait papa ?", preuve: "Papa se lève et ouvre." },
    question: { q: "Où gratte le chien ?", r: "à la porte", faux: ["à la fenêtre", "sous la table", "dans le jardin"] },
    resume: "Le chien gratte à la porte et papa vient lui ouvrir.",
  },
  {
    texte: "Alice colle sa dernière image. L'album est complet. Elle le montre à sa sœur.",
    personnage: "Alice",
    lieu: "à la maison",
    moment: null,
    anaphore: { pronom: "Elle", referent: "Alice", faux: ["l'album", "l'image", "sa sœur"] },
    inference: { conclusion: "Alice est fière de son album", faux: ["Alice a perdu son album", "Alice n'aime pas les images", "Alice va tout recommencer"] },
    justification: { question: "Comment est l'album ?", preuve: "L'album est complet." },
    question: { q: "Que colle Alice ?", r: "une image", faux: ["une photo", "un timbre", "une feuille"] },
    resume: "Alice finit son album d'images et le montre à sa sœur.",
  },
  {
    texte: "La nuit tombe sur le lagon. Yann range ses filets. Les lumières du village s'allument une à une. Il rentre chez lui.",
    personnage: "Yann",
    lieu: "sur le lagon",
    moment: "la nuit",
    anaphore: { pronom: "Il", referent: "Yann", faux: ["le lagon", "le village", "un filet"] },
    inference: { conclusion: "la journée de pêche est finie", faux: ["Yann part pêcher", "Yann a perdu ses filets", "Yann dort déjà"] },
    justification: { question: "Que range Yann ?", preuve: "Yann range ses filets." },
    question: { q: "Qu'est-ce qui s'allume dans le village ?", r: "les lumières", faux: ["un feu", "les phares", "la lune"] },
    resume: "À la nuit tombée, Yann range ses filets et rentre chez lui.",
  },
  {
    texte: "Le maitre écrit une phrase au tableau. Les élèves la recopient dans leur cahier. Karim lève la main.",
    personnage: "Karim",
    lieu: "dans la classe",
    moment: null,
    anaphore: { pronom: "la", referent: "la phrase", faux: ["le tableau", "le cahier", "la main"] },
    inference: { conclusion: "Karim veut poser une question", faux: ["Karim a fini son travail", "Karim veut sortir", "Karim connait déjà la réponse"] },
    justification: { question: "Où le maitre écrit-il ?", preuve: "Le maitre écrit une phrase au tableau." },
    question: { q: "Que font les élèves ?", r: "ils recopient la phrase", faux: ["ils lisent un livre", "ils dessinent", "ils sortent"] },
    resume: "Le maitre écrit au tableau, les élèves recopient et Karim lève la main.",
  },
  {
    texte: "Il fait très chaud. Sofia remplit sa gourde. Elle part marcher sur le chemin avec son papa.",
    personnage: "Sofia",
    lieu: "sur le chemin",
    moment: null,
    anaphore: { pronom: "Elle", referent: "Sofia", faux: ["la gourde", "son papa", "la chaleur"] },
    inference: { conclusion: "Sofia aura soif en marchant", faux: ["Sofia n'aime pas l'eau", "Sofia va se baigner", "Sofia reste à la maison"] },
    justification: { question: "Que remplit Sofia ?", preuve: "Sofia remplit sa gourde." },
    question: { q: "Avec qui part Sofia ?", r: "avec son papa", faux: ["avec sa sœur", "toute seule", "avec le maitre"] },
    resume: "Sofia remplit sa gourde avant de partir marcher par la chaleur.",
  },
  {
    texte: "Le facteur pose une lettre dans la boite. Mamie l'ouvre tout de suite. Elle sourit en lisant.",
    personnage: "Mamie",
    lieu: "devant la maison",
    moment: null,
    anaphore: { pronom: "l'", referent: "la lettre", faux: ["le facteur", "la boite", "Mamie"] },
    inference: { conclusion: "la lettre annonce une bonne nouvelle", faux: ["la lettre est triste", "la lettre est vide", "Mamie ne sait pas lire"] },
    justification: { question: "Qui pose la lettre ?", preuve: "Le facteur pose une lettre dans la boite." },
    question: { q: "Que fait Mamie en lisant ?", r: "elle sourit", faux: ["elle pleure", "elle dort", "elle crie"] },
    resume: "Mamie reçoit une lettre et sourit en la lisant.",
  },
  {
    texte: "Les vagues montent sur le sable. Kevin recule sa serviette. Il rassemble ses affaires.",
    personnage: "Kevin",
    lieu: "sur le sable",
    moment: null,
    anaphore: { pronom: "Il", referent: "Kevin", faux: ["les vagues", "la serviette", "le sable"] },
    inference: { conclusion: "Kevin va bientôt rentrer", faux: ["Kevin arrive à la plage", "Kevin va se baigner", "Kevin a perdu ses affaires"] },
    justification: { question: "Que fait Kevin avec sa serviette ?", preuve: "Kevin recule sa serviette." },
    question: { q: "Qu'est-ce qui monte sur le sable ?", r: "les vagues", faux: ["le vent", "les bateaux", "les oiseaux"] },
    resume: "La mer monte et Kevin rassemble ses affaires sur la plage.",
  },
  {
    texte: "Dans la cour, les enfants tracent une marelle. Ils comptent les cases à la craie. La cloche sonne trop tôt.",
    personnage: "les enfants",
    lieu: "dans la cour",
    moment: null,
    anaphore: { pronom: "Ils", referent: "les enfants", faux: ["les cases", "la marelle", "la cloche"] },
    inference: { conclusion: "les enfants sont déçus", faux: ["les enfants sont contents de rentrer", "les enfants ont fini de jouer", "les enfants n'aiment pas la marelle"] },
    justification: { question: "Que tracent les enfants ?", preuve: "Dans la cour, les enfants tracent une marelle." },
    question: { q: "Avec quoi comptent-ils les cases ?", r: "à la craie", faux: ["au crayon", "avec un bâton", "avec des cailloux"] },
    resume: "Les enfants tracent une marelle dans la cour, mais la cloche sonne trop tôt.",
  },
] as const;

// L'indice qui permet l'inférence : le morceau de texte à partir duquel on
// devine. Le BO le demande explicitement — « il réalise en autonomie une
// inférence simple (contexte connu de l'élève) ». Rangé à part et repéré par
// le personnage, qui est unique dans le corpus.
const INDICES: Record<string, string> = {
  "Léa": "Léa sourit",
  "Tom": "Le panier est bientôt plein",
  "papa": "Les enfants arrivent en courant",
  "Nina": "Nina ouvre son parapluie",
  "le pêcheur": "Le pêcheur sourit",
  "les élèves": "la cloche sonne",
  "Léo": "Léo remonte la fermeture de son blouson",
  "maman": "Le vendeur lui rend la monnaie",
  "le chien": "Le chien gratte à la porte",
  "Alice": "L'album est complet",
  "Yann": "Yann range ses filets",
  "Karim": "Karim lève la main",
  "Sofia": "Sofia remplit sa gourde",
  "Mamie": "Elle sourit en lisant",
  "Kevin": "Kevin recule sa serviette",
  "les enfants": "La cloche sonne trop tôt",
};

const LIEUX_FAUX =["à la mer", "dans la cuisine", "à l'école", "au marché", "dans la voiture", "sur le toit"] as const;
const PERSONNAGES_FAUX = ["le boulanger", "la maitresse", "le facteur", "un pompier", "la voisine"] as const;
const MOMENTS_FAUX = ["le soir", "la nuit", "pendant les vacances", "l'après-midi"] as const;

export const comprehensionLectureBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_COMP_PERSONNAGE
  ========================================================= */
  {
    kind: "template",
    id: "cp_comp_personnage_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "cp_comp_personnage",
    difficulty: 1,
    theme: "neutral",
    hint: "Cherche le nom qui revient le plus souvent dans le texte.",
    tags: ["cp", "comprehension", "personnage", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      return {
        text: `Lis ce texte :\n« ${t.texte} »\n\nDe qui parle-t-on surtout ?`,
        format: "qcm" as const,
        choices: makeChoices(t.personnage, shuffle(PERSONNAGES_FAUX).slice(0, 3)),
        expected: [t.personnage],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le personnage principal est celui dont on parle le plus dans le texte.",
          "Relis et compte : quel nom revient, ou est repris par « il » ou « elle » ?",
          `Ici, tout tourne autour de ${t.personnage}.`,
          `On parle surtout de ${t.personnage}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_COMP_LIEU_MOMENT
  ========================================================= */
  {
    kind: "template",
    id: "cp_comp_lieu_moment_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "cp_comp_lieu_moment",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche les mots qui disent OÙ : sur, dans, à…",
    tags: ["cp", "comprehension", "lieu", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      return {
        text: `Lis ce texte :\n« ${t.texte} »\n\nOù se passe la scène ?`,
        format: "qcm" as const,
        choices: makeChoices(t.lieu, shuffle(LIEUX_FAUX.filter((l) => l !== t.lieu)).slice(0, 3)),
        expected: [t.lieu],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le lieu, c'est l'endroit où se passe l'histoire.",
          "Cherche les petits mots qui annoncent un endroit : sur, dans, à, près de…",
          `Le texte dit « ${t.lieu} ».`,
          `La scène se passe ${t.lieu}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_comp_lieu_moment_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "cp_comp_lieu_moment",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche les mots qui disent QUAND.",
    tags: ["cp", "comprehension", "moment", "template"],
    generate: () => {
      const avecMoment = TEXTES.filter((t): t is Texte & { moment: string } => t.moment !== null);
      const t = randomChoice(avecMoment);
      return {
        text: `Lis ce texte :\n« ${t.texte} »\n\nQuand se passe la scène ?`,
        format: "qcm" as const,
        choices: makeChoices(t.moment, shuffle(MOMENTS_FAUX).slice(0, 3)),
        expected: [t.moment],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le moment, c'est quand se passe l'histoire.",
          "Cherche les mots du temps : le matin, à midi, le soir, hier…",
          `Le texte commence par « ${t.moment} ».`,
          `La scène se passe ${t.moment}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_COMP_QUESTION_SIMPLE
  ========================================================= */
  {
    kind: "template",
    id: "cp_comp_question_simple_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "cp_comp_question_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "La réponse est écrite dans le texte. Relis lentement.",
    tags: ["cp", "comprehension", "question", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      return {
        text: `Lis ce texte :\n« ${t.texte} »\n\n${t.question.q}`,
        format: "qcm" as const,
        choices: makeChoices(t.question.r, t.question.faux),
        expected: [t.question.r],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Répondre à une question sur un texte, c'est retrouver l'information dans le texte.",
          "Relis en cherchant les mots de la question, puis pose ton doigt sur la réponse.",
          `Le texte dit : « ${t.texte} »`,
          `La réponse est : ${t.question.r}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cp_comp_question_simple_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "cp_comp_question_simple",
    difficulty: 3,
    theme: "neutral",
    hint: "Trois de ces choses sont dans le texte. Une seule n'y est pas.",
    tags: ["cp", "comprehension", "question", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      // ⚠️ Dédoublonné : dans un texte, la réponse à la question EST parfois le
      // personnage (« Qui sourit ? » → « le pêcheur ») ou le lieu (« Où se
      // trouve Léo ? » → « sur le piton »). L'élève voyait deux fois la même
      // proposition.
      const dedans = [
        ...new Set([t.question.r, t.personnage, t.lieu, t.anaphore.referent]),
      ].slice(0, 3);
      const intrus = randomChoice(
        TEXTES.filter((x) => x.texte !== t.texte)
          .map((x) => x.question.r)
          .filter((r) => !dedans.includes(r) && !t.texte.includes(r)),
      );
      return {
        text: `Lis ce texte :\n« ${t.texte} »\n\nQu'est-ce qui n'est PAS dans ce texte ?`,
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
     CP_COMP_ANAPHORE — LE piège du BO
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_comp_anaphore_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "cp_comp_anaphore",
    difficulty: 3,
    theme: "neutral",
    text: "Lis :\n« Le lion dort dans l'herbe. Il ouvre un œil. Le fauve a entendu quelque chose. »\n\nQui est « le fauve » ?",
    format: "qcm",
    choices: ["le lion", "l'herbe", "un autre animal", "on ne sait pas"],
    expected: ["le lion"],
    comparator: "mcq_exact",
    hint: "C'est un autre mot pour dire la même chose.",
    explanation: exp(
      "Dans un texte, on évite de répéter : on remplace un nom par « il », ou par un autre mot qui veut dire la même chose.",
      "Demande-toi de qui on parlait juste avant.",
      "Le lion → il → le fauve. Ce sont trois façons de nommer le même animal. Si on ne le voit pas, on croit qu'un deuxième animal est arrivé.",
      "« Le fauve », c'est le lion.",
    ),
    tags: ["cp", "comprehension", "anaphore", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_comp_anaphore_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "cp_comp_anaphore",
    difficulty: 3,
    theme: "neutral",
    hint: "Remonte dans le texte : de qui parlait-on juste avant ?",
    tags: ["cp", "comprehension", "anaphore", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      return {
        text: `Lis ce texte :\n« ${t.texte} »\n\nDans ce texte, « ${t.anaphore.pronom} » désigne quoi ou qui ?`,
        format: "qcm" as const,
        choices: makeChoices(t.anaphore.referent, t.anaphore.faux),
        expected: [t.anaphore.referent],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Pour ne pas se répéter, un texte remplace un nom par un petit mot comme « il », « elle », « son ».",
          "Remonte d'une phrase et demande-toi de qui on parlait.",
          `Ici, « ${t.anaphore.pronom} » reprend « ${t.anaphore.referent} ».`,
          `« ${t.anaphore.pronom} » désigne ${t.anaphore.referent}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cp_comp_anaphore_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "cp_comp_anaphore",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche le petit mot qui évite de répéter le nom.",
    tags: ["cp", "comprehension", "anaphore", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      const autres = shuffle([
        ...new Set(
          TEXTES.filter((x) => x.texte !== t.texte).map((x) => x.anaphore.pronom),
        ),
      ]).filter((m) => m !== t.anaphore.pronom).slice(0, 3);
      return {
        text: `Lis ce texte :\n« ${t.texte} »\n\nQuel mot du texte remplace « ${t.anaphore.referent} » pour ne pas le répéter ?`,
        format: "qcm" as const,
        choices: makeChoices(t.anaphore.pronom, autres),
        expected: [t.anaphore.pronom],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un texte évite de répéter : il remplace le nom par un petit mot.",
          "Relis en cherchant l'endroit où le nom ne revient plus, mais où on parle encore de lui.",
          `Ici, « ${t.anaphore.referent} » est repris par « ${t.anaphore.pronom} ».`,
          `Le mot est « ${t.anaphore.pronom} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_COMP_INFERENCE — l'exemple du BO est dans la banque
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_comp_inference_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "cp_comp_inference",
    difficulty: 3,
    theme: "neutral",
    text: "« J'ai pris mon parapluie. »\n\nQuel temps fait-il, à ton avis ?",
    format: "qcm",
    choices: ["il pleut", "il fait très chaud", "il neige", "on ne peut pas savoir"],
    expected: ["il pleut"],
    comparator: "mcq_exact",
    hint: "À quoi sert un parapluie ?",
    explanation: exp(
      "Comprendre un texte, ce n'est pas seulement lire ce qui est écrit : c'est aussi deviner ce qui ne l'est pas.",
      "Demande-toi pourquoi le personnage fait ce qu'il fait.",
      "Le mot « pluie » n'est écrit nulle part. Mais on ne prend un parapluie que pour une raison.",
      "Il pleut.",
    ),
    tags: ["cp", "comprehension", "inference", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_comp_inference_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "cp_comp_inference",
    difficulty: 3,
    theme: "neutral",
    hint: "Ce n'est pas écrit. Mais le texte te donne un indice.",
    tags: ["cp", "comprehension", "inference", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      return {
        text: `Lis ce texte :\n« ${t.texte} »\n\nQu'est-ce qui est vrai, même si ce n'est PAS écrit ?`,
        format: "qcm" as const,
        choices: makeChoices(t.inference.conclusion, t.inference.faux),
        expected: [t.inference.conclusion],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une inférence, c'est ce qu'on comprend sans que ce soit écrit.",
          "Cherche l'indice dans le texte, puis demande-toi ce qu'il t'apprend.",
          `Le texte ne dit pas « ${t.inference.conclusion} ». Mais tout le laisse deviner.`,
          `On peut en déduire que ${t.inference.conclusion}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cp_comp_inference_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "cp_comp_inference",
    difficulty: 3,
    theme: "neutral",
    hint: "Un seul morceau du texte te met sur la piste.",
    tags: ["cp", "comprehension", "inference", "template"],
    generate: () => {
      const t = randomChoice(TEXTES.filter((x) => INDICES[x.personnage]));
      const bon = INDICES[t.personnage];
      const autres = shuffle([
        ...new Set(
          TEXTES.filter((x) => x.personnage !== t.personnage)
            .map((x) => INDICES[x.personnage])
            .filter((i): i is string => Boolean(i) && !t.texte.includes(i)),
        ),
      ]).slice(0, 3);
      return {
        text: `Lis ce texte :\n« ${t.texte} »\n\nOn devine que ${t.inference.conclusion}. Quel morceau du texte te le fait deviner ?`,
        format: "qcm" as const,
        choices: makeChoices(bon, autres),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une inférence s'appuie toujours sur un indice écrit, même si la conclusion, elle, ne l'est pas.",
          "Cherche le morceau de phrase qui t'a mis sur la piste, et pose ton doigt dessus.",
          `« ${bon} » : voilà l'indice. C'est lui qui fait deviner que ${t.inference.conclusion}.`,
          `L'indice est « ${bon} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_COMP_JUSTIFIER — retourner au texte
  ========================================================= */
  {
    kind: "template",
    id: "cp_comp_justifier_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "cp_comp_justifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Une seule phrase du texte contient la réponse. Retrouve-la.",
    tags: ["cp", "comprehension", "justifier", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      const phrases = t.texte.split(". ").map((p) => (p.endsWith(".") ? p : `${p}.`));
      const autres = phrases.filter((p) => p !== t.justification.preuve).slice(0, 3);
      return {
        text: `Lis ce texte :\n« ${t.texte} »\n\n${t.justification.question}\nQuelle phrase du texte le prouve ?`,
        format: "qcm" as const,
        choices: makeChoices(t.justification.preuve, autres),
        expected: [t.justification.preuve],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Justifier, c'est montrer l'endroit du texte qui donne la réponse.",
          "Relis chaque phrase et arrête-toi sur celle qui répond exactement à la question.",
          `« ${t.justification.preuve} » répond à la question. Les autres parlent d'autre chose.`,
          `La phrase qui le prouve est « ${t.justification.preuve} »`,
        ),
      };
    },
  },

  /* =========================================================
     CP_COMP_REFORMULER
  ========================================================= */
  {
    kind: "template",
    id: "cp_comp_reformuler_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "cp_comp_reformuler",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche la phrase qui dit tout le texte, sans rien inventer.",
    tags: ["cp", "comprehension", "reformuler", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      const autres = shuffle(TEXTES.filter((x) => x.texte !== t.texte))
        .slice(0, 3)
        .map((x) => x.resume);
      return {
        text: `Lis ce texte :\n« ${t.texte} »\n\nQuelle phrase raconte le mieux ce texte ?`,
        format: "qcm" as const,
        choices: makeChoices(t.resume, autres),
        expected: [t.resume],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Reformuler, c'est redire l'essentiel avec ses propres mots, sans rien ajouter.",
          "Demande-toi : qui, où, et quoi ? Puis cherche la phrase qui dit ces trois choses.",
          `« ${t.resume} » : tout y est, et rien de plus.`,
          `La bonne reformulation est « ${t.resume} »`,
        ),
      };
    },
  },

  /* =========================================================
     CP_COMP_DEFI — l'anaphore ET l'inférence dans le même texte
  ========================================================= */
  {
    kind: "template",
    id: "cp_comp_defi_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "cp_comp_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux questions en une : qui est désigné, et ce qu'on devine.",
    tags: ["cp", "comprehension", "defi", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      const bon = `« ${t.anaphore.pronom} » désigne ${t.anaphore.referent}, et ${t.inference.conclusion}`;
      const faux = [
        `« ${t.anaphore.pronom} » désigne ${t.anaphore.faux[0]}, et ${t.inference.conclusion}`,
        `« ${t.anaphore.pronom} » désigne ${t.anaphore.referent}, et ${t.inference.faux[0]}`,
        `« ${t.anaphore.pronom} » désigne ${t.anaphore.faux[1]}, et ${t.inference.faux[1]}`,
      ];
      return {
        text: `Lis ce texte :\n« ${t.texte} »\n\nQuelle réponse est entièrement juste ?`,
        format: "qcm" as const,
        choices: shuffle([bon, ...faux]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une réponse n'est juste que si TOUT est juste dedans.",
          "Vérifie les deux moitiés l'une après l'autre : d'abord qui est désigné, ensuite ce qu'on devine.",
          `« ${t.anaphore.pronom} » reprend « ${t.anaphore.referent} », et le texte laisse deviner que ${t.inference.conclusion}.`,
          `La réponse juste est : « ${t.anaphore.pronom} » désigne ${t.anaphore.referent}, et ${t.inference.conclusion}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_comp_defi_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "cp_comp_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Attention : une seule de ces phrases est vraiment dans le texte.",
    tags: ["cp", "comprehension", "defi", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      const phrases = t.texte.split(". ").map((p) => (p.endsWith(".") ? p : `${p}.`));
      const vraie = randomChoice(phrases);
      const autres = shuffle(TEXTES.filter((x) => x.texte !== t.texte))
        .slice(0, 3)
        .map((x) => x.texte.split(". ")[0] + ".");
      return {
        text: `Lis ce texte :\n« ${t.texte} »\n\nQuelle phrase est vraiment écrite dans ce texte ?`,
        format: "qcm" as const,
        choices: makeChoices(vraie, autres),
        expected: [vraie],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Lire, c'est vérifier ce qui est écrit, pas se souvenir de ce qu'on croit avoir lu.",
          "Relis le texte et cherche la phrase mot à mot.",
          `« ${vraie} » est bien dans le texte. Les autres viennent d'ailleurs.`,
          `La phrase du texte est « ${vraie} »`,
        ),
      };
    },
  },
];
