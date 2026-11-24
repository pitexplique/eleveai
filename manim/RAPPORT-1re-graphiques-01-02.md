# Rapport agent-a — 1re graphiques, épisodes 01 et 02 (24/11)

Brouillons -ql seulement. Aucun HD, aucun commit, rien poussé, pas de manifeste, R2 ni miniature. Voix non modifiées ; aucune erreur mathématique relevée dans les voix.

## 01 appartenance (ceinture jaune) — « Ce point est-il sur la courbe ? »
- Script : `manim/scripts/premiere/graph_lycee_appartenance.py` (`GraphLyceeAppartenancePremiere` ; `GraphLyceeAppartenanceStmg` = garde seule, écrite, non rendue) ; marques `graph_lycee_appartenance_marques.json` ; WAV `public/sons/lycee-graph-appartenance/` (16 clés).
- MP4 -ql : `manim/scripts/premiere/media-graph-lycee-appartenance/videos/graph_lycee_appartenance/480p15/eleveai-maths-premiere-graph-appartenance.mp4` — 3 min 43 s.
- Dry run AUDIT=1 BORDS=1 : 0 AVANCE, 0 TARD, 0 ABSENT, 0 RETARD, 0 BORD. verifier-bords-video : 0 instant.
- Planche regardée écran par écran (après corrections) : courbe y = −x² + 4x, héros qui saute, calcul −3² + 4 × 3, règle, piège du carré, défi (4 ; 0) et (5 ; −5), fin commune.
- Début des clés : 00-garde 00:00 · 01 00:06 · 02 00:28 · 03 00:33 · 04 00:49 · 05 00:59 · 06-question 01:09 · 06b 01:29 · 07-piege 01:42 · 08 01:59 · 09-question 02:13 · 09b 02:35 · 10-defi 02:44 · 10b 03:00 · 11-finale 03:16 · 12-abonne 03:32.
- Questions (JSON) :
  - t "01:09" — « Le point (1 ; 4) est-il sur la courbe ? » — ["oui", "non, on trouve 3", "non, on trouve 5"], reponse 1 — « −1² + 4 × 1 = 3, et pas 4 : le point est au-dessus ».
  - t "02:13" — « Sur y = 2x² − 3, quel est le point d'abscisse −1 ? » — ["(−1 ; −1)", "(−1 ; −5)", "(−1 ; 1)"], reponse 0 — « 2 × 1 − 3 = −1 ; B oublie le carré, C met au carré 2 × (−1) ».
- À savoir : à la question 1, le texte dit « Est-il sur la courbe ? » sans recopier (1 ; 4), qui est étiqueté sur le graphique (évite un TARD). Pendant le défi, la courbe tracée laisse deviner les réponses. Le texte de « Ce que tu as appris » est un peu petit (4 lignes à loger).

## 02 variations (ceinture jaune) — « Le tableau de variations »
- Script : `manim/scripts/premiere/graph_lycee_variations.py` (`GraphLyceeVariationsPremiere` ; `GraphLyceeVariationsStmg` = garde seule, écrite, non rendue) ; marques `graph_lycee_variations_marques.json` ; WAV `public/sons/lycee-graph-variations/` (15 clés).
- MP4 -ql : `manim/scripts/premiere/media-graph-lycee-variations/videos/graph_lycee_variations/480p15/eleveai-maths-premiere-graph-variations.mp4` — 3 min 54 s.
- Dry run AUDIT=1 BORDS=1 : 0 AVANCE, 0 TARD, 0 ABSENT, 0 RETARD, 0 BORD. verifier-bords-video : 0 instant.
- Planche regardée écran par écran : trail de 10 km (montre GPS), parcours gauche → droite en couleurs, tableau rempli, maximum 800 m en 4 / minimum 200 m en 0 (« pas en 7 »), piège x/y, défi 0, 2, 5 → 3 ↘ −2 ↗ 4, fin commune.
- Début des clés : 00-garde 00:00 · 01 00:05 · 02 00:22 · 03 00:27 · 04-tableau 00:46 · 05-extremums 01:08 · 06-question 01:22 · 06b 01:43 · 07-piege 01:56 · 08-question 02:10 · 08b 02:37 · 09-defi 02:51 · 09b 03:08 · 10-finale 03:25 · 11-abonne 03:42.
- Questions (JSON) :
  - t "01:22" — « Sur quel intervalle la fonction est-elle décroissante ? » — ["de 0 à 4", "de 300 à 800", "de 4 à 7"], reponse 2 — « Entre 4 et 7 km la courbe descend ; A la montée, B des altitudes ; les intervalles se lisent sur les x ».
  - t "02:10" — « Quel est le maximum ? » (tableau −3, 1, 4 ; 2 ↗ 6 ↘ −1) — ["4, atteint en −1", "6, atteint en 1", "1, atteint en 6"], reponse 1 — « 6, en haut des flèches, atteint en 1 ; A lit la dernière colonne, C inverse les lignes ».
- À savoir : les phrases de réponse des questions sont raccourcies à l'écran (la voix dit la phrase entière). Coche du 06b à 7 px du libellé (verifier-coche-carte : ok). Défi : le « 1 » de l'axe x est au-dessus de l'axe, car la courbe passe dessous.
