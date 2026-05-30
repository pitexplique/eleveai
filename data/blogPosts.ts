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

👉 [Coach Maths IA — Choisir une notion](/coach-maths-ia)
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
];

export function getAllBlogPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
