# Reprise — série LONGUEURS du CE2 (8 micros)

Plan : `manim/PLAN-perimetre-aire-volume.md` (CE2, « Longueurs et conversions »). Banque : `lib/tutor-v4/questionBank/ce2/maths/longueur.bank.ts` (notion `longueur`).
Chaîne identique à la contenance CE2 : voir `manim/REPRISE-pav-ce2.md` (sessions 7 à 9) pour les outils et les leçons de synchro.
⛔ Interdits de la banque (BO cycle 2) : pas de tableau de conversion, pas de virgule dans les longueurs (« 2 m 50 cm », jamais « 2,50 m »).

## Session 1 (14/11) : 16 voix VALIDÉES par Frédéric (« Oui, valide les 16 », ceintures comprises)
`manim/voix/ce2-longueur-<ep>[-short].json`. ⛔ Ne pas les redemander.

| Ép. | Micro | Métier / centre | Ceinture paysage / short | Bonnes réponses (Q1, Q2 ; short) |
|---|---|---|---|---|
| 01 unités | `ce2_longueur_unites` | Samuel, menuisier (art-design) ; short queue de Ti Margo en km | blanche / blanche | B, A ; C |
| 02 relations | `ce2_longueur_relations` | Nina, entraîneuse d'athlétisme (sport) ; short ficelle du cerf-volant | jaune / blanche | C, B ; A |
| 03 mesurer | `ce2_longueur_mesurer` | Clara, astronome (espace) ; short banane mal posée | jaune / blanche | A, C ; B |
| 04 comparer | `ce2_longueur_comparer` | Lina, biologiste marine (animaux) ; short gecko 1 dm contre 9 cm | orange / jaune | C, A ; B |
| 05 choisir l'unité | `ce2_longueur_choisir_unite` | Karim, pilote d'avion (transports) ; short Mamie à 3 millions de cm | jaune / blanche | B, C ; A |
| 06 estimer | `ce2_longueur_estimer` | Élodie, paysagiste (nature-ecologie) ; short mur mesuré à la queue | jaune / jaune | A, B ; C |
| 07 problème | `ce2_longueur_probleme` | Jules, technicien de concert (musique) ; short corde à sauter | orange / jaune | C, A ; B |
| 08 défi | `ce2_longueur_defi` | Maya, pâtissière (cuisine) ; short skate 6 dm = 60 cm = 600 mm | bleue / orange | B, C ; A |

Réponses : 8 A, 8 B, 8 C sur la série ; jamais deux fois la même lettre de suite dans une vidéo.
Métiers : la matrice (`scripts/metiers-pour-video.ts ce2 longueur`) n'en a que 3 (couturière déjà prise par Kenza, menuisier et entraîneuse pris ici) ; les 6 autres sont à ajouter à la matrice au moment du manifeste. Aucun ne recoupe la série CM1 (Jade, Bilal, Zoé, Sarah, Adam).

### Reste (après le oui de Frédéric)
1. WAV, marques (`perimetre_marques.py longueur:<ep>`), commun `longueur_ce2_commun.py` (règle graduée, mètre ruban, personnages), 8 paysages : dry run propre → aperçu -ql relu → UN HD sous verrou → bords 0 → planche.
2. Shorts Ti Margo : série `ce2-longueur` (json + cues + `films/ce2-longueur-<ep>.js`), miniatures « Dessin animé ».
3. Miniatures paysage, passe manifeste (dates libres après le 24/01/2027), fiches YouTube, vignettes, R2, `videos-r2.json` (nos clés seulement), coach, plan coché, mémoire.

