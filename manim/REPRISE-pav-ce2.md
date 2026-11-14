# Reprise — série PÉRIMÈTRE → CONTENANCE → SOLIDES du CE2

Plan : `manim/PLAN-perimetre-aire-volume.md` (section « ## CE2 »). Vidéos COMMUNES : la session CM1 les relie par `aussi`.
⛔ Les 6 voix (paysage + short des épisodes 01, 02, 03) sont VALIDÉES par Frédéric le 13/11 : ne pas les redemander.
Ceintures : paysages 01 blanche, 02 jaune, 03 orange ; shorts blanche. Centres : 01 nature-ecologie + animaux, 02 nature-ecologie, 03 sport.

## État au 13/11 15 h, session 3 : ÉPISODES 01-03 FINIS

| Épisode | Paysage | Short |
|---|---|---|
| 01 comprendre | ✅ HD re-rendu (3 min 44, « + 3 » de Q1 calé sur le 3 dit), bords 0, planche relue, miniature « EN 4 MIN » | ✅ |
| 02 polygone | ✅ HD (3 min 55), bords 0, planche relue (Q2 : A sur 2 lignes, cartes pleine largeur ; ligne Sofia sous la figure), miniature | ✅ « La guirlande de ma cabane », planche + miniature relues |
| 03 comparer | ✅ HD (4 min 13), bords 0, planche relue (réponse Q2 sous la carte C, « On fait pareil » à taille normale), miniature | ✅ « La course des tables », miniature : titre sur 2 lignes |

✅ Manifeste : 6 entrées `ce2-perimetre-*` (25, 27, 29/12), fiches YouTube écrites, 12 fichiers sur R2 (`ce2/maths/perimetre/`), `lib/videos/videos-r2.json` + `bilans-videos.json` (nos clés ; les 2 anciennes clés auto `maths-ce2-perimetre-comprendre[-short]` remplacées) — commit `d570dc8b`. Plan coché (CE2 01-03). Rien poussé.
✅ Poussé (origin/main `541042bd`) ; coach : les 6 vidéos sont branchées sur leurs micros (`brancher-videos-coach.mjs --classe ce2 --notion perimetre --tout` : 6 déjà branchées, 0 à brancher).

⛔ Leçons session 3 :
- Filtrer la sortie du dry run avec `tr '
' '
' | grep -a …` : sans `tr`, les barres de progression collent les lignes et des AUDIT passent inaperçus.
- À 15 images/s, `au_mot` peut finir 0,06 s AVANT la marque → AUDIT-TARD/AVANCE : ajouter `self.wait(0.07)` après.
- Nombres répétés (« 3 plus 3 plus 3 ») : la synchro par jetons s'y perd → caler chaque morceau sur un extrait qui COMMENCE par son nombre (« 3, 12. », « 1 plus 9 »), pas sur « Plus 3 » (sinon affiché avant le nombre). `somme(..., mots=[...])` dans perimetre_comparer.py, `somme_au_mot(..., res_mot=)` dans perimetre_polygone.py.
- Marques manquantes (TTS) : ex. « 3 plus 3 » du 02 correction → hors_audit justifié en commentaire.
- `self.XL` abaissé sur une question-pause peut RÉTRÉCIR les cartes (02 Q2) : vérifier sur la planche ; mieux vaut un choix sur 2 lignes (`chr(10)`).
Outils hors dépôt (scratchpad de la session 3, à recréer si perdus) : `hd.sh` (verrou mkdir `C:/Users/FRED/AppData/Local/Temp/eleveai-rendu-hd.lock` + rendu), `images.py <mp4> <png> t1 t2…` (images à des instants, PyAV).
⛔ `planche-video.py` ne garde que la DERNIÈRE image de chaque écran : regarder aussi 2-3 instants au milieu (`images.py`). Le `_muet.mp4` laissé par `ti-margo-short.mjs film` dans le dossier de sortie : le supprimer avant R2.

### Outils faits en session 2
- Commun `perimetre_ce2_commun.py` : `ligne_somme(prec, reste)` (le nombre déjà dit hors synchro), `au_fil(lg, debut)` (chaque morceau à son nombre).
- Leçons de l'audit : une ligne « 13 + 8 = 21 » montrée à « Plus 8 » → TARD sur 13 : écrire `13` hors_audit + `+ 8` + `= 21` en morceaux séparés (la synchro attend sinon le résultat et affiche « + 8 » en retard → AUDIT-TARD). Dans `rep_bas`, mettre `buff=0.3` quand un morceau finit par une virgule (sinon on lit « 8,8 »). Un texte qui contient un mot dit plus tard (« le jardin », « départ ») fait attendre la synchro → RETARD : le poser à ce mot.
- Shorts : `films/ce2-perimetre.json`, `films/ce2-commun.js` (COPIE de cm1-commun.js : page.html charge `<préfixe>-commun.js`), `films/ce2-perimetre-cues.js` (3 épisodes). Dans `voixDe.mot`, un « 6 plus » compte pour un « plus » : prendre `mot(clip,'Plus',2)`. En mode `controle`, les textes des choix A/B/C sont vides pendant la réponse si on saute directement : artefact du contrôle seulement.
- `manim/miniature_perimetre_ce2.py` (ceinture par épisode) ; `manim/passe_perimetre_ce2.py` (`temps [slug]`, `voir`, `manifeste` ; dates 25/12, 27/12, 29/12 vérifiées libres ; lien coach seulement, pas de fiche CE2) ; aperçu séparé `manim/sorties/apercu-perimetre-ce2.html` (6 vidéos, sans lecture auto).
- `$TEMP/claude/mots.py` (hors dépôt) : mot@instant d'un clip, pour caler les `au_mot`. À recréer si besoin : lit `manim/voix/ce2-perimetre-<slug>.json` et `manim/scripts/ce2/perimetre_<slug>_marques.json`.

## Reste
1. Suite du plan CE2 : `ce2_perimetre_rectangle`, `ce2_perimetre_defi`, puis contenance et solides (voix à écrire et à faire valider À DEUX).

⛔ RAM : un seul rendu HD sur le PC (verrou), aperçus `-ql`, rien sous 2,5 Go libres, un seul processus manim à soi, aucun sous-agent qui rend.

## Session 4 (14/11) : ÉPISODES 04 rectangle et 05 défi — passée la main à 67 %
✅ Les 4 voix VALIDÉES par Frédéric le 14/11 (« Oui, valide ») : `manim/voix/ce2-perimetre-{rectangle,defi}[-short].json`. Ne pas les redemander.
Ceintures validées avec : paysage 04 ORANGE, paysage 05 BLEUE, short 04 JAUNE, short 05 ORANGE.
Métiers / centres : 04 Kenza couturière (art-design) ; short 04 potager de Mamie (nature-ecologie) ; 05 Zoé soigneuse en refuge (animaux) ; short 05 scène de danse (musique).
Bonnes réponses : 04 Q1 C (05-question), Q2 B (08-question) ; short 04 A ; 05 Q1 C (04-question), Q2 A (07-question) ; short 05 B.
✅ WAV (Julie, débit −6) dans `public/sons/ce2-perimetre-{rectangle,defi}[-short]/` ; marques `perimetre_{rectangle,defi}_marques.json` (0 introuvable).
✅ Commun : `aux_extraits(morceaux, extraits)` (chaque morceau à SON extrait, (texte, n, délai)), `somme_lg(...)`, `codes(fig)` ajoutés à `perimetre_ce2_commun.py`.
✅ `perimetre_rectangle.py` (`PerimetreRectangleCE2`) : dry run PROPRE (0 AUDIT, 0 BORD, 0 TARD ; seul « 974 »). Questions 01:09 rép 2 (C), 02:35 rép 1 (B). Durée ≈ 4 min 10.
  Aperçu -ql relu une fois ; corrigés ensuite (PAS encore revus en image) : garde (figures plus à droite), 03 (lignes à x=0.4), 06 (rectangle plus petit à gauche), 07 (« un mouchoir carré » plus bas), 09 et 09b (coussin, lignes, encadré à gauche). → refaire un aperçu -ql et le relire avant le HD.
⏳ `perimetre_defi.py` (`PerimetreDefiCE2`) : dernier dry run : seul reste AUDIT-TARD « 24 » de 07b (corrigé : « 24, » seul morceau, à vérifier). Questions 00:53 rép 2 (C), 02:05 rép 0 (A). Pas encore d'aperçu.
⛔ Leçon : la synchro par jetons attend TOUS les mots d'un morceau (« 24, ce serait le tour » attend « tour ») → un morceau = le nombre seul ; et `au_mot("2 mètres")` trouve d'abord « 12 mètres » : prendre « de 2 mètres ». Lancer les dry runs avec `PYTHONIOENCODING=utf-8` (sinon l'audit plante sur « − »).
Outils hors dépôt (à recréer) : `$TEMP/claude/mots.py <slug> <clé>` (mot@instant), `$TEMP/claude/images.py <mp4> <png> t…` (planche 3 colonnes, PyAV).

### Reste (dans l'ordre)
1. Défi : dry run propre → aperçu -ql (media dans $TEMP), planche relue (images à mi-écran ET fin d'écran).
2. Rectangle : nouvel aperçu -ql relu.
3. HD de chacun sous verrou `%TEMP%\eleveai-rendu-hd.lock` (`-qh --disable_caching … --media_dir manim/scripts/ce2/media-per-04 / -05`), sortie `manim/sorties/ce2/maths/perimetre/04-rectangle/` et `05-defi/`, `python scripts/verifier-bords-video.py` = 0.
4. Shorts Ti Margo : `FILMS.rectangle` et `FILMS.defi` dans `prototypes/ti-margo/films/ce2-perimetre-cues.js` + films (modèle des 3 épisodes, `films/ce2-perimetre.json` à compléter), `python scripts/ti-margo-cues.py ce2-perimetre <ép>`, contrôle image par image, miniature « Dessin animé », supprimer le `_muet.mp4`.
5. Miniatures paysage (`manim/miniature_perimetre_ce2.py` : ajouter 04 orange, 05 bleue), `manim/passe_perimetre_ce2.py manifeste` (dates libres après le 29/12), fiches YouTube, R2, `generer-videos-r2.mjs`, coach (`brancher-videos-coach.mjs --classe ce2 --notion perimetre --tout`), plan coché, mémoire `serie-perimetre-ce2.md`.
6. Commit PAR CHEMIN, pas de push.

## Session 5 (14/11 après-midi) : 04 rectangle et 05 défi — passée la main à 73 %
✅ Dry runs PROPRES des deux paysages (0 AUDIT, 0 BORD, 0 TARD ; seul « 974 »).
✅ Aperçus -ql relus image par image (toutes les 3 s), corrigés puis revus : espaces des calculs en morceaux (`buff=0.26` dans `ligne`/`rep_bas` : « 17+ 12= 29 » collait), défi : tortue sous « porte », numéros 1-2 sous les « 3 m », question « Quel est le tour… » descendue (y −2.3, plus sous « Tour : 18 m »), encadré « Il faut 23 m » réduit (fs 32), « Mets pause, et cherche ! » à gauche sous la question (collait Ti-Margo) ; rectangle : calculs de 03 à x 0.9 (collaient « 30 cm »), 04 « Autre façon » à x −0.7, piège « Tom calcule … Faux ! » fs 32 à x −1.5 (touchait le bord), même « Mets pause » à gauche.
✅ HD rectangle FINI (`04-rectangle/eleveai-maths-ce2-perimetre-rectangle.mp4`, `_muet.mp4` supprimé ; bords pas encore vérifiés). ⏳ HD défi LANCÉ à 03:19 sous verrou (`hd.sh`, journal `side-session-notes/local_78d7aa78-…/hd-defi.log`, « fini » à la fin ; sortie copiée dans `05-defi/`).
✅ Shorts : `films/ce2-perimetre-rectangle.js` (`FILMS.rectangle`, « La bordure du potager », ceinture jaune, réponse A) et `films/ce2-perimetre-defi.js` (`FILMS.defi`, « La scène qui brille », ceinture orange, réponse B), json + cues complétés. Contrôlés image par image (réponses coupées en lignes courtes : 64 px). Film rectangle RENDU (`04-rectangle/eleveai-maths-ce2-perimetre-rectangle-short.mp4`) ; film défi + 2 miniatures lancés (vérifier qu'ils existent, sinon `node scripts/ti-margo-short.mjs ce2-perimetre defi film` puis `… <ép> miniature`).
Outils (copiés dans le dossier de notes partagé `side-session-notes/local_78d7aa78-…`) : `hd.sh <fichier.py> <Scene> <nom> <media_dir> <dossier-sortie>` (verrou mkdir), `images.py`, `planche.py <dossier PNG> <sortie> <colonnes>` (planche des PNG de contrôle), `mots.py`.

### Reste (dans l'ordre)
1. Attendre la fin du HD défi (verrou libéré, « fini » dans hd-defi.log) ; `python scripts/verifier-bords-video.py` = 0 ; relire quelques images HD (images.py).
2. Regarder le film défi rendu (images à 10, 20, 58.9 « Musique », 66) et les 2 miniatures short (« Dessin animé ») ; supprimer les `_muet.mp4`.
3. Miniatures paysage (`manim/miniature_perimetre_ce2.py` : 04 orange, 05 bleue), `manim/passe_perimetre_ce2.py manifeste` (dates libres après le 29/12), fiches YouTube, R2, `generer-videos-r2.mjs`, coach (`brancher-videos-coach.mjs --classe ce2 --notion perimetre --tout`), plan coché, mémoire `serie-perimetre-ce2.md`.
4. Commit PAR CHEMIN des vidéos, pas de push ; donner les hashs.

## Session 6 (14/11, 03 h 20-03 h 40) : 04 rectangle et 05 défi FINIS — commit `5965d4a9`
✅ Le « Reste » de la session 5 est fait :
- HD défi fini (3 min 52), bords 0 sur les 2 paysages ; images HD relues (04 : 8 instants, 05 : 8 instants), propres.
- Film du short défi (1 min 18) et 2 miniatures de shorts (« Dessin animé », ceintures jaune / orange) relus ; `_muet.mp4` supprimé.
  `verifier-bords-video.py` ne s'applique pas aux shorts dessin animé (décor plein écran : 75-78 « instants » attendus).
- Miniatures paysage : 04 « LE PÉRIMÈTRE DU RECTANGLE » orange, 05 « UN DÉFI DE PÉRIMÈTRE » bleue (« EN 4 MIN »).
- Manifeste : 4 entrées, 04 le 30/12/2026, 05 le 01/01/2027 (jours libres : ≤ 2 paysages, ≤ 5 vidéos). `passe_perimetre_ce2.py` a maintenant `s_ceinture` (ceinture du short, blanche par défaut) ; titre 04 raccourci à 99 caractères.
- Fiches YouTube (`scripts/fiches-youtube.py ce2-perimetre-`), vignettes webp, R2 (dossiers 04 et 05 + webp de 01-03, par rclone direct : `r2-videos.ps1` plante sous PowerShell 5.1 à cause de l'avis « Config file not found » sur stderr).
- `generer-videos-r2.mjs` : seules les clés `ce2-perimetre-*` gardées dans `videos-r2.json` (le générateur ajoutait des vignettes CM1/1re pas encore sur R2) ; `bilans-videos.json` : nos 4 ajouts.
- Coach : 10/10 vidéos de la notion `perimetre` (CE2) branchées. Plan coché (CE2 périmètre 5/5). Rien poussé.

### Reste
Suite du plan CE2 : contenance, puis solides (voix à écrire et à faire valider À DEUX).
