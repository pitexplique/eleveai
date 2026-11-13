# Reprise — série PÉRIMÈTRE → CONTENANCE → SOLIDES du CE2

Plan : `manim/PLAN-perimetre-aire-volume.md` (section « ## CE2 »). Vidéos COMMUNES : la session CM1 les relie par `aussi`.
⛔ Les 6 voix (paysage + short des épisodes 01, 02, 03) sont VALIDÉES par Frédéric le 13/11 : ne pas les redemander.
Ceintures : paysages 01 blanche, 02 jaune, 03 orange ; shorts blanche. Centres : 01 nature-ecologie + animaux, 02 nature-ecologie, 03 sport.

## État au 13/11, fin de la session 2 (arrêtée à 74 % de contexte)

| Épisode | Paysage (script) | Paysage état | Short (film Ti Margo) | Short état |
|---|---|---|---|---|
| 01 comprendre | `scripts/ce2/perimetre_comprendre.py` | ✅ dry run 0 AUDIT/BORD/TARD, `-ql` relu, **HD rendu** `sorties/ce2/maths/perimetre/01-comprendre/…comprendre.mp4` (224,6 s), bords 0, planche HD relue | `films/ce2-perimetre.js` (`FILMS.comprendre`) | contrôlé ; ⏳ `film` + `miniature` LANCÉS en fin de session 2 : vérifier que `…comprendre-short.mp4` et `…-short-miniature.png` existent (sinon relancer) |
| 02 polygone | `scripts/ce2/perimetre_polygone.py` | ÉCRIT, ⏳ premier dry run lancé (résultat perdu : le relancer) | `films/ce2-perimetre-polygone.js` | contrôlé (planche OK, cabane agrandie à S=100 après : recontrôler 2-3 images) |
| 03 comparer | `scripts/ce2/perimetre_comparer.py` | ÉCRIT, jamais lancé | `films/ce2-perimetre-comparer.js` | contrôlé (tables resserrées S=52) |

Seul « reste » connu de l'audit : `AUDIT-ABSENT 10-abonne « 974 » (@eleveai974)` = écran de fin COMMUN imposé par REGLES.md, faux positif accepté.

### Outils faits en session 2
- Commun `perimetre_ce2_commun.py` : `ligne_somme(prec, reste)` (le nombre déjà dit hors synchro), `au_fil(lg, debut)` (chaque morceau à son nombre).
- Leçons de l'audit : une ligne « 13 + 8 = 21 » montrée à « Plus 8 » → TARD sur 13 : écrire `13` hors_audit + `+ 8` + `= 21` en morceaux séparés (la synchro attend sinon le résultat et affiche « + 8 » en retard → AUDIT-TARD). Dans `rep_bas`, mettre `buff=0.3` quand un morceau finit par une virgule (sinon on lit « 8,8 »). Un texte qui contient un mot dit plus tard (« le jardin », « départ ») fait attendre la synchro → RETARD : le poser à ce mot.
- Shorts : `films/ce2-perimetre.json`, `films/ce2-commun.js` (COPIE de cm1-commun.js : page.html charge `<préfixe>-commun.js`), `films/ce2-perimetre-cues.js` (3 épisodes). Dans `voixDe.mot`, un « 6 plus » compte pour un « plus » : prendre `mot(clip,'Plus',2)`. En mode `controle`, les textes des choix A/B/C sont vides pendant la réponse si on saute directement : artefact du contrôle seulement.
- `manim/miniature_perimetre_ce2.py` (ceinture par épisode) ; `manim/passe_perimetre_ce2.py` (`temps [slug]`, `voir`, `manifeste` ; dates 25/12, 27/12, 29/12 vérifiées libres ; lien coach seulement, pas de fiche CE2) ; aperçu séparé `manim/sorties/apercu-perimetre-ce2.html` (6 vidéos, sans lecture auto).
- `$TEMP/claude/mots.py` (hors dépôt) : mot@instant d'un clip, pour caler les `au_mot`. À recréer si besoin : lit `manim/voix/ce2-perimetre-<slug>.json` et `manim/scripts/ce2/perimetre_<slug>_marques.json`.

## Reste (dans l'ordre)
1. Short 01 : vérifier mp4 + miniature (sinon `node scripts/ti-margo-short.mjs ce2-perimetre comprendre film` puis `miniature`), planche (`python scripts/ti-margo-planche.py <mp4> <png> 40`).
2. Miniature paysage 01 : `python manim/miniature_perimetre_ce2.py comprendre` (la relire).
3. Ép. 02 : dry run `AUDIT=1 BORDS=1 PYTHONIOENCODING=utf-8 python -m manim render --dry_run --progress_bar none manim/scripts/ce2/perimetre_polygone.py PerimetrePolygoneCE2 2>&1 | grep -E "AUDIT|BORD|TARD|RETARD|Traceback|Error" | sort | uniq` → 0 → `-ql` (media dans le scratchpad) + planche → verrou `%TEMP%\eleveai-rendu-hd.lock` → HD (commande en tête du script) → copier vers `sorties/ce2/maths/perimetre/02-polygone/` → `python scripts/verifier-bords-video.py <mp4>` = 0 → short `film` + `miniature` → miniature paysage.
4. Ép. 03 : même chaîne (`perimetre_comparer.py`, `PerimetreComparerCE2`, sortie `03-comparer/`).
5. `python manim/passe_perimetre_ce2.py temps` puis `voir` (titres ≤ 100) puis `manifeste` ; `python scripts/fiches-youtube.py` ; R2 : `scripts/r2-videos.ps1` (à blanc) puis `-Envoyer`, `node scripts/generer-videos-r2.mjs` ; `lib/videos/*` : NOS clés seulement (`git hash-object -w` + `git update-index --cacheinfo`, jamais `git commit -- lib/videos/...`).
6. Cocher `manim/PLAN-perimetre-aire-volume.md` (CE2 01-03), mettre cette note à jour, commit PAR CHEMIN, pas de push.
7. Coach : `node scripts/brancher-videos-coach.mjs --classe ce2 --notion perimetre` (lecture seule) — `--ecrire` APRÈS le push du chef d'orchestre.

⛔ RAM : un seul rendu HD sur le PC (verrou), aperçus `-ql`, rien sous 2,5 Go libres, un seul processus manim à soi, aucun sous-agent qui rend.
