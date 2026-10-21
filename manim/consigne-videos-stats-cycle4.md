# Consigne — VIDÉOS de la série STATISTIQUES, cycle 4 (5e, 4e, 3e)

⭐ D'abord, lis EN ENTIER `manim/consigne-videos-stats-cycle3.md` : elle FAIT FOI (règles, vérifications PyAV, écriture par morceaux ≤ 150 lignes, NE RIEN COMMITTER, ne jamais lire une vidéo, ne pas modifier `manim/canvas_stats.py`, API du module, pièges vus sur les planches). Ce fichier n'en donne que les DIFFÉRENCES.

## Modèles
- Les 18 épisodes du cycle 3 sont rendus : lis au moins `manim/scripts/cm1/stats_graphique_lire.py` (+ `_short.py`), `manim/scripts/6e/stats_interpreter.py` et `manim/scripts/cm1/stats_tableau_commun.py` (tableaux). Sorties modèles dans `manim/sorties/{cm1,6e}/maths/statistiques/`.
- Qualité exigée : celle du cycle 3, pas moins. La qualité passe avant la durée.

## Ce qui change : TU ÉCRIS LA VOIX
Les voix du cycle 4 n'existent pas encore. Pour chaque épisode, écris `manim/voix/<nom>.json` et `<nom>-short.json` (même format que `manim/voix/6e-stats-interpreter.json` : clés ordonnées `00-garde`, `01-…`, une phrase ou deux par clé), d'après :
- la micro du coach (`lib/tutor-v4/knowledge/maths/<classe>/microSkills.ts` : intitulé, objectif, erreurs typiques) et SA banque (`lib/tutor-v4/questionBank/<classe>/maths/statistiques.bank.ts`) : la vidéo montre ce que l'élève fera ensuite dans le coach, avec les mêmes figures ;
- `manim/prompt-statistiques.md` : situation concrète d'abord, un MÉTIER et un domaine différents par épisode (filles et garçons ; pas toujours La Réunion), VRAIES données sourcées dans l'en-tête du script (INSEE, Météo-France, résultats sportifs, Spotify/SNEP, OMS, CNES…), le piège du statisticien, « À toi de jouer » avec pause, correction, « Ce que tu as appris » à la fin ;
- paysage : finit par « Entraîne-toi sur éleveai point f r. Et abonne-toi ! » ; short : jeu/surprise, finit par une QUESTION chiffrée à laquelle répondre en commentaire ;
- voix = écrit : chaque nombre dit est affiché à ce moment ; vérifie chaque calcul (Python).
Génère les WAV : `powershell -NoProfile -File scripts/generer-voix.ps1 -Fichier manim/voix/<nom>.json -Debit -10`, puis les marques de calage comme le cycle 3.

## ⭐ Footballeurs (demande de Frédéric, 21/10)
Dans un ou deux épisodes par lot (pas tous), prends en exemple des footballeurs que les élèves adorent : Kylian Mbappé, Lamine Yamal, Michael Olise (métier : analyste de données d'un club, journaliste sportive, recruteur…). ⛔ Chiffres RÉELS vérifiés par WebSearch, source et date dans l'en-tête ; faits stables (Coupe du monde 2018/2022, Euro 2024, saison terminée) ; un chiffre douteux ne s'utilise pas.

## Épisodes communs (une voix, un script, deux rendus)
Quand la même micro existe dans deux classes, UNE voix (nommée pour la classe la plus basse) et UN script avec une sous-classe par classe qui ne change que l'identité (« Maths 5e — EleveAI » / « Maths 4e — EleveAI ») et la ceinture. La voix ne cite aucune classe. Le short est rendu une fois et copié sous les deux noms.

## Noms et sorties
- Script `manim/scripts/<classe>/stats_<slug>.py` (+ `_short.py`), classe `Stats<Slug><Classe>` (`5e`, `4e`, `3e`). Épisode commun : script dans le dossier de la classe la plus basse.
- Sorties `manim/sorties/<classe>/maths/statistiques/<NN>-<slug>/eleveai-maths-<classe>-stats-<slug>.mp4` et `-short.mp4`.
- media_dir : `manim/scripts/<classe>/media-<slug>` (un par épisode).

Numéros :
- 5e (notion `stat_statistique`) : 01-organiser (stat_donnee_organiser), 02-lire-tableau (stat_lire_tableau), 03-lire-graphique (stat_lire_graphique), 04-effectif-frequence, 05-representer, 06-choisir-representation (stat_representation_choisir), 07-moyenne, 08-defi.
- 4e notion `stat_donnee` : 01-lire-tableau, 02-lire-graphique (communs avec la 5e), 03-effectif, 04-frequence, 05-donnee-defi (stat_donnee_defi).
- 4e notion `stat_statistique` : 06-moyenne, 07-mediane, 08-etendue (communs avec la 3e), 09-interpreter, 10-probleme, 11-defi.
- 3e (notion `stat_statistique`) : 04-moyenne, 05-mediane, 06-etendue (communs avec la 4e). Les autres épisodes de 3e viendront après la réparation du coach de 3e.

## Rapport final (court, en français)
Par épisode : fichiers, durées, décor/métier et source des données, ceinture, la voix paysage EN ENTIER (pour que Frédéric puisse la relire), ce que tu as vu sur les planches, soucis restants.
