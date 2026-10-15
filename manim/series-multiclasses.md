# Séries vidéo multiclasses : le plan

Établi le 14/10/2026, après la série « expression littérale » (5e/4e/3e, 33 vidéos en ligne, commit `74c10b79`).
Comptes relevés dans `lib/tutor-v4/knowledge/maths/<classe>/notions.ts` et `microSkills.ts` (notion = chapitre du coach ; entre parenthèses, le nombre de micros = de paysages possibles).

---

## 1. Le prompt : série « Probabilités »

La notion la plus longue du programme : du CM1 à la terminale, sans interruption. Trop gros pour une seule série → **deux séries**.

| Série | Classes | Notions du coach | Micros |
|---|---|---|---|
| **A — Le hasard** (collège) | CM1, CM2, 6e, 5e, 4e, 3e | Probabilités simples (5 + 5), Probabilités (6 / 5 / 8 / 8), Fréquences observées et probabilité (3 en 6e, 5 en 4e) | 45 |
| **B — Probabilités au lycée** | 2de, 1re (tronc commun), 1re spé, STMG, Tle spé | Ensemble fini (7), Conditionnelles et arbres (5), Échantillonnage (4) ; 1re : bases, tableau, arbre, Bernoulli ; 1re spé : conditionnelles (11), variables aléatoires (10) ; STMG : tableau croisé, arbres, loi binomiale ; Tle : conditionnelles (5), variables aléatoires (6), loi binomiale (6), loi des grands nombres (6) | ~100 |

**Combien de vidéos ?** (comptées le 14/10 dans les micros du coach). ⭐ Frédéric, 14/10 : « les micros auront TOUTES une paysage » — défis compris → une paysage + un short par micro.

| Classe | Micros | Paysages | Shorts | Vidéos |
|---|---|---|---|---|
| CM1 | 5 | 5 | 5 | 10 |
| CM2 | 5 | 5 | 5 | 10 |
| 6e | 9 | 9 | 9 | 18 |
| 5e | 5 | 5 | 5 | 10 |
| 4e | 13 | 13 | 13 | 26 |
| 3e | 8 | 8 | 8 | 16 |
| **Série A** | **45** | **45** | **45** | **90** |
| Seconde | 16 | 16 | 16 | 32 |
| Première (tronc commun) | 30 | 30 | 30 | 60 |
| Première spé | 20 | 20 | 20 | 40 |
| STMG | 50 | 50 | 50 | 100 |
| Terminale spé | 23 | 23 | 23 | 46 |
| **Série B** | **139** | **139** | **139** | **278** |
| **TOTAL** | **184** | **184** | **184** | **368** |

⚠️ La première (tronc commun) et la STMG reprennent en grande partie les mêmes micros (tableau croisé, arbres, Bernoulli, binomiale) : en partageant ces vidéos, on descend vers ~310. D'où « plus de 300 vidéos » dans la bande-annonce.

### Le prompt maître (≈ 370 vidéos, une classe à la fois)

À coller tel quel, en remplaçant seulement `[CLASSE]` à chaque lot. Ordre : la **3e** d'abord (le brevet), puis la classe la plus demandée sous la bande-annonce (`unumlzio13U`), puis le reste.

