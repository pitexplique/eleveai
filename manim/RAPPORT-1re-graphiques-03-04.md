# Rapport agent-b : 1re graphiques 03 croissance (+ short) et 04 histogramme

Brouillons -ql seulement. Aucun commit, aucun HD, aucune miniature, rien dans le manifeste, sur R2 ou dans le coach. Voix inchangées ; aucune erreur mathématique relevée dedans.
Marques : `manim/scripts/premiere/graph_lycee_*_marques.json` (WAV générés avec `generer-voix.ps1 -Debit -10`, après la correction de 05-accelere).

## 03 croissance (paysage, GraphLyceeCroissancePremiere, ceinture orange)
- Script : `manim/scripts/premiere/graph_lycee_croissance.py`
- MP4 : `manim/scripts/premiere/media-graph-lycee-croissance/videos/graph_lycee_croissance/480p15/eleveai-maths-premiere-graph-croissance.mp4` (3:52)
- Dry run : 0 AUDIT, 0 RETARD, 0 TARD, 0 BORD. verifier-bords : 0 instant.
- Planche (deux passes) : polices uniformisées ; écran 05 réorganisé (6 valeurs au mot, × 2, puis les 5 hausses « +10 … +160 ») ; tableau du défi élargi ; hausses de la correction « +500 … +4 000 » ; en 09, cartes réduites pour ne plus toucher Ti Margo.
- Début des clés : 00 00:00 · 01 00:05 · 02 00:25 · 03 00:29 · 04 00:36 · 05 00:49 · 06 01:09 · 06b 01:32 · 07 01:43 · 08 01:56 · 09 02:12 · 09b 02:35 · 10 02:48 · 10b 03:07 · 11 03:21 · 12 03:40
- Une classe `AuditMilliers` (dans le script) lit « 1 000 » comme « 1000 » ; sans elle, l'audit d'origine signale tous les milliers en AUDIT-ABSENT.

```json
"questions": [
  {"t": "01:09", "question": "Chez Sarah, les hausses sont 300, 150, 80, 40. Sa croissance :", "choix": ["ralentit", "accélère", "est constante"], "reponse": 0, "explication": "Sarah gagne chaque mois, mais de moins en moins : la croissance ralentit."},
  {"t": "02:12", "question": "Des bactéries passent de 1 000 à 2 000 en 3 h et doublent à ce rythme. Combien sont-elles après 9 h ?", "choix": ["4 000", "6 000", "8 000"], "reponse": 2, "explication": "En 9 h : 3 doublements : 1 000 → 2 000 → 4 000 → 8 000."}
]
```

## Short GraphLyceeCroissanceShort (ceinture blanche)
- Script : `manim/scripts/premiere/graph_lycee_croissance_short.py`
- MP4 : `manim/scripts/premiere/media-graph-lycee-croissance-short/videos/graph_lycee_croissance_short/854p15/eleveai-maths-premiere-graph-croissance-short.mp4` (1:02)
- Dry run (-r 1080,1920) : 0 AUDIT, 0 RETARD, 0 BORD. verifier-bords : 0 instant.
- Planche : « après 4 h ? » touchait les bords en apparaissant (police et zoom réduits) ; le petit escalier de la réponse chevauchait la carte C (il est passé à droite de Ti Margo) ; la flèche verte recouvrait « + 40 » (déplacée) ; l'écran commentaire est bien sans Ti Margo.
- Début des clés : 00 00:00 · 01 00:04 · 02 00:17 · 02b 00:36 · 03 00:46 · 04 00:55

```json
"questions": [
  {"t": "00:17", "question": "Les hausses sont 10, 20, 40, 80. La croissance :", "choix": ["ralentit", "est constante", "accélère"], "reponse": 2, "explication": "Les hausses grandissent : la croissance accélère."}
]
```

## 04 histogramme (paysage, GraphLyceeHistogrammePremiere, ceinture jaune)
- Script : `manim/scripts/premiere/graph_lycee_histogramme.py`
- MP4 : `manim/scripts/premiere/media-graph-lycee-histogramme/videos/graph_lycee_histogramme/480p15/eleveai-maths-premiere-graph-histogramme.mp4` (3:34)
- Dry run : 0 AUDIT, 0 RETARD, 0 BORD. verifier-bords : 0 instant.
- Planche : « minutes » recouvrait la dernière barre (il passe sous l'axe ; sur le petit histogramme, à droite de la flèche) ; classes « [0 ; 10[ [10 ; 20[ … » sur leur propre ligne ; « 17 élèves » / « entre 10 et 20 minutes » sur deux lignes ; élève agrandi en 05 ; piège 08 aéré ; phrases des réponses en police 30.
- Trois marques fines ajoutées à la main dans la clé 04 (« 10 », « et », « 20 » tirés des repères bruts) : le bloc « entre 10 et 20 » n'avait qu'une marque, et le « 20 » partait en AUDIT-TARD.
- Début des clés : 00 00:00 · 01 00:04 · 02 00:19 · 03 00:23 · 04 00:37 · 05 00:49 · 06 00:58 · 06b 01:16 · 07 01:30 · 08 01:44 · 09 02:01 · 09b 02:20 · 10 02:38 · 10b 02:51 · 11 03:06 · 12 03:23

```json
"questions": [
  {"t": "00:58", "question": "Combien d'élèves mettent moins de 20 minutes ?", "choix": ["17", "25", "20"], "reponse": 1, "explication": "8 + 17 = 25 (les deux premières barres)."},
  {"t": "02:01", "question": "Quelle part des élèves met au moins 30 minutes ?", "choix": ["26 %", "13 %", "9 %"], "reponse": 0, "explication": "9 + 4 = 13 ; 13 ÷ 50 = 0,26 = 26 %."}
]
```

## Soucis restants
- Les paysages sont longues (3:52 et 3:34) : la voix seule dure déjà autant.
- Pas encore vu en HD. Le lecteur du site coupe la fin (COUPE_FIN) : vérifier que « Abonne-toi » reste visible.
