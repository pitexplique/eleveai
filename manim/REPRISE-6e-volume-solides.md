# Reprise — série VOLUME ET SOLIDES de la 6e (11 micros)

Plan : `manim/PLAN-perimetre-aire-volume.md`, section « ## 6E », blocs « Volume et contenance » (6) et « Solides et espace » (5). Banques : `lib/tutor-v4/questionBank/6e/maths/volumes.bank.ts` (notion `volume_solide`) et `vision-espace.bank.ts` (notion `vision_espace`). Fiches : `lib/fiches/maths-6e-volumes.tsx`, `maths-6e-vision-espace.tsx` (mêmes exemples : 3 × 6 = 18, 8 + 4 = 12, cube de 3 → 27 cm³, pavé 4 × 3 × 2, pyramide 9 + 4 + 1, cube peint 3 × 3 × 3).
Paysage en Manim, short en DESSIN ANIMÉ Ti Margo (6e < 4e). Voix validée À DEUX avant tout rendu. Commit PAR CHEMIN, jamais de push.

## Inventaire (15/11) : ce que couvrent déjà le CE2, le CM1 et le CM2
- En CE2 et CM1, « Volume et contenance » ne traite que des contenances (L, dL, cL) : aucune vidéo sur le cube unité, le cm³ ou le m³.
- Le CM2 (contenance, solides, longueurs) est en production dans une autre session ; il ne fait ni cm³, ni vues, ni perspective, ni cube peint.
- Ce qui sert déjà : `cm1-solides-defi` (Ilan : cubes cachés, étage par étage, pavé 4 × 3 × 2) et `cm1-solides-patron` (Rose : 11 patrons du cube, patrons du pavé, de la pyramide et du cylindre).

| Micro 6e | Couverte par | Décision |
|---|---|---|
| `volume_unite` | rien | vidéo 6e `6e-volume-unite` |
| `volume_compter` | en partie par `cm1-solides-defi` (en cubes, pas en cm³ ni en L × l × h) | vidéo 6e `6e-volume-compter` + `aussi` depuis `cm1-solides-defi` |
| `volume_comparer` | rien | vidéo 6e `6e-volume-comparer` |
| `volume_assemblage` | rien | vidéo 6e `6e-volume-assemblage` |
| `volume_lire` | — | ↪ `6e-volume-unite` par `aussi` (son écran 04 « Lire un volume » : 18 cm³ = 18 cubes de 1 cm³) |
| `volume_defi` | rien | vidéo 6e `6e-volume-defi` |
| `vision_vues` | rien | vidéo 6e `6e-vision-vues` |
| `vision_denombrer` | `cm1-solides-defi` | ↪ `cm1-solides-defi` par `aussi` (+ la pyramide 16 + 9 + 4 + 1 est dans `6e-vision-defi`) |
| `vision_representation` | patrons seulement (`cm1-solides-patron`) | vidéo 6e `6e-vision-representation` (perspective cavalière, main levée) + `aussi` depuis `cm1-solides-patron` |
| `patron_pave_dimensions` | rien (le CM1 montre la forme du patron, pas les mesures des faces) | vidéo 6e `6e-vision-patron-pave` |
| `vision_defi` | rien | vidéo 6e `6e-vision-defi` |

⇒ 9 paysages + 9 shorts à produire ; 2 micros branchées par `aussi` seulement.
⛔ Les `aussi` vont dans `manim/manifeste-youtube.json`, qui a des modifs NON commitées d'autres sessions : ne rien y écrire tant qu'on n'est pas sûr de ne toucher qu'à nos entrées (relire juste avant, upsert de nos clés, vérifier le diff). Format (comme les solides CE2) : `"aussi": [{"classe": "6e", "notionId": "vision_espace", "microId": "vision_denombrer"}]` ajouté aux entrées `cm1-solides-defi(-short)` ; `{"classe": "6e", "notionId": "volume_solide", "microId": "volume_compter"}` aussi sur `cm1-solides-defi` ; `{"classe": "6e", "notionId": "vision_espace", "microId": "vision_representation"}` sur `cm1-solides-patron(-short)` ; `{"classe": "6e", "notionId": "volume_solide", "microId": "volume_lire"}` sur `6e-volume-unite(-short)`.