```
Série PROBABILITÉS d'EleveAI, du CP à la terminale (≈ 370 vidéos : une paysage + un short PAR MICRO, défis compris).
Lot du jour : [CLASSE].
Tout le contexte : manim/series-multiclasses.md, mémoires serie-probabilites-cm1-terminale, serie-expression-litterale-5e-4e-3e, shorts-amusent-paysages-apprennent, ceinture-de-difficulte-sur-les-videos.

ÉTAPE 0 — LE COACH D'ABORD (ne rien tourner avant)
- Mesurer les micros de probabilités de [CLASSE] :
  npx --yes tsx@4 scripts/mesurer-squelettes-coach.ts [CLASSE] <notionId>  (ajouter la classe à la table BANQUES du script si besoin)
- Si une micro est sous le seuil (≥ 30 squelettes, ≤ 4 répétitions sur 20 à chaque étoile) : la réparer comme la 3e (générateurs SITUATION × TOURNURE, contextes réunionnais, explications propres au cas, QCM à vrais leurres, ids gardés), puis vérifier démarrage, renouvellement, tsc. Me montrer le tableau avant/après.
- CP, CE1, CE2 : pas de micro de probabilités dans le coach (hors programme) → vidéos « certain / possible / impossible » HORS coach, sans branchement.

ÉTAPE 1 — LE PLAN DU LOT
- Relever les micros de [CLASSE] (lib/tutor-v4/knowledge/maths/[CLASSE]/microSkills.ts) dans l'ordre du coach, et les questions de la banque.
- Proposer : la ceinture des paysages de la classe ; pour chaque micro, la situation concrète de la paysage et le jeu du short.
- Exemples PRATIQUES et LUDIQUES (Frédéric, 15/10 : « pas obligatoirement réunionnais mais pratique et ludique ») : jeux de société (dé, petits chevaux, jeu de l'oie, cartes), kermesse et tombola, sac de billes, bonbons, pile ou face, météo, tirage des équipes ; une touche réunionnaise quand elle vient naturellement. Fil rouge : l'élève retrouve les mêmes objets d'une classe à l'autre et voit l'idée grandir.

ÉTAPE 2 — LES VOIX (s'arrêter pour validation)
- Paysage (≈ 2-3 min) : page de garde (nom + question + échelle des ceintures) → situation concrète → méthode → pièges → défi « Mets pause, et cherche ! » → correction → « Ce que tu as appris » (affirmations courtes) → épisode suivant → abonnement. JAMAIS ouvrir sur une formule.
- Short (≈ 30 s) : il AMUSE (pari, surprise, « tu paries ? »), pas de cours ; il finit par une question « Réponds en commentaire ! ».
- La voix = l'écrit (chaque nombre dit est écrit au moment où il est dit). Une probabilité s'écrit en fraction (seule exception au « ÷ ») et se dit « 1 sur 6 ». « − » U+2212. Jamais de < ou > dans un texte YouTube.
- Niveau : CP-CM2 phrases très courtes, débit −10 ; 6e-3e débit −8/−7 ; lycée −4 à −7. Chaque classe monte d'un cran sans recopier la précédente.
- Coller TOUTES les voix du lot EN ENTIER et attendre mon « go ».

ÉTAPE 3 — LE RENDU (après mon « go »)
- Un agent par micro, en parallèle (paysage + short), modèles : manim/scripts/5e/expression_comprendre.py (paysage) et manim/scripts/annonce/annonce_probabilites*.py (dessins de billes, dé, histogramme, arbre, questionnaire).
- Dossiers : manim/sorties/[CLASSE]/maths/probabilites/<NN-micro>/ (paysage + short, rien d'autre).
- Ceintures : paysages = la ceinture de la classe ; shorts = blanche si tout se voit sur le dessin, jaune pour un calcul ou une règle, orange au-delà. L'échelle ENTIÈRE des 7 ceintures partout.
- Contrôle image par planches PyAV obligatoire ; agrandir puis rétrécir pour insister ; rien ne chevauche Ti-Margo ; aucun nom de personne à l'écran.

ÉTAPE 4 — APRÈS RENDU
- Miniatures (miniature_essai_v2.py pour les paysages, miniature_short_expression.py pour les shorts, échelle des ceintures).
- Manifeste : titre, description (🥋 ceinture, liens fiche / feuille / micro du coach), chapitres mesurés au dry run, {{LONGUE}} dans les shorts.
- Aperçu : manim/sorties/apercu.html (port 3900), vidéos à l'arrêt ; ne jamais lancer la lecture.

ÉTAPE 5 — LA PUBLICATION (une vidéo à la fois)
- Fiche (chemin, miniature, titre, description, tags, playlist) → je publie → je t'envoie le lien → fiche suivante. Paysage avant son short.
- Outil : .tmp-publier-expression.js (adapter la table ORDRE et le script de branchement). Lien douteux → vérifier par l'oEmbed YouTube.
- Branchement sur la micro du coach (paysage youtu.be/ID, short youtube.com/shorts/ID). Pas de QR ni de sitemap pour une vidéo de micro.

ÉTAPE 6 — LE COMMIT
- Commit PAR CHEMIN des sources (banque du coach, scènes, voix, miniatures, manifeste), push à mon signal. Mémoire serie-probabilites-cm1-terminale mise à jour (où on en est, les ids publiés).

Commence par l'étape 0.
```

## 2. Toutes les notions de maths, du CM1 à la terminale

### CM1 — 27 notions, 156 micros
Nombres entiers (6) · Suites de nombres (4) · Tables de multiplication (12) · Multiplication (5) · Division (6) · Fractions (9) · Nombres décimaux (8) · Calculs (8) · Problèmes (6) · Algèbre (7) · Proportionnalité (7) · Longueurs (5) · Masses (4) · Contenances (4) · Durées (5) · Périmètres (5) · Aires (5) · Angles (5) · Repérage (5) · Droites (5) · Symétrie (5) · Figures planes (6) · Solides (5) · Tableaux (4) · Graphiques et diagrammes (4) · Probabilités simples (5) · Algorithmique (6)

