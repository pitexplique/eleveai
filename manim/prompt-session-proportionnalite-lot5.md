Prompt — série PROPORTIONNALITÉ, lot 5 (4e, une paysage par micro) — 01/11/2026

Réponds toujours en français. Ne pose pas de questions : tranche, avance, liste tes choix à la fin.

**Règles** (MEMORY.md) : committer PAR CHEMIN (jamais `git add -A`, jamais `media-*`, `*.cues.tsv` ; ⚠️ `git commit -- <chemins>`) ; push SEULEMENT sur son signal, le soir (`git log origin/main..HEAD --stat`) ; ne jamais lancer la lecture d'une vidéo ; 3 agents à la fois au plus, toujours NEUFS ; changer de session à 60 % ; La Réunion ≈ 4 % des contextes.

## Où on en est
- Lots pilote, 1, 2, 3, 4 FINIS (lot 4 : rendus 11-19 + passe finale `95f38301` ; état détaillé dans `manim/prompt-session-proportionnalite-lot4.md`).
- ⚠️ `manim/manifeste-youtube.json` garde 2 lignes NON commitées d'une autre session (Pythagore `carre-racine` : `url` + `ancienne_url`) : ne pas les embarquer (au besoin, mettre en attente une copie sans elles via `git hash-object -w` + `git update-index --cacheinfo`, comme pour `95f38301`).
- **Lot 5 : les 18 voix sont VALIDÉES par Frédéric le 01/11** (`manim/voix/4e-prop-<slug>.json`). Brief des agents : `manim/brief-agent-proportionnalite-lot5.md`. Tableau des épisodes (micro, décor, centres, faits réels) : section « Lot 5 » en bas de `manim/prompt-session-proportionnalite-lot4.md`.

- **Rendus 20 → 37 FINIS (01/11)** : 20-21 `36763eae`, 22 `055c54ad`, 23 `2d42d9d2`, 24 `420411f1`, 25 `5f24b177`, 26 `35397944`, 27 `e5d11a99`, 28 `a5c74dad`, 29 `5da64c33`, 30 `4994e233`, 31 `760a1309`, 32 `16f68d76`, 33 `36074f28`, 34 `328e322d`, 35 `03ed312d`, 36 `dbf2efda`, 37 `8158e387` — tous vérifiés (bords 0, planche + zooms), section « 4e NN » dans `manim/questions-proportionnalite.md`. Les frôlements vus à la vérif. de 33, 34, 35 et 37 ont été corrigés et le rendu HD refait (cadres de mise en valeur contre le mot voisin, coche contre le texte d'un choix long).
- **Passe finale du lot 5 : LANCÉE le 01/11 (agent)**, rapport attendu dans `C:/Users/FRED/AppData/Local/Claude-Data/claude_pzs8sxrjxfjjc/side-session-notes/local_504ef5d5-8cbc-4554-b0bd-e4079732e2c6/rapport-passe-finale-lot5.md`. Si elle n'est pas committée (`git log --oneline | grep "lot 5"`), la relancer (agent NEUF, modèle `95f38301`).
- Convertisseur de marques à seuil 0,5 s (pourcentages répétés) : `C:/Users/FRED/AppData/Local/Claude-Data/claude_pzs8sxrjxfjjc/side-session-notes/local_504ef5d5-8cbc-4554-b0bd-e4079732e2c6/cues2marques_gap.py`.
- ⚠️ CENTRES : le champ `centres` ne prend que les 18 centres ; les précisions du tableau se ramènent au parent (`PRECISIONS_CENTRE` de `lib/videos/centres-interet.ts`) : animaux-marins → animaux, football/basket/tennis → sport, mode/dessin-manga → art-design, rap → musique, voitures-motos → transports ; `construction` (sous jeux-video) écartée. Note en fin de section « 4e 25 ».
- Agents : 2 sur 3 de la première vague se sont FIGÉS (watchdog 600 s) ; la consigne « petits pas, commandes longues en arrière-plan » dans la mission a suffi ensuite. Mission type d'un agent : « lis et applique le brief… » + la ligne du tableau + centres ramenés au parent + fichier script/classe/sortie/media_dir + modèles du lot 5 les plus proches + « ne touche pas à prop_pourcentages.py / prop_ratio.py ni aux fichiers des agents voisins » + « petits pas, commandes longues en arrière-plan ». Outil planche : `planche.py` (PyAV, 12 images en 3 colonnes) dans le scratchpad, à recréer.

## À faire
1. ✅ Rendus 20 → 37 (01/11).
2. Passe finale du lot 5 : vérifier le commit de l'agent (JSON en AJOUTS seulement, 18/18 sur R2, microId = colonne micro, lignes Pythagore des autres sessions NON embarquées dans `manim/manifeste-youtube.json`).
3. Publier sur YouTube les paysages AVANT leurs shorts (lots 2 à 5).

Ne pousse rien sans le signal du soir de Frédéric.
