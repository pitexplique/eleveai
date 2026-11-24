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

## Reste à faire
1. Relire les brouillons (planches), corriger. 2. Planche des écrans à Frédéric (SendUserFile « render »), ATTENDRE son accord visuel. 3. HD un par un (RAM ≥ 2,5 Go), gardes STMG 01-02 collées (`frac_cm_commun.py coller`). 4. Passe finale sur le modèle de `manim/passe_evolutions_lycee.py` : temps à l'audio, manifeste en AJOUT seul (blob HEAD + nos entrées), miniatures (gabarit A pour le short), fiches YouTube, R2 filtré sur `premiere/maths/graphiques` (+ stmg), `videos-r2.json` / `bilans-videos.json` (ajout seul, sans `generer-videos-r2.mjs`), coupes LecteurVideo, coach `notion_ressources` sur les 4 micros (+ STMG pour 01-02). 5. Commits par chemin, pas de push.
