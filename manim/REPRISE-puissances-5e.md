# Reprise : série CARRÉ ET CUBE 5e (notion `puissance_simple`, 08/11/2026)

Notion du coach de 5e `puissance_simple` (`lib/tutor-v4/questionBank/5e/maths/puissance-simple.bank.ts`, programme de cycle 4 en vigueur en 5e depuis 2026), 5 micros. Une paysage Manim et un short en dessin animé Ti Margo par micro : **10 vidéos**. Carte blanche de Frédéric : voix écrites et lancées sans relecture à deux (à lui faire écouter).

Consigne des agents (chaîne, noms, modèles, interdits) : `manim/BRIEF-puissances-5e.md`.

## Épisodes

| NN | slug | micro | ceinture paysage | ceinture short | centres | métier (paysage) | short |
|---|---|---|---|---|---|---|---|
| 01 | notation | puissance_simple_notation | blanche | blanche | jeux-video, jeux-defis | Lucas, créateur de jeux vidéo | Les dés empilés en cube |
| 02 | valeurs | puissance_simple_valeurs | blanche | blanche | cuisine | Karim, chef pâtissier | Les dalles en carré, bordure par bordure |
| 03 | ecrire | puissance_simple_ecrire | jaune | jaune | musique, art-design | Sarah, éclairagiste | La fête des lanternes |
| 04 | calculer | puissance_simple_calculer | jaune | jaune | animaux, nature-ecologie | Inès, soigneuse dans un zoo | Le stand de fête foraine |
| 05 | litteral | puissance_simple_litteral | jaune | jaune | espace, sciences | Clara, ingénieure spatiale | La machine à carrés |

Aucun contexte réunionnais (règle des 4 %). Exposants : carré et cube seulement, rien de la 4e.
Réponses des questions en commentaire : 01 64 = 4³ ; 02 121 ; 03 49 = 7², 27 = 3³ ; 04 92 ; 05 200.

## Fichiers
- Voix : `manim/voix/5e-puissance-<slug>[-short].json` (commit `ce3acf6f`).
- Paysages : `manim/scripts/5e/puissance_simple_<slug>.py` (+ `_marques.json`), classes `PuissanceSimple<Slug>5e`.
- Shorts : `prototypes/ti-margo/films/puissances-5e.json`, `puissances-5e.js`, `puissances-5e-<slug>.js`, `puissances-5e-cues.js`.
- Sorties : `manim/sorties/5e/maths/puissance-simple/NN-<slug>/eleveai-maths-5e-puissance-<slug>[-short].mp4`, miniatures, `publication.md` du short (`Validé : non`).
- Passe finale : `manim/miniature_puissances_5e.py` (miniatures des paysages), `manim/passe_puissances_5e.py` (`temps`, puis `manifeste` : 10 entrées en AJOUT, `pas_avant: 2026-12-01`).

## État au 08/11 (passage de main, session à 67 % de contexte)
- 5 agents lancés (un par épisode, paysage puis short) sur `manim/BRIEF-puissances-5e.md`. Chacun committe PAR CHEMIN ses fichiers (script, marques, film, cues, publication.md) et écrit son rapport dans le dossier de notes de la session mère : `C:/Users/FRED/AppData/Local/Claude-Data/claude_pzs8sxrjxfjjc/side-session-notes/local_648c2a45-f9e1-4258-b678-117b00718a34/puissances-5e-NN.md` (questions, chapitres, coupes de fin, défauts).
- Au passage : short 01 rendu et contrôlé (65,1 s) ; paysage 05 dry run propre, brouillon en cours ; 01, 02, 03 en dry run ou rendu ; 04 sans nouvelles. Fini = mp4 dans la sortie + rapport `puissances-5e-NN.md` + commit. Si plus rien ne bouge pendant 30 min dans un épisode : le reprendre soi-même depuis son script.
- Outils prêts, NON committés : `manim/miniature_puissances_5e.py`, `manim/passe_puissances_5e.py` (round-trip du manifeste vérifié identique), cette note.

## Reste, dans l'ordre
1. Relire soi-même les planches des 10 vidéos (paysage : `ffmpeg … fps=1/8,tile` ; short : `python scripts/ti-margo-planche.py`), corriger tout défaut mineur, re-rendre.
2. `python manim/miniature_puissances_5e.py` (puis les regarder), `python scripts/vignettes-videos.py`.
3. `python manim/passe_puissances_5e.py temps`, vérifier les questions et chapitres contre les rapports des agents, puis `python manim/passe_puissances_5e.py manifeste`. `python scripts/fiches-youtube.py 5e-puissance`.
4. `COUPE_PAR_VIDEO` dans `components/LecteurVideo.tsx` : 10 lignes (paysage ≈ 8,4 s après « point f r », short = « Mets » + 0,03 s), valeurs des rapports.
5. R2 : `.\scripts\r2-videos.ps1 -Rclone "copy manim/sorties/5e/maths/puissance-simple R2:5e/maths/puissance-simple …"` (PAS `-Envoyer`, il pousserait les chantiers des autres), à blanc d'abord ; `node scripts/generer-videos-r2.mjs`.
6. Coach : `node scripts/brancher-videos-coach.mjs --id <les 10 ids>` en lecture ; `--ecrire` (PRODUCTION) seulement après le push du soir, sur l'ordre de Frédéric (avant le push, /video/<id> donne 404, et la notion 5e elle-même n'est pas poussée).
7. Commits PAR CHEMIN ; manifeste et `videos-r2.json` = blob `git show HEAD:` + nos entrées seulement (`git hash-object -w` + `git update-index --cacheinfo`), voir la mémoire du manifeste. Pas de push, rien sur YouTube (`pas_avant: 2026-12-01`, `Validé : non`).
8. Rapport final en français à la session mère (`local_648c2a45-…`).
