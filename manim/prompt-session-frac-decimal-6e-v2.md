# Reprise — vidéo 6e « Relier fraction et décimal » v2 (31/10/2026)

Frédéric a VALIDÉ la voix : `manim/scripts/6e/voix-frac-decimal-v2.md` (paysage verte Maëlys couturière, 2 questions-pauses ; short jaune Rayan menuisier, 1 question en commentaire). Ne plus la modifier.

Déjà fait : la micro du coach `fraction_decimal` refaite (commit `9e748448`, pas poussé) : fractions décimales sur la droite graduée (7/10 = 0,7 ; 13/10 = 1,3 ; 7/100 = 0,07), fini 3/4 = 3 ÷ 4 = 0,75.

À faire :
1. Écrire `manim/scripts/6e/frac_decimal_v2.py` (FracDecimal6eV2) et `frac_decimal_v2_short.py`, sur le modèle de `frac_decimal.py` (frac_commun, voix JSON `manim/voix/6e-frac-decimal-v2.json` débit −10, marques, ceinture, « Ce que tu as appris » en haut et centré, phrase de fin). Règles : `manim/REGLES.md`. La droite : fraction AU-DESSUS, décimal EN DESSOUS, dixièmes en petits traits ; agrandir puis rétrécir 13/10.
2. Rendre ; aperçu `manim/sorties/apercu.html` (port 3900, À L'ARRÊT, seulement la dernière vidéo).
3. Manifeste YouTube : remplacer les entrées 6e `fraction_decimal` (accroche, chapitres par --dry_run, `questions`), playlists Cycle 4 + CRPE.
4. R2 (`lib/videos/videos-r2.json`) + coach branché sur la micro ; QR des fiches = la paysage.
5. Committer PAR CHEMIN ; push le soir seulement.
