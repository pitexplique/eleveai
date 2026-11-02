# Brief commun — agents de rendu, série PROPORTIONNALITÉ, LYCÉE (2de, 1re, STMG) — 02/11/2026

Réponds en français. Dépôt C:\Users\FRED\Documents\eleveai (Windows ; Git Bash et PowerShell). D'autres agents rendent d'autres épisodes en même temps, et d'autres sessions travaillent dans le dépôt : ne crée que TES fichiers ; range tes outils temporaires dans un sous-dossier à ton nom du dossier temporaire (il est partagé). Avance à PETITS PAS : les commandes longues (WAV, dry run, rendus) partent en ARRIÈRE-PLAN, jamais une commande de plus de 2 minutes au premier plan.

## À lire d'abord, EN ENTIER
`manim/prompt-session-proportionnalite-lycee.md` (le tableau des épisodes, les sources, les ceintures), `manim/consigne-videos-proportionnalite.md` (surtout « Noms et sorties » et « ⭐ Leçons du pilote et du lot 1 ») et ce qu'elle demande de lire (dont `manim/REGLES.md`), puis les MODÈLES finis :
- pourcentages 4e (lot 5, le plus proche) : `manim/scripts/4e/prop_pourcentage_calculer.py`, `prop_pourcentage_coefficient.py`, `prop_pourcentage_evolution.py`, `prop_pourcentage_defi.py`, `prop_pourcentages_short.py`, et leurs `*_marques.json` ;
- épisode COMMUN à sous-classes : `manim/scripts/cm1/prop_tableau.py` + `prop_tableau_short.py`, `manim/scripts/cm1/frac_cm_commun.py` (identité, ceinture, `GARDE_SEULE`, `coller`) ;
- identité lycée : `manim/scripts/premiere/proba_auto_contraire.py` (« Maths 1re — EleveAI », `echelle_ceintures`) ; pour la STMG, reprends l'identité des scripts de `manim/scripts/stmg/` ;
- la base `manim/scripts/6e/prop_commun.py`, le module `manim/canvas_proportion.py` (API en en-tête : `TableauProp`, `Unite`, `AuditSynchro`…).
⛔ Ne modifie NI `canvas_proportion.py`, NI `prop_commun.py`, NI `frac_cm_commun.py`, NI les scripts des autres épisodes.

## Voix
VALIDÉE par Frédéric le 02/11 (`manim/voix/<nom>.json`, donné dans ta mission). N'y change rien sauf erreur factuelle (dis-le dans ton rapport). Les faits réels et leurs sources sont dans le prompt lycée : recopie source + date en en-tête du script. WAV : `powershell -NoProfile -File scripts/generer-voix.ps1 -Fichier manim/voix/<nom>.json -Debit -10`, rangés dans `public/sons/<nom-de-la-voix>/`. Marques mot à mot : `scripts/marques_dump.ps1` puis `scripts/cues2marques.py` ; pour les pourcentages ou nombres répétés, le convertisseur à seuil 0,5 s : `C:/Users/FRED/AppData/Local/Claude-Data/claude_pzs8sxrjxfjjc/side-session-notes/local_504ef5d5-8cbc-4554-b0bd-e4079732e2c6/cues2marques_gap.py` (un mot répété deux fois de suite est jeté : ajoute la marque à la main).

## Noms
- Script : `manim/scripts/<classe>/prop_lycee_<slug>.py` (+ `_short.py`), `<classe>` = `premiere` pour les épisodes communs, sinon `seconde` ou `stmg`. Le préfixe `prop_lycee_` évite tout import d'un `prop_*` homonyme de 6e ou de 4e : mets le dossier du script EN TÊTE de `sys.path`.
- Classes : `PropLycee<Slug>Premiere` (identité « Maths 1re — EleveAI »), `…Stmg` (identité STMG), `…Seconde` (« Maths 2de — EleveAI ») selon l'épisode. Épisode commun : rends la première sous-classe en entier, les autres en garde seule (`GARDE_SEULE=1`), puis `python manim/scripts/cm1/frac_cm_commun.py coller <entier.mp4> <garde.mp4> <sortie.mp4>`. Le short est rendu UNE fois (classe `PropLycee<Slug>Short`, ceinture BLANCHE, échelle entière, sans identité de classe) et COPIÉ sous chaque nom.
- Sorties `manim/sorties/<seconde|premiere|stmg>/maths/proportionnalite/<NN>-<slug>/eleveai-maths-<classe>-prop-<slug>[-short].mp4` (NN et slug dans le prompt lycée) ; media_dir `manim/scripts/<classe>/media-prop-lycee-<slug>[-short]`.

## Règles du lot (niveau lycée, 15-18 ans)
Ton sérieux, données réelles avec leur unité (TWh, Mt CO2e, Mha, N, Md€), source discrète en bas de l'écran de situation (« Source : RTE, 2024 »). Un dessin par écran : barre de 100 % (voir les barres des scripts pourcentages 4e, à recopier dans TON script), carré 100 % découpé (aire), tableau, schéma partie / tout ; pas de paragraphe. « × » et « ÷ » écrits (jamais 126,8/0,34) ; les décimaux à la française (virgule). Les leurres des questions-pauses = les erreurs dites par la voix. Questions-pauses : compte à rebours 5 s en paysage, 3 s en short ; la bonne réponse s'allume (agrandir puis rétrécir). Ti-Margo sur chaque écran. Synchro 0 s d'avance : un nombre n'apparaît qu'au moment où la voix le dit. « Ce que tu as appris » : titre en haut, centré. Marge de 3 % sur les quatre côtés.

## Ordre obligatoire
voix + calage → `AUDIT=1 BORDS=1 python -m manim render --dry_run …` (0 AUDIT-AVANCE, 0 RETARD, 0 BORD) → planche basse déf de 8 images REGARDÉE, écran par écran → UN SEUL rendu HD par vidéo (`PYTHONIOENCODING=utf-8`, en arrière-plan) → `python scripts/verifier-bords-video.py <mp4>` = « 0 instants » → planche finale de 12 images regardée (zoom sur questions, correction, « Ce que tu as appris »).

⛔ NE COMMITTE RIEN. ⛔ Ne lance jamais la lecture d'une vidéo. ⛔ Pas de miniature, manifeste, R2. Écris par morceaux de ≤ 150 lignes. Jamais deux rendus simultanés de ton côté.

## Rapport final COURT
Fichiers créés, durées, ceintures, centres, sources, liste `questions` JSON (t "MM:SS" mesuré sur le rendu = début de l'écran « Question ! », question, choix, reponse 0/1/2, explication) pour chaque vidéo, résultat des bords, ce que tu as vu sur les planches, soucis restants.
