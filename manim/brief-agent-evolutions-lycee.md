# Brief commun — agents BROUILLONS -ql, série ÉVOLUTIONS EN POURCENTAGE, automatismes 1re + STMG — 23/11/2026

Réponds en français, phrases courtes. Dépôt C:\Users\FRED\Documents\eleveai (Windows ; Git Bash et PowerShell). D'autres sessions et deux autres agents travaillent dans le dépôt en même temps : ne crée et ne modifie que TES fichiers (liste plus bas). Outils temporaires : dans un sous-dossier à ton nom de `C:/Users/FRED/AppData/Local/Temp/claude/e03fd876cfac5b2e/0a02f138-5fa8-4523-871c-c8575d396832/scratchpad/evo/`. Commandes longues (WAV, dry run, rendus) en ARRIÈRE-PLAN ; jamais plus de 2 min au premier plan.

## Ta mission : 2 ou 3 épisodes (donnés dans ton message), chacun = 1 paysage + 1 short, en BROUILLON -ql seulement
⛔ AUCUN rendu -qh / HD : la session qui t'a lancé les fait elle-même, un par un, après l'accord visuel de Frédéric.
⛔ RAM : avant CHAQUE rendu, lis la mémoire libre (`powershell -NoProfile -Command "(Get-CimInstance Win32_OperatingSystem).FreePhysicalMemory/1MB"`). Sous 2,5 Go : attends 1 min et relis (Monitor ou boucle de contrôle), ne lance rien.

## Les voix (déjà écrites, montrées à Frédéric, « go » le 23/11)
`manim/voix/lycee-evo-<slug>.json` et `manim/voix/lycee-evo-<slug>-short.json`. Le tableau « écran prévu » de chaque clé est dans `C:/Users/FRED/AppData/Local/Temp/claude/e03fd876cfac5b2e/0a02f138-5fa8-4523-871c-c8575d396832/scratchpad/evo/episodes.py` et `episodes2.py` (3e champ de chaque tuple) : c'est la maquette à suivre, avec la source et la ceinture. N'y change rien, sauf erreur factuelle ou mathématique : dis-le dans ton rapport.
WAV : `powershell -NoProfile -File scripts/generer-voix.ps1 -Fichier manim/voix/<nom>.json -Debit -10` → `public/sons/<nom>/`. Marques mot à mot : `scripts/marques_dump.ps1` puis `scripts/cues2marques.py` ; pour les nombres et pourcentages répétés, le convertisseur à seuil 0,5 s `C:/Users/FRED/AppData/Local/Claude-Data/claude_pzs8sxrjxfjjc/side-session-notes/local_504ef5d5-8cbc-4554-b0bd-e4079732e2c6/cues2marques_gap.py` (un mot répété deux fois de suite est jeté : ajoute la marque à la main).

