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
