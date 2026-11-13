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
