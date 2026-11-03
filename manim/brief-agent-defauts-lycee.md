# Brief — reprise des DÉFAUTS MINEURS, proportionnalité LYCÉE (03/11/2026)

Réponds en français. Dépôt C:\Users\FRED\Documents\eleveai (Windows ; Git Bash et PowerShell). D'autres agents et sessions travaillent en même temps : ne touche qu'aux scripts de TES épisodes ; outils temporaires dans un sous-dossier à ton nom du dossier temporaire. Commandes longues (dry run, rendus) en ARRIÈRE-PLAN.

Les 9 épisodes sont finis, publiés sur R2 et au manifeste. Frédéric veut qu'on reprenne TOUS les défauts, même mineurs (il montre ces vidéos à ses élèves). Lis d'abord `manim/brief-agent-proportionnalite-lycee.md` (règles du lot, noms, ordre, épisodes communs `GARDE_SEULE=1` + `frac_cm_commun.py coller`, short rendu une fois puis copié sous chaque nom) et la section LYCÉE de `manim/questions-proportionnalite.md`.

## ⛔ Contrainte n°1 : les TEMPS ne bougent pas
Chapitres et questions-pauses sont déjà au manifeste et au coach. Ne change NI la voix, NI les marques, NI aucune durée (`run_time`, `wait`). Tu ne modifies que des tailles, positions, couleurs, ordres d'apparition À L'INTÉRIEUR des mêmes durées. Après rendu, la durée du mp4 doit rester celle d'avant (± 0,1 s) et le début de chaque écran « Question ! » le même (± 0,5 s) : mesure-le et écris-le dans ton rapport.

## Ordre pour chaque épisode
corrections → `AUDIT=1 BORDS=1 python -m manim render --dry_run …` (0 AUDIT-AVANCE, 0 RETARD, 0 BORD) → planche basse déf. regardée → UN rendu HD (`PYTHONIOENCODING=utf-8`) → sorties remplacées (mêmes noms ; épisodes communs : garde seule + `coller` pour chaque autre classe ; short copié sous chaque nom) → `python scripts/verifier-bords-video.py <mp4>` = « 0 instants » pour CHAQUE mp4 → planche HD regardée sur les écrans corrigés (zoom).

## Défauts à corriger
En plus de ceux-ci : toute phrase de réponse / explication des questions-pauses en taille ≥ 34 en paysage (≥ 28 en short), lisible depuis le fond d'une classe ; tout énoncé de question en ≥ 34. Si tu vois un autre défaut sur tes planches, corrige-le aussi.
- **2de 01 proportion** (`manim/scripts/seconde/prop_lycee_proportion[_short].py`) : textes des questions petits ; l'énoncé de la question 2 écrit « 4,4 Mha » alors que la figure dit « forêt publique » → mettre les deux d'accord (figure : « forêt publique : 4,4 Mha »).
- **1re 04 partie-tout** (`premiere/prop_lycee_partie_tout*`) : l'étiquette « 720 N » disparaît pendant la rotation de la station (elle doit rester visible) ; texte de la question 2 petit.
- **01 calculer, COMMUN 1re + STMG** (`premiere/prop_lycee_calculer*`) : explications sous les choix petites ; les pointillés traversent l'étiquette « 67,1 % ».
- **02 formes, COMMUN 1re + STMG** (`premiere/prop_lycee_formes*`) : des étiquettes réaffichent un nombre déjà dit bien avant (AUDIT-TARD) → les faire apparaître au mot ; textes des questions.
- **03 appliquer, COMMUN 1re + STMG** (`premiere/prop_lycee_appliquer*`) : phrase de réponse verte petite.
- **1re 05 tout-partie** (`premiere/prop_lycee_tout_partie*`) : short, étiquettes « 30 % » / « 20 % » qui débordent de leurs tranches ; pendant la question du short, l'écran n'a que du texte → ajouter la barre de batterie (25 %) en petit, sans réponse.
- **STMG 05 nature-pourcentage** (`stmg/prop_lycee_nature_pourcentage*`) : short, la loupe passe sur l'étiquette « 11 % » ; paysage, « Ce que tu as appris » : figure de gauche trop petite ; libellé « et pourtant sa part a baissé ! » du piège réduit (le passer sur deux lignes en taille normale) ; short, « Source : Fevad, 2024 » trop près de l'étiquette « 2024 ».
- **STMG 06 taux-equivalent** (`stmg/prop_lycee_taux_equivalent*`) : les numéros de mois disparaissent quand les cases s'animent (les garder au-dessus) ; explications des questions en taille 30 → ≥ 34 ; le mot « chaque » de « × 1,0025 chaque mois » s'affiche 2,7 s après la voix (le faire apparaître au mot).
- **Pourcentage de pourcentage, COMMUN 2de + 1re + STMG** (`premiere/prop_lycee_pourcentage_de_pourcentage*`) : lignes de calcul trop serrées (plus d'interligne) ; écran « Correction » : « Deux : » arrive seul, vérifier l'équilibre.

⛔ NE COMMITTE RIEN. ⛔ Ne lance jamais la lecture d'une vidéo. ⛔ Pas de miniature, manifeste, R2. Jamais deux rendus simultanés de ton côté.

## Rapport final COURT
Par épisode : ce qui est corrigé, durées avant/après, débuts des « Question ! » avant/après, bords (chaque mp4), ce que tu as vu sur les planches, ce qui reste.
