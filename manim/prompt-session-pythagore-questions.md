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
