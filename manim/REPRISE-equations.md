# Reprise : série ÉQUATIONS 4e (05/11/2026)

À lire d'abord : `manim/brief-agent-equations.md` (noms, ceintures, dessins, 2 places de rendu HD, jamais sous 2 Go libres). Rapports des agents : `manim/rapports-equations.md`.

## Fait
- Coach au vert, committé `ec481245` : 0 question open, 0 contexte à ★1-★2, squelettes et correcteurs justes.
- 14 voix VALIDÉES par Frédéric le 05/11, committées `2249911b` (`manim/voix/4e-equation-*.json`). Ne pas les changer.
- Pilote lancé : épisode 01 `reconnaitre` + module `manim/scripts/4e/equation_commun.py`. Fini = section dans `manim/rapports-equations.md` + 2 mp4 dans `manim/sorties/4e/maths/equations/01-reconnaitre/` + places de rendu libres. Si plus aucun fichier ne bouge pendant 30 min, l'agent est figé : relancer depuis ses scripts.

- Les 14 vidéos sont rendues ; relecture faite : aucun bloquant, défauts mineurs listés dans `manim/defauts-equations.md`. Fins de voix gardées : voix validées avant la règle du 05/11.

- 06/11 : défauts de la liste corrigés sur les 7 épisodes, dernière relecture faite, derniers défauts de la paysage 01 corrigés (rendue à 03:59, sur l'aperçu port 3900). Shorts `resoudre-simple`, `verifier` et `defi` non re-rendus : aucun défaut.
- Non vérifié par les relecteurs (images seulement) : le son, et les défauts brefs entre deux images. Frédéric n'a pas encore écouté.

## État final (06/11, passe finale des 16 vidéos)
- Miniatures (`manim/miniature_equations.py`, 16 PNG regardés) et vignettes faites, fiches YouTube écrites.
- Manifeste : 16 entrées `4e-equation-<slug>[-short]` ajoutées (`4e-equation-resolution` et `eq-probleme` intacts). Temps relevés dans l'audio de chaque mp4 (corrélation avec les WAV) : ils priment sur `rapports-equations.md`. Différences : chapitre et question 1 de la paysage 02 à 01:01, chapitres 05 à 01:34, 07 à 01:28 et 02:58, 08 à 01:02. Retirés car ils duraient moins de 10 s : le titre de 00:00 (le chapitre d'après démarre à 00:00), « Le piège » de la 01, « Deux routes » de la 05 (noms fusionnés dans le chapitre d'avant).
- R2 : 48 fichiers envoyés (16 mp4, 16 png, 16 webp), à blanc = 0 restant. Table et bilans à jour.
- Coupe de fin de l'épisode 08 dans `components/LecteurVideo.tsx` : paysage 8,6 s, short 4,7 s. Dans le WAV du short, « f r. » s'enchaîne sans pause sur « Mets un pouce » (fin de mot vers 2,32 s, trouvée par comparaison avec le WAV de la paysage) : le lecteur vérifie 4 fois par seconde, on peut donc entendre le début de « Mets ». Non essayé dans un navigateur.
- ⛔ COACH PAS ÉCRIT : juste après le push du soir, `node scripts/brancher-videos-coach.mjs --id <les 16 id> --ecrire` (lecture du 06/11 : 16 lignes, aucune micro occupée, aucun refus). Avant le push, les boutons mèneraient à un 404.

## Reste
1. Écoute par Frédéric. Pour les retours : un agent neuf par épisode, 2 à la fois au plus.
2. Push : il se propose le soir, puis branchement du coach (`--ecrire`, voir ci-dessus).
3. YouTube : paysage AVANT son short.

## En attente de Frédéric
- Écoute des 16 vidéos, épisode 08 compris (`equation_probleme`, Yanis garde forestier, voix validées le 06/11, rendu fait : paysage 5:08, short 1:14). Il a la NOUVELLE fin (9,74 s en paysage, 6,04 s en short) : coupe recalée pour ces deux vidéos (voir « État final »).
- Ne pas toucher : `manim/scripts/4e/puissance_*`, `manim/rapports-puissances.md`, banques 4e `divisibilite`, `factorisation`, `fractions`, `operations-relatifs`, `probabilites`.
