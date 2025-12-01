// data/atelierIaPosts.ts

export type Audience = "college" | "lycee";

export type Seance = {
  numero: number;
  titre: string;
  duree: string; // ex: "1h", "1h30"
  objectifs: string[];
  contenu: string; // markdown
};

export type AtelierIaPost = {
  slug: string;
  title: string;
  description: string;
  date?: string; // si tu veux dater l’atelier
  audience: Audience;
  niveau: string; // ex : "6e", "4e-3e"
  lieu?: string; // ex : "Collège de l’Entre-Deux"
  tags: string[];
  resumeIA: string[]; // puces "pour l'IA"
  content: string; // intro de l’atelier en markdown
  seances: Seance[]; // les 3 séances
};

export const atelierIaPosts: AtelierIaPost[] = [
  {
    slug: "atelier-ia-entre-deux-6e",
    title: "Ateliers IA au collège : 3 séances pour les 6e à l’Entre-Deux",
    description:
      "Un parcours en 3 séances pour découvrir l’IA, apprendre à l’utiliser en sécurité et développer l’esprit critique des élèves de 6e.",
    date: "2025-12-01",
    audience: "college",
    niveau: "6e",
    lieu: "Collège de l’Entre-Deux",
    tags: ["6e", "IA", "collège", "éducation aux médias"],
    resumeIA: [
      "Public : élèves de 6e dans un collège de La Réunion.",
      "Parcours en 3 séances : découverte de l’IA, usage encadré, esprit critique.",
      "Objectifs : comprendre ce qu’est une IA, savoir l’utiliser à l’école, repérer les limites et les risques (fake, biais…).",
      "Conforme aux recommandations institutionnelles (éducation au numérique, EMI, respect RGPD) avec un cadre bienveillant.",
    ],
    content: `
# Ateliers IA au collège (6e) – Entre-Deux

Un parcours en **3 séances** pour :

- découvrir ce qu’est une IA,
- comprendre comment elle fonctionne,
- apprendre à l’utiliser **dans un cadre scolaire sécurisé**,
- développer l’**esprit critique** face aux réponses de l’IA.

Les activités sont adaptées à des **6e**, avec beaucoup d’oral, de manipulation guidée et de temps de débat.
`,
    seances: [
      {
        numero: 1,
        titre: "Séance 1 – Découvrir ce qu’est une IA",
        duree: "1h",
        objectifs: [
          "Identifier ce qu’est une IA (et ce qui n’en est pas).",
          "Comprendre que l’IA apprend à partir de données.",
          "Formuler ses premières questions à l’IA dans un cadre sécurisé.",
        ],
        contenu: `
### Contenu de la séance 1

- Brainstorming : “C’est quoi pour toi une IA ?”
- Tri d’exemples : objets / applis avec ou sans IA.
- Démonstration guidée : le professeur montre comment poser une question simple.
- Activité par binômes : chaque binôme écrit 1 question “bien formulée” pour l’IA.
- Mise en commun : lecture de quelques réponses, discussion sur ce qui est clair ou pas.
`,
      },
      {
        numero: 2,
        titre: "Séance 2 – Utiliser l’IA comme une aide scolaire (sans tricher)",
        duree: "1h",
        objectifs: [
          "Différencier aide à la compréhension et triche.",
          "Utiliser l’IA pour expliquer une notion avec des mots simples.",
          "Apprendre à reformuler sa demande (prompt) pour avoir une réponse plus claire.",
        ],
        contenu: `
### Contenu de la séance 2

- Rappel : les règles d’usage en classe (pas de triche, pas de copiés-collés).
- Exemple projeté : un élève demande à l’IA de faire son exercice → discussion.
- Atelier pratique : par groupes, les élèves demandent à l’IA :
  - d’expliquer une notion vue en cours (fractions, adjectifs, etc.),
  - de proposer un exemple supplémentaire.
- Chaque groupe doit ensuite **résumer avec ses propres mots** ce qu’il a compris.
`,
      },
      {
        numero: 3,
        titre: "Séance 3 – Questionner l’IA et développer l’esprit critique",
        duree: "1h",
        objectifs: [
          "Comprendre que l’IA peut se tromper.",
          "Apprendre à vérifier une information donnée par l’IA.",
          "Formuler des questions critiques : “Comment le sais-tu ?”, “Peux-tu vérifier ?”.",
        ],
        contenu: `
### Contenu de la séance 3

- Exemple d’erreur de l’IA projeté par le professeur.
- Discussion : pourquoi l’IA peut-elle se tromper ?
- Atelier : par groupes, les élèves demandent à l’IA une information simple (géographie, histoire, science…),
  puis vérifient avec un manuel, un site institutionnel ou le professeur.
- Mise en commun : chaque groupe présente un cas où l’IA avait raison ou tort, et comment il l’a vérifié.
`,
      },
    ],
  },
];

export function getAllAtelierIaPosts(): AtelierIaPost[] {
  return atelierIaPosts;
}

export function getAtelierIaPostBySlug(
  slug: string,
): AtelierIaPost | undefined {
  return atelierIaPosts.find((post) => post.slug === slug);
}
