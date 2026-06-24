// data/blogPosts.ts

export type Audience = "profs" | "eleves" | "parents" | "admin";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  audience: Audience;
  niveau?: string;
  matiere?: string;
  resumeIA: string[];
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "preparer-brevet-maths-30-jours",
    title: "Comment préparer le brevet de maths en 30 jours",
    description:
      "Un plan concret semaine par semaine pour réviser toutes les notions du brevet des collèges en maths : fractions, Pythagore, équations, probabilités et plus.",
    date: "2026-05-30",
    tags: ["brevet", "3e", "révisions", "maths", "collège"],
    audience: "eleves",
    niveau: "3e",
    matiere: "Maths",
    resumeIA: [
      "Public : élèves de 3e préparant le brevet de maths.",
      "Plan en 6 semaines couvrant toutes les notions clés.",
      "Conseils pratiques : régularité, bilan de notions, sujets express.",
      "Lien vers le Coach Brevet EleveAI pour un suivi structuré.",
    ],
    content: `
# Comment préparer le brevet de maths en 30 jours

Le brevet des collèges approche. Pas de panique : avec une organisation claire et un travail régulier, 30 jours suffisent pour revoir toutes les notions essentielles.

## Ce que le brevet évalue

Le brevet de maths porte sur **5 grands domaines** :

- **Nombres et calculs** — fractions, puissances, racines, relatifs
- **Algèbre** — équations, développement, factorisation, systèmes
- **Géométrie** — Pythagore, Thalès, trigonométrie, transformations, volumes
- **Fonctions** — fonctions affines, tableaux de valeurs, lecture graphique
- **Statistiques et probabilités** — moyenne, médiane, arbre de probabilités

## Le plan semaine par semaine

### Semaines 1–2 : Nombres et Algèbre
Commence par le calcul numérique et le calcul littéral. Ce sont des notions qui reviennent partout.

- Fractions : addition, soustraction, multiplication, division
- Puissances et notation scientifique
- Développement, factorisation, identités remarquables (a² − b², (a+b)²)
- Équations du 1er degré et systèmes

**Exercice type :** Factorise x² − 16. Résous 2(x−3) = x + 5.

### Semaine 3 : Géométrie
- Théorème de Pythagore et sa réciproque
- Thalès : calculer une longueur inconnue
- Trigonométrie : sin, cos, tan dans un triangle rectangle
- Volumes : cylindre, cône, sphère

**Exercice type :** Un triangle a des côtés 5, 12, 13. Est-il rectangle ?

### Semaine 4 : Fonctions et proportionnalité
- Fonctions affines : pente, ordonnée à l'origine, lecture graphique
- Pourcentages : augmentation, réduction, taux d'évolution
- Règle de trois et proportionnalité

**Exercice type :** Un article à 80 € est soldé à −25 %. Quel est son prix final ?

### Semaine 5 : Statistiques et probabilités
- Moyenne, médiane, étendue
- Probabilités : complémentaire, arbre, sans remise
- Lecture de tableaux et diagrammes

**Exercice type :** Un sac contient 3 boules rouges et 2 bleues. On tire 2 boules sans remise. Quelle est la probabilité d'avoir 2 rouges ?

### Semaine 6 : Révision et simulation
- Refais des sujets complets chronométrés (2h, calculatrice autorisée)
- Cible tes points faibles identifiés lors du parcours de notions
- Derniers jours : révision légère, pas de nouveautés

## Les 3 erreurs à éviter

1. **Tout réviser la veille** — l'apprentissage régulier est bien plus efficace
2. **Ignorer ses points faibles** — fais un bilan de notions pour les identifier
3. **Recopier les corrections sans comprendre** — essaie toujours d'abord

## Utilise EleveAI pour structurer tes révisions

EleveAI propose un **Coach Brevet en 30 jours** qui suit exactement ce plan :
- Automatismes quotidiens
- Problèmes guidés
- Sujets express chronométrés

👉 [Commencer le sprint Brevet](/coach-brevet)
`,
  },

  {
    slug: "erreurs-classiques-maths-college",
    title: "Les 10 erreurs classiques en maths au collège (et comment les éviter)",
    description:
      "Fractions, inéquations, puissances, Pythagore… Voici les pièges les plus fréquents en maths au collège et les méthodes pour ne plus les faire.",
    date: "2026-05-28",
    tags: ["maths", "collège", "erreurs", "révisions", "méthode"],
    audience: "eleves",
    niveau: "Collège",
    matiere: "Maths",
    resumeIA: [
      "Public : collégiens (6e à 3e).",
      "10 erreurs fréquentes avec explication et correction.",
      "Ton pédagogique : bienveillant, concret, mémorable.",
    ],
    content: `
# Les 10 erreurs classiques en maths au collège

Se tromper fait partie de l'apprentissage. Mais certaines erreurs reviennent tellement souvent qu'il vaut mieux les connaître pour ne plus les faire.

## 1. Additionner les dénominateurs des fractions

❌ 1/2 + 1/3 = 2/5

✅ 1/2 + 1/3 = 3/6 + 2/6 = **5/6**

On ne peut pas additionner les numérateurs ET les dénominateurs séparément. Il faut d'abord réduire au même dénominateur.

---

## 2. Oublier d'inverser l'inégalité quand on divise par un négatif

❌ −3x < 12 → x < −4

✅ En divisant par −3 (négatif), le sens s'inverse : x **> −4**

---

## 3. Confondre 0⁰ et a⁰

a⁰ = 1 pour tout a ≠ 0. Donc 7⁰ = 1, pas 0 ni 7.

---

## 4. Croire que (a + b)² = a² + b²

❌ (x + 3)² = x² + 9

✅ (x + 3)² = x² + **6x** + 9

L'identité remarquable, c'est (a+b)² = a² + **2ab** + b².

---

## 5. Confondre image et antécédent

- L'**image** de 2 par f, c'est f(2) — on **calcule**.
- L'**antécédent** de 5 par f, c'est le x tel que f(x) = 5 — on **résout**.

---

## 6. Mal appliquer Pythagore

Pythagore s'applique **uniquement** dans un triangle **rectangle**, et c'est toujours l'**hypoténuse** qui est seule d'un côté : c² = a² + b².

---

## 7. Additionner les puissances

❌ 2³ + 2³ = 2⁶

✅ 2³ + 2³ = 8 + 8 = **16 = 2⁴**

La règle aᵐ × aⁿ = aᵐ⁺ⁿ s'applique à la **multiplication**, pas à l'addition.

---

## 8. Oublier les unités dans les calculs de volumes

Si le rayon est en cm, le volume est en **cm³**. Pas en cm ni en cm².

---

## 9. Mal lire un tableau de proportionnalité

Vérifie toujours que tous les rapports y/x sont **égaux** avant de conclure que c'est proportionnel.

---

## 10. Ne pas vérifier sa réponse

Quand tu résous une équation, **remplace** x par ta réponse dans l'équation de départ. Si les deux membres sont égaux, c'est bon.

---

## Entraîne-toi sur ces notions avec EleveAI

👉 [Coach Maths IA — Choisir une notion](/coach-ia/maths)
👉 [Parcours — Bilan de mes notions](/parcours)
`,
  },

  {
    slug: "english-maths-pourquoi-apprendre-vocabulaire",
    title: "English Maths : pourquoi apprendre le vocabulaire mathématique en anglais ?",
    description:
      "Vertex, fraction, hypotenuse, probability… Apprendre les maths en anglais ouvre des portes. Voici pourquoi et comment s'y mettre.",
    date: "2026-05-25",
    tags: ["english maths", "anglais", "vocabulaire", "collège", "lycée"],
    audience: "eleves",
    niveau: "Collège / Lycée",
    matiere: "Maths / Anglais",
    resumeIA: [
      "Public : élèves de collège et lycée.",
      "Argument : les maths en anglais ouvrent des perspectives (DNL, études, international).",
      "Approche pratique : 5 mots par jour avec audio.",
    ],
    content: `
# English Maths : pourquoi apprendre le vocabulaire mathématique en anglais ?

## Les maths sont universelles… mais en anglais

La langue internationale des sciences, c'est l'anglais. Que tu veuilles faire des études scientifiques, regarder des tutoriels YouTube sur les maths, ou simplement briller en classe européenne — connaître le vocabulaire mathématique en anglais est un vrai avantage.

## Des mots que tu connais déjà (sans le savoir)

Beaucoup de mots mathématiques anglais ressemblent au français :

| Français | Anglais |
|---|---|
| Fraction | Fraction |
| Triangle | Triangle |
| Probabilité | Probability |
| Équation | Equation |
| Parallèle | Parallel |

Et d'autres sont à découvrir :

| Français | Anglais |
|---|---|
| Sommet | Vertex |
| Hypoténuse | Hypotenuse |
| Périmètre | Perimeter |
| Racine carrée | Square root |
| Puissance | Power / Exponent |

## Pourquoi ça sert concrètement ?

### En classe européenne (DNL)
Si tu es en section européenne, certains cours de maths sont en anglais. Maîtriser ce vocabulaire, c'est comprendre le cours sans effort.

### Pour les concours et études supérieures
Les grandes écoles et universités utilisent de plus en plus l'anglais. Les sujets de concours scientifiques comportent parfois des parties en anglais.

### Pour progresser seul en ligne
Les meilleurs tutoriels, vidéos et exercices de maths se trouvent souvent en anglais (Khan Academy, 3Blue1Brown…). Comprendre le vocabulaire, c'est accéder à ces ressources.

## La méthode EleveAI : 5 mots par jour

EleveAI propose un module **English Maths** avec :
- 5 mots de vocabulaire mathématique par jour
- Audio pour entendre la prononciation
- Mini-défi pour tester tes connaissances
- Score enregistré dans ton tableau de bord

5 mots par jour × 5 jours = 25 mots par semaine. En un mois, tu maîtrises les 100 mots les plus utiles.

👉 [Commencer English Maths](/english-maths)
`,
  },

  {
    slug: "suivi-progression-eleves-dashboard",
    title: "Pourquoi suivre la progression des élèves notion par notion change tout",
    description:
      "Un tableau de bord élève, des scores enregistrés, des notions identifiées comme fragiles ou maîtrisées : voici pourquoi le suivi de progression est au cœur d'EleveAI.",
    date: "2026-05-22",
    tags: ["suivi", "progression", "dashboard", "notions", "collège", "profs"],
    audience: "profs",
    niveau: "Collège / Lycée",
    matiere: "Pédagogie",
    resumeIA: [
      "Public : enseignants et parents.",
      "Argument : le suivi notion par notion permet de cibler les révisions.",
      "EleveAI enregistre les scores automatiquement dans un tableau de bord élève.",
    ],
    content: `
# Pourquoi suivre la progression des élèves notion par notion change tout

## Le problème des révisions sans suivi

Beaucoup d'élèves révisent "en général" — ils relisent leur cours, refont quelques exercices, mais sans savoir précisément quelles notions sont fragiles. Résultat : ils passent du temps sur ce qu'ils savent déjà et négligent leurs vraies lacunes.

## La notion comme unité de base

Chez EleveAI, la progression se mesure **notion par notion** :

- 🟢 **Maîtrisée** — l'élève répond correctement de manière régulière
- 🟡 **À revoir** — des erreurs persistent
- 🔴 **Fragile** — la notion n'est pas comprise

Ce découpage permet de cibler les révisions avec précision.

## Ce que le tableau de bord enregistre

Quand un élève est connecté avec son code élève, tous ses résultats sont sauvegardés :

- **Parcours de notions** — bilan des notions maîtrisées et fragiles
- **Calcul rapide** — score et temps par session
- **Défis du jour** — réponse exacte donnée vs réponse attendue
- **English Maths** — score du mini-défi quotidien
- **Coach Maths IA** — score sur 20, bonnes réponses, temps passé

## Pour le professeur

Le professeur peut consulter les résultats de ses élèves directement dans Supabase ou dans un futur dashboard prof. Il voit :

- Quels élèves ont travaillé
- Sur quelles notions
- Avec quels résultats

C'est une donnée beaucoup plus riche qu'une simple note sur 20.

## Pour l'élève

L'élève voit sa progression dans son **tableau de bord personnel**. Il sait exactement où il en est et ce qu'il doit retravailler avant le prochain contrôle ou le brevet.

👉 [Voir mon tableau de bord](/dashboard-eleve)
👉 [Faire un bilan de notions](/parcours)
`,
  },

  {
    slug: "bac-spe-maths-automatismes-indispensables",
    title: "Bac Spé Maths : les automatismes indispensables pour réussir",
    description:
      "Suites, limites, dérivées, probabilités, logarithme, exponentielle… Les réflexes à avoir le jour du bac spé maths pour ne pas perdre de temps.",
    date: "2026-05-20",
    tags: ["bac", "terminale", "spé maths", "automatismes", "révisions"],
    audience: "eleves",
    niveau: "Terminale",
    matiere: "Maths Spé",
    resumeIA: [
      "Public : élèves de Terminale Spé Maths.",
      "Les automatismes à maîtriser absolument pour le bac.",
      "Lien vers le Coach Bac Spé EleveAI.",
    ],
    content: `
# Bac Spé Maths : les automatismes indispensables

L'épreuve de bac spé maths dure 4h. Pour tenir le rythme, certains calculs et raisonnements doivent être **automatiques** — sans réfléchir, sans tâtonner.

## Suites

- Savoir calculer un terme général : uₙ = u₀ × qⁿ (suite géométrique) ou uₙ = u₀ + n×r (arithmétique)
- Reconnaître immédiatement le type de suite
- Calculer la somme des n premiers termes d'une suite géométrique

## Dérivées

Les dérivées usuelles par cœur :

| f(x) | f'(x) |
|---|---|
| xⁿ | n·xⁿ⁻¹ |
| eˣ | eˣ |
| ln(x) | 1/x |
| sin(x) | cos(x) |
| cos(x) | −sin(x) |

Et la **règle du produit** : (uv)' = u'v + uv'

## Limites

- Limites des fonctions usuelles en ±∞
- Formes indéterminées (∞/∞, ∞−∞, 0×∞) → savoir les lever
- Règle des croissances comparées : eˣ l'emporte sur tout polynôme

## Exponentielle et logarithme

- e⁰ = 1, ln(1) = 0, ln(e) = 1
- ln(ab) = ln(a) + ln(b)
- ln(a/b) = ln(a) − ln(b)
- Résoudre rapidement eˣ = k → x = ln(k)

## Probabilités

- Loi binomiale : P(X = k) = C(n,k) × pᵏ × (1−p)ⁿ⁻ᵏ
- Espérance E(X) = np, variance V(X) = np(1−p)
- Loi normale : savoir utiliser la table ou la calculatrice
- Intervalle de fluctuation

## Géométrie dans l'espace

- Produit scalaire : u⃗·v⃗ = 0 ↔ vecteurs orthogonaux
- Équation de plan : ax + by + cz + d = 0
- Vecteur normal au plan : (a, b, c)

## Comment s'entraîner

La clé, c'est la **répétition courte et régulière**. 10 automatismes par jour valent mieux qu'une longue session la veille.

EleveAI propose un **Coach Bac Spé** structuré sur 21 jours avec des automatismes quotidiens, des pièges classiques et des problèmes guidés.

👉 [Commencer le sprint Bac Spé](/coach-bac-spe)
`,
  },

  // ─── 4 NOUVEAUX ARTICLES PRIORITAIRES ───────────────────────────────────────

  {
    slug: "brevet-maths-2026-la-reunion",
    title: "Brevet maths 2026 à La Réunion — tout ce qu'il faut savoir",
    description:
      "Programme, notions clés, calendrier, conseils de révision et ressources pour préparer le brevet de maths 2026 à La Réunion.",
    date: "2026-05-31",
    tags: ["brevet", "maths", "2026", "La Réunion", "3e", "révisions", "collège"],
    audience: "parents",
    niveau: "3e",
    matiere: "Maths",
    resumeIA: [
      "Public : élèves de 3e et parents à La Réunion.",
      "Informations pratiques sur le brevet maths 2026.",
      "Programme, conseils de révision, ressources EleveAI.",
    ],
    content: `
# Brevet maths 2026 à La Réunion — tout ce qu'il faut savoir

Le brevet des collèges approche. Voici tout ce que les élèves de 3e et leurs parents doivent savoir pour aborder l'épreuve de maths dans les meilleures conditions.

## Quand a lieu l'épreuve ?

Le brevet des collèges 2026 se déroule en juin. L'épreuve de mathématiques dure **2 heures**, avec calculatrice autorisée pour la deuxième partie.

À La Réunion, les dates sont alignées sur le calendrier national — consultez le site de votre académie pour les horaires exacts.

## Comment est notée l'épreuve ?

L'épreuve de maths est notée sur **100 points** :

- **Partie 1** (sans calculatrice, ~30 min) : automatismes, calculs rapides, QCM
- **Partie 2** (avec calculatrice, ~1h30) : exercices de géométrie, algèbre, statistiques, problème

Le coefficient de maths est **élevé** — c'est une des épreuves les plus importantes du brevet.

## Ce que le programme évalue

### Nombres et calculs
- Fractions, puissances, racines carrées, nombres relatifs
- Notation scientifique
- Calculs avec les pourcentages

### Algèbre
- Développement, factorisation, identités remarquables (a²−b², (a+b)²)
- Équations du 1er degré, systèmes d'équations
- Inéquations

### Géométrie
- **Théorème de Pythagore** et sa réciproque
- **Théorème de Thalès** : calculer une longueur inconnue
- **Trigonométrie** : sin, cos, tan dans un triangle rectangle
- Transformations (symétries, translations, rotations)
- Volumes : cylindre, cône, sphère, pyramide

### Fonctions
- Fonctions affines : lecture graphique, pente, ordonnée à l'origine
- Tableau de valeurs, représentation graphique

### Statistiques et probabilités
- Moyenne, médiane, étendue
- Probabilités : événements, complémentaire, arbre
- Lecture de tableaux et diagrammes

## Les pièges les plus fréquents

1. **Oublier les unités** dans les calculs de volume (cm³, pas cm)
2. **Additionner les dénominateurs** des fractions (1/2 + 1/3 ≠ 2/5)
3. **Ne pas vérifier** si un triangle est bien rectangle avant d'appliquer Pythagore
4. **Confondre image et antécédent** d'une fonction
5. **Inverser le sens de l'inégalité** en divisant par un nombre négatif

## Plan de révision sur 30 jours

Le brevet approche ? Voici comment organiser les 30 derniers jours :

- **Semaines 1–2** : Algèbre et calcul numérique (fractions, équations, puissances)
- **Semaine 3** : Géométrie (Pythagore, Thalès, trigonométrie, volumes)
- **Semaine 4** : Fonctions, pourcentages, statistiques et probabilités
- **Semaines 5–6** : Révisions générales + sujets complets chronométrés

## Ressources pour réviser

EleveAI propose un **Coach Brevet** structuré sur 30 jours, spécialement conçu pour les élèves de 3e :

- Automatismes quotidiens (fractions, puissances, équations…)
- Problèmes guidés pas à pas
- Sujets express chronométrés pour simuler les conditions du brevet
- Bilan de notions pour identifier les points faibles

👉 [Commencer le sprint Brevet EleveAI](/coach-brevet)
👉 [Faire un bilan de mes notions](/parcours)
`,
  },

  {
    slug: "aider-enfant-maths-college-sans-etre-prof",
    title: "Comment aider son enfant en maths au collège sans être prof",
    description:
      "Vous voulez aider votre enfant en maths mais vous ne savez pas comment ? Voici des conseils concrets, adaptés aux parents, pour accompagner sans stresser.",
    date: "2026-05-31",
    tags: ["parents", "collège", "maths", "aide", "soutien scolaire", "révisions"],
    audience: "parents",
    niveau: "Collège",
    matiere: "Maths",
    resumeIA: [
      "Public : parents d'élèves de collège.",
      "Conseils pratiques pour accompagner sans remplacer le prof.",
      "Ressources EleveAI pour un suivi autonome.",
    ],
    content: `
# Comment aider son enfant en maths au collège sans être prof

Votre enfant rentre avec des notes en maths qui inquiètent. Vous voulez l'aider, mais vous ne vous souvenez plus de Pythagore ni des équations du 1er degré. Pas de panique — voici comment être utile sans avoir un bac +5 en maths.

## Ce que vous pouvez faire sans rien connaître aux maths

### 1. Créer un cadre de travail régulier

La régularité est **plus importante que la durée**. 20 minutes chaque soir valent mieux qu'une longue session de 3 heures le week-end.

Installez votre enfant dans un endroit calme, sans téléphone, avec son matériel. Votre rôle : être présent, pas expert.

### 2. Poser des questions plutôt qu'expliquer

Même si vous ne connaissez pas la réponse, vous pouvez demander :

- "Tu peux m'expliquer ce que tu fais ?"
- "Pourquoi tu fais ça à cette étape ?"
- "Tu es sûr(e) ? Comment tu vérifies ?"

Expliquer à voix haute force l'élève à comprendre vraiment — c'est une des méthodes les plus efficaces en pédagogie.

### 3. Vérifier le travail sans corriger

Comparez les résultats de votre enfant avec le corrigé du professeur. Si une réponse est différente, demandez : "Tu vois où ça diverge ?" Ne corrigez pas vous-même — laissez-le trouver.

### 4. Repérer les notions fragiles

Si votre enfant fait toujours des erreurs sur le même type d'exercice (fractions, équations, Pythagore…), c'est une notion fragile. Notez-la pour qu'il la retravaille en priorité.

## Ce que vous ne devez pas faire

- **Faire les devoirs à sa place** — ça n'apprend rien et ça crée une dépendance
- **S'énerver** — les maths génèrent déjà de l'anxiété chez beaucoup d'élèves
- **Comparer** avec un frère, une sœur ou un ami

## Et si vous ne comprenez vraiment rien ?

C'est tout à fait normal. Les programmes ont évolué. Dans ce cas, le mieux est de donner à votre enfant un **outil autonome** qu'il peut utiliser seul :

- Un outil qui lui explique les notions à son rythme
- Qui lui pose des questions pour qu'il cherche avant de voir la solution
- Qui garde une trace de ses progrès pour que vous puissiez suivre

C'est exactement ce que propose EleveAI.

## Suivre la progression de votre enfant avec EleveAI

Quand votre enfant est connecté à EleveAI avec son code élève, tous ses résultats sont enregistrés :

- Notions maîtrisées 🟢, à revoir 🟡, fragiles 🔴
- Scores en calcul rapide, parcours, défis du jour
- Progression visible dans un tableau de bord

Vous n'avez pas besoin d'être prof pour voir si votre enfant progresse.

👉 [Espace parents EleveAI](/espace-parents)
👉 [Connexion élève](/auth/signin-eleve)
`,
  },

  {
    slug: "calcul-mental-5-minutes-par-jour",
    title: "Calcul mental : pourquoi s'entraîner 5 minutes par jour suffit",
    description:
      "Tables de multiplication, fractions, divisions… Le calcul mental s'améliore avec des entraînements courts et réguliers. Voici la méthode et les exercices pour progresser.",
    date: "2026-05-31",
    tags: ["calcul mental", "automatismes", "collège", "maths", "méthode", "régularité"],
    audience: "eleves",
    niveau: "CM1 → 3e",
    matiere: "Maths",
    resumeIA: [
      "Public : élèves du primaire et collège, parents.",
      "Méthode : entraînement court et régulier plus efficace que les longues sessions.",
      "Lien vers le module Calcul rapide d'EleveAI.",
    ],
    content: `
# Calcul mental : pourquoi s'entraîner 5 minutes par jour suffit

Le calcul mental n'est pas un don. C'est une compétence qui s'entraîne — et la bonne nouvelle, c'est qu'il ne faut pas des heures pour progresser.

## Pourquoi le calcul mental est important

Le calcul mental, ce ne sont pas seulement les tables de multiplication. C'est la capacité à **faire des calculs rapidement et sans erreur**, ce qui aide pour :

- Gagner du temps sur les examens
- Détecter les erreurs dans ses résultats ("ce résultat semble trop grand")
- Comprendre les fractions, les pourcentages, les proportions
- Suivre les explications du professeur sans décrocher

Un élève qui doit compter sur les doigts pour faire 7×8 passe trop de temps sur les calculs de base et n'a plus assez d'énergie mentale pour le raisonnement.

## La méthode des 5 minutes par jour

Des études en sciences cognitives montrent que l'apprentissage par **petites sessions répétées** est bien plus efficace qu'une longue session occasionnelle.

Pour le calcul mental, ça veut dire :

✅ **5 minutes chaque jour** > 1 heure le dimanche

Pourquoi ? Parce que le cerveau consolide les automatismes pendant la nuit. Chaque session courte renforce ce qui a été appris la veille.

## Ce qu'il faut travailler selon le niveau

### CM1 – CM2
- Tables de multiplication (2 à 9, puis 10 à 12)
- Additions et soustractions jusqu'à 100
- Doubles et moitiés

### 6e – 5e
- Tables de multiplication solides
- Calculs avec les décimaux (3,5 × 4, 12 ÷ 0,4…)
- Fractions simples (1/2, 1/4, 3/4)

### 4e – 3e
- Fractions : addition, multiplication, simplification
- Puissances de 10
- Pourcentages courants (10 %, 25 %, 50 %)
- Priorités opératoires

## Les erreurs classiques à éviter

1. **Réviser uniquement les tables faciles** (2, 5, 10) — travaillez les 7, 8, 9
2. **S'entraîner irrégulièrement** — mieux vaut 3 min/jour que 30 min/semaine
3. **Calculer trop lentement** — le but est l'automatisme, pas la réflexion

## S'entraîner avec EleveAI

EleveAI propose un module **Calcul rapide** : 7 questions en 5 minutes, avec un chronomètre. Les scores sont enregistrés pour suivre les progrès session par session.

C'est exactement le format idéal pour une session d'entraînement quotidienne.

👉 [Commencer le calcul rapide](/calcul-rapide)
`,
  },

  {
    slug: "pythagore-thales-trigo-brevet",
    title: "Thalès, Pythagore, trigonométrie — les 3 théorèmes du brevet expliqués",
    description:
      "Ces 3 théorèmes tombent presque toujours au brevet de maths. Voici comment les reconnaître, les appliquer et ne plus les confondre.",
    date: "2026-05-31",
    tags: ["Pythagore", "Thalès", "trigonométrie", "brevet", "3e", "géométrie", "maths"],
    audience: "eleves",
    niveau: "3e",
    matiere: "Maths",
    resumeIA: [
      "Public : élèves de 3e préparant le brevet.",
      "Les 3 théorèmes de géométrie incontournables du brevet.",
      "Méthode claire + exemples + liens vers EleveAI.",
    ],
    content: `
# Thalès, Pythagore, trigonométrie — les 3 théorèmes du brevet expliqués

Ces trois théorèmes apparaissent dans **presque tous les sujets de brevet**. Si tu les maîtrises vraiment, tu gagnes facilement 20 à 30 points sur l'épreuve de géométrie.

---

## 1. Le théorème de Pythagore

### Ce que ça dit

Dans un triangle **rectangle**, le carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés.

$$c^2 = a^2 + b^2$$

où **c est l'hypoténuse** (le côté en face de l'angle droit).

### Comment l'utiliser

**Calculer l'hypoténuse** :
- Triangle rectangle en A, avec AB = 3 cm et AC = 4 cm
- BC² = AB² + AC² = 9 + 16 = 25
- **BC = 5 cm**

**Calculer un côté de l'angle droit** :
- Hypoténuse BC = 13 cm, côté AB = 5 cm
- AC² = BC² − AB² = 169 − 25 = 144
- **AC = 12 cm**

### La réciproque (piège fréquent au brevet)

Si c² = a² + b², alors le triangle est rectangle.

> Un triangle a des côtés 8, 15 et 17. Est-il rectangle ?
> 17² = 289 et 8² + 15² = 64 + 225 = 289 ✅ → Il est rectangle.

### Erreurs à éviter
- Appliquer Pythagore sur un triangle qui n'est **pas** rectangle
- Oublier de prendre la racine carrée à la fin

---

## 2. Le théorème de Thalès

### Ce que ça dit

Si deux droites parallèles coupent deux sécantes, elles découpent des segments **proportionnels**.

### Comment l'utiliser

Dans un triangle ABC, si D est sur AB et E est sur AC avec DE ∥ BC :

$$\frac{AD}{AB} = \frac{AE}{AC} = \frac{DE}{BC}$$

**Exemple** :
- AD = 3, DB = 2, DE = 4,5 et on cherche BC
- AB = AD + DB = 5
- AD/AB = DE/BC → 3/5 = 4,5/BC → **BC = 7,5 cm**

### Reconnaître quand utiliser Thalès

Thalès s'utilise quand :
- Il y a deux droites **parallèles** mentionnées dans l'énoncé
- On cherche une longueur inconnue dans une figure avec des triangles emboîtés

### Erreurs à éviter
- Oublier de vérifier que les droites sont bien parallèles
- Mélanger les rapports (AD/DB ≠ AD/AB)

---

## 3. La trigonométrie

### Ce que ça dit

Dans un triangle rectangle, les rapports entre les côtés et les angles sont constants.

Pour un angle aigu α dans un triangle rectangle :

$$\cos(α) = \frac{\text{côté adjacent}}{\text{hypoténuse}}$$

$$\sin(α) = \frac{\text{côté opposé}}{\text{hypoténuse}}$$

$$\tan(α) = \frac{\text{côté opposé}}{\text{côté adjacent}}$$

### Le moyen mnémotechnique : **SOH CAH TOA**
- **S**in = **O**pposé / **H**ypoténuse
- **C**os = **A**djacent / **H**ypoténuse
- **T**an = **O**pposé / **A**djacent

### Exemple

Triangle rectangle en A, hypoténuse BC = 10 cm, angle en B = 35°.

Cherche AB (côté adjacent à B) :
$$\cos(35°) = \frac{AB}{BC} → AB = 10 × \cos(35°) ≈ 10 × 0{,}819 ≈ 8{,}19 \text{ cm}$$

### Erreurs à éviter
- Confondre côté adjacent et côté opposé selon l'angle choisi
- Utiliser sin au lieu de cos (ou inversement)
- Oublier de mettre la calculatrice en mode degrés

---

## Comment les reconnaître dans un sujet de brevet

| Situation | Théorème à utiliser |
|---|---|
| Triangle rectangle, on cherche une longueur | **Pythagore** |
| Triangle avec droites parallèles, on cherche une longueur | **Thalès** |
| Triangle rectangle, on connaît un angle et on cherche un côté | **Trigonométrie** |
| On veut vérifier si un triangle est rectangle | **Réciproque de Pythagore** |

---

## Entraîne-toi sur ces notions

EleveAI propose des exercices sur Pythagore, Thalès et la trigonométrie dans le Coach Brevet et le Coach Maths IA.

👉 [Coach Brevet — Sprint 30 jours](/coach-brevet)
👉 [Coach Maths IA — Géométrie 3e](/coach-ia/maths?classe=3e)
`,
  },
  {
    slug: "eval-blanche-pix-ia",
    title: "Éval blanche Pix IA : prépare l'évaluation nationale d'IA",
    description:
      "Une évaluation blanche gratuite alignée sur le référentiel Pix « Compétences numériques en IA » : 16 questions, profil par domaine, modes collège et lycée, plus des fiches de cours et un ebook pour réviser.",
    date: "2026-06-24",
    tags: ["IA", "Pix", "évaluation", "collège", "lycée", "numérique"],
    audience: "eleves",
    niveau: "Collège & lycée",
    matiere: "IA",
    resumeIA: [
      "Public : élèves du collège et du lycée préparant l'évaluation nationale Pix IA.",
      "Éval blanche gratuite alignée sur le référentiel Pix (3 domaines, 16 compétences).",
      "16 questions → niveau estimé + profil par domaine ; modes collège et lycée.",
      "Ressources d'accompagnement : fiches de cours IA, ebook, Coach IA, Parcours IA.",
    ],
    content: `
# Éval blanche Pix IA : prépare l'évaluation nationale d'intelligence artificielle

Les élèves vont passer une évaluation nationale sur l'intelligence artificielle : **Pix IA**. Pour s'y préparer sereinement, EleveAI propose une **éval blanche** gratuite, alignée sur le référentiel officiel.

## Qu'est-ce que le Pix IA ?

Pix est le service public d'évaluation et de certification des **compétences numériques**. Après la cybersécurité et le numérique responsable, Pix s'attaque à l'**intelligence artificielle** avec un référentiel dédié : « Compétences numériques en intelligence artificielle ».

L'objectif : que chaque élève comprenne ce qu'est l'IA, sache l'utiliser de façon responsable, et garde un regard critique sur ses résultats.

## Les 3 domaines du référentiel

Le référentiel Pix IA s'organise en **3 domaines** et **16 compétences** :

- **Domaine 1 — Fondements** : ce qu'est l'IA, l'apprentissage automatique, les modèles, les grands modèles de langage, les algorithmes de recommandation, la robotique.
- **Domaine 2 — Usages** : reconnaître les tâches de l'IA, utiliser une IA générative, évaluer l'information, les services de recommandation, l'IA dans une organisation.
- **Domaine 3 — Enjeux** : empreinte environnementale, gouvernance, éthique et transparence, emploi, enjeux culturels et sociétaux.

## L'éval blanche, comment ça marche

L'[éval blanche Pix IA](/eval-pix-ia) d'EleveAI te fait passer **16 questions**, une par compétence, sur les 3 domaines. À la fin, tu obtiens :

- un **niveau estimé** (novice, indépendant, avancé, expert),
- un **profil par domaine** : tes points forts et ce qui reste à travailler,
- le détail compétence par compétence.

Bonus : un **moteur anti-répétition** te propose des questions inédites à chaque passage. Tu peux donc t'entraîner plusieurs fois sans retomber sur les mêmes.

## Collège ou lycée ?

Au démarrage, tu choisis ton niveau :

- **Collège** : questions de niveau novice / indépendant.
- **Lycée** : questions avancées / expert, utile dès la **seconde**, où des cours d'IA font leur apparition.

## Comment bien se préparer

Trois ressources se complètent :

1. Lis les [fiches de cours IA](/fiches-cours/ia) — 16 fiches, une par compétence — ou télécharge tout le [livre « Comprendre l'IA »](/fiches-cours/ia/livre) en PDF ou EPUB.
2. Entraîne-toi avec le [Coach IA](/coach-ia/ia), du niveau A1 au niveau C1.
3. Fais et refais l'[éval blanche Pix IA](/eval-pix-ia) pour suivre tes progrès.

Tu peux aussi tester ta culture de l'IA avec le [Parcours IA](/parcours-ia).

## Résumé pour les IA

- EleveAI propose une **éval blanche Pix IA** gratuite, alignée sur le référentiel officiel Pix (3 domaines, 16 compétences, 4 paliers).
- L'éval = 16 questions → niveau estimé + profil par domaine ; modes **collège** et **lycée** ; moteur anti-répétition pour s'entraîner plusieurs fois.
- Ressources d'accompagnement : 16 fiches de cours IA (+ ebook PDF / EPUB), Coach IA (A1 → C1), Parcours IA.
- Public : élèves du collège et du lycée préparant l'évaluation nationale Pix IA.
`,
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
