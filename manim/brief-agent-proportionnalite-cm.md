# Brief commun — agents de rendu, série PROPORTIONNALITÉ, CM1/CM2 (lot CM-A, 01/11/2026)

Réponds en français. Dépôt C:\Users\FRED\Documents\eleveai (Windows ; Git Bash et PowerShell). D'autres agents rendent d'autres épisodes en même temps, et d'autres sessions travaillent dans le dépôt : ne crée que TES fichiers ; range tes outils temporaires dans un sous-dossier à ton nom du dossier temporaire (il est partagé). Avance à petits pas : les commandes longues (WAV, rendus) partent en arrière-plan.

## À lire d'abord, EN ENTIER
`manim/prompt-session-proportionnalite-cm.md` (le tableau du lot CM-A), `manim/consigne-videos-proportionnalite.md` (surtout « Noms et sorties » et « ⭐ Leçons du pilote et du lot 1 ») et ce qu'elle demande de lire (dont `manim/REGLES.md`), puis les MODÈLES finis : `manim/scripts/6e/prop_reconnaitre.py`, `prop_tableau.py`, `prop_coefficient.py` (+ leurs `_short.py` et `*_marques.json`), la base `manim/scripts/6e/prop_commun.py`, le module `manim/canvas_proportion.py` (API en en-tête : `TableauProp`, `Billes`…). Pour les épisodes COMMUNS CM1/CM2 : `manim/scripts/cm1/frac_cm_commun.py` (identité, ceinture, GARDE_SEULE, `coller`).
⛔ Ne modifie NI `canvas_proportion.py`, NI `prop_commun.py`, NI `frac_cm_commun.py`, NI les scripts des autres épisodes.

## Voix
VALIDÉE par Frédéric le 01/11 (fichier donné dans ta mission). N'y change rien sauf erreur factuelle (dis-le dans ton rapport). Un fait réel (Lune, ruche, pattes) se vérifie par WebSearch : source + date en en-tête du script. WAV avec `scripts/generer-voix.ps1` (débit −10, niveau CM), rangés comme ceux du lot 1 (`public/sons/<nom-de-la-voix>/`).

## Noms
- Script `manim/scripts/cm1/prop_<slug>.py` (+ `_short.py`), importe `prop_commun` (`sys.path` vers `../6e`). Identité « Maths CM1 — EleveAI » (attribut `identite`), ceinture paysage VERTE, short BLANC (échelle entière).
- Épisode COMMUN (01 reconnaitre, 04 tableau) : deux sous-classes `Prop<Slug>CM1` (verte) et `Prop<Slug>CM2` (« Maths CM2 — EleveAI », JAUNE) ; la voix ne cite aucune classe. Rends la paysage CM1 en entier, la garde CM2 seule (gère `GARDE_SEULE=1` dans TON script, comme `_ConstructCM`), puis `python manim/scripts/cm1/frac_cm_commun.py coller <cm1.mp4> <garde-cm2.mp4> <cm2.mp4>`. Le short est rendu une fois et copié sous les deux noms.
- Sorties `manim/sorties/<cm1|cm2>/maths/proportionnalite/<NN>-<slug>/eleveai-maths-<cm1|cm2>-prop-<slug>[-short].mp4` ; media_dir `manim/scripts/cm1/media-prop-<slug>[-short]`.

## Règles du lot (niveau CM, 9-11 ans)
Phrases à l'écran très courtes, gros caractères, un dessin par écran (schéma de billes pour fois plus / fois moins, `TableauProp` pour le tableau). « × » et « ÷ » écrits (jamais 12/3) ; unités partout (points, salades, litres, places, pattes). ⛔ Pas de produit en croix. Questions-pauses : compte à rebours 5 s en paysage, 3 s en short. Ti-Margo sur chaque écran. Synchro 0 s d'avance : un nombre n'apparaît qu'au moment où la voix le dit.

## Ordre obligatoire
voix + calage → `AUDIT=1 BORDS=1 python -m manim render --dry_run …` (0 AUDIT-AVANCE, 0 RETARD, 0 BORD) → planche basse déf de 8 images REGARDÉE, écran par écran → UN SEUL rendu HD par vidéo (`PYTHONIOENCODING=utf-8`) → `python scripts/verifier-bords-video.py <mp4>` = « 0 instants » → planche finale de 12 images regardée (zoom sur questions, correction, « Ce que tu as appris »).

⛔ NE COMMITTE RIEN. ⛔ Ne lance jamais la lecture d'une vidéo. ⛔ Pas de miniature, manifeste, R2. Écris par morceaux de ≤ 150 lignes. Jamais deux rendus simultanés de ton côté.

## Rapport final COURT
Fichiers créés, durées, ceintures, centres, sources des faits réels, liste `questions` JSON (t "MM:SS" mesuré sur le rendu = début de l'écran « Question ! », question, choix, reponse 0/1/2, explication) pour chaque vidéo, résultat des bords, ce que tu as vu sur les planches, soucis restants.