## Session 1, suite (14/11) : passée la main à 65 %
✅ WAV (Julie, débit −6) `public/sons/ce2-longueur-<ep>[-short]/` (16 dossiers).
✅ Marques des 8 paysages : `manim/scripts/ce2/longueur_<ep avec _>_marques.json` (`perimetre_marques.py longueur:<ep>`, 0 introuvable).
✅ Commun `manim/scripts/ce2/longueur_ce2_commun.py` : importe `cm1/longueur_cm1_commun.py` (règle `regle()`, `sur_regle`, `repere`, `crayon_sur_regle`, `ruban`, `rubans_alignes`, `barre`, `accolade`, `etiq` ; ⛔ ne pas utiliser `tableau_conv`) ; ajoute les 8 personnages (samuel, nina, clara, lina, karim, elodie, jules, maya), `planche`, `piece`, `porte`, `fleche_double`, base `PaysageLongueurCE2` avec `aux_extraits`.
✅ 01 unités : `longueur_unites.py` (`LongueurUnitesCE2`, blanche) : dry run propre ; aperçu -ql relu (`$TEMP/lg/ql01`) ; 3 corrections faites APRÈS l'aperçu (phrase « il la mesure » collait le bord droit → textes à x −3.5 ; réponse Q2 en 5 lignes, `sans_audit=(3,)` ; défi : dessins ×1.35, « m km cm » à droite de la question). Dry run relancé à la relève : à vérifier (0 AUDIT, 0 BORD), puis un 2e aperçu -ql rapide de 01 (situation, Q2 réponse, défi) avant le HD.
Questions 01 : 05 rép 1 (B), 08 rép 0 (A).
Outils dans le dossier de notes `side-session-notes/local_a8230a7d-…/` : `hd.sh <fichier.py> <Scene> <nom> <media_dir> <dossier-sortie>` (verrou mkdir), `images.py <mp4> <png> t…` (planche 3 colonnes).
Commande aperçu : `PYTHONIOENCODING=utf-8 python -m manim render -ql manim/scripts/ce2/longueur_<ep>.py <Scene> -o apercu-lg-0N --media_dir C:/Users/FRED/AppData/Local/Temp/lg/ql0N`.

### Reste (dans l'ordre)
1. 01 : dry run propre → aperçu -ql relu → HD sous verrou (`bash <notes>/hd.sh longueur_unites.py LongueurUnitesCE2 eleveai-maths-ce2-longueur-unites manim/scripts/ce2/media-lg-01 manim/sorties/ce2/maths/longueur/01-unites`) → `python scripts/verifier-bords-video.py` = 0 → planche HD.
2. Paysages 02 → 08 sur le modèle de `longueur_unites.py` (et `contenance_*.py`) : un script par épisode (`longueur_relations.py` `LongueurRelationsCE2` jaune, `longueur_mesurer.py` jaune, `longueur_comparer.py` orange, `longueur_choisir_unite.py` jaune, `longueur_estimer.py` jaune, `longueur_probleme.py` orange, `longueur_defi.py` bleue), clés de voix = celles des JSON, bonnes réponses du tableau ci-dessus. Pour chacun : dry run propre → aperçu -ql relu (images toutes les 6 s) → UN HD à la fois (`media-lg-0N`, sorties `0N-<ep>/`).
3. Shorts Ti Margo : série `ce2-longueur` (`prototypes/ti-margo/films/ce2-longueur.json` + `ce2-longueur-cues.js` + `films/ce2-longueur-<ep>.js`, modèle `films/ce2-contenance*.js`), ceintures/réponses du tableau, `python scripts/ti-margo-cues.py ce2-longueur <ép>`, contrôle image par image, miniature « Dessin animé », supprimer `_muet.mp4`.
4. Miniatures paysage (copier `manim/miniature_contenance_ce2.py`), passe manifeste (copier `manim/passe_contenance_ce2.py` ; dates libres après le 24/01/2027, vérifier ; centres du tableau ; `aussi` vers cm1 `longueur_*` si pertinent), fiches YouTube, vignettes, R2 (rclone, voir REPRISE-pav-ce2 session 8 bis), `videos-r2.json` (nos clés seulement), coach (`brancher-videos-coach.mjs --classe ce2 --notion longueur --tout`), ajouter les 6 métiers à la matrice, plan coché, mémoire `serie-longueurs-ce2.md`.
5. Commit PAR CHEMIN, pas de push.

