# Reprise — série CALCUL POSÉ 6e (état au 12/11/2026)

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
- ✅ 11/11 16 h : **pilotes 01 rendus**. Paysage HD (228,8 s, bords 0, audit propre ; piège : encadré « 1 323 € » descendu sous le résultat, « Pas en commençant à gauche ! » à y −2,3 ; « On pose 475 + 286. » aéré). Short 84,9 s + miniature (ardoise rétrécie, ne cache plus l'œil). Planches relues. ✅ **FORMAT VALIDÉ par Frédéric le 11/11** (« Oui, enchaîne ») : on fait 02 à 05 sur ce modèle.
- ⚠️ 9 processus python tournaient le 11/11 : avant le HD, vérifier les lignes de commande (`powershell "Get-CimInstance Win32_Process -Filter \"name='python.exe'\" | select CommandLine"`) : rendre seulement si aucun `manim render` ne tourne.
- ✅ 11/11 17 h : **ép. 02 SOUSTRACTION écrit** (pause à 87 %, AUCUN rendu HD fait).
  - Paysage `manim/scripts/6e/calcul_pose_soustraction.py` (`CalculPoseSoustraction6e`, Hugo guide de montagne, méthode « je casse une dizaine »). Aides ajoutées dans `calcul_pose_commun.py` : `Pose.dessus(r, v)` (chiffre cassé écrit au-dessus du chiffre barré), `Pose.devant(r, haut=False)` (le petit 1 : 2 → 12 ; `haut=True` devant un chiffre déjà écrit au-dessus), `entete(r, haut=1.3)` (en soustraction, les chiffres cassés passent entre l'initiale et le chiffre).
  - Dry run AUDIT propre (seul « 974 »). Planche -ql relue (`media-cp-02/.../480p15/brouillon-cp-02.mp4`) ; défauts corrigés DANS LE CODE après cette planche, **pas encore revus en image** : en-têtes c/d/u touchés par les chiffres cassés (écran 03), « Sommet » et « ? » collés au drapeau (01), « 174+458=632 » serré (04), « 10 » collé à la ligne du haut dans le piège (pose descendue à y 0,3), explication de la question 2 sur le choix C (3 lignes sous les choix, « Ça fait 265. » au bout de la 3e).
  - Short `prototypes/ti-margo/films/calcul-pose-soustraction.js` « Les coquillages envolés » (52 − 17 = 45 faux, vérif 45 + 17 = 62 ≠ 52, bonne réponse B = 35, commentaire 73 − 48). Contrôles relus et propres (captures 6, 8,6, 11, 16, 26, 40, 58, 66, 74 s). Pas encore filmé ni miniature. Outils ajoutés dans `calcul-pose.js` : `barrer(c,x,y)`, `petit(c,txt,x,y)` ; `voixDe` fait maintenant correspondre un signe écrit (+, −, ×) au mot dit SEUL (« plus », « moins », « fois »).
- Leçons : l'audit contrôle aussi les MOTS écrits (« Sommet », « Déjà », « Montée » : à poser au mot où ils sont dits). Pour poser un résultat au bon instant, prendre l'extrait qui COMMENCE par le chiffre (« 4. Dizaines », pas « 8, 4 »). Lancer le dry run avec `PYTHONIOENCODING=utf-8` (le signe − plante la console sinon). Une légende du short doit suivre la voix mot à mot (« 45 + 17, ça fait 62. »).

- ✅ 12/11 : **ép. 02 HD rendu** (`02-soustraction/`, bords 0, planche HD propre) ; short 02 filmé + miniature, MAIS `films/calcul-pose-soustraction.js` retouché APRÈS le film (ligne « 45 + 17 = 62 » aérée, coche du « Ouf » à 915) : **short 02 à refilmer**.
- ✅ 12/11 : **ép. 03 multiplication** : paysage `calcul_pose_multiplication.py` (`CalculPoseMultiplication6e`, `PoseX` : deux lignes de produits, `+`, total) HD rendu (`03-multiplication/`, 244 s, bords 0, planche HD propre). Short `films/calcul-pose-multiplication.js` « Le zéro oublié » : contrôles propres, **pas encore filmé**.
- ✅ 12/11 : **ép. 04 division** : paysage `calcul_pose_division.py` (`CalculPoseDivision6e`, `Potence` reprise de `decimal_diviser_par_entier.py` avec mémoire : rappeler `po.q(0, 2)` rend LE MÊME chiffre) : audit propre, planche -ql relue et corrigée (« 58 = 7 × 8 + 2 » aéré, « 6 × 26 » aéré) ; **HD à faire**. Short `films/calcul-pose-division.js` « Le reste trop grand » (potence dessinée à la craie) : contrôles propres, **pas filmé**.
- ✅ 12/11 : **ép. 05 vérifier** : paysage `calcul_pose_verifier.py` (`CalculPoseVerifier6e`, Zoé réalisatrice, `pellicule`, `nombre(po, "633")`) : audit propre ; brouillon -ql rendu le 12/11 (`manim/scripts/6e/media-cp-05-ql/…/brouillon.mp4`), **planche à faire et à relire samedi** (`python scripts/ti-margo-planche.py <mp4> <png> 40`), puis HD. Short `films/calcul-pose-verifier.js` « Vérifier, ça sauve » (`limiterRepetitions()` : « 615 moins » ×4 dans les instants) : contrôles propres, **pas filmé**.
- ✅ Matrice métiers : guide de montagne ajouté, `V` sur comptable, guide, agriculteur ; logisticienne → 157 colis / camionnettes de 6. `V` de la logisticienne et de la réalisatrice à mettre après leurs HD. Pas commité.
- Leçons 12/11 : un morceau fait d'un NOMBRE SEUL : un play à part + `au_mot` explicite (sinon il suit le morceau d'avant, trop tôt). Un Text attend son DERNIER mot : couper « 386, | c'est presque » sinon 386 arrive tard. Un affichage 0,1 s AVANT la dernière occurrence d'un nombre compte comme « TARD » (contre l'occurrence d'avant) : viser l'extrait exact (`("1.", 2)`). Les choix redits dans la réponse : `_pas_audit` seul (garder la synchro). `ecrire(..., autres={k: [...]})` : animations liées à CHAQUE morceau. `GRIS` n'existe pas dans `calcul_pose_commun` (le définir).

- ✅ 12/11 soir (quota 91 %, « finir 3 à 5 vidéos ») : **HD 04 division** (241,7 s) et **HD 05 vérifier** (247,4 s) rendus, bords 0, planches HD relues (05 : l'ancien « 354 » restait sous le « 344 » au -ql, corrigé avant le HD). **Shorts 03, 04, 05 filmés + miniatures**, planches relues (03 refilmé : « d u » seuls au défi, `entetes:false` ; « × 10 = 200 » aéré). Les 9 vidéos 01-05 sont finies, sauf le short 02.

## Reste, dans l'ordre (samedi 14/11, 9 h)
1. Short 02 : `node scripts/ti-margo-short.mjs calcul-pose soustraction film`, puis `… miniature`, planche du mp4 (`python scripts/ti-margo-planche.py <mp4> <png> 24`).
2. `V` logisticienne + réalisatrice dans `lib/matrice/metiers-college.ts` (`entier_calcul_pose`).
3. Aperçu `manim/sorties/apercu-calcul-pose.html` : ajouter 02-05 (paysage + short, sans autoplay). Durées : 04 241,7 s, 05 247,4 s, 03 244,2 s.
4. Faire écouter à Frédéric ; ensuite seulement manifeste, R2, coach.
- ⛔ Poste partagé : avant chaque rendu lourd, lignes de commande des processus : rendre seulement si aucun `manim render` ne tourne.
