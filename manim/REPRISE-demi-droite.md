# Reprise — série « Repérer sur une demi-droite graduée » 6e + decimal_droite CM1/CM2 (08/11/2026)

## Le but
4 paysages 6e, une par micro (`abscisse_lire` blanche, `abscisse_placer` jaune, `abscisse_fraction` orange, `abscisse_graduer` orange), + la paysage commune CM1 (verte) / CM2 (jaune) `decimal_droite` + son short Ti Margo. Les 4 shorts Manim 6e `6e-demi-droite-short-*` existent déjà (en ligne) : gardés. Terminé = tout rendu et relu, manifeste (sans le réécrire), R2, coach branché (APRÈS le push), mémoire à jour, commit PAR CHEMIN, aucun push, rien sur YouTube.

## Fait
- Voix de fin `…-abonne` des 5 paysages = phrase du 05/11, WAV (Julie, débit −10, vérifié) et marques fusionnées ; les 5 bases héritent de `FinTriangles` (`manim/canvas_triangles.py`).
- Coach 6e : 4 micros OK (296 à 745 squelettes, ≤ 3,2/20).
- Coach CM `decimal_droite` réécrit : `lib/tutor-v4/questionBank/cm1/maths/decimal-droite.gen.ts`, branché dans cm1 `decimaux.bank.ts` et cm2 `nombres-decimaux.bank.ts` ; la figure ne donne plus la réponse (minorStep). 316 / 314 squelettes avec --lettres. Commit `0c0224f4`.
- Préparés (non committés) : `manim/miniature_demi_droite.py` (accroches à revoir d'après les vidéos finales), `manim/passe_demi_droite.py` (temps / voir / manifeste / manifeste-head ; CM `s_titre`, `s_accroche`, `s_toi`, `s_q` du short À REMPLIR d'après le rapport de l'agent C ; questions de la placer 04 et chapitres à vérifier si les agents ont changé des clés).
- Brief des agents : `side-session-notes/local_648c2a45-…/demi-droite-brief-agents.md`.
- Short Ti Margo CM rendu par l'agent C : `manim/sorties/cm1/maths/nombres-decimaux/decimal-droite/eleveai-maths-cm1-decimal-droite-short.mp4` + miniature + vignettes (série `prototypes/ti-margo/films/cm-decimal-droite.*`, voix `manim/voix/commun-cm-decimal-droite-short.json`).

## En cours (3 agents, lancés vers 5 h)
- A : 01 lire + 02 placer → `manim/sorties/6e/maths/demi-droite-graduee/0N-<slug>/eleveai-maths-6e-demi-droite-<slug>.mp4`.
- B : 03 fraction (rendu du 03/11 périmé) + 04 graduer (garde `00-garde` peut-être ajoutée à la voix).
- C : paysage CM1 + CM2 (garde collée) → `manim/sorties/{cm1,cm2}/maths/nombres-decimaux/decimal-droite/`, puis short (fait).
Si les rapports sont perdus : vérifier sur disque les mp4 en sortie, relancer l'audit dry run (`PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run …`) et `scripts/verifier-bords-video.py`, regarder une planche.

## Reste, dans l'ordre
1. Relire les rapports et les planches ; corriger tout défaut mineur.
2. `python manim/miniature_demi_droite.py` (+ vignettes webp : `scripts/vignettes-videos.py`).
3. `python manim/passe_demi_droite.py temps` puis `voir`, puis `manifeste` (copie de travail) ET `manifeste-head <tmp>` → `git hash-object -w <tmp>` + `git update-index --cacheinfo 100644,<blob>,manim/manifeste-youtube.json` pour ne committer QUE nos entrées (d'autres sessions ont des lignes non commitées dans le manifeste et dans lib/videos/*.json : même technique pour `videos-r2.json`, `bilans-notions.json`). `python scripts/fiches-youtube.py 6e-demi-droite-` (et `decimal-droite`).
4. R2 : `.\scripts\r2-videos.ps1 -Rclone "copy manim/sorties/6e/maths/demi-droite-graduee R2:6e/maths/demi-droite-graduee --include *.{mp4,png,webp} -q"` (idem cm1/cm2 `nombres-decimaux/decimal-droite`), PAS `-Envoyer`. Puis `node scripts/generer-videos-r2.mjs`, ne committer que nos clés.
5. `COUPE_PAR_VIDEO` (`components/LecteurVideo.tsx`, fichier propre) : paysage = durée − (début du clip `-abonne` + 2,9 s) (pause après « point f r » de 2,42 à 3,38 s dans le clip) ; short = « Mets » mesuré au son + 0,03 s.
6. Coach : APRÈS le push seulement : `node scripts/brancher-videos-coach.mjs --classe 6e --notion demi_droite_graduee --ecrire`, puis cm1 et cm2 `--notion nombre_decimal`. Avant : lecture seule (sans `--ecrire`).
7. Mémoire `serie-6e-demi-droite-graduee.md` + ligne MEMORY.md ; commit par chemin (scripts, voix, marques, sons, sorties, films, outils, REPRISE) ; rapport final en français.
- Remarque : « Inès » est le prénom de trois métiers différents (trail, game designer, conductrice de bus) ; à signaler à Frédéric, pas un défaut.
