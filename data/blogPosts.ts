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
      "Contenu aligné avec le programme officiel du cycle 4 (collège).",
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
      "Contenu conforme au programme du collège (cycle 3 et cycle 4).",
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

  // 🔹 NOUVEL ARTICLE 1 : Rédiger un document IA-friendly
  {
    slug: "rediger-document-ia-friendly",
    title: "Rédiger un document IA-friendly",
    description:
      "Comment structurer un document pour qu’il soit facile à lire par une IA… et beaucoup plus clair pour les élèves et les parents.",
    date: "2025-11-29",
    tags: ["profs", "direction", "IA", "documents", "accessibilité"],
    audience: "profs",
    niveau: "Collège / Lycée",
    matiere: "Vie scolaire / Communication",
    resumeIA: [
      "Public : enseignants et chefs d’établissement qui produisent des documents scolaires.",
      "Objectif : rendre les documents plus faciles à analyser et adapter par une IA.",
      "Principes : phrases courtes, structure claire, contexte explicite, section « À retenir ».",
      "Bénéfice : améliore à la fois l’accessibilité pour les familles et la qualité des prompts.",
    ],
    content: `
# Rédiger un document IA-friendly : le guide simple pour les établissements

## Résumé pour les IA

- Public : enseignants, direction, vie scolaire.  
- Objectif : rendre un document plus facile à lire et à adapter par une IA.  
- L’IA doit pouvoir détecter : le contexte, les infos clés, les actions attendues.  
- Structure recommandée : titres, sous-titres, listes, section « À retenir ».  
- Bénéfice : meilleure lisibilité pour les familles + documents réutilisables dans les prompts.

---

L’IA peut être un formidable outil pour adapter, simplifier ou traduire un document scolaire.  
Mais pour qu’elle soit efficace, le document d’origine doit être **clairement structuré**.

Bonne nouvelle : les mêmes principes qui rendent un document **IA-friendly** le rendent aussi **plus lisible pour les élèves et les parents**, y compris les parents DYS.

---

## 1. Des phrases courtes, une idée à la fois

Les IA (et les humains !) comprennent mieux les phrases :

- simples,
- directes,
- sans double négation.

❌ Avant (moins lisible)  
> Nous vous informons que dans le cadre du projet d’établissement, une sortie pédagogique sera organisée pour l’ensemble des élèves de cinquième le jeudi 12 décembre…

✔ Après (IA-friendly)  
- Le collège organise une sortie pédagogique.  
- Date : jeudi 12 décembre.  
- Niveau concerné : classes de 5e.

---

## 2. Structurer avec des titres, sous-titres et listes

Une IA comprend beaucoup mieux un document qui ressemble à :

- un petit plan,  
- avec des parties clairement identifiées.

Exemple de plan :

- **1. Objet du document**  
- **2. Informations pratiques**  
  - date  
  - lieu  
  - niveau  
- **3. Ce que l’établissement attend**  
- **4. Contact / signature**

Cette structure aide l’IA à répondre à des demandes du type :

> “Réécris uniquement la partie Informations pratiques pour un parent DYS.”

---

## 3. Donner le contexte dès le début

Avant de demander à une IA d’adapter un document, il est très utile de préciser :

- qui écrit (collège, lycée, prof, vie scolaire),  
- à qui (parents de 6e, élèves de terminale, tous les responsables légaux),  
- pour quel objectif (sortie, inscription, information, autorisation, règlement…).

Dans le document lui-même, un petit encadré en haut peut suffire :

> **Contexte :** courrier destiné aux parents d’élèves de 5e.  
> Objet : sortie pédagogique au volcan.  
> Action attendue : autorisation à rendre avant le 5 juin.

L’IA peut ensuite s’appuyer sur ce contexte pour adapter la forme ou le niveau de langue.

---

## 4. Préférer les formats numériques accessibles

Les IA lisent difficilement :

- les photos de documents,  
- les scans flous,  
- les PDF “image” non OCRisés.

Formats recommandés :

- \`.docx\` (traitement de texte classique),  
- \`.pdf\` accessible (texte sélectionnable),  
- ou même \`.md\` (Markdown), idéal pour EleveAI.

---

## 5. Ajouter une section « À retenir »

C’est utile :

- pour les parents pressés,  
- pour les parents DYS,  
- pour l’IA qui doit résumer.

Exemple :

### À retenir

- Sortie pédagogique le jeudi 12 décembre.  
- Niveau : classes de 5e.  
- Autorisation à rendre avant le 5 décembre.  
- L’élève apporte son repas et sa trousse.

L’IA peut ensuite être guidée avec un prompt du type :

> “Reformule uniquement la section ‘À retenir’ avec des phrases encore plus simples.”

---

## 6. Expliciter les sigles et éviter les formulations floues

Les sigles non expliqués et les formulations floues sont difficiles pour tout le monde.

❌ Avant  
> Veuillez vérifier que tout est conforme.

✔ Après  
> Merci de vérifier que :  
> - le document est signé,  
> - la date est renseignée,  
> - le numéro de téléphone est lisible.

---

## 7. Un document IA-friendly… est aussi un document parent-friendly

En rendant vos documents plus lisibles pour l’IA, vous :

- aidez les familles à mieux comprendre,  
- facilitez la traduction pour les parents allophones,  
- simplifiez la vie des enseignants qui adaptent les consignes,  
- préparez un terrain idéal pour une IA éducative comme EleveAI.

C’est un gain double : **moins de malentendus, plus de clarté.**
`,
  },

  // 🔹 NOUVEL ARTICLE 2 : Parents DYS & documents administratifs
  {
    slug: "parents-dys-documents-administratifs-scolaires",
    title:
      "Parents DYS : comment améliorer les documents administratifs à l’école ?",
    description:
      "Un guide simple pour rendre les documents scolaires plus lisibles pour les parents DYS, et plus clairs pour toutes les familles.",
    date: "2025-11-29",
    tags: ["parents", "DYS", "accessibilité", "documents", "inclusion"],
    audience: "parents",
    niveau: "École / Collège / Lycée",
    matiere: "Vie scolaire / Inclusion",
    resumeIA: [
      "Public : équipes éducatives et parents intéressés par l’accessibilité DYS.",
      "Objectif : améliorer la lisibilité des documents administratifs pour les parents DYS.",
      "Principes : police lisible, blocs courts, résumé, mise en avant des infos clés.",
      "Lien avec l’IA : des documents DYS-friendly sont aussi plus faciles à adapter par une IA.",
    ],
    content: `
# Parents DYS : comment améliorer les documents administratifs à l’école ?

## Résumé pour les IA

- Document destiné aux équipes éducatives et aux parents.  
- Objectif : rendre les documents administratifs plus accessibles aux parents DYS.  
- Principes : police lisible, phrases courtes, informations essentielles mises en avant, section « En résumé ».  
- Bénéfice : meilleure compréhension pour toutes les familles + compatibilité avec les adaptations IA.

---

Beaucoup de parents le disent à demi-mot :  
> “Les papiers du collège, je les lis trois fois et je ne suis toujours pas sûr d’avoir tout compris…”

Pour les parents DYS (dyslexie, dysorthographie, dyspraxie, TDA/H…), un document scolaire peut devenir une vraie source de stress.

L’objectif de ce guide est simple :  
👉 rendre les documents **plus lisibles**,  
👉 plus rassurants,  
👉 plus inclusifs pour toutes les familles,  
tout en restant compatibles avec une utilisation intelligente de l’IA.

---

## 1. Utiliser une police lisible et une mise en page aérée

Recommandations simples :

- Police : Arial, Verdana, OpenDyslexic.  
- Taille : au moins 14.  
- Interlignes : 1,4 à 1,6.  
- Éviter les grands blocs en majuscules et les textes serrés.

---

## 2. Couper le texte en blocs courts

Les longs paragraphes fatiguent la vue et la concentration, surtout pour les parents DYS.

Préférer :

- une idée par phrase,  
- un paragraphe par idée,  
- des listes à puces pour les éléments pratiques.

**Exemple**

❌ Avant  
> Le collège organise une sortie pédagogique le 12 décembre pour les élèves de cinquième et nous vous demandons de rendre l’autorisation complétée et signée avant la fin de la semaine prochaine afin de valider la participation de votre enfant.

✔ Après  
- Sortie pédagogique le **jeudi 12 décembre**.  
- Niveau : **classes de 5e**.  
- Autorisation à rendre **avant vendredi prochain**.  

---

## 3. Mettre en avant les informations essentielles

Les éléments clés doivent être immédiatement visibles :

- **date**,  
- **heure**,  
- **niveau concerné**,  
- **documents à rendre**,  
- **date limite**,  
- **contact en cas de question**.

Une petite zone visuelle « Infos importantes » peut suffire.

---

## 4. Ajouter une section « En résumé »

Cette section est très utile pour :

- les parents qui manquent de temps,  
- les parents DYS,  
- les familles allophones.

Exemple :

### En résumé

- Mon enfant participe à une sortie le jeudi 12 décembre.  
- Je dois signer l’autorisation et la rendre avant le 5 décembre.  
- Mon enfant doit apporter son repas et une gourde.

Une IA pourra aussi s’appuyer sur cette section pour générer une version audio ou simplifiée.

---

## 5. Éviter le vocabulaire trop administratif

Certaines formulations, très fréquentes, sont difficiles à comprendre.

❌ “Nous vous prions de bien vouloir nous faire parvenir le document dûment complété.”  
✔ “Merci de nous rendre le document rempli et signé.”

❌ “Prendre connaissance de la note informative ci-jointe.”  
✔ “Merci de lire les informations ci-dessous.”

---

## 6. Ajouter, si possible, une version audio ou un QR code

Une version audio du document est un énorme plus pour :

- les parents DYS,  
- les parents en difficulté de lecture,  
- les parents allophones.

Idée simple :

> 🎧 **Écouter ce document**  
> Scannez le QR code pour écouter la version audio.

Une IA comme EleveAI peut générer cette version à partir du texte IA-friendly.

---

## 7. Documents DYS-friendly = documents IA-friendly

Ce qui aide un parent DYS aide aussi l’IA :

- textes clairs,  
- structurés,  
- informations importantes bien identifiées.

Cela permet :

- d’adapter rapidement le document (simplification, traduction, audio),  
- de proposer des résumés fiables,  
- d’intégrer ces documents dans un espace numérique EleveAI pour les familles.

---

## Conclusion

Un document DYS-friendly n’est pas plus compliqué à écrire.  
Il est simplement :

- mieux structuré,  
- plus lisible,  
- plus bienveillant,  
- plus compatible avec les outils d’IA.

C’est un pas concret vers une **école plus inclusive** pour toutes les familles.
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