### CM2 — 30 notions, 155 micros
Nombres entiers (6) · Suites de nombres (4) · Multiplication (6) · Division (6) · Fractions (7) · Fractions supérieures à 1 (3) · Calculer avec les fractions (3) · Nombres décimaux (8) · Calculs (7) · Problèmes (5) · Algèbre (7) · Proportionnalité (6) · Pourcentages simples (5) · Échelles simples (4) · Longueurs (4) · Masses (4) · Contenances (4) · Durées (5) · Périmètres (5) · Aires (5) · Angles (5) · Repérage (5) · Droites (5) · Symétrie (5) · Figures planes (7) · Solides (5) · Tableaux (4) · Graphiques et diagrammes (4) · Probabilités simples (5) · Algorithmique (6)

### 6e — 35 notions, 176 micros
Algorithmique et programmation (6) · Nombres entiers (6) · Nombres décimaux (6) · Calculer avec les décimaux (5) · Repérer sur une demi-droite graduée (4) · Fractions (6) · Calculer avec les fractions (4) · Problèmes à nombres inconnus et motifs (4) · Pourcentages (6) · Proportionnalité (6) · Échelles, plans et cartes (4) · Calcul posé (6) · Calcul mental (6) · Longueurs (6) · Périmètres (6) · Comprendre l'aire et ses unités (3) · Calculer une aire (6) · Distances et milieu d'un segment (4) · La médiatrice d'un segment (5) · La bissectrice d'un angle (4) · Médiatrices d'un triangle et cercle circonscrit (3) · Le cercle et le périmètre du disque (6) · Le repérage dans le temps et les durées (5) · La vision dans l'espace (4) · Volumes (6) · Angles (6) · Triangles : reconnaître et nommer (5) · Triangles : angles et constructibilité (4) · Quadrilatères : reconnaître et nommer (4) · Quadrilatères : propriétés et construction (5) · Symétrie axiale (6) · Mener une enquête et construire un tableau (4) · Lire et interpréter des données (6) · Probabilités (6) · Fréquences observées et probabilité (3)

### 5e — 19 notions, 107 micros
Lire et exécuter un programme (5) · Écrire et modifier un programme (5) · Nombres relatifs (7) · Opérations sur les nombres relatifs (5) · Multiples, diviseurs et divisibilité (5) · Fractions : reconnaître et comparer (6) · Calculer avec les fractions (4) · Proportionnalité (6) · Ratios et pourcentages (4) · Calcul littéral (7) ✅ · Angles (7) · Triangles (6) · Symétrie centrale (5) · Parallélogrammes (6) · Aires (5) · Conversions et durées (4) · Volumes (7) · Statistiques (8) · Probabilités (5)

### 4e — 34 notions, 213 micros
Algorithmique et programmation (6) · Opérations sur les nombres relatifs (7) · Fractions et nombres rationnels (5) · Calculer avec les fractions (7) · Puissances et notation scientifique (8) · Se repérer sur une droite, dans le plan, sur la Terre (7) · Solides et représentations (5) · Multiples, diviseurs et division euclidienne (7) · Nombres premiers et décomposition (4) · Ordres de grandeur et préfixes (5) · Proportionnalité (8) · Ratios (5) · Pourcentages (5) · Agrandissement, réduction et échelles (7) · Expressions littérales (5) ✅ · Distributivité (5) · Identités remarquables (5) · Factorisation (4) · Équations (8) · Pythagore et sa réciproque (8) ✅ · Thalès et sa réciproque (7) · Cosinus dans le triangle rectangle (6) · Le triangle pour démontrer (7) · Parallélogrammes (7) · Transformations (symétrie, translation, rotation) (6) · Périmètres (7) · Aires (8) · Volumes (7) · Grandeurs composées et unités (6) · Lire et interpréter des données (5) · Indicateurs statistiques (6) · Probabilités (8) · Fréquences observées et probabilité (5) · Dépendance entre deux grandeurs (7)

### 3e — 22 notions, 141 micros
Algorithmique et programmation (6) · Nombres rationnels (5) · Puissances (6) · Racine carrée (5) · Multiples et diviseurs (6) · Proportionnalité (7) · Calcul littéral (7) ✅ · Équations (7) · Fonctions (7) · Fonctions affines (8) · Triangles (5) · Théorème de Pythagore (7) · Théorème de Thalès (6) · Trigonométrie (8) · Transformations (dont homothéties) (6) · Géométrie dans l'espace (4) · Sections planes de solides (6) · Périmètres (5) · Aires (6) · Volumes (8) · Statistiques (8) · Probabilités (8)

