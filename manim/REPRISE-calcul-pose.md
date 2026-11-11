# Reprise — série CALCUL POSÉ 6e (état au 11/11/2026)

Notion `entier_calcul_pose` (banque `lib/tutor-v4/questionBank/6e/maths/calcul-pose.bank.ts`, 6 micros). 5 paysages Manim + 5 shorts dessin animé Ti Margo, sur le modèle de la série Décimaux (`manim/REPRISE-decimaux.md`).

## Découpage (pas de doublon)
- Les décimaux posés ont DÉJÀ leurs vidéos (série Décimaux, ép. 07 additionner, 08 multiplier, 09 multiplier-decimaux, 11 diviser-par-entier) : cette série reste sur les ENTIERS.
- L'ancienne paysage muette `manim/scripts/6e/entier_calcul_pose.py` (juillet, notion entière, pas au manifeste) reste telle quelle.
- Exemples de la fiche `lib/fiches/maths-6e-calcul-pose.tsx` repris : 475 + 286, 632 − 458, 267 × 4, 58 ÷ 7, 348 + 275. Items du coach repris : 386 + 247 / 390 + 250, 702 − 358, 96 ÷ 4, 498 + 307, 50 − 17, 615 − 278, 50 cartes ÷ 6, 47 ÷ 5. Division : diviseur à un chiffre (comme le coach).

| Ép. | Slug | Micros | Paysage (métier, matrice) | Short (gag Ti Margo) | Commentaire | Centres |
|---|---|---|---|---|---|---|
| 01 | addition | entier_addition_posee | Nadia, comptable (475 + 286 ; défi 348 + 275 + 96 = 719) | 47 + 38 = 75, retenue oubliée | 56 + 27 = 83 | argent-budget |
| 02 | soustraction | entier_soustraction_posee | Hugo, guide de montagne (632 − 458 ; piège 503 − 128 ; défi 1 000 − 643) | 52 − 17 = 45 (petit ôté du grand) | 73 − 48 = 25 | sport, nature-ecologie |
| 03 | multiplication | entier_multiplication_posee | Théo, agriculteur (267 × 4 ; 36 × 24 = 864 ; défi 28 × 45) | 23 × 12 = 69, zéro oublié | 21 × 13 = 273 | nature-ecologie, cuisine |
| 04 | division | entier_division_posee | Maëlle, logisticienne (58 ÷ 7 ; 157 ÷ 6 → 27 camionnettes ; défi 245 ÷ 8 = 30 r 5) | 50 cartes à 6 : « 7, reste 8 » | 45 ÷ 7 → 6 r 3 | transports, jeux-defis |
| 05 | verifier | entier_calcul_verifier, entier_calcul_pose_defi | Zoé, réalisatrice de dessins animés (ordre de grandeur, opération inverse ; défi 24 × 180 = 4 320) | 615 − 278 = 347 | 403 − 156 = 247 | cinema-series, jeux-defis |

3 filles, 2 garçons. 0 à La Réunion. Ceintures : paysages vertes, shorts jaunes (un calcul).
Bonnes réponses tirées au hasard (graine 1111) : paysages 01 A-B, 02 A-B, 03 A-C, 04 A-C, 05 C-A ; shorts C, B, C, B, B (5 A, 5 B, 5 C).
Métiers : matrice `lib/matrice/metiers-college.ts` (`entier_calcul_pose`) ; guide de montagne PAS ENCORE ajouté (à faire avec les `V`) ; marquer `V` après le rendu (phrase de la logisticienne à mettre à 157 colis / camionnettes de 6).

## Noms
Voix et manifeste : `6e-calcul-pose-<slug>[-short]` (`manim/voix/`). Sorties : `manim/sorties/6e/maths/calcul-pose/NN-<slug>/`. Scènes : `manim/scripts/6e/calcul_pose_<slug>.py`. Films : `prototypes/ti-margo/films/calcul-pose.js` (+ `calcul-pose-<slug>.js`, `.json`). Aperçu : `manim/sorties/apercu-calcul-pose.html` (⛔ jamais `apercu.html`).

## État
- 11/11 : 10 voix écrites (`manim/voix/6e-calcul-pose-*.json`). Voix du pilote 01 (paysage + short) montrée EN ENTIER à Frédéric : **en attente de son oui**. Rien n'est généré ni rendu.

