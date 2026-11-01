Prompt — série PROPORTIONNALITÉ, lot 5 (4e, une paysage par micro) — 01/11/2026

Réponds toujours en français. Ne pose pas de questions : tranche, avance, liste tes choix à la fin.

**Règles** (MEMORY.md) : committer PAR CHEMIN (jamais `git add -A`, jamais `media-*`, `*.cues.tsv` ; ⚠️ `git commit -- <chemins>`) ; push SEULEMENT sur son signal, le soir (`git log origin/main..HEAD --stat`) ; ne jamais lancer la lecture d'une vidéo ; 3 agents à la fois au plus, toujours NEUFS ; changer de session à 60 % ; La Réunion ≈ 4 % des contextes.

## Où on en est
- Lots pilote, 1, 2, 3, 4 FINIS (lot 4 : rendus 11-19 + passe finale `95f38301` ; état détaillé dans `manim/prompt-session-proportionnalite-lot4.md`).
- ⚠️ `manim/manifeste-youtube.json` garde 2 lignes NON commitées d'une autre session (Pythagore `carre-racine` : `url` + `ancienne_url`) : ne pas les embarquer (au besoin, mettre en attente une copie sans elles via `git hash-object -w` + `git update-index --cacheinfo`, comme pour `95f38301`).
- **Lot 5 : les 18 voix sont VALIDÉES par Frédéric le 01/11** (`manim/voix/4e-prop-<slug>.json`). Brief des agents : `manim/brief-agent-proportionnalite-lot5.md`. Tableau des épisodes (micro, décor, centres, faits réels) : section « Lot 5 » en bas de `manim/prompt-session-proportionnalite-lot4.md`.

- **Rendus faits (01/11)** : 20 reconnaitre et 21 tableau (`36763eae`), 22 graphique (`055c54ad`), 23 coefficient (`2d42d9d2`), 24 quatrieme (`420411f1`), 25 probleme (`5f24b177`), 26 relation (`35397944`), 27 defi (`e5d11a99`), 28 ratio-ecrire (`a5c74dad`), 29 ratio-quotients (`5da64c33`), 30 ratio-trois (`4994e233`), 31 ratio-partager (`760a1309`) — vérifiés (bords 0, planche), section « 4e NN » dans `manim/questions-proportionnalite.md`, committés. En cours au moment de cette note : 32 ratio-defi, 33 pourcentage-calculer, 34 pourcentage-mental (agents lancés ; s'ils n'ont rien laissé dans `manim/sorties/4e/maths/proportionnalite/NN-*/`, relancer ; sinon vérifier le mp4, noter, committer).
- ⚠️ CENTRES : le champ `centres` ne prend que les 18 centres ; les précisions du tableau se ramènent au parent (`PRECISIONS_CENTRE` de `lib/videos/centres-interet.ts`) : animaux-marins → animaux, football/basket/tennis → sport, mode/dessin-manga → art-design, rap → musique, voitures-motos → transports ; `construction` (sous jeux-video) écartée. Note en fin de section « 4e 25 ».
- Agents : 2 sur 3 de la première vague se sont FIGÉS (watchdog 600 s) ; la consigne « petits pas, commandes longues en arrière-plan » dans la mission a suffi ensuite. Mission type d'un agent : « lis et applique le brief… » + la ligne du tableau + centres ramenés au parent + fichier script/classe/sortie/media_dir + modèles du lot 5 les plus proches + « ne touche pas à prop_pourcentages.py / prop_ratio.py ni aux fichiers des agents voisins » + « petits pas, commandes longues en arrière-plan ». Outil planche : `planche.py` (PyAV, 12 images en 3 colonnes) dans le scratchpad, à recréer.

## À faire
1. Rendus (3 agents NEUFS à la fois, on relance dès qu'un finit) — reste : 35 à 37 (+ 32-34 s'ils ne sont pas committés) ; (« lis et applique le brief `manim/brief-agent-proportionnalite-lot5.md` » + sa ligne du tableau) : 20-21-22, puis 23-24-25, 26-27-28, 29-30-31, 32-33-34, 35-36-37.
2. Vérifier chaque épisode TOI-MÊME : `python scripts/verifier-bords-video.py <mp4>` = « 0 instants » ; planche de 12 images (PyAV, outil à recréer dans ton scratchpad) regardée ; zoom sur la correction si un instant semble chargé ; `t` des questions-pauses. Noter la section « 4e NN-slug » dans `manim/questions-proportionnalite.md` (modèle « 4e 17 » à « 4e 19 » : paysage seulement), committer par chemin (script + `*_marques.json` + questions).
3. Changer de session à 60 % : mettre à jour CE fichier avant (épisodes faits, commits).
4. Passe finale du lot 5 par un agent, sur le modèle de `95f38301` (18 paysages, microId = colonne micro du tableau, R2 limité aux clés `eleveai-maths-4e-prop-<slug>` du lot 5 ; vérifier que les JSON ne reçoivent QUE des ajouts).
5. Publier sur YouTube les paysages AVANT leurs shorts (lots 2 à 5).

Ne pousse rien sans le signal du soir de Frédéric.
