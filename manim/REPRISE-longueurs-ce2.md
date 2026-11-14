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
