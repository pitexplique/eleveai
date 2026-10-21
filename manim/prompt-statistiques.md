# Prompt — la série STATISTIQUES, du CM1 à la terminale

> Écrit le 20/10/2026, après la série Probabilités (≈ 360 vidéos en 3 jours).
> Frédéric est STATISTICIEN : l'exigence de justesse est maximale.

## Le but

Une vidéo paysage + un short par micro de statistiques du coach, du CM1 à la terminale
(≈ 115 micros : CM1 8, CM2 8, 6e 10, 5e 8, 4e 11, 3e 8, 2de 9, 1re tronc commun 25, STMG 28).
Les vidéos vont sur R2 et sur la micro du coach ; YouTube reçoit seulement une sélection, pour la pub.

## ⛔⛔ La règle de fond : les maths sont TRANSVERSALES, et on veut DONNER ENVIE

- **Une autre matière, ou un autre monde, par épisode.** Les données viennent de :
  - la physique (mesures, incertitude) et la biologie (tortues de Kélonia, croissance) ;
  - la nature et l'écologie (pluies, déchets des plages, biodiversité d'une ravine) ;
  - le sport (Grand Raid, statistiques d'un match, régularité d'un joueur) ;
  - l'histoire (population de La Réunion depuis 1848) et la littérature (fréquence des lettres chez Hugo, code secret) ;
  - les jeux de hasard (fréquence face à probabilité) et l'économie (salaire médian face au salaire moyen, prix, inflation) ;
  - les journaux télévisés (sondage et marge d'erreur, « +50 % », axe tronqué, corrélation ≠ causalité) ;
  - les réseaux sociaux (vues « virales » et médiane, temps d'écran, biais de l'échantillon) ;
  - la musique, le cinéma, la culture, la géographie.
- **Un MÉTIER porte la situation**, pour évoquer des vocations. Filles et garçons, souvent d'ici. Exemples : statisticienne, data analyst, actuaire, épidémiologiste, sondeur, économiste à l'INSEE, biologiste marin, hydrologue, analyste vidéo d'un club, community manager, linguiste. Une ou deux phrases suffisent ; le métier se sert vraiment de ces maths.
- **Varier les problématiques** : décider, prévoir, contrôler, comparer deux groupes, juger une affirmation du JT, repérer une manipulation.
- **De VRAIES données** quand c'est possible (INSEE, Météo-France, Kélonia, résultats du Grand Raid), avec leur source dite ou écrite. Sinon, des données vraisemblables et calculées en Python. Jamais un nombre inventé « à vue ».
- **Le ton** : concret, respectueux, plein d'élan, jamais moralisateur. Beaucoup de jeunes doutent : chaque vidéo ouvre une porte.
- Dans un même lot, jamais deux fois le même domaine ni le même métier.

## La méthode (celle des probabilités)

1. **Le coach d'abord.** Chaque notion de statistiques du coach doit être ROBUSTE : générateurs, pas des pools ; mesurer les squelettes (`scripts/mesurer-squelettes-coach.ts`). Pas de question ouverte vague.
2. **Les épisodes communs** (même micro dans deux classes, par exemple 1re tronc commun et STMG pour le tableau croisé, les filtres et le nuage) : UNE voix et UN script, avec une classe Base et des sous-classes qui ne changent que l'identité et la ceinture. L'entrée jumelle du manifeste porte `meme_video_que`. Chaque dossier de classe reste complet, pour les packs.
3. **Agents en parallèle**, chacun avec son `--media_dir`, et un seul rendu HD à la fois par agent. Ils écrivent par petits Edit.
4. **Une seule passe à la fin du lot** : miniatures (`manim/miniature_essai_v2.py`, `manim/miniature_short_expression.py`) → manifeste (entrées minimales : titre, micro, fichiers) → `python scripts/vignettes-videos.py` → `scripts/r2-videos.ps1 -Envoyer` → `node scripts/generer-videos-r2.mjs` → `node scripts/brancher-videos-coach.mjs --ecrire` → commit PAR CHEMIN.
5. **Push : 2 par jour au plus.** Vérifier avant chaque push que la story Instagram n'en fait pas partie (`git log origin/main..HEAD --stat`).

## Les règles de chaque vidéo (`manim/REGLES.md`)

- On n'ouvre pas sur les maths : une situation concrète d'abord, « Ce que tu as appris » à la fin.
- **La voix correspond à l'écrit.** Chaque nombre dit est écrit au moment où il est dit. Pour les malvoyants, un short DIT tous les nombres dont on a besoin pour répondre.
- **Calage mot à mot** : `marques.ps1` + `conv.py` (voir `manim/scripts/terminale/proba_bin_defi.py`). Le dry run imprime « RETARD » au-delà de 0,3 s, et il ne doit en rester aucun.
- **Ceinture** : l'échelle entière sur chaque vidéo. Paysage selon la difficulté, short un cran plus bas.
- **Figures** : les CANVAS du coach de la micro (tableaux, diagrammes en barres et circulaires, histogrammes, boîtes à moustaches, nuages de points), dans le même style. Avec un tableau croisé ou une fréquence conditionnelle, on fait le lien avec les probabilités déjà en vidéo.
- **Short** : il AMUSE (jeu, surprise, question) et finit par une question à laquelle on répond en commentaire. **Paysage** : il fait APPRENDRE (méthode, piège, défi avec correction).
- **Fin des voix** : « Entraîne-toi sur éleveai point f r. Et abonne-toi ! » Page de fin sur le modèle de `manim/scripts/stmg/proba_au_moins_un.py` (vers la ligne 519).
- **Débit de la voix** : −10 pour le CM et la 6e, −8 pour la 5e, −7 de la 4e à la 1re et en STMG, −6 en terminale.
- **Objets animés** : structure fixe + `become`. Jamais `remove` / `add` dans un updater, sinon on obtient un fantôme.
- **Code Python à l'écran** : police Consolas, indentation faite à la main.
- Corriger TOUT défaut vu sur les planches PyAV : chevauchement, débordement, texte qui se brouille (utiliser des fondus), nombre trop petit pour un téléphone.
- Chapitres mesurés par dry run : départ à 00:00, au moins 3, chacun de 10 s minimum.

## Les CANVAS de la série (recensés le 20/10/2026)

Les vidéos et les feuilles reprennent les figures du coach (`lib/canvas/`, catalogue `lib/canvas/CATALOGUE.md`).

| Canvas | Ce qu'il montre | Classes |
|---|---|---|
| `tableau_donnees` | Tableau simple ou à double entrée ; ligne, colonne, case surlignées | CP → STMG |
| `stat_graph` `barres` / `batons` | Effectifs par catégorie ou par valeur ; ⭐ axe GRADUÉ (`showAxis`, `step`, `axeY`) pour LIRE sans valeur écrite | CP → 1re |
| `stat_graph` `camembert` | Parts d'un tout, en couleurs ; `valeursParts`, `pourcentages` (somme = 100) | CM1 → 1re |
| `stat_graph` `courbe` ⭐ nouveau | Une évolution : pluie par mois, population par année | CM2 → 1re |
| `stat_graph` `histogramme` ⭐ nouveau | Classes de valeurs, barres jointives, `bornes` | 3e, 2de |
| `stat_graph` + `yMin` ⭐ nouveau | L'axe TRONQUÉ du JT, pour le dénoncer | 6e → 1re |
| `diagramme_boite` | Min, Q1, médiane, Q3, max ; plusieurs séries empilées | 2de → 1re |
| `fonctionGraphique` (type `points`) | Nuage de points, droite d'ajustement | 1re, STMG |
| `number_line` | Valeurs sur un axe : étendue, médiane qui coupe la série | 5e → 2de |
| `probabilites`, `arbre_proba` | Lien fréquence ↔ probabilité, tableau croisé ↔ arbre | 5e → 1re |
| `objets` | Collecter et trier (pictogrammes, cycle 2) | CP → CE2 |

⛔ Il manque encore : le diagramme figuratif (pictogrammes : 1 dessin = 10), le polygone des effectifs cumulés (2de) et le diagramme en barres GROUPÉES (comparer deux groupes). À créer quand une micro les demande.
Côté Manim, un seul module partagé, `manim/canvas_stats.py`, redessine ces canvas dans le même style (à créer avec le premier épisode, puis importé par tous).

## Les pièges statistiques à montrer (le regard du statisticien)

- Moyenne contre médiane : quand quelques valeurs extrêmes tirent la moyenne (salaires, vues).
- Effectif contre fréquence : comparer deux groupes de tailles différentes.
- La moyenne de moyennes n'est pas la moyenne globale : il faut la moyenne pondérée.
- Les quartiles ne coupent pas les valeurs, ils coupent l'effectif.
- Un graphique qui ment : axe tronqué, aires disproportionnées, camembert à 110 %.
- Corrélation n'est pas causalité. Extrapoler loin hors des données est dangereux.
- Un échantillon biaisé : « tout le monde le pense » sur les réseaux.
- La marge d'erreur d'un sondage : le lien avec la fluctuation d'échantillonnage.

## L'ordre conseillé

Un lot par cycle :
1. CM1, CM2 et 6e (tableaux, graphiques, enquête) ;
2. 5e, 4e et 3e (fréquence, moyenne, médiane, étendue) ;
3. seconde (quartiles, écart-type, moyenne pondérée) ;
4. 1re tronc commun et STMG ensemble (tableau croisé, filtres, nuage, ajustement, moindres carrés, changement de variable).

## Pour démarrer une session

> Lis `manim/prompt-statistiques.md`, `manim/REGLES.md` et la mémoire (statistiques, maths transversales). Commence par la robustesse du coach en statistiques pour [classe], puis écris les épisodes du lot.
