Prompt — série PROPORTIONNALITÉ, lot 5 (4e, une paysage par micro) — 01/11/2026

Réponds toujours en français. Ne pose pas de questions : tranche, avance, liste tes choix à la fin.

**Règles** (MEMORY.md) : committer PAR CHEMIN (jamais `git add -A`, jamais `media-*`, `*.cues.tsv` ; ⚠️ `git commit -- <chemins>`) ; push SEULEMENT sur son signal, le soir (`git log origin/main..HEAD --stat`) ; ne jamais lancer la lecture d'une vidéo ; 3 agents à la fois au plus, toujours NEUFS ; changer de session à 60 % ; La Réunion ≈ 4 % des contextes.

## Où on en est
- Lots pilote, 1, 2, 3, 4 FINIS (lot 4 : rendus 11-19 + passe finale `95f38301` ; état détaillé dans `manim/prompt-session-proportionnalite-lot4.md`).
- ⚠️ `manim/manifeste-youtube.json` garde 2 lignes NON commitées d'une autre session (Pythagore `carre-racine` : `url` + `ancienne_url`) : ne pas les embarquer (au besoin, mettre en attente une copie sans elles via `git hash-object -w` + `git update-index --cacheinfo`, comme pour `95f38301`).
- **Lot 5 : les 18 voix sont VALIDÉES par Frédéric le 01/11** (`manim/voix/4e-prop-<slug>.json`). Brief des agents : `manim/brief-agent-proportionnalite-lot5.md`. Tableau des épisodes (micro, décor, centres, faits réels) : section « Lot 5 » en bas de `manim/prompt-session-proportionnalite-lot4.md`.

## À faire
1. Rendus par vagues de 3 agents NEUFS (« lis et applique le brief `manim/brief-agent-proportionnalite-lot5.md` » + sa ligne du tableau) : 20-21-22, puis 23-24-25, 26-27-28, 29-30-31, 32-33-34, 35-36-37.
2. Vérifier chaque épisode TOI-MÊME : `python scripts/verifier-bords-video.py <mp4>` = « 0 instants » ; planche de 12 images (PyAV, outil à recréer dans ton scratchpad) regardée ; zoom sur la correction si un instant semble chargé ; `t` des questions-pauses. Noter la section « 4e NN-slug » dans `manim/questions-proportionnalite.md` (modèle « 4e 17 » à « 4e 19 » : paysage seulement), committer par chemin (script + `*_marques.json` + questions).
3. Changer de session à 60 % : mettre à jour CE fichier avant (épisodes faits, commits).
4. Passe finale du lot 5 par un agent, sur le modèle de `95f38301` (18 paysages, microId = colonne micro du tableau, R2 limité aux clés `eleveai-maths-4e-prop-<slug>` du lot 5 ; vérifier que les JSON ne reçoivent QUE des ajouts).
5. Publier sur YouTube les paysages AVANT leurs shorts (lots 2 à 5).

Ne pousse rien sans le signal du soir de Frédéric.
