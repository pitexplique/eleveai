# Reprise — série PÉRIMÈTRE → CONTENANCE → SOLIDES du CE2

Plan : `manim/PLAN-perimetre-aire-volume.md` (section « ## CE2 »). Vidéos COMMUNES : la session CM1 les relie par `aussi`.
⛔ Les 6 voix (paysage + short des épisodes 01, 02, 03) sont VALIDÉES par Frédéric le 13/11 : ne pas les redemander.
Ceintures : paysages 01 blanche, 02 jaune, 03 orange ; shorts blanche. Centres : 01 nature-ecologie + animaux, 02 nature-ecologie, 03 sport.

## État au 13/11, session 3 (arrêt pour compactage à ~60 %)

| Épisode | Paysage | Short |
|---|---|---|
| 01 comprendre | ✅ HD rendu, bords 0, planche relue ; ✅ miniature paysage faite et relue | ✅ rendu, planche + miniature relues (OK) |
| 02 polygone | ✅ dry run 0 (seul le faux positif 974) ; ✅ `-ql` relu deux fois, défauts corrigés (cotes « 3 m » écartées, numéros 1-6 posés en cotes, « Mais 9… » sur 2 lignes, question du défi sur 3 lignes, choix Q2 en fs 22, question 07 sans les nombres) → **PRÊT POUR LE HD** | film corrigé (question sur 3 lignes « Combien de mètres / de guirlande pour / faire tout le tour ? »), contrôlé → à rendre |
| 03 comparer | ✅ dry run 0 avant la dernière retouche ; `-ql` relu 3 fois. Dernière retouche NON VÉRIFIÉE : choix C de Q2 sur 2 lignes (`chr(10)`), c1/c2 de 03-bleu en xl=0.2, l1 de 02-rouge fs 30 xl=0.1, réponses Q2 y0=−2,1 pas 0,5 → refaire dry run + `-ql` + images 39 s, 61 s, 125 s, 201 s | film corrigé (choix B = « mon copain,<br>sur la table carrée », texte exact de la voix), contrôlé → à rendre |

Retouches faites en session 3 (03) : voix = écrit (« Pour comparer, on calcule… », « est un rectangle », « On fait pareil avec l'autre figure », « Le segment le plus long donne le tour le plus long »), « 130, c'est plus que 120 : » (130 hors_audit), terrain rouge centre −3,0, piège : figures remontées et morale sur une ligne en bas, défi : figures +0,35 et pause à −1,6, correction : l'ordre sur sa propre ligne (−3,1), Q1 et Q2 : `self.XL` abaissé le temps de la question (−0,3 et −0,9) puis `del self.XL`.
Outils hors dépôt (scratchpad de la session 3, à recréer si perdus) : `hd.sh` (verrou mkdir `C:/Users/FRED/AppData/Local/Temp/eleveai-rendu-hd.lock` + rendu), `images.py <mp4> <png> t1 t2…` (images à des instants, PyAV).
⛔ `planche-video.py` ne garde que la DERNIÈRE image de chaque écran : regarder aussi 2-3 instants au milieu (`images.py`). Le `_muet.mp4` laissé par `ti-margo-short.mjs film` dans le dossier de sortie : le supprimer avant R2.

### Outils faits en session 2
- Commun `perimetre_ce2_commun.py` : `ligne_somme(prec, reste)` (le nombre déjà dit hors synchro), `au_fil(lg, debut)` (chaque morceau à son nombre).
- Leçons de l'audit : une ligne « 13 + 8 = 21 » montrée à « Plus 8 » → TARD sur 13 : écrire `13` hors_audit + `+ 8` + `= 21` en morceaux séparés (la synchro attend sinon le résultat et affiche « + 8 » en retard → AUDIT-TARD). Dans `rep_bas`, mettre `buff=0.3` quand un morceau finit par une virgule (sinon on lit « 8,8 »). Un texte qui contient un mot dit plus tard (« le jardin », « départ ») fait attendre la synchro → RETARD : le poser à ce mot.
- Shorts : `films/ce2-perimetre.json`, `films/ce2-commun.js` (COPIE de cm1-commun.js : page.html charge `<préfixe>-commun.js`), `films/ce2-perimetre-cues.js` (3 épisodes). Dans `voixDe.mot`, un « 6 plus » compte pour un « plus » : prendre `mot(clip,'Plus',2)`. En mode `controle`, les textes des choix A/B/C sont vides pendant la réponse si on saute directement : artefact du contrôle seulement.
- `manim/miniature_perimetre_ce2.py` (ceinture par épisode) ; `manim/passe_perimetre_ce2.py` (`temps [slug]`, `voir`, `manifeste` ; dates 25/12, 27/12, 29/12 vérifiées libres ; lien coach seulement, pas de fiche CE2) ; aperçu séparé `manim/sorties/apercu-perimetre-ce2.html` (6 vidéos, sans lecture auto).
- `$TEMP/claude/mots.py` (hors dépôt) : mot@instant d'un clip, pour caler les `au_mot`. À recréer si besoin : lit `manim/voix/ce2-perimetre-<slug>.json` et `manim/scripts/ce2/perimetre_<slug>_marques.json`.

## Reste (dans l'ordre)
1. Ép. 03 : dry run + `-ql` de la dernière retouche (voir tableau), relire.
2. Ép. 02 : HD sous le verrou (`python -m manim render -qh --disable_caching manim/scripts/ce2/perimetre_polygone.py PerimetrePolygoneCE2 -o eleveai-maths-ce2-perimetre-polygone --media_dir <scratchpad>/hd02`) → copier vers `sorties/ce2/maths/perimetre/02-polygone/` → `python scripts/verifier-bords-video.py <mp4>` = 0 → planche HD → short `node scripts/ti-margo-short.mjs ce2-perimetre polygone film` puis `… miniature` (relire planche `ti-margo-planche.py <mp4> <png> 40`) → `python manim/miniature_perimetre_ce2.py polygone`.
3. Ép. 03 : même chaîne (`perimetre_comparer.py`, `PerimetreComparerCE2`, `03-comparer/`, `comparer`).
4. `python manim/passe_perimetre_ce2.py temps` puis `voir` (titres ≤ 100) puis `manifeste` ; `python scripts/fiches-youtube.py` ; R2 : `scripts/r2-videos.ps1` (à blanc) puis `-Envoyer`, `node scripts/generer-videos-r2.mjs` ; `lib/videos/*` : NOS clés seulement (`git hash-object -w` + `git update-index --cacheinfo`, jamais `git commit -- lib/videos/...`).
5. Cocher `manim/PLAN-perimetre-aire-volume.md` (CE2 01-03), mettre cette note à jour, commit PAR CHEMIN, pas de push.
6. Coach : `node scripts/brancher-videos-coach.mjs --classe ce2 --notion perimetre` (lecture seule) — `--ecrire` APRÈS le push du chef d'orchestre.

⛔ RAM : un seul rendu HD sur le PC (verrou), aperçus `-ql`, rien sous 2,5 Go libres, un seul processus manim à soi, aucun sous-agent qui rend.
