# Reprise — refonte Pythagore 4e + 3e avec questions-pauses (état au 31/10/2026 au soir)

## FINI (rien ne tourne)
Les 18 vidéos (8 paires 4e + la paire 3e « gobelet du brevet ») sont refaites avec leurs questions-pauses.
- Questions, voix et temps mesurés : `manim/questions-pythagore.md`. Brief et leçons : `manim/brief-agent-pythagore-questions.md`. Module commun : `manim/scripts/4e/pythagore_pauses.py`.
- Commits : `44aa8790`, `a17f5bdd`, `4e2898ec`, `8a137408`, `5d2b7007`, `d601c047`, `f2f05dec`, passe finale `1a89da9a`. Le manifeste est à jour (questions, durées, chapitres), les mp4 sont remplacés sur R2 et vérifiés (18/18), les feuilles bilan et les fiches YouTube sont regénérées. ⛔ Rien n'est poussé.

## ⏸ YouTube : NE PAS republier
Frédéric : « pas sur YouTube, on verra plus tard ». YouTube garde les anciennes vidéos. Le jour où il le redemandera :
- il publie à la main dans Studio, la paysage avant son short ;
- les QR des devoirs (`app/fiches-exercices/maths/4e/pythagore-theoreme/devoirs/DevoirsClient.tsx`, feuilles déjà imprimées) pointent vers les anciennes vidéos : les garder en ligne en « non répertoriée » ;
- corriger d'abord la numérotation des titres dans le manifeste (carré-racine = ép. 1, reconnaître = ép. 2), puis relancer `python scripts/fiches-youtube.py pythagore`.

## Petits défauts laissés (un nouveau rendu HD à chaque fois, seulement s'il le demande)
- Shorts : la ceinture est affichée seule au lieu de l'échelle entière, et le nœud touche le texte d'accroche.
- Ép. 1 : le titre de fin dit encore « Ce que tu sais faire maintenant ».
- Ép. 7 : la fin dit « Tu as terminé la série » alors que le défi du cube vient après.
- Quelques calculs sont écrits sans être dits (AUDIT-ABSENT / AUDIT-TARD listés dans les rapports).
- Module commun : une phrase de correction longue passe sur Ti Margo quand la question a une figure (contourné dans chaque script) ; les morceaux d'une même ligne ne sont pas alignés en hauteur.

## ⏳ 01/11 : CORRECTIONS en cours (sa demande « corrige-les »)
Brief `manim/brief-agent-pythagore-corrections.md` (`d0379629`). 4 agents lancés depuis la session précédente : ép. 1+2, ép. 3+4, ép. 5+6, ép. 7+8+3e. Les mp4 corrigés remplacent les actuels ; l'ancien est gardé en `*.avant-corrections.mp4`.
Si la session est perdue avant leur fin : regarder quels `*.avant-corrections.mp4` existent (= vidéo refaite), `git status` sur `manim/scripts/4e/pythagore_*`, `manim/scripts/3e/pythagore_solide*`, `manim/voix/*pythagore*` et les marques ; vérifier (bords, une image de question), committer PAR CHEMIN.
Puis passe finale (même méthode que `1a89da9a`) : manifeste (`questions` t, `duree`, chapitres par dry run), R2 (`r2-videos.ps1 -Rclone "copyto …"`, vérif curl -sI = taille locale), `lib/videos/bilans-videos.json`, `python scripts/fiches-youtube.py pythagore`, puis supprimer les `*.avant-corrections.mp4`. ⛔ Rien sur YouTube. Pas de push sans le rituel du soir.

- Short ép. 4 (« À toi ! ») : le « m » de « 100 m » touche la diagonale orange (défaut ancien, vu le 01/11) : à corriger si on re-rend ce short.
- Short ép. 6 (dalle) : l'étiquette « 100 » chevauche la diagonale orange, et le haut de la dalle frôle l'accroche « Le coin est-il droit ? » (vu le 01/11) : à corriger avec le short ép. 4 (même défaut d'étiquette), puis re-rendre ces 2 shorts.

## État au 01/11 ~10 h 30 (session précédente à 60 % de contexte)
- ✅ Corrigés, vérifiés (bords 0, images regardées), commités : ép. 1-2 `5e111477`, ép. 3-4 `9a26ca7c`, ép. 5-6 `adfebb88`, ép. 7-8 (commit « Pythagore ép. 7 et 8 corrigés »).
- ⏳ 3e GOBELET PAS FINI : l'agent s'est bloqué pendant le rendu HD de la paysage. Les mp4 de `manim/sorties/3e/maths/pythagore/01-gobelet-brevet/` sont encore les ANCIENS (même taille que `*.avant-corrections.mp4`). Ses modifications NON commitées et NON vérifiées : `manim/scripts/3e/pythagore_solide.py`, `pythagore_solide_short.py`, `manim/voix/3e-pythagore-solide[-short].json`, `manim/scripts/3e/3e-pythagore-solide[-short].marques.json`. À faire : relire le diff, dry run (AUDIT=1 BORDS=1, 0 alerte), planche basse déf, UN rendu HD par vidéo, `verifier-bords-video.py`, planche finale ; corrections attendues : échelle des ceintures (orange) dans le short, « À toi ! » qui mordait le cornet, non-dits « √64 », « 12² », somme 64 + 1,6 + 1,6 + 0,04.
- ⏳ À re-rendre aussi (défauts vus par moi sur les images) : 
  - ép. 7 paysage : la finale « Ce que tu as appris » garde des « ? » à chaque point (voix `07-finale` et écran) → phrases avec un point, comme les ép. 1-6 ;
  - shorts ép. 4 et ép. 6 : étiquette « 100 m » / « 100 » posée sur la diagonale orange ; short ép. 6 : la dalle frôle l'accroche.
- Phrases de voix ajoutées par les agents : dans leurs rapports, résumées à Frédéric (il les relit).
- PUIS la passe finale (voir plus haut) : manifeste (`questions` : les t ont bougé, `duree`, chapitres), R2, bilans, fiches YouTube, suppression des `*.avant-corrections.mp4`. Les 7 premiers épisodes en local sont donc plus récents que R2.

## ✅ 01/11 ~15 h 40 : CORRECTIONS FINIES
- 3e gobelet : `6b60e8b4` (paysage 5:35, short 1:07). Ép. 3, 4, 7 (finales en phrases avec un point) + shorts ép. 4 et 6 (étiquette de la diagonale, dalle) : `bca9c2a9`.
- Passe finale `cde60612` : manifeste (t, durées, chapitres), R2 18/18 même taille, fiches YouTube regénérées ; feuilles bilan Pythagore inchangées (elles ne lisent ni les t ni le titre de fin). `*.avant-corrections.*` supprimés.
- ⛔ Toujours rien sur YouTube ; rien de poussé (rituel du soir).
