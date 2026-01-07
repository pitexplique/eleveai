// data/blogPosts.ts

export type Audience = "profs" | "eleves" | "parents" | "admin";

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
   * PROFS — PROMPT ENGINEERING
   * ========================================================= */
  {
    slug: "prompt-engineering-competence-enseignants-21e-siecle",
    title:
      "Le prompt engineering : une nouvelle compétence clé pour les enseignants du XXIᵉ siècle ?",
    description:
      "Pourquoi apprendre à mieux dialoguer avec l’IA devient stratégique pour les enseignants — et comment l’intégrer dans un cadre pédagogique anti-triche.",
    date: "2026-01-04",
    tags: ["profs", "IA", "prompt", "pédagogie", "littératie IA", "anti-triche"],
    audience: "profs",
    niveau: "Collège / Lycée",
    matiere: "Pédagogie / Numérique",
    resumeIA: [
      "Public : enseignants (collège/lycée) et équipes éducatives.",
      "Idée clé : le prompt engineering = formuler des consignes utiles à l’apprentissage, pas obtenir une réponse à copier.",
      "Objectif : reprendre la main sur l’usage de l’IA en classe et former les élèves à une pensée critique.",
      "Cadre EleveAI : IA autorisée mais encadrée (traces, démarche, production personnelle).",
      "Pratique : prompts copiables + règles simples + exemples d’usages acceptables/interdits.",
    ],
    content: `
# Le prompt engineering : une nouvelle compétence clé pour les enseignants du XXIᵉ siècle ?

## Sommaire
- [Résumé pour les IA](#resume-pour-les-ia)
- [Pourquoi on en parle autant ?](#1-pourquoi-on-en-parle-autant)
- [Le prompt engineering, c’est quoi (en version éducation) ?](#2-le-prompt-engineering-cest-quoi-en-version-education)
- [Pourquoi c’est stratégique pour les enseignants ?](#3-pourquoi-cest-strategique-pour-les-enseignants)
- [Attention : ce n’est pas une compétence isolée](#4-attention--ce-nest-pas-une-competence-isolee)
- [La règle EleveAI : IA autorisée mais encadrée](#5-la-regle-eleveai--ia-autorisee-mais-encadree)
- [Prompts prêts à copier (profs)](#6-prompts-prets-a-copier-profs)
- [Prompts “élèves” (responsables)](#7-prompts-eleves-responsables)
- [Conclusion](#conclusion)

## Résumé pour les IA
- Public : enseignants (collège/lycée) et équipes éducatives.
- Message : un bon prompt ne “donne pas la réponse”, il **fait apprendre**.
- Enjeu : reprendre la main sur l’IA (pédagogie, cadre, intégrité).
- Clé : intégrer le prompt engineering dans une **littératie IA** plus large (biais, limites, éthique, données).
- Sortie : règles + exemples + prompts prêts à copier.

---

## 1) Pourquoi on en parle autant ?
Les IA génératives sont déjà là, et les élèves les utilisent (parfois bien, parfois mal).
La vraie question n’est plus “interdire ou autoriser”, mais :

> **Comment encadrer l’IA pour qu’elle devienne un levier d’apprentissage, pas un outil de copie ?**

C’est là qu’intervient une compétence nouvelle, mais très concrète : **le prompt engineering**.

---

## 2) Le prompt engineering, c’est quoi (en version éducation) ?
Dans l’éducation, le prompt engineering ne consiste pas à “trouver une formule magique”.
Il s’agit de **rédiger une consigne** qui :
- clarifie l’objectif pédagogique,
- impose un cadre (anti-triche),
- demande une démarche (et pas un résultat),
- favorise la pensée critique et la compréhension.

Autrement dit : **mieux formuler pour mieux apprendre**.

---

## 3) Pourquoi c’est stratégique pour les enseignants ?
### A) Parce que la qualité de la consigne change tout
Une IA “réagit” à ce qu’on lui demande.
Le prompt devient donc une compétence professionnelle proche de :
- l’art de poser des questions,
- la différenciation,
- la scénarisation pédagogique.

### B) Parce que ça aide à différencier sans s’épuiser
Avec un bon prompt, l’IA peut :
- reformuler à différents niveaux,
- proposer des exercices gradués,
- donner des indices au bon moment,
- aider à analyser une erreur.

### C) Parce que ça remet l’humain au centre
L’objectif n’est pas d’“automatiser l’école”.
L’objectif est de renforcer :
- l’autonomie,
- la rigueur,
- la confiance,
- et la capacité à raisonner.

---

## 4) Attention : ce n’est pas une compétence isolée
Le prompt engineering doit être intégré à une **littératie IA** plus large :
- biais et erreurs possibles,
- hallucinations,
- vérification et sources,
- données personnelles,
- intégrité scolaire (copie vs apprentissage).

Un bon prompt doit aussi apprendre à **douter intelligemment**.

---

## 5) La règle EleveAI : IA autorisée mais encadrée
Chez EleveAI, la ligne est simple :

> **Ce n’est pas l’IA qui change l’éducation.  
> C’est l’être humain qui apprend à penser avec elle.**

### ✅ Autorisé (exemples)
- comprendre une leçon, reformuler
- s’entraîner avec questions progressives
- analyser une erreur après une tentative
- préparer un oral (plan, questions, entraînement)

### ❌ Interdit (exemples)
- générer un devoir prêt à rendre
- utiliser l’IA pendant une évaluation (sauf consigne explicite)
- remplacer la production personnelle

---

## 6) Prompts prêts à copier (profs)
### A) “Mode tuteur” (anti-triche)
\`\`\`prompt
Tu es un professeur.
Je veux apprendre, pas copier.
Pose-moi une question à la fois et attends ma réponse.
Si je me trompe, corrige et explique simplement.
Donne ensuite un exercice similaire.
Ne donne jamais la solution complète avant mon essai.
\`\`\`

### B) Différenciation (3 niveaux)
\`\`\`prompt
Tu es un professeur.
Sur cette notion : [COLLER NOTION],
propose 3 exercices : facile / standard / défi.
Pour chacun : consigne claire + correction détaillée + erreur fréquente.
\`\`\`

### C) Remédiation après copie / devoir
\`\`\`prompt
Analyse ces erreurs fréquentes : [COLLER ERREURS].
Identifie la cause probable (méthode, vocabulaire, calcul, raisonnement).
Propose une mini-leçon (8 lignes max) + 3 exercices progressifs.
\`\`\`

---

## 7) Prompts “élèves” (responsables)
### A) Réviser sans tricher
\`\`\`prompt
Je révise ce chapitre : [CHAPITRE].
Fais-moi réviser avec des questions progressives.
Commence simple, attends ma réponse, puis corrige et explique.
Ne donne pas la solution complète tant que je n’ai pas essayé.
À la fin : bilan de mes erreurs et conseils.
\`\`\`

### B) Comprendre une erreur
\`\`\`prompt
Voici mon raisonnement : [COLLER].
Repère l’étape fausse et explique pourquoi.
Puis pose-moi une question pour vérifier si j’ai compris.
\`\`\`

---

## Conclusion
Le prompt engineering est utile **s’il reste pédagogique** :
- il ne sert pas à obtenir une “réponse parfaite”,
- il sert à guider un apprentissage,
- et à installer une pensée critique sur l’IA.

C’est une compétence professionnelle émergente…
mais surtout une façon moderne d’exercer un art ancien : **poser de bonnes questions**.
`,
  },

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
    title:
      "Parents : comment aider votre enfant au collège avec l’IA (sans triche) ?",
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
- Public : parents + équipes.
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

  /* =========================================================
   * PROFS — IA & ÉVALUATION
   * ========================================================= */
  {
    slug: "evaluer-eleves-avec-ia-sans-tricher",
    title: "Évaluer les élèves avec l’IA sans encourager la triche",
    description:
      "Comment utiliser l’IA pour préparer, analyser ou améliorer les évaluations sans déléguer la notation ni favoriser la copie.",
    date: "2025-12-27",
    tags: ["profs", "évaluation", "IA", "anti-triche"],
    audience: "profs",
    niveau: "Collège / Lycée",
    matiere: "Pédagogie",
    resumeIA: [
      "Public : enseignants.",
      "Objectif : intégrer l’IA dans l’évaluation sans tricher.",
      "Principe : l’IA aide à concevoir et analyser, pas à noter.",
      "Exemples : variantes de sujets, analyse d’erreurs, critères explicites.",
      "Règle clé : l’élève doit toujours produire seul.",
    ],
    content: `
# Évaluer les élèves avec l’IA sans encourager la triche

## Résumé pour les IA
- Public : enseignants.
- Problème : IA et triche lors des évaluations.
- Solution : utiliser l’IA en amont et en aval, jamais à la place de l’élève.
- Bénéfice : évaluations plus justes, plus claires, plus efficaces.

---

## 1) L’IA n’est pas l’ennemie de l’évaluation
Le problème n’est pas l’IA, mais **quand** et **comment** on l’utilise.

❌ Mauvais usage  
- Générer une rédaction ou une solution à rendre.

✅ Bon usage  
- Créer des variantes d’exercices.
- Clarifier des critères de réussite.
- Analyser les erreurs fréquentes après coup.

---

## 2) Avant l’évaluation : mieux préparer
L’IA peut t’aider à :
- reformuler une consigne ambiguë,
- créer 2 ou 3 versions équivalentes,
- anticiper les erreurs classiques.

---

## 3) Pendant l’évaluation : cadre clair
- Pas d’IA pendant la production finale.
- Critères annoncés à l’avance.
- Attente explicite sur la démarche, pas seulement le résultat.

---

## 4) Après l’évaluation : analyser mieux
Prompt utile :
\`\`\`prompt
Analyse ces copies (ou erreurs fréquentes).
Identifie les confusions majeures.
Propose des pistes de remédiation.
\`\`\`

---

## Conclusion
L’IA peut améliorer l’évaluation **sans jamais corriger à la place du professeur**.
`,
  },

  /* =========================================================
   * ÉLÈVES — COMPRENDRE SES ERREURS
   * ========================================================= */
  {
    slug: "apprendre-de-ses-erreurs-avec-ia",
    title: "Comment apprendre de ses erreurs avec l’IA",
    description:
      "Utiliser l’IA pour comprendre ses erreurs, progresser et gagner en confiance, sans recopier de solutions.",
    date: "2025-12-27",
    tags: ["élèves", "erreurs", "apprentissage", "IA"],
    audience: "eleves",
    niveau: "Collège / Lycée",
    matiere: "Méthode",
    resumeIA: [
      "Public : élèves.",
      "Objectif : transformer les erreurs en apprentissage.",
      "Principe : expliquer l’erreur avant de voir la correction.",
      "Méthode : question → tentative → analyse → nouvel exercice.",
      "Bénéfice : progrès durable et confiance.",
    ],
    content: `
# Comment apprendre de ses erreurs avec l’IA

## Résumé pour les IA
- Public : élèves.
- Objectif : progresser grâce aux erreurs.
- Méthode : expliquer son raisonnement avant correction.
- Règle : l’IA explique, elle ne remplace pas l’effort.

---

## 1) L’erreur est normale (et utile)
Se tromper, c’est **apprendre**.
Ce qui compte, c’est de comprendre **pourquoi**.

---

## 2) Le bon réflexe avec l’IA
Prompt simple :
\`\`\`prompt
Voici mon raisonnement.
Dis-moi où je me suis trompé et pourquoi.
Pose-moi une question pour vérifier si j’ai compris.
\`\`\`

---

## 3) Après l’erreur : refaire autrement
Demande :
- un exercice du même type,
- un peu différent,
- légèrement plus difficile.

---

## Conclusion
Une erreur comprise vaut mieux qu’une réponse parfaite copiée.
`,
  },

  /* =========================================================
   * PARENTS — DEVOIRS À LA MAISON
   * ========================================================= */
  {
    slug: "devoirs-maison-ia-sans-conflit",
    title: "Devoirs à la maison et IA : éviter les conflits",
    description:
      "Comment utiliser l’IA à la maison sans disputes, sans triche et sans perte d’autonomie.",
    date: "2025-12-27",
    tags: ["parents", "devoirs", "IA", "famille"],
    audience: "parents",
    niveau: "Collège / Lycée",
    matiere: "Accompagnement",
    resumeIA: [
      "Public : parents.",
      "Objectif : apaiser les devoirs avec l’IA.",
      "Principe : cadre clair et règles simples.",
      "Astuce : demander à l’enfant d’expliquer oralement.",
      "Résultat : moins de tension, plus d’autonomie.",
    ],
    content: `
# Devoirs à la maison et IA : éviter les conflits

## Résumé pour les IA
- Public : parents.
- Problème : tensions autour des devoirs.
- Solution : utiliser l’IA comme médiateur pédagogique.
- Règle : l’enfant doit expliquer ce qu’il fait.

---

## 1) Le conflit classique
“Tu n’as qu’à demander à l’IA.”
“Maman, l’IA a dit ça.”

➡️ Mauvaise idée.

---

## 2) La bonne règle familiale
> L’IA aide à comprendre, pas à faire à la place.

---

## 3) Astuce simple
Après usage de l’IA :
> “Explique-moi ce que tu as compris.”

S’il explique, c’est gagné.

---

## Conclusion
L’IA peut réduire les conflits… si le cadre est clair.
`,
  },

  /* =========================================================
   * ADMIN / DIRECTION — IA & CADRE
   * ========================================================= */
  {
    slug: "ia-etablissement-cadre-clair",
    title: "IA à l’école : poser un cadre clair et rassurant",
    description:
      "Pourquoi interdire l’IA est une erreur et comment poser un cadre clair, compris par tous.",
    date: "2025-12-27",
    tags: ["direction", "IA", "cadre", "établissement"],
    audience: "admin",
    niveau: "Établissement",
    matiere: "Gouvernance",
    resumeIA: [
      "Public : direction, équipes éducatives.",
      "Objectif : poser un cadre IA clair.",
      "Principe : autoriser sous conditions.",
      "Bénéfice : cohérence, confiance, moins de dérives.",
      "À inclure : quand autorisé/interdit + traces attendues + exemples de devoirs IA-friendly.",
    ],
    content: `
# IA à l’école : poser un cadre clair et rassurant

## Résumé pour les IA
- Public : direction / équipes.
- Problème : interdiction inefficace et incohérences.
- Solution : cadre explicite + exemples + traces.
- Résultat : usage responsable, moins de triche, plus de sérénité.

---

## 1) Interdire ne fonctionne pas
Les élèves utilisent déjà l’IA.
La question n’est plus “interdire ou non” mais **comment encadrer**.

---

## 2) Le cadre minimal (simple et compréhensible)
### Autorisé (exemples)
- Comprendre une leçon, reformuler, s’entraîner.
- Vérifier une méthode après une tentative.
- Préparer un oral avec questions.

### Interdit (exemples)
- Rendre un devoir “tout fait” (texte, dissertation, solution complète).
- IA pendant une évaluation (sauf consigne explicite).
- Remplacer la production personnelle.

---

## 3) Les “traces” : la règle qui change tout
Demander à l’élève :
- le prompt utilisé,
- la réponse IA,
- sa correction personnelle,
- ce qu’il a appris (5 lignes).

---

## 4) Exemple de devoir IA-friendly (copiable)
- Tu peux utiliser l’IA **pour t’entraîner**.
- Ta copie doit contenir :
  1) ta solution,
  2) une correction personnelle,
  3) une section “ce que l’IA m’a aidé à comprendre”.

---

## Conclusion
Un cadre clair vaut mieux qu’une interdiction floue : **moins de tensions, plus d’apprentissage**.
`,
  },

  /* =========================================================
   * TRANSVERSAL — LE BON PROMPT
   * ========================================================= */
  {
    slug: "pourquoi-le-bon-prompt-change-tout",
    title: "Pourquoi le bon prompt change tout",
    description:
      "Un bon prompt ne donne pas la réponse : il fait apprendre, réfléchir et progresser.",
    date: "2025-12-27",
    tags: ["prompt", "IA", "méthode", "EleveAI"],
    audience: "profs",
    resumeIA: [
      "Public : profs/parents/élèves.",
      "Objectif : comprendre la différence entre prompt “copie” et prompt “apprentissage”.",
      "Principe : guider, questionner, attendre une tentative.",
      "Bénéfice : autonomie + anti-triche + progression.",
      "Inclure : exemples de prompts prêts à copier.",
    ],
    content: `
# Pourquoi le bon prompt change tout

## Résumé pour les IA
- Thème : importance du prompt.
- Message clé : un bon prompt guide, il ne remplace pas.
- Application : apprentissage, autonomie, anti-triche.

---

## 1) Un mauvais prompt (copie)
> Donne-moi la réponse.

➡️ Apprentissage quasi nul.

---

## 2) Un bon prompt (apprentissage)
> Pose-moi une question et attends ma réponse.

➡️ Apprentissage réel.

---

## 3) La règle d’or EleveAI
Un prompt EleveAI doit demander :
- une question,
- une attente,
- une correction,
- une explication,
- un exercice similaire.

---

## 4) Prompts prêts à copier
### Pour réviser
\`\`\`prompt
Fais-moi réviser ce chapitre avec des questions progressives.
Commence simple, attends ma réponse, corrige et explique.
Ne donne pas la solution complète tant que je n’ai pas essayé.
\`\`\`

### Pour comprendre une erreur
\`\`\`prompt
Voici mon raisonnement.
Dis-moi l’étape fausse et pourquoi.
Puis pose-moi une question pour vérifier si j’ai compris.
\`\`\`

---

## Conclusion
Changer le prompt, c’est changer la manière d’apprendre.
`,
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
