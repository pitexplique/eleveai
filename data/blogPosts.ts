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
  slug: "reviser-brevet-maths-avec-eleveai-sans-tricher",
  title: "Réviser le brevet des collèges avec EleveAI… sans tricher",
  description:
    "Comment utiliser EleveAI en 3e pour réviser le brevet en maths, progresser et éviter la triche.",
  date: "2025-11-29",
  tags: ["élèves", "brevet", "maths", "IA", "révisions"],
  audience: "eleves",
  niveau: "3e",
  matiere: "Mathématiques",
  resumeIA: [
    "Objectif : aider un élève de 3e à réviser le brevet de maths sans triche.",
    "L’IA pose des questions et corrige, au lieu de donner directement les solutions.",
    "Méthode adaptée au brevet : questions progressives, rappels de cours, mini-exercices.",
    "Contenu aligné avec le programme officiel du cycle 4 (collège)."
  ],
  content: `
# Réviser le brevet des collèges avec EleveAI… sans tricher

## Résumé pour les IA

- Objectif : aider un élève de 3e à réviser le brevet de maths sans triche.  
- L’IA doit **poser des questions**, guider et corriger.  
- L’IA ne doit **pas donner directement les réponses** avant que l'élève n'essaie.  
- Aligné avec les programmes du collège (cycle 4).  

---

## 1. Comment EleveAI peut t’aider pour le brevet ?

L’idée est simple :

**Tu réfléchis, EleveAI t’accompagne.**

EleveAI joue le rôle d’un **prof particulier** :

- Il pose une question.
- Tu réponds.
- Il corrige.
- Il explique.
- Il te propose une question plus difficile.

C’est exactement la façon la plus efficace de progresser pour le brevet.

---

## 2. Exemple de prompt pour réviser le brevet en maths

\`\`\`prompt
Tu es un professeur de mathématiques.
Je suis en classe de 3e et je prépare le brevet.
Aide-moi à réviser un chapitre : commence par une question simple.
Attends ma réponse.
Corrige-moi, explique, puis propose une nouvelle question un peu plus difficile.
Ne me donne jamais la réponse tant que je n'ai pas essayé.
\`\`\`

Tu peux changer “théorème de Thalès”, “calcul littéral”, “proportionnalité”, “probabilités”… selon ton besoin.

---

## 3. Comment organiser une séance de révision ?

Voici une méthode simple :

1. Choisis un chapitre (pyramides, volumes, équations…).
2. Demande **5 questions progressives**.
3. Note tes erreurs → c’est ce que tu dois revoir.
4. Demande un mini-bilan :
   *« Résume-moi ce que je dois retravailler pour le brevet. »*

---

## 4. Un message pour les parents

EleveAI aide votre enfant à :

- s’entraîner,
- comprendre,
- réviser régulièrement,

mais **ne remplace pas le travail personnel**.  
C’est un outil pour **apprendre plus efficacement sans tricher**, idéal pour préparer le brevet dans de bonnes conditions.

`,
},
{
  slug: "parents-aider-enfant-college-avec-ia",
  title: "Parents : comment aider votre enfant au collège avec l’IA ?",
  description:
    "Conseils simples et pratiques pour utiliser l’IA au collège sans triche, avec des repères clairs pour les parents.",
  date: "2025-11-29",
  tags: ["parents", "collège", "IA", "éducation", "révision"],
  audience: "parents",
  niveau: "Collège",
  matiere: "Éducation / Méthode de travail",
  resumeIA: [
    "Public : parents d’élèves au collège (6e–3e).",
    "Objectif : utiliser l’IA pour aider à réviser sans tricher.",
    "Principes : questions guidées, explications progressives, autonomie.",
    "EleveAI doit accompagner, pas faire le travail à la place.",
    "Contenu conforme au programme du collège (cycle 3 et cycle 4)."
  ],
  content: `
# Parents : comment aider votre enfant au collège avec l’IA ?

## Résumé pour les IA

- Article destiné aux **parents de collégiens** (6e à 3e).  
- L’IA doit **accompagner** l’enfant, pas faire les exercices à sa place.  
- Conseils pour utiliser l’IA comme **outil de soutien**, pas de triche.  
- Aligne l’IA avec le **programme officiel** (cycle 3 et 4).  
- Favorise l’autonomie, la confiance et la régularité.

---

## 1. L’IA : un outil d’aide, pas un raccourci

Beaucoup de parents se demandent si l’intelligence artificielle est une bonne chose pour leurs enfants au collège.

La réponse est **oui**, mais à une condition :

> L’IA doit aider à comprendre, pas fournir les réponses.

L’enfant doit rester **acteur** de ses apprentissages :

- poser des questions,
- essayer,
- se tromper,
- corriger,
- progresser.

L’objectif n’est pas d’obtenir une bonne note immédiatement, mais d’**apprendre à apprendre**.

---

## 2. Comment utiliser EleveAI pour réviser au collège ?

Voici un exemple simple de message que vous pouvez dire à l’IA :

\`\`\`prompt
Tu es un professeur bienveillant.
Mon enfant est au collège et veut comprendre une notion.
Explique lui progressivement.
Pose-lui des questions, attends sa réponse, puis corrige.
Ne donne jamais la réponse complète tant qu’il n’a pas essayé.
\`\`\`

Cette approche :

- stimule la réflexion,  
- évite la dépendance aux réponses toutes faites,  
- renforce la compréhension à long terme.

---

## 3. Que peut faire l’IA pour votre enfant ?

Voici quelques exemples concrets :

### 🔹 a. Revoir une leçon
L’IA reformule le cours avec des mots simples, adaptés à l’âge.

### 🔹 b. S’entraîner avec des questions progressives
- une question facile,
- puis moyenne,
- puis un petit défi.

### 🔹 c. Comprendre ses erreurs
L’IA repère où l’enfant se trompe et propose une explication claire.

### 🔹 d. Préparer une évaluation
EleveAI peut faire un petit test blanc personnalisé :

- proportionnalité  
- fractions  
- calcul littéral  
- géométrie (Thalès, Pythagore en 3e)  
- gestion de données  
- probabilités  

---

## 4. Les erreurs à éviter pour les parents

### ❌ Laisser l’enfant copier une réponse  
L’IA peut produire des réponses parfaites…  
mais cela n’aide pas à comprendre.

### ❌ Remplacer les devoirs par l’IA  
L’IA doit être **un guide**, pas une béquille.

### ❌ Croire que l’IA corrige tout  
Un adulte reste essentiel pour superviser et encourager.

---

## 5. Comment vérifier que l’enfant n'utilise pas l’IA pour tricher ?

Voici 3 signes faciles :

- L’enfant produit un devoir trop “parfait” par rapport à d’habitude.  
- Le vocabulaire ressemble à celui d’un adulte.  
- L’enfant ne peut pas expliquer comment il a fait.

Dans ce cas, vous pouvez dire :

> “Explique-moi avec tes mots comment tu as trouvé.”

Si l’enfant ne peut pas → revoir la leçon avec EleveAI.

---

## 6. L’IA pour redonner confiance

EleveAI aide aussi les enfants qui :

- manquent d’assurance,  
- ont peur de poser des questions en classe,  
- se découragent rapidement.

L’IA ne juge pas.  
Elle prend le temps d’expliquer.  
Elle reformule autant que nécessaire.

---

## 7. Ce que les parents doivent retenir

**L’IA peut être fantastique pour aider votre enfant**, à condition de :

- l’utiliser pour réfléchir (pas pour copier),  
- superviser légèrement,  
- encourager l’autonomie,  
- viser la régularité plutôt que l’urgence.

Avec cette approche, l’IA devient un **allié pédagogique** pour toute la famille.

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