## Les 18 voix (`manim/voix/6e-volume-*.json`, `6e-vision-*.json`) — ✅ VALIDÉES par Frédéric le 15/11/2026 (« Oui, valide les 18 »), ceintures comprises ; ⛔ ne plus les retoucher sans lui
| Ép. | Micro | Fichiers | Métier (matrice) | Questions paysage | Short (réponse) | Ceinture (proposée) | Centres (proposés) |
|---|---|---|---|---|---|---|---|
| V1 | `volume_unite` (+ `volume_lire`) | `6e-volume-unite(-short)` | Mathis, maître-nageur (piscine 300 m³) | B, A | boîte à trésors de 20 cm³ = 20 cubes : C | jaune | natation, sport ; short jeux-defis |
| V2 | `volume_compter` | `6e-volume-compter(-short)` | Yanis, logisticien (remorque 8 × 4 × 3 = 96) | C, B | bloc de sucres 4 × 2 × 3 = 24 : C | verte | transports ; short cuisine |
| V3 | `volume_comparer` | `6e-volume-comparer(-short)` | Léna, ingénieure de l'eau (cuves ; ⭐ seule mention de La Réunion des 18 voix) | A, C | tour de 10 contre bloc 3 × 2 × 2 : B | jaune | nature-ecologie, sciences ; short construction |
| V4 | `volume_assemblage` | `6e-volume-assemblage(-short)` | Manon, menuisière (maquette d'armoire 24 + 4 − 2 = 26) | A, B | château 18 + 7 = 25 : C | jaune | construction, art-design ; short jeux-defis |
| V5 | `volume_defi` | `6e-volume-defi(-short)` | Clara, pâtissière-chocolatière (manque 7 ; 36 ÷ 12 = 3 couches ; 27 − 24) | B, A | 48 glaçons, bac 6 × 4 : 2 bacs : C | bleue | cuisine ; short cuisine |
| S1 | `vision_vues` | `6e-vision-vues(-short)` | Samuel, architecte (pavé 4 × 3 × 2 : face 8, droite 6, dessus 12 ; escalier) | A, B | drone au-dessus de 2 tours de 5 : 2 carreaux : A | jaune | art-design, construction ; short technologie-ia |
| S2 | `vision_representation` | `6e-vision-representation(-short)` | Lina, animatrice 3D (face avant vraie grandeur, traits en biais, 3 pointillés ; 2 vrais carrés) | A, C | « c'est un carré, ton truc » : traits en biais : C | verte | cinema-series, dessin-manga ; short dessin-manga |
| S3 | `patron_pave_dimensions` | `6e-vision-patron-pave(-short)` | Jeanne, designer d'emballages (céréales 20 × 8 × 30 ; chaussures 30 × 20 × 10) | B, A | couvercle d'une boîte 10 × 6 × 4 : 10 sur 6 : C | verte | art-design ; short art-design |
| S4 | `vision_defi` | `6e-vision-defi(-short)` | Enzo, dessinateur-projeteur, escape game (plan coté 8 ; pyramide 14 et 30 ; cube peint 8 + 12 + 6 + 1 ; défi 4 × 4 × 4 → 8) | A, B | gâteau 3 × 3 × 3 au chocolat : 8 coins : B | bleue | jeux-defis, sciences ; short cuisine |

- Places des bonnes réponses tirées au hasard (graine 1511) : 9 A, 9 B, 9 C ; jamais deux fois la même lettre de suite dans une paysage ; leurres = erreurs typiques (petit 3 compté comme × 3, additionner au lieu de multiplier, une seule couche, juger à la hauteur, colonnes ≠ cubes, cm² au lieu de cm³, côté au lieu du dessus).
- Shorts : ceinture blanche, 1 question-pause (3 s), question chiffrée en commentaire (V1 : 23 ; V2 : 30 ; V3 : le bloc, 16 > 15 ; V4 : 21 ; V5 : 7 ; S1 : 10 ; S2 : 12 ; S3 : 5 sur 3 ; S4 : 12), fin courte « éleveai point f r ».
- Métiers : 6 pris dans `npx tsx scripts/metiers-pour-video.ts 6e volume_solide|vision_espace` (aucun n'était `V`) ; la matrice n'en avait que 6 pour 9 vidéos : 3 liens ajoutés le 15/11 dans `lib/matrice/metiers-college.ts` (`menuisier` F et `patissier` F à `volume_solide`, `designer-emballage` F à `vision_espace`). 5 filles, 4 garçons ; aucun prénom repris du CE2, du CM1 ou du CM2. ⏳ À la production : marquer `V` sur les 9 liens.
- Clés : paysage `00-garde … 10-abonne` (11-abonne pour V1, V4, S4 ; 12-abonne pour S2, qui a un écran patron) ; short `00-accroche, 01-…, 02-question, 02b-reponse, 03-ouf, 04-commentaire, 05-abonne`.

## Prochaine étape : production (voix validées le 15/11)
UNE session de production, dans l'ordre V1 → V5 puis S1 → S4 :
1. WAV (Julie, débit −6 : `scripts/generer-voix.ps1 -Fichier … -Debit -6`) dans `public/sons/6e-<ep>[-short]/` ; marques mot à mot (copie de `manim/scripts/cm2/aire_marques_cm2.py` adaptée aux noms `6e-volume-*` / `6e-vision-*` ; ⛔ jamais sans argument).
2. Scripts `manim/scripts/6e/volume_<ep>.py` et `vision_<ep>.py` ; commun à écrire en réutilisant `manim/scripts/ce2/solides_ce2_commun.py` (`Solide` en cavalière, arêtes cachées en pointillés, `cube`, `pave`, `Patron`) ; identité « Maths 6e — EleveAI ». En tête : mapping micro → écrans et ceinture.
3. Chaîne : dry run `AUDIT=1 BORDS=1` (0 AUDIT-AVANCE, 0 RETARD, 0 BORD) → aperçu `-ql` relu image par image → UN SEUL rendu HD à la fois sur le poste, sous le verrou partagé `%TEMP%\eleveai-rendu-hd.lock`, rien sous 2,5 Go de mémoire libre → `python scripts/verifier-bords-video.py <mp4>` = 0. Sorties `manim/sorties/6e/maths/volume/0N-<ep>/` et `manim/sorties/6e/maths/vision-espace/0N-<ep>/`.
4. Shorts Ti Margo : séries `prototypes/ti-margo/films/6e-volume.json` et `6e-vision.json` (moteur 3D à copier de `ce2-solides.js` : `cav`, `polyedre`, `plierPatron`), miniatures « Dessin animé ».
5. Miniatures paysage, manifeste (dates après les séries en cours ; 1 paysage + son short par jour ; `questions`, `centres`, `aussi`), fiches YouTube, R2, `node scripts/generer-videos-r2.mjs` (ne garder que nos clés), coach `node scripts/brancher-videos-coach.mjs --classe 6e --notion volume_solide|vision_espace --ecrire`.
6. Cocher le plan, marquer `V` dans la matrice, commit PAR CHEMIN, jamais de push.

## Production (session du 15/11) — état et passation
- ✅ WAV des 18 voix (`public/sons/6e-<volume|vision>-<ép>[-short]/`) ; ✅ marques : `python manim/scripts/6e/volume_marques_6e.py volume:unite … vision:defi` (nouveau script, 0 introuvable) → `manim/scripts/6e/<notion>_<ép>_marques.json`.
- ✅ Commun `manim/scripts/6e/volume_6e_commun.py` (importe solides_cm1_commun ; personnages des 9 métiers ; cm3, vue_grille, fleche_cote ; base `PaysageVolume6e`).
- ✅ V1 `manim/scripts/6e/volume_unite.py` (`VolumeUnite6e`) : dry run = 0 alerte (15 écrans) ; ⏭ aperçu -ql (`bash <outils>/ql.sh volume_unite VolumeUnite6e`) à relire image par image (leçons : `hors_audit` pour un nombre déjà dit, extrait d'`aux_extraits` qui COMMENCE par le nombre, l'audit compare au 1er nombre dit de la clé).
- Outils (verrous, attente 2,5 Go) et brief des agents : dossier de notes de la session `local_6a9eedad…`, `outils/` (dry.sh, ql.sh, images.sh, hd.sh) et `BRIEF-paysages.md` ; rapports des agents `rapport-<fichier>.md`, shorts `shorts.md`.
- ⏳ En cours (agents de cette session) : V2-V3, V4-V5, S1-S2, S3-S4 (script → dry 0 → -ql relu → HD sous verrou → bords 0) ; 9 shorts Ti Margo (`prototypes/ti-margo/films/6e-volume*`, `6e-vision*`).
- ✅ Écrits, pas lancés : `manim/passe_volume_6e.py` (modes temps, voir, manifeste, aussi ; `DATES` à remplir) et `manim/miniature_volume_6e.py`.
- ⛔ Dates : CM2 23/03 → 05/04/2027, Périmètre 6e 06-07/04, Aire 6e 08 → 11/04 (notes `local_c6fb8250…/DATES-perimetre-6e.md`) ⇒ Volume / vision 6e À PARTIR DU 12/04/2027, 1 paysage + son short par jour (V1 12/04 … S4 20/04).
- ⏭ Reste : V1 dry 0 → -ql relu → HD ; vérifier les 8 HD des agents et les 9 shorts ; miniatures ; `passe temps`, `voir`, DATES, `manifeste`, `aussi` (diff : nos seules entrées) ; `python scripts/fiches-youtube.py 6e-volume-` et `6e-vision-` ; vignettes ; R2 (nos dossiers) ; `generer-videos-r2.mjs` (garder nos clés seules) ; coach (`brancher-videos-coach.mjs --classe 6e --notion volume_solide|vision_espace --ecrire`) ; plan coché ; `V` sur les 9 liens de `lib/matrice/metiers-college.ts` ; commits par chemin.
- ⛔ 15/11 (chef d'orchestre) : AUCUN sous-agent ne rend (ni dry run, ni -ql, ni HD, ni film Ti Margo). Les agents ont reçu l'ordre d'écrire seulement. C'est la session de production qui lance tout, UNE vidéo à la fois, sous verrou, avec ≥ 2,5 Go libres. Ordre : V1 → V5, S1 → S4 (dry → -ql relu → HD → bords), puis les shorts (contrôle → film → miniature).
- ✅ V2 `volume_compter.py` (`VolumeCompter6e`) et V3 `volume_comparer.py` (`VolumeComparer6e`) écrits par agent, compilent ; JAMAIS lancés (dry run, -ql, HD à faire). Points à surveiller : rapports `rapport-volume_compter.md`, `rapport-volume_comparer.md` du dossier de notes.
- ✅ S1 `vision_vues.py` (`VisionVues6e`), S2 `vision_representation.py` (`VisionRepresentation6e`), S3 `vision_patron_pave.py` (`VisionPatronPave6e`), S4 `vision_defi.py` (`VisionDefi6e`) écrits par agents, compilent, JAMAIS lancés. Rapports `rapport-vision_*.md` du dossier de notes. ⚠️ `Empilement.shift` ne recale pas `pp()` (bug du commun CM1) : après un shift, recalculer `emp._dec` ou construire avec `centre=`.
- V1 aperçu -ql relu (planches `%TEMP%/v6pl_volume_unite/p0-2.png`) : ⏭ DÉFAUTS À CORRIGER avant HD :
  1. 01-situation : « maître-nageur » (sous Mathis) touche « La dose dépend… » → lignes l1, l2, q à x = −2,6 (ou plus bas).
  2. 02-cube-unite : « On l'écrit1 cm³ » collé (buff) ; la flèche « le petit 3 » passe sur « cm³ » (mettre « le petit 3 » à droite de cm³, flèche courte vers l'exposant) ; « hauteur » chevauche l'arête gauche du cube, « largeur » trop bas.
  3. 05b-reponse : la 1re ligne verte « 24 cm³, ce sont 24 cubes de 1 cm³. » passe sur la carte C → lignes plus courtes (couper en 2) ou fs 28.
  4. 06-metre-cube : bug `Empilement.shift` → la cote « 1 m » et le pointillé « poitrine » sont sous l'enfant, pas sous le cube ; enfant énorme. Construire le grand cube avec `centre=` (pas de shift), enfant ≈ 1,5 × la hauteur du cube et à côté, pointillé à la hauteur du haut du cube ; Mathis + piscine moins serrés.
  5. 09b-correction : « 8 cm³ = 8 petits cubes de 1 cm³ » : morceaux pas sur la même ligne de base (aligner par le bas, `align_to(…, DOWN)`).
  Le reste (garde, 03, 04, 05, 07, 08, 09, 10, 11) est propre. Puis dry run 0 → HD.
- ✅ V4 `volume_assemblage.py` (`VolumeAssemblage6e`) et V5 `volume_defi.py` (`VolumeDefi6e`) écrits par agent, compilent, JAMAIS lancés (rapports `rapport-volume_assemblage.md`, `rapport-volume_defi.md`). Vérificateur des extraits au_mot sans manim : `python <outils>/verif_extraits.py <script.py> <voix.json>`. ⇒ Les 9 scripts paysage existent ; chaîne dry → -ql relu → HD à faire, UNE vidéo à la fois.
- ✅ Shorts : 9 films écrits par agent (`prototypes/ti-margo/films/6e-volume{.json,-cues.js,.js,-<ép>.js}`, `6e-vision…` ; moteur 3D recopié dans 6e-volume.js et 6e-vision.js, miniature « Dessin animé », ceinture blanche, cues calculés) ; testés sans navigateur (`node <outils>/sec.mjs 6e-volume unite`), JAMAIS rendus. Temps des questions et commandes : `shorts.md` du dossier de notes. ⏭ Pour chaque short, une commande à la fois, ≥ 2,5 Go : `CONTROLE=<dossier> node scripts/ti-margo-short.mjs 6e-volume <ép> controle t…` (relire), `film`, `miniature`, supprimer `_muet.mp4`.

## Production (session du 15/11, 2e session, `local_1fe38bbd…`) — avancement
- Commun : `ligne()` pose les morceaux sur la même ligne d'écriture (`base_ecriture`) ; `Empilement` du 6e = celui du CM1 dont `shift` (donc move_to, next_to, align_to) recale `_dec` ⇒ le bug `Empilement.shift` est corrigé pour les 9 scripts (⚠️ un `.animate.shift` ne recale toujours pas `pp()`).
- ✅ V1 : 5 défauts corrigés + dessin à gauche des 2 questions (bloc 24 cm³ et cube de 1 cm³ ; Mathis et la piscine) ; enfant de 1,4 m aux vraies proportions (`enfant_debout`) ; dry 0, -ql relu, HD `manim/sorties/6e/maths/volume/01-unite/eleveai-maths-6e-volume-unite.mp4`, bords 0.
- Commun (suite) : `rep_bas` met au moins une vraie espace entre les morceaux (on lisait « 3 couches :3 × 5= 15 »).
- ✅ V2 : HD `manim/sorties/6e/maths/volume/02-compter/eleveai-maths-6e-volume-compter.mp4`, bords 0, relu (cote « hauteur », RETARD « sont cachés », couche soulevée plus haut au piège, ordre de dessin remis après `Indicate` : `self.add(bas, haut)`).
- ⏳ V3 `volume_comparer.py` : corrections faites (Transform 0,45 s ; noms « le carton / la boîte » sans synchro ; calculs « 5 × 2 = 10 » / « 10 × 2 = 20 » morceau par morceau : le 10 de la 2e ligne avec « = 10 », le « × 2 » à l'extrait QUI COMMENCE par le nombre « 2, 20 » ; « Cuve k » attend 0,32 s ; groupes `hors_audit` avant le rangement). ✅ dry run = 0 alerte (fini après la passation) ; ⏭ -ql relu → HD → bords.
- Leçons : un « × 4 » posé à « fois 4 » arrive AVANT le 4 (l'audit le voit comme TARD par rapport à un 4 plus ancien) → extrait qui commence par le nombre (« 4, 24 ») ; `au_mot(ex, n)` = n-ième occurrence dans TOUTE la clé ; un `Indicate` sur un sous-groupe de cubes le met au premier plan (re-`add` dans l'ordre ensuite).
- ⏭ Ensuite : V4, V5, S1 → S4 (même chaîne), puis shorts, miniatures, passe (DATES 12/04 → 20/04/2027), fiches, R2, coach, plan, matrice.
- Dates confirmées : 12/04 → 20/04/2027 (CM2 23/03 → 05/04, Périmètre 6e 06-07/04, Aire 6e 08 → 11/04).
- Planches : `bash <outils>/planche.sh <dossier v6pl_…> "e01b.png e02b.png …" r` (2 × 3, tuiles 854 × 480).

## Production (3e session, 15/11 matin, `local_4bc5a7db…`) — avancement et passation
- Outil maison : `bash <notes local_4bc5a7db…>/hd2.sh <fichier> <Scene> <nom> <dossier>` = attend qu'AUCUN `manim render -qh` ne tourne (la session CM2 rend sans verrou !) puis `hd.sh` (verrou + 2,5 Go + bords).
- ✅ V3 comparer : choix à fs 27 (la coche touchait) ; HD `volume/03-comparer/`, bords 0, relu.
- ✅ V4 assemblage : TARD 06 (« bloc de 20 », « la niche : » puis « 6 cubes » à son extrait), RETARD 08b (calcul en 3 morceaux), 09 « Manon creuse… » (sans « Puis »), 04 étiquettes 18 / 12 cm³ écartées au collage ; HD `volume/04-assemblage/`, bords 0.
- ✅ V5 defi : 02 « Deux couches » fs 30 + insister 1,06 ; 05b « Une couche : 5 × 2 = 10. » ; HD `volume/05-defi/`, bords 0.
- ✅ Miniatures V1 → V5 + S1 (`python manim/miniature_volume_6e.py`), relues. ✅ `DATES` remplies dans `manim/passe_volume_6e.py` (12/04 → 20/04/2027).
- ⏳ S1 vues : bug `c in (UL, DL)` corrigé ; 8 défauts de place corrigés (01, 02, 03, 04, 05b, 06, 08b, correction) ; `sans_synchro` sur les 2 lignes de 05b posées par au_mot ; choix de la question 2 sans « un/une » et à fs 23 (la carte de la bonne réponse rogne le texte à 0,6 du bord : sous fs 23 la coche touchait). HD relancé à 09:25 (tâche de fond de la session précédente) : ⏭ vérifier `vision-espace/01-vues/…mp4` (bords 0, image à 148,4 s : la coche ne touche plus), sinon relancer `hd2.sh vision_vues VisionVues6e eleveai-maths-6e-vision-vues manim/sorties/6e/maths/vision-espace/01-vues`.
- ⏳ S2 representation : BORDS corrigés (03 l5 fs 28 ; 04 l3 fs 26 x 0,2 ; 06 l1-l3 fs 28 ; 07 l1, l4 fs 27), TARD 05-question corrigé (avant_q en un seul play 0,3 s). Un dry était en cours à la passation (attente RAM) : ⏭ relancer `dry.sh vision_representation VisionRepresentation6e` → 0 → -ql relu → HD.
- ⏭ Puis S3, S4 (dry → -ql relu → HD), miniatures S2-S4, 9 shorts Ti Margo (`shorts.md`), passe (`temps`, `voir`, `manifeste`, `aussi`), fiches YouTube, R2, `generer-videos-r2.mjs` (nos clés seules), coach, plan coché, `V` sur les 9 liens. Leçon : choix longs → fs ≤ 25 dès l'écriture.
- ⛔ Frédéric (15/11, via le chef d'orchestre) : « fait attention au compteur dans les shorts ». Avant TOUT film HD d'un short : le compteur du défi (chrono, compte à rebours, score) a des chiffres lisibles, ne chevauche rien, ne sort pas de l'écran, tombe juste et suit la voix, ne saute ni ne fige (le vérifier au contrôle image par image).

## Production (4e session, 15/11 fin de matinée, relève de `local_344fdb1e…`) — avancement
- Commun : `PaysageVolume6e._carte_choix` réserve 0,85 à droite de la carte pour la coche (cause du défaut S1 : `_carte_choix` réduit tout choix long à la largeur de la carte, le `fs` n'y change rien, puis la coche est ramenée vers le centre par `scale(1/1.08, about_point=centre)` et retombe sur la fin du texte). Vaut pour S1 → S4 ; V1 → V5 déjà rendues, non touchées.
- ✅ S2 representation : 03 (l2, l3 fs 29 ; « Ils sont plus courts » / « que la vraie arête : » posés chacun à son extrait ; rotation 0,6 s, Indicate fondu dans l5), 02 l2 fs 30, 04 « Pour un cube » calé à x 0,4, 07 « Face avant, face arrière : / leur vraie forme. » sur 2 lignes (2e muette), 08b réponse en 4 lignes fs 28 depuis y −1,3 (ne touche plus la carte C), correction « 2 » à droite de son trait, finale fs 28 (ne touche plus Ti Margo). Dry 0, -ql relu. HD `vision-espace/02-representation/`, bords 0.
- ✅ S1 vues : HD refait avec la coche réservée (image 148,4 s : la coche ne touche plus « carreaux »), bords 0.
- Compteur des shorts (consigne de Frédéric) : la barre de rebours (`short.js`, 3 s de `fin(02-question) + 0,1`) tient dans la pause de 3,3 s (`baseFilm`, 6e-volume.js et 6e-vision.js) ; les comptes écrits (`prog`) sont à relire au contrôle image par image.