## Modèles à lire d'abord, en entier
- `manim/REGLES.md` (tout ; surtout : fin commune `manim/fin_commune.py`, ceintures importées de `manim/scripts/seconde/signes_expression_2de.py`, questions-pauses, mascotte sur chaque écran sauf l'écran « Réponds en commentaire » du short, marge 3 %).
- Le dernier épisode commun lycée : `manim/scripts/premiere/prop_lycee_formes.py` + `prop_lycee_formes_short.py` et leurs `*_marques.json` (sous-classes Premiere / Stmg, `GARDE_SEULE`, `coller` de `manim/scripts/cm1/frac_cm_commun.py`).
- Pourcentages 4e (barres de 100 %, coefficient, évolution, défi) : `manim/scripts/4e/prop_pourcentage_coefficient.py`, `prop_pourcentage_evolution.py`, `prop_pourcentage_defi.py`.
- Usage de `fin_commune` dans un script récent : `manim/scripts/3e/` (série fonctions affines, ex. `affine_coeff_directeur*.py`).
⛔ Ne modifie NI `canvas_proportion.py`, NI `prop_commun.py`, NI `frac_cm_commun.py`, NI `fin_commune.py`, NI aucun script existant. Recopie dans TON script ce dont tu as besoin.

## Noms (slug = celui de ton épisode : additif, diminution, valeur-finale, valeur-initiale, calculer-taux, successives, reciproque, compensation ; en Python `_` au lieu de `-`)
- Scripts : `manim/scripts/premiere/prop_lycee_evo_<slug>.py` et `prop_lycee_evo_<slug>_short.py` (+ `_marques.json`). Dossier du script EN TÊTE de `sys.path`.
- Classes : `PropLyceeEvo<Slug>Premiere` (identité « Maths 1re — EleveAI »), `PropLyceeEvo<Slug>Stmg` (« Maths STMG — EleveAI », garde seule) ; short `PropLyceeEvo<Slug>Short` (ceinture BLANCHE, échelle entière, sans identité de classe), rendu une fois.
- media_dir : `manim/scripts/premiere/media-prop-lycee-evo-<slug>[-short]`.
- Numéros d'épisode : additif 07, diminution 08, valeur-finale 09, valeur-initiale 10, calculer-taux 11, successives 12, reciproque 13, compensation 14 (« épisode NN » sur la garde si les modèles l'affichent).

## Règles du lot (lycée, 15-18 ans, épreuve anticipée : automatismes SANS calculatrice)
Ton sérieux et clair. Situation concrète d'abord (jamais les maths en ouverture). Un dessin par écran : barre de 100 % (hausse = bout ajouté, baisse = morceau retiré), chaîne de flèches « × c », pas de paragraphe. « × » et « ÷ » écrits ; décimaux à la virgule. Source discrète en bas de l'écran de situation quand l'épisode en a une. Questions-pauses : compte à rebours 5 s (paysage), 3 s (short) ; la bonne réponse (lettre donnée par la voix) s'allume en grandissant puis rétrécit, avec la coche ✓ des REGLES. Synchro 0 s d'avance : un nombre n'apparaît qu'au moment où la voix le dit. « Ce que tu as appris » : titre en haut, centré. Ti Margo sur chaque écran. Fin : `ecran_fin(self, "paysage", voix="11-abonne")` ; short : `ecran_commentaire(...)` (ou `appel_commentaire`) puis `ecran_fin(self, "short", voix="04-abonne")`.

## Ordre obligatoire
voix + WAV + marques → `AUDIT=1 BORDS=1 python -m manim render --dry_run …` (0 AUDIT-AVANCE, 0 RETARD, 0 BORD) → rendu `-ql --disable_caching` de la classe Premiere et du Short → planche basse déf de 8 images REGARDÉE écran par écran (outil : `C:/Users/FRED/AppData/Local/Temp/claude/lycee-partie-tout/planche.py <mp4> <png> t1 t2 …`) → corrige → re-rendu -ql si besoin.

⛔ NE COMMITTE RIEN. ⛔ Ne lance jamais la lecture d'une vidéo. ⛔ Pas de miniature, manifeste, R2, coach.

## Rapport final COURT (≤ 25 lignes par épisode)
Chemins des scripts et des mp4 -ql, durées, résultat du dry run, ce que tu as vu sur la planche, liste `questions` JSON (t "MM:SS" = début de l'écran « Question ! », question, choix, reponse 0/1/2, explication) pour chaque vidéo, temps de début de chaque clé de voix (pour les chapitres), soucis restants, erreurs factuelles éventuelles des voix.

## Ajout : page de garde 2de pour les épisodes 11, 12, 13
Les micros 2de `info_taux_evolution`, `info_evolutions_successives`, `info_evolution_reciproque` sont les mêmes compétences. Pour calculer-taux, successives et reciproque, ajoute la sous-classe `PropLyceeEvo<Slug>Seconde` (identité « Maths 2de — EleveAI », même ceinture), rendue plus tard en garde seule, comme la STMG. Rien d'autre ne change.
