Tu reprends la fin de la série vidéo STATISTIQUES du lycée d'EleveAI. Réponds toujours en français. Ne me pose pas de questions : tranche, avance, et liste tes choix à la fin.

Règles de travail :
- Pas de push sans mon signal (1 à 2 pushs par jour au maximum, le soir).
- Committe PAR CHEMIN : jamais `git add -A`, jamais les dossiers `manim/scripts/*/media-*`.
- La story Instagram n'est jamais poussée.
- Ne lance jamais la lecture d'une vidéo.
- La qualité passe avant tout.
- Les clés R2 sont dans `.env.local` : ne les affiche jamais.

À LIRE d'abord :
- `manim/consigne-videos-stats-lycee.md`, avec les règles et la numérotation ;
- `manim/REGLES.md` ;
- `manim/questions-stats-lycee.md`, qui donne les centres et les questions-pauses déjà relevés, à reporter au manifeste ;
- la mémoire `serie-statistiques-prochaine-notion.md`.

## État au 24/10 (fin de la session précédente)
FAITS, rendus et vérifiés (bords à 0) :
- 2de 01 à 05 : paysages et shorts.
- 1re/STMG, épisodes communs : lire-graphique, graphiques-usuels/diagrammes-usuels, graphique-donnees, tab-lire, tab-completer, tab-construire/tab-dresser, nuage-lire, nuage-construire/representer, nuage-tendance, filtres sous-ensemble/et/ou/non.
- Ce sont 62 mp4 dans `manim/sorties/{seconde,premiere-commun,stmg}/maths/statistiques/`.
- Coach STMG : le nuage n'est plus relié par une ligne (commit 4ea94019, pas poussé).

EN COURS dans l'ancienne session (agents en arrière-plan, qui ont peut-être fini) :
- G2 : 2de 06-ecart-interquartile, 07-linearite-moyenne, 08-ecart-type, 09-interpreter.
- I1 : 1re 07-10 rep-barres/circulaire/choisir/commenter et 18-filtre-effectif ; STMG 03-boite et 06-tab-marges.
- I2 : STMG 09-12 freq-marginale/conditionnelle/completer/interpreter.

Vérifie sur le disque ce qui existe (mp4 paysage et short dans chaque dossier). Lance `python scripts/verifier-bords-video.py <mp4>` sur chacun ; il doit afficher « 0 instants ». Fais des planches PyAV de 12 images et regarde-les. S'il manque quelque chose, ou si un rendu est cassé, relance un agent pour ce morceau seulement. Vérifie d'abord avec `tasklist` qu'aucun rendu manim ne tourne encore.

## À FAIRE ensuite (3 agents en parallèle au maximum)
- **J1** : STMG 20-ajust-pertinence, 21-ajust-au-juge, 22-ajust-equation, 23-ajust-calculer, 24-interpoler, 25-extrapoler, 26-limites.
- **J2** : STMG 27-mc-principe, 28-mc-calculer, 29-mc-comparer, 30-cv-appliquer, 31-cv-lire, 32-cv-revenir.

Donne à chaque agent le même brief que les lots précédents :
- **Lectures et modèles** : il lit la consigne lycée et `REGLES.md`. Ses modèles sont `manim/scripts/stmg/stats_nuage_*.py`, `stats_lycee_h1_commun.py` et `stats_lycee_h2_commun.py`, à importer sans les modifier.
- **Voix** : débit −7.
- **Questions-pauses** : 2 ou 3 par paysage (compte à rebours de 5 s), 1 par short (3 s).
- **Centres d'intérêt** : 1 à 3 par épisode, pris dans `lib/videos/centres-interet.ts`, ni animaux ni cuisine.
- **Données et métiers** : des données réelles, vérifiées par WebSearch, avec la source dans l'en-tête du script. Un métier différent par épisode, en alternant filles et garçons. Décors déjà pris, à éviter : la liste est dans `questions-stats-lycee.md`, plus Pesquet, Wembanyama, Stromae et 1789.
- **Mise en page** : « Ce que tu as appris » en haut et centré. Marge de 3 % sur les quatre côtés. Ne pas toucher à l'écran de fin.
- **Short** : il finit par une question à laquelle répondre en commentaire.
- **Interdits** : ne rien committer, ne lire aucune vidéo, ne pas modifier `canvas_stats.py`.
- **Rapport** : par épisode, la voix en entier, les centres, et les questions avec les temps mesurés.

Banques du coach : `lib/tutor-v4/questionBank/stmg/maths/statistique-deux-variables.bank.ts`.

## PASSE FINALE (toi, quand tout est rendu)
1. **Miniatures** : `manim/miniature_essai_v2.py` (paysage « COMPRENDRE X EN N MIN ») et `manim/miniature_short_expression.py`, avec l'échelle des ceintures entière.
2. **Manifeste** : une entrée par vidéo dans `manim/manifeste-youtube.json`. Imite les entrées stats du cycle 4 : id, fichier, miniature, titre, accroche, chapitres, tags, micro, série. Ajoute les champs `questions` et `centres` en prenant `questions-stats-lycee.md` ; pour G2, I1 et I2, relève-les dans leurs voix et scripts.
3. **Fiches YouTube** : `python scripts/fiches-youtube.py -stats-`.
4. **Vignettes, puis R2** : `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/r2-videos.ps1 -Envoyer`, lancé depuis Bash, avec la sortie redirigée vers un log. Jamais `2>&1` dans PowerShell. Puis `node scripts/generer-videos-r2.mjs`.
5. **Coach** : `node scripts/brancher-videos-coach.mjs --id <ids stats lycée> --ecrire`. Ajoute `--remplacer` si une micro est occupée par une vieille vidéo.
6. **Commit par chemin**, sans pousser : scripts, voix, `public/sons/*stats*` (si suivi), `manifeste-youtube.json`, `manim/questions-stats-lycee.md` et le JSON des vidéos R2.

## Mesure de consommation (demandée par Frédéric)
- Départ : 24/10 à 08 h 27, quota hebdo à 0 %, contexte de session à 55 %.
- Tokens des sous-agents déjà comptés : 183 520 (correctif du coach STMG), G1 ≈ 1 010 000, H1 ≈ 585 000, H2 ≈ 807 000.
- À la fin des vidéos lycée : note le quota hebdomadaire et additionne les tokens de tous les sous-agents.

## Après la série
Remplir les matrices pays : Ontario, Québec, USA, Maroc, puis Belgique, Côte d'Ivoire et Sénégal (mémoire `matrice-multi-pays.md`).