### Seconde — 25 notions, 140 micros
Nombres réels, intervalles et valeur absolue (6) · Multiples, diviseurs et nombres premiers (4) · Puissances (6) · Racine carrée (6) · Développement et factorisation (5) · Identités remarquables (5) · Expressions littérales (3) · Équations et inéquations du premier degré (5) · Vecteurs du plan (9) · Repère et coordonnées (4) · Droites du plan (7) · Problèmes de géométrie plane (5) · Signe d'une expression (5) · Fonctions : vocabulaire et représentations (7) · Analyse graphique d'une fonction (6) · Variations et extremums (3) · Fonctions affines (4) · Fonctions de référence (7) · Information chiffrée : proportions, pourcentages et évolutions (6) · Statistiques descriptives (9) · Probabilités sur un ensemble fini (7) · Probabilités conditionnelles et arbres (5) · Échantillonnage et simulation (4) · Algorithmique et Python (7) · Vocabulaire ensembliste et logique (5)

### Première (tronc commun, automatismes) — 57 notions, 207 micros
Comparer deux nombres (3) · Fractions, puissances et écritures (3) · Ordre de grandeur et unités (4) · Développer et factoriser (4) · Équations et inéquations (4) · Signe d'une expression (3) · Formules littérales (3) · Proportions (3) · Partie et tout (3) · Coefficient multiplicateur (4) · Taux d'évolution (4) · Lire un graphique (4) · Résoudre graphiquement (4) · Droites et coefficient directeur (4) · Lire des statistiques (3) · Moyenne, médiane, quartiles (5) · Probabilités : les bases (4) · Probabilités : lire un tableau, un arbre (3) · Tableau croisé : lire et compléter (3) · Fréquences marginales et conditionnelles (3) · Représenter deux caractères (4) · Nuage de points (3) · Point moyen (3) · Ajustement affine (3) · Interpoler et extrapoler (3) · Tableur (5) · Filtrer des données (ET, OU, NON) (5) · Probabilité conditionnelle : reconnaître (3) · Probabilité conditionnelle : calculer (4) · Arbre pondéré : lire et construire (3) · Arbre pondéré : calculer (3) · Indépendance de deux évènements (4) · Épreuves de Bernoulli : reconnaître (3) · Répétition d'épreuves : calculer (3) · Suite arithmétique : reconnaître (4) · Suite arithmétique : terme général (4) · Fonction affine (3) · Fonction affine : lire et exploiter (3) · Modéliser une croissance linéaire (3) · Problème de seuil : croissance linéaire (3) · Parabole et expression de degré 2 (5) · Parabole : sommet et axe de symétrie (4) · Parabole : variations et extremum (3) · Racines et signe par la forme factorisée (5) · Suite géométrique : reconnaître (4) · Suite géométrique : terme général (4) · Fonction exponentielle x ↦ aˣ (4) · Fonction exponentielle : variations et courbe (3) · Taux d'évolution moyen (4) · Modéliser une évolution exponentielle (4) · Problème de seuil : croissance exponentielle (4) · Dérivée — lire un graphique (4) · Dérivée — nombre dérivé et tangente (3) · Dérivée — les formules de base (3) · Dérivée — polynômes (5) · Dérivée — signe (3) · Dérivée — tableau de variations (5)

### Première spécialité — 16 notions, 142 micros
Suites numériques (13) · Second degré (11) · Dérivée — taux de variation et nombre dérivé (4) · Dérivée — tangente et lecture graphique (3) · Dérivée — les formules de base (2) · Dérivée — somme, produit, quotient (3) · Analyse graphique d'une fonction (6) · Variations et courbes des fonctions (10) · Fonction exponentielle (12) · Trigonométrie (13) · Calcul vectoriel et produit scalaire (11) · Géométrie repérée (10) · Probabilités conditionnelles et indépendance (11) · Variables aléatoires réelles (10) · Algorithmique et programmation (10) · Vocabulaire ensembliste et logique (13)

