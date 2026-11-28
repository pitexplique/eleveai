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
  | 17 ce1-probleme | Le café et le pain (C) | Les courses d'Idriss (A, B) |
  | 18 ce1-defi | Six beignets ? (B) | Les défis du soir (B, C) |
- ✅ HD des 14 FAITES (12 → 18, short + paysage ; son présent, durée = FIN) ; planches HD regardées une à une :
  `manim/sorties/idriss/<num>-<ep>/planche-hd-{short,paysage}.png`.
- ✅ 14 miniatures faites et regardées (`*-miniature.png`, shorts : gabarit A + « Dessin animé ») ; titre du short 16 raccourci
  (« 1,05 € : combien de c ? ») et ardoise du short 17 (« 1,50 € + 1 € / il a 5 € ») corrigés le 28/11.

## Reste à faire (rien sans Frédéric)
- Montrer la série à Frédéric. R2, manifeste, coach, YouTube : seulement avec son accord. Pas de push.

## Leçons
- Paysage : pendant les questions, tout à x < 480 ; pièces de 50 c à t ≤ 80 si elles sont côte à côte à 110-140 px.
- `mot()` prend le n-ième mot EXACT (« cinq » ≠ « cinquante », « un » ≠ « une ») : compter les occurrences dans les instants.
- Contrôle : `CONTROLE=<dossier> node scripts/ti-margo-short.mjs <série> <ep> controle t1 t2 …` puis `python scripts/ti-margo-planche.py <dossier> <png>`.
- `mot('A')` attrape aussi « a » et « à » dits avant (« Idriss a quinze », « à huit euros ») : compter (`mot('04-question','A',3)`).
- Short (tableau 1056 × 720) : dessiner GRAND (billets t ≥ 56, café ×1,4, enfants ×1,2), fond `quaiBoisE(c,T,40)` pour les questions.
- Banc d'essai hors navigateur (voix mot à mot, sans RAM) : `banc.js` (+ `controle.sh`, `mini.sh` sous verrou) dans le dossier de notes `side-session-notes/local_a6405527-72c4-417a-a8a3-2d1d01d770f0/` (`node banc.js idriss-paysage ce1-defi`).
