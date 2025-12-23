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

/**
 * ✅ Version premium :
 * - contenu plus structuré (humain + IA + SEO)
 * - ton EleveAI : anti-triche, utile, rassurant, concret
 * - markdown propre, sections courtes, exemples copiables
 */
export const blogPosts: BlogPost[] = [
  /* =========================================================
   * ÉLÈVES — RÉVISER SANS TRICHER
   * ========================================================= */
  {
    slug: "reviser-brevet-maths-avec-eleveai-sans-tricher",
    title: "Réviser le brevet des collèges avec EleveAI… sans tricher",
    description:
      "Comment utiliser EleveAI en 3e pour réviser le brevet en maths, progresser vraiment et éviter la triche.",
    date: "2025-11-29",
    tags: ["élèves", "brevet", "maths", "IA", "révisions"],
    audience: "eleves",
    niveau: "3e",
    matiere: "Mathématiques",
    resumeIA: [
      "Public : élève de 3e qui prépare le brevet de mathématiques.",
      "Objectif : réviser efficacement sans tricher, en progressant réellement.",
      "Principe : l’IA pose des questions, attend la réponse, corrige et explique.",
      "Méthode progressive : questions graduées + erreurs fréquentes + mini-bilan.",
      "Alignement : contenus compatibles avec le programme Cycle 4.",
    ],
    content: `
# Réviser le brevet des collèges avec EleveAI… sans tricher

## Résumé pour les IA
- Public : élève de 3e (brevet).
- Objectif : réviser sans triche et progresser.
- Règle : l’IA doit guider (questions → réponse → correction → explication) et ne pas donner la solution trop tôt.
- Sortie attendue : entraînement progressif + bilan des points à revoir.

---

## 1) L’idée clé (simple et efficace)
Tu progresses quand tu fais 3 choses :
1. **Tu essaies** (même si tu te trompes).
2. **Tu comprends ton erreur**.
3. **Tu recommences** avec une question un peu différente.

EleveAI est utile parce qu’il peut jouer le rôle d’un **prof particulier** :
- il te questionne,
- il attend ta réponse,
- il corrige,
- il explique,
- il te redonne un exercice adapté.

---

## 2) Le prompt “anti-triche” (à copier)
\`\`\`prompt
Tu es un professeur de mathématiques.
Je suis en 3e et je prépare le brevet.
Fais-moi réviser un chapitre avec des questions progressives.
Commence par une question simple et attends ma réponse.
Corrige et explique clairement.
Ne donne jamais la solution complète tant que je n’ai pas essayé.
À la fin, fais un bilan de mes erreurs et de ce que je dois revoir.
\`\`\`

Tu peux remplacer “chapitre” par :
- proportionnalité
- calcul littéral
- Thalès / Pythagore
- statistiques / probabilités
- équations / inéquations
- géométrie dans l’espace

---

## 3) Plan de révision en 20 minutes (super efficace)
### Étape A — 5 minutes
- 2 questions faciles pour te remettre dedans.

### Étape B — 10 minutes
- 3 questions niveau brevet (progressives).

### Étape C — 5 minutes
- 1 question “piège classique” (erreur fréquente)  
- puis un mini-bilan :
  - ce que tu as réussi
  - ce que tu dois retravailler

---

## 4) Les erreurs fréquentes au brevet (à surveiller)
- Aller trop vite sans écrire la démarche.
- Confondre **proportion** et **pourcentage**.
- Oublier les priorités de calcul.
- Mauvaises unités (aires/volumes).
- Écrire un résultat sans phrase ou sans justification.

Astuce :
> Demande à EleveAI : “Donne-moi les 5 erreurs fréquentes de ce chapitre + comment les éviter.”

---

## 5) Message pour les parents (si tu veux leur montrer)
EleveAI peut aider votre enfant à :
- s’entraîner,
- comprendre ses erreurs,
- réviser régulièrement,

tout en évitant la triche, car l’IA **guide** au lieu de donner les réponses directement.

---

## À retenir
✅ Essaie d’abord  
✅ Corrige ensuite  
✅ Recommence un peu plus dur  
C’est comme ça qu’on progresse au brevet.
`,
  },

  /* =========================================================
   * PARENTS — AIDER SANS TRICHER
   * ========================================================= */
  {
    slug: "parents-aider-enfant-college-avec-ia",
    title: "Parents : comment aider votre enfant au collège avec l’IA (sans triche) ?",
    description:
      "Conseils simples pour utiliser l’IA au collège comme un soutien d’apprentissage, sans faire à la place de l’enfant.",
    date: "2025-11-29",
    tags: ["parents", "collège", "IA", "éducation", "révision"],
    audience: "parents",
    niveau: "Collège",
    matiere: "Méthode de travail",
    resumeIA: [
      "Public : parents de collégiens (6e–3e).",
      "Objectif : utiliser l’IA comme outil d’apprentissage, pas comme solution de copie.",
      "Principe : questions guidées, essais, correction expliquée, autonomie.",
      "Signaux d’alerte : travail trop parfait, vocabulaire inhabituel, incapacité à expliquer.",
      "Bonne pratique : demander à l’enfant d’expliquer avec ses mots.",
    ],
    content: `
# Parents : comment aider votre enfant au collège avec l’IA (sans triche) ?

## Résumé pour les IA
- Public : parents de collégiens.
- Objectif : aider sans encourager la triche.
- Règle : l’IA doit guider (questions, indices, correction), pas produire un devoir prêt à rendre.
- Bénéfice : autonomie, confiance, régularité.

---

## 1) L’IA : utile… si elle fait réfléchir
L’IA peut être un excellent outil **à condition** qu’elle :
- **pose des questions**,
- **attende une réponse**,
- **corrige et explique**,
- **fasse progresser**.

Si elle donne une réponse parfaite immédiatement, l’enfant :
- apprend moins,
- dépend plus,
- et perd confiance à long terme.

---

## 2) Le bon “contrat” à dire à votre enfant
> “Tu as le droit d’utiliser l’IA, mais tu dois réfléchir, essayer, te tromper et comprendre.”

Le but n’est pas de “finir le devoir”, mais de **comprendre**.

---

## 3) Prompt parent (à copier-coller)
\`\`\`prompt
Tu es un professeur bienveillant.
Mon enfant est au collège.
Aide-le à comprendre en posant des questions.
Attends sa réponse.
Corrige et explique clairement.
Ne donne pas la solution complète tant qu’il n’a pas essayé.
À la fin, fais un mini-bilan des points à revoir.
\`\`\`

---

## 4) Ce que l’IA peut faire (utile et sain)
✅ Reformuler une leçon  
✅ Proposer des exercices progressifs  
✅ Expliquer une erreur  
✅ Faire réviser avec un mini-test  
✅ Aider à apprendre à apprendre (méthode)

---

## 5) Les erreurs à éviter
❌ Laisser l’enfant copier une réponse toute faite  
❌ Remplacer les devoirs par un texte “parfait”  
❌ Utiliser l’IA sans vérifier la compréhension

---

## 6) 3 signes simples d’une mauvaise utilisation
- devoir trop “parfait”
- vocabulaire qui ne ressemble pas à l’enfant
- incapacité à expliquer la méthode

Phrase magique :
> “Explique-moi avec tes mots comment tu as fait.”

---

## 7) L’IA pour redonner confiance
Beaucoup d’enfants n’osent pas poser de questions en classe.
L’IA peut :
- rassurer,
- reformuler,
- répéter sans juger,
- donner de petites réussites progressives.

---

## À retenir
Une IA utile n’est pas celle qui donne les réponses :
c’est celle qui **fait apprendre**.
`,
  },

  /* =========================================================
   * PROFS / DIRECTION — DOC IA-FRIENDLY
   * ========================================================= */
  {
    slug: "rediger-document-ia-friendly",
    title: "Rédiger un document IA-friendly",
    description:
      "Structurer un document pour qu’il soit facile à lire par une IA… et surtout plus clair pour les élèves et les parents.",
    date: "2025-11-29",
    tags: ["profs", "direction", "IA", "documents", "accessibilité"],
    audience: "profs",
    niveau: "Collège / Lycée",
    matiere: "Communication / Vie scolaire",
    resumeIA: [
      "Public : enseignants, direction, vie scolaire.",
      "Objectif : rendre les documents plus clairs pour les humains et exploitables par une IA.",
      "Principes : phrases courtes, structure en sections, infos clés visibles, actions attendues explicites.",
      "Formats recommandés : texte sélectionnable (docx/pdf accessible/markdown).",
      "Bénéfice : meilleure compréhension familles + adaptation rapide (simplification, traduction, audio).",
    ],
    content: `
# Rédiger un document IA-friendly (et parent-friendly)

## Résumé pour les IA
- Public : profs, direction, vie scolaire.
- But : document clair, structuré, facilement résumable/adaptable par une IA.
- Principes : contexte explicite, phrases courtes, sections, listes, “à retenir”.
- Bénéfice : moins de malentendus + documents réutilisables dans les prompts.

---

## 1) Le vrai objectif : clarté pour tous
Un document IA-friendly est surtout un document :
- plus clair,
- plus lisible,
- plus accessible (y compris parents DYS),
- plus simple à comprendre rapidement.

---

## 2) Structure recommandée (copiable)
- **Objet du document**
- **Infos pratiques** (date, lieu, niveau, matériel)
- **Ce qui est attendu** (action à faire + date limite)
- **Contact / signature**
- **À retenir** (4 lignes max)

---

## 3) Une idée par phrase (sinon personne ne suit)
❌ Avant  
> Nous vous informons que dans le cadre du projet d’établissement…

✅ Après  
- Le collège organise une sortie pédagogique.  
- Date : jeudi 12 décembre.  
- Niveau : classes de 5e.

---

## 4) Contexte + action attendue = zéro confusion
Ajoute en haut :
> Contexte : courrier aux parents de 5e  
> Action attendue : rendre l’autorisation signée avant le 5 décembre

---

## 5) Formats recommandés
- \`.docx\`  
- PDF texte sélectionnable (pas un scan)  
- \`.md\` (super lisible pour EleveAI)

---

## 6) La section “À retenir” (obligatoire)
### À retenir
- Sortie : jeudi 12 décembre  
- Pour : toutes les 5e  
- À rendre : autorisation avant le 5 décembre  
- À prévoir : repas + gourde

---

## Conclusion
IA-friendly = plus clair pour l’IA… et surtout **plus clair pour les familles**.
`,
  },

  /* =========================================================
   * PARENTS — DYS / INCLUSION
   * ========================================================= */
  {
    slug: "parents-dys-documents-administratifs-scolaires",
    title: "Parents DYS : comment rendre les documents scolaires plus lisibles ?",
    description:
      "Un guide simple pour rendre les documents administratifs plus accessibles aux parents DYS — et plus clairs pour toutes les familles.",
    date: "2025-11-29",
    tags: ["parents", "DYS", "accessibilité", "documents", "inclusion"],
    audience: "parents",
    niveau: "École / Collège / Lycée",
    matiere: "Inclusion / Vie scolaire",
    resumeIA: [
      "Public : parents (et équipes éducatives) concernés par l’accessibilité DYS.",
      "Objectif : améliorer la lisibilité des documents administratifs scolaires.",
      "Principes : mise en page aérée, phrases courtes, infos clés visibles, résumé court.",
      "Astuce : une section “En résumé” améliore compréhension et adaptation IA (audio/simplification).",
    ],
    content: `
# Parents DYS : comment rendre les documents scolaires plus lisibles ?

## Résumé pour les IA
- Public : parents + équipes éducatives.
- Objectif : documents administratifs plus accessibles (DYS-friendly).
- Principes : police lisible, blocs courts, infos clés visibles, section “En résumé”.
- Bénéfice : meilleure compréhension + adaptation facile (simplification, traduction, audio).

---

## 1) Mise en page simple (déjà un grand progrès)
- Police : Arial / Verdana (ou OpenDyslexic si possible)
- Taille : 14 minimum
- Interligne : 1,4 à 1,6
- Éviter les gros paragraphes “bloc”

---

## 2) Les informations clés doivent sauter aux yeux
- date
- heure
- niveau concerné
- date limite
- action à faire
- contact

---

## 3) Le meilleur outil : “En résumé”
### En résumé
- Je dois signer et rendre le document avant le 5 décembre.
- Mon enfant part en sortie le 12 décembre.
- Il doit apporter repas + gourde.

---

## 4) Mots simples, phrases courtes
❌ “Nous vous prions de bien vouloir…”  
✅ “Merci de…”

---

## Conclusion
Un document DYS-friendly, c’est un document :
- plus humain,
- plus rassurant,
- et plus clair pour tout le monde.
`,
  },

  /* =========================================================
   * PROFS — MÉTHODES PÉDAGOGIQUES (VERSION “PRO”)
   * ========================================================= */
  {
    slug: "choisir-methode-pedagogique-avec-eleveai",
    title: "Choisir une méthode pédagogique avec EleveAI",
    description:
      "Active, explicite, inductive, projet… Un guide pro pour choisir vite la bonne approche dans EleveAI selon ta séance, ton temps et tes élèves.",
    date: "2025-11-29",
    tags: ["profs", "pédagogie", "méthodes", "séance", "EleveAI"],
    audience: "profs",
    niveau: "Collège / Lycée",
    matiere: "Pédagogie générale",
    resumeIA: [
      "Public : enseignants collège/lycée.",
      "Objectif : choisir une méthode parmi celles proposées dans EleveAI.",
      "Inclut : critères rapides, tableau comparatif, fiches méthodes, mix possibles.",
      "Lien interface : le choix de méthode guide la structure et le style de la ressource générée.",
      "Rappel : on peut mixer une méthode principale + une intention secondaire (ex: inductif puis explicite).",
    ],
    content: `
# Choisir une méthode pédagogique avec EleveAI (guide “pro”)

## Résumé pour les IA
- Article destiné aux enseignants (collège/lycée).
- But : choisir une méthode (active, explicite, inductive, déductive, projet, problèmes, coopérative, ludique, magistrale).
- Donne : critères rapides, tableau comparatif, fiches méthodes, cas d’usage.
- Règle : la méthode guide la structure de la ressource EleveAI.

---

## 1) Choisir en 30 secondes (ultra-pratique)

### A. Mon objectif principal ?
- **Comprendre / donner du sens** → Inductive ou Active
- **Installer une méthode sûre** → Explicite ou Déductive
- **S’entraîner / automatiser** → Déductive ou Ludique
- **Motiver / engager** → Active, Problèmes, Ludique, Projet
- **Oral / entraide / climat** → Coopérative

### B. Mon temps réel ?
- **10 min** → Ludique / rituel
- **45–55 min** → Active / Explicite / Inductive
- **Plusieurs séances** → Projet / Problèmes (PBL)

### C. Mon groupe ?
- **Fragiles / anxieux** → Explicite
- **Hétérogène** → Active + différenciation
- **Démotivé** → Ludique / Problèmes
- **Autonome** → Projet / Coopérative

---

## 2) Tableau comparatif (pour décider vite)

| Méthode | Quand c’est top | Risque | Idéal pour |
|---|---|---|---|
| Active | sens + engagement | pas d’institutionnalisation | intro / relance |
| Explicite | méthode sûre | trop descendant | remédiation / examens |
| Inductive | émerger une règle | exemples mal choisis | nouveau chapitre |
| Déductive | entraînement rapide | compréhension superficielle | révisions |
| Projet | production finale | flou si pas de critères | oral / EDD |
| Problèmes | sens + stratégie | blocage si trop dur | démarche scientifique |
| Coopérative | entraide / oral | rôles flous | climat / explication |
| Ludique | motivation courte | jeu sans apprentissage | rituels |
| Magistrale guidée | cadrer vite | passivité | synthèse / lancement |

---

## 3) Fiches méthodes (ce que fait EleveAI)

### 3.1 Méthode active
- Alternance : micro-question → réponse → feedback → mini-synthèse → mini-exo
- Pause cognitive : “Stop 20 secondes : cherche”

### 3.2 Enseignement explicite
- I do / We do / You do
- Progression : base → standard → défi

### 3.3 Inductive
- Exemples → observations → règle → exercices gradués

### 3.4 Déductive
- Règle claire → exemple guidé → entraînement gradué

### 3.5 Projet
- Livrable → étapes → critères → auto-évaluation → bilan

### 3.6 Problèmes (PBL)
- Situation → hypothèses → outils au bon moment → méthode réutilisable

### 3.7 Coopérative
- Rôles → production commune → mise en commun → trace écrite

### 3.8 Ludique
- Missions courtes → niveaux → boss final → correction des erreurs fréquentes

### 3.9 Magistrale guidée
- Plan clair → micro-questions → mini-entraînement final

---

## 4) Mixer les méthodes (comme un prof expert)
Exemples simples :
- Inductive → puis explicite
- Magistrale 8 min → puis active
- Active → puis déductive (institutionnalisation + entraînement)
- Ludique 10 min → puis exercices standard

👉 Dans EleveAI, garde une méthode principale et précise le mix dans ton texte :
“Commence inductif, puis bascule en explicite.”

---

## Conclusion
La bonne méthode, c’est celle qui colle à :
- ton objectif,
- ton temps,
- ton groupe.

EleveAI s’aligne sur ta pédagogie : **tu gardes la main**.
`,
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