## Session 2 (14/11, à partir de 11 h)
✅ 01 unités : dry run propre (2 TARD corrigés), aperçu -ql relu, HD fini, bords 0. HD relancé (11 h 50) pour mettre « Mets pause, et cherche ! » à GAUCHE (`pause_defi` du commun : à droite, il collait Ti-Margo).
✅ 02 relations : `longueur_relations.py` (`LongueurRelationsCE2`, mètre ruban `metre_ruban()`), aperçu relu (titre = voix, zoom du dm sous la barre, accolade sous le bac à sable), HD fini, bords 0.
✅ 03 mesurer : `longueur_mesurer.py` (`LongueurMesurerCE2`, carte du ciel, `segment_sur_regle`), aperçu relu (choix courts, zoom du défi décalé), HD fini, bords 0.
⏳ 04 comparer : `longueur_comparer.py` (`LongueurComparerCE2`, animaux marins, `avec_ruban`), dry run propre, aperçu -ql RENDU, À RELIRE : `C:/Users/FRED/AppData/Local/Temp/lg/ql04/videos/longueur_comparer/480p15/apercu-lg-04.mp4`.
⏳ 05 choisir l'unité : `longueur_choisir_unite.py` (`LongueurChoisirUniteCE2`, Karim, avion, valise, billet, hublot), dry run PROPRE ; aperçu -ql à faire.
⏳ HD 01 (2e rendu, pause à gauche) en ATTENTE du verrou à la relève (journal `side-session-notes/local_54f81ee5-…/hd-01b.log`, « fini » à la fin) ; s'il n'y a ni « début » ni « fini », le relancer : `bash <notes>/hd-ram.sh longueur_unites.py LongueurUnitesCE2 eleveai-maths-ce2-longueur-unites manim/scripts/ce2/media-lg-01 manim/sorties/ce2/maths/longueur/01-unites`, puis bords.
Passée la main à 72 % de contexte.
Outil : `side-session-notes/local_54f81ee5-…/hd-ram.sh <args de hd.sh>` attend 2,5 Go libres puis lance hd.sh (verrou).
⛔ Synchro : un texte attend TOUS ses mots (« 4 petits traits après le 5 » attend le « 5 ») → couper la ligne en morceaux posés chacun à son mot ; un nombre redit loin du premier → TARD : retirer le nombre du texte ou le poser par `aux_extraits`.

