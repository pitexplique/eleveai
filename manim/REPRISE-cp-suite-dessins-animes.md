# REPRISE — CP suites de nombres en dessin animé (5 paysages + 2 shorts), 26/11/2026

Demande (chef dessins-animes-petits, 26/11) : la série Ti Margo pour la notion CP `suite_nombre`, une paysage par micro,
des shorts pour 2 d'entre elles. Même méthode que la série « nombres entiers » (`manim/REPRISE-cp-entier-dessins-animes.md`).
Voix VALIDÉES par Frédéric le 26/11 (« VOIX VALIDÉES ») : ne pas changer leur texte sans son accord.

## Les fichiers
- Voix : `manim/voix/cp-suite-{avant,arriere,pas,completer,defi}-paysage.json`, `manim/voix/cp-suite-{pas,defi}-short.json` (WAV dans `public/sons/cp-suite-*`).
- Séries : `prototypes/ti-margo/films/cp-suite.json` (shorts : pas 03, defi 05) et `cp-suite-paysage.json` (avant 01, arriere 02, pas 03, completer 04, defi 05).
- Dessins communs : `films/cp-suite.js` (relit `cp-entier.js` SANS le modifier : etiquette, sautE, carteCoteE…) : caseS (carte nombre / trou « ? »),
  caseDizS (dizaine en orange), arcS (saut « +1 »), barreS (« vingt-dix » barré), livreS, fuseeS, rampeS, fumeeS, paireS / chaussetteS / cordeS,
  mainS, paquetS (10 crayons), locoS / wagonS / railsS / fanionsS, pierreS / coffreS / cheminS, flecheS, aGrandS, rangeeS, pulseS, lettreS (instant de « A/B/C »).
- Paysage : `films/cp-suite-paysage.js` (relit `cp-entier-paysage.js` + `cp-suite.js`) : `filmSuiteP(outils,cfg)` fabrique tout le film
  (clips, 2 questions-pauses, caméra, gestes, miniature) ; chaque épisode `films/cp-suite-paysage-<ep>.js` ne donne que DUR, dessiner(c,T,S), les questions.
- Shorts : `films/cp-suite-pas.js`, `films/cp-suite-defi.js` (carte à droite sous l'ardoise + Ti Margo petit pendant la question, comme les shorts cp-entier corrigés).

## Bonnes réponses (au hasard A/B/C)
avant : B (46), A (60) · arriere : C (41), B (59) · pas : B (16), C (60) · completer : A (38), B (30) · defi : C (17), A (55) · short pas : C (10) · short defi : A (3).

## Commandes
- Voix : `powershell -NoProfile -File scripts/generer-voix.ps1 -Fichier manim/voix/<nom>.json -Debit -6`
- Instants : `python scripts/ti-margo-cues.py cp-suite-paysage avant arriere pas completer defi` ; `python scripts/ti-margo-cues.py cp-suite pas defi`
- Contrôle : `CONTROLE=<dossier> node scripts/ti-margo-short.mjs cp-suite-paysage <ep> controle 2 5 8 …` puis `python scripts/ti-margo-planche.py <dossier> <planche.png>`
- HD : `node scripts/ti-margo-short.mjs <série> <ep> film` puis `… miniature` — UN seul rendu à la fois.
- Manifeste : script de la session (scratchpad) recopié ici si besoin : ids `cp-suite-<ep>` et `cp-suite-<ep>-short`, YouTube daté 26 → 30/07/2027.

## Fin des vidéos (règle du 26/11, `manim/REGLES.md`)
Voix `…-abonne` : « Entraîne-toi sur éleveai point f r, ou sur YouTube : éleveai neuf sept quatre ! » (6,1 s) ; écran « eleveai.fr ou sur YouTube @eleveai974 »,
sans pouce, abonnement ni cloche ; FIN = début de la fin + 6,1 + 1,5 s ; Ti Margo fier. L'écran vient de `cadrePaysageE` (cp-entier-paysage.js)
et de `finCourteS()` (notre version, dans `cp-suite.js` : on ne dépend plus des fichiers cp-entier pour la fin).

## Pièges vus
- Une capture isolée (controle) au début d'un film montre la caméra plus serrée : c'est le lissage de `aller()`, le vrai film est bon.
- `phraseE(txt, ts)` : il faut UN instant par mot (« Combien ? » = 2 mots), sinon le mot ne paraît jamais.
- `pulseS` doit vivre dans `cp-suite.js` (les shorts ne lisent pas `cp-suite-paysage.js`).
- Pendant une question paysage, dessiner entre x ≈ -100 et 520 (le tableau déborde à gauche du cadre 1056).
- Les emoji passent par `doigtE` (police Segoe UI Emoji), pas par `ecrire`.

## État (26/11, 12 h 45)
- [x] 7 voix + instants ; fin refaite selon la règle du 26/11.
- [x] 7 films écrits, planches de contrôle bonnes (tailles agrandies : wagons, pierres, étiquettes).
- [x] HD : avant 100,6 s · arriere 97,5 s · pas 100,0 s · completer 94,5 s · defi 105,8 s · short pas 50,8 s · short defi 53,0 s ; son ok, compteurs visibles, nouvelle fin, planches HD regardées ; miniatures + vignettes webp.
- [x] Manifeste (7 entrées après cp-entier-collection-short, YouTube daté 26 → 30/07/2027), videos-r2.json (mes 7 entrées), bilans-videos.json (seules mes 7 feuilles changent ; bilans-notions.json remis à HEAD : il changeait cm1/masse, pas à nous).
- [x] R2 : `cp/maths/suite` seulement (28 fichiers), par `scripts/r2-videos.ps1 -Rclone "copy manim/sorties/cp/maths/suite R2:cp/maths/suite"`.
- [x] `brancher-videos-coach.mjs --classe cp --notion suite_nombre --ecrire` : 7 lignes notion_ressources ; `/api/notion-videos?matiere=maths&classe=cp` renvoie les 5 micros.
- [x] Commit par chemin, PAS de push : les pages /video/cp-suite-* liront videos-r2.json après le push du soir de Frédéric.
- [ ] Frédéric regarde les vidéos (pas encore vues par lui).
