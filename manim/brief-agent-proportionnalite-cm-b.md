# Brief commun — agents de rendu, série PROPORTIONNALITÉ, CM1/CM2 (lot CM-B, 01/11/2026)

Réponds en français. Dépôt C:\Users\FRED\Documents\eleveai (Windows ; Git Bash et PowerShell). D'autres agents rendent d'autres épisodes en même temps, et d'autres sessions travaillent dans le dépôt : ne crée que TES fichiers ; range tes outils temporaires dans un sous-dossier à ton nom du dossier temporaire (il est partagé). Avance à PETITS PAS : les commandes longues (WAV, dry run, rendus) partent en ARRIÈRE-PLAN, jamais une commande de plus de 2 minutes au premier plan.

## À lire d'abord, EN ENTIER
`manim/prompt-session-proportionnalite-cm.md` (le tableau du lot CM-B), `manim/consigne-videos-proportionnalite.md` (surtout « Noms et sorties » et « ⭐ Leçons du pilote et du lot 1 ») et ce qu'elle demande de lire (dont `manim/REGLES.md`), puis les MODÈLES finis :
- lot CM-A (le style CM à reprendre) : `manim/scripts/cm1/prop_tableau.py` + `prop_tableau_short.py` (épisode commun, `TableauProp`, garde CM2), `prop_fois_plus.py` / `prop_fois_moins.py` (billes), `prop_reconnaitre.py`, et leurs `*_marques.json` ;
- 6e, pour la méthode : `manim/scripts/6e/prop_coefficient.py`, `prop_unite.py` (passage par l'unité), `prop_resoudre.py` (problème), `prop_defi.py` ;
- la base `manim/scripts/6e/prop_commun.py`, le module `manim/canvas_proportion.py` (API en en-tête), `manim/scripts/cm1/frac_cm_commun.py` (identité, ceinture, GARDE_SEULE, `coller`).
⛔ Ne modifie NI `canvas_proportion.py`, NI `prop_commun.py`, NI `frac_cm_commun.py`, NI les scripts des autres épisodes.

## Voix
VALIDÉE par Frédéric le 01/11 (`manim/voix/<nom>.json`, donné dans ta mission). N'y change rien sauf erreur factuelle (dis-le dans ton rapport). Un fait réel se vérifie par WebSearch : source + date en en-tête du script. WAV avec `scripts/generer-voix.ps1` (débit −10, niveau CM), rangés comme ceux du lot A (`public/sons/<nom-de-la-voix>/`). Marques mot à mot : `scripts/marques_dump.ps1` puis `scripts/cues2marques.py` (comme le lot A).

## Noms
- Script `manim/scripts/cm1/prop_<slug>.py` (+ `_short.py`), importe `prop_commun` (`sys.path` : `../6e` PUIS le dossier `cm1` devant, pour ne jamais importer un `prop_*` 6e homonyme). Paysage CM1 « Maths CM1 — EleveAI » VERTE ; short BLANC (échelle entière).
- Épisode COMMUN (05 coefficient, 07 probleme, 08 defi) : deux sous-classes `Prop<Slug>CM1` (verte) et `Prop<Slug>CM2` (« Maths CM2 — EleveAI », JAUNE) ; la voix ne cite aucune classe. Rends la paysage CM1 en entier, la garde CM2 seule (`GARDE_SEULE=1`, comme `prop_tableau.py`), puis `python manim/scripts/cm1/frac_cm_commun.py coller <cm1.mp4> <garde-cm2.mp4> <cm2.mp4>`. Le short est rendu une fois et COPIÉ sous les deux noms (`…-cm1-prop-<slug>-short.mp4` et `…-cm2-…`).
- Épisode CM2 SEUL (06 quatrieme) : script `manim/scripts/cm1/prop_quatrieme.py`, classe `PropQuatriemeCM2`, identité « Maths CM2 — EleveAI », paysage VERTE ; short `PropQuatriemeShortCM2` ; sorties seulement sous `cm2/`.
- Sorties `manim/sorties/<cm1|cm2>/maths/proportionnalite/<NN>-<slug>/eleveai-maths-<cm1|cm2>-prop-<slug>[-short].mp4` ; media_dir `manim/scripts/cm1/media-prop-<slug>[-short]`.

## Règles du lot (niveau CM, 9-11 ans)
Phrases à l'écran très courtes, gros caractères, un dessin par écran (`TableauProp` pour les tableaux, billes ou pictos simples pour les quantités). « × » et « ÷ » écrits (jamais 12/3) ; unités partout. ⛔ Pas de produit en croix : la quatrième proportionnelle passe par 1. Questions-pauses : compte à rebours 5 s en paysage, 3 s en short. Ti-Margo sur chaque écran. Synchro 0 s d'avance : un nombre n'apparaît qu'au moment où la voix le dit. Pour insister : AGRANDIR puis rétrécir.

## Ordre obligatoire
voix + calage → `AUDIT=1 BORDS=1 python -m manim render --dry_run …` (0 AUDIT-AVANCE, 0 RETARD, 0 BORD) → planche basse déf de 8 images REGARDÉE, écran par écran → UN SEUL rendu HD par vidéo (`PYTHONIOENCODING=utf-8`, en arrière-plan) → `python scripts/verifier-bords-video.py <mp4>` = « 0 instants » → planche finale de 12 images regardée (zoom sur questions, correction, « Ce que tu as appris »).

⛔ NE COMMITTE RIEN. ⛔ Ne lance jamais la lecture d'une vidéo. ⛔ Pas de miniature, manifeste, R2. Écris par morceaux de ≤ 150 lignes. Jamais deux rendus simultanés de ton côté.

## Rapport final COURT
Fichiers créés, durées, ceintures, centres, sources des faits réels, liste `questions` JSON (t "MM:SS" mesuré sur le rendu = début de l'écran « Question ! », question, choix, reponse 0/1/2, explication) pour chaque vidéo, résultat des bords, ce que tu as vu sur les planches, soucis restants.