### Reste (dans l'ordre)
1. Relire l'aperçu 04 (`python <notes chef>/images.py <mp4> <png> t…`, toutes les 6 s), corriger, dry run, HD (`hd-ram.sh longueur_comparer.py LongueurComparerCE2 eleveai-maths-ce2-longueur-comparer manim/scripts/ce2/media-lg-04 manim/sorties/ce2/maths/longueur/04-comparer`), bords.
2. 05 : aperçu -ql (`… -o apercu-lg-05 --media_dir C:/Users/FRED/AppData/Local/Temp/lg/ql05`), relu, HD (`media-lg-05`, sortie `05-choisir-unite/`), bords.
3. 06 estimer (Élodie, jaune ; Q A, B), 07 problème (Jules, orange ; Q C, A), 08 défi (Maya, bleue ; Q B, C) : scripts sur le modèle de 01-05 (lire les clés de chaque JSON de voix : les numéros d'écrans changent d'un épisode à l'autre), même cycle. `pause_defi` du commun met « Mets pause » à gauche.
4. Puis le « Reste » de la session 1, points 3 à 5 (shorts Ti Margo `ce2-longueur`, miniatures, manifeste, fiches, R2, `videos-r2.json`, coach, 6 métiers, plan, mémoire).

## Session 3 (14/11, 11 h 55 → 12 h 30) : passée la main à 57 %
⏳ HD 01 (2e rendu, pause à gauche) EN COURS depuis 12 h 03 (journal `side-session-notes/local_54f81ee5-…/hd-01b.log`, « fini » à la fin) → puis `python scripts/verifier-bords-video.py manim/sorties/ce2/maths/longueur/01-unites/eleveai-maths-ce2-longueur-unites.mp4` = 0.
✅ 04 comparer : aperçu -ql relu image par image, 4 défauts corrigés (titre « Pour comparer : la même unité ! » sur une même ligne de base ; Q2 en 3 lignes, le choix C touchait Ti-Margo ; correction : « 3. l'algue » collait Ti-Margo, rubans E 0.022 et bord 5.0 ; bilan : « regarde l'unité ! » sans 2e coche, posé à son mot sous la même coche). Dry run propre, 2e aperçu des écrans corrigés relu. ⏳ HD 04 EN ATTENTE du verrou (journal `hd-04.log`, même dossier ; sortie `04-comparer/`) → bords.
✅ 05 choisir l'unité : aperçu -ql relu (`$TEMP/lg/ql05`), défauts corrigés dans `longueur_choisir_unite.py` : stylo de l'écran 02 sur le titre (→ P(3.6, 1.2)) ; écran 04 repères : textes en 30 et dessins décalés à droite du texte (ils recouvraient « le mètre », « le centimètre », « le millimètre ») ; couloir de la Q1 redessiné (mur du fond, plafond, porte, ligne jaune au sol) ; Q1 en 3 lignes plus courtes (texte trop petit) ; piège : lignes de base de « 2 cm » et « L'unité : fausse ! » ; défi et correction : étiquettes et unités à la même hauteur ; « ≈ 60 cm » → « environ 60 cm », « ≈ 1 mm » → « à peine 1 mm » (la voix dit « environ », pas de ≈ en CE2). Dry run PROPRE (seul « 974 »). ⏳ À FAIRE : 2e aperçu -ql (écrans 02 vers 27 s, 04 vers 60 s, Q1 vers 75 s, piège vers 110 s, défi/correction vers 150-170 s), puis HD : `bash <notes>/hd-ram.sh longueur_choisir_unite.py LongueurChoisirUniteCE2 eleveai-maths-ce2-longueur-choisir-unite manim/scripts/ce2/media-lg-05 manim/sorties/ce2/maths/longueur/05-choisir-unite`, bords.
⏳ 06 estimer : `longueur_estimer.py` (`LongueurEstimerCE2`, Élodie, jaune ; dessins doigt, main, grand_pas, empreinte, feuille, arbre, jardin, allée, banc, mini_ruban) ÉCRIT ; 1er dry run (journal `$TEMP/lg/dry06.log`) à corriger :
- BORD 01-situation : « Pas toujours son mètre ruban… » (x -0.6 → 7.1) et « elle compare à des longueurs qu'elle connaît. » (→ 7.6) débordent à droite : fs plus petit ou couper en 2 lignes (bloc), x plus à gauche.
- AUDIT-TARD 06-piege « 1 » (1 m) 0,57 s : l1[1] « 1 m » à poser par `aux_extraits([...], [("1 mètre de large", 1)])` (ou couper la ligne).
- 08b-correction : TARD « environ » (« environ 10 cm ») 0,5 s et RETARD « 10 fois 10 » 0,66 s : raccourcir les play d'avant (Indicate 0.35 → 0.25), poser « environ 10 cm » à « environ 10 » via aux_extraits.
- 09-finale : TARD 0,9-1,2 s sur « doigt », « main », « grand » : les au_mot visent « 1 centimètre » etc. ; remettre au_mot("un doigt"), ("une main"), ("un grand pas") ET mettre les nombres à part (ou hors_audit des lignes, le « 1 » est déjà vérifié par l'au_mot).
Puis aperçu -ql relu → HD (`media-lg-06`, sortie `06-estimer/`).
Ensuite : 07 problème (Jules, orange ; Q C, A), 08 défi (Maya, bleue ; Q B, C), même cycle ; puis le « Reste » de la session 1, points 3 à 5.
⛔ Leçons : `self.ligne` centre les hauteurs : un morceau sans jambage (« la même unité ! ») descend sous un morceau avec « p », « j » → `m[1].shift(UP * (m[0][0].get_bottom()[1] - m[1].get_bottom()[1]))` (la 1re lettre doit être sans jambage). Une question de 4 lignes fait toucher Ti-Margo au choix C : 3 lignes au plus. Pas de « ≈ » en CE2 : écrire « environ ».

## Session 4 (14/11, 12 h 15 → 13 h 15) : passée la main à 84 %
✅ HD 01 (pause à gauche), 04, 05, 06 FINIS, bords 0 (`01-unites/`, `04-comparer/`, `05-choisir-unite/`, `06-estimer/`). 02, 03 déjà faits. → 6 paysages sur 8 rendus.
✅ 05 : aperçu relu ; corrigé avant HD (avion de la ligne « le mètre » qui touchait « m » : dessin réduit, unités à x 5.8 ; « km » de la correction sur la même ligne de base). Planche HD relue.
✅ 06 : BORD/TARD/RETARD corrigés (bloc 2 lignes, « 1 m de large » par aux_extraits, 08b « 10 mains » / « 10 × 10 » SANS marques → instants mesurés sur le WAV 4,85 / 5,55 s ; finale en 3 morceaux par repère « un doigt, » / « environ » / « 1 cm ; »), « Impossible ! » à côté de la ligne, banc : mains sur le dossier, correction à droite. Aperçu relu 2 fois. HD fait.
⏳ 07 problème : `longueur_probleme.py` (`LongueurProblemeCE2`, Jules ; tenue grise dans le commun, noire elle disparaissait). Dry run PROPRE. Aperçu relu, corrigé (question sous l'accolade, « 300 cm » gras, accolade 550 au-dessus, piège : « Ça ne veut rien dire ! » sous le calcul + câbles à y −1.3, 06b : étiquettes 65/45 posées par `poser`). 2e aperçu -ql RELANCÉ à 13 h 10 → `$TEMP/lg/png/q07d.png` (instants 22 30 43 56 118) À RELIRE, puis HD : `bash <notes longueurs-ce2>/hd-ram.sh longueur_probleme.py LongueurProblemeCE2 eleveai-maths-ce2-longueur-probleme manim/scripts/ce2/media-lg-07 manim/sorties/ce2/maths/longueur/07-probleme`, bords.
⏳ 08 défi : `longueur_defi.py` (`LongueurDefiCE2`, Maya). Dry run PROPRE. Aperçu -ql rendu (`$TEMP/lg/ql08/videos/longueur_defi/480p15/apercu-lg-08.mp4`), relu jusqu'à 78 s ; défauts À CORRIGER :
- 01 : le gâteau (4.8, 0.3) touche « Malia : 1 dm et 2 cm » → le mettre vers (4.2, −1.6), au-dessus de Ti-Margo.
- 03-dm : l'accolade « 12 cm » (`.shift(UP*0.55)`) chevauche « 1 dm = 10 cm » → « 2 cm » en `etiq(b[1], "2 cm", …, RIGHT)` au lieu de l'accolade a2, accolade totale au-dessus sans shift, barre à y 1.4.
- 04b : « = 3 × 10 » s'affiche à 4,1 s (avec « 3 dm ») alors que « 3 fois 10 » est dit à 5,58 s → AVANCE 1,5 s. Cause : la phrase des questions passe par `poser_lignes` de `aire_cm1_commun.py` (un play par LIGNE ; les morceaux coupés d'une ligne partent ensemble), donc `_forces`/`_debut` n'y font rien. Piste : mettre « 3 × 10 » sur sa propre ligne de phrase (["1 dm = 10 cm.", "3 dm =", "3 × 10 = 30 cm."] avec couper {2: ("3 × 10", "= 30 cm.")}) et `_forces` sur « 3 × 10 » (5.58), ou idem 07b (« 200 : » forcé à 5.56, à vérifier à l'image vers 148.4 + 5.6 s).
- Relire ensuite 80 → 225 s (05 ruban, 05b, 06 piège, 07, 08 défi, correction, finale) ; vérifier que les étiquettes « 25 cm » (05b) et « 40 / 35 » (08b) apparaissent (posées par `poser`, un Text ajouté par `add()` attend son nombre et peut rester invisible).
⛔ Marques ajoutées À LA MAIN (TTS sans marque, mesurées sur le WAV) : probleme 05b « 200 plus » 4,12 ; 07b « 100 moins » 3,82 ; 08b « 100 plus » 4,78 ; defi 08b « 25, c'est » 14,20. Ne PAS relancer `perimetre_marques.py` sur ces deux épisodes (ça les effacerait).
⛔ Leçons : la synchro croit « déjà dit » un nombre redit plus de 1,5 s après sa 1re fois → affiché trop tôt : `_forces {(clé, texte): instant}` + override `_attente` / `_debut` (probleme, defi). Un `au_mot("5 centimètres")` trouve d'abord « 25 centimètres » : prendre « manque 5 ». Une étiquette de dessin avec deux nombres (« 3 m = 300 cm ») est découpée en morceaux par la synchro → TARD : une étiquette = un nombre. Outils : `$TEMP/lg/mots.py <slug> [clé…]` (mot@instant), `$TEMP/lg/nrj.py <wav>` (énergie toutes les 50 ms).

### Reste (dans l'ordre)
1. 07 : relire q07d.png, HD, bords. 2. 08 : défauts ci-dessus, dry run, fin de relecture de l'aperçu, HD, bords.
3. Puis le « Reste » de la session 1, points 3 à 5 (shorts Ti Margo `ce2-longueur` ×8 + miniatures « Dessin animé », miniatures paysage, manifeste après le 24/01/2027, fiches YouTube, R2, `videos-r2.json` nos clés, coach, 6 métiers à la matrice, plan coché, mémoire `serie-longueurs-ce2.md`).
