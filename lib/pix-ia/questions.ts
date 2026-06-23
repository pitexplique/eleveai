import type { PixPalier } from "./referentiel";
import { PIX_COMPETENCES } from "./referentiel";

// Banque de questions de l'éval blanche Pix IA, mappée par compétence du
// référentiel. Niveaux novice / indépendant (public collège). Chaque question
// est ancrée dans les « exemples de savoirs et savoir-faire » du référentiel.
// ⚠️ Convention : la BONNE réponse est toujours en 1ère position de `choices`
// (mélangée à l'affichage). À enrichir compétence par compétence avec le user.

export type PixQuestion = {
  competenceId: string;
  palier: PixPalier;
  text: string;
  choices: string[]; // choices[0] = bonne réponse
  explanation?: string;
};

export const PIX_IA_QUESTIONS: PixQuestion[] = [
  // ── Domaine 1 — Fondements ────────────────────────────────────────────────
  {
    competenceId: "1.1",
    palier: "novice",
    text: "L'intelligence artificielle, en tant que discipline scientifique, cherche surtout à :",
    choices: [
      "modéliser des mécanismes de l'intelligence pour faire réaliser des tâches complexes à des machines",
      "remplacer définitivement le cerveau humain",
      "fabriquer uniquement des robots humanoïdes",
      "créer des sites web automatiquement",
    ],
    explanation:
      "L'IA est un domaine scientifique qui modélise des mécanismes de l'intelligence pour que des machines réalisent des tâches complexes.",
  },
  {
    competenceId: "1.2",
    palier: "novice",
    text: "Comment une IA « apprend »-elle le plus souvent ?",
    choices: [
      "en ajustant ses paramètres à partir de nombreuses données d'entraînement",
      "en suivant une liste de règles écrites à la main par un humain",
      "en copiant les réponses sur Internet en temps réel",
      "elle n'apprend pas, elle est programmée une fois pour toutes",
    ],
    explanation:
      "Dans l'apprentissage automatique, le modèle ajuste ses paramètres à partir de données pour mieux réaliser sa tâche.",
  },
  {
    competenceId: "1.3",
    palier: "independant",
    text: "Pourquoi dit-on parfois qu'un réseau de neurones est une « boîte noire » ?",
    choices: [
      "parce qu'il est difficile d'expliquer comment il arrive à son résultat",
      "parce qu'il fonctionne sans électricité",
      "parce que ses réponses sont toujours fausses",
      "parce qu'il est de couleur noire",
    ],
    explanation:
      "Le fonctionnement interne d'un réseau de neurones est difficile à interpréter : on parle de « boîte noire ».",
  },
  {
    competenceId: "1.4",
    palier: "novice",
    text: "Quand une IA générative invente une information fausse présentée comme vraie, on parle de :",
    choices: ["hallucination", "bug d'affichage", "virus informatique", "mise à jour"],
    explanation:
      "Une IA générative peut produire des « hallucinations » : des informations inventées présentées comme réelles. Il faut toujours vérifier.",
  },
  {
    competenceId: "1.5",
    palier: "novice",
    text: "Un algorithme de recommandation (YouTube, TikTok…) sert surtout à :",
    choices: [
      "proposer des contenus susceptibles de t'intéresser d'après tes données",
      "vérifier que les vidéos sont vraies",
      "supprimer les contenus dangereux",
      "ralentir ta connexion",
    ],
    explanation:
      "Un algorithme de recommandation filtre et propose des contenus selon ton comportement et tes préférences.",
  },
  {
    competenceId: "1.6",
    palier: "novice",
    text: "Un robot « intelligent » combine trois grandes fonctions :",
    choices: [
      "percevoir, décider, agir",
      "manger, dormir, parler",
      "lire, écrire, compter",
      "acheter, vendre, livrer",
    ],
    explanation:
      "Un robot perçoit son environnement (capteurs), décide (souvent grâce à l'IA) et agit (moteurs).",
  },

  // ── Domaine 2 — Usages et applications ────────────────────────────────────
  {
    competenceId: "2.1",
    palier: "novice",
    text: "Reconnaître un visage sur une photo est une tâche d'IA de type :",
    choices: [
      "reconnaissance d'images",
      "génération de musique",
      "traduction de texte",
      "prédiction de la météo",
    ],
    explanation:
      "Analyser une image pour y reconnaître un objet, un visage ou un geste relève de la reconnaissance d'images.",
  },
  {
    competenceId: "2.2",
    palier: "independant",
    text: "Pour obtenir une bonne réponse d'une IA générative, il vaut mieux :",
    choices: [
      "donner une consigne précise avec le contexte et l'objectif",
      "écrire le moins de mots possible",
      "poser la question en majuscules",
      "envoyer la même question plusieurs fois",
    ],
    explanation:
      "Plus la requête (prompt) est précise et contextualisée, plus la réponse répond au besoin.",
  },
  {
    competenceId: "2.3",
    palier: "novice",
    text: "Tu vois une vidéo très choquante d'une personnalité connue. Le bon réflexe est de :",
    choices: [
      "vérifier l'information auprès de plusieurs sources fiables avant d'y croire ou de la partager",
      "la partager tout de suite pour prévenir tes amis",
      "la croire car la vidéo a l'air réaliste",
      "la commenter avec colère",
    ],
    explanation:
      "Les hypertrucages (deepfakes) sont faciles à produire : on vérifie l'auteur et on recoupe les sources avant de croire ou partager.",
  },
  {
    competenceId: "2.4",
    palier: "independant",
    text: "Pour éviter de t'enfermer dans une « bulle de filtre », tu peux :",
    choices: [
      "varier tes sources et explorer d'autres types de contenus",
      "ne regarder que ce que l'application te propose",
      "désactiver Internet",
      "supprimer ton compte",
    ],
    explanation:
      "Diversifier ses sources et explorer d'autres contenus permet de sortir de l'enfermement algorithmique.",
  },
  {
    competenceId: "2.5",
    palier: "independant",
    text: "Avant d'utiliser une IA pour un travail sérieux, il faut surtout vérifier :",
    choices: [
      "la confidentialité des données et les conditions d'utilisation",
      "la couleur de l'interface",
      "le nombre total d'utilisateurs",
      "la vitesse de ta souris",
    ],
    explanation:
      "On vérifie la confidentialité des données et les conditions d'utilisation, et on évite de fournir des données sensibles ou personnelles.",
  },

  // ── Domaine 3 — Enjeux ────────────────────────────────────────────────────
  {
    competenceId: "3.1",
    palier: "novice",
    text: "Pourquoi entraîner et utiliser de grosses IA a-t-il un impact sur l'environnement ?",
    choices: [
      "parce que les calculs consomment beaucoup d'électricité dans d'immenses centres de données",
      "parce que les IA polluent directement l'air qu'on respire",
      "parce qu'elles utilisent beaucoup de papier",
      "elles n'ont aucun impact sur l'environnement",
    ],
    explanation:
      "Les calculs d'IA tournent sur des supercalculateurs très gourmands en électricité (calcul + refroidissement).",
  },
  {
    competenceId: "3.2",
    palier: "novice",
    text: "Qui peut fixer des règles sur le développement et l'usage de l'IA ?",
    choices: [
      "les entreprises, les États et des organisations internationales (ex. l'IA Act européen)",
      "uniquement les élèves",
      "personne : l'IA se régule toute seule",
      "seulement les robots",
    ],
    explanation:
      "L'IA fait l'objet de régulations à plusieurs échelles ; en Europe, l'IA Act encadre les usages selon leur niveau de risque.",
  },
  {
    competenceId: "3.3",
    palier: "independant",
    text: "Un principe éthique important pour un système d'IA est :",
    choices: [
      "la non-discrimination : éviter de reproduire des inégalités",
      "aller le plus vite possible",
      "coûter le moins cher possible",
      "avoir le plus d'utilisateurs possible",
    ],
    explanation:
      "L'éthique des algorithmes repose sur la transparence, l'explicabilité, la non-discrimination et la justice.",
  },
  {
    competenceId: "3.4",
    palier: "independant",
    text: "Quel est l'effet de l'IA sur l'emploi ?",
    choices: [
      "elle fait disparaître certaines tâches mais en crée de nouvelles, ce qui demande de se former",
      "elle supprime absolument tous les métiers",
      "elle n'a aucun effet sur le travail",
      "elle ne crée que des métiers de robots",
    ],
    explanation:
      "L'IA déplace et transforme le travail : des tâches disparaissent, d'autres apparaissent, d'où un besoin accru de formation.",
  },
  {
    competenceId: "3.5",
    palier: "independant",
    text: "Pourquoi une IA peut-elle reproduire des stéréotypes (sexistes, racistes…) ?",
    choices: [
      "parce qu'elle apprend sur des données qui contiennent déjà ces biais",
      "parce qu'elle est méchante",
      "parce qu'elle choisit exprès d'être injuste",
      "c'est impossible : une IA est toujours neutre",
    ],
    explanation:
      "Les modèles apprennent sur des données issues de la société, qui contiennent déjà des biais : ils peuvent les reproduire.",
  },
];

// Mélange une copie des choix sans muter la banque (bonne réponse en pos. 0).
function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export type PixEvalQuestion = PixQuestion & { correct: string; shuffledChoices: string[] };

// Éval blanche : 1 question par compétence (les 16), ordre des domaines
// conservé pour la lisibilité ; les choix de chaque question sont mélangés.
export function getEvalBlanchePixIa(): PixEvalQuestion[] {
  return PIX_COMPETENCES.map((comp) => {
    const pool = PIX_IA_QUESTIONS.filter((q) => q.competenceId === comp.id);
    const q = pool[Math.floor(Math.random() * pool.length)];
    return { ...q, correct: q.choices[0], shuffledChoices: shuffle(q.choices) };
  }).filter(Boolean) as PixEvalQuestion[];
}
