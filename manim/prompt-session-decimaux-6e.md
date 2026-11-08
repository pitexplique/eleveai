# Reprise de la série NOMBRES DÉCIMAUX 6e (07/11/2026)

Réponds en français. Série : notions `decimal_nombre` et `decimal_calcul`, 12 micros, 24 vidéos (une paysage Manim + un short en dessin animé Ti Margo par micro).

## Où on en est
Lis `manim/REPRISE-decimaux.md` : état, slugs, décors, ceintures, choix à garder. Le coach est vérifié (`9850db39`). Les 24 voix sont dans `manim/voix/6e-decimal-<slug>[-short].json`.

**08/11 : ÉCOUTE FAITE, RIEN À CORRIGER, POUSSÉ ET AU COACH (shorts Manim remplacés par les dessins animés). YouTube programmé du 10/11 au 09/12 (`f84df75e`).**

**08/11 : PASSE FINALE FAITE (`2a953103`) : 24 vidéos au manifeste, sur R2, fiches, bilans et coupes. Reste son écoute, le push, puis le coach (étape 5). Voir le bloc « 08/11 matin » de la reprise.**

**07/11 soir : les 24 vidéos sont RENDUES et contrôlées, et le format est validé par Frédéric.** Lis le bloc « 07/11 soir » de la reprise. Commence par le défaut mineur des paysages 02 et 03 (entêtes de la finale), puis enchaîne l'étape 4 à partir du manifeste : manifeste, fiches YouTube, R2, bilans, `COUPE_PAR_VIDEO`. Ne refais aucune des vidéos.

## Après son oui, dans l'ordre (modèle : série Triangles)
1. Voix générées (même outil que les triangles : voir l'en-tête de `manim/scripts/6e/triangle_nommer.py`).
2. Pilote de l'épisode 01 `lire-ecrire` : la paysage `manim/scripts/6e/decimal_lire_ecrire.py` (calquée sur `triangle_nommer.py`, ceinture verte, audit `AUDIT=1 BORDS=1 … --dry_run`, 0 AUDIT-AVANCE) et le short : copier `prototypes/ti-margo/films/_modele.js` et `_modele.json` vers `films/decimaux.js` et `.json` (`"voix": "6e-decimal-{ep}-short"`, `"sortie": "manim/sorties/6e/maths/decimaux/{num}-{ep}"`, `"nom": "eleveai-maths-6e-decimal-{ep}-short"`), puis `python scripts/ti-margo-cues.py decimaux lire-ecrire`, contrôle `CONTROLE=<dossier> node scripts/ti-margo-short.mjs decimaux lire-ecrire controle 1 12 30`, film. Ne copie pas de page : lis `prototypes/ti-margo/LISEZ-MOI.md`.
3. Montre les deux pilotes (aperçu `manim/sorties/apercu-decimaux.html`, port 3900, à l'arrêt, sans autoplay) et attends la validation du format.
4. Puis les 22 autres sans redemander, chaque film dans `films/decimaux-<épisode>.js` : rendu, `verifier-bords-video.py`, planches relues soi-même (zoomer sur les questions), défauts mineurs corrigés et re-rendus, miniatures (« Film d'animation 3D » sur les shorts), manifeste (`6e-decimal-<slug>[-short]`, `micro_id`, `centres`, `questions`, `pas_avant` provisoire), `python scripts/fiches-youtube.py`, R2, bilans, `COUPE_PAR_VIDEO` (« Mets » + 0,03 s, mesuré au son de chaque mp4).
5. Coach APRÈS le push seulement : `node scripts/brancher-videos-coach.mjs --classe 6e --notion decimal_nombre --ecrire`, puis `--notion decimal_calcul`.

## Contraintes
- Ne lance jamais la lecture d'une vidéo.
- Corrige toujours les défauts mineurs et re-rends.
- Commit PAR CHEMIN, seulement tes fichiers, sans pousser : le push se fait le soir à sa demande. `git commit -- <chemin>` prend la copie de travail entière du fichier : si une autre session a des lignes non commitées dans le même fichier, passe par `git apply --cached` d'un patch de tes seules lignes, puis `git commit` sans chemin.
- `manim/manifeste-youtube.json` et `lib/videos/*` contiennent des modifications d'autres sessions : ne les commite pas avec les tiennes ; ne réécris jamais le manifeste en entier.
- Rien sur YouTube sans son ordre.
- Autres sessions dans ce dossier : jamais de stash, reset ou changement de branche. La session « raccourcir 6e » modifie les banques de 6e ; la session « Coach France : quotient de décimaux au cycle 4 » (`local_f27ee8f3-…`) travaille `decimal_diviser_par_decimal` : n'y touche pas.
- Tiens à jour `manim/REPRISE-decimaux.md` et la mémoire `serie-decimaux-6e`.

## Terminé quand
Les 24 vidéos sont contrôlées, sur R2, au manifeste, et le rapport final liste les décisions et ce qui reste à écouter.
