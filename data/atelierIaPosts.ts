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
  date?: string;
  audience: Audience;
  niveau: string;
  lieu?: string;
  tags: string[];
  resumeIA: string[];
  content: string;
  seances: Seance[];
};

export const atelierIaPosts: AtelierIaPost[] = [
  {
    slug: "atelier-ia-entre-deux-6e",
    title:
      "Ateliers IA au collège : 3 séances créatives pour les 6e à l’Entre-Deux",
    description:
      "Un parcours en 3 séances pour découvrir l’IA, créer avec elle, apprendre à l’utiliser en sécurité et développer l’esprit critique des élèves de 6e.",
    date: "2025-12-01",
    audience: "college",
    niveau: "6e",
    lieu: "Collège de l’Entre-Deux",
    tags: ["6e", "IA", "collège", "créativité", "Noël", "EMI"],
    resumeIA: [
      "Public : élèves de 6e dans un collège de La Réunion.",
      "Parcours en 3 séances : découverte, création guidée, esprit critique.",
      "Objectifs : apprendre à créer avec l’IA (avion en papier, dessin d’objet, affiche de Noël).",
      "Conforme aux recommandations institutionnelles (EMI, RGPD, Eduscol).",
    ],
    content: `
# Ateliers IA au collège (6e) – Entre-Deux

Un atelier en **3 séances**, conçu pour apprendre à utiliser l’IA à l’école  
tout en laissant une grande place à la **créativité**, à l’**imagination**  
et au **raisonnement**.

Les élèves vont :

- découvrir comment fonctionne l’IA,
- apprendre à poser des demandes claires,
- créer **un avion en papier**, **le dessin d’un objet**, ou **une affiche de Noël**,
- vérifier, corriger et améliorer les propositions de l’IA.

Tout est pensé pour les élèves de **6e**, avec des temps d’oral, des manipulations, et des activités concrètes.
`,

    /* -----------------------------------------
       SÉANCE 1
    ----------------------------------------- */
    seances: [
      {
        numero: 1,
        titre:
          "Séance 1 – Découvrir l’IA (et comprendre que nous allons créer !)",
        duree: "1h",
        objectifs: [
          "Comprendre ce qu’est une IA et ce qu’elle peut faire.",
          "Savoir que l’IA peut proposer des idées pour imaginer, dessiner ou concevoir.",
          "Se préparer aux créations de la séance 2 : avion en papier, dessin d’objet, affiche de Noël.",
        ],
        contenu: `
### Contenu de la séance 1

- **Annonce du projet :**  
  “Dans cet atelier, nous allons *créer* : un avion en papier, un dessin d’objet ou une affiche de Noël… avec l’aide de l’IA !”

- **Discussion :**  
  “Comment l’IA peut-elle nous aider à imaginer ou à concevoir ?”

- **Tri d’exemples :**  
  Objets / applis avec IA vs sans IA.

- **Démonstrations courtes :**  
  - l’IA propose des idées de dessin,  
  - l’IA propose un pas-à-pas pour un avion en papier,  
  - l’IA propose une composition d’affiche de Noël.

- **Analyse :**  
  Qu’est-ce qui est clair ? qu’est-ce qui semble flou ?

- **Présentation du programme :**  
  - Séance 2 : création  
  - Séance 3 : correction et esprit critique

- **Mini-activité :**  
  Par binômes, les élèves demandent à l’IA une idée simple (robot, maison, animal, etc.)  
  et expliquent ce qu’ils aimeraient créer au prochain atelier.
        `,
      },

      /* -----------------------------------------
         SÉANCE 2
      ----------------------------------------- */
  {
    numero: 2,
    titre:
      "Séance 2 – Créer avec l’IA : avion en papier, dessin d’objet, affiche de Noël",
    duree: "1h",
    objectifs: [
      "Utiliser l’IA pour obtenir des étapes, des idées ou des conseils.",
      "Développer l’autonomie : chaque élève choisit son projet et sa façon d’apprendre.",
      "Coopérer en groupe pour créer une production réelle.",
      "Savoir adapter une consigne d’IA : simplifier, compléter, ajuster.",
    ],
    contenu: `
  ### Contenu détaillé de la séance 2

  ---

  ## 🔹 1. Introduction : chacun choisit son projet et sa manière d'apprendre

  Le professeur explique :

  > “Aujourd’hui, vous allez créer quelque chose avec l’IA.  
  > Et **vous choisissez votre projet** : avion en papier, dessin d’un objet, ou affiche de Noël.  
  > Vous choisissez aussi **votre manière d’apprendre** :  
  > - certains préfèrent lire des étapes,  
  > - d’autres préfèrent regarder une image,  
  > - d’autres préfèrent demander plusieurs fois à l’IA pour améliorer la consigne.  
  > Ici, **chacun avance à son rythme**.”

  Objectif : placer l’élève en **acteur** de son travail.

  ---

  ## 🔹 2. Organisation des groupes (3 projets possibles)

  Les élèves se regroupent **par affinité ou par envie créative** :

  ### **Groupe A · Avion en papier (✈️)**
  Demander à l’IA :  
  > “Propose un tutoriel simple, en 6 étapes maximum, pour un avion en papier adapté à des élèves de 6e.”

  Les élèves :
  - testent les étapes,
  - identifient les passages flous,
  - améliorent ensemble la clarté.

  ### **Groupe B · Dessin d’un objet (🧸)**
  Demander à l’IA :
  > “Explique comment dessiner cet objet en étapes simples pour un élève de 6e.”

  Chaque élève :
  - choisit un objet différent (autonomie),
  - compare son résultat avec celui des autres,
  - ajoute sa propre créativité (ombres, couleurs).

  ### **Groupe C · Affiche de Noël (🎄)**
  Demander à l’IA :
  > “Donne-moi un slogan, trois couleurs, et une mise en page simple pour une affiche de Noël pour un collège.”

  Les élèves :
  - se répartissent le travail (texte / couleurs / mise en page),
  - discutent des choix artistiques,
  - réalisent une affiche complète.

  ---

  ## 🔹 3. Travail en groupe : coopération + autonomie

  L’enseignant rappelle les règles :

  - **On lit ensemble la consigne proposée par l’IA.**
  - **Chaque élève réalise la tâche à sa manière.**
  - **On vérifie si l’IA a oublié une étape.**
  - **On propose une amélioration si besoin.**

  Exemples de liberté donnée aux élèves :

  - un élève peut demander à l’IA *“explique en phrases plus courtes”*,  
  - un autre peut demander *“donne une version avec des images”*,  
  - un autre peut demander *“fais une version plus simple / plus détaillée”*.

  **Chaque élève adapte la consigne à son style d’apprentissage.**

  ---

  ## 🔹 4. Mini-exposition : montrer, expliquer, valoriser

  En fin de séance :

  - les avions sont testés,  
  - les dessins affichés,  
  - les affiches de Noël présentées.

  Chaque groupe explique :

  - ce qui venait de l’IA,  
  - ce qui vient d’eux,  
  - ce qu’ils ont dû corriger, adapter, ou réinventer.

  ---
  `,
  },


      /* -----------------------------------------
         SÉANCE 3
      ----------------------------------------- */
 {
  numero: 3,
  titre:
    "Séance 3 – L’IA se trompe aussi : corriger, vérifier, améliorer (esprit critique)",
  duree: "1h",
  objectifs: [
    "Comprendre que l’IA peut se tromper ou être imprécise.",
    "Apprendre à vérifier une consigne, une image ou un tutoriel généré par l’IA.",
    "Développer l’autonomie : chaque élève choisit ce qu’il veut corriger ou approfondir.",
    "Coopérer pour améliorer collectivement une production.",
  ],
  contenu: `
### Contenu détaillé de la séance 3

---

## 🔹 1. Retour sur les créations de la séance 2

Chaque groupe revient sur son travail :

- Les étapes de l’avion étaient-elles claires ?
- Le dessin proposé était-il faisable ?
- La mise en page de l’affiche était-elle adaptée au collège ?

Le professeur fait verbaliser :

> “Qu’est-ce que vous avez dû corriger vous-mêmes hier ?”

→ On active la **métacognition**.

---

## 🔹 2. L’enseignant projette une consigne imparfaite de l’IA

Exemples possibles :

- un avion impossible à plier car une étape manque,
- un dessin trop complexe pour un 6e,
- un slogan de Noël peu adapté à La Réunion,
- une affiche trop chargée ou illisible.

Les élèves repèrent :

- les imprécisions,
- les erreurs,
- les informations incohérentes.

---

## 🔹 3. Travail en groupe : l’IA comme “assistant à corriger”

Chaque groupe choisit **une consigne qu’il veut améliorer**, selon sa préférence :

- avion  
- dessin  
- affiche  

Puis ils testent plusieurs demandes :

- “Explique en phrases plus courtes.”
- “Donne une version pour un élève de 6e.”
- “Ajoute une étape manquante.”
- “Simplifie la mise en page.”
- “Adapte pour La Réunion.”
- “Fais un schéma.”

👉 **Chaque élève choisit la demande qui correspond le mieux à sa façon d’apprendre** :

- certains veulent plus de détails,  
- d’autres veulent simplifier,  
- d’autres veulent une image,  
- certains veulent un exemple supplémentaire.

Cette partie renforce **l’autonomie** et **le sens critique**.

---

## 🔹 4. Comparaison “avant / après”

Les élèves affichent ou lisent :

- la consigne initiale de l’IA,
- la version améliorée par leur groupe.

Ils expliquent :

- ce qu’ils ont corrigé,
- pourquoi c’était important,
- ce que l’IA n’avait pas compris,
- ce qu’ils ont décidé eux-mêmes.

---

## 🔹 5. Conclusion de l’atelier

Le professeur rappelle :

> “L’IA peut être un bon assistant, mais c’est **vous** qui savez créer,
> corriger, vérifier, adapter.  
> Ce n’est jamais l’IA qui décide : c’est vous.”

Les élèves quittent la séance avec :

- une meilleure autonomie,  
- une créativité renforcée,  
- un esprit critique construit,  
- et la certitude qu’ils **peuvent apprendre à leur rythme**.
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
