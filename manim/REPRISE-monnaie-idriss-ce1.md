# REPRISE — Monnaie CE1 avec Idriss le pêcheur (épisodes 12 → 18), 28/11/2026

Voix VALIDÉES par Frédéric (ne pas les changer sans lui) : `manim/SCRIPTS-monnaie-idriss.md` (section CE1) et
`manim/voix/idriss-ce1-<ep>-{paysage,short}.json`. Règles communes aux 3 sessions (CP, CE1, CE2) : note
`monnaie-idriss-regles-communes.md` du dossier de notes partagé (verrou `hd-verrou.txt` au même endroit).
⛔ `ce1-rendre` (05) et `ce1-partage` (04) ne sont pas à cette série : ne pas y toucher.

## Ce qui est fait (session CE1, 28/11)
- WAV des 14 voix (`public/sons/idriss-ce1-*`, débit −6) + instants dans `idriss-cues.js` / `idriss-paysage-cues.js`.
  ⚠️ Ces deux fichiers sont PARTAGÉS et réécrits en entier par `ti-margo-cues.py` : avant tout contrôle ou HD, vérifier que
  l'épisode y est (`grep -o '"ce1-xxx":{"00' prototypes/ti-margo/films/idriss-cues.js`), sinon relancer le script.
- Dessins CE1 : `films/idriss-dessins-ce1.js` — pieceCE1 (euros ou '50c'), sommeE (cartouche), prixVirguleE (euros bleus,
  GROSSE virgule blanche, centimes orange ; renvoie les centres), entoureE, sacGlaceE, cafeE, painE, beignetE, lampeE,
  filetE, porteMonnaieCoulE, cornetE, ballonFootE, coquilleCacheE, rangPiecesE, miniCe1E (miniature short : tout entre y = 215 et 1700).
- Films écrits ET planches -ql contrôlées (compteur 8 s, bonne réponse du script, nombres écrits, rien de coupé) :
  | Ép. | Short | Paysage |
  |---|---|---|
  | 12 ce1-centimes | La pièce de la mouette (B) | Les toutes petites pièces (A, A) |
  | 13 ce1-valeur | Le trésor du filet (A) | La caisse du soir (B, B) |
  | 14 ce1-comparer | Le crabe têtu (C) | Les deux tirelires (C, B) |
  | 15 ce1-constituer | La glace pour la barque (A) | Payer pile (C, B) |
  | 16 ce1-virgule | La mouette et l'ardoise (B) | La petite virgule (B, A) |
- HD : 12 short FAIT (`manim/sorties/idriss/12-ce1-centimes/`). File d'attente lancée pour 12 paysage puis 13 → 16
  (script `file-hd.sh` du dossier de notes de la session CE1 : attend verrou libre + RAM ≥ 2,5 Go, prend/rend le verrou).

## Reste à faire
1. Films 17 `ce1-probleme` (« Les courses d'Idriss » A, B · « Le café et le pain » C) et 18 `ce1-defi`
   (« Les défis du soir » B, C · « Six beignets ? » B) : dessins prêts (cafeE, painE, beignetE, boueeE, filetE, ballonFootE, cornetE).
   Modèle le plus proche : `films/idriss-paysage-ce1-constituer.js` / `idriss-ce1-constituer.js`.
2. Planches -ql de 17-18, puis HD (file-hd.sh), puis planches HD des 14 MP4 (compteur 8 s visible, fin eleveai.fr / YouTube).
3. Miniatures : `node scripts/ti-margo-short.mjs idriss[-paysage] <ep> miniature` (shorts : miniCe1E = gabarit A, « Dessin animé »).
4. Commits PAR CHEMIN, pas de push. R2, manifeste, coach, YouTube : seulement avec l'accord de Frédéric.

## Leçons
- Paysage : pendant les questions, tout à x < 480 ; pièces de 50 c à t ≤ 80 si elles sont côte à côte à 110-140 px.
- `mot()` prend le n-ième mot EXACT (« cinq » ≠ « cinquante », « un » ≠ « une ») : compter les occurrences dans les instants.
- Contrôle : `CONTROLE=<dossier> node scripts/ti-margo-short.mjs <série> <ep> controle t1 t2 …` puis `python scripts/ti-margo-planche.py <dossier> <png>`.
