# Brief commun — corrections des vidéos Pythagore (01/11/2026)

Réponds en français. Dépôt C:\Users\FRED\Documents\eleveai (Windows ; Git Bash et PowerShell). D'autres agents corrigent d'autres épisodes en même temps : ne touche qu'à TES fichiers ; outils temporaires dans un sous-dossier à ton nom du dossier temporaire.

Les 18 vidéos Pythagore ont été refaites le 31/10 avec questions-pauses (lis `manim/brief-agent-pythagore-questions.md`, ses « Leçons du pilote », et `manim/questions-pythagore.md`). Frédéric demande maintenant de corriger les défauts restants. ⛔ Ne modifie pas `manim/scripts/4e/pythagore_pauses.py` (si un défaut vient de lui, contourne-le dans TON script et signale-le).

## Les corrections
1. **Ceinture des SHORTS = l'ÉCHELLE ENTIÈRE** (REGLES.md l. 78, Frédéric 13/10 : « affiche l'ordre des ceintures pour que l'élève sache où se situe la sienne ») : `echelle_ceintures("<couleur>").scale_to_fit_width(config.frame_width * 0.7)` (de `scripts/seconde/signes_expression_2de.py`) sous le titre, à la place du badge seul. Elle ne doit toucher ni le titre, ni l'accroche, ni la figure (aujourd'hui le nœud touche l'accroche). Couleurs inchangées (shorts 4e blanche, short défi orange, short 3e orange).
2. **Voix = écrit, synchro** (REGLES.md « SYNCHRO VOIX / ÉCRIT ») : lance `AUDIT=1 BORDS=1 … --dry_run` et supprime TOUS les `AUDIT-ABSENT` (écrit jamais dit) et tous les `AUDIT-TARD` de plus de 0,4 s. Pour chacun, choisis : soit la voix le dit (quelques mots ajoutés à la clé existante, si l'écrit aide à comprendre : ex. « côté = √25 = 5 » → la voix dit « racine carrée de 25 : 5 »), soit l'écrit disparaît ou paraît au mot. Un titre d'écran court (« Étape 1 ») peut rester s'il est dit ou s'il est purement un titre : dis-le dans le rapport. Les exclusions déjà admises (exposants, « Maths 4e », « @eleveai974 ») restent.
3. Corrections propres à certains épisodes : voir ta mission.

## Voix
Regénère seulement les clés changées, même voix et même débit (Julie −7, hauteur 6 : regarde comment les agents du 31/10 ont fait, `scripts/marques_dump.ps1` + `scripts/cues2marques.py` pour les marques). Liste dans ton rapport chaque phrase de voix ajoutée ou changée, mot pour mot (Frédéric la relira).

## Ordre obligatoire, par vidéo
voix + marques → dry run (0 AUDIT-AVANCE, 0 RETARD, 0 BORD, 0 AUDIT-ABSENT, 0 AUDIT-TARD > 0,4 s) → planche basse déf de 8 images REGARDÉE → UN SEUL rendu HD (`PYTHONIOENCODING=utf-8`, `--disable_caching`) → `python scripts/verifier-bords-video.py <mp4>` = « 0 instants » → planche finale de 12 images regardée (ceinture, questions, fin).
Le nouveau mp4 remplace l'actuel dans `manim/sorties/…/pythagore/<NN-…>/` (même nom ; garde l'actuel en `*.avant-corrections.mp4`).

⛔ NE COMMITTE RIEN. ⛔ Ne lance jamais la lecture d'une vidéo. ⛔ Pas de manifeste, R2, miniature, YouTube. Morceaux de ≤ 150 lignes. Jamais deux rendus simultanés de ton côté.

## Rapport final COURT
Fichiers touchés ; pour chaque vidéo : durée avant/après, nouveaux `t` des questions (MM:SS mesurés au rendu HD), résultat de l'audit et des bords ; phrases de voix ajoutées/changées mot pour mot ; soucis restants.
