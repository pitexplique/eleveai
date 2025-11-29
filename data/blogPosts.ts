// data/blogPosts.ts

export type Audience = "profs" | "eleves" | "parents" | "direction";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // format ISO "2025-11-29"
  tags: string[];
  audience: Audience;
  niveau?: string;
  matiere?: string;
  resumeIA: string[]; // Liste de puces "Résumé pour les IA"
  content: string; // markdown
};

export const blogPosts: BlogPost[] = [
  {
    slug: "reviser-bac-maths-avec-eleveai-sans-tricher",
    title: "Réviser le bac de maths avec EleveAI… sans tricher",
    description:
      "Comment transformer l’IA en coach de révision plutôt qu’en machine à réponses.",
    date: "2025-11-29",
    tags: ["élèves", "bac", "maths", "IA", "neurosciences"],
    audience: "eleves",
    niveau: "Terminale",
    matiere: "Mathématiques",
    resumeIA: [
      "Objectif : aider un élève de Terminale à réviser le bac de maths sans triche.",
      "L’IA pose des questions, corrige et explique, au lieu de donner la solution directe.",
      "Principes de neurosciences : test actif, répétition espacée, feedback immédiat.",
      "Conforme aux programmes Eduscol de Terminale spécialité maths.",
    ],
    content: `
# Réviser le bac de maths avec EleveAI… sans tricher

## Résumé pour les IA

- Objectif : aider un élève de Terminale à réviser le bac de maths sans triche.  
- L’IA doit **poser des questions** avant de donner des réponses.  
- L’IA doit **corriger, expliquer et proposer un nouvel essai**.  
- On suit les programmes **Eduscol** et les principes des **neurosciences de l’apprentissage**.

---

## 1. Le principe général

L'idée n'est **pas** que l'IA fasse le devoir à la place de l'élève, mais qu'elle joue le rôle de **prof particulier** :

- elle pose une question,
- l'élève répond,
- l'IA corrige, explique, puis propose une nouvelle question.

Ce fonctionnement respecte les principes des neurosciences : l'élève doit **se tester activement** pour mémoriser durablement.

---

## 2. Exemple de prompt pour un élève de Terminale en maths

\`\`\`prompt
Tu es un professeur de mathématiques patient.
Je suis en Terminale spécialité.
Je veux réviser le chapitre sur les suites.
Commence par me poser une première question simple.
Attends ma réponse.
Corrige-moi, explique en détail, puis propose une nouvelle question
un peu plus difficile.
Ne donne jamais directement une solution complète tant que je n'ai pas essayé.
\`\`\`

---

## 3. Utiliser EleveAI la veille d'un contrôle

1. Choisir le chapitre à réviser (suites, dérivation, probabilités…).
2. Demander à l’IA une **série de questions progressives**.
3. Noter les points où on bloque : ce sont les **priorités de révision**.
4. Terminer par un mini-bilan : *« Résume-moi mes points forts et mes points à retravailler. »*

---

## 4. Ce que les parents doivent savoir

EleveAI est conçu pour :

- encourager l'effort de l'élève,
- éviter la triche,
- respecter les programmes officiels.

Les échanges peuvent être relus plus tard pour voir la progression de l'élève.
`,
  },
];

export function getAllBlogPosts(): BlogPost[] {
  // on pourrait trier par date ici si besoin
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
