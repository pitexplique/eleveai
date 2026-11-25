# REPRISE — série GRAPHIQUES, automatismes 1re (+ garde STMG) — 24/11/2026

Session « série 1re graphiques », lancée par le chef d'orchestre du 24/11. Modèle : série évolutions du 23/11 (`brief-agent-evolutions-lycee.md`, `REPRISE-evolutions-lycee.md`).

## Les 4 micros (aucune vidéo avant)
- `auto_fct_appartenance_courbe` (notion `auto_lecture_graphique`, 1re ET STMG)
- `auto_fct_variations_graphique` (notion `auto_resolution_graphique`, 1re ET STMG)
- `auto_fct_lire_croissance` (notion `auto_resolution_graphique`, 1re seulement)
- `auto_stat_lire_histogramme` (notion `auto_lire_statistiques`, 1re seulement)
Exemples du coach : `lib/tutor-v4/questionBank/premiere/maths/lecture-graphique.bank.ts`, histogramme : `lib/tutor-v4/questionBank/lycee-stats-commun.ts` (`gabaritsHistogramme`).

## Plan proposé (24/11)
| N° | slug | micro | ceinture | contexte | short |
|---|---|---|---|---|---|
| 01 | appartenance | appartenance courbe | jaune | jeu vidéo (saut y = −x² + 4x) | non |
| 02 | variations | tableau de variations | jaune | trail, altitude sur 10 km | non |
| 03 | croissance | lire la croissance | orange | 3 chaînes vidéo (constante, double, ralentit) + bactéries | OUI (blanche) |
| 04 | histogramme | lire un histogramme | jaune | temps de trajet de 50 lycéens | non |
Gardes STMG pour 01 et 02 (mêmes micros). Aucun contexte Réunion (1 sur 25).
Bonnes réponses : 01 B, A · 02 C, B · 03 A, C · 04 B, A · short C → A 3, B 3, C 3.
Noms prévus : scripts `manim/scripts/premiere/graph_lycee_<slug>[_short].py`, classes `GraphLycee<Slug>Premiere|Stmg|Short`, sorties `manim/sorties/premiere/maths/graphiques/0N-<slug>/eleveai-maths-premiere-graph-<slug>[-short].mp4`, ids manifeste `premiere-graph-<slug>[-short]`.

## Voix
`manim/voix/lycee-graph-<slug>.json` + `lycee-graph-croissance-short.json`. Écrites le 24/11, collées à Frédéric. ⛔ ATTENDRE SON ACCORD avant WAV et scripts.

## État
- 24/11 : voix écrites, envoyées. Frédéric : « Go pour les 5 ».
- 24/11 : brief `manim/brief-agent-1re-graphiques.md` (maquette écran par écran). 2 agents de brouillons -ql lancés : agent-a (01, 02 + sous-classes Stmg non rendues), agent-b (03 + short, 04). Rapports attendus : `manim/RAPPORT-1re-graphiques-01-02.md`, `…-03-04.md`.
- Voix, brief et cette note commités (pas de push).
- 24/11 soir : agent-a FINI (rapport `manim/RAPPORT-1re-graphiques-01-02.md`), -ql 01 (3 min 43) et 02 (3 min 54), 0 alerte. Planches relues par moi : tout juste. Corrigé : « Ce que tu as appris » trop petit dans 01 et 02 → `self.XL = -0.9` dans `ecran_finale` (figure plus petite), fs 40, lignes plus courtes (mêmes mots que la voix). Dry runs relancés ; -ql à refaire quand RAM ≥ 2,5 Go (1,9 Go libres à ce moment). agent-b (03 + short + 04) encore en cours.
- 24/11 soir : agent-b FINI (rapport `manim/RAPPORT-1re-graphiques-03-04.md`) : 03 3:52, short 1:02, 04 3:34, 0 alerte. Planches relues : justes ; même correctif « Ce que tu as appris » (XL −0,9, fs 40) dans 03 et 04. Re-rendu -ql des 4 paysages en cours (`scratchpad/graph/rerendu.sh`, verrou + RAM). Ensuite : planche à Frédéric, attendre son accord avant HD.
- 24/11 : planches envoyées (`manim/sorties/premiere/maths/graphiques/planches/`), scripts commités 5bc9fc8d0. Frédéric : « Oui, lance les HD ». HD en cours par `scratchpad/graph/hd.sh` (verrou, RAM ≥ 2,5 Go) → `manim/sorties/premiere/maths/graphiques/0N-<slug>/` + `manim/sorties/stmg/maths/graphiques/0{1,2}-<slug>/` (garde Stmg collée). Logs `scratchpad/graph/hd-<nom>.log`.
- 25/11 : 1er essai HD raté (media_dir dans le scratchpad = chemin trop long pour Windows) ; hd.sh relancé avec media_dir `scripts/premiere/media-graph-lycee-<slug>[-short|-stmg]`.
- Outils prêts : `manim/miniature_graphiques_1re.py` (paysages), entrée `premiere-graph-croissance-short` ajoutée à `scripts/miniatures-shorts-grille.json` (8 lignes ; poser d'abord une image ffmpeg à 1 s au chemin miniature, puis `python scripts/miniatures-shorts-grille.py premiere-graph --planche`), `manim/ajout_site_graphiques_1re.py [ecrire]` (videos-r2 + bilans en AJOUT, sans generer-videos-r2), `.tmp-ress-graphiques-1re.mjs [ecrire]` (coach), `scratchpad/blobs.py voir|indexer` (commit des fichiers partagés = HEAD + nos clés).
- 25/11 : ✅ SÉRIE FINIE. 7 HD (4 paysages 1re, short croissance, 01-02 STMG garde collée), 0 bord. Passe finale faite : temps à l'audio, manifeste 1790 → 1797 (ajout seul), miniatures (gabarit A pour le short), fiches YouTube, vignettes, R2 filtré (21 fichiers, `--filter-from` dans le scratchpad), videos-r2 / bilans +7 chacun, 7 coupes dans LecteurVideo.tsx, coach `notion_ressources` +7 lignes (1re + STMG). Page /video/premiere-graph-croissance vérifiée en local (HD lu sur R2). Commit des fichiers partagés par blobs (HEAD + nos clés). Pas de push (le chef pousse). Planches pour Frédéric déplacées dans le scratchpad (`graph/planches-frederic`).
- Reste : rien pour la série. YouTube : entrées prioritaires du 19 au 22/07/2027 (file de publication normale).
- Passe finale écrite : `manim/passe_graphiques_1re.py` (temps / voir / manifeste / coupes ; dates 19→22/07/2027 après les évolutions ; STMG en plus_tard). Pas encore lancée.

## Reste à faire
1. Relire les brouillons (planches), corriger. 2. Planche des écrans à Frédéric (SendUserFile « render »), ATTENDRE son accord visuel. 3. HD un par un (RAM ≥ 2,5 Go), gardes STMG 01-02 collées (`frac_cm_commun.py coller`). 4. Passe finale sur le modèle de `manim/passe_evolutions_lycee.py` : temps à l'audio, manifeste en AJOUT seul (blob HEAD + nos entrées), miniatures (gabarit A pour le short), fiches YouTube, R2 filtré sur `premiere/maths/graphiques` (+ stmg), `videos-r2.json` / `bilans-videos.json` (ajout seul, sans `generer-videos-r2.mjs`), coupes LecteurVideo, coach `notion_ressources` sur les 4 micros (+ STMG pour 01-02). 5. Commits par chemin, pas de push.
