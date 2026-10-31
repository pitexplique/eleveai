# Brief commun — agents de rendu, refonte PYTHAGORE 4e (+ 3e) avec questions-pauses

Réponds en français. Dépôt C:\Users\FRED\Documents\eleveai (Windows ; Git Bash et PowerShell). D'autres agents (et une autre session, proportionnalité) rendent en même temps : ne touche qu'à TES fichiers ; outils temporaires dans un sous-dossier à ton nom du dossier temporaire.

## Le but
Les vidéos Pythagore (12-13/10) existent et sont EN LIGNE. On ne les réinvente pas : on garde leurs images et leurs voix, on AJOUTE les questions-pauses et on les met aux règles d'aujourd'hui. Tout est écrit dans `manim/questions-pythagore.md` (texte exact des voix des questions, où les placer, fin, finales à corriger) : n'y change rien sauf erreur de calcul (dis-le).

## À lire d'abord, EN ENTIER
`manim/REGLES.md` (surtout QUESTIONS-PAUSES, RIEN NE DOIT ÊTRE ROGNÉ, SYNCHRO 0 s, « Ce que tu as appris » en haut et centré, phrase de fin), `manim/questions-pythagore.md`, puis TES scripts (`manim/scripts/4e/pythagore_<slug>.py` + `_short.py`, ou `manim/scripts/3e/pythagore_solide*.py`), leurs bases (`pythagore_reconnaitre.py` → `Notion4e`, `gabarit_sixieme.Short6e`…) et leurs voix `manim/voix/<nom>.json`.
Modèle de question-pause FINI à recopier : `question_pause()` et `_disposer_q()` de `manim/scripts/4e/frac_lotd_commun.py` (et l'audit de synchro de `manim/scripts/stmg/stats_lycee_j1_commun.py`).

## Le module commun
`manim/scripts/4e/pythagore_pauses.py` : un mixin (question-pause paysage 5 s / short 3 s, écran de fin « Entraîne-toi sur eleveai.fr / Abonne-toi ! @eleveai974 », audit AUDIT=1 et BORDS=1) que chaque scène Pythagore ajoute à ses bases. Le PILOTE le crée ; les autres agents l'utilisent sans le modifier (un défaut : contourne-le dans TON script et signale-le). Les scènes qui héritent l'une de l'autre (hypoténuse → côté, etc.) : ne casse pas la scène parente d'un autre agent ; vérifie par un dry run des deux.

## Voix
Ajoute à `manim/voix/<nom>.json` les clés `NNq-…` / `NNr-…` (numérotées pour tomber à la bonne place), remplace le texte de `…-abonne`, corrige les finales indiquées. Même voix et même débit que l'existant (lis l'en-tête du script et `scripts/generer-voix.ps1`) ; ne regénère QUE les clés nouvelles ou changées. Voix = écrit.

## Ordre obligatoire, par vidéo
voix + calage → `AUDIT=1 BORDS=1 python -m manim render --dry_run …` (0 AUDIT-AVANCE, 0 RETARD, 0 BORD) → planche basse déf de 8 images REGARDÉE (zoom sur chaque question, sa correction, la fin) → UN SEUL rendu HD (`PYTHONIOENCODING=utf-8`, `--disable_caching`) → `python scripts/verifier-bords-video.py <mp4>` = « 0 instants » → planche finale de 12 images regardée.
Le nouveau mp4 REMPLACE l'ancien dans `manim/sorties/<classe>/maths/pythagore/<NN-…>/` (même nom de fichier ; garde l'ancien à côté en `*.avant-questions.mp4` jusqu'à la passe finale).

⛔ NE COMMITTE RIEN. ⛔ Ne lance jamais la lecture d'une vidéo. ⛔ Pas de miniature, manifeste, R2, YouTube. Écris par morceaux de ≤ 150 lignes. Jamais deux rendus simultanés de ton côté.

## Rapport final COURT
Fichiers touchés, durées avant/après, liste `questions` JSON par vidéo (t "MM:SS" MESURÉ sur le rendu, question, choix, reponse 0/1/2, explication), bords, ce que tu as vu sur les planches, soucis restants.
