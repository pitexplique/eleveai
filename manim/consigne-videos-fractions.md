# Consigne — VIDÉOS de la série FRACTIONS (6e puis 4e, ensuite CM1 → Tle)

⭐ Lis EN ENTIER, dans cet ordre : `manim/consigne-videos-stats-cycle3.md` (règles de fond, vérifications PyAV, écriture par morceaux ≤ 150 lignes, NE RIEN COMMITTER, ne jamais lire une vidéo, calage mot à mot par `*_marques.json`), puis `manim/consigne-videos-stats-cycle4.md` (TU ÉCRIS LA VOIX, épisodes communs, génération des WAV), puis `manim/REGLES.md` EN ENTIER (ceintures, questions-pauses, centres, « Ce que tu as appris », rien de rogné, synchro 0 s, maths transversales). Ce fichier ne donne que les DIFFÉRENCES. Remplace partout « statistiques » par « fractions ».

Frédéric enseigne cette année en **6e et en 4e** : ce sont SES classes, ses élèves verront ces vidéos en classe (ses 6e lisent difficilement : phrases courtes, beaucoup de visuel). La qualité passe avant la durée.

## ⭐⭐ Le fil rouge : SES erreurs sur les copies (ne jamais en inventer d'autres)
1. **SIMPLIFIER** : ils ne savent pas (diviser numérateur ET dénominateur par le MÊME nombre ; reconnaître qu'une fraction ne se simplifie plus).
2. **Fraction → DÉCIMAL** : 3/4 = 3 ÷ 4 = 0,75.
3. **Décimal → POURCENTAGE** : 0,75 = 75 %.
Leurres des questions-pauses tirés de là : simplifier en SOUSTRAYANT (6/8 → 4/6), ne diviser qu'un des deux termes, 3/4 = 3,4, 0,75 = 0,75 %, 1/4 = 4 %. Chaque épisode qui le permet rappelle la chaîne « simplifier → décimal → pourcentage » (sans alourdir).

## ⭐⭐ Centres d'intérêt et contextes (Frédéric, 24/10 : « sans oublier les CONTEXTES et CENTRES D'INTÉRÊT liés à ça ! »)
1 à 3 centres par vidéo, liste FERMÉE `lib/videos/centres-interet.ts` (cuisine et animaux PERMIS en 6e et 4e), aide `manim/centres-interet-par-age.md`. Un décor et un MÉTIER différents par épisode, filles et garçons. Pistes :
- SIMPLIFIER : cuisine (recette pour 8 → pour 4), musique (mesures, rythmes), jeux-defis (pizzas, parts), sport (30 min sur 90 = 1/3).
- FRACTION → DÉCIMAL : sport (3 tirs sur 4 = 0,75), argent-budget, sciences (dosages), transports (1/4 d'heure = 0,25 h).
- DÉCIMAL → POURCENTAGE : jeux-video (barre de chargement, taux de victoire), reseaux-sociaux, argent-budget (soldes −25 %), corps-sante (eau du corps ≈ 60 %), nature-ecologie, sport.
Données réelles vérifiées par WebSearch (source + date dans l'en-tête du script) quand un chiffre du monde réel est cité.

## ⭐ SES deux énigmes du gâteau (shorts)
- **6e, short de 02-representer** : gâteau ROND en 6 parts au COMPAS (rayon reporté 6 fois sur le cercle, sans rapporteur) ; relier les 6 points donne un hexagone de 6 triangles ÉQUILATÉRAUX (côtés = rayon, angles de 60°) : chaque part = ce triangle + un petit arc de croûte. Puis 2/6 = 1/3, 3/6 = 1/2 ; 1/6 = 1 ÷ 6 = 0,1666… (la division ne s'arrête pas) ≈ 16,7 %. Question en commentaire : « 2 parts sur 6, quel pourcentage ? » (≈ 33 %). Centres : cuisine, jeux-defis.
- **4e, short de 10-quantite** : gâteau CARRÉ en 5 (la surprise) : côté 20 cm → tour 80 cm → 16 cm de bord par part, on coupe depuis le centre ; parts de formes différentes mais même aire (16 × 10 ÷ 2 = 80 cm² sur 400 = 1/5 = 0,2 = 20 %). Question en commentaire : « pour 8 personnes, combien de cm de bord par part ? » (10). Centres : cuisine, jeux-defis.

## Les règles du 23-24/10 (OBLIGATOIRES, détail dans REGLES.md)
1. **Questions-pauses** : 2 ou 3 par paysage (compte à rebours 5 s), 1 par short (3 s), en plus de « À toi de jouer ». Dans ton rapport : la liste `questions` (t "MM:SS" MESURÉ sur le rendu, question, choix, reponse 0/1/2, explication).
2. **Centres** : 1 à 3 (liste fermée), notés `centres` dans ton rapport.
3. **« Ce que tu as appris »** : titre EN HAUT ET CENTRÉ, à la FIN ; on n'ouvre jamais sur les maths ni sur les objectifs.
4. **Marge ≥ 3 %** sur les 4 côtés ; après CHAQUE rendu `python scripts/verifier-bords-video.py <mp4>` → « 0 instants ». L'écran de fin « Entraîne-toi sur eleveai.fr » : n'y touche pas.
5. **Synchro voix/écrit : 0 s d'avance**, 0,4 s de retard au plus, aucun chevauchement ; « ÷ » pour une division hors écriture fractionnaire.
6. **Ceinture** affichée (échelle entière) sur la paysage ET le short, choisie selon REGLES.md et justifiée.

## Économie (quota)
- Brouillons : planches de 8 images en basse définition (`-ql`). La HD UNE fois, à la fin.
- Rendu final : planche de 12 images + images rapprochées sur les écrans chargés (question-pause, correction, « Ce que tu as appris »). Cette vérification-là ne baisse jamais.
- Rapport court : la voix reste dans son JSON (ne pas la recopier ; le chef d'orchestre la lira) ; donner fichiers, durées, décor/métier/source, centres, ceintures, `questions`, soucis restants.
- Réutilise : le module commun `manim/canvas_fractions.py`, les décors et fonctions des épisodes déjà faits.

## Le module commun : `manim/canvas_fractions.py`
Créé par l'agent PILOTE (6e 03-egale), au style des figures du COACH que l'élève retrouvera ensuite : `lib/canvas/FractionCanvas.tsx` (modèles bar, circle, grid, compare : parts colorées, parts allumées), `lib/canvas/DroiteGradueeCanvas.tsx`, `lib/canvas/SchemaBarreCanvas.tsx`. Il fournit au moins : `Barre` (bande partagée en n parts, k colorées, re-partage animé : 3/4 → 6/8 en coupant chaque part en 2 — c'est LE geste de la simplification vu à l'envers), `Disque` (parts, parts allumées), `Grille`, `Droite` (demi-droite graduée, point placé), `EcritureFraction` (numérateur / trait / dénominateur avec flèches « ÷ 2 » ou « × 2 » en haut ET en bas), `Division` (3 ÷ 4 = 0,75 posé ou en ligne) et `Pourcentage` (barre de 100 cases ou barre de chargement), avec des méthodes d'animation simples (renvoyer des objets/animations, ne rien ajouter à la scène, comme `canvas_stats.py` — lis son en-tête pour l'esprit de l'API). Le pilote documente l'API dans l'en-tête du module ; les autres agents NE LE MODIFIENT PAS (ils complètent dans LEUR script et le signalent).
Les anciennes vidéos `manim/scripts/6e/fraction_nombre.py`, `fraction_calcul.py`, `manim/scripts/bases/fractions.py` peuvent servir de réserve d'idées ; on ne les modifie pas.

## Ce que montre chaque vidéo
La micro du coach (`lib/tutor-v4/knowledge/maths/<classe>/microSkills.ts`) et SA banque (`lib/tutor-v4/questionBank/<classe>/maths/fractions.bank.ts`, `fractions-calcul.bank.ts`, `pourcentages.bank.ts`) : la vidéo prépare la série d'exercices, avec les mêmes figures et le même vocabulaire. Une paysage (apprendre : situation concrète + métier, méthode, piège, questions-pauses, « À toi de jouer » avec pause, correction, « Ce que tu as appris », phrase de fin « Entraîne-toi sur éleveai point f r. Et abonne-toi ! ») et un short vertical 9:16 (amuser : jeu, surprise, 1 question-pause, finit par une QUESTION chiffrée à laquelle répondre en commentaire). Débit de la voix −10. Vérifie chaque calcul (Python).

## Noms et sorties
- Script `manim/scripts/<classe>/frac_<slug>.py` (+ `_short.py`), classe `Frac<Slug><Classe>` (`6e`, `4e`).
- Voix `manim/voix/<classe>-frac-<slug>.json` (+ `-short.json`), WAV par `scripts/generer-voix.ps1` (comme le cycle 4).
- Sorties `manim/sorties/<classe>/maths/fractions/<NN>-<slug>/eleveai-maths-<classe>-frac-<slug>[-short].mp4`.
- media_dir `manim/scripts/<classe>/media-frac-<slug>` (un par rendu).
- Ids du manifeste (passe finale, chef d'orchestre) : `<classe>-frac-<slug>[-short]`.

## Numérotation (micro du coach entre parenthèses)
- **6e**, notion `fraction_nombre` : 01-lire-ecrire (fraction_lire_ecrire), 02-representer (fraction_representer ; short = gâteau en 6 au compas), 03-egale (fraction_egale, NOUVELLE micro « Fractions égales, simplifier », 24/10 — PILOTE), 04-decimal (fraction_decimal), 05-comparer, 06-mixte, 07-defi.
- **6e**, notion `fraction_calcul` : 08-quantite, 09-additionner, 10-multiplier-entier, 11-calcul-defi — PAYSAGE SEULEMENT (les shorts de ces 4 micros existent déjà : `6e-fraction-calcul-short-*`, dans le manifeste).
- **6e**, la chaîne vers les pourcentages (notion `pourcentage_nombre`) : 12-pourcentage-fraction (pourcentage_fraction), 13-pourcentage-decimal (pourcentage_decimal).
- **4e**, notion `fraction_nombre` : 01-egale, 02-simplifier, 03-decimal, 04-rationnel, 05-comparer.
- **4e**, notion `fraction_calcul` : 06-additionner, 07-multiplier, 08-inverse, 09-diviser, 10-quantite (short = gâteau carré en 5), 11-oppose, 12-defi.
Les épisodes 4e 01 à 03 reprennent les gestes de 6e au niveau 4e (nombres plus grands, négatifs, plusieurs étapes) : réutilise les décors/fonctions de 6e, mais voix et exemples propres à la 4e.

## Rapport final (court, en français)
Par épisode : fichiers, durées, décor/métier/source, centres, ceinture(s), `questions` (t mesuré), ce que tu as vu sur les planches, résultat de `verifier-bords-video.py`, soucis restants. Le chef d'orchestre recopie `questions` et `centres` dans `manim/questions-fractions.md`.