### STMG (1re et terminale) — 86 notions, 304 micros
**Évolutions et calcul** : Proportions et pourcentages (4) · Coefficient multiplicateur (4) · Calculer un taux d'évolution (3) · Évolutions successives et réciproque (4) · Indice base 100 (4) · Fractions, puissances et écritures (4) · Ordre de grandeur et conversions (3) · Développer, factoriser, réduire (4) · Équations et inéquations (4) · Signe d'une expression (3) · Formules et calcul littéral (3) · Lire une courbe (4) · Résoudre graphiquement (3) · Droites et coefficient directeur (4) · Lire des données chiffrées (4) · Automatismes de terminale — reconnaître (3) · Automatismes de terminale — dérivée et tangente (3)
**Suites** : notation et modes de génération (3) · calculer des termes (3) · arithmétique : reconnaître (4) · géométrique : reconnaître (3) · géométrique et taux d'évolution (3) · représenter les termes (4) · modéliser par une suite (4) · problème de seuil (4) · terme général (Tle) (4) · moyenne arithmétique et géométrique (Tle) (3) · somme des n premiers termes (Tle) (3) · sommes : emprunts et placements (Tle) (3) · comparer deux suites (Tle) (4)
**Fonctions** : représenter et noter (4) · taux de variation et sécante (3) · fonction monotone (3) · degré 2 : la parabole (3) · axe de symétrie et extremum (3) · racines et signe (3) · factoriser connaissant une racine (3) · degré 3 : courbe, racines et signe (4) · résoudre x² = c et x³ = c (3) · fonction inverse (Tle) (3) · inverse : dérivée et variations (Tle) (3)
**Dérivée** : sécantes et tangente (3) · nombre dérivé (4) · équation de la tangente (3) · formules de base (4) · polynômes de degré au plus 3 (4) · signe et tableau de variations (4) · problème d'optimisation (3)
**Exponentielle et logarithme (Tle)** : x ↦ aˣ : définition (4) · x ↦ kaˣ : variations et allure (4) · propriétés algébriques de aˣ (4) · taux d'évolution moyen (3) · taux équivalent sur une autre période (3) · logarithme décimal : définition (3) · propriétés algébriques de log (4) · résoudre aˣ = b avec le logarithme (3) · logarithme : durées et ordres de grandeur (3)
**Statistiques** : tableau croisé d'effectifs (4) · fréquences marginales et conditionnelles (4) · filtrer des données (ET, OU, NON) (4) · nuage de points (Tle) (3) · ajustement affine (Tle) (4) · interpoler et extrapoler (Tle) (3) · méthode des moindres carrés (Tle) (3) · changement de variable pour linéariser (Tle) (3)
**Probabilités** : conditionnelle sur un tableau (3) · ne pas confondre les probabilités conditionnelles (3) · deux épreuves indépendantes (4) · arbre : construire (Tle) (4) · arbre : chemins et probabilités totales (Tle) (4) · indépendance de deux événements (Tle) (4) · variable aléatoire : loi de probabilité (4) · espérance (4) · loi de Bernoulli (4) · fluctuation d'échantillonnage (4) · loi binomiale : reconnaître (Tle) (4) · coefficients binomiaux et triangle de Pascal (Tle) (4) · loi binomiale : calculer (Tle) (4)
**Algorithmique et logique** : variables, compteur et accumulateur (4) · boucles et instruction conditionnelle (4) · listes (4) · fonctions en Python (4) · tableur : écrire une formule (3) · tableur : recopier et exploiter (3) · logique : et, ou, non (4) · contre-exemple et réciproque (3)

### Terminale spécialité — 18 notions, 107 micros
Suites numériques (7) · Limites de suites (6) · Limites de fonctions (6) · Continuité et théorème des valeurs intermédiaires (5) ✅ · Dérivation et variations (7) · Convexité (5) · Fonction exponentielle (6) · Fonction logarithme népérien (6) · Primitives et intégrales (6) · Dénombrement et combinatoire (6) · Géométrie dans l'espace (6) · Produit scalaire dans l'espace (6) · Probabilités conditionnelles (5) · Variables aléatoires (6) · Loi binomiale (6) · Algorithmique et Python (6) · Équations différentielles (6) · Concentration, loi des grands nombres (6)

✅ = notion déjà couverte par une série de vidéos par micro.

---

## 3. Les grands fils qui traversent les classes (candidats aux prochaines séries)

| Fil | Classes | Ordre de grandeur |
|---|---|---|
| Probabilités | CM1 → Tle | ~145 micros (2 séries) |
| Fractions et rationnels | CM1 → 3e (+ 1re/STMG) | ~75 micros |
| Proportionnalité, pourcentages, évolutions | CM1 → 1re/STMG | ~90 micros |
| Statistiques et données | CM1 → STMG | ~80 micros |
| Aires, périmètres, volumes | CM1 → 3e | ~85 micros |
| Fonctions (affines, référence, dérivée) | 3e → Tle | ~120 micros |
| Équations | 4e → 1re | ~35 micros |
| Puissances, racines | 4e → 2de | ~35 micros |
