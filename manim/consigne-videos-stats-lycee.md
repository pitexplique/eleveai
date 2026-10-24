# Consigne — VIDÉOS de la série STATISTIQUES, LYCÉE (2de, 1re tronc commun, STMG)

⭐ Lis EN ENTIER, dans cet ordre : `manim/consigne-videos-stats-cycle3.md` (règles de fond, vérifications PyAV, écriture par morceaux ≤ 150 lignes, NE RIEN COMMITTER, ne jamais lire une vidéo, ne pas modifier `manim/canvas_stats.py`, API du module), puis `manim/consigne-videos-stats-cycle4.md` (tu ÉCRIS la voix, épisodes communs, footballeurs, outils de calage), puis `manim/REGLES.md` (sections QUESTIONS-PAUSES, CENTRES D'INTÉRÊT, FICHE YOUTUBE, maths transversales). Ce fichier ne donne que les DIFFÉRENCES. Qualité du cycle 4, pas moins : c'est le lycée, le niveau monte, la clarté reste.

## Modèles
Les épisodes du cycle 4 (`manim/scripts/{5e,4e,3e}/stats_*.py`, sorties `manim/sorties/{5e,4e,3e}/maths/statistiques/`) et, pour le style lycée, la paysage TVI qu'il adore (mémoire « paysage-tvi-modele-qui-plait » : accroche sans formule, situation réelle, rédaction en 4 lignes).

## ⭐⭐ Nouvelles règles du 23-24/10 (OBLIGATOIRES)
1. **Questions-pauses** : chaque paysage a 2 ou 3 écrans « ⏸ Question ! » (3 choix A/B/C, leurres = erreurs typiques de la micro, la voix dit la question puis « Mets pause, et choisis ! », compte à rebours visible 5 s, la bonne réponse s'allume avec UNE phrase), en plus de « À toi de jouer » ; le short en a 1. Note pour chaque vidéo la liste `questions` (t "MM:SS" mesuré sur le rendu, question, choix, reponse 0/1/2, explication) dans ton rapport.
2. **Centres d'intérêt** : avant d'écrire la voix, choisis 1 à 3 centres dans la liste FERMÉE `lib/videos/centres-interet.ts`, pour la tranche 15-18 ans (tous sauf animaux et cuisine) ; varie-les d'un épisode à l'autre ; aide-toi de `manim/centres-interet-par-age.md` (sujets universels, touche locale en variable). Note-les dans ton rapport (`centres`).
3. Données RÉELLES vérifiées par WebSearch (source + date dans l'en-tête du script) ; un métier différent par épisode, filles et garçons ; footballeurs ou autres idoles possibles (chiffres vérifiés).

## Épisodes communs 1re / STMG (une voix, un script, deux rendus)
Même micro dans les deux classes → UNE voix nommée `lycee-stats-<slug>.json` (+ `-short`), UN script dans `manim/scripts/stmg/stats_<slug>.py`, une sous-classe par classe (« Maths 1re — EleveAI » / « Maths STMG — EleveAI », ceinture propre à chaque classe). La voix ne cite aucune classe. Le short est rendu une fois et copié sous les deux noms. Les banques des deux classes font foi (`lib/tutor-v4/questionBank/premiere/maths/information-chiffree.bank.ts` + `automatismes-proportions-stats.bank.ts` ; `lib/tutor-v4/questionBank/stmg/maths/donnees-croisees.bank.ts`, `automatismes-graphiques.bank.ts`, `statistique-deux-variables.bank.ts`).

## Noms et sorties
- 2de : scripts `manim/scripts/seconde/stats_<slug>.py`, classe `Stats<Slug>Seconde`, voix `2de-stats-<slug>.json`, sorties `manim/sorties/seconde/maths/statistiques/<NN>-<slug>/eleveai-maths-seconde-stats-<slug>[-short].mp4`.
- 1re tronc commun : sorties `manim/sorties/premiere-commun/maths/statistiques/<NN>-<slug>/eleveai-maths-premiere-commun-stats-<slug>[-short].mp4`, scripts propres `manim/scripts/premiere/stats_<slug>.py`, classe `Stats<Slug>Premiere`, voix `1re-stats-<slug>.json`.
- STMG : sorties `manim/sorties/stmg/maths/statistiques/<NN>-<slug>/eleveai-maths-stmg-stats-<slug>[-short].mp4`, scripts `manim/scripts/stmg/stats_<slug>.py`, classe `Stats<Slug>Stmg`, voix `stmg-stats-<slug>.json`.
- media_dir : `manim/scripts/<dossier>/media-stats-<slug>[-classe]` (un par rendu).

## Numérotation (micro du coach entre parenthèses ; ⇄ = commun 1re/STMG)
- **2de** (notion statistiques_descriptives) : 01-lire-serie (stat_lire_serie), 02-moyenne (stat_moyenne), 03-moyenne-ponderee, 04-mediane-quartiles, 05-frequence, 06-ecart-interquartile, 07-linearite-moyenne, 08-ecart-type, 09-interpreter.
- **1re** : 01-lire-graphique (auto_stat_lire_graphique ⇄ STMG 01), 02-graphiques-usuels (auto_stat_graphiques_usuels ⇄ STMG 02 auto_stat_diagrammes_usuels), 03-graphique-donnees (auto_stat_graphique_donnees ⇄ STMG 04), 04-tab-lire (info_tab_lire ⇄ STMG 05 don_tab_lire), 05-tab-completer (info_tab_completer ⇄ STMG 07 don_tab_completer), 06-tab-construire (info_tab_construire ⇄ STMG 08 don_tab_dresser), 07-rep-barres, 08-rep-circulaire, 09-rep-choisir, 10-rep-commenter (info_rep_*), 11-nuage-lire (⇄ STMG 18 statT_nuage_lire), 12-nuage-construire (⇄ STMG 17 statT_nuage_representer), 13-nuage-tendance (⇄ STMG 19), 14-filtre-sous-ensemble (⇄ STMG 13 don_filtre_sous_ensemble), 15-filtre-et (⇄ 14), 16-filtre-ou (⇄ 15), 17-filtre-non (⇄ 16), 18-filtre-effectif (info_filtre_effectif).
- **STMG** : 01-lire-graphique ⇄, 02-diagrammes-usuels ⇄, 03-boite (auto_stat_boite), 04-graphique-donnees ⇄, 05-tab-lire ⇄, 06-tab-marges (don_tab_marges), 07-tab-completer ⇄, 08-tab-dresser ⇄, 09-freq-marginale, 10-freq-conditionnelle, 11-freq-completer, 12-freq-interpreter (don_freq_*), 13 à 16 filtres ⇄, 17-nuage-representer ⇄, 18-nuage-lire ⇄, 19-nuage-tendance ⇄, 20-ajust-pertinence, 21-ajust-au-juge, 22-ajust-equation, 23-ajust-calculer (statT_ajust_*), 24-interpoler (statT_interpoler), 25-extrapoler, 26-limites, 27-mc-principe, 28-mc-calculer, 29-mc-comparer (statT_mc_*), 30-cv-appliquer, 31-cv-lire, 32-cv-revenir (statT_cv_*).

## Rapport final (court, en français)
Par épisode : fichiers, durées, décor/métier/source, centres d'intérêt, ceinture(s), la voix paysage EN ENTIER, la liste `questions` (t mesuré), ce que tu as vu sur les planches, soucis restants.
