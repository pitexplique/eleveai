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

## État au 08/11 à 09:40 : SÉRIE FINIE (10 vidéos relues, sur R2, au manifeste)
| NN | paysage | short | coupe paysage / short |
|---|---|---|---|
| 01 notation | 191,9 s | 65,1 s | 8,4 / 4,17 |
| 02 valeurs | 212,4 s | 74,4 s | 8,4 / 4,16 |
| 03 ecrire | 202,2 s | 71,3 s | 8,4 / 4,17 |
| 04 calculer | 193,9 s | 67,6 s | 8,4 / 4,17 |
| 05 litteral | 178,9 s | 66,5 s | 8,4 / 4,18 |

- Commits des agents : `24118f76` (01), `0df87f6f` (02), `a445ca3d` (03), `11cc6a20` (04), `e757335a` (05) ; relecture des paysages `b2a14f99` ; shorts relus `8d620f03` ; passe finale (manifeste, `videos-r2.json`, coupes, cette note) : commit suivant.
- Toutes les planches HD regardées, `verifier-bords-video.py` = 0 sur les 5 paysages, aucun chapitre de moins de 10 s.
- Corrigés à la relecture : interlignes (01), colonnes trop étroites (02), « 52 m² » collé au cadre (04), c² bleu sur bleu (05) ; short 03 : bords, lanternes coupées en haut, chiffres 8/4 rognés (police plus grande que sa toile) ; short 05 : jetons rognés ; miniatures des shorts 01, 03, 05.
- ⚠️ Le piège des chiffres rognés : `ecran3d(l, h)` a une toile de l×256 px ; une police fixe de 150-200 px y déborde. Toujours `Math.round(h*0.85)`.
- Coupe paysage : la fin de `page_abonnement` est identique partout (pause après « point f r » de 8,64 à 7,72 s avant la fin) → 8,4 s, comme les Relatifs (le 8,99 du rapport 05 coupait le « f r »).
- R2 : `5e/maths/puissance-simple/` envoyé (35 fichiers, 183 Mo), `videos-r2.json` régénéré (10 entrées).
- Manifeste : 10 entrées en AJOUT, `pas_avant: 2026-12-01`, `Validé : non` dans les publication.md (hors git). Fiches YouTube écrites.
- Coach en lecture : les 10 vidéos sont prêtes à brancher, micros reconnues, rien écrit.

## Reste
1. Frédéric écoute les 10 vidéos (voix écrites sans relecture à deux, bruitages des shorts).
2. Push du soir (avec la notion 5e `puissance_simple` du coach, pas encore poussée).
3. APRÈS le push et sur son ordre : `node scripts/brancher-videos-coach.mjs --id 5e-puissance-notation,…,5e-puissance-litteral-short --ecrire` (PRODUCTION).
4. YouTube sur son ordre seulement (paysage avant le short), `pas_avant` à confirmer.
5. `lib/videos/mots-videos.json`, `bilans-videos.json`, `bilans-notions.json` ont été régénérés aussi par `generer-videos-r2.mjs` : non committés ici (fichiers partagés avec d'autres sessions) ; ils partiront avec la prochaine régénération committée.

## Ancienne liste (faite)
1. Relire soi-même les planches des 10 vidéos (paysage : `ffmpeg … fps=1/8,tile` ; short : `python scripts/ti-margo-planche.py`), corriger tout défaut mineur, re-rendre.
2. `python manim/miniature_puissances_5e.py` (puis les regarder), `python scripts/vignettes-videos.py`.
3. `python manim/passe_puissances_5e.py temps`, vérifier les questions et chapitres contre les rapports des agents, puis `python manim/passe_puissances_5e.py manifeste`. `python scripts/fiches-youtube.py 5e-puissance`.
4. `COUPE_PAR_VIDEO` dans `components/LecteurVideo.tsx` : 10 lignes (paysage ≈ 8,4 s après « point f r », short = « Mets » + 0,03 s), valeurs des rapports.
5. R2 : `.\scripts\r2-videos.ps1 -Rclone "copy manim/sorties/5e/maths/puissance-simple R2:5e/maths/puissance-simple …"` (PAS `-Envoyer`, il pousserait les chantiers des autres), à blanc d'abord ; `node scripts/generer-videos-r2.mjs`.
6. Coach : `node scripts/brancher-videos-coach.mjs --id <les 10 ids>` en lecture ; `--ecrire` (PRODUCTION) seulement après le push du soir, sur l'ordre de Frédéric (avant le push, /video/<id> donne 404, et la notion 5e elle-même n'est pas poussée).
7. Commits PAR CHEMIN ; manifeste et `videos-r2.json` = blob `git show HEAD:` + nos entrées seulement (`git hash-object -w` + `git update-index --cacheinfo`), voir la mémoire du manifeste. Pas de push, rien sur YouTube (`pas_avant: 2026-12-01`, `Validé : non`).
8. Rapport final en français à la session mère (`local_648c2a45-…`).