- 11/11 : ✅ **VOIX VALIDÉES par Frédéric** (« Oui, enchaîne »). ✅ 10 voix générées (Julie, débit −6, `public/sons/6e-calcul-pose-*`). ✅ Marques des 5 paysages : `python manim/scripts/6e/calcul_pose_marques.py` (0 mot introuvable).
- ✅ `manim/scripts/6e/calcul_pose_commun.py` : `Pose` entière (colonnes colorées par rang, `entete`, `place`, `barrer`, `ret(r+1, v)` pour une retenue), `nadia`, `facture`, `cube`, `gauche(m, x, y)` (placer SANS rétrécir : `self.col` rétrécit), `rep_bas()` (explication des questions-pauses en bas à gauche, en grand : `ligne_rep` la rendait minuscule), `finale_gauche()`.
- ✅ Paysage pilote `manim/scripts/6e/calcul_pose_addition.py` (`CalculPoseAddition6e`, 3 min 48) : dry run propre (0 TARD, 0 BORD, seul « 974 »). Brouillon -ql relu en planche, puis corrigé (factures, poses, explications, finale) ; **re-planche -ql à faire** avant le HD.
- Leçons : `au_mot(extrait)` prend la PREMIÈRE occurrence dans le clip (« 1 unité » tombait dans « 11 unités ») : prendre un extrait unique. Nombres à espace (« 1 248 ») : `hors_audit(...)` (l'audit cherche « 1248 » dans la voix). Étiquettes redites : `f.sans_synchro = True`. Le script d'audit filtre `AUDIT|BORD|TARD|AVANCE`. Cadre : |x| ≤ 6,68.
- 11/11 soir : planche -ql relue ; corrigés : retenues qui touchaient les chiffres (`Pose.ret` surchargée dans `calcul_pose_commun.py`, décalage −0,5 pas / +0,56 hl), « Combien en tout ? » collé aux montants du défi (y −1,75, `pause_defi(y=-2.6)`), deux-points collés au nombre (buff 0,24 / 0,22). Dry run AUDIT propre. Rendu HD lancé dès le poste libre.
- ✅ Short 01 « La retenue oubliée » : `films/calcul-pose.js` (outils de la série : `poser`, `cadrer`, `sacCraie`, `ardoiseMini`… ⛔ pas de `camera` ni `sac` : déjà dans personnage.js/short.js), `calcul-pose.json`, `calcul-pose-cues.js` (5 ép.). Contrôles relus (en-têtes au-dessus du cadre, « 50 + 40 = 90 » aéré, retenue = pastille orange pleine, remontée au-dessus du 4).
- ✅ Aperçu séparé `manim/sorties/apercu-calcul-pose.html` (2 vidéos, sans lecture auto).
- ✅ 11/11 16 h : **pilotes 01 rendus**. Paysage HD (228,8 s, bords 0, audit propre ; piège : encadré « 1 323 € » descendu sous le résultat, « Pas en commençant à gauche ! » à y −2,3 ; « On pose 475 + 286. » aéré). Short 84,9 s + miniature (ardoise rétrécie, ne cache plus l'œil). Planches relues. **En attente du oui de Frédéric sur le FORMAT** (aperçu `apercu-calcul-pose.html`) avant 02-05.
- ⚠️ 9 processus python tournaient le 11/11 : avant le HD, vérifier les lignes de commande (`powershell "Get-CimInstance Win32_Process -Filter \"name='python.exe'\" | select CommandLine"`) : rendre seulement si aucun `manim render` ne tourne.

## Reste, dans l'ordre
1. ~~Son oui sur les voix~~ ✅ ; ~~voix et marques~~ ✅. Instants des shorts : `python scripts/ti-margo-cues.py calcul-pose <ép>` (après `films/calcul-pose.json`).
2. Re-planche -ql de la paysage 01 (`-o brouillon-cp-01 --media_dir manim/scripts/6e/media-cp-01`, `python scripts/ti-margo-planche.py <mp4> <png> 30`), puis HD.
3. Short 01 : `films/calcul-pose.js` + `.json` depuis `_modele` (modèle : `films/decimaux.js`, `decimaux-additionner.js`), miniature « Dessin animé ».
4. Pilotes 01 (paysage `calcul_pose_addition.py` sur `decimal_commun` + `Pose` de `decimal_additionner.py` ; film `films/calcul-pose.js`), dry run AUDIT, planches, UN rendu HD à la fois (⛔ `tasklist` avant : poste partagé).
4. Validation du format, puis 02 à 05, aperçu, commit par chemin, sans push. Manifeste, R2, coach : après son écoute.
